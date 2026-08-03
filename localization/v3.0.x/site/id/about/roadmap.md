---
id: roadmap.md
title: Peta Jalan Milvus
related_key: Milvus roadmap
summary: >-
  Milvus adalah basis data vektor sumber terbuka yang dirancang untuk mendukung
  aplikasi kecerdasan buatan. Berikut adalah peta jalan kami yang akan menjadi
  panduan dalam proses pengembangan.
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="common-anchor-header">🌌 Menuju Basis Data Multimodal Generasi Berikutnya dan Vector Lakebase<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Peta Jalan Produk Milvus</strong></p>
<p>Selamat datang di Peta Jalan Milvus!</p>
<p>Kami membawa Milvus ke era baru — basis data multimodal generasi berikutnya — <strong>yang mencakup data terstruktur hingga tidak terstruktur, pencarian real-time hingga analitik offline, serta kinerja kluster tunggal hingga</strong> <strong>arsitektur Vector Lakebase</strong> <strong>global</strong> <strong>.</strong></p>
<p>Peta jalan ini menguraikan tujuan inti untuk <strong>Milvus v3.0 (beta publik)</strong> dan <strong>Milvus v3.1 (pengembangan jangka panjang)</strong>, beserta rencana evolusi untuk <strong>Zilliz Vector Lakebase</strong>.</p>
<h2 id="🌠-Milvus-v30-Public-Beta" class="common-anchor-header">🌠 Milvus v3.0 (Beta Publik)<button data-href="#🌠-Milvus-v30-Public-Beta" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Beta Publik: Mei 2026</strong></p>
<p>Fokus: Membangun <strong>mesin kueri semantik-native</strong> dengan penyortiran, agregasi, dan pengambilan multi-vektor di dalam mesin, serta <strong>fondasi lake-native dari Zilliz Vector Lakebase</strong> sehingga komputasi dapat menjangkau data tanpa migrasi.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Sorotan Utama<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Schema--Data-Type-Evolution" class="common-anchor-header">🔹 <strong>Evolusi Skema &amp; Tipe Data</strong></h4><ul>
<li>Mendukung ALTER COLLECTION ADD COLUMN dan DROP COLUMN saat runtime tanpa perlu membangun ulang indeks atau mengganggu layanan.</li>
<li>Menyediakan <strong>dua jalur backfill</strong> untuk kolom baru: eksternal melalui Spark Connector, dan internal dengan vektor sparse BM25 yang dihasilkan secara otomatis pada saat penulisan.</li>
<li>Memperkenalkan <strong>TEXT</strong> sebagai tipe data kelas satu yang menyimpan teks asli bersama vektor dengan dukungan BM25 dan pencocokan teks.</li>
</ul>
<h4 id="🔹-Query-Execution-Overhaul" class="common-anchor-header">🔹 <strong>Perombakan Eksekusi</strong> <strong>Kueri</strong> </h4><ul>
<li>Memasukkan <strong>Order By</strong> ke dalam mesin dengan penyortiran per-segmen dan penyortiran gabungan di seluruh node kueri.</li>
<li>Menambahkan <strong>agregasi</strong> <strong>kueri</strong> bergaya SQL (GROUP BY dengan COUNT, SUM, AVG, MIN, MAX) yang dihitung di kernel.</li>
<li>Perkenalkan <strong>facet pencarian</strong> pada hasil ANN dengan statistik per-bucket dan sub-facet bersarang di sisi server.</li>
<li>Mendukung <strong>kamus khusus</strong> dan tabel sinonim yang terdaftar di sisi klaster untuk meningkatkan recall CJK dan domain-spesifik.</li>
</ul>
<h4 id="🔹-Multi-Vector--Late-Interaction-Support" class="common-anchor-header">🔹 <strong>Dukungan Multi-Vektor &amp; Interaksi Terlambat</strong></h4><ul>
<li>Perkenalkan <strong>StructList</strong> untuk merepresentasikan satu entitas sebagai satu baris dengan banyak vektor, dengan dukungan interaksi terlambat bawaan (ColBERT, ColPali) melalui MAX_SIM.</li>
<li>Mendukung <strong>pencarian tingkat elemen dan tingkat entitas</strong> pada bidang StructList, dengan kebijakan pencocokan yang dapat dikonfigurasi untuk hasil tingkat entitas.</li>
<li>Menambahkan tiga <strong>strategi pengambilan multi-vektor</strong>: TokenANN (menyeluruh), Muvera (berbasis proyeksi, tanpa pelatihan), dan Lemur (kompresi yang dipelajari).</li>
</ul>
<h4 id="🔹-Retrieval--Index-Overhaul" class="common-anchor-header">🔹 <strong>Perombakan Pencarian &amp; Indeks</strong></h4><ul>
<li>Perbaikan <strong>indeks terbalik spars</strong> dengan kompresi blok, kuantisasi bobot, dan format yang disimpan; memperkenalkan <strong>SINDI</strong> sebagai algoritma IP spars default.</li>
<li>Memperluas cakupan indeks dengan seluruh <strong>keluarga Faiss</strong> (SVS, Panorama, PQ, IVFPQ, ScaNN) dan <strong>MinHash DIDO</strong> untuk deteksi duplikat yang hampir sama.</li>
<li>Mendukung <strong>bidang vektor yang dapat bernilai null</strong> untuk embedding asinkron dan modalitas yang hilang, dengan penyaringan otomatis pada saat pencarian.</li>
</ul>
<h4 id="🔹-Vector-Lakebase-Storage--Compute-Architecture" class="common-anchor-header">🔹 <strong>Arsitektur Penyimpanan &amp; Komputasi Vector Lakebase</strong></h4><ul>
<li>Memperkenalkan <strong>Koleksi Eksternal</strong> untuk mengindeks dan menanyakan data di S3 / GCS / Azure di tempat, dengan dukungan untuk format tabel Lance, Parquet, Iceberg, dan Vortex.</li>
<li>Menambahkan <strong>Vortex</strong>, format kolom terbuka, dan <strong>Loon (Storage V3)</strong>, lapisan penyimpanan format campuran untuk pembacaan titik yang efisien dari penyimpanan objek.</li>
<li>Mendukung <strong>snapshot pada titik waktu tertentu</strong> dengan isolasi bergaya MVCC untuk pemrosesan batch sementara layanan tetap menulis.</li>
<li>Terintegrasi sebagai <strong>Spark DataSource v2</strong> untuk membaca dari dan menulis ke Milvus secara langsung dalam pipa Spark / Databricks / EMR.</li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">🪐 Milvus v3.1 (Visi Jangka Panjang)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Jadwal: Akhir 2026 dan seterusnya</strong></p>
<p>Fokus: <strong>Kecerdasan penyimpanan</strong>, <strong>integritas jalur penulisan</strong>, <strong>kemampuan komputasi yang dapat diperluas</strong>, dan <strong>interoperabilitas</strong> <strong>Vector Lakebase</strong> <strong>yang diperluas</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Sorotan Utama<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Storage--Write-Path" class="common-anchor-header">🔹 <strong>Penyimpanan &amp; Jalur Penulisan</strong></h4><ul>
<li>Menambahkan <strong>predikat pushdown</strong> dengan pemangkasan indeks halaman dan bloom-filter di lapisan penyimpanan.</li>
<li>Menerapkan <strong>deduplikasi kunci utama</strong> pada saat pengambilan data untuk mencegah duplikat saat penulisan.</li>
</ul>
<h4 id="🔹-Compute--Elasticity" class="common-anchor-header">🔹 <strong>Komputasi &amp; Elastisitas</strong></h4><ul>
<li>Mendukung <strong>Fungsi yang Didefinisikan Pengguna (UDF)</strong> untuk menjalankan logika khusus di dalam mesin, pada data plane.</li>
<li>Aktifkan <strong>pemisahan shard</strong> untuk membagi ulang shard seiring pertumbuhan data, dengan dukungan kunci sharding khusus.</li>
</ul>
<h4 id="🔹-Spark--Vector-Lakebase-Expansion" class="common-anchor-header">🔹 <strong>Perluasan</strong> <strong>Spark &amp;</strong> <strong>Vector Lakebase</strong> </h4><ul>
<li>Perluas konektor Spark dengan pustaka <strong>operator batch asli</strong> yang lebih lengkap.</li>
<li>Menambahkan kemampuan <strong>format tabel</strong> termasuk time-travel, evolusi skema, dan rollback snapshot.</li>
<li>Perluas interoperabilitas Vector Lakebase dengan <strong>indeks eksternal CDC-fresh</strong>, dukungan Apache Paimon, dan format data tambahan.</li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Bersama-sama Membangun Masa Depan Milvus<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus adalah proyek sumber terbuka yang digerakkan oleh komunitas pengembang global. Kami mengundang seluruh anggota komunitas untuk turut membentuk basis data multimodal generasi berikutnya:</p>
<ul>
<li><p>💬 <strong>Berikan masukan</strong>: Usulkan fitur baru atau ide optimasi di <a href="https://github.com/milvus-io/milvus/discussions">GitHub Discussions</a>.</p></li>
<li><p>🐛 <strong>Laporkan masalah</strong>: Laporkan bug melalui <a href="https://github.com/milvus-io/milvus/issues">GitHub Issues</a>.</p></li>
<li><p>🔧 <strong>Berkontribusi dengan kode</strong>: Kirimkan PR dan bantu membangun fitur inti.</p>
<ul>
<li><strong>Pull request</strong>: Berkontribusi langsung ke <a href="https://github.com/milvus-io/milvus/pulls">basis kode</a> kami. Baik Anda memperbaiki bug, menambahkan fitur, atau menyempurnakan dokumentasi, kontribusi Anda sangat kami hargai.</li>
<li><strong>Panduan pengembangan</strong>: Lihat <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">Panduan Kontributor</a> kami untuk panduan mengenai kontribusi kode.</li>
</ul></li>
<li><p>🗣️ <strong>Bergabunglah dalam percakapan</strong>: Ajukan pertanyaan dan temui pengelola di <a href="https://milvus.io/discord">Discord</a>, di <a href="https://meetings.hubspot.com/chloe-williams1/milvus-meeting">Milvus Office Hours</a>, atau di <a href="https://milvus.io/community">seluruh saluran komunitas</a>.</p></li>
<li><p>⭐ <strong>Sebarkan berita ini</strong>: Bagikan praktik terbaik dan kisah sukses, serta ikuti Milvus di <a href="https://twitter.com/milvusio">X</a>, <a href="https://www.linkedin.com/company/the-milvus-project/">LinkedIn</a>, dan <a href="https://www.youtube.com/c/MilvusVectorDatabase">YouTube</a>.</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
