---
id: milvus_backup_api.md
summary: Pelajari cara menggunakan Milvus Backup melalui API
title: >-
  Mencadangkan dan Memulihkan Data Menggunakan APICompatible with Milvus Backup
  0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">Mencadangkan dan Memulihkan Data Menggunakan API<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>Untuk alur kerja saat ini, lihat <a href="/docs/id/milvus_backup_0_6_api.md">panduan API HTTP</a> atau <a href="/docs/id/milvus_backup_upgrade.md">lakukan pembaruan dari versi 0.5.x</a>. Periksa <a href="/docs/id/milvus_backup_overview.md#Compatibility-matrix">matriks kompatibilitas</a> untuk versi server Milvus yang didukung.</p>
<p>Milvus Backup menyediakan fitur pencadangan dan pemulihan data untuk memastikan keamanan data Milvus Anda.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Mendapatkan Milvus Backup<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat mengunduh file biner yang sudah dikompilasi atau membangunnya dari kode sumber.</p>
<p>Unduh biner untuk sistem operasi dan arsitektur Anda dari <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16">rilis 0.5.16</a>. Gunakan konfigurasi dan contoh 0.5.16 yang sesuai di halaman ini.</p>
<p>Untuk membangun versi 0.5.16 dari kode sumber, instal Go 1.25 atau yang lebih baru, lalu jalankan:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.5.16 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-configuration-file" class="common-anchor-header">Siapkan berkas konfigurasi<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Unduh <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml">berkas konfigurasi contoh</a> dan sesuaikan sesuai kebutuhan Anda.</p>
<p>Kemudian buat folder di samping file biner Milvus Backup yang telah diunduh atau dikompilasi, beri nama folder tersebut " <code translate="no">configs</code>", dan letakkan berkas konfigurasi di dalam folder " <code translate="no">configs</code> ".</p>
<p>Struktur folder Anda harus mirip dengan berikut ini:</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>Contoh ini menggunakan MinIO sebagai penyimpanan cadangan. Sesuaikan ` <code translate="no">minio.*</code> ` agar sesuai dengan penyimpanan Milvus dan tujuan cadangan Anda, termasuk alamat, kredensial, nama bucket, dan jalur akar.</p>
<div class="alert note">
<p>Nama bucket MinIO default bervariasi tergantung pada cara Anda menginstal Milvus. Saat melakukan perubahan pada pengaturan MinIO, silakan merujuk ke tabel berikut.</p>
<table>
<thead>
<tr><th>bidang</th><th>Docker Compose</th><th>Helm / Operator Milvus</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>file</td><td>file</td></tr>
</tbody>
</table>
</div>
<h2 id="Start-up-the-API-server" class="common-anchor-header">Jalankan server API<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>Kemudian Anda dapat menjalankan server API sebagai berikut:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server
<button class="copy-code-btn"></button></code></pre>
<p>Server API mendengarkan pada port 8080 secara default. Anda dapat mengubahnya dengan menjalankannya menggunakan bendera ` <code translate="no">-p</code> `. Untuk menjalankan server API agar mendengarkan pada port 443, lakukan langkah-langkah berikut:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat mengakses Swagger UI menggunakan http://localhost:<port>/api/v1/docs/index.html.</p>
<h2 id="Prepare-data" class="common-anchor-header">Siapkan data<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Jika Anda menjalankan instance Milvus lokal yang kosong dan mendengarkan pada port default 19530, gunakan skrip Python contoh untuk menghasilkan beberapa data di instance Anda. Silakan lakukan perubahan yang diperlukan pada skrip tersebut agar sesuai dengan kebutuhan Anda.</p>
<p>Unduh <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">skrip</a> tersebut. Kemudian jalankan skrip untuk menghasilkan data. Pastikan <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, SDK Python resmi Milvus, telah terinstal.</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Langkah ini bersifat opsional. Jika Anda melewatkannya, pastikan Anda sudah memiliki beberapa data di instance Milvus Anda.</p>
<h2 id="Back-up-data" class="common-anchor-header">Cadangkan data<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><div class="tab-wrapper"></div>
<p>Perhatikan bahwa menjalankan Milvus Backup pada sebuah instance Milvus biasanya tidak akan memengaruhi kinerja instance tersebut. Instance Milvus Anda tetap berfungsi sepenuhnya selama proses pencadangan atau pemulihan.</p>
<p>Jalankan perintah berikut untuk membuat cadangan. Ubah <code translate="no">collection_names</code> dan <code translate="no">backup_name</code> jika diperlukan.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
  &quot;async&quot;: true,
  &quot;backup_name&quot;: &quot;my_backup&quot;,
  &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ]
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Permintaan pembuatan bersifat asinkron. Lakukan polling ke <code translate="no">get_backup</code> dengan menggunakan <code translate="no">requestId</code> yang dikembalikan sebagai <code translate="no">backup_id</code> dan tunggu hingga <code translate="no">data.state_code</code> berubah menjadi <code translate="no">2</code> sebelum melakukan pemulihan.</p>
<p>Anda dapat mencantumkan cadangan di bucket yang ditentukan dalam pengaturan Minio sebagai berikut:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/list&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Ambil metadata cadangan sebagai berikut:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Ganti <code translate="no">backup_id</code> dan <code translate="no">backup_name</code> dengan nilai-nilai untuk cadangan Anda. Titik akhir ini mengembalikan metadata JSON, bukan berkas cadangan. Salin direktori cadangan lengkap dari penyimpanan objek saat mengarsipkannya.</p>
<p>Sekarang, Anda dapat menyimpan berkas cadangan ke tempat yang aman untuk pemulihan di masa mendatang, atau mengunggahnya ke <a href="https://cloud.zilliz.com">Zilliz Cloud</a> untuk membuat basis data vektor terkelola dengan data Anda. Untuk detailnya, lihat <a href="https://zilliz.com/doc/migrate_from_milvus-2x">Migrasi dari Milvus ke Zilliz Cloud</a>.</p>
<h2 id="Restore-data" class="common-anchor-header">Memulihkan data<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
    </button></h2><div class="tab-wrapper"></div>
<p>Anda dapat memanggil perintah API pemulihan dengan opsi ` <code translate="no">collection_suffix</code> ` untuk membuat koleksi baru dengan memulihkan data dari cadangan. Ubah ` <code translate="no">collection_names</code> ` dan ` <code translate="no">backup_name</code> ` jika diperlukan.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;_recover&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Opsi ` <code translate="no">collection_suffix</code> ` memungkinkan Anda menetapkan sufiks untuk koleksi baru yang akan dibuat. Perintah di atas akan membuat koleksi baru bernama <strong>`hello_milvus_recover</strong> ` di instance Milvus Anda.</p>
<p>Jika Anda lebih memilih memulihkan koleksi yang telah dicadangkan tanpa mengubah namanya, hapus koleksi tersebut terlebih dahulu sebelum memulihkannya dari cadangan. Anda kini dapat membersihkan data yang dihasilkan pada tahap <a href="#Prepare-data">"Prepare data</a> " dengan menjalankan perintah berikut.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian jalankan perintah berikut untuk memulihkan data dari cadangan.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Proses pemulihan dapat memakan waktu tergantung pada ukuran data yang akan dipulihkan. Oleh karena itu, contoh di atas meminta eksekusi asinkron dengan opsi ` <code translate="no">&quot;async&quot;: true</code>`. Anda dapat memeriksa status tugas pemulihan dengan menjalankan:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Ingatlah untuk mengganti ` <code translate="no">test_restore_id</code> ` dengan ` <code translate="no">data.id</code> ` yang dikembalikan oleh API pemulihan. Tunggu hingga ` <code translate="no">data.state_code</code> ` menjadi ` <code translate="no">2</code> ` sebelum memverifikasi data; ` <code translate="no">3</code> ` menandakan kegagalan dan ` <code translate="no">4</code> ` menandakan waktu habis.</p>
<h2 id="Verify-restored-data" class="common-anchor-header">Verifikasi data yang dipulihkan<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah tugas berhasil, pastikan bahwa <code translate="no">hello_milvus_recover</code> ada. Buat indeks yang sesuai, muat koleksi, dan bandingkan jumlah entitas, nilai skalar dan vektor, serta hasil pencarian dengan data sumber yang diambil sebelum pencadangan. Untuk pemulihan dengan nama asli, gunakan <code translate="no">hello_milvus</code> sebagai gantinya.</p>
<p>Contoh <code translate="no">verify_data.py</code> yang ditautkan oleh panduan CLI mengharapkan dua koleksi yang dipulihkan dan menghapusnya di akhir. Hal ini tidak sesuai untuk contoh API ini, yang hanya memilih <code translate="no">hello_milvus</code>.</p>
