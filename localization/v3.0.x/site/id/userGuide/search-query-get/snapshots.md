---
id: snapshots.md
title: JepretanCompatible with Milvus 3.0.x
summary: >-
  Gunakan snapshot untuk menangkap status pengumpulan titik waktu untuk
  rollback, pembuatan versi, dan pengujian.
beta: Milvus 3.0.x
---
<h1 id="Snapshots" class="common-anchor-header">Jepretan<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>Snapshot adalah gambar titik waktu dari koleksi Milvus, ideal untuk pengembalian cepat, pembuatan versi, dan pengujian. Snapshot menangkap status koleksi pada stempel waktu tertentu dan hanya menyimpan metadata dan file manifes, seperti skema, indeks, dan file data vektor (binlog), untuk penyimpanan dan pemulihan yang efisien.</p>
<div class="alert note">
<p>Snapshot adalah gambar data yang cepat dan langsung pada waktunya, cocok untuk pengembalian cepat atau pengujian<strong>(beberapa hari hingga beberapa minggu)</strong>. Sementara itu, cadangan adalah salinan lengkap yang independen dan disimpan secara terpisah untuk pemulihan bencana jangka panjang<strong>(berminggu-minggu hingga bertahun-tahun)</strong> dan untuk perlindungan yang lebih baik terhadap kegagalan penyimpanan total.</p>
<p>Untuk membuat cadangan, lihat Cadangan <a href="/docs/id/milvus_backup_overview.md">Milvus</a>.</p>
</div>
<h2 id="Snapshot-anatomy" class="common-anchor-header">Anatomi snapshot<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mengimplementasikan arsitektur snapshot berbasis manifes untuk pengambilan, penyimpanan, dan pemulihan data secara efisien tanpa menduplikasi data vektor yang sebenarnya. Arsitektur ini memisahkan manajemen metadata dari penyimpanan data fisik, sehingga memungkinkan snapshot ringan yang mereferensikan file segmen yang ada dalam penyimpanan objek.</p>
<p>Ketika Anda membuat snapshot untuk koleksi, Milvus mengumpulkan hal-hal berikut ini:</p>
<ul>
<li><p><strong>Metadata snapshot</strong></p>
<p>Metadata ini menyediakan informasi dasar untuk membuat snapshot, termasuk nama dan deskripsi snapshot, ID koleksi target, dan titik waktu saat snapshot dibuat.</p></li>
<li><p><strong>Deskripsi koleksi</strong></p>
<p>Berisi deskripsi koleksi target, termasuk definisi skema, informasi partisi, dan properti.</p></li>
<li><p><strong>Informasi indeks</strong></p>
<p>Menyimpan metadata indeks dan jalur ke file indeks.</p></li>
<li><p><strong>Data segmen</strong></p>
<p>Menangkap file data vektor (binlog), log penghapusan (deltalog), dan file indeks.</p></li>
</ul>
<p>Di antara informasi di atas, Milvus menghasilkan berkas manifes Apache Avro untuk setiap segmen dan menyimpan metadata snapshot, deskripsi koleksi, informasi indeks, dan jalur ke berkas manifes dalam berkas JSON. Diagram berikut ini mengilustrasikan struktur folder snapshot.</p>
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
<p>Membuat snapshot biasanya memerlukan waktu milidetik, dan memulihkannya memerlukan waktu beberapa detik hingga beberapa menit, tergantung volume data.</p>
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
    </button></h2><p>Setelah Milvus mereferensikan segmen atau file indeks dalam snapshot, Milvus tidak akan mengumpulkan file-file tersebut kecuali jika Anda menghapus snapshot tersebut. Snapshot menggunakan penyimpanan yang sebanding dengan ukuran koleksi target, dan biaya penyimpanan objek berlaku untuk penyimpanan snapshot. Dalam kasus yang ekstrem, satu snapshot bahkan dapat menggandakan biaya penyimpanan objek Anda. Anda disarankan untuk</p>
<ul>
<li>Menghapus snapshot lama secara teratur untuk menghemat penyimpanan.</li>
<li>Gunakan nama dan deskripsi deskriptif untuk referensi di masa mendatang.</li>
<li>Selalu verifikasi pembuatan snapshot dan hasil pemulihan.</li>
<li>Lacak stempel waktu pembuatan snapshot, penggunaan penyimpanan, dan ID pekerjaan pemulihan untuk pemantauan dan pemecahan masalah.</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">Batasan dan larangan<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
<li>Snapshot tidak dapat diubah setelah dibuat.</li>
<li>Anda hanya dapat memulihkan snapshot ke koleksi baru dalam cluster yang sama dengan aslinya.</li>
<li>Koleksi yang dipulihkan mempertahankan skema, jumlah pecahan, dan jumlah partisi yang sama.</li>
<li>Data historis yang dipulihkan mungkin bertentangan dengan kebijakan TTL. Anda disarankan untuk menonaktifkan TTL atau menyesuaikan pengaturan TTL sebelum membuat snapshot.</li>
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
<li><a href="/docs/id/manage-snapshots.md">Mengelola Snapshot</a> - membuat, membuat daftar, memulihkan, dan menghapus snapshot.</li>
<li><a href="/docs/id/snapshot-use-cases.md">Kasus Penggunaan Snapshot</a> - pola dan alur kerja umum.</li>
<li>Pencadangan<a href="/docs/id/milvus_backup_overview.md">Milvus</a> - pencadangan dan pemulihan jangka panjang di seluruh cluster.</li>
</ul>
