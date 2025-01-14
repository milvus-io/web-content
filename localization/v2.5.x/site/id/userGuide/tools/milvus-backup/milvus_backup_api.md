---
id: milvus_backup_api.md
summary: Pelajari cara menggunakan Milvus Backup melalui API
title: Cadangkan dan Pulihkan Data Menggunakan API
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">Cadangkan dan Pulihkan Data Menggunakan API<button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup menyediakan fitur backup dan restore data untuk memastikan keamanan data Milvus Anda.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Mendapatkan Cadangan Milvus<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda bisa mengunduh biner yang telah dikompilasi atau membangun dari sumbernya.</p>
<p>Untuk mengunduh biner yang telah dikompilasi, buka halaman <a href="https://github.com/zilliztech/milvus-backup/releases">rilis</a>, di mana Anda dapat menemukan semua rilis resmi. Ingat, selalu gunakan biner dalam rilis yang ditandai sebagai <strong>Terbaru</strong>.</p>
<p>Untuk mengkompilasi dari sumbernya, lakukan hal berikut:</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> git@github.com:zilliztech/milvus-backup.git
go get
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
    </button></h2><p>Unduh <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/master/configs/backup.yaml">contoh berkas konfigurasi</a> dan sesuaikan dengan kebutuhan Anda.</p>
<p>Kemudian buat sebuah folder di samping berkas biner Milvus Backup yang telah diunduh atau dibuat, beri nama folder tersebut <code translate="no">configs</code>, dan letakkan berkas konfigurasi di dalam folder <code translate="no">configs</code>.</p>
<p>Struktur folder Anda seharusnya mirip dengan yang berikut ini:</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>Karena Milvus Backup tidak dapat mencadangkan data Anda ke jalur lokal, pastikan pengaturan Minio sudah benar saat menyesuaikan file konfigurasi.</p>
<div class="alert note">
<p>Nama bucket Minio default bervariasi sesuai dengan cara Anda menginstal Milvus. Ketika membuat perubahan pada pengaturan Minio, lihat tabel berikut.</p>
<table>
<thead>
<tr><th>bidang</th><th>Penulisan Docker</th><th>Helm / Operator Milvus</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>berkas</td><td>berkas</td></tr>
</tbody>
</table>
</div>
<h2 id="Start-up-the-API-server" class="common-anchor-header">Memulai server API<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>Kemudian Anda dapat memulai server API sebagai berikut:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server
<button class="copy-code-btn"></button></code></pre>
<p>Server API mendengarkan pada port 8080 secara default. Anda dapat mengubahnya dengan menjalankannya dengan bendera <code translate="no">-p</code>. Untuk memulai server API yang mendengarkan pada port 443, lakukan hal berikut:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat mengakses Swagger UI menggunakan http://localhost:<port>/api/v1/docs/index.html.</p>
<h2 id="Prepare-data" class="common-anchor-header">Menyiapkan data<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Jika Anda menjalankan instans Milvus lokal kosong yang mendengarkan pada port default 19530, gunakan contoh skrip Python untuk menghasilkan beberapa data dalam instans Anda. Jangan ragu untuk membuat perubahan yang diperlukan pada skrip agar sesuai dengan kebutuhan Anda.</p>
<p>Dapatkan <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/main/example/prepare_data.py">skripnya</a>. Kemudian jalankan skrip untuk menghasilkan data. Pastikan bahwa <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, SDK Python Milvus resmi, telah terinstal.</p>
<pre><code translate="no" class="language-shell">python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Langkah ini bersifat opsional. Jika Anda melewatkan langkah ini, pastikan bahwa Anda sudah memiliki beberapa data dalam instance Milvus Anda.</p>
<h2 id="Back-up-data" class="common-anchor-header">Mencadangkan data<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
<p>Perhatikan bahwa menjalankan Milvus Backup terhadap instans Milvus biasanya tidak akan memengaruhi jalannya instans. Instance Milvus Anda akan berfungsi penuh selama pencadangan atau pemulihan.</p>
<p>Jalankan perintah berikut untuk membuat cadangan. Ubah <code translate="no">collection_names</code> dan <code translate="no">backup_name</code> jika perlu.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST <span class="hljs-string">&#x27;http://localhost:8080/api/v1/create&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
--data-raw <span class="hljs-string">&#x27;{
  &quot;async&quot;: true,
  &quot;backup_name&quot;: &quot;my_backup&quot;,
  &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setelah perintah dijalankan, Anda dapat membuat daftar cadangan dalam bucket yang ditentukan dalam pengaturan Minio sebagai berikut:</p>
<pre><code translate="no" class="language-shell">curl --location --request <span class="hljs-variable constant_">GET</span> <span class="hljs-string">&#x27;http://localhost:8080/api/v1/list&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dan unduh file cadangan sebagai berikut:</p>
<pre><code translate="no" class="language-shell">curl --location --request <span class="hljs-variable constant_">GET</span> <span class="hljs-string">&#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Saat menjalankan perintah di atas, ubah <code translate="no">backup_id</code> dan <code translate="no">backup_name</code> ke yang dikembalikan oleh API daftar.</p>
<p>Sekarang, Anda dapat menyimpan file cadangan ke tempat yang aman untuk pemulihan di masa mendatang, atau mengunggahnya ke <a href="https://cloud.zilliz.com">Zilliz Cloud</a> untuk membuat database vektor terkelola dengan data Anda. Untuk detailnya, lihat <a href="https://zilliz.com/doc/migrate_from_milvus-2x">Migrasi dari Milvus ke Zilliz Cloud</a>.</p>
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
<p>Anda dapat memanggil perintah API restore dengan opsi <code translate="no">collection_suffix</code> untuk membuat koleksi baru dengan memulihkan data dari cadangan. Ubah <code translate="no">collection_names</code> dan <code translate="no">backup_name</code> jika perlu.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST <span class="hljs-string">&#x27;http://localhost:8080/api/v1/restore&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;_recover&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Opsi <code translate="no">collection_suffix</code> memungkinkan Anda untuk mengatur akhiran untuk koleksi baru yang akan dibuat. Perintah di atas akan membuat koleksi baru bernama <strong>hello_milvus_recover</strong> di dalam instans Milvus Anda.</p>
<p>Jika Anda lebih suka memulihkan koleksi yang dicadangkan tanpa mengubah namanya, hapus koleksi sebelum memulihkannya dari cadangan. Anda sekarang dapat membersihkan data yang dihasilkan di <a href="#Prepare-data">Siapkan data</a> dengan menjalankan perintah berikut.</p>
<pre><code translate="no" class="language-shell">python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian jalankan perintah berikut untuk memulihkan data dari cadangan.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST <span class="hljs-string">&#x27;http://localhost:8080/api/v1/restore&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Proses pemulihan dapat memakan waktu, tergantung pada ukuran data yang akan dipulihkan. Oleh karena itu, semua tugas pemulihan berjalan secara asinkron. Anda dapat memeriksa status tugas pemulihan dengan menjalankannya:</p>
<pre><code translate="no" class="language-shell">curl --location --request <span class="hljs-variable constant_">GET</span> <span class="hljs-string">&#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ingatlah untuk mengubah <code translate="no">test_restore_id</code> ke yang dipulihkan oleh API pemulihan.</p>
<h2 id="Verify-restored-data" class="common-anchor-header">Memverifikasi data yang dipulihkan<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah pemulihan selesai, Anda dapat memverifikasi data yang dipulihkan dengan mengindeks koleksi yang dipulihkan sebagai berikut:</p>
<pre><code translate="no" class="language-shell">python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Perhatikan bahwa skrip di atas mengasumsikan bahwa Anda telah menjalankan perintah <code translate="no">restore</code> dengan bendera <code translate="no">-s</code> dan akhiran disetel ke <code translate="no">-recover</code>. Jangan ragu untuk membuat perubahan yang diperlukan pada skrip agar sesuai dengan kebutuhan Anda.</p>
