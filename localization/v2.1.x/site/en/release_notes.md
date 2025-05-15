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
    </button></h1><p>Find out what’s new in Milvus! This page summarizes information about new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.1.0 in this section. We suggest that you regularly visit this page to learn about updates.</p>
<h2 id="v214" class="common-anchor-header">v2.1.4<button data-href="#v214" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 29 September 2022</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.1.4</td><td>2.1.3</td><td>2.1.0</td><td>2.1.2</td><td>2.1.3</td></tr>
</tbody>
</table>
<p>Milvus 2.1.4 is a minor bug fix version of Milvus 2.1.0. The highlight of this version is that we have remarkably reduced memory usage for scalar data. It also fixed a few issues with data loading, query coord deadlock when restarting, garbage collection on the wrong path and search crash.</p>
<h3 id="Bug-Fixes" class="common-anchor-header">Bug Fixes</h3><ul>
<li><p><a href="https://github.com/milvus-io/milvus/pull/19326">19326</a>, <a href="https://github.com/milvus-io/milvus/pull/19309">19309</a> Fixes failure to load collection with MARISA string index.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/19353">19353</a> Fixes garbage collection on the wrong path.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/19402">19402</a> Fixes query coord init deadlock when restarting.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/19312">19312</a> Adds SyncSegments to sync meta between DN and DC.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/19486">19486</a> Fixes DML stream leakage in proxy.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/19148">19148</a>, <a href="https://github.com/milvus-io/milvus/pull/19487">19487</a>, <a href="https://github.com/milvus-io/milvus/pull/19465">19465</a> Fixes the failure of CGO to lock OS thread.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/19524">19524</a> Fixes offset in search being equal to insert barrier.</p></li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li><p><a href="https://github.com/milvus-io/milvus/pull/19436">19436</a> Ignores cases when comparing metric type in Segcore.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/19197">19197</a>, <a href="https://github.com/milvus-io/milvus/pull/19245">19245</a>, <a href="https://github.com/milvus-io/milvus/pull/19421">19421</a> Optimizes large memory usage of InsertRecord.</p></li>
</ul>
<h2 id="v212" class="common-anchor-header">v2.1.2<button data-href="#v212" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 16 September 2022</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.1.2</td><td>2.1.2</td><td>2.1.0</td><td>2.1.1</td><td>2.1.2</td></tr>
</tbody>
</table>
<p>Milvus 2.1.2 is a minor bug-fix version of Milvus 2.1.0. It fixed issues when garbage collector parses binlog path, a few other issues causing search hang, and performance regression when the user authentication feature is enabled.</p>
<h3 id="Bug-Fixes" class="common-anchor-header">Bug Fixes</h3><ul>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18733">18733</a>, <a href="https://github.com/milvus-io/milvus/pull/18783">18783</a>, <a href="https://github.com/milvus-io/milvus/pull/18844">18844</a>, <a href="https://github.com/milvus-io/milvus/pull/18886">18886</a>, <a href="https://github.com/milvus-io/milvus/pull/18906">18906</a> Fixes load/cluster restart/scale hang.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18678">18678</a> Fixes flush panic after compaction.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18690">18690</a> Fixes DataType::bool cast to double.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18884">18884</a>, <a href="https://github.com/milvus-io/milvus/pull/18808">18808</a> Fixes garbage collection failure when the storage root path starts with &quot;/&quot;.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18790">18790</a> Fixes watchDmChannel being out-of-date after compaction issue.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/issues/18872">18872</a> Disables empty string insertion to avoid server crash.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18701">18701</a> Fixes RHNSWPQ pqm divided by zero.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18714">18714</a> Fixes flush hang when Pulsar error causes empty segments.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18732">18732</a> Fixes performance degradation caused by missing password verification cache.</p></li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Improvements</h3><ul>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18683">18683</a> Deduplicates output fields for query.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18895">18895</a> Adds manual compaction periodically to clean up deleted RocksMQ data.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18795">18795</a>, <a href="https://github.com/milvus-io/milvus/pull/18850">18850</a> Refactors compaction concurrency logic.</p></li>
</ul>
<h3 id="Features" class="common-anchor-header">Features</h3><ul>
<li><a href="https://github.com/milvus-io/milvus/pull/17899">17899</a> Supports configurable SASL mechanism for Kafka.</li>
</ul>
<h2 id="v211" class="common-anchor-header">v2.1.1<button data-href="#v211" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 12 August 2022</p>
<table>
<thead>
<tr><th>Milvus version</th><th>Python SDK version</th><th>Java SDK version</th><th>Go SDK version</th><th>Node.js SDK version</th></tr>
</thead>
<tbody>
<tr><td>2.1.1</td><td>2.1.1</td><td>2.1.0</td><td>2.1.1</td><td>2.1.2</td></tr>
</tbody>
</table>
<p>Milvus 2.1.1 is a minor bug fix version of Milvus 2.1.0. It fixed query node crash under high concurrency, garbage collector failure to parse segment ID, and a few other stability issues.</p>
<p><h3 id="v2.1.1">Bug fixes</h3></p>
<ul>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18383">#18383</a>, <a href="https://github.com/milvus-io/milvus/pull/18432">#18432</a> Fixed garbage collector parse segment ID panics with bad input.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18418">#18418</a> Fixes metatable related error when etcd compaction error happens.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18568">#18568</a> Closes Node/Segment detector when closing ShardCluster.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18542">#18542</a> Adds CGO worker pool for Query Node to avoid OpenMP creating too many threads.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18569">#18569</a> Releases collection resources when all partitions are released to avoid resource leakage.</p></li>
</ul>
<p><h3 id="v2.1.1">Improvements</h3></p>
<ul>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18394">#18394</a> Removes watch delta channel task-related logic.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18513">#18513</a> Uses chunkManager rather than minio.Client in Data Node garbage collection.</p></li>
<li><p><a href="https://github.com/milvus-io/milvus/pull/18410">#18410</a> Limits the concurrency level for single load request.</p></li>
</ul>
<p><h3 id="v2.1.1">Features</h3></p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/18570">18570</a> Supports the dynamic change of log level through HTTP.</li>
</ul>
<h2 id="v210" class="common-anchor-header">v2.1.0<button data-href="#v210" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: 27 July 2022</p>
<p><h3 id="v2.1.0">Compatibility</h3></p>
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
        <td>2.1.0</td>
        <td>2.1.0</td>
        <td>2.1.0</td>
        <td>2.1.0</td>
        <td>2.1.2</td>
    </tr>
    </tbody>
</table>
<p>Milvus 2.1.0 not only introduces many new features including support for VARCHAR data type, memory replicas, Kafka support, and RESTful API but also greatly improves the functionality, performance, and stability of Milvus.</p>
<p><h3 id="v2.1.0">Features</h3></p>
<ul>
<li>Support for VARCHAR data type</li>
</ul>
<p>Milvus now supports variable-length string as a scalar data type. Like previous scalar types, VARCHAR can be specified as an output field or be used for attribute filtering. A MARISA-trie-based inverted index is also supported to accelerate prefix query and exact match.</p>
<ul>
<li>In-memory replicas</li>
</ul>
<p>In-memory replicas enable you to load data on multiple query nodes. Like read replicas in traditional databases, in-memory replicas can help increase throughput if you have a relatively small dataset but want to scale read throughput with more hardware resources. We will support hedged read in future releases to increase availability when applying in-memory replicas.</p>
<ul>
<li>Embedded Milvus</li>
</ul>
<p>Embedded Milvus enables you to <a href="/docs/v2.1.x/install_embedded_milvus.md">pip install Milvus</a> in one command, try quick demos and run short scripts in Python on your Macbook, including on the ones with M1 processor.</p>
<ul>
<li>Kafka support (Beta)</li>
</ul>
<p>Apache Kafka is the most widely used open-source distributed message store. In Milvus 2.1.0, you can simply use Kafka for message storage by modifying configurations.</p>
<ul>
<li>RESTful API (Beta)</li>
</ul>
<p>Milvus 2.1.0 now provides RESTful API for applications written in PHP or Ruby. GIN, one of the most popular Golang web frameworks, is adopted as the web server.</p>
<p><h3 id="v2.1.0">Performance</h3></p>
<p>The Milvus core team conducted a full performance benchmarking and profiling, and fixed a few bottlenecks on load/search paths. Under some test cases, Milvus search performance is boosted about 3.2 times thanks to the search combination logic.</p>
<ul>
<li><a href="https://github.com/milvus-io/milvus/pull/16014">#16014</a> Enables ZSTD compression for pulsar.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/16514">#16514</a> <a href="https://github.com/milvus-io/milvus/pull/17273">#17273</a> Improves load performance.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/17005">#17005</a> Loads binlog for different fields in parallel.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/17022">#17022</a> Adds logic for search merging and a simple task scheduler for read tasks.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/17194">#17194</a> Simplifies the merge logic of searchTask.</li>
<li><a href="https://github.com/milvus-io/milvus/pull/17287">#17287</a> Reduces default seal proportion.</li>
</ul>
<p><h3 id="v2.1.0">Stability</h3></p>
<p>To improve stability, especially during streaming data insertion, we fixed a few critical issues including:</p>
<ul>
<li>Fixed out of memory issues.</li>
<li>Fixed message queue backlog full caused by message queue subscription leakge.</li>
<li>Fixed the issue of deleted entities can still be readable.</li>
<li>Fixed data being erroneously cleaned by compaction during load or index.</li>
</ul>
<p><h3 id="v2.1.0">Other improvements</h3></p>
<ul>
<li>Security</li>
</ul>
<p>Starting from Milvus 2.1.0, we support username, password, and TLS connection. We also enable safe connections to our dependencies such as S3, Kafka and etcd.</p>
<ul>
<li>ANTLR parser</li>
</ul>
<p>Milvus now adopts Go ANTLR as the plan parser to make adding new grammar such as arithmetic operations on numerical fields more flexible. The adoption of ANTLR also prepares for Milvus query language support in future releases.</p>
<ul>
<li>Observability</li>
</ul>
<p>We refined monitoring metrics by adding important <a href="/docs/v2.1.x/metrics_dashboard.md">metrics</a> including search QPS and latency to the new dashboard. Please notify us if any metrics critical to your production environment are not listed.</p>
<ul>
<li>Deployment</li>
</ul>
<p>For users who don’t have a K8s environment but still want to deploy a cluster, Milvus now supports Ansible deployment. See <a href="/docs/v2.1.x/install_cluster-ansible.md">Install Milvus Cluster</a> for more information.</p>
<p><h3 id="v2.1.0">Known issues</h3></p>
<ol>
<li>Partition is not a fully released feature so we recommend user not to rely on it. <a href="https://github.com/milvus-io/milvus/issues/17648">#17648 When a partition is dropped, the data and index cannot be cleaned.</a></li>
<li>When building index after load, the collection need to released and reloaded. <a href="https://github.com/milvus-io/milvus/issues/17809">#17809 When an index is created on a loaded collection, the segment already loaded will not be notified to load the index.</a></li>
</ol>
