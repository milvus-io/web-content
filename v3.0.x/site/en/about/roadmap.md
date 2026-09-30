---
id: roadmap.md
title: Milvus Roadmap
related_key: Milvus roadmap
summary: Milvus is an open-source vector database built to power AI applications. Here is our roadmap to guide our development.
---

# Milvus Roadmap

## 🌌 Toward the Next-Gen Multimodal Database and Vector Lakebase

**Milvus Product Roadmap**

Welcome to the Milvus Roadmap!

We are ushering Milvus into a new era — the next-generation multimodal database — **spanning structured to unstructured data, real-time retrieval to offline analytics, and single-cluster performance to a global** **Vector Lakebase architecture.**

This roadmap outlines the core objectives for **Milvus v3.0 (public beta)**, and **Milvus v3.1 (long-term development)**, along with the evolution plan for **Zilliz Vector Lakebase**.

## 🌠 Milvus v3.0 (Public Beta)

**Public Beta: May 2026**

Focus: Building a **semantic-native query engine** with in-engine sorting, aggregation, and multi-vector retrieval, and the **lake-native foundation of Zilliz Vector Lakebase** so compute reaches data without migration.


### 🎯 Key Highlights

#### 🔹 **Schema & Data Type Evolution**

-   Support ALTER COLLECTION ADD COLUMN and DROP COLUMN at runtime without rebuilding indexes or interrupting serving.
-   Provide **two backfill paths** for new columns: external via Spark Connector, and internal with BM25 sparse vectors auto-generated at write time.
-   Introduce **TEXT** as a first-class data type that stores original text alongside vectors with BM25 and text-match support.

  

#### 🔹 **Query** **Execution Overhaul**

-   Push **Order By** into the engine with per-segment sort and merge-sort across query nodes.
-   Add SQL-style **query** **aggregation** (GROUP BY with COUNT, SUM, AVG, MIN, MAX) computed in the kernel.
-   Introduce **search facets** over ANN results with per-bucket statistics and nested sub-facets server-side.
-   Support **custom dictionaries** and synonym tables registered cluster-side for improved CJK and domain-specific recall.

  

#### 🔹 **Multi-Vector & Late-Interaction Support**

-   Introduce **StructList** to represent one entity as a single row with many vectors, with native late-interaction support (ColBERT, ColPali) via MAX_SIM.
-   Support **element-level and entity-level search** on StructList fields, with configurable match policies for entity-level results.
-   Add three **multi-vector retrieval strategies**: TokenANN (exhaustive), Muvera (projection-based, no training), and Lemur (learned compression).

  

#### 🔹 **Retrieval & Index Overhaul**

-   Overhaul the **sparse inverted index** with block compression, weight quantization, and a persisted format; introduce **SINDI** as the default sparse IP algorithm.
-   Expand index coverage with the full **Faiss family** (SVS, Panorama, PQ, IVFPQ, ScaNN) and **MinHash DIDO** for near-duplicate detection.
-   Support **nullable vector fields** for async embeddings and missing modalities, with auto-filtering at search time.

  

#### 🔹 **Vector Lakebase Storage & Compute Architecture**

-   Introduce **External Collection** to index and query data in S3 / GCS / Azure in place, with support for Lance, Parquet, Iceberg, and Vortex table formats.
-   Add **Vortex**, an open columnar format, and **Loon (Storage V3)**, a mixed-format storage layer for efficient point reads from object storage.
-   Support **point-in-time snapshots** with MVCC-style isolation for batch processing while serving continues to write.
-   Integrate as a **Spark DataSource v2** for reading from and writing to Milvus directly in Spark / Databricks / EMR pipelines.


## 🪐 Milvus v3.1 (Long-Term Vision)

**Timeline: Late 2026 and beyond**

Focus: **Storage intelligence**, **write-path integrity**, **compute extensibility**, and **expanded** **Vector Lakebase** **interoperability**.

### 🎯 Key Highlights

#### 🔹 **Storage & Write Path**

-   Add **predicate pushdown** with page-index and bloom-filter pruning at the storage layer.
-   Implement **primary-key dedup** on ingest to prevent duplicates at write time.
    

#### 🔹 **Compute & Elasticity**

-   Support **User-Defined Functions (UDFs)** for running custom logic in the engine, on the data plane.
-   Enable **shard splitting** to resplit shards as data grows, with custom sharding key support.
    

#### 🔹 **Spark &** **Vector Lakebase** **Expansion**

-   Expand the Spark connector with a richer library of **native batch operators**.
-   Add **table format** capabilities including time-travel, schema evolution, and snapshot rollback.
-   Expand Vector Lakebase interoperability with **CDC-fresh external indexes**, Apache Paimon support, and additional data formats.


## 🤝 Co-Building the Future of Milvus

Milvus is an open-source project driven by a global community of developers. We invite all community members to help shape the next-generation multimodal database:

-   💬 **Share feedback**: Propose new features or optimization ideas on [GitHub Discussions](https://github.com/milvus-io/milvus/discussions).
-   🐛 **Report issues**: File bugs through [GitHub Issues](https://github.com/milvus-io/milvus/issues).
-   🔧 **Contribute code**: Submit PRs and help build core features.
    
    -   **Pull requests**: Contribute directly to our [codebase](https://github.com/milvus-io/milvus/pulls). Whether you're fixing bugs, adding features, or improving documentation, your contributions are welcome.
    -   **Development guide**: Check our [Contributor's Guide](https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md) for guidelines on code contributions.
-   🗣️ **Join the conversation**: Ask questions and meet maintainers on [Discord](https://milvus.io/discord), at [Milvus Office Hours](https://meetings.hubspot.com/chloe-williams1/milvus-meeting), or across [all community channels](https://milvus.io/community).
-   ⭐ **Spread the word**: Share best practices and success stories, and follow Milvus on [X](https://twitter.com/milvusio), [LinkedIn](https://www.linkedin.com/company/the-milvus-project/), and [YouTube](https://www.youtube.com/c/MilvusVectorDatabase).

👉 **GitHub:** [milvus-io/milvus](https://github.com/milvus-io/milvus)
