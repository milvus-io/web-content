---
id: milvus_lite.md
summary: >-
  Instal Milvus Lite dan jalankan pencarian vektor lokal dengan jalur basis data
  yang tetap.
title: Menjalankan Milvus Lite Secara Lokal
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">Menjalankan Milvus Lite Secara Lokal<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>Halaman ini menjelaskan cara menjalankan pencarian vektor lokal dengan Milvus Lite. Halaman ini mencakup instalasi, penyimpanan data, penyaringan, dan ekspor data ke deployment Milvus lainnya.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite adalah backend lokal yang ringan untuk <a href="https://github.com/milvus-io/pymilvus">Milvus Python SDK</a>. Instal dengan tambahan opsional <code translate="no">milvus-lite</code>; menginstal <code translate="no">pymilvus</code> saja tidak akan menginstal backend ini pada versi SDK yang digunakan di bawah ini.</p>
<p>Milvus Lite cocok untuk pengembangan lokal dan beban kerja skala kecil di lingkungan seperti:</p>
<ul>
<li>Jupyter Notebook atau Google Colab</li>
<li>Laptop</li>
<li>Perangkat tepi dengan dependensi Python yang kompatibel</li>
</ul>
<p>Milvus Lite menggunakan API <code translate="no">MilvusClient</code> untuk operasi yang didukung, termasuk penyimpanan data vektor, penambahan dan penghapusan, pencarian vektor, serta penyaringan metadata. Untuk memindahkan alur kerja aplikasi yang didukung ke deployment jarak jauh, ubah URI koneksi dan kredensial, serta tinjau perbedaan fitur yang didukung. Untuk beban kerja produksi berskala besar, gunakan <a href="/docs/id/install-overview.md">Milvus Standalone atau Distributed</a>, atau Milvus yang dikelola sepenuhnya di <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
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
    </button></h2><p>Panduan ini menggunakan PyMilvus <strong>3.0.2</strong> dan Milvus Lite <strong>3.2.2</strong>. Siapkan lingkungan berikut:</p>
<ul>
<li>Python 3.10 atau yang lebih baru. Backend Lite lokal memiliki versi Python minimum yang lebih tinggi daripada klien PyMilvus jarak jauh.</li>
<li>macOS, Linux, atau Windows, dengan wheel yang kompatibel untuk dependensi seperti <code translate="no">faiss-cpu</code> dan <code translate="no">pyarrow</code>. Milvus Lite 3.2.2 adalah paket Python murni, sehingga sistem operasi dan arsitektur harus memenuhi dependensi tersebut, bukan paket Lite itu sendiri.</li>
<li>Direktori lokal yang dapat ditulis untuk penyimpanan basis data.</li>
</ul>
<p>Di Windows, pip melewatkan paket tambahan <code translate="no">milvus-lite</code> dari PyMilvus 3.0.2 karena penanda platformnya, sehingga <code translate="no">milvus-lite</code> harus disebutkan secara eksplisit. Perintah instalasi di bawah ini sudah melakukannya. Untuk kombinasi paket dan platform lainnya, lihat <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#requirements">persyaratan rilis Milvus Lite</a>.</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">Siapkan Milvus Lite<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Buat lingkungan Python yang terisolasi dan instal kedua paket tersebut:</p>
<pre><code translate="no" class="language-bash">python3 -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate
python -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Beri tanda kutip pada ekspresi ekstra agar shell seperti zsh tidak menafsirkan tanda kurung. Di Windows PowerShell, aktifkan lingkungan dengan <code translate="no">.venv\Scripts\Activate.ps1</code>, bukan <code translate="no">source .venv/bin/activate</code>. Versi yang disebutkan secara eksplisit menjaga agar SDK dan backend lokal tetap selaras dengan panduan ini.</p>
<div class="alert note">
<blockquote>
<p>Milvus Lite 3.x menggunakan mesin penyimpanan yang berbeda dari paket 2.x asli. Milvus Lite 3.x tidak dapat membuka file <code translate="no">.db</code> 2.x yang sudah ada secara langsung. Simpan database asli dan lingkungan yang dapat membukanya, ekspor datanya ke sana, lalu impor data tersebut ke database baru. Menginstal paket baru tidak akan memigrasikan format penyimpanan lama. Lihat <a href="#Migrating-data-from-Milvus-Lite">Migrasi data dari Milvus Lite</a>.</p>
</blockquote>
</div>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">Terhubung ke Milvus Lite<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Berikan jalur lokal yang berakhir dengan <code translate="no">.db</code> ke <code translate="no">MilvusClient</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk Milvus Lite 3.2.2, ini akan membuat <strong>direktori milvus_demo.db</strong> di direktori kerja. Direktori tersebut berisi berkas-berkas penyimpanan basis data; akhiran <code translate="no">.db</code> tidak berarti bahwa itu adalah satu berkas portabel. Gunakan kembali jalur yang sama untuk membuka kembali basis data setelah menutup klien atau memulai ulang aplikasi.</p>
<p>Gunakan jalur yang berbeda untuk basis data baru. Untuk terhubung ke server Milvus jarak jauh, masukkan titik akhir (endpoint) dan kredensialnya:</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;username:password&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Run-a-local-search-example" class="common-anchor-header">Jalankan contoh pencarian lokal<button data-href="#Run-a-local-search-example" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh berikut menunjukkan alur kerja API dengan vektor yang dihasilkan. Vektor-vektor ini tidak mengkodekan makna teks; gunakan model embedding saat membangun pencarian semantik. Jalankan contoh ini pada jalur basis data baru, atau hapus <code translate="no">demo_collection</code> yang ada sebelum menjalankannya kembali.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors in this example have 384 dimensions.</span>
)

docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># Generate reproducible example vectors, not semantic embeddings.</span>
rng = np.random.default_rng(<span class="hljs-number">7</span>)
vectors = rng.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, size=(<span class="hljs-built_in">len</span>(docs), <span class="hljs-number">384</span>)).tolist()
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs))
]
res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Search only records whose subject is &quot;history&quot;.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Retrieve all records that match the scalar filter, without vector ranking.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete one record and keep the others for the export example below.</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">2</span>])
<span class="hljs-built_in">print</span>(res)
client.close()
<button class="copy-code-btn"></button></code></pre>
<p>Untuk aplikasi yang menghasilkan embedding dari teks, lanjutkan ke <a href="/docs/id/quickstart.md">Panduan Cepat</a>. Anda juga dapat menjelajahi <a href="https://github.com/milvus-io/bootcamp">contoh Milvus Bootcamp</a> untuk RAG, pencarian gambar, dan integrasi kerangka kerja.</p>
<h2 id="Supported-features-and-limits" class="common-anchor-header">Fitur dan batasan yang didukung<button data-href="#Supported-features-and-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite 3.2.2 mengimplementasikan sebagian operasi Milvus melalui adaptor PyMilvus lokalnya. <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#supported-features">Referensi fitur berversi</a> ini menjelaskan kemampuan berikut:</p>
<table>
<thead>
<tr><th>Area</th><th>Dukungan dalam versi Lite ini</th></tr>
</thead>
<tbody>
<tr><td>Vektor padat dan vektor jarang</td><td><code translate="no">FLOAT_VECTOR</code> dan <code translate="no">SPARSE_FLOAT_VECTOR</code></td></tr>
<tr><td>Indeks vektor</td><td><code translate="no">FLAT</code>, <code translate="no">BRUTE_FORCE</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, dan <code translate="no">AUTOINDEX</code></td></tr>
<tr><td>indeks skalar dan indeks langka</td><td><code translate="no">INVERTED</code> indeks skalar dan <code translate="no">SPARSE_INVERTED_INDEX</code></td></tr>
<tr><td>Operasi data</td><td>Sisipkan, perbarui atau sisipkan (upsert), ambil, kueri, pencarian vektor, dan hapus</td></tr>
<tr><td>Pencarian</td><td>Pencarian padat dan jarang, filter metadata, beberapa bidang vektor, dan pencarian hibrida</td></tr>
<tr><td>Pengorganisasian koleksi</td><td>Koleksi, basis data bernama, alias, dan partisi, dalam operasi yang didukung oleh adaptor lokal</td></tr>
</tbody>
</table>
<p>Versi ini tidak terbatas pada indeks <code translate="no">FLAT</code>. Ketersediaan dan perilaku indeks bergantung pada versi Lite; jangan menerapkan batasan dari backend 2.x asli ke mesin 3.x.</p>
<p>Tinjau batasan-batasan ini sebelum memilih Lite untuk suatu aplikasi:</p>
<ul>
<li>Hanya satu proses yang dapat memiliki direktori penyimpanan basis data pada satu waktu. Mesin melindungi direktori tersebut dengan kunci file.</li>
<li>Serialisasikan penulisan ke koleksi yang sama. Penulisan bersamaan tidak didukung dengan aman.</li>
<li>Adaptor lokal tidak mengimplementasikan semua RPC Milvus. Operasi yang tidak didukung akan mengembalikan ` <code translate="no">UNIMPLEMENTED</code>`; perubahan skema serta pemuatan atau pelepasan pada tingkat partisi tidak tersedia.</li>
<li>Otentikasi, pengguna, peran, RBAC, dan TLS tidak didukung. Jangan mengekspos server lokal ke jaringan yang tidak tepercaya.</li>
<li>Bidang vektor biner, float16, bfloat16, dan int8, serta indeks Kuantisasi Produk, tidak didukung.</li>
<li>Lite dirancang untuk beban kerja lokal. Kompatibilitas API lokal tidak menyediakan penskalaan terdistribusi atau isolasi produksi serta ketersediaan seperti pada penerapan jarak jauh.</li>
</ul>
<p>Lihat <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#known-limitations">batasan yang diketahui berdasarkan versi</a> sebelum mengandalkan fitur server yang tidak diuji dalam contoh lokal.</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">Migrasi data dari Milvus Lite<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan <code translate="no">milvus-lite dump</code> untuk mengekspor koleksi sebagai berkas JSON Milvus BulkWriter. Berkas-berkas ini dapat diimpor ke deployment Milvus yang dihosting sendiri atau Zilliz Cloud.</p>
<p>Instal dependensi bulk writer SDK di lingkungan yang membuka basis data sumber:</p>
<pre><code translate="no" class="language-bash">python -m pip install <span class="hljs-string">&quot;pymilvus[bulk_writer]==3.0.2&quot;</span>
milvus-lite dump -h
<button class="copy-code-btn"></button></code></pre>
<p>Tutup aplikasi Python yang mengelola basis data lokal sebelum menjalankan perintah di proses lain. Ekspor koleksi dari contoh sebelumnya:</p>
<pre><code translate="no" class="language-bash">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<button class="copy-code-btn"></button></code></pre>
<p>Perintah ini membaca <code translate="no">demo_collection</code> dari <strong>direktori penyimpanan milvus_demo.db</strong> dan menulis berkas ekspor di bawah <strong>data_dir</strong>. Impor berkas-berkas tersebut menggunakan <a href="/docs/id/import-data.md">Bulk Insert</a> atau <a href="https://docs.zilliz.com/docs/data-import">Zilliz Cloud Data Import</a>.</p>
<div class="alert note">
<blockquote>
<p>Untuk mengekspor berkas basis data 2.x asli, jalankan alat dump di lingkungan dengan versi Lite asli yang dapat membuka berkas tersebut. Alat dump 3.x tidak mengonversi format penyimpanan lama dengan membukanya secara langsung. Simpan basis data sumber hingga Anda memverifikasi jumlah baris yang diimpor dan hasil pencarian.</p>
</blockquote>
</div>
<p>Untuk opsi dump yang didukung dan batasan format penyimpanan, lihat <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#dump-data">referensi ekspor Milvus Lite</a>.</p>
<h2 id="Whats-next" class="common-anchor-header">Langkah selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Lanjutkan dengan tugas-tugas berikut:</p>
<ul>
<li><a href="/docs/id/quickstart.md">Panduan Cepat</a>: buat embedding dan jalankan alur kerja pencarian.</li>
<li><a href="/docs/id/single-vector-search.md">Pencarian Vektor Tunggal</a> dan <a href="/docs/id/multi-vector-search.md">Pencarian Hibrida</a>: rancang kueri untuk aplikasi Anda.</li>
<li><a href="/docs/id/install-overview.md">Pilih metode penerapan</a>: melangkah lebih jauh dari pengembangan lokal.</li>
<li><a href="https://github.com/zilliztech/attu">Attu</a>: jelajahi antarmuka pengguna Milvus untuk penerapan jarak jauh.</li>
</ul>
