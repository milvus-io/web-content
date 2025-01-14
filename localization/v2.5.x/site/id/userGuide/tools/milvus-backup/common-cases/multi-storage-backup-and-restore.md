---
id: multi-storage-backup-and-restore.md
summary: >-
  Topik ini merinci proses mencadangkan koleksi dari satu instans Milvus dan
  mengembalikannya ke instans lainnya
title: Migrasi Antar Instance di Seluruh Lingkungan S3
---
<h1 id="Migrate-Between-Instances-Across-S3-Environments" class="common-anchor-header">Migrasi Antar Instance di Seluruh Lingkungan S3<button data-href="#Migrate-Between-Instances-Across-S3-Environments" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini merinci proses mencadangkan koleksi dari satu instans Milvus dan mengembalikannya ke instans lain, dengan masing-masing instans menggunakan penyimpanan objek yang berbeda.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Diagram di bawah ini mengilustrasikan proses pencadangan dan pemulihan menggunakan penyimpanan objek yang berbeda.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-storage-backup-and-restore.png" alt="multi-storage-backup-and-restore.png" class="doc-image" id="multi-storage-backup-and-restore.png" />
   </span> <span class="img-wrapper"> <span>pencadangan-dan-pemulihan multi-penyimpanan.png</span> </span></p>
<p>Asumsikan kita memiliki dua instance Milvus, <code translate="no">milvus_A</code> dan <code translate="no">milvus_B</code>, yang menggunakan penyimpanan objek yang berbeda. Dalam contoh ini, tujuan kita adalah menyelesaikan tugas-tugas berikut:</p>
<ol>
<li><p>Membuat cadangan (my_backup) untuk koleksi <code translate="no">coll</code> di <code translate="no">bucket_A</code> dari penyimpanan objek<code translate="no">milvus_A</code>.</p></li>
<li><p>Mentransfer cadangan my_backup ke <code translate="no">bucket_B</code> dari penyimpanan objek <code translate="no">milvus_B</code>.</p></li>
</ol>
<p>Di <code translate="no">bucket_B</code>, pulihkan dari cadangan dan beri nama koleksi yang dipulihkan coll_bak.</p>
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
<li><p>Pastikan alat <strong>milvus-backup</strong> sudah terpasang.</p></li>
<li><p>Biasakan diri Anda dengan mengonfigurasi pengaturan penyimpanan objek Milvus. Untuk detailnya, lihat <a href="https://milvus.io/docs/deploy_s3.md">Penyimpanan Objek</a>.</p></li>
</ul>
<h2 id="Back-up-a-collection-from-milvusA" class="common-anchor-header">Mencadangkan koleksi dari milvus_A<button data-href="#Back-up-a-collection-from-milvusA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">Langkah 1: Siapkan konfigurasi</h3><p>Masuk ke direktori proyek milvus-backup dan buat direktori bernama configs:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">mkdir</span> configs
<span class="hljs-built_in">cd</span> configs
<button class="copy-code-btn"></button></code></pre>
<p>Unduh berkas konfigurasi pencadangan <code translate="no">backup.yaml</code>:</p>
<pre><code translate="no" class="language-shell">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-backup/main/configs/backup.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Struktur berkas terlihat seperti ini:</p>
<pre><code translate="no">├── configs
│   └── backup.yaml
├── milvus-backup
└── README.md
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Edit-configuration-file" class="common-anchor-header">Langkah 2: Mengedit berkas konfigurasi</h3><p>Ubah berkas <code translate="no">backup.yaml</code> untuk mengatur konfigurasi yang sesuai untuk milvus_A:</p>
<ul>
<li><p>Konfigurasi koneksi</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
milvus:
  address: milvus_A
  port: <span class="hljs-number">19530</span>
  authorizationEnabled: false
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  tlsMode: <span class="hljs-number">0</span>
  user: <span class="hljs-string">&quot;root&quot;</span>
  password: <span class="hljs-string">&quot;Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">milvus.address</code>: Alamat IP atau nama host dari server milvus_A.</p></li>
<li><p><code translate="no">milvus.port</code>: Port TCP yang didengarkan server Milvus (default 19530).</p></li>
</ul></li>
<li><p>Konfigurasi penyimpanan (pengaturan MinIO/S3)</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
minio:
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  storageType: <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  address: minio_A <span class="hljs-comment"># Address of MinIO/S3</span>
  port: <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  accessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  secretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  useSSL: false <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  useIAM: false
  iamEndpoint: <span class="hljs-string">&quot;&quot;</span>
  
  bucketName: <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  rootPath: <span class="hljs-string">&quot;files&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># only for azure</span>
  backupAccessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  backupSecretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  backupBucketName: <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  backupRootPath: <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">minio.bucketName</code>: Nama bucket yang digunakan untuk penyimpanan data di milvus_A. Dalam contoh ini, diatur ke <code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.rootPath</code>: Jalur root di dalam bucket tempat data dari milvus_A disimpan. Dalam contoh ini, setel ke <code translate="no">files</code>.</p></li>
<li><p><code translate="no">minio.backupBucketName</code>: Nama ember yang digunakan untuk penyimpanan cadangan. Dalam contoh ini, diatur ke <code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.backupRootPath</code>: Jalur root di dalam bucket yang ditetapkan untuk menyimpan file cadangan di <code translate="no">milvus_B</code>. Dalam contoh ini, atur ke <code translate="no">backup</code>.</p></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">Langkah 3: Membuat cadangan</h3><p>Setelah backup.yaml disimpan, buat cadangan bernama <code translate="no">my_backup</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>Perintah ini membuat cadangan <code translate="no">bucket_A/backup/my_backup</code> dalam penyimpanan objek <code translate="no">milvus_A</code>.</p>
<h2 id="Manually-transfer-the-backup-to-milvusB" class="common-anchor-header">Transfer cadangan secara manual ke milvus_B<button data-href="#Manually-transfer-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><p>Karena <code translate="no">milvus_A</code> dan <code translate="no">milvus_B</code> menggunakan penyimpanan objek yang berbeda, Anda perlu mengunduh cadangan secara manual dari penyimpanan milvus_A dan mengunggahnya ke penyimpanan<code translate="no">milvus_B</code>.</p>
<p><strong>Menggunakan konsol MinIO</strong></p>
<ol>
<li><p>Masuk ke konsol MinIO.</p></li>
<li><p>Cari bucket yang ditentukan di minio.address untuk milvus_A.</p></li>
<li><p>Pilih file cadangan di dalam bucket.</p></li>
<li><p>Klik <strong>Unduh</strong> untuk mengunduh berkas ke mesin Anda.</p></li>
</ol>
<p><strong>Menggunakan klien mc</strong></p>
<p>Sebagai alternatif, Anda dapat menggunakan <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">klien mc</a> untuk mengunduh file cadangan:</p>
<ol>
<li>Konfigurasikan host MinIO:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta"># configure a Minio host</span>
mc <span class="hljs-keyword">alias</span> <span class="hljs-keyword">set</span> my_minio https:<span class="hljs-comment">//&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Buat daftar bucket yang tersedia:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># List the available buckets</span>
mc ls my_minio
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Unduh bucket secara rekursif:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Setelah file cadangan diunduh, Anda dapat mengunggahnya ke penyimpanan objek yang digunakan oleh <code translate="no">milvus_B</code> untuk pemulihan di masa mendatang. Atau, Anda dapat mengunggah cadangan ke <a href="https://cloud.zilliz.com/">Zilliz Cloud</a> untuk membuat basis data vektor terkelola dengan data Anda. Untuk detailnya, lihat <a href="https://zilliz.com/doc/migrate_from_milvus-2x">Migrasi dari Milvus ke Zilliz Cloud</a>.</p>
<h2 id="Restore-from-the-backup-to-milvusB" class="common-anchor-header">Memulihkan dari cadangan ke milvus_B<button data-href="#Restore-from-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Configure-restoration-settings" class="common-anchor-header">Langkah 1: Mengonfigurasi pengaturan pemulihan</h3><p>Ulangi langkah 2 untuk memodifikasi konfigurasi untuk pemulihan ke <code translate="no">milvus_B</code>, memastikan <code translate="no">minio.bucketName</code> diatur ke <code translate="no">bucket_B</code>.</p>
<p>Berikut ini contoh konfigurasinya:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
milvus:
  address: milvus_B
  port: <span class="hljs-number">19530</span>
  authorizationEnabled: false
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  tlsMode: <span class="hljs-number">0</span>
  user: <span class="hljs-string">&quot;root&quot;</span>
  password: <span class="hljs-string">&quot;Milvus&quot;</span>
  
<span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
minio:
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  storageType: <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  address: minio_B <span class="hljs-comment"># Address of MinIO/S3</span>
  port: <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  accessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  secretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  useSSL: false <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  useIAM: false
  iamEndpoint: <span class="hljs-string">&quot;&quot;</span>
  
  bucketName: <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  rootPath: <span class="hljs-string">&quot;files&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># only for azure</span>
  backupAccessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  backupSecretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  backupBucketName: <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  backupRootPath: <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Restore-from-the-backup" class="common-anchor-header">Langkah 2: Pulihkan dari cadangan</h3><p>Pulihkan cadangan ke <code translate="no">milvus_B</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>Perintah ini mengembalikan cadangan ke dalam koleksi baru bernama coll_bak di<code translate="no">milvus_B</code>, dengan data yang disimpan di <code translate="no">bucket_B/files/insert_log/[ID of new collection]</code> dalam penyimpanan objek <code translate="no">milvus_B</code>.</p>
