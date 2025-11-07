---
id: roadmap.md
title: Milvus Roadmap
related_key: Milvus roadmap
summary: >-
  Milvus is an open-source vector database built to power AI applications. Here
  is our roadmap to guide our development.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Milvus Roadmap<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 Toward the Next-Gen Multimodal Database and Data Lake<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Milvus Product Roadmap</strong></p>
<p>Welcome to the Milvus Roadmap!</p>
<p>We are ushering Milvus into a new era — the next-generation multimodal database — spanning <strong>structured to unstructured data</strong>, <strong>real-time retrieval to offline analytics</strong>, and <strong>single-cluster performance to a global data lake architecture</strong>.</p>
<p>This roadmap outlines the core objectives for <strong>Milvus v2.6 (in progress)</strong>, <strong>Milvus v3.0 (targeted for late 2026)</strong>, and <strong>Milvus v3.1 (long-term development)</strong>, along with the evolution plan for <strong>Vector Lake (data lake / Loon)</strong>.</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6 (In Progress)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Timeline: Mid-2025 – End of 2025</strong></p>
<p>Focus: <strong>Upgrading the data model</strong>, <strong>refactoring the streaming architecture</strong>, <strong>building hot/cold tiering capabilities</strong>, and launching the <strong>Vector Lake Prototype (v0.1)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Key Highlights<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header">🔹 <strong>Data Model Upgrade</strong></h4><ul>
<li><p>Introduce a unified <strong>Tensor / StructList</strong> data type to support multi-vector embedding structures, enabling compatibility with <em>ColBERT</em>, <em>CoLQwen</em>, <em>video</em>, and <em>multimodal vectors</em>.</p></li>
<li><p>Add <strong>Geo Data</strong> support, including points, regions, and spatial indexing (based on <em>libspatial</em>), to expand use cases in LBS and GIS.</p></li>
<li><p>Support for <strong>Timestamp with Timezone</strong> data type.</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header">🔹 <strong>StreamNode Architecture Refactor</strong></h4><ul>
<li><p>Rewrite the streaming ingestion pipeline to optimize incremental writes and real-time computation.</p></li>
<li><p>Significantly improve concurrency performance and stability, laying the foundation for unified real-time and offline processing.</p></li>
<li><p>Introduce a new message queue engine: <strong>Woodpecker</strong>.</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header">🔹 <strong>Hot/Cold Tiering & Storage Architecture (StorageV2)</strong></h4><ul>
<li><p>Support dual storage formats: <strong>Parquet</strong> and <strong>Vortex</strong>, enhancing concurrency and memory efficiency.</p></li>
<li><p>Implement tiered storage with automatic hot/cold data separation and intelligent scheduling.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹 <strong>Vector Lake Prototype (v0.1)</strong></h4><ul>
<li><p>Integrate with <strong>Spark</strong> / <strong>DuckDB</strong> / <strong>DataFusion</strong> via FFI, enabling offline schema evolution and KNN queries.</p></li>
<li><p>Provide multimodal data visualization and a Spark ETL demo, establishing the foundational data lake architecture.</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Late-2026" class="common-anchor-header">🌠 Milvus v3.0 (Targeted for Late 2026)<button data-href="#🌠-Milvus-v30-Targeted-for-Late-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Timeline: Late 2025 – Early 2026</strong></p>
<p>Focus: Comprehensive enhancements to <strong>search experience</strong>, <strong>schema flexibility</strong>, and <strong>unstructured data support</strong>, along with the release of <strong>Vector Lake (v0.2)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Key Highlights<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header">🔹 <strong>Search Experience Overhaul</strong></h4><ul>
<li><p>Introduce <strong>More Like This (MLT)</strong> similarity search with support for searches with position or negative examples.</p></li>
<li><p>Add semantic search capabilities such as <strong>highlighting</strong> and <strong>boosting</strong>.</p></li>
<li><p>Support <strong>custom dictionaries</strong> and <strong>synonym tables</strong>, enabling lexical and semantic rule definitions at the Analyzer layer.</p></li>
<li><p>Introduce <strong>aggregation</strong> capabilities for queries.</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹 <strong>Multi-Tenancy & Resource Management</strong></h4><ul>
<li><p>Enable multi-tenant deletion, statistics, and hot/cold tiering.</p></li>
<li><p>Improve resource isolation and scheduling strategies to support millions of tables in a single cluster.</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header">🔹 <strong>Schema & Primary Key Enhancements</strong></h4><ul>
<li><p>Implement <strong>Global Primary Key Deduplication (Global PK Dedup)</strong> to guarantee data consistency and uniqueness.</p></li>
<li><p>Support <strong>flexible schema management</strong> (adding/dropping columns, backup fill).</p></li>
<li><p>Allow <strong>NULL values</strong> in vector fields.</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header">🔹 <strong>Expanded Unstructured Data Types (BLOB / Text)</strong></h4><ul>
<li><p>Introduce the <strong>BLOB type</strong>, which provides native storage and referencing for binary data such as files, images, and videos.</p></li>
<li><p>Introduce <strong>TEXT type</strong>, which provides enhanced full-text and content-based search capabilities.</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header">🔹 <strong>Enterprise-Grade Capabilities</strong></h4><ul>
<li><p>Support <strong>Snapshot-based backup and recovery</strong>.</p></li>
<li><p>Provide <strong>end-to-end tracing</strong> and <strong>audit logging</strong>.</p></li>
<li><p>Implement <strong>Active-Standby High Availability (HA)</strong> across multi-cluster deployments.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹 <strong>Vector Lake (v0.2)</strong></h4><ul>
<li><p>Support <strong>TEXT / BLOB storage</strong> and <strong>multi-version snapshot management</strong>.</p></li>
<li><p>Integrate Spark for offline indexing, clustering, deduplication, and dimensionality reduction tasks.</p></li>
<li><p>Deliver <strong>ChatPDF cold-query and offline benchmark demos</strong>.</p></li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">🪐 Milvus v3.1 (Long-Term Vision)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Timeline: Mid-2026</strong></p>
<p>Focus: <strong>User-defined functions (UDF)</strong>, <strong>distributed computing integration</strong>, <strong>scalar query optimization</strong>, <strong>dynamic sharding</strong>, and the official release of <strong>Vector Lake (v1.0)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Key Highlights<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹 <strong>UDF & Distributed Computing Ecosystem</strong></h4><ul>
<li><p>Support <strong>User-Defined Functions (UDFs)</strong>, allowing developers to inject custom logic into retrieval and computation workflows.</p></li>
<li><p>Deep integration with <strong>Ray Dataset / Daft</strong> for distributed UDF execution and multimodal data processing.</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header">🔹 <strong>Scalar Query & Local Format Evolution</strong></h4><ul>
<li><p>Optimize filtering and aggregation performance for scalar fields.</p></li>
<li><p>Enhance expression evaluation and index-accelerated execution.</p></li>
<li><p>Support <strong>in-place updates</strong> for local file formats.</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹 <strong>Advanced Search Capabilities</strong></h4><ul>
<li><p>Add the following features: <strong>RankBy</strong>, <strong>OrderBy</strong>, <strong>Facet</strong>, and <strong>Fuzzy match</strong> queries.</p></li>
<li><p>Enhance text retrieval with support for:</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹 <strong>Dynamic Sharding & Scalability</strong></h4><ul>
<li><p>Enable <strong>automatic shard splitting</strong> and <strong>load balancing</strong> for seamless scaling.</p></li>
<li><p>Improve <strong>global index building</strong> and ensure <strong>distributed search performance</strong>.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹 <strong>Vector Lake V1.0</strong></h4><ul>
<li><p>Deep integration with <strong>Ray / Daft / PyTorch</strong> to support distributed UDFs and Context Engineering use cases.</p></li>
<li><p>Provide <strong>RAG (Retrieval-Augmented Generation) demos</strong> <strong>and import from Iceberg tables</strong>.</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Co-Building the Future of Milvus<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus is an open-source project driven by a global community of developers.</p>
<p>We warmly invite all community members to help shape the next-generation multimodal database:</p>
<ul>
<li><p>💬 <strong>Share feedback</strong>: Propose new features or optimization ideas</p></li>
<li><p>🐛 <strong>Report issues</strong>: File bugs via GitHub Issues</p></li>
<li><p>🔧 <strong>Contribute code</strong>: Submit PRs and help build core features</p>
<ul>
<li><p><strong>Pull requests</strong>: Contribute directly to our <a href="https://github.com/milvus-io/milvus/pulls">codebase</a>. Whether it’s fixing bugs, adding features, or improving documentation, your contributions are welcome.</p></li>
<li><p><strong>Development guide</strong>: Check our <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Contributor’s Guide</a> for guidelines on code contributions.</p></li>
</ul></li>
<li><p>⭐ <strong>Spread the word</strong>: Share best practices and success stories</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
