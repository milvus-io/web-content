---
id: milvus_backup_cli.md
summary: Pelajari cara menggunakan Milvus Backup melalui CLI
title: Mencadangkan dan Memulihkan Data Menggunakan Perintah
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">Mencadangkan dan Memulihkan Data Menggunakan Perintah<button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup menyediakan fitur pencadangan dan pemulihan data untuk memastikan keamanan data Milvus Anda.</p>
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
<p>Struktur folder Anda seharusnya serupa dengan yang berikut ini:</p>
<pre>
workspace ├── milvus-backup └── configs └── backup.yaml</pre>
<p>Karena Milvus Backup tidak dapat mencadangkan data Anda ke jalur lokal, pastikan bahwa pengaturan Minio sudah benar saat menyesuaikan file konfigurasi.</p>
<div class="alert note">
<p>Nama bucket Minio default bervariasi sesuai dengan cara Anda menginstal Milvus. Ketika membuat perubahan pada pengaturan Minio, lihat tabel berikut.</p>
<table>
<thead>
<tr><th>bidang</th><th>Penulisan Docker</th><th>Helm / Operator Milvus</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>berkas</td><td>file</td></tr>
</tbody>
</table>
</div>
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
    </button></h2><p>Jika Anda menjalankan instans Milvus lokal kosong pada port default, gunakan contoh skrip Python untuk menghasilkan beberapa data dalam instans Anda. Jangan ragu untuk membuat perubahan yang diperlukan pada skrip agar sesuai dengan kebutuhan Anda.</p>
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
    </button></h2><p>Perhatikan bahwa menjalankan Milvus Backup terhadap instans Milvus biasanya tidak akan memengaruhi jalannya instans. Instance Milvus Anda akan berfungsi penuh selama pencadangan atau pemulihan.</p>
<div class="tab-wrapper"></div>
<p>Jalankan perintah berikut untuk membuat cadangan.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n &lt;backup_name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Setelah perintah dijalankan, Anda dapat memeriksa file cadangan dalam bucket yang ditentukan dalam pengaturan Minio. Secara khusus, Anda dapat mengunduhnya menggunakan <strong>Minio Console</strong> atau klien <strong>mc</strong>.</p>
<p>Untuk mengunduh dari <a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">Minio Cons</a>ole, masuk ke Minio Console, cari bucket yang ditentukan di <code translate="no">minio.address</code>, pilih file di dalam bucket, dan klik <strong>Download</strong> untuk mengunduhnya.</p>
<p>Jika Anda lebih memilih <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">klien mc</a>, lakukan hal berikut:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># configure a Minio host</span>
mc alias <span class="hljs-built_in">set</span> my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;

<span class="hljs-comment"># List the available buckets</span>
mc ls my_minio

<span class="hljs-comment"># Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
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
<p>Anda dapat menjalankan perintah <code translate="no">restore</code> dengan bendera <code translate="no">-s</code> untuk membuat koleksi baru dengan memulihkan data dari cadangan:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p>Bendera <code translate="no">-s</code> memungkinkan Anda untuk mengatur akhiran untuk koleksi baru yang akan dibuat. Perintah di atas akan membuat koleksi baru bernama <strong>hello_milvus_recover</strong> di dalam instans Milvus Anda.</p>
<p>Jika Anda lebih suka memulihkan koleksi yang dicadangkan tanpa mengubah namanya, hapus koleksi sebelum memulihkannya dari cadangan. Anda sekarang dapat membersihkan data yang dihasilkan di <a href="#Prepare-data">Siapkan data</a> dengan menjalankan perintah berikut.</p>
<pre><code translate="no" class="language-shell">python example/clean_data.py
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
    </button></h2><p>Setelah pemulihan selesai, Anda dapat memverifikasi data yang dipulihkan dengan mengindeks koleksi yang dipulihkan sebagai berikut:</p>
<pre><code translate="no" class="language-shell">python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Perhatikan bahwa skrip di atas mengasumsikan bahwa Anda telah menjalankan perintah <code translate="no">restore</code> dengan bendera <code translate="no">-s</code> dan akhiran diatur ke <code translate="no">-recover</code>. Jangan ragu untuk membuat perubahan yang diperlukan pada skrip agar sesuai dengan kebutuhan Anda.</p>
