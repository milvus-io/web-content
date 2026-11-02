---
id: quickstart_with_attu.md
summary: >-
  Gunakan Attu Desktop dan Python untuk membuat koleksi Milvus, memasukkan
  embedding teks, dan memeriksa hasil pencarian vektor.
title: Panduan Cepat Menggunakan Attu — Antarmuka Web Milvus
---
<h1 id="Quick-Start-with-Attu---the-Web-UI-of-Milvus" class="common-anchor-header">Panduan Cepat Menggunakan Attu — Antarmuka Web Milvus<button data-href="#Quick-Start-with-Attu---the-Web-UI-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="1-Introduction" class="common-anchor-header">1. Pengantar<button data-href="#1-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/attu">Attu</a> adalah alat administrasi untuk Milvus. Alat ini dilengkapi dengan antarmuka pengguna grafis (GUI) yang intuitif, sehingga Anda dapat berinteraksi dengan basis data Anda dengan mudah. Hanya dengan beberapa klik, Anda dapat memvisualisasikan status kluster, mengelola metadata, menjalankan kueri data, dan banyak lagi.</p>
<hr>
<h2 id="Prerequisites" class="common-anchor-header">Persyaratan<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum memulai, siapkan hal-hal berikut:</p>
<ul>
<li>Server Milvus yang sedang berjalan dan dapat diakses oleh Attu serta lingkungan Python Anda. Tutorial ini menggunakan Milvus Standalone di <code translate="no">http://localhost:19530</code>, bukan file Milvus Lite lokal <code translate="no">.db</code>.</li>
<li>Rilis Attu yang kompatibel dengan server Anda. Attu 3.0 mendukung Milvus 2.6.0 dan yang lebih baru, termasuk Milvus 3.x; gunakan <a href="https://github.com/zilliztech/attu#compatibility">tabel kompatibilitas</a> untuk server yang lebih lama.</li>
<li>Lingkungan Python dengan versi PyMilvus yang kompatibel dengan server Anda. Lihat <a href="/docs/id/install-pymilvus.md">Instal Milvus Python SDK</a> dan <a href="/docs/id/release_notes.md">Catatan Rilis</a>. Untuk versi SDK yang digunakan di cabang dokumentasi ini, instal dependensi model extra dan progress-bar:</li>
</ul>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[model]==3.0.2&quot;</span> tqdm
<button class="copy-code-btn"></button></code></pre>
<p>Langkah-langkah persiapan data juga menggunakan <code translate="no">wget</code> dan <code translate="no">unzip</code>. Fungsi embedding mengunduh modelnya saat pertama kali digunakan, jadi izinkan akses jaringan ke host model atau siapkan cache model terlebih dahulu. Tangkapan layar menggambarkan alur kerja; label dan tata letak dapat berbeda antar rilis Attu.</p>
<h2 id="2-Install-Desktop-Application" class="common-anchor-header">2. Instal Aplikasi Desktop<button data-href="#2-Install-Desktop-Application" class="anchor-icon" translate="no">
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
    </button></h2><p>Unduh versi desktop Attu dengan mengunjungi <a href="https://github.com/zilliztech/attu/releases">halaman Rilis GitHub Attu</a>. Pilih versi yang sesuai untuk sistem operasi Anda dan ikuti langkah-langkah pemasangan.</p>
<h3 id="Note-for-macOS-M-series-chip" class="common-anchor-header">Catatan untuk macOS (chip seri M):<button data-href="#Note-for-macOS-M-series-chip" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika Anda menemui kesalahan:</p>
<pre><code translate="no">attu.app <span class="hljs-keyword">is</span> damaged <span class="hljs-keyword">and</span> cannot be opened.
<button class="copy-code-btn"></button></code></pre>
<p>Jalankan perintah berikut di terminal untuk mengatasi masalah ini:</p>
<pre><code translate="no"><span class="hljs-built_in">sudo</span> xattr -rd com.apple.quarantine /Applications/attu.app
<button class="copy-code-btn"></button></code></pre>
<hr>
<h2 id="3-Connect-to-Milvus" class="common-anchor-header">3. Terhubung ke Milvus<button data-href="#3-Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu mendukung koneksi ke <strong>Milvus Standalone</strong> dan <strong>Zilliz Cloud</strong>, sehingga memberikan fleksibilitas untuk bekerja dengan basis data lokal atau yang dihosting di cloud.</p>
<p>Untuk menggunakan Milvus Standalone secara lokal:</p>
<ol>
<li>Jalankan Milvus Standalone dengan mengikuti <a href="https://milvus.io/docs/install_standalone-docker.md">panduan instalasi Milvus</a>.</li>
<li>Buka Attu dan masukkan informasi koneksi:
<ul>
<li>Alamat Milvus: URI server Milvus Standalone Anda, misalnya http://localhost:19530</li>
<li>Pengaturan opsional lainnya: Anda dapat menyesuaikannya sesuai konfigurasi Milvus Anda atau membiarkannya sebagai pengaturan default.</li>
</ul></li>
<li>Klik "Connect" untuk mengakses basis data Anda.</li>
</ol>
<blockquote>
<p>Anda juga dapat menghubungkan Milvus yang dikelola sepenuhnya di <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Cukup atur " <code translate="no">Milvus Address</code> " dan " <code translate="no">token</code> " ke " <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint" dan "API key</a> " dari instance Zilliz Cloud Anda.</p>
</blockquote>
<p align="center">
  <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/attu_login_page.png" alt="Attu Login Page" width="80%">
</p>
<hr>
<h2 id="4-Prepare-Data-Create-Collection-and-Insert-Data" class="common-anchor-header">4. Siapkan Data, Buat Koleksi, dan Masukkan Data<button data-href="#4-Prepare-Data-Create-Collection-and-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="41-Prepare-the-Data" class="common-anchor-header">4.1 Siapkan Data<button data-href="#41-Prepare-the-Data" class="anchor-icon" translate="no">
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
    </button></h3><p>Kami menggunakan halaman FAQ dari <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">arsip Milvus Documentation 2.4.x</a> yang tetap sebagai teks contoh. Arsip ini adalah kumpulan data pengambilan, bukan versi server atau SDK yang akan diinstal.</p>
<h4 id="Download-and-Extract-Data" class="common-anchor-header">Unduh dan Ekstrak Data:</h4><pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip
unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<h4 id="Process-Markdown-Files" class="common-anchor-header">Proses Berkas Markdown:</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []
<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>, encoding=<span class="hljs-string">&quot;utf-8&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()
    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> text_lines:
    <span class="hljs-keyword">raise</span> RuntimeError(<span class="hljs-string">&quot;No FAQ files found. Check the extracted milvus_docs/en/faq directory.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="42-Generate-Embeddings" class="common-anchor-header">4.2 Menghasilkan Embedding<button data-href="#42-Generate-Embeddings" class="anchor-icon" translate="no">
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
    </button></h3><p>Tentukan model embedding untuk menghasilkan embedding teks menggunakan <code translate="no">milvus_model</code>. Kami menggunakan model <code translate="no">DefaultEmbeddingFunction</code> sebagai contoh, yang merupakan model embedding yang telah dilatih sebelumnya dan ringan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model <span class="hljs-keyword">as</span> milvus_model

embedding_model = milvus_model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Generate test embedding</span>
test_embedding = embedding_model.encode_queries([<span class="hljs-string">&quot;This is a test&quot;</span>])[<span class="hljs-number">0</span>]
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<h4 id="Output" class="common-anchor-header">Hasil:</h4><pre><code translate="no">768
[-0.04836066  0.07163023 -0.01130064 -0.03789345 -0.03320649 -0.01318448
 -0.03041712 -0.02269499 -0.02317863 -0.00426028]
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="43-Create-Collection" class="common-anchor-header">4.3 Buat Koleksi<button data-href="#43-Create-Collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Hubungkan Python ke titik akhir Milvus dan basis data yang sama dengan yang Anda pilih di Attu. Jika otentikasi diaktifkan, konfigurasikan kredensial yang sesuai di kedua klien. Buat koleksi:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;attu_tutorial&quot;</span>

<span class="hljs-comment"># Drop the tutorial collection if it exists so the steps can be rerun from the top.</span>
<span class="hljs-comment"># Choose a different collection_name if &quot;attu_tutorial&quot; already holds data you want to keep.</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection</span>
client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/tune_consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="44-Insert-Data" class="common-anchor-header">4.4 Masukkan Data<button data-href="#44-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h3><p>Lakukan iterasi melalui baris-baris teks, buat embedding, dan masukkan data ke Milvus:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []
doc_embeddings = embedding_model.encode_documents(text_lines)

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: doc_embeddings[i], <span class="hljs-string">&quot;text&quot;</span>: line})

client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="45-Visualize-Data-and-Schema" class="common-anchor-header">4.5 Visualisasi Data dan Skema<button data-href="#45-Visualize-Data-and-Schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Di Attu, segarkan daftar koleksi dan buka <code translate="no">attu_tutorial</code>. Skema pengaturan cepat mencakup kunci utama " <code translate="no">id</code> " dan bidang " <code translate="no">vector</code> " dengan dimensi " <code translate="no">embedding_dim</code>", serta metrik " <code translate="no">Inner Product (IP)</code> ". Nilai " <code translate="no">text</code> " disimpan di bidang dinamis. Lihat <a href="/docs/id/create-collection.md">Buat Koleksi</a> dan <a href="/docs/id/enable-dynamic-field.md">Bidang Dinamis</a> untuk opsi skema yang eksplisit. Jumlah entitas bergantung pada teks sampel yang diekstraksi, jadi gunakan jumlah baris yang Anda sisipkan, bukan angka yang tertera pada tangkapan layar.</p>
<p>Selain itu, kita dapat melihat data yang disisipkan, termasuk ID, embedding vektor, dan bidang dinamis yang menyimpan metadata seperti konten teks. Antarmuka ini mendukung penyaringan dan pencarian berdasarkan kondisi yang ditentukan atau bidang dinamis.</p>
<p align="center">
  <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/attu_after_data_insertion_1.png" alt="Schema View" width="45%" />
  <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/attu_after_data_insertion_2.png" alt="Data View" width="45%" />
</p>
<h2 id="5-Visualizing-Search-Results-and-Relationships" class="common-anchor-header">5. Memvisualisasikan Hasil Pencarian dan Hubungan<button data-href="#5-Visualizing-Search-Results-and-Relationships" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu menyediakan antarmuka yang kuat untuk memvisualisasikan dan menjelajahi hubungan data. Untuk memeriksa titik data yang dimasukkan dan hubungan kesamaannya, ikuti langkah-langkah berikut:</p>
<h3 id="51-Perform-a-Search" class="common-anchor-header">5.1 <strong>Lakukan Pencarian</strong><button data-href="#51-Perform-a-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>Buka tab <strong>Pencarian Vektor</strong> di Attu.</p>
<ol>
<li>Klik tombol <strong>Generate Random Data</strong> untuk membuat kueri uji.</li>
<li>Klik " <strong>Search</strong> " untuk mengambil hasil berdasarkan data yang dihasilkan.</li>
</ol>
<p>Hasilnya ditampilkan dalam tabel, yang menunjukkan ID, skor kemiripan, dan bidang dinamis untuk setiap entitas yang cocok. Vektor acak menguji alur kerja pencarian, bukan relevansi semantik. Untuk kueri teks yang bermakna, enkode kueri tersebut dengan fungsi " <code translate="no">embedding_model.encode_queries()</code> " yang sama yang digunakan untuk koleksi ini, lalu lakukan pencarian dengan vektor tersebut. Lihat <a href="/docs/id/single-vector-search.md">"Single-Vector Search</a> " untuk contoh dalam Python.</p>
<p align="center">
  <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/attu_searched_table.png" alt="Search Results Table" width="80%">
</p>
<hr>
<h3 id="52-Explore-Data-Relationships" class="common-anchor-header">5.2 <strong>Jelajahi Hubungan Data</strong><button data-href="#52-Explore-Data-Relationships" class="anchor-icon" translate="no">
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
    </button></h3><p>Klik tombol <strong>Jelajahi</strong> di panel hasil untuk memvisualisasikan hubungan antara vektor kueri dan hasil pencarian dalam <strong>struktur mirip grafik pengetahuan</strong>.</p>
<ul>
<li><strong>Simpul pusat</strong> mewakili vektor pencarian.</li>
<li><strong>Simpul</strong> yang <strong>terhubung</strong> mewakili hasil pencarian; mengkliknya akan menampilkan informasi terperinci dari simpul yang bersangkutan.</li>
</ul>
<p align="center">
  <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/attu_searched_graph.png" alt="Knowledge Graph Visualization" width="80%">
</p>
<hr>
<h3 id="53-Expand-the-Graph" class="common-anchor-header">5.3 <strong>Perluas Grafik</strong><button data-href="#53-Expand-the-Graph" class="anchor-icon" translate="no">
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
    </button></h3><p>Klik ganda pada simpul hasil mana pun untuk memperluas koneksinya. Tindakan ini akan menampilkan hubungan tambahan antara simpul yang dipilih dan titik data lain dalam koleksi, sehingga menciptakan <strong>grafik pengetahuan yang lebih besar dan saling terhubung</strong>.</p>
<p>Tampilan yang diperluas ini memungkinkan eksplorasi lebih mendalam mengenai bagaimana titik-titik data saling terkait, berdasarkan kesamaan vektor.</p>
<p align="center">
  <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/attu_expanded_searched_graph.png" alt="Expanded Knowledge Graph" width="80%">
</p>
<hr>
<h2 id="6-Conclusion" class="common-anchor-header">6. Kesimpulan<button data-href="#6-Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu menyederhanakan pengelolaan dan visualisasi data vektor yang disimpan di Milvus. Mulai dari penyisipan data hingga eksekusi kueri dan eksplorasi interaktif, Attu menyediakan antarmuka intuitif untuk menangani tugas pencarian vektor yang kompleks. Dengan fitur seperti dukungan skema dinamis, visualisasi pencarian grafis, dan filter kueri yang fleksibel, Attu memberdayakan pengguna untuk menganalisis kumpulan data berskala besar secara efektif.</p>
<p>Dengan memanfaatkan alat eksplorasi visual Attu, pengguna dapat lebih memahami data mereka, mengidentifikasi hubungan tersembunyi, dan mengambil keputusan berdasarkan data. Mulailah menjelajahi kumpulan data Anda sendiri hari ini dengan Attu dan Milvus!</p>
<hr>
