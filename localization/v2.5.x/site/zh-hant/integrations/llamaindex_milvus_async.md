---
id: llamaindex_milvus_async.md
title: 使用 LlamaIndex 和 Milvus Async API 建立 RAG
related_key: LlamaIndex
summary: >-
  本教學示範如何使用 LlamaIndex 與 Milvus 為 RAG 建立異步文件處理管道。LlamaIndex 提供了一種像 Milvus
  一樣處理文件並儲存到向量資料庫的方法。透過利用 LlamaIndex 的 async API 和 Milvus Python
  客戶端函式庫，我們可以提高管道的吞吐量，以有效率地處理大量資料並建立索引。
---
<h1 id="RAG-with-Milvus-and-LlamaIndex-Async-API" class="common-anchor-header">使用 Milvus 和 LlamaIndex Async API 的 RAG<button data-href="#RAG-with-Milvus-and-LlamaIndex-Async-API" class="anchor-icon" translate="no">
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
<p>本教學示範如何使用<a href="https://www.llamaindex.ai/">LlamaIndex</a>與<a href="https://milvus.io/">Milvus</a>為 RAG 建立異步文件處理管道。LlamaIndex 提供了一種處理文件並儲存於向量資料庫的方式，就像 Milvus 一樣。透過利用 LlamaIndex 的 async API 和 Milvus Python 客戶端函式庫，我們可以提高管道的吞吐量，以有效率地處理大量資料並編製索引。</p>
<p>在本教程中，我們將先從高層次介紹如何使用異步方法來利用 LlamaIndex 和 Milvus 建立 RAG，然後再介紹低層次方法的使用，以及同步和異步的效能比較。</p>
<h2 id="Before-you-begin" class="common-anchor-header">在您開始之前<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>本頁的程式碼片段需要 pymilvus 和 llamaindex 的相依性。您可以使用下列指令安裝它們：</p>
<pre><code translate="no" class="language-bash">$ pip install -U pymilvus llama-index-vector-stores-milvus llama-index nest-asyncio
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您使用的是 Google Colab，為了啟用剛安裝的相依性，您可能需要<strong>重新啟動執行時</strong>（點選畫面頂端的「Runtime」功能表，並從下拉式功能表中選擇「Restart session」）。</p>
</div>
<p>我們將使用 OpenAI 的模型。您應該準備<a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> 作為環境變數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>如果您使用的是 Jupyter Notebook，您需要在執行異步程式碼之前先執行這一行程式碼。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> nest_asyncio

nest_asyncio.<span class="hljs-title function_">apply</span>()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-data" class="common-anchor-header">準備資料</h3><p>您可以使用下列指令下載範例資料：</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/&#x27;</span>
$ wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham_essay.txt&#x27;</span>
$ wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/uber_2021.pdf&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG-with-Asynchronous-Processing" class="common-anchor-header">使用異步處理建立 RAG<button data-href="#Build-RAG-with-Asynchronous-Processing" class="anchor-icon" translate="no">
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
    </button></h2><p>本節將介紹如何建立一個可以以異步方式處理文件的 RAG 系統。</p>
<p>導入必要的函式庫，並定義 Milvus URI 和嵌入的尺寸。</p>
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
<li>如果您有大規模的資料，您可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上架設效能優異的 Milvus 伺服器。在此設定中，請使用伺服器的 URI，例如<code translate="no">http://localhost:19530</code> ，作為您的<code translate="no">uri</code> 。</li>
<li>如果您想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的完全管理<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">雲端</a>服務），請調整<code translate="no">uri</code> 和<code translate="no">token</code> ，與 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint 和 Api key</a>對應。</li>
<li>在複雜的系統中 (例如網路通訊)，相較於同步處理，非同步處理可以帶來效能上的提升。因此我們認為 Milvus-Lite 不適合使用異步介面，因為使用的情境並不適合。</li>
</ul>
</div>
<p>定義一個初始化函式，我們可以再次使用它來重建 Milvus 套件。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">init_vector_store</span>():
    <span class="hljs-keyword">return</span> MilvusVectorStore(
        uri=URI,
        <span class="hljs-comment"># token=TOKEN,</span>
        dim=DIM,
        collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
        embedding_field=<span class="hljs-string">&quot;embedding&quot;</span>,
        id_field=<span class="hljs-string">&quot;id&quot;</span>,
        similarity_metric=<span class="hljs-string">&quot;COSINE&quot;</span>,
        consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
        overwrite=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># To overwrite the collection if it already exists</span>
    )


vector_store = init_vector_store()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-01-24 20:04:39,414 [DEBUG][_create_connection]: Created new connection using: faa8be8753f74288bffc7e6d38942f8a (async_milvus_client.py:600)
</code></pre>
<p>使用 SimpleDirectoryReader 從檔案<code translate="no">paul_graham_essay.txt</code> 包裝一個 LlamaIndex 文件物件。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

<span class="hljs-comment"># load documents</span>
documents = SimpleDirectoryReader(
    input_files=[<span class="hljs-string">&quot;./data/paul_graham_essay.txt&quot;</span>]
).load_data()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Document ID:&quot;</span>, documents[<span class="hljs-number">0</span>].doc_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document ID: 41a6f99c-489f-49ff-9821-14e2561140eb
</code></pre>
<p>在本機實作一個 Hugging Face 嵌入模型。使用本機模型可避免在非同步資料插入時達到 API 速率限制的風險，因為並發的 API 請求很快就會累積起來，耗盡您在公共 API 的預算。但是，如果您有很高的速率限制，您可以選擇使用遠端模型服務來代替。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.<span class="hljs-property">embeddings</span>.<span class="hljs-property">huggingface</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">HuggingFaceEmbedding</span>


embed_model = <span class="hljs-title class_">HuggingFaceEmbedding</span>(model_name=<span class="hljs-string">&quot;BAAI/bge-base-en-v1.5&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>建立索引並插入文件。</p>
<p>我們將<code translate="no">use_async</code> 設為<code translate="no">True</code> ，以啟用同步插入模式。</p>
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
<p>初始化 LLM。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.<span class="hljs-property">llms</span>.<span class="hljs-property">openai</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">OpenAI</span>

llm = <span class="hljs-title class_">OpenAI</span>(model=<span class="hljs-string">&quot;gpt-3.5-turbo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>建立查詢引擎時，您也可以將<code translate="no">use_async</code> 參數設定為<code translate="no">True</code> ，以啟用異步搜尋。</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine(use_async=<span class="hljs-literal">True</span>, llm=llm)
response = <span class="hljs-keyword">await</span> query_engine.aquery(<span class="hljs-string">&quot;What did the author learn?&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned that the field of artificial intelligence, as practiced at the time, was not as promising as initially believed. The approach of using explicit data structures to represent concepts in AI was not effective in achieving true understanding of natural language. This realization led the author to shift his focus towards Lisp and eventually towards exploring the field of art.
</code></pre>
<h2 id="Explore-the-Async-API" class="common-anchor-header">探索異步 API<button data-href="#Explore-the-Async-API" class="anchor-icon" translate="no">
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
    </button></h2><p>在本節中，我們將介紹較低階的 API 使用方式，並比較同步與非同步執行的效能。</p>
<h3 id="Async-add" class="common-anchor-header">異步新增</h3><p>重新初始化向量儲存。</p>
<pre><code translate="no" class="language-python">vector_store = init_vector_store()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-01-24 20:07:38,727 [DEBUG][_create_connection]: Created new connection using: 5e0d130f3b644555ad7ea6b8df5f1fc2 (async_milvus_client.py:600)
</code></pre>
<p>讓我們定義一個產生節點的函式，用來產生大量的索引測試節點。</p>
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
<p>定義一個 aync 函式來新增文件到向量儲存空間。我們在 Milvus 向量存儲實例中使用<code translate="no">async_add()</code> 函式。</p>
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
<p>取得事件迴圈。</p>
<pre><code translate="no" class="language-python">loop = asyncio.get_event_loop()
<button class="copy-code-btn"></button></code></pre>
<p>異步新增文件到向量儲存。</p>
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
<h4 id="Compare-with-synchronous-add" class="common-anchor-header">與同步新增比較</h4><p>定義同步新增函式。然後測量相同條件下的執行時間。</p>
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
<p>結果顯示同步新增的過程比異步的慢很多。</p>
<h3 id="Async-search" class="common-anchor-header">同步搜尋</h3><p>在執行搜尋之前，重新初始化向量儲存並新增一些文件。</p>
<pre><code translate="no" class="language-python">vector_store = init_vector_store()
node_list = produce_nodes(num_adding=<span class="hljs-number">1000</span>)
inserted_ids = vector_store.<span class="hljs-keyword">add</span>(node_list)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-01-24 20:08:57,982 [DEBUG][_create_connection]: Created new connection using: 351dc7ea4fb14d4386cfab02621ab7d1 (async_milvus_client.py:600)
</code></pre>
<p>定義異步搜尋函式。我們使用 Milvus 向量儲存實例中的<code translate="no">aquery()</code> 函式。</p>
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
<p>從 Milvus 商店進行非同步搜尋。</p>
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
<h4 id="Compare-with-synchronous-search" class="common-anchor-header">與同步搜尋比較</h4><p>定義同步搜尋函式。然後測量相同條件下的執行時間。</p>
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
<p>結果顯示同步搜尋的過程比異步搜尋慢很多。</p>
