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
    </button></h2><p>Anda dapat menentukan sejumlah pecahan untuk setiap koleksi di Milvus, setiap pecahan berhubungan dengan sebuah saluran virtual<em>(vchannel</em>)<em>.</em> Seperti yang ditunjukkan pada gambar berikut, Milvus memberikan setiap vchannel pada log broker sebuah saluran fisik<em>(pchannel</em>). Setiap permintaan sisipkan/hapus yang masuk dirutekan ke shard berdasarkan nilai hash dari kunci utama.</p>
<p>Validasi permintaan DML diteruskan ke proxy karena Milvus tidak memiliki transaksi yang rumit. Proxy akan meminta timestamp untuk setiap permintaan insert/delete dari TSO (Timestamp Oracle), yang merupakan modul waktu yang berada di bawah koordinator root. Dengan cap waktu yang lebih lama ditimpa oleh cap waktu yang lebih baru, cap waktu digunakan untuk menentukan urutan permintaan data yang sedang diproses. Proxy mengambil informasi dalam batch dari koordinator data termasuk segmen entitas dan kunci utama untuk meningkatkan throughput secara keseluruhan dan menghindari pembebanan yang berlebihan pada simpul pusat.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/channels_1.jpg" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>Saluran 1</span> </span></p>
<p>Operasi DML (bahasa manipulasi data) dan operasi DDL (bahasa definisi data) ditulis ke urutan log, tetapi operasi DDL hanya diberi satu saluran karena frekuensi kemunculannya yang rendah.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/channels_2.jpg" alt="Channels 2" class="doc-image" id="channels-2" />
   </span> <span class="img-wrapper"> <span>Saluran 2</span> </span></p>
<p><em>Vchannels</em> dipertahankan di node broker log yang mendasarinya. Setiap saluran secara fisik tidak dapat dibagi dan tersedia untuk semua tetapi hanya satu node. Ketika tingkat konsumsi data mencapai kemacetan, pertimbangkan dua hal: Apakah node log broker kelebihan beban dan perlu diskalakan, dan apakah ada pecahan yang cukup untuk memastikan keseimbangan beban untuk setiap node.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/write_log_sequence.jpg" alt="Write log sequence" class="doc-image" id="write-log-sequence" />
   </span> <span class="img-wrapper"> <span>Tulis urutan log</span> </span></p>
<p>Diagram di atas merangkum empat komponen yang terlibat dalam proses penulisan urutan log: proksi, log broker, simpul data, dan penyimpanan objek. Proses ini melibatkan empat tugas: validasi permintaan DML, publikasi-langganan urutan log, konversi dari log streaming ke snapshot log, dan persistensi snapshot log. Keempat tugas tersebut dipisahkan satu sama lain untuk memastikan setiap tugas ditangani oleh jenis node yang sesuai. Node dengan tipe yang sama dibuat sama dan dapat diskalakan secara elastis dan independen untuk mengakomodasi berbagai beban data, khususnya data streaming yang sangat besar dan sangat berfluktuasi.</p>
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
    </button></h2><p>Pembangunan indeks dilakukan oleh simpul indeks. Untuk menghindari pembangunan indeks yang sering untuk pembaruan data, koleksi di Milvus dibagi lebih lanjut menjadi beberapa segmen, masing-masing dengan indeksnya sendiri.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/index_building.jpg" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>Pembuatan indeks</span> </span></p>
<p>Milvus mendukung pembangunan indeks untuk setiap bidang vektor, bidang skalar, dan bidang primer. Baik input maupun output dari pembangunan indeks berhubungan dengan penyimpanan objek: Node indeks memuat snapshot log untuk diindeks dari sebuah segmen (yang ada di penyimpanan objek) ke memori, mendeserialisasi data dan metadata yang sesuai untuk membangun indeks, menserialisasi indeks ketika pembangunan indeks selesai, dan menuliskannya kembali ke penyimpanan objek.</p>
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>Permintaan data</span> </span></p>
<p>Koleksi di Milvus dibagi menjadi beberapa segmen, dan simpul kueri memuat indeks per segmen. Ketika permintaan pencarian tiba, permintaan tersebut disiarkan ke semua node kueri untuk pencarian bersamaan. Setiap node kemudian memangkas segmen lokal, mencari vektor yang memenuhi kriteria, dan mengurangi dan mengembalikan hasil pencarian.</p>
<p>Node kueri tidak bergantung satu sama lain dalam kueri data. Setiap node hanya bertanggung jawab untuk dua tugas: Memuat atau melepaskan segmen mengikuti instruksi dari query coord; melakukan pencarian di dalam segmen lokal. Dan proxy bertanggung jawab untuk mengurangi hasil pencarian dari setiap node kueri dan mengembalikan hasil akhir ke klien.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/handoff.jpg" alt="Handoff" class="doc-image" id="handoff" />
    Serah terima </span></p>
<p>Ada dua jenis segmen, segmen yang berkembang (untuk data tambahan), dan segmen tertutup (untuk data historis). Node kueri berlangganan ke vchannel untuk menerima pembaruan terbaru (data tambahan) sebagai segmen yang berkembang. Ketika segmen yang berkembang mencapai ambang batas yang telah ditentukan, koordinat data menyegelnya dan pembangunan indeks dimulai. Kemudian operasi <em>handoff</em> yang diprakarsai oleh query coord mengubah data tambahan menjadi data historis. Query coord akan mendistribusikan segmen yang disegel secara merata di antara semua node kueri sesuai dengan penggunaan memori, overhead CPU, dan nomor segmen.</p>
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
<li>Mempelajari bagaimana <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">data diproses dalam Milvus</a>.</li>
</ul>
