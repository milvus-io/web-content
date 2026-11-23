---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: 了解在安装带 GPU 的 Milvus 之前需要做的准备工作。
title: 安装支持 GPU 的 Milvus 的要求
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">安装支持 GPU 的 Milvus 的要求<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>本页面列出了配置支持 GPU 的 Milvus 所需的硬件和软件要求。</p>
<h2 id="Compute-capability" class="common-anchor-header">计算能力<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus GPU 镜像<code translate="no">milvusdb/milvus:v3.0.5-gpu</code> 专为计算能力为 7.0、7.5、8.0、8.6、9.0、10.0 或 12.0 的 GPU 设备构建。 您的 GPU 设备必须具备上述任一计算能力，或具备更高版本的计算能力（例如 8.9 或 12.1），且能够运行针对上述任一计算能力构建的代码。有关详细信息，请参阅《<a href="https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/cuda-platform.html#binary-compatibility">二进制兼容性与</a> <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/05-appendices/compute-capabilities.html#family-specific-features">系列特定功能》</a>。</p>
<p>要检查您的 GPU 设备是否满足此要求，请访问 NVIDIA 开发者网站查看《<a href="https://developer.nvidia.com/cuda-gpus">您的 GPU 计算能力》</a>。</p>
<h2 id="NVIDIA-driver" class="common-anchor-header">NVIDIA 驱动程序<button data-href="#NVIDIA-driver" class="anchor-icon" translate="no">
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
    </button></h2><p>您的主机必须运行<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/supported-platforms.html">NVIDIA Container Toolkit 支持的 Linux 发行版</a>之一，并已安装适用于您 GPU 设备的 NVIDIA 驱动程序。</p>
<p>Milvus GPU镜像<code translate="no">milvusdb/milvus:v3.0.5-gpu</code> 基于CUDA 12.9 Update 1。其<code translate="no">NVIDIA_REQUIRE_CUDA</code> 设置要求<code translate="no">cuda&gt;=12.9</code> ，因此NVIDIA驱动程序必须支持CUDA 12.9或更高版本。 对于 CUDA 12.9 Update 1，NVIDIA 列出的 Linux x86_64 平台驱动程序版本为 575.57.08 或更高。有关各 CUDA 版本对应的驱动程序版本，请参阅<a href="https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html#cuda-driver">CUDA 工具包发布说明</a>。</p>
<p>该设置在某些 GPU 品牌上也支持 535、550、560、565 和 570 分支的驱动程序，但不适用于 GeForce 或 Titan GPU。 使用这些驱动程序时，该镜像依赖于<a href="https://docs.nvidia.com/deploy/cuda-compatibility/forward-compatibility.html">CUDA 前向兼容性</a>，而 NVIDIA 仅在 NVIDIA 数据中心 GPU、部分 RTX 显卡的 NGC Server Ready 型号以及 Jetson 开发板上支持此功能。如果驱动程序不符合这些要求，NVIDIA Container Toolkit 将报告<code translate="no">unsatisfied condition</code> 错误，并且不会为容器配置 GPU。</p>
<p>对于 Ubuntu 22.04 用户，可通过以下命令安装驱动程序：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-580 nvidia-utils-580</span>
<button class="copy-code-btn"></button></code></pre>
<p>计算能力为 10.0 或 12.0（Blackwell）的 GPU 仅受 NVIDIA 驱动程序的开源内核模块支持。 对于此类 GPU，请安装<code translate="no">nvidia-headless-580-open</code> 而不是<code translate="no">nvidia-headless-580</code> 。开源内核模块不支持 Turing（计算能力 7.5）之前的 GPU（例如 Volta（7.0）），因此请为这些 GPU 保留<code translate="no">nvidia-headless-580</code> 。</p>
<p>对于其他 Linux 发行版，请参阅《<a href="https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/index.html">NVIDIA 驱动程序安装指南</a>》。</p>
<p>您可以通过运行以下命令来检查驱动程序是否已正确安装。输出结果将显示已安装驱动程序的版本。</p>
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
    </button></h2><p>请按照《<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">NVIDIA 容器工具包安装指南》</a>中针对您所用 Linux 发行版的步骤安装<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">NVIDIA 容器工具包</a>。</p>
<p>如果您使用 Docker Compose 安装 Milvus，请配置 Docker 以使用 NVIDIA 容器运行时，重启 Docker 守护进程，然后运行一个示例工作负载以验证容器能否访问 GPU：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> nvidia-ctk runtime configure --runtime=docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker run --<span class="hljs-built_in">rm</span> --runtime=nvidia --gpus all ubuntu nvidia-smi</span>
<button class="copy-code-btn"></button></code></pre>
<p>最后一条命令将在容器中运行 `<code translate="no">nvidia-smi</code> `，并打印主机上 GPU 设备的相关信息。如果您在 Kubernetes 上安装 Milvus，请按照本页末尾常见问题解答中的说明准备 GPU 工作节点。</p>
<h2 id="Software-requirements" class="common-anchor-header">软件要求<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>本节中的要求以及下方的常见问题解答适用于使用 Helm 在 Kubernetes 上安装支持 GPU 的 Milvus 的情况。</p>
<p>建议在 Linux 平台上运行 Kubernetes 集群。</p>
<ul>
<li>kubectl 是 Kubernetes 的命令行工具。请使用与您的集群次版本差异不超过一个的 kubectl 版本。使用最新版本的 kubectl 有助于避免出现意料之外的问题。</li>
<li>在本地运行 Kubernetes 集群时，需要使用 minikube。minikube 依赖于 Docker。请确保在使用 Helm 安装 Milvus 之前已安装 Docker。有关更多信息，请参阅<a href="https://docs.docker.com/get-docker">“获取 Docker”</a>。</li>
</ul>
<table>
<thead>
<tr><th>操作系统</th><th>软件</th><th>注意</th></tr>
</thead>
<tbody>
<tr><td>Linux 平台</td><td><ul><li>Kubernetes 1.16 或更高版本</li><li>kubectl</li><li>Helm 3.0.0 或更高版本</li><li>minikube（适用于 Milvus Standalone 部署）</li><li>Docker 19.03 或更高版本（适用于 Milvus Standalone）</li></ul></td><td>更多信息请参阅<a href="https://helm.sh/docs/">Helm 文档</a>。</td></tr>
</tbody>
</table>
<h2 id="FAQs" class="common-anchor-header">常见问题<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">如何在本地启动 K8s 集群以进行测试？<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>您可以使用<a href="https://minikube.sigs.k8s.io/docs/">minikube</a>、<a href="https://kind.sigs.k8s.io/">kind</a> 和<a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> 等工具，快速在本地搭建一个 Kubernetes 集群。以下步骤以 minikube 为例进行说明。</p>
<ol>
<li>下载 minikube</li>
</ol>
<p>访问<a href="https://minikube.sigs.k8s.io/docs/start/">“入门”</a>页面，确认您是否满足<strong>“所需条件”</strong>部分列出的要求，点击对应您目标平台的按钮，并复制相关命令以下载并安装二进制文件。</p>
<ol start="2">
<li>使用 minikube 启动 K8s 集群</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>检查 K8s 集群的状态</li>
</ol>
<p>您可以通过以下命令检查已安装的 K8s 集群状态。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>请确保您可以通过<code translate="no">kubectl</code> 访问 K8s 集群。如果您尚未在本地安装<code translate="no">kubectl</code> ，请参阅《<a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">在 minikube 中使用 kubectl</a>》。</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">如何启动带有 GPU 工作节点的 K8s 集群？<button data-href="#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>如果您希望使用支持 GPU 的工作节点，可以按照以下步骤创建一个带有 GPU 工作节点的 K8s 集群。我们建议在带有 GPU 工作节点的 K8s 集群上安装 Milvus，并使用已配置的默认存储类。</p>
<ol>
<li>准备 GPU 工作节点</li>
</ol>
<p>要使用支持 GPU 的工作节点，请按照《<a href="https://github.com/NVIDIA/k8s-device-plugin#preparing-your-gpu-nodes">准备您的 GPU 节点</a>》中的步骤操作。</p>
<ol start="2">
<li>在 K8s 上启用 GPU 支持</li>
</ol>
<p>请按照<a href="https://github.com/NVIDIA/k8s-device-plugin#deployment-via-helm">以下步骤</a>使用 Helm 部署<strong>nvidia-device-plugin</strong>。</p>
<p>配置完成后，使用以下命令查看 GPU 资源。请将<code translate="no">&lt;gpu-worker-node&gt;</code> 替换为实际的节点名称。</p>
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
