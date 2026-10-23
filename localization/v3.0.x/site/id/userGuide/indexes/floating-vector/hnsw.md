---
id: hnsw.md
title: HNSW
summary: >-
  Indeks HNSW adalah algoritma pengindeksan berbasis graf yang dapat
  meningkatkan kinerja saat melakukan pencarian pada vektor floating-point
  berdimensi tinggi. Algoritma ini menawarkan akurasi pencarian yang sangat baik
  dan latensi rendah, namun membutuhkan penggunaan memori yang besar untuk
  mempertahankan struktur graf hierarkisnya.
---
<h1 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h1><p>Indeks <strong>HNSW</strong> adalah algoritma pengindeksan <strong>berbasis graf</strong> yang dapat meningkatkan kinerja saat mencari vektor floating-point berdimensi tinggi. Algoritma ini menawarkan akurasi pencarian <strong>yang sangat baik</strong> dan latensi <strong>rendah</strong>, namun membutuhkan penggunaan memori <strong>yang tinggi</strong> untuk mempertahankan struktur graf hierarkisnya.</p>
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
    </button></h2><p>Algoritma Hierarchical Navigable Small World (HNSW) membangun grafik berlapis-lapis, mirip seperti peta dengan tingkat zoom yang berbeda-beda. <strong>Lapisan terbawah</strong> berisi semua titik data, sedangkan <strong>lapisan atas</strong> terdiri dari himpunan bagian titik data yang diambil dari lapisan bawah.</p>
<p>Dalam hierarki ini, setiap lapisan berisi simpul yang mewakili titik data, yang dihubungkan oleh tepi yang menunjukkan kedekatannya. Lapisan yang lebih tinggi memungkinkan lompatan jarak jauh untuk dengan cepat mendekati target, sedangkan lapisan yang lebih bawah memungkinkan pencarian yang lebih terperinci untuk hasil yang paling akurat.</p>
<p>Begini cara kerjanya:</p>
<ol>
<li><p><strong>Titik masuk</strong>: Pencarian dimulai dari titik masuk tetap di lapisan teratas, yang merupakan simpul yang telah ditentukan sebelumnya dalam grafik.</p></li>
<li><p><strong>Pencarian serakah</strong>: Algoritma ini secara serakah berpindah ke tetangga terdekat di lapisan saat ini hingga tidak dapat lagi mendekati vektor kueri. Lapisan atas berfungsi sebagai alat navigasi, bertindak sebagai filter kasar untuk menemukan titik masuk potensial bagi pencarian yang lebih mendetail di tingkat yang lebih rendah.</p></li>
<li><p><strong>Penurunan lapisan</strong>: Setelah titik <strong>minimum lokal</strong> tercapai di lapisan saat ini, algoritma melompat ke lapisan yang lebih rendah, menggunakan koneksi yang telah ditetapkan sebelumnya, dan mengulangi pencarian rakus.</p></li>
<li><p><strong>Penyempurnaan</strong><strong>akhir</strong>: Proses ini berlanjut hingga lapisan terbawah tercapai, di mana langkah penyempurnaan akhir mengidentifikasi tetangga terdekat.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" /> 
   <span>HNSW</span>
  
 </span></p>
<p>Kinerja HNSW bergantung pada beberapa parameter kunci yang mengontrol baik struktur graf maupun perilaku pencarian. Parameter-parameter tersebut meliputi:</p>
<ul>
<li><p><code translate="no">M</code>: Jumlah maksimum tepi atau koneksi yang dapat dimiliki setiap simpul dalam graf pada setiap tingkat hierarki. Nilai <code translate="no">M</code> yang lebih tinggi menghasilkan graf yang lebih padat serta meningkatkan recall dan akurasi karena pencarian memiliki lebih banyak jalur untuk dieksplorasi, yang juga menghabiskan lebih banyak memori dan memperlambat waktu penyisipan akibat koneksi tambahan. Seperti yang ditunjukkan pada gambar di atas, <strong>M = 5</strong> menunjukkan bahwa setiap simpul dalam graf HNSW terhubung langsung dengan maksimal 5 simpul lainnya. Hal ini menciptakan struktur graf yang cukup padat di mana simpul-simpul memiliki beberapa jalur untuk mencapai simpul lainnya.</p></li>
<li><p><code translate="no">efConstruction</code>: Jumlah kandidat yang dipertimbangkan selama pembuatan indeks. Nilai <code translate="no">efConstruction</code> yang lebih tinggi umumnya menghasilkan graf dengan kualitas lebih baik, tetapi membutuhkan waktu lebih lama untuk dibuat.</p></li>
<li><p><code translate="no">ef</code>: Jumlah tetangga yang dievaluasi selama proses pencarian. Meningkatkan nilai ` <code translate="no">ef</code> ` meningkatkan kemungkinan menemukan tetangga terdekat, tetapi memperlambat proses pencarian.</p></li>
</ul>
<p>Untuk detail tentang cara menyesuaikan pengaturan ini sesuai kebutuhan Anda, lihat <a href="/docs/id/hnsw.md#Index-params">Parameter indeks</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Buat indeks<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh ini menggunakan klien terhubung bernama ` <code translate="no">client</code> ` dan koleksi yang sudah ada bernama ` <code translate="no">your_collection_name</code>`. Koleksi tersebut memiliki bidang vektor lima dimensi bernama ` <code translate="no">your_vector_field_name</code>`.</p>
<p>Tentukan parameter indeks dengan <code translate="no">add_index()</code>, lalu buat indeks dengan <code translate="no">create_index()</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
    } <span class="hljs-comment"># Index building params</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">index_type</code>: Jenis indeks yang akan dibangun. Dalam contoh ini, tetapkan nilainya ke <code translate="no">HNSW</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Metode yang digunakan untuk menghitung jarak antar vektor. Nilai yang didukung meliputi <code translate="no">COSINE</code>, <code translate="no">L2</code>, dan <code translate="no">IP</code>. Untuk detailnya, lihat <a href="/docs/id/metric.md">Jenis Metrik</a>.</p></li>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk membangun indeks.</p>
<ul>
<li><p><code translate="no">M</code>: Jumlah maksimum tetangga yang dapat dihubungkan oleh setiap node.</p></li>
<li><p><code translate="no">efConstruction</code>: Jumlah tetangga potensial yang dipertimbangkan untuk koneksi selama pembuatan indeks.</p></li>
</ul>
<p>Contoh ini menetapkan ` <code translate="no">M=64</code> ` dan ` <code translate="no">efConstruction=100</code> ` sebagai pengaturan penyesuaian. Untuk nilai default dan rentang yang diterima, lihat <a href="/docs/id/hnsw.md#Index-building-params">Parameter Pembuatan Indeks</a>.</p></li>
</ul>
<p>Untuk membuat koleksi dan indeksnya secara bersamaan, berikan parameter indeks ke <code translate="no">create_collection()</code>. Untuk detailnya, lihat <a href="/docs/id/create-collection.md">Membuat Koleksi</a>.</p>
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
    </button></h2><p>Setelah membangun indeks dan menyisipkan entitas, muat koleksi dan lakukan pencarian pada bidang vektornya. Untuk pencarian kNN biasa, atur ` <code translate="no">ef</code> ` setidaknya ke ` <code translate="no">limit</code>`.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

client.load_collection(collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>)

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk pencarian pada indeks.</p>
<ul>
<li><code translate="no">ef</code>: Jumlah tetangga yang akan dipertimbangkan selama pencarian.</li>
</ul>
<p>Untuk mempelajari lebih lanjut tentang parameter pencarian yang tersedia untuk indeks ` <code translate="no">HNSW</code> `, lihat <a href="/docs/id/hnsw.md#Index-specific-search-params">Parameter pencarian khusus indeks</a>.</p></li>
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
    </button></h2><p>Tabel di bawah ini mencantumkan parameter untuk pembuatan indeks dan pencarian. Pengaturan server dapat menggantikan nilai default untuk parameter yang Anda lewati.</p>
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> saat <a href="/docs/id/hnsw.md#Build-index">membangun indeks</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyesuaian</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Jumlah maksimum koneksi (atau tepi) yang dapat dimiliki setiap simpul dalam grafik, termasuk tepi keluar dan masuk. Parameter ini secara langsung memengaruhi pembuatan indeks dan pencarian.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan Bulat <strong>Rentang</strong>: [2, 2048]</p><p><strong>Nilai default</strong>: <code translate="no">30</code> (hingga 30 tepi keluar dan 30 tepi masuk per simpul)</p></td>
     <td><p>Nilai <code translate="no">M</code> yang lebih besar umumnya menghasilkan <strong>akurasi yang lebih tinggi</strong>, tetapi <strong>meningkatkan beban memori</strong> dan <strong>memperlambat proses pembuatan indeks serta pencarian</strong>. Pertimbangkan untuk meningkatkan <code translate="no">M</code> untuk dataset berdimensi tinggi atau ketika tingkat recall yang tinggi sangat penting.</p><p>Pertimbangkan untuk menurunkan nilai ` <code translate="no">M</code> ` jika penggunaan memori dan kecepatan pencarian menjadi prioritas utama.</p><p>Dalam kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam rentang ini: [5, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Jumlah tetangga kandidat yang dipertimbangkan untuk koneksi selama pembuatan indeks. Kumpulan kandidat yang lebih besar dievaluasi untuk setiap elemen baru, tetapi jumlah maksimum koneksi yang benar-benar terbentuk tetap dibatasi oleh <code translate="no">M</code>.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan Bulat <strong>Rentang</strong>: [1, <em>int_max</em>]</p><p><strong>Nilai default</strong>: <code translate="no">360</code></p></td>
     <td><p>Nilai ` <code translate="no">efConstruction</code> ` yang lebih tinggi biasanya menghasilkan <strong>indeks</strong> yang <strong>lebih akurat</strong>, karena lebih banyak koneksi potensial dieksplorasi. Namun, hal ini juga menyebabkan <strong>waktu pembuatan indeks yang lebih lama dan penggunaan memori yang lebih tinggi</strong> selama proses pembuatan. Pertimbangkan untuk meningkatkan ` <code translate="no">efConstruction</code> ` guna meningkatkan akurasi, terutama dalam skenario di mana waktu pembuatan indeks kurang kritis.</p><p>Pertimbangkan untuk menurunkan nilai ` <code translate="no">efConstruction</code> ` guna mempercepat proses pembuatan indeks jika keterbatasan sumber daya menjadi masalah.</p><p>Dalam kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam rentang ini: [50, 500].</p></td>
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> saat <a href="/docs/id/hnsw.md#Search-on-index">melakukan pencarian pada indeks</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyesuaian</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Mengontrol cakupan pencarian selama proses pengambilan tetangga terdekat. Parameter ini menentukan berapa banyak simpul yang dikunjungi dan dievaluasi sebagai calon tetangga terdekat.  Parameter ini hanya memengaruhi proses pencarian dan berlaku secara eksklusif pada lapisan terbawah graf.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan Bulat <strong>Rentang</strong>: [1, <em>int_max</em>]</p><p><strong>Nilai default</strong>: <code translate="no">max(limit, 16)</code> untuk pencarian kNN biasa; <code translate="no">512</code> untuk pencarian rentang.</p><p>Untuk pencarian kNN biasa, nilai <code translate="no">ef</code> yang ditentukan secara eksplisit harus lebih besar dari atau sama dengan <code translate="no">limit</code> (jumlah tetangga terdekat yang akan dikembalikan).</p></td>
     <td><p>Nilai <code translate="no">ef</code> yang lebih besar umumnya menghasilkan <strong>akurasi pencarian yang lebih tinggi</strong> karena lebih banyak tetangga potensial dipertimbangkan. Namun, hal ini juga <strong>meningkatkan waktu pencarian</strong>. Pertimbangkan untuk meningkatkan <code translate="no">ef</code> ketika mencapai recall yang tinggi sangat penting dan kecepatan pencarian bukanlah prioritas utama.</p><p>Pertimbangkan untuk menurunkan nilai ` <code translate="no">ef</code> ` guna memprioritaskan kecepatan pencarian, terutama dalam skenario di mana penurunan akurasi yang sedikit dapat diterima.</p><p>Dalam kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam rentang berikut: [K, 10K].</p></td>
   </tr>
</table>
