---
id: release_notes.md
summary: Milvus Release Notes
title: Release Notes
---

# Release Notes

Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.5.0 in this section. We suggest that you regularly visit this page to learn about updates.

## v2.5.2

Release date: January 3, 2025

| Milvus version | Python SDK version | Node.js SDK version | Java SDK version |
|----------------|--------------------|---------------------|------------------|
| 2.5.2          | 2.5.3              | 2.5.3               | 2.5.3            |

Milvus 2.5.2 supports modifying the maximum length for VARCHAR columns and resolves several critical issues related to concurrency, partition drops, and BM25 stats handling during import. We highly recommend upgrading to this version for improved stability and performance.

### Improvements

- Generated disk usage logs only when the specified path does not exist. ([#38822](https://github.com/milvus-io/milvus/pull/38822))
- Added a parameter for tuning the maximum VARCHAR length and restored the limit to 65,535. ([#38883](https://github.com/milvus-io/milvus/pull/38883))
- Supported parameter type conversion for expressions. ([#38782](https://github.com/milvus-io/milvus/pull/38782))

### Bug fixes

- Fixed potential deadlocks in concurrency scenarios. ([#38863](https://github.com/milvus-io/milvus/pull/38863))
- Generated the index_null_offset file only for fields that support null values. ([#38834](https://github.com/milvus-io/milvus/pull/38834))
- Fixed the retrieve plan usage after free in the reduce phase. ([#38841](https://github.com/milvus-io/milvus/pull/38841))
- Recognized expressions with capitalized AND and OR. ([#38928](https://github.com/milvus-io/milvus/pull/38928))
- Allowed successful partition drops even if loading failed. ([#38874](https://github.com/milvus-io/milvus/pull/38874))
- Fixed BM25 stats file registration issues during import. ([#38881](https://github.com/milvus-io/milvus/pull/38881))

## v2.5.1

Release date: December 26, 2024

| Milvus version | Python SDK version | Node.js SDK version | Java SDK version |
|----------------|--------------------|---------------------|------------------|
| 2.5.1          | 2.5.2              | 2.5.2               | 2.5.2            |

Milvus 2.5.1 focuses on a series of bug fixes addressing memory loading, RBAC listings, query node balancing, and sealed segment indexing, while also improving the Web UI and interceptors. We highly recommend upgrading to 2.5.1 for enhanced stability and reliability.

### Improvement

- Update web UI collection and query pages. ([#38701](https://github.com/milvus-io/milvus/pull/38701))

### Bug fixes

- Fixed OOM issues by adding a memory factor to loading estimations. ([#38722](https://github.com/milvus-io/milvus/pull/38722))
- Fixed privilege group expansion when listing policies in RootCoord. ([#38760](https://github.com/milvus-io/milvus/pull/38760))
- Fixed issues with listing privilege groups and collections. ([#38738](https://github.com/milvus-io/milvus/pull/38738))
- Fixed the balancer to avoid repeatedly overloading the same query node. ([#38724](https://github.com/milvus-io/milvus/pull/38724))
- Fixed unexpected balance tasks triggered after QueryCoord restarts. ([#38725](https://github.com/milvus-io/milvus/pull/38725))
- Fixed load config updates not applying to loading collections. ([#38737](https://github.com/milvus-io/milvus/pull/38737))
- Fixed zero read count during data import. ([#38695](https://github.com/milvus-io/milvus/pull/38695))
- Fixed Unicode decoding for JSON keys in expressions. ([#38653](https://github.com/milvus-io/milvus/pull/38653))
- Fixed interceptor DB name for alterCollectionField in 2.5.  ([#38663](https://github.com/milvus-io/milvus/pull/38663))
- Fixed empty index parameters for sealed segments when using BM25 brute force search. ([#38752](https://github.com/milvus-io/milvus/pull/38752))


## v2.5.0

Release date: December 23, 2024

| Milvus version | Python SDK version | Node.js SDK version | Java SDK version |
|----------------|--------------------|---------------------|------------------|
| 2.5.0          | 2.5.1              | 2.5.2               | 2.5.2            |

Milvus 2.5.0 brings significant advancements to enhance usability, scalability, and performance for users dealing with vector search and large-scale data management. With this release, Milvus integrates powerful new features like term-based search, clustering compaction for optimized queries, and versatile support for sparse and dense vector search methods. Enhancements in cluster management, indexing, and data handling introduce new levels of flexibility and ease of use, making Milvus an even more robust and user-friendly vector database.

### Key Features

#### Full Text Search

Milvus 2.5 supports full text search implemented with Sparse-BM25! This feature is an important complement to Milvus's strong semantic search capabilities, especially in scenarios involving rare words or technical terms. In previous versions, Milvus supported sparse vectors to assist with keyword search scenarios. These sparse vectors were generated outside of Milvus by neural models like SPLADEv2/BGE-M3 or statistical models such as the BM25 algorithm.

Powered by [Tantivy](https://github.com/quickwit-oss/tantivy), Milvus 2.5 has built-in analyzers and sparse vector extraction, extending the API from only receiving vectors as input to directly accepting text. BM25 statistical information is updated in real time as data is inserted, enhancing usability and accuracy. Additionally, sparse vectors based on approximate nearest neighbor (ANN) algorithms offer more powerful performance than standard keyword search systems.

For details, refer to [Analyzer Overview](analyzer-overview.md) and [Full Text Search](full-text-search.md).

#### Cluster Management WebUI (Beta)

To better support massive data and rich features, Milvus's sophisticated design includes various dependencies, numerous node roles, complex data structures, and more. These aspects can pose challenges for usage and maintenance.

Milvus 2.5 introduces a built-in Cluster Management WebUI, reducing system maintenance difficulty by visualizing Milvus's complex runtime environment information. This includes details of databases and collections, segments, channels, dependencies, node health status, task information, slow queries, and more.

For details, refer to [Milvus WebUI](milvus-webui.md).

#### Text Match

Milvus 2.5 leverages analyzers and indexing from [Tantivy](https://github.com/quickwit-oss/tantivy) for text preprocessing and index building, supporting precise natural language matching of text data based on specific terms. This feature is primarily used for filtered search to satisfy specific conditions and can incorporate scalar filtering to refine query results, allowing similarity searches within vectors that meet scalar criteria.

For details, refer to [Analyzer Overview](analyzer-overview.md) and [Text Match](keyword-match.md).

#### Bitmap Index

A new scalar data index has been added to the Milvus family. The BitMap index uses an array of bits, equal in length to the number of rows, to represent the existence of values and accelerate searches.

Bitmap indexes have traditionally been effective for low-cardinality fields, which have a modest number of distinct values—for example, a column containing gender information with only two possible values: male and female.

For details, refer to [Bitmap Index](bitmap.md).

#### Nullable & Default Value

Milvus now supports setting nullable properties and default values for scalar fields other than the primary key field. For scalar fields marked as `nullable=True`, users can omit the field when inserting data; the system will treat it as a null value or default value (if set) without throwing an error.

Default values and nullable properties provide greater flexibility to Milvus. Users can utilize this feature for fields with uncertain values when creating collections. It also simplifies data migration from other database systems to Milvus, allowing for handling datasets containing null values while preserving original default value settings.

For details, refer to [Nullable & Default Value](nullable-and-default.md).

#### Faiss-based HNSW SQ/PQ/PRQ

Through close collaboration with the Faiss community, the HNSW algorithm in Faiss has seen significant improvements in both functionality and performance. For considerations of stability and maintainability, Milvus 2.5 has officially migrated its support for HNSW from hnswlib to Faiss.

Based on Faiss, Milvus 2.5 supports multiple quantization methods on HNSW to meet the needs of different scenarios: SQ (Scalar Quantizers), PQ (Product Quantizer), and PRQ (Product Residual Quantizer). SQ and PQ are more common; SQ provides good query performance and build speed, while PQ offers better recall at the same compression ratio. Many vector databases commonly use binary quantization, which is a simple form of SQ quantization.

PRQ is a fusion of PQ and AQ (Additive Quantizer). Compared to PQ, it requires longer build times to deliver better recall, especially at high compression rates, saying binary compression.

#### Clustering Compaction (Beta)

Milvus 2.5 introduces Clustering Compaction to accelerate searches and reduce costs in large collections. By specifying a scalar field as a clustering key, data is redistributed by range to optimize storage and retrieval. Acting like a global index, this feature enables Milvus to efficiently prune data during queries based on clustering metadata, enhancing search performance when scalar filters are applied.

For details, refer to [Clustering Compaction](clustering-compaction.md).

### Other Features

#### Streaming Node (Beta)

Milvus 2.5 introduces a new component called the streaming node, which provides Write-Ahead Logging (WAL) services. This enables Milvus to achieve consensus before and after reading and writing channels, unlocking new features, functionalities, and optimizations. This feature is disabled by default in Milvus 2.5 and will be officially available in version 3.0.

#### IPv6 Support

Milvus now supports IPv6, allowing for expanded network connectivity and compatibility.

#### CSV Bulk Import

In addition to JSON and Parquet formats, Milvus now supports direct bulk import of data in CSV format.

#### Expression Templates for Query Acceleration

Milvus now supports expression templates, improving expression parsing efficiency, particularly in scenarios with complex expressions.

For details, refer to [Filter Templating](filtering-templating.md).

#### GroupBy Enhancements

- **Customizable Group Size**: Added support for specifying the number of entries returned for each group.
- **Hybrid GroupBy Search**: Supports hybrid GroupBy search based on multiple vector columns.

#### Iterator Enhancements

- **MVCC Support**: Users can now use iterators without being affected by subsequent data changes like inserts and deletions, thanks to Multi-Version Concurrency Control (MVCC).
- **Persistent Cursor**: Milvus now supports a persistent cursor for QueryIterator, enabling users to resume iteration from the last position after a Milvus restart without needing to restart the entire iteration process.

### Improvements

#### Deletion Optimization

Improved the speed and reduced memory usage for large-scale deletions by optimizing lock usage and memory management.

#### Dependencies Upgrade

Upgraded to ETCD 3.5.16 and Pulsar 3.0.7 LTS, fixing existing CVEs and enhancing security. Note: The upgrade to Pulsar 3.x is not compatible with previous 2.x versions.

For users who already have a working Milvus deployment, you need to upgrade the ETCD and Pulsar components before you can use the new features and functions. For details, refer to [Upgrade Pulsar from 2.x to 3.x](upgrade-pulsar-v3.md)

#### Local Storage V2

Introduced a new local file format in Milvus 2.5, enhancing loading and query efficiency for scalar data, reducing memory overhead, and laying the groundwork for future optimizations.

#### Expression Parsing Optimization

Improved expression parsing by implementing caching for repeated expressions, upgrading ANTLR, and optimizing the performance of `NOT IN` clauses.

#### Improved DDL Concurrency Performance

Optimized the concurrency performance of Data Definition Language (DDL) operations.

#### RESTful API Feature Alignment

Aligned the functionalities of the RESTful API with other SDKs for consistency.

#### Security & Configuration Updates

Supported TLS to secure inter-node communication in more complex or enterprise environments. For details, refer to [Security Configuration](tls.md).

#### Compaction Performance Enhancements

Removed maximum segment limitations in mixed compaction and now prioritizes smaller segments first, improving efficiency and speeding up queries on large or fragmented datasets.

#### Score-Based Channel Balancing

Introduced a policy that dynamically balances loads across channels, enhancing resource utilization and overall stability in large-scale deployments.
