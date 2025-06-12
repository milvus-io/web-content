---
id: disk_index.md
related_key: disk_index
summary: >-
  Mekanisme indeks disk di Milvus untuk pencarian vektor yang dioptimalkan untuk
  disk.
title: Indeks di dalam disk
---
<h1 id="On-disk-Index" class="common-anchor-header">Indeks di dalam disk<button data-href="#On-disk-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Artikel ini memperkenalkan DiskANN, sebuah algoritme pengindeksan dalam disk untuk pencarian vektor yang dioptimalkan untuk disk. Berdasarkan grafik Vamana, DiskANN mendukung pencarian vektor dalam disk yang efisien dalam kumpulan data yang besar.</p>
<p>Untuk meningkatkan kinerja kueri, Anda dapat <a href="/docs/id/index-vector-fields.md">menentukan jenis indeks</a> untuk setiap bidang vektor.</p>
<div class="alert note"> 
Saat ini, bidang vektor hanya mendukung satu jenis indeks. Milvus secara otomatis menghapus indeks lama saat mengganti jenis indeks.</div>
<h2 id="Prerequisites" class="common-anchor-header">Prasyarat<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menggunakan DiskANN di Milvus, perhatikan bahwa</p>
<ul>
<li>Instance Milvus berjalan pada Ubuntu 18.04.6 atau rilis yang lebih baru.</li>
<li>Jalur data Milvus harus dipasang ke SSD NVMe untuk performa penuh:<ul>
<li>Untuk instans Milvus Standalone, jalur data harus berada di <strong>/var/lib/milvus/data</strong> di dalam kontainer tempat instans berjalan.</li>
<li>Untuk instans Milvus Cluster, jalur data harus <strong>/var/lib/milvus/data</strong> di wadah tempat QueryNodes dan IndexNodes berjalan.</li>
</ul></li>
</ul>
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
    </button></h2><p>Untuk menggunakan DiskANN, pastikan Anda</p>
<ul>
<li>Gunakan hanya vektor float dengan setidaknya 1 dimensi dalam data Anda.</li>
<li>Gunakan hanya Euclidean Distance (L2), Inner Product (IP), atau COSINE untuk mengukur jarak antar vektor.</li>
</ul>
<h2 id="Index-and-search-settings" class="common-anchor-header">Pengaturan indeks dan pencarian<button data-href="#Index-and-search-settings" class="anchor-icon" translate="no">
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
<li><p>Parameter pembuatan indeks</p>
<p>Saat membuat indeks DiskANN, gunakan <code translate="no">DISKANN</code> sebagai jenis indeks. Tidak ada parameter indeks yang diperlukan.</p></li>
<li><p>Parameter pencarian</p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_list</code></td><td>Ukuran daftar kandidat, ukuran yang lebih besar menawarkan tingkat penarikan yang lebih tinggi dengan kinerja yang menurun.</td><td>[topk, int32_max]</td><td>16</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="DiskANN-related-Milvus-configurations" class="common-anchor-header">Konfigurasi Milvus yang terkait dengan DiskANN<button data-href="#DiskANN-related-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>DiskANN dapat disetel. Anda dapat memodifikasi parameter terkait DiskANN di <code translate="no">${MILVUS_ROOT_PATH}/configs/milvus.yaml</code> untuk meningkatkan kinerjanya.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-string">...</span>
<span class="hljs-attr">DiskIndex:</span>
  <span class="hljs-attr">MaxDegree:</span> <span class="hljs-number">56</span>
  <span class="hljs-attr">SearchListSize:</span> <span class="hljs-number">100</span>
  <span class="hljs-attr">PQCodeBugetGBRatio:</span> <span class="hljs-number">0.125</span>
  <span class="hljs-attr">SearchCacheBudgetGBRatio:</span> <span class="hljs-number">0.125</span>
  <span class="hljs-attr">BeamWidthRatio:</span> <span class="hljs-number">4.0</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th><th>Rentang Nilai</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MaxDegree</code></td><td>Derajat maksimum grafik Vamana. <br/> Nilai yang lebih besar menawarkan tingkat penarikan yang lebih tinggi tetapi meningkatkan ukuran dan waktu untuk membangun indeks.</td><td>[1, 512]</td><td>56</td></tr>
<tr><td><code translate="no">SearchListSize</code></td><td>Ukuran daftar kandidat. <br/> Nilai yang lebih besar meningkatkan waktu yang dihabiskan untuk membangun indeks tetapi menawarkan tingkat penarikan yang lebih tinggi. <br/> Tetapkan ke nilai yang lebih kecil dari <code translate="no">MaxDegree</code> kecuali jika Anda perlu mengurangi waktu pembuatan indeks.</td><td>[1, int32_max]</td><td>100</td></tr>
<tr><td><code translate="no">PQCodeBugetGBRatio</code></td><td>Batas ukuran pada kode PQ. <br/> Nilai yang lebih besar menawarkan tingkat pemanggilan yang lebih tinggi tetapi meningkatkan penggunaan memori.</td><td>(0.0, 0.25]</td><td>0.125</td></tr>
<tr><td><code translate="no">SearchCacheBudgetGBRatio</code></td><td>Rasio nomor simpul yang di-cache terhadap data mentah. <br/> Nilai yang lebih besar meningkatkan kinerja pembuatan indeks dengan peningkatan penggunaan memori.</td><td>[0.0, 0.3)</td><td>0.10</td></tr>
<tr><td><code translate="no">BeamWidthRatio</code></td><td>Rasio antara jumlah maksimum permintaan IO per iterasi pencarian dan nomor CPU.</td><td>[1, max(128 / nomor CPU, 16)]</td><td>4.0</td></tr>
</tbody>
</table>
<h2 id="Troubleshooting" class="common-anchor-header">Pemecahan masalah<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
<li><p>Bagaimana cara mengatasi kesalahan <code translate="no">io_setup() failed; returned -11, errno=11:Resource temporarily unavailable</code>?</p>
<p>Kernel Linux menyediakan fitur Asynchronous non-blocking I/O (AIO) yang memungkinkan sebuah proses memulai beberapa operasi I/O secara bersamaan tanpa harus menunggu sampai operasi tersebut selesai. Hal ini membantu meningkatkan kinerja untuk aplikasi yang dapat tumpang tindih antara pemrosesan dan I/O.</p>
<p>Performa dapat disetel menggunakan file virtual <code translate="no">/proc/sys/fs/aio-max-nr</code> dalam sistem file proc. Parameter <code translate="no">aio-max-nr</code> menentukan jumlah maksimum permintaan bersamaan yang diijinkan.</p>
<p><code translate="no">aio-max-nr</code> defaultnya adalah <code translate="no">65535</code>, Anda dapat mengaturnya ke <code translate="no">10485760</code>.</p></li>
</ul>
