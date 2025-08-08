---
id: release_notes.md
summary: Milvus Release Notes
title: Release Notes
---

# Release Notes

Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.6.0 in this section. We suggest that you regularly visit this page to learn about updates.

## v2.6.0

Release date: August 6, 2025

| Milvus Version | Python SDK Version | Node.js SDK Version | Java SDK Version | Go SDK Version |
|:-------------- |:------------------|:--------------------|:-----------------|:---------------|
| 2.6.0          | 2.6.0             | 2.6.0               | 2.6.1            | 2.6.0          |

Milvus 2.6.0 is officially released! Building upon the architectural foundation laid in [2.6.0-rc1](#v260-rc1), this production-ready version addresses numerous stability and performance issues while introducing powerful new capabilities including Storage Format V2, advanced JSON processing, and enhanced search features. With extensive bug fixes and optimizations based on community feedback during the RC phase, Milvus 2.6.0 is ready for you to explore and adopt.

<div class="alert warning">

Direct upgrade from pre-2.6.0 versions is not supported due to architectural changes. Please follow our <a href="upgrade_milvus_cluster-operator.md">upgrade guide</a>.

</div>

### What's new in 2.6.0 (since RC)

#### Optimized storage format v2

To address the challenges of mixed scalar and vector data storage, especially point lookups on unstructured data, Milvus 2.6 introduces Storage Format V2. This new adaptive columnar storage format adopts a "narrow column merging + wide column independence" layout strategy, fundamentally solving the performance bottlenecks when handling point lookups and small-batch retrievals in vector databases.

The new format now supports efficient random access without I/O amplification and achieves up to 100x performance gains compared to the vanilla Parquet format adopted previously, making it ideal for AI workloads requiring both analytical processing and precise vector retrieval. Additionally, it can reduce file count by up to 98% for typical workloads. Memory consumption for major compaction is reduced by 300%, and I/O operations are optimized by up to 80% for reads and more than 600% for writes.

#### JSON flat index (beta)

Milvus 2.6 introduces JSON Flat Index to handle highly dynamic JSON schemas. Unlike JSON Path Index which requires pre-declaring specific paths and their expected types, JSON Flat Index automatically discovers and indexes all nested structures under a given path. When indexing a JSON field, it recursively flattens the entire subtree, creating inverted index entries for every path-value pair it encounters, regardless of depth or type.
This automatic flattening makes JSON Flat Index ideal for evolving schemas where new fields appear without warning. For instance, if you index a "metadata" field, the system will automatically handle new nested fields like "metadata.version2.features.experimental" as they appear in incoming data, without requiring new index configuration.

### Core 2.6.0 features recall

<div class="alert note">

For detailed information about architecture changes and features introduced in 2.6.0-RC, see <a href="#v260-rc1">2.6.0-rc1 Release Note</a>.

</div>

#### Architecture simplification

- Streaming Node (GA) - Centralized WAL management
- Native WAL with Woodpecker - Removed Kafka/Pulsar dependency
- Unified coordinators (MixCoord); Merged IndexNode and DataNode - Reduced component complexity

#### Search & analytics

- RaBitQ 1-bit quantization with high recall
- Phrase matching
- MinHash LSH for deduplication
- Time-aware ranking functions

#### Developer experience

- Embedding functions for "data-in, data-out" workflow
- Online schema evolution
- INT8 vector support
- Enhanced tokenizers for global language support
- Cache layer with lazy loading - Process datasets larger than memory


## v2.6.0-rc1

Release date: June 18, 2025

| Milvus Version | Python SDK Version | Node.js SDK Version | Java SDK Version | Go SDK Version  |
|:--------------:|:-----------------:|:-------------------:|:----------------:|:---------------:|
|   2.6.0-rc1    |     2.6.0b0       |     2.6.0-rc1       |     2.6.0        |   2.6.0-rc.1    |

Milvus 2.6.0-rc1 introduces a simplified, cloud-native architecture designed to improve operational efficiency, resource utilization, and total cost of ownership by reducing deployment complexity. This release adds new functionalities focused on performance, search, and development. Key features include high-precision 1-bit quantization (RaBitQ) and a dynamic cache layer for performance gains, near-duplicate detection with MinHash and precise phrase matching for advanced search, and automated embedding functions with online schema modification to enhance the developer's experience.

<div class="alert note">

This is a pre-release version of Milvus 2.6.0. To try out the latest features, install this version as a fresh deployment. Upgrading from Milvus v2.5.x or earlier to 2.6.0-rc1 is not supported.

</div>

### Architecture Changes

Since 2.6, Milvus introduces significant architectural changes aimed at improving performance, scalability, and ease of use. For more information, refer to [Milvus Architecture Overview](architecture_overview.md).

#### Streaming Node (GA)

In previous versions, streaming data was written to the WAL by the Proxy, and read by the QueryNode and DataNode. This architecture made it difficult to achieve consensus on the write side, requiring complex logic on the read side. Additionally, the query delegator was located in the QueryNode, which hindered scalability. Milvus 2.5.0 introduced the Streaming Node, which becomes GA in version 2.6.0. This component is now responsible for all shard-level WAL read/write operations and also serves as the query delegator, resolving the aforementioned issues and enabling new optimizations.

**Important Upgrade Notice**: Streaming Node is a significant architectural change, so a direct upgrade to Milvus 2.6.0-rc1 from previous versions is not supported.

#### Woodpecker Native WAL

Milvus previously relied on external systems like Kafka or Pulsar for its WAL. While functional, these systems added significant operational complexity and resource overhead, particularly for small to medium-sized deployments. In Milvus 2.6, these are replaced by Woodpecker, a purpose-built, cloud-native WAL system. Woodpecker is designed for object storage, supporting both local and object storage based zero-disk modes, simplifying operations while improving performance and scalability.

#### DataNode and IndexNode Merge

In Milvus 2.6, tasks such as compaction, bulk import, statistics collection, and index building are now managed by a unified scheduler. The data persistence function previously handled by the DataNode has been moved to the Streaming Node. To simplify deployment and maintenance, the IndexNode and DataNode have been merged into a single DataNode component. This consolidated node now executes all these critical tasks, reducing operational complexity and optimizing resource utilization.

#### Coordinator Merge into MixCoord 

The previous design with separate RootCoord, QueryCoord, and DataCoord modules introduced complexity in inter-module communication. To simplify the system design, these components have been merged into a single, unified coordinator called MixCoord. This consolidation reduces the complexity of distributed programming by replacing network-based communication with internal function calls, resulting in more efficient system operation and simplified development and maintenance.

### Key Features

#### RaBitQ 1-bit Quantization

To handle large-scale datasets, 1-bit quantization is an effective technique for improving resource utilization and search performance. However, traditional methods can negatively impact recall. In collaboration with the original research authors, Milvus 2.6 introduces RaBitQ, a 1-bit quantization solution that maintains high recall accuracy while delivering the resource and performance benefits of 1-bit compression.

For more information, refer to [IVF_RABITQ](ivf-rabitq.md).

#### JSON Capability Enhancement

Milvus 2.6 enhances its support for the JSON data type with the following improvements:

- **Performance**: JSON Path Indexing is now officially supported, allowing the creation of inverted indexes on specific paths within JSON objects (e.g., `meta.user.location`). This avoids full object scans and improves the latency of queries with complex filters.
- **Functionality**: To support more complex filtering logic, this release adds support for `JSON_CONTAINS`, `JSON_EXISTS`, `IS NULL`, and `CAST` functions.
Looking ahead, our work on JSON support continues. We are excited to preview that upcoming official releases will feature even more powerful capabilities, such as **JSON shredding** and a **JSON FLAT Index**, designed to dramatically improve performance on highly nested JSON data.

#### Analyzer/Tokenizer Function Enhancement

This release significantly enhances text processing capabilities with several updates to the Analyzer and Tokenizer: 

- A new [Run Analyzer](analyzer-overview.md#Example-use) syntax is available to validate tokenizer configurations.
- The [Lindera tokenizer](lindera-tokenizer.md) is integrated for improved support of Asian languages such as Japanese and Korean.
- Row-level tokenizer selection is now supported, with the general-purpose [ICU tokenizer](icu-tokenizer.md) available as a fallback for multilingual scenarios.

#### Data-in, Data-Out with Embedding Functions 

Milvus 2.6 introduces a "Data-in, Data-Out" capability that simplifies AI application development by integrating directly with third-party embedding models (e.g., from OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face). Users can now insert and query using raw text data, and Milvus will automatically call the specified model service to convert the text into vectors in real-time. This removes the need for a separate vector conversion pipeline.   

For more information, refer to [Embedding Function Overview](embedding-function-overview.md).

#### Phrase Match 

Phrase Match is a text search feature that returns results only when the exact sequence of words in a query appears consecutively and in the correct order within a document.

**Key Characteristics**:

- Order-sensitive: The words must appear in the same order as in the query.
- Consecutive match: The words must appear right next to each other, unless a slop value is used.
- Slop (optional): A tunable parameter that allows for a small number of intervening words, enabling fuzzy phrase matching.

For more information, refer to [Phrase Match](phrase-match.md).

#### MinHash LSH Index (Beta)

To address the need for data deduplication in model training, Milvus 2.6 adds support for MINHASH_LSH indexes. This feature provides a computationally efficient and scalable method for estimating Jaccard similarity between documents to identify near-duplicates. Users can generate MinHash signatures for their text documents during preprocessing and use the MINHASH_LSH index in Milvus to efficiently find similar content in large-scale datasets, improving data cleaning and model quality.   

#### Time-Aware Decay Functions

Milvus 2.6 introduces time-aware decay functions to address scenarios where information value changes over time. During result re-ranking, users can apply exponential, Gaussian, or linear decay functions based on a timestamp field to adjust a document's relevance score. This ensures that more recent content can be prioritized, which is critical for applications like news feeds, e-commerce, and an AI agent's memory.   

For more information, refer to [Decay Ranker Overview](decay-ranker-overview.md).

#### Add Field for Online Schema Evolution 

To provide greater schema flexibility, Milvus 2.6 now supports adding a new scalar or vector field to an existing collection's schema online. This avoids the need to create a new collection and perform a disruptive data migration when application requirements change.   

For more information, refer to [Add Fields to an Existing Collection](add-fields-to-an-existing-collection.md).

#### INT8 Vector Support

In response to the growing use of quantized models that produce 8-bit integer embeddings, Milvus 2.6 adds native data type support for INT8 vectors. This allows users to ingest these vectors directly without de-quantization, saving computation, network bandwidth, and storage costs. This feature is initially supported for HNSW-family indexes.

For more information, refer to [Dense Vector](dense-vector.md).