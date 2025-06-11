---
id: NLWeb_with_milvus.md
summary: >-
  Pelajari cara mengintegrasikan Microsoft NLWeb dengan Milvus untuk membangun
  antarmuka bahasa alami yang kuat untuk situs web. Tutorial ini
  mendemonstrasikan cara memanfaatkan kemampuan basis data vektor Milvus untuk
  pencarian semantik yang efisien, penyimpanan yang disematkan, dan pengambilan
  konteks dalam aplikasi NLWeb.
title: Menggunakan NLWeb dengan Milvus
---
<h1 id="Using-NLWeb-with-Milvus" class="common-anchor-header">Menggunakan NLWeb dengan Milvus<button data-href="#Using-NLWeb-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/microsoft/NLWeb">NLWeb dari Microsoft</a> adalah sebuah kerangka kerja yang diusulkan yang memungkinkan antarmuka bahasa alami untuk situs web, menggunakan <a href="https://schema.org/">Schema.org</a>, format seperti RSS dan protokol MCP yang sedang berkembang.</p>
<p><a href="https://milvus.io/">Milvus</a> didukung sebagai backend basis data vektor dalam NLWeb untuk menyematkan penyimpanan dan pencarian kemiripan vektor yang efisien, sehingga memungkinkan pengambilan konteks yang kuat untuk aplikasi pemrosesan bahasa alami.</p>
<blockquote>
<p>Dokumentasi ini terutama didasarkan pada dokumentasi <a href="https://github.com/microsoft/NLWeb/blob/main/HelloWorld.md">mulai cepat</a> resmi. Jika Anda menemukan konten yang ketinggalan zaman atau tidak konsisten, mohon untuk memprioritaskan dokumentasi resmi dan jangan ragu untuk mengajukan masalah kepada kami.</p>
</blockquote>
<h2 id="Usage" class="common-anchor-header">Penggunaan<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>NLWeb dapat dikonfigurasi untuk menggunakan Milvus sebagai mesin pencari. Di bawah ini adalah panduan tentang cara mengatur dan menggunakan NLWeb dengan Milvus.</p>
<h3 id="Installation" class="common-anchor-header">Instalasi</h3><p>Kloning repo dan siapkan lingkungan Anda:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/microsoft/NLWeb
<span class="hljs-built_in">cd</span> NLWeb
python -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate  <span class="hljs-comment"># or `.venv\Scripts\activate` on Windows</span>
<span class="hljs-built_in">cd</span> code
pip install -r requirements.txt
pip install pymilvus  <span class="hljs-comment"># Add Milvus Python client</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-Milvus" class="common-anchor-header">Mengkonfigurasi Milvus</h3><p>Untuk menggunakan <strong>Milvus</strong>, perbarui konfigurasi Anda.</p>
<h4 id="Update-config-files-in-codeconfig" class="common-anchor-header">Perbarui berkas konfigurasi di <code translate="no">code/config</code></h4><p>Buka berkas <code translate="no">config_retrieval.yaml</code> dan tambahkan konfigurasi Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">preferred_endpoint:</span> <span class="hljs-string">milvus_local</span>

<span class="hljs-attr">endpoints:</span>
  <span class="hljs-attr">milvus_local:</span>
    <span class="hljs-attr">database_path:</span> <span class="hljs-string">&quot;../data/milvus.db&quot;</span>
    <span class="hljs-comment"># Set the collection name to use</span>
    <span class="hljs-attr">index_name:</span> <span class="hljs-string">nlweb_collection</span>
    <span class="hljs-comment"># Specify the database type</span>
    <span class="hljs-attr">db_type:</span> <span class="hljs-string">milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Loading-Data" class="common-anchor-header">Memuat Data</h3><p>Setelah dikonfigurasi, muat konten Anda menggunakan umpan RSS.</p>
<p>Dari direktori <code translate="no">code</code>:</p>
<pre><code translate="no" class="language-bash">python -m tools.db_load https://feeds.libsyn.com/121695/rss Behind-the-Tech
<button class="copy-code-btn"></button></code></pre>
<p>Ini akan memasukkan konten ke dalam koleksi Milvus Anda, menyimpan data teks dan penyematan vektor.</p>
<h3 id="Running-the-Server" class="common-anchor-header">Menjalankan Server</h3><p>Untuk memulai NLWeb, dari direktori <code translate="no">code</code>, jalankan:</p>
<pre><code translate="no" class="language-bash">python app-file.py
<button class="copy-code-btn"></button></code></pre>
<p>Anda sekarang dapat meminta konten Anda melalui bahasa alami menggunakan UI web di http://localhost:8000/ atau secara langsung melalui REST API yang kompatibel dengan MCP.</p>
<h2 id="Further-Reading" class="common-anchor-header">Bacaan Lebih Lanjut<button data-href="#Further-Reading" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><a href="https://milvus.io/docs">Dokumentasi Milvus</a></li>
<li><a href="https://github.com/microsoft/NLWeb">Sumber NLWeb</a></li>
<li>Kehidupan sebuah Kueri Obrolan</li>
<li>Memodifikasi perilaku dengan mengubah permintaan</li>
<li>Memodifikasi aliran kontrol</li>
<li>Memodifikasi antarmuka pengguna</li>
</ul>
