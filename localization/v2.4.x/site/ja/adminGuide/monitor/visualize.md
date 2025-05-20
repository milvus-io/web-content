---
id: visualize.md
title: メトリクスの可視化
related_key: 'monitor, alert'
summary: GrafanaでMilvusのメトリクスを可視化する方法を学びます。
---
<h1 id="Visualize-Milvus-Metrics-in-Grafana" class="common-anchor-header">GrafanaでMilvusメトリクスを可視化する<button data-href="#Visualize-Milvus-Metrics-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Grafanaを使用してMilvusメトリクスを可視化する方法について説明します。</p>
<p><a href="/docs/ja/v2.4.x/monitor.md">モニタリングガイドで</a>説明したように、メトリクスには、特定のMilvusコンポーネントでどれだけのメモリが使用されているかなどの有用な情報が含まれています。メトリクスを監視することで、Milvusのパフォーマンスや稼働状況をより深く理解し、リソース割り当てをタイムリーに調整できるようになります。</p>
<p>可視化とは、時間経過に伴うリソース使用量の変化をチャートで表示することで、特にイベント発生時にリソース使用量の変化を素早く確認し、気づきやすくするものです。</p>
<p>このチュートリアルでは、時系列分析のためのオープンソースプラットフォームであるGrafanaを使用して、Kubernetes（K8s）上にデプロイされたMilvusクラスタのさまざまなパフォーマンスメトリクスを可視化します。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><a href="/docs/ja/v2.4.x/install_cluster-helm.md">K8s)上にMilvusクラスタをインストールして</a>いる。</li>
<li>Grafanaを使用してメトリクスを可視化する前に、<a href="/docs/ja/v2.4.x/monitor.md">Prometheusを設定して</a>メトリクスを監視および収集する必要があります。設定が成功すると、<code translate="no">http://localhost:3000</code> で Grafana にアクセスできます。または、<code translate="no">admin:admin</code> のデフォルトの Grafana<code translate="no">user:password</code> を使用して Grafana にアクセスすることもできます。</li>
</ul>
<h2 id="Visualize-metrics-using-Grafana" class="common-anchor-header">Grafanaを使用してメトリクスを可視化する<button data-href="#Visualize-metrics-using-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Download-and-import-dashboard" class="common-anchor-header">1.ダッシュボードのダウンロードとインポート</h3><p>JSONファイルからMilvusダッシュボードをダウンロードしてインポートします。</p>
<pre><code translate="no">wget https://raw.githubusercontent.com/milvus-io/milvus/2.2.0/deployments/monitor/grafana/milvus-dashboard.json
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/import_dashboard.png" alt="Download_and_import" class="doc-image" id="download_and_import" />
   </span> <span class="img-wrapper"> <span>ダウンロードとインポート</span> </span></p>
<h3 id="2-View-metrics" class="common-anchor-header">2.メトリクスの表示</h3><p>監視したいMilvusインスタンスを選択します。Milvusコンポーネントパネルが表示されます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grafana_select.png" alt="Select_instance" class="doc-image" id="select_instance" />
   </span> <span class="img-wrapper"> <span>インスタンスを選択</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grafana_panel.png" alt="Grafana_panel" class="doc-image" id="grafana_panel" />
   </span> <span class="img-wrapper"> <span>Grafana_パネル</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">次は何をするのか<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Milvusのメトリクスを可視化するためにGrafanaを設定した場合、次のこともお勧めします：<ul>
<li><a href="/docs/ja/v2.4.x/alert.md">Milvusサービスのアラートを作成</a>する方法を学ぶ</li>
<li><a href="/docs/ja/v2.4.x/allocate.md">リソースの割り当てを</a>調整する</li>
<li><a href="/docs/ja/v2.4.x/scaleout.md">Milvusクラスタのスケールアウトまたはスケールイン</a></li>
</ul></li>
<li>Milvusのバージョンアップに興味がある場合、<ul>
<li><a href="/docs/ja/v2.4.x/upgrade_milvus_cluster-operator.md">Milvusクラスタのアップグレードガイド</a>および<a href="/docs/ja/v2.4.x/upgrade_milvus_standalone-operator.md">Milvusスタンドアロンのアップグレードガイドを</a>お読みください。</li>
</ul></li>
</ul>
