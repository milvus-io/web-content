---
id: deploy_s3.md
title: Mengonfigurasi Penyimpanan Objek dengan Docker Compose atau Helm
related_key: 'S3, storage'
summary: >-
  Pelajari cara menyiapkan penyimpanan S3 untuk Milvus dengan Docker Compose
  atau Helm.
---
<h1 id="Configure-Object-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Mengonfigurasi Penyimpanan Objek dengan Docker Compose atau Helm<button data-href="#Configure-Object-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus menggunakan MinIO untuk penyimpanan objek secara default, tetapi juga mendukung penggunaan <a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service (S3)</a> sebagai penyimpanan objek yang persisten untuk berkas log dan indeks. Topik ini menjelaskan cara mengonfigurasi S3 untuk Milvus. Anda dapat melewatkan topik ini jika Anda sudah puas dengan MinIO.</p>
<p>Anda dapat mengonfigurasi S3 dengan <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> atau pada K8.</p>
<h2 id="Configure-S3-with-Docker-Compose" class="common-anchor-header">Mengkonfigurasi S3 dengan Docker Compose<button data-href="#Configure-S3-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1. Mengkonfigurasi S3</h3><p><a href="https://min.io/product/overview">MinIO</a> kompatibel dengan S3. Untuk mengonfigurasi S3 dengan Docker Compose, berikan nilai Anda untuk bagian <code translate="no">minio</code> pada berkas <code translate="no">milvus.yaml</code> di jalur milvus/configs.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;your_s3_endpoint&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;your_s3_port&gt;</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">&lt;your_s3_access_key_id&gt;</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">&lt;your_s3_secret_access_key&gt;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Lihat <a href="/docs/id/configure_minio.md">Konfigurasi MinIO/S3</a> untuk informasi lebih lanjut.</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2. Sempurnakan docker-compose.yaml</h3><p>Anda juga akan menghapus variabel lingkungan <code translate="no">MINIO_ADDRESS</code> untuk layanan milvus di <code translate="no">docker-compose.yaml</code>. Secara default, milvus akan menggunakan minio lokal, bukan S3 eksternal.</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3. Menjalankan Milvus</h3><p>Jalankan perintah berikut untuk menjalankan Milvus yang menggunakan konfigurasi S3.</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Konfigurasi hanya berlaku setelah Milvus dijalankan. Lihat <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Memulai Milvus</a> untuk informasi lebih lanjut.</div>
<h2 id="Configure-S3-on-K8s" class="common-anchor-header">Mengkonfigurasi S3 pada K8<button data-href="#Configure-S3-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk cluster Milvus pada K8, Anda dapat mengkonfigurasi S3 dengan perintah yang sama dengan perintah untuk memulai Milvus. Sebagai alternatif, Anda dapat mengkonfigurasi S3 menggunakan berkas <code translate="no">values.yml</code> pada jalur /charts/milvus di repositori <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> sebelum memulai Milvus.</p>
<p>Tabel berikut mencantumkan kunci untuk mengkonfigurasi S3 pada file YAML.</p>
<table>
<thead>
<tr><th>Kunci</th><th>Deskripsi</th><th>Nilai</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>Mengaktifkan atau menonaktifkan MinIO.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>Mengaktifkan atau menonaktifkan S3.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>Titik akhir untuk mengakses S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>Port untuk mengakses S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>Jalur root dari penyimpanan S3.</td><td>String emtpy secara default.</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>ID kunci akses untuk S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>Kunci akses rahasia untuk S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>Nama bucket S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>Apakah akan menggunakan SSL saat menyambung</td><td>Nilai-nilai yang ditetapkan secara default untuk <code translate="no">false</code></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Menggunakan file YAML</h3><ol>
<li>Mengonfigurasi bagian <code translate="no">minio</code> di file <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Konfigurasikan bagian <code translate="no">externalS3</code> menggunakan nilai Anda di file <code translate="no">values.yaml</code>.</li>
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
<li>Setelah mengonfigurasi bagian sebelumnya dan menyimpan berkas <code translate="no">values.yaml</code>, jalankan perintah berikut untuk menginstal Milvus yang menggunakan konfigurasi S3.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">Menggunakan perintah</h3><p>Untuk menginstall Milvus dan mengkonfigurasi S3, jalankan perintah berikut ini dengan menggunakan nilai-nilai Anda.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --set cluster.enabled=true  --set minio.enabled=false --set externalS3.enabled=true --set externalS3.host=&lt;your_s3_endpoint&gt; --set externalS3.port=&lt;your_s3_port&gt; --set externalS3.accessKey=&lt;your_s3_access_key_id&gt; --set externalS3.secretKey=&lt;your_s3_secret_key&gt; --set externalS3.bucketName=&lt;your_bucket_name&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Pelajari cara mengonfigurasi dependensi Milvus lainnya dengan Docker Compose atau Helm:</p>
<ul>
<li><a href="/docs/id/deploy_etcd.md">Mengonfigurasi Penyimpanan Meta dengan Docker Compose atau Helm</a></li>
<li><a href="/docs/id/deploy_pulsar.md">Mengonfigurasi Penyimpanan Pesan dengan Docker Compose atau Helm</a></li>
</ul>
