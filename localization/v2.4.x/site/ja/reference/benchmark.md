---
id: benchmark.md
summary: ミルバスのベンチマーク結果について。
title: Milvus 2.2ベンチマークテストレポート
---
<h1 id="Milvus-22-Benchmark-Test-Report" class="common-anchor-header">Milvus 2.2 ベンチマークテストレポート<button data-href="#Milvus-22-Benchmark-Test-Report" class="anchor-icon" translate="no">
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
    </button></h1><p>本レポートはMilvus 2.2.0の主なテスト結果を示しており、Milvus 2.2.0の検索性能、特にスケールアップとスケールアウトの能力を提供することを目的としています。</p>
<div class="alert note">
  <div style="display: flex;">
      <div style="flex:0.3;">
        <img translate="no" src="https://zilliz.com/images/whitepaper/performance.png" alt="Milvus Performance Evaluation 2023" />
      </div>
  </div>
  <div style="flex:1;padding: 10px;">
    <p>最近、Milvus 2.2.3に対するベンチマークを実施し、以下の主要な結果を得ました：</p>
    <ul>
      <li>検索レイテンシーの2.5倍削減</li>
      <li>4.5倍のQPS向上</li>
      <li>10億件規模の類似検索でも性能劣化はほとんどなし</li>
      <li>複数のレプリカを使用した場合の線形スケーラビリティ</li>
    </ul>
    <p>詳細については、<a href="https://zilliz.com/resources/whitepaper/milvus-performance-benchmark">このホワイトペーパーと</a> <a href="https://github.com/zilliztech/VectorDBBench">関連するベンチマーク・テスト・コードを</a>ご参照ください。 </p>
  </div>
</div>
<h2 id="Summary" class="common-anchor-header">概要<button data-href="#Summary" class="anchor-icon" translate="no">
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
<li>Milvus 2.1と比較すると、Milvus 2.2.0のQPSはクラスタモードで48%以上、スタンドアロンモードで75%以上向上しています。</li>
<li>Milvus 2.2.0はスケールアップとスケールアウトに優れた能力を持つ：<ul>
<li>CPUコアを8から32に拡張すると、QPSは直線的に増加する。</li>
<li>QPSは、Querynodeレプリカを1から8まで拡張することで直線的に増加します。</li>
</ul></li>
</ul>
<h2 id="Terminology" class="common-anchor-header">用語解説<button data-href="#Terminology" class="anchor-icon" translate="no">
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
<summary>テストで使用した用語の詳細を見るにはクリックしてください。</summary>
<table class="terminology">
<thead>
<tr>
<th>用語</th>
<th>説明</th>
</tr>
</thead>
<tbody>
<tr>
<td>nq</td>
<td>1回の検索要求で検索されるベクトルの数</td>
</tr>
<tr>
<td>topk</td>
<td>1回の検索要求で各ベクトル（nq）に対して検索される最も近いベクトルの数</td>
</tr>
<tr>
<td>ef</td>
<td><a href="https://milvus.io/docs/v2.2.x/index.md">HNSW インデックスに</a>固有の検索パラメータ</td>
</tr>
<tr>
<td>RT</td>
<td>リクエストを送信してから応答を受信するまでの応答時間</td>
</tr>
<tr>
<td>QPS</td>
<td>1秒間に正常に処理された検索リクエスト数</td>
</tr>
</tbody>
</table>
</details></p>
<h2 id="Test-environment" class="common-anchor-header">テスト環境<button data-href="#Test-environment" class="anchor-icon" translate="no">
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
    </button></h2><p>すべてのテストは以下の環境で実施した。</p>
<h3 id="Hardware-environment" class="common-anchor-header">ハードウェア環境</h3><table>
<thead>
<tr><th>ハードウェア</th><th>スペック</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td>インテル® Xeon® Gold 6226R CPU @ 2.90GHz</td></tr>
<tr><td>メモリ</td><td>16*32 GB RDIMM、3200 MT/秒</td></tr>
<tr><td>SSD</td><td>SATA 6 Gbps</td></tr>
</tbody>
</table>
<h3 id="Software-environment" class="common-anchor-header">ソフトウェア環境</h3><table>
<thead>
<tr><th>ソフトウェア</th><th>バージョン</th></tr>
</thead>
<tbody>
<tr><td>Milvus</td><td>v2.2.0</td></tr>
<tr><td>Milvus GO SDK</td><td>v2.2.0</td></tr>
</tbody>
</table>
<h3 id="Deployment-scheme" class="common-anchor-header">デプロイ方式</h3><ul>
<li>Milvusインスタンス（スタンドアロンまたはクラスタ）は、物理マシンまたは仮想マシンに基づくKubernetesクラスタ上に<a href="https://milvus.io/docs/install_standalone-helm.md">Helmを介して</a>デプロイされる。</li>
<li>テストによってCPUコア数、メモリサイズ、レプリカ（ワーカーノード）数が異なるだけで、Milvusクラスタにのみ適用される。</li>
<li>未指定の構成は<a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml">デフォルトの構成と</a>同じである。</li>
<li>Milvusの依存関係（MinIO、Pulsar、Etcd）は、各ノードのローカルSSDにデータを保存します。</li>
<li>検索リクエストは<a href="https://github.com/milvus-io/milvus-sdk-go/tree/master/tests">Milvus GO SDKを介して</a>Milvusインスタンスに送信されます。</li>
</ul>
<h3 id="Data-sets" class="common-anchor-header">データセット</h3><p>テストでは、<a href="https://github.com/erikbern/ann-benchmarks/#data-sets">ANN-Benchmarksの</a>オープンソースデータセットSIFT（128次元）を使用する。</p>
<h2 id="Test-pipeline" class="common-anchor-header">テストパイプライン<button data-href="#Test-pipeline" class="anchor-icon" translate="no">
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
<li>各テストに記載されているサーバ設定でHelmによりMilvusインスタンスを起動する。</li>
<li>Milvus GO SDK経由でMilvusインスタンスに接続し、対応するテスト結果を取得する。</li>
<li>コレクションを作成する。</li>
<li>100万個のSIFTベクトルを挿入する。HNSW インデックスを構築し、<code translate="no">M</code> を<code translate="no">8</code> に、<code translate="no">efConstruction</code> を<code translate="no">200</code> に設定してインデックスパラメータを構成する。</li>
<li>コレクションをロードする。</li>
<li>検索パラメータ<code translate="no">nq=1, topk=1, ef=64</code> を使用して、異なる同時実行数で検索する。</li>
</ol>
<h2 id="Test-results" class="common-anchor-header">テスト結果<button data-href="#Test-results" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-220-vs-Milvus-210" class="common-anchor-header">Milvus 2.2.0 v.s. Milvus 2.1.0</h3><h4 id="Cluster" class="common-anchor-header">クラスタ</h4><p><details>
<summary><b>サーバー構成（クラスタ）</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 8Gi requests: cpu: &quot;12.0&quot; memory: 8Gi</code></details></p>
<p><strong>検索パフォーマンス</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>フェール/秒</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>6904</td><td>59</td><td>28</td><td>0</td></tr>
<tr><td>2.2.0</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/cluster_search_performance_210_vs_220.png" alt="Cluster search performance" class="doc-image" id="cluster-search-performance" />
   </span> <span class="img-wrapper"> <span>クラスタ検索のパフォーマンス</span> </span></p>
<h4 id="Standalone" class="common-anchor-header">スタンドアロン</h4><p><details>
<summary><b>サーバー構成（スタンドアロン）</b></summary><code translate="no">yaml standalone: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 16Gi requests: cpu: &quot;12.0&quot; memory: 16Gi</code></details></p>
<p><strong>検索パフォーマンス</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>フェール/秒</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>4287</td><td>104</td><td>76</td><td>0</td></tr>
<tr><td>2.2.0</td><td>7522</td><td>127</td><td>79</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/standalone_search_performance_210_vs_220.png" alt="Standalone search performance" class="doc-image" id="standalone-search-performance" />
   </span> <span class="img-wrapper"> <span>スタンドアロン検索のパフォーマンス</span> </span></p>
<h3 id="Milvus-220-Scale-up" class="common-anchor-header">Milvus 2.2.0 スケールアップ</h3><p>1つのQuerynodeのCPUコアを拡張し、スケールアップ能力を確認する。</p>
<p><details>
<summary><b>サーバ構成（クラスタ）</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi</code></details></p>
<p><strong>検索パフォーマンス</strong></p>
<table>
<thead>
<tr><th>CPUコア</th><th>同時実行数</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>フェール/秒</th></tr>
</thead>
<tbody>
<tr><td>8</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>12</td><td>300</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
<tr><td>16</td><td>600</td><td>14135</td><td>85</td><td>42</td><td>0</td></tr>
<tr><td>32</td><td>600</td><td>20281</td><td>63</td><td>28</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/search_performance_by_querynode_cpu_cores.png" alt="Search performance by Querynode CPU cores" class="doc-image" id="search-performance-by-querynode-cpu-cores" />
   </span> <span class="img-wrapper"> <span>QuerynodeのCPUコアによる検索パフォーマンス</span> </span></p>
<h3 id="Milvus-220-Scale-out" class="common-anchor-header">Milvus 2.2.0 スケールアウト</h3><p>より多くのQuerynodeでより多くのレプリカを拡張し、スケールアウト能力をチェックします。</p>
<div class="alert note">
<p>注: Querynodeの数は、コレクションをロードするときの<code translate="no">replica_number</code> 。</p>
</div>
<p><details>
<summary><b>サーバー構成 (クラスタ)</b></summary><code translate="no">yaml queryNode: replicas: 1 / 2 / 4 / 8 resources: limits: cpu: &quot;8.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; memory: 8Gi</code></details></p>
<table>
<thead>
<tr><th>レプリカ数</th><th>同時実行数</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>フェール/秒</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>2</td><td>500</td><td>15903</td><td>105</td><td>27</td><td>0</td></tr>
<tr><td>4</td><td>800</td><td>19281</td><td>109</td><td>40</td><td>0</td></tr>
<tr><td>8</td><td>1200</td><td>30655</td><td>93</td><td>38</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/search_performance_by_querynode_replicas.png" alt="Search performance by Querynode replicas" class="doc-image" id="search-performance-by-querynode-replicas" />
   </span> <span class="img-wrapper"> <span>Querynodeレプリカによる検索パフォーマンス</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/blog/2022-08-16-A-Quick-Guide-to-Benchmarking-Milvus-2-1.md">このガイドでは</a>、Milvus 2.2とPymilvus 2.2を使用する代わりに、<a href="https://milvus.io/blog/2022-08-16-A-Quick-Guide-to-Benchmarking-Milvus-2-1.md">このガイドを</a>参照してMilvus 2.2.0のベンチマークテストを実行してみてください。</li>
</ul>
