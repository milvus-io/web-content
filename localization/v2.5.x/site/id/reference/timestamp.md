---
id: timestamp.md
title: Stempel waktu di Milvus
summary: >-
  Pelajari tentang konsep cap waktu dan empat parameter utama terkait cap waktu
  dalam basis data vektor Milvus.
---
<h1 id="Timestamp" class="common-anchor-header">Cap waktu<button data-href="#Timestamp" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini menjelaskan konsep cap waktu dan memperkenalkan empat parameter utama terkait cap waktu dalam basis data vektor Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Ikhtisar<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus adalah basis data vektor yang dapat mencari dan menanyakan vektor yang dikonversi dari data yang tidak terstruktur. Ketika melakukan operasi bahasa manipulasi data (DML), termasuk <a href="https://milvus.io/docs/v2.1.x/data_processing.md">penyisipan dan penghapusan data</a>, Milvus memberikan stempel waktu ke entitas yang terlibat dalam operasi. Oleh karena itu, semua entitas di Milvus memiliki atribut stempel waktu. Dan kumpulan entitas dalam operasi DML yang sama memiliki nilai stempel waktu yang sama.</p>
<h2 id="Timestamp-parameters" class="common-anchor-header">Parameter stempel waktu<button data-href="#Timestamp-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Beberapa parameter terkait cap waktu dilibatkan ketika Anda melakukan pencarian atau kueri kemiripan vektor di Milvus.</p>
<ul>
<li><p><code translate="no">Guarantee_timestamp</code></p></li>
<li><p><code translate="no">Service_timestamp</code></p></li>
<li><p><code translate="no">Graceful_time</code></p></li>
<li><p><code translate="no">Travel_timestamp</code></p></li>
</ul>
<h3 id="Guaranteetimestamp" class="common-anchor-header"><code translate="no">Guarantee_timestamp</code></h3><p><code translate="no">Guarantee_timestamp</code> adalah jenis cap waktu yang digunakan untuk memastikan bahwa semua pembaruan data oleh operasi DML sebelum <code translate="no">Guarantee_timestamp</code> terlihat ketika pencarian atau kueri kemiripan vektor dilakukan. Sebagai contoh, jika Anda memasukkan satu kumpulan data pada pukul 3 sore, kumpulan data lainnya pada pukul 5 sore, dan nilai <code translate="no">Guarantee_timestamp</code> ditetapkan sebagai pukul 6 sore saat pencarian kemiripan vektor. Ini berarti bahwa dua kumpulan data yang dimasukkan pada pukul 3 sore dan 5 sore harus dilibatkan dalam pencarian.</p>
<p>Jika <code translate="no">Guarantee_timestamp</code> tidak dikonfigurasi, Milvus secara otomatis mengambil titik waktu ketika permintaan pencarian dibuat. Oleh karena itu, pencarian dilakukan pada tampilan data dengan semua pembaruan data oleh operasi DML sebelum pencarian.</p>
<p>Untuk menghemat waktu Anda dalam memahami <a href="https://github.com/milvus-io/milvus/blob/master/docs/design_docs/20211214-milvus_hybrid_ts.md">TSO</a> di dalam Milvus, sebagai pengguna, Anda tidak perlu mengkonfigurasi secara langsung parameter <code translate="no">Guarantee_timestamp</code>. Anda hanya perlu memilih <a href="https://milvus.io/docs/v2.1.x/consistency.md">tingkat konsistensi</a>, dan Milvus secara otomatis menangani parameter <code translate="no">Guarantee_timestamp</code> untuk Anda. Setiap tingkat konsistensi sesuai dengan nilai <code translate="no">Guarantee_timestamp</code> tertentu.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/Guarantee_Timestamp.png" alt="Guarantee_Timestamp" class="doc-image" id="guarantee_timestamp" />
   </span> <span class="img-wrapper"> <span>Guarantee_Timestamp</span>. </span></p>
<h4 id="Example" class="common-anchor-header">Contoh</h4><p>Seperti yang ditunjukkan pada ilustrasi di atas, nilai <code translate="no">Guarantee_timestamp</code> ditetapkan sebagai <code translate="no">2021-08-26T18:15:00</code> (untuk mempermudah, stempel waktu pada contoh ini diwakili oleh waktu fisik). Saat Anda melakukan pencarian atau kueri, semua data sebelum 2021-08-26T18:15:00 akan dicari atau ditanyakan.</p>
<h3 id="Servicetimestamp" class="common-anchor-header"><code translate="no">Service_timestamp</code></h3><p><code translate="no">Service_timestamp</code> adalah jenis stempel waktu yang secara otomatis dibuat dan dikelola oleh node kueri di Milvus. Ini digunakan untuk menunjukkan operasi DML mana yang dijalankan oleh node kueri.</p>
<p>Data yang dikelola oleh node kueri dapat dikategorikan ke dalam dua jenis:</p>
<ul>
<li><p>Data historis (atau juga disebut data batch)</p></li>
<li><p>Data tambahan (atau disebut juga data streaming).</p></li>
</ul>
<p>Di Milvus, Anda perlu memuat data sebelum melakukan pencarian atau kueri. Oleh karena itu, data batch dalam koleksi dimuat oleh simpul kueri sebelum permintaan pencarian atau kueri dibuat. Namun, data streaming dimasukkan ke dalam atau dihapus dari Milvus dengan cepat, yang mengharuskan simpul kueri untuk menyimpan garis waktu operasi DML dan permintaan pencarian atau kueri. Akibatnya, node kueri menggunakan <code translate="no">Service_timestamp</code> untuk menyimpan garis waktu tersebut. <code translate="no">Service_timestamp</code> dapat dilihat sebagai titik waktu ketika data tertentu terlihat karena node kueri dapat memastikan bahwa semua operasi DML sebelum <code translate="no">Service_timestamp</code> telah selesai.</p>
<p>Ketika ada permintaan pencarian atau kueri yang masuk, node kueri membandingkan nilai <code translate="no">Service_timestamp</code> dan <code translate="no">Guarantee_timestamp</code>. Terutama ada dua skenario.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/Service_Timestamp.png" alt="Service_Timestamp" class="doc-image" id="service_timestamp" />
   </span> <span class="img-wrapper"> <span>Stempel Waktu Layanan</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">Skenario 1: <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>Seperti yang ditunjukkan pada gambar 1, nilai <code translate="no">Guarantee_timestamp</code> ditetapkan sebagai <code translate="no">2021-08-26T18:15:00</code>. Ketika nilai <code translate="no">Service_timestamp</code> bertambah menjadi <code translate="no">2021-08-26T18:15:01</code>, ini berarti bahwa semua operasi DML sebelum titik waktu ini dieksekusi dan diselesaikan oleh node kueri, termasuk operasi DML sebelum waktu yang ditunjukkan oleh <code translate="no">Guarantee_timestamp</code>. Hasilnya, permintaan pencarian atau permintaan kueri dapat dieksekusi dengan segera.</p>
<h4 id="Scenario-2-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">Skenario 2: <code translate="no">Service_timestamp</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>Seperti yang ditunjukkan pada gambar 2, nilai <code translate="no">Guarantee_timestamp</code> ditetapkan sebagai <code translate="no">2021-08-26T18:15:00</code>, dan nilai <code translate="no">Service_timestamp</code> saat ini hanya <code translate="no">2021-08-26T18:14:55</code>. Ini berarti bahwa hanya operasi DML sebelum <code translate="no">2021-08-26T18:14:55</code> yang dieksekusi dan diselesaikan, meninggalkan bagian dari operasi DML setelah titik waktu ini tetapi sebelum <code translate="no">Guarantee_timestamp</code> yang belum selesai. Jika pencarian atau kueri dieksekusi pada titik ini, beberapa data yang diperlukan tidak terlihat dan belum tersedia, yang secara serius memengaruhi keakuratan hasil pencarian atau kueri. Oleh karena itu, simpul kueri perlu menunda permintaan pencarian atau kueri hingga operasi DML sebelum <code translate="no">guarantee_timestamp</code> selesai (yaitu ketika <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code>).</p>
<h3 id="Gracefultime" class="common-anchor-header"><code translate="no">Graceful_time</code></h3><p>Secara teknis, <code translate="no">Graceful_time</code> bukanlah cap waktu, melainkan periode waktu (misalnya 100ms). Namun, <code translate="no">Graceful_time</code> layak disebut karena sangat terkait dengan <code translate="no">Guarantee_timestamp</code> dan <code translate="no">Service_timestamp</code>. <code translate="no">Graceful_time</code> adalah parameter yang dapat dikonfigurasi dalam file konfigurasi Milvus. Parameter ini digunakan untuk menunjukkan periode waktu yang dapat ditoleransi sebelum data tertentu terlihat. Singkatnya, operasi DML yang belum selesai selama <code translate="no">Graceful_time</code> dapat ditoleransi.</p>
<p>Ketika ada permintaan pencarian atau permintaan kueri yang masuk, ada dua skenario.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/Graceful_Time.png" alt="Graceful_Time" class="doc-image" id="graceful_time" />
   </span> <span class="img-wrapper"> <span>Graceful_Time</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">Skenario 1: <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>Seperti yang ditunjukkan pada gambar 1, nilai <code translate="no">Guarantee_timestamp</code> ditetapkan sebagai <code translate="no">2021-08-26T18:15:01</code>, dan <code translate="no">Graceful_time</code> sebagai <code translate="no">2s</code>. Nilai <code translate="no">Service_timestamp</code> bertambah menjadi <code translate="no">2021-08-26T18:15:00</code>. Meskipun nilai <code translate="no">Service_timestamp</code> masih lebih kecil daripada <code translate="no">Guarantee_timestamp</code> dan tidak semua operasi DML sebelum <code translate="no">2021-08-26T18:15:01</code> selesai, periode ketidaktampakan data selama 2 detik masih dapat ditoleransi seperti yang ditunjukkan oleh nilai <code translate="no">Graceful_time</code>. Oleh karena itu, permintaan pencarian atau permintaan kueri yang masuk dapat segera dieksekusi.</p>
<h4 id="Scenario-2-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">Skenario 2: <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>Seperti yang ditunjukkan pada gambar 2, nilai <code translate="no">Guarantee_timestamp</code> ditetapkan sebagai <code translate="no">2021-08-26T18:15:01</code>, dan <code translate="no">Graceful_time</code> sebagai <code translate="no">2s</code>. Nilai saat ini dari <code translate="no">Service_timestamp</code> hanya <code translate="no">2021-08-26T18:14:54</code>. Ini berarti bahwa operasi DML yang diharapkan belum selesai dan bahkan dengan adanya waktu tenggang 2 detik, ketidaktampakan data masih tidak dapat ditoleransi. Oleh karena itu, simpul kueri perlu menunda pencarian atau permintaan kueri hingga permintaan DML tertentu selesai (yaitu ketika <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code>).</p>
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
<li>Pelajari bagaimana <a href="/docs/id/consistency.md">cap waktu jaminan memungkinkan konsistensi yang dapat disetel di Milvus</a></li>
</ul>
