---
id: multi_tenancy.md
related_key: multi-tenancy
summary: Multi-penyewaan di Milvus.
title: Strategi multi-penyewaan
---
<h1 id="Multi-tenancy-strategies" class="common-anchor-header">Strategi multi-penyewaan<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h1><p>Dalam banyak kasus penggunaan, pengembang ingin menjalankan satu cluster Milvus dan melayani beberapa penyewa, seperti beberapa tim produk, atau jutaan pengguna akhir. Panduan ini menjelaskan beberapa strategi berbeda untuk mencapai multi-tenancy di Milvus.</p>
<p>Milvus dirancang untuk mendukung multi-tenancy di tingkat database, koleksi, atau partisi. Tujuan dari multi-tenancy adalah untuk memisahkan data dan sumber daya satu sama lain. Menerapkan multi-tenancy pada tingkat yang berbeda dapat mencapai tingkat isolasi yang berbeda tetapi juga melibatkan biaya yang berbeda. Di sini kami menjelaskan trade-off dari keduanya.</p>
<h2 id="Database-oriented-multi-tenancy" class="common-anchor-header">Multi-tenancy yang berorientasi pada basis data<button data-href="#Database-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Sejak Milvus versi 2.2.9, Anda dapat membuat beberapa database dalam satu cluster Milvus. Fitur ini memungkinkan untuk mencapai multi-tenancy berorientasi database dengan memberikan database untuk setiap penyewa, sehingga mereka dapat membuat koleksi mereka sendiri. Pendekatan ini memberikan isolasi data dan sumber daya terbaik untuk penyewa, tetapi terbatas pada 64 database dalam satu cluster.</p>
<h2 id="Collection-oriented-multi-tenancy" class="common-anchor-header">Penyewaan multi-penyewa yang berorientasi pada koleksi<button data-href="#Collection-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Ada dua cara yang memungkinkan untuk mencapai multi-penyewaan berorientasi koleksi.</p>
<h3 id="One-collection-for-all-tenants" class="common-anchor-header">Satu koleksi untuk semua penyewa</h3><p>Menggunakan satu koleksi untuk mengimplementasikan multi-penyewaan dengan menambahkan bidang penyewa untuk membedakan antara penyewa adalah pilihan yang sederhana. Saat melakukan pencarian ANN untuk penyewa tertentu, tambahkan ekspresi filter untuk menyaring semua entitas yang dimiliki oleh penyewa lain. Ini adalah cara paling sederhana untuk mencapai multi-tenancy. Namun, perlu diketahui bahwa kinerja filter dapat menjadi penghambat pencarian ANN. Untuk meningkatkan kinerja pencarian, Anda dapat mengoptimalkan dengan multi-tenancy berorientasi partisi di bawah ini.</p>
<h3 id="One-collection-per-tenant" class="common-anchor-header">Satu koleksi per penyewa</h3><p>Pendekatan lain adalah membuat koleksi untuk setiap penyewa untuk menyimpan datanya sendiri, alih-alih menyimpan data semua penyewa dalam satu koleksi. Hal ini memberikan isolasi data dan kinerja kueri yang lebih baik. Namun, perlu diingat bahwa pendekatan ini membutuhkan lebih banyak sumber daya dalam penjadwalan dan terbatas pada 10.000 koleksi dalam satu klaster.</p>
<h2 id="Partition-oriented-multi-tenancy" class="common-anchor-header">Multi-penyewaan berorientasi partisi<button data-href="#Partition-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Ada dua cara untuk mencapai multi-penyewaan berorientasi partisi:</p>
<h3 id="One-partition-per-tenant" class="common-anchor-header">Satu partisi per penyewa</h3><p>Mengelola satu koleksi jauh lebih mudah daripada mengelola banyak koleksi. Daripada membuat banyak koleksi, pertimbangkan untuk menetapkan satu partisi untuk setiap penyewa untuk mencapai isolasi data yang fleksibel dan manajemen memori. Performa pencarian multi-penyewaan berorientasi partisi jauh lebih baik daripada multi-penyewaan berorientasi koleksi. Namun, perlu diperhatikan bahwa jumlah penyewa koleksi tidak boleh melebihi jumlah maksimum partisi yang dapat ditampung oleh sebuah koleksi.</p>
<h3 id="Partition-key-based-multi-tenancy" class="common-anchor-header">Penyewaan multi-penyewa berbasis kunci partisi</h3><p>Milvus 2.2.9 memperkenalkan fitur baru bernama kunci partisi. Pada saat pembuatan koleksi, tentukan bidang penyewa dan jadikan bidang tersebut sebagai kunci partisi. Milvus akan menyimpan entitas dalam sebuah partisi sesuai dengan nilai hash dari field kunci partisi. Ketika melakukan pencarian ANN, Milvus hanya mencari partisi yang berisi kunci partisi. Hal ini akan mengurangi cakupan pencarian sehingga mencapai kinerja yang lebih baik daripada tanpa kunci partisi.</p>
</div>
<p>Strategi ini menghilangkan batasan jumlah maksimum penyewa yang dapat didukung oleh koleksi Milvus dan sangat menyederhanakan manajemen sumber daya karena Milvus secara otomatis mengelola partisi untuk Anda.</p>
<p>Sebagai rangkuman, Anda bisa menggunakan salah satu atau beberapa strategi multi-tenancy di atas untuk membentuk solusi Anda sendiri. Tabel berikut membuat perbandingan di antara strategi-strategi ini dalam hal isolasi data, kinerja pencarian, dan jumlah maksimum penyewa.</p>
<table>
<thead>
<tr><th></th><th>Isolasi data</th><th>Performa pencarian.</th><th>Maks. jumlah penyewa</th><th>Merekomendasikan skenario</th></tr>
</thead>
<tbody>
<tr><td>Berorientasi pada basis data</td><td>Kuat</td><td>Kuat</td><td>64</td><td>Untuk mereka yang membutuhkan koleksi yang bervariasi dengan proyek, terutama cocok untuk isolasi data antar departemen dalam organisasi Anda.</td></tr>
<tr><td>Satu koleksi untuk semua</td><td>Lemah</td><td>Sedang</td><td>N/A</td><td>Untuk mereka yang memiliki sumber daya terbatas dan tidak peka terhadap isolasi data.</td></tr>
<tr><td>Satu koleksi per penyewa</td><td>Kuat</td><td>Kuat</td><td>Kurang dari 10.000</td><td>Untuk yang memiliki kurang dari 10.000 penyewa per klaster.</td></tr>
<tr><td>Satu partisi per penyewa</td><td>Sedang</td><td>Kuat</td><td>4,096</td><td>Untuk yang memiliki kurang dari 4.096 penyewa per koleksi.</td></tr>
<tr><td>Berbasis kunci partisi</td><td>Sedang</td><td>Kuat</td><td>10,000,000+</td><td>Untuk mereka yang memprediksi peningkatan penyewa yang cepat menjadi jutaan.</td></tr>
</tbody>
</table>
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
    </button></h2><p><a href="/docs/id/manage_databases.md">Mengelola</a><a href="/docs/id/schema.md">Skema</a><a href="/docs/id/manage_databases.md">Basis Data</a></p>
