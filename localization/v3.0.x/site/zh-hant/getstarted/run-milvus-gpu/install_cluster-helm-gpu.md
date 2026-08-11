---
id: install_cluster-helm-gpu.md
label: Cluster (Helm)
related_key: Kubernetes
summary: 了解如何在 Kubernetes 上安裝 Milvus 叢集。
title: 使用 Helm Chart 執行具備 GPU 支援的 Milvus
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="common-anchor-header">使用 Helm Chart 執行具備 GPU 支援的 Milvus<button data-href="#Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁面說明如何透過 Helm Chart 啟動具備 GPU 支援的 Milvus 執行個體。</p>
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
    </button></h2><p>Helm 使用一種稱為「圖表」（charts）的封裝格式。 Chart 是一組檔案的集合，用於描述一組相關的 Kubernetes 資源。Milvus 提供了一組 Chart，以協助您部署 Milvus 的依賴項與元件。<a href="https://artifacthub.io/packages/helm/milvus-helm/milvus">Milvus Helm Chart</a>是一項解決方案，可透過 Helm 套件管理器在 Kubernetes (K8s) 叢集上初始化 Milvus 的部署。</p>
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
<li><p><a href="/docs/zh-hant/prerequisite-gpu.md#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes">建立一個具備 GPU 工作節點的 K8s 叢集</a>。</p></li>
<li><p>安裝<a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>。您可以透過以下方式檢查已安裝的 StorageClass。</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>安裝前請<a href="/docs/zh-hant/prerequisite-gpu.md">先確認硬體與軟體需求</a>。</p></li>
</ul>
<div class="alert note">
<p>若在拉取映像檔時遇到任何問題，請透過<a href="mailto:community@zilliz.com">community@zilliz.com</a>聯絡我們，並提供問題詳情，我們將為您提供必要的支援。</p>
</div>
<h2 id="Install-Helm-Chart-for-Milvus" class="common-anchor-header">安裝 Milvus 的 Helm Chart<button data-href="#Install-Helm-Chart-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Helm 是一款 K8s 套件管理工具，可協助您快速部署 Milvus。</p>
<ol>
<li>新增 Milvus Helm 儲存庫。</li>
</ol>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>位於<code translate="no">https://milvus-io.github.io/milvus-helm/</code> 的 Milvus Helm Charts 儲存庫已歸檔，您可透過<code translate="no">https://zilliztech.github.io/milvus-helm/</code> 取得後續更新，操作方式如下：</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-meta prompt_"># </span><span class="language-bash">upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>歸檔的儲存庫仍可提供 4.0.31 及更早版本的圖表。若需更新版，請改用新儲存庫。</p>
</div>
<ol start="2">
<li>在本地端更新 Charts。</li>
</ol>
<pre><code translate="no"><span class="hljs-variable">$ </span>helm repo update
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Milvus" class="common-anchor-header">啟動 Milvus<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>安裝 Helm 圖表後，即可在 Kubernetes 上啟動 Milvus。本節將引導您逐步完成啟用 GPU 支援的 Milvus 啟動步驟。</p>
<p>您應透過 Helm 啟動 Milvus，並指定發行版本名稱、圖表以及預期要變更的參數。在本指南中，我們使用<code translate="no">my-release</code> 作為發行版本名稱。若要使用不同的發行版本名稱，請將以下指令中的<code translate="no">my-release</code> 替換為您正在使用的名稱。</p>
<p>Milvus 允許您為 Milvus 指派一個或多個 GPU 裝置。</p>
<h3 id="1-Assign-a-single-GPU-device" class="common-anchor-header">1. 指派單一 GPU 裝置<button data-href="#1-Assign-a-single-GPU-device" class="anchor-icon" translate="no">
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
    </button></h3><p>支援 GPU 的 Milvus 允許您指派一個或多個 GPU 裝置。</p>
<ul>
<li><p>Milvus 叢集</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus 獨立執行模式</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
standalone:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Assign-multiple-GPU-devices" class="common-anchor-header">2. 指派多個 GPU 裝置<button data-href="#2-Assign-multiple-GPU-devices" class="anchor-icon" translate="no">
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
    </button></h3><p>除了單一 GPU 裝置外，您也可以將多個 GPU 裝置指派給 Milvus。</p>
<ul>
<li><p>Milvus 叢集</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>在上述配置中，共有四顆 CPU 可用，且每個 dataNode 和 queryNode 各使用兩顆 GPU。若要將不同的 GPU 指派給 dataNode 和 queryNode，您可以透過在配置檔案中設定 `<code translate="no">extraEnv</code> ` 來相應修改配置，如下所示：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;0&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre>
  <div class="alert note">
    <ul>
      <li>發行版名稱僅應包含字母、數字和連字號。發行版名稱中不允許使用點號。</li>
      <li>使用 Helm 安裝 Milvus 時，預設命令列會安裝 Milvus 叢集版本。若要安裝獨立運作的 Milvus，則需進行進一步設定。</li>
      <li>根據<a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">Kubernetes 已廢棄 API 遷移指南，</a>自 v1.25 起，PodDisruptionBudget<a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">的</a> <b>policy/v1beta1</b>API 版本將不再提供服務。建議您將配置檔和 API 客戶端遷移至使用<b>policy/v1</b>API 版本。<br/>對於仍在 Kubernetes v1.25 及後續版本上使用 PodDisruptionBudget 的<b>policy/v1beta1</b>API 版本的用戶，可執行以下指令來安裝 Milvus 作為替代方案：<br/>
     <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
      <li>更多資訊請參閱<a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a>和<a href="https://helm.sh/docs/">Helm</a>。</li>
    </ul>
  </div>
</li>
<li><p>Milvus 獨立部署</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>在上述配置中，共有四顆 CPU 可用，且每個 dataNode 和 queryNode 各使用兩顆 GPU。若要將不同的 GPU 分配給 dataNode 和 queryNode，您可以透過在配置檔案中將 extraEnv 設定如下，來相應修改配置：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;0&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Check-Milvus-status" class="common-anchor-header">2. 檢查 Milvus 狀態<button data-href="#2-Check-Milvus-status" class="anchor-icon" translate="no">
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
    </button></h3><p>執行以下指令以檢查 Milvus 狀態：</p>
<pre><code translate="no" class="language-bash">$ kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 啟動後，所有 Pod 的「<code translate="no">READY</code> 」欄位都會顯示「<code translate="no">1/1</code> 」。</p>
<ul>
<li><p>Milvus 叢集</p>
<pre><code translate="no" class="language-shell">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                  1/1     Running     0             3m24s
my-release-etcd-1                                  1/1     Running     0             3m24s
my-release-etcd-2                                  1/1     Running     0             3m24s
my-release-milvus-datanode-698dbf7d77-rjkkq        1/1     Running     0             3m24s
my-release-milvus-mixcoord-856d666559-rpj8z        1/1     Running     0             3m24s
my-release-milvus-proxy-7f7cf47689-pzltw           1/1     Running     0             3m24s
my-release-milvus-querynode-7fb6d5b5f8-92phj       1/1     Running     0             3m24s
my-release-milvus-streamingnode-5867bfbcbf-cg9xx   1/1     Running     0             3m24s
my-release-minio-0                                 1/1     Running     0             3m24s
my-release-minio-1                                 1/1     Running     0             3m24s
my-release-minio-2                                 1/1     Running     0             3m24s
my-release-minio-3                                 1/1     Running     0             3m24s
my-release-pulsarv3-bookie-0                       1/1     Running     0             3m24s
my-release-pulsarv3-bookie-1                       1/1     Running     0             3m24s
my-release-pulsarv3-bookie-2                       1/1     Running     0             3m24s
my-release-pulsarv3-bookie-init-p8hcq              0/1     Completed   0             3m24s
my-release-pulsarv3-broker-0                       1/1     Running     0             3m24s
my-release-pulsarv3-broker-1                       1/1     Running     0             3m24s
my-release-pulsarv3-proxy-0                        1/1     Running     0             3m24s
my-release-pulsarv3-proxy-1                        1/1     Running     0             3m24s
my-release-pulsarv3-pulsar-init-8kjsj              0/1     Completed   0             3m24s
my-release-pulsarv3-recovery-0                     1/1     Running     0             3m24s
my-release-pulsarv3-zookeeper-0                    1/1     Running     0             3m24s
my-release-pulsarv3-zookeeper-1                    1/1     Running     0             3m24s
my-release-pulsarv3-zookeeper-2                    1/1     Running     0             3m24s
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus 獨立模式</p>
<pre><code translate="no" class="language-shell">NAME                                               READY   STATUS      RESTARTS   AGE
my-release-etcd-0                                  1/1     Running     0          30s
my-release-milvus-standalone-54c4f88cb9-f84pf      1/1     Running     0          30s
my-release-minio-5564fbbddc-mz7f5                  1/1     Running     0          30s
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. 將本地埠轉發至 Milvus<button data-href="#3-Forward-a-local-port-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>確認 Milvus 伺服器正在監聽哪個本地埠。請將 pod 名稱替換為您自己的。</p>
<pre><code translate="no" class="language-bash">$ kubectl get pod my-release-milvus-proxy-6bd7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
19530
<button class="copy-code-btn"></button></code></pre>
<p>接著，執行以下指令將本地端埠轉發至 Milvus 提供服務的埠號。</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus 27017:19530
Forwarding from 127.0.0.1:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>若需，您可在上述指令中使用<code translate="no">:19530</code> 取代<code translate="no">27017:19530</code> ，讓<code translate="no">kubectl</code> 為您分配一個本地端口，如此便無需自行處理端口衝突問題。</p>
<p>預設情況下，kubectl 的端口轉發僅監聽<code translate="no">localhost</code> 。若要讓 Milvus 監聽選定的或所有 IP 位址，請使用<code translate="no">address</code> 標誌。以下指令會讓端口轉發監聽主機上的所有 IP 位址。</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530
Forwarding from 0.0.0.0:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>現在，您可以透過轉發的埠連接至 Milvus。</p>
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
    </button></h2><p>Milvus 內建名為 Milvus WebUI 的圖形化使用者介面工具，您可透過瀏覽器存取。Milvus WebUI 透過簡單直覺的介面，提升系統的可觀察性。您可以使用 Milvus WebUI 觀察 Milvus 各元件與依賴項的統計資料和指標、檢查資料庫與收集項的詳細資訊，以及列出詳細的 Milvus 配置。 有關 Milvus WebUI 的詳細資訊，請參閱<a href="/docs/zh-hant/milvus-webui.md">Milvus WebUI</a></p>
<p>若要啟用對 Milvus WebUI 的存取，您需要將代理 Pod 進行端口轉發至本機端口。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27018:9091</span>
Forwarding from 0.0.0.0:27018 -&gt; 9091
<button class="copy-code-btn"></button></code></pre>
<p>現在，您可透過<code translate="no">http://localhost:27018</code> 存取 Milvus WebUI。</p>
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
    </button></h2><p>安裝完 Milvus 後，您可以：</p>
<ul>
<li><p>參閱<a href="/docs/zh-hant/quickstart.md">《快速入門》</a>以了解 Milvus 的功能。</p></li>
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
<li><p>探索<a href="https://github.com/zilliztech/attu">Attu，這</a>是一款用於直觀管理 Milvus 的開源圖形化介面工具。</p></li>
<li><p><a href="/docs/zh-hant/monitor.md">透過 Prometheus 監控 Milvus</a>。</p></li>
</ul>
