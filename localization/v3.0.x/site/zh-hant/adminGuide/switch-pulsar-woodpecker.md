---
id: switch-pulsar-woodpecker.md
title: 在 Pulsar 與 Woodpecker 之間切換
summary: 使用 Helm 或 Milvus Operator，將 Milvus 叢集的訊息佇列在 Pulsar 與 Woodpecker 之間切換。
---
<h1 id="Switch-between-Pulsar-and-Woodpecker" class="common-anchor-header">在 Pulsar 與 Woodpecker 之間切換<button data-href="#Switch-between-Pulsar-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁面說明如何將<strong>Milvus 叢集的</strong>訊息佇列 (MQ) 在<strong>Pulsar</strong>（內建或外部）與<strong>Woodpecker</strong>（MinIO 後端）之間進行雙向切換。有關一般工作流程與先決條件，請參閱《<a href="/docs/zh-hant/switch-mq-type.md">切換 MQ 類型》</a>。</p>
<div class="alert note">
<p><strong>先決條件：</strong>MQ 切換功能僅適用於<strong>Milvus 3.0 及後續版本</strong>。開始操作前，請將您的 Milvus 實例升級至 Milvus 3.0 或後續版本 — 此功能在較早版本中不可用。</p>
</div>
<div class="alert warning">
<p>切換訊息佇列是一項<strong>高風險操作</strong>。請選擇<strong>與您的</strong>部署方式相符的章節 —<strong>「使用 Helm</strong>」或<strong>「使用 Milvus Operator</strong>」— 並依序從上至下執行。請勿混用 Helm 與 Operator 指令。</p>
</div>
<h2 id="With-Helm" class="common-anchor-header">使用 Helm<button data-href="#With-Helm" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Pulsar-to-Woodpecker-Helm" class="common-anchor-header">從 Pulsar 切換至 Woodpecker（Helm）<button data-href="#Switch-from-Pulsar-to-Woodpecker-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>步驟 1：確認 Milvus 實例正在運行。</strong>確保您的 Milvus 叢集運作正常 —— 例如，建立測試集合、插入資料並執行查詢。</p>
<p><strong>步驟 2：執行訊息佇列切換。</strong>公開 MixCoord 管理介面，然後呼叫切換 API：</p>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>在另一個終端機中：</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>步驟 3：驗證切換是否完成。</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>若切換成功，系統會記錄<code translate="no">[mqTypeValue=woodpecker]</code> 。</p>
<p><strong>步驟 4：（可選）停止 Pulsar 並進行清理。</strong>對於<strong>內建的</strong>Pulsar，請停用 Pulsar 並啟用 Woodpecker，然後刪除 Pulsar 的 PVC：</p>
<pre><code translate="no" class="language-shell">helm upgrade my-release zilliztech/milvus \
  --set image.all.tag=v3.0-beta \
  --set pulsarv3.enabled=false \
  --set woodpecker.enabled=true \
  --set streaming.enabled=true \
  --set indexNode.enabled=false
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl get pvc | grep my-release-pulsarv3
kubectl delete pvc &lt;pulsar-pvc-name&gt; ...
<button class="copy-code-btn"></button></code></pre>
<p>若<strong>為外部</strong>Pulsar，請清理外部 Pulsar 實例中的 Milvus 主題。Milvus 主題格式為<code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code> （例如：<code translate="no">by-dev-rootcoord-dml_10_464633776992639586v0</code> ）。</p>
<div class="alert note">
<p>若您計劃日後切換回 Pulsar，請先清理資料/主題以避免衝突。由於 Helm 圖表的限制，目前無法切換回<strong>內建的</strong>Pulsar 實例。</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Pulsar-Helm" class="common-anchor-header">從 Woodpecker 切換至 Pulsar（Helm）<button data-href="#Switch-from-Woodpecker-to-Pulsar-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>步驟 1：確認 Milvus 實例正在運行。</strong></p>
<p><strong>步驟 2：配置目標 Pulsar 連線並重新啟動 Milvus。</strong>此切換操作需要 Milvus 已知曉 Pulsar 連線設定，因此請透過<code translate="no">extraConfigFiles</code> 將設定寫入<code translate="no">user.yaml</code> ，並使用<code translate="no">helm upgrade</code> 套用（此操作會滾動更新 Pod）。<code translate="no">streaming.enabled=true</code> 是「切換訊息佇列（Switch MQ）」功能所需的設定。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># values.yaml</span>
<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    pulsar:
      address: &lt;pulsar addr&gt;
      port: &lt;pulsar port, e.g. 6650&gt;
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release zilliztech/milvus \
  --set pulsarv3.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>請等待所有 Pod 準備就緒，然後確認 Pulsar 存取設定已套用至 Milvus 設定中。</p>
<p><strong>步驟 3：執行 MQ 切換。</strong></p>
<div class="alert note">
<p>請確保目標 Pulsar 中不包含來自先前配置的 Milvus 主題。若這是您首次切換至 Pulsar，請跳過此說明；否則請先清理同名的殘留 Milvus 主題。</p>
</div>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>在另一個終端機中：</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>步驟 4：驗證切換是否完成。</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>若切換成功，系統會記錄<code translate="no">[mqTypeValue=pulsar]</code> 。</p>
<p><strong>步驟 5：（可選）清理 Woodpecker 資料。</strong>刪除 MinIO/S3 上的 Woodpecker 資料（位於<code translate="no">&lt;rootPath&gt;/wp/...</code> 目錄下，通常為<code translate="no">files/wp/...</code> ）以及 etcd 中的 Woodpecker 元資料（<code translate="no">etcdctl get woodpecker --prefix</code> ）。若您計劃日後切換回 Woodpecker，請先清理這些檔案。</p>
<h2 id="With-Milvus-Operator" class="common-anchor-header">使用 Milvus Operator<button data-href="#With-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Pulsar-to-Woodpecker-Milvus-Operator" class="common-anchor-header">從 Pulsar 切換至 Woodpecker（Milvus Operator）<button data-href="#Switch-from-Pulsar-to-Woodpecker-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>步驟 1：確認 Milvus 實例正在運行。</strong></p>
<p><strong>步驟 2：執行 MQ 切換。</strong>由於 MixCoord 服務未對外公開，因此請從 MixCoord pod 內部執行切換 API：</p>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>步驟 3：驗證切換是否完成。</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>若切換成功，系統會記錄<code translate="no">[mqTypeValue=woodpecker]</code> 。</p>
<p><strong>步驟 4：更新 Operator 中的 MQ 類型。</strong>更新由<strong>Operator</strong>管理的配置，以防止 Operator 還原此切換。建立<code translate="no">change_configmap.yaml</code> ：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p><strong>步驟 5：（可選）停止 Pulsar 並進行清理。</strong>對於<strong>內建的</strong>Pulsar，請解除安裝該 Pulsar 發行版並刪除其 PVC：</p>
<pre><code translate="no" class="language-shell">helm uninstall my-release-pulsar
kubectl get pvc | grep my-release-pulsar
kubectl delete pvc &lt;pulsar-pvc-name&gt; ...
<button class="copy-code-btn"></button></code></pre>
<p>若為<strong>外部</strong>Pulsar，請清理 Milvus 主題（格式為<code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code> ）。</p>
<div class="alert note">
<p>若您計劃日後切換回 Pulsar，請先清理資料/主題以避免衝突。由於 Helm 圖表的限制，目前無法切換回<strong>內建的</strong>Pulsar 實例。</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Pulsar-Milvus-Operator" class="common-anchor-header">從 Woodpecker 切換至 Pulsar（Milvus Operator）<button data-href="#Switch-from-Woodpecker-to-Pulsar-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>步驟 1：確認 Milvus 實例正在運行。</strong></p>
<p><strong>步驟 2：設定目標 Pulsar 連線並重新啟動 Milvus。</strong>將 Pulsar 連線置於<code translate="no">spec.config</code> 下（Operator 會將<code translate="no">spec.config</code> 渲染為<code translate="no">user.yaml</code> ），並設定 MQ 類型；套用 CR 後，系統會根據新設定重新部署 Pod。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change_configmap.yaml</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">pulsar:</span>
      <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;pulsar</span> <span class="hljs-string">addr&gt;</span>
      <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;pulsar</span> <span class="hljs-string">port,</span> <span class="hljs-string">e.g.</span> <span class="hljs-number">6650</span><span class="hljs-string">&gt;
  dependencies:
    msgStreamType: pulsar
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p>等待所有 Pod 準備就緒後，確認 Pulsar 存取設定已渲染至 Milvus 設定中。</p>
<p><strong>步驟 3：執行 MQ 切換。</strong></p>
<div class="alert note">
<p>請確保目標 Pulsar 中不包含來自先前配置的 Milvus 主題。若這是您首次切換至 Pulsar，請跳過此說明；否則請先清理同名的殘留 Milvus 主題。</p>
</div>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>步驟 4：驗證切換是否完成。</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>若切換成功，系統會記錄<code translate="no">[mqTypeValue=pulsar]</code> 。</p>
<p><strong>步驟 5：（可選）清理 Woodpecker 資料。</strong>刪除 MinIO/S3 上的 Woodpecker 資料（位於<code translate="no">&lt;rootPath&gt;/wp/...</code> 目錄下，通常為<code translate="no">files/wp/...</code> ）以及 etcd 中的 Woodpecker 元資料（<code translate="no">etcdctl get woodpecker --prefix</code> ）。若您計劃日後切換回 Woodpecker，請先清理這些檔案。</p>
<h2 id="Supported-scenarios" class="common-anchor-header">支援的情境<button data-href="#Supported-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>來源 MQ</th><th>目標 MQ</th><th>Helm</th><th>Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>內建 Pulsar</td><td>Woodpecker (MinIO)</td><td><strong>已支援</strong></td><td><strong>已支援</strong></td></tr>
<tr><td>外部 Pulsar</td><td>Woodpecker (MinIO)</td><td><strong>受支援</strong></td><td><strong>受支援</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>外部 Pulsar</td><td><strong>已支援</strong></td><td><strong>受支援</strong></td></tr>
<tr><td>Pulsar</td><td>Woodpecker（本地）</td><td><strong>支援但不建議使用</strong>（所有 Pod 都需要共用檔案系統）</td><td><strong>不支援</strong></td></tr>
</tbody>
</table>
