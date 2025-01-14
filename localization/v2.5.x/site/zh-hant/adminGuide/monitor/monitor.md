---
id: monitor.md
title: 部署監控服務
related_key: 'monitor, alert'
summary: 學習如何使用 Prometheus 為 Milvus 集群部署監控服務。
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">在 Kubernetes 上部署監控服務<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題描述如何使用 Prometheus 為 Kubernetes 上的 Milvus 叢集部署監控服務。</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">使用 Prometheus 監控指標<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>度量指標是提供系統運行狀態資訊的指標。例如，透過度量指標，您可以瞭解 Milvus 的資料節點消耗了多少記憶體或 CPU 資源。瞭解 Milvus 叢集中各元件的效能和狀態，可以讓您充分掌握資訊，從而做出更好的決策，並更及時地調整資源分配。</p>
<p>一般而言，度量指標會儲存於時間序列資料庫（TSDB），例如<a href="https://prometheus.io/">Prometheus</a>，並記錄有時間戳記的度量指標。在監控 Milvus 服務的情況下，您可以使用 Prometheus 從出口商設定的端點抽取資料。然後，Prometheus 在<code translate="no">http://&lt;component-host&gt;:9091/metrics</code> 匯出每個 Milvus 元件的度量指標。</p>
<p>但是，您可能會為一個元件設置多個副本，這使得 Prometheus 的手動設定變得過於複雜。因此，您可以使用 Kubernetes 的擴充套件<a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator</a>，自動且有效地管理 Prometheus 監控實體。使用 Prometheus Operator 可省去手動新增度量目標和服務提供者的麻煩。</p>
<p>ServiceMonitor 自訂資源定義 (CRD) 可讓您宣告性地定義如何監控動態服務集。它還允許使用標籤選擇使用所需的組態來監控哪些服務。使用 Prometheus Operator，您可以引入慣例，指定如何暴露度量。新服務可以按照您設定的慣例自動發現，而無需手動重新配置。</p>
<p>下圖說明 Prometheus 工作流程。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" />
   </span> <span class="img-wrapper"> <span>Prometheus 架構</span> </span></p>
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
    </button></h2><p>本教程使用<a href="https://github.com/prometheus-operator/kube-prometheus">Kube-prometheus</a>，以省去您安裝和手動設定每個監控和警示元件的麻煩。</p>
<p>Kube-prometheus 收集 Kubernetes 清单、<a href="http://grafana.com/">Grafana</a>面板和<a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">Prometheus 规则</a>，并结合文档和脚本。</p>
<p>在部署監控服務之前，您需要使用 kube-prometheus manifests 目錄中的組態來建立監控堆疊。</p>
<pre><code translate="no">$ git <span class="hljs-built_in">clone</span> https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
預設的 prometheus-k8s clusterrole 無法捕捉 milvus 的指標，需要修補：</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>要刪除堆疊，請執行<code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code> 。</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">在 Kubernetes 上部署監控服務<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1.存取儀表板</h3><p>將 Prometheus 服務轉發至<code translate="no">9090</code> 連接埠，並將 Grafana 服務轉發至<code translate="no">3000</code> 連接埠。</p>
<pre><code translate="no">$ kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2.啟用 ServiceMonitor</h3><p>Milvus Helm 預設未啟用 ServiceMonitor。在 Kubernetes 群集中安裝 Prometheus Operator 之後，您可以透過新增參數<code translate="no">metrics.serviceMonitor.enabled=true</code> 來啟用它。</p>
<pre><code translate="no">$ helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span> --reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>安裝完成後，使用<code translate="no">kubectl</code> 檢查 ServiceMonitor 資源。</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                           AGE
my-release-milvus              54s
<button class="copy-code-btn"></button></code></pre>
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
<li>如果您已為 Milvus 叢集部署了監控服務，您也許還想學一下<ul>
<li><a href="/docs/zh-hant/visualize.md">在 Grafana 可視化 Milvus 的度量指標</a></li>
<li><a href="/docs/zh-hant/alert.md">為 Milvus 服務建立警報</a></li>
<li>調整您的<a href="/docs/zh-hant/allocate.md">資源分配</a></li>
</ul></li>
<li>如果您正在尋找關於如何擴充 Milvus 叢集的資訊：<ul>
<li>學習<a href="/docs/zh-hant/scaleout.md">擴充 Milvus 叢集</a></li>
</ul></li>
<li>如果您有興趣升級 Milvus 版本、<ul>
<li>閱讀<a href="/docs/zh-hant/upgrade_milvus_cluster-operator.md">升級 Milvus 集群</a>和<a href="/docs/zh-hant/upgrade_milvus_standalone-operator.md">升級 Milvus 獨立</a>版本<a href="/docs/zh-hant/upgrade_milvus_cluster-operator.md">的指南</a>。</li>
</ul></li>
</ul>
