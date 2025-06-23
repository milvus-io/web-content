---
id: data_processing.md
summary: Pelajari tentang prosedur pemrosesan data di Milvus.
title: Pengolahan Data
---
<h1 id="Data-Processing" class="common-anchor-header">Pengolahan Data<button data-href="#Data-Processing" class="anchor-icon" translate="no">
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
    </button></h1><p>Artikel ini memberikan penjelasan rinci mengenai implementasi penyisipan data, pembuatan indeks, dan kueri data di Milvus.</p>
<h2 id="Data-insertion" class="common-anchor-header">Penyisipan data<button data-href="#Data-insertion" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat memilih berapa banyak pecahan yang digunakan oleh sebuah koleksi di Milvus-setiap pecahan dipetakan ke sebuah saluran virtual<em>(vchannel)</em>. Seperti yang diilustrasikan di bawah ini, Milvus kemudian menetapkan setiap <em>vchannel</em> ke saluran fisik<em>(pchannel</em>), dan setiap <em>pchannel</em> terikat ke Streaming Node tertentu.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/pvchannel_wal.png" alt="VChannel PChannel and StreamingNode" class="doc-image" id="vchannel-pchannel-and-streamingnode" />
   </span> <span class="img-wrapper"> <span>VChannel PChannel dan StreamingNode</span> </span></p>
<p>Setelah verifikasi data, proxy akan membagi pesan tertulis menjadi berbagai paket data pecahan sesuai dengan aturan perutean pecahan yang ditentukan.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>Saluran 1</span> </span></p>
<p>Kemudian data tertulis dari satu pecahan<em>(vchannel</em>) dikirim ke Streaming Node <em>pchannel</em> yang sesuai.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" />
   </span> <span class="img-wrapper"> <span>aliran tulis</span> </span></p>
<p>Streaming Node memberikan Timestamp Oracle (TSO) ke setiap paket data untuk menetapkan urutan total operasi. Ini melakukan pemeriksaan konsistensi pada payload sebelum menuliskannya ke dalam write-ahead log (WAL) yang mendasarinya. Setelah data disimpan dalam jangka waktu yang lama di WAL, data tersebut dijamin tidak akan hilang-bahkan jika terjadi kerusakan, Streaming Node dapat memutar ulang WAL untuk memulihkan semua operasi yang tertunda.</p>
<p>Sementara itu, StreamingNode juga secara asinkron memotong entri WAL yang telah dikomitmenkan ke dalam segmen-segmen terpisah. Ada dua jenis segmen:</p>
<ul>
<li><strong>Segmen yang sedang tumbuh</strong>: semua data yang belum dimasukkan ke dalam penyimpanan objek.</li>
<li><strong>Segmen tertutup</strong>: semua data telah dimasukkan ke dalam penyimpanan objek, data segmen tertutup tidak dapat diubah.</li>
</ul>
<p>Transisi dari segmen yang sedang tumbuh menjadi segmen tertutup disebut flush. Streaming Node memicu flush segera setelah ia menelan dan menulis semua entri WAL yang tersedia untuk segmen itu - yaitu, ketika tidak ada lagi catatan yang tertunda dalam log tulis-depan yang mendasarinya - pada saat itu segmen tersebut diselesaikan dan dioptimalkan untuk dibaca.</p>
<h2 id="Index-building" class="common-anchor-header">Pembuatan indeks<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>Pembuatan indeks dilakukan oleh simpul data. Untuk menghindari pembuatan indeks yang sering untuk pembaruan data, koleksi di Milvus dibagi lebih lanjut menjadi beberapa segmen, masing-masing dengan indeksnya sendiri.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>Pembuatan indeks</span> </span></p>
<p>Milvus mendukung pembangunan indeks untuk setiap bidang vektor, bidang skalar, dan bidang primer. Baik input maupun output dari pembangunan indeks berhubungan dengan penyimpanan objek: Simpul data memuat snapshot log untuk diindeks dari sebuah segmen (yang ada di penyimpanan objek) ke memori, mendeserialisasi data dan metadata yang sesuai untuk membangun indeks, menserialisasi indeks ketika pembangunan indeks selesai, dan menuliskannya kembali ke penyimpanan objek.</p>
<p>Pembuatan indeks terutama melibatkan operasi vektor dan matriks dan karenanya bersifat komputasi dan memori intensif. Vektor tidak dapat diindeks secara efisien dengan indeks berbasis pohon tradisional karena sifatnya yang berdimensi tinggi, tetapi dapat diindeks dengan teknik yang lebih matang dalam hal ini, seperti indeks berbasis kluster atau grafik. Apa pun jenisnya, membangun indeks melibatkan perhitungan berulang yang sangat besar untuk vektor berskala besar, seperti Kmeans atau graph traverse.</p>
<p>Tidak seperti pengindeksan untuk data skalar, membangun indeks vektor harus memanfaatkan sepenuhnya akselerasi SIMD (single instruction, multiple data). Milvus memiliki dukungan bawaan untuk set instruksi SIMD, misalnya, SSE, AVX2, dan AVX512. Mengingat "cegukan" dan sifat intensif sumber daya dari pembangunan indeks vektor, elastisitas menjadi sangat penting bagi Milvus dalam hal ekonomi. Rilis Milvus di masa depan akan mengeksplorasi lebih lanjut dalam komputasi heterogen dan komputasi tanpa server untuk menurunkan biaya terkait.</p>
<p>Selain itu, Milvus juga mendukung pemfilteran skalar dan kueri bidang utama. Milvus memiliki indeks bawaan untuk meningkatkan efisiensi kueri, misalnya indeks filter Bloom, indeks hash, indeks berbasis pohon, dan indeks terbalik, dan berencana untuk memperkenalkan lebih banyak indeks eksternal, misalnya indeks bitmap dan indeks kasar.</p>
<h2 id="Data-query" class="common-anchor-header">Permintaan data<button data-href="#Data-query" class="anchor-icon" translate="no">
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
    </button></h2><p>Kueri data mengacu pada proses pencarian koleksi tertentu untuk <em>k</em> jumlah vektor yang terdekat dengan vektor target atau untuk <em>semua</em> vektor dalam rentang jarak tertentu ke vektor. Vektor dikembalikan bersama dengan kunci utama dan bidang yang sesuai.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>Permintaan data</span> </span></p>
<p>Sebuah koleksi di Milvus dibagi menjadi beberapa segmen; Streaming Node memuat segmen yang sedang berkembang dan menyimpan data real-time, sementara Query Node memuat segmen yang disegel.</p>
<p>Ketika permintaan kueri/pencarian tiba, proksi menyiarkan permintaan tersebut ke semua Streaming Node yang bertanggung jawab atas pecahan terkait untuk pencarian bersamaan.</p>
<p>Ketika permintaan kueri tiba, proxy secara bersamaan meminta Streaming Node yang menyimpan pecahan terkait untuk menjalankan pencarian.</p>
<p>Setiap Streaming Node membuat rencana kueri, mencari data lokal yang berkembang, dan secara bersamaan menghubungi Query Node jarak jauh untuk mengambil hasil historis, kemudian menggabungkannya menjadi satu hasil pecahan.</p>
<p>Terakhir, proxy mengumpulkan semua hasil pecahan, menggabungkannya ke dalam hasil akhir, dan mengembalikannya ke klien.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" />
    Serah terima </span></p>
<p>Ketika segmen yang berkembang pada Streaming Node disiram menjadi segmen tertutup - atau ketika Node Data menyelesaikan pemadatan - Koordinator memulai operasi handoff untuk mengubah data yang berkembang menjadi data historis. Koordinator kemudian mendistribusikan segmen tersegel secara merata ke semua Query Node, menyeimbangkan penggunaan memori, overhead CPU, dan jumlah segmen, dan melepaskan segmen yang berlebihan.</p>
<h2 id="Whats-next" class="common-anchor-header">Apa selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Pelajari tentang cara <a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">menggunakan basis data vektor Milvus untuk kueri waktu nyata</a>.</li>
<li>Mempelajari tentang <a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">penyisipan data dan persistensi data di Milvus</a>.</li>
<li>Mempelajari bagaimana <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">data diproses di Milvus</a>.</li>
</ul>
