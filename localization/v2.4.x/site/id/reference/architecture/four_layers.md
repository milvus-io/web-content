---
id: four_layers.md
summary: Struktur pemilahan penyimpanan/komputasi di Milvus.
title: Pemilahan Penyimpanan/Komputasi
---
<h1 id="StorageComputing-Disaggregation" class="common-anchor-header">Pemilahan Penyimpanan/Komputasi<button data-href="#StorageComputing-Disaggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>Mengikuti prinsip disagregasi bidang data dan bidang kontrol, Milvus terdiri dari empat lapisan yang saling independen dalam hal skalabilitas dan pemulihan bencana.</p>
<h2 id="Access-layer" class="common-anchor-header">Lapisan akses<button data-href="#Access-layer" class="anchor-icon" translate="no">
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
    </button></h2><p>Terdiri dari sekelompok proksi tanpa kewarganegaraan, lapisan akses adalah lapisan depan sistem dan titik akhir bagi pengguna. Lapisan ini memvalidasi permintaan klien dan mengurangi hasil yang dikembalikan:</p>
<ul>
<li>Proksi itu sendiri tidak memiliki kewarganegaraan. Ia menyediakan alamat layanan terpadu menggunakan komponen penyeimbang beban seperti Nginx, Kubernetes Ingress, NodePort, dan LVS.</li>
<li>Karena Milvus menggunakan arsitektur pemrosesan paralel masif (MPP), proksi mengumpulkan dan memproses hasil antara sebelum mengembalikan hasil akhir ke klien.</li>
</ul>
<h2 id="Coordinator-service" class="common-anchor-header">Layanan koordinator<button data-href="#Coordinator-service" class="anchor-icon" translate="no">
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
    </button></h2><p>Layanan koordinator memberikan tugas kepada node pekerja dan berfungsi sebagai otak sistem. Tugas-tugas yang dilakukannya meliputi manajemen topologi cluster, penyeimbangan beban, pembuatan stempel waktu, deklarasi data, dan manajemen data.</p>
<p>Ada tiga jenis koordinator: koordinator akar (root coord), koordinator data (data coord), dan koordinator kueri (query coord).</p>
<h3 id="Root-coordinator-root-coord" class="common-anchor-header">Koordinator akar (root coord)</h3><p>Root coord menangani permintaan bahasa definisi data (DDL) dan bahasa kontrol data (DCL), seperti membuat atau menghapus koleksi, partisi, atau indeks, serta mengelola TSO (stempel waktu Oracle) dan penerbitan penunjuk waktu.</p>
<h3 id="Query-coordinator-query-coord" class="common-anchor-header">Koordinator kueri (query coord)</h3><p>Query coord mengelola topologi dan penyeimbangan beban untuk node kueri, dan melakukan handoff dari segmen yang sedang berkembang ke segmen yang disegel.</p>
<h3 id="Data-coordinator-data-coord" class="common-anchor-header">Koordinator data (data coord)</h3><p>Data coord mengelola topologi node data dan node indeks, memelihara metadata, dan memicu flush, compact, dan pembangunan indeks serta operasi data latar belakang lainnya.</p>
<h2 id="Worker-nodes" class="common-anchor-header">Simpul pekerja<button data-href="#Worker-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>Node pekerja adalah eksekutor "bodoh" yang mengikuti instruksi dari layanan koordinator dan menjalankan perintah bahasa manipulasi data (DML) dari proksi. Node pekerja tidak memiliki kewarganegaraan berkat pemisahan penyimpanan dan komputasi, dan dapat memfasilitasi perluasan sistem dan pemulihan bencana saat digunakan pada Kubernetes. Ada tiga jenis simpul pekerja:</p>
<h3 id="Query-node" class="common-anchor-header">Node kueri</h3><p>Node kueri mengambil data log tambahan dan mengubahnya menjadi segmen yang terus bertambah dengan berlangganan ke broker log, memuat data historis dari penyimpanan objek, dan menjalankan pencarian hibrida antara data vektor dan skalar.</p>
<h3 id="Data-node" class="common-anchor-header">Simpul data</h3><p>Simpul data mengambil data log tambahan dengan berlangganan ke log broker, memproses permintaan mutasi, dan mengemas data log ke dalam snapshot log dan menyimpannya di penyimpanan objek.</p>
<h3 id="Index-node" class="common-anchor-header">Simpul indeks</h3><p>Simpul indeks membangun indeks. Node indeks tidak perlu berada di memori, dan dapat diimplementasikan dengan kerangka kerja tanpa server.</p>
<h2 id="Storage" class="common-anchor-header">Penyimpanan<button data-href="#Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Penyimpanan adalah tulang dari sistem, bertanggung jawab atas persistensi data. Ini terdiri dari penyimpanan meta, perantara log, dan penyimpanan objek.</p>
<h3 id="Meta-storage" class="common-anchor-header">Penyimpanan meta</h3><p>Penyimpanan meta menyimpan snapshot metadata seperti skema koleksi, dan pos pemeriksaan konsumsi pesan. Menyimpan metadata menuntut ketersediaan yang sangat tinggi, konsistensi yang kuat, dan dukungan transaksi, sehingga Milvus memilih etcd untuk tujuan ini. Milvus juga menggunakan etcd untuk registrasi layanan dan pemeriksaan kesehatan.</p>
<h3 id="Object-storage" class="common-anchor-header">Penyimpanan objek</h3><p>Penyimpanan objek menyimpan file snapshot dari log, file indeks untuk data skalar dan vektor, dan hasil kueri menengah. Milvus menggunakan MinIO sebagai penyimpanan objek dan dapat dengan mudah digunakan di AWS S3 dan Azure Blob, dua layanan penyimpanan yang paling populer dan hemat biaya di dunia. Namun, penyimpanan objek memiliki latensi akses yang tinggi dan biaya berdasarkan jumlah permintaan. Untuk meningkatkan performa dan menurunkan biaya, Milvus berencana untuk menerapkan pemisahan data dingin-panas pada cache pool berbasis memori atau SSD.</p>
<h3 id="Log-broker" class="common-anchor-header">Pialang log</h3><p>Log broker adalah sistem pub-sub yang mendukung pemutaran. Sistem ini bertanggung jawab untuk streaming persistensi data dan pemberitahuan peristiwa. Ini juga memastikan integritas data tambahan ketika node pekerja pulih dari kerusakan sistem. Milvus Distributed menggunakan Pulsar sebagai log broker sementara Milvus Standalone menggunakan RocksDB. Log broker dapat dengan mudah diganti dengan platform penyimpanan data streaming seperti Kafka.</p>
<p>Milvus mengikuti prinsip "log sebagai data", sehingga Milvus tidak memelihara tabel fisik tetapi menjamin keandalan data melalui persistensi pencatatan dan snapshot log.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/log_mechanism.png" alt="Log_mechanism" class="doc-image" id="log_mechanism" />
   </span> <span class="img-wrapper"> <span>Mekanisme log</span> </span></p>
<p>Log broker adalah tulang punggung Milvus. Ia bertanggung jawab atas persistensi data dan pemilahan baca-tulis, berkat mekanisme pub-sub bawaannya. Ilustrasi di atas menunjukkan penggambaran mekanisme yang disederhanakan, di mana sistem dibagi menjadi dua peran, log broker (untuk menjaga urutan log) dan log subscriber. Yang pertama mencatat semua operasi yang mengubah status koleksi; yang kedua berlangganan urutan log untuk memperbarui data lokal dan menyediakan layanan dalam bentuk salinan hanya-baca. Mekanisme pub-sub juga menyediakan ruang untuk perluasan sistem dalam hal pengambilan data perubahan (CDC) dan penyebaran yang didistribusikan secara global.</p>
<h2 id="Whats-next" class="common-anchor-header">Selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Baca <a href="/docs/id/v2.4.x/main_components.md">Komponen Utama</a> untuk detail lebih lanjut tentang arsitektur Milvus.</li>
</ul>
