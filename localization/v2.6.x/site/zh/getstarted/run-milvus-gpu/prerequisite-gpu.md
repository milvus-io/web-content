---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: 了解使用 GPU 安装 Milvus 前的必要准备工作。
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
    </button></h1><p>本页列出了设置支持 GPU 的 Milvus 的硬件和软件要求。</p>
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
    </button></h2><p>GPU 设备的计算能力必须是下列之一：6.0, 7.0, 7.5, 8.0, 8.6, 9.0.</p>
<p>要检查您的 GPU 设备是否满足要求，请在英伟达™（NVIDIA®）开发人员网站上查看 "<a href="https://developer.nvidia.com/cuda-gpus">您的 GPU 计算能力</a>"。</p>
<h2 id="NVIDIA-driver" class="common-anchor-header">英伟达驱动程序<button data-href="#NVIDIA-driver" class="anchor-icon" translate="no">
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
    </button></h2><p>用于 GPU 设备的英伟达<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">™</a>（NVIDIA®）驱动程序必须安装在某个<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">受支持的 Linux 发行版</a>上，并已按照<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">本指南</a>安装了英伟达™（NVIDIA®）容器工具包。</p>
<p>对于 Ubuntu 22.04 用户，可以使用以下命令安装驱动程序和容器工具包：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545</span>
<button class="copy-code-btn"></button></code></pre>
<p>其他操作系统用户请参考<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian">官方安装指南</a>。</p>
<p>运行以下命令可检查驱动程序是否已正确安装：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
version:        545.29.06
<button class="copy-code-btn"></button></code></pre>
<p>建议使用 545 及以上版本的驱动程序。</p>
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
    </button></h2><p>建议在 Linux 平台上运行 Kubernetes 集群。</p>
<ul>
<li>kubectl 是 Kubernetes 的命令行工具。使用的 kubectl 版本应与群集的版本相差一个小版本。使用最新版本的 kubectl 有助于避免不可预见的问题。</li>
<li>本地运行 Kubernetes 集群时需要 minikube。确保在使用 Helm 安装 Milvus 之前安装 Docker。更多信息，请参阅<a href="https://docs.docker.com/get-docker">获取 Docker</a>。</li>
</ul>
<table>
<thead>
<tr><th>操作符</th><th>软件</th><th>注意</th></tr>
</thead>
<tbody>
<tr><td>Linux 平台</td><td><ul><li>Kubernetes 1.16 或更高版本</li><li>kubectl</li><li>Helm 3.0.0 或更高版本</li><li>minikube（适用于 Milvus 单机版）</li><li>Docker 19.03 或更高版本（适用于 Milvus 单机版）</li></ul></td><td>更多信息，请参阅<a href="https://helm.sh/docs/">Helm 文档</a>。</td></tr>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">如何在本地启动 K8s 集群进行测试？</h3><p>你可以使用<a href="https://minikube.sigs.k8s.io/docs/">minikube</a>、<a href="https://kind.sigs.k8s.io/">kind</a> 和<a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> 等工具在本地快速建立 Kubernetes 集群。下面的步骤以 minikube 为例。</p>
<ol>
<li>下载 minikube</li>
</ol>
<p>转到 "<a href="https://minikube.sigs.k8s.io/docs/start/">开始</a>"页面，检查是否满足 "<strong>你需要什么 "</strong>部分列出的条件，点击描述目标平台的按钮，然后复制命令下载并安装二进制文件。</p>
<ol start="2">
<li>使用 minikube 启动 K8s 集群</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>检查 K8s 群集的状态</li>
</ol>
<p>您可以使用以下命令检查已安装的 K8s 群集的状态。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>确保可以通过<code translate="no">kubectl</code> 访问 K8s 群集。如果本地未安装<code translate="no">kubectl</code> ，请参阅在<a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">minikube 内使用 kubectl</a>。</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">如何使用 GPU 工作节点启动 K8s 群集？</h3><p>如果你喜欢使用支持 GPU 的工作节点，可以按照以下步骤创建一个带有 GPU 工作节点的 K8s 集群。我们建议在带有 GPU 工作节点的 K8s 集群上安装 Milvus，并使用默认配置的存储类。</p>
<ol>
<li>准备 GPU 工作节点</li>
</ol>
<p>要使用支持 GPU 的工作节点，请按照<a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes">准备 GPU 节点</a>中的步骤操作。</p>
<ol start="2">
<li>在 K8s 上启用 GPU 支持</li>
</ol>
<p>按照<a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm">以下步骤</a>使用 Helm 部署<strong>nvidia-device-plugin</strong>。</p>
<p>设置完成后，使用以下命令查看 GPU 资源。将<code translate="no">&lt;gpu-worker-node&gt;</code> 替换为实际节点名称。</p>
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
