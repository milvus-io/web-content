---
id: snapshot-use-cases.md
title: Kasus Penggunaan SnapshotCompatible with Milvus 3.0.x
summary: >-
  Dalam panduan ini, Anda akan menemukan kasus penggunaan yang umum untuk
  snapshot.
beta: Milvus 3.0.x
---
<h1 id="Snapshot-Use-Cases" class="common-anchor-header">Kasus Penggunaan Snapshot<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshot-Use-Cases" class="anchor-icon" translate="no">
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
    </button></h1><p>Dalam panduan ini, Anda akan menemukan kasus penggunaan umum untuk snapshot.</p>
<h2 id="Data-backup-and-restoration" class="common-anchor-header">Pencadangan dan pemulihan data<button data-href="#Data-backup-and-restoration" class="anchor-icon" translate="no">
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
    </button></h2><p>Snapshot adalah gambar data yang cepat dan langsung pada saat itu juga, cocok untuk pencadangan atau pengujian yang cepat (dalam hitungan hari hingga minggu). Sementara itu, cadangan bersifat independen, salinan lengkap yang disimpan secara terpisah untuk pemulihan bencana jangka panjang (berminggu-minggu hingga bertahun-tahun) dan untuk perlindungan yang lebih baik terhadap kegagalan penyimpanan total.</p>
<p>Tabel berikut ini membandingkan snapshot dan cadangan.</p>
<table>
   <tr>
     <th></th>
     <th><p>Cadangan</p></th>
     <th><p>Cuplikan</p></th>
   </tr>
   <tr>
     <td><p>Pembuatan cadangan</p></td>
     <td><p>Menyalin semua file data (memakan waktu)</p></td>
     <td><p>Membuat metadata saja (dalam milidetik)</p></td>
   </tr>
   <tr>
     <td><p>Pemulihan</p></td>
     <td><p>Mengimpor data dan membangun kembali indeks</p></td>
     <td><p>Menyalin data yang sudah ada dan file indeks saja</p></td>
   </tr>
   <tr>
     <td><p>Kinerja</p></td>
     <td><p>Lambat dan intensif sumber daya</p></td>
     <td><p>Cepat dan ringan (dalam hitungan detik hingga menit)</p></td>
   </tr>
   <tr>
     <td><p>Dampak sistem</p></td>
     <td><p>Penggunaan I/O dan CPU yang tinggi</p></td>
     <td><p>Dampak minimal</p></td>
   </tr>
</table>
<p>Membuat snapshot biasanya memerlukan waktu milidetik, dan memulihkannya memerlukan waktu beberapa detik hingga menit, tergantung volume data.</p>
<p>Untuk detail lebih lanjut tentang batas snapshot, batasan, dan dampak sistemnya, lihat <a href="/docs/id/snapshots.md">Snapshot</a>.</p>
<h3 id="Create-snapshots" class="common-anchor-header">Membuat snapshot<button data-href="#Create-snapshots" class="anchor-icon" translate="no">
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
    </button></h3><p>Sebelum membuat snapshot, Anda disarankan untuk berhenti menulis data ke koleksi target dan menghubungi <code translate="no">flush()</code> untuk menghindari kemungkinan kehilangan data.</p>
<div class="alert note">
</div>
<p>Saat memberi nama snapshot, gunakan nama yang jelas dan deskriptif, seperti <code translate="no">&quot;daily_backup_20240101&quot;</code> atau <code translate="no">&quot;v2.1_production_release&quot;</code> dan hindari istilah umum, seperti <code translate="no">&quot;backup1&quot;</code> dan <code translate="no">&quot;test&quot;</code>. Gunakan nama snapshot dengan bijak untuk membedakan snapshot di seluruh versi, lingkungan, dan tahapan.</p>
<p>Contoh kode di bawah ini mengasumsikan bahwa Anda sudah memiliki koleksi bernama <code translate="no">my_collection</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Recommended: Flush data before creating snapshot to ensure all data is included</span>
client.flush(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>)

<span class="hljs-comment"># Create snapshot for entire collection</span>
client.create_snapshot(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>,
    description=<span class="hljs-string">&quot;Daily backup for January 1st, 2024&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

client, err := milvusclient.New(context.Background(), &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    Token: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})

<span class="hljs-comment">// Recommended: Flush data before creating snapshot to ensure all data is included</span>
err = client.Flush(context.Background(), milvusclient.NewFlushOption(<span class="hljs-string">&quot;my_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-comment">// Create snapshot</span>
createOpt := milvusclient.NewCreateSnapshotOption(<span class="hljs-string">&quot;backup_20240101&quot;</span>, <span class="hljs-string">&quot;my_collection&quot;</span>).
    WithDescription(<span class="hljs-string">&quot;Daily backup for January 1st, 2024&quot;</span>)

err = client.CreateSnapshot(context.Background(), createOpt)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Restore-snapshots" class="common-anchor-header">Memulihkan snapshot<button data-href="#Restore-snapshots" class="anchor-icon" translate="no">
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
    </button></h3><p>Anda dapat memulihkan snapshot ke koleksi baru. Operasi ini bersifat asinkron dan mengembalikan ID pekerjaan untuk melacak kemajuan restorasi.</p>
<p>Pemulihan menggunakan mekanisme <strong>salin-segmen</strong> alih-alih impor data, yang lebih efisien karena</p>
<ul>
<li><p>secara langsung menyalin file segmen (binlog, deltalog, file indeks) dari penyimpanan snapshot</p></li>
<li><p>mempertahankan ID bidang dan ID indeks untuk memastikan kompatibilitas dengan file data yang ada</p></li>
<li><p>menghindari penulisan ulang data dan pembangunan kembali indeks, menghasilkan waktu pemulihan yang jauh lebih cepat, dan</p></li>
<li><p>memastikan peningkatan kinerja 10 hingga 100 kali lipat dibandingkan dengan metode pencadangan dan pemulihan tradisional</p></li>
</ul>
<p>Untuk memulihkan snapshot, lakukan hal berikut:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Restore snapshot to new collection</span>
job_id = client.restore_snapshot(
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>,
    collection_name=<span class="hljs-string">&quot;restored_collection&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">restoreOpt := milvusclient.NewRestoreSnapshotOption(
    <span class="hljs-string">&quot;backup_20240101&quot;</span>,
    <span class="hljs-string">&quot;restored_collection&quot;</span>
)

jobID, err := client.RestoreSnapshot(context.Background(), restoreOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-snapshots" class="common-anchor-header">Menghapus snapshot<button data-href="#Drop-snapshots" class="anchor-icon" translate="no">
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
    </button></h3><p>Anda dapat membuang snapshot jika tidak lagi diperlukan. Anda disarankan untuk menghapus snapshot lama secara teratur untuk menghemat penyimpanan.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.drop_snapshot(
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">dropOpt := milvusclient.NewDropSnapshotOption(<span class="hljs-string">&quot;backup_20240101&quot;</span>)
err := client.DropSnapshot(context.Background(), dropOpt)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Data-processing-with-Spark" class="common-anchor-header">Pemrosesan data dengan Spark<button data-href="#Data-processing-with-Spark" class="anchor-icon" translate="no">
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
    </button></h2><p>Snapshot memungkinkan pemrosesan data offline yang efisien dengan menyediakan sumber data yang stabil dan konsisten untuk beban kerja analitik. Anda dapat secara langsung mengakses data snapshot yang disimpan di penyimpanan objek dengan Spark atau kerangka kerja pemrosesan data besar lainnya tanpa memengaruhi klaster Milvus yang sedang berjalan.</p>
<p>Kode berikut ini mengasumsikan Anda telah membuat snapshot bernama <code translate="no">&quot;analytics_snapshot_20260321&quot;</code>, menyimpannya di ember penyimpanan objek, dan memperoleh kredensial akses penyimpanan objek.</p>
<h3 id="Step-1-Get-snapshot-metadata" class="common-anchor-header">Langkah 1: Dapatkan metadata snapshot<button data-href="#Step-1-Get-snapshot-metadata" class="anchor-icon" translate="no">
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
    </button></h3><p>Sebelum menggunakan Spark untuk mengakses data snapshot, dapatkan metadata snapshot untuk menemukan file data di penyimpanan objek.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get snapshot metadata</span>
snapshot_info = client.describe_snapshot(
    snapshot_name=s<span class="hljs-string">&quot;analytics_snapshot_20260321&quot;</span>,
    include_collection_info=<span class="hljs-literal">True</span>
)

<span class="hljs-comment"># Locate data files in S3</span>
s3_path = <span class="hljs-string">f&quot;s3a://<span class="hljs-subst">{snapshot_info.s3_location}</span>/binlogs/&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step2-Initiate-a-Spark-session" class="common-anchor-header">Langkah 2: Memulai sesi Spark<button data-href="#Step2-Initiate-a-Spark-session" class="anchor-icon" translate="no">
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
    </button></h3><p>Dengan file data di penyimpanan objek, mulai sesi Spark dan baca data ke dalam bingkai data.</p>
<pre><code translate="no" class="language-python">spark = SparkSession.builder \
    .appName(<span class="hljs-string">&quot;VectorAnalytics&quot;</span>) \
    .config(<span class="hljs-string">&quot;spark.hadoop.fs.s3a.access.key&quot;</span>, <span class="hljs-string">&quot;YOUR_ACCESS_KEY&quot;</span>) \
    .config(<span class="hljs-string">&quot;spark.hadoop.fs.s3a.secret.key&quot;</span>, <span class="hljs-string">&quot;YOUR_SECRET_KEY&quot;</span>) \
    .getOrCreate()

<button class="copy-code-btn"></button></code></pre>
