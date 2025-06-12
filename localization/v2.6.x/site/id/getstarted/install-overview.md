---
id: install-overview.md
summary: >-
  Milvus adalah basis data vektor yang berkinerja tinggi dan dapat diskalakan.
  Milvus mendukung kasus penggunaan dengan berbagai ukuran, mulai dari demo yang
  berjalan secara lokal di Notebook Jupyter hingga cluster Kubernetes berskala
  besar yang menangani puluhan miliar vektor. Saat ini, ada tiga opsi penerapan
  Milvus_ Milvus Lite, Milvus Standalone, dan Milvus Distributed.
title: Gambaran Umum Opsi Penerapan Milvus
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Gambaran Umum Opsi Penerapan Milvus<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus adalah basis data vektor yang berkinerja tinggi dan dapat diskalakan. Milvus mendukung kasus penggunaan dengan berbagai ukuran, mulai dari demo yang berjalan secara lokal di Notebook Jupyter hingga cluster Kubernetes berskala besar yang menangani puluhan miliar vektor. Saat ini, ada tiga opsi penerapan Milvus: Milvus Lite, Milvus Standalone, dan Milvus Distributed.</p>
<h2 id="Milvus-Lite" class="common-anchor-header">Milvus Lite<button data-href="#Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> adalah pustaka Python yang dapat diimpor ke dalam aplikasi Anda. Sebagai versi ringan dari Milvus, ini sangat ideal untuk membuat prototipe cepat di Notebook Jupyter atau berjalan di perangkat pintar dengan sumber daya terbatas. Milvus Lite mendukung API yang sama dengan penerapan Milvus lainnya. Kode sisi klien yang berinteraksi dengan Milvus Lite juga dapat bekerja dengan instance Milvus dalam mode penerapan lainnya.</p>
<p>Untuk mengintegrasikan Milvus Lite ke dalam aplikasi Anda, jalankan <code translate="no">pip install pymilvus</code> untuk menginstalnya dan gunakan pernyataan <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> untuk menginstansiasi basis data vektor dengan file lokal yang menyimpan semua data Anda. Untuk lebih jelasnya, lihat Menjalankan <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>.</p>
<h2 id="Milvus-Standalone" class="common-anchor-header">Milvus Standalone<button data-href="#Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standalone adalah penerapan server mesin tunggal. Semua komponen Milvus Standalone dikemas ke dalam satu <a href="https://milvus.io/docs/install_standalone-docker.md">citra Docker</a>, sehingga memudahkan penyebaran. Jika Anda memiliki beban kerja produksi tetapi memilih untuk tidak menggunakan Kubernetes, menjalankan Milvus Standalone pada satu mesin dengan memori yang cukup adalah pilihan yang baik. Selain itu, Milvus Standalone mendukung ketersediaan tinggi melalui replikasi master-slave.</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus Terdistribusi<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Distributed dapat digunakan pada cluster <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>. Penerapan ini memiliki fitur arsitektur cloud-native, di mana beban konsumsi dan permintaan pencarian ditangani secara terpisah oleh node yang terisolasi, sehingga memungkinkan redundansi untuk komponen penting. Ini menawarkan skalabilitas dan ketersediaan tertinggi, serta fleksibilitas dalam menyesuaikan sumber daya yang dialokasikan di setiap komponen. Milvus Distributed adalah pilihan utama bagi pengguna perusahaan yang menjalankan sistem pencarian vektor berskala besar dalam produksi.</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">Pilih Penerapan yang Tepat untuk Kasus Penggunaan Anda<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h2><p>Pemilihan mode penyebaran biasanya tergantung pada tahap pengembangan aplikasi Anda:</p>
<ul>
<li><p><strong>Untuk Pembuatan Prototipe Cepat</strong></p>
<p>Jika Anda ingin membuat sesuatu dengan cepat sebagai prototipe atau untuk tujuan pembelajaran, seperti demo Retrieval Augmented Generation (RAG), chatbot AI, pencarian multi-modalitas, Milvus Lite itu sendiri atau kombinasi dari Milvus Lite dan Milvus Standalone sangat cocok. Anda dapat menggunakan Milvus Lite di notebook untuk membuat prototipe cepat dan mengeksplorasi berbagai pendekatan seperti strategi chunking yang berbeda di RAG. Anda mungkin ingin menggunakan aplikasi yang dibuat dengan Milvus Lite dalam produksi skala kecil untuk melayani pengguna yang sebenarnya, atau memvalidasi ide pada dataset yang lebih besar, misalnya lebih dari beberapa juta vektor. Milvus Standalone adalah pilihan yang tepat. Logika aplikasi untuk Milvus Lite masih dapat digunakan bersama karena semua penggunaan Milvus memiliki API sisi klien yang sama. Data yang disimpan di Milvus Lite juga dapat dipindahkan ke Milvus Standalone dengan alat baris perintah.</p></li>
<li><p><strong>Penerapan Produksi Skala Kecil</strong></p>
<p>Untuk produksi tahap awal, ketika proyek masih mencari kesesuaian produk dengan pasar dan kelincahan lebih penting daripada skalabilitas, Milvus Standalone adalah pilihan terbaik. Milvus Standalone masih dapat menskalakan hingga 100 juta vektor dengan sumber daya mesin yang cukup, namun membutuhkan lebih sedikit DevOps dibandingkan dengan mempertahankan cluster K8.</p></li>
<li><p><strong>Penerapan Produksi Skala Besar</strong></p>
<p>Ketika bisnis Anda berkembang pesat dan skala data melebihi kapasitas satu server, inilah saatnya untuk mempertimbangkan Milvus Distributed. Anda dapat tetap menggunakan Milvus Standalone untuk lingkungan pengembangan atau pementasan karena kenyamanannya, dan mengoperasikan cluster K8 yang menjalankan Milvus Distributed. Hal ini dapat mendukung Anda dalam menangani puluhan miliar vektor, serta memberikan fleksibilitas dalam menyesuaikan ukuran node untuk beban kerja khusus Anda, seperti kasus baca tinggi, tulis jarang atau tulis tinggi, baca rendah.</p></li>
<li><p><strong>Pencarian Lokal pada Perangkat Edge</strong></p>
<p>Untuk pencarian melalui perangkat yang bersifat pribadi atau sensitif di perangkat edge, Anda dapat menggunakan Milvus Lite di perangkat tanpa bergantung pada layanan berbasis cloud untuk melakukan pencarian teks atau gambar. Ini cocok untuk kasus-kasus seperti pencarian dokumen milik pribadi, atau deteksi objek di perangkat.</p></li>
</ul>
<p>Pilihan mode penerapan Milvus tergantung pada tahap dan skala proyek Anda. Milvus menyediakan solusi yang fleksibel dan kuat untuk berbagai kebutuhan, mulai dari pembuatan prototipe yang cepat hingga penerapan perusahaan berskala besar.</p>
<ul>
<li><strong>Milvus Lite</strong> direkomendasikan untuk dataset yang lebih kecil, hingga beberapa juta vektor.</li>
<li><strong>Milvus Standalone</strong> cocok untuk dataset berukuran sedang, dengan skala hingga 100 juta vektor.</li>
<li><strong>Milvus Distributed</strong> dirancang untuk penerapan skala besar, yang mampu menangani dataset dari 100 juta hingga puluhan miliar vektor.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" />
   </span> <span class="img-wrapper"> <span>Pilih opsi penerapan untuk kasus penggunaan Anda</span> </span></p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">Perbandingan fungsionalitas<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Fitur</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Terdistribusi</th></tr>
</thead>
<tbody>
<tr><td>SDK / Pustaka Klien</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Tipe data</td><td>Vektor Padat<br/>Vektor Jarang<br/>Vektor Biner<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td><td>Vektor Padat<br/>Vektor Jarang<br/>Vektor Biner<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td></tr>
<tr><td>Kemampuan pencarian</td><td>Pencarian Vektor (Pencarian ANN)<br/>Pemfilteran Metadata<br/>Pencarian Rentang<br/>Kueri Skalar<br/>Dapatkan Entitas dengan Kunci Utama<br/>Pencarian Hibrida</td><td>Pencarian Vektor (Pencarian ANN)<br/>Pemfilteran Metadata<br/>Pencarian Rentang<br/>Kueri Skalar<br/>Dapatkan Entitas dengan Kunci Utama<br/>Pencarian Hibrida</td><td>Pencarian Vektor (Pencarian ANN)<br/>Pemfilteran Metadata<br/>Pencarian Rentang<br/>Kueri Skalar<br/>Dapatkan Entitas berdasarkan Kunci Utama<br/>Pencarian Hibrida</td></tr>
<tr><td>Operasi CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Manajemen data tingkat lanjut</td><td>N/A</td><td>Kontrol Akses<br/>Partisi<br/>Kunci Partisi</td><td>Kontrol Akses<br/>Partisi<br/>Kunci Partisi<br/>Pengelompokan Sumber Daya Fisik</td></tr>
<tr><td>Tingkat Konsistensi</td><td>Kuat</td><td>Kuat<br/>Bounded Staleness<br/>Session<br/>Eventual</td><td>Kuat<br/>Bounded Staleness<br/>Session<br/>Eventual</td></tr>
</tbody>
</table>
