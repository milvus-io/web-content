---
id: install_cluster-helm.md
label: Helm
related_key: Kubernetes
summary: 了解如何在 Kubernetes 上安裝 Milvus 叢集。
title: 使用 Helm 安裝 Milvus 叢集
---
<h1 id="Run-Milvus-in-Kubernetes-with-Helm" class="common-anchor-header">使用 Helm 在 Kubernetes 中運行 Milvus<button data-href="#Run-Milvus-in-Kubernetes-with-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁面說明如何使用<a href="https://github.com/zilliztech/milvus-helm">Milvus Helm 圖表在</a> Kubernetes 中啟動 Milvus 實例。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Helm 使用一種稱為「charts」的封裝格式。charts 是一組檔案的集合，用於描述一組相關的 Kubernetes 資源。Milvus 提供了一組 charts，以協助您部署 Milvus 的依賴項與組件。</p>
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
<li><p><a href="https://helm.sh/docs/intro/install/">安裝 Helm CLI</a>。</p></li>
<li><p><a href="/docs/zh-hant/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">建立一個 K8s 叢集</a>。</p></li>
<li><p>安裝<a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>。您可以透過以下方式檢查已安裝的 StorageClass。</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>安裝前請<a href="/docs/zh-hant/prerequisite-helm.md">先確認硬體與軟體需求</a>。</p></li>
<li><p>在安裝 Milvus 之前，建議使用<a href="https://milvus.io/tools/sizing">Milvus 規格規劃工具，</a>根據您的資料量估算硬體需求。這有助於確保您的 Milvus 安裝能獲得最佳效能與資源分配。</p></li>
</ul>
<div class="alert note">
<p>若在拉取映像檔時遇到任何問題，請透過<a href="mailto:community@zilliz.com">community@zilliz.com</a>聯絡我們，並提供問題詳情，我們將為您提供必要的支援。</p>
</div>
<h2 id="Install-Milvus-Helm-Chart" class="common-anchor-header">安裝 Milvus Helm Chart<button data-href="#Install-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>在安裝 Milvus Helm Chart 之前，您需要新增 Milvus Helm 儲存庫。</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>位於<code translate="no">https://github.com/milvus-io/milvus-helm</code> 的 Milvus Helm Charts 儲存庫已歸檔。我們現在使用位於<code translate="no">https://github.com/zilliztech/milvus-helm</code> 的新儲存庫。歸檔的儲存庫仍可提供 4.0.31 及更早版本的圖表，但後續版本請使用新儲存庫。</p>
</div>
<p>接著請依照以下步驟從儲存庫取得 Milvus Helm Charts：</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>helm repo update
<button class="copy-code-btn"></button></code></pre>
<p>您可以隨時執行此指令來取得最新的 Milvus Helm 圖表。</p>
<h2 id="Online-install" class="common-anchor-header">線上安裝<button data-href="#Online-install" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. 部署 Milvus 叢集<button data-href="#1-Deploy-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h3><p>安裝 Helm 圖表後，即可在 Kubernetes 上啟動 Milvus。本節將引導您部署 Milvus 叢集。</p>
<div class="alert note" id="standalone-deployment-note">
<p><strong>需要獨立部署嗎？</strong></p>
<p>若您希望以獨立模式（單節點）部署 Milvus 進行開發或測試，請使用以下指令：</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>注意</strong>：獨立模式預設使用 Woodpecker 作為訊息佇列，並啟用「串流節點」（Streaming Node）元件。獨立部署會將 Woodpecker<strong>內嵌於</strong>Milvus Pod 中執行；專用的 Woodpecker<strong>服務</strong>（獨立 Pod）僅<strong>適用於分散式／叢集部署</strong>。詳細資訊請參閱《<a href="/docs/zh-hant/architecture_overview.md">架構概覽</a>》及<a href="/docs/zh-hant/woodpecker.md">《Woodpecker》</a>。</p>
</div>
<p><strong>部署 Milvus 叢集：</strong></p>
<p>以下命令將部署一個針對 v3.0-beta 進行過最佳化設定的 Milvus 叢集，並使用 Woodpecker 作為推薦的訊息佇列：</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> woodpecker.image.tag=v0.1.36 \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.woodpecker.embedded=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>此指令的功能：</strong></p>
<ul>
<li>使用<strong>Woodpecker</strong>作為訊息佇列（建議採用以減少維護工作）</li>
<li>將<strong>Woodpecker 作為專用服務</strong>（獨立的 StatefulSet）運行，而非嵌入至串流節點中</li>
<li>啟用新的「<strong>串流節點</strong>」元件以提升效能</li>
<li>停用舊版<strong>索引節點</strong>（相關功能現由資料節點處理）</li>
</ul>
<div class="alert note">
<p><strong>Milvus 2.6.x 中的架構變更：</strong></p>
<ul>
<li><strong>訊息佇列</strong>：現建議使用<strong>Woodpecker</strong>（相較於 Pulsar，可減少基礎架構維護工作）</li>
<li><strong>新元件</strong>：引入「<strong>串流節點</strong>」，並預設啟用</li>
<li><strong>整合的元件</strong>：<strong>索引節點</strong>與<strong>資料節點</strong>已合併為單一的<strong>資料節點</strong></li>
</ul>
<p>完整的架構詳情，請參閱《<a href="/docs/zh-hant/architecture_overview.md">架構概覽</a>》。</p>
</div>
<p><strong>替代訊息佇列：</strong>若要使用 Pulsar、Kafka 或 RocksMQ 取代 Woodpecker 進行部署，請參閱「<a href="#Optional-dependencies">可選依賴項</a>」。</p>
<p><strong>後續步驟：</strong>
上述指令會以建議的設定部署 Milvus。若要投入生產環境使用：</p>
<ul>
<li>請使用<a href="https://milvus.io/tools/sizing">Milvus 規模規劃工具</a>，根據您的資料量來優化設定</li>
<li>請參閱《<a href="https://milvus.io/docs/system_configuration.md">Milvus 系統配置檢查清單</a>》以了解進階配置選項</li>
</ul>
<div class="alert note">
<p><strong>重要注意事項：</strong></p>
<ul>
<li><strong>發行版命名規則</strong>：僅可使用字母、數字和連字號（不允許使用點號）</li>
</ul>
<p>如需更多資訊，請參閱<a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a>及<a href="https://helm.sh/docs/">Helm 文件</a>。</p>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. 檢查 Milvus 叢集狀態<button data-href="#2-Check-Milvus-cluster-status" class="anchor-icon" translate="no">
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
    </button></h3><p>透過檢查 Pod 狀態來確認部署是否成功：</p>
<pre><code translate="no" class="language-bash">kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p><strong>請等待所有 Pod 顯示「Running」狀態。</strong>採用 v3.0-beta 配置時，您應會看到類似以下的 Pod 狀態：</p>
<pre><code translate="no">NAME                                             READY  STATUS   RESTARTS  AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-1</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-2</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-68</span>cb87dcbd<span class="hljs-number">-4</span>khpm      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>mixcoord<span class="hljs-number">-7</span>fb9488465<span class="hljs-operator">-</span>dmbbj      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-6</span>bd7f5587<span class="hljs-operator">-</span>ds2xv          <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-5</span>cd8fff495<span class="hljs-operator">-</span>k6gtg     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>streamingnode<span class="hljs-number">-7</span>b8cfc769c<span class="hljs-operator">-</span>mqmsm  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>woodpecker<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>woodpecker<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>woodpecker<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>woodpecker<span class="hljs-number">-3</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-3</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
<button class="copy-code-btn"></button></code></pre>
<p><strong>需驗證的關鍵元件：</strong></p>
<ul>
<li><strong>Milvus 元件</strong>：<code translate="no">mixcoord</code> 、<code translate="no">datanode</code> 、<code translate="no">querynode</code> 、<code translate="no">proxy</code> 、<code translate="no">streamingnode</code></li>
<li><strong>依賴項</strong>：<code translate="no">etcd</code> （元資料）、<code translate="no">minio</code> （物件儲存）、<code translate="no">woodpecker</code> （訊息佇列）</li>
</ul>
<div class="alert note">
<p>透過<code translate="no">streaming.woodpecker.embedded=false</code> ，Woodpecker<strong>會以專用的 StatefulSet</strong>形式運行（<code translate="no">my-release-milvus-woodpecker</code> ，預設為 4 個複本——3 個節點的法定人數加上 1 個備用節點以確保容錯； 請勿將<code translate="no">woodpecker.replicaCount</code> 設定為低於 3）並由無頭服務作為前端，採用 MinIO 作為儲存後端——因此該叢集擁有獨立於串流節點的<code translate="no">woodpecker</code> Pod 集合。</p>
</div>
<p>設定完畢端口轉發後（請參閱下一步），您亦可透過<code translate="no">http://127.0.0.1:9091/webui/</code> 存取<strong>Milvus WebUI</strong>。詳細資訊請參閱<a href="/docs/zh-hant/milvus-webui.md">Milvus WebUI</a>。</p>
<h3 id="3-Connect-to-Milvus" class="common-anchor-header">3. 連線至 Milvus<button data-href="#3-Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>若要從 Kubernetes 外部連線至您的 Milvus 叢集，您需要設定端口轉發。</p>
<p><strong>設定端口轉發：</strong></p>
<pre><code translate="no" class="language-bash">kubectl port-forward service/my-release-milvus 27017:19530
<button class="copy-code-btn"></button></code></pre>
<p>此指令會將您的本地端埠<code translate="no">27017</code> 轉發至 Milvus 埠<code translate="no">19530</code> 。您應會看到：</p>
<pre><code translate="no"><span class="hljs-attribute">Forwarding</span> from <span class="hljs-number">127.0.0.1:27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>連線詳細資訊：</strong></p>
<ul>
<li><strong>本地端連接</strong>：<code translate="no">localhost:27017</code></li>
<li><strong>Milvus 預設埠</strong>：<code translate="no">19530</code></li>
</ul>
<div class="alert note">
<p><strong>端口轉發選項：</strong></p>
<ul>
<li><strong>自動指派本地端口</strong>：使用<code translate="no">:19530</code> 取代<code translate="no">27017:19530</code> ，讓 kubectl 自行選擇可用端口</li>
<li><strong>監聽所有介面</strong>：新增<code translate="no">--address 0.0.0.0</code> 以允許其他機器建立連線：
<pre><code translate="no" class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530
<button class="copy-code-btn"></button></code></pre></li>
<li><strong>獨立部署</strong>：若使用獨立模式，服務名稱保持不變</li>
</ul>
</div>
<p>使用 Milvus 期間<strong>請保持此終端機開啟</strong>。現在您可以透過任何 Milvus SDK 連線至<code translate="no">localhost:27017</code> 來存取 Milvus。</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">（可選）更新 Milvus 設定<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以透過編輯<code translate="no">values.yaml</code> 檔案並重新套用，來更新 Milvus 叢集的設定。</p>
<ol>
<li><p>建立一個包含所需設定的<code translate="no">values.yaml</code> 檔案。</p>
<p>以下假設您希望啟用<code translate="no">proxy.http</code> 。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    proxy:
      http:
        enabled: true
</span><button class="copy-code-btn"></button></code></pre>
<p>有關適用的設定項目，請參閱「<a href="/docs/zh-hant/system_configuration.md">系統設定</a>」。</p></li>
<li><p>套用<code translate="no">values.yaml</code> 檔案。</p></li>
</ol>
<pre><code translate="no" class="language-shell">helm upgrade my-release zilliztech/milvus --namespace my-namespace -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<ol>
<li><p>檢查已更新的設定。</p>
<pre><code translate="no" class="language-shell">helm get values my-release
<button class="copy-code-btn"></button></code></pre>
<p>輸出結果應顯示已更新的設定。</p></li>
</ol>
<h2 id="Access-Milvus-WebUI" class="common-anchor-header">存取 Milvus WebUI<button data-href="#Access-Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 內建名為「Milvus WebUI」的圖形化使用者介面工具，您可透過瀏覽器存取。Milvus WebUI 透過簡單直覺的介面，提升系統的可觀察性。您可以使用 Milvus WebUI 觀察 Milvus 各元件及依賴項的統計資料與指標、檢查資料庫與收集的詳細資訊，並列出詳細的 Milvus 配置。 有關 Milvus WebUI 的詳細資訊，請參閱<a href="/docs/zh-hant/milvus-webui.md">Milvus WebUI</a></p>
<p>若要啟用對 Milvus WebUI 的存取，您需要將代理 Pod 進行端口轉發至本機端口。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27018:9091</span>
Forwarding from 0.0.0.0:27018 -&gt; 9091
<button class="copy-code-btn"></button></code></pre>
<p>現在，您可透過<code translate="no">http://localhost:27018</code> 存取 Milvus WebUI。</p>
<h2 id="Offline-install" class="common-anchor-header">離線安裝<button data-href="#Offline-install" class="anchor-icon" translate="no">
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
    </button></h2><p>若您身處網路受限環境，請依照本節的步驟啟動 Milvus 叢集。</p>
<h3 id="1-Get-Milvus-manifest" class="common-anchor-header">1. 取得 Milvus 配置檔<button data-href="#1-Get-Milvus-manifest" class="anchor-icon" translate="no">
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
    </button></h3><p>執行以下指令以取得 Milvus 配置檔。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm template my-release zilliztech/milvus &gt; milvus_manifest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>上述指令會為 Milvus 叢集渲染圖表範本，並將輸出結果儲存至名為<code translate="no">milvus_manifest.yaml</code> 的清單檔案中。透過此清單，您可以安裝一個 Milvus 叢集，其各組件與依賴項將分別置於不同的 Pod 中。</p>
<div class="alert note">
<ul>
<li>若要以獨立模式安裝 Milvus 實例（即所有 Milvus 元件均包含於單一 Pod 內），則應執行<code translate="no">helm template my-release --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsarv3.enabled=false --set standalone.messageQueue=woodpecker --set woodpecker.enabled=true --set streaming.enabled=true zilliztech/milvus &gt; milvus_manifest.yaml</code> ，以生成獨立模式下 Milvus 實例的圖表範本。</li>
<li>若要變更 Milvus 設定，請下載 <a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml"><code translate="no">value.yaml</code></a> 範本，在其中填入您所需的設定，並使用<code translate="no">helm template -f values.yaml my-release zilliztech/milvus &gt; milvus_manifest.yaml</code> 據此渲染 manifests 檔案。</li>
</ul>
</div>
<h3 id="2-Download-image-pulling-script" class="common-anchor-header">2. 下載映像拉取腳本<button data-href="#2-Download-image-pulling-script" class="anchor-icon" translate="no">
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
    </button></h3><p>映像拉取腳本以 Python 開發。您應一併下載該腳本及其在<code translate="no">requirement.txt</code> 檔案中的依賴項。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Pull-and-save-images" class="common-anchor-header">3. 拉取並儲存映像檔<button data-href="#3-Pull-and-save-images" class="anchor-icon" translate="no">
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
    </button></h3><p>執行以下指令以拉取並儲存所需的影像。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip3 install -r requirements.txt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">python3 save_image.py --manifest milvus_manifest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>圖片將被拉取至當前目錄下名為<code translate="no">images</code> 的子資料夾中。</p>
<h3 id="4-Load-images" class="common-anchor-header">4. 載入圖片<button data-href="#4-Load-images" class="anchor-icon" translate="no">
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
    </button></h3><p>現在您可以按照以下步驟，將影像載入至網路受限環境中的主機：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> $(find . -<span class="hljs-built_in">type</span> f -name <span class="hljs-string">&quot;*.tar.gz&quot;</span>) ; <span class="hljs-keyword">do</span> gunzip -c <span class="hljs-variable">$image</span> | docker load; <span class="hljs-keyword">done</span></span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="5-Deploy-Milvus" class="common-anchor-header">5. 部署 Milvus<button data-href="#5-Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f milvus_manifest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>至此，您可以依照線上安裝指南的步驟<a href="#2-Check-Milvus-cluster-status">2</a>和<a href="#3-Connect-to-Milvus">3，</a>檢查叢集狀態並將本地端埠轉發至 Milvus。</p>
<h2 id="Upgrade-running-Milvus-cluster" class="common-anchor-header">升級正在運行的 Milvus 叢集<button data-href="#Upgrade-running-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>執行以下指令，將您正在運行的 Milvus 叢集升級至最新版本：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release zilliztech/milvus --reset-then-reuse-values</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">解除安裝 Milvus<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>執行以下指令以解除安裝 Milvus。</p>
<pre><code translate="no" class="language-bash">$ helm uninstall my-release
<button class="copy-code-btn"></button></code></pre>
<h2 id="Optional-dependencies" class="common-anchor-header">可選的依賴項<button data-href="#Optional-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>此部署使用<strong>Woodpecker</strong>作為訊息佇列、<strong>etcd</strong>作為元資料儲存，以及<strong>MinIO</strong>作為物件儲存。若要使用其他訊息佇列，或連接外部物件儲存／元資料，請參閱：</p>
<ul>
<li>訊息佇列：<a href="/docs/zh-hant/woodpecker.md">Woodpecker</a>（預設）·<a href="/docs/zh-hant/mq_pulsar.md">Pulsar</a>·<a href="/docs/zh-hant/mq_kafka.md">Kafka</a>·<a href="/docs/zh-hant/mq_rocksmq.md">RocksMQ</a></li>
<li>物件儲存：<a href="/docs/zh-hant/deploy_s3.md">MinIO</a>（預設）·<a href="/docs/zh-hant/deploy_s3.md">AWS S3</a>·<a href="/docs/zh-hant/abs.md">Azure Blob</a>·<a href="/docs/zh-hant/gcs.md">GCP Cloud Storage</a>·<a href="/docs/zh-hant/deploy_s3.md">阿里雲 OSS</a>·<a href="/docs/zh-hant/deploy_s3.md">騰訊 COS</a>·<a href="/docs/zh-hant/deploy_s3.md">華為 OBS</a>·<a href="/docs/zh-hant/deploy_s3.md">S3 相容</a></li>
<li>元資料：<a href="/docs/zh-hant/deploy_etcd.md">etcd</a></li>
</ul>
<div class="alert note">
<p>Storage V3 預設為停用狀態。在使用依賴此功能的服務前，請先啟用它。有關需求與相容性考量，請參閱<a href="/docs/zh-hant/storage-v3.md">Storage V3</a>。</p>
</div>
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
    </button></h2><p>在 Docker 中安裝 Milvus 後，您可以：</p>
<ul>
<li><p>請參閱《<a href="/docs/zh-hant/quickstart.md">Hello Milvus</a>》以了解 Milvus 的功能。</p></li>
<li><p>學習 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh-hant/manage_databases.md">管理資料庫</a></li>
<li><a href="/docs/zh-hant/manage-collections.md">管理集合</a></li>
<li><a href="/docs/zh-hant/manage-partitions.md">管理分區</a></li>
<li><a href="/docs/zh-hant/insert-update-delete.md">插入、Upsert 與刪除</a></li>
<li><a href="/docs/zh-hant/single-vector-search.md">單向量搜尋</a></li>
<li><a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a></li>
</ul></li>
<li><p><a href="/docs/zh-hant/upgrade_milvus_cluster-helm.md">使用 Helm Chart 升級 Milvus</a>。</p></li>
<li><p><a href="/docs/zh-hant/scaleout.md">擴展您的 Milvus 叢集</a>。</p></li>
<li><p>在雲端部署您的 Milvus 叢集：</p>
<ul>
<li><a href="/docs/zh-hant/eks.md">Amazon EKS</a></li>
<li><a href="/docs/zh-hant/gcp.md">Google Cloud</a></li>
<li><a href="/docs/zh-hant/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>探索<a href="/docs/zh-hant/milvus-webui.md">Milvus WebUI</a>，這是專為 Milvus 可觀察性與管理設計的直覺式網頁介面。</p></li>
<li><p>探索<a href="/docs/zh-hant/milvus_backup_overview.md">Milvus Backup</a>，這是一款用於 Milvus 資料備份的開源工具。</p></li>
<li><p>探索<a href="/docs/zh-hant/birdwatcher_overview.md">Birdwatcher，這</a>是一款用於 Milvus 除錯與動態配置更新的開源工具。</p></li>
<li><p>探索<a href="https://github.com/zilliztech/attu">Attu，</a>這是一款用於直觀管理 Milvus 的開源 GUI 工具。</p></li>
<li><p><a href="/docs/zh-hant/monitor.md">透過 Prometheus 監控 Milvus</a>。</p></li>
</ul>
