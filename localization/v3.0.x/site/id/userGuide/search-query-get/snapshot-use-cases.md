---
id: snapshot-use-cases.md
title: Contoh Penggunaan SnapshotCompatible with Milvus 3.0.x
summary: >-
  Dalam panduan ini, Anda akan menemukan contoh-contoh penggunaan umum dari
  snapshot.
beta: Milvus 3.0.x
---
<h1 id="Snapshot-Use-Cases" class="common-anchor-header">Contoh Penggunaan Snapshot<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshot-Use-Cases" class="anchor-icon" translate="no">
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
    </button></h1><p>Dalam panduan ini, Anda akan menemukan contoh penggunaan umum untuk snapshot.</p>
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
    </button></h2><p>Snapshot adalah citra data yang diambil pada titik waktu tertentu dan dapat diakses dengan cepat, cocok untuk rollback cepat atau pengujian (berdurasi beberapa hari hingga beberapa minggu). Di sisi lain, cadangan adalah salinan lengkap yang disimpan secara terpisah untuk pemulihan bencana jangka panjang (berdurasi beberapa minggu hingga beberapa tahun) serta untuk perlindungan yang lebih baik terhadap kegagalan penyimpanan total.</p>
<p>Tabel berikut membandingkan snapshot dan cadangan.</p>
<table>
   <tr>
     <th></th>
     <th><p>Pencadangan</p></th>
     <th><p>Snapshot</p></th>
   </tr>
   <tr>
     <td><p>Pembuatan cadangan</p></td>
     <td><p>Menyalin semua file data (memakan waktu)</p></td>
     <td><p>Hanya membuat metadata (dalam milidetik)</p></td>
   </tr>
   <tr>
     <td><p>Pemulihan</p></td>
     <td><p>Mengimpor data dan membangun kembali indeks</p></td>
     <td><p>Hanya menyalin file data dan indeks yang sudah ada</p></td>
   </tr>
   <tr>
     <td><p>Kinerja</p></td>
     <td><p>Lambat dan memakan banyak sumber daya</p></td>
     <td><p>Cepat dan ringan (dalam hitungan detik hingga menit)</p></td>
   </tr>
   <tr>
     <td><p>Dampak pada sistem</p></td>
     <td><p>Penggunaan I/O dan CPU tinggi</p></td>
     <td><p>Dampak minimal</p></td>
   </tr>
</table>
<p>Membuat snapshot biasanya memakan waktu milidetik, sedangkan memulihkannya memakan waktu beberapa detik hingga menit, tergantung pada volume data.</p>
<p>Untuk detail lebih lanjut mengenai batasan, pembatasan, dan dampaknya terhadap sistem, lihat <a href="/docs/id/snapshots.md">Snapshot</a>.</p>
<h2 id="Data-processing-with-external-collections" class="common-anchor-header">Pemrosesan data dengan koleksi eksternal<button data-href="#Data-processing-with-external-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Snapshot dapat menyediakan sumber data yang stabil dan pada titik waktu tertentu untuk beban kerja analitik atau validasi. Untuk snapshot Milvus, gunakan format koleksi eksternal " <code translate="no">milvus-table</code> " alih-alih membaca berkas snapshot secara langsung sebagai masukan Spark generik. Snapshot Milvus menyimpan metadata koleksi, manifest segmen, log penghapusan, dan statistik kunci utama, sehingga Milvus memerlukan metadata JSON snapshot dan pembaca <code translate="no">milvus-table</code> untuk mempertahankan skema yang benar serta semantik penghapusan.</p>
<p>Alur kerja ini membuat koleksi eksternal yang dapat diquery berdasarkan data snapshot. Data kolom utama tetap direferensikan dari sumber snapshot, dan penyegaran memetakan manifest StorageV3 sumber ke segmen eksternal tujuan.</p>
<h3 id="Step-1-Get-the-snapshot-metadata-path" class="common-anchor-header">Langkah 1: Dapatkan jalur metadata snapshot<button data-href="#Step-1-Get-the-snapshot-metadata-path" class="anchor-icon" translate="no">
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
    </button></h3><p>Buat atau pilih snapshot dari koleksi Milvus biasa, lalu deskripsikan untuk mendapatkan lokasi penyimpanan objeknya.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

snapshot_info = client.describe_snapshot(
    snapshot_name=<span class="hljs-string">&quot;analytics_snapshot_20260321&quot;</span>,
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    include_collection_info=<span class="hljs-literal">True</span>
)

external_source = <span class="hljs-string">f&quot;s3://bucket/<span class="hljs-subst">{snapshot_info.s3_location}</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Create-and-refresh-a-milvus-table-external-collection" class="common-anchor-header">Langkah 2: Buat dan perbarui koleksi eksternal " <code translate="no">milvus-table</code> "<button data-href="#Step-2-Create-and-refresh-a-milvus-table-external-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Buat koleksi eksternal yang skemanya sesuai dengan koleksi sumber snapshot. Atur " <code translate="no">external_spec.format</code> " menjadi " <code translate="no">&quot;milvus-table&quot;</code>", dan atur " <code translate="no">external_field</code> " setiap bidang data target ke nama bidang sumber yang sesuai.</p>
<pre><code translate="no" class="language-python">schema = client.create_schema(
    external_source=external_source,
    external_spec=<span class="hljs-string">&quot;&quot;&quot;{
        &quot;format&quot;: &quot;milvus-table&quot;,
        &quot;extfs&quot;: {
            &quot;cloud_provider&quot;: &quot;aws&quot;,
            &quot;region&quot;: &quot;us-west-2&quot;,
            &quot;access_key_id&quot;: &quot;YOUR_ACCESS_KEY&quot;,
            &quot;access_key_value&quot;: &quot;YOUR_SECRET_KEY&quot;
        }
    }&quot;&quot;&quot;</span>,
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    external_field=<span class="hljs-string">&quot;id&quot;</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    external_field=<span class="hljs-string">&quot;embedding&quot;</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>,
    schema=schema,
)

job_id = client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Setelah penyegaran selesai, Anda dapat membuat indeks, memuat koleksi eksternal, dan menjalankan operasi pencarian atau kueri terhadap tampilan yang didukung oleh snapshot.</p>
