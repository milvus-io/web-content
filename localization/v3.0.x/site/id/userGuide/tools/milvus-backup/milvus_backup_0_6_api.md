---
id: milvus_backup_0_6_api.md
summary: >-
  Buat dan pantau tugas pencadangan dan pemulihan Milvus Backup 0.6.0 melalui
  API HTTP.
title: Gunakan API HTTP Milvus Backup 0.6.0
---
<h1 id="Use-the-Milvus-Backup-060-HTTP-API" class="common-anchor-header">Gunakan API HTTP Milvus Backup 0.6.0<button data-href="#Use-the-Milvus-Backup-060-HTTP-API" class="anchor-icon" translate="no">
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
    </button></h1><p>Gunakan API HTTP Milvus Backup untuk membuat cadangan, memulihkan koleksi, dan memantau tugas asinkron. Contoh snapshot di bawah ini menggunakan <strong>Milvus Backup 0.6.0</strong> dengan <strong>Milvus 3.0.1 atau versi yang lebih baru</strong>. Untuk Milvus Backup 0.5.x, gunakan <a href="/docs/id/milvus_backup_api.md">panduan API 0.5.x</a>. Untuk instalasi yang sudah ada, lihat <a href="/docs/id/milvus_backup_upgrade.md">Memperbarui Milvus Backup</a>.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Peroleh Milvus Backup<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>Unduh dan ekstrak biner yang sesuai dari <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">rilis v0.6.0</a>. Untuk membangun dari sumber, ikuti <a href="/docs/id/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">Dapatkan Milvus Backup</a>; proses pembangunan memerlukan Go 1.26 atau yang lebih baru.</p>
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
    </button></h2><p>Buat <a href="/docs/id/milvus_backup_0_6_cli.md#Prepare-configuration-file">berk</a> <code translate="no">configs/backup.yaml</code> menggunakan contoh v2 di bagian <a href="/docs/id/milvus_backup_0_6_cli.md#Prepare-configuration-file">"Siapkan berkas konfigurasi</a>". Konfigurasikan akses ke Milvus, penyimpanan instance, dan tujuan cadangan. Server Milvus juga harus dapat mengakses penyimpanan cadangan untuk operasi snapshot.</p>
<p>Jika Anda memiliki berkas v1, berkas tersebut masih dapat dimuat. Lihat " <a href="/docs/id/milvus_backup_upgrade.md#Migrate-the-configuration">Migrasi Konfigurasi</a> " sebelum mengubah skema atau variabel lingkungannya.</p>
<p>Dari direktori yang berisi file biner, periksa konfigurasi dan uji konektivitas:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Lanjutkan ketika pemeriksaan konektivitas melaporkan " <code translate="no">Success!</code>".</p>
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
    </button></h2><p>Jalankan layanan dengan konfigurasi yang telah Anda periksa:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Port defaultnya adalah 8080. Untuk memilih port lain, gunakan ` <code translate="no">-p</code>`:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 18080 --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Jalankan hanya salah satu perintah ini untuk layanan tertentu. Contoh di bawah ini menggunakan port 8080; ubah URL-nya jika Anda memilih port lain. Swagger UI tersedia di <code translate="no">http://localhost:8080/api/v1/docs/index.html</code>.</p>
<p>Biarkan layanan tetap berjalan saat melakukan polling tugas. ID tugas dan kemajuan real-time merupakan bagian dari proses layanan; cadangan yang disimpan tetap berada di penyimpanan objek setelah proses berhenti.</p>
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
    </button></h2><p>Gunakan koleksi yang sudah ada bernama <code translate="no">coll</code>, atau buat koleksi uji coba berisi 256 entitas dari <a href="/docs/id/snapshot-backup-and-restore.md#Prepare-sample-data">Siapkan data sampel</a>. Ubah nama koleksi dalam permintaan jika Anda menggunakan data Anda sendiri. Pertahankan data uji coba tetap sama saat memverifikasi hasil.</p>
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
    </button></h2><p>Kirim permintaan cadangan asinkron:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;]
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Responsnya mencakup <code translate="no">requestId</code>. Pengiriman tidak berarti bahwa pencadangan telah selesai. Salin nilai tersebut ke <code translate="no">backup_id</code> dan lakukan polling:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_backup?backup_id=BACKUP_REQUEST_ID&amp;backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Tunggu hingga <code translate="no">data.state_code</code> berubah menjadi <code translate="no">2</code>. API ini menggunakan status tugas berikut:</p>
<table>
<thead>
<tr><th><code translate="no">state_code</code></th><th>Arti</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">0</code></td><td>Awal</td></tr>
<tr><td><code translate="no">1</code></td><td>Sedang dieksekusi</td></tr>
<tr><td><code translate="no">2</code></td><td>Berhasil</td></tr>
<tr><td><code translate="no">3</code></td><td>Gagal</td></tr>
<tr><td><code translate="no">4</code></td><td>Waktu habis</td></tr>
</tbody>
</table>
<p>Periksa baik respons maupun status tugas. Kode HTTP 200 saja tidak cukup: nilai respons ` <code translate="no">code</code> ` yang tidak nol menandakan adanya kesalahan. Respons yang berhasil dapat mengabaikan ` <code translate="no">code</code> ` karena nilainya nol. Jika suatu tugas gagal atau habis waktu, periksa detail respons dan log server sebelum memulihkan dari cadangan tersebut.</p>
<p>Tampilkan daftar cadangan yang tersimpan dan periksa cadangan yang telah selesai berdasarkan namanya:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/list&#x27;
curl &#x27;http://localhost:8080/api/v1/get_backup?backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">get_backup</code> mengembalikan metadata JSON, termasuk <code translate="no">collection_backups</code>; perintah ini <strong>tidak</strong> mengunduh berkas cadangan. Untuk cadangan yang dibuat oleh proses lain, kueri berdasarkan nama saja dapat mengembalikan metadata tanpa menunjukkan kemajuan tugas yang sedang berjalan. Gunakan ID tugas dari respons create layanan saat ini saat memantau cadangan yang aktif.</p>
<p>Format default adalah ` <code translate="no">auto</code>`, yang memilih snapshot pada Milvus 3.0. Untuk secara eksplisit meminta `binlog`, tambahkan ` <code translate="no">&quot;format&quot;: &quot;binlog&quot;</code> ` ke badan permintaan `create`. Preset ` <code translate="no">--for</code> ` pada CLI bukanlah bidang permintaan HTTP.</p>
<p>Untuk menyimpan atau memindahkan cadangan, salin seluruh direktori ke penyimpanan objek. Lihat <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">panduan transfer versi 0.6.0</a>.</p>
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
    </button></h2><p>Pastikan bahwa <code translate="no">coll_bak</code> belum ada. Kirim permintaan pemulihan dengan sufiks:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;_bak&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Bidang HTTP ` <code translate="no">collection_names</code> ` memilih nama <strong>dalam cadangan</strong>, sebelum sufiks diterapkan. Permintaan ini memilih ` <code translate="no">coll</code> ` dan membuat ` <code translate="no">coll_bak</code>`. Opsi ` <code translate="no">--filter</code> ` pada CLI justru mencocokkan nama tujuan setelah penggantian nama; jangan ganti ` <code translate="no">coll_bak</code> ` ke dalam bidang HTTP ini.</p>
<p>Salin <code translate="no">data.id</code> dari respons pemulihan dan periksa status tugas:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_restore?id=RESTORE_TASK_ID&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Tunggu hingga <code translate="no">data.state_code: 2</code> dan periksa <code translate="no">collection_restore_tasks</code> untuk melihat kumpulan target yang diharapkan. Tugas yang telah dikirimkan belum berarti pemulihan telah diverifikasi.</p>
<h3 id="Restore-with-the-original-name" class="common-anchor-header">Pemulihan dengan nama asli<button data-href="#Restore-with-the-original-name" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan instance target di mana <code translate="no">coll</code> tidak ada. Mulai layanan API cadangan terpisah yang dikonfigurasi untuk target tersebut dan lokasi cadangan yang telah selesai, lalu kirim permintaan ini ke layanan target:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Periksa <code translate="no">get_restore</code> pada layanan yang sama menggunakan ID tugas yang dikembalikan. Konfigurasikan <code translate="no">milvus.*</code> untuk target pemulihan dan <code translate="no">backup.storage</code> untuk cadangan yang ada. Lihat <a href="/docs/id/milvus_backup_0_6_cli.md#Prepare-configuration-file">Siapkan berkas konfigurasi</a>.</p>
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
    </button></h2><p>Setelah tugas pemulihan berhasil, sambungkan ke instance Milvus tujuan dan verifikasi bahwa koleksi dan data yang diharapkan ada. Untuk koleksi uji 256 entitas, gunakan pemeriksaan skalar, vektor, dan pencarian lengkap di <a href="/docs/id/snapshot-backup-and-restore.md#Verify-the-result">"Verifikasi hasil"</a>.</p>
<p>Ubah <code translate="no">coll_bak</code> menjadi <code translate="no">coll</code> saat Anda memulihkan dengan nama asli. Kode verifikasi membaca data yang dipulihkan tanpa menghapusnya. Untuk data produksi, bandingkan dengan baseline yang diambil pada saat pencadangan.</p>
