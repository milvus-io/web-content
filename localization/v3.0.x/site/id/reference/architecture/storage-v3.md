---
id: storage-v3.md
title: Penyimpanan V3Compatible with Milvus 3.0.x
summary: >-
  Pelajari fitur-fitur Milvus 3.0 mana saja yang memerlukan Storage V3, cara
  mengaktifkannya, serta batasan kompatibilitas apa saja yang berlaku.
beta: Milvus 3.0.x
---
<h1 id="Storage-V3" class="common-anchor-header">Penyimpanan V3<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Storage-V3" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Kumpulan data AI sering kali berkembang setelah koleksi dibuat. Seiring perubahan model dan alur kerja, tim mungkin perlu menambahkan teks, menghasilkan bidang vektor baru untuk entitas yang sudah ada, atau menggunakan data yang disimpan di luar Milvus. Untuk mendukung alur kerja ini, diperlukan model penyimpanan yang dapat berkembang seiring dengan kumpulan data.</p>
<p>Storage V3 menyediakan model ini di Milvus 3.0. Fitur ini menggunakan tata letak penyimpanan berversi untuk mengintegrasikan data yang ditambahkan atau ditulis ulang seiring waktu, sementara aplikasi tetap mengakses koleksi melalui API Milvus yang sama.</p>
<p>Penyimpanan V3 dinonaktifkan secara default. Setelah " <code translate="no">common.storage.useLoonFFI</code> " berlaku, penulisan baru dan hasil pemadatan akan menggunakan Penyimpanan V3. Data yang sudah ada tetap berada dalam tata letak saat ini hingga data yang memenuhi syarat ditulis ulang oleh pemadatan latar belakang. Milvus dapat membaca kedua tata letak tersebut selama masa transisi ini. Aktifkan Penyimpanan V3 untuk menggunakan fitur-fitur yang bergantung padanya, bukan sebagai optimasi kinerja umum.</p>
<h2 id="Data-formats-in-Storage-V3" class="common-anchor-header">Format data di Storage V3<button data-href="#Data-formats-in-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Storage V3 menggunakan manifest untuk mendeskripsikan data koleksi secara terpisah dari format data yang mendasarinya. Hal ini memungkinkan lapisan penyimpanan yang sama bekerja dengan data yang dikelola oleh Milvus dan data yang tetap berada di sistem eksternal.</p>
<h3 id="Managed-collection-file-formats" class="common-anchor-header">Format file koleksi yang dikelola<button data-href="#Managed-collection-file-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk koleksi yang dikelola, " <code translate="no">dataNode.storage.format</code> " memilih format file untuk data Storage V3 baru. Pengaturan ini mendukung nilai-nilai berikut:</p>
<table>
<thead>
<tr><th>Format</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>Format file kolom default yang banyak digunakan dengan kompatibilitas ekosistem yang luas dan alat yang matang. Parquet mengatur data ke dalam kelompok baris dan mendukung pengkodean serta kompresi per kolom, sehingga Milvus hanya dapat membaca kolom yang diperlukan dan memproses pemindaian berurutan dalam skala besar secara efisien.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>Format file kolom generasi berikutnya yang opsional, dibangun di atas pengkodean yang dapat diperluas dan disusun, serta statistik yang kaya. Di Milvus, Vortex mendukung proyeksi kolom, pembacaan rentang, dan pembacaan akses acak. Kemampuan ini dapat mengurangi pembacaan data yang tidak perlu untuk beban kerja yang sesuai.</td></tr>
</tbody>
</table>
<p>Mengubah " <code translate="no">dataNode.storage.format</code> " akan memengaruhi penulisan baru ke Storage V3. File yang sudah ada akan mempertahankan format saat ini hingga proses kompaksi menulis ulang segmen yang bersangkutan. Sebagian besar implementasi sebaiknya mempertahankan format default " <code translate="no">parquet</code> " kecuali jika benchmark yang representatif menunjukkan bahwa " <code translate="no">vortex</code> " lebih sesuai dengan data dan pola akses mereka.</p>
<h3 id="External-collections-and-supported-source-formats" class="common-anchor-header">Koleksi eksternal dan format sumber yang didukung<button data-href="#External-collections-and-supported-source-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>Koleksi eksternal memungkinkan Milvus menggunakan data yang disimpan dalam file atau tabel eksternal. Storage V3 mendukung format sumber eksternal berikut:</p>
<table>
<thead>
<tr><th>Format</th><th>Kategori</th><th>Sumber yang diharapkan</th><th>Dukungan Storage V3</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>Format berkas</td><td>Sebuah direktori atau awalan penyimpanan objek yang berisi berkas Parquet.</td><td>Mendeteksi berkas-berkas tersebut, membaca metadata dan grup barisnya, serta mencatatnya dalam manifes Storage V3.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>Format berkas</td><td>Sebuah direktori atau awalan penyimpanan objek yang berisi berkas Vortex.</td><td>Menemukan file-file tersebut dan menggunakan tata letak serta statistik Vortex untuk proyeksi, pembacaan rentang, dan pembacaan akses acak.</td></tr>
<tr><td><code translate="no">lance-table</code></td><td>Format tabel</td><td>Sebuah direktori dataset Lance.</td><td>Membaca metadata dataset dan memetakan fragmen-fragmennya ke dalam manifest Storage V3.</td></tr>
<tr><td><code translate="no">iceberg-table</code></td><td>Format tabel</td><td>File JSON metadata Iceberg dan ID snapshot.</td><td>Menyelesaikan snapshot yang ditentukan, merencanakan berkas datanya, dan mempertahankan metadata penghapusan berdasarkan posisi. Penghapusan berdasarkan kesetaraan tidak didukung dan harus dikonversi menjadi penghapusan berdasarkan posisi sebelum koleksi eksternal diperbarui.</td></tr>
</tbody>
</table>
<p>Sumber eksternal bersifat read-only. Storage V3 membuat dan menyegarkan manifestnya sendiri tanpa memodifikasi atau menyalin data sumber. Milvus kemudian dapat membuat indeks serta menjalankan pencarian dan kueri atas data tersebut melalui koleksi eksternal.</p>
<h4 id="Cloud-storage-and-cross-account-authentication" class="common-anchor-header">Penyimpanan awan dan otentikasi lintas akun</h4><p>Tabel berikut hanya menjelaskan bagaimana koleksi eksternal mengakses data sumber yang disimpan di akun cloud lain. Tabel ini tidak menjelaskan penyimpanan objek yang digunakan untuk data yang dikelola Milvus.</p>
<table>
<thead>
<tr><th>Penyimpanan awan</th><th>Format eksternal yang didukung</th><th>Otentikasi lintas akun untuk koleksi eksternal</th></tr>
</thead>
<tbody>
<tr><td>Amazon S3</td><td>Keempat format yang tercantum di atas.</td><td>Tentukan ARN peran IAM milik pelanggan. Storage V3 menggunakan AWS STS <code translate="no">AssumeRole</code> untuk mendapatkan kredensial sementara dan memperbaruinya sesuai kebutuhan. Anda juga dapat memberikan ID eksternal jika diwajibkan oleh kebijakan kepercayaan peran tersebut.</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>Keempat format yang tercantum di atas.</td><td>Tentukan akun layanan tujuan. Storage V3 menyamar sebagai akun layanan tersebut, menggunakan token akses OAuth berumur pendek miliknya untuk mengakses bucket sumber, dan memperbarui token tersebut sebelum kedaluwarsa.</td></tr>
<tr><td>Azure Blob Storage</td><td><code translate="no">parquet</code>, <code translate="no">vortex</code>, dan <code translate="no">lance-table</code>. <code translate="no">iceberg-table</code> tidak didukung.</td><td>Milvus meminta kredensial SAS berumur pendek melalui layanan gRPC pribadi <code translate="no">milvus-tools</code>. Storage V3 menggunakan kredensial SAS tersebut untuk mengakses kontainer sumber, dan kredensial tersebut diperbarui sebelum kedaluwarsa.</td></tr>
<tr><td>Azure Data Lake Storage Gen2 (ADLS Gen2)</td><td>Keempat format yang tercantum di atas.</td><td>Milvus meminta kredensial SAS berumur pendek melalui layanan gRPC pribadi <code translate="no">milvus-tools</code>. Storage V3 menggunakan kredensial SAS tersebut untuk mengakses kontainer sumber, dan kredensial tersebut diperbarui sebelum kedaluwarsa.</td></tr>
<tr><td>Layanan Penyimpanan Objek Alibaba Cloud (OSS)</td><td>Keempat format yang tercantum di atas.</td><td>Tentukan ARN peran RAM milik pelanggan. Storage V3 mengambil alih peran tersebut menggunakan identitas beban kerja runtime atau peran RAM ECS, kemudian menggunakan kredensial sementara untuk mengakses bucket sumber.</td></tr>
</tbody>
</table>
<p>Untuk konfigurasi koleksi eksternal dan petunjuk penggunaan, lihat <a href="/docs/id/create-an-external-collection.md">Membuat Koleksi Eksternal</a>.</p>
<h2 id="Features-that-require-Storage-V3" class="common-anchor-header">Fitur yang memerlukan Storage V3<button data-href="#Features-that-require-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Fitur</th><th>Deskripsi</th><th>Konfigurasi yang diperlukan</th></tr>
</thead>
<tbody>
<tr><td>Format file Vortex</td><td>Menulis data koleksi terkelola baru dalam format file Vortex.</td><td><ul><li><a href="/docs/id/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><code translate="no">dataNode.storage.format=vortex</code></li></ul></td></tr>
<tr><td><a href="/docs/id/text.md"><code translate="no">TEXT</code> field</a></td><td>Simpan teks sumber yang panjang, seperti bagian teks, dokumen, tiket, atau log, tanpa menetapkan panjang maksimum tetap dalam skema koleksi.</td><td><a href="/docs/id/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/id/add-fields-to-an-existing-collection.md">Bidang vektor yang dihasilkan oleh fungsi</a></td><td>Tambahkan Fungsi BM25 atau MinHash ke koleksi yang sudah ada sehingga Milvus menghasilkan bidang vektor baru dari bidang " <code translate="no">VARCHAR</code> " yang sudah ada. Milvus mengisi nilai yang dihasilkan untuk entitas yang sudah ada secara asinkron melalui kompresi latar belakang.</td><td><ul><li><a href="/docs/id/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/id/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/id/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
<tr><td><a href="/docs/id/create-an-external-collection.md">Koleksi eksternal</a></td><td>Lakukan kueri terhadap data yang disimpan di luar Milvus tanpa menyalinnya ke dalam koleksi yang dikelola. Perbarui koleksi eksternal saat data sumber berubah. Untuk menampilkan bidang sumber tambahan, lihat <a href="/docs/id/alter-external-collection-schema.md">Mengubah Skema Koleksi Eksternal</a>.</td><td><a href="/docs/id/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
</tbody>
</table>
<h2 id="Before-you-enable-Storage-V3" class="common-anchor-header">Sebelum Anda mengaktifkan Storage V3<button data-href="#Before-you-enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert warning">
<p>Setelah Milvus menulis data di Storage V3, penurunan versi ke versi Milvus yang tidak dapat membaca Storage V3 tidak didukung. Menonaktifkan Storage V3 di kemudian hari tidak akan segera mengonversi semua data Storage V3 yang ada atau memulihkan kompatibilitas dengan versi yang lebih lama.</p>
</div>
<p>Sebelum mengaktifkan Storage V3, pertimbangkan perilaku data berikut:</p>
<ul>
<li>Karena " <code translate="no">dataCoord.compaction.storageVersion.enabled</code> " diaktifkan secara default, data yang memenuhi syarat dapat beralih ke Storage V3 secara bertahap melalui proses kompaksi latar belakang.</li>
<li>Menonaktifkan Storage V3 mengubah versi penyimpanan target untuk penulisan di masa mendatang dan hasil pemadatan yang memenuhi syarat. Hal ini tidak secara sinkron mengonversi semua data Storage V3 yang ada atau membuat penurunan versi menjadi aman.</li>
</ul>
<h2 id="Enable-Storage-V3" class="common-anchor-header">Aktifkan Storage V3<button data-href="#Enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Atur ` <code translate="no">common.storage.useLoonFFI</code> ` menjadi ` <code translate="no">true</code> ` dalam konfigurasi Milvus Anda:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">useLoonFFI:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus memperlakukan pengaturan ini sebagai pengaturan yang dapat diperbarui. Terapkan perubahan melalui alur kerja pembaruan konfigurasi yang didukung oleh penyebaran Anda. Mengedit file konfigurasi statis saja tidak menjamin bahwa penyebaran yang sedang berjalan telah menerima nilai baru tersebut.</p>
<p>Jika Anda berencana menambahkan Fungsi dan bidang vektor yang dihasilkannya ke koleksi yang sudah ada, aktifkan juga dua pengaturan pemadatan yang diperlukan untuk pengisian data yang sudah ada:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">bumpSchemaVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">storageVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Output Fungsi untuk entitas yang sudah ada dihasilkan secara asinkron melalui pemadatan latar belakang. Pembaruan skema yang berhasil tidak menandakan bahwa pengisian ulang telah selesai untuk setiap entitas yang sudah ada.</p>
<h2 id="Related-documentation" class="common-anchor-header">Dokumentasi terkait<button data-href="#Related-documentation" class="anchor-icon" translate="no">
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
<li><a href="/docs/id/text.md">Bidang Teks</a></li>
<li><a href="/docs/id/add-fields-to-an-existing-collection.md">Mengubah Skema Koleksi</a></li>
<li><a href="/docs/id/create-an-external-collection.md">Buat Koleksi Eksternal</a></li>
<li><a href="/docs/id/install-overview.md">Gambaran Umum Opsi Penyebaran Milvus</a></li>
<li><a href="/docs/id/upgrade_milvus_standalone-helm.md">Memperbarui Milvus Standalone dengan Helm Chart</a></li>
<li><a href="/docs/id/upgrade_milvus_cluster-helm.md">Memperbarui Milvus Cluster dengan Helm Chart</a></li>
<li><a href="/docs/id/configure_common.md">Konfigurasi yang terkait dengan common</a></li>
<li><a href="/docs/id/configure_datacoord.md">Konfigurasi yang Berkaitan dengan dataCoord</a></li>
<li><a href="https://milvus.io/blog/why-we-built-loon-a-storage-engine-for-ai-data-that-never-stops-changing.md">Mengapa Kami Membangun Loon: Mesin Penyimpanan untuk Data AI yang Terus Berubah</a> — Latar belakang teknikal mengenai motivasi desain di balik Storage V3.</li>
</ul>
