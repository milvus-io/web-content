---
id: gcs.md
title: 按工作负载身份配置 GCS 访问
related_key: 'gcs, storage, workload identity, iam'
summary: 了解如何使用工作负载身份配置 gcs。
---
<h1 id="Configure-GCS-Access-by-Workload-Identity" class="common-anchor-header">按工作负载身份配置 GCS 访问<button data-href="#Configure-GCS-Access-by-Workload-Identity" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍如何在使用 Helm 安装 Milvus 时，通过工作负载身份配置 gcs 访问。 更多详情，请参阅<a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">工作负载身份</a>。</p>
<h2 id="Before-you-start" class="common-anchor-header">开始之前<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>请使用 Google Cloud CLI 或 Google Cloud 控制台在群集和节点池上启用 Workload Identity。必须在群集级别启用 Workload Identity，然后才能在节点池上启用 Workload Identity。</p>
<h2 id="Configure-applications-to-use-Workload-Identity" class="common-anchor-header">配置应用程序以使用 Workload Identity<button data-href="#Configure-applications-to-use-Workload-Identity" class="anchor-icon" translate="no">
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
<li>创建存储桶。</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud storage buckets create <span class="hljs-attr">gs</span>:<span class="hljs-comment">//milvus-testing-nonprod --project=milvus-testing-nonprod --default-storage-class=STANDARD --location=us-west1 --uniform-bucket-level-access</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>为您的应用程序创建一个 Kubernetes 服务账户。</li>
</ul>
<pre><code translate="no" class="language-bash">kubectl create serviceaccount milvus-gcs-access-sa
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>为应用程序创建 IAM 服务帐户，或使用现有的 IAM 服务帐户。您可以在组织中的任何项目中使用任何 IAM 服务帐户。</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud iam service-accounts create milvus-gcs-access-sa \
    --project=milvus-testing-nonprod
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>确保 IAM 服务帐户具有所需的角色。您可以使用以下命令授予其他角色：</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud projects <span class="hljs-keyword">add</span>-iam-policy-binding milvus-testing-nonprod \
    --member <span class="hljs-string">&quot;serviceAccount:milvus-gcs-access-sa@milvus-testing-nonprod.iam.gserviceaccount.com&quot;</span> \
    --role <span class="hljs-string">&quot;roles/storage.admin&quot;</span> \
    --condition=<span class="hljs-string">&#x27;title=milvus-testing-nonprod,expression=resource.service == &quot;storage.googleapis.com&quot; &amp;&amp; resource.name.startsWith(&quot;projects/_/buckets/milvus-testing-nonprod&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>通过在两个服务账户之间添加 IAM 策略绑定，允许 Kubernetes 服务账户冒充 IAM 服务账户。该绑定允许 Kubernetes 服务账户充当 IAM 服务账户。</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud iam service-accounts add-iam-policy-binding milvus-gcs-access-sa<span class="hljs-meta">@milvus</span>-testing-nonprod.iam.gserviceaccount.com \
    --role <span class="hljs-string">&quot;roles/iam.workloadIdentityUser&quot;</span> \
    --member <span class="hljs-string">&quot;serviceAccount:milvus-testing-nonprod.svc.id.goog[default/milvus-gcs-access-sa]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>用 IAM 服务账户的电子邮件地址注释 Kubernetes 服务账户。</li>
</ul>
<pre><code translate="no" class="language-bash">kubectl annotate serviceaccount milvus-gcs-access-sa \
    --namespace <span class="hljs-keyword">default</span> \
    iam.gke.io/gcp-service-account=milvus-gcs-access-sa<span class="hljs-meta">@milvus</span>-testing-nonprod.iam.gserviceaccount.com
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-Workload-Identity-setup" class="common-anchor-header">验证工作量身份设置<button data-href="#Verify-the-Workload-Identity-setup" class="anchor-icon" translate="no">
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
    </button></h2><p>请参阅 "<a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">工作负载身份</a>"。在 Pod 内运行以下命令：</p>
<pre><code translate="no" class="language-bash">curl -H <span class="hljs-string">&quot;Metadata-Flavor: Google&quot;</span> http://169.254.169.254/computeMetadata/v1/instance/service-accounts/default/email
<button class="copy-code-btn"></button></code></pre>
<p>如果结果是<code translate="no">milvus-gcs-access-sa@milvus-testing-nonprod.iam.gserviceaccount.com</code> ，就没问题。</p>
<h2 id="Deploy-Milvus" class="common-anchor-header">部署 Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-bash">helm install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>values.yaml内容：</p>
<pre><code translate="no" class="language-yaml">cluster:
    enabled: <span class="hljs-literal">true</span>

service:
    <span class="hljs-built_in">type</span>: LoadBalancer

minio:
    enabled: <span class="hljs-literal">false</span>

serviceAccount:
    create: <span class="hljs-literal">false</span>
    name: milvus-gcs-access-sa

externalS3:
    enabled: <span class="hljs-literal">true</span>
    host: storage.googleapis.com
    port: 443
    rootPath: milvus/my-release
    bucketName: milvus-testing-nonprod
    cloudProvider: gcp
    useSSL: <span class="hljs-literal">true</span>
    useIAM: <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
