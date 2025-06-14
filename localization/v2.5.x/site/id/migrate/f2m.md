---
id: f2m.md
title: Dari Faiss
related_key: "Faiss, migrate, import"
summary: Pelajari cara memigrasi data Faiss ke Milvus.
---

<h1 id="From-Faiss" class="common-anchor-header">Dari Faiss<button data-href="#From-Faiss" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini menyediakan proses langkah demi langkah yang komprehensif untuk memigrasikan data dari Faiss ke Milvus 2.x. Dengan mengikuti panduan ini, Anda akan dapat mentransfer data secara efisien, memanfaatkan fitur-fitur canggih Milvus 2.x, dan meningkatkan kinerja.</p>
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
<li>Sumber Faiss</li>
<li>Target Milvus: 2.x</li>
<li>Untuk detail instalasi, lihat Menginstal <a href="https://github.com/facebookresearch/faiss/blob/main/INSTALL.md">Faiss</a> dan <a href="https://milvus.io/docs/install_standalone-docker.md">Menginstal Milvus</a>.</li>
</ul></li>
<li><strong>Alat yang dibutuhkan</strong>:<ul>
<li>Alat<a href="https://github.com/zilliztech/milvus-migration">migrasi Milvus</a>. Untuk detail instalasi, lihat Menginstal <a href="/docs/id/v2.5.x/milvusdm_install.md">Alat Migrasi</a>.</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration" class="common-anchor-header">Mengkonfigurasi migrasi<button data-href="#Configure-the-migration" class="anchor-icon" translate="no">
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
    </button></h2><p>Simpan berkas konfigurasi migrasi contoh sebagai <code translate="no">migration.yaml</code> dan modifikasi konfigurasi berdasarkan kondisi aktual Anda. Anda bebas meletakkan berkas konfigurasi di direktori lokal mana pun.</p>
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: faiss    <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 2
<span class="hljs-built_in">source</span>: <span class="hljs-comment"># configs for the source Faiss index.</span>
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    faissFile: ./testfiles/faiss/faiss_ivf_flat.index

target: <span class="hljs-comment"># configs for the target Milvus collection.</span>
create:
collection:
name: test1w
shardsNums: 2
dim: 256
metricType: L2

mode: remote
remote:
outputDir: testfiles/output/
cloud: aws
endpoint: 0.0.0.0:9000
region: ap-southeast-1
bucket: a-bucket
ak: minioadmin
sk: minioadmin
useIAM: <span class="hljs-literal">false</span>
useSSL: <span class="hljs-literal">false</span>
checkBucket: <span class="hljs-literal">true</span>
milvus2x:
endpoint: localhost:19530
username: xxxxx
password: xxxxx

<button class="copy-code-btn"></button></code></pre>

<p>Tabel berikut ini menjelaskan parameter dalam file konfigurasi contoh. Untuk daftar lengkap konfigurasi, lihat <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_FAISS.md#migrationyaml-reference">Migrasi Milvus: Faiss ke Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>Konkurensi utas dumper.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Mode operasional pekerjaan migrasi. Diatur ke faiss saat bermigrasi dari indeks Faiss.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Ukuran buffer untuk dibaca dari Faiss dalam setiap batch. Unit: KB.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>Ukuran buffer untuk menulis ke Milvus dalam setiap batch. Unit: KB.</td></tr>
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
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>Menentukan dari mana file sumber dibaca. Nilai yang valid:<br/>- <code translate="no">local</code>: membaca file dari disk lokal.<br/>- <code translate="no">remote</code>: membaca file dari penyimpanan jarak jauh.</td></tr>
<tr><td><code translate="no">source.local.faissFile</code></td><td>Jalur direktori tempat file sumber berada. Misalnya, <code translate="no">/db/faiss.index</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.create.collection.name</code></td><td>Nama koleksi Milvus.</td></tr>
<tr><td><code translate="no">target.create.collection.shardsNums</code></td><td>Jumlah pecahan yang akan dibuat dalam koleksi. Untuk informasi lebih lanjut tentang pecahan, lihat <a href="https://milvus.io/docs/glossary.md#Shard">Terminologi</a>.</td></tr>
<tr><td><code translate="no">target.create.collection.dim</code></td><td>Dimensi bidang vektor.</td></tr>
<tr><td><code translate="no">target.create.collection.metricType</code></td><td>Jenis metrik yang digunakan untuk mengukur kemiripan antar vektor. Untuk informasi lebih lanjut, lihat <a href="https://milvus.io/docs/glossary.md#Metric-type">Terminologi</a>.</td></tr>
<tr><td><code translate="no">target.mode</code></td><td>Lokasi penyimpanan untuk file yang dibuang. Nilai yang valid:<br/>- <code translate="no">local</code>: Menyimpan file yang dibuang di disk lokal.<br/>- <code translate="no">remote</code>: Menyimpan file yang dibuang di penyimpanan objek.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Jalur direktori keluaran di ember penyimpanan cloud.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Penyedia layanan penyimpanan cloud. Nilai contoh: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.endpoint</code></td><td>Titik akhir penyimpanan Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Wilayah penyimpanan cloud. Dapat berupa nilai apa pun jika Anda menggunakan MinIO lokal.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Nama bucket untuk menyimpan data. Nilainya harus sama dengan konfigurasi pada Milvus 2.x. Untuk informasi lebih lanjut, lihat <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Konfigurasi Sistem</a>.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Kunci akses untuk penyimpanan Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Kunci rahasia untuk penyimpanan Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Apakah akan menggunakan Peran IAM untuk koneksi.</td></tr>
<tr><td><code translate="no">target.remote.useSSL</code></td><td>Apakah akan mengaktifkan SSL saat menyambung ke Milvus 2.x. Untuk informasi lebih lanjut, lihat <a href="https://milvus.io/docs/tls.md#Encryption-in-Transit">Enkripsi saat Transit</a>.</td></tr>
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
<p>Perintah di atas mengubah data indeks Faiss menjadi file NumPy, dan kemudian menggunakan operasi <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a> untuk menulis data ke bucket target.</p></li>
<li><p>Setelah berkas NumPy dihasilkan, impor berkas-berkas ini ke dalam Milvus 2.x dengan perintah berikut. Ganti <code translate="no">{YourConfigFilePath}</code> dengan direktori lokal di mana berkas konfigurasi <code translate="no">migration.yaml</code> berada.</p>
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
