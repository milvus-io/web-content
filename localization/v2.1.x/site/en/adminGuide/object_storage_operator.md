---
id: object_storage_operator.md
title: Configure Object Storage with Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Learn how to configure object storage with Milvus Operator.
---
<h1 id="Configure-Object-Storage-with-Milvus-Operator" class="common-anchor-header">Configure Object Storage with Milvus Operator<button data-href="#Configure-Object-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus uses MinIO or S3 as object storage to persist large-scale files, such as index files and binary logs. This topic introduces how to configure object storage dependencies when you install Milvus with Milvus Operator.</p>
<p>This topic assumes that you have deployed Milvus Operator.</p>
<div class="alert note">See <a href="https://milvus.io/docs/v2.1.x/install_cluster-milvusoperator.md">Deploy Milvus Operator</a> for more information. </div>
<p>You need to specify a configuration file for using Milvus Operator to start a Milvus cluster.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus-operator/main/config/samples/milvuscluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>You only need to edit the code template in <code translate="no">milvuscluster_default.yaml</code> to configure third-party dependencies. The following sections introduce how to configure object storage, etcd, and Pulsar respectively.</p>
<h2 id="Configure-object-storage" class="common-anchor-header">Configure object storage<button data-href="#Configure-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>A Milvus cluster uses MinIO or S3 as object storage to persist large-scale files, such as index files and binary logs. Add required fields under <code translate="no">spec.dependencies.storage</code> to configure object storage.</p>
<p><code translate="no">storage</code> supports  <code translate="no">external</code> and <code translate="no">inCluster</code>.</p>
<h3 id="External-object-storage" class="common-anchor-header">External object storage</h3><p><code translate="no">external</code> indicates using an external object storage service.</p>
<p>Fields used to configure an external object storage service include:</p>
<ul>
<li><code translate="no">external</code>: A <code translate="no">true</code> value indicates that Milvus uses an external storage service.</li>
<li><code translate="no">type</code>: Specifies Milvus uses whether S3 or MinIO as object storage.</li>
<li><code translate="no">secretRef</code>: The secret reference that the object storage service uses.</li>
<li><code translate="no">endpoint</code>: The endpoint of the object storage service.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Example</h4><p>The following example configures an external object storage service.</p>
<pre><code translate="no" class="language-YAML">kind: MilvusCluster

metadata:

  name: my-release

  labels:

    app: milvus

spec:

  dependencies: <span class="hljs-comment"># Optional</span>

    storage: <span class="hljs-comment"># Optional</span>

      <span class="hljs-comment"># Whether (=true) to use an existed external storage as specified in the field endpoints or </span>

      <span class="hljs-comment"># (=false) create a new storage inside the same kubernetes cluster for milvus.</span>

      external: true <span class="hljs-comment"># Optional default=false</span>

      <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;MinIO&quot;</span> <span class="hljs-comment"># Optional (&quot;MinIO&quot;, &quot;S3&quot;) default:=&quot;MinIO&quot;</span>

      <span class="hljs-comment"># Secret reference of the storage if it has</span>

      secretRef: mySecret <span class="hljs-comment"># Optional</span>

      <span class="hljs-comment"># The external storage endpoint if external=true</span>

      endpoint: <span class="hljs-string">&quot;storageEndpoint&quot;</span>

  components: {}

  config: {}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-object-storage" class="common-anchor-header">Internal object storage</h3><p><code translate="no">inCluster</code> indicates when a Milvus cluster starts, a MinIO service starts automatically in the cluster.</p>
<div class="alert note">A Milvus cluster only supports using MinIO as the internal object storage service.</div>
<h4 id="Example" class="common-anchor-header">Example</h4><p>The following example configures an internal MinIO service.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1

kind: MilvusCluster

metadata:

  name: my-release

  labels:

    app: milvus

spec:

  dependencies:

    storage: #

      external: <span class="hljs-literal">false</span> 

      <span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;MinIO&quot;</span> # Optional (<span class="hljs-string">&quot;MinIO&quot;</span>, <span class="hljs-string">&quot;S3&quot;</span>) <span class="hljs-keyword">default</span>:=<span class="hljs-string">&quot;MinIO&quot;</span>

      inCluster: 

        # deletionPolicy of storage when the milvus cluster is deleted

        deletionPolicy: Retain # Optional (<span class="hljs-string">&quot;Delete&quot;</span>, <span class="hljs-string">&quot;Retain&quot;</span>) <span class="hljs-keyword">default</span>=<span class="hljs-string">&quot;Retain&quot;</span>

        # When deletionPolicy=<span class="hljs-string">&quot;Delete&quot;</span> whether the PersistantVolumeClaim shoud be deleted when the storage is deleted

        pvcDeletion: <span class="hljs-literal">false</span>

        values:

          resources:

             limits: 

              cpu: <span class="hljs-string">&#x27;2&#x27;</span>

              memory: <span class="hljs-number">6</span>Gi

            requests:

              cpu: <span class="hljs-number">100</span>m

              memory: <span class="hljs-number">512</span>Mi

          statefulset:

            replicaCount: <span class="hljs-number">6</span>

  components: {}

  config: {}    
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">In this example, <code translate="no">inCluster.deletionPolicy</code> defines a deleletion policy for data. <code translate="no">inCluster.values.resources</code> defines the compute resources that MinIO uses. <code translate="no">inCluster.values.statefulset.replicaCount</code> defines the number of replicas of MinIO on each drive.</div>
<div class="alert note">Find the complete configuration items to configure an internal MinIO service in <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml">values.yaml</a>. Add configuration items as needed under <code translate="no">storage.inCluster.values</code> as shown in the preceding example.</div>
<p>Assuming that the configuration file is named <code translate="no">milvuscluster.yaml</code>, run the following command to apply the configuration.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">If <code translate="no">my-release</code> is an existing Milvus cluster, <code translate="no">milvuscluster.yaml</code> overwrites its configuration. Otherwise, a new Milvus cluster is created.</div>
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
    </button></h2><p>Learn how to configure other Milvus dependencies with Milvus Operator:</p>
<ul>
<li><a href="/docs/v2.1.x/meta_storage_operator.md">Configure Meta Storage with Milvus Operator</a></li>
<li><a href="/docs/v2.1.x/message_storage_operator.md">Configure Message Storage with Milvus Operator</a></li>
</ul>
