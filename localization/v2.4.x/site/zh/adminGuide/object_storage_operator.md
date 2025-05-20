---
id: object_storage_operator.md
title: 使用 Milvus Operator 配置对象存储
related_key: "minio, s3, storage, etcd, pulsar"
summary: 了解如何使用 Milvus Operator 配置对象存储。
---

<h1 id="Configure-Object-Storage-with-Milvus-Operator" class="common-anchor-header">使用 Milvus Operator 配置对象存储<button data-href="#Configure-Object-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 使用 MinIO 或 S3 作为对象存储来持久化大型文件，如索引文件和二进制日志。本主题介绍如何在使用 Milvus Operator 安装 Milvus 时配置对象存储的依赖关系。有关详细信息，请参阅<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/object-storage.md">Milvus Operator</a>存储库中的<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/object-storage.md">配置对象存储与 Milvus Operator</a>。</p>
<p>本主题假定您已部署 Milvus Operator。</p>
<div class="alert note">有关详细信息，请参阅<a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">部署 Milvus Operator</a>。 </div>
<p>您需要为使用 Milvus Operator 启动 Milvus 群集指定一个配置文件。</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>您只需编辑<code translate="no">milvus_cluster_default.yaml</code> 中的代码模板，即可配置第三方依赖关系。下文将分别介绍如何配置对象存储、etcd 和 Pulsar。</p>
<h2 id="Configure-object-storage" class="common-anchor-header">配置对象存储<button data-href="#Configure-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 群集使用 MinIO 或 S3 作为对象存储来持久化大型文件，如索引文件和二进制日志。在<code translate="no">spec.dependencies.storage</code> 下添加必填字段以配置对象存储，可能的选项有<code translate="no">external</code> 和<code translate="no">inCluster</code> 。</p>
<h3 id="Internal-object-storage" class="common-anchor-header">内部对象存储</h3><p>默认情况下，Milvus Operator 会为 Milvus 部署一个集群内 MinIO。下面是一个配置示例，演示如何将该 MinIO 用作内部对象存储。</p>
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
<p>应用上述配置后，集群内 MinIO 将以独立模式运行，内存上限为 100Mi。请注意</p>
<ul>
<li><p><code translate="no">deletionPolicy</code> 字段指定了群集内 MinIO 的删除策略。其默认值为<code translate="no">Delete</code> ，并有<code translate="no">Retain</code> 作为替代选项。</p>
<ul>
<li><code translate="no">Delete</code> 表示在停止 Milvus 实例时删除群集内对象存储。</li>
<li><code translate="no">Retain</code> 表示群集内对象存储作为依赖服务保留，供以后启动 Milvus 实例时使用。</li>
</ul></li>
<li><p><code translate="no">pvcDeletion</code> 字段指定在删除群集内 MinIO 时是否删除 PVC（持久卷要求）。</p></li>
</ul>
<p><code translate="no">inCluster.values</code> 下的字段与 Milvus Helm Chart 中的字段相同，你可以<a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml">在这里</a>找到它们。</p>
<h3 id="External-object-storage" class="common-anchor-header">外部对象存储</h3><p>在模板 YAML 文件中使用<code translate="no">external</code> 表示使用外部对象存储服务。要使用外部对象存储，需要在 Milvus CRD 中正确设置<code translate="no">spec.dependencies.storage</code> 和<code translate="no">spec.config.minio</code> 下的字段。</p>
<h4 id="Use-Amazon-Web-Service-AWS-S3-as-external-object-storage" class="common-anchor-header">使用亚马逊网络服务（AWS）S3 作为外部对象存储</h4><ul>
<li><p>按 AK/SK 配置 AWS S3 访问权限</p>
<p>通常可以通过一对访问密钥和访问秘钥访问 S3 存储桶。您可以创建一个<code translate="no">Secret</code> 对象，将它们存储在 Kubernetes 中，如下所示：</p>
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
<p>然后就可以配置 AWS S3 存储桶作为外部对象存储：</p>
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
<li><p>通过 AssumeRole 配置 AWS S3 访问</p>
<p>或者，你也可以让 Milvus 使用<a href="https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html">AssumeRole</a> 访问你的 AWS S3 存储桶，这样只涉及临时凭据，而不是你的实际 AK/SK。</p>
<p>如果你希望这样做，你需要在 AWS 控制台上准备一个角色，并获取其 ARN，通常是<code translate="no">arn:aws:iam::&lt;your account id&gt;:role/&lt;role-name&gt;</code> 的形式。</p>
<p>然后创建一个<code translate="no">ServiceAccount</code> 对象，将其存储在 Kubernetes 中，如下所示：</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    eks.amazonaws.com/role-arn: &lt;my-role-arn&gt;
<button class="copy-code-btn"></button></code></pre>
<p>全部设置完成后，在模板 YAML 文件中引用上述<code translate="no">ServiceAccount</code> ，并将<code translate="no">spec.config.minio.useIAM</code> 设置为<code translate="no">true</code> ，以启用 AssumeRole。</p>
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
<h4 id="Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="common-anchor-header">使用谷歌云存储（GCS）作为外部对象存储</h4><p>AWS S3 对象存储不是唯一的选择。您也可以使用其他公共云提供商的对象存储服务，如 Google Cloud。</p>
<ul>
<li><p>通过 AK/SK 配置 GCS 访问</p>
<p>配置大多与使用 AWS S3 相似。你仍然需要创建一个<code translate="no">Secret</code> 对象，以便在 Kubernetes 中存储凭证。</p>
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
<p>然后，您只需将<code translate="no">endpoint</code> 更改为<code translate="no">storage.googleapis.com:443</code> ，并将<code translate="no">spec.config.minio.cloudProvider</code> 设置为<code translate="no">gcp</code> ，如下所示：</p>
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
<li><p>通过 AssumeRole 配置 GCS 访问权限</p>
<p>与 AWS S3 类似，如果使用 GKE 作为 Kubernetes 集群，也可以使用<a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">Workload Identity</a>以临时凭据访问 GCS。</p>
<p><code translate="no">ServiceAccount</code> 的注释与 AWS EKS 不同。您需要指定 GCP 服务账户名称，而不是角色 ARN。</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    iam.gke.io/gcp-service-account: &lt;my-gcp-service-account-name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>然后，你可以将 Milvus 实例配置为使用上述<code translate="no">ServiceAccount</code> ，并通过将<code translate="no">spec.config.minio.useIAM</code> 设置为<code translate="no">true</code> 来启用 AssumeRole，如下所示：</p>
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
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>了解如何使用 Milvus Operator 配置其他 Milvus 依赖项：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/meta_storage_operator.md">使用 Milvus Operator 配置元存储</a></li>
<li><a href="/docs/zh/v2.4.x/message_storage_operator.md">使用 Milvus Operator 配置消息存储</a></li>
</ul>
