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
<li>Proxy dengan sendirinya tidak memiliki kewarganegaraan. Ia menyediakan alamat layanan terpadu menggunakan komponen penyeimbang beban seperti Nginx, Kubernetes Ingress, NodePort, dan LVS.</li>
<li>Karena Milvus menggunakan arsitektur pemrosesan paralel masif (MPP), proksi mengumpulkan dan memproses hasil antara sebelum mengembalikan hasil akhir ke klien.</li>
</ul>
<h2 id="Coordinator" class="common-anchor-header">Koordinator<button data-href="#Coordinator" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Koordinator</strong> berfungsi sebagai otak Milvus. Setiap saat, ada satu Koordinator yang aktif di seluruh cluster, yang bertanggung jawab untuk menjaga topologi cluster, menjadwalkan semua jenis tugas, dan menjanjikan konsistensi tingkat cluster.</p>
<p>Berikut ini adalah beberapa tugas yang ditangani oleh <strong>Koordinator</strong>:</p>
<ul>
<li><strong>Manajemen DDL/DCL/TSO</strong>: Menangani permintaan bahasa definisi data (DDL) dan bahasa kontrol data (DCL), seperti membuat atau menghapus koleksi, partisi, atau indeks, serta mengelola cap waktu Oracle (TSO) dan penerbitan penanda waktu.</li>
<li><strong>Manajemen Layanan Streaming</strong>: Mengikat Write-Ahead Log (WAL) dengan Streaming Node dan menyediakan penemuan layanan untuk layanan streaming.</li>
<li><strong>Manajemen Kueri</strong>: Mengelola topologi dan penyeimbangan beban untuk Query Node, serta menyediakan dan mengelola tampilan kueri yang disajikan untuk memandu perutean kueri.</li>
<li><strong>Manajemen Data Historis</strong>: Mendistribusikan tugas-tugas offline seperti pemadatan dan pembuatan indeks ke Data Node, dan mengelola topologi segmen dan tampilan data.</li>
</ul>
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
    </button></h2><p>Lengan dan kaki. Simpul pekerja adalah eksekutor bodoh yang mengikuti instruksi dari koordinator. Node pekerja tidak memiliki kewarganegaraan berkat pemisahan penyimpanan dan komputasi, dan dapat memfasilitasi peningkatan skala sistem dan pemulihan bencana saat digunakan di Kubernetes. Ada tiga jenis simpul pekerja:</p>
<h3 id="Streaming-node" class="common-anchor-header">Node streaming</h3><p>Streaming node berfungsi sebagai "otak mini" tingkat pecahan, memberikan jaminan konsistensi tingkat pecahan dan pemulihan kesalahan berdasarkan WAL Storage yang mendasarinya. Sementara itu, Streaming Node juga bertanggung jawab untuk mengembangkan kueri data dan menghasilkan rencana kueri. Selain itu, node ini juga menangani konversi data yang terus bertambah menjadi data yang tersegel (historis).</p>
<h3 id="Query-node" class="common-anchor-header">Node kueri</h3><p>Query node memuat data historis dari penyimpanan objek, dan menyediakan kueri data historis.</p>
<h3 id="Data-node" class="common-anchor-header">Simpul data</h3><p>Simpul data bertanggung jawab untuk pemrosesan data historis secara offline, seperti pemadatan dan pembuatan indeks.</p>
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
    </button></h2><p>Penyimpanan adalah tulang dari sistem, yang bertanggung jawab atas persistensi data. Ini terdiri dari penyimpanan meta, perantara log, dan penyimpanan objek.</p>
<h3 id="Meta-storage" class="common-anchor-header">Penyimpanan meta</h3><p>Penyimpanan meta menyimpan snapshot dari metadata seperti skema koleksi, dan pos pemeriksaan konsumsi pesan. Menyimpan metadata menuntut ketersediaan yang sangat tinggi, konsistensi yang kuat, dan dukungan transaksi, sehingga Milvus memilih etcd untuk meta store. Milvus juga menggunakan etcd untuk registrasi layanan dan pemeriksaan kesehatan.</p>
<h3 id="Object-storage" class="common-anchor-header">Penyimpanan objek</h3><p>Penyimpanan objek menyimpan file snapshot dari log, file indeks untuk data skalar dan vektor, dan hasil kueri menengah. Milvus menggunakan MinIO sebagai penyimpanan objek dan dapat dengan mudah digunakan di AWS S3 dan Azure Blob, dua layanan penyimpanan yang paling populer dan hemat biaya di dunia. Namun, penyimpanan objek memiliki latensi akses yang tinggi dan biaya berdasarkan jumlah permintaan. Untuk meningkatkan kinerjanya dan menurunkan biaya, Milvus berencana untuk menerapkan pemisahan data dingin-panas pada cache pool berbasis memori atau SSD.</p>
<h3 id="WAL-storage" class="common-anchor-header">Penyimpanan WAL</h3><p>Penyimpanan Write-Ahead Log (WAL) adalah fondasi ketahanan dan konsistensi data dalam sistem terdistribusi. Sebelum perubahan apa pun dilakukan, perubahan tersebut terlebih dahulu dicatat dalam log-memastikan bahwa, jika terjadi kegagalan, Anda dapat memulihkan tepat di tempat yang Anda tinggalkan.</p>
<p>Implementasi WAL yang umum termasuk Kafka, Pulsar, dan Woodpecker. Tidak seperti solusi berbasis disk tradisional, Woodpecker mengadopsi desain cloud-native, tanpa disk yang menulis langsung ke penyimpanan objek. Pendekatan ini dapat disesuaikan dengan kebutuhan Anda dengan mudah dan menyederhanakan operasi dengan menghilangkan biaya tambahan untuk mengelola disk lokal.</p>
<p>Dengan mencatat setiap operasi penulisan sebelumnya, lapisan WAL menjamin mekanisme pemulihan dan konsistensi di seluruh sistem yang andal dan dapat diandalkan - tidak peduli seberapa rumitnya lingkungan terdistribusi Anda.</p>
<h2 id="Whats-next" class="common-anchor-header">Apa selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Baca <a href="/docs/id/main_components.md">Komponen Utama</a> untuk detail lebih lanjut tentang arsitektur Milvus.</li>
</ul>
