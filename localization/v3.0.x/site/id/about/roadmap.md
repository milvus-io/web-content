---
id: roadmap.md
title: Peta Jalan Milvus
related_key: Milvus roadmap
summary: >-
  Pelajari peta jalan Milvus terkait pencarian, analitik, evolusi skema,
  integrasi data lake, dan kinerja pada rilis 3.0 dan 3.1.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Peta Jalan Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 3.0 menggabungkan pencarian multi-vektor, kueri bergaya SQL, skema yang fleksibel, dan akses ke data di penyimpanan data lake. Tahap-tahap berikutnya akan dikembangkan berdasarkan fondasi tersebut dengan kueri yang lebih kaya, model data yang lebih luas, serta peningkatan kinerja dan skalabilitas. Peta jalan ini menguraikan prioritas-prioritas tersebut untuk Milvus open-source.</p>
<p>Milvus 3.0 telah tersedia secara umum mulai dari <strong>versi v3.0.1</strong>. Fitur-fitur yang telah dirilis di bawah ini diperkenalkan pada <strong>v3.0.0</strong>; fitur pratinjau dan fitur yang dapat diaktifkan secara opsional ditandai pada bagian yang bersangkutan. Seri <strong>3.0.x</strong> memperluas kemampuan ini, sedangkan versi <strong>3.1 ditargetkan rilis pada Desember 2026</strong>. Fitur yang direncanakan dan tanggal target dapat berubah seiring berjalannya proses pengembangan.</p>
<h2 id="Search-and-retrieval" class="common-anchor-header">Pencarian dan pengambilan<button data-href="#Search-and-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>Peta jalan pengambilan berfokus pada penggabungan lebih banyak sinyal relevansi di dalam Milvus, mulai dari pencocokan teks dan representasi multi-vektor hingga penataan ulang peringkat dan aspek hasil pencarian.</p>
<p><strong>Tersedia di versi 3.0</strong></p>
<ul>
<li><strong>Pencarian multi-vektor:</strong> Pencarian StructArray mendukung Muvera dan Lemur, dengan " <code translate="no">element_filter</code> " untuk penyaringan tingkat elemen. Kebijakan pencocokan meliputi " <code translate="no">MATCH_ANY</code>", " <code translate="no">MATCH_ALL</code>", " <code translate="no">MATCH_LEAST</code>", " <code translate="no">MATCH_MOST</code>", dan " <code translate="no">MATCH_EXACT</code>".</li>
<li><strong>Pencocokan dan kesamaan teks:</strong> Kamus khusus dan sinonim menyesuaikan pencarian teks dengan kebutuhan aplikasi. Penyaringan Regex mendukung pencocokan pola, dan MinHash mendukung deteksi duplikat yang hampir sama.</li>
<li><strong>Penilaian ulang dan inferensi:</strong> Milvus 3.0 memperkenalkan serangkaian kemampuan penilaian ulang Function Chain awal, bersama dengan Hugging Face Inference Provider. Kemampuan Function Chain lainnya direncanakan untuk versi 3.0.x.</li>
<li><strong>Agregasi pencarian:</strong> Agregasi pencarian menyediakan facet pada hasil pencarian.</li>
</ul>
<p><strong>Direncanakan untuk versi 3.0.x</strong></p>
<p>Seri 3.0.x direncanakan untuk menambahkan pencocokan kabur dan statistik global, serta dukungan Function Chain yang lengkap.</p>
<p><strong>Direncanakan untuk versi 3.1</strong></p>
<p>Rencana tersebut mencakup pencarian berbasis Grep, integrasi yang lebih erat antara pencarian tetangga terdekat (ANN) dan penyaringan melalui fusi ANN-filter, serta peningkatan pada pencarian spars.</p>
<h2 id="Analytics-and-SQL-style-querying" class="common-anchor-header">Analitik dan kueri bergaya SQL<button data-href="#Analytics-and-SQL-style-querying" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus sedang memperluas mesin kuerinya sehingga aplikasi dapat mengurutkan dan mengagregasi data bersamaan dengan proses pencarian. Tahap berikutnya akan menambahkan join, tampilan termaterialisasi, dan komputasi khusus.</p>
<p><strong>Tersedia di versi 3.0</strong></p>
<p>Kueri dan pencarian mendukung penyortiran dengan <code translate="no">ORDER BY</code>. Aggregasi Kueri menambahkan <code translate="no">GROUP BY</code> untuk menghitung statistik berkelompok.</p>
<p><strong>Direncanakan untuk versi 3.1</strong></p>
<ul>
<li><strong>Kueri yang lebih kaya:</strong> Memperkenalkan join, dimulai dengan semi-join, dan Koleksi Tampilan Materialized.</li>
<li><strong>Pembaruan data dan integritas:</strong> Mendukung pembaruan di tempat (in-place updates) dan deduplikasi kunci utama selama proses pengambilan data.</li>
<li><strong>Iterasi kueri dan semantik JSON:</strong> Menambahkan iterator kueri berstatus, JSON <code translate="no">GROUP BY</code>, serta semantik NULL SQL / JSON.</li>
<li><strong>Komputasi khusus:</strong> Mendukung fungsi yang ditentukan pengguna (UDF) Python.</li>
</ul>
<h2 id="Flexible-schema-and-data-types" class="common-anchor-header">Skema dan tipe data yang fleksibel<button data-href="#Flexible-schema-and-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Pekerjaan skema berfokus pada pengembangan koleksi yang ada dan merepresentasikan rentang data yang lebih luas. Hal ini mencakup perubahan bidang, struktur multi-vektor, teks panjang, dan kedaluwarsa entitas.</p>
<p><strong>Tersedia di versi 3.0</strong></p>
<ul>
<li><strong>Perubahan skema online:</strong> Koleksi yang ada mendukung penambahan bidang secara online, termasuk bidang vektor dan <code translate="no">Array&lt;Struct&gt;</code>. Penghapusan bidang tersedia dalam <strong>versi pratinjau</strong> dan mungkin memiliki batasan.</li>
<li><strong>Pengisian ulang (backfill) untuk data yang sudah ada:</strong> Pengisian ulang eksternal menggunakan Spark Connector. Pengisian ulang internal melampirkan fungsi BM25 atau MinHash ke suatu koleksi dan menghitung hasilnya berdasarkan data yang sudah ada.</li>
<li><strong>Data teks dan multi-vektor:</strong> Tipe ` <code translate="no">TEXT</code> ` menyimpan teks panjang, sedangkan `StructArray` mendukung pengambilan data interaksi terlambat melalui ` <code translate="no">MAX_SIM</code>`. ` <code translate="no">TEXT</code> ` memerlukan aktivasi Storage V3.</li>
<li><strong>Nilai NULL dan masa berlaku:</strong> Bidang vektor menerima nilai NULL, dan masa berlaku (TTL) tingkat entitas mengontrol masa berlakunya.</li>
</ul>
<p><strong>Direncanakan untuk 3.0.x</strong></p>
<p>Peningkatan skema yang direncanakan memperluas dukungan StructArray untuk tipe, nilai NULL, serta penambahan dan penghapusan bidang. Peningkatan ini juga menambahkan dukungan rumus molekul serta filter " <code translate="no">IS NULL</code> " dan " <code translate="no">IS NOT NULL</code> " untuk bidang vektor.</p>
<p><strong>Direncanakan untuk versi 3.1</strong></p>
<p>Perluasan model data berikutnya mencakup JSON dan Struct bersarang, kunci utama gabungan, koleksi tanpa bidang vektor, serta vektor jarang dalam StructList.</p>
<h2 id="Lake-integration-and-data-versioning" class="common-anchor-header">Integrasi Lake dan versi data<button data-href="#Lake-integration-and-data-versioning" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus sedang mengembangkan integrasi yang lebih erat dengan penyimpanan lake dan pemrosesan batch. Koleksi eksternal menyediakan akses ke data di tempat asalnya, sementara snapshot menjadi dasar untuk versi data.</p>
<p><strong>Tersedia di versi 3.0</strong></p>
<ul>
<li><strong>Akses data eksternal:</strong> Koleksi Eksternal mendukung data Lance, Parquet, dan Iceberg.</li>
<li><strong>Snapshot dan integrasi batch:</strong> Snapshot menangkap versi data koleksi, dan Spark Connector mendukung alur kerja batch.</li>
<li><strong>Fondasi penyimpanan:</strong> Storage V3 (Loon) menyediakan dukungan Vortex dan Lance yang dapat diaktifkan secara opsional. Fitur ini dinonaktifkan secara default dan dapat diaktifkan melalui <code translate="no">common.storage.useLoonFFI</code>. Baik Snapshot maupun <code translate="no">TEXT</code> bergantung padanya.</li>
</ul>
<p><strong>Direncanakan untuk 3.0.x</strong></p>
<p>Peningkatan yang direncanakan memungkinkan snapshot koleksi Milvus berfungsi sebagai koleksi eksternal. Dukungan tabel eksternal juga diperluas ke pemecahan JSON, penambahan bidang fungsi, dan penghapusan bidang.</p>
<p><strong>Direncanakan untuk versi 3.1</strong></p>
<p>Rencana tersebut mencakup indeks sparse dan skalar berbasis S3, serta penghapusan melalui impor.</p>
<h2 id="Performance-indexing-and-scale" class="common-anchor-header">Kinerja, pengindeksan, dan skalabilitas<button data-href="#Performance-indexing-and-scale" class="anchor-icon" translate="no">
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
    </button></h2><p>Peta jalan kinerja mencakup indeks pengambilan, eksekusi kueri, dan pertumbuhan kluster. Peta jalan ini juga membahas pemulihan dan kueri yang harus membaca data dari penyimpanan objek.</p>
<p><strong>Tersedia di versi 3.0</strong></p>
<ul>
<li><strong>Pengindeksan spars:</strong> Perombakan indeks spars memperkenalkan SINDI.</li>
<li><strong>Pilihan indeks:</strong> Indeks passthrough " <code translate="no">FAISS</code> " menerima string pabrik indeks Faiss, dengan opsi termasuk SVS, Panorama, PQ, IVFPQ, dan ScaNN. Pengindeksan DiskANN juga tersedia untuk daftar tertanam (EmbList).</li>
<li><strong>Pemadatan:</strong> Force Merge memberikan kontrol eksplisit atas penggabungan segmen.</li>
</ul>
<p><strong>Direncanakan untuk versi 3.1</strong></p>
<ul>
<li><strong>Kueri yang sadar penyimpanan:</strong> Tambahkan predikat pushdown untuk Vortex, termasuk pemangkasan tingkat halaman dan indeks lompatan.</li>
<li><strong>Pertumbuhan kluster dan multi-tenancy:</strong> Mendukung pemisahan shard, kunci sharding kustom, dan optimasi multi-tenancy.</li>
<li><strong>Eksekusi kueri dan pengindeksan:</strong> Mengembangkan QueryView, meningkatkan dukungan untuk koleksi luas, pengurangan hasil aliran, dan mendukung beberapa indeks.</li>
<li><strong>Keandalan penulisan:</strong> Mendukung penulisan idempoten.</li>
<li><strong>Caching penyimpanan objek:</strong> Gunakan Talon sebagai cache S3 untuk meningkatkan pemulihan kegagalan dan kinerja kueri yang jarang diakses.</li>
</ul>
<h2 id="Beyond-31" class="common-anchor-header">Melampaui versi 3.1<button data-href="#Beyond-31" class="anchor-icon" translate="no">
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
    </button></h2><p>Pekerjaan jangka panjang mencakup perjalanan waktu dan rollback snapshot. Ruang lingkup serta jadwal rilisnya masih akan dikonfirmasi.</p>
<h2 id="Help-shape-the-roadmap" class="common-anchor-header">Bantu bentuk peta jalan<button data-href="#Help-shape-the-roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagikan beban kerja, batasan, dan permintaan fitur yang penting bagi aplikasi Anda di <a href="https://github.com/milvus-io/milvus/discussions">GitHub Discussions</a>. Laporkan bug melalui <a href="https://github.com/milvus-io/milvus/issues">GitHub Issues</a>.</p>
<p>Untuk berkontribusi pada kode atau dokumentasi, mulailah dengan <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">Panduan Kontributor</a>.</p>
