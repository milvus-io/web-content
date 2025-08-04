---
id: woodpecker_architecture.md
title: Woodpecker
summary: >-
  Woodpecker adalah sistem WAL cloud-native di Milvus 2.6. Dengan arsitektur
  tanpa disk dan dua mode penerapan, sistem ini memberikan throughput yang
  tinggi, biaya operasional yang rendah, dan skalabilitas tanpa batas pada
  penyimpanan objek.
---
<h1 id="Woodpecker" class="common-anchor-header">Woodpecker<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Di Milvus 2.6, Woodpecker menggantikan Kafka dan Pulsar dengan sistem write-ahead log (WAL) yang dibuat khusus untuk keperluan cloud. Dirancang untuk penyimpanan objek, Woodpecker menyederhanakan operasi, memaksimalkan hasil, dan menskalakan dengan mudah.</p>
<p>Sasaran desain Woodpecker:</p>
<ul>
<li><p>Throughput tertinggi di lingkungan cloud</p></li>
<li><p>Pencatatan yang tahan lama dan hanya menambahkan untuk pemulihan yang andal</p></li>
<li><p>Biaya operasional yang minimal tanpa disk lokal atau perantara eksternal</p></li>
</ul>
<h2 id="Zero-disk-architecture" class="common-anchor-header">Arsitektur tanpa disk<button data-href="#Zero-disk-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Inovasi inti Woodpecker adalah arsitektur tanpa disk:</p>
<ul>
<li>Semua data log disimpan dalam penyimpanan objek cloud (seperti Amazon S3, Google Cloud Storage, atau Alibaba OS)</li>
<li>Metadata dikelola melalui penyimpanan nilai kunci terdistribusi seperti <strong>etcd</strong></li>
<li>Tidak ada ketergantungan disk lokal untuk operasi inti</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_layers.png" alt="woodpecker layers" class="doc-image" id="woodpecker-layers" />
   </span> <span class="img-wrapper"> <span>lapisan pelatuk</span> </span></p>
<h2 id="Architecture-components" class="common-anchor-header">Komponen arsitektur<button data-href="#Architecture-components" class="anchor-icon" translate="no">
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
    </button></h2><p>Penerapan Woodpecker standar mencakup komponen-komponen berikut ini:</p>
<ul>
<li><strong>Klien</strong>: Lapisan antarmuka untuk mengeluarkan permintaan baca dan tulis</li>
<li><strong>LogStore</strong>: Mengelola buffering tulis berkecepatan tinggi, unggahan asinkron ke penyimpanan, dan pemadatan log</li>
<li><strong>Backend penyimpanan</strong>: Mendukung layanan penyimpanan yang dapat diskalakan dan berbiaya rendah seperti S3, GCS, dan sistem file seperti EFS</li>
<li><strong>Dll</strong>: Menyimpan metadata dan mengoordinasikan status log di seluruh node yang terdistribusi</li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">Mode penyebaran<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker menawarkan dua mode penerapan yang sesuai dengan kebutuhan spesifik Anda:</p>
<h3 id="MemoryBuffer---Lightweight-and-maintenance-free" class="common-anchor-header">MemoryBuffer - Ringan dan bebas perawatan</h3><p>Mode MemoryBuffer menyediakan opsi penerapan yang sederhana dan ringan di mana klien tertanam Woodpecker untuk sementara menyangga penulisan yang masuk di memori dan secara berkala membuangnya ke layanan penyimpanan objek cloud. Dalam mode ini, buffer memori disematkan langsung ke dalam klien, sehingga memungkinkan pengelompokan yang efisien sebelum dibuang ke S3. Metadata dikelola menggunakan <strong>etcd</strong> untuk memastikan konsistensi dan koordinasi. Mode ini paling cocok untuk beban kerja batch-berat dalam penerapan skala kecil atau lingkungan produksi yang memprioritaskan kesederhanaan di atas kinerja, terutama ketika latensi tulis yang rendah tidak terlalu penting. Latensi tulis dalam mode ini umumnya antara 200-500 ms.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>penerapan mode memori</span> </span>pelatuk</p>
<h3 id="QuorumBuffer---Optimized-for-low-latency-high-durability" class="common-anchor-header">QuorumBuffer - Dioptimalkan untuk latensi rendah, daya tahan tinggi</h3><p>Mode QuorumBuffer dirancang untuk beban kerja baca/tulis frekuensi tinggi yang peka terhadap latensi dan membutuhkan respons waktu nyata serta toleransi kesalahan yang kuat. Dalam mode ini, klien Woodpecker berinteraksi dengan sistem kuorum tiga replika untuk menyediakan buffer tulis berkecepatan tinggi, memastikan konsistensi yang kuat dan ketersediaan yang tinggi melalui konsensus terdistribusi.</p>
<p>Penulisan dianggap berhasil setelah klien berhasil mereplikasi data ke setidaknya dua dari tiga node kuorum, biasanya selesai dalam milidetik satu digit, setelah itu data secara asinkron dibuang ke penyimpanan objek awan untuk daya tahan jangka panjang. Arsitektur ini meminimalkan status on-node, menghilangkan kebutuhan volume disk lokal yang besar, dan menghindari perbaikan anti-entropi yang rumit yang sering kali diperlukan dalam sistem berbasis kuorum tradisional.</p>
<p>Hasilnya adalah lapisan WAL yang ramping dan kuat yang ideal untuk lingkungan produksi yang sangat penting di mana konsistensi, ketersediaan, dan pemulihan yang cepat sangat penting.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_quorumbuffer_mode_deployment.png" alt="woodpecker quorum mode deployment" class="doc-image" id="woodpecker-quorum-mode-deployment" />
   </span> <span class="img-wrapper"> <span>penerapan mode kuorum pelatuk</span> </span></p>
<h2 id="Performance-benchmarks" class="common-anchor-header">Tolok ukur kinerja<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Kami menjalankan tolok ukur yang komprehensif untuk mengevaluasi kinerja Woodpecker dalam pengaturan single-node, single-client, single-log-stream. Hasilnya sangat mengesankan jika dibandingkan dengan Kafka dan Pulsar:</p>
<table>
<thead>
<tr><th>Sistem</th><th>Kafka</th><th>Pulsar</th><th>WP Minio</th><th>WP Lokal</th><th>WP S3</th></tr>
</thead>
<tbody>
<tr><td>Throughput</td><td>129,96MB/s</td><td>107MB/s</td><td>71MB/dtk</td><td>450MB/s</td><td>750MB/s</td></tr>
<tr><td>latensi</td><td>58ms</td><td>35ms</td><td>184ms</td><td>1,8ms</td><td>166ms</td></tr>
</tbody>
</table>
<p>Sebagai konteks, kami mengukur batas throughput teoretis dari berbagai backend penyimpanan yang berbeda pada mesin uji kami:</p>
<ul>
<li>MinIO: ~110 MB/s</li>
<li>Sistem file lokal: 600-750 MB/s</li>
<li>Amazon S3 (instance EC2 tunggal): hingga 1,1 GB/s</li>
</ul>
<p>Hebatnya, Woodpecker secara konsisten mencapai 60-80% dari throughput maksimum yang dimungkinkan untuk setiap backend - tingkat efisiensi yang luar biasa untuk middleware.</p>
<h3 id="Key-performance-insights" class="common-anchor-header">Wawasan kinerja utama</h3><ul>
<li>Mode Sistem File Lokal: Woodpecker mencapai 450 MB/s - 3,5 kali lebih cepat daripada Kafka dan 4,2 kali lebih cepat daripada Pulsar - dengan latensi sangat rendah hanya 1,8 ms, sehingga ideal untuk penerapan node tunggal berkinerja tinggi.</li>
<li>Mode Penyimpanan Cloud (S3): Saat menulis langsung ke S3, Woodpecker mencapai 750 MB/s (sekitar 68% dari batas teoretis S3), 5,8× lebih tinggi daripada Kafka dan 7× lebih tinggi daripada Pulsar. Meskipun latensi lebih tinggi (166 ms), pengaturan ini memberikan throughput yang luar biasa untuk beban kerja yang berorientasi pada batch.</li>
<li>Mode Penyimpanan Objek (MinIO): Bahkan dengan MinIO, Woodpecker mencapai 71 MB/s-sekitar 65% dari kapasitas MinIO. Performa ini sebanding dengan Kafka dan Pulsar tetapi dengan kebutuhan sumber daya yang jauh lebih rendah.</li>
</ul>
<p>Woodpecker secara khusus dioptimalkan untuk penulisan bervolume tinggi secara bersamaan di mana menjaga ketertiban sangatlah penting. Dan hasil ini hanya mencerminkan tahap awal pengembangan-optimasi yang sedang berlangsung dalam penggabungan I/O, buffering cerdas, dan prefetching diharapkan dapat mendorong kinerja lebih dekat lagi ke batas teoretis.</p>
<h2 id="Operational-benefits" class="common-anchor-header">Manfaat operasional<button data-href="#Operational-benefits" class="anchor-icon" translate="no">
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
    </button></h2><p>Arsitektur cloud-native Woodpecker memberikan keuntungan operasional yang signifikan:</p>
<ul>
<li>Tidak<strong>ada manajemen penyimpanan lokal</strong>: Menghilangkan manajemen volume disk, konfigurasi RAID, dan kegagalan perangkat keras</li>
<li><strong>Penskalaan otomatis</strong>: Skala penyimpanan dengan penyimpanan objek cloud tanpa perencanaan kapasitas</li>
<li><strong>Efisiensi biaya</strong>: Penyimpanan bayar sesuai penggunaan dengan tiering dan kompresi otomatis</li>
<li><strong>Ketersediaan tinggi</strong>: Memanfaatkan daya tahan 11-sembilan dari penyedia layanan cloud dengan pemulihan yang cepat</li>
<li><strong>Penerapan</strong> yang<strong>disederhanakan</strong>: Dua mode penerapan (MemoryBuffer/QuorumBuffer) sesuai dengan kebutuhan operasional yang berbeda</li>
<li><strong>Ramah pengembang</strong>: Penyiapan lingkungan yang lebih cepat dan arsitektur yang konsisten di semua lingkungan</li>
</ul>
<p>Keunggulan-keunggulan ini menjadikan Woodpecker sangat berharga untuk RAG yang sangat penting, agen AI, dan beban kerja pencarian dengan latensi rendah di mana kesederhanaan operasional sama pentingnya dengan kinerja.</p>
