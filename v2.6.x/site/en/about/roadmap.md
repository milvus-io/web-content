---
id: roadmap.md
title: Milvus Roadmap
related_key: Milvus roadmap
summary: Milvus is an open-source vector database built to power AI applications. Here is our roadmap to guide our development.
---

# Milvus Roadmap

## 🌌 Toward the Next-Gen Multimodal Database and Data Lake

**Milvus Product Roadmap**  

Welcome to the Milvus Roadmap!  

We are ushering Milvus into a new era — the next-generation multimodal database — spanning **structured to unstructured data**, **real-time retrieval to offline analytics**, and **single-cluster performance to a global data lake architecture**.  

This roadmap outlines the core objectives for **Milvus v2.6 (in progress)**, **Milvus v3.0 (targeted for late 2026)**, and **Milvus v3.1 (long-term development)**, along with the evolution plan for **Vector Lake (data lake / Loon)**.

## 🧩 Milvus v2.6 (In Progress)

**Timeline: Mid-2025 – End of 2025**  

Focus: **Upgrading the data model**, **refactoring the streaming architecture**, **building hot/cold tiering capabilities**, and launching the **Vector Lake Prototype (v0.1)**.

### 🎯 Key Highlights

#### 🔹 **Data Model Upgrade**

- Introduce a unified **Tensor / StructList** data type to support multi-vector embedding structures, enabling compatibility with *ColBERT*, *CoLQwen*, *video*, and *multimodal vectors*.

- Add **Geo Data** support, including points, regions, and spatial indexing (based on *libspatial*), to expand use cases in LBS and GIS.

- Support for **Timestamp with Timezone** data type.

#### 🔹 **StreamNode Architecture Refactor**

- Rewrite the streaming ingestion pipeline to optimize incremental writes and real-time computation.

- Significantly improve concurrency performance and stability, laying the foundation for unified real-time and offline processing.

- Introduce a new message queue engine: **Woodpecker**.

#### 🔹 **Hot/Cold Tiering & Storage Architecture (StorageV2)**

- Support dual storage formats: **Parquet** and **Vortex**, enhancing concurrency and memory efficiency.

- Implement tiered storage with automatic hot/cold data separation and intelligent scheduling.

#### 🔹 **Vector Lake Prototype (v0.1)**

- Integrate with **Spark** / **DuckDB** / **DataFusion** via FFI, enabling offline schema evolution and KNN queries.

- Provide multimodal data visualization and a Spark ETL demo, establishing the foundational data lake architecture.

## 🌠 Milvus v3.0 (Targeted for Late 2026)

**Timeline: Late 2025 – Early 2026**  

Focus: Comprehensive enhancements to **search experience**, **schema flexibility**, and **unstructured data support**, along with the release of **Vector Lake (v0.2)**.

### 🎯 Key Highlights

#### 🔹 **Search Experience Overhaul**

- Introduce **More Like This (MLT)** similarity search with support for searches with position or negative examples.

- Add semantic search capabilities such as **highlighting** and **boosting**.

- Support **custom dictionaries** and **synonym tables**, enabling lexical and semantic rule definitions at the Analyzer layer.

- Introduce **aggregation** capabilities for queries.

#### 🔹 **Multi-Tenancy & Resource Management**

- Enable multi-tenant deletion, statistics, and hot/cold tiering.

- Improve resource isolation and scheduling strategies to support millions of tables in a single cluster.

#### 🔹 **Schema & Primary Key Enhancements**

- Implement **Global Primary Key Deduplication (Global PK Dedup)** to guarantee data consistency and uniqueness.

- Support **flexible schema management** (adding/dropping columns, backup fill).

- Allow **NULL values** in vector fields.

#### 🔹 **Expanded Unstructured Data Types (BLOB / Text)**

- Introduce the **BLOB type**, which provides native storage and referencing for binary data such as files, images, and videos.

- Introduce **TEXT type**, which provides enhanced full-text and content-based search capabilities.

#### 🔹 **Enterprise-Grade Capabilities**

- Support **Snapshot-based backup and recovery**.

- Provide **end-to-end tracing** and **audit logging**.

- Implement **Active-Standby High Availability (HA)** across multi-cluster deployments.

#### 🔹 **Vector Lake (v0.2)**

- Support **TEXT / BLOB storage** and **multi-version snapshot management**.

- Integrate Spark for offline indexing, clustering, deduplication, and dimensionality reduction tasks.

- Deliver **ChatPDF cold-query and offline benchmark demos**.

## 🪐 Milvus v3.1 (Long-Term Vision)

**Timeline: Mid-2026**  

Focus: **User-defined functions (UDF)**, **distributed computing integration**, **scalar query optimization**, **dynamic sharding**, and the official release of **Vector Lake (v1.0)**.

### 🎯 Key Highlights

#### 🔹 **UDF & Distributed Computing Ecosystem**

- Support **User-Defined Functions (UDFs)**, allowing developers to inject custom logic into retrieval and computation workflows.

- Deep integration with **Ray Dataset / Daft** for distributed UDF execution and multimodal data processing.

#### 🔹 **Scalar Query & Local Format Evolution**

- Optimize filtering and aggregation performance for scalar fields.

- Enhance expression evaluation and index-accelerated execution.

- Support **in-place updates** for local file formats.

#### 🔹 **Advanced Search Capabilities**

- Add the following features: **RankBy**, **OrderBy**, **Facet**, and **Fuzzy match** queries.

- Enhance text retrieval with support for:  

    - `match_phrase_prefix`

    - `Completion Suggester`

    - `Term Suggester`

    - `Phrase Suggester`

#### 🔹 **Dynamic Sharding & Scalability**

- Enable **automatic shard splitting** and **load balancing** for seamless scaling.

- Improve **global index building** and ensure **distributed search performance**.

#### 🔹 **Vector Lake V1.0**

- Deep integration with **Ray / Daft / PyTorch** to support distributed UDFs and Context Engineering use cases.

- Provide **RAG (Retrieval-Augmented Generation) demos** **and import from Iceberg tables**.

## 🤝 Co-Building the Future of Milvus

Milvus is an open-source project driven by a global community of developers.  

We warmly invite all community members to help shape the next-generation multimodal database:

- 💬 **Share feedback**: Propose new features or optimization ideas

- 🐛 **Report issues**: File bugs via GitHub Issues

- 🔧 **Contribute code**: Submit PRs and help build core features  

    - **Pull requests**: Contribute directly to our [codebase](https://github.com/milvus-io/milvus/pulls). Whether it's fixing bugs, adding features, or improving documentation, your contributions are welcome.

    - **Development guide**: Check our [Contributor's Guide](https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md) for guidelines on code contributions.

- ⭐ **Spread the word**: Share best practices and success stories

👉 **GitHub:** [milvus-io/milvus](https://github.com/milvus-io/milvus)