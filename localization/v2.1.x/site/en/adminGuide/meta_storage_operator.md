---
id: meta_storage_operator.md
title: Configure Meta Storage with Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Learn how to configure meta storage with Milvus Operator.
---
<h1 id="Configure-Meta-Storage-with-Milvus-Operator" class="common-anchor-header">Configure Meta Storage with Milvus Operator<button data-href="#Configure-Meta-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus uses etcd for storing metadata. This topic introduces how to configure meta storage dependency when you install Milvus with Milvus Operator.</p>
<p>This topic assumes that you have deployed Milvus Operator.</p>
<div class="alert note">See <a href="https://milvus.io/docs/v2.1.x/install_cluster-milvusoperator.md">Deploy Milvus Operator</a> for more information. </div>
<p>You need to specify a configuration file for using Milvus Operator to start a Milvus cluster.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus-operator/main/config/samples/milvuscluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>You only need to edit the code template in <code translate="no">milvuscluster_default.yaml</code> to configure third-party dependencies. The following sections introduce how to configure object storage, etcd, and Pulsar respectively.</p>
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
    </button></h2><p>Add required fields under <code translate="no">spec.dependencies.etcd</code> to configure etcd.</p>
<p><code translate="no">etcd</code> supports <code translate="no">external</code> and <code translate="no">inCluster</code>.</p>
<p>Fields used to configure an external etcd service include:</p>
<ul>
<li><code translate="no">external</code>: A <code translate="no">true</code> value indicates that Milvus uses an external etcd service.</li>
<li><code translate="no">endpoints</code>: The endpoints of etcd.</li>
</ul>
<h3 id="External-etcd" class="common-anchor-header">External etcd</h3><h4 id="Example" class="common-anchor-header">Example</h4><p>The following example configures an external etcd service.</p>
<pre><code translate="no" class="language-YAML">kind: MilvusCluster

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

kind: MilvusCluster

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
<div class="alert note">Find the complete configuration items to configure an internal etcd service in <a href="https://github.com/bitnami/charts/blob/ba6f8356e725a8342fe738a3b73ae40d5488b2ad/bitnami/etcd/values.yaml">values.yaml</a>. Add configuration items as needed under <code translate="no">etcd.inCluster.values</code> as shown in the preceding example.</div>
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
    </button></h2><p>Learn how to configure other Milvus dependencies with Milvus Operator:</p>
<ul>
<li><a href="/docs/v2.1.x/object_storage_operator.md">Configure Object Storage with Milvus Operator</a></li>
<li><a href="/docs/v2.1.x/message_storage_operator.md">Configure Message Storage with Milvus Operator</a></li>
</ul>
