---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQ menggabungkan grafik Hierarchical Navigable Small World (HNSW) dengan
  Scalar Quantization (SQ), menciptakan metode pengindeksan vektor tingkat
  lanjut yang menawarkan pertukaran ukuran versus akurasi yang dapat dikontrol.
  Dibandingkan dengan HNSW standar, jenis indeks ini mempertahankan kecepatan
  pemrosesan kueri yang tinggi sambil memperkenalkan sedikit peningkatan waktu
  konstruksi indeks.
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
    </button></h1><p><strong>HNSW_SQ</strong> menggabungkan grafik Hierarchical Navigable Small World (HNSW) dengan Scalar Quantization (SQ), menciptakan metode pengindeksan vektor tingkat lanjut yang menawarkan pertukaran ukuran versus akurasi yang dapat dikontrol. Dibandingkan dengan <a href="/docs/id/hnsw.md">HNSW</a> standar, jenis indeks ini mempertahankan kecepatan pemrosesan kueri yang tinggi sambil memperkenalkan sedikit peningkatan waktu konstruksi indeks.</p>
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
    </button></h2><p>HNSW_SQ menggabungkan dua teknik pengindeksan: <strong>HNSW</strong> untuk navigasi berbasis grafik yang cepat dan <strong>SQ</strong> untuk kompresi vektor yang efisien.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW membangun grafik multi-layer di mana setiap node berhubungan dengan sebuah vektor dalam kumpulan data. Dalam grafik ini, node terhubung berdasarkan kesamaan mereka, memungkinkan penjelajahan yang cepat melalui ruang data. Struktur hirarkis memungkinkan algoritme pencarian untuk mempersempit kandidat tetangga, sehingga secara signifikan mempercepat proses pencarian dalam ruang dimensi tinggi.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/hnsw.md">HNSW</a>.</p>
<h3 id="SQ" class="common-anchor-header">SQ</h3><p>SQ adalah metode untuk mengompresi vektor dengan merepresentasikannya dengan bit yang lebih sedikit. Sebagai contoh:</p>
<ul>
<li><p><strong>SQ8</strong> menggunakan 8 bit, memetakan nilai ke dalam 256 level.  Untuk informasi lebih lanjut, lihat <a href="/docs/id/ivf-sq8.md#SQ8">IVF_SQ8</a>.</p></li>
<li><p><strong>SQ6</strong> menggunakan 6 bit untuk merepresentasikan setiap nilai floating-point, sehingga menghasilkan 64 level diskrit.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" />
   </span> <span class="img-wrapper"> <span>Hnsw Sq</span> </span></p>
<p>Pengurangan presisi ini secara dramatis mengurangi jejak memori dan mempercepat komputasi sambil tetap mempertahankan struktur data yang penting.</p>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ</h3><p>HNSW_SQ menggabungkan kekuatan HNSW dan SQ untuk memungkinkan pencarian tetangga terdekat yang efisien. Berikut cara kerja prosesnya:</p>
<ol>
<li><p><strong>Kompresi Data:</strong> SQ mengompresi vektor menggunakan <code translate="no">sq_type</code> (misalnya, SQ6 atau SQ8), yang mengurangi penggunaan memori. Kompresi ini dapat menurunkan presisi, tetapi memungkinkan sistem untuk menangani kumpulan data yang lebih besar.</p></li>
<li><p><strong>Konstruksi Grafik:</strong> Vektor-vektor yang dikompresi digunakan untuk membangun grafik HNSW. Karena data dikompresi, grafik yang dihasilkan lebih kecil dan lebih cepat untuk dicari.</p></li>
<li><p><strong>Pengambilan Kandidat:</strong> Ketika vektor kueri disediakan, algoritma menggunakan data yang dikompresi untuk dengan cepat mengidentifikasi kumpulan kandidat tetangga dari graf HNSW.</p></li>
<li><p><strong>(Opsional) Penyempurnaan Hasil:</strong> Hasil kandidat awal dapat disempurnakan untuk akurasi yang lebih baik, berdasarkan parameter berikut:</p>
<ul>
<li><p><code translate="no">refine</code>: Mengontrol apakah langkah penyempurnaan ini diaktifkan. Jika diatur ke <code translate="no">true</code>, sistem akan menghitung ulang jarak menggunakan representasi yang lebih presisi atau tidak terkompresi.</p></li>
<li><p><code translate="no">refine_type</code>: Menentukan tingkat presisi data yang digunakan selama penghalusan (misalnya, SQ6, SQ8, BF16). Pilihan presisi yang lebih tinggi seperti <code translate="no">FP32</code> dapat memberikan hasil yang lebih akurat tetapi membutuhkan lebih banyak memori. Ini harus melebihi ketepatan data terkompresi asli yang ditetapkan oleh <code translate="no">sq_type</code>.</p></li>
<li><p><code translate="no">refine_k</code>: Bertindak sebagai faktor pembesaran. Misalnya, jika <em>k</em> teratas Anda adalah 100 dan <code translate="no">refine_k</code> adalah 2, sistem akan mengurutkan ulang 200 kandidat teratas dan mengembalikan 100 terbaik, sehingga meningkatkan akurasi secara keseluruhan.</p></li>
</ul></li>
</ol>
<p>Untuk daftar lengkap parameter dan nilai yang valid, lihat Parameter <a href="/docs/id/hnsw-sq.md#Index-params">indeks</a>.</p>
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
    </button></h2><p>Untuk membangun indeks <code translate="no">HNSW_SQ</code> pada bidang vektor di Milvus, gunakan metode <code translate="no">add_index()</code>, tentukan <code translate="no">index_type</code>, <code translate="no">metric_type</code>, dan parameter tambahan untuk indeks.</p>
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
<li><p><code translate="no">index_type</code>: Jenis indeks yang akan dibangun. Dalam contoh ini, tetapkan nilainya ke <code translate="no">HNSW_SQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Metode yang digunakan untuk menghitung jarak antara vektor. Nilai yang didukung termasuk <code translate="no">COSINE</code>, <code translate="no">L2</code>, dan <code translate="no">IP</code>. Untuk detailnya, lihat <a href="/docs/id/metric.md">Jenis Metrik</a>.</p></li>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk membangun indeks. Untuk detailnya, lihat <a href="/docs/id/hnsw-sq.md#Index-building-params">Parameter pembuatan indeks</a>.</p></li>
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
    </button></h2><p>Bagian ini memberikan gambaran umum tentang parameter yang digunakan untuk membangun indeks dan melakukan pencarian pada indeks.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter pembuatan indeks</h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> saat <a href="/docs/id/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">membangun indeks.</a></p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Jumlah maksimum koneksi (atau sisi) yang dapat dimiliki setiap simpul dalam graf, termasuk sisi keluar dan masuk. Parameter ini secara langsung memengaruhi konstruksi indeks dan pencarian.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat <strong>Rentang</strong>: [2, 2048]</p>
<p><strong>Nilai default</strong>: <code translate="no">30</code> (hingga 30 sisi keluar dan 30 sisi masuk per simpul)</p></td>
     <td><p><code translate="no">M</code> yang lebih besar umumnya menghasilkan <strong>akurasi yang lebih tinggi</strong> tetapi <strong>meningkatkan overhead memori</strong> dan <strong>memperlambat pembangunan indeks dan pencarian</strong>. Pertimbangkan untuk meningkatkan <code translate="no">M</code> untuk set data dengan dimensi tinggi atau ketika pemanggilan yang tinggi sangat penting.</p>
<p>Pertimbangkan untuk mengurangi <code translate="no">M</code> ketika penggunaan memori dan kecepatan pencarian menjadi perhatian utama.</p>
<p>Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Jumlah kandidat tetangga yang dipertimbangkan untuk koneksi selama konstruksi indeks. Kumpulan kandidat yang lebih besar dievaluasi untuk setiap elemen baru, tetapi jumlah maksimum koneksi yang benar-benar dibuat masih dibatasi oleh <code translate="no">M</code>.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat <strong>Rentang</strong>: [1, <em>int_max</em>]</p>
<p><strong>Nilai default</strong>: <code translate="no">360</code></p></td>
     <td><p>Nilai <code translate="no">efConstruction</code> yang lebih tinggi biasanya menghasilkan <strong>indeks yang lebih akurat</strong>, karena lebih banyak koneksi potensial yang dieksplorasi. Namun, hal ini juga menyebabkan <strong>waktu pengindeksan yang lebih lama dan peningkatan penggunaan memori</strong> selama konstruksi. Pertimbangkan untuk meningkatkan <code translate="no">efConstruction</code> untuk meningkatkan akurasi, terutama dalam skenario di mana waktu pengindeksan tidak terlalu penting.</p>
<p>Pertimbangkan untuk mengurangi <code translate="no">efConstruction</code> untuk mempercepat konstruksi indeks ketika keterbatasan sumber daya menjadi perhatian.</p>
<p>Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>Menentukan metode kuantisasi skalar untuk mengompresi vektor. Setiap opsi menawarkan keseimbangan yang berbeda antara kompresi dan akurasi:</p>
<ul>
<li><p><code translate="no">SQ6</code>: Mengkodekan vektor menggunakan bilangan bulat 6-bit.</p></li>
<li><p><code translate="no">SQ8</code>: Mengkodekan vektor menggunakan bilangan bulat 8-bit.</p></li>
<li><p><code translate="no">BF16</code>: Menggunakan format Bfloat16.</p></li>
<li><p><code translate="no">FP16</code>: Menggunakan format floating-point 16-bit standar.</p></li>
</ul></td>
     <td><p><strong>Jenis</strong> <strong>Rentang</strong> String: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code> ]</p>
<p><strong>Nilai default</strong>: <code translate="no">SQ8</code></p></td>
     <td><p>Pilihan <code translate="no">sq_type</code> tergantung pada kebutuhan aplikasi tertentu. Jika efisiensi memori merupakan perhatian utama, <code translate="no">SQ6</code> atau <code translate="no">SQ8</code> mungkin cocok. Di sisi lain, jika akurasi adalah yang terpenting, <code translate="no">BF16</code> atau <code translate="no">FP16</code> dapat menjadi pilihan.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Bendera boolean yang mengontrol apakah langkah penyempurnaan diterapkan selama pencarian. Refinement melibatkan pemeringkatan ulang hasil awal dengan menghitung jarak yang tepat antara vektor kueri dan kandidat.</p></td>
     <td><p><strong>Jenis</strong>: <strong>Rentang</strong> Boolean: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>Nilai default</strong>: <code translate="no">false</code></p></td>
     <td><p>Setel ke <code translate="no">true</code> jika akurasi tinggi sangat penting dan Anda dapat mentolerir waktu pencarian yang sedikit lebih lambat. Gunakan <code translate="no">false</code> jika kecepatan adalah prioritas dan kompromi kecil dalam akurasi dapat diterima.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Menentukan ketepatan data yang digunakan untuk perbaikan. Ketepatan ini harus lebih tinggi daripada vektor yang dikompresi (seperti yang ditetapkan oleh <code translate="no">sq_type</code>), yang mempengaruhi akurasi vektor yang diperingkat ulang dan jejak memorinya.</p></td>
     <td><p><strong>Jenis</strong>: <strong>Rentang</strong> String:[ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>Nilai default</strong>: Tidak ada</p></td>
     <td><p>Gunakan <code translate="no">FP32</code> untuk presisi maksimum dengan biaya memori yang lebih tinggi, atau <code translate="no">SQ6</code>/<code translate="no">SQ8</code> untuk kompresi yang lebih baik. <code translate="no">BF16</code> dan <code translate="no">FP16</code> menawarkan alternatif yang seimbang.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parameter pencarian khusus indeks</h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> saat <a href="/docs/id/hnsw-sq.md#share-DeFldzMQQoc2W4x2YiIcYUbqnne">mencari di indeks</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Mengontrol luasnya pencarian selama pencarian tetangga terdekat. Parameter ini menentukan berapa banyak node yang dikunjungi dan dievaluasi sebagai tetangga terdekat yang potensial. 
 Parameter ini hanya memengaruhi proses pencarian dan berlaku secara eksklusif pada lapisan bawah grafik.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat <strong>Rentang</strong>: [1, <em>int_max</em>]</p>
<p><strong>Nilai default</strong>: <em>batas</em> (tetangga terdekat TopK yang akan dikembalikan)</p></td>
     <td><p><code translate="no">ef</code> yang lebih besar umumnya menghasilkan <strong>akurasi pencarian yang lebih tinggi</strong> karena lebih banyak tetangga potensial yang dipertimbangkan. Namun, hal ini juga <strong>meningkatkan waktu pencarian</strong>. Pertimbangkan untuk meningkatkan <code translate="no">ef</code> ketika mencapai recall yang tinggi sangat penting dan kecepatan pencarian tidak terlalu menjadi perhatian.</p>
<p>Pertimbangkan untuk mengurangi <code translate="no">ef</code> untuk memprioritaskan pencarian yang lebih cepat, terutama dalam skenario di mana sedikit penurunan akurasi dapat diterima.</p>
<p>Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Faktor pembesaran yang mengontrol berapa banyak kandidat tambahan yang diperiksa selama tahap penyempurnaan, relatif terhadap K hasil teratas yang diminta.</p></td>
     <td><p><strong>Tipe</strong> <strong>Rentang</strong> Float: [1, <em>float_max</em>)</p>
<p><strong>Nilai default</strong>: 1</p></td>
     <td><p>Nilai yang lebih tinggi dari <code translate="no">refine_k</code> dapat meningkatkan recall dan akurasi, tetapi juga akan meningkatkan waktu pencarian dan penggunaan sumber daya. Nilai 1 berarti proses penyempurnaan hanya mempertimbangkan hasil K teratas awal.</p></td>
   </tr>
</table>
