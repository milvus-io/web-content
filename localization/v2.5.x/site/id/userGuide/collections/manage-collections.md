---
id: manage-collections.md
title: Penjelasan Koleksi
summary: >-
  Di Milvus, Anda dapat membuat beberapa koleksi untuk mengelola data Anda, dan
  memasukkan data Anda sebagai entitas ke dalam koleksi. Koleksi dan entitas
  mirip dengan tabel dan record dalam database relasional. Halaman ini membantu
  anda untuk mempelajari tentang koleksi dan konsep-konsep terkait.
---
<h1 id="Collection-Explained" class="common-anchor-header">Penjelasan Koleksi<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Di Milvus, Anda dapat membuat beberapa koleksi untuk mengelola data Anda, dan memasukkan data Anda sebagai entitas ke dalam koleksi. Koleksi dan entitas mirip dengan tabel dan record dalam database relasional. Halaman ini membantu Anda untuk mempelajari tentang koleksi dan konsep-konsep terkait.</p>
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
    </button></h2><p>Koleksi adalah tabel dua dimensi dengan kolom tetap dan baris yang bervariasi. Setiap kolom mewakili sebuah field, dan setiap baris mewakili sebuah entitas.</p>
<p>Bagan berikut ini menunjukkan sebuah koleksi dengan delapan kolom dan enam entitas.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" />
   </span> <span class="img-wrapper"> <span>Koleksi Dijelaskan</span> </span></p>
<h2 id="Schema-and-Fields" class="common-anchor-header">Skema dan Field<button data-href="#Schema-and-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Ketika mendeskripsikan sebuah objek, kita biasanya menyebutkan atribut-atributnya, seperti ukuran, berat, dan posisi. Anda dapat menggunakan atribut-atribut ini sebagai field dalam koleksi. Setiap field memiliki berbagai properti yang membatasi, seperti tipe data dan dimensi field vektor. Anda dapat membentuk skema koleksi dengan membuat bidang dan menentukan urutannya. Untuk kemungkinan tipe data yang dapat diterapkan, lihat <a href="/docs/id/schema.md">Penjelasan Skema</a>.</p>
<p>Anda harus menyertakan semua bidang yang ditentukan skema dalam entitas yang akan disisipkan. Untuk membuat beberapa di antaranya opsional, pertimbangkan untuk mengaktifkan bidang dinamis. Untuk detailnya, lihat <a href="/docs/id/enable-dynamic-field.md">Bidang Dinamis</a>.</p>
<ul>
<li><p><strong>Membuatnya dapat dinolkan atau menetapkan nilai default</strong></p>
<p>Untuk detail tentang cara membuat bidang dapat dinullkan atau mengatur nilai default, lihat <a href="/docs/id/nullable-and-default.md">Nullable &amp; Default</a>.</p></li>
<li><p><strong>Mengaktifkan bidang dinamis</strong></p>
<p>Untuk detail mengenai cara mengaktifkan dan menggunakan bidang dinamis, lihat <a href="/docs/id/enable-dynamic-field.md">Bidang Dinamis</a>.</p></li>
</ul>
<h2 id="Primary-key-and-AutoId" class="common-anchor-header">Kunci utama dan Identitas Otomatis<button data-href="#Primary-key-and-AutoId" class="anchor-icon" translate="no">
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
    </button></h2><p>Mirip dengan field utama dalam database relasional, koleksi memiliki field utama untuk membedakan suatu entitas dengan entitas lainnya. Setiap nilai dalam field utama bersifat unik secara global dan berhubungan dengan satu entitas tertentu.</p>
<p>Seperti yang ditunjukkan pada bagan di atas, field bernama <strong>id</strong> berfungsi sebagai field utama, dan ID <strong>0</strong> pertama berhubungan dengan entitas berjudul <em>Tingkat Kematian Virus Corona Tidak Penting</em>. Tidak akan ada entitas lain yang memiliki field utama 0.</p>
<p>Bidang utama hanya menerima bilangan bulat atau string. Saat memasukkan entitas, Anda harus menyertakan nilai field utama secara default. Namun, jika Anda telah mengaktifkan <strong>AutoId</strong> pada saat pembuatan koleksi, Milvus akan menghasilkan nilai-nilai tersebut pada saat penyisipan data. Dalam kasus seperti itu, kecualikan nilai field utama dari entitas yang akan dimasukkan.</p>
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
    </button></h2><p>Membuat indeks pada field tertentu dapat meningkatkan efisiensi pencarian. Anda disarankan untuk membuat indeks untuk semua bidang yang diandalkan oleh layanan Anda, di antaranya indeks pada bidang vektor adalah wajib.</p>
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
    </button></h2><p>Entitas adalah rekaman data yang memiliki kumpulan bidang yang sama dalam koleksi. Nilai-nilai di semua bidang pada baris yang sama membentuk sebuah entitas.</p>
<p>Anda dapat memasukkan entitas sebanyak yang Anda butuhkan ke dalam koleksi. Namun, seiring bertambahnya jumlah entitas, ukuran memori yang dibutuhkan juga bertambah, sehingga memengaruhi kinerja pencarian.</p>
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
    </button></h2><p>Memuat koleksi adalah prasyarat untuk melakukan pencarian kesamaan dan kueri dalam koleksi. Ketika Anda memuat koleksi, Milvus memuat semua berkas indeks dan data mentah di setiap bidang ke dalam memori untuk respons cepat terhadap pencarian dan kueri.</p>
<p>Pencarian dan kueri adalah operasi yang memakan banyak memori. Untuk menghemat biaya, Anda disarankan untuk melepaskan koleksi yang sedang tidak digunakan.</p>
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
    </button></h2><p>Setelah Anda membuat indeks dan memuat koleksi, Anda dapat memulai pencarian kemiripan dengan memasukkan satu atau beberapa vektor kueri. Misalnya, ketika menerima representasi vektor kueri Anda yang dibawa dalam permintaan pencarian, Milvus menggunakan jenis metrik yang ditentukan untuk mengukur kemiripan antara vektor kueri dan vektor yang ada di koleksi target sebelum mengembalikan vektor yang secara semantik mirip dengan kueri.</p>
<p>Anda juga dapat menyertakan pemfilteran metadata dalam penelusuran dan kueri untuk meningkatkan relevansi hasil. Perhatikan bahwa, kondisi pemfilteran metadata bersifat wajib dalam kueri, tetapi opsional dalam penelusuran.</p>
<p>Untuk detail tentang jenis metrik yang berlaku, lihat <a href="/docs/id/metric.md">Jenis Metrik</a>.</p>
<p>Untuk informasi lebih lanjut tentang pencarian dan kueri, lihat artikel di bab Pencarian &amp; Perangkingan, di antaranya, fitur-fitur dasar:</p>
<ul>
<li><p><a href="/docs/id/single-vector-search.md">Pencarian ANN Dasar</a></p></li>
<li><p><a href="/docs/id/filtered-search.md">Pencarian yang Difilter</a></p></li>
<li><p><a href="/docs/id/range-search.md">Pencarian Rentang</a></p></li>
<li><p><a href="/docs/id/grouping-search.md">Pencarian Pengelompokan</a></p></li>
<li><p><a href="/docs/id/multi-vector-search.md">Pencarian Hibrida</a></p></li>
<li><p><a href="/docs/id/with-iterators.md">Iterator Pencarian</a></p></li>
<li><p><a href="/docs/id/get-and-scalar-query.md">Kueri</a></p></li>
<li><p><a href="/docs/id/full-text-search.md">Pencarian Teks Lengkap</a></p></li>
<li><p><a href="/docs/id/keyword-match.md">Pencocokan Teks</a></p></li>
</ul>
<p>Selain itu, Milvus juga menyediakan perangkat tambahan untuk meningkatkan kinerja dan efisiensi pencarian. Fitur-fitur ini dinonaktifkan secara default, dan Anda dapat mengaktifkan dan menggunakannya sesuai dengan kebutuhan layanan Anda. Fitur-fitur tersebut adalah</p>
<ul>
<li><p><a href="/docs/id/use-partition-key.md">Gunakan Kunci Partisi</a></p></li>
<li><p><a href="/docs/id/mmap.md">Gunakan mmap</a></p></li>
<li><p><a href="/docs/id/clustering-compaction.md">Pemadatan Pengelompokan</a></p></li>
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
    </button></h2><p>Partisi adalah himpunan bagian dari koleksi, yang berbagi himpunan bidang yang sama dengan koleksi induknya, masing-masing berisi himpunan bagian entitas.</p>
<p>Dengan mengalokasikan entitas ke dalam partisi yang berbeda, Anda dapat membuat grup entitas. Anda dapat melakukan pencarian dan kueri di partisi tertentu agar Milvus mengabaikan entitas di partisi lain, dan meningkatkan efisiensi pencarian.</p>
<p>Untuk detailnya, lihat <a href="/docs/id/manage-partitions.md">Mengelola Partisi</a>.</p>
<h2 id="Shard" class="common-anchor-header">Pecahan<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>Pecahan adalah irisan horisontal dari sebuah koleksi. Setiap pecahan berhubungan dengan saluran input data. Setiap koleksi memiliki pecahan secara default. Anda dapat mengatur jumlah pecahan yang sesuai saat membuat koleksi berdasarkan keluaran yang diharapkan dan volume data yang akan dimasukkan ke dalam koleksi.</p>
<p>Untuk detail tentang cara mengatur nomor pecahan, lihat <a href="/docs/id/create-collection.md">Membuat Koleksi</a>.</p>
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
    </button></h2><p>Anda dapat membuat nama alias untuk koleksi Anda. Sebuah koleksi dapat memiliki beberapa alias, namun koleksi tidak dapat berbagi alias. Setelah menerima permintaan terhadap sebuah koleksi, Milvus akan mencari lokasi koleksi berdasarkan nama yang diberikan. Jika koleksi dengan nama yang diberikan tidak ada, Milvus akan terus mencari nama yang diberikan sebagai nama alias. Anda dapat menggunakan alias koleksi untuk menyesuaikan kode Anda dengan skenario yang berbeda.</p>
<p>Untuk lebih jelasnya, lihat <a href="/docs/id/manage-aliases.md">Mengelola alias</a>.</p>
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
    </button></h2><p>Anda dapat mengatur fungsi bagi Milvus untuk mendapatkan bidang pada saat pembuatan koleksi. Sebagai contoh, fungsi pencarian teks lengkap menggunakan fungsi yang ditentukan pengguna untuk mendapatkan bidang vektor jarang dari bidang varka tertentu. Untuk informasi lebih lanjut mengenai pencarian teks lengkap, lihat <a href="/docs/id/full-text-search.md">Pencarian Teks Lengkap</a>.</p>
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
    </button></h2><p>Sistem basis data terdistribusi biasanya menggunakan tingkat konsistensi untuk menentukan kesamaan data di seluruh simpul data dan replika. Anda dapat menetapkan tingkat konsistensi terpisah saat membuat koleksi atau melakukan pencarian kesamaan di dalam koleksi. Tingkat konsistensi yang berlaku adalah <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong>, dan <strong>Eventually</strong>.</p>
<p>Untuk detail mengenai tingkat konsistensi ini, lihat <a href="/docs/id/tune_consistency.md">Tingkat Konsistensi</a>.</p>
