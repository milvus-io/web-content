---
id: search-aggregation.md
title: Agregasi PencarianCompatible with Milvus 3.0.x
summary: >-
  Kelompokkan hasil pencarian vektor ke dalam kelompok-kelompok, hitung metrik
  per kelompok, urutkan kelompok-kelompok tersebut, dan kembalikan hasil yang
  representatif.
beta: Milvus 3.0.x
---
<h1 id="Search-Aggregation" class="common-anchor-header">Agregasi Pencarian<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>Ketika seorang pembeli mencari “sepatu lari hitam untuk latihan harian,” pencarian approximate nearest neighbor (ANN) mengurutkan produk berdasarkan kemiripan vektor dan menghasilkan daftar Top-K yang datar. Hasilnya mungkin relevan tetapi berulang: dalam contoh di bawah ini, empat dari enam hasil pertama adalah produk Merek A, sedangkan Merek B dan Merek C masing-masing muncul satu kali.</p>
<p>Daftar datar tidak dapat secara langsung memberikan ringkasan yang berorientasi pada kelompok. Sebuah aplikasi mungkin perlu membandingkan merek berdasarkan jumlah kandidat yang disimpan atau harga rata-rata, memeriksa sejumlah kecil produk representatif dari setiap merek, atau mengorganisir hasil ke dalam beberapa tingkatan kelompok.</p>
<p>Agregasi Pencarian mengelompokkan kandidat ANN yang disimpan ke dalam bucket berdasarkan bidang skalar yang dipilih. Dalam contoh ini, setiap merek menjadi bucket tersendiri. Milvus dapat menghitung statistik untuk setiap bucket, mengurutkan bucket-bucket tersebut, dan melampirkan produk-produk yang representatif. Aplikasi mengonsumsi respons berbasis bucket ini melalui <code translate="no">result.agg_buckets</code>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>Hasil pencarian sepatu lari yang datar berubah menjadi sekumpulan kelompok merek yang dapat dibandingkan</span>
  
 </span></p>
<p>Agregasi Pencarian tidak menjalankan agregasi koleksi penuh yang tepat. Keberadaan kelompok, jumlah, metrik, urutan, dan hasil yang representatif bergantung pada kandidat yang disimpan oleh ANN dan tahap pengelompokan.</p>
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
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="ANN candidates grouped by bucket keys and returned with counts, metrics, and representative hits" class="doc-image" id="ann-candidates-grouped-by-bucket-keys-and-returned-with-counts,-metrics,-and-representative-hits" /> 
   <span>Kandidat ANN yang dikelompokkan berdasarkan kunci bucket dan dikembalikan bersama jumlah, metrik, serta hasil yang mewakili</span>
  
 </span></p>
<ol>
<li><p><strong>Mengambil kandidat.</strong> Milvus menjalankan pencarian ANN untuk menemukan entitas yang paling dekat dengan vektor kueri. Tahap pengelompokan kemudian mempertahankan sejumlah kandidat yang dibatasi untuk setiap kunci komposit lengkap. Batas kandidat per kunci ini adalah yang terbesar <code translate="no">TopHits.size</code> di mana pun dalam pohon agregasi, atau <code translate="no">1</code> ketika tidak ada tingkat yang mengonfigurasi <code translate="no">top_hits</code>.</p></li>
<li><p><strong>Membuat bucket.</strong> <code translate="no">SearchAggregation.fields</code> menentukan kunci bucket. Setiap kombinasi unik nilai bidang menghasilkan kunci terpisah. Pada gambar, <code translate="no">fields=[&quot;brand&quot;]</code> menghasilkan kunci bucket <code translate="no">(Brand A)</code>, <code translate="no">(Brand B)</code>, dan <code translate="no">(Brand C)</code>. Kandidat yang dipertahankan dengan kunci yang sama termasuk dalam bucket yang sama dan berkontribusi pada <code translate="no">count</code>-nya. <code translate="no">SearchAggregation.size</code> membatasi jumlah bucket yang dikembalikan oleh Milvus.</p></li>
<li><p><strong>Hitung dan kembalikan hasil.</strong> Setiap bucket yang dikembalikan berisi kuncinya dan jumlah kandidat yang dipertahankan. Milvus juga dapat menghitung metrik yang dikonfigurasi, mengurutkan bucket, mengembalikan entitas representatif, dan membangun bucket anak. Setiap <code translate="no">AggregationBucket</code> di <code translate="no">result.agg_buckets</code> mengekspos <code translate="no">key</code>, <code translate="no">count</code>, <code translate="no">metrics</code>, <code translate="no">hits</code>, dan <code translate="no">sub_groups</code>. Saat Search Aggregation diaktifkan, daftar hasil pencarian biasa kosong.</p></li>
</ol>
<p>Dalam diagram, <code translate="no">TopHits.size=4</code> menyediakan anggaran kandidat per kunci sebesar empat, sehingga empat kandidat Merek A yang dipertahankan menghasilkan <code translate="no">count: 4</code>. Kartu Merek A yang telah selesai hanya menampilkan dua dari empat hasil representatif yang dikembalikan agar gambar tetap ringkas.</p>
<p>Dengan " <code translate="no">sub_aggregation</code>", Milvus mengulangi langkah 2 dan 3 di dalam setiap bucket induk. Perubahan pada recall ANN atau anggaran kandidat per kunci dapat mengubah jumlah bucket, metrik, urutan, hasil pencarian, dan hasil bersarang.</p>
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
    </button></h2><p>Sebelum menggunakan Search Aggregation, perhatikan batasan berikut:</p>
<ul>
<li><p><strong>Agregasi bersarang:</strong> Sebuah permintaan dapat berisi satu <code translate="no">SearchAggregation</code> akar dan hingga tiga tingkat <code translate="no">sub_aggregation</code> bersarang, dengan total maksimal empat tingkat. Di seluruh tingkat, paling banyak 10 bidang dapat digunakan untuk membuat kunci bucket.</p></li>
<li><p><strong>Kolom yang digunakan untuk membuat kunci bucket:</strong> <code translate="no">SearchAggregation.fields</code> mendukung kolom Boolean, integer, <code translate="no">VARCHAR</code>, dan <code translate="no">TIMESTAMPTZ</code>. Fitur ini tidak mendukung kolom <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">ARRAY</code>, <code translate="no">JSON</code>, <code translate="no">GEOMETRY</code>, <code translate="no">TEXT</code>, vektor, atau kolom dinamis.</p></li>
<li><p><strong>Bidang metrik:</strong> <code translate="no">count</code> menerima <code translate="no">&quot;*&quot;</code> atau bidang apa pun yang bukan<code translate="no">JSON</code> dan bukan bidang dinamis, serta mengabaikan nilai <code translate="no">NULL</code> saat bidang ditentukan. <code translate="no">sum</code> dan <code translate="no">avg</code> menerima bidang bilangan bulat dan bilangan desimal. <code translate="no">min</code> dan <code translate="no">max</code> juga menerima bidang string dan <code translate="no">TIMESTAMPTZ</code>.</p></li>
<li><p><strong>Kolom penyortiran Top Hits:</strong> <code translate="no">TopHits.sort</code> mendukung kolom Boolean, integer, floating-point, string, dan <code translate="no">TIMESTAMPTZ</code> yang dapat dibandingkan, serta <code translate="no">_score</code>. Kolom ini tidak mendukung <code translate="no">ARRAY</code>, <code translate="no">JSON</code>, <code translate="no">GEOMETRY</code>, vektor, atau kolom dinamis.</p></li>
<li><p><strong>Anggaran kandidat:</strong> Nilai <code translate="no">TopHits.size</code> terbesar di mana pun dalam pohon agregasi juga merupakan jumlah kandidat yang disimpan per kunci komposit lengkap. Jika tidak ada tingkat yang mengonfigurasi <code translate="no">top_hits</code>, Milvus menyimpan satu kandidat per kunci. Bucket <code translate="no">count</code> dan metrik dihitung dari kandidat yang disimpan ini, sehingga mengubah <code translate="no">TopHits.size</code> dapat mengubahnya.</p></li>
<li><p><strong>Bidang bucket yang dapat bernilai null:</strong> Nilai ` <code translate="no">NULL</code> ` membentuk kunci bucket tersendiri. Untuk mengecualikan bucket null, tambahkan filter seperti ` <code translate="no">brand is not null</code> ` ke permintaan pencarian.</p></li>
<li><p><strong>Kolom yang diulang:</strong> Kolom yang sama tidak boleh muncul di lebih dari satu daftar <code translate="no">SearchAggregation.fields</code>. Misalnya, jika agregasi akar menggunakan <code translate="no">fields=[&quot;category&quot;]</code>, <code translate="no">sub_aggregation</code> yang bersarang tidak boleh juga menggunakan <code translate="no">fields=[&quot;category&quot;]</code>.</p></li>
<li><p><strong>Kombinasi yang tidak didukung:</strong> Search Aggregation tidak dapat digabungkan dengan <code translate="no">offset</code> yang nilainya bukan nol, Search Iterators, Hybrid Search, Highlighter, atau Grouping Search. Nilai <code translate="no">offset</code> tingkat atas berupa <code translate="no">0</code> setara dengan mengabaikan parameter tersebut. Dalam permintaan pencarian REST v2, <code translate="no">searchAggregation</code> dan <code translate="no">ids</code> tidak dapat ditentukan secara bersamaan.</p></li>
<li><p><strong>Entri yang dikembalikan:</strong> Secara default, Milvus menolak permintaan Search Aggregation jika jumlah maksimum entri hasil yang dihitung melebihi 10.000. Ambang batas ini dikendalikan oleh <code translate="no">proxy.maxSearchAggregationResultEntries</code>. Atur nilai konfigurasi menjadi <code translate="no">0</code> atau angka negatif untuk menonaktifkan pemeriksaan ini.</p>
<p>Milvus menghitung batas maksimum ini sebagai berikut:</p>
<p><code translate="no">number of query vectors × product of the effective search_size at every aggregation level × largest TopHits.size at any level</code></p>
<p>Untuk perhitungan sisi server ini, nilai ` <code translate="no">search_size</code> ` yang berlaku pada suatu level adalah ` <code translate="no">search_size</code>` yang dikonfigurasi secara eksplisit, atau ` <code translate="no">size</code> ` pada level tersebut jika ` <code translate="no">search_size</code> ` diabaikan. API PyMilvus yang digunakan dalam panduan ini saat ini tidak mengekspos ` <code translate="no">search_size</code>`, sehingga permintaan PyMilvus menggunakan ` <code translate="no">size</code> ` pada setiap level untuk perhitungan ini. Gunakan <code translate="no">1</code> untuk faktor terakhir jika tidak ada level yang mengonfigurasi <code translate="no">TopHits</code>. Misalnya, satu vektor kueri, 10 root bucket, lima child bucket per root bucket, dan dua hits per child bucket menghasilkan nilai maksimum yang dihitung sebesar:</p>
<p><code translate="no">1 × 10 × 5 × 2 = 100</code></p></li>
</ul>
<h2 id="Use-Search-Aggregation" class="common-anchor-header">Gunakan Agregasi Pencarian<button data-href="#Use-Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h2><p>Pilih contoh berdasarkan tujuan yang ingin Anda capai:</p>
<table>
<thead>
<tr><th>Buka</th><th>Deskripsi</th><th>Pengaturan utama</th></tr>
</thead>
<tbody>
<tr><td><a href="#Compare-and-sort-buckets">Bandingkan dan urutkan bucket</a></td><td>Hitung statistik per bucket untuk membandingkan bucket, lalu urutkan bucket yang ditampilkan berdasarkan metrik, jumlah, atau kunci.</td><td><code translate="no">fields</code>, <code translate="no">size</code>, <code translate="no">metrics</code>, <code translate="no">order</code></td></tr>
<tr><td><a href="#Show-representative-results-from-each-bucket">Tampilkan hasil representatif dari setiap bucket</a></td><td>Kembalikan sejumlah entitas terbatas dari setiap bucket dan urutkan entitas-entitas tersebut secara terpisah berdasarkan bidang skalar atau skor vektor.</td><td><code translate="no">top_hits</code>, <code translate="no">TopHits.size</code>, <code translate="no">TopHits.sort</code></td></tr>
<tr><td><a href="#Group-results-at-multiple-levels">Kelompokkan hasil pada beberapa tingkatan</a></td><td>Atur hasil ke dalam tingkatan bucket induk dan anak untuk menganalisis berbagai dimensi secara berurutan.</td><td><code translate="no">sub_aggregation</code></td></tr>
</tbody>
</table>
<p>Contoh di bawah ini menggunakan koleksi produk dengan bidang merek, kategori, warna, harga, dan peringkat. Semua nama merek, nama produk, harga, peringkat, dan hasil pencarian merupakan data contoh sintetis. Perluas bagian berikut untuk membuat koleksi dan mendefinisikan variabel pencarian bersama.</p>
<p><details></p>
<p><summary>Siapkan koleksi contoh</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, SearchAggregation, TopHits

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

collection_name = <span class="hljs-string">&quot;product_search_aggregation&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embedding&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(<span class="hljs-string">&quot;name&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">200</span>)
schema.add_field(<span class="hljs-string">&quot;brand&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;color&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">50</span>)
schema.add_field(<span class="hljs-string">&quot;price&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;rating&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;in_stock&quot;</span>, DataType.BOOL)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    <span class="hljs-comment"># Make preceding writes visible to searches from this client.</span>
    consistency_level=<span class="hljs-string">&quot;Session&quot;</span>,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Trail A2&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner C1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand C&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A3&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Pengaturan di atas mengonfigurasi <code translate="no">COSINE</code> untuk indeks vektor dan parameter pencarian. Oleh karena itu, contoh-contoh selanjutnya menggunakan <code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> untuk menempatkan kesamaan kosinus yang lebih tinggi terlebih dahulu. Untuk metrik jarak seperti <code translate="no">L2</code>, gunakan <code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code>.</p>
<h3 id="Compare-and-sort-buckets" class="common-anchor-header">Membandingkan dan mengurutkan bucket<button data-href="#Compare-and-sort-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan pola ini saat Anda perlu membandingkan kelompok entitas yang diambil menggunakan statistik yang dihitung dan mengontrol urutan pengembalian bucket. Dalam contoh ini, Milvus mengelompokkan produk yang diambil berdasarkan <code translate="no">brand</code>, menghitung metrik harga untuk setiap bucket merek, dan mengurutkan bucket berdasarkan harga rata-rata.</p>
<p>Jika tujuan Anda hanya untuk meningkatkan keragaman hasil dengan mengembalikan satu atau lebih entitas per nilai bidang, gunakan <a href="/docs/id/grouping-search.md">Pencarian Pengelompokan</a> sebagai gantinya.</p>
<p>Konfigurasi berikut ini membuat hingga tiga bucket merek, menghitung metrik untuk setiap bucket, dan mengurutkan bucket berdasarkan harga rata-rata:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span></span>
<span class="highlighted-comment-line">    size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Calculate named metrics for every selected bucket.</span></span>
<span class="highlighted-comment-line">    metrics={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;min_price&quot;</span>: {<span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Sort buckets by average price, highest first.</span></span>
<span class="highlighted-comment-line">    order=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;avg_price&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># If average prices are equal, sort by bucket key in ascending order.</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;_key&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Berikan objek tersebut ke parameter ` <code translate="no">search_aggregation</code> ` dari ` <code translate="no">MilvusClient.search()</code>`:</p>
<pre><code translate="no" class="language-python">result = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    search_params=search_params,
    output_fields=[
        <span class="hljs-string">&quot;name&quot;</span>,
        <span class="hljs-string">&quot;brand&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;color&quot;</span>,
        <span class="hljs-string">&quot;price&quot;</span>,
        <span class="hljs-string">&quot;rating&quot;</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>,
    ],
<span class="highlighted-wrapper-line">    search_aggregation=aggregation,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Saat ` <code translate="no">search_aggregation</code> ` diatur, PyMilvus tidak mengembalikan entitas biasa dalam ` <code translate="no">result[0]</code>`. Baca respons bucket dari ` <code translate="no">result.agg_buckets[0]</code> ` sebagai gantinya. Parameter ` <code translate="no">output_fields</code> ` mengontrol bidang skalar mana yang muncul dalam setiap pemetaan ` <code translate="no">AggregationHit.fields</code> ` yang dikembalikan; Milvus tetap dapat menggunakan bidang sumber metrik dan bidang pengurutan yang tidak tercantum dalam ` <code translate="no">output_fields</code>`.</p>
<p><details></p>
<p><summary>Lihat contoh keluaran bucket</summary></p>
<p>Output berikut diambil dari permintaan di atas dan diserialisasikan sebagai JSON agar mudah dibaca. PyMilvus mengembalikan objek ` <code translate="no">AggregationBucket</code> `, bukan JSON. Nilai ` <code translate="no">key</code> ` selalu berupa daftar terurut dari komponen kunci, bahkan ketika ` <code translate="no">fields</code> ` hanya berisi satu bidang. Hal ini menjaga urutan bidang untuk kunci gabungan.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand C&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Untuk vektor kueri tunggal dalam panduan ini, bacalah bucket tingkat atas yang dikembalikan dari ` <code translate="no">result.agg_buckets[0]</code>`. Setiap bucket menampilkan komponen kunci yang terurut, `retained-candidate` (` <code translate="no">count</code>`), `calculated` (` <code translate="no">metrics</code>`), `representative` (` <code translate="no">hits</code>`), dan bucket bersarang di ` <code translate="no">sub_groups</code>`.</p>
<p>Baca konfigurasi sebagai berikut:</p>
<table>
<thead>
<tr><th>Pengaturan</th><th>Apa yang dikendalikan</th><th>Dalam contoh ini</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td>Bagaimana Milvus membuat kunci bucket</td><td>Membuat satu bucket untuk setiap nilai <code translate="no">brand</code> yang berbeda.</td></tr>
<tr><td><code translate="no">size</code></td><td>Jumlah maksimum bucket yang dikembalikan</td><td>Mengembalikan hingga tiga bucket merek.</td></tr>
<tr><td><code translate="no">metrics</code></td><td>Statistik yang dihitung untuk setiap bucket</td><td>Menghitung jumlah produk, harga rata-rata, dan harga minimum.</td></tr>
<tr><td><code translate="no">order</code></td><td>Cara Milvus mengurutkan bucket yang dikembalikan</td><td>Mengurutkan berdasarkan harga rata-rata, kemudian menggunakan kunci bucket untuk menentukan urutan jika terjadi kesamaan.</td></tr>
</tbody>
</table>
<p>Milvus mengabaikan " <code translate="no">limit</code> " ketika " <code translate="no">search_aggregation</code> " diatur. Gunakan nilai " <code translate="no">SearchAggregation.size</code> " akar untuk mengontrol jumlah bucket tingkat atas.</p>
<p>Dengan pengaturan ini, Milvus mengembalikan bucket Merek B, Merek A, dan Merek C dalam urutan harga rata-rata ( <code translate="no">avg_price</code> ) menurun. Kriteria ` <code translate="no">_key</code> ` hanya berlaku ketika bucket memiliki harga rata-rata yang sama. Karena konfigurasi ini tidak mendefinisikan ` <code translate="no">top_hits</code>`, daftar ` <code translate="no">hits</code> ` setiap bucket kosong dan anggaran kandidat per kunci adalah ` <code translate="no">1</code>`. Oleh karena itu, jumlah dan metrik yang ditampilkan menggambarkan satu kandidat yang dipertahankan per merek. Konfigurasikan ` <code translate="no">top_hits</code> ` dengan ` <code translate="no">TopHits.size</code> ` yang lebih besar ketika agregasi memerlukan jendela metrik per kunci yang lebih luas.</p>
<p><details></p>
<p><summary>Aturan metrik dan urutan</summary></p>
<p>Setiap entri <code translate="no">SearchAggregation.metrics</code> memetakan alias yang ditentukan pengguna ke <code translate="no">{operation: source}</code>:</p>
<table>
<thead>
<tr><th>Sumber</th><th>Operasi yang didukung</th><th>Perilaku</th></tr>
</thead>
<tbody>
<tr><td>Setiap bidang yang bukan<code translate="no">JSON</code> dan bukan bidang dinamis</td><td><code translate="no">count</code></td><td>Menghitung kandidat yang dipertahankan yang bidang sumbernya bukan <code translate="no">NULL</code>.</td></tr>
<tr><td>Bidang bilangan bulat atau bilangan pecahan</td><td><code translate="no">sum</code>, ` <code translate="no">avg</code>`, ` <code translate="no">min</code>`, <code translate="no">max</code></td><td>Menghitung nilai yang dipertahankan yang tidak null.</td></tr>
<tr><td>Bidang string atau <code translate="no">TIMESTAMPTZ</code> </td><td><code translate="no">min</code>, <code translate="no">max</code></td><td>Memilih nilai yang disimpan non-null minimum atau maksimum.</td></tr>
<tr><td><code translate="no">&quot;*&quot;</code></td><td><code translate="no">count</code></td><td>Menghitung setiap kandidat yang dipertahankan dalam bucket. Hasilnya sesuai dengan <code translate="no">bucket.count</code>.</td></tr>
<tr><td><code translate="no">_score</code></td><td><code translate="no">sum</code>, <code translate="no">avg</code>, <code translate="no">min</code>, <code translate="no">max</code></td><td>Menghitung nilai kesamaan atau jarak ANN untuk kandidat yang dipertahankan.</td></tr>
</tbody>
</table>
<p><code translate="no">SearchAggregation.order</code> menerima kunci-kunci berikut:</p>
<table>
<thead>
<tr><th>Kunci urutan</th><th>Arti</th></tr>
</thead>
<tbody>
<tr><td>Alias metrik</td><td>Mengurutkan berdasarkan nilai yang dihitung dalam <code translate="no">metrics</code> pada tingkat agregasi yang sama, seperti <code translate="no">avg_price</code>.</td></tr>
<tr><td><code translate="no">_count</code></td><td>Mengurutkan berdasarkan jumlah kandidat yang disimpan di setiap bucket.</td></tr>
<tr><td><code translate="no">_key</code></td><td>Mengurutkan berdasarkan kunci bucket, bukan berdasarkan bidang koleksi bernama <code translate="no">_key</code>.</td></tr>
</tbody>
</table>
<p>Setiap entri ` <code translate="no">order</code> ` memetakan kunci ke ` <code translate="no">&quot;asc&quot;</code> ` atau ` <code translate="no">&quot;desc&quot;</code>`. Milvus mengevaluasi entri-entri tersebut dari yang pertama hingga yang terakhir. Jika Anda mengabaikan ` <code translate="no">order</code>`, Milvus mempertahankan urutan penemuan bucket dari himpunan kandidat yang dipertahankan.</p>
<p>Untuk mengurutkan bucket berdasarkan kualitas kecocokan vektor, pertama-tama hitung metrik tingkat bucket dari <code translate="no">_score</code>, lalu gunakan alias metrik tersebut di <code translate="no">order</code>. Anda tidak dapat menggunakan <code translate="no">_score</code> secara langsung sebagai kunci urutan bucket karena setiap bucket dapat berisi beberapa skor entitas. Misalnya, dengan <code translate="no">COSINE</code> atau <code translate="no">IP</code>:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
    metrics={<span class="hljs-string">&quot;max_score&quot;</span>: {<span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-string">&quot;_score&quot;</span>}},
    order=[{<span class="hljs-string">&quot;max_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
)
<button class="copy-code-btn"></button></code></pre>
<p>Dengan <code translate="no">L2</code>, hitung nilai <code translate="no">_score</code> terendah dan urutkan alias metrik secara ascending sehingga bucket dengan jarak terendah muncul terlebih dahulu.</p>
<p></details></p>
<p><details></p>
<p><summary>Buat kunci bucket gabungan</summary></p>
<p>Untuk membuat kunci bucket gabungan, masukkan beberapa nama bidang dalam daftar yang sama:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],</span>
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Konfigurasi ini dapat menghasilkan kunci seperti <code translate="no">(Brand A, black)</code>, <code translate="no">(Brand A, blue)</code>, dan <code translate="no">(Brand B, white)</code>. Dua entitas hanya berbagi bucket jika kedua nilainya cocok. Milvus mempertahankan urutan daftar, sehingga <code translate="no">brand</code> menjadi komponen kunci pertama dan <code translate="no">color</code> menjadi yang kedua. Saat <code translate="no">_key</code> digunakan dalam <code translate="no">order</code>, Milvus membandingkan komponen kunci gabungan dalam urutan yang sama. Masukkan beberapa string dalam satu daftar datar; daftar bersarang tidak didukung.</p>
<p><code translate="no">size=6</code> adalah jumlah maksimum bucket gabungan yang dikembalikan pada tingkat agregasi ini. Data contoh berisi lima kombinasi merek-warna yang berbeda, sehingga kelimanya dapat dikembalikan. Dalam <a href="#Limits">batas entri yang dikembalikan</a>, permintaan ini menyumbang <code translate="no">1 query vector × 6 buckets × 1 = 6</code> entri hasil yang dikonfigurasi.</p>
<p>Beberapa bidang dalam satu daftar ` <code translate="no">SearchAggregation.fields</code> ` membentuk kunci bucket komposit pada tingkat agregasi tersebut. Untuk membuat hierarki bucket induk-anak, gunakan <a href="#Group-results-at-multiple-levels">agregasi bersarang</a>.</p>
<p></details></p>
<p>Contoh-contoh berikut mendefinisikan ulang ` <code translate="no">aggregation</code>`. Berikan objek yang telah diperbarui ke parameter ` <code translate="no">search_aggregation</code> ` yang sama dan jalankan kembali panggilan pencarian.</p>
<h3 id="Show-representative-results-from-each-bucket" class="common-anchor-header">Tampilkan hasil representatif dari setiap bucket<button data-href="#Show-representative-results-from-each-bucket" class="anchor-icon" translate="no">
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
    </button></h3><p>Sertakan entitas representatif saat aplikasi perlu menampilkan produk aktual dari setiap bucket. Dalam contoh ini, Milvus mengembalikan hingga dua produk dari setiap bucket merek, diurutkan berdasarkan peringkat dan kemudian berdasarkan skor vektor.</p>
<p>Konfigurasikan ` <code translate="no">TopHits</code> ` sebagai berikut:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return and sort representative entities for each selected bucket.</span></span>
<span class="highlighted-comment-line">    top_hits=TopHits(</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Return up to two entities per bucket.</span></span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Apply sort criteria in list order.</span></span>
<span class="highlighted-comment-line">        sort=[</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        ],</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Lihat bucket dengan hasil yang representatif</summary></p>
<p>Bucket Merek A berikut ini diambil dari permintaan di atas dan diserialisasikan sebagai JSON agar mudah dibaca.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.99976646900177</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;black&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner A1&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997048377990723</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;blue&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Trail A2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">139.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.6</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<table>
<thead>
<tr><th>Parameter</th><th>Tujuan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">top_hits</code></td><td>Opsional. Mengonfigurasi entitas representatif untuk tingkat agregasi ini. Jika diabaikan, ` <code translate="no">bucket.hits</code> ` akan kosong dan anggaran kandidat per kunci secara default ditetapkan menjadi satu.</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>Mengembalikan hingga dua entitas representatif dari setiap bucket yang dipilih dan menetapkan anggaran kandidat per-kunci menjadi dua untuk seluruh pohon agregasi.</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>Mengurutkan entitas di dalam setiap bucket menggunakan kriteria yang tercantum.</td></tr>
</tbody>
</table>
<p>Konfigurasikan ` <code translate="no">top_hits</code> ` ketika aplikasi memerlukan entitas representatif atau ketika hitungan dan metrik memerlukan jendela kandidat per-kunci yang lebih luas. Nilai ` <code translate="no">TopHits.size</code> ` yang lebih besar meningkatkan baik anggaran kandidat maupun perhitungan entri maksimum yang dikembalikan di <a href="#Limits">`Limits`</a>.</p>
<p><code translate="no">SearchAggregation.order</code> mengurutkan bucket, sedangkan " <code translate="no">TopHits.sort</code> " mengurutkan entitas yang dipertahankan di dalam setiap bucket. Urutan pengurutan tidak mengubah kandidat mana yang dipertahankan untuk " <code translate="no">count</code> " dan metrik. " <code translate="no">TopHits.sort</code> " menerima nama bidang skalar yang dapat dibandingkan yang didukung serta bidang bawaan " <code translate="no">_score</code> ", yang mewakili kemiripan atau jarak ANN. Milvus mengevaluasi entri " <code translate="no">sort</code> " dari yang pertama hingga yang terakhir. Dalam contoh ini, produk diurutkan berdasarkan <code translate="no">rating</code> dari nilai tertinggi ke terendah dan menggunakan <code translate="no">_score</code> hanya ketika dua penilaian sama. Karena pengaturan menggunakan <code translate="no">COSINE</code>, urutan menurun <code translate="no">_score</code> menempatkan produk yang lebih serupa di urutan pertama.</p>
<p>Kolom yang digunakan oleh <code translate="no">metrics</code> atau <code translate="no">TopHits.sort</code> tidak harus muncul di <code translate="no">output_fields</code>. Milvus mengambil kolom-kolom tersebut secara internal, tetapi hanya kolom yang secara eksplisit tercantum di <code translate="no">output_fields</code> yang disertakan dalam pemetaan <code translate="no">fields</code> setiap hasil yang dikembalikan. Kunci utama dan skor vektor tetap tersedia melalui <code translate="no">AggregationHit.pk</code> dan <code translate="no">AggregationHit.score</code>.</p>
<p>Setiap hasil yang dikembalikan <code translate="no">AggregationHit</code> menampilkan kunci utamanya di <code translate="no">pk</code>, skor vektor di <code translate="no">score</code>, dan bidang keluaran yang diminta di <code translate="no">fields</code>.</p>
<h3 id="Group-results-at-multiple-levels" class="common-anchor-header">Mengelompokkan hasil pada beberapa tingkatan<button data-href="#Group-results-at-multiple-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan agregasi bersarang saat Anda memerlukan satu tingkat bucket di dalam tingkat lainnya. Dalam contoh ini, Milvus membuat bucket kategori terlebih dahulu, lalu membuat bucket merek di dalam setiap kategori.</p>
<p>Agregasi anak hanya menerima entitas yang ditugaskan ke bucket induknya. <code translate="no">fields</code> mengontrol kunci bucket di setiap tingkat agregasi, sedangkan <code translate="no">sub_aggregation</code> membuat hierarki induk-anak.</p>
<p>Konfigurasi di bawah ini membuat bucket kategori dengan kunci <code translate="no">(running_shoes)</code>. Di dalam bucket induk tersebut, agregasi anak membuat bucket merek terpisah dengan kunci seperti <code translate="no">(Brand A)</code>, <code translate="no">(Brand B)</code>, dan <code translate="no">(Brand C)</code>.</p>
<pre><code translate="no" class="language-text">Parent bucket key:
(running_shoes)

Child bucket keys:
├── (Brand A)
├── (Brand B)
└── (Brand C)
<button class="copy-code-btn"></button></code></pre>
<p>Setiap tingkatan dapat menggunakan beberapa bidang secara independen. Misalnya, penggunaan <code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code> dalam agregasi anak akan menghasilkan kunci anak gabungan seperti <code translate="no">(Brand A, black)</code>.</p>
<p>Konfigurasi berikut mengimplementasikan hierarki ini:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;category&quot;</span>],
    size=<span class="hljs-number">2</span>,
    metrics={
        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},
        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},
    },
    order=[{<span class="hljs-string">&quot;product_count&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
<span class="highlighted-comment-line">    <span class="hljs-comment"># For each category bucket, group only its entities by brand.</span></span>
<span class="highlighted-comment-line">    sub_aggregation=SearchAggregation(</span>
<span class="highlighted-comment-line">        fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">        metrics={</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;avg_rating&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;rating&quot;</span>},</span>
<span class="highlighted-comment-line">        },</span>
<span class="highlighted-comment-line">        order=[{<span class="hljs-string">&quot;avg_rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        top_hits=TopHits(</span>
<span class="highlighted-comment-line">            size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">            sort=[{<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        ),</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Lihat hasil bucket bersarang</summary></p>
<p>Kutipan serialisasi berikut menunjukkan bucket induk <code translate="no">running_shoes</code> dan bucket anak Brand B-nya. Bucket anak Brand A dan Brand C dihilangkan demi singkatnya.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">137.49</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;avg_rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;brand_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9994542598724365</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner B1&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Hasil yang ditampilkan mewakili jalur bucket <code translate="no">(running_shoes) → (Brand B)</code>, bukan kunci bucket komposit tunggal <code translate="no">(running_shoes, Brand B)</code>.</p>
<p>Milvus pertama-tama memilih hingga dua bucket kategori, diurutkan berdasarkan <code translate="no">product_count</code>. Selanjutnya, Milvus menjalankan <code translate="no">sub_aggregation</code> secara independen di dalam setiap kategori yang dipilih dan mengembalikan hingga tiga bucket merek, diurutkan berdasarkan <code translate="no">avg_rating</code>.</p>
<p>Pada keluaran di atas:</p>
<ul>
<li>Bucket akar ` <code translate="no">running_shoes</code> ` berisi empat kandidat yang dipertahankan di seluruh kunci komposit anaknya. Kunci ` <code translate="no">metrics</code> `-nya berisi nilai ` <code translate="no">avg_price</code> ` dan ` <code translate="no">product_count</code> ` tingkat akar.</li>
<li>Daftar <code translate="no">sub_groups</code> bucket akar berisi bucket merek anak. Bucket Merek B yang ditampilkan berisi satu kandidat yang dipertahankan serta nilai <code translate="no">avg_rating</code> dan <code translate="no">brand_count</code> miliknya sendiri.</li>
<li>Daftar <code translate="no">hits</code> pada bucket akar kosong karena agregasi akar tidak mengonfigurasi <code translate="no">top_hits</code>. Bucket anak Merek B berisi hit representatif karena <code translate="no">top_hits</code> dikonfigurasi di <code translate="no">sub_aggregation</code>.</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-accurate-are-bucket-counts-and-metrics" class="common-anchor-header">Seberapa akuratkah jumlah bucket dan metriknya?<button data-href="#How-accurate-are-bucket-counts-and-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>Agregasi Pencarian merangkum kandidat ANN yang dipertahankan. Agregasi ini tidak menjalankan agregasi koleksi penuh.</p>
<p>Retensi kandidat memiliki dua tahap perkiraan. Pencarian ANN dapat mengabaikan entitas koleksi yang relevan, dan tahap pengelompokan menyimpan paling banyak kandidat <code translate="no">TopHits.size</code> terbesar untuk setiap kunci komposit lengkap. Jika tidak ada tingkat yang mengonfigurasi <code translate="no">top_hits</code>, batas per kunci ini adalah satu.</p>
<p>Misalnya, anggaplah sebuah koleksi berisi 5.000 produk Merek A dan banyak di antaranya relevan dengan kueri vektor. Jika agregasi menggunakan ` <code translate="no">TopHits(size=4)</code>`, bucket Merek A dapat mempertahankan paling banyak empat kandidat untuk satu kunci komposit lengkap. ` <code translate="no">count</code> ` dan metriknya menggambarkan kandidat-kandidat yang dipertahankan tersebut, bukan semua produk Merek A yang relevan dan bukan semua 5.000 entitas koleksi.</p>
<p>Perkiraan menjadi sangat penting ketika ` <code translate="no">order</code> ` menggunakan alias metrik. Perubahan pada recall pencarian dapat mengubah nilai metrik dan karenanya mengubah bucket mana yang sesuai dengan ` <code translate="no">SearchAggregation.size</code>`. Agregasi bersarang dapat memperkuat efek ini karena setiap tingkat anak beroperasi pada entitas yang tersedia di bucket induknya.</p>
<p>Jika Anda memerlukan statistik yang tepat untuk setiap entitas yang cocok, gunakan alur kerja agregasi kueri eksak alih-alih Agregasi Pencarian.</p>
<h3 id="How-does-Search-Aggregation-differ-from-Grouping-Search" class="common-anchor-header">Apa perbedaan antara Search Aggregation dan Grouping Search?<button data-href="#How-does-Search-Aggregation-differ-from-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>Pilihlah berdasarkan bentuk hasil utama aplikasi:</p>
<table>
<thead>
<tr><th>Kebutuhan utama</th><th>Pilihan</th><th>Respons yang akan digunakan</th></tr>
</thead>
<tbody>
<tr><td>Mengembalikan daftar entitas yang diurutkan secara standar dengan lebih sedikit nilai berulang dalam bidang pengelompokan</td><td><a href="/docs/id/grouping-search.md">Pencarian Pengelompokan</a></td><td>Hasil pencarian datar untuk setiap vektor kueri</td></tr>
<tr><td>Periksa atau bandingkan grup sebagai bucket, dengan kunci, jumlah, metrik, urutan, hasil yang representatif, atau bucket anak</td><td>Agregasi Pencarian</td><td><code translate="no">AggregationBucket</code> objek dalam <code translate="no">result.agg_buckets</code></td></tr>
</tbody>
</table>
<p>Bahkan ketika Agregasi Pencarian dikonfigurasi dengan opsi " <code translate="no">top_hits</code>", respons utamanya tetap berupa pohon bucket. Pencarian Berkelompok tetap berguna ketika aplikasi sudah memproses hasil pencarian biasa dan terutama menginginkan keragaman hasil.</p>
<p>API-API ini saling eksklusif. PyMilvus memicu pengecualian " <code translate="no">ParamError</code> " ketika " <code translate="no">search_aggregation</code> " digabungkan dengan " <code translate="no">group_by_field</code> " atau " <code translate="no">group_by_fields</code> " dalam permintaan yang sama.</p>
