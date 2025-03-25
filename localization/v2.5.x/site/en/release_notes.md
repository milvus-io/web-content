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
<h2 id="v257" class="common-anchor-header">v2.5.7<button data-href="#v257" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: March 21, 2025</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Node.js SDK version</th><th>Java SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.5.7</td><td>2.5.6</td><td>2.5.6</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>We’re excited to announce the release of Milvus 2.5.7, highlighted by the newly introduced JSON Path Index feature. This allows you to build inverted indexes on dynamic or JSON columns to significantly improve query performance. Alongside this new functionality, we’ve made numerous enhancements and bug fixes for better reliability, more refined error handling, and improved usability. We encourage you to upgrade or try it out, and as always, your feedback is greatly appreciated as we continue to improve Milvus!</p>
<h3 id="Features" class="common-anchor-header">Features</h3><ul>
<li><strong>JSON Path Index</strong>: To address user needs for dynamic schemas, Milvus 2.5.7 introduces the ability to build indexes on dynamic columns and JSON columns. With this feature, you can create inverted indexes for specific dynamic columns or JSON paths, effectively bypassing the slower JSON load process and greatly enhancing query performance. For more information, refer to <a href="/docs/use-json-fields.md">JSON Field</a>.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Reorder sub-expressions for conjunct expressions (<a href="https://github.com/milvus-io/milvus/pull/40186">#40186</a>)</li>
<li>Add more config options for <code translate="no">interimindex</code> to support refined modes (<a href="https://github.com/milvus-io/milvus/pull/40429">#40429</a>)</li>
<li>Use correct counter metrics for overall WA calculations (<a href="https://github.com/milvus-io/milvus/pull/40679">#40679</a>)</li>
<li>Make the segment prune config refreshable (<a href="https://github.com/milvus-io/milvus/pull/40632">#40632</a>)</li>
<li>Add a channel seal policy based on blocking L0 (<a href="https://github.com/milvus-io/milvus/pull/40535">#40535</a>)</li>
<li>Refine task metadata with key-level locking (<a href="https://github.com/milvus-io/milvus/pull/40353">#40353</a>)</li>
<li>Remove unnecessary collection and partition labels from metrics (<a href="https://github.com/milvus-io/milvus/pull/40593">#40593</a>)</li>
<li>Improve import error messages (<a href="https://github.com/milvus-io/milvus/pull/40597">#40597</a>)</li>
<li>Avoid converting body byte slices to strings in <code translate="no">httpserver</code> (<a href="https://github.com/milvus-io/milvus/pull/40414">#40414</a>)</li>
<li>Log the start position of delete messages (<a href="https://github.com/milvus-io/milvus/pull/40678">#40678</a>)</li>
<li>Support retrieving segment binlogs with the new <code translate="no">GetSegmentsInfo</code> interface (<a href="https://github.com/milvus-io/milvus/pull/40466">#40466</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Use <code translate="no">newInsertDataWithFunctionOutputField</code> when importing binlog files (<a href="https://github.com/milvus-io/milvus/pull/40742">#40742</a>)</li>
<li>Fixed an issue where mmap properties failed to apply when creating a collection (<a href="https://github.com/milvus-io/milvus/pull/40515">#40515</a>)</li>
<li>Do not delete the centroids file when sampling fails; instead, wait for GC (<a href="https://github.com/milvus-io/milvus/pull/40702">#40702</a>)</li>
<li>Fixed message loss issues during seek (<a href="https://github.com/milvus-io/milvus/pull/40736">#40736</a>)</li>
<li>Removed lag targets after the main dispatcher (<a href="https://github.com/milvus-io/milvus/pull/40717">#40717</a>)</li>
<li>Added clear bitmap input for every batch loop (<a href="https://github.com/milvus-io/milvus/pull/40722">#40722</a>)</li>
<li>Protected <code translate="no">GetSegmentIndexes</code> with an RLock (<a href="https://github.com/milvus-io/milvus/pull/40720">#40720</a>)</li>
<li>Avoided segmentation faults caused by retrieving empty vector datasets (<a href="https://github.com/milvus-io/milvus/pull/40546">#40546</a>)</li>
<li>Fixed JSON index “not-equal” filter (<a href="https://github.com/milvus-io/milvus/pull/40648">#40648</a>)</li>
<li>Fixed null offset loading in the inverted index (<a href="https://github.com/milvus-io/milvus/pull/40524">#40524</a>)</li>
<li>Fixed the garbage cleanup logic of <code translate="no">jsonKey</code> stats and improved the JSON key stats filter (<a href="https://github.com/milvus-io/milvus/pull/40039">#40039</a>)</li>
<li>Caught invalid JSON pointer errors (<a href="https://github.com/milvus-io/milvus/pull/40626">#40626</a>)</li>
<li>RBAC star privilege now returns empty when listing policies (<a href="https://github.com/milvus-io/milvus/pull/40557">#40557</a>)</li>
<li>Avoided panic when a field does not exist in the schema in QueryNode (<a href="https://github.com/milvus-io/milvus/pull/40542">#40542</a>)</li>
<li>Fixed a reference collection issue for search/query (<a href="https://github.com/milvus-io/milvus/pull/40550">#40550</a>)</li>
<li>Handled empty rows for sparse vectors (<a href="https://github.com/milvus-io/milvus/pull/40586">#40586</a>)</li>
<li>Added a duplicated type/index parameter check when creating collections (<a href="https://github.com/milvus-io/milvus/pull/40465">#40465</a>)</li>
<li>Moved <code translate="no">metaHeader</code> to the client to avoid data races (<a href="https://github.com/milvus-io/milvus/pull/40444">#40444</a>)</li>
</ul>
<h2 id="v256" class="common-anchor-header">v2.5.6<button data-href="#v256" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: March 10, 2025</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Node.js SDK version</th><th>Java SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.5.6</td><td>2.5.5</td><td>2.5.5</td><td>2.5.5</td></tr>
</tbody>
</table>
<p>We’re excited to announce the release of Milvus 2.5.6, featuring valuable enhancements to toolchains, logging, metrics, and array handling, as well as multiple bug fixes for improved reliability and performance. This update includes refined concurrency handling, more robust compaction tasks, and other key improvements. We encourage you to upgrade or try it out, and as always, we welcome your feedback to help us continuously improve Milvus!</p>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Upgrade the Go toolchain to 1.22.7 (<a href="https://github.com/milvus-io/milvus/pull/40399">#40399</a>)</li>
<li>Upgrade Rust version to 1.83 (<a href="https://github.com/milvus-io/milvus/pull/40317">#40317</a>)</li>
<li>Bump Etcd version to 3.5.18 (<a href="https://github.com/milvus-io/milvus/pull/40230">#40230</a>)</li>
<li>Only check element type for non-null arrays (<a href="https://github.com/milvus-io/milvus/pull/40447">#40447</a>)</li>
<li>Remove debug logs in the resource group handler (v2) (<a href="https://github.com/milvus-io/milvus/pull/40393">#40393</a>)</li>
<li>Improve logging for the gRPC resolver (<a href="https://github.com/milvus-io/milvus/pull/40338">#40338</a>)</li>
<li>Add more metrics for asynchronous CGO components (<a href="https://github.com/milvus-io/milvus/pull/40232">#40232</a>)</li>
<li>Clean the shard location cache after a collection is released (<a href="https://github.com/milvus-io/milvus/pull/40228">#40228</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Fixed array corruption caused by ignoring validity (<a href="https://github.com/milvus-io/milvus/pull/40433">#40433</a>)</li>
<li>Fixed an issue where <code translate="no">null</code> expressions did not work for JSON fields (<a href="https://github.com/milvus-io/milvus/pull/40457">#40457</a>)</li>
<li>Fixed an issue that stored the wrong offset when building Tantivy with a nullable field (<a href="https://github.com/milvus-io/milvus/pull/40453">#40453</a>)</li>
<li>Skipped executing stats for zero segments (<a href="https://github.com/milvus-io/milvus/pull/40449">#40449</a>)</li>
<li>Corrected memory size estimation for arrays (<a href="https://github.com/milvus-io/milvus/pull/40377">#40377</a>)</li>
<li>Passed a knapsack pointer to avoid multiple compactions (<a href="https://github.com/milvus-io/milvus/pull/40401">#40401</a>)</li>
<li>Fixed a crash issue with bulk insert (<a href="https://github.com/milvus-io/milvus/pull/40304">#40304</a>)</li>
<li>Prevented message stream leaks by properly terminating the main dispatcher (<a href="https://github.com/milvus-io/milvus/pull/40351">#40351</a>)</li>
<li>Fixed concurrency issues for <code translate="no">null</code> offsets (<a href="https://github.com/milvus-io/milvus/pull/40363">#40363</a>), (<a href="https://github.com/milvus-io/milvus/pull/40365">#40365</a>)</li>
<li>Fixed parsing of the <code translate="no">import end ts</code> (<a href="https://github.com/milvus-io/milvus/pull/40333">#40333</a>)</li>
<li>Improved error handling and unit tests for the <code translate="no">InitMetaCache</code> function (<a href="https://github.com/milvus-io/milvus/pull/40324">#40324</a>)</li>
<li>Added a duplicate parameter check for <code translate="no">CreateIndex</code> (<a href="https://github.com/milvus-io/milvus/pull/40330">#40330</a>)</li>
<li>Resolved an issue preventing compaction tasks when size exceeded the max limit (<a href="https://github.com/milvus-io/milvus/pull/40350">#40350</a>)</li>
<li>Fixed duplicate consumption from the stream for invisible segments (<a href="https://github.com/milvus-io/milvus/pull/40318">#40318</a>)</li>
<li>Changed the CMake variable to switch to <code translate="no">knowhere-cuvs</code> (<a href="https://github.com/milvus-io/milvus/pull/40289">#40289</a>)</li>
<li>Fixed an issue where dropping DB properties via RESTful failed (<a href="https://github.com/milvus-io/milvus/pull/40260">#40260</a>)</li>
<li>Used a different message type for the <code translate="no">OperatePrivilegeV2</code> API (<a href="https://github.com/milvus-io/milvus/pull/40193">#40193</a>)</li>
<li>Fixed a data race in the task delta cache (<a href="https://github.com/milvus-io/milvus/pull/40262">#40262</a>)</li>
<li>Resolved a task delta cache leak caused by duplicate task IDs (<a href="https://github.com/milvus-io/milvus/pull/40184">#40184</a>)</li>
</ul>
<h2 id="v255" class="common-anchor-header">v2.5.5<button data-href="#v255" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: February 26, 2025</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Node.js SDK version</th><th>Java SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.5.5</td><td>2.5.4</td><td>2.5.5</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.5 brings significant improvements in the number of collections and partitions a single cluster can support. It is now fully feasible to run Milvus with 10K collections and 100K partitions. This release also addresses several critical bugs, including missing match stats and a deadlock issue in multi-stage queries. Additionally, it includes numerous observability and security enhancements. We strongly recommend that all users running Milvus 2.5.x upgrade as soon as possible.</p>
<h3 id="Dependency-Upgrade" class="common-anchor-header">Dependency Upgrade</h3><p>Upgraded to ETCD 3.5.18 to fix several CVEs.</p>
<ul>
<li>[2.5] Updated raft to cuvs (<a href="https://github.com/milvus-io/milvus/pull/39221">#39221</a>)</li>
<li>[2.5] Updated Knowhere version (<a href="https://github.com/milvus-io/milvus/pull/39673">#39673</a>, <a href="https://github.com/milvus-io/milvus/pull/39574">#39574</a>)</li>
</ul>
<h3 id="Critical-Bugs" class="common-anchor-header">Critical Bugs</h3><ul>
<li>[2.5] Used <code translate="no">text_log</code> prefix for textmatchindex null offset file (<a href="https://github.com/milvus-io/milvus/pull/39936">#39936</a>)</li>
<li>[2.5] Added sub-task pool for multi-stage tasks to avoid deadlock (<a href="https://github.com/milvus-io/milvus/pull/40081">#40081</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Bug Fixes</h3><ul>
<li>[2.5] Fixed task scheduler deadlock (<a href="https://github.com/milvus-io/milvus/pull/40121">#40121</a>)</li>
<li>[2.5] Fixed race condition that caused multiple identical indexes to be created (<a href="https://github.com/milvus-io/milvus/pull/40180">#40180</a>)</li>
<li>[2.5] Fixed issue where collections with duplicate names could be created (<a href="https://github.com/milvus-io/milvus/pull/40147">#40147</a>)</li>
<li>Fixed search failure of null expression (<a href="https://github.com/milvus-io/milvus/pull/40128">#40128</a>)</li>
<li>[2.5] Fixed bug where prefix matching failed when wildcards were in the prefix (<a href="https://github.com/milvus-io/milvus/pull/40021">#40021</a>)</li>
<li>Cancelled subcontexts cascade when HTTP request timed out (<a href="https://github.com/milvus-io/milvus/pull/40060">#40060</a>)</li>
<li>[2.5] Fixed task delta cache leak on reduce task (<a href="https://github.com/milvus-io/milvus/pull/40056">#40056</a>)</li>
<li>[2.5] Fixed querycoord panic in corner case (<a href="https://github.com/milvus-io/milvus/pull/40058">#40058</a>)</li>
<li>[2.5] Enhanced isbalanced function to correctly count quote pairs (<a href="https://github.com/milvus-io/milvus/pull/40002">#40002</a>)</li>
<li>[2.5] Fixed negative -1 executing compaction tasks (<a href="https://github.com/milvus-io/milvus/pull/39955">#39955</a>)</li>
<li>[2.5] Fixed bug where a segment may never transfer from sealed to flushing (<a href="https://github.com/milvus-io/milvus/pull/39996">#39996</a>)</li>
<li>Skipped creating primary key index when loading pk index (<a href="https://github.com/milvus-io/milvus/pull/39922">#39922</a>)</li>
<li>[2.5] Skipped text index creation when segment was zero after sorting (<a href="https://github.com/milvus-io/milvus/pull/39969">#39969</a>)</li>
<li>[2.5] Fixed failure to seek to earliest position (<a href="https://github.com/milvus-io/milvus/pull/39966">#39966</a>)</li>
<li>Ignored growing option lost at hybridsearch (<a href="https://github.com/milvus-io/milvus/pull/39900">#39900</a>)</li>
<li>[2.5] Fixed altercollection unable to modify consistency level (<a href="https://github.com/milvus-io/milvus/pull/39902">#39902</a>)</li>
<li>Fixed import failure due to 0 row count (<a href="https://github.com/milvus-io/milvus/pull/39904">#39904</a>)</li>
<li>[2.5] Fixed wrong module result for long type (<a href="https://github.com/milvus-io/milvus/pull/39802">#39802</a>)</li>
<li>[2.5] Added and used lifetime context for compaction trigger (<a href="https://github.com/milvus-io/milvus/pull/39880">#39880</a>)</li>
<li>[2.5] Checked collection release before target checks (<a href="https://github.com/milvus-io/milvus/pull/39843">#39843</a>)</li>
<li>Fixed Rootcoord graceful stop failure and limited resource of CI (<a href="https://github.com/milvus-io/milvus/pull/39793">#39793</a>)</li>
<li>[2.5] Removed load field &amp; schema column size check (<a href="https://github.com/milvus-io/milvus/pull/39834">#39834</a>, <a href="https://github.com/milvus-io/milvus/pull/39835">#39835</a>)</li>
<li>[2.5] Removed the mmap.enable param in the type param when creating index (<a href="https://github.com/milvus-io/milvus/pull/39806">#39806</a>)</li>
<li>[2.5] Did not pass the index name when dropping properties (<a href="https://github.com/milvus-io/milvus/pull/39679">#39679</a>)</li>
<li>[2.5] Segments returned both growing and sealed results (<a href="https://github.com/milvus-io/milvus/pull/39789">#39789</a>)</li>
<li>[2.5] Fixed concurrent map issue (<a href="https://github.com/milvus-io/milvus/pull/39776">#39776</a>)</li>
<li>[2.5] Resolved conflict on QC task test (<a href="https://github.com/milvus-io/milvus/pull/39797">#39797</a>)</li>
<li>[2.5] Fixed collection load stuck if compaction or GC occurred (<a href="https://github.com/milvus-io/milvus/pull/39761">#39761</a>)</li>
<li>[2.5] Fixed uneven distribution caused by executing task delta cache leak (<a href="https://github.com/milvus-io/milvus/pull/39759">#39759</a>)</li>
<li>[2.5] Returned early when skipping load pk index (<a href="https://github.com/milvus-io/milvus/pull/39763">#39763</a>)</li>
<li>[2.5] Fixed root user being able to list all collections even when <code translate="no">common.security.rootShouldBindRole</code> was set (<a href="https://github.com/milvus-io/milvus/pull/39714">#39714</a>)</li>
<li>[2.5] Fixed flowgraph leak (<a href="https://github.com/milvus-io/milvus/pull/39686">#39686</a>)</li>
<li>[2.5] Used param item formatter to avoid setconfig overlay (<a href="https://github.com/milvus-io/milvus/pull/39636">#39636</a>)</li>
<li>[2.5] Metastore privilege name checked with privilege name “all” (<a href="https://github.com/milvus-io/milvus/pull/39492">#39492</a>)</li>
<li>[2.5] Added rate limiter for RESTful v1 (<a href="https://github.com/milvus-io/milvus/pull/39555">#39555</a>)</li>
<li>[2.5] Removed hardcoded partition number in RESTful handler (<a href="https://github.com/milvus-io/milvus/pull/40113">#40113</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><h4 id="Observability" class="common-anchor-header">Observability</h4><ul>
<li>Added monitor metric to retrieve raw data (<a href="https://github.com/milvus-io/milvus/pull/40155">#40155</a>)</li>
<li>[2.5] Added get vector latency metric and refined request limit error message (<a href="https://github.com/milvus-io/milvus/pull/40085">#40085</a>)</li>
<li>[2.5] Added metrics for proxy queue (<a href="https://github.com/milvus-io/milvus/pull/40071">#40071</a>)</li>
<li>Exposed more metrics data (<a href="https://github.com/milvus-io/milvus/pull/39466">#39466</a>)</li>
<li>[2.5] Added metrics for parse expression (<a href="https://github.com/milvus-io/milvus/pull/39716">#39716</a>)</li>
<li>[2.5] Added DSL log field for hybridsearch (<a href="https://github.com/milvus-io/milvus/pull/39598">#39598</a>)</li>
<li>[2.5] Skipped updating index metrics if index was dropped (<a href="https://github.com/milvus-io/milvus/pull/39572">#39572</a>)</li>
<li>[2.5] Dumped pprof info if component stop progress timed out (<a href="https://github.com/milvus-io/milvus/pull/39760">#39760</a>)</li>
<li>[2.5] Added management API to check querycoord balance status (<a href="https://github.com/milvus-io/milvus/pull/39909">#39909</a>)</li>
</ul>
<h4 id="StatsCompactionIndex-Task-Scheduler-Optimization" class="common-anchor-header">Stats/Compaction/Index Task Scheduler Optimization</h4><ul>
<li>Refined index task scheduler policy (<a href="https://github.com/milvus-io/milvus/pull/40104">#40104</a>)</li>
<li>[2.5] Limited the speed of generating stats task (<a href="https://github.com/milvus-io/milvus/pull/39645">#39645</a>)</li>
<li>Added configs for compaction schedule (<a href="https://github.com/milvus-io/milvus/pull/39511">#39511</a>)</li>
<li>[2.5] Checked L0 compaction only with the same channel when stating (<a href="https://github.com/milvus-io/milvus/pull/39543">#39543</a>)</li>
<li>[2.5] Adjusted segment loader’s memory estimate for interim indexes (<a href="https://github.com/milvus-io/milvus/pull/39509">#39509</a>)</li>
<li>[2.5] Used start pos ts for seal segment by lifetime policy (<a href="https://github.com/milvus-io/milvus/pull/39994">#39994</a>)</li>
<li>Removed task meta when task was no longer needed (<a href="https://github.com/milvus-io/milvus/pull/40146">#40146</a>)</li>
<li>[2.5] Accelerated listing objects during binlog import (<a href="https://github.com/milvus-io/milvus/pull/40048">#40048</a>)</li>
<li>Supported creating collection with description (<a href="https://github.com/milvus-io/milvus/pull/40028">#40028</a>)</li>
<li>[2.5] Exported index request timeout interval in config (<a href="https://github.com/milvus-io/milvus/pull/40118">#40118</a>)</li>
<li>[2.5] Synced proxy.maxTaskNum default value to 1024 (<a href="https://github.com/milvus-io/milvus/pull/40073">#40073</a>)</li>
<li>Decreased dump snapshot limit from 10w to 1w (<a href="https://github.com/milvus-io/milvus/pull/40102">#40102</a>)</li>
<li>[2.5] Avoided string to slice bytes copy for batch pk exists (<a href="https://github.com/milvus-io/milvus/pull/40097">#40097</a>)</li>
<li>Supported returning configurable properties when describing index (<a href="https://github.com/milvus-io/milvus/pull/40043">#40043</a>)</li>
<li>Optimized expression performance for certain points (<a href="https://github.com/milvus-io/milvus/pull/39938">#39938</a>)</li>
<li>[2.5] Optimized result format of getQueryNodeDistribution (<a href="https://github.com/milvus-io/milvus/pull/39926">#39926</a>)</li>
<li>[cp25] Enabled observation of write amplification (<a href="https://github.com/milvus-io/milvus/pull/39743">#39743</a>)</li>
<li>[2.5] Returned top-k results when searching in RESTful v2 (<a href="https://github.com/milvus-io/milvus/pull/39839">#39839</a>)</li>
<li>[2.5][GoSDK] Added withEnableMatch syntactic sugar (<a href="https://github.com/milvus-io/milvus/pull/39853">#39853</a>)</li>
<li>[2.5] Interim index supported different index types and more data types (FP16/BF16) (<a href="https://github.com/milvus-io/milvus/pull/39180">#39180</a>)</li>
<li>[GoSDK][2.5] Synced GoSDK commits from master branch (<a href="https://github.com/milvus-io/milvus/pull/39823">#39823</a>)</li>
<li>Kept consistency of memory and meta of broadcaster (<a href="https://github.com/milvus-io/milvus/pull/39721">#39721</a>)</li>
<li>Broadcasted with event-based notification (<a href="https://github.com/milvus-io/milvus/pull/39550">#39550</a>)</li>
<li>[2.5] Refined error message for schema &amp; index checking (<a href="https://github.com/milvus-io/milvus/pull/39565">#39565</a>)</li>
<li>[2.5] Reset default auto index type for scalar (<a href="https://github.com/milvus-io/milvus/pull/39820">#39820</a>)</li>
<li>[2.5] Re-enqueued L0 compaction task when precheck failed (<a href="https://github.com/milvus-io/milvus/pull/39871">#39871</a>)</li>
</ul>
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
