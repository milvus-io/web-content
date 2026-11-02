---
id: architecture_overview.md
summary: >-
  Milvus menyediakan basis data vektor yang cepat, andal, dan stabil, yang
  dirancang khusus untuk pencarian kesamaan dan kecerdasan buatan.
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
    </button></h1><p>Milvus adalah basis data vektor <strong>open-source</strong> dan <strong>cloud-native</strong> yang dirancang untuk pencarian kesamaan berkinerja tinggi pada kumpulan data vektor berskala besar. Dibangun di atas pustaka pencarian vektor populer seperti Faiss, HNSW, DiskANN, dan SCANN, Milvus mendukung aplikasi AI dan skenario pengambilan data tidak terstruktur. Sebelum melanjutkan, pastikan Anda memahami <a href="/docs/id/glossary.md">prinsip-prinsip dasar</a> pengambilan data berbasis embedding.</p>
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
    </button></h2><p>Diagram berikut ini menggambarkan arsitektur tingkat tinggi Milvus, yang menampilkan desainnya yang modular, skalabel, dan cloud-native dengan lapisan penyimpanan dan komputasi yang sepenuhnya terpisah.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" /> 
   <span>Diagram_arsitektur</span>
  
 </span></p>
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
    </button></h2><p>Milvus mengikuti prinsip pemisahan data plane dan control plane, yang terdiri dari empat lapisan utama yang saling independen dalam hal skalabilitas dan pemulihan bencana. Arsitektur penyimpanan bersama ini, dengan lapisan penyimpanan dan komputasi yang sepenuhnya terpisah, memungkinkan penskalaan horizontal node komputasi sambil mengimplementasikan Woodpecker sebagai lapisan WAL tanpa disk untuk meningkatkan elastisitas dan mengurangi beban operasional.</p>
<p>Dengan memisahkan pemrosesan aliran ke dalam Streaming Node dan pemrosesan batch ke dalam Query Node dan Data Node, Milvus mencapai kinerja tinggi sekaligus memenuhi persyaratan pemrosesan real-time.</p>
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">Lapisan 1: Lapisan Akses<button data-href="#Layer-1-Access-Layer" class="anchor-icon" translate="no">
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
    </button></h3><p>Terdiri dari sekelompok proxy tanpa status, lapisan akses merupakan lapisan terdepan sistem dan titik akhir bagi pengguna. Lapisan ini memvalidasi permintaan klien dan menyaring hasil yang dikembalikan:</p>
<ul>
<li>Proksi itu sendiri bersifat stateless. Proksi menyediakan alamat layanan terpadu menggunakan komponen penyeimbang beban seperti Nginx, Kubernetes Ingress, NodePort, dan LVS.</li>
<li>Karena Milvus menggunakan arsitektur pemrosesan paralel masif (MPP), proxy mengagregasi dan memproses hasil antara sebelum mengembalikan hasil akhir ke klien.</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">Lapisan 2: Koordinator<button data-href="#Layer-2-Coordinator" class="anchor-icon" translate="no">
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
    </button></h3><p>Koordinator berfungsi sebagai otak Milvus. Pada setiap saat, hanya ada satu Koordinator yang aktif di seluruh klaster, yang bertanggung jawab untuk memelihara topologi klaster, menjadwalkan semua jenis tugas, dan menjamin konsistensi tingkat klaster.</p>
<p>Berikut ini adalah beberapa tugas yang ditangani oleh <strong>Koordinator</strong>:</p>
<ul>
<li><strong>Manajemen DDL/DCL/TSO</strong>: Menangani permintaan bahasa definisi data (DDL) dan bahasa kontrol data (DCL), seperti membuat atau menghapus koleksi, partisi, atau indeks, serta mengelola Oracle timestamp (TSO) dan penerbitan time ticker.</li>
<li><strong>Manajemen Layanan Streaming</strong>: Menghubungkan Write-Ahead Log (WAL) dengan Node Streaming dan menyediakan penemuan layanan untuk layanan streaming.</li>
<li><strong>Pengelolaan Kueri</strong>: Mengelola topologi dan penyeimbangan beban untuk Node Kueri, serta menyediakan dan mengelola tampilan kueri yang disajikan untuk memandu perutean kueri.</li>
<li><strong>Manajemen Data Historis</strong>: Mendistribusikan tugas-tugas offline seperti pemadatan dan pembuatan indeks ke Node Data, serta mengelola topologi segmen dan tampilan data.</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">Lapisan 3: Node Pekerja<button data-href="#Layer-3-Worker-Nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>Lengan dan kaki. Node pekerja adalah pelaksana pasif yang mengikuti instruksi dari koordinator. Node pekerja bersifat stateless berkat pemisahan penyimpanan dan komputasi, serta dapat memfasilitasi penskalaan sistem dan pemulihan bencana saat diterapkan di Kubernetes. Ada tiga jenis node pekerja:</p>
<h3 id="Streaming-node" class="common-anchor-header">Node Streaming<button data-href="#Streaming-node" class="anchor-icon" translate="no">
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
    </button></h3><p>Node Streaming berfungsi sebagai "otak mini" tingkat shard, memberikan jaminan konsistensi tingkat shard dan pemulihan kesalahan berdasarkan Penyimpanan WAL yang mendasarinya. Sementara itu, Node Streaming juga bertanggung jawab atas kueri data yang terus bertambah dan pembuatan rencana kueri. Selain itu, node ini juga menangani konversi data yang terus bertambah menjadi data tersegel (historis).</p>
<h3 id="Query-node" class="common-anchor-header">Node kueri<button data-href="#Query-node" class="anchor-icon" translate="no">
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
    </button></h3><p>Node kueri memuat data historis dari penyimpanan objek, dan menyediakan kueri data historis.</p>
<h3 id="Data-node" class="common-anchor-header">Node data<button data-href="#Data-node" class="anchor-icon" translate="no">
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
    </button></h3><p>Node Data bertanggung jawab atas pemrosesan offline data historis, seperti pemadatan dan pembuatan indeks.</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">Lapisan 4: Penyimpanan<button data-href="#Layer-4-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Penyimpanan merupakan tulang punggung sistem, yang bertanggung jawab atas penyimpanan data yang persisten. Penyimpanan terdiri dari penyimpanan meta, perantara log, dan penyimpanan objek.</p>
<h3 id="Meta-storage" class="common-anchor-header">Penyimpanan meta<button data-href="#Meta-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Penyimpanan meta menyimpan snapshot metadata seperti skema koleksi, dan titik pemeriksaan konsumsi pesan. Penyimpanan metadata menuntut ketersediaan yang sangat tinggi, konsistensi yang kuat, dan dukungan transaksi, sehingga Milvus memilih etcd untuk penyimpanan meta. Milvus juga menggunakan etcd untuk pendaftaran layanan dan pemeriksaan kesehatan.</p>
<h3 id="Object-storage" class="common-anchor-header">Penyimpanan objek<button data-href="#Object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Penyimpanan objek menyimpan data dan file indeks secara permanen. Milvus mendukung backend penyimpanan objek seperti MinIO, AWS S3, dan Azure Blob Storage. QueryNodes menyimpan data dan indeks yang diperlukan untuk melayani kueri dalam cache.</p>
<p>Dengan <a href="/docs/id/tiered-storage-overview.md">Penyimpanan Berjenjang</a>, yang tersedia di Milvus 2.6.4 dan versi selanjutnya, QueryNodes dapat memuat metadata segmen terlebih dahulu dan mengambil data bidang atau indeks sesuai permintaan, alih-alih memuat semuanya saat inisialisasi. Penyimpanan objek jarak jauh tetap menjadi sumber yang persisten; menghapus entri cache lokal tidak akan menghapus data yang disimpan. Mengakses data yang tidak disimpan dalam cache menambah I/O penyimpanan dan dapat meningkatkan latensi kueri. Gunakan <a href="/docs/id/warm-up.md">Warm Up</a> untuk bidang atau indeks yang sensitif terhadap latensi, dan evaluasi latensi kueri dingin serta cache hangat sebelum memilih strategi pemuatan.</p>
<h3 id="WAL-storage" class="common-anchor-header">Penyimpanan WAL<button data-href="#WAL-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Penyimpanan Write-Ahead Log (WAL) merupakan fondasi ketahanan dan konsistensi data dalam sistem terdistribusi. Sebelum perubahan apa pun dikonfirmasi, perubahan tersebut terlebih dahulu dicatat dalam log—memastikan bahwa, jika terjadi kegagalan, Anda dapat memulihkan sistem persis dari titik di mana proses terhenti.</p>
<p>Implementasi WAL yang umum meliputi Kafka, Pulsar, dan Woodpecker. Berbeda dengan solusi berbasis disk tradisional, Woodpecker mengadopsi desain cloud-native tanpa disk yang menulis langsung ke penyimpanan objek. Pendekatan ini dapat diskalakan dengan mudah sesuai kebutuhan Anda dan menyederhanakan operasi dengan menghilangkan beban pengelolaan disk lokal.</p>
<p>Dengan mencatat setiap operasi penulisan terlebih dahulu, lapisan WAL menjamin mekanisme pemulihan dan konsistensi yang andal di seluruh sistem—terlepas dari seberapa kompleks lingkungan terdistribusi Anda berkembang.</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">Alur Data dan Kategori API<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
<tr><th>Kategori API</th><th>Operasi</th><th>Contoh API</th><th>Alur Arsitektur</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>Skema &amp; Kontrol Akses</td><td><code translate="no">createCollection</code>, <code translate="no">dropCollection</code>, <code translate="no">hasCollection</code>, <code translate="no">createPartition</code></td><td>Lapisan Akses → Koordinator</td></tr>
<tr><td><strong>DML</strong></td><td>Manipulasi Data</td><td><code translate="no">insert</code>, <code translate="no">delete</code>, <code translate="no">upsert</code></td><td>Lapisan Akses → Node Pekerja Streaming</td></tr>
<tr><td><strong>DQL</strong></td><td>Permintaan Data</td><td><code translate="no">search</code>, <code translate="no">query</code></td><td>Lapisan Akses → Node Pekerja Batch (Node Kueri)</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">Contoh Alur Data: Operasi Pencarian<button data-href="#Example-Data-Flow-Search-Operation" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Klien mengirimkan permintaan pencarian melalui SDK/API RESTful</li>
<li>Load Balancer mengarahkan permintaan ke Proxy yang tersedia di Lapisan Akses</li>
<li>Proxy menggunakan cache rute untuk menentukan node tujuan; hanya menghubungi Koordinator jika cache tidak tersedia</li>
<li>Proxy meneruskan permintaan ke Node Streaming yang sesuai, yang kemudian berkoordinasi dengan Node Kueri untuk pencarian data yang disegel sambil menjalankan pencarian data yang terus bertambah secara lokal</li>
<li>Node Kueri memuat segmen yang disegel dari Penyimpanan Objek sesuai kebutuhan dan melakukan pencarian tingkat segmen</li>
<li>Hasil pencarian menjalani reduksi berjenjang: Node Query mereduksi hasil di seluruh segmen, Node Streaming mereduksi hasil dari Node Query, dan Proxy mereduksi hasil dari semua Node Streaming sebelum dikembalikan ke klien</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">Contoh Alur Data: Penyisipan Data<button data-href="#Example-Data-Flow-Data-Insertion" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Klien mengirimkan permintaan penyisipan dengan data vektor</li>
<li>Lapisan Akses memvalidasi dan meneruskan permintaan ke Node Streaming</li>
<li>Streaming Node mencatat operasi ke WAL Storage untuk ketahanan</li>
<li>Data diproses secara real-time dan disiapkan untuk kueri</li>
<li>Ketika segmen mencapai kapasitas maksimum, Streaming Node memicu konversi ke segmen yang disegel</li>
<li>Data Node menangani kompresi dan membangun indeks di atas segmen yang disegel, menyimpan hasilnya di Object Storage</li>
<li>Node Kueri memuat indeks yang baru dibuat dan menggantikan data yang terus bertambah yang sesuai</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">Langkah Selanjutnya<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>Jelajahi <a href="/docs/id/main_components.md">Komponen Utama</a> untuk detail spesifik implementasi</li>
<li>Pelajari alur kerja <a href="/docs/id/data_processing.md">pemrosesan data</a> dan strategi optimasi</li>
<li>Pahami <a href="/docs/id/tune_consistency.md">Model Konsistensi</a> dan jaminan transaksi di Milvus</li>
</ul>
