---
id: full_text_search_with_milvus_and_haystack.md
summary: >-
  Tutorial ini mendemonstrasikan cara mengimplementasikan pencarian full-text
  dan hybrid di aplikasi Anda menggunakan Haystack dan Milvus.
title: Pencarian teks lengkap dengan Milvus dan Haystack
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Full-text-search-with-Milvus-and-Haystack" class="common-anchor-header">Pencarian teks lengkap dengan Milvus dan Haystack<button data-href="#Full-text-search-with-Milvus-and-Haystack" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">Pencarian teks lengkap</a> adalah metode tradisional untuk mengambil dokumen dengan mencocokkan kata kunci atau frasa tertentu dalam teks. Metode ini memberi peringkat hasil berdasarkan skor relevansi yang dihitung dari faktor-faktor seperti frekuensi istilah. Meskipun pencarian semantik lebih baik dalam memahami makna dan konteks, pencarian teks lengkap unggul dalam pencocokan kata kunci yang tepat, menjadikannya pelengkap yang berguna untuk pencarian semantik. Algoritma BM25 banyak digunakan untuk menentukan peringkat dalam pencarian teks lengkap dan memainkan peran penting dalam Retrieval-Augmented Generation (RAG).</p>
<p><a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5</a> memperkenalkan kemampuan pencarian teks lengkap menggunakan BM25. Pendekatan ini mengubah teks menjadi vektor jarang yang mewakili skor BM25. Anda cukup memasukkan teks mentah dan Milvus akan secara otomatis menghasilkan dan menyimpan vektor jarang, tanpa perlu melakukan pembuatan embedding jarang secara manual.</p>
<p><a href="https://haystack.deepset.ai/">Haystack</a> sekarang mendukung fitur Milvus ini, sehingga mudah untuk menambahkan pencarian teks lengkap ke aplikasi RAG. Anda dapat menggabungkan pencarian teks lengkap dengan pencarian semantik vektor padat untuk pendekatan hibrida yang mendapat manfaat dari pemahaman semantik dan ketepatan pencocokan kata kunci. Kombinasi ini meningkatkan akurasi pencarian dan memberikan hasil yang lebih baik kepada pengguna.</p>
<p>Tutorial ini mendemonstrasikan cara mengimplementasikan pencarian teks lengkap dan hibrida di aplikasi Anda menggunakan Haystack dan Milvus.</p>
<p>Untuk menggunakan penyimpanan vektor Milvus, tentukan server Milvus Anda <code translate="no">URI</code> (dan secara opsional dengan <code translate="no">TOKEN</code>). Untuk memulai server Milvus, Anda dapat mengatur server Milvus dengan mengikuti <a href="https://milvus.io/docs/install-overview.md">panduan instalasi Milvus</a> atau <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">mencoba Zilliz Cloud</a>(Milvus yang dikelola secara penuh) secara gratis.</p>
<div class="alert note">
<ul>
<li>Pencarian teks lengkap saat ini tersedia di Milvus Standalone, Milvus Distributed, dan Zilliz Cloud, meskipun belum didukung di Milvus Lite (yang memiliki fitur ini yang direncanakan untuk implementasi di masa mendatang). Hubungi support@zilliz.com untuk informasi lebih lanjut.</li>
<li>Sebelum melanjutkan dengan tutorial ini, pastikan Anda memiliki pemahaman dasar tentang <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">pencarian teks lengkap</a> dan <a href="https://github.com/milvus-io/milvus-haystack/blob/main/README.md">penggunaan dasar</a> integrasi Haystack Milvus.</li>
</ul>
</div>
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
    </button></h2><p>Sebelum menjalankan buku panduan ini, pastikan Anda telah menginstal dependensi berikut ini:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade --quiet pymilvus milvus-haystack</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Jika Anda menggunakan Google Colab, untuk mengaktifkan dependensi yang baru saja terinstal, Anda mungkin perlu <strong>memulai ulang runtime</strong> (klik menu "Runtime" di bagian atas layar, dan pilih "Restart session" dari menu tarik-turun).</p>
</div>
<p>Kita akan menggunakan model dari OpenAI. Anda harus menyiapkan <a href="https://platform.openai.com/docs/quickstart">kunci api</a> <code translate="no">OPENAI_API_KEY</code> sebagai variabel lingkungan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-data" class="common-anchor-header">Menyiapkan data</h3><p>Impor paket-paket yang diperlukan dalam buku catatan ini. Kemudian siapkan beberapa contoh dokumen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> haystack <span class="hljs-keyword">import</span> Pipeline
<span class="hljs-keyword">from</span> haystack.components.embedders <span class="hljs-keyword">import</span> OpenAIDocumentEmbedder, OpenAITextEmbedder
<span class="hljs-keyword">from</span> haystack.components.writers <span class="hljs-keyword">import</span> DocumentWriter
<span class="hljs-keyword">from</span> haystack.utils <span class="hljs-keyword">import</span> Secret
<span class="hljs-keyword">from</span> milvus_haystack <span class="hljs-keyword">import</span> MilvusDocumentStore, MilvusSparseEmbeddingRetriever
<span class="hljs-keyword">from</span> haystack.document_stores.types <span class="hljs-keyword">import</span> DuplicatePolicy
<span class="hljs-keyword">from</span> milvus_haystack.function <span class="hljs-keyword">import</span> BM25BuiltInFunction
<span class="hljs-keyword">from</span> milvus_haystack <span class="hljs-keyword">import</span> MilvusDocumentStore
<span class="hljs-keyword">from</span> milvus_haystack.milvus_embedding_retriever <span class="hljs-keyword">import</span> MilvusHybridRetriever

<span class="hljs-keyword">from</span> haystack.utils <span class="hljs-keyword">import</span> Secret
<span class="hljs-keyword">from</span> haystack.components.builders <span class="hljs-keyword">import</span> PromptBuilder
<span class="hljs-keyword">from</span> haystack.components.generators <span class="hljs-keyword">import</span> OpenAIGenerator
<span class="hljs-keyword">from</span> haystack <span class="hljs-keyword">import</span> Document

documents = [
    Document(content=<span class="hljs-string">&quot;Alice likes this apple&quot;</span>, meta={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;fruit&quot;</span>}),
    Document(content=<span class="hljs-string">&quot;Bob likes swimming&quot;</span>, meta={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;sport&quot;</span>}),
    Document(content=<span class="hljs-string">&quot;Charlie likes white dogs&quot;</span>, meta={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;pets&quot;</span>}),
]
<button class="copy-code-btn"></button></code></pre>
<p>Mengintegrasikan pencarian teks lengkap ke dalam sistem RAG akan menyeimbangkan pencarian semantik dengan pencarian berbasis kata kunci yang tepat dan dapat diprediksi. Anda juga dapat memilih untuk hanya menggunakan pencarian teks lengkap meskipun disarankan untuk menggabungkan pencarian teks lengkap dengan pencarian semantik untuk hasil pencarian yang lebih baik. Di sini, untuk tujuan demonstrasi, kami akan menunjukkan pencarian teks lengkap saja dan pencarian hibrida.</p>
<h2 id="BM25-search-without-embedding" class="common-anchor-header">Pencarian BM25 tanpa penyematan<button data-href="#BM25-search-without-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-indexing-Pipeline" class="common-anchor-header">Membuat Pipeline pengindeksan</h3><p>Untuk pencarian teks lengkap, Milvus MilvusDocumentStore menerima parameter <code translate="no">builtin_function</code>. Melalui parameter ini, Anda dapat mengoper sebuah instance dari <code translate="no">BM25BuiltInFunction</code>, yang mengimplementasikan algoritme BM25 di sisi server Milvus. Tetapkan <code translate="no">builtin_function</code> yang ditentukan sebagai instance fungsi BM25. Sebagai contoh:</p>
<pre><code translate="no" class="language-python">connection_args = {<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>}
<span class="hljs-comment"># connection_args = {&quot;uri&quot;: YOUR_ZILLIZ_CLOUD_URI, &quot;token&quot;: Secret.from_env_var(&quot;ZILLIZ_CLOUD_API_KEY&quot;)}</span>

document_store = MilvusDocumentStore(
    connection_args=connection_args,
    sparse_vector_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,  <span class="hljs-comment"># The sparse vector field.</span>
    text_field=<span class="hljs-string">&quot;text&quot;</span>,
    builtin_function=[
        BM25BuiltInFunction(  <span class="hljs-comment"># The BM25 function converts the text into a sparse vector.</span>
            input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
            output_field_names=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
        )
    ],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`).</span>
    drop_old=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Drop the old collection if it exists and recreate it.</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk connection_args:</p>
<ul>
<li>Anda dapat menyiapkan server Milvus yang lebih berkinerja pada <a href="https://milvus.io/docs/quickstart.md">docker atau kubernetes</a>. Dalam pengaturan ini, gunakan alamat server, misalnya<code translate="no">http://localhost:19530</code>, sebagai <code translate="no">uri</code>.</li>
<li>Jika Anda ingin menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, layanan cloud yang dikelola sepenuhnya untuk Milvus, sesuaikan <code translate="no">uri</code> dan <code translate="no">token</code>, yang sesuai dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">kunci Public Endpoint dan Api</a> di Zilliz Cloud.</li>
</ul>
<p>Buatlah pipeline pengindeksan untuk menulis dokumen ke dalam penyimpanan dokumen Milvus.</p>
<pre><code translate="no" class="language-python">writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)

indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, writer)
indexing_pipeline.run({<span class="hljs-string">&quot;writer&quot;</span>: {<span class="hljs-string">&quot;documents&quot;</span>: documents}})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'writer': {'documents_written': 3}}
</code></pre>
<h3 id="Create-the-retrieval-pipeline" class="common-anchor-header">Membuat pipeline pengambilan</h3><p>Buat pipeline pengambilan yang mengambil dokumen dari penyimpanan dokumen Milvus menggunakan <code translate="no">MilvusSparseEmbeddingRetriever</code>, yang merupakan pembungkus dari <code translate="no">document_store</code>.</p>
<pre><code translate="no" class="language-python">retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>, MilvusSparseEmbeddingRetriever(document_store=document_store)
)

question = <span class="hljs-string">&quot;Who likes swimming?&quot;</span>

retrieval_results = retrieval_pipeline.run({<span class="hljs-string">&quot;retriever&quot;</span>: {<span class="hljs-string">&quot;query_text&quot;</span>: question}})

retrieval_results[<span class="hljs-string">&quot;retriever&quot;</span>][<span class="hljs-string">&quot;documents&quot;</span>][<span class="hljs-number">0</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document(id=bd334348dd2087c785e99b5a0009f33d9b8b8198736f6415df5d92602d81fd3e, content: 'Bob likes swimming', meta: {'category': 'sport'}, score: 1.2039074897766113)
</code></pre>
<h2 id="Hybrid-Search-with-semantic-search-and-full-text-search" class="common-anchor-header">Pencarian Hibrida dengan pencarian semantik dan pencarian teks lengkap<button data-href="#Hybrid-Search-with-semantic-search-and-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-indexing-Pipeline" class="common-anchor-header">Membuat pipeline pengindeksan</h3><p>Dalam pencarian hibrida, kami menggunakan fungsi BM25 untuk melakukan pencarian teks lengkap, dan menentukan bidang vektor padat <code translate="no">vector</code>, untuk melakukan pencarian semantik.</p>
<pre><code translate="no" class="language-python">document_store = MilvusDocumentStore(
    connection_args=connection_args,
    vector_field=<span class="hljs-string">&quot;vector&quot;</span>,  <span class="hljs-comment"># The dense vector field.</span>
    sparse_vector_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,  <span class="hljs-comment"># The sparse vector field.</span>
    text_field=<span class="hljs-string">&quot;text&quot;</span>,
    builtin_function=[
        BM25BuiltInFunction(  <span class="hljs-comment"># The BM25 function converts the text into a sparse vector.</span>
            input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
            output_field_names=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
        )
    ],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`).</span>
    drop_old=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Drop the old collection and recreate it.</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Buat pipeline pengindeksan yang mengubah dokumen menjadi sematan. Dokumen-dokumen tersebut kemudian ditulis ke penyimpanan dokumen Milvus.</p>
<pre><code translate="no" class="language-python">writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)

indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>, OpenAIDocumentEmbedder())
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, writer)
indexing_pipeline.connect(<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>, <span class="hljs-string">&quot;writer&quot;</span>)
indexing_pipeline.run({<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>: {<span class="hljs-string">&quot;documents&quot;</span>: documents}})

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of documents:&quot;</span>, document_store.count_documents())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Calculating embeddings: 100%|██████████| 1/1 [00:01&lt;00:00,  1.15s/it]


Number of documents: 3
</code></pre>
<h3 id="Create-the-retrieval-pipeline" class="common-anchor-header">Membuat pipeline pengambilan</h3><p>Buat pipeline pengambilan yang mengambil dokumen dari penyimpanan dokumen Milvus menggunakan <code translate="no">MilvusHybridRetriever</code>, yang berisi <code translate="no">document_store</code> dan menerima parameter tentang pencarian hibrida.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># from pymilvus import WeightedRanker</span>
retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component(<span class="hljs-string">&quot;dense_text_embedder&quot;</span>, OpenAITextEmbedder())
retrieval_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>,
    MilvusHybridRetriever(
        document_store=document_store,
        <span class="hljs-comment"># top_k=3,</span>
        <span class="hljs-comment"># reranker=WeightedRanker(0.5, 0.5),  # Default is RRFRanker()</span>
    ),
)

retrieval_pipeline.connect(<span class="hljs-string">&quot;dense_text_embedder.embedding&quot;</span>, <span class="hljs-string">&quot;retriever.query_embedding&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">&lt;haystack.core.pipeline.pipeline.Pipeline object at 0x3383ad990&gt;
🚅 Components
  - dense_text_embedder: OpenAITextEmbedder
  - retriever: MilvusHybridRetriever
🛤️ Connections
  - dense_text_embedder.embedding -&gt; retriever.query_embedding (List[float])
</code></pre>
<p>Ketika melakukan pencarian hibrida menggunakan <code translate="no">MilvusHybridRetriever</code>, kita bisa mengatur parameter topK dan reranker secara opsional. Secara otomatis akan menangani penyematan vektor dan fungsi bawaan dan akhirnya menggunakan reranker untuk menyempurnakan hasilnya. Detail implementasi yang mendasari proses pencarian disembunyikan dari pengguna.</p>
<p>Untuk informasi lebih lanjut tentang pencarian hybrid, Anda dapat merujuk ke <a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">pengenalan Pencarian Hybrid</a>.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;Who likes swimming?&quot;</span>

retrieval_results = retrieval_pipeline.run(
    {
        <span class="hljs-string">&quot;dense_text_embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question},
        <span class="hljs-string">&quot;retriever&quot;</span>: {<span class="hljs-string">&quot;query_text&quot;</span>: question},
    }
)

retrieval_results[<span class="hljs-string">&quot;retriever&quot;</span>][<span class="hljs-string">&quot;documents&quot;</span>][<span class="hljs-number">0</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document(id=bd334348dd2087c785e99b5a0009f33d9b8b8198736f6415df5d92602d81fd3e, content: 'Bob likes swimming', meta: {'category': 'sport'}, score: 0.032786883413791656, embedding: vector of size 1536)
</code></pre>
<h2 id="Customize-analyzer" class="common-anchor-header">Menyesuaikan penganalisis<button data-href="#Customize-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Penganalisis sangat penting dalam pencarian teks lengkap dengan memecah kalimat menjadi token dan melakukan analisis leksikal seperti stemming dan penghilangan kata henti. Penganalisis biasanya bersifat spesifik untuk bahasa tertentu. Anda dapat merujuk ke <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">panduan ini</a> untuk mempelajari lebih lanjut tentang penganalisis di Milvus.</p>
<p>Milvus mendukung dua jenis penganalisis: <strong>Penganalisis bawaan</strong> dan <strong>Penganalisis Khusus</strong>. Secara default, <code translate="no">BM25BuiltInFunction</code> akan menggunakan penganalisis <a href="https://milvus.io/docs/standard-analyzer.md">bawaan standar</a>, yang merupakan penganalisis paling dasar yang menandai teks dengan tanda baca.</p>
<p>Jika Anda ingin menggunakan penganalisis yang berbeda atau menyesuaikan penganalisis, Anda dapat memasukkan parameter <code translate="no">analyzer_params</code> dalam inisialisasi <code translate="no">BM25BuiltInFunction</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params_custom = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter</span>
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},  <span class="hljs-comment"># Custom filter</span>
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},  <span class="hljs-comment"># Custom filter</span>
    ],
}

document_store = MilvusDocumentStore(
    connection_args=connection_args,
    vector_field=<span class="hljs-string">&quot;vector&quot;</span>,
    sparse_vector_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    text_field=<span class="hljs-string">&quot;text&quot;</span>,
    builtin_function=[
        BM25BuiltInFunction(
            input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
            output_field_names=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
            analyzer_params=analyzer_params_custom,  <span class="hljs-comment"># Custom analyzer parameters.</span>
            enable_match=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Whether to enable match.</span>
        )
    ],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
    drop_old=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># write documents to the document store</span>
writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)
indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>, OpenAIDocumentEmbedder())
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, writer)
indexing_pipeline.connect(<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>, <span class="hljs-string">&quot;writer&quot;</span>)
indexing_pipeline.run({<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>: {<span class="hljs-string">&quot;documents&quot;</span>: documents}})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Calculating embeddings: 100%|██████████| 1/1 [00:00&lt;00:00,  1.39it/s]





{'dense_doc_embedder': {'meta': {'model': 'text-embedding-ada-002-v2',
   'usage': {'prompt_tokens': 11, 'total_tokens': 11}}},
 'writer': {'documents_written': 3}}
</code></pre>
<p>Kita dapat melihat skema koleksi Milvus dan memastikan penganalisis yang disesuaikan diatur dengan benar.</p>
<pre><code translate="no" class="language-python">document_store.col.schema
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'auto_id': False, 'description': '', 'fields': [{'name': 'text', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535, 'enable_match': True, 'enable_analyzer': True, 'analyzer_params': {'tokenizer': 'standard', 'filter': ['lowercase', {'type': 'length', 'max': 40}, {'type': 'stop', 'stop_words': ['of', 'to']}]}}}, {'name': 'id', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535}, 'is_primary': True, 'auto_id': False}, {'name': 'vector', 'description': '', 'type': &lt;DataType.FLOAT_VECTOR: 101&gt;, 'params': {'dim': 1536}}, {'name': 'sparse_vector', 'description': '', 'type': &lt;DataType.SPARSE_FLOAT_VECTOR: 104&gt;, 'is_function_output': True}], 'enable_dynamic_field': True, 'functions': [{'name': 'bm25_function_7b6e15a4', 'description': '', 'type': &lt;FunctionType.BM25: 1&gt;, 'input_field_names': ['text'], 'output_field_names': ['sparse_vector'], 'params': {}}]}
</code></pre>
<p>Untuk detail konsep lebih lanjut, misalnya, <code translate="no">analyzer</code>, <code translate="no">tokenizer</code>, <code translate="no">filter</code>, <code translate="no">enable_match</code>, <code translate="no">analyzer_params</code>, silakan merujuk ke <a href="https://milvus.io/docs/analyzer-overview.md">dokumentasi penganalisis</a>.</p>
<h2 id="Using-Hybrid-Search-in-RAG-pipeline" class="common-anchor-header">Menggunakan Pencarian Hibrida dalam pipeline RAG<button data-href="#Using-Hybrid-Search-in-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Kita telah mempelajari cara menggunakan fungsi bawaan BM25 dasar di Haystack dan Milvus dan menyiapkan <code translate="no">document_store</code> yang telah dimuat. Mari kita perkenalkan implementasi RAG yang dioptimalkan dengan pencarian hybrid.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://github.com/milvus-io/bootcamp/blob/master/images/advanced_rag/hybrid_and_rerank.png?raw=1" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Diagram ini menunjukkan proses Hybrid Retrieve &amp; Reranking, menggabungkan BM25 untuk pencocokan kata kunci dan pencarian vektor padat untuk pencarian semantik. Hasil dari kedua metode tersebut digabungkan, diberi peringkat ulang, dan diteruskan ke LLM untuk menghasilkan jawaban akhir.</p>
<p>Pencarian hibrida menyeimbangkan ketepatan dan pemahaman semantik, meningkatkan akurasi dan ketahanan untuk beragam pertanyaan. Metode ini mengambil kandidat dengan pencarian teks lengkap BM25 dan pencarian vektor, memastikan pencarian yang semantik, memahami konteks, dan akurat.</p>
<p>Mari kita coba implementasi RAG yang dioptimalkan dengan pencarian hybrid.</p>
<pre><code translate="no" class="language-python">prompt_template = <span class="hljs-string">&quot;&quot;&quot;Answer the following query based on the provided context. If the context does
                     not include an answer, reply with &#x27;I don&#x27;t know&#x27;.\n
                     Query: {{query}}
                     Documents:
                     {% for doc in documents %}
                        {{ doc.content }}
                     {% endfor %}
                     Answer:
                  &quot;&quot;&quot;</span>

rag_pipeline = Pipeline()
rag_pipeline.add_component(<span class="hljs-string">&quot;text_embedder&quot;</span>, OpenAITextEmbedder())
rag_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>, MilvusHybridRetriever(document_store=document_store, top_k=<span class="hljs-number">1</span>)
)
rag_pipeline.add_component(<span class="hljs-string">&quot;prompt_builder&quot;</span>, PromptBuilder(template=prompt_template))
rag_pipeline.add_component(
    <span class="hljs-string">&quot;generator&quot;</span>,
    OpenAIGenerator(
        api_key=Secret.from_token(os.getenv(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>)),
        generation_kwargs={<span class="hljs-string">&quot;temperature&quot;</span>: <span class="hljs-number">0</span>},
    ),
)
rag_pipeline.connect(<span class="hljs-string">&quot;text_embedder.embedding&quot;</span>, <span class="hljs-string">&quot;retriever.query_embedding&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;retriever.documents&quot;</span>, <span class="hljs-string">&quot;prompt_builder.documents&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;prompt_builder&quot;</span>, <span class="hljs-string">&quot;generator&quot;</span>)

results = rag_pipeline.run(
    {
        <span class="hljs-string">&quot;text_embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question},
        <span class="hljs-string">&quot;retriever&quot;</span>: {<span class="hljs-string">&quot;query_text&quot;</span>: question},
        <span class="hljs-string">&quot;prompt_builder&quot;</span>: {<span class="hljs-string">&quot;query&quot;</span>: question},
    }
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;RAG answer:&quot;</span>, results[<span class="hljs-string">&quot;generator&quot;</span>][<span class="hljs-string">&quot;replies&quot;</span>][<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">RAG answer: Bob likes swimming.
</code></pre>
<p>Untuk informasi lebih lanjut tentang cara menggunakan milvus-haystack, silakan merujuk ke <a href="https://github.com/milvus-io/milvus-haystack">repositori resmi milvus-haystack</a>.</p>
