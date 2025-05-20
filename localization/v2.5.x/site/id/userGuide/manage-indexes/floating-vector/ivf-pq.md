---
id: ivf-pq.md
title: IVF_PQ
summary: >-
  Indeks IVF_PQ adalah algoritme pengindeksan berbasis kuantisasi untuk
  perkiraan pencarian tetangga terdekat dalam ruang dimensi tinggi. Meskipun
  tidak secepat beberapa metode berbasis grafik, IVF_PQ sering kali membutuhkan
  lebih sedikit memori, sehingga menjadikannya pilihan praktis untuk kumpulan
  data yang besar.
---
<h1 id="IVFPQ" class="common-anchor-header">IVF_PQ<button data-href="#IVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>Indeks <strong>IVF_PQ</strong> adalah algoritme pengindeksan <strong>berbasis kuantisasi</strong> untuk perkiraan pencarian tetangga terdekat dalam ruang berdimensi tinggi. Meskipun tidak secepat beberapa metode berbasis grafik, <strong>IVF_PQ</strong> sering kali membutuhkan lebih sedikit memori, sehingga menjadikannya pilihan praktis untuk kumpulan data yang besar.</p>
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
    </button></h2><p><strong>IVF_PQ</strong> adalah singkatan dari <strong>Inverted File with Product Quantization</strong>, sebuah pendekatan hibrida yang menggabungkan pengindeksan dan kompresi untuk pencarian dan pengambilan vektor yang efisien. Pendekatan ini memanfaatkan dua komponen inti: <strong>Inverted File (IVF</strong> ) dan <strong>Kuantisasi Produk (PQ)</strong>.</p>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>IVF seperti membuat indeks dalam sebuah buku. Alih-alih memindai setiap halaman (atau, dalam kasus kami, setiap vektor), Anda mencari kata kunci tertentu (kelompok) dalam indeks untuk menemukan halaman yang relevan (vektor) dengan cepat. Dalam skenario kami, vektor dikelompokkan ke dalam kluster, dan algoritme akan mencari dalam beberapa kluster yang dekat dengan vektor kueri.</p>
<p>Berikut cara kerjanya:</p>
<ol>
<li><p><strong>Pengelompokan:</strong> Kumpulan data vektor Anda dibagi ke dalam sejumlah klaster tertentu, menggunakan algoritme pengelompokan seperti k-means. Setiap klaster memiliki centroid (vektor representatif untuk klaster).</p></li>
<li><p><strong>Penugasan:</strong> Setiap vektor ditugaskan ke klaster yang memiliki centroid yang paling dekat dengannya.</p></li>
<li><p><strong>Indeks Terbalik:</strong> Sebuah indeks dibuat, memetakan setiap centroid klaster ke daftar vektor yang ditugaskan ke klaster tersebut.</p></li>
<li><p><strong>Pencarian:</strong> Saat Anda mencari tetangga terdekat, algoritme pencarian membandingkan vektor kueri Anda dengan centroid klaster dan memilih klaster yang paling menjanjikan. Pencarian kemudian dipersempit menjadi vektor dalam klaster yang dipilih.</p></li>
</ol>
<p>Untuk mempelajari lebih lanjut tentang detail teknisnya, lihat <a href="/docs/id/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p><strong>Product Quantization (PQ</strong> ) adalah metode kompresi untuk vektor berdimensi tinggi yang secara signifikan mengurangi kebutuhan penyimpanan sekaligus memungkinkan operasi pencarian kemiripan yang cepat.</p>
<p>Proses PQ melibatkan tahapan-tahapan utama berikut ini:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-1.png" alt="Ivf Pq 1" class="doc-image" id="ivf-pq-1" />
   </span> <span class="img-wrapper"> <span>Ivf Pq 1</span> </span></p>
<ol>
<li><p><strong>Dekomposisi dimensi</strong>: Algoritme dimulai dengan menguraikan setiap vektor dimensi tinggi menjadi <code translate="no">m</code> sub-vektor berukuran sama. Dekomposisi ini mengubah ruang dimensi-D asli menjadi <code translate="no">m</code> subruang yang terpisah-pisah, di mana setiap subruang berisi dimensi <em>D/m</em>. Parameter <code translate="no">m</code> mengontrol granularitas dekomposisi dan secara langsung mempengaruhi rasio kompresi.</p></li>
<li><p><strong>Pembuatan buku kode subruang</strong>: Di dalam setiap subruang, algoritme menerapkan <a href="https://en.wikipedia.org/wiki/K-means_clustering">pengelompokan k-means</a> untuk mempelajari sekumpulan vektor representatif (centroid). Centroid ini secara kolektif membentuk codebook untuk subruang tersebut. Jumlah centroid di setiap codebook ditentukan oleh parameter <code translate="no">nbits</code>, di mana setiap codebook berisi <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits centroid. Sebagai contoh, jika</span></span></span></span></span></span></span></span></span> <code translate="no">nbits = 8</code>, setiap codebook akan berisi 256 centroid. Setiap centroid diberi indeks unik dengan <code translate="no">nbits</code> bit.</p></li>
<li><p><strong>Kuantisasi</strong><strong>vektor</strong>: Untuk setiap sub-vektor dalam vektor asli, PQ mengidentifikasi centroid terdekat dalam subruang yang sesuai menggunakan jenis metrik tertentu. Proses ini secara efektif memetakan setiap sub-vektor ke vektor representatif terdekat dalam buku kode. Alih-alih menyimpan koordinat sub-vektor secara lengkap, hanya indeks dari centroid yang cocok yang disimpan.</p></li>
<li><p><strong>Representasi terkompresi</strong>: Representasi terkompresi akhir terdiri dari <code translate="no">m</code> indeks, satu dari setiap sub-ruang, yang secara kolektif disebut sebagai <strong>kode PQ</strong>. Pengkodean ini mengurangi kebutuhan penyimpanan dari <em>D × 32</em> bit (dengan asumsi angka floating-point 32-bit) menjadi <em>m</em> × <em>n bit</em>, mencapai kompresi yang substansial sambil mempertahankan kemampuan untuk memperkirakan jarak vektor.</p></li>
</ol>
<p>Untuk detail lebih lanjut tentang penyetelan dan pengoptimalan parameter, lihat Parameter <a href="/docs/id/ivf-pq.md#Index-params">indeks</a>.</p>
<div class="alert note">
<p>Pertimbangkan sebuah vektor dengan dimensi <em>D = 128</em> menggunakan angka floating-point 32-bit. Dengan parameter PQ <em>m = 64</em> (sub-vektor) dan <em>nbits = 8</em> (dengan demikian <em>k =</em> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">282^8</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> 8</span></span></span></span></span></span></span></span></span> <em>= 256</em> centroid per subruang), kita dapat membandingkan kebutuhan penyimpanan:</p>
<ul>
<li><p>Vektor asli: 128 dimensi × 32 bit = 4.096 bit</p></li>
<li><p>Vektor yang dikompresi PQ: 64 sub-vektor × 8 bit = 512 bit</p></li>
</ul>
<p>Ini merupakan pengurangan 8x lipat dalam kebutuhan penyimpanan.</p>
</div>
<p><strong>Komputasi jarak dengan PQ</strong></p>
<p>Ketika melakukan pencarian kemiripan dengan vektor kueri, PQ memungkinkan komputasi jarak yang efisien melalui langkah-langkah berikut:</p>
<ol>
<li><p><strong>Prapemrosesan kueri</strong></p>
<ul>
<li><p>Vektor kueri diuraikan menjadi sub-vektor <code translate="no">m</code>, sesuai dengan struktur penguraian PQ yang asli.</p></li>
<li><p>Untuk setiap sub-vektor kueri dan buku kode yang sesuai (berisi <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits centroid), hitung dan simpan jarak ke semua centroid.</span></span></span></span></span></span></span></span></span> </p></li>
<li><p>Hal ini menghasilkan tabel pencarian <code translate="no">m</code>, di mana setiap tabel berisi <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits jarak.</span></span></span></span></span></span></span></span></span> </p></li>
</ul></li>
<li><p><strong>Perkiraan jarak</strong></p>
<p>Untuk setiap vektor basis data yang diwakili oleh kode PQ, perkiraan jaraknya ke vektor kueri dihitung sebagai berikut:</p>
<ul>
<li><p>Untuk setiap sub-vektor <code translate="no">m</code>, ambil jarak yang telah dihitung sebelumnya dari tabel pencarian yang sesuai menggunakan indeks centroid yang tersimpan.</p></li>
<li><p>Jumlahkan jarak <code translate="no">m</code> ini untuk mendapatkan perkiraan jarak berdasarkan jenis metrik tertentu (misalnya jarak Euclidean).</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-2.png" alt="Ivf Pq 2" class="doc-image" id="ivf-pq-2" />
   </span> <span class="img-wrapper"> <span>Ivf Pq 2</span> </span></p>
<h3 id="IVF-+-PQ" class="common-anchor-header">IVF + PQ</h3><p>Indeks <strong>IVF_PQ</strong> menggabungkan kekuatan <strong>IVF</strong> dan <strong>PQ</strong> untuk mempercepat pencarian. Proses ini bekerja dalam dua langkah:</p>
<ol>
<li><p><strong>Pemfilteran kasar dengan IVF</strong>: IVF mempartisi ruang vektor ke dalam kelompok-kelompok, sehingga mengurangi cakupan pencarian. Alih-alih mengevaluasi seluruh kumpulan data, algoritme ini hanya berfokus pada cluster yang paling dekat dengan vektor kueri.</p></li>
<li><p><strong>Perbandingan yang lebih baik dengan PQ</strong>: Di dalam cluster yang dipilih, PQ menggunakan representasi vektor yang dikompresi dan dikuantisasi untuk menghitung perkiraan jarak dengan cepat.</p></li>
</ol>
<p>Kinerja indeks <strong>IVF_PQ</strong> secara signifikan dipengaruhi oleh parameter yang mengontrol algoritma IVF dan PQ. Menyetel parameter ini sangat penting untuk mencapai hasil yang optimal untuk set data dan aplikasi tertentu. Informasi lebih rinci tentang parameter ini dan cara menyetelnya dapat ditemukan di <a href="/docs/id/ivf-pq.md#Index-params">Index params</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Membangun indeks<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk membangun indeks <code translate="no">IVF_PQ</code> pada bidang vektor di Milvus, gunakan metode <code translate="no">add_index()</code>, tentukan <code translate="no">index_type</code>, <code translate="no">metric_type</code>, dan parameter tambahan untuk indeks.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">index_type</code>: Jenis indeks yang akan dibangun. Dalam contoh ini, tetapkan nilainya ke <code translate="no">IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Metode yang digunakan untuk menghitung jarak antara vektor. Nilai yang didukung termasuk <code translate="no">COSINE</code>, <code translate="no">L2</code>, dan <code translate="no">IP</code>. Untuk detailnya, lihat <a href="/docs/id/metric.md">Jenis Metrik</a>.</p></li>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk membangun indeks.</p>
<ul>
<li><code translate="no">m</code>: Jumlah sub-vektor yang akan dibagi menjadi vektor.</li>
</ul>
<p>Untuk mempelajari lebih lanjut parameter pembuatan yang tersedia untuk indeks <code translate="no">IVF_PQ</code>, lihat Parameter <a href="/docs/id/ivf-pq.md#Index-building-params">pembuatan indeks</a>.</p></li>
</ul>
<p>Setelah parameter indeks dikonfigurasi, Anda dapat membuat indeks dengan menggunakan metode <code translate="no">create_index()</code> secara langsung atau mengoper parameter indeks dalam metode <code translate="no">create_collection</code>. Untuk detailnya, lihat <a href="/docs/id/create-collection.md">Membuat Koleksi</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Mencari di indeks<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah indeks dibuat dan entitas dimasukkan, Anda dapat melakukan pencarian kemiripan pada indeks.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk pencarian pada indeks.</p>
<ul>
<li><code translate="no">nprobe</code>: Jumlah kluster yang akan dicari.</li>
</ul>
<p>Untuk mempelajari lebih lanjut parameter pencarian yang tersedia untuk indeks <code translate="no">IVF_PQ</code>, lihat Parameter <a href="/docs/id/ivf-pq.md#Index-specific-search-params">pencarian khusus indeks</a>.</p></li>
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
    </button></h2><p>Bagian ini memberikan gambaran umum tentang parameter yang digunakan untuk membangun indeks dan melakukan pencarian pada indeks.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter pembangunan indeks</h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> saat <a href="/docs/id/ivf-pq.md#Build-index">membangun indeks.</a></p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Jumlah klaster yang akan dibuat menggunakan algoritme k-means selama pembuatan indeks.</p></td>
     <td><p><strong>Jenis</strong>: <strong>Rentang</strong> bilangan bulat: [1, 65536]</p><p><strong>Nilai default</strong>: <code translate="no">128</code></p></td>
     <td><p>Nilai <code translate="no">nlist</code> yang lebih besar meningkatkan daya ingat dengan membuat klaster yang lebih halus, tetapi meningkatkan waktu pembuatan indeks. Optimalkan berdasarkan ukuran set data dan sumber daya yang tersedia. Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Jumlah sub-vektor (digunakan untuk kuantisasi) untuk membagi setiap vektor dimensi tinggi selama proses kuantisasi.</p></td>
     <td><p><strong>Jenis</strong>: Bilangan bulat <strong>Rentang</strong>: [1, 65536]</p><p><strong>Nilai default</strong>: Tidak ada</p></td>
     <td><p>Nilai <code translate="no">m</code> yang lebih tinggi dapat meningkatkan akurasi, tetapi juga meningkatkan kompleksitas komputasi dan penggunaan memori. <code translate="no">m</code> harus merupakan pembagi dimensi vektor<em>(D)</em> untuk memastikan penguraian yang tepat. Nilai yang umumnya direkomendasikan adalah <em>m = D/2</em>.</p><p>Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [D/8, D].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Jumlah bit yang digunakan untuk merepresentasikan indeks centroid setiap sub-vektor dalam bentuk terkompresi. Secara langsung menentukan ukuran setiap codebook. Setiap codebook akan berisi $2^{\textit{nbits}}$ centroid. Sebagai contoh, jika <code translate="no">nbits</code> diatur ke 8, setiap sub-vektor akan diwakili oleh indeks centroid 8-bit. Hal ini memungkinkan adanya $2^8$ (256) kemungkinan centroid dalam buku kode untuk sub-vektor tersebut.</p></td>
     <td><p><strong>Jenis</strong>: <strong>Rentang</strong> Bilangan Bulat: [1, 64]</p><p><strong>Nilai default</strong>: <code translate="no">8</code></p></td>
     <td><p>Nilai <code translate="no">nbits</code> yang lebih tinggi memungkinkan codebook yang lebih besar, yang berpotensi menghasilkan representasi yang lebih akurat dari vektor asli. Namun, ini juga berarti menggunakan lebih banyak bit untuk menyimpan setiap indeks, sehingga kompresi menjadi lebih sedikit. Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [1, 16].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parameter pencarian khusus indeks</h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> saat <a href="/docs/id/ivf-pq.md#Search-on-index">mencari di indeks</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Jumlah cluster untuk mencari kandidat.</p></td>
     <td><p><strong>Tipe</strong> Bilangan bulat <strong>Rentang</strong>: [1, <em>nlist</em>]</p><p><strong>Nilai default</strong>: <code translate="no">8</code></p></td>
     <td><p>Nilai yang lebih tinggi memungkinkan lebih banyak klaster untuk dicari, meningkatkan daya ingat dengan memperluas cakupan pencarian, tetapi dengan biaya peningkatan latensi kueri. Tetapkan <code translate="no">nprobe</code> secara proporsional dengan <code translate="no">nlist</code> untuk menyeimbangkan kecepatan dan akurasi.</p><p>Pada kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam kisaran ini: [1, nlist].</p></td>
   </tr>
</table>
