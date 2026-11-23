---
id: monitor.md
title: 部署監控服務
related_key: 'monitor, alert'
summary: 瞭解如何使用 Prometheus 為 Milvus 叢集部署監控服務。
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
    </button></h1><p>本主題說明如何使用 Prometheus，在 Kubernetes 上為 Milvus 叢集部署監控服務。</p>
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
    </button></h2><p>指標是提供系統運行狀態資訊的指標。例如，透過指標，您可以了解 Milvus 中的資料節點消耗了多少記憶體或 CPU 資源。掌握 Milvus 叢集中各元件的效能與狀態，能讓您掌握第一手資訊，從而做出更明智的決策，並更及時地調整資源分配。</p>
<p>一般而言，指標會儲存於時間序列資料庫（TSDB）中（例如<a href="https://prometheus.io/">Prometheus</a>），並附帶時間戳記進行記錄。在監控 Milvus 服務時，您可以使用 Prometheus 從匯出器設定的端點拉取資料。隨後，Prometheus 會將各 Milvus 元件的指標匯出至<code translate="no">http://&lt;component-host&gt;:9091/metrics</code> 。</p>
<p>然而，您可能針對單一元件擁有多個複本，這會使 Prometheus 的手動配置變得過於複雜。因此，您可以使用<a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator</a>（Kubernetes 的擴充套件），以自動且有效地管理 Prometheus 監控實例。使用 Prometheus Operator 可免去您手動新增指標目標與服務提供者的麻煩。</p>
<p>ServiceMonitor 自訂資源定義 (CRD) 讓您能夠以宣告式方式定義如何監控一組動態服務。它還允許您透過標籤篩選，選擇要以指定配置進行監控的服務。透過 Prometheus Operator，您可以建立規範，指定指標的公開方式。 新服務將能依照您設定的規範自動被發現，無需手動重新配置。</p>
<p>下圖說明了 Prometheus 的工作流程。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" /> 
   <span>Prometheus_architecture</span>
  
 </span></p>
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
    </button></h2><p>本教學使用<a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus</a>，以省去您安裝及手動設定每個監控與警示元件的麻煩。</p>
<p>kube-prometheus 整合了 Kubernetes 配置檔、<a href="http://grafana.com/">Grafana</a>儀表板、<a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">Prometheus 規則</a>，以及相關文件和腳本。</p>
<p>在部署監控服務之前，您需要使用 kube-prometheus manifests 目錄中的設定來建立監控堆疊。</p>
<p>以下指令使用 kube-prometheus 的<code translate="no">release-0.19</code> 分支，該分支支援 Kubernetes 1.35、1.36 及 1.37 版本。若要根據您的 Kubernetes 版本選擇合適的分支，請參閱<a href="https://github.com/prometheus-operator/kube-prometheus#compatibility">kube-prometheus 相容性對照表</a>。</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> --branch release-0.19 https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
預設的 `prometheus-k8s` 叢集角色無法擷取 Milvus 的指標，需要進行修補：
</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>若要刪除堆疊，請執行<code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code> 。</p>
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. 存取儀表板<button data-href="#1-Access-the-dashboards" class="anchor-icon" translate="no">
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
    </button></h3><p>將 Prometheus 服務轉發至<code translate="no">9090</code> 埠，並將 Grafana 服務轉發至<code translate="no">3000</code> 埠。</p>
<pre><code translate="no" class="language-bash">$ kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. 啟用 ServiceMonitor<button data-href="#2-Enable-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus Helm 預設未啟用 ServiceMonitor。在 Kubernetes 叢集中安裝 Prometheus Operator 後，您可以透過新增參數<code translate="no">metrics.serviceMonitor.enabled=true</code> 來啟用此功能。</p>
<h4 id="With-Helm" class="common-anchor-header">使用 Helm</h4><p>若您已安裝 Milvus Helm 圖表，可透過以下方式設定參數<code translate="no">metrics.serviceMonitor.enabled=true</code> 來啟用 ServiceMonitor。</p>
<pre><code translate="no" class="language-bash">$ helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>此指令使用<code translate="no">--reset-then-reuse-values</code> ，需 Helm 3.14 或更新版本。啟用此選項後，Helm 會將值重設為<code translate="no">--version</code> 中設定的圖表版本預設值，套用您當前發佈版的值，然後再套用<code translate="no">--set</code> 中的值。要查找<code translate="no">&lt;current-chart-version&gt;</code> ，請執行<code translate="no">helm list</code> ，並從<code translate="no">CHART</code> 欄位的值中移除<code translate="no">milvus-</code> 前綴。 若您在執行<code translate="no">helm upgrade</code> 時，僅包含<code translate="no">-f</code> 或<code translate="no">--set</code> ，卻未包含<code translate="no">--reset-then-reuse-values</code> 或<code translate="no">--reuse-values</code> ，Helm 將不會保留您在安裝時所設定的值。</p>
</div>
<p>安裝完成後，請使用<code translate="no">kubectl</code> 檢查 ServiceMonitor 資源。</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">使用 Milvus Operator</h4><p>若您是透過 Milvus Operator 安裝 Milvus，該 Operator 會建立 PodMonitor 而非 ServiceMonitor。此 PodMonitor 的名稱與 Milvus 自訂資源相同。 該操作員僅在自訂資源中未停用指標，且叢集中存在 PodMonitor CRD 時，才會建立此資源。kube-prometheus 的<code translate="no">manifests/setup</code> 目錄會安裝此 CRD。若要確保指標已啟用，請依下列步驟操作。</p>
<ol>
<li><p>執行以下指令以編輯 Milvus 自訂資源。以下指令假設該自訂資源名為<code translate="no">my-release</code> 。</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p>將<code translate="no">spec.components.disableMetric</code> 欄位編輯為<code translate="no">false</code> 。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetric:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>儲存並退出編輯器。</p></li>
<li><p>等待操作員同步這些變更。您可以執行以下命令來檢查 PodMonitor。</p>
<pre><code translate="no" class="language-bash">$ kubectl get podmonitor my-release
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3. 檢查指標<button data-href="#3-Check-the-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>啟用 ServiceMonitor 或 PodMonitor 後，您可以透過<code translate="no">http://localhost:9090/</code> 存取 Prometheus 儀表板。</p>
<p>點選「<code translate="no">Status</code> 」分頁，然後選擇「<code translate="no">Targets</code> 」。您應能看到 Milvus 組件的監測目標。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" /> 
   <span>Prometheus_targets</span>
  
 </span></p>
<p>點選「<code translate="no">Graph</code> 」分頁，並在表達式輸入框中輸入<code translate="no">up{app_kubernetes_io_instance=&quot;my-release&quot;}</code> 。您應能看到 Milvus 組件的指標。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" /> 
   <span>Prometheus_graph</span>
  
 </span></p>
<h3 id="4-Check-the-ServiceMonitor" class="common-anchor-header">4. 檢查 ServiceMonitor<button data-href="#4-Check-the-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>若您是透過 Helm 安裝 Milvus，請執行以下指令以列出 ServiceMonitor。此圖表針對 Milvus 叢集命名為<code translate="no">my-release-milvus</code> ，針對 Milvus 獨立執行環境則命名為<code translate="no">my-release-milvus-standalone</code> 。</p>
<pre><code translate="no" class="language-bash">$ kubectl get servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">NAME                           AGE
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
<li>若您已為 Milvus 叢集部署監控服務，您可能還想學習：
<ul>
<li><a href="/docs/zh-hant/visualize.md">在 Grafana 中視覺化 Milvus 指標</a></li>
<li><a href="/docs/zh-hant/alert.md">為 Milvus 服務建立警示</a></li>
<li>調整<a href="/docs/zh-hant/allocate.md">資源分配</a></li>
</ul></li>
<li>若您正在尋找有關如何擴展 Milvus 叢集的資訊：
<ul>
<li>瞭解<a href="/docs/zh-hant/scaleout.md">如何擴展 Milvus 叢集</a></li>
</ul></li>
<li>若您有興趣升級 Milvus 版本，
<ul>
<li>請參閱《<a href="/docs/zh-hant/upgrade_milvus_cluster-operator.md">Milvus 叢集升級指南</a>》以及<a href="/docs/zh-hant/upgrade_milvus_standalone-operator.md">《Milvus 獨立執行版本升級指南》</a>。</li>
</ul></li>
</ul>
