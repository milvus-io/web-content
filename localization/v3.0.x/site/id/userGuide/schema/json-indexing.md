---
id: json-indexing.md
title: Pengindeksan JSON
summary: >-
  Kolom JSON menawarkan cara yang fleksibel untuk menyimpan metadata terstruktur
  di Milvus. Tanpa pengindeksan, kueri pada kolom JSON memerlukan pemindaian
  seluruh koleksi, yang akan menjadi lambat seiring bertambahnya ukuran dataset
  Anda. Pengindeksan JSON membuat indeks pada jalur-jalur tertentu di dalam data
  JSON Anda sehingga kueri kesamaan, rentang, dan kueri penyaringan lainnya pada
  jalur-jalur tersebut dapat dijalankan dengan cepat.
---
<h1 id="JSON-Indexing" class="common-anchor-header">Pengindeksan JSON<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>Kolom JSON menyediakan cara yang fleksibel untuk menyimpan metadata terstruktur di Milvus. Tanpa pengindeksan, kueri pada kolom JSON memerlukan pemindaian seluruh koleksi, yang akan menjadi lambat seiring bertambahnya ukuran dataset Anda. Pengindeksan JSON membuat indeks pada jalur tertentu di dalam data JSON Anda sehingga kueri kesamaan, rentang, dan kueri filter lainnya pada jalur tersebut dapat dijalankan dengan cepat.</p>
<p>Pengindeksan JSON sangat ideal untuk:</p>
<ul>
<li><p>Skema terstruktur dengan kunci yang konsisten dan diketahui</p></li>
<li><p>Kueri kesamaan (equality), kueri rentang ( <code translate="no">IN</code>), kueri rentang (range), dan kueri pencocokan teks (text-match) pada jalur JSON tertentu</p></li>
<li><p>Skenario di mana Anda memerlukan kontrol yang tepat atas kunci mana yang diindeks</p></li>
</ul>
<p>Untuk dokumen JSON yang kompleks dengan pola kueri yang beragam, pertimbangkan <a href="/docs/id/json-shredding.md">JSON Shredding</a> sebagai alternatif.</p>
<h2 id="Index-type-overview" class="common-anchor-header">Ikhtisar jenis indeks<button data-href="#Index-type-overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menawarkan empat jenis indeks untuk jalur JSON. Masing-masing cocok untuk pola kueri yang berbeda.</p>
<p>Sebelum memilih jenis indeks, tentukan <strong>jenis cast</strong> untuk jalur JSON tersebut. Jenis cast menentukan bagaimana Milvus menafsirkan nilai pada jalur tersebut dan jenis indeks mana saja yang tersedia.</p>
<h3 id="Understand-cast-types" class="common-anchor-header">Memahami tipe cast<button data-href="#Understand-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">json_cast_type</code> adalah tipe data yang digunakan untuk menafsirkan dan mengindeks nilai di <code translate="no">json_path</code>. Hal ini berbeda dari tipe skema bidang: bidang tersebut tetap merupakan bidang <code translate="no">JSON</code>, tetapi setiap jalur yang diindeks diperlakukan sebagai tipe skalar, array, atau objek JSON tertentu.</p>
<p>Pilih tipe konversi yang sesuai dengan nilai yang disimpan di jalur tersebut. Untuk memeriksa apakah suatu tipe konversi kompatibel dengan tipe indeks tertentu, lihat <a href="/docs/id/json-indexing.md#compatibility-reference">Referensi Kompatibilitas</a>.</p>
<table>
<thead>
<tr><th>Tipe konversi</th><th>Gunakan jika nilai jalur adalah…</th><th>Contoh nilai</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Nilai Boolean</td><td><code translate="no">true</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>Nilai numerik</td><td><code translate="no">99.99</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Nilai string</td><td><code translate="no">&quot;electronics&quot;</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>Sebuah array nilai Boolean</td><td><code translate="no">[true, false]</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>Sebuah array nilai numerik</td><td><code translate="no">[1.2, 3.14]</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>Sebuah array nilai string</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td>Objek JSON utuh atau sub-objek. Pengindeksan objek JSON utuh sudah tidak didukung lagi mulai dari Milvus 3.0.0.</td><td><code translate="no">{&quot;supplier&quot;: {&quot;country&quot;: &quot;USA&quot;}}</code></td></tr>
</tbody>
</table>
<p>Jika nilai pada jalur yang sama memiliki tipe yang tidak konsisten, hanya nilai yang sesuai dengan tipe konversi yang diindeks. Misalnya, jika <code translate="no">metadata[&quot;price&quot;]</code> berisi <code translate="no">99.99</code> dan <code translate="no">&quot;99.99&quot;</code>, indeks dengan tipe konversi <code translate="no">DOUBLE</code> akan menyertakan nilai numerik dan mengabaikan nilai string. Untuk mengonversi nilai string selama pengindeksan, gunakan <code translate="no">json_cast_function</code>; lihat <a href="/docs/id/json-indexing.md#example-5-convert-data-type-at-index-time">Contoh 5: Mengonversi tipe data saat pengindeksan</a>.</p>
<h3 id="Choose-an-index-type" class="common-anchor-header">Pilih jenis indeks<button data-href="#Choose-an-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Setelah Anda memilih tipe konversi, pilih tipe indeks sesuai dengan pola kueri Anda.</p>
<table>
<thead>
<tr><th>Pola kueri</th><th>Jenis indeks yang direkomendasikan</th><th>Persyaratan tipe konversi</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td>Filter kesamaan dan rentang campuran pada nilai skalar</td><td><code translate="no">AUTOINDEX</code></td><td>Gunakan <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, atau <code translate="no">VARCHAR</code>.</td><td>Biarkan Milvus memilih tata letak indeks internal berdasarkan kardinalitas nilai.</td></tr>
<tr><td>Filter pada nilai di dalam array JSON</td><td><code translate="no">INVERTED</code></td><td>Gunakan <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code>, atau <code translate="no">ARRAY_VARCHAR</code>.</td><td>Diperlukan untuk semua tipe konversi array.</td></tr>
<tr><td>Pengindeksan objek keseluruhan atau sub-objek (tidak disarankan lagi)</td><td><code translate="no">INVERTED</code> atau <code translate="no">AUTOINDEX</code> (hanya untuk kompatibilitas)</td><td>Gunakan <code translate="no">JSON</code>.</td><td>Didukung demi kompatibilitas. Untuk beban kerja baru, buat indeks khusus jalur atau pertimbangkan <a href="/docs/id/json-shredding.md">JSON Shredding</a>.</td></tr>
<tr><td>Filter rentang pada angka atau string yang dapat diurutkan</td><td><code translate="no">STL_SORT</code> atau <code translate="no">AUTOINDEX</code></td><td>Gunakan <code translate="no">DOUBLE</code> atau <code translate="no">VARCHAR</code>.</td><td>Gunakan <code translate="no">STL_SORT</code> untuk memaksa tata letak yang diurutkan; gunakan <code translate="no">AUTOINDEX</code> jika Anda menginginkan pemilihan otomatis.</td></tr>
<tr><td>Filter kesetaraan atau filter " <code translate="no">IN</code> " pada nilai dengan kardinalitas rendah</td><td><code translate="no">BITMAP</code> atau <code translate="no">AUTOINDEX</code></td><td>Gunakan <code translate="no">BOOL</code> atau <code translate="no">VARCHAR</code>.</td><td>Gunakan ` <code translate="no">BITMAP</code> ` untuk memaksa tata letak bitmap. Untuk nilai numerik, gunakan ` <code translate="no">AUTOINDEX</code> ` atau ` <code translate="no">STL_SORT</code>`.</td></tr>
</tbody>
</table>
<p>Jika ragu, mulailah dengan <code translate="no">AUTOINDEX</code> untuk jalur skalar. Gunakan <code translate="no">INVERTED</code> secara eksplisit untuk tipe pengonversian array dan kueri pencocokan teks. Pengindeksan JSON seluruh objek dengan <code translate="no">INVERTED</code> atau <code translate="no">AUTOINDEX</code> tetap didukung, tetapi sudah tidak direkomendasikan mulai Milvus 3.0.0.</p>
<h3 id="AUTOINDEX" class="common-anchor-header">AUTOINDEX<button data-href="#AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">AUTOINDEX</code> bergantung pada ` <code translate="no">json_cast_type</code> ` yang Anda tentukan. Di Milvus 3.0, ` <code translate="no">AUTOINDEX</code> ` tidak lagi selalu diterjemahkan menjadi ` <code translate="no">INVERTED</code> ` untuk indeks jalur JSON.</p>
<table>
<thead>
<tr><th>Tipe konversi</th><th><code translate="no">AUTOINDEX</code> perilaku</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>Memilih antara <code translate="no">BITMAP</code> dan <code translate="no">STL_SORT</code> berdasarkan kardinalitas nilai.</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code>, <code translate="no">ARRAY_VARCHAR</code></td><td>Tidak didukung. Gunakan ` <code translate="no">INVERTED</code> ` secara eksplisit sebagai tipe indeks.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Menggunakan ` <code translate="no">INVERTED</code> ` untuk pengindeksan objek utuh atau sub-objek. Mode ini sudah tidak direkomendasikan mulai dari Milvus 3.0.0.</td></tr>
</tbody>
</table>
<p>Untuk tipe konversi skalar (<code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, dan <code translate="no">VARCHAR</code>), <code translate="no">AUTOINDEX</code> adalah titik awal yang direkomendasikan saat Anda ingin Milvus memilih tata letak indeks internal. Selama pembuatan indeks, Milvus mengukur <strong>kardinalitas</strong> nilai-nilai di jalur JSON tersebut. Kardinalitas berarti jumlah nilai unik di jalur tersebut.</p>
<p>Berdasarkan kardinalitas, Milvus memilih salah satu dari dua tata letak internal:</p>
<ul>
<li><p><strong>Kardinalitas rendah</strong>: Nilai sering berulang, seperti <code translate="no">metadata[&quot;in_stock&quot;]</code> dengan <code translate="no">true</code> dan <code translate="no">false</code>, atau <code translate="no">metadata[&quot;status&quot;]</code> dengan sekumpulan kecil string status. Milvus membangun indeks <code translate="no">BITMAP</code> secara internal untuk penyaringan kesetaraan (equality) dan penyaringan berdasarkan nilai ( <code translate="no">IN</code> ) yang cepat.</p></li>
<li><p><strong>Kardinalitas tinggi</strong>: Sebagian besar nilai bersifat unik, seperti <code translate="no">metadata[&quot;price&quot;]</code>, <code translate="no">metadata[&quot;created_at&quot;]</code>, atau <code translate="no">metadata[&quot;product_id&quot;]</code>. Milvus membangun indeks <code translate="no">STL_SORT</code> secara internal untuk filter rentang yang cepat seperti <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, dan <code translate="no">&lt;=</code>.</p></li>
</ul>
<p>Ambang batas default <code translate="no">BITMAP</code>-vs-<code translate="no">STL_SORT</code> adalah <strong>100 nilai unik</strong>. Anda dapat menyesuaikan ambang batas ini dengan <code translate="no">bitmap_cardinality_limit</code>; lihat <a href="/docs/id/json-indexing.md#how-do-i-tune-autoindexs-bitmap-vs-stl-sort-threshold">Bagaimana cara menyesuaikan ambang batas BITMAP-vs-STL_SORT pada AUTOINDEX?</a>.</p>
<div class="alert note">
<p><strong>Perubahan perilaku di Milvus 3.0</strong>. Pada versi sebelumnya, <code translate="no">AUTOINDEX</code> pada jalur JSON selalu membuat indeks <code translate="no">INVERTED</code>. Mulai Milvus 3.0, <code translate="no">AUTOINDEX</code> memilih antara <code translate="no">BITMAP</code> dan <code translate="no">STL_SORT</code> untuk tipe konversi skalar. Untuk <code translate="no">JSON</code>, <code translate="no">AUTOINDEX</code> masih menggunakan <code translate="no">INVERTED</code>, meskipun pengindeksan JSON seluruh objek sudah tidak direkomendasikan. Untuk tipe konversi array dan kueri pencocokan teks, tentukan <code translate="no">INVERTED</code> secara eksplisit.</p>
</div>
<h3 id="INVERTED" class="common-anchor-header">INVERTED<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">INVERTED</code> adalah pilihan yang paling tepat saat Anda memerlukan kueri pencocokan teks atau pengindeksan array. Opsi ini juga tetap tersedia untuk pengindeksan JSON seluruh objek yang sudah tidak direkomendasikan.</p>
<p>Tentukan <code translate="no">INVERTED</code> secara eksplisit jika:</p>
<ul>
<li><p>Anda perlu mengindeks nilai di dalam array JSON.</p></li>
<li><p>Anda mempertahankan indeks yang sudah ada pada seluruh objek JSON atau sub-objek dan ingin membuat perilaku ` <code translate="no">INVERTED</code> ` menjadi eksplisit.</p></li>
<li><p>Anda menginginkan satu jenis indeks yang menangani kueri kesetaraan, pencocokan teks ( <code translate="no">IN</code>), rentang, dan kueri array. Dukungan untuk objek JSON secara keseluruhan tetap tersedia demi kompatibilitas, dengan konsekuensi ukuran indeks yang lebih besar.</p></li>
</ul>
<p>Untuk indeks yang sudah ada pada seluruh objek JSON (<code translate="no">json_cast_type=&quot;JSON&quot;</code>), Anda dapat terus menggunakan <code translate="no">INVERTED</code> atau <code translate="no">AUTOINDEX</code>. <code translate="no">AUTOINDEX</code> menggunakan <code translate="no">INVERTED</code> untuk tipe konversi ini. Pengindeksan JSON seluruh objek tidak lagi direkomendasikan untuk beban kerja baru.</p>
<p>Untuk detailnya, lihat <a href="/docs/id/inverted.md">INVERTED</a>.</p>
<h3 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">STL_SORT</code> menyimpan nilai dari jalur JSON dalam urutan yang diurutkan. Ini dioptimalkan untuk filter rentang pada nilai numerik atau nilai string yang dapat diurutkan.</p>
<p><code translate="no">STL_SORT</code> hanya mendukung tipe konversi <code translate="no">DOUBLE</code> dan <code translate="no">VARCHAR</code>. Gunakan ini ketika:</p>
<ul>
<li><p>Filter Anda membandingkan nilai dengan <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, atau <code translate="no">&lt;=</code>.</p></li>
<li><p>Nilai-nilai yang diindeks memiliki kardinalitas tinggi, seperti harga, cap waktu, ID, atau kode yang dapat diurutkan.</p></li>
<li><p>Anda ingin memaksa tata letak yang diurutkan alih-alih membiarkan <code translate="no">AUTOINDEX</code> memilihnya.</p></li>
</ul>
<p><code translate="no">STL_SORT</code> tidak mendukung tipe cast <code translate="no">BOOL</code>, <code translate="no">ARRAY_*</code>, atau <code translate="no">JSON</code>. Gunakan <code translate="no">INVERTED</code> untuk array. Indeks objek utuh yang sudah ada dapat terus menggunakan <code translate="no">INVERTED</code> atau <code translate="no">AUTOINDEX</code>, tetapi pengindeksan JSON objek utuh sudah tidak direkomendasikan.</p>
<p>Untuk detailnya, lihat <a href="/docs/id/stl-sort.md">STL_SORT</a>.</p>
<h3 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BITMAP</code> membuat bitmap ringkas untuk setiap nilai unik pada jalur JSON. Fitur ini dioptimalkan untuk filter kesamaan dan <code translate="no">IN</code> pada nilai yang sering berulang.</p>
<p><code translate="no">BITMAP</code> hanya mendukung tipe konversi <code translate="no">BOOL</code> dan <code translate="no">VARCHAR</code>. Gunakan fungsi ini jika:</p>
<ul>
<li><p>Filter Anda menggunakan ` <code translate="no">==</code> ` atau ` <code translate="no">IN</code>`.</p></li>
<li><p>Nilai-nilai yang diindeks memiliki kardinalitas rendah, seperti nilai boolean, nilai status, atau sekumpulan kategori yang kecil.</p></li>
<li><p>Anda ingin memaksa tata letak bitmap alih-alih membiarkan <code translate="no">AUTOINDEX</code> memilihnya.</p></li>
</ul>
<p><code translate="no">BITMAP</code> Tidak mendukung tipe konversi ` <code translate="no">DOUBLE</code>`, ` <code translate="no">ARRAY_*</code>`, atau ` <code translate="no">JSON</code> `. Untuk nilai numerik, gunakan ` <code translate="no">AUTOINDEX</code>`, ` <code translate="no">STL_SORT</code>`, atau ` <code translate="no">INVERTED</code> ` sebagai gantinya.</p>
<p>Untuk detailnya, lihat <a href="/docs/id/bitmap.md">BITMAP</a>.</p>
<h3 id="Compatibility-reference" class="common-anchor-header">Referensi kompatibilitas<button data-href="#Compatibility-reference" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan matriks berikut sebagai referensi cepat untuk kombinasi <code translate="no">(cast type, index type)</code> yang didukung.</p>
<table>
<thead>
<tr><th>Tipe konversi</th><th>Deskripsi</th><th>Contoh nilai</th><th>AUTOINDEX</th><th>TERBALIK</th><th>STL_SORT</th><th>BITMAP</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Nilai Boolean (<code translate="no">true</code>/<code translate="no">false</code>).</td><td><code translate="no">true</code></td><td>Ya</td><td>Ya</td><td>Tidak</td><td>Ya</td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>Nilai numerik (bilangan bulat atau bilangan desimal).</td><td><code translate="no">99.99</code></td><td>Ya</td><td>Ya</td><td>Ya</td><td>Tidak</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Nilai string.</td><td><code translate="no">&quot;electronics&quot;</code></td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>Array nilai boolean.</td><td><code translate="no">[true, false]</code></td><td>Tidak</td><td>Ya</td><td>Tidak</td><td>Tidak</td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>Array bilangan.</td><td><code translate="no">[1.2, 3.14]</code></td><td>Tidak</td><td>Ya</td><td>Tidak</td><td>Tidak</td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>Array string.</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td><td>Tidak</td><td>Ya</td><td>Tidak</td><td>Tidak</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Objek JSON utuh atau sub-objek dengan inferensi tipe otomatis dan perataan. Tidak disarankan lagi mulai dari Milvus 3.0.0.</td><td>objek bersarang apa pun</td><td>Ya (tidak disarankan lagi)</td><td>Ya (tidak disarankan lagi)</td><td>Tidak</td><td>Tidak</td></tr>
</tbody>
</table>
<p>Untuk sel yang ditandai sebagai " <code translate="no">No</code>", Milvus akan menolak permintaan tersebut saat pembuatan indeks. Untuk tipe konversi array, gunakan " <code translate="no">INVERTED</code> " secara eksplisit (<code translate="no">AUTOINDEX</code> tidak mencakup array).</p>
<h2 id="Create-a-JSON-index" class="common-anchor-header">Membuat indeks JSON<button data-href="#Create-a-JSON-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagian ini memandu Anda dalam mengindeks berbagai bentuk data JSON. Semua contoh menggunakan struktur contoh di bawah ini dan mengasumsikan Anda sudah memiliki koleksi yang mencakup bidang <code translate="no">JSON</code> bernama <code translate="no">metadata</code>.</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">Struktur JSON contoh<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Basic-setup" class="common-anchor-header">Pengaturan dasar<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>Contoh di bawah ini mengasumsikan Anda memiliki <code translate="no">MilvusClient</code> bernama <code translate="no">client</code> yang terhubung ke deployment Milvus Anda, serta koleksi yang sudah mencakup bidang <code translate="no">JSON</code> bernama <code translate="no">metadata</code>. Jika Anda perlu menyiapkan keduanya dari awal, perluas blok di bawah ini.</p>
<p><details></p>
<p><summary>Hubungkan dan buat koleksi contoh</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Define a schema with a JSON field</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)
schema.add_field(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.JSON, nullable=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Minimal vector index so the collection can be loaded</span>
vec_index = client.prepare_index_params()
vec_index.add_index(field_name=<span class="hljs-string">&quot;vec&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    schema=schema,
    index_params=vec_index,
)

<span class="hljs-comment"># Insert one row that matches the sample JSON structure above</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[{
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }],
)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Siapkan objek `index-params` untuk mengumpulkan definisi indeks yang ditambahkan dalam contoh di bawah ini:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<p>Setiap contoh berikut menunjukkan satu panggilan ` <code translate="no">index_params.add_index(...)</code> `. Pilih yang sesuai dengan data Anda dan panggil pada objek ` <code translate="no">index_params</code> ` yang sama. Kemudian terapkan semuanya dalam satu panggilan ` <code translate="no">client.create_index(...)</code> ` di bagian akhir. Untuk detailnya, lihat <a href="/docs/id/json-indexing.md#apply-the-index">Terapkan indeks</a>.</p>
<h3 id="Example-1-Index-a-top-level-key-with-AUTOINDEX" class="common-anchor-header">Contoh 1: Mengindeks kunci tingkat atas dengan AUTOINDEX<button data-href="#Example-1-Index-a-top-level-key-with-AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>Buat indeks pada bidang <code translate="no">category</code> untuk penyaringan cepat berdasarkan kategori produk. Dengan <code translate="no">AUTOINDEX</code>, Milvus akan memilih <code translate="no">BITMAP</code> atau <code translate="no">STL_SORT</code> berdasarkan jumlah kategori unik yang ada dalam data Anda.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">Contoh 2: Membuat indeks pada kunci bersarang<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Buat indeks pada bidang ` <code translate="no">email</code> ` yang bersarang dalam untuk pencarian kontak pemasok. Parameter ` <code translate="no">json_path</code> ` menerima notasi kurung dengan kedalaman berapa pun.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-queries-with-STLSORT" class="common-anchor-header">Contoh 3: Kueri rentang dengan STL_SORT<button data-href="#Example-3-Range-queries-with-STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika Anda tahu bahwa kueri pada suatu jalur akan didominasi oleh perbandingan rentang (<code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code>), pilihlah <code translate="no">STL_SORT</code> secara langsung. Ini akan melewati pengukuran kardinalitas dan segera membangun tata letak yang diurutkan.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Setelah pengindeksan, kueri rentang seperti <code translate="no">metadata[&quot;price&quot;] &gt; 50 AND metadata[&quot;price&quot;] &lt; 100</code> menggunakan pencarian biner alih-alih pemindaian penuh.</p>
<h3 id="Example-4-Equality-queries-with-BITMAP" class="common-anchor-header">Contoh 4: Kueri kesetaraan dengan BITMAP<button data-href="#Example-4-Equality-queries-with-BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk kunci dengan kardinalitas rendah, seperti kode status, nilai boolean, atau string mirip enum, pilih <code translate="no">BITMAP</code> secara langsung. Kueri kesetaraan dan <code translate="no">IN</code> akan diubah menjadi operasi bitmap.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;in_stock_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;in_stock&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;BOOL&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">BITMAP</code> juga sangat cocok untuk bidang seperti kolom " <code translate="no">status</code> " dengan sejumlah kecil nilai string yang berbeda.</p>
<h3 id="Example-5-Convert-data-type-at-index-time" class="common-anchor-header">Contoh 5: Mengonversi tipe data saat pembuatan indeks<button data-href="#Example-5-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika data numerik secara keliru disimpan sebagai string, gunakan ` <code translate="no">STRING_TO_DOUBLE</code> ` untuk mengonversi nilai tersebut menjadi angka selama pembuatan indeks.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Jika konversi gagal untuk suatu baris (misalnya, string non-numerik seperti ` <code translate="no">&quot;invalid&quot;</code>`), baris tersebut dilewati selama proses pengindeksan.</p>
<h3 id="Example-6-Index-entire-JSON-objects" class="common-anchor-header">Contoh 6: Mengindeks objek JSON secara utuh<button data-href="#Example-6-Index-entire-JSON-objects" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert warning">
<p>Mulai Milvus 3.0.0, pengindeksan objek JSON secara keseluruhan (<code translate="no">json_cast_type=&quot;JSON&quot;</code>), yang juga dikenal sebagai pengindeksan JSON datar, tidak lagi direkomendasikan. Indeks yang ada dan permintaan pembuatan indeks baru tetap didukung demi kompatibilitas, tetapi mode ini tidak lagi direkomendasikan untuk beban kerja baru. Buat indeks jalur JSON untuk jalur kueri yang diketahui. Untuk dokumen JSON yang kompleks atau terus berkembang dengan pola kueri yang luas, pertimbangkan <a href="/docs/id/json-shredding.md">JSON Shredding</a>. JSON shredding tidak mempercepat nilai di dalam array; gunakan indeks jalur JSON dengan tipe array cast untuk kueri tersebut.</p>
</div>
<p>Untuk beban kerja yang sudah ada dan kompatibel, pengaturan " <code translate="no">json_cast_type=&quot;JSON&quot;</code> " akan mengindeks struktur lengkap pada jalur yang ditentukan. Milvus meratakan objek bersarang menjadi jalur dan secara otomatis menyimpulkan tipe setiap nilai. Semua kunci di bawah jalur tersebut menjadi dapat dicari.</p>
<p><code translate="no">AUTOINDEX</code> secara transparan menggunakan " <code translate="no">INVERTED</code> " untuk tipe konversi " <code translate="no">JSON</code> ", karena perataan dan penentuan tipe merupakan kemampuan indeks terbalik.</p>
<p>Mengindeks seluruh objek <code translate="no">metadata</code>:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Atau indeks sub-objek, seperti semua informasi <code translate="no">supplier</code>:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Mengindeks seluruh objek akan meningkatkan ukuran indeks. Untuk beban kerja baru dengan dokumen yang bersarang dalam dan pola kueri yang beragam, gunakan indeks jalur spesifik atau pertimbangkan <a href="/docs/id/json-shredding.md">JSON Shredding</a>.</p>
<h3 id="Apply-the-index" class="common-anchor-header">Terapkan indeks<button data-href="#Apply-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Setelah menambahkan semua parameter indeks Anda, terapkan ke koleksi Anda:</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Pembuatan indeks berjalan secara asinkron. Gunakan <code translate="no">client.describe_index(...)</code> untuk memeriksa status pembuatan indeks tertentu. Bidang <code translate="no">state</code> akan menampilkan <code translate="no">Finished</code> setelah pembuatan selesai, sedangkan <code translate="no">total_rows</code>, <code translate="no">indexed_rows</code>, dan <code translate="no">pending_index_rows</code> menampilkan kemajuan selama proses berlangsung.</p>
<pre><code translate="no" class="language-python">client.describe_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Contoh respons:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;json_path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;json_cast_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;VARCHAR&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AUTOINDEX&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category_index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;total_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;indexed_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;pending_index_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;state&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Finished&quot;</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setelah <code translate="no">state</code> melaporkan <code translate="no">Finished</code>, kueri terhadap jalur yang diindeks akan secara otomatis menggunakan indeks baru tersebut.</p>
<p>Untuk entri <code translate="no">AUTOINDEX</code>, bidang <code translate="no">index_type</code> dalam respons ini dilaporkan sebagai <code translate="no">AUTOINDEX</code>. Saat ini, Milvus tidak mengungkapkan tata letak dasar mana (<code translate="no">BITMAP</code> atau <code translate="no">STL_SORT</code>) yang dipilih pada saat pembuatan. Anggaplah pilihan tersebut sebagai optimisasi internal: kueri kesetaraan, <code translate="no">IN</code>, dan rentang terhadap jalur tersebut akan berfungsi terlepas dari tata letak mana yang dipilih.</p>
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
    </button></h2><h3 id="How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="common-anchor-header">Bagaimana cara memilih antara AUTOINDEX dan tipe indeks eksplisit?<button data-href="#How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Mulailah dengan <code translate="no">AUTOINDEX</code>. Fitur ini memilih tata letak yang tepat berdasarkan kardinalitas data Anda, dan mencakup sebagian besar kueri kesetaraan, <code translate="no">IN</code>, serta kueri rentang pada jalur JSON. Pilih tipe eksplisit jika:</p>
<ul>
<li><p>Anda mengetahui pola kueri Anda (misalnya, selalu menggunakan kueri rentang dengan <code translate="no">STL_SORT</code>, dan selalu menggunakan kueri kesetaraan pada nilai dengan kardinalitas rendah dengan <code translate="no">BITMAP</code>) serta ingin melewati pengukuran kardinalitas.</p></li>
<li><p>Anda memerlukan kueri pencocokan teks atau substring. Gunakan <code translate="no">INVERTED</code>.</p></li>
<li><p>Anda sedang mengindeks tipe array yang dikonversi. Gunakan ` <code translate="no">INVERTED</code> ` secara eksplisit.</p></li>
<li><p>Anda sedang memelihara indeks JSON objek utuh yang sudah ada. Baik <code translate="no">INVERTED</code> maupun <code translate="no">AUTOINDEX</code> tetap didukung demi kompatibilitas, tetapi pengindeksan JSON objek utuh sudah tidak direkomendasikan mulai Milvus 3.0.0.</p></li>
</ul>
<h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">Apa yang terjadi jika ekspresi filter kueri menggunakan tipe yang berbeda dari tipe konversi yang diindeks?<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika ekspresi filter Anda menggunakan tipe yang berbeda dari <code translate="no">json_cast_type</code> indeks, Milvus tidak akan menggunakan indeks tersebut dan mungkin akan beralih ke pemindaian brute-force yang lebih lambat jika data memungkinkan. Untuk kinerja terbaik, selalu sesuaikan ekspresi filter Anda dengan tipe konversi indeks. Misalnya, jika indeks numerik dibuat deng <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code>, hanya kondisi filter numerik yang akan memanfaatkan indeks tersebut.</p>
<h3 id="What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">Bagaimana jika sebuah kunci JSON memiliki tipe data yang tidak konsisten di berbagai entitas?<button data-href="#What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>Tipe data yang tidak konsisten dapat menyebabkan <strong>pengindeksan parsial</strong>. Misalnya, jika ` <code translate="no">metadata[&quot;price&quot;]</code> ` disimpan baik sebagai angka (<code translate="no">99.99</code>) maupun sebagai string (<code translate="no">&quot;99.99&quot;</code>), dan Anda membuat indeks dengan ` <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code>`, hanya nilai numerik yang diindeks. Entri dalam bentuk string akan dilewati dan tidak akan muncul dalam hasil penyaringan. Gunakan ` <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> ` untuk mengubah string menjadi angka saat proses pengindeksan, atau perbaiki data sumber agar semua entri memiliki tipe yang sama.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">Apakah saya dapat membuat beberapa indeks pada kunci JSON yang sama?<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Tidak. Milvus hanya mengizinkan paling banyak satu indeks per pasangan <code translate="no">(field, json_path)</code>, terlepas dari jenis konversi atau jenis indeks. Anda tidak dapat membuat indeks ` <code translate="no">INVERTED</code> ` dan ` <code translate="no">BITMAP</code> ` pada jalur yang sama, atau dua indeks pada jalur yang sama dengan tipe konversi yang berbeda. Namun, Anda dapat membuat indeks pada seluruh objek JSON dan indeks terpisah pada kunci bersarang di dalam objek tersebut karena keduanya merupakan jalur yang berbeda.</p>
<h3 id="How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="common-anchor-header">Bagaimana cara menyesuaikan ambang batas BITMAP-vs-STL_SORT pada AUTOINDEX?<button data-href="#How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="anchor-icon" translate="no">
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
    </button></h3><p>Secara default, <code translate="no">AUTOINDEX</code> memilih <code translate="no">BITMAP</code> jika nilai yang diindeks memiliki <strong>100 atau kurang nilai unik</strong>, dan <code translate="no">STL_SORT</code> jika tidak. Anda dapat mengganti ambang batas ini dengan menambahkan <code translate="no">&quot;bitmap_cardinality_limit&quot;</code> ke parameter indeks Anda (rentang: 1–1000):</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># use BITMAP up to 200 distinct values</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Sebagian besar pengguna tidak perlu menyesuaikan pengaturan ini. Naikkan nilainya jika Anda memiliki bidang dengan kardinalitas sedang yang lebih disukai diproses dengan bitmap; turunkan nilainya untuk mempercepat peralihan dari ` <code translate="no">AUTOINDEX</code> ` ke ` <code translate="no">STL_SORT</code> `. Pengaturan ini diabaikan jika Anda secara eksplisit menentukan ` <code translate="no">INVERTED</code>`, ` <code translate="no">STL_SORT</code>`, atau ` <code translate="no">BITMAP</code> `.</p>
