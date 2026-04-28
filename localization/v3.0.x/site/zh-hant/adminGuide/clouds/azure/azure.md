---
id: azure.md
title: 使用 Kubernetes 在 Microsoft Azure 上部署 Milvus
related_key: cluster
summary: 瞭解如何在 Azure 上部署 Milvus 群集。
---
<h1 id="Deploy-Milvus-on-Azure-with-AKS" class="common-anchor-header">使用 AKS 在 Azure 上部署 Milvus<button data-href="#Deploy-Milvus-on-Azure-with-AKS" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題描述如何使用<a href="https://azure.microsoft.com/en-us/services/kubernetes-service/#overview">Azure Kubernetes Service</a>(AKS) 和<a href="https://portal.azure.com">Azure 入口網站</a>佈建和建立叢集。</p>
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
    </button></h2><p>確保您的 Azure 專案已設定妥當，且您有存取要使用的資源的權限。如果您不確定您的存取權限，請聯絡您的管理員。</p>
<h2 id="Software-requirements" class="common-anchor-header">軟體需求<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
<li><a href="https://docs.microsoft.com/en-us/cli/azure/install-azure-cli#install">Azure CLI</a></li>
<li><a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a></li>
<li><a href="https://helm.sh/docs/intro/install/">Helm</a></li>
</ul>
<p>或者，您可以使用預先安裝了 Azure CLI、kubectl 和 Helm 的<a href="https://learn.microsoft.com/en-us/azure/cloud-shell/overview">Cloud Shell</a>。</p>
<div class="alert note">安裝 Azure CLI 之後，請確認已正確驗證。 </div>
<h2 id="Provision-a-Kubernetes-cluster" class="common-anchor-header">佈建 Kubernetes 叢集<button data-href="#Provision-a-Kubernetes-cluster" class="anchor-icon" translate="no">
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
<li>登入 Azure 入口網站。</li>
<li>在 Azure 入口網站功能表上或從<strong>首頁</strong>，選擇<strong>建立資源</strong>。</li>
<li>選擇<strong>容器</strong>&gt;<strong>Kubernetes 服務</strong>。</li>
<li>在<strong>Basics</strong>頁面上，設定下列選項：</li>
</ol>
<ul>
<li><p><strong>專案詳細資訊</strong>：</p>
<ul>
<li><p><strong>訂閱</strong>：請聯絡您組織的 Azure 管理員，以確定您應該使用的訂閱。</p>
<ul>
<li><strong>資源群組</strong>：聯繫您組織的 Azure 管理員，以確定應該使用哪個資源群組。</li>
</ul></li>
</ul></li>
<li><p><strong>群集詳細資訊</strong>：</p>
<ul>
<li><p><strong>Kubernetes 群集名稱</strong>：輸入群集名稱。</p></li>
<li><p><strong>區域</strong>：選擇一個區域。</p></li>
<li><p><strong>可用性區域</strong>：根據需要選擇<a href="https://docs.microsoft.com/en-us/azure/aks/availability-zones#overview-of-availability-zones-for-aks-clusters">可用性區域</a>。對於生產群集，建議您選擇多個可用性區域。</p></li>
</ul></li>
<li><p><strong>主要節點池</strong>：</p>
<ul>
<li><p><strong>節點大小</strong>：我們建議您選擇最低 16 GB 記憶體的虛擬機器，但您也可以根據需要選擇虛擬機器大小。</p></li>
<li><p><strong>擴充方式</strong>：選擇擴充方式。</p></li>
<li><p><strong>節點數量範圍</strong>：選擇節點數的範圍。</p></li>
</ul></li>
<li><p><strong>節點池</strong>：</p>
<ul>
<li><p><strong>Enable virtual nodes（啟用虛擬節點</strong>）：選取核取方塊以啟用虛擬節點。</p></li>
<li><p><strong>啟用虛擬機器規模集</strong>：建議您選擇<code translate="no">enabled</code> 。</p></li>
</ul></li>
<li><p><strong>網路</strong>：</p>
<ul>
<li><p><strong>網路組態</strong>：我們建議您選擇<code translate="no">Kubenet</code> 。</p></li>
<li><p><strong>DNS 名稱前綴</strong>：輸入 DNS 名稱前綴。</p></li>
<li><p><strong>流量路由</strong>：</p>
<ul>
<li><p><strong>負載平衡器</strong>：<code translate="no">Standard</code> 。</p></li>
<li><p><strong>HTTP 應用程式路由</strong>：不需要。</p></li>
</ul></li>
</ul></li>
</ul>
<ol start="5">
<li>設定選項後，按一下<strong>檢閱 + 建立</strong>，驗證完成後再按一下<strong>建立</strong>。建立群集需要幾分鐘時間。</li>
</ol>
<h2 id="Connect-to-the-cluster" class="common-anchor-header">連接至群集<button data-href="#Connect-to-the-cluster" class="anchor-icon" translate="no">
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
<li>導覽到您在 Kubernetes 服務中建立的群集，然後按一下它。</li>
<li>在左側導覽窗格中，按一下<code translate="no">Overview</code> 。</li>
<li>在顯示的「<strong>總覽</strong>」頁面上，按一下「<strong>連線」</strong>以檢視資源群組和訂閱。</li>
</ol>
<h2 id="Set-a-subscription-and-credentials" class="common-anchor-header">設定訂閱和憑證<button data-href="#Set-a-subscription-and-credentials" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">您可以使用 Azure Cloud Shell 執行下列程序。</div>
<ol>
<li>執行以下指令以設定訂閱。</li>
</ol>
<pre><code translate="no" class="language-shell">az account set --subscription EXAMPLE-SUBSCRIPTION-ID
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>執行下列指令下載憑證，並設定 Kubernetes CLI 以使用憑證。</li>
</ol>
<pre><code translate="no" class="language-shell">az aks get-credentials --resource-group YOUR-RESOURCE-GROUP --name YOUR-CLUSTER-NAME
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
使用相同的 shell 執行下列程序。如果切換到其他 shell，請重新執行前面的指令。</div>
<h2 id="Using-Azure-Blob-Storage-as-external-object-storage" class="common-anchor-header">使用 Azure Blob Storage 作為外部物件儲存<button data-href="#Using-Azure-Blob-Storage-as-external-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Azure Blob Storage 是 AWS Simple Storage Service (S3) 的 Azure 版本。</p>
<ul>
<li>建立儲存帳戶和容器</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account create -n milvustesting1 -g MyResourceGroup -l eastus --sku Standard_LRS --min-tls-version TLS1_2
az storage container create -n testmilvus --account-name milvustesting1
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>取得秘鑰，使用第一個值</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account keys list --account-name milvustesting2
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>新增 values.yaml</li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">cluster:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>

<span class="hljs-attr">service:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">LoadBalancer</span>

<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    common:
      storageType: remote
</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>

<span class="hljs-attr">externalS3:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">host:</span> <span class="hljs-string">core.windows.net</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">443</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">testmilvus</span> <span class="hljs-comment"># the storage account container name</span>
  <span class="hljs-attr">cloudProvider:</span> <span class="hljs-string">azure</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">accessKey:</span> <span class="hljs-string">&quot;milvustesting1&quot;</span> <span class="hljs-comment"># the storage account name</span>
  <span class="hljs-attr">secretKey:</span> <span class="hljs-string">&quot;&lt;secret-key&gt;&quot;</span> 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Milvus" class="common-anchor-header">部署 Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>現在 Kubernetes 叢集已準備就緒。讓我們馬上部署 Milvus。</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update
helm install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>在前面的指令中，我們在本機新增 Milvus Helm 圖表的 repo，並更新 repo 以取得最新的圖表。然後，我們安裝一個 Milvus 實例，並命名為<strong>my-release</strong>。</p>
<p>請注意配置<code translate="no">service.type</code> 的值，它表示我們希望透過 Layer-4 負載平衡器揭露 Milvus 實例。</p>
<h2 id="Verify-the-deployment" class="common-anchor-header">驗證部署<button data-href="#Verify-the-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>所有 pod 都執行後，執行下列指令以取得外部 IP 位址。</p>
<pre><code translate="no" class="language-bash">kubectl get services|grep my-release-milvus|grep LoadBalancer|awk <span class="hljs-string">&#x27;{print $4}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Hello-Milvus" class="common-anchor-header">你好 Milvus<button data-href="#Hello-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>請參考<a href="https://milvus.io/docs/v2.3.x/example_code.md">Hello Milvus</a>，將 host 值變更為外部 IP 位址，然後執行程式碼。</p>
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
    </button></h2><p>如果您想學習如何在其他雲端部署 Milvus：</p>
<ul>
<li><a href="/docs/zh-hant/eks.md">使用 Kubernetes 在 AWS 上部署 Milvus 叢集</a></li>
<li><a href="/docs/zh-hant/gcp.md">使用 Kubernetes 在 GCP 上部署 Milvus Cluster</a></li>
</ul>
