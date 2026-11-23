---
id: hnsw-prq.md
title: HNSW_PRQ
summary: >-
  HNSW_PRQ memanfaatkan grafik Hierarchical Navigable Small World (HNSW) bersama
  dengan Product Residual Quantization (PRQ), sehingga menawarkan metode
  pengindeksan vektor canggih yang memungkinkan Anda menyesuaikan secara tepat
  keseimbangan antara ukuran indeks dan akurasi. PRQ melampaui Product
  Quantization (PQ) tradisional dengan memperkenalkan langkah residual
  quantization (RQ) untuk menangkap informasi tambahan, sehingga menghasilkan
  akurasi yang lebih tinggi atau indeks yang lebih ringkas dibandingkan dengan
  metode yang murni berbasis PQ. Namun, langkah-langkah tambahan tersebut dapat
  menyebabkan beban komputasi yang lebih tinggi selama proses pembuatan indeks
  dan pencarian.
---
<h1 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ<button data-href="#HNSWPRQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_PRQ</strong> memanfaatkan grafik Hierarchical Navigable Small World (HNSW) dengan Product Residual Quantization (PRQ), menawarkan metode pengindeksan vektor canggih yang memungkinkan Anda menyesuaikan secara tepat keseimbangan antara ukuran indeks dan akurasi. PRQ melampaui Product Quantization (PQ) tradisional dengan memperkenalkan langkah residual quantization (RQ) untuk menangkap informasi tambahan, sehingga menghasilkan akurasi yang lebih tinggi atau indeks yang lebih ringkas dibandingkan dengan metode yang murni berbasis PQ. Namun, langkah-langkah tambahan tersebut dapat menyebabkan beban komputasi yang lebih tinggi selama pembuatan dan pencarian indeks.</p>
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
    </button></h2><p>HNSW_PRQ menggabungkan dua teknik pengindeksan: <strong>HSNW</strong> untuk navigasi berbasis graf yang cepat dan <strong>PRQ</strong> untuk kompresi vektor yang efisien.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW membangun grafik berlapis-lapis di mana setiap simpul mewakili vektor dalam dataset. Dalam grafik ini, simpul-simpul dihubungkan berdasarkan kemiripannya, sehingga memungkinkan penelusuran cepat melalui ruang data. Struktur hierarkis ini memungkinkan algoritma pencarian untuk mempersempit kandidat tetangga, yang secara signifikan mempercepat proses pencarian di ruang berdimensi tinggi.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/hnsw.md">HNSW</a>.</p>
<h3 id="PRQ" class="common-anchor-header">PRQ<button data-href="#PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PRQ adalah pendekatan kompresi vektor multi-tahap yang menggabungkan dua teknik yang saling melengkapi: PQ dan RQ. Dengan terlebih dahulu membagi vektor berdimensi tinggi menjadi sub-vektor yang lebih kecil (melalui PQ) dan kemudian mengkuantisasi perbedaan yang tersisa (melalui RQ), PRQ menghasilkan representasi data asli yang ringkas namun akurat.</p>
<p>Gambar berikut menunjukkan cara kerjanya.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-prq.png" alt="Hnsw Prq" class="doc-image" id="hnsw-prq" /> 
   <span>Hnsw Prq</span>
  
 </span></p>
<ol>
<li><p><strong>Kuantisasi Produk (PQ)</strong></p>
<p>Pada tahap ini, vektor asli dibagi menjadi sub-vektor yang lebih kecil, dan setiap sub-vektor dipetakan ke pusat terdekatnya dalam buku kode yang telah dipelajari. Pemetaan ini secara signifikan mengurangi ukuran data tetapi menimbulkan beberapa kesalahan pembulatan karena setiap sub-vektor diapproksimasi oleh satu pusat. Untuk detail lebih lanjut, lihat <a href="/docs/id/ivf-pq.md#PQ">IVF_PQ</a>.</p></li>
<li><p><strong>Kuantisasi Residual (RQ)</strong></p>
<p>Setelah tahap PQ, RQ mengkuantisasi residu—selisih antara vektor asli dan aproksimasinya berdasarkan PQ—menggunakan buku kode tambahan. Karena residu ini umumnya jauh lebih kecil, residu tersebut dapat dikodekan dengan lebih presisi tanpa peningkatan penyimpanan yang signifikan.</p>
<p>Parameter ` <code translate="no">nrq</code> ` menentukan berapa kali residu ini dikuantisasi secara berulang, sehingga Anda dapat menyesuaikan keseimbangan antara efisiensi kompresi dan akurasi.</p></li>
<li><p><strong>Representasi Kompresi Akhir</strong></p>
<p>Setelah RQ selesai mengkuantisasi residual, kode bilangan bulat dari PQ dan RQ digabungkan menjadi satu indeks terkompresi. Dengan menangkap detail halus yang mungkin terlewatkan oleh PQ saja, RQ meningkatkan akurasi tanpa menyebabkan peningkatan kapasitas penyimpanan yang signifikan. Sinergi antara PQ dan RQ inilah yang mendefinisikan PRQ.</p></li>
</ol>
<h3 id="HNSW-+-PRQ" class="common-anchor-header">HNSW + PRQ<button data-href="#HNSW-+-PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>Dengan menggabungkan HNSW dengan PRQ, <strong>HNSW_PRQ</strong> mempertahankan pencarian berbasis graf yang cepat dari HNSW sekaligus memanfaatkan kompresi bertahap dari PRQ. Alur kerjanya terlihat seperti ini:</p>
<ol>
<li><p><strong>Kompresi Data:</strong> Setiap vektor pertama-tama diubah melalui PQ menjadi representasi kasar, kemudian residu dikuantisasi melalui RQ untuk penyempurnaan lebih lanjut. Hasilnya adalah sekumpulan kode ringkas yang mewakili setiap vektor.</p></li>
<li><p><strong>Pembuatan Grafik:</strong> Vektor-vektor yang telah dikompresi (termasuk kode PQ dan RQ) menjadi dasar untuk membangun grafik HNSW. Karena data disimpan dalam bentuk yang ringkas, grafik ini membutuhkan lebih sedikit memori, dan navigasi di dalamnya menjadi lebih cepat.</p></li>
<li><p><strong>Pencarian Kandidat:</strong> Selama pencarian, HNSW menggunakan representasi terkompresi untuk menjelajahi graf dan mengambil kumpulan kandidat. Hal ini secara drastis mengurangi jumlah vektor yang perlu dipertimbangkan.</p></li>
<li><p><strong>(Opsional) Penyempurnaan Hasil:</strong> Hasil kandidat awal dapat disempurnakan untuk akurasi yang lebih baik, berdasarkan parameter berikut:</p>
<ul>
<li><p><code translate="no">refine</code>: Mengontrol apakah langkah penyempurnaan ini diaktifkan. Jika disetel ke " <code translate="no">true</code>", sistem akan menghitung ulang jarak menggunakan representasi dengan presisi lebih tinggi atau yang tidak terkompresi.</p></li>
<li><p><code translate="no">refine_type</code>: Menentukan tingkat presisi data yang digunakan selama penyempurnaan (misalnya, SQ6, SQ8, BF16). Pilihan presisi yang lebih tinggi seperti " <code translate="no">FP32</code> " dapat menghasilkan hasil yang lebih akurat tetapi membutuhkan lebih banyak memori. Tingkat presisi ini harus melebihi presisi kumpulan data terkompresi asli sebesar " <code translate="no">sq_type</code>".</p></li>
<li><p><code translate="no">refine_k</code>: Berfungsi sebagai faktor pembesaran. Misalnya, jika top <em>k</em> Anda adalah 100 dan <code translate="no">refine_k</code> adalah 2, sistem akan menyusun ulang peringkat 200 kandidat teratas dan mengembalikan 100 yang terbaik, sehingga meningkatkan akurasi secara keseluruhan.</p></li>
</ul></li>
</ol>
<p>Untuk daftar lengkap parameter dan nilai yang valid, lihat <a href="/docs/id/hnsw-prq.md#Index-params">Parameter indeks</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Membuat indeks<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk membuat indeks <code translate="no">HNSW_PRQ</code> pada bidang vektor di Milvus, gunakan metode ` <code translate="no">add_index()</code> `, dengan menentukan ` <code translate="no">index_type</code>`, ` <code translate="no">metric_type</code>`, dan parameter tambahan untuk indeks tersebut.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PRQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;nrq&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">index_type</code>: Jenis indeks yang akan dibuat. Dalam contoh ini, tetapkan nilainya ke ` <code translate="no">HNSW_PQ</code>`.</p></li>
<li><p><code translate="no">metric_type</code>: Metode yang digunakan untuk menghitung jarak antar vektor. Nilai yang didukung meliputi <code translate="no">COSINE</code>, <code translate="no">L2</code>, dan <code translate="no">IP</code>. Untuk detailnya, lihat <a href="/docs/id/metric.md">Jenis Metrik</a>.</p></li>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk membangun indeks. Untuk detailnya, lihat <a href="/docs/id/hnsw-prq.md#Index-building-params">Parameter Pembuatan Indeks</a>.</p></li>
</ul>
<p>Setelah parameter indeks dikonfigurasi, Anda dapat membuat indeks dengan menggunakan metode ` <code translate="no">create_index()</code> ` secara langsung atau dengan meneruskan parameter indeks ke metode ` <code translate="no">create_collection</code> `. Untuk detailnya, lihat <a href="/docs/id/create-collection.md">Buat Koleksi</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Pencarian pada indeks<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah indeks dibuat dan entitas dimasukkan, Anda dapat melakukan pencarian kesamaan pada indeks tersebut.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Parameter controlling query time/accuracy trade-off</span>
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># The magnification factor</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><code translate="no">params</code>: Opsi konfigurasi tambahan untuk pencarian pada indeks. Untuk detailnya, lihat <a href="/docs/id/hnsw-prq.md#Index-specific-search-params">Parameter pencarian khusus indeks</a>.</li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Parameter indeks<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagian ini memberikan gambaran umum mengenai parameter yang digunakan untuk membangun indeks dan melakukan pencarian pada indeks.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter pembuatan indeks<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> saat <a href="/docs/id/hnsw-prq.md#Build-index">membangun indeks</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyesuaian</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Jumlah maksimum koneksi (atau tepi) yang dapat dimiliki setiap simpul dalam graf, termasuk tepi keluar dan masuk.
Parameter ini secara langsung memengaruhi baik pembentukan indeks maupun pencarian.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat
 <strong>Rentang</strong>: [2, 2048]</p>
<p><strong>Nilai default</strong>: <code translate="no">30</code> (hingga 30 tepi keluar dan 30 tepi masuk per simpul)</p></td>
     <td><p>Nilai <code translate="no">M</code> yang lebih besar umumnya menghasilkan <strong>akurasi</strong> yang <strong>lebih tinggi</strong>, tetapi <strong>meningkatkan beban memori</strong> dan <strong>memperlambat proses pembuatan indeks serta pencarian</strong>.
 Pertimbangkan untuk meningkatkan <code translate="no">M</code> untuk dataset berdimensi tinggi atau ketika tingkat recall yang tinggi sangat penting.</p>
<p>Pertimbangkan untuk menurunkan nilai ` <code translate="no">M</code> ` jika penggunaan memori dan kecepatan pencarian menjadi prioritas utama.</p>
<p>Dalam kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam rentang ini: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Jumlah tetangga kandidat yang dipertimbangkan untuk koneksi selama pembuatan indeks.
Kumpulan kandidat yang lebih besar dievaluasi untuk setiap elemen baru, tetapi jumlah maksimum koneksi yang benar-benar terbentuk tetap dibatasi oleh ` <code translate="no">M</code>`.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat
 <strong>Rentang</strong>: [1, <em>int_max</em>]</p>
<p><strong>Nilai default</strong>: <code translate="no">360</code></p></td>
     <td><p>Nilai ` <code translate="no">efConstruction</code> ` yang lebih tinggi biasanya menghasilkan <strong>indeks</strong> yang <strong>lebih akurat</strong>, karena lebih banyak koneksi potensial dieksplorasi. Namun, hal ini juga menyebabkan <strong>waktu pengindeksan yang lebih lama dan peningkatan penggunaan memori</strong> selama proses pembuatan indeks.
Pertimbangkan untuk meningkatkan ` <code translate="no">efConstruction</code> ` guna meningkatkan akurasi, terutama dalam skenario di mana waktu pengindeksan kurang kritis.</p>
<p>Pertimbangkan untuk menurunkan nilai ` <code translate="no">efConstruction</code> ` guna mempercepat proses pembuatan indeks jika keterbatasan sumber daya menjadi masalah.</p>
<p>Dalam kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam rentang berikut: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Jumlah sub-vektor (yang digunakan untuk kuantisasi) yang akan membagi setiap vektor berdimensi tinggi selama proses kuantisasi.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat
 <strong>Rentang</strong>: [1, 65536]</p>
<p><strong>Nilai default</strong>: Tidak ada</p></td>
     <td><p>Nilai <code translate="no">m</code> yang lebih tinggi dapat meningkatkan akurasi, tetapi juga meningkatkan kompleksitas komputasi dan penggunaan memori. <code translate="no">m</code> harus merupakan pembagi dari dimensi vektor (<em>D</em>) untuk memastikan dekomposisi yang tepat. Nilai yang umumnya direkomendasikan adalah <em>m = D/2</em>.</p>
<p>Dalam kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam rentang ini: [D/8, D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Jumlah bit yang digunakan untuk mewakili indeks pusat massa setiap sub-vektor dalam bentuk terkompresi. Hal ini secara langsung menentukan ukuran setiap buku kode.
 Setiap buku kode akan berisi<sup>2nbit</sup> indeks pusat. Misalnya, jik <code translate="no">nbits</code> diatur ke 8, setiap sub-vektor akan diwakili oleh indeks pusat 8-bit. Hal ini memungkinkan adanya<sup>2⁸</sup> (256) kemungkinan pusat dalam buku kode untuk sub-vektor tersebut.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat
 <strong>Rentang</strong>: [1, 24]</p>
<p><strong>Nilai default</strong>: <code translate="no">8</code></p></td>
     <td><p>Nilai <code translate="no">nbits</code> yang lebih tinggi memungkinkan buku kode yang lebih besar, yang berpotensi menghasilkan representasi vektor asli yang lebih akurat. Namun, hal ini juga berarti menggunakan lebih banyak bit untuk menyimpan setiap indeks, sehingga menghasilkan kompresi yang lebih rendah.
Dalam kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam rentang ini: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nrq</code></p></td>
     <td><p>Mengontrol berapa banyak subkuantisator residual yang digunakan pada tahap RQ. Semakin banyak subkuantisator, kompresi yang dicapai berpotensi semakin besar, tetapi mungkin menimbulkan kehilangan informasi yang lebih banyak.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat
 <strong>Rentang</strong>: [1, 16]</p>
<p><strong>Nilai default</strong>: <code translate="no">2</code></p></td>
     <td><p>Nilai " <code translate="no">nrq</code> " yang lebih tinggi memungkinkan langkah subkuantisasi residual tambahan, yang berpotensi menghasilkan rekonstruksi vektor asli yang lebih presisi. Namun, hal ini juga berarti menyimpan dan menghitung lebih banyak subkuantizer, sehingga menghasilkan ukuran indeks yang lebih besar dan beban komputasi yang lebih tinggi.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Sebuah bendera boolean yang mengontrol apakah langkah penyempurnaan diterapkan selama pencarian. Penyempurnaan melibatkan pengurutan ulang hasil awal dengan menghitung jarak yang tepat antara vektor kueri dan kandidat.</p></td>
     <td><p><strong>Tipe</strong>: Boolean
 <strong>Rentang</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>Nilai default</strong>: <code translate="no">false</code></p></td>
     <td><p>Atur ke <code translate="no">true</code> jika akurasi tinggi sangat penting dan Anda dapat mentoleransi waktu pencarian yang sedikit lebih lambat. Gunakan <code translate="no">false</code> jika kecepatan menjadi prioritas dan sedikit kompromi dalam akurasi dapat diterima.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Menentukan presisi data yang digunakan selama proses penyempurnaan.
 Presisi ini harus lebih tinggi daripada presisi vektor terkompresi (sebagaimana ditetapkan oleh parameter <code translate="no">m</code> dan <code translate="no">nbits</code> ).</p></td>
     <td><p><strong>Tipe</strong>: String
 <strong>Rentang</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>Nilai default</strong>: Tidak ada</p></td>
     <td><p>Gunakan <code translate="no">FP32</code> untuk presisi maksimum dengan biaya memori yang lebih tinggi, atau <code translate="no">SQ6</code>/<code translate="no">SQ8</code> untuk kompresi yang lebih baik. <code translate="no">BF16</code> dan <code translate="no">FP16</code> menawarkan alternatif yang seimbang.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parameter pencarian khusus indeks<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> saat <a href="/docs/id/hnsw-prq.md#Search-on-index">melakukan pencarian pada indeks</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyesuaian</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Mengontrol cakupan pencarian selama proses pengambilan tetangga terdekat. Parameter ini menentukan berapa banyak simpul yang dikunjungi dan dievaluasi sebagai calon tetangga terdekat. 
 Parameter ini hanya memengaruhi proses pencarian dan berlaku secara eksklusif pada lapisan terbawah graf.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan Bulat
 <strong>Rentang</strong>: [1, <em>int_max</em>]</p>
<p><strong>Nilai default</strong>: <em>limit</em> (TopK tetangga terdekat yang akan dikembalikan)</p></td>
     <td><p>Nilai " <code translate="no">ef</code> " yang lebih besar umumnya menghasilkan <strong>akurasi pencarian yang lebih tinggi</strong> karena lebih banyak tetangga potensial yang dipertimbangkan. Namun, hal ini juga <strong>meningkatkan waktu pencarian</strong>.
 Pertimbangkan untuk meningkatkan " <code translate="no">ef</code> " ketika mencapai recall yang tinggi sangat penting dan kecepatan pencarian bukanlah prioritas utama.</p>
<p>Pertimbangkan untuk menurunkan nilai ` <code translate="no">ef</code> ` guna memprioritaskan pencarian yang lebih cepat, terutama dalam skenario di mana penurunan akurasi yang sedikit dapat diterima.</p>
<p>Dalam kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam rentang berikut: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Faktor pembesaran yang mengontrol berapa banyak kandidat tambahan yang diperiksa selama tahap penyempurnaan (penyusunan ulang peringkat), relatif terhadap K hasil teratas yang diminta.</p></td>
     <td><p><strong>Tipe</strong>: Float
 <strong>Rentang</strong>: [1, <em>float_max</em>)</p>
<p><strong>Nilai default</strong>: 1</p></td>
     <td><p>Nilai <code translate="no">refine_k</code> yang lebih tinggi dapat meningkatkan recall dan akurasi, tetapi juga akan menambah waktu pencarian dan penggunaan sumber daya. Nilai 1 berarti proses penyempurnaan hanya mempertimbangkan K hasil teratas awal.</p></td>
   </tr>
</table>
