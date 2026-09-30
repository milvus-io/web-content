---
id: metric.md
summary: >-
  Milvus mendukung berbagai metrik kemiripan, termasuk jarak Euclidean, inner
  product, Jaccard, dll.
title: Metrik Kemiripan
---
<h1 id="Similarity-Metrics" class="common-anchor-header">Metrik Kemiripan<button data-href="#Similarity-Metrics" class="anchor-icon" translate="no">
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
    </button></h1><p>Di Milvus, metrik kemiripan digunakan untuk mengukur kemiripan di antara vektor. Memilih metrik jarak yang baik dapat membantu meningkatkan kinerja klasifikasi dan pengelompokan secara signifikan.</p>
<p>Tabel berikut menunjukkan bagaimana metrik kemiripan yang banyak digunakan ini sesuai dengan berbagai bentuk data input dan indeks Milvus. Saat ini, Milvus mendukung berbagai jenis data, termasuk penyisipan titik mengambang (sering dikenal sebagai vektor titik mengambang atau vektor padat), penyisipan biner (juga dikenal sebagai vektor biner), dan penyisipan jarang (juga dikenal sebagai vektor jarang).</p>
<div class="filter">
 <a href="#floating">Penyematan titik mengambang</a> <a href="#binary">Penyematan biner</a> <a href="#sparse">Penyematan jarang</a></div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Jenis Metrik</th>
    <th class="tg-0pky">Jenis Indeks</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Jarak Euclidean (L2)</li><li>Produk dalam (IP)</li><li>Kemiripan kosinus (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>DATAR</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Jenis Metrik</th>
    <th class="tg-0pky">Jenis Indeks</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Jaccard</li><li>Hamming</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Jenis Metrik</th>
    <th class="tg-0pky">Jenis Indeks</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>SPARSE_INVERTED_INDEX</li><li>SPARSE_WAND</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Euclidean-distance-L2" class="common-anchor-header">Jarak Euclidean (L2)<button data-href="#Euclidean-distance-L2" class="anchor-icon" translate="no">
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
    </button></h3><p>Pada dasarnya, jarak Euclidean mengukur panjang segmen yang menghubungkan 2 titik.</p>
<p>Rumus untuk jarak Euclidean adalah sebagai berikut:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/euclidean_metric.png" alt="euclidean" class="doc-image" id="euclidean" />
   </span> <span class="img-wrapper"> <span>euclidean</span> </span></p>
<p>di mana <strong>a</strong> = (<sub>a0</sub>, <sub>a1</sub>, ...,<sub>an-1</sub>) dan <strong>b</strong> = (<sub>b0</sub>, <sub>b0</sub>, ..., <sub>bn-1</sub>) adalah dua titik dalam ruang Euclidean n-dimensi</p>
<p>Ini adalah metrik jarak yang paling umum digunakan dan sangat berguna ketika datanya kontinu.</p>
<div class="alert note">
Milvus hanya menghitung nilai sebelum menerapkan akar kuadrat ketika jarak Euclidean dipilih sebagai metrik jarak.</div>
<h3 id="Inner-product-IP" class="common-anchor-header">Produk dalam (IP)<button data-href="#Inner-product-IP" class="anchor-icon" translate="no">
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
    </button></h3><p>Jarak IP antara dua penyisipan vektor didefinisikan sebagai berikut:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/IP_formula.png" alt="ip" class="doc-image" id="ip" />
   </span> <span class="img-wrapper"> <span>ip</span> </span></p>
<p>IP lebih berguna jika Anda perlu membandingkan data yang tidak dinormalisasi atau ketika Anda peduli dengan besaran dan sudut.</p>
<div class="alert note">
<p>Jika Anda menerapkan metrik jarak IP pada embedding yang dinormalisasi, hasilnya akan setara dengan menghitung kemiripan kosinus di antara embedding.</p>
</div>
<p>Misalkan X' dinormalisasi dari penyematan X:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/normalize_formula.png" alt="normalize" class="doc-image" id="normalize" />
   </span> <span class="img-wrapper"> <span>normalisasi</span> </span></p>
<p>Korelasi antara kedua penyematan adalah sebagai berikut:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/normalization_formula.png" alt="normalization" class="doc-image" id="normalization" />
   </span> <span class="img-wrapper"> <span>normalisasi</span> </span></p>
<h3 id="Cosine-Similarity" class="common-anchor-header">Kesamaan Kosinus<button data-href="#Cosine-Similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>Kesamaan kosinus menggunakan kosinus sudut antara dua set vektor untuk mengukur seberapa mirip mereka. Anda dapat membayangkan dua set vektor sebagai dua segmen garis yang dimulai dari titik awal yang sama ([0,0,...]) tetapi mengarah ke arah yang berbeda.</p>
<p>Untuk menghitung kemiripan kosinus antara dua set vektor <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> dan <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong>, gunakan rumus berikut:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/cosine_similarity.png" alt="cosine_similarity" class="doc-image" id="cosine_similarity" />
   </span> <span class="img-wrapper"> <span>cosinus_similaritas</span> </span></p>
<p>Kemiripan kosinus selalu berada dalam interval <strong>[-1, 1]</strong>. Sebagai contoh, dua vektor proporsional memiliki kemiripan kosinus <strong>1</strong>, dua vektor ortogonal memiliki kemiripan <strong>0</strong>, dan dua vektor yang berlawanan memiliki kemiripan <strong>-1</strong>. Semakin besar kosinus, semakin kecil sudut antara dua vektor, yang mengindikasikan bahwa dua vektor tersebut semakin mirip satu sama lain.</p>
<p>Dengan mengurangkan kemiripan kosinusnya dari 1, Anda bisa mendapatkan jarak kosinus antara dua vektor.</p>
<h3 id="Jaccard-distance" class="common-anchor-header">Jarak Jaccard<button data-href="#Jaccard-distance" class="anchor-icon" translate="no">
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
    </button></h3><p>Koefisien kemiripan Jaccard mengukur kemiripan antara dua set sampel dan didefinisikan sebagai kardinalitas perpotongan set yang ditentukan dibagi dengan kardinalitas gabungan keduanya. Ini hanya dapat diterapkan pada set sampel yang terbatas.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaccard_coeff.png" alt="Jaccard similarity coefficient" class="doc-image" id="jaccard-similarity-coefficient" />
   </span> <span class="img-wrapper"> <span>Koefisien kesamaan Jaccard</span> </span></p>
<p>Jarak Jaccard mengukur ketidaksamaan antara kumpulan data dan diperoleh dengan mengurangi koefisien kemiripan Jaccard dari 1. Untuk variabel biner, jarak Jaccard setara dengan koefisien Tanimoto.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaccard_dist.png" alt="Jaccard distance" class="doc-image" id="jaccard-distance" />
   </span> <span class="img-wrapper"> <span>Jarak Jaccard</span> </span></p>
<h3 id="Hamming-distance" class="common-anchor-header">Jarak Hamming<button data-href="#Hamming-distance" class="anchor-icon" translate="no">
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
    </button></h3><p>Jarak Hamming mengukur string data biner. Jarak antara dua string dengan panjang yang sama adalah jumlah posisi bit di mana bit-bit tersebut berbeda.</p>
<p>Sebagai contoh, misalkan ada dua string, 1101 1001 dan 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Karena ini mengandung dua angka 1, maka jarak Hamming, d (11011001, 10011101) = 2.</p>
<h3 id="Structural-Similarity" class="common-anchor-header">Kesamaan Struktural<button data-href="#Structural-Similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>Ketika sebuah struktur kimia muncul sebagai bagian dari struktur kimia yang lebih besar, yang pertama disebut substruktur dan yang terakhir disebut superstruktur. Sebagai contoh, etanol adalah substruktur dari asam asetat, dan asam asetat adalah superstruktur dari etanol.</p>
<p>Kemiripan struktural digunakan untuk menentukan apakah dua rumus kimia mirip satu sama lain, yang satu merupakan superstruktur atau substruktur dari yang lain.</p>
<p>Untuk menentukan apakah A adalah superstruktur dari B, gunakan rumus berikut:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/superstructure.png" alt="superstructure" class="doc-image" id="superstructure" />
   </span> <span class="img-wrapper"> <span>superstruktur</span> </span></p>
<p>Dimana:</p>
<ul>
<li>A adalah representasi biner dari rumus kimia yang akan diambil</li>
<li>B adalah representasi biner dari rumus kimia dalam basis data</li>
</ul>
<p>Setelah mengembalikan <code translate="no">0</code>, <strong>A</strong> bukan merupakan superstruktur dari <strong>B</strong>. Jika tidak, hasilnya adalah sebaliknya.</p>
<p>Untuk menentukan apakah A adalah sebuah substruktur dari B, gunakan rumus berikut:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/substructure.png" alt="substructure" class="doc-image" id="substructure" />
   </span> <span class="img-wrapper"> <span>substruktur</span> </span></p>
<p>Dimana:</p>
<ul>
<li>A adalah representasi biner dari rumus kimia yang akan diambil</li>
<li>B adalah representasi biner dari rumus kimia dalam database</li>
</ul>
<p>Setelah mengembalikan <code translate="no">0</code>, <strong>A</strong> bukan merupakan substruktur dari <strong>B</strong>. Jika tidak, hasilnya adalah sebaliknya.</p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">Mengapa hasil pencarian vektor teratas bukan vektor pencarian itu sendiri, jika jenis metriknya adalah inner product?</font></summary>Ini terjadi jika Anda belum menormalkan vektor saat menggunakan inner product sebagai metrik jarak.</details>
<details>
<summary><font color="#4fc4f9">Apa yang dimaksud dengan normalisasi? Mengapa normalisasi diperlukan?</font></summary></p>
<p>Normalisasi mengacu pada proses mengubah embedding (vektor) sehingga normalnya sama dengan 1. Jika Anda menggunakan Inner Product untuk menghitung kemiripan embedding, Anda harus menormalkan embedding Anda. Setelah normalisasi, inner product sama dengan kemiripan kosinus.</p>
<p>
Lihat <a href="https://en.wikipedia.org/wiki/Unit_vector">Wikipedia</a> untuk informasi lebih lanjut.</p>
</details>
<details>
<summary><font color="#4fc4f9">Mengapa saya mendapatkan hasil yang berbeda dengan menggunakan jarak Euclidean (L2) dan inner product (IP) sebagai metrik jarak?</font></summary>Periksa apakah vektor sudah dinormalisasi<summary><font color="#4fc4f9">.</font></summary>Jika tidak, Anda perlu menormalkan vektor terlebih dahulu. Secara teoritis, kemiripan yang dihasilkan oleh L2 berbeda dengan kemiripan yang dihasilkan oleh IP, jika vektor-vektornya tidak dinormalisasi.</details>
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
<li>Pelajari lebih lanjut tentang <a href="/docs/id/index.md">jenis indeks</a> yang didukung di Milvus.</li>
</ul>
