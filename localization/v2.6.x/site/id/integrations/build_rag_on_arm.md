---
id: build_rag_on_arm.md
summary: >-
  Dalam tutorial ini, Anda akan mempelajari cara membuat aplikasi
  Retrieval-Augmented Generation (RAG) pada infrastruktur berbasis Arm. Untuk
  penyimpanan vektor, kami menggunakan Zilliz Cloud, basis data vektor Milvus
  yang dikelola secara penuh. Zilliz Cloud tersedia di cloud utama seperti AWS,
  GCP, dan Azure. Dalam demo ini, kami menggunakan Zilliz Cloud yang digunakan
  di AWS dengan mesin Arm. Untuk LLM, kami menggunakan model Llama-3.1-8B pada
  CPU server berbasis AWS Arm menggunakan llama.cpp.
title: Membangun RAG pada Arsitektur Arm
---
<h1 id="Build-RAG-on-Arm-Architecture" class="common-anchor-header">Membangun RAG pada Arsitektur Arm<button data-href="#Build-RAG-on-Arm-Architecture" class="anchor-icon" translate="no">
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
    </button></h1><p>CPU<a href="https://www.arm.com/">Arm</a> digunakan secara luas di berbagai aplikasi, termasuk kasus penggunaan pembelajaran mesin (ML) dan kecerdasan buatan (AI) tradisional.</p>
<p>Dalam tutorial ini, Anda akan mempelajari cara membuat aplikasi Retrieval-Augmented Generation (RAG) pada infrastruktur berbasis Arm. Untuk penyimpanan vektor, kami menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, basis data vektor Milvus yang dikelola secara penuh. Zilliz Cloud tersedia di cloud utama seperti AWS, GCP, dan Azure. Dalam demo ini, kami menggunakan Zilliz Cloud yang digunakan di AWS dengan mesin Arm. Untuk LLM, kami menggunakan model <code translate="no">Llama-3.1-8B</code> pada CPU server berbasis AWS Arm menggunakan <code translate="no">llama.cpp</code>.</p>
<h2 id="Prerequisite" class="common-anchor-header">Prasyarat<button data-href="#Prerequisite" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menjalankan contoh ini, kami sarankan Anda untuk menggunakan <a href="https://aws.amazon.com/ec2/graviton/">AWS Graviton</a>, yang menyediakan cara yang hemat biaya untuk menjalankan beban kerja ML pada server berbasis Arm. Notebook ini telah diuji pada instance AWS Graviton3 <code translate="no">c7g.2xlarge</code> dengan sistem Ubuntu 22.04 LTS.</p>
<p>Anda membutuhkan setidaknya empat core dan RAM 8GB untuk menjalankan contoh ini. Konfigurasikan penyimpanan disk hingga setidaknya 32 GB. Kami menyarankan Anda untuk menggunakan instans dengan spesifikasi yang sama atau lebih baik.</p>
<p>Setelah Anda meluncurkan instans, sambungkan ke instans tersebut dan jalankan perintah berikut ini untuk menyiapkan lingkungan.</p>
<p>Instal python pada server:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt update
$ <span class="hljs-built_in">sudo</span> apt install python-is-python3 python3-pip python3-venv -y
<button class="copy-code-btn"></button></code></pre>
<p>Buat dan aktifkan lingkungan virtual:</p>
<pre><code translate="no" class="language-bash">$ python -m venv venv
$ <span class="hljs-built_in">source</span> venv/bin/activate
<button class="copy-code-btn"></button></code></pre>
<p>Instal dependensi python yang diperlukan:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus openai requests langchain-huggingface huggingface_hub tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Offline-Data-Loading" class="common-anchor-header">Memuat Data Offline<button data-href="#Offline-Data-Loading" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">Membuat Koleksi</h3><p>Kami menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a> yang diterapkan di AWS dengan mesin berbasis Arm untuk menyimpan dan mengambil data vektor. Untuk memulai dengan cepat, cukup <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">daftarkan akun</a> di Zilliz Cloud secara gratis.</p>
<div class="alert note">
<p>Selain Zilliz Cloud, Milvus yang dihosting sendiri juga merupakan opsi (lebih rumit untuk disiapkan). Kita juga dapat menggunakan <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Milvus Standalone</a> dan <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a> pada mesin berbasis ARM. Untuk informasi lebih lanjut tentang instalasi Milvus, silakan lihat <a href="https://milvus.io/docs/install-overview.md">dokumentasi instalasi</a>.</p>
</div>
<p>Kami menetapkan <code translate="no">uri</code> dan <code translate="no">token</code> sebagai <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint dan Api key</a> di Zilliz Cloud.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(
    uri=<span class="hljs-string">&quot;&lt;your_zilliz_public_endpoint&gt;&quot;</span>, token=<span class="hljs-string">&quot;&lt;your_zilliz_api_key&gt;&quot;</span>
)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Periksa apakah koleksi sudah ada dan hapus jika sudah ada.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>Buat koleksi baru dengan parameter yang ditentukan.</p>
<p>Jika kita tidak menentukan informasi field apapun, Milvus akan secara otomatis membuat field default <code translate="no">id</code> untuk primary key, dan field <code translate="no">vector</code> untuk menyimpan data vektor. Bidang JSON yang dicadangkan digunakan untuk menyimpan bidang yang tidak ditentukan skema dan nilainya.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">384</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Kami menggunakan jarak hasil kali dalam sebagai jenis metrik default. Untuk informasi lebih lanjut tentang jenis jarak, Anda dapat merujuk ke <a href="https://milvus.io/docs/metric.md?tab=floating">halaman Metrik Kemiripan</a></p>
<h3 id="Prepare-the-data" class="common-anchor-header">Siapkan data</h3><p>Kami menggunakan halaman FAQ dari <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Dokumentasi Milvus 2.4.x</a> sebagai pengetahuan pribadi dalam RAG kami, yang merupakan sumber data yang baik untuk pipa RAG sederhana.</p>
<p>Unduh file zip dan ekstrak dokumen ke folder <code translate="no">milvus_docs</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<p>Kami memuat semua file penurunan harga dari folder <code translate="no">milvus_docs/en/faq</code>. Untuk setiap dokumen, kita cukup menggunakan "# " untuk memisahkan konten dalam file, yang secara kasar dapat memisahkan konten dari setiap bagian utama dari file penurunan harga.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">Sisipkan data</h3><p>Kami menyiapkan model penyematan yang sederhana namun efisien, yaitu <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2">all-MiniLM-L6-v2</a> yang dapat mengubah teks menjadi vektor penyematan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_huggingface <span class="hljs-keyword">import</span> HuggingFaceEmbeddings

embedding_model = HuggingFaceEmbeddings(model_name=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Lakukan iterasi melalui baris teks, buat penyematan, lalu masukkan data ke dalam Milvus.</p>
<p>Berikut ini adalah bidang baru <code translate="no">text</code>, yang merupakan bidang yang tidak ditentukan dalam skema koleksi. Field ini akan secara otomatis ditambahkan ke field dinamis JSON yang dicadangkan, yang dapat diperlakukan sebagai field normal pada level tinggi.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

text_embeddings = embedding_model.embed_documents(text_lines)

<span class="hljs-keyword">for</span> i, (line, embedding) <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(
    tqdm(<span class="hljs-built_in">zip</span>(text_lines, text_embeddings), desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)
):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: embedding, <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 72/72 [00:18&lt;00:00,  3.91it/s]
</code></pre>
<h2 id="Launch-LLM-Service-on-Arm" class="common-anchor-header">Meluncurkan Layanan LLM di Arm<button data-href="#Launch-LLM-Service-on-Arm" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada bagian ini, kita akan membangun dan meluncurkan layanan <code translate="no">llama.cpp</code> pada CPU berbasis Arm.</p>
<h3 id="Llama-31-model--llamacpp" class="common-anchor-header">Model Llama 3.1 &amp; llama.cpp</h3><p><a href="https://huggingface.co/cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf">Model Llama-3.1-8B</a> dari Meta adalah bagian dari keluarga model Llama 3.1 dan bebas digunakan untuk tujuan penelitian dan komersial. Sebelum Anda menggunakan model ini, kunjungi <a href="https://llama.meta.com/llama-downloads/">situs web</a> Llama dan isi formulir untuk meminta akses.</p>
<p><a href="https://github.com/ggerganov/llama.cpp">llama.cpp</a> adalah proyek C/C++ sumber terbuka yang memungkinkan inferensi LLM yang efisien pada berbagai perangkat keras - baik secara lokal maupun di cloud. Anda dapat dengan mudah meng-host model Llama 3.1 menggunakan <code translate="no">llama.cpp</code>.</p>
<h3 id="Download-and-build-llamacpp" class="common-anchor-header">Unduh dan bangun llama.cpp</h3><p>Jalankan perintah berikut untuk menginstal make, cmake, gcc, g++, dan alat penting lainnya yang diperlukan untuk membangun llama.cpp dari sumbernya:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt install make cmake -y
$ <span class="hljs-built_in">sudo</span> apt install gcc g++ -y
$ <span class="hljs-built_in">sudo</span> apt install build-essential -y
<button class="copy-code-btn"></button></code></pre>
<p>Anda sekarang siap untuk mulai membangun <code translate="no">llama.cpp</code>.</p>
<p>Kloning repositori sumber untuk llama.cpp:</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/ggerganov/llama.cpp
<button class="copy-code-btn"></button></code></pre>
<p>Secara default, <code translate="no">llama.cpp</code> dibuat hanya untuk CPU di Linux dan Windows. Anda tidak perlu menyediakan switch tambahan untuk membangunnya untuk CPU Arm tempat Anda menjalankannya.</p>
<p>Jalankan <code translate="no">make</code> untuk membangunnya:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">cd</span> llama.cpp
$ make GGML_NO_LLAMAFILE=1 -j$(<span class="hljs-built_in">nproc</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Periksa apakah <code translate="no">llama.cpp</code> telah dibangun dengan benar dengan menjalankan perintah bantuan:</p>
<pre><code translate="no" class="language-bash">$ ./llama-cli -h
<button class="copy-code-btn"></button></code></pre>
<p>Jika <code translate="no">llama.cpp</code> telah dibangun dengan benar, Anda akan melihat opsi bantuan yang ditampilkan. Cuplikan output terlihat seperti ini:</p>
<pre><code translate="no">example usage:

    text generation:     ./llama-cli -m your_model.gguf -p &quot;I believe the meaning of life is&quot; -n 128

    chat (conversation): ./llama-cli -m your_model.gguf -p &quot;You are a helpful assistant&quot; -cnv
</code></pre>
<p>Anda sekarang dapat mengunduh model menggunakan cli huggingface:</p>
<pre><code translate="no" class="language-bash">$ huggingface-cli download cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf dolphin-2.9.4-llama3.1-8b-Q4_0.gguf --local-dir . --local-dir-use-symlinks False
<button class="copy-code-btn"></button></code></pre>
<p>Format model GGUF, yang diperkenalkan oleh tim llama.cpp, menggunakan kompresi dan kuantisasi untuk mengurangi presisi bobot menjadi bilangan bulat 4-bit, yang secara signifikan mengurangi kebutuhan komputasi dan memori dan membuat Arm CPU efektif untuk inferensi LLM.</p>
<h3 id="Re-quantize-the-model-weights" class="common-anchor-header">Menghitung ulang bobot model</h3><p>Untuk menghitung ulang, jalankan</p>
<pre><code translate="no" class="language-bash">$ ./llama-quantize --allow-requantize dolphin-2.9.4-llama3.1-8b-Q4_0.gguf dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf Q4_0_8_8
<button class="copy-code-btn"></button></code></pre>
<p>Ini akan menghasilkan file baru, <code translate="no">dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf</code>, yang berisi bobot yang dikonfigurasi ulang yang memungkinkan <code translate="no">llama-cli</code> untuk menggunakan dukungan SVE 256 dan MATMUL_INT8.</p>
<div class="alert note">
<p>Kuantisasi ulang ini optimal secara khusus untuk Graviton3. Untuk Graviton2, rekuantisasi optimal harus dilakukan dalam format <code translate="no">Q4_0_4_4</code>, dan untuk Graviton4, format <code translate="no">Q4_0_4_8</code> adalah yang paling cocok untuk rekuantisasi.</p>
</div>
<h3 id="Start-the-LLM-Service" class="common-anchor-header">Memulai Layanan LLM</h3><p>Anda dapat menggunakan program server llama.cpp dan mengirim permintaan melalui API yang kompatibel dengan OpenAI. Hal ini memungkinkan Anda untuk mengembangkan aplikasi yang berinteraksi dengan LLM beberapa kali tanpa harus berulang kali memulai dan menghentikannya. Selain itu, Anda dapat mengakses server dari mesin lain di mana LLM di-host melalui jaringan.</p>
<p>Mulai server dari baris perintah, dan server akan mendengarkan port 8080:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">./llama-server -m dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf -n 2048 -t 64 -c 65536  --port 8080</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'main: server is listening on 127.0.0.1:8080 - starting the main loop
</code></pre>
<p>Anda juga dapat menyesuaikan parameter LLM yang diluncurkan untuk menyesuaikannya dengan perangkat keras server Anda untuk mendapatkan kinerja yang ideal. Untuk informasi parameter lebih lanjut, lihat perintah <code translate="no">llama-server --help</code>.</p>
<p>Jika Anda kesulitan melakukan langkah ini, Anda dapat merujuk ke <a href="https://learn.arm.com/learning-paths/servers-and-cloud-computing/llama-cpu/llama-chatbot/">dokumen resmi</a> untuk informasi lebih lanjut.</p>
<p>Anda telah memulai layanan LLM pada CPU berbasis Arm. Selanjutnya, kita langsung berinteraksi dengan layanan menggunakan OpenAI SDK.</p>
<h2 id="Online-RAG" class="common-anchor-header">RAG Online<button data-href="#Online-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="LLM-Client-and-Embedding-Model" class="common-anchor-header">Klien LLM dan Model Penyematan</h3><p>Kita menginisialisasi klien LLM dan menyiapkan model penyematan.</p>
<p>Untuk LLM, kita menggunakan OpenAI SDK untuk meminta layanan Llama yang telah diluncurkan sebelumnya. Kita tidak perlu menggunakan kunci API apa pun karena ini sebenarnya adalah layanan llama.cpp lokal kita.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

llm_client = OpenAI(base_url=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>, api_key=<span class="hljs-string">&quot;no-key&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Buatlah penyematan tes dan cetak dimensi dan beberapa elemen pertama.</p>
<pre><code translate="no" class="language-python">test_embedding = embedding_model.embed_query(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">384
[0.03061249852180481, 0.013831384479999542, -0.02084377221763134, 0.016327863559126854, -0.010231520049273968, -0.0479842908680439, -0.017313342541456223, 0.03728749603033066, 0.04588735103607178, 0.034405000507831573]
</code></pre>
<h3 id="Retrieve-data-for-a-query" class="common-anchor-header">Mengambil data untuk sebuah kueri</h3><p>Mari kita tentukan sebuah pertanyaan yang sering muncul tentang Milvus.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cari pertanyaan tersebut dalam koleksi dan ambil 3 kecocokan semantik teratas.</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        embedding_model.embed_query(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># Return top 3 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Mari kita lihat hasil pencarian kueri</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot; Where does Milvus store data?\n\nMilvus deals with two types of data, inserted data and metadata. \n\nInserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).\n\nMetadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.\n\n###&quot;,
        0.6488019824028015
    ],
    [
        &quot;How does Milvus flush data?\n\nMilvus returns success when inserted data are loaded to the message queue. However, the data are not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.\n\n###&quot;,
        0.5974207520484924
    ],
    [
        &quot;What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###&quot;,
        0.5833579301834106
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">Gunakan LLM untuk mendapatkan respons RAG</h3><p>Ubah dokumen yang diambil menjadi format string.</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.join(
    [line_with_distance[<span class="hljs-number">0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Define system and user prompts for the Language Model. This prompt is assembled with the retrieved documents from Milvus.

SYSTEM_PROMPT = &quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;
USER_PROMPT = f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
{context}
&lt;/context&gt;
&lt;question&gt;
{question}
&lt;/question&gt;
&quot;&quot;&quot;
</code></pre>
<p>Gunakan LLM untuk menghasilkan respons berdasarkan petunjuk. Kami menetapkan parameter <code translate="no">model</code> menjadi <code translate="no">not-used</code> karena parameter ini merupakan parameter yang berlebihan untuk layanan llama.cpp.</p>
<pre><code translate="no" class="language-python">response = llm_client.chat.completions.create(
    model=<span class="hljs-string">&quot;not-used&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Milvus stores data in two types: inserted data and metadata. Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends such as MinIO, AWS S3, Google Cloud Storage (GCS), Azure Blob Storage, Alibaba Cloud OSS, and Tencent Cloud Object Storage (COS). Metadata are generated within Milvus and each Milvus module has its own metadata that are stored in etcd.
</code></pre>
<p>Selamat! Anda telah membangun aplikasi RAG di atas infrastruktur berbasis Arm.</p>
