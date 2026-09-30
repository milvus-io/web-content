---
id: llamaindex_milvus_full_text_search.md
title: 使用 LlamaIndex 和 Milvus 进行全文搜索
related_key: LlamaIndex
summary: >-
  在本教程中，您将学习如何使用 LlamaIndex 和 Milvus，通过全文搜索和混合搜索构建一个 RAG
  系统。我们将首先实现纯全文搜索，然后通过集成语义搜索来增强其功能，从而获得更全面的搜索结果。
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="common-anchor-header">使用 LlamaIndex 和 Milvus 进行全文搜索<button data-href="#Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>全文搜索</strong>采用精确关键词匹配，通常利用 BM25 等算法根据相关性对文档进行排序。<strong>在检索增强生成（RAG）</strong>系统中，该方法通过检索相关文本来增强 AI 生成的响应。</p>
<p>与此同时，<strong>语义搜索</strong>通过解读上下文含义来提供更广泛的搜索结果。将这两种方法结合起来，可以形成一种<strong>混合搜索</strong>，从而提升信息检索效果——特别是在单一方法难以满足需求的情况下。</p>
<p>借助<a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5 的</a>稀疏 BM25 方法，原始文本会自动转换为稀疏向量。这消除了手动生成稀疏嵌入的需求，并支持一种在语义理解与关键词相关性之间取得平衡的混合搜索策略。</p>
<p>在本教程中，您将学习如何使用 LlamaIndex 和 Milvus，基于全文搜索和混合搜索构建 RAG 系统。我们将首先实现纯全文搜索，然后通过集成语义搜索来增强其功能，从而获得更全面的搜索结果。</p>
<blockquote>
<p>在继续本教程之前，请确保您熟悉<a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">全文搜索</a>以及<a href="https://milvus.io/docs/integrate_with_llamaindex.md">在 LlamaIndex 中使用 Milvus 的基础知识</a>。</p>
</blockquote>
<h2 id="Prerequisites" class="common-anchor-header">先决条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>安装依赖项</strong></p>
<p>开始之前，请确保已安装以下依赖项：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>如果您使用的是 Google Colab，可能需要<strong>重启运行时</strong>（导航至界面顶部的“Runtime”菜单，并从下拉菜单中选择“Restart session”）。</p>
</blockquote>
</div>
<p><strong>设置账户</strong></p>
<p>本教程使用 OpenAI 进行文本 Embeddings 和答案生成。您需要准备<a href="https://platform.openai.com/api-keys">OpenAI API 密钥</a>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>若要使用 Milvus 向量存储，请指定您的 Milvus 服务器<code translate="no">URI</code> （可选：<code translate="no">TOKEN</code> ）。要启动 Milvus 服务器，您可以按照<a href="https://milvus.io/docs/install-overview.md">Milvus 安装指南</a>进行配置，或者直接免费试用<a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a>。</p>
<blockquote>
<p>目前，Milvus Standalone、Milvus Distributed 和 Zilliz Cloud 均支持全文搜索，但 Milvus Lite 暂不支持（计划在未来实现）。如需了解更多信息，请联系 support@zilliz.com。</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>下载示例数据</strong></p>
<p>运行以下命令，将示例文档下载到“data/paul_graham”目录中：</p>
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
<h2 id="RAG-with-Full-Text-Search" class="common-anchor-header">支持全文搜索的 RAG<button data-href="#RAG-with-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>将全文搜索集成到 RAG 系统中，可在语义搜索与精确且可预测的基于关键词的检索之间取得平衡。您也可以选择仅使用全文搜索，但为了获得更好的搜索结果，建议将全文搜索与语义搜索结合使用。在此演示中，我们将展示纯全文搜索和混合搜索两种模式。</p>
<p>开始时，请使用<code translate="no">SimpleDirectoryReaderLoad</code> 加载保罗·格雷厄姆（Paul Graham）的散文《我做过什么》（What I Worked On）：</p>
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
<h3 id="Full-Text-Search-with-BM25" class="common-anchor-header">基于 BM25 的全文搜索<button data-href="#Full-Text-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h3><p>LlamaIndex 的<code translate="no">MilvusVectorStore</code> 支持全文搜索，可实现高效的基于关键词的检索。通过使用内置函数（如<code translate="no">sparse_embedding_function</code> ），它会应用 BM25 评分算法对搜索结果进行排序。</p>
<p>在本节中，我们将演示如何使用 BM25 实现全文搜索的 RAG 系统。</p>
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
<p>上述代码将示例文档插入 Milvus，并构建索引以启用 BM25 排序功能，从而实现全文搜索。该代码禁用了密集嵌入，并使用默认参数调用 `<code translate="no">BM25BuiltInFunction</code> `。</p>
<p>您可以在<code translate="no">BM25BuiltInFunction</code> 参数中指定输入和输出字段：</p>
<ul>
<li><code translate="no">input_field_names (str)</code>: 输入文本字段（默认：“text”）。该字段指定BM25算法所应用的文本字段。若使用自有Collection且文本字段名称不同，请修改此参数。</li>
<li><code translate="no">output_field_names (str)</code>: 用于存储此 BM25 函数输出结果的字段（默认：“sparse_embedding”）。</li>
</ul>
<p>配置好向量存储后，您即可使用 Milvus 并设置查询模式为“sparse”或“text_search”来执行全文搜索查询：</p>
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
<h4 id="Customize-text-analyzer" class="common-anchor-header">自定义文本分析器</h4><p>分析器在全文搜索中起着至关重要的作用，它将句子拆分为词素，并执行词汇处理（如词干提取和停用词过滤）。分析器通常具有语言特异性。更多详细信息，请参阅《<a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Milvus 分析器指南》</a>。</p>
<p>Milvus 支持两种类型的分析器：<strong>内置分析器和</strong> <strong>自定义分析器</strong>。默认情况下，<code translate="no">BM25BuiltInFunction</code> 使用标准的内置分析器，该分析器基于标点符号对文本进行分词。</p>
<p>若要使用其他分析器或自定义现有分析器，可向<code translate="no">analyzer_params</code> 参数传递相应值：</p>
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
<h3 id="Hybrid-Search-with-Reranker" class="common-anchor-header">结合Rerankers的混合搜索<button data-href="#Hybrid-Search-with-Reranker" class="anchor-icon" translate="no">
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
    </button></h3><p>混合搜索系统结合了语义搜索和全文搜索，可优化 RAG 系统的检索性能。</p>
<p>以下示例使用 OpenAI Embeddings 模型进行语义搜索，并使用 BM25 进行全文搜索：</p>
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
<p><strong>工作原理</strong></p>
<p>该方法将文档存储在包含两个向量字段的 Milvus Collection 中：</p>
<ul>
<li><code translate="no">embedding</code>：由 OpenAI 嵌入模型生成的用于语义搜索的密集 Embeddings。</li>
<li><code translate="no">sparse_embedding</code>: 通过 BM25BuiltInFunction 计算得到的、用于全文搜索的稀疏 Embeddings。</li>
</ul>
<p>此外，我们还应用了基于“RRFRanker”且采用默认参数的重新排序策略。若需自定义重新排序器，您可以按照《<a href="https://milvus.io/docs/weighted-ranker.md">Milvus 重新排序指南</a>》配置<code translate="no">hybrid_ranker</code> 和<code translate="no">hybrid_ranker_params</code> 。</p>
<p>现在，让我们通过一个示例查询来测试 RAG 系统：</p>
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
<p>这种混合方法通过同时利用语义检索和基于关键词的检索，确保了 RAG 系统能够提供更准确、更具上下文意识的响应。</p>
