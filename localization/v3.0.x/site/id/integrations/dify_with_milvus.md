---
id: dify_with_milvus.md
summary: >-
  Dalam tutorial ini, kami akan menunjukkan kepada Anda cara menggunakan Dify
  dengan Milvus, untuk memungkinkan pengambilan dan mesin RAG yang efisien.
title: Menerapkan Dify dengan Milvus
---
<h1 id="Deploying-Dify-with-Milvus" class="common-anchor-header">Menerapkan Dify dengan Milvus<button data-href="#Deploying-Dify-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://dify.ai/">Dify</a> adalah platform sumber terbuka yang dirancang untuk menyederhanakan pembuatan aplikasi AI dengan menggabungkan Backend-as-a-Service dengan LLM. Dify mendukung LLM utama, menawarkan antarmuka orkestrasi cepat yang intuitif, mesin RAG berkualitas tinggi, dan kerangka kerja agen AI yang fleksibel. Dengan alur kerja kode rendah, antarmuka yang mudah digunakan, dan API, Dify memungkinkan pengembang dan pengguna non-teknis untuk fokus menciptakan solusi AI dunia nyata yang inovatif tanpa harus berurusan dengan kerumitan.</p>
<p>Dalam tutorial ini, kami akan menunjukkan kepada Anda cara menggunakan Dify dengan Milvus, untuk memungkinkan pengambilan yang efisien dan mesin RAG.</p>
<div class="alert note">
<p>Dokumentasi ini terutama didasarkan pada <a href="https://docs.dify.ai/">dokumentasi</a> resmi <a href="https://docs.dify.ai/">Dify</a>. Jika Anda menemukan konten yang sudah ketinggalan zaman atau tidak konsisten, mohon untuk memprioritaskan dokumentasi resmi dan jangan ragu untuk mengajukan masalah kepada kami.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Prasyarat<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Clone-the-Repository" class="common-anchor-header">Kloning Repositori</h3><p>Kloning kode sumber Dify ke mesin lokal Anda:</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-Environment-Configuration" class="common-anchor-header">Siapkan Konfigurasi Lingkungan</h3><p>Arahkan ke direktori Docker di kode sumber Dify</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>Salin berkas konfigurasi lingkungan</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deployment-Options" class="common-anchor-header">Opsi Penyebaran<button data-href="#Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat menerapkan Dify dengan Milvus menggunakan dua pendekatan berbeda. Pilih salah satu yang paling sesuai dengan kebutuhan Anda:</p>
<h2 id="Option-1-Using-Milvus-with-Docker" class="common-anchor-header">Opsi 1: Menggunakan Milvus dengan Docker<button data-href="#Option-1-Using-Milvus-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Opsi ini menjalankan kontainer Milvus bersama Dify di mesin lokal Anda menggunakan Docker Compose.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">Mengonfigurasi Variabel Lingkungan</h3><p>Edit berkas <code translate="no">.env</code> dengan konfigurasi Milvus berikut ini:</p>
<pre><code translate="no">VECTOR_STORE=milvus
MILVUS_URI=http://host.docker.internal:19530
MILVUS_TOKEN=
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><code translate="no">MILVUS_URI</code> menggunakan <code translate="no">host.docker.internal:19530</code> yang memungkinkan kontainer Docker mengakses Milvus yang berjalan di mesin host melalui jaringan internal Docker.</li>
<li><code translate="no">MILVUS_TOKEN</code> dapat dibiarkan kosong untuk penerapan Milvus lokal.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Memulai Kontainer Docker</h3><p>Mulai kontainer dengan profil <code translate="no">milvus</code> untuk menyertakan layanan Milvus:</p>
<pre><code translate="no" class="language-shell">docker compose --profile milvus up -d
<button class="copy-code-btn"></button></code></pre>
<p>Perintah ini akan memulai layanan Dify bersama dengan kontainer <code translate="no">milvus-standalone</code>, <code translate="no">etcd</code>, dan <code translate="no">minio</code>.</p>
<h2 id="Option-2-Using-Zilliz-Cloud" class="common-anchor-header">Opsi 2: Menggunakan Zilliz Cloud<button data-href="#Option-2-Using-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Opsi ini menghubungkan Dify ke layanan Milvus terkelola di Zilliz Cloud.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">Mengonfigurasi Variabel Lingkungan</h3><p>Edit file <code translate="no">.env</code> dengan detail koneksi Zilliz Cloud Anda:</p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<span class="hljs-attr">MILVUS_URI</span>=YOUR_ZILLIZ_CLOUD_ENDPOINT
<span class="hljs-attr">MILVUS_TOKEN</span>=YOUR_ZILLIZ_CLOUD_API_KEY
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Ganti <code translate="no">YOUR_ZILLIZ_CLOUD_ENDPOINT</code> dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint</a> Anda dari Zilliz Cloud.</li>
<li>Ganti <code translate="no">YOUR_ZILLIZ_CLOUD_API_KEY</code> dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">kunci API</a> Anda dari Zilliz Cloud.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Memulai Kontainer Docker</h3><p>Mulai hanya kontainer Dify tanpa profil Milvus:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Accessing-Dify" class="common-anchor-header">Mengakses Dify<button data-href="#Accessing-Dify" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Log-in-to-Dify" class="common-anchor-header">Masuk ke Dify</h3><p>Buka peramban Anda dan buka halaman instalasi Dify, dan Anda dapat mengatur akun admin Anda di sini:<code translate="no">http://localhost/install</code>, Lalu masuk ke halaman utama Dify untuk penggunaan lebih lanjut.</p>
<p>Untuk penggunaan dan panduan lebih lanjut, silakan lihat <a href="https://docs.dify.ai/">dokumentasi Dify</a>.</p>
