---
id: benchmark.md
summary: Learn about the benchmark result of Milvus.
title: ''
---
<h1 id="Milvus-20-Benchmark-Test-Report" class="common-anchor-header">Milvus 2.0 Benchmark Test Report<button data-href="#Milvus-20-Benchmark-Test-Report" class="anchor-icon" translate="no">
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
    </button></h1><p>This report shows the major test results of Milvus 2.0, covering the performances of data inserting, index building, and vector similarity search. The tests aim to provide a benchmark against which the performances of future Milvus releases can be measured.</p>
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
<td>NB</td>
<td>Number of vectors in a batch insert request</td>
</tr>
<tr>
<td>RT</td>
<td>Response time from sending the request to receiving the response</td>
</tr>
<tr>
<td>VPS</td>
<td>Number of vectors that are successfully searched per second</td>        <br>
</tr>
<tr>
<td>QPS</td>
<td>Number of search requests that are successfully processed per second</td>
</tr>
<tr>
<td>Recall</td>
<td>Rate of true nearest vectors retrieved in a search request</td>
</tr>
<tr>
<td>nq</td>
<td>Number of vectors to be searched in one search request</td>
</tr>
<tr>
<td>topk</td>
<td>Number of the nearest vectors to be retrieved for each vector (in nq) in a search request</td>
</tr>
<tr>
<td>nprobe</td>
<td>A search parameter specific to <a href="https://milvus.io/docs/v2.0.x/index.md">IVF indexes</a></td>
</tr>
<tr>
<td>ef</td>
<td>A search parameter specific to <a href="https://milvus.io/docs/v2.0.x/index.md">HNSW index</a></td>
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
<tr><td>Memory</td><td>DDR-4, 2933 MT/s</td></tr>
<tr><td>SSD</td><td>SATA 6 Gbps</td></tr>
</tbody>
</table>
<h3 id="Software-environment" class="common-anchor-header">Software environment</h3><table>
<thead>
<tr><th>Software</th><th>Version</th></tr>
</thead>
<tbody>
<tr><td>Milvus</td><td>2.0</td></tr>
<tr><td>PyMilvus</td><td>2.0.1.dev1</td></tr>
</tbody>
</table>
<h3 id="Deployment-scheme" class="common-anchor-header">Deployment scheme</h3><ul>
<li>Milvus instance (standalone or cluster) in each test is deployed via <a href="https://milvus.io/docs/v2.0.x/install_standalone-helm.md">Helm</a> on a Kubernetes cluster based on physical or virtual machines.</li>
<li>Configurations of the tested Milvus instances merely vary in the number of CPU cores, the size of memory, and the number of replicas (worker nodes), which only applies to Milvus cluster.</li>
<li>Unspecified configurations are <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml">default configurations</a>.</li>
<li>Milvus dependencies (MinIO, Pulsar, and etcd) store data on the local SSD in each node.</li>
<li>PyMilvus is deployed on client end to send Python interface requests to the Milvus instances.</li>
</ul>
<h3 id="Data-sets" class="common-anchor-header">Data sets</h3><p>The tests use open source data sets SIFT (128 dimensions) and GloVe (200 dimensions) from <a href="https://github.com/erikbern/ann-benchmarks/#data-sets">ANN-Benchmarks</a>.</p>
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
<li>Connect the Milvus instance with PyMilvus, run the tests based on Python scripts, and get the corresponding test results.</li>
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
    </button></h2><p>The tests covers the performances of data inserting, index building, and vector search in Milvus 2.0.</p>
<h3 id="Data-inserting-performance" class="common-anchor-header">Data inserting performance</h3><p>This test aims to observe the correlation between NB and RT of data inserting.</p>
<p><details>
<summary><b>Method</b></summary>
<ol>
<li>Create a collection</li>
<li>Insert the specified number (NB) of vectors (SIFT-128-dimension) consecutively</li>
<li>Get the response time (RT) of the insert interface</li>
</ol>
</details></p>
<p><details>
<summary><b>Server configurations (cluster)</b></summary></p>
<pre><code translate="no" class="language-yaml">dataNode:
    replicas: 1
    resources:
    limits:
        memory: 32Gi
        cpu: 8.0
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<div class="zchart-container" id="NB_RT">
<p><template id="chart-type">
“scatter_plot”
</template></p>
<p><template id="data">
[
{
&quot;NB&quot;: 10,
&quot;RT&quot;: 294
},
{
&quot;NB&quot;: 20,
&quot;RT&quot;: 659
},
{
&quot;NB&quot;: 30,
&quot;RT&quot;: 908
},
{
&quot;NB&quot;: 40,
&quot;RT&quot;: 1132
},
{
&quot;NB&quot;: 50,
&quot;RT&quot;: 1373
},
{
&quot;NB&quot;: 60,
&quot;RT&quot;: 1681
},
{
&quot;NB&quot;: 70,
&quot;RT&quot;: 1919
},
{
&quot;NB&quot;: 80,
&quot;RT&quot;: 2067
},
{
&quot;NB&quot;: 90,
&quot;RT&quot;: 2467
},
{
&quot;NB&quot;: 100,
&quot;RT&quot;: 2825
},
{
&quot;NB&quot;: 110,
&quot;RT&quot;: 2911
},
{
&quot;NB&quot;: 120,
&quot;RT&quot;: 3351
},
{
&quot;NB&quot;: 130,
&quot;RT&quot;: 3614
},
{
&quot;NB&quot;: 140,
&quot;RT&quot;: 4497
},
{
&quot;NB&quot;: 150,
&quot;RT&quot;: 4413
},
{
&quot;NB&quot;: 200,
&quot;RT&quot;: 5937
},
{
&quot;NB&quot;: 300,
&quot;RT&quot;: 8722
},
{
&quot;NB&quot;: 400,
&quot;RT&quot;: 11028
},
{
&quot;NB&quot;: 500,
&quot;RT&quot;: 15899
},
{
&quot;NB&quot;: 1000,
&quot;RT&quot;: 30620
}
]
</template></p>
<p><template id="config">
{
&quot;width&quot;: 1000,
&quot;height&quot;: 400,
&quot;border&quot;: &quot;1px solid #999&quot;,
&quot;padding&quot;: [
60,
140,
50,
90
],
&quot;tooltip&quot;: {
&quot;hasTooltip&quot;: true,
&quot;content&quot;: [
&quot;NB&quot;,
“RT”
],
&quot;fontSize&quot;: 16,
&quot;fontWeight&quot;: 500,
&quot;fontColor&quot;: “#444”
},
&quot;title&quot;: {
&quot;text&quot;: &quot;NB &amp; RT&quot;,
&quot;fontSize&quot;: 24,
&quot;fontWeight&quot;: 600,
&quot;fontColor&quot;: “#222”
},
&quot;circle&quot;: {
&quot;r&quot;: 3,
&quot;strokeColor&quot;: &quot;#fff&quot;,
&quot;strokeWidth&quot;: 1,
&quot;isCircleColorMapping&quot;: true,
&quot;circleColor&quot;: &quot;test_no&quot;,
&quot;withLabels&quot;: true,
&quot;label&quot;: &quot;(item) =&gt; <code translate="no">${item.RT}</code>&quot;,
&quot;labelFontSize&quot;: 10,
&quot;withLinks&quot;: true,
&quot;isLinkColorMapping&quot;: true,
&quot;linkType&quot;: &quot;curve&quot;,
&quot;linkWidth&quot;: 2,
&quot;linkColor&quot;: “test_no”
},
&quot;x&quot;: {
&quot;key&quot;: &quot;NB&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;bottom&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;NB / k&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 8,
&quot;zoom&quot;: true
},
&quot;y&quot;: {
&quot;key&quot;: &quot;RT&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;left&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;RT(TP99) / ms&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 6,
&quot;zoom&quot;: true,
&quot;fromZero&quot;: true
},
&quot;groupBy&quot;: {
&quot;isGroupBy&quot;: false,
&quot;key&quot;: &quot;test_no&quot;,
&quot;sameXScale&quot;: true,
&quot;sameYScale&quot;: true
}
}
</template></p>
</div>
<p style="font-size: 12px;color: #4c5a67; text-align: center">Correlation between NB and RT of data inserting</p>
<p><strong>Conclusion</strong></p>
<p>The larger the amount of data inserted at one time, the greater the response time.</p>
<p><strong>Suggestion</strong></p>
<p>It is recommended to insert less than 50,000 entries of (128-dimension) vectors at a single time. This will lead to lower delay and better stability.</p>
<h3 id="Index-building-performance" class="common-anchor-header">Index building performance</h3><p>This test aims to observe the correlation between index building time and the number of the index nodes.</p>
<p><details>
<summary><b>Method</b></summary>
<ol>
<li>Create a collection</li>
<li>Insert 50,000,000 entries of vectors (SIFT-128-dimemnsion)</li>
<li>Build the specified type of index</li>
</ol>
</details></p>
<p><details>
<summary><b>Server configurations (cluster)</b></summary></p>
<pre><code translate="no" class="language-yaml">dataNode:
    replicas: 1
    resources:
        limits:
            memory: 8Gi
            cpu: 2.0
indexNode:
    replicas: 1 / 2 / 4 / 6 / 8
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><details>
<summary><b>Index details</b></summary>
<table class="index-details">
<thead>
<tr>
<th>Index type</th>
<th>Index parameters</th>
</tr>
</thead>
<tbody>
<tr>
<td>HNSW</td>
<td><ul><li>M: 16</li><li>efConstruction: 500</li></ul></td>
</tr>
<tr>
<td>IVF_FLAT</td>
<td>nlist: 2048</td>
</tr>
</tbody>
</table>
</details></p>
<div class="zchart-container" id="indexnodes_indextime">
<p><template id="chart-type">
“barchart”
</template></p>
<p><template id="data">
[
{
&quot;index_time&quot;: 16066.927,
&quot;indexNodes&quot;: 1,
&quot;index_type&quot;: “hnsw”
},
{
&quot;index_time&quot;: 2122.4817,
&quot;indexNodes&quot;: 8,
&quot;index_type&quot;: “hnsw”
},
{
&quot;index_time&quot;: 2789.7433,
&quot;indexNodes&quot;: 6,
&quot;index_type&quot;: “hnsw”
},
{
&quot;index_time&quot;: 4326.4367,
&quot;indexNodes&quot;: 4,
&quot;index_type&quot;: “hnsw”
},
{
&quot;index_time&quot;: 8159.5504,
&quot;indexNodes&quot;: 2,
&quot;index_type&quot;: “hnsw”
},
{
&quot;index_time&quot;: 693.42,
&quot;indexNodes&quot;: 8,
&quot;index_type&quot;: “ivf_flat”
},
{
&quot;index_time&quot;: 855.19,
&quot;indexNodes&quot;: 6,
&quot;index_type&quot;: “ivf_flat”
},
{
&quot;index_time&quot;: 1321.3,
&quot;indexNodes&quot;: 4,
&quot;index_type&quot;: “ivf_flat”
},
{
&quot;index_time&quot;: 2532.61,
&quot;indexNodes&quot;: 2,
&quot;index_type&quot;: “ivf_flat”
},
{
&quot;index_time&quot;: 4848.31,
&quot;indexNodes&quot;: 1,
&quot;index_type&quot;: “ivf_flat”
}
]
</template></p>
<p><template id="config">
{
&quot;width&quot;: 1000,
&quot;height&quot;: 400,
&quot;border&quot;: &quot;1px solid #999&quot;,
&quot;padding&quot;: [60, 140, 50, 90],
&quot;dataProcessing&quot;: {
&quot;needSort&quot;: true,
&quot;sort&quot;: &quot;indexNodes&quot;,
&quot;sortReverse&quot;: false
},
&quot;tooltip&quot;: {
&quot;hasTooltip&quot;: true,
&quot;content&quot;: [&quot;index_time&quot;, &quot;indexNodes&quot;, “index_type”],
&quot;fontSize&quot;: 16,
&quot;fontWeight&quot;: 500,
&quot;fontColor&quot;: “#444”
},
&quot;title&quot;: {
&quot;text&quot;: &quot;indexNodes &amp; indextime - 50m&quot;,
&quot;fontSize&quot;: 24,
&quot;fontWeight&quot;: 600,
&quot;fontColor&quot;: “#222”
},
&quot;x&quot;: {
&quot;key&quot;: &quot;indexNodes&quot;,
&quot;scaleType&quot;: &quot;bin&quot;,
&quot;tickType&quot;: &quot;bottom&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;indexNodes&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 8,
&quot;zoom&quot;: true
},
&quot;y&quot;: {
&quot;key&quot;: &quot;index_time&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;left&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;index time / s&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 6,
&quot;zoom&quot;: false,
&quot;fromZero&quot;: true
},
&quot;groupBy&quot;: {
&quot;isGroupBy&quot;: true,
&quot;key&quot;: &quot;index_type&quot;,
&quot;sameXScale&quot;: false,
&quot;sameYScale&quot;: true,
&quot;legendHeight&quot;: 30,
&quot;legendIconWidth&quot;: 40,
&quot;legendFontSize&quot;: 16,
“legendLabel&quot;: &quot;(index_type) =&gt; index_type”
},
&quot;bar&quot;: {
&quot;isColorMapping&quot;: true,
&quot;color&quot;: &quot;index_type&quot;,
&quot;withLabels&quot;: true,
&quot;label&quot;: &quot;(item) =&gt; <code translate="no">${item.index_time}</code>&quot;,
&quot;labelFontSize&quot;: 10
}
}
</template></p>
</div>
<p style="font-size: 12px;color: #4c5a67; text-align: center">Correlation between index building time and the number of the index nodes</p>
<p><strong>Conclusion</strong></p>
<ul>
<li>With the same dataset and index type and parameter, the more index nodes, the shorter the time to create an index.</li>
<li>With the same dataset and the specified index parameters, it takes longer time to build HNSW index than to build IVF_FLAT index.</li>
</ul>
<p><strong>Suggestion</strong></p>
<p>For large data sets which are mostly stored in <a href="/docs/v2.0.x/glossary.md#Segment">sealed segments</a>, the more index nodes in the cluster, the less time it takes to build an index.</p>
<h3 id="Vector-search-performance" class="common-anchor-header">Vector search performance</h3><p>The following tests observe the vector search of Milvus 2.0 from various perspectives.</p>
<h4 id="nq--RT-group-by-topk" class="common-anchor-header">nq &amp; RT group by topk</h4><p>This test observes the RT of search with different search parameters (nq &amp; topk) under different data sets.</p>
<p><details>
<summary><b>Method</b></summary>
<ol>
<li>Create a collection</li>
<li>Insert the specified number of vectors (SIFT-128-dimension)</li>
<li>Build IVF_FLAT indexes with the specified parameters</li>
<li>Search vectors in the collection with the specified parameters</li>
</ol>
</details></p>
<p><details>
<summary><b>Server configurations (cluster)</b></summary></p>
<pre><code translate="no" class="language-yaml">dataNode:
    replicas: 1
    resources:
        limits:
            memory: 10Gi
            cpu: 2.0
indexNode:
    replicas: 1
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
queryNode:
    replicas: 1 / 4 / 8
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><details>
<summary><b>Search details</b></summary>
<table class="index-details">
<thead>
<tr>
<th>Vector number</th>
<th>Query node number</th>
<th>Index parameter</th>
<th>Search parameters</th>
</tr>
</thead>
<tbody>
<tr>
<td>1,000,000</td>
<td>1</td>
<td>nlist: 2048</td>
<td><ul><li>nprobe: 16</li><li>nq: 1, 10, 100, 500, 1000, 1200, 2000, 5000, 10000</li><li>topk: 1, 200, 500, 1000</li></ul></td>
</tr>
<tr>
<td>50,000,000</td>
<td>4</td>
<td>nlist: 4096</td>
<td><ul><li>nprobe: 16</li><li>nq: 1, 10, 100, 500, 1000, 1200, 2000, 5000, 10000</li><li>topk: 1, 200, 500, 1000</li></ul></td>
</tr>
<tr>
<td>50,000,000</td>
<td>8</td>
<td>nlist: 4096</td>
<td><ul><li>nprobe: 16</li><li>nq: 1, 10, 100, 500, 1000, 1200, 2000, 5000, 10000</li><li>topk: 1, 200, 500, 1000</li></ul></td>
</tr>
</tbody>
</table>
</details></p>
<div class="zchart-container" id="nq_RT_1m">
<p><template id="chart-type">
“scatter_plot”
</template></p>
<p><template id="data">
[
{
&quot;RT&quot;: 0.0131,
&quot;nq&quot;: 1,
&quot;topk&quot;: 1,
&quot;vps&quot;: 76.3358779
},
{
&quot;RT&quot;: 0.0121,
&quot;nq&quot;: 1,
&quot;topk&quot;: 200,
&quot;vps&quot;: 82.6446281
},
{
&quot;RT&quot;: 0.0135,
&quot;nq&quot;: 1,
&quot;topk&quot;: 500,
&quot;vps&quot;: 74.0740741
},
{
&quot;RT&quot;: 0.0144,
&quot;nq&quot;: 1,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 69.4444444
},
{
&quot;RT&quot;: 0.0136,
&quot;nq&quot;: 10,
&quot;topk&quot;: 1,
&quot;vps&quot;: 735.294118
},
{
&quot;RT&quot;: 0.0162,
&quot;nq&quot;: 10,
&quot;topk&quot;: 200,
&quot;vps&quot;: 617.283951
},
{
&quot;RT&quot;: 0.0185,
&quot;nq&quot;: 10,
&quot;topk&quot;: 500,
&quot;vps&quot;: 540.540541
},
{
&quot;RT&quot;: 0.0234,
&quot;nq&quot;: 10,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 427.350427
},
{
&quot;RT&quot;: 0.0411,
&quot;nq&quot;: 100,
&quot;topk&quot;: 1,
&quot;vps&quot;: 2433.09002
},
{
&quot;RT&quot;: 0.0475,
&quot;nq&quot;: 100,
&quot;topk&quot;: 200,
&quot;vps&quot;: 2105.26316
},
{
&quot;RT&quot;: 0.0698,
&quot;nq&quot;: 100,
&quot;topk&quot;: 500,
&quot;vps&quot;: 1432.66476
},
{
&quot;RT&quot;: 0.1058,
&quot;nq&quot;: 100,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 945.179584
},
{
&quot;RT&quot;: 0.1446,
&quot;nq&quot;: 500,
&quot;topk&quot;: 1,
&quot;vps&quot;: 3457.81466
},
{
&quot;RT&quot;: 0.1989,
&quot;nq&quot;: 500,
&quot;topk&quot;: 200,
&quot;vps&quot;: 2513.82604
},
{
&quot;RT&quot;: 0.3003,
&quot;nq&quot;: 500,
&quot;topk&quot;: 500,
&quot;vps&quot;: 1665.00167
},
{
&quot;RT&quot;: 0.438,
&quot;nq&quot;: 500,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 1141.55251
},
{
&quot;RT&quot;: 0.2941,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 3400.20401
},
{
&quot;RT&quot;: 0.3927,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 2546.47313
},
{
&quot;RT&quot;: 0.5351,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 1868.80957
},
{
&quot;RT&quot;: 0.8232,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 1214.77162
},
{
&quot;RT&quot;: 0.3775,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 1,
&quot;vps&quot;: 3178.80795
},
{
&quot;RT&quot;: 0.4758,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 200,
&quot;vps&quot;: 2522.0681
},
{
&quot;RT&quot;: 0.6454,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 500,
&quot;vps&quot;: 1859.31205
},
{
&quot;RT&quot;: 0.9775,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 1227.62148
},
{
&quot;RT&quot;: 0.6012,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 3326.67997
},
{
&quot;RT&quot;: 0.8073,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 2477.39378
},
{
&quot;RT&quot;: 1.0531,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 1899.15488
},
{
&quot;RT&quot;: 1.5873,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 1260.00126
},
{
&quot;RT&quot;: 1.7565,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 2846.56988
},
{
&quot;RT&quot;: 1.9376,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 2580.51197
},
{
&quot;RT&quot;: 2.5256,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 1979.72759
},
{
&quot;RT&quot;: 3.8005,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 1315.61637
},
{
&quot;RT&quot;: 3.8685,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 2584.98126
},
{
&quot;RT&quot;: 3.9708,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 2518.3842
},
{
&quot;RT&quot;: 5.1667,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 1935.47138
},
{
&quot;RT&quot;: 7.5669,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 1321.54515
}
]
</template></p>
<p><template id="config">
{
&quot;width&quot;: 1000,
&quot;height&quot;: 400,
&quot;border&quot;: &quot;1px solid #999&quot;,
&quot;padding&quot;: [
60,
140,
60,
60
],
&quot;tooltip&quot;: {
&quot;hasTooltip&quot;: true,
&quot;content&quot;: [
&quot;RT&quot;,
&quot;nq&quot;,
“topk”
],
&quot;fontSize&quot;: 16,
&quot;fontWeight&quot;: 500,
&quot;fontColor&quot;: “#444”
},
&quot;dataProcessing&quot;: {
&quot;needSort&quot;: false,
&quot;sort&quot;: &quot;indexNodes&quot;,
&quot;sortReverse&quot;: false,
&quot;needFixed&quot;: true,
&quot;fixedKey&quot;: &quot;RT&quot;,
&quot;fixedNum&quot;: 2
},
&quot;title&quot;: {
&quot;text&quot;: &quot;nq &amp; RT - 1m&quot;,
&quot;fontSize&quot;: 24,
&quot;fontWeight&quot;: 600,
&quot;fontColor&quot;: “#222”
},
&quot;circle&quot;: {
&quot;r&quot;: 3,
&quot;strokeColor&quot;: &quot;#fff&quot;,
&quot;strokeWidth&quot;: 1,
&quot;isCircleColorMapping&quot;: true,
&quot;circleColor&quot;: &quot;topk&quot;,
&quot;withLabels&quot;: true,
&quot;label&quot;: &quot;(item) =&gt; <code translate="no">${item.RT}</code>&quot;,
&quot;labelFontSize&quot;: 10,
&quot;withLinks&quot;: true,
&quot;isLinkColorMapping&quot;: true,
&quot;linkType&quot;: &quot;curve&quot;,
&quot;linkWidth&quot;: 2,
&quot;linkColor&quot;: “topk”
},
&quot;x&quot;: {
&quot;key&quot;: &quot;nq&quot;,
&quot;scaleType&quot;: &quot;ordinal&quot;,
&quot;tickType&quot;: &quot;bottom&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;nq&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 12,
&quot;zoom&quot;: false
},
&quot;y&quot;: {
&quot;key&quot;: &quot;RT&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;left&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;RT / s&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 6,
&quot;zoom&quot;: true,
&quot;fromZero&quot;: true
},
&quot;groupBy&quot;: {
&quot;isGroupBy&quot;: true,
&quot;key&quot;: &quot;topk&quot;,
&quot;sameXScale&quot;: true,
&quot;sameYScale&quot;: true,
&quot;legendHeight&quot;: 30,
&quot;legendIconWidth&quot;: 40,
&quot;legendFontSize&quot;: 12,
&quot;legendLabel&quot;: &quot;(topk) =&gt;<code translate="no">topk=${topk}</code>&quot;
}
}
</template></p>
</div>
<p style="font-size: 12px;color: #4c5a67; text-align: center">RT of search on one million vectors with one query node</p>
<div class="zchart-container" id="nq_RT_50m_4qn">
<p><template id="chart-type">
“scatter_plot”
</template></p>
<p><template id="data">
[
{
&quot;RT&quot;: 0.0273,
&quot;nq&quot;: 1,
&quot;topk&quot;: 1,
&quot;vps&quot;: 36.63004
},
{
&quot;RT&quot;: 0.0283,
&quot;nq&quot;: 1,
&quot;topk&quot;: 200,
&quot;vps&quot;: 35.33569
},
{
&quot;RT&quot;: 0.0296,
&quot;nq&quot;: 1,
&quot;topk&quot;: 500,
&quot;vps&quot;: 33.78378
},
{
&quot;RT&quot;: 0.0312,
&quot;nq&quot;: 1,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 32.05128
},
{
&quot;RT&quot;: 0.0478,
&quot;nq&quot;: 10,
&quot;topk&quot;: 1,
&quot;vps&quot;: 209.205
},
{
&quot;RT&quot;: 0.0488,
&quot;nq&quot;: 10,
&quot;topk&quot;: 200,
&quot;vps&quot;: 204.918
},
{
&quot;RT&quot;: 0.0481,
&quot;nq&quot;: 10,
&quot;topk&quot;: 500,
&quot;vps&quot;: 207.9002
},
{
&quot;RT&quot;: 0.0504,
&quot;nq&quot;: 10,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 198.4127
},
{
&quot;RT&quot;: 0.3127,
&quot;nq&quot;: 100,
&quot;topk&quot;: 1,
&quot;vps&quot;: 319.7953
},
{
&quot;RT&quot;: 0.3186,
&quot;nq&quot;: 100,
&quot;topk&quot;: 200,
&quot;vps&quot;: 313.8732
},
{
&quot;RT&quot;: 0.3577,
&quot;nq&quot;: 100,
&quot;topk&quot;: 500,
&quot;vps&quot;: 279.5639
},
{
&quot;RT&quot;: 0.3993,
&quot;nq&quot;: 100,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 250.4383
},
{
&quot;RT&quot;: 1.336,
&quot;nq&quot;: 500,
&quot;topk&quot;: 1,
&quot;vps&quot;: 374.2515
},
{
&quot;RT&quot;: 1.4171,
&quot;nq&quot;: 500,
&quot;topk&quot;: 200,
&quot;vps&quot;: 352.8333
},
{
&quot;RT&quot;: 1.5994,
&quot;nq&quot;: 500,
&quot;topk&quot;: 500,
&quot;vps&quot;: 312.6172
},
{
&quot;RT&quot;: 1.9375,
&quot;nq&quot;: 500,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 258.0645
},
{
&quot;RT&quot;: 2.6652,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 375.2064
},
{
&quot;RT&quot;: 2.837,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 352.485
},
{
&quot;RT&quot;: 3.4202,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 292.3806
},
{
&quot;RT&quot;: 4.0583,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 246.4086
},
{
&quot;RT&quot;: 3.2625,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 1,
&quot;vps&quot;: 367.8161
},
{
&quot;RT&quot;: 3.5976,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 200,
&quot;vps&quot;: 333.5557
},
{
&quot;RT&quot;: 4.0379,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 500,
&quot;vps&quot;: 297.1842
},
{
&quot;RT&quot;: 4.8721,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 246.3004
},
{
&quot;RT&quot;: 5.5438,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 360.7634
},
{
&quot;RT&quot;: 6.1316,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 326.1791
},
{
&quot;RT&quot;: 6.7532,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 296.1559
},
{
&quot;RT&quot;: 8.0977,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 246.9837
},
{
&quot;RT&quot;: 14.1123,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 354.3009
},
{
&quot;RT&quot;: 14.9803,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 333.7717
},
{
&quot;RT&quot;: 16.9175,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 295.5519
},
{
&quot;RT&quot;: 20.0417,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 249.4798
},
{
&quot;RT&quot;: 29.0902,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 343.7584
},
{
&quot;RT&quot;: 29.7621,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 335.9978
},
{
&quot;RT&quot;: 32.9581,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 303.4155
},
{
&quot;RT&quot;: 40.0512,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 249.6804
}
]
</template></p>
<p><template id="config">
{
&quot;width&quot;: 1000,
&quot;height&quot;: 400,
&quot;border&quot;: &quot;1px solid #999&quot;,
&quot;padding&quot;: [
60,
140,
60,
60
],
&quot;tooltip&quot;: {
&quot;hasTooltip&quot;: true,
&quot;content&quot;: [
&quot;RT&quot;,
&quot;nq&quot;,
“topk”
],
&quot;fontSize&quot;: 16,
&quot;fontWeight&quot;: 500,
&quot;fontColor&quot;: “#666”
},
&quot;dataProcessing&quot;: {
&quot;needSort&quot;: false,
&quot;sort&quot;: &quot;indexNodes&quot;,
&quot;sortReverse&quot;: false,
&quot;needFixed&quot;: true,
&quot;fixedKey&quot;: &quot;RT&quot;,
&quot;fixedNum&quot;: 2
},
&quot;title&quot;: {
&quot;text&quot;: &quot;nq &amp; RT - 50m - 4queryNodes&quot;,
&quot;fontSize&quot;: 24,
&quot;fontWeight&quot;: 600,
&quot;fontColor&quot;: “#222”
},
&quot;circle&quot;: {
&quot;r&quot;: 3,
&quot;strokeColor&quot;: &quot;#fff&quot;,
&quot;strokeWidth&quot;: 1,
&quot;isCircleColorMapping&quot;: true,
&quot;circleColor&quot;: &quot;topk&quot;,
&quot;withLabels&quot;: true,
&quot;label&quot;: &quot;(item) =&gt; <code translate="no">${item.RT}</code>&quot;,
&quot;labelFontSize&quot;: 10,
&quot;withLinks&quot;: true,
&quot;isLinkColorMapping&quot;: true,
&quot;linkType&quot;: &quot;curve&quot;,
&quot;linkWidth&quot;: 2,
&quot;linkColor&quot;: “topk”
},
&quot;x&quot;: {
&quot;key&quot;: &quot;nq&quot;,
&quot;scaleType&quot;: &quot;ordinal&quot;,
&quot;tickType&quot;: &quot;bottom&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;nq&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 8,
&quot;zoom&quot;: false
},
&quot;y&quot;: {
&quot;key&quot;: &quot;RT&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;left&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;RT / s&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 6,
&quot;zoom&quot;: true,
&quot;fromZero&quot;: true
},
&quot;groupBy&quot;: {
&quot;isGroupBy&quot;: true,
&quot;key&quot;: &quot;topk&quot;,
&quot;sameXScale&quot;: true,
&quot;sameYScale&quot;: true,
&quot;legendHeight&quot;: 30,
&quot;legendIconWidth&quot;: 40,
&quot;legendFontSize&quot;: 12,
&quot;legendLabel&quot;: &quot;(topk) =&gt;<code translate="no">topk=${topk}</code>&quot;
}
}
</template></p>
</div>
<p style="font-size: 12px;color: #4c5a67; text-align: center">RT of search on fifty million vectors with four query nodes</p>
<div class="zchart-container" id="nq_RT_50m_8qn">
<p><template id="chart-type">
“scatter_plot”
</template></p>
<p><template id="data">
[
{
&quot;RT&quot;: 0.0225,
&quot;nq&quot;: 1,
&quot;topk&quot;: 1,
&quot;vps&quot;: 44.44444
},
{
&quot;RT&quot;: 0.0219,
&quot;nq&quot;: 1,
&quot;topk&quot;: 200,
&quot;vps&quot;: 45.6621
},
{
&quot;RT&quot;: 0.0232,
&quot;nq&quot;: 1,
&quot;topk&quot;: 500,
&quot;vps&quot;: 43.10345
},
{
&quot;RT&quot;: 0.0257,
&quot;nq&quot;: 1,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 38.91051
},
{
&quot;RT&quot;: 0.0272,
&quot;nq&quot;: 10,
&quot;topk&quot;: 1,
&quot;vps&quot;: 367.6471
},
{
&quot;RT&quot;: 0.0309,
&quot;nq&quot;: 10,
&quot;topk&quot;: 200,
&quot;vps&quot;: 323.6246
},
{
&quot;RT&quot;: 0.0342,
&quot;nq&quot;: 10,
&quot;topk&quot;: 500,
&quot;vps&quot;: 292.3977
},
{
&quot;RT&quot;: 0.0426,
&quot;nq&quot;: 10,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 234.7418
},
{
&quot;RT&quot;: 0.1853,
&quot;nq&quot;: 100,
&quot;topk&quot;: 1,
&quot;vps&quot;: 539.6654
},
{
&quot;RT&quot;: 0.184,
&quot;nq&quot;: 100,
&quot;topk&quot;: 200,
&quot;vps&quot;: 543.4783
},
{
&quot;RT&quot;: 0.201,
&quot;nq&quot;: 100,
&quot;topk&quot;: 500,
&quot;vps&quot;: 497.5124
},
{
&quot;RT&quot;: 0.2595,
&quot;nq&quot;: 100,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 385.3565
},
{
&quot;RT&quot;: 0.6968,
&quot;nq&quot;: 500,
&quot;topk&quot;: 1,
&quot;vps&quot;: 717.566
},
{
&quot;RT&quot;: 0.7929,
&quot;nq&quot;: 500,
&quot;topk&quot;: 200,
&quot;vps&quot;: 630.5965
},
{
&quot;RT&quot;: 0.9219,
&quot;nq&quot;: 500,
&quot;topk&quot;: 500,
&quot;vps&quot;: 542.3582
},
{
&quot;RT&quot;: 1.1462,
&quot;nq&quot;: 500,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 436.224
},
{
&quot;RT&quot;: 1.3024,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 767.8133
},
{
&quot;RT&quot;: 1.5647,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 639.1001
},
{
&quot;RT&quot;: 1.8711,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 534.445
},
{
&quot;RT&quot;: 2.2359,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 447.2472
},
{
&quot;RT&quot;: 1.5505,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 1,
&quot;vps&quot;: 773.9439
},
{
&quot;RT&quot;: 1.9031,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 200,
&quot;vps&quot;: 630.5502
},
{
&quot;RT&quot;: 2.187,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 500,
&quot;vps&quot;: 548.6968
},
{
&quot;RT&quot;: 2.6631,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 450.6027
},
{
&quot;RT&quot;: 2.7079,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 738.5797
},
{
&quot;RT&quot;: 3.2815,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 609.4774
},
{
&quot;RT&quot;: 3.6797,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 543.5226
},
{
&quot;RT&quot;: 4.4285,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 451.6202
},
{
&quot;RT&quot;: 6.7683,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 738.7379
},
{
&quot;RT&quot;: 7.8383,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 637.8934
},
{
&quot;RT&quot;: 8.7616,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 570.672
},
{
&quot;RT&quot;: 10.972,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 455.7054
},
{
&quot;RT&quot;: 14.1158,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 708.426
},
{
&quot;RT&quot;: 15.6977,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 637.036
},
{
&quot;RT&quot;: 17.4658,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 572.5475
},
{
&quot;RT&quot;: 21.9538,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 455.502
}
]
</template></p>
<p><template id="config">
{
&quot;width&quot;: 1000,
&quot;height&quot;: 400,
&quot;border&quot;: &quot;1px solid #999&quot;,
&quot;padding&quot;: [
60,
140,
60,
60
],
&quot;tooltip&quot;: {
&quot;hasTooltip&quot;: true,
&quot;content&quot;: [
&quot;RT&quot;,
&quot;nq&quot;,
“topk”
],
&quot;fontSize&quot;: 16,
&quot;fontWeight&quot;: 500,
&quot;fontColor&quot;: “#666”
},
&quot;dataProcessing&quot;: {
&quot;needSort&quot;: false,
&quot;sort&quot;: &quot;indexNodes&quot;,
&quot;sortReverse&quot;: false,
&quot;needFixed&quot;: true,
&quot;fixedKey&quot;: &quot;RT&quot;,
&quot;fixedNum&quot;: 2
},
&quot;title&quot;: {
&quot;text&quot;: &quot;nq &amp; RT - 50m - 8queryNodes&quot;,
&quot;fontSize&quot;: 24,
&quot;fontWeight&quot;: 600,
&quot;fontColor&quot;: “#222”
},
&quot;circle&quot;: {
&quot;r&quot;: 3,
&quot;strokeColor&quot;: &quot;#fff&quot;,
&quot;strokeWidth&quot;: 1,
&quot;isCircleColorMapping&quot;: true,
&quot;circleColor&quot;: &quot;topk&quot;,
&quot;withLabels&quot;: true,
&quot;label&quot;: &quot;(item) =&gt; <code translate="no">${item.RT}</code>&quot;,
&quot;labelFontSize&quot;: 10,
&quot;withLinks&quot;: true,
&quot;isLinkColorMapping&quot;: true,
&quot;linkType&quot;: &quot;curve&quot;,
&quot;linkWidth&quot;: 2,
&quot;linkColor&quot;: “topk”
},
&quot;x&quot;: {
&quot;key&quot;: &quot;nq&quot;,
&quot;scaleType&quot;: &quot;ordinal&quot;,
&quot;tickType&quot;: &quot;bottom&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;nq&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 8,
&quot;zoom&quot;: false
},
&quot;y&quot;: {
&quot;key&quot;: &quot;RT&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;left&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;RT / s&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 6,
&quot;zoom&quot;: true,
&quot;fromZero&quot;: true
},
&quot;groupBy&quot;: {
&quot;isGroupBy&quot;: true,
&quot;key&quot;: &quot;topk&quot;,
&quot;sameXScale&quot;: true,
&quot;sameYScale&quot;: true,
&quot;legendHeight&quot;: 30,
&quot;legendIconWidth&quot;: 40,
&quot;legendFontSize&quot;: 12,
&quot;legendLabel&quot;: &quot;(topk) =&gt;<code translate="no">topk=${topk}</code>&quot;
}
}
</template></p>
</div>
<p style="font-size: 12px;color: #4c5a67; text-align: center">RT of search on fifty million vectors with eight query nodes</p>
<p><strong>Conclusion</strong></p>
<ul>
<li>With the same dataset, the more query nodes, with the increase of nq or topk, the RT of search gradually increases.</li>
<li>With the same dataset and search parameters, the more query nodes in the cluster, the lower the RT of the search.</li>
<li>The smaller the data set, the lower the RT of the search.</li>
<li>With the same search parameters, topk that is less than 200 makes little difference on RT of search.</li>
</ul>
<p><strong>Suggestion</strong></p>
<p>For large data sets which are mostly stored in <a href="/docs/v2.0.x/glossary.md#Segment">sealed segments</a>, adding query nodes to the cluster will shorten time it takes to search vectors.</p>
<h4 id="nq--VPS-group-by-topk" class="common-anchor-header">nq &amp; VPS group by topk</h4><p>This test observes the VPS of search with different search parameters (nq &amp; topk) under different data sets.</p>
<p><details>
<summary><b>Method</b></summary>
<ol>
<li>Create a collection</li>
<li>Insert the specified number of vectors (SIFT-128-dimension)</li>
<li>Build IVF_FLAT indexes with the specified parameters</li>
<li>Search vectors in the collection with the specified parameters</li>
</ol>
</details></p>
<p><details>
<summary><b>Server configurations (cluster)</b></summary></p>
<pre><code translate="no" class="language-yaml">dataNode:
    replicas: 1
    resources:
        limits:
            memory: 10Gi
            cpu: 2.0
indexNode:
    replicas: 1
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
queryNode:
    replicas: 1 / 4 / 8
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><details>
<summary><b>Search details</b></summary>
<table class="index-details">
<thead>
<tr>
<th>Vector number</th>
<th>Query node number</th>
<th>Index parameter</th>
<th>Search parameters</th>
</tr>
</thead>
<tbody>
<tr>
<td>1,000,000</td>
<td>1</td>
<td>nlist: 2048</td>
<td><ul><li>nprobe: 16</li><li>nq: 1, 10, 100, 500, 1000, 1200, 2000, 5000, 10000</li><li>topk: 1, 200, 500, 1000</li></ul></td>
</tr>
<tr>
<td>50,000,000</td>
<td>4</td>
<td>nlist: 4096</td>
<td><ul><li>nprobe: 16</li><li>nq: 1, 10, 100, 500, 1000, 1200, 2000, 5000, 10000</li><li>topk: 1, 200, 500, 1000</li></ul></td>
</tr>
<tr>
<td>50,000,000</td>
<td>8</td>
<td>nlist: 4096</td>
<td><ul><li>nprobe: 16</li><li>nq: 1, 10, 100, 500, 1000, 1200, 2000, 5000, 10000</li><li>topk: 1, 200, 500, 1000</li></ul></td>
</tr>
</tbody>
</table>
</details></p>
<div class="zchart-container" id="nq_RT_1m_vps">
<p><template id="chart-type">
“scatter_plot”
</template></p>
<p><template id="data">
[
{
&quot;RT&quot;: 0.0131,
&quot;nq&quot;: 1,
&quot;topk&quot;: 1,
&quot;vps&quot;: 76.3358779
},
{
&quot;RT&quot;: 0.0121,
&quot;nq&quot;: 1,
&quot;topk&quot;: 200,
&quot;vps&quot;: 82.6446281
},
{
&quot;RT&quot;: 0.0135,
&quot;nq&quot;: 1,
&quot;topk&quot;: 500,
&quot;vps&quot;: 74.0740741
},
{
&quot;RT&quot;: 0.0144,
&quot;nq&quot;: 1,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 69.4444444
},
{
&quot;RT&quot;: 0.0136,
&quot;nq&quot;: 10,
&quot;topk&quot;: 1,
&quot;vps&quot;: 735.294118
},
{
&quot;RT&quot;: 0.0162,
&quot;nq&quot;: 10,
&quot;topk&quot;: 200,
&quot;vps&quot;: 617.283951
},
{
&quot;RT&quot;: 0.0185,
&quot;nq&quot;: 10,
&quot;topk&quot;: 500,
&quot;vps&quot;: 540.540541
},
{
&quot;RT&quot;: 0.0234,
&quot;nq&quot;: 10,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 427.350427
},
{
&quot;RT&quot;: 0.0411,
&quot;nq&quot;: 100,
&quot;topk&quot;: 1,
&quot;vps&quot;: 2433.09002
},
{
&quot;RT&quot;: 0.0475,
&quot;nq&quot;: 100,
&quot;topk&quot;: 200,
&quot;vps&quot;: 2105.26316
},
{
&quot;RT&quot;: 0.0698,
&quot;nq&quot;: 100,
&quot;topk&quot;: 500,
&quot;vps&quot;: 1432.66476
},
{
&quot;RT&quot;: 0.1058,
&quot;nq&quot;: 100,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 945.179584
},
{
&quot;RT&quot;: 0.1446,
&quot;nq&quot;: 500,
&quot;topk&quot;: 1,
&quot;vps&quot;: 3457.81466
},
{
&quot;RT&quot;: 0.1989,
&quot;nq&quot;: 500,
&quot;topk&quot;: 200,
&quot;vps&quot;: 2513.82604
},
{
&quot;RT&quot;: 0.3003,
&quot;nq&quot;: 500,
&quot;topk&quot;: 500,
&quot;vps&quot;: 1665.00167
},
{
&quot;RT&quot;: 0.438,
&quot;nq&quot;: 500,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 1141.55251
},
{
&quot;RT&quot;: 0.2941,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 3400.20401
},
{
&quot;RT&quot;: 0.3927,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 2546.47313
},
{
&quot;RT&quot;: 0.5351,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 1868.80957
},
{
&quot;RT&quot;: 0.8232,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 1214.77162
},
{
&quot;RT&quot;: 0.3775,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 1,
&quot;vps&quot;: 3178.80795
},
{
&quot;RT&quot;: 0.4758,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 200,
&quot;vps&quot;: 2522.0681
},
{
&quot;RT&quot;: 0.6454,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 500,
&quot;vps&quot;: 1859.31205
},
{
&quot;RT&quot;: 0.9775,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 1227.62148
},
{
&quot;RT&quot;: 0.6012,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 3326.67997
},
{
&quot;RT&quot;: 0.8073,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 2477.39378
},
{
&quot;RT&quot;: 1.0531,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 1899.15488
},
{
&quot;RT&quot;: 1.5873,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 1260.00126
},
{
&quot;RT&quot;: 1.7565,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 2846.56988
},
{
&quot;RT&quot;: 1.9376,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 2580.51197
},
{
&quot;RT&quot;: 2.5256,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 1979.72759
},
{
&quot;RT&quot;: 3.8005,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 1315.61637
},
{
&quot;RT&quot;: 3.8685,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 2584.98126
},
{
&quot;RT&quot;: 3.9708,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 2518.3842
},
{
&quot;RT&quot;: 5.1667,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 1935.47138
},
{
&quot;RT&quot;: 7.5669,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 1321.54515
}
]
</template></p>
<p><template id="config">
{
&quot;width&quot;: 1000,
&quot;height&quot;: 400,
&quot;border&quot;: &quot;1px solid #999&quot;,
&quot;padding&quot;: [
60,
140,
60,
90
],
&quot;dataProcessing&quot;: {
&quot;needFixed&quot;: true,
&quot;fixedKey&quot;: &quot;vps&quot;,
&quot;fixedNum&quot;: 2
},
&quot;tooltip&quot;: {
&quot;hasTooltip&quot;: true,
&quot;content&quot;: [
&quot;vps&quot;,
&quot;nq&quot;,
“topk”
],
&quot;fontSize&quot;: 16,
&quot;fontWeight&quot;: 500,
&quot;fontColor&quot;: “#666”
},
&quot;title&quot;: {
&quot;text&quot;: &quot;nq &amp; VPS - 1m&quot;,
&quot;fontSize&quot;: 24,
&quot;fontWeight&quot;: 600,
&quot;fontColor&quot;: “#222”
},
&quot;circle&quot;: {
&quot;r&quot;: 3,
&quot;strokeColor&quot;: &quot;#fff&quot;,
&quot;strokeWidth&quot;: 1,
&quot;isCircleColorMapping&quot;: true,
&quot;circleColor&quot;: &quot;topk&quot;,
&quot;withLabels&quot;: true,
&quot;label&quot;: &quot;(item) =&gt; <code translate="no">${item.vps}</code>&quot;,
&quot;labelFontSize&quot;: 10,
&quot;withLinks&quot;: true,
&quot;isLinkColorMapping&quot;: true,
&quot;linkType&quot;: &quot;curve&quot;,
&quot;linkWidth&quot;: 2,
&quot;linkColor&quot;: “topk”
},
&quot;x&quot;: {
&quot;key&quot;: &quot;nq&quot;,
&quot;scaleType&quot;: &quot;ordinal&quot;,
&quot;tickType&quot;: &quot;bottom&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;nq&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 8,
&quot;zoom&quot;: false
},
&quot;y&quot;: {
&quot;key&quot;: &quot;vps&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;left&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;VPS&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 6,
&quot;zoom&quot;: true,
&quot;fromZero&quot;: true
},
&quot;groupBy&quot;: {
&quot;isGroupBy&quot;: true,
&quot;key&quot;: &quot;topk&quot;,
&quot;sameXScale&quot;: true,
&quot;sameYScale&quot;: true,
&quot;legendHeight&quot;: 30,
&quot;legendIconWidth&quot;: 40,
&quot;legendFontSize&quot;: 12,
&quot;legendLabel&quot;: &quot;(topk) =&gt;<code translate="no">topk=${topk}</code>&quot;
}
}
</template></p>
</div>
<p style="font-size: 12px;color: #4c5a67; text-align: center">VPS of search on one million vectors with one query node</p>
<div class="zchart-container" id="nq_RT_50m_4qn_vps">
<p><template id="chart-type">
“scatter_plot”
</template></p>
<p><template id="data">
[
{
&quot;RT&quot;: 0.0273,
&quot;nq&quot;: 1,
&quot;topk&quot;: 1,
&quot;vps&quot;: 36.63004
},
{
&quot;RT&quot;: 0.0283,
&quot;nq&quot;: 1,
&quot;topk&quot;: 200,
&quot;vps&quot;: 35.33569
},
{
&quot;RT&quot;: 0.0296,
&quot;nq&quot;: 1,
&quot;topk&quot;: 500,
&quot;vps&quot;: 33.78378
},
{
&quot;RT&quot;: 0.0312,
&quot;nq&quot;: 1,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 32.05128
},
{
&quot;RT&quot;: 0.0478,
&quot;nq&quot;: 10,
&quot;topk&quot;: 1,
&quot;vps&quot;: 209.205
},
{
&quot;RT&quot;: 0.0488,
&quot;nq&quot;: 10,
&quot;topk&quot;: 200,
&quot;vps&quot;: 204.918
},
{
&quot;RT&quot;: 0.0481,
&quot;nq&quot;: 10,
&quot;topk&quot;: 500,
&quot;vps&quot;: 207.9002
},
{
&quot;RT&quot;: 0.0504,
&quot;nq&quot;: 10,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 198.4127
},
{
&quot;RT&quot;: 0.3127,
&quot;nq&quot;: 100,
&quot;topk&quot;: 1,
&quot;vps&quot;: 319.7953
},
{
&quot;RT&quot;: 0.3186,
&quot;nq&quot;: 100,
&quot;topk&quot;: 200,
&quot;vps&quot;: 313.8732
},
{
&quot;RT&quot;: 0.3577,
&quot;nq&quot;: 100,
&quot;topk&quot;: 500,
&quot;vps&quot;: 279.5639
},
{
&quot;RT&quot;: 0.3993,
&quot;nq&quot;: 100,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 250.4383
},
{
&quot;RT&quot;: 1.336,
&quot;nq&quot;: 500,
&quot;topk&quot;: 1,
&quot;vps&quot;: 374.2515
},
{
&quot;RT&quot;: 1.4171,
&quot;nq&quot;: 500,
&quot;topk&quot;: 200,
&quot;vps&quot;: 352.8333
},
{
&quot;RT&quot;: 1.5994,
&quot;nq&quot;: 500,
&quot;topk&quot;: 500,
&quot;vps&quot;: 312.6172
},
{
&quot;RT&quot;: 1.9375,
&quot;nq&quot;: 500,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 258.0645
},
{
&quot;RT&quot;: 2.6652,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 375.2064
},
{
&quot;RT&quot;: 2.837,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 352.485
},
{
&quot;RT&quot;: 3.4202,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 292.3806
},
{
&quot;RT&quot;: 4.0583,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 246.4086
},
{
&quot;RT&quot;: 3.2625,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 1,
&quot;vps&quot;: 367.8161
},
{
&quot;RT&quot;: 3.5976,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 200,
&quot;vps&quot;: 333.5557
},
{
&quot;RT&quot;: 4.0379,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 500,
&quot;vps&quot;: 297.1842
},
{
&quot;RT&quot;: 4.8721,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 246.3004
},
{
&quot;RT&quot;: 5.5438,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 360.7634
},
{
&quot;RT&quot;: 6.1316,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 326.1791
},
{
&quot;RT&quot;: 6.7532,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 296.1559
},
{
&quot;RT&quot;: 8.0977,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 246.9837
},
{
&quot;RT&quot;: 14.1123,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 354.3009
},
{
&quot;RT&quot;: 14.9803,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 333.7717
},
{
&quot;RT&quot;: 16.9175,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 295.5519
},
{
&quot;RT&quot;: 20.0417,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 249.4798
},
{
&quot;RT&quot;: 29.0902,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 343.7584
},
{
&quot;RT&quot;: 29.7621,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 335.9978
},
{
&quot;RT&quot;: 32.9581,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 303.4155
},
{
&quot;RT&quot;: 40.0512,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 249.6804
}
]
</template></p>
<p><template id="config">
{
&quot;width&quot;: 1000,
&quot;height&quot;: 400,
&quot;border&quot;: &quot;1px solid #999&quot;,
&quot;padding&quot;: [
60,
140,
60,
90
],
&quot;dataProcessing&quot;: {
&quot;needFixed&quot;: true,
&quot;fixedKey&quot;: &quot;vps&quot;,
&quot;fixedNum&quot;: 2
},
&quot;tooltip&quot;: {
&quot;hasTooltip&quot;: true,
&quot;content&quot;: [
&quot;vps&quot;,
&quot;nq&quot;,
“topk”
],
&quot;fontSize&quot;: 16,
&quot;fontWeight&quot;: 500,
&quot;fontColor&quot;: “#666”
},
&quot;title&quot;: {
&quot;text&quot;: &quot;nq &amp; VPS - 50m - 4queryNodes&quot;,
&quot;fontSize&quot;: 24,
&quot;fontWeight&quot;: 600,
&quot;fontColor&quot;: “#222”
},
&quot;circle&quot;: {
&quot;r&quot;: 3,
&quot;strokeColor&quot;: &quot;#fff&quot;,
&quot;strokeWidth&quot;: 1,
&quot;isCircleColorMapping&quot;: true,
&quot;circleColor&quot;: &quot;topk&quot;,
&quot;withLabels&quot;: true,
&quot;label&quot;: &quot;(item) =&gt; <code translate="no">${item.vps}</code>&quot;,
&quot;labelFontSize&quot;: 10,
&quot;withLinks&quot;: true,
&quot;isLinkColorMapping&quot;: true,
&quot;linkType&quot;: &quot;curve&quot;,
&quot;linkWidth&quot;: 2,
&quot;linkColor&quot;: “topk”
},
&quot;x&quot;: {
&quot;key&quot;: &quot;nq&quot;,
&quot;scaleType&quot;: &quot;ordinal&quot;,
&quot;tickType&quot;: &quot;bottom&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;nq&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 8,
&quot;zoom&quot;: false
},
&quot;y&quot;: {
&quot;key&quot;: &quot;vps&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;left&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;VPS&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 6,
&quot;zoom&quot;: true,
&quot;fromZero&quot;: true
},
&quot;groupBy&quot;: {
&quot;isGroupBy&quot;: true,
&quot;key&quot;: &quot;topk&quot;,
&quot;sameXScale&quot;: true,
&quot;sameYScale&quot;: true,
&quot;legendHeight&quot;: 30,
&quot;legendIconWidth&quot;: 40,
&quot;legendFontSize&quot;: 12,
&quot;legendLabel&quot;: &quot;(topk) =&gt;<code translate="no">topk=${topk}</code>&quot;
}
}
</template></p>
</div>
<p style="font-size: 12px;color: #4c5a67; text-align: center">VPS of search on fifty million vectors with four query nodes</p>
<div class="zchart-container" id="nq_RT_50m_8qn_vps">
<p><template id="chart-type">
“scatter_plot”
</template></p>
<p><template id="data">
[
{
&quot;RT&quot;: 0.0225,
&quot;nq&quot;: 1,
&quot;topk&quot;: 1,
&quot;vps&quot;: 44.44444
},
{
&quot;RT&quot;: 0.0219,
&quot;nq&quot;: 1,
&quot;topk&quot;: 200,
&quot;vps&quot;: 45.6621
},
{
&quot;RT&quot;: 0.0232,
&quot;nq&quot;: 1,
&quot;topk&quot;: 500,
&quot;vps&quot;: 43.10345
},
{
&quot;RT&quot;: 0.0257,
&quot;nq&quot;: 1,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 38.91051
},
{
&quot;RT&quot;: 0.0272,
&quot;nq&quot;: 10,
&quot;topk&quot;: 1,
&quot;vps&quot;: 367.6471
},
{
&quot;RT&quot;: 0.0309,
&quot;nq&quot;: 10,
&quot;topk&quot;: 200,
&quot;vps&quot;: 323.6246
},
{
&quot;RT&quot;: 0.0342,
&quot;nq&quot;: 10,
&quot;topk&quot;: 500,
&quot;vps&quot;: 292.3977
},
{
&quot;RT&quot;: 0.0426,
&quot;nq&quot;: 10,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 234.7418
},
{
&quot;RT&quot;: 0.1853,
&quot;nq&quot;: 100,
&quot;topk&quot;: 1,
&quot;vps&quot;: 539.6654
},
{
&quot;RT&quot;: 0.184,
&quot;nq&quot;: 100,
&quot;topk&quot;: 200,
&quot;vps&quot;: 543.4783
},
{
&quot;RT&quot;: 0.201,
&quot;nq&quot;: 100,
&quot;topk&quot;: 500,
&quot;vps&quot;: 497.5124
},
{
&quot;RT&quot;: 0.2595,
&quot;nq&quot;: 100,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 385.3565
},
{
&quot;RT&quot;: 0.6968,
&quot;nq&quot;: 500,
&quot;topk&quot;: 1,
&quot;vps&quot;: 717.566
},
{
&quot;RT&quot;: 0.7929,
&quot;nq&quot;: 500,
&quot;topk&quot;: 200,
&quot;vps&quot;: 630.5965
},
{
&quot;RT&quot;: 0.9219,
&quot;nq&quot;: 500,
&quot;topk&quot;: 500,
&quot;vps&quot;: 542.3582
},
{
&quot;RT&quot;: 1.1462,
&quot;nq&quot;: 500,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 436.224
},
{
&quot;RT&quot;: 1.3024,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 767.8133
},
{
&quot;RT&quot;: 1.5647,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 639.1001
},
{
&quot;RT&quot;: 1.8711,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 534.445
},
{
&quot;RT&quot;: 2.2359,
&quot;nq&quot;: 1000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 447.2472
},
{
&quot;RT&quot;: 1.5505,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 1,
&quot;vps&quot;: 773.9439
},
{
&quot;RT&quot;: 1.9031,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 200,
&quot;vps&quot;: 630.5502
},
{
&quot;RT&quot;: 2.187,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 500,
&quot;vps&quot;: 548.6968
},
{
&quot;RT&quot;: 2.6631,
&quot;nq&quot;: 1200,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 450.6027
},
{
&quot;RT&quot;: 2.7079,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 738.5797
},
{
&quot;RT&quot;: 3.2815,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 609.4774
},
{
&quot;RT&quot;: 3.6797,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 543.5226
},
{
&quot;RT&quot;: 4.4285,
&quot;nq&quot;: 2000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 451.6202
},
{
&quot;RT&quot;: 6.7683,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 738.7379
},
{
&quot;RT&quot;: 7.8383,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 637.8934
},
{
&quot;RT&quot;: 8.7616,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 570.672
},
{
&quot;RT&quot;: 10.972,
&quot;nq&quot;: 5000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 455.7054
},
{
&quot;RT&quot;: 14.1158,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 1,
&quot;vps&quot;: 708.426
},
{
&quot;RT&quot;: 15.6977,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 200,
&quot;vps&quot;: 637.036
},
{
&quot;RT&quot;: 17.4658,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 500,
&quot;vps&quot;: 572.5475
},
{
&quot;RT&quot;: 21.9538,
&quot;nq&quot;: 10000,
&quot;topk&quot;: 1000,
&quot;vps&quot;: 455.502
}
]
</template></p>
<p><template id="config">
{
&quot;width&quot;: 1000,
&quot;height&quot;: 400,
&quot;border&quot;: &quot;1px solid #999&quot;,
&quot;padding&quot;: [
60,
140,
60,
90
],
&quot;dataProcessing&quot;: {
&quot;needFixed&quot;: true,
&quot;fixedKey&quot;: &quot;vps&quot;,
&quot;fixedNum&quot;: 2
},
&quot;tooltip&quot;: {
&quot;hasTooltip&quot;: true,
&quot;content&quot;: [
&quot;vps&quot;,
&quot;nq&quot;,
“topk”
],
&quot;fontSize&quot;: 16,
&quot;fontWeight&quot;: 500,
&quot;fontColor&quot;: “#666”
},
&quot;title&quot;: {
&quot;text&quot;: &quot;nq &amp; VPS - 50m - 8queryNodes&quot;,
&quot;fontSize&quot;: 24,
&quot;fontWeight&quot;: 600,
&quot;fontColor&quot;: “#222”
},
&quot;circle&quot;: {
&quot;r&quot;: 3,
&quot;strokeColor&quot;: &quot;#fff&quot;,
&quot;strokeWidth&quot;: 1,
&quot;isCircleColorMapping&quot;: true,
&quot;circleColor&quot;: &quot;topk&quot;,
&quot;withLabels&quot;: true,
&quot;label&quot;: &quot;(item) =&gt; <code translate="no">${item.vps}</code>&quot;,
&quot;labelFontSize&quot;: 10,
&quot;withLinks&quot;: true,
&quot;isLinkColorMapping&quot;: true,
&quot;linkType&quot;: &quot;curve&quot;,
&quot;linkWidth&quot;: 2,
&quot;linkColor&quot;: “topk”
},
&quot;x&quot;: {
&quot;key&quot;: &quot;nq&quot;,
&quot;scaleType&quot;: &quot;ordinal&quot;,
&quot;tickType&quot;: &quot;bottom&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;nq&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 8,
&quot;zoom&quot;: false
},
&quot;y&quot;: {
&quot;key&quot;: &quot;vps&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;left&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;VPS&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 6,
&quot;zoom&quot;: true,
&quot;fromZero&quot;: true
},
&quot;groupBy&quot;: {
&quot;isGroupBy&quot;: true,
&quot;key&quot;: &quot;topk&quot;,
&quot;sameXScale&quot;: true,
&quot;sameYScale&quot;: true,
&quot;legendHeight&quot;: 30,
&quot;legendIconWidth&quot;: 40,
&quot;legendFontSize&quot;: 12,
&quot;legendLabel&quot;: &quot;(topk) =&gt;<code translate="no">topk=${topk}</code>&quot;
}
}
</template></p>
</div>
<p style="font-size: 12px;color: #4c5a67; text-align: center">VPS of search on fifty million vectors with eight query nodes</p>
<p><strong>Conclusion</strong></p>
<ul>
<li>With the same data set and topk, VPS gradually increases with the increase of nq when nq is less than 1000; the VPS curve flattens when nq is greater than 1000.</li>
<li>With the same dataset and search parameters, the more query nodes in the cluster, the higher the VPS of the search.</li>
<li>The smaller the data set, the higher the VPS of the search.</li>
</ul>
<p><strong>Suggestion</strong></p>
<ul>
<li>It is recommended to set the nq of each search no larger than 1000.</li>
<li>Adding query nodes to the cluster will increase the VPS of the search.</li>
</ul>
<h4 id="RT--QPS" class="common-anchor-header">RT &amp; QPS</h4><p>This test observes the correlation between QPS and RT of concurrent searches on Milvus standalone and cluster under the same data set.</p>
<p><details>
<summary><b>Method</b></summary>
<ol>
<li>Create a collection</li>
<li>Insert 1,000,000 entries of vectors (SIFT-128-dimension)</li>
<li>Build IVF_FLAT indexes with the same parameters</li>
<li>Perform concurrent searches on the collection with the same parameters</li>
</ol>
</details></p>
<p><details>
<summary><b>Server configurations (cluster)</b></summary></p>
<pre><code translate="no" class="language-yaml">dataNode:
    replicas: 1
    resources:
        limits:
            memory: 10Gi
            cpu: 2.0
indexNode:
    replicas: 1
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
queryNode:
    replicas: 1
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><details>
<summary><b>Server configurations (standalone)</b></summary></p>
<pre><code translate="no" class="language-yaml">standalone:
    resources:
        limits:
            memory: 64Gi
            cpu: 16.0
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><details>
<summary><b>Search details</b></summary>
<table class="index-details">
<thead>
<tr>
<th>Vector number</th>
<th>Index parameter</th>
<th>Search parameters</th>
</tr>
</thead>
<tbody>
<tr>
<td>1,000,000</td>
<td>nlist: 2048</td>
<td><ul><li>nprobe: 16</li><li>nq: 1</li><li>topk: 1</li></ul></td>
</tr>
</tbody>
</table>
</details></p>
<div class="zchart-container" id="RT_QPS_1m">
<p><template id="chart-type">
“scatter_plot”
</template></p>
<p><template id="data">
[
{
&quot;RT&quot;: 10,
&quot;QPS&quot;: 87.9,
&quot;deploy_mode&quot;: “cluster”
},
{
&quot;RT&quot;: 52,
&quot;QPS&quot;: 92.9,
&quot;deploy_mode&quot;: “cluster”
},
{
&quot;RT&quot;: 83,
&quot;QPS&quot;: 119,
&quot;deploy_mode&quot;: “cluster”
},
{
&quot;RT&quot;: 98,
&quot;QPS&quot;: 152,
&quot;deploy_mode&quot;: “cluster”
},
{
&quot;RT&quot;: 114,
&quot;QPS&quot;: 173,
&quot;deploy_mode&quot;: “cluster”
},
{
&quot;RT&quot;: 115,
&quot;QPS&quot;: 343,
&quot;deploy_mode&quot;: “cluster”
},
{
&quot;RT&quot;: 148,
&quot;QPS&quot;: 402,
&quot;deploy_mode&quot;: “cluster”
},
{
&quot;RT&quot;: 240,
&quot;QPS&quot;: 413.3,
&quot;deploy_mode&quot;: “cluster”
},
{
&quot;RT&quot;: 336,
&quot;QPS&quot;: 414.6,
&quot;deploy_mode&quot;: “cluster”
},
{
&quot;RT&quot;: 448,
&quot;QPS&quot;: 399.8,
&quot;deploy_mode&quot;: “cluster”
},
{
&quot;RT&quot;: 541,
&quot;QPS&quot;: 407.2,
&quot;deploy_mode&quot;: “cluster”
},
{
&quot;RT&quot;: 578,
&quot;QPS&quot;: 413,
&quot;deploy_mode&quot;: “cluster”
},
{
&quot;RT&quot;: 627,
&quot;QPS&quot;: 412.9,
&quot;deploy_mode&quot;: “cluster”
},
{
&quot;RT&quot;: 717,
&quot;QPS&quot;: 419.1,
&quot;deploy_mode&quot;: “cluster”
},
{
&quot;RT&quot;: 864,
&quot;QPS&quot;: 416.5,
&quot;deploy_mode&quot;: “cluster”
},
{
&quot;RT&quot;: 5,
&quot;QPS&quot;: 172,
&quot;deploy_mode&quot;: “standalone”
},
{
&quot;RT&quot;: 20,
&quot;QPS&quot;: 249,
&quot;deploy_mode&quot;: “standalone”
},
{
&quot;RT&quot;: 34,
&quot;QPS&quot;: 285,
&quot;deploy_mode&quot;: “standalone”
},
{
&quot;RT&quot;: 63,
&quot;QPS&quot;: 311,
&quot;deploy_mode&quot;: “standalone”
},
{
&quot;RT&quot;: 91,
&quot;QPS&quot;: 430,
&quot;deploy_mode&quot;: “standalone”
},
{
&quot;RT&quot;: 134,
&quot;QPS&quot;: 443,
&quot;deploy_mode&quot;: “standalone”
},
{
&quot;RT&quot;: 223,
&quot;QPS&quot;: 444.5,
&quot;deploy_mode&quot;: “standalone”
},
{
&quot;RT&quot;: 269,
&quot;QPS&quot;: 443.5,
&quot;deploy_mode&quot;: “standalone”
},
{
&quot;RT&quot;: 314,
&quot;QPS&quot;: 442.8,
&quot;deploy_mode&quot;: “standalone”
},
{
&quot;RT&quot;: 404,
&quot;QPS&quot;: 443.1,
&quot;deploy_mode&quot;: “standalone”
},
{
&quot;RT&quot;: 495,
&quot;QPS&quot;: 442.3,
&quot;deploy_mode&quot;: “standalone”
},
{
&quot;RT&quot;: 537,
&quot;QPS&quot;: 446.4,
&quot;deploy_mode&quot;: “standalone”
},
{
&quot;RT&quot;: 582,
&quot;QPS&quot;: 446.7,
&quot;deploy_mode&quot;: “standalone”
},
{
&quot;RT&quot;: 672,
&quot;QPS&quot;: 446,
&quot;deploy_mode&quot;: “standalone”
},
{
&quot;RT&quot;: 802,
&quot;QPS&quot;: 448.8,
&quot;deploy_mode&quot;: “standalone”
}
]
</template></p>
<p><template id="config">
{
&quot;width&quot;: 1000,
&quot;height&quot;: 400,
&quot;border&quot;: &quot;1px solid #999&quot;,
&quot;padding&quot;: [
60,
140,
50,
90
],
&quot;tooltip&quot;: {
&quot;hasTooltip&quot;: true,
&quot;content&quot;: [
&quot;deploy_mode&quot;,
&quot;RT&quot;,
“QPS”
],
&quot;fontSize&quot;: 16,
&quot;fontWeight&quot;: 500,
&quot;fontColor&quot;: “#666”
},
&quot;title&quot;: {
&quot;text&quot;: &quot;RT &amp; QPS - 1m&quot;,
&quot;fontSize&quot;: 24,
&quot;fontWeight&quot;: 600,
&quot;fontColor&quot;: “#222”
},
&quot;circle&quot;: {
&quot;r&quot;: 3,
&quot;strokeColor&quot;: &quot;#fff&quot;,
&quot;strokeWidth&quot;: 1,
&quot;isCircleColorMapping&quot;: true,
&quot;circleColor&quot;: &quot;deploy_mode&quot;,
&quot;withLabels&quot;: true,
&quot;label&quot;: &quot;(item) =&gt; <code translate="no">${item.QPS}</code>&quot;,
&quot;labelFontSize&quot;: 10,
&quot;withLinks&quot;: true,
&quot;isLinkColorMapping&quot;: true,
&quot;linkType&quot;: &quot;curve&quot;,
&quot;linkWidth&quot;: 2,
&quot;linkColor&quot;: “deploy_mode”
},
&quot;x&quot;: {
&quot;key&quot;: &quot;RT&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;bottom&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;RT(TP99) / ms&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 8,
&quot;zoom&quot;: true
},
&quot;y&quot;: {
&quot;key&quot;: &quot;QPS&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;left&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;QPS&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 6,
&quot;zoom&quot;: true,
&quot;fromZero&quot;: true
},
&quot;groupBy&quot;: {
&quot;isGroupBy&quot;: true,
&quot;key&quot;: &quot;deploy_mode&quot;,
&quot;sameXScale&quot;: true,
&quot;sameYScale&quot;: true,
&quot;legendHeight&quot;: 30,
&quot;legendIconWidth&quot;: 40,
&quot;legendFontSize&quot;: 12,
&quot;legendLabel&quot;: “deploy_mode =&gt; deploy_mode”
}
}
</template></p>
</div>
<p style="font-size: 12px;color: #4c5a67; text-align: center">Correlation between RT and QPS of concurrent searches on Milvus standalone and cluster</p>
<p><strong>Conclusion</strong></p>
<p>Search performance of Milvus Standalone is better than that of Milvus Cluster under the data set with one million entries vectors.</p>
<p><strong>Suggestion</strong></p>
<p>It is recommended to deploy Milvus standalone if the data set to search is small (less than one million entries of SIFT-128-dimension vectors) and there is no subsequent plan for scaling up the system.</p>
<h4 id="Query-node-number--QPS-or-RT" class="common-anchor-header">Query node number &amp; QPS or RT</h4><p>This test observes the QPS and RT with different number of query nodes under the same data set.</p>
<p><details>
<summary><b>Method</b></summary>
<ol>
<li>Create a collection</li>
<li>Insert the 50,000,000 entries of vectors (SIFT-128-dimension)</li>
<li>Build IVF_FLAT indexes with the same parameters</li>
<li>Perform concurrent searches on the collection with the same parameters</li>
</ol>
</details></p>
<p><details>
<summary><b>Server configurations (cluster)</b></summary></p>
<pre><code translate="no" class="language-yaml">dataNode:
    replicas: 1
    resources:
        limits:
            memory: 10Gi
            cpu: 2.0
indexNode:
    replicas: 1
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
queryNode:
    replicas: 2 / 4 / 6 / 8 / 10
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><details>
<summary><b>Search details</b></summary>
<table class="index-details">
<thead>
<tr>
<th>Vector number</th>
<th>Index parameter</th>
<th>Search parameters</th>
</tr>
</thead>
<tbody>
<tr>
<td>50,000,000</td>
<td>nlist: 4096</td>
<td><ul><li>nprobe: 16</li><li>nq: 1</li><li>topk: 1</li></ul></td>
</tr>
</tbody>
</table>
</details></p>
<div class="zchart-container" id="queryNodes_QPS_50m">
<p><template id="chart-type">
“scatter_plot”
</template></p>
<p><template id="data">
[
{
&quot;queryNodes&quot;: 2,
&quot;value&quot;: 22.5,
&quot;name&quot;: “QPS”
},
{
&quot;queryNodes&quot;: 4,
&quot;value&quot;: 47.1,
&quot;name&quot;: “QPS”
},
{
&quot;queryNodes&quot;: 6,
&quot;value&quot;: 74.1,
&quot;name&quot;: “QPS”
},
{
&quot;queryNodes&quot;: 8,
&quot;value&quot;: 91.3,
&quot;name&quot;: “QPS”
},
{
&quot;queryNodes&quot;: 10,
&quot;value&quot;: 92.3,
&quot;name&quot;: “QPS”
},
{
&quot;queryNodes&quot;: 2,
&quot;value&quot;: 886,
&quot;name&quot;: “RT”
},
{
&quot;queryNodes&quot;: 4,
&quot;value&quot;: 422,
&quot;name&quot;: “RT”
},
{
&quot;queryNodes&quot;: 6,
&quot;value&quot;: 268,
&quot;name&quot;: “RT”
},
{
&quot;queryNodes&quot;: 8,
&quot;value&quot;: 217,
&quot;name&quot;: “RT”
},
{
&quot;queryNodes&quot;: 10,
&quot;value&quot;: 216,
&quot;name&quot;: “RT”
}
]
</template></p>
<p><template id="config">
{
&quot;width&quot;: 1000,
&quot;height&quot;: 400,
&quot;border&quot;: &quot;1px solid #999&quot;,
&quot;padding&quot;: [
60,
140,
50,
90
],
&quot;tooltip&quot;: {
&quot;hasTooltip&quot;: true,
&quot;content&quot;: [
“queryNodes”
],
&quot;fontSize&quot;: 16,
&quot;fontWeight&quot;: 500,
&quot;fontColor&quot;: “#666”
},
&quot;title&quot;: {
&quot;text&quot;: &quot;queryNodes &amp; QPS / RT&quot;,
&quot;fontSize&quot;: 24,
&quot;fontWeight&quot;: 600,
&quot;fontColor&quot;: “#222”
},
&quot;circle&quot;: {
&quot;r&quot;: 3,
&quot;strokeColor&quot;: &quot;#fff&quot;,
&quot;strokeWidth&quot;: 1,
&quot;isCircleColorMapping&quot;: true,
&quot;circleColor&quot;: &quot;name&quot;,
&quot;withLabels&quot;: true,
&quot;label&quot;: &quot;(item) =&gt; <code translate="no">${item.name}=${item.value}</code>&quot;,
&quot;labelFontSize&quot;: 10,
&quot;withLinks&quot;: true,
&quot;isLinkColorMapping&quot;: true,
&quot;linkType&quot;: &quot;curve&quot;,
&quot;linkWidth&quot;: 2,
&quot;linkColor&quot;: “name”
},
&quot;x&quot;: {
&quot;key&quot;: &quot;queryNodes&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;bottom&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;queryNodes&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 8,
&quot;zoom&quot;: true
},
&quot;y&quot;: {
&quot;key&quot;: &quot;value&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;left&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 6,
&quot;zoom&quot;: true,
&quot;fromZero&quot;: true
},
&quot;groupBy&quot;: {
&quot;isGroupBy&quot;: true,
&quot;key&quot;: &quot;name&quot;,
&quot;sameXScale&quot;: true,
&quot;sameYScale&quot;: true,
&quot;legendHeight&quot;: 30,
&quot;legendIconWidth&quot;: 40,
&quot;legendFontSize&quot;: 10,
&quot;legendLabel&quot;: &quot;(name, i) =&gt; <code translate="no">${name}${i==1 ?</code>(TP99) / ms<code translate="no">:''}</code>&quot;
}
}
</template></p>
</div>
<p style="font-size: 12px;color: #4c5a67; text-align: center">Correlation between query node number and RT/QPS</p>
<p><strong>Conclusion</strong></p>
<p>Under the same data set, when the number of query node increases, the QPS increases and RT decreases.</p>
<p><strong>Suggestion</strong></p>
<p>For large data sets which are mostly stored in <a href="/docs/v2.0.x/glossary.md#Segment">sealed segments</a>, adding query nodes to the cluster will increase QPS.</p>
<h4 id="Recall--RT-group-by-ef-or-nprobe" class="common-anchor-header">Recall &amp; RT group by ef or nprobe</h4><p>This test observes the Recall and RT of search with different index types under different data sets.</p>
<p><details>
<summary><b>Method</b></summary>
<ol>
<li>Create a collection</li>
<li>Insert the specified number of vectors (SIFT-128-dimension)</li>
<li>Build IVF_FLAT or HNSW index with the specified parameters</li>
<li>Search vectors in the collection with the specified parameters</li>
</ol>
</details></p>
<p><details>
<summary><b>Server configurations (cluster)</b></summary></p>
<pre><code translate="no" class="language-yaml">dataNode:
    replicas: 1
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
indexNode:
    replicas: 1
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
queryNode:
    replicas: 1
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><details>
<summary><b>Search details</b></summary>
<table class="index-details">
<thead>
<tr>
<th>Index type and parameters</th>
<th>Vector type and number</th>
<th>Search parameters</th>
</tr>
</thead>
<tbody>
<tr>
<td>HNSW<ul><li>M: 16</li><li>efConstruction: 500</li></td>
<td>1,000,000 (128-dimension-Euclidean)</td>
<td><ul><li>ef: 16, 32, 64, 128, 256, 512</li><li>nq: 10000</li><li>topk: 10</li></ul></td>
</tr>
<tr>
<td>IVF_FLAT<br/>nlist: 1024</td>
<td>SIFT<br/>1,000,000 (128-dimension-Euclidean)</td>
<td><ul><li>nprobe: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512</li><li>nq: 10000</li><li>topk: 10</li></ul></td>
</tr>
<tr>
<td>IVF_SQ8<br/>nlist: 1024</td>
<td>SIFT<br/>1,000,000 (128-dimension-Euclidean)</td>
<td><ul><li>nprobe: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512</li><li>nq: 10000</li><li>topk: 10</li></ul></td>
</tr>
<tr>
<td>IVF_FLAT<br/>nlist: 1024</td>
<td>GloVe<br/> over 1,000,000 (200-dimension-Angular)</td>
<td><ul><li>nprobe: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512</li><li>nq: 10000</li><li>topk: 10</li></ul></td>
</tr>
</tbody>
</table>
</details></p>
<div class="zchart-container" id="Recall_RT_sift_hnsw">
<p><template id="chart-type">
“scatter_plot”
</template></p>
<p><template id="data">
[
{
&quot;Recall&quot;: 0.855,
&quot;ef&quot;: 16,
&quot;RT&quot;: 1.286607,
&quot;sift_hnsw&quot;: 1
},
{
&quot;Recall&quot;: 0.939,
&quot;ef&quot;: 32,
&quot;RT&quot;: 1.586854,
&quot;sift_hnsw&quot;: 1
},
{
&quot;Recall&quot;: 0.981,
&quot;ef&quot;: 64,
&quot;RT&quot;: 2.076077,
&quot;sift_hnsw&quot;: 1
},
{
&quot;Recall&quot;: 0.995,
&quot;ef&quot;: 128,
&quot;RT&quot;: 2.897177,
&quot;sift_hnsw&quot;: 1
},
{
&quot;Recall&quot;: 0.999,
&quot;ef&quot;: 256,
&quot;RT&quot;: 4.450883,
&quot;sift_hnsw&quot;: 1
},
{
&quot;Recall&quot;: 0.999,
&quot;ef&quot;: 512,
&quot;RT&quot;: 7.569634,
&quot;sift_hnsw&quot;: 1
}
]
</template></p>
<p><template id="config">
{
&quot;width&quot;: 1000,
&quot;height&quot;: 400,
&quot;border&quot;: &quot;1px solid #999&quot;,
&quot;padding&quot;: [
60,
140,
60,
60
],
&quot;dataProcessing&quot;: {
&quot;needFixed&quot;: true,
&quot;fixedKey&quot;: &quot;RT&quot;,
&quot;fixedNum&quot;: 2
},
&quot;tooltip&quot;: {
&quot;hasTooltip&quot;: true,
&quot;content&quot;: [
&quot;RT&quot;,
&quot;Recall&quot;,
“ef”
],
&quot;fontSize&quot;: 16,
&quot;fontWeight&quot;: 500,
&quot;fontColor&quot;: “#666”
},
&quot;title&quot;: {
&quot;text&quot;: &quot;Recall &amp; RT - sift - HNSW&quot;,
&quot;fontSize&quot;: 24,
&quot;fontWeight&quot;: 600,
&quot;fontColor&quot;: “#222”
},
&quot;circle&quot;: {
&quot;r&quot;: 3,
&quot;strokeColor&quot;: &quot;#fff&quot;,
&quot;strokeWidth&quot;: 1,
&quot;isCircleColorMapping&quot;: true,
&quot;circleColor&quot;: &quot;ef&quot;,
&quot;withLabels&quot;: true,
&quot;label&quot;: &quot;(item) =&gt; <code translate="no">ef=${item.ef}</code>&quot;,
&quot;labelFontSize&quot;: 12,
&quot;withLinks&quot;: true,
&quot;isLinkColorMapping&quot;: true,
&quot;linkType&quot;: &quot;curve&quot;,
&quot;linkWidth&quot;: 2,
&quot;linkColor&quot;: “ef”
},
&quot;x&quot;: {
&quot;key&quot;: &quot;Recall&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;bottom&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;Recall&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 8,
&quot;zoom&quot;: true
},
&quot;y&quot;: {
&quot;key&quot;: &quot;RT&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;left&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;RT / s&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 6,
&quot;zoom&quot;: true,
&quot;fromZero&quot;: true
},
&quot;groupBy&quot;: {
&quot;isGroupBy&quot;: false,
&quot;key&quot;: &quot;sift_hnsw&quot;,
&quot;sameXScale&quot;: true,
&quot;sameYScale&quot;: true
}
}
</template></p>
</div>
<p style="font-size: 12px;color: #4c5a67; text-align: center">Recall and RT of search with HNSW index on SIFT data set</p>
<div class="zchart-container" id="Recall_RT_sift_ivf_flat">
<p><template id="chart-type">
“scatter_plot”
</template></p>
<p><template id="data">
[
{
&quot;Recall&quot;: 0.376,
&quot;nprobe&quot;: 1,
&quot;RT&quot;: 1.446408,
&quot;ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.537,
&quot;nprobe&quot;: 2,
&quot;RT&quot;: 1.982649,
&quot;ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.7,
&quot;nprobe&quot;: 4,
&quot;RT&quot;: 2.730107,
&quot;ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.839,
&quot;nprobe&quot;: 8,
&quot;RT&quot;: 4.178972,
&quot;ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.931,
&quot;nprobe&quot;: 16,
&quot;RT&quot;: 6.941368,
&quot;ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.979,
&quot;nprobe&quot;: 32,
&quot;RT&quot;: 13.09921,
&quot;ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.996,
&quot;nprobe&quot;: 64,
&quot;RT&quot;: 24.58277,
&quot;ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.999,
&quot;nprobe&quot;: 128,
&quot;RT&quot;: 48.51923,
&quot;ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.999,
&quot;nprobe&quot;: 256,
&quot;RT&quot;: 92.54643,
&quot;ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.999,
&quot;nprobe&quot;: 512,
&quot;RT&quot;: 184.2342,
&quot;ivf_flat&quot;: 1
}
]
</template></p>
<p><template id="config">
{
&quot;width&quot;: 1000,
&quot;height&quot;: 400,
&quot;border&quot;: &quot;1px solid #999&quot;,
&quot;padding&quot;: [
60,
140,
60,
60
],
&quot;dataProcessing&quot;: {
&quot;needFixed&quot;: true,
&quot;fixedKey&quot;: &quot;RT&quot;,
&quot;fixedNum&quot;: 2
},
&quot;tooltip&quot;: {
&quot;hasTooltip&quot;: true,
&quot;content&quot;: [
&quot;RT&quot;,
&quot;Recall&quot;,
“nprobe”
],
&quot;fontSize&quot;: 16,
&quot;fontWeight&quot;: 500,
&quot;fontColor&quot;: “#666”
},
&quot;title&quot;: {
&quot;text&quot;: &quot;Recall &amp; RT - sift - ivf_flat&quot;,
&quot;fontSize&quot;: 24,
&quot;fontWeight&quot;: 600,
&quot;fontColor&quot;: “#222”
},
&quot;circle&quot;: {
&quot;r&quot;: 3,
&quot;strokeColor&quot;: &quot;#fff&quot;,
&quot;strokeWidth&quot;: 1,
&quot;isCircleColorMapping&quot;: true,
&quot;circleColor&quot;: &quot;nprobe&quot;,
&quot;withLabels&quot;: true,
&quot;label&quot;: &quot;(item) =&gt; <code translate="no">nprobe=${item.nprobe}</code>&quot;,
&quot;labelFontSize&quot;: 12,
&quot;withLinks&quot;: true,
&quot;isLinkColorMapping&quot;: true,
&quot;linkType&quot;: &quot;curve&quot;,
&quot;linkWidth&quot;: 2,
&quot;linkColor&quot;: “nprobe”
},
&quot;x&quot;: {
&quot;key&quot;: &quot;Recall&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;bottom&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;Recall&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 8,
&quot;zoom&quot;: true
},
&quot;y&quot;: {
&quot;key&quot;: &quot;RT&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;left&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;RT / s&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 6,
&quot;zoom&quot;: true,
&quot;fromZero&quot;: true
},
&quot;groupBy&quot;: {
&quot;isGroupBy&quot;: false,
&quot;key&quot;: &quot;ivf_flat&quot;,
&quot;sameXScale&quot;: true,
&quot;sameYScale&quot;: true
}
}
</template></p>
</div>
<p style="font-size: 12px;color: #4c5a67; text-align: center">Recall and RT of search with IVF_FLAT index on SIFT data set</p>
<div class="zchart-container" id="Recall_RT_sift_ivf_sq8">
<p><template id="chart-type">
“scatter_plot”
</template></p>
<p><template id="data">
[
{
&quot;Recall&quot;: 0.375,
&quot;nprobe&quot;: 1,
&quot;RT&quot;: 1.167151,
&quot;ivf_sq8&quot;: 1
},
{
&quot;Recall&quot;: 0.536,
&quot;nprobe&quot;: 2,
&quot;RT&quot;: 1.358035,
&quot;ivf_sq8&quot;: 1
},
{
&quot;Recall&quot;: 0.697,
&quot;nprobe&quot;: 4,
&quot;RT&quot;: 1.3874,
&quot;ivf_sq8&quot;: 1
},
{
&quot;Recall&quot;: 0.835,
&quot;nprobe&quot;: 8,
&quot;RT&quot;: 1.795691,
&quot;ivf_sq8&quot;: 1
},
{
&quot;Recall&quot;: 0.923,
&quot;nprobe&quot;: 16,
&quot;RT&quot;: 2.340407,
&quot;ivf_sq8&quot;: 1
},
{
&quot;Recall&quot;: 0.968,
&quot;nprobe&quot;: 32,
&quot;RT&quot;: 3.936784,
&quot;ivf_sq8&quot;: 1
},
{
&quot;Recall&quot;: 0.983,
&quot;nprobe&quot;: 64,
&quot;RT&quot;: 6.191661,
&quot;ivf_sq8&quot;: 1
},
{
&quot;Recall&quot;: 0.986,
&quot;nprobe&quot;: 128,
&quot;RT&quot;: 11.66764,
&quot;ivf_sq8&quot;: 1
},
{
&quot;Recall&quot;: 0.986,
&quot;nprobe&quot;: 256,
&quot;RT&quot;: 20.73767,
&quot;ivf_sq8&quot;: 1
},
{
&quot;Recall&quot;: 0.986,
&quot;nprobe&quot;: 512,
&quot;RT&quot;: 40.43717,
&quot;ivf_sq8&quot;: 1
}
]
</template></p>
<p><template id="config">
{
&quot;width&quot;: 1000,
&quot;height&quot;: 400,
&quot;border&quot;: &quot;1px solid #999&quot;,
&quot;padding&quot;: [
60,
140,
60,
60
],
&quot;dataProcessing&quot;: {
&quot;needFixed&quot;: true,
&quot;fixedKey&quot;: &quot;RT&quot;,
&quot;fixedNum&quot;: 2
},
&quot;tooltip&quot;: {
&quot;hasTooltip&quot;: true,
&quot;content&quot;: [
&quot;RT&quot;,
&quot;Recall&quot;,
“nprobe”
],
&quot;fontSize&quot;: 16,
&quot;fontWeight&quot;: 500,
&quot;fontColor&quot;: “#666”
},
&quot;title&quot;: {
&quot;text&quot;: &quot;Recall &amp; RT - sift - ivf_sq8&quot;,
&quot;fontSize&quot;: 24,
&quot;fontWeight&quot;: 600,
&quot;fontColor&quot;: “#222”
},
&quot;circle&quot;: {
&quot;r&quot;: 3,
&quot;strokeColor&quot;: &quot;#fff&quot;,
&quot;strokeWidth&quot;: 1,
&quot;isCircleColorMapping&quot;: true,
&quot;circleColor&quot;: &quot;nprobe&quot;,
&quot;withLabels&quot;: true,
&quot;label&quot;: &quot;(item) =&gt; <code translate="no">nprobe=${item.nprobe}</code>&quot;,
&quot;labelFontSize&quot;: 12,
&quot;withLinks&quot;: true,
&quot;isLinkColorMapping&quot;: true,
&quot;linkType&quot;: &quot;curve&quot;,
&quot;linkWidth&quot;: 2,
&quot;linkColor&quot;: “nprobe”
},
&quot;x&quot;: {
&quot;key&quot;: &quot;Recall&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;bottom&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;Recall&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 8,
&quot;zoom&quot;: true
},
&quot;y&quot;: {
&quot;key&quot;: &quot;RT&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;left&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;RT / s&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 6,
&quot;zoom&quot;: true,
&quot;fromZero&quot;: true
},
&quot;groupBy&quot;: {
&quot;isGroupBy&quot;: false,
&quot;key&quot;: &quot;ivf_sq8&quot;,
&quot;sameXScale&quot;: true,
&quot;sameYScale&quot;: true
}
}
</template></p>
</div>
<p style="font-size: 12px;color: #4c5a67; text-align: center">Recall and RT of search with IVF_SQ8 index on SIFT data set</p>
<div class="zchart-container" id="Recall_RT_glove_ivf_flat">
<p><template id="chart-type">
“scatter_plot”
</template></p>
<p><template id="data">
[
{
&quot;Recall&quot;: 0.379,
&quot;nprobe&quot;: 1,
&quot;RT&quot;: 2.419348001,
&quot;glove_ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.508,
&quot;nprobe&quot;: 2,
&quot;RT&quot;: 3.27226162,
&quot;glove_ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.621,
&quot;nprobe&quot;: 4,
&quot;RT&quot;: 4.470273733,
&quot;glove_ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.715,
&quot;nprobe&quot;: 8,
&quot;RT&quot;: 7.898554564,
&quot;glove_ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.792,
&quot;nprobe&quot;: 16,
&quot;RT&quot;: 12.98356462,
&quot;glove_ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.856,
&quot;nprobe&quot;: 32,
&quot;RT&quot;: 23.78910685,
&quot;glove_ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.908,
&quot;nprobe&quot;: 64,
&quot;RT&quot;: 45.80408335,
&quot;glove_ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.951,
&quot;nprobe&quot;: 128,
&quot;RT&quot;: 87.89239192,
&quot;glove_ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.979,
&quot;nprobe&quot;: 256,
&quot;RT&quot;: 170.6512713,
&quot;glove_ivf_flat&quot;: 1
},
{
&quot;Recall&quot;: 0.995,
&quot;nprobe&quot;: 512,
&quot;RT&quot;: 347.946938,
&quot;glove_ivf_flat&quot;: 1
}
]
</template></p>
<p><template id="config">
{
&quot;width&quot;: 1000,
&quot;height&quot;: 400,
&quot;border&quot;: &quot;1px solid #999&quot;,
&quot;padding&quot;: [
60,
140,
60,
60
],
&quot;dataProcessing&quot;: {
&quot;needFixed&quot;: true,
&quot;fixedKey&quot;: &quot;RT&quot;,
&quot;fixedNum&quot;: 2
},
&quot;tooltip&quot;: {
&quot;hasTooltip&quot;: true,
&quot;content&quot;: [
&quot;RT&quot;,
&quot;Recall&quot;,
“nprobe”
],
&quot;fontSize&quot;: 16,
&quot;fontWeight&quot;: 500,
&quot;fontColor&quot;: “#666”
},
&quot;title&quot;: {
&quot;text&quot;: &quot;Recall &amp; RT - glove - ivf_flat&quot;,
&quot;fontSize&quot;: 24,
&quot;fontWeight&quot;: 600,
&quot;fontColor&quot;: “#222”
},
&quot;circle&quot;: {
&quot;r&quot;: 3,
&quot;strokeColor&quot;: &quot;#fff&quot;,
&quot;strokeWidth&quot;: 1,
&quot;isCircleColorMapping&quot;: true,
&quot;circleColor&quot;: &quot;nprobe&quot;,
&quot;withLabels&quot;: true,
&quot;label&quot;: &quot;(item) =&gt; <code translate="no">nprobe=${item.nprobe}</code>&quot;,
&quot;labelFontSize&quot;: 12,
&quot;withLinks&quot;: true,
&quot;isLinkColorMapping&quot;: true,
&quot;linkType&quot;: &quot;curve&quot;,
&quot;linkWidth&quot;: 2,
&quot;linkColor&quot;: “nprobe”
},
&quot;x&quot;: {
&quot;key&quot;: &quot;Recall&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;bottom&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;Recall&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 8,
&quot;zoom&quot;: true
},
&quot;y&quot;: {
&quot;key&quot;: &quot;RT&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;left&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;RT / s&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 6,
&quot;zoom&quot;: true,
&quot;fromZero&quot;: true
},
&quot;groupBy&quot;: {
&quot;isGroupBy&quot;: false,
&quot;key&quot;: &quot;glove_ivf_flat&quot;,
&quot;sameXScale&quot;: true,
&quot;sameYScale&quot;: true
}
}
</template></p>
</div>
<p style="font-size: 12px;color: #4c5a67; text-align: center">Recall and RT of search with IVF_FLAT index on GloVe data set</p>
<p><strong>Conclusion</strong></p>
<p>With the same data set and index type, as the nprobe/ef increases, the Recall gradually increases, and the RT also increases gradually.</p>
<p><strong>Suggestion</strong></p>
<ul>
<li>It is recommended to set the ef of each search no larger than 64 to achieve higher recall and lower RT when searching with HNSW index on SIFT data set.</li>
<li>It is recommended to set the nprobe of each search no larger than 32 to achieve higher recall and lower RT when searching with IVF_FLAT or IVF_SQ8 index on SIFT data set.</li>
<li>It is recommended to set the nprobe of each search no larger than 256 to achieve higher recall and lower RT when searching with IVF_FLAT index on GloVe data set.</li>
</ul>
<h4 id="Recall--RT-group-by-index-type" class="common-anchor-header">Recall &amp; RT group by index type</h4><p>This test observes the Recall and RT of search with different index types on the same data set.</p>
<div class="zchart-container" id="Recall_RT_sift">
<p><template id="chart-type">
“scatter_plot”
</template></p>
<p><template id="data">
[
{
&quot;Recall&quot;: 0.855,
&quot;value&quot;: 16,
&quot;RT&quot;: 1.286607,
&quot;index_type&quot;: &quot;hnsw&quot;,
&quot;valueType&quot;: “ef”
},
{
&quot;Recall&quot;: 0.939,
&quot;value&quot;: 32,
&quot;RT&quot;: 1.586854,
&quot;index_type&quot;: &quot;hnsw&quot;,
&quot;valueType&quot;: “ef”
},
{
&quot;Recall&quot;: 0.981,
&quot;value&quot;: 64,
&quot;RT&quot;: 2.076077,
&quot;index_type&quot;: &quot;hnsw&quot;,
&quot;valueType&quot;: “ef”
},
{
&quot;Recall&quot;: 0.995,
&quot;value&quot;: 128,
&quot;RT&quot;: 2.897177,
&quot;index_type&quot;: &quot;hnsw&quot;,
&quot;valueType&quot;: “ef”
},
{
&quot;Recall&quot;: 0.999,
&quot;value&quot;: 256,
&quot;RT&quot;: 4.450883,
&quot;index_type&quot;: &quot;hnsw&quot;,
&quot;valueType&quot;: “ef”
},
{
&quot;Recall&quot;: 0.999,
&quot;value&quot;: 512,
&quot;RT&quot;: 7.569634,
&quot;index_type&quot;: &quot;hnsw&quot;,
&quot;valueType&quot;: “ef”
},
{
&quot;Recall&quot;: 0.376,
&quot;value&quot;: 1,
&quot;RT&quot;: 1.446408,
&quot;index_type&quot;: &quot;ivf_flat&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.537,
&quot;value&quot;: 2,
&quot;RT&quot;: 1.982649,
&quot;index_type&quot;: &quot;ivf_flat&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.7,
&quot;value&quot;: 4,
&quot;RT&quot;: 2.730107,
&quot;index_type&quot;: &quot;ivf_flat&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.839,
&quot;value&quot;: 8,
&quot;RT&quot;: 4.178972,
&quot;index_type&quot;: &quot;ivf_flat&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.931,
&quot;value&quot;: 16,
&quot;RT&quot;: 6.941368,
&quot;index_type&quot;: &quot;ivf_flat&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.979,
&quot;value&quot;: 32,
&quot;RT&quot;: 13.09921,
&quot;index_type&quot;: &quot;ivf_flat&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.996,
&quot;value&quot;: 64,
&quot;RT&quot;: 24.58277,
&quot;index_type&quot;: &quot;ivf_flat&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.999,
&quot;value&quot;: 128,
&quot;RT&quot;: 48.51923,
&quot;index_type&quot;: &quot;ivf_flat&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.999,
&quot;value&quot;: 256,
&quot;RT&quot;: 92.54643,
&quot;index_type&quot;: &quot;ivf_flat&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.999,
&quot;value&quot;: 512,
&quot;RT&quot;: 184.2342,
&quot;index_type&quot;: &quot;ivf_flat&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.375,
&quot;value&quot;: 1,
&quot;RT&quot;: 1.167151,
&quot;index_type&quot;: &quot;ivf_sq8&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.536,
&quot;value&quot;: 2,
&quot;RT&quot;: 1.358035,
&quot;index_type&quot;: &quot;ivf_sq8&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.697,
&quot;value&quot;: 4,
&quot;RT&quot;: 1.3874,
&quot;index_type&quot;: &quot;ivf_sq8&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.835,
&quot;value&quot;: 8,
&quot;RT&quot;: 1.795691,
&quot;index_type&quot;: &quot;ivf_sq8&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.923,
&quot;value&quot;: 16,
&quot;RT&quot;: 2.340407,
&quot;index_type&quot;: &quot;ivf_sq8&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.968,
&quot;value&quot;: 32,
&quot;RT&quot;: 3.936784,
&quot;index_type&quot;: &quot;ivf_sq8&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.983,
&quot;value&quot;: 64,
&quot;RT&quot;: 6.191661,
&quot;index_type&quot;: &quot;ivf_sq8&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.986,
&quot;value&quot;: 128,
&quot;RT&quot;: 11.66764,
&quot;index_type&quot;: &quot;ivf_sq8&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.986,
&quot;value&quot;: 256,
&quot;RT&quot;: 20.73767,
&quot;index_type&quot;: &quot;ivf_sq8&quot;,
&quot;valueType&quot;: “nprobe”
},
{
&quot;Recall&quot;: 0.986,
&quot;value&quot;: 512,
&quot;RT&quot;: 40.43717,
&quot;index_type&quot;: &quot;ivf_sq8&quot;,
&quot;valueType&quot;: “nprobe”
}
]
</template></p>
<p><template id="config">
{
&quot;width&quot;: 1000,
&quot;height&quot;: 400,
&quot;border&quot;: &quot;1px solid #999&quot;,
&quot;padding&quot;: [
60,
140,
50,
90
],
&quot;tooltip&quot;: {
&quot;hasTooltip&quot;: true,
&quot;content&quot;: [
&quot;Recall&quot;,
&quot;RT&quot;,
“index_type”
],
&quot;fontSize&quot;: 16,
&quot;fontWeight&quot;: 500,
&quot;fontColor&quot;: “#666”
},
&quot;dataProcessing&quot;: {
&quot;needSort&quot;: false,
&quot;sort&quot;: &quot;Recall&quot;,
&quot;sortReverse&quot;: false,
&quot;needFixed&quot;: false,
&quot;fixedKey&quot;: &quot;vps&quot;,
&quot;fixedNum&quot;: 2
},
&quot;title&quot;: {
&quot;text&quot;: &quot;Recall &amp; RT - sift&quot;,
&quot;fontSize&quot;: 24,
&quot;fontWeight&quot;: 600,
&quot;fontColor&quot;: “#222”
},
&quot;circle&quot;: {
&quot;r&quot;: 3,
&quot;strokeColor&quot;: &quot;#fff&quot;,
&quot;strokeWidth&quot;: 1,
&quot;isCircleColorMapping&quot;: true,
&quot;circleColor&quot;: &quot;index_type&quot;,
&quot;withLabels&quot;: true,
&quot;label&quot;: &quot;(item) =&gt; <code translate="no">${item.valueType}=${item.value}</code>&quot;,
&quot;labelFontSize&quot;: 10,
&quot;withLinks&quot;: true,
&quot;isLinkColorMapping&quot;: true,
&quot;linkType&quot;: &quot;curve&quot;,
&quot;linkWidth&quot;: 2,
&quot;linkColor&quot;: “index_type”
},
&quot;x&quot;: {
&quot;key&quot;: &quot;Recall&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;bottom&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;Recall&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 8,
&quot;zoom&quot;: true
},
&quot;y&quot;: {
&quot;key&quot;: &quot;RT&quot;,
&quot;scaleType&quot;: &quot;linear&quot;,
&quot;tickType&quot;: &quot;left&quot;,
&quot;tickFontSize&quot;: 14,
&quot;tickColor&quot;: &quot;#666&quot;,
&quot;label&quot;: &quot;RT / s&quot;,
&quot;labelFontSize&quot;: 16,
&quot;labelWeight&quot;: 600,
&quot;labelColor&quot;: &quot;#444&quot;,
&quot;inset&quot;: 6,
&quot;zoom&quot;: true,
&quot;fromZero&quot;: true
},
&quot;groupBy&quot;: {
&quot;isGroupBy&quot;: true,
&quot;key&quot;: &quot;index_type&quot;,
&quot;sameXScale&quot;: true,
&quot;sameYScale&quot;: true,
&quot;legendHeight&quot;: 30,
&quot;legendIconWidth&quot;: 40,
&quot;legendFontSize&quot;: 12,
&quot;legendLabel&quot;: “index_type =&gt; index_type”
}
}
</template></p>
</div>
<p style="font-size: 12px;color: #4c5a67; text-align: center">Recall and RT of search with different indexes on SIFT data set</p>
<p><strong>Conclusion</strong></p>
<p>With the same data set and recall, the RT of search with HNSW index is lower, and that with IVF_FLAT index is higher.</p>
<p><strong>Suggestion</strong></p>
<p>It is recommended to search with HNSW index to have higher Recall and lower RT under the test condition specified above.</p>
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
<li>The larger the amount of data inserted at one time, the greater the response time.</li>
<li>Increasing the number of index nodes can optimize index building performance.</li>
<li>It is recommended to deploy Milvus standalone to search on small data set with less than 1,000,000 entries of vectors.</li>
<li>The more vectors to search, the longer the search time.</li>
<li>Increasing the number of query nodes can optimize search performance.</li>
<li>The higher the recall of the search, the higher the response time of the search.</li>
</ul>
