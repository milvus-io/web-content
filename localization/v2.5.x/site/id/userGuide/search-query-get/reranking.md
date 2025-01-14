---
id: reranking.md
summary: >-
  Topik ini mencakup proses pemeringkatan ulang, menjelaskan pentingnya dan
  implementasi dua metode pemeringkatan ulang.
title: Pemeringkatan ulang
---
<h1 id="Reranking" class="common-anchor-header">Pemeringkatan ulang<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus memungkinkan kemampuan pencarian hibrida menggunakan API <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md">hybrid_search()</a>, yang menggabungkan strategi perangkingan ulang yang canggih untuk menyaring hasil pencarian dari beberapa contoh <code translate="no">AnnSearchRequest</code>. Topik ini mencakup proses perankingan ulang, menjelaskan pentingnya dan implementasi strategi perankingan ulang yang berbeda di Milvus.</p>
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
    </button></h2><p>Gambar berikut mengilustrasikan eksekusi pencarian hybrid di Milvus dan menyoroti peran perangkingan ulang dalam prosesnya.</p>
<p><img translate="no" src="/docs/v2.5.x/assets/multi-vector-rerank.png" alt="reranking_process" width="300"/></p>
<p>Perangkingan ulang dalam pencarian hybrid adalah langkah penting yang mengkonsolidasikan hasil dari beberapa bidang vektor, memastikan hasil akhir relevan dan diprioritaskan secara akurat. Saat ini, Milvus menawarkan strategi perankingan ulang ini:</p>
<ul>
<li><p><code translate="no">WeightedRanker</code>: Pendekatan ini menggabungkan hasil dengan menghitung rata-rata tertimbang skor (atau jarak vektor) dari pencarian vektor yang berbeda. Pendekatan ini memberikan bobot berdasarkan signifikansi setiap bidang vektor.</p></li>
<li><p><code translate="no">RRFRanker</code>: Strategi ini menggabungkan hasil berdasarkan peringkat mereka di kolom vektor yang berbeda.</p></li>
</ul>
<h2 id="Weighted-Scoring-WeightedRanker" class="common-anchor-header">Penilaian Tertimbang (WeightedRanker)<button data-href="#Weighted-Scoring-WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>Strategi <code translate="no">WeightedRanker</code> memberikan bobot yang berbeda untuk hasil dari setiap rute pencarian vektor berdasarkan signifikansi setiap bidang vektor. Strategi pemeringkatan ulang ini diterapkan ketika signifikansi setiap bidang vektor bervariasi, sehingga Anda dapat menekankan bidang vektor tertentu di atas bidang vektor lainnya dengan memberikan bobot yang lebih tinggi. Sebagai contoh, dalam pencarian multimodal, deskripsi teks mungkin dianggap lebih penting daripada distribusi warna pada gambar.</p>
<p>Proses dasar WeightedRanker adalah sebagai berikut:</p>
<ul>
<li><p><strong>Kumpulkan Skor Selama Pengambilan</strong>: Mengumpulkan hasil dan skornya dari berbagai rute pengambilan vektor.</p></li>
<li><p><strong>Normalisasi Skor</strong>: Menormalkan skor dari setiap rute ke rentang [0,1], di mana nilai yang mendekati 1 menunjukkan relevansi yang lebih tinggi. Normalisasi ini sangat penting karena distribusi skor bervariasi dengan jenis metrik yang berbeda. Sebagai contoh, jarak untuk IP berkisar dari [-∞,+∞], sedangkan jarak untuk L2 berkisar dari [0,+∞]. Milvus menggunakan fungsi <code translate="no">arctan</code>, yang mengubah nilai ke rentang [0,1] untuk memberikan dasar standar untuk berbagai jenis metrik.</p>
<p><img translate="no" src="/docs/v2.5.x/assets/arctan.png" alt="arctan-function" width="300"/></p></li>
<li><p><strong>Alokasi Bobot</strong>: Menetapkan bobot <code translate="no">w𝑖</code> untuk setiap rute pengambilan vektor. Pengguna menentukan bobot, yang mencerminkan keandalan, akurasi, atau metrik terkait lainnya dari sumber data. Setiap bobot berkisar dari [0,1].</p></li>
<li><p><strong>Penggabungan Skor</strong>: Menghitung rata-rata tertimbang dari skor yang dinormalisasi untuk mendapatkan skor akhir. Hasilnya kemudian diberi peringkat berdasarkan skor tertinggi hingga terendah untuk menghasilkan hasil akhir yang diurutkan.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x//assets/weighted-reranker.png" alt="weighted-reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>perangking-tertimbang</span> </span></p>
<p>Untuk menggunakan strategi ini, terapkan sebuah contoh <code translate="no">WeightedRanker</code> dan tetapkan nilai bobot dengan memasukkan sejumlah argumen numerik.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.7</span>) 
<button class="copy-code-btn"></button></code></pre>
<p>Perhatikan bahwa:</p>
<ul>
<li><p>Setiap nilai bobot berkisar dari 0 (paling tidak penting) hingga 1 (paling penting), yang memengaruhi skor agregat akhir.</p></li>
<li><p>Jumlah total nilai bobot yang disediakan di <code translate="no">WeightedRanker</code> harus sama dengan jumlah instance <code translate="no">AnnSearchRequest</code> yang telah Anda buat sebelumnya.</p></li>
<li><p>Perlu dicatat bahwa karena pengukuran yang berbeda dari jenis metrik yang berbeda, kami menormalkan jarak hasil penarikan sehingga berada pada interval [0,1], di mana 0 berarti berbeda dan 1 berarti serupa. Skor akhir adalah jumlah dari nilai bobot dan jarak.</p></li>
</ul>
<h2 id="Reciprocal-Rank-Fusion-RRFRanker" class="common-anchor-header">Reciprocal Rank Fusion (RRFRanker)<button data-href="#Reciprocal-Rank-Fusion-RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF adalah metode fusi data yang menggabungkan daftar peringkat berdasarkan kebalikan dari peringkat mereka. Ini adalah cara yang efektif untuk menyeimbangkan pengaruh setiap bidang vektor, terutama ketika tidak ada prioritas yang jelas tentang kepentingan. Strategi ini biasanya digunakan ketika Anda ingin memberikan pertimbangan yang sama pada semua bidang vektor atau ketika ada ketidakpastian tentang kepentingan relatif setiap bidang.</p>
<p>Proses dasar RRF adalah sebagai berikut:</p>
<ul>
<li><p><strong>Kumpulkan Peringkat Selama Pengambilan</strong>: Pengambil di beberapa bidang vektor mengambil dan mengurutkan hasil.</p></li>
<li><p><strong>Penggabungan Peringkat</strong>: Algoritme RRF menimbang dan menggabungkan peringkat dari setiap retriever. Rumusnya adalah sebagai berikut:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x//assets/rrf-ranker.png" alt="rrf-ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>rrf-ranker</span> </span></p>
<p>Di sini, 𝑁 mewakili jumlah rute pengambilan yang berbeda, rank𝑖(𝑑) adalah posisi peringkat dokumen yang diambil 𝑑 oleh retriever ke-𝑖, dan 𝑘 adalah parameter perataan, biasanya ditetapkan ke 60.</p></li>
<li><p><strong>Pemeringkatan Komprehensif</strong>: Beri peringkat ulang hasil yang diambil berdasarkan skor gabungan untuk menghasilkan hasil akhir.</p></li>
</ul>
<p>Untuk menggunakan strategi ini, gunakan contoh <code translate="no">RRFRanker</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

<span class="hljs-comment"># Default k value is 60</span>
ranker = RRFRanker()

<span class="hljs-comment"># Or specify k value</span>
ranker = RRFRanker(k=<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<p>RRF memungkinkan menyeimbangkan pengaruh di seluruh bidang tanpa menentukan bobot secara eksplisit. Kecocokan teratas yang disepakati oleh beberapa bidang akan diprioritaskan dalam peringkat akhir.</p>
