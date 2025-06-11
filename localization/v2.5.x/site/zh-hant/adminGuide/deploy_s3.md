---
id: deploy_s3.md
title: 使用 Docker Compose 或 Helm 設定物件儲存
related_key: "S3, storage"
summary: 學習如何使用 Docker Compose 或 Helm 為 Milvus 設定 S3 儲存。
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
    </button></h1><p>Milvus 預設使用 MinIO 作為物件儲存，但它也支援使用<a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service (S3)</a>作為日誌和索引檔案的持久性物件儲存。本主題描述如何為 Milvus 設定 S3。如果您滿意 MinIO，可以跳過本主題。</p>
<p>您可以使用<a href="https://docs.docker.com/get-started/overview/">Docker Compose</a>或在 K8s 上設定 S3。</p>
<h2 id="Configure-S3-with-Docker-Compose" class="common-anchor-header">使用 Docker Compose 設定 S3<button data-href="#Configure-S3-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1.設定 S3</h3><p><a href="https://min.io/product/overview">MinIO</a>與 S3 相容。要使用 Docker Compose 設定 S3，請在 milvus/configs 路徑上的<code translate="no">milvus.yaml</code> 檔案中提供<code translate="no">minio</code> 部分的值。</p>
<pre><code translate="no" class="language-yaml">minio:
  address: &lt;your_s3_endpoint&gt;
  port: &lt;your_s3_port&gt;
  accessKeyID: &lt;your_s3_access_key_id&gt;
  secretAccessKey: &lt;your_s3_secret_access_key&gt;
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/v2.5.x/configure_minio.md">MinIO/S3 配置</a>。</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2.完善 docker-compose.yaml</h3><p>您也可以移除<code translate="no">MINIO_ADDRESS</code> 環境變數，讓 milvus 服務在<code translate="no">docker-compose.yaml</code> 。預設的情況下，milvus 會使用本機的 minio 而不是外部的 S3。</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3.執行 Milvus</h3><p>執行下列指令啟動使用 S3 配置的 Milvus。</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">配置僅在 Milvus 啟動後生效。更多資訊請參閱<a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">啟動 Milvus</a>。</div>
<h2 id="Configure-S3-on-K8s" class="common-anchor-header">在 K8s 上設定 S3<button data-href="#Configure-S3-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>對於 K8s 上的 Milvus 叢集，您可以在啟動 Milvus 的相同指令中設定 S3。另外，您也可以在啟動 Milvus 前，使用<a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a>套件庫中 /charts/milvus 路徑上的<code translate="no">values.yml</code> 檔來設定 S3。</p>
<p>下表列出在 YAML 檔案中設定 S3 的鍵。</p>
<table>
<thead>
<tr><th>鍵</th><th>說明</th><th>值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>啟用或停用 MinIO。</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>啟用或停用 S3。</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>存取 S3 的端點。</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>存取 S3 的連接埠。</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>S3 儲存的根目錄。</td><td>預設為 emtpy 字串。</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>S3 的存取金鑰 ID。</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>S3 的秘密存取金鑰。</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>S3 儲存桶的名稱。</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>連接時是否使用 SSL</td><td>預設值為<code translate="no">false</code></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">使用 YAML 檔案</h3><ol>
<li>在<code translate="no">values.yaml</code> 檔案中設定<code translate="no">minio</code> 部分。</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>使用您在<code translate="no">values.yaml</code> 檔案中的值配置<code translate="no">externalS3</code> 部分。</li>
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
<li>配置前面的部分並儲存<code translate="no">values.yaml</code> 檔案後，執行下列指令安裝使用 S3 配置的 Milvus。</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">使用指令</h3><p>要安裝 Milvus 並配置 S3，請使用您的值執行下列指令。</p>
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
    </button></h2><p>了解如何使用 Docker Compose 或 Helm 配置其他 Milvus 依賴項目：</p>
<ul>
<li><a href="/docs/zh-hant/v2.5.x/deploy_etcd.md">使用 Docker Compose 或 Helm 配置 Meta 儲存空間</a></li>
<li><a href="/docs/zh-hant/v2.5.x/deploy_pulsar.md">使用 Docker Compose 或 Helm 設定訊息儲存空間</a></li>
</ul>
