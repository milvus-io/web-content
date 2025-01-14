---
id: time_sync.md
title: Sinkronisasi Waktu
summary: Pelajari tentang sistem sinkronisasi waktu di Milvus.
---
<h1 id="Time-Synchronization" class="common-anchor-header">Sinkronisasi Waktu<button data-href="#Time-Synchronization" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini memperkenalkan mekanisme sinkronisasi waktu di Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Kejadian-kejadian dalam Milvus secara umum dapat dikategorikan ke dalam dua jenis:</p>
<ul>
<li><p>Peristiwa bahasa definisi data (DDL): membuat/menghapus koleksi, membuat/menghapus partisi, dsb.</p></li>
<li><p>Peristiwa bahasa manipulasi data (DML): menyisipkan, mencari, dll.</p></li>
</ul>
<p>Setiap kejadian, baik kejadian DDL maupun DML, ditandai dengan stempel waktu yang dapat mengindikasikan kapan kejadian tersebut terjadi.</p>
<p>Misalkan ada dua pengguna yang memulai serangkaian kejadian DML dan DDL di Milvus dengan urutan waktu yang ditunjukkan pada tabel berikut.</p>
<table>
<thead>
<tr><th style="text-align:center">Stempel waktu</th><th style="text-align:center">Pengguna 1</th><th style="text-align:center">Pengguna 2</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">t0</td><td style="text-align:center">Membuat koleksi bernama <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t2</td><td style="text-align:center">/</td><td style="text-align:center">Melakukan pencarian pada koleksi <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t5</td><td style="text-align:center">Memasukkan data <code translate="no">A1</code> ke dalam koleksi <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t7</td><td style="text-align:center">/</td><td style="text-align:center">Melakukan pencarian pada koleksi <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t10</td><td style="text-align:center">Memasukkan data <code translate="no">A2</code> ke dalam koleksi <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t12</td><td style="text-align:center">/</td><td style="text-align:center">Melakukan pencarian pada koleksi <code translate="no">C0</code></td></tr>
<tr><td style="text-align:center">t15</td><td style="text-align:center">Menghapus data <code translate="no">A1</code> dari koleksi <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t17</td><td style="text-align:center">/</td><td style="text-align:center">Melakukan pencarian pada koleksi <code translate="no">C0</code></td></tr>
</tbody>
</table>
<p>Idealnya, pengguna 2 harus dapat melihat:</p>
<ul>
<li><p>Koleksi kosong <code translate="no">C0</code> di <code translate="no">t2</code>.</p></li>
<li><p>Data <code translate="no">A1</code> di <code translate="no">t7</code>.</p></li>
<li><p>Kedua data <code translate="no">A1</code> dan <code translate="no">A2</code> di <code translate="no">t12</code>.</p></li>
<li><p>Hanya data <code translate="no">A2</code> di <code translate="no">t17</code> (karena data <code translate="no">A1</code> telah dihapus dari koleksi sebelum titik ini).</p></li>
</ul>
<p>Skenario ideal ini dapat dengan mudah dicapai ketika hanya ada satu simpul tunggal. Namun, Milvus adalah basis data vektor terdistribusi, dan untuk memastikan semua operasi DML dan DDL pada node yang berbeda tetap teratur, Milvus perlu mengatasi dua masalah berikut:</p>
<ol>
<li><p>Jam waktu berbeda untuk dua pengguna pada contoh di atas jika mereka berada pada node yang berbeda. Sebagai contoh, jika pengguna 2 24 jam di belakang pengguna 1, semua operasi oleh pengguna 1 tidak terlihat oleh pengguna 2 sampai hari berikutnya.</p></li>
<li><p>Mungkin ada latensi jaringan. Jika pengguna 2 melakukan pencarian pada koleksi <code translate="no">C0</code> di <code translate="no">t17</code>, Milvus harus dapat menjamin bahwa semua operasi sebelum <code translate="no">t17</code> berhasil diproses dan diselesaikan. Jika operasi hapus di <code translate="no">t15</code> tertunda karena latensi jaringan, sangat mungkin pengguna 2 masih dapat melihat data yang seharusnya dihapus <code translate="no">A1</code> ketika melakukan pencarian di <code translate="no">t17</code>.</p></li>
</ol>
<p>Oleh karena itu, Milvus mengadopsi sistem sinkronisasi waktu (timetick) untuk mengatasi masalah ini.</p>
<h2 id="Timestamp-oracle-TSO" class="common-anchor-header">Timestamp oracle (TSO)<button data-href="#Timestamp-oracle-TSO" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk mengatasi masalah pertama yang disebutkan di bagian sebelumnya, Milvus, seperti sistem terdistribusi lainnya, menyediakan layanan timestamp oracle (TSO). Ini berarti bahwa semua kejadian di Milvus harus dialokasikan dengan cap waktu dari TSO dan bukan dari jam lokal.</p>
<p>Layanan TSO disediakan oleh koordinator root di Milvus. Klien dapat mengalokasikan satu atau beberapa stempel waktu dalam satu permintaan alokasi stempel waktu.</p>
<p>Stempel waktu TSO adalah jenis nilai <code translate="no">uint64</code> yang terdiri dari bagian fisik dan bagian logis. Gambar di bawah ini menunjukkan format stempel waktu.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/TSO_Timestamp.png" alt="TSO_Timestamp" class="doc-image" id="tso_timestamp" />
   </span> <span class="img-wrapper"> <span>TSO_Timestamp</span>. </span></p>
<p>Seperti yang diilustrasikan, 46 bit di awal adalah bagian fisik, yaitu waktu UTC dalam milidetik. 18 bit terakhir adalah bagian logis.</p>
<h2 id="Time-synchronization-system-timetick" class="common-anchor-header">Sistem sinkronisasi waktu (timetick)<button data-href="#Time-synchronization-system-timetick" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagian ini menggunakan contoh operasi penyisipan data untuk menjelaskan mekanisme sinkronisasi waktu dalam Milvus.</p>
<p>Ketika proxy menerima permintaan penyisipan data dari SDK, proxy membagi pesan-pesan penyisipan ke dalam beberapa aliran pesan (<code translate="no">MsgStream</code>) sesuai dengan nilai hash dari kunci utama.</p>
<p>Setiap pesan penyisipan (<code translate="no">InsertMsg</code>) diberi stempel waktu sebelum dikirim ke <code translate="no">MsgStream</code>.</p>
<div class="alert note">
  <code translate="no">MsgStream</code> adalah pembungkus dari antrian pesan, yang secara default adalah Pulsar di Milvus 2.0.</div>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/timesync_proxy_insert_msg.png" alt="timesync_proxy_insert_msg" class="doc-image" id="timesync_proxy_insert_msg" />
   </span> <span class="img-wrapper"> <span>timesync_proxy_insert_msg</span> </span></p>
<p>Satu prinsip umum adalah bahwa dalam <code translate="no">MsgStream</code>, penanda waktu dari<code translate="no">InsertMsgs</code> dari proxy yang sama harus bersifat inkremental. Namun, tidak ada aturan seperti itu untuk <code translate="no">InsertMsgs</code> dari proxy yang berbeda.</p>
<p>Gambar berikut ini adalah contoh <code translate="no">InsertMsgs</code> dalam <code translate="no">MsgStream</code>. Cuplikan ini berisi lima <code translate="no">InsertMsgs</code>, tiga di antaranya berasal dari <code translate="no">Proxy1</code> dan sisanya dari <code translate="no">Proxy2</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/msgstream.png" alt="msgstream" class="doc-image" id="msgstream" />
   </span> <span class="img-wrapper"> <span>msgstream</span> </span></p>
<p>Stempel waktu dari tiga <code translate="no">InsertMsgs</code> dari <code translate="no">Proxy1</code> bersifat inkremental, begitu juga dengan dua <code translate="no">InsertMsgs</code> dari <code translate="no">Proxy2</code>. Namun, tidak ada urutan tertentu di antara <code translate="no">Proxy1</code> dan <code translate="no">Proxy2</code> <code translate="no">InsertMsgs</code> .</p>
<p>Salah satu skenario yang mungkin terjadi adalah ketika membaca pesan dengan timestamp <code translate="no">110</code> dari <code translate="no">Proxy2</code>, Milvus menemukan bahwa pesan dengan timestamp <code translate="no">80</code> dari <code translate="no">Proxy1</code> masih berada di dalam <code translate="no">MsgStream</code>. Oleh karena itu, Milvus memperkenalkan sistem sinkronisasi waktu, timetick, untuk memastikan bahwa ketika membaca pesan dari <code translate="no">MsgStream</code>, semua pesan dengan nilai timestamp yang lebih kecil harus dikonsumsi.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/time_synchronization.png" alt="time_synchronization" class="doc-image" id="time_synchronization" />
   </span> <span class="img-wrapper"> <span>time_synchronization</span> </span></p>
<p>Seperti yang ditunjukkan pada gambar di atas,</p>
<ul>
<li><p>Setiap proxy secara berkala (setiap 200 ms secara default) melaporkan nilai cap waktu terbesar dari <code translate="no">InsertMsg</code> terbaru di <code translate="no">MsgStream</code>ke root coord.</p></li>
<li><p>Root coord mengidentifikasi nilai stempel waktu minimum pada <code translate="no">Msgstream</code> ini, tidak peduli pada proxy mana <code translate="no">InsertMsgs</code> itu berada. Kemudian root coord menyisipkan stempel waktu minimum ini ke dalam <code translate="no">Msgstream</code>. Stempel waktu ini juga disebut timetick.</p></li>
<li><p>Ketika komponen konsumen membaca timetick yang disisipkan oleh root coord, mereka memahami bahwa semua pesan sisipan dengan nilai timestamp yang lebih kecil telah dikonsumsi. Oleh karena itu, permintaan yang relevan dapat dieksekusi dengan aman tanpa mengganggu pesanan.</p></li>
</ul>
<p>Gambar berikut ini adalah contoh dari <code translate="no">Msgstream</code> dengan timetick yang disisipkan.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/timetick.png" alt="timetick" class="doc-image" id="timetick" />
   </span> <span class="img-wrapper"> <span>timetick</span> </span></p>
<p><code translate="no">MsgStream</code> memproses pesan dalam batch sesuai dengan tanda waktu untuk memastikan bahwa pesan keluaran memenuhi persyaratan cap waktu. Pada contoh di atas, ini akan mengkonsumsi semua catatan kecuali <code translate="no">InsertMsgs</code> dari <code translate="no">Proxy2</code> di <code translate="no">Timestamp: 120</code> karena ini adalah setelah TimeTick terbaru.</p>
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
<li>Pelajari tentang konsep <a href="/docs/id/timestamp.md">stempel waktu</a>.</li>
<li>Pelajari tentang <a href="/docs/id/data_processing.md">alur kerja pemrosesan data</a> di Milvus.</li>
</ul>
