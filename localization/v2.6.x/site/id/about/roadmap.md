---
id: roadmap.md
title: Peta Jalan Milvus
related_key: Milvus roadmap
summary: >-
  Milvus adalah basis data vektor sumber terbuka yang dibangun untuk mendukung
  aplikasi AI. Berikut ini adalah peta jalan kami untuk memandu pengembangan
  kami.
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 Menuju Basis Data Multimodal dan Data Lake Generasi Berikutnya<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
<p>Kami mengantarkan Milvus ke era baru - basis data multimodal generasi berikutnya - yang mencakup <strong>data terstruktur hingga data tidak terstruktur</strong>, <strong>pengambilan data secara real-time hingga analitik offline</strong>, dan <strong>kinerja cluster tunggal hingga arsitektur data lake global.</strong></p>
<p>Peta jalan ini menguraikan tujuan utama untuk <strong>Milvus v2.6 (sedang dalam proses)</strong>, <strong>Milvus v3.0 (ditargetkan pada akhir tahun 2026)</strong>, dan <strong>Milvus v3.1 (pengembangan jangka panjang)</strong>, beserta rencana evolusi untuk <strong>Vector Lake (data lake / Loon)</strong>.</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6 (Sedang dalam Proses)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Garis waktu: Pertengahan 2025 - Akhir 2025</strong></p>
<p>Fokus: <strong>Meningkatkan model data</strong>, <strong>melakukan refactoring pada arsitektur streaming</strong>, <strong>membangun kemampuan tiering panas/dingin</strong>, dan meluncurkan <strong>Prototipe Vector Lake (v0.1)</strong>.</p>
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header">🔹 <strong>Peningkatan Model Data</strong></h4><ul>
<li><p>Memperkenalkan tipe data <strong>Tensor / StructList</strong> terpadu untuk mendukung struktur penyematan multi-vektor, memungkinkan kompatibilitas dengan <em>ColBERT</em>, <em>CoLQwen</em>, <em>video</em>, dan <em>vektor multimodal</em>.</p></li>
<li><p>Menambahkan dukungan <strong>Geo Data</strong>, termasuk titik, wilayah, dan pengindeksan spasial (berdasarkan <em>libspatial</em>), untuk memperluas kasus penggunaan dalam LBS dan GIS.</p></li>
<li><p>Dukungan untuk <strong>Timestamp dengan</strong> tipe data <strong>Timezone</strong>.</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header"><strong>🔹 Refaktor Arsitektur StreamNode</strong></h4><ul>
<li><p>Menulis ulang pipeline streaming ingestion untuk mengoptimalkan penulisan tambahan dan komputasi real-time.</p></li>
<li><p>Secara signifikan meningkatkan kinerja dan stabilitas konkurensi, meletakkan dasar untuk pemrosesan real-time dan offline yang terpadu.</p></li>
<li><p>Memperkenalkan mesin antrean pesan yang baru: <strong>Burung</strong> Pelatuk.</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header">🔹 <strong>Arsitektur Tiering &amp; Penyimpanan Panas/Dingin (StorageV2)</strong></h4><ul>
<li><p>Mendukung format penyimpanan ganda: <strong>Parquet</strong> dan <strong>Vortex</strong>, meningkatkan konkurensi dan efisiensi memori.</p></li>
<li><p>Menerapkan penyimpanan berjenjang dengan pemisahan data panas/dingin secara otomatis dan penjadwalan yang cerdas.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹 <strong>Prototipe Danau Vektor (v0.1)</strong></h4><ul>
<li><p>Terintegrasi dengan <strong>Spark</strong> / <strong>DuckDB</strong> / <strong>DataFusion</strong> melalui FFI, memungkinkan evolusi skema offline dan kueri KNN.</p></li>
<li><p>Menyediakan visualisasi data multimodal dan demo Spark ETL, membangun arsitektur data lake yang mendasar.</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Late-2026" class="common-anchor-header">🌠 Milvus v3.0 (Ditargetkan pada Akhir 2026)<button data-href="#🌠-Milvus-v30-Targeted-for-Late-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Garis waktu: Akhir 2025 - Awal 2026</strong></p>
<p>Fokus: Peningkatan komprehensif pada <strong>pengalaman pencarian</strong>, <strong>fleksibilitas skema</strong>, dan <strong>dukungan data tak terstruktur</strong>, bersamaan dengan rilis <strong>Vector Lake (v0.2)</strong>.</p>
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header"><strong>🔹 Perombakan Pengalaman Pencarian</strong></h4><ul>
<li><p>Memperkenalkan pencarian kemiripan <strong>More Like This (MLT)</strong> dengan dukungan untuk pencarian dengan posisi atau contoh negatif.</p></li>
<li><p>Menambahkan kemampuan pencarian semantik seperti <strong>penyorotan</strong> dan <strong>peningkatan</strong>.</p></li>
<li><p>Mendukung <strong>kamus khusus</strong> dan <strong>tabel sinonim</strong>, yang memungkinkan definisi aturan leksikal dan semantik pada lapisan Penganalisis.</p></li>
<li><p>Memperkenalkan kemampuan <strong>agregasi</strong> untuk kueri.</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹 <strong>Multi-Tenancy &amp; Manajemen Sumber Daya</strong></h4><ul>
<li><p>Mengaktifkan penghapusan multi-penyewa, statistik, dan tiering panas/dingin.</p></li>
<li><p>Meningkatkan isolasi sumber daya dan strategi penjadwalan untuk mendukung jutaan tabel dalam satu cluster.</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header"><strong>🔹 Peningkatan Skema &amp; Kunci Utama</strong></h4><ul>
<li><p>Menerapkan <strong>Deduplikasi Kunci Utama Global (Global PK Dedup</strong> ) untuk menjamin konsistensi dan keunikan data.</p></li>
<li><p>Mendukung <strong>manajemen skema yang fleksibel</strong> (menambah/menghapus kolom, pengisian cadangan).</p></li>
<li><p>Mengizinkan <strong>nilai NULL</strong> dalam bidang vektor.</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header">🔹 <strong>Tipe Data Tidak Terstruktur yang Diperluas (BLOB / Teks)</strong></h4><ul>
<li><p>Memperkenalkan <strong>tipe BLOB</strong>, yang menyediakan penyimpanan dan referensi asli untuk data biner seperti file, gambar, dan video.</p></li>
<li><p>Memperkenalkan <strong>tipe TEXT</strong>, yang menyediakan kemampuan pencarian berbasis teks lengkap dan konten yang disempurnakan.</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header">🔹 <strong>Kemampuan Kelas Perusahaan</strong></h4><ul>
<li><p>Mendukung pencadangan <strong>dan pemulihan berbasis Snapshot</strong>.</p></li>
<li><p>Menyediakan <strong>penelusuran ujung ke ujung</strong> dan pencatatan <strong>audit</strong>.</p></li>
<li><p>Menerapkan <strong>Ketersediaan Tinggi Siaga Aktif (HA)</strong> di seluruh penerapan multi-cluster.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹 <strong>Vector Lake (v0.2)</strong></h4><ul>
<li><p>Mendukung <strong>penyimpanan TEXT / BLOB</strong> dan <strong>manajemen snapshot multi-versi</strong>.</p></li>
<li><p>Mengintegrasikan Spark untuk pengindeksan offline, pengelompokan, deduplikasi, dan tugas pengurangan dimensi.</p></li>
<li><p>Menghadirkan <strong>demo cold-query ChatPDF dan benchmark offline</strong>.</p></li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">Milvus v3.1 (Visi Jangka Panjang)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Garis waktu: Pertengahan 2026</strong></p>
<p>Fokus: <strong>Fungsi yang ditentukan pengguna (UDF</strong>), <strong>integrasi komputasi terdistribusi</strong>, <strong>pengoptimalan kueri skalar</strong>, <strong>sharding dinamis</strong>, dan rilis resmi <strong>Vector Lake (v1.0)</strong>.</p>
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹 <strong>UDF &amp; Ekosistem Komputasi Terdistribusi</strong></h4><ul>
<li><p>Mendukung <strong>User-Defined Functions (UDF)</strong>, yang memungkinkan pengembang untuk menyuntikkan logika khusus ke dalam alur kerja pengambilan dan komputasi.</p></li>
<li><p>Integrasi mendalam dengan <strong>Ray Dataset / Daft</strong> untuk eksekusi UDF terdistribusi dan pemrosesan data multimodal.</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header"><strong>🔹 Kueri Skalar &amp; Evolusi Format Lokal</strong></h4><ul>
<li><p>Mengoptimalkan kinerja pemfilteran dan agregasi untuk bidang skalar.</p></li>
<li><p>Meningkatkan evaluasi ekspresi dan eksekusi yang dipercepat dengan indeks.</p></li>
<li><p>Mendukung <strong>pembaruan di tempat</strong> untuk format file lokal.</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹 <strong>Kemampuan Pencarian Tingkat Lanjut</strong></h4><ul>
<li><p>Menambahkan fitur-fitur berikut: Kueri <strong>pencocokan</strong> <strong>RankBy</strong>, <strong>OrderBy</strong>, <strong>Facet</strong>, dan <strong>Fuzzy</strong>.</p></li>
<li><p>Tingkatkan pengambilan teks dengan dukungan untuk:</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹 <strong>Pemecahan &amp; Skalabilitas Dinamis</strong></h4><ul>
<li><p>Aktifkan <strong>pemisahan pecahan otomatis</strong> dan <strong>penyeimbangan beban</strong> untuk penskalaan yang mulus.</p></li>
<li><p>Meningkatkan <strong>pembuatan indeks global</strong> dan memastikan <strong>kinerja pencarian yang terdistribusi</strong>.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹 <strong>Vector Lake V1.0</strong></h4><ul>
<li><p>Integrasi mendalam dengan <strong>Ray / Daft / PyTorch</strong> untuk mendukung UDF terdistribusi dan kasus penggunaan Rekayasa Konteks.</p></li>
<li><p>Menyediakan <strong>demo RAG (Retrieval-Augmented Generation)</strong> <strong>dan mengimpor dari tabel Iceberg</strong>.</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Bersama Membangun Masa Depan Milvus<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus adalah proyek sumber terbuka yang digerakkan oleh komunitas pengembang global.</p>
<p>Kami dengan hangat mengundang semua anggota komunitas untuk membantu membentuk basis data multimodal generasi berikutnya:</p>
<ul>
<li><p><strong>💬 Memberikan umpan balik</strong>: Mengusulkan fitur-fitur baru atau ide pengoptimalan</p></li>
<li><p>🐛 <strong>Melaporkan masalah</strong>: Mengajukan bug melalui Masalah GitHub</p></li>
<li><p>🔧 <strong>Kontribusi kode</strong>: Mengirimkan PR dan membantu membangun fitur inti</p>
<ul>
<li><p><strong>Tarik permintaan</strong>: Berkontribusi langsung ke <a href="https://github.com/milvus-io/milvus/pulls">basis kode</a> kami. Baik itu memperbaiki bug, menambahkan fitur, atau meningkatkan dokumentasi, kontribusi Anda diterima.</p></li>
<li><p><strong>Panduan pengembangan</strong>: Lihat <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Panduan Kontributor</a> kami untuk panduan kontribusi kode.</p></li>
</ul></li>
<li><p><strong>Menyebarkan berita</strong>: Bagikan praktik terbaik dan kisah sukses</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
