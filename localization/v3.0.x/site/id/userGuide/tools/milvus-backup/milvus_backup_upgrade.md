---
id: milvus_backup_upgrade.md
summary: >-
  Lakukan peningkatan versi Milvus Backup dari 0.5.x ke 0.6.0, perbarui
  konfigurasi dan perintah, serta lakukan pengujian terhadap proses pencadangan
  dan pemulihan.
title: Memperbarui Milvus Backup ke versi 0.6.0
---
<h1 id="Upgrade-Milvus-Backup-to-060" class="common-anchor-header">Memperbarui Milvus Backup ke versi 0.6.0<button data-href="#Upgrade-Milvus-Backup-to-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Gunakan panduan ini saat memperbarui <strong>alat Milvus Backup</strong> dari versi 0.5.x ke 0.6.0. Panduan ini tidak memperbarui server Milvus Anda. Jika Anda tetap menggunakan versi 0.5.x, lanjutkan menggunakan panduan <a href="/docs/id/milvus_backup_cli.md">CLI</a> atau <a href="/docs/id/milvus_backup_api.md">API</a> <a href="/docs/id/milvus_backup_cli.md">versi 0.5.x</a>. Untuk instalasi baru, gunakan <a href="/docs/id/milvus_backup_0_6_cli.md">panduan versi 0.6.0</a>.</p>
<p>Konfigurasi YAML V1 masih dimuat melalui terjemahan otomatis. Namun, flag CLI yang sudah tidak digunakan lagi ditolak di versi 0.6.0, dan format pencadangan default berubah pada Milvus 3.0. Periksa kembali konfigurasi dan perintah sebelum mengganti pekerjaan terjadwal atau layanan.</p>
<h2 id="Check-the-starting-point" class="common-anchor-header">Periksa titik awal<button data-href="#Check-the-starting-point" class="anchor-icon" translate="no">
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
    </button></h2><p>Catat versi Backup Anda, versi sumber dan target Milvus, berkas konfigurasi, penggantian variabel lingkungan, lokasi cadangan, serta perintah yang digunakan oleh skrip atau layanan API. Periksa <a href="/docs/id/milvus_backup_overview.md#Compatibility-matrix">informasi kompatibilitas</a> untuk versi server tersebut.</p>
<p>Simpan biner asli, konfigurasi, dan direktori cadangan yang ada saat memvalidasi instalasi baru. Unduh 0.6.0 ke direktori terpisah menggunakan <a href="/docs/id/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">Obtain Milvus Backup</a>. Semua perintah di bawah ini dijalankan dari direktori tersebut dan memanggil biner 0.6.0. Tempatkan salinan konfigurasi v1 Anda di <code translate="no">configs/backup-v1.yaml</code>.</p>
<h2 id="Migrate-the-configuration" class="common-anchor-header">Migrasi konfigurasi<button data-href="#Migrate-the-configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Konfigurasi v1 masih dapat dimuat di 0.6.0. Milvus Backup menerjemahkannya ke v2 saat startup dan menampilkan peringatan. Untuk menyimpan konfigurasi yang telah diterjemahkan ke dalam berkas terpisah:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config migrate --config configs/backup-v1.yaml --output configs/backup-v2.yaml --strict
./milvus-backup config show --config configs/backup-v2.yaml
./milvus-backup check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">--strict</code> menolak konfigurasi yang dimigrasi namun tidak valid. Tanpa <code translate="no">--output</code>, perintah ini akan menulis YAML v2 ke output standar. Periksa dan gunakan berkas baru tersebut hanya setelah memastikan pengaturan yang telah disesuaikan.</p>
<table>
<thead>
<tr><th>pengaturan v1</th><th>Pengaturan v2</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.address</code>, <code translate="no">milvus.port</code></td><td><code translate="no">milvus.grpc.address</code>, <code translate="no">milvus.grpc.port</code></td></tr>
<tr><td>Penyimpanan sumber di bawah <code translate="no">minio.*</code></td><td><code translate="no">milvus.storage.*</code></td></tr>
<tr><td>Penyimpanan cadangan di bawah <code translate="no">minio.backup*</code></td><td><code translate="no">backup.storage.*</code></td></tr>
<tr><td>Kredensial penyimpanan</td><td><code translate="no">milvus.storage.auth.*</code> / <code translate="no">backup.storage.auth.*</code>, dengan secara eksplisit <code translate="no">auth.type</code></td></tr>
<tr><td><code translate="no">minio.crossStorage</code></td><td><code translate="no">transfer.mode</code></td></tr>
<tr><td><code translate="no">backup.gcPause.address</code></td><td><code translate="no">milvus.management.endpoint</code></td></tr>
</tbody>
</table>
<p>Periksa variabel lingkungan dalam perubahan yang sama dengan berkas konfigurasi. V2 hanya menerima variabel lingkungan terkait kredensial yang didukung, seperti <code translate="no">MILVUS_STORAGE_AUTH_SECRET_ACCESS_KEY</code>. Nama-nama v1 lama tidak diterapkan ke berkas v2. Untuk pengaturan non-kredensial seperti nama bucket dan titik akhir, gunakan YAML atau penggantian kunci konfigurasi:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup-v2.yaml --set milvus.storage.bucketName=my-bucket
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config migrate</code> melaporkan variabel lingkungan yang terpengaruh tanpa menyalin nilai rahasianya ke dalam berkas keluaran. Lihat <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/env_variables.md">variabel lingkungan v2 yang didukung</a>. Perintah ` <code translate="no">config show</code> ` menggantikan perintah ` <code translate="no">check config</code> ` yang sudah tidak direkomendasikan.</p>
<h2 id="Update-CLI-commands" class="common-anchor-header">Perbarui perintah CLI<button data-href="#Update-CLI-commands" class="anchor-icon" translate="no">
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
    </button></h2><p>Bendera yang sudah tidak digunakan lagi di versi 0.5 akan ditolak di versi 0.6.0. Perbarui skrip sebelum meningkatkan biner.</p>
<table>
<thead>
<tr><th>Perintah</th><th>Opsi yang dihapus</th><th>Pengganti</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">create</code></td><td><code translate="no">--colls</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--force</code> / <code translate="no">-f</code></td><td><code translate="no">--strategy skip_flush</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--meta_only</code></td><td><code translate="no">--strategy meta_only</code></td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--collections</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code>, menggunakan nama target</td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--restore_index</code></td><td><code translate="no">--rebuild_index</code></td></tr>
<tr><td><code translate="no">get</code></td><td><code translate="no">--detail</code> / <code translate="no">-d</code></td><td>Hapus tanda; <code translate="no">get</code> mengembalikan informasi cadangan</td></tr>
<tr><td><code translate="no">list</code></td><td><code translate="no">--collection</code> / <code translate="no">-c</code></td><td>Tidak ada filter koleksi yang setara</td></tr>
</tbody>
</table>
<p>Misalnya, perintah-perintah 0.5.16 berikut ini memilih nama sumber <code translate="no">coll</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>Penggantinya pada versi 0.6.0 menggunakan nama target untuk pemulihan:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Filter pemulihan yang tidak cocok dengan apa pun dapat berakhir dengan sukses tanpa membuat koleksi. Selalu periksa koleksi tujuan dan datanya. <code translate="no">collection_names</code> pada API HTTP masih memilih nama sumber dalam cadangan; lihat <a href="/docs/id/milvus_backup_0_6_api.md#Restore-data">panduan API 0.6.0</a>.</p>
<h2 id="Choose-the-backup-behavior" class="common-anchor-header">Pilih perilaku pencadangan<button data-href="#Choose-the-backup-behavior" class="anchor-icon" translate="no">
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
<li>Pada server Milvus 2.x yang didukung, format ` <code translate="no">auto</code> ` menggunakan `binlog`. Peningkatan versi pencadangan tidak memerlukan migrasi ke Milvus 3.0.</li>
<li>Pada Milvus 3.0, <code translate="no">auto</code> memilih snapshot. Dukungan resmi untuk pencadangan dan pemulihan dimulai pada Milvus 3.0.1. Berikan argumen ` <code translate="no">--format binlog</code> ` untuk mempertahankan perilaku binlog saat membuat cadangan.</li>
<li>Kompatibilitas konfigurasi V1 tidak mempertahankan bendera perintah yang dihapus atau menggantikan pengaturan default format baru.</li>
<li>Preset tujuan dapat menentukan format dan opsi lainnya. Misalnya, ` <code translate="no">--for archive</code> ` memaksa penggunaan binlog meskipun ` <code translate="no">--format snapshot</code> ` juga disertakan. Periksa <a href="/docs/id/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">pilihan format dan tujuan</a>.</li>
<li>Koleksi eksternal dilewati selama pencadangan. Periksa metadata pencadangan daripada menganggap keberhasilan tugas sebagai bukti bahwa setiap koleksi telah disertakan.</li>
</ul>
<h2 id="Validate-before-switching-jobs" class="common-anchor-header">Lakukan validasi sebelum mengganti pekerjaan<button data-href="#Validate-before-switching-jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh berikut mempertahankan format binlog dan memulihkan ke koleksi baru. Ganti ` <code translate="no">coll</code> ` dengan koleksi yang skema, jumlah, nilai skalar dan vektor, serta hasil pencariannya telah Anda catat. Gunakan nama cadangan baru dan pastikan nama tujuan ` <code translate="no">coll_upgrade_check</code> ` tidak ada.</p>
<pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-v2.yaml
./milvus-backup create --filter coll --format binlog -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup get -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_upgrade_check -n upgrade_check -s _upgrade_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Pastikan cadangan tersebut mencantumkan <code translate="no">coll</code> dan bahwa <code translate="no">coll_upgrade_check</code> sudah ada setelah pemulihan. Buat indeks vektornya jika diperlukan, muat data tersebut, dan bandingkan data yang dipulihkan serta hasil pencarian dengan baseline yang telah dicatat. Jaga agar data sumber tetap tidak berubah selama pengujian ini.</p>
<p>Uji juga cadangan yang sudah ada dan representatif sebelum mengandalkannya dengan alat baru ini. Untuk cadangan versi 0.5.16 bernama <code translate="no">legacy_backup</code> yang berisi <code translate="no">coll</code>, gunakan nama target terpisah:</p>
<pre><code translate="no" class="language-shell">./milvus-backup get -n legacy_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_legacy_check -n legacy_backup -s _legacy_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Jalur peningkatan ini telah divalidasi dengan <strong>Milvus 2.6.11</strong>, Cadangan <strong>0.5.16 → 0.6.0</strong>, dan cadangan binlog di MinIO. Baik cadangan yang baru dibuat maupun yang sudah ada dipulihkan dengan nilai entitas dan hasil pencarian vektor yang sesuai. Hal ini tidak menjamin kompatibilitas untuk setiap cadangan historis atau untuk pemulihan dari Milvus 2.x ke 3.0. Hal ini juga tidak menjamin bahwa versi 0.5.x dapat membaca cadangan yang dibuat oleh versi 0.6.0.</p>
<p>Setelah validasi berhasil, perbarui tugas-tugas untuk menggunakan biner baru, konfigurasi yang telah diperiksa, pengaturan lingkungan, dan bendera penggantian secara bersamaan. Untuk penerapan API, jalankan layanan baru dengan konfigurasi yang telah diperiksa dan verifikasi penyelesaian tugas melalui <a href="/docs/id/milvus_backup_0_6_api.md">API HTTP 0.6.0</a>. Untuk mengadopsi snapshot pada Milvus 3.0.1 atau versi yang lebih baru, ikuti panduan " <a href="/docs/id/snapshot-backup-and-restore.md">Snapshot Backup and Restore in One Instance</a>".</p>
