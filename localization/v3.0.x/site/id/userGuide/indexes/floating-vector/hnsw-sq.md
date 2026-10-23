---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQ menggabungkan grafik Hierarchical Navigable Small World (HNSW) dengan
  Scalar Quantization (SQ), sehingga menghasilkan metode pengindeksan vektor
  canggih yang menawarkan keseimbangan yang dapat dikendalikan antara ukuran dan
  akurasi. Dibandingkan dengan HNSW standar, jenis indeks ini mempertahankan
  kecepatan pemrosesan kueri yang tinggi sambil menimbulkan sedikit peningkatan
  waktu pembuatan indeks.
---
<h1 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_SQ</strong> menggabungkan grafik Hierarchical Navigable Small World (HNSW) dengan Scalar Quantization (SQ), sehingga menciptakan metode pengindeksan vektor canggih yang menawarkan keseimbangan yang dapat dikendalikan antara ukuran dan akurasi. Dibandingkan dengan <a href="/docs/id/hnsw.md">HNSW</a> standar, jenis indeks ini mempertahankan kecepatan pemrosesan kueri yang tinggi meskipun waktu pembuatan indeksnya sedikit lebih lama.</p>
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
    </button></h2><p>HNSW_SQ menggabungkan dua teknik pengindeksan: <strong>HNSW</strong> untuk navigasi berbasis graf yang cepat dan <strong>SQ</strong> untuk kompresi vektor yang efisien.</p>
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
    </button></h3><p>HNSW membangun grafik berlapis-lapis di mana setiap simpul sesuai dengan vektor dalam kumpulan data. Dalam grafik ini, simpul-simpul dihubungkan berdasarkan kemiripannya, sehingga memungkinkan penelusuran cepat melalui ruang data. Struktur hierarkis ini memungkinkan algoritma pencarian mempersempit kandidat tetangga, yang secara signifikan mempercepat proses pencarian di ruang berdimensi tinggi.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/hnsw.md">HNSW</a>.</p>
<h3 id="SQ" class="common-anchor-header">SQ<button data-href="#SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>SQ adalah metode untuk mengompresi vektor dengan merepresentasikannya menggunakan lebih sedikit bit. Contohnya:</p>
<ul>
<li><p><strong>SQ8</strong> menggunakan 8 bit, memetakan nilai ke dalam 256 tingkat. Untuk informasi lebih lanjut, lihat <a href="/docs/id/ivf-sq8.md#SQ8">IVF_SQ8</a>.</p></li>
<li><p><strong>SQ6</strong> menggunakan 6 bit untuk merepresentasikan setiap nilai floating-point, sehingga menghasilkan 64 tingkat diskrit.</p></li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" /> 
   <span>Hnsw Sq</span>
  
 </span></p>
<p>Pengurangan presisi ini secara drastis mengurangi penggunaan memori dan mempercepat perhitungan sambil tetap mempertahankan struktur esensial data.</p>
<h3 id="SQ4U" class="common-anchor-header">SQ4U<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#SQ4U" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk skenario yang menuntut kecepatan kueri yang sangat tinggi dan penggunaan memori yang minimal, Milvus memperkenalkan <code translate="no">SQ4U</code>, yaitu Kuantisasi Skalar Seragam 4-bit. Ini adalah bentuk kuantisasi skalar yang agresif yang mengompresi nilai floating-point setiap dimensi menjadi bilangan bulat tak bertanda <strong>4-bit</strong>.</p>
<p>Huruf “U” dalam SQ4U merupakan singkatan dari Uniform (Seragam). Berbeda dengan Kuantisasi Skalar non-seragam, yang biasanya menghitung nilai minimum dan maksimum secara terpisah untuk setiap dimensi (Kuantisasi Per-Dimensi), SQ4U menerapkan strategi <strong>Kuantisasi Seragam Global</strong>:</p>
<ol>
<li><p><strong>Statistik Global</strong>: Sistem menghitung <strong>satu</strong> nilai minimum <code translate="no">vmin</code> dan <strong>satu</strong> rentang nilai <code translate="no">vdiff</code> yang berlaku untuk <strong>semua dimensi</strong> vektor (atau seluruh segmen vektor).</p></li>
<li><p><strong>Pemetaan Seragam</strong>: Rentang nilai global dibagi menjadi 16 interval yang sama. Setiap nilai floating-point dalam vektor, terlepas dari dimensi mana ia berasal, dipetakan ke bilangan bulat 4-bit (0–15) menggunakan parameter bersama ini.</p></li>
</ol>
<p><strong>Keunggulan Kinerja:</strong></p>
<ul>
<li><p><strong>Rasio Kompresi 8x:</strong> Mengurangi ukuran hingga 8x dibandingkan dengan <code translate="no">FP32</code> dan 2x dibandingkan dengan <code translate="no">SQ8</code>, sehingga secara signifikan mengurangi tekanan bandwidth memori—yang sering menjadi leher botol dalam pencarian vektor.</p></li>
<li><p><strong>Optimisasi SIMD:</strong> Struktur yang ringkas memungkinkan CPU modern (AVX2/AVX-512) untuk memproses lebih banyak dimensi per siklus. Yang terpenting, penggunaan parameter global menghilangkan kebutuhan untuk memuat nilai skala/offset yang bervariasi selama perhitungan jarak, sehingga menjaga pipa instruksi tetap jenuh sepenuhnya.</p></li>
<li><p><strong>Efisiensi Cache:</strong> Ukuran vektor yang lebih kecil berarti lebih banyak data yang muat ke dalam cache CPU, sehingga mengurangi latensi yang disebabkan oleh akses memori.</p></li>
</ul>
<div class="alert note">
<p>Berkat pembagian parameter globalnya, SQ4U memberikan kinerja terbaik pada data yang dinormalisasi atau kumpulan data dengan distribusi nilai yang konsisten di seluruh dimensi.</p>
</div>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ<button data-href="#HNSW-+-SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_SQ menggabungkan keunggulan HNSW dan SQ untuk memungkinkan pencarian tetangga terdekat yang efisien. Berikut cara kerjanya:</p>
<ol>
<li><p><strong>Kompresi Data:</strong> SQ mengompresi vektor menggunakan teknik " <code translate="no">sq_type</code> " (misalnya, SQ6 atau SQ8), yang mengurangi penggunaan memori. Kompresi ini mungkin menurunkan presisi, tetapi memungkinkan sistem menangani kumpulan data yang lebih besar.</p></li>
<li><p><strong>Pembuatan Grafik:</strong> Vektor yang telah dikompresi digunakan untuk membangun grafik HNSW. Karena data telah dikompresi, grafik yang dihasilkan menjadi lebih kecil dan lebih cepat untuk dicari.</p></li>
<li><p><strong>Pencarian Kandidat:</strong> Saat vektor kueri diberikan, algoritma menggunakan data yang telah dikompresi untuk dengan cepat mengidentifikasi kumpulan kandidat tetangga dari graf HNSW.</p></li>
<li><p><strong>(Opsional) Penyempurnaan Hasil:</strong> Hasil kandidat awal dapat disempurnakan untuk akurasi yang lebih baik, berdasarkan parameter berikut:</p>
<ul>
<li><p><code translate="no">refine</code>: Mengontrol apakah langkah penyempurnaan ini diaktifkan. Jika disetel ke " <code translate="no">true</code>", sistem akan menghitung ulang jarak menggunakan representasi dengan presisi lebih tinggi atau yang tidak terkompresi.</p></li>
<li><p><code translate="no">refine_type</code>: Menentukan tingkat presisi data yang digunakan selama penyempurnaan (misalnya, SQ6, SQ8, BF16). Pilihan presisi yang lebih tinggi seperti " <code translate="no">FP32</code> " dapat menghasilkan hasil yang lebih akurat tetapi membutuhkan lebih banyak memori. Tingkat presisi ini harus melebihi presisi kumpulan data terkompresi asli sebesar " <code translate="no">sq_type</code>".</p></li>
<li><p><code translate="no">refine_k</code>: Berfungsi sebagai faktor pembesaran. Misalnya, jika top <em>k</em> Anda adalah 100 dan <code translate="no">refine_k</code> adalah 2, sistem akan menyusun ulang peringkat 200 kandidat teratas dan mengembalikan 100 yang terbaik, sehingga meningkatkan akurasi secara keseluruhan.</p></li>
</ul></li>
</ol>
<p>Untuk daftar lengkap parameter dan nilai yang valid, lihat <a href="/docs/id/hnsw-sq.md#Index-params">Parameter indeks</a>.</p>
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
    </button></h2><p>Untuk membuat indeks <code translate="no">HNSW_SQ</code> pada bidang vektor di Milvus, gunakan metode ` <code translate="no">add_index()</code> `, dengan menentukan ` <code translate="no">index_type</code>`, ` <code translate="no">metric_type</code>`, dan parameter tambahan untuk indeks tersebut.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_SQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;sq_type&quot;</span>: <span class="hljs-string">&quot;SQ6&quot;</span>, <span class="hljs-comment"># Scalar quantizer type</span>
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">index_type</code>: Jenis indeks yang akan dibuat. Dalam contoh ini, tetapkan nilainya ke ` <code translate="no">HNSW_SQ</code>`.</p></li>
<li><p><code translate="no">metric_type</code>: Metode yang digunakan untuk menghitung jarak antar vektor. Nilai yang didukung meliputi <code translate="no">COSINE</code>, <code translate="no">L2</code>, dan <code translate="no">IP</code>. Untuk detailnya, lihat <a href="/docs/id/metric.md">Jenis Metrik</a>.</p></li>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk membangun indeks. Untuk detailnya, lihat <a href="/docs/id/hnsw-sq.md#Index-building-params">Parameter Pembuatan Indeks</a>.</p></li>
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
<li><code translate="no">params</code>: Opsi konfigurasi tambahan untuk pencarian pada indeks. Untuk detailnya, lihat <a href="/docs/id/hnsw-sq.md#Index-specific-search-params">Parameter pencarian khusus indeks</a>.</li>
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> saat <a href="/docs/id/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">membangun indeks</a>.</p>
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
     <td><p>Jumlah maksimum koneksi (atau tepi) yang dapat dimiliki setiap simpul dalam grafik, termasuk tepi keluar dan masuk.</p><p>Parameter ini secara langsung memengaruhi proses pembuatan indeks dan pencarian.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat</p><p><strong>Rentang</strong>: [2, 2048]</p><p><strong>Nilai default</strong>: <code translate="no">30</code> (hingga 30 tepi keluar dan 30 tepi masuk per simpul)</p></td>
     <td><p><code translate="no">M</code> yang lebih besar umumnya menghasilkan <strong>akurasi yang lebih tinggi</strong>, tetapi <strong>meningkatkan beban memori</strong> dan <strong>memperlambat proses pembuatan indeks serta pencarian</strong>.</p><p>Pertimbangkan untuk meningkatkan <code translate="no">M</code> untuk dataset dengan dimensi tinggi atau ketika tingkat recall yang tinggi sangat penting.</p><p>Pertimbangkan untuk mengurangi nilai <code translate="no">M</code> jika penggunaan memori dan kecepatan pencarian menjadi prioritas utama.</p><p>Dalam kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam rentang ini: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Jumlah tetangga kandidat yang dipertimbangkan untuk koneksi selama pembuatan indeks.</p><p>Semakin banyak kandidat yang dievaluasi untuk setiap elemen baru, tetapi jumlah maksimum koneksi yang benar-benar terbentuk tetap dibatasi oleh <code translate="no">M</code>.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat</p><p><strong>Rentang</strong>: [1, <em>int_max</em>]</p><p><strong>Nilai default</strong>: <code translate="no">360</code></p></td>
     <td><p><code translate="no">efConstruction</code> yang lebih tinggi biasanya menghasilkan <strong>indeks</strong> yang <strong>lebih akurat</strong>, karena lebih banyak koneksi potensial dieksplorasi. Namun, hal ini juga menyebabkan <strong>waktu pengindeksan yang lebih lama dan penggunaan memori yang lebih tinggi</strong> selama proses pembuatan.</p><p>Pertimbangkan untuk meningkatkan nilai ` <code translate="no">efConstruction</code> ` guna meningkatkan akurasi, terutama dalam skenario di mana waktu pengindeksan tidak terlalu kritis.</p><p>Pertimbangkan untuk menurunkan nilai ` <code translate="no">efConstruction</code> ` guna mempercepat proses pembuatan indeks jika keterbatasan sumber daya menjadi masalah.</p><p>Dalam kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam rentang ini: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>Menentukan metode kuantisasi skalar untuk mengompres vektor. Setiap opsi menawarkan keseimbangan yang berbeda antara kompresi dan akurasi:</p><ul><li><p><code translate="no">SQ4U</code>: Mengkodekan vektor menggunakan kuantisasi seragam 4-bit. Mode ini menawarkan kecepatan dan kompresi tertinggi.</p></li><li><p><code translate="no">SQ6</code>: Mengkodekan vektor menggunakan bilangan bulat 6-bit.</p></li><li><p><code translate="no">SQ8</code>: Mengkodekan vektor menggunakan bilangan bulat 8-bit.</p></li><li><p><code translate="no">BF16</code>: Menggunakan format Bfloat16.</p></li><li><p><code translate="no">FP16</code>: Menggunakan format bilangan floating-point 16-bit standar.</p></li></ul></td>
     <td><p><strong>Tipe</strong>: String</p><p><strong>Rentang</strong>: [ <code translate="no">SQ4U</code>, <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code> ]</p><p><strong>Nilai default</strong>: <code translate="no">SQ8</code></p></td>
     <td><p>Pemilihan <code translate="no">sq_type</code> bergantung pada kebutuhan aplikasi tertentu. <code translate="no">SQ4U</code> dipilih untuk kecepatan maksimum dan efisiensi memori. <code translate="no">SQ6</code> atau <code translate="no">SQ8</code> mungkin cocok untuk kinerja yang seimbang. Di sisi lain, jika akurasi menjadi prioritas utama, <code translate="no">BF16</code> atau <code translate="no">FP16</code> dapat menjadi pilihan yang lebih disukai.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Sebuah bendera boolean yang mengontrol apakah langkah penyempurnaan diterapkan selama pencarian. Penyempurnaan melibatkan pengurutan ulang hasil awal dengan menghitung jarak yang tepat antara vektor kueri dan kandidat.</p></td>
     <td><p><strong>Tipe</strong>: Boolean</p><p><strong>Rentang</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p><p><strong>Nilai default</strong>: <code translate="no">false</code></p></td>
     <td><p>Atur ke <code translate="no">true</code> jika akurasi tinggi sangat penting dan Anda dapat mentoleransi waktu pencarian yang sedikit lebih lambat. Gunakan <code translate="no">false</code> jika kecepatan menjadi prioritas dan sedikit kompromi dalam akurasi dapat diterima.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Menentukan presisi data yang digunakan untuk penyempurnaan.</p><p>Presisi ini harus lebih tinggi daripada vektor terkompresi (sebagaimana ditetapkan oleh <code translate="no">sq_type</code>), yang memengaruhi akurasi vektor yang diurutkan ulang serta penggunaan memorinya.</p></td>
     <td><p><strong>Tipe</strong>: String</p><p><strong>Rentang</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p><p><strong>Nilai default</strong>: Tidak ada</p></td>
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> saat <a href="/docs/id/hnsw-sq.md#Search-on-index">melakukan pencarian pada indeks</a>. Pengaturan server dapat menggantikan nilai default untuk parameter yang Anda abaikan.</p>
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
     <td><p>Mengontrol cakupan pencarian selama proses pengambilan tetangga terdekat. Parameter ini menentukan berapa banyak node yang dikunjungi dan dievaluasi sebagai tetangga terdekat potensial. </p><p>Parameter ini hanya memengaruhi proses pencarian dan berlaku secara eksklusif pada lapisan terbawah graf.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat</p><p><strong>Rentang</strong>: [1, <em>int_max</em>]</p><p><strong>Nilai default</strong>: <code translate="no">max(limit, 16)</code> untuk pencarian kNN biasa; <code translate="no">512</code> untuk pencarian rentang.</p><p>Untuk pencarian kNN biasa, nilai <code translate="no">ef</code> yang ditentukan secara eksplisit harus lebih besar dari atau sama dengan <code translate="no">limit</code> (jumlah tetangga terdekat yang akan dikembalikan).</p></td>
     <td><p><code translate="no">ef</code> yang lebih besar umumnya menghasilkan <strong>akurasi pencarian yang lebih tinggi</strong> karena lebih banyak tetangga potensial yang dipertimbangkan. Namun, hal ini juga <strong>meningkatkan waktu pencarian</strong>.</p><p>Pertimbangkan untuk meningkatkan nilai <code translate="no">ef</code> ketika mencapai tingkat recall yang tinggi menjadi prioritas utama dan kecepatan pencarian bukanlah masalah utama.</p><p>Pertimbangkan untuk menurunkan nilai ` <code translate="no">ef</code> ` guna memprioritaskan pencarian yang lebih cepat, terutama dalam skenario di mana penurunan akurasi yang sedikit dapat diterima.</p><p>Dalam kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam rentang berikut: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Faktor pembesaran yang mengontrol berapa banyak kandidat tambahan yang diperiksa selama tahap penyempurnaan, relatif terhadap K hasil teratas yang diminta.</p></td>
     <td><p><strong>Tipe</strong>: Float</p><p><strong>Rentang</strong>: [1, <em>float_max</em>)</p><p><strong>Nilai default</strong>: 1</p></td>
     <td><p>Nilai yang lebih tinggi untuk ` <code translate="no">refine_k</code> ` dapat meningkatkan recall dan akurasi, tetapi juga akan memperpanjang waktu pencarian dan meningkatkan penggunaan sumber daya. Nilai 1 berarti proses penyempurnaan hanya mempertimbangkan K hasil teratas awal.</p></td>
   </tr>
</table>
