---
id: ivf-pq.md
order: 2
summary: Artikel ini akan memperkenalkan indeks IVF_PQ di Milvus.
title: IVF_PQ
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
<li><strong>Pengelompokan:</strong> Kumpulan data vektor Anda dibagi ke dalam sejumlah klaster tertentu, menggunakan algoritme pengelompokan seperti k-means. Setiap klaster memiliki centroid (vektor representatif untuk klaster).</li>
<li><strong>Penugasan:</strong> Setiap vektor ditugaskan ke klaster yang memiliki centroid yang paling dekat dengannya.</li>
<li><strong>Indeks Terbalik:</strong> Sebuah indeks dibuat, memetakan setiap centroid klaster ke daftar vektor yang ditugaskan ke klaster tersebut.</li>
<li><strong>Pencarian:</strong> Saat Anda mencari tetangga terdekat, algoritme pencarian membandingkan vektor kueri Anda dengan centroid klaster dan memilih klaster yang paling menjanjikan. Pencarian kemudian dipersempit menjadi vektor dalam klaster yang dipilih.</li>
</ol>
<p>Untuk mempelajari lebih lanjut tentang detail teknisnya, lihat <a href="/docs/id/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p><strong>Product Quantization (PQ</strong> ) adalah metode kompresi untuk vektor berdimensi tinggi yang secara signifikan mengurangi kebutuhan penyimpanan sekaligus memungkinkan operasi pencarian kemiripan yang cepat.</p>
<p>Proses PQ melibatkan tahapan-tahapan utama berikut ini:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-1.png" alt="pq-process-1" class="doc-image" id="pq-process-1" />
   </span> <span class="img-wrapper"> <span>pq-process-1</span> </span></p>
<ol>
<li><strong>Dekomposisi dimensi</strong>: <code translate="no">m</code> Algoritme dimulai dengan menguraikan setiap vektor dimensi tinggi menjadi sub-vektor berukuran sama. Dekomposisi ini mengubah ruang dimensi-D asli menjadi <code translate="no">m</code> subruang yang terpisah-pisah, di mana setiap subruang berisi dimensi <em>D/m</em>. Parameter <code translate="no">m</code> mengontrol granularitas dekomposisi dan secara langsung mempengaruhi rasio kompresi.</li>
<li><strong>Pembuatan buku kode subruang</strong>: Di dalam setiap subruang, algoritme menerapkan <a href="https://en.wikipedia.org/wiki/K-means_clustering">pengelompokan k-means</a> untuk mempelajari sekumpulan vektor representatif (centroid). Centroid ini secara kolektif membentuk codebook untuk subruang tersebut. Jumlah centroid dalam setiap codebook ditentukan oleh parameter <code translate="no">nbits</code>, di mana setiap codebook berisi 2^nbit centroid. Sebagai contoh, jika <code translate="no">nbits = 8</code>, setiap codebook akan berisi 256 centroid. Setiap centroid diberi indeks unik dengan <code translate="no">nbits</code> bit.</li>
<li><strong>Kuantisasi</strong><strong>vektor</strong>: Untuk setiap sub-vektor dalam vektor asli, PQ mengidentifikasi centroid terdekat dalam subruang yang sesuai menggunakan jenis metrik tertentu. Proses ini secara efektif memetakan setiap sub-vektor ke vektor representatif terdekat dalam buku kode. Alih-alih menyimpan koordinat sub-vektor secara lengkap, hanya indeks dari centroid yang cocok yang disimpan.</li>
<li><strong>Representasi terkompresi</strong>: Representasi terkompresi akhir terdiri dari <code translate="no">m</code> indeks, satu dari setiap sub-ruang, yang secara kolektif disebut sebagai <strong>kode PQ</strong>. Pengkodean ini mengurangi kebutuhan penyimpanan dari <em>D × 32</em> bit (dengan asumsi angka floating-point 32-bit) menjadi <em>m</em> × <em>n bit</em>, mencapai kompresi yang substansial sambil mempertahankan kemampuan untuk memperkirakan jarak vektor.</li>
</ol>
<p>Untuk detail lebih lanjut tentang penyetelan dan pengoptimalan parameter, lihat Parameter <a href="#index-params">indeks</a>.</p>
<div class="alert note">
<p><strong>Contoh Kompresi</strong></p>
<p>Pertimbangkan sebuah vektor dengan dimensi <em>D = 128</em> menggunakan angka floating-point 32-bit. Dengan parameter PQ <em>m = 64</em> (sub-vektor) dan <em>nbits = 8</em> (dengan demikian <em>k =</em> 2^8 <em>= 256</em> centroid per subruang), kita dapat membandingkan kebutuhan penyimpanan:</p>
<ul>
<li>Vektor asli: 128 dimensi × 32 bit = 4.096 bit</li>
<li>Vektor yang dikompresi PQ: 64 sub-vektor × 8 bit = 512 bit</li>
</ul>
<p>Ini merupakan pengurangan 8x lipat dalam kebutuhan penyimpanan.</p>
</div>
<p><strong>Komputasi jarak dengan PQ</strong></p>
<p>Ketika melakukan pencarian kemiripan dengan vektor kueri, PQ memungkinkan komputasi jarak yang efisien melalui langkah-langkah berikut:</p>
<ol>
<li><p><strong>Prapemrosesan kueri</strong></p>
<ol>
<li>Vektor kueri diuraikan menjadi sub-vektor <code translate="no">m</code>, sesuai dengan struktur penguraian PQ yang asli.</li>
<li>Untuk setiap sub-vektor kueri dan buku kode yang sesuai (berisi centroid 2^nbit), hitung dan simpan jarak ke semua centroid.</li>
<li>Hal ini menghasilkan tabel pencarian <code translate="no">m</code>, di mana setiap tabel berisi jarak 2^nbit.</li>
</ol></li>
<li><p><strong>Perkiraan jarak</strong></p>
<p>Untuk setiap vektor basis data yang diwakili oleh kode PQ, perkiraan jaraknya ke vektor kueri dihitung sebagai berikut:</p>
<ol>
<li>Untuk setiap sub-vektor <code translate="no">m</code>, ambil jarak yang telah dihitung sebelumnya dari tabel pencarian yang sesuai menggunakan indeks centroid yang tersimpan.</li>
<li>Jumlahkan jarak <code translate="no">m</code> ini untuk mendapatkan perkiraan jarak berdasarkan jenis metrik tertentu (misalnya jarak Euclidean).</li>
</ol></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-2.png" alt="pq-process-1" class="doc-image" id="pq-process-1" />
   </span> <span class="img-wrapper"> <span>pq-proses-1</span> </span></p>
<h3 id="IVF-+-PQ" class="common-anchor-header">IVF + PQ</h3><p>Indeks <strong>IVF_PQ</strong> menggabungkan kekuatan <strong>IVF</strong> dan <strong>PQ</strong> untuk mempercepat pencarian. Proses ini bekerja dalam dua langkah:</p>
<ol>
<li><strong>Pemfilteran kasar dengan IVF</strong>: IVF mempartisi ruang vektor ke dalam kelompok, mengurangi cakupan pencarian. Alih-alih mengevaluasi seluruh kumpulan data, algoritme ini hanya berfokus pada cluster yang paling dekat dengan vektor kueri.</li>
<li><strong>Perbandingan yang lebih baik dengan PQ</strong>: Di dalam cluster yang dipilih, PQ menggunakan representasi vektor yang dikompresi dan dikuantisasi untuk menghitung perkiraan jarak dengan cepat.</li>
</ol>
<p>Kinerja indeks <strong>IVF_PQ</strong> secara signifikan dipengaruhi oleh parameter yang mengontrol algoritma IVF dan PQ. Menyetel parameter ini sangat penting untuk mencapai hasil yang optimal untuk set data dan aplikasi tertentu. Informasi lebih rinci tentang parameter ini dan cara menyetelnya dapat ditemukan di <a href="#index-params">Index params</a>.</p>
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
<p>Untuk mempelajari lebih lanjut parameter pembuatan yang tersedia untuk indeks <code translate="no">IVF_PQ</code>, lihat Parameter <a href="#Index-building-params">pembuatan indeks</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: 10, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],  <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">limit</span>=3,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)

<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk pencarian pada indeks.</p>
<ul>
<li><code translate="no">nprobe</code>: Jumlah kluster yang akan dicari.</li>
</ul>
<p>Untuk mempelajari lebih lanjut parameter pencarian yang tersedia untuk indeks <code translate="no">IVF_PQ</code>, lihat Parameter <a href="#index-specific-search-params">pencarian khusus indeks</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parameter pembangunan indeks</h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> saat <a href="#Build-index">membangun indeks.</a></p>
<table>
<thead>
<tr><th></th><th><strong>Parameter</strong></th><th><strong>Deskripsi</strong></th><th><strong>Rentang Nilai</strong></th><th><strong>Saran Penyetelan</strong></th></tr>
</thead>
<tbody>
<tr><td>IVF</td><td><code translate="no">nlist</code></td><td>Jumlah klaster yang akan dibuat menggunakan algoritme k-means selama pembuatan indeks.</td><td><strong>Tipe</strong> Bilangan bulat<br><strong>Rentang</strong>[1, 65536]<br><strong>Nilai default</strong>: <code translate="no">128</code></td><td>Nilai <code translate="no">nlist</code> yang lebih besar meningkatkan daya ingat dengan membuat klaster yang lebih halus, tetapi meningkatkan waktu pembuatan indeks. Optimalkan berdasarkan ukuran set data dan sumber daya yang tersedia.<br>Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [32, 4096].</td></tr>
<tr><td>PQ</td><td><code translate="no">m</code></td><td>Jumlah sub-vektor (digunakan untuk kuantisasi) untuk membagi setiap vektor dimensi tinggi selama proses kuantisasi.</td><td><strong>Jenis</strong> Bilangan bulat<br><strong>Rentang</strong>: [1, 65536]<br><strong>Nilai default</strong>: Tidak ada</td><td>Nilai <code translate="no">m</code> yang lebih tinggi dapat meningkatkan akurasi, tetapi juga meningkatkan kompleksitas komputasi dan penggunaan memori.<br><code translate="no">m</code> harus merupakan pembagi dimensi vektor<em>(D)</em> untuk memastikan dekomposisi yang tepat. Nilai yang umumnya direkomendasikan adalah <em>m = D/2</em>.<br>Dalam kebanyakan kasus, kami menyarankan Anda untuk menetapkan nilai dalam kisaran ini: [D/8, D].</td></tr>
<tr><td></td><td><code translate="no">nbits</code></td><td>Jumlah bit yang digunakan untuk merepresentasikan indeks centroid setiap sub-vektor dalam bentuk terkompresi. Ini secara langsung menentukan ukuran setiap codebook, setiap codebook akan berisi 2^nbits centroid. Sebagai contoh, jika <code translate="no">nbits</code> diatur ke 8, setiap sub-vektor akan diwakili oleh indeks centroid 8-bit. Hal ini memungkinkan adanya 2^8 (256) kemungkinan centroid dalam codebook untuk sub-vektor tersebut.</td><td><strong>Tipe</strong> Bilangan bulat<br><strong>Rentang</strong>: [1, 64]<br><strong>Nilai default</strong>: <code translate="no">8</code></td><td>Nilai <code translate="no">nbits</code> yang lebih tinggi memungkinkan buku kode yang lebih besar, yang berpotensi menghasilkan representasi yang lebih akurat dari vektor asli. Namun, ini juga berarti menggunakan lebih banyak bit untuk menyimpan setiap indeks, sehingga kompresi menjadi lebih sedikit.<br>Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [1, 16].</td></tr>
</tbody>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parameter pencarian khusus indeks</h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> saat <a href="#Search-on-index">mencari di indeks</a>.</p>
<table>
<thead>
<tr><th></th><th><strong>Parameter</strong></th><th><strong>Deskripsi</strong></th><th><strong>Rentang Nilai</strong></th><th><strong>Saran Penyetelan</strong></th></tr>
</thead>
<tbody>
<tr><td>IVF</td><td><code translate="no">nprobe</code></td><td>Jumlah cluster untuk mencari kandidat.</td><td><strong>Tipe</strong> Bilangan bulat<br><strong>Rentang</strong>[1, <em>nlist</em>]<br><strong>Nilai default</strong>: <code translate="no">8</code></td><td>Nilai yang lebih tinggi memungkinkan lebih banyak klaster untuk dicari, meningkatkan daya ingat dengan memperluas cakupan pencarian, tetapi dengan biaya peningkatan latensi kueri.<br>Tetapkan <code translate="no">nprobe</code> secara proporsional dengan <code translate="no">nlist</code> untuk menyeimbangkan kecepatan dan akurasi.<br>Pada kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam kisaran ini: [1, nlist].</td></tr>
</tbody>
</table>
