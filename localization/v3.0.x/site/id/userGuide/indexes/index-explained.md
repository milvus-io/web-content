---
id: index-explained.md
title: Penjelasan tentang Indeks
summary: >-
  Indeks adalah struktur tambahan yang dibangun di atas data. Struktur
  internalnya bergantung pada algoritma pencarian tetangga terdekat (approximate
  nearest neighbor) yang digunakan. Indeks mempercepat proses pencarian, tetapi
  membutuhkan waktu prapemrosesan, ruang penyimpanan, dan RAM tambahan selama
  proses pencarian berlangsung. Selain itu, penggunaan indeks biasanya
  menurunkan tingkat recall (meskipun dampaknya dapat diabaikan, hal ini tetap
  penting). Oleh karena itu, artikel ini menjelaskan cara meminimalkan biaya
  penggunaan indeks sekaligus memaksimalkan manfaatnya.
---
<h1 id="Index-Explained" class="common-anchor-header">Penjelasan tentang Indeks<button data-href="#Index-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Indeks adalah struktur tambahan yang dibangun di atas data. Struktur internalnya bergantung pada algoritma pencarian tetangga terdekat yang digunakan. Indeks mempercepat proses pencarian, tetapi menimbulkan biaya tambahan berupa waktu prapemrosesan, ruang penyimpanan, dan penggunaan RAM selama proses pencarian. Selain itu, penggunaan indeks umumnya menurunkan tingkat recall (meskipun efeknya dapat diabaikan, hal ini tetap penting). Oleh karena itu, artikel ini menjelaskan cara meminimalkan biaya penggunaan indeks sekaligus memaksimalkan manfaatnya.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Di Milvus, indeks bersifat spesifik untuk setiap bidang, dan jenis indeks yang dapat diterapkan bervariasi sesuai dengan tipe data bidang yang dituju. Sebagai basis data vektor profesional, Milvus berfokus pada peningkatan kinerja pencarian vektor dan penyaringan skalar, itulah sebabnya Milvus menawarkan berbagai jenis indeks.</p>
<p>Tabel berikut mencantumkan hubungan pemetaan antara tipe data bidang dan jenis indeks yang berlaku.</p>
<table>
   <tr>
     <th><p>Tipe Data Bidang</p></th>
     <th><p>Jenis Indeks yang Dapat Digunakan</p></th>
   </tr>
   <tr>
     <td><p>FLOAT_VECTOR</p></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>FAISS</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_BRUTE_FORCE</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT16_VECTOR</p></li><li><p>BFLOAT16_VEKTOR</p></li><li><p>INT8_VEKTOR</p></li></ul></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_BRUTE_FORCE</p></li></ul></td>
   </tr>
   <tr>
     <td><p>VEKTOR_BINER</p></td>
     <td><ul><li><p>BIN_FLAT</p></li><li><p>BIN_IVF_FLAT</p></li><li><p>MINHASH_LSH</p></li><li><p>FAISS</p></li></ul></td>
   </tr>
   <tr>
     <td><p>VEKTOR_FLOAT_JARANG</p></td>
     <td><p>SPARSE_INVERTED_INDEX</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>INVERTED (Disarankan)</p></li><li><p>BITMAP</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li><p>BITMAP (Disarankan)</p></li><li><p>TERBALIK</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li><p>TERBALIK</p></li><li><p>STL_SORT</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT</p></li><li><p>DOUBLE</p></li></ul></td>
     <td><p>TERBALIK</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(elemen tipe BOOL, INT8/16/32/64, dan VARCHAR)</sup></p></td>
     <td><p>BITMAP (Disarankan)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(elemen tipe BOOL, INT8/16/32/64, FLOAT, DOUBLE, dan VARCHAR)</sup></p></td>
     <td><p>TERBALIK</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>TERBALIK</p></td>
   </tr>
</table>
<p>Artikel ini berfokus pada cara memilih indeks vektor yang tepat. Untuk bidang skalar, Anda selalu dapat menggunakan tipe indeks yang direkomendasikan.</p>
<p>Memilih jenis indeks yang tepat untuk pencarian vektor dapat berdampak signifikan terhadap kinerja dan penggunaan sumber daya. Saat memilih jenis indeks untuk bidang vektor, penting untuk mempertimbangkan berbagai faktor, termasuk struktur data yang mendasarinya, penggunaan memori, dan persyaratan kinerja.</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">Anatomi Indeks Vektor<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebagaimana ditunjukkan pada diagram di bawah ini, jenis indeks di Milvus terdiri dari tiga komponen inti, yaitu <strong>struktur data</strong>, <strong>kuantisasi</strong>, dan <strong>penyaring</strong>. Kuantisasi dan penyaring bersifat opsional, tetapi banyak digunakan karena keseimbangan keuntungan yang signifikan yang lebih baik daripada biayanya.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" /> 
   <span>Anatomi Indeks Vektor</span>
  
 </span></p>
<p>Selama pembuatan indeks, Milvus menggabungkan struktur data dan metode kuantisasi yang dipilih untuk menentukan <strong>tingkat ekspansi</strong> yang optimal. Pada saat kueri, sistem mengambil vektor kandid <code translate="no">topK × expansion rate</code>, menerapkan refiner untuk menghitung ulang jarak dengan presisi lebih tinggi, dan akhirnya mengembalikan hasil <code translate="no">topK</code> yang paling akurat. Pendekatan hibrida ini menyeimbangkan kecepatan dan akurasi dengan membatasi penyempurnaan yang memakan banyak sumber daya ke subset kandidat yang telah difilter.</p>
<h3 id="Data-structure" class="common-anchor-header">Struktur data<button data-href="#Data-structure" class="anchor-icon" translate="no">
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
    </button></h3><p>Struktur data merupakan lapisan dasar dari indeks. Jenis-jenis yang umum meliputi:</p>
<ul>
<li><p><strong>Inverted File (IVF)</strong></p>
<p>Jenis indeks seri IVF memungkinkan Milvus mengelompokkan vektor ke dalam bucket melalui partisi berbasis pusat kluster. Secara umum, aman untuk mengasumsikan bahwa semua vektor dalam suatu bucket kemungkinan besar berada dekat dengan vektor kueri jika pusat kluster bucket tersebut dekat dengan vektor kueri. Berdasarkan premis ini, Milvus hanya memindai embedding vektor di bucket-bucket yang pusatnya dekat dengan vektor kueri, alih-alih memeriksa seluruh dataset. Strategi ini mengurangi biaya komputasi sambil mempertahankan akurasi yang dapat diterima.</p>
<p>Jenis struktur data indeks ini ideal untuk dataset berskala besar yang membutuhkan throughput yang cepat.</p></li>
<li><p><strong>Struktur berbasis graf</strong></p>
<p>Struktur data berbasis graf untuk pencarian vektor, seperti Hierarchical Navigable Small World (<a href="https://arxiv.org/abs/1603.09320">HNSW</a>), membangun graf berlapis di mana setiap vektor terhubung ke tetangga terdekatnya. Kueri menelusuri hierarki ini, dimulai dari lapisan atas yang kasar dan beralih ke lapisan bawah, sehingga memungkinkan kompleksitas pencarian waktu logaritmik yang efisien.</p>
<p>Jenis struktur data indeks ini unggul dalam ruang berdimensi tinggi dan skenario yang menuntut kueri dengan latensi rendah.</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">Kuantisasi<button data-href="#Quantization" class="anchor-icon" translate="no">
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
    </button></h3><p>Kuantisasi mengurangi penggunaan memori dan biaya komputasi melalui representasi yang lebih kasar:</p>
<ul>
<li><p><strong>Kuantisasi Skalar</strong> (mis. <strong>SQ8</strong>) memungkinkan Milvus mengompres setiap dimensi vektor menjadi satu byte (8-bit), sehingga mengurangi penggunaan memori sebesar 75% dibandingkan dengan bilangan floating-point 32-bit sambil tetap mempertahankan akurasi yang memadai.</p></li>
<li><p><strong>Kuantisasi Produk</strong> (<strong>PQ</strong>) memungkinkan Milvus membagi vektor menjadi subvektor dan mengkodekannya menggunakan pengelompokan berbasis buku kode. Hal ini menghasilkan rasio kompresi yang lebih tinggi (misalnya, 4-32x) dengan sedikit penurunan recall, sehingga cocok untuk lingkungan dengan keterbatasan memori.</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">Refiner<button data-href="#Refiner" class="anchor-icon" translate="no">
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
    </button></h3><p>Kuantisasi pada dasarnya bersifat lossy. Untuk mempertahankan tingkat recall, kuantisasi secara konsisten menghasilkan lebih banyak kandidat top-K daripada yang diperlukan, sehingga memungkinkan refiner menggunakan presisi yang lebih tinggi untuk memilih hasil top-K dari kandidat-kandidat tersebut, yang pada akhirnya meningkatkan tingkat recall.</p>
<p>Misalnya, refiner FP32 beroperasi pada kandidat hasil pencarian yang dikembalikan oleh kuantisasi dengan menghitung ulang jarak menggunakan presisi FP32, bukan nilai-nilai yang telah dikuantisasi.</p>
<p>Hal ini sangat penting untuk aplikasi yang memerlukan keseimbangan antara efisiensi pencarian dan presisi, seperti pencarian semantik atau sistem rekomendasi, di mana variasi jarak yang kecil berdampak signifikan terhadap kualitas hasil.</p>
<h3 id="Summary" class="common-anchor-header">Ringkasan<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h3><p>Arsitektur berjenjang ini — penyaringan kasar melalui struktur data, komputasi efisien melalui kuantisasi, dan penyempurnaan presisi melalui penyempurnaan — memungkinkan Milvus mengoptimalkan keseimbangan antara akurasi dan kinerja secara adaptif.</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">Kompromi kinerja<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>Saat mengevaluasi kinerja, sangat penting untuk menyeimbangkan <strong>waktu pembangunan</strong>, <strong>kueri per detik (QPS)</strong>, dan <strong>tingkat recall</strong>. Aturan umumnya adalah sebagai berikut:</p>
<ul>
<li><p><strong>Jenis indeks berbasis graf</strong> biasanya mengungguli <strong>varian IVF</strong> dalam hal <strong>QPS</strong>.</p></li>
<li><p><strong>Varian IVF</strong> sangat cocok untuk skenario dengan <strong>topK yang besar (misalnya, lebih dari 2.000)</strong>.</p></li>
<li><p><strong>PQ</strong> biasanya menawarkan tingkat recall yang lebih baik pada tingkat kompresi yang serupa jika dibandingkan dengan <strong>SQ</strong>, meskipun SQ memberikan kinerja yang lebih cepat.</p></li>
<li><p>Menggunakan hard drive untuk sebagian indeks (seperti pada <strong>DiskANN</strong>) membantu mengelola dataset besar, tetapi juga berpotensi menimbulkan bottleneck IOPS.</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">Kapasitas<button data-href="#Capacity" class="anchor-icon" translate="no">
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
    </button></h3><p>Kapasitas biasanya berkaitan dengan hubungan antara ukuran data dan RAM yang tersedia. Saat menangani kapasitas, pertimbangkan hal-hal berikut:</p>
<ul>
<li><p>Jika seperempat data mentah Anda muat dalam memori, pertimbangkan DiskANN karena latensinya yang stabil.</p></li>
<li><p>Jika seluruh data mentah Anda muat di memori, pertimbangkan jenis indeks berbasis memori dan mmap.</p></li>
<li><p>Anda dapat menggunakan jenis indeks yang menerapkan kuantisasi dan mmap untuk menukar akurasi demi kapasitas maksimum.</p></li>
</ul>
<div class="alert note">
<p>Mmap tidak selalu menjadi solusi. Ketika sebagian besar data Anda berada di disk, DiskANN memberikan latensi yang lebih baik.</p>
</div>
<h3 id="Recall" class="common-anchor-header">Recall<button data-href="#Recall" class="anchor-icon" translate="no">
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
    </button></h3><p>Recall biasanya melibatkan rasio penyaringan, yang mengacu pada data yang disaring sebelum pencarian. Saat membahas recall, pertimbangkan hal-hal berikut:</p>
<ul>
<li><p>Jika rasio penyaringan kurang dari 85%, jenis indeks berbasis graf lebih unggul daripada varian IVF.</p></li>
<li><p>Jika rasio penyaringan berada di antara 85% dan 95%, gunakan varian IVF.</p></li>
<li><p>Jika rasio penyaringan lebih dari 98%, gunakan Brute-Force (FLAT) untuk hasil pencarian yang paling akurat.</p></li>
</ul>
<div class="alert note">
<p>Hal-hal di atas tidak selalu benar. Anda disarankan untuk menyesuaikan recall dengan berbagai jenis indeks guna menentukan jenis indeks mana yang paling efektif.</p>
</div>
<h3 id="Performance" class="common-anchor-header">Kinerja<button data-href="#Performance" class="anchor-icon" translate="no">
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
    </button></h3><p>Kinerja pencarian biasanya melibatkan top-K, yang mengacu pada jumlah catatan yang dihasilkan oleh pencarian. Saat membahas kinerja, pertimbangkan hal-hal berikut:</p>
<ul>
<li><p>Untuk pencarian dengan top-K kecil (misalnya, 2.000) yang membutuhkan tingkat recall tinggi, jenis indeks berbasis graf lebih unggul daripada varian IVF.</p></li>
<li><p>Untuk pencarian dengan top-K yang besar (dibandingkan dengan jumlah total embedding vektor), varian IVF merupakan pilihan yang lebih baik daripada jenis indeks berbasis graf.</p></li>
<li><p>Untuk pencarian dengan top-K berukuran sedang dan rasio filter yang tinggi, varian IVF merupakan pilihan yang lebih baik.</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">Matriks Keputusan: Memilih jenis indeks yang paling sesuai<button data-href="#Decision-Matrix-Choosing-the-most-appropriate-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Tabel berikut adalah matriks keputusan yang dapat Anda jadikan acuan saat memilih jenis indeks yang sesuai.</p>
<table>
   <tr>
     <th><p>Skenario</p></th>
     <th><p>Indeks yang Direkomendasikan</p></th>
     <th><p>Catatan</p></th>
   </tr>
   <tr>
     <td><p>Data mentah muat dalam memori</p></td>
     <td><p>HNSW, IVF + Penyempurnaan</p></td>
     <td><p>Gunakan HNSW untuk low-<code translate="no">k</code>/high recall.</p></td>
   </tr>
   <tr>
     <td><p>Data mentah di disk, SSD</p></td>
     <td><p>DiskANN</p></td>
     <td><p>Optimal untuk kueri yang sensitif terhadap latensi.</p></td>
   </tr>
   <tr>
     <td><p>Data mentah di disk, RAM terbatas</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>Menyeimbangkan penggunaan memori dan akses disk.</p></td>
   </tr>
   <tr>
     <td><p>Rasio penyaringan tinggi (&gt;95%)</p></td>
     <td><p>Brute-Force (FLAT)</p></td>
     <td><p>Menghindari beban indeks untuk kumpulan kandidat yang sangat kecil.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">k</code> besar (≥1% dari dataset)</p></td>
     <td><p>IVF</p></td>
     <td><p>Pemangkasan kluster mengurangi beban komputasi.</p></td>
   </tr>
   <tr>
     <td><p>Tingkat recall yang sangat tinggi (&gt;99%)</p></td>
     <td><p>Brute-Force (FLAT) + GPU</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<h2 id="Memory-usage-estimation" class="common-anchor-header">Perkiraan penggunaan memori<button data-href="#Memory-usage-estimation" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>Bagian ini berfokus pada perhitungan konsumsi memori dari jenis indeks tertentu dan mencakup banyak detail teknis. Anda dapat melewati bagian ini dengan aman jika tidak sesuai dengan minat Anda.</p>
</div>
<p>Konsumsi memori suatu indeks dipengaruhi oleh struktur datanya, tingkat kompresi melalui kuantisasi, dan refiner yang digunakan. Secara umum, indeks berbasis graf biasanya memiliki jejak memori yang lebih besar karena struktur grafnya (misalnya, <strong>HNSW</strong>), yang biasanya menimbulkan overhead ruang per vektor yang cukup signifikan. Sebaliknya, IVF dan variannya lebih efisien dalam hal memori karena overhead per ruang vektor yang diterapkan lebih sedikit. Namun, teknik-teknik canggih seperti <strong>DiskANN</strong> memungkinkan bagian-bagian dari indeks, seperti graf atau refiner, ditempatkan di disk, sehingga mengurangi beban memori sekaligus mempertahankan kinerja.</p>
<p>Secara spesifik, penggunaan memori suatu indeks dapat dihitung sebagai berikut:</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">Penggunaan memori indeks IVF<button data-href="#IVF-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>Indeks IVF menyeimbangkan efisiensi memori dengan kinerja pencarian dengan mempartisi data ke dalam kluster. Di bawah ini adalah rincian memori yang digunakan oleh 1 juta vektor berdimensi 128 yang diindeks menggunakan varian IVF.</p>
<ol>
<li><p><strong>Hitung memori yang digunakan oleh pusat kluster.</strong></p>
<p>Jenis indeks seri IVF memungkinkan Milvus mengelompokkan vektor ke dalam bucket menggunakan partisi berbasis centroid. Setiap centroid dimasukkan ke dalam indeks dalam bentuk embedding vektor mentah. Saat Anda membagi vektor menjadi 2.000 kluster, penggunaan memori dapat dihitung sebagai berikut:</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Hitung memori yang digunakan oleh penugasan kluster.</strong></p>
<p>Setiap embedding vektor ditugaskan ke suatu kluster dan disimpan sebagai ID bilangan bulat. Untuk 2.000 kluster, bilangan bulat 2-byte sudah cukup. Penggunaan memori dapat dihitung sebagai berikut:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Hitung kompresi yang disebabkan oleh kuantisasi.</strong></p>
<p>Varian IVF biasanya menggunakan PQ dan SQ8, dan penggunaan memori dapat diperkirakan sebagai berikut:</p>
<ul>
<li><p>Menggunakan PQ dengan 8 subkuantisator</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Menggunakan SQ8</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Tabel berikut mencantumkan perkiraan penggunaan memori dengan konfigurasi yang berbeda:</p>
<p><table>
<tr>
<th><p>Konfigurasi</p></th>
<th><p>Perkiraan Memori</p></th>
<th><p>Total Memori</p></th>
</tr>
<tr>
<td><p>IVF-PQ (tanpa penyempurnaan)</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB</p></td>
<td><p>11,0 MB</p></td>
</tr>
<tr>
<td><p>IVF-PQ + penyempurnaan 10% data mentah</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB + 51,2 MB</p></td>
<td><p>62,2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8 (tanpa penyempurnaan)</p></td>
<td><p>1,0 MB + 2,0 MB + 128 MB</p></td>
<td><p>131,0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT (vektor mentah lengkap)</p></td>
<td><p>1,0 MB + 2,0 MB + 512 MB</p></td>
<td><p>515,0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>Hitung beban pemurnian.</strong></p>
<p>Varian IVF sering dipasangkan dengan refiner untuk menyusun ulang peringkat kandidat. Untuk pencarian yang mengambil 10 hasil teratas dengan tingkat ekspansi 5, overhead penyempurnaan dapat diperkirakan sebagai berikut:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">Penggunaan memori indeks berbasis graf<button data-href="#Graph-based-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>Jenis indeks berbasis graf seperti HNSW memerlukan memori yang signifikan untuk menyimpan struktur graf dan embedding vektor mentah. Di bawah ini adalah rincian terperinci mengenai memori yang digunakan oleh 1 juta vektor berdimensi 128 yang diindeks menggunakan jenis indeks HNSW.</p>
<ol>
<li><p><strong>Hitung memori yang digunakan oleh struktur graf.</strong></p>
<p>Setiap vektor dalam HNSW mempertahankan koneksi ke tetangganya. Dengan derajat graf (tepi per simpul) sebesar 32, memori yang digunakan dapat dihitung sebagai berikut:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Hitung memori yang digunakan oleh embedding vektor mentah.</strong></p>
<p>Memori yang digunakan untuk menyimpan vektor FP32 yang tidak terkompresi dapat dihitung sebagai berikut:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>Saat Anda menggunakan HNSW untuk mengindeks 1 juta embedding vektor 128 dimensi, total memori yang digunakan adalah <strong>128 MB (grafik) + 512 MB (vektor) = 640 MB</strong>.</p></li>
<li><p><strong>Hitung kompresi yang disebabkan oleh kuantisasi.</strong></p>
<p>Kuantisasi mengurangi ukuran vektor. Misalnya, menggunakan PQ dengan 8 subkuantisator (8 byte per vektor) menghasilkan kompresi yang drastis. Memori yang digunakan oleh vektor embedding terkompresi dapat dihitung sebagai berikut:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>Hal ini menghasilkan tingkat kompresi 64 kali lipat jika dibandingkan dengan vektor embedding mentah, dan total memori yang digunakan oleh tipe indeks <strong>HNSWPQ</strong> adalah <strong>128 MB (grafik) + 8 MB (vektor terkompresi) = 136 MB</strong>.</p></li>
<li><p><strong>Hitung beban tambahan penyempurnaan.</strong></p>
<p>Penyempurnaan, seperti pemeringkatan ulang dengan vektor mentah, memuat data presisi tinggi ke dalam memori untuk sementara waktu. Untuk pencarian yang mengambil 10 hasil teratas dengan tingkat ekspansi 5, overhead penyempurnaan dapat diperkirakan sebagai berikut:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">Pertimbangan lain<button data-href="#Other-considerations" class="anchor-icon" translate="no">
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
    </button></h3><p>Meskipun indeks IVF dan berbasis grafik mengoptimalkan penggunaan memori melalui kuantisasi, file yang dipetakan ke memori (mmap) dan DiskANN menangani skenario di mana kumpulan data melebihi memori akses acak (RAM) yang tersedia.</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN adalah indeks berbasis grafik Vamana yang menghubungkan titik-titik data untuk navigasi yang efisien selama pencarian sambil menerapkan PQ untuk mengurangi ukuran vektor dan memungkinkan perhitungan jarak perkiraan yang cepat antar vektor.</p>
<p>Grafik Vamana disimpan di disk, yang memungkinkan DiskANN menangani kumpulan data besar yang jika tidak akan terlalu besar untuk dimuat dalam memori. Hal ini sangat berguna untuk kumpulan data dengan miliaran titik.</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">File yang dipetakan ke memori (mmap)</h4><p>Pemetaan memori (mmap) memungkinkan akses memori langsung ke berkas besar di disk, sehingga Milvus dapat menyimpan indeks dan data baik di memori maupun di hard drive. Pendekatan ini membantu mengoptimalkan operasi I/O dengan mengurangi beban panggilan I/O berdasarkan frekuensi akses, sehingga memperluas kapasitas penyimpanan untuk koleksi tanpa secara signifikan memengaruhi kinerja pencarian.</p>
<p>Secara khusus, Anda dapat mengonfigurasi Milvus untuk memetakan data mentah di bidang-bidang tertentu ke memori, alih-alih memuatnya sepenuhnya ke dalam memori. Dengan cara ini, Anda dapat memperoleh akses memori langsung ke bidang-bidang tersebut tanpa perlu khawatir tentang masalah memori dan memperluas kapasitas koleksi.</p>
