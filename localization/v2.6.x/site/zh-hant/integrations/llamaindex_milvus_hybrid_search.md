---
id: llamaindex_milvus_hybrid_search.md
title: 使用 Milvus 和 LlamaIndex 混合搜尋的 RAG
related_key: LlamaIndex
summary: >-
  本筆記展示如何在 [LlamaIndex](https://www.llamaindex.ai/) RAG pipelines 中使用 Milvus
  進行混合搜尋。我們將從推薦的預設混合搜尋 (語意 + BM25) 開始，然後探討其他替代的稀疏嵌入方法和自訂混合 reranker。
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="common-anchor-header">使用 Milvus 和 LlamaIndex 混合搜尋的 RAG<button data-href="#RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p>混合搜尋利用語意檢索和關鍵字比對兩者的優勢，提供更精確且與上下文相關的結果。透過結合語義檢索和關鍵字匹配的優點，混合搜尋在複雜的資訊檢索任務中尤其有效。</p>
<p>本筆記展示如何在<a href="https://www.llamaindex.ai/">LlamaIndex</a>RAG 管道中使用 Milvus 進行混合搜尋。我們將從推薦的預設混合搜尋 (語意 + BM25) 開始，然後探討其他可替代的稀疏嵌入方法和自訂混合 reranker。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>安裝相依性</strong></p>
<p>在開始之前，請確定您已安裝下列依賴項目：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您使用的是 Google Colab，您可能需要<strong>重新啟動運行時</strong>（導航到介面上方的「運行<strong>時</strong>」功能表，並從下拉式功能表中選擇「重新啟動會話」）。</p>
</div>
<p><strong>設定帳號</strong></p>
<p>本教程使用 OpenAI 進行文字嵌入和答案產生。您需要準備<a href="https://platform.openai.com/api-keys">OpenAI API 密鑰</a>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>若要使用 Milvus 向量存儲，請指定您的 Milvus 伺服器<code translate="no">URI</code> (可選擇使用<code translate="no">TOKEN</code>)。若要啟動 Milvus 伺服器，您可以依照<a href="https://milvus.io/docs/install-overview.md">Milvus 安裝指南</a>設定 Milvus 伺服器，或直接免費試用<a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a>。</p>
<blockquote>
<p>Milvus Standalone、Milvus Distributed 和 Zilliz Cloud 目前支援全文搜尋，但 Milvus Lite 尚未支援（計畫在未來實施）。如需更多資訊，請聯絡 support@zilliz.com。</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>載入範例資料</strong></p>
<p>執行下列指令下載範例文件到「data/paul_graham」目錄：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>然後使用<code translate="no">SimpleDirectoryReaderLoad</code> 載入 Paul Graham 的文章「What I Worked On」：</p>
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
<h2 id="Hybrid-Search-with-BM25" class="common-anchor-header">使用 BM25 進行混合搜尋<button data-href="#Hybrid-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h2><p>本節說明如何使用 BM25 執行混合搜尋。要開始使用，我們先初始化<code translate="no">MilvusVectorStore</code> 並為範例文件建立索引。預設配置使用</p>
<ul>
<li>預設嵌入模型的密集嵌入 (OpenAI's<code translate="no">text-embedding-ada-002</code>)</li>
<li>如果 enable_sparse 為 True，則使用 BM25 進行全文搜尋</li>
<li>如果啟用混合搜尋，則使用 k=60 的 RRFRanker 來合併結果</li>
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
<p>以下是<code translate="no">MilvusVectorStore</code> 中配置密集字段和稀疏字段的參數的更多資訊：</p>
<p><strong>密集欄位</strong></p>
<ul>
<li><code translate="no">enable_dense (bool)</code>:用來啟用或停用密集嵌入的布林標誌。預設為 True。</li>
<li><code translate="no">dim (int, optional)</code>:集合的嵌入向量尺寸。</li>
<li><code translate="no">embedding_field (str, optional)</code>:集合的密集嵌入欄位名稱，預設為 DEFAULT_EMBEDDING_KEY。</li>
<li><code translate="no">index_config (dict, optional)</code>:用來建立密集內嵌索引的設定。預設為 None。</li>
<li><code translate="no">search_config (dict, optional)</code>:用來搜尋 Milvus 密集索引的設定。請注意，這必須與<code translate="no">index_config</code> 指定的索引類型相容。預設為 None。</li>
<li><code translate="no">similarity_metric (str, optional)</code>:用於密集嵌入的相似度指標，目前支援 IP、COSINE 和 L2。</li>
</ul>
<p><strong>稀疏欄位</strong></p>
<ul>
<li><code translate="no">enable_sparse (bool)</code>:用來啟用或停用 sparse embedding 的布林標記。預設為 False。</li>
<li><code translate="no">sparse_embedding_field (str)</code>:sparse embedding 欄位的名稱，預設為 DEFAULT_SPARSE_EMBEDDING_KEY。</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>:如果 enable_sparse 為 True，則應該提供此物件來轉換文字為稀疏內嵌。若為 None，則使用預設的稀疏嵌入函數 (BM25BuiltInFunction)，或使用 BGEM3SparseEmbedding 給定的現有集合，而不使用內建函數。</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>:用來建立稀疏嵌入索引的設定。預設為 None。</li>
</ul>
<p>若要在查詢階段啟用混合搜尋，請將<code translate="no">vector_store_query_mode</code> 設為「hybrid」。這將會結合語意搜尋和全文搜尋的搜尋結果，並重新排序。讓我們使用範例查詢進行測試：「作者在 Viaweb 學到了什麼？」：</p>
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
<h3 id="Customize-text-analyzer" class="common-anchor-header">自訂文字分析器</h3><p>分析器在全文檢索中扮演重要的角色，可將句子分割成標記，並執行詞彙處理，例如刪除字莖和停止詞。它們通常針對特定語言。如需詳細資訊，請參閱<a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Milvus 分析器指南</a>。</p>
<p>Milvus 支援兩種類型的分析器：<strong>內建分析器</strong>和<strong>自訂分析器</strong>。預設情況下，如果<code translate="no">enable_sparse</code> 設為 True，<code translate="no">MilvusVectorStore</code> 會利用<code translate="no">BM25BuiltInFunction</code> 的預設設定，採用標準的內建分析器，根據標點符號來標記文字。</p>
<p>若要使用不同的分析器或自訂現有的分析器，您可以在建立<code translate="no">BM25BuiltInFunction</code> 時提供<code translate="no">analyzer_params</code> 參數值。然後，在<code translate="no">MilvusVectorStore</code> 中將此函式設定為<code translate="no">sparse_embedding_function</code> 。</p>
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
<h2 id="Hybrid-Search-with-Other-Sparse-Embedding" class="common-anchor-header">與其他稀疏嵌入的混合搜尋<button data-href="#Hybrid-Search-with-Other-Sparse-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>除了結合語意搜尋與 BM25 之外，Milvus 也支援使用稀疏嵌入函數（例如<a href="https://arxiv.org/abs/2402.03216">BGE-M3</a>）的混合搜尋。以下範例使用內建的<code translate="no">BGEM3SparseEmbeddingFunction</code> 來產生稀疏嵌入。</p>
<p>首先，我們需要安裝<code translate="no">FlagEmbedding</code> 套件：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -q FlagEmbedding</span>
<button class="copy-code-btn"></button></code></pre>
<p>然後，讓我們使用預設的 OpenAI 模型來建立向量儲存和索引，以進行 densen embedding，並使用內建的 BGE-M3 來進行 sparse embedding：</p>
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
<p>現在讓我們使用範例問題執行混合搜尋查詢：</p>
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
<h3 id="Customize-Sparse-Embedding-Function" class="common-anchor-header">自訂稀疏嵌入功能</h3><p>您也可以自訂 sparse embedding 函數，只要它繼承自<code translate="no">BaseSparseEmbeddingFunction</code> ，包括下列方法：</p>
<ul>
<li><code translate="no">encode_queries</code>:此方法可將文字轉換成稀疏嵌入的查詢清單。</li>
<li><code translate="no">encode_documents</code>:此方法將文字轉換為文件的稀疏內嵌清單。</li>
</ul>
<p>每個方法的輸出都應該遵循稀疏內嵌的格式，也就是字典清單。每個詞典都應該有一個 key（整數），代表維度，以及相對應的值（浮點數），代表嵌入在該維度的大小（例如，{1: 0.5, 2: 0.3}）。</p>
<p>例如，以下是使用 BGE-M3 實作的自訂稀疏嵌入函數：</p>
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
<h2 id="Customize-hybrid-reranker" class="common-anchor-header">自訂混合 Reranker<button data-href="#Customize-hybrid-reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支援兩種<a href="https://milvus.io/docs/weighted-ranker.md">reranking 策略</a>：Reciprocal Rank Fusion (RRF) 和 Weighted Scoring。<code translate="no">MilvusVectorStore</code> 混合搜尋的預設排名器是 k=60 的 RRF。要自訂混合排名器，請修改下列參數：</p>
<ul>
<li><code translate="no">hybrid_ranker (str)</code>:指定混合搜尋查詢使用的排名器類型。目前只支援 ["RRFRanker", "WeightedRanker"]。預設為 "RRFRanker"。</li>
<li><code translate="no">hybrid_ranker_params (dict, optional)</code>:混合排名器的設定參數。此字典的結構取決於所使用的特定排名器：<ul>
<li>對於 "RRFRanker"，它應該包括<ul>
<li>"k" (int)：Reciprocal Rank Fusion (RRF) 中使用的參數。此值用於計算排名分數，作為 RRF 演算法的一部分，RRF 演算法會將多種排名策略合併為單一分數，以提高搜尋相關性。如果未指定，預設值為 60。</li>
</ul></li>
<li>對於 "WeightedRanker"，它期望：<ul>
<li>「權重」（浮點數清單）：一個正好包含兩個權重的清單：<ol>
<li>密集嵌入元件的權重。</li>
<li>這些權重是用來平衡混合擷取過程中密集與稀疏嵌入元件的重要性。如果沒有指定，預設權重為 [1.0，1.0]。</li>
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
