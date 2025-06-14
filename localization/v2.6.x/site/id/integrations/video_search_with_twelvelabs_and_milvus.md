---
id: video_search_with_twelvelabs_and_milvus.md
summary: >-
  Pelajari cara membuat aplikasi pencarian video semantik dengan
  mengintegrasikan API Embed Twelve Labs untuk menghasilkan sematan multimodal
  dengan Milvus. Kursus ini mencakup seluruh proses mulai dari menyiapkan
  lingkungan pengembangan hingga mengimplementasikan fitur-fitur canggih seperti
  pencarian hibrida dan analisis video temporal, yang menyediakan fondasi
  komprehensif untuk membangun sistem analisis dan pengambilan konten video yang
  canggih.
title: >-
  Pencarian Video Tingkat Lanjut: Memanfaatkan Twelve Labs dan Milvus untuk
  Pencarian Semantik
---
<h1 id="Advanced-Video-Search-Leveraging-Twelve-Labs-and-Milvus-for-Semantic-Retrieval" class="common-anchor-header">Pencarian Video Tingkat Lanjut: Memanfaatkan Twelve Labs dan Milvus untuk Pencarian Semantik<button data-href="#Advanced-Video-Search-Leveraging-Twelve-Labs-and-Milvus-for-Semantic-Retrieval" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction" class="common-anchor-header">Pengantar<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>Selamat datang di tutorial komprehensif tentang cara mengimplementasikan pencarian video semantik menggunakan <a href="https://docs.twelvelabs.io/docs/create-embeddings">Twelve Labs Embed API</a> dan Milvus. Dalam panduan ini, kita akan mengeksplorasi cara memanfaatkan kekuatan penyematan <a href="https://www.twelvelabs.io/blog/multimodal-embeddings">multimodal Twelve Labs yang canggih</a> dan <a href="https://milvus.io/intro">basis data vektor Milvus yang efisien</a> untuk membuat solusi pencarian video yang kuat. Dengan mengintegrasikan teknologi ini, pengembang dapat membuka kemungkinan baru dalam analisis konten video, memungkinkan aplikasi seperti pengambilan video berbasis konten, sistem rekomendasi, dan mesin pencari canggih yang memahami nuansa data video.</p>
<p>Tutorial ini akan memandu Anda melalui seluruh proses, mulai dari menyiapkan lingkungan pengembangan hingga mengimplementasikan aplikasi pencarian video semantik yang fungsional. Kita akan membahas konsep-konsep utama seperti menghasilkan sematan multimodal dari video, menyimpannya secara efisien di Milvus, dan melakukan pencarian kemiripan untuk mengambil konten yang relevan. Baik Anda sedang membangun platform analitik video, alat penemuan konten, atau meningkatkan aplikasi yang sudah ada dengan kemampuan pencarian video, panduan ini akan memberi Anda pengetahuan dan langkah-langkah praktis untuk memanfaatkan kekuatan gabungan Twelve Labs dan Milvus dalam proyek Anda.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prasyarat<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum memulai, pastikan Anda memiliki yang berikut ini:</p>
<p>Kunci API Twelve Labs (daftar di https://api.twelvelabs.io jika Anda belum memilikinya) Python 3.7 atau yang lebih baru yang terinstal di sistem Anda</p>
<h2 id="Setting-Up-the-Development-Environment" class="common-anchor-header">Menyiapkan Lingkungan Pengembangan<button data-href="#Setting-Up-the-Development-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Buat direktori baru untuk proyek Anda dan arahkan ke sana:</p>
<pre><code translate="no" class="language-shell">mkdir video-search-tutorial
cd video-search-tutorial
<button class="copy-code-btn"></button></code></pre>
<p>Siapkan lingkungan virtual (opsional, tetapi disarankan):</p>
<pre><code translate="no" class="language-shell">python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
<button class="copy-code-btn"></button></code></pre>
<p>Instal pustaka Python yang diperlukan:</p>
<pre><code translate="no" class="language-shell">pip install twelvelabs pymilvus
<button class="copy-code-btn"></button></code></pre>
<p>Buat berkas Python baru untuk proyek Anda:</p>
<pre><code translate="no" class="language-shell">touch video_search.py
<button class="copy-code-btn"></button></code></pre>
<p>File video_search.py ini akan menjadi skrip utama yang akan kita gunakan untuk tutorial ini. Selanjutnya, siapkan kunci API Twelve Labs Anda sebagai variabel lingkungan untuk keamanan:</p>
<pre><code translate="no" class="language-shell">export TWELVE_LABS_API_KEY=&#x27;your_api_key_here&#x27;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-Milvus" class="common-anchor-header">Menghubungkan ke Milvus<button data-href="#Connecting-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk membuat koneksi dengan Milvus, kita akan menggunakan kelas MilvusClient. Pendekatan ini menyederhanakan proses koneksi dan memungkinkan kita untuk bekerja dengan instans Milvus berbasis berkas lokal, yang sangat cocok untuk tutorial kita.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Initialize the Milvus client</span>
milvus_client = MilvusClient(<span class="hljs-string">&quot;milvus_twelvelabs_demo.db&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Successfully connected to Milvus&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Kode ini membuat instance klien Milvus baru yang akan menyimpan semua data dalam sebuah berkas bernama milvus_twelvelabs_demo.db. Pendekatan berbasis file ini sangat ideal untuk tujuan pengembangan dan pengujian.</p>
<h2 id="Creating-a-Milvus-Collection-for-Video-Embeddings" class="common-anchor-header">Membuat Koleksi Milvus untuk Penyematan Video<button data-href="#Creating-a-Milvus-Collection-for-Video-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah terhubung ke Milvus, mari kita buat koleksi untuk menyimpan embedding video dan metadata terkait. Kita akan mendefinisikan skema koleksi dan membuat koleksi jika belum ada.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize the collection name</span>
collection_name = <span class="hljs-string">&quot;twelvelabs_demo_collection&quot;</span>

<span class="hljs-comment"># Check if the collection already exists and drop it if it does</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=collection_name):
    milvus_client.drop_collection(collection_name=collection_name)

<span class="hljs-comment"># Create the collection</span>
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">1024</span>  <span class="hljs-comment"># The dimension of the Twelve Labs embeddings</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; created successfully&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam kode ini, pertama-tama kita akan memeriksa apakah koleksi tersebut sudah ada dan membuangnya jika sudah ada. Hal ini memastikan kita memulai dengan awal yang bersih. Kami membuat koleksi dengan dimensi 1024, yang sesuai dengan dimensi keluaran dari embedding Twelve Labs.</p>
<h2 id="Generating-Embeddings-with-Twelve-Labs-Embed-API" class="common-anchor-header">Menghasilkan Embedding dengan API Embedding Twelve Labs<button data-href="#Generating-Embeddings-with-Twelve-Labs-Embed-API" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menghasilkan embedding untuk video kita menggunakan Twelve Labs Embed API, kita akan menggunakan Twelve Labs Python SDK. Proses ini melibatkan pembuatan tugas penyematan, menunggu penyelesaiannya, dan mengambil hasilnya. Berikut ini cara mengimplementasikannya:</p>
<p>Pertama, pastikan Anda telah menginstal Twelve Labs SDK dan mengimpor modul-modul yang diperlukan:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> twelvelabs <span class="hljs-keyword">import</span> TwelveLabs
<span class="hljs-keyword">from</span> twelvelabs.models.embed <span class="hljs-keyword">import</span> EmbeddingsTask
<span class="hljs-keyword">import</span> os

<span class="hljs-comment"># Retrieve the API key from environment variables</span>
TWELVE_LABS_API_KEY = os.getenv(<span class="hljs-string">&#x27;TWELVE_LABS_API_KEY&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialize-the-Twelve-Labs-client" class="common-anchor-header">Inisialisasi klien Twelve Labs:<button data-href="#Initialize-the-Twelve-Labs-client" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">twelvelabs_client = TwelveLabs(api_key=TWELVE_LABS_API_KEY)
<button class="copy-code-btn"></button></code></pre>
<p>Buat fungsi untuk menghasilkan sematan untuk URL video tertentu:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_embedding</span>(<span class="hljs-params">video_url</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Generate embeddings for a given video URL using the Twelve Labs API.

    This function creates an embedding task for the specified video URL using
    the Marengo-retrieval-2.6 engine. It monitors the task progress and waits
    for completion. Once done, it retrieves the task result and extracts the
    embeddings along with their associated metadata.

    Args:
        video_url (str): The URL of the video to generate embeddings for.

    Returns:
        tuple: A tuple containing two elements:
            1. list: A list of dictionaries, where each dictionary contains:
                - &#x27;embedding&#x27;: The embedding vector as a list of floats.
                - &#x27;start_offset_sec&#x27;: The start time of the segment in seconds.
                - &#x27;end_offset_sec&#x27;: The end time of the segment in seconds.
                - &#x27;embedding_scope&#x27;: The scope of the embedding (e.g., &#x27;shot&#x27;, &#x27;scene&#x27;).
            2. EmbeddingsTaskResult: The complete task result object from Twelve Labs API.

    Raises:
        Any exceptions raised by the Twelve Labs API during task creation,
        execution, or retrieval.
    &quot;&quot;&quot;</span>

    <span class="hljs-comment"># Create an embedding task</span>
    task = twelvelabs_client.embed.task.create(
        engine_name=<span class="hljs-string">&quot;Marengo-retrieval-2.6&quot;</span>,
        video_url=video_url
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Created task: id=<span class="hljs-subst">{task.<span class="hljs-built_in">id</span>}</span> engine_name=<span class="hljs-subst">{task.engine_name}</span> status=<span class="hljs-subst">{task.status}</span>&quot;</span>)

    <span class="hljs-comment"># Define a callback function to monitor task progress</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">on_task_update</span>(<span class="hljs-params">task: EmbeddingsTask</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Status=<span class="hljs-subst">{task.status}</span>&quot;</span>)

    <span class="hljs-comment"># Wait for the task to complete</span>
    status = task.wait_for_done(
        sleep_interval=<span class="hljs-number">2</span>,
        callback=on_task_update
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding done: <span class="hljs-subst">{status}</span>&quot;</span>)

    <span class="hljs-comment"># Retrieve the task result</span>
    task_result = twelvelabs_client.embed.task.retrieve(task.<span class="hljs-built_in">id</span>)

    <span class="hljs-comment"># Extract and return the embeddings</span>
    embeddings = []
    <span class="hljs-keyword">for</span> v <span class="hljs-keyword">in</span> task_result.video_embeddings:
        embeddings.append({
            <span class="hljs-string">&#x27;embedding&#x27;</span>: v.embedding.<span class="hljs-built_in">float</span>,
            <span class="hljs-string">&#x27;start_offset_sec&#x27;</span>: v.start_offset_sec,
            <span class="hljs-string">&#x27;end_offset_sec&#x27;</span>: v.end_offset_sec,
            <span class="hljs-string">&#x27;embedding_scope&#x27;</span>: v.embedding_scope
        })
    
    <span class="hljs-keyword">return</span> embeddings, task_result
<button class="copy-code-btn"></button></code></pre>
<p>Gunakan fungsi ini untuk menghasilkan sematan untuk video Anda:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example usage</span>
video_url = <span class="hljs-string">&quot;https://example.com/your-video.mp4&quot;</span>

<span class="hljs-comment"># Generate embeddings for the video</span>
embeddings, task_result = generate_embedding(video_url)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Generated <span class="hljs-subst">{<span class="hljs-built_in">len</span>(embeddings)}</span> embeddings for the video&quot;</span>)
<span class="hljs-keyword">for</span> i, emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(embeddings):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Scope: <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;embedding_scope&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Time range: <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;start_offset_sec&#x27;</span>]}</span> - <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;end_offset_sec&#x27;</span>]}</span> seconds&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Embedding vector (first 5 values): <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;embedding&#x27;</span>][:<span class="hljs-number">5</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>Implementasi ini memungkinkan Anda menghasilkan sematan untuk URL video apa pun menggunakan API Sematan Twelve Labs. Fungsi generate_embedding menangani seluruh proses, mulai dari membuat tugas hingga mengambil hasilnya. Fungsi ini mengembalikan daftar kamus, masing-masing berisi vektor penyematan beserta metadata (rentang waktu dan cakupannya), dan ingatlah untuk menangani potensi kesalahan, seperti masalah jaringan atau batasan API, di lingkungan produksi. Anda mungkin juga ingin mengimplementasikan percobaan ulang atau penanganan kesalahan yang lebih kuat tergantung pada kasus penggunaan spesifik Anda.</p>
<h2 id="Inserting-Embeddings-into-Milvus" class="common-anchor-header">Memasukkan Embedding ke dalam Milvus<button data-href="#Inserting-Embeddings-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah membuat embedding menggunakan Twelve Labs Embed API, langkah selanjutnya adalah memasukkan embedding ini beserta metadatanya ke dalam koleksi Milvus kita. Proses ini memungkinkan kita untuk menyimpan dan mengindeks embedding video kita untuk pencarian kemiripan yang efisien nantinya.</p>
<p>Berikut ini cara memasukkan embedding ke dalam Milvus:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">insert_embeddings</span>(<span class="hljs-params">milvus_client, collection_name, task_result, video_url</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Insert embeddings into the Milvus collection.

    Args:
        milvus_client: The Milvus client instance.
        collection_name (str): The name of the Milvus collection to insert into.
        task_result (EmbeddingsTaskResult): The task result containing video embeddings.
        video_url (str): The URL of the video associated with the embeddings.

    Returns:
        MutationResult: The result of the insert operation.

    This function takes the video embeddings from the task result and inserts them
    into the specified Milvus collection. Each embedding is stored with additional
    metadata including its scope, start and end times, and the associated video URL.
    &quot;&quot;&quot;</span>
    data = []

    <span class="hljs-keyword">for</span> i, v <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(task_result.video_embeddings):
        data.append({
            <span class="hljs-string">&quot;id&quot;</span>: i,
            <span class="hljs-string">&quot;vector&quot;</span>: v.embedding.<span class="hljs-built_in">float</span>,
            <span class="hljs-string">&quot;embedding_scope&quot;</span>: v.embedding_scope,
            <span class="hljs-string">&quot;start_offset_sec&quot;</span>: v.start_offset_sec,
            <span class="hljs-string">&quot;end_offset_sec&quot;</span>: v.end_offset_sec,
            <span class="hljs-string">&quot;video_url&quot;</span>: video_url
        })

    insert_result = milvus_client.insert(collection_name=collection_name, data=data)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{<span class="hljs-built_in">len</span>(data)}</span> embeddings into Milvus&quot;</span>)
    <span class="hljs-keyword">return</span> insert_result

<span class="hljs-comment"># Usage example</span>
video_url = <span class="hljs-string">&quot;https://example.com/your-video.mp4&quot;</span>

<span class="hljs-comment"># Assuming this function exists from previous step</span>
embeddings, task_result = generate_embedding(video_url)

<span class="hljs-comment"># Insert embeddings into the Milvus collection</span>
insert_result = insert_embeddings(milvus_client, collection_name, task_result, video_url)
<span class="hljs-built_in">print</span>(insert_result)
<button class="copy-code-btn"></button></code></pre>
<p>Fungsi ini menyiapkan data untuk disisipkan, termasuk semua metadata yang relevan seperti vektor penyematan, rentang waktu, dan URL video sumber. Kemudian menggunakan klien Milvus untuk menyisipkan data ini ke dalam koleksi yang ditentukan.</p>
<h2 id="Performing-Similarity-Search" class="common-anchor-header">Melakukan Pencarian Kemiripan<button data-href="#Performing-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah penyematan disimpan di Milvus, kita dapat melakukan pencarian kemiripan untuk menemukan segmen video yang paling relevan berdasarkan vektor kueri. Berikut ini adalah cara mengimplementasikan fungsi ini:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">perform_similarity_search</span>(<span class="hljs-params">milvus_client, collection_name, query_vector, limit=<span class="hljs-number">5</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Perform a similarity search on the Milvus collection.

    Args:
        milvus_client: The Milvus client instance.
        collection_name (str): The name of the Milvus collection to search in.
        query_vector (list): The query vector to search for similar embeddings.
        limit (int, optional): The maximum number of results to return. Defaults to 5.

    Returns:
        list: A list of search results, where each result is a dictionary containing
              the matched entity&#x27;s metadata and similarity score.

    This function searches the specified Milvus collection for embeddings similar to
    the given query vector. It returns the top matching results, including metadata
    such as the embedding scope, time range, and associated video URL for each match.
    &quot;&quot;&quot;</span>
    search_results = milvus_client.search(
        collection_name=collection_name,
        data=[query_vector],
        limit=limit,
        output_fields=[<span class="hljs-string">&quot;embedding_scope&quot;</span>, <span class="hljs-string">&quot;start_offset_sec&quot;</span>, <span class="hljs-string">&quot;end_offset_sec&quot;</span>, <span class="hljs-string">&quot;video_url&quot;</span>]
    )

    <span class="hljs-keyword">return</span> search_results
    
<span class="hljs-comment"># define the query vector</span>
<span class="hljs-comment"># We use the embedding inserted previously as an example. In practice, you can replace it with any video embedding you want to query.</span>
query_vector = task_result.video_embeddings[<span class="hljs-number">0</span>].embedding.<span class="hljs-built_in">float</span>

<span class="hljs-comment"># Perform a similarity search on the Milvus collection</span>
search_results = perform_similarity_search(milvus_client, collection_name, query_vector)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search Results:&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(search_results[<span class="hljs-number">0</span>]):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Result <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Video URL: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;video_url&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Time Range: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;start_offset_sec&#x27;</span>]}</span> - <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;end_offset_sec&#x27;</span>]}</span> seconds&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Similarity Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>Implementasi ini melakukan hal berikut:</p>
<ol>
<li>Mendefinisikan fungsi perform_similarity_search yang mengambil vektor kueri dan mencari sematan yang serupa dalam koleksi Milvus.</li>
<li>Menggunakan metode pencarian klien Milvus untuk menemukan vektor yang paling mirip.</li>
<li>Menentukan bidang keluaran yang ingin kita ambil, termasuk metadata tentang segmen video yang cocok.</li>
<li>Memberikan contoh cara menggunakan fungsi ini dengan video kueri, pertama-tama membuat penyematannya dan kemudian menggunakannya untuk mencari.</li>
<li>Mencetak hasil pencarian, termasuk metadata yang relevan dan skor kemiripan.</li>
</ol>
<p>Dengan mengimplementasikan fungsi-fungsi ini, Anda telah membuat alur kerja yang lengkap untuk menyimpan penyematan video di Milvus dan melakukan pencarian kemiripan. Penyiapan ini memungkinkan pengambilan konten video serupa secara efisien berdasarkan penyematan multimodal yang dihasilkan oleh API Embed Twelve Labs.</p>
<h2 id="Optimizing-Performance" class="common-anchor-header">Mengoptimalkan Kinerja<button data-href="#Optimizing-Performance" class="anchor-icon" translate="no">
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
    </button></h2><p>Baiklah, mari kita bawa aplikasi ini ke tingkat berikutnya! Ketika berurusan dengan koleksi video berskala besar, <strong>performa adalah kuncinya</strong>. Untuk mengoptimalkan, kita harus mengimplementasikan <a href="https://milvus.io/docs/v2.3.x/bulk_insert.md">pemrosesan batch untuk pembuatan dan penyisipan embedding ke dalam Milvus</a>. Dengan cara ini, kita dapat menangani banyak video secara bersamaan, sehingga secara signifikan mengurangi waktu pemrosesan secara keseluruhan. Selain itu, kami dapat memanfaatkan <a href="https://milvus.io/docs/v2.2.x/partition_key.md">fitur partisi Milvus</a> untuk mengatur data kami secara lebih efisien, mungkin berdasarkan kategori video atau periode waktu. Hal ini akan mempercepat pencarian dengan memungkinkan kami untuk mencari hanya partisi yang relevan.</p>
<p>Trik pengoptimalan lainnya adalah dengan <strong>menggunakan mekanisme caching untuk embedding atau hasil pencarian yang sering diakses</strong>. Hal ini dapat secara dramatis meningkatkan waktu respons untuk kueri yang populer. Jangan lupa untuk menyempurnakan <a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">parameter indeks Milvus</a> berdasarkan kumpulan data dan pola kueri spesifik Anda - sedikit penyesuaian di sini bisa sangat membantu dalam meningkatkan kinerja pencarian.</p>
<h2 id="Advanced-Features" class="common-anchor-header">Fitur Lanjutan<button data-href="#Advanced-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Sekarang, mari kita tambahkan beberapa fitur keren untuk membuat aplikasi kita menonjol! Kita dapat menerapkan <strong>pencarian hybrid yang menggabungkan kueri teks dan video</strong>. Faktanya, <a href="https://docs.twelvelabs.io/docs/create-text-embeddings">Twelve Labs Embed API juga dapat menghasilkan penyematan teks untuk kueri teks Anda</a>. Bayangkan jika pengguna dapat memasukkan deskripsi teks dan contoh klip video - kami akan membuat sematan untuk keduanya dan melakukan pencarian berbobot di Milvus. Ini akan memberikan hasil yang sangat tepat.</p>
<p>Tambahan lain yang mengagumkan adalah <strong>pencarian temporal di dalam video</strong>. <a href="https://docs.twelvelabs.io/docs/create-video-embeddings#customize-your-embeddings">Kami dapat memecah video panjang menjadi beberapa segmen yang lebih kecil, masing-masing dengan penyematannya sendiri</a>. Dengan cara ini, pengguna dapat menemukan momen-momen tertentu di dalam video, bukan hanya seluruh klip. Dan hei, mengapa tidak memasukkan beberapa analisis video dasar? Kita dapat menggunakan penyematan untuk mengelompokkan segmen video yang serupa, mendeteksi tren, atau bahkan mengidentifikasi pencilan dalam koleksi video yang besar.</p>
<h2 id="Error-Handling-and-Logging" class="common-anchor-header">Penanganan dan Pencatatan Kesalahan<button data-href="#Error-Handling-and-Logging" class="anchor-icon" translate="no">
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
    </button></h2><p>Mari kita akui saja, banyak hal yang bisa saja salah, dan saat itu terjadi, kita harus siap. <strong>Menerapkan penanganan kesalahan yang kuat sangatlah penting.</strong> Kita harus <a href="https://softwareengineering.stackexchange.com/questions/64180/good-use-of-try-catch-blocks">membungkus panggilan API dan operasi basis data kita dalam blok try-except</a>, memberikan pesan kesalahan yang informatif kepada pengguna ketika terjadi kegagalan. Untuk masalah yang berhubungan dengan jaringan, <a href="https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/implement-retries-exponential-backoff">mengimplementasikan percobaan ulang dengan backoff eksponensial</a> dapat membantu menangani gangguan sementara dengan baik.</p>
<p><strong>Sedangkan untuk logging, ini adalah teman terbaik kita untuk melakukan debugging dan pemantauan</strong>. Kita harus menggunakan <a href="https://blog.sentry.io/logging-in-python-a-developers-guide/">modul pencatatan Python</a> untuk melacak peristiwa penting, kesalahan, dan metrik kinerja di seluruh aplikasi kita. Mari kita siapkan level log yang berbeda - DEBUG untuk pengembangan, INFO untuk operasi umum, dan ERROR untuk masalah kritis. Dan jangan lupa untuk menerapkan rotasi log untuk mengelola ukuran file. Dengan pencatatan yang tepat, kita akan dapat dengan cepat mengidentifikasi dan menyelesaikan masalah, memastikan aplikasi pencarian video kita berjalan dengan lancar meskipun aplikasi ini terus berkembang.</p>
<h2 id="Conclusion" class="common-anchor-header">Kesimpulan<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Selamat! Anda sekarang telah membuat aplikasi pencarian video semantik yang kuat menggunakan API Embed Twelve Labs dan Milvus. Integrasi ini memungkinkan Anda untuk memproses, menyimpan, dan mengambil konten video dengan akurasi dan efisiensi yang belum pernah ada sebelumnya. Dengan memanfaatkan penyematan multimodal, Anda telah menciptakan sistem yang memahami nuansa data video, membuka kemungkinan menarik untuk penemuan konten, sistem rekomendasi, dan analisis video tingkat lanjut.</p>
<p>Ketika Anda terus mengembangkan dan menyempurnakan aplikasi Anda, ingatlah bahwa kombinasi generasi penyematan canggih Twelve Labs dan penyimpanan vektor yang dapat diskalakan dari Milvus memberikan fondasi yang kuat untuk mengatasi tantangan pemahaman video yang lebih kompleks. Kami mendorong Anda untuk bereksperimen dengan fitur-fitur canggih yang telah dibahas dan mendorong batas-batas dari apa yang mungkin dilakukan dalam pencarian dan analisis video.</p>
