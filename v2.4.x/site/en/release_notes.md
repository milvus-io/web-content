---
id: release_notes.md
summary: Milvus Release Notes
title: Release Notes
---
# Release Notes

Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.4.0 in this section. We suggest that you regularly visit this page to learn about updates.

## v2.4.0

Release date: April 17, 2024

| Milvus version | Python SDK version | Node.js SDK version |
|----------------|--------------------| --------------------|
| 2.4.0          | 2.4.0              | 2.4.0               |

We are excited to announce the official launch of Milvus 2.4.0. Building upon the solid foundation of the 2.4.0-rc.1 release, we have focused on addressing critical bugs reported by our users, while preserving the existing functionality. In addition, Milvus 2.4.0 introduces a range of optimizations aimed at enhancing system performance, improving observability through the incorporation of various metrics, and streamlining the codebase for increased simplicity.

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

#### Float16 and BFloat16 Vector DataType

Machine learning and neural networks often use half-precision data types, such as Float16 and BFloat16. While these data types can improve query efficiency and reduce memory usage, they come with a tradeoff of reduced accuracy. With this release, Milvus now supports these data types for vector fields.

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
