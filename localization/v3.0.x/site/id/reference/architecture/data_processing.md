---
id: data_processing.md
summary: Pelajari tentang prosedur pemrosesan data di Milvus.
title: Pemrosesan Data
---
<h1 id="Data-Processing" class="common-anchor-header">Pemrosesan Data<button data-href="#Data-Processing" class="anchor-icon" translate="no">
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
    </button></h1><p>Artikel ini memberikan penjelasan terperinci mengenai implementasi penyisipan data, pembuatan indeks, dan kueri data di Milvus.</p>
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
    </button></h2><p>Anda dapat memilih berapa banyak shard yang digunakan oleh sebuah koleksi di Milvus—setiap shard dipetakan ke sebuah saluran virtual (<em>vchannel</em>). Seperti yang digambarkan di bawah ini, Milvus kemudian menugaskan setiap <em>vchannel</em> ke saluran fisik (<em>pchannel</em>), dan setiap <em>pchannel</em> terikat pada Streaming Node tertentu.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/pvchannel_wal.png" alt="VChannel, PChannel, and Streaming Node" class="doc-image" id="vchannel,-pchannel,-and-streaming-node" /> 
   <span>VChannel, PChannel, dan Streaming Node</span>
  
 </span></p>
<p>Setelah verifikasi data, proxy akan membagi pesan yang ditulis menjadi berbagai paket data shard sesuai dengan aturan perutean shard yang ditentukan.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" /> 
   <span>Saluran 1</span>
  
 </span></p>
<p>Kemudian, data yang ditulis dari satu shard (<em>vchannel</em>) dikirim ke Streaming Node yang sesuai dengan <em>pchannel</em> tersebut.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" /> 
   <span>alur penulisan</span>
  
 </span></p>
<p>Streaming Node menetapkan Timestamp Oracle (TSO) ke setiap paket data untuk menetapkan urutan operasi secara keseluruhan. Streaming Node melakukan pemeriksaan konsistensi pada muatan sebelum menuliskannya ke dalam write-ahead log (WAL) yang mendasarinya. Setelah data dikomit secara permanen ke WAL, data tersebut dijamin tidak akan hilang—bahkan jika terjadi crash, Streaming Node dapat memutar ulang WAL untuk memulihkan sepenuhnya semua operasi yang tertunda.</p>
<p>Sementara itu, Streaming Node juga secara asinkron memotong entri WAL yang telah dikomit menjadi segmen-segmen terpisah. Ada dua jenis segmen:</p>
<ul>
<li><strong>Segmen yang terus bertambah</strong>: data apa pun yang belum disimpan ke penyimpanan objek.</li>
<li><strong>Segmen tertutup</strong>: semua data telah disimpan ke dalam penyimpanan objek, data segmen tertutup bersifat tidak dapat diubah.</li>
</ul>
<p>Transisi segmen yang sedang tumbuh menjadi segmen yang disegel disebut flush. Streaming Node memicu flush segera setelah ia telah mengimpor dan menulis semua entri WAL yang tersedia untuk segmen tersebut—yaitu, ketika tidak ada lagi catatan yang tertunda di log write-ahead yang mendasarinya—pada titik tersebut segmen tersebut diselesaikan dan dioptimalkan untuk pembacaan.</p>
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
    </button></h2><p>Pembuatan indeks dilakukan oleh data node. Untuk menghindari pembuatan indeks yang sering akibat pembaruan data, sebuah koleksi di Milvus dibagi lebih lanjut menjadi segmen-segmen, masing-masing dengan indeksnya sendiri.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" /> 
   <span>Pembuatan indeks</span>
  
 </span></p>
<p>Milvus mendukung pembuatan indeks untuk setiap bidang vektor, bidang skalar, dan bidang utama. Baik input maupun output dari pembentukan indeks melibatkan penyimpanan objek: Node data memuat snapshot log dari suatu segmen (yang berada di penyimpanan objek) ke memori untuk diindeks, mendeserialisasi data dan metadata yang sesuai untuk membangun indeks, menserialisasi indeks setelah pembentukan indeks selesai, dan menuliskannya kembali ke penyimpanan objek.</p>
<p>Pembuatan indeks terutama melibatkan operasi vektor dan matriks, sehingga membutuhkan komputasi dan memori yang intensif. Vektor tidak dapat diindeks secara efisien dengan indeks berbasis pohon tradisional karena sifatnya yang berdimensi tinggi, tetapi dapat diindeks dengan teknik yang lebih matang dalam bidang ini, seperti indeks berbasis klaster atau graf. Terlepas dari jenisnya, pembuatan indeks melibatkan perhitungan iteratif yang masif untuk vektor berskala besar, seperti K-means atau penelusuran graf.</p>
<p>Berbeda dengan pengindeksan data skalar, pembuatan indeks vektor harus memanfaatkan sepenuhnya akselerasi SIMD (single instruction, multiple data). Milvus memiliki dukungan bawaan untuk set instruksi SIMD, misalnya SSE, AVX2, dan AVX512. Mengingat adanya “kendala” dan sifat pembentukan indeks vektor yang sangat memakan sumber daya, elastisitas menjadi sangat penting bagi Milvus dari segi efisiensi biaya. Rilis Milvus di masa depan akan melakukan eksplorasi lebih lanjut dalam komputasi heterogen dan komputasi tanpa server untuk menekan biaya terkait.</p>
<p>Selain itu, Milvus juga mendukung penyaringan skalar dan kueri bidang utama. Milvus memiliki indeks bawaan untuk meningkatkan efisiensi kueri, misalnya indeks filter Bloom, indeks hash, indeks berbasis pohon, dan indeks terbalik, serta berencana untuk memperkenalkan lebih banyak indeks eksternal, misalnya indeks bitmap dan indeks kasar.</p>
<h2 id="Data-query" class="common-anchor-header">Kueri data<button data-href="#Data-query" class="anchor-icon" translate="no">
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
    </button></h2><p>Kueri data mengacu pada proses pencarian dalam kumpulan tertentu untuk menemukan <em>k</em> jumlah vektor terdekat dengan vektor target atau untuk <em>semua</em> vektor dalam rentang jarak tertentu dari vektor tersebut. Vektor dikembalikan bersama dengan kunci utama dan bidang yang sesuai.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" /> 
   <span>Kueri data</span>
  
 </span></p>
<p>Sebuah koleksi di Milvus dibagi menjadi beberapa segmen; Streaming Node memuat segmen yang sedang tumbuh dan memelihara data secara real-time, sedangkan Query Nodes memuat segmen yang telah disegel.</p>
<p>Saat permintaan kueri/pencarian masuk, proxy menyiarkan permintaan tersebut ke semua Streaming Node yang bertanggung jawab atas shard terkait untuk pencarian secara bersamaan.</p>
<p>Saat permintaan kueri tiba, proxy secara bersamaan meminta Node Streaming yang menyimpan shard terkait untuk menjalankan pencarian.</p>
<p>Setiap Streaming Node menghasilkan rencana kueri, mencari data lokal yang terus bertambah, dan secara bersamaan menghubungi Query Node jarak jauh untuk mengambil hasil historis, kemudian menggabungkannya menjadi satu hasil shard.</p>
<p>Terakhir, proxy mengumpulkan semua hasil shard, menggabungkannya menjadi hasil akhir, dan mengembalikannya ke klien.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" /> 
   <span>Serah</span> </span>Terima <span class="img-wrapper">
  
 </span></p>
<p>Ketika segmen yang terus bertambah pada Node Streaming dibuang ke segmen yang disegel—atau ketika Node Data menyelesaikan pemadatan—Koordinator memulai operasi handoff untuk mengubah data yang terus bertambah tersebut menjadi data historis. Koordinator kemudian mendistribusikan segmen yang disegel secara merata ke seluruh Node Kueri, menyeimbangkan penggunaan memori, beban CPU, dan jumlah segmen, serta melepaskan segmen yang berlebihan.</p>
<h2 id="Whats-next" class="common-anchor-header">Langkah Selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Pelajari cara <a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">menggunakan basis data vektor Milvus untuk kueri waktu nyata</a>.</li>
<li>Pelajari tentang <a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">penyisipan data dan penyimpanan data di Milvus</a>.</li>
<li>Pelajari bagaimana <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">data diproses di Milvus</a>.</li>
</ul>
