---
id: from-m2x.md
summary: >-
  Panduan ini menyediakan proses langkah demi langkah yang komprehensif untuk
  memigrasi data dari Milvus 2.3.x ke Milvus 2.3.x atau yang lebih tinggi.
title: Dari Milvus 2.3.x
---

<h1 id="From-Milvus-23x" class="common-anchor-header">Dari Milvus 2.3.x<button data-href="#From-Milvus-23x" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini menyediakan proses langkah demi langkah yang komprehensif untuk memigrasi data dari Milvus 2.3.x ke Milvus 2.3.x atau yang lebih tinggi.</p>
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
<li>Milvus Sumber: 2.3.0+ (Alat ini menggunakan iterator untuk mengambil data koleksi sumber, sehingga Milvus sumber harus versi 2.3.0 atau lebih tinggi).</li>
<li>Milvus target: 2.3.0+</li>
</ul></li>
<li><strong>Alat yang dibutuhkan</strong>:<ul>
<li>Alat<a href="https://github.com/zilliztech/milvus-migration">migrasi Milvus</a>. Untuk detail instalasi, lihat Menginstal <a href="/docs/id/v2.5.x/milvusdm_install.md">Alat Migrasi</a>.</li>
</ul></li>
<li><strong>Persiapan data</strong>:<ul>
<li>Pastikan bahwa koleksi Milvus sumber telah dimuat dan siap untuk ekspor data.</li>
<li>Jika Milvus target tidak berisi koleksi yang sesuai dengan koleksi sumber, alat <a href="https://github.com/zilliztech/milvus-migration">migrasi-milvus</a> akan secara otomatis membuatnya. Perhatikan bahwa setelah migrasi, koleksi target tidak akan diindeks, dan Anda harus mengindeks koleksi tersebut secara manual.</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration-file" class="common-anchor-header">Mengkonfigurasi berkas migrasi<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Simpan berkas konfigurasi migrasi contoh sebagai <code translate="no">migration.yaml</code> dan ubahlah konfigurasinya sesuai dengan kondisi Anda yang sebenarnya. Anda bebas meletakkan berkas konfigurasi di direktori lokal mana pun.</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    workMode: milvus2x
    reader:
      bufferSize: 500

meta:
mode: config
version: 2.3.0
collection: src_table_name

<span class="hljs-built_in">source</span>:
milvus2x:
endpoint: {milvus2x_domain}:{milvus2x_port}
username: xxxx
password: xxxxx

target:
milvus2x:
endpoint: {milvus2x_domain}:{milvus2x_port}
username: xxxx
password: xxxxx
<button class="copy-code-btn"></button></code></pre>

<p>Tabel berikut ini menjelaskan parameter dalam berkas konfigurasi contoh. Untuk informasi lebih lanjut, lihat <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Migrasi Milvus: Milvus2.x ke Milvus2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Mode operasional dari pekerjaan migrasi. Ditetapkan ke milvus2x saat memigrasi dari Milvus 2.x.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Ukuran buffer untuk dibaca dari Milvus 2.x dalam setiap batch.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Menentukan dari mana file meta dibaca. Diatur ke config, mengindikasikan bahwa meta config dapat diperoleh dari file migration.yaml ini.</td></tr>
<tr><td><code translate="no">meta.version</code></td><td>Sumber versi Milvus. Diatur ke 2.3.0 atau lebih tinggi.</td></tr>
<tr><td><code translate="no">meta.collection</code></td><td>Nama koleksi sumber.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.milvus2x.endpoint</code></td><td>Alamat server Milvus sumber.</td></tr>
<tr><td><code translate="no">source.milvus2x.username</code></td><td>Nama pengguna untuk server Milvus sumber. Parameter ini diperlukan jika autentikasi pengguna diaktifkan untuk server Milvus Anda. Untuk informasi lebih lanjut, lihat <a href="/docs/id/v2.5.x/authenticate.md">Mengaktifkan Autentikasi</a>.</td></tr>
<tr><td><code translate="no">source.milvus2x.password</code></td><td>Kata sandi untuk server Milvus sumber. Parameter ini diperlukan jika autentikasi pengguna diaktifkan untuk server Milvus Anda. Untuk informasi lebih lanjut, lihat <a href="/docs/id/v2.5.x/authenticate.md">Mengaktifkan Autentikasi</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Alamat server Milvus target.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Nama pengguna untuk server Milvus target. Parameter ini diperlukan jika autentikasi pengguna diaktifkan untuk server Milvus Anda. Untuk informasi lebih lanjut, lihat <a href="/docs/id/v2.5.x/authenticate.md">Mengaktifkan Autentikasi</a>.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Kata sandi untuk server Milvus target. Parameter ini diperlukan jika autentikasi pengguna diaktifkan untuk server Milvus Anda. Untuk informasi lebih lanjut, lihat <a href="/docs/id/v2.5.x/authenticate.md">Mengaktifkan Autentikasi</a>.</td></tr>
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
    </button></h2><p>Anda memiliki dua opsi untuk memulai tugas migrasi - menggunakan CLI atau membuat permintaan API. Pilih salah satu yang paling sesuai dengan kebutuhan Anda.</p>
<h3 id="Option-1-Using-CLI" class="common-anchor-header">Opsi 1: Menggunakan CLI</h3><p>Mulai tugas migrasi dengan perintah berikut. Ganti <code translate="no">{YourConfigFilePath}</code> dengan direktori lokal tempat berkas konfigurasi <code translate="no">migration.yaml</code> berada.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Pantau log untuk mengetahui pembaruan kemajuan. Log migrasi yang berhasil harus menyertakan entri seperti:</p>
<pre><code translate="no" class="language-bash">[INFO] [migration/milvus2x_starter.go:79] [<span class="hljs-string">&quot;=================&gt;JobProcess!&quot;</span>] [Percent=100]
[INFO] [migration/milvus2x_starter.go:27] [<span class="hljs-string">&quot;[Starter] migration Milvus2x to Milvus2x finish!!!&quot;</span>] [Cost=94.877717375]
[INFO] [starter/starter.go:109] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=94.878243583]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-2-Making-API-requests" class="common-anchor-header">Opsi 2: Membuat permintaan API</h3><p>Anda juga dapat menggunakan API Restful untuk menjalankan migrasi. Mulai server API dengan:</p>
<pre><code translate="no" class="language-bash">./milvus-migration server run -p 8080
<button class="copy-code-btn"></button></code></pre>
<p>Setelah server berhasil dijalankan, letakkan berkas <code translate="no">migration.yaml</code> di direktori <code translate="no">configs/</code> pada proyek dan mulai migrasi dengan menggunakan:</p>
<pre><code translate="no" class="language-bash">curl -XPOST http://localhost:8080/api/v1/start
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-result" class="common-anchor-header">Verifikasi hasilnya<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah tugas migrasi selesai, gunakan Attu untuk melihat jumlah entitas yang dimigrasi. Selain itu, Anda dapat membuat indeks dan memuat koleksi di Attu. Untuk informasi lebih lanjut, lihat <a href="https://github.com/zilliztech/attu">Attu</a> dan <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
<h2 id="Additional-configuration-options" class="common-anchor-header">Opsi konfigurasi tambahan<button data-href="#Additional-configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>Selain konfigurasi dasar yang disebutkan di atas, Anda juga dapat menambahkan pengaturan tambahan berdasarkan kebutuhan spesifik Anda.</p>
<ul>
<li><p><strong>Migrasi bidang selektif</strong>: Jika Anda hanya perlu memigrasikan bidang tertentu dalam koleksi daripada semua bidang, tentukan bidang yang akan dimigrasikan di bagian <code translate="no">meta</code> pada file <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-yaml">meta:
  fields:
    - name: <span class="hljs-built_in">id</span>
    - name: title_vector
    - name: reading_time
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Koleksi target khusus</strong>: Untuk menyesuaikan properti koleksi target, tambahkan konfigurasi terkait di bagian <code translate="no">meta</code> pada file <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">meta</span>:
  <span class="hljs-attr">milvus</span>:
    <span class="hljs-attr">collection</span>: target_collection_name
    <span class="hljs-attr">shardNum</span>: <span class="hljs-number">2</span>
    <span class="hljs-attr">closeDynamicField</span>: <span class="hljs-literal">false</span>
    <span class="hljs-attr">consistencyLevel</span>: <span class="hljs-title class_">Customized</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Untuk informasi rinci, lihat <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Migrasi Milvus: Milvus2.x ke Milvus2.x</a>.</p>
