---
id: benchmark.md
summary: 了解 Milvus 的基准结果。
title: Milvus 2.2 基准测试报告
---
<h1 id="Milvus-22-Benchmark-Test-Report" class="common-anchor-header">Milvus 2.2 基准测试报告<button data-href="#Milvus-22-Benchmark-Test-Report" class="anchor-icon" translate="no">
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
    </button></h1><p>本报告展示了 Milvus 2.2.0 的主要测试结果，旨在介绍 Milvus 2.2.0 的搜索性能，特别是扩展和缩小的能力。</p>
<div class="alert note">
  <div style="display: flex;">
      <div style="flex:0.3;">
        <img translate="no" src="https://zilliz.com/images/whitepaper/performance.png" alt="Milvus Performance Evaluation 2023" />
      </div>
  </div>
  <div style="flex:1;padding: 10px;">
    <p>我们最近对 Milvus 2.2.3 进行了一次基准测试，主要结果如下：</p>
    <ul>
      <li>搜索延迟降低 2.5 倍</li>
      <li>QPS 提高 4.5 倍</li>
      <li>十亿规模的相似性搜索，性能几乎没有下降</li>
      <li>使用多个副本时的线性可扩展性</li>
    </ul>
    <p>有关详细信息，请参阅<a href="https://zilliz.com/resources/whitepaper/milvus-performance-benchmark">本白皮书</a>和<a href="https://github.com/zilliztech/VectorDBBench">相关基准测试代码</a>。 </p>
  </div>
</div>
<h2 id="Summary" class="common-anchor-header">总结<button data-href="#Summary" class="anchor-icon" translate="no">
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
<li>与 Milvus 2.1 相比，Milvus 2.2.0 的 QPS 在集群模式下提高了 48%，在 Standalone 模式下提高了 75%。</li>
<li>Milvus 2.2.0 的扩展和缩小能力令人印象深刻：<ul>
<li>当 CPU 内核从 8 个扩展到 32 个时，QPS 呈线性增长。</li>
<li>将 Querynode 复制从 1 个扩展到 8 个时，QPS 呈线性增长。</li>
</ul></li>
</ul>
<h2 id="Terminology" class="common-anchor-header">术语<button data-href="#Terminology" class="anchor-icon" translate="no">
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
<summary>点击查看测试中使用的术语详情</summary>
<table class="terminology">
<thead>
<tr>
<th>术语</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>nq</td>
<td>一次搜索请求中要搜索的向量数量</td>
</tr>
<tr>
<td>topk</td>
<td>搜索请求中每个向量（以 nq 为单位）的最近向量数</td>
</tr>
<tr>
<td>ef</td>
<td><a href="https://milvus.io/docs/v2.2.x/index.md">HNSW 索引</a>特有的搜索参数</td>
</tr>
<tr>
<td>RT</td>
<td>从发送请求到接收响应的响应时间</td>
</tr>
<tr>
<td>QPS</td>
<td>每秒成功处理的搜索请求数</td>
</tr>
</tbody>
</table>
</details></p>
<h2 id="Test-environment" class="common-anchor-header">测试环境<button data-href="#Test-environment" class="anchor-icon" translate="no">
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
    </button></h2><p>所有测试均在以下环境下进行。</p>
<h3 id="Hardware-environment" class="common-anchor-header">硬件环境</h3><table>
<thead>
<tr><th>硬件环境</th><th>规格</th></tr>
</thead>
<tbody>
<tr><td>中央处理器</td><td>英特尔® 至强® Gold 6226R CPU @ 2.90GHz</td></tr>
<tr><td>内存</td><td>16*/32 GB RDIMM，3200 MT/s</td></tr>
<tr><td>固态硬盘</td><td>SATA 6 Gbps</td></tr>
</tbody>
</table>
<h3 id="Software-environment" class="common-anchor-header">软件环境</h3><table>
<thead>
<tr><th>软件环境</th><th>版本</th></tr>
</thead>
<tbody>
<tr><td>Milvus</td><td>v2.2.0</td></tr>
<tr><td>Milvus GO SDK</td><td>v2.2.0</td></tr>
</tbody>
</table>
<h3 id="Deployment-scheme" class="common-anchor-header">部署方案</h3><ul>
<li>Milvus 实例（单机或集群）通过<a href="https://milvus.io/docs/install_standalone-helm.md">Helm</a>部署在基于物理机或虚拟机的 Kubernetes 集群上。</li>
<li>不同的测试仅在 CPU 内核数量、内存大小和副本（工作节点）数量上有所不同，这仅适用于 Milvus 集群。</li>
<li>未指定的配置与<a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml">默认配置</a>相同。</li>
<li>Milvus 依赖项（MinIO、Pulsar 和 Etcd）将数据存储在每个节点的本地固态硬盘上。</li>
<li>搜索请求通过<a href="https://github.com/milvus-io/milvus-sdk-go/tree/master/tests">Milvus GO SDK</a> 发送到 Milvus 实例。</li>
</ul>
<h3 id="Data-sets" class="common-anchor-header">数据集</h3><p>测试使用<a href="https://github.com/erikbern/ann-benchmarks/#data-sets">ANN-Benchmarks</a> 的开源数据集 SIFT（128 维）。</p>
<h2 id="Test-pipeline" class="common-anchor-header">测试流程<button data-href="#Test-pipeline" class="anchor-icon" translate="no">
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
<li>使用 Helm 启动 Milvus 实例，并按照每个测试中列出的各自服务器配置。</li>
<li>通过 Milvus GO SDK 连接到 Milvus 实例并获取相应的测试结果。</li>
<li>创建一个 Collection。</li>
<li>插入 100 万个 SIFT 向量。建立 HNSW 索引并配置索引参数，将<code translate="no">M</code> 设置为<code translate="no">8</code> ，将<code translate="no">efConstruction</code> 设置为<code translate="no">200</code> 。</li>
<li>加载 Collections。</li>
<li>使用不同的并发数进行搜索，搜索参数为<code translate="no">nq=1, topk=1, ef=64</code> ，每个并发数的持续时间至少为 1 小时。</li>
</ol>
<h2 id="Test-results" class="common-anchor-header">测试结果<button data-href="#Test-results" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-220-vs-Milvus-210" class="common-anchor-header">Milvus 2.2.0 对 Milvus 2.1.0</h3><h4 id="Cluster" class="common-anchor-header">群集</h4><p><details>
<summary><b>服务器配置（群集）</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 8Gi requests: cpu: &quot;12.0&quot; memory: 8Gi</code></details></p>
<p><strong>搜索性能</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>故障/秒</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>6904</td><td>59</td><td>28</td><td>0</td></tr>
<tr><td>2.2.0</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cluster_search_performance_210_vs_220.png" alt="Cluster search performance" class="doc-image" id="cluster-search-performance" />
   </span> <span class="img-wrapper"> <span>群集搜索性能</span> </span></p>
<h4 id="Standalone" class="common-anchor-header">单机</h4><p><details>
<summary><b>服务器配置（单机）</b></summary><code translate="no">yaml standalone: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 16Gi requests: cpu: &quot;12.0&quot; memory: 16Gi</code></details></p>
<p><strong>搜索性能</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>故障/秒</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>4287</td><td>104</td><td>76</td><td>0</td></tr>
<tr><td>2.2.0</td><td>7522</td><td>127</td><td>79</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/standalone_search_performance_210_vs_220.png" alt="Standalone search performance" class="doc-image" id="standalone-search-performance" />
   </span> <span class="img-wrapper"> <span>独立搜索性能</span> </span></p>
<h3 id="Milvus-220-Scale-up" class="common-anchor-header">Milvus 2.2.0 扩展能力</h3><p>扩展一个 Querynode 中的 CPU 内核，检查扩展能力。</p>
<p><details>
<summary><b>服务器配置（群集）</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi</code></details></p>
<p><strong>搜索性能</strong></p>
<table>
<thead>
<tr><th>CPU 内核</th><th>并发数</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>故障/秒</th></tr>
</thead>
<tbody>
<tr><td>8</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>12</td><td>300</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
<tr><td>16</td><td>600</td><td>14135</td><td>85</td><td>42</td><td>0</td></tr>
<tr><td>32</td><td>600</td><td>20281</td><td>63</td><td>28</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/search_performance_by_querynode_cpu_cores.png" alt="Search performance by Querynode CPU cores" class="doc-image" id="search-performance-by-querynode-cpu-cores" />
   </span> <span class="img-wrapper"> <span>按 Querynode CPU 内核分列的搜索性能</span> </span></p>
<h3 id="Milvus-220-Scale-out" class="common-anchor-header">Milvus 2.2.0 扩展能力</h3><p>使用更多 Querynodes 扩展更多副本，以检查扩展能力。</p>
<div class="alert note">
<p>注意：加载 Collections 时，Querynodes 的数量等于<code translate="no">replica_number</code> 。</p>
</div>
<p><details>
<summary><b>服务器配置（群集）</b></summary><code translate="no">yaml queryNode: replicas: 1 / 2 / 4 / 8 resources: limits: cpu: &quot;8.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; memory: 8Gi</code></details></p>
<table>
<thead>
<tr><th>副本</th><th>并发数</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>故障/秒</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>2</td><td>500</td><td>15903</td><td>105</td><td>27</td><td>0</td></tr>
<tr><td>4</td><td>800</td><td>19281</td><td>109</td><td>40</td><td>0</td></tr>
<tr><td>8</td><td>1200</td><td>30655</td><td>93</td><td>38</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/search_performance_by_querynode_replicas.png" alt="Search performance by Querynode replicas" class="doc-image" id="search-performance-by-querynode-replicas" />
   </span> <span class="img-wrapper"> <span>按 Querynode 复制的搜索性能</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>请参照<a href="https://milvus.io/blog/2022-08-16-A-Quick-Guide-to-Benchmarking-Milvus-2-1.md">本指南</a>，尝试自行执行 Milvus 2.2.0 基准测试，只是在本指南中应改用 Milvus 2.2 和 Pymilvus 2.2。</li>
</ul>
