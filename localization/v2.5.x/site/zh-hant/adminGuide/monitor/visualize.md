---
id: visualize.md
title: 可視化指標
related_key: 'monitor, alert'
summary: 瞭解如何在 Grafana 中視覺化 Milvus 的度量指標。
---
<h1 id="Visualize-Milvus-Metrics-in-Grafana" class="common-anchor-header">在 Grafana 中視覺化 Milvus 的度量指標<button data-href="#Visualize-Milvus-Metrics-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題描述如何使用 Grafana 可視化 Milvus metrics。</p>
<p><a href="/docs/zh-hant/monitor.md">如監控指南</a>所述，指標包含有用的資訊，例如特定 Milvus 元件使用了多少記憶體。監控指標有助於您更好地瞭解 Milvus 的性能及其運行狀態，以便及時調整資源分配。</p>
<p>可視化是一種顯示資源使用量在不同時間變化的圖表，它使您更容易快速查看和注意到資源使用量的變化，特別是在事件發生時。</p>
<p>本教學使用時間序列分析的開放原始碼平台 Grafana 來視覺化部署在 Kubernetes (K8s) 上的 Milvus 叢集的各種效能指標。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>您已<a href="/docs/zh-hant/install_cluster-helm.md">在 K8s 上安裝 Milvus 叢集</a>。）</li>
<li>在使用 Grafana 可視化指標之前，您需要<a href="/docs/zh-hant/monitor.md">設定 Prometheus</a>以監控和收集指標。如果設定成功，您可以從<code translate="no">http://localhost:3000</code> 存取 Grafana。或者您也可以使用<code translate="no">admin:admin</code> 的預設 Grafana<code translate="no">user:password</code> 存取 Grafana。</li>
</ul>
<h2 id="Visualize-metrics-using-Grafana" class="common-anchor-header">使用 Grafana 可視化度量指標<button data-href="#Visualize-metrics-using-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Download-and-import-dashboard" class="common-anchor-header">1.下載並匯入儀表板</h3><p>從 JSON 檔案下載並匯入 Milvus 的儀表板。</p>
<pre><code translate="no">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/refs/heads/master/deployments/monitor/grafana/milvus-dashboard.json</span>
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/import_dashboard.png" alt="Download_and_import" class="doc-image" id="download_and_import" />
   </span> <span class="img-wrapper"> <span>下載與匯入</span> </span></p>
<h3 id="2-View-metrics" class="common-anchor-header">2.檢視指標</h3><p>選擇要監控的 Milvus 實例。然後您可以看到 Milvus 元件面板。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/grafana_select.png" alt="Select_instance" class="doc-image" id="select_instance" />
   </span> <span class="img-wrapper"> <span>選擇實例</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/grafana_panel.png" alt="Grafana_panel" class="doc-image" id="grafana_panel" />
   </span> <span class="img-wrapper"> <span>Grafana_panel</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">接下來<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>如果您已將 Grafana 設定為可視化 Milvus 的度量指標，您可能還想要<ul>
<li>瞭解如何<a href="/docs/zh-hant/alert.md">為 Milvus 服務建立警示</a></li>
<li>調整您的<a href="/docs/zh-hant/allocate.md">資源分配</a></li>
<li><a href="/docs/zh-hant/scaleout.md">擴大或擴充 Milvus 叢集</a></li>
</ul></li>
<li>如果您有興趣升級 Milvus 版本、<ul>
<li>閱讀<a href="/docs/zh-hant/upgrade_milvus_cluster-operator.md">升級 Milvus 集群</a>和<a href="/docs/zh-hant/upgrade_milvus_standalone-operator.md">升級 Milvus 單機的</a> <a href="/docs/zh-hant/upgrade_milvus_cluster-operator.md">指南</a>。</li>
</ul></li>
</ul>
