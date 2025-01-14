---
id: bitset.md
summary: Pelajari tentang bitset di Milvus.
title: Bitset
---
<h1 id="Bitset" class="common-anchor-header">Bitset<button data-href="#Bitset" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini memperkenalkan mekanisme bitset yang membantu mengaktifkan fungsi-fungsi utama seperti pemfilteran atribut dan <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">operasi hapus</a> di Milvus.</p>
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
    </button></h2><p>Bitset adalah sekumpulan bit. Bit adalah elemen dengan hanya dua nilai yang mungkin, biasanya <code translate="no">0</code> dan <code translate="no">1</code>, atau nilai boolean <code translate="no">true</code> dan <code translate="no">false</code>. Dalam Milvus, bitset adalah array dari angka bit <code translate="no">0</code> dan <code translate="no">1</code> yang dapat digunakan untuk merepresentasikan data tertentu secara ringkas dan efisien dibandingkan dengan ints, float, atau char. Nomor bit adalah <code translate="no">0</code> secara default dan hanya diatur ke <code translate="no">1</code> jika memenuhi persyaratan tertentu.</p>
<p>Operasi pada bit-bit dilakukan dengan <a href="/docs/id/boolean.md">logika boolean</a>, di mana nilai keluarannya valid atau tidak valid, yang juga dilambangkan dengan <code translate="no">1</code> dan <code translate="no">0</code>. Sebagai contoh, <a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">operator logika</a> <code translate="no">AND</code> dapat digunakan untuk membandingkan dua bitset berdasarkan item pada posisi indeks yang sama dan menghasilkan bitset baru dengan hasilnya. Jika dua item dalam sebuah posisi adalah sama, maka dalam bitset baru <code translate="no">1</code> akan dituliskan pada posisi tersebut; <code translate="no">0</code> jika berbeda.</p>
<h2 id="Implementation" class="common-anchor-header">Implementasi<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Bitset adalah mekanisme yang sederhana namun kuat yang membantu Milvus melakukan pemfilteran atribut, penghapusan data, dan kueri dengan Time Travel.</p>
<h3 id="Attribute-filtering" class="common-anchor-header">Pemfilteran atribut</h3><p>Karena bitset hanya berisi dua nilai yang mungkin, maka bitset sangat cocok untuk menyimpan hasil <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">penyaringan atribut</a>. Data yang memenuhi persyaratan filter atribut yang diberikan ditandai dengan <code translate="no">1</code>.</p>
<h3 id="Data-deletion" class="common-anchor-header">Penghapusan data</h3><p>Bitset berfungsi sebagai cara yang ringkas untuk menyimpan informasi tentang apakah sebuah baris dalam segmen telah dihapus. Entitas yang dihapus ditandai dengan <code translate="no">1</code> dalam bitset yang sesuai, yang <a href="https://milvus.io/blog/deleting-data-in-milvus.md">tidak akan dikomputasi</a> selama pencarian atau kueri.</p>
<h2 id="Examples" class="common-anchor-header">Contoh<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Di sini kami menyajikan tiga contoh yang mengilustrasikan bagaimana bitset digunakan di Milvus, dengan referensi ke ketiga implementasi utama bitset yang telah dibahas di atas. Pada ketiga kasus tersebut, terdapat sebuah segmen dengan 8 entitas dan kemudian serangkaian peristiwa bahasa manipulasi data (DML) terjadi dengan urutan seperti yang ditunjukkan di bawah ini.</p>
<ul>
<li>Empat dari entitas, yang <code translate="no">primary_key</code>nya masing-masing adalah [1, 2, 3, 4], disisipkan ketika cap waktu <code translate="no">ts</code> sama dengan 100.</li>
<li>Empat entitas lainnya, yang <code translate="no">primary_key</code>nya adalah [5, 6, 7, 8], disisipkan ketika timestamp <code translate="no">ts</code> sama dengan 200.</li>
<li>Entitas yang <code translate="no">primary_key</code>-nya [7, 8] dihapus ketika timestamp <code translate="no">ts</code> sama dengan 300.</li>
<li>Hanya entitas yang <code translate="no">primary_key</code>nya [1, 3, 5, 7] yang memenuhi syarat pemfilteran atribut.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" />
   </span> <span class="img-wrapper"> <span>Urutan peristiwa DML</span> </span></p>
<h3 id="Case-one" class="common-anchor-header">Kasus pertama</h3><p>Dalam kasus ini, seorang pengguna menetapkan <code translate="no">time_travel</code> sebagai 150, yang berarti bahwa pengguna melakukan kueri pada data yang memenuhi <code translate="no">ts = 150</code>. Proses pembangkitan bitset diilustrasikan oleh Gambar 1.</p>
<p>Pada tahap penyaringan awal, <code translate="no">filter_bitset</code> seharusnya adalah <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>, di mana entitas [1, 3, 5, 7] ditandai sebagai <code translate="no">1</code> karena merupakan hasil penyaringan yang valid.</p>
<p>Namun, entitas [4, 5, 6, 7] tidak dimasukkan ke dalam basis data vektor ketika <code translate="no">ts</code> sama dengan 150. Oleh karena itu, keempat entitas ini harus ditandai sebagai 0 terlepas dari kondisi pemfilteran. Sekarang hasil bitset seharusnya menjadi <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code>.</p>
<p>Seperti yang telah dibahas di <a href="#data-deletion">Penghapusan data</a>, entitas yang ditandai dengan <code translate="no">1</code> akan diabaikan selama pencarian atau kueri. Hasil bitset sekarang perlu dibalik agar dapat digabungkan dengan bitmap penghapusan, yang memberi kita <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>.</p>
<p>Sedangkan untuk bitmap penghapusan <code translate="no">del_bitset</code>, nilai awal seharusnya adalah <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Namun, entitas 7 dan 8 tidak akan dihapus sampai <code translate="no">ts</code> bernilai 300. Oleh karena itu, ketika <code translate="no">ts</code> bernilai 150, entitas 7 dan 8 masih valid. Hasilnya, nilai <code translate="no">del_bitset</code> setelah Perjalanan Waktu adalah <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Sekarang kita memiliki dua bitset setelah Perjalanan Waktu dan pemfilteran atribut: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> dan <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> .  Gabungkan kedua bitset ini dengan operator logika biner <code translate="no">OR</code>. Nilai akhir dari result_bitset adalah <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>, yang berarti hanya entitas 1 dan 3 yang akan dikomputasi pada tahap pencarian atau kueri berikutnya.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.5.x/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." />
   <span>Gambar 1. Pencarian dengan Time Travel = 150</span>. </span></p>
<h3 id="Case-two" class="common-anchor-header">Kasus kedua</h3><p>Pada kasus ini, pengguna menetapkan <code translate="no">time_travel</code> sebagai 250. Proses pembangkitan bitset diilustrasikan oleh Gambar 2.</p>
<p>Seperti pada kasus pertama, <code translate="no">filter_bitset</code> awal adalah <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>.</p>
<p>Semua entitas ada di dalam basis data vektor ketika <code translate="no">ts</code> = 250. Oleh karena itu, <code translate="no">filter_bitset</code> tetap sama ketika kita memperhitungkan cap waktu. Sekali lagi, kita perlu membalik hasilnya dan mendapatkan <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Sedangkan untuk penghapusan bitset <code translate="no">del_bitset</code>, nilai awalnya adalah <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Namun, entitas 7 dan 8 tidak dihapus sampai <code translate="no">ts</code> bernilai 300. Oleh karena itu, ketika <code translate="no">ts</code> bernilai 250, entitas 7 dan 8 masih valid. Hasilnya, <code translate="no">del_bitset</code> setelah Perjalanan Waktu adalah <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Sekarang kita memiliki dua bitset setelah Perjalanan Waktu dan pemfilteran atribut: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> dan <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . Gabungkan kedua bitset ini dengan operator logika biner <code translate="no">OR</code>. Hasil_bitset adalah <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>. Dengan kata lain, hanya entit [1, 3, 5, 7] yang akan dikomputasi pada tahap pencarian atau kueri berikutnya.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.5.x/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." />
   <span>Gambar 2. Pencarian dengan Time Travel = 250</span>. </span></p>
<h3 id="Case-three" class="common-anchor-header">Kasus tiga</h3><p>Pada kasus ini, pengguna menetapkan <code translate="no">time_travel</code> sebagai 350. Proses pembangkitan bitset diilustrasikan oleh Gambar 3.</p>
<p>Seperti kasus-kasus sebelumnya, <code translate="no">filter_bitset</code> awal adalah <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Semua entitas ada di dalam basis data vektor ketika <code translate="no">ts</code>= 350. Oleh karena itu, <code translate="no">filter_bitset</code> akhir yang telah dibalik adalah <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>, sama seperti pada kasus kedua.</p>
<p>Sedangkan untuk bitset penghapusan <code translate="no">del_bitset</code>, karena entitas 7 dan 8 telah dihapus ketika <code translate="no">ts = 350</code>, oleh karena itu, hasil dari <code translate="no">del_bitset</code> adalah <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>.</p>
<p>Sekarang kita memiliki dua bitset setelah Perjalanan Waktu dan pemfilteran atribut: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> dan <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> .  Gabungkan kedua bitset ini dengan operator logika biner <code translate="no">OR</code>. <code translate="no">result_bitset</code> yang terakhir adalah <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code>. Dengan kata lain, hanya entitas [1, 3, 5] yang akan dikomputasi pada tahap pencarian atau kueri berikut ini.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.5.x/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." />
   <span>Gambar 3. Pencarian dengan Perjalanan Waktu = 350</span>. </span></p>
<h2 id="Whats-next" class="common-anchor-header">Apa yang selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Sekarang Anda sudah mengetahui bagaimana cara kerja bitset di Milvus, Anda mungkin juga ingin melakukannya:</p>
<ul>
<li>Mempelajari cara <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">menggunakan string untuk memfilter</a> hasil pencarian Anda, atau lihat <a href="https://milvus.io/docs/hybridsearch.md">Pencarian Hibrida</a> di dokumen kami.</li>
<li>Memahami <a href="https://milvus.io/docs/v2.1.x/data_processing.md">bagaimana data diproses</a> di Milvus.</li>
</ul>
