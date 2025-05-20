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
    </button></h1><p>Find out what’s new in Milvus! This page summarizes information about new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.0.0-RC1 in this section. We suggest that you regularly visit this page to learn about updates.</p>
<h2 id="v202" class="common-anchor-header">v2.0.2<button data-href="#v202" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 2022-04-02</p>
<p><h3 id="v2.0.2">Compatibility</h3></p>
<table class="version">
    <thead>
    <tr>
        <th>Milvus version</th>
        <th>Python SDK version</th>
        <th>Java SDK version</th>
        <th>Go SDK version</th>
        <th>Node.js SDK version</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>2.0.2</td>
        <td>2.0.2</td>
        <td>2.0.4</td>
        <td>2.0.0</td>
        <td>2.0.2</td>
    </tr>
    </tbody>
</table>
<p>Milvus 2.0.2 is a minor bug-fix version of Milvus 2.0. We fixed multiple critical issues of collection load failure and server crash. We’ve also greatly boosted the query by ID performance by utilizing primary key index. The Prometheus metrics is redesigned in this version and we highly recommend you to deploy the monitoring system in production environment.</p>
<p><h3 id="v2.0.2">Bug fixes</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/16338">#16338</a> Data coord uses VChannel when unsubscribing to data node.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/16178">#16178</a> <a href="https://github.com/milvus-io/milvus/pull/15725">#15725</a> Query node crashes.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/16035">#16035</a> <a href="https://github.com/milvus-io/milvus/pull/16063">#16063</a> <a href="https://github.com/milvus-io/milvus/pull/16066">#16066</a> Collection load error.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15932">#15932</a> Compaction runtime error.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15823">#15823</a> <code translate="no">DescribeCollection</code> RPC fails in data node failover.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15783">#15783</a> Recall drops after compaction.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15790">#15790</a> Shallow copy of <code translate="no">typeutil.AppendFieldData</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15728">#15728</a> Query coord sets wrong <code translate="no">watchDmchannelInfo</code> when one partition is empty.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15712">#15712</a> <code translate="no">DEPLOY_MODE</code> is got or used before set.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15702">#15702</a> Data coord panics if message queue service quits before it.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15707">#15707</a> Compaction generates empty segment.</li>
</ul>
<p><h3 id="v2.0.2">Performance</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/16327">#16327</a> Accelerates query speed in sealed segments.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15732">#15732</a> <a href="https://github.com/milvus-io/milvus/pull/15738">#15738</a> <a href="https://github.com/milvus-io/milvus/pull/15774">#15774</a> <a href="https://github.com/milvus-io/milvus/pull/15749">#15749</a> <a href="https://github.com/milvus-io/milvus/pull/15614">#15614</a> Avoids memory copy for <code translate="no">kv</code> interface &amp;&amp; GGO.</li>
</ul>
<p><h3 id="v2.0.2">Improvements</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/16244">#16244</a> <a href="https://github.com/milvus-io/milvus/pull/16243">#16243</a> <a href="https://github.com/milvus-io/milvus/pull/16245">#16245</a> Extends <code translate="no">DataCluster</code> Watch information via etcd.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15760">#15760</a> <a href="https://github.com/milvus-io/milvus/pull/15787">#15787</a> <a href="https://github.com/milvus-io/milvus/pull/16252">#16252</a> Fixes CentOS build.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15759">#15759</a> Refines code of data node <code translate="no">binlogIO</code>.</li>
</ul>
<p><h3 id="v2.0.2">Features</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/15540">#15540</a> Adds and implements <code translate="no">chunkManager</code> interface.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/16072">#16072</a> <a href="https://github.com/milvus-io/milvus/pull/15839">#15839</a> <a href="https://github.com/milvus-io/milvus/pull/15684">#15684</a> <a href="https://github.com/milvus-io/milvus/pull/15640">#15640</a> <a href="https://github.com/milvus-io/milvus/pull/15582">#15582</a> <a href="https://github.com/milvus-io/milvus/pull/15649">#15649</a> <a href="https://github.com/milvus-io/milvus/pull/15650">#15650</a> <a href="https://github.com/milvus-io/milvus/pull/15606">#15606</a> Refines Prometheus metrics.</li>
</ul>
<h2 id="v201" class="common-anchor-header">v2.0.1<button data-href="#v201" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 2022-02-23</p>
<p><h3 id="v2.0.1">Compatibility</h3></p>
<table class="version">
    <thead>
    <tr>
        <th>Milvus version</th>
        <th>Python SDK version</th>
        <th>Java SDK version</th>
        <th>Go SDK version</th>
        <th>Node.js SDK version</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>2.0.1</td>
        <td>2.0.1</td>
        <td>2.0.4</td>
        <td>2.0.0</td>
        <td>2.0.1</td>
    </tr>
    </tbody>
</table>
<p>Milvus 2.0.1 is a minor bug-fix version of Milvus 2.0. The key progress of Milvus 2.0.1 includes that, first, the execution engine of Milvus <code translate="no">knowhere</code> was separated from the Milvus repository and moved to a new one - <a href="https://github.com/milvus-io/knowhere">milvus-io/knowhere</a>, and, second, supports were enabled for Milvus to be compiled across multiple platforms. We fixed a few critical issues that cause query node crash, index building failure, and server hang. The default dependency of Golang is upgraded to solve memory usage issues. We also upgrade the default dependency of Pulsar to solve the <code translate="no">log4j</code> security issue.</p>
<p><h3 id="v2.0.1">Improvements</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/15491">#15491</a> Supports compiling and running Milvus on Mac.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15453">#15453</a> Adds log when removing keys in garbage collector.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15551">#15551</a> Avoids copying while converting C bytes to Go bytes.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15377">#15377</a> Adds <code translate="no">collectionID</code> to the return of <code translate="no">SearchResults</code> and <code translate="no">QueryResults</code>.</li>
</ul>
<p><h3 id="v2.0.1">Features</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/14418">#14418</a> Implements automatic item expiration on compaction.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15542">#15542</a> Implements mixed compaction logic.</li>
</ul>
<p><h3 id="v2.0.1">Bug fixes</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/15702">#15702</a> Data coord panics if message queue service quits before it closes.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15663">#15663</a> Query node crashes on concurrent search.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15580">#15580</a> Data node panics when compacting empty segment.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15626">#15626</a> Failed to create index when segment size is set to large than 2GB.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15497">#15497</a> <code translate="no">SessionWatcher</code> quits if not re-watch logic is provided when meeting <code translate="no">ErrCompacted</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15530">#15530</a> Segments under Flushing status are not treated as Flushed segment.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15436">#15436</a> Watch DML channel failed because of no collection meta, causing load collection failure.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15455">#15455</a> <code translate="no">SegmentIDs</code> is not respected when <code translate="no">querynode.GetSegmentInfo</code> is called.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15482">#15482</a> <code translate="no">EntriesNum</code> of delta logs is not recorded correctly in segment meta.</li>
</ul>
<p><h3 id="v2.0.1">Dependency Upgrade</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/11393">#11393</a> Upgrades Golang from 1.15.2 to 1.16.9.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15603">#15603</a> Upgrades <code translate="no">Knowhere</code> to 1.0.1.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15580">#15580</a> Upgrades Pulsar from 2.7.3 to 2.8.2.</li>
</ul>
<h2 id="v200" class="common-anchor-header">v2.0.0<button data-href="#v200" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 2022-01-25</p>
<p><h3 id="v2.0.0">Compatibility</h3></p>
<table class="version">
    <thead>
    <tr>
        <th>Milvus version</th>
        <th>Python SDK version</th>
        <th>Java SDK version</th>
        <th>Go SDK version</th>
        <th>Node.js SDK version</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>2.0.0</td>
        <td>2.0.0</td>
        <td>2.0.2</td>
        <td>2.0.0</td>
        <td>2.0.0</td>
    </tr>
    </tbody>
</table>
<p>We are excited to announce the general release of Milvus 2.0 and it is now considered as production ready. Without changing the existing functionality released in the PreGA release, we fixed several critical bugs reported by users. We sincerely encourage all users to upgrade your Milvus to 2.0.0 release for better stability and performance.</p>
<p><h3 id="v2.0.0">Improvements</h3></p>
<ul>
<li><p>Changes the default consistency level to <code translate="no">Bounded</code>:
If consistency level <code translate="no">Strong</code> is adopted during a search, Milvus waits until data are synchronized before the search, thus spending longer even on a small dataset. Under the the default consistency level of <code translate="no">Bounded</code>, newly inserted data remain invisible for a could of seconds before they can be retrieved. For more information, see <a href="https://github.com/milvus-io/milvus/blob/master/docs/developer_guides/how-guarantee-ts-works.md">Guarantee Timestamp in Search Requests</a>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/15223">#15223</a> Makes query nodes send search or query results by RPC.</p></li>
</ul>
<p><h3 id="v2.0.0">Bug fixes</h3></p>
<ul>
<li><p>Writing blocked by message storage quota exceed exception:</p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/15221">#15221</a> Unsubscribes channel when closing Pulsar consumer.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15230">#15230</a> Unsubscribes channel after query node is down.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15284">#15284</a> Adds retry logic when pulsar consumer unsubscribes channel.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15353">#15353</a> Unsubscribes topic in data coord.</li>
</ul></li>
<li><p>Resource leakage:</p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/15303">#15303</a> Cleans flow graph if failed to <code translate="no">watchChannel</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15237">#15237</a> Calls for releasing memory in case that error occurs.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15013">#15013</a> Closes payload writer when error occurs.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/14630">#14630</a> Checks leakage of index CGO object.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/14543">#14543</a> Fixes that Pulsar reader is not close.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15068">#15068</a> Fixes that file is not close when <code translate="no">ReadAll</code> returns error in local chunk manager.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15305">#15305</a> Fixes query node search exceptions will cause memory leak.</li>
</ul></li>
<li><p>High memory usage:</p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/15196">#15196</a> Releases memory to OS after index is built.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15180">#15180</a> Refactors flush manager injection to reduce goroutine number.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15100">#15100</a> Fixes storage memory leak caused by <code translate="no">runtime.SetFinalizer</code>.</li>
</ul></li>
</ul>
<ul>
<li><p>Cluster hang:</p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/15181">#15181</a> Stops handoff if the segment has been compacted.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15189">#15189</a> Retains <code translate="no">nodeInfo</code> when query coord panic at <code translate="no">loadBalanceTask</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15250">#15250</a> Fixes <code translate="no">collectResultLoop</code> hang after search timeout.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15102">#15102</a> Adds flow graph manager and event manager.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15161">#15161</a> Panic when recover query node failed.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15347">#15347</a> Makes index node panic when failed to save meta to <code translate="no">MetaKV</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15343">#15343</a> Fixes Pulsar client bug.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/15370">#15370</a> Releases collection first when drop collection.</li>
</ul></li>
<li><p>Incorrect returned data:</p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/15177">#15177</a> Removes global sealed segments in historical.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/14758">#14758</a> Fixes that deleted data returned when handoff is done for the segment.</li>
</ul></li>
</ul>
<p><h3 id="v2.0.0">Known issues</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/issues/14077">#14077</a> Core dump happens under certain workload and it is still under reproducing.
Solution: The system will be recovered automatically.</li>
<li><a href="https://github.com/milvus-io/milvus/issues/15283">#15283</a> Cluster fails to recover because Pulsar’s failure to create consumer <a href="https://github.com/apache/pulsar/issues/13920">Pulsar #13920</a>.
Solution: Restart pulsar cluster.</li>
<li>The default dependency Pulsar use old log4j2 version and contains security vulnerability.
Solution: Upgrade pulsar dependency to 2.8.2. We will soon release a minor version to upgrade Pulsar to newer releases.</li>
<li><a href="https://github.com/milvus-io/milvus/issues/15371">#15371</a> Data coord may fail to cleanup channel subscription if balance and node crash happens at same time.
Solution: Remove the channel subscription with Pulsar admin.</li>
</ul>
<h2 id="v200-PreGA" class="common-anchor-header">v2.0.0-PreGA<button data-href="#v200-PreGA" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 2021-12-31</p>
<p><h3 id="v2.0.0-PreGA">Compatibility</h3></p>
<table class="version">
    <thead>
    <tr>
        <th>Milvus version</th>
        <th>Python SDK version</th>
        <th>Java SDK version</th>
        <th>Go SDK version</th>
        <th>Node.js SDK version</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>2.0.0-PreGA</td>
        <td>2.0.0rc9</td>
        <td>2.0.0</td>
        <td>Coming soon</td>
        <td>1.0.20</td>
    </tr>
    </tbody>
</table>
<p>Milvus 2.0.0-PreGA is the preview release of Milvus 2.0. It now supports entity deletion by primary key and data compaction to purge deleted data. We also introduce a load balancing mechanism into Milvus to distribute the memory usage of each query node evenly. Some critical issues are fixed in this release, including cleanup of dropped collection data, wrong distance calculation of Jaccard distance, and several bugs that cause system hang and memory leakage.</p>
<p>It should be noted that Milvus 2.0.0-PreGA is NOT compatible with previous versions of Milvus 2.0 because of some changes made to data codec format and RocksMQ data format.</p>
<p><h3 id="v2.0.0-PreGA">Features</h3></p>
<ul>
<li><p>Deleting entity: Milvus now supports deleting entities through primary keys. Whereas Milvus relies on append-only storage, it only supports logical deletion, id est, Milvus inserts a deletion mark on the entities to cover actual data so that no search or query will return the marked entities. Therefore, it should be noted that overusing deletion may cause search performance to plummet and storage usage to surge. See <a href="/docs/v2.0.x/delete_data.md">Delete entities</a> for more instruction.</p></li>
<li><p>Compaction: Compaction mechanism purges the deleted or expired entities in binlogs to save storage space. It is a background task that is triggered by data coord and executed by data node.</p></li>
<li><p>Automatic Loadbalance <a href="https://github.com/milvus-io/milvus/issues/9481">#9481</a>：Loadbalance mechanism distributes segments evenly across query nodes to balance the memory usage of the cluster. It can be triggered either automatically or by users.</p></li>
<li><p>Handoff <a href="https://github.com/milvus-io/milvus/issues/9481">#9481</a>：Handoff mechanism refers to that, when a growing segment is sealed, query node waits until the segment is built with index by index node and then loads the segment into memory for search or query.</p></li>
</ul>
<p><h3 id="v2.0.0-PreGA">Improvements</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/12199">#12199</a> Parallelizes executions between segments to improve the search performance.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/11373">#11373</a> Allows batch consumption of messages in RocksMQ internal loop to improve the system efficiency.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/11665">#11665</a> Postpones the execution of handoff until index creation is completed.</li>
</ul>
<p><h3 id="v2.0.0-PreGA">Bug fixes</h3></p>
<ul>
<li>Data are not cleared on etcd, Pulsar, and MinIO when a collection is dropped:
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/12191">#12191</a> Clears the metadata of the dropped segment on etcd.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/11554">#11554</a> Adds garbage collector for data coord.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/11552">#11552</a> Completes procedure of dropping collection in data node.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/12227">#12227</a> Removes all index when dropping collection.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/11436">#11436</a> Changes the default retentionSizeInMB to 8192 (8GB).</li>
</ul></li>
<li><a href="https://github.com/milvus-io/milvus/pull/11901">#11901</a> Wrong distances calculation caused by properties of different metric types.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/12511">#12511</a> Wrong similarity correlation caused by properties of different metric types.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/12225">#12225</a> RocksMQ produce hang when do search repeatedly</li>
<li><a href="https://github.com/milvus-io/milvus/pull/12255">#12255</a> RocksMQ server does not close when standalone exits.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/12281">#12281</a> Error when dropping alias.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/11769">#11769</a> Update serviceableTime incorrectly.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/11325">#11325</a> Panic when reducing search results.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/11248">#11248</a> Parameter guarantee_timestamp is not working.</li>
</ul>
<p><h3 id="v2.0.0-PreGA">Other Enhancements</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/12351">#12351</a> Changes proxy default RPC transfer limitation.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/12055">#12055</a> Reduces memory cost when loading from MinIO.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/12248">#12248</a> Supports more deployment metrics.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/11247">#11247</a> Adds getNodeInfoByID and getSegmentInfoByNode function for cluster.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/11181">#11181</a> Refactors segment allocate policy on query coord.</li>
</ul>
<h2 id="v200-RC8" class="common-anchor-header">v2.0.0-RC8<button data-href="#v200-RC8" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 2021-11-5</p>
<p><h3 id="v2.0.0-RC8">Compatibility</h3></p>
<table class="version">
    <thead>
    <tr>
        <th>Milvus version</th>
        <th>Python SDK version</th>
        <th>Java SDK version</th>
        <th>Go SDK version</th>
        <th>Node.js SDK version</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>2.0.0-RC8</td>
        <td>2.0.0rc8</td>
        <td>Coming soon</td>
        <td>Coming soon</td>
        <td>2.0.x</td>
    </tr>
    </tbody>
</table>
<p>Milvus 2.0.0-RC8 is the last release candidate of Milvus 2.0. It supports handoff task, primary key deduplication and search by Time Travel functionalities. The mean time to recovery (MTTR) has also been greatly reduced with the enhancement of timetick mechanism. We had run stress test on 2.0.0-RC8 with 10M datasets, and both standalone and distributed cluster survived for 84 hours.</p>
<p>Current deduplication feature does not guarantee overwriting the old data copies when data with duplicate primary keys (<code translate="no">pk</code>) are inserted. Therefore, which data copy will return when queried remains unknown behavior. This limitation will be fixed in future releases.</p>
<p><h3 id="v2.0.0-RC8">Improvements</h3></p>
<ul>
<li><p>Failure Recovery speed:</p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/10737">#10737</a> Fixes Session checker for proxy.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10723">#10723</a> Fixes seek query channel error.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10907">#10907</a> Fixes <code translate="no">LatestPosition</code> option conflict with earliest patch.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10616">#10616</a> Removes Common YAML.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10771">#10771</a> Changes <code translate="no">SeekPosition</code> to the earliest of all segments.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10651">#10651</a> Fixes query coord set seek position error.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/9543">#9543</a> Initializes global sealed segments and seek query channel when <code translate="no">AddQueryChannel</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/9684">#9684</a> Skips re-consuming timetick MsgStream when data coord restarts.</li>
</ul></li>
<li><p>Refactor meta snapshot:</p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/10288">#10288</a> Reduces information saved in <code translate="no">SnapshotMeta</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10703">#10703</a> Fixes failure when creating meta table because of compatibility issue.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/9778">#9778</a> Simplifies <code translate="no">meta_snapshot</code> interface.</li>
</ul></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10563">#10563</a> Changes default balance policy.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10730">#10730</a> Returns segment state when getting query segment information.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10534">#10534</a> Supports reading MinIO configuration from environment variables.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10114">#10114</a> Sets default <code translate="no">gracefulTime</code> to <code translate="no">0</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/9860">#9860</a> Hides <code translate="no">liveChn</code> into <code translate="no">sessionutil</code> and fix liveness initialization order.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/7115">#7115</a> Uses etcd to watch channel on data node.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/7606">#7606</a> Makes <code translate="no">knowhere</code> compile independently.</p></li>
</ul>
<p><h3 id="v2.0.0-RC8">Features</h3></p>
<ul>
<li><p>Handoff:</p>
<ul>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10330">#10330</a> Adds <code translate="no">handoffTask</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10084">#10084</a> Broadcasts <code translate="no">sealedSegmentChangeInfo</code> to <code translate="no">queryChannel</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10619">#10619</a> Fixes removing segment when query node receives <code translate="no">segmentChangeInfo</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10045">#10045</a> Watches <code translate="no">changeInfo</code> in query node.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10011">#10011</a> Updates excluded segments info when receiving <code translate="no">changeInfo</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/9606">#9606</a> Adds initialization information for <code translate="no">AddQueryChannelRequest</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10619">#10619</a> Fixes removing segment when query node receives <code translate="no">segmentChangeInfo</code>.</p></li>
</ul></li>
<li><p>Primary Deduplication:</p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/10834">#10834</a> Removes primary key duplicated query result in query node.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10355">#10355</a> Removes duplicated search results in proxy.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10117">#10117</a> Removes duplicated search results in segcore reduce.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10949">#10949</a> Uses primary key only to check search result duplication.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10967">#10967</a> Removes primary key duplicated query result in proxy.</li>
</ul></li>
<li><p>Auto-flush:</p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/10659">#10659</a> Adds <code translate="no">injectFlush</code> method for <code translate="no">flushManager</code> interface.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10580">#10580</a> Adds injection logic for <code translate="no">FlushManager</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10550">#10550</a> Merges automatic and manual flush with same segment ID.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10539">#10539</a> Allows flushed segments to trigger flush process.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10197">#10197</a> Adds a timed flush trigger mechanism.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10142">#10142</a> Applies flush manager logic in data node.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10075">#10075</a> Uses single signal channel to notify flush.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/9986">#9986</a> Adds flush manager structure.</li>
</ul></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10173">#10173</a> Adds binlog iterators.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10193">#10193</a> Changes bloom filter use primary key.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/9782">#9782</a> Adds <code translate="no">allocIDBatch</code> for data node allocator.</p></li>
</ul>
<p><h3 id="v2.0.0-RC8">Bug fixes</h3></p>
<ul>
<li><p>Incorrect collection loading behavior if there is not enough memory:</p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/10796">#10796</a> Fixes get container mem usage.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10800">#10800</a> Uses <code translate="no">TotalInactiveFile</code> in <code translate="no">GetContainerMemUsed</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10603">#10603</a> Increases compatibility for <code translate="no">EstimateMemorySize</code> interface.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10363">#10363</a> Adds <code translate="no">cgroups</code> to get container memory and check index memory in segment loader.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10294">#10294</a> Uses proto size to calculate request size.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/9688">#9688</a> Estimates memory size with descriptor event.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/9681">#9681</a> Fixes the way that binlog stores the original memory size.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/9628">#9628</a> Stores original memory size of binlog file to extra information.</li>
</ul></li>
<li><p>Size of etcd-related request is too large:</p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/10909">#10909</a> Fixes too many operations in <code translate="no">txn</code> request when saving <code translate="no">segmentInfo</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10812">#10812</a> Fixes too large request when loading segment.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10768">#10768</a> Fixes too large request when loading collection.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10655">#10655</a> Splits watch operations into many transactions.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10587">#10587</a> Compacts <code translate="no">multiSegmentChangeInfo</code> to a single info.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10425">#10425</a> Trims <code translate="no">segmentinfo</code> binlog for <code translate="no">VChaninfo</code> usage.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10340">#10340</a> Fixes <code translate="no">multiSave</code> <code translate="no">childTask</code> failed to etcd.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10310">#10310</a> Fixes error when assigning load segment request.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10125">#10125</a> Splits large <code translate="no">loadSegmentReq</code> to multiple small requests.</li>
</ul></li>
<li><p>System panics:</p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/10832">#10832</a> Adds query <code translate="no">mutex</code> to fix crash with panic.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10821">#10821</a> Index node finishes the task before index coord changed the meta.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10182">#10182</a> Fixes panic when flushing segment.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/10681">#10681</a> Fixes query coord panic when upgrading <code translate="no">querychannelInfo</code>.</li>
</ul></li>
<li><p>RocksMQ-related issues:</p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/10367">#10367</a> Stops retention gracefully.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/9828">#9828</a> Fixes retention data race.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/9933">#9933</a> Changes retention ticker time to 10 minutes.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/9694">#9694</a> Deletes messages before deleting metadata in rocksmq retention.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/11029">#11029</a> Fixes rocksmq <code translate="no">SeekToLatest</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/11057">#11057</a> Fixes <code translate="no">SeekToLatest</code> memory leakage and remove redundant logic.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/11081">#11081</a> Fixes rocksdb retention ts not set.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/11083">#11083</a> Adds topic lock for rocksmq <code translate="no">Seek</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/11076">#11076</a> Moves topic lock to the front of final delete in retention expired cleanup.</li>
</ul></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10751">#10751</a> <code translate="no">loadIndex</code> keep retrying when <code translate="no">indexFilePathInfo</code> gets empty list.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10583">#10583</a> <code translate="no">ParseHybridTs</code> returns type to INT64.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10599">#10599</a> Delete message hash error.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10314">#10314</a> Index building task mistakenly canceled by index coord by mistake.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/9701">#9701</a> Incorrect <code translate="no">CreateAlias/DropAlias/AlterAlias</code> implementation.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/9573">#9573</a> Timeout when data coord saves binlog.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/9788">#9788</a> Watch Channel canceled due to revision compacted.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/10994">#10994</a> Index node does not balances load.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/11152">#11152</a> Search is wrong when using Time Travel without filtering condition and call <code translate="no">num_entities</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/11249">#11249</a> <a href="https://github.com/milvus-io/milvus/pull/11277">#11277</a> Release collection block in query node.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/11222">#11222</a> Incorrect empty retrieve result handling.</p></li>
</ul>
<h2 id="v200-RC7" class="common-anchor-header">v2.0.0-RC7<button data-href="#v200-RC7" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 2021-10-11</p>
<p><h3 id="v2.0.0-RC7">Compatibility</h3></p>
<table class="version">
    <thead>
    <tr>
        <th>Milvus version</th>
        <th>Python SDK version</th>
        <th>Java SDK version</th>
        <th>Go SDK version</th>
        <th>Node.js SDK version</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>2.0.0-RC7</td>
        <td>2.0.0rc7</td>
        <td>Coming soon</td>
        <td>Coming soon</td>
        <td>2.0.x</td>
    </tr>
    </tbody>
</table>
<p>Milvus 2.0.0-RC7 is a preview version of Milvus 2.0. It supports collection alias, shares <code translate="no">msgstream</code> on physical channel, and changes the default MinIO and Pulsar dependencies to cluster version. Several resource leaks and deadlocks were fixed.</p>
<p>It should be noted that Milvus 2.0.0-RC7 is NOT compatible with previous versions of Milvus 2.0 because of some changes made to storage format.</p>
<p><h3 id="v2.0.0-RC7">Improvements</h3></p>
<ul>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8215">#8215</a> Adds max number of retries for <code translate="no">interTask</code> in query coord.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/9459">#9459</a> Applies collection start position.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8721">#8721</a> Adds Node ID to Log Name.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8940">#8940</a> Adds streaming segments memory to used memory in <code translate="no">checkLoadMemory</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8542">#8542</a> Replaces <code translate="no">proto.MarshalTextString</code> with <code translate="no">proto.Marshal</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8770">#8770</a> Refactors flowgraph and related invocation.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8666">#8666</a> Changes CMake version.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8653">#8653</a> Updates <code translate="no">getCompareOpType</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8697">#8697</a> <a href="https://github.com/milvus-io/milvus/pull/8682">#8682</a> <a href="https://github.com/milvus-io/milvus/pull/8657">#8657</a> Applies collection start position when opening segment.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8608">#8608</a> Changes segment replica structure.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8565">#8565</a> Refactors buffer size calculation.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8262">#8262</a> Adds <code translate="no">segcore</code> logger.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8138">#8138</a> Adds <code translate="no">BufferData</code> in <code translate="no">insertBufferNode</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/7738">#7738</a> Implements allocating <code translate="no">msgstream</code> from pool when creating collections.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8054">#8054</a> Improves codes in <code translate="no">insertBufferNode</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/7909">#7909</a> Upgrades <code translate="no">pulsar-client-go</code> to 0.6.0.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/7913">#7913</a> Moves segcore rows_per_chunk configuration to query_node.yaml.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/7792">#7792</a> Removes <code translate="no">ctx</code> from <code translate="no">LongTermChecker</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/9269">#9269</a> Changes <code translate="no">==</code> to <code translate="no">is</code> when comparing to None in expression.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8159">#8159</a> Make <code translate="no">FlushSegments</code> async.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8278">#8278</a> Refactor rocksmq close logic and improve codecov.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/7797">#7797</a> Uses definitional type instead of raw type.</p></li>
</ul>
<p><h3 id="v2.0.0-RC7">Features</h3></p>
<ul>
<li><p><a href="https://github.com/milvus-io/milvus/pull/9579">#9579</a> Uses replica memory size and <code translate="no">cacheSize</code> in <code translate="no">getSystemInfoMetrics</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/9556">#9556</a> Adds <code translate="no">ProduceMark</code> interface to return message ID.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/9554">#9554</a> Supports <code translate="no">LoadPartial</code> interface for DataKV.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/9471">#9471</a> Supports <code translate="no">DescribeCollection</code> by collection ID.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/9451">#9451</a> Stores index parameters to descriptor event.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8574">#8574</a> Adds a <code translate="no">round_decimal</code> parameter for precision control to search function.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8947">#8947</a> Rocksmq supports <code translate="no">SubscriptionPositionLatest</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8919">#8919</a> Splits blob into several string rows when index file is large.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8914">#8914</a> Binlog parser tool supports index files.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8514">#8514</a> Refactors the index file format.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8765">#8765</a> Adds <code translate="no">cacheSize</code> to prevent OOM in query node.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8673">#8673</a> <a href="https://github.com/milvus-io/milvus/pull/8420">#8420</a> <a href="https://github.com/milvus-io/milvus/pull/8212">#8212</a> <a href="https://github.com/milvus-io/milvus/pull/8272">#8272</a> <a href="https://github.com/milvus-io/milvus/pull/8166">#8166</a> Supports multiple Milvus clusters sharing Pulsar and MinIO.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8654">#8654</a> Adds <code translate="no">BroadcastMark</code> for <code translate="no">Msgstream</code> returning Message IDs.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8586">#8586</a> Adds Message ID return value into producers.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8408">#8408</a> <a href="https://github.com/milvus-io/milvus/pull/8363">#8363</a> <a href="https://github.com/milvus-io/milvus/pull/8454">#8454</a> <a href="https://github.com/milvus-io/milvus/pull/8064">#8064</a> <a href="https://github.com/milvus-io/milvus/pull/8480">#8480</a> Adds session liveness check.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8264">#8264</a> Adds description event extras.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8341">#8341</a> Replaces <code translate="no">MarshalTextString</code> with <code translate="no">Marshal</code> in root coord.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8228">#8228</a> Supports healthz check API.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8276">#8276</a> Initializes the SIMD type when initializing an index node.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/7967">#7967</a> Adds knowhere.yaml to support knowhere configuration.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/7974">#7974</a> Supports setting max task number of task queue.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/7948">#7948</a> <a href="https://github.com/milvus-io/milvus/pull/7975">#7975</a> Adds <code translate="no">suffixSnapshot</code> to implement SnapshotKV.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/7942">#7942</a> Supports configuring SIMD type.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/7814">#7814</a> Supports bool field filter in search and query expression.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/7635">#7635</a> Supports setting segcore rows_per_chunk via configuration file.</p></li>
</ul>
<p><h3 id="v2.0.0-RC7">Bug fixes</h3></p>
<ul>
<li><p><a href="https://github.com/milvus-io/milvus/pull/9572">#9572</a> Rocksdb does not delete the end key after <code translate="no">DeleteRange</code> is called.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8735">#8735</a> Acked infomation takes up memory resources.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/9454">#9454</a> Data race in query service.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8850">#8850</a> SDK raises error with a message about index when dropping collection by alias.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8930">#8930</a> Flush occasionally gets stuck when <code translate="no">SaveBinlogPath</code> fails due to instant buffer removal from <code translate="no">insertBuf</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8868">#8868</a> Trace log catches the wrong file name and line number.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8844">#8844</a> <code translate="no">SearchTask</code> result is nil.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8835">#8835</a> Root coord crashes because of bug in pulsar-client-go.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8780">#8780</a> <a href="https://github.com/milvus-io/milvus/pull/8268">#8268</a> <a href="https://github.com/milvus-io/milvus/pull/7255">#7255</a> Collection alias-related issues.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8744">#8744</a> Rocksdb_kv error process.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8752">#8752</a> Data race in mqconsumer.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8686">#8686</a> Flush after auto-flush will not finish.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8564">#8564</a> <a href="https://github.com/milvus-io/milvus/pull/8405">#8405</a> <a href="https://github.com/milvus-io/milvus/pull/8743">#8743</a> <a href="https://github.com/milvus-io/milvus/pull/8798">#8798</a> <a href="https://github.com/milvus-io/milvus/pull/9509">#9509</a> <a href="https://github.com/milvus-io/milvus/pull/8884">#8884</a> rocksdb memory leak.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8671">#8671</a> Objects are not removed in MinIO when dropped.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8050">#8050</a> <a href="https://github.com/milvus-io/milvus/pull/8545">#8545</a> <a href="https://github.com/milvus-io/milvus/pull/8567">#8567</a> <a href="https://github.com/milvus-io/milvus/pull/8582">#8582</a> <a href="https://github.com/milvus-io/milvus/pull/8562">#8562</a> tsafe-related issues.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8137">#8137</a> Time goes backward because TSO does not load last timestamp.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8461">#8461</a> Potential data race in data coord.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8386">#8386</a> Incomplete logic when allocating dm channel to data node.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8206">#8206</a> Incorrect reduce algorithm in proxy search task.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8120">#8120</a> Potential data race in root coord.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8068">#8068</a> Query node crashes when query result is empty and optional <code translate="no">retrieve_ret_</code> is not initialized.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8060">#8060</a> Query task panicking.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8091">#8091</a> Data race in proxy gRPC client.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8078">#8078</a> Data race in root coord gRPC client.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/7730">#7730</a> Topic and ConsumerGroup remain after <code translate="no">CloseRocksMQ</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/8188">#8188</a> Logic error in releasing collections.</p></li>
</ul>
<h2 id="v200-RC6" class="common-anchor-header">v2.0.0-RC6<button data-href="#v200-RC6" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 2021-09-10</p>
<p><h3 id="v2.0.0-RC6">Compatibility</h3></p>
<table class="version">
    <thead>
    <tr>
        <th>Milvus version</th>
        <th>Python SDK version</th>
        <th>Java SDK version</th>
        <th>Go SDK version</th>
        <th>Node.js SDK version</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>2.0.0-RC6</td>
        <td>2.0.0rc6</td>
        <td>Coming soon</td>
        <td>Coming soon</td>
        <td>2.0.x</td>
    </tr>
    </tbody>
</table>
<p>Milvus 2.0.0-RC6 is a preview version of Milvus 2.0. It supports specifying shard number when creating collections, and query by expression. It exposes more cluster metrics through API. In RC6 we increase the unit test coverage to 80%. We also fixed a series of issues involving resource leakage, system panic, etc.</p>
<p><h3 id="v2.0.0-RC6">Improvements</h3></p>
<ul>
<li>Increases unit test coverage to 80%.</li>
</ul>
<p><h3 id="v2.0.0-RC6">Features</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/7482">#7482</a> Supports specifying shard number when creating a collection.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7386">#7386</a> Supports query by expression.</li>
<li>Exposes system metrics through API:
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/7400">#7400</a> Proxy metrics integrate with other coordinators.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7177">#7177</a> Exposes metrics of data node and data coord.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7228">#7228</a> Exposes metrics of root coord.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7472">#7472</a> Exposes more detailed metrics information.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7436">#7436</a> Supports caching the system information metrics.</li>
</ul></li>
</ul>
<p><h3 id="v2.0.0-RC6">Bug fixes</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/7434">#7434</a> Query node OOM if loading a collection that beyond the memory limit.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7678">#7678</a> Standalone OOM when recovering from existing storage.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7636">#7636</a> Standalone panic when sending message to a closed channel.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7631">#7631</a> Milvus panic when closing flowgraph.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7605">#7605</a> Milvus crashed with panic when running nightly CI tests.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7596">#7596</a> Nightly cases failed because rootcoord disconnected with etcd.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7557">#7557</a> Wrong search result returned when the term content in expression is not in order.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7536">#7536</a> Incorrect <code translate="no">MqMsgStream</code> Seek logic.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7527">#7527</a> Dataset’s memory leak in <code translate="no">knowhere</code> when searching.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7444">#7444</a> Deadlock of channels time ticker.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7428">#7428</a> Possible deadlock when <code translate="no">MqMsgStream</code> broadcast fails.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7715">#7715</a> Query request overwritten by concurrent operations on the same slice.</li>
</ul>
<h2 id="v200-RC5" class="common-anchor-header">v2.0.0-RC5<button data-href="#v200-RC5" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 2021-08-30</p>
<p><h3 id="v2.0.0-RC5">Compatibility</h3></p>
<table class="version">
    <thead>
    <tr>
        <th>Milvus version</th>
        <th>Python SDK version</th>
        <th>Java SDK version</th>
        <th>Go SDK version</th>
        <th>Node.js SDK version</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>2.0.0-RC5</td>
        <td>2.0.0rc5</td>
        <td>Coming soon</td>
        <td>Coming soon</td>
        <td>2.0.x</td>
    </tr>
    </tbody>
</table>
<p>Milvus 2.0.0-RC5 is a preview version of Milvus 2.0. It supports message queue data retention mechanism and etcd data cleanup,  exposes cluster metrics through API, and prepares for delete operation support. RC5 also made great progress on system stability. We fixed a series of resource leakage, operation hang and the misconfiguration of standalone Pulsar under Milvus cluster.</p>
<p><h3 id="v2.0.0-RC5">Improvements</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/7226">#7226</a> Refactors data coord allocator.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6867">#6867</a> Adds connection manager.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7172">#7172</a> Adds a seal policy to restrict the lifetime of a segment.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7163">#7163</a> Increases the timeout for gRPC connection when creating index.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6996">#6996</a> Adds a minimum interval for segment flush.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6590">#6590</a> Saves binlog path in <code translate="no">SegmentInfo</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6848">#6848</a> Removes <code translate="no">RetrieveRequest</code> and <code translate="no">RetrieveTask.</code></li>
<li><a href="https://github.com/milvus-io/milvus/pull/7102">#7102</a> Supports vector field as output.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7075">#7075</a> Refactors <code translate="no">NewEtcdKV</code> API.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6965">#6965</a> Adds channel for data node to watch etcd.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7066">#7066</a> Optimizes search reduce logics.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6993">#6993</a> Enhances the log when parsing gRPC recv/send parameters.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7331">#7331</a> Changes context to correct package.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7278">#7278</a> Enables etcd auto compaction for every 1000 revision.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7355">#7355</a> Clean <code translate="no">fmt.Println</code>in util/flowgraph.</li>
</ul>
<p><h3 id="v2.0.0-RC5">Features</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/7112">#7112</a> <a href="https://github.com/milvus-io/milvus/pull/7174">#7174</a> Imports an embedded etcdKV (part 1).</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7231">#7231</a> Adds a segment filter interface.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7157">#7157</a> Exposes metrics of index coord and index nodes.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7137">#7137</a> <a href="https://github.com/milvus-io/milvus/pull/7157">#7157</a> Exposes system topology information by proxy.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7113">#7113</a> <a href="https://github.com/milvus-io/milvus/pull/7157">#7157</a> Exposes metrics of query coord and query nodes.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7134">#7134</a> Allows users to get vectors using memory instead of local storage.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6617">#6617</a> Supports retention for rocksmq.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7303">#7303</a> Adds query node segment filter.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7304">#7304</a> Adds <code translate="no">delete</code> API into proto.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7261">#7261</a> Adds delete node.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7268">#7268</a> Constructs Bloom filter when inserting.</li>
</ul>
<p><h3 id="v2.0.0-RC5">Bug fixes</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/7272">#7272</a> <a href="https://github.com/milvus-io/milvus/pull/7352">#7352</a> <a href="https://github.com/milvus-io/milvus/pull/7335">#7335</a> Failure to start new docker container with existing volumes if index was created: proxy is not healthy.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7243">#7243</a> Failure to create index in a new version of Milvus for data that were inserted in an old version.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7253">#7253</a> Search gets empty results after releasing a different partition.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7244">#7244</a> <a href="https://github.com/milvus-io/milvus/pull/7227">#7227</a> Proxy crashes when receiving empty search results.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7203">#7203</a> Connection gets stuck when gRPC server is down.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7188">#7188</a> Incomplete unit test logics.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7175">#7175</a> Unspecific error message returns when calculating distances using collection IDs without loading.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7151">#7151</a> Data node flowgraph does not close caused by missing <code translate="no">DropCollection</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7167">#7167</a> Failure to load IVF_FLAT index.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7123">#7123</a> Timestamp go back for <code translate="no">timeticksync</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7140">#7140</a> <code translate="no">calc_distance</code> returns wrong results for binary vectors when using TANIMOTO metrics.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7143">#7143</a> The state of memory and etcd is inconsistent if KV operation fails.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7141">#7141</a> <a href="https://github.com/milvus-io/milvus/pull/7136">#7136</a> Index building gets stuck when the index node pod is frequently killed and pulled up.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7119">#7119</a> Pulsar <code translate="no">msgStream</code> may get stuck when subscribed with the same topic and sub name.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6971">#6971</a> Exception occurs when searching with index (HNSW).</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7104">#7104</a> Search gets stuck if query nodes only load sealed segment without watching insert channels.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7085">#7085</a> Segments do not auto flush.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7074">#7074</a> Index nodes wait for index coord to start to complete.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7061">#7061</a> Segment allocation does not expire if data coord does not receive timetick message from data node.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7059">#7059</a> Query nodes get producer leakage.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7005">#7005</a> Query nodes do not return error to query coord when <code translate="no">loadSegmentInternal</code> fails.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7054">#7054</a> Query nodes return incorrect IDs when <code translate="no">topk</code> is larger than <code translate="no">row_num.</code></li>
<li><a href="https://github.com/milvus-io/milvus/pull/7053">#7053</a> Incomplete allocation logics.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7044">#7044</a> Lack of check on unindexed vectors in memory before retriving vectors in local storage.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6862">#6862</a> Memory leaks in flush cache of data node.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7346">#7346</a> Query coord container exited in less than 1 minute when re-installing Milvus cluster.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7339">#7339</a> Incorrect expression boundary.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7311">#7311</a> Collection nil when adding query collection.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7266">#7266</a> Flowgraph released incorrectly.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7310">#7310</a> Excessive timeout when searching after releasing and loading a partition.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7320">#7320</a> Port conflicts between embedded etcd and external etcd.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/7336">#7336</a> Data node corner cases.</li>
</ul>
<h2 id="v200-RC4" class="common-anchor-header">v2.0.0-RC4<button data-href="#v200-RC4" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 2021-08-13</p>
<p><h3 id="v2.0.0-RC4">Compatibility</h3></p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.0.0-RC4</td><td>2.0.0rc4</td><td>Coming soon</td><td>Coming soon</td></tr>
</tbody>
</table>
<p>Milvus 2.0.0-RC4 is a preview version of Milvus 2.0. It mainly focuses on fixing stability issues, it also offers functionalities to retrieve vector data from object storage and specify output field by wildcard matching.</p>
<p><h3 id="v2.0.0-RC4">Improvements</h3></p>
<ul>
<li><p><a href="https://github.com/milvus-io/milvus/issues/6984">#6984</a> <a href="https://github.com/milvus-io/milvus/issues/6772">#6772</a> <a href="https://github.com/milvus-io/milvus/issues/6704">#6704</a> <a href="https://github.com/milvus-io/milvus/issues/6652">#6652</a> <a href="https://github.com/milvus-io/milvus/issues/6536">#6536</a> <a href="https://github.com/milvus-io/milvus/issues/6522">#6522</a> Unit test improvements.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6861">#6859</a> Increases the <code translate="no">MaxCallRecvMsgSize</code> and <code translate="no">MaxCallSendMsgSize</code> of gRPC client.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6807">#6796</a> Fixes MsgStream exponential retry.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6897">#6897</a> <a href="https://github.com/milvus-io/milvus/pull/6899">#6899</a> <a href="https://github.com/milvus-io/milvus/pull/6899">#6681</a> <a href="https://github.com/milvus-io/milvus/pull/6766">#6766</a> <a href="https://github.com/milvus-io/milvus/pull/6768">#6768</a> <a href="https://github.com/milvus-io/milvus/pull/6597">#6597</a> <a href="https://github.com/milvus-io/milvus/pull/6501">#6501</a> <a href="https://github.com/milvus-io/milvus/pull/6477">#6477</a> <a href="https://github.com/milvus-io/milvus/pull/6478">#6478</a> <a href="https://github.com/milvus-io/milvus/pull/6935">#6935</a> <a href="https://github.com/milvus-io/milvus/pull/6871">#6871</a> <a href="https://github.com/milvus-io/milvus/pull/6671">#6671</a> <a href="https://github.com/milvus-io/milvus/pull/6682">#6682</a> Log improvements.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6441">#6440</a> Refactors segment manager.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6449">#6421</a> Splits raw vectors to several smaller binlog files when creating index.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6467">#6466</a> Separates the idea of query and search.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6506">#6505</a> Changes <code translate="no">output_fields</code> to <code translate="no">out_fields_id</code> for RetrieveRequest.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6328">#6427</a> Refactors the logic of assigning tasks in index coord.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6543">#6529</a> <a href="https://github.com/milvus-io/milvus/pull/6600">#6599</a> Refactors the snapshot of timestamp statistics.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/issues/6692">#6692</a> <a href="https://github.com/milvus-io/milvus/pull/6700">#6343</a> Shows/Describes collections/partitions with created timestamps.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6663">#6629</a> Adds the WatchWithVersion interface for etcdKV.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6667">#6666</a> Refactors expression executor to use single bitsets.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6665">#6664</a> Auto creates new segments when allocating rows that exceeds the maximum number of rows per segment.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6786">#6786</a> Refactors <code translate="no">RangeExpr</code> and <code translate="no">CompareExpr</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6503">#6497</a> Looses the lower limit of dimension when searching on a binary vector field.</p></li>
</ul>
<p><h3 id="v2.0.0-RC4">Features</h3></p>
<ul>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6707">#6706</a> Supports reading vectors from disk.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/issues/6299">#6299</a> <a href="https://github.com/milvus-io/milvus/pull/6598">#6598</a> Supports query vector field.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6460">#5210</a> Extends the grammar of Boolean expressions.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6510">#6411</a> <a href="https://github.com/milvus-io/milvus/pull/6671">#6650</a> Supports wildcards and wildcard matching on search/query output fields.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6613">#6464</a> Adds a vector chunk manager to support vector file local storage.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6702">#6701</a> Supports data persistence with docker compose deployments.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6770">#6767</a> Adds a Grafana dashboard .json file for Milvus.</p></li>
</ul>
<p><h3 id="v2.0.0-RC4">Bug fixes</h3></p>
<ul>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6976">#5443</a> <code translate="no">CalcDistance</code> returns wrong results when fetching vectors from collection.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/7004">#7004</a> Pulsar consumer causes goroutine leakage.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6946">#6946</a> Data race occurs when a flow graph <code translate="no">close()</code> immediately after <code translate="no">start()</code>.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6958">#6903</a> Uses proto marshal instead of marshalTextString in querycoord to avoid crash triggered by unknown field name crash.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/issues/6374">#6374</a> <a href="https://github.com/milvus-io/milvus/pull/6908">#6849</a> Load collection failure.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6978">#6977</a> Search returns wrong limit after a partition or collection is dropped.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/issues/6515">#6515</a> <a href="https://github.com/milvus-io/milvus/issues/6567">#6567</a> <a href="https://github.com/milvus-io/milvus/issues/6552">#6552</a> <a href="https://github.com/milvus-io/milvus/pull/6551">#6483</a> Data node BackGroundGC does not work and causes memory leak.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6944">#6943</a> The MinIOKV <code translate="no">GetObject</code> method does not close client and causes goroutine leaking per call.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6935">#6370</a> Search is stuck due to wrong semantics offered by load partition.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6832">#6831</a> Data node crashes in meta service.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6905">#6469</a> Search binary results are wrong with metrics of Hamming when limit (topK) is bigger than the quantity of inserted entities.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6870">#6693</a> Timeout caused by segment race condition.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6351">#6097</a> Load hangs after frequently restarting query node within a short period of time.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6465">#6464</a> Data sorter edge cases.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6439">#6419</a> Milvus crashes when inserting empty vectors.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6477">#6477</a> Different components repeatedly create buckets in MinIO.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6377">#6377</a> Query results get incorrect global sealed segments from etcd.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6500">#6499</a> TSO allocates wrong timestamps.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6545">#6501</a> Channels are lost after data node crashes.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6568">#6527</a> Task info of <code translate="no">watchQueryChannels</code> can’t be deleted from etcd.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/issues/6576">#6576</a> <a href="https://github.com/milvus-io/milvus/pull/6577">#6526</a> Duplicate primary field IDs are added when retrieving entities.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/issues/6627">#6627</a> <a href="https://github.com/milvus-io/milvus/pull/6628">#6569</a> <code translate="no">std::sort</code> does not work properly to filter search results when the distance of new record is NaN.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6656">#6655</a> Proxy crashes when retrieve task is called.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6763">#6762</a> Incorrect created timestamp of collections and partitions.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6658">#6644</a> Data node failes to restart automatically.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6642">#6641</a> Failure to stop data coord when disconnecting with etcd.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6621">#6621</a> Milvus throws an exception when the inserted data size is larger than the segment.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/issues/6436">#6436</a> <a href="https://github.com/milvus-io/milvus/issues/6573">#6573</a> <a href="https://github.com/milvus-io/milvus/pull/6814">#6507</a> Incorrect handling of time synchronization.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/6871">#6732</a> Failure to create IVF_PQ index.</p></li>
</ul>
<h2 id="v200-RC2" class="common-anchor-header">v2.0.0-RC2<button data-href="#v200-RC2" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 2021-07-13</p>
<p><h3 id="v2.0.0-RC2">Compatibility</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Milvus version</th><th style="text-align:left">Python SDK version</th><th style="text-align:left">Java SDK version</th><th style="text-align:left">Go SDK version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.0.0-RC2</td><td style="text-align:left">2.0.0rc2</td><td style="text-align:left">Coming soon</td><td style="text-align:left">Coming soon</td></tr>
</tbody>
</table>
<p>Milvus 2.0.0-RC2 is a preview version of Milvus 2.0. It fixes stability and performance issues and refactors code for node and storage management.</p>
<p><h3 id="v2.0.0-RC2">Improvements</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/6356">#6356</a> Refactors code for cluster in data coordinator.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6300">#6300</a> Refactors code for meta management in data coordinator.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6289">#6289</a> Adds <code translate="no">collectionID</code> and <code translate="no">partitionID</code> to <code translate="no">SegmentIndexInfo</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6258">#6258</a> Clears the corresponding <code translate="no">searchMsgStream</code> in proxy when calling <code translate="no">releaseCollection()</code>.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6227">#6227</a> Merges codes relating to retrieve and search in query node.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6196">#6196</a> Adds candidate management for data coordinator to manage data node cluster.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6188">#6188</a> Adds Building Milvus with Docker Docs.</li>
</ul>
<p><h3 id="v2.0.0-RC2">Features</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/6386">#6386</a> Adds the <code translate="no">fget_objects()</code> method for loading files from MinIO to the local device.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6253">#6253</a> Adds the <code translate="no">GetFlushedSegments()</code> method in data coordinator.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6213">#6213</a> Adds the <code translate="no">GetIndexStates()</code> method.</li>
</ul>
<p><h3 id="v2.0.0-RC2">Bug fixes</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/6184">#6184</a> Search accuracy worsens when dataset gets larger.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6308">#6308</a> The server crashes if the KNNG in NSG is not full.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6212">#6212</a> Search hangs after restarting query nodes.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6265">#6265</a> The server does not check node status when detecting nodes are online.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/6359">#6359</a> <a href="https://github.com/milvus-io/milvus/pull/6334">#6334</a> An error occurs when compiling Milvus on CentOS</li>
</ul>
<h2 id="v200-RC1" class="common-anchor-header">v2.0.0-RC1<button data-href="#v200-RC1" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 2021-06-28</p>
<p><h3 id="v2.0.0-RC1">Compatibility</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Milvus version</th><th style="text-align:left">Python SDK version</th><th style="text-align:left">Java SDK version</th><th style="text-align:left">Go SDK version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.0.0-RC1</td><td style="text-align:left">2.0.0rc1</td><td style="text-align:left">Coming soon</td><td style="text-align:left">Coming soon</td></tr>
</tbody>
</table>
<p>Milvus 2.0.0-RC1 is the preview version of 2.0. It introduces Golang as the distributed layer development language and a new cloud-native distributed design. The latter brings significant improvements to scalability, elasticity, and functionality.</p>
<p><h3 id="v2.0.0-RC1">Architecture</h3></p>
<p>Milvus 2.0 is a cloud-native vector database with storage and computation separated by design. All components in this refactored version of Milvus are stateless to enhance elasticity and flexibility.</p>
<p>The system breaks down into four levels:</p>
<ul>
<li>Access layer</li>
<li>Coordinator service</li>
<li>Worker nodes</li>
<li>Storage</li>
</ul>
<p><strong>Access layer:</strong> The front layer of the system and endpoint to users.  It comprises peer proxies for forwarding requests and gathering results.</p>
<p><strong>Coordinator</strong> <strong>service:</strong> The coordinator service assigns tasks to the worker nodes and functions as the system’s brain. It has four coordinator types: root coord, data coord, query coord, and index coord.</p>
<p><strong>Worker nodes:</strong> Worker nodes are dumb executors that follow the instructions from the coordinator service. There are three types of worker nodes, each responsible for a different job: data nodes, query nodes, and index nodes.</p>
<p><strong>Storage:</strong> The cornerstone of the system that all other functions depend on. It has three storage types: meta storage, log broker, and object storage. Kudos to the open-source communities of etcd, Pulsar, MinIO, and RocksDB for building this fast, reliable storage.</p>
<blockquote>
<p>For more information about how the system works, see <a href="/docs/v2.0.x/architecture_overview.md">Milvus 2.0 Architecture</a>.</p>
</blockquote>
<p><h3 id="v2.0.0-RC1">New Features</h3></p>
<p><strong>SDK</strong></p>
<ul>
<li><p>Object-relational mapping (ORM) PyMilvus</p>
<p>The PyMilvus APIs operate directly on collections, partitions, and indexes, helping users focus on the building of an effective data model rather than the detailed implementation.</p></li>
</ul>
<p><strong>Core Features</strong></p>
<ul>
<li><p>Hybrid Search between scalar and vector data</p>
<p>Milvus 2.0 supports storing scalar data. Operators such as GREATER, LESS, EQUAL, NOT, IN, AND, and OR can be used to filter scalar data before a vector search is conducted. Currently supported data types include bool, int8, int16, int32, int64, float, and double. Support for string/VARBINARY data will be offered in a later version.</p></li>
<li><p>Match query</p>
<p>Unlike the search operation, which returns similar results, the match query operation returns exact matches. Match query can be used to retrieve vectors by primary keys or by condition.</p></li>
<li><p>Tunable consistency</p>
<p>Distributed databases make tradeoffs between consistency and availability/latency. Milvus offers four consistency levels (from strongest to weakest): strong, bounded staleness, session, and consistent prefix. You can define your own read consistency by specifying the read timestamp. As a rule of thumb, the weaker the consistency level, the higher the availability and the higher the performance.</p></li>
<li><p>Time travel</p>
<p>Time travel allows you to access historical data at any point within a specified time period, making it possible to query data in the past, restore, and backup.</p></li>
</ul>
<p><strong>Miscellaneous</strong></p>
<ul>
<li><p>Supports installing Milvus 2.0 with Helm or Docker Compose.</p></li>
<li><p>Compatibility with Prometheus and Grafana for monitoring and alerts.</p></li>
<li><p>Milvus Insight</p>
<p>Milvus Insight is a graphical management system for Milvus. It features visualization of cluster states, meta management, data queries and more. Milvus Insight will eventually be open sourced.</p></li>
</ul>
<p><h3 id="v2.0.0-RC1">Breaking Changes</h3></p>
<p>Milvus 2.0 uses an entirely different programming language, data format, and distributed architecture compared with previous versions. This means prior versions of Milvus cannot be upgraded to 2.x. However, Milvus 1.x is receiving long-term support and data migration tools will be made available as soon as possible.</p>
<p>Specific breaking changes include:</p>
<ul>
<li><p>JAVA, Go, or C++ SDK is not yet supported.</p></li>
<li><p>Delete or update is not yet supported.</p></li>
<li><p>PyMilvus-ORM does not support force flush.</p></li>
<li><p>Data format is incompatible with all prior versions.</p></li>
<li><p>Mishards is deprecated because Milvus 2.0 is distributed and sharding middleware is no longer necessary.</p></li>
<li><p>Local file system and distributed system storage are not yet supported.</p></li>
</ul>
