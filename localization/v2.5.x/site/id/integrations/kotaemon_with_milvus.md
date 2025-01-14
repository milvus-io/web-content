---
id: kotaemon_with_milvus.md
summary: >-
  Tutorial ini akan memandu Anda tentang cara menyesuaikan aplikasi kotaemon
  Anda menggunakan Milvus.
title: Kotaemon RAG dengan Milvus
---
<h1 id="Kotaemon-RAG-with-Milvus" class="common-anchor-header">Kotaemon RAG dengan Milvus<button data-href="#Kotaemon-RAG-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/Cinnamon/kotaemon">Kotaemon</a> adalah UI RAG yang bersih dan dapat disesuaikan dari sumber terbuka untuk mengobrol dengan dokumen Anda. Dibangun dengan mempertimbangkan pengguna akhir dan pengembang.</p>
<p>Kotaemon menyediakan web-UI QA dokumen multi-pengguna yang dapat disesuaikan dan mendukung LLM lokal dan berbasis API. Menawarkan pipeline RAG hibrida dengan pengambilan teks dan vektor lengkap, QA multi-modal untuk dokumen dengan gambar dan tabel, dan kutipan tingkat lanjut dengan pratinjau dokumen. Ini mendukung metode penalaran yang kompleks seperti ReAct dan ReWOO, dan menyediakan pengaturan yang dapat dikonfigurasi untuk pengambilan dan pembuatan.</p>
<p>Tutorial ini akan memandu Anda tentang cara menyesuaikan aplikasi kotaemon Anda menggunakan <a href="https://milvus.io/">Milvus</a>.</p>
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
    </button></h2><h3 id="Installation" class="common-anchor-header">Instalasi</h3><p>Kami merekomendasikan untuk menginstal kotaemon dengan cara ini:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># optional (setup env)</span>
conda create -n kotaemon python=3.10
conda activate kotaemon

git <span class="hljs-built_in">clone</span> https://github.com/Cinnamon/kotaemon
<span class="hljs-built_in">cd</span> kotaemon

pip install -e <span class="hljs-string">&quot;libs/kotaemon[all]&quot;</span>
pip install -e <span class="hljs-string">&quot;libs/ktem&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Selain cara ini, ada beberapa cara lain untuk menginstal kotaemon. Anda dapat merujuk pada <a href="https://github.com/Cinnamon/kotaemon?tab=readme-ov-file#installation">dokumentasi resmi</a> untuk informasi lebih lanjut.</p>
<h3 id="Set-Milvus-as-the-default-vector-storage" class="common-anchor-header">Mengatur Milvus sebagai penyimpanan vektor default</h3><p>Untuk mengubah penyimpanan vektor default menjadi Milvus, Anda harus memodifikasi berkas <code translate="no">flowsettings.py</code> dengan mengganti <code translate="no">KH_VECTORSTORE</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;__type__&quot;</span>: <span class="hljs-string">&quot;kotaemon.storages.MilvusVectorStore&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Environment-Variables" class="common-anchor-header">Mengatur Variabel Lingkungan</h3><p>Anda dapat mengonfigurasi model melalui file <code translate="no">.env</code> dengan informasi yang dibutuhkan untuk terhubung ke LLM dan model penyematan. misalnya OpenAI, Azure, Ollama, dll.</p>
<h3 id="Run-Kotaemon" class="common-anchor-header">Jalankan Kotaemon</h3><p>Setelah mengatur variabel lingkungan dan mengubah penyimpanan vektor, Anda dapat menjalankan kotaemon dengan menjalankan perintah berikut:</p>
<pre><code translate="no" class="language-shell">python app.py
<button class="copy-code-btn"></button></code></pre>
<p>Nama pengguna / kata sandi default adalah: <code translate="no">admin</code> / <code translate="no">admin</code></p>
<h2 id="Start-RAG-with-kotaemon" class="common-anchor-header">Memulai RAG dengan kotaemon<button data-href="#Start-RAG-with-kotaemon" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Add-your-AI-models" class="common-anchor-header">1. Menambahkan model AI Anda</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/kotaemon_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Pada tab <code translate="no">Resources</code>, Anda dapat menambahkan dan mengatur LLM dan model penyematan. Anda dapat menambahkan beberapa model dan mengaturnya sebagai aktif atau tidak aktif. Anda hanya perlu menyediakan setidaknya satu model. Anda juga dapat menyediakan beberapa model untuk memungkinkan peralihan di antara mereka.</p>
<h3 id="2-Upload-your-documents" class="common-anchor-header">2. Unggah dokumen Anda</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/kotaemon_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Untuk melakukan QA pada dokumen Anda, Anda perlu mengunggahnya ke aplikasi terlebih dahulu. Buka tab <code translate="no">File Index</code>, dan Anda dapat mengunggah dan mengelola dokumen khusus Anda.</p>
<p>Secara default, semua data aplikasi disimpan di folder <code translate="no">./ktem_app_data</code>. Data basis data Milvus disimpan di <code translate="no">./ktem_app_data/user_data/vectorstore</code>. Anda dapat mencadangkan atau menyalin folder ini untuk memindahkan instalasi Anda ke mesin yang baru.</p>
<h3 id="3-Chat-with-your-documents" class="common-anchor-header">3. Mengobrol dengan dokumen Anda</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/kotaemon_3.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Sekarang arahkan kembali ke tab <code translate="no">Chat</code>. Tab Obrolan terdiri dari 3 wilayah: Panel Pengaturan Percakapan, tempat Anda mengelola percakapan dan referensi file; Panel Obrolan untuk berinteraksi dengan chatbot; dan Panel Informasi, yang menampilkan bukti pendukung, skor kepercayaan, dan peringkat relevansi untuk jawaban.</p>
<p>Anda dapat memilih dokumen Anda di Panel Pengaturan Percakapan. Kemudian mulai saja RAG dengan dokumen Anda dengan mengetik pesan di kotak input dan kirimkan ke chatbot.</p>
<p>Jika Anda ingin mendalami cara menggunakan kotaemon, Anda bisa mendapatkan panduan lengkapnya dari <a href="https://cinnamon.github.io/kotaemon/usage/">dokumentasi resmi</a>.</p>
