---
id: release_notes.md
summary: Milvus Release Notes
title: Release Notes
---
<h1 id="Release-Notes" class="common-anchor-header">Release Notes<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.5.0 in this section. We suggest that you regularly visit this page to learn about updates.</p>
<h2 id="v250-beta" class="common-anchor-header">v2.5.0-beta<button data-href="#v250-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: November 26, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Node.js SDK version</th><th>Java SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.5.0-beta</td><td>2.5.0</td><td>2.5.0</td><td>2.5.0</td></tr>
</tbody>
</table>
<p>Milvus 2.5.0-beta brings significant advancements to enhance usability, scalability, and performance for users dealing with vector search and large-scale data management. With this release, Milvus integrates powerful new features like term-based search, clustering compaction for optimized queries, and versatile support for sparse and dense vector search methods. Enhancements in cluster management, indexing, and data handling introduce new levels of flexibility and ease of use, making Milvus an even more robust and user-friendly vector database.</p>
<h3 id="Key-Features" class="common-anchor-header">Key Features</h3><h4 id="Full-Text-Search" class="common-anchor-header">Full Text Search</h4><p>Milvus 2.5 supports full text search implemented with Sparse-BM25! This feature is an important complement to Milvus’s strong semantic search capabilities, especially in scenarios involving rare words or technical terms. In previous versions, Milvus supported sparse vectors to assist with keyword search scenarios. These sparse vectors were generated outside of Milvus by neural models like SPLADEv2/BGE-M3 or statistical models such as the BM25 algorithm.</p>
<p>Milvus 2.5 has built-in tokenization and sparse vector extraction, extending the API from only receiving vectors as input to directly accepting text. BM25 statistical information is updated in real time as data is inserted, enhancing usability and accuracy. Additionally, sparse vectors based on approximate nearest neighbor (ANN) algorithms offer more powerful performance than standard keyword search systems.</p>
<p>For details, refer to <a href="/docs/full-text-search.md">Full Text Search</a>.</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">Cluster Management WebUI (Beta)</h4><p>To better support massive data and rich features, Milvus’s sophisticated design includes various dependencies, numerous node roles, complex data structures, and more. These aspects can pose challenges for usage and maintenance.</p>
<p>Milvus 2.5 introduces a built-in Cluster Management WebUI, reducing system maintenance difficulty by visualizing Milvus’s complex runtime environment information. This includes details of databases and collections, segments, channels, dependencies, node health status, task information, slow queries, and more.</p>
<h4 id="Text-Match" class="common-anchor-header">Text Match</h4><p>Milvus 2.5 leverages analyzers and indexing from Tantivy for text preprocessing and index building, supporting precise natural language matching of text data based on specific terms. This feature is primarily used for filtered search to satisfy specific conditions and can incorporate scalar filtering to refine query results, allowing similarity searches within vectors that meet scalar criteria.</p>
<p>For details, refer to <a href="/docs/keyword-match.md">Keyword Match</a>.</p>
<h4 id="Bitmap-Index" class="common-anchor-header">Bitmap Index</h4><p>A new scalar data index has been added to the Milvus family. The BitMap index uses an array of bits, equal in length to the number of rows, to represent the existence of values and accelerate searches.</p>
<p>Bitmap indexes have traditionally been effective for low-cardinality fields, which have a modest number of distinct values—for example, a column containing gender information with only two possible values: male and female.</p>
<p>For details, refer to <a href="/docs/bitmap.md">Bitmap Index</a>.</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">Nullable &amp; Default Value</h4><p>Milvus now supports setting nullable properties and default values for scalar fields other than the primary key field. For scalar fields marked as <code translate="no">nullable=True</code>, users can omit the field when inserting data; the system will treat it as a null value or default value (if set) without throwing an error.</p>
<p>Default values and nullable properties provide greater flexibility to Milvus. Users can utilize this feature for fields with uncertain values when creating collections. It also simplifies data migration from other database systems to Milvus, allowing for handling datasets containing null values while preserving original default value settings.</p>
<p>For details, refer to <a href="/docs/nullable-and-default.md">Nullable &amp; Default Value</a>.</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">Faiss-based HNSW SQ/PQ/PRQ</h4><p>Through close collaboration with the Faiss community, the HNSW algorithm in Faiss has seen significant improvements in both functionality and performance. For considerations of stability and maintainability, Milvus 2.5 has officially migrated its support for HNSW from hnswlib to Faiss.</p>
<p>Based on Faiss, Milvus 2.5 supports multiple quantization methods on HNSW to meet the needs of different scenarios: SQ (Scalar Quantizers), PQ (Product Quantizer), and PRQ (Product Residual Quantizer). SQ and PQ are more common; SQ provides good query performance and build speed, while PQ offers better recall at the same compression ratio. Many vector databases commonly use binary quantization, which is a simple form of SQ quantization.</p>
<p>PRQ is a fusion of PQ and AQ (Additive Quantizer). Compared to PQ, it requires longer build times to deliver better recall, especially at high compression rates, saying binary compression.</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">Clustering Compaction (Beta)</h4><p>Milvus 2.5 introduces Clustering Compaction to accelerate searches and reduce costs in large collections. By specifying a scalar field as a clustering key, data is redistributed by range to optimize storage and retrieval. Acting like a global index, this feature enables Milvus to efficiently prune data during queries based on clustering metadata, enhancing search performance when scalar filters are applied.</p>
<p>For details, refer to <a href="/docs/clustering-compaction.md">Clustering Compaction</a>.</p>
<h3 id="Other-Features" class="common-anchor-header">Other Features</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">Streaming Node (Beta)</h4><p>Milvus 2.5 introduces a new component called the streaming node, which provides Write-Ahead Logging (WAL) services. This enables Milvus to achieve consensus before and after reading and writing channels, unlocking new features, functionalities, and optimizations. This feature is disabled by default in Milvus 2.5 and will be officially available in version 3.0.</p>
<h4 id="IPv6-Support" class="common-anchor-header">IPv6 Support</h4><p>Milvus now supports IPv6, allowing for expanded network connectivity and compatibility.</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">CSV Bulk Import</h4><p>In addition to JSON and Parquet formats, Milvus now supports direct bulk import of data in CSV format.</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">Expression Templates for Query Acceleration</h4><p>Milvus now supports expression templates, improving expression parsing efficiency, particularly in scenarios with complex expressions.</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">GroupBy Enhancements</h4><ul>
<li><strong>Customizable Group Size</strong>: Added support for specifying the number of entries returned for each group.</li>
<li><strong>Hybrid GroupBy Search</strong>: Supports hybrid GroupBy search based on multiple vector columns.</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">Iterator Enhancements</h4><ul>
<li><strong>MVCC Support</strong>: Users can now use iterators without being affected by subsequent data changes like inserts and deletions, thanks to Multi-Version Concurrency Control (MVCC).</li>
<li><strong>Persistent Cursor</strong>: Milvus now supports a persistent cursor for QueryIterator, enabling users to resume iteration from the last position after a Milvus restart without needing to restart the entire iteration process.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><h4 id="Deletion-Optimization" class="common-anchor-header">Deletion Optimization</h4><p>Improved the speed and reduced memory usage for large-scale deletions by optimizing lock usage and memory management.</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">Dependencies Upgrade</h4><p>Upgraded to ETCD 3.5.16 and Pulsar 3.0.7 LTS, fixing existing CVEs and enhancing security. Note: The upgrade to Pulsar 3.x is not compatible with previous 2.x versions.</p>
<p>For users who already have a working Milvus deployment, you need to upgrade the ETCD and Pulsar components before you can use the new features and functions. For details, refer to <a href="/docs/upgrade-pulsar-v3.md">Upgrade Pulsar from 2.x to 3.x</a></p>
<h4 id="Local-Storage-V2" class="common-anchor-header">Local Storage V2</h4><p>Introduced a new local file format in Milvus 2.5, enhancing loading and query efficiency for scalar data, reducing memory overhead, and laying the groundwork for future optimizations.</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">Expression Parsing Optimization</h4><p>Improved expression parsing by implementing caching for repeated expressions, upgrading ANTLR, and optimizing the performance of <code translate="no">NOT IN</code> clauses.</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">Improved DDL Concurrency Performance</h4><p>Optimized the concurrency performance of Data Definition Language (DDL) operations.</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">RESTful API Feature Alignment</h4><p>Aligned the functionalities of the RESTful API with other SDKs for consistency.</p>
