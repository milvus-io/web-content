---
id: streaming_service.md
title: Layanan Streaming
summary: >-
  Layanan Streaming adalah konsep untuk modul sistem streaming internal Milvus,
  yang dibangun di sekitar Write-Ahead Log (WAL) untuk mendukung berbagai fungsi
  yang berhubungan dengan streaming.
---
<h1 id="Streaming-Service" class="common-anchor-header">Layanan Streaming<button data-href="#Streaming-Service" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>Layanan Streaming</strong> adalah konsep untuk modul sistem streaming internal Milvus, yang dibangun di sekitar Write-Ahead Log (WAL) untuk mendukung berbagai fungsi yang berhubungan dengan streaming. Ini termasuk konsumsi/langganan data streaming, pemulihan kesalahan status cluster, konversi data streaming menjadi data historis, dan kueri data yang terus bertambah. Secara arsitektur, Layanan Streaming terdiri dari tiga komponen utama:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_distributed_arch.png" alt="Streaming Distributed Arc" class="doc-image" id="streaming-distributed-arc" />
   </span> <span class="img-wrapper"> <span>Streaming Arc Terdistribusi</span> </span></p>
<ul>
<li><p><strong>Koordinator Streaming</strong>: Komponen logis dalam node koordinator. Ini menggunakan Etcd untuk penemuan layanan untuk menemukan node streaming yang tersedia dan bertanggung jawab untuk mengikat WAL ke node streaming yang sesuai. Ini juga mendaftarkan layanan untuk mengekspos topologi distribusi WAL, yang memungkinkan klien streaming untuk mengetahui node streaming yang sesuai untuk WAL yang diberikan.</p></li>
<li><p><strong>Streaming Node Cluster</strong>: Sekelompok node pekerja streaming yang bertanggung jawab atas semua tugas pemrosesan streaming, seperti penambahan wal, pemulihan status, dan permintaan data yang berkembang.</p></li>
<li><p><strong>Klien Streaming</strong>: Klien Milvus yang dikembangkan secara internal yang merangkum fungsi-fungsi dasar seperti penemuan layanan dan pemeriksaan kesiapan. Ini digunakan untuk memulai operasi seperti penulisan pesan dan berlangganan.</p></li>
</ul>
<h2 id="Message" class="common-anchor-header">Pesan<button data-href="#Message" class="anchor-icon" translate="no">
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
    </button></h2><p>Streaming Service adalah sistem streaming berbasis log, sehingga semua operasi penulisan di Milvus (seperti DML dan DDL) diabstraksikan sebagai <strong>Message</strong>.</p>
<ul>
<li><p>Setiap Pesan diberi bidang <strong>Timestamp Oracle (TSO</strong> ) oleh Layanan Streaming, yang menunjukkan urutan pesan dalam WAL. Urutan pesan menentukan urutan operasi penulisan di Milvus. Hal ini memungkinkan untuk merekonstruksi status cluster terbaru dari log.</p></li>
<li><p>Setiap Pesan adalah milik <strong>VChannel</strong> (Saluran Virtual) tertentu dan mempertahankan properti invarian tertentu di dalam saluran tersebut untuk memastikan konsistensi operasi. Sebagai contoh, operasi Insert harus selalu terjadi sebelum operasi DropCollection pada saluran yang sama.</p></li>
</ul>
<p>Urutan pesan di Milvus mungkin menyerupai berikut ini:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/message_order.png" alt="Message Order" class="doc-image" id="message-order" />
   </span> <span class="img-wrapper"> <span>Urutan Pesan</span> </span></p>
<h2 id="WAL-Component" class="common-anchor-header">Komponen WAL<button data-href="#WAL-Component" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk mendukung skalabilitas horizontal skala besar, WAL Milvus bukanlah file log tunggal, tetapi gabungan dari beberapa log. Setiap log dapat secara independen mendukung fungsionalitas streaming untuk beberapa VChannels. Pada waktu tertentu, komponen WAL diizinkan untuk beroperasi <strong>tepat pada satu node streaming</strong>, batasan ini dijanjikan oleh mekanisme pagar penyimpanan WAL yang mendasari dan koordinator streaming.</p>
<p>Fitur tambahan dari komponen WAL meliputi:</p>
<ul>
<li><p><strong>Manajemen Siklus Hidup Segmen</strong>: Berdasarkan kebijakan seperti kondisi memori / ukuran segmen / waktu menganggur segmen, WAL mengelola siklus hidup setiap segmen.</p></li>
<li><p><strong>Dukungan Transaksi Dasar</strong>: Karena setiap pesan memiliki batas ukuran, komponen WAL mendukung tingkat transaksi sederhana untuk menjanjikan penulisan atomik pada tingkat VChannel.</p></li>
<li><p><strong>Penulisan Log Jarak Jauh Berkonvergensi Tinggi</strong>: Milvus mendukung antrian pesan jarak jauh pihak ketiga sebagai penyimpanan WAL. Untuk mengurangi latensi bolak-balik (RTT) antara node streaming dan penyimpanan WAL jarak jauh untuk meningkatkan throughput penulisan, layanan streaming mendukung penulisan log secara bersamaan. Layanan ini mempertahankan urutan pesan dengan sinkronisasi TSO dan TSO, dan pesan dalam WAL dibaca dalam urutan TSO.</p></li>
<li><p><strong>Buffer Tulis-Maju</strong>: Setelah pesan ditulis ke WAL, pesan-pesan tersebut disimpan sementara dalam Write-Ahead Buffer. Hal ini memungkinkan pembacaan log tanpa mengambil pesan dari penyimpanan WAL jarak jauh.</p></li>
<li><p><strong>Mendukung beberapa Penyimpanan WAL</strong>: Woodpecker, Pulsar, Kafka. Gunakan woodpecker dengan mode zero-disk, kita dapat menghapus ketergantungan penyimpanan WAL jarak jauh.</p></li>
</ul>
<h2 id="Recovery-Storage" class="common-anchor-header">Penyimpanan Pemulihan<button data-href="#Recovery-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Komponen <strong>Penyimpanan Pemulihan</strong> selalu berjalan pada simpul streaming di mana komponen WAL yang sesuai berada.</p>
<ul>
<li><p>Komponen ini bertanggung jawab untuk mengubah data streaming menjadi data historis yang tersimpan dan menyimpannya dalam penyimpanan objek.</p></li>
<li><p>Komponen ini juga menangani pemulihan status dalam memori untuk komponen WAL pada node streaming.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/recovery_storage.png" alt="Recovery Storage" class="doc-image" id="recovery-storage" />
   </span> <span class="img-wrapper"> <span>Penyimpanan Pemulihan</span> </span></p>
<h2 id="Query-Delegator" class="common-anchor-header">Delegator Kueri<button data-href="#Query-Delegator" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Delegator Kueri</strong> berjalan di setiap node streaming dan bertanggung jawab untuk mengeksekusi <strong>kueri tambahan</strong> pada satu pecahan. Ini menghasilkan rencana kueri, meneruskannya ke Query Node yang relevan, dan menggabungkan hasilnya.</p>
<p>Selain itu, Delegator Kueri bertanggung jawab untuk menyiarkan <strong>operasi Penghapusan</strong> ke Node Kueri lain.</p>
<p>Delegator Kueri selalu berdampingan dengan komponen WAL pada simpul streaming yang sama. Tetapi jika koleksi dikonfigurasi dengan multi-replika, maka <strong>N-1</strong> Delegator akan disebarkan pada node streaming lainnya.</p>
<h2 id="WAL-Lifetime-and-Wait-for-Ready" class="common-anchor-header">WAL Seumur Hidup dan Menunggu Siap<button data-href="#WAL-Lifetime-and-Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>Dengan memisahkan node komputasi dari penyimpanan, Milvus dapat dengan mudah memindahkan WAL dari satu node streaming ke node lainnya, sehingga mencapai ketersediaan yang tinggi dalam layanan streaming.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/wal_lifetime.png" alt="wal lifetime" class="doc-image" id="wal-lifetime" />
   </span> <span class="img-wrapper"> <span>wal seumur hidup</span> </span></p>
<h2 id="Wait-for-Ready" class="common-anchor-header">Tunggu Siap<button data-href="#Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>Ketika WAL akan berpindah ke node streaming baru, klien akan menemukan bahwa node streaming yang lama menolak beberapa permintaan. Sementara itu, WAL akan dipulihkan di node streaming baru, klien akan menunggu wal di node streaming baru siap untuk melayani.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_wait_for_ready.png" alt="wait for ready" class="doc-image" id="wait-for-ready" />
   </span> <span class="img-wrapper"> <span>menunggu siap</span> </span></p>
