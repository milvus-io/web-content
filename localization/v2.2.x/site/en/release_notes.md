---
id: release_notes.md
summary: Milvus Release Notes
title: ''
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
    </button></h1><p>Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.2.0 in this section. We suggest that you regularly visit this page to learn about updates.</p>
<h2 id="2216" class="common-anchor-header">2.2.16<button data-href="#2216" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Nov 27, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.16</td><td>2.2.17</td><td>2.2.15</td><td>2.2.8</td><td>2.2.24</td></tr>
</tbody>
</table>
<p>Milvus 2.2.16 represents a minor patch release following Milvus 2.2.15. This update primarily concentrates on bolstering system stability, enhancing fault recovery speed, and addressing various identified issues. Notably, the Knowhere version has been updated in this release, leading to quicker loading of DiskAnn indexes.</p>
<p>For an optimal experience, we highly recommend all users currently on the 2.2.0 series to upgrade to this version before considering a move to 2.3.</p>
<h3 id="Bug-Fixes" class="common-anchor-header">Bug Fixes</h3><ul>
<li>Corrected the docker-compose etcd health check command (<a href="https://github.com/milvus-io/milvus/pull/27980">27980</a>).</li>
<li>Completed the cleanup of remaining meta information after dropping a Collection (<a href="https://github.com/milvus-io/milvus/pull/28500">28500</a>).</li>
<li>Rectified the issue causing panic during the execution of stop logic in query coordination (<a href="https://github.com/milvus-io/milvus/pull/28543">28543</a>).</li>
<li>Resolved the problem of the cmux server failing to gracefully shut down (<a href="https://github.com/milvus-io/milvus/pull/28384">28384</a>).</li>
<li>Eliminated the reference counting logic related to the query shard service to prevent potential leaks (<a href="https://github.com/milvus-io/milvus/pull/28547">28547</a>).</li>
<li>Removed the logic of polling collection information from RootCoord during the restart process of QueryCoord to prevent startup failures (<a href="https://github.com/milvus-io/milvus/pull/28607">28607</a>).</li>
<li>Fixed parsing errors in expressions containing mixed single and double quotations (<a href="https://github.com/milvus-io/milvus/pull/28417">28417</a>).</li>
<li>Addressed DataNode panic during flushing delete buffer (<a href="https://github.com/milvus-io/milvus/pull/28710">28710</a>).</li>
</ul>
<h3 id="Enhancements" class="common-anchor-header">Enhancements</h3><ul>
<li>Updated Knowhere to version 1.3.20 to accelerate the loading process (<a href="https://github.com/milvus-io/milvus/pull/28658">28658</a>).</li>
<li>Made etcdkv request timeout configurable (<a href="https://github.com/milvus-io/milvus/pull/28664">28664</a>).</li>
<li>Increased the timeout duration for QueryCoord to probe the query nodes via gRPC to 2 seconds (<a href="https://github.com/milvus-io/milvus/pull/28647">28647</a>).</li>
<li>Bumped milvus-proto/go-api to version 2.2.16 (<a href="https://github.com/milvus-io/milvus/pull/28708">28708</a>).</li>
</ul>
<h2 id="2215" class="common-anchor-header">2.2.15<button data-href="#2215" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Nov 14, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.15</td><td>2.2.17</td><td>2.2.15</td><td>2.2.8</td><td>2.2.24</td></tr>
</tbody>
</table>
<p>Milvus 2.2.15, a bugfix version of the Milvus 2.2.x series, has introduced significant improvements and bug fixes. This version enhanced the <code translate="no">bulkinsert</code> functionality to support <code translate="no">partitionkey</code> and the new JSON list format. Additionally, 2.2.15 has substantially improved the rolling upgrade process to 2.3.3 and resolved many critical issues. We strongly recommend all 2.2.15 users upgrade to this version before moving to 2.3.</p>
<h3 id="Incompatible-Update" class="common-anchor-header">Incompatible Update</h3><ul>
<li>Removed MySQL metastore support (<a href="https://github.com/milvus-io/milvus/pull/26634">#26634</a>).</li>
</ul>
<h3 id="Features" class="common-anchor-header">Features</h3><ul>
<li>Enabled <code translate="no">bulkinsert</code> of binlog data with <code translate="no">partitionkey</code> (<a href="https://github.com/milvus-io/milvus/pull/27336">#27336</a>).</li>
<li>Added support for <code translate="no">bulkinsert</code> with pure list JSON (<a href="https://github.com/milvus-io/milvus/pull/28127">#28127</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li>Added <code translate="no">-g</code> flag for compiling with debug information (<a href="https://github.com/milvus-io/milvus/pull/26698">#26698</a>).</li>
<li>Implemented a workaround to fix <code translate="no">ChannelManager</code> holding mutex for too long (<a href="https://github.com/milvus-io/milvus/pull/26870">#26870</a>, <a href="https://github.com/milvus-io/milvus/pull/26874">#26874</a>).</li>
<li>Reduced the number of goroutines resulting from <code translate="no">GetIndexInfos</code> (<a href="https://github.com/milvus-io/milvus/pull/27547">#27547</a>).</li>
<li>Eliminated the recollection of segment stats during <code translate="no">datacoord</code> startup (<a href="https://github.com/milvus-io/milvus/pull/27562">#27562</a>).</li>
<li>Removed <code translate="no">flush</code> from the DDL queue (<a href="https://github.com/milvus-io/milvus/pull/27691">#27691</a>).</li>
<li>Decreased the write lock scope in channel manager (<a href="https://github.com/milvus-io/milvus/pull/27824">#27824</a>).</li>
<li>Reduced the number of parallel tasks for compaction (<a href="https://github.com/milvus-io/milvus/pull/27900">#27900</a>).</li>
<li>Refined RPC call in <code translate="no">unwatch drop channel</code> (<a href="https://github.com/milvus-io/milvus/pull/27884">#27884</a>).</li>
<li>Enhanced <code translate="no">bulkinsert</code> to read <code translate="no">varchar</code> in batches (<a href="https://github.com/milvus-io/milvus/pull/26198">#26198</a>).</li>
<li>Optimized Milvus rolling upgrade process, including:
<ul>
<li>Refined standalone components’ stop order (<a href="https://github.com/milvus-io/milvus/pull/26742">#26742</a>, <a href="https://github.com/milvus-io/milvus/pull/26778">#26778</a>).</li>
<li>Improved RPC client retry mechanism (<a href="https://github.com/milvus-io/milvus/pull/26797">#26797</a>).</li>
<li>Handled errors from new <code translate="no">RootCoord</code> for <code translate="no">DescribeCollection</code> (<a href="https://github.com/milvus-io/milvus/pull/27029">#27029</a>).</li>
<li>Added a stop hook for session cleanup (<a href="https://github.com/milvus-io/milvus/pull/27565">#27565</a>).</li>
<li>Accelerated shard leader cache update frequency (<a href="https://github.com/milvus-io/milvus/pull/27641">#27641</a>).</li>
<li>Disabled retryable error logic in search/query operations (<a href="https://github.com/milvus-io/milvus/pull/27661">#27661</a>).</li>
<li>Supported signal reception from parent process (<a href="https://github.com/milvus-io/milvus/pull/27755">#27755</a>).</li>
<li>Checked data sync service number during graceful stop (<a href="https://github.com/milvus-io/milvus/pull/27789">#27789</a>).</li>
<li>Fixed query shard service leak (<a href="https://github.com/milvus-io/milvus/pull/27848">#27848</a>).</li>
<li>Refined Proxy stop process (<a href="https://github.com/milvus-io/milvus/pull/27910">#27910</a>).</li>
<li>Fixed deletion of session key with prefix (<a href="https://github.com/milvus-io/milvus/pull/28261">#28261</a>).</li>
<li>Addressed unretryable errors (<a href="https://github.com/milvus-io/milvus/pull/27955">#27955</a>).</li>
<li>Refined stop order for components (<a href="https://github.com/milvus-io/milvus/pull/28017">#28017</a>).</li>
<li>Added timeout for graceful stop (<a href="https://github.com/milvus-io/milvus/pull/27326">#27326</a>, <a href="https://github.com/milvus-io/milvus/pull/28226">#28226</a>).</li>
<li>Implemented fast fail when querynode is not ready (<a href="https://github.com/milvus-io/milvus/pull/28204">#28204</a>).</li>
</ul></li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Bug Fixes</h3><ul>
<li>Resolved <code translate="no">CollectionNotFound</code> error during <code translate="no">describe rg</code> (<a href="https://github.com/milvus-io/milvus/pull/26569">#26569</a>).</li>
<li>Fixed issue where timeout tasks never released the queue (<a href="https://github.com/milvus-io/milvus/pull/26594">#26594</a>).</li>
<li>Refined signal handler for the entire Milvus role lifetime (<a href="https://github.com/milvus-io/milvus/pull/26642">#26642</a>, <a href="https://github.com/milvus-io/milvus/pull/26702">#26702</a>).</li>
<li>Addressed panic caused by non-nil component pointer to <code translate="no">component</code> interface (<a href="https://github.com/milvus-io/milvus/pull/27079">#27079</a>).</li>
<li>Enhanced garbage collector to fetch meta after listing from storage (<a href="https://github.com/milvus-io/milvus/pull/27205">#27205</a>).</li>
<li>Fixed Kafka consumer connection leak (<a href="https://github.com/milvus-io/milvus/pull/27223">#27223</a>).</li>
<li>Reduced RPC size for <code translate="no">GetRecoveryInfoV2</code> (<a href="https://github.com/milvus-io/milvus/pull/27484">#27484</a>).</li>
<li>Resolved concurrent parsing expression issues with strings (<a href="https://github.com/milvus-io/milvus/pull/26721">#26721</a>, <a href="https://github.com/milvus-io/milvus/pull/27539">#27539</a>).</li>
<li>Fixed query shard <code translate="no">inUse</code> leak (<a href="https://github.com/milvus-io/milvus/pull/27765">#27765</a>).</li>
<li>Corrected <code translate="no">rootPath</code> issue when querynode cleaned local directory (<a href="https://github.com/milvus-io/milvus/pull/28314">#28314</a>).</li>
<li>Ensured compatibility with sync target version (<a href="https://github.com/milvus-io/milvus/pull/28290">#28290</a>).</li>
<li>Fixed release of query shard when releasing growing segment (<a href="https://github.com/milvus-io/milvus/pull/28040">#28040</a>).</li>
<li>Addressed slow response in <code translate="no">flushManager.isFull</code> (<a href="https://github.com/milvus-io/milvus/pull/28141">#28141</a>, <a href="https://github.com/milvus-io/milvus/pull/28149">#28149</a>).</li>
<li>Implemented check for length before comparing strings (<a href="https://github.com/milvus-io/milvus/pull/28111">#28111</a>).</li>
<li>Resolved panic during close delete flow graph (<a href="https://github.com/milvus-io/milvus/pull/28202">#28202</a>).</li>
<li>Fixed <code translate="no">bulkinsert</code> bug where segments were compacted after import (<a href="https://github.com/milvus-io/milvus/pull/28200">#28200</a>).</li>
<li>Solved data node panic during save binlog path (<a href="https://github.com/milvus-io/milvus/pull/28243">#28243</a>).</li>
<li>Updated collection target after observer start (<a href="https://github.com/milvus-io/milvus/pull/27962">#27962</a>).</li>
</ul>
<h2 id="2214" class="common-anchor-header">2.2.14<button data-href="#2214" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Aug 23, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.14</td><td>2.2.15</td><td>2.2.11</td><td>2.2.7</td><td>2.2.24</td></tr>
</tbody>
</table>
<p>Milvus 2.2.14 is a minor bug-fix release that mainly addresses cluster unavailability issues during rolling upgrades. With this new release, Milvus deployed with Kubernetes operator can be upgraded with almost zero downtime.</p>
<h3 id="Bug-Fixes" class="common-anchor-header">Bug Fixes</h3><p>This update addresses the following issues:</p>
<ul>
<li>Fixed the issues that caused rolling upgrades to take longer than expected:
<ul>
<li>Changed the default <code translate="no">gracefulStopTimeout</code> and now only displays a warning when there is a failure to refresh the policy cache. (<a href="https://github.com/milvus-io/milvus/pull/26443">#26443</a>)</li>
<li>Refined gRPC retries. (<a href="https://github.com/milvus-io/milvus/pull/26464">#26464</a>)</li>
<li>Checked and reset the gRPC client server ID if it mismatches with the session. (<a href="https://github.com/milvus-io/milvus/pull/26473">#26473</a>)</li>
<li>Added a server ID validation interceptor. (<a href="https://github.com/milvus-io/milvus/pull/26395">#26395</a>) (<a href="https://github.com/milvus-io/milvus/pull/26424">#26424</a>)</li>
<li>Improved the performance of the server ID interceptor validation. (<a href="https://github.com/milvus-io/milvus/pull/26468">#26468</a>) (<a href="https://github.com/milvus-io/milvus/pull/26496">#26496</a>)</li>
</ul></li>
<li>Fixed the expression incompatibility issue between the parser and the executor. (<a href="https://github.com/milvus-io/milvus/pull/26493">#26493</a>) (<a href="https://github.com/milvus-io/milvus/pull/26495">#26495</a>)</li>
<li>Fixed failures in serializing string index when its size exceeds 2 GB. (<a href="https://github.com/milvus-io/milvus/pull/26393">#26393</a>)</li>
<li>Fixed issues where enormous duplicate collections were being re-dropped during restore. (<a href="https://github.com/milvus-io/milvus/pull/26030">#26030</a>)</li>
<li>Fixed the issue where the leader view returns a loading shard cluster. (<a href="https://github.com/milvus-io/milvus/pull/26263">#26263</a>)</li>
<li>Fixed the Liveness check block in SessionUtil to watch forever. (<a href="https://github.com/milvus-io/milvus/pull/26250">#26250</a>)</li>
<li>Fixed issues related to logical expressions. (<a href="https://github.com/milvus-io/milvus/pull/26513">#26513</a>) (<a href="https://github.com/milvus-io/milvus/pull/26515">#26515</a>)</li>
<li>Fixed issues related to continuous restart of DataNode/DataCoord. <a href="https://github.com/milvus-io/milvus/pull/26470">#26470</a> (<a href="https://github.com/milvus-io/milvus/pull/26506">#26506</a>)</li>
<li>Fixed issues related to being stuck in channel checkpoint. (<a href="https://github.com/milvus-io/milvus/pull/26544">#26544</a>)</li>
<li>Fixed an issue so that Milvus considers the balance task with a released source segment as stale. (<a href="https://github.com/milvus-io/milvus/pull/26498">#26498</a>)</li>
</ul>
<h3 id="Enhancement" class="common-anchor-header">Enhancement</h3><ul>
<li>Refined error messages for fields that do not exist (<a href="https://github.com/milvus-io/milvus/pull/26331">#26331</a>).</li>
<li>Fixed unclear error messages of the proto parser (<a href="https://github.com/milvus-io/milvus/pull/26365">#26365</a>) (<a href="https://github.com/milvus-io/milvus/pull/26366">#26366</a>).</li>
<li>Prohibited setting a partition name for a collection that already has a partition key (<a href="https://github.com/milvus-io/milvus/pull/26128">#26128</a>).</li>
<li>Added disk metric information (<a href="https://github.com/milvus-io/milvus/pull/25678">#25678</a>).</li>
<li>Fixed the CollectionNotExists error during vector search and retrieval (<a href="https://github.com/milvus-io/milvus/pull/26532">#26532</a>).</li>
<li>Added a default <code translate="no">MALLOC_CONF</code> environment variable to release memory after dropping a collection (<a href="https://github.com/milvus-io/milvus/pull/26353">#26353</a>).</li>
<li>Made pulsar request timeout configurable (<a href="https://github.com/milvus-io/milvus/pull/26526">#26526</a>).</li>
</ul>
<h2 id="2213" class="common-anchor-header">2.2.13<button data-href="#2213" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: Aug 9, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.13</td><td>2.2.15</td><td>2.2.11</td><td>2.2.7</td><td>2.2.23</td></tr>
</tbody>
</table>
<p>Milvus 2.2.13 is a minor bugfix release that fixes several performance degrading issues, including excessive disk usage when TTL is enabled, and the failure to import dynamic fields via bulk load. In addition, Milvus 2.2.13 also extends object storage support beyond S3 and MinIO.</p>
<h3 id="Bugfixes" class="common-anchor-header">Bugfixes</h3><ul>
<li>Resolved a crash bug in bulk-insert for dynamic fields. (<a href="https://github.com/milvus-io/milvus/pull/25980">#25980</a>)</li>
<li>Reduced excessive MinIO storage usage by saving metadata (timestampFrom, timestampTo) during compaction. (<a href="https://github.com/milvus-io/milvus/pull/26210">#26210</a>)</li>
<li>Corrected lock usage in DataCoord compaction. (<a href="https://github.com/milvus-io/milvus/pull/26032">#26032</a>) (<a href="https://github.com/milvus-io/milvus/pull/26042">#26042</a>)</li>
<li>Incorporated session util fixes through cherry-picking. (<a href="https://github.com/milvus-io/milvus/pull/26101">#26101</a>)</li>
<li>Removed user-role mapping information along with a user. (<a href="https://github.com/milvus-io/milvus/pull/25988">#25988</a>) (<a href="https://github.com/milvus-io/milvus/pull/26048">#26048</a>)</li>
<li>Improved the RBAC cache update process. (<a href="https://github.com/milvus-io/milvus/pull/26150">#26150</a>) (<a href="https://github.com/milvus-io/milvus/pull/26151">#26151</a>)</li>
<li>Fixed MsgPack from mq msgstream ts not being set. (<a href="https://github.com/milvus-io/milvus/pull/25924">#25924</a>)</li>
<li>Fixed the issue of <code translate="no">sc.distribution</code> being nil. (<a href="https://github.com/milvus-io/milvus/pull/25904">#25904</a>)</li>
<li>Fixed incorrect results while retrieving data of int8. (<a href="https://github.com/milvus-io/milvus/pull/26171">#26171</a>)</li>
</ul>
<h3 id="Enhancements" class="common-anchor-header">Enhancements</h3><ul>
<li>Upgraded MinIO-go and add region and virtual host config for segcore chunk manager (<a href="https://github.com/milvus-io/milvus/pull/25811">#25811</a>)</li>
<li>Reduced log volumes of DC&amp;DN (<a href="https://github.com/milvus-io/milvus/pull/26060">#26060</a>) (<a href="https://github.com/milvus-io/milvus/pull/26094">#26094</a>)</li>
<li>Added a new configuration item: proxy.http.port (<a href="https://github.com/milvus-io/milvus/pull/25923">#25923</a>)</li>
<li>Forced use DNS for AliyunOSS because of sdk bug (<a href="https://github.com/milvus-io/milvus/pull/26176">#26176</a>)</li>
<li>Fixed indexnode and datanode num metric (<a href="https://github.com/milvus-io/milvus/pull/25920">#25920</a>)</li>
<li>Disabled deny writing when the growing segment size exceeds the watermark (<a href="https://github.com/milvus-io/milvus/pull/26163">#26163</a>) (<a href="https://github.com/milvus-io/milvus/pull/26208">#26208</a>)</li>
</ul>
<h3 id="Performance-related-issues" class="common-anchor-header">Performance-related issues</h3><ul>
<li>Fixed the performance degradation in version 2.2.12 by adding back the segment CGO pool and separating sq/dm operations (<a href="https://github.com/milvus-io/milvus/pull/26035">#26035</a>).</li>
</ul>
<h2 id="2212" class="common-anchor-header">2.2.12<button data-href="#2212" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 24 July, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.12</td><td>2.2.14</td><td>2.2.9</td><td>2.2.7</td><td>2.2.20</td></tr>
</tbody>
</table>
<p>This minor release is the last one in Milvus 2.2.x that comes with new features. Future minor releases of Milvus 2.2.x will focus on essential bug fixes.</p>
<p>New features in this release include:</p>
<ul>
<li><p>A new set of RESTful APIs that simplify user-side operations.</p>
<p>Note that you must set a token even if the authentication is disabled in Milvus for now. For details, see <a href="https://github.com/milvus-io/milvus/pull/25873">#25873</a>.</p></li>
<li><p>Improved ability to retrieve vectors during ANN searches, along with better vector-retrieving performance during queries. Users can now set the vector field as one of the output fields in ANN searches and queries against HNSW-, DiskANN-, or IVF-FLAT-indexed collections.</p></li>
<li><p>Better search performance with reduced overhead, even when dealing with large top-K values, improved write performance in partition-key-enabled or multi-partition scenarios, and enhanced CPU usage in scenarios with large machines.</p></li>
</ul>
<p>Additionally, a large number of issues have been fixed, including excessive disk usage, stuck compaction, infrequent data deletions, object storage access failures using AWS S3 SDK, and bulk-insertion failures.</p>
<h3 id="New-Features" class="common-anchor-header">New Features</h3><ul>
<li>Added support for a high-level RESTful API that listens on the same port as gRPC (<a href="https://github.com/milvus-io/milvus/pull/24761">#24761</a>).</li>
<li>Added support for getting vectors by IDs (<a href="https://github.com/milvus-io/milvus/pull/23450">#23450</a>) (<a href="https://github.com/milvus-io/milvus/pull/25090">#25090</a>).</li>
<li>Added support for <code translate="no">json_contains</code> (<a href="https://github.com/milvus-io/milvus/pull/25724">#25724</a>).</li>
<li>Enabled bulk-insert to support partition keys (<a href="https://github.com/milvus-io/milvus/pull/24995">#24995</a>).</li>
<li>Enabled the chunk manager to use GCS and OSS with an access key (<a href="https://github.com/milvus-io/milvus/pull/25241">#25241</a>).</li>
</ul>
<h3 id="Bugfixes" class="common-anchor-header">Bugfixes</h3><ul>
<li>Fixed issue where Milvus was using too much extra MinIO/local disk space
<ul>
<li>Added constraint for compaction based on indexed segments (<a href="https://github.com/milvus-io/milvus/pull/25470">#25470</a>)</li>
<li>(FastCompact) Added function to check output fields and modify cases (<a href="https://github.com/milvus-io/milvus/pull/25510">#25510</a>)</li>
</ul></li>
<li>Fixed Delete related issues
<ul>
<li>Fixed delete messages being unsorted (<a href="https://github.com/milvus-io/milvus/pull/25757">#25757</a>)</li>
<li>Fixed deleted records being re-applied (<a href="https://github.com/milvus-io/milvus/pull/24858">#24858</a>)</li>
<li>Fixed duplicate deletions making deleted records visible (<a href="https://github.com/milvus-io/milvus/pull/25369">#25369</a>)</li>
<li>Fixed deleted data being returned by search/query (<a href="https://github.com/milvus-io/milvus/pull/25513">#25513</a>)</li>
</ul></li>
<li>Fixed Blob storage-related issues
<ul>
<li>Added error code to Minio chunkmanager exception (<a href="https://github.com/milvus-io/milvus/pull/25153">#25153</a>) (<a href="https://github.com/milvus-io/milvus/pull/25181">#25181</a>)</li>
<li>Fixed program crash caused by incorrect use of noexcept modifier (<a href="https://github.com/milvus-io/milvus/pull/25194">#25194</a>)</li>
<li>Fixed GetObject returning null value bug in MacOS (<a href="https://github.com/milvus-io/milvus/pull/24959">#24959</a>)(<a href="https://github.com/milvus-io/milvus/pull/25002">#25002</a>) (<a href="https://github.com/milvus-io/milvus/pull/25107">#25107</a>)</li>
<li>Reverted aws-sdk-cpp version (<a href="https://github.com/milvus-io/milvus/pull/25305">#25305</a>)</li>
</ul></li>
<li>Fixed etcd failure causing Milvus to crash (<a href="https://github.com/milvus-io/milvus/pull/25463">#25463</a>)(<a href="https://github.com/milvus-io/milvus/pull/25111">#25111</a>)</li>
<li>Fixed Bulk-load issues
<ul>
<li>Enabled segment checks if a segment exists before conducting checks against the import task state (<a href="https://github.com/milvus-io/milvus/pull/25809">#25809</a>)</li>
<li>Added a timeout config for bulk-insert requests (<a href="https://github.com/milvus-io/milvus/pull/25758">#25758</a>)</li>
</ul></li>
<li>Fixed indexnode memory leakage when update index fails (<a href="https://github.com/milvus-io/milvus/pull/25460">#25460</a>) (<a href="https://github.com/milvus-io/milvus/pull/25478">#25478</a>)</li>
<li>Fixed Kafka panic when sending a message to a closed channel (<a href="https://github.com/milvus-io/milvus/pull/25116">#25116</a>)</li>
<li>Fixed insert returning success but not storing dynamic fields (<a href="https://github.com/milvus-io/milvus/pull/25494">#25494</a>)</li>
<li>Refined sync_cp_lag_too_behind_policy to avoid submitting sync tasks too frequently (<a href="https://github.com/milvus-io/milvus/pull/25441">#25441</a>) (<a href="https://github.com/milvus-io/milvus/pull/25442">#25442</a>)</li>
<li>Fixed bug of missing JSON type when sorting retrieve results (<a href="https://github.com/milvus-io/milvus/pull/25412">#25412</a>)</li>
<li>Fixed possible deadlock when syncing segments to datanode (<a href="https://github.com/milvus-io/milvus/pull/25196">#25196</a>) (<a href="https://github.com/milvus-io/milvus/pull/25211">#25211</a>)</li>
<li>Added write lock for <code translate="no">lru_cache.Get</code> (<a href="https://github.com/milvus-io/milvus/pull/25010">#25010</a>)</li>
<li>Fixed expression on integer overflow case (<a href="https://github.com/milvus-io/milvus/pull/25320">#25320</a>, <a href="https://github.com/milvus-io/milvus/pull/25372">#25372</a>)</li>
<li>Fixed data race in waitgroup for graceful stop (<a href="https://github.com/milvus-io/milvus/pull/25224">#25224</a>)</li>
<li>Fixed drop index with large txn exceeding etcd limit (<a href="https://github.com/milvus-io/milvus/pull/25623">#25623</a>)</li>
<li>Fixed incorrect IP distance (<a href="https://github.com/milvus-io/milvus/pull/25527">#25527</a>) (<a href="https://github.com/milvus-io/milvus/pull/25528">#25528</a>)</li>
<li>Prevented <code translate="no">exclusive consumer</code> exception in Pulsar (<a href="https://github.com/milvus-io/milvus/pull/25376">#25376</a>) (<a href="https://github.com/milvus-io/milvus/pull/25378">#25378</a>)</li>
<li>Made query set guarantee ts based on default consistency level (<a href="https://github.com/milvus-io/milvus/pull/25579">#25579</a>)</li>
<li>Fixed rootcoord restoration missing gcConfirmStep (<a href="https://github.com/milvus-io/milvus/pull/25280">#25280</a>)</li>
<li>Fixed missing db parameter (<a href="https://github.com/milvus-io/milvus/pull/25759">#25759</a>)</li>
</ul>
<h3 id="Enhancements" class="common-anchor-header">Enhancements</h3><ul>
<li>Improved monitoring metrics:
<ul>
<li>Fixed DataCoord consuming DataNode tt metrics (<a href="https://github.com/milvus-io/milvus/pull/25761">#25761</a>)</li>
<li>Fixed monitoring metrics (<a href="https://github.com/milvus-io/milvus/pull/25549">#25549</a>) (<a href="https://github.com/milvus-io/milvus/pull/25659">#25659</a>)</li>
</ul></li>
<li>Reduced Standalone CPU usage:
<ul>
<li>Used zstd compression after level 2 for RocksMQ (<a href="https://github.com/milvus-io/milvus/pull/25238">#25238</a>)</li>
</ul></li>
<li>Made compaction RPC timeout and parallel maximum configurable (<a href="https://github.com/milvus-io/milvus/pull/25654">#25654</a>)</li>
<li>Accelerated compiling third-party libraries for AWS and Google SDK (<a href="https://github.com/milvus-io/milvus/pull/25408">#25408</a>)</li>
<li>Removed DataNode time-tick MQ and use RPC to report instead (<a href="https://github.com/milvus-io/milvus/pull/24011">#24011</a>)</li>
<li>Changed default log level to info (<a href="https://github.com/milvus-io/milvus/pull/25278">#25278</a>)</li>
<li>Added refunding tokens to limiter (<a href="https://github.com/milvus-io/milvus/pull/25660">#25660</a>)</li>
<li>Added write the cache file to the <code translate="no">cacheStorage.rootpath</code> directory (<a href="https://github.com/milvus-io/milvus/pull/25714">#25714</a>)</li>
<li>Fixed inconsistency between catalog and in-memory segments meta (<a href="https://github.com/milvus-io/milvus/pull/25799">#25799</a>) (<a href="https://github.com/milvus-io/milvus/pull/25801">#25801</a>)
<ul>
<li>fixed DataCoord consume DataNode tt metrics (<a href="https://github.com/milvus-io/milvus/pull/25761">#25761</a>)</li>
<li>Fixed monitoring metrics (<a href="https://github.com/milvus-io/milvus/pull/25549">#25549</a>) (<a href="https://github.com/milvus-io/milvus/pull/25659">#25659</a>)</li>
</ul></li>
</ul>
<h3 id="Performance-related-issues" class="common-anchor-header">Performance-related issues</h3><ul>
<li>Added PK index for string data type (<a href="https://github.com/milvus-io/milvus/pull/25402">#25402</a>)</li>
<li>Improved write performance with partition key; remove sync segmentLastExpire every time when assigning (<a href="https://github.com/milvus-io/milvus/pull/25271">#25271</a>) (<a href="https://github.com/milvus-io/milvus/pull/25316">#25316</a>)</li>
<li>Fixed issues to avoid unnecessary reduce phase during search (<a href="https://github.com/milvus-io/milvus/pull/25166">#25166</a>) (<a href="https://github.com/milvus-io/milvus/pull/25192">#25192</a>)</li>
<li>Updated default nb to 2000 (<a href="https://github.com/milvus-io/milvus/pull/25169">#25169</a>)</li>
<li>Added <code translate="no">minCPUParallelTaskNumRatio</code> config to enable better parallelism when estimated CPU usage of a single task is higher than total CPU usage (<a href="https://github.com/milvus-io/milvus/pull/25772">#25772</a>)</li>
<li>Fixed coping segment offsets twice (<a href="https://github.com/milvus-io/milvus/pull/25729">#25729</a>) (<a href="https://github.com/milvus-io/milvus/pull/25730">#25730</a>)</li>
<li>Added limits on the number of go routines (<a href="https://github.com/milvus-io/milvus/pull/25171">#25171</a>)</li>
</ul>
<h2 id="2211" class="common-anchor-header">2.2.11<button data-href="#2211" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 29 June, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.11</td><td>2.2.13</td><td>2.2.8</td><td>2.2.5</td><td>2.2.18</td></tr>
</tbody>
</table>
<p>We’re happy to share that Milvus 2.2.11 is now available! This update includes significant bug fixes, addressing occasional system crashes and ensuring a more stable experience. We’ve also implemented various optimizations related to monitoring, logging, rate limiting, and interception of cross-cluster requests.</p>
<h3 id="Bugfix" class="common-anchor-header">Bugfix</h3><ul>
<li>Fixed occasionally QueryNode panic during load (<a href="https://github.com/milvus-io/milvus/pull/24902">#24902</a>)</li>
<li>Fixed panic in the session module caused by uninitialized atomic variable (<a href="https://github.com/milvus-io/milvus/pull/25005">#25005</a>)</li>
<li>Rectified the issue of read request throttling caused by miscalculation of queue length twice. (<a href="https://github.com/milvus-io/milvus/pull/24440">#24440</a>)</li>
<li>Fixed Flush hang after SyncSegments timeout. (<a href="https://github.com/milvus-io/milvus/pull/24692">#24692</a>)</li>
<li>Fixed miss loading the same name collection during the recovery stage. (<a href="https://github.com/milvus-io/milvus/pull/24941">#24941</a>)</li>
<li>Added a format check for Authorization Tokens. (<a href="https://github.com/milvus-io/milvus/pull/25033">#25033</a>)</li>
<li>Fixed the issue of RemoteChunkManager not being thread-safe. (<a href="https://github.com/milvus-io/milvus/pull/25069">#25069</a>)</li>
<li>Optimized the internal component of GPRC state handling by allowing retry based on different error types. (<a href="https://github.com/milvus-io/milvus/pull/25042">#25042</a>)</li>
<li>Rectified the problem of erroneously excessive logging of error messages related to the stats log. (<a href="https://github.com/milvus-io/milvus/pull/25094">#25094</a>)</li>
<li>Fixed compaction stuck due to channel rebalance. (<a href="https://github.com/milvus-io/milvus/pull/25098">#25098</a>)</li>
<li>Fixed the issue of coroutines staying blocked after the consumer is closed. (<a href="https://github.com/milvus-io/milvus/pull/25123">#25123</a>)</li>
<li>Avoided indefinite blocking of keepAliveOnce by a timeout parameter. (<a href="https://github.com/milvus-io/milvus/pull/25111">#25111</a>)</li>
<li>Fixed crash caused by incorrect use of noexcept modifier (<a href="https://github.com/milvus-io/milvus/pull/25194">#25194</a>)</li>
<li>Fixed panic caused by sending the message to closed channel (<a href="https://github.com/milvus-io/milvus/pull/25116">#25116</a>)</li>
<li>Optimized length verification when inserting data of VarChar type (<a href="https://github.com/milvus-io/milvus/pull/25183">#25183</a>)</li>
<li>Fixed GetObject return null value in MacOs (<a href="https://github.com/milvus-io/milvus/pull/25107">#25107</a>)</li>
</ul>
<h3 id="Enhancement" class="common-anchor-header">Enhancement</h3><ul>
<li>Optimize the panic code logic of key components. (<a href="https://github.com/milvus-io/milvus/pull/24859">#24859</a>)</li>
<li>Bump semver to development v2.2.11. (<a href="https://github.com/milvus-io/milvus/pull/24938">#24938</a>) (<a href="https://github.com/milvus-io/milvus/pull/25075">#25075</a>)</li>
<li>Add cluster validation interceptor to prevent the Cross-Cluster routing issue. (<a href="https://github.com/milvus-io/milvus/pull/25030">#25030</a>)</li>
<li>Add some compaction logs for better issue tracking. (<a href="https://github.com/milvus-io/milvus/pull/24975">#24975</a>)</li>
<li>Add log for confirming gc finished in RootCoord. (<a href="https://github.com/milvus-io/milvus/pull/24946">#24946</a>)</li>
<li>Prioritize checking the upper limit of Collection numbers in the DataBase. (<a href="https://github.com/milvus-io/milvus/pull/24951">#24951</a>)</li>
<li>Upgrade the dependent milvus-proto/go-api to version 2.2.10. (<a href="https://github.com/milvus-io/milvus/pull/24885">#24885</a>)</li>
<li>Close kafka internal consumer properly. (<a href="https://github.com/milvus-io/milvus/pull/24997">#24997</a>) (<a href="https://github.com/milvus-io/milvus/pull/25049">#25049</a>) (<a href="https://github.com/milvus-io/milvus/pull/25071">#25071</a>)</li>
<li>Restrict the concurrency of sync tasks for each flowgraph in DataNode. (<a href="https://github.com/milvus-io/milvus/pull/25035">#25035</a>)</li>
<li>Updated Minio version. (<a href="https://github.com/milvus-io/milvus/pull/24897">#24897</a>)</li>
<li>Add error code to minio chunkmanager exception. (<a href="https://github.com/milvus-io/milvus/pull/25181">#25181</a>)</li>
<li>Utilize a singleton coroutine pool to reduce the number of employed coroutines. (<a href="https://github.com/milvus-io/milvus/pull/25171">#25171</a>)</li>
<li>Optimized disk usage for RocksMq by enabling zstd compression starting from level 2 (<a href="https://github.com/milvus-io/milvus/pull/25231">#25231</a>) (<a href="https://github.com/milvus-io/milvus/pull/25238">#25238</a>)</li>
</ul>
<h2 id="v2210" class="common-anchor-header">v2.2.10<button data-href="#v2210" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 14 June, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.10</td><td>2.2.11</td><td>2.2.6</td><td>2.2.4</td><td>2.2.17</td></tr>
</tbody>
</table>
<p>We are excited to announce the release of Milvus 2.2.10! This update includes important bug fixes, specifically addressing occasional system crashes, ensuring a more stable experience. We have also made significant improvements to loading and indexing speeds, resulting in smoother operations. A significant optimization in this release is the reduction of memory usage in data nodes, made possible through the integration of the Go payload writer instead of the old CGO implementation. Furthermore, we have expanded our Role-Based Access Control (RBAC) capabilities, extending these protections to the database and ‘Flush All’ API. Enjoy the enhanced security and performance of Milvus 2.2.10!</p>
<h3 id="New-Features" class="common-anchor-header">New Features</h3><ul>
<li>Added role-based access control (RBAC) for the new interface:
<ol>
<li>Added RBAC for FlushAll (<a href="https://github.com/milvus-io/milvus/pull/24751">#24751</a>) (<a href="https://github.com/milvus-io/milvus/pull/24755">#24755</a>)</li>
<li>Added RBAC for Database API (<a href="https://github.com/milvus-io/milvus/pull/24653">#24653</a>)</li>
</ol></li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Bug Fixes</h3><ul>
<li>Fixed random crash introduced by AWS S3 SDK:
<ol>
<li>Used SA_ONSTACK flag for SIGPIPE handler (<a href="https://github.com/milvus-io/milvus/pull/24661">#24661</a>)</li>
<li>Added sa_mask for SIGPIPE handler (<a href="https://github.com/milvus-io/milvus/pull/24824">#24824</a>)</li>
</ol></li>
<li>Fixed “show loaded collections” (<a href="https://github.com/milvus-io/milvus/pull/24628">#24628</a>) (<a href="https://github.com/milvus-io/milvus/pull/24629">#24629</a>)</li>
<li>Fixed creating a collection not being idempotent (<a href="https://github.com/milvus-io/milvus/pull/24721">#24721</a>) (<a href="https://github.com/milvus-io/milvus/pull/24722">#24722</a>)</li>
<li>Fixed DB name being empty in the “describe collection” response (<a href="https://github.com/milvus-io/milvus/pull/24603">#24603</a>)</li>
<li>Fixed deleted data still being visible (<a href="https://github.com/milvus-io/milvus/pull/24796">#24796</a>)</li>
</ul>
<h3 id="Enhancements" class="common-anchor-header">Enhancements</h3><ul>
<li>Replaced CGO payload writer with Go payload writer to reduce memory usage (<a href="https://github.com/milvus-io/milvus/pull/24656">#24656</a>)</li>
<li>Enabled max result window limit (<a href="https://github.com/milvus-io/milvus/pull/24768">#24768</a>)</li>
<li>Removed unused iterator initialization (<a href="https://github.com/milvus-io/milvus/pull/24758">#24758</a>)</li>
<li>Enabled metric type checks before search (<a href="https://github.com/milvus-io/milvus/pull/24652">#24652</a>) (<a href="https://github.com/milvus-io/milvus/pull/24716">#24716</a>)</li>
<li>Used go-api/v2 for milvus-proto (<a href="https://github.com/milvus-io/milvus/pull/24723">#24723</a>)</li>
<li>Optimized the penalty mechanism for exceeding rate limits (<a href="https://github.com/milvus-io/milvus/pull/24624">#24624</a>)</li>
<li>Allowed default params in HNSW &amp; DISKANN (<a href="https://github.com/milvus-io/milvus/pull/24807">#24807</a>)</li>
<li>Security -
<ul>
<li>[2.2] Bumped <a href="http://github.com/gin-gonic/gin">github.com/gin-gonic/gin</a> from 1.9.0 to 1.9.1 (<a href="https://github.com/milvus-io/milvus/pull/24830">#24830</a>)</li>
</ul></li>
</ul>
<h3 id="Performance" class="common-anchor-header">Performance</h3><ul>
<li>Fixed build index performance downgrade (<a href="https://github.com/milvus-io/milvus/pull/24651">#24651</a>)</li>
</ul>
<h2 id="v229" class="common-anchor-header">v2.2.9<button data-href="#v229" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 2 June, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.9</td><td>2.2.9</td><td>2.2.5</td><td>2.2.3</td><td>2.2.16</td></tr>
</tbody>
</table>
<p>Milvus 2.2.9 has added JSON support, allowing for more flexible schemas within collections through dynamic schemas. The search efficiency has been improved through partition keys, which enable data separation for different data categories, such as multiple users, in a single collection. Additionally, database support has been integrated into Role-Based Access Control (RBAC), further fortifying multi-tenancy management and security. Support has also been extended to Alibaba Cloud OSS, and connection management has been refined, resulting in an improved user experience.</p>
<p>As always, this release includes bug fixes, enhancements, and performance improvements. Notably, disk usage has been significantly reduced, and performance has been improved, particularly for filtered searches.</p>
<p>We hope you enjoy the latest release!</p>
<h3 id="New-Features" class="common-anchor-header">New Features</h3><ul>
<li><p>JSON support</p>
<ul>
<li>Introduced JSON data type (<a href="https://github.com/milvus-io/milvus/pull/23839">#23839</a>).</li>
<li>Added support for expressions with JSON fields (<a href="https://github.com/milvus-io/milvus/pull/23804">#23804</a>, <a href="https://github.com/milvus-io/milvus/pull/24016">#24016</a>).</li>
<li>Enabled JSON support for bulk insert operations (<a href="https://github.com/milvus-io/milvus/pull/24227">#24227</a>).</li>
<li>Enhanced performance of filters using JSON fields (<a href="https://github.com/milvus-io/milvus/pull/24268">#24268</a>, <a href="https://github.com/milvus-io/milvus/pull/24282">#24282</a>).</li>
</ul></li>
<li><p>Dynamic schema</p>
<ul>
<li>Added dynamic schema support (<a href="https://github.com/milvus-io/milvus/pull/24062">#24062</a>, <a href="https://github.com/milvus-io/milvus/pull/24176">#24176</a>, <a href="https://github.com/milvus-io/milvus/pull/24205">#24205</a>, <a href="https://github.com/milvus-io/milvus/pull/24099">#24099</a>).</li>
<li>Enabled dynamic fields in bulk insert operations (<a href="https://github.com/milvus-io/milvus/pull/24265">#24265</a>).</li>
</ul></li>
<li><p>Partition key</p>
<ul>
<li>Introduced partition key (<a href="https://github.com/milvus-io/milvus/pull/23994">#23994</a>).</li>
<li>Added support for imports when partition key is enabled and backup is present (<a href="https://github.com/milvus-io/milvus/pull/24454">#24454</a>).</li>
<li>Added unit tests for partition key (<a href="https://github.com/milvus-io/milvus/pull/24167">#24167</a>).</li>
<li>Resolved issue with bulk insert not supporting partition key (<a href="https://github.com/milvus-io/milvus/pull/24328">#24328</a>).</li>
</ul></li>
<li><p>Database support in RBAC</p>
<ul>
<li>Added database support in Role-Based Access Control (RBAC) (<a href="https://github.com/milvus-io/milvus/pull/23742">#23742</a>).</li>
<li>Resolved non-existent database error for FlushAll function (<a href="https://github.com/milvus-io/milvus/pull/24222">#24222</a>).</li>
<li>Implemented default database value for RBAC requests (<a href="https://github.com/milvus-io/milvus/pull/24307">#24307</a>).</li>
<li>Ensured backward compatibility with empty database name (<a href="https://github.com/milvus-io/milvus/pull/24317">#24317</a>).</li>
</ul></li>
<li><p>Connection management</p>
<ul>
<li>Implemented the connect API to manage connections (<a href="https://github.com/milvus-io/milvus/pull/24224">#24224</a>) (<a href="https://github.com/milvus-io/milvus/pull/24293">#24293</a>)</li>
<li>Implemented checks if a database exists when Connect was called (<a href="https://github.com/milvus-io/milvus/pull/24399">#24399</a>)</li>
</ul></li>
<li><p>Alibaba Cloud OSS support</p>
<ul>
<li>Added support for Aliyun OSS in chunk manager (<a href="https://github.com/milvus-io/milvus/pull/22663">#22663</a>, <a href="https://github.com/milvus-io/milvus/pull/22842">#22842</a>, <a href="https://github.com/milvus-io/milvus/pull/23956">#23956</a>).</li>
<li>Enabled Alibaba Cloud OSS as object storage using access key (AK) or Identity and Access Management (IAM) (<a href="https://github.com/milvus-io/milvus/pull/23949">#23949</a>).</li>
</ul></li>
<li><p>Additional features</p>
<ul>
<li>Implemented AutoIndex (<a href="https://github.com/milvus-io/milvus/pull/24387">#24387</a>, <a href="https://github.com/milvus-io/milvus/pull/24443">#24443</a>).</li>
<li>Added configurable policy for query node and user-level schedule policy (<a href="https://github.com/milvus-io/milvus/pull/23718">#23718</a>).</li>
<li>Implemented rate limit based on growing segment size (<a href="https://github.com/milvus-io/milvus/pull/24157">#24157</a>).</li>
<li>Added support for single quotes within string expressions (<a href="https://github.com/milvus-io/milvus/pull/24386">#24386</a>, <a href="https://github.com/milvus-io/milvus/pull/24406">#24406</a>).</li>
</ul></li>
</ul>
<p>Read these pages to learn more.</p>
<ul>
<li><a href="/docs/v2.2.x/dynamic_schema.md">Dynamic Schema</a></li>
<li><a href="/docs/v2.2.x/schema.md">Schema</a></li>
<li><a href="/docs/v2.2.x/manage_databases.md">Manage Databases</a></li>
<li><a href="/docs/v2.2.x/multi_tenancy.md">Multi-tenancy</a></li>
</ul>
<p>For the use of these new features, please refer to related pages in the User Guides and the <a href="https://milvus.io/api-reference/pymilvus/v2.2.x/About.md">PyMilvus API reference</a>.</p>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Added temporary disk data cleaning upon the start of Milvus (<a href="https://github.com/milvus-io/milvus/pull/24400">#24400</a>).</li>
<li>Fixed crash issue of bulk insert caused by an invalid Numpy array file (<a href="https://github.com/milvus-io/milvus/pull/24480">#24480</a>).</li>
<li>Fixed an empty result set type for Int8~Int32 (<a href="https://github.com/milvus-io/milvus/pull/23851">#23851</a>).</li>
<li>Fixed the panic that occurs while balancing releasing a collection (<a href="https://github.com/milvus-io/milvus/pull/24003">#24003</a>) (<a href="https://github.com/milvus-io/milvus/pull/24070">#24070</a>).</li>
<li>Fixed an error that occurs when a role removes a user that has already been deleted (<a href="https://github.com/milvus-io/milvus/pull/24049">#24049</a>).</li>
<li>Fixed an issue where session stop/goingStop becomes stuck after a lost connection (<a href="https://github.com/milvus-io/milvus/pull/23771">#23771</a>).</li>
<li>Fixed the panic caused by incorrect logic of getting unindexed segments (<a href="https://github.com/milvus-io/milvus/pull/24061">#24061</a>).</li>
<li>Fixed the panic that occurs when a collection does not exist in quota effect (<a href="https://github.com/milvus-io/milvus/pull/24321">#24321</a>).</li>
<li>Fixed an issue where refresh may be notified as finished early (<a href="https://github.com/milvus-io/milvus/pull/24438">#24438</a>) (<a href="https://github.com/milvus-io/milvus/pull/24466">#24466</a>).</li>
</ul>
<h3 id="Enhancement" class="common-anchor-header">Enhancement</h3><ul>
<li><p>Added an error response to return when an unimplemented request is received (<a href="https://github.com/milvus-io/milvus/pull/24546">#24546</a>)</p></li>
<li><p>Reduced disk usage for Milvus Lite and Standalone:</p>
<ul>
<li>Refine RocksDB option (<a href="https://github.com/milvus-io/milvus/pull/24394">#24394</a>)</li>
<li>Fix RocksMQ retention not triggering at DataCoord timetick channel (<a href="https://github.com/milvus-io/milvus/pull/24134">#24134</a>)</li>
</ul></li>
<li><p>Optimized quota to avoid OOM on search</p></li>
<li><p>Added consistency_level in search/query request (<a href="https://github.com/milvus-io/milvus/pull/24541">#24541</a>)</p></li>
<li><p>(pr24562) Supported search with default parameters (<a href="https://github.com/milvus-io/milvus/pull/24516">#24516</a>)</p></li>
<li><p>Put DataNode load statslog lazy if SkipBFStatsLog is true (<a href="https://github.com/milvus-io/milvus/pull/23779">#23779</a>)</p></li>
<li><p>Put QueryNode lazy load statslog if SkipBFLoad is true (<a href="https://github.com/milvus-io/milvus/pull/23904">#23904</a>)</p></li>
<li><p>Fixed concurrent map read/write in rate limiter (<a href="https://github.com/milvus-io/milvus/pull/23957">#23957</a>)</p></li>
<li><p>Improved load/release performance:</p>
<ul>
<li>Implemented more frequent CollectionObserver checks to trigger during load procedure (<a href="https://github.com/milvus-io/milvus/pull/23925">#23925</a>)</li>
<li>Implemented checks to trigger while waiting for collection/partition to be released (<a href="https://github.com/milvus-io/milvus/pull/24535">#24535</a>)</li>
</ul></li>
<li><p>Optimized PrivilegeAll permission check (<a href="https://github.com/milvus-io/milvus/pull/23972">#23972</a>)</p></li>
<li><p>Fixed the “not shard leader” error when gracefully stopping (<a href="https://github.com/milvus-io/milvus/pull/24038">#24038</a>)</p></li>
<li><p>Checked the overflow for inserted integer (<a href="https://github.com/milvus-io/milvus/pull/24142">#24142</a>) (<a href="https://github.com/milvus-io/milvus/pull/24172">#24172</a>)</p></li>
<li><p>Lowered the task merge cap to mitigate an insufficient memory error (<a href="https://github.com/milvus-io/milvus/pull/24233">#24233</a>)</p></li>
<li><p>Removed constraint that prevents creating an index after load (<a href="https://github.com/milvus-io/milvus/pull/24415">#24415</a>)</p></li>
<li><p>Removed index check to trigger compaction (<a href="https://github.com/milvus-io/milvus/pull/23657">#23657</a>) (<a href="https://github.com/milvus-io/milvus/pull/23688">#23688</a>)</p></li>
<li><p>Optimized the search performance with a high filtering ratio (<a href="https://github.com/milvus-io/milvus/pull/23948">#23948</a>)</p></li>
</ul>
<h3 id="Performance-improvements" class="common-anchor-header">Performance improvements</h3><ul>
<li>Added SIMD support for several filtering expressions (<a href="https://github.com/milvus-io/milvus/pull/23715">#23715</a>, <a href="https://github.com/milvus-io/milvus/pull/23781">#23781</a>).</li>
<li>Reduced data copying during insertion into growing segments (<a href="https://github.com/milvus-io/milvus/pull/24492">#24492</a>).</li>
</ul>
<h2 id="v228" class="common-anchor-header">v2.2.8<button data-href="#v228" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 3 May, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.8</td><td>2.2.8</td><td>2.2.5</td><td>2.2.2</td><td>2.2.8</td></tr>
</tbody>
</table>
<p>In this update, we fixed 1 critical bug.</p>
<h3 id="Bugfix" class="common-anchor-header">Bugfix</h3><ul>
<li>Fixed RootCoord panic caused by the upgrades from v2.2.x to v2.2.7 (<a href="https://github.com/milvus-io/milvus/pull/23828">#23828</a>).</li>
</ul>
<h2 id="v227" class="common-anchor-header">v2.2.7<button data-href="#v227" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 28 April, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.7</td><td>2.2.8</td><td>2.2.5</td><td>2.2.2</td><td>2.2.7</td></tr>
</tbody>
</table>
<p>In this update, we have focused on resolving various issues reported by our users, enhancing the software’s overall stability and functionality. Additionally, we have implemented several optimizations, such as load balancing, search grouping, and memory usage improvements.</p>
<h3 id="Bugfix" class="common-anchor-header">Bugfix</h3><ul>
<li>Fixed a panic caused by not removing metadata of a dropped segment from the DataNode. (<a href="https://github.com/milvus-io/milvus/pull/23492">#23492</a>)</li>
<li>Fixed a bug that caused forever blocking due to the release of a non-loaded partition. (<a href="https://github.com/milvus-io/milvus/pull/23612">#23612</a>)</li>
<li>To prevent the query service from becoming unavailable, automatic balancing at the channel level has been disabled as a workaround. (<a href="https://github.com/milvus-io/milvus/pull/23632">#23632</a>) (<a href="https://github.com/milvus-io/milvus/pull/23724">#23724</a>)</li>
<li>Cancel failed tasks in the scheduling queue promptly to prevent an increase in QueryCoord scheduling latency. (<a href="https://github.com/milvus-io/milvus/pull/23649">#23649</a>)</li>
<li>Fixed compatibility bug and recalculate segment rows to prevent service queries from being unavailable. (<a href="https://github.com/milvus-io/milvus/pull/23696">#23696</a>)</li>
<li>Fixed a bug in the superuser password validation logic. (<a href="https://github.com/milvus-io/milvus/pull/23729">#23729</a>)</li>
<li>Fixed the issue of shard detector rewatch failure, which was caused by returning a closed channel. (<a href="https://github.com/milvus-io/milvus/pull/23734">#23734</a>)</li>
<li>Fixed a loading failure caused by unhandled interrupts in the AWS SDK. (<a href="https://github.com/milvus-io/milvus/pull/23736">#23736</a>)</li>
<li>Fixed the “HasCollection” check in DataCoord. (<a href="https://github.com/milvus-io/milvus/pull/23709">#23709</a>)</li>
<li>Fixed the bug that assigned all available nodes to a single replica incorrectly. (<a href="https://github.com/milvus-io/milvus/pull/23626">#23626</a>)</li>
</ul>
<h3 id="Enhancement" class="common-anchor-header">Enhancement</h3><ul>
<li>Optimized the display of RootCoord histogram metrics. (<a href="https://github.com/milvus-io/milvus/pull/23567">#23567</a>)</li>
<li>Reduced peak memory consumption during collection loading. (<a href="https://github.com/milvus-io/milvus/pull/23138">#23138</a>)</li>
<li>Removed unnecessary handoff event-related metadata. (<a href="https://github.com/milvus-io/milvus/pull/23565">#23565</a>)</li>
<li>Added a plugin logic to QueryNode to support the dynamic loading of shared library files. (<a href="https://github.com/milvus-io/milvus/pull/23599">#23599</a>)</li>
<li>Supports load balancing with replica granularity. (<a href="https://github.com/milvus-io/milvus/pull/23629">#23629</a>)</li>
<li>Released a load-balancing strategy based on scores. (<a href="https://github.com/milvus-io/milvus/pull/23805">#23805</a>)</li>
<li>Added a coroutine pool to limit the concurrency of cgo calls triggered by &quot;delete&quot;. (<a href="https://github.com/milvus-io/milvus/pull/23680">#23680</a>)</li>
<li>Improved the compaction algorithm to make the distribution of segment sizes tend towards the ideal value. (<a href="https://github.com/milvus-io/milvus/pull/23692">#23692</a>)</li>
<li>Changed the default shard number to 1. (<a href="https://github.com/milvus-io/milvus/pull/23593">#23593</a>)</li>
<li>Improved search grouping algorithm to enhance throughput. (<a href="https://github.com/milvus-io/milvus/pull/23721">#23721</a>)</li>
<li>Code refactoring: Separated the read, build, and load DiskANN parameters. (<a href="https://github.com/milvus-io/milvus/pull/23722">#23722</a>)</li>
<li>Updated etcd and Minio versions. (<a href="https://github.com/milvus-io/milvus/pull/23765">#23765</a>)</li>
</ul>
<h2 id="v226" class="common-anchor-header">v2.2.6<button data-href="#v226" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 18 April, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.6</td><td>2.2.7</td><td>2.2.5</td><td>2.2.1</td><td>2.2.4</td></tr>
</tbody>
</table>
<p>You are advised to refrain from using version 2.2.5 due to several critical issues that require immediate attention. Version 2.2.6 addresses these issues. One of the critical issues is the inability to recycle dirty binlog data. We highly recommend using version 2.2.6 version instead of version 2.2.5 to avoid any potential complications.</p>
<p>If you hit the issue where data on object storage cannot be recycled, upgrade your Milvus to v2.2.6 to fix these issues.</p>
<h3 id="Bugfix" class="common-anchor-header">Bugfix</h3><ul>
<li>Fixed the problem of DataCoord GC failure  (<a href="https://github.com/milvus-io/milvus/pull/23298">#23298</a>)</li>
<li>Fixed the problem that index parameters passed when creating a collection will override those passed in subsequent create_index operations (<a href="https://github.com/milvus-io/milvus/pull/23242">#23242</a>)</li>
<li>Fix the problem that the message backlog occurs in RootCoord, which causes the delay of the whole system to increase (<a href="https://github.com/milvus-io/milvus/pull/23267">#23267</a>)</li>
<li>Fixed the accuracy of metric RootCoordInsertChannelTimeTick (<a href="https://github.com/milvus-io/milvus/pull/23284">#23284</a>)</li>
<li>Fixed the issue that the timestamp reported by the proxy may stop in some cases  (<a href="https://github.com/milvus-io/milvus/pull/23291">#23291</a>)</li>
<li>Fixed the problem that the coordinator role may self-destruct by mistake during the restart process (<a href="https://github.com/milvus-io/milvus/pull/23344">#23344</a>)</li>
<li>Fixed the problem that the checkpoint is left behind due to the abnormal exit of the garbage collection goroutine caused by the etcd restart (<a href="https://github.com/milvus-io/milvus/pull/23401">#23401</a>)</li>
</ul>
<h3 id="Enhancement" class="common-anchor-header">Enhancement</h3><ul>
<li>Added slow logging performance for query/search when the latency is not less than 5 seconds (<a href="https://github.com/milvus-io/milvus/pull/23274">#23274</a>)</li>
</ul>
<h2 id="v225" class="common-anchor-header">v2.2.5<button data-href="#v225" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 29 March, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.5</td><td>2.2.5</td><td>2.2.4</td><td>2.2.1</td><td>2.2.4</td></tr>
</tbody>
</table>
<h3 id="Security" class="common-anchor-header">Security</h3><p>Fixed MinIO CVE-2023-28432 by upgrading MinIO to RELEASE.2023-03-20T20-16-18Z.</p>
<h3 id="New-Features" class="common-anchor-header">New Features</h3><ul>
<li><p><strong>First/Random replica selection policy</strong></p>
<p>This policy allows for a random replica selection if the first replica chosen under the round-robin selection policy fails. This improves the throughput of database operations.</p></li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li><p>Fixed index data loss during the upgrade from Milvus 2.2.0 to 2.2.3 or higher.</p>
<ul>
<li>Fixed an issue to prevent DataCoord from calculating segment lines by stale log entries num (<a href="https://github.com/milvus-io/milvus/pull/23069">#23069</a>)</li>
<li>Fixed DataCoord’s meta that may be broken with DataNode of the prior version (<a href="https://github.com/milvus-io/milvus/pull/23031">#23031</a>)</li>
</ul></li>
<li><p>Fixed DataCoord Out-of-Memory (OOM) with large fresh pressure.</p>
<ul>
<li>Fixed an issue to make DataNode’s tt interval configurable (<a href="https://github.com/milvus-io/milvus/pull/22990">#22990</a>)</li>
<li>Fixed endless appending SIDs (<a href="https://github.com/milvus-io/milvus/pull/22989">#22989</a>)</li>
</ul></li>
<li><p>Fixed a concurrency issue in the LRU cache that was caused by concurrent queries with specified output fields.</p>
<ul>
<li>Fixed an issue to use single-flight to limit the readWithCache concurrent operation (<a href="https://github.com/milvus-io/milvus/pull/23037">#23037</a>)</li>
<li>Fixed LRU cache concurrency (<a href="https://github.com/milvus-io/milvus/pull/23041">#23041</a>)</li>
</ul></li>
<li><p>Fixed shard leader cache</p>
<ul>
<li>Fixed GetShardLeader returns old leader (<a href="https://github.com/milvus-io/milvus/pull/22887">#22887</a>) (<a href="https://github.com/milvus-io/milvus/pull/22903">#22903</a>)</li>
<li>Fixed an issue to deprecate the shard cache immediately if a query failed (<a href="https://github.com/milvus-io/milvus/pull/22848">#22848</a>)</li>
</ul></li>
<li><p>Other fixes</p>
<ul>
<li>Fixed query performance issue with a large number of segments (<a href="https://github.com/milvus-io/milvus/pull/23028">#23028</a>)</li>
<li>Fixed an issue to enable batch delete files on GCP of MinIO (<a href="https://github.com/milvus-io/milvus/pull/23052">#23052</a>) (<a href="https://github.com/milvus-io/milvus/pull/23083">#23083</a>)</li>
<li>Fixed flush delta buffer if SegmentID equals 0 (<a href="https://github.com/milvus-io/milvus/pull/23064">#23064</a>)</li>
<li>fixed unassigned from resource group (<a href="https://github.com/milvus-io/milvus/pull/22800">#22800</a>)</li>
<li>Fixed load partition timeout logic still using createdAt (<a href="https://github.com/milvus-io/milvus/pull/23022">#23022</a>)</li>
<li>Fixed unsub channel always removes QueryShard (<a href="https://github.com/milvus-io/milvus/pull/22961">#22961</a>)</li>
</ul></li>
</ul>
<h3 id="Enhancements" class="common-anchor-header">Enhancements</h3><ul>
<li>Added memory Protection by using the buffer size in memory synchronization policy (<a href="https://github.com/milvus-io/milvus/pull/22797">#22797</a>)</li>
<li>Added dimension checks upon inserted records (<a href="https://github.com/milvus-io/milvus/pull/22819">#22819</a>) (<a href="https://github.com/milvus-io/milvus/pull/22826">#22826</a>)</li>
<li>Added configuration item to disable BF load (<a href="https://github.com/milvus-io/milvus/pull/22998">#22998</a>)</li>
<li>Aligned the maximum dimensions of the DisANN index and that of a collection (<a href="https://github.com/milvus-io/milvus/pull/23027">#23027</a>)</li>
<li>Added checks whether all columns aligned with same num_rows (<a href="https://github.com/milvus-io/milvus/pull/22968">#22968</a>) (<a href="https://github.com/milvus-io/milvus/pull/22981">#22981</a>)</li>
<li>Upgraded Knowhere to 1.3.11 (<a href="https://github.com/milvus-io/milvus/pull/22975">#22975</a>)</li>
<li>Added the user RPC counter (<a href="https://github.com/milvus-io/milvus/pull/22870">#22870</a>)</li>
</ul>
<h2 id="v224" class="common-anchor-header">v2.2.4<button data-href="#v224" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 17 March, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.4</td><td>2.2.3</td><td>2.2.3</td><td>2.2.1</td><td>2.2.4</td></tr>
</tbody>
</table>
<p>Milvus 2.2.4 is a minor update to Milvus 2.2.0. It introduces new features, such as namespace-based resource grouping, collection-level physical isolation, and collection renaming.</p>
<p>In addition to these features, Milvus 2.2.4 also addresses several issues related to rolling upgrades, failure recovery, and load balancing. These bug fixes contribute to a more stable and reliable system.</p>
<p>We have also made several enhancements to make your Milvus cluster faster and consume less memory with reduced convergence time for failure recovery.</p>
<h3 id="New-Features" class="common-anchor-header">New Features</h3><ul>
<li><p>Resource grouping</p>
<p>Milvus has implemented resource grouping for QueryNodes. A resource group is a collection of QueryNodes. Milvus supports grouping QueryNodes in the cluster into different resource groups, where access to physical resources in different resource groups is completely isolated. See <a href="/docs/v2.2.x/resource_group.md">Manage Resource Group</a> for more information.</p></li>
<li><p>Collection renaming</p>
<p>The Collection-renaming API provides a way for users to change the name of a collection. Currently, PyMilvus supports this API, and SDKs for other programming languages are on the way. See <a href="/docs/v2.2.x/rename_collection.md">Rename a Collection</a> for details.</p></li>
<li><p>Google Cloud Storage support</p>
<p>Milvus now supports Google Cloud Storage as the object storage.</p></li>
<li><p>New option to the search and query APIs</p>
<p>If you are more concerned with performance rather than data freshness, enabling this option will skip search on all growing segments and offer better search performance under the scenario search with insertion. See <a href="https://milvus.io/api-reference/pymilvus/v2.2.3/Collection/search().md">search()</a> and <a href="https://milvus.io/api-reference/pymilvus/v2.2.3/Collection/query().md">query()</a> for details.</p></li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Bug fixes</h3><ul>
<li>Fixed segment not found when forwarding delete to empty segment (<a href="https://github.com/milvus-io/milvus/pull/22528">#22528</a>)(<a href="https://github.com/milvus-io/milvus/pull/22551">#22551</a>)</li>
<li>Fixed possible broken channel checkpoint in v2.2.2 (<a href="https://github.com/milvus-io/milvus/pull/22205">#22205</a>) (<a href="https://github.com/milvus-io/milvus/pull/22227">#22227</a>)</li>
<li>Fixed entity number mismatch with some entities inserted  (<a href="https://github.com/milvus-io/milvus/pull/22306">#22306</a>)</li>
<li>Fixed DiskANN recovery failure after QueryNode reboots (<a href="https://github.com/milvus-io/milvus/pull/22488">#22488</a>) (<a href="https://github.com/milvus-io/milvus/pull/22514">#22514</a>)</li>
<li>Fixed search/release on same segment (<a href="https://github.com/milvus-io/milvus/pull/22414">#22414</a>)</li>
<li>Fixed file system crash during bulk-loading files prefixed with a ‘.’ (<a href="https://github.com/milvus-io/milvus/pull/22215">#22215</a>)</li>
<li>Added tickle for DataCoord watch event (<a href="https://github.com/milvus-io/milvus/pull/21193">#21193</a>) (<a href="https://github.com/milvus-io/milvus/pull/22209">#22209</a>)</li>
<li>Fixed deadlock when releasing segments and removing nodes concurrently (<a href="https://github.com/milvus-io/milvus/pull/22584">#22584</a>)</li>
<li>Added channel balancer on DataCoord (<a href="https://github.com/milvus-io/milvus/pull/22324">#22324</a>) (<a href="https://github.com/milvus-io/milvus/pull/22377">#22377</a>)</li>
<li>Fixed balance generated reduce task (<a href="https://github.com/milvus-io/milvus/pull/22236">#22236</a>) (<a href="https://github.com/milvus-io/milvus/pull/22326">#22326</a>)</li>
<li>Fixed QueryCoord panic caused by balancing (<a href="https://github.com/milvus-io/milvus/pull/22486">#22486</a>)</li>
<li>Added scripts for rolling update Milvus’s component installed with helm (<a href="https://github.com/milvus-io/milvus/pull/22124">#22124</a>)</li>
<li>Added <code translate="no">NotFoundTSafer</code> and <code translate="no">NoReplicaAvailable</code> to retriable error code (<a href="https://github.com/milvus-io/milvus/pull/22505">#22505</a>)</li>
<li>Fixed no retires upon gRPC error (<a href="https://github.com/milvus-io/milvus/pull/22529">#22529</a>)</li>
<li>Fixed an issue for automatic component state update to healthy after start (<a href="https://github.com/milvus-io/milvus/pull/22084">#22084</a>)</li>
<li>Added graceful-stop for sessions (<a href="https://github.com/milvus-io/milvus/pull/22386">#22386</a>)</li>
<li>Added retry op for all servers (<a href="https://github.com/milvus-io/milvus/pull/22274">#22274</a>)</li>
<li>Fixed metrics info panic when network error happens (<a href="https://github.com/milvus-io/milvus/pull/22802">#22802</a>)</li>
<li>Fixed disordered minimum timestamp in proxy’s pchan statistics (<a href="https://github.com/milvus-io/milvus/pull/22756">#22756</a>)</li>
<li>Fixed an issue to ensure segment ID recovery upon failures to send time-tick (<a href="https://github.com/milvus-io/milvus/pull/22771">#22771</a>)</li>
<li>Added segment info retrieval without the binlog path (<a href="https://github.com/milvus-io/milvus/pull/22741">#22741</a>)</li>
<li>Added distribution.Peek for GetDataDistribution in case of blocked by release (<a href="https://github.com/milvus-io/milvus/pull/22752">#22752</a>)</li>
<li>Fixed the segment not found error (<a href="https://github.com/milvus-io/milvus/pull/22739">#22739</a>)</li>
<li>Reset delta position to vchannel in packSegmentLoadReq (<a href="https://github.com/milvus-io/milvus/pull/22721">#22721</a>)</li>
<li>Added vector float data verification for bulkinsert and insert (<a href="https://github.com/milvus-io/milvus/pull/22729">#22729</a>)</li>
<li>Upgraded Knowhere to 1.3.10 to fix bugs (<a href="https://github.com/milvus-io/milvus/pull/22746">#22746</a>)</li>
<li>Fixed RootCoord double updates TSO (<a href="https://github.com/milvus-io/milvus/pull/22715">#22715</a>) (<a href="https://github.com/milvus-io/milvus/pull/22723">#22723</a>)</li>
<li>Fixed confused time-tick logs (<a href="https://github.com/milvus-io/milvus/pull/22733">#22733</a>) (<a href="https://github.com/milvus-io/milvus/pull/22734">#22734</a>)</li>
<li>Fixed session nil point (<a href="https://github.com/milvus-io/milvus/pull/22696">#22696</a>)</li>
<li>Upgraded Knowhere to 1.3.10 (<a href="https://github.com/milvus-io/milvus/pull/22614">#22614</a>)</li>
<li>Fixed incorrect sequence of timetick statistics on proxy(<a href="https://github.com/milvus-io/milvus/pull/21855">#21855</a>) (<a href="https://github.com/milvus-io/milvus/pull/22560">#22560</a>)</li>
<li>Enabled DataCoord to handle GetIndexedSegment error from IndexCoord (<a href="https://github.com/milvus-io/milvus/pull/22673">#22673</a>)</li>
<li>Fixed an issue for Milvus writes flushed segment key only after the segment is flushed (<a href="https://github.com/milvus-io/milvus/pull/22667">#22667</a>)</li>
<li>Marked cache deprecated instead of removing it (<a href="https://github.com/milvus-io/milvus/pull/22675">#22675</a>)</li>
<li>Updated shard leader cache (<a href="https://github.com/milvus-io/milvus/pull/22632">#22632</a>)</li>
<li>Fixed an issue for the replica observer to assign node (<a href="https://github.com/milvus-io/milvus/pull/22635">#22635</a>)</li>
<li>Fixed the not found issue when retrieving collection creation timestamp (<a href="https://github.com/milvus-io/milvus/pull/22629">#22629</a>) (<a href="https://github.com/milvus-io/milvus/pull/22634">#22634</a>)</li>
<li>Fixed time-tick running backwards during DDLs (<a href="https://github.com/milvus-io/milvus/pull/22617">#22617</a>) (<a href="https://github.com/milvus-io/milvus/pull/22618">#22618</a>)</li>
<li>Fixed max collection name case (<a href="https://github.com/milvus-io/milvus/pull/22601">#22601</a>)</li>
<li>Fixed DataNode tickle not run default (<a href="https://github.com/milvus-io/milvus/pull/22622">#22622</a>)-</li>
<li>Fixed DataCoord panic while reading timestamp of an empty segment (<a href="https://github.com/milvus-io/milvus/pull/22598">#22598</a>)</li>
<li>Added scripts to get etcd info (<a href="https://github.com/milvus-io/milvus/pull/22589">#22589</a>)</li>
<li>Fixed concurrent loading timeout during DiskANN indexing (<a href="https://github.com/milvus-io/milvus/pull/22548">#22548</a>)</li>
<li>Fixed an issue to ensure index file not finish early because of compaction (<a href="https://github.com/milvus-io/milvus/pull/22509">#22509</a>)</li>
<li>Added <code translate="no">MultiQueryNodes</code> tag for resource group (<a href="https://github.com/milvus-io/milvus/pull/22527">#22527</a>) (<a href="https://github.com/milvus-io/milvus/pull/22544">#22544</a>)</li>
</ul>
<h3 id="Enhancement" class="common-anchor-header">Enhancement</h3><ul>
<li><p><strong>Performance</strong></p>
<ul>
<li>Improved query performance by avoiding counting all bits (<a href="https://github.com/milvus-io/milvus/pull/21909">#21909</a>) (<a href="https://github.com/milvus-io/milvus/pull/22285">#22285</a>)</li>
<li>Fixed dual copy of varchar fields while loading (<a href="https://github.com/milvus-io/milvus/pull/22114">#22114</a>) (<a href="https://github.com/milvus-io/milvus/pull/22291">#22291</a>)</li>
<li>Updated DataCoord compaction panic after DataNode update plan to ensure consistency (<a href="https://github.com/milvus-io/milvus/pull/22143">#22143</a>) (<a href="https://github.com/milvus-io/milvus/pull/22329">#22329</a>)</li>
<li>Improved search performance by avoiding allocating a zero-byte vector during searches (<a href="https://github.com/milvus-io/milvus/pull/22219">#22219</a>) (<a href="https://github.com/milvus-io/milvus/pull/22357">#22357</a>)</li>
<li>Upgraded Knowhere to 1.3.9 to accelerate IVF/BF (<a href="https://github.com/milvus-io/milvus/pull/22368">#22368</a>)</li>
<li>Improved search task merge policy (<a href="https://github.com/milvus-io/milvus/pull/22006">#22006</a>) (<a href="https://github.com/milvus-io/milvus/pull/22287">#22287</a>)</li>
<li>Refined Read method of MinioChunkManager to reduce IO(<a href="https://github.com/milvus-io/milvus/pull/22257">#22257</a>)</li>
</ul></li>
<li><p><strong>Memory Usage</strong></p>
<ul>
<li>Saved index files by 16m to save memory usage while indexing (<a href="https://github.com/milvus-io/milvus/pull/22369">#22369</a>)</li>
<li>Added memory usage too large sync policy (<a href="https://github.com/milvus-io/milvus/pull/22241">#22241</a>)</li>
</ul></li>
<li><p><strong>Others</strong></p>
<ul>
<li>Removed constraints that compaction happens only on indexed segment (<a href="https://github.com/milvus-io/milvus/pull/22145">#22145</a>)</li>
<li>Changed RocksMQ page size to 256M to reduce RocksMQ disk usage (<a href="https://github.com/milvus-io/milvus/pull/22433">#22433</a>)</li>
<li>Changed the etcd session timeout to 20s to improve recovery speed(<a href="https://github.com/milvus-io/milvus/pull/22400">#22400</a>)</li>
<li>Added the RBAC for the GetLoadingProgress and GetLoadState API (<a href="https://github.com/milvus-io/milvus/pull/22313">#22313</a>)</li>
</ul></li>
</ul>
<h2 id="v223" class="common-anchor-header">v2.2.3<button data-href="#v223" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 10 February, 2023</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.3</td><td>2.2.2</td><td>2.2.3</td><td>2.2.0</td><td>2.2.3</td></tr>
</tbody>
</table>
<p>Milvus 2.2.3 introduces the rolling upgrade capability to Milvus clusters and brings high availability settings to RootCoords. The former greatly reduces the impacts brought by the upgrade and restart of the Milvus cluster in production to the minimum, while the latter enables coordinators to work in active-standby mode and ensures a short failure recovery time of no more than 30 seconds.</p>
<p>In this release, Milvus also ships with a lot of improvements and enhancements in performance, including a fast bulk-insert experience with reduced memory usage and less loading time.</p>
<h3 id="Breaking-changes" class="common-anchor-header">Breaking changes</h3><p>In 2.2.3, the maximum number of fields in a collection is reduced from 256 to 64. (<a href="https://github.com/milvus-io/milvus/pull/22030">#22030</a>)</p>
<h3 id="Features" class="common-anchor-header">Features</h3><ul>
<li><p>Rolling upgrade</p>
<p>The rolling upgrade feature allows Milvus to respond to incoming requests during the upgrade, which is not possible in previous releases. In such releases, upgrading a Milvus instance requires it to be stopped first and then restarted after the upgrade is complete, leaving all incoming requests unanswered.</p>
<p>Related issues:</p>
<ul>
<li>Graceful stop of index nodes implemented (<a href="https://github.com/milvus-io/milvus/pull/21556">#21556</a>)</li>
<li>Graceful stop of query nodes implemented (<a href="https://github.com/milvus-io/milvus/pull/21528">#21528</a>)</li>
<li>Auto-sync of segments on closing implemented (<a href="https://github.com/milvus-io/milvus/pull/21576">#21576</a>)</li>
<li>Graceful stop APIs and error messages improved (<a href="https://github.com/milvus-io/milvus/pull/21580">#21580</a>)</li>
<li>Issues identified and fixed in the code of QueryNode and QueryCoord (<a href="https://github.com/milvus-io/milvus/pull/21565">#21565</a>)</li>
</ul></li>
<li><p>Coordinator HA</p>
<p>Coordinator HA allows Milvus coordinators to work in active-standby mode to avoid single-point of failures.</p>
<p>Related issues:</p>
<ul>
<li>HA-related issues identified and fixed in QueryCoordV2 (<a href="https://github.com/milvus-io/milvus/pull/21501">#21501</a>)</li>
<li>Auto-registration on the startup of Milvus was implemented to prevent both coordinators from working as the active coordinators. (<a href="https://github.com/milvus-io/milvus/pull/21641">#21641</a>)</li>
<li>HA-related issues identified and fixed in RootCoords (<a href="https://github.com/milvus-io/milvus/pull/21700">#21700</a>)</li>
<li>Issues identified and fixed in active-standby switchover (<a href="https://github.com/milvus-io/milvus/pull/21747">#21747</a>)</li>
</ul></li>
</ul>
<h3 id="Enhancements" class="common-anchor-header">Enhancements</h3><ul>
<li><p>Bulk-insert performance enhanced</p>
<ul>
<li>Bulk-insert enhancement implemented (<a href="https://github.com/milvus-io/milvus/pull/20986">#20986</a> <a href="https://github.com/milvus-io/milvus/pull/21532">#21532</a>)</li>
<li>JSON parser optimized for data import (<a href="https://github.com/milvus-io/milvus/pull/21332">#21332</a>)</li>
<li>Stream-reading NumPy data implemented (<a href="https://github.com/milvus-io/milvus/pull/21540">#21540</a>)</li>
<li>Bulk-insert progress report implemented (<a href="https://github.com/milvus-io/milvus/pull/21612">#21612</a>)</li>
<li>Issues identified and fixed so that Milvus checks indexes before flushes segments before bulk-insert is complete (<a href="https://github.com/milvus-io/milvus/pull/21604">#21604</a>)</li>
<li>Issues related to bulk-insert progress identified and fixed (<a href="https://github.com/milvus-io/milvus/pull/21668">#21668</a>)</li>
<li>Issues related to bulk-insert report identified and fixed (<a href="https://github.com/milvus-io/milvus/pull/21758">#21758</a>)</li>
<li>Issues identified and fixed so that Milvus does not seal failed segments while performing bulk-insert operations. (<a href="https://github.com/milvus-io/milvus/pull/21779">#21779</a>)</li>
<li>Issues identified and fixed so that bulk-insert operations do not cause a slow flush (<a href="https://github.com/milvus-io/milvus/pull/21918">#21918</a>)</li>
<li>Issues identified and fixed so that bulk-insert operations do not crash the DataNodes (<a href="https://github.com/milvus-io/milvus/pull/22040">#22040</a>)</li>
<li>Refresh option added to LoadCollection and LoadPartition APIs (<a href="https://github.com/milvus-io/milvus/pull/21811">#21811</a>)</li>
<li>Segment ID update on data import implemented (<a href="https://github.com/milvus-io/milvus/pull/21583">#21583</a>)</li>
</ul></li>
<li><p>Memory usage reduced</p>
<ul>
<li>Issues identified and fixed so that loading failures do not return insufficient memory (<a href="https://github.com/milvus-io/milvus/pull/21592">#21592</a>)</li>
<li>Arrow usage removed from FieldData (<a href="https://github.com/milvus-io/milvus/pull/21523">#21523</a>)</li>
<li>Memory usage reduced in indexing scalar fields (<a href="https://github.com/milvus-io/milvus/pull/21970">#21970</a>) (<a href="https://github.com/milvus-io/milvus/pull/21978">#21978</a>)</li>
</ul></li>
<li><p>Monitoring metrics optimized</p>
<ul>
<li>Issues related to unregistered metrics identified and fixed  (<a href="https://github.com/milvus-io/milvus/pull/22098">#22098</a>)</li>
<li>A new segment metric that counts the number of binlog files added (<a href="https://github.com/milvus-io/milvus/pull/22085">#22085</a>)</li>
<li>Many new metrics added (<a href="https://github.com/milvus-io/milvus/pull/21975">#21975</a>)</li>
<li>Minor fix on segment metric (<a href="https://github.com/milvus-io/milvus/pull/21977">#21977</a>)</li>
</ul></li>
<li><p>Meta storage performance improved</p>
<ul>
<li>Improved ListSegments performance for Datacoord catalog. (<a href="https://github.com/milvus-io/milvus/pull/21600">#21600</a>)</li>
<li>Improved LoadWithPrefix performance for SuffixSnapshot. (<a href="https://github.com/milvus-io/milvus/pull/21601">#21601</a>)</li>
<li>Removed redundant LoadPrefix requests for Catalog ListCollections. (<a href="https://github.com/milvus-io/milvus/pull/21551">#21551</a>) (<a href="https://github.com/milvus-io/milvus/pull/21594">#21594</a>)</li>
<li>Added A WalkWithPrefix API for MetaKv interface. (<a href="https://github.com/milvus-io/milvus/pull/21585">#21585</a>)</li>
<li>Added GC for snapshot KV based on time-travel. (<a href="https://github.com/milvus-io/milvus/pull/21417">#21417</a>) (<a href="https://github.com/milvus-io/milvus/pull/21763">#21763</a>)</li>
</ul></li>
<li><p>Performance improved</p>
<ul>
<li>Upgraded Knowhere to 1.3.7. (<a href="https://github.com/milvus-io/milvus/pull/21735">#21735</a>)</li>
<li>Upgraded Knowhere to 1.3.8. (<a href="https://github.com/milvus-io/milvus/pull/22024">#22024</a>)</li>
<li>Skipped search GRPC call for standalone. (<a href="https://github.com/milvus-io/milvus/pull/21630">#21630</a>)</li>
<li>Optimized some low-efficient code. (<a href="https://github.com/milvus-io/milvus/pull/20529">#20529</a>) (<a href="https://github.com/milvus-io/milvus/pull/21683">#21683</a>)</li>
<li>Fixed fill the string field twice when string index exists. (<a href="https://github.com/milvus-io/milvus/pull/21852">#21852</a>) (<a href="https://github.com/milvus-io/milvus/pull/21865">#21865</a>)</li>
<li>Used all() API for bitset check. (<a href="https://github.com/milvus-io/milvus/pull/20462">#20462</a>) (<a href="https://github.com/milvus-io/milvus/pull/21682">#21682</a>)</li>
</ul></li>
<li><p>Others</p>
<ul>
<li>Implemented the GetLoadState API. (<a href="https://github.com/milvus-io/milvus/pull/21533">#21533</a>)</li>
<li>Added a task to unsubscribe dmchannel. (<a href="https://github.com/milvus-io/milvus/pull/21513">#21513</a>) (<a href="https://github.com/milvus-io/milvus/pull/21794">#21794</a>)</li>
<li>Explicitly list the triggering reasons when Milvus denies reading/writing. (<a href="https://github.com/milvus-io/milvus/pull/21553">#21553</a>)</li>
<li>Verified and adjusted the number of rows in a segment before saving and passing SegmentInfo. (<a href="https://github.com/milvus-io/milvus/pull/21200">#21200</a>)</li>
<li>Added a segment seal policy by the number of binlog files. (<a href="https://github.com/milvus-io/milvus/pull/21941">#21941</a>)</li>
<li>Upgraded etcd to 3.5.5. (<a href="https://github.com/milvus-io/milvus/pull/22007">#22007</a>）</li>
</ul></li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Bug Fixes</h3><ul>
<li><p>QueryCoord segment replacement fixed</p>
<ul>
<li>Fixed the mismatch of sealed segments IDs after enabling load-balancing in 2.2. (<a href="https://github.com/milvus-io/milvus/pull/21322">#21322</a>)</li>
<li>Fixed the sync logic of the leader observer. (<a href="https://github.com/milvus-io/milvus/pull/20478">#20478</a>) (<a href="https://github.com/milvus-io/milvus/pull/21315">#21315</a>)</li>
<li>Fixed the issues that observers may update the current target to an unfinished next target. (<a href="https://github.com/milvus-io/milvus/pull/21107">#21107</a>) (<a href="https://github.com/milvus-io/milvus/pull/21280">#21280</a>)</li>
<li>Fixed the load timeout after the next target updates. (<a href="https://github.com/milvus-io/milvus/pull/21759">#21759</a>) (<a href="https://github.com/milvus-io/milvus/pull/21770">#21770</a>)</li>
<li>Fixed the issue that the current target may be updated to an invalid target. (<a href="https://github.com/milvus-io/milvus/pull/21742">#21742</a>) (<a href="https://github.com/milvus-io/milvus/pull/21762">#21762</a>)</li>
<li>Fixed the issue that a failed node may update the current target to an unavailable target. (<a href="https://github.com/milvus-io/milvus/pull/21743">#21743</a>)</li>
</ul></li>
<li><p>Improperly invalidated proxy cache fixed</p>
<ul>
<li>Fixed the issue that the proxy does not update the shard leaders cache for some types of error (<a href="https://github.com/milvus-io/milvus/pull/21185">#21185</a>) (<a href="https://github.com/milvus-io/milvus/pull/21303">#21303</a>)</li>
<li>Fixed the issue that Milvus invalidates the proxy cache first when the shard leader list contains error (<a href="https://github.com/milvus-io/milvus/pull/21451">#21451</a>) (<a href="https://github.com/milvus-io/milvus/pull/21464">#21464</a>)</li>
</ul></li>
<li><p>CheckPoint and GC Related issues fixed</p>
<ul>
<li>Fixed the issue that the checkpoint will not update after data delete and compact (<a href="https://github.com/milvus-io/milvus/pull/21495">#21495</a>)</li>
<li>Fixed issues related to channel checkpoint and GC (<a href="https://github.com/milvus-io/milvus/pull/22027">#22027</a>)</li>
<li>Added restraints on segment GC of DML position before channel copy (<a href="https://github.com/milvus-io/milvus/pull/21773">#21773</a>)</li>
<li>Removed collection meta after GC is complete (<a href="https://github.com/milvus-io/milvus/pull/21595">#21595</a>) (<a href="https://github.com/milvus-io/milvus/pull/21671">#21671</a>)</li>
</ul></li>
<li><p>Issues related to not being able to use embedded etcd with Milvus fixed</p>
<ul>
<li>Added setup config files for embedded etcd (<a href="https://github.com/milvus-io/milvus/pull/22076">#22076</a>)</li>
</ul></li>
<li><p>Others</p>
<ul>
<li>Fixed the offset panic in queries (<a href="https://github.com/milvus-io/milvus/pull/21292">#21292</a>) (<a href="https://github.com/milvus-io/milvus/pull/21751">#21751</a>)</li>
<li>Fixed the issue that small candidate compaction should only happen with more than one segment (<a href="https://github.com/milvus-io/milvus/pull/21250">#21250</a>)</li>
<li>Fixed the issue of memory usage calculation (<a href="https://github.com/milvus-io/milvus/pull/21798">#21798</a>)</li>
<li>Fixed the issue that a timestamp allocation failure blocks compaction queue forever (<a href="https://github.com/milvus-io/milvus/pull/22039">#22039</a>) (<a href="https://github.com/milvus-io/milvus/pull/22046">#22046</a>)</li>
<li>Fixed the issue that QueryNode may panic when stopped (<a href="https://github.com/milvus-io/milvus/pull/21406">#21406</a>) (<a href="https://github.com/milvus-io/milvus/pull/21419">#21419</a>)</li>
<li>Modified lastSyncTime in advance to prevent multiple flush binlogs (<a href="https://github.com/milvus-io/milvus/pull/22048">#22048</a>)</li>
<li>Fixed the issue that a collection does not exist when users try to recover it (<a href="https://github.com/milvus-io/milvus/pull/21471">#21471</a>) (<a href="https://github.com/milvus-io/milvus/pull/21628">#21628</a>)</li>
<li>Use tt msg stream for consume delete msg (<a href="https://github.com/milvus-io/milvus/pull/21478">#21478</a>)</li>
<li>Prevent users from deleting entities by any non-primary-key field (<a href="https://github.com/milvus-io/milvus/pull/21459">#21459</a>) (<a href="https://github.com/milvus-io/milvus/pull/21472">#21472</a>)</li>
<li>Fixed potential nil access on segments (<a href="https://github.com/milvus-io/milvus/pull/22104">#22104</a>)</li>
</ul></li>
</ul>
<h2 id="v222" class="common-anchor-header">v2.2.2<button data-href="#v222" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 22 December, 2022</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.2</td><td>2.2.1</td><td>2.2.1</td><td>2.2.0</td><td>2.2.1</td></tr>
</tbody>
</table>
<p>Milvus 2.2.2 is a minor fix of Milvus 2.2.1. It fixed a few loading failure issues as of the upgrade to 2.2.1 and the issue that the proxy cache is not cleaned upon some types of errors.</p>
<p><h3 id="v2.2.1">Bug Fixes</h3></p>
<ul>
<li>Fixed the issue that the proxy doesn’t update the cache of shard leaders due to some types of errors. (<a href="https://github.com/milvus-io/milvus/pull/21320">#21320</a>)</li>
<li>Fixed the issue that the loaded info is not cleaned for released collections/partitions. (<a href="https://github.com/milvus-io/milvus/pull/21321">#21321</a>)</li>
<li>Fixed the issue that the load count is not cleared on time. (<a href="https://github.com/milvus-io/milvus/pull/21314">#21314</a>)</li>
</ul>
<h2 id="v221" class="common-anchor-header">v2.2.1<button data-href="#v221" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 15 December, 2022</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.1</td><td>2.2.1</td><td>2.2.1</td><td>2.2.0</td><td>2.2.1</td></tr>
</tbody>
</table>
<p>Milvus 2.2.1 is a minor fix of Milvus 2.2.0. It supports authentication and TLS on all dependencies, optimizes the performance ludicrously on searches and fixes some critical issues. With tremendous contribution from the community, this release managed to resolve over 280 issues, so please try the new release and give us feedback on stability, performance and ease of use.</p>
<p><h3 id="v2.2.1">New Features</h3></p>
<ul>
<li>Supports Pulsa tenant and authentication. (<a href="https://github.com/milvus-io/milvus/pull/20762">#20762</a>)</li>
<li>Supports TLS in etcd config source. (<a href="https://github.com/milvus-io/milvus/pull/20910">#20910</a>)</li>
</ul>
<p><h3 id="v2.2.1">Performance</h3></p>
<p>After upgrading the Knowhere vector engine and changing the parallelism strategy, Milvus 2.2.1 improves search performance by over 30%.</p>
<p>Optimizes the scheduler, and increases merge tasks probability. (<a href="https://github.com/milvus-io/milvus/pull/20931">#20931</a>)</p>
<p><h3 id="v2.2.1">Bug Fixes</h3></p>
<ul>
<li>Fixed term filtering failures on indexed scalar fields. (<a href="https://github.com/milvus-io/milvus/pull/20840">#20840</a>)</li>
<li>Fixed the issue that only partial data returned upon QueryNode restarts. (<a href="https://github.com/milvus-io/milvus/pull/21139">#21139</a>)(<a href="https://github.com/milvus-io/milvus/pull/20976">#20976</a>)</li>
<li>Fixed IndexNode panic upon failures to create an index. (<a href="https://github.com/milvus-io/milvus/pull/20826">#20826</a>)</li>
<li>Fixed endless BinaryVector compaction and generation of data on Minio. (<a href="https://github.com/milvus-io/milvus/pull/21119">#21119</a>) (<a href="https://github.com/milvus-io/milvus/pull/20971">#20971</a>)</li>
<li>Fixed the issue that <code translate="no">meta_cache</code> of proxy partially updates. (<a href="https://github.com/milvus-io/milvus/pull/21232">#21232</a>)</li>
<li>Fixed slow segment loading due to staled checkpoints. (<a href="https://github.com/milvus-io/milvus/pull/21150">#21150</a>)</li>
<li>Fixed concurrently loaded Casbin model causing concurrent write operations. (<a href="https://github.com/milvus-io/milvus/pull/21132">#21132</a>)(<a href="https://github.com/milvus-io/milvus/pull/21145">#21145</a>)(<a href="https://github.com/milvus-io/milvus/pull/21073">#21073</a>)</li>
<li>Forbade garbage-collecting index meta when creating an index. (<a href="https://github.com/milvus-io/milvus/pull/21024">#21024</a>)</li>
<li>Fixed a bug that the index data can not be garbage-collected because <code translate="no">ListWithPrefix</code> from Minio with recursive is false. (<a href="https://github.com/milvus-io/milvus/pull/21040">#21040</a>)</li>
<li>Fixed an issue that an error code is returned when a query expression does not match any results. (<a href="https://github.com/milvus-io/milvus/pull/21066">#21066</a>)</li>
<li>Fixed search failures on disk index when <code translate="no">search_list</code> equals to <code translate="no">limit</code>. (<a href="https://github.com/milvus-io/milvus/pull/21114">#21114</a>)</li>
<li>Filled collection schema after DataCoord restarts.  (<a href="https://github.com/milvus-io/milvus/pull/21164">#21164</a>)</li>
<li>Fixed an issue that the compaction handler may double release and hang. (<a href="https://github.com/milvus-io/milvus/pull/21019">#21019</a>)</li>
<li>[restapi] Fixed precision loss for Int64 fields upon insert requests. (<a href="https://github.com/milvus-io/milvus/pull/20827">#20827</a>)</li>
<li>Increased <code translate="no">MaxWatchDuration</code> and make it configurable to prevent shards with large data loads from timing out. (<a href="https://github.com/milvus-io/milvus/pull/21010">#21010</a>)</li>
<li>Fixed the issue that the compaction target segment <code translate="no">rowNum</code> is always 0. (<a href="https://github.com/milvus-io/milvus/pull/20941">#20941</a>)</li>
<li>Fixed the issue that IndexCoord deletes segment index by mistake because IndexMeta is not stored in time. (<a href="https://github.com/milvus-io/milvus/pull/21058">#21058</a>)</li>
<li>Fixed the issue that DataCoord crushes if auto-compaction is disabled. (<a href="https://github.com/milvus-io/milvus/pull/21079">#21079</a>)</li>
<li>Fixed the issue that searches on growing segments even though the segments are indexed. (<a href="https://github.com/milvus-io/milvus/pull/21215">#21215</a>)</li>
</ul>
<p><h3 id="v2.2.1">Improvements</h3></p>
<ul>
<li>Refined logs and the default log level is set to INFO.</li>
<li>Fixed incorrect metrics and refined the metric dashboard.</li>
<li>Made TopK limit configurable (<a href="https://github.com/milvus-io/milvus/pull/21155">#21155</a>)</li>
</ul>
<p><h3 id="v2.2.1">Breaking changes</h3></p>
<p>Milvus now limits each RPC to 64 MB to avoid OOM and generating large message packs.</p>
<h2 id="v220" class="common-anchor-header">v2.2.0<button data-href="#v220" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 18 November, 2022</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.2.0</td><td>2.2.0</td><td>2.2.1</td><td>2.2.0</td><td>2.2.0</td></tr>
</tbody>
</table>
<p>Milvus 2.2.0 introduces many new features including support for Disk-based approximate nearest neighbor (ANN) algorithm, bulk insertion of entities from files, and role-based access control (RBAC) for an improved security. In addition, this major release also ushers in a new era for vector search with enhanced stability, faster search speed, and more flexible scalability.</p>
<p><h3 id="v2.2.0">Breaking changes</h3></p>
<p>Since metadata storage is refined and API usage is normalized, Milvus 2.2 is <em>not</em> fully compatible with earlier releases. Read <a href="/docs/v2.2.x/upgrade_milvus_cluster-helm.md">this guide</a> to learn how to safely upgrade from Milvus 2.1.x to 2.2.0.</p>
<p><h3 id="v2.2.0">Features</h3></p>
<ul>
<li><p>Support for bulk insertion of entities from files
Milvus now offers a new set of bulk insertion APIs to make data insertion more efficient. You can now upload entities in a Json file directly to Milvus. See <a href="/docs/v2.2.x/bulk_insert.md">Insert Entities from Files</a> for details.</p></li>
<li><p>Query result pagination
To avoid massive search and query results returned in a single RPC, Milvus now supports configuring offset and filtering results with keywords in searches and queries. See <a href="/docs/v2.2.x/search.md">Search</a> and <a href="/docs/v2.2.x/query.md">Query</a> for details.</p></li>
</ul>
<ul>
<li><p>Role-based access control (RBAC)
Like other traditional databases, Milvus now supports RBAC so that you can manages users, roles and privileges. See <a href="/docs/v2.2.x/rbac.md">Enable RBAC</a> for details.</p></li>
<li><p>Quotas and limits
Quota is a new mechanism that protects the system from OOM and crash under a burst of traffic. By imposing quota limitations, you can limit ingestion rate, search rate, etc. See <a href="/docs/v2.2.x/configure_quota_limits.md">Quota and Limitation Configurations</a> for details.</p></li>
</ul>
<ul>
<li>Time to live (TTL) at a collection level
In prior releases, we only support configuring TTL at a cluster level. Milvus 2.2.0 now supports configuring collection TTL when you create or modify a collection. After setting TTL for a collection, the entities in this collection automatically expires after the specified period of time. See <a href="/docs/v2.2.x/create_collection.md">Create a collection</a> or <a href="/docs/v2.2.x/modify_collection.md">Modify a collection</a> for details.</li>
</ul>
<ul>
<li>Support for disk-based approximate nearest neighbor search (ANNS) indexes (Beta)
Traditionally, you need to load the entire index into memory before search. Now with DiskANN, an SSD-resident and Vamana graph-based ANNS algorithm, you can directly search on large-scale datasets and save up to 10 times the memory.</li>
</ul>
<ul>
<li>Data backup (Beta)
Thanks to the contribution from <a href="https://zilliz.com/">Zilliz</a>, Milvus 2.2.0 now provides <a href="https://github.com/zilliztech/milvus-backup">a tool</a> to back up and restore data. The tool can be used either in a command line or an API server for data security.</li>
</ul>
<p><h3 id="v2.2.0">Bug fixes and stability</h3></p>
<ul>
<li>Implements query coord V2, which handles all channel/segment allocation in a fully event-driven and asynchronous mode. Query coord V2 address all issues of stuck searches and accelerates failure recovery.</li>
<li>Root coord and index coord are refactored for more elegant handling of errors and better task scheduling.</li>
<li>Fixes the issue of invalid RocksMQ retention mechanism when Milvus Standalone restarts.</li>
<li>Meta storage format in etcd is refactored. With the new compression mechanism, etcd kv size is reduced by 10 times and the issues of etcd memory and space are solved.</li>
<li>Fixes a couple of memory issues when entities are continuously inserted or deleted.</li>
</ul>
<p><h3 id="v2.2.0">Improvements</h3></p>
<ul>
<li><p>Performance</p>
<ul>
<li>Fixes performance bottleneck to that Milvus can fully utilize all cores when CPU is more than 8 cores.</li>
<li>Dramatically improves the search throughput and reduce the latency.</li>
<li>Decreases load speed by processing load in parallel.</li>
</ul></li>
<li><p>Observability</p>
<ul>
<li>Changes all log levels to <code translate="no">info</code> by default.</li>
<li>Added collection-level latency metrics for search, query, insertion, and deletion.</li>
</ul></li>
<li><p>Debug tool</p>
<ul>
<li><a href="https://github.com/milvus-io/birdwatcher">BirdWatcher</a>, the debug tool for Milvus, is further optimized as it can now connect to Milvus meta storage and inspect the part of the internal status of the Milvus system.</li>
</ul></li>
</ul>
<p><h3 id="v2.2.0">Others</h3></p>
<ul>
<li><p>Index and load</p>
<ul>
<li>A collection can only be loaded with an index created on it.</li>
<li>Indexes cannot be created after a collection is loaded.</li>
<li>A loaded collection must be released before dropping the index created on this collection.</li>
</ul></li>
<li><p>Flush</p>
<ul>
<li>Flush API, which forces a seal on a growing segment and syncs the segment to object storage, is now exposed to users. Calling <code translate="no">flush()</code> frequently may affect search performance as too many small segments are created.</li>
<li>No auto-flush is triggered by any SDK APIs such as <code translate="no">num_entities()</code>, <code translate="no">create_index()</code>, etc.</li>
</ul></li>
<li><p>Time Travel</p>
<ul>
<li>In Milvus 2.2,  Time Travel is disabled by default to save disk usage. To enable Time Travel, configure the parameter <code translate="no">common.retentionDuration</code> manually.</li>
</ul></li>
</ul>
