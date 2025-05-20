---
id: deploy_s3.md
title: 使用 Docker Compose 或 Helm 配置对象存储
related_key: 'S3, storage'
summary: 了解如何使用 Docker Compose 或 Helm 为 Milvus 设置 S3 存储。
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
    </button></h1><p>Milvus 默认使用 MinIO 作为对象存储，但它也支持使用<a href="https://aws.amazon.com/s3/">亚马逊简单存储服务（S3）</a>作为日志和索引文件的持久对象存储。本主题介绍如何为 Milvus 配置 S3。如果您对 MinIO 感兴趣，可以跳过此主题。</p>
<p>您可以使用<a href="https://docs.docker.com/get-started/overview/">Docker Compose</a>或在 K8s 上配置 S3。</p>
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1.配置 S3</h3><p><a href="https://min.io/product/overview">MinIO</a>与 S3 兼容。要使用 Docker Compose 配置 S3，请在 milvus/configs 路径上的<code translate="no">milvus.yaml</code> 文件中提供<code translate="no">minio</code> 部分的值。</p>
<pre><code translate="no" class="language-yaml">minio:
  address: &lt;your_s3_endpoint&gt;
  port: &lt;your_s3_port&gt;
  accessKeyID: &lt;your_s3_access_key_id&gt;
  secretAccessKey: &lt;your_s3_secret_access_key&gt;
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关详细信息，请参阅<a href="/docs/zh/v2.4.x/configure_minio.md">MinIO/S3 配置</a>。</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2.完善 docker-compose.yaml</h3><p>你还需要删除<code translate="no">MINIO_ADDRESS</code> 环境变量，以便在<code translate="no">docker-compose.yaml</code> 中为 milvus 服务设置环境变量。默认情况下，milvus 将使用本地 minio 而不是外部 S3。</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3.运行 Milvus</h3><p>运行以下命令启动使用 S3 配置的 Milvus。</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">配置仅在 Milvus 启动后生效。有关详细信息，请参阅<a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">启动 Milvus</a>。</div>
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
    </button></h2><p>对于 K8s 上的 Milvus 群集，可以在启动 Milvus 的同一命令中配置 S3。或者，也可以在启动<a href="https://github.com/milvus-io/milvus-helm">Milvus</a>前，使用<a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a>资源库中 /charts/milvus 路径下的<code translate="no">values.yml</code> 文件配置 S3。</p>
<p>下表列出了在 YAML 文件中配置 S3 的关键字。</p>
<table>
<thead>
<tr><th>键</th><th>描述</th><th>值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>启用或禁用 MinIO。</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>启用或禁用 S3。</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>访问 S3 的端点。</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>访问 S3 的端口。</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>S3 存储的根路径。</td><td>默认为 emtpy 字符串。</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>S3 的访问密钥 ID。</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>S3 的秘密访问密钥。</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>S3 存储桶的名称。</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>连接时是否使用 SSL</td><td>默认值为<code translate="no">false</code></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">使用 YAML 文件</h3><ol>
<li>在<code translate="no">values.yaml</code> 文件中配置<code translate="no">minio</code> 部分。</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>使用<code translate="no">values.yaml</code> 文件中的值配置<code translate="no">externalS3</code> 部分。</li>
</ol>
<pre><code translate="no" class="language-yaml">externalS3:
  enabled: <span class="hljs-literal">true</span>
  host: <span class="hljs-string">&quot;&lt;your_s3_endpoint&gt;&quot;</span>
  port: <span class="hljs-string">&quot;&lt;your_s3_port&gt;&quot;</span>
  accessKey: <span class="hljs-string">&quot;&lt;your_s3_access_key_id&gt;&quot;</span>
  secretKey: <span class="hljs-string">&quot;&lt;your_s3_secret_key&gt;&quot;</span>
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>配置前述部分并保存<code translate="no">values.yaml</code> 文件后，运行以下命令安装使用 S3 配置的 Milvus。</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">使用命令</h3><p>要安装 Milvus 并配置 S3，请使用您的值运行以下命令。</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span>  --<span class="hljs-built_in">set</span> minio.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> externalS3.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalS3.host=&lt;your_s3_endpoint&gt; --<span class="hljs-built_in">set</span> externalS3.port=&lt;your_s3_port&gt; --<span class="hljs-built_in">set</span> externalS3.accessKey=&lt;your_s3_access_key_id&gt; --<span class="hljs-built_in">set</span> externalS3.secretKey=&lt;your_s3_secret_key&gt; --<span class="hljs-built_in">set</span> externalS3.bucketName=&lt;your_bucket_name&gt;
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
    </button></h2><p>了解如何使用 Docker Compose 或 Helm 配置 Milvus 的其他依赖项：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/deploy_etcd.md">使用 Docker Compose 或 Helm 配置元存储</a></li>
<li><a href="/docs/zh/v2.4.x/deploy_pulsar.md">使用 Docker Compose 或 Helm 配置消息存储</a></li>
</ul>
