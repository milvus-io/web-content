---
id: overview.md
title: What is Milvus
related_key: Milvus Overview
summary: Milvus is a high-performance, highly scalable vector database that runs efficiently across a wide range of environments, from a laptop to large-scale distributed systems. It is available as both open-source software and a cloud service.
---

# What is Milvus?

<span>Milvus <span style="display: inline-block; vertical-align: middle;">
  <audio id="milvus-audio" style="display: none;">
    <source src="https://en-audio.howtopronounce.com/15783806805e142d8844912.mp3" type="audio/mp3" />
  </audio>
  <span style="
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('https://milvus.io/docs/v2.5.x/assets/hearing.png') no-repeat center center;
    background-size: contain;
    cursor: pointer;
    margin-left: 4px;
  " onclick="document.getElementById('milvus-audio').play()"></span>
</span></span> is a bird of prey in the genus Milvus of the hawk family Accipaitridae, celebrated for its speed in flight, keen vision, and remarkable adaptability.

<style>
  audio::-webkit-media-controls {
    display: none !important;
  }
</style>

Zilliz adopts the name Milvus for its open-source high-performance, highly scalable vector database that runs efficiently across a wide range of environments, from a laptop to large-scale distributed systems. It is available as both open-source software and a cloud service.

Developed by Zilliz and soon donated to the LF AI & Data Foundation under the Linux Foundation, Milvus has become one of the world's leading open-source vector database projects. It is distributed under the Apache 2.0 license, and most contributors are experts from the high-performance computing (HPC) community, specializing in building large-scale systems and optimizing hardware-aware code. Core contributors include professionals from Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba, and Microsoft.

Interestingly, every Zilliz open‑source project is named after a bird, which is a naming convention that symbolizes freedom, foresight, and the agile evolution of technology.

## Unstructured Data, Embeddings, and Milvus

Unstructured data, such as text, images, and audio, varies in format and carries rich underlying semantics, making it challenging to analyze. To manage this complexity, embeddings are used to convert unstructured data into numerical vectors that capture its essential characteristics. These vectors are then stored in a vector database, enabling fast and scalable searches and analytics.

Milvus offers robust data modeling capabilities, enabling you to organize your unstructured or multi-modal data into structured collections. It supports a wide range of data types for different attribute modeling, including common numerical and character types, various vector types, arrays, sets, and JSON, saving you from the effort of maintaining multiple database systems.

![Untructured data, embeddings, and Milvus](../../../assets/unstructured-data-embedding-and-milvus.png)

Milvus offers three deployment modes, covering a wide range of data scales—from local prototyping in Jupyter Notebooks to massive Kubernetes clusters managing tens of billions of vectors:

- Milvus Lite is a Python library that can be easily integrated into your applications. As a lightweight version of Milvus, it’s ideal for quick prototyping in Jupyter Notebooks or running on edge devices with limited resources. [Learn more](milvus_lite.md).
- Milvus Standalone is a single-machine server deployment, with all components bundled into a single Docker image for convenient deployment. [Learn more](install_standalone-docker.md).
- Milvus Distributed can be deployed on Kubernetes clusters, featuring a cloud-native architecture designed for billion-scale or even larger scenarios. This architecture ensures redundancy in critical components. [Learn more](install_cluster-milvusoperator.md).

## What Makes Milvus so Fast？

Milvus was designed from day one to be a highly efficient vector database system. In most cases, Milvus outperforms other vector databases by 2-5x (see the VectorDBBench results). This high performance is the result of several key design decisions:

**Hardware-aware Optimization**: To accommodate Milvus in various hardware environments, we have optimized its performance specifically for many hardware architectures and platforms, including AVX512, SIMD, GPUs, and NVMe SSD.

**Advanced Search Algorithms**: Milvus supports a wide range of in-memory and on-disk indexing/search algorithms, including IVF, HNSW, DiskANN, and more, all of which have been deeply optimized. Compared to popular implementations like FAISS and HNSWLib, Milvus delivers 30%-70% better performance.

**Search Engine in C++**: Over 80% of a vector database's performance is determined by its search engine. Milvus uses C++ for this critical component due to the language's high performance, low-level optimization, and efficient resource management. Most importantly, Milvus integrates numerous hardware-aware code optimizations, ranging from assembly-level vectorization to multi-thread parallelization and scheduling, to fully leverage hardware capabilities. 

**Column-Oriented**: Milvus is a column-oriented vector database system. The primary advantages come from the data access patterns. When performing queries, a column-oriented database reads only the specific fields involved in the query, rather than entire rows, which greatly reduces the amount of data accessed. Additionally, operations on column-based data can be easily vectorized, allowing for operations to be applied in the entire columns at once, further enhancing performance.

## What Makes Milvus so Scalable

In 2022, Milvus supported billion-scale vectors, and in 2023, it scaled up to tens of billions with consistent stability, powering large-scale scenarios for over 300 major enterprises, including Salesforce, PayPal, Shopee, Airbnb, eBay, NVIDIA, IBM, AT&T, LINE, ROBLOX, Inflection, etc.

Milvus's cloud-native and highly decoupled system architecture ensures that the system can continuously expand as data grows:

![Highly decoupled system architecture of Milvus](../../../assets/highly-decoupled-architecture.png)

Milvus itself is fully stateless so it can be easily scaled with the help of Kubernetes or public clouds. In addition, Milvus components are well decoupled, with the three most critical tasks—search, data insertion, and indexing/compaction—designed as easily parallelized processes, with complex logic separated out. This ensures that the corresponding query node, data node, and index node can scale both up and out independently, optimizing performance and cost efficiency.

## Types of Searches Supported by Milvus

Milvus supports various types of search functions to meet the demands of different use cases:

- [ANN Search](single-vector-search.md#Basic-search): Finds the top K vectors closest to your query vector.
- [Filtering Search](single-vector-search.md#Filtered-search): Performs ANN search under specified filtering conditions.
- [Range Search](single-vector-search.md#Range-search): Finds vectors within a specified radius from your query vector.
- [Hybrid Search](multi-vector-search.md): Conducts ANN search based on multiple vector fields.
- [Full Text Search](full-text-search.md): Full text search based on BM25.
- [Reranking](reranking.md): Adjusts the order of search results based on additional criteria or a secondary algorithm, refining the initial ANN search results.
- [Fetch](get-and-scalar-query.md#Get-Entities-by-ID): Retrieves data by their primary keys.
- [Query](get-and-scalar-query.md#Use-Basic-Operators): Retrieves data using specific expressions.

## Comprehensive Feature Set

In addition to the key search features mentioned above, Milvus also provides a set of features implemented around ANN searches so that you can fully utilize its capabilities.

### API and SDK

- [RESTful API](https://milvus.io/api-reference/restful/v2.4.x/About.md) (official)
- [PyMilvus](https://milvus.io/api-reference/pymilvus/v2.4.x/About.md) (Python SDK) (official)
- [Go SDK](https://milvus.io/api-reference/go/v2.4.x/About.md) (official)
- [Java SDK](https://milvus.io/api-reference/java/v2.4.x/About.md) (official)
- [Node.js](https://milvus.io/api-reference/node/v2.4.x/About.md) (JavaScript) SDK (official)
- [C#](https://milvus.io/api-reference/csharp/v2.2.x/About.md) (contributed by Microsoft)

### Advanced Data Types

In addition to primitive data types, Milvus supports various advanced data types and their respective applicable distance metrics.

- [Sparse Vectors](sparse_vector.md)
- [Binary Vectors](index-vector-fields.md)
- [JSON Support](use-json-fields.md)
- [Array Support](array_data_type.md)
- [Distance Metrics](metric.md)

### Acceleration

- Search Algorithms
  Milvus supports a set of tunable indexing and search algorithms. For details, see [In-memory Index](index.md), [On-disk Index](disk_index.md), and [GPU Index](gpu_index.md).

- Partitions and Partition Keys
  Partitions are sub-divisions of a Milvus collection. You can choose a scalar field as the partition key for better search performance. For details, see [Manage Partitions](manage-partitions.md) and [Use Partition Key](use-partition-key.md).

- Tunable Consistency Model
  Consistency ensures every Milvus node or replica has the same view of data when writing or reading data at a given time. You can easily tune the consistency level when conducting ANN searches in Milvus. For details, see [Consistency](consistency.md).

- High-throughput Data Import
  To import a large volume of data into Milvus instead of inserting them one after another, consider using our high-throughput data import tools. For details, refer to [Prepare Source Data](prepare-source-data.md) and [Import Data](import-data.md).

- Multi-tenancy Support
  Milvus has implemented a lot of features oriented to multi-tenancy scenarios, including Partition Key, Clustering Key, and more. For details, see [Multi-tenancy Strategies](multi_tenancy.md).

### Security and Authorization

- Tunable Consistency Model
  Consistency ensures every Milvus node or replica has the same view of data when writing or reading data at a given time. You can easily tune the consistency level when conducting ANN searches in Milvus. For details, see [Consistency](consistency.md).

- Data Isolation and Resource Control
  For multi-tenancy scenarios, data isolation is the basic security requirement. Milvus implements several features to resolve your security concerns. For details, see [Manage Resource Groups](resource_group.md) and [Clustering Compaction](clustering-compaction.md).

### AI Integrations

- Embedding Model Integrations
  Embedding Models convert unstructured data to their numeric representation in high-dimensional data space so that you can store them in Milvus. Currently, PyMilvus, the Python SDK, integrates several embedding models so that you can quickly prepare your data into vector embeddings. For details, see [Embedding Overview](embeddings.md).

- Reranking Model Integrations
  In the realm of information retrieval and generative AI, a reranker is an essential tool that optimizes the order of results from initial searches. PyMilvus also integrates several reranking models to optimize the order of results returned from initial searches. For details, refer to [Rerankers Overview](rerankers-overview.md).

- LangChain and other AI Tool Integrations
  In the GenAI era, tools, such as LangChain, gain much attentions from application developers. As a core component, Milvus usually serves as the vector stores in such tools. To learn how to integrate Milvus in your favorite AI tools, refer to our [Integrations](integrate_with_openai.md) and [Tutorials](build-rag-with-milvus.md).

### Tools and Ecosystem

- Attu
  Attu is an all-in-one intuitive GUI that helps you manage Milvus and the data it stores. For details, refer to the [Attu](https://github.com/zilliztech/attu) repository.

- Birdwatcher
  Birdwatcher is a debugging tool for Milvus. Using it to connect to etcd, you can check the state of your Milvus system or configure it on the fly. For details, refer to [BirdWatcher](birdwatcher_overview.md).

- Promethus & Grafana integrations
  Prometheus is an open-source system monitoring and alerting toolkit for Kubernetes. Grafana is an open-source visualizing stack that can connect with all data sources. You can use Promethus & Grafana as the monitoring service provider to visually monitor the performance of Milvus distributed. For details, see [Deploying Monitoring Services](monitor.md).

- Milvus Backup
  Milvus Backup is a tool that allows users to back up and restore Milvus data. It provides both CLI and API to fit itself into different application scenarios. For details, refer to [Milvus Backup](milvus_backup_overview.md).

- Milvus Capture Data Change (CDC)
  Milvus-CDC can capture and synchronize incremental data in Milvus instances and ensures the reliability of business data by seamlessly transferring it between source and target instances, allowing for easy incremental backup and disaster recovery. For details, refer to [Milvus CDC](milvus-cdc-overview.md).

- Milvus Connectors
  Milvus has planned a set of connectors for you to seamlessly integrate Milvus with third-party tools, such as Apache Spark. Currently, you can use our Spark Connector to feed your Milvus data to Apache Spark for machine-learning processing. For details, refer to [Spark-Milvus Connector](integrate_with_spark.md).

- Vector Transmission Services (VTS)
  Milvus provides a set of tools for you to transfer your data between a Milvus instance and a bunch of data sources, including Zilliz clusters, Elasticsearch, Postgres (PgVector), and another Milvus instance. For details, refer to [VTS](https://github.com/zilliztech/vts).
