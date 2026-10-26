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
    </button></h1><p>Topik ini memperkenalkan mekanisme bitset yang mendukung fungsi-fungsi utama seperti penyaringan atribut dan <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">operasi penghapusan</a> di Milvus.</p>
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
    </button></h2><p>Bitset adalah kumpulan bit. Bit adalah elemen yang hanya memiliki dua nilai mungkin, umumnya berupa <code translate="no">0</code> dan <code translate="no">1</code>, atau nilai boolean <code translate="no">true</code> dan <code translate="no">false</code>. Di Milvus, bitset adalah array dari bilangan bit <code translate="no">0</code> dan <code translate="no">1</code> yang dapat digunakan untuk mewakili data tertentu secara ringkas dan efisien, berbeda dengan penggunaan int, float, atau char. Sebuah bilangan bit secara default ber <code translate="no">0</code>, dan hanya ditetapkan ke <code translate="no">1</code> jika memenuhi persyaratan tertentu.</p>
<p>Operasi pada bitset dilakukan dengan <a href="/docs/id/v2.6.x/boolean.md">logika boolean</a>, di mana nilai keluaran bisa valid atau tidak valid, yang masing-masing dilambangkan dengan <code translate="no">1</code> dan <code translate="no">0</code>. Misalnya, <a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">operator logika</a> <code translate="no">AND</code> dapat digunakan untuk membandingkan dua himpunan bit berdasarkan item pada posisi indeks yang sama dan menghasilkan himpunan bit baru dengan hasilnya. Jika dua item pada suatu posisi sama, maka pada himpunan bit baru tersebut <code translate="no">1</code> akan ditulis pada posisi tersebut; <code translate="no">0</code> jika keduanya berbeda.</p>
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
    </button></h2><p>Bitset adalah mekanisme sederhana namun kuat yang membantu Milvus melakukan penyaringan atribut, penghapusan data, dan kueri dengan Time Travel.</p>
<h3 id="Attribute-filtering" class="common-anchor-header">Penyaringan atribut<button data-href="#Attribute-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>Karena bitset hanya berisi dua nilai yang mungkin, bitset sangat cocok untuk menyimpan hasil <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">penyaringan atribut</a>. Data yang memenuhi persyaratan filter atribut tertentu ditandai dengan <code translate="no">1</code>.</p>
<h3 id="Data-deletion" class="common-anchor-header">Penghapusan data<button data-href="#Data-deletion" class="anchor-icon" translate="no">
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
    </button></h3><p>Bitset berfungsi sebagai cara ringkas untuk menyimpan informasi mengenai apakah suatu baris dalam segmen telah dihapus. Entitas yang dihapus ditandai dengan " <code translate="no">1</code> " dalam bitset yang bersangkutan, yang <a href="https://milvus.io/blog/deleting-data-in-milvus.md">tidak akan dihitung</a> selama proses pencarian atau kueri.</p>
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
    </button></h2><p>Di sini kami menyajikan tiga contoh yang menggambarkan bagaimana bitset digunakan di Milvus, dengan merujuk pada ketiga implementasi utama bitset yang dibahas di atas. Dalam ketiga kasus tersebut, terdapat sebuah segmen dengan 8 entitas, kemudian serangkaian peristiwa bahasa manipulasi data (DML) terjadi sesuai urutan yang ditunjukkan di bawah ini.</p>
<ul>
<li>Empat entitas, yang " <code translate="no">primary_key</code>"-nya masing-masing adalah [1, 2, 3, 4], disisipkan ketika cap waktu <code translate="no">ts</code> sama dengan 100.</li>
<li>Empat entitas lainnya, yang nilai <code translate="no">primary_key</code>-nya masing-masing adalah [5, 6, 7, 8], disisipkan saat timestamp <code translate="no">ts</code> sama dengan 200.</li>
<li>Entitas yang <code translate="no">primary_key</code>-nya adalah [7, 8] dihapus ketika <code translate="no">ts</code> sama dengan 300.</li>
<li>Hanya entitas yang nilai <code translate="no">primary_key</code>-nya adalah [1, 3, 5, 7] yang memenuhi syarat penyaringan atribut.</li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" /> 
   <span>Urutan peristiwa DML</span>
  
 </span></p>
<h3 id="Case-one" class="common-anchor-header">Kasus pertama<button data-href="#Case-one" class="anchor-icon" translate="no">
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
    </button></h3><p>Dalam kasus ini, pengguna menetapkan <code translate="no">time_travel</code> sebesar 150, yang berarti pengguna melakukan kueri terhadap data yang memenuhi <code translate="no">ts = 150</code>. Proses pembentukan bit set diilustrasikan pada Gambar 1.</p>
<p>Selama tahap penyaringan awal, nilai ` <code translate="no">filter_bitset</code> ` harus berupa ` <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>`, di mana entitas [1, 3, 5, 7] ditandai sebagai ` <code translate="no">1</code> ` karena merupakan hasil penyaringan yang valid.</p>
<p>Namun, entitas [5, 6, 7, 8] tidak dimasukkan ke dalam basis data vektor ketika <code translate="no">ts</code> sama dengan 150. Oleh karena itu, keempat entitas ini harus ditandai sebagai 0 terlepas dari kondisi penyaringan. Sekarang hasil bitset seharusnya adalah <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code>.</p>
<p>Sebagaimana dibahas dalam <a href="#data-deletion">Penghapusan Data</a>, entitas yang ditandai dengan <code translate="no">1</code> akan diabaikan selama pencarian atau kueri. Hasil bitset kini perlu dibalik agar dapat digabungkan dengan bitmap penghapusan, yang menghasilkan <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>.</p>
<p>Adapun bitset penghapusan <code translate="no">del_bitset</code>, nilai awalnya seharusnya <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Namun, entitas 7 dan 8 tidak dihapus hingga <code translate="no">ts</code> bernilai 300. Oleh karena itu, ketika <code translate="no">ts</code> bernilai 150, entitas 7 dan 8 masih valid. Akibatnya, nilai <code translate="no">del_bitset</code> setelah Time Travel adalah <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Sekarang kita memiliki dua himpunan bit setelah Time Travel dan penyaringan atribut: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> dan <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . Gabungkan kedua himpunan bit ini dengan operator logika biner <code translate="no">OR</code>. Nilai akhir dari result_bitset adalah <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>, yang berarti hanya entitas 1 dan 3 yang akan dihitung pada tahap pencarian atau kueri berikutnya.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." /> 
   <span>Gambar 1. Pencarian dengan Time Travel = 150.</span>
  
 </span></p>
<h3 id="Case-two" class="common-anchor-header">Kasus kedua<button data-href="#Case-two" class="anchor-icon" translate="no">
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
    </button></h3><p>Dalam kasus ini, pengguna menetapkan ` <code translate="no">time_travel</code> ` sebesar 250. Proses pembentukan bitset diilustrasikan pada Gambar 2.</p>
<p>Seperti pada kasus pertama, nilai awal ` <code translate="no">filter_bitset</code> ` adalah ` <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>`.</p>
<p>Semua entitas terdapat dalam basis data vektor saat <code translate="no">ts</code> = 250. Oleh karena itu, <code translate="no">filter_bitset</code> tetap sama saat memperhitungkan cap waktu. Sekali lagi, kita perlu membalik hasilnya dan mendapatkan <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Adapun bitset penghapusan <code translate="no">del_bitset</code>, nilai awalnya adalah <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Namun, entitas 7 dan 8 belum dihapus hingga <code translate="no">ts</code> bernilai 300. Oleh karena itu, ketika <code translate="no">ts</code> bernilai 250, entitas 7 dan 8 masih valid. Akibatnya, <code translate="no">del_bitset</code> setelah Time Travel adalah <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Sekarang kita memiliki dua himpunan bit setelah Time Travel dan penyaringan atribut: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> dan <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . Gabungkan kedua himpunan bit ini dengan operator logika biner <code translate="no">OR</code>. Hasilnya (result_bitset) adalah <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>. Artinya, hanya entitas [1, 3, 5, 7] yang akan dihitung pada tahap pencarian atau kueri berikutnya.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." /> 
   <span>Gambar 2. Pencarian dengan Time Travel = 250.</span>
  
 </span></p>
<h3 id="Case-three" class="common-anchor-header">Kasus ketiga<button data-href="#Case-three" class="anchor-icon" translate="no">
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
    </button></h3><p>Dalam kasus ini, pengguna menetapkan ` <code translate="no">time_travel</code> ` sebesar 350. Proses pembentukan himpunan bit diilustrasikan pada Gambar 3.</p>
<p>Seperti pada kasus sebelumnya, nilai awal <code translate="no">filter_bitset</code> adalah <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Semua entitas terdapat dalam basis data vektor saat <code translate="no">ts</code>= 350. Oleh karena itu, <code translate="no">filter_bitset</code> akhir yang dibalik adalah <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>, sama seperti pada kasus kedua.</p>
<p>Adapun untuk bitset penghapusan <code translate="no">del_bitset</code>, karena entitas 7 dan 8 telah dihapus saat <code translate="no">ts = 350</code>, maka hasil dari <code translate="no">del_bitset</code> adalah <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>.</p>
<p>Sekarang kita memiliki dua himpunan bit setelah Time Travel dan penyaringan atribut: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> dan <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> . Gabungkan kedua himpunan bit ini dengan operator logika biner " <code translate="no">OR</code> ". Hasil akhir dari " <code translate="no">result_bitset</code> " adalah <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code>. Artinya, hanya entitas [1, 3, 5] yang akan dihitung pada tahap pencarian atau kueri berikutnya.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." /> 
   <span>Gambar 3. Pencarian dengan Time Travel = 350.</span>
  
 </span></p>
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
    </button></h2><p>Sekarang setelah Anda mengetahui cara kerja bitset di Milvus, Anda mungkin juga ingin:</p>
<ul>
<li>Mempelajari cara <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">menggunakan string untuk menyaring</a> hasil pencarian Anda, atau merujuk ke <a href="https://milvus.io/docs/hybridsearch.md">Hybrid Search</a> di dokumentasi kami.</li>
<li>Memahami <a href="https://milvus.io/docs/v2.1.x/data_processing.md">bagaimana data diproses</a> di Milvus.</li>
</ul>
