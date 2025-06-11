---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: 了解安裝 Milvus with GPU 前的必要準備。
title: 安裝支援 GPU 的 Milvus 所需條件
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">安裝支援 GPU 的 Milvus 所需條件<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁面列出設定支援 GPU 的 Milvus 的硬體與軟體需求。</p>
<h2 id="Compute-capability" class="common-anchor-header">計算能力<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>您的 GPU 裝置的運算能力必須是下列其中之一：6.0, 7.0, 7.5, 8.0, 8.6, 9.0.</p>
<p>若要檢查您的 GPU 裝置是否符合要求，請在 NVIDIA 開發人員網站上檢查「<a href="https://developer.nvidia.com/cuda-gpus">您的 GPU 運算能力</a>」。</p>
<h2 id="NVIDIA-driver" class="common-anchor-header">NVIDIA 驅動程式<button data-href="#NVIDIA-driver" class="anchor-icon" translate="no">
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
    </button></h2><p>您的 GPU 裝置的 NVIDIA 驅動程式必須在其中一個<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">支援的 Linux 發行版本</a>上，並已依照<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">本指南</a>安裝 NVIDIA Container Toolkit。</p>
<p>對於 Ubuntu 22.04 使用者，您可以使用下列指令安裝驅動程式和容器工具包：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545</span>
<button class="copy-code-btn"></button></code></pre>
<p>其他作業系統使用者請參考<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian">官方安裝指南</a>。</p>
<p>您可以執行下列指令檢查驅動程式是否已正確安裝：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
version:        545.29.06
<button class="copy-code-btn"></button></code></pre>
<p>建議您使用版本 545 以上的驅動程式。</p>
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
    </button></h2><p>建議您在 Linux 平台上執行 Kubernetes 叢集。</p>
<ul>
<li>kubectl 是 Kubernetes 的命令列工具。使用與您的叢集相差一個次要版本之內的 kubectl 版本。使用最新版本的 kubectl 有助於避免不可預見的問題。</li>
<li>在本機執行 Kubernetes 叢集時需要 minikube。使用 Helm 安裝 Milvus 前，請確認已安裝 Docker。如需詳細資訊，請參閱<a href="https://docs.docker.com/get-docker">Get Docker</a>。</li>
</ul>
<table>
<thead>
<tr><th>作業系統</th><th>軟體</th><th>注意事項</th></tr>
</thead>
<tbody>
<tr><td>Linux 平台</td><td><ul><li>Kubernetes 1.16 或更新版本</li><li>kubectl</li><li>Helm 3.0.0 或更新版本</li><li>minikube (適用於 Milvus 單機版)</li><li>Docker 19.03 或更新版本 (適用於 Milvus 單機版)</li></ul></td><td>更多資訊請參閱<a href="https://helm.sh/docs/">Helm 文件</a>。</td></tr>
</tbody>
</table>
<h2 id="FAQs" class="common-anchor-header">常見問題<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">如何在本機啟動 K8s 叢集進行測試？</h3><p>您可以使用<a href="https://minikube.sigs.k8s.io/docs/">minikube</a>、<a href="https://kind.sigs.k8s.io/">kind</a> 和<a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> 等工具，在本機快速建立 Kubernetes 叢集。以下程序以 minikube 為例。</p>
<ol>
<li>下載 minikube</li>
</ol>
<p>前往<a href="https://minikube.sigs.k8s.io/docs/start/">Get Started</a>頁面，檢查您是否符合<strong>What you'll need</strong>章節所列的條件，按一下描述您目標平台的按鈕，然後複製指令下載並安裝二進位檔案。</p>
<ol start="2">
<li>使用 minikube 啟動 K8s 叢集</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>檢查 K8s 叢集的狀態</li>
</ol>
<p>您可以使用下列指令檢查已安裝 K8s 叢集的狀態。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>確保您可以透過<code translate="no">kubectl</code> 存取 K8s 叢集。如果您尚未在本機安裝<code translate="no">kubectl</code> ，請參閱在<a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">minikube 內使用 kubectl</a>。</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">如何啟動具有 GPU 工作節點的 K8s 叢集？</h3><p>如果您偏好使用支援 GPU 的工作節點，您可以依照下列步驟建立一個有 GPU 工作節點的 K8s 叢集。我們建議在有GPU工作節點的K8s集群上安裝Milvus，並使用預設的儲存類別。</p>
<ol>
<li>準備 GPU 工作人員節點</li>
</ol>
<p>若要使用支援 GPU 的工作節點，請遵循<a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes">準備 GPU 節點的</a>步驟。</p>
<ol start="2">
<li>在 K8s 上啟用 GPU 支援</li>
</ol>
<p>按照<a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm">以下步驟</a>使用 Helm 部署<strong>nvidia-device-plugin</strong>。</p>
<p>設定完成後，使用下列指令檢視 GPU 資源。將<code translate="no">&lt;gpu-worker-node&gt;</code> 改為實際的節點名稱。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">  $ </span><span class="language-bash">kubectl describe node &lt;gpu-worker-node&gt;</span>

  Capacity:
  ...
  nvidia.com/gpu:     4
  ...
  Allocatable:
  ...
  nvidia.com/gpu:     4
  ...
  ```  
<button class="copy-code-btn"></button></code></pre>
