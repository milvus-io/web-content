---
id: llamaindex_milvus_full_text_search.md
title: 使用 LlamaIndex 和 Milvus 進行全文搜尋
related_key: LlamaIndex
summary: >-
  在本教學中，您將學習如何運用 LlamaIndex 和 Milvus，透過全文檢索與混合檢索來建置一個 RAG
  系統。我們將先實作單純的全文檢索，接著透過整合語義檢索來強化其功能，以獲得更全面的檢索結果。
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="common-anchor-header">使用 LlamaIndex 和 Milvus 進行全文搜尋<button data-href="#Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>全文搜尋</strong>採用關鍵字精確匹配，通常運用 BM25 等演算法，根據相關性對文件進行排序。在<strong>檢索增強生成（RAG）</strong>系統中，此方法可檢索相關文本，以強化 AI 生成的回應。</p>
<p>另一方面，<strong>語義搜尋</strong>則透過解析語境意義來提供更廣泛的結果。結合這兩種方法可形成<strong>混合搜尋</strong>，從而提升資訊檢索效能——特別是在單一方法難以滿足需求的情況下。</p>
<p>透過<a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5 的</a>稀疏 BM25 方法，原始文字會自動轉換為稀疏向量。這不僅省去了手動生成稀疏嵌入的步驟，更能實現一種兼顧語義理解與關鍵字相關性的混合搜尋策略。</p>
<p>在本教學中，您將學習如何運用 LlamaIndex 和 Milvus，透過全文搜尋與混合搜尋來建置 RAG 系統。我們將先實作單純的全文搜尋，接著透過整合語義搜尋來強化其功能，以獲得更全面的搜尋結果。</p>
<blockquote>
<p>在繼續本教學之前，請確保您已熟悉<a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">全文檢索</a>，並了解<a href="https://milvus.io/docs/integrate_with_llamaindex.md">在 LlamaIndex 中使用 Milvus 的基礎知識</a>。</p>
</blockquote>
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
    </button></h2><p><strong>安裝依賴項</strong></p>
<p>開始之前，請確保已安裝以下依賴項：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>若您使用 Google Colab，可能需要<strong>重新啟動執行環境</strong>（請前往介面頂端的「<strong>Runtime</strong>」選單，並從下拉式選單中選擇「Restart session」）。</p>
</blockquote>
</div>
<p><strong>設定帳戶</strong></p>
<p>本教學使用 OpenAI 進行文字嵌入與答案生成。您需要準備<a href="https://platform.openai.com/api-keys">OpenAI API 金鑰</a>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>若要使用 Milvus 向量儲存庫，請指定您的 Milvus 伺服器<code translate="no">URI</code> （並可選擇性地加上<code translate="no">TOKEN</code> ）。要啟動 Milvus 伺服器，您可以依照<a href="https://milvus.io/docs/install-overview.md">Milvus 安裝指南進行設定</a>，或直接免費試用<a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a>。</p>
<blockquote>
<p>目前 Milvus Standalone、Milvus Distributed 及 Zilliz Cloud 均支援全文檢索，但 Milvus Lite 尚不支援（預計未來將實作此功能）。如需更多資訊，請聯絡 support@zilliz.com。</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>下載範例資料</strong></p>
<p>執行以下指令，將範例文件下載至「data/paul_graham」目錄：</p>
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
<h2 id="RAG-with-Full-Text-Search" class="common-anchor-header">具備全文搜尋功能的 RAG<button data-href="#RAG-with-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>將全文搜尋整合至 RAG 系統中，可平衡語義搜尋與精確且可預測的關鍵字檢索。您亦可選擇僅使用全文搜尋，但為獲得更佳的搜尋結果，建議將全文搜尋與語義搜尋結合使用。在此示範中，我們將分別展示純全文搜尋與混合搜尋。</p>
<p>開始之前，請使用<code translate="no">SimpleDirectoryReaderLoad</code> 載入 Paul Graham 的文章〈What I Worked On〉：</p>
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
<h3 id="Full-Text-Search-with-BM25" class="common-anchor-header">使用 BM25 進行全文搜尋<button data-href="#Full-Text-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h3><p>LlamaIndex 的<code translate="no">MilvusVectorStore</code> 支援全文搜尋，可實現高效的關鍵字檢索。透過使用內建函式（如<code translate="no">sparse_embedding_function</code> ），系統會套用 BM25 評分機制來對搜尋結果進行排序。</p>
<p>在本節中，我們將示範如何使用 BM25 來實作具備全文搜尋功能的 RAG 系統。</p>
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
<p>上述程式碼會將範例文件插入 Milvus，並建立索引以啟用 BM25 排序功能，用於全文搜尋。此程式碼會停用密集嵌入，並採用預設參數的<code translate="no">BM25BuiltInFunction</code> 。</p>
<p>您可以在 `<code translate="no">BM25BuiltInFunction</code> ` 參數中指定輸入與輸出欄位：</p>
<ul>
<li><code translate="no">input_field_names (str)</code>: 輸入文字欄位（預設值：「text」）。此參數指定 BM25 演算法應套用的文字欄位。若您使用的是文字欄位名稱不同的自訂集合，請變更此參數。</li>
<li><code translate="no">output_field_names (str)</code>: 用於儲存此 BM25 函式輸出結果的欄位（預設值：「sparse_embedding」）。</li>
</ul>
<p>設定好向量儲存後，您即可使用 Milvus 並以「sparse」或「text_search」查詢模式執行全文檢索查詢：</p>
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
<h4 id="Customize-text-analyzer" class="common-anchor-header">自訂文字分析器</h4><p>分析器在全文檢索中扮演關鍵角色，其功能包括將句子拆分為詞元，並執行詞彙處理（例如詞幹提取與停用詞過濾）。這些分析器通常具有語言專屬性。如需更多詳細資訊，請參閱《<a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Milvus 分析器指南》</a>。</p>
<p>Milvus 支援兩種類型的分析器：<strong>內建分析器</strong>與<strong>自訂分析器</strong>。預設情況下，<code translate="no">BM25BuiltInFunction</code> 會使用標準的內建分析器，該分析器會根據標點符號將文字分割為詞元。</p>
<p>若要使用其他分析器或自訂現有分析器，可將值傳遞給 `<code translate="no">analyzer_params</code> ` 參數：</p>
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
<h3 id="Hybrid-Search-with-Reranker" class="common-anchor-header">結合重新排序器的混合搜尋<button data-href="#Hybrid-Search-with-Reranker" class="anchor-icon" translate="no">
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
    </button></h3><p>混合搜尋系統結合了語義搜尋與全文搜尋，可優化 RAG 系統中的檢索效能。</p>
<p>以下範例使用 OpenAI 嵌入模型進行語義搜尋，並採用 BM25 演算法進行全文搜尋：</p>
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
<p><strong>運作原理</strong></p>
<p>此方法將文件儲存於 Milvus 集合中，並包含以下兩種向量場：</p>
<ul>
<li><code translate="no">embedding</code>：由 OpenAI 嵌入模型生成的密集嵌入，用於語義搜尋。</li>
<li><code translate="no">sparse_embedding</code>：使用 BM25BuiltInFunction 計算的稀疏嵌入，用於全文檢索。</li>
</ul>
<p>此外，我們已採用「RRFRanker」並使用其預設參數來實施重新排序策略。若要自訂重新排序器，您可以依照《<a href="https://milvus.io/docs/weighted-ranker.md">Milvus 重新排序指南</a>》來設定<code translate="no">hybrid_ranker</code> 和<code translate="no">hybrid_ranker_params</code> 。</p>
<p>現在，讓我們透過一個範例查詢來測試 RAG 系統：</p>
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
<p>這種混合方法透過同時運用語義檢索與關鍵字檢索，確保 RAG 系統能提供更精準且具語境意識的回應。</p>
