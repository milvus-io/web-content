---
id: llamaindex_milvus_hybrid_search.md
title: RAG menggunakan Pencarian Hibrida dengan Milvus dan LlamaIndex
related_key: LlamaIndex
summary: >-
  Buku catatan ini mendemonstrasikan bagaimana menggunakan Milvus untuk
  pencarian hibrida di dalam pipeline RAG
  [LlamaIndex](https://www.llamaindex.ai/). Kita akan mulai dengan pencarian
  hibrida default yang direkomendasikan (semantik + BM25) dan kemudian
  mengeksplorasi metode-metode alternatif lain yang jarang digunakan dan
  kustomisasi perangkai hibrida.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="common-anchor-header">RAG menggunakan Pencarian Hibrida dengan Milvus dan LlamaIndex<button data-href="#RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p>Pencarian hibrida memanfaatkan kekuatan pencarian semantik dan pencocokan kata kunci untuk memberikan hasil yang lebih akurat dan relevan secara kontekstual. Dengan menggabungkan keunggulan pencarian semantik dan pencocokan kata kunci, pencarian hibrida sangat efektif dalam tugas-tugas pencarian informasi yang kompleks.</p>
<p>Buku catatan ini mendemonstrasikan cara menggunakan Milvus untuk pencarian hibrida di pipeline <a href="https://www.llamaindex.ai/">LlamaIndex</a> RAG. Kita akan mulai dengan pencarian hibrida default yang direkomendasikan (semantik + BM25) dan kemudian mengeksplorasi metode-metode penyematan jarang alternatif lainnya dan kustomisasi perangking hibrida.</p>
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
    </button></h2><p><strong>Instal dependensi</strong></p>
<p>Sebelum memulai, pastikan Anda telah menginstal dependensi berikut ini:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Jika Anda menggunakan Google Colab, Anda mungkin perlu <strong>memulai ulang runtime</strong> (Navigasikan ke menu "Runtime" di bagian atas antarmuka, dan pilih "Restart session" dari menu tarik-turun).</p>
</div>
<p><strong>Menyiapkan akun</strong></p>
<p>Tutorial ini menggunakan OpenAI untuk penyematan teks dan pembuatan jawaban. Anda perlu menyiapkan <a href="https://platform.openai.com/api-keys">kunci API OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk menggunakan penyimpanan vektor Milvus, tentukan server Milvus Anda <code translate="no">URI</code> (dan secara opsional dengan <code translate="no">TOKEN</code>). Untuk memulai server Milvus, Anda dapat mengatur server Milvus dengan mengikuti <a href="https://milvus.io/docs/install-overview.md">panduan instalasi Milvus</a> atau mencoba <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a> secara gratis.</p>
<blockquote>
<p>Pencarian teks lengkap saat ini didukung di Milvus Standalone, Milvus Distributed, dan Zilliz Cloud, tetapi belum di Milvus Lite (direncanakan untuk implementasi di masa mendatang). Hubungi support@zilliz.com untuk informasi lebih lanjut.</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Memuat data contoh</strong></p>
<p>Jalankan perintah berikut untuk mengunduh dokumen contoh ke dalam direktori "data/paul_graham":</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian gunakan <code translate="no">SimpleDirectoryReaderLoad</code> untuk memuat esai "What I Worked On" oleh Paul Graham:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Example document:\n&quot;</span>, documents[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Example document:
 Doc ID: f9cece8c-9022-46d8-9d0e-f29d70e1dbbe
Text: What I Worked On  February 2021  Before college the two main
things I worked on, outside of school, were writing and programming. I
didn't write essays. I wrote what beginning writers were supposed to
write then, and probably still are: short stories. My stories were
awful. They had hardly any plot, just characters with strong feelings,
which I ...
</code></pre>
<h2 id="Hybrid-Search-with-BM25" class="common-anchor-header">Pencarian Gabungan dengan BM25<button data-href="#Hybrid-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagian ini menunjukkan cara melakukan pencarian gabungan menggunakan BM25. Untuk memulai, kita akan menginisialisasi <code translate="no">MilvusVectorStore</code> dan membuat indeks untuk dokumen contoh. Konfigurasi default yang digunakan:</p>
<ul>
<li>Penyematan padat dari model penyematan default ( <code translate="no">text-embedding-ada-002</code> milik OpenAI)</li>
<li>BM25 untuk pencarian teks lengkap jika enable_sparse bernilai True</li>
<li>RRFRanker dengan k = 60 untuk menggabungkan hasil jika pencarian hibrida diaktifkan</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documnts</span>
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> StorageContext, VectorStoreIndex


vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># vector dimension depends on the embedding model</span>
    enable_sparse=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># enable the default full-text search using BM25</span>
    overwrite=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># drop the collection if it already exists</span>
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:38:16,645 [DEBUG][_create_connection]: Created new connection using: cf0f4df74b18418bb89ec512063c1244 (async_milvus_client.py:547)
Sparse embedding function is not provided, using default.
Default sparse embedding function: BM25BuiltInFunction(input_field_names='text', output_field_names='sparse_embedding').
</code></pre>
<p>Berikut adalah informasi lebih lanjut tentang argumen untuk mengonfigurasi bidang padat dan bidang jarang di <code translate="no">MilvusVectorStore</code>:</p>
<p><strong>bidang padat</strong></p>
<ul>
<li><code translate="no">enable_dense (bool)</code>: Bendera boolean untuk mengaktifkan atau menonaktifkan penyematan padat. Nilai defaultnya adalah True (Benar).</li>
<li><code translate="no">dim (int, optional)</code>: Dimensi vektor penyematan untuk koleksi.</li>
<li><code translate="no">embedding_field (str, optional)</code>: Nama bidang penyematan padat untuk koleksi, nilai defaultnya adalah DEFAULT_EMBEDDING_KEY.</li>
<li><code translate="no">index_config (dict, optional)</code>: Konfigurasi yang digunakan untuk membangun indeks embedding padat. Defaultnya adalah Tidak Ada.</li>
<li><code translate="no">search_config (dict, optional)</code>: Konfigurasi yang digunakan untuk mencari indeks padat Milvus. Perhatikan bahwa ini harus kompatibel dengan jenis indeks yang ditentukan oleh <code translate="no">index_config</code>. Setelan default untuk Tidak Ada.</li>
<li><code translate="no">similarity_metric (str, optional)</code>: Metrik kemiripan yang digunakan untuk penyematan padat, saat ini mendukung IP, COSINE, dan L2.</li>
</ul>
<p><strong>sparse field</strong></p>
<ul>
<li><code translate="no">enable_sparse (bool)</code>: Bendera boolean untuk mengaktifkan atau menonaktifkan penyematan jarang. Defaultnya adalah False.</li>
<li><code translate="no">sparse_embedding_field (str)</code>: Nama bidang penyematan jarang, defaultnya adalah DEFAULT_SPARSE_EMBEDDING_KEY.</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>: Jika enable_sparse bernilai True, objek ini harus disediakan untuk mengonversi teks ke sematan jarang. Jika Tidak Ada, fungsi penyematan jarang default (BM25BuiltInFunction) akan digunakan, atau gunakan BGEM3SparseEmbedding jika koleksi yang ada tidak memiliki fungsi bawaan.</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>: Konfigurasi yang digunakan untuk membangun indeks sematan jarang. Defaultnya adalah Tidak Ada.</li>
</ul>
<p>Untuk mengaktifkan pencarian hibrida selama tahap kueri, setel <code translate="no">vector_store_query_mode</code> ke "hibrida". Ini akan menggabungkan dan memberi peringkat ulang hasil pencarian dari pencarian semantik dan pencarian teks lengkap. Mari kita uji dengan contoh kueri: "Apa yang dipelajari penulis di Viaweb?":</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap

query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned about retail, the importance of user feedback, and the significance of growth
rate as the ultimate test of a startup at Viaweb.
</code></pre>
<h3 id="Customize-text-analyzer" class="common-anchor-header">Menyesuaikan penganalisis teks</h3><p>Penganalisis memainkan peran penting dalam pencarian teks lengkap dengan memecah kalimat menjadi token dan melakukan pemrosesan leksikal, seperti stemming dan penghilangan kata berimbuhan. Penganalisis biasanya bersifat spesifik untuk bahasa tertentu. Untuk lebih jelasnya, lihat <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Panduan Penganalisis Milvus</a>.</p>
<p>Milvus mendukung dua jenis penganalisis: <strong>Penganalisis bawaan</strong> dan <strong>Penganalisis Khusus</strong>. Secara default, jika <code translate="no">enable_sparse</code> diatur ke True, <code translate="no">MilvusVectorStore</code> menggunakan <code translate="no">BM25BuiltInFunction</code> dengan konfigurasi default, menggunakan penganalisis bawaan standar yang menandai teks berdasarkan tanda baca.</p>
<p>Untuk menggunakan penganalisis yang berbeda atau menyesuaikan yang sudah ada, Anda dapat memberikan nilai pada argumen <code translate="no">analyzer_params</code> saat membuat <code translate="no">BM25BuiltInFunction</code>. Kemudian, tetapkan fungsi ini sebagai <code translate="no">sparse_embedding_function</code> di <code translate="no">MilvusVectorStore</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BM25BuiltInFunction

bm25_function = BM25BuiltInFunction(
    analyzer_params={
        <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter</span>
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},  <span class="hljs-comment"># Custom cap size of a single token</span>
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},  <span class="hljs-comment"># Custom stopwords</span>
        ],
    },
    enable_match=<span class="hljs-literal">True</span>,
)

vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=bm25_function,  <span class="hljs-comment"># BM25 with custom analyzer</span>
    overwrite=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:38:48,085 [DEBUG][_create_connection]: Created new connection using: 61afd81600cb46ee89f887f16bcbfe55 (async_milvus_client.py:547)
</code></pre>
<h2 id="Hybrid-Search-with-Other-Sparse-Embedding" class="common-anchor-header">Pencarian Hibrida dengan Penyematan Jarang Lainnya<button data-href="#Hybrid-Search-with-Other-Sparse-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>Selain menggabungkan pencarian semantik dengan BM25, Milvus juga mendukung pencarian hibrida menggunakan fungsi sematan jarang seperti <a href="https://arxiv.org/abs/2402.03216">BGE-M3</a>. Contoh berikut ini menggunakan <code translate="no">BGEM3SparseEmbeddingFunction</code> bawaan untuk menghasilkan sematan jarang.</p>
<p>Pertama, kita perlu menginstal paket <code translate="no">FlagEmbedding</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -q FlagEmbedding</span>
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian mari kita buat penyimpanan vektor dan indeks menggunakan model OpenAI bawaan untuk embedding densen dan BGE-M3 bawaan untuk embedding jarang:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BGEM3SparseEmbeddingFunction

vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=BGEM3SparseEmbeddingFunction(),
    overwrite=<span class="hljs-literal">True</span>,
)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 68871.99it/s]
2025-04-17 03:39:02,074 [DEBUG][_create_connection]: Created new connection using: ff4886e2f8da44e08304b748d9ac9b51 (async_milvus_client.py:547)
Chunks: 100%|██████████| 1/1 [00:00&lt;00:00,  1.07it/s]
</code></pre>
<p>Sekarang mari kita lakukan kueri penelusuran hibrida dengan contoh pertanyaan:</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb??&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Chunks: 100%|██████████| 1/1 [00:00&lt;00:00, 17.29it/s]


The author learned about retail, the importance of user feedback, the value of growth rate in a
startup, the significance of pricing strategy, the benefits of working on things that weren't
prestigious, and the challenges and rewards of running a startup.
</code></pre>
<h3 id="Customize-Sparse-Embedding-Function" class="common-anchor-header">Menyesuaikan Fungsi Penyematan Jarang</h3><p>Anda juga dapat menyesuaikan fungsi sematan jarang selama fungsi tersebut diwarisi dari <code translate="no">BaseSparseEmbeddingFunction</code>, termasuk metode berikut ini:</p>
<ul>
<li><code translate="no">encode_queries</code>: Metode ini mengubah teks menjadi daftar sematan jarang untuk kueri.</li>
<li><code translate="no">encode_documents</code>: Metode ini mengubah teks menjadi daftar sematan jarang untuk dokumen.</li>
</ul>
<p>Keluaran dari setiap metode harus mengikuti format sematan jarang, yaitu daftar kamus. Setiap kamus harus memiliki kunci (bilangan bulat) yang mewakili dimensi, dan nilai yang sesuai (float) yang mewakili besarnya penyematan dalam dimensi tersebut (misalnya, {1: 0.5, 2: 0.3}).</p>
<p>Sebagai contoh, berikut ini adalah implementasi fungsi penyematan jarang kustom menggunakan BGE-M3:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> FlagEmbedding <span class="hljs-keyword">import</span> BGEM3FlagModel
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BaseSparseEmbeddingFunction


<span class="hljs-keyword">class</span> <span class="hljs-title class_">ExampleEmbeddingFunction</span>(<span class="hljs-title class_ inherited__">BaseSparseEmbeddingFunction</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.model = BGEM3FlagModel(<span class="hljs-string">&quot;BAAI/bge-m3&quot;</span>, use_fp16=<span class="hljs-literal">False</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_queries</span>(<span class="hljs-params">self, queries: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>):
        outputs = <span class="hljs-variable language_">self</span>.model.encode(
            queries,
            return_dense=<span class="hljs-literal">False</span>,
            return_sparse=<span class="hljs-literal">True</span>,
            return_colbert_vecs=<span class="hljs-literal">False</span>,
        )[<span class="hljs-string">&quot;lexical_weights&quot;</span>]
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">self</span>._to_standard_dict(output) <span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_documents</span>(<span class="hljs-params">self, documents: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>):
        outputs = <span class="hljs-variable language_">self</span>.model.encode(
            documents,
            return_dense=<span class="hljs-literal">False</span>,
            return_sparse=<span class="hljs-literal">True</span>,
            return_colbert_vecs=<span class="hljs-literal">False</span>,
        )[<span class="hljs-string">&quot;lexical_weights&quot;</span>]
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">self</span>._to_standard_dict(output) <span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_to_standard_dict</span>(<span class="hljs-params">self, raw_output</span>):
        result = {}
        <span class="hljs-keyword">for</span> k <span class="hljs-keyword">in</span> raw_output:
            result[<span class="hljs-built_in">int</span>(k)] = raw_output[k]
        <span class="hljs-keyword">return</span> result
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-hybrid-reranker" class="common-anchor-header">Menyesuaikan reranker hibrida<button data-href="#Customize-hybrid-reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mendukung dua jenis <a href="https://milvus.io/docs/reranking.md">strategi perankingan ulang</a>: Reciprocal Rank Fusion (RRF) dan Penilaian Tertimbang. Pemeringkat default dalam pencarian hybrid <code translate="no">MilvusVectorStore</code> adalah RRF dengan k=60. Untuk menyesuaikan pemeringkat hibrida, ubah parameter berikut ini:</p>
<ul>
<li><code translate="no">hybrid_ranker (str)</code>: Menentukan jenis pemeringkat yang digunakan dalam kueri penelusuran hibrida. Saat ini hanya mendukung ["RRFRanker", "WeightedRanker"]. Defaultnya adalah "RRFRanker".</li>
<li><code translate="no">hybrid_ranker_params (dict, optional)</code>: Parameter konfigurasi untuk pemeringkat hibrida. Struktur kamus ini tergantung pada pemeringkat spesifik yang digunakan:<ul>
<li>Untuk "RRFRanker", harus menyertakan:<ul>
<li>"k" (int): Parameter yang digunakan dalam Reciprocal Rank Fusion (RRF). Nilai ini digunakan untuk menghitung skor peringkat sebagai bagian dari algoritme RRF, yang menggabungkan beberapa strategi peringkat menjadi satu skor untuk meningkatkan relevansi penelusuran. Nilai defaultnya adalah 60 jika tidak ditentukan.</li>
</ul></li>
<li>Untuk "WeightedRanker", diharapkan:<ul>
<li>"bobot" (daftar mengambang): Daftar yang terdiri dari dua bobot:<ol>
<li>Bobot untuk komponen penyematan padat.</li>
<li>Bobot untuk komponen penyematan yang jarang. Bobot ini digunakan untuk menyeimbangkan signifikansi komponen penyematan yang padat dan jarang dalam proses pengambilan hibrida. Bobot default adalah [1.0, 1.0] jika tidak ditentukan.</li>
</ol></li>
</ul></li>
</ul></li>
</ul>
<pre><code translate="no" class="language-python">vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    overwrite=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># Use the existing collection created in the previous example</span>
    enable_sparse=<span class="hljs-literal">True</span>,
    hybrid_ranker=<span class="hljs-string">&quot;WeightedRanker&quot;</span>,
    hybrid_ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">1.0</span>, <span class="hljs-number">0.5</span>]},
)
index = VectorStoreIndex.from_vector_store(vector_store)
query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:44:00,419 [DEBUG][_create_connection]: Created new connection using: 09c051fb18c04f97a80f07958856587b (async_milvus_client.py:547)
Sparse embedding function is not provided, using default.
No built-in function detected, using BGEM3SparseEmbeddingFunction().
Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 136622.28it/s]
Chunks: 100%|██████████| 1/1 [00:00&lt;00:00,  1.07it/s]


The author learned several valuable lessons at Viaweb, including the importance of understanding
growth rate as the ultimate test of a startup, the significance of user feedback in shaping the
software, and the realization that web applications were the future of software development.
Additionally, the experience at Viaweb taught the author about the challenges and rewards of running
a startup, the value of simplicity in software design, and the impact of pricing strategies on
attracting customers.
</code></pre>
