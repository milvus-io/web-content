---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
summary: Learn how to install Milvus cluster on Kubernetes using Milvus Operator
title: Install Milvus Cluster with Milvus Operator
---
<h1 id="Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="common-anchor-header">Run Milvus in Kubernetes with Milvus Operator<button data-href="#Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>This page illustrates how to start a Milvus instance in Kubernetes using <a href="https://github.com/zilliztech/milvus-operator">Milvus Operator</a>.</p>
<h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operator is a solution that helps you deploy and manage a full Milvus service stack to target Kubernetes (K8s) clusters. The stack includes all Milvus components and relevant dependencies like etcd, Pulsar, and MinIO.</p>
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
    </button></h2><ul>
<li><p><a href="/docs/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">Create a K8s cluster</a>.</p></li>
<li><p>Install a <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. You can check the installed StorageClass as follows.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Check <a href="/docs/prerequisite-helm.md">the hardware and software requirements</a> before installation.</p></li>
<li><p>Before installing Milvus, it is recommended to use the <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> to estimate the hardware requirements based on your data size. This helps ensure optimal performance and resource allocation for your Milvus installation.</p></li>
</ul>
<div class="alert note">
<p>If you encounter any issues pulling the image, contact us at <a href="mailto:community@zilliz.com">community@zilliz.com</a> with details about the problem, and we’ll provide you with the necessary support.</p>
</div>
<h2 id="Install-Milvus-Operator" class="common-anchor-header">Install Milvus Operator<button data-href="#Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operator defines a Milvus cluster custom resources on top of <a href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/">Kubernetes Custom Resources</a>. When custom resources are defined, you can use K8s APIs in a declarative way and manage the Milvus deployment stack to ensure its scalability and high availability.</p>
<div class="filter">
  <a href="#helm">Helm</a>
  <a href="#kubectl">Kubectl</a>
</div>
<div class="filter-helm">
<p>Run the following command to install Milvus Operator with Helm.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm install milvus-operator \
  -n milvus-operator --create-namespace \
  --<span class="hljs-built_in">wait</span> --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.3.0/milvus-operator-1.3.0.tgz</span>
<button class="copy-code-btn"></button></code></pre>
<p>You will see the output similar to the following after the installation process ends.</p>
<pre><code translate="no" class="language-shell">NAME: milvus-operator
LAST DEPLOYED: Thu Jul  7 13:18:40 2022
NAMESPACE: milvus-operator
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
Milvus Operator Is Starting, use `kubectl get -n milvus-operator deploy/milvus-operator` to check if its successfully installed
If Operator not started successfully, check the checker&#x27;s log with `kubectl -n milvus-operator logs job/milvus-operator-checker`
Full Installation doc can be found in https://github.com/zilliztech/milvus-operator/blob/main/docs/installation/installation.md
Quick start with `kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_minimum.yaml`
More samples can be found in https://github.com/zilliztech/milvus-operator/tree/main/config/samples
CRD Documentation can be found in https://github.com/zilliztech/milvus-operator/tree/main/docs/CRD
<button class="copy-code-btn"></button></code></pre>
<p>If you have installed Milvus Operator before, upgrade it using the following command:</p>
<pre><code translate="no" class="language-shell">helm upgrade milvus-operator \
  -n milvus-operator --create-namespace \
  --wait --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.3.0/milvus-operator-1.3.0.tgz
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-kubectl">
<p>Run the following command to install Milvus Operator with <code translate="no">kubectl</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>You will see the output similar to the following after the installation process ends.</p>
<pre><code translate="no" class="language-shell">namespace/milvus-operator created
customresourcedefinition.apiextensions.k8s.io/milvusclusters.milvus.io created
serviceaccount/milvus-operator-controller-manager created
role.rbac.authorization.k8s.io/milvus-operator-leader-election-role created
clusterrole.rbac.authorization.k8s.io/milvus-operator-manager-role created
clusterrole.rbac.authorization.k8s.io/milvus-operator-metrics-reader created
clusterrole.rbac.authorization.k8s.io/milvus-operator-proxy-role created
rolebinding.rbac.authorization.k8s.io/milvus-operator-leader-election-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/milvus-operator-manager-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/milvus-operator-proxy-rolebinding created
configmap/milvus-operator-manager-config created
service/milvus-operator-controller-manager-metrics-service created
service/milvus-operator-webhook-service created
deployment.apps/milvus-operator-controller-manager created
<button class="copy-code-btn"></button></code></pre>
<p>You can check if the Milvus Operator pod is running as follows:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods -n milvus-operator</span>

NAME                               READY   STATUS    RESTARTS   AGE
milvus-operator-5fd77b87dc-msrk4   1/1     Running   0          46s
<button class="copy-code-btn"></button></code></pre>
</div>
<h2 id="Deploy-Milvus" class="common-anchor-header">Deploy Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Deploy a Milvus cluster</h3><p>Once the Milvus Operator pod is running, you can deploy a Milvus cluster as follows.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>The command above deploys a Milvus cluster with <strong>WoodPecker</strong> as the message queue (recommended for v2.6.0) and all new architectural components including the Streaming Node.</p>
<p><strong>Architecture highlights in this deployment:</strong></p>
<ul>
<li><strong>Message Queue</strong>: Uses WoodPecker (reduces infrastructure maintenance)</li>
<li><strong>Streaming Node</strong>: Enabled for enhanced data processing</li>
<li><strong>Mix Coordinator</strong>: Consolidated coordinator components for improved efficiency</li>
</ul>
<p>To customize these settings, we recommend you use the <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> to adjust the configurations based on your actual data size and then download the corresponding YAML file. To learn more about configuration parameters, refer to <a href="https://milvus.io/docs/system_configuration.md">Milvus System Configurations Checklist</a>.</p>
<div class="alert note">
<ul>
<li>The release name should only contain letters, numbers and dashes. Dots are not allowed in the release name.</li>
<li>You can also deploy a Milvus instance in standalone mode, where all its components are contained within a single pod. To do so, change the configuration file URL in the above command to <code translate="no">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_default.yaml</code></li>
</ul>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Check Milvus cluster status</h3><p>Run the following command to check Milvus cluster status</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get milvus my-release -o yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Once your Milvus cluster is ready, the output of the above command should be similar to the following. If the <code translate="no">status.status</code> field stays <code translate="no">Unhealthy</code>, your Milvus cluster is still under creation.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">status:</span>
  <span class="hljs-attr">conditions:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;xxxx-xx-xxTxx:xx:xxZ&quot;</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">StorageReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">StorageReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;xxxx-xx-xxTxx:xx:xxZ&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">Pulsar</span> <span class="hljs-string">is</span> <span class="hljs-string">ready</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">PulsarReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">PulsarReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;xxxx-xx-xxTxx:xx:xxZ&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">Etcd</span> <span class="hljs-string">endpoints</span> <span class="hljs-string">is</span> <span class="hljs-string">healthy</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">EtcdReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">EtcdReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;xxxx-xx-xxTxx:xx:xxZ&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">All</span> <span class="hljs-string">Milvus</span> <span class="hljs-string">components</span> <span class="hljs-string">are</span> <span class="hljs-string">healthy</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">MilvusClusterHealthy</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">MilvusReady</span>
  <span class="hljs-attr">endpoint:</span> <span class="hljs-string">my-release-milvus.default:19530</span>
  <span class="hljs-attr">status:</span> <span class="hljs-string">Healthy</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus Operator creates Milvus dependencies, such as etcd, Pulsar, and MinIO, and then Milvus components, such as proxy, coordinators, and nodes.</p>
<p>Once your Milvus cluster is ready, the status of all pods in the Milvus cluster should be similar to the following.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods</span>

NAME                                             READY   STATUS    RESTARTS   AGE
my-release-etcd-0                                1/1     Running   0          2m36s
my-release-etcd-1                                1/1     Running   0          2m36s
my-release-etcd-2                                1/1     Running   0          2m36s
my-release-milvus-datanode-58955c65b9-j4j7s      1/1     Running   0          92s
my-release-milvus-mixcoord-686f84968f-jcv5d      1/1     Running   0          92s
my-release-milvus-proxy-646f48fc7c-4lctb         1/1     Running   0          92s
my-release-milvus-querynode-0-d89d7677b-x7j7q    1/1     Running   0          91s
my-release-milvus-streamingnode-556bdcc87c-2qwcc 1/1     Running   0          92s
my-release-minio-0                               1/1     Running   0          2m36s
my-release-minio-1                               1/1     Running   0          2m36s
my-release-minio-2                               1/1     Running   0          2m35s
my-release-minio-3                               1/1     Running   0          2m35s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Forward a local port to Milvus</h3><p>Run the following command to get the port at which your Milvus cluster serves.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pod my-release-milvus-proxy-84f67cdb7f-pg6wf --template</span>
=&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;
19530
<button class="copy-code-btn"></button></code></pre>
<p>The output shows that the Milvus instance serves at the default port <strong>19530</strong>.</p>
<div class="alert note">
<p>If you have deployed Milvus in standalone mode, change the pod name from <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> to <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code>.</p>
</div>
<p>Then, run the following command to forward a local port to the port at which Milvus serves.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward service/my-release-milvus 27017:19530</span>
Forwarding from 127.0.0.1:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Optionally, you can use <code translate="no">:19530</code> instead of <code translate="no">27017:19530</code> in the above command to let <code translate="no">kubectl</code> allocate a local port for you so that you don’t have to manage port conflicts.</p>
<p>By default, kubectl’s port-forwarding only listens on <code translate="no">localhost</code>. Use the <code translate="no">address</code> flag if you want Milvus to listen on the selected or all IP addresses. The following command makes port-forward listen on all IP addresses on the host machine.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530</span>
Forwarding from 0.0.0.0:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Now, you can connect to Milvus using the forwarded port.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Optional) Update Milvus configurations<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>You can view and update the configurations of your Milvus cluster by calling the <code translate="no">patch</code> command as follows:</p>
<ol>
<li><p>Run the following command to view the would be configurations.</p>
<p>The following asummes that you want to update the <code translate="no">spec.components.disableMetric</code> parameter to <code translate="no">false</code> ms.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl patch milvus my-release --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;merge&#x27;</span>\
  -p <span class="hljs-string">&#x27;{&quot;spec&quot;:{&quot;components&quot;:{&quot;disableMetric&quot;:false}}}&#x27;</span> \
  --dry-run=client -o yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>For applicable configuration items, refer to <a href="/docs/system_configuration.md">System Configuration</a>.</p></li>
<li><p>Update the configurations.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl patch milvus my-release --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;merge&#x27;</span>\
  -p <span class="hljs-string">&#x27;{&quot;spec&quot;:{&quot;components&quot;:{&quot;disableMetric&quot;:false}}}&#x27;</span></span> 
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Access-Milvus-WebUI" class="common-anchor-header">Access Milvus WebUI<button data-href="#Access-Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus ships with a built-in GUI tool called Milvus WebUI that you can access through your browser. Milvus Web UI enhances system observability with a simple and intuitive interface. You can use Milvus Web UI to observe the statistics and metrics of the components and dependencies of Milvus, check database and collection details, and list detailed Milvus configurations. For details about Milvus Web UI, see <a href="/docs/milvus-webui.md">Milvus WebUI</a></p>
<p>To enable the access to the Milvus Web UI, you need to port-forward the proxy pod to a local port.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27018:9091</span>
Forwarding from 0.0.0.0:27018 -&gt; 9091
<button class="copy-code-btn"></button></code></pre>
<p>Now, you can access Milvus Web UI at <code translate="no">http://localhost:27018</code>.</p>
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
    </button></h2><p>Run the following command to uninstall the Milvus cluster.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl delete milvus my-release</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>When you delete the Milvus cluster using the default configuration, dependencies like etcd, Pulsar, and MinIO are not deleted. Therefore, next time when you install the same Milvus cluster instance, these dependencies will be used again.</li>
<li>To delete the dependencies and persistent volume claims (PVCs) along with the Milvus cluster, see <a href="https://github.com/zilliztech/milvus-operator/blob/main/config/samples/milvus_deletion.yaml">configuration file</a>.</li>
</ul>
</div>
<h2 id="Uninstall-Milvus-Operator" class="common-anchor-header">Uninstall Milvus Operator<button data-href="#Uninstall-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>There are also two ways to uninstall Milvus Operator.</p>
<ul>
<li><a href="#Uninstall-with-Helm">Uninstall with Helm</a></li>
<li><a href="#Uninstall-with-kubectl">Uninstall with kubectl</a></li>
</ul>
<h4 id="Uninstall-with-Helm" class="common-anchor-header">Uninstall with Helm</h4><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm -n milvus-operator uninstall milvus-operator</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Uninstall-with-kubectl" class="common-anchor-header">Uninstall with kubectl</h4><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl delete -f https://raw.githubusercontent.com/zilliztech/milvus-operator/v1.3.0/deploy/manifests/deployment.yaml</span>
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
    </button></h2><p>Having installed Milvus in Docker, you can:</p>
<ul>
<li><p>Check <a href="/docs/quickstart.md">Hello Milvus</a> to see what Milvus can do.</p></li>
<li><p>Learn the basic operations of Milvus:</p>
<ul>
<li><a href="/docs/manage_databases.md">Manage Databases</a></li>
<li><a href="/docs/manage-collections.md">Manage Collections</a></li>
<li><a href="/docs/manage-partitions.md">Manage Partitions</a></li>
<li><a href="/docs/insert-update-delete.md">Insert, Upsert & Delete</a></li>
<li><a href="/docs/single-vector-search.md">Single-Vector Search</a></li>
<li><a href="/docs/multi-vector-search.md">Hybrid Search</a></li>
</ul></li>
<li><p><a href="/docs/upgrade_milvus_cluster-helm.md">Upgrade Milvus Using Helm Chart</a>.</p></li>
<li><p><a href="/docs/scaleout.md">Scale your Milvus cluster</a>.</p></li>
<li><p>Deploy your Milvu cluster on clouds:</p>
<ul>
<li><a href="/docs/eks.md">Amazon EKS</a></li>
<li><a href="/docs/gcp.md">Google Cloud</a></li>
<li><a href="/docs/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/milvus-webui.md">Milvus WebUI</a>, an intuitive web interface for Milvus observability and management.</p></li>
<li><p>Explore <a href="/docs/milvus_backup_overview.md">Milvus Backup</a>, an open-source tool for Milvus data backups.</p></li>
<li><p>Explore <a href="/docs/birdwatcher_overview.md">Birdwatcher</a>, an open-source tool for debugging Milvus and dynamic configuration updates.</p></li>
<li><p>Explore <a href="https://github.com/zilliztech/attu">Attu</a>, an open-source GUI tool for intuitive Milvus management.</p></li>
<li><p><a href="/docs/monitor.md">Monitor Milvus with Prometheus</a>.</p></li>
</ul>
