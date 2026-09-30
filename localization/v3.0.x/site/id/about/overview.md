---
id: overview.md
title: Apa itu Milvus?
related_key: Milvus Overview
summary: >-
  Milvus adalah basis data vektor berkinerja tinggi dan sangat skalabel yang
  dapat berjalan secara efisien di berbagai lingkungan, mulai dari laptop hingga
  sistem terdistribusi berskala besar. Milvus tersedia baik sebagai perangkat
  lunak sumber terbuka maupun layanan cloud.
---
<h1 id="What-is-Milvus" class="common-anchor-header">Apa itu Milvus?<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><span>Milvus <span style="display: inline-block; vertical-align: middle;">
<audio id="milvus-audio" style="display: none;">
<source src="https://en-audio.howtopronounce.com/15783806805e142d8844912.mp3" type="audio/mp3" />
</audio>
<span style="
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('https://milvus.io/docs/v2.6.x/assets/hearing.png') no-repeat center center;
    background-size: contain;
    cursor: pointer;
    margin-left: 4px;
  " onclick="document.getElementById('milvus-audio').play()"></span>
</span></span> adalah burung pemangsa dari genus Milvus dalam keluarga elang Accipitridae, yang terkenal karena kecepatan terbangnya, penglihatan yang tajam, dan kemampuan beradaptasi yang luar biasa.</p>
<style>
  audio::-webkit-media-controls {
    display: none !important;
  }
</style>
<p>Zilliz mengadopsi nama Milvus untuk basis data vektor open-source berkinerja tinggi dan sangat skalabel yang berjalan secara efisien di berbagai lingkungan, mulai dari laptop hingga sistem terdistribusi berskala besar. Basis data ini tersedia baik sebagai perangkat lunak open-source maupun layanan cloud.</p>
<p>Dikembangkan oleh Zilliz dan akan segera disumbangkan ke LF AI &amp; Data Foundation di bawah naungan Linux Foundation, Milvus telah menjadi salah satu proyek basis data vektor sumber terbuka terkemuka di dunia. Proyek ini didistribusikan di bawah lisensi Apache 2.0, dan sebagian besar kontributornya adalah para ahli dari komunitas komputasi berkinerja tinggi (HPC), yang berspesialisasi dalam membangun sistem berskala besar dan mengoptimalkan kode yang sadar perangkat keras. Kontributor inti termasuk para profesional dari Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba, dan Microsoft.</p>
<p>Menariknya, setiap proyek sumber terbuka Zilliz dinamai berdasarkan nama burung, yang merupakan konvensi penamaan yang melambangkan kebebasan, pandangan ke depan, dan evolusi teknologi yang gesit.</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">Data Tidak Terstruktur, Embedding, dan Milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Data tidak terstruktur, seperti teks, gambar, dan audio, memiliki format yang bervariasi dan mengandung semantik mendasar yang kaya, sehingga sulit untuk dianalisis. Untuk mengelola kompleksitas ini, embeddings digunakan untuk mengubah data tidak terstruktur menjadi vektor numerik yang menangkap karakteristik esensialnya. Vektor-vektor ini kemudian disimpan dalam basis data vektor, memungkinkan pencarian dan analisis yang cepat serta skalabel.</p>
<p>Milvus menawarkan kemampuan pemodelan data yang tangguh, memungkinkan Anda mengorganisir data tidak terstruktur atau multimodal Anda ke dalam koleksi terstruktur. Milvus mendukung berbagai jenis data untuk pemodelan atribut yang berbeda, termasuk tipe numerik dan karakter umum, berbagai tipe vektor, array, himpunan, dan JSON, sehingga Anda tidak perlu repot mengelola beberapa sistem basis data.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" /> 
   <span>Data tidak terstruktur, embedding, dan Milvus</span>
  
 </span></p>
<p>Milvus menawarkan tiga mode penerapan, yang mencakup berbagai skala data—mulai dari pembuatan prototipe lokal di Jupyter Notebook hingga klaster Kubernetes besar yang mengelola puluhan miliar vektor:</p>
<ul>
<li>Milvus Lite adalah pustaka Python yang dapat dengan mudah diintegrasikan ke dalam aplikasi Anda. Sebagai versi ringan dari Milvus, pustaka ini sangat ideal untuk pembuatan prototipe cepat di Jupyter Notebooks atau dijalankan pada perangkat edge dengan sumber daya terbatas. <a href="/docs/id/milvus_lite.md">Pelajari lebih lanjut</a>.</li>
<li>Milvus Standalone adalah penyebaran server pada satu mesin, dengan semua komponen dikemas dalam satu gambar Docker untuk kemudahan penyebaran. <a href="/docs/id/install_standalone-docker.md">Pelajari lebih lanjut</a>.</li>
<li>Milvus Distributed dapat diimplementasikan pada kluster Kubernetes, dengan arsitektur cloud-native yang dirancang untuk skenario berskala miliaran atau bahkan lebih besar. Arsitektur ini memastikan redundansi pada komponen-komponen kritis. <a href="/docs/id/install_cluster-milvusoperator.md">Pelajari lebih lanjut</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">Apa yang Membuat Milvus Begitu Cepat?<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus dirancang sejak awal untuk menjadi sistem basis data vektor yang sangat efisien. Dalam kebanyakan kasus, Milvus mengungguli basis data vektor lainnya hingga 2-5 kali lipat (lihat hasil VectorDBBench). Kinerja tinggi ini merupakan hasil dari beberapa keputusan desain utama:</p>
<p><strong>Optimisasi yang Menyesuaikan dengan Perangkat Keras</strong>: Untuk mengakomodasi Milvus di berbagai lingkungan perangkat keras, kami telah mengoptimalkan kinerjanya secara khusus untuk banyak arsitektur dan platform perangkat keras, termasuk AVX512, SIMD, GPU, dan SSD NVMe.</p>
<p><strong>Algoritma Pencarian Canggih</strong>: Milvus mendukung beragam algoritma pengindeksan/pencarian dalam memori dan pada disk, termasuk IVF, HNSW, DiskANN, dan lainnya, yang semuanya telah dioptimalkan secara mendalam. Dibandingkan dengan implementasi populer seperti FAISS dan HNSWLib, Milvus memberikan kinerja yang 30%-70% lebih baik.</p>
<p><strong>Mesin Pencari dalam C++</strong>: Lebih dari 80% kinerja basis data vektor ditentukan oleh mesin pencari. Milvus menggunakan C++ untuk komponen kritis ini karena kinerja tinggi bahasa tersebut, optimasi tingkat rendah, dan pengelolaan sumber daya yang efisien. Yang terpenting, Milvus mengintegrasikan berbagai optimasi kode yang sadar perangkat keras, mulai dari vektorisasi tingkat perakitan hingga paralelisasi dan penjadwalan multi-thread, untuk memanfaatkan kemampuan perangkat keras secara maksimal.</p>
<p><strong>Berorientasi Kolom</strong>: Milvus adalah sistem basis data vektor berorientasi kolom. Keunggulan utamanya berasal dari pola akses data. Saat melakukan kueri, basis data berorientasi kolom hanya membaca bidang tertentu yang terlibat dalam kueri, bukan seluruh baris, yang secara signifikan mengurangi jumlah data yang diakses. Selain itu, operasi pada data berbasis kolom dapat dengan mudah divektorisasi, sehingga operasi dapat diterapkan pada seluruh kolom sekaligus, yang semakin meningkatkan kinerja.</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">Apa yang Membuat Milvus Begitu Skalabel<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada tahun 2022, Milvus mendukung vektor berskala miliaran, dan pada tahun 2023, skalanya meningkat hingga puluhan miliar dengan stabilitas yang konsisten, mendukung skenario berskala besar untuk lebih dari 300 perusahaan besar, termasuk Salesforce, PayPal, Shopee, Airbnb, eBay, NVIDIA, IBM, AT&amp;T, LINE, ROBLOX, Inflection, dan lain-lain.</p>
<p>Arsitektur sistem Milvus yang cloud-native dan sangat terpisah memastikan bahwa sistem dapat terus berkembang seiring pertumbuhan data:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" /> 
   <span>Arsitektur sistem Milvus yang sangat terpisah</span>
  
 </span></p>
<p>Milvus sendiri sepenuhnya stateless sehingga dapat dengan mudah diskalakan dengan bantuan Kubernetes atau cloud publik. Selain itu, komponen-komponen Milvus terpisah dengan baik, dengan tiga tugas paling kritis—pencarian, penyisipan data, dan pengindeksan/pemadatan—dirancang sebagai proses yang mudah diparalelkan, dengan logika kompleks yang dipisahkan. Hal ini memastikan bahwa node kueri, node data, dan node indeks yang sesuai dapat diskalakan baik ke atas maupun ke luar secara independen, sehingga mengoptimalkan kinerja dan efisiensi biaya.</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">Jenis Pencarian yang Didukung oleh Milvus<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mendukung berbagai jenis fungsi pencarian untuk memenuhi kebutuhan berbagai kasus penggunaan:</p>
<ul>
<li><a href="/docs/id/single-vector-search.md#Basic-search">Pencarian ANN</a>: Menemukan K vektor teratas yang paling dekat dengan vektor kueri Anda.</li>
<li><a href="/docs/id/single-vector-search.md#Filtered-search">Pencarian Penyaringan</a>: Melakukan pencarian ANN di bawah kondisi penyaringan yang ditentukan.</li>
<li><a href="/docs/id/single-vector-search.md#Range-search">Pencarian Rentang</a>: Menemukan vektor dalam radius tertentu dari vektor kueri Anda.</li>
<li><a href="/docs/id/multi-vector-search.md">Pencarian Hibrida</a>: Melakukan pencarian ANN berdasarkan beberapa bidang vektor.</li>
<li><a href="/docs/id/full-text-search.md">Pencarian Teks Lengkap</a>: Pencarian teks lengkap berdasarkan BM25.</li>
<li><a href="/docs/id/weighted-ranker.md">Penataan Ulang Peringkat</a>: Menyesuaikan urutan hasil pencarian berdasarkan kriteria tambahan atau algoritma sekunder, menyempurnakan hasil pencarian ANN awal.</li>
<li><a href="/docs/id/get-and-scalar-query.md#Get-Entities-by-ID">Pengambilan</a>: Mengambil data berdasarkan kunci utamanya.</li>
<li><a href="/docs/id/get-and-scalar-query.md#Use-Basic-Operators">Kueri</a>: Mengambil data menggunakan ekspresi tertentu.</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">Kumpulan Fitur yang Lengkap<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>Selain fitur pencarian utama yang disebutkan di atas, Milvus juga menyediakan serangkaian fitur yang diimplementasikan di sekitar pencarian ANN sehingga Anda dapat memanfaatkan kemampuannya secara maksimal.</p>
<h3 id="API-and-SDK" class="common-anchor-header">API dan SDK<button data-href="#API-and-SDK" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.6.x/About.md">API RESTful</a> (resmi)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.6.x/About.md">PyMilvus</a> (SDK Python) (resmi)</li>
<li><a href="https://milvus.io/api-reference/go/v2.6.x/About.md">SDK Go</a> (resmi)</li>
<li><a href="https://milvus.io/api-reference/java/v2.6.x/About.md">SDK Java</a> (resmi)</li>
<li><a href="https://milvus.io/api-reference/node/v2.6.x/About.md">Node.js</a> (JavaScript) SDK (resmi)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (disumbangkan oleh Microsoft)</li>
<li><a href="https://milvus.io/api-reference/cpp/v2.6.x/About.md">SDK C++</a> (resmi)</li>
<li>Rust SDK (sedang dikembangkan)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">Tipe Data Lanjutan<button data-href="#Advanced-Data-Types" class="anchor-icon" translate="no">
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
    </button></h3><p>Selain tipe data primitif, Milvus mendukung berbagai tipe data lanjutan beserta metrik jarak yang berlaku untuk masing-masing tipe tersebut.</p>
<ul>
<li><a href="/docs/id/sparse_vector.md">Vektor Sparse</a></li>
<li><a href="/docs/id/index-vector-fields.md">Vektor Biner</a></li>
<li><a href="/docs/id/use-json-fields.md">Dukungan JSON</a></li>
<li><a href="/docs/id/array_data_type.md">Dukungan Array</a></li>
<li><a href="/docs/id/geometry-field.md">Geolokasi</a></li>
<li>Teks (sedang dikembangkan)</li>
</ul>
<h3 id="Why-Milvus" class="common-anchor-header">Mengapa Milvus?<button data-href="#Why-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>Kinerja Tinggi pada Skala Besar dan Ketersediaan Tinggi</strong></p>
<p>Milvus memiliki <a href="/docs/id/architecture_overview.md">arsitektur terdistribusi</a> yang memisahkan <a href="/docs/id/data_processing.md#Data-query">komputasi</a> dan <a href="/docs/id/data_processing.md#Data-insertion">penyimpanan</a>. Milvus dapat melakukan penskalaan horizontal dan beradaptasi dengan pola lalu lintas yang beragam, sehingga mencapai kinerja optimal dengan menambah node kueri secara independen untuk beban kerja yang banyak membaca dan node data untuk beban kerja yang banyak menulis. Layanan mikro tanpa status (stateless) di K8s memungkinkan <a href="/docs/id/coordinator_ha.md#Coordinator-HA">pemulihan cepat</a> dari kegagalan, memastikan ketersediaan tinggi. Dukungan untuk <a href="/docs/id/replica.md">replika</a> semakin meningkatkan toleransi terhadap kegagalan dan throughput dengan memuat segmen data pada beberapa node kueri. Lihat <a href="https://zilliz.com/vector-database-benchmark-tool">tolok ukur</a> untuk perbandingan kinerja.</p></li>
<li><p><strong>Dukungan untuk Berbagai Jenis Indeks Vektor dan Akselerasi Perangkat Keras</strong></p>
<p>Milvus memisahkan sistem dan mesin pencarian vektor inti, sehingga memungkinkan dukungan terhadap semua jenis indeks vektor utama yang dioptimalkan untuk skenario berbeda, termasuk HNSW, IVF, FLAT (brute-force), SCANN, dan DiskANN, beserta varian <a href="/docs/id/index-explained.md">berbasis kuantisasi</a> dan <a href="/docs/id/mmap.md">mmap</a>. Milvus mengoptimalkan pencarian vektor untuk fitur-fitur canggih seperti <a href="/docs/id/boolean.md">penyaringan metadata</a> dan <a href="/docs/id/range-search.md">pencarian rentang</a>. Selain itu, Milvus menerapkan akselerasi perangkat keras untuk meningkatkan kinerja pencarian vektor dan mendukung pengindeksan GPU, seperti <a href="/docs/id/gpu-cagra.md">CAGRA</a> dari NVIDIA.</p></li>
<li><p><strong>Multi-tenancy yang Fleksibel dan Penyimpanan Hot/Cold</strong></p>
<p>Milvus mendukung <a href="/docs/id/multi_tenancy.md#Multi-tenancy-strategies">multi-tenancy</a> melalui isolasi pada tingkat database, koleksi, partisi, atau kunci partisi. Strategi yang fleksibel ini memungkinkan satu kluster menangani ratusan hingga jutaan penyewa, sekaligus memastikan kinerja pencarian yang dioptimalkan dan kontrol akses yang fleksibel. Milvus meningkatkan efisiensi biaya dengan penyimpanan panas/dingin. Data panas yang sering diakses dapat disimpan dalam memori atau pada SSD untuk kinerja yang lebih baik, sedangkan data dingin yang jarang diakses disimpan pada penyimpanan yang lebih lambat dan hemat biaya. Mekanisme ini dapat secara signifikan mengurangi biaya sekaligus mempertahankan kinerja tinggi untuk tugas-tugas penting.</p></li>
<li><p><strong>Vektor Sparse untuk Pencarian Teks Lengkap dan Pencarian Hibrida</strong></p>
<p>Selain pencarian semantik melalui vektor padat, Milvus juga secara native mendukung <a href="/docs/id/full-text-search.md">pencarian teks lengkap</a> dengan BM25 serta embedding spars yang dipelajari seperti SPLADE dan BGE-M3. Pengguna dapat menyimpan vektor spars dan vektor padat dalam koleksi yang sama, serta mendefinisikan fungsi untuk menyusun ulang peringkat hasil dari beberapa permintaan pencarian. Lihat contoh <a href="/docs/id/full_text_search_with_milvus.md">Pencarian Hibrida dengan pencarian semantik + pencarian teks lengkap</a>.</p></li>
<li><p><strong>Keamanan Data dan Kontrol Akses Berbasis Peran</strong></p>
<p>Milvus memastikan keamanan data dengan menerapkan <a href="/docs/id/authenticate.md">otentikasi pengguna wajib</a>, <a href="/docs/id/tls.md">enkripsi TLS</a>, dan <a href="/docs/id/rbac.md">Kontrol Akses Berbasis Peran (RBAC)</a>. Otentikasi pengguna memastikan bahwa hanya pengguna yang berwenang dengan kredensial yang valid yang dapat mengakses basis data, sementara enkripsi TLS mengamankan semua komunikasi di dalam jaringan. Selain itu, RBAC memungkinkan kontrol akses terperinci dengan menetapkan izin khusus kepada pengguna berdasarkan peran mereka. Fitur-fitur ini menjadikan Milvus pilihan yang andal dan aman untuk aplikasi perusahaan, melindungi data sensitif dari akses tidak sah dan potensi pelanggaran.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">Integrasi AI<button data-href="#AI-Integrations" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Integrasi Model Embedding
Model Embedding mengubah data tidak terstruktur menjadi representasi numeriknya dalam ruang data berdimensi tinggi sehingga Anda dapat menyimpannya di Milvus. Saat ini, PyMilvus, SDK Python, mengintegrasikan beberapa model embedding sehingga Anda dapat dengan cepat mempersiapkan data Anda menjadi vektor embedding. Untuk detailnya, lihat <a href="/docs/id/embeddings.md">Ikhtisar Embedding</a>.</p></li>
<li><p>Integrasi Model Reranking
Dalam bidang pencarian informasi dan AI generatif, reranker merupakan alat penting yang mengoptimalkan urutan hasil dari pencarian awal. PyMilvus juga mengintegrasikan beberapa model reranking untuk mengoptimalkan urutan hasil yang dikembalikan dari pencarian awal. Untuk detailnya, lihat <a href="/docs/id/rerankers-overview.md">Ikhtisar Reranker</a>.</p></li>
<li><p>Integrasi LangChain dan Alat AI Lainnya
Di era GenAI, alat-alat seperti LangChain menarik banyak perhatian dari pengembang aplikasi. Sebagai komponen inti, Milvus biasanya berfungsi sebagai penyimpanan vektor dalam alat-alat tersebut. Untuk mempelajari cara mengintegrasikan Milvus ke dalam alat AI favorit Anda, lihat <a href="/docs/id/integrate_with_openai.md">Integrasi</a> dan <a href="/docs/id/build-rag-with-milvus.md">Tutorial</a> kami.</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">Alat dan Ekosistem<button data-href="#Tools-and-Ecosystem" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Attu
Attu adalah antarmuka pengguna grafis (GUI) intuitif all-in-one yang membantu Anda mengelola Milvus dan data yang disimpannya. Untuk detailnya, lihat repositori <a href="https://github.com/zilliztech/attu">Attu</a>.</p></li>
<li><p>Birdwatcher
Birdwatcher adalah alat debugging untuk Milvus. Dengan menggunakannya untuk terhubung ke etcd, Anda dapat memeriksa status sistem Milvus Anda atau mengonfigurasinya secara langsung. Untuk detailnya, lihat <a href="/docs/id/birdwatcher_overview.md">BirdWatcher</a>.</p></li>
<li><p>Integrasi Prometheus &amp; Grafana
Prometheus adalah rangkaian alat pemantauan sistem dan peringatan sumber terbuka untuk Kubernetes. Grafana adalah tumpukan visualisasi sumber terbuka yang dapat terhubung dengan semua sumber data. Anda dapat menggunakan Prometheus &amp; Grafana sebagai penyedia layanan pemantauan untuk memantau kinerja Milvus terdistribusi secara visual. Untuk detailnya, lihat <a href="/docs/id/monitor.md">Deploying Monitoring Services</a>.</p></li>
<li><p>Milvus Backup
Milvus Backup adalah alat yang memungkinkan pengguna mencadangkan dan memulihkan data Milvus. Alat ini menyediakan antarmuka baris perintah (CLI) dan antarmuka pemrograman aplikasi (API) agar dapat disesuaikan dengan berbagai skenario aplikasi. Untuk detailnya, lihat <a href="/docs/id/milvus_backup_overview.md">Milvus Backup</a>.</p></li>
<li><p>Milvus Capture Data Change (CDC)
Milvus CDC dapat mereplikasi perubahan data dari satu kluster Milvus ke kluster lainnya untuk pemulihan bencana (disaster recovery) tipe primer-standby. Untuk detail selengkapnya, lihat <a href="/docs/id/milvus_cdc_overview.md">Milvus CDC</a>.</p></li>
<li><p>Konektor Milvus
Milvus telah merencanakan serangkaian konektor agar Anda dapat mengintegrasikan Milvus secara mulus dengan alat pihak ketiga, seperti Apache Spark. Saat ini, Anda dapat menggunakan Konektor Spark kami untuk mengalirkan data Milvus ke Apache Spark guna pemrosesan pembelajaran mesin. Untuk detailnya, lihat <a href="/docs/id/integrate_with_spark.md">Konektor Spark-Milvus</a>.</p></li>
<li><p>Layanan Transmisi Vektor (VTS)
Milvus menyediakan serangkaian alat agar Anda dapat mentransfer data antara sebuah instance Milvus dan berbagai sumber data, termasuk kluster Zilliz, Elasticsearch, Postgres (PgVector), dan instance Milvus lainnya. Untuk detail selengkapnya, lihat <a href="https://github.com/zilliztech/vts">VTS</a>.</p></li>
</ul>
