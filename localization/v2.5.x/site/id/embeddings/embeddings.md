---
id: embeddings.md
order: 1
summary: Pelajari cara membuat penyematan untuk data Anda.
title: Gambaran Umum Embedding
---
<h1 id="Embedding-Overview" class="common-anchor-header">Gambaran Umum Embedding<button data-href="#Embedding-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Embedding adalah konsep pembelajaran mesin untuk memetakan data ke dalam ruang dimensi tinggi, di mana data dengan semantik yang sama ditempatkan berdekatan. Biasanya berupa Deep Neural Network dari BERT atau keluarga Transformer lainnya, model embedding dapat secara efektif merepresentasikan semantik teks, gambar, dan tipe data lainnya dengan serangkaian angka yang dikenal sebagai vektor. Fitur utama dari model ini adalah jarak matematis antara vektor dalam ruang dimensi tinggi dapat menunjukkan kemiripan semantik teks atau gambar asli. Properti ini membuka banyak aplikasi pencarian informasi, seperti mesin pencari web seperti Google dan Bing, pencarian produk dan rekomendasi di situs e-commerce, dan paradigma Retrieval Augmented Generation (RAG) yang baru-baru ini populer dalam AI generatif.</p>
<p>Ada dua kategori utama penyematan, masing-masing menghasilkan jenis vektor yang berbeda:</p>
<ul>
<li><p><strong>Penyematan padat</strong>: Sebagian besar model penyematan merepresentasikan informasi sebagai vektor titik mengambang dengan ratusan hingga ribuan dimensi. Keluarannya disebut vektor "padat" karena sebagian besar dimensi memiliki nilai bukan nol. Sebagai contoh, model penyematan sumber terbuka yang populer, BAAI/bge-base-en-v1.5 menghasilkan vektor 768 angka floating point (vektor float 768 dimensi).</p></li>
<li><p><strong>Penyematan</strong> yang<strong>jarang</strong>: Sebaliknya, vektor keluaran dari embedding jarang memiliki sebagian besar dimensi nol, yaitu vektor "jarang". Vektor-vektor ini sering kali memiliki dimensi yang jauh lebih tinggi (puluhan ribu atau lebih) yang ditentukan oleh ukuran kosakata token. Vektor jarang dapat dihasilkan oleh Deep Neural Networks atau analisis statistik dari korpus teks. Karena kemampuan interpretasi dan kemampuan generalisasi di luar domain yang lebih baik, sematan jarang semakin banyak diadopsi oleh pengembang sebagai pelengkap sematan padat.</p></li>
</ul>
<p>Milvus adalah basis data vektor yang dirancang untuk manajemen, penyimpanan, dan pengambilan data vektor. Dengan mengintegrasikan model penyematan dan <a href="https://milvus.io/docs/rerankers-overview.md">pemeringkatan ulang</a> yang umum, Anda dapat dengan mudah mengubah teks asli menjadi vektor yang dapat dicari atau memeringkat ulang hasil menggunakan model yang kuat untuk mencapai hasil yang lebih akurat untuk RAG. Integrasi ini menyederhanakan transformasi teks dan menghilangkan kebutuhan akan komponen penyematan atau pemeringkatan ulang tambahan, sehingga menyederhanakan pengembangan dan validasi RAG.</p>
<p>Untuk membuat penyematan dalam tindakan, lihat <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/model/embedding_functions.ipynb">Menggunakan Model PyMilvus Untuk Menghasilkan Penyematan Teks</a>.</p>
<table>
<thead>
<tr><th>Fungsi Penyematan</th><th>Jenis</th><th>API atau Sumber terbuka</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/OpenAIEmbeddingFunction/OpenAIEmbeddingFunction.md">openai</a></td><td>Padat</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/SentenceTransformerEmbeddingFunction/SentenceTransformerEmbeddingFunction.md">pengubah-kalimat</a></td><td>Padat</td><td>Bersumber terbuka</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/SpladeEmbeddingFunction/SpladeEmbeddingFunction.md">Splade</a></td><td>Jarang</td><td>Bersumber terbuka</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/BGEM3EmbeddingFunction/BGEM3EmbeddingFunction.md">bge-m3</a></td><td>Hibrida</td><td>Sumber terbuka</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/VoyageEmbeddingFunction/VoyageEmbeddingFunction.md">voyageai</a></td><td>Padat</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/JinaEmbeddingFunction/JinaEmbeddingFunction.md">jina</a></td><td>Padat</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/CohereEmbeddingFunction/CohereEmbeddingFunction.md">koheren</a></td><td>Padat</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/InstructorEmbeddingFunction/InstructorEmbeddingFunction.md">Instruktur</a></td><td>Padat</td><td>Sumber terbuka</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/MistralAIEmbeddingFunction/MistralAIEmbeddingFunction.md">Mistral AI</a></td><td>Padat</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/NomicEmbeddingFunction/NomicEmbeddingFunction.md">Nomic</a></td><td>Padat</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/MGTEEmbeddingFunction/MGTEEmbeddingFunction.md">mGTE</a></td><td>Hibrida</td><td>Sumber terbuka</td></tr>
</tbody>
</table>
<h2 id="Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="common-anchor-header">Contoh 1: Gunakan fungsi penyematan default untuk menghasilkan vektor padat<button data-href="#Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menggunakan fungsi embedding dengan Milvus, pertama-tama instal pustaka klien PyMilvus dengan subpaket <code translate="no">model</code> yang membungkus semua utilitas untuk pembuatan embedding.</p>
<pre><code translate="no" class="language-python">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Subpaket <code translate="no">model</code> mendukung berbagai model embedding, mulai dari <a href="https://milvus.io/docs/embed-with-openai.md">OpenAI</a>, <a href="https://milvus.io/docs/embed-with-sentence-transform.md">Sentence Transformers</a>, <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a>, hingga model-model yang telah dilatih sebelumnya oleh <a href="https://milvus.io/docs/embed-with-splade.md">SPLADE</a>. Untuk mempermudah, contoh ini menggunakan <code translate="no">DefaultEmbeddingFunction</code> yang merupakan model sentence transformer <strong>all-MiniLM-L6-v2</strong>, model ini berukuran sekitar 70MB dan akan diunduh pada saat pertama kali digunakan:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

<span class="hljs-comment"># This will download &quot;all-MiniLM-L6-v2&quot;, a light weight model.</span>
ef = model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Data from which embeddings are to be generated </span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, ef.dim, embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Hasil yang diharapkan mirip dengan yang berikut ini:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([<span class="hljs-number">-3.09392996e-02</span>, <span class="hljs-number">-1.80662833e-02</span>,  <span class="hljs-number">1.34775648e-02</span>,  <span class="hljs-number">2.77156215e-02</span>,
       <span class="hljs-number">-4.86349640e-03</span>, <span class="hljs-number">-3.12581174e-02</span>, <span class="hljs-number">-3.55921760e-02</span>,  <span class="hljs-number">5.76934684e-03</span>,
        <span class="hljs-number">2.80773244e-03</span>,  <span class="hljs-number">1.35783911e-01</span>,  <span class="hljs-number">3.59678417e-02</span>,  <span class="hljs-number">6.17732145e-02</span>,
...
       <span class="hljs-number">-4.61330153e-02</span>, <span class="hljs-number">-4.85207550e-02</span>,  <span class="hljs-number">3.13997865e-02</span>,  <span class="hljs-number">7.82178566e-02</span>,
       <span class="hljs-number">-4.75336798e-02</span>,  <span class="hljs-number">5.21207601e-02</span>,  <span class="hljs-number">9.04406682e-02</span>, <span class="hljs-number">-5.36676683e-02</span>],
      dtype=<span class="hljs-type">float32</span>)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="common-anchor-header">Contoh 2: Menghasilkan vektor padat dan vektor jarang dalam satu pemanggilan dengan model BGE M3<button data-href="#Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="anchor-icon" translate="no">
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
    </button></h2><p>Dalam contoh ini, kami menggunakan model hibrida <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a> untuk menyematkan teks ke dalam vektor padat dan vektor jarang dan menggunakannya untuk mengambil dokumen yang relevan. Keseluruhan langkahnya adalah sebagai berikut:</p>
<ol>
<li><p>Sematkan teks sebagai vektor padat dan vektor jarang menggunakan model BGE-M3;</p></li>
<li><p>Siapkan koleksi Milvus untuk menyimpan vektor padat dan jarang;</p></li>
<li><p>Masukkan data ke Milvus;</p></li>
<li><p>Cari dan periksa hasilnya.</p></li>
</ol>
<p>Pertama, kita perlu menginstal dependensi yang diperlukan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.<span class="hljs-property">model</span>.<span class="hljs-property">hybrid</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">BGEM3EmbeddingFunction</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    utility,
    <span class="hljs-title class_">FieldSchema</span>, <span class="hljs-title class_">CollectionSchema</span>, <span class="hljs-title class_">DataType</span>,
    <span class="hljs-title class_">Collection</span>, <span class="hljs-title class_">AnnSearchRequest</span>, <span class="hljs-title class_">RRFRanker</span>, connections,
)
<button class="copy-code-btn"></button></code></pre>
<p>Gunakan BGE M3 untuk menyandikan dokumen dan kueri untuk pengambilan embedding.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. prepare a small corpus to search</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
query = <span class="hljs-string">&quot;Who started AI research?&quot;</span>

<span class="hljs-comment"># BGE-M3 model can embed texts as dense and sparse vectors.</span>
<span class="hljs-comment"># It is included in the optional `model` module in pymilvus, to install it,</span>
<span class="hljs-comment"># simply run &quot;pip install pymilvus[model]&quot;.</span>

bge_m3_ef = BGEM3EmbeddingFunction(use_fp16=<span class="hljs-literal">False</span>, device=<span class="hljs-string">&quot;cpu&quot;</span>)

docs_embeddings = bge_m3_ef(docs)
query_embeddings = bge_m3_ef([query])
<button class="copy-code-btn"></button></code></pre>
