---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
order: 0
group: install_cluster-milvusoperator.md
summary: Learn how to install Milvus cluster on Kubernetes using Milvus Operator
title: ''
---
<div class="tab-wrapper"><a href="/docs/v2.1.x/install_cluster-milvusoperator.md" class='active '>Milvus Operator</a><a href="/docs/v2.1.x/install_cluster-helm.md" class=''>Helm</a><a href="/docs/v2.1.x/install_cluster-docker.md" class=''>Docker Compose</a><a href="/docs/v2.1.x/install_cluster-ansible.md" class=''>Ansible</a></div>
<h1 id="Install-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">Install Milvus Cluster with Milvus Operator<button data-href="#Install-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Operator is a solution that helps you deploy and manage a full Milvus service stack to target Kubernetes (K8s) clusters. The stack includes all Milvus components and relevant dependencies like etcd, Pulsar and MinIO. This topic introduces how to deploy a Milvus cluster with Milvus Operator on K8s.</p>
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
    </button></h2><p><a href="/docs/v2.1.x/prerequisite-helm.md">Check the requirements for hardware and software</a> prior to your installation.</p>
<h2 id="Create-a-K8s-Cluster" class="common-anchor-header">Create a K8s Cluster<button data-href="#Create-a-K8s-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>If you have already deployed a K8s cluster for production, you can skip this step and proceed directly to <a href="/docs/v2.1.x/install_cluster-milvusoperator.md#Deploy-Milvus-Operator">deploy Milvus Operator</a>. If not, you can follow the steps below to quickly create a K8s for testing, and then use it to deploy a Milvus cluster with Milvus Operator.</p>
<h3 id="Create-a-K8s-cluster-using-minikube" class="common-anchor-header">Create a K8s cluster using minikube</h3><p>We recommend installing Milvus on K8s with <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, a tool that allows you to run K8s locally.</p>
<div class="alert note">
minikube can only be used in test environments. It is not recommended that you deploy Milvus distributed clusters in this way in production environments.
</div>
<h4 id="1-Install-minikube" class="common-anchor-header">1. Install minikube</h4><p>See <a href="https://minikube.sigs.k8s.io/docs/start/">install minikube</a> for more information.</p>
<h4 id="2-Start-a-K8s-cluster-using-minikube" class="common-anchor-header">2. Start a K8s cluster using minikube</h4><p>After installing minikube, run the following command to start a K8s cluster.</p>
<pre><code translate="no">$ minikube start
<button class="copy-code-btn"></button></code></pre>
<h4 id="3-Check-the-K8s-cluster-status" class="common-anchor-header">3. Check the K8s cluster status</h4><p>Run <code translate="no">$ kubectl cluster-info</code> to check the status of the K8s cluster you just created. Ensure that you can access the K8s cluster via <code translate="no">kubectl</code>. If you have not installed <code translate="no">kubectl</code> locally, see <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Use kubectl inside minikube</a>.</p>
<h2 id="Deploy-Milvus-Operator" class="common-anchor-header">Deploy Milvus Operator<button data-href="#Deploy-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operator defines a Milvus cluster custom resources on top of <a href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/">Kubernetes Custom Resources</a>. When the custom resources are defined, you can use K8s APIs in a declarative way and manage Milvus deployment stack to ensure its scalability and high-availability.</p>
<h3 id="Prerequisites" class="common-anchor-header">Prerequisites</h3><ul>
<li>Ensure that you can access the K8s cluster via <code translate="no">kubectl</code> or <code translate="no">helm</code>.</li>
<li>Ensure the StorageClass dependency is installed as Milvus clusters depend on default StorageClass for data persistence. minikube has a dependency on default StorageClass when installed. Check the dependency by running the command <code translate="no">kubectl get sc</code>. If StorageClass is installed, you will see the following output. If not, see <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">Change the Default StorageClass</a> for more information.</li>
</ul>
<pre><code translate="no">NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span>                    3m36s
<button class="copy-code-btn"></button></code></pre>
<h3 id="1-Install-cert-manager" class="common-anchor-header">1. Install cert-manager</h3><div class="alert note">
You can install Milvus Operator with Helm or `kubectl` command. If you choose to use Helm, you can skip this step and proceed directly to <a href=install_cluster-milvusoperator.md#Install-by-Helm-command>Install by Helm command</a>.
</div>
<p>Milvus Operator uses <a href="https://cert-manager.io/docs/installation/supported-releases/">cert-manager</a> to provide certificate for webhook server. Run the following command to install cert-manager.</p>
<pre><code translate="no">$ kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.5.3/cert-manager.yaml
<button class="copy-code-btn"></button></code></pre>
<p>If cert-manager is installed, you can see the following output.</p>
<pre><code translate="no">customresourcedefinition.apiextensions.k8s.io/certificaterequests.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/certificates.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/challenges.acme.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/clusterissuers.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/issuers.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/orders.acme.cert-manager.io created
namespace/cert-manager created
serviceaccount/cert-manager-cainjector created
serviceaccount/cert-manager created
serviceaccount/cert-manager-webhook created
clusterrole.rbac.authorization.k8s.io/cert-manager-cainjector created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-issuers created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-clusterissuers created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-certificates created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-orders created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-challenges created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-ingress-shim created
clusterrole.rbac.authorization.k8s.io/cert-manager-view created
clusterrole.rbac.authorization.k8s.io/cert-manager-edit created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-approve:cert-manager-io created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-certificatesigningrequests created
clusterrole.rbac.authorization.k8s.io/cert-manager-webhook:subjectaccessreviews created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-cainjector created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-issuers created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-clusterissuers created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-certificates created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-orders created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-challenges created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-ingress-shim created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-approve:cert-manager-io created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-certificatesigningrequests created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-webhook:subjectaccessreviews created
role.rbac.authorization.k8s.io/cert-manager-cainjector:leaderelection created
role.rbac.authorization.k8s.io/cert-manager:leaderelection created
role.rbac.authorization.k8s.io/cert-manager-webhook:dynamic-serving created
rolebinding.rbac.authorization.k8s.io/cert-manager-cainjector:leaderelection created
rolebinding.rbac.authorization.k8s.io/cert-manager:leaderelection created
rolebinding.rbac.authorization.k8s.io/cert-manager-webhook:dynamic-serving created
service/cert-manager created
service/cert-manager-webhook created
deployment.apps/cert-manager-cainjector created
deployment.apps/cert-manager created
deployment.apps/cert-manager-webhook created
mutatingwebhookconfiguration.admissionregistration.k8s.io/cert-manager-webhook created
validatingwebhookconfiguration.admissionregistration.k8s.io/cert-manager-webhook created
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
cert-manager version 1.13 or later is required.
</div>
<p>Run <code translate="no">$ kubectl get pods -n cert-manager</code> to check if cert-manager is running. You can see the following output if all the pods are running.</p>
<pre><code translate="no">NAME                                      READY   STATUS    RESTARTS   AGE
cert-manager-848f547974-gccz8             1/1     Running   0          70s
cert-manager-cainjector-54f4cc6b5-dpj84   1/1     Running   0          70s
cert-manager-webhook-7c9588c76-tqncn      1/1     Running   0          70s
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Milvus-Operator" class="common-anchor-header">2. Install Milvus Operator</h3><p>There are two ways to install Milvus Operator on K8s:</p>
<ul>
<li>with helm chart</li>
<li>with <code translate="no">kubectl</code> command directly with raw manifests</li>
</ul>
<h4 id="Install-by-Helm-command" class="common-anchor-header">Install by Helm command</h4><pre><code translate="no">helm install milvus-operator \
  -n milvus-operator --create-namespace \
  --<span class="hljs-built_in">wait</span> --wait-for-jobs \
  https://github.com/milvus-io/milvus-operator/releases/download/v0.6.7/milvus-operator-0.6.7.tgz
<button class="copy-code-btn"></button></code></pre>
<p>If Milvus Operator is installed, you can see the following output.</p>
<pre><code translate="no">NAME: milvus-operator
LAST DEPLOYED: Thu Jul  <span class="hljs-number">7</span> <span class="hljs-number">13</span>:<span class="hljs-number">18</span>:<span class="hljs-number">40</span> <span class="hljs-number">2022</span>
NAMESPACE: milvus-operator
STATUS: deployed
REVISION: <span class="hljs-number">1</span>
TEST SUITE: <span class="hljs-literal">None</span>
NOTES:
Milvus Operator Is Starting, use `kubectl get -n milvus-operator deploy/milvus-operator` to check <span class="hljs-keyword">if</span> its successfully installed
If Operator <span class="hljs-keyword">not</span> started successfully, check the checke<span class="hljs-string">r&#x27;s log with `kubectl -n milvus-operator logs job/milvus-operator-checker`
Full Installation doc can be found in https://github.com/milvus-io/milvus-operator/blob/main/docs/installation/installation.md
Quick start with `kubectl apply -f https://raw.githubusercontent.com/milvus-io/milvus-operator/main/config/samples/milvus_minimum.yaml`
More samples can be found in https://github.com/milvus-io/milvus-operator/tree/main/config/samples
CRD Documentation can be found in https://github.com/milvus-io/milvus-operator/tree/main/docs/CRD
</span><button class="copy-code-btn"></button></code></pre>
<h4 id="Install-by-kubectl-command" class="common-anchor-header">Install by <code translate="no">kubectl</code> command</h4><pre><code translate="no">$ kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus-operator/main/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>If Milvus Operator is installed, you can see the following output.</p>
<pre><code translate="no">namespace/milvus-operator created
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
certificate.cert-manager.io/milvus-operator-serving-cert created
issuer.cert-manager.io/milvus-operator-selfsigned-issuer created
mutatingwebhookconfiguration.admissionregistration.k8s.io/milvus-operator-mutating-webhook-configuration created
validatingwebhookconfiguration.admissionregistration.k8s.io/milvus-operator-validating-webhook-configuration created
<button class="copy-code-btn"></button></code></pre>
<p>Run <code translate="no">$ kubectl get pods -n milvus-operator</code> to check if Milvus Operator is running. You can see the following output if Milvus Operator is running.</p>
<pre><code translate="no">NAME                               READY   STATUS    RESTARTS   AGE
milvus-<span class="hljs-keyword">operator</span><span class="hljs-number">-5f</span>d77b87dc-msrk4   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running   <span class="hljs-number">0</span>          <span class="hljs-number">46</span>s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-a-Milvus-cluster" class="common-anchor-header">Install a Milvus cluster<button data-href="#Install-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>This tutorial uses the default configuration to install a Milvus cluster. All Milvus cluster components are enabled with multiple replicas, which consumes many resources. If you have very limited local resources, you can install a Milvus cluster <a href="https://github.com/milvus-io/milvus-operator/blob/main/config/samples/milvus_cluster_minimum.yaml">using the minimum configuration</a>.</p>
<h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Deploy a Milvus cluster</h3><p>When Milvus Operator starts, run the following command to deploy a Milvus cluster.</p>
<pre><code translate="no">$ kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>When the cluster is deployed, you can see the following output.</p>
<pre><code translate="no">milvuscluster.milvus.io/my-release created
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Check-the-Milvus-cluster-status" class="common-anchor-header">2. Check the Milvus cluster status</h3><p>Run the following command to check the status of the Milvus cluster you just deployed.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> milvus my-release -o yaml
<button class="copy-code-btn"></button></code></pre>
<p>You can confirm the current status of Milvus cluster from the <code translate="no">status</code> field in the output. When the Milvus cluster is still under creation, the <code translate="no">status</code> shows <code translate="no">Unhealthy</code>.</p>
<pre><code translate="no">apiVersion: milvus.io/v1alpha1
kind: MilvusCluster
metadata:
...
status:
  conditions:
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T02:52:04Z&quot;</span>
    message: <span class="hljs-string">&#x27;Get &quot;http://my-release-minio.default:9000/minio/admin/v3/info&quot;: dial
      tcp 10.96.78.153:9000: connect: connection refused&#x27;</span>
    reason: ClientError
    status: <span class="hljs-string">&quot;False&quot;</span>
    <span class="hljs-built_in">type</span>: StorageReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T02:52:04Z&quot;</span>
    message: connection error
    reason: PulsarNotReady
    status: <span class="hljs-string">&quot;False&quot;</span>
    <span class="hljs-built_in">type</span>: PulsarReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T02:52:04Z&quot;</span>
    message: All etcd endpoints are unhealthy
    reason: EtcdNotReady
    status: <span class="hljs-string">&quot;False&quot;</span>
    <span class="hljs-built_in">type</span>: EtcdReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T02:52:04Z&quot;</span>
    message: Milvus Dependencies is not ready
    reason: DependencyNotReady
    status: <span class="hljs-string">&quot;False&quot;</span>
    <span class="hljs-built_in">type</span>: MilvusReady
  endpoint: my-release-milvus.default:19530
  status: Unhealthy
<button class="copy-code-btn"></button></code></pre>
<p>Run the following command to check the current status of Milvus pods.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                                  READY   STATUS              RESTARTS   AGE
my-release-etcd<span class="hljs-number">-0</span>                     <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-etcd<span class="hljs-number">-1</span>                     <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     ContainerCreating   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-etcd<span class="hljs-number">-2</span>                     <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     ContainerCreating   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-minio<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-minio<span class="hljs-number">-1</span>                    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-minio<span class="hljs-number">-2</span>                    <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-minio<span class="hljs-number">-3</span>                    <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     ContainerCreating   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-pulsar-bookie<span class="hljs-number">-0</span>            <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Pending             <span class="hljs-number">0</span>          <span class="hljs-number">15</span>s
my-release-pulsar-bookie<span class="hljs-number">-1</span>            <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Pending             <span class="hljs-number">0</span>          <span class="hljs-number">15</span>s
my-release-pulsar-bookie-<span class="hljs-keyword">init</span>-h6tfz   <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Init:<span class="hljs-number">0</span>/<span class="hljs-number">1</span>            <span class="hljs-number">0</span>          <span class="hljs-number">15</span>s
my-release-pulsar-broker<span class="hljs-number">-0</span>            <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Init:<span class="hljs-number">0</span>/<span class="hljs-number">2</span>            <span class="hljs-number">0</span>          <span class="hljs-number">15</span>s
my-release-pulsar-broker<span class="hljs-number">-1</span>            <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Init:<span class="hljs-number">0</span>/<span class="hljs-number">2</span>            <span class="hljs-number">0</span>          <span class="hljs-number">15</span>s
my-release-pulsar-proxy<span class="hljs-number">-0</span>             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Init:<span class="hljs-number">0</span>/<span class="hljs-number">2</span>            <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-pulsar-proxy<span class="hljs-number">-1</span>             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Init:<span class="hljs-number">0</span>/<span class="hljs-number">2</span>            <span class="hljs-number">0</span>          <span class="hljs-number">15</span>s
my-release-pulsar-pulsar-<span class="hljs-keyword">init</span>-d2t56   <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Init:<span class="hljs-number">0</span>/<span class="hljs-number">2</span>            <span class="hljs-number">0</span>          <span class="hljs-number">15</span>s
my-release-pulsar-recovery<span class="hljs-number">-0</span>          <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Init:<span class="hljs-number">0</span>/<span class="hljs-number">1</span>            <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-pulsar-toolset<span class="hljs-number">-0</span>           <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-pulsar-zookeeper<span class="hljs-number">-0</span>         <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Pending             <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Enable-Milvus-components" class="common-anchor-header">3. Enable Milvus components</h3><p>Milvus Operator first creates all dependencies like etcd, Pulsar, and MinIO, and then continues to create Milvus components. Therefore, you can only see the pods of etcd, Pulsar, and MinIO now.  Once all denependencies are enabled, Milvus Operator will start all Milvus components. The status of the Milvus cluster is shown as in the following output.</p>
<pre><code translate="no">...
status:
  conditions:
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T05:59:41Z&quot;</span>
    reason: StorageReady
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: StorageReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T06:06:23Z&quot;</span>
    message: Pulsar is ready
    reason: PulsarReady
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: PulsarReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T05:59:41Z&quot;</span>
    message: Etcd endpoints is healthy
    reason: EtcdReady
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: EtcdReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T06:06:24Z&quot;</span>
    message: <span class="hljs-string">&#x27;[datacoord datanode indexcoord indexnode proxy querycoord querynode
      rootcoord] not ready&#x27;</span>
    reason: MilvusComponentNotHealthy
    status: <span class="hljs-string">&quot;False&quot;</span>
    <span class="hljs-built_in">type</span>: MilvusReady
  endpoint: my-release-milvus.default:19530
  status: Unhealthy
<button class="copy-code-btn"></button></code></pre>
<p>Check the status of the Milvus pods again.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                                            READY   STATUS              RESTARTS   AGE
my-release-etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m49s
my-release-etcd<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m49s
my-release-etcd<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m49s
my-release-milvus-datacoord<span class="hljs-number">-6</span>c7bb4b488-k9htl    <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     ContainerCreating   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-milvus-datanode<span class="hljs-number">-5</span>c686bd65-wxtmf      <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     ContainerCreating   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-milvus-indexcoord<span class="hljs-number">-586b</span>9f4987-vb7m4   <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-milvus-indexnode<span class="hljs-number">-5b</span>9787b54-xclbx     <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     ContainerCreating   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-milvus-proxy<span class="hljs-number">-84f</span>67cdb7f-pg6wf        <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     ContainerCreating   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-milvus-querycoord<span class="hljs-number">-865</span>cc56fb4-w2jmn   <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-milvus-querynode<span class="hljs-number">-5b</span>cb59f6-nhqqw      <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     ContainerCreating   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-milvus-rootcoord-fdcccfc84<span class="hljs-number">-9964</span>g     <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">16</span>s
my-release-minio<span class="hljs-number">-0</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m49s
my-release-minio<span class="hljs-number">-1</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m49s
my-release-minio<span class="hljs-number">-2</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m49s
my-release-minio<span class="hljs-number">-3</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m49s
my-release-pulsar-bookie<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m48s
my-release-pulsar-bookie<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m48s
my-release-pulsar-bookie-<span class="hljs-keyword">init</span>-h6tfz             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed           <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m48s
my-release-pulsar-broker<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m48s
my-release-pulsar-broker<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m48s
my-release-pulsar-proxy<span class="hljs-number">-0</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m49s
my-release-pulsar-proxy<span class="hljs-number">-1</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m48s
my-release-pulsar-pulsar-<span class="hljs-keyword">init</span>-d2t56             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed           <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m48s
my-release-pulsar-recovery<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m49s
my-release-pulsar-toolset<span class="hljs-number">-0</span>                     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m49s
my-release-pulsar-zookeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m49s
my-release-pulsar-zookeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running             <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m26s
<button class="copy-code-btn"></button></code></pre>
<p>When all components are enabled, the <code translate="no">status</code> of the Milvus cluster is shown as <code translate="no">Healthy</code>.</p>
<pre><code translate="no">...
status:
  conditions:
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T05:59:41Z&quot;</span>
    reason: StorageReady
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: StorageReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T06:06:23Z&quot;</span>
    message: Pulsar <span class="hljs-keyword">is</span> ready
    reason: PulsarReady
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: PulsarReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T05:59:41Z&quot;</span>
    message: Etcd endpoints <span class="hljs-keyword">is</span> healthy
    reason: EtcdReady
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: EtcdReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T06:12:36Z&quot;</span>
    message: All Milvus components are healthy
    reason: MilvusClusterHealthy
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: MilvusReady
  endpoint: my-release-milvus.default:<span class="hljs-number">19530</span>
  status: Healthy
<button class="copy-code-btn"></button></code></pre>
<p>Check the status of the Milvus pods again. You can see all the pods are running now.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods
NAME                                            READY   STATUS      RESTARTS   AGE
my-release-etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-etcd<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-etcd<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-milvus-datacoord<span class="hljs-number">-6</span>c7bb4b488-k9htl    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-datanode<span class="hljs-number">-5</span>c686bd65-wxtmf      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-indexcoord<span class="hljs-number">-586b</span>9f4987-vb7m4   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-indexnode<span class="hljs-number">-5b</span>9787b54-xclbx     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-proxy<span class="hljs-number">-84f</span>67cdb7f-pg6wf        <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-querycoord<span class="hljs-number">-865</span>cc56fb4-w2jmn   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-querynode<span class="hljs-number">-5b</span>cb59f6-nhqqw      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-rootcoord-fdcccfc84<span class="hljs-number">-9964</span>g     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-minio<span class="hljs-number">-0</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-minio<span class="hljs-number">-1</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-minio<span class="hljs-number">-2</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-minio<span class="hljs-number">-3</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-bookie<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-bookie<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-bookie-<span class="hljs-keyword">init</span>-h6tfz             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-broker<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-broker<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-proxy<span class="hljs-number">-0</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-proxy<span class="hljs-number">-1</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-pulsar-<span class="hljs-keyword">init</span>-d2t56             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-recovery<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-toolset<span class="hljs-number">-0</span>                     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">13</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">13</span>m
<button class="copy-code-btn"></button></code></pre>
<p>When the Milvus cluster is installed, you can learn how to <a href="/docs/v2.1.x/manage_connection.md">Connect to Milvus server</a>.</p>
<h2 id="Uninstall-the-Milvus-cluster" class="common-anchor-header">Uninstall the Milvus cluster<button data-href="#Uninstall-the-Milvus-cluster" class="anchor-icon" translate="no">
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
<pre><code translate="no">$ kubectl <span class="hljs-keyword">delete</span> milvus my-release
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<li>When you delete the Milvus cluster using the default configuration, dependencies like etcd, Pulsar, and MinIO are not deleted. Therefore, next time when you install the same Milvus cluster instance, these dependencies will be used again. </li>
<li>To delete the dependencies and private virtual clouds (PVCs) along with the Milvus cluster, see <a href="https://github.com/milvus-io/milvus-operator/blob/main/config/samples/milvus_deletion.yaml">configuration file</a>.</li>
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
    </button></h2><p>There are also two ways to uninstall Milvus Operator on K8s:</p>
<h3 id="Uninstall-Milvus-Operator-by-Helm-command" class="common-anchor-header">Uninstall Milvus Operator by Helm command</h3><pre><code translate="no">$ helm -n milvus-<span class="hljs-keyword">operator</span> uninstall milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Uninstall-Milvus-Operator-by-kubectl-command" class="common-anchor-header">Uninstall Milvus Operator by <code translate="no">kubectl</code> command</h3><pre><code translate="no">$ kubectl <span class="hljs-keyword">delete</span> -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus-operator/v0.6.7/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>When you no longer need the K8s cluster in the test environment, you can run <code translate="no">$ minikube delete</code> to delete it.</p>
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
<li>Check <a href="/docs/v2.1.x/example_code.md">Hello Milvus</a> to run an example code with different SDKs to see what Milvus can do.</li>
<li>Learn the basic operations of Milvus:
<ul>
<li><a href="/docs/v2.1.x/manage_connection.md">Connect to Milvus server</a></li>
<li><a href="/docs/v2.1.x/create_collection.md">Create a collection</a></li>
<li><a href="/docs/v2.1.x/create_partition.md">Create a partition</a></li>
<li><a href="/docs/v2.1.x/insert_data.md">Insert data</a></li>
<li><a href="/docs/v2.1.x/search.md">Conduct a vector search</a></li>
</ul></li>
<li><a href="/docs/v2.1.x/upgrade.md">Upgrade Milvus Using Helm Chart</a></li>
<li><a href="/docs/v2.1.x/scaleout.md">Scale your Milvus cluster</a></li>
<li>Deploy your Milvu cluster on clouds:
<ul>
<li><a href="/docs/v2.1.x/aws.md">Amazon EC2</a></li>
<li><a href="/docs/v2.1.x/eks.md">Amazon EKS</a></li>
</ul></li>
<li>Explore <a href="/docs/v2.1.x/migrate_overview.md">MilvusDM</a>, an open-source tool designed for importing and exporting data in Milvus.</li>
<li><a href="/docs/v2.1.x/monitor.md">Monitor Milvus with Prometheus</a></li>
</ul>
