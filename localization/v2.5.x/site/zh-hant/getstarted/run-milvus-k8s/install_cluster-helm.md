---
id: install_cluster-helm.md
label: Helm
related_key: Kubernetes
summary: 學習如何在 Kubernetes 上安裝 Milvus 叢集。
title: 使用 Helm 安裝 Milvus 集群
---
<h1 id="Run-Milvus-in-Kubernetes-with-Helm" class="common-anchor-header">使用 Helm 在 Kubernetes 中執行 Milvus<button data-href="#Run-Milvus-in-Kubernetes-with-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁說明如何使用 Milvus<a href="https://github.com/zilliztech/milvus-helm">Helm 圖表</a>在 Kubernetes 中啟動 Milvus 實例。</p>
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
    </button></h2><p>Helm 使用一種稱為圖表的封裝格式。圖表是描述相關 Kubernetes 資源集的檔案集合。Milvus 提供了一組圖表來幫助您部署 Milvus 的相依性和元件。</p>
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
<li><p><a href="/docs/zh-hant/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">建立 K8s 集群</a>。</p></li>
<li><p>安裝<a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>。您可以按以下步驟檢查已安裝的 StorageClass。</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>安裝前檢查<a href="/docs/zh-hant/prerequisite-helm.md">硬體和軟體需求</a>。</p></li>
<li><p>在安裝 Milvus 之前，建議使用<a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a>根據您的資料大小來估計硬體需求。這有助於確保 Milvus 安裝的最佳性能和資源分配。</p></li>
</ul>
<div class="alert note">
<p>如果您在拉動映像時遇到任何問題，請聯繫我們<a href="mailto:community@zilliz.com">community@zilliz.com</a>，並提供有關問題的詳細資訊，我們將為您提供必要的支援。</p>
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
    </button></h2><p>在安裝 Milvus Helm Charts 之前，您需要新增 Milvus Helm repository。</p>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>位於<code translate="no">https://github.com/milvus-io/milvus-helm</code> 的 Milvus Helm Charts repo 已經歸檔，您可以從<code translate="no">https://github.com/zilliztech/milvus-helm</code> 取得進一步的更新，如下所示：</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>存檔的 repo 仍可使用於 4.0.31 之前的圖表。對於之後的版本，請使用新的 repo。</p>
</div>
<p>然後從儲存庫取得 Milvus 圖表，如下所示：</p>
<pre><code translate="no">$ helm repo update
<button class="copy-code-btn"></button></code></pre>
<p>您可以隨時執行這個指令來取得最新的 Milvus Helm 圖表。</p>
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1.部署 Milvus 集群</h3><p>安裝 Helm 圖表後，您就可以在 Kubernetes 上啟動 Milvus。本節將引導您完成啟動 Milvus 的步驟。</p>
<pre><code translate="no" class="language-shell">$ helm install my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>在上述指令中，<code translate="no">my-release</code> 是發行版名稱，而<code translate="no">milvus/milvus</code> 是本機安裝的圖表儲存庫。若要使用其他名稱，請將<code translate="no">my-release</code> 替換為您認為合適的名稱。</p>
<p>上面的命令使用預設配置部署 Milvus 叢集及其元件和相依性。要自訂這些設定，我們建議您使用<a href="https://milvus.io/tools/sizing">Milvus 大小</a>調整<a href="https://milvus.io/tools/sizing">工具</a>，根據您的實際資料大小調整配置，然後下載相應的 YAML 檔案。要瞭解有關配置參數的更多資訊，請參閱<a href="https://milvus.io/docs/system_configuration.md">Milvus 系統配置清單</a>。</p>
<div class="alert note">
  <ul>
    <li>版本名稱只能包含字母、數字和破折號。版本名稱中不允許使用點。</li>
    <li>使用 Helm 安裝 Milvus 時，預設命令列會安裝群集版本的 Milvus。獨立安裝 Milvus 時需要進一步設定。</li>
    <li>根據<a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">Kubernetes 的廢棄 API 移轉指南</a>，PodDisruptionBudget 的<b>policy/v1beta1</b>API 版本自 v1.25 起不再提供服務。建議您遷移艙單和 API 用戶端，改用<b>policy/v1</b>API 版本。<br/>對於仍在 Kubernetes v1.25 及更新版本上使用 PodDisruptionBudget 的<b>policy/v1beta1</b>API 版本的使用者，作為變通方案，您可以執行下列指令來安裝 Milvus：<br/> <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
    <li>請參閱<a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a>和<a href="https://helm.sh/docs/">Helm</a>以取得更多資訊。</li>
  </ul>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2.檢查 Milvus 群集狀態</h3><p>執行下列指令來檢查 Milvus 叢集中所有 Pod 的狀態。</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre>
<p>一旦所有 pod 都在運行，上述命令的輸出應該與下面相似：</p>
<pre><code translate="no">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                1/1    Running   0        3m23s
my-release-etcd-1                                1/1    Running   0        3m23s
my-release-etcd-2                                1/1    Running   0        3m23s
my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        3m23s
my-release-milvus-indexnode-5c5f7b5bd9-l8hjg     1/1    Running   0        3m24s
my-release-milvus-mixcoord-7fb9488465-dmbbj      1/1    Running   0        3m23s
my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        3m24s
my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        3m24s
my-release-minio-0                               1/1    Running   0        3m23s
my-release-minio-1                               1/1    Running   0        3m23s
my-release-minio-2                               1/1    Running   0        3m23s
my-release-minio-3                               1/1    Running   0        3m23s
my-release-pulsar-autorecovery-86f5dbdf77-lchpc  1/1    Running   0        3m24s
my-release-pulsar-bookkeeper-0                   1/1    Running   0        3m23s
my-release-pulsar-bookkeeper-1                   1/1    Running   0        98s
my-release-pulsar-broker-556ff89d4c-2m29m        1/1    Running   0        3m23s
my-release-pulsar-proxy-6fbd75db75-nhg4v         1/1    Running   0        3m23s
my-release-pulsar-zookeeper-0                    1/1    Running   0        3m23s
my-release-pulsar-zookeeper-metadata-98zbr       0/1   Completed  0        3m24s
<button class="copy-code-btn"></button></code></pre>
<p>您也可以存取 Milvus WebUI，網址是<code translate="no">http://127.0.0.1:9091/webui/</code> ，以瞭解更多關於您的 Milvus 實例的資訊。詳情請參閱<a href="/docs/zh-hant/milvus-webui.md">Milvus WebUI</a>。</p>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3.將本機連接埠轉送至 Milvus</h3><p>執行下列指令，取得 Milvus 叢集服務的連接埠。</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-6b</span>d7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>輸出顯示 Milvus 實例在預設的<strong>19530</strong> 連接埠提供服務。</p>
<div class="alert note">
<p>如果您以獨立模式部署 Milvus，請將 Pod 名稱從<code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> 改為<code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code> 。</p>
</div>
<p>然後執行下列指令，將本機連接埠轉寄到 Milvus 服務的連接埠。</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>您可以選擇在上述指令中使用<code translate="no">:19530</code> 而不是<code translate="no">27017:19530</code> ，讓<code translate="no">kubectl</code> 替您分配一個本機連接埠，這樣您就不必管理連接埠衝突。</p>
<p>預設情況下，kubectl 的連接埠轉發只會在<code translate="no">localhost</code> 上監聽。如果您希望 Milvus 監聽選定或所有的 IP 位址，請使用<code translate="no">address</code> 。以下指令會使 port-forward 在主機上的所有 IP 位址上聆聽。</p>
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
    </button></h2><p>Milvus 隨附一個內建的 GUI 工具，稱為 Milvus WebUI，您可以透過瀏覽器存取。Milvus Web UI 以簡單直觀的介面增強系統的可觀察性。您可以使用 Milvus Web UI 觀察 Milvus 元件和相依性的統計和指標、檢查資料庫和收集的詳細資訊，以及列出 Milvus 的詳細配置。有關 Milvus Web UI 的詳細資訊，請參閱<a href="/docs/zh-hant/milvus-webui.md">Milvus WebUI</a>。</p>
<p>要啟用對 Milvus Web UI 的存取，您需要將代理 pod 的連接埠轉發到本機連接埠。</p>
<pre><code translate="no" class="language-shell">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27018</span>:<span class="hljs-number">9091</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27018</span> -&gt; <span class="hljs-number">9091</span>
<button class="copy-code-btn"></button></code></pre>
<p>現在，您可以存取 Milvus Web UI，網址是<code translate="no">http://localhost:27018</code> 。</p>
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
    </button></h2><p>如果您處在網路受限的環境，請依照本節的步驟啟動 Milvus 叢集。</p>
<h3 id="1-Get-Milvus-manifest" class="common-anchor-header">1.取得 Milvus 清單</h3><p>執行下列命令取得 Milvus 清單。</p>
<pre><code translate="no" class="language-shell">$ helm template my-release milvus/milvus &gt; milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>上述命令會渲染 Milvus 叢集的圖表模板，並將輸出保存到一個名為<code translate="no">milvus_manifest.yaml</code> 的艙單檔案中。使用此清單，您可以在獨立的 Pod 中安裝 Milvus 叢集及其元件和相依性。</p>
<div class="alert note">
<ul>
<li>若要在單機模式下安裝 Milvus 實例，即所有 Milvus 元件都包含在單一 pod 中，您應該執行<code translate="no">helm template my-release --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsar.enabled=false milvus/milvus &gt; milvus_manifest.yaml</code> 來渲染單機模式下 Milvus 實例的圖表模板。</li>
<li>要變更 Milvus 配置，下載 <a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml"><code translate="no">value.yaml</code></a>範本，將您所需的設定放入其中，並使用<code translate="no">helm template -f values.yaml my-release milvus/milvus &gt; milvus_manifest.yaml</code> 來渲染相應的艙單。</li>
</ul>
</div>
<h3 id="2-Download-image-pulling-script" class="common-anchor-header">2.下載影像拉取腳本</h3><p>image-pulling script 是用 Python 開發的。您應該在<code translate="no">requirement.txt</code> 檔案中下載腳本及其相依性。</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt</span>
$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Pull-and-save-images" class="common-anchor-header">3.拉取並儲存影像</h3><p>執行下列指令來拉取並儲存所需的影像。</p>
<pre><code translate="no" class="language-shell">$ pip3 install -r requirements.txt
$ python3 save_image.py --manifest milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>圖片會拉取到目前目錄中名為<code translate="no">images</code> 的子資料夾。</p>
<h3 id="4-Load-images" class="common-anchor-header">4.載入影像</h3><p>現在您可以按照下列步驟，將影像載入網路受限環境中的主機：</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> $(find . -<span class="hljs-built_in">type</span> f -name <span class="hljs-string">&quot;*.tar.gz&quot;</span>) ; <span class="hljs-keyword">do</span> gunzip -c <span class="hljs-variable">$image</span> | docker load; <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="5-Deploy-Milvus" class="common-anchor-header">5.部署 Milvus</h3><pre><code translate="no" class="language-shell">$ kubectl apply -f milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>到現在為止，您可以依照線上安裝的步驟<a href="#2-Check-Milvus-cluster-status">2</a>和<a href="#3-Forward-a-local-port-to-Milvus">3</a>檢查群集狀態，並將本機連接埠轉寄給 Milvus。</p>
<h2 id="Upgrade-running-Milvus-cluster" class="common-anchor-header">升級正在運行的 Milvus 集群<button data-href="#Upgrade-running-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>執行以下指令，將正在運行的 Milvus 集群升級到最新版本：</p>
<pre><code translate="no" class="language-shell">$ helm repo update
$ helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">卸載 Milvus<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>執行以下命令卸載 Milvus。</p>
<pre><code translate="no" class="language-bash">$ helm uninstall my-release
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
    </button></h2><p>在 Docker 中安裝 Milvus 後，您可以</p>
<ul>
<li><p>檢查<a href="/docs/zh-hant/quickstart.md">Hello Milvus</a>，看看 Milvus 可以做什麼。</p></li>
<li><p>學習 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh-hant/manage_databases.md">管理資料庫</a></li>
<li><a href="/docs/zh-hant/manage-collections.md">管理資料集</a></li>
<li><a href="/docs/zh-hant/manage-partitions.md">管理分割區</a></li>
<li><a href="/docs/zh-hant/insert-update-delete.md">插入、倒置和刪除</a></li>
<li><a href="/docs/zh-hant/single-vector-search.md">單向量搜尋</a></li>
<li><a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a></li>
</ul></li>
<li><p><a href="/docs/zh-hant/upgrade_milvus_cluster-helm.md">使用 Helm Chart 升級 Milvus</a>。</p></li>
<li><p><a href="/docs/zh-hant/scaleout.md">擴充您的 Milvus 集群</a>。</p></li>
<li><p>在雲端部署您的 Milvus 叢集：</p>
<ul>
<li><a href="/docs/zh-hant/eks.md">亞馬遜 EKS</a></li>
<li><a href="/docs/zh-hant/gcp.md">谷歌雲</a></li>
<li><a href="/docs/zh-hant/azure.md">微軟 Azure</a></li>
</ul></li>
<li><p>探索<a href="/docs/zh-hant/milvus-webui.md">Milvus WebUI</a>，Milvus 可觀察與管理的直覺式網頁介面。</p></li>
<li><p>探索<a href="/docs/zh-hant/milvus_backup_overview.md">Milvus 備份</a>，Milvus 資料備份的開放原始碼工具。</p></li>
<li><p>探索<a href="/docs/zh-hant/birdwatcher_overview.md">Birdwatcher</a>，用於調試 Milvus 和動態組態更新的開放原始碼工具。</p></li>
<li><p>探索<a href="https://milvus.io/docs/attu.md">Attu</a>，一個開放源碼 GUI 工具，用於直觀的 Milvus 管理。</p></li>
<li><p><a href="/docs/zh-hant/monitor.md">使用 Prometheus 監控 Milvus</a>。</p></li>
</ul>
