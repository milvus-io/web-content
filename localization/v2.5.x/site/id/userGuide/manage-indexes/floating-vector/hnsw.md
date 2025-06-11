---
id: hnsw.md
title: HNSW
summary: >-
  Indeks HNSW adalah algoritme pengindeksan berbasis grafik yang dapat
  meningkatkan kinerja saat mencari vektor mengambang berdimensi tinggi. Indeks
  ini menawarkan akurasi pencarian yang sangat baik dan latensi yang rendah,
  namun membutuhkan overhead memori yang tinggi untuk mempertahankan struktur
  graf hirarkinya.
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
    </button></h1><p>Indeks <strong>HNSW</strong> adalah algoritme pengindeksan <strong>berbasis grafik</strong> yang dapat meningkatkan performa saat mencari vektor mengambang berdimensi tinggi. Indeks ini menawarkan akurasi pencarian yang <strong>sangat baik</strong> dan latensi yang <strong>rendah</strong>, namun membutuhkan overhead memori yang <strong>tinggi</strong> untuk mempertahankan struktur graf hirarkinya.</p>
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
    </button></h2><p>Algoritme Hierarchical Navigable Small World (HNSW) membuat grafik berlapis-lapis, seperti peta dengan tingkat pembesaran yang berbeda. <strong>Lapisan paling bawah</strong> berisi semua titik data, sedangkan <strong>lapisan atas</strong> terdiri dari subset titik data yang diambil sampelnya dari lapisan bawah.</p>
<p>Dalam hierarki ini, setiap lapisan berisi node yang mewakili titik data, yang dihubungkan oleh tepi yang menunjukkan kedekatannya. Lapisan yang lebih tinggi menyediakan lompatan jarak jauh untuk mendekati target dengan cepat, sedangkan lapisan yang lebih rendah memungkinkan pencarian yang lebih halus untuk mendapatkan hasil yang paling akurat.</p>
<p>Inilah cara kerjanya:</p>
<ol>
<li><p><strong>Titik masuk</strong>: Pencarian dimulai dari titik masuk tetap di lapisan teratas, yang merupakan simpul yang telah ditentukan sebelumnya dalam grafik.</p></li>
<li><p><strong>Pencarian serakah</strong>: Algoritme dengan rakus bergerak ke tetangga terdekat pada lapisan saat ini hingga tidak bisa lebih dekat lagi ke vektor kueri. Lapisan atas melayani tujuan navigasi, bertindak sebagai filter kasar untuk menemukan titik masuk potensial untuk pencarian yang lebih baik di tingkat yang lebih rendah.</p></li>
<li><p><strong>Lapisan turun</strong>: Setelah <strong>minimum lokal</strong> tercapai pada lapisan saat ini, algoritme akan turun ke lapisan yang lebih rendah, menggunakan koneksi yang telah dibuat sebelumnya, dan mengulangi pencarian yang serakah.</p></li>
<li><p><strong>Penyempurnaan</strong><strong>akhir</strong>: Proses ini berlanjut hingga lapisan paling bawah tercapai, di mana langkah penyempurnaan akhir mengidentifikasi tetangga terdekat.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/HNSW.png" alt="HNSW" class="doc-image" id="hnsw" />
   </span> <span class="img-wrapper"> <span>HNSW</span> </span></p>
<p>Kinerja HNSW bergantung pada beberapa parameter kunci yang mengontrol struktur graf dan perilaku pencarian. Parameter-parameter tersebut antara lain:</p>
<ul>
<li><p><code translate="no">M</code>: Jumlah maksimum sisi atau koneksi yang dapat dimiliki oleh setiap simpul dalam graf pada setiap tingkat hirarki. <code translate="no">M</code> yang lebih tinggi menghasilkan graf yang lebih padat dan meningkatkan daya ingat dan akurasi karena pencarian memiliki lebih banyak jalur untuk dijelajahi, yang juga menghabiskan lebih banyak memori dan memperlambat waktu penyisipan karena adanya koneksi tambahan. Seperti yang ditunjukkan pada gambar di atas, <strong>M = 5</strong> mengindikasikan bahwa setiap simpul pada graf HNSW terhubung langsung dengan maksimal 5 simpul lainnya. Hal ini menciptakan struktur graf yang cukup padat di mana setiap node memiliki banyak jalur untuk mencapai node lainnya.</p></li>
<li><p><code translate="no">efConstruction</code>: Jumlah kandidat yang dipertimbangkan selama konstruksi indeks. <code translate="no">efConstruction</code> yang lebih tinggi umumnya menghasilkan kualitas graf yang lebih baik tetapi membutuhkan lebih banyak waktu untuk membangunnya.</p></li>
<li><p><code translate="no">ef</code>: Jumlah tetangga yang dievaluasi selama pencarian. Meningkatkan <code translate="no">ef</code> akan meningkatkan kemungkinan menemukan tetangga terdekat tetapi memperlambat proses pencarian.</p></li>
</ul>
<p>Untuk detail tentang cara menyesuaikan pengaturan ini agar sesuai dengan kebutuhan Anda, lihat <a href="/docs/id/v2.5.x/hnsw.md#Index-params">Parameter indeks</a>.</p>
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
    </button></h2><p>Untuk membangun indeks <code translate="no">HNSW</code> pada bidang vektor di Milvus, gunakan metode <code translate="no">add_index()</code>, tentukan <code translate="no">index_type</code>, <code translate="no">metric_type</code>, dan parameter tambahan untuk indeks.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

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
<button class="copy-code-btn"></button></code></pre>

<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">index_type</code>: Jenis indeks yang akan dibangun. Dalam contoh ini, tetapkan nilainya ke <code translate="no">HNSW</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Metode yang digunakan untuk menghitung jarak antara vektor. Nilai yang didukung termasuk <code translate="no">COSINE</code>, <code translate="no">L2</code>, dan <code translate="no">IP</code>. Untuk detailnya, lihat <a href="/docs/id/v2.5.x/metric.md">Jenis Metrik</a>.</p></li>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk membangun indeks.</p>
<ul>
<li><p><code translate="no">M</code>: Jumlah maksimum tetangga yang dapat dihubungkan oleh setiap node.</p></li>
<li><p><code translate="no">efConstruction</code>: Jumlah kandidat tetangga yang dipertimbangkan untuk koneksi selama pembangunan indeks.</p></li>
</ul>
<p>Untuk mempelajari lebih lanjut parameter pembangunan yang tersedia untuk indeks <code translate="no">HNSW</code>, lihat Parameter <a href="/docs/id/v2.5.x/hnsw.md#Index-building-params">pembangunan indeks</a>.</p></li>
</ul>
<p>Setelah parameter indeks dikonfigurasi, Anda dapat membuat indeks dengan menggunakan metode <code translate="no">create_index()</code> secara langsung atau mengoper parameter indeks dalam metode <code translate="no">create_collection</code>. Untuk detailnya, lihat <a href="/docs/id/v2.5.x/create-collection.md">Membuat Koleksi</a>.</p>
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
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

res = MilvusClient.search(
collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment"># Query vector</span>
limit=<span class="hljs-number">10</span>, <span class="hljs-comment"># TopK results to return</span>
search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>

<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk pencarian pada indeks.</p>
<ul>
<li><code translate="no">ef</code>: Jumlah tetangga yang perlu dipertimbangkan selama pencarian.</li>
</ul>
<p>Untuk mempelajari lebih lanjut parameter pencarian yang tersedia untuk indeks <code translate="no">HNSW</code>, lihat Parameter <a href="/docs/id/v2.5.x/hnsw.md#Index-specific-search-params">pencarian khusus indeks</a>.</p></li>
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
    </button></h2><p>Bagian ini memberikan ikhtisar parameter yang digunakan untuk membangun indeks dan melakukan pencarian pada indeks.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter pembangunan indeks</h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> saat <a href="/docs/id/v2.5.x/hnsw.md#Build-index">membangun indeks.</a></p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Jumlah maksimum koneksi (atau sisi) yang dapat dimiliki oleh setiap simpul dalam graf, termasuk sisi keluar dan masuk. Parameter ini secara langsung mempengaruhi konstruksi indeks dan pencarian.</p></td>
     <td><p><strong>Jenis</strong>: <strong>Rentang</strong> Bilangan Bulat: [2, 2048]</p><p><strong>Nilai default</strong>: <code translate="no">30</code> (hingga 30 sisi keluar dan 30 sisi masuk per simpul)</p></td>
     <td><p><code translate="no">M</code> yang lebih besar umumnya menghasilkan <strong>akurasi yang lebih tinggi</strong> tetapi <strong>meningkatkan overhead memori</strong> dan <strong>memperlambat pembangunan indeks dan pencarian</strong>. Pertimbangkan untuk meningkatkan <code translate="no">M</code> untuk dataset dengan dimensi tinggi atau ketika pemanggilan yang tinggi sangat penting.</p><p>Pertimbangkan untuk mengurangi <code translate="no">M</code> ketika penggunaan memori dan kecepatan pencarian menjadi perhatian utama.</p><p>Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [5, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Jumlah kandidat tetangga yang dipertimbangkan untuk koneksi selama konstruksi indeks. Kumpulan kandidat yang lebih besar dievaluasi untuk setiap elemen baru, tetapi jumlah maksimum koneksi yang benar-benar dibuat masih dibatasi oleh <code translate="no">M</code>.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat <strong>Rentang</strong>: [1, <em>int_max</em>]</p><p><strong>Nilai default</strong>: <code translate="no">360</code></p></td>
     <td><p>Nilai <code translate="no">efConstruction</code> yang lebih tinggi biasanya menghasilkan <strong>indeks yang lebih akurat</strong>, karena lebih banyak koneksi potensial yang dieksplorasi. Namun, hal ini juga menyebabkan <strong>waktu pengindeksan yang lebih lama dan penggunaan memori yang lebih besar</strong> selama konstruksi. Pertimbangkan untuk meningkatkan <code translate="no">efConstruction</code> untuk meningkatkan akurasi, terutama dalam skenario di mana waktu pengindeksan tidak terlalu penting.</p><p>Pertimbangkan untuk mengurangi <code translate="no">efConstruction</code> untuk mempercepat konstruksi indeks ketika keterbatasan sumber daya menjadi perhatian.</p><p>Dalam kebanyakan kasus, kami menyarankan Anda menetapkan nilai dalam kisaran ini: [50, 500].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parameter pencarian khusus indeks</h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> ketika melakukan <a href="/docs/id/v2.5.x/hnsw.md#Search-on-index">pencarian di indeks</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Mengontrol luasnya pencarian selama pengambilan tetangga terdekat. Ini menentukan berapa banyak node yang dikunjungi dan dievaluasi sebagai tetangga terdekat yang potensial.  Parameter ini hanya mempengaruhi proses pencarian dan berlaku secara eksklusif untuk lapisan bawah grafik.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat <strong>Rentang</strong>: [1, <em>int_max</em>]</p><p><strong>Nilai default</strong>: <em>batas</em> (tetangga terdekat TopK yang akan dikembalikan)</p></td>
     <td><p><code translate="no">ef</code> yang lebih besar umumnya menghasilkan <strong>akurasi pencarian yang lebih tinggi</strong> karena lebih banyak tetangga potensial yang dipertimbangkan. Akan tetapi, hal ini juga <strong>meningkatkan waktu pencarian</strong>. Pertimbangkan untuk meningkatkan <code translate="no">ef</code> ketika mencapai recall yang tinggi sangat penting dan kecepatan pencarian tidak terlalu menjadi perhatian.</p><p>Pertimbangkan untuk mengurangi <code translate="no">ef</code> untuk memprioritaskan pencarian yang lebih cepat, terutama dalam skenario di mana sedikit penurunan akurasi dapat diterima.</p><p>Dalam kebanyakan kasus, kami sarankan Anda menetapkan nilai dalam kisaran ini: [K, 10K].</p></td>
   </tr>
</table>
