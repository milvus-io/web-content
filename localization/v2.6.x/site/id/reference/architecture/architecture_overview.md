---
id: architecture_overview.md
summary: >-
  Milvus menyediakan basis data vektor yang cepat, andal, dan stabil yang dibuat
  khusus untuk pencarian kemiripan dan kecerdasan buatan.
title: Gambaran Umum Arsitektur Milvus
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Gambaran Umum Arsitektur Milvus<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus adalah basis data vektor <strong>open-source</strong>, <strong>cloud-native</strong> yang dirancang untuk pencarian kemiripan berkinerja tinggi pada set data vektor yang sangat besar. Dibangun di atas pustaka pencarian vektor yang populer, termasuk Faiss, HNSW, DiskANN, dan SCANN, Milvus memberdayakan aplikasi AI dan skenario pencarian data yang tidak terstruktur. Sebelum melanjutkan, biasakan diri Anda dengan <a href="/docs/id/v2.6.x/glossary.md">prinsip-prinsip dasar</a> pengambilan embedding.</p>
<h2 id="Architecture-Diagram" class="common-anchor-header">Diagram Arsitektur<button data-href="#Architecture-Diagram" class="anchor-icon" translate="no">
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
    </button></h2><p>Diagram berikut ini menggambarkan arsitektur tingkat tinggi Milvus, yang menampilkan desain modular, dapat diskalakan, dan cloud-native dengan lapisan penyimpanan dan komputasi yang terpilah-pilah.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>Arsitektur_diagram</span> </span></p>
<h2 id="Architectural-Principles" class="common-anchor-header">Prinsip Arsitektur<button data-href="#Architectural-Principles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mengikuti prinsip disagregasi bidang data dan bidang kontrol, yang terdiri dari empat lapisan utama yang saling independen dalam hal skalabilitas dan pemulihan bencana. Arsitektur penyimpanan bersama dengan lapisan penyimpanan dan komputasi yang terpilah sepenuhnya ini memungkinkan penskalaan horizontal node komputasi sambil menerapkan Woodpecker sebagai lapisan WAL tanpa disk untuk meningkatkan elastisitas dan mengurangi biaya operasional.</p>
<p>Dengan memisahkan pemrosesan aliran menjadi Streaming Node dan pemrosesan batch menjadi Query Node dan Data Node, Milvus mencapai kinerja tinggi sekaligus memenuhi persyaratan pemrosesan waktu nyata secara bersamaan.</p>
<h2 id="Detailed-Layer-Architecture" class="common-anchor-header">Arsitektur Lapisan Terperinci<button data-href="#Detailed-Layer-Architecture" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">Lapisan 1: Lapisan Akses</h3><p>Terdiri dari sekelompok proksi tanpa kewarganegaraan, lapisan akses adalah lapisan depan sistem dan titik akhir bagi pengguna. Lapisan ini memvalidasi permintaan klien dan mengurangi hasil yang dikembalikan:</p>
<ul>
<li>Proxy dengan sendirinya tidak memiliki kewarganegaraan. Ia menyediakan alamat layanan terpadu menggunakan komponen penyeimbang beban seperti Nginx, Kubernetes Ingress, NodePort, dan LVS.</li>
<li>Karena Milvus menggunakan arsitektur pemrosesan paralel masif (MPP), proksi mengumpulkan dan memproses hasil antara sebelum mengembalikan hasil akhir ke klien.</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">Lapisan 2: Koordinator</h3><p>Koordinator berfungsi sebagai otak Milvus. Setiap saat, ada satu Koordinator yang aktif di seluruh cluster, yang bertanggung jawab untuk menjaga topologi cluster, menjadwalkan semua jenis tugas, dan menjanjikan konsistensi tingkat cluster.</p>
<p>Berikut ini adalah beberapa tugas yang ditangani oleh <strong>Koordinator</strong>:</p>
<ul>
<li><strong>Manajemen DDL/DCL/TSO</strong>: Menangani permintaan bahasa definisi data (DDL) dan bahasa kontrol data (DCL), seperti membuat atau menghapus koleksi, partisi, atau indeks, serta mengelola cap waktu Oracle (TSO) dan penerbitan penanda waktu.</li>
<li><strong>Manajemen Layanan Streaming</strong>: Mengikat Write-Ahead Log (WAL) dengan Streaming Node dan menyediakan penemuan layanan untuk layanan streaming.</li>
<li><strong>Manajemen Kueri</strong>: Mengelola topologi dan penyeimbangan beban untuk Query Node, serta menyediakan dan mengelola tampilan kueri yang disajikan untuk memandu perutean kueri.</li>
<li><strong>Manajemen Data Historis</strong>: Mendistribusikan tugas-tugas offline seperti pemadatan dan pembuatan indeks ke Node Data, dan mengelola topologi segmen dan tampilan data.</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">Lapisan 3: Simpul Pekerja</h3><p>Lengan dan kaki. Node pekerja adalah eksekutor bodoh yang mengikuti instruksi dari koordinator. Node pekerja tidak memiliki kewarganegaraan berkat pemisahan penyimpanan dan komputasi, dan dapat memfasilitasi peningkatan skala sistem dan pemulihan bencana saat digunakan di Kubernetes. Ada tiga jenis simpul pekerja:</p>
<h3 id="Streaming-node" class="common-anchor-header">Node streaming</h3><p>Streaming node berfungsi sebagai "otak mini" tingkat pecahan, memberikan jaminan konsistensi tingkat pecahan dan pemulihan kesalahan berdasarkan WAL Storage yang mendasarinya. Sementara itu, Streaming Node juga bertanggung jawab untuk mengembangkan kueri data dan menghasilkan rencana kueri. Selain itu, node ini juga menangani konversi data yang terus bertambah menjadi data yang tersegel (historis).</p>
<h3 id="Query-node" class="common-anchor-header">Node kueri</h3><p>Query node memuat data historis dari penyimpanan objek, dan menyediakan kueri data historis.</p>
<h3 id="Data-node" class="common-anchor-header">Simpul data</h3><p>Simpul data bertanggung jawab untuk pemrosesan data historis secara offline, seperti pemadatan dan pembuatan indeks.</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">Lapisan 4: Penyimpanan</h3><p>Penyimpanan adalah tulang dari sistem, yang bertanggung jawab atas persistensi data. Ini terdiri dari penyimpanan meta, perantara log, dan penyimpanan objek.</p>
<h3 id="Meta-storage" class="common-anchor-header">Penyimpanan meta</h3><p>Penyimpanan meta menyimpan snapshot dari metadata seperti skema koleksi, dan pos pemeriksaan konsumsi pesan. Menyimpan metadata menuntut ketersediaan yang sangat tinggi, konsistensi yang kuat, dan dukungan transaksi, sehingga Milvus memilih etcd untuk meta store. Milvus juga menggunakan etcd untuk registrasi layanan dan pemeriksaan kesehatan.</p>
<h3 id="Object-storage" class="common-anchor-header">Penyimpanan objek</h3><p>Penyimpanan objek menyimpan file snapshot dari log, file indeks untuk data skalar dan vektor, dan hasil kueri menengah. Milvus menggunakan MinIO sebagai penyimpanan objek dan dapat dengan mudah digunakan di AWS S3 dan Azure Blob, dua layanan penyimpanan yang paling populer dan hemat biaya di dunia. Namun, penyimpanan objek memiliki latensi akses yang tinggi dan biaya berdasarkan jumlah permintaan. Untuk meningkatkan kinerjanya dan menurunkan biaya, Milvus berencana untuk menerapkan pemisahan data dingin-panas pada cache pool berbasis memori atau SSD.</p>
<h3 id="WAL-storage" class="common-anchor-header">Penyimpanan WAL</h3><p>Penyimpanan Write-Ahead Log (WAL) adalah fondasi ketahanan dan konsistensi data dalam sistem terdistribusi. Sebelum perubahan apa pun dilakukan, perubahan tersebut terlebih dahulu dicatat dalam log-memastikan bahwa, jika terjadi kegagalan, Anda dapat memulihkan tepat di tempat yang Anda tinggalkan.</p>
<p>Implementasi WAL yang umum termasuk Kafka, Pulsar, dan Woodpecker. Tidak seperti solusi berbasis disk tradisional, Woodpecker mengadopsi desain cloud-native, tanpa disk yang menulis langsung ke penyimpanan objek. Pendekatan ini dapat disesuaikan dengan kebutuhan Anda dengan mudah dan menyederhanakan operasi dengan menghilangkan biaya tambahan untuk mengelola disk lokal.</p>
<p>Dengan mencatat setiap operasi penulisan sebelumnya, lapisan WAL menjamin mekanisme pemulihan dan konsistensi di seluruh sistem yang andal dan dapat diandalkan - tidak peduli seberapa rumitnya lingkungan terdistribusi Anda.</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">Aliran Data dan Kategori API<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>API Milvus dikategorikan berdasarkan fungsinya dan mengikuti jalur tertentu melalui arsitektur:</p>
<table>
<thead>
<tr><th>Kategori API</th><th>Operasi</th><th>Contoh API</th><th>Aliran Arsitektur</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>Skema &amp; Kontrol Akses</td><td><code translate="no">createCollection</code>, <code translate="no">dropCollection</code>, <code translate="no">hasCollection</code>, <code translate="no">createPartition</code></td><td>Lapisan Akses → Koordinator</td></tr>
<tr><td><strong>DML</strong></td><td>Manipulasi Data</td><td><code translate="no">insert</code>, <code translate="no">delete</code>, <code translate="no">upsert</code></td><td>Lapisan Akses → Node Pekerja Streaming</td></tr>
<tr><td><strong>DQL</strong></td><td>Kueri Data</td><td><code translate="no">search</code>, <code translate="no">query</code></td><td>Lapisan Akses → Node Pekerja Batch (Node Kueri)</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">Contoh Aliran Data: Operasi Pencarian</h3><ol>
<li>Klien mengirimkan permintaan pencarian melalui SDK / API RESTful</li>
<li>Load Balancer merutekan permintaan ke Proxy yang tersedia di Access Layer</li>
<li>Proxy menggunakan cache perutean untuk menentukan node target; menghubungi Koordinator hanya jika cache tidak tersedia</li>
<li>Proxy meneruskan permintaan ke Streaming Node yang sesuai, yang kemudian berkoordinasi dengan Query Node untuk pencarian data yang disegel sambil mengeksekusi pencarian data yang terus bertambah secara lokal</li>
<li>Query Node memuat segmen yang disegel dari Object Storage sesuai kebutuhan dan melakukan pencarian tingkat segmen</li>
<li>Hasil pencarian mengalami pengurangan multi-level: Query Node mengurangi hasil di beberapa segmen, Streaming Node mengurangi hasil dari Query Node, dan Proxy mengurangi hasil dari semua Streaming Node sebelum kembali ke klien</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">Contoh Aliran Data: Penyisipan Data</h3><ol>
<li>Klien mengirimkan permintaan penyisipan dengan data vektor</li>
<li>Access Layer memvalidasi dan meneruskan permintaan ke Streaming Node</li>
<li>Streaming Node mencatat operasi ke Penyimpanan WAL untuk ketahanan</li>
<li>Data diproses secara real-time dan tersedia untuk kueri</li>
<li>Ketika segmen mencapai kapasitas, Streaming Node memicu konversi ke segmen yang disegel</li>
<li>Data Node menangani pemadatan dan membangun indeks di atas segmen yang disegel, menyimpan hasilnya di Object Storage</li>
<li>Query Node memuat indeks yang baru dibangun dan mengganti data yang sedang berkembang</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">Apa Selanjutnya<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>Jelajahi <a href="/docs/id/v2.6.x/main_components.md">Komponen Utama</a> untuk mengetahui detail implementasi secara spesifik</li>
<li>Pelajari tentang alur kerja <a href="/docs/id/v2.6.x/data_processing.md">Pemrosesan Data</a> dan strategi pengoptimalan</li>
<li>Memahami <a href="/docs/id/v2.6.x/consistency.md">Model Konsistensi</a> dan jaminan transaksi di Milvus</li>
</ul>
