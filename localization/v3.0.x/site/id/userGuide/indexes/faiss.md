---
id: faiss.md
title: FAISSCompatible with Milvus 3.0.0+
summary: >-
  Gunakan fitur "FAISS index passthrough" untuk menyediakan string indeks FAISS
  dan parameter pencarian khusus pabrik di Milvus 3.0.
beta: Milvus 3.0.0+
---
<h1 id="FAISS" class="common-anchor-header">FAISS<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#FAISS" class="anchor-icon" translate="no">
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
    </button></h1><p>Tipe indeks ` <code translate="no">FAISS</code> ` adalah fitur tingkat ahli yang tersedia di Milvus 3.0.0 dan versi selanjutnya. Fitur ini memungkinkan Anda untuk menyediakan <a href="https://github.com/facebookresearch/faiss/wiki/The-index-factory">string pembuat indeks Faiss</a> sebagai pengganti pemilihan tipe indeks Milvus yang tetap.</p>
<p>Gunakan " <code translate="no">FAISS</code> " jika Anda sudah memiliki resep Faiss yang teruji dan memerlukan kendali langsung atas komposisinya. Untuk resep umum yang memiliki tipe indeks Milvus khusus, disarankan untuk menggunakan tipe khusus tersebut karena memiliki kontrak parameter yang stabil dan terdokumentasi.</p>
<div class="alert note">
<p>String pabrik yang diterima oleh Faiss hulu tidak secara otomatis didukung oleh Milvus. Kompatibilitas bergantung pada tipe bidang vektor, metrik, dimensi, modul Faiss yang dikompilasi ke dalam gambar Milvus, dan apakah indeks yang dihasilkan mendukung operasi yang dibutuhkan Milvus.</p>
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
<li><p><code translate="no">FAISS</code> mendukung bidang <code translate="no">FLOAT_VECTOR</code> dan <code translate="no">BINARY_VECTOR</code>. Milvus tidak mendukung bidang <code translate="no">FLOAT16_VECTOR</code>, <code translate="no">BFLOAT16_VECTOR</code>, <code translate="no">INT8_VECTOR</code>, atau <code translate="no">SPARSE_FLOAT_VECTOR</code>.</p></li>
<li><p>Adaptor generik <code translate="no">FAISS</code> berjalan di CPU. Ini bukan jenis indeks Faiss GPU.</p></li>
<li><p>Parameter build ` <code translate="no">faiss_index_name</code> ` wajib diisi. Milvus meneruskan nilainya ke Faiss tanpa mengubah resep menjadi tipe indeks Milvus khusus.</p></li>
<li><p>Parameter build dan pencarian bersifat spesifik per pabrik. Parameter yang didukung oleh satu pabrik dapat ditolak oleh pabrik lainnya.</p></li>
<li><p>Penyaringan skalar memerlukan indeks Faiss yang mendasarinya untuk mendukung pemilih ID. Pengujian Milvus 3.0.0 mencakup pencarian yang disaring dengan pabrik float <code translate="no">Flat</code>, <code translate="no">IVF64,Flat</code>, dan <code translate="no">HNSW16,Flat</code>. Jangan berasumsi bahwa setiap pabrik mendukung filter atau bahwa indeks biner <code translate="no">FAISS</code> mendukung penyaringan skalar.</p></li>
<li><p>Iterator pencarian tidak didukung.</p></li>
<li><p>Adaptor ini tidak menyediakan pengambilan vektor mentah.</p></li>
<li><p>Dukungan pencarian rentang bergantung pada pabrik. Float <code translate="no">Flat</code> memiliki cakupan rilis. Jangan gunakan pencarian rentang dengan indeks biner <code translate="no">FAISS</code>.</p></li>
<li><p>Sebuah factory dapat dibangun dengan sukses tetapi tetap menolak beberapa operasi pencarian Milvus. Misalnya, standalone <code translate="no">PQ8x4</code> menolak selektor yang digunakan oleh pencarian yang difilter skalar. Validasi penggunaan tanpa filter secara terpisah.</p></li>
<li><p>Di Milvus 3.0.0, validasi skor <code translate="no">COSINE</code> dan ambang batas pencarian rentang setelah pemuatan ulang indeks. Knowhere v3.0.6 tidak memulihkan status normalisasi kosinus adaptor <code translate="no">FAISS</code> selama deserialisasi.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Cara kerjanya<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/faiss-index-flow.png" alt="FAISS index passthrough workflow" class="doc-image" id="faiss-index-passthrough-workflow" /> 
   <span>Alur kerja passthrough indeks FAISS</span>
  
 </span></p>
<p>Untuk pembuatan indeks, Milvus meneruskan ` <code translate="no">faiss_index_name</code>`, tipe bidang vektor, metrik, dan parameter pembuatan lainnya ke adaptor Knowhere FAISS. Adaptor tersebut memanggil ` <code translate="no">faiss::index_factory()</code> ` untuk bidang ` <code translate="no">FLOAT_VECTOR</code> ` atau ` <code translate="no">faiss::index_binary_factory()</code> ` untuk bidang ` <code translate="no">BINARY_VECTOR</code> `. Objek yang dihasilkan adalah indeks Faiss asli yang dikelola melalui siklus hidup indeks Milvus standar.</p>
<p>Untuk pencarian, adaptor mengonversi parameter khusus pabrik yang disediakan menjadi objek Faiss <code translate="no">SearchParameters</code> yang sesuai. Untuk pabrik float yang didukung, adaptor juga meneruskan bit set filter Milvus sebagai selektor Faiss. Dukungan selektor bergantung pada pabrik, dan tes yang dirilis tidak menetapkan penyaringan skalar untuk indeks biner <code translate="no">FAISS</code>. Inilah sebabnya mengapa suatu resep dapat valid di Faiss mandiri tetapi menolak operasi yang diperlukan oleh jalur pencarian Milvus.</p>
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
    </button></h2><ul>
<li>Milvus 3.0.0 atau yang lebih baru</li>
<li>PyMilvus 3.0.0 atau yang lebih baru</li>
<li>Memahami sintaks pabrik indeks Faiss dan persyaratan pelatihan dari pabrik yang dipilih</li>
</ul>
<p>Untuk petunjuk instalasi, lihat <a href="/docs/id/install-pymilvus.md">Instal PyMilvus</a>.</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">Pilih string pabrik<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>String pabrik mendeskripsikan indeks Faiss sebagai urutan komponen. Contoh-contoh berikut telah diuji pada rilis Milvus 3.0.0. Daftar ini tidak lengkap.</p>
<table>
<thead>
<tr><th>String pabrik</th><th>Jenis bidang</th><th>Metrik yang diuji dalam pengujian rilis</th><th>Parameter pencarian</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td><td>Tidak ada</td><td>Pencarian tepat.</td></tr>
<tr><td><code translate="no">IVF64,Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td><td><code translate="no">nprobe</code></td><td>IVF dengan 64 daftar terbalik dan vektor yang tidak terkompresi.</td></tr>
<tr><td><code translate="no">HNSW16,Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td><td><code translate="no">efSearch</code></td><td>Grafik HNSW dengan penyimpanan vektor datar.</td></tr>
<tr><td><code translate="no">OPQ16,IVF64,PQ16x4</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td>Khusus pabrik</td><td>Menggabungkan OPQ, IVF, dan PQ. Validasi ukuran pelatihan dan recall dengan data Anda.</td></tr>
<tr><td><code translate="no">IVF64,PQ8x4,RFlat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td><code translate="no">nprobe</code>, <code translate="no">k_factor</code></td><td>Menggunakan penyaring datar setelah pengambilan kandidat PQ.</td></tr>
<tr><td><code translate="no">PQ8x4</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td>Tidak ada</td><td>Menyertakan tes rilis. Pencarian yang difilter skalar gagal karena indeks menolak selektor; validasi penggunaan tanpa filter secara terpisah.</td></tr>
<tr><td><code translate="no">BFlat</code></td><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HAMMING</code></td><td>Tidak ada</td><td>Pencarian tepat untuk vektor biner.</td></tr>
</tbody>
</table>
<p>Entri " <code translate="no">COSINE</code> " menunjukkan cakupan pengujian awal (build dan pencarian). Untuk Milvus 3.0.0, entri ini tidak menjamin keakuratan skor atau pencarian rentang setelah pemuatan ulang indeks. Lihat <a href="#limits">Batasan</a>.</p>
<h2 id="Build-and-search-a-float-index" class="common-anchor-header">Membuat dan melakukan pencarian pada indeks float<button data-href="#Build-and-search-a-float-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh berikut membuat 3.000 vektor berdimensi 128. Ini menyediakan data pelatihan yang cukup untuk resep " <code translate="no">IVF64,Flat</code> " yang digunakan dalam contoh ini. Perluas blok pengaturan dan jalankan sebelum membangun dan melakukan pencarian pada indeks.</p>
<p><details></p>
<p><summary>Siapkan kumpulan vektor float</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;faiss_float_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">32</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

client.create_collection(collection_name=collection_name, schema=schema)

rows = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;reference&quot;</span> <span class="hljs-keyword">if</span> i % <span class="hljs-number">2</span> == <span class="hljs-number">0</span> <span class="hljs-keyword">else</span> <span class="hljs-string">&quot;query&quot;</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: vector,
    }
    <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)
]

client.insert(collection_name=collection_name, data=rows)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Build-the-index" class="common-anchor-header">Buat indeks<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Atur ` <code translate="no">index_type</code> ` ke ` <code translate="no">FAISS</code>`, dan gunakan ` <code translate="no">faiss_index_name</code> ` untuk memilih resep pabrik Faiss asli.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;faiss_ivf_flat&quot;</span>,
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,</span>
<span class="highlighted-comment-line">    params={<span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;IVF64,Flat&quot;</span>},</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>String pabrik <code translate="no">IVF64,Flat</code> membuat indeks IVF dengan 64 daftar terbalik dan menyimpan vektor yang tidak terkompresi di setiap daftar.</p>
<h3 id="Search-the-index" class="common-anchor-header">Cari di indeks<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Tentukan parameter pencarian khusus pabrik di dalam <code translate="no">search_params.params</code>. Untuk pabrik IVF, <code translate="no">nprobe</code> mengontrol berapa banyak daftar terbalik yang dicari oleh Faiss.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>},</span>
<span class="highlighted-comment-line">}</span>

results = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;reference&quot;&#x27;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;category&quot;</span>],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<p>Kueri menggunakan ` <code translate="no">nprobe=8</code>`, sehingga Faiss mencari 8 dari 64 daftar terbalik. Filter membatasi hasil pada entitas yang nilai ` <code translate="no">category</code> `-nya adalah ` <code translate="no">reference</code>`.</p>
<h2 id="Build-and-search-a-binary-index" class="common-anchor-header">Membuat dan mencari indeks biner<button data-href="#Build-and-search-a-binary-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk bidang ` <code translate="no">BINARY_VECTOR</code> `, gunakan string pabrik biner seperti ` <code translate="no">BFlat</code> ` dan metrik biner yang kompatibel. Perluas blok pengaturan dan jalankan sebelum membangun dan mencari indeks.</p>
<p><details></p>
<p><summary>Siapkan koleksi vektor biner</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;faiss_binary_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">7</span>)
vectors = [<span class="hljs-built_in">bytes</span>(rng.getrandbits(<span class="hljs-number">8</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">16</span>)) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">300</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;binary_vector&quot;</span>, DataType.BINARY_VECTOR, dim=<span class="hljs-number">128</span>)

client.create_collection(collection_name=collection_name, schema=schema)
client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;binary_vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Build-the-index" class="common-anchor-header">Buat indeks<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan <code translate="no">BFlat</code> sebagai string pabrik dan <code translate="no">HAMMING</code> sebagai metrik untuk contoh vektor biner ini.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;faiss_binary_flat&quot;</span>,
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;HAMMING&quot;</span>,</span>
<span class="highlighted-comment-line">    params={<span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;BFlat&quot;</span>},</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-the-index" class="common-anchor-header">Cari indeks<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BFlat</code> tidak memiliki parameter pencarian khusus keluarga. Berikan pemetaan ` <code translate="no">params</code> ` kosong saat membuat permintaan pencarian.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {<span class="hljs-string">&quot;params&quot;</span>: {}}</span>

results = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">5</span>,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<p>Setiap vektor biner berdimensi 128 direpresentasikan oleh 16 byte. Untuk informasi lebih lanjut, lihat <a href="/docs/id/binary-vector.md">Vektor Biner</a>.</p>
<h2 id="Configure-build-and-search-parameters" class="common-anchor-header">Konfigurasikan parameter build dan pencarian<button data-href="#Configure-build-and-search-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Tipe indeks <code translate="no">FAISS</code> memiliki satu parameter build passthrough yang wajib.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Lokasi</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">faiss_index_name</code></td><td><code translate="no">params</code> in <code translate="no">add_index()</code></td><td>String pembuat indeks Faiss. Contohnya, <code translate="no">IVF64,Flat</code>.</td></tr>
</tbody>
</table>
<p>Tentukan parameter pencarian khusus pabrik di dalam <code translate="no">search_params.params</code>. Tabel berikut mencantumkan contoh-contoh umum dan tidak mencakup semuanya.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Contoh pabrik</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td><code translate="no">IVF64,Flat</code></td><td>Jumlah daftar terbalik yang akan dicari.</td></tr>
<tr><td><code translate="no">efSearch</code></td><td><code translate="no">HNSW16,Flat</code></td><td>Ukuran daftar kandidat pencarian HNSW.</td></tr>
<tr><td><code translate="no">k_factor</code></td><td><code translate="no">IVF64,PQ8x4,RFlat</code></td><td>Jumlah kandidat yang disediakan ke refiner terkait dengan top-K yang diminta.</td></tr>
</tbody>
</table>
<p>Milvus hanya meneruskan parameter tambahan yang dikenali oleh adaptor. Kunci build dan kunci pencarian yang tidak dikenal, yang tidak didukung oleh keluarga pabrik konkret, akan ditolak. Milvus tidak memelihara skema parameter universal untuk setiap pabrik yang mungkin. Periksa dokumentasi Faiss untuk pabrik yang dipilih, lalu validasi alur pembangunan dan pencarian secara menyeluruh terhadap versi dan gambar Milvus yang tepat yang akan Anda terapkan.</p>
<h2 id="Handle-errors-and-unsupported-operations" class="common-anchor-header">Tangani kesalahan dan operasi yang tidak didukung<button data-href="#Handle-errors-and-unsupported-operations" class="anchor-icon" translate="no">
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
<li><p>Jika string pabrik tidak valid atau tidak tersedia dalam build Milvus, pembuatan indeks akan gagal. Periksa status indeks dan alasan kegagalan sebelum memuat koleksi.</p></li>
<li><p>Jika tipe parameter salah, pencarian akan gagal. Misalnya, ` <code translate="no">nprobe=&quot;invalid&quot;</code> ` ditolak karena ` <code translate="no">nprobe</code> ` harus berupa angka.</p></li>
<li><p>Jika suatu parameter tidak berlaku untuk factory yang dibangun, adaptor akan menolaknya karena tidak didukung.</p></li>
<li><p>Jika sebuah factory tidak mendukung selektor Milvus, pencarian yang difilter dapat gagal meskipun factory yang sama dapat melakukan pencarian di Faiss standalone.</p></li>
<li><p>Jangan gunakan <code translate="no">search_iterator()</code> dengan indeks <code translate="no">FAISS</code>.</p></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Langkah Selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Pelajari bagaimana indeks Milvus diorganisasikan di <a href="/docs/id/index-explained.md">Penjelasan Indeks</a>.</li>
<li>Bandingkan jenis indeks khusus <a href="/docs/id/ivf-flat.md">IVF_FLAT</a> dan <a href="/docs/id/hnsw.md">HNSW</a>.</li>
<li>Tinjau " <a href="/docs/id/metric.md">Jenis Metrik</a> " sebelum memilih metrik untuk pabrik.</li>
</ul>
