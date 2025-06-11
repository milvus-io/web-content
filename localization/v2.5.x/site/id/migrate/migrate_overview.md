---
id: migrate_overview.md
summary: >-
  Artikel ini memberikan gambaran umum tentang alat migrasi Milvus, termasuk
  migrasi yang didukung, fitur, dan arsitektur.
title: Gambaran Umum Migrasi Milvus
---

<h1 id="Milvus-Migration-Overview" class="common-anchor-header">Gambaran Umum Migrasi Milvus<button data-href="#Milvus-Migration-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Menyadari beragamnya kebutuhan pengguna, Milvus telah memperluas alat migrasi untuk tidak hanya memfasilitasi peningkatan dari versi Milvus 1.x sebelumnya, tetapi juga untuk memungkinkan integrasi data yang lancar dari sistem lain seperti <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html">Elasticsearch</a> dan <a href="https://github.com/facebookresearch/faiss">Faiss</a>. Proyek <a href="https://github.com/zilliztech/milvus-migration">migrasi Milvus</a> dirancang untuk menjembatani kesenjangan antara lingkungan data yang bervariasi ini dan kemajuan terbaru dalam teknologi Milvus, memastikan Anda dapat memanfaatkan fitur dan kinerja yang lebih baik dengan mulus.</p>
<h2 id="Supported-migrations" class="common-anchor-header">Migrasi yang didukung<button data-href="#Supported-migrations" class="anchor-icon" translate="no">
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
    </button></h2><p>Alat <a href="https://github.com/zilliztech/milvus-migration">migrasi Milvus</a> mendukung berbagai jalur migrasi untuk mengakomodasi kebutuhan pengguna yang berbeda:</p>
<ul>
<li><a href="/docs/id/v2.5.x/es2m.md">Elasticsearch ke Milvus 2.x</a>: Memungkinkan pengguna untuk memigrasikan data dari lingkungan Elasticsearch untuk memanfaatkan kemampuan pencarian vektor yang dioptimalkan dari Milvus.</li>
<li><a href="/docs/id/v2.5.x/f2m.md">Faiss ke Milvus 2.x</a>: Menyediakan dukungan eksperimental untuk mentransfer data dari Faiss, sebuah pustaka populer untuk pencarian kesamaan yang efisien.</li>
<li><a href="/docs/id/v2.5.x/m2m.md">Milvus 1.x ke Milvus 2.x</a>: Memastikan data dari versi sebelumnya ditransisikan dengan lancar ke kerangka kerja terbaru.</li>
<li><a href="/docs/id/v2.5.x/from-m2x.md">Milvus 2.3.x ke Milvus 2.3.x atau yang lebih baru</a>: Menyediakan jalur migrasi satu kali untuk pengguna yang telah bermigrasi ke 2.3.x.</li>
</ul>
<h2 id="Features" class="common-anchor-header">Fitur<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-migrasi dirancang dengan fitur-fitur yang kuat untuk menangani beragam skenario migrasi:</p>
<ul>
<li>Berbagai metode interaksi: Anda dapat melakukan migrasi melalui antarmuka baris perintah atau melalui API Restful, dengan fleksibilitas dalam cara migrasi dijalankan.</li>
<li>Dukungan untuk berbagai format file dan penyimpanan awan: Alat <a href="https://github.com/zilliztech/milvus-migration">migrasi Milvus</a> dapat menangani data yang disimpan dalam file lokal maupun dalam solusi penyimpanan awan seperti S3, OSS, dan GCP, memastikan kompatibilitas yang luas.</li>
<li>Penanganan tipe data: <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> mampu menangani data vektor dan bidang skalar, menjadikannya pilihan serbaguna untuk kebutuhan migrasi data yang berbeda.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">Arsitektur<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Arsitektur <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> dirancang secara strategis untuk memfasilitasi proses streaming, penguraian, dan penulisan data yang efisien, sehingga memungkinkan kemampuan migrasi yang kuat di berbagai sumber data.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-migration-architecture.jpeg" alt="Milvus-migration architecture" class="doc-image" id="milvus-migration-architecture" />
   </span> <span class="img-wrapper"> <span>Arsitektur migrasi Milvus</span> </span></p>
<p>Pada gambar sebelumnya:</p>
<ul>
<li><strong>Sumber data</strong>: <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> mendukung berbagai sumber data termasuk Elasticsearch melalui <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/scroll-api.html">API gulir</a>, file data penyimpanan lokal atau cloud, dan basis data Milvus 1.x. Semua ini diakses dan dibaca dengan cara yang efisien untuk memulai proses migrasi.</li>
<li><strong>Pipa aliran</strong>:<ul>
<li><strong>Proses penguraian</strong>: Data dari sumber diurai sesuai dengan formatnya. Misalnya, untuk sumber data dari Elasticsearch, parser format Elasticsearch digunakan, sementara format lain menggunakan parser masing-masing. Langkah ini sangat penting untuk mengubah data mentah menjadi format terstruktur yang dapat diproses lebih lanjut.</li>
<li><strong>Proses konversi</strong>: Setelah penguraian, data mengalami konversi di mana bidang disaring, tipe data dikonversi, dan nama tabel disesuaikan sesuai dengan target skema Milvus 2.x. Hal ini memastikan bahwa data sesuai dengan struktur dan tipe yang diharapkan dalam Milvus.</li>
</ul></li>
<li><strong>Penulisan dan pemuatan data</strong>:<ul>
<li><strong>Menulis data</strong>: Data yang telah diproses ditulis ke dalam file JSON atau NumPy perantara, yang siap untuk dimuat ke dalam Milvus 2.x.</li>
<li><strong>Memuat data</strong>: Data akhirnya dimuat ke dalam Milvus 2.x menggunakan operasi <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">BulkInsert</a>, yang secara efisien menulis data dalam jumlah besar ke dalam sistem penyimpanan Milvus, baik yang berbasis cloud maupun filestore.</li>
</ul></li>
</ul>
<h2 id="Future-plans" class="common-anchor-header">Rencana masa depan<button data-href="#Future-plans" class="anchor-icon" translate="no">
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
    </button></h2><p>Tim pengembang berkomitmen untuk meningkatkan <a href="https://github.com/zilliztech/milvus-migration">migrasi Milvus</a> dengan fitur-fitur seperti:</p>
<ul>
<li><strong>Dukungan untuk lebih banyak sumber data</strong>: Berencana untuk memperluas dukungan untuk database dan sistem file tambahan, seperti Pinecone, Chroma, Qdrant. Jika Anda membutuhkan dukungan untuk sumber data tertentu, silakan kirimkan permintaan Anda melalui <a href="https://github.com/zilliztech/milvus-migration/issues">tautan masalah GitHub</a> ini.</li>
<li><strong>Penyederhanaan perintah</strong>: Upaya untuk menyederhanakan proses perintah agar lebih mudah dieksekusi.</li>
<li>Pengurai / <strong>konversi</strong><strong>SPI</strong>: Arsitektur ini diharapkan dapat menyertakan alat bantu Service Provider Interface (SPI) untuk penguraian dan konversi. Alat-alat ini memungkinkan implementasi khusus yang dapat disambungkan oleh pengguna ke dalam proses migrasi untuk menangani format data atau aturan konversi tertentu.</li>
<li><strong>Memulai kembali pos pemeriksaan</strong>: Memungkinkan migrasi dilanjutkan dari checkpoint terakhir untuk meningkatkan keandalan dan efisiensi jika terjadi gangguan. Titik penyimpanan akan dibuat untuk memastikan integritas data dan disimpan dalam database seperti SQLite atau MySQL untuk melacak kemajuan proses migrasi.</li>
</ul>
