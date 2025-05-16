---
id: operator.md
title: Configure Dependencies with Milvus Operator
related_key: minio, s3, storage, etcd, pulsar
summary: Learn how to configure dependencies with Milvus Operator.
deprecate: true
---

<h1 id="Configure-Dependencies-with-Milvus-Operator" class="common-anchor-header">Configure Dependencies with Milvus Operator<button data-href="#Configure-Dependencies-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus cluster depends on components including object storage, etcd, and Pulsar. This topic introduces how to configure these dependencies when you install Milvus with Milvus Operator.</p>
<p>This topic assumes that you have deployed Milvus Operator.</p>
<div class="alert note">See <a href="https://milvus.io/docs/v2.4.9/install_cluster-milvusoperator.md">Deploy Milvus Operator</a> for more information. </div>
<p>You need to specify a configuration file for using Milvus Operator to start a Milvus cluster.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvuscluster_default.yaml</span>
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
<li><code translate="no">type</code>: Specifies whether Milvus uses S3 or MinIO as object storage.</li>
<li><code translate="no">secretRef</code>: The secret reference that the object storage service uses.</li>
<li><code translate="no">endpoint</code>: The endpoint of the object storage service.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Example</h4><p>The following example configures an external object storage service.</p>
<pre><code translate="no" class="language-YAML">kind: Milvus

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

kind: Milvus

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
<div class="alert note">In this example, <code translate="no">inCluster.deletionPolicy</code> defines a deletion policy for data. <code translate="no">inCluster.values.resources</code> defines the compute resources that MinIO uses. <code translate="no">inCluster.values.statefulset.replicaCount</code> defines the number of replicas of MinIO on each drive.</div>
<div class="alert note">Find the complete configuration items to configure an internal MinIO service in <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml">values.yaml</a>. Add configuration items as needed under <code translate="no">storage.inCluster.values</code> as shown in the preceding example.</div>
<p>Assuming that the configuration file is named <code translate="no">milvuscluster.yaml</code>, run the following command to apply the configuration.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">If <code translate="no">my-release</code> is an existing Milvus cluster, <code translate="no">milvuscluster.yaml</code> overwrites its configuration. Otherwise, a new Milvus cluster is created.</div>
<h2 id="Configure-etcd" class="common-anchor-header">Configure etcd<button data-href="#Configure-etcd" class="anchor-icon" translate="no">
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
    </button></h2><p>etcd stores metadata of components in a Milvus cluster. Add required fields under <code translate="no">spec.dependencies.etcd</code> to configure etcd.</p>
<p><code translate="no">etcd</code> supports <code translate="no">external</code> and <code translate="no">inCluster</code>.</p>
<p>Fields used to configure an external etcd service include:</p>
<ul>
<li><code translate="no">external</code>: A <code translate="no">true</code> value indicates that Milvus uses an external etcd service.</li>
<li><code translate="no">endpoints</code>: The endpoints of etcd.</li>
</ul>
<h3 id="External-etcd" class="common-anchor-header">External etcd</h3><h4 id="Example" class="common-anchor-header">Example</h4><p>The following example configures an external etcd service.</p>
<pre><code translate="no" class="language-YAML">kind: Milvus

metadata:

  name: my-release

  labels:

    app: milvus


spec:

  dependencies: <span class="hljs-comment"># Optional</span>

    etcd: <span class="hljs-comment"># Optional</span>

      <span class="hljs-comment"># Whether (=true) to use an existed external etcd as specified in the field endpoints or </span>

      <span class="hljs-comment"># (=false) create a new etcd inside the same kubernetes cluster for milvus.</span>

      external: true <span class="hljs-comment"># Optional default=false</span>

      <span class="hljs-comment"># The external etcd endpoints if external=true</span>

      endpoints:

      - <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span>:<span class="hljs-number">2379</span>

  components: {}

  config: {}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-etcd" class="common-anchor-header">Internal etcd</h3><p><code translate="no">inCluster</code> indicates when a Milvus cluster starts, an etcd service starts automatically in the cluster.</p>
<h4 id="Example" class="common-anchor-header">Example</h4><p>The following example configures an internal etcd service.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1

kind: Milvus

metadata:

  name: my-release

  labels:

    app: milvus

spec:

  dependencies:

    etcd:

      inCluster:

        values:

          replicaCount: 5

          resources:

            limits: 

              cpu: <span class="hljs-string">&#x27;4&#x27;</span>

              memory: 8Gi

            requests:

              cpu: 200m

              memory: 512Mi

  components: {}

  config: {}              
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">The preceding example specifies the number of replicas as <code translate="no">5</code> and limits the compute resources for etcd.</div>
<div class="alert note">Find the complete configuration items to configure an internal etcd service in <a href="https://github.com/zilliztech/milvus-operator/blob/main/config/assets/charts/etcd/values.yaml">values.yaml</a>. Add configuration items as needed under <code translate="no">etcd.inCluster.values</code> as shown in the preceding example.</div>
<p>Assuming that the configuration file is named <code translate="no">milvuscluster.yaml</code>, run the following command to apply the configuration.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Pulsar" class="common-anchor-header">Configure Pulsar<button data-href="#Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar manages logs of recent changes, outputs stream logs, and provides log subscriptions. Add required fields under <code translate="no">spec.dependencies.pulsar</code> to configure Pulsar.
<code translate="no">pulsar</code> supports <code translate="no">external</code> and <code translate="no">inCluster</code>.</p>
<h3 id="External-Pulsar" class="common-anchor-header">External Pulsar</h3><p><code translate="no">external</code> indicates using an external Pulsar service.
Fields used to configure an external Pulsar service include:</p>
<ul>
<li><code translate="no">external</code>:  A <code translate="no">true</code> value indicates that Milvus uses an external Pulsar service.</li>
<li><code translate="no">endpoints</code>: The endpoints of Pulsar.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Example</h4><p>The following example configures an external Pulsar service.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1

kind: Milvus

metadata:

  name: my-release

  labels:

    app: milvus

spec:

  dependencies: <span class="hljs-comment"># Optional</span>

    pulsar: <span class="hljs-comment"># Optional</span>

      <span class="hljs-comment"># Whether (=true) to use an existed external pulsar as specified in the field endpoints or </span>

      <span class="hljs-comment"># (=false) create a new pulsar inside the same kubernetes cluster for milvus.</span>

      external: true <span class="hljs-comment"># Optional default=false</span>

      <span class="hljs-comment"># The external pulsar endpoints if external=true</span>

      endpoints:

      - <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span>:<span class="hljs-number">6650</span>

  components: {}

  config: {}           
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-Pulsar" class="common-anchor-header">Internal Pulsar</h3><p><code translate="no">inCluster</code> indicates when a Milvus cluster starts, a Pulsar service starts automatically in the cluster.</p>
<h4 id="Example" class="common-anchor-header">Example</h4><p>The following example configures an internal Pulsar service.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1

kind: Milvus

metadata:

  name: my-release

  labels:

    app: milvus

spec:

  dependencies:

    pulsar:

      inCluster:

        values:

          components:

            autorecovery: <span class="hljs-literal">false</span>

          zookeeper:

            replicaCount: 1

          bookkeeper:

            replicaCount: 1

            resoureces:

              <span class="hljs-built_in">limit</span>:

                cpu: <span class="hljs-string">&#x27;4&#x27;</span>

              memory: 8Gi

            requests:

              cpu: 200m

              memory: 512Mi

          broker:

            replicaCount: 1

            configData:

              <span class="hljs-comment">## Enable `autoSkipNonRecoverableData` since bookkeeper is running</span>

              <span class="hljs-comment">## without persistence</span>

              autoSkipNonRecoverableData: <span class="hljs-string">&quot;true&quot;</span>

              managedLedgerDefaultEnsembleSize: <span class="hljs-string">&quot;1&quot;</span>

              managedLedgerDefaultWriteQuorum: <span class="hljs-string">&quot;1&quot;</span>

              managedLedgerDefaultAckQuorum: <span class="hljs-string">&quot;1&quot;</span>

          proxy:

            replicaCount: 1

  components: {}

  config: {}            
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">This example specifies the numbers of replicas of each component of Pulsar, the compute resources of Pulsar BookKeeper, and other configurations.</div>
<div class="alert note">Find the complete configuration items to configure an internal Pulsar service in <a href="https://github.com/zilliztech/milvus-operator/blob/main/config/assets/charts/pulsar/values.yaml">values.yaml</a>. Add configuration items as needed under <code translate="no">pulsar.inCluster.values</code> as shown in the preceding example.</div>
<p>Assuming that the configuration file is named <code translate="no">milvuscluster.yaml</code>, run the following command to apply the configuration.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
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
    </button></h2><p>If you want to learn how to configure dependencies with <code translate="no">milvus.yaml</code>, see <a href="/docs/ko/v2.4.x/system_configuration.md">System Configuration</a>.</p>
