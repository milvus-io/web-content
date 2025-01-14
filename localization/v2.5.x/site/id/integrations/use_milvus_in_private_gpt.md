---
id: use_milvus_in_private_gpt.md
summary: >-
  Dalam tutorial ini, kami akan menunjukkan kepada Anda cara menggunakan Milvus
  sebagai basis data vektor backend untuk PrivateGPT.
title: Gunakan Milvus di PrivateGPT
---
<h1 id="Use-Milvus-in-PrivateGPT" class="common-anchor-header">Gunakan Milvus di PrivateGPT<button data-href="#Use-Milvus-in-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://privategpt.dev/">PrivateGPT</a> adalah proyek AI siap produksi yang memungkinkan pengguna untuk mengajukan pertanyaan tentang dokumen mereka menggunakan Model Bahasa Besar tanpa koneksi internet sambil memastikan privasi 100%. PrivateGPT menawarkan API yang dibagi menjadi blok tingkat tinggi dan tingkat rendah. Ini juga menyediakan klien Gradio UI dan alat yang berguna seperti skrip pengunduhan model massal dan skrip konsumsi. Secara konseptual, PrivateGPT membungkus pipeline RAG dan mengekspos primitifnya, siap digunakan dan menyediakan implementasi penuh API dan pipeline RAG.</p>
<p>Dalam tutorial ini, kami akan menunjukkan kepada Anda cara menggunakan Milvus sebagai basis data vektor backend untuk PrivateGPT.</p>
<div class="alert note">
<p>Tutorial ini terutama mengacu pada panduan instalasi resmi <a href="https://docs.privategpt.dev/installation/getting-started/installation">PrivateGPT</a>. Jika Anda menemukan bahwa tutorial ini memiliki bagian yang sudah usang, Anda dapat memprioritaskan untuk mengikuti panduan resmi dan mengajukan pertanyaan kepada kami.</p>
</div>
<h2 id="Base-requirements-to-run-PrivateGPT" class="common-anchor-header">Persyaratan dasar untuk menjalankan PrivateGPT<button data-href="#Base-requirements-to-run-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Clone-the-PrivateGPT-Repository" class="common-anchor-header">1. Kloning Repositori PrivateGPT</h3><p>Kloning repositori dan arahkan ke sana:</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/zylon-ai/private-gpt
$ <span class="hljs-built_in">cd</span> private-gpt
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Poetry" class="common-anchor-header">2. Instal Puisi</h3><p>Instal <a href="https://python-poetry.org/docs/#installing-with-the-official-installer">Puisi</a> untuk manajemen ketergantungan: Ikuti petunjuk di situs web resmi Poetry untuk menginstalnya.</p>
<h3 id="3-Optional-Install-make" class="common-anchor-header">3. (Opsional) Instal make</h3><p>Untuk menjalankan berbagai skrip, Anda perlu menginstal make.</p>
<p>macOS (Menggunakan Homebrew):</p>
<pre><code translate="no" class="language-shell">$ brew install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<p>Windows (Menggunakan Chocolatey):</p>
<pre><code translate="no" class="language-shell">$ choco install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Available-Modules" class="common-anchor-header">Instal Modul yang Tersedia<button data-href="#Install-Available-Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>PrivateGPT memungkinkan kustomisasi penyiapan untuk beberapa modul, misalnya LLM, Embeddings, Vector Stores, UI.</p>
<p>Dalam tutorial ini, kita akan menggunakan modul-modul berikut:</p>
<ul>
<li><strong>LLM</strong>: Ollama</li>
<li><strong>Embeddings</strong>: Ollama</li>
<li><strong>Vector Stores</strong>: Milvus</li>
<li><strong>UI</strong> Gradio</li>
</ul>
<p>Jalankan perintah berikut untuk menggunakan puisi untuk menginstal ketergantungan modul yang diperlukan:</p>
<pre><code translate="no" class="language-shell">$ poetry install --extras <span class="hljs-string">&quot;llms-ollama embeddings-ollama vector-stores-milvus ui&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Ollama-service" class="common-anchor-header">Memulai layanan Ollama<button data-href="#Start-Ollama-service" class="anchor-icon" translate="no">
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
    </button></h2><p>Buka <a href="https://ollama.com/">ollama.ai</a> dan ikuti petunjuk untuk menginstal Ollama di komputer Anda.</p>
<p>Setelah instalasi, pastikan aplikasi desktop Ollama ditutup.</p>
<p>Sekarang, mulai layanan Ollama (ini akan memulai server inferensi lokal, yang melayani LLM dan Embeddings):</p>
<pre><code translate="no" class="language-shell">$ ollama serve
<button class="copy-code-btn"></button></code></pre>
<p>Instal model yang akan digunakan, defaultnya <code translate="no">settings-ollama.yaml</code> dikonfigurasi untuk pengguna <code translate="no">llama3.1</code> 8b LLM (~4GB) dan <code translate="no">nomic-embed-text</code> Embeddings (~275MB)</p>
<p>Secara default, PrivateGPT akan secara otomatis menarik model sesuai kebutuhan. Perilaku ini dapat diubah dengan memodifikasi properti <code translate="no">ollama.autopull_models</code>.</p>
<p>Bagaimanapun, jika Anda ingin menarik model secara manual, jalankan perintah berikut:</p>
<pre><code translate="no" class="language-shell">$ ollama pull llama3.1
$ ollama pull nomic-embed-text
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat secara opsional mengubah ke model favorit Anda di file <code translate="no">settings-ollama.yaml</code> dan menariknya secara manual.</p>
<h2 id="Change-Milvus-Settings" class="common-anchor-header">Mengubah Pengaturan Milvus<button data-href="#Change-Milvus-Settings" class="anchor-icon" translate="no">
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
    </button></h2><p>Dalam file <code translate="no">settings-ollama.yaml</code>, atur vectorstore ke milvus:</p>
<pre><code translate="no" class="language-yaml">vectorstore:
  database: milvus
<button class="copy-code-btn"></button></code></pre>
<p>Anda juga dapat menambahkan beberapa konfigurasi cumstom Milvus untuk menentukan pengaturan Anda. seperti ini:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">milvus</span>:
  <span class="hljs-attr">uri</span>: <span class="hljs-attr">http</span>:<span class="hljs-comment">//localhost:19530</span>
  <span class="hljs-attr">collection_name</span>: my_collection
<button class="copy-code-btn"></button></code></pre>
<p>Opsi konfigurasi yang tersedia adalah:</p>
<table>
<thead>
<tr><th>Opsi Bidang</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td>uri</td><td>Default diatur ke "local_data/private_gpt/milvus/milvus_local.db" sebagai file lokal; Anda juga dapat mengatur server Milvus yang lebih berkinerja di docker atau k8s, misalnya http://localhost:19530, sebagai uri Anda; Untuk menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, sesuaikan uri dan token dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint dan API key</a> di Zilliz Cloud.</td></tr>
<tr><td>token</td><td>Pasangkan dengan server Milvus di docker atau k8s atau kunci api zilliz cloud.</td></tr>
<tr><td>nama_koleksi</td><td>Nama koleksi, setel ke default "milvus_db".</td></tr>
<tr><td>overwrite</td><td>Menimpa data dalam koleksi jika sudah ada, setel ke default sebagai True.</td></tr>
</tbody>
</table>
<h2 id="Start-PrivateGPT" class="common-anchor-header">Memulai PrivateGPT<button data-href="#Start-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah semua pengaturan selesai, Anda dapat menjalankan PrivateGPT dengan Gradio UI.</p>
<pre><code translate="no" class="language-shell">PGPT_PROFILES=ollama <span class="hljs-built_in">make</span> run
<button class="copy-code-btn"></button></code></pre>
<p>UI akan tersedia di <code translate="no">http://0.0.0.0:8001</code>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/private_gpt_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Anda bisa bermain-main dengan UI dan mengajukan pertanyaan tentang dokumen Anda.</p>
<p>Untuk detail lebih lanjut, silakan lihat dokumentasi resmi <a href="https://docs.privategpt.dev/">PrivateGPT</a>.</p>
