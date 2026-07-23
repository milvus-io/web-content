---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: 瞭解如何使用 Milvus Operator 升級 Milvus 叢集。
title: 使用 Milvus Operator 升級 Milvus 叢集
---
<div class="tab-wrapper"><a href="/docs/zh-hant/v2.6.x/upgrade_milvus_cluster-operator.md" class='active '>Milvus</a><a href="/docs/zh-hant/v2.6.x/upgrade_milvus_cluster-helm.md" class=''>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">使用 Milvus Operator 升級 Milvus 叢集<button data-href="#Upgrade-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南說明如何使用 Milvus Operator 將您的 Milvus 叢集從 v2.5.x 升級至 v2.6.17。</p>
<h2 id="Before-you-start" class="common-anchor-header">開始之前<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-new-in-v2617" class="common-anchor-header">v2.6.17 的新功能<button data-href="#Whats-new-in-v2617" class="anchor-icon" translate="no">
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
    </button></h3><p>從 Milvus 2.5.x 升級至 2.6.17 涉及重大的架構變更：</p>
<ul>
<li><strong>協調器整合</strong>：舊版獨立的協調器（<code translate="no">dataCoord</code> 、<code translate="no">queryCoord</code> 、<code translate="no">indexCoord</code> ）已整合為單一<code translate="no">mixCoord</code></li>
<li><strong>新元件</strong>：導入「串流節點」（Streaming Node）以強化資料處理能力</li>
<li><strong>元件移除</strong>：已移除並整合<code translate="no">indexNode</code> </li>
</ul>
<p>此升級流程可確保順利遷移至新架構。有關架構變更的更多資訊，請參閱《<a href="/docs/zh-hant/v2.6.x/architecture_overview.md">Milvus 架構概覽</a>》。</p>
<h3 id="Requirements" class="common-anchor-header">需求<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>系統需求：</strong></p>
<ul>
<li>已透過 Milvus Operator 部署 Milvus 的 Kubernetes 叢集</li>
<li><code translate="no">kubectl</code> 並已設定可存取您的叢集</li>
<li>已安裝 Helm 3.x</li>
</ul>
<p><strong>相容性要求：</strong></p>
<ul>
<li>Milvus v2.6.0-rc1 與 v2.6.17<strong>不相容</strong>。不支援直接從候選版本進行升級。</li>
<li>若您目前正在運行 v2.6.0-rc1 且需要保留資料，請參閱<a href="https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997">此社群指南</a>以獲取遷移協助。</li>
<li>在升級至 v2.6.17 之前，您<strong>必須先</strong>升級至 v2.5.16 或更新版本，並啟用<code translate="no">mixCoord</code> 功能。</li>
</ul>
<p><strong>訊息佇列限制</strong>：升級至 Milvus v2.6.17 時，您必須維持當前的訊息佇列選項。升級過程中不支援在不同的訊息佇列系統之間切換。未來版本將支援變更訊息佇列系統。</p>
<h2 id="Upgrade-process" class="common-anchor-header">升級流程<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Upgrade-Milvus-Operator" class="common-anchor-header">步驟 1：升級 Milvus Operator<button data-href="#Step-1-Upgrade-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p>首先，將您的 Milvus Operator 升級至 v1.3.0：</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech-milvus-operator https://zilliztech.github.io/milvus-operator/
helm repo update zilliztech-milvus-operator
helm -n milvus-operator upgrade milvus-operator zilliztech-milvus-operator/milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>驗證 Operator 升級狀態：</p>
<pre><code translate="no" class="language-bash">kubectl -n milvus-operator get pods
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Upgrade-your-Milvus-cluster" class="common-anchor-header">步驟 2：升級您的 Milvus 叢集<button data-href="#Step-2-Upgrade-your-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="21-Check-current-coordinator-configuration" class="common-anchor-header">2.1 檢查當前協調器設定</h4><p>檢查您的叢集是否已使用<code translate="no">mixCoord</code> ：</p>
<pre><code translate="no" class="language-bash">kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>若您看到的是獨立的協調器 Pod（<code translate="no">datacoord</code> 、<code translate="no">querycoord</code> 、<code translate="no">indexcoord</code> ），則需在下一步中啟用<code translate="no">mixCoord</code> 。</p>
<h4 id="22-Upgrade-to-v2516-with-mixCoord" class="common-anchor-header">2.2 使用 mixCoord 升級至 v2.5.16</h4><div class="alert-note">
<p>若您的叢集已運行 v2.5.16 或更高版本，且已啟用<code translate="no">mixCoord</code> ，請跳過此步驟。</p>
</div>
<p>建立配置檔<code translate="no">milvusupgrade.yaml</code> 以啟用<code translate="no">mixCoord</code> 並升級至 v2.5.16：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>  <span class="hljs-comment"># Replace with your actual release name</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">mixCoord:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.16</span>
<button class="copy-code-btn"></button></code></pre>
<p>套用設定：</p>
<pre><code translate="no" class="language-bash">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge
<button class="copy-code-btn"></button></code></pre>
<p>等待完成：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Verify all pods are ready</span>
kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<h4 id="23-Upgrade-to-v2617" class="common-anchor-header">2.3 升級至 v2.6.17</h4><p>當 v2.5.16 成功運行且已啟用<code translate="no">mixCoord</code> 後，請升級至 v2.6.17：</p>
<p>更新您的設定檔（本範例中為<code translate="no">milvusupgrade.yaml</code> ）：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>  <span class="hljs-comment"># Replace with your actual release name</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.17</span>
<button class="copy-code-btn"></button></code></pre>
<p>套用最終升級：</p>
<pre><code translate="no" class="language-bash">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-upgrade" class="common-anchor-header">驗證升級<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>確認您的叢集是否已運行新版本：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check pod status</span>
kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>如需進一步支援，請參閱<a href="https://milvus.io/docs">Milvus 文件</a>或<a href="https://github.com/milvus-io/milvus/discussions">社群論壇</a>。</p>
