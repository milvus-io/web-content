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
    </button></h2><p>The compute capability of your GPU device must be one of the following: 6.0, 7.0, 7.5, 8.0, 8.6, 9.0.</p>
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
    </button></h2><p>The NVIDIA driver for your GPU device must be on one of <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">the supported Linux distributions</a>, and the NVIDIA Container Toolkit has been installed by following <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">this guide</a>.</p>
<p>For Ubuntu 22.04 users, you can install the driver and the container toolkit with the following commands:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545
<button class="copy-code-btn"></button></code></pre>
<p>For other OS users, refer to the <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian">official installation guide</a>.</p>
<p>You can check whether the driver has been installed correctly by running the following command:</p>
<pre><code translate="no" class="language-shell">$ modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span>
<span class="hljs-attr">version</span>:        <span class="hljs-number">545.29</span><span class="hljs-number">.06</span>
<button class="copy-code-btn"></button></code></pre>
<p>You are recommended to use the drivers of version 545 and above.</p>
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
    </button></h2><p>It is recommended that you run the Kubernetes cluster on Linux platforms.</p>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">How can I start a K8s cluster locally for test purposes?</h3><p>You can use tools like <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a>, and <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a>, to quickly set up a Kubernetes cluster locally. The following procedure uses minikube as an example.</p>
<ol>
<li>Download minikube</li>
</ol>
<p>Go to the <a href="https://minikube.sigs.k8s.io/docs/start/">Get Started</a> page, check whether you have met the conditions listed in the <strong>What you’ll need</strong> section, click on the buttons that describe your target platform, and copy the commands to download and install the binary.</p>
<ol start="2">
<li>Start a K8s cluster using minikube</li>
</ol>
<pre><code translate="no" class="language-shell">$ minikube start
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Check the status of the K8s cluster</li>
</ol>
<p>You can check the status of the K8s cluster installed using the following command.</p>
<pre><code translate="no" class="language-shell">$ kubectl cluster-info
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Ensure that you can access the K8s cluster via <code translate="no">kubectl</code>. If you have not installed <code translate="no">kubectl</code> locally, see <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Use kubectl inside minikube</a>.</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">How can I start a K8s cluster with GPU worker nodes?</h3><p>If you prefer to use GPU-enabled worker nodes, you can follow the steps below to create a K8s cluster with GPU worker nodes. We recommend installing Milvus on a K8s cluster with GPU worker nodes and using the default storage class provisioned.</p>
<ol>
<li>Prepare GPU worker nodes</li>
</ol>
<p>To use GPU-enabled worker nodes, follow steps in <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes">Prepare your GPU nodes</a>.</p>
<ol start="2">
<li>Enable GPU support on K8s</li>
</ol>
<p>Deploy the <strong>nvidia-device-plugin</strong> with Helm by following <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm">these steps</a>.</p>
<p>After setting up, view the GPU resources with the following command. Replace <code translate="no">&lt;gpu-worker-node&gt;</code> with the actual node name.</p>
<pre><code translate="no" class="language-shell">  $ kubectl describe node &lt;gpu-worker-node&gt;

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
