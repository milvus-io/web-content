---
id: cohere.md
title: CohereCompatible with Milvus 2.6.x
summary: >-
  Topik ini menjelaskan cara mengonfigurasi dan menggunakan fungsi penyematan
  Cohere di Milvus.
beta: Milvus 2.6.x
---
<h1 id="Cohere" class="common-anchor-header">Cohere<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Cohere" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini menjelaskan cara mengonfigurasi dan menggunakan fungsi-fungsi penyematan Cohere di Milvus.</p>
<h2 id="Choose-an-embedding-model" class="common-anchor-header">Memilih model penyematan<button data-href="#Choose-an-embedding-model" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mendukung model-model penyematan yang disediakan oleh Cohere. Di bawah ini adalah model-model embedding yang tersedia saat ini untuk referensi cepat:</p>
<table>
   <tr>
     <th><p>Nama Model</p></th>
     <th><p>Dimensi</p></th>
     <th><p>Token Maks</p></th>
     <th><p>Deskripsi</p></th>
   </tr>
   <tr>
     <td><p>embed-english-v3.0</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>Model yang memungkinkan teks diklasifikasikan atau diubah menjadi embedding. Hanya dalam bahasa Inggris.</p></td>
   </tr>
   <tr>
     <td><p>embed-multilingual-v3.0</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>Menyediakan dukungan klasifikasi dan penyematan multibahasa. <a href="https://docs.cohere.com/docs/supported-languages">Lihat bahasa yang didukung di sini</a>.</p></td>
   </tr>
   <tr>
     <td><p>embed-english-light-v3.0</p></td>
     <td><p>384</p></td>
     <td><p>512</p></td>
     <td><p>Versi yang lebih kecil dan lebih cepat dari <code translate="no">embed-english-v3.0</code>. Hampir sama mumpuni, tetapi jauh lebih cepat. Hanya bahasa Inggris.</p></td>
   </tr>
   <tr>
     <td><p>embed-multilingual-light-v3.0</p></td>
     <td><p>384</p></td>
     <td><p>512</p></td>
     <td><p>Versi yang lebih kecil dan lebih cepat dari <code translate="no">embed-multilingual-v3.0</code>. Hampir sama mumpuni, tetapi jauh lebih cepat. Mendukung banyak bahasa.</p></td>
   </tr>
   <tr>
     <td><p>embed-english-v2.0</p></td>
     <td><p>4,096</p></td>
     <td><p>512</p></td>
     <td><p>Model penyematan yang lebih lama yang memungkinkan teks diklasifikasikan atau diubah menjadi penyematan. Hanya dalam bahasa Inggris.</p></td>
   </tr>
   <tr>
     <td><p>embed-english-light-v2.0</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>Versi yang lebih kecil dan lebih cepat dari embed-english-v2.0. Hampir sama mumpuni, tetapi jauh lebih cepat. Hanya bahasa Inggris.</p></td>
   </tr>
   <tr>
     <td><p>embed-multilingual-v2.0</p></td>
     <td><p>768</p></td>
     <td><p>256</p></td>
     <td><p>Menyediakan klasifikasi multibahasa dan dukungan penyematan. <a href="https://docs.cohere.com/docs/supported-languages">Lihat bahasa yang didukung di sini</a>.</p></td>
   </tr>
</table>
<p>Untuk detailnya, lihat <a href="https://docs.cohere.com/docs/cohere-embed">Model Penyematan Cohere.</a></p>
<h2 id="Configure-credentials" class="common-anchor-header">Mengonfigurasi kredensial<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus harus mengetahui kunci API Cohere Anda sebelum dapat meminta penyematan. Milvus menyediakan dua metode untuk mengonfigurasi kredensial:</p>
<ul>
<li><p><strong>File konfigurasi (disarankan):</strong> Simpan kunci API di <code translate="no">milvus.yaml</code> sehingga setiap restart dan node akan mengambilnya secara otomatis.</p></li>
<li><p><strong>Variabel lingkungan:</strong> Menyuntikkan kunci pada waktu penerapan-ideal untuk Docker Compose.</p></li>
</ul>
<p>Pilih salah satu dari dua metode di bawah ini-file konfigurasi lebih mudah dikelola pada bare-metal dan VM, sedangkan rute env-var sesuai dengan alur kerja kontainer.</p>
<div class="alert note">
<p>Jika kunci API untuk penyedia yang sama ada di berkas konfigurasi dan variabel lingkungan, Milvus selalu menggunakan nilai di <code translate="no">milvus.yaml</code> dan mengabaikan variabel lingkungan.</p>
</div>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">Opsi 1: Berkas konfigurasi (disarankan &amp; prioritas lebih tinggi)</h3><p>Simpan kunci API Anda di <code translate="no">milvus.yaml</code>; Milvus membacanya pada saat startup dan mengesampingkan variabel lingkungan apa pun untuk penyedia yang sama.</p>
<ol>
<li><p>**Deklarasikan kunci Anda di bawah <code translate="no">credential:</code></p>
<p>Anda dapat mendaftarkan satu atau banyak kunci API-beri label yang Anda ciptakan dan akan direferensikan nanti.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>Menempatkan kunci API di sini akan membuatnya tetap ada di seluruh proses restart dan memungkinkan Anda untuk mengganti kunci hanya dengan mengubah label.</p></li>
<li><p><strong>Memberi tahu Milvus kunci mana yang akan digunakan untuk panggilan OpenAI</strong></p>
<p>Di dalam berkas yang sama, arahkan penyedia Cohere ke label yang Anda inginkan untuk digunakan.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">cohere:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-comment"># url: https://api.cohere.com/v2/embed   # (optional) custom endpoint</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ini akan mengikat kunci tertentu untuk setiap permintaan yang dikirimkan Milvus ke titik akhir penyematan Cohere.</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Opsi 2: Variabel lingkungan</h3><p>Gunakan metode ini ketika Anda menjalankan Milvus dengan Docker Compose dan lebih memilih untuk menyimpan rahasia dari berkas dan citra.</p>
<p>Milvus akan kembali ke variabel lingkungan hanya jika tidak ada kunci untuk penyedia yang ditemukan di <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>Variabel</p></th>
     <th><p>Diperlukan</p></th>
     <th><p>Deskripsi</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_COHERE_API_KEY</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Kunci API Cohere Anda yang valid.</p></td>
   </tr>
</table>
<p>Dalam berkas <strong>docker-compose.yaml</strong> Anda, tetapkan variabel lingkungan <code translate="no">MILVUSAI_COHERE_API_KEY</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the OpenAI API key inside the container</span>
    <span class="hljs-attr">MILVUSAI_COHERE_API_KEY:</span> <span class="hljs-string">&lt;MILVUSAI_COHERE_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Blok <code translate="no">environment:</code> hanya menyuntikkan kunci ke dalam kontainer Milvus, dan membiarkan OS hos Anda tidak tersentuh. Untuk detailnya, lihat <a href="/docs/id/configure-docker.md#Configure-Milvus-with-Docker-Compose">Mengkonfigurasi Milvus dengan Docker Compose</a>.</p>
<h2 id="Use-embedding-function" class="common-anchor-header">Menggunakan fungsi penyematan<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah kredensial dikonfigurasi, ikuti langkah-langkah berikut untuk mendefinisikan dan menggunakan fungsi penyematan.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Langkah 1: Mendefinisikan bidang skema</h3><p>Untuk menggunakan fungsi penyematan, buat koleksi dengan skema tertentu. Skema ini harus menyertakan setidaknya tiga bidang yang diperlukan:</p>
<ul>
<li><p>Bidang utama yang secara unik mengidentifikasi setiap entitas dalam koleksi.</p></li>
<li><p>Bidang skalar yang menyimpan data mentah yang akan disematkan.</p></li>
<li><p>Bidang vektor yang dicadangkan untuk menyimpan penyematan vektor yang akan dihasilkan oleh fungsi untuk bidang skalar.</p></li>
</ul>
<p>Contoh berikut ini mendefinisikan skema dengan satu bidang skalar <code translate="no">&quot;document&quot;</code> untuk menyimpan data tekstual dan satu bidang vektor <code translate="no">&quot;dense&quot;</code> untuk menyimpan embedding yang akan dihasilkan oleh modul Function. Ingatlah untuk mengatur dimensi vektor (<code translate="no">dim</code>) agar sesuai dengan output dari model penyematan yang Anda pilih.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

<span class="hljs-comment"># Initialize Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

<span class="hljs-comment"># Create a new schema for the collection</span>
schema = client.create_schema()

<span class="hljs-comment"># Add primary field &quot;id&quot;</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Add scalar field &quot;document&quot; for storing textual data</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>)

<span class="hljs-comment"># Add vector field &quot;dense&quot; for storing embeddings.</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the exact output dimension of the embedding model.</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Langkah 2: Menambahkan fungsi embedding ke skema</h3><p>Modul Function di Milvus secara otomatis mengubah data mentah yang disimpan dalam bidang skalar menjadi embedding dan menyimpannya ke dalam bidang vektor yang didefinisikan secara eksplisit.</p>
<p>Contoh di bawah ini menambahkan modul Function (<code translate="no">cohere_func</code>) yang mengubah bidang skalar <code translate="no">&quot;document&quot;</code> menjadi embedding, menyimpan vektor yang dihasilkan dalam bidang vektor <code translate="no">&quot;dense&quot;</code> yang telah didefinisikan sebelumnya.</p>
<p>Setelah Anda mendefinisikan fungsi penyisipan Anda, tambahkan fungsi tersebut ke skema koleksi Anda. Ini menginstruksikan Milvus untuk menggunakan fungsi penyematan yang ditentukan untuk memproses dan menyimpan penyematan dari data teks Anda.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function specifically for embedding model provider</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;cohere_func&quot;</span>,                                 <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,           <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                     <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                       <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                            <span class="hljs-comment"># Provider-specific embedding parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;cohere&quot;</span>,                           <span class="hljs-comment"># Must be set to &quot;cohere&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;embed-english-v3.0&quot;</span>,             <span class="hljs-comment"># Specifies the embedding model to use</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;,               # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;url&quot;: &quot;https://api.cohere.com/v2/embed&quot;,     # Defaults to the official endpoint if omitted</span>
        <span class="hljs-comment"># &quot;truncate&quot;: &quot;NONE&quot;,                           # Specifies how the API will handle inputs longer than the maximum token length.</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Setelah mengonfigurasi fungsi penyematan, lihat <a href="/docs/id/embedding-function-overview.md">Ikhtisar Fungsi</a> untuk panduan tambahan mengenai konfigurasi indeks, contoh penyisipan data, dan operasi pencarian semantik.</p>
