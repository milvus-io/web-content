---
id: install-overview.md
summary: >-
  Pilihlah Milvus Lite, Standalone, atau Distributed sesuai dengan beban kerja,
  persyaratan ketersediaan, dan lingkungan operasi Anda.
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
    </button></h1><p>Milvus mendukung prototipe lokal dan layanan pencarian vektor berskala besar. Pilihlah di antara Milvus Lite, Milvus Standalone, dan Milvus Distributed berdasarkan data Anda, beban baca dan tulis, persyaratan ketersediaan, serta lingkungan operasi.</p>
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
<p>Untuk contoh lokal, gunakan Python 3.10 atau yang lebih baru dan instal dependensi Lite opsional secara eksplisit. Di Windows, pip melewatkan opsi ` <code translate="no">milvus-lite</code> `, sehingga nama paket yang eksplisit diperlukan:</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Gunakan ` <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> ` untuk membuka penyimpanan lokal. Milvus Lite 3.x membuat direktori di jalur ini; file basis data Milvus Lite 2.x yang sudah ada memerlukan ekspor dan migrasi. Lihat <a href="/docs/id/milvus_lite.md">Jalankan Milvus Lite</a> untuk persyaratan platform dan <a href="/docs/id/quickstart.md">Panduan Cepat</a> untuk contoh lengkap penyisipan dan pencarian.</p>
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
    </button></h2><p>Milvus Standalone adalah penyebaran server pada satu mesin. Semua komponen Milvus Standalone dikemas ke dalam satu <a href="https://milvus.io/docs/install_standalone-docker.md">gambar Docker</a>, sehingga memudahkan penyebaran. Jika Anda memiliki beban kerja produksi tetapi memilih untuk tidak menggunakan Kubernetes, menjalankan Milvus Standalone pada satu mesin dengan memori yang memadai merupakan pilihan yang baik. Secara default, Milvus Standalone menjalankan <strong>Woodpecker</strong> (terintegrasi) sebagai antrian pesannya, sehingga tidak ada layanan pesan terpisah yang perlu dioperasikan.</p>
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
<p>Gunakan Milvus Lite di notebook untuk menguji embedding, strategi chunking RAG, dan perilaku pengambilan data. Beralihlah ke Milvus Standalone saat Anda memerlukan server bersama atau ketika beban memori dan kueri yang terukur melebihi kapasitas lingkungan lokal. API kliennya serupa, tetapi periksa perbedaan fitur dan migrasikan data yang tersimpan secara terpisah.</p></li>
<li><p><strong>Penerapan Produksi Skala Kecil</strong></p>
<p>Gunakan Milvus Standalone jika satu server dapat memenuhi persyaratan beban kerja dan ketersediaan Anda, dan Anda lebih memilih untuk beroperasi tanpa Kubernetes. Perkirakan memori dari dimensi vektor, bidang skalar, pengaturan indeks, dan replika, lalu ukur kinerja konkurensi kueri dan laju penulisan yang diharapkan. Jumlah vektor saja tidak menentukan kapasitas.</p></li>
<li><p><strong>Penerapan Produksi Skala Besar</strong></p>
<p>Seiring pertumbuhan bisnis Anda yang pesat dan skala data melampaui kapasitas satu server, inilah saatnya mempertimbangkan Milvus Distributed. Anda dapat tetap menggunakan Milvus Standalone untuk lingkungan pengembangan atau staging karena kemudahannya, sekaligus mengoperasikan kluster K8s yang menjalankan Milvus Distributed. Hal ini dapat mendukung Anda hingga puluhan miliar vektor, serta memberikan fleksibilitas dalam menyesuaikan ukuran node untuk beban kerja khusus Anda, seperti kasus pembacaan tinggi, penulisan jarang, atau penulisan tinggi, pembacaan rendah.</p></li>
<li><p><strong>Pencarian Lokal di Perangkat Edge</strong></p>
<p>Untuk melakukan pencarian pada data pribadi atau sensitif di perangkat tepi, Anda dapat mengimplementasikan Milvus Lite di perangkat tersebut tanpa bergantung pada layanan berbasis cloud untuk melakukan pencarian teks atau gambar. Hal ini cocok untuk kasus seperti pencarian dokumen eksklusif, atau deteksi objek di perangkat.</p></li>
</ul>
<p>Pilihan mode penerapan Milvus bergantung pada tahap dan skala proyek Anda. Milvus menyediakan solusi yang fleksibel dan kuat untuk berbagai kebutuhan, mulai dari pembuatan prototipe cepat hingga penerapan skala besar di perusahaan.</p>
<ul>
<li><strong>Milvus Lite</strong> cocok untuk evaluasi lokal dan beban kerja dalam sumber daya aplikasi tunggal.</li>
<li><strong>Milvus Standalone</strong> menyediakan layanan bersama ketika satu server memenuhi persyaratan kapasitas dan ketersediaan yang Anda tentukan.</li>
<li><strong>Milvus Distributed</strong> menyediakan penskalaan dan redundansi tingkat komponen ketika Anda perlu memperluas melampaui satu server atau memisahkan sumber daya baca dan tulis.</li>
</ul>
<p>Milvus Standalone dan Distributed menggunakan antrian pesan, penyimpanan objek, dan penyimpanan metadata. Milvus Lite berjalan secara lokal tanpa layanan terpisah tersebut. Untuk dependensi default dan opsi layanan eksternal pada penerapan server, lihat <a href="/docs/id/data-infra-integration-overview.md">Infrastruktur Data</a>.</p>
<p>Jika Anda menginginkan layanan terkelola alih-alih mengoperasikan infrastruktur server, pertimbangkan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Untuk penerapan mandiri, lanjutkan dengan <a href="/docs/id/install_standalone-docker.md">Docker</a> atau <a href="/docs/id/install_cluster-milvusoperator.md">Kubernetes</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>Pilih opsi penyebaran sesuai kebutuhan Anda</span>
  
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
    </button></h2><p>Kolom Lite menjelaskan Milvus Lite 3.2.2. Periksa <a href="/docs/id/milvus_lite.md#Supported-features-and-limits">batasan Milvus Lite</a> sebelum mengandalkan fitur server dalam aplikasi lokal.</p>
<table>
<thead>
<tr><th>Fitur</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / pustaka klien</td><td>Python (adaptor PyMilvus lokal)</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Tipe data</td><td>Vektor Padat<br/>Vektor Jarang<br/>Boolean<br/>Bilangan Bulat<br/>Bilangan Pecahan<br/>VarChar<br/>Array<br/>JSON</td><td>Vektor Padat<br/>Vektor Jarang<br/>Vektor Biner<br/>Boolean<br/>Bilangan Bulat<br/>Bilangan Pecahan<br/>VarChar<br/>Array<br/>JSON</td><td>Vektor Padat<br/>Vektor Jarang<br/>Vektor Biner<br/>Boolean<br/>Bilangan Bulat<br/>Bilangan Pecahan<br/>VarChar<br/>Array<br/>JSON</td></tr>
<tr><td>Fitur pencarian</td><td>Pencarian Vektor (Pencarian ANN)<br/>Penyaringan Metadata<br/>Pencarian Rentang<br/>Kueri Skalar<br/>Dapatkan Entitas berdasarkan Kunci Utama<br/>Pencarian Hibrida</td><td>Pencarian Vektor (Pencarian ANN)<br/>Penyaringan Metadata<br/>Pencarian Rentang<br/>Kueri Skalar<br/>Mengambil Entitas berdasarkan Kunci Utama<br/>Pencarian Hibrida</td><td>Pencarian Vektor (Pencarian ANN)<br/>Penyaringan Metadata<br/>Pencarian Rentang<br/>Kueri Skalar<br/>Mengambil Entitas berdasarkan Kunci Utama<br/>Pencarian Hibrida</td></tr>
<tr><td>Operasi CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Manajemen data lanjutan</td><td>Basis data<br/>Partisi<br/>Alias<br/>Tanpa kontrol akses</td><td>Kontrol Akses<br/>Partisi<br/>Kunci Partisi</td><td>Kontrol Akses<br/>Partisi<br/>Kunci Partisi<br/>Pengelompokan Sumber Daya Fisik</td></tr>
<tr><td>Tingkat Konsistensi</td><td>Tidak berlaku: satu proses lokal melayani semua permintaan; <code translate="no">consistency_level</code> diterima tetapi tidak berpengaruh</td><td><br/>Kuat, Keterlambatan Terbatas<br/>Sesi<br/>Akhirnya</td><td><br/>Kuat, Kedaluwarsa Terbatas,<br/>, Sesi,<br/>, Akhirnya</td></tr>
<tr><td>Antrian pesan</td><td>N/A</td><td>Woodpecker (terintegrasi)</td><td>Woodpecker (layanan)</td></tr>
</tbody>
</table>
