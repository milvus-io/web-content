---
id: add-fields-to-an-existing-collection.md
title: Mengubah Skema Koleksi
summary: >-
  Ubah skema koleksi yang sudah ada dengan menambahkan atau menghapus bidang
  yang ditentukan pengguna atau Fungsi beserta bidang vektor yang dihasilkannya.
---
<h1 id="Alter-Collection-Schema" class="common-anchor-header">Mengubah Skema Koleksi<button data-href="#Alter-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>Saat sebuah koleksi berpindah dari tahap pengembangan ke produksi, skemanya sering kali berubah. Anda mungkin menambahkan bidang skalar seperti <code translate="no">source_uri</code> atau <code translate="no">review_status</code> untuk penyaringan dan logika aplikasi, menambahkan bidang vektor baru untuk embedding yang dihasilkan oleh aplikasi Anda, menambahkan Fungsi BM25 dan bidang vektor langka yang dihasilkannya untuk pencarian leksikal pada teks yang ada, atau menghapus bidang dan Fungsi yang tidak lagi digunakan. Fitur "Alter Collection Schema" memungkinkan Anda melakukan perubahan pada bidang dan Fungsi yang didukung secara langsung, tanpa perlu membuat ulang koleksi.</p>
<div class="alert note">
<p>Panduan ini mencakup perubahan skema untuk bidang yang didefinisikan pengguna dan untuk Fungsi beserta bidang vektor yang dihasilkannya dalam koleksi yang dikelola. Untuk menambahkan bidang ke koleksi eksternal, lihat " <a href="/docs/id/alter-external-collection-schema.md">Alter External Collection Schema"</a>. Untuk perubahan properti bidang, seperti mengubah " <code translate="no">max_length</code> " pada bidang " <code translate="no">VARCHAR</code> " atau " <code translate="no">max_capacity</code> " pada bidang " <code translate="no">ARRAY</code> ", lihat " <a href="/docs/id/alter-collection-field.md">Alter Collection Field</a>". Untuk perilaku bidang dinamis, lihat " <a href="/docs/id/enable-dynamic-field.md">Dynamic Field</a> " dan " <a href="/docs/id/modify-collection.md">Modify Collection</a>".</p>
</div>
<h2 id="Limits" class="common-anchor-header">Batasan<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Tambahkan bidang yang didefinisikan pengguna</strong></p>
<ul>
<li><p>Kolom yang didefinisikan pengguna yang ditambahkan harus dapat bernilai null. Tetapkan ` <code translate="no">nullable=True</code> ` saat memanggil ` <code translate="no">add_collection_field()</code>`. Untuk entitas yang sudah ada, kolom yang ditambahkan akan menjadi ` <code translate="no">NULL</code> ` kecuali Anda menambahkan kolom skalar dengan ` <code translate="no">default_value</code>`.</p></li>
<li><p>Penambahan bidang skalar yang didefinisikan pengguna didukung di Milvus 2.6.x dan versi selanjutnya. Penambahan bidang vektor yang didefinisikan pengguna didukung di Milvus 2.6.18 dan versi selanjutnya.</p></li>
<li><p>Penambahan bidang StructArray didukung di Milvus 3.0.0 dan versi yang lebih baru. Bidang StructArray yang ditambahkan harus dapat bernilai null.</p></li>
<li><p>Nama bidang harus unik di antara bidang-bidang dalam koleksi.</p></li>
</ul>
<p><strong>Menambahkan Fungsi dan bidang vektor yang dihasilkannya</strong></p>
<ul>
<li><p>Setiap pembaruan skema hanya dapat menambahkan satu Fungsi dan satu bidang vektor yang dihasilkan.</p></li>
<li><p>Fungsi yang didukung menentukan tipe bidang vektor yang dihasilkan: ` <code translate="no">BM25</code> ` menghasilkan bidang ` <code translate="no">SPARSE_FLOAT_VECTOR</code> `, dan ` <code translate="no">MINHASH</code> ` menghasilkan bidang ` <code translate="no">BINARY_VECTOR</code> `.</p></li>
<li><p>Bidang vektor yang dihasilkan harus merupakan bidang baru. Bidang tersebut tidak boleh merujuk ke bidang yang sudah ada dalam skema koleksi.</p></li>
<li><p>Bidang vektor yang dihasilkan tidak boleh bersifat nullable.</p></li>
<li><p>Bidang masukan yang digunakan oleh Fungsi harus sudah ada dalam koleksi.</p></li>
<li><p>Saat menambahkan Fungsi BM25 atau MinHash ke koleksi yang sudah ada, input Fungsi harus berupa bidang " <code translate="no">VARCHAR</code> ". Input " <code translate="no">TEXT</code> " tidak didukung dalam alur kerja ini karena Milvus tidak dapat mengisi kembali output yang dihasilkan untuk entitas yang sudah ada dari jenis input tersebut.</p></li>
</ul>
<p><strong>Menghapus bidang yang didefinisikan pengguna</strong></p>
<ul>
<li><p>Anda tidak dapat menghapus bidang kunci utama, bidang kunci partisi, bidang kunci pengelompokan, atau bidang vektor terakhir dalam sebuah koleksi.</p></li>
<li><p>Anda dapat menghapus seluruh bidang " <code translate="no">ARRAY&lt;STRUCT&gt;</code> ", tetapi tidak dapat menghapus sub-bidang individu di dalam bidang " <code translate="no">ARRAY&lt;STRUCT&gt;</code> ".</p></li>
<li><p>Anda tidak dapat secara langsung menghapus bidang yang digunakan sebagai bidang masukan Fungsi atau dihasilkan sebagai bidang keluaran Fungsi. Untuk menghapus bidang keluaran Fungsi, hapus Fungsi yang menghasilkannya.</p></li>
</ul>
<p><strong>Hapus Fungsi dan bidang vektor yang dihasilkannya</strong></p>
<ul>
<li><p>Dalam alur kerja perubahan skema ini, menghapus Fungsi akan menghapus Fungsi tersebut, bidang vektor yang dihasilkannya, dan indeks yang terkait. Bidang masukan Fungsi tetap ada dalam skema koleksi.</p></li>
<li><p>Penghapusan Fungsi akan ditolak jika menghapus bidang vektor yang dihasilkannya akan membuat koleksi tidak memiliki bidang vektor sama sekali.</p></li>
</ul>
<div class="alert note">
<p>Untuk perubahan skema di luar operasi penambahan dan penghapusan yang didukung, buat ulang atau migrasikan koleksi tersebut.</p>
</div>
<p><a id="add-fields-to-an-existing-collection"></a></p>
<h2 id="Add-fields-and-Functions-to-an-existing-collection" class="common-anchor-header">Menambahkan bidang dan Fungsi ke koleksi yang sudah ada<button data-href="#Add-fields-and-Functions-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Pilih alur kerja berdasarkan apakah Anda menambahkan bidang yang ditentukan pengguna atau Fungsi yang menghasilkan bidang vektor:</p>
<ul>
<li><p><a href="#add-user-defined-scalar-fields--milvus-26x">Tambahkan bidang skalar yang didefinisikan pengguna</a> saat Anda memerlukan metadata baru untuk penyaringan, hasil kueri, atau logika aplikasi.</p></li>
<li><p><a href="#add-structarray-fields--milvus-300">Tambahkan bidang StructArray</a> jika Anda memerlukan bidang array yang elemen-elemennya memiliki skema Struct yang sama.</p></li>
<li><p><a href="#add-user-defined-vector-fields--milvus-2618">Tambahkan bidang vektor yang didefinisikan pengguna</a> saat aplikasi Anda menghasilkan embedding dan menulis nilai vektor ke Milvus.</p></li>
<li><p><a href="#add-a-function-and-its-generated-vector-field--milvus-30x">Tambahkan Fungsi dan bidang vektor yang dihasilkannya</a> ketika Milvus harus menghasilkan nilai vektor dari bidang yang sudah ada, seperti vektor BM25 yang jarang atau tanda tangan MinHash dari teks.</p></li>
</ul>
<p>Dalam semua kasus, nama bidang baru tidak boleh sudah ada dalam koleksi, dan jumlah total bidang tidak boleh melebihi batas jumlah bidang Milvus. Untuk detailnya, lihat <a href="/docs/id/limitations.md#number-of-resources-in-a-collection">Batas Milvus</a>.</p>
<h3 id="Add-user-defined-scalar-fields--Milvus-26x" class="common-anchor-header">Tambahkan bidang skalar yang ditentukan pengguna<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-user-defined-scalar-fields--Milvus-26x" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan ` <code translate="no">add_collection_field()</code> ` untuk menambahkan bidang skalar yang didefinisikan pengguna ke koleksi yang sudah ada.</p>
<p>Hal ini berbeda dengan menyimpan kunci sembarang di bidang dinamis: setelah pembaruan skema tersedia, bidang skalar baru tersebut menjadi bagian reguler dari skema koleksi. Anda dapat menyisipkan atau memperbarui nilai ke dalamnya, membuat indeks di atasnya jika didukung, menggunakannya dalam kueri dan filter pencarian, serta mengembalikannya dalam hasil kueri atau pencarian.</p>
<p>Karena entitas yang sudah ada dimasukkan sebelum bidang baru tersebut ada, setiap bidang skalar yang didefinisikan pengguna yang ditambahkan harus dapat bernilai null:</p>
<ul>
<li><p>Jika Anda menambahkan bidang skalar dengan ` <code translate="no">nullable=True</code> ` dan tanpa ` <code translate="no">default_value</code>`, entitas yang sudah ada akan mengembalikan ` <code translate="no">NULL</code> ` untuk bidang baru tersebut.</p></li>
<li><p>Jika Anda menambahkan bidang skalar dengan ` <code translate="no">nullable=True</code> ` dan ` <code translate="no">default_value</code>`, entitas yang sudah ada akan mengembalikan nilai default alih-alih ` <code translate="no">NULL</code>`.</p></li>
</ul>
<p>Ekspresi filter skalar tidak cocok dengan nilai skalar ` <code translate="no">NULL</code> `. Untuk detailnya, lihat <a href="/docs/id/nullable-and-default.md">Bidang yang Dapat Bernilai Nol</a>.</p>
<p><strong>Contoh: Menambahkan bidang skalar yang dapat bernilai null</strong></p>
<p>Contoh berikut menambahkan bidang skalar yang dapat bernilai null <code translate="no">source</code> ke koleksi yang sudah ada bernama <code translate="no">product_catalog</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;source&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setelah bidang ditambahkan, entitas yang sudah ada dalam koleksi akan mengembalikan nilai ` <code translate="no">NULL</code> ` untuk ` <code translate="no">source</code>`. Entitas baru dapat menetapkan ` <code translate="no">source</code> ` selama proses penyisipan (insert) atau pembaruan (upsert).</p>
<p><strong>Contoh: Menambahkan bidang skalar dengan nilai default</strong></p>
<p>Jika entitas yang sudah ada harus mengembalikan nilai konkret alih-alih ` <code translate="no">NULL</code>`, tentukan ` <code translate="no">default_value</code> ` saat menambahkan bidang skalar. Contoh berikut menambahkan bidang ` <code translate="no">review_status</code> ` dan menggunakan ` <code translate="no">&quot;unreviewed&quot;</code> ` sebagai nilai default.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;review_status&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    default_value=<span class="hljs-string">&quot;unreviewed&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setelah bidang ditambahkan, entitas yang sudah ada dalam koleksi akan mengembalikan ` <code translate="no">&quot;unreviewed&quot;</code> ` untuk ` <code translate="no">review_status</code>`. Entitas baru dapat menetapkan nilai yang berbeda atau menggunakan nilai default jika tidak ada nilai yang diberikan.</p>
<h3 id="Add-StructArray-fields--Milvus-300" class="common-anchor-header">Menambahkan bidang StructArray<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0</span><button data-href="#Add-StructArray-fields--Milvus-300" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan ` <code translate="no">add_collection_struct_field()</code> ` untuk menambahkan bidang `StructArray` yang menerima array elemen `Struct`. Untuk menambahkan bidang `StructArray`, lakukan langkah-langkah berikut:</p>
<ol>
<li><p>Buat skema Struct yang berisi sub-bidang yang diperlukan dengan tipe data yang didukung. Untuk tipe data yang berlaku, lihat <a href="/docs/id/array-of-structs.md#Data-types">StructArray</a>.</p></li>
<li><p>Referensikan skema Struct yang dibuat di atas dan tetapkan kapasitas maksimum bidang tersebut di <code translate="no">add_collection_struct_field()</code>.</p></li>
<li><p>Tetapkan ` <code translate="no">nullable=True</code> ` dalam permintaan.</p></li>
</ol>
<p><strong>Contoh: Menambahkan bidang StructArray yang dapat bernilai null</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a Struct schema.</span>
struct_schema = client.create_struct_field_schema()

<span class="hljs-comment"># Add scalar fields to the Struct.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># Add vector fields to the Struct with mmap enabled.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line">client.add_collection_struct_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;books&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    struct_schema=struct_schema,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">1024</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setelah bidang StructArray ditambahkan, entitas yang sudah ada dalam koleksi akan mengembalikan nilai ` <code translate="no">NULL</code> ` untuk ` <code translate="no">chunks</code> ` di seluruh sub-bidangnya. Saat Anda menyisipkan entitas baru, pastikan semua sub-bidang berstatus ` <code translate="no">NULL</code> ` atau memiliki nilai yang valid. Menyisipkan entitas dengan beberapa sub-bidang berstatus ` <code translate="no">NULL</code> ` dan yang lain memiliki nilai valid akan menyebabkan kesalahan.</p>
<h3 id="Add-user-defined-vector-fields--Milvus-2618+" class="common-anchor-header">Menambahkan bidang vektor yang didefinisikan pengguna<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.18+</span><button data-href="#Add-user-defined-vector-fields--Milvus-2618+" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan <code translate="no">add_collection_field()</code> untuk menambahkan bidang vektor yang didefinisikan pengguna saat aplikasi Anda menghasilkan embedding dan menulis nilai vektor ke Milvus.</p>
<p>Setiap bidang vektor yang ditentukan pengguna yang ditambahkan harus dapat bernilai null. Entitas yang sudah ada memiliki nilai " <code translate="no">NULL</code> " untuk bidang vektor baru tersebut hingga Anda menulis nilai vektor melalui upsert atau alur kerja backfill. Entitas baru dapat menyertakan bidang vektor tersebut saat penyisipan. Pencarian vektor akan melewati entitas yang nilai vektornya adalah " <code translate="no">NULL</code>". Untuk detailnya, lihat <a href="/docs/id/nullable-and-default.md">Bidang yang Dapat Bernilai Null</a>.</p>
<p><strong>Contoh: Menambahkan bidang vektor yang dapat bernilai null</strong></p>
<p>Contoh berikut menambahkan bidang vektor padat yang dapat bernilai null bernama ` <code translate="no">embedding_v2</code> ` ke koleksi yang sudah ada. Tetapkan ` <code translate="no">dim</code> ` sesuai dengan dimensi embedding yang dihasilkan oleh aplikasi Anda.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.FLOAT_VECTOR,</span>
<span class="highlighted-comment-line">    dim=<span class="hljs-number">768</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setelah bidang ditambahkan, buat indeks pada bidang vektor baru tersebut sebelum melakukan pencarian:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Entitas yang sudah ada memiliki nilai ` <code translate="no">NULL</code> ` untuk ` <code translate="no">embedding_v2</code> ` dan akan dilewati saat Anda melakukan pencarian pada bidang ini. Untuk membuat entitas yang sudah ada dapat dicari melalui ` <code translate="no">embedding_v2</code>`, tulis nilai vektor non-NULL melalui `upsert` atau alur kerja `backfill`. Entitas baru dapat menyertakan ` <code translate="no">embedding_v2</code> ` saat penyisipan.</p>
<p><a id="add-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Add-a-Function-and-its-generated-vector-field--Milvus-30x" class="common-anchor-header">Tambahkan Fungsi dan bidang vektor yang dihasilkannya<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Add-a-Function-and-its-generated-vector-field--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan alur kerja ini ketika Milvus harus menghasilkan bidang vektor baru dari data yang sudah tersimpan dalam koleksi yang ada. Operasi ini menambahkan tiga elemen skema terkait:</p>
<ul>
<li><p>Definisi Fungsi yang membaca dari satu atau lebih bidang masukan yang sudah ada.</p></li>
<li><p>Bidang vektor baru yang menyimpan keluaran Fungsi.</p></li>
<li><p>Definisi indeks yang terikat pada bidang vektor baru tersebut.</p></li>
</ul>
<p>Misalnya, Fungsi BM25 membaca bidang " <code translate="no">VARCHAR</code> " yang sudah ada dan menghasilkan bidang " <code translate="no">SPARSE_FLOAT_VECTOR</code> " untuk pencarian leksikal. Fungsi MinHash menghasilkan bidang " <code translate="no">BINARY_VECTOR</code> " untuk deteksi duplikat hampir identik. Alur kerja ini tidak menambahkan atau mengganti bidang masukan Fungsi.</p>
<div class="alert note">
<p>Fitur ini memerlukan Storage V3. Untuk petunjuk pengaktifan dan pertimbangan kompatibilitas, lihat <a href="/docs/id/storage-v3.md">Storage V3</a>.</p>
</div>
<p>Menambahkan Fungsi dan bidang vektor yang dihasilkannya ke koleksi yang sudah ada juga memerlukan pemadatan versi skema dan pemadatan versi penyimpanan. Milvus akan menolak permintaan jika salah satu pengaturan tersebut dinonaktifkan. Prasyarat tambahan ini hanya berlaku saat memodifikasi koleksi yang sudah ada; mendefinisikan Fungsi dalam skema koleksi awal tidak menggunakan alur kerja pengisian data yang sudah ada ini.</p>
<p>Fungsi yang didukung menentukan tipe bidang vektor yang dihasilkan:</p>
<table>
<thead>
<tr><th>Fungsi</th><th>Jenis bidang vektor yang dihasilkan</th><th>Bidang masukan yang umum</th><th>Kasus penggunaan umum</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BM25</code></td><td><code translate="no">SPARSE_FLOAT_VECTOR</code></td><td>Bidang " <code translate="no">VARCHAR</code> " dengan penganalisis diaktifkan</td><td>Pencarian leksikal dan relevansi kata kunci</td></tr>
<tr><td><code translate="no">MINHASH</code></td><td><code translate="no">BINARY_VECTOR</code></td><td>Bidang " <code translate="no">VARCHAR</code> "</td><td>Deteksi duplikat hampir identik</td></tr>
</tbody>
</table>
<p>Untuk detail tentang cara kerja masing-masing Fungsi, lihat <a href="/docs/id/bm25-function.md">Fungsi BM25</a> dan <a href="/docs/id/minhash-function.md">Fungsi MinHash</a>.</p>
<p>Bidang vektor yang dihasilkan tidak boleh sudah ada dalam koleksi, dan tidak boleh bersifat nullable. Bidang input Fungsi harus sudah ada.</p>
<p><strong>Contoh: Tambahkan Fungsi BM25 dan bidang vektor langka yang dihasilkannya</strong></p>
<p>Contoh berikut menambahkan Fungsi BM25 bernama <code translate="no">text_bm25</code> dan bidang vektor langka yang dihasilkannya bernama <code translate="no">text_sparse</code> ke dalam koleksi yang sudah ada. Koleksi tersebut harus sudah memiliki bidang <code translate="no">VARCHAR</code> bernama <code translate="no">text</code> dengan penganalisis yang diaktifkan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sparse_field = client.create_field_schema(
    name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    data_type=DataType.SPARSE_FLOAT_VECTOR,
    desc=<span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>,
)

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse&quot;</span>],
    function_type=FunctionType.BM25,
)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,
    },
)

<span class="highlighted-comment-line">client.add_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_schema=sparse_field,</span>
<span class="highlighted-comment-line">    func=bm25_function,</span>
<span class="highlighted-comment-line">    index_params=index_params,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Objek ` <code translate="no">index_params</code> ` harus berisi tepat satu definisi indeks untuk bidang keluaran Fungsi baru tersebut. Milvus menambahkan Fungsi, bidang vektor yang dihasilkannya, dan definisi indeks terikat dalam perubahan skema yang sama. Jangan memanggil ` <code translate="no">create_index()</code> ` secara terpisah setelah ` <code translate="no">add_function_field()</code>`.</p>
<p>Secara konseptual, operasi ini menambahkan definisi Function, bidang keluaran yang dihasilkan, dan definisi indeks terikat berikut:</p>
<pre><code translate="no" class="language-plaintext">New Function:
  name: &quot;text_bm25&quot;
  type: BM25
  input_field_names: [&quot;text&quot;]
  output_field_names: [&quot;text_sparse&quot;]

New generated output field:
  name: &quot;text_sparse&quot;
  data_type: SPARSE_FLOAT_VECTOR
  nullable: false

Bound index:
  field_name: &quot;text_sparse&quot;
  index_type: SPARSE_INVERTED_INDEX
  metric_type: BM25
<button class="copy-code-btn"></button></code></pre>
<p>Setelah permintaan berhasil, ` <code translate="no">describe_collection()</code> ` mengembalikan baik fungsi ` <code translate="no">text_bm25</code> ` baru maupun bidang vektor ` <code translate="no">text_sparse</code> ` yang dihasilkannya dalam skema koleksi. Milvus menghasilkan keluaran fungsi untuk entitas baru saat entitas tersebut ditulis. Untuk entitas yang sudah ada, Milvus mengisi bidang vektor yang dihasilkan secara asinkron melalui pemadatan latar belakang. Visibilitas skema mengonfirmasi bahwa pembaruan skema berhasil, tetapi tidak menunjukkan bahwa pengisian ulang telah selesai untuk setiap entitas yang ada. Untuk alur kerja pencarian BM25 yang lengkap, lihat <a href="/docs/id/full-text-search.md">Pencarian Teks Penuh</a>.</p>
<p>Milvus juga mendukung Fungsi MinHash dan bidang vektor biner yang dihasilkannya untuk deteksi duplikat hampir identik. Fungsi MinHash menggunak <code translate="no">FunctionType.MINHASH</code>, dan menulis ke bidang keluaran baru <code translate="no">BINARY_VECTOR</code>. Untuk detail konfigurasi, lihat <a href="/docs/id/minhash-function.md">Fungsi MinHash</a>.</p>
<p><a id="drop-fields-from-an-existing-collection"></a></p>
<h2 id="Drop-fields-and-Functions-from-an-existing-collection" class="common-anchor-header">Menghapus bidang dan Fungsi dari koleksi yang ada<button data-href="#Drop-fields-and-Functions-from-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat menghapus bidang yang ditentukan pengguna secara langsung ketika bidang tersebut tidak lagi menjadi bagian dari model koleksi Anda. Untuk menghapus Fungsi dan bidang vektor yang dihasilkannya, hapus Fungsi tersebut; Milvus akan menghapus bidang yang dihasilkan beserta indeksnya dalam perubahan skema yang sama.</p>
<h3 id="Drop-user-defined-fields--Milvus-30x" class="common-anchor-header">Menghapus bidang yang didefinisikan pengguna<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-user-defined-fields--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan perintah ` <code translate="no">drop_collection_field()</code> ` untuk menghapus bidang skalar, vektor, atau StructArray yang didefinisikan pengguna yang tidak lagi menjadi bagian dari model koleksi Anda.</p>
<p>Menghapus bidang terlebih dahulu akan mengubah skema koleksi dan visibilitas bidang:</p>
<ul>
<li><p>Setelah perintah ` <code translate="no">drop_collection_field()</code> ` berhasil, skema koleksi diperbarui: ` <code translate="no">describe_collection()</code> ` tidak lagi mengembalikan bidang yang dihapus, dan kueri atau pencarian tidak lagi dapat mengembalikan bidang tersebut dalam ` <code translate="no">output_fields</code> ` atau menggunakannya dalam ekspresi.</p></li>
<li><p>Indeks yang dibangun di atas kolom yang dihapus akan dibersihkan sebagai bagian dari pembaruan skema.</p></li>
</ul>
<p>Pembersihan penyimpanan ditangani secara terpisah dari pembersihan skema. Untuk detailnya, lihat <a href="#when-is-storage-space-reclaimed-after-dropping-a-field">Kapan ruang penyimpanan direklamasi setelah menghapus bidang?</a>.</p>
<p><strong>Contoh: Menghapus bidang skalar yang didefinisikan pengguna</strong></p>
<p>Contoh berikut mengasumsikan bahwa ` <code translate="no">experiment_tag</code> ` adalah bidang skalar yang didefinisikan pengguna di ` <code translate="no">product_catalog</code>`, dan menghapusnya dari koleksi tersebut.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;experiment_tag&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setelah menghapus sebuah bidang, Anda dapat memanggil ` <code translate="no">describe_collection()</code> ` untuk memverifikasi bahwa bidang tersebut tidak lagi menjadi bagian dari skema.</p>
<p><strong>Contoh: Menghapus bidang StructArray</strong></p>
<p>Contoh berikut mengasumsikan bahwa ` <code translate="no">chunks</code> ` adalah bidang StructArray di ` <code translate="no">my_collection</code>`, dan menghapusnya dari koleksi.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Contoh: Menghapus bidang vektor yang didefinisikan pengguna</strong></p>
<p>Anda dapat menghapus bidang vektor dengan metode <code translate="no">drop_collection_field()</code> yang sama, tetapi koleksi tersebut harus tetap berisi setidaknya satu bidang vektor setelah penghapusan. Hal ini berguna untuk koleksi yang untuk sementara waktu menyimpan beberapa representasi vektor dan kemudian menstandarkannya pada salah satunya.</p>
<p>Contoh berikut mengasumsikan bahwa ` <code translate="no">image_vector</code> ` adalah bidang vektor yang didefinisikan pengguna di ` <code translate="no">hybrid_catalog</code>`, dan bahwa koleksi tersebut masih menyimpan bidang vektor lain, seperti ` <code translate="no">text_vector</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;hybrid_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Jika <code translate="no">image_vector</code> adalah medan vektor terakhir dalam koleksi, operasi penghapusan akan ditolak.</p>
<p><a id="drop-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Drop-a-Function-and-its-generated-vector-field--Milvus-30x" class="common-anchor-header">Menghapus Fungsi dan bidang vektor yang dihasilkannya<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-a-Function-and-its-generated-vector-field--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan operasi ini ketika Anda tidak lagi memerlukan suatu Fungsi atau bidang vektor yang dihasilkannya, seperti Fungsi BM25 dan bidang vektor sparsenya.</p>
<p>Panggil ` <code translate="no">drop_function_field()</code> ` dengan nama Fungsi tersebut. Milvus akan menghapus Fungsi, bidang vektor yang dihasilkannya, dan indeks terkait sambil mempertahankan bidang masukan Fungsi.</p>
<p><strong>Contoh: Menghapus Fungsi BM25 dan bidang vektor langka yang dihasilkannya</strong></p>
<p>Contoh berikut mengasumsikan bahwa ` <code translate="no">text_bm25</code> ` adalah Fungsi BM25 di ` <code translate="no">product_catalog</code> ` dan menghasilkan bidang keluaran vektor langka bernama ` <code translate="no">text_sparse</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    function_name=<span class="hljs-string">&quot;text_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setelah operasi berhasil, ` <code translate="no">describe_collection()</code> ` tidak lagi mengembalikan Fungsi yang dihapus atau bidang vektor yang dihasilkannya. Bidang masukan Fungsi tetap ada dalam skema.</p>
<p>Jika menghapus bidang keluaran fungsi tersebut akan membuat koleksi tidak memiliki bidang vektor sama sekali, operasi tersebut akan ditolak.</p>
<h2 id="FAQ" class="common-anchor-header">Pertanyaan Umum<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Which-method-should-I-use-to-add-a-field-or-Function" class="common-anchor-header">Metode mana yang harus saya gunakan untuk menambahkan bidang atau Fungsi?<button data-href="#Which-method-should-I-use-to-add-a-field-or-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan ` <code translate="no">add_collection_field()</code> ` untuk menambahkan bidang skalar atau vektor yang didefinisikan pengguna.</p>
<p>Gunakan ` <code translate="no">add_collection_struct_field()</code> ` untuk menambahkan bidang `StructArray` saat Anda memerlukan bidang array yang elemen-elemennya berbagi skema `Struct` yang sama.</p>
<p>Gunakan ` <code translate="no">add_function_field()</code> ` untuk menambahkan Fungsi, bidang vektor yang dihasilkannya, dan definisi indeks terikat dalam perubahan skema yang sama.</p>
<h3 id="Why-must-added-user-defined-fields-be-nullable" class="common-anchor-header">Mengapa bidang yang didefinisikan pengguna yang ditambahkan harus dapat bernilai null?<button data-href="#Why-must-added-user-defined-fields-be-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>Entitas yang sudah ada dimasukkan sebelum bidang baru tersebut ada, sehingga entitas tersebut tidak memiliki nilai untuk bidang tersebut. Dengan mengatur ` <code translate="no">nullable=True</code> `, Milvus dapat mewakili nilai yang hilang sebagai ` <code translate="no">NULL</code> ` hingga aplikasi Anda menulis nilai atau, untuk bidang skalar, hingga nilai default berlaku.</p>
<p>Aturan ini berlaku untuk bidang skalar yang ditentukan pengguna dan bidang vektor yang ditentukan pengguna yang ditambahkan dengan ` <code translate="no">add_collection_field()</code>`, serta untuk bidang `StructArray` yang ditambahkan dengan ` <code translate="no">add_collection_struct_field()</code>`. Aturan ini tidak berlaku untuk bidang vektor yang dihasilkan oleh Fungsi, yang tidak dapat bernilai `null`.</p>
<h3 id="What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="common-anchor-header">Apa yang terjadi pada entitas yang sudah ada setelah saya menambahkan bidang yang didefinisikan pengguna?<button data-href="#What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk bidang skalar yang didefinisikan pengguna, entitas yang sudah ada akan mengembalikan ` <code translate="no">NULL</code> ` kecuali Anda menetapkan ` <code translate="no">default_value</code>`. Jika Anda menetapkan ` <code translate="no">default_value</code>`, entitas yang sudah ada akan mengembalikan nilai default tersebut.</p>
<p>Untuk bidang vektor yang didefinisikan pengguna, entitas yang sudah ada memiliki nilai ` <code translate="no">NULL</code> ` untuk bidang vektor baru tersebut. Pencarian vektor pada bidang yang ditambahkan akan melewati entitas yang nilai vektornya adalah ` <code translate="no">NULL</code>`. Untuk membuat entitas yang sudah ada dapat dicari melalui bidang vektor baru tersebut, masukkan nilai vektor non-NULL melalui `upsert` atau alur kerja `backfill`. Entitas baru dapat menyertakan bidang vektor baru tersebut saat penyisipan.</p>
<p>Untuk bidang StructArray, entitas yang sudah ada mengembalikan nilai ` <code translate="no">NULL</code> ` untuk bidang StructArray baru di seluruh sub-bidangnya. Entitas baru harus menyediakan nilai ` <code translate="no">NULL</code> ` untuk semua sub-bidang atau nilai yang valid untuk semua sub-bidang.</p>
<h3 id="Can-I-add-BM25-lexical-search-to-an-existing-collection" class="common-anchor-header">Dapatkah saya menambahkan pencarian leksikal BM25 ke koleksi yang sudah ada?<button data-href="#Can-I-add-BM25-lexical-search-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Ya. Jika koleksi tersebut sudah memiliki bidang ` <code translate="no">VARCHAR</code> ` dengan penganalisis yang diaktifkan, Anda dapat menambahkan Fungsi BM25 dan bidang vektor jarang yang dihasilkannya untuk pencarian leksikal. Dalam alur kerja ini, Milvus menambahkan Fungsi tersebut, bidang keluaran ` <code translate="no">SPARSE_FLOAT_VECTOR</code> ` baru, dan definisi indeks terikat dalam perubahan skema yang sama. Anda tidak dapat menggunakan bidang ` <code translate="no">TEXT</code> ` yang sudah ada sebagai masukan BM25 dalam alur kerja perubahan skema ini. Untuk menggunakan masukan ` <code translate="no">TEXT</code> `, tentukan bidang dan Fungsi BM25 saat Anda membuat koleksi.</p>
<p>Saat memanggil ` <code translate="no">add_function_field()</code>`, berikan objek ` <code translate="no">index_params</code> ` yang berisi satu indeks ` <code translate="no">SPARSE_INVERTED_INDEX</code> ` dengan ` <code translate="no">metric_type=&quot;BM25&quot;</code> ` untuk bidang keluaran baru. Milvus mengikat definisi indeks ke bidang yang dihasilkan sebagai bagian dari perubahan skema yang sama.</p>
<h3 id="How-do-I-drop-a-Function-and-its-generated-vector-field" class="common-anchor-header">Bagaimana cara menghapus sebuah Fungsi beserta bidang vektor yang dihasilkannya?<button data-href="#How-do-I-drop-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Panggil ` <code translate="no">drop_function_field()</code> ` dengan nama Fungsi. Dalam alur kerja perubahan skema ini, Milvus menghapus Fungsi, bidang vektor yang dihasilkannya, dan indeks terkait secara bersamaan sambil mempertahankan bidang masukan Fungsi.</p>
<h3 id="Do-I-need-to-wait-after-altering-a-collection-schema" class="common-anchor-header">Apakah saya perlu menunggu setelah mengubah skema koleksi?<button data-href="#Do-I-need-to-wait-after-altering-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Biasanya, tidak diperlukan penundaan manual. Jika operasi Anda berikutnya bergantung pada skema yang diperbarui, Anda dapat memanggil ` <code translate="no">describe_collection()</code> ` terlebih dahulu untuk memastikan skema yang saat ini dikembalikan oleh Milvus.</p>
<p>Dalam penerapan terdistribusi, mungkin ada jendela propagasi singkat saat komponen Milvus menyegarkan metadata koleksi. Jika operasi segera setelah perubahan skema gagal karena kesalahan terkait skema, segarkan skema dan coba kembali operasi tersebut.</p>
<h3 id="When-is-storage-space-reclaimed-after-dropping-a-field" class="common-anchor-header">Kapan ruang penyimpanan dikembalikan setelah menghapus sebuah bidang?<button data-href="#When-is-storage-space-reclaimed-after-dropping-a-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Menghapus sebuah bidang akan menghilangkannya dari skema saat ini dan visibilitas kueri/pencarian normal, tetapi data historis untuk bidang tersebut tidak langsung dihapus secara fisik dari penyimpanan objek.</p>
<p>Ruang penyimpanan dapat dikembalikan kemudian selama proses pemadatan. Pemadatan adalah proses latar belakang yang mengatur ulang file data yang ada menjadi file baru yang lebih ringkas. Setelah bidang dihapus, file yang baru dipadatkan mengikuti skema saat ini dan mengabaikan bidang yang dihapus. Milvus tidak menjamin pengurangan ruang penyimpanan secara langsung atau dalam waktu tertentu setelah menghapus suatu bidang.</p>
<h3 id="What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">Apa yang terjadi jika saya menambahkan bidang skalar dengan nama yang sama dengan kunci bidang dinamis?<button data-href="#What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika bidang dinamis diaktifkan, Anda dapat menambahkan bidang skalar dengan nama yang sama dengan kunci bidang dinamis yang sudah ada. Bidang skalar baru tersebut akan menyembunyikan kunci bidang dinamis dalam hasil kueri normal, tetapi data dinamis aslinya tetap disimpan di <code translate="no">$meta</code>.</p>
<p>Misalnya, jika entitas yang ada menyimpan kunci dinamis bernama <code translate="no">source</code>, dan Anda kemudian menambahkan bidang skalar bernama <code translate="no">source</code>, hasil normal untuk <code translate="no">source</code> akan merujuk ke bidang skalar tersebut. Untuk mengakses nilai dinamis aslinya, gunakan sintaks jalur <code translate="no">$meta</code>, seperti <code translate="no">$meta[&quot;source&quot;]</code>.</p>
