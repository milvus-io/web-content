---
id: m2m.md
summary: >-
  Panduan ini menyediakan proses langkah demi langkah yang komprehensif untuk
  memigrasi data dari Milvus 1.x (termasuk 0.9.x dan yang lebih baru) ke Milvus
  2.x.
title: Dari Milvus 1.x
---
<h1 id="From-Milvus-1x" class="common-anchor-header">Dari Milvus 1.x<button data-href="#From-Milvus-1x" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini menyediakan proses langkah demi langkah yang komprehensif untuk memindahkan data dari Milvus 1.x (termasuk 0.9.x dan yang lebih baru) ke Milvus 2.x. Dengan mengikuti panduan ini, Anda akan dapat memindahkan data Anda secara efisien, dengan memanfaatkan fitur-fitur canggih Milvus 2.x dan meningkatkan kinerja.</p>
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
<li><strong>Versi perangkat lunak</strong>:<ul>
<li>Milvus Sumber: 0.9.x hingga 1.x</li>
<li>Target Milvus: 2.x</li>
</ul></li>
<li><strong>Alat yang dibutuhkan</strong>:<ul>
<li>Alat<a href="https://github.com/zilliztech/milvus-migration">migrasi Milvus</a>. Untuk detail instalasi, lihat Menginstal <a href="/docs/id/milvusdm_install.md">Alat Migrasi</a>.</li>
</ul></li>
</ul>
<h2 id="Export-metadata-of-the-source-Milvus-installation" class="common-anchor-header">Mengekspor metadata dari instalasi Milvus sumber<button data-href="#Export-metadata-of-the-source-Milvus-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menyiapkan data migrasi untuk Milvus 0.9.x hingga 1.x, hentikan Milvus sumber atau setidaknya hentikan operasi DML di dalamnya.</p>
<ol>
<li><p>Ekspor metadata dari instalasi Milvus sumber ke <code translate="no">meta.json</code>.</p>
<ul>
<li>Untuk instalasi yang menggunakan MySQL sebagai backend, jalankan</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -m <span class="hljs-string">&quot;user:password@tcp(adderss)/milvus?charset=utf8mb4&amp;parseTime=True&amp;loc=Local&quot;</span> -o outputDir
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Untuk instalasi yang menggunakan SQLite sebagai backend, jalankan</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -s /milvus/db/meta.sqlite -o outputDir
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Salin folder <code translate="no">tables</code> dari instalasi Milvus Anda, lalu pindahkan folder <code translate="no">meta.json</code> dan <code translate="no">tables</code> ke folder kosong.</p>
<p>Setelah langkah ini selesai, struktur folder kosong akan terlihat seperti ini:</p>
<pre><code translate="no">migration_data
├── meta.json
└── tables
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Unggah folder yang telah disiapkan pada langkah sebelumnya ke ember penyimpanan blok S3 atau langsung gunakan folder lokal ini pada bagian selanjutnya.</p></li>
</ol>
<h2 id="Configure-the-migration-file" class="common-anchor-header">Konfigurasikan file migrasi<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Simpan file konfigurasi migrasi contoh sebagai <code translate="no">migration.yaml</code> dan modifikasi konfigurasi berdasarkan kondisi aktual Anda. Anda bebas meletakkan file konfigurasi di direktori lokal mana pun.</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: milvus1x
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 16
meta:
  mode: <span class="hljs-built_in">local</span>
  localFile: /outputDir/test/meta.json
<span class="hljs-built_in">source</span>:
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    tablesDir: /db/tables/
target:
  mode: remote
  remote:
    outputDir: <span class="hljs-string">&quot;migration/test/xx&quot;</span>
    ak: xxxx
    sk: xxxx
    cloud: aws
    region: us-west-2
    bucket: xxxxx
    useIAM: <span class="hljs-literal">true</span>
    checkBucket: <span class="hljs-literal">false</span>
  milvus2x:
    endpoint: <span class="hljs-string">&quot;{yourMilvus2_xServerAddress}:{port}&quot;</span>
    username: xxxx
    password: xxxx
<button class="copy-code-btn"></button></code></pre>
<p>Tabel berikut ini menjelaskan parameter dalam berkas konfigurasi contoh. Untuk daftar lengkap konfigurasi, lihat <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#migrationyaml-reference">Migrasi Milvus: Milvus1.x ke Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>Konkurensi utas dumper.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Mode operasional pekerjaan migrasi. Diatur ke <code translate="no">milvus1x</code> saat melakukan migrasi dari Milvus 1.x.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Ukuran buffer untuk dibaca dari Milvus 1.x dalam setiap batch. Unit: KB.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>Ukuran buffer untuk menulis ke Milvus 2.x dalam setiap batch. Unit: KB.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">loader</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">loader.worker.limit</code></td><td>Konkurensi utas pemuat.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Menentukan dari mana file meta meta.json dibaca. Nilai yang valid: <code translate="no">local</code>, <code translate="no">remote</code>, <code translate="no">mysql</code>, <code translate="no">sqlite</code>.</td></tr>
<tr><td><code translate="no">meta.localFile</code></td><td>Jalur direktori lokal tempat file <code translate="no">meta.json</code> berada. Konfigurasi ini hanya digunakan jika <code translate="no">meta.mode</code> disetel ke <code translate="no">local</code>. Untuk konfigurasi meta lainnya, lihat <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#meta">README_1X</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>Menentukan dari mana file sumber dibaca. Nilai yang valid:<br/>- <code translate="no">local</code>: membaca file dari disk lokal.<br/>- <code translate="no">remote</code>: membaca file dari penyimpanan jarak jauh.</td></tr>
<tr><td><code translate="no">source.local.tablesDir</code></td><td>Jalur direktori tempat file sumber berada. Misalnya, <code translate="no">/db/tables/</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>Lokasi penyimpanan untuk file yang dibuang. Nilai yang valid:<br/>- <code translate="no">local</code>: Menyimpan file yang dibuang di disk lokal.<br/>- <code translate="no">remote</code>: Menyimpan file yang dibuang di penyimpanan objek.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Jalur direktori keluaran di ember penyimpanan cloud.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Kunci akses untuk penyimpanan Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Kunci rahasia untuk penyimpanan Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Penyedia layanan penyimpanan awan. Contoh nilai: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Wilayah penyimpanan cloud. Dapat berupa nilai apa pun jika Anda menggunakan MinIO lokal.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Nama bucket untuk menyimpan data. Nilainya harus sama dengan konfigurasi di Milvus 2.x. Untuk informasi lebih lanjut, lihat <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Konfigurasi Sistem</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Apakah akan menggunakan Peran IAM untuk koneksi.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Apakah akan memeriksa apakah bucket yang ditentukan ada dalam penyimpanan objek.</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Alamat server Milvus target.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Nama pengguna untuk server Milvus 2.x. Parameter ini diperlukan jika autentikasi pengguna diaktifkan untuk server Milvus Anda. Untuk informasi lebih lanjut, lihat <a href="https://milvus.io/docs/authenticate.md">Mengaktifkan Autentikasi</a>.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Kata sandi untuk server Milvus 2.x. Parameter ini diperlukan jika autentikasi pengguna diaktifkan untuk server Milvus Anda. Untuk informasi lebih lanjut, lihat <a href="https://milvus.io/docs/authenticate.md">Mengaktifkan Autentikasi</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">Memulai tugas migrasi<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Mulai tugas migrasi dengan perintah berikut. Ganti <code translate="no">{YourConfigFilePath}</code> dengan direktori lokal tempat berkas konfigurasi <code translate="no">migration.yaml</code> berada.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  dump  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Perintah di atas akan mengubah data sumber pada Milvus 1.x menjadi berkas NumPy, dan kemudian menggunakan operasi <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a> untuk menulis data ke bucket target.</p></li>
<li><p>Setelah file NumPy dihasilkan, impor file-file ini ke dalam Milvus 2.x dengan perintah berikut. Ganti <code translate="no">{YourConfigFilePath}</code> dengan direktori lokal di mana berkas konfigurasi <code translate="no">migration.yaml</code> berada.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  load  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Verify-the-result" class="common-anchor-header">Verifikasi hasil<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah tugas migrasi dijalankan, Anda dapat melakukan panggilan API atau menggunakan Attu untuk melihat jumlah entitas yang dimigrasi. Untuk informasi lebih lanjut, lihat <a href="https://github.com/zilliztech/attu">Attu</a> dan <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
