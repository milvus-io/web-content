---
id: llamaindex_milvus_full_text_search.md
title: Menggunakan Pencarian Teks Lengkap dengan LlamaIndex dan Milvus
related_key: LlamaIndex
summary: >-
  Dalam tutorial ini, Anda akan belajar cara menggunakan LlamaIndex dan Milvus
  untuk membangun sistem RAG menggunakan pencarian teks lengkap dan pencarian
  hybrid. Kita akan mulai dengan mengimplementasikan pencarian teks lengkap saja
  dan kemudian menyempurnakannya dengan mengintegrasikan pencarian semantik
  untuk hasil yang lebih komprehensif.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="common-anchor-header">Menggunakan Pencarian Teks Lengkap dengan LlamaIndex dan Milvus<button data-href="#Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>Pencarian teks lengkap</strong> menggunakan pencocokan kata kunci yang tepat, dan sering kali memanfaatkan algoritme seperti BM25 untuk menentukan peringkat dokumen berdasarkan relevansi. Dalam sistem <strong>Retrieval-Augmented Generation (RAG)</strong>, metode ini mengambil teks yang relevan untuk meningkatkan respons yang dihasilkan oleh AI.</p>
<p>Sementara itu, <strong>pencarian semantik</strong> menginterpretasikan makna kontekstual untuk memberikan hasil yang lebih luas. Menggabungkan kedua pendekatan tersebut menciptakan <strong>pencarian hibrida</strong> yang meningkatkan pencarian informasi-terutama dalam kasus-kasus di mana metode tunggal gagal.</p>
<p>Dengan pendekatan Sparse-BM25 dari <a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5</a>, teks mentah secara otomatis diubah menjadi vektor jarang. Hal ini menghilangkan kebutuhan untuk pembuatan sematan jarang secara manual dan memungkinkan strategi pencarian hibrida yang menyeimbangkan pemahaman semantik dengan relevansi kata kunci.</p>
<p>Dalam tutorial ini, Anda akan belajar cara menggunakan LlamaIndex dan Milvus untuk membangun sistem RAG menggunakan pencarian teks lengkap dan pencarian hybrid. Kita akan mulai dengan mengimplementasikan pencarian teks lengkap saja dan kemudian menyempurnakannya dengan mengintegrasikan pencarian semantik untuk hasil yang lebih komprehensif.</p>
<blockquote>
<p>Sebelum melanjutkan dengan tutorial ini, pastikan Anda sudah terbiasa dengan <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">pencarian teks lengkap</a> dan <a href="https://milvus.io/docs/integrate_with_llamaindex.md">dasar-dasar penggunaan Milvus di LlamaIndex</a>.</p>
</blockquote>
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
<p>Sebelum memulai, pastikan Anda sudah menginstal dependensi berikut ini:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>Jika Anda menggunakan Google Colab, Anda mungkin perlu <strong>memulai ulang runtime</strong> (Arahkan ke menu "Runtime" di bagian atas antarmuka, dan pilih "Restart session" dari menu tarik-turun).</p>
</blockquote>
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
<p><strong>Mengunduh data contoh</strong></p>
<p>Jalankan perintah berikut untuk mengunduh dokumen contoh ke dalam direktori "data/paul_graham":</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$wget</span> <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">--2025-03-27 07:49:01--  https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.108.133, 185.199.109.133, 185.199.110.133, ...
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.108.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 75042 (73K) [text/plain]
Saving to: ‘data/paul_graham/paul_graham_essay.txt’

data/paul_graham/pa 100%[===================&gt;]  73.28K  --.-KB/s    in 0.07s   

2025-03-27 07:49:01 (1.01 MB/s) - ‘data/paul_graham/paul_graham_essay.txt’ saved [75042/75042]
</code></pre>
<h2 id="RAG-with-Full-Text-Search" class="common-anchor-header">RAG dengan Pencarian Teks Lengkap<button data-href="#RAG-with-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Mengintegrasikan pencarian teks lengkap ke dalam sistem RAG menyeimbangkan pencarian semantik dengan pengambilan berbasis kata kunci yang tepat dan dapat diprediksi. Anda juga dapat memilih untuk hanya menggunakan pencarian teks lengkap meskipun disarankan untuk menggabungkan pencarian teks lengkap dengan pencarian semantik untuk hasil pencarian yang lebih baik. Di sini, untuk tujuan demonstrasi, kami akan menunjukkan pencarian teks lengkap saja dan pencarian gabungan.</p>
<p>Untuk memulai, gunakan <code translate="no">SimpleDirectoryReaderLoad</code> untuk memuat esai "What I Worked On" oleh Paul Graham:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Example document:\n&quot;</span>, documents[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Example document:
 Doc ID: 16b7942f-bf1a-4197-85e1-f31d51ea25a9
Text: What I Worked On  February 2021  Before college the two main
things I worked on, outside of school, were writing and programming. I
didn't write essays. I wrote what beginning writers were supposed to
write then, and probably still are: short stories. My stories were
awful. They had hardly any plot, just characters with strong feelings,
which I ...
</code></pre>
<h3 id="Full-Text-Search-with-BM25" class="common-anchor-header">Penelusuran Teks Lengkap dengan BM25</h3><p><code translate="no">MilvusVectorStore</code> milik LlamaIndex mendukung pencarian teks lengkap, sehingga memungkinkan pengambilan berbasis kata kunci yang efisien. Dengan menggunakan fungsi bawaan sebagai <code translate="no">sparse_embedding_function</code>, ia menerapkan penilaian BM25 untuk menentukan peringkat hasil pencarian.</p>
<p>Pada bagian ini, kami akan mendemonstrasikan cara mengimplementasikan sistem RAG menggunakan BM25 untuk pencarian teks lengkap.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BM25BuiltInFunction
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings

<span class="hljs-comment"># Skip dense embedding model</span>
Settings.embed_model = <span class="hljs-literal">None</span>

<span class="hljs-comment"># Build Milvus vector store creating a new collection</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    enable_dense=<span class="hljs-literal">False</span>,
    enable_sparse=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Only enable sparse to demo full text search</span>
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Store documents in Milvus</span>
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Embeddings have been explicitly disabled. Using MockEmbedding.
</code></pre>
<p>Kode di atas menyisipkan contoh dokumen ke dalam Milvus dan membangun indeks untuk mengaktifkan pemeringkatan BM25 untuk pencarian teks lengkap. Kode ini menonaktifkan penyematan padat dan menggunakan <code translate="no">BM25BuiltInFunction</code> dengan parameter default.</p>
<p>Anda dapat menentukan bidang input dan output di parameter <code translate="no">BM25BuiltInFunction</code>:</p>
<ul>
<li><code translate="no">input_field_names (str)</code>: Bidang teks masukan (default: "teks"). Ini menunjukkan bidang teks mana yang diterapkan algoritme BM25. Ubah ini jika menggunakan koleksi Anda sendiri dengan nama bidang teks yang berbeda.</li>
<li><code translate="no">output_field_names (str)</code>: Bidang tempat output dari fungsi BM25 ini disimpan (default: "sparse_embedding").</li>
</ul>
<p>Setelah penyimpanan vektor disiapkan, Anda dapat melakukan kueri pencarian teks lengkap menggunakan Milvus dengan mode kueri "sparse" atau "text_search":</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap

query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;sparse&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. They learned about the importance of growth
rate as the ultimate test of a startup, the value of building stores for users to understand retail
and software usability, and the significance of being the &quot;entry level&quot; option in a market.
Additionally, they discovered the accidental success of making Viaweb inexpensive, the challenges of
hiring too many people, and the relief felt when the company was acquired by Yahoo.
</code></pre>
<h4 id="Customize-text-analyzer" class="common-anchor-header">Menyesuaikan penganalisis teks</h4><p>Penganalisis memainkan peran penting dalam pencarian teks lengkap dengan memecah kalimat menjadi token dan melakukan pemrosesan leksikal, seperti stemming dan penghilangan kata berimbuhan. Penganalisis biasanya bersifat spesifik untuk bahasa tertentu. Untuk lebih jelasnya, lihat <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Panduan Penganalisis Milvus</a>.</p>
<p>Milvus mendukung dua jenis penganalisis: <strong>Penganalisis Bawaan</strong> dan <strong>Penganalisis Khusus</strong>. Secara default, <code translate="no">BM25BuiltInFunction</code> menggunakan penganalisis bawaan standar, yang menandai teks berdasarkan tanda baca.</p>
<p>Untuk menggunakan penganalisis yang berbeda atau menyesuaikan penganalisis yang sudah ada, Anda dapat mengoper nilai ke argumen <code translate="no">analyzer_params</code>:</p>
<pre><code translate="no" class="language-python">bm25_function = BM25BuiltInFunction(
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
<button class="copy-code-btn"></button></code></pre>
<h3 id="Hybrid-Search-with-Reranker" class="common-anchor-header">Pencarian Hibrida dengan Perangking Ulang</h3><p>Sistem pencarian hibrida menggabungkan pencarian semantik dan pencarian teks lengkap, mengoptimalkan kinerja pengambilan dalam sistem RAG.</p>
<p>Contoh berikut ini menggunakan penyematan OpenAI untuk pencarian semantik dan BM25 untuk pencarian teks lengkap:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index over the documnts</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    <span class="hljs-comment"># enable_dense=True,  # enable_dense defaults to True</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># hybrid_ranker=&quot;RRFRanker&quot;,  # hybrid_ranker defaults to &quot;RRFRanker&quot;</span>
    <span class="hljs-comment"># hybrid_ranker_params={},  # hybrid_ranker_params defaults to {}</span>
)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context,
    embed_model=<span class="hljs-string">&quot;default&quot;</span>,  <span class="hljs-comment"># &quot;default&quot; will use OpenAI embedding</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Bagaimana cara kerjanya</strong></p>
<p>Pendekatan ini menyimpan dokumen dalam koleksi Milvus dengan kedua bidang vektor:</p>
<ul>
<li><code translate="no">embedding</code>: Sematan padat yang dihasilkan oleh model sematan OpenAI untuk pencarian semantik.</li>
<li><code translate="no">sparse_embedding</code>: Sematan jarang yang dihitung menggunakan BM25BuiltInFunction untuk pencarian teks lengkap.</li>
</ul>
<p>Selain itu, kami telah menerapkan strategi perankingan ulang menggunakan "RRFRanker" dengan parameter default. Untuk menyesuaikan reranker, Anda dapat mengonfigurasi <code translate="no">hybrid_ranker</code> dan <code translate="no">hybrid_ranker_params</code> dengan mengikuti <a href="https://milvus.io/docs/weighted-ranker.md">Panduan Perangkingan Ulang Milvus</a>.</p>
<p>Sekarang, mari kita uji sistem RAG dengan contoh kueri:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query</span>
query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. These included the importance of
understanding growth rate as the ultimate test of a startup, the impact of hiring too many people,
the challenges of being at the mercy of investors, and the relief experienced when Yahoo bought the
company. Additionally, the author learned about the significance of user feedback, the value of
building stores for users, and the realization that growth rate is crucial for the long-term success
of a startup.
</code></pre>
<p>Pendekatan hibrida ini memastikan respons yang lebih akurat dan sesuai konteks dalam sistem RAG dengan memanfaatkan pengambilan berbasis semantik dan kata kunci.</p>
