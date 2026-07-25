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
    </button></h1><p>Ketika seorang pembeli mencari “sepatu lari hitam untuk latihan harian,” pencarian approximate nearest neighbor (ANN) mengurutkan produk berdasarkan kesamaan vektor dan menghasilkan daftar Top-K yang datar. Hasilnya mungkin relevan tetapi berulang: dalam contoh di bawah ini, empat dari enam hasil pertama adalah produk Nike, sedangkan Adidas dan Puma masing-masing muncul satu kali.</p>
<p>Daftar datar tidak dapat secara langsung memberikan keragaman atau statistik tingkat merek. Sebuah aplikasi mungkin memerlukan hingga dua produk representatif dari setiap merek, jumlah produk yang diambil untuk setiap merek, atau harga rata-rata untuk setiap merek.</p>
<p>Agregasi Pencarian mengelompokkan entitas yang diambil ke dalam kelompok berdasarkan bidang skalar yang dipilih. Dalam contoh ini, setiap merek menjadi kelompok tersendiri. Milvus kemudian dapat menghitung statistik secara terpisah untuk setiap kelompok dan mengembalikan produk representatif dari setiap kelompok, sehingga hasil pencarian lebih mudah dibandingkan dan lebih beragam.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>Hasil pencarian sepatu lari yang datar berubah menjadi sekumpulan kelompok merek yang dapat dibandingkan</span>
  
 </span></p>
<p>Agregasi Pencarian merangkum kandidat yang ditemukan, bukan setiap entitas dalam koleksi. Oleh karena itu, jumlah kelompok dan metrik bersifat perkiraan dan tetap terkait dengan relevansi vektor.</p>
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
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="Three-stage Search Aggregation workflow from ANN retrieval to bucket results" class="doc-image" id="three-stage-search-aggregation-workflow-from-ann-retrieval-to-bucket-results" /> 
   <span>Alur kerja Agregasi Pencarian tiga tahap dari pengambilan ANN hingga hasil bucket</span>
  
 </span></p>
<ol>
<li><p><strong>Mengambil kandidat.</strong> Milvus menjalankan pencarian ANN untuk membuat kumpulan entitas yang paling dekat dengan vektor kueri. Agregasi Pencarian beroperasi pada kumpulan ini, bukan pada setiap entitas dalam koleksi, sehingga kumpulan tersebut menentukan entitas mana yang dapat berkontribusi pada bucket.</p></li>
<li><p><strong>Membuat bucket.</strong> Pengaturan " <code translate="no">SearchAggregation.fields</code> " menentukan bidang skalar yang membentuk kunci setiap bucket. Pada gambar, " <code translate="no">brand</code> " menempatkan enam kandidat ke dalam bucket Nike, Adidas, dan Puma. Saat Anda menentukan beberapa bidang, entitas hanya berbagi bucket jika kombinasi nilai bidangnya cocok.</p></li>
<li><p><strong>Hitung dan kembalikan hasil.</strong> Milvus menghitung metrik yang dikonfigurasi untuk setiap bucket, mengurutkan bucket yang telah selesai, dan menggunakan ` <code translate="no">TopHits</code> ` untuk memilih entitas representatif. Setiap bucket di <code translate="no">result.agg_buckets</code> berisi kunci, jumlah, metrik, hit, dan bucket anak opsional.</p></li>
</ol>
<p>Dengan " <code translate="no">sub_aggregation</code>", Milvus mengulangi langkah 2 dan 3 di dalam setiap bucket induk. Karena setiap tahap beroperasi pada kumpulan pengambilan ANN, perubahan dalam recall pencarian dapat mengubah jumlah bucket, metrik, urutan, hits, dan hasil bersarang.</p>
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
<li><p><strong>Agregasi bersarang:</strong> Sebuah permintaan dapat berisi satu <code translate="no">SearchAggregation</code> akar dan hingga tiga tingkat <code translate="no">sub_aggregation</code> bersarang, dengan total maksimal empat tingkat.</p></li>
<li><p><strong>Kolom yang digunakan untuk membuat kunci bucket:</strong> <code translate="no">SearchAggregation.fields</code> tidak mendukung kolom <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, vektor, <code translate="no">JSON</code>, atau kolom dinamis.</p></li>
<li><p><strong>Kolom metrik dan pengurutan:</strong> <code translate="no">metrics</code> dan <code translate="no">TopHits.sort</code> tidak mendukung <code translate="no">JSON</code> atau kolom dinamis.</p></li>
<li><p><strong>Bidang yang diulang:</strong> Bidang yang sama tidak boleh muncul di lebih dari satu daftar <code translate="no">SearchAggregation.fields</code>. Misalnya, jika agregasi akar menggunakan <code translate="no">fields=[&quot;category&quot;]</code>, <code translate="no">sub_aggregation</code> yang bersarang tidak boleh juga menggunakan <code translate="no">fields=[&quot;category&quot;]</code>.</p></li>
<li><p><strong>Kombinasi yang tidak didukung:</strong> Search Aggregation tidak dapat digabungkan dengan <code translate="no">offset</code>, Search Iterators, Hybrid Search, Highlighter, <code translate="no">group_by_field</code>, atau <code translate="no">group_by_fields</code>.</p></li>
<li><p><strong>Entri yang dikembalikan:</strong> Pertahankan jumlah maksimum entri hasil yang dikonfigurasi pada atau di bawah 10.000. Hitung batas maksimum ini sebagai berikut:</p>
<p><code translate="no">number of query vectors × size at every aggregation level × largest TopHits.size at any level</code></p>
<p>Gunakan <code translate="no">1</code> sebagai faktor terakhir saat tidak ada level yang mengonfigurasi <code translate="no">TopHits</code>. Misalnya, satu vektor kueri, 10 bucket akar, lima bucket anak per bucket akar, dan dua hit per bucket anak menghasilkan batas maksimum yang dikonfigurasi sebesar:</p>
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
    </button></h2><p>Pilih contoh yang sesuai dengan apa yang ingin Anda konfigurasi:</p>
<table>
<thead>
<tr><th>Tujuan</th><th>Pengaturan utama</th><th>Contoh</th></tr>
</thead>
<tbody>
<tr><td>Buat kunci bucket</td><td><code translate="no">fields</code>, <code translate="no">size</code></td><td><a href="#build-bucket-keys">Buat kunci bucket</a></td></tr>
<tr><td>Hitung statistik dan urutkan bucket</td><td><code translate="no">metrics</code>, <code translate="no">order</code></td><td><a href="#calculate-metrics-and-order-buckets">Hitung metrik dan urutkan bucket</a></td></tr>
<tr><td>Mengembalikan dan mengurutkan hit yang representatif</td><td><code translate="no">top_hits</code>, <code translate="no">TopHits.size</code>, <code translate="no">TopHits.sort</code></td><td><a href="#return-and-sort-representative-hits">Mengembalikan dan mengurutkan hasil yang representatif</a></td></tr>
<tr><td>Buat hasil hierarkis</td><td><code translate="no">sub_aggregation</code></td><td><a href="#create-nested-buckets">Buat kelompok bersarang</a></td></tr>
</tbody>
</table>
<p>Contoh di bawah ini menggunakan koleksi produk dengan bidang merek, kategori, warna, harga, dan peringkat. Perluas bagian berikut untuk membuat koleksi dan mendefinisikan variabel pencarian bersama.</p>
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
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Air Zoom Runner&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Pegasus Trail&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Adidas Ultraboost Light&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Adidas&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Puma Velocity Nitro&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Puma&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Windrunner Jacket&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Adidas Own The Run Jacket&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Adidas&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Vomero 17&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike InfinityRN 4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.flush(collection_name)
client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Pengaturan di atas mengonfigurasi ` <code translate="no">COSINE</code> ` untuk indeks vektor dan parameter pencarian. Oleh karena itu, contoh-contoh selanjutnya menggunakan ` <code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> ` untuk menempatkan kesamaan kosinus yang lebih tinggi di urutan pertama. Untuk metrik jarak seperti ` <code translate="no">L2</code>`, gunakan ` <code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code>`.</p>
<h3 id="Build-bucket-keys" class="common-anchor-header">Buat kunci bucket<button data-href="#Build-bucket-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Mulailah dengan membuat objek <code translate="no">SearchAggregation</code>. Konfigurasi berikut membuat satu bucket untuk setiap nilai <code translate="no">brand</code> yang berbeda dan memilih hingga tiga bucket untuk dikembalikan:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span>
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span>
    size=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Parameter yang umum digunakan adalah:</p>
<table>
<thead>
<tr><th>Parameter</th><th>Nilai dalam contoh ini</th><th>Tujuan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td><code translate="no">[&quot;brand&quot;]</code></td><td>Daftar bidang skalar yang tidak kosong yang membentuk kunci bucket. Satu bidang akan menghasilkan kunci satu bagian.</td></tr>
<tr><td><code translate="no">size</code></td><td><code translate="no">3</code></td><td>Jumlah maksimum bucket yang dikembalikan pada tingkat agregasi ini.</td></tr>
</tbody>
</table>
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
<p><details></p>
<p><summary>Lihat contoh keluaran bucket</summary></p>
<p>Output berikut diambil dari permintaan di atas dan diserialisasikan sebagai JSON agar mudah dibaca. PyMilvus mengembalikan objek ` <code translate="no">AggregationBucket</code> `, bukan JSON.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Puma&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Untuk vektor kueri tunggal dalam panduan ini, baca bucket tingkat atas yang dikembalikan dari ` <code translate="no">result.agg_buckets[0]</code>`. Setiap bucket menampilkan ` <code translate="no">key</code>`, entitas `retrieval-pool` di ` <code translate="no">count</code>`, ` <code translate="no">metrics</code>` yang dihitung, ` <code translate="no">hits</code>` yang representatif, dan bucket bersarang di ` <code translate="no">sub_groups</code>`.</p>
<p>Bagian-bagian berikut mendefinisikan ulang ` <code translate="no">aggregation</code> ` untuk kasus penggunaan lainnya. Berikan objek yang telah diperbarui ke parameter ` <code translate="no">search_aggregation</code> ` yang sama dan jalankan kembali panggilan pencarian.</p>
<p>Milvus mengabaikan ` <code translate="no">limit</code> ` saat ` <code translate="no">search_aggregation</code> ` ditetapkan. Gunakan nilai akar ` <code translate="no">SearchAggregation.size</code> ` untuk mengontrol jumlah bucket tingkat atas.</p>
<p>Untuk membuat kunci bucket gabungan, masukkan beberapa nama bidang dalam daftar yang sama:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span>
    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Konfigurasi ini dapat menghasilkan kunci seperti <code translate="no">(Nike, black)</code>, <code translate="no">(Nike, blue)</code>, dan <code translate="no">(Adidas, white)</code>. Dua entitas hanya berbagi bucket jika kedua nilainya cocok. Milvus mempertahankan urutan daftar, sehingga <code translate="no">brand</code> adalah komponen kunci pertama dan <code translate="no">color</code> adalah yang kedua. Masukkan beberapa string dalam satu daftar datar; daftar bersarang tidak didukung.</p>
<p><code translate="no">size=6</code> adalah jumlah maksimum bucket gabungan yang dikembalikan pada tingkat agregasi ini. Data contoh berisi lima kombinasi merek-warna yang berbeda, sehingga kelimanya dapat dikembalikan. Dalam <a href="#limits">batas entri yang dikembalikan</a>, permintaan ini menyumbang <code translate="no">1 query vector × 6 buckets × 1 = 6</code> entri hasil yang dikonfigurasi.</p>
<h3 id="Calculate-metrics-and-order-buckets" class="common-anchor-header">Hitung metrik dan urutkan bucket<button data-href="#Calculate-metrics-and-order-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>Tambahkan ` <code translate="no">metrics</code> ` dan ` <code translate="no">order</code> ` saat Anda memerlukan statistik bucket dan urutan bucket yang deterministik:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
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
<p><strong>Tentukan metrik bucket.</strong></p>
<p>Setiap entri <code translate="no">SearchAggregation.metrics</code> memetakan alias yang ditentukan pengguna ke <code translate="no">{operation: source}</code>:</p>
<table>
<thead>
<tr><th>Alias</th><th>Operasi</th><th>Sumber</th><th>Hasil</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">product_count</code></td><td><code translate="no">count</code></td><td><code translate="no">&quot;*&quot;</code></td><td>Menghitung setiap entitas retrieval-pool yang ditugaskan ke bucket.</td></tr>
<tr><td><code translate="no">avg_price</code></td><td><code translate="no">avg</code></td><td><code translate="no">price</code></td><td>Menghitung rata-rata nilai <code translate="no">price</code> yang tidak null.</td></tr>
<tr><td><code translate="no">min_price</code></td><td><code translate="no">min</code></td><td><code translate="no">price</code></td><td>Mengembalikan nilai terendah dari <code translate="no">price</code> yang tidak null.</td></tr>
</tbody>
</table>
<p>Aggregasi Pencarian mendukung operasi metrik berikut:</p>
<ul>
<li><code translate="no">count</code> menerima sumber khusus ` <code translate="no">&quot;*&quot;</code> ` untuk menghitung setiap entitas dalam bucket, atau nama bidang untuk menghitung entitas yang nilai bidangnya bukan ` <code translate="no">NULL</code>`. Misalnya, jika sebuah bucket berisi 10 entitas dan dua di antaranya memiliki ` <code translate="no">price</code> ` yang ditetapkan ke ` <code translate="no">NULL</code>`, metrik ` <code translate="no">count</code> ` dengan sumber ` <code translate="no">&quot;*&quot;</code> ` akan mengembalikan 10, sedangkan metrik dengan sumber ` <code translate="no">&quot;price&quot;</code> ` akan mengembalikan 8.</li>
<li><code translate="no">sum</code>, <code translate="no">avg</code>, <code translate="no">min</code>, dan <code translate="no">max</code> menerima bidang numerik yang didukung atau sumber bawaan <code translate="no">_score</code>, yang mewakili kemiripan atau jarak ANN. Operasi-operasi ini mengabaikan nilai-nilai <code translate="no">NULL</code>.</li>
</ul>
<p>Untuk mengurutkan bucket berdasarkan nilai yang diperoleh dari <code translate="no">_score</code>, tentukan alias metrik berdasarkan <code translate="no">_score</code>, lalu gunakan alias tersebut di <code translate="no">order</code>. <code translate="no">_score</code> bukanlah kunci urutan bucket langsung. Misalnya, karena panduan ini menggunakan <code translate="no">COSINE</code>, tentukan <code translate="no">&quot;max_score&quot;: {&quot;max&quot;: &quot;_score&quot;}</code> di <code translate="no">metrics</code>, lalu gunakan <code translate="no">{&quot;max_score&quot;: &quot;desc&quot;}</code> di <code translate="no">order</code>. Hal ini akan menempatkan bucket yang entitas pencocokannya terbaik memiliki skor kesamaan lebih tinggi di urutan pertama.</p>
<p><strong>Urutkan bucket.</strong></p>
<p><code translate="no">SearchAggregation.order</code> mengontrol urutan bucket yang dikembalikan. Setiap entri memetakan kunci urutan ke <code translate="no">&quot;asc&quot;</code> atau <code translate="no">&quot;desc&quot;</code>. Milvus mengevaluasi beberapa entri dari yang pertama hingga yang terakhir.</p>
<p>Kunci urutan dapat berupa:</p>
<ul>
<li>alias metrik yang didefinisikan di <code translate="no">metrics</code> pada tingkat agregasi yang sama, seperti <code translate="no">avg_price</code>;</li>
<li>kunci bawaan <code translate="no">_count</code>, yang mewakili jumlah entitas retrieval-pool di dalam bucket; atau</li>
<li>kunci bawaan ` <code translate="no">_key</code> `, yang mewakili kunci bucket alih-alih bidang koleksi bernama ` <code translate="no">_key</code>`.</li>
</ul>
<p>Jika Anda mengabaikan ` <code translate="no">order</code>`, Milvus akan mempertahankan urutan penemuan bucket dari retrieval pool. Tetapkan ` <code translate="no">order</code> ` jika bucket harus mengikuti metrik, jumlah, atau kunci.</p>
<p>Dalam contoh ini:</p>
<table>
<thead>
<tr><th>Entri</th><th>Efek</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">{&quot;avg_price&quot;: &quot;desc&quot;}</code></td><td>Mengurutkan bucket dari nilai <code translate="no">avg_price</code> tertinggi ke terendah.</td></tr>
<tr><td><code translate="no">{&quot;_key&quot;: &quot;asc&quot;}</code></td><td>Memecahkan ikatan dalam urutan kunci bucket yang naik. Dengan ` <code translate="no">fields=[&quot;brand&quot;]</code>`, bucket dengan harga sama mengikuti urutan leksikal: ` <code translate="no">Adidas</code>`, ` <code translate="no">Nike</code>`, lalu ` <code translate="no">Puma</code>`. Bucket dengan nilai ` <code translate="no">avg_price</code> ` yang berbeda tidak terpengaruh. Dengan ` <code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code>`, Milvus membandingkan ` <code translate="no">brand</code> ` terlebih dahulu dan membandingkan ` <code translate="no">color</code> ` hanya jika nilai `brand` sama.</td></tr>
</tbody>
</table>
<h3 id="Return-and-sort-representative-hits" class="common-anchor-header">Mengembalikan dan mengurutkan hasil yang representatif<button data-href="#Return-and-sort-representative-hits" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan <code translate="no">TopHits</code> untuk mengembalikan dan mengurutkan entitas representatif dari setiap bucket yang dipilih:</p>
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
<p><summary>Lihat bucket dengan hasil yang mewakili</summary></p>
<p>Bucket Nike berikut ini diambil dari permintaan di atas dan diserialisasikan sebagai JSON agar mudah dibaca.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997663497924805</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike Air Zoom Runner&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997047781944275</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike Pegasus Trail&quot;</span><span class="hljs-punctuation">,</span>
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
<tr><td><code translate="no">top_hits</code></td><td>Opsional. Mengonfigurasi entitas representatif untuk tingkat agregasi ini. Jika diabaikan, Milvus tetap mengembalikan kunci bucket, jumlah, metrik, dan bucket anak, tetapi ` <code translate="no">bucket.hits</code> ` kosong.</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>Mengembalikan hingga dua entitas representatif dari setiap bucket yang dipilih.</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>Mengurutkan entitas di dalam setiap bucket menggunakan kriteria yang tercantum.</td></tr>
</tbody>
</table>
<p>Tetapkan ` <code translate="no">top_hits</code> ` hanya jika aplikasi memerlukan entitas representatif dari setiap bucket.</p>
<p><code translate="no">SearchAggregation.order</code> mengurutkan bucket, sedangkan ` <code translate="no">TopHits.sort</code> ` mengurutkan entitas di dalam setiap bucket. ` <code translate="no">TopHits.sort</code> ` menerima nama bidang skalar yang didukung dan bidang bawaan ` <code translate="no">_score</code> `, yang mewakili kemiripan atau jarak ANN. Milvus mengevaluasi entri ` <code translate="no">sort</code> ` dari yang pertama hingga yang terakhir. Dalam contoh ini, produk diurutkan berdasarkan <code translate="no">rating</code> dari nilai tertinggi ke terendah dan menggunakan <code translate="no">_score</code> hanya ketika dua peringkat sama. Karena pengaturan menggunakan <code translate="no">COSINE</code>, urutan menurun <code translate="no">_score</code> menempatkan produk yang lebih mirip di urutan pertama.</p>
<p>Kolom yang digunakan oleh <code translate="no">TopHits.sort</code> tidak harus muncul di <code translate="no">output_fields</code>. Namun, hanya kolom di <code translate="no">output_fields</code> yang disertakan dalam pemetaan <code translate="no">fields</code> setiap hasil yang dikembalikan.</p>
<p>Setiap hasil yang dikembalikan oleh <code translate="no">AggregationHit</code> menampilkan kunci utamanya di <code translate="no">pk</code>, skor vektor di <code translate="no">score</code>, dan bidang keluaran yang diminta di <code translate="no">fields</code>.</p>
<h3 id="Create-nested-buckets" class="common-anchor-header">Buat bucket bersarang<button data-href="#Create-nested-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan <code translate="no">sub_aggregation</code> untuk menjalankan agregasi lain di dalam setiap bucket induk. Agregasi anak hanya menerima entitas yang ditugaskan ke bucket induknya. Konfigurasi berikut ini pertama-tama mengelompokkan produk berdasarkan kategori, lalu mengelompokkan produk dalam setiap kategori berdasarkan merek:</p>
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
<p>Cuplikan serialized berikut menunjukkan bucket induk <code translate="no">running_shoes</code> dan bucket anak Adidas-nya. Bucket anak Nike dan Puma dihilangkan demi kepraktisan.</p>
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
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas&quot;</span>
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
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.999454140663147</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas Ultraboost Light&quot;</span><span class="hljs-punctuation">,</span>
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
<p>Milvus pertama-tama memilih hingga dua bucket kategori, yang diurutkan berdasarkan <code translate="no">product_count</code>. Selanjutnya, Milvus menjalankan <code translate="no">sub_aggregation</code> secara independen di dalam setiap kategori yang dipilih dan mengembalikan hingga tiga bucket merek, yang diurutkan berdasarkan <code translate="no">avg_rating</code>.</p>
<p>Pada hasil di atas:</p>
<ul>
<li>Bucket akar ` <code translate="no">running_shoes</code> ` berisi empat entitas `retrieval-pool`. ` <code translate="no">metrics</code> `-nya berisi nilai ` <code translate="no">avg_price</code> ` dan ` <code translate="no">product_count</code> ` tingkat akar.</li>
<li>Daftar <code translate="no">sub_groups</code> pada bucket akar berisi bucket-bucket merek anak. Bucket Adidas yang ditampilkan berisi satu entitas serta nilai <code translate="no">avg_rating</code> dan <code translate="no">brand_count</code> miliknya sendiri.</li>
<li>Daftar ` <code translate="no">hits</code> ` pada bucket akar kosong karena agregasi akar tidak mengonfigurasi ` <code translate="no">top_hits</code>`. Bucket anak Adidas berisi satu hit representatif karena ` <code translate="no">top_hits</code> ` dikonfigurasi dalam ` <code translate="no">sub_aggregation</code>`.</li>
</ul>
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
    </button></h3><p>Agregasi Pencarian merangkum kumpulan hasil pencarian ANN. Agregasi ini tidak menjalankan agregasi koleksi penuh.</p>
<p>Misalnya, anggaplah sebuah koleksi berisi 5.000 produk Nike, tetapi kumpulan hasil pencarian untuk satu kueri hanya berisi 35 produk Nike. Metrik " <code translate="no">product_count</code> " di bucket Nike menggambarkan 35 produk yang diambil tersebut. Metrik ini tidak melaporkan angka 5.000.</p>
<p>Perkiraan menjadi sangat penting ketika " <code translate="no">order</code> " menggunakan alias metrik. Perubahan pada recall pencarian dapat mengubah nilai metrik dan karenanya mengubah bucket mana yang termasuk dalam " <code translate="no">SearchAggregation.size</code>". Agregasi bersarang dapat memperkuat efek ini karena setiap tingkat anak beroperasi pada entitas yang tersedia di bucket induknya.</p>
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
    </button></h3><p>Gunakan <a href="/docs/id/grouping-search.md">Pencarian Pengelompokan</a> jika tujuan Anda adalah meningkatkan keragaman hasil dan mengontrol jumlah entitas yang dikembalikan oleh setiap kelompok.</p>
<p>Gunakan Search Aggregation jika Anda memerlukan hasil bucket yang terstruktur, seperti kunci gabungan, metrik per bucket, urutan bucket, hasil yang diurutkan secara independen, atau bucket bersarang. Search Aggregation menggunakan API terpisah dan mengembalikan hasilnya melalui <code translate="no">result.agg_buckets</code>.</p>
<p>Jangan menggabungkan <code translate="no">search_aggregation</code> dengan <code translate="no">group_by_field</code> atau <code translate="no">group_by_fields</code> dalam permintaan yang sama.</p>
