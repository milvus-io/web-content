---
id: configure_grafana_loki.md
title: 配置 Grafana Loki
summary: 本主題說明如何使用 Loki 收集日誌，並使用 Grafana 查詢 Milvus 叢集的日誌。
---
<h1 id="Configure-Grafana-Loki" class="common-anchor-header">配置 Grafana Loki<button data-href="#Configure-Grafana-Loki" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南說明如何設定 Loki 以收集日誌，以及設定 Grafana 以查詢和顯示 Milvus 叢集的日誌。</p>
<p>在本指南中，您將學習如何</p>
<ul>
<li>使用 Helm 在 Milvus 叢集上部署<a href="https://grafana.com/docs/loki/latest/get-started/overview/">Loki</a>和<a href="https://grafana.com/docs/loki/latest/send-data/promtail/">Promtail</a>。</li>
<li>為 Loki 配置物件儲存。</li>
<li>使用 Grafana 查詢日誌。</li>
</ul>
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
<li>您已<a href="/docs/zh-hant/install_cluster-helm.md">在 K8s 上安裝 Milvus 叢集</a>。</li>
<li>您已安裝必要的工具，包括<a href="https://helm.sh/docs/intro/install/">Helm</a>和<a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>。</li>
</ul>
<h2 id="Deploy-Loki" class="common-anchor-header">部署 Loki<button data-href="#Deploy-Loki" class="anchor-icon" translate="no">
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
    </button></h2><p>Loki 是受 Prometheus 啟發的日誌聚合系統。使用 Helm 部署 Loki，從您的 Milvus 叢集收集日誌。</p>
<h3 id="1-Add-Grafanas-Helm-Chart-Repository" class="common-anchor-header">1.新增 Grafana 的 Helm 圖表儲存庫</h3><p>將 Grafana 的圖表儲存庫加入 Helm 並更新：</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> grafana https:<span class="hljs-comment">//grafana.github.io/helm-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Configure-Object-Storage-for-Loki" class="common-anchor-header">2.為 Loki 設定物件儲存</h3><p>選擇下列其中一個儲存選項，並建立<code translate="no">loki.yaml</code> 配置檔案：</p>
<ul>
<li><p>選項 1：使用 MinIO 儲存</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki:</span>
  <span class="hljs-attr">commonConfig:</span>
    <span class="hljs-attr">replication_factor:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled:</span> <span class="hljs-literal">false</span>

<span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>選項 2：使用 AWS S3 儲存</p>
<p>在以下範例中，請將<code translate="no">&lt;accessKey&gt;</code> 和<code translate="no">&lt;keyId&gt;</code> 替換為您自己的 S3 存取金鑰和 ID，<code translate="no">s3.endpoint</code> 替換為 S3 端點，<code translate="no">s3.region</code> 替換為 S3 區域。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki:</span>
  <span class="hljs-attr">commonConfig:</span>
    <span class="hljs-attr">replication_factor:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketNames:</span>
      <span class="hljs-attr">chunks:</span> <span class="hljs-string">loki-chunks</span>
      <span class="hljs-attr">ruler:</span> <span class="hljs-string">loki-ruler</span>
      <span class="hljs-attr">admin:</span> <span class="hljs-string">loki-admin</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">&#x27;s3&#x27;</span>
    <span class="hljs-attr">s3:</span>
      <span class="hljs-attr">endpoint:</span> <span class="hljs-string">s3.us-west-2.amazonaws.com</span>
      <span class="hljs-attr">region:</span> <span class="hljs-string">us-west-2</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">&lt;accessKey&gt;</span>
      <span class="hljs-attr">accessKeyId:</span> <span class="hljs-string">&lt;keyId&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Install-Loki" class="common-anchor-header">3.安裝 Loki</h3><p>執行下列指令來安裝 Loki：</p>
<pre><code translate="no" class="language-shell">kubectl create ns loki
helm install --values loki.yaml loki grafana/loki -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Promtail" class="common-anchor-header">部署 Promtail<button data-href="#Deploy-Promtail" class="anchor-icon" translate="no">
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
    </button></h2><p>Promtail 是 Loki 的日誌收集代理。它從 Milvus pod 讀取日誌，並將它們傳送至 Loki。</p>
<h3 id="1-Create-Promtail-Configuration" class="common-anchor-header">1.建立 Promtail 組態</h3><p>建立<code translate="no">promtail.yaml</code> 配置檔案：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">config:</span>
  <span class="hljs-attr">clients:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">url:</span> <span class="hljs-string">http://loki-gateway/loki/api/v1/push</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Promtail" class="common-anchor-header">2.安裝 Promtail</h3><p>使用 Helm 安裝 Promtail：</p>
<pre><code translate="no" class="language-shell">helm install  --values promtail.yaml promtail grafana/promtail -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-Logs-with-Grafana" class="common-anchor-header">使用 Grafana 查詢日誌<button data-href="#Query-Logs-with-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><p>部署 Grafana 並將其設定為連線至 Loki 以查詢記錄。</p>
<h3 id="1-Deploy-Grafana" class="common-anchor-header">1.部署 Grafana</h3><p>使用下列指令安裝 Grafana：</p>
<pre><code translate="no" class="language-shell">kubectl create ns monitoring
helm install my-grafana grafana/grafana --namespace monitoring
<button class="copy-code-btn"></button></code></pre>
<p>在存取 Grafana 之前，您需要擷取<code translate="no">admin</code> 密碼：</p>
<pre><code translate="no" class="language-shell">kubectl get secret --namespace monitoring my-grafana -o jsonpath=&quot;{.data.admin-password}&quot; | base64 --decode ; echo
<button class="copy-code-btn"></button></code></pre>
<p>然後，將 Grafana 連接埠轉送至您的本機：</p>
<pre><code translate="no" class="language-shell">export POD_NAME=$(kubectl get pods --namespace monitoring -l &quot;app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-grafana&quot; -o jsonpath=&quot;{.items[0].metadata.name}&quot;)
kubectl --namespace monitoring port-forward $POD_NAME 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Add-Loki-as-a-Data-Source-in-Grafana" class="common-anchor-header">2.在 Grafana 中將 Loki 新增為資料來源</h3><p>一旦 Grafana 開始執行，您就需要將 Loki 新增為資料來源，以便查詢日誌。</p>
<ol>
<li>打開 Web 瀏覽器並導航至<code translate="no">127.0.0.1:3000</code> 。使用之前獲得的用戶名<code translate="no">admin</code> 和密碼登錄。</li>
<li>在左側功能表中，選擇<strong>連線</strong>&gt;<strong>新增連線</strong>。</li>
<li>在出現的頁面中，選擇<strong>Loki</strong>作為資料來源類型。您可以在搜尋列中輸入<strong>loki</strong>來尋找資料來源。</li>
<li>在 Loki 資料來源設定中，指定<strong>名稱</strong>和<strong>URL</strong>，然後按一下<strong>儲存與測試</strong>。</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/datasource.jpg" alt="DataSource" class="doc-image" id="datasource" />
   </span> <span class="img-wrapper"> <span>資料來源</span> </span></p>
<h3 id="3-Query-Milvus-Logs" class="common-anchor-header">3.查詢 Milvus 日誌</h3><p>將 Loki 新增為資料來源後，在 Grafana 中查詢 Milvus 日誌：</p>
<ol>
<li>在左側功能表中，按一下<strong>探索</strong>。</li>
<li>在頁面左上角，選擇 loki 資料來源。</li>
<li>使用<strong>標籤瀏覽器</strong>選擇標籤並查詢日誌。</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvuslog.jpg" alt="Query" class="doc-image" id="query" />
   </span> <span class="img-wrapper"> <span>查詢</span> </span></p>
