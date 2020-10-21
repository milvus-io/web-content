---
id: product_faq.md
---

# Product FAQ

<div class="faq-header" id="1">Is Milvus free of charge?</div>

Milvus is an open-source project, and hence is free-of-charge. 

Please adhere to [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0), when using Milvus for reproduction or distribution purposes. 

<div class="faq-header" id="2">Does Milvus support non-x86 architecture?</div>

No, it does not.

<div class="faq-header" id="3">Does Milvus support CRUD operations on vectors?</div>

Yes. To update a vector, you can delete it and then insert a new one.

<div class="faq-header" id="4">Where does Milvus store imported data?</div>

When starting up, Milvus maps the **/var/lib/milvus/db** directory in the container to the corresponding directory on the local drive for storing all imported data, **/home/$USER/milvus/db** for example. 

Metadata can be stored in either MySQL or SQLite. See [Manage Metadata with MySQL](data_manage.md) for more information.

<div class="faq-header" id="5">Why can't I find vectors on SQLite or MySQL?</div>

Milvus stores vectors and indexes directly in the disk as files, not in SQLite or MySQL. It uses SQLite or MySQL to store metadata of the vectors instead. 

<div class="faq-header" id="6">Can I use SQL Server or PostgreSQL to store metadata in Milvus?</div>

No, we only support storing metadata using SQLite or MySQL.

<div class="faq-header" id="7">Does Milvus' Python SDK have a connection pool?</div>

Python SDKs corresponding to Milvus v0.9.0 or later have a connection pool. There is no upper limit on the default number of connections in a connection pool.

<div class="faq-header" id="8">Does Milvus support inserting while searching?</div>

Yes.


<div class="faq-header" id="9">Is there a graphical tool for managing Milvus?</div>

As of Milvus v0.7.0, we have provided [Milvus Enterprise Manager](https://zilliz.com/products/em/) as a graphical tool for managing Milvus.

<div class="faq-header" id="10">Can I export data from Milvus?</div>

We do not have a dedicated tool as yet. You can call `get_entity_by_id` to get the intended vectors by ID.

<div class="faq-header" id="11">Why do the retrieved vectors suffer precision loss after the `get_entity_by_id` method call?</div>

Milvus stores and processes each dimension of a vector in single-precision floating-point format (accurate to seven decimal places). Therefore, if the original format of each dimension is double-precision floating-point (accurate to sixteen decimal places), you will see a precision loss.

<div class="faq-header" id="12">Should I specify Entity IDs when importing vectors or have Milvus generate them for me?</div>

Either way is fine. But please note that Entity IDs in the same collection must be either user-generated or Milvus-generated. Can't be both. 

<div class="faq-header" id="13">Can I insert vectors with existing IDs?</div>

Yes, you can. If you insert vectors with an existing ID, you would end up having duplicate IDs.

<div class="faq-header" id="14">Is there a length limit on the self-defined Entity IDs?</div>

Entity IDs must be non-negative 64-bit integers.

<div class="faq-header" id="15">Is there a volume limit on the vectors inserted each time?</div>

Vectors inserted each time must not exceed 256 MB.

<div class="faq-header" id="16">Why is the `top1` result of a vector search not the search vector itself, if the metric type is inner product?</div>

This occurs if you have not normalized the vectors when using inner product as the distance metric.

<div class="faq-header" id="17">Does the size of a collection affect vector searches in one of its partitions, especially when it holds up to 100 million vectors?</div>

No. If you have specified partitions when conducting a vector search, Milvus searches the specified partitions only.

<div class="faq-header" id="18">Does Milvus load the whole collection to the memory if I search only certain partitions in that collection?</div>

No, Milvus only loads the partitions to search.

<div class="faq-header" id="19">Are queries in segments processed in parallel?</div>

Yes. But the parallelism processing mechanism varies with Milvus versions.

Suppose a collection has multiple segments, then when a query request comes in:

- CPU-only Milvus processes the segment reading tasks and the segment searching tasks in pipeline.
- On top of the abovementioned pipeline mechanism, GPU-enabled Milvus distributes the segments among the available GPUs.

See [How Does Milvus Schedule Query Tasks](https://medium.com/unstructured-data-service/how-does-milvus-schedule-query-tasks-2ca38d7bc2f2) for more information.

<div class="faq-header" id="20">How to choose an index in Milvus?</div>

It depends on your scenario. See [How to Choose an Index in Milvus](https://medium.com/unstructured-data-service/how-to-choose-an-index-in-milvus-4f3d15259212) for more information.

<div class="faq-header" id="21">Are indexes partition-specific?</div>

No. A collection can have only one index type at a time. 

<div class="faq-header" id="22">Can Milvus create different types of index in the same collection?</div>

No. Although a collection can hold various types of data, the same collection can use only one index type.

<div class="faq-header" id="23">Does Milvus create new indexes after vectors are inserted?</div>

Yes. When the inserted vectors grow to a specified volume, Milvus creates a new segment and starts to create an index file for it at the same time. The building of the new index file does not affect the existing index files.

<div class="faq-header" id="24">Does IVF\_SQ8 differ from IVF\_SQ8H in terms of recall rate?</div>

No, they have the same recall rate for the same dataset.

<div class="faq-header" id="25">What is the difference between FLAT index and IVF_FLAT index?</div>

IVF\_FLAT index divides a vector space into `nlist` clusters. If you keep the default value of `nlist` as 16384, Milvus compares the distances between the target vector and the centers of all 16384 clusters to get `nprobe` nearest clusters. Then Milvus compares the distances between the target vector and the vectors in the selected clusters to get the nearest vectors. Unlike IVF\_FLAT, FLAT directly compares the distances between the target vector and each and every vector.

Therefore, when the total number of vectors approximately equals `nlist`, IVF\_FLAT and FLAT has little difference in the way of calculation required and search performance. But as the number of vectors grows to two times, three times, or n times of `nlist`, IVF\_FLAT index begins to show increasingly greater advantages.

See [How to Choose an Index in Milvus](https://medium.com/unstructured-data-service/how-to-choose-an-index-in-milvus-4f3d15259212) for more information.

<div class="faq-header" id="26">Why do I see a surge in memory usage when conducting a vector search immediately after an index is created?</div>

This is because:

- Milvus loads the newly created index file to the memory for the vector search.

- The original vector files used to create the index are not yet released from the memory, because the size of original vector files and the index file has not exceeded the upper limit specified by `cache.cache_size`.

<div class="faq-header" id="27">Can I update `segment_row_limit` and `metric_type` after creating a collection?</div>

No, you cannot.

<div class="faq-header" id="28">What is the interval at which Milvus flushes data to the disk?</div>

Milvus automatically flushes data to disk at intervals of one second.

<div class="faq-header" id="29">If I have set `preload_collection`, does Milvus service start only after all collections are loaded to the memory?</div>

Yes. If you have set `preload_collection` in **milvus.yaml**, Milvus' service is not available until it loads all specified collections.

<div class="faq-header" id="30">In what way does Milvus flush data?</div>

Milvus loads inserted data to the memory and automatically flushes data from memory to the disk at fixed intervals. You can call `flush` to <i>manually</i> trigger this operation. 

<div class="faq-header" id="31">What is normalization? Why is normalization needed?</div>

Normalization refers to the process of converting an embedding (vector) so that its norm equals 1. If you use Inner Product to calculate embeddings similarities, you must normalize your embeddings. After normalization, inner product equals cosine similarity.

See [Wikipedia](https://en.wikipedia.org/wiki/Unit_vector) for more information.

<div class="faq-header" id="32">Why do I get different results using Euclidean distance (L2) and inner product (IP) as the distance metric?</div>

Check if the vectors are normalized. If not, you need to normalize the vectors first. Theoretically speaking, similarities worked out by L2 are different from similarities worked out by IP, if the vectors are not normalized.

<div class="faq-header" id="33">Is there a limit on the total number of collections and partitions?</div>

Yes. The total number of collections and partitions must not exceed 4,096.

<div class="faq-header" id="34">Why do I get fewer than k vectors when searching for `topk` vectors?</div>

Among the indexes that Milvus supports, IVF\_FLAT and IVF\_SQ8 implement the k-means clustering method. A data space is divided into `nlist` clusters and the inserted vectors are distributed to these clusters. Milvus then selects the `nprobe` nearest clusters and compares the distances between the target vector and all vectors in the selected clusters to return the final results.

If `nlist` and `k` are large and `nprobe` is small, the amount of vectors in the `nprobe` clusters may be less than `k`. Therefore, when you search for the `topk` nearest vectors, the number of returned vectors is less than k.

To avoid this, try setting `nprobe` larger and `nlist` and `k` smaller.

See [Index Types](index.md) for more information.


<div class="faq-header" id="35">Still have questions?</div>

You can:

- Check out [Milvus](https://github.com/milvus-io/milvus/issues) on GitHub. You're welcome to raise questions, share ideas, and help others.
- Join our [Slack community](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) to find more help and have fun!



