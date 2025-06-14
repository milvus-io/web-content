---
id: dify_with_milvus.md
summary: >-
  Dalam tutorial ini, kami akan menunjukkan kepada Anda cara menggunakan Dify
  dengan Milvus, untuk memungkinkan pengambilan yang efisien dan mesin RAG.
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
<h2 id="Clone-the-Repository" class="common-anchor-header">Mengkloning Repositori<button data-href="#Clone-the-Repository" class="anchor-icon" translate="no">
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
    </button></h2><p>Kloning kode sumber Dify ke mesin lokal Anda:</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-the-Environment-Variables" class="common-anchor-header">Mengatur Variabel Lingkungan<button data-href="#Set-the-Environment-Variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Arahkan ke direktori Docker dalam kode sumber Dify</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>Salin berkas konfigurasi lingkungan</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<p>Ubah nilai <code translate="no">VECTOR_STORE</code> dalam berkas <code translate="no">.env</code> </p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<button class="copy-code-btn"></button></code></pre>
<p>Pastikan konfigurasi Milvus dalam berkas <code translate="no">.env</code> memiliki baris berikut:</p>
<pre><code translate="no"><span class="hljs-attr">MILVUS_URI</span>=http://host.docker.internal:<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>Perhatikan bahwa dengan menentukan <code translate="no">VECTOR_STORE=milvus</code>, Dify akan memunculkan server Milvus Standalone di docker. Meskipun Anda dapat mengakses server dari luar Docker melalui <code translate="no">http://localhost:19530</code>, agar kontainer Dify lain dapat berbicara dengannya di dalam lingkungan Docker, kontainer tersebut harus terhubung ke nama DNS khusus <code translate="no">host.docker.internal</code>. Dengan demikian, kita menetapkan <code translate="no">http://host.docker.internal:19530</code> sebagai <code translate="no">MILVUS_URI</code>.</p>
<p>Untuk penerapan produksi, Anda mungkin ingin menyesuaikan autentikasi. Untuk informasi lebih lanjut tentang cara mengatur token atau nama pengguna dan kata sandi di Milvus, Anda dapat merujuk ke <a href="https://milvus.io/docs/authenticate.md?tab=docker#Update-user-password">halaman autentikasi</a>.</p>
<h2 id="Start-the-Docker-Containers" class="common-anchor-header">Memulai Kontainer Docker<button data-href="#Start-the-Docker-Containers" class="anchor-icon" translate="no">
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
    </button></h2><p>Pilih perintah yang sesuai untuk memulai kontainer berdasarkan versi Docker Compose pada sistem Anda. Anda dapat menggunakan perintah <code translate="no">$ docker compose version</code> untuk memeriksa versi, dan merujuk ke dokumentasi Docker untuk informasi lebih lanjut:</p>
<p>Jika Anda memiliki Docker Compose V2, gunakan perintah berikut:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<p>Jika Anda memiliki Docker Compose V1, gunakan perintah berikut:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Log-in-to-Dify" class="common-anchor-header">Masuk ke Dify<button data-href="#Log-in-to-Dify" class="anchor-icon" translate="no">
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
    </button></h2><p>Buka peramban Anda dan buka halaman instalasi Dify, dan Anda dapat mengatur akun admin Anda di sini:<code translate="no">http://localhost/install</code>, Lalu masuk ke halaman utama Dify untuk penggunaan lebih lanjut.</p>
<p>Untuk penggunaan dan panduan lebih lanjut, silakan lihat <a href="https://docs.dify.ai/">dokumentasi Dify</a>.</p>
