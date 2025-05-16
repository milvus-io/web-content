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
    </button></h1><p>Milvus uses MinIO or S3 as object storage to persist large-scale files, such as index files and binary logs. This topic introduces how to configure object storage dependencies when you install Milvus with Milvus Operator. For more details, refer to <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/object-storage.md">Configure Object Storage with Milvus Operator</a> in the Milvus Operator repository.</p>
<p>This topic assumes that you have deployed Milvus Operator.</p>
<div class="alert note">See <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Deploy Milvus Operator</a> for more information. </div>
<p>You need to specify a configuration file for using Milvus Operator to start a Milvus cluster.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>You only need to edit the code template in <code translate="no">milvus_cluster_default.yaml</code> to configure third-party dependencies. The following sections introduce how to configure object storage, etcd, and Pulsar respectively.</p>
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
    </button></h2><p>A Milvus cluster uses MinIO or S3 as object storage to persist large-scale files, such as index files and binary logs. Add required fields under <code translate="no">spec.dependencies.storage</code> to configure object storage, possible options are <code translate="no">external</code> and <code translate="no">inCluster</code>.</p>
<h3 id="Internal-object-storage" class="common-anchor-header">Internal object storage</h3><p>By default, Milvus Operator deploys an in-cluster MinIO for Milvus. The following is an example configuration to demonstrate how to use this MinIO as an internal object storage.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    <span class="hljs-comment"># Omit other fields ...</span>
    storage:
      inCluster:
        values:
          mode: standalone
          resources:
            requests:
              memory: 100Mi
        deletionPolicy: Delete <span class="hljs-comment"># Delete | Retain, default: Retain</span>
        pvcDeletion: true <span class="hljs-comment"># default: false</span>
<button class="copy-code-btn"></button></code></pre>
<p>After the above configuration applies, the in-cluster MinIO will run in standalone mode with a memory limit of up to 100Mi. Note that</p>
<ul>
<li><p>The <code translate="no">deletionPolicy</code> field specifies the deletion policy of the in-cluster MinIO. It defaults to <code translate="no">Delete</code> and has <code translate="no">Retain</code> as the alternative option.</p>
<ul>
<li><code translate="no">Delete</code> indicates that the in-cluster object storage is deleted when you stop your Milvus instance.</li>
<li><code translate="no">Retain</code> indicates that the in-cluster object storage is retained as the dependency service for later startups of your Milvus instance.</li>
</ul></li>
<li><p>The <code translate="no">pvcDeletion</code> field specifies whether to delete the PVC(Persistent Volume Claim) when the in-cluster MinIO is deleted.</p></li>
</ul>
<p>The fields under <code translate="no">inCluster.values</code> are the same as those in Milvus Helm Chart, and you can find them <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml">here</a>.</p>
<h3 id="External-object-storage" class="common-anchor-header">External object storage</h3><p>Using <code translate="no">external</code> in the template YAML file indicates using an external object storage service. To use an external object storage, you need to properly set fields under <code translate="no">spec.dependencies.storage</code> and <code translate="no">spec.config.minio</code> in the Milvus CRD.</p>
<h4 id="Use-Amazon-Web-Service-AWS-S3-as-external-object-storage" class="common-anchor-header">Use Amazon Web Service (AWS) S3 as external object storage</h4><ul>
<li><p>Configure AWS S3 Access by AK/SK</p>
<p>An S3 bucket can usually be accessed by a pair of an access key and an access secret key. You can create a <code translate="no">Secret</code> object to store them in your Kubernetes as follows:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: v1
kind: Secret
metadata:
  name: my-release-s3-secret
<span class="hljs-built_in">type</span>: Opaque
stringData:
  accesskey: &lt;my-access-key&gt;
  secretkey: &lt;my-secret-key&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Then you can configure an AWS S3 bucket as the external object storage:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  config:
    minio:
      <span class="hljs-comment"># your bucket name</span>
      bucketName: &lt;my-bucket&gt;
      <span class="hljs-comment"># Optional, config the prefix of the bucket milvus will use</span>
      rootPath: milvus/my-release
      useSSL: true
  dependencies:
    storage:
      <span class="hljs-comment"># enable external object storage</span>
      external: true
      <span class="hljs-built_in">type</span>: S3 <span class="hljs-comment"># MinIO | S3</span>
      <span class="hljs-comment"># the endpoint of AWS S3</span>
      endpoint: s3.amazonaws.com:<span class="hljs-number">443</span>
      <span class="hljs-comment"># the secret storing the access key and secret key</span>
      secretRef: <span class="hljs-string">&quot;my-release-s3-secret&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Configure AWS S3 Access by AssumeRole</p>
<p>Alternatively, you can make Milvus access your AWS S3 bucket using <a href="https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html">AssumeRole</a>, so that only temporary credentials are involved instead of your actual AK/SK.</p>
<p>If this is what you prefer, you need to prepare a role on your AWS console and get its ARN, which is usually in the form of <code translate="no">arn:aws:iam::&lt;your account id&gt;:role/&lt;role-name&gt;</code>.</p>
<p>Then create a <code translate="no">ServiceAccount</code> object to store it in your Kubernetes as follows:</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    eks.amazonaws.com/role-arn: &lt;my-role-arn&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Once all set, reference the above <code translate="no">ServiceAccount</code> in the template YAML file, and set <code translate="no">spec.config.minio.useIAM</code> to <code translate="no">true</code> to enable AssumeRole.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
    <span class="hljs-comment"># use the above ServiceAccount</span>
    serviceAccountName: my-release-sa
  config:
    minio:
      <span class="hljs-comment"># enable AssumeRole</span>
      useIAM: true
      <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    storage:
      <span class="hljs-comment"># Omit other fields ...</span>
      <span class="hljs-comment"># Note: you must use regional endpoint here, otherwise the minio client that milvus uses will fail to connect</span>
      endpoint: s3.&lt;my-bucket-region&gt;.amazonaws.com:<span class="hljs-number">443</span>
      secretRef: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># we don&#x27;t need to specify the secret here</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h4 id="Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="common-anchor-header">Use Google Cloud Storage (GCS) as external object storage</h4><p>AWS S3 object storage is not the only choice. You can also use the object storage service from other public cloud providers, such as Google Cloud.</p>
<ul>
<li><p>Configure GCS Access by AK/SK</p>
<p>The configuration is mostly similar to that of using AWS S3. You still need to create a <code translate="no">Secret</code> object to store your credentials in your Kubernetes.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: v1
kind: Secret
metadata:
  name: my-release-gcp-secret
<span class="hljs-built_in">type</span>: Opaque
stringData:
  accesskey: &lt;my-access-key&gt;
  secretkey: &lt;my-secret-key&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Then, you only need to change <code translate="no">endpoint</code> to <code translate="no">storage.googleapis.com:443</code> and set <code translate="no">spec.config.minio.cloudProvider</code> to <code translate="no">gcp</code> as follows:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  config:
    minio:
      cloudProvider: gcp
  dependencies:
    storage:
      <span class="hljs-comment"># Omit other fields ...</span>
      endpoint: storage.googleapis.com:<span class="hljs-number">443</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Configure GCS Access by AssumeRole</p>
<p>Similar to AWS S3, you can also use <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">Workload Identity</a> to access GCS with temporary credentials if you are using GKE as your Kubernetes cluster.</p>
<p>The annotation of the <code translate="no">ServiceAccount</code> is different from that of AWS EKS. You need to specify the GCP service account name instead of the role ARN.</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    iam.gke.io/gcp-service-account: &lt;my-gcp-service-account-name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Then, you can configure your Milvus instance to use the above <code translate="no">ServiceAccount</code> and enable AssumeRole by setting <code translate="no">spec.config.minio.useIAM</code> to <code translate="no">true</code> as follows:</p>
<pre><code translate="no" class="language-YAML">labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
    <span class="hljs-comment"># use the above ServiceAccount</span>
    serviceAccountName: my-release-sa
  config:
    minio:
      cloudProvider: gcp
      <span class="hljs-comment"># enable AssumeRole</span>
      useIAM: true
      <span class="hljs-comment"># Omit other fields ...  </span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
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
<li><a href="/docs/v2.2.x/meta_storage_operator.md">Configure Meta Storage with Milvus Operator</a></li>
<li><a href="/docs/v2.2.x/message_storage_operator.md">Configure Message Storage with Milvus Operator</a></li>
</ul>
