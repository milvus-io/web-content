---
id: embedding-function-overview.md
title: Ikhtisar Fungsi PenyematanCompatible with Milvus 2.6.x
summary: >-
  Modul Function di Milvus memungkinkan Anda untuk mengubah data teks mentah
  menjadi penyematan vektor dengan secara otomatis memanggil penyedia model
  eksternal (seperti OpenAI, AWS Bedrock, Google Vertex AI, dll.). Dengan modul
  Function, Anda tidak perlu lagi berinteraksi secara manual dengan embedding
  API-Milvus menangani seluruh proses pengiriman permintaan ke penyedia,
  menerima embedding, dan menyimpannya dalam koleksi Anda. Untuk pencarian
  semantik, Anda hanya perlu menyediakan data kueri mentah, bukan vektor kueri.
  Milvus menghasilkan vektor kueri dengan model yang sama dengan yang Anda
  gunakan untuk penyematan, membandingkannya dengan vektor yang tersimpan, dan
  mengembalikan hasil yang paling relevan.
beta: Milvus 2.6.x
---
<h1 id="Embedding-Function-Overview" class="common-anchor-header">Ikhtisar Fungsi Penyematan<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Embedding-Function-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Modul Function di Milvus memungkinkan Anda untuk mengubah data teks mentah menjadi penyematan vektor dengan secara otomatis memanggil penyedia model eksternal (seperti OpenAI, AWS Bedrock, Google Vertex AI, dll.). Dengan modul Function, Anda tidak perlu lagi berinteraksi secara manual dengan embedding API-Milvus menangani seluruh proses pengiriman permintaan ke penyedia, menerima embedding, dan menyimpannya dalam koleksi Anda. Untuk pencarian semantik, Anda hanya perlu menyediakan data kueri mentah, bukan vektor kueri. Milvus menghasilkan vektor kueri dengan model yang sama dengan yang Anda gunakan untuk penyematan, membandingkannya dengan vektor yang tersimpan, dan mengembalikan hasil yang paling relevan.</p>
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
<li><p>Setiap bidang input yang disematkan modul Function harus selalu berisi nilai; jika nilai null diberikan, modul akan melemparkan kesalahan.</p></li>
<li><p>Modul Function hanya memproses bidang yang secara eksplisit didefinisikan dalam skema koleksi; modul ini tidak menghasilkan penyematan untuk bidang dinamis.</p></li>
<li><p>Bidang input yang akan disematkan harus bertipe <code translate="no">VARCHAR</code>.</p></li>
<li><p>Modul Function dapat menyematkan bidang masukan ke:</p>
<ul>
<li><p><code translate="no">FLOAT_VECTOR</code></p></li>
<li><p><code translate="no">INT8_VECTOR</code></p></li>
</ul>
<p>Konversi ke <code translate="no">BINARY_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code>, atau <code translate="no">BFLOAT16_VECTOR</code> tidak didukung.</p></li>
</ul>
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
    </button></h2><p>Modul Function mengubah teks mentah menjadi penyematan vektor dengan memanggil penyedia model eksternal pilihan Anda. Penyedia yang berbeda mendukung model, format penyematan, dan metode autentikasi yang berbeda, semuanya dirangkum di bawah ini.</p>
<h3 id="Supported-model-providers" class="common-anchor-header">Penyedia model yang didukung</h3><table>
   <tr>
     <th><p>Penyedia</p></th>
     <th><p>Model Umum</p></th>
     <th><p>Jenis Penyematan</p></th>
     <th><p>Metode Autentikasi</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/id/openai.md">OpenAI</a></p></td>
     <td><p>penyematan teks-3-*</p></td>
     <td><p>Padat (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Kunci API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>Berbasis penyebaran</p></td>
     <td><p>Padat (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Kunci API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/dashscope.md">DashScope</a></p></td>
     <td><p>penyematan-teks-v3</p></td>
     <td><p>Padat (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Kunci API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/bedrock.md">Batuan dasar</a></p></td>
     <td><p>amazon.titan-embed-text-v2</p></td>
     <td><p>Padat (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Pasangan AK / SK</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/vertex-ai.md">Vertex AI</a></p></td>
     <td><p>penyematan-teks-005</p></td>
     <td><p>Padat (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>JSON akun layanan GCP</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/voyage-ai.md">Voyage AI</a></p></td>
     <td><p>voyage-3, voyage-lite-02</p></td>
     <td><p>Padat (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>Kunci API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/cohere.md">Cohere</a></p></td>
     <td><p>embed-english-v3.0</p></td>
     <td><p>Padat (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>Kunci API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/siliconflow.md">SiliconFlow</a></p></td>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p>Padat (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Kunci API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/hugging-face-tei.md">Memeluk Wajah</a></p></td>
     <td><p>Semua model yang dilayani TEI</p></td>
     <td><p>Padat (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Kunci API opsional</p></td>
   </tr>
</table>
<h3 id="Workflow" class="common-anchor-header">Alur kerja</h3><p>Diagram berikut menunjukkan bagaimana Fungsi bekerja di Milvus.</p>
<ol>
<li><p><strong>Memasukkan teks</strong>: Pengguna memasukkan data mentah (misalnya dokumen) ke dalam Milvus.</p></li>
<li><p><strong>Menghasilkan penyematan</strong>: Modul Function di dalam Milvus secara otomatis memanggil penyedia model yang telah dikonfigurasi untuk mengkonversi data mentah menjadi embedding vektor.</p></li>
<li><p><strong>Menyimpan embeddings</strong>: Penyematan yang dihasilkan disimpan dalam bidang vektor yang didefinisikan secara eksplisit dalam koleksi Milvus.</p></li>
<li><p><strong>Kueri teks</strong>: Pengguna mengirimkan kueri teks ke Milvus.</p></li>
<li><p><strong>Pencarian semantik</strong>: Milvus secara internal mengubah kueri menjadi sematan vektor, melakukan pencarian kemiripan terhadap sematan yang tersimpan, dan mengambil hasil yang relevan.</p></li>
<li><p><strong>Mengembalikan hasil</strong>: Milvus mengembalikan hasil pencocokan teratas ke aplikasi.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/embedding-function-overview.png" alt="Embedding Function Overview" class="doc-image" id="embedding-function-overview" />
   </span> <span class="img-wrapper"> <span>Ikhtisar Fungsi Penyematan</span> </span></p>
<h3 id="Credential-management" class="common-anchor-header">Manajemen kredensial</h3><p>Menghubungkan ke API penyematan eksternal memerlukan kredensial autentikasi (kunci API atau pasangan kunci akses/rahasia). Mengekspos kredensial ini dalam kode aplikasi Anda menciptakan risiko keamanan. Milvus mengatasi hal ini dengan menyimpan kredensial dengan aman di file konfigurasi Milvus (<code translate="no">milvus.yaml</code>).</p>
<ol>
<li><p><strong>Menambahkan kredensial</strong>: Di bawah blok <code translate="no">credential:</code> tingkat atas, berikan setiap kredensial label unik; kemudian arahkan ke label tersebut di blok <code translate="no">function:</code>.</p></li>
<li><p><strong>Server memuat konfigurasi</strong>: Milvus membaca berkas YAML, menyimpan kunci mentah di memori, dan hanya mengingat labelnya (misalnya <code translate="no">apikey1</code>).</p></li>
<li><p><strong>Memanggil fungsi</strong>: Secara opsional, tentukan argumen <code translate="no">credential</code>.</p>
<ul>
<li><p>Jika Anda memberikan nama kredensial dengan definisi fungsi, Milvus akan menggunakan kredensial yang ditentukan.</p></li>
<li><p>Jika Anda menghilangkan argumen tersebut, Milvus secara otomatis kembali ke kredensial yang dikonfigurasikan untuk penyedia model tersebut di <code translate="no">milvus.yaml</code>.</p>
<p>Apa pun itu, kunci rahasia tidak pernah meninggalkan server.</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" />
   </span> <span class="img-wrapper"> <span>Konfigurasi Kredensial Melimpah</span> </span></p>
<div class="alert note">
<p>Jika Anda menggunakan Milvus dengan Docker Compose, Anda juga dapat menyuntikkan bidang yang sama melalui variabel lingkungan. Lihat panduan khusus penyedia untuk nama variabel yang tepat.</p>
</div>
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
    </button></h2><p>Sebelum menggunakan fungsi penyematan dengan Milvus, konfigurasikan kredensial akses.</p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration" class="common-anchor-header">Langkah 1: Menambahkan kredensial ke konfigurasi Milvus</h3><p>Pada berkas <code translate="no">milvus.yaml</code> Anda, edit blok <code translate="no">credential</code> dengan entri untuk setiap penyedia yang perlu Anda akses:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml credential store section</span>
<span class="hljs-comment"># This section defines all your authentication credentials for external embedding providers</span>
<span class="hljs-comment"># Each credential gets a unique name (e.g., aksk1, apikey1) that you&#x27;ll reference elsewhere</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-comment"># For AWS Bedrock or services using access/secret key pairs</span>
  <span class="hljs-comment"># &#x27;aksk1&#x27; is just an example name - you can choose any meaningful identifier</span>
  <span class="hljs-attr">aksk1:</span>                       
    <span class="hljs-attr">access_key_id:</span> <span class="hljs-string">&lt;YOUR_AK&gt;</span>      
    <span class="hljs-attr">secret_access_key:</span> <span class="hljs-string">&lt;YOUR_SK&gt;</span>  
  
  <span class="hljs-comment"># For OpenAI, Voyage AI, or other API key-based services</span>
  <span class="hljs-comment"># &#x27;apikey1&#x27; is a custom name you choose to identify this credential  </span>
  <span class="hljs-attr">apikey1:</span>                     
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_API_KEY&gt;</span>        
  
  <span class="hljs-comment"># For Google Vertex AI using service account credentials</span>
  <span class="hljs-comment"># &#x27;gcp1&#x27; is an example name for your Google Cloud credentials</span>
  <span class="hljs-attr">gcp1:</span>                        
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">&lt;BASE64_OF_JSON&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Jenis Penyedia</p></th>
     <th><p>Kolom yang diperlukan</p></th>
     <th><p>Contoh Konfigurasi</p></th>
   </tr>
   <tr>
     <td><p>Pasangan AK/SK (AWS Bedrock)</p></td>
     <td><p><code translate="no">access_key_id</code>, <code translate="no">secret_access_key</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     aksk1:    # custom label
         access_key_id: &lt;YOUR_AK&gt;
         secret_access_key: &lt;YOUR_SK&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>Berbasis API-key (OpenAI, Voyage AI, dll.)</p></td>
     <td><p><code translate="no">apikey</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     apikey1:    # custom label
         apikey: &lt;YOUR_API_KEY&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>JSON akun layanan GCP (Vertex AI)</p></td>
     <td><p><code translate="no">credential_json</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     gcp1:    # custom label
         credential_json: &lt;BASE64_OF_JSON&gt;
     ...
</code></pre></td>
   </tr>
</table>
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">Langkah 2: Konfigurasikan pengaturan penyedia</h3><p>Di dalam berkas konfigurasi yang sama, edit blok <code translate="no">function</code> untuk memberi tahu Milvus kunci mana yang akan digunakan untuk menyematkan panggilan layanan:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>                         <span class="hljs-comment"># calls OpenAI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey1</span>           <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom endpoint</span>

      <span class="hljs-attr">bedrock:</span>                        <span class="hljs-comment"># calls AWS Bedrock</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk1</span>             <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-attr">region:</span> <span class="hljs-string">us-east-2</span>

      <span class="hljs-attr">vertexai:</span>                       <span class="hljs-comment"># calls Google Vertex AI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp1</span>              <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom endpoint</span>

      <span class="hljs-attr">tei:</span>                            <span class="hljs-comment"># Built-in Tiny Embedding model</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>                  <span class="hljs-comment"># Whether to enable TEI model service</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk informasi lebih lanjut tentang cara menerapkan konfigurasi Milvus, lihat Mengonfigurasi <a href="/docs/id/dynamic_config.md">Milvus</a> dengan <a href="/docs/id/dynamic_config.md">Cepat</a>.</p>
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
<span class="hljs-comment"># For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment"># For dense vector, data type can be FLOAT_VECTOR or INT8_VECTOR</span>
<span class="hljs-comment"># For sparse vector, data type must be SPARSE_FLOAT_VECTOR</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Langkah 2: Menambahkan fungsi embedding ke skema</h3><p>Modul Function di Milvus secara otomatis mengubah data mentah yang disimpan dalam bidang skalar menjadi embedding dan menyimpannya ke dalam bidang vektor yang didefinisikan secara eksplisit.</p>
<p>Contoh di bawah ini menambahkan modul Function (<code translate="no">openai_embedding</code>) yang mengubah bidang skalar <code translate="no">&quot;document&quot;</code> menjadi embedding, menyimpan vektor yang dihasilkan dalam bidang vektor <code translate="no">&quot;dense&quot;</code> yang telah didefinisikan sebelumnya.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey1&quot;,                    # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,                            # Optionally shorten the output vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;                         # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Nilai Contoh</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Pengenal unik untuk fungsi penyematan dalam Milvus.</p></td>
     <td><p><code translate="no">"openai_embedding"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Jenis fungsi embedding yang digunakan. Nilai yang mungkin:</p>
<ul>
<li><p><code translate="no">FunctionType.TEXTEMBEDDING</code>: Menghasilkan vektor padat yang menangkap makna semantik di dalam teks.</p></li>
<li><p><code translate="no">FunctionType.BM25</code>: Menghasilkan vektor jarang berdasarkan algoritme peringkat BM25, yang menghitung nilai relevansi menggunakan frekuensi istilah dan frekuensi dokumen terbalik. Untuk informasi lebih lanjut, lihat <a href="/docs/id/full-text-search.md">Pencarian Teks Lengkap</a>.</p></li>
</ul></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Bidang skalar yang berisi data mentah yang akan disematkan. Saat ini, parameter ini hanya menerima satu nama bidang.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>Bidang vektor untuk menyimpan sematan yang dihasilkan. Saat ini, parameter ini hanya menerima satu nama bidang.</p></td>
     <td><p><code translate="no">["dense"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Kamus yang berisi konfigurasi penyematan. Catatan: Parameter dalam <code translate="no">params</code> bervariasi, tergantung pada penyedia model penyematan.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Penyedia model penyematan.</p></td>
     <td><p><code translate="no">"openai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Menentukan model penyematan yang akan digunakan.</p></td>
     <td><p><code translate="no">"text-embedding-3-small"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>Label kredensial yang ditentukan di bagian <code translate="no">credential:</code> tingkat atas dari <code translate="no">milvus.yaml</code>. </p>
<ul>
<li><p>Jika disediakan, Milvus mengambil pasangan kunci yang cocok atau token API dan menandatangani permintaan di sisi server.</p></li>
<li><p>Ketika dihilangkan (<code translate="no">None</code>), Milvus kembali ke kredensial yang dikonfigurasikan secara eksplisit untuk penyedia model target di <code translate="no">milvus.yaml</code>.</p></li>
<li><p>Jika label tidak diketahui atau kunci yang direferensikan tidak ada, panggilan akan gagal.</p></li>
</ul></td>
     <td><p><code translate="no">"apikey1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>Jumlah dimensi untuk penyematan keluaran. Untuk model generasi ketiga OpenAI, Anda dapat mempersingkat vektor penuh untuk mengurangi biaya dan latensi tanpa kehilangan informasi semantik yang signifikan. Untuk informasi lebih lanjut, lihat <a href="https://openai.com/blog/new-embedding-models-and-api-updates">posting blog pengumuman OpenAI</a>. <strong>Catatan:</strong> Jika Anda memperpendek dimensi vektor, pastikan nilai <code translate="no">dim</code> yang ditentukan dalam metode <code translate="no">add_field</code> skema untuk bidang vektor cocok dengan dimensi keluaran akhir fungsi penyematan Anda.</p></td>
     <td><p><code translate="no">"1536"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">user</code></p></td>
     <td><p>Pengenal tingkat pengguna untuk melacak penggunaan API.</p></td>
     <td><p><code translate="no">"user123"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Untuk koleksi dengan beberapa bidang skalar yang memerlukan konversi teks ke vektor, tambahkan fungsi terpisah ke skema koleksi, pastikan setiap fungsi memiliki nama unik dan nilai <code translate="no">output_field_names</code>.</p>
</div>
<h3 id="Step-3-Configure-index" class="common-anchor-header">Langkah 3: Konfigurasi indeks</h3><p>Setelah mendefinisikan skema dengan bidang yang diperlukan dan fungsi bawaan, siapkan indeks untuk koleksi Anda. Untuk menyederhanakan proses ini, gunakan <code translate="no">AUTOINDEX</code> sebagai <code translate="no">index_type</code>, sebuah opsi yang memungkinkan Milvus untuk memilih dan mengonfigurasi jenis indeks yang paling sesuai berdasarkan struktur data Anda.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Create-collection" class="common-anchor-header">Langkah 4: Membuat koleksi</h3><p>Sekarang buatlah koleksi dengan menggunakan skema dan parameter indeks yang telah ditentukan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-data" class="common-anchor-header">Langkah 5: Memasukkan data</h3><p>Setelah menyiapkan koleksi dan indeks, Anda siap untuk memasukkan data mentah. Dalam proses ini, Anda hanya perlu menyediakan teks mentah. Modul Fungsi yang telah kita tentukan sebelumnya secara otomatis menghasilkan vektor jarang yang sesuai untuk setiap entri teks.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Perform-vector-search" class="common-anchor-header">Langkah 6: Lakukan pencarian vektor</h3><p>Setelah penyisipan data, lakukan pencarian semantik menggunakan teks kueri mentah. Milvus secara otomatis mengubah kueri Anda menjadi vektor penyisipan, mengambil dokumen yang relevan berdasarkan kemiripan, dan mengembalikan hasil yang paling cocok.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform semantic search</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>], <span class="hljs-comment"># Use text query rather than query vector</span>
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,   <span class="hljs-comment"># Use the vector field that stores embeddings</span>
    limit=<span class="hljs-number">1</span>,
    output_fields=[<span class="hljs-string">&#x27;document&#x27;</span>],
)

<span class="hljs-built_in">print</span>(results)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.8821347951889038, &#x27;entity&#x27;: {&#x27;document&#x27;: &#x27;Milvus simplifies semantic search through embeddings.&#x27;}}]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk informasi lebih lanjut tentang operasi pencarian dan kueri, lihat <a href="/docs/id/single-vector-search.md">Pencarian</a> dan <a href="/docs/id/get-and-scalar-query.md">Kueri</a> <a href="/docs/id/single-vector-search.md">Vektor Dasar</a>.</p>
