---
id: index.md
related_key: index
summary: Mekanisme indeks di Milvus.
title: Indeks dalam memori
---
<h1 id="In-memory-Index" class="common-anchor-header">Indeks dalam memori<button data-href="#In-memory-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini berisi daftar berbagai jenis indeks dalam memori yang didukung Milvus, skenario yang paling sesuai, dan parameter yang dapat dikonfigurasikan oleh pengguna untuk mendapatkan performa pencarian yang lebih baik. Untuk indeks dalam disk, lihat <strong><a href="/docs/id/disk_index.md">Indeks Dalam Disk</a></strong>.</p>
<p>Pengindeksan adalah proses pengorganisasian data secara efisien, dan ini memainkan peran utama dalam membuat pencarian kemiripan menjadi berguna dengan mempercepat kueri yang memakan waktu secara dramatis pada kumpulan data yang besar.</p>
<p>Untuk meningkatkan kinerja kueri, Anda dapat <a href="/docs/id/index-vector-fields.md">menentukan jenis indeks</a> untuk setiap bidang vektor.</p>
<div class="alert note">
Saat ini, bidang vektor hanya mendukung satu jenis indeks. Milvus secara otomatis menghapus indeks lama ketika mengganti jenis indeks.</div>
<h2 id="ANNS-vector-indexes" class="common-anchor-header">Indeks vektor ANNS<button data-href="#ANNS-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebagian besar jenis indeks vektor yang didukung oleh Milvus menggunakan algoritme pencarian tetangga terdekat (ANNS). Dibandingkan dengan pengambilan yang akurat, yang biasanya sangat memakan waktu, ide inti dari ANNS tidak lagi terbatas pada mengembalikan hasil yang paling akurat, tetapi hanya mencari tetangga dari target. ANNS meningkatkan efisiensi pengambilan dengan mengorbankan akurasi dalam kisaran yang dapat diterima.</p>
<p>Menurut metode implementasinya, indeks vektor ANNS dapat dikategorikan ke dalam empat jenis: Berbasis pohon, berbasis grafik, berbasis hash, dan berbasis kuantisasi.</p>
<h2 id="Indexes-supported-in-Milvus" class="common-anchor-header">Indeks yang didukung dalam Milvus<button data-href="#Indexes-supported-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mendukung berbagai jenis indeks, yang dikategorikan berdasarkan jenis penyematan vektor yang mereka tangani: penyematan <strong>floating-point</strong> (juga dikenal sebagai vektor floating point atau vektor padat), penyematan <strong>biner</strong> (juga dikenal sebagai vektor biner), dan penyematan <strong>jarang</strong> (juga dikenal sebagai vektor jarang).</p>
<div class="filter">
 <a href="#floating">Penyematan titik mengambang</a> <a href="#binary">Penyematan biner</a> <a href="#sparse">Penyematan jarang</a></div>
<div class="filter-floating">
<h3 id="Indexes-for-floating-point-embeddings" class="common-anchor-header">Indeks untuk penyematan titik mengambang</h3><p>Untuk penyematan floating-point 128 dimensi (vektor), penyimpanan yang digunakan adalah 128 * ukuran float = 512 byte. Dan <a href="/docs/id/metric.md">metrik jarak</a> yang digunakan untuk penyematan float-point adalah jarak Euclidean (<code translate="no">L2</code>) dan Inner product (<code translate="no">IP</code>).</p>
<p>Jenis-jenis indeks ini termasuk <code translate="no">FLAT</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_PQ</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code>, dan <code translate="no">SCANN</code> untuk pencarian ANN berbasis CPU.</p>
</div>
<div class="filter-binary">
<h3 id="Indexes-for-binary-embeddings" class="common-anchor-header">Indeks untuk penyematan biner</h3><p>Untuk sematan biner 128 dimensi, penyimpanan yang dibutuhkan adalah 128 / 8 = 16 byte. Dan metrik jarak yang digunakan untuk sematan biner adalah <code translate="no">JACCARD</code> dan <code translate="no">HAMMING</code>.</p>
<p>Jenis indeks ini termasuk <code translate="no">BIN_FLAT</code> dan <code translate="no">BIN_IVF_FLAT</code>.</p>
</div>
<div class="filter-sparse">
<h3 id="Indexes-for-sparse-embeddings" class="common-anchor-header">Indeks untuk penyematan yang jarang</h3><p>Indeks untuk sematan jarang hanya mendukung metrik <code translate="no">IP</code> dan <code translate="no">BM25</code> (untuk pencarian teks lengkap).</p>
<p>Jenis indeks yang didukung untuk sematan jarang: <code translate="no">SPARSE_INVERTED_INDEX</code>.</p>
<div class="alert note">
<p>Mulai Milvus 2.5.4 dan seterusnya, <code translate="no">SPARSE_WAND</code> sudah tidak digunakan lagi. Sebagai gantinya, disarankan untuk menggunakan <code translate="no">&quot;inverted_index_algo&quot;: &quot;DAAT_WAND&quot;</code> untuk kesetaraan sambil mempertahankan kompatibilitas. Untuk informasi lebih lanjut, lihat <a href="/docs/id/sparse_vector.md#Set-index-params-for-vector-field">Vektor</a> Jarang.</p>
</div>
</div>
<div class="filter-floating table-wrapper">
<table id="floating">
<thead>
  <tr>
    <th>Indeks yang didukung</th>
    <th>Klasifikasi</th>
    <th>Skenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>DATAR</td>
    <td>N/A</td>
    <td>
      <ul>
        <li>Dataset yang relatif kecil</li>
        <li>Membutuhkan tingkat penarikan kembali 100%</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_FLAT</td>
    <td>N/A</td>
    <td>
      <ul>
        <li>Kueri berkecepatan tinggi</li>
        <li>Membutuhkan tingkat penarikan setinggi mungkin</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_SQ8</td>
    <td>Indeks berbasis kuantisasi</td>
    <td>
      <ul>
        <li>Kueri berkecepatan sangat tinggi</li>
        <li>Sumber daya memori terbatas</li>
        <li>Menerima kompromi kecil dalam tingkat pemanggilan kembali</li>
      </ul>
    </td>
  </tr>  
  <tr>
    <td>IVF_PQ</td>
    <td>Indeks berbasis kuantisasi</td>
    <td>
      <ul>
        <li>Kueri berkecepatan tinggi</li>
        <li>Sumber daya memori terbatas</li>
        <li>Menerima kompromi kecil dalam tingkat pemanggilan kembali</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW</td>
    <td>Indeks berbasis grafik</td>
    <td>
      <ul>
        <li>Kueri berkecepatan sangat tinggi</li>
        <li>Membutuhkan tingkat pemanggilan setinggi mungkin</li>
        <li>Sumber daya memori yang besar</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW_SQ</td>
    <td>Indeks berbasis kuantisasi</td>
    <td>
      <ul>
        <li>Kueri berkecepatan sangat tinggi</li>
        <li>Sumber daya memori terbatas</li>
        <li>Menerima kompromi kecil dalam tingkat pemanggilan kembali</li>
      </ul>
    </td>
  </tr>
    <tr>
    <td>HNSW_PQ</td>
    <td>Indeks berbasis kuantisasi</td>
    <td>
      <ul>
        <li>Kueri kecepatan sedang</li>
        <li>Sumber daya memori yang sangat terbatas</li>
        <li>Menerima kompromi kecil dalam tingkat pemanggilan kembali</li>
      </ul>
    </td>
  </tr>
    </tr>
    <tr>
    <td>HNSW_PRQ</td>
    <td>Indeks berbasis kuantisasi</td>
    <td>
      <ul>
        <li>Kueri kecepatan sedang</li>
        <li>Sumber daya memori yang sangat terbatas</li>
        <li>Menerima kompromi kecil dalam tingkat pemanggilan kembali</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SCANN</td>
    <td>Indeks berbasis kuantisasi</td>
    <td>
      <ul>
        <li>Kueri berkecepatan sangat tinggi</li>
        <li>Membutuhkan tingkat pemanggilan setinggi mungkin</li>
        <li>Sumber daya memori yang besar</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper">
<table id="binary">
<thead>
  <tr>
    <th>Indeks yang didukung</th>
    <th>Klasifikasi</th>
    <th>Skenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>BIN_FLAT</td>
    <td>Indeks berbasis kuantisasi</td>
    <td><ul>
      <li>Tergantung pada set data yang relatif kecil.</li>
      <li>Membutuhkan akurasi yang sempurna.</li>
      <li>Tidak menggunakan kompresi.</li>
      <li>Menjamin hasil pencarian yang tepat.</li>
    </ul></td>
  </tr>
  <tr>
    <td>BIN_IVF_FLAT</td>
    <td>Indeks berbasis kuantisasi</td>
    <td><ul>
      <li>Kueri berkecepatan tinggi</li>
      <li>Membutuhkan tingkat penarikan setinggi mungkin</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper">
<table id="sparse">
<thead>
  <tr>
    <th>Indeks yang didukung</th>
    <th>Klasifikasi</th>
    <th>Skenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>INDEKS_TERBALIK YANG JARANG</td>
    <td>Indeks terbalik</td>
    <td><ul>
      <li>Tergantung pada set data yang relatif kecil.</li>
      <li>Membutuhkan tingkat penarikan 100%.</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-floating">
<h3 id="FLAT" class="common-anchor-header">FLAT</h3><p>Untuk aplikasi pencarian kemiripan vektor yang membutuhkan akurasi sempurna dan bergantung pada set data yang relatif kecil (skala jutaan), indeks FLAT adalah pilihan yang baik. FLAT tidak memampatkan vektor, dan merupakan satu-satunya indeks yang dapat menjamin hasil pencarian yang tepat. Hasil dari FLAT juga dapat digunakan sebagai titik perbandingan untuk hasil yang dihasilkan oleh indeks lain yang memiliki recall kurang dari 100%.</p>
<p>FLAT akurat karena menggunakan pendekatan yang menyeluruh dalam melakukan pencarian, yang berarti untuk setiap kueri, input target dibandingkan dengan setiap kumpulan vektor dalam kumpulan data. Hal ini membuat FLAT menjadi indeks paling lambat dalam daftar kami, dan tidak cocok untuk melakukan kueri data vektor yang sangat besar. Tidak ada parameter yang diperlukan untuk indeks FLAT di Milvus, dan untuk menggunakannya tidak memerlukan pelatihan data.</p>
<ul>
<li><p>Parameter pencarian</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[Opsional] Metrik jarak yang dipilih.</td><td>Lihat <a href="/docs/id/metric.md">Metrik yang Didukung</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="IVFFLAT" class="common-anchor-header">IVF_FLAT</h3><p>IVF_FLAT membagi data vektor ke dalam unit klaster <code translate="no">nlist</code>, lalu membandingkan jarak antara vektor input target dan pusat setiap klaster. Bergantung pada jumlah klaster yang diatur oleh sistem untuk melakukan kueri (<code translate="no">nprobe</code>), hasil pencarian kemiripan dikembalikan berdasarkan perbandingan antara input target dan vektor dalam klaster yang paling mirip saja - secara drastis mengurangi waktu kueri.</p>
<p>Dengan menyesuaikan <code translate="no">nprobe</code>, keseimbangan ideal antara akurasi dan kecepatan dapat ditemukan untuk skenario tertentu. Hasil dari <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">uji kinerja IVF_FLAT</a> menunjukkan bahwa waktu kueri meningkat tajam seiring dengan bertambahnya jumlah vektor input target (<code translate="no">nq</code>), dan jumlah cluster yang dicari (<code translate="no">nprobe</code>).</p>
<p>IVF_FLAT adalah indeks IVF yang paling dasar, dan data yang disandikan yang disimpan di setiap unit konsisten dengan data aslinya.</p>
<ul>
<li><p>Parameter pembangunan indeks</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Jumlah unit cluster</td><td>[1, 65536]</td><td>128</td></tr>
</tbody>
</table>
</li>
<li><p>Parameter pencarian</p>
<ul>
<li><p>Pencarian umum</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Jumlah unit yang akan ditanyakan</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Pencarian rentang</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Jumlah maksimum bucket yang tidak mengembalikan hasil pencarian.<br/>Ini adalah parameter pencarian rentang dan menghentikan proses pencarian ketika jumlah bucket kosong secara berurutan mencapai nilai yang ditentukan.<br/>Meningkatkan nilai ini dapat meningkatkan tingkat penarikan dengan mengorbankan waktu pencarian yang lebih lama.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFSQ8" class="common-anchor-header">IVF_SQ8</h3><p>IVF_FLAT tidak melakukan kompresi apa pun, sehingga file indeks yang dihasilkannya memiliki ukuran yang kurang lebih sama dengan data vektor mentah yang tidak diindeks. Sebagai contoh, jika set data SIFT 1B asli berukuran 476 GB, file indeks IVF_FLAT akan sedikit lebih kecil (~470 GB). Memuat semua file indeks ke dalam memori akan menghabiskan 470 GB penyimpanan.</p>
<p>Ketika sumber daya memori disk, CPU, atau GPU terbatas, IVF_SQ8 adalah pilihan yang lebih baik daripada IVF_FLAT. Jenis indeks ini dapat mengubah setiap FLOAT (4 byte) menjadi UINT8 (1 byte) dengan melakukan Kuantisasi Skalar (SQ). Hal ini mengurangi konsumsi memori disk, CPU, dan GPU sebesar 70-75%. Untuk kumpulan data SIFT 1B, file indeks IVF_SQ8 hanya membutuhkan penyimpanan 140 GB.</p>
<ul>
<li><p>Parameter pembuatan indeks</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Jumlah unit cluster</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
<li><p>Parameter pencarian</p>
<ul>
<li><p>Pencarian umum</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Jumlah unit yang akan ditanyakan</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Pencarian rentang</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Jumlah maksimum bucket yang tidak mengembalikan hasil pencarian.<br/>Ini adalah parameter pencarian rentang dan menghentikan proses pencarian ketika jumlah bucket kosong secara berurutan mencapai nilai yang ditentukan.<br/>Meningkatkan nilai ini dapat meningkatkan tingkat penarikan dengan mengorbankan waktu pencarian yang lebih lama.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFPQ" class="common-anchor-header">IVF_PQ</h3><p><code translate="no">PQ</code> (Kuantisasi Produk) secara seragam menguraikan ruang vektor dimensi tinggi asli menjadi produk Cartesian dari ruang vektor dimensi rendah <code translate="no">m</code>, dan kemudian mengkuantisasi ruang vektor dimensi rendah yang terurai. Alih-alih menghitung jarak antara vektor target dan pusat semua unit, kuantisasi produk memungkinkan perhitungan jarak antara vektor target dan pusat pengelompokan setiap ruang dimensi rendah dan sangat mengurangi kompleksitas waktu dan kompleksitas ruang algoritma.</p>
<p>IVF_PQ melakukan pengelompokan indeks IVF sebelum mengkuantisasi produk vektor. File indeksnya bahkan lebih kecil daripada IVF_SQ8, tetapi juga menyebabkan hilangnya akurasi selama pencarian vektor.</p>
<div class="alert note">
<p>Parameter pembuatan indeks dan parameter pencarian bervariasi dengan distribusi Milvus. Pilih distribusi Milvus Anda terlebih dahulu.</p>
</div>
<ul>
<li><p>Parameter pembuatan indeks</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Jumlah unit cluster</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">m</code></td><td>Jumlah faktor kuantisasi produk</td><td><code translate="no">dim mod m == 0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Opsional] Jumlah bit tempat penyimpanan setiap vektor dimensi rendah.</td><td>[1, 64] (8 secara default)</td></tr>
</tbody>
</table>
</li>
<li><p>Parameter pencarian</p>
<ul>
<li><p>Pencarian umum</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Jumlah unit yang akan ditanyakan</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Pencarian rentang</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Jumlah maksimum bucket yang tidak mengembalikan hasil pencarian.<br/>Ini adalah parameter pencarian rentang dan menghentikan proses pencarian ketika jumlah bucket kosong secara berurutan mencapai nilai yang ditentukan.<br/>Meningkatkan nilai ini dapat meningkatkan tingkat penarikan dengan mengorbankan waktu pencarian yang lebih lama.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="SCANN" class="common-anchor-header">SCANN</h3><p>ScaNN (Scalable Nearest Neighbors) mirip dengan IVF_PQ dalam hal pengelompokan vektor dan kuantisasi produk. Apa yang membuat mereka berbeda terletak pada detail implementasi kuantisasi produk dan penggunaan SIMD (Single-Instruction/Multi-data) untuk penghitungan yang efisien.</p>
<ul>
<li><p>Parameter pembangunan indeks</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Jumlah unit cluster</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">with_raw_data</code></td><td>Apakah akan menyertakan data mentah dalam indeks</td><td><code translate="no">True</code> atau <code translate="no">False</code>. Nilai default untuk <code translate="no">True</code>.</td></tr>
</tbody>
</table>
  <div class="alert note">
<p>Tidak seperti IVF_PQ, nilai default berlaku untuk <code translate="no">m</code> dan <code translate="no">nbits</code> untuk kinerja yang dioptimalkan.</p>
  </div>
</li>
<li><p>Parameter pencarian</p>
<ul>
<li><p>Pencarian umum</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Jumlah unit yang akan ditanyakan</td><td>[1, nlist]</td><td></td></tr>
<tr><td><code translate="no">reorder_k</code></td><td>Jumlah unit kandidat yang akan ditanyakan</td><td>[<code translate="no">top_k</code>, ∞]</td><td><code translate="no">top_k</code></td></tr>
</tbody>
</table>
</li>
<li><p>Pencarian rentang</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Jumlah maksimum bucket yang tidak mengembalikan hasil pencarian.<br/>Ini adalah parameter pencarian rentang dan menghentikan proses pencarian ketika jumlah bucket kosong secara berurutan mencapai nilai yang ditentukan.<br/>Meningkatkan nilai ini dapat meningkatkan tingkat penarikan dengan mengorbankan waktu pencarian yang lebih lama.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW (Hierarchical Navigable Small World Graph) adalah algoritma pengindeksan berbasis grafik. Algoritma ini membangun struktur navigasi multi-lapisan untuk sebuah gambar menurut aturan tertentu. Dalam struktur ini, lapisan atas lebih jarang dan jarak antar node lebih jauh; lapisan bawah lebih padat dan jarak antar node lebih dekat. Pencarian dimulai dari lapisan paling atas, menemukan node yang paling dekat dengan target di lapisan ini, dan kemudian memasuki lapisan berikutnya untuk memulai pencarian lain. Setelah beberapa kali iterasi, ia dapat dengan cepat mendekati posisi target.</p>
<p>Untuk meningkatkan kinerja, HNSW membatasi tingkat maksimum node pada setiap lapisan grafik ke <code translate="no">M</code>. Selain itu, Anda dapat menggunakan <code translate="no">efConstruction</code> (saat membangun indeks) atau <code translate="no">ef</code> (saat mencari target) untuk menentukan rentang pencarian.</p>
<ul>
<li><p>Parameter pembangunan indeks</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M mendefinisikan jumlah maksimum koneksi keluar dalam grafik. M yang lebih tinggi akan menghasilkan akurasi/waktu_jalan yang lebih tinggi pada ef/efKonstruksi yang tetap.</td><td>[2, 2048]</td><td>Tidak ada</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction mengontrol kecepatan pencarian indeks/pertukaran kecepatan pembangunan. Meningkatkan parameter efConstruction dapat meningkatkan kualitas indeks, tetapi juga cenderung memperpanjang waktu pengindeksan.</td><td>[1, int_max]</td><td>Tidak ada</td></tr>
</tbody>
</table>
</li>
<li><p>Parameter pencarian</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parameter yang mengendalikan pertukaran waktu kueri/akurasi. <code translate="no">ef</code> yang lebih tinggi akan menghasilkan pencarian yang lebih akurat namun lebih lambat.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Tidak ada</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWSQ" class="common-anchor-header">HNSW_SQ</h3><p>Kuantisasi Skalar (SQ) adalah teknik yang digunakan untuk mendiskritkan data floating-point menjadi sekumpulan nilai yang terbatas berdasarkan besarnya. Sebagai contoh, <strong>SQ6</strong> merepresentasikan kuantisasi ke dalam (2^6 = 64) nilai diskrit, di mana setiap angka floating-point dikodekan menggunakan 6 bit. Demikian pula, <strong>SQ8</strong> mengkuantisasi data menjadi (2^8 = 256) nilai diskrit, dengan setiap angka floating-point diwakili oleh 8 bit. Kuantisasi ini mengurangi jejak memori sekaligus mempertahankan struktur data yang penting untuk pemrosesan yang efisien.</p>
<p>Dikombinasikan dengan SQ, HNSW_SQ menawarkan pertukaran yang dapat dikontrol antara ukuran indeks dan akurasi, sambil mempertahankan kinerja query-per-detik (QPS) yang tinggi. Dibandingkan dengan HNSW standar, ini menghasilkan peningkatan yang tidak terlalu besar dalam waktu pembangunan indeks.</p>
<ul>
<li><p>Parameter pembangunan indeks</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M mendefinisikan jumlah maksimum koneksi keluar dalam grafik. M yang lebih tinggi akan menghasilkan akurasi/waktu_jalan yang lebih tinggi pada ef/efKonstruksi yang tetap.</td><td>[2, 2048]</td><td>Tidak ada</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction mengontrol kecepatan pencarian indeks/pertukaran kecepatan pembangunan. Meningkatkan parameter efConstruction dapat meningkatkan kualitas indeks, tetapi juga cenderung memperpanjang waktu pengindeksan.</td><td>[1, int_max]</td><td>Tidak ada</td></tr>
<tr><td><code translate="no">sq_type</code></td><td>Jenis kuantizer skalar.</td><td><code translate="no">SQ6</code>,<code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code></td><td><code translate="no">SQ8</code></td></tr>
<tr><td><code translate="no">refine</code></td><td>Apakah data yang disempurnakan dicadangkan selama pembangunan indeks.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>Tipe data dari indeks yang disempurnakan.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>Tidak ada</td></tr>
</tbody>
</table>
</li>
<li><p>Parameter pencarian</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parameter yang mengendalikan pertukaran waktu kueri/akurasi. <code translate="no">ef</code> yang lebih tinggi akan menghasilkan pencarian yang lebih akurat namun lebih lambat.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Tidak ada</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>Faktor pembesaran dari refine dibandingkan dengan <em>k</em>.</td><td>[1, <em>float_max</em>] (1, <em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPQ" class="common-anchor-header">HNSW_PQ</h3><p>Ide dasar dari PQ adalah untuk membagi vektor menjadi sub-vektor <code translate="no">m</code>, yang masing-masing akan menemukan <em>2^{nbits}</em> centroid berdasarkan kmeans, dan setiap sub-vektor akan memilih centroid terdekat sebagai perkiraan sub-vektor. Kemudian kita mencatat semua centroid, sehingga setiap subvektor dapat dikodekan sebagai <code translate="no">nbits</code>, dan vektor mengambang dengan panjang <code translate="no">dim</code> dapat dikodekan sebagai <em>m ⋅ n bit</em>.</p>
<p>Dikombinasikan dengan PQ, HNSW_PQ menawarkan pertukaran yang dapat dikontrol antara ukuran indeks dan akurasi, tetapi memiliki nilai QPS yang lebih rendah dan tingkat penarikan yang lebih tinggi daripada HNSW_SQ untuk tingkat kompresi yang sama. Dibandingkan dengan HNSW_SQ, dibutuhkan waktu lebih lama untuk membangun indeks.</p>
<ul>
<li><p>Parameter pembangunan indeks</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M mendefinisikan jumlah maksimum koneksi keluar dalam grafik. M yang lebih tinggi akan menghasilkan akurasi/waktu_jalan yang lebih tinggi pada ef/efKonstruksi yang tetap.</td><td>[2, 2048]</td><td>Tidak ada</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction mengontrol kecepatan pencarian indeks/pertukaran kecepatan pembangunan. Meningkatkan parameter efConstruction dapat meningkatkan kualitas indeks, tetapi juga cenderung memperpanjang waktu pengindeksan.</td><td>[1, int_max]</td><td>Tidak ada</td></tr>
<tr><td><code translate="no">m</code></td><td>Jumlah kelompok sub-vektor untuk membagi vektor.</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>Jumlah bit yang dikuantisasi ke dalam setiap kelompok sub-vektor.</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">refine</code></td><td>Apakah data yang disempurnakan dicadangkan selama pembangunan indeks.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>Tipe data dari indeks penghalusan.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>Tidak ada</td></tr>
</tbody>
</table>
</li>
<li><p>Parameter pencarian</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parameter yang mengendalikan pertukaran waktu kueri/akurasi. <code translate="no">ef</code> yang lebih tinggi akan menghasilkan pencarian yang lebih akurat namun lebih lambat.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Tidak ada</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>Faktor pembesaran dari refine dibandingkan dengan <em>k</em>.</td><td>[1, <em>float_max</em>] (1, <em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ</h3><p>PRQ mirip dengan PQ, dan juga membagi vektor ke dalam kelompok-kelompok <code translate="no">m</code>. Setiap sub-vektor akan dikodekan sebagai <code translate="no">nbits</code>. Setelah menyelesaikan kuantisasi pq, ia akan menghitung sisa antara vektor dan vektor terkuantisasi pq, dan menerapkan kuantisasi pq ke vektor sisa. Sebanyak <code translate="no">nrq</code> kuantisasi pq lengkap akan dilakukan, sehingga vektor mengambang dengan panjang <code translate="no">dim</code> akan dikodekan sebagai <em>m ⋅ nbit ⋅ nrq</em> bit.</p>
<p>Dikombinasikan dengan Product Residual Quantizer (PRQ), HNSW_PRQ menawarkan pertukaran yang dapat dikontrol lebih tinggi antara ukuran indeks dan akurasi. Memiliki nilai QPS yang hampir setara dan tingkat recall yang lebih tinggi daripada HNSW_PQ untuk tingkat kompresi yang sama. Dibandingkan dengan HNSW_PQ, waktu untuk membangun indeks dapat meningkat beberapa kali lipat.</p>
<ul>
<li><p>Parameter pembangunan indeks</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M mendefinisikan jumlah maksimum koneksi keluar dalam grafik. M yang lebih tinggi akan menghasilkan akurasi/waktu_jalan yang lebih tinggi pada ef/efKonstruksi yang tetap.</td><td>[2, 2048]</td><td>Tidak ada</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction mengontrol kecepatan pencarian indeks/pertukaran kecepatan pembangunan. Meningkatkan parameter efConstruction dapat meningkatkan kualitas indeks, tetapi juga cenderung memperpanjang waktu pengindeksan.</td><td>[1, int_max]</td><td>Tidak ada</td></tr>
<tr><td><code translate="no">m</code></td><td>Jumlah kelompok sub-vektor untuk membagi vektor.</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>Jumlah bit yang dikuantisasi ke dalam setiap kelompok sub-vektor.</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">nrq</code></td><td>Jumlah subkuantisasi sisa.</td><td>[1, 16]</td><td>2</td></tr>
<tr><td><code translate="no">refine</code></td><td>Apakah data yang disempurnakan dicadangkan selama pembangunan indeks.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>Tipe data dari indeks penghalusan.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>Tidak ada</td></tr>
</tbody>
</table>
</li>
<li><p>Parameter pencarian</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parameter yang mengendalikan pertukaran waktu kueri/akurasi. <code translate="no">ef</code> yang lebih tinggi akan menghasilkan pencarian yang lebih akurat namun lebih lambat.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Tidak ada</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>Faktor pembesaran dari refine dibandingkan dengan <em>k</em>.</td><td>[1, <em>float_max</em>] (1, <em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<div class="filter-binary">
<h3 id="BINFLAT" class="common-anchor-header">BIN_FLAT</h3><p>Indeks ini persis sama dengan FLAT kecuali bahwa ini hanya dapat digunakan untuk penyematan biner.</p>
<p>Untuk aplikasi pencarian kemiripan vektor yang membutuhkan akurasi sempurna dan bergantung pada dataset yang relatif kecil (skala jutaan), indeks BIN_FLAT adalah pilihan yang baik. BIN_FLAT tidak memampatkan vektor, dan merupakan satu-satunya indeks yang dapat menjamin hasil pencarian yang tepat. Hasil dari BIN_FLAT juga dapat digunakan sebagai titik perbandingan untuk hasil yang dihasilkan oleh indeks lain yang memiliki recall kurang dari 100%.</p>
<p>BIN_FLAT akurat karena menggunakan pendekatan menyeluruh untuk pencarian, yang berarti untuk setiap kueri, input target dibandingkan dengan vektor dalam kumpulan data. Hal ini membuat BIN_FLAT menjadi indeks paling lambat dalam daftar kami, dan tidak cocok untuk kueri data vektor yang sangat besar. Tidak ada parameter untuk indeks BIN_FLAT di Milvus, dan menggunakannya tidak memerlukan pelatihan data atau penyimpanan tambahan.</p>
<ul>
<li><p>Parameter pencarian</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[Opsional] Metrik jarak yang dipilih.</td><td>Lihat <a href="/docs/id/metric.md">Metrik yang Didukung</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="BINIVFFLAT" class="common-anchor-header">BIN_IVF_FLAT</h3><p>Indeks ini persis sama dengan IVF_FLAT kecuali bahwa indeks ini hanya dapat digunakan untuk penyematan biner.</p>
<p>BIN_IVF_FLAT membagi data vektor ke dalam unit klaster <code translate="no">nlist</code>, lalu membandingkan jarak antara vektor input target dan pusat setiap klaster. Bergantung pada jumlah klaster yang diatur oleh sistem untuk melakukan kueri (<code translate="no">nprobe</code>), hasil pencarian kemiripan dikembalikan berdasarkan perbandingan antara input target dan vektor dalam klaster yang paling mirip saja - secara drastis mengurangi waktu kueri.</p>
<p>Dengan menyesuaikan <code translate="no">nprobe</code>, keseimbangan ideal antara akurasi dan kecepatan dapat ditemukan untuk skenario tertentu. Waktu kueri meningkat tajam seiring dengan meningkatnya jumlah vektor input target (<code translate="no">nq</code>), dan jumlah cluster yang dicari (<code translate="no">nprobe</code>).</p>
<p>BIN_IVF_FLAT adalah indeks BIN_IVF yang paling dasar, dan data yang disandikan yang disimpan di setiap unit konsisten dengan data aslinya.</p>
<ul>
<li><p>Parameter pembuatan indeks</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Jumlah unit cluster</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
<li><p>Parameter pencarian</p>
<ul>
<li><p>Pencarian umum</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Jumlah unit yang akan ditanyakan</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Pencarian rentang</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Jumlah maksimum bucket yang tidak mengembalikan hasil pencarian.<br/>Ini adalah parameter pencarian rentang dan menghentikan proses pencarian ketika jumlah bucket kosong secara berurutan mencapai nilai yang ditentukan.<br/>Meningkatkan nilai ini dapat meningkatkan tingkat penarikan dengan mengorbankan waktu pencarian yang lebih lama.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
</div>
<div class="filter-sparse">
<h3 id="SPARSEINVERTEDINDEX" class="common-anchor-header">SPARSE_INVERTED_INDEX</h3><p>Setiap dimensi menyimpan daftar vektor yang memiliki nilai bukan nol pada dimensi tersebut. Selama pencarian, Milvus melakukan iterasi melalui setiap dimensi vektor kueri dan menghitung nilai untuk vektor yang memiliki nilai bukan nol pada dimensi tersebut.</p>
<ul>
<li><p>Parameter pembuatan indeks</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">inverted_index_algo</code></td><td>Algoritme yang digunakan untuk membangun dan menanyakan indeks. Untuk detailnya, lihat <a href="/docs/id/sparse_vector.md#Set-index-params-for-vector-field">Vektor Jarang</a>.</td><td><code translate="no">DAAT_MAXSCORE</code> (default), <code translate="no">DAAT_WAND</code>, <code translate="no">TAAT_NAIVE</code></td></tr>
</tbody>
</table>
  <div class="alert note">
<p>Parameter <code translate="no">drop_ratio_build</code> sudah tidak digunakan lagi sejak Milvus v2.5.4, yang masih dapat diterima selama pembuatan indeks, tetapi tidak lagi berpengaruh pada indeks.</p>
  </div>
</li>
<li><p>Parameter pencarian</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Range</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_search</code></td><td>Proporsi nilai vektor kecil yang dikecualikan selama proses pencarian. Opsi ini memungkinkan penyempurnaan proses pencarian dengan menentukan rasio nilai terkecil dalam vektor kueri yang akan diabaikan. Opsi ini membantu menyeimbangkan ketepatan dan kinerja pencarian. Semakin kecil nilai yang ditetapkan untuk <code translate="no">drop_ratio_search</code>, semakin sedikit nilai kecil ini berkontribusi pada skor akhir. Dengan mengabaikan beberapa nilai kecil, kinerja pencarian dapat ditingkatkan dengan dampak minimal pada akurasi.</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">Apa perbedaan antara indeks FLAT dan indeks IVF_FLAT?</font></summary></p>
<p>Indeks IVF_FLAT membagi ruang vektor menjadi klaster <code translate="no">nlist</code>. Jika Anda mempertahankan nilai default <code translate="no">nlist</code> sebagai 16384, Milvus membandingkan jarak antara vektor target dan pusat dari semua 16384 klaster untuk mendapatkan <code translate="no">nprobe</code> klaster terdekat. Kemudian Milvus membandingkan jarak antara vektor target dan vektor dalam cluster yang dipilih untuk mendapatkan vektor terdekat. Tidak seperti IVF_FLAT, FLAT secara langsung membandingkan jarak antara vektor target dan setiap vektor.</p>
<p>
Oleh karena itu, ketika jumlah total vektor kurang lebih sama dengan <code translate="no">nlist</code>, IVF_FLAT dan FLAT memiliki sedikit perbedaan dalam hal perhitungan yang diperlukan dan kinerja pencarian. Tetapi ketika jumlah vektor bertambah menjadi dua kali, tiga kali, atau n kali dari <code translate="no">nlist</code>, indeks IVF_FLAT mulai menunjukkan keuntungan yang semakin besar.</p>
<p>
Lihat <a href="https://medium.com/unstructured-data-service/how-to-choose-an-index-in-milvus-4f3d15259212">Cara Memilih Indeks di Milvus</a> untuk informasi lebih lanjut.</p>
</details>
<h2 id="Whats-next" class="common-anchor-header">Apa selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Pelajari lebih lanjut tentang <a href="/docs/id/metric.md">Metrik Kemiripan</a> yang didukung di Milvus.</li>
</ul>
