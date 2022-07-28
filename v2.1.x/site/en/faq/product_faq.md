---
id: product_faq.md
summary: Find answers to frequently asked questions about the world's most advanced vector database.
---

# Product FAQ

<!-- TOC -->



<!-- /TOC -->

#### How much does Milvus cost?

Milvus is a 100% free open-source project.

Please adhere to [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0) when using Milvus for production or distribution purposes.

Zilliz, the company behind Milvus, also offers a fully managed cloud version of the platform for those that don't want to build and maintain their own distributed instance. [Zilliz Cloud](https://zilliz.com/cloud) automatically maintains data reliability and allows users to pay only for what they use.

#### Does Milvus support non-x86 architectures?

Milvus cannot be installed or run on non-x86 platforms.

Your CPU must support one of the following instruction sets to run Milvus: SSE4.2, AVX, AVX2, AVX512. These are all x86-dedicated SIMD instruction sets.

#### What is the maximum dataset size Milvus can handle?

  
Theoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:

- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.
- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.

####  Where does Milvus store data?

Milvus deals with two types of data, inserted data and metadata. 

Inserted data, including vector data, scalar data, and collection-specific schema, is stored in persistent storage (for now MinIO only) as incremental log.

Metadata is generated within Milvus. Each Milvus module has its own metadata that is stored in etcd.

#### Why is there no vector data in etcd?

etcd stores Milvus module metadata; MinIO stores entities.

#### Does Milvus' Python SDK have a connection pool?

Python SDKs for Milvus v0.9.0 or higher have a connection pool. The number of connections in a connection pool has no upper limit.

#### Does Milvus support inserting and searching data simultaneously?

Yes. Insert operations and query operations are handled by two separate modules that are mutually independent. From the client’s perspective, an insert operation is complete when the inserted data enters the message queue. However, inserted data is unsearchable until it is loaded to the query node. If the segment size does not reach the index-building threshold (512 MB by default), Milvus resorts to brute-force search and query performance may be diminished.

#### Can vectors with duplicate primary keys be inserted into Milvus?

Yes. Milvus does not check if vector primary keys are duplicates.

#### When vectors with duplicate primary keys are inserted, does Milvus treat it as an update operation?

No. Milvus does not currently support update operations and does not check if entity primary keys are duplicates. You are responsible for ensuring entity primary keys are unique, and if they aren't Milvus may contain multiple entities with duplicate primary keys.

If this occurs, which data copy will return when queried remains an unknown behavior. This limitation will be fixed in future releases.

#### What is the maximum length of self-defined entity primary keys?

Entity primary keys must be non-negative 64-bit integers.

#### What is the maximum amount of data that can be added per insert operation?

An insert operation must not exceed 1,024 MB in size. This is a limit imposed by gRPC.

#### Does collection size impact query performance when searching in a specific partition?

No. If partitions for a search are specified, Milvus searches the specified partitions only.

#### Does Milvus load the entire collection when partitions are specified for a search?

No. Milvus has varied behavior. Data must be loaded to memory before searching.

- If you know which partitions your data is located in, call `load_partition()` to load the intended partition(s) *then* specify partition(s) in the `search()` method call.
- If you do not know the exact partitions, call `load_collection()` before calling `search()`.
- If you fail to load collections or partitions before searching, Milvus returns an error.


#### Can indexes be created after inserting vectors?

Yes. If `create_index()` is called, Milvus builds an index for subsequently inserted vectors. However, Milvus does not build an index until the newly inserted vectors fill an entire segment and the newly created index file is separate from the previous one.



#### How are the FLAT and IVF_FLAT indexes different?

The IVF_FLAT index divides vector space into list clusters. At the default list value of 16,384, Milvus compares the distances between the target vector and the centroids of all 16,384 clusters to return probe nearest clusters. Milvus then compares the distances between the target vector and the vectors in the selected clusters to get the nearest vectors. Unlike IVF_FLAT, FLAT directly compares the distances between the target vector and every other vector.

When the total number of vectors approximately equals nlist, there is little distance between IVF_FLAT and FLAT in terms of calculation requirements and search performance. However, as the number of vectors exceeds nlist by a factor of two or more, IVF_FLAT begins to demonstrate performance advantages.

See [Vector Index](index.md) for more information.

#### How does Milvus flush data?

Milvus returns success when inserted data is loaded to the message queue. However, the data is not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.

#### What is normalization? Why is normalization needed?

Normalization refers to the process of converting a vector so that its norm equals 1. If inner product is used to calculate vector similarity, vectors must be normalized. After normalization, inner product equals cosine similarity.

See [Wikipedia](https://en.wikipedia.org/wiki/Unit_vector) for more information.

#### Why do Euclidean distance (L2) and inner product (IP) return different results?

For normalized vectors, Euclidean distance (L2) is mathematically equivalent to inner product (IP). If these similarity metrics return different results, check to see if your vectors are normalized

#### Is there a limit to the total number of collections and partitions in Milvus?
There is no limit on the number of collections. However, the number of partitions in each collection must not exceed the value set by the parameter `master.maxPartitionNum`.

#### Why do I get fewer than k vectors when searching for `topk` vectors?

Among the indexes that Milvus supports, IVF_FLAT and IVF_SQ8 implement the k-means clustering method. A data space is divided into `nlist` clusters and the inserted vectors are distributed to these clusters. Milvus then selects the `nprobe` nearest clusters and compares the distances between the target vector and all vectors in the selected clusters to return the final results.

If `nlist` and `topk` are large and nprobe is small, the number of vectors in the nprobe clusters may be less than `k`. Therefore, when you search for the `topk` nearest vectors, the number of returned vectors is less than `k`.

To avoid this, try setting `nprobe` larger and `nlist` and `k` smaller.

See [Vector Index](index.md) for more information.

#### What is the maximum vector dimension supported in Milvus?

Milvus can manage vectors with up to 32,768 dimensions.

#### Does Milvus support Apple M1 CPU?

Current Milvus release does not support Apple M1 CPU.

#### What data types does Milvus support on the primary key field?

In current release, Milvus support both INT64 and string.

#### Is Milvus scalable?

Yes. You can deploy Milvus cluster with multiple nodes via Helm Chart on Kubernetes. Refer to [Scale Guide](scaleout.md) for more instruction.

#### Does the query perform in memory? What are incremental data and historical data?

Yes. When a query request comes, Milvus searches both incremental data and historical data by loading them into memory. Incremental data are data in the growing segments, which are buffered in memory before they reach the threshold to be persisted in storage engine, while historical data are from the sealed segments that are stored in the object storage. Incremental data and historical data together constitute the whole dataset to search.

#### Is Milvus 2.0 available for concurrent search?

Yes. For queries on the same collection, Milvus concurrently searches the incremental and historical data. However, queries on different collections are conducted in series. Whereas the historical data can be an extremely huge dataset, searches on the historical data are relatively more time-consuming and essentially performed in series. The formal release of Milvus 2.0 will improve this issue.

#### Why does the data in MinIO remain after the corresponding collection is dropped?

Data in MinIO is designed to remain for a certain period of time for the convenience of data rollback.

#### Does Milvus support message engines other than Pulsar?

Yes. Kafka is supported in Milvus 2.1.0.

#### What's the diference between a search and a query?

In Milvus, a vector similarity search retrieves vectors based on similarity calculation and vector index acceleration. Unlike a vector similarity search, a vector query retrieves vectors via scalar filtering based on boolean expression. The boolean expression filters on scalar fields or the primary key field, and it retrieves all results that match the filters. In a query, neither similarity metrics nor vector index is involved.

#### Still have questions?

You can:

- Check out [Milvus](https://github.com/milvus-io/milvus/issues) on GitHub. You're welcome to raise questions, share ideas, and help others.
- Join our [Slack community](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) to find support and engage with our open-source community.

