---
id: release_notes.md
summary: Milvus Release Notes
title: Release Notes
---
# Release Notes

Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.4.0 in this section. We suggest that you regularly visit this page to learn about updates.

## v2.4.1

Release date: May 6, 2024

| Milvus version | Python SDK version | Java SDK version    | Node.js SDK version |
|----------------|--------------------| --------------------| --------------------|
| 2.4.0          | 2.4.0              | 2.4.0               | 2.4.2               |

Milvus version 2.4.1 brings numerous improvements and bug fixes that aim to enhance the software's performance, observability, and stability. These improvements include a declarative resource group API, enhanced bulk insert functionality that supports Float16/BFloat16 vector data types, a refined garbage collection (GC) mechanism that reduces list operations for object storage, and other changes related to performance optimizations. Additionally, bug fixes address issues such as compilation errors, failed fuzzy matches on newline characters, incorrect parameter datatypes for RESTful interfaces, and BulkInsert raising errors on numpy files when dynamic fields are enabled.

### Breaking changes

- Discontinued support for delete with an empty filter expression. ([#32472](https://github.com/milvus-io/milvus/pull/32472))

### Improvements

- Added declarative resource group api ([#31930](https://github.com/milvus-io/milvus/pull/31930) [#32297](https://github.com/milvus-io/milvus/pull/32297) [#32536](https://github.com/milvus-io/milvus/pull/32536) [#32666](https://github.com/milvus-io/milvus/pull/32666))
- Added support for Float16/BFloat16 vector data types in bulk insert ([#32157](https://github.com/milvus-io/milvus/pull/32157))
- Revised the implementation of garbage collection to minimize list operations associated with object storage([#31740](https://github.com/milvus-io/milvus/pull/31740))
- Enhanced the management of milvus.yaml by automatically generating relevant configuration items in the milvus.yaml file through code([#31832](https://github.com/milvus-io/milvus/pull/31832) [#32357](https://github.com/milvus-io/milvus/pull/32357))
- Enhanced sparse float vector to support brute force iterator search and range search ([#32635](https://github.com/milvus-io/milvus/pull/32635))
- Enhanced the performance of the Query by retrieving the data after performing local reduction ([#32346](https://github.com/milvus-io/milvus/pull/32346))
- Reduced the cpu usage when collection number is high ([#32245](https://github.com/milvus-io/milvus/pull/32245))
- Added WithBlock option for etcd client creation ([#32641](https://github.com/milvus-io/milvus/pull/32641))
- Used client_request_id specified by the client as the TraceID if client provided([#32264](https://github.com/milvus-io/milvus/pull/32264))
- Added db label to the metrics for the delete and bulk insert operations([#32611](https://github.com/milvus-io/milvus/pull/32611))
- Added logic to skip the verification through configuration for AutoID and PartitionKey columns([#32592](https://github.com/milvus-io/milvus/pull/32592))
- Refined errors related to authentication ([#32253](https://github.com/milvus-io/milvus/pull/32253))
- Refined error logs for AllocSegmentID in DataCoord([#32351](https://github.com/milvus-io/milvus/pull/32351) [#32335](https://github.com/milvus-io/milvus/pull/32335))
- Removed duplicate metrics([#32380](https://github.com/milvus-io/milvus/pull/32380) [#32308](https://github.com/milvus-io/milvus/pull/32308)) and clean up unused metrics([#32404](https://github.com/milvus-io/milvus/pull/32404) [#32515](https://github.com/milvus-io/milvus/pull/32515))
- Added configuration option to control whether to enforce the activation of the partitionKey feature([#32433](https://github.com/milvus-io/milvus/pull/32433))
- Added configuration option to control the maximum amount of data that can be inserted in a single request([#32433](https://github.com/milvus-io/milvus/pull/32433))
- Parallelize the applyDelete operation at the segment level to accelerate the processing of Delete messages by the Delegator([#32291](https://github.com/milvus-io/milvus/pull/32291))
- Used index ([#32232](https://github.com/milvus-io/milvus/pull/32232) [#32505](https://github.com/milvus-io/milvus/pull/32505) [#32533](https://github.com/milvus-io/milvus/pull/32533) [#32595](https://github.com/milvus-io/milvus/pull/32595)) and add cache ([#32580](https://github.com/milvus-io/milvus/pull/32580)) to accelerate frequent filtering operations in QueryCoord.
- Rewrote the data structure([#32273](https://github.com/milvus-io/milvus/pull/32273)) and refactor code([#32389](https://github.com/milvus-io/milvus/pull/32389) ) to accelerate common operations in DataCood.
- Refactored the data structure used in the SyncManager of DataNode to reduce memory usage and prevent errors ([#32673](https://github.com/milvus-io/milvus/pull/32673))
- Rewrote the collection observer in QueryCoord to make it task-driven([#32441](https://github.com/milvus-io/milvus/pull/32441))
- Removed openblas from conan([#32002](https://github.com/milvus-io/milvus/pull/32002))

### Bug fixes

- Fixed build milvus in rockylinux8 ([#32619](https://github.com/milvus-io/milvus/pull/32619))
- Fixed compilation errors for SVE on ARM ([#32463](https://github.com/milvus-io/milvus/pull/32463) [#32270](https://github.com/milvus-io/milvus/pull/32270))
- Fixed the crash issue on ARM-based GPU images([#31980](https://github.com/milvus-io/milvus/pull/31980)).
- Fixed regex query can't handle text with newline ([#32569](https://github.com/milvus-io/milvus/pull/32569))
- Fixed search get empty result caused by GetShardLeaders return empty node list ([#32685](https://github.com/milvus-io/milvus/pull/32685))
- Fixed BulkInsert raised error when encountering dynamic fields in numpy files([#32596](https://github.com/milvus-io/milvus/pull/32596))
- Fixed bugs related to the RESTFulV2 interface, including an important fix that allows numeric parameters in requests to accept numerical input instead of string type([#32485](https://github.com/milvus-io/milvus/pull/32485) [#32355](https://github.com/milvus-io/milvus/pull/32355))
- Fixed memory leak in proxy by remove watching config event in rate limiter([#32313](https://github.com/milvus-io/milvus/pull/32313))
- Fixed the issue where the rate limiter incorrectly reports that the partition cannot be found when partitionName is not specified([#32647](https://github.com/milvus-io/milvus/pull/32647))
- Added detection between the cases of Collection being in the recovery state and not being loaded in the error type.（[#32447](https://github.com/milvus-io/milvus/pull/32447)）
- Corrected the negative queryable num entities metric ([#32361](https://github.com/milvus-io/milvus/pull/32361))

## v2.4.0

Release date: April 17, 2024

| Milvus version | Python SDK version | Node.js SDK version |
|----------------|--------------------| --------------------|
| 2.4.0          | 2.4.0              | 2.4.0               |

We are excited to announce the official launch of Milvus 2.4.- Building upon the solid foundation of the 2.4.0-rc.1 release, we have focused on addressing critical bugs reported by our users, while preserving the existing functionality. In addition, Milvus 2.4.0 introduces a range of optimizations aimed at enhancing system performance, improving observability through the incorporation of various metrics, and streamlining the codebase for increased simplicity.

### Improvements

- Support for MinIO TLS connections ([#31396](https://github.com/milvus-io/milvus/pull/31396), [#31618](https://github.com/milvus-io/milvus/pull/31618))
- AutoIndex support for scalar fields ([#31593](https://github.com/milvus-io/milvus/pull/31593))
- Hybrid search refactoring for consistent execution paths with regular search ([#31742](https://github.com/milvus-io/milvus/pull/31742), [#32178](https://github.com/milvus-io/milvus/pull/32178))
- Accelerated filtering through bitset and bitset_view refactoring ([#31592](https://github.com/milvus-io/milvus/pull/31592), [#31754](https://github.com/milvus-io/milvus/pull/31754), [#32139](https://github.com/milvus-io/milvus/pull/32139))
- Import tasks now support waiting for data index completion ([#31733](https://github.com/milvus-io/milvus/pull/31733))
- Enhanced Import compatibility ([#32121](https://github.com/milvus-io/milvus/pull/32121)), task scheduling ([#31475](https://github.com/milvus-io/milvus/pull/31475)), and limits on imported file size and number ([#31542](https://github.com/milvus-io/milvus/pull/31542)).
- Code simplification efforts including interface standardization for type checking ([#31945](https://github.com/milvus-io/milvus/pull/31945), [#31857](https://github.com/milvus-io/milvus/pull/31857)), removal of deprecated code and metrics ([#32079](https://github.com/milvus-io/milvus/pull/32079), [#32134](https://github.com/milvus-io/milvus/pull/32134), [#31535](https://github.com/milvus-io/milvus/pull/31535), [#32211](https://github.com/milvus-io/milvus/pull/32211), [#31935](https://github.com/milvus-io/milvus/pull/31935)), and normalization of constant names ([#31515](https://github.com/milvus-io/milvus/pull/31515))
- New metrics for QueryCoord current target channel check point lag latency ([#31420](https://github.com/milvus-io/milvus/pull/31420))
- New db label for common metrics([#32024](https://github.com/milvus-io/milvus/pull/32024))
- New metrics regarding the count of deleted, indexed, and loaded entities, with the inclusion of labels such as collectionName and dbName ([#31861](https://github.com/milvus-io/milvus/pull/31861))
- Error handling improvements for mismatched vector types ([#31766](https://github.com/milvus-io/milvus/pull/31766))
- Support for throwing errors instead of crashing when index cannot be built ([#31845](https://github.com/milvus-io/milvus/pull/31845))
- Support for invalidating the database meta cache when dropping databases ([#32092](https://github.com/milvus-io/milvus/pull/32092))
- Interface refactoring for channel distribution ([#31814](https://github.com/milvus-io/milvus/pull/31814)) and leader view management ([#32127](https://github.com/milvus-io/milvus/pull/32127))
- Refactor channel dist manager interface([#31814](https://github.com/milvus-io/milvus/pull/31814)) and Refactor leader view manager interface([#32127](https://github.com/milvus-io/milvus/pull/32127))
- Batch processing ([#31632](https://github.com/milvus-io/milvus/pull/31632)), adding mapping information ([#32234](https://github.com/milvus-io/milvus/pull/32234), [#32249](https://github.com/milvus-io/milvus/pull/32249)), and avoiding usage of lock ([#31787](https://github.com/milvus-io/milvus/pull/31787)) to accelerate frequently invoked operations

### Breaking Changes

- Discontinued grouping search on binary vectors ([#31735](https://github.com/milvus-io/milvus/pull/31735))
- Discontinued grouping search with hybrid search([#31812](https://github.com/milvus-io/milvus/pull/31812))
- Discontinued HNSW index on binary vectors ([#31883](https://github.com/milvus-io/milvus/pull/31883))

### Bug Fixes

- Enhanced data type and value checks for queries and insertions to prevent crashes ([#31478](https://github.com/milvus-io/milvus/pull/31478), [#31653](https://github.com/milvus-io/milvus/pull/31653), [#31698](https://github.com/milvus-io/milvus/pull/31698), [#31842](https://github.com/milvus-io/milvus/pull/31842), [#32042](https://github.com/milvus-io/milvus/pull/32042), [#32251](https://github.com/milvus-io/milvus/pull/32251), [#32204](https://github.com/milvus-io/milvus/pull/32204))
- RESTful API bug fixes ([#32160](https://github.com/milvus-io/milvus/pull/32160))
- Improved prediction of inverted index resource usage ([#31641](https://github.com/milvus-io/milvus/pull/31641))
- Resolution of connection issues with etcd when authorization is enabled ([#31668](https://github.com/milvus-io/milvus/pull/31668))
- Security update for nats server ([#32023](https://github.com/milvus-io/milvus/pull/32023))
- Stored inverted index files into a local storage path of QueryNode instead of /tmp ([#32210](https://github.com/milvus-io/milvus/pull/32210))
- Addressed datacoord memory leaks for collectionInfo ([#32243](https://github.com/milvus-io/milvus/pull/32243))
- Fixes for fp16/bf16 related bugs potentially causing system panic ([#31677](https://github.com/milvus-io/milvus/pull/31677), [#31841](https://github.com/milvus-io/milvus/pull/31841), [#32196](https://github.com/milvus-io/milvus/pull/32196))
- Resolved issues with grouping search returning insufficient results ([#32151](https://github.com/milvus-io/milvus/pull/32151))
- Adjustment of search with iterators to handle offsets in the Reduce step more effectively and ensure adequate results with "reduceStopForBest" enabled ([#32088](https://github.com/milvus-io/milvus/pull/32088))

## v2.4.0-rc.1
Release date: March 20, 2024

| Milvus version | Python SDK version |
|----------------|--------------------|
| 2.4.0-rc.1     | 2.4.0              |

This release introduces several scenario-based features:

- **New GPU Index - CAGRA**: Thanks to NVIDIA's contribution, this new GPU index offers a 10x performance boost, especially for batch searches. For details, refer to [GPU Index](gpu_index.md).

- **Multi-vector** and **Hybrid Search**: This feature enables storing vector embeddings from multiple models and conducting multi-vector searches. For details, refer to [Multi-vector Search](multi-vector-search.md).

- **Sparse Vectors**: Ideal for keyword interpretation and analysis, sparse vectors are now supported for processing in your collection. For details, refer to [Sparse Vectors](sparse_vector.md).

- **Grouping Search**: Categorical aggregation enhances document-level recall for Retrieval-Augmented Generation (RAG) applications. For details, refer to [Grouping Search](https://milvus.io/docs/single-vector-search.md#Grouping-search).

- **Inverted Index** and **Fuzzy Matching**: These capabilities improve keyword retrieval for scalar fields. For details, refer to [Index Scalar Fields](index-scalar-fields.md) and [Filtered Search](single-vector-search.md#filtered-search).

### New Features

#### GPU Index - CAGRA

We would like to express our sincere gratitude to the NVIDIA team for their invaluable contribution to CAGRA, a state-of-the-art (SoTA) GPU-based graph index that can be used online. 

Unlike previous GPU indices, CAGRA demonstrates overwhelming superiority even in small batch queries, an area where CPU indices traditionally excel. In addition, CAGRA's performance in large batch queries and index construction speed, domains where GPU indices already shine, is truly unparalleled.

Example code can be found in [example_gpu_cagra.py](https://github.com/milvus-io/pymilvus/blob/2.4/examples/example_gpu_cagra.py).

#### Sparse Vector (Beta)

In this release, we are introducing a new type of vector field called sparse vector. Sparse vectors are different from their dense counterparts as they tend to have several magnitude higher number of dimensions with only a handful being non-zero. This feature offers better interpretability due to its term-based nature and can be more effective in certain domains. Learned sparse models such as SPLADEv2/BGE-M3 have proven to be very useful for common first-stage ranking tasks. The main use case for this new feature in Milvus is to allow efficient approximate semantic nearest neighbor search over sparse vectors generated by neural models such as SPLADEv2/BGE-M3 and statistics models such as the BM25 algorithm. Milvus now supports effective and high-performance storage, indexing, and searching (MIPS, Maximum Inner Product Search) of sparse vectors.

Example code can be found in [hello_sparse.py](https://github.com/milvus-io/pymilvus/blob/2.4/examples/hello_sparse.py).

#### Multi Embedding &  Hybrid Search

Multi-vector support is the cornerstone for applications that require multi-model data processing or a mix of dense and sparse vectors. With multi-vector support, now you can:

- Store vector embeddings generated for unstructured text, image, or audio samples from multiple models.
- Conduct ANN searches that include multiple vectors of each entity.
- Customize search strategies by assigning weights to different embedding models.
- Experiment with various embedding models to find the optimal model combination.

Multi-vector support allows storing, indexing, and applying reranking strategies to multiple vector fields of different types, such as FLOAT_VECTOR and SPARSE_FLOAT_VECTOR, in a collection. Currently, two reranking strategies are available: **Reciprocal Rank Fusion (RRF)** and **Average Weighted Scoring**. Both strategies combine the search results from different vector fields into a unified result set. The first strategy prioritizes the entities that consistently appear in the search results of different vector fields, while the other strategy assigns weights to the search results of each vector field to determine their importance in the final result set.

Example code can be found in [hybrid_search.py](https://github.com/milvus-io/pymilvus/blob/2.4/examples/hybrid_search.py).

#### Inverted Index and Fuzzy Match

In previous releases of Milvus, memory-based binary search indexes and Marisa Trie indexes were used for scalar field indexing. However, these methods were memory-intensive. The latest release of Milvus now employs the Tantivy-based inverted index, which can be applied to all numeric and string data types. This new index dramatically improves scalar query performance, reducing the query of keywords in strings by ten times. In addition, The inverted index consumes less memory, thanks to additional optimizations in data compression and Memory-mapped storage (MMap) mechanism of the internal indexing structure.

This release also supports fuzzy matches in scalar filtering using prefixes, infixes, and suffixes.

Example code can be found in [inverted_index_example.py](https://github.com/milvus-io/pymilvus/blob/2.4/examples/inverted_index_example.py) and [fuzzy_match.py](https://github.com/milvus-io/pymilvus/blob/2.4/examples/fuzzy_match.py).

#### Grouping Search

You can now aggregate the search results by the values in a specific scalar field. This helps RAG applications to implement document-level recall. Consider a collection of documents, each document splits into various passages. Each passage is represented by one vector embedding and belongs to one document. To find the most relevant documents instead of scattering passages, you can include the group_by_field argument in the search() operation to group results by the document ID.

Example code can be found in [example_group_by.py](https://github.com/milvus-io/pymilvus/blob/2.4/examples/example_group_by.py).

#### Float16 and BFloat- Vector DataType

Machine learning and neural networks often use half-precision data types, such as Float16 and BFloat- While these data types can improve query efficiency and reduce memory usage, they come with a tradeoff of reduced accuracy. With this release, Milvus now supports these data types for vector fields.

Example code can be found in [float16_example.py](https://github.com/milvus-io/pymilvus/blob/2.4/examples/float16_example.py) and [bfloat16_example.py](https://github.com/milvus-io/pymilvus/blob/2.4/examples/bfloat16_example.py).

### Upgraded Architecture

#### L0 Segment

This release includes a new segment called L0 Segment, designed to record deleted data. This segment periodically compacts stored deleted records and splits them into sealed segments, reducing the number of data flushes required for small deletions and leaving a small storage footprint. With this mechanism, Milvus completely separates data compactions from data flushes, enhancing the performance of delete and upsert operations.

#### Refactored BulkInsert

This release also introduces improved bulk-insert logic. This allows you to import multiple files in a single bulk-insert request. With the refactored version, both the performance and stability of bulk insert have seen significant improvements. The user experience has also been enhanced, such as fine-tuned rate limiting and more user-friendly error messages. In addition, you can easily access the bulk-insert endpoints through Milvus' RESTful API.

#### Memory-mapped Storage

Milvus uses memory-mapped storage (MMap) to optimize its memory usage. Instead of loading file content directly into memory, this mechanism maps the file content into memory. This approach comes with a tradeoff of performance degradation.  By enabling MMap for an HNSW-indexed collection on a host with 2 CPUs and 8 GB RAM, you can load 4x more data with less than 10% performance degradation.

In addition, this release also allows dynamic and fine-grained control over MMap without the need to restart Milvus.

For details, refer to [MMap Storage](mmap.md).

### Others

#### Milvus-CDC

Milvus-CDC is an easy-to-use companion tool to capture and synchronize incremental data between Milvus instances, allowing for easy incremental backup and disaster recovery. In this release, Milvus-CDC has improved stability, and its Change Data Capture (CDC) functionality now becomes generally available.

To learn more about Milvus-CDC, refer to [GitHub repository](https://github.com/zilliztech/milvus-cdc) and [Milvus-CDC Overview](milvus-cdc-overview.md).

#### Refined MilvusClient Interfaces

MilvusClient is an easy-to-use alternative to the ORM module. It adopts a purely functional approach to simplify interactions with the server. Instead of maintaining a connection pool, each MilvusClient establishes a gRPC connection to the server. 
The MilvusClient module has implemented most of the functionalities of the ORM module.
To learn more about the MilvusClient module, visit [pymilvus](https://github.com/milvus-io/pymilvus) and the [reference documents](/api-reference/pymilvus/v2.4.x/About.md).
