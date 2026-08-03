---
id: hugging-face.md
title: Hugging FaceCompatible with Milvus v2.6.20+
summary: >-
  Topik ini menjelaskan cara menggunakan Penyedia Inferensi Hugging Face yang
  dihosting untuk embedding teks di Milvus.
beta: Milvus v2.6.20+
---
<h1 id="Hugging-Face" class="common-anchor-header">Hugging Face<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.20+</span><button data-href="#Hugging-Face" class="anchor-icon" translate="no">
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
    </button></h1><p>Penggunaan model embedding Hugging Face biasanya mengharuskan aplikasi Anda untuk mengelola kredensial, memanggil model secara terpisah, dan menghasilkan embedding secara konsisten untuk data yang dimasukkan dan kueri pencarian. Dengan Fungsi Embedding Teks, Milvus memanggil <a href="https://huggingface.co/docs/inference-providers/index">Penyedia Inferensi Hugging Face</a> yang dihosting untuk mengubah teks mentah menjadi vektor selama proses penyisipan dan pencarian.</p>
<p>Integrasi ini menggunakan router Hugging Face yang dihosting. Untuk menghubungkan Milvus ke layanan Text Embeddings Inference (TEI) yang diimplementasikan secara terpisah, lihat <a href="/docs/id/v2.6.x/hugging-face-tei.md">Hugging Face TEI</a>.</p>
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
<li>Kolom keluaran Fungsi harus menggunakan tipe data ` <code translate="no">FLOAT_VECTOR</code> `. Embedding Hugging Face di Milvus tidak mendukung kolom keluaran ` <code translate="no">INT8_VECTOR</code>`, ` <code translate="no">BINARY_VECTOR</code>`, ` <code translate="no">FLOAT16_VECTOR</code>`, atau ` <code translate="no">BFLOAT16_VECTOR</code> `.</li>
<li>Dimensi bidang keluaran Fungsi harus sesuai dengan dimensi keluaran model yang dipilih.</li>
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/hugging-face-embedding-flow.png" alt="Hugging Face text embedding workflow" class="doc-image" id="hugging-face-text-embedding-workflow" /> 
   <span>Alur kerja embedding teks Hugging Face</span>
  
 </span></p>
<p>Alur kerja ini memiliki tiga tahap:</p>
<ol>
<li><strong>Kirim teks mentah.</strong> Aplikasi Anda menyediakan teks mentah dalam permintaan penyisipan atau pencarian.</li>
<li><strong>Menghasilkan embedding.</strong> Fungsi Text Embedding mengirimkan teks melalui <code translate="no">hf-inference</code> ke pipa Hugging Face <code translate="no">feature-extraction</code>. Fungsi ini menggunakan <code translate="no">model_name</code> untuk memilih model dan dapat meneruskan opsi inferensi yang didukung seperti normalisasi dan pemotongan.</li>
<li><strong>Gunakan embedding.</strong> Hugging Face mengembalikan satu embedding bilangan floating-point per teks masukan. Selama proses penyisipan, Milvus menyimpan vektor tersebut di bidang keluaran Fungsi. Selama proses pencarian, Milvus menggunakan vektor tersebut sebagai vektor kueri.</li>
</ol>
<p>Konfigurasi Fungsi yang sama menangani penyisipan dan pencarian, sehingga model dan parameter inferensi tetap konsisten di kedua operasi tersebut.</p>
<h2 id="Before-you-start" class="common-anchor-header">Sebelum Anda mulai<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum menggunakan embedding teks Hugging Face yang dihosting, pastikan Anda memiliki:</p>
<ul>
<li>Milvus 2.6.20 atau yang lebih baru dalam lini rilis 2.6.</li>
<li>PyMilvus 2.6.16 atau yang lebih baru.</li>
<li>Token Akses Pengguna Hugging Face yang dapat memanggil Penyedia Inferensi.</li>
<li>Model yang saat ini disediakan oleh <code translate="no">hf-inference</code> untuk <a href="https://huggingface.co/docs/inference-providers/en/tasks/feature-extraction"><code translate="no">feature-extraction</code></a> tugas tersebut.</li>
</ul>
<div class="alert note">
<p>Milvus tidak mengontrol apakah model Hugging Face tetap tersedia melalui <code translate="no">hf-inference</code>, atau apakah model tersebut memenuhi persyaratan stabilitas, latensi, dan kualitas keluaran Anda. Verifikasi model di Hugging Face dan evaluasi model tersebut untuk beban kerja Anda sebelum menggunakannya dalam produksi.</p>
</div>
<p>Contoh-contoh ini menggunakan <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2"><code translate="no">sentence-transformers/all-MiniLM-L6-v2</code></a>, yang menghasilkan embedding berdimensi 384. Model ini hanya digunakan untuk mendemonstrasikan konfigurasi dan bukan merupakan rekomendasi atau sertifikasi dari Milvus.</p>
<h2 id="Configure-credentials" class="common-anchor-header">Konfigurasikan kredensial<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus memerlukan Token Akses Pengguna Hugging Face untuk memanggil router yang dihosting. Anda dapat mengonfigurasi token tersebut di <code translate="no">milvus.yaml</code> atau melalui variabel lingkungan.</p>
<p>Urutan prioritas kredensial adalah:</p>
<pre><code translate="no" class="language-text">Function credential label -&gt; provider credential label in milvus.yaml -&gt; environment variable
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-1-Configuration-file" class="common-anchor-header">Opsi 1: Berkas konfigurasi<button data-href="#Option-1-Configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Tentukan token di bawah bagian tingkat atas <code translate="no">credential</code> pada <code translate="no">milvus.yaml</code>, lalu arahkan penyedia embedding Hugging Face ke label kredensial tersebut:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">huggingface_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">huggingface:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">huggingface_apikey</span>
        <span class="hljs-comment"># url: https://router.huggingface.co</span>
<button class="copy-code-btn"></button></code></pre>
<p>Anda juga dapat mengatur ` <code translate="no">credential</code> ` di parameter Fungsi. Nilainya harus berupa label yang didefinisikan di bagian tingkat atas ` <code translate="no">credential</code> `, bukan token itu sendiri. Label kredensial tingkat Fungsi memiliki prioritas lebih tinggi daripada label tingkat penyedia.</p>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Opsi 2: Variabel lingkungan<button data-href="#Option-2-Environment-variable" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika baik konfigurasi Fungsi maupun penyedia tidak menentukan label kredensial, Milvus akan membaca token dari ` <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code>`.</p>
<p>Untuk Docker Compose, atur variabel tersebut di layanan Milvus standalone:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-attr">MILVUS_HUGGINGFACE_API_KEY:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk detail tentang penerapan pengaturan Docker Compose, lihat <a href="/docs/id/v2.6.x/configure-docker.md">Konfigurasi Milvus dengan Docker Compose</a>.</p>
<h2 id="Use-Hugging-Face-text-embedding" class="common-anchor-header">Gunakan embedding teks Hugging Face<button data-href="#Use-Hugging-Face-text-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Create-a-collection-with-a-Text-Embedding-Function" class="common-anchor-header">Langkah 1: Buat koleksi dengan Fungsi Embedding Teks<button data-href="#Step-1-Create-a-collection-with-a-Text-Embedding-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>Buat skema dengan bidang utama, bidang masukan " <code translate="no">VARCHAR</code> ", dan bidang keluaran " <code translate="no">FLOAT_VECTOR</code> ". Dimensi keluaran harus sesuai dengan model yang dipilih.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;hugging_face_embedding_demo&quot;</span>
schema = client.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">False</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;document&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">9000</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">384</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Tentukan Fungsi " <code translate="no">TEXTEMBEDDING</code> " yang menulis embedding dari " <code translate="no">document</code> " ke " <code translate="no">dense</code>":</p>
<pre><code translate="no" class="language-python">text_embedding_function = Function(
    name=<span class="hljs-string">&quot;hugging_face_embedding&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],
    function_type=FunctionType.TEXTEMBEDDING,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;huggingface&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;hf_provider&quot;</span>: <span class="hljs-string">&quot;hf-inference&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;huggingface_apikey&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;normalize&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;truncate&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    },</span>
)

schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<p>Jika Anda hanya menggunakan kredensial tingkat penyedia atau variabel lingkungan, abaikan " <code translate="no">credential</code> " dari parameter Fungsi.</p>
<p>Konfigurasikan indeks untuk bidang keluaran, lalu buat koleksi:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Tabel berikut menjelaskan parameter Fungsi khusus Hugging Face:</p>
<table>
<thead>
<tr><th>Parameter</th><th>Wajib?</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">provider</code></td><td>Ya</td><td>Penyedia model embedding. Tetapkan nilai ini ke <code translate="no">huggingface</code>.</td></tr>
<tr><td><code translate="no">model_name</code></td><td>Ya</td><td>ID model Hugging Face untuk model yang disajikan melalui <code translate="no">hf-inference</code> untuk tugas <code translate="no">feature-extraction</code>.</td></tr>
<tr><td><code translate="no">hf_provider</code></td><td>Tidak</td><td>Rute Penyedia Inferensi Hugging Face. Nilai default dan satu-satunya yang didukung di Milvus 2.6.20 adalah <code translate="no">hf-inference</code>.</td></tr>
<tr><td><code translate="no">credential</code></td><td>Tidak</td><td>Label kredensial yang didefinisikan di bagian tingkat atas <code translate="no">credential</code> dari <code translate="no">milvus.yaml</code>. Nilai ini bukanlah token itu sendiri.</td></tr>
<tr><td><code translate="no">normalize</code></td><td>Tidak</td><td>Apakah Hugging Face harus mengembalikan embedding yang dinormalisasi. Nilai yang didukung adalah <code translate="no">true</code> dan <code translate="no">false</code>. Jika diabaikan, Milvus tidak akan menetapkan opsi ini dalam permintaan.</td></tr>
<tr><td><code translate="no">prompt_name</code></td><td>Tidak</td><td>Nama prompt yang didefinisikan dalam konfigurasi Sentence Transformers pada model yang dipilih.</td></tr>
<tr><td><code translate="no">truncate</code></td><td>Tidak</td><td>Apakah Hugging Face harus memotong input yang melebihi panjang yang didukung oleh model. Nilai yang didukung adalah <code translate="no">true</code> dan <code translate="no">false</code>.</td></tr>
<tr><td><code translate="no">truncation_direction</code></td><td>Tidak</td><td>Arah pemotongan input oleh Hugging Face. Nilai yang didukung adalah <code translate="no">left</code> dan <code translate="no">right</code>.</td></tr>
<tr><td><code translate="no">max_client_batch_size</code></td><td>Tidak</td><td>Jumlah maksimum teks masukan yang dikirim dalam satu permintaan Hugging Face. Nilai defaultnya adalah <code translate="no">128</code>, dan nilainya harus lebih besar dari <code translate="no">0</code>.</td></tr>
</tbody>
</table>
<h3 id="Step-2-Insert-raw-text" class="common-anchor-header">Langkah 2: Masukkan teks mentah<button data-href="#Step-2-Insert-raw-text" class="anchor-icon" translate="no">
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
    </button></h3><p>Masukkan teks tanpa menyertakan vektor. Milvus memanggil Hugging Face dan menulis embedding yang dihasilkan ke <code translate="no">dense</code>.</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span>,
        },
    ],
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Search-with-raw-text" class="common-anchor-header">Langkah 3: Pencarian dengan teks mentah<button data-href="#Step-3-Search-with-raw-text" class="anchor-icon" translate="no">
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
    </button></h3><p>Lakukan pencarian dengan kueri teks. Milvus menerapkan konfigurasi Fungsi yang sama untuk membuat vektor kueri sebelum menjalankan pencarian vektor.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<p>Hasilnya berisi dokumen-dokumen yang paling relevan dengan teks kueri, diurutkan berdasarkan kesamaan kosinus.</p>
<h2 id="Troubleshooting" class="common-anchor-header">Pemecahan Masalah<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="The-model-is-unavailable-for-feature-extraction" class="common-anchor-header">Model tidak tersedia untuk ekstraksi fitur<button data-href="#The-model-is-unavailable-for-feature-extraction" class="anchor-icon" translate="no">
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
    </button></h3><p>Buka halaman model di Hugging Face dan periksa bagian " <strong>Inference Providers</strong> ". Pastikan " <code translate="no">hf-inference</code> " menyediakan model untuk " <code translate="no">feature-extraction</code>". Jika tidak, pilih model lain dan perbarui dimensi bidang vektor jika diperlukan.</p>
<h3 id="The-returned-vector-dimension-does-not-match-the-field" class="common-anchor-header">Dimensi vektor yang dikembalikan tidak sesuai dengan bidang<button data-href="#The-returned-vector-dimension-does-not-match-the-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Periksa dimensi keluaran model dan bandingkan dengan <code translate="no">dim</code> pada bidang Keluaran Fungsi. Milvus menolak respons yang dimensi vektornya berbeda dari dimensi bidang <code translate="no">FLOAT_VECTOR</code>.</p>
<h3 id="Milvus-reports-missing-Hugging-Face-credentials" class="common-anchor-header">Milvus melaporkan kredensial Hugging Face yang hilang<button data-href="#Milvus-reports-missing-Hugging-Face-credentials" class="anchor-icon" translate="no">
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
    </button></h3><p>Pastikan label kredensial Fungsi ada di bagian <code translate="no">credential</code> tingkat atas, bahwa label tingkat penyedia valid, atau bahwa <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> ada di lingkungan layanan Milvus.</p>
<h2 id="Next-steps" class="common-anchor-header">Langkah selanjutnya<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li>Untuk konsep umum Function dan perilaku penyisipan/pencarian, lihat <a href="/docs/id/v2.6.x/embedding-function-overview.md">Ikhtisar Fungsi Embedding</a>.</li>
<li>Untuk melakukan peringkat ulang kandidat pencarian vektor dengan skor kesamaan kalimat Hugging Face yang dihosting, lihat <a href="/docs/id/v2.6.x/hugging-face-ranker.md">Hugging Face Ranker</a>.</li>
</ul>
