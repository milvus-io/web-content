---
id: upgrade-pulsar-v3.md
related_key: upgrade pulsar v3
summary: >-
  Learn how to upgrade Pulsar from V2 to V3 in Milvus so that you can use the
  latest version of Milvus v2.5.x.
title: Upgrade Pulsar in Milvus from V2 to V3
---
<h1 id="Upgrading-Pulsar-​" class="common-anchor-header">Upgrading Pulsar ​<button data-href="#Upgrading-Pulsar-​" class="anchor-icon" translate="no">
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
    </button></h1><p>This article describes the proceure for you to upgrade your Pulsar component from V2 to V3 if you already have a working Milvus deployment with Pulsar V2.​ Since Milvus v2.5, <strong>milvus-helm</strong> and <strong>milvus-operator</strong> will use Pulsar V3 by default to fix some bugs and security vulnerabilities.​ While Milvus 2.5 is compatible with Pulsar 2.x, upgrading to Pulsar V3 is optional. For enhanced stability and performance, we recommend upgrading to Pulsar V3.</p>
<div class="alert note">
<ol>
<li><p>The upgrade process requires a brief service outage (usually takes about a few minutes to more than ten minutes, depending on the amount of data).​</p></li>
<li><p>Before the operation, you need to stop all running clients from writing data to Milvus. Otherwise, the written data may be lost.​</p></li>
<li><p>This article assumes that Milvus is installed in namespace <code translate="no">default</code> and named <code translate="no">my-release</code>. Please change the parameters to your own namespace and release name while executing the commands copied from this page.​</p></li>
<li><p>Ensure that your work environment has permissions under the above-mentioned namespace in the Kubernetes cluster and the following commands are installed:​</p>
<p>a. <code translate="no">kubectl</code> &gt;= 1.20​</p>
<p>b. <code translate="no">helm</code> &gt;= 3.14.0​</p>
<p>c. <code translate="no">cat</code>, <code translate="no">grep</code>, <code translate="no">awk</code> for string manipulate operations​</p>
<p>d. <code translate="no">curl</code> or <strong>Attu v2.4+</strong> to interact with milvus management API​</p></li>
</ol>
</div>
<h2 id="Roadmap" class="common-anchor-header">Roadmap<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>The upgrade process includes the following steps:</p>
<ol>
<li><p><a href="#Persist-data-not-consumed-in-Pulsar">Persist data not consumed in pulsar​.</a></p></li>
<li><p><a href="#Stop-Milvus-and-delete-Pulsar-V2">Stop Milvus and delete pulsar V2​.</a></p></li>
<li><p><a href="#Start-Pulsar-V3-and-Milvus">Start Pulsar V3 and Milvus​.</a></p></li>
</ol>
<h2 id="Procedures" class="common-anchor-header">Procedures<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>This section provides the detailed procedures for upgrading Pulsar from V2 to V3 in Milvus.​</p>
<h3 id="Persist-data-not-consumed-in-Pulsar" class="common-anchor-header">Persist data not consumed in Pulsar</h3><p>In this step, you need to ensure that the existing data in Pulsar has been persisted to the object storage service.​ There are two approaches available, and you can choose the one that suits your needs.​</p>
<h4 id="Approach-1-Using-Attu" class="common-anchor-header">Approach 1: Using Attu</h4><p>If you have only a small number of collections in your working Milvus deployment with not many segments, you can use Attu to persist the data to the object storage service.​</p>
<ol>
<li><p>Select every collection in all your databases, get into the <code translate="no">Segments</code> panel, Click the <code translate="no">Flush</code> button​</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/attu-select-collection.png" alt="Segment panel of a collection" class="doc-image" id="segment-panel-of-a-collection" />
    <span>Segment panel of a collection</span>
  </span>
</p></li>
<li><p>Then upon the popup, Click <code translate="no">Flush</code> again.​</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/data-flush-prompt.png" alt="Data flush prompt in Attu" class="doc-image" id="data-flush-prompt-in-attu" />
    <span>Data flush prompt in Attu</span>
  </span>
</p></li>
<li><p>Then wait until all collections’ Persistent Segment States are <code translate="no">Flushed</code>.​</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/view-data-peristent-process.png" alt="View data flush status in Attu" class="doc-image" id="view-data-flush-status-in-attu" />
    <span>View data flush status in Attu</span>
  </span>
</p></li>
</ol>
<h4 id="Approach-2-Using-management-API" class="common-anchor-header">Approach 2: Using management API</h4><ol>
<li><p>Proxy port 9091 of Milvus proxy to the local host for subsequent operations.​</p>
<pre><code translate="no" class="language-bash">kubectl -n <span class="hljs-keyword">default</span> port-forward deploy/my-release-milvus-proxy <span class="hljs-number">9091</span>:<span class="hljs-number">9091</span> &amp;​
<button class="copy-code-btn"></button></code></pre>
<p>Output:​</p>
<pre><code translate="no" class="language-yaml">[<span class="hljs-meta">1</span>] <span class="hljs-number">8116</span>​
Forwarding <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">9091</span> -&gt; <span class="hljs-number">9091</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Save Pid for later cleanup.​</p>
<pre><code translate="no" class="language-yaml">pid=8116​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Trigger the action of persisting all inserted data from Pulsar to Ojbect Storage​.</p>
<pre><code translate="no" class="language-bash">curl 127.0.0.1:9091/api/v1/collections \​
|curl 127.0.0.1:9091/api/v1/persist -d @/dev/stdin\​
|jq <span class="hljs-string">&#x27;.flush_coll_segIDs&#x27;</span>| jq <span class="hljs-string">&#x27;[.[] | .data[]]&#x27;</span> | jq <span class="hljs-string">&#x27;{segmentIDs: (.)}&#x27;</span> \​
&gt; flushing_segments.json​
<span class="hljs-built_in">cat</span> flushing_segments.json​

<button class="copy-code-btn"></button></code></pre>
<p>Output:​</p>
<pre><code translate="no" class="language-yaml">{​
  <span class="hljs-string">&quot;segmentIDs&quot;</span>: [​
    <span class="hljs-number">454097953998181000</span>,​
    <span class="hljs-number">454097953999383600</span>,​
    <span class="hljs-number">454097953998180800</span>​
  ]​
}​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Check All segments flushed.​</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> flushing_segments.json|  curl -X GET 127.0.0.1:9091/api/v1/persist/state -d @/dev/stdin ​

<button class="copy-code-btn"></button></code></pre>
<p>When it is finished, you should see the following output​</p>
<pre><code translate="no" class="language-json">{<span class="hljs-string">&quot;status&quot;</span>:{},<span class="hljs-string">&quot;flushed&quot;</span>:<span class="hljs-literal">true</span>}​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Stop the backendground <code translate="no">kubectl port-forward</code> process​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-built_in">kill</span> <span class="hljs-variable">$pid</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Output:​</p>
<pre><code translate="no" class="language-yaml">[<span class="hljs-meta">1</span>]  + <span class="hljs-number">8116</span> terminated  kubectl -n <span class="hljs-literal">default</span> port-forward deploy/my-release-milvus-proxy <span class="hljs-number">9091</span>:<span class="hljs-number">9091</span>                      ​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Stop-Milvus-and-delete-Pulsar-V2" class="common-anchor-header">Stop Milvus and delete Pulsar V2</h3><p>In this step, you need to stop the Milvus pod and delete the Pulsar V2 deployment.​ There are two separate sections available:</p>
<ul>
<li><p>For Milvus Helm users</p>
<p>If you have installed Milvus using the Milvus Helm chart, go to <a href="#Delete-Pulsar-V2-using-Helm">For Helm User</a>.</p></li>
<li><p>For Milvus Operator users</p>
<p>If you have installed Milvus using the Milvus Operator, go to <a href="#Delete-Pulsar-V2-using-Milvus-Operator">For Milvus Operator User</a>.</p></li>
</ul>
<h4 id="Delete-Pulsar-V2-using-Helm" class="common-anchor-header">Delete Pulsar V2 using Helm</h4><p>If you have installed Milvus using the Milvus Helm chart, following the steps below to stop the Milvus pod and delete the Pulsar V2 deployment.</p>
<ol>
<li><p>Save the current Milvus release values to <code translate="no">values.yaml</code> for later recover:​</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-literal">default</span> <span class="hljs-keyword">get</span> values my-release -o yaml &gt; values.yaml​
cat values.yaml​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Use the command to stop Milvus and all the dependencies. Don’t worry about the data volumes, they will be kept by default.​</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-keyword">default</span> uninstall my-release​

<button class="copy-code-btn"></button></code></pre>
<p>Output​</p>
<pre><code translate="no" class="language-bash">These resources were kept due to the resource policy:​
[<span class="hljs-meta">PersistentVolumeClaim</span>] my-release-minio​
​
release <span class="hljs-string">&quot;my-release&quot;</span> uninstalled​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>List pulsar PVCs &amp; PVs (Persistent Volume Claims &amp; Persistent Volume) needs to be cleared​</p>
<pre><code translate="no" class="language-bash">kubectl -n default get pvc -lapp=pulsar,release=my-release |grep -v NAME |awk <span class="hljs-string">&#x27;{print $1}&#x27;</span> &gt; pulsar-pvcs.txt​
kubectl -n default get pvc -lapp=pulsar,release=my-release -o custom-columns=VOL:.spec.volumeName|grep -v VOL &gt; pulsar-pvs.txt​
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Volume Claims:&quot;</span>​
<span class="hljs-built_in">cat</span> pulsar-pvcs.txt​
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Volumes:&quot;</span>​
<span class="hljs-built_in">cat</span> pulsar-pvs.txt​

<button class="copy-code-btn"></button></code></pre>
<p>Output​</p>
<pre><code translate="no" class="language-yaml">Volume Claims:​
my-release-pulsar-bookie-journal-my-release-pulsar-bookie-0​
my-release-pulsar-bookie-journal-my-release-pulsar-bookie-1​
my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-0​
my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-1​
my-release-pulsar-zookeeper-data-my-release-pulsar-zookeeper-0​
Volumes:​
pvc-f590a4de-df31-4ca8-a424-007eac3c619a​
pvc-17b0e215-3e14-4d14-901e-1a1dda9ff5a3​
pvc-72f83c25-6ea1-45ee-9559-0b783f2c530b​
pvc-60dcb6e4-760d-46c7-af1a-d1fc153b0caf​
pvc-2da33f64-c053-42b9-bb72-c5d50779aa0a​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Check if the PVC list of <code translate="no">pulsar-pvcs.txt</code> is all for Pulsar.​ Once you have confirmed that there is no error, delete the PVCs.</p>
<pre><code translate="no" class="language-bash">cat pulsar-pvcs.<span class="hljs-property">txt</span> |xargs -I {} kubectl -n <span class="hljs-keyword">default</span> <span class="hljs-keyword">delete</span> pvc {} --wait=<span class="hljs-literal">false</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Output:​</p>
<pre><code translate="no" class="language-yaml">persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-bookie-journal-my-release-pulsar-bookie-0&quot;</span> deleted​
persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-bookie-journal-my-release-pulsar-bookie-1&quot;</span> deleted​
persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-0&quot;</span> deleted​
persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-1&quot;</span> deleted​
persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-zookeeper-data-my-release-pulsar-zookeeper-0&quot;</span> deleted​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>(Optional) Depending on the storage class providing the PVC, you may also need to manually remove the PV.​</p>
<pre><code translate="no" class="language-yaml">cat pulsar-pvs.<span class="hljs-property">txt</span> |xargs -I {} kubectl -n <span class="hljs-keyword">default</span> <span class="hljs-keyword">delete</span> pvc {} --wait=<span class="hljs-literal">false</span>​

<button class="copy-code-btn"></button></code></pre>
<p>It’s OK if it outputs NotFound errors. It’s already deleted by kubernetes controllers.​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-f590a4de-df31-4ca8-a424-007eac3c619a&quot;</span> not found​
<span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-17b0e215-3e14-4d14-901e-1a1dda9ff5a3&quot;</span> not found​
<span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-72f83c25-6ea1-45ee-9559-0b783f2c530b&quot;</span> not found​
<span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-60dcb6e4-760d-46c7-af1a-d1fc153b0caf&quot;</span> not found​
<span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-2da33f64-c053-42b9-bb72-c5d50779aa0a&quot;</span> not found​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h4 id="Delete-Pulsar-V2-using-Milvus-Operator" class="common-anchor-header">Delete Pulsar V2 using Milvus Operator</h4><p>If you have installed Milvus using the Milvus Operator, following the steps below to stop the Milvus pod and delete the Pulsar V2 deployment.</p>
<ol>
<li><p>Save current Milvus Manifest to <code translate="no">milvus.yaml</code> for later use​.</p>
<pre><code translate="no" class="language-bash">kubectl -n <span class="hljs-literal">default</span> <span class="hljs-keyword">get</span> milvus my-release -o yaml &gt; milvus.yaml​
head milvus.yaml -n <span class="hljs-number">20</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Output:​</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1​
kind: Milvus​
metadata:​
  annotations:​
    milvus.io/dependency-values-merged: <span class="hljs-string">&quot;true&quot;</span>​
    milvus.io/pod-service-label-added: <span class="hljs-string">&quot;true&quot;</span>​
    milvus.io/querynode-current-group-id: <span class="hljs-string">&quot;0&quot;</span>​
  creationTimestamp: <span class="hljs-string">&quot;2024-11-22T08:06:59Z&quot;</span>​
  finalizers:​
  - milvus.milvus.io/finalizer​
  generation: 3​
  labels:​
    app: milvus​
    milvus.io/operator-version: 1.1.2​
name: my-release​
namespace: default​
resourceVersion: <span class="hljs-string">&quot;692217324&quot;</span>​
uid: 7a469ed0-9df1-494e-bd9a-340fac4305b5​
spec:​
  components:​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Create an <code translate="no">patch.yaml</code> File with following content.</p>
<pre><code translate="no" class="language-yaml"># a patch to retain etcd &amp; storage data and <span class="hljs-built_in">delete</span> pulsar data while <span class="hljs-built_in">delete</span> milvus​
spec:​
  dependencies:​
    etcd:​
      inCluster:​
        deletionPolicy: Retain​
        pvcDeletion: <span class="hljs-literal">false</span>​
    storage:​
      inCluster:​
        deletionPolicy: Retain​
        pvcDeletion: <span class="hljs-literal">false</span>​
    pulsar:​
      inCluster:​
        deletionPolicy: Delete​
        pvcDeletion: <span class="hljs-literal">true</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Use <code translate="no">kubectl patch</code> to retain etcd &amp; storage data and delete pulsar data while delete milvus​.</p>
<pre><code translate="no" class="language-yaml">kubectl -n <span class="hljs-keyword">default</span> patch milvus my-release --patch-file patch.yaml --<span class="hljs-keyword">type</span>=merge​

<button class="copy-code-btn"></button></code></pre>
<p>Output:​</p>
<pre><code translate="no" class="language-bash">milvus.milvus.io/my-release patched​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Stop Milvus and delete pulsar V2. Don’t worry about the etcd &amp; object storage data volumes, they will be kept by default.​</p>
<pre><code translate="no" class="language-bash">kubectl -n <span class="hljs-keyword">default</span> <span class="hljs-keyword">delete</span> milvus my-release --wait=<span class="hljs-literal">false</span>​
kubectl -n <span class="hljs-keyword">default</span> get milvus my-release​
kubectl -n <span class="hljs-keyword">default</span> <span class="hljs-keyword">delete</span> milvus my-release --wait=<span class="hljs-literal">true</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Output: Note it might take a few minutes for milvus to graceful stop &amp; for operator to delete pulsar volumes.​</p>
<pre><code translate="no" class="language-bash">milvus.milvus.io <span class="hljs-string">&quot;my-release&quot;</span> deleted​
NAME         MODE      STATUS     UPDATED   AGE​
my-release   cluster   Deleting   <span class="hljs-literal">True</span>      41m​
milvus.milvus.io <span class="hljs-string">&quot;my-release&quot;</span> deleted​

<button class="copy-code-btn"></button></code></pre>
<p>Wait until the command finished.​</p></li>
<li><p>Check again to see the Milvus Resource is gone​</p>
<pre><code translate="no" class="language-yaml">kubectl -n <span class="hljs-literal">default</span> <span class="hljs-keyword">get</span> milvus my-release​

<button class="copy-code-btn"></button></code></pre>
<p>Output should be like:​</p>
<pre><code translate="no" class="language-yaml">No resources found <span class="hljs-keyword">in</span> <span class="hljs-literal">default</span> <span class="hljs-keyword">namespace</span>.​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Start-Pulsar-V3-and-Milvus" class="common-anchor-header">Start Pulsar V3 and Milvus</h3><p>In this step, you need to start the Pulsar V3 and Milvus pods.​ There are two separate sections available:</p>
<ul>
<li><p>For Helm User</p>
<p>If you have installed Milvus using the Milvus Helm chart, go to <a href="#For-Helm-User">For Helm User</a>.</p></li>
<li><p>For Milvus Operator users</p>
<p>If you have installed Milvus using the Milvus Operator, go to <a href="#For-Milvus-Operator-User">For Milvus Operator User</a>.</p></li>
</ul>
<h4 id="Start-Pulsar-V3-and-using-Helm" class="common-anchor-header">Start Pulsar V3 and using Helm</h4><ol>
<li><p>Edit the <code translate="no">values.yaml</code> saved in previous Step.​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change the following:​</span>
pulsar:​
  enabled: false <span class="hljs-comment"># set to false​</span>
  <span class="hljs-comment"># you may also clean up rest fields under pulsar field​</span>
  <span class="hljs-comment"># it&#x27;s ok to keep them though.​</span>
pulsarv3:​
  enabled: true​
  <span class="hljs-comment"># append other values for pulsar v3 chart if needs​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Update your local helm repo​</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> zilliztech https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm​</span>
helm repo update zilliztech​

<button class="copy-code-btn"></button></code></pre>
<p>Output​</p>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;zilliztech&quot;</span> already exists <span class="hljs-keyword">with</span> the same configuration, skipping​
<span class="hljs-title class_">Hang</span> tight <span class="hljs-keyword">while</span> we grab the latest <span class="hljs-keyword">from</span> your chart repositories...​
...<span class="hljs-title class_">Successfully</span> got an update <span class="hljs-keyword">from</span> the <span class="hljs-string">&quot;zilliztech&quot;</span> chart repository​
<span class="hljs-title class_">Update</span> <span class="hljs-title class_">Complete</span>. ⎈<span class="hljs-title class_">Happy</span> <span class="hljs-title class_">Helming</span>!⎈​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Install your milvus release with the newest helm chart version using the edited <code translate="no">values.yaml</code> ​</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-keyword">default</span> install my-release zilliztech/milvus --reset-values -f values.<span class="hljs-property">yaml</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Output​</p>
<pre><code translate="no" class="language-bash"><span class="hljs-attr">NAME</span>: my-release​
<span class="hljs-variable constant_">LAST</span> <span class="hljs-attr">DEPLOYED</span>: <span class="hljs-title class_">Fri</span> <span class="hljs-title class_">Nov</span> <span class="hljs-number">22</span> <span class="hljs-number">15</span>:<span class="hljs-number">31</span>:<span class="hljs-number">27</span> <span class="hljs-number">2024</span>​
<span class="hljs-attr">NAMESPACE</span>: <span class="hljs-keyword">default</span>​
<span class="hljs-attr">STATUS</span>: deployed​
<span class="hljs-attr">REVISION</span>: <span class="hljs-number">1</span>​
<span class="hljs-variable constant_">TEST</span> <span class="hljs-attr">SUITE</span>: <span class="hljs-title class_">None</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Check the pods to see if all of them get scheduled and running​ with <code translate="no">kubectl -n default get pods</code>.</p>
<p>It may take a few minutes for all pods to get started​</p>
<p>Output is like:​</p>
<pre><code translate="no" class="language-bash">NAME                                          READY   STATUS      RESTARTS   AGE​
my-release-etcd<span class="hljs-number">-0</span>                             <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-milvus-datanode<span class="hljs-number">-56487b</span>c4bc-s6mbd   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m5s​
my-release-milvus-indexnode<span class="hljs-number">-6476894</span>d6-rv85d   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m5s​
my-release-milvus-mixcoord<span class="hljs-number">-6</span>d8875cb9c<span class="hljs-number">-67f</span>cq   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m4s​
my-release-milvus-proxy<span class="hljs-number">-7b</span>c45d57c5<span class="hljs-number">-2</span>qf8m      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m4s​
my-release-milvus-querynode<span class="hljs-number">-77465747b</span>-kt7f4   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m4s​
my-release-minio<span class="hljs-number">-684f</span>f4f5df-pnc97             <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m5s​
my-release-pulsarv3-bookie<span class="hljs-number">-0</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-pulsarv3-bookie<span class="hljs-number">-1</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-pulsarv3-bookie<span class="hljs-number">-2</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-pulsarv3-bookie-<span class="hljs-keyword">init</span><span class="hljs-number">-6</span>z4tk         <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m1s​
my-release-pulsarv3-broker<span class="hljs-number">-0</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-broker<span class="hljs-number">-1</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-proxy<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-proxy<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-pulsar-<span class="hljs-keyword">init</span>-wvqpc         <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m1s​
my-release-pulsarv3-recovery<span class="hljs-number">-0</span>                <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-pulsarv3-zookeeper<span class="hljs-number">-0</span>               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-zookeeper<span class="hljs-number">-1</span>               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-zookeeper<span class="hljs-number">-2</span>               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h4 id="Start-Pulsar-V3-and-using-Milvus-Operator" class="common-anchor-header">Start Pulsar V3 and using Milvus Operator</h4><ol>
<li><p>Edit the <code translate="no">milvus.yaml</code> saved in previous Step.​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change the followings fields:​</span>
apiVersion: milvus.io/v1beta1​
kind: Milvus​
metadata:​
  annotations: null <span class="hljs-comment"># this field should be removed or set to null​</span>
  resourceVersion: null <span class="hljs-comment"># this field should be removed or set to null​</span>
  uid: null <span class="hljs-comment"># this field should be removed or set to null​</span>
spec:​
  dependencies:​
    pulsar:​
      inCluster:​
        chartVersion: pulsar-v3​
        <span class="hljs-comment"># delete all previous values for pulsar v2 and set it to null.​</span>
        <span class="hljs-comment"># you may add additional values here for pulsar v3 if you&#x27;re sure about it.​</span>
        values: null​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Ensure your Milvus Operator is upgraded to v1.1.2 or later version​</p>
<pre><code translate="no" class="language-yaml">helm repo <span class="hljs-keyword">add</span> milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator​</span>
helm repo update milvus-<span class="hljs-keyword">operator</span>​
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Use command to start milvus with pulsar v3​</p>
<pre><code translate="no" class="language-yaml">kubectl create -f milvus.yaml​

<button class="copy-code-btn"></button></code></pre>
<p>Output​</p>
<pre><code translate="no" class="language-yaml">milvus.milvus.io/my-release created​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Check the pods to see if all of them get scheduled and running​ with <code translate="no">kubectl -n default get pods</code>. ​</p>
<p>It may take a few minutes for all pods to get started.​</p>
<p>Output is like:​</p>
<pre><code translate="no" class="language-yaml">NAME                                            READY   STATUS      RESTARTS   AGE​
my-release-etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">65</span>m​
my-release-milvus-datanode<span class="hljs-number">-57f</span>d59ff58<span class="hljs-number">-5</span>mdrk     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">93</span>s​
my-release-milvus-indexnode<span class="hljs-number">-67867</span>c6b9b<span class="hljs-number">-4</span>wsbw    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">93</span>s​
my-release-milvus-mixcoord<span class="hljs-number">-797849f</span>9bb-sf8z5     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">93</span>s​
my-release-milvus-proxy<span class="hljs-number">-5</span>d5bf98445-c55m6        <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">93</span>s​
my-release-milvus-querynode<span class="hljs-number">-0</span><span class="hljs-number">-64797f</span>5c9-lw4rh   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">92</span>s​
my-release-minio<span class="hljs-number">-79476</span>ccb49-zvt2h               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">65</span>m​
my-release-pulsar-bookie<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-bookie<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-bookie<span class="hljs-number">-2</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-bookie-<span class="hljs-keyword">init</span>-v8fdj             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-broker<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-broker<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-proxy<span class="hljs-number">-0</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-proxy<span class="hljs-number">-1</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-pulsar-<span class="hljs-keyword">init</span><span class="hljs-number">-5l</span>hx7             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-recovery<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-zookeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-zookeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-zookeeper<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>​</p>
