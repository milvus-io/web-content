---
id: deploy_s3.md
title: 使用 Docker Compose 或 Helm 配置对象存储
related_key: 'S3, storage'
summary: 了解如何使用 Docker Compose 或 Helm 为 Milvus 配置 S3 存储。
---
<h1 id="Configure-Object-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">使用 Docker Compose 或 Helm 配置对象存储<button data-href="#Configure-Object-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 默认使用 MinIO 作为对象存储，但也支持将<a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service (S3)</a>用作日志和索引文件的持久化对象存储。本节介绍如何为 Milvus 配置 S3。如果您对 MinIO 感到满意，可以跳过本节。</p>
<p>您可以通过<a href="https://docs.docker.com/get-started/overview/">Docker Compose</a>或在 K8s 上配置 S3。</p>
<h2 id="Configure-S3-with-Docker-Compose" class="common-anchor-header">使用 Docker Compose 配置 S3<button data-href="#Configure-S3-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1. 配置 S3<button data-href="#1-Configure-S3" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://min.io/product/overview">MinIO</a>与 S3 兼容。若要通过 Docker Compose 配置 S3，请在 milvus/configs 路径下的<code translate="no">milvus.yaml</code> 文件中，为<code translate="no">minio</code> 部分提供相应的值。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;your_s3_endpoint&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;your_s3_port&gt;</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">&lt;your_s3_access_key_id&gt;</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">&lt;your_s3_secret_access_key&gt;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>更多信息请参阅《<a href="/docs/zh/v2.6.x/configure_minio.md">MinIO/S3 配置</a>》。</p>
<p>硬编码访问密钥和密钥虽然可行，但若您在支持工作负载身份（例如 EC2 实例配置文件或 EKS 上的 IRSA）的主机或集群上运行 Milvus，我们建议改用 IAM 角色。将<code translate="no">useIAM</code> 设置为<code translate="no">true</code> ，并删除<code translate="no">accessKeyID</code> 和<code translate="no">secretAccessKey</code> ：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;your_s3_endpoint&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;your_s3_port&gt;</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">cloudProvider:</span> <span class="hljs-string">&quot;aws&quot;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>随后，Milvus 将从附加到工作负载的 IAM 角色中获取临时凭据。<code translate="no">cloudProvider</code> 支持<code translate="no">aws</code> 、<code translate="no">gcp</code> 或<code translate="no">aliyun</code> ，而<code translate="no">iamEndpoint</code> 可选地指定用于获取 IAM 角色凭据的自定义端点。</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2. 优化 docker-compose.yaml<button data-href="#2-Refine-docker-composeyaml" class="anchor-icon" translate="no">
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
    </button></h3><p>你还需要移除<code translate="no">docker-compose.yaml</code> 处 milvus 服务的<code translate="no">MINIO_ADDRESS</code> 环境变量。默认情况下，milvus 将使用本地 Minio 而不是外部 S3。</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3. 运行 Milvus<button data-href="#3-Run-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>运行以下命令以启动使用 S3 配置的 Milvus。</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">配置仅在 Milvus 启动后生效。更多信息请参阅《<a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">启动 Milvus</a>》。</div>
<h2 id="Configure-S3-on-K8s" class="common-anchor-header">在 K8s 上配置 S3<button data-href="#Configure-S3-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>对于运行在 K8s 上的 Milvus 集群，您可以在启动 Milvus 的同一条命令中配置 S3。或者，您也可以在启动 Milvus 之前，使用<a href="https://github.com/milvus-io/milvus-helm">milvus-Helm</a>存储库中 /charts/milvus 路径下的<code translate="no">values.yml</code> 文件来配置 S3。</p>
<p>下表列出了 YAML 文件中用于配置 S3 的键。</p>
<table>
<thead>
<tr><th>键</th><th>描述</th><th>值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>启用或禁用 MinIO。</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>启用或禁用 S3。</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>访问 S3 的端点。</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>访问 S3 的端口。</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>S3 存储的根路径。</td><td>默认值为空字符串。</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>S3 的访问密钥 ID。</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>S3 的密钥。</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>S3 存储桶的名称。</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>连接时是否使用 SSL</td><td>默认值为<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.useIAM</code></td><td>是否使用 IAM 角色代替访问密钥/秘密密钥来访问 S3。</td><td>默认值为<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.cloudProvider</code></td><td>签发 IAM 角色凭据的云提供商。</td><td><code translate="no">aws</code>、<code translate="no">gcp</code> 或<code translate="no">aliyun</code> ；默认值为<code translate="no">aws</code></td></tr>
<tr><td><code translate="no">externalS3.iamEndpoint</code></td><td>用于获取 IAM 角色凭据的自定义端点。</td><td>留空即使用提供商的默认值。</td></tr>
</tbody>
</table>
<p>如果您的集群支持工作负载身份（例如 EKS 上的 IRSA），请将<code translate="no">externalS3.useIAM</code> 设置为<code translate="no">true</code> ，并删除<code translate="no">externalS3.accessKey</code> 和<code translate="no">externalS3.secretKey</code> — Milvus 将从附加到工作负载的 IAM 角色中获取临时凭据。</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">使用 YAML 文件<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>在<code translate="no">values.yaml</code> 文件中配置<code translate="no">minio</code> 部分。</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>在<code translate="no">values.yaml</code> 文件中，根据您的具体值配置<code translate="no">externalS3</code> 部分。</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">externalS3:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">host:</span> <span class="hljs-string">&quot;&lt;your_s3_endpoint&gt;&quot;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&quot;&lt;your_s3_port&gt;&quot;</span>
  <span class="hljs-attr">accessKey:</span> <span class="hljs-string">&quot;&lt;your_s3_access_key_id&gt;&quot;</span>
  <span class="hljs-attr">secretKey:</span> <span class="hljs-string">&quot;&lt;your_s3_secret_key&gt;&quot;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>配置完上述部分并保存<code translate="no">values.yaml</code> 文件后，请运行以下命令以安装使用S3配置的Milvus。</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">使用以下命令<button data-href="#Using-a-command" class="anchor-icon" translate="no">
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
    </button></h3><p>要安装 Milvus 并配置 S3，请根据您的具体值运行以下命令。</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --set cluster.enabled=true  --set minio.enabled=false --set externalS3.enabled=true --set externalS3.host=&lt;your_s3_endpoint&gt; --set externalS3.port=&lt;your_s3_port&gt; --set externalS3.accessKey=&lt;your_s3_access_key_id&gt; --set externalS3.secretKey=&lt;your_s3_secret_key&gt; --set externalS3.bucketName=&lt;your_bucket_name&gt;
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>了解如何使用 Docker Compose 或 Helm 配置其他 Milvus 依赖项：</p>
<ul>
<li><a href="/docs/zh/v2.6.x/deploy_etcd.md">使用 Docker Compose 或 Helm 配置 Meta Storage</a></li>
<li><a href="/docs/zh/v2.6.x/deploy_pulsar.md">使用 Docker Compose 或 Helm 配置消息存储</a></li>
</ul>
