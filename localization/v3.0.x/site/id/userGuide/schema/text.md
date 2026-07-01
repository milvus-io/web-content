---
id: text.md
title: Kolom TeksCompatible with Milvus 3.0.x
summary: >-
  TEXT adalah tipe bidang skalar untuk menyimpan teks dokumen, kutipan, dan
  konten teks panjang lainnya di Milvus.
beta: Milvus 3.0.x
---
<h1 id="Text-Field" class="common-anchor-header">Kolom Teks<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Text-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Dalam aplikasi pencarian berbasis AI, pencarian vektor membantu Anda menemukan entitas yang serupa secara semantik, tetapi aplikasi tersebut sering kali juga memerlukan teks sumber asli di balik setiap hasil pencocokan. Sebuah LLM atau agen dapat menggunakan teks tersebut sebagai konteks untuk membaca, mengutip, merangkum, atau menyertakan hasilnya dalam sebuah prompt.</p>
<p>Milvus menyediakan tipe bidang skalar ` <code translate="no">TEXT</code> ` untuk menyimpan teks sumber yang panjang secara langsung bersama entitas. Nilai-nilai yang umum meliputi kutipan, dokumen panjang, isi artikel, tiket, dan log. Berbeda dengan ` <code translate="no">VARCHAR</code>`, yang memerlukan ` <code translate="no">max_length</code>` tetap, ` <code translate="no">TEXT</code> ` tidak mengharuskan Anda menetapkan panjang byte maksimum dalam skema koleksi.</p>
<p>Untuk mendefinisikan bidang <code translate="no">TEXT</code>, atur <code translate="no">datatype</code> menjadi <code translate="no">DataType.TEXT</code>.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
<span class="highlighted-wrapper-line">    datatype=DataType.TEXT,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Setelah bidang tersebut didefinisikan, setiap entitas dapat menyertakan nilai string di bidang tersebut. Anda dapat memasukkan nilai " <code translate="no">TEXT</code> " seperti halnya bidang skalar lainnya dan mengembalikannya dari hasil kueri atau pencarian dengan mencantumkan bidang tersebut dalam " <code translate="no">output_fields</code>".</p>
<div class="alert note">
<p><code translate="no">TEXT</code> Bidang mendukung nilai null. Untuk mengaktifkan fitur ini, atur <code translate="no">nullable</code> menjadi <code translate="no">True</code>. Untuk detailnya, lihat <a href="/docs/id/nullable-and-default.md">Bidang yang Dapat Bernilai Null</a>.</p>
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
    </button></h2><ul>
<li>Sebuah bidang ` <code translate="no">TEXT</code> ` tidak dapat dijadikan bidang utama. Bidang utama mendukung ` <code translate="no">INT64</code> ` dan ` <code translate="no">VARCHAR</code>`.</li>
<li>Di Milvus 3.0.0, bidang <code translate="no">TEXT</code> tidak mendukung <code translate="no">PHRASE_MATCH</code>.</li>
<li>Di Milvus 3.0.0, kolom " <code translate="no">TEXT</code> " tidak mendukung nilai default.</li>
<li>Di Milvus 3.0.0, bidang <code translate="no">TEXT</code> tidak didukung dalam koleksi eksternal.</li>
<li>Di Milvus 3.0.0, bidang <code translate="no">TEXT</code> tidak mendukung indeks skalar.</li>
<li><code translate="no">TEXT</code> tidak dimaksudkan untuk penyaringan metadata biasa. Jika Anda perlu menyaring metadata string pendek dan nilai bidang sesuai dengan batas panjang ` <code translate="no">VARCHAR</code> `, gunakan ` <code translate="no">VARCHAR</code>`.</li>
</ul>
<h2 id="Choose-TEXT-or-VARCHAR" class="common-anchor-header">Pilih TEXT atau VARCHAR<button data-href="#Choose-TEXT-or-VARCHAR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TEXT</code> dan <code translate="no">VARCHAR</code> sama-sama menyimpan nilai string, tetapi keduanya mendukung kebutuhan aplikasi yang berbeda. Gunakan <code translate="no">VARCHAR</code> untuk metadata pendek dan terbatas yang mengidentifikasi, mengkategorikan, atau memfilter entitas. Gunakan <code translate="no">TEXT</code> untuk konten sumber yang lebih panjang yang memberikan konteks yang cukup kepada LLM atau agen untuk membaca, mengutip, merangkum, atau membuat prompt.</p>
<table>
<thead>
<tr><th>Aspek</th><th><code translate="no">VARCHAR</code></th><th><code translate="no">TEXT</code></th></tr>
</thead>
<tbody>
<tr><td>Cocok untuk</td><td>Metadata singkat yang digunakan untuk mengidentifikasi, mengkategorikan, atau menyaring entitas, seperti <code translate="no">title</code>, <code translate="no">tag</code>, <code translate="no">category</code>, atau <code translate="no">external_id</code>.</td><td>Konten sumber yang lebih panjang yang digunakan oleh alur kerja LLM atau agen, seperti <code translate="no">content</code>, <code translate="no">passage</code>, <code translate="no">article_body</code>, atau <code translate="no">log_message</code>.</td></tr>
<tr><td>Pengaturan panjang</td><td>Memerlukan <code translate="no">max_length</code>, yang menentukan jumlah byte maksimum yang dapat disimpan oleh bidang tersebut. Nilai maksimumnya adalah <code translate="no">65,535</code> byte. Jika suatu nilai mungkin melebihi batas ini, gunakan <code translate="no">TEXT</code>.</td><td>Tidak memerlukan ` <code translate="no">max_length</code>`, sehingga skema tidak memerlukan batas byte tetap untuk nilai teks.</td></tr>
<tr><td>Perilaku penyimpanan</td><td>Menyimpan setiap nilai di dalam ` <code translate="no">max_length</code>` yang telah dikonfigurasi untuk bidang tersebut.</td><td>Menggunakan pemilihan penyimpanan otomatis untuk nilai teks yang lebih besar. Untuk detailnya, lihat <a href="#how-milvus-stores-large-text-values">Cara Milvus menyimpan nilai TEXT yang besar</a>.</td></tr>
<tr><td>Dukungan bidang utama</td><td>Dapat digunakan sebagai bidang utama.</td><td>Tidak dapat digunakan sebagai bidang utama.</td></tr>
<tr><td>Penyaringan</td><td>Digunakan untuk metadata string pendek yang perlu muncul dalam ekspresi penyaringan, seperti <code translate="no">category == &quot;news&quot;</code> atau <code translate="no">tag in [&quot;ai&quot;, &quot;database&quot;]</code>.</td><td>Tidak dimaksudkan untuk penyaringan metadata biasa.</td></tr>
</tbody>
</table>
<p>Untuk detail mengenai bidang <code translate="no">VARCHAR</code>, lihat <a href="/docs/id/string.md">Bidang VarChar</a>.</p>
<h2 id="How-Milvus-stores-large-TEXT-values" class="common-anchor-header">Bagaimana Milvus menyimpan nilai TEXT yang besar<button data-href="#How-Milvus-stores-large-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>Perluas untuk melihat cara kerjanya</summary></p>
<p>Saat Anda menyisipkan entitas, string yang Anda berikan untuk bidang <code translate="no">TEXT</code> adalah nilai <code translate="no">TEXT</code>. Milvus membandingkan ukuran nilai tersebut dengan <a href="/docs/id/configure_datanode.md#dataNodetextinlineThreshold">dataNode.text.inlineThreshold</a>, yang secara default berukuran <code translate="no">65,536</code> byte, lalu memilih salah satu dari dua jalur penyimpanan internal.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/text-large-storage-flow.png" alt="Large text storage" class="doc-image" id="large-text-storage" /> 
   <span>Penyimpanan teks besar</span>
  
 </span></p>
<ul>
<li><strong>Penyimpanan inline</strong>: Jika nilai ` <code translate="no">TEXT</code> ` lebih kecil dari ` <code translate="no">dataNode.text.inlineThreshold</code>`, Milvus menyimpan nilai teks asli secara langsung dalam data bidang ` <code translate="no">TEXT</code> `.</li>
<li><strong>Penyimpanan LOB</strong>: Jika nilai ` <code translate="no">TEXT</code> ` lebih besar dari atau sama dengan ` <code translate="no">dataNode.text.inlineThreshold</code>`, Milvus memperlakukan nilai tersebut sebagai objek besar (LOB) dan menyimpan teks aslinya secara terpisah di penyimpanan objek, seperti MinIO. Data bidang ` <code translate="no">TEXT</code> ` menyimpan referensi internal ke teks yang disimpan secara terpisah. Saat bidang ` <code translate="no">TEXT</code> ` diminta dalam hasil kueri atau pencarian, Milvus menggunakan referensi tersebut untuk mengambil dan mengembalikan teks aslinya.</li>
</ul>
<p>Pemilihan penyimpanan ini bersifat internal. Anda dapat menyisipkan, melakukan kueri, dan mencari bidang ` <code translate="no">TEXT</code> ` dengan cara yang sama terlepas dari jalur penyimpanan mana yang digunakan Milvus. Untuk menyesuaikan ambang batas atau perilaku terkait penyimpanan, pemadatan, dan pengumpulan sampah, lihat <a href="/docs/id/configure_datanode.md">Konfigurasi terkait dataNode</a> dan <a href="/docs/id/configure_datacoord.md">Konfigurasi terkait dataCoord</a>.</p>
<p>Jika deployment Anda menggunakan penyimpanan objek, nilai ` <code translate="no">TEXT</code> ` yang besar mungkin muncul sebagai objek yang dikelola Milvus di bawah jalur seperti <code translate="no">lobs/...</code>. Objek-objek ini merupakan detail implementasi dan tidak boleh dipindahkan, disalin, atau dihapus secara manual. Setelah Anda menghapus entitas, menghapus partisi, atau memadatkan data, penggunaan penyimpanan objek mungkin baru berkurang setelah pengumpulan sampah Milvus menghapus data objek besar yang tidak direferensikan setelah jendela keamanannya berakhir.</p>
<p></details></p>
<p>Penggunaan umum ` <code translate="no">TEXT</code> ` adalah Pencarian Teks Lengkap (Full Text Search) dengan BM25. Dalam pola ini, bidang ` <code translate="no">TEXT</code> ` menyimpan konten sumber asli, dan BM25 menganalisis teks serta menghasilkan vektor langka untuk menentukan peringkat kecocokan berdasarkan kata kunci. Hasil pencarian kemudian dapat mengembalikan nilai ` <code translate="no">TEXT</code> ` yang cocok sebagai konteks untuk alur kerja LLM atau agen. Contoh berikut menunjukkan cara menggunakan bidang " <code translate="no">TEXT</code> " sebagai bidang masukan untuk BM25. Untuk mempelajari konsep Pencarian Teks Penuh dan opsi kueri, lihat <a href="/docs/id/full-text-search.md">Pencarian Teks Penuh</a>.</p>
<h2 id="Step-1-Create-a-collection-with-a-TEXT-field" class="common-anchor-header">Langkah 1: Buat koleksi dengan bidang TEXT<button data-href="#Step-1-Create-a-collection-with-a-TEXT-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh berikut membuat koleksi dengan bidang <code translate="no">TEXT</code> untuk konten sumber dan bidang vektor jarang untuk vektor jarang yang dihasilkan oleh BM25. Fungsi BM25 mengubah teks yang telah ditokenisasi dari <code translate="no">content</code> menjadi vektor jarang yang disimpan di <code translate="no">sparse</code>.</p>
<p>Untuk pencarian teks lengkap BM25, bidang <code translate="no">TEXT</code> masukan harus diatur ke <code translate="no">enable_analyzer=True</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;text_bm25_collection&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;content&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.TEXT,</span>
<span class="highlighted-comment-line">    enable_analyzer=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="highlighted-comment-line">bm25_function = Function(</span>
<span class="highlighted-comment-line">    name=<span class="hljs-string">&quot;content_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],</span>
<span class="highlighted-comment-line">    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>],</span>
<span class="highlighted-comment-line">    function_type=FunctionType.BM25,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">schema.add_function(bm25_function)</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Create-a-sparse-vector-index" class="common-anchor-header">Langkah 2: Buat indeks vektor spars<button data-href="#Step-2-Create-a-sparse-vector-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Buat indeks pada bidang vektor spars yang dihasilkan oleh fungsi BM25. Jenis metrik harus disetel ke <code translate="no">BM25</code>.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Insert-TEXT-data" class="common-anchor-header">Langkah 3: Masukkan data TEXT<button data-href="#Step-3-Insert-TEXT-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Masukkan teks secara langsung ke dalam bidang ` <code translate="no">TEXT</code> `. Jangan berikan nilai untuk bidang ` <code translate="no">sparse</code> `. Milvus menghasilkan vektor spars secara internal dengan menerapkan fungsi BM25 ke ` <code translate="no">content</code>`.</p>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;</span>,
    },
]

client.insert(collection_name=COLLECTION_NAME, data=data)
client.load_collection(collection_name=COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Perform-BM25-full-text-search" class="common-anchor-header">Langkah 4: Lakukan pencarian teks lengkap BM25<button data-href="#Step-4-Perform-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan teks kueri mentah sebagai data pencarian dan lakukan pencarian terhadap bidang vektor spars. Milvus mengubah teks kueri menjadi vektor spars, menentukan peringkat kecocokan dengan BM25, dan mengembalikan bidang <code translate="no">TEXT</code> yang diminta dalam <code translate="no">output_fields</code>.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=COLLECTION_NAME,
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;content&quot;</span>],</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Read-the-returned-TEXT-values" class="common-anchor-header">Langkah 5: Baca nilai TEXT yang dikembalikan<button data-href="#Step-5-Read-the-returned-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Setiap hasil pencarian mencakup skor BM25 dan nilai <code translate="no">TEXT</code> asli.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;id: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, score: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>Untuk informasi lebih lanjut mengenai fungsi BM25, indeks vektor jarang, dan sintaks kueri untuk pencarian teks lengkap, lihat <a href="/docs/id/full-text-search.md">Pencarian Teks Lengkap</a>.</p>
