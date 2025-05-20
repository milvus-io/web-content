---
id: milvus_hybrid_search_retriever.md
summary: 本笔记本介绍如何使用与 Milvus 向量数据库相关的功能。
title: Milvus 混合搜索检索器
---
<h1 id="Milvus-Hybrid-Search-Retriever" class="common-anchor-header">Milvus 混合搜索检索器<button data-href="#Milvus-Hybrid-Search-Retriever" class="anchor-icon" translate="no">
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
    </button></h1><p>混合搜索结合了不同搜索范式的优势，以提高检索的准确性和鲁棒性。它既能利用密集向量搜索和稀疏向量搜索的能力，也能利用多种密集向量搜索策略的组合，确保对各种查询进行全面而精确的检索。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>本图展示了最常见的混合搜索方案，即密集+稀疏混合搜索。在这种情况下，使用语义向量相似性和精确关键词匹配两种方法检索候选内容。来自这些方法的结果会被合并、重新排序，并传递给 LLM 以生成最终答案。这种方法兼顾了精确性和语义理解，对各种查询场景都非常有效。</p>
<p>除了密集+稀疏混合搜索，混合策略还可以结合多个密集向量模型。例如，一种密集向量模型可能专门捕捉语义的细微差别，而另一种则侧重于上下文嵌入或特定领域的表示。通过合并这些模型的结果并重新排序，这种类型的混合搜索可确保检索过程更加细致入微、更能感知上下文。</p>
<p>LangChain Milvus集成提供了实现混合搜索的灵活方式，它支持任意数量的向量场，以及任意自定义的密集或稀疏嵌入模型，这使得LangChain Milvus能够灵活适应各种混合搜索使用场景，同时兼容LangChain的其他功能。</p>
<p>在本教程中，我们将从最常见的密集+稀疏情况开始，然后介绍各种通用的混合搜索使用方法。</p>
<div class="alert note">
<p><a href="https://api.python.langchain.com/en/latest/milvus/retrievers/langchain_milvus.retrievers.milvus_hybrid_search.MilvusCollectionHybridSearchRetriever.html">MilvusCollectionHybridSearchRetriever</a> 是使用 Milvus 和 LangChain 进行混合搜索的另一种实现，<strong>即将被废弃</strong>。请使用本文档中的方法来实现混合搜索，因为它更灵活，而且与 LangChain 兼容。</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>在运行本笔记本之前，请确保已安装以下依赖项：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade --quiet  langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4 pymilvus[model] <span class="hljs-comment">#langchain-voyageai</span></span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您使用的是 Google Colab，要启用刚刚安装的依赖项，可能需要<strong>重启运行时</strong>（点击屏幕上方的 "运行时 "菜单，从下拉菜单中选择 "重启会话"）。</p>
</div>
<p>我们将使用 OpenAI 的模型。您应准备好<a href="https://platform.openai.com/docs/quickstart">OpenAI</a> 的环境变量<code translate="no">OPENAI_API_KEY</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>指定您的 Milvus 服务器<code translate="no">URI</code> （可选<code translate="no">TOKEN</code> ）。有关如何安装和启动 Milvus 服务器，请参阅本<a href="https://milvus.io/docs/install_standalone-docker-compose.md">指南</a>。</p>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = ...</span>
<button class="copy-code-btn"></button></code></pre>
<p>准备一些示例文档，即按主题或流派分类的虚构故事摘要。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

docs = [
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Whispering Walls&#x27; by Ava Moreno, a young journalist named Sophia uncovers a decades-old conspiracy hidden within the crumbling walls of an ancient mansion, where the whispers of the past threaten to destroy her own sanity.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Mystery&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Last Refuge&#x27; by Ethan Blackwood, a group of survivors must band together to escape a post-apocalyptic wasteland, where the last remnants of humanity cling to life in a desperate bid for survival.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Post-Apocalyptic&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Memory Thief&#x27; by Lila Rose, a charismatic thief with the ability to steal and manipulate memories is hired by a mysterious client to pull off a daring heist, but soon finds themselves trapped in a web of deceit and betrayal.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Heist/Thriller&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The City of Echoes&#x27; by Julian Saint Clair, a brilliant detective must navigate a labyrinthine metropolis where time is currency, and the rich can live forever, but at a terrible cost to the poor.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Science Fiction&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Starlight Serenade&#x27; by Ruby Flynn, a shy astronomer discovers a mysterious melody emanating from a distant star, which leads her on a journey to uncover the secrets of the universe and her own heart.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Science Fiction/Romance&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Shadow Weaver&#x27; by Piper Redding, a young orphan discovers she has the ability to weave powerful illusions, but soon finds herself at the center of a deadly game of cat and mouse between rival factions vying for control of the mystical arts.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Fantasy&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Lost Expedition&#x27; by Caspian Grey, a team of explorers ventures into the heart of the Amazon rainforest in search of a lost city, but soon finds themselves hunted by a ruthless treasure hunter and the treacherous jungle itself.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Adventure&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Clockwork Kingdom&#x27; by Augusta Wynter, a brilliant inventor discovers a hidden world of clockwork machines and ancient magic, where a rebellion is brewing against the tyrannical ruler of the land.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Steampunk/Fantasy&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Phantom Pilgrim&#x27; by Rowan Welles, a charismatic smuggler is hired by a mysterious organization to transport a valuable artifact across a war-torn continent, but soon finds themselves pursued by deadly assassins and rival factions.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Adventure/Thriller&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Dreamwalker&#x27;s Journey&#x27; by Lyra Snow, a young dreamwalker discovers she has the ability to enter people&#x27;s dreams, but soon finds herself trapped in a surreal world of nightmares and illusions, where the boundaries between reality and fantasy blur.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Fantasy&quot;</span>},
    ),
]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Dense-embedding-+-Sparse-embedding" class="common-anchor-header">密集嵌入 + 稀疏嵌入<button data-href="#Dense-embedding-+-Sparse-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Option-1Recommended-dense-embedding-+-Milvus-BM25-built-in-function" class="common-anchor-header">方案 1（推荐）：密集嵌入 + Milvus BM25 内置功能</h3><p>使用密集嵌入 + Milvus BM25 内置函数组装混合检索向量存储实例。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus, BM25BuiltInFunction
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),  <span class="hljs-comment"># output_field_names=&quot;sparse&quot;),</span>
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>当您使用<code translate="no">BM25BuiltInFunction</code> 时，请注意全文检索在 Milvus Standalone 和 Milvus Distributed 中可用，但在 Milvus Lite 中不可用，尽管它已在未来加入的路线图上。它也将很快在 Zilliz Cloud（全面管理 Milvus）中提供。更多信息请联系<a href="mailto:support@zilliz.com">support@zilliz.com</a>。</li>
</ul>
</div>
<p>在上面的代码中，我们定义了<code translate="no">BM25BuiltInFunction</code> 的一个实例，并将其传递给<code translate="no">Milvus</code> 对象。<code translate="no">BM25BuiltInFunction</code> 是一个轻量级封装类。 <a href="https://milvus.io/docs/manage-collections.md#Function"><code translate="no">Function</code></a>的轻量级封装类。我们可以将它与<code translate="no">OpenAIEmbeddings</code> 一起使用，初始化密集+稀疏混合搜索 Milvus 向量存储实例。</p>
<p><code translate="no">BM25BuiltInFunction</code> Milvus "不要求客户端传递语料或训练，所有这些都在 Milvus 服务器端自动处理，因此用户无需关心任何词汇和语料。此外，用户还可以定制<a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">分析器</a>，在 BM25 中实现自定义文本处理。</p>
<p>有关<code translate="no">BM25BuiltInFunction</code> 的更多信息，请参阅《<a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">全文搜索</a>》（<a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">Full-Text-Search</a>）和《<a href="https://milvus.io/docs/full_text_search_with_langchain.md">使用 LangChain 和 Milvus 进行全文搜索</a>》（<a href="https://milvus.io/docs/full_text_search_with_langchain.md">Using</a> <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">Full-Text Search</a> <a href="https://milvus.io/docs/full_text_search_with_langchain.md">with LangChain and Milvus</a>）。</p>
<h3 id="Option-2-Use-dense-and-customized-LangChain-sparse-embedding" class="common-anchor-header">方案 2：使用密集和定制的 LangChain 稀疏嵌入</h3><p>您可以从<code translate="no">langchain_milvus.utils.sparse</code> 继承类<code translate="no">BaseSparseEmbedding</code> ，并实现<code translate="no">embed_query</code> 和<code translate="no">embed_documents</code> 方法来定制稀疏嵌入过程。这样，您就可以自定义任何基于词频统计（如<a href="https://milvus.io/docs/embed-with-bm25.md#BM25">BM25</a>）或神经网络（如<a href="https://milvus.io/docs/embed-with-splade.md#SPLADE">SPADE</a>）的稀疏嵌入方法。</p>
<p>下面是一个例子：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">Dict</span>, <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> langchain_milvus.utils.sparse <span class="hljs-keyword">import</span> BaseSparseEmbedding


<span class="hljs-keyword">class</span> <span class="hljs-title class_">MyCustomEmbedding</span>(<span class="hljs-title class_ inherited__">BaseSparseEmbedding</span>):  <span class="hljs-comment"># inherit from BaseSparseEmbedding</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, model_path</span>): ...  <span class="hljs-comment"># code to init or load model</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_query</span>(<span class="hljs-params">self, query: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-type">Dict</span>[<span class="hljs-built_in">int</span>, <span class="hljs-built_in">float</span>]:
        ...  <span class="hljs-comment"># code to embed query</span>
        <span class="hljs-keyword">return</span> {  <span class="hljs-comment"># fake embedding result</span>
            <span class="hljs-number">1</span>: <span class="hljs-number">0.1</span>,
            <span class="hljs-number">2</span>: <span class="hljs-number">0.2</span>,
            <span class="hljs-number">3</span>: <span class="hljs-number">0.3</span>,
            <span class="hljs-comment"># ...</span>
        }

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_documents</span>(<span class="hljs-params">self, texts: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>) -&gt; <span class="hljs-type">List</span>[<span class="hljs-type">Dict</span>[<span class="hljs-built_in">int</span>, <span class="hljs-built_in">float</span>]]:
        ...  <span class="hljs-comment"># code to embed documents</span>
        <span class="hljs-keyword">return</span> [  <span class="hljs-comment"># fake embedding results</span>
            {
                <span class="hljs-number">1</span>: <span class="hljs-number">0.1</span>,
                <span class="hljs-number">2</span>: <span class="hljs-number">0.2</span>,
                <span class="hljs-number">3</span>: <span class="hljs-number">0.3</span>,
                <span class="hljs-comment"># ...</span>
            }
        ] * <span class="hljs-built_in">len</span>(texts)
<button class="copy-code-btn"></button></code></pre>
<p>在<code translate="no">langchain_milvus.utils.sparse</code> 中，我们有一个从<code translate="no">BaseSparseEmbedding</code> 继承而来的演示类<code translate="no">BM25SparseEmbedding</code> 。您可以将其传入 Milvus 向量存储实例的初始化嵌入列表，就像传入其他 langchain 密集嵌入类一样。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># BM25SparseEmbedding is inherited from BaseSparseEmbedding</span>
<span class="hljs-keyword">from</span> langchain_milvus.utils.sparse <span class="hljs-keyword">import</span> BM25SparseEmbedding

embedding1 = OpenAIEmbeddings()

corpus = [doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs]
embedding2 = BM25SparseEmbedding(
    corpus=corpus
)  <span class="hljs-comment"># pass in corpus to initialize the statistics</span>

vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=[embedding1, embedding2],
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>虽然这是使用 BM25 的一种方法，但它要求用户管理语料库以进行词频统计。我们建议改用 BM25 内置函数（选项 1），因为它能在 Milvus 服务器端处理一切事务。这样，用户就无需关心管理语料库或训练词汇的问题。更多信息，请参阅《<a href="https://milvus.io/docs/full_text_search_with_langchain.md">使用 LangChain 和 Milvus 进行全文检索</a>》。</p>
<h2 id="Define-multiple-arbitrary-vector-fields" class="common-anchor-header">定义多个任意向量场<button data-href="#Define-multiple-arbitrary-vector-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>在初始化 Milvus 向量存储时，你可以传入 Embeddings 列表（将来也会传入内置函数列表）来实现多路检索，然后对这些候选者进行 Rerankers。 下面是一个例子：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># from langchain_voyageai import VoyageAIEmbeddings</span>

embedding1 = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)
embedding2 = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-3-large&quot;</span>)
<span class="hljs-comment"># embedding3 = VoyageAIEmbeddings(model=&quot;voyage-3&quot;)  # You can also use embedding from other embedding model providers, e.g VoyageAIEmbeddings</span>


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=[embedding1, embedding2],  <span class="hljs-comment"># embedding3],</span>
    builtin_function=BM25BuiltInFunction(output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>),
    <span class="hljs-comment"># `sparse` is the output field name of BM25BuiltInFunction, and `dense1` and `dense2` are the output field names of embedding1 and embedding2</span>
    vector_field=[<span class="hljs-string">&quot;dense1&quot;</span>, <span class="hljs-string">&quot;dense2&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)

vectorstore.vector_fields
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['dense1', 'dense2', 'sparse']
</code></pre>
<p>在这个例子中，我们有三个向量场。其中，<code translate="no">sparse</code> 被用作<code translate="no">BM25BuiltInFunction</code> 的输出字段，而其他两个，<code translate="no">dense1</code> 和<code translate="no">dense2</code> ，则被自动分配为两个<code translate="no">OpenAIEmbeddings</code> 模型的输出字段（根据顺序）。</p>
<h3 id="Specify-the-index-params-for-multi-vector-fields" class="common-anchor-header">为多向量字段指定索引参数</h3><p>默认情况下，每个向量场的索引类型将由嵌入类型或内置函数自动决定。不过，您也可以指定每个向量字段的索引类型，以优化搜索性能。</p>
<pre><code translate="no" class="language-python">dense_index_param_1 = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;HNSW&quot;</span>,
}
dense_index_param_2 = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;HNSW&quot;</span>,
}
sparse_index_param = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
}

vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=[embedding1, embedding2],
    builtin_function=BM25BuiltInFunction(output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>),
    index_params=[dense_index_param_1, dense_index_param_2, sparse_index_param],
    vector_field=[<span class="hljs-string">&quot;dense1&quot;</span>, <span class="hljs-string">&quot;dense2&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)

vectorstore.vector_fields
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['dense1', 'dense2', 'sparse']
</code></pre>
<div class="alert note">
<p>请将索引参数列表的顺序与<code translate="no">vectorstore.vector_fields</code> 的顺序保持一致，以免混淆。</p>
</div>
<h3 id="Rerank-the-candidates" class="common-anchor-header">对候选数据重新排名</h3><p>第一阶段检索结束后，我们需要对候选数据重新排名，以获得更好的结果。您可以根据自己的要求选择<a href="https://milvus.io/docs/reranking.md#Weighted-Scoring-WeightedRanker">加权排名器（WeightedRanker</a>）或<a href="https://milvus.io/docs/reranking.md#Reciprocal-Rank-Fusion-RRFRanker">重新</a> <a href="https://milvus.io/docs/reranking.md#Weighted-Scoring-WeightedRanker">排名</a> <a href="https://milvus.io/docs/reranking.md#Reciprocal-Rank-Fusion-RRFRanker">器（RRFRanker）</a>。您可以参考<a href="https://milvus.io/docs/reranking.md#Reranking">Reranking</a>了解更多信息。</p>
<p>以下是加权重排的示例：</p>
<pre><code translate="no" class="language-python">vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)

query = <span class="hljs-string">&quot;What are the novels Lila has written and what are their contents?&quot;</span>

vectorstore.similarity_search(
    query, k=<span class="hljs-number">1</span>, ranker_type=<span class="hljs-string">&quot;weighted&quot;</span>, ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.6</span>, <span class="hljs-number">0.4</span>]}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 454646931479252186, 'category': 'Heist/Thriller'}, page_content=&quot;In 'The Memory Thief' by Lila Rose, a charismatic thief with the ability to steal and manipulate memories is hired by a mysterious client to pull off a daring heist, but soon finds themselves trapped in a web of deceit and betrayal.&quot;)]
</code></pre>
<p>下面是 RRFerankers 的示例：</p>
<pre><code translate="no" class="language-python">vectorstore.similarity_search(query, k=<span class="hljs-number">1</span>, ranker_type=<span class="hljs-string">&quot;rrf&quot;</span>, ranker_params={<span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'category': 'Heist/Thriller', 'pk': 454646931479252186}, page_content=&quot;In 'The Memory Thief' by Lila Rose, a charismatic thief with the ability to steal and manipulate memories is hired by a mysterious client to pull off a daring heist, but soon finds themselves trapped in a web of deceit and betrayal.&quot;)]
</code></pre>
<p>如果不传递任何有关 Reranker 的参数，则默认使用平均加权 Reranker 策略。</p>
<h2 id="Using-Hybrid-Search-and-Reranking-in-RAG" class="common-anchor-header">在 RAG 中使用混合搜索和重排<button data-href="#Using-Hybrid-Search-and-Reranking-in-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>在 RAG 的应用场景中，混合搜索最普遍的方法是密集+稀疏检索，然后是 Rerankers。下面的示例演示了直接的端到端代码。</p>
<h3 id="Prepare-the-data" class="common-anchor-header">准备数据</h3><p>我们使用 Langchain WebBaseLoader 从网络源加载文档，并使用 RecursiveCharacterTextSplitter 将文档分割成块。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> bs4
<span class="hljs-keyword">from</span> langchain_community.document_loaders <span class="hljs-keyword">import</span> WebBaseLoader
<span class="hljs-keyword">from</span> langchain_text_splitters <span class="hljs-keyword">import</span> RecursiveCharacterTextSplitter

<span class="hljs-comment"># Create a WebBaseLoader instance to load documents from web sources</span>
loader = WebBaseLoader(
    web_paths=(
        <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-06-23-agent/&quot;</span>,
        <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/&quot;</span>,
    ),
    bs_kwargs=<span class="hljs-built_in">dict</span>(
        parse_only=bs4.SoupStrainer(
            class_=(<span class="hljs-string">&quot;post-content&quot;</span>, <span class="hljs-string">&quot;post-title&quot;</span>, <span class="hljs-string">&quot;post-header&quot;</span>)
        )
    ),
)
<span class="hljs-comment"># Load documents from web sources using the loader</span>
documents = loader.load()
<span class="hljs-comment"># Initialize a RecursiveCharacterTextSplitter for splitting text into chunks</span>
text_splitter = RecursiveCharacterTextSplitter(chunk_size=<span class="hljs-number">2000</span>, chunk_overlap=<span class="hljs-number">200</span>)

<span class="hljs-comment"># Split the documents into chunks using the text_splitter</span>
docs = text_splitter.split_documents(documents)

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
docs[<span class="hljs-number">1</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document(metadata={'source': 'https://lilianweng.github.io/posts/2023-06-23-agent/'}, page_content='Fig. 1. Overview of a LLM-powered autonomous agent system.\nComponent One: Planning#\nA complicated task usually involves many steps. An agent needs to know what they are and plan ahead.\nTask Decomposition#\nChain of thought (CoT; Wei et al. 2022) has become a standard prompting technique for enhancing model performance on complex tasks. The model is instructed to “think step by step” to utilize more test-time computation to decompose hard tasks into smaller and simpler steps. CoT transforms big tasks into multiple manageable tasks and shed lights into an interpretation of the model’s thinking process.\nTree of Thoughts (Yao et al. 2023) extends CoT by exploring multiple reasoning possibilities at each step. It first decomposes the problem into multiple thought steps and generates multiple thoughts per step, creating a tree structure. The search process can be BFS (breadth-first search) or DFS (depth-first search) with each state evaluated by a classifier (via a prompt) or majority vote.\nTask decomposition can be done (1) by LLM with simple prompting like &quot;Steps for XYZ.\\n1.&quot;, &quot;What are the subgoals for achieving XYZ?&quot;, (2) by using task-specific instructions; e.g. &quot;Write a story outline.&quot; for writing a novel, or (3) with human inputs.\nAnother quite distinct approach, LLM+P (Liu et al. 2023), involves relying on an external classical planner to do long-horizon planning. This approach utilizes the Planning Domain Definition Language (PDDL) as an intermediate interface to describe the planning problem. In this process, LLM (1) translates the problem into “Problem PDDL”, then (2) requests a classical planner to generate a PDDL plan based on an existing “Domain PDDL”, and finally (3) translates the PDDL plan back into natural language. Essentially, the planning step is outsourced to an external tool, assuming the availability of domain-specific PDDL and a suitable planner which is common in certain robotic setups but not in many other domains.\nSelf-Reflection#')
</code></pre>
<h3 id="Load-the-document-into-Milvus-vector-store" class="common-anchor-header">将文档加载到 Milvus 向量存储中</h3><p>如上介绍，我们将准备好的文档初始化并加载到 Milvus 向量存储中，其中包含两个向量字段：<code translate="no">dense</code> 用于 OpenAI 嵌入，<code translate="no">sparse</code> 用于 BM25 函数。</p>
<pre><code translate="no" class="language-python">vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-RAG-chain" class="common-anchor-header">构建 RAG 链</h3><p>我们准备好 LLM 实例和提示，然后使用 LangChain 表达式语言将它们结合到 RAG 管道中。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.runnables <span class="hljs-keyword">import</span> RunnablePassthrough
<span class="hljs-keyword">from</span> langchain_core.prompts <span class="hljs-keyword">import</span> PromptTemplate
<span class="hljs-keyword">from</span> langchain_core.output_parsers <span class="hljs-keyword">import</span> StrOutputParser
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> ChatOpenAI

<span class="hljs-comment"># Initialize the OpenAI language model for response generation</span>
llm = ChatOpenAI(model_name=<span class="hljs-string">&quot;gpt-4o&quot;</span>, temperature=<span class="hljs-number">0</span>)

<span class="hljs-comment"># Define the prompt template for generating AI responses</span>
PROMPT_TEMPLATE = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant, and provides answers to questions by using fact based and statistical information when possible.
Use the following pieces of information to provide a concise answer to the question enclosed in &lt;question&gt; tags.
If you don&#x27;t know the answer, just say that you don&#x27;t know, don&#x27;t try to make up an answer.
&lt;context&gt;
{context}
&lt;/context&gt;

&lt;question&gt;
{question}
&lt;/question&gt;

The response should be specific and use statistics or numbers when possible.

Assistant:&quot;&quot;&quot;</span>

<span class="hljs-comment"># Create a PromptTemplate instance with the defined template and input variables</span>
prompt = PromptTemplate(
    template=PROMPT_TEMPLATE, input_variables=[<span class="hljs-string">&quot;context&quot;</span>, <span class="hljs-string">&quot;question&quot;</span>]
)
<span class="hljs-comment"># Convert the vector store to a retriever</span>
retriever = vectorstore.as_retriever()


<span class="hljs-comment"># Define a function to format the retrieved documents</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">format_docs</span>(<span class="hljs-params">docs</span>):
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;\n\n&quot;</span>.join(doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs)
<button class="copy-code-btn"></button></code></pre>
<p>使用 LCEL（LangChain 表达式语言）构建 RAG 链。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the RAG (Retrieval-Augmented Generation) chain for AI response generation</span>
rag_chain = (
    {<span class="hljs-string">&quot;context&quot;</span>: retriever | format_docs, <span class="hljs-string">&quot;question&quot;</span>: RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

<span class="hljs-comment"># rag_chain.get_graph().print_ascii()</span>
<button class="copy-code-btn"></button></code></pre>
<p>使用特定问题调用 RAG 链并获取响应</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What is PAL and PoT?&quot;</span>
res = rag_chain.invoke(query)
res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'PAL (Program-aided Language models) and PoT (Program of Thoughts prompting) are approaches that involve using language models to generate programming language statements to solve natural language reasoning problems. This method offloads the solution step to a runtime, such as a Python interpreter, allowing for complex computation and reasoning to be handled externally. PAL and PoT rely on language models with strong coding skills to effectively perform these tasks.'
</code></pre>
<p>恭喜您！您已经构建了由 Milvus 和 LangChain 支持的混合（密集向量 + 稀疏 bm25 函数）搜索 RAG 链。</p>
