---
id: index-explained.md
title: Penjelasan Indeks
summary: >-
  Indeks adalah struktur tambahan yang dibangun di atas data. Struktur
  internalnya tergantung pada perkiraan algoritma pencarian tetangga terdekat
  yang digunakan. Indeks mempercepat pencarian, tetapi menimbulkan tambahan
  waktu, ruang, dan RAM selama pencarian. Selain itu, penggunaan indeks biasanya
  menurunkan tingkat pemanggilan (meskipun efeknya dapat diabaikan, namun tetap
  penting). Oleh karena itu, artikel ini menjelaskan cara meminimalkan biaya
  penggunaan indeks sekaligus memaksimalkan manfaatnya.
---
<h1 id="Index-Explained" class="common-anchor-header">Penjelasan Indeks<button data-href="#Index-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Indeks adalah struktur tambahan yang dibangun di atas data. Struktur internalnya bergantung pada perkiraan algoritme pencarian tetangga terdekat yang digunakan. Indeks mempercepat pencarian, tetapi menimbulkan waktu, ruang, dan RAM tambahan selama pencarian. Selain itu, menggunakan indeks biasanya menurunkan tingkat recall (meskipun efeknya dapat diabaikan, namun tetap penting). Oleh karena itu, artikel ini menjelaskan cara meminimalkan biaya penggunaan indeks sekaligus memaksimalkan manfaatnya.</p>
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
    </button></h2><p>Di Milvus, indeks bersifat spesifik untuk bidang, dan jenis indeks yang berlaku bervariasi sesuai dengan jenis data dari bidang target. Sebagai basis data vektor profesional, Milvus berfokus pada peningkatan kinerja pencarian vektor dan pemfilteran skalar, dan itulah sebabnya Milvus menawarkan berbagai jenis indeks.</p>
<p>Tabel berikut mencantumkan hubungan pemetaan antara tipe data bidang dan tipe indeks yang berlaku.</p>
<table>
   <tr>
     <th><p>Tipe Data Bidang</p></th>
     <th><p>Jenis Indeks yang Berlaku</p></th>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT_VECTOR</p></li><li><p>FLOAT16_VECTOR</p></li><li><p>BFLOAT16_VECTOR</p></li></ul></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>HNSW</p></li><li><p>DISKANN</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BINARY_VECTOR</p></td>
     <td><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
   </tr>
   <tr>
     <td><p>VEKTOR MENGAMBANG JARANG</p></td>
     <td><p>SPARSE_INVERTED_INDEX</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>TERBALIK (Disarankan)</p></li><li><p>BITMAP</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li>BITMAP (Disarankan)</li><li>TERBALIK</li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li>TERBALIK</li><li>STL_SORT</li></ul></td>
   </tr>
   <tr>
     <td><ul><li>FLOAT</li><li>GANDA</li></ul></td>
     <td><p>TERBALIK</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(elemen tipe BOOL, INT8/16/32/64, dan VARCHAR)</sup></p></td>
     <td><p>BITMAP (Direkomendasikan)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(elemen dari tipe BOOL, INT8/16/32/64, FLOAT, DOUBLE, dan VARCHAR)</sup></p></td>
     <td><p>TERBALIK</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>TERBALIK</p></td>
   </tr>
</table>
<p>Artikel ini berfokus pada cara memilih indeks vektor yang sesuai. Untuk bidang skalar, Anda selalu dapat menggunakan jenis indeks yang disarankan.</p>
<p>Memilih jenis indeks yang sesuai untuk pencarian vektor dapat memengaruhi kinerja dan penggunaan sumber daya secara signifikan. Saat memilih jenis indeks untuk bidang vektor, penting untuk mempertimbangkan berbagai faktor, termasuk struktur data yang mendasari, penggunaan memori, dan persyaratan kinerja.</p>
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
    </button></h2><p>Seperti yang ditunjukkan pada diagram di bawah ini, sebuah tipe indeks di Milvus terdiri dari tiga komponen inti, yaitu <strong>struktur data</strong>, <strong>kuantisasi</strong>, dan <strong>refiner</strong>. Kuantisasi dan refiner bersifat opsional, tetapi banyak digunakan karena keuntungan yang diperoleh lebih baik daripada biaya.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" />
   </span> <span class="img-wrapper"> <span>Anatomi Indeks Vektor</span> </span></p>
<p>Selama pembuatan indeks, Milvus menggabungkan struktur data dan metode kuantisasi yang dipilih untuk menentukan <strong>tingkat ekspansi</strong> yang optimal. Pada waktu kueri, sistem mengambil vektor kandidat <code translate="no">topK × expansion rate</code>, menerapkan pemurni untuk menghitung ulang jarak dengan presisi yang lebih tinggi, dan akhirnya mengembalikan hasil <code translate="no">topK</code> yang paling akurat. Pendekatan hibrida ini menyeimbangkan kecepatan dan akurasi dengan membatasi pemurnian intensif sumber daya pada subset kandidat yang telah disaring.</p>
<h3 id="Data-structure" class="common-anchor-header">Struktur data</h3><p>Struktur data membentuk lapisan dasar indeks. Jenis yang umum termasuk:</p>
<ul>
<li><p><strong>File Terbalik (Inverted File) (IVF)</strong></p>
<p>Jenis indeks seri IVF memungkinkan Milvus untuk mengelompokkan vektor ke dalam ember melalui partisi berbasis centroid. Secara umum dapat diasumsikan bahwa semua vektor dalam sebuah bucket cenderung dekat dengan vektor kueri jika centroid bucket dekat dengan vektor kueri. Berdasarkan premis ini, Milvus hanya memindai penyematan vektor dalam bucket yang centroidnya dekat dengan vektor kueri, daripada memeriksa seluruh dataset. Strategi ini mengurangi biaya komputasi sambil mempertahankan akurasi yang dapat diterima.</p>
<p>Jenis struktur data indeks ini ideal untuk set data berskala besar yang membutuhkan throughput yang cepat.</p></li>
<li><p><strong>Struktur berbasis grafik</strong></p>
<p>Struktur data berbasis grafik untuk pencarian vektor, seperti Hierarchical Navigable Small World<a href="https://arxiv.org/abs/1603.09320">(HNSW</a>), membuat grafik berlapis di mana setiap vektor terhubung ke tetangga terdekatnya. Kueri menavigasi hirarki ini, mulai dari lapisan atas yang kasar dan beralih melalui lapisan yang lebih rendah, sehingga memungkinkan kompleksitas pencarian logaritmik-waktu yang efisien.</p>
<p>Jenis struktur data indeks ini unggul dalam ruang dimensi tinggi dan skenario yang menuntut kueri latensi rendah.</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">Kuantisasi</h3><p>Kuantisasi mengurangi jejak memori dan biaya komputasi melalui representasi yang lebih kasar:</p>
<ul>
<li><p><strong>Kuantisasi Skalar</strong> (misalnya <strong>SQ8</strong>) memungkinkan Milvus untuk memampatkan setiap dimensi vektor menjadi satu byte (8-bit), mengurangi penggunaan memori hingga 75% dibandingkan dengan float 32-bit sambil mempertahankan akurasi yang wajar.</p></li>
<li><p><strong>Product Quantization</strong><strong>(PQ</strong>) memungkinkan Milvus untuk membagi vektor menjadi subvektor dan mengkodekannya menggunakan pengelompokan berbasis codebook. Hal ini menghasilkan rasio kompresi yang lebih tinggi (misalnya, 4-32x) dengan biaya pemanggilan yang sedikit berkurang, sehingga cocok untuk lingkungan dengan memori terbatas.</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">Pemurni</h3><p>Kuantisasi pada dasarnya bersifat lossy. Untuk mempertahankan tingkat penarikan, kuantisasi secara konsisten menghasilkan lebih banyak kandidat top-K daripada yang diperlukan, memungkinkan refiner menggunakan presisi yang lebih tinggi untuk lebih memilih hasil top-K dari kandidat-kandidat ini, sehingga meningkatkan tingkat penarikan.</p>
<p>Sebagai contoh, refiner FP32 beroperasi pada kandidat hasil pencarian yang dikembalikan oleh kuantisasi dengan menghitung ulang jarak menggunakan presisi FP32 daripada nilai yang dikuantisasi.</p>
<p>Hal ini sangat penting untuk aplikasi yang membutuhkan pertukaran antara efisiensi pencarian dan presisi, seperti pencarian semantik atau sistem rekomendasi, di mana variasi jarak yang kecil secara signifikan berdampak pada kualitas hasil.</p>
<h3 id="Summary" class="common-anchor-header">Ringkasan</h3><p>Arsitektur berjenjang ini - pemfilteran kasar melalui struktur data, komputasi yang efisien melalui kuantisasi, dan penyetelan presisi melalui penyempurnaan - memungkinkan Milvus untuk mengoptimalkan pertukaran akurasi-kinerja secara adaptif.</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">Pengorbanan kinerja<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>Ketika mengevaluasi performa, sangat penting untuk menyeimbangkan <strong>waktu pembuatan</strong>, <strong>kueri per detik (QPS)</strong>, dan <strong>tingkat penarikan</strong>. Aturan umumnya adalah sebagai berikut:</p>
<ul>
<li><p><strong>Jenis indeks berbasis grafik</strong> biasanya mengungguli <strong>varian IVF</strong> dalam hal <strong>QPS</strong>.</p></li>
<li><p><strong>Varian IVF</strong> sangat cocok untuk skenario dengan <strong>topK yang besar (misalnya, lebih dari 2.000)</strong>.</p></li>
<li><p><strong>PQ</strong> biasanya menawarkan tingkat recall yang lebih baik pada tingkat kompresi yang sama jika dibandingkan dengan <strong>SQ</strong>, meskipun <strong>SQ</strong> memberikan kinerja yang lebih cepat.</p></li>
<li><p>Menggunakan hard drive untuk sebagian indeks (seperti pada <strong>DiskANN</strong>) membantu mengelola kumpulan data yang besar, tetapi juga menimbulkan potensi kemacetan IOPS.</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">Kapasitas</h3><p>Kapasitas biasanya melibatkan hubungan antara ukuran data dan RAM yang tersedia. Ketika berurusan dengan kapasitas, pertimbangkan hal berikut:</p>
<ul>
<li><p>Jika seperempat dari data mentah Anda muat dalam memori, pertimbangkan DiskANN untuk latensi yang stabil.</p></li>
<li><p>Jika semua data mentah Anda muat ke dalam memori, pertimbangkan jenis indeks berbasis memori dan mmap.</p></li>
<li><p>Anda dapat menggunakan jenis indeks yang menerapkan kuantisasi dan mmap untuk menukar akurasi dengan kapasitas maksimum.</p></li>
</ul>
<div class="alert note">
<p>Mmap tidak selalu menjadi solusi. Ketika sebagian besar data Anda ada di disk, DiskANN menyediakan latensi yang lebih baik.</p>
</div>
<h3 id="Recall" class="common-anchor-header">Pemanggilan kembali</h3><p>Pemanggilan kembali biasanya melibatkan rasio filter, yang mengacu pada data yang disaring sebelum pencarian. Ketika berurusan dengan pemanggilan, pertimbangkan hal berikut:</p>
<ul>
<li><p>Jika rasio filter kurang dari 85%, jenis indeks berbasis grafik mengungguli varian IVF.</p></li>
<li><p>Jika rasio filter antara 85% dan 95%, gunakan varian IVF.</p></li>
<li><p>Jika rasio filter lebih dari 98%, gunakan Brute-Force (FLAT) untuk hasil pencarian yang paling akurat.</p></li>
</ul>
<div class="alert note">
<p>Hal-hal di atas tidak selalu benar. Anda disarankan untuk menyetel pemanggilan kembali dengan jenis indeks yang berbeda untuk menentukan jenis indeks mana yang berfungsi.</p>
</div>
<h3 id="Performance" class="common-anchor-header">Kinerja</h3><p>Performa pencarian biasanya melibatkan K teratas, yang mengacu pada jumlah rekaman yang dikembalikan oleh pencarian. Ketika berurusan dengan kinerja, pertimbangkan hal berikut:</p>
<ul>
<li><p>Untuk pencarian dengan top-K kecil (misalnya, 2.000) yang membutuhkan tingkat penarikan yang tinggi, jenis indeks berbasis grafik mengungguli varian IVF.</p></li>
<li><p>Untuk pencarian dengan top-K yang besar (dibandingkan dengan jumlah total sematan vektor), varian IVF adalah pilihan yang lebih baik daripada jenis indeks berbasis grafik.</p></li>
<li><p>Untuk pencarian dengan top-K berukuran sedang dan rasio filter yang tinggi, varian IVF adalah pilihan yang lebih baik.</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">Matriks Keputusan: Memilih jenis indeks yang paling tepat</h3><p>Tabel berikut ini adalah matriks keputusan yang dapat Anda jadikan acuan saat memilih jenis indeks yang sesuai.</p>
<table>
   <tr>
     <th><p>Skenario</p></th>
     <th><p>Indeks yang Direkomendasikan</p></th>
     <th><p>Catatan</p></th>
   </tr>
   <tr>
     <td><p>Data mentah muat dalam memori</p></td>
     <td><p>HNSW, IVF + Penghalusan</p></td>
     <td><p>Gunakan HNSW untuk penarikan rendah-<code translate="no">k</code>/tinggi.</p></td>
   </tr>
   <tr>
     <td><p>Data mentah pada disk, SSD</p></td>
     <td><p>DiskANN</p></td>
     <td><p>Optimal untuk kueri yang peka terhadap latensi.</p></td>
   </tr>
   <tr>
     <td><p>Data mentah pada disk, RAM terbatas</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>Menyeimbangkan memori dan akses disk.</p></td>
   </tr>
   <tr>
     <td><p>Rasio filter tinggi (&gt;95%)</p></td>
     <td><p>Brute-Force (FLAT)</p></td>
     <td><p>Menghindari overhead indeks untuk set kandidat yang kecil.</p></td>
   </tr>
   <tr>
     <td><p>Besar <code translate="no">k</code> (≥1% dari set data)</p></td>
     <td><p>IVF</p></td>
     <td><p>Pemangkasan klaster mengurangi komputasi.</p></td>
   </tr>
   <tr>
     <td><p>Tingkat penarikan yang sangat tinggi (&gt;99%)</p></td>
     <td><p>Brute-Force (FLAT) + GPU</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<h2 id="Memory-usage-estimation" class="common-anchor-header">Estimasi penggunaan memori<button data-href="#Memory-usage-estimation" class="anchor-icon" translate="no">
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
<p>Bagian ini berfokus pada penghitungan konsumsi memori dari jenis indeks tertentu dan mencakup banyak detail teknis. Anda dapat melewatkan bagian ini dengan aman jika tidak sesuai dengan minat Anda.</p>
</div>
<p>Konsumsi memori indeks dipengaruhi oleh struktur data, tingkat kompresi melalui kuantisasi, dan refiner yang digunakan. Secara umum, indeks berbasis grafik biasanya memiliki jejak memori yang lebih tinggi karena struktur grafik (misalnya, <strong>HNSW</strong>), yang biasanya mengimplikasikan overhead ruang per vektor yang nyata. Sebaliknya, IVF dan variannya lebih hemat memori karena overhead ruang per vektor lebih sedikit. Namun, teknik canggih seperti <strong>DiskANN</strong> memungkinkan bagian dari indeks, seperti grafik atau refiner, berada di disk, sehingga mengurangi beban memori sambil mempertahankan kinerja.</p>
<p>Secara khusus, penggunaan memori indeks dapat dihitung sebagai berikut:</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">Penggunaan memori indeks IVF</h3><p>Indeks IVF menyeimbangkan efisiensi memori dengan kinerja pencarian dengan mempartisi data ke dalam cluster. Di bawah ini adalah rincian memori yang digunakan oleh 1 juta vektor 128 dimensi yang diindeks menggunakan varian IVF.</p>
<ol>
<li><p><strong>Hitung memori yang digunakan oleh centroid.</strong></p>
<p>Jenis indeks seri IVF memungkinkan Milvus untuk mengelompokkan vektor ke dalam ember menggunakan partisi berbasis centroid. Setiap centroid disertakan dalam indeks dalam penyematan vektor mentah. Ketika Anda membagi vektor menjadi 2.000 cluster, penggunaan memori dapat dihitung sebagai berikut:</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Hitung memori yang digunakan oleh penugasan cluster.</strong></p>
<p>Setiap penyematan vektor ditugaskan ke klaster dan disimpan sebagai ID bilangan bulat. Untuk 2.000 cluster, bilangan bulat 2-byte sudah cukup. Penggunaan memori dapat dihitung sebagai berikut:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Hitung kompresi yang disebabkan oleh kuantisasi.</strong></p>
<p>Varian IVF biasanya menggunakan PQ dan SQ8, dan penggunaan memori dapat diperkirakan sebagai berikut:</p>
<ul>
<li><p>Menggunakan PQ dengan 8 subkuantisasi</p>
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
<th><p>Estimasi Memori</p></th>
<th><p>Total Memori</p></th>
</tr>
<tr>
<td><p>IVF-PQ (tanpa perbaikan)</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB</p></td>
<td><p>11,0 MB</p></td>
</tr>
<tr>
<td><p>IVF-PQ + 10% perbaikan mentah</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB + 51,2 MB</p></td>
<td><p>62,2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8 (tanpa perbaikan)</p></td>
<td><p>1,0 MB + 2,0 MB + 128 MB</p></td>
<td><p>131,0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT (vektor mentah penuh)</p></td>
<td><p>1,0 MB + 2,0 MB + 512 MB</p></td>
<td><p>515,0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>Hitung biaya tambahan perbaikan.</strong></p>
<p>Varian IVF sering kali dipasangkan dengan pemurni untuk memeringkat ulang kandidat. Untuk pencarian yang mengambil 10 hasil teratas dengan tingkat ekspansi 5, overhead perbaikan dapat diperkirakan sebagai berikut:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">Penggunaan memori indeks berbasis grafik</h3><p>Jenis indeks berbasis grafik seperti HNSW membutuhkan memori yang signifikan untuk menyimpan struktur grafik dan penyematan vektor mentah. Di bawah ini adalah rincian detail memori yang dikonsumsi oleh 1 juta vektor 128 dimensi yang diindeks menggunakan jenis indeks HNSW.</p>
<ol>
<li><p><strong>Hitung memori yang digunakan oleh struktur graf.</strong></p>
<p>Setiap vektor dalam HNSW mempertahankan koneksi ke tetangganya. Dengan derajat graf (sisi per simpul) sebesar 32, memori yang digunakan dapat dihitung sebagai berikut:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Hitung memori yang digunakan oleh penyematan vektor mentah.</strong></p>
<p>Memori yang digunakan untuk menyimpan vektor FP32 yang tidak dikompresi dapat dihitung sebagai berikut:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>Bila Anda menggunakan HNSW untuk mengindeks 1 juta embedding vektor 128 dimensi, total memori yang digunakan adalah <strong>128 MB (grafik) + 512 MB (vektor) = 640 MB</strong>.</p></li>
<li><p><strong>Hitung kompresi yang disebabkan oleh kuantisasi.</strong></p>
<p>Kuantisasi mengurangi ukuran vektor. Sebagai contoh, menggunakan PQ dengan 8 subkuantisasi (8 byte per vektor) menyebabkan kompresi yang drastis. Memori yang dikonsumsi oleh penyematan vektor yang dikompresi dapat dihitung sebagai berikut:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>Ini mencapai tingkat kompresi 64 kali lipat bila dibandingkan dengan embedding vektor mentah, dan total memori yang digunakan oleh tipe indeks <strong>HNSWPQ</strong> adalah <strong>128 MB (grafik) + 8 MB (vektor terkompresi) = 136 MB</strong>.</p></li>
<li><p><strong>Hitung biaya overhead penyempurnaan.</strong></p>
<p>Refinement, seperti pemeringkatan ulang dengan vektor mentah, untuk sementara memuat data presisi tinggi ke dalam memori. Untuk pencarian yang mengambil 10 hasil teratas dengan tingkat ekspansi 5, overhead refinement dapat diperkirakan sebagai berikut:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">Pertimbangan lain</h3><p>Sementara IVF dan indeks berbasis grafik mengoptimalkan penggunaan memori melalui kuantisasi, file yang dipetakan dengan memori (mmap), dan skenario alamat DiskANN di mana kumpulan data melebihi memori akses acak (RAM) yang tersedia.</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN adalah indeks berbasis grafik Vamana yang menghubungkan titik-titik data untuk navigasi yang efisien selama pencarian sambil menerapkan PQ untuk mengurangi ukuran vektor dan memungkinkan penghitungan jarak perkiraan yang cepat antar vektor.</p>
<p>Grafik Vamana disimpan di disk, yang memungkinkan DiskANN untuk menangani kumpulan data besar yang jika tidak, akan terlalu besar untuk ditampung di memori. Hal ini sangat berguna untuk dataset miliaran titik.</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">File yang dipetakan dengan memori (mmap)</h4><p>Pemetaan memori (Mmap) memungkinkan akses memori langsung ke file besar pada disk, memungkinkan Milvus untuk menyimpan indeks dan data dalam memori dan hard drive. Pendekatan ini membantu mengoptimalkan operasi I/O dengan mengurangi overhead panggilan I/O berdasarkan frekuensi akses, sehingga memperluas kapasitas penyimpanan untuk koleksi tanpa memengaruhi kinerja pencarian secara signifikan.</p>
<p>Secara khusus, Anda dapat mengonfigurasi Milvus untuk memetakan memori data mentah dalam bidang tertentu alih-alih memuatnya secara penuh ke dalam memori. Dengan cara ini, Anda dapat memperoleh akses memori langsung ke bidang-bidang tersebut tanpa mengkhawatirkan masalah memori dan memperluas kapasitas koleksi.</p>
