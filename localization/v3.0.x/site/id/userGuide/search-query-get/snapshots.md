---
id: snapshots.md
title: SnapshotCompatible with Milvus 3.0.x
summary: >-
  Gunakan snapshot untuk merekam kondisi koleksi pada titik waktu tertentu guna
  keperluan rollback, pengelompokan versi, dan pengujian.
beta: Milvus 3.0.x
---
<h1 id="Snapshots" class="common-anchor-header">Snapshot<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>Snapshot adalah gambaran koleksi Milvus pada titik waktu tertentu, yang ideal untuk rollback cepat, pengaturan versi, dan pengujian. Snapshot menangkap status koleksi pada waktu tertentu dan hanya menyimpan metadata serta file manifest, seperti skema, indeks, dan file data vektor (binlog), untuk penyimpanan dan pemulihan yang efisien.</p>
<p>Snapshot adalah citra data pada titik waktu tertentu yang cepat, cocok untuk rollback cepat atau pengujian (<strong>berdurasi beberapa hari hingga beberapa minggu</strong>). Sementara itu, cadangan adalah salinan lengkap yang disimpan secara terpisah untuk pemulihan bencana jangka panjang (<strong>berdurasi beberapa minggu hingga beberapa tahun</strong>) dan untuk perlindungan yang lebih baik terhadap kegagalan penyimpanan total.</p>
<p>Untuk membuat cadangan, lihat <a href="/docs/id/milvus_backup_overview.md">Milvus Backup</a>.</p>
<h2 id="Snapshot-anatomy" class="common-anchor-header">Anatomi Snapshot<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menerapkan arsitektur snapshot berbasis manifest untuk penangkapan, penyimpanan, dan pemulihan data pada titik waktu tertentu secara efisien tanpa menduplikasi data vektor yang sebenarnya. Arsitektur ini memisahkan pengelolaan metadata dari penyimpanan data fisik, sehingga memungkinkan pembuatan snapshot yang ringan yang merujuk ke file segmen yang ada di penyimpanan objek.</p>
<p>Saat Anda membuat snapshot untuk sebuah koleksi, Milvus mengumpulkan hal-hal berikut:</p>
<ul>
<li><p><strong>Metadata snapshot</strong></p>
<p>Metadata ini menyediakan informasi dasar untuk membuat snapshot, termasuk nama dan deskripsi snapshot, ID koleksi tujuan, serta titik waktu saat snapshot dibuat.</p></li>
<li><p><strong>Deskripsi koleksi</strong></p>
<p>Berisi deskripsi koleksi target, termasuk definisi skema, informasi partisi, dan propertinya.</p></li>
<li><p><strong>Informasi indeks</strong></p>
<p>Metadata indeks dan jalur ke berkas indeks disimpan di sini.</p></li>
<li><p><strong>Data segmen</strong></p>
<p>Bagian ini mencakup berkas data vektor (binlogs), log penghapusan (deltalogs), dan berkas indeks.</p></li>
</ul>
<p>Di antara informasi di atas, Milvus menghasilkan berkas manifest Apache Avro untuk setiap segmen dan menyimpan metadata snapshot, deskripsi koleksi, informasi indeks, serta jalur ke berkas manifest dalam berkas JSON. Diagram berikut menggambarkan struktur folder snapshot.</p>
<pre><code translate="no" class="language-text">snapshots/{collection_id}/
├── metadata/
│   └── {snapshot_id}.json         # Snapshot metadata (JSON format)
│
└── manifests/
    └── {snapshot_id}/             # Directory for each snapshot
        ├── {segment_id_1}.avro    # Individual segment manifest (Avro format)
        ├── {segment_id_2}.avro
        └── ...
<button class="copy-code-btn"></button></code></pre>
<p>Pembuatan snapshot biasanya memakan waktu milidetik, sedangkan pemulihannya memakan waktu beberapa detik hingga menit, tergantung pada volume data.</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">Dampak dan pertimbangan penyimpanan<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah Milvus mereferensikan segmen atau berkas indeks dalam sebuah snapshot, sistem tidak akan melakukan pembersihan (garbage collection) terhadap berkas-berkas tersebut kecuali Anda menghapus snapshot tersebut. Snapshot mengonsumsi ruang penyimpanan sebanding dengan ukuran koleksi target, dan biaya penyimpanan objek berlaku untuk retensi snapshot. Dalam kasus ekstrem, satu snapshot bahkan dapat menggandakan biaya penyimpanan objek Anda. Disarankan untuk</p>
<ul>
<li>menghapus snapshot lama secara teratur untuk menghemat penyimpanan.</li>
<li>Gunakan nama dan deskripsi yang deskriptif untuk referensi di masa mendatang.</li>
<li>Selalu verifikasi hasil pembuatan dan pemulihan snapshot.</li>
<li>Melacak cap waktu pembuatan snapshot dan penggunaan penyimpanan untuk pemantauan dan pemecahan masalah.</li>
<li>Simpan ID pekerjaan pemulihan untuk pemantauan dan pemecahan masalah.</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">Batasan dan pembatasan<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
<li>Snapshot menjadi tidak dapat diubah setelah dibuat.</li>
<li>Anda hanya dapat memulihkan snapshot ke koleksi baru di dalam klaster yang sama dengan yang asli.</li>
<li>Koleksi yang dipulihkan mempertahankan skema, jumlah shard, dan jumlah partisi yang sama.</li>
<li>Data historis yang dipulihkan mungkin bertentangan dengan kebijakan TTL. Anda disarankan untuk menonaktifkan TTL atau menyesuaikan pengaturan TTL sebelum membuat snapshot.</li>
<li>Untuk menggunakan snapshot sebagai sumber eksternal " <code translate="no">milvus-table</code> ", snapshot sumber harus berasal dari koleksi StorageV3 Milvus biasa. Snapshot dari koleksi eksternal tidak didukung sebagai sumber " <code translate="no">milvus-table</code> ".</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">Bacaan lebih lanjut<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
<li><a href="/docs/id/manage-snapshots.md">Mengelola Snapshot</a> — membuat, mencantumkan, mendeskripsikan, menandai, memulihkan, dan menghapus snapshot.</li>
<li><a href="/docs/id/snapshot-use-cases.md">Kasus Penggunaan Snapshot</a> — pola dan alur kerja umum.</li>
<li><a href="/docs/id/milvus_backup_overview.md">Pencadangan Milvus</a> — pencadangan jangka panjang dan pemulihan antar-kluster.</li>
</ul>
