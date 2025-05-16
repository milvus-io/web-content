---
id: install_standalone-helm-gpu.md
label: Standalone (Helm)
order: 0
group: install_standalone-helm-gpu.md
related_key: Docker
summary: Learn the necessary preparations before installing Milvus with Docker.
title: Install Milvus Standalone with GPU Support
deprecate: true
---

<div class="tab-wrapper"><a href="/docs/ja/v2.4.x/install_standalone-helm-gpu.md" class='active '>Standalone (Helm)</a></div>
<h1 id="Install-Milvus-Standalone-with-GPU-Support" class="common-anchor-header">Install Milvus Standalone with GPU Support<button data-href="#Install-Milvus-Standalone-with-GPU-Support" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus now can use GPU devices to build indexes and perform ANN searches thanks to the contribution from NVIDIA. This guide will show you how to install Milvus with GPU support on your machine.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Before installing Milvus with GPU support, make sure you have the following prerequisites:</p>
<ul>
<li><p>The compute capability of your GPU device is 6.0、7.0、7.5、8.0、8.6、9.0. To check whether your GPU device suffices the requirement, check <a href="https://developer.nvidia.com/cuda-gpus">Your GPU Compute Capability</a> on the NVIDIA developer website.</p></li>
<li><p>You have installed the NVIDIA driver for your GPU device on one of <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">the supported Linux distributions</a> and then the NVIDIA Container Toolkit following <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">this guide</a>.</p>
<p>For Ubuntu 22.04 users, you can install the driver and the container toolkit with the following commands:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545
<button class="copy-code-btn"></button></code></pre>
<p>For other OS users, please refer to the <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian">official installation guide</a>.</p>
<p>You can check whether the driver has been installed correctly by running the following command:</p>
<pre><code translate="no" class="language-shell">$ modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span>
<span class="hljs-attr">version</span>:        <span class="hljs-number">545.29</span><span class="hljs-number">.06</span>
<button class="copy-code-btn"></button></code></pre>
<p>You are recommended to use the drivers of version 545 and above.</p></li>
<li><p>You have installed a Kubernetes cluster, and the <code translate="no">kubectl</code> command-line tool has been configured to communicate with your cluster. It is recommended to run this tutorial on a cluster with at least two nodes that are not acting as control plane hosts.</p></li>
</ul>
<h2 id="Create-a-K8s-cluster-using-minikube" class="common-anchor-header">Create a K8s cluster using minikube<button data-href="#Create-a-K8s-cluster-using-minikube" class="anchor-icon" translate="no">
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
    </button></h2><p>We recommend installing Milvus on K8s with <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, a tool that allows you to run K8s locally.</p>
<h3 id="1-Install-minikube" class="common-anchor-header">1. Install minikube</h3><p>See <a href="https://minikube.sigs.k8s.io/docs/start/">install minikube</a> for more information.</p>
<h3 id="2-Start-a-K8s-cluster-using-minikube" class="common-anchor-header">2. Start a K8s cluster using minikube</h3><p>After installing minikube, run the following command to start a K8s cluster.</p>
<pre><code translate="no">$ minikube start --gpus <span class="hljs-built_in">all</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-K8s-cluster-status" class="common-anchor-header">3. Check the K8s cluster status</h3><p>Run <code translate="no">$ kubectl cluster-info</code> to check the status of the K8s cluster you just created. Ensure that you can access the K8s cluster via <code translate="no">kubectl</code>. If you have not installed <code translate="no">kubectl</code> locally, see <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Use kubectl inside minikube</a>.</p>
<p>Minikube has a dependency on default StorageClass when installed. Check the dependency by running the following command. Other installation methods require manual configuration of the StorageClass. See <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">Change the Default StorageClass</a> for more information.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> sc
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span>                    3m36s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-a-Kubernetes-cluster-with-GPU-worker-nodes" class="common-anchor-header">Start a Kubernetes cluster with GPU worker nodes<button data-href="#Start-a-Kubernetes-cluster-with-GPU-worker-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>If you prefer to use GPU-enabled worker nodes, you can follow the steps below to create a K8s cluster with GPU worker nodes. We recommend installing Milvus on a Kubernetes cluster with GPU worker nodes and using the default storage class provisioned.</p>
<h3 id="1-Prepare-GPU-worker-nodes" class="common-anchor-header">1. Prepare GPU worker nodes</h3><p>See <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes">Prepare GPU worker nodes</a> for more information.</p>
<h3 id="2-Enable-GPU-support-on-Kubernetes" class="common-anchor-header">2. Enable GPU support on Kubernetes</h3><p>See <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm">install nvidia-device-plugin with helm</a> for more information.</p>
<p>After setting up, run <code translate="no">kubectl describe node &lt;gpu-worker-node&gt;</code> to view the GPU resources. The command output should be similar to the following:</p>
<pre><code translate="no" class="language-bash">Capacity:
  ...
  nvidia.com/gpu:     4
  ...
Allocatable:
  ...
  nvidia.com/gpu:     4
  ...
<button class="copy-code-btn"></button></code></pre>
<p>Note: In this example, we have set up a GPU worker node with 4 GPU cards.</p>
<h3 id="3-Check-the-default-storage-class" class="common-anchor-header">3. Check the default storage class</h3><p>Milvus relies on the default storage class to automatically provision volumes for data persistence. Run the following command to check storage classes:</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> sc
<button class="copy-code-btn"></button></code></pre>
<p>The command output should be similar to the following:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-variable constant_">NAME</span>                   <span class="hljs-variable constant_">PROVISIONER</span>                                     <span class="hljs-variable constant_">RECLAIMPOLICY</span>   <span class="hljs-variable constant_">VOLUMEBINDINGMODE</span>      <span class="hljs-variable constant_">ALLOWVOLUMEEXPANSION</span>   <span class="hljs-variable constant_">AGE</span>
local-<span class="hljs-title function_">path</span> (<span class="hljs-keyword">default</span>)   rancher.<span class="hljs-property">io</span>/local-path                           <span class="hljs-title class_">Delete</span>          <span class="hljs-title class_">WaitForFirstConsumer</span>   <span class="hljs-literal">false</span>                  461d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Helm-Chart-for-Milvus" class="common-anchor-header">Install Helm Chart for Milvus<button data-href="#Install-Helm-Chart-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Helm is a K8s package manager that can help you deploy Milvus quickly.</p>
<ol>
<li>Add Milvus to Helm’s repository.</li>
</ol>
<pre><code translate="no" class="language-bash">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>The Milvus Helm Charts repo at <code translate="no">https://milvus-io.github.io/milvus-helm/</code> has been archived and you can get further updates from <code translate="no">https://zilliztech.github.io/milvus-helm/</code> as follows:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>The archived repo is still available for the charts up to 4.0.31. For later releases, use the new repo instead.</p>
</div>
<ol start="2">
<li>Update your local chart repository.</li>
</ol>
<pre><code translate="no" class="language-bash">$ helm repo update
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Milvus" class="common-anchor-header">Start Milvus<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Once you have installed the Helm chart, you can start Milvus on Kubernetes. In this section, we will guide you through the steps to start Milvus with GPU support.</p>
<p>You should start Milvus with Helm by specifying the release name, the chart, and the parameters you expect to change. In this guide, we use <code translate="no">my-release</code> as the release name. To use a different release name, replace <code translate="no">my-release</code> in the following commands with the one you are using.</p>
<p>Milvus allows you to assign one or more GPU devices to Milvus.</p>
<ul>
<li><p>Assign a single GPU device (recommended)</p>
<p>Run the following commands to assign a single GPU device to Milvus:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
standalone:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Assign multiple GPU devices</p>
<p>Run the following commands to assign multiple GPU devices to Milvus:</p>
<p>Run the following commands to assign multiple GPU devices to Milvus:</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>In the configuration above, the indexNode and queryNode share two GPUs. To assign different GPUs to the indexNode and the queryNode, you can modify the configuration accordingly by setting <code translate="no">extraEnv</code> in the configuration file as follows:</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;0&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre>
  <div class="alert note">
  See <a href="https://artifacthub.io/packages/helm/milvus-helm/milvus">Milvus Helm Chart</a> and <a href="https://helm.sh/docs/">Helm</a> for more information.
  </div>
<p>Check the status of the running pods:</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>After Milvus starts, the <code translate="no">READY</code> column displays <code translate="no">1/1</code> for all pods.</p>
<pre><code translate="no" class="language-text">NAME                                               READY   STATUS      RESTARTS   AGE
my-release-etcd-0                                  1/1     Running     0          30s
my-release-milvus-standalone-54c4f88cb9-f84pf      1/1     Running     0          30s
my-release-minio-5564fbbddc-mz7f5                  1/1     Running     0          30s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-to-Milvus" class="common-anchor-header">Connect to Milvus<button data-href="#Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Verify which local port the Milvus server is listening on. Replace the pod name with your own.</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-standalone<span class="hljs-number">-54</span>c4f88cb9-f84pf --template=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">19530
<button class="copy-code-btn"></button></code></pre>
<p>Open a new terminal and run the following command to forward a local port to the port that Milvus uses. Optionally, omit the designated port and use <code translate="no">:19530</code> to let <code translate="no">kubectl</code> allocate a local port for you so that you don’t have to manage port conflicts.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus 27017:19530
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>By default, ports forwarded by kubectl only listen on localhost. Use flag <code translate="no">address</code> if you want Milvus server to listen on selected IP or all addresses.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">Uninstall Milvus<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Run the following command to uninstall Milvus.</p>
<pre><code translate="no" class="language-bash">$ helm uninstall my-release
<button class="copy-code-btn"></button></code></pre>
<h2 id="Stop-the-K8s-cluster" class="common-anchor-header">Stop the K8s cluster<button data-href="#Stop-the-K8s-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Stop the cluster and the minikube VM without deleting the resources you created.</p>
<pre><code translate="no" class="language-bash">$ minikube stop
<button class="copy-code-btn"></button></code></pre>
<p>Run <code translate="no">minikube start</code> to restart the cluster.</p>
<h2 id="Delete-the-K8s-cluster" class="common-anchor-header">Delete the K8s cluster<button data-href="#Delete-the-K8s-cluster" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
Run <code translate="no">$ kubectl logs `pod_name`</code> to get the <code translate="no">stderr</code> log of the pod before deleting the cluster and all resources.
</div>
<p>Delete the cluster, the minikube VM, and all resources you created including persistent volumes.</p>
<pre><code translate="no" class="language-bash">$ minikube <span class="hljs-keyword">delete</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Having installed Milvus, you can:</p>
<ul>
<li><p>Check <a href="/docs/ja/v2.4.x/quickstart.md">Hello Milvus</a> to run an example code with different SDKs to see what Milvus can do.</p></li>
<li><p>Learn the basic operations of Milvus:</p>
<ul>
<li><a href="/docs/ja/v2.4.x/manage_databases.md">Manage Databases</a></li>
<li><a href="/docs/ja/v2.4.x/manage-collections.md">Manage Collections</a></li>
<li><a href="/docs/ja/v2.4.x/manage-partitions.md">Manage Partitions</a></li>
<li><a href="/docs/ja/v2.4.x/insert-update-delete.md">Insert, Upsert &amp; Delete</a></li>
<li><a href="/docs/ja/v2.4.x/single-vector-search.md">Single-Vector Search</a></li>
<li><a href="/docs/ja/v2.4.x/multi-vector-search.md">Hybrid Search</a></li>
</ul></li>
<li><p><a href="/docs/ja/v2.4.x/upgrade_milvus_standalone-helm.md">Upgrade Milvus Using Helm Chart</a>.</p></li>
<li><p>Explore <a href="/docs/ja/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>, an open-source tool for Milvus data backups.</p></li>
<li><p>Explore <a href="/docs/ja/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, an open-source tool for debugging Milvus and dynamic configuration updates.</p></li>
<li><p>Explore <a href="https://milvus.io/docs/attu.md">Attu</a>, an open-source GUI tool for intuitive Milvus management.</p></li>
<li><p><a href="/docs/ja/v2.4.x/monitor.md">Monitor Milvus with Prometheus</a>.</p></li>
</ul>
