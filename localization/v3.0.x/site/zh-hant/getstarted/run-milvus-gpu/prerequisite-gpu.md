---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: 了解在安裝 Milvus 並搭配 GPU 之前所需的準備工作。
title: 安裝支援 GPU 的 Milvus 的需求
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">安裝支援 GPU 的 Milvus 的需求<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁面列出設定具備 GPU 支援功能的 Milvus 所需的硬體與軟體需求。</p>
<h2 id="Compute-capability" class="common-anchor-header">運算能力<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus GPU 映像檔<code translate="no">milvusdb/milvus:v3.0.5-gpu</code> 專為運算能力為 7.0、7.5、8.0、8.6、9.0、10.0 或 12.0 的 GPU 裝置所建置。 您的 GPU 裝置必須具備上述任一運算能力，或具備更高版本的運算能力（例如 8.9 或 12.1），且能執行針對上述任一運算能力所編譯的程式碼。詳細資訊請參閱《<a href="https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/cuda-platform.html#binary-compatibility">二進位相容性</a> <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/05-appendices/compute-capabilities.html#family-specific-features">與系列專屬功能》</a>。</p>
<p>若要確認您的 GPU 裝置是否符合此要求，請參閱 NVIDIA 開發者網站上的《<a href="https://developer.nvidia.com/cuda-gpus">您的 GPU 運算能力》</a>。</p>
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
    </button></h2><p>您的主機必須運行<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/supported-platforms.html">NVIDIA Container Toolkit 所支援的</a>其中一個<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/supported-platforms.html">Linux 發行版</a>，並已安裝適用於您的 GPU 裝置的 NVIDIA 驅動程式。</p>
<p>Milvus GPU 映像檔<code translate="no">milvusdb/milvus:v3.0.5-gpu</code> 基於 CUDA 12.9 Update 1。其 `<code translate="no">NVIDIA_REQUIRE_CUDA</code> ` 設定要求 `<code translate="no">cuda&gt;=12.9</code>`，因此 NVIDIA 驅動程式必須支援 CUDA 12.9 或更新版本。 針對 CUDA 12.9 Update 1，NVIDIA 列出 Linux x86_64 平台上的驅動程式版本為 575.57.08 或更新版本。有關各 CUDA 版本的驅動程式資訊，請參閱<a href="https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html#cuda-driver">CUDA 工具包的發行說明</a>。</p>
<p>此設定在某些 GPU 品牌上亦可接受來自 535、550、560、565 及 570 分支的驅動程式，但不適用於 GeForce 或 Titan GPU。 使用這些驅動程式時，該映像檔仰賴<a href="https://docs.nvidia.com/deploy/cuda-compatibility/forward-compatibility.html">CUDA 前向相容性</a>，而 NVIDIA 僅在 NVIDIA 資料中心 GPU、部分 RTX 顯示卡的 NGC Server Ready 型號，以及 Jetson 開發板上記支持此功能。若驅動程式不符合這些要求，NVIDIA Container Toolkit 將回報「<code translate="no">unsatisfied condition</code> 」錯誤，且不會為容器設定 GPU。</p>
<p>對於 Ubuntu 22.04 使用者，您可以透過以下指令安裝驅動程式：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-580 nvidia-utils-580</span>
<button class="copy-code-btn"></button></code></pre>
<p>運算能力為 10.0 或 12.0（Blackwell）的 GPU 僅受 NVIDIA 驅動程式的開放式核心模組支援。 針對這些 GPU，請安裝<code translate="no">nvidia-headless-580-open</code> 而非<code translate="no">nvidia-headless-580</code> 。開放式核心模組不支援 Turing（運算能力 7.5）之前的 GPU（例如 Volta（7.0）），因此針對這些 GPU，請保留<code translate="no">nvidia-headless-580</code> 。</p>
<p>若使用其他 Linux 發行版，請參閱<a href="https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/index.html">NVIDIA 驅動程式安裝指南</a>。</p>
<p>您可以執行以下指令來檢查驅動程式是否已正確安裝。輸出結果將顯示已安裝驅動程式的版本。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="NVIDIA-Container-Toolkit" class="common-anchor-header">NVIDIA 容器工具包<button data-href="#NVIDIA-Container-Toolkit" class="anchor-icon" translate="no">
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
    </button></h2><p>請依照<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">NVIDIA</a> Container<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">Toolkit 安裝指南中</a>針對您所使用 Linux 發行版的步驟，安裝<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">NVIDIA Container Toolkit</a>。</p>
<p>若您使用 Docker Compose 安裝 Milvus，請將 Docker 設定為使用 NVIDIA 容器執行環境，重新啟動 Docker 守護程式，然後執行範例工作負載以確認容器能否存取 GPU：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> nvidia-ctk runtime configure --runtime=docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker run --<span class="hljs-built_in">rm</span> --runtime=nvidia --gpus all ubuntu nvidia-smi</span>
<button class="copy-code-btn"></button></code></pre>
<p>最後一個指令會在容器中執行 `<code translate="no">nvidia-smi</code> `，並輸出主機上 GPU 裝置的相關資訊。若您是在 Kubernetes 上安裝 Milvus，請參照本頁末尾的常見問題解答 (FAQ) 來準備您的 GPU 工作節點。</p>
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
    </button></h2><p>本節所述的系統需求以及下方的常見問題解答，適用於您使用 Helm 在 Kubernetes 上安裝支援 GPU 的 Milvus 時。</p>
<p>建議您在 Linux 平台上運行 Kubernetes 叢集。</p>
<ul>
<li>kubectl 是 Kubernetes 的命令列工具。請使用與您的叢集次版本差異不超過一級的 kubectl 版本。使用最新版本的 kubectl 有助於避免不可預見的問題。</li>
<li>若要在本地端運行 Kubernetes 叢集，則需安裝 minikube。minikube 需依賴 Docker，請務必在使用 Helm 安裝 Milvus 之前先安裝 Docker。更多資訊請參閱「<a href="https://docs.docker.com/get-docker">取得 Docker</a>」。</li>
</ul>
<table>
<thead>
<tr><th>作業系統</th><th>軟體</th><th>注意事項</th></tr>
</thead>
<tbody>
<tr><td>Linux 平台</td><td><ul><li>Kubernetes 1.16 或更新版本</li><li>kubectl</li><li>Helm 3.0.0 或更新版本</li><li>minikube（適用於 Milvus 獨立部署）</li><li>Docker 19.03 或更新版本（適用於 Milvus 獨立部署）</li></ul></td><td>更多資訊請參閱<a href="https://helm.sh/docs/">Helm 文件</a>。</td></tr>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">如何在本地端啟動 K8s 叢集以進行測試？<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>您可以使用<a href="https://minikube.sigs.k8s.io/docs/">minikube</a>、<a href="https://kind.sigs.k8s.io/">kind</a> 和<a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> 等工具，快速在本地端建立 Kubernetes 叢集。以下步驟將以 minikube 為例進行說明。</p>
<ol>
<li>下載 minikube</li>
</ol>
<p>前往<a href="https://minikube.sigs.k8s.io/docs/start/">「開始使用</a>」頁面，確認您是否已滿足「<strong>您需要準備什麼</strong>」部分所列的條件，點擊對應您目標平台的按鈕，並複製指令以下載並安裝二進位檔。</p>
<ol start="2">
<li>使用 minikube 啟動 K8s 叢集</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>檢查 K8s 叢集的狀態</li>
</ol>
<p>您可以透過以下指令檢查已安裝的 K8s 叢集狀態。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>請確保您能透過<code translate="no">kubectl</code> 存取 K8s 叢集。若您尚未在本地端安裝<code translate="no">kubectl</code> ，請參閱《<a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">在 minikube 內使用 kubectl</a>》。</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">如何啟動具備 GPU 工作節點的 K8s 叢集？<button data-href="#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>若您偏好使用具備 GPU 功能的工作節點，可依照以下步驟建立具備 GPU 工作節點的 K8s 叢集。我們建議在具備 GPU 工作節點的 K8s 叢集上安裝 Milvus，並使用預先配置的預設儲存類別。</p>
<ol>
<li>準備 GPU 工作節點</li>
</ol>
<p>若要使用具備 GPU 功能的作業節點，請依照《<a href="https://github.com/NVIDIA/k8s-device-plugin#preparing-your-gpu-nodes">準備您的 GPU 節點</a>》中的步驟操作。</p>
<ol start="2">
<li>在 K8s 上啟用 GPU 支援</li>
</ol>
<p>請依照<a href="https://github.com/NVIDIA/k8s-device-plugin#deployment-via-helm">以下步驟，</a>使用 Helm 部署<strong>nvidia-device-plugin</strong>。</p>
<p>設定完成後，請使用以下指令檢視 GPU 資源。請將 `<code translate="no">&lt;gpu-worker-node&gt;</code> ` 替換為實際的節點名稱。</p>
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
