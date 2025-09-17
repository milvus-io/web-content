---
id: model-ranker-overview.md
title: Ikhtisar Pemeringkat ModelCompatible with Milvus 2.6.x
summary: >-
  Pencarian vektor tradisional mengurutkan hasil pencarian berdasarkan kemiripan
  matematis-seberapa dekat vektor-vektor tersebut cocok dalam ruang dimensi
  tinggi. Meskipun efisien, pendekatan ini sering kali melewatkan relevansi
  semantik yang sebenarnya. Pertimbangkan untuk mencari "praktik terbaik untuk
  pengoptimalan basis data": Anda mungkin menerima dokumen dengan kemiripan
  vektor yang tinggi yang sering menyebutkan istilah-istilah ini, tetapi tidak
  benar-benar memberikan strategi pengoptimalan yang dapat ditindaklanjuti.
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">Ikhtisar Pemeringkat Model<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Pencarian vektor tradisional memberi peringkat hasil murni berdasarkan kemiripan matematis-seberapa dekat vektor cocok dalam ruang dimensi tinggi. Meskipun efisien, pendekatan ini sering kali melewatkan relevansi semantik yang sebenarnya. Pertimbangkan untuk mencari <strong>"praktik terbaik untuk pengoptimalan basis data":</strong> Anda mungkin menerima dokumen dengan kemiripan vektor yang tinggi yang sering menyebutkan istilah-istilah ini, tetapi tidak benar-benar memberikan strategi pengoptimalan yang dapat ditindaklanjuti.</p>
<p>Model Ranker mengubah pencarian Milvus dengan mengintegrasikan model bahasa tingkat lanjut yang memahami hubungan semantik antara kueri dan dokumen. Alih-alih hanya mengandalkan kemiripan vektor, model ini mengevaluasi makna dan konteks konten untuk memberikan hasil yang lebih cerdas dan relevan.</p>
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
<li><p>Pemeringkat model tidak dapat digunakan dengan pencarian pengelompokan.</p></li>
<li><p>Bidang yang digunakan untuk pemeringkatan model harus berupa teks (<code translate="no">VARCHAR</code>).</p></li>
<li><p>Setiap pemeringkat model hanya dapat menggunakan satu bidang <code translate="no">VARCHAR</code> dalam satu waktu untuk evaluasi.</p></li>
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
    </button></h2><p>Pemeringkat model mengintegrasikan kemampuan pemahaman model bahasa ke dalam proses pencarian Milvus melalui alur kerja yang terdefinisi dengan baik:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" />
   </span> <span class="img-wrapper"> <span>Gambaran Umum Pemeringkat Model</span> </span></p>
<ol>
<li><p><strong>Kueri awal</strong>: Aplikasi Anda mengirimkan kueri ke Milvus</p></li>
<li><p><strong>Pencarian vektor</strong>: Milvus melakukan pencarian vektor standar untuk mengidentifikasi dokumen kandidat</p></li>
<li><p><strong>Pengambilan kandidat</strong>: Sistem mengidentifikasi kumpulan awal dokumen kandidat berdasarkan kesamaan vektor</p></li>
<li><p><strong>Evaluasi model</strong>: Fungsi Pemeringkat Model memproses pasangan kueri-dokumen:</p>
<ul>
<li><p>Mengirimkan kueri asli dan dokumen kandidat ke layanan model eksternal</p></li>
<li><p>Model bahasa mengevaluasi relevansi semantik antara kueri dan setiap dokumen</p></li>
<li><p>Setiap dokumen menerima skor relevansi berdasarkan pemahaman semantik</p></li>
</ul></li>
<li><p><strong>Pemeringkatan ulang yang cerdas</strong>: Dokumen disusun ulang berdasarkan skor relevansi yang dihasilkan model</p></li>
<li><p><strong>Hasil yang disempurnakan</strong>: Aplikasi Anda menerima hasil yang diberi peringkat berdasarkan relevansi semantik, bukan hanya kesamaan vektor</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">Pilih penyedia model untuk kebutuhan Anda<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mendukung penyedia layanan model berikut untuk pemeringkatan ulang, masing-masing dengan karakteristik yang berbeda:</p>
<table>
   <tr>
     <th><p>Penyedia</p></th>
     <th><p>Terbaik untuk</p></th>
     <th><p>Karakteristik</p></th>
     <th><p>Contoh Kasus Penggunaan</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>Aplikasi kompleks yang membutuhkan pemahaman dan penyesuaian semantik yang mendalam</p></td>
     <td><ul>
<li><p>Mendukung berbagai model bahasa besar</p></li>
<li><p>Opsi penerapan yang fleksibel</p></li>
<li><p>Persyaratan komputasi yang lebih tinggi</p></li>
<li><p>Potensi penyesuaian yang lebih besar</p></li>
</ul></td>
     <td><p>Platform penelitian hukum yang menerapkan model khusus domain yang memahami terminologi hukum dan hubungan hukum kasus</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>Implementasi cepat dengan penggunaan sumber daya yang efisien</p></td>
     <td><ul>
<li><p>Layanan ringan yang dioptimalkan untuk operasi teks</p></li>
<li><p>Penerapan yang lebih mudah dengan kebutuhan sumber daya yang lebih rendah</p></li>
<li><p>Model pemeringkatan ulang yang telah dioptimalkan sebelumnya</p></li>
<li><p>Biaya overhead infrastruktur minimal</p></li>
</ul></td>
     <td><p>Sistem manajemen konten yang membutuhkan kemampuan pemeringkatan ulang yang efisien dengan persyaratan standar</p></td>
   </tr>
   <tr>
     <td><p>Cohere</p></td>
     <td><p>Aplikasi perusahaan yang memprioritaskan keandalan dan kemudahan integrasi</p></td>
     <td><ul>
<li><p>Keandalan dan skalabilitas tingkat perusahaan</p></li>
<li><p>Layanan terkelola tanpa pemeliharaan infrastruktur</p></li>
<li><p>Kemampuan pemeringkatan ulang multibahasa</p></li>
<li><p>Pembatasan tarif bawaan dan penanganan kesalahan</p></li>
</ul></td>
     <td><p>Platform e-commerce yang membutuhkan pencarian dengan ketersediaan tinggi dengan kinerja API yang konsisten dan katalog produk multibahasa</p></td>
   </tr>
   <tr>
     <td><p>Voyage AI</p></td>
     <td><p>Aplikasi RAG dengan persyaratan kinerja dan konteks yang spesifik</p></td>
     <td><ul>
<li><p>Model yang secara khusus dilatih untuk tugas pemeringkatan ulang</p></li>
<li><p>Kontrol pemotongan granular untuk panjang dokumen yang beragam</p></li>
<li><p>Inferensi yang dioptimalkan untuk beban kerja produksi</p></li>
<li><p>Berbagai varian model (rerank-2, rerank-lite, dll.)</p></li>
</ul></td>
     <td><p>Basis data penelitian dengan panjang dokumen yang bervariasi yang membutuhkan kontrol kinerja yang disesuaikan dengan baik dan pemahaman semantik khusus</p></td>
   </tr>
   <tr>
     <td><p>SiliconFlow</p></td>
     <td><p>Aplikasi yang memproses dokumen panjang dengan prioritas efektivitas biaya</p></td>
     <td><ul>
<li><p>Pemenggalan dokumen tingkat lanjut dengan tumpang tindih yang dapat dikonfigurasi</p></li>
<li><p>Penilaian berbasis potongan (potongan dengan nilai tertinggi mewakili dokumen)</p></li>
<li><p>Dukungan untuk beragam model pemeringkatan ulang</p></li>
<li><p>Hemat biaya dengan varian model standar dan pro</p></li>
</ul></td>
     <td><p>Sistem pencarian dokumentasi teknis yang memproses manual dan dokumen panjang yang membutuhkan segmentasi cerdas dan kontrol tumpang tindih</p></td>
   </tr>
</table>
<p>Untuk informasi rinci tentang implementasi setiap layanan model, lihat dokumentasi khusus:</p>
<ul>
<li><p><a href="/docs/id/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/id/tei-ranker.md">Pemeringkat TEI</a></p></li>
<li><p><a href="/docs/id/cohere-ranker.md">Cohere Ranker</a></p></li>
<li><p><a href="/docs/id/voyage-ai-ranker.md">Voyage AI Ranker</a></p></li>
<li><p><a href="/docs/id/siliconflow-ranker.md">Pemeringkat SiliconFlow</a></p></li>
</ul>
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
    </button></h2><p>Sebelum mengimplementasikan Model Ranker, pastikan Anda memiliki:</p>
<ul>
<li><p>Koleksi Milvus dengan bidang <code translate="no">VARCHAR</code> yang berisi teks yang akan diperingkat</p></li>
<li><p>Layanan model eksternal yang sedang berjalan yang dapat diakses oleh instance Milvus Anda</p></li>
<li><p>Konektivitas jaringan yang sesuai antara Milvus dan layanan model yang Anda pilih</p></li>
</ul>
<p>Pemeringkat model terintegrasi secara mulus dengan pencarian vektor standar dan operasi pencarian hibrida. Implementasinya melibatkan pembuatan objek Function yang mendefinisikan konfigurasi pemeringkatan Anda dan meneruskannya ke operasi pencarian.</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">Membuat pemeringkat model<button data-href="#Create-a-model-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk mengimplementasikan pemeringkatan model, pertama-tama tentukan objek Function dengan konfigurasi yang sesuai. Dalam contoh ini, kita menggunakan TEI sebagai penyedia layanan:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
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
     <th><p>Diperlukan?</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Nilai / Contoh</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Pengenal untuk fungsi Anda yang digunakan saat menjalankan pencarian.</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Nama bidang teks yang akan digunakan untuk pemeringkatan ulang. Harus berupa bidang tipe <code translate="no">VARCHAR</code>.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Menentukan jenis fungsi yang sedang dibuat. Harus disetel ke <code translate="no">RERANK</code> untuk semua pemeringkat model.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Kamus yang berisi konfigurasi untuk fungsi pemeringkatan ulang berbasis model. Parameter (kunci) yang tersedia bervariasi tergantung pada penyedia layanan.</p></td>
     <td><p>{...}</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Harus diatur ke <code translate="no">"model"</code> untuk mengaktifkan pemeringkatan ulang model.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Penyedia layanan model yang akan digunakan untuk pemeringkatan ulang.</p></td>
     <td><p><code translate="no">"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Daftar string kueri yang digunakan oleh model pemeringkatan ulang untuk menghitung skor relevansi. Jumlah string kueri harus sama persis dengan jumlah kueri dalam operasi pencarian Anda (meskipun menggunakan vektor kueri, bukan teks), jika tidak, kesalahan akan dilaporkan.</p></td>
     <td><p><em>["kueri penelusuran"]</em></p></td>
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
     <td><p>Jumlah maksimum dokumen yang akan diproses dalam satu batch. Nilai yang lebih besar meningkatkan hasil tetapi membutuhkan lebih banyak memori.</p></td>
     <td><p><code translate="no">32</code> (default)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Menerapkan ke pencarian vektor standar<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Setelah mendefinisikan pemeringkat model Anda, Anda dapat menerapkannya selama operasi pencarian dengan meneruskannya ke parameter pemeringkat:</p>
<div class="multipleCode">
   <a href="#bash">cURL</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>], <span class="hljs-comment"># Number of queries must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
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
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Terapkan ke pencarian hibrida<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Pemeringkat model juga dapat diterapkan pada operasi pencarian hibrida yang menggabungkan beberapa bidang vektor:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply model ranker to hybrid search</span>
hybrid_results = client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Same model ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
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
