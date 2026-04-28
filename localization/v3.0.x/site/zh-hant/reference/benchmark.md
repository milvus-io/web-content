---
id: benchmark.md
summary: 瞭解 Milvus 的基準結果。
title: Milvus 2.2 基準測試報告
---
<h1 id="Milvus-22-Benchmark-Test-Report" class="common-anchor-header">Milvus 2.2 基準測試報告<button data-href="#Milvus-22-Benchmark-Test-Report" class="anchor-icon" translate="no">
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
    </button></h1><p>這份報告顯示了Milvus 2.2.0的主要測試結果，目的是提供Milvus 2.2.0的搜尋效能，特別是在擴充和縮小的能力。</p>
<div class="alert note">
  <div style="display: flex;">
      <div style="flex:0.3;">
        <img translate="no" src="https://zilliz.com/images/whitepaper/performance.png" alt="Milvus Performance Evaluation 2023" />
      </div>
  </div>
  <div style="flex:1;padding: 10px;">
    <p>我們最近針對 Milvus 2.2.3 執行了基準測試，主要結果如下：</p>
    <ul>
      <li>搜尋延遲降低 2.5 倍</li>
      <li>QPS 增加 4.5 倍</li>
      <li>十億規模的相似性搜尋，效能幾乎沒有降低</li>
      <li>使用多複本時的線性擴充能力</li>
    </ul>
    <p>如需詳細資訊，歡迎參閱<a href="https://zilliz.com/resources/whitepaper/milvus-performance-benchmark">本白皮書及</a> <a href="https://github.com/zilliztech/VectorDBBench">相關基準測試程式碼</a>。 </p>
  </div>
</div>
<h2 id="Summary" class="common-anchor-header">摘要<button data-href="#Summary" class="anchor-icon" translate="no">
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
<li>與 Milvus 2.1 相比，Milvus 2.2.0 的 QPS 在群集模式下增加超過 48%，在單機模式下增加超過 75%。</li>
<li>Milvus 2.2.0 具備令人印象深刻的擴充能力：<ul>
<li>當 CPU 核心從 8 個擴充到 32 個時，QPS 會以線性方式增加。</li>
<li>當 Querynode 複製本從 1 個擴充到 8 個時，QPS 會以線性方式增加。</li>
</ul></li>
</ul>
<h2 id="Terminology" class="common-anchor-header">術語<button data-href="#Terminology" class="anchor-icon" translate="no">
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
<summary>點擊查看測試中使用的術語詳情</summary>
<table class="terminology">
<thead>
<tr>
<th>術語</th>
<th>說明</th>
</tr>
</thead>
<tbody>
<tr>
<td>nq</td>
<td>一次搜尋請求中要搜尋的向量數量</td>
</tr>
<tr>
<td>topk</td>
<td>一個搜尋請求中，每個向量（以 nq 為單位）要擷取的最近向量數量</td>
</tr>
<tr>
<td>ef</td>
<td><a href="https://milvus.io/docs/v2.2.x/index.md">HNSW 索引</a>的特定搜尋參數</td>
</tr>
<tr>
<td>RT</td>
<td>從傳送請求到接收回應的回應時間</td>
</tr>
<tr>
<td>QPS</td>
<td>每秒成功處理的搜尋要求數量</td>
</tr>
</tbody>
</table>
</details></p>
<h2 id="Test-environment" class="common-anchor-header">測試環境<button data-href="#Test-environment" class="anchor-icon" translate="no">
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
    </button></h2><p>所有測試都在下列環境下進行。</p>
<h3 id="Hardware-environment" class="common-anchor-header">硬體環境</h3><table>
<thead>
<tr><th>硬體環境</th><th>規格</th></tr>
</thead>
<tbody>
<tr><td>中央處理器</td><td>Intel® Xeon® Gold 6226R CPU @ 2.90GHz</td></tr>
<tr><td>記憶體</td><td>16*/32 GB RDIMM, 3200 MT/s</td></tr>
<tr><td>固態硬碟</td><td>SATA 6 Gbps</td></tr>
</tbody>
</table>
<h3 id="Software-environment" class="common-anchor-header">軟體環境</h3><table>
<thead>
<tr><th>軟體環境</th><th>版本</th></tr>
</thead>
<tbody>
<tr><td>Milvus</td><td>v2.2.0</td></tr>
<tr><td>Milvus GO SDK</td><td>v2.2.0</td></tr>
</tbody>
</table>
<h3 id="Deployment-scheme" class="common-anchor-header">部署方案</h3><ul>
<li>Milvus 實體（單機或叢集）是透過<a href="https://milvus.io/docs/install_standalone-helm.md">Helm</a>部署在 Kubernetes 叢集上，以實體或虛擬機器為基礎。</li>
<li>不同的測試僅在 CPU 核心數量、記憶體大小和副本 (Worker 節點) 數量上有所不同，這僅適用於 Milvus 叢集。</li>
<li>未指定的配置與<a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml">預設配置</a>相同。</li>
<li>Milvus 依賴 (MinIO、Pulsar 和 Etcd) 將資料儲存在每個節點的本機 SSD 上。</li>
<li>搜尋要求透過 Milvus<a href="https://github.com/milvus-io/milvus-sdk-go/tree/master/tests">GO SDK</a> 傳送至 Milvus 實體。</li>
</ul>
<h3 id="Data-sets" class="common-anchor-header">資料集</h3><p>測試使用<a href="https://github.com/erikbern/ann-benchmarks/#data-sets">ANN-Benchmarks</a> 的開放源碼資料集 SIFT (128 維度)。</p>
<h2 id="Test-pipeline" class="common-anchor-header">測試流程<button data-href="#Test-pipeline" class="anchor-icon" translate="no">
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
<li>使用 Helm 啟動 Milvus 實例，並根據各測試列出的伺服器配置。</li>
<li>透過 Milvus GO SDK 連線至 Milvus 實例，並取得相對應的測試結果。</li>
<li>建立一個集合。</li>
<li>插入 100 萬個 SIFT 向量。建立 HNSW 索引，並透過設定<code translate="no">M</code> 為<code translate="no">8</code> 、<code translate="no">efConstruction</code> 為<code translate="no">200</code> 來設定索引參數。</li>
<li>載入資料夾。</li>
<li>使用不同的並發數進行搜尋，搜尋參數為<code translate="no">nq=1, topk=1, ef=64</code> ，每個並發數的持續時間至少為 1 小時。</li>
</ol>
<h2 id="Test-results" class="common-anchor-header">測試結果<button data-href="#Test-results" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-220-vs-Milvus-210" class="common-anchor-header">Milvus 2.2.0 v.s. Milvus 2.1.0</h3><h4 id="Cluster" class="common-anchor-header">叢集</h4><p><details>
<summary><b>伺服器配置 (群集)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 8Gi requests: cpu: &quot;12.0&quot; memory: 8Gi</code></details></p>
<p><strong>搜尋效能</strong></p>
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
   </span> <span class="img-wrapper"> <span>叢集搜尋效能</span> </span></p>
<h4 id="Standalone" class="common-anchor-header">單機</h4><p><details>
<summary><b>伺服器配置（單機）</b></summary><code translate="no">yaml standalone: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 16Gi requests: cpu: &quot;12.0&quot; memory: 16Gi</code></details></p>
<p><strong>搜尋效能</strong></p>
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
   </span> <span class="img-wrapper"> <span>獨立搜尋效能</span> </span></p>
<h3 id="Milvus-220-Scale-up" class="common-anchor-header">Milvus 2.2.0 擴充能力</h3><p>擴充一個 Querynode 的 CPU 核心，以檢查擴充能力。</p>
<p><details>
<summary><b>伺服器配置 (群集)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi</code></details></p>
<p><strong>搜尋效能</strong></p>
<table>
<thead>
<tr><th>CPU 核心</th><th>並發數</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>故障/秒</th></tr>
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
   </span> <span class="img-wrapper"> <span>以 Querynode CPU 核心計算的搜尋效能</span> </span></p>
<h3 id="Milvus-220-Scale-out" class="common-anchor-header">Milvus 2.2.0 擴充能力</h3><p>使用更多 Querynodes 擴充更多副本，以檢查擴充能力。</p>
<div class="alert note">
<p>注意：載入集合時，Querynodes 的數量等於<code translate="no">replica_number</code> 。</p>
</div>
<p><details>
<summary><b>伺服器配置 (群集)</b></summary><code translate="no">yaml queryNode: replicas: 1 / 2 / 4 / 8 resources: limits: cpu: &quot;8.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; memory: 8Gi</code></details></p>
<table>
<thead>
<tr><th>複製本</th><th>並發數</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>故障/秒</th></tr>
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
   </span> <span class="img-wrapper"> <span>依據 Querynode 複製的搜尋效能</span> </span></p>
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
<li>參考<a href="https://milvus.io/blog/2022-08-16-A-Quick-Guide-to-Benchmarking-Milvus-2-1.md">本指南</a>，嘗試自行執行 Milvus 2.2.0 基準測試，只是您應該改用本指南中的 Milvus 2.2 和 Pymilvus 2.2。</li>
</ul>
