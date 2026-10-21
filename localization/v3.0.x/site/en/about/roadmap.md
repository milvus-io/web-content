---
id: roadmap.md
title: Milvus Roadmap
related_key: Milvus roadmap
summary: >-
  Explore the Milvus roadmap for search, analytics, schema evolution, lake
  integration, and performance across the 3.0 and 3.1 releases.
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
    </button></h1><p>Milvus 3.0 brings together multi-vector retrieval, SQL-style querying, flexible schemas, and access to data in lake storage. The next stages build on that foundation with richer queries, broader data models, and improvements to performance and scale. This roadmap outlines those priorities for open-source Milvus.</p>
<p>Milvus 3.0 is generally available starting with <strong>v3.0.1</strong>. The released capabilities below were introduced in <strong>v3.0.0</strong>; preview features and opt-in capabilities are identified where they appear. The <strong>3.0.x</strong> series extends these capabilities, while <strong>3.1 targets December 2026</strong>. Planned features and target dates may change as development progresses.</p>
<h2 id="Search-and-retrieval" class="common-anchor-header">Search and retrieval<button data-href="#Search-and-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>The retrieval roadmap focuses on combining more relevance signals within Milvus, from text matching and multi-vector representations to reranking and search-result facets.</p>
<p><strong>Available in 3.0</strong></p>
<ul>
<li><strong>Multi-vector retrieval:</strong> StructArray search supports Muvera and Lemur, with <code translate="no">element_filter</code> for element-level filtering. Match policies include <code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code>, and <code translate="no">MATCH_EXACT</code>.</li>
<li><strong>Text matching and similarity:</strong> Custom dictionaries and synonyms adapt text retrieval to application needs. Regex filtering supports pattern matching, and MinHash supports near-duplicate detection.</li>
<li><strong>Reranking and inference:</strong> Milvus 3.0 introduces an initial set of Function Chain reranking capabilities, along with the Hugging Face Inference Provider. The remaining Function Chain capabilities are planned for 3.0.x.</li>
<li><strong>Search aggregation:</strong> Search aggregation provides facets over search results.</li>
</ul>
<p><strong>Planned for 3.0.x</strong></p>
<p>The 3.0.x series is planned to add fuzzy matching and global statistics, and complete Function Chain support.</p>
<p><strong>Planned for 3.1</strong></p>
<p>Plans include Grep-based retrieval, tighter integration of approximate nearest neighbor (ANN) search and filtering through ANN-filter fusion, and improvements to sparse retrieval.</p>
<h2 id="Analytics-and-SQL-style-querying" class="common-anchor-header">Analytics and SQL-style querying<button data-href="#Analytics-and-SQL-style-querying" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus is extending its query engine so applications can sort and aggregate data alongside retrieval. The next stage adds joins, materialized views, and custom computation.</p>
<p><strong>Available in 3.0</strong></p>
<p>Query and search support sorting with <code translate="no">ORDER BY</code>. Query Aggregation adds <code translate="no">GROUP BY</code> for computing grouped statistics.</p>
<p><strong>Planned for 3.1</strong></p>
<ul>
<li><strong>Richer queries:</strong> Introduce joins, starting with semi-joins, and Materialized View Collections.</li>
<li><strong>Data updates and integrity:</strong> Support in-place updates and primary-key deduplication during ingestion.</li>
<li><strong>Query iteration and JSON semantics:</strong> Add a stateful query iterator, JSON <code translate="no">GROUP BY</code>, and SQL / JSON NULL semantics.</li>
<li><strong>Custom computation:</strong> Support Python user-defined functions (UDFs).</li>
</ul>
<h2 id="Flexible-schema-and-data-types" class="common-anchor-header">Flexible schema and data types<button data-href="#Flexible-schema-and-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Schema work focuses on evolving existing collections and representing a wider range of data. It covers field changes, multi-vector structures, long text, and entity expiration.</p>
<p><strong>Available in 3.0</strong></p>
<ul>
<li><strong>Online schema changes:</strong> Existing collections support online field addition, including vector and <code translate="no">Array&lt;Struct&gt;</code> fields. Dropping fields is available in <strong>preview</strong> and may have limitations.</li>
<li><strong>Backfill for existing data:</strong> External backfill uses the Spark Connector. Internal backfill attaches a BM25 or MinHash function to a collection and computes its output over existing data.</li>
<li><strong>Text and multi-vector data:</strong> The <code translate="no">TEXT</code> type stores long text, while StructArray supports late-interaction retrieval through <code translate="no">MAX_SIM</code>. <code translate="no">TEXT</code> requires opt-in Storage V3.</li>
<li><strong>NULL values and expiration:</strong> Vector fields accept NULL values, and entity-level time to live (TTL) controls expiration.</li>
</ul>
<p><strong>Planned for 3.0.x</strong></p>
<p>Planned schema enhancements expand StructArray support for types, NULL values, and field addition and removal. They also add molecular formula support and <code translate="no">IS NULL</code> / <code translate="no">IS NOT NULL</code> filters for vector fields.</p>
<p><strong>Planned for 3.1</strong></p>
<p>The next data-model extensions include nested JSON and Struct, composite primary keys, collections without vector fields, and sparse vectors in StructList.</p>
<h2 id="Lake-integration-and-data-versioning" class="common-anchor-header">Lake integration and data versioning<button data-href="#Lake-integration-and-data-versioning" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus is developing closer integration with lake storage and batch processing. External collections provide access to data where it resides, while snapshots provide a foundation for data versioning.</p>
<p><strong>Available in 3.0</strong></p>
<ul>
<li><strong>External data access:</strong> External Collection supports Lance, Parquet, and Iceberg data.</li>
<li><strong>Snapshots and batch integration:</strong> Snapshot captures a version of collection data, and the Spark Connector supports batch workflows.</li>
<li><strong>Storage foundation:</strong> Storage V3 (Loon) provides opt-in Vortex and Lance support. It is disabled by default and is enabled through <code translate="no">common.storage.useLoonFFI</code>. Both Snapshot and <code translate="no">TEXT</code> depend on it.</li>
</ul>
<p><strong>Planned for 3.0.x</strong></p>
<p>Planned enhancements allow a Milvus collection snapshot to serve as an external collection. External-table support also expands to JSON shredding, function-field addition, and field removal.</p>
<p><strong>Planned for 3.1</strong></p>
<p>Plans include S3-based sparse and scalar indexes, along with deletion through import.</p>
<h2 id="Performance-indexing-and-scale" class="common-anchor-header">Performance, indexing, and scale<button data-href="#Performance-indexing-and-scale" class="anchor-icon" translate="no">
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
    </button></h2><p>The performance roadmap covers retrieval indexes, query execution, and cluster growth. It also addresses recovery and queries that must read data from object storage.</p>
<p><strong>Available in 3.0</strong></p>
<ul>
<li><strong>Sparse indexing:</strong> The sparse index overhaul introduces SINDI.</li>
<li><strong>Index choice:</strong> The <code translate="no">FAISS</code> passthrough index accepts Faiss index-factory strings, with options including SVS, Panorama, PQ, IVFPQ, and ScaNN. DiskANN indexing is also available for embedding lists (EmbList).</li>
<li><strong>Compaction:</strong> Force Merge provides explicit control over segment merging.</li>
</ul>
<p><strong>Planned for 3.1</strong></p>
<ul>
<li><strong>Storage-aware queries:</strong> Add predicate pushdown for Vortex, including page-level pruning and skip indexes.</li>
<li><strong>Cluster growth and tenancy:</strong> Support shard splitting, custom sharding keys, and multi-tenancy optimizations.</li>
<li><strong>Query execution and indexing:</strong> Develop QueryView, improve support for wide collections, stream result reduction, and support multiple indexes.</li>
<li><strong>Write reliability:</strong> Support idempotent writes.</li>
<li><strong>Object-storage caching:</strong> Use Talon as an S3 cache to improve failure recovery and cold-query performance.</li>
</ul>
<h2 id="Beyond-31" class="common-anchor-header">Beyond 3.1<button data-href="#Beyond-31" class="anchor-icon" translate="no">
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
    </button></h2><p>Longer-term work includes time-travel and snapshot rollback. Their scope and release timing remain to be confirmed.</p>
<h2 id="Help-shape-the-roadmap" class="common-anchor-header">Help shape the roadmap<button data-href="#Help-shape-the-roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>Share the workloads, limitations, and feature requests that matter to your applications in <a href="https://github.com/milvus-io/milvus/discussions">GitHub Discussions</a>. Report bugs through <a href="https://github.com/milvus-io/milvus/issues">GitHub Issues</a>.</p>
<p>To contribute code or documentation, start with the <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">Contributor’s Guide</a>.</p>
