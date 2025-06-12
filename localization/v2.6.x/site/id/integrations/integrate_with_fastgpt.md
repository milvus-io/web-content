---
id: integrate_with_fastgpt.md
summary: >-
  Tutorial ini akan memandu Anda tentang cara menerapkan aplikasi FastGPT
  eksklusif Anda sendiri dengan cepat menggunakan [Milvus] (https://milvus.io/).
title: Menerapkan FastGPT dengan Milvus
---
<h1 id="Deploying-FastGPT-with-Milvus" class="common-anchor-header">Menerapkan FastGPT dengan Milvus<button data-href="#Deploying-FastGPT-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://fastgpt.in/">FastGPT</a> adalah sistem tanya jawab berbasis pengetahuan yang dibangun di atas model bahasa besar LLM, yang menawarkan kemampuan siap pakai untuk pemrosesan data dan pemanggilan model. Selain itu, FastGPT memungkinkan orkestrasi alur kerja melalui visualisasi Flow, sehingga memfasilitasi skenario tanya jawab yang kompleks. Tutorial ini akan memandu Anda tentang cara menerapkan aplikasi FastGPT eksklusif Anda sendiri dengan cepat menggunakan <a href="https://milvus.io/">Milvus</a>.</p>
<h2 id="Download-docker-composeyml" class="common-anchor-header">Unduh docker-compose.yml<button data-href="#Download-docker-composeyml" class="anchor-icon" translate="no">
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
    </button></h2><p>Pastikan Anda telah menginstal <a href="https://docs.docker.com/compose/">Docker Compose</a>.<br>
Jalankan perintah di bawah ini untuk mengunduh berkas docker-compose.yml.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> fastgpt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> fastgpt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -O https://raw.githubusercontent.com/labring/FastGPT/main/projects/app/data/config.json</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">milvus version</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-milvus.yml</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">zilliz version</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-zilliz.yml</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Jika Anda menggunakan versi Zilliz, sesuaikan parameter tautan <code translate="no">MILVUS_ADDRESS</code> dan <code translate="no">MILVUS_TOKEN</code> dalam berkas docker-compose.yml, yang sesuai dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint dan kunci Api</a> di <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
</blockquote>
<h2 id="Launch-the-Container" class="common-anchor-header">Luncurkan Kontainer<button data-href="#Launch-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>Jalankan di direktori yang sama dengan docker-compose.yml. Pastikan bahwa versi docker-compose idealnya di atas 2.17, karena beberapa perintah otomatisasi mungkin tidak akan berfungsi jika tidak.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Launch the container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">Wait <span class="hljs-keyword">for</span> 10s, OneAPI typically needs to restart a few <span class="hljs-built_in">times</span> to initially connect to Mysql</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sleep</span> 10</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">Restart oneapi (Due to certain issues with the default Key of OneAPI, it will display <span class="hljs-string">&#x27;channel not found&#x27;</span> <span class="hljs-keyword">if</span> not restarted, this can be temporarily resolved by manually restarting once, <span class="hljs-keyword">while</span> waiting <span class="hljs-keyword">for</span> the author<span class="hljs-string">&#x27;s fix)</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-string">docker restart oneapi</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Access-OneAPI-to-Add-Models" class="common-anchor-header">Mengakses OneAPI untuk Menambahkan Model<button data-href="#Access-OneAPI-to-Add-Models" class="anchor-icon" translate="no">
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
    </button></h2><p>OneAPI dapat diakses di <code translate="no">ip:3001</code>. Nama pengguna default adalah root, dan kata sandinya 123456. Anda dapat mengubah kata sandi setelah masuk.<br>
Dengan menggunakan model OpenAI sebagai contoh, klik pada tab "Channel", dan pilih model obrolan dan model penyematan Anda di bawah "Models".<br>
Masukkan <a href="https://platform.openai.com/docs/quickstart">Kunci API OpenAI</a> Anda di bagian "Rahasia".<br>
Untuk penggunaan model di luar OpenAI, dan informasi lebih lanjut, silakan baca <a href="https://doc.fastgpt.in/docs/development/one-api/">One API</a>.</p>
<h2 id="Setting-Tokens" class="common-anchor-header">Mengatur Token<button data-href="#Setting-Tokens" class="anchor-icon" translate="no">
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
    </button></h2><p>Klik pada tab "Token". Secara default, ada token <code translate="no">Initial Root Token</code>. Anda juga dapat membuat token baru dan mengatur kuota sendiri.<br>
Klik "Salin" pada token Anda, pastikan bahwa nilai token ini sesuai dengan nilai <code translate="no">CHAT_API_KEY</code> yang ditetapkan dalam berkas docker-compose.yml.</p>
<h2 id="Accessing-FastGPT" class="common-anchor-header">Mengakses FastGPT<button data-href="#Accessing-FastGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>Saat ini, FastGPT dapat diakses langsung di <code translate="no">ip:3000</code> (harap perhatikan firewall). Nama pengguna login adalah root, dengan kata sandi yang diatur ke <code translate="no">DEFAULT_ROOT_PSW</code> di dalam variabel lingkungan docker-compose.yml. Jika Anda memerlukan akses nama domain, Anda perlu menginstal dan mengonfigurasi <a href="https://nginx.org/en/">Nginx</a> sendiri.</p>
<h2 id="Stop-the-Container" class="common-anchor-header">Menghentikan kontainer<button data-href="#Stop-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>Jalankan perintah berikut untuk menghentikan kontainer.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose down</span>
<button class="copy-code-btn"></button></code></pre>
