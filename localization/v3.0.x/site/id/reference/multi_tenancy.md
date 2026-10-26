---
id: multi_tenancy.md
title: Menerapkan Multi-tenancy
summary: >-
  Di Milvus, multi-tenancy berarti beberapa pelanggan atau tim—yang disebut
  sebagai tenant—berbagi kluster yang sama sambil tetap mempertahankan
  lingkungan data yang terisolasi.
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">Menerapkan Multi-tenancy<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>Di Milvus, multi-tenancy berarti beberapa pelanggan atau tim— <strong>yang</strong>disebut sebagai <strong>tenant</strong>—berbagi kluster yang sama sambil tetap mempertahankan lingkungan data yang terisolasi.</p>
<p>Milvus mendukung empat strategi multi-tenancy, yang masing-masing menawarkan keseimbangan berbeda antara skalabilitas, isolasi data, dan fleksibilitas. Panduan ini akan memandu Anda melalui setiap opsi, membantu Anda memilih strategi yang paling sesuai untuk kasus penggunaan Anda.</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">Strategi multi-tenancy<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mendukung multi-tenancy pada empat tingkatan: <strong>Database</strong>, <strong>Koleksi</strong>, <strong>Partisi</strong>, dan <strong>Kunci Partisi</strong>.</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">Multi-tenancy tingkat database<button data-href="#Database-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Dengan multi-tenancy tingkat database, setiap penyewa menerima <a href="/docs/id/manage_databases.md">database</a> yang sesuai yang berisi satu atau lebih koleksi.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" /> 
   <span>Multi-tenancy Tingkat Database</span>
  
 </span></p>
<ul>
<li><p><strong>Skalabilitas</strong>: Strategi multi-tenancy tingkat database secara default mendukung maksimal 64 penyewa.</p></li>
<li><p><strong>Isolasi data</strong>: Data di setiap basis data sepenuhnya terpisah, sehingga menawarkan isolasi data tingkat perusahaan yang ideal untuk lingkungan yang diatur oleh regulasi atau pelanggan dengan kebutuhan kepatuhan yang ketat.</p></li>
<li><p><strong>Fleksibilitas</strong>: Setiap basis data dapat memiliki koleksi dengan skema yang berbeda, sehingga menawarkan pengorganisasian data yang sangat fleksibel dan memungkinkan setiap penyewa memiliki skema datanya sendiri.</p></li>
<li><p><strong>Lainnya</strong>: Strategi ini juga mendukung RBAC, yang memungkinkan kontrol terperinci atas akses pengguna per penyewa. Selain itu, Anda dapat secara fleksibel memuat atau melepaskan data untuk penyewa tertentu guna mengelola data aktif dan tidak aktif secara efektif.</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">Multi-tenant di tingkat koleksi<button data-href="#Collection-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Dengan multi-tenancy tingkat koleksi, setiap penyewa diberi satu <a href="/docs/id/manage-collections.md">koleksi</a>, sehingga menawarkan isolasi data yang kuat.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" /> 
   <span>Multi-tenancy tingkat koleksi</span>
  
 </span></p>
<ul>
<li><p><strong>Skalabilitas</strong>: Karena sebuah cluster dapat menampung hingga 65.536 koleksi secara default, strategi ini dapat mengakomodasi jumlah penyewa yang sama di dalam cluster tersebut.</p></li>
<li><p><strong>Isolasi data</strong>: Koleksi-koleksi tersebut terisolasi secara fisik satu sama lain. Strategi ini memberikan isolasi data yang kuat.</p></li>
<li><p><strong>Fleksibilitas</strong>: Strategi ini memungkinkan setiap koleksi memiliki skema sendiri, sehingga dapat mengakomodasi penyewa dengan skema data yang berbeda-beda.</p></li>
<li><p><strong>Lainnya</strong>: Strategi ini juga mendukung RBAC, sehingga memungkinkan kontrol akses yang terperinci terhadap penyewa. Selain itu, Anda dapat secara fleksibel memuat atau melepaskan data untuk penyewa tertentu guna mengelola data panas dan dingin secara efektif.</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">Multi-tenancy tingkat partisi<button data-href="#Partition-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Dalam multi-tenancy tingkat partisi, setiap penyewa ditugaskan ke <a href="/docs/id/manage-partitions.md">partisi</a> yang dibuat secara manual di dalam koleksi bersama.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" /> 
   <span>Multi-tenancy Tingkat Partisi</span>
  
 </span></p>
<ul>
<li><p><strong>Skalabilitas</strong>: Satu koleksi dapat menampung hingga 1.024 partisi per koleksi, sehingga memungkinkan jumlah penyewa yang sama di dalamnya.</p></li>
<li><p><strong>Isolasi data</strong>: Data setiap penyewa dipisahkan secara fisik oleh partisi.</p></li>
<li><p><strong>Fleksibilitas</strong>: Strategi ini mengharuskan semua penyewa menggunakan skema data yang sama. Selain itu, partisi harus dibuat secara manual.</p></li>
<li><p><strong>Lainnya</strong>: RBAC tidak didukung pada tingkat partisi. Penyewa dapat diquery baik secara individual maupun melintasi beberapa partisi, yang membuat pendekatan ini sangat cocok untuk skenario yang melibatkan kueri agregat atau analitik melintasi segmen penyewa. Selain itu, Anda dapat secara fleksibel memuat atau melepaskan data untuk penyewa tertentu guna mengelola data panas dan dingin secara efektif.</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">Multi-tenancy tingkat kunci partisi<button data-href="#Partition-key-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Dengan strategi ini, semua penyewa berbagi satu koleksi dan skema, tetapi data setiap penyewa secara otomatis dialihkan ke 16 partisi yang terisolasi secara fisik berdasarkan nilai <a href="/docs/id/use-partition-key.md">kunci partisi</a>. Meskipun setiap partisi fisik dapat berisi beberapa penyewa, data dari penyewa yang berbeda tetap terpisah secara logis.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" /> 
   <span>Multi-tenancy Tingkat Kunci Partisi</span>
  
 </span></p>
<ul>
<li><p><strong>Skalabilitas</strong>: Strategi tingkat kunci partisi menawarkan pendekatan yang paling skalabel, mendukung jutaan penyewa.</p></li>
<li><p><strong>Isolasi data</strong>: Strategi ini menawarkan isolasi data yang relatif lemah karena beberapa penyewa dapat berbagi partisi fisik.</p></li>
<li><p><strong>Fleksibilitas</strong>: Karena semua penyewa harus berbagi skema data yang sama, strategi ini menawarkan fleksibilitas data yang terbatas.</p></li>
<li><p><strong>Lain-lain</strong>: RBAC tidak didukung pada tingkat kunci partisi. Penyewa dapat di-query baik secara individual maupun melintasi beberapa partisi, yang membuat pendekatan ini sangat cocok untuk skenario yang melibatkan kueri agregat atau analitik melintasi segmen penyewa.</p></li>
</ul>
<div class="alert note">
<p>Kami menyarankan Anda membuat indeks skalar pada bidang kunci partisi. Karena setiap partisi fisik menampung beberapa penyewa, Milvus mengevaluasi filter penyewa terhadap setiap entitas di partisi yang dicari, dan tanpa indeks, ini akan menjadi pemindaian penuh. Untuk detailnya, lihat <a href="/docs/id/use-partition-key.md#Index-Partition-Key">Indeks Kunci Partisi</a>.</p>
</div>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">Memilih Strategi Multi-Tenancy yang Tepat<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Tabel di bawah ini menyajikan perbandingan komprehensif antara empat tingkat strategi multi-tenancy.</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>Tingkat basis data</strong></p></th>
     <th><p><strong>Tingkat Koleksi</strong></p></th>
     <th><p><strong>Tingkat partisi</strong></p></th>
     <th><p><strong>Tingkat kunci partisi</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>Isolasi Data</strong></p></td>
     <td><p>Fisik</p></td>
     <td><p>Fisik</p></td>
     <td><p>Fisik</p></td>
     <td><p>Fisik + Logis</p></td>
   </tr>
   <tr>
     <td><p><strong>Jumlah penyewa maksimum</strong></p></td>
     <td><p>Secara default, 64. Anda dapat menaikkannya dengan mengubah parameter ` <code translate="no">maxDatabaseNum</code> ` di berkas konfigurasi `Milvus.yaml`. </p></td>
     <td><p>Secara default, 65.536. Anda dapat menaikkan jumlah ini dengan mengubah parameter ` <code translate="no">maxCollectionNum</code> ` di berkas konfigurasi `Milvus.yaml`.</p></td>
     <td><p>Hingga 1.024 per koleksi. </p></td>
     <td><p>Jutaan</p></td>
   </tr>
   <tr>
     <td><p><strong>Fleksibilitas skema data</strong></p></td>
     <td><p>Tinggi</p></td>
     <td><p>Sedang</p></td>
     <td><p>Rendah</p></td>
     <td><p>Rendah</p></td>
   </tr>
   <tr>
     <td><p><strong>Dukungan RBAC</strong></p></td>
     <td><p>Ya</p></td>
     <td><p>Ya</p></td>
     <td><p>Tidak</p></td>
     <td><p>Tidak</p></td>
   </tr>
   <tr>
     <td><p><strong>Kinerja pencarian</strong></p></td>
     <td><p>Baik</p></td>
     <td><p>Baik</p></td>
     <td><p>Sedang</p></td>
     <td><p>Sedang</p></td>
   </tr>
   <tr>
     <td><p><strong>Dukungan pencarian lintas penyewa</strong></p></td>
     <td><p>Tidak</p></td>
     <td><p>Tidak</p></td>
     <td><p>Ya</p></td>
     <td><p>Ya</p></td>
   </tr>
   <tr>
     <td><p><strong>Dukungan untuk penanganan data aktif dan tidak aktif yang efektif</strong></p></td>
     <td><p>Ya</p></td>
     <td><p>Ya</p></td>
     <td><p>Ya</p></td>
     <td><p>Tidak Saat ini, strategi tingkat kunci partisi belum didukung.</p></td>
   </tr>
</table>
<p>Ada beberapa faktor yang perlu dipertimbangkan saat Anda memilih strategi multi-tenancy di Milvus.</p>
<ol>
<li><p><strong>Skalabilitas:</strong> Kunci Partisi &gt; Partisi &gt; Koleksi &gt; Database</p>
<p>Jika Anda memperkirakan akan mendukung jumlah penyewa yang sangat besar (jutaan atau lebih), gunakan strategi tingkat kunci partisi.</p></li>
<li><p><strong>Persyaratan isolasi data yang ketat</strong>: Database = Koleksi &gt; Partisi &gt; Kunci Partisi</p>
<p>Pilih strategi tingkat database, koleksi, atau partisi jika Anda memiliki persyaratan isolasi data fisik yang ketat.</p></li>
<li><p><strong>Skema data yang fleksibel untuk data setiap penyewa:</strong> Database &gt; Koleksi &gt; Partisi = Kunci Partisi</p>
<p>Strategi tingkat basis data dan tingkat koleksi memberikan fleksibilitas penuh dalam skema data. Jika struktur data penyewa Anda berbeda-beda, pilih multi-tenancy tingkat basis data atau tingkat koleksi.</p></li>
<li><p><strong>Lain-lain</strong></p>
<ol>
<li><p><strong>Kinerja:</strong> Kinerja pencarian ditentukan oleh berbagai faktor, termasuk indeks, parameter pencarian, dan konfigurasi mesin. Milvus juga mendukung penyetelan kinerja. Disarankan untuk menguji kinerja aktual sebelum Anda memilih strategi multi-tenancy.</p></li>
<li><p><strong>Penanganan data panas dan dingin yang efektif</strong>: Saat ini, strategi tingkat database, tingkat koleksi, dan tingkat partisi semuanya mendukung penanganan data panas dan dingin.</p></li>
<li><p><strong>Pencarian lintas penyewa</strong>: Hanya strategi tingkat partisi dan tingkat kunci partisi yang mendukung kueri lintas penyewa.</p></li>
</ol></li>
</ol>
