---
id: use_milvus_in_docsgpt.md
summary: >-
  Dalam tutorial ini, kami akan menunjukkan kepada Anda cara menggunakan Milvus
  sebagai basis data vektor backend untuk DocsGPT.
title: Gunakan Milvus di DocsGPT
---
<h1 id="Use-Milvus-in-DocsGPT" class="common-anchor-header">Gunakan Milvus di DocsGPT<button data-href="#Use-Milvus-in-DocsGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/arc53/DocsGPT">DocsGPT</a> adalah solusi sumber terbuka tingkat lanjut yang menyederhanakan pencarian informasi dalam dokumentasi proyek dengan mengintegrasikan model GPT yang kuat. Hal ini memungkinkan pengembang untuk mendapatkan jawaban yang akurat atas pertanyaan mereka tentang proyek dengan mudah, menghilangkan pencarian manual yang memakan waktu.</p>
<p>Dalam tutorial ini, kami akan menunjukkan kepada Anda cara menggunakan Milvus sebagai basis data vektor backend untuk DocsGPT.</p>
<div class="alert note">
<p>Tutorial ini terutama mengacu pada panduan instalasi resmi <a href="https://github.com/arc53/DocsGPT?tab=readme-ov-file#quickstart">DocsGPT</a>. Jika Anda menemukan bahwa tutorial ini memiliki bagian yang sudah usang, Anda dapat memprioritaskan untuk mengikuti panduan resmi dan mengajukan pertanyaan kepada kami.</p>
</div>
<h2 id="Requirements" class="common-anchor-header">Persyaratan<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Pastikan Anda telah menginstal <a href="https://docs.docker.com/engine/install/">Docker</a> </p>
<h2 id="Clone-the-repository" class="common-anchor-header">Kloning repositori<button data-href="#Clone-the-repository" class="anchor-icon" translate="no">
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
    </button></h2><p>Kloning repositori dan arahkan ke sana:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/arc53/DocsGPT.git</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> DocsGPT</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-dependency" class="common-anchor-header">Tambahkan ketergantungan<button data-href="#Add-dependency" class="anchor-icon" translate="no">
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
    </button></h2><p>Tambahkan ketergantungan <code translate="no">langchain-milvus</code> ke berkas <code translate="no">requirements.txt</code> di bawah folder <code translate="no">application</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;\nlangchain-milvus==0.1.6&quot;</span> &gt;&gt; ./application/requirements.txt</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-environment-variables" class="common-anchor-header">Mengatur variabel lingkungan<button data-href="#Set-environment-variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Tambahkan <code translate="no">VECTOR_STORE=milvus</code>, <code translate="no">MILVUS_URI=...</code>, <code translate="no">MILVUS_TOKEN=...</code> ke variabel lingkungan untuk layanan <code translate="no">backend</code> dan <code translate="no">worker</code> di berkas <code translate="no">docker-compose.yaml</code>, seperti ini:</p>
<pre><code translate="no" class="language-yaml">  <span class="hljs-attr">backend:</span>
    <span class="hljs-attr">build:</span> <span class="hljs-string">./application</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">VECTOR_STORE=milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MILVUS_URI=...</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MILVUS_TOKEN=...</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-yaml">  <span class="hljs-attr">worker:</span>
    <span class="hljs-attr">build:</span> <span class="hljs-string">./application</span>
    <span class="hljs-attr">command:</span> <span class="hljs-string">celery</span> <span class="hljs-string">-A</span> <span class="hljs-string">application.app.celery</span> <span class="hljs-string">worker</span> <span class="hljs-string">-l</span> <span class="hljs-string">INFO</span> <span class="hljs-string">-B</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">VECTOR_STORE=milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MILVUS_URI=...</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MILVUS_TOKEN=...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk <code translate="no">MILVUS_URI</code> dan <code translate="no">MILVUS_TOKEN</code>, Anda dapat menggunakan layanan <a href="https://zilliz.com/cloud">Zilliz Cloud</a> yang dikelola sepenuhnya (Direkomendasikan) atau layanan Milvus yang dimulai secara manual.</p>
<ul>
<li><p>Untuk layanan Zillz Cloud yang dikelola sepenuhnya: Kami merekomendasikan untuk menggunakan layanan Zilliz Cloud. Anda dapat mendaftar untuk mendapatkan akun uji coba gratis di <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Setelah itu, Anda akan mendapatkan <code translate="no">MILVUS_URI</code> dan <code translate="no">MILVUS_TOKEN</code>, yang sesuai dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint dan API key</a>.</p></li>
<li><p>Untuk memulai layanan Milvus secara manual: Jika Anda ingin menyiapkan layanan Milvus, Anda dapat mengikuti <a href="https://milvus.io/docs/install_standalone-docker-compose.md">dokumentasi resmi Milvus</a> untuk menyiapkan server Milvus, dan kemudian mendapatkan <code translate="no">MILVUS_URI</code> dan <code translate="no">MILVUS_TOKEN</code> dari server. <code translate="no">MILVUS_URI</code> dan <code translate="no">MILVUS_TOKEN</code> harus dalam format <code translate="no">http://&lt;your_server_ip&gt;:19530</code> dan <code translate="no">&lt;your_username&gt;:&lt;your_password&gt;</code>.</p></li>
</ul>
<h2 id="Start-the-services" class="common-anchor-header">Memulai layanan<button data-href="#Start-the-services" class="anchor-icon" translate="no">
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
    </button></h2><p>Jalankan: <code translate="no">./setup.sh</code></p>
<p>Kemudian arahkan ke http://localhost:5173/.</p>
<p>Anda dapat bermain-main dengan UI dan mengajukan pertanyaan tentang dokumen Anda.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/doscgpt_ui.png" alt="alt text" class="doc-image" id="alt-text" />
   </span> <span class="img-wrapper"> <span>alt text</span> </span></p>
<p>Jika Anda ingin menghentikan layanan, jalankan:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose down</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk detail lebih lanjut dan pengaturan yang lebih lanjut, silakan lihat dokumentasi resmi <a href="https://github.com/arc53/DocsGPT">DocsGPT</a>.</p>
