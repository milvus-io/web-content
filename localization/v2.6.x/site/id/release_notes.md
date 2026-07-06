---
id: release_notes.md
summary: Catatan Rilis Milvus
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
    </button></h1><p>Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.6.0 in this section. We suggest that you regularly visit this page to learn about updates.</p>
<h2 id="v2619" class="common-anchor-header">v2.6.19<button data-href="#v2619" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: July 1, 2026</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.19</td><td>2.6.16</td><td>2.6.17</td><td>2.6.22</td><td>2.6.19</td></tr>
</tbody>
</table>
<p>We are excited to announce the release of Milvus v2.6.19! This release improves text indexing, JSON handling, GPU runtime compatibility, RBAC metadata, and search result serialization. It also fixes correctness and stability issues across WAL recovery, scalar expressions, nullable fields, ArrayOfVector, group-by search, and DataCoord GC.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Added configurable concurrency for function runner text tokenization (<a href="https://github.com/milvus-io/milvus/pull/50115">#50115</a>)</li>
<li>Improved mix compaction by building text indexes inline to avoid slow QueryNode fallback index creation (<a href="https://github.com/milvus-io/milvus/pull/50160">#50160</a>)</li>
<li>Upgraded GPU Docker images to CUDA 12.9.1 for Ubuntu 22.04 builds and runtime (<a href="https://github.com/milvus-io/milvus/pull/50250">#50250</a>)</li>
<li>Added a configuration option for maximum array capacity (<a href="https://github.com/milvus-io/milvus/pull/50265">#50265</a>)</li>
<li>Improved S3 PutObject compatibility with OpenSSL FIPS mode by forcing CRC32C checksums (<a href="https://github.com/milvus-io/milvus/pull/50360">#50360</a>, <a href="https://github.com/milvus-io/milvus/pull/50477">#50477</a>)</li>
<li>Added RBAC role description support across clients, APIs, and role metadata (<a href="https://github.com/milvus-io/milvus/pull/50526">#50526</a>, <a href="https://github.com/milvus-io/milvus/pull/50535">#50535</a>)</li>
<li>Improved error handling by standardizing on merr with system and input error classification across Milvus (<a href="https://github.com/milvus-io/milvus/pull/50545">#50545</a>)</li>
<li>Optimized null predicate evaluation for sealed chunked fields (<a href="https://github.com/milvus-io/milvus/pull/50586">#50586</a>)</li>
<li>Improved JSON field handling by enabling JSON shredding by default (<a href="https://github.com/milvus-io/milvus/pull/50706">#50706</a>)</li>
<li>Reduced search result serialization overhead by adding an optional zero-copy path for passing search results (<a href="https://github.com/milvus-io/milvus/pull/50713">#50713</a>, <a href="https://github.com/milvus-io/milvus/pull/50756">#50756</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Fixed an issue where RBAC grantee identifiers could collide due to truncated ID hashes (<a href="https://github.com/milvus-io/milvus/pull/50236">#50236</a>)</li>
<li>Fixed an issue where Kafka and RMQ WAL recovery could fail to restore checkpoints with negative sentinel message IDs (<a href="https://github.com/milvus-io/milvus/pull/50242">#50242</a>)</li>
<li>Fixed an issue where scalar-index-backed expression queries could return incorrect results due to cursor misalignment (<a href="https://github.com/milvus-io/milvus/pull/50266">#50266</a>)</li>
<li>Fixed an issue where CPU-adapted GPU CAGRA indexes could still require GPU resources during loading (<a href="https://github.com/milvus-io/milvus/pull/50385">#50385</a>)</li>
<li>Fixed an issue where ST_WITHIN queries on nullable GEOMETRY fields could crash standalone during concurrent schema evolution (<a href="https://github.com/milvus-io/milvus/pull/50437">#50437</a>)</li>
<li>Fixed an issue where AlterCollection could reject requests due to unchanged collection descriptions (<a href="https://github.com/milvus-io/milvus/pull/50502">#50502</a>, <a href="https://github.com/milvus-io/milvus/pull/50539">#50539</a>)</li>
<li>Fixed an issue where describe_user could return empty ghost role names after repeated grant and revoke operations (<a href="https://github.com/milvus-io/milvus/pull/50544">#50544</a>)</li>
<li>Fixed an issue where DataCoord garbage collection could incorrectly delete text stats files that already stored full paths (<a href="https://github.com/milvus-io/milvus/pull/50599">#50599</a>, <a href="https://github.com/milvus-io/milvus/pull/50629">#50629</a>)</li>
<li>Fixed an issue where invalid StructArray vector dimensions or element counts could be accepted (<a href="https://github.com/milvus-io/milvus/pull/50601">#50601</a>)</li>
<li>Fixed an issue where group-by search could return duplicate or mismatched group values when results had tied scores (<a href="https://github.com/milvus-io/milvus/pull/50621">#50621</a>)</li>
<li>Fixed an issue where queries using nullable fields could return incorrect results after expression rewriting (<a href="https://github.com/milvus-io/milvus/pull/50627">#50627</a>)</li>
<li>Fixed an issue where importing ArrayOfVector float64 data from Parquet could fail or parse vector values incorrectly (<a href="https://github.com/milvus-io/milvus/pull/50635">#50635</a>)</li>
<li>Fixed an issue where highlighted search results could become misaligned for nullable or empty string fields (<a href="https://github.com/milvus-io/milvus/pull/50637">#50637</a>)</li>
<li>Fixed an issue where ArrayOfVector EmbList indexes could be built with insufficient rows or vectors (<a href="https://github.com/milvus-io/milvus/pull/50727">#50727</a>, <a href="https://github.com/milvus-io/milvus/pull/50765">#50765</a>)</li>
</ul>
<h2 id="v2618" class="common-anchor-header">v2.6.18<button data-href="#v2618" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: June 5, 2026</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.18</td><td>2.6.15</td><td>2.6.17</td><td>2.6.20</td><td>2.6.18</td></tr>
</tbody>
</table>
<p>We are excited to announce the release of Milvus v2.6.18! This release adds element-level search on Struct fields and nullable vector support, improves QueryNode and QueryCoord scheduling and stability under heavy load, and brings HTTP/2 to the Proxy REST server. It also fixes numerous correctness and stability issues across import, schema evolution, indexing, compaction, and metadata handling.</p>
<h3 id="Features" class="common-anchor-header">Features<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Nullable-vector" class="common-anchor-header">Nullable vector</h4><p>Vector fields can now be declared nullable, so you can insert entities whose embedding is missing or not yet generated without filling in a placeholder. NULL vectors take no extra storage and are skipped automatically during search. For more information, refer to <a href="/docs/id/v2.6.x/nullable-and-default.md">Nullable Fields</a>.</p>
<h4 id="Element-level-search-on-Struct-fields" class="common-anchor-header">Element-level search on Struct fields</h4><p>You can now run vector search on Struct Array fields at the granularity of individual elements instead of the whole row, with each result reporting the matched element’s offset within the array. This lets a query retrieve the specific element that best matches rather than scoring the row as a whole. For more information, refer to <a href="/docs/id/v2.6.x/array-of-structs.md#Vector-search-in-a-StructArray-field">Vector search in a StructArray field</a>.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Added support for importing Arrow FixedSizeList data from Parquet into non-nullable array and dense vector fields (<a href="https://github.com/milvus-io/milvus/pull/49870">#49870</a>)</li>
<li>Improved QueryNode read-task scheduling and recovery behavior under heavy load with deadline-aware admission, cleanup, grouping, and metrics (<a href="https://github.com/milvus-io/milvus/pull/49900">#49900</a>, <a href="https://github.com/milvus-io/milvus/pull/49926">#49926</a>)</li>
<li>Added HTTP/2 support for the proxy REST server, including h2c and ALPN-based TLS listeners (<a href="https://github.com/milvus-io/milvus/pull/49964">#49964</a>)</li>
<li>Extended Arrow IO thread pool configuration to DataNode to improve compaction and import throughput (<a href="https://github.com/milvus-io/milvus/pull/50100">#50100</a>)</li>
<li>Limited QueryNode delegator post-load concurrency to reduce CPU spikes during segment loading (<a href="https://github.com/milvus-io/milvus/pull/49769">#49769</a>)</li>
<li>Optimized QueryCoord collection filtering in ChannelDistManager and reduced temporary allocations in distribution lookups (<a href="https://github.com/milvus-io/milvus/pull/49927">#49927</a>)</li>
<li>Upgraded the Pulsar Go client to v0.19.0 and replaced pulsarctl admin usage with pulsaradmin (<a href="https://github.com/milvus-io/milvus/pull/49948">#49948</a>)</li>
<li>Optimized ReplicaManager locking to reduce cross-collection contention in QueryCoord (<a href="https://github.com/milvus-io/milvus/pull/49950">#49950</a>, <a href="https://github.com/milvus-io/milvus/pull/49956">#49956</a>)</li>
<li>Improved REST timeout handling to safely discard late handler writes after request timeouts (<a href="https://github.com/milvus-io/milvus/pull/50006">#50006</a>)</li>
<li>Optimized garbage collection for dropped segment index files and metadata (<a href="https://github.com/milvus-io/milvus/pull/50172">#50172</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Fixed an issue where using unsupported field types as clustering keys could cause node panics (<a href="https://github.com/milvus-io/milvus/pull/48263">#48263</a>)</li>
<li>Fixed an issue where the stored_index_files_size metric included inactive index files (<a href="https://github.com/milvus-io/milvus/pull/49380">#49380</a>)</li>
<li>Fixed an issue where preempted writers could skip segment IDs by upgrading Woodpecker to v0.1.13-hotfix (<a href="https://github.com/milvus-io/milvus/pull/49670">#49670</a>)</li>
<li>Fixed an issue where requery requests were not pinned to the preferred replica (<a href="https://github.com/milvus-io/milvus/pull/49830">#49830</a>)</li>
<li>Fixed an issue where bulk imports could fail when file readers encountered a premature EOF (<a href="https://github.com/milvus-io/milvus/pull/49867">#49867</a>)</li>
<li>Fixed an issue where partial updates could drop dynamic field data after schema evolution (<a href="https://github.com/milvus-io/milvus/pull/49913">#49913</a>)</li>
<li>Fixed an issue where sealed segments could load incorrectly when non-nullable vector field data was missing (<a href="https://github.com/milvus-io/milvus/pull/49918">#49918</a>)</li>
<li>Fixed an issue where schema reopen could leave stale indexing references and cause indexing failures or crashes (<a href="https://github.com/milvus-io/milvus/pull/49935">#49935</a>, <a href="https://github.com/milvus-io/milvus/pull/49937">#49937</a>)</li>
<li>Fixed an issue where dropping a collection in streaming mode could follow an incorrect cleanup order (<a href="https://github.com/milvus-io/milvus/pull/49962">#49962</a>)</li>
<li>Fixed an issue where BM25 sparse vector function outputs were incorrectly treated as loadable raw field data (<a href="https://github.com/milvus-io/milvus/pull/49975">#49975</a>)</li>
<li>Fixed an issue where QueryCoord could build query targets from dropped channel checkpoints (<a href="https://github.com/milvus-io/milvus/pull/50026">#50026</a>)</li>
<li>Fixed an issue where transient object storage failures could cause delta log writes in sync tasks to fail without retrying (<a href="https://github.com/milvus-io/milvus/pull/50030">#50030</a>)</li>
<li>Fixed an issue where retried import tasks could leave stale row counts and cause sort compaction failures (<a href="https://github.com/milvus-io/milvus/pull/50070">#50070</a>)</li>
<li>Fixed an issue where forced segment assignment could be incorrectly limited by the balance batch size (<a href="https://github.com/milvus-io/milvus/pull/50152">#50152</a>)</li>
<li>Fixed an issue where target-size manual compaction could select ineligible segments (<a href="https://github.com/milvus-io/milvus/pull/50159">#50159</a>)</li>
<li>Fixed an issue where replicated AlterLoadConfig operations could keep retrying after a channel was dropped and block metadata cleanup (<a href="https://github.com/milvus-io/milvus/pull/50162">#50162</a>)</li>
<li>Fixed an issue where sliced indexes could load incorrect sidecar files and affect indexed query behavior (<a href="https://github.com/milvus-io/milvus/pull/50167">#50167</a>)</li>
<li>Fixed an issue where ST_DWITHIN could panic when validating non-POINT WKT input (<a href="https://github.com/milvus-io/milvus/pull/50205">#50205</a>)</li>
</ul>
<h2 id="v2617" class="common-anchor-header">v2.6.17<button data-href="#v2617" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: May 22, 2026</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.17</td><td>2.6.14</td><td>2.6.14</td><td>2.6.20</td><td>2.6.4</td></tr>
</tbody>
</table>
<p>We are excited to announce the release of Milvus v2.6.17! This release introduces Array field partial update operators, improves load/search isolation, and resolves several stability and query routing issues.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Added <a href="/docs/id/v2.6.x/upsert-entities.md#Upsert-ARRAY-fields-with-partial-update-operators"><code translate="no">ARRAY_APPEND</code> and <code translate="no">ARRAY_REMOVE</code> partial update operators</a> for Array fields, exposed through both gRPC and REST upsert APIs (<a href="https://github.com/milvus-io/milvus/pull/49328">#49328</a>, <a href="https://github.com/milvus-io/milvus/pull/49724">#49724</a>)</li>
<li>Improved load/search isolation by using separate C++ executor pools and converting SegmentLoad and ReopenSegment to async futures with proper context cancellation (<a href="https://github.com/milvus-io/milvus/pull/49764">#49764</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Fixed an issue where filter expression templates could not be used with string field predicates (<a href="https://github.com/milvus-io/milvus/pull/49703">#49703</a>)</li>
<li>Fixed an issue where stale segment distribution updates after delegator close could corrupt query routing (<a href="https://github.com/milvus-io/milvus/pull/49727">#49727</a>)</li>
<li>Fixed an issue where releasing a collection could leave stale replica state due to premature metadata cleanup in QueryCoord (<a href="https://github.com/milvus-io/milvus/pull/49730">#49730</a>)</li>
<li>Fixed an issue where transient shard errors caused replicas to be blacklisted, leading to unnecessary query failures and degraded availability (<a href="https://github.com/milvus-io/milvus/pull/49740">#49740</a>, <a href="https://github.com/milvus-io/milvus/pull/49776">#49776</a>)</li>
<li>Fixed missing GetReplicateConfiguration RPC forwarding in the proxy service (<a href="https://github.com/milvus-io/milvus/pull/49810">#49810</a>)</li>
<li>Fixed a potential use-after-free crash when closing the packed writer multiple times or during compaction cleanup paths (<a href="https://github.com/milvus-io/milvus/pull/49816">#49816</a>)</li>
</ul>
<h2 id="v2616" class="common-anchor-header">v2.6.16<button data-href="#v2616" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: May 14, 2026</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.16</td><td>2.6.13</td><td>2.6.14</td><td>2.6.19</td><td>2.6.4</td></tr>
</tbody>
</table>
<p>We are excited to announce the release of Milvus v2.6.16! This release delivers major stability and performance improvements across L0 compaction, streaming node resource isolation, and proxy query failover, along with critical fixes for delete consistency, replica scaling, and rolling upgrade scenarios.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Increased the default L0 compaction deltalog max count from 30 to 1000 to reduce compaction backlog under high-delete workloads (<a href="https://github.com/milvus-io/milvus/pull/47214">#47214</a>, <a href="https://github.com/milvus-io/milvus/pull/49122">#49122</a>)</li>
<li>Introduced streaming node resource group isolation, allowing replicas to be assigned strictly within their configured resource groups, plus a new RESTful config inspection endpoint (<a href="https://github.com/milvus-io/milvus/pull/48632">#48632</a>)</li>
<li>Rewrote sync manager’s key lock dispatcher with per-key FIFO queues and semaphore backpressure for non-blocking submission and graceful shutdown (<a href="https://github.com/milvus-io/milvus/pull/49101">#49101</a>)</li>
<li>Added fast-fail retry capping and delegator stall detection so proxy queries failover to a healthy QueryNode immediately instead of burning the full backoff budget on a dead node (<a href="https://github.com/milvus-io/milvus/pull/49103">#49103</a>)</li>
<li>Allowed simultaneous pchannel increase and cluster/topology changes in replication config validation (<a href="https://github.com/milvus-io/milvus/pull/49214">#49214</a>)</li>
<li>Reduced proxy tail latency and memory pressure during traffic storms by fast-failing Enqueue before TSO/ID allocation and using a non-blocking edge-triggered task notifier (<a href="https://github.com/milvus-io/milvus/pull/49259">#49259</a>)</li>
<li>Added a <code translate="no">$partial_update</code> field to the proxy access log for Upsert requests, exposing both explicit and implicitly promoted partial-update flags (<a href="https://github.com/milvus-io/milvus/pull/49361">#49361</a>)</li>
<li>Accelerated <code translate="no">TermExpr IN</code> evaluation with a SIMD (AVX2/AVX512) batch filter, significantly improving query performance for <code translate="no">IN</code> predicates (<a href="https://github.com/milvus-io/milvus/pull/49427">#49427</a>)</li>
<li>Bumped Go SDK to v2.6.4 with full struct-array support (vector sub-fields, EmbeddingList search, schema validation), gRPC authority configuration, and preserved default gRPC dial options when custom DialOptions are provided (<a href="https://github.com/milvus-io/milvus/pull/49443">#49443</a>)</li>
<li>Upgraded lz4_flex to 0.11.6 in the Tantivy binding to remediate CVE-2026-32829 (<a href="https://github.com/milvus-io/milvus/pull/49507">#49507</a>)</li>
<li>Bypassed Knowhere search-pool scheduling for vector iterators to reduce per-Next overhead in iterator-heavy group-by search paths (<a href="https://github.com/milvus-io/milvus/pull/49547">#49547</a>)</li>
<li>Added a cuVS-backed GPU path for building DiskANN indexes in Knowhere (<a href="https://github.com/zilliztech/knowhere/pull/1617">#1617</a>)</li>
<li>Exposed Arrow IO thread pool capacity as a refreshable paramtable knob to relieve HIGH-pool stalls under heavy storage v2 read load (<a href="https://github.com/milvus-io/milvus/pull/49554">#49554</a>, <a href="https://github.com/milvus-io/milvus/pull/49561">#49561</a>)</li>
<li>Parallelized text match index loading on QueryNode to speed up segment load for collections with text indexes (<a href="https://github.com/milvus-io/milvus/pull/49608">#49608</a>)</li>
<li>Bumped milvus-storage to fix non-contiguous I/O issues when reading row groups (<a href="https://github.com/milvus-io/milvus/pull/49613">#49613</a>)</li>
<li>Sealed growing segments under L0 compaction pressure to avoid prolonged write blocking (<a href="https://github.com/milvus-io/milvus/pull/49688">#49688</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Fixed silent delete loss caused by L0 compaction missing target segments due to inherited incorrect positions from imported data, and corrected DmlPosition aggregation in mix/clustering compaction (<a href="https://github.com/milvus-io/milvus/pull/47154">#47154</a>, <a href="https://github.com/milvus-io/milvus/pull/47187">#47187</a>, <a href="https://github.com/milvus-io/milvus/pull/48910">#48910</a>)</li>
<li>Fixed an issue where collections with inverted indexes failed to load due to incorrect handling of sliced index files (<a href="https://github.com/milvus-io/milvus/pull/48542">#48542</a>)</li>
<li>Fixed an issue where queries on nullable array fields with bitmap indexes could return incorrect results due to missing null value persistence (<a href="https://github.com/milvus-io/milvus/pull/49073">#49073</a>)</li>
<li>Fixed an issue where queries using NOT over templated expressions (e.g. <code translate="no">not (field in {vals})</code>) returned wrong results or triggered QueryNode assertion failures (<a href="https://github.com/milvus-io/milvus/pull/49184">#49184</a>)</li>
<li>Made config writes synchronously visible in the same process and ensured QueryCoord compliance reports Ready only after leaked segments/channels are released, preventing premature node termination during scale-down (<a href="https://github.com/milvus-io/milvus/pull/49212">#49212</a>)</li>
<li>Fixed an issue where L0 deltas could be incorrectly skipped, causing stale or incorrect query results (<a href="https://github.com/milvus-io/milvus/pull/49228">#49228</a>)</li>
<li>Fixed an internal error when using IS NULL / IS NOT NULL with ARRAY element access; the expression is now rejected at parse time with a clear validation error (<a href="https://github.com/milvus-io/milvus/pull/49244">#49244</a>)</li>
<li>Fixed built-in RBAC privilege groups drifting from defaults by no longer shipping them in milvus.yaml; runtime now falls through to in-code constants when not explicitly overridden (<a href="https://github.com/milvus-io/milvus/pull/49276">#49276</a>)</li>
<li>Fixed a collection-wide query outage triggered by replica-count changes; QueryCoord now honors withUnserviceableShards so the proxy can route through serviceable leaders while the new replica is loading (<a href="https://github.com/milvus-io/milvus/pull/49305">#49305</a>, <a href="https://github.com/milvus-io/milvus/pull/49311">#49311</a>)</li>
<li>Fixed insert starvation that could occur when sync futures were blocked during write buffer eviction (<a href="https://github.com/milvus-io/milvus/pull/49331">#49331</a>)</li>
<li>Fixed an issue where schema fields like EnableNamespace were silently dropped during DDL broadcasts from rootcoord, causing downstream components to see zero values after any DDL operation (<a href="https://github.com/milvus-io/milvus/pull/49364">#49364</a>)</li>
<li>Improved L0 compaction to fast-finish when no matching L1/L2 segments are found (<a href="https://github.com/milvus-io/milvus/pull/49376">#49376</a>)</li>
<li>Fixed expression rewriter to honor the disabled expression optimization config (<a href="https://github.com/milvus-io/milvus/pull/49430">#49430</a>)</li>
<li>Fixed an issue where segment reopen tasks could stall in QueryCoord by routing them through the existing load segment dispatch path (<a href="https://github.com/milvus-io/milvus/pull/49466">#49466</a>)</li>
<li>Fixed an issue where collection alias lookups missed the proxy meta cache, causing unnecessary metadata fetches (<a href="https://github.com/milvus-io/milvus/pull/49513">#49513</a>, <a href="https://github.com/milvus-io/milvus/pull/49548">#49548</a>)</li>
<li>Fixed streaming node resource group handling during rolling upgrades so replicas remain correctly assigned when old and new nodes coexist (<a href="https://github.com/milvus-io/milvus/pull/49552">#49552</a>)</li>
<li>Fixed a memory leak that occurred when search requests failed validation after placeholder parsing succeeded (<a href="https://github.com/milvus-io/milvus/pull/49612">#49612</a>)</li>
<li>Fixed an issue where node shutdown could hang indefinitely when WAL release was blocked (<a href="https://github.com/milvus-io/milvus/pull/49625">#49625</a>)</li>
<li>Fixed query visibility issues during rolling upgrades for streaming resource groups (<a href="https://github.com/milvus-io/milvus/pull/49629">#49629</a>)</li>
<li>Improved WAL recovery to fail fast on timetick append errors instead of hanging (<a href="https://github.com/milvus-io/milvus/pull/49636">#49636</a>)</li>
<li>Fixed JSON stats index build failure when binlogs were missing (<a href="https://github.com/milvus-io/milvus/pull/49673">#49673</a>)</li>
<li>Fixed vector index version resolution during rolling upgrades when QueryNodes did not report MaximumIndexVersion (<a href="https://github.com/milvus-io/milvus/pull/49675">#49675</a>)</li>
</ul>
<h2 id="v2615" class="common-anchor-header">v2.6.15<button data-href="#v2615" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: April 24, 2026</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.15</td><td>2.6.12</td><td>2.6.13</td><td>2.6.18</td><td>2.6.1</td></tr>
</tbody>
</table>
<p>We are excited to announce the release of Milvus v2.6.15! This release delivers meaningful performance and observability improvements across search, query, and storage paths, along with critical fixes for index correctness, RBAC backup/restore, and cross-version upgrade compatibility.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Removed the unused SuffixSnapshot time-travel layer from RootCoord metadata storage, simplifying the catalog and eliminating orphaned snapshot keys (<a href="https://github.com/milvus-io/milvus/pull/48638">#48638</a>)</li>
<li>Improved latency metrics precision by switching from milliseconds to microseconds, preserving sub-millisecond resolution for insert, delete, query, search, and upsert paths (<a href="https://github.com/milvus-io/milvus/pull/48653">#48653</a>)</li>
<li>Separated metrics for internal upsert/delete requery operations from user-initiated queries, enabling more accurate monitoring of user-facing query performance (<a href="https://github.com/milvus-io/milvus/pull/48708">#48708</a>)</li>
<li>Upgraded go-jose/v4 to v4.1.4 and gnupg in GPU image to fix CVE-2026-34986 and CVE-2025-68973 (<a href="https://github.com/milvus-io/milvus/pull/48806">#48806</a>)</li>
<li>Reduced remote IO syscalls during BM25 IDF preload by buffering the storage reader in streamOneFile (<a href="https://github.com/milvus-io/milvus/pull/48845">#48845</a>, <a href="https://github.com/milvus-io/milvus/pull/48846">#48846</a>)</li>
<li>Added a querycoord configuration to force-override segment load task priority (<a href="https://github.com/milvus-io/milvus/pull/48861">#48861</a>)</li>
<li>Reduced unnecessary FillEntryData calls during search result refresh to lower reduce-stage overhead (<a href="https://github.com/milvus-io/milvus/pull/49017">#49017</a>)</li>
<li>Added common.searchRequeryPolicy parameter to control the requery stage in regular search (<a href="https://github.com/milvus-io/milvus/pull/49022">#49022</a>)</li>
<li>Added delegator-side segment pruning via PK predicate hints and removed expensive proto String() calls in PK filter building (<a href="https://github.com/milvus-io/milvus/pull/49040">#49040</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Fixed binlog import reliability by adding denylist-based retry to WalkWithPrefix, improving resilience against transient object storage failures (<a href="https://github.com/milvus-io/milvus/pull/48673">#48673</a>)</li>
<li>Fixed a severe LIKE prefix-match performance regression on Marisa trie string indexes, which had been falling back to O(n) brute-force scan instead of using efficient predictive search (<a href="https://github.com/milvus-io/milvus/pull/48688">#48688</a>)</li>
<li>Fixed duplicate invocation and missing retry in streaming coordinator’s force promote broadcast fix path, ensuring reliable recovery of incomplete broadcasts (<a href="https://github.com/milvus-io/milvus/pull/48712">#48712</a>)</li>
<li>Fixed a race in QueryCoord task scheduling that could cancel in-flight LoadSegments RPCs with a misleading context-canceled error when the QueryNode reported the segment via heartbeat before the RPC returned (<a href="https://github.com/milvus-io/milvus/pull/48723">#48723</a>)</li>
<li>Fixed an issue where mistyped query_mode property keys and values (e.g. LARGE_TOPK, QUERY_MODE) were silently accepted instead of returning a clear error (<a href="https://github.com/milvus-io/milvus/pull/48826">#48826</a>)</li>
<li>Fixed offset corruption between Milvus and Knowhere that could cause incorrect query results on disk indexes (<a href="https://github.com/milvus-io/milvus/pull/48837">#48837</a>)</li>
<li>Fixed potential crashes when cancelling background segment loads, and corrected tieredStorage.loadingTimeoutMs default that caused tiered storage loads to fail immediately (<a href="https://github.com/milvus-io/milvus/pull/48880">#48880</a>)</li>
<li>Fixed insert/upsert failures on collections created in 2.5 with dynamic field enabled after upgrading to 2.6 (<a href="https://github.com/milvus-io/milvus/pull/48977">#48977</a>)</li>
<li>Fixed wildcard privileges being lost or rejected during RBAC backup and restore (<a href="https://github.com/milvus-io/milvus/pull/49010">#49010</a>)</li>
<li>Fixed inaccurate field data size estimation for ArrayOfVector fields during index building (<a href="https://github.com/milvus-io/milvus/pull/49018">#49018</a>)</li>
</ul>
<h2 id="v2614" class="common-anchor-header">v2.6.14<button data-href="#v2614" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: April 7, 2026</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.14</td><td>2.6.11</td><td>2.6.13</td><td>2.6.17</td><td>2.6.1</td></tr>
</tbody>
</table>
<p>We are excited to announce the release of Milvus v2.6.14! This release focuses on stability and performance, delivering faster MixCoord recovery, optimized search and query filter performance, and over 20 bug fixes addressing crashes, OOM issues, and data correctness problems.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Reduced MixCoord recovery time by parallelizing startup phases including sub-meta loading, index reload, and batch etcd operations (<a href="https://github.com/milvus-io/milvus/pull/47849">47849</a>)</li>
<li>Replaced proto.Clone with shallow copy for query request fanout to reduce memory allocations and improve query performance (<a href="https://github.com/milvus-io/milvus/pull/48083">48083</a>)</li>
<li>Upgraded Go to 1.25.8 to address CVE-2025-68121 (CRITICAL), CVE-2026-27142 (HIGH), and CVE-2026-25679 (HIGH) (<a href="https://github.com/milvus-io/milvus/pull/48287">48287</a>)</li>
<li>Switched import retry strategy from allowlist to denylist, improving resilience against transient errors during data import (<a href="https://github.com/milvus-io/milvus/pull/48319">48319</a>)</li>
<li>Made thread pool max threads size configurable via <code translate="no">common.threadCoreCoefficient.maxThreadsSize</code> with dynamic update support (<a href="https://github.com/milvus-io/milvus/pull/48385">48385</a>)</li>
<li>Refactored import workflow to align with DDL/DCL pattern by routing through DataCoord RPC instead of cross-service broadcast (<a href="https://github.com/milvus-io/milvus/pull/48438">48438</a>)</li>
<li>Added force promote support for primary-secondary disaster recovery failover via <code translate="no">UpdateReplicateConfiguration</code> API (<a href="https://github.com/milvus-io/milvus/pull/48452">48452</a>)</li>
<li>Added data salvage capability for force failover to recover unpersisted data from failed streaming nodes (<a href="https://github.com/milvus-io/milvus/pull/48527">48527</a>)</li>
<li>Improved query filter performance with type-aware bidirectional rewriting between <code translate="no">in</code> and <code translate="no">==</code> expressions (<a href="https://github.com/milvus-io/milvus/pull/48545">48545</a>)</li>
<li>Optimized bool IN/NOT IN expressions with proper nullable field handling (<a href="https://github.com/milvus-io/milvus/pull/48621">48621</a>)</li>
<li>Aligned error mapping across all cloud storage providers (Azure, GCP, MinIO) for consistent retry and error handling behavior (<a href="https://github.com/milvus-io/milvus/pull/48693">48693</a>)</li>
<li>Optimized unfiltered search on sealed segments with MVCC fast path, hardware popcnt, and redundant bitset operation elimination (<a href="https://github.com/milvus-io/milvus/pull/48699">48699</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Fixed an issue where the task scheduler could only assign one task per node per scheduling cycle, potentially slowing down index building and compaction (<a href="https://github.com/milvus-io/milvus/pull/48262">48262</a>)</li>
<li>Fixed potential server crash during JSON index cleanup caused by a race condition between background threads and file deletion (<a href="https://github.com/milvus-io/milvus/pull/48369">48369</a>, <a href="https://github.com/milvus-io/milvus/pull/48409">48409</a>)</li>
<li>Fixed server panic caused by concurrent map access in HTTP proxy when processing requests with timeout middleware enabled (<a href="https://github.com/milvus-io/milvus/pull/48394">48394</a>)</li>
<li>Fixed OOM on QueryNodes when loading large segments with variable-size fields (ARRAY, JSON, large VARCHAR) by switching to memory-aware batch splitting (<a href="https://github.com/milvus-io/milvus/pull/48404">48404</a>, <a href="https://github.com/milvus-io/milvus/pull/48435">48435</a>)</li>
<li>Fixed incorrect version string reported by Milvus when both root and Go submodule git tags exist on the same commit (<a href="https://github.com/milvus-io/milvus/pull/48421">48421</a>)</li>
<li>Fixed an issue where transient storage errors during data flush and binlog import were not retried, causing unnecessary operation failures (<a href="https://github.com/milvus-io/milvus/pull/48436">48436</a>)</li>
<li>Fixed a crash when using unsupported field types (JSON, Bool, Array, etc.) as clustering keys via the AddCollectionField API (<a href="https://github.com/milvus-io/milvus/pull/48437">48437</a>)</li>
<li>Fixed potential crashes during index building when encountering IO errors in the Tantivy text index engine (<a href="https://github.com/milvus-io/milvus/pull/48454">48454</a>)</li>
<li>Fixed an issue where QueryNodes failed to load indexes during rolling upgrades due to target vector index version exceeding the node’s supported maximum (<a href="https://github.com/milvus-io/milvus/pull/48478">48478</a>)</li>
<li>Fixed a potential crash caused by dangling pointers in index loading during async warmup or cache re-population (<a href="https://github.com/milvus-io/milvus/pull/48496">48496</a>)</li>
<li>Fixed streaming node listing to correctly include frozen nodes in REST API while excluding them from scheduling decisions (<a href="https://github.com/milvus-io/milvus/pull/48514">48514</a>)</li>
<li>Fixed an issue where data import failed or produced incorrect results when collections contained function output fields (<a href="https://github.com/milvus-io/milvus/pull/48516">48516</a>)</li>
<li>Fixed loading failure for segments with default-valued GEOMETRY fields (<a href="https://github.com/milvus-io/milvus/pull/48556">48556</a>, <a href="https://github.com/milvus-io/milvus/pull/48575">48575</a>)</li>
<li>Fixed an issue where all segments appeared unindexed after dropping and recreating indexes, causing stale pre-compaction segments to be loaded (<a href="https://github.com/milvus-io/milvus/pull/48559">48559</a>)</li>
<li>Fixed streaming balancer hanging indefinitely due to stale session entries persisting after etcd watch reconnection (<a href="https://github.com/milvus-io/milvus/pull/48568">48568</a>)</li>
<li>Fixed compaction unexpectedly producing v2 format segments when compaction parameters were missing from the request (<a href="https://github.com/milvus-io/milvus/pull/48571">48571</a>, <a href="https://github.com/milvus-io/milvus/pull/48596">48596</a>)</li>
<li>Fixed GROUP BY queries returning more results than the specified <code translate="no">group_size</code> when used with nullable fields (<a href="https://github.com/milvus-io/milvus/pull/48585">48585</a>)</li>
<li>Fixed an issue where range queries on INVERTED indexes returned incorrect results when values involved negative zero (-0.0) (<a href="https://github.com/milvus-io/milvus/pull/48625">48625</a>)</li>
<li>Fixed potential heap corruption caused by dual jemalloc instances from Arrow’s built-in allocator conflicting with the system allocator (<a href="https://github.com/milvus-io/milvus/pull/48657">48657</a>)</li>
<li>Fixed an issue where LoadBalance could produce misleading errors when streaming node IDs collided with the specified query node IDs (<a href="https://github.com/milvus-io/milvus/pull/48664">48664</a>, <a href="https://github.com/milvus-io/milvus/pull/48679">48679</a>)</li>
<li>Fixed an issue where search could still fail due to unavailable segments when <code translate="no">partialResultRequiredDataRatio</code> was set to 0.0 (<a href="https://github.com/milvus-io/milvus/pull/48702">48702</a>)</li>
</ul>
<h2 id="v2613" class="common-anchor-header">v2.6.13<button data-href="#v2613" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: March 23, 2026</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.13</td><td>2.6.10</td><td>2.6.11</td><td>2.6.16</td><td>2.6.1</td></tr>
</tbody>
</table>
<h3 id="Features" class="common-anchor-header">Features<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Gemini-embedding-model-support-48223httpsgithubcommilvus-iomilvuspull48223" class="common-anchor-header">Gemini embedding model support (<a href="https://github.com/milvus-io/milvus/pull/48223">#48223</a>)</h4><p>Added Google Gemini as a built-in text embedding function. Users can now use Gemini embedding models directly in Milvus by configuring a Gemini API key, including the recently released <a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-embedding-2/">Gemini Embedding 2</a>.</p>
<p>For detailed usage, refer to <a href="/docs/id/v2.6.x/google-gemini.md">Google Gemini</a>.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Unified KV path/key conventions across etcd, tikv, and catalog layers with consistent path joining (<a href="https://github.com/milvus-io/milvus/pull/48133">#48133</a>)</li>
<li>Added query metrics for JSON-related filter expressions to improve observability of JSON field query performance (<a href="https://github.com/milvus-io/milvus/pull/48147">#48147</a>)</li>
<li>Reduced transient memory allocations in BM25Stats deserialization by eliminating temporary slices (<a href="https://github.com/milvus-io/milvus/pull/48178">#48178</a>)</li>
<li>Added TruncateCollection method to the Go SDK client for clearing all data in a collection without dropping it (<a href="https://github.com/milvus-io/milvus/pull/48361">#48361</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Fixed an issue where search/query requests with strong consistency timed out during compaction due to tsafe advancement being blocked (<a href="https://github.com/milvus-io/milvus/pull/47987">#47987</a>)</li>
<li>Fixed an issue where partial upsert with dynamic fields failed with <code translate="no">the length of valid_data of field($meta) is wrong</code> when the batch contained both existing and new rows (<a href="https://github.com/milvus-io/milvus/pull/48085">#48085</a>)</li>
<li>Fixed TLS connection failures during internal proxy-to-proxy request forwarding (<a href="https://github.com/milvus-io/milvus/pull/48226">#48226</a>)</li>
<li>Fixed query failures when using IN combined with != filter expressions that form tautologies (<a href="https://github.com/milvus-io/milvus/pull/48261">#48261</a>)</li>
<li>Fixed high system load caused by mass concurrent client disconnections during HTTP request handling (<a href="https://github.com/milvus-io/milvus/pull/48270">#48270</a>)</li>
<li>Fixed an issue where queries could become unavailable during replica scale-up/down due to non-deterministic node-to-replica assignment (<a href="https://github.com/milvus-io/milvus/pull/48277">#48277</a>)</li>
<li>Fixed HTTP proxy crashes caused by concurrent write race condition in timeout middleware (<a href="https://github.com/milvus-io/milvus/pull/48296">#48296</a>, <a href="https://github.com/milvus-io/milvus/pull/48317">#48317</a>, <a href="https://github.com/milvus-io/milvus/pull/48356">#48356</a>)</li>
<li>Fixed potential query node crash caused by assertion failure in delete record snapshot handling (<a href="https://github.com/milvus-io/milvus/pull/48302">#48302</a>)</li>
<li>Fixed storage operation failures when using AK/SK authentication on Aliyun OSS (<a href="https://github.com/milvus-io/milvus/pull/48311">#48311</a>)</li>
<li>Fixed degraded search performance caused by permanent parameter cache failure leading to goroutine contention on proxy hot paths (<a href="https://github.com/milvus-io/milvus/pull/48313">#48313</a>, <a href="https://github.com/milvus-io/milvus/pull/48326">#48326</a>)</li>
<li>Fixed QueryCoord deadlock during upgrades when hundreds of channels needed rebalancing by splitting the executor into separate channel and non-channel task pools (<a href="https://github.com/milvus-io/milvus/pull/48351">#48351</a>)</li>
<li>Fixed an issue where search requests could timeout for 14+ minutes after WAL ownership changes due to unbounded message replay during scanner catchup (<a href="https://github.com/milvus-io/milvus/pull/48391">#48391</a>)</li>
</ul>
<h2 id="v2612" class="common-anchor-header">v2.6.12<button data-href="#v2612" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: March 17, 2026</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.12</td><td>2.6.10</td><td>2.6.11</td><td>2.6.15</td><td>2.6.1</td></tr>
</tbody>
</table>
<p>We are pleased to announce the release of Milvus v2.6.12! This release introduces replication topology inspection and configurable TLS minimum version for object storage. It also delivers significant memory optimizations in segment loading and compaction, along with numerous bug fixes addressing memory leaks, RBAC alias resolution, collection-level rate limiting, and streaming node stability.</p>
<h3 id="Features" class="common-anchor-header">Features<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Added <code translate="no">GetReplicateConfiguration</code> API for viewing replication topology with redacted tokens (<a href="https://github.com/milvus-io/milvus/pull/47543">#47543</a>)</li>
<li>Added configurable TLS minimum version (<code translate="no">minio.ssl.tlsMinVersion</code>) for object storage connections across all supported backends (<a href="https://github.com/milvus-io/milvus/pull/48000">#48000</a>, <a href="https://github.com/milvus-io/milvus/pull/48030">#48030</a>)</li>
<li>Supported configuring different replica numbers on secondary CDC cluster independently from the primary (<a href="https://github.com/milvus-io/milvus/pull/47914">#47914</a>)</li>
<li>Allowed pchannel count increase in CDC ReplicateConfiguration to support heterogeneous cluster topologies (<a href="https://github.com/milvus-io/milvus/pull/47917">#47917</a>)</li>
<li>Added automatic warmup for large tenant collections to reduce cold-start query latency (<a href="https://github.com/milvus-io/milvus/pull/47631">#47631</a>)</li>
<li>Added user-specified warmup support for RESTful API (<a href="https://github.com/milvus-io/milvus/pull/47825">#47825</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Added caching layer resource management for streaming node with automatic memory/disk accounting during segment operations (<a href="https://github.com/milvus-io/milvus/pull/47165">#47165</a>)</li>
<li>Optimized query node segment load speed (<a href="https://github.com/milvus-io/milvus/pull/47424">#47424</a>)</li>
<li>Optimized MixCoord CPU usage to reduce coordinator overhead (<a href="https://github.com/milvus-io/milvus/pull/47619">#47619</a>)</li>
<li>Added phase-level timing logs and metrics for sort compaction (<a href="https://github.com/milvus-io/milvus/pull/47674">#47674</a>)</li>
<li>Refactored cluster-level broadcast mechanism to decouple message package from channel registration lifecycle (<a href="https://github.com/milvus-io/milvus/pull/47807">#47807</a>)</li>
<li>Added configurable skip list for replicate message types in CDC (<a href="https://github.com/milvus-io/milvus/pull/47910">#47910</a>)</li>
<li>Included text index memory cost in segment loading memory estimation (<a href="https://github.com/milvus-io/milvus/pull/47963">#47963</a>)</li>
<li>Added per-cluster TLS configuration support for CDC outbound mTLS connections (<a href="https://github.com/milvus-io/milvus/pull/48023">#48023</a>)</li>
<li>Bypassed broadcaster for resource group DDL operations on non-primary clusters in streaming replication (<a href="https://github.com/milvus-io/milvus/pull/48034">#48034</a>)</li>
<li>Bumped OpenTelemetry to v1.40.0 to address CWE-426 untrusted search path vulnerability (<a href="https://github.com/milvus-io/milvus/pull/48059">#48059</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Fixed an issue where collection-level rate limits were not delivered to proxies when set via collection properties (<a href="https://github.com/milvus-io/milvus/pull/46714">#46714</a>, <a href="https://github.com/milvus-io/milvus/pull/48018">#48018</a>)</li>
<li>Fixed memory accumulation during segment loading by switching to streaming cell-based loading (<a href="https://github.com/milvus-io/milvus/pull/47859">#47859</a>)</li>
<li>Fixed streaming node crash-loop during WAL replay for dropped collections (<a href="https://github.com/milvus-io/milvus/pull/47887">#47887</a>)</li>
<li>Fixed memory accumulation in compaction by streaming row groups one at a time (<a href="https://github.com/milvus-io/milvus/pull/47904">#47904</a>)</li>
<li>Fixed memory leak in broadcaster caused by uncanceled context (<a href="https://github.com/milvus-io/milvus/pull/47912">#47912</a>)</li>
<li>Fixed an issue where CreateCollection could cause schema loss on crash (<a href="https://github.com/milvus-io/milvus/pull/47972">#47972</a>)</li>
<li>Fixed crash when inserting non-nullable fields with default values (<a href="https://github.com/milvus-io/milvus/pull/48016">#48016</a>)</li>
<li>Fixed deadlock when loading V1 segments with more than 16 system field binlog files (<a href="https://github.com/milvus-io/milvus/pull/48037">#48037</a>)</li>
<li>Fixed partial update failure when dynamic field is enabled but upsert data contains only static fields (<a href="https://github.com/milvus-io/milvus/pull/48044">#48044</a>)</li>
<li>Fixed RBAC permission checks to resolve collection aliases and added automatic grant cleanup on collection drop/rename (<a href="https://github.com/milvus-io/milvus/pull/48052">#48052</a>, <a href="https://github.com/milvus-io/milvus/pull/48151">#48151</a>)</li>
<li>Fixed BulkInsert failure by removing interactive coordination between import and L0 compaction (<a href="https://github.com/milvus-io/milvus/pull/48114">#48114</a>)</li>
<li>Fixed Azure buffered output stream issue (<a href="https://github.com/milvus-io/milvus/pull/48041">#48041</a>)</li>
</ul>
<h2 id="v2611" class="common-anchor-header">v2.6.11<button data-href="#v2611" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: February 12, 2026</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.11</td><td>2.6.9</td><td>2.6.9</td><td>2.6.13</td><td>2.6.1</td></tr>
</tbody>
</table>
<p>We are pleased to announce the release of Milvus 2.6.11! This update continues to enhance query performance and system stability with improvements to filtering execution, segment loading, and Storage V2 I/O pipelining. It also refines geo indexing, reduces memory usage in default-value chunks, and improves developer and build tooling through dependency and test-suite cleanups. This release further fixes several correctness issues across control-channel handling, index building, nullable-expression semantics, and WAL recovery workflows. We recommend all users on the 2.6 branch upgrade to this version for improved reliability and performance.</p>
<h3 id="Features" class="common-anchor-header">Features<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Added a truncate API to remove collection data more efficiently (<a href="https://github.com/milvus-io/milvus/pull/47308">#47308</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Used <code translate="no">PreparedGeometry</code> to improve geo index refinement performance (<a href="https://github.com/milvus-io/milvus/pull/47389">#47389</a>)</li>
<li>Switched the OpenSSL dependency to shared linking (<a href="https://github.com/milvus-io/milvus/pull/47664">#47664</a>)</li>
<li>Differentiated load priorities by scenario to improve scheduling behavior (<a href="https://github.com/milvus-io/milvus/pull/47594">#47594</a>)</li>
<li>Upgraded Go to 1.24.12 and updated <code translate="no">gpgv</code> to address CVEs (<a href="https://github.com/milvus-io/milvus/pull/47562">#47562</a>)</li>
<li>Reduced memory usage by enabling multi-cell <code translate="no">DefaultValueChunk</code> layout (<a href="https://github.com/milvus-io/milvus/pull/47166">#47166</a>)</li>
<li>load-diff based segment loading patches to improve load efficiency (<a href="https://github.com/milvus-io/milvus/pull/47545">#47545</a>)</li>
<li>Removed redundant bitset count operations during filter execution to reduce CPU overhead (<a href="https://github.com/milvus-io/milvus/pull/47546">#47546</a>)</li>
<li>Added semantic highlighting support for dynamic fields (<a href="https://github.com/milvus-io/milvus/pull/47464">#47464</a>)</li>
<li>Reduced unnecessary <code translate="no">PinWrapper</code> copies in <code translate="no">searchPksWith</code> to improve query performance (<a href="https://github.com/milvus-io/milvus/pull/47531">#47531</a>)</li>
<li>Normalized constant-folded boolean expressions to <code translate="no">AlwaysTrueExpr</code>/<code translate="no">AlwaysFalseExpr</code> during rewriting for simpler plans (<a href="https://github.com/milvus-io/milvus/pull/47493">#47493</a>)</li>
<li>Added RESTful <code translate="no">search_by_pk</code> support (<a href="https://github.com/milvus-io/milvus/pull/47318">#47318</a>)</li>
<li>Optimized “latest delete snapshot” handling to reduce overhead (<a href="https://github.com/milvus-io/milvus/pull/47409">#47409</a>)</li>
<li>Added support for user-specified warmup settings (<a href="https://github.com/milvus-io/milvus/pull/47343">#47343</a>)</li>
<li>Added <code translate="no">LoadWithStrategyAsync</code> to enable true I/O pipelining in Storage V2 (<a href="https://github.com/milvus-io/milvus/pull/47427">#47427</a>)</li>
<li>Optimized MixCoord’s CPU and memory usage by avoiding redundant calculations in the balance checker (<a href="https://github.com/milvus-io/milvus/pull/47190">#47190</a>)</li>
<li>Added sparse filtering support in search (<a href="https://github.com/milvus-io/milvus/pull/47447">#47447</a>)</li>
<li>Reduced memory allocations and copies during data loading (<a href="https://github.com/milvus-io/milvus/pull/47088">#47088</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Fixed an issue where collection metadata could contain an invalid database name (<a href="https://github.com/milvus-io/milvus/pull/47721">#47721</a>)</li>
<li>Ensured exclusive control-channel messages acquire a global lock in the lock interceptor (<a href="https://github.com/milvus-io/milvus/pull/47678">#47678</a>)</li>
<li>Fixed channel exclusive mode state loss and vchannel list handling issues (<a href="https://github.com/milvus-io/milvus/pull/47702">#47702</a>)</li>
<li>Fixed index building to use the correct global offset for <code translate="no">null_offset</code> in <code translate="no">BuildIndexFromFieldData</code> (<a href="https://github.com/milvus-io/milvus/pull/47708">#47708</a>)</li>
<li>Improved v2.5/v2.6 compatibility handling in <code translate="no">SyncTargetVersion</code> (QueryNode) (<a href="https://github.com/milvus-io/milvus/pull/47693">#47693</a>)</li>
<li>Handled <code translate="no">broadcastToAll</code> messages on the control channel in recovery storage (<a href="https://github.com/milvus-io/milvus/pull/47640">#47640</a>)</li>
<li>Added <code translate="no">warmupKey</code> to the <code translate="no">CheckParams</code> filter to make <code translate="no">CreateIndex</code> idempotent (<a href="https://github.com/milvus-io/milvus/pull/47607">#47607</a>)</li>
<li>Corrected the default <code translate="no">mmap</code> value in code (<a href="https://github.com/milvus-io/milvus/pull/47490">#47490</a>)</li>
<li>Populated <code translate="no">LevelZeroSegmentIDs</code> in <code translate="no">GetDataVChanPositions</code> (<a href="https://github.com/milvus-io/milvus/pull/47597">#47597</a>)</li>
<li>Corrected null handling on <code translate="no">NullExpr</code>, <code translate="no">ExistsExpr</code>, and logical operators (<a href="https://github.com/milvus-io/milvus/pull/47519">#47519</a>)</li>
<li>Removed <code translate="no">segment_loader</code> pre-reserve logic for warmup fields/indexes to avoid incorrect reservations (<a href="https://github.com/milvus-io/milvus/pull/47463">#47463</a>)</li>
<li>Updated <code translate="no">log_*</code> macros to use <code translate="no">{}</code> placeholders to avoid treating error messages as format strings (<a href="https://github.com/milvus-io/milvus/pull/47485">#47485</a>)</li>
<li>Fixed bloom filter memory leak when a worker node crashes (<a href="https://github.com/milvus-io/milvus/pull/47451">#47451</a>)</li>
<li>Used actual data timestamps for imported segment positions (<a href="https://github.com/milvus-io/milvus/pull/47370">#47370</a>)</li>
<li>Rebuilt WAL messages on each append retry to avoid panics (<a href="https://github.com/milvus-io/milvus/pull/47480">#47480</a>)</li>
<li>Filled in the log and memory size fields in <code translate="no">TextIndexStats</code> metadata (<a href="https://github.com/milvus-io/milvus/pull/47476">#47476</a>)</li>
<li>Reduced the empty timetick filtering interval to improve timetick handling (<a href="https://github.com/milvus-io/milvus/pull/47471">#47471</a>)</li>
</ul>
<h2 id="v2610" class="common-anchor-header">v2.6.10<button data-href="#v2610" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: February 5, 2026</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.10</td><td>2.6.8</td><td>2.6.9</td><td>2.6.13</td><td>2.6.1</td></tr>
</tbody>
</table>
<p>We are pleased to announce the release of Milvus 2.6.10! This update strengthens security controls around KMS key revocation and improves search and storage performance through automatic FP32-to-FP16/BF16 conversion, optimized segment loading, and updated auto-index configurations. This release also fixes a number of stability issues across compaction, query pagination, and recovery workflows. We recommend all users on the 2.6 branch upgrade to this version for improved reliability and performance.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Added support to stop WAL consumption when a KMS key is revoked (<a href="https://github.com/milvus-io/milvus/pull/47018">#47018</a>)</li>
<li>Updated the default auto-index configuration for vector fields (<a href="https://github.com/milvus-io/milvus/pull/47388">#47388</a>)</li>
<li>Disabled storage-version upgrade compaction by default (<a href="https://github.com/milvus-io/milvus/pull/47383">#47383</a>)</li>
<li>Added automatic FP32-to-FP16/BF16 conversion in search (<a href="https://github.com/milvus-io/milvus/pull/47241">#47241</a>)</li>
<li>Limited segment load concurrency by submitting loads to the load pool (<a href="https://github.com/milvus-io/milvus/pull/47335">#47335</a>)</li>
<li>Added the <code translate="no">map_populate</code> flag for <code translate="no">mmap</code> to reduce page faults during access (<a href="https://github.com/milvus-io/milvus/pull/47317">#47317</a>)</li>
<li>Persisted BM25 stats to disk during segment loading to reduce recomputation (<a href="https://github.com/milvus-io/milvus/pull/47232">#47232</a>)</li>
<li>Added loading timeout and cancellation support for better control of long-running loads (<a href="https://github.com/milvus-io/milvus/pull/47223">#47223</a>)</li>
<li>Allowed <code translate="no">alter_collection_field()</code> to update the field description (<a href="https://github.com/milvus-io/milvus/pull/47058">#47058</a>)</li>
<li>Added a target manager to <code translate="no">ReplicaObserver</code> initialization (<a href="https://github.com/milvus-io/milvus/pull/47093">#47093</a>)</li>
<li>Updated the Knowhere version for vector search improvements (<a href="https://github.com/milvus-io/milvus/pull/47109">#47109</a>)</li>
<li>Added BM25 <code translate="no">search_by_pk</code> support (<a href="https://github.com/milvus-io/milvus/pull/47012">#47012</a>)</li>
<li>Extracted assign policy from the balancer and added <code translate="no">StoppingBalancer</code> (<a href="https://github.com/milvus-io/milvus/pull/47138">#47138</a>)</li>
<li>Prevented import jobs/tasks from rolling back state unexpectedly (<a href="https://github.com/milvus-io/milvus/pull/47102">#47102</a>)</li>
<li>Improved slow logs by recording average cost per NQ (<a href="https://github.com/milvus-io/milvus/pull/47086">#47086</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Fixed incorrect group results during pagination of grouped queries (<a href="https://github.com/milvus-io/milvus/pull/47248">#47248</a>)</li>
<li>Added boundary validation for threadpool resize operations (<a href="https://github.com/milvus-io/milvus/pull/47367">#47367</a>)</li>
<li>Improved error message handling when the error type is missing (<a href="https://github.com/milvus-io/milvus/pull/47369">#47369</a>)</li>
<li>Prevented coredumps and improved diagnostics for <code translate="no">PhyReScoresNode</code> (<a href="https://github.com/milvus-io/milvus/pull/47341">#47341</a>)</li>
<li>Reverted a compaction change related to “fast finish” when L0 compaction hits zero (L1/L2) (<a href="https://github.com/milvus-io/milvus/pull/47336">#47336</a>)</li>
<li>Prevented server crashes on division/modulo by zero in filter expressions (<a href="https://github.com/milvus-io/milvus/pull/47306">#47306</a>)</li>
<li>[Go SDK] Aligned <code translate="no">timestamptz</code> field type and data format with the server (<a href="https://github.com/milvus-io/milvus/pull/47328">#47328</a>)</li>
<li>Added authentication to the metrics endpoint when authorization is enabled (<a href="https://github.com/milvus-io/milvus/pull/47278">#47278</a>)</li>
<li>Updated <code translate="no">milvus_proxy_req_count</code> metrics for RESTful APIs (<a href="https://github.com/milvus-io/milvus/pull/47239">#47239</a>)</li>
<li>Submitted <code translate="no">TriggerTypeStorageVersionUpgrade</code> compaction tasks correctly (<a href="https://github.com/milvus-io/milvus/pull/47234">#47234</a>)</li>
<li>Allowed empty compaction results (<a href="https://github.com/milvus-io/milvus/pull/47153">#47153</a>)</li>
<li>Fixed Azure precheck to use a fixed bucket not owned by Milvus (<a href="https://github.com/milvus-io/milvus/pull/47168">#47168</a>)</li>
<li>Ignored L0 compaction during <code translate="no">PreallocSegmentIDs</code> checks (<a href="https://github.com/milvus-io/milvus/pull/47189">#47189</a>)</li>
<li>Fixed compaction fast-finish behavior when L0 compaction hits zero (L1/L2) (<a href="https://github.com/milvus-io/milvus/pull/47187">#47187</a>)</li>
<li>Removed unnecessary batching to reduce OOM risk (<a href="https://github.com/milvus-io/milvus/pull/47175">#47175</a>)</li>
<li>Fixed deserialization handling for empty vector arrays (<a href="https://github.com/milvus-io/milvus/pull/47127">#47127</a>)</li>
<li>Fixed runtime config updates not triggering watchers (<a href="https://github.com/milvus-io/milvus/pull/47161">#47161</a>)</li>
<li>Unified primary-key handling logic between <code translate="no">deletePreExecute</code> and <code translate="no">packDeleteMessage</code> (<a href="https://github.com/milvus-io/milvus/pull/47147">#47147</a>)</li>
<li>Used user-provided target size in compaction-related logic (<a href="https://github.com/milvus-io/milvus/pull/47115">#47115</a>)</li>
</ul>
<h2 id="v269" class="common-anchor-header">v2.6.9<button data-href="#v269" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: January 16, 2026</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.9</td><td>2.6.6</td><td>2.6.9</td><td>2.6.13</td><td>2.6.1</td></tr>
</tbody>
</table>
<p>We are pleased to announce the release of Milvus 2.6.9! This update introduces highlight scores for search results, enhances segment management with support for reopening segments when data or schema changes occur, and improves storage version handling. Key improvements include better logging performance, enhanced security controls for expression endpoints, and optimizations for text analyzers and index building. This release also resolves critical issues including memory estimation accuracy, geometry data conversions, and various stability fixes. We recommend all users on the 2.6 branch upgrade to this version for improved system reliability and performance.</p>
<h3 id="Features" class="common-anchor-header">Features<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Supported searching by primary keys (<a href="https://github.com/milvus-io/milvus/pull/46528">#46528</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Added a storage version label metric for better observability (<a href="https://github.com/milvus-io/milvus/pull/47014">#47014</a>)</li>
<li>QueryCoord now supports segment reopen when manifest path changes (<a href="https://github.com/milvus-io/milvus/pull/46921">#46921</a>)</li>
<li>Added support for reopening segments when data or schema changes occur (<a href="https://github.com/milvus-io/milvus/pull/46412">#46412</a>)</li>
<li>Improved slow log performance and efficiency (<a href="https://github.com/milvus-io/milvus/pull/47086">#47086</a>)</li>
<li>Added storage version upgrade compaction policy to facilitate version migrations (<a href="https://github.com/milvus-io/milvus/pull/47011">#47011</a>)</li>
<li>Eliminated extra memory copy operations for C++ logging to improve performance (<a href="https://github.com/milvus-io/milvus/pull/46992">#46992</a>)</li>
<li>Added security controls for the /expr endpoint to prevent unauthorized access (<a href="https://github.com/milvus-io/milvus/pull/46978">#46978</a>)</li>
<li>Streaming service now remains enabled until the required streaming node count is reached (<a href="https://github.com/milvus-io/milvus/pull/46982">#46982</a>)</li>
<li>Removed redundant etcd put operations when updating segment information (<a href="https://github.com/milvus-io/milvus/pull/46794">#46794</a>)</li>
<li>Improved row count validation and reduced misleading warning logs for sort compaction (<a href="https://github.com/milvus-io/milvus/pull/46824">#46824</a>)</li>
<li>Cleaned up and organized build index log messages (<a href="https://github.com/milvus-io/milvus/pull/46769">#46769</a>)</li>
<li>Limited the number of concurrent vector index builds per worker to prevent resource exhaustion (<a href="https://github.com/milvus-io/milvus/pull/46877">#46877</a>)</li>
<li>Optimized jieba and lindera analyzer cloning operations for better performance (<a href="https://github.com/milvus-io/milvus/pull/46757">#46757</a>)</li>
<li>Added glog sink to transfer CGO logs into zap logger for unified logging (<a href="https://github.com/milvus-io/milvus/pull/46741">#46741</a>)</li>
<li>Enforced storage V2 format usage and deprecated V1 writes (<a href="https://github.com/milvus-io/milvus/pull/46889">#46889</a>)</li>
<li>Implemented batch processing for ngram operations to improve efficiency (<a href="https://github.com/milvus-io/milvus/pull/46703">#46703</a>)</li>
<li>Added automatic retry mechanism for binlog write operations to improve reliability (<a href="https://github.com/milvus-io/milvus/pull/46854">#46854</a>)</li>
<li>Filtered empty timetick messages from the consuming side to reduce unnecessary processing (<a href="https://github.com/milvus-io/milvus/pull/46730">#46730</a>)</li>
<li>Improved search by primary key with duplicate checking and automatic anns_field inference (<a href="https://github.com/milvus-io/milvus/pull/46745">#46745</a>)</li>
<li>Added dimension parameter support for siliconflow and cohere embedding providers (<a href="https://github.com/milvus-io/milvus/pull/47081">#47081</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Fixed double counting of index memory in segment loading estimation (<a href="https://github.com/milvus-io/milvus/pull/47046">#47046</a>)</li>
<li>Fixed compilation issues on macOS 14 (<a href="https://github.com/milvus-io/milvus/pull/47048">#47048</a>)</li>
<li>Used revision as streaming service discovery global version for better consistency (<a href="https://github.com/milvus-io/milvus/pull/47023">#47023</a>)</li>
<li>Ensured all futures complete on exception to prevent use-after-free crashes (<a href="https://github.com/milvus-io/milvus/pull/46960">#46960</a>)</li>
<li>Fixed shard interceptor incorrectly skipping <code translate="no">FlushAllMsg</code> operations (<a href="https://github.com/milvus-io/milvus/pull/47004">#47004</a>)</li>
<li>Added valid range validation for collection TTL to prevent invalid configurations (<a href="https://github.com/milvus-io/milvus/pull/47010">#47010</a>)</li>
<li>Fixed <code translate="no">GetCredentialInfo</code> not caching RPC responses (<a href="https://github.com/milvus-io/milvus/pull/46945">#46945</a>)</li>
<li>Fixed issue where <code translate="no">AlterFunction</code> could not be invoked when multiple functions become invalid (<a href="https://github.com/milvus-io/milvus/pull/46986">#46986</a>)</li>
<li>Fixed inverted index null offset file not being compacted (<a href="https://github.com/milvus-io/milvus/pull/46950">#46950</a>)</li>
<li>Fixed crash when using is_null_expr on indexed JSON fields (<a href="https://github.com/milvus-io/milvus/pull/46894">#46894</a>)</li>
<li>Added check for allow_insert_auto_id flag in RESTful v2 insert API (<a href="https://github.com/milvus-io/milvus/pull/46931">#46931</a>)</li>
<li>Added field existence check in column groups before reading from loon manifest (<a href="https://github.com/milvus-io/milvus/pull/46924">#46924</a>)</li>
<li>Fixed bug where the highlight parameter was not working correctly (<a href="https://github.com/milvus-io/milvus/pull/46876">#46876</a>)</li>
<li>Quota center now ignores delegator when it is in recovering state (<a href="https://github.com/milvus-io/milvus/pull/46858">#46858</a>)</li>
<li>Aligned WKT/WKB conversion options to ensure consistent behavior across operations (<a href="https://github.com/milvus-io/milvus/pull/46874">#46874</a>)</li>
<li>Fixed voyageai model int8 bug (<a href="https://github.com/milvus-io/milvus/pull/46821">#46821</a>)</li>
<li>Fixed missing handling of <code translate="no">FlushAllMsg</code> in recovery storage operations (<a href="https://github.com/milvus-io/milvus/pull/46803">#46803</a>)</li>
<li>Fixed missing shardclientmgr field in querytask to prevent panic (<a href="https://github.com/milvus-io/milvus/pull/46838">#46838</a>)</li>
<li>Used leaderid for leaderaction stale check in scheduler to improve accuracy (<a href="https://github.com/milvus-io/milvus/pull/46788">#46788</a>)</li>
<li>Restored tenant/namespace support for Pulsar that was lost in 2.6 (<a href="https://github.com/milvus-io/milvus/pull/46759">#46759</a>)</li>
<li>Added load config watcher to prevent load config modifications from being lost (<a href="https://github.com/milvus-io/milvus/pull/46786">#46786</a>)</li>
<li>Fixed function edit interface bug (<a href="https://github.com/milvus-io/milvus/pull/46782">#46782</a>)</li>
<li>Added collection TTL property validation to prevent compaction from getting stuck (<a href="https://github.com/milvus-io/milvus/pull/46736">#46736</a>)</li>
</ul>
<h2 id="v268" class="common-anchor-header">v2.6.8<button data-href="#v268" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: January 4, 2026</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.8</td><td>2.6.6</td><td>2.6.9</td><td>2.6.11</td><td>2.6.1</td></tr>
</tbody>
</table>
<p>We are excited to announce the release of Milvus 2.6.8! This version introduces search result highlighting, significantly enhancing the retrieval experience. Under the hood, we have optimized query processing, resource scheduling, and caching mechanisms to deliver superior performance and stability. Additionally, this release addresses critical bugs related to data security, storage handling, and concurrency. We highly recommend all users upgrade to this version for a more efficient and reliable production environment.</p>
<h3 id="Features" class="common-anchor-header">Features<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Supported search with highlighter. For details, refer to <a href="/docs/id/v2.6.x/text-highlighter.md">Text Highlighter</a>.  (<a href="https://github.com/milvus-io/milvus/pull/46052">#46052</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Moved query optimization logic to the Proxy to improve performance (<a href="https://github.com/milvus-io/milvus/pull/46549">#46549</a>)</li>
<li>Optimized <code translate="no">LIKE</code> operator performance using STL sort (<a href="https://github.com/milvus-io/milvus/pull/46535">#46535</a>)</li>
<li>Enabled concurrent execution of text index tasks for multiple fields (<a href="https://github.com/milvus-io/milvus/pull/46306">#46306</a>)</li>
<li>Supported pausing GC at the collection level (<a href="https://github.com/milvus-io/milvus/pull/46201">#46201</a>)</li>
<li>Implemented a penalty policy for QueryNodes to handle resource exhaustion (<a href="https://github.com/milvus-io/milvus/pull/46086">#46086</a>)</li>
<li>Optimized data caching by mapping multiple row groups to a single cache cell (<a href="https://github.com/milvus-io/milvus/pull/46542">#46542</a>)</li>
<li>Reduced CPU usage in QuotaCenter (<a href="https://github.com/milvus-io/milvus/pull/46615">#46615</a>)</li>
<li>Improved <code translate="no">TIMESTAMPTZ</code> data comparison performance (<a href="https://github.com/milvus-io/milvus/pull/46655">#46655</a>)</li>
<li>Supported nullable dynamic fields with an empty JSON object as the default value (<a href="https://github.com/milvus-io/milvus/pull/46445">#46445</a>)</li>
<li>Prevented unnecessary segment sealing when only altering collection properties (<a href="https://github.com/milvus-io/milvus/pull/46489">#46489</a>)</li>
<li>Supported DML and DQL forwarding in Proxy for RESTful v2 (<a href="https://github.com/milvus-io/milvus/pull/46021">#46021</a>, <a href="https://github.com/milvus-io/milvus/pull/46037">#46037</a>)</li>
<li>Added retry mechanism for object storage reads on rate limit errors (<a href="https://github.com/milvus-io/milvus/pull/46464">#46464</a>)</li>
<li>Enhanced logging for Proxy and RootCoord meta tables (<a href="https://github.com/milvus-io/milvus/pull/46701">#46701</a>)</li>
<li>Added validation for embedding models and schema field types (<a href="https://github.com/milvus-io/milvus/pull/46422">#46422</a>)</li>
<li>Introduced a tolerance duration to delay collection drop operations (<a href="https://github.com/milvus-io/milvus/pull/46252">#46252</a>)</li>
<li>Improved index task scheduling by estimating slots based on field size and type (<a href="https://github.com/milvus-io/milvus/pull/46276">#46276</a>, <a href="https://github.com/milvus-io/milvus/pull/45851">#45851</a>)</li>
<li>Added fallback mechanism for write paths when accessing object storage without condition write support (<a href="https://github.com/milvus-io/milvus/pull/46022">#46022</a>)</li>
<li>Optimized IDF oracle synchronization logic (<a href="https://github.com/milvus-io/milvus/pull/46079">#46079</a>)</li>
<li>Changed RootCoord default port to a non-ephemeral port (<a href="https://github.com/milvus-io/milvus/pull/46268">#46268</a>)</li>
<li>Added metrics to monitor Jemalloc cached memory (<a href="https://github.com/milvus-io/milvus/pull/45973">#45973</a>)</li>
<li>Improved disk quota metric accuracy when cluster quota changes (<a href="https://github.com/milvus-io/milvus/pull/46304">#46304</a>)</li>
<li>Improved trace observability for scalar expressions (<a href="https://github.com/milvus-io/milvus/pull/45823">#45823</a>)</li>
<li>Rejected duplicate primary keys in upsert batch requests (<a href="https://github.com/milvus-io/milvus/pull/46035">#46035</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Fixed RBAC ETCD prefix matching to prevent potential data leakage (<a href="https://github.com/milvus-io/milvus/pull/46708">#46708</a>)</li>
<li>Fixed incorrect root path handling for local storage mode (<a href="https://github.com/milvus-io/milvus/pull/46693">#46693</a>)</li>
<li>Fixed handling of mixed <code translate="no">int64</code>/<code translate="no">float</code> types in JSON fields (<a href="https://github.com/milvus-io/milvus/pull/46682">#46682</a>)</li>
<li>Fixed text log loading failures during cluster upgrade (<a href="https://github.com/milvus-io/milvus/pull/46698">#46698</a>)</li>
<li>Prevented deletion of other fields during raw data cleanup (<a href="https://github.com/milvus-io/milvus/pull/46689">#46689</a>)</li>
<li>Fixed failure when using highlighting with multiple analyzers (<a href="https://github.com/milvus-io/milvus/pull/46664">#46664</a>)</li>
<li>Ensured logs are flushed when the OS exits (<a href="https://github.com/milvus-io/milvus/pull/46609">#46609</a>)</li>
<li>Fixed ETCD RPC size limit exceeded error when dropping collections (<a href="https://github.com/milvus-io/milvus/pull/46645">#46645</a>)</li>
<li>Fixed replication lag issues when the server is idle (<a href="https://github.com/milvus-io/milvus/pull/46612">#46612</a>)</li>
<li>Fixed validation for invalid <code translate="no">TIMESTAMPTZ</code> default values (<a href="https://github.com/milvus-io/milvus/pull/46556">#46556</a>)</li>
<li>Fixed restoration of compaction tasks to ensure proper cleanup (<a href="https://github.com/milvus-io/milvus/pull/46578">#46578</a>)</li>
<li>Unified read-only node handling to avoid stuck balance channel tasks (<a href="https://github.com/milvus-io/milvus/pull/46513">#46513</a>)</li>
<li>Prevented field data drops for multi-field column groups (<a href="https://github.com/milvus-io/milvus/pull/46425">#46425</a>)</li>
<li>Removed stale proxy clients when re-watching ETCD (<a href="https://github.com/milvus-io/milvus/pull/46490">#46490</a>)</li>
<li>Fixed chunk iterator merge order (<a href="https://github.com/milvus-io/milvus/pull/46462">#46462</a>)</li>
<li>Prevented creation of Kafka consumer groups by disabling auto-commit (<a href="https://github.com/milvus-io/milvus/pull/46509">#46509</a>)</li>
<li>Prohibited hot-reloading of tiered storage parameters (<a href="https://github.com/milvus-io/milvus/pull/46438">#46438</a>)</li>
<li>Enabled search iterator for binary vectors (<a href="https://github.com/milvus-io/milvus/pull/46334">#46334</a>)</li>
<li>Fixed race condition in storage initialization (<a href="https://github.com/milvus-io/milvus/pull/46338">#46338</a>)</li>
<li>Fixed highlight queries not working for non-BM25 searches (<a href="https://github.com/milvus-io/milvus/pull/46295">#46295</a>)</li>
<li>Fixed stack overflow during JSON garbage collection (<a href="https://github.com/milvus-io/milvus/pull/46318">#46318</a>)</li>
<li>Ensured retries when writing binlogs (<a href="https://github.com/milvus-io/milvus/pull/46310">#46310</a>)</li>
<li>Fixed index usage check for JSON fields (<a href="https://github.com/milvus-io/milvus/pull/46281">#46281</a>)</li>
<li>Prevented target update blocking when replicas lack nodes during scaling (<a href="https://github.com/milvus-io/milvus/pull/46291">#46291</a>)</li>
<li>Restricted <code translate="no">char_group</code> tokenizer to support only one-byte delimiters (<a href="https://github.com/milvus-io/milvus/pull/46196">#46196</a>)</li>
<li>Skipped JSON path index usage if the query path includes numbers (<a href="https://github.com/milvus-io/milvus/pull/46247">#46247</a>)</li>
<li>Fixed path concatenation errors in MinIO when root path is “.” (<a href="https://github.com/milvus-io/milvus/pull/46221">#46221</a>)</li>
<li>Fixed false-positive health checks by correcting replicate lag metric calculation (<a href="https://github.com/milvus-io/milvus/pull/46122">#46122</a>)</li>
<li>Fixed RESTful v2 parsing and schema defaults with <code translate="no">TIMESTAMPTZ</code> (<a href="https://github.com/milvus-io/milvus/pull/46239">#46239</a>)</li>
<li>Fixed panic when searching empty results with output geometry fields (<a href="https://github.com/milvus-io/milvus/pull/46231">#46231</a>)</li>
<li>Added field data alignment validation to prevent panics during partial updates (<a href="https://github.com/milvus-io/milvus/pull/46180">#46180</a>)</li>
<li>Fixed database loss issue in RESTful v2 (<a href="https://github.com/milvus-io/milvus/pull/46172">#46172</a>)</li>
<li>Fixed incorrect context usage in gRPC client sessions (<a href="https://github.com/milvus-io/milvus/pull/46184">#46184</a>)</li>
<li>Fixed incorrect authorization forwarding in RESTful v2 during upgrades (<a href="https://github.com/milvus-io/milvus/pull/46140">#46140</a>)</li>
<li>Fixed incorrect struct reduction logic (<a href="https://github.com/milvus-io/milvus/pull/46151">#46151</a>)</li>
<li>Fixed error return from highlighter when search results are empty (<a href="https://github.com/milvus-io/milvus/pull/46111">#46111</a>)</li>
<li>Corrected logic for loading raw data for fields (<a href="https://github.com/milvus-io/milvus/pull/46155">#46155</a>)</li>
<li>Fixed cursor movement issue after skipping chunks in index (<a href="https://github.com/milvus-io/milvus/pull/46055">#46055</a>)</li>
<li>Corrected loop logic for <code translate="no">TIMESTAMPTZ</code> scalar index output (<a href="https://github.com/milvus-io/milvus/pull/46110">#46110</a>)</li>
<li>Fixed setting default values for geometry fields via RESTful API (<a href="https://github.com/milvus-io/milvus/pull/46064">#46064</a>)</li>
<li>Implemented fast fail if any component is not ready on startup (<a href="https://github.com/milvus-io/milvus/pull/46070">#46070</a>)</li>
</ul>
<h2 id="v267" class="common-anchor-header">v2.6.7<button data-href="#v267" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: December 4, 2025</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.7</td><td>2.6.4</td><td>2.6.5</td><td>2.6.10</td><td>2.6.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.7 is a critical stabilization update for the 2.6.x series. This release focuses on hardening the system against distributed failures and optimizing resource utilization under high load. With significant improvements in I/O handling, memory management, and Kubernetes integration, we strongly recommend all production users upgrade to this version to ensure greater reliability and smoother operation at scale.</p>
<h3 id="Features" class="common-anchor-header">Features<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Added <code translate="no">/livez</code> endpoint to support Kubernetes native liveness probes, improving container orchestration stability (<a href="https://github.com/milvus-io/milvus/pull/45481">#45481</a>).</li>
<li>Added support for <strong>GroupBy</strong> operations on <code translate="no">TIMESTAMPTZ</code> fields, enhancing time-series analytics capabilities (<a href="https://github.com/milvus-io/milvus/pull/45763">#45763</a>)</li>
<li>Supported <code translate="no">mmap</code> for JSON shredding’s shared key indices to reduce RAM footprint (<a href="https://github.com/milvus-io/milvus/pull/45861">#45861</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Supported DML request forwarding in the Proxy to improve write availability and routing resilience (<a href="https://github.com/milvus-io/milvus/pull/45922">#45922</a>).</li>
<li>Upgrade etcd to v3.5.23 to address consensus stability and performance regressions (<a href="https://github.com/milvus-io/milvus/pull/45953">#45953</a>).</li>
<li>Added robust error handling for Etcd server crashes to prevent cascading component failures (<a href="https://github.com/milvus-io/milvus/pull/45633">#45633</a>).</li>
<li>Reduced Etcd load by removing expensive watchers for simple session liveness checks (<a href="https://github.com/milvus-io/milvus/pull/45974">#45974</a>).</li>
<li>Enhanced the WAL retention strategy to better balance disk usage with data recovery safety (<a href="https://github.com/milvus-io/milvus/pull/45784">#45784</a>).</li>
<li>Supported asynchronous write syncing for logs to prevent disk I/O blocking from affecting the main execution path (<a href="https://github.com/milvus-io/milvus/pull/45806">#45806</a>).</li>
<li>Enforced Buffered I/O usage for high-priority load tasks to optimize OS page cache utilization and throughput (<a href="https://github.com/milvus-io/milvus/pull/45958">#45958</a>).</li>
<li>Optimized <code translate="no">mmap</code> strategy to map group chunks in a single system call, reducing kernel overhead during segment loading (<a href="https://github.com/milvus-io/milvus/pull/45893">#45893</a>).</li>
<li>Improved the accuracy of memory estimation for JSON shredding to prevent OOM kills or under-utilization (<a href="https://github.com/milvus-io/milvus/pull/45876">#45876</a>).</li>
<li>Refined segment load estimation to account for both eviction and warmup states (<a href="https://github.com/milvus-io/milvus/pull/45891">#45891</a>).</li>
<li>Added granular cancellation checks in query operators to allow faster termination of aborted or timed-out queries (<a href="https://github.com/milvus-io/milvus/pull/45894">#45894</a>).</li>
<li>Removed redundant resource type checks in file resource configuration (<a href="https://github.com/milvus-io/milvus/pull/45727">#45727</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Interleaved Go and C++ logs into a unified stream to provide a correct chronological view for debugging (<a href="https://github.com/milvus-io/milvus/pull/46005">#46005</a>).</li>
<li>Resolved a race condition where <code translate="no">LastConfirmedMessageID</code> could be incorrect under high concurrency writes (<a href="https://github.com/milvus-io/milvus/pull/45874">#45874</a>).</li>
<li>Fixed a calculation error in aggregating <code translate="no">allsearchcount</code> from multiple search results (<a href="https://github.com/milvus-io/milvus/pull/45904">#45904</a>).</li>
<li>Fixed Term expressions to correctly handle string containment logic within JSON arrays (<a href="https://github.com/milvus-io/milvus/pull/45956">#45956</a>).</li>
<li>Replaced <code translate="no">json.doc()</code> with <code translate="no">json.dom_doc()</code> in <code translate="no">JSONContainsExpr</code> to fix parsing behaviors and improve performance (<a href="https://github.com/milvus-io/milvus/pull/45786">#45786</a>).</li>
<li>Fixed a panic in Standby MixCoord components during the shutdown sequence (<a href="https://github.com/milvus-io/milvus/pull/45898">#45898</a>).</li>
<li>Fixed the leader checker to ensure segment distribution is correctly synchronized to Read-Only nodes (<a href="https://github.com/milvus-io/milvus/pull/45991">#45991</a>).</li>
<li>Ensured <code translate="no">HandleNodeUp</code> is triggered during node re-watching to maintain correct load balancing topology (<a href="https://github.com/milvus-io/milvus/pull/45963">#45963</a>).</li>
<li>Implemented fallback to remote WAL storage if local WAL storage becomes unavailable (<a href="https://github.com/milvus-io/milvus/pull/45754">#45754</a>).</li>
<li>Added <code translate="no">EmptySessionWatcher</code> to prevent panics when running in IndexNode binding mode (<a href="https://github.com/milvus-io/milvus/pull/45912">#45912</a>).</li>
<li>Ensured memory state consistency when recovering broadcast tasks from protocol buffers (<a href="https://github.com/milvus-io/milvus/pull/45788">#45788</a>).</li>
<li>Addressed thread-safety issues in SegCore collection schema updates (<a href="https://github.com/milvus-io/milvus/pull/45618">#45618</a>).</li>
<li>Enforced Access Control (RBAC) checks for <code translate="no">ListImport</code> and <code translate="no">GetImportProgress</code> APIs (<a href="https://github.com/milvus-io/milvus/pull/45862">#45862</a>).</li>
<li>Fixed a bug where BulkImport would fail if the input contained an empty struct list (<a href="https://github.com/milvus-io/milvus/pull/45692">#45692</a>).</li>
</ul>
<h2 id="v266" class="common-anchor-header">v2.6.6<button data-href="#v266" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: November 21, 2025</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.6</td><td>2.6.3</td><td>2.6.4</td><td>2.6.8</td><td>2.6.1</td></tr>
</tbody>
</table>
<p>We are excited to announce the release of Milvus 2.6.6, featuring a range of powerful new capabilities, performance enhancements, and essential bug fixes. This update introduces important features such as Geospatial and Timestampz data type, Boost ranker for rescoring, etc. This release also has many crucial scalar filtering performance improvements. Several critical bugs have also been addressed to ensure greater stability and reliability. With this release, Milvus continues to provide a more robust and efficient experience for all users. Below are the key highlights of this release.</p>
<ul>
<li>Geospatial Data Type: Milvus introduces support for the <code translate="no">Geometry</code> data type, representing OGC-compliant geometric objects such as <code translate="no">POINT</code>, <code translate="no">LINESTRING</code>, and <code translate="no">POLYGON</code>. This type supports multiple spatial relationship operators (st_contains, st_intersects, st_within, st_dwithin, …) and provides an <code translate="no">RTREE</code> spatial index to accelerate spatial filtering and query execution. This enables efficient storage and querying of geospatial shapes for LBS, mapping, and other spatial workloads.</li>
<li>Timestamptz Data Type: Milvus introduces the TIMESTAMPTZ data type, providing timezone awareness for all temporal data. This feature enables consistent data management across global deployments by allowing users to define a default time context using the timezone property on Databases and Collections. Crucially, the field fully supports expression-based filtering for time range queries, and retrieval operations (query and search) support a timezone parameter for instant, on-the-fly conversion of timestamps into the required local format upon output.</li>
<li>Boost Ranker: Instead of relying solely on semantic similarity calculated based on vector distances, Boost Ranker allows Milvus to use the optional filtering condition within the function to find matches among search result candidates and boosts the scores of those matches by applying the specified weight, helping promote or demote the rankings of the matched entities in the final result.</li>
<li>STL_SORT index now supports VARCHAR and TIMESTAMPTZ datatype.</li>
<li>You may now enable dynamic field of an existing collection by altering it.</li>
<li>Fixed cve-2025-63811.</li>
</ul>
<h3 id="Features" class="common-anchor-header">Features<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Added new config and enabled dynamic update configs (<a href="https://github.com/milvus-io/milvus/pull/45363">#45363</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Fixed cve-2025-63811 (<a href="https://github.com/milvus-io/milvus/pull/45658">#45658</a>)</li>
<li>Removed large segment id arrays from querynode logs (<a href="https://github.com/milvus-io/milvus/pull/45720">#45720</a>)</li>
<li>Updated multiple places where the expr copied the input values in every loop (<a href="https://github.com/milvus-io/milvus/pull/45712">#45712</a>)</li>
<li>Optimized term expr performance (<a href="https://github.com/milvus-io/milvus/pull/45671">#45671</a>)</li>
<li>Prefetched vector chunks for sealed non-indexed segments (<a href="https://github.com/milvus-io/milvus/pull/45666">#45666</a>)</li>
<li>Expr: only prefetched chunks once (<a href="https://github.com/milvus-io/milvus/pull/45555">#45555</a>)</li>
<li>Added nullable support for geometry and timestamptz types (<a href="https://github.com/milvus-io/milvus/pull/45522">#45522</a>)</li>
<li>Increased session ttl from 10s to 30s (<a href="https://github.com/milvus-io/milvus/pull/45517">#45517</a>)</li>
<li>Added more metrics for ddl framework (<a href="https://github.com/milvus-io/milvus/pull/45559">#45559</a>)</li>
<li>Updated maxconnections config version (<a href="https://github.com/milvus-io/milvus/pull/45547">#45547</a>)</li>
<li>Skipped check source id (<a href="https://github.com/milvus-io/milvus/pull/45519">#45519</a>)</li>
<li>Supported max_connection config for remote storage (<a href="https://github.com/milvus-io/milvus/pull/45364">#45364</a>)</li>
<li>Prevented panic by adding null pointer check when clearing insertrecord pk2offset (<a href="https://github.com/milvus-io/milvus/pull/45442">#45442</a>)</li>
<li>Performed some optimization of scalar field fetching in tiered storage scenarios (<a href="https://github.com/milvus-io/milvus/pull/45361">#45361</a>)</li>
<li>Fixed typo of analyzer params (<a href="https://github.com/milvus-io/milvus/pull/45434">#45434</a>)</li>
<li>Overrode index_type while creating segment index (<a href="https://github.com/milvus-io/milvus/pull/45417">#45417</a>)</li>
<li>Added rbac support for updatereplicateconfiguration (<a href="https://github.com/milvus-io/milvus/pull/45236">#45236</a>)</li>
<li>Bumped go version to 1.24.9 (<a href="https://github.com/milvus-io/milvus/pull/45369">#45369</a>)</li>
<li>Disabled jsonshredding for default config (<a href="https://github.com/milvus-io/milvus/pull/45349">#45349</a>)</li>
<li>Unified the aligned buffer for both buffered and direct i/o (<a href="https://github.com/milvus-io/milvus/pull/45325">#45325</a>)</li>
<li>Renamed jsonstats related user config params (<a href="https://github.com/milvus-io/milvus/pull/45252">#45252</a>)</li>
<li>Made knowhere thread pool config refreshable (<a href="https://github.com/milvus-io/milvus/pull/45191">#45191</a>)</li>
<li>Cherry-picked patch of new ddl framework and cdc 3 (<a href="https://github.com/milvus-io/milvus/pull/45280">#45280</a>)</li>
<li>Set schema version when creating new collection (<a href="https://github.com/milvus-io/milvus/pull/45269">#45269</a>)</li>
<li>Supported jsonl/ndjson files for bulkinsert (<a href="https://github.com/milvus-io/milvus/pull/44717">#44717</a>)</li>
<li>Waited for replicate stream client to finish (<a href="https://github.com/milvus-io/milvus/pull/45260">#45260</a>)</li>
<li>Made geometrycache an optional configuration (<a href="https://github.com/milvus-io/milvus/pull/45196">#45196</a>)</li>
<li>Cherry-picked patch of new ddl framework and cdc 2 (<a href="https://github.com/milvus-io/milvus/pull/45241">#45241</a>)</li>
<li>Did not start cdc by default (<a href="https://github.com/milvus-io/milvus/pull/45217">#45217</a>)</li>
<li>Cherry-picked patch of new ddl framework and cdc (<a href="https://github.com/milvus-io/milvus/pull/45025">#45025</a>)</li>
<li>Removed max vector field number limit (<a href="https://github.com/milvus-io/milvus/pull/45156">#45156</a>)</li>
<li>Showed create time for import job (<a href="https://github.com/milvus-io/milvus/pull/45059">#45059</a>)</li>
<li>Optimized scalarindexsort bitmap initialization for range queries (<a href="https://github.com/milvus-io/milvus/pull/45087">#45087</a>)</li>
<li>Enabled stl_sort to support varchar (<a href="https://github.com/milvus-io/milvus/pull/45050">#45050</a>)</li>
<li>Extracted shard client logic into dedicated package (<a href="https://github.com/milvus-io/milvus/pull/45031">#45031</a>)</li>
<li>Refactored privilege management by extracting privilege cache into separate package (<a href="https://github.com/milvus-io/milvus/pull/45002">#45002</a>)</li>
<li>Supported json default values in fillfielddata (<a href="https://github.com/milvus-io/milvus/pull/45470">#45470</a>)</li>
<li>Updated enabledynamicfield and schemaversion during collection modification (<a href="https://github.com/milvus-io/milvus/pull/45616">#45616</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Fixed partial update panic with timestamptz (<a href="https://github.com/milvus-io/milvus/pull/45741">#45741</a>)</li>
<li>Used 2.6.6 for milvus ddl upgrading (<a href="https://github.com/milvus-io/milvus/pull/45739">#45739</a>)</li>
<li>Used latest timetick to expire cache (<a href="https://github.com/milvus-io/milvus/pull/45699">#45699</a>)</li>
<li>Made streamingnode exit when it failed initializing (<a href="https://github.com/milvus-io/milvus/pull/45732">#45732</a>)</li>
<li>Protected tbb concurrent_map emplace to avoid race condition deadlock (<a href="https://github.com/milvus-io/milvus/pull/45682">#45682</a>)</li>
<li>Prevented panic when streaming coord shutdown but query coord still worked (<a href="https://github.com/milvus-io/milvus/pull/45696">#45696</a>)</li>
<li>Set task init when worker didn’t have task (<a href="https://github.com/milvus-io/milvus/pull/45676">#45676</a>)</li>
<li>Prevented deadlock in runcomponent when prepare failed (<a href="https://github.com/milvus-io/milvus/pull/45647">#45647</a>)</li>
<li>Prevented panic when double closing channel of ack broadcast (<a href="https://github.com/milvus-io/milvus/pull/45662">#45662</a>)</li>
<li>Corrected default value backfill during addfield (<a href="https://github.com/milvus-io/milvus/pull/45644">#45644</a>)</li>
<li>Compacted the assignment history of channel to decrease the size of assignment recovery info (<a href="https://github.com/milvus-io/milvus/pull/45607">#45607</a>)</li>
<li>Handled default values correctly during compaction for added fields (<a href="https://github.com/milvus-io/milvus/pull/45619">#45619</a>)</li>
<li>Removed validatefieldname in dropindex (<a href="https://github.com/milvus-io/milvus/pull/45462">#45462</a>)</li>
<li>Ignored compaction task when from segment was not healthy (<a href="https://github.com/milvus-io/milvus/pull/45535">#45535</a>)</li>
<li>Set schema properties before broadcasting alter collection (<a href="https://github.com/milvus-io/milvus/pull/45529">#45529</a>)</li>
<li>Stored database event if the key was invalid (<a href="https://github.com/milvus-io/milvus/pull/45530">#45530</a>)</li>
<li>Fixed bulkimport bug for struct field (<a href="https://github.com/milvus-io/milvus/pull/45536">#45536</a>)</li>
<li>Failed to get raw data for hybrid index (<a href="https://github.com/milvus-io/milvus/pull/45408">#45408</a>)</li>
<li>Retained collection early to prevent it from being released before query completion (<a href="https://github.com/milvus-io/milvus/pull/45415">#45415</a>)</li>
<li>Used the right resource key lock for ddl and used new ddl in transfer replica (<a href="https://github.com/milvus-io/milvus/pull/45509">#45509</a>)</li>
<li>Fixed index compatibility after upgrade (<a href="https://github.com/milvus-io/milvus/pull/45374">#45374</a>)</li>
<li>Fixed channel not available error and released collection blocking (<a href="https://github.com/milvus-io/milvus/pull/45429">#45429</a>)</li>
<li>Removed collection meta when dropping partition (<a href="https://github.com/milvus-io/milvus/pull/45497">#45497</a>)</li>
<li>Fixed target segment marked dropped for save stats result twice (<a href="https://github.com/milvus-io/milvus/pull/45479">#45479</a>)</li>
<li>Wrongly updated timetick of collection info (<a href="https://github.com/milvus-io/milvus/pull/45471">#45471</a>)</li>
<li>Added tzdata dependency to enable iana time zone id recognition (<a href="https://github.com/milvus-io/milvus/pull/45495">#45495</a>)</li>
<li>Corrected field data offset calculation in rerank functions for bulk search (<a href="https://github.com/milvus-io/milvus/pull/45482">#45482</a>)</li>
<li>Fixed filter geometry for growing with mmap (<a href="https://github.com/milvus-io/milvus/pull/45465">#45465</a>)</li>
<li>Nextfieldid did not consider struct (<a href="https://github.com/milvus-io/milvus/pull/45438">#45438</a>)</li>
<li>Group value was nil (<a href="https://github.com/milvus-io/milvus/pull/45419">#45419</a>)</li>
<li>Provided accurate size estimation for sliced arrow arrays in compaction (<a href="https://github.com/milvus-io/milvus/pull/45352">#45352</a>)</li>
<li>Fixed data race in replicate stream client (<a href="https://github.com/milvus-io/milvus/pull/45347">#45347</a>)</li>
<li>Skipped building text index for newly added columns (<a href="https://github.com/milvus-io/milvus/pull/45317">#45317</a>)</li>
<li>Accidentally ignored sealed segments in l0 compaction (<a href="https://github.com/milvus-io/milvus/pull/45341">#45341</a>)</li>
<li>Moved finishload before text index creation to ensure raw data availability (<a href="https://github.com/milvus-io/milvus/pull/45335">#45335</a>)</li>
<li>Did not use json_shredding for json path is null (<a href="https://github.com/milvus-io/milvus/pull/45311">#45311</a>)</li>
<li>Cherry-picked fixes related to timestamptz (<a href="https://github.com/milvus-io/milvus/pull/45321">#45321</a>)</li>
<li>Fixed load segment failure due to get disk usage error (<a href="https://github.com/milvus-io/milvus/pull/45300">#45300</a>)</li>
<li>Supported json default value in compaction (<a href="https://github.com/milvus-io/milvus/pull/45331">#45331</a>)</li>
<li>Computed the correct batch size for the geometry index of the growing segment (<a href="https://github.com/milvus-io/milvus/pull/45261">#45261</a>)</li>
<li>Applied ddl framework bug patch (<a href="https://github.com/milvus-io/milvus/pull/45292">#45292</a>)</li>
<li>Fixed alter collection failure with mmap setting for struct (<a href="https://github.com/milvus-io/milvus/pull/45240">#45240</a>)</li>
<li>Initialized timestamp range in composite binlog writer (<a href="https://github.com/milvus-io/milvus/pull/45283">#45283</a>)</li>
<li>Skipped creating tmp dir for growing r-tree index (<a href="https://github.com/milvus-io/milvus/pull/45257">#45257</a>)</li>
<li>Avoided potential race conditions when updating the executor (<a href="https://github.com/milvus-io/milvus/pull/45232">#45232</a>)</li>
<li>Allowed "[" and "]" in index name (<a href="https://github.com/milvus-io/milvus/pull/45194">#45194</a>)</li>
<li>Fixed bug for shredding json when empty but not null json (<a href="https://github.com/milvus-io/milvus/pull/45214">#45214</a>)</li>
<li>Ensured append operation could only be canceled by the wal itself but not the rpc (<a href="https://github.com/milvus-io/milvus/pull/45079">#45079</a>)</li>
<li>Resolved wp gcp cloud storage access issue with ak/sk (<a href="https://github.com/milvus-io/milvus/pull/45144">#45144</a>)</li>
<li>Fixed import null geometry data (<a href="https://github.com/milvus-io/milvus/pull/45162">#45162</a>)</li>
<li>Added null check for packed_writer_ in jsonstatsparquetwriter::close() (<a href="https://github.com/milvus-io/milvus/pull/45176">#45176</a>)</li>
<li>Failed to mmap emb_list_meta in embedding list (<a href="https://github.com/milvus-io/milvus/pull/45126">#45126</a>)</li>
<li>Updated querynode numentities metrics when collection had no segments (<a href="https://github.com/milvus-io/milvus/pull/45160">#45160</a>)</li>
<li>Prevented retry when importing invalid utf-8 strings (<a href="https://github.com/milvus-io/milvus/pull/45068">#45068</a>)</li>
<li>Handled empty fieldsdata in reduce/rerank for requery scenario (<a href="https://github.com/milvus-io/milvus/pull/45137">#45137</a>)</li>
<li>Fixed panic when gracefully stopping cdc (<a href="https://github.com/milvus-io/milvus/pull/45095">#45095</a>)</li>
<li>Fixed auth token contamination, oss/cos support, redundant sync err logs (<a href="https://github.com/milvus-io/milvus/pull/45106">#45106</a>)</li>
<li>Handled all-null data in stringindexsort to prevent load timeout (<a href="https://github.com/milvus-io/milvus/pull/45104">#45104</a>)</li>
<li>Disabled building old version jsonstats from request (<a href="https://github.com/milvus-io/milvus/pull/45102">#45102</a>)</li>
<li>Fixed bug for importing geometry data (<a href="https://github.com/milvus-io/milvus/pull/45090">#45090</a>)</li>
<li>Fixed parquet import bug in struct (<a href="https://github.com/milvus-io/milvus/pull/45071">#45071</a>)</li>
<li>Added getmetrics back to indexnodeserver to ensure compatibility (<a href="https://github.com/milvus-io/milvus/pull/45074">#45074</a>)</li>
<li>Fixed alter collection failure for struct sub-fields (<a href="https://github.com/milvus-io/milvus/pull/45042">#45042</a>)</li>
<li>Fixed collection level mmap not taking effect for struct (<a href="https://github.com/milvus-io/milvus/pull/44997">#44997</a>)</li>
<li>Prevented data race in querycoord collection notifier update (<a href="https://github.com/milvus-io/milvus/pull/45051">#45051</a>)</li>
<li>Handled json field default values in storage layer (<a href="https://github.com/milvus-io/milvus/pull/45009">#45009</a>)</li>
<li>Double-checked to avoid iter being erased by other thread (<a href="https://github.com/milvus-io/milvus/pull/45015">#45015</a>)</li>
<li>Fixed bug for gis function to filter geometry (<a href="https://github.com/milvus-io/milvus/pull/44967">#44967</a>)</li>
</ul>
<h2 id="v265" class="common-anchor-header">v2.6.5<button data-href="#v265" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: November 11, 2025</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.5</td><td>2.6.3</td><td>2.6.4</td><td>2.6.7</td><td>2.6.1</td></tr>
</tbody>
</table>
<p>We are excited to announce the release of Milvus 2.6.5, which addresses a <strong>critical security vulnerability</strong> <a href="https://github.com/milvus-io/milvus/security/advisories/GHSA-mhjq-8c7m-3f7p">CVE-2025-64513</a> and upgraded to Go 1.24.9. We strongly encourage <strong>all Milvus 2.6.x users to upgrade to 2.6.5</strong> as soon as possible. This update also includes several other improvements and bug fixes, and provides the users a more robust and efficient experience.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Updated builder image tag upgrading go1.24.9 (<a href="https://github.com/milvus-io/milvus/pull/45398">#45398</a>)</li>
<li>Skipped check source id (<a href="https://github.com/milvus-io/milvus/pull/45379">#45379</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Group value is nil (<a href="https://github.com/milvus-io/milvus/pull/45421">#45421</a>)</li>
<li>Initialized timestamp range in composite binlog writer  (<a href="https://github.com/milvus-io/milvus/pull/45402">#45402</a>)</li>
<li>Handled empty fieldsdata in reduce/rerank for requery scenario  (<a href="https://github.com/milvus-io/milvus/pull/45389">#45389</a>)</li>
<li>Added null check for packed_writer_ in jsonstatsparquetwrite… (<a href="https://github.com/milvus-io/milvus/pull/45376">#45376</a>)</li>
<li>Skipped building text index for newly added columns (<a href="https://github.com/milvus-io/milvus/pull/45358">#45358</a>)</li>
<li>Accidentally ignored sealed segments in l0 compaction (<a href="https://github.com/milvus-io/milvus/pull/45351">#45351</a>)</li>
<li>Moved finishload before text index creation to ensure raw data availability (<a href="https://github.com/milvus-io/milvus/pull/45336">#45336</a>)</li>
<li>Supported json default value in compaction (<a href="https://github.com/milvus-io/milvus/pull/45332">#45332</a>)</li>
<li>Updated milvus-storage to fix duplicate aws sdk initialization  (<a href="https://github.com/milvus-io/milvus/pull/45075">#45075</a>)</li>
</ul>
<h2 id="v264" class="common-anchor-header">v2.6.4<button data-href="#v264" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: October 21, 2025</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.4</td><td>2.6.3</td><td>2.6.1</td><td>2.6.6</td><td>2.6.1</td></tr>
</tbody>
</table>
<p>We are excited to announce the release of Milvus 2.6.4, featuring a range of powerful new capabilities, performance enhancements, and essential bug fixes. This update introduces important features such as Struct in ARRAY for advanced data modeling. Additionally, we have enabled JSON Shredding by default, further improving query performance and efficiency. Several critical bugs have also been addressed to ensure greater stability and reliability. With this release, Milvus continues to provide a more robust and efficient experience for all users. Below are the key highlights of this release.</p>
<h3 id="Features" class="common-anchor-header">Features<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Struct in ARRAY:  Milvus introduced the new data type, Struct, allowing users to organize and manage multiple related fields within a single entity. Currently, Struct can only be used as an element under DataType.ARRAY, enabling features like Array of Vector, where each row contains multiple vectors, opening up new possibilities for complex data modeling and search. (<a href="https://github.com/milvus-io/milvus/pull/42148">#42148</a>)</li>
<li>Supported Qwen GTE-rerank-v2 model in DashScope (<a href="https://github.com/milvus-io/milvus/pull/44660">#44660</a>)</li>
<li>Supported AISAQ index - an all in storage index (<a href="https://github.com/zilliztech/knowhere/pull/1282">#1282</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li><strong>Upgraded Go version to 1.24.6</strong> with image builder (<a href="https://github.com/milvus-io/milvus/pull/44763">#44763</a>)</li>
<li>Enabled default JSON Shredding (<a href="https://github.com/milvus-io/milvus/pull/44811">#44811</a>)</li>
<li>Added disk quota for loaded binlog size to prevent query node load failures (<a href="https://github.com/milvus-io/milvus/pull/44932">#44932</a>)</li>
<li>Enabled mmap support for struct array in MemVectorIndex (<a href="https://github.com/milvus-io/milvus/pull/44832">#44832</a>)</li>
<li>Added caching layer management for TextMatchIndex (<a href="https://github.com/milvus-io/milvus/pull/44768">#44768</a>)</li>
<li>Optimized bitmap reverse lookup performance  (<a href="https://github.com/milvus-io/milvus/pull/44838">#44838</a>)</li>
<li>Updated Knowhere version (<a href="https://github.com/milvus-io/milvus/pull/44707">#44707</a> <a href="https://github.com/milvus-io/milvus/pull/44765">#44765</a>)</li>
<li>Removed logical usage checks during segment loading (<a href="https://github.com/milvus-io/milvus/pull/44770">#44770</a>)</li>
<li>Added access log field for template value length information (<a href="https://github.com/milvus-io/milvus/pull/44783">#44783</a>)</li>
<li>Allowed overwriting current index type during index build (<a href="https://github.com/milvus-io/milvus/pull/44754">#44754</a>)</li>
<li>Added load parameters for vector index (<a href="https://github.com/milvus-io/milvus/pull/44749">#44749</a>)</li>
<li>Unified compaction executor task state management (<a href="https://github.com/milvus-io/milvus/pull/44722">#44722</a>)</li>
<li>Added refined logs for task scheduler in QueryCoord (<a href="https://github.com/milvus-io/milvus/pull/44725">#44725</a>)</li>
<li>Ensured accesslog.$consistency_level represents actual value used  (<a href="https://github.com/milvus-io/milvus/pull/44711">#44711</a>)</li>
<li>Removed redundant channel manager from datacoord (<a href="https://github.com/milvus-io/milvus/pull/44679">#44679</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Removed GCC from build Dockerfile to fix CVE (<a href="https://github.com/milvus-io/milvus/pull/44882">#44882</a>)</li>
<li>Ensured deterministic search result ordering when scores are equal (<a href="https://github.com/milvus-io/milvus/pull/44884">#44884</a>)</li>
<li>Reranked before requery if reranker didn’t use field data (<a href="https://github.com/milvus-io/milvus/pull/44943">#44943</a>)</li>
<li>Ensured promise fulfillment when CreateArrowFileSystem throws an exception (<a href="https://github.com/milvus-io/milvus/pull/44976">#44976</a>)</li>
<li>Fixed missing disk encryption config (<a href="https://github.com/milvus-io/milvus/pull/44839">#44839</a>)</li>
<li>Fixed deactivate balance checker causing balance stop issue (<a href="https://github.com/milvus-io/milvus/pull/44836">#44836</a>)</li>
<li>Fixed issue where “not equal” doesn’t include “none”  (<a href="https://github.com/milvus-io/milvus/pull/44960">#44960</a>)</li>
<li>Supported JSON default value in CreateArrowScalarFromDefaultValue (<a href="https://github.com/milvus-io/milvus/pull/44952">#44952</a>)</li>
<li>Used short debug string to avoid newlines in debug logs (<a href="https://github.com/milvus-io/milvus/pull/44929">#44929</a>)</li>
<li>Fixed exists expression for JSON flat index (<a href="https://github.com/milvus-io/milvus/pull/44951">#44951</a>)</li>
<li>Unified JSON exists path semantics (<a href="https://github.com/milvus-io/milvus/pull/44926">#44926</a>)</li>
<li>Fixed panic caused by empty internal insert message (<a href="https://github.com/milvus-io/milvus/pull/44906">#44906</a>)</li>
<li>Updated AI/SAQ parameters (<a href="https://github.com/milvus-io/milvus/pull/44862">#44862</a>)</li>
<li>Removed limit on deduplication when autoindex is disabled (<a href="https://github.com/milvus-io/milvus/pull/44824">#44824</a>)</li>
<li>Avoided concurrent reset/add operations on DataCoord metrics (<a href="https://github.com/milvus-io/milvus/pull/44815">#44815</a>)</li>
<li>Fixed bug in JSON_contains(path, int) (<a href="https://github.com/milvus-io/milvus/pull/44818">#44818</a>)</li>
<li>Avoided eviction in caching layer during JSON handling (<a href="https://github.com/milvus-io/milvus/pull/44813">#44813</a>)</li>
<li>Fixed wrong results from the exp filter when skipped (<a href="https://github.com/milvus-io/milvus/pull/44779">#44779</a>)</li>
<li>Checked if query node is SQN with label and streaming node list (<a href="https://github.com/milvus-io/milvus/pull/44793">#44793</a>)</li>
<li>Fixed BM25 with boost returning unordered results (<a href="https://github.com/milvus-io/milvus/pull/44759">#44759</a>)</li>
<li>Fixed bulk import with auto ID (<a href="https://github.com/milvus-io/milvus/pull/44694">#44694</a>)</li>
<li>Passed file system via FileManagerContext when loading index (<a href="https://github.com/milvus-io/milvus/pull/44734">#44734</a>)</li>
<li>Used “eventually” and fixed task ID appearing in both executing and completed states (<a href="https://github.com/milvus-io/milvus/pull/44715">#44715</a>)</li>
<li>Removed incorrect start time tick to avoid filtering DMLs with timeticks less than it (<a href="https://github.com/milvus-io/milvus/pull/44692">#44692</a>)</li>
<li>Made AWS credential provider a singleton (<a href="https://github.com/milvus-io/milvus/pull/44705">#44705</a>)</li>
<li>Disabled shredding for JSON path containing digits (<a href="https://github.com/milvus-io/milvus/pull/44808">#44808</a>)</li>
<li>Fixed valid unit test for TestUnaryRangeJsonNullable (<a href="https://github.com/milvus-io/milvus/pull/44990">#44990</a>)</li>
<li>Fixed unit tests and removed file system fallback logic (<a href="https://github.com/milvus-io/milvus/pull/44686">#44686</a>)</li>
</ul>
<h2 id="v263" class="common-anchor-header">v2.6.3<button data-href="#v263" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: October 11, 2025</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.3</td><td>2.6.2</td><td>2.6.1</td><td>2.6.5</td><td>2.6.1</td></tr>
</tbody>
</table>
<p>We are pleased to announce the release of Milvus 2.6.3, which introduces a variety of exciting new features, improvements, and critical bug fixes. This version enhances system performance, expands functionality, and fixes key issues, providing a more stable experience for all users. Below are the highlights of this release:</p>
<h3 id="New-Features" class="common-anchor-header">New Features<button data-href="#New-Features" class="anchor-icon" translate="no">
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
<li>Primary Key with AutoID Enabled: Users can now write the primary key field when <code translate="no">autoid</code> is enabled. (<a href="https://github.com/milvus-io/milvus/pull/44424">#44424</a> <a href="https://github.com/milvus-io/milvus/pull/44530">#44530</a>)</li>
<li>Manual Compaction for L0 Segments: Added support for manually compacting L0 segments. (<a href="https://github.com/milvus-io/milvus/pull/44440">#44440</a>)</li>
<li>Cluster ID Encoding in AutoID: Auto-generated IDs will now include the cluster ID. (<a href="https://github.com/milvus-io/milvus/pull/44471">#44471</a>)</li>
<li>gRPC Tokenizer Support: Integration of gRPC tokenizer for enhanced query flexibility. (<a href="https://github.com/milvus-io/milvus/pull/41994">#41994</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Refined the balance checker by implementing a priority queue, improving task distribution. (<a href="https://github.com/milvus-io/milvus/pull/43992">#43992</a>)</li>
<li>Preloaded BM25 stats for sealed segments and optimized serialization. (<a href="https://github.com/milvus-io/milvus/pull/44279">#44279</a>)</li>
<li>Nullable fields can now be used as input for BM25 functions. (<a href="https://github.com/milvus-io/milvus/pull/44586">#44586</a>)</li>
<li>Added support for Azure Blob Storage in Woodpecker. (<a href="https://github.com/milvus-io/milvus/pull/44592">#44592</a>)</li>
<li>Purged small files right after Woodpecker segment compaction. (<a href="https://github.com/milvus-io/milvus/pull/44473">#44473</a>)</li>
<li>Enabled random score functionality for boosting queries. (<a href="https://github.com/milvus-io/milvus/pull/44214">#44214</a>)</li>
<li>New configuration options for the <code translate="no">int8</code> vector type in autoindexing. (<a href="https://github.com/milvus-io/milvus/pull/44554">#44554</a>)</li>
<li>Added parameter items to control hybrid search requery policy. (<a href="https://github.com/milvus-io/milvus/pull/44466">#44466</a>)</li>
<li>Added support for controlling the insertion of function output fields. (<a href="https://github.com/milvus-io/milvus/pull/44162">#44162</a>)</li>
<li>The decay function now supports configurable score merging for better performance. (<a href="https://github.com/milvus-io/milvus/pull/44066">#44066</a>)</li>
<li>Improved the performance of binary search on strings. (<a href="https://github.com/milvus-io/milvus/pull/44469">#44469</a>)</li>
<li>Introduced support for sparse filters in queries.  (<a href="https://github.com/milvus-io/milvus/pull/44347">#44347</a>)</li>
<li>Various updates to enhance tiered index functionality. (<a href="https://github.com/milvus-io/milvus/pull/44433">#44433</a>)</li>
<li>Added storage resource usage tracking for scalar and vector searches. (<a href="https://github.com/milvus-io/milvus/pull/44414">#44414</a> <a href="https://github.com/milvus-io/milvus/pull/44308">#44308</a>)</li>
<li>Add storage usage for delete/upsert/restful (<a href="https://github.com/milvus-io/milvus/pull/44512">#44512</a>)</li>
<li>Enabled granular flush targets for <code translate="no">flushall</code> operations. (<a href="https://github.com/milvus-io/milvus/pull/44234">#44234</a>)</li>
<li>Datanodes will now use a non-singleton file system for better resource management. (<a href="https://github.com/milvus-io/milvus/pull/44418">#44418</a>)</li>
<li>Added configuration options for batch processing in metadata.  (<a href="https://github.com/milvus-io/milvus/pull/44645">#44645</a>)</li>
<li>Error messages now include the database name for better clarity. (<a href="https://github.com/milvus-io/milvus/pull/44618">#44618</a>)</li>
<li>Moved tracer test to the <code translate="no">milvus-common</code> repository for better modularization. (<a href="https://github.com/milvus-io/milvus/pull/44605">#44605</a>)</li>
<li>Moved C API unit test files aside to <code translate="no">src</code> directory for better organization. (<a href="https://github.com/milvus-io/milvus/pull/44458">#44458</a>)</li>
<li>Go SDK now allows users to insert primary key data if <code translate="no">autoid</code> is enabled. (<a href="https://github.com/milvus-io/milvus/pull/44561">#44561</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Resolved CVE-2020-25576 and WS-2023-0223 vulnerabilities. (<a href="https://github.com/milvus-io/milvus/pull/44163">#44163</a>)</li>
<li>Fixed an issue where logical resources were used for metrics in the quota center on streaming nodes. (<a href="https://github.com/milvus-io/milvus/pull/44613">#44613</a>)</li>
<li>Set <code translate="no">mixcoord</code> in <code translate="no">activatefunc</code> when enabling standby. (<a href="https://github.com/milvus-io/milvus/pull/44621">#44621</a>)</li>
<li>Removed redundant initialization of storage V2 components. <a href="https://github.com/milvus-io/milvus/pull/44597">#44597</a>)</li>
<li>Fixed compaction task blocking due to executor loop exit. (<a href="https://github.com/milvus-io/milvus/pull/44543">#44543</a>)</li>
<li>Refunded loaded resource usage in the <code translate="no">insert/deleterecord</code> destructor. (<a href="https://github.com/milvus-io/milvus/pull/44555">#44555</a>)</li>
<li>Fixed an issue where the replicator could not stop and enhanced the replicate config validator. (<a href="https://github.com/milvus-io/milvus/pull/44531">#44531</a>)</li>
<li>Set <code translate="no">mmap_file_raii</code>_ to <code translate="no">nullptr</code> when mmap is disabled. (<a href="https://github.com/milvus-io/milvus/pull/44516">#44516</a>)</li>
<li>Made <code translate="no">diskfilemanager</code> use the file system from the context. (<a href="https://github.com/milvus-io/milvus/pull/44535">#44535</a>)</li>
<li>Forced virtual host for OSS and COS in storage V2. (<a href="https://github.com/milvus-io/milvus/pull/44484">#44484</a>)</li>
<li>Set <code translate="no">report_value</code> default value when <code translate="no">extrainfo</code> is not <code translate="no">nil</code> for compatibility. (<a href="https://github.com/milvus-io/milvus/pull/44529">#44529</a>)</li>
<li>Cleaned up collection metrics after dropping collections in rootcoord. (<a href="https://github.com/milvus-io/milvus/pull/44511">#44511</a>)</li>
<li>Fixed segment loading failure due to duplicate field <code translate="no">mmap.enable</code> properties. (<a href="https://github.com/milvus-io/milvus/pull/44465">#44465</a>)</li>
<li>Fixed load config parsing errors for dynamic replicas. (<a href="https://github.com/milvus-io/milvus/pull/44430">#44430</a>)</li>
<li>Handled row-to-column input for dynamic columns in Go SDK. (<a href="https://github.com/milvus-io/milvus/pull/44626">#44626</a>)</li>
</ul>
<h2 id="v262" class="common-anchor-header">v2.6.2<button data-href="#v262" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: September 19, 2025</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.2</td><td>2.6.2</td><td>2.6.0</td><td>2.6.4</td><td>2.6.1</td></tr>
</tbody>
</table>
<p>We’re excited to announce the release of Milvus 2.6.2! This update introduces powerful new features, significant performance enhancements, and critical fixes that make the system more stable and production-ready. Highlights include partial field updates with upsert, JSON Shredding to accelerate dynamic field filtering, NGram indexing for faster LIKE queries, and more flexible schema evolution on existing collections. Built on community feedback, this release delivers a stronger foundation for real-world deployments, and we encourage all users to upgrade to take advantage of these improvements.</p>
<h3 id="Features" class="common-anchor-header">Features<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Added support for JSON Shredding to accelerate dynamic field filtering. For details, refer to <a href="/docs/id/v2.6.x/json-shredding.md">JSON Shredding</a>.</li>
<li>Added support for NGRAM Index to accelerate like operation. For details, refer to <a href="/docs/id/v2.6.x/ngram.md">NGRAM</a>.</li>
<li>Added support for partial field updates with upsert API. For details, refer to <a href="/docs/id/v2.6.x/upsert-entities.md">Upsert Entities</a>.</li>
<li>Added support for Boost Function. For details, refer to <a href="/docs/id/v2.6.x/boost-ranker.md">Boost Ranker</a>.</li>
<li>Added support for group by JSON fields and dynamic fields (<a href="https://github.com/milvus-io/milvus/pull/43203">#43203</a>)</li>
<li>Added support for enabling dynamic schema on existing collections (<a href="https://github.com/milvus-io/milvus/pull/44151">#44151</a>)</li>
<li>Added support for dropping indexes without releasing collections (<a href="https://github.com/milvus-io/milvus/pull/42941">#42941</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>[StorageV2] Changed log file size to compressed size (<a href="https://github.com/milvus-io/milvus/pull/44402">#44402</a>)</li>
<li>[StorageV2] Added child fields in load info (<a href="https://github.com/milvus-io/milvus/pull/44384">#44384</a>)</li>
<li>[StorageV2] Added support for including partition and clustering keys in system group (<a href="https://github.com/milvus-io/milvus/pull/44372">#44372</a>)</li>
<li>Removed timeout for compaction tasks (<a href="https://github.com/milvus-io/milvus/pull/44277">#44277</a>)</li>
<li>[StorageV2] Enabled build with Azure (<a href="https://github.com/milvus-io/milvus/pull/44177">#44177</a>)</li>
<li>[StorageV2] Utilized group info for estimating logic usage (<a href="https://github.com/milvus-io/milvus/pull/44356">#44356</a>)</li>
<li>[StorageV2] Utilized group split info to estimate usage (<a href="https://github.com/milvus-io/milvus/pull/44338">#44338</a>)</li>
<li>[StorageV2] Saved column group results in compaction (<a href="https://github.com/milvus-io/milvus/pull/44327">#44327</a>)</li>
<li>[StorageV2] Added configurations for size-based split policy (<a href="https://github.com/milvus-io/milvus/pull/44301">#44301</a>)</li>
<li>[StorageV2] Added support for schema-based and size-based split policy (<a href="https://github.com/milvus-io/milvus/pull/44282">#44282</a>)</li>
<li>[StorageV2] Added configurable split policy (<a href="https://github.com/milvus-io/milvus/pull/44258">#44258</a>)</li>
<li>[CachingLayer] Added more metrics and configurations (<a href="https://github.com/milvus-io/milvus/pull/44276">#44276</a>)</li>
<li>Added support for waiting for all indices to be ready before loading segments (<a href="https://github.com/milvus-io/milvus/pull/44313">#44313</a>)</li>
<li>Added internal core latency metric for rescore node (<a href="https://github.com/milvus-io/milvus/pull/44010">#44010</a>)</li>
<li>Optimized access log format when printing KV params (<a href="https://github.com/milvus-io/milvus/pull/43742">#43742</a>)</li>
<li>Added configuration to modify dump snapshot batch size (<a href="https://github.com/milvus-io/milvus/pull/44215">#44215</a>)</li>
<li>Reduced compaction task cleanup interval (<a href="https://github.com/milvus-io/milvus/pull/44207">#44207</a>)</li>
<li>Enhanced merge sort to support multiple fields (<a href="https://github.com/milvus-io/milvus/pull/44191">#44191</a>)(<a href="https://github.com/milvus-io/milvus/pull/43994">#43994</a>)</li>
<li>Added load resource estimation for tiered index (<a href="https://github.com/milvus-io/milvus/pull/44171">#44171</a>)</li>
<li>Added autoindex config for deduplication case (<a href="https://github.com/milvus-io/milvus/pull/44186">#44186</a>)</li>
<li>Added configuration to allow custom characters in names  (<a href="https://github.com/milvus-io/milvus/pull/44063">#44063</a>)</li>
<li>Added support for cchannel for streaming service (<a href="https://github.com/milvus-io/milvus/pull/44143">#44143</a>)</li>
<li>Added mutex and range check to guard concurrent deletions (<a href="https://github.com/milvus-io/milvus/pull/44128">#44128</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Aligned the behavior of exists expressions between brute force and index (<a href="https://github.com/milvus-io/milvus/pull/44030">#44030</a>)</li>
<li>Fixed error on renaming to a dropped collection (<a href="https://github.com/milvus-io/milvus/pull/44436">#44436</a>)</li>
<li>[StorageV2] Checked child fields length (<a href="https://github.com/milvus-io/milvus/pull/44405">#44405</a>)</li>
<li>[StorageV2] Turned on Azure by default (<a href="https://github.com/milvus-io/milvus/pull/44377">#44377</a>)</li>
<li>Corrected upload path of L0 compactions under pooling datanodes (<a href="https://github.com/milvus-io/milvus/pull/44374">#44374</a>)</li>
<li>Disallowed renaming if database encryption is enabled (<a href="https://github.com/milvus-io/milvus/pull/44225">#44225</a>)</li>
<li>Disallowed deletion of dynamicfield.enable property (<a href="https://github.com/milvus-io/milvus/pull/44335">#44335</a>)</li>
<li>Marked tasks as failed when pre-allocated ID is invalid (<a href="https://github.com/milvus-io/milvus/pull/44350">#44350</a>)</li>
<li>Skipped MVCC checks on PK compare expressions (<a href="https://github.com/milvus-io/milvus/pull/44353">#44353</a>)</li>
<li>Fixed json_contains bug for stats (<a href="https://github.com/milvus-io/milvus/pull/44325">#44325</a>)</li>
<li>Added initialization filesystem check for query node and streaming node (<a href="https://github.com/milvus-io/milvus/pull/44360">#44360</a>)</li>
<li>Fixed empty compaction target when segment was garbage collected (<a href="https://github.com/milvus-io/milvus/pull/44270">#44270</a>)</li>
<li>Fixed race condition when initializing timestamp index (<a href="https://github.com/milvus-io/milvus/pull/44317">#44317</a>)</li>
<li>Checked if arraydata is nil to prevent panic (<a href="https://github.com/milvus-io/milvus/pull/44332">#44332</a>)</li>
<li>Fixed build JSON stats bug for nested objects (<a href="https://github.com/milvus-io/milvus/pull/44303">#44303</a>)</li>
<li>Avoided mmap rewrite by multiple JSON fields (<a href="https://github.com/milvus-io/milvus/pull/44299">#44299</a>)</li>
<li>Unified valid data formats (<a href="https://github.com/milvus-io/milvus/pull/44296">#44296</a>)</li>
<li>Hid credentials of embedding/reranking providers in web UI (<a href="https://github.com/milvus-io/milvus/pull/44275">#44275</a>)</li>
<li>Corrected statslog path under pooling datanodes (<a href="https://github.com/milvus-io/milvus/pull/44288">#44288</a>)</li>
<li>Corrected path of IDF oracle (<a href="https://github.com/milvus-io/milvus/pull/44266">#44266</a>)</li>
<li>Used recovery snapshot checkpoint if no vchannel is recovering (<a href="https://github.com/milvus-io/milvus/pull/44246">#44246</a>)</li>
<li>Limited column number in JSON stats (<a href="https://github.com/milvus-io/milvus/pull/44233">#44233</a>)</li>
<li>Made load resource count n-gram index (<a href="https://github.com/milvus-io/milvus/pull/44237">#44237</a>)</li>
<li>Deduced metric type from non-empty search results (<a href="https://github.com/milvus-io/milvus/pull/44222">#44222</a>)</li>
<li>Fixed multi-segment write only writing one segment (<a href="https://github.com/milvus-io/milvus/pull/44256">#44256</a>)</li>
<li>Fixed merge sort out of range (<a href="https://github.com/milvus-io/milvus/pull/44230">#44230</a>)</li>
<li>Added UTF-8 check before executing BM25 function (<a href="https://github.com/milvus-io/milvus/pull/44220">#44220</a>)</li>
<li>Retried old session if it exists (<a href="https://github.com/milvus-io/milvus/pull/44208">#44208</a>)</li>
<li>Added Kafka buffer size limit to prevent datanode OOM (<a href="https://github.com/milvus-io/milvus/pull/44106">#44106</a>)</li>
<li>Fixed panic by extending lock guarding range (<a href="https://github.com/milvus-io/milvus/pull/44130">#44130</a>)</li>
<li>Fixed growing segments not being flushed on schema change (<a href="https://github.com/milvus-io/milvus/pull/44412">#44412</a>)</li>
<li>[StorageV2] Handled IO errors (<a href="https://github.com/milvus-io/milvus/pull/44255">#44255</a>)</li>
<li>Prevented panic if Tantivy index path does not exist (<a href="https://github.com/milvus-io/milvus/pull/44135">#44135</a>)</li>
</ul>
<h2 id="v261" class="common-anchor-header">v2.6.1<button data-href="#v261" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: September 3, 2025</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.1</td><td>2.6.1</td><td>2.6.0</td><td>2.6.3</td><td>2.6.1</td></tr>
</tbody>
</table>
<p>We are excited to announce the release of Milvus 2.6.1! This version builds upon the major architectural advancements of previous releases, delivering critical enhancements focused on production stability, performance, and operational robustness. This release addresses key community feedback and strengthens the system for large-scale deployments. We strongly encourage all users to upgrade to benefit from a more stable, performant, and reliable system.</p>
<h3 id="Improvements" class="common-anchor-header">Improvements<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Supports POSIX-compatible file systems for remote storage (<a href="https://github.com/milvus-io/milvus/pull/43944">#43944</a>)</li>
<li>Introduces model-based rerankers (<a href="https://github.com/milvus-io/milvus/pull/43270">#43270</a>)</li>
<li>Optimizes the performance of comparison expressions on primary key fields (<a href="https://github.com/milvus-io/milvus/pull/43154">#43154</a>)</li>
<li>Collects doc_id from posting list directly to accelerate text match (<a href="https://github.com/milvus-io/milvus/pull/43899">#43899</a>)</li>
<li>Optimizes query performance by converting multiple != conditions into a single NOT IN clause (<a href="https://github.com/milvus-io/milvus/pull/43690">#43690</a>)</li>
<li>Enhances resource management for the caching layer during segment loading (<a href="https://github.com/milvus-io/milvus/pull/43846">#43846</a>)</li>
<li>Improves memory estimation for interim indexes during data loading (<a href="https://github.com/milvus-io/milvus/pull/44104">#44104</a>)</li>
<li>Makes the build ratio for interim indexes configurable (<a href="https://github.com/milvus-io/milvus/pull/43939">#43939</a>)</li>
<li>Adds a configurable write rate limit to the disk writer (<a href="https://github.com/milvus-io/milvus/pull/43912">#43912</a>)</li>
<li>SegCore parameters can now be updated dynamically without restarting the Milvus service (<a href="https://github.com/milvus-io/milvus/pull/43231">#43231</a>)</li>
<li>Adds unified gRPC latency metrics for better observability (<a href="https://github.com/milvus-io/milvus/pull/44089">#44089</a>)</li>
<li>Includes client request timestamps in gRPC headers to simplify debugging (<a href="https://github.com/milvus-io/milvus/pull/44059">#44059</a>)</li>
<li>Supports trace log level for segcore (<a href="https://github.com/milvus-io/milvus/pull/44003">#44003</a>)</li>
<li>Adds a configurable switch to adjust consistency guarantees for higher availability (<a href="https://github.com/milvus-io/milvus/pull/43874">#43874</a>)</li>
<li>Implements a robust rewatch mechanism to handle etcd connection failures (<a href="https://github.com/milvus-io/milvus/pull/43829">#43829</a>)</li>
<li>Improves the internal node health check logic (<a href="https://github.com/milvus-io/milvus/pull/43768">#43768</a>)</li>
<li>Optimizes metadata access when listing collections (<a href="https://github.com/milvus-io/milvus/pull/43902">#43902</a>)</li>
<li>Upgrades the Pulsar client to v0.15.1 official version and adds more logging (<a href="https://github.com/milvus-io/milvus/pull/43913">#43913</a>)</li>
<li>Upgrades aws-sdk from 1.9.234 to 1.11.352 (<a href="https://github.com/milvus-io/milvus/pull/43916">#43916</a>)</li>
<li>Supports dynamic interval updates for ticker components (<a href="https://github.com/milvus-io/milvus/pull/43865">#43865</a>)</li>
<li>Improves auto-detection of ARM SVE instruction sets for bitset operations (<a href="https://github.com/milvus-io/milvus/pull/43833">#43833</a>)</li>
<li>Improves the error message when a text or phrase match fails (<a href="https://github.com/milvus-io/milvus/pull/43366">#43366</a>)</li>
<li>Improves the error message for vector dimension mismatches (<a href="https://github.com/milvus-io/milvus/pull/43835">#43835</a>)</li>
<li>Improves error reporting for append timeouts when the object store is unavailable (<a href="https://github.com/milvus-io/milvus/pull/43926">#43926</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Fixes a potential Out-Of-Memory (OOM) issue during Parquet file imports (<a href="https://github.com/milvus-io/milvus/pull/43756">#43756</a>)</li>
<li>Fixes an issue where standby nodes could not recover if their lease expired (<a href="https://github.com/milvus-io/milvus/pull/44112">#44112</a>)</li>
<li>Handles compaction retry state correctly (<a href="https://github.com/milvus-io/milvus/pull/44119">#44119</a>)</li>
<li>Fixes a potential deadlock between continuous read requests and index loading that could prevent index loading (<a href="https://github.com/milvus-io/milvus/pull/43937">#43937</a>)</li>
<li>Fixes a bug that could cause data deletions to fail in high-concurrency scenarios (<a href="https://github.com/milvus-io/milvus/pull/43831">#43831</a>)</li>
<li>Fixes a potential race condition when loading text and JSON indexes (<a href="https://github.com/milvus-io/milvus/pull/43811">#43811</a>)</li>
<li>Fixes a node status inconsistency that could occur after a QueryCoord restart (<a href="https://github.com/milvus-io/milvus/pull/43941">#43941</a>)</li>
<li>Ensures that a “dirty” QueryNode is properly cleaned up after a restart (<a href="https://github.com/milvus-io/milvus/pull/43909">#43909</a>)</li>
<li>Fixes an issue where the retry state was not handled correctly for requests with non-empty payloads (<a href="https://github.com/milvus-io/milvus/pull/44068">#44068</a>)</li>
<li>Fixes an issue where the bulk writer v2 did not use the correct bucket name (<a href="https://github.com/milvus-io/milvus/pull/44083">#44083</a>)</li>
<li>Enhances security by hiding sensitive items from the RESTful get_configs endpoint (<a href="https://github.com/milvus-io/milvus/pull/44057">#44057</a>)</li>
<li>Ensures that object uploads for woodpecker are idempotent during timeout retries (<a href="https://github.com/milvus-io/milvus/pull/43947">#43947</a>)</li>
<li>Disallows importing null elements in array fields from Parquet files (<a href="https://github.com/milvus-io/milvus/pull/43964">#43964</a>)</li>
<li>Fixes a bug where the proxy cache was not invalidated after creating a collection alias (<a href="https://github.com/milvus-io/milvus/pull/43854">#43854</a>)</li>
<li>Improves the internal service discovery mechanism for streaming nodes (<a href="https://github.com/milvus-io/milvus/pull/44033">#44033</a>)</li>
<li>Fixes resource group logic to correctly filter streaming nodes (<a href="https://github.com/milvus-io/milvus/pull/43984">#43984</a>)</li>
<li>Adds the databaseName label to metrics to prevent naming conflicts in multi-database environments (<a href="https://github.com/milvus-io/milvus/pull/43808">#43808</a>)</li>
<li>Fixes a logic error in internal task state handling (<a href="https://github.com/milvus-io/milvus/pull/43777">#43777</a>)</li>
<li>Optimizes the initialization timing of the internal metrics to avoid potential panic (<a href="https://github.com/milvus-io/milvus/pull/43773">#43773</a>)</li>
<li>Fixes a rare potential crash in the internal HTTP server (<a href="https://github.com/milvus-io/milvus/pull/43799">#43799</a>)</li>
</ul>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: August 6, 2025</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.0</td><td>2.6.0</td><td>2.6.0</td><td>2.6.1</td><td>2.6.0</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0 is officially released! Building upon the architectural foundation laid in <a href="#v260-rc1">2.6.0-rc1</a>, this production-ready version addresses numerous stability and performance issues while introducing powerful new capabilities including Storage Format V2, advanced JSON processing, and enhanced search features. With extensive bug fixes and optimizations based on community feedback during the RC phase, Milvus 2.6.0 is ready for you to explore and adopt.</p>
<p>Direct upgrade from pre-2.6.0 versions is not supported due to architectural changes. Please follow our <a href="/docs/id/v2.6.x/upgrade_milvus_cluster-operator.md">upgrade guide</a>.</p>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">What’s new in 2.6.0 (since RC)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">Optimized storage format v2</h4><p>To address the challenges of mixed scalar and vector data storage, especially point lookups on unstructured data, Milvus 2.6 introduces Storage Format V2. This new adaptive columnar storage format adopts a “narrow column merging + wide column independence” layout strategy, fundamentally solving the performance bottlenecks when handling point lookups and small-batch retrievals in vector databases.</p>
<p>The new format now supports efficient random access without I/O amplification and achieves up to 100x performance gains compared to the vanilla Parquet format adopted previously, making it ideal for AI workloads requiring both analytical processing and precise vector retrieval. Additionally, it can reduce file count by up to 98% for typical workloads. Memory consumption for major compaction is reduced by 300%, and I/O operations are optimized by up to 80% for reads and more than 600% for writes.</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">JSON flat index (beta)</h4><p>Milvus 2.6 introduces JSON Flat Index to handle highly dynamic JSON schemas. Unlike JSON Path Index which requires pre-declaring specific paths and their expected types, JSON Flat Index automatically discovers and indexes all nested structures under a given path. When indexing a JSON field, it recursively flattens the entire subtree, creating inverted index entries for every path-value pair it encounters, regardless of depth or type.
This automatic flattening makes JSON Flat Index ideal for evolving schemas where new fields appear without warning. For instance, if you index a “metadata” field, the system will automatically handle new nested fields like “metadata.version2.features.experimental” as they appear in incoming data, without requiring new index configuration.</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">Core 2.6.0 features recall<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>For detailed information about architecture changes and features introduced in 2.6.0-RC, see <a href="#v260-rc1">2.6.0-rc1 Release Note</a>.</p>
<h4 id="Architecture-simplification" class="common-anchor-header">Architecture simplification</h4><ul>
<li>Streaming Node (GA) - Centralized WAL management</li>
<li>Native WAL with Woodpecker - Removed Kafka/Pulsar dependency</li>
<li>Unified coordinators (MixCoord); Merged IndexNode and DataNode - Reduced component complexity</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">Search & analytics</h4><ul>
<li>RaBitQ 1-bit quantization with high recall</li>
<li>Phrase matching</li>
<li>MinHash LSH for deduplication</li>
<li>Time-aware ranking functions</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">Developer experience</h4><ul>
<li>Embedding functions for “data-in, data-out” workflow</li>
<li>Online schema evolution</li>
<li>INT8 vector support</li>
<li>Enhanced tokenizers for global language support</li>
<li>Cache layer with lazy loading - Process datasets larger than memory</li>
</ul>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: June 18, 2025</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>2.6.0-rc1</td><td>2.6.0b0</td><td>2.6.0-rc1</td><td>2.6.0</td><td>2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1 introduces a simplified, cloud-native architecture designed to improve operational efficiency, resource utilization, and total cost of ownership by reducing deployment complexity. This release adds new functionalities focused on performance, search, and development. Key features include high-precision 1-bit quantization (RaBitQ) and a dynamic cache layer for performance gains, near-duplicate detection with MinHash and precise phrase matching for advanced search, and automated embedding functions with online schema modification to enhance the developer’s experience.</p>
<p>This is a pre-release version of Milvus 2.6.0. To try out the latest features, install this version as a fresh deployment. Upgrading from Milvus v2.5.x or earlier to 2.6.0-rc1 is not supported.</p>
<h3 id="Architecture-Changes" class="common-anchor-header">Architecture Changes<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
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
    </button></h3><p>Since 2.6, Milvus introduces significant architectural changes aimed at improving performance, scalability, and ease of use. For more information, refer to <a href="/docs/id/v2.6.x/architecture_overview.md">Milvus Architecture Overview</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Streaming Node (GA)</h4><p>In previous versions, streaming data was written to the WAL by the Proxy, and read by the QueryNode and DataNode. This architecture made it difficult to achieve consensus on the write side, requiring complex logic on the read side. Additionally, the query delegator was located in the QueryNode, which hindered scalability. Milvus 2.5.0 introduced the Streaming Node, which becomes GA in version 2.6.0. This component is now responsible for all shard-level WAL read/write operations and also serves as the query delegator, resolving the aforementioned issues and enabling new optimizations.</p>
<p><strong>Important Upgrade Notice</strong>: Streaming Node is a significant architectural change, so a direct upgrade to Milvus 2.6.0-rc1 from previous versions is not supported.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">Woodpecker Native WAL</h4><p>Milvus previously relied on external systems like Kafka or Pulsar for its WAL. While functional, these systems added significant operational complexity and resource overhead, particularly for small to medium-sized deployments. In Milvus 2.6, these are replaced by Woodpecker, a purpose-built, cloud-native WAL system. Woodpecker is designed for object storage, supporting both local and object storage based zero-disk modes, simplifying operations while improving performance and scalability.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">DataNode and IndexNode Merge</h4><p>In Milvus 2.6, tasks such as compaction, bulk import, statistics collection, and index building are now managed by a unified scheduler. The data persistence function previously handled by the DataNode has been moved to the Streaming Node. To simplify deployment and maintenance, the IndexNode and DataNode have been merged into a single DataNode component. This consolidated node now executes all these critical tasks, reducing operational complexity and optimizing resource utilization.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Coordinator Merge into MixCoord</h4><p>The previous design with separate RootCoord, QueryCoord, and DataCoord modules introduced complexity in inter-module communication. To simplify the system design, these components have been merged into a single, unified coordinator called MixCoord. This consolidation reduces the complexity of distributed programming by replacing network-based communication with internal function calls, resulting in more efficient system operation and simplified development and maintenance.</p>
<h3 id="Key-Features" class="common-anchor-header">Key Features<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">RaBitQ 1-bit Quantization</h4><p>To handle large-scale datasets, 1-bit quantization is an effective technique for improving resource utilization and search performance. However, traditional methods can negatively impact recall. In collaboration with the original research authors, Milvus 2.6 introduces RaBitQ, a 1-bit quantization solution that maintains high recall accuracy while delivering the resource and performance benefits of 1-bit compression.</p>
<p>For more information, refer to <a href="/docs/id/v2.6.x/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">JSON Capability Enhancement</h4><p>Milvus 2.6 enhances its support for the JSON data type with the following improvements:</p>
<ul>
<li><strong>Performance</strong>: JSON Path Indexing is now officially supported, allowing the creation of inverted indexes on specific paths within JSON objects (e.g., <code translate="no">meta.user.location</code>). This avoids full object scans and improves the latency of queries with complex filters.</li>
<li><strong>Functionality</strong>: To support more complex filtering logic, this release adds support for <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code>, and <code translate="no">CAST</code> functions.
Looking ahead, our work on JSON support continues. We are excited to preview that upcoming official releases will feature even more powerful capabilities, such as <strong>JSON shredding</strong> and a <strong>JSON FLAT Index</strong>, designed to dramatically improve performance on highly nested JSON data.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Analyzer/Tokenizer Function Enhancement</h4><p>This release significantly enhances text processing capabilities with several updates to the Analyzer and Tokenizer:</p>
<ul>
<li>A new <a href="/docs/id/v2.6.x/analyzer-overview.md#Example-use">Run Analyzer</a> syntax is available to validate tokenizer configurations.</li>
<li>The <a href="/docs/id/v2.6.x/lindera-tokenizer.md">Lindera tokenizer</a> is integrated for improved support of Asian languages such as Japanese and Korean.</li>
<li>Row-level tokenizer selection is now supported, with the general-purpose <a href="/docs/id/v2.6.x/icu-tokenizer.md">ICU tokenizer</a> available as a fallback for multilingual scenarios.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">Data-in, Data-Out with Embedding Functions</h4><p>Milvus 2.6 introduces a “Data-in, Data-Out” capability that simplifies AI application development by integrating directly with third-party embedding models (e.g., from OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face). Users can now insert and query using raw text data, and Milvus will automatically call the specified model service to convert the text into vectors in real-time. This removes the need for a separate vector conversion pipeline.</p>
<p>For more information, refer to <a href="/docs/id/v2.6.x/embedding-function-overview.md">Embedding Function Overview</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">Phrase Match</h4><p>Phrase Match is a text search feature that returns results only when the exact sequence of words in a query appears consecutively and in the correct order within a document.</p>
<p><strong>Key Characteristics</strong>:</p>
<ul>
<li>Order-sensitive: The words must appear in the same order as in the query.</li>
<li>Consecutive match: The words must appear right next to each other, unless a slop value is used.</li>
<li>Slop (optional): A tunable parameter that allows for a small number of intervening words, enabling fuzzy phrase matching.</li>
</ul>
<p>For more information, refer to <a href="/docs/id/v2.6.x/phrase-match.md">Phrase Match</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">MinHash LSH Index (Beta)</h4><p>To address the need for data deduplication in model training, Milvus 2.6 adds support for MINHASH_LSH indexes. This feature provides a computationally efficient and scalable method for estimating Jaccard similarity between documents to identify near-duplicates. Users can generate MinHash signatures for their text documents during preprocessing and use the MINHASH_LSH index in Milvus to efficiently find similar content in large-scale datasets, improving data cleaning and model quality.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">Time-Aware Decay Functions</h4><p>Milvus 2.6 introduces time-aware decay functions to address scenarios where information value changes over time. During result re-ranking, users can apply exponential, Gaussian, or linear decay functions based on a timestamp field to adjust a document’s relevance score. This ensures that more recent content can be prioritized, which is critical for applications like news feeds, e-commerce, and an AI agent’s memory.</p>
<p>For more information, refer to <a href="/docs/id/v2.6.x/decay-ranker-overview.md">Decay Ranker Overview</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Add Field for Online Schema Evolution</h4><p>To provide greater schema flexibility, Milvus 2.6 now supports adding a new scalar field to an existing collection’s schema online. This avoids the need to create a new collection and perform a disruptive data migration when application requirements change.</p>
<p>For more information, refer to <a href="/docs/id/v2.6.x/add-fields-to-an-existing-collection.md">Add Fields to an Existing Collection</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">INT8 Vector Support</h4><p>In response to the growing use of quantized models that produce 8-bit integer embeddings, Milvus 2.6 adds native data type support for INT8 vectors. This allows users to ingest these vectors directly without de-quantization, saving computation, network bandwidth, and storage costs. This feature is initially supported for HNSW-family indexes.</p>
<p>For more information, refer to <a href="/docs/id/v2.6.x/dense-vector.md">Dense Vector</a>.</p>
