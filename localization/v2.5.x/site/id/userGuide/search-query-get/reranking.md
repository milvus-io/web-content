---
id: reranking.md
title: Pemeringkatan ulang
summary: >-
  Pencarian Hibrida mencapai hasil pencarian yang lebih tepat melalui beberapa
  pencarian ANN secara bersamaan. Beberapa pencarian menghasilkan beberapa set
  hasil, yang memerlukan strategi perangkingan ulang untuk membantu
  menggabungkan dan menyusun ulang hasil dan mengembalikan satu set hasil.
  Panduan ini akan memperkenalkan strategi perangkingan ulang yang didukung oleh
  Milvus dan memberikan tips untuk memilih strategi perangkingan ulang yang
  sesuai.
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
    </button></h1><p>Pencarian Hibrida menghasilkan hasil pencarian yang lebih tepat melalui beberapa pencarian ANN secara bersamaan. Beberapa pencarian menghasilkan beberapa set hasil, yang memerlukan strategi pemeringkatan ulang untuk membantu menggabungkan dan menyusun ulang hasil dan mengembalikan satu set hasil. Panduan ini akan memperkenalkan strategi perangkingan ulang yang didukung oleh Milvus dan memberikan tips untuk memilih strategi perangkingan ulang yang sesuai.</p>
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
    </button></h2><p>Diagram berikut menunjukkan alur kerja utama dalam melakukan Pencarian Hibrida dalam aplikasi pencarian multi-modal. Dalam diagram tersebut, satu jalur adalah pencarian ANN dasar pada teks dan jalur lainnya adalah pencarian ANN dasar pada gambar. Setiap jalur menghasilkan sekumpulan hasil berdasarkan skor kemiripan teks dan gambar masing-masing<strong>(Batas 1</strong> dan <strong>Batas 2</strong>). Kemudian strategi perankingan ulang diterapkan untuk menentukan peringkat ulang dua set hasil berdasarkan standar terpadu, yang pada akhirnya menggabungkan dua set hasil ke dalam satu set hasil pencarian akhir, <strong>Limit (final)</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-vector-rerank.png" alt="Multi Vector Rerank" class="doc-image" id="multi-vector-rerank" />
   </span> <span class="img-wrapper"> <span>Peringkat Ulang Multi Vektor</span> </span></p>
<p>Dalam Hybrid Search, pemeringkatan ulang adalah langkah penting yang mengintegrasikan hasil dari beberapa pencarian vektor untuk memastikan hasil akhir yang paling relevan dan akurat. Saat ini, Milvus mendukung dua strategi perankingan ulang berikut ini:</p>
<ul>
<li><p><strong><a href="/docs/id/reranking.md#WeightedRanker">Pemeringkatan Tertimbang</a></strong>: Strategi ini menggabungkan hasil dengan menghitung skor tertimbang dari skor (atau jarak) dari pencarian vektor yang berbeda. Bobot diberikan berdasarkan pentingnya setiap bidang vektor, memungkinkan penyesuaian sesuai dengan prioritas kasus penggunaan tertentu.</p></li>
<li><p><strong><a href="/docs/id/reranking.md#RRFRanker">RRFRanker</a> (Reciprocal Rank Fusion Ranker)</strong>: Strategi ini menggabungkan hasil berdasarkan peringkat. Strategi ini menggunakan metode yang menyeimbangkan peringkat hasil dari pencarian yang berbeda, sehingga menghasilkan integrasi yang lebih adil dan efektif dari beragam jenis data atau modalitas.</p></li>
</ul>
<h2 id="WeightedRanker" class="common-anchor-header">Pemeringkat Tertimbang<button data-href="#WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>Strategi WeightedRanker mengalokasikan bobot yang berbeda untuk hasil dari setiap jalur pencarian vektor berdasarkan tingkat kepentingannya.</p>
<h3 id="Mechanism-of-WeightedRanker" class="common-anchor-header">Mekanisme WeightedRanker</h3><p>Alur kerja utama dari strategi WeightedRanker adalah sebagai berikut:</p>
<ol>
<li><p><strong>Kumpulkan Skor Pencarian</strong>: Kumpulkan hasil dan skor dari setiap jalur pencarian vektor (skor_1, skor_2).</p></li>
<li><p><strong>Normalisasi Skor</strong>: Setiap pencarian dapat menggunakan metrik kemiripan yang berbeda, menghasilkan distribusi skor yang bervariasi. Misalnya, menggunakan Inner Product (IP) sebagai tipe kemiripan dapat menghasilkan skor mulai dari [-∞, +∞], sementara menggunakan jarak Euclidean (L2) menghasilkan skor mulai dari [0, +∞]. Karena rentang skor dari pencarian yang berbeda bervariasi dan tidak dapat dibandingkan secara langsung, maka perlu dilakukan normalisasi skor dari setiap jalur pencarian. Biasanya, fungsi <code translate="no">arctan</code> digunakan untuk mengubah skor menjadi rentang antara [0, 1] (skor_1_normalized, skor_2_normalized). Skor yang lebih dekat ke 1 menunjukkan kemiripan yang lebih tinggi.</p></li>
<li><p><strong>Menetapkan Bobot</strong>: Berdasarkan tingkat kepentingan yang diberikan pada bidang vektor yang berbeda, bobot<strong>(wi)</strong> dialokasikan pada skor yang dinormalisasi (score_1_normalized, score_2_normalized). Bobot setiap jalur harus berkisar antara [0,1]. Skor terbobot yang dihasilkan adalah skor_1_terbobot dan skor_2_terbobot.</p></li>
<li><p><strong>Menggabungkan Skor</strong>: Skor terbobot (skor_1_terbobot, skor_2_terbobot) diberi peringkat dari yang tertinggi hingga terendah untuk menghasilkan satu set skor akhir (skor_akhir).</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/weighted-reranker.png" alt="Weighted Reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>Pemeringkat Tertimbang</span> </span></p>
<h3 id="Example-of-WeightedRanker" class="common-anchor-header">Contoh Pemeringkat Tertimbang</h3><p>Contoh ini mendemonstrasikan Pencarian Hibrida multimodal (topK = 5) yang melibatkan gambar dan teks dan mengilustrasikan bagaimana strategi WeightedRanker menentukan peringkat hasil dari dua pencarian ANN.</p>
<ul>
<li>Hasil pencarian ANN pada gambar (topK=5): Hasil pencarian ANN pada gambar</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Skor (gambar)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.8</p></td>
   </tr>
</table>
<ul>
<li>Hasil pencarian ANN pada teks (topK=5): Hasil pencarian ANN pada teks</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Skor (teks)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.91</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.87</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.82</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>0.78</p></td>
   </tr>
</table>
<ul>
<li>Gunakan WeightedRanker untuk memberikan bobot pada hasil pencarian gambar dan teks. Misalkan bobot untuk pencarian gambar ANN adalah 0,6 dan bobot untuk pencarian teks adalah 0,4.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Skor (gambar)</strong></p></th>
     <th><p><strong>Skor (teks)</strong></p></th>
     <th><p><strong>Skor Tertimbang</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
     <td><p>0.87</p></td>
     <td><p>0.6×0.92+0.4×0.87=0.90</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
     <td><p>N/A</p></td>
     <td><p>0.6×0.88+0.4×0=0.528</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
     <td><p>N/A</p></td>
     <td><p>0.6×0.85+0.4×0=0.51</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
     <td><p>0.91</p></td>
     <td><p>0.6×0.83+0.4×0.91=0.86</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.80</p></td>
     <td><p>0.82</p></td>
     <td><p>0.6×0.80+0.4×0.82=0.81</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>Tidak ada dalam gambar</p></td>
     <td><p>0.85</p></td>
     <td><p>0.6×0+0.4×0.85=0.34</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>Tidak ada dalam Gambar</p></td>
     <td><p>0.78</p></td>
     <td><p>0.6×0+0.4×0.78=0.312</p></td>
   </tr>
</table>
<ul>
<li>Hasil akhir setelah pemeringkatan ulang (topK = 5):: Hasil akhir</li>
</ul>
<table>
   <tr>
     <th><p><strong>Peringkat</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Skor Akhir</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.90</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>198</p></td>
     <td><p>0.86</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>175</p></td>
     <td><p>0.81</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>203</p></td>
     <td><p>0.528</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>150</p></td>
     <td><p>0.51</p></td>
   </tr>
</table>
<h3 id="Usage-of-WeightedRanker" class="common-anchor-header">Penggunaan WeightedRanker</h3><p>Ketika menggunakan strategi WeightedRanker, Anda perlu memasukkan nilai bobot. Jumlah nilai bobot yang harus dimasukkan harus sesuai dengan jumlah permintaan pencarian ANN dasar dalam Pencarian Hibrida. Nilai bobot input harus berada di kisaran [0,1], dengan nilai yang lebih dekat ke 1 menunjukkan kepentingan yang lebih besar.</p>
<p>Sebagai contoh, misalkan ada dua permintaan pencarian ANN dasar dalam Pencarian Hibrida: pencarian teks dan pencarian gambar. Jika pencarian teks dianggap lebih penting, maka harus diberi bobot yang lebih besar.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

rerank= WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>) 
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;

<span class="hljs-type">WeightedRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

reranker := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;ws&quot;,
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="RRFRanker" class="common-anchor-header">RRFRanker<button data-href="#RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>Reciprocal Rank Fusion (RRF) adalah metode fusi data yang menggabungkan daftar peringkat berdasarkan kebalikan dari peringkat mereka. Strategi pemeringkatan ulang ini secara efektif menyeimbangkan pentingnya setiap jalur pencarian vektor.</p>
<h3 id="Mechanism-of-RRFRanker" class="common-anchor-header">Mekanisme RRFRanker</h3><p>Alur kerja utama dari strategi RRFRanker adalah sebagai berikut:</p>
<ol>
<li><p><strong>Kumpulkan Peringkat Pencarian</strong>: Kumpulkan peringkat hasil dari setiap jalur pencarian vektor (peringkat_1, peringkat_2).</p></li>
<li><p><strong>Gabungkan Peringkat</strong>: Mengkonversi peringkat dari setiap jalur (rank_rrf_1, rank_rrf_2) sesuai dengan rumus .</p>
<p>Rumus perhitungan melibatkan <em>N</em>, yang merepresentasikan jumlah pengambilan. <em>ranki</em><em>(d</em>) adalah posisi peringkat dokumen <em>d</em> yang dihasilkan oleh pengambil <em>ke-i</em>. <em>k</em> adalah parameter penghalus yang biasanya disetel pada angka 60.</p></li>
<li><p><strong>Peringkat Agregat</strong>: Beri peringkat ulang hasil pencarian berdasarkan peringkat gabungan untuk menghasilkan hasil akhir.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/RRF-reranker.png" alt="RRF Reranker" class="doc-image" id="rrf-reranker" />
   </span> <span class="img-wrapper"> <span>Perangking Ulang RRF</span> </span></p>
<h3 id="Example-of-RRFRanker" class="common-anchor-header">Contoh Perangking RRFR</h3><p>Contoh ini mendemonstrasikan Pencarian Hibrida (topK = 5) pada vektor yang jarang dan mengilustrasikan bagaimana strategi RRFRanker memberi peringkat ulang hasil dari dua pencarian ANN.</p>
<ul>
<li>Hasil pencarian ANN pada vektor teks yang jarang (topK=5): Hasil pencarian ANN pada vektor teks yang jarang (topK=5)</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Peringkat (jarang)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>Hasil pencarian ANN pada vektor teks yang padat (topK=5): Hasil pencarian ANN pada vektor teks yang padat (topK=5)</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Peringkat (padat)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>Gunakan RRF untuk mengatur ulang peringkat dari dua set hasil pencarian. Asumsikan bahwa parameter perataan <code translate="no">k</code> ditetapkan pada 60.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Skor (Jarang)</strong></p></th>
     <th><p><strong>Skor (Padat)</strong></p></th>
     <th><p><strong>Skor Akhir</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
     <td><p>2</p></td>
     <td><p>1/(60+1)+1/(60+2) = 0.01639</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
     <td><p>1</p></td>
     <td><p>1/(60+4)+1/(60+1) = 0.01593</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
     <td><p>4</p></td>
     <td><p>1/(60+5)+1/(60+4) = 0.01554</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
     <td><p>N/A</p></td>
     <td><p>1/(60+2) = 0.01613</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
     <td><p>N/A</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>N/A</p></td>
     <td><p>3</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>N/A</p></td>
     <td><p>5</p></td>
     <td><p>1/(60+5) = 0.01554</p></td>
   </tr>
</table>
<ul>
<li>Hasil akhir setelah pemeringkatan ulang (topK = 5):: Hasil akhir</li>
</ul>
<table>
   <tr>
     <th><p><strong>Peringkat</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Skor Akhir</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.01639</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>203</p></td>
     <td><p>0.01613</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>198</p></td>
     <td><p>0.01593</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>150</p></td>
     <td><p>0.01587</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>110</p></td>
     <td><p>0.01587</p></td>
   </tr>
</table>
<h3 id="Usage-of-RRFRanker" class="common-anchor-header">Penggunaan RRFRanker</h3><p>Saat menggunakan strategi pemeringkatan ulang RRF, Anda perlu mengonfigurasi parameter <code translate="no">k</code>. Ini adalah parameter perataan yang secara efektif dapat mengubah bobot relatif pencarian teks lengkap versus pencarian vektor. Nilai default dari parameter ini adalah 60, dan dapat disesuaikan dalam kisaran (0, 16384). Nilainya harus berupa angka floating-point. Nilai yang disarankan adalah antara [10, 100]. Meskipun <code translate="no">k=60</code> adalah pilihan umum, nilai <code translate="no">k</code> yang optimal dapat bervariasi tergantung pada aplikasi dan kumpulan data spesifik Anda. Kami menyarankan untuk menguji dan menyesuaikan parameter ini berdasarkan kasus penggunaan spesifik Anda untuk mencapai kinerja terbaik.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

ranker = RRFRanker(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;

<span class="hljs-type">RRFRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">reranker := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;rerank&quot;</span>: {
    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;k&quot;</span>: 100
    }
}
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;rrf&quot;,
        &quot;params&quot;: {&quot;k&quot;: 100}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Select-the-right-reranking-strategy" class="common-anchor-header">Pilih strategi perankingan ulang yang tepat<button data-href="#Select-the-right-reranking-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Saat memilih strategi perankingan ulang, satu hal yang perlu dipertimbangkan adalah apakah ada penekanan untuk satu atau lebih pencarian ANN dasar pada bidang vektor.</p>
<ul>
<li><p><strong>Pemeringkat tertimbang</strong>: Strategi ini direkomendasikan jika Anda memerlukan hasil untuk menekankan bidang vektor tertentu. WeightedRanker memungkinkan Anda untuk memberikan bobot yang lebih tinggi pada bidang vektor tertentu, sehingga lebih menekankannya. Misalnya, dalam pencarian multimodal, deskripsi tekstual dari sebuah gambar mungkin dianggap lebih penting daripada warna pada gambar tersebut.</p></li>
<li><p><strong>RRFRanker (Reciprocal Rank Fusion Ranker)</strong>: Strategi ini direkomendasikan apabila tidak ada penekanan khusus. RRF dapat secara efektif menyeimbangkan pentingnya setiap bidang vektor.</p></li>
</ul>
