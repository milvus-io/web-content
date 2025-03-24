---
id: llamaindex_milvus_async.md
title: Membangun RAG dengan LlamaIndex dan Milvus Async API
related_key: LlamaIndex
summary: >-
  Tutorial ini mendemonstrasikan cara menggunakan LlamaIndex dengan Milvus untuk
  membuat pipeline pemrosesan dokumen asinkron untuk RAG. LlamaIndex menyediakan
  cara untuk memproses dokumen dan menyimpannya dalam vektor db seperti Milvus.
  Dengan memanfaatkan API asinkron dari LlamaIndex dan pustaka klien Milvus
  Python, kita dapat meningkatkan throughput pipeline untuk memproses dan
  mengindeks data dalam jumlah besar secara efisien.
---
<h1 id="RAG-with-Milvus-and-LlamaIndex-Async-API" class="common-anchor-header">RAG dengan Milvus dan LlamaIndex Async API<button data-href="#RAG-with-Milvus-and-LlamaIndex-Async-API" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_async.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_async.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>Tutorial ini mendemonstrasikan cara menggunakan <a href="https://www.llamaindex.ai/">LlamaIndex</a> dengan <a href="https://milvus.io/">Milvus</a> untuk membuat pipeline pemrosesan dokumen asinkron untuk RAG. LlamaIndex menyediakan cara untuk memproses dokumen dan menyimpannya dalam db vektor seperti Milvus. Dengan memanfaatkan API asinkron dari LlamaIndex dan pustaka klien Milvus Python, kita dapat meningkatkan throughput pipeline untuk memproses dan mengindeks data dalam jumlah besar secara efisien.</p>
<p>Dalam tutorial ini, pertama-tama kami akan memperkenalkan penggunaan metode asinkron untuk membangun RAG dengan LlamaIndex dan Milvus dari tingkat tinggi, dan kemudian memperkenalkan penggunaan metode tingkat rendah dan perbandingan kinerja sinkron dan asinkron.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Sebelum Anda mulai<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Cuplikan kode pada halaman ini membutuhkan dependensi pymilvus dan llamaindex. Anda dapat menginstalnya dengan menggunakan perintah berikut:</p>
<pre><code translate="no" class="language-bash">$ pip install -U pymilvus llama-index-vector-stores-milvus llama-index nest-asyncio
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Jika Anda menggunakan Google Colab, untuk mengaktifkan dependensi yang baru saja terinstal, Anda mungkin perlu <strong>memulai ulang runtime</strong> (klik menu "Runtime" di bagian atas layar, dan pilih "Restart session" dari menu tarik-turun).</p>
</div>
<p>Kita akan menggunakan model dari OpenAI. Anda harus menyiapkan <a href="https://platform.openai.com/docs/quickstart">kunci api</a> <code translate="no">OPENAI_API_KEY</code> sebagai variabel lingkungan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Jika Anda menggunakan Jupyter Notebook, Anda harus menjalankan baris kode ini sebelum menjalankan kode asinkron.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> nest_asyncio

nest_asyncio.<span class="hljs-title function_">apply</span>()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-data" class="common-anchor-header">Menyiapkan data</h3><p>Anda dapat mengunduh data sampel dengan perintah berikut:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/&#x27;</span>
$ wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham_essay.txt&#x27;</span>
$ wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/uber_2021.pdf&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG-with-Asynchronous-Processing" class="common-anchor-header">Membangun RAG dengan Pemrosesan Asinkron<button data-href="#Build-RAG-with-Asynchronous-Processing" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagian ini menunjukkan cara membangun sistem RAG yang dapat memproses dokumen secara asinkron.</p>
<p>Impor pustaka yang diperlukan dan tentukan Milvus URI dan dimensi penyematan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> asyncio
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> time

<span class="hljs-keyword">from</span> llama_index.<span class="hljs-property">core</span>.<span class="hljs-property">schema</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">TextNode</span>, <span class="hljs-title class_">NodeRelationship</span>, <span class="hljs-title class_">RelatedNodeInfo</span>
<span class="hljs-keyword">from</span> llama_index.<span class="hljs-property">core</span>.<span class="hljs-property">vector_stores</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">VectorStoreQuery</span>
<span class="hljs-keyword">from</span> llama_index.<span class="hljs-property">vector_stores</span>.<span class="hljs-property">milvus</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusVectorStore</span>

<span class="hljs-variable constant_">URI</span> = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-variable constant_">DIM</span> = <span class="hljs-number">768</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Jika Anda memiliki data dalam skala besar, Anda dapat menyiapkan server Milvus yang berkinerja baik pada <a href="https://milvus.io/docs/quickstart.md">docker atau kubernetes</a>. Dalam pengaturan ini, silakan gunakan uri server, misalnya<code translate="no">http://localhost:19530</code>, sebagai <code translate="no">uri</code>.</li>
<li>Jika Anda ingin menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, layanan cloud yang dikelola sepenuhnya untuk Milvus, sesuaikan <code translate="no">uri</code> dan <code translate="no">token</code>, yang sesuai dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">kunci Public Endpoint dan Api</a> di Zilliz Cloud.</li>
<li>Dalam kasus sistem yang kompleks (seperti komunikasi jaringan), pemrosesan asinkron dapat membawa peningkatan kinerja dibandingkan dengan sinkronisasi. Jadi menurut kami Milvus-Lite tidak cocok untuk menggunakan antarmuka asinkron karena skenario yang digunakan tidak sesuai.</li>
</ul>
</div>
<p>Tentukan fungsi inisialisasi yang dapat kita gunakan lagi untuk membangun kembali koleksi Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-function">def <span class="hljs-title">init_vector_store</span>():
    <span class="hljs-keyword">return</span> <span class="hljs-title">MilvusVectorStore</span>(<span class="hljs-params">
        uri=URI,
        # token=TOKEN,
        dim=DIM,
        collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
        embedding_field=<span class="hljs-string">&quot;embedding&quot;</span>,
        id_field=<span class="hljs-string">&quot;id&quot;</span>,
        similarity_metric=<span class="hljs-string">&quot;COSINE&quot;</span>,
        consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  # Supported values are (`<span class="hljs-string">&quot;Strong&quot;</span>`, `<span class="hljs-string">&quot;Session&quot;</span>`, `<span class="hljs-string">&quot;Bounded&quot;</span>`, `<span class="hljs-string">&quot;Eventually&quot;</span>`</span>). See https:<span class="hljs-comment">//milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
        overwrite</span>=True,  <span class="hljs-meta"># To overwrite the collection <span class="hljs-keyword">if</span> it already exists</span>
    )


vector_store = init_vector_store()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-01-24 20:04:39,414 [DEBUG][_create_connection]: Created new connection using: faa8be8753f74288bffc7e6d38942f8a (async_milvus_client.py:600)
</code></pre>
<p>Gunakan SimpleDirectoryReader untuk membungkus objek dokumen LlamaIndex dari file <code translate="no">paul_graham_essay.txt</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

<span class="hljs-comment"># load documents</span>
documents = SimpleDirectoryReader(
    input_files=[<span class="hljs-string">&quot;./data/paul_graham_essay.txt&quot;</span>]
).load_data()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Document ID:&quot;</span>, documents[<span class="hljs-number">0</span>].doc_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document ID: 41a6f99c-489f-49ff-9821-14e2561140eb
</code></pre>
<p>Instal model penyematan Hugging Face secara lokal. Menggunakan model lokal menghindari risiko mencapai batas tarif API selama penyisipan data asinkron, karena permintaan API secara bersamaan dapat dengan cepat bertambah dan menghabiskan anggaran Anda di API publik. Namun, jika Anda memiliki batas tarif yang tinggi, Anda dapat memilih untuk menggunakan layanan model jarak jauh.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.<span class="hljs-property">embeddings</span>.<span class="hljs-property">huggingface</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">HuggingFaceEmbedding</span>


embed_model = <span class="hljs-title class_">HuggingFaceEmbedding</span>(model_name=<span class="hljs-string">&quot;BAAI/bge-base-en-v1.5&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Buat indeks dan masukkan dokumen.</p>
<p>Kami mengatur <code translate="no">use_async</code> ke <code translate="no">True</code> untuk mengaktifkan mode penyisipan asinkronisasi.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documents</span>
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context,
    embed_model=embed_model,
    use_async=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Inisialisasi LLM.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.<span class="hljs-property">llms</span>.<span class="hljs-property">openai</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">OpenAI</span>

llm = <span class="hljs-title class_">OpenAI</span>(model=<span class="hljs-string">&quot;gpt-3.5-turbo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Ketika membangun mesin kueri, Anda juga dapat mengatur parameter <code translate="no">use_async</code> ke <code translate="no">True</code> untuk mengaktifkan pencarian asinkron.</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine(use_async=<span class="hljs-literal">True</span>, llm=llm)
response = <span class="hljs-keyword">await</span> query_engine.aquery(<span class="hljs-string">&quot;What did the author learn?&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned that the field of artificial intelligence, as practiced at the time, was not as promising as initially believed. The approach of using explicit data structures to represent concepts in AI was not effective in achieving true understanding of natural language. This realization led the author to shift his focus towards Lisp and eventually towards exploring the field of art.
</code></pre>
<h2 id="Explore-the-Async-API" class="common-anchor-header">Menjelajahi API Asinkron<button data-href="#Explore-the-Async-API" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada bagian ini, kami akan memperkenalkan penggunaan API tingkat yang lebih rendah dan membandingkan kinerja sinkron dan asinkron.</p>
<h3 id="Async-add" class="common-anchor-header">Penambahan Asinkronisasi</h3><p>Inisialisasi ulang penyimpanan vektor.</p>
<pre><code translate="no" class="language-python">vector_store = init_vector_store()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-01-24 20:07:38,727 [DEBUG][_create_connection]: Created new connection using: 5e0d130f3b644555ad7ea6b8df5f1fc2 (async_milvus_client.py:600)
</code></pre>
<p>Mari kita definisikan fungsi penghasil node, yang akan digunakan untuk menghasilkan sejumlah besar node uji untuk indeks.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">random_id</span>():
    random_num_str = <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">16</span>):
        random_digit = <span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">9</span>))
        random_num_str += random_digit
    <span class="hljs-keyword">return</span> random_num_str


<span class="hljs-keyword">def</span> <span class="hljs-title function_">produce_nodes</span>(<span class="hljs-params">num_adding</span>):
    node_list = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_adding):
        node = TextNode(
            id_=random_id(),
            text=<span class="hljs-string">f&quot;n<span class="hljs-subst">{i}</span>_text&quot;</span>,
            embedding=[<span class="hljs-number">0.5</span>] * (DIM - <span class="hljs-number">1</span>) + [random.random()],
            relationships={NodeRelationship.SOURCE: RelatedNodeInfo(node_id=<span class="hljs-string">f&quot;n<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>&quot;</span>)},
        )
        node_list.append(node)
    <span class="hljs-keyword">return</span> node_list
<button class="copy-code-btn"></button></code></pre>
<p>Tentukan fungsi aync untuk menambahkan dokumen ke penyimpanan vektor. Kami menggunakan fungsi <code translate="no">async_add()</code> di dalam instance penyimpanan vektor Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_add</span>(<span class="hljs-params">num_adding</span>):
    node_list = produce_nodes(num_adding)
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_adding):
        sub_nodes = node_list[i]
        task = vector_store.async_add([sub_nodes])  <span class="hljs-comment"># use async_add()</span>
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">add_counts = [10, 100, 1000]
<button class="copy-code-btn"></button></code></pre>
<p>Dapatkan perulangan peristiwa.</p>
<pre><code translate="no" class="language-python">loop = asyncio.get_event_loop()
<button class="copy-code-btn"></button></code></pre>
<p>Menambahkan dokumen secara asinkron ke penyimpanan vektor.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> add_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_add</span>():
        async_time = <span class="hljs-keyword">await</span> async_add(count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async add for <span class="hljs-subst">{count}</span> took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_add())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Async add for 10 took 0.19 seconds
Async add for 100 took 0.48 seconds
Async add for 1000 took 3.22 seconds
</code></pre>
<pre><code translate="no" class="language-python">vector_store = init_vector_store()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-01-24 20:07:45,554 [DEBUG][_create_connection]: Created new connection using: b14dde8d6d24489bba26a907593f692d (async_milvus_client.py:600)
</code></pre>
<h4 id="Compare-with-synchronous-add" class="common-anchor-header">Bandingkan dengan penambahan sinkron</h4><p>Tentukan fungsi penambahan sinkron. Kemudian ukur waktu yang berjalan dalam kondisi yang sama.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_add</span>(<span class="hljs-params">num_adding</span>):
    node_list = produce_nodes(num_adding)
    start_time = time.time()
    <span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> node_list:
        result = vector_store.add([node])
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> add_counts:
    sync_time = sync_add(count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync add for <span class="hljs-subst">{count}</span> took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Sync add for 10 took 0.56 seconds
Sync add for 100 took 5.85 seconds
Sync add for 1000 took 62.91 seconds
</code></pre>
<p>Hasilnya menunjukkan bahwa proses penambahan sinkron jauh lebih lambat daripada proses asinkron.</p>
<h3 id="Async-search" class="common-anchor-header">Pencarian asinkron</h3><p>Inisialisasi ulang penyimpanan vektor dan tambahkan beberapa dokumen sebelum menjalankan pencarian.</p>
<pre><code translate="no" class="language-python">vector_store = init_vector_store()
node_list = produce_nodes(num_adding=<span class="hljs-number">1000</span>)
inserted_ids = vector_store.<span class="hljs-keyword">add</span>(node_list)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-01-24 20:08:57,982 [DEBUG][_create_connection]: Created new connection using: 351dc7ea4fb14d4386cfab02621ab7d1 (async_milvus_client.py:600)
</code></pre>
<p>Tentukan fungsi pencarian asinkron. Kami menggunakan fungsi <code translate="no">aquery()</code> dalam contoh penyimpanan vektor Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_search</span>(<span class="hljs-params">num_queries</span>):
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_queries):
        query = VectorStoreQuery(
            query_embedding=[<span class="hljs-number">0.5</span>] * (DIM - <span class="hljs-number">1</span>) + [<span class="hljs-number">0.6</span>], similarity_top_k=<span class="hljs-number">3</span>
        )
        task = vector_store.aquery(query=query)  <span class="hljs-comment"># use aquery()</span>
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">query_counts = [10, 100, 1000]
<button class="copy-code-btn"></button></code></pre>
<p>Pencarian asinkron dari penyimpanan Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> query_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_search</span>():
        async_time = <span class="hljs-keyword">await</span> async_search(count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async search for <span class="hljs-subst">{count}</span> queries took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_search())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Async search for 10 queries took 0.55 seconds
Async search for 100 queries took 1.39 seconds
Async search for 1000 queries took 8.81 seconds
</code></pre>
<h4 id="Compare-with-synchronous-search" class="common-anchor-header">Bandingkan dengan pencarian sinkron</h4><p>Tentukan fungsi pencarian sinkron. Kemudian ukur waktu yang berjalan dalam kondisi yang sama.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_search</span>(<span class="hljs-params">num_queries</span>):
    start_time = time.time()
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_queries):
        query = VectorStoreQuery(
            query_embedding=[<span class="hljs-number">0.5</span>] * (DIM - <span class="hljs-number">1</span>) + [<span class="hljs-number">0.6</span>], similarity_top_k=<span class="hljs-number">3</span>
        )
        result = vector_store.query(query=query)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> query_counts:
    sync_time = sync_search(count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync search for <span class="hljs-subst">{count}</span> queries took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Sync search for 10 queries took 3.29 seconds
Sync search for 100 queries took 30.80 seconds
Sync search for 1000 queries took 308.80 seconds
</code></pre>
<p>Hasilnya menunjukkan bahwa proses pencarian sinkron jauh lebih lambat dibandingkan dengan pencarian asinkron.</p>
