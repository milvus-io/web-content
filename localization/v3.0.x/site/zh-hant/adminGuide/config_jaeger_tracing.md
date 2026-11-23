---
id: config_jaeger_tracing.md
title: 設定追蹤
related_key: 'Jaeger, Milvus, Trace'
summary: 本指南說明如何設定 Jaeger 以收集 Milvus 的追蹤資料。
---
<h1 id="Configure-Trace" class="common-anchor-header">設定追蹤<button data-href="#Configure-Trace" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南說明如何設定 Jaeger 以收集 Milvus 的追蹤資料。</p>
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
<li>您已安裝必要的工具，包括<a href="https://helm.sh/docs/intro/install/">Helm</a>和<a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>。</li>
</ul>
<h2 id="Deploy-Jaeger" class="common-anchor-header">部署 Jaeger<button data-href="#Deploy-Jaeger" class="anchor-icon" translate="no">
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
    </button></h2><p>Jaeger 是由<a href="http://uber.github.io/">Uber Technologies</a> 以開源形式發布的分散式追蹤平台。</p>
<p>本指南將使用<a href="https://github.com/jaegertracing/helm-charts">Jaeger Helm 圖表</a>來部署 Jaeger v2。預設情況下，該圖表會以「全功能一體化」模式並採用內存儲存方式部署 Jaeger，此配置適合用於測試。若要了解在 Kubernetes 上運行 Jaeger 的其他方法，請參閱<a href="https://www.jaegertracing.io/docs/2.23/deployment/kubernetes/">《在 Kubernetes 上部署》</a>。</p>
<h3 id="1-Install-Jaeger" class="common-anchor-header">1. 安裝 Jaeger<button data-href="#1-Install-Jaeger" class="anchor-icon" translate="no">
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
    </button></h3><p>請在安裝 Milvus 的命名空間中安裝 Jaeger。下一節中的 Milvus 設定會透過其簡稱<code translate="no">jaeger</code> 來引用 Jaeger 服務，而 Kubernetes 僅會在發出查詢的 Pod 所屬的命名空間內解析不帶命名空間的服務名稱。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add jaegertracing https://jaegertracing.github.io/helm-charts</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm install jaeger jaegertracing/jaeger --version 4.19.0</span>
<button class="copy-code-btn"></button></code></pre>
<p>該圖表的 README 文件將此圖表標記為實驗性，並指出次要版本中可能會發生破壞性變更，因此此指令會鎖定圖表版本。圖表版本 4.19.0 會部署 Jaeger 2.23.0。</p>
<h3 id="2-Check-the-Jaeger-pod" class="common-anchor-header">2. 檢查 Jaeger Pod<button data-href="#2-Check-the-Jaeger-pod" class="anchor-icon" translate="no">
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
    </button></h3><p>若要確認 Jaeger Pod 是否正在運行，請執行以下命令：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods -l app.kubernetes.io/instance=jaeger,app.kubernetes.io/component=all-in-one</span>
<button class="copy-code-btn"></button></code></pre>
<p>此圖表會建立一個名為<code translate="no">jaeger</code> 的服務。該服務在<code translate="no">4317</code> 埠上公開 OTLP gRPC 接收器，並在<code translate="no">16686</code> 埠上公開 Jaeger 使用者介面。</p>
<h2 id="Install-Milvus-with-Helm-Chart" class="common-anchor-header">使用 Helm Chart 安裝 Milvus<button data-href="#Install-Milvus-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>若要透過 OTLP 將 Milvus 的追蹤資料傳送至 Jaeger，請將以下設定儲存至名為<code translate="no">values.yaml</code> 的檔案中：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    trace:
      exporter: otlp
      sampleFraction: 1
      otlp:
        endpoint: &quot;jaeger:4317&quot;
        method: grpc
        secure: false
</span><button class="copy-code-btn"></button></code></pre>
<p>透過這些設定，Milvus 會對每個請求進行採樣（<code translate="no">sampleFraction: 1</code> ），並透過不使用 TLS 的 OTLP gRPC（<code translate="no">secure: false</code> ）將追蹤資料傳送至<code translate="no">jaeger</code> 服務的<code translate="no">4317</code> 埠。</p>
<p>若要將上述設定套用至新的 Milvus 部署，請執行以下指令：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade --install my-release zilliztech/milvus --version 5.0.22 -f values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>若要將上述設定套用至現有的 Milvus 部署，請執行以下命令：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values -f values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>此命令使用 `<code translate="no">--reset-then-reuse-values</code>` 選項，該選項需要 Helm 3.14 或更新版本。啟用此選項後，Helm 會將值重設為 `<code translate="no">--version</code>` 中設定的圖表版本預設值，套用您當前發佈版的值，然後再套用 `<code translate="no">-f</code>` 中的值。因此，`<code translate="no">values.yaml</code> ` 中的每個值都會覆寫您當前發佈版的值，而 `<code translate="no">extraConfigFiles</code> ` 下的 `<code translate="no">user.yaml</code> ` 條目將被整體替換。 若要查找 `<code translate="no">&lt;current-chart-version&gt;</code>`，請執行 `<code translate="no">helm list</code> `，並從 `<code translate="no">CHART</code> ` 欄位的值中移除 `<code translate="no">milvus-</code> ` 前綴。若您在執行 `<code translate="no">helm upgrade</code> ` 時，使用 `<code translate="no">-f</code> ` 或 `<code translate="no">--set</code> `，但未包含 `<code translate="no">--reset-then-reuse-values</code> ` 或 `<code translate="no">--reuse-values</code>`，Helm 將不會保留您在安裝時設定的值。</p>
</div>
<h2 id="View-Traces" class="common-anchor-header">檢視追蹤記錄<button data-href="#View-Traces" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">jaeger</code> 服務的類型為<code translate="no">ClusterIP</code> ，且該圖表預設不會建立 Ingress。若要在本地端機器上開啟 Jaeger UI，請將 UI 埠轉發：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward svc/jaeger 16686:16686</span>
<button class="copy-code-btn"></button></code></pre>
<p>接著在瀏覽器中開啟<code translate="no">http://localhost:16686</code> 。</p>
<p>以下螢幕截圖顯示了 Jaeger 使用者介面，其中包含 Milvus 在搜尋操作及負載收集操作期間的追蹤記錄：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-search.PNG" alt="Trace Search Request" class="doc-image" id="trace-search-request" /> 
   <span>追蹤搜尋請求</span>
  
 </span></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-load.png" alt="Trace Load Collection Request" class="doc-image" id="trace-load-collection-request" /> 
   <span>追蹤資料載入收集請求</span>
  
 </span></p>
