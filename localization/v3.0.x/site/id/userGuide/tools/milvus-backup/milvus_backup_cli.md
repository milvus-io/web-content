---
id: milvus_backup_cli.md
summary: Pelajari cara menggunakan Milvus Backup melalui CLI
title: >-
  Mencadangkan dan Memulihkan Data Menggunakan PerintahCompatible with Milvus
  Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">Mencadangkan dan Memulihkan Data Menggunakan Perintah<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>Untuk alur kerja saat ini, lihat <a href="/docs/id/milvus_backup_0_6_cli.md">panduan CLI</a> atau <a href="/docs/id/milvus_backup_upgrade.md">lakukan pembaruan dari versi 0.5.x</a>. Periksa <a href="/docs/id/milvus_backup_overview.md#Compatibility-matrix">matriks kompatibilitas</a> untuk versi server Milvus yang didukung.</p>
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
<p>Untuk membangun 0.5.16 dari kode sumber, instal Go 1.25 atau yang lebih baru dan jalankan:</p>
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
<p>Kemudian buat folder di samping file biner Milvus Backup yang telah diunduh atau dibangun, beri nama folder tersebut <code translate="no">configs</code>, dan letakkan berkas konfigurasi di dalam folder <code translate="no">configs</code>.</p>
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
<p>Nama bucket MinIO default bervariasi tergantung cara Anda menginstal Milvus. Saat melakukan perubahan pada pengaturan MinIO, silakan merujuk ke tabel berikut.</p>
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
    </button></h2><p>Jika Anda menjalankan instance Milvus lokal yang kosong di port default, gunakan skrip Python contoh untuk menghasilkan beberapa data di instance Anda. Silakan lakukan perubahan yang diperlukan pada skrip tersebut agar sesuai dengan kebutuhan Anda.</p>
<p>Unduh <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">skrip-skrip</a> tersebut. Kemudian jalankan skrip-skrip tersebut untuk menghasilkan data. Pastikan <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, SDK Python resmi Milvus, telah terinstal.</p>
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
    </button></h2><p>Perhatikan bahwa menjalankan Milvus Backup pada instance Milvus biasanya tidak akan memengaruhi kinerja instance tersebut. Instance Milvus Anda tetap berfungsi sepenuhnya selama proses pencadangan atau pemulihan.</p>
<div class="tab-wrapper"></div>
<p>Jalankan perintah berikut untuk membuat cadangan.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>Setelah perintah dijalankan, Anda dapat memeriksa file cadangan di bucket yang ditentukan dalam pengaturan Minio. Secara khusus, Anda dapat mengunduhnya menggunakan <strong>Minio Console</strong> atau klien <strong>mc</strong>.</p>
<p>Untuk mengunduh dari <a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">Minio Console</a>, masuk ke Minio Console, temukan bucket yang ditentukan di <code translate="no">minio.backupBucketName</code>, pilih berkas-berkas di dalam bucket tersebut, lalu klik <strong>Unduh</strong> untuk mengunduhnya.</p>
<p>Jika Anda lebih memilih <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">klien mc</a>, lakukan langkah-langkah berikut:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
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
<p>Anda dapat menjalankan perintah ` <code translate="no">restore</code> ` dengan bendera ` <code translate="no">-s</code> ` untuk membuat koleksi baru dengan memulihkan data dari cadangan:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p>Bendera ` <code translate="no">-s</code> ` memungkinkan Anda menetapkan sufiks untuk koleksi baru yang akan dibuat. Perintah di atas akan membuat koleksi baru bernama <strong>`hello_milvus_recover</strong> ` di instance Milvus Anda.</p>
<p>Jika Anda lebih memilih untuk memulihkan koleksi yang dicadangkan tanpa mengubah namanya, hapus koleksi tersebut terlebih dahulu sebelum memulihkannya dari cadangan. Anda kini dapat membersihkan data yang dihasilkan pada tahap <a href="#Prepare-data">"Prepare data</a> " dengan menjalankan perintah berikut.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian jalankan perintah berikut untuk memulihkan data dari cadangan.</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Untuk data sampel sementara yang dibuat di atas, skrip hulu akan mengindeks dan melakukan kueri pada ` <code translate="no">hello_milvus_recover</code> ` dan ` <code translate="no">hello_milvus2_recover</code>`, lalu <strong>menghapus kedua koleksi yang dipulihkan</strong>. Jalankan skrip ini hanya setelah memulihkan kedua koleksi sampel tersebut dengan perintah ` <code translate="no">_recover</code>`. Untuk data Anda sendiri, bandingkan dengan baseline pada saat pencadangan tanpa menggunakan skrip pembersihan ini.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/verify_data.py -o example/verify_data.py
python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Perhatikan bahwa skrip di atas mengasumsikan bahwa Anda telah menjalankan perintah ` <code translate="no">restore</code> ` dengan bendera ` <code translate="no">-s</code> ` dan sufiksnya diatur ke ` <code translate="no">_recover</code>`. Silakan lakukan perubahan yang diperlukan pada skrip tersebut agar sesuai dengan kebutuhan Anda.</p>
