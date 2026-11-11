---
id: milvus_backup_overview.md
summary: >-
  Milvus Backup menyediakan alur kerja berbasis CLI dan API HTTP untuk membuat
  cadangan dan memulihkan data Milvus.
title: Milvus Backup
---
<h1 id="Milvus-Backup" class="common-anchor-header">Milvus Backup<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup melakukan pencadangan koleksi Milvus dan memulihkannya di instance yang sama atau instance lain. Milvus Backup menyediakan antarmuka baris perintah (CLI) dan API HTTP.</p>
<p>Milvus Backup <strong>0.6.0</strong> menambahkan fitur pencadangan snapshot untuk Milvus 3.0, skema konfigurasi v2 yang berversi, serta preset tujuan untuk membuat cadangan. Dukungan resmi untuk pencadangan dan pemulihan pada Milvus 3.0 dimulai pada <strong>Milvus 3.0.1</strong>.</p>
<h2 id="Choose-your-guide" class="common-anchor-header">Pilih panduan Anda<button data-href="#Choose-your-guide" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Backup memiliki versi rilisnya sendiri, terpisah dari versi server Milvus. Panduan saat ini mencakup seri 0.6.x; bagian Backup 0.5.x mempertahankan alur kerja sebelumnya. Label judul halaman mengidentifikasi seri Backup yang berlaku. Petunjuk instalasi dan contoh menggunakan rilis tervalidasi tertentu. Periksa kompatibilitas server Milvus sumber dan target secara terpisah.</p>
<table>
<thead>
<tr><th>Tugas Anda</th><th>Panduan</th></tr>
</thead>
<tbody>
<tr><td>Lanjutkan menggunakan Backup 0.5.x</td><td><a href="/docs/id/milvus_backup_cli.md">Perintah 0.5.x</a> dan <a href="/docs/id/milvus_backup_api.md">API HTTP</a>, dengan contoh yang disesuaikan dengan versi 0.5.16</td></tr>
<tr><td>Meningkatkan instalasi Backup yang sudah ada</td><td><a href="/docs/id/milvus_backup_upgrade.md">Memperbarui dari versi 0.5.x ke 0.6.x</a></td></tr>
<tr><td>Instal dan gunakan Backup 0.6.x</td><td><a href="/docs/id/milvus_backup_0_6_cli.md">perintah dan konfigurasi</a>, atau <a href="/docs/id/milvus_backup_0_6_api.md">API HTTP</a></td></tr>
<tr><td>Mencadangkan dan memulihkan snapshot di Milvus 3.0.1 atau yang lebih baru</td><td><a href="/docs/id/snapshot-backup-and-restore.md">Pencadangan dan Pemulihan Snapshot dalam Satu Instans</a></td></tr>
</tbody>
</table>
<p>Panduan yang sudah ada <a href="/docs/id/single-instance-backup-and-restore.md">mengenai instans yang sama</a>, <a href="/docs/id/shared-bucket-backup-and-restore.md">bucket bersama</a>, <a href="/docs/id/cross-bucket-backup-and-restore.md">lintas bucket</a>, dan <a href="/docs/id/multi-storage-backup-and-restore.md">lintas penyimpanan</a> tetap menggunakan konfigurasi dan perintah versi 0.5.16. Contoh-contoh dalam panduan tersebut tidak akan beralih ke versi baru saat rilis Backup terbaru diterbitkan.</p>
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
    </button></h2><ul>
<li>Gunakan biner Backup dan contoh konfigurasi dari rilis yang sama. <a href="/docs/id/milvus_backup_cli.md#Obtain-Milvus-Backup">Panduan 0.5.x</a> mengacu pada versi 0.5.16; <a href="/docs/id/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">panduan saat ini</a> mengacu pada versi 0.6.0.</li>
<li>Sediakan akses jaringan ke Milvus, penyimpanannya, dan tujuan pencadangan. Operasi snapshot juga mengharuskan server Milvus dapat menjangkau penyimpanan cadangan.</li>
<li>Periksa kompatibilitas server di bawah ini. Go hanya diperlukan saat membangun dari sumber: versi 1.25 atau yang lebih baru untuk Backup 0.5.16, dan versi 1.26 atau yang lebih baru untuk 0.6.0.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">Arsitektur<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_backup_architecture.png" alt="Milvus Backup components" class="doc-image" id="milvus-backup-components" /> 
   <span>Komponen Milvus Backup</span>
  
 </span></p>
<p>Milvus Backup mengoordinasikan metadata koleksi dan pencadangan data antara instance Milvus dan penyimpanan cadangan. Di Backup 0.6.0, format yang dipilih menentukan bagaimana data koleksi diekspor dan dipulihkan:</p>
<table>
<thead>
<tr><th>Format</th><th>Perilaku pencadangan dan pemulihan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">snapshot</code></td><td>Milvus mengekspor bundel snapshot koleksi. Milvus Backup mencatat informasi bundel tersebut, dan proses pemulihan mengimpor bundel tersebut melalui Milvus. Server mengelola tata letak data yang dihasilkan.</td></tr>
<tr><td><code translate="no">binlog</code></td><td>Milvus Backup menyalin berkas data koleksi dan metadata, kemudian membuat ulang koleksi dan mengimpor data cadangan selama proses pemulihan.</td></tr>
<tr><td><code translate="no">auto</code></td><td>Pilih format sesuai dengan fitur yang didukung oleh server. Pada Milvus 3.0, pilih snapshot.</td></tr>
</tbody>
</table>
<p>Direktori cadangan berisi metadata dan berkas yang diperlukan oleh formatnya. Pertahankan direktori secara utuh saat mengarsipkan atau memindahkannya. Jangan berasumsi bahwa cadangan snapshot menggunakan tata letak direktori binlog.</p>
<p>Pada versi 0.6.0, preset " <code translate="no">create --for</code> " mengonfigurasi opsi khusus tujuan: " <code translate="no">clone</code> " mempertahankan format yang dipilih, sedangkan " <code translate="no">archive</code> " dan " <code translate="no">secondary</code> " memerlukan binlog. Sebuah server sekunder juga memerlukan topologi replikasi yang dikonfigurasi; migrasi biasa antar instans tidak memerlukan server sekunder. Lihat <a href="/docs/id/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">"Pilih Format atau Tujuan Cadangan"</a>.</p>
<p>Backup 0.6.0 melewatkan koleksi eksternal selama proses pencadangan. Tugas yang berhasil tidak berarti bahwa data koleksi eksternal telah disertakan.</p>
<h2 id="Compatibility-matrix" class="common-anchor-header">Matriks kompatibilitas<button data-href="#Compatibility-matrix" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Backup 0.6.0 tidak mengharuskan setiap instalasi Milvus ditingkatkan ke versi 3.0.</strong> Backup 0.6.0 mendukung alur kerja binlog pada versi Milvus 2.x yang didukung. Dukungan resmi untuk pencadangan dan pemulihan pada lini Milvus 3.0 dimulai dengan <strong>Milvus 3.0.1</strong>; contoh snapshot menggunakan lini tersebut.</p>
<p><a href="/docs/id/milvus_backup_upgrade.md">Panduan peningkatan</a> versi telah diverifikasi dengan Backup 0.5.16 dan 0.6.0 pada Milvus 2.6.11, termasuk pemulihan cadangan 0.5.16 menggunakan 0.6.0. Kombinasi yang telah diuji ini tidak memperluas matriks di bawah ini.</p>
<p>Versi Milvus sumber dan tujuan harus membentuk pasangan yang didukung. Versi tujuan yang lebih baru saja tidak menjamin kompatibilitas. Matriks versi lama berikut mencakup Milvus 2.x, sebagaimana didokumentasikan sejak Milvus Backup 0.5.7; matriks ini tidak menjamin kompatibilitas migrasi dari 2.x ke 3.0.</p>
<table>
<thead>
<tr><th>Cadangan Dari ↓ / Pemulihan Ke →</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th><th>Milvus v2.6.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus v2.2.x</td><td>Tidak</td><td>Tidak</td><td>Ya</td><td>Ya</td><td>Ya</td></tr>
<tr><td>Milvus v2.3.x</td><td>Tidak</td><td>Tidak</td><td>Ya</td><td>Ya</td><td>Ya</td></tr>
<tr><td>Milvus v2.4.x</td><td>Tidak</td><td>Tidak</td><td>Ya</td><td>Ya</td><td>Ya</td></tr>
<tr><td>Milvus v2.5.x</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Ya</td><td>Ya</td></tr>
<tr><td>Milvus v2.6.x</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Ya</td></tr>
</tbody>
</table>
<p>Sebelum melakukan migrasi antar-versi, verifikasi versi sumber, versi tujuan, dan format cadangan berdasarkan <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">dokumentasi rilis Backup</a>. Panduan ini tidak memperluas matriks versi lama ke kombinasi yang tidak tercantum.</p>
<h2 id="Release-notes" class="common-anchor-header">Catatan rilis<button data-href="#Release-notes" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0</a></li>
</ul>
