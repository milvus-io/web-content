---
id: storage_operation.md
---

# Storage Operations

<div class="alert note">
Please read <a href="storage_concept.md">Storage Concepts</a> before reading this article.
</div>


## Insert data

The client inserts data by calling the `insert` API, and the amount of inserted data cannot exceed 256 MB at a time. The process of data insertion is as follows:

1. After receiving the insert request, the server writes the data to the write ahead log (WAL).
2. After the request is successfully recorded to the log file, the server handles the insert operation.
3. The server writes data to a mutable buffer.

<div class="alert note">
Each collection has an independent mutable buffer. The maximum capacity of each mutable buffer is 128 MB. The upper limit of the total mutable buffer capacity of all collections is determined by <code>insert_buffer_size</code> (by default 1 GB).
</div>


![insert](../../../assets/storage/insert.png)

## Flush data

There are three triggering mechanisms for data flushing in the buffer:

#### Timed trigger

The system triggers the data flushing task regularly. The interval is determined by the `auto_flush_interval` (by default 1 second).

The process of data flushing is as follows:

1. The system opens up a new mutable buffer area to accommodate the data to be inserted.
2. The system sets the previous mutable buffer as read-only (immutable buffer).
3. The system writes the data in the immutable buffer to the disk and writes the description information of the new data segment to the metadata backend service.

After completing the above process, the system has successfully created a segment.

#### Client trigger

The client calls the `flush` API to trigger the data flushing task.
#### Trigger when the buffer reaches the upper limit

When the accumulated data reaches the upper limit of the mutable buffer (128MB), the data flushing task is triggered.

All relevant files of each segment are stored in a folder named by the segment ID, such as a UID file that records the entity ID, a **delete_docs** file used to mark deleted entities, and a **bloom-filter** file used for quick entity search.

<div class="alert info">
Please see the diagram in <a href="storage_concept.md#Partition-and-segment">Partition and Segment</a> for data files within the segment.
</div>



## Merge data

Too many small data segments cause poor query performance. To address this problem, Milvus triggers the segment merge task in the background when needed. In other words, Milvus merges small data segments into new data segments, deletes the small data segments, and updates the metadata. The size of new data segments should not be less than the `index_file_size`.

The timings to trigger the merge task are as follows:

- When starting the service
- After completing a data flushing task
- Before building indexes
- After deleting the indexes

<div class="alert note">
The indexed segments do not participate in the merge task.
</div>


## Build indexes

Before building indexes, Milvus performs query operations on collections by brute-force search. To improve query performance, you can build a suitable index for the collection. After the index is built, Milvus generates an index file for each segment and simultaneously updates the metadata.

<div class="alert info">
See <a href="index.md">Index Types</a> for more information about building indexes.
</div>


## Delete

#### Delete collections

1. The client calls the `drop_collection` API to delete a collection.
2. After receiving the request, the server marks the collection (including its partitions and segments) as deleted in the metadata. No new operations (such as insertion and query) can be performed on these collections.
3. The background cleanup task deletes the collection (including its partitions and segments) marked as deleted from the metadata and deletes the corresponding data files and folders from the disk. If there is an operation being performed on the collection before the delete operation is called, the segment is deleted after the previous operation is completed.

#### Delete partitions

1. The client calls the `drop_partition` API to delete a partition.
2. After receiving the request, the server marks the partition (including its segment) as deleted in the metadata.
3. The background cleanup task performs the same process as described in **Delete collections** to delete the partition and metadata.

#### Delete entities

Milvus created a **delete_docs** file for each segment to record the position of the vectors to be deleted within the segment.

Milvus uses a bloom filter to quickly determine whether an entity ID exists in a segment. Therefore, a file named **bloom_filter** is created under each segment.

The process of deleting an entity is as follows:

1. The client calls the `delete_entity_by_id` API to delete some entities in the collection.
2. After receiving the request, the server performs the following operations to delete the entities:
    * If an entity is the insertion buffer, the server deletes the entity directly.
    * Otherwise, based on the bloom filter of each segment, the server determines which segment contains the entity, and then updates the **delete_docs** and **bloom_filter** files of the segment.

## Compact segments

When querying a segment, Milvus reads the entity data of the segment and the **delete_docs** file into memory. Although the deleted entities do not participate in the calculation, they are read into memory. Therefore, the more deleted entities in a segment, the more memory resources and disk space are wasted. To reduce such unnecessary resource consumption, Milvus provides data segment compaction operation, the process is as follows:

1. The client calls the `compact` API.
2. After receiving the request, the server writes the undeleted entities in the segment to a new segment based on the information recorded in **delete_docs** and marks the old segment as deleted. Afterward, the background cleanup task is responsible for cleaning the segments marked as deleted. If the old segments have been indexed, the indexes are rebuilt after the new segments are generated.

<div class="alert note">
The <code>compact</code> operation ignores the segment where the deleted vector accounts for less than 10% of the entire data.
</div>


## Read data

1. The client calls the `get_entity_by_id` API to read the original entity data.
2. After receiving the request, the server finds the segment where the entity is located through the bloom filter and returns the data corresponding to the entity ID.

<div class="alert note">
Floating-point vectors are stored in Milvus as single-precision (float) data.
</div>