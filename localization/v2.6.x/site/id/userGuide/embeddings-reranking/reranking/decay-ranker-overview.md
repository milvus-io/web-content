---
id: decay-ranker-overview.md
title: Gambaran Umum Pemeringkat PeluruhanCompatible with Milvus 2.6.x
summary: >-
  Dalam pencarian vektor tradisional, hasil diurutkan berdasarkan kemiripan
  vektor-seberapa dekat vektor cocok dalam ruang matematika. Namun dalam
  aplikasi dunia nyata, apa yang membuat konten benar-benar relevan sering kali
  bergantung pada lebih dari sekadar kemiripan semantik.
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">Gambaran Umum Pemeringkat Peluruhan<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Dalam pencarian vektor tradisional, hasil diberi peringkat murni berdasarkan kemiripan vektor-seberapa dekat vektor cocok dalam ruang matematika. Namun dalam aplikasi dunia nyata, apa yang membuat konten benar-benar relevan sering kali bergantung pada lebih dari sekadar kemiripan semantik.</p>
<p>Pertimbangkan skenario sehari-hari ini:</p>
<ul>
<li><p>Pencarian berita di mana artikel kemarin seharusnya memiliki peringkat lebih tinggi daripada artikel serupa dari tiga tahun yang lalu</p></li>
<li><p>Pencari restoran yang memprioritaskan tempat yang berjarak 5 menit daripada yang membutuhkan waktu 30 menit berkendara</p></li>
<li><p>Platform e-niaga yang meningkatkan produk yang sedang tren meskipun produk tersebut tidak terlalu mirip dengan kueri penelusuran</p></li>
</ul>
<p>Semua skenario ini memiliki kebutuhan yang sama: menyeimbangkan kemiripan vektor dengan faktor numerik lain seperti waktu, jarak, atau popularitas.</p>
<p>Pemeringkat pembusukan di Milvus memenuhi kebutuhan ini dengan menyesuaikan peringkat pencarian berdasarkan nilai bidang numerik. Mereka memungkinkan Anda untuk menyeimbangkan kemiripan vektor dengan "kesegaran", "kedekatan", atau properti numerik lain dari data Anda, menciptakan pengalaman pencarian yang lebih intuitif dan relevan secara kontekstual.</p>
<h2 id="Limits" class="common-anchor-header">Batasan<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Peringkat peluruhan tidak dapat digunakan dengan pencarian pengelompokan.</p></li>
<li><p>Bidang yang digunakan untuk peringkat peluruhan harus berupa angka (<code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, atau <code translate="no">DOUBLE</code>).</p></li>
<li><p>Setiap pemeringkat peluruhan hanya dapat menggunakan satu bidang numerik.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Bagaimana cara kerjanya<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Peringkat peluruhan meningkatkan pencarian vektor tradisional dengan memasukkan faktor numerik seperti waktu atau jarak geografis ke dalam proses pemeringkatan. Keseluruhan prosesnya mengikuti tahap-tahap berikut:</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">Tahap 1: Menghitung skor kemiripan yang dinormalisasi</h3><p>Pertama, Milvus menghitung dan menormalkan skor kemiripan vektor untuk memastikan perbandingan yang konsisten:</p>
<ul>
<li><p>Untuk metrik jarak <strong>L2</strong> dan <strong>JACCARD</strong> (di mana nilai yang lebih rendah menunjukkan kemiripan yang lebih tinggi):</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>Ini mengubah jarak menjadi skor kemiripan antara 0-1, di mana lebih tinggi lebih baik.</p></li>
<li><p>Untuk metrik <strong>IP</strong>, <strong>COSINE</strong>, dan <strong>BM25</strong> (di mana nilai yang lebih tinggi sudah mengindikasikan kecocokan yang lebih baik): Skor digunakan secara langsung tanpa normalisasi.</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">Tahap 2: Menghitung skor pembusukan</h3><p>Selanjutnya, Milvus menghitung skor peluruhan berdasarkan nilai bidang numerik (seperti stempel waktu atau jarak) menggunakan pemeringkat peluruhan yang Anda pilih:</p>
<ul>
<li><p>Setiap pemeringkat peluruhan mengubah nilai numerik mentah menjadi skor relevansi yang dinormalisasi antara 0-1</p></li>
<li><p>Skor peluruhan menunjukkan seberapa relevan sebuah item berdasarkan "jaraknya" dari titik ideal</p></li>
</ul>
<p>Rumus perhitungan spesifik bervariasi tergantung pada jenis pemeringkat peluruhan. Untuk detail tentang cara menghitung skor peluruhan, lihat halaman khusus untuk <a href="/docs/id/gaussian-decay.md#Formula">Peluruhan Gaussian</a>, <a href="/docs/id/exponential-decay.md#Formula">Peluruhan Eksponensial</a>, <a href="/docs/id/linear-decay.md#Formula">Peluruhan Linier</a>.</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">Tahap 3: Menghitung skor akhir</h3><p>Terakhir, Milvus menggabungkan skor kemiripan yang dinormalisasi dan skor peluruhan untuk menghasilkan skor peringkat akhir:</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Dalam kasus pencarian hibrida (menggabungkan beberapa bidang vektor), Milvus mengambil skor kemiripan ternormalisasi maksimum di antara permintaan pencarian:</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Misalnya, jika sebuah makalah penelitian mendapat skor 0,82 dari kesamaan vektor dan 0,91 dari pencarian teks berbasis BM25 dalam pencarian hibrida, Milvus menggunakan 0,91 sebagai skor kesamaan dasar sebelum menerapkan faktor peluruhan.</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">Peringkat peluruhan dalam aksi</h3><p>Mari kita lihat peringkat peluruhan dalam skenario praktis-mencari <strong>"makalah penelitian AI"</strong> dengan peluruhan berbasis waktu:</p>
<div class="alert note">
<p>Dalam contoh ini, skor peluruhan mencerminkan bagaimana relevansi berkurang seiring berjalannya waktu-makalah yang lebih baru menerima skor yang mendekati 1,0, makalah yang lebih lama menerima skor yang lebih rendah. Nilai-nilai ini dihitung dengan menggunakan pemeringkat peluruhan tertentu. Untuk detailnya, lihat <a href="/docs/id/decay-ranker-overview.md#Choose-the-right-decay-ranker">Memilih pemeringkat peluruhan yang tepat</a>.</p>
</div>
<table>
   <tr>
     <th><p>Kertas</p></th>
     <th><p>Kemiripan Vektor</p></th>
     <th><p>Nilai Kemiripan yang dinormalisasi</p></th>
     <th><p>Tanggal Publikasi</p></th>
     <th><p>Skor Peluruhan</p></th>
     <th><p>Skor Akhir</p></th>
     <th><p>Peringkat Akhir</p></th>
   </tr>
   <tr>
     <td><p>Makalah A</p></td>
     <td><p>Tinggi</p></td>
     <td><p>0.85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>2 minggu yang lalu</p></td>
     <td><p>0.80</p></td>
     <td><p>0.68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>Kertas B</p></td>
     <td><p>Sangat Tinggi</p></td>
     <td><p>0,92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>6 bulan yang lalu</p></td>
     <td><p>0.45</p></td>
     <td><p>0.41</p></td>
     <td>3</td>
   </tr>
   <tr>
     <td><p>Kertas C</p></td>
     <td><p>Sedang</p></td>
     <td><p>0,75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>1 hari yang lalu</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>Kertas D</p></td>
     <td><p>Sedang-Tinggi</p></td>
     <td><p>0,76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>3 minggu yang lalu</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>4</td>
   </tr>
</table>
<p>Tanpa pemeringkatan ulang peluruhan, makalah B akan menduduki peringkat tertinggi berdasarkan kemiripan vektor murni (0,92). Namun, dengan diterapkannya pemeringkatan ulang peluruhan:</p>
<ul>
<li><p>Makalah C melonjak ke posisi #1 meskipun kemiripannya sedang karena sangat baru (diterbitkan kemarin)</p></li>
<li><p>Makalah B turun ke posisi #3 meskipun memiliki kemiripan yang sangat baik karena relatif tua</p></li>
<li><p>Makalah D menggunakan jarak L2 (di mana lebih rendah lebih baik), sehingga skornya dinormalisasi dari 1,2 menjadi 0,76 sebelum menerapkan peluruhan</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">Pilih pemeringkat peluruhan yang tepat<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menawarkan pemeringkat peluruhan yang berbeda - <code translate="no">gauss</code>, <code translate="no">exp</code>, <code translate="no">linear</code>, masing-masing dirancang untuk kasus penggunaan tertentu:</p>
<table>
   <tr>
     <th><p>Pemeringkat Pembusukan</p></th>
     <th><p>Karakteristik</p></th>
     <th><p>Kasus Penggunaan Ideal</p></th>
     <th><p>Contoh Skenario</p></th>
   </tr>
   <tr>
     <td><p>Gaussian (<code translate="no">gauss</code>)</p></td>
     <td><p>Penurunan bertahap yang terasa alami yang meluas secara moderat</p></td>
     <td><ul>
<li><p>Pencarian umum yang membutuhkan hasil yang seimbang</p></li>
<li><p>Aplikasi di mana pengguna memiliki rasa intuitif terhadap jarak</p></li>
<li><p>Ketika jarak yang moderat seharusnya tidak terlalu mempengaruhi hasil</p></li>
</ul></td>
     <td><p>Dalam pencarian restoran, tempat berkualitas yang berjarak 3 km tetap dapat ditemukan, meskipun peringkatnya lebih rendah dari pilihan terdekat</p></td>
   </tr>
   <tr>
     <td><p>Eksponensial (<code translate="no">exp</code>)</p></td>
     <td><p>Menurun dengan cepat pada awalnya tetapi mempertahankan ekor yang panjang</p></td>
     <td><ul>
<li><p>Umpan berita di mana kemutakhiran sangat penting</p></li>
<li><p>Media sosial di mana konten segar harus mendominasi</p></li>
<li><p>Ketika kedekatan sangat disukai tetapi item yang jauh harus tetap terlihat</p></li>
</ul></td>
     <td><p>Dalam aplikasi berita, berita kemarin memiliki peringkat yang jauh lebih tinggi daripada konten yang sudah berumur satu minggu, tetapi artikel lama yang sangat relevan masih dapat muncul</p></td>
   </tr>
   <tr>
     <td><p>Linear (<code translate="no">linear</code>)</p></td>
     <td><p>Penurunan yang konsisten dan dapat diprediksi dengan batas yang jelas</p></td>
     <td><ul>
<li><p>Aplikasi dengan batas-batas alami</p></li>
<li><p>Layanan dengan batas jarak</p></li>
<li><p>Konten dengan tanggal kedaluwarsa atau ambang batas yang jelas</p></li>
</ul></td>
     <td><p>Dalam pencari peristiwa, peristiwa di luar jendela dua minggu ke depan tidak akan muncul sama sekali</p></td>
   </tr>
</table>
<p>Untuk informasi terperinci tentang bagaimana setiap pemeringkat peluruhan menghitung skor dan pola penurunan tertentu, lihat dokumentasi khusus:</p>
<ul>
<li><p><a href="/docs/id/gaussian-decay.md">Peluruhan Gaussian</a></p></li>
<li><p><a href="/docs/id/exponential-decay.md">Peluruhan Eksponensial</a></p></li>
<li><p><a href="/docs/id/exponential-decay.md">Peluruhan Eksponensial</a></p></li>
</ul>
<h2 id="Implementation-example" class="common-anchor-header">Contoh implementasi<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h2><p>Pemeringkat peluruhan dapat diterapkan pada pencarian vektor standar dan operasi pencarian hibrida di Milvus. Di bawah ini adalah cuplikan kode utama untuk mengimplementasikan fitur ini.</p>
<div class="alert note">
<p>Sebelum menggunakan fungsi peluruhan, Anda harus terlebih dahulu membuat koleksi dengan bidang numerik yang sesuai (seperti stempel waktu, jarak, dll.) yang akan digunakan untuk perhitungan peluruhan. Untuk contoh kerja lengkap termasuk penyiapan koleksi, definisi skema, dan penyisipan data, lihat <a href="/docs/id/tutorial-implement-a-time-based-ranking-in-milvus.md">Tutorial: Menerapkan Pemeringkatan Berbasis Waktu di Milvus</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Membuat pemeringkat peluruhan</h3><p>Untuk mengimplementasikan pemeringkatan peluruhan, pertama-tama tentukan objek <code translate="no">Function</code> dengan konfigurasi yang sesuai:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
decay_ranker = Function(
    name=<span class="hljs-string">&quot;time_decay&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;timestamp&quot;</span>],    <span class="hljs-comment"># Numeric field to use for decay</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK for decay rankers</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,            <span class="hljs-comment"># Specify decay reranker. Must be &quot;decay&quot;</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,            <span class="hljs-comment"># Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
        <span class="hljs-string">&quot;origin&quot;</span>: current_timestamp,    <span class="hljs-comment"># Reference point (current time)</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,      <span class="hljs-comment"># 7 days in seconds</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,         <span class="hljs-comment"># 1 day no-decay zone</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>                    <span class="hljs-comment"># Half score at scale distance</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Diperlukan?</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Nilai/Contoh</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Pengenal untuk fungsi Anda yang digunakan saat menjalankan pencarian. Pilih nama deskriptif yang relevan dengan kasus penggunaan Anda.</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Bidang numerik untuk penghitungan skor peluruhan. Menentukan atribut data mana yang akan digunakan untuk menghitung peluruhan (misalnya, stempel waktu untuk peluruhan berbasis waktu, koordinat untuk peluruhan berbasis lokasi). 
 Harus berupa bidang dalam koleksi Anda yang berisi nilai numerik yang relevan. Mendukung INT8/16/32/64, FLOAT, DOUBLE.</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Menentukan jenis fungsi yang sedang dibuat. Harus diatur ke <code translate="no">RERANK</code> untuk semua pemeringkat peluruhan.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Menentukan metode pemeringkatan ulang yang akan digunakan. Harus diatur ke <code translate="no">"decay"</code> untuk mengaktifkan fungsionalitas pemeringkatan peluruhan.</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Menentukan pemeringkat peluruhan matematis mana yang akan diterapkan. Menentukan bentuk kurva penurunan relevansi. Lihat bagian <a href="/docs/id/decay-ranker-overview.md#Choose-the-right-decay-ranker">Memilih pemeringkat peluruhan yang tepat</a> untuk panduan dalam memilih fungsi yang sesuai.</p></td>
     <td><p><code translate="no">"gauss"</code>, <code translate="no">"exp"</code>, atau <code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Titik referensi yang digunakan untuk menghitung skor peluruhan. Item pada nilai ini menerima skor relevansi maksimum.</p></td>
     <td><ul>
<li>Untuk stempel waktu: waktu saat ini (misalnya, <code translate="no">int(time.time())</code>)</li>
<li>Untuk geolokasi: koordinat pengguna saat ini</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.scale</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Jarak atau waktu saat relevansi turun ke nilai <code translate="no">decay</code>. Mengontrol seberapa cepat relevansi menurun. Nilai yang lebih besar membuat penurunan relevansi yang lebih bertahap; nilai yang lebih kecil membuat penurunan yang lebih curam.</p></td>
     <td><ul>
<li>Untuk waktu: periode dalam detik (misalnya, <code translate="no">7 * 24 * 60 * 60</code> selama 7 hari)</li>
<li>Untuk jarak: meter (misalnya, <code translate="no">5000</code> untuk 5 km)</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.offset</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Menciptakan "zona tanpa peluruhan" di sekitar <code translate="no">origin</code> di mana item mempertahankan nilai penuh (nilai peluruhan = 1,0). Item dalam kisaran <code translate="no">origin</code> ini mempertahankan relevansi maksimum.</p></td>
     <td><ul>
<li>Untuk waktu: periode dalam detik (misalnya, <code translate="no">24 * 60 * 60</code> selama 1 hari)</li>
<li>Untuk jarak: meter (misalnya, <code translate="no">500</code> untuk 500m)</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Nilai skor pada jarak <code translate="no">scale</code>, mengontrol kecuraman kurva. Nilai yang lebih rendah menciptakan kurva penurunan yang lebih curam; nilai yang lebih tinggi menciptakan kurva penurunan yang lebih bertahap. Harus berada di antara 0 dan 1.</p></td>
     <td><p><code translate="no">0.5</code> (default)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Menerapkan ke pencarian vektor standar</h3><p>Setelah menentukan pemeringkat peluruhan Anda, Anda dapat menerapkannya selama operasi pencarian dengan meneruskannya ke parameter <code translate="no">ranker</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Terapkan ke pencarian hibrida</h3><p>Pemeringkat peluruhan juga dapat diterapkan pada operasi pencarian hibrida yang menggabungkan beberapa bidang vektor:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Same decay ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam pencarian gabungan, Milvus pertama-tama menemukan skor kemiripan maksimum dari semua bidang vektor, lalu menerapkan faktor peluruhan pada skor tersebut.</p>
