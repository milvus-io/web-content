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
    </button></h1><p>Selamat datang di Peta Jalan Milvus! Bergabunglah bersama kami dalam perjalanan berkelanjutan kami untuk meningkatkan dan mengembangkan Milvus. Kami sangat senang berbagi pencapaian, rencana masa depan, dan visi kami untuk masa depan. Roadmap kami lebih dari sekadar daftar fitur-fitur yang akan datang - ini mencerminkan komitmen kami terhadap inovasi dan dedikasi kami untuk bekerja sama dengan komunitas. Kami mengundang Anda untuk mempelajari peta jalan kami, memberikan umpan balik, dan membantu membentuk masa depan Milvus!</p>
<h2 id="Roadmap" class="common-anchor-header">Peta Jalan<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
    </button></h2><table>
    <thead>
        <tr>
            <th>Kategori</th>
            <th>Milvus 2.5.0 (Dicapai dalam rilis terbaru)</th>
            <th>Rilis Berikutnya (Pertengahan CY25)</th>
            <th>Peta Jalan Masa Depan (Dalam 1 tahun)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Pemrosesan Data Tidak Terstruktur Berbasis AI</strong><br/><i>Memperkuat kemampuan untuk memproses dan menganalisis data tidak terstruktur dengan menggunakan model AI dan teknologi canggih</i>.</td>
            <td><strong>Pencarian Teks Lengkap</strong><br/><i>Mendukung pencarian teks lengkap dengan Sparse-BM25. API baru menerima teks sebagai input dan secara otomatis menghasilkan vektor jarang di dalam Milvus</i><br/><br/><strong>Sparse Vector (GA)</strong><br/><i>Mendukung metode penyimpanan dan pengindeksan yang efisien untuk vektor jarang</i><br/></td>
            <td><strong>Data-In dan Data-Out</strong><br/><i>Mendukung layanan model utama untuk menelan data asli</i><br/><br/><strong>Advanced Reranker</strong><br/><i>Mendukung perangking ulang berbasis model dan fungsi penilaian yang ditentukan pengguna</i><br/><br/><strong>Peningkatan JSON</strong><br/><i>Pengindeksan dan penguraian JSON untuk mempercepat pemrosesan</i></td>
            <td><strong>Data Asli Masuk dan Keluar</strong><br/><i>Mendukung Blob dan referensi url untuk memproses data asli</i><br/><br/><strong>Mendukung Lebih Banyak Jenis Data</strong><br/><i>mis. Datetime, Peta, GIS</i><br/><br/><strong>Mendukung Tensor</strong><br/><i>Mendukung daftar vektor, penggunaan umum seperti Colbert, Copali, dll.</i></td>
        </tr>
        <tr>
            <td><strong>Kualitas &amp; Performa Pencarian</strong><br/><i>Memberikan hasil yang akurat, relevan, dan cepat dengan mengoptimalkan arsitektur, algoritme, dan API</i></td>
            <td><strong>Fungsi Pencocokan Teks</strong><br/><i>Memfilter kata kunci/token dengan cepat dalam teks/varchar</i><br/><br/><strong>Peningkatan Pencarian Pengelompokan</strong><br/><i>Memperkenalkan group_size dan menambahkan grup dengan dukungan dalam pencarian hybrid</i><br/><br/><strong>Indeks Bitmap &amp; Indeks Terbalik</strong><br/><i>Mempercepat pemfilteran pada tag</i></td>
            <td><strong>Pencocokan Tingkat Lanjut</strong><br/><i>misal: Pencocokan Frasa, Pencocokan Fuzzy, dan lebih banyak tokenizer</i><br/><br/><strong>Agregasi</strong><br/><i>Agregasi bidang skalar, misal: min, max, count, distinct.</i><br/></td>
            <td><strong>Pembaruan Parsial</strong><br/><i>Mendukung pembaruan untuk nilai bidang tertentu</i><br/><br/><strong>Kemampuan Penyortiran</strong><br/><i>Mengurutkan berdasarkan bidang skalar selama eksekusi</i><br/><br/><strong>Mendukung Pengelompokan Data</strong><br/><i>Lokalitas data</i></td>
        </tr>
        <tr>
            <td><strong>Fungsionalitas &amp; Manajemen yang Kaya</strong><br/><i>Fitur manajemen data yang ramah pengembang dan kuat</i></td>
            <td><strong>Mendukung file CSV dalam impor data</strong><br/><i>Bulkinsert mendukung format CSV</i><br/><br/><strong>Mendukung Nilai Null dan Default</strong><br/><i>Tipe</i> Null<i>dan Default membuat impor data dari DBMS lain menjadi lebih mudah</i><br/><br/><strong>Milvus WebUI (Beta)</strong><br/><i>Alat bantu manajemen visual untuk DBA</i></td>
            <td><strong>Deduplikasi Primary Key</strong><br/><i>Dengan menggunakan indeks pk global</i><br/><br/><strong>Perubahan Skema Online</strong><br/><i>misal: menambah/menghapus field, memodifikasi panjang varchar</i><br/><br/><strong>Data Versioning &amp; Restore</strong><br/><i>Mendukung data versioning dengan snapshot</i></td>
            <td><strong>Rust dan C++ SDK</strong><br/><i>Mendukung lebih banyak klien</i><br/><br/><strong>Mendukung UDF </strong><br/><i>Fungsi yang ditentukan pengguna</i></td>
        </tr>
        <tr>
            <td><strong>Efisiensi Biaya &amp; Arsitektur</strong><br/><i>Sistem yang canggih, mengutamakan stabilitas, efisiensi biaya, dan skalabilitas </i></td>
            <td><strong>Load by Field</strong><br/><i>Pilih bagian dari koleksi yang akan dimuat</i><br/><br/><strong>Pengoptimalan Memori</strong><br/><i>Mengurangi OOM dan peningkatan beban</i><br/><br/><strong>Streaming Node (Beta)</strong><br/><i>Memberikan konsistensi global dan mengatasi hambatan kinerja pada koordinator root</i><br/><br/><strong>Format Penyimpanan V2 (Beta)</strong><br/><i>Desain dan fondasi format universal untuk akses data berbasis disk</i><br/><br/><strong>Pemadatan Clustering</strong><br/><i>Distribusi ulang data berdasarkan konfigurasi untuk mempercepat kinerja pembacaan</i></td>
            <td><strong>Lazy Load</strong><br/><i>Load dapat dimulai dengan operasi baca pertama tanpa secara eksplisit memanggil load()</i><br/><br/> Tiered<strong>Storage</strong><br/><i>Mendukung penyimpanan panas dan dingin untuk optimasi biaya</i><br/><br/><strong>Release by Field</strong><br/><i>Melepaskan bagian dari koleksi untuk mengurangi penggunaan memori</i><br/><br/><strong>Streaming Node (GA)</strong><br/><i>Memproses data streaming dan menyederhanakan arsitektur</i></td>
            <td><i>Menghilangkan</i><strong>ketergantungan</strong><br/><i>Mengurangi atau menghilangkan ketergantungan pada komponen eksternal seperti pulsar, dll.</i><br/><br/><strong>Menggabungkan logika coord ke dalam MixCoord</strong><br/><i>Menyederhanakan arsitektur</i></td>
        </tr>
    </tbody>
</table>
<ul>
<li>Roadmap kami biasanya terstruktur menjadi tiga bagian: rilis terbaru, rilis berikutnya yang akan datang, dan visi jangka menengah hingga jangka panjang dalam satu tahun ke depan.</li>
<li>Seiring dengan perkembangannya, kami terus belajar dan sesekali menyesuaikan fokus kami, menambahkan atau menghapus item sesuai kebutuhan.</li>
<li>Rencana ini bersifat indikatif dan dapat berubah, dan dapat bervariasi berdasarkan layanan berlangganan.</li>
<li>Kami tetap berpegang teguh pada peta jalan kami, dengan <a href="/docs/id/release_notes.md">catatan rilis</a> kami yang berfungsi sebagai referensi.</li>
</ul>
<h2 id="How-to-contribute" class="common-anchor-header">Bagaimana cara berkontribusi<button data-href="#How-to-contribute" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebagai proyek sumber terbuka, Milvus berkembang dengan kontribusi komunitas. Berikut adalah cara Anda dapat menjadi bagian dari perjalanan kami.</p>
<h3 id="Share-feedback" class="common-anchor-header">Berbagi umpan balik</h3><ul>
<li><p>Pelaporan masalah: Menemukan bug atau punya saran? Buka masalah di <a href="https://github.com/milvus-io/milvus/issues">halaman GitHub</a> kami.</p></li>
<li><p>Saran fitur: Punya ide untuk fitur baru atau perbaikan? <a href="https://github.com/milvus-io/milvus/discussions">Kami akan senang mendengarnya!</a></p></li>
</ul>
<h3 id="Code-contributions" class="common-anchor-header">Kontribusi kode</h3><ul>
<li><p>Tarik permintaan: Berkontribusi langsung ke <a href="https://github.com/milvus-io/milvus/pulls">basis kode</a> kami. Baik itu memperbaiki bug, menambahkan fitur, atau meningkatkan dokumentasi, kontribusi Anda diterima.</p></li>
<li><p>Panduan pengembangan: Lihat <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Panduan Kontributor</a> kami untuk panduan kontribusi kode.</p></li>
</ul>
<h3 id="Spread-the-word" class="common-anchor-header">Menyebarkan berita</h3><ul>
<li><p>Berbagi secara sosial: Suka Milvus? Bagikan kasus penggunaan dan pengalaman Anda di media sosial dan blog teknologi.</p></li>
<li><p>Bintangi kami di GitHub: Tunjukkan dukungan Anda dengan membintangi <a href="https://github.com/milvus-io/milvus">repositori GitHub</a> kami.</p></li>
</ul>
