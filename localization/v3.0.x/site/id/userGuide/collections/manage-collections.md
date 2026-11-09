---
id: manage-collections.md
title: Penjelasan tentang Koleksi
summary: >-
  Di Milvus, Anda dapat membuat beberapa koleksi untuk mengelola data Anda,
  serta memasukkan data tersebut sebagai entitas ke dalam koleksi-koleksi
  tersebut. Koleksi dan entitas mirip dengan tabel dan baris data dalam basis
  data relasional. Halaman ini akan membantu Anda memahami tentang koleksi dan
  konsep-konsep terkait.
---
<h1 id="Collection-Explained" class="common-anchor-header">Penjelasan tentang Koleksi<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Di Milvus, Anda dapat membuat beberapa koleksi untuk mengelola data Anda, dan memasukkan data Anda sebagai entitas ke dalam koleksi tersebut. Koleksi dan entitas mirip dengan tabel dan catatan dalam basis data relasional. Halaman ini membantu Anda mempelajari tentang koleksi dan konsep-konsep terkait.</p>
<h2 id="Collection" class="common-anchor-header">Koleksi<button data-href="#Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Koleksi adalah tabel dua dimensi dengan kolom tetap dan baris yang bervariasi. Setiap kolom mewakili sebuah bidang, dan setiap baris mewakili sebuah entitas.</p>
<p>Bagan berikut menunjukkan koleksi dengan delapan kolom dan enam entitas.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" /> 
   <span>Penjelasan tentang Koleksi</span>
  
 </span></p>
<h2 id="Schema-and-Fields" class="common-anchor-header">Skema dan Bidang<button data-href="#Schema-and-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Saat mendeskripsikan suatu objek, kita biasanya menyebutkan atribut-atributnya, seperti ukuran, berat, dan posisi. Anda dapat menggunakan atribut-atribut ini sebagai bidang dalam koleksi. Setiap bidang memiliki berbagai sifat pembatas, seperti tipe data dan dimensi bidang vektor. Anda dapat membentuk skema koleksi dengan membuat bidang-bidang tersebut dan menentukan urutannya. Untuk jenis data yang mungkin berlaku, lihat <a href="/docs/id/schema.md">Penjelasan Skema</a>.</p>
<p>Anda harus menyertakan semua bidang yang ditentukan skema dalam entitas yang akan disisipkan. Untuk menjadikan beberapa di antaranya opsional, pertimbangkan untuk mengaktifkan bidang dinamis. Untuk detailnya, lihat Penjelasan <a href="/docs/id/enable-dynamic-field.md">Bidang Dinamis</a>.</p>
<ul>
<li><p><strong>Menjadikan bidang dapat bernilai null atau menetapkan nilai default</strong></p>
<p>Untuk detail tentang cara menjadikan bidang dapat bernilai null atau menetapkan nilai default, lihat " <a href="/docs/id/nullable-and-default.md">Nullable &amp; Default</a>".</p></li>
<li><p><strong>Mengaktifkan bidang dinamis</strong></p>
<p>Untuk detail tentang cara mengaktifkan dan menggunakan bidang dinamis, lihat <a href="/docs/id/enable-dynamic-field.md">Bidang Dinamis</a>.</p></li>
</ul>
<h2 id="Primary-key-and-AutoId" class="common-anchor-header">Kunci utama dan AutoId<button data-href="#Primary-key-and-AutoId" class="anchor-icon" translate="no">
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
    </button></h2><p>Mirip dengan kolom utama dalam basis data relasional, sebuah koleksi memiliki kolom utama untuk membedakan suatu entitas dari entitas lainnya. Setiap nilai dalam kolom utama bersifat unik secara global dan sesuai dengan satu entitas tertentu.</p>
<p>Seperti yang ditunjukkan pada bagan di atas, bidang bernama <strong>id</strong> berfungsi sebagai bidang utama, dan ID pertama <strong>0</strong> sesuai dengan entitas berjudul <em>The Mortality Rate of Coronavirus is Not Important</em>. Tidak akan ada entitas lain yang memiliki bidang utama bernilai 0.</p>
<p>Kolom utama hanya menerima bilangan bulat atau string. Saat menyisipkan entitas, Anda harus menyertakan nilai kolom utama secara default. Namun, jika Anda telah mengaktifkan <strong>AutoId</strong> saat pembuatan koleksi, Milvus akan menghasilkan nilai-nilai tersebut saat penyisipan data. Dalam hal ini, jangan sertakan nilai kolom utama pada entitas yang akan disisipkan.</p>
<p>Untuk informasi lebih lanjut, silakan lihat <a href="/docs/id/primary-field.md">Bidang Utama &amp; AutoId</a>.</p>
<h2 id="Index" class="common-anchor-header">Indeks<button data-href="#Index" class="anchor-icon" translate="no">
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
    </button></h2><p>Membuat indeks pada bidang tertentu meningkatkan efisiensi pencarian. Anda disarankan untuk membuat indeks untuk semua bidang yang diandalkan oleh layanan Anda, di antaranya indeks pada bidang vektor wajib dibuat.</p>
<h2 id="Entity" class="common-anchor-header">Entitas<button data-href="#Entity" class="anchor-icon" translate="no">
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
    </button></h2><p>Entitas adalah catatan data yang memiliki kumpulan bidang yang sama dalam sebuah koleksi. Nilai-nilai di semua bidang pada baris yang sama membentuk sebuah entitas.</p>
<p>Anda dapat menyisipkan entitas sebanyak yang Anda butuhkan ke dalam sebuah koleksi. Namun, seiring bertambahnya jumlah entitas, ukuran memori yang dibutuhkan juga akan meningkat, sehingga memengaruhi kinerja pencarian.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/schema.md">Penjelasan Skema</a>.</p>
<h2 id="Load-and-Release" class="common-anchor-header">Memuat dan Melepaskan<button data-href="#Load-and-Release" class="anchor-icon" translate="no">
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
    </button></h2><p>Memuat koleksi merupakan prasyarat untuk melakukan pencarian kesamaan dan kueri dalam koleksi. Saat Anda memuat koleksi, Milvus memuat semua file indeks dan data mentah di setiap bidang ke dalam memori untuk respons yang cepat terhadap pencarian dan kueri.</p>
<p>Pencarian dan kueri merupakan operasi yang intensif memori. Untuk menghemat sumber daya, disarankan untuk melepaskan koleksi yang saat ini tidak digunakan.</p>
<p>Untuk detail lebih lanjut, lihat <a href="/docs/id/load-and-release.md">Memuat &amp; Melepaskan</a>.</p>
<h2 id="Search-and-Query" class="common-anchor-header">Pencarian dan Kueri<button data-href="#Search-and-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah Anda membuat indeks dan memuat koleksi, Anda dapat memulai pencarian kesamaan dengan memasukkan satu atau beberapa vektor kueri. Misalnya, saat menerima representasi vektor kueri Anda yang disertakan dalam permintaan pencarian, Milvus menggunakan jenis metrik yang ditentukan untuk mengukur kesamaan antara vektor kueri dan vektor-vektor dalam koleksi target sebelum mengembalikan hasil yang secara semantik mirip dengan kueri.</p>
<p>Anda juga dapat menyertakan penyaringan metadata dalam pencarian dan kueri untuk meningkatkan relevansi hasil. Perhatikan bahwa, kondisi penyaringan metadata wajib dalam kueri tetapi opsional dalam pencarian.</p>
<p>Untuk detail mengenai jenis metrik yang berlaku, lihat <a href="/docs/id/metric.md">Jenis Metrik</a>.</p>
<p>Untuk informasi lebih lanjut tentang pencarian dan kueri, lihat artikel-artikel di bab Pencarian &amp; Peringkat Ulang, di antaranya, fitur-fitur dasarnya adalah:</p>
<ul>
<li><p><a href="/docs/id/single-vector-search.md">Pencarian ANN Dasar</a></p></li>
<li><p><a href="/docs/id/filtered-search.md">Pencarian yang Disaring</a></p></li>
<li><p><a href="/docs/id/range-search.md">Pencarian Rentang</a></p></li>
<li><p><a href="/docs/id/grouping-search.md">Pencarian Berkelompok</a></p></li>
<li><p><a href="/docs/id/multi-vector-search.md">Pencarian Hibrida</a></p></li>
<li><p><a href="/docs/id/with-iterators.md">Iterator Pencarian</a></p></li>
<li><p><a href="/docs/id/get-and-scalar-query.md">Kueri</a></p></li>
<li><p><a href="/docs/id/full-text-search.md">Pencarian Teks Lengkap</a></p></li>
<li><p><a href="/docs/id/keyword-match.md">Pencocokan Teks</a></p></li>
</ul>
<p>Selain itu, Milvus juga menyediakan peningkatan untuk meningkatkan kinerja dan efisiensi pencarian. Fitur-fitur ini dinonaktifkan secara default, dan Anda dapat mengaktifkan serta menggunakannya sesuai dengan kebutuhan layanan Anda. Fitur-fitur tersebut adalah</p>
<ul>
<li><p><a href="/docs/id/use-partition-key.md">Gunakan Kunci Partisi</a></p></li>
<li><p><a href="/docs/id/mmap.md">Gunakan mmap</a></p></li>
<li><p><a href="/docs/id/clustering-compaction.md">Pengelompokan Pemadatan</a></p></li>
</ul>
<h2 id="Partition" class="common-anchor-header">Partisi<button data-href="#Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Partisi adalah himpunan bagian dari sebuah koleksi, yang memiliki kumpulan bidang yang sama dengan koleksi induknya, dan masing-masing berisi himpunan bagian dari entitas.</p>
<p>Dengan mengalokasikan entitas ke partisi yang berbeda, Anda dapat membuat kelompok entitas. Anda dapat melakukan pencarian dan kueri di partisi tertentu agar Milvus mengabaikan entitas di partisi lain, serta meningkatkan efisiensi pencarian.</p>
<p>Untuk detailnya, lihat <a href="/docs/id/manage-partitions.md">Mengelola Partisi</a>.</p>
<h2 id="Shard" class="common-anchor-header">Shard<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>Shard adalah potongan horizontal dari sebuah koleksi. Setiap shard sesuai dengan saluran input data. Setiap koleksi memiliki shard secara default. Anda dapat menetapkan jumlah shard yang sesuai saat membuat koleksi berdasarkan throughput yang diharapkan dan volume data yang akan dimasukkan ke dalam koleksi.</p>
<p>Untuk detail tentang cara mengatur jumlah shard, lihat <a href="/docs/id/create-collection.md">Buat Koleksi</a>.</p>
<h2 id="Alias" class="common-anchor-header">Alias<button data-href="#Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat membuat alias untuk koleksi Anda. Sebuah koleksi dapat memiliki beberapa alias, tetapi koleksi tidak dapat berbagi alias yang sama. Saat menerima permintaan terhadap sebuah koleksi, Milvus mencari koleksi tersebut berdasarkan nama yang diberikan. Jika koleksi dengan nama yang diberikan tidak ada, Milvus akan terus mencari nama tersebut sebagai alias. Anda dapat menggunakan alias koleksi untuk menyesuaikan kode Anda dengan berbagai skenario.</p>
<p>Untuk detail lebih lanjut, lihat " <a href="/docs/id/manage-aliases.md">Kelola Alias</a>".</p>
<h2 id="Function" class="common-anchor-header">Fungsi<button data-href="#Function" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat menetapkan fungsi agar Milvus dapat menghasilkan bidang saat pembuatan koleksi. Misalnya, fungsi pencarian teks lengkap menggunakan fungsi yang ditentukan pengguna untuk menghasilkan bidang vektor jarang dari bidang varchar tertentu. Untuk informasi lebih lanjut tentang pencarian teks lengkap, lihat <a href="/docs/id/full-text-search.md">Pencarian Teks Lengkap</a>.</p>
<h2 id="Consistency-Level" class="common-anchor-header">Tingkat Konsistensi<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>Sistem basis data terdistribusi biasanya menggunakan tingkat konsistensi untuk mendefinisikan kesamaan data di seluruh node data dan replika. Anda dapat menetapkan tingkat konsistensi yang berbeda saat membuat koleksi atau melakukan pencarian kesamaan di dalam koleksi. Tingkat konsistensi yang berlaku adalah <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong>, dan <strong>Eventually</strong>.</p>
<p>Untuk detail mengenai tingkat konsistensi ini, lihat <a href="/docs/id/tune_consistency.md">Tingkat Konsistensi</a>.</p>
