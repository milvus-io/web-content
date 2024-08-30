---
id: benchmark.md
summary: Learn about the benchmark result of Milvus.
title: Milvus 2.2 Benchmark Test Report
---
<h1 id="Milvus-22-Benchmark-Test-Report" class="common-anchor-header">Milvus 2.2 Benchmark Test Report<button data-href="#Milvus-22-Benchmark-Test-Report" class="anchor-icon" translate="no">
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
    </button></h1><p>This report shows the major test results of Milvus 2.2.0. It aims to provide a picture of Milvus 2.2.0 search performance, especially in the capability to scale up and scale out.</p>
<div class="alert note">
  <div style="display: flex;">
      <div style="flex:0.3;">
        <img translate="no" src="https://zilliz.com/images/whitepaper/performance.png" alt="Milvus Performance Evaluation 2023" />
      </div>
  </div>
  <div style="flex:1;padding: 10px;">
    <p>We have recently run a benchmark against Milvus 2.2.3 and have the following key findings:</p>
    <ul>
      <li>A 2.5x reduction in search latency</li>
      <li>A 4.5x increase in QPS</li>
      <li>Billion-scale similarity search with little performance degradation</li>
      <li>Linear scalability when using multiple replicas</li>
    </ul>
    <p>For details, welcome referring to <a href="https://zilliz.com/resources/whitepaper/milvus-performance-benchmark">this whitepaper</a> and <a href="https://github.com/zilliztech/VectorDBBench">related benchmark test code</a>. </p>
  </div>
</div>
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
    </button></h2><ul>
<li>Comparing with Milvus 2.1, the QPS of Milvus 2.2.0 increases over 48% in cluster mode and over 75% in standalone mode.</li>
<li>Milvus 2.2.0 has an impressive capability to scale up and scale out:
<ul>
<li>QPS increases linearly when expanding CPU cores from 8 to 32.</li>
<li>QPS increases linearly when expanding Querynode replicas from 1 to 8.</li>
</ul></li>
</ul>
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
<td>A search parameter specific to <a href="https://milvus.io/docs/v2.2.x/index.md">HNSW index</a></td>
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
<tr><td>Milvus</td><td>v2.2.0</td></tr>
<tr><td>Milvus GO SDK</td><td>v2.2.0</td></tr>
</tbody>
</table>
<h3 id="Deployment-scheme" class="common-anchor-header">Deployment scheme</h3><ul>
<li>Milvus instances (standalone or cluster) are deployed via <a href="https://milvus.io/docs/install_standalone-helm.md">Helm</a> on a Kubernetes cluster based on physical or virtual machines.</li>
<li>Different tests merely vary in the number of CPU cores, the size of memory, and the number of replicas (worker nodes), which only applies to Milvus clusters.</li>
<li>Unspecified configurations are identical to <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml">default configurations</a>.</li>
<li>Milvus dependencies (MinIO, Pulsar and Etcd) store data on the local SSD in each node.</li>
<li>Search requests are sent to the Milvus instances via <a href="https://github.com/milvus-io/milvus-sdk-go/tree/master/tests">Milvus GO SDK</a>.</li>
</ul>
<h3 id="Data-sets" class="common-anchor-header">Data sets</h3><p>The test uses the open-source dataset SIFT (128 dimensions) from <a href="https://github.com/erikbern/ann-benchmarks/#data-sets">ANN-Benchmarks</a>.</p>
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
<li>Insert 1 million SIFT vectors. Build an HNSW index and configure the index parameters by setting <code translate="no">M</code> to <code translate="no">8</code> and <code translate="no">efConstruction</code> to <code translate="no">200</code>.</li>
<li>Load the collection.</li>
<li>Search with different concurrent numbers with search parameters <code translate="no">nq=1, topk=1, ef=64</code>, the duration of each concurrency is at least 1 hour.</li>
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
    </button></h2><h3 id="Milvus-220-vs-Milvus-210" class="common-anchor-header">Milvus 2.2.0 v.s. Milvus 2.1.0</h3><h4 id="Cluster" class="common-anchor-header">Cluster</h4><p><details>
<summary><b>Server configurations (cluster)</b></summary>
<code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 8Gi requests: cpu: &quot;12.0&quot; memory: 8Gi</code>
</details></p>
<p><strong>Search performance</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>fail/s</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>6904</td><td>59</td><td>28</td><td>0</td></tr>
<tr><td>2.2.0</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
</tbody>
</table>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/cluster_search_performance_210_vs_220.png" alt="Cluster search performance" class="doc-image" id="cluster-search-performance" />
    <span>Cluster search performance</span>
  </span>
</p>
<h4 id="Standalone" class="common-anchor-header">Standalone</h4><p><details>
<summary><b>Server configurations (standalone)</b></summary>
<code translate="no">yaml standalone: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 16Gi requests: cpu: &quot;12.0&quot; memory: 16Gi</code>
</details></p>
<p><strong>Search performance</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>fail/s</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>4287</td><td>104</td><td>76</td><td>0</td></tr>
<tr><td>2.2.0</td><td>7522</td><td>127</td><td>79</td><td>0</td></tr>
</tbody>
</table>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/standalone_search_performance_210_vs_220.png" alt="Standalone search performance" class="doc-image" id="standalone-search-performance" />
    <span>Standalone search performance</span>
  </span>
</p>
<h3 id="Milvus-220-Scale-up" class="common-anchor-header">Milvus 2.2.0 Scale-up</h3><p>Expand the CPU cores in one Querynode to check the capability to scale up.</p>
<p><details>
<summary><b>Server configurations (cluster)</b></summary>
<code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi</code>
</details></p>
<p><strong>Search Performance</strong></p>
<table>
<thead>
<tr><th>CPU cores</th><th>Concurrent Number</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>fail/s</th></tr>
</thead>
<tbody>
<tr><td>8</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>12</td><td>300</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
<tr><td>16</td><td>600</td><td>14135</td><td>85</td><td>42</td><td>0</td></tr>
<tr><td>32</td><td>600</td><td>20281</td><td>63</td><td>28</td><td>0</td></tr>
</tbody>
</table>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/search_performance_by_querynode_cpu_cores.png" alt="Search performance by Querynode CPU cores" class="doc-image" id="search-performance-by-querynode-cpu-cores" />
    <span>Search performance by Querynode CPU cores</span>
  </span>
</p>
<h3 id="Milvus-220-Scale-out" class="common-anchor-header">Milvus 2.2.0 Scale-out</h3><p>Expand more replicas with more Querynodes to check the capability to scale out.</p>
<div class="alert note">
<p>Note: the number of Querynodes equals the <code translate="no">replica_number</code> when loading the collection.</p>
</div>
<p><details>
<summary><b>Server configurations (cluster)</b></summary>
<code translate="no">yaml queryNode: replicas: 1 / 2 / 4 / 8 resources: limits: cpu: &quot;8.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; memory: 8Gi</code>
</details></p>
<table>
<thead>
<tr><th>Replicas</th><th>Concurrent Number</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>fail/s</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>2</td><td>500</td><td>15903</td><td>105</td><td>27</td><td>0</td></tr>
<tr><td>4</td><td>800</td><td>19281</td><td>109</td><td>40</td><td>0</td></tr>
<tr><td>8</td><td>1200</td><td>30655</td><td>93</td><td>38</td><td>0</td></tr>
</tbody>
</table>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/search_performance_by_querynode_replicas.png" alt="Search performance by Querynode replicas" class="doc-image" id="search-performance-by-querynode-replicas" />
    <span>Search performance by Querynode replicas</span>
  </span>
</p>
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
<li>Try performing Milvus 2.2.0 benchmark tests on your own by referring to <a href="https://milvus.io/blog/2022-08-16-A-Quick-Guide-to-Benchmarking-Milvus-2-1.md">this guide</a>, except that you should instead use Milvus 2.2 and Pymilvus 2.2 in this guide.</li>
</ul>
