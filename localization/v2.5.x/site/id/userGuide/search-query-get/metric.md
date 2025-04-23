---
id: metric.md
title: Jenis Metrik
summary: >-
  Metrik kemiripan digunakan untuk mengukur kemiripan di antara vektor. Memilih
  metrik jarak yang tepat dapat membantu meningkatkan kinerja klasifikasi dan
  pengelompokan secara signifikan.
---
<h1 id="Metric-Types" class="common-anchor-header">Jenis Metrik<button data-href="#Metric-Types" class="anchor-icon" translate="no">
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
    </button></h1><p>Metrik kemiripan digunakan untuk mengukur kemiripan di antara vektor. Memilih metrik jarak yang tepat dapat membantu meningkatkan kinerja klasifikasi dan pengelompokan secara signifikan.</p>
<p>Saat ini, Milvus mendukung jenis-jenis metrik kemiripan berikut ini: Jarak Euclidean (<code translate="no">L2</code>), Inner Product (<code translate="no">IP</code>), Cosine Similarity (<code translate="no">COSINE</code>), <code translate="no">JACCARD</code>, <code translate="no">HAMMING</code>, dan <code translate="no">BM25</code> (dirancang khusus untuk pencarian teks lengkap pada vektor yang jarang).</p>
<p>Tabel di bawah ini merangkum pemetaan antara berbagai jenis bidang dan jenis metrik yang sesuai.</p>
<table>
   <tr>
     <th><p>Jenis Bidang</p></th>
     <th><p>Rentang Dimensi</p></th>
     <th><p>Jenis Metrik yang Didukung</p></th>
     <th><p>Jenis Metrik Default</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BFLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">SPARSE\_FLOAT\_VECTOR</code></p></td>
     <td><p>Tidak perlu menentukan dimensi.</p></td>
     <td><p><code translate="no">IP</code>, <code translate="no">BM25</code> (hanya digunakan untuk pencarian teks lengkap)</p></td>
     <td><p><code translate="no">IP</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BINARY_VECTOR</code></p></td>
     <td><p>8-32,768*8</p></td>
     <td><p><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></p></td>
     <td><p><code translate="no">HAMMING</code></p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>Untuk bidang vektor dengan tipe <code translate="no">SPARSE\_FLOAT\_VECTOR</code>, gunakan tipe metrik <code translate="no">BM25</code> hanya saat melakukan pencarian teks lengkap. Untuk informasi lebih lanjut, lihat <a href="/docs/id/full-text-search.md">Pencarian Teks Lengkap</a>.</p></li>
<li><p>Untuk bidang vektor jenis <code translate="no">BINARY_VECTOR</code>, nilai dimensi (<code translate="no">dim</code>) harus kelipatan 8.</p></li>
</ul>
</div>
<p>Tabel di bawah ini merangkum karakteristik nilai jarak kemiripan dari semua jenis metrik yang didukung dan kisaran nilainya.</p>
<table>
   <tr>
     <th><p>Jenis Metrik</p></th>
     <th><p>Karakteristik Nilai Jarak Kemiripan</p></th>
     <th><p>Rentang Nilai Jarak Kemiripan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>Nilai yang lebih kecil menunjukkan kemiripan yang lebih besar.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>Nilai yang lebih besar menunjukkan kemiripan yang lebih besar.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>Nilai yang lebih besar menunjukkan kemiripan yang lebih besar.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>Nilai yang lebih kecil menunjukkan kemiripan yang lebih besar.</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>Nilai yang lebih kecil menunjukkan kemiripan yang lebih besar.</p></td>
     <td><p>[0, redup(vektor)]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BM25</code></p></td>
     <td><p>Nilai relevansi berdasarkan frekuensi istilah, frekuensi dokumen terbalik, dan normalisasi dokumen.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
</table>
<h2 id="Euclidean-distance-L2" class="common-anchor-header">Jarak Euclidean (L2)<button data-href="#Euclidean-distance-L2" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada dasarnya, jarak Euclidean mengukur panjang segmen yang menghubungkan 2 titik.</p>
<p>Rumus untuk jarak Euclidean adalah sebagai berikut:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/euclidean-metric.png" alt="Euclidean Metric" class="doc-image" id="euclidean-metric" />
   </span> <span class="img-wrapper"> <span>Metrik Euclidean</span> </span></p>
<p>di mana <strong>a = (<sub>a0</sub>, <sub>a1</sub>, ...,<sub>an-1</sub>)</strong> dan <strong>b = (<sub>b0</sub>, <sub>b1</sub>, ..., <sub>bn-1</sub>)</strong> adalah dua titik dalam ruang Euclidean n-dimensi.</p>
<p>Ini adalah metrik jarak yang paling umum digunakan dan sangat berguna ketika datanya kontinu.</p>
<div class="alert note">
<p>Milvus hanya menghitung nilai sebelum menerapkan akar kuadrat ketika jarak Euclidean dipilih sebagai metrik jarak.</p>
</div>
<h2 id="Inner-product-IP" class="common-anchor-header">Produk dalam (IP)<button data-href="#Inner-product-IP" class="anchor-icon" translate="no">
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
    </button></h2><p>Jarak IP antara dua penyematan didefinisikan sebagai berikut:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IP-formula.png" alt="IP Formula" class="doc-image" id="ip-formula" />
   </span> <span class="img-wrapper"> <span>Rumus IP</span> </span></p>
<p>IP lebih berguna jika Anda perlu membandingkan data yang tidak dinormalisasi atau ketika Anda peduli dengan besaran dan sudut.</p>
<div class="alert note">
<p>Jika Anda menggunakan IP untuk menghitung kemiripan di antara embedding, Anda harus menormalkan embedding. Setelah normalisasi, hasil kali dalam sama dengan kemiripan kosinus.</p>
</div>
<p>Misalkan X' dinormalisasi dari penyematan X:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/normalize-formula.png" alt="Normalize Formula" class="doc-image" id="normalize-formula" />
   </span> <span class="img-wrapper"> <span>Rumus Normalisasi</span> </span></p>
<p>Korelasi antara kedua embedding adalah sebagai berikut:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/correlation-between-embeddings.png" alt="Correlation Between Embeddings" class="doc-image" id="correlation-between-embeddings" />
   </span> <span class="img-wrapper"> <span>Korelasi Antara Penyematan</span> </span></p>
<h2 id="Cosine-similarity" class="common-anchor-header">Kesamaan kosinus<button data-href="#Cosine-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>Kemiripan kosinus menggunakan kosinus sudut antara dua set vektor untuk mengukur seberapa mirip mereka. Anda dapat membayangkan dua set vektor sebagai segmen garis yang dimulai dari titik yang sama, seperti [0,0,...], tetapi mengarah ke arah yang berbeda.</p>
<p>Untuk menghitung kemiripan kosinus antara dua set vektor <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> dan <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong>, gunakan rumus berikut:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cosine-similarity.png" alt="Cosine Similarity" class="doc-image" id="cosine-similarity" />
   </span> <span class="img-wrapper"> <span>Kesamaan Kosinus</span> </span></p>
<p>Kesamaan kosinus selalu berada dalam interval <strong>[-1, 1]</strong>. Sebagai contoh, dua vektor proporsional memiliki kemiripan kosinus <strong>1</strong>, dua vektor ortogonal memiliki kemiripan <strong>0</strong>, dan dua vektor yang berlawanan memiliki kemiripan <strong>-1</strong>. Semakin besar kosinus, semakin kecil sudut antara dua vektor tersebut, yang mengindikasikan bahwa dua vektor tersebut semakin mirip satu sama lain.</p>
<p>Dengan mengurangkan kemiripan kosinusnya dari 1, Anda bisa mendapatkan jarak kosinus antara dua vektor.</p>
<h2 id="JACCARD-distance" class="common-anchor-header">Jarak JACCARD<button data-href="#JACCARD-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>Koefisien kemiripan JACCARD mengukur kemiripan antara dua set sampel dan didefinisikan sebagai kardinalitas perpotongan set yang ditentukan dibagi dengan kardinalitas penyatuannya. Ini hanya dapat diterapkan pada set sampel yang terbatas.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-similarity-coefficient-formula.png" alt="JACCARD Similarity Coefficient Formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
   </span> <span class="img-wrapper"> <span>Rumus Koefisien Kemiripan JACCARD</span> </span></p>
<p>Jarak JACCARD mengukur ketidaksamaan antara kumpulan data dan diperoleh dengan mengurangi koefisien kemiripan JACCARD dari 1. Untuk variabel biner, jarak JACCARD setara dengan koefisien Tanimoto.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-distance-formula.png" alt="JACCARD Distance Formula" class="doc-image" id="jaccard-distance-formula" />
   </span> <span class="img-wrapper"> <span>Rumus Jarak JACCARD</span> </span></p>
<h2 id="HAMMING-distance" class="common-anchor-header">Jarak HAMMING<button data-href="#HAMMING-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>Jarak HAMMING mengukur string data biner. Jarak antara dua string dengan panjang yang sama adalah jumlah posisi bit di mana bit-bitnya berbeda.</p>
<p>Sebagai contoh, misalkan ada dua string, 1101 1001 dan 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Karena ini mengandung dua 1, maka jarak HAMMING, d (11011001, 10011101) = 2.</p>
<h2 id="BM25-similarity" class="common-anchor-header">Kesamaan BM25<button data-href="#BM25-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25 adalah metode pengukuran relevansi teks yang banyak digunakan, yang dirancang khusus untuk <a href="/docs/id/full-text-search.md">pencarian teks lengkap</a>. Metode ini menggabungkan tiga faktor kunci berikut:</p>
<ul>
<li><p><strong>Frekuensi Istilah (TF):</strong> Mengukur seberapa sering sebuah istilah muncul dalam sebuah dokumen. Meskipun frekuensi yang lebih tinggi sering kali menunjukkan kepentingan yang lebih besar, BM25 menggunakan parameter saturasi k_1 untuk mencegah istilah yang terlalu sering muncul mendominasi skor relevansi.</p></li>
<li><p><strong>Frekuensi Dokumen Terbalik (Inverse Document Frequency/IDF):</strong> Mencerminkan pentingnya sebuah istilah di seluruh corpus. Istilah yang muncul di lebih sedikit dokumen menerima nilai IDF yang lebih tinggi, yang mengindikasikan kontribusi yang lebih besar terhadap relevansi.</p></li>
<li><p><strong>Normalisasi Panjang Dokumen:</strong> Dokumen yang lebih panjang cenderung mendapat nilai lebih tinggi karena mengandung lebih banyak istilah. BM25 mengurangi bias ini dengan menormalkan panjang dokumen, dengan parameter b yang mengontrol kekuatan normalisasi ini.</p></li>
</ul>
<p>Skor BM25 dihitung sebagai berikut:</p>
<p>score(D, Q)=\sum_{i=1}^{n}IDF(q_i)\cdot {{TF(q_i,D)\cdot(k_1+1)}\over{TF(q_i, D)+k_1\cdot(1-b+b\cdot {{|D|}\over{avgdl}})}}</p>
<p>Deskripsi parameter:</p>
<ul>
<li><p>Q: Teks kueri yang disediakan oleh pengguna.</p></li>
<li><p>D: Dokumen yang sedang dievaluasi.</p></li>
<li><p>TF(q_i, D): Frekuensi term, yang merepresentasikan seberapa sering term q_i muncul dalam dokumen D.</p></li>
<li><p>IDF(q_i): Inverse document frequency, dihitung sebagai:</p>
<p>IDF(q_i)=\log({N-n(q_i)+0.5\over n(q_i)+0.5} + 1)</p>
<p>di mana N adalah jumlah total dokumen dalam korpus, dann(q_i) adalah jumlah dokumen yang mengandung term q_i.</p></li>
<li><p>|D|: Panjang dokumen D (jumlah total term).</p></li>
<li><p>avgdl: Panjang rata-rata semua dokumen dalam korpus.</p></li>
<li><p>k_1: Mengontrol pengaruh frekuensi term pada skor. Nilai yang lebih tinggi meningkatkan pentingnya frekuensi term. Kisaran umumnya adalah [1.2, 2.0], sementara Milvus mengizinkan kisaran [0, 3].</p></li>
<li><p>b: Mengontrol tingkat normalisasi panjang, mulai dari 0 hingga 1. Bila nilainya 0, tidak ada normalisasi yang diterapkan; bila nilainya 1, normalisasi penuh diterapkan.</p></li>
</ul>
