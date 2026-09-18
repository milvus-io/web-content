---
id: milvus_backup_0_6_cli.md
summary: >-
  Konfigurasikan Milvus Backup 0.6.0, buat cadangan, dan periksa data yang telah
  dipulihkan menggunakan CLI.
title: Gunakan Milvus Backup 0.6.0
---
<h1 id="Use-Milvus-Backup-060" class="common-anchor-header">Gunakan Milvus Backup 0.6.0<button data-href="#Use-Milvus-Backup-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Gunakan Milvus Backup untuk mencadangkan koleksi dan memulihkannya di instance Milvus yang sama atau yang lain. Panduan ini mencakup <strong>Milvus Backup 0.6.0</strong>. Pembuatan cadangan dan pemulihan pada Milvus 3.0 secara resmi didukung mulai dari <strong>Milvus 3.0.1</strong>. Milvus Backup 0.6.0 juga mendukung alur kerja binlog pada versi Milvus 2.x yang didukung; periksa <a href="/docs/id/milvus_backup_overview.md#Compatibility-matrix">kompatibilitas Milvus Backup</a>.</p>
<p>Jika Anda masih menggunakan Backup 0.5.x, gunakan <a href="/docs/id/milvus_backup_cli.md">panduan CLI 0.5.x</a>. Jika Anda melakukan peningkatan versi, ikuti <a href="/docs/id/milvus_backup_upgrade.md">panduan Peningkatan Milvus Backup</a> terlebih dahulu.</p>
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
    </button></h2><p>Unduh file biner untuk sistem operasi dan arsitektur Anda dari <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">rilis v0.6.0</a>, lalu ekstrak. Simpan file biner dan contoh konfigurasi pada rilis yang sama.</p>
<p>Untuk membangun dari sumber, instal <strong>Go 1.26 atau yang lebih baru</strong>, lalu jalankan:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.6.0 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<p>Biner yang sudah dibangun sebelumnya tidak memerlukan Go. Jalankan semua perintah shell berikutnya dari direktori yang berisi ` <code translate="no">milvus-backup</code>`.</p>
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
    </button></h2><p>Milvus Backup memerlukan akses ke titik akhir gRPC Milvus, titik akhir manajemennya, penyimpanan instance, dan tujuan pencadangan. Untuk pencadangan snapshot, server Milvus juga memerlukan akses ke penyimpanan cadangan.</p>
<p>Buat direktori konfigurasi:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>Simpan contoh MinIO ini sebagai <code translate="no">configs/backup.yaml</code>. Ganti alamat, kredensial, bucket, dan jalur akar dengan pengaturan deployment Anda. Kredensial <code translate="no">minioadmin</code> adalah pengaturan default uji coba MinIO.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">configVersion:</span> <span class="hljs-string">v2</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">management:</span>
    <span class="hljs-attr">endpoint:</span> <span class="hljs-string">http://localhost:9091</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">provider:</span> <span class="hljs-string">minio</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">files</span>
    <span class="hljs-attr">auth:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">static</span>
      <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span>
<span class="hljs-attr">backup:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">backup</span>
<span class="hljs-attr">transfer:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">auto</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">milvus.grpc</code> terhubung ke instance yang sedang dicadangkan atau dipulihkan. Jika otentikasi diaktifkan, atur juga <code translate="no">milvus.user</code> dan <code translate="no">milvus.password</code>.</li>
<li><code translate="no">milvus.management.endpoint</code> digunakan untuk menjeda/melanjutkan pengumpulan sampah selama proses pencadangan.</li>
<li><code translate="no">milvus.storage</code> harus sesuai dengan penyimpanan objek aktual dari instance tersebut. Menetapkan bucket di sini tidak mengubah konfigurasi Milvus.</li>
<li><code translate="no">backup.storage</code> mengidentifikasi lokasi pencadangan. Bidang yang tidak diatur akan mewarisi nilai dari <code translate="no">milvus.storage</code>, kecuali <code translate="no">rootPath</code>, yang secara default bernilai <code translate="no">backup</code>.</li>
<li><code translate="no">transfer.mode: auto</code> memilih penyalinan di sisi penyimpanan ketika backend cocok, dan streaming melalui Milvus Backup jika tidak. Pengaturan ini mengontrol transfer objek, bukan format pencadangan.</li>
</ul>
<p>Nilai default penyimpanan yang umum ditampilkan di bawah ini. Pastikan nilai-nilai tersebut sesuai dengan deployment yang sedang berjalan sebelum menggunakannya.</p>
<table>
<thead>
<tr><th>Pengaturan</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>Bucket</td><td><code translate="no">a-bucket</code></td><td><code translate="no">milvus-bucket</code></td></tr>
<tr><td>Jalur akar</td><td><code translate="no">files</code></td><td><code translate="no">file</code></td></tr>
</tbody>
</table>
<p>Jika server Milvus menggunakan alamat yang berbeda untuk mengakses penyimpanan cadangan, atur ` <code translate="no">backup.storage.milvusAddress</code> ` dan ` <code translate="no">milvusPort</code> ` ke alamat yang dapat dijangkau oleh server. Untuk otentikasi, TLS, penyedia penyimpanan lain, dan pengaturan tambahan, lihat <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">contoh konfigurasi versi 0.6.0</a>.</p>
<p>Periksa nilai yang berlaku dan uji konektivitas:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config show</code> menyembunyikan nilai rahasia dan melaporkan asal setiap nilai. Pemeriksaan konektivitas harus melaporkan <code translate="no">Success!</code>. Selesaikan masalah koneksi atau penyimpanan sebelum membuat cadangan.</p>
<p>Untuk konfigurasi v1 yang sudah ada, lihat <a href="/docs/id/milvus_backup_upgrade.md#Migrate-the-configuration">Peningkatan Cadangan Milvus</a>. Terjemahan konfigurasi otomatis tidak menggantikan bendera CLI yang dihapus.</p>
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
    </button></h2><p>Gunakan koleksi yang sudah ada bernama <code translate="no">coll</code> dan pastikan bahwa <code translate="no">coll_bak</code> tidak ada. Catat skema, jumlah entitas, nilai skalar dan vektor representatif, serta hasil pencarian yang diketahui sebelum pencadangan. Pertahankan data contoh tanpa perubahan saat membandingkan salinan yang dipulihkan. Untuk membuat kumpulan data kecil sekali pakai sebagai gantinya, gunakan <a href="/docs/id/snapshot-backup-and-restore.md#Prepare-sample-data">Siapkan data sampel</a>.</p>
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
    </button></h2><p>Buat cadangan bernama dari ` <code translate="no">coll</code>`:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup.yaml
./milvus-backup list --config configs/backup.yaml
./milvus-backup get -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Perintah create harus melaporkan <code translate="no">create backup success</code>. <code translate="no">get</code> mengembalikan metadata cadangan; pastikan koleksi yang diharapkan ada. Mengabaikan <code translate="no">--filter</code> akan mencadangkan semua koleksi yang memenuhi syarat. Koleksi eksternal dilewati.</p>
<p><code translate="no">--filter</code> Menerima nama yang dipisahkan dengan koma: ` <code translate="no">coll</code> ` di basis data default, ` <code translate="no">db1.coll</code>`, atau ` <code translate="no">'db1.*'</code> ` untuk semua koleksi dalam basis data. Gunakan tanda kutip pada pola yang mengandung ` <code translate="no">*</code> ` untuk mencegah ekspansi shell.</p>
<h3 id="Choose-a-backup-format-or-purpose" class="common-anchor-header">Pilih format atau tujuan cadangan<button data-href="#Choose-a-backup-format-or-purpose" class="anchor-icon" translate="no">
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
    </button></h3><p>Dengan nilai default <code translate="no">--format auto</code>, Milvus 3.0 menggunakan cadangan snapshot; server Milvus 2.x yang didukung menggunakan binlog. Untuk mempertahankan perilaku binlog secara eksplisit, gunakan <code translate="no">--format binlog</code>. <a href="/docs/id/snapshot-backup-and-restore.md">Contoh snapshot</a> secara eksplisit memilih <code translate="no">--format snapshot</code>.</p>
<p>Gunakan ` <code translate="no">--for</code> ` jika tujuan tersebut sesuai dengan alur kerja Anda:</p>
<table>
<thead>
<tr><th>Tujuan</th><th>Nilai yang diterapkan oleh preset</th><th>Penggunaan yang dimaksud</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">clone</code></td><td>Mengaktifkan pencadangan RBAC; mempertahankan pilihan format dan strategi Anda</td><td>Menyalin data ke instance lain; <code translate="no">auto</code> menggunakan snapshot pada Milvus 3.0</td></tr>
<tr><td><code translate="no">archive</code></td><td>Memaksa penggunaan " <code translate="no">binlog</code> " dan mengaktifkan pencadangan RBAC</td><td>Menyimpan cadangan dalam format binlog untuk pemulihan di kemudian hari</td></tr>
<tr><td><code translate="no">secondary</code></td><td>Memaksa penggunaan <code translate="no">binlog</code>, <code translate="no">bulk_flush</code>, pencadangan RBAC, dan metadata tambahan indeks</td><td>Inisialisasi server sekunder dalam topologi replikasi yang telah dikonfigurasi</td></tr>
</tbody>
</table>
<p>Contoh:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --for clone --filter coll -n clone_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Pengaturan prasetel akan menggantikan nilai yang bertentangan untuk opsi yang diperbaikinya. Misalnya, ` <code translate="no">--for archive --format snapshot</code> ` menghasilkan cadangan binlog. Mencadangkan metadata RBAC tidak secara otomatis memulihkannya; gunakan opsi ` <code translate="no">--rbac</code> ` pada perintah `restore` jika diperlukan.</p>
<p><code translate="no">secondary</code> bukanlah jalan pintas untuk pemulihan antar-instans biasa. Proses ini juga memerlukan akses ke etcd sumber untuk metadata indeks, ID dan saluran kluster replikasi yang benar, serta target sekunder yang baru. Cadangan harus mempertahankan metadata lengkapnya, termasuk <code translate="no">meta/full_meta.json</code>. Konfigurasi replikasi dan pelaksanaan failover berada di luar cakupan panduan ini. Lihat <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">sumber dan referensi</a> versi <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">0.6.0</a> untuk implementasi dan persyaratan khusus versi tersebut.</p>
<h3 id="Preserve-the-complete-backup" class="common-anchor-header">Pertahankan cadangan secara utuh<button data-href="#Preserve-the-complete-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>Cadangan disimpan di bawah <code translate="no">&lt;backup.storage.bucketName&gt;/&lt;backup.storage.rootPath&gt;/&lt;backup_name&gt;</code>. Simpan setiap objek di direktori ini. Cadangan snapshot mencakup bundel yang diekspor serta metadata.</p>
<p>Jangan hanya menyalin berkas metadata atau menganggap cadangan snapshot memiliki tata letak yang sama dengan cadangan binlog.</p>
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
    </button></h2><p>Pulihkan <code translate="no">coll</code> sebagai <code translate="no">coll_bak</code> di instance yang telah dikonfigurasi:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Di CLI, ` <code translate="no">--filter</code> ` mencocokkan nama <strong>setelah</strong> ` <code translate="no">-s</code> ` atau ` <code translate="no">--rename</code> ` diterapkan. Perintah dengan ` <code translate="no">--filter coll -s _bak</code> ` tidak mencocokkan apa pun dan dapat keluar dengan sukses tanpa memulihkan koleksi.</p>
<p>Untuk memulihkan menggunakan nama asli, pilih target di mana nama koleksi tersebut tidak ada, arahkan konfigurasi ke target tersebut dan lokasi cadangan, lalu abaikan sufiks:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll -n my_backup --config configs/backup-target.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Untuk contoh lengkap pada instans yang sama, lihat <a href="/docs/id/snapshot-backup-and-restore.md">Cadangan dan Pemulihan Snapshot dalam Satu Instans</a>. Halaman kasus umum lintas-instans yang ada menggunakan konfigurasi Backup 0.5.16 dan v1; jangan menerapkan perintah tersebut secara langsung ke versi 0.6.0. Untuk konfigurasi transfer versi 0.6.0, lihat <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">panduan transfer berversi</a>.</p>
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
    </button></h2><p>Pastikan bahwa ` <code translate="no">coll_bak</code> ` ada. Jika pemulihan tidak membuat ulang indeks vektornya, buatlah indeks yang sesuai dengan skema Anda sebelum memuat koleksi tersebut. Bandingkan skema, jumlah entitas, nilai skalar dan vektor, serta hasil pencarian yang diketahui dengan baseline yang diambil sebelum pencadangan.</p>
<p>Untuk dataset sekali pakai yang berisi 256 entitas, gunakan pemeriksaan lengkap yang tercantum dalam bagian <a href="/docs/id/snapshot-backup-and-restore.md#Verify-the-result">“Verifikasi Hasil</a>”. Perintah yang berhasil dijalankan saja tidak menjamin bahwa data yang diharapkan telah dipulihkan.</p>
