---
id: install-overview.md
summary: >-
  Milvus adalah basis data vektor yang sangat berkinerja tinggi dan dapat
  diskalakan. Basis data ini mendukung berbagai skenario penggunaan dengan skala
  yang beragam, mulai dari demo yang dijalankan secara lokal di Jupyter
  Notebooks hingga kluster Kubernetes berskala besar yang menangani puluhan
  miliar vektor. Saat ini, terdapat tiga opsi penyebaran Milvus: Milvus Lite,
  Milvus Standalone, dan Milvus Distributed.
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
    </button></h1><p>Milvus adalah basis data vektor yang berkinerja tinggi dan dapat diskalakan. Basis data ini mendukung berbagai skenario penggunaan dengan skala yang beragam, mulai dari demo yang dijalankan secara lokal di Jupyter Notebooks hingga kluster Kubernetes berskala besar yang menangani puluhan miliar vektor. Saat ini, terdapat tiga opsi penerapan Milvus: Milvus Lite, Milvus Standalone, dan Milvus Distributed.</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> adalah pustaka Python yang dapat diimpor ke dalam aplikasi Anda. Sebagai versi ringan dari Milvus, Milvus Lite sangat ideal untuk pembuatan prototipe cepat di Jupyter Notebooks atau dijalankan pada perangkat pintar dengan sumber daya terbatas. Milvus Lite mendukung API yang sama dengan deployment Milvus lainnya. Kode sisi klien yang berinteraksi dengan Milvus Lite juga dapat bekerja dengan instance Milvus dalam mode deployment lainnya.</p>
<p>Untuk mengintegrasikan Milvus Lite ke dalam aplikasi Anda, jalankan perintah ` <code translate="no">pip install pymilvus</code> ` untuk menginstalnya, lalu gunakan pernyataan ` <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> ` untuk membuat instans basis data vektor dengan berkas lokal yang menyimpan semua data Anda. Untuk detail lebih lanjut, lihat bagian " <a href="https://milvus.io/docs/milvus_lite.md">Run Milvus Lite</a>".</p>
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
    </button></h2><p>Milvus Standalone adalah penyebaran server pada satu mesin. Semua komponen Milvus Standalone dikemas dalam satu <a href="https://milvus.io/docs/install_standalone-docker.md">gambar Docker</a>, sehingga memudahkan proses penyebaran. Jika Anda memiliki beban kerja produksi tetapi memilih untuk tidak menggunakan Kubernetes, menjalankan Milvus Standalone pada satu mesin dengan memori yang memadai merupakan pilihan yang tepat. Secara default, Milvus Standalone menjalankan <strong>Woodpecker</strong> (terintegrasi) sebagai antrian pesannya, sehingga tidak ada layanan pesan terpisah yang perlu dioperasikan.</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus Distributed<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Distributed dapat diimplementasikan pada kluster <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>. Implementasi ini memiliki arsitektur cloud-native, di mana beban pengambilan data dan kueri pencarian ditangani secara terpisah oleh node-node yang terisolasi, sehingga memungkinkan redundansi untuk komponen-komponen kritis. Milvus Distributed menawarkan skalabilitas dan ketersediaan tertinggi, serta fleksibilitas dalam menyesuaikan sumber daya yang dialokasikan pada setiap komponen. Milvus Distributed adalah pilihan utama bagi pengguna perusahaan yang menjalankan sistem pencarian vektor berskala besar dalam produksi. Secara default, Milvus Distributed menjalankan <strong>Woodpecker</strong> sebagai antrian pesannya, yang diimplementasikan sebagai layanan khusus bersama Milvus.</p>
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
    </button></h2><p>Pemilihan mode penerapan biasanya bergantung pada tahap pengembangan aplikasi Anda:</p>
<ul>
<li><p><strong>Untuk Pembuatan Prototipe Cepat</strong></p>
<p>Jika Anda ingin dengan cepat membangun sesuatu sebagai prototipe atau untuk tujuan pembelajaran, seperti demo Retrieval Augmented Generation (RAG), chatbot AI, atau pencarian multimodal, Milvus Lite sendiri atau kombinasi Milvus Lite dan Milvus Standalone sangat cocok. Anda dapat menggunakan Milvus Lite di notebook untuk prototipe cepat dan mengeksplorasi berbagai pendekatan, seperti strategi chunking yang berbeda dalam RAG. Anda mungkin ingin mengimplementasikan aplikasi yang dibangun dengan Milvus Lite dalam lingkungan produksi skala kecil untuk melayani pengguna nyata, atau memvalidasi ide tersebut pada dataset yang lebih besar, misalnya lebih dari beberapa juta vektor. Milvus Standalone adalah pilihan yang tepat. Logika aplikasi untuk Milvus Lite tetap dapat dibagikan karena semua penerapan Milvus memiliki API sisi klien yang sama. Data yang disimpan di Milvus Lite juga dapat dipindahkan ke Milvus Standalone menggunakan alat baris perintah.</p></li>
<li><p><strong>Penerapan Produksi Skala Kecil</strong></p>
<p>Untuk produksi tahap awal, ketika proyek masih mencari kesesuaian produk-pasar dan kelincahan lebih penting daripada skalabilitas, Milvus Standalone adalah pilihan terbaik. Milvus Standalone masih dapat diskalakan hingga 100 juta vektor dengan sumber daya mesin yang memadai, sekaligus membutuhkan DevOps yang jauh lebih sedikit daripada memelihara kluster K8s.</p></li>
<li><p><strong>Penerapan Produksi Skala Besar</strong></p>
<p>Seiring pertumbuhan bisnis Anda yang pesat dan skala data melampaui kapasitas satu server, inilah saatnya mempertimbangkan Milvus Distributed. Anda dapat tetap menggunakan Milvus Standalone untuk lingkungan pengembangan atau staging karena kemudahannya, sekaligus mengoperasikan kluster K8s yang menjalankan Milvus Distributed. Hal ini dapat mendukung Anda hingga puluhan miliar vektor, serta memberikan fleksibilitas dalam menyesuaikan ukuran node untuk beban kerja khusus Anda, seperti kasus pembacaan tinggi, penulisan jarang, atau penulisan tinggi, pembacaan rendah.</p></li>
<li><p><strong>Pencarian Lokal di Perangkat Edge</strong></p>
<p>Untuk melakukan pencarian pada data pribadi atau sensitif di perangkat tepi, Anda dapat mengimplementasikan Milvus Lite langsung di perangkat tersebut tanpa bergantung pada layanan berbasis cloud untuk pencarian teks atau gambar. Hal ini cocok untuk kasus seperti pencarian dokumen eksklusif, atau deteksi objek langsung di perangkat.</p></li>
</ul>
<p>Pilihan mode penerapan Milvus bergantung pada tahap dan skala proyek Anda. Milvus menyediakan solusi yang fleksibel dan kuat untuk berbagai kebutuhan, mulai dari pembuatan prototipe cepat hingga penerapan skala besar di perusahaan.</p>
<ul>
<li><strong>Milvus Lite</strong> direkomendasikan untuk dataset yang lebih kecil, hingga beberapa juta vektor.</li>
<li><strong>Milvus Standalone</strong> cocok untuk dataset berukuran sedang, yang dapat ditingkatkan hingga 100 juta vektor.</li>
<li><strong>Milvus Distributed</strong> dirancang untuk penerapan berskala besar, yang mampu menangani kumpulan data mulai dari 100 juta hingga puluhan miliar vektor.</li>
</ul>
<p>Terlepas dari mode penerapan apa pun, setiap instance Milvus bergantung pada antrian pesan, penyimpanan objek, dan penyimpanan metadata — secara default <strong>Woodpecker</strong>, <strong>MinIO</strong>, dan <strong>etcd</strong>. Untuk mempelajari tentang ketergantungan ini, menyesuaikannya, atau menghubungkan layanan eksternal, lihat <a href="/docs/id/data-infra-integration-overview.md">Infrastruktur Data</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>Pilih opsi penerapan yang sesuai dengan kasus penggunaan Anda</span>
  
 </span></p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">Perbandingan fitur<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
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
<tr><th>Fitur</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / Perpustakaan Klien</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Tipe data</td><td>Vektor Padat<br/>Vektor Jarang<br/>Vektor Biner<br/>Boolean<br/>Bilangan Bulat<br/>Bilangan Pecahan<br/>VarChar<br/>Array<br/>JSON</td><td>Vektor Padat<br/>Vektor Jarang<br/>Vektor Biner<br/>Boolean<br/>Bilangan Bulat<br/>Bilangan Pecahan<br/>VarChar<br/>Array<br/>JSON</td><td>Vektor Padat<br/>Vektor Jarang<br/>Vektor Biner<br/>Boolean<br/>Bilangan Bulat<br/>Bilangan Pecahan<br/>VarChar<br/>Array<br/>JSON</td></tr>
<tr><td>Kemampuan pencarian</td><td>Pencarian Vektor (Pencarian ANN)<br/>Penyaringan Metadata<br/>Pencarian Rentang<br/>Kueri Skalar<br/>Dapatkan Entitas berdasarkan Kunci Utama<br/>Pencarian Hibrida</td><td>Pencarian Vektor (Pencarian ANN)<br/>Penyaringan Metadata<br/>Pencarian Rentang<br/>Kueri Skalar<br/>Mengambil Entitas berdasarkan Kunci Utama<br/>Pencarian Hibrida</td><td>Pencarian Vektor (Pencarian ANN)<br/>Penyaringan Metadata<br/>Pencarian Rentang<br/>Kueri Skalar<br/>Mengambil Entitas berdasarkan Kunci Utama<br/>Pencarian Hibrida</td></tr>
<tr><td>Operasi CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Manajemen data lanjutan</td><td>N/A</td><td>Kontrol Akses<br/>Partisi<br/>Kunci Partisi</td><td><br/>Kontrol Akses Partisi<br/>Kunci Partisi<br/>Pengelompokan Sumber Daya Fisik</td></tr>
<tr><td>Tingkat Konsistensi</td><td>Kuat</td><td>Kuat<br/>Keterlambatan Terbatas<br/>Sesi<br/>Akhirnya</td><td>Kuat<br/>Keterlambatan Terbatas<br/>Sesi<br/>Akhir</td></tr>
<tr><td>Antrian pesan</td><td>N/A</td><td>Woodpecker (terintegrasi)</td><td>Woodpecker (layanan)</td></tr>
</tbody>
</table>
