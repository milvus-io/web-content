---
id: product_faq.md
title: Product FAQ
---

# Product FAQ

<!-- TOC -->

- [Does Milvus 0.7.0 support data files from previous versions of Milvus?](#Does-Milvus-070-support-data-files-from-previous-versions-of-Milvus)
- [Does Milvus 0.7.0 support server configuration files from previous versions of Milvus?](#Does-Milvus-070-support-server-configuration-files-from-previous-versions-of-Milvus)
- [Does Milvus 0.7.0 support applications built by clients from previous versions of Milvus?](#Does-Milvus-070-support-applications-built-by-clients-from-previous-versions-of-Milvus)
- [What is Milvus?](#What-is-Milvus)
- [When is Milvus a good choice?](#When-is-Milvus-a-good-choice)
- [How to use Milvus?](#How-to-use-Milvus)
- [How easy is it to use Milvus?](#How-easy-is-it-to-use-Milvus)
- [Is Milvus highly available?](#Is-Milvus-highly-available)
- [Can Milvus handle datasets with 10-billion or 100-billion scale?](#Can-Milvus-handle-datasets-with-10-billion-or-100-billion-scale)
- [How does Milvus work?](#How-does-Milvus-work)
- [Which index methods are supported?](#Which-index-methods-are-supported)
- [Does Milvus support simultaneous inserting and searching?](#Does-Milvus-support-simultaneous-inserting-and-searching)
- [Where are the data stored?](#Where-are-the-data-stored)
- [How does Milvus compare to other vector search tools?](#How-does-Milvus-compare-to-other-vector-search-tools)
- [Is Milvus an end-to-end product?](#Is-Milvus-an-end-to-end-product)
- [Have questions that were not answered?](#Have-questions-that-were-not-answered)

<!-- /TOC -->

- #### How much does Milvus cost?

  Milvus is a 100% free open-source project.

  Please adhere to [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0) when using Milvus for production or distribution purposes.

  Zilliz, the company behind Milvus, also offers a fully managed cloud version of the platform for those that don't want to build and maintain their own distributed instance. [Zilliz Cloud](https://zilliz.com/cloud) automatically maintains data reliability and allows users to pay only for what they use.

  #### Does Milvus support non-x86 architectures?

  Milvus cannot be installed or run on non-x86 platforms.

  Your CPU must support one of the following instruction sets to run Milvus: SSE42, AVX, AVX2, AVX512. These are all x86-dedicated SIMD instruction sets.

  #### What is the maximum dataset size Milvus can handle?

  
  Theoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:

  - Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.
  - When new entities and and collection-related schema (currently only minIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.

  ####  Where does Milvus store data?

  Milvus deals with two types of data, inserted data and metadata. 

  Inserted data, including vector data, scalar data, and collection-specific schema, is stored in persistent storage (for now minIO only) as incremental log.

  Metadata is generated within Milvus. Each Milvus module has its own metadata that is stored in etcd.

  #### Why is there no vector data in etcd?

  etcd stores Milvus module metadata; MinIO stores entities.

  #### Does Milvus' Python SDK have a connection pool?

  Python SDKs for Milvus v0.9.0 or higher have a connection pool. The number of connections in a connection pool has no upper limit.

  #### Does Milvus support inserting and searching data simultaneously?

  Yes. Insert operations and query operations are handled by two separate modules that are mutually independent. From the client’s perspective, an insert operation is complete when the inserted data enters the message queue. However, inserted data is unsearchable until it is loaded to the query node. If the segment size does not reach the index-building threshold (512 MB by default), Milvus resorts to brute-force search and query performance may be diminished.

  #### Can vectors with duplicate IDs be inserted into Milvus?

  Yes. Milvus does not check if vector IDs are duplicates.

  #### When vectors with duplicate IDs are inserted, does Milvus treat it as an update operation?

  No. Milvus does not currently support update operations and does not check if entity IDs are duplicates. You are responsible for ensuring entity IDs are unique, and if they aren't Milvus may contain multiple entities with duplicate IDs.

  If this occurs, duplicate IDs may be returned from a search, causing confusion.

  #### What is the maximum length of self-defined entity IDs?

  Entity IDs must be non-negative 64-bit integers.

  #### What is the maximum amount of data that can be added per insert operation?

  An insert operation must not exceed 1,024 MB in size. This is a limit imposed by gRPC.

  #### Does collection size impact query performance when searching in a specific partition?

  No. If partitions for a search are specified, Milvus searches the specified partitions only.

  #### Does Milvus load the entire collection when partitions are specified for a search?

  No. Milvus v2.0 has varied behavior. Data must be loaded to memory before searching.

  - If you know which partitions your data is located in, call `load_partition()` to load the intended partition(s) *then* specify partition(s) in the `search()` method call.
  - If you do not know the exact partitions, call `load_collection()` before calling `search()`.
  - If you fail to load collections or partitions before searching, Milvus returns an error.

  #### Can multiple indices be created for the same field in a collection?

  Yes. Multiple indices can be built on the same field of a collection. However, each index must be assigned a unique name in the collection. If indices are not given unique names, new ones overwrite old ones. Call `load_index()` to load a specified index to memory so that Milvus searches it.

  #### Can indices be created after inserting vectors?

  Yes. If `create_index()` is called, Milvus builds an index for subsequently inserted vectors. However, Milvus does not build an index until the newly inserted vectors fill an entire segment and the newly created index file is separate from the previous one.

  #### Does recall vary between IVF_SQ8 and IVF_SQ8H?

  No. The IVF_SQ8 and IVF_SQ8H indices have the same recall for queries performed on the same dataset.

  #### How are the FLAT and IVF_FLAT indices different?

  The IVF_FLAT index divides vector space into list clusters. At the default list value of 16,384, Milvus compares the distances between the target vector and the centroids of all 16,384 clusters to return probe nearest clusters. Milvus then compares the distances between the target vector and the vectors in the selected clusters to get the nearest vectors. Unlike IVF_FLAT, FLAT directly compares the distances between the target vector and every other vector.

  When the total number of vectors approximately equals nlist, there is little distance between IVF_FLAT and FLAT in terms of calculation requirements and search performance. However, as the number of vectors exceeds nlist by a factor of two or more, IVF_FLAT begins to demonstrate performance advantages.

  See [How to Choose an Index in Milvus](https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing) for more information.

  #### How does Milvus flush data?

  Milvus returns success when inserted data is loaded to the message queue. However, the data is not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.

  #### What is normalization? Why is normalization needed?

  Normalization refers to the process of converting a vector so that its norm equals 1. If inner product is used to calculate vector similarity, vectors must be normalized. After normalization, inner product equals cosine similarity.

  See [Wikipedia](https://en.wikipedia.org/wiki/Unit_vector) for more information.

  #### Why do Euclidean distance (L2) and inner product (IP) return different results?

  For normalized vectors, Euclidean distance (L2) is mathematically equivalent to inner product (IP). If these similarity metrics return different results, check to see if your vectors are normalized

  #### Is there a limit to the total number of collections and partitions in Milvus?

  There is no limit on the number of collections. However, the number of partitions in each collection must not exceed the value set by the parameter `master.maxPartitionNum`.

  #### Why do I get fewer than k vectors when searching for topk vectors?

  Among the indices that Milvus supports, IVF_FLAT and IVF_SQ8 implement the k-means clustering method. A data space is divided into `nlist` clusters and the inserted vectors are distributed to these clusters. Milvus then selects the `nprobe` nearest clusters and compares the distances between the target vector and all vectors in the selected clusters to return the final results.

  If `nlist` and `topk` are large and nprobe is small, the number of vectors in the nprobe clusters may be less than `k`. Therefore, when you search for the `topk` nearest vectors, the number of returned vectors is less than `k`.

  To avoid this, try setting `nprobe` larger and `nlist` and `k` smaller.

  See [Index](index.md) for more information.

  #### What is the maximum vector dimension supported in Milvus?

  Milvus can manage vectors with up to 32,768 dimensions.

  #### Still have questions?

  You can:

  - Check out [Milvus](https://github.com/milvus-io/milvus/issues) on GitHub. You're welcome to raise questions, share ideas, and help others.
  - Join our [Slack community](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) to find support and engage with our open-source community.

