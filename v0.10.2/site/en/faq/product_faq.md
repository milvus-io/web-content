---
id: product_faq.md
---

# Product FAQ

<!-- TOC -->

- [Is Milvus free of charge?](#Is-Milvus-free-of-charge)
- [Does Milvus support non-x86 architecture?](#Does-Milvus-support-non-x86-architecture)
- [Does Milvus support CRUD operations on vectors?](#Does-Milvus-support-CRUD-operations-on-vectors)
- [Can Milvus handle datasets of up to a 100-billion scale?](#Can-Milvus-handle-datasets-of-up-to-a-100-billion-scale)
- [Where does Milvus store imported data?](#Where-does-Milvus-store-imported-data)
- [Why can't I find vectors on SQLite or MySQL?](#Why-can't-I-find-vectors-on-SQLite-or-MySQL)
- [Can I use SQL Server or PostgreSQL to store metadata in Milvus?](#Can-I-use-SQL-Server-or-PostgreSQL-to-store-metadata-in-Milvus)
- [Does Milvus' Python SDK have a connection pool?](#Does-Milvus'-Python-SDK-have-a-connection-pool)
- [Does Milvus support inserting while searching?](#Does-Milvus-support-inserting-while-searching)
- [Is there a graphical tool for managing Milvus?](#Is-there-a-graphical-tool-for-managing-Milvus)
- [Can I export data from Milvus?](#Can-I-export-data-from-Milvus)
- [Why do the retrieved vectors suffer precision loss after the `get_entity_by_id` method call?](#Why-do-the-retrieved-vectors-suffer-precision-loss-after-the-get_entity_by_id-method-call)
- [Should I specify entity IDs when importing vectors or have Milvus generate them for me?](#Should-I-specify-entity-IDs-when-importing-vectors-or-have-Milvus-generate-them-for-me)
- [Is there a length limit on the self-defined entity IDs?](#Is-there-a-length-limit-on-the-self-defined-entity-IDs)
- [Is there a volume limit on the vectors inserted each time?](#Is-there-a-volume-limit-on-the-vectors-inserted-each-time)
- [Why is the `top1` result of a vector search not the search vector itself, if the metric type is inner product?](#Why-is-the-top1-result-of-a-vector-search-not-the-search-vector-itself-if-the-metric-type-is-inner-product)
- [Does the size of a collection affect vector searches in one of its partitions, especially when it holds up to 100 million vectors?](#Does-the-size-of-a-collection-affect-vector-searches-in-one-of-its-partitions-especially-when-it-holds-up-to-100-million-vectors)
- [Does Milvus load the whole collection to the memory if I search only certain partitions in that collection?](#Does-Milvus-load-the-whole-collection-to-the-memory-if-I-search-only-certain-partitions-in-that-collection)
- [Are queries in segments processed in parallel?](#Are-queries-in-segments-processed-in-parallel)
- [How to choose an index in Milvus?](#How-to-choose-an-index-in-Milvus)
- [Can Milvus create different types of index for different partitions?](#Can-Milvus-create-different-types-of-index-for-different-partitions)
- [Can Milvus create different types of index in the same collection?](#Can-Milvus-create-different-types-of-index-in-the-same-collection)
- [Does Milvus create new indexes after vectors are inserted?](#Does-Milvus-create-new-indexes-after-vectors-are-inserted)
- [Does IVF_SQ8 differ from IVF_SQ8H in terms of recall rate?](#Does-IVF_SQ8-differ-from-IVF_SQ8H-in-terms-of-recall-rate)
- [What is the difference between FLAT index and IVF_FLAT index?](#What-is-the-difference-between-FLAT-index-and-IVF_FLAT-index)
- [Why do I see a surge in memory usage when conducting a vector search immediately after an index is created?](#Why-do-I-see-a-surge-in-memory-usage-when-conducting-a-vector-search-immediately-after-an-index-is-created)
- [Can I update `index_file_size` and `metric_type` after creating a collection?](#Can-I-update-index_file_size-and-metric_type-after-creating-a-collection)
- [What is the interval at which Milvus flushes data to the disk?](#What-is-the-interval-at-which-Milvus-flushes-data-to-the-disk)
- [If I have set `preload_collection`, does Milvus service start only after all collections are loaded to the memory?](#If-I-have-set-preload_collection-does-Milvus-service-start-only-after-all-collections-are-loaded-to-the-memory)
- [In what way does Milvus flush data?](#In-what-way-does-Milvus-flush-data)
- [What is the recommended configuration for Mishards?](#What-is-the-recommended-configuration-for-Mishards)
- [Does Mishards support RESTful APIs?](#Does-Mishards-support-RESTful-APIs)
- [What is normalization? Why is normalization needed?](#What-is-normalization-Why-is-normalization-needed)
- [Why do I get different results using Euclidean distance (L2) and inner product (IP) as the distance metric?](#Why-do-I-get-different-results-using-Euclidean-distance-(L2)-and-inner-product-(IP)-as-the-distance-metric)
- [Is there a limit on the total number of collections and partitions?](#Is-there-a-limit-on-the-total-number-of-collections-and-partitions)
- [Why do I get fewer than k vectors when searching for `topk` vectors?](#Why-do-I-get-fewer-than-k-vectors-when-searching-for-topk-vectors)
- [Still have questions?](#Still-have-questions)


<!-- /TOC -->

#### Is Milvus free of charge?

Milvus is an open-source project, and hence is free-of-charge. 

Please adhere to [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0), when using Milvus for reproduction or distribution purposes. 

#### Does Milvus support non-x86 architecture?

No, it does not.

#### Does Milvus support CRUD operations on vectors?

Yes. To update a vector, you can delete it and then insert a new one.

#### Can Milvus handle datasets of up to a 100-billion scale?

By deploying Mishards, a cluster sharding middleware for Milvus, you can process datasets of up to a 100-billion scale.

#### Where does Milvus store imported data?

Vectors imported into Milvus are stored locally at **milvus/db/tables/**.

Metadata can be stored in either MySQL or SQLite. See [Manage Metadata with MySQL](http://192.168.1.105:8090/data_manage.md) for more information.

#### Why can't I find vectors on SQLite or MySQL?

Milvus stores vectors and indexes directly in the disk as files, not in SQLite or MySQL. It uses SQLite or MySQL to store metadata of the vectors instead. 

#### Can I use SQL Server or PostgreSQL to store metadata in Milvus?

No, we only support storing metadata using SQLite or MySQL.

#### Does Milvus' Python SDK have a connection pool?

Python SDKs corresponding to Milvus v0.9.0 or later have a connection pool. There is no upper limit on the default number of connections in a connection pool.

#### Does Milvus support inserting while searching?

Yes.


#### Is there a graphical tool for managing Milvus?

As of Milvus v0.7.0, we have provided [Milvus Enterprise Manager](https://zilliz.com/products/em/) as a graphical tool for managing Milvus.

#### Can I export data from Milvus?

We do not have a dedicated tool as yet. You can call `get_entity_by_id` to get the intended vectors by ID.

#### Why do the retrieved vectors suffer precision loss after the `get_entity_by_id` method call?

Milvus stores and processes each dimension of a vector in single-precision floating-point format (accurate to seven decimal places). Therefore, if the original format of each dimension is double-precision floating-point (accurate to sixteen decimal places), you will see a precision loss.

#### Should I specify entity IDs when importing vectors or have Milvus generate them for me?

Either way is fine. But please note that entity IDs in the same collection must be either user-generated or Milvus-generated. Can't be both. 

#### Is there a length limit on the self-defined entity IDs?

Entity IDs must be non-negative 64-bit integers.

#### Is there a volume limit on the vectors inserted each time?

Vectors inserted each time must not exceed 256 MB.

#### Why is the `top1` result of a vector search not the search vector itself, if the metric type is inner product?

This occurs if you have not normalized the vectors when using inner product as the distance metric.

#### Does the size of a collection affect vector searches in one of its partitions, especially when it holds up to 100 million vectors?

No. If you have specified partitions when conducting a vector search, Milvus searches the specified partitions only.

#### Does Milvus load the whole collection to the memory if I search only certain partitions in that collection?

No, Milvus only loads the partitions to search.

#### Are queries in segments processed in parallel?

Yes. But the parallelism processing mechanism varies with Milvus versions.

Suppose a collection has multiple segments, then when a query request comes in:

- CPU-only Milvus processes the segment reading tasks and the segment searching tasks in pipeline.

- On top of the abovementioned pipeline mechanism, GPU-enabled Milvus distributes the segments among the available GPUs.

See [How Does Milvus Schedule Query Tasks](https://medium.com/unstructured-data-service/how-does-milvus-schedule-query-tasks-2ca38d7bc2f2) for more information.

#### How to choose an index in Milvus?

It depends on your scenario. See [Select Vector Search Tool](vector_db.md) and [How to Choose an Index in Milvus](https://medium.com/unstructured-data-service/how-to-choose-an-index-in-milvus-4f3d15259212) for more information.

#### Are indexes partition-specific?

No. A collection can have only one index type at a time. 

#### Can Milvus create different types of index in the same collection?

No. Although a collection can hold various types of data, the same collection can use only one index type.

#### Does Milvus create new indexes after vectors are inserted?

Yes. When the inserted vectors grow to a specified volume, Milvus creates a new segment and starts to create an index file for it at the same time. The building of the new index file does not affect the existing index files.

#### Does IVF_SQ8 differ from IVF_SQ8H in terms of recall rate?

No, they have the same recall rate for the same dataset.

#### What is the difference between FLAT index and IVF_FLAT index?

IVF_FLAT index divides a vector space into `nlist` clusters. If you keep the default value of `nlist` as 16384, Milvus compares the distances between the target vector and the centers of all 16384 clusters to get `nprobe` nearest clusters. Then Milvus compares the distances between the target vector and the vectors in the selected clusters to get the nearest vectors. Unlike IVF_FLAT, FLAT directly compares the distances between the target vector and each and every vector.

Therefore, when the total number of vectors approximately equals `nlist`, IVF_FLAT and FLAT has little difference in the way of calculation required and search performance. But as the number of vectors grows to two times, three times, or n times of `nlist`, IVF_FLAT index begins to show increasingly greater advantages.

See [Select Vector Search Tool](vector_db.md) for more information.

#### Why do I see a surge in memory usage when conducting a vector search immediately after an index is created?

This is because:

- Milvus loads the newly created index file to the memory for the vector search.

- The original vector files used to create the index are not yet released from the memory, because the size of original vector files and the index file has not exceeded the upper limit specified by `cache.cache_size`.

#### Can I update `index_file_size` and `metric_type` after creating a collection?

No, you cannot.

#### What is the interval at which Milvus flushes data to the disk?

Milvus automatically flushes data to disk at intervals of one second.

#### If I have set `preload_collection`, does Milvus service start only after all collections are loaded to the memory?

Yes. If you have set `preload_collection` in **server_config.yaml**, Milvus' service is not available until it loads all specified collections.

#### In what way does Milvus flush data?

Milvus loads inserted data to the memory and automatically flushes data from memory to the disk at fixed intervals. You can call `flush` to <i>manually</i> trigger this operation. 

#### What is the recommended configuration for Mishards?

We recommend that you configure write nodes to using GPU-enabled Milvus and read nodes to using CPU-only Milvus. If you can have only one write node, you can configure this node to using GPU-enabled Milvus for creating indexes and configure read nodes to using CPU-only Milvus.

#### Does Mishards support RESTful APIs?

No, it does not.

#### What is normalization? Why is normalization needed?

To normalize a vector is to uniformly set the length of all vectors to 1. If you have normalized the vectors in the same space, then the top k nearest vectors returned using Euclidean distance (L2) are identical to the the nearest vectors returned using inner product (IP).

See [Wikipedia](https://en.wikipedia.org/wiki/Unit_vector) for more information.

#### Why do I get different results using Euclidean distance (L2) and inner product (IP) as the distance metric?

Check if the vectors are normalized. If not, you need to normalize the vectors first. Theoretically speaking, similarities worked out by L2 are different from similarities worked out by IP, if the vectors are not normalized.

#### Is there a limit on the total number of collections and partitions?

Yes. The total number of collections and partitions must not exceed 4,096.

#### Why do I get fewer than k vectors when searching for `topk` vectors?

Among the indexes that Milvus supports, IVF_FLAT and IVF_SQ8 implement the k-means clustering method. A data space is divided into `nlist` clusters and the inserted vectors are distributed to these clusters. Milvus then selects the `nprobe` nearest clusters and compares the distances between the target vector and all vectors in the selected clusters to return the final results.

If `nlist` and `k` are large and `nprobe` is small, the amount of vectors in the `nprobe` clusters may be less than `k`. Therefore, when you search for the `topk` nearest vectors, the number of returned vectors is less than k.

To avoid this, try setting `nprobe` larger and `nlist` and `k` smaller.

See [Index Types](index.md) for more information.


#### Still have questions?

You can:

- Check out [Milvus](https://github.com/milvus-io/milvus/issues) on GitHub. You're welcome to raise questions, share ideas, and help others.
- Join our [Slack community](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) to find more help and have fun!



