---
id: build_RAG_with_milvus_and_embedAnything.md
summary: >-
  Dalam tutorial ini, kami akan mendemonstrasikan cara membuat pipeline
  Retrieval-Augmented Generation (RAG) menggunakan EmbedAnything bersama dengan
  Milvus. Daripada menghubungkan secara ketat dengan basis data tertentu,
  EmbedAnything menggunakan sistem adaptor yang dapat dicolokkan, adaptor
  berfungsi sebagai pembungkus yang mendefinisikan bagaimana penyematan
  diformat, diindeks, dan disimpan dalam penyimpanan vektor target.
title: Membangun RAG dengan Milvus dan EmbedAnything
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_embedAnything.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_embedAnything.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Building-RAG-with-Milvus-and-EmbedAnything" class="common-anchor-header">Membangun RAG dengan Milvus dan EmbedAnything<button data-href="#Building-RAG-with-Milvus-and-EmbedAnything" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/StarlightSearch/EmbedAnything">EmbedAnything</a> adalah pipeline penyisipan yang sangat cepat dan ringan yang dibuat di Rust yang mendukung teks, PDF, gambar, audio, dan banyak lagi.</p>
<p>Dalam tutorial ini, kami akan mendemonstrasikan cara membuat pipeline Retrieval-Augmented Generation (RAG) menggunakan EmbedAnything bersama dengan <a href="https://milvus.io">Milvus</a>. Daripada menggabungkan secara ketat dengan basis data tertentu, EmbedAnything menggunakan sistem <strong>adaptor</strong> yang dapat dicolokkan - adaptor berfungsi sebagai pembungkus yang mendefinisikan bagaimana penyematan diformat, diindeks, dan disimpan dalam penyimpanan vektor target.</p>
<p>Dengan memasangkan EmbedAnything dengan adaptor Milvus, Anda dapat membuat embedding dari beragam jenis file dan menyimpannya secara efisien di Milvus hanya dalam beberapa baris kode.</p>
<blockquote>
<p>⚠️ Catatan: Meskipun adaptor di EmbedAnything menangani penyisipan ke dalam Milvus, adaptor ini tidak mendukung pencarian di luar kotak. Untuk membangun pipeline RAG yang lengkap, Anda juga perlu menginstansiasi MilvusClient secara terpisah dan mengimplementasikan logika pencarian (misalnya, pencarian kemiripan vektor) sebagai bagian dari aplikasi Anda.</p>
</blockquote>
<h2 id="Preparation" class="common-anchor-header">Persiapan<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">Ketergantungan dan Lingkungan</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -qU pymilvus openai embed_anything</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Jika Anda menggunakan Google Colab, untuk mengaktifkan dependensi yang baru saja terinstal, Anda mungkin perlu <strong>memulai ulang runtime</strong> (klik menu "Runtime" di bagian atas layar, dan pilih "Restart session" dari menu tarik-turun).</p>
</div>
<h3 id="Clone-the-Repository-and-Load-Adapter" class="common-anchor-header">Kloning Repositori dan Load Adapter</h3><p>Selanjutnya, kita akan mengkloning repositori <a href="https://github.com/StarlightSearch/EmbedAnything">EmbedAnything</a> dan menambahkan direktori <code translate="no">examples/adapters</code> ke jalur Python. Di sinilah kita menyimpan implementasi adaptor Milvus khusus, yang memungkinkan EmbedAnything berkomunikasi dengan Milvus untuk penyisipan vektor.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> sys

<span class="hljs-comment"># Clone the EmbedAnything repository if not already cloned</span>
![ -d <span class="hljs-string">&quot;EmbedAnything&quot;</span> ] || git clone https://github.com/StarlightSearch/EmbedAnything.git

<span class="hljs-comment"># Add the `examples/adapters` directory to the Python path</span>
sys.path.append(<span class="hljs-string">&quot;EmbedAnything/examples/adapters&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;✅ EmbedAnything cloned and adapter path added.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">✅ EmbedAnything cloned and adapter path added.
</code></pre>
<p>Kita akan menggunakan OpenAI sebagai LLM dalam pipeline RAG ini. Anda harus menyiapkan <a href="https://platform.openai.com/docs/quickstart">kunci api</a> <code translate="no">OPENAI_API_KEY</code> sebagai variabel lingkungan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>

openai_client = OpenAI()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG" class="common-anchor-header">Membangun RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Initialize-Milvus" class="common-anchor-header">Inisialisasi Milvus</h3><p>Sebelum kita menyisipkan berkas, kita perlu menyiapkan dua komponen yang berinteraksi dengan Milvus:</p>
<ol>
<li><code translate="no">MilvusVectorAdapter</code> - Ini adalah adaptor Milvus untuk EmbedAnything, dan <strong>hanya</strong> digunakan <strong>untuk konsumsi vektor</strong> (yaitu, menyisipkan penyematan dan membuat indeks). Saat ini <strong>tidak</strong> mendukung operasi pencarian.</li>
<li><code translate="no">MilvusClient</code> - Ini adalah klien resmi dari <code translate="no">pymilvus</code>, yang memungkinkan <strong>akses penuh</strong> ke kemampuan Milvus termasuk pencarian vektor, pemfilteran, dan manajemen koleksi.</li>
</ol>
<p>Untuk menghindari kebingungan:</p>
<ul>
<li>Anggap <code translate="no">MilvusVectorAdapter</code> sebagai alat "hanya-tulis" untuk menyimpan vektor.</li>
<li>Pikirkan <code translate="no">MilvusClient</code> sebagai mesin "baca-dan-pencarian" Anda untuk benar-benar melakukan pencarian dan mengambil dokumen untuk RAG.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> embed_anything
<span class="hljs-keyword">from</span> embed_anything <span class="hljs-keyword">import</span> (
    WhichModel,
    EmbeddingModel,
)
<span class="hljs-keyword">from</span> milvus_db <span class="hljs-keyword">import</span> MilvusVectorAdapter
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Official Milvus client for full operations</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>, token=<span class="hljs-string">&quot;&quot;</span>)

<span class="hljs-comment"># EmbedAnything adapter for pushing embeddings into Milvus</span>
index_name = <span class="hljs-string">&quot;embed_anything_milvus_collection&quot;</span>
milvus_adapter = MilvusVectorAdapter(
    uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>, token=<span class="hljs-string">&quot;&quot;</span>, collection_name=index_name
)

<span class="hljs-comment"># Delete existing collection if it exists</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(index_name):
    milvus_client.drop_collection(index_name)

<span class="hljs-comment"># Create a new collection with dimension matching the embedding model later used</span>
milvus_adapter.create_index(dimension=<span class="hljs-number">384</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Ok - Milvus DB connection established.
Collection 'embed_anything_milvus_collection' created with index.
</code></pre>
<div class="alert note">
<p>Adapun argumen dari <code translate="no">MilvusVectorAdapter</code> dan <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Menetapkan <code translate="no">uri</code> sebagai file lokal, misalnya<code translate="no">./milvus.db</code>, adalah metode yang paling mudah, karena secara otomatis menggunakan <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> untuk menyimpan semua data dalam file ini.</li>
<li>Jika Anda memiliki data dalam skala besar, misalnya lebih dari satu juta vektor, Anda dapat menyiapkan server Milvus yang lebih berkinerja tinggi di <a href="https://milvus.io/docs/quickstart.md">Docker atau Kubernetes</a>. Dalam pengaturan ini, gunakan alamat dan port server sebagai uri Anda, misalnya<code translate="no">http://localhost:19530</code>. Jika Anda mengaktifkan fitur autentikasi pada Milvus, gunakan "<your_username>:<your_password>" sebagai token, jika tidak, jangan setel token.</li>
<li>Jika Anda ingin menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, layanan cloud yang dikelola sepenuhnya untuk Milvus, sesuaikan <code translate="no">uri</code> dan <code translate="no">token</code>, yang sesuai dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint dan Api key</a> di Zilliz Cloud.</li>
</ul>
</div>
<h3 id="Initialize-Embedding-Model-and-Embed-PDF-Document" class="common-anchor-header">Inisialisasi Model Penyematan dan Sematkan Dokumen PDF</h3><p>Sekarang kita akan menginisialisasi model penyematan. Kita akan menggunakan <code translate="no">all-MiniLM-L12-v2 model</code> dari pustaka pengubah kalimat, yang merupakan model yang ringan namun kuat untuk menghasilkan penyematan teks. Model ini menghasilkan penyematan 384 dimensi, jadi ini selaras dengan dimensi koleksi Milvus kita yang diatur ke 384. Penyelarasan ini sangat penting dan memastikan kompatibilitas antara dimensi vektor yang disimpan di Milvus dan yang dihasilkan oleh model.</p>
<p>EmbedAnything mendukung lebih banyak model penyematan. Untuk lebih jelasnya, silakan lihat <a href="https://github.com/StarlightSearch/EmbedAnything">dokumentasi resminya</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize the embedding model</span>
model = EmbeddingModel.from_pretrained_hf(
    WhichModel.Bert, model_id=<span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L12-v2&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Sekarang, mari kita menyematkan file PDF. EmbedAnything memudahkan untuk memproses dokumen PDF (dan banyak lagi) dan menyimpan penyematannya secara langsung di Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Embed a PDF file</span>
data = embed_anything.embed_file(
    <span class="hljs-string">&quot;./pdf_files/WhatisMilvus.pdf&quot;</span>,
    embedder=model,
    adapter=milvus_adapter,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Converted 12 embeddings for insertion.
Successfully inserted 12 embeddings.
</code></pre>
<h3 id="Retrieve-and-Generate-Response" class="common-anchor-header">Mengambil dan Menghasilkan Tanggapan</h3><p>Sekali lagi, <code translate="no">MilvusVectorAdapter</code> dari EmbedAnything saat ini merupakan abstraksi ringan untuk konsumsi vektor dan pengindeksan saja. Ini <strong>tidak mendukung</strong> permintaan <strong>pencarian</strong> atau pengambilan. Oleh karena itu, untuk mencari dokumen yang relevan untuk membangun pipeline RAG kita, kita harus secara langsung menggunakan instance <code translate="no">MilvusClient</code> (<code translate="no">milvus_client</code>) untuk melakukan kueri ke penyimpanan vektor Milvus kita.</p>
<p>Tentukan sebuah fungsi untuk mengambil dokumen yang relevan dari Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve_documents</span>(<span class="hljs-params">question, top_k=<span class="hljs-number">3</span></span>):
    query_vector = <span class="hljs-built_in">list</span>(
        embed_anything.embed_query([question], embedder=model)[<span class="hljs-number">0</span>].embedding
    )
    search_res = milvus_client.search(
        collection_name=index_name,
        data=[query_vector],
        limit=top_k,
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    )
    docs = [(res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]]
    <span class="hljs-keyword">return</span> docs
<button class="copy-code-btn"></button></code></pre>
<p>Mendefinisikan fungsi untuk menghasilkan respons menggunakan dokumen yang diambil dalam pipeline RAG.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_rag_response</span>(<span class="hljs-params">question</span>):
    retrieved_docs = retrieve_documents(question)
    context = <span class="hljs-string">&quot;\n&quot;</span>.join([<span class="hljs-string">f&quot;Text: <span class="hljs-subst">{doc[<span class="hljs-number">0</span>]}</span>\n&quot;</span> <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> retrieved_docs])
    system_prompt = (
        <span class="hljs-string">&quot;You are an AI assistant. Provide answers based on the given context.&quot;</span>
    )
    user_prompt = <span class="hljs-string">f&quot;&quot;&quot;
    Use the following pieces of information to answer the question. If the information is not in the context, say you don&#x27;t know.
    
    Context:
    <span class="hljs-subst">{context}</span>
    
    Question: <span class="hljs-subst">{question}</span>
    &quot;&quot;&quot;</span>
    response = openai_client.chat.completions.create(
        model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
        messages=[
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: system_prompt},
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_prompt},
        ],
    )
    <span class="hljs-keyword">return</span> response.choices[<span class="hljs-number">0</span>].message.content
<button class="copy-code-btn"></button></code></pre>
<p>Mari kita uji pipeline RAG dengan sebuah contoh pertanyaan.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How does Milvus search for similar documents?&quot;</span>
answer = generate_rag_response(question)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Question: <span class="hljs-subst">{question}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Answer: <span class="hljs-subst">{answer}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Question: How does Milvus search for similar documents?
Answer: Milvus searches for similar documents primarily through Approximate Nearest Neighbor (ANN) search, which finds the top K vectors closest to a given query vector. It also supports various other types of searches, such as filtering search under specified conditions, range search within a specified radius, hybrid search based on multiple vector fields, and keyword search based on BM25. Additionally, it can perform reranking to adjust the order of search results based on additional criteria, refining the initial ANN search results.
</code></pre>
