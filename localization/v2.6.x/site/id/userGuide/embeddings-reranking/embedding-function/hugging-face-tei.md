---
id: hugging-face-tei.md
title: Memeluk Wajah TEICompatible with Milvus 2.6.x
summary: >-
  Hugging Face Text Embeddings Inference (TEI) adalah server inferensi
  berkinerja tinggi yang dirancang khusus untuk model penyematan teks. Panduan
  ini menjelaskan cara menggunakan Hugging Face TEI dengan Milvus untuk
  pembuatan penyematan teks yang efisien.
beta: Milvus 2.6.x
---
<h1 id="Hugging-Face-TEI" class="common-anchor-header">Memeluk Wajah TEI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Hugging-Face-TEI" class="anchor-icon" translate="no">
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
    </button></h1><p>Hugging Face <a href="https://huggingface.co/docs/text-embeddings-inference/en/index">Text Embeddings Inference (TEI)</a> adalah server inferensi berkinerja tinggi yang dirancang khusus untuk model penyematan teks. Panduan ini menjelaskan cara menggunakan Hugging Face TEI dengan Milvus untuk pembuatan penyematan teks yang efisien.</p>
<p>TEI bekerja dengan banyak model penyematan teks dari Hugging Face Hub, termasuk:</p>
<ul>
<li><p>Seri BAAI/bge-*</p></li>
<li><p>transformator kalimat/* seri</p></li>
<li><p>Model E5</p></li>
<li><p>Model GTE</p></li>
<li><p>Dan masih banyak lagi</p></li>
</ul>
<div class="alert note">
<p>Untuk daftar model terbaru yang didukung, lihat <a href="https://github.com/huggingface/text-embeddings-inference">repositori GitHub TEI</a> dan <a href="https://huggingface.co/models?pipeline_tag=text-embedding">Hugging Face Hub</a>.</p>
</div>
<h2 id="TEI-deployment" class="common-anchor-header">Penerapan TEI<button data-href="#TEI-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum mengonfigurasi Milvus dengan fungsi TEI, Anda harus memiliki layanan TEI yang sedang berjalan. Milvus mendukung dua pendekatan untuk penerapan TEI:</p>
<h3 id="Standard-deployment-external" class="common-anchor-header">Penerapan standar (eksternal)</h3><p>Anda dapat menggunakan TEI sebagai layanan mandiri menggunakan metode resmi dari Hugging Face. Pendekatan ini memberi Anda fleksibilitas dan kontrol maksimum atas layanan TEI Anda.</p>
<p>Untuk petunjuk terperinci tentang penerapan TEI menggunakan Docker atau metode lain, lihat <a href="https://huggingface.co/docs/text-embeddings-inference/en/quick_tour#deploy">dokumentasi resmi Inferensi Penyematan Teks Hugging Face</a>.</p>
<p>Setelah penerapan, catatlah titik akhir layanan TEI Anda (misalnya, <code translate="no">http://localhost:8080</code>) karena Anda akan memerlukannya saat <a href="/docs/id/hugging-face-tei.md#Use-embedding-function-">menggunakan fungsi TEI di Milvus</a>.</p>
<h3 id="Milvus-Helm-Chart-deployment-integrated" class="common-anchor-header">Penerapan Milvus Helm Chart (terintegrasi)</h3><p>Untuk lingkungan Kubernetes, Milvus menawarkan opsi penerapan terintegrasi melalui Helm chart. Ini menyederhanakan proses dengan menerapkan dan mengonfigurasi TEI bersama Milvus.</p>
<p>Untuk mengaktifkan TEI dalam penerapan Helm Milvus Anda:</p>
<ol>
<li><p>Konfigurasikan <strong>values.yaml</strong> untuk mengaktifkan TEI:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">tei:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">image:</span>
    <span class="hljs-attr">repository:</span> <span class="hljs-string">ghcr.io/huggingface/text-embeddings-inference</span>
    <span class="hljs-attr">tag:</span> <span class="hljs-string">&quot;1.7&quot;</span> <span class="hljs-comment"># Modify based on hardware</span>
  <span class="hljs-attr">model:</span> <span class="hljs-string">&quot;BAAI/bge-large-en-v1.5&quot;</span> <span class="hljs-comment"># Modify based on requirements</span>
  <span class="hljs-comment"># revision: &quot;main&quot;</span>
  <span class="hljs-comment"># hfTokenSecretName: &quot;my-huggingface-token-secret&quot;</span>
  <span class="hljs-comment"># apiKey: &quot;your_secure_api_key&quot;</span>
  <span class="hljs-comment"># apiKeySecret:</span>
  <span class="hljs-comment">#   name: &quot;my-tei-api-key-secret&quot;</span>
  <span class="hljs-comment">#   key: &quot;api-key&quot;</span>
  <span class="hljs-attr">resources:</span>
    <span class="hljs-attr">requests:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;4Gi&quot;</span>
      <span class="hljs-comment"># nvidia.com/gpu: &quot;1&quot; # For GPU</span>
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;2&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;8Gi&quot;</span>
      <span class="hljs-comment"># nvidia.com/gpu: &quot;1&quot; # For GPU</span>
  <span class="hljs-attr">extraArgs:</span> []

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Menerapkan atau Meningkatkan Milvus:</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<span class="hljs-comment"># or</span>
helm upgrade my-release milvus/milvus -f values.yaml --reset-then-reuse-values -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>Saat menggunakan penerapan bagan Helm, layanan TEI akan dapat diakses di dalam klaster Kubernetes Anda di <code translate="no">http://my-release-milvus-tei:80</code> (menggunakan nama rilis Anda). Gunakan ini sebagai titik akhir Anda dalam konfigurasi fungsi TEI.</p>
<p></div></p></li>
</ol>
<h2 id="Configuration-in-Milvus" class="common-anchor-header">Konfigurasi di Milvus<button data-href="#Configuration-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah men-deploy layanan TEI Anda, Anda harus menyediakan titik akhir ketika mendefinisikan fungsi penyematan TEI. Dalam kebanyakan kasus, tidak ada konfigurasi tambahan yang diperlukan karena TEI diaktifkan secara default di Milvus.</p>
<p>Namun, jika layanan TEI Anda digunakan dengan autentikasi kunci API (<code translate="no">--api-key</code> flag), Anda harus mengonfigurasi Milvus untuk menggunakan kunci ini:</p>
<ol>
<li><p><strong>Tentukan kunci API di bagian <code translate="no">credential</code>:</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">tei_key:</span>  <span class="hljs-comment"># You can use any label name</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_TEI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Rujuk kredensial di milvus.yaml:</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">tei:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">tei_key</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># enabled by default. no action required.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Use-embedding-function" class="common-anchor-header">Gunakan fungsi penyematan<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah layanan TEI dikonfigurasi, ikuti langkah-langkah berikut ini untuk mendefinisikan dan menggunakan fungsi penyematan.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Langkah 1: Tentukan bidang skema</h3><p>Untuk menggunakan fungsi penyematan, buat koleksi dengan skema tertentu. Skema ini harus menyertakan setidaknya tiga bidang yang diperlukan:</p>
<ul>
<li><p>Bidang utama yang secara unik mengidentifikasi setiap entitas dalam koleksi.</p></li>
<li><p>Bidang skalar yang menyimpan data mentah yang akan disematkan.</p></li>
<li><p>Bidang vektor yang dicadangkan untuk menyimpan penyematan vektor yang akan dihasilkan oleh fungsi untuk bidang skalar.</p></li>
</ul>
<p>Contoh berikut ini mendefinisikan skema dengan satu bidang skalar <code translate="no">&quot;document&quot;</code> untuk menyimpan data tekstual dan satu bidang vektor <code translate="no">&quot;dense_vector&quot;</code> untuk menyimpan embedding yang akan dihasilkan oleh modul Function. Ingatlah untuk mengatur dimensi vektor (<code translate="no">dim</code>) agar sesuai dengan output dari model penyematan yang Anda pilih.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to exactly match the TEI model&#x27;s output dimension</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Langkah 2: Menambahkan fungsi embedding ke skema</h3><p>Modul Function di Milvus secara otomatis mengubah data mentah yang disimpan dalam bidang skalar menjadi embedding dan menyimpannya ke dalam bidang vektor yang didefinisikan secara eksplisit.</p>
<p>Contoh di bawah ini menambahkan modul Function (<code translate="no">tei_func</code>) yang mengubah bidang skalar <code translate="no">&quot;document&quot;</code> menjadi embedding, menyimpan vektor yang dihasilkan dalam bidang vektor <code translate="no">&quot;dense_vector&quot;</code> yang telah didefinisikan sebelumnya.</p>
<p>Setelah Anda mendefinisikan fungsi penyisipan Anda, tambahkan fungsi tersebut ke skema koleksi Anda. Ini menginstruksikan Milvus untuk menggunakan fungsi penyematan yang ditentukan untuk memproses dan menyimpan penyematan dari data teks Anda.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define TEI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;tei_func&quot;</span>,                            <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># TEI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;TEI&quot;</span>,                      <span class="hljs-comment"># Must be set to &quot;TEI&quot;</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://your-tei-service-endpoint:80&quot;</span>, <span class="hljs-comment"># Required: Points to your TEI service address</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;truncate&quot;: &quot;true&quot;,                   # Optional: Whether to truncate long input (default false)</span>
        <span class="hljs-comment"># &quot;truncation_direction&quot;: &quot;right&quot;,      # Optional: Truncation direction (default right)</span>
        <span class="hljs-comment"># &quot;max_client_batch_size&quot;: 64,          # Optional: Client max batch size (default 32)</span>
        <span class="hljs-comment"># &quot;ingestion_prompt&quot;: &quot;passage: &quot;,      # Optional: (Advanced) Ingestion phase prompt</span>
        <span class="hljs-comment"># &quot;search_prompt&quot;: &quot;query: &quot;            # Optional: (Advanced) Search phase prompt</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p><strong>Parameter</strong></p></th>
     <th><p><strong>Diperlukan?</strong></p></th>
     <th><p><strong>Deskripsi</strong></p></th>
     <th><p><strong>Nilai Contoh</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Penyedia model penyematan. Tetapkan ke "TEI".</p></td>
     <td><p>"TEI"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">endpoint</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Alamat jaringan yang mengarah ke layanan TEI Anda yang digunakan. Jika digunakan melalui Milvus Helm Chart, ini biasanya merupakan alamat Layanan internal.</p></td>
     <td><p>"http://localhost:8080", "http://my-release-milvus-tei:80"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncate</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Apakah akan memotong teks input yang melebihi panjang maksimum model. Nilai defaultnya adalah false.</p></td>
     <td><p>"true"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncation_direction</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Efektif bila truncate bernilai true. Menentukan apakah akan memotong dari kiri atau kanan. Nilai default ke kanan.</p></td>
     <td><p>"left"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Ukuran batch maksimum yang dikirim klien Milvus ke TEI. Nilai default ke 32.</p></td>
     <td><p>64</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">prompt_name</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>(Lanjutan) Menentukan kunci dalam kamus prompt konfigurasi pengubah kalimat. Digunakan untuk model tertentu yang membutuhkan format prompt tertentu. Dukungan TEI mungkin terbatas dan tergantung pada konfigurasi model pada Hub.</p></td>
     <td><p>"your_prompt_key"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ingestion_prompt</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>(Lanjutan) Menentukan prompt yang akan digunakan selama fase penyisipan data (konsumsi). Tergantung pada model TEI yang digunakan; model harus mendukung prompt.</p></td>
     <td><p>"bagian "</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_prompt</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>(Lanjutan) Menentukan prompt yang akan digunakan selama fase pencarian. Tergantung pada model TEI yang digunakan; model harus mendukung prompt.</p></td>
     <td><p>"query: "</p></td>
   </tr>
</table>
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
    </button></h2><p>Setelah mengonfigurasi fungsi penyematan, lihat <a href="/docs/id/embedding-function-overview.md">Ikhtisar Fungsi</a> untuk panduan tambahan tentang konfigurasi indeks, contoh penyisipan data, dan operasi pencarian semantik.</p>
