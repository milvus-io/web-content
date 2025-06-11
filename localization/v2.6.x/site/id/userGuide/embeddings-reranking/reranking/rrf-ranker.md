---
id: rrf-ranker.md
title: Pemeringkat RRF
summary: >-
  Reciprocal Rank Fusion (RRF) Ranker adalah strategi pemeringkatan ulang untuk
  pencarian hibrida Milvus yang menyeimbangkan hasil dari beberapa jalur
  pencarian vektor berdasarkan posisi peringkatnya, bukan nilai kemiripannya.
  Seperti turnamen olahraga yang mempertimbangkan peringkat pemain daripada
  statistik individu, RRF Ranker menggabungkan hasil pencarian berdasarkan
  seberapa tinggi peringkat setiap item di jalur pencarian yang berbeda,
  menciptakan peringkat akhir yang adil dan seimbang.
---
<h1 id="RRF-Ranker" class="common-anchor-header">Pemeringkat RRF<button data-href="#RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Reciprocal Rank Fusion (RRF) Ranker adalah strategi pemeringkatan ulang untuk pencarian hibrida Milvus yang menyeimbangkan hasil dari beberapa jalur pencarian vektor berdasarkan posisi peringkatnya, bukan nilai kemiripannya. Seperti turnamen olahraga yang mempertimbangkan peringkat pemain daripada statistik individu, RRF Ranker menggabungkan hasil pencarian berdasarkan seberapa tinggi peringkat setiap item di jalur pencarian yang berbeda, menciptakan peringkat akhir yang adil dan seimbang.</p>
<h2 id="When-to-use-RRF-Ranker" class="common-anchor-header">Kapan menggunakan RRF Ranker<button data-href="#When-to-use-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF Ranker dirancang khusus untuk skenario pencarian hibrida di mana Anda ingin menyeimbangkan hasil dari beberapa jalur pencarian vektor tanpa menetapkan bobot kepentingan secara eksplisit. Ini sangat efektif untuk:</p>
<table>
   <tr>
     <th><p>Kasus Penggunaan</p></th>
     <th><p>Contoh</p></th>
     <th><p>Mengapa RRF Ranker Bekerja dengan Baik</p></th>
   </tr>
   <tr>
     <td><p>Pencarian multimodal dengan tingkat kepentingan yang sama</p></td>
     <td><p>Pencarian gambar-teks di mana kedua modalitas sama pentingnya</p></td>
     <td><p>Menyeimbangkan hasil tanpa memerlukan penetapan bobot yang sewenang-wenang</p></td>
   </tr>
   <tr>
     <td><p>Pencarian vektor ensemble</p></td>
     <td><p>Menggabungkan hasil dari model penyematan yang berbeda</p></td>
     <td><p>Menggabungkan peringkat secara demokratis tanpa mengutamakan distribusi penilaian model tertentu</p></td>
   </tr>
   <tr>
     <td><p>Pencarian lintas bahasa</p></td>
     <td><p>Menemukan dokumen dalam berbagai bahasa</p></td>
     <td><p>Memberi peringkat hasil secara adil terlepas dari karakteristik penyematan bahasa tertentu</p></td>
   </tr>
   <tr>
     <td><p>Rekomendasi pakar</p></td>
     <td><p>Menggabungkan rekomendasi dari beberapa sistem pakar</p></td>
     <td><p>Membuat peringkat konsensus ketika sistem yang berbeda menggunakan metode penilaian yang tidak sebanding</p></td>
   </tr>
</table>
<p>Jika aplikasi pencarian hibrida Anda memerlukan penyeimbangan beberapa jalur pencarian secara demokratis tanpa memberikan bobot eksplisit, RRF Ranker adalah pilihan ideal Anda.</p>
<h2 id="Mechanism-of-RRF-Ranker" class="common-anchor-header">Mekanisme RRF Ranker<button data-href="#Mechanism-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Alur kerja utama dari strategi RRFRanker adalah sebagai berikut:</p>
<ol>
<li><p><strong>Kumpulkan Peringkat Pencarian</strong>: Kumpulkan peringkat hasil dari setiap jalur pencarian vektor (peringkat_1, peringkat_2).</p></li>
<li><p><strong>Gabungkan Peringkat</strong>: Mengkonversi peringkat dari setiap jalur (rank_rrf_1, rank_rrf_2) sesuai dengan rumus .</p>
<p>Rumus perhitungan melibatkan <em>N</em>, yang merepresentasikan jumlah pengambilan. <em>ranki</em><em>(d</em>) adalah posisi peringkat dokumen <em>d</em> yang dihasilkan oleh pengambil <em>ke-i</em>. <em>k</em> adalah parameter penghalus yang biasanya disetel pada angka 60.</p></li>
<li><p><strong>Peringkat Agregat</strong>: Beri peringkat ulang hasil pencarian berdasarkan peringkat gabungan untuk menghasilkan hasil akhir.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/rrf-ranker.png" alt="Rrf Ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>Pemeringkat Rrf</span> </span></p>
<h2 id="Example-of-RRF-Ranker" class="common-anchor-header">Contoh Pemeringkat RRF<button data-href="#Example-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh ini mendemonstrasikan Pencarian Hibrida (topK = 5) pada vektor yang jarang dan mengilustrasikan bagaimana strategi RRFRanker memberi peringkat ulang hasil dari dua pencarian ANN.</p>
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
<h2 id="Usage-of-RRF-Ranker" class="common-anchor-header">Penggunaan Pemeringkat RRF<button data-href="#Usage-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Saat menggunakan strategi pemeringkatan ulang RRF, Anda perlu mengonfigurasi parameter <code translate="no">k</code>. Ini adalah parameter perataan yang secara efektif dapat mengubah bobot relatif pencarian teks lengkap versus pencarian vektor. Nilai default dari parameter ini adalah 60, dan dapat disesuaikan dalam kisaran (0, 16384). Nilainya harus berupa angka floating-point. Nilai yang disarankan adalah antara [10, 100]. Meskipun <code translate="no">k=60</code> adalah pilihan umum, nilai <code translate="no">k</code> yang optimal dapat bervariasi tergantung pada aplikasi dan kumpulan data spesifik Anda. Kami merekomendasikan untuk menguji dan menyesuaikan parameter ini berdasarkan kasus penggunaan spesifik Anda untuk mencapai kinerja terbaik.</p>
<h3 id="Create-an-RRF-Ranker" class="common-anchor-header">Membuat Pemeringkat RRF</h3><p>Setelah koleksi Anda diatur dengan beberapa bidang vektor, buatlah RRF Ranker dengan parameter perataan yang sesuai:</p>
<div class="alert note">
<p>Milvus 2.6.x dan yang lebih baru memungkinkan Anda untuk mengonfigurasi strategi pemeringkatan secara langsung melalui API <code translate="no">Function</code>. Jika Anda menggunakan rilis yang lebih lama (sebelum v2.6.0), lihat dokumentasi <a href="https://milvus.io/docs/2.5.x/reranking.md#Reranking">Perangkingan Ulang</a> untuk instruksi pengaturan.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
    name=<span class="hljs-string">&quot;rrf&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>, 
        <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>  <span class="hljs-comment"># Optional</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
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
     <td><p>Pengenal unik untuk Fungsi ini</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Daftar bidang vektor yang akan digunakan untuk menerapkan fungsi (harus kosong untuk Pemeringkat RRF)</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Jenis Fungsi yang akan dipanggil; gunakan <code translate="no">RERANK</code> untuk menentukan strategi pemeringkatan</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Menentukan metode pemeringkatan ulang yang akan digunakan. Harus diatur ke <code translate="no">rrf</code> untuk menggunakan RRF Ranker.</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.k</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Parameter penghalusan yang mengontrol dampak peringkat dokumen; <code translate="no">k</code> yang lebih tinggi mengurangi sensitivitas terhadap peringkat teratas. Rentang: (0, 16384); default: <code translate="no">60</code>. Untuk detailnya, lihat <a href="/docs/id/rrf-ranker.md#Mechanism-of-RRF-Ranker">Mekanisme Pemeringkat RRF</a>.</p></td>
     <td><p><code translate="no">100</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Menerapkan pada pencarian hibrida</h3><p>RRF Ranker dirancang secara khusus untuk operasi pencarian hibrida yang menggabungkan beberapa bidang vektor. Berikut adalah cara menggunakannya dalam pencarian hibrida:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest

<span class="hljs-comment"># Connect to Milvus server</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assume you have a collection setup</span>

<span class="hljs-comment"># Define text vector search request</span>
text_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;modern dining table&quot;</span>],
    anns_field=<span class="hljs-string">&quot;text_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define image vector search request</span>
image_search = AnnSearchRequest(
    data=[image_embedding],  <span class="hljs-comment"># Image embedding vector</span>
    anns_field=<span class="hljs-string">&quot;image_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply RRF Ranker to product hybrid search</span>
<span class="hljs-comment"># The smoothing parameter k controls the balance</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=ranker,  <span class="hljs-comment"># Apply the RRF ranker</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk informasi lebih lanjut tentang pencarian hibrida, lihat <a href="/docs/id/multi-vector-search.md">Pencarian Hibrida Multi-Vektor</a>.</p>
