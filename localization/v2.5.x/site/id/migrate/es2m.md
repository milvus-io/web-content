---
id: es2m.md
summary: >-
  Panduan ini menyediakan proses langkah demi langkah yang komprehensif untuk
  memigrasikan data dari Elasticsearch ke Milvus 2.x.
title: Dari Elasticsearch
---

<h1 id="From-Elasticsearch" class="common-anchor-header">Dari Elasticsearch<button data-href="#From-Elasticsearch" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini menyediakan proses langkah demi langkah yang komprehensif untuk memigrasikan data dari Elasticsearch ke Milvus 2.x. Dengan mengikuti panduan ini, Anda akan dapat mentransfer data secara efisien, memanfaatkan fitur-fitur canggih Milvus 2.x, dan meningkatkan kinerja.</p>
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
<li>Sumber Elasticsearch: 7.x atau 8.x</li>
<li>Target Milvus: 2.x</li>
<li>Untuk detail instalasi, lihat Menginstalasi <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html">Elasticsearch</a> dan Menginstalasi <a href="https://milvus.io/docs/install_standalone-docker.md">Milvus</a>.</li>
</ul></li>
<li><strong>Alat yang dibutuhkan</strong>:<ul>
<li>Alat<a href="https://github.com/zilliztech/milvus-migration">migrasi Milvus</a>. Untuk detail instalasi, lihat Menginstal <a href="/docs/id/v2.5.x/milvusdm_install.md">Alat Migrasi</a>.</li>
</ul></li>
<li><strong>Tipe data yang didukung untuk migrasi</strong>: Bidang-bidang yang akan dimigrasikan dari sumber indeks Elasticsearch adalah dari jenis berikut - <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">kata kunci</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">teks</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">objek</a>. Tipe data yang tidak tercantum di sini saat ini tidak didukung untuk migrasi. Lihat <a href="#field-mapping-reference">Referensi pemetaan bidang</a> untuk informasi rinci mengenai pemetaan data antara koleksi Milvus dan indeks Elasticsearch.</li>
<li><strong>Persyaratan indeks Elasticsearch</strong>:<ul>
<li>Indeks Elasticsearch sumber harus berisi ruas vektor dengan tipe <code translate="no">dense_vector</code>. Migrasi tidak dapat dimulai tanpa bidang vektor.</li>
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
    </button></h2><p>Simpan berkas konfigurasi migrasi contoh sebagai <code translate="no">migration.yaml</code> dan modifikasi konfigurasi berdasarkan kondisi Anda yang sebenarnya. Anda bebas meletakkan berkas konfigurasi di direktori lokal mana pun.</p>
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    workMode: <span class="hljs-string">&quot;elasticsearch&quot;</span> <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: <span class="hljs-number">2500</span> <span class="hljs-comment"># buffer size to read from Elasticsearch in each batch. A value ranging from 2000 to 4000 is recommended.</span>
meta: <span class="hljs-comment"># meta configs for the source Elasticsearch index and target Milvus 2.x collection.</span>
  mode: <span class="hljs-string">&quot;config&quot;</span> <span class="hljs-comment"># specifies the source for meta configs. currently, onlly `config` is supported.</span>
  version: <span class="hljs-string">&quot;8.9.1&quot;</span>
  index: <span class="hljs-string">&quot;qatest_index&quot;</span> <span class="hljs-comment"># identifies the Elasticsearch index to migrate data from.</span>
  fields: <span class="hljs-comment"># fields within the Elasticsearch index to be migrated.</span>
  - name: <span class="hljs-string">&quot;my_vector&quot;</span> <span class="hljs-comment"># name of the Elasticsearch field.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;dense_vector&quot;</span> <span class="hljs-comment"># data type of the Elasticsearch field.</span>
    dims: <span class="hljs-number">128</span> <span class="hljs-comment"># dimension of the vector field. required only when `type` is `dense_vector`.</span>
  - name: <span class="hljs-string">&quot;id&quot;</span>
    pk: true <span class="hljs-comment"># specifies if the field serves as a primary key.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;long&quot;</span>
  - name: <span class="hljs-string">&quot;num&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;integer&quot;</span>
  - name: <span class="hljs-string">&quot;double1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;double&quot;</span>
  - name: <span class="hljs-string">&quot;text1&quot;</span>
    maxLen: <span class="hljs-number">1000</span> <span class="hljs-comment"># max. length of data fields. required only for `keyword` and `text` data types.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;text&quot;</span>
  - name: <span class="hljs-string">&quot;bl1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;boolean&quot;</span>
  - name: <span class="hljs-string">&quot;float1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;float&quot;</span>
  milvus: <span class="hljs-comment"># configs specific to creating the collection in Milvus 2.x</span>
    collection: <span class="hljs-string">&quot;Collection_01&quot;</span> <span class="hljs-comment"># name of the Milvus collection. defaults to the Elasticsearch index name if not specified.</span>
    closeDynamicField: false <span class="hljs-comment"># specifies whether to disable the dynamic field in the collection. defaults to `false`.</span>
    shardNum: <span class="hljs-number">2</span> <span class="hljs-comment"># number of shards to be created in the collection.</span>
    consistencyLevel: Strong <span class="hljs-comment"># consistency level for Milvus collection.</span>
source: <span class="hljs-comment"># connection configs for the source Elasticsearch server</span>
  es:
    urls:
    - <span class="hljs-string">&quot;http://10.15.1.***:9200&quot;</span> <span class="hljs-comment"># address of the source Elasticsearch server.</span>
    username: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># username for the Elasticsearch server.</span>
    password: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># password for the Elasticsearch server.</span>
target:
  mode: <span class="hljs-string">&quot;remote&quot;</span> <span class="hljs-comment"># storage location for dumped files. valid values: `remote` and `local`.</span>
  remote: <span class="hljs-comment"># configs for remote storage</span>
    outputDir: <span class="hljs-string">&quot;migration/milvus/test&quot;</span> <span class="hljs-comment"># output directory path in the cloud storage bucket.</span>
    cloud: <span class="hljs-string">&quot;aws&quot;</span> <span class="hljs-comment"># cloud storage service provider. Examples: `aws`, `gcp`, `azure`, etc.</span>
    region: <span class="hljs-string">&quot;us-west-2&quot;</span> <span class="hljs-comment"># region of the cloud storage; can be any value if using local Minio.</span>
    bucket: <span class="hljs-string">&quot;zilliz-aws-us-****-*-********&quot;</span> <span class="hljs-comment"># bucket name for storing data; must align with configs in milvus.yaml for Milvus 2.x.</span>
    useIAM: true <span class="hljs-comment"># whether to use an IAM Role for connection.</span>
    checkBucket: false <span class="hljs-comment"># checks if the specified bucket exists in the storage.</span>
  milvus2x: <span class="hljs-comment"># connection configs for the target Milvus 2.x server</span>
    endpoint: <span class="hljs-string">&quot;http://10.102.*.**:19530&quot;</span> <span class="hljs-comment"># address of the target Milvus server.</span>
    username: <span class="hljs-string">&quot;****&quot;</span> <span class="hljs-comment"># username for the Milvus 2.x server.</span>
    password: <span class="hljs-string">&quot;******&quot;</span> <span class="hljs-comment"># password for the Milvus 2.x server.</span>
<button class="copy-code-btn"></button></code></pre>
<p>Tabel berikut ini menjelaskan parameter dalam berkas konfigurasi contoh. Untuk daftar lengkap konfigurasi, lihat <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_ES.md#migrationyaml-reference">Migrasi Milvus: Elasticsearch ke Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Mode operasional pekerjaan migrasi. Diatur ke <code translate="no">elasticsearch</code> ketika melakukan migrasi dari indeks Elasticsearch.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Ukuran buffer untuk dibaca dari Elasticsearch di setiap batch. Unit: KB.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Menentukan sumber untuk meta konfigurasi. Saat ini, hanya <code translate="no">config</code> yang didukung.</td></tr>
<tr><td><code translate="no">meta.index</code></td><td>Mengidentifikasi indeks Elasticsearch yang akan dimigrasikan datanya.</td></tr>
<tr><td><code translate="no">meta.fields</code></td><td>Bidang dalam indeks Elasticsearch yang akan dimigrasi.</td></tr>
<tr><td><code translate="no">meta.fields.name</code></td><td>Nama bidang Elasticsearch.</td></tr>
<tr><td><code translate="no">meta.fields.maxLen</code></td><td>Panjang maksimum bidang. Parameter ini hanya diperlukan jika <code translate="no">meta.fields.type</code> adalah <code translate="no">keyword</code> atau <code translate="no">text</code>.</td></tr>
<tr><td><code translate="no">meta.fields.pk</code></td><td>Menentukan apakah bidang berfungsi sebagai kunci utama.</td></tr>
<tr><td><code translate="no">meta.fields.type</code></td><td>Tipe data bidang Elasticsearch. Saat ini, tipe data berikut di Elasticsearch didukung: <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">kata kunci</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">teks</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">objek</a>.</td></tr>
<tr><td><code translate="no">meta.fields.dims</code></td><td>Dimensi bidang vektor. Parameter ini hanya diperlukan jika <code translate="no">meta.fields.type</code> adalah <code translate="no">dense_vector</code>.</td></tr>
<tr><td><code translate="no">meta.milvus</code></td><td>Konfigurasi khusus untuk membuat koleksi di Milvus 2.x.</td></tr>
<tr><td><code translate="no">meta.milvus.collection</code></td><td>Nama koleksi Milvus. Defaultnya adalah nama indeks Elasticsearch jika tidak ditentukan.</td></tr>
<tr><td><code translate="no">meta.milvus.closeDynamicField</code></td><td>Menentukan apakah akan menonaktifkan bidang dinamis dalam koleksi. Defaultnya adalah <code translate="no">false</code>. Untuk informasi lebih lanjut tentang bidang dinamis, lihat <a href="https://milvus.io/docs/enable-dynamic-field.md#Enable-Dynamic-Field">Mengaktifkan Bidang Dinamis</a>.</td></tr>
<tr><td><code translate="no">meta.milvus.shardNum</code></td><td>Jumlah pecahan yang akan dibuat dalam koleksi. Untuk informasi lebih lanjut tentang pecahan, lihat <a href="https://milvus.io/docs/glossary.md#Shard">Terminologi</a>.</td></tr>
<tr><td><code translate="no">meta.milvus.consistencyLevel</code></td><td>Tingkat konsistensi untuk koleksi di Milvus. Untuk informasi lebih lanjut, lihat <a href="https://milvus.io/docs/consistency.md">Konsistensi</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.es</code></td><td>Konfigurasi koneksi untuk server Elasticsearch sumber.</td></tr>
<tr><td><code translate="no">source.es.urls</code></td><td>Alamat server Elasticsearch sumber.</td></tr>
<tr><td><code translate="no">source.es.username</code></td><td>Nama pengguna untuk server Elasticsearch.</td></tr>
<tr><td><code translate="no">source.es.password</code></td><td>Kata sandi untuk server Elasticsearch.</td></tr>
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
<tr><td><code translate="no">target.remote.cloud</code></td><td>Penyedia layanan penyimpanan cloud. Nilai contoh: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Wilayah penyimpanan cloud. Bisa berupa nilai apa pun jika Anda menggunakan MinIO lokal.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Nama bucket untuk menyimpan data. Nilainya harus sama dengan konfigurasi di Milvus 2.x. Untuk informasi lebih lanjut, lihat <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Konfigurasi Sistem</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Apakah akan menggunakan Peran IAM untuk koneksi.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Apakah akan memeriksa apakah bucket yang ditentukan ada dalam penyimpanan objek.</td></tr>
<tr><td><code translate="no">target.milvus2x</code></td><td>Konfigurasi koneksi untuk server Milvus 2.x target.</td></tr>
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
    </button></h2><p>Mulai tugas migrasi dengan perintah berikut. Ganti <code translate="no">{YourConfigFilePath}</code> dengan direktori lokal tempat berkas konfigurasi <code translate="no">migration.yaml</code> berada.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Berikut ini adalah contoh keluaran log migrasi yang berhasil:</p>
<pre><code translate="no" class="language-bash">[task/load_base_task.go:94] [<span class="hljs-string">&quot;[LoadTasker] Dec Task Processing--------------&gt;&quot;</span>] [Count=0] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[task/load_base_task.go:76] [<span class="hljs-string">&quot;[LoadTasker] Progress Task ---------------&gt;&quot;</span>] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[dbclient/cus_field_milvus2x.go:86] [<span class="hljs-string">&quot;[Milvus2x] begin to ShowCollectionRows&quot;</span>]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static: &quot;</span>] [collection=test_mul_field4_rename1] [beforeCount=50000] [afterCount=100000] [increase=50000]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static Total&quot;</span>] [<span class="hljs-string">&quot;Total Collections&quot;</span>=1] [beforeTotalCount=50000] [afterTotalCount=100000] [totalIncrease=50000]
[migration/es_starter.go:25] [<span class="hljs-string">&quot;[Starter] migration ES to Milvus finish!!!&quot;</span>] [Cost=80.009174459]
[starter/starter.go:106] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=80.00928425]
[cleaner/remote_cleaner.go:27] [<span class="hljs-string">&quot;[Remote Cleaner] Begin to clean files&quot;</span>] [bucket=a-bucket] [rootPath=testfiles/output/zwh/migration]
[cmd/start.go:32] [<span class="hljs-string">&quot;[Cleaner] clean file success!&quot;</span>]
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
    </button></h2><p>Setelah tugas migrasi dijalankan, Anda dapat melakukan panggilan API atau menggunakan Attu untuk melihat jumlah entitas yang dimigrasi. Untuk informasi lebih lanjut, lihat <a href="https://github.com/zilliztech/attu">Attu</a> dan <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
<h2 id="Field-mapping-reference" class="common-anchor-header">Referensi pemetaan bidang<button data-href="#Field-mapping-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>Tinjau tabel di bawah ini untuk memahami bagaimana tipe field di indeks Elasticsearch dipetakan ke tipe field di koleksi Milvus.</p>
<p>Untuk informasi lebih lanjut mengenai tipe data yang didukung di Milvus, lihat <a href="https://milvus.io/docs/schema.md#Supported-data-types">Tipe data yang didukung</a>.</p>
<table>
<thead>
<tr><th>Jenis Bidang Elasticsearch</th><th>Jenis Bidang Milvus</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td>dense_vector</td><td>Vektor mengambang</td><td>Dimensi vektor tetap tidak berubah selama migrasi.</td></tr>
<tr><td>kata kunci</td><td>VarChar</td><td>Tetapkan Panjang Maksimal (1 hingga 65.535). String yang melebihi batas dapat memicu kesalahan migrasi.</td></tr>
<tr><td>teks</td><td>VarChar</td><td>Tetapkan Panjang Maks (1 hingga 65.535). String yang melebihi batas dapat memicu kesalahan migrasi.</td></tr>
<tr><td>panjang</td><td>Int64</td><td>-</td></tr>
<tr><td>bilangan bulat</td><td>Int32</td><td>-</td></tr>
<tr><td>double</td><td>Double</td><td>-</td></tr>
<tr><td>mengambang</td><td>Mengapung</td><td>-</td></tr>
<tr><td>boolean</td><td>Bool</td><td>-</td></tr>
<tr><td>objek</td><td>JSON</td><td>-</td></tr>
</tbody>
</table>
