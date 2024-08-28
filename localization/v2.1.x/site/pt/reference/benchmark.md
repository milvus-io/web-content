---
id: benchmark.md
summary: Learn about the benchmark result of Milvus.
title: ''
---
<h1 id="Milvus-21-Benchmark-Test-Report" class="common-anchor-header">Milvus 2.1 Benchmark Test Report<button data-href="#Milvus-21-Benchmark-Test-Report" class="anchor-icon" translate="no">
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
    </button></h1><p>This report shows the major test results of Milvus 2.1, covering the performances of data insertion, index building, and vector similarity search. The tests aim to provide a benchmark against which the performances of future Milvus releases can be measured.</p>
<h2 id="Terminology" class="common-anchor-header">Terminology<button data-href="#Terminology" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary>Click to see the details of the terms used in the test</summary>
<table class="terminology">
<thead>
<tr>
<th>Term</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>nq</td>
<td>Number of vectors to be searched in one search request</td>
</tr>
<tr>
<td>topk</td>
<td>Number of the nearest vectors to be retrieved for each vector (in nq) in a search request</td>
</tr>
<tr>
<td>ef</td>
<td>A search parameter specific to <a href="https://milvus.io/docs/v2.1.x/index.md">HNSW index</a></td>
</tr>
<tr>
<td>RT</td>
<td>Response time from sending the request to receiving the response</td>
</tr>
<tr>
<td>QPS</td>
<td>Number of search requests that are successfully processed per second</td>
</tr>
</tbody>
</table>
</details></p>
<h2 id="Test-environment" class="common-anchor-header">Test environment<button data-href="#Test-environment" class="anchor-icon" translate="no">
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
    </button></h2><p>All tests are performed under the following environments.</p>
<h3 id="Hardware-environment" class="common-anchor-header">Hardware environment</h3><table>
<thead>
<tr><th>Hardware</th><th>Specification</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td>Intel® Xeon® Gold 6226R CPU @ 2.90GHz</td></tr>
<tr><td>Memory</td><td>16*\32 GB RDIMM, 3200 MT/s</td></tr>
<tr><td>SSD</td><td>SATA 6 Gbps</td></tr>
</tbody>
</table>
<h3 id="Software-environment" class="common-anchor-header">Software environment</h3><table>
<thead>
<tr><th>Software</th><th>Version</th></tr>
</thead>
<tbody>
<tr><td>Milvus</td><td><li>2.1.0-20220729-dcd6c9e5</li> <br> <li>2.0.2-20220401-898533c5</li></td></tr>
<tr><td>Milvus GO SDK</td><td>v2.1.1-0.20220801085923-509bbbbc89eb</td></tr>
</tbody>
</table>
<h3 id="Deployment-scheme" class="common-anchor-header">Deployment scheme</h3><ul>
<li>Milvus instance (standalone or cluster) in each test is deployed via <a href="https://milvus.io/docs/v2.1.x/install_standalone-helm.md">Helm</a> on a Kubernetes cluster based on physical or virtual machines.</li>
<li>Configurations of the tested Milvus instances merely vary in the number of CPU cores, the size of memory, and the number of replicas (worker nodes), which only applies to Milvus cluster.</li>
<li>Unspecified configurations are <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml">default configurations</a>.</li>
<li>Milvus dependencies (MinIO, Pulsar, and etcd) store data on the local SSD in each node.</li>
<li>Search requests are sent to the Milvus instances via <a href="https://github.com/milvus-io/milvus-sdk-go/tree/master/tests">Milvus GO SDK</a>.</li>
</ul>
<h3 id="Data-sets" class="common-anchor-header">Data sets</h3><p>The test uses the open source dataset SIFT (128 dimensions) from <a href="https://github.com/erikbern/ann-benchmarks/#data-sets">ANN-Benchmarks</a>.</p>
<h2 id="Test-pipeline" class="common-anchor-header">Test pipeline<button data-href="#Test-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Start a Milvus instance by Helm with respective server configurations as listed in each test.</li>
<li>Connect to the Milvus instance via Milvus GO SDK and get the corresponding test results.</li>
<li>Create a collection.</li>
<li>Insert 1 million SIFT vectors. Build an HNSW index and configure the index parameters by setting <code translate="no">M</code>=8 and <code translate="no">efConstruction</code>=200.</li>
<li>Load the collection.</li>
</ol>
<h2 id="Test-results" class="common-anchor-header">Test results<button data-href="#Test-results" class="anchor-icon" translate="no">
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
    </button></h2><p>The test conducts a concurrent search on the the prepared data in the created collection and records the search performance metrics. The test result shows:</p>
<ul>
<li>When search parameters <code translate="no">nq</code>=1, <code translate="no">topk</code>=1, <code translate="no">ef</code>=64, search concurrency is <strong>400</strong> and the duration of concurrency is <strong>5 hours</strong>.</li>
</ul>
<p>The detailed performance test results of Milvus 2.1 cluster, standalone, and Milvus 2.0.2 standalone is shown below.</p>
<h3 id="Milvus-21-cluster" class="common-anchor-header">Milvus 2.1 cluster</h3><p><details>
<summary><b>Server configurations (cluster)</b></summary></p>
<pre><code translate="no" class="language-yaml">image:
  <span class="hljs-built_in">all</span>:
    tag: <span class="hljs-number">2.1</span><span class="hljs-number">.0</span>-<span class="hljs-number">20220729</span>-dcd6c9e5
queryNode:
  replicas: <span class="hljs-number">1</span>
  resources:
    limits:
      cpu: <span class="hljs-string">&quot;12.0&quot;</span>
      memory: 8Gi
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><strong>Search performance</strong></p>
<table>
<thead>
<tr><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP95) / ms</th><th>fail/s</th></tr>
</thead>
<tbody>
<tr><td>6904</td><td>59</td><td>58</td><td>0</td></tr>
</tbody>
</table>
<h3 id="Milvus-21-standalone" class="common-anchor-header">Milvus 2.1 standalone</h3><p><details>
<summary><b>Server configurations (standalone)</b></summary></p>
<pre><code translate="no" class="language-yaml">image:
  <span class="hljs-built_in">all</span>:
    tag: <span class="hljs-number">2.1</span><span class="hljs-number">.0</span>-<span class="hljs-number">20220729</span>-dcd6c9e5
standalone:
  replicas: <span class="hljs-number">1</span>
  resources:
    limits:
      cpu: <span class="hljs-string">&quot;12.0&quot;</span>
      memory: 16Gi
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><strong>Search performance</strong></p>
<table>
<thead>
<tr><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP95) / ms</th><th>fail/s</th></tr>
</thead>
<tbody>
<tr><td>4287</td><td>104</td><td>103</td><td>0</td></tr>
</tbody>
</table>
<h3 id="Milvus-202-standalone" class="common-anchor-header">Milvus 2.0.2 standalone</h3><p><details>
<summary><b>Server configurations (standalone)</b></summary></p>
<pre><code translate="no" class="language-yaml">image:
  <span class="hljs-built_in">all</span>:
    tag: <span class="hljs-number">2.0</span><span class="hljs-number">.2</span>-<span class="hljs-number">20220401</span>-898533c5
standalone:
  replicas: <span class="hljs-number">1</span>
  resources:
    limits:
      cpu: <span class="hljs-string">&quot;12.0&quot;</span>
      memory: 16Gi
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><strong>Search performance</strong></p>
<table>
<thead>
<tr><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP95) / ms</th><th>fail/s</th></tr>
</thead>
<tbody>
<tr><td>658</td><td>756</td><td>748</td><td>0</td></tr>
</tbody>
</table>
<h2 id="Summary" class="common-anchor-header">Summary<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.1.x/assets/2.1_qps.png" alt="2.1_qps" class="doc-image" id="2.1_qps" />
    <span>2.1_qps</span>
  </span>
</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.1.x/assets/2.1_rt.png" alt="2.1_rt" class="doc-image" id="2.1_rt" />
    <span>2.1_rt</span>
  </span>
</p>
<ul>
<li>In the current test scenario, the QPS of Milvus cluster is better than that of Milvus standalone under  1 million dataset.</li>
<li>In the current test scenario, the QPS of Milvus 2.1 standalone is better than that of Milvus 2.0.2 standalone under 1 million dataset.</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Learn how to <a href="https://milvus.io/blog/2022-08-16-A-Quick-Guide-to-Benchmarking-Milvus-2-1.md">perform a Milvus 2.1 benchmark by yourself</a>.</li>
</ul>
