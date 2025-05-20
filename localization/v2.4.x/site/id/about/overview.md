---
id: overview.md
title: Apa itu Milvus
related_key: Milvus Overview
summary: >-
  Milvus adalah basis data vektor berkinerja tinggi dan sangat skalabel yang
  berjalan secara efisien di berbagai lingkungan, mulai dari laptop hingga
  sistem terdistribusi berskala besar. Milvus tersedia sebagai perangkat lunak
  sumber terbuka dan layanan cloud.
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
    </button></h1><p>Milvus adalah basis data vektor berkinerja tinggi dan sangat skalabel yang berjalan secara efisien di berbagai lingkungan, mulai dari laptop hingga sistem terdistribusi berskala besar. Milvus tersedia sebagai perangkat lunak sumber terbuka dan layanan cloud.</p>
<p>Milvus adalah proyek sumber terbuka di bawah LF AI &amp; Data Foundation yang didistribusikan di bawah lisensi Apache 2.0. Sebagian besar kontributor adalah para ahli dari komunitas komputasi berkinerja tinggi (HPC), yang berspesialisasi dalam membangun sistem berskala besar dan mengoptimalkan kode yang sadar akan perangkat keras. Kontributor inti termasuk para profesional dari Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba, dan Microsoft.</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">Data Tidak Terstruktur, Penyematan, dan Milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Data tidak terstruktur, seperti teks, gambar, dan audio, memiliki format yang beragam dan memiliki semantik yang kaya, sehingga sulit untuk dianalisis. Untuk mengelola kerumitan ini, embeddings digunakan untuk mengubah data yang tidak terstruktur menjadi vektor numerik yang menangkap karakteristik esensialnya. Vektor-vektor ini kemudian disimpan dalam basis data vektor, sehingga memungkinkan pencarian dan analisis yang cepat dan terukur.</p>
<p>Milvus menawarkan kemampuan pemodelan data yang kuat, memungkinkan Anda untuk mengatur data yang tidak terstruktur atau multi-modal ke dalam koleksi yang terstruktur. Milvus mendukung berbagai tipe data untuk pemodelan atribut yang berbeda, termasuk tipe numerik dan karakter yang umum, berbagai tipe vektor, larik, set, dan JSON, sehingga Anda tidak perlu repot mengelola banyak sistem basis data.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" />
   </span> <span class="img-wrapper"> <span>Data tidak terstruktur, penyematan, dan Milvus</span> </span></p>
<p>Milvus menawarkan tiga mode penerapan, yang mencakup berbagai skala data-dari pembuatan prototipe lokal di Jupyter Notebooks hingga cluster Kubernetes besar yang mengelola puluhan miliar vektor:</p>
<ul>
<li>Milvus Lite adalah pustaka Python yang dapat dengan mudah diintegrasikan ke dalam aplikasi Anda. Sebagai versi ringan dari Milvus, Milvus Lite sangat ideal untuk membuat prototipe cepat di Jupyter Notebooks atau berjalan di perangkat dengan sumber daya terbatas. <a href="/docs/id/v2.4.x/milvus_lite.md">Pelajari lebih lanjut</a>.</li>
<li>Milvus Standalone adalah penerapan server mesin tunggal, dengan semua komponen yang dibundel ke dalam satu image Docker untuk penerapan yang mudah. <a href="/docs/id/v2.4.x/install_standalone-docker.md">Pelajari lebih lanjut</a>.</li>
<li>Milvus Distributed dapat digunakan pada cluster Kubernetes, menampilkan arsitektur cloud-native yang dirancang untuk skenario berskala miliaran atau bahkan lebih besar. Arsitektur ini memastikan redundansi pada komponen-komponen penting. <a href="/docs/id/v2.4.x/install_cluster-milvusoperator.md">Pelajari lebih lanjut</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">Apa yang Membuat Milvus Begitu Cepat？<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus dirancang sejak hari pertama untuk menjadi sistem basis data vektor yang sangat efisien. Dalam banyak kasus, Milvus mengungguli database vektor lain sebanyak 2-5x (lihat hasil VectorDBBench). Performa tinggi ini adalah hasil dari beberapa keputusan desain utama:</p>
<p><strong>Pengoptimalan yang sadar akan perangkat keras</strong>: Untuk mengakomodasi Milvus di berbagai lingkungan perangkat keras, kami telah mengoptimalkan kinerjanya secara khusus untuk berbagai arsitektur dan platform perangkat keras, termasuk AVX512, SIMD, GPU, dan SSD NVMe.</p>
<p><strong>Algoritma Pencarian Tingkat Lanjut</strong>: Milvus mendukung berbagai macam algoritme pengindeksan/pencarian dalam memori dan pada disk, termasuk IVF, HNSW, DiskANN, dan banyak lagi, yang semuanya telah dioptimalkan secara mendalam. Dibandingkan dengan implementasi populer seperti FAISS dan HNSWLib, Milvus memberikan kinerja 30%-70% lebih baik.</p>
<p><strong>Mesin Pencari dalam bahasa C++</strong>: Lebih dari 80% kinerja basis data vektor ditentukan oleh mesin pencarinya. Milvus menggunakan C++ untuk komponen penting ini karena performa bahasa yang tinggi, optimasi tingkat rendah, dan manajemen sumber daya yang efisien. Yang paling penting, Milvus mengintegrasikan berbagai pengoptimalan kode yang sadar akan perangkat keras, mulai dari vektorisasi tingkat perakitan hingga paralelisasi dan penjadwalan multi-thread, untuk memanfaatkan kemampuan perangkat keras secara maksimal.</p>
<p><strong>Berorientasi pada Kolom</strong>: Milvus adalah sistem basis data vektor yang berorientasi pada kolom. Keuntungan utama berasal dari pola akses data. Ketika melakukan kueri, database berorientasi kolom hanya membaca kolom tertentu yang terlibat dalam kueri, bukan seluruh baris, yang sangat mengurangi jumlah data yang diakses. Selain itu, operasi pada data berbasis kolom dapat dengan mudah dibuat vektornya, sehingga memungkinkan operasi diterapkan di seluruh kolom sekaligus, yang selanjutnya meningkatkan kinerja.</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">Apa yang Membuat Milvus begitu Skalabel<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada tahun 2022, Milvus mendukung vektor berskala miliaran, dan pada tahun 2023, Milvus meningkatkan skalanya hingga puluhan miliar dengan stabilitas yang konsisten, memberdayakan skenario berskala besar untuk lebih dari 300 perusahaan besar, termasuk Salesforce, PayPal, Shopee, Airbnb, eBay, NVIDIA, IBM, AT&amp;T, LINE, ROBLOX, Inflection, dan lain-lain.</p>
<p>Arsitektur sistem Milvus yang cloud-native dan sangat terpisah memastikan bahwa sistem dapat terus berkembang seiring dengan pertumbuhan data:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/highly-decoupled-architecture.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" />
   </span> <span class="img-wrapper"> <span>Arsitektur sistem yang sangat terpisah dari Milvus</span> </span></p>
<p>Milvus sendiri sepenuhnya tidak memiliki status sehingga dapat dengan mudah diskalakan dengan bantuan Kubernetes atau cloud publik. Selain itu, komponen-komponen Milvus dipisahkan dengan baik, dengan tiga tugas yang paling penting-pencarian, penyisipan data, dan pengindeksan/pemadatan-dirancang sebagai proses yang mudah diparalelkan, dengan logika yang rumit yang dipisahkan. Hal ini memastikan bahwa simpul kueri, simpul data, dan simpul indeks yang sesuai dapat menskalakan naik dan turun secara independen, mengoptimalkan kinerja dan efisiensi biaya.</p>
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
    </button></h2><p>Milvus mendukung berbagai jenis fungsi pencarian untuk memenuhi tuntutan kasus penggunaan yang berbeda:</p>
<ul>
<li><a href="/docs/id/v2.4.x/single-vector-search.md#Basic-search">Pencarian ANN</a>: Menemukan K vektor teratas yang paling dekat dengan vektor kueri Anda.</li>
<li><a href="/docs/id/v2.4.x/single-vector-search.md#Filtered-search">Pencarian Pemfilteran</a>: Melakukan pencarian ANN di bawah kondisi pemfilteran yang ditentukan.</li>
<li><a href="/docs/id/v2.4.x/single-vector-search.md#Range-search">Pencarian Rentang</a>: Menemukan vektor dalam radius tertentu dari vektor kueri Anda.</li>
<li><a href="/docs/id/v2.4.x/multi-vector-search.md">Pencarian Hibrida</a>: Melakukan pencarian ANN berdasarkan beberapa bidang vektor.</li>
<li>Pencarian Kata Kunci: Pencarian kata kunci berdasarkan BM25.</li>
<li><a href="/docs/id/v2.4.x/reranking.md">Pemeringkatan ulang</a>: Menyesuaikan urutan hasil pencarian berdasarkan kriteria tambahan atau algoritme sekunder, menyempurnakan hasil pencarian ANN awal.</li>
<li><a href="/docs/id/v2.4.x/get-and-scalar-query.md#Get-Entities-by-ID">Ambil</a>: Mengambil data berdasarkan kunci utamanya.</li>
<li><a href="/docs/id/v2.4.x/get-and-scalar-query.md#Use-Basic-Operators">Query</a>: Mengambil data menggunakan ekspresi tertentu.</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">Kumpulan Fitur Komprehensif<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>Selain fitur-fitur pencarian utama yang disebutkan di atas, Milvus juga menyediakan serangkaian fitur yang diimplementasikan di sekitar pencarian ANN sehingga Anda dapat sepenuhnya memanfaatkan kemampuannya.</p>
<h3 id="API-and-SDK" class="common-anchor-header">API dan SDK</h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.4.x/About.md">API RESTful</a> (resmi)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">PyMilvus</a> (Python SDK) (resmi)</li>
<li><a href="https://milvus.io/api-reference/go/v2.4.x/About.md">Go SDK</a> (resmi)</li>
<li><a href="https://milvus.io/api-reference/java/v2.4.x/About.md">Java SDK</a> (resmi)</li>
<li><a href="https://milvus.io/api-reference/node/v2.4.x/About.md">Node.js</a> (JavaScript) SDK (resmi)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (dikontribusikan oleh Microsoft)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">Tipe Data Tingkat Lanjut</h3><p>Selain tipe data primitif, Milvus mendukung berbagai tipe data tingkat lanjut dan metrik jarak yang dapat diterapkan.</p>
<ul>
<li><a href="/docs/id/v2.4.x/sparse_vector.md">Vektor Jarang</a></li>
<li><a href="/docs/id/v2.4.x/index-vector-fields.md">Vektor Biner</a></li>
<li><a href="/docs/id/v2.4.x/use-json-fields.md">Dukungan JSON</a></li>
<li><a href="/docs/id/v2.4.x/array_data_type.md">Dukungan Larik</a></li>
<li><a href="/docs/id/v2.4.x/metric.md">Metrik Jarak</a></li>
</ul>
<h3 id="Acceleration" class="common-anchor-header">Akselerasi</h3><ul>
<li><p>Algoritme Pencarian Milvus mendukung serangkaian pengindeksan yang dapat disesuaikan dan algoritme pencarian. Untuk detailnya, lihat <a href="/docs/id/v2.4.x/index.md">Indeks Dalam Memori</a>, <a href="/docs/id/v2.4.x/disk_index.md">Indeks Pada Disk</a>, dan <a href="/docs/id/v2.4.x/gpu_index.md">Indeks GPU</a>.</p></li>
<li><p>Partisi dan Kunci Partisi Partisi adalah sub-divisi dari koleksi Milvus. Anda dapat memilih bidang skalar sebagai kunci partisi untuk performa pencarian yang lebih baik. Untuk detailnya, lihat <a href="/docs/id/v2.4.x/manage-partitions.md">Mengelola Partisi</a> dan <a href="/docs/id/v2.4.x/use-partition-key.md">Menggunakan Kunci Partisi</a>.</p></li>
<li><p>Model Konsistensi yang Dapat Disetel Konsistensi memastikan setiap simpul atau replika Milvus memiliki tampilan data yang sama ketika menulis atau membaca data pada waktu tertentu. Anda dapat dengan mudah menyetel tingkat konsistensi ketika melakukan pencarian ANN di Milvus. Untuk detailnya, lihat <a href="/docs/id/v2.4.x/consistency.md">Konsistensi</a>.</p></li>
<li><p>Impor Data Throughput Tinggi Untuk mengimpor data dalam jumlah besar ke dalam Milvus daripada memasukkannya satu per satu, pertimbangkan untuk menggunakan alat impor data throughput tinggi. Untuk detailnya, lihat <a href="/docs/id/v2.4.x/prepare-source-data.md">Menyiapkan Data Sumber</a> dan <a href="/docs/id/v2.4.x/import-data.md">Mengimpor Data</a>.</p></li>
<li><p>Dukungan Multi-tenancy Milvus telah mengimplementasikan banyak fitur yang berorientasi pada skenario multi-tenancy, termasuk Partition Key, Clustering Key, dan banyak lagi. Untuk detailnya, lihat <a href="/docs/id/v2.4.x/multi_tenancy.md">Strategi Multi-tenancy</a>.</p></li>
</ul>
<h3 id="Security-and-Authorization" class="common-anchor-header">Keamanan dan Otorisasi</h3><ul>
<li><p>Model Konsistensi yang Dapat Disetel Konsistensi memastikan setiap node atau replika Milvus memiliki tampilan data yang sama saat menulis atau membaca data pada waktu tertentu. Anda dapat dengan mudah menyetel tingkat konsistensi saat melakukan pencarian ANN di Milvus. Untuk detailnya, lihat <a href="/docs/id/v2.4.x/consistency.md">Konsistensi</a>.</p></li>
<li><p>Isolasi Data dan Kontrol Sumber Daya Untuk skenario multi-tenancy, isolasi data adalah persyaratan keamanan dasar. Milvus mengimplementasikan beberapa fitur untuk menyelesaikan masalah keamanan Anda. Untuk detailnya, lihat <a href="/docs/id/v2.4.x/resource_group.md">Mengelola Grup Sumber Daya</a> dan <a href="/docs/id/v2.4.x/clustering-compaction.md">Pemadatan Clustering</a>.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">Integrasi AI</h3><ul>
<li><p>Integrasi Model Penyematan Model Penyematan mengubah data yang tidak terstruktur menjadi representasi numerik dalam ruang data berdimensi tinggi sehingga Anda dapat menyimpannya di Milvus. Saat ini, PyMilvus, Python SDK, mengintegrasikan beberapa model embedding sehingga Anda dapat dengan cepat menyiapkan data Anda ke dalam embedding vektor. Untuk detailnya, lihat <a href="/docs/id/v2.4.x/embeddings.md">Ikhtisar Penyematan</a>.</p></li>
<li><p>Integrasi Model Perangkingan Dalam ranah pencarian informasi dan AI generatif, perangking ulang adalah alat penting yang mengoptimalkan urutan hasil dari pencarian awal. PyMilvus juga mengintegrasikan beberapa model perangkingan ulang untuk mengoptimalkan urutan hasil yang dikembalikan dari pencarian awal. Untuk detailnya, lihat <a href="/docs/id/v2.4.x/rerankers-overview.md">Ikhtisar Perangking</a>.</p></li>
<li><p>LangChain dan Integrasi Alat AI lainnya Di era GenAI, alat, seperti LangChain, mendapatkan banyak perhatian dari para pengembang aplikasi. Sebagai komponen inti, Milvus biasanya berfungsi sebagai penyimpan vektor dalam alat tersebut. Untuk mempelajari cara mengintegrasikan Milvus ke dalam alat AI favorit Anda, lihat <a href="/docs/id/v2.4.x/integrate_with_openai.md">Integrasi</a> dan <a href="/docs/id/v2.4.x/build-rag-with-milvus.md">Tutorial</a> kami.</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">Alat dan Ekosistem</h3><ul>
<li><p>Attu Attu adalah GUI intuitif lengkap yang membantu Anda mengelola Milvus dan data yang disimpannya. Untuk detailnya, lihat repositori <a href="https://github.com/zilliztech/attu">Attu</a>.</p></li>
<li><p>Birdwatcher Birdwatcher adalah alat debugging untuk Milvus. Dengan menggunakannya untuk terhubung ke etcd, Anda dapat memeriksa status sistem Milvus Anda atau mengkonfigurasinya dengan cepat. Untuk detailnya, lihat <a href="/docs/id/v2.4.x/birdwatcher_overview.md">BirdWatcher</a>.</p></li>
<li><p>Integrasi Promethus &amp; Grafana Prometheus adalah perangkat pemantauan dan peringatan sistem sumber terbuka untuk Kubernetes. Grafana adalah tumpukan visualisasi sumber terbuka yang dapat terhubung dengan semua sumber data. Anda dapat menggunakan Promethus &amp; Grafana sebagai penyedia layanan pemantauan untuk memantau kinerja Milvus yang didistribusikan secara visual. Untuk detailnya, lihat Menerapkan <a href="/docs/id/v2.4.x/monitor.md">Layanan Pemantauan</a>.</p></li>
<li><p>Cadangan Milvus Cadangan Milvus adalah alat yang memungkinkan pengguna untuk mencadangkan dan memulihkan data Milvus. Alat ini menyediakan CLI dan API untuk menyesuaikan diri dengan skenario aplikasi yang berbeda. Untuk detailnya, lihat <a href="/docs/id/v2.4.x/milvus_backup_overview.md">Cadangan Milvus</a>.</p></li>
<li><p>Milvus Capture Data Change (CDC) Milvus-CDC dapat menangkap dan menyinkronkan data tambahan dalam instance Milvus dan memastikan keandalan data bisnis dengan mentransfernya dengan mulus antara instance sumber dan target, sehingga memudahkan pencadangan tambahan dan pemulihan bencana. Untuk detailnya, lihat <a href="/docs/id/v2.4.x/milvus-cdc-overview.md">Milvus CDC</a>.</p></li>
<li><p>Konektor Milvus Milvus telah merencanakan seperangkat konektor bagi Anda untuk mengintegrasikan Milvus dengan alat pihak ketiga, seperti Apache Spark. Saat ini, Anda dapat menggunakan Konektor Spark kami untuk memasukkan data Milvus Anda ke Apache Spark untuk pemrosesan pembelajaran mesin. Untuk detailnya, lihat <a href="/docs/id/v2.4.x/integrate_with_spark.md">Konektor Spark-Milvus</a>.</p></li>
<li><p>Layanan Transmisi Vektor (VTS) Milvus menyediakan seperangkat alat bagi Anda untuk mentransfer data Anda antara instance Milvus dan sekumpulan sumber data, termasuk klaster Zilliz, Elasticsearch, Postgres (PgVector), dan instance Milvus lainnya. Untuk detailnya, lihat <a href="https://github.com/zilliztech/vts">VTS</a>.</p></li>
</ul>
