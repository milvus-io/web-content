---
id: deploy_s3.md
title: 使用 Docker Compose 或 Helm 設定物件儲存
related_key: 'S3, storage'
summary: 瞭解如何使用 Docker Compose 或 Helm 為 Milvus 設定 S3 儲存空間。
---
<h1 id="Configure-Object-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">使用 Docker Compose 或 Helm 設定物件儲存<button data-href="#Configure-Object-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 預設使用 MinIO 作為物件儲存，但亦支援將<a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service (S3)</a>及其他與 S3 相容的物件儲存服務（例如 Backblaze B2 或 Cloudflare R2）用作日誌與索引檔案的持久性物件儲存。本主題說明如何為 Milvus 設定 S3。 若您對 MinIO 感到滿意，可跳過本主題。</p>
<p>您可以透過<a href="https://docs.docker.com/get-started/overview/">Docker Compose</a>或在 K8s 上配置 S3。</p>
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1. 設定 S3<button data-href="#1-Configure-S3" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://min.io/product/overview">MinIO</a>與 S3 相容。若要透過 Docker Compose 配置 S3，請在 milvus/configs 路徑下的<code translate="no">milvus.yaml</code> 檔案中，為<code translate="no">minio</code> 區段提供您的設定值。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;your_s3_endpoint&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;your_s3_port&gt;</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">&lt;your_s3_access_key_id&gt;</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">&lt;your_s3_secret_access_key&gt;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>更多資訊請參閱《<a href="/docs/zh-hant/configure_minio.md">MinIO/S3 配置</a>》。</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2. 調整 docker-compose.yaml<button data-href="#2-Refine-docker-composeyaml" class="anchor-icon" translate="no">
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
    </button></h3><p>您還需從<code translate="no">docker-compose.yaml</code> 檔案中移除 milvus 服務的<code translate="no">MINIO_ADDRESS</code> 環境變數。預設情況下，milvus 會使用本機 MinIO 而非外部 S3。</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3. 執行 Milvus<button data-href="#3-Run-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>執行以下指令以啟動採用 S3 設定的 Milvus。</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">設定僅在 Milvus 啟動後才會生效。請參閱「<a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">啟動 Milvus</a>」以獲取更多資訊。</div>
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
    </button></h2><p>對於部署在 K8s 上的 Milvus 叢集，您可以在啟動 Milvus 的同一條指令中配置 S3。或者，您也可以在啟動 Milvus 之前，透過<a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a>儲存庫中 /charts/milvus 路徑下的<code translate="no">values.yml</code> 檔案來配置 S3。</p>
<p>下表列出了 YAML 檔案中用於配置 S3 的鍵值。</p>
<table>
<thead>
<tr><th>鍵</th><th>說明</th><th>值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>啟用或停用 MinIO。</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>啟用或停用 S3。</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>存取 S3 的端點。</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>存取 S3 的埠號。</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>S3 儲存空間的根路徑。</td><td>預設為空字串。</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>S3 的存取金鑰 ID。</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>S3 的秘密存取金鑰。</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>S3 儲存桶的名稱。</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>連線時是否使用 SSL</td><td>預設值為<code translate="no">false</code></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">使用 YAML 檔案<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
<li>請在<code translate="no">values.yaml</code> 檔案中設定<code translate="no">minio</code> 區段。</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>請在<code translate="no">values.yaml</code> 檔案中，根據您的值設定<code translate="no">externalS3</code> 區段。</li>
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
<li>配置完上述區段並儲存<code translate="no">values.yaml</code> 檔案後，請執行以下命令以安裝使用 S3 設定的 Milvus。</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">使用命令<button data-href="#Using-a-command" class="anchor-icon" translate="no">
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
    </button></h3><p>若要安裝 Milvus 並設定 S3，請根據您的實際數值執行以下指令。</p>
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
    </button></h2><p>瞭解如何使用 Docker Compose 或 Helm 配置其他 Milvus 依賴項：</p>
<ul>
<li><a href="/docs/zh-hant/deploy_etcd.md">使用 Docker Compose 或 Helm 配置 Meta Storage</a></li>
<li><a href="/docs/zh-hant/deploy_pulsar.md">使用 Docker Compose 或 Helm 配置訊息儲存</a></li>
</ul>
