---
id: deploy_s3.md
title: Set up Storage
related_key: 'S3, storage'
summary: Learn how to set up S3 storage for Milvus.
---
<h1 id="Set-Up-Storage" class="common-anchor-header">Set Up Storage<button data-href="#Set-Up-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus supports using <a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service (S3)</a> as persistent storage for log and index files. This topic describes how to set up S3 for Milvus.</p>
<p>You can set up S3 with <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> or on K8s.</p>
<h2 id="Set-up-with-Docker-Compose" class="common-anchor-header">Set up with Docker Compose<button data-href="#Set-up-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1. Configure S3</h3><p><a href="https://min.io/product/overview">MinIO</a> is compatible with S3. To set up S3 with Docker Compose, provide your values for the <code translate="no">minio</code> section in the <code translate="no">milvus.yaml</code> file on the milvus/configs path.</p>
<pre><code translate="no" class="language-yaml">minio:
  address: &lt;your_s3_endpoint&gt;
  port: &lt;your_s3_port&gt;
  accessKeyID: &lt;your_s3_access_key_id&gt;
  secretAccessKey: &lt;your_s3_secret_access_key&gt;
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>See <a href="/docs/v2.0.x/configure_minio.md">MinIO/S3 Configurations</a> for more information.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Run Milvus</h3><p>Run the following command to start Milvus that uses the S3 configurations.</p>
<pre><code translate="no" class="language-shell">docker-compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Configurations only take effect after Milvus starts. See <a herf=https://milvus.io/docs/v2.0.2/install_cluster-docker.md#Start-Milvus>Start Milvus</a> for more information.</div>
<h2 id="Set-up-on-K8s" class="common-anchor-header">Set up on K8s<button data-href="#Set-up-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>For Milvus clusters on K8s, you can configure S3 in the same command that starts Milvus. Alternatively, you can configure S3 using the <code translate="no">values.yml</code> file on the /charts/milvus path in the <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> repository before you start Milvus.</p>
<p>The following table lists the keys for configuring S3 in the YAML file.</p>
<table>
<thead>
<tr><th>Key</th><th>Description</th><th>Value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">externalS3.enabled</code></td><td>Enables or disables S3.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>The endpoint to access S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>The port to access S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>The access key ID for S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>The secret access key for S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>The name of the S3 bucket.</td><td></td></tr>
<tr><td><code translate="no">minio.enabled</code></td><td>Enables or disables MinIO.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Using the YAML file</h3><ol>
<li>Configure the <code translate="no">minio</code> section in the <code translate="no">values.yaml</code> file.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Configure the <code translate="no">externalS3</code> section using your values in the <code translate="no">values.yaml</code> file.</li>
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
<li>After configuring the preceding sections and saving the <code translate="no">values.yaml</code> file, run the following command to install Milvus that uses the S3 configurations.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">Using a command</h3><p>To install Milvus and configure S3, run the following command using your values.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalS3.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalS3.host=<span class="hljs-string">&#x27;&lt;your_s3_endpoint&gt;&#x27;</span> --<span class="hljs-built_in">set</span> externalS3.port=&lt;your_s3_port&gt; --<span class="hljs-built_in">set</span> externalS3.accessKey=&lt;your_s3_access_key_id&gt; --<span class="hljs-built_in">set</span> externalS3.secretKey=&lt;your_s3_secret_key&gt; --<span class="hljs-built_in">set</span> externalS3.bucketName=&lt;your_bucket_name&gt; --<span class="hljs-built_in">set</span> minio.enabled=<span class="hljs-literal">false</span>
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
    </button></h2><p>If you want to learn how to use storage from other cloud providers:</p>
<ul>
<li><a href="/docs/v2.0.x/gcp.md#Use-Google-Cloud-Storage">Use Google Cloud Storage</a></li>
<li><a href="/docs/v2.0.x/azure.md#Use-Azure-Blob-Storage">Use Azure Blob Storage</a></li>
</ul>
