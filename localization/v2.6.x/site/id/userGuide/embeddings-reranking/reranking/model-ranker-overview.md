---
id: model-ranker-overview.md
title: Gambaran Umum Model RankerCompatible with Milvus 2.6.x
summary: >-
  Pencarian vektor tradisional mengurutkan hasil semata-mata berdasarkan
  kesamaan matematis—seberapa dekat vektor-vektor tersebut cocok di ruang
  berdimensi tinggi. Meskipun efisien, pendekatan ini sering kali mengabaikan
  relevansi semantik yang sesungguhnya. Bayangkan Anda mencari "praktik terbaik
  untuk optimasi basis data": Anda mungkin mendapatkan dokumen dengan kesamaan
  vektor yang tinggi yang sering menyebut istilah-istilah tersebut, tetapi
  sebenarnya tidak memberikan strategi optimasi yang dapat diterapkan.
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">Gambaran Umum Model Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Pencarian vektor tradisional mengurutkan hasil semata-mata berdasarkan kesamaan matematis—seberapa dekat vektor-vektor tersebut cocok dalam ruang berdimensi tinggi. Meskipun efisien, pendekatan ini sering kali melewatkan relevansi semantik yang sesungguhnya. Bayangkan Anda mencari <strong>“praktik terbaik untuk optimasi basis data”:</strong> Anda mungkin menerima dokumen dengan kesamaan vektor tinggi yang sering menyebut istilah-istilah tersebut, tetapi sebenarnya tidak memberikan strategi optimasi yang dapat diterapkan.</p>
<p>Model Ranker mengubah cara kerja pencarian Milvus dengan mengintegrasikan model bahasa canggih yang memahami hubungan semantik antara kueri dan dokumen. Alih-alih hanya mengandalkan kesamaan vektor, Model Ranker mengevaluasi makna dan konteks konten untuk memberikan hasil yang lebih cerdas dan relevan.</p>
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
<li><p>Model Ranker tidak dapat digunakan dengan pencarian berkelompok.</p></li>
<li><p>Kolom yang digunakan untuk penataan ulang model harus berjenis teks (<code translate="no">VARCHAR</code>).</p></li>
<li><p>Setiap Model Ranker hanya dapat menggunakan satu bidang <code translate="no">VARCHAR</code> pada satu waktu untuk evaluasi.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Cara kerjanya<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Model ranker mengintegrasikan kemampuan pemahaman model bahasa ke dalam proses pencarian Milvus melalui alur kerja yang terdefinisi dengan baik:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" /> 
   <span>Gambaran Umum Model Ranker</span>
  
 </span></p>
<ol>
<li><p><strong>Kueri awal</strong>: Aplikasi Anda mengirimkan kueri ke Milvus</p></li>
<li><p><strong>Pencarian vektor</strong>: Milvus melakukan pencarian vektor standar untuk mengidentifikasi dokumen kandidat</p></li>
<li><p><strong>Pengambilan kandidat</strong>: Sistem mengidentifikasi kumpulan awal dokumen kandidat berdasarkan kesamaan vektor</p></li>
<li><p><strong>Evaluasi model</strong>: Fungsi Model Ranker memproses pasangan kueri-dokumen:</p>
<ul>
<li><p>Mengirimkan kueri asli dan dokumen kandidat ke layanan model eksternal</p></li>
<li><p>Model bahasa mengevaluasi relevansi semantik antara kueri dan setiap dokumen</p></li>
<li><p>Setiap dokumen menerima skor relevansi berdasarkan pemahaman semantik</p></li>
</ul></li>
<li><p><strong>Penataan ulang yang cerdas</strong>: Dokumen-dokumen diurutkan ulang berdasarkan skor relevansi yang dihasilkan model</p></li>
<li><p><strong>Hasil yang ditingkatkan</strong>: Aplikasi Anda menerima hasil yang diurutkan berdasarkan relevansi semantik, bukan hanya kemiripan vektor</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">Pilih penyedia model yang sesuai dengan kebutuhan Anda<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mendukung penyedia layanan model berikut untuk pengurutan ulang, masing-masing dengan karakteristik yang berbeda:</p>
<table>
   <tr>
     <th><p>Penyedia</p></th>
     <th><p>Cocok Untuk</p></th>
     <th><p>Karakteristik</p></th>
     <th><p>Contoh Kasus Penggunaan</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>Aplikasi kompleks yang memerlukan pemahaman semantik mendalam dan penyesuaian</p></td>
     <td><ul><li><p>Mendukung berbagai model bahasa besar</p></li><li><p>Opsi penerapan yang fleksibel</p></li><li><p>Persyaratan komputasi yang lebih tinggi</p></li><li><p>Potensi penyesuaian yang lebih besar</p></li></ul></td>
     <td><p>Platform penelitian hukum yang menerapkan model khusus bidang yang memahami terminologi hukum dan hubungan yurisprudensi</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>Implementasi cepat dengan penggunaan sumber daya yang efisien</p></td>
     <td><ul><li><p>Layanan ringan yang dioptimalkan untuk operasi teks</p></li><li><p>Penerapan yang lebih mudah dengan kebutuhan sumber daya yang lebih rendah</p></li><li><p>Model penataan ulang peringkat yang telah dioptimalkan sebelumnya</p></li><li><p>Beban infrastruktur minimal</p></li></ul></td>
     <td><p>Sistem manajemen konten yang membutuhkan kemampuan pengurutan ulang yang efisien dengan persyaratan standar</p></td>
   </tr>
   <tr>
     <td><p>Cohere</p></td>
     <td><p>Aplikasi perusahaan yang mengutamakan keandalan dan kemudahan integrasi</p></td>
     <td><ul><li><p>Keandalan dan skalabilitas tingkat perusahaan</p></li><li><p>Layanan terkelola tanpa pemeliharaan infrastruktur</p></li><li><p>Kemampuan pengurutan ulang multibahasa</p></li><li><p>Pembatasan laju dan penanganan kesalahan bawaan</p></li></ul></td>
     <td><p>Platform e-commerce yang membutuhkan pencarian dengan ketersediaan tinggi, kinerja API yang konsisten, dan katalog produk multibahasa</p></td>
   </tr>
   <tr>
     <td><p>Voyage AI</p></td>
     <td><p>Aplikasi RAG dengan persyaratan kinerja dan konteks tertentu</p></td>
     <td><ul><li><p>Model yang dilatih secara khusus untuk tugas pengurutan ulang</p></li><li><p>Kontrol pemotongan yang terperinci untuk panjang dokumen yang beragam</p></li><li><p>Inferensi yang dioptimalkan untuk beban kerja produksi</p></li><li><p>Varian model yang beragam (rerank-2, rerank-lite, dll.)</p></li></ul></td>
     <td><p>Basis data penelitian dengan panjang dokumen yang bervariasi yang memerlukan kontrol kinerja yang disesuaikan secara halus dan pemahaman semantik khusus</p></td>
   </tr>
   <tr>
     <td><p>SiliconFlow</p></td>
     <td><p>Aplikasi yang memproses dokumen panjang dengan prioritas efisiensi biaya</p></td>
     <td><ul><li><p>Pembagian dokumen tingkat lanjut dengan tumpang tindih yang dapat dikonfigurasi</p></li><li><p>Penilaian berbasis potongan (potongan dengan skor tertinggi mewakili dokumen)</p></li><li><p>Dukungan untuk berbagai model penataan ulang peringkat</p></li><li><p>Hemat biaya dengan varian model standar dan pro</p></li></ul></td>
     <td><p>Sistem pencarian dokumentasi teknis yang memproses manual dan makalah panjang yang memerlukan segmentasi cerdas dan kontrol tumpang tindih</p></td>
   </tr>
</table>
<p>Untuk informasi terperinci mengenai implementasi setiap layanan model, lihat dokumentasi khusus:</p>
<ul>
<li><p><a href="/docs/id/v2.6.x/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/id/v2.6.x/tei-ranker.md">TEI Ranker</a></p></li>
<li><p><a href="/docs/id/v2.6.x/cohere-ranker.md">Cohere Ranker</a></p></li>
<li><p><a href="/docs/id/v2.6.x/voyage-ai-ranker.md">Voyage AI Ranker</a></p></li>
<li><p><a href="/docs/id/v2.6.x/siliconflow-ranker.md">SiliconFlow Ranker</a></p></li>
</ul>
<h2 id="Implementation" class="common-anchor-header">Penerapan<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum mengimplementasikan Model Ranker, pastikan Anda memiliki:</p>
<ul>
<li><p>Sebuah koleksi Milvus dengan kolom " <code translate="no">VARCHAR</code> " yang berisi teks yang akan diurutkan ulang</p></li>
<li><p>Layanan model eksternal yang sedang berjalan dan dapat diakses oleh instance Milvus Anda</p></li>
<li><p>Konektivitas jaringan yang memadai antara Milvus dan layanan model yang Anda pilih</p></li>
</ul>
<p>Model ranker terintegrasi dengan mulus baik dengan operasi pencarian vektor standar maupun operasi pencarian hibrida. Implementasinya melibatkan pembuatan objek Function yang mendefinisikan konfigurasi pengurutan ulang Anda dan meneruskannya ke operasi pencarian.</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">Membuat model ranker<button data-href="#Create-a-model-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk mengimplementasikan penentuan peringkat ulang model, pertama-tama tentukan objek Function dengan konfigurasi yang sesuai. Dalam contoh ini, kami menggunakan TEI sebagai penyedia layanan:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Create a model ranker function</span>
model_ranker = Function(
    name=<span class="hljs-string">&quot;semantic_ranker&quot;</span>,  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># VARCHAR field to use for reranking</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,  <span class="hljs-comment"># Specify model reranker. Must be &quot;model&quot;</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot;, &quot;vllm&quot;, etc.</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.ModelRanker;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">ModelRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> ModelRanker.builder()
        .name(<span class="hljs-string">&quot;semantic_ranker&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .provider(<span class="hljs-string">&quot;tei&quot;</span>)
        .queries(Collections.singletonList(<span class="hljs-string">&quot;machine learning for time series&quot;</span>))
        .endpoint(<span class="hljs-string">&quot;http://model-service:8080&quot;</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Wajib?</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Nilai / Contoh</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Pengidentifikasi untuk fungsi Anda yang digunakan saat melakukan pencarian.</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Nama bidang teks yang akan digunakan untuk penentuan peringkat ulang.</p><p>Harus berupa bidang bertipe " <code translate="no">VARCHAR</code> ".</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Menentukan jenis fungsi yang sedang dibuat.</p><p>Harus diatur ke " <code translate="no">RERANK</code> " untuk semua pemeringkat model.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Sebuah kamus yang berisi konfigurasi untuk fungsi pengurutan ulang berbasis model. Parameter (kunci) yang tersedia bervariasi tergantung pada penyedia layanan.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Harus disetel ke ` <code translate="no">"model"</code> ` untuk mengaktifkan pengurutan ulang berbasis model.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Penyedia layanan model yang akan digunakan untuk pengurutan ulang.</p></td>
     <td><p><code translate="no">"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Daftar string kueri yang digunakan oleh model penentuan peringkat ulang untuk menghitung skor relevansi.</p><p>Jumlah string kueri harus sama persis dengan jumlah kueri dalam operasi pencarian Anda (bahkan saat menggunakan vektor kueri alih-alih teks), jika tidak, akan dilaporkan adanya kesalahan.</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>Ya</p></td>
     <td><p>URL layanan model.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Jumlah maksimum dokumen yang akan diproses dalam satu batch. Nilai yang lebih besar meningkatkan throughput tetapi membutuhkan lebih banyak memori.</p></td>
     <td><p><code translate="no">32</code> (default)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Terapkan ke pencarian vektor standar<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Setelah mendefinisikan model ranker Anda, Anda dapat menggunakannya selama operasi pencarian dengan meneruskannya ke parameter ranker:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Number of query vectors must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;machine learning for time series&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(document))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
