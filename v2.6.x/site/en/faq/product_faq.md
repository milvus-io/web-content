---
id: product_faq.md
summary: Find answers to frequently asked questions about the world's most advanced vector database.
title: Product FAQ
---

# Product FAQ


#### How much does Milvus cost?

Milvus is a 100% free open-source project.

Please adhere to [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0) when using Milvus for production or distribution purposes.

Zilliz, the company behind Milvus, also offers a fully managed cloud version of the platform for those that don't want to build and maintain their own distributed instance. [Zilliz Cloud](https://zilliz.com/cloud) automatically maintains data reliability and allows users to pay only for what they use.

#### Does Milvus support non-x86 architectures?

Milvus cannot be installed or run on non-x86 platforms.

Your CPU must support one of the following instruction sets to run Milvus: SSE4.2, AVX, AVX2, AVX512. These are all x86-dedicated SIMD instruction sets.

####  Where does Milvus store data?

Milvus deals with two types of data, inserted data and metadata. 

Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).

Metadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.

#### Why is there no vector data in etcd?

etcd stores Milvus module metadata; MinIO stores entities.

#### Does Milvus support inserting and searching data simultaneously?

Yes. Insert operations and query operations are handled by two separate modules that are mutually independent. From the client's perspective, an insert operation is complete when the inserted data enters the message queue. However, inserted data are unsearchable until they are loaded to the query node. For growing segments with incremental data, Milvus automatically builds interim indexes to ensure efficient search performance, even when the segment size does not reach the index-building threshold, calculated as `dataCoord.segment.maxSize` × `dataCoord.segment.sealProportion`. You can control this behavior through the configuration parameter `queryNode.segcore.interimIndex.enableIndex` in the [Milvus configuration file](https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L440) - setting it to `true` enables temporary indexing (default) while setting it to `false` disables it.

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

#### Does Milvus need to load the entire collection when partitions are specified for a search?

It depends on what data is needed for search. All partitions potentially show up in search result must be loaded before searching.

- For example, if you only want to search specific parition(s), you don't need to load all. Call `load_partition()` to load the intended partition(s) *then* specify partition(s) in the `search()` method call.
- If you want to search all partitions, call `load_collection()` to load the whole collection including all partitions.
- If you fail to load the collection or specific partition(s) before searching, Milvus will return an error.

#### Can indexes be created after inserting vectors?

Yes. If an index has been built for a collection by `create_index()` before, Milvus will automatically build an index for subsequently inserted vectors. However, Milvus does not build an index until the newly inserted vectors fill an entire segment and the newly created index file is separate from the previous one.

#### How are the FLAT and IVF_FLAT indexes different?

The IVF_FLAT index divides vector space into list clusters. At the default list value of 16,384, Milvus compares the distances between the target vector and the centroids of all 16,384 clusters to return probe nearest clusters. Milvus then compares the distances between the target vector and the vectors in the selected clusters to get the nearest vectors. Unlike IVF_FLAT, FLAT directly compares the distances between the target vector and every other vector.

When the total number of vectors approximately equals nlist, there is little distance between IVF_FLAT and FLAT in terms of calculation requirements and search performance. However, as the number of vectors exceeds nlist by a factor of two or more, IVF_FLAT begins to demonstrate performance advantages.

See [Vector Index](index.md) for more information.

#### How does Milvus flush data?

Milvus returns success when inserted data are ingested to the message queue. However, the data are not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.

#### What is normalization? Why is normalization needed?

Normalization refers to the process of converting a vector so that its norm equals 1. If inner product is used to calculate vector similarity, vectors must be normalized. After normalization, inner product equals cosine similarity.

See [Wikipedia](https://en.wikipedia.org/wiki/Unit_vector) for more information.

#### Why do Euclidean distance (L2) and inner product (IP) return different results?

For normalized vectors, Euclidean distance (L2) is mathematically equivalent to inner product (IP). If these similarity metrics return different results, check to see if your vectors are normalized

#### Is there a limit to the total number of collections and partitions in Milvus?

Yes. You can create up to 65,535 collections in a Milvus instance. When calculating the number of existing collections, Milvus counts all collections with shards and partitions in them.

For example, let's assume you have already created 100 collections, with 2 shards and 4 partitions in 60 of them and with 1 shard and 12 partitions in the rest 40 collections. The current number of collections can be calculated as:

```
60 * 2 * 4 + 40 * 1 * 12 = 960
```

#### Why do I get fewer than k vectors when searching for `topk` vectors?

Among the indexes that Milvus supports, IVF_FLAT and IVF_SQ8 implement the k-means clustering method. A data space is divided into `nlist` clusters and the inserted vectors are distributed to these clusters. Milvus then selects the `nprobe` nearest clusters and compares the distances between the target vector and all vectors in the selected clusters to return the final results.

If `nlist` and `topk` are large and nprobe is small, the number of vectors in the nprobe clusters may be less than `k`. Therefore, when you search for the `topk` nearest vectors, the number of returned vectors is less than `k`.

To avoid this, try setting `nprobe` larger and `nlist` and `k` smaller.

See [Vector Index](index.md) for more information.

#### What is the maximum vector dimension supported in Milvus?

Milvus can manage vectors with up to 32,768 dimensions by default. You can increase the value of `Proxy.maxDimension` to allow for a larger dimension vector.

#### Does Milvus support Apple M1 CPU?

Current Milvus release does not support Apple M1 CPU directly. After Milvus 2.3, Milvus provides Docker images for the ARM64 architecture.

#### What data types does Milvus support on the primary key field?

In current release, Milvus supports both INT64 and string.

#### Is Milvus scalable?

Yes. You can deploy Milvus cluster with multiple nodes via Helm Chart on Kubernetes. Refer to [Scale Guide](scaleout.md) for more instruction.

#### What are growing segment and sealed segment?

When a search request comes, Milvus searches both incremental data and historical data. Incremental data are recent updates, they are stored in the growing segments, which are buffered in memory before they reach the threshold to be persisted in object storage and a more efficient index is built for them, while historical data are updates a while ago. They are in the sealed segments which have been persisted in the object storage. Incremental data and historical data together constitute the whole dataset for search. This design makes any data ingested to Milvus instantly searchable. For Milvus Distributed, there are more complex factors that decide when a record just ingested can show up in search result. Learn more nuance about that at [consistency levels](https://milvus.io/docs/consistency.md).

#### Is Milvus available for concurrent search?

Yes. For queries on the same collection, Milvus concurrently searches the incremental and historical data. However, queries on different collections are conducted in series. Whereas the historical data can be an extremely huge dataset, searches on the historical data are relatively more time-consuming and essentially performed in series.

#### Why does the data in MinIO remain after the corresponding collection is dropped?

Data in MinIO is designed to remain for a certain period of time for the convenience of data rollback.

#### Does Milvus support message engines other than Pulsar?

Yes. Kafka is supported in Milvus 2.1.0.

#### What's the difference between a search and a query?

In Milvus, a vector similarity search retrieves vectors based on similarity calculation and vector index acceleration. Unlike a vector similarity search, a vector query retrieves vectors via scalar filtering based on a boolean expression. The boolean expression filters on scalar fields or the primary key field, and it retrieves all results that match the filters. In a query, neither similarity metrics nor vector index is involved.

#### Why does a float vector value have a precision of 7 decimal digits in Milvus?

Milvus supports storing vectors as Float32 arrays. A Float32 value has a precision of 7 decimal digits. Even with a Float64 value, such as 1.3476964684980388, Milvus stores it as 1.347696. Therefore, when you retrieve such a vector from Milvus, the precision of the Float64 value is lost.

#### How does Milvus handle vector data types and precision?

Milvus supports Binary, Float32, Float16, and BFloat16 vector types.

- Binary vectors: Store binary data as sequences of 0s and 1s, used in image processing and information retrieval.
- Float32 vectors: Default storage with a precision of about 7 decimal digits. Even Float64 values are stored with Float32 precision, leading to potential precision loss upon retrieval.
- Float16 and BFloat16 vectors: Offer reduced precision and memory usage. Float16 is suitable for applications with limited bandwidth and storage, while BFloat16 balances range and efficiency, commonly used in deep learning to reduce computational requirements without significantly impacting accuracy.

#### Does Milvus support specifying default values for scalar or vector fields?

Currently, Milvus 2.4.x does not support specifying default values for scalar or vector fields. This feature is planned for future releases.

#### Is storage space released right after data deletion in Milvus?

No, storage space will not be immediately released when you delete data in Milvus. Although deleting data marks entities as "logically deleted," the actual space might not be freed instantly. Here's why:

- **Compaction**: Milvus automatically compacts data in the background. This process merges smaller data segments into larger ones and removes logically deleted data (entities marked for deletion) or data that has exceeded its Time-To-Live (TTL). However, compaction creates new segments while marking old ones as "Dropped."
- **Garbage Collection**: A separate process called Garbage Collection (GC) periodically removes these "Dropped" segments, freeing up the storage space they occupied. This ensures efficient use of storage but can introduce a slight delay between deletion and space reclamation.

#### Can I see inserted, deleted, or upserted data immediately after the operation without waiting for a flush?

Yes, in Milvus, data visibility is not directly tied to flush operations due to its storage-compute disaggregation architecture. You can manage data readability using consistency levels.

When selecting a consistency level, consider the trade-offs between consistency and performance. For operations requiring immediate visibility, use a "Strong" consistency level. For faster writes, prioritize weaker consistency (data might not be immediately visible). For more information, refer to [Consistency](consistency.md).

#### After enabling the partition key feature, what is the default value of `num_partitions` in Milvus, and why?

When the partition key feature is enabled, the default value of `num_partitions` in Milvus is set to `16`. This default is chosen for stability and performance reasons. You can adjust the `num_partitions` value as needed by specifying it in the `create_collection` function.

#### Is there a maximum length limit for scalar filtering expressions?

Yes, the maximum length of a scalar filtering expression is constrained by the RPC transfer limit, which is defined in the `milvus.yaml` configuration file. Specifically, the limit is set by the `serverMaxRecvSize` parameter under the proxy section:

```yaml
proxy:
  grpc:
    serverMaxRecvSize: 67108864 # The maximum size of each RPC request that the proxy can receive, unit: byte
```

By default, the maximum size of each RPC request is 64MB. Therefore, the length of the filtering expression must be less than this limit to ensure successful processing.

#### When performing a bulk vector search, how many vectors can be specified at once? Is there a limit?

Yes, the number of vectors that can be specified in a bulk vector search is limited by the RPC transfer size, as defined in the `milvus.yaml` configuration file. This limit is determined by the `serverMaxRecvSize` parameter under the proxy section:

```yaml
proxy:
  grpc:
    serverMaxRecvSize: 67108864 # The maximum size of each RPC request that the proxy can receive, unit: byte
```

By default, the maximum size of each RPC request is 64MB. Therefore, the total size of the input vectors, including their dimensional data and metadata, must be less than this limit to ensure successful execution.

#### How can I get all the unique value of a given scalar field from a collection？

Currently, there is no direct method to achieve this. As a workaround, we recommend using a query_iterator to retrieve all values for a specific field, and then perform deduplication manually. We plan to add direct support for this feature in Milvus 2.6. Example use of query_iterator:

```python
# set up iterator
iterator = client.query_iterator(
    collection_name="demo_collection",
    output_fields=["target"]
)
# do iteration and store target values into value_set 
value_set = set()
while True:
    res = iterator.next()
    if len(res) == 0:
        print("query iteration finished, close")
        iterator.close()
        break
    for i in range(len(res)):
        value_set.add(res[i]["target"])

# value_set will contain unique values for target column    
```

#### What are the limitations of using dynamic fields? For example, are there size limits, modification methods, or indexing restrictions?

Dynamic fields are represented internally using JSON fields, with a size limit of 65,536 bytes. They support upsert modifications, allowing you to add or update fields. However, as of Milvus 2.5.1, dynamic fields do not support indexing. Support for adding indexes for JSON will be introduced in future releases.

#### Does Milvus support schema changes?

As of Milvus version 2.5.0, schema changes are limited to specific modifications, such as adjusting properties like the `mmap` parameter. Users can also modify the `max_length` for varchar fields and `max_capacity` for array fields. However, the ability to add or remove fields in schemas is planned for future releases, enhancing the flexibility of schema management within Milvus.

#### Does modifying max_length for VarChar require data reorganization?

No, modifying the `max_length` for a VarChar field does not necessitate data reorganization, such as compaction or reorganization. This adjustment primarily updates the validation criteria for any new data being inserted into the field, leaving existing data unaffected. As a result, this change is considered lightweight and does not impose significant overhead on the system.


#### Still have questions?

You can:

- Check out [Milvus](https://github.com/milvus-io/milvus/issues) on GitHub. You're welcome to raise questions, share ideas, and help others.
- Join our [Slack community](https://slack.milvus.io/) to find support and engage with our open-source community.

