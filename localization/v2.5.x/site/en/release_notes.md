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
<h2 id="v254" class="common-anchor-header">v2.5.4<button data-href="#v254" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: January 23, 2025</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Node.js SDK version</th><th>Java SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>We’re excited to announce the release of Milvus 2.5.4, which introduces key performance optimizations and new features such as PartitionKey isolation, Sparse Index with DAAT MaxScore, and enhanced locking mechanisms. A standout highlight of this release is its support for 10,000 collections and 1 million partitions, marking a major milestone for multi-tenant use cases. This version also addresses multiple bugs that improve overall stability and reliability, two of the critical bugs may cause data loss. We encourage you to upgrade or try out this latest release, and we look forward to your feedback in helping us continually refine Milvus!</p>
<h3 id="Features" class="common-anchor-header">Features</h3><ul>
<li>Supports PartitionKey isolation to improve performance with multiple partition keys (<a href="https://github.com/milvus-io/milvus/pull/39245">#39245</a>). For more information, refer to <a href="/docs/use-partition-key.md">Use Partition Key</a>.</li>
<li>Sparse Index now supports DAAT MaxScore <a href="https://github.com/milvus-io/knowhere/pull/1015">knowhere/#1015</a>. For more information, refer to <a href="/docs/sparse_vector.md">Sparse Vector</a>.</li>
<li>Adds support for <code translate="no">is_null</code> in expression (<a href="https://github.com/milvus-io/milvus/pull/38931">#38931</a>)</li>
<li>Root privileges can be customized (<a href="https://github.com/milvus-io/milvus/pull/39324">#39324</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Support 10K collections and 1million partitions in one cluster (<a href="https://github.com/milvus-io/milvus/pull/37630">#37630</a>)</li>
<li>Cached segments’ delta information to accelerate the Query Coordinator (<a href="https://github.com/milvus-io/milvus/pull/39349">#39349</a>)</li>
<li>Read metadata concurrently at the collection level to speed up failure recovery (<a href="https://github.com/milvus-io/milvus/pull/38900">#38900</a>)</li>
<li>Refined lock granularity in QueryNode (<a href="https://github.com/milvus-io/milvus/pull/39282">#39282</a>), (<a href="https://github.com/milvus-io/milvus/pull/38907">#38907</a>)</li>
<li>Unified style by using CStatus to handle NewCollection CGO calls (<a href="https://github.com/milvus-io/milvus/pull/39303">#39303</a>)</li>
<li>Skipped generating the partition limiter if no partition is set (<a href="https://github.com/milvus-io/milvus/pull/38911">#38911</a>)</li>
<li>Added more RESTful API support (<a href="https://github.com/milvus-io/milvus/pull/38875">#38875</a>) (<a href="https://github.com/milvus-io/milvus/pull/39425">#39425</a>)</li>
<li>Removed unnecessary Bloom Filters in QueryNode and DataNode to reduce memory usage (<a href="https://github.com/milvus-io/milvus/pull/38913">#38913</a>)</li>
<li>Speeded up data loading by accelerating task generation, scheduling, and execution in QueryCoord (<a href="https://github.com/milvus-io/milvus/pull/38905">#38905</a>)</li>
<li>Reduced locking in DataCoord to speed up load and insert operations (<a href="https://github.com/milvus-io/milvus/pull/38904">#38904</a>)</li>
<li>Added primary field names in <code translate="no">SearchResult</code> and <code translate="no">QueryResults</code> (<a href="https://github.com/milvus-io/milvus/pull/39222">#39222</a>)</li>
<li>Used both binlog size and index size as the disk quota throttling standard (<a href="https://github.com/milvus-io/milvus/pull/38844">#38844</a>)</li>
<li>Optimized memory usage for full-text search knowhere/#1011</li>
<li>Added version control for scalar indexes (<a href="https://github.com/milvus-io/milvus/pull/39236">#39236</a>)</li>
<li>Improved the speed of fetching collection information from RootCoord by avoiding unnecessary copies (<a href="https://github.com/milvus-io/milvus/pull/38902">#38902</a>)</li>
</ul>
<h3 id="Critial-Bug-fixs" class="common-anchor-header">Critial Bug fixs</h3><ul>
<li>Fixed search failures for primary keys with indexes (<a href="https://github.com/milvus-io/milvus/pull/39390">#39390</a>)</li>
<li>Fixed potential data loss issue caused by restarting MixCoord and flushing concurrently (<a href="https://github.com/milvus-io/milvus/pull/39422">#39422</a>)</li>
<li>Fixed a delete failure triggered by improper concurrency between stats tasks and L0 compaction after MixCoord restarts (<a href="https://github.com/milvus-io/milvus/pull/39460">#39460</a>)</li>
<li>Fixed scalar inverted index incompatibility when upgrading from 2.4 to 2.5 (<a href="https://github.com/milvus-io/milvus/pull/39272">#39272</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Fixed slow query issues caused by coarse lock granularity during multi-column loading (<a href="https://github.com/milvus-io/milvus/pull/39255">#39255</a>)</li>
<li>Fixed an issue where using aliases could cause an iterator to traverse the wrong database (<a href="https://github.com/milvus-io/milvus/pull/39248">#39248</a>)</li>
<li>Fixed a resource group update failure when altering the database (<a href="https://github.com/milvus-io/milvus/pull/39356">#39356</a>)</li>
<li>Fixed a sporadic issue where the tantivy index could not delete index files during release (<a href="https://github.com/milvus-io/milvus/pull/39434">#39434</a>)</li>
<li>Fixed slow indexing caused by having too many threads (<a href="https://github.com/milvus-io/milvus/pull/39341">#39341</a>)</li>
<li>Fixed an issue preventing disk quota checks from being skipped during bulk import (<a href="https://github.com/milvus-io/milvus/pull/39319">#39319</a>)</li>
<li>Resolved freeze issues caused by too many message queue consumers by limiting concurrency (<a href="https://github.com/milvus-io/milvus/pull/38915">#38915</a>)</li>
<li>Fixed query timeouts caused by MixCoord restarts during large-scale compactions (<a href="https://github.com/milvus-io/milvus/pull/38926">#38926</a>)</li>
<li>Fixed channel imbalance issues caused by node downtime (<a href="https://github.com/milvus-io/milvus/pull/39200">#39200</a>)</li>
<li>Fixed an issue that could cause channel balance to become stuck. (<a href="https://github.com/milvus-io/milvus/pull/39160">#39160</a>)</li>
<li>Fixed an issue where RBAC custom group privilege level checks became ineffective (<a href="https://github.com/milvus-io/milvus/pull/39224">#39224</a>)</li>
<li>Fixed a failure to retrieve the number of rows in empty indexes (<a href="https://github.com/milvus-io/milvus/pull/39210">#39210</a>)</li>
<li>Fixed incorrect memory estimation for small segments (<a href="https://github.com/milvus-io/milvus/pull/38909">#38909</a>)</li>
</ul>
<h2 id="v253" class="common-anchor-header">v2.5.3<button data-href="#v253" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: January 13, 2025</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Node.js SDK version</th><th>Java SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.3 delivers critical bug fixes and performance enhancements to improve overall stability, reliability, and usability. This version refines concurrency handling, bolsters data indexing and retrieval, and updates several key components for a more robust user experience.</p>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Fixed an issue where using an <code translate="no">IN</code> filter on a <code translate="no">VARCHAR</code> primary key could return empty results. (<a href="https://github.com/milvus-io/milvus/pull/39108">#39108</a>)</li>
<li>Fixed a concurrency problem between query and delete operations that could lead to incorrect results. (<a href="https://github.com/milvus-io/milvus/pull/39054">#39054</a>)</li>
<li>Fixed a failure caused by iterative filtering when an <code translate="no">expr</code> was empty in a query request. (<a href="https://github.com/milvus-io/milvus/pull/39034">#39034</a>)</li>
<li>Fixed an issue where a disk error during config updates led to the use of default config settings. (<a href="https://github.com/milvus-io/milvus/pull/39072">#39072</a>)</li>
<li>Fixed a potential loss of deleted data due to clustering compaction. (<a href="https://github.com/milvus-io/milvus/pull/39133">#39133</a>)</li>
<li>Fixed a broken text match query in growing data segments. (<a href="https://github.com/milvus-io/milvus/pull/39113">#39113</a>)</li>
<li>Fixed retrieval failures caused by the index not containing the original data for sparse vectors. (<a href="https://github.com/milvus-io/milvus/pull/39146">#39146</a>)</li>
<li>Fixed a possible column field race condition caused by concurrent querying and data loading. (<a href="https://github.com/milvus-io/milvus/pull/39152">#39152</a>)</li>
<li>Fixed bulk insert failures when nullable or default_value fields were not included in the data. (<a href="https://github.com/milvus-io/milvus/pull/39111">#39111</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Added a resource group API for the RESTful interface. (<a href="https://github.com/milvus-io/milvus/pull/39092">#39092</a>)</li>
<li>Optimized retrieve performance by leveraging bitset SIMD methods. (<a href="https://github.com/milvus-io/milvus/pull/39041">#39041</a>)</li>
<li>Used MVCC timestamp as the guarantee timestamp when specified. (<a href="https://github.com/milvus-io/milvus/pull/39019">#39019</a>)</li>
<li>Added missing delete metrics. (<a href="https://github.com/milvus-io/milvus/pull/38747">#38747</a>)</li>
<li>Updated Etcd to version v3.5.16. (<a href="https://github.com/milvus-io/milvus/pull/38969">#38969</a>)</li>
<li>Created a new Go package to manage protos.(<a href="https://github.com/milvus-io/milvus/pull/39128">#39128</a>)</li>
</ul>
<h2 id="v252" class="common-anchor-header">v2.5.2<button data-href="#v252" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: January 3, 2025</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Node.js SDK version</th><th>Java SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.5.2</td><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td></tr>
</tbody>
</table>
<p>Milvus 2.5.2 supports modifying the maximum length for VARCHAR columns and resolves several critical issues related to concurrency, partition drops, and BM25 stats handling during import. We highly recommend upgrading to this version for improved stability and performance.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Generated disk usage logs only when the specified path does not exist. (<a href="https://github.com/milvus-io/milvus/pull/38822">#38822</a>)</li>
<li>Added a parameter for tuning the maximum VARCHAR length and restored the limit to 65,535. (<a href="https://github.com/milvus-io/milvus/pull/38883">#38883</a>)</li>
<li>Supported parameter type conversion for expressions. (<a href="https://github.com/milvus-io/milvus/pull/38782">#38782</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Fixed potential deadlocks in concurrency scenarios. (<a href="https://github.com/milvus-io/milvus/pull/38863">#38863</a>)</li>
<li>Generated the index_null_offset file only for fields that support null values. (<a href="https://github.com/milvus-io/milvus/pull/38834">#38834</a>)</li>
<li>Fixed the retrieve plan usage after free in the reduce phase. (<a href="https://github.com/milvus-io/milvus/pull/38841">#38841</a>)</li>
<li>Recognized expressions with capitalized AND and OR. (<a href="https://github.com/milvus-io/milvus/pull/38928">#38928</a>)</li>
<li>Allowed successful partition drops even if loading failed. (<a href="https://github.com/milvus-io/milvus/pull/38874">#38874</a>)</li>
<li>Fixed BM25 stats file registration issues during import. (<a href="https://github.com/milvus-io/milvus/pull/38881">#38881</a>)</li>
</ul>
<h2 id="v251" class="common-anchor-header">v2.5.1<button data-href="#v251" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: December 26, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Node.js SDK version</th><th>Java SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.1 focuses on a series of bug fixes addressing memory loading, RBAC listings, query node balancing, and sealed segment indexing, while also improving the Web UI and interceptors. We highly recommend upgrading to 2.5.1 for enhanced stability and reliability.</p>
<h3 id="Improvement" class="common-anchor-header">Improvement</h3><ul>
<li>Update web UI collection and query pages. (<a href="https://github.com/milvus-io/milvus/pull/38701">#38701</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Fixed OOM issues by adding a memory factor to loading estimations. (<a href="https://github.com/milvus-io/milvus/pull/38722">#38722</a>)</li>
<li>Fixed privilege group expansion when listing policies in RootCoord. (<a href="https://github.com/milvus-io/milvus/pull/38760">#38760</a>)</li>
<li>Fixed issues with listing privilege groups and collections. (<a href="https://github.com/milvus-io/milvus/pull/38738">#38738</a>)</li>
<li>Fixed the balancer to avoid repeatedly overloading the same query node. (<a href="https://github.com/milvus-io/milvus/pull/38724">#38724</a>)</li>
<li>Fixed unexpected balance tasks triggered after QueryCoord restarts. (<a href="https://github.com/milvus-io/milvus/pull/38725">#38725</a>)</li>
<li>Fixed load config updates not applying to loading collections. (<a href="https://github.com/milvus-io/milvus/pull/38737">#38737</a>)</li>
<li>Fixed zero read count during data import. (<a href="https://github.com/milvus-io/milvus/pull/38695">#38695</a>)</li>
<li>Fixed Unicode decoding for JSON keys in expressions. (<a href="https://github.com/milvus-io/milvus/pull/38653">#38653</a>)</li>
<li>Fixed interceptor DB name for alterCollectionField in 2.5.  (<a href="https://github.com/milvus-io/milvus/pull/38663">#38663</a>)</li>
<li>Fixed empty index parameters for sealed segments when using BM25 brute force search. (<a href="https://github.com/milvus-io/milvus/pull/38752">#38752</a>)</li>
</ul>
<h2 id="v250" class="common-anchor-header">v2.5.0<button data-href="#v250" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: December 23, 2024</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Node.js SDK version</th><th>Java SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.5.0</td><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.0 brings significant advancements to enhance usability, scalability, and performance for users dealing with vector search and large-scale data management. With this release, Milvus integrates powerful new features like term-based search, clustering compaction for optimized queries, and versatile support for sparse and dense vector search methods. Enhancements in cluster management, indexing, and data handling introduce new levels of flexibility and ease of use, making Milvus an even more robust and user-friendly vector database.</p>
<h3 id="Key-Features" class="common-anchor-header">Key Features</h3><h4 id="Full-Text-Search" class="common-anchor-header">Full Text Search</h4><p>Milvus 2.5 supports full text search implemented with Sparse-BM25! This feature is an important complement to Milvus’s strong semantic search capabilities, especially in scenarios involving rare words or technical terms. In previous versions, Milvus supported sparse vectors to assist with keyword search scenarios. These sparse vectors were generated outside of Milvus by neural models like SPLADEv2/BGE-M3 or statistical models such as the BM25 algorithm.</p>
<p>Powered by <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, Milvus 2.5 has built-in analyzers and sparse vector extraction, extending the API from only receiving vectors as input to directly accepting text. BM25 statistical information is updated in real time as data is inserted, enhancing usability and accuracy. Additionally, sparse vectors based on approximate nearest neighbor (ANN) algorithms offer more powerful performance than standard keyword search systems.</p>
<p>For details, refer to <a href="/docs/analyzer-overview.md">Analyzer Overview</a> and <a href="/docs/full-text-search.md">Full Text Search</a>.</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">Cluster Management WebUI (Beta)</h4><p>To better support massive data and rich features, Milvus’s sophisticated design includes various dependencies, numerous node roles, complex data structures, and more. These aspects can pose challenges for usage and maintenance.</p>
<p>Milvus 2.5 introduces a built-in Cluster Management WebUI, reducing system maintenance difficulty by visualizing Milvus’s complex runtime environment information. This includes details of databases and collections, segments, channels, dependencies, node health status, task information, slow queries, and more.</p>
<p>For details, refer to <a href="/docs/milvus-webui.md">Milvus WebUI</a>.</p>
<h4 id="Text-Match" class="common-anchor-header">Text Match</h4><p>Milvus 2.5 leverages analyzers and indexing from <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> for text preprocessing and index building, supporting precise natural language matching of text data based on specific terms. This feature is primarily used for filtered search to satisfy specific conditions and can incorporate scalar filtering to refine query results, allowing similarity searches within vectors that meet scalar criteria.</p>
<p>For details, refer to <a href="/docs/analyzer-overview.md">Analyzer Overview</a> and <a href="/docs/keyword-match.md">Text Match</a>.</p>
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
<p>For details, refer to <a href="/docs/filtering-templating.md">Filter Templating</a>.</p>
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
<h4 id="Security--Configuration-Updates" class="common-anchor-header">Security &amp; Configuration Updates</h4><p>Supported TLS to secure inter-node communication in more complex or enterprise environments. For details, refer to <a href="/docs/tls.md">Security Configuration</a>.</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">Compaction Performance Enhancements</h4><p>Removed maximum segment limitations in mixed compaction and now prioritizes smaller segments first, improving efficiency and speeding up queries on large or fragmented datasets.</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">Score-Based Channel Balancing</h4><p>Introduced a policy that dynamically balances loads across channels, enhancing resource utilization and overall stability in large-scale deployments.</p>
