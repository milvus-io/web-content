---
id: overview.md
title: What is Milvus
related_key: Milvus Overview
summary: >-
  Milvus is a high-performance, highly scalable vector database that runs
  efficiently across a wide range of environments, from a laptop to large-scale
  distributed systems. It is available as both open-source software and a cloud
  service.
---
<h1 id="What-is-Milvus" class="common-anchor-header">What is Milvus?<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p><span>Milvus <span style="display: inline-block; vertical-align: middle;">
<audio id="milvus-audio" style="display: none;">
<source src="https://en-audio.howtopronounce.com/15783806805e142d8844912.mp3" type="audio/mp3" />
</audio>
<span style="
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('https://milvus.io/docs/v2.6.x/assets/hearing.png') no-repeat center center;
    background-size: contain;
    cursor: pointer;
    margin-left: 4px;
  " onclick="document.getElementById('milvus-audio').play()"></span>
</span></span> is a bird of prey in the genus Milvus of the hawk family Accipaitridae, celebrated for its speed in flight, keen vision, and remarkable adaptability.</p>
<style>
  audio::-webkit-media-controls {
    display: none !important;
  }
</style>
<p>Zilliz adopts the name Milvus for its open-source high-performance, highly scalable vector database that runs efficiently across a wide range of environments, from a laptop to large-scale distributed systems. It is available as both open-source software and a cloud service.</p>
<p>Developed by Zilliz and soon donated to the LF AI & Data Foundation under the Linux Foundation, Milvus has become one of the world’s leading open-source vector database projects. It is distributed under the Apache 2.0 license, and most contributors are experts from the high-performance computing (HPC) community, specializing in building large-scale systems and optimizing hardware-aware code. Core contributors include professionals from Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba, and Microsoft.</p>
<p>Interestingly, every Zilliz open‑source project is named after a bird, which is a naming convention that symbolizes freedom, foresight, and the agile evolution of technology.</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">Unstructured Data, Embeddings, and Milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Unstructured data, such as text, images, and audio, varies in format and carries rich underlying semantics, making it challenging to analyze. To manage this complexity, embeddings are used to convert unstructured data into numerical vectors that capture its essential characteristics. These vectors are then stored in a vector database, enabling fast and scalable searches and analytics.</p>
<p>Milvus offers robust data modeling capabilities, enabling you to organize your unstructured or multi-modal data into structured collections. It supports a wide range of data types for different attribute modeling, including common numerical and character types, various vector types, arrays, sets, and JSON, saving you from the effort of maintaining multiple database systems.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" />
    <span>Untructured data, embeddings, and Milvus</span>
  </span>
</p>
<p>Milvus offers three deployment modes, covering a wide range of data scales—from local prototyping in Jupyter Notebooks to massive Kubernetes clusters managing tens of billions of vectors:</p>
<ul>
<li>Milvus Lite is a Python library that can be easily integrated into your applications. As a lightweight version of Milvus, it’s ideal for quick prototyping in Jupyter Notebooks or running on edge devices with limited resources. <a href="/docs/v2.6.x/milvus_lite.md">Learn more</a>.</li>
<li>Milvus Standalone is a single-machine server deployment, with all components bundled into a single Docker image for convenient deployment. <a href="/docs/v2.6.x/install_standalone-docker.md">Learn more</a>.</li>
<li>Milvus Distributed can be deployed on Kubernetes clusters, featuring a cloud-native architecture designed for billion-scale or even larger scenarios. This architecture ensures redundancy in critical components. <a href="/docs/v2.6.x/install_cluster-milvusoperator.md">Learn more</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">What Makes Milvus so Fast？<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Milvus was designed from day one to be a highly efficient vector database system. In most cases, Milvus outperforms other vector databases by 2-5x (see the VectorDBBench results). This high performance is the result of several key design decisions:</p>
<p><strong>Hardware-aware Optimization</strong>: To accommodate Milvus in various hardware environments, we have optimized its performance specifically for many hardware architectures and platforms, including AVX512, SIMD, GPUs, and NVMe SSD.</p>
<p><strong>Advanced Search Algorithms</strong>: Milvus supports a wide range of in-memory and on-disk indexing/search algorithms, including IVF, HNSW, DiskANN, and more, all of which have been deeply optimized. Compared to popular implementations like FAISS and HNSWLib, Milvus delivers 30%-70% better performance.</p>
<p><strong>Search Engine in C++</strong>: Over 80% of a vector database’s performance is determined by its search engine. Milvus uses C++ for this critical component due to the language’s high performance, low-level optimization, and efficient resource management. Most importantly, Milvus integrates numerous hardware-aware code optimizations, ranging from assembly-level vectorization to multi-thread parallelization and scheduling, to fully leverage hardware capabilities.</p>
<p><strong>Column-Oriented</strong>: Milvus is a column-oriented vector database system. The primary advantages come from the data access patterns. When performing queries, a column-oriented database reads only the specific fields involved in the query, rather than entire rows, which greatly reduces the amount of data accessed. Additionally, operations on column-based data can be easily vectorized, allowing for operations to be applied in the entire columns at once, further enhancing performance.</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">What Makes Milvus so Scalable<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>In 2022, Milvus supported billion-scale vectors, and in 2023, it scaled up to tens of billions with consistent stability, powering large-scale scenarios for over 300 major enterprises, including Salesforce, PayPal, Shopee, Airbnb, eBay, NVIDIA, IBM, AT&T, LINE, ROBLOX, Inflection, etc.</p>
<p>Milvus’s cloud-native and highly decoupled system architecture ensures that the system can continuously expand as data grows:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/milvus_architecture_2_6.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" />
    <span>Highly decoupled system architecture of Milvus</span>
  </span>
</p>
<p>Milvus itself is fully stateless so it can be easily scaled with the help of Kubernetes or public clouds. In addition, Milvus components are well decoupled, with the three most critical tasks—search, data insertion, and indexing/compaction—designed as easily parallelized processes, with complex logic separated out. This ensures that the corresponding query node, data node, and index node can scale both up and out independently, optimizing performance and cost efficiency.</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">Types of Searches Supported by Milvus<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Milvus supports various types of search functions to meet the demands of different use cases:</p>
<ul>
<li><a href="/docs/v2.6.x/single-vector-search.md#Basic-search">ANN Search</a>: Finds the top K vectors closest to your query vector.</li>
<li><a href="/docs/v2.6.x/single-vector-search.md#Filtered-search">Filtering Search</a>: Performs ANN search under specified filtering conditions.</li>
<li><a href="/docs/v2.6.x/single-vector-search.md#Range-search">Range Search</a>: Finds vectors within a specified radius from your query vector.</li>
<li><a href="/docs/v2.6.x/multi-vector-search.md">Hybrid Search</a>: Conducts ANN search based on multiple vector fields.</li>
<li><a href="/docs/v2.6.x/full-text-search.md">Full Text Search</a>: Full text search based on BM25.</li>
<li><a href="/docs/v2.6.x/weighted-ranker.md">Reranking</a>: Adjusts the order of search results based on additional criteria or a secondary algorithm, refining the initial ANN search results.</li>
<li><a href="/docs/v2.6.x/get-and-scalar-query.md#Get-Entities-by-ID">Fetch</a>: Retrieves data by their primary keys.</li>
<li><a href="/docs/v2.6.x/get-and-scalar-query.md#Use-Basic-Operators">Query</a>: Retrieves data using specific expressions.</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">Comprehensive Feature Set<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>In addition to the key search features mentioned above, Milvus also provides a set of features implemented around ANN searches so that you can fully utilize its capabilities.</p>
<h3 id="API-and-SDK" class="common-anchor-header">API and SDK<button data-href="#API-and-SDK" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.4.x/About.md">RESTful API</a> (official)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">PyMilvus</a> (Python SDK) (official)</li>
<li><a href="https://milvus.io/api-reference/go/v2.4.x/About.md">Go SDK</a> (official)</li>
<li><a href="https://milvus.io/api-reference/java/v2.4.x/About.md">Java SDK</a> (official)</li>
<li><a href="https://milvus.io/api-reference/node/v2.4.x/About.md">Node.js</a> (JavaScript) SDK (official)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (contributed by Microsoft)</li>
<li>C++ SDK (under development)</li>
<li>Rust SDK (under development)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">Advanced Data Types<button data-href="#Advanced-Data-Types" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><p>In addition to primitive data types, Milvus supports various advanced data types and their respective applicable distance metrics.</p>
<ul>
<li><a href="/docs/v2.6.x/sparse_vector.md">Sparse Vectors</a></li>
<li><a href="/docs/v2.6.x/index-vector-fields.md">Binary Vectors</a></li>
<li><a href="/docs/v2.6.x/use-json-fields.md">JSON Support</a></li>
<li><a href="/docs/v2.6.x/array_data_type.md">Array Support</a></li>
<li>Text (under development)</li>
<li>Geolocation (under development)</li>
</ul>
<h3 id="Why-Milvus" class="common-anchor-header">Why Milvus?<button data-href="#Why-Milvus" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><ul>
<li><p><strong>High Performance at Scale and High Availability</strong></p>
<p>Milvus features a <a href="/docs/v2.6.x/architecture_overview.md">distributed architecture</a> that separates <a href="/docs/v2.6.x/data_processing.md#Data-query">compute</a> and <a href="/docs/v2.6.x/data_processing.md#Data-insertion">storage</a>. Milvus can horizontally scale and adapt to diverse traffic patterns, achieving optimal performance by independently increasing query nodes for read-heavy workload and data node for write-heavy workload. The stateless microservices on K8s allow <a href="/docs/v2.6.x/coordinator_ha.md#Coordinator-HA">quick recovery</a> from failure, ensuring high availability. The support for <a href="/docs/v2.6.x/replica.md">replicas</a> further enhances fault tolerance and throughput by loading data segments on multiple query nodes. See <a href="https://zilliz.com/vector-database-benchmark-tool">benchmark</a> for performance comparison.</p></li>
<li><p><strong>Support for Various Vector Index Types and Hardware Acceleration</strong></p>
<p>Milvus separates the system and core vector search engine, allowing it to support all major vector index types that are optimized for different scenarios, including HNSW, IVF, FLAT (brute-force), SCANN, and DiskANN, with <a href="/docs/v2.6.x/index-explained.md">quantization-based</a> variations and <a href="/docs/v2.6.x/mmap.md">mmap</a>. Milvus optimizes vector search for advanced features such as <a href="/docs/v2.6.x/boolean.md">metadata filtering</a> and <a href="/docs/v2.6.x/range-search.md">range search</a>. Additionally, Milvus implements hardware acceleration to enhance vector search performance and supports GPU indexing, such as NVIDIA’s <a href="/docs/v2.6.x/gpu-cagra.md">CAGRA</a>.</p></li>
<li><p><strong>Flexible Multi-tenancy and Hot/Cold Storage</strong></p>
<p>Milvus supports <a href="/docs/v2.6.x/multi_tenancy.md#Multi-tenancy-strategies">multi-tenancy</a> through isolation at database, collection, partition, or partition key level. The flexible strategies allow a single cluster to handle hundreds to millions of tenants, also ensures optimized search performance and flexible access control. Milvus enhances cost-effectiveness with hot/cold storage. Frequently accessed hot data can be stored in memory or on SSDs for better performance, while less-accessed cold data is kept on slower, cost-effective storage. This mechanism can significantly reduce costs while maintaining high performance for critical tasks.</p></li>
<li><p><strong>Sparse Vector for Full Text Search and Hybrid Search</strong></p>
<p>In addition to semantic search through dense vector, Milvus also natively supports <a href="/docs/v2.6.x/full-text-search.md">full text search</a> with BM25 as well as learned sparse embedding such as SPLADE and BGE-M3. Users can store sparse vector and dense vector in the same collection, and define functions to rerank results from multiple search requests. See examples of <a href="/docs/v2.6.x/full_text_search_with_milvus.md">Hybrid Search with semantic search + full text search</a>.</p></li>
<li><p><strong>Data Security and Fine-grain Access Control</strong></p>
<p>Milvus ensures data security by implementing <a href="/docs/v2.6.x/authenticate.md">mandatory user authentication</a>, <a href="/docs/v2.6.x/tls.md">TLS encryption</a>, and <a href="/docs/v2.6.x/rbac.md">Role-Based Access Control (RBAC)</a>. User authentication ensures that only authorized users with valid credentials can access the database, while TLS encryption secures all communications within the network. Additionally, RBAC allows for fine-grained access control by assigning specific permissions to users based on their roles. These features make Milvus a robust and secure choice for enterprise applications, protecting sensitive data from unauthorized access and potential breaches.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">AI Integrations<button data-href="#AI-Integrations" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><ul>
<li><p>Embedding Model Integrations
Embedding Models convert unstructured data to their numeric representation in high-dimensional data space so that you can store them in Milvus. Currently, PyMilvus, the Python SDK, integrates several embedding models so that you can quickly prepare your data into vector embeddings. For details, see <a href="/docs/v2.6.x/embeddings.md">Embedding Overview</a>.</p></li>
<li><p>Reranking Model Integrations
In the realm of information retrieval and generative AI, a reranker is an essential tool that optimizes the order of results from initial searches. PyMilvus also integrates several reranking models to optimize the order of results returned from initial searches. For details, refer to <a href="/docs/v2.6.x/rerankers-overview.md">Rerankers Overview</a>.</p></li>
<li><p>LangChain and other AI Tool Integrations
In the GenAI era, tools, such as LangChain, gain much attentions from application developers. As a core component, Milvus usually serves as the vector stores in such tools. To learn how to integrate Milvus in your favorite AI tools, refer to our <a href="/docs/v2.6.x/integrate_with_openai.md">Integrations</a> and <a href="/docs/v2.6.x/build-rag-with-milvus.md">Tutorials</a>.</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">Tools and Ecosystem<button data-href="#Tools-and-Ecosystem" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><ul>
<li><p>Attu
Attu is an all-in-one intuitive GUI that helps you manage Milvus and the data it stores. For details, refer to the <a href="https://github.com/zilliztech/attu">Attu</a> repository.</p></li>
<li><p>Birdwatcher
Birdwatcher is a debugging tool for Milvus. Using it to connect to etcd, you can check the state of your Milvus system or configure it on the fly. For details, refer to <a href="/docs/v2.6.x/birdwatcher_overview.md">BirdWatcher</a>.</p></li>
<li><p>Promethus & Grafana integrations
Prometheus is an open-source system monitoring and alerting toolkit for Kubernetes. Grafana is an open-source visualizing stack that can connect with all data sources. You can use Promethus & Grafana as the monitoring service provider to visually monitor the performance of Milvus distributed. For details, see <a href="/docs/v2.6.x/monitor.md">Deploying Monitoring Services</a>.</p></li>
<li><p>Milvus Backup
Milvus Backup is a tool that allows users to back up and restore Milvus data. It provides both CLI and API to fit itself into different application scenarios. For details, refer to <a href="/docs/v2.6.x/milvus_backup_overview.md">Milvus Backup</a>.</p></li>
<li><p>Milvus Capture Data Change (CDC)
Milvus-CDC can capture and synchronize incremental data in Milvus instances and ensures the reliability of business data by seamlessly transferring it between source and target instances, allowing for easy incremental backup and disaster recovery. For details, refer to <a href="/docs/v2.6.x/milvus-cdc-overview.md">Milvus CDC</a>.</p></li>
<li><p>Milvus Connectors
Milvus has planned a set of connectors for you to seamlessly integrate Milvus with third-party tools, such as Apache Spark. Currently, you can use our Spark Connector to feed your Milvus data to Apache Spark for machine-learning processing. For details, refer to <a href="/docs/v2.6.x/integrate_with_spark.md">Spark-Milvus Connector</a>.</p></li>
<li><p>Vector Transmission Services (VTS)
Milvus provides a set of tools for you to transfer your data between a Milvus instance and a bunch of data sources, including Zilliz clusters, Elasticsearch, Postgres (PgVector), and another Milvus instance. For details, refer to <a href="https://github.com/zilliztech/vts">VTS</a>.</p></li>
</ul>
