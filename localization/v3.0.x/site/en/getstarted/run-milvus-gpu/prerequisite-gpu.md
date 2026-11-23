---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: Learn the necessary preparations before installing Milvus with GPU.
title: Requirements for Installing Milvus with GPU
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">Requirements for Installing Milvus with GPU<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>This page lists the hardware and software requirements to set up Milvus with GPU support.</p>
<h2 id="Compute-capability" class="common-anchor-header">Compute capability<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>The Milvus GPU image <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> is built for GPU devices with compute capability 7.0, 7.5, 8.0, 8.6, 9.0, 10.0, or 12.0. Your GPU device must have one of these compute capabilities, or a later compute capability that can run code built for one of them, such as 8.9 or 12.1. For details, see <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/cuda-platform.html#binary-compatibility">Binary Compatibility</a> and <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/05-appendices/compute-capabilities.html#family-specific-features">Family-Specific Features</a>.</p>
<p>To check whether your GPU device suffices the requirement, check <a href="https://developer.nvidia.com/cuda-gpus">Your GPU Compute Capability</a> on the NVIDIA developer website.</p>
<h2 id="NVIDIA-driver" class="common-anchor-header">NVIDIA driver<button data-href="#NVIDIA-driver" class="anchor-icon" translate="no">
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
    </button></h2><p>Your host must run one of the <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/supported-platforms.html">Linux distributions supported by the NVIDIA Container Toolkit</a> and have the NVIDIA driver for your GPU device installed.</p>
<p>The Milvus GPU image <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> is based on CUDA 12.9 Update 1. Its <code translate="no">NVIDIA_REQUIRE_CUDA</code> setting requires <code translate="no">cuda&gt;=12.9</code>, so the NVIDIA driver must support CUDA 12.9 or later. For CUDA 12.9 Update 1, NVIDIA lists driver version 575.57.08 or later on Linux x86_64. For the driver versions of each CUDA release, see the <a href="https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html#cuda-driver">CUDA Toolkit release notes</a>.</p>
<p>The same setting also accepts drivers from the 535, 550, 560, 565, and 570 branches on some GPU brands, but not on GeForce or Titan GPUs. With these drivers, the image relies on <a href="https://docs.nvidia.com/deploy/cuda-compatibility/forward-compatibility.html">CUDA forward compatibility</a>, which NVIDIA supports only on NVIDIA Data Center GPUs, select NGC Server Ready SKUs of RTX cards, and Jetson boards. If the driver does not meet these requirements, the NVIDIA Container Toolkit reports an <code translate="no">unsatisfied condition</code> error and does not set up the GPU for the container.</p>
<p>For Ubuntu 22.04 users, you can install the driver with the following command:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-580 nvidia-utils-580</span>
<button class="copy-code-btn"></button></code></pre>
<p>GPUs with compute capability 10.0 or 12.0 (Blackwell) are supported only by the open kernel modules of the NVIDIA driver. For these GPUs, install <code translate="no">nvidia-headless-580-open</code> instead of <code translate="no">nvidia-headless-580</code>. The open kernel modules do not support GPUs older than Turing (compute capability 7.5), such as Volta (7.0), so keep <code translate="no">nvidia-headless-580</code> for those.</p>
<p>For other Linux distributions, refer to the <a href="https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/index.html">NVIDIA Driver Installation Guide</a>.</p>
<p>You can check whether the driver has been installed correctly by running the following command. The output shows the version of the installed driver.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="NVIDIA-Container-Toolkit" class="common-anchor-header">NVIDIA Container Toolkit<button data-href="#NVIDIA-Container-Toolkit" class="anchor-icon" translate="no">
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
    </button></h2><p>Install the NVIDIA Container Toolkit by following the steps for your Linux distribution in the <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">NVIDIA Container Toolkit installation guide</a>.</p>
<p>If you install Milvus with Docker Compose, configure Docker to use the NVIDIA Container Runtime, restart the Docker daemon, and then run a sample workload to check that containers can access the GPU:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> nvidia-ctk runtime configure --runtime=docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker run --<span class="hljs-built_in">rm</span> --runtime=nvidia --gpus all ubuntu nvidia-smi</span>
<button class="copy-code-btn"></button></code></pre>
<p>The last command runs <code translate="no">nvidia-smi</code> in a container and prints information about the GPU devices on the host. If you install Milvus on Kubernetes, prepare your GPU worker nodes as described in the FAQs at the end of this page instead.</p>
<h2 id="Software-requirements" class="common-anchor-header">Software requirements<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>The requirements in this section and the FAQs below apply when you install Milvus with GPU support on Kubernetes using Helm.</p>
<p>It is recommended that you run the Kubernetes cluster on Linux platforms.</p>
<ul>
<li>kubectl is the command-line tool for Kubernetes. Use a kubectl version that is within one minor version difference of your cluster. Using the latest version of kubectl helps avoid unforeseen issues.</li>
<li>minikube is required when running Kubernetes cluster locally. minikube requires Docker as a dependency. Ensure that you install Docker before installing Milvus using Helm. See <a href="https://docs.docker.com/get-docker">Get Docker</a> for more information.</li>
</ul>
<table>
<thead>
<tr><th>Operating system</th><th>Software</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td>Linux platforms</td><td><ul><li>Kubernetes 1.16 or later</li><li>kubectl</li><li>Helm 3.0.0 or later</li><li>minikube (for Milvus standalone)</li><li>Docker 19.03 or later (for Milvus standalone)</li></ul></td><td>See <a href="https://helm.sh/docs/">Helm Docs</a> for more information.</td></tr>
</tbody>
</table>
<h2 id="FAQs" class="common-anchor-header">FAQs<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">How can I start a K8s cluster locally for test purposes?<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>You can use tools like <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a>, and <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a>, to quickly set up a Kubernetes cluster locally. The following procedure uses minikube as an example.</p>
<ol>
<li>Download minikube</li>
</ol>
<p>Go to the <a href="https://minikube.sigs.k8s.io/docs/start/">Get Started</a> page, check whether you have met the conditions listed in the <strong>What you’ll need</strong> section, click on the buttons that describe your target platform, and copy the commands to download and install the binary.</p>
<ol start="2">
<li>Start a K8s cluster using minikube</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Check the status of the K8s cluster</li>
</ol>
<p>You can check the status of the K8s cluster installed using the following command.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Ensure that you can access the K8s cluster via <code translate="no">kubectl</code>. If you have not installed <code translate="no">kubectl</code> locally, see <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Use kubectl inside minikube</a>.</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">How can I start a K8s cluster with GPU worker nodes?<button data-href="#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>If you prefer to use GPU-enabled worker nodes, you can follow the steps below to create a K8s cluster with GPU worker nodes. We recommend installing Milvus on a K8s cluster with GPU worker nodes and using the default storage class provisioned.</p>
<ol>
<li>Prepare GPU worker nodes</li>
</ol>
<p>To use GPU-enabled worker nodes, follow steps in <a href="https://github.com/NVIDIA/k8s-device-plugin#preparing-your-gpu-nodes">Prepare your GPU nodes</a>.</p>
<ol start="2">
<li>Enable GPU support on K8s</li>
</ol>
<p>Deploy the <strong>nvidia-device-plugin</strong> with Helm by following <a href="https://github.com/NVIDIA/k8s-device-plugin#deployment-via-helm">these steps</a>.</p>
<p>After setting up, view the GPU resources with the following command. Replace <code translate="no">&lt;gpu-worker-node&gt;</code> with the actual node name.</p>
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
