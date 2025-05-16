---
id: hybrid_search_with_milvus.md
summary: 使用 Milvus 进行混合搜索
title: 使用 Milvus 进行混合搜索
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hybrid_search_with_milvus.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hybrid_search_with_milvus.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<h1 id="Hybrid-Search-with-Milvus" class="common-anchor-header">使用 Milvus 进行混合搜索<button data-href="#Hybrid-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>如果您想体验本教程的最终效果，可以直接访问 https://demos.milvus.io/hybrid-search/</p>
<p><img translate="no" src="https://raw.githubusercontent.com/milvus-io/bootcamp/master/bootcamp/tutorials/quickstart/apps/hybrid_demo_with_milvus/pics/demo.png"/></p>
<p>在本教程中，我们将演示如何利用<a href="https://milvus.io/docs/multi-vector-search.md">Milvus</a>和<a href="https://github.com/FlagOpen/FlagEmbedding/tree/master/FlagEmbedding/BGE_M3">BGE-M3 模型</a>进行混合搜索。BGE-M3 模型可以将文本转换为密集向量和稀疏向量。Milvus 支持在一个 Collections 中存储这两种向量，从而可以进行混合搜索，增强搜索结果的相关性。</p>
<p>Milvus 支持密集、稀疏和混合检索方法：</p>
<ul>
<li>密集检索：利用语义上下文来理解查询背后的含义。</li>
<li>稀疏检索：强调关键词匹配，根据特定术语查找结果，相当于全文检索。</li>
<li>混合检索：结合了密集和稀疏两种方法，捕捉完整的上下文和特定的关键词，从而获得全面的搜索结果。</li>
</ul>
<p>通过整合这些方法，Milvus 混合搜索平衡了语义和词汇的相似性，提高了搜索结果的整体相关性。本笔记本将介绍这些检索策略的设置和使用过程，并重点介绍它们在各种搜索场景中的有效性。</p>
<h3 id="Dependencies-and-Environment" class="common-anchor-header">依赖关系和环境</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus <span class="hljs-string">&quot;pymilvus[model]&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Download-Dataset" class="common-anchor-header">下载数据集</h3><p>要演示搜索，我们需要一个文档语料库。让我们使用 Quora 重复问题数据集，并将其放在本地目录中。</p>
<p>数据集来源：<a href="https://www.quora.com/q/quoradata/First-Quora-Dataset-Release-Question-Pairs">第一个 Quora 数据集发布：问题对</a></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Run this cell to download the dataset</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget http://qim.fs.quoracdn.net/quora_duplicate_questions.tsv</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Load-and-Prepare-Data" class="common-anchor-header">加载和准备数据</h3><p>我们将加载数据集并准备一个小型语料库用于搜索。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd

file_path = <span class="hljs-string">&quot;quora_duplicate_questions.tsv&quot;</span>
df = pd.read_csv(file_path, sep=<span class="hljs-string">&quot;\t&quot;</span>)
questions = <span class="hljs-built_in">set</span>()
<span class="hljs-keyword">for</span> _, row <span class="hljs-keyword">in</span> df.iterrows():
    obj = row.to_dict()
    questions.add(obj[<span class="hljs-string">&quot;question1&quot;</span>][:<span class="hljs-number">512</span>])
    questions.add(obj[<span class="hljs-string">&quot;question2&quot;</span>][:<span class="hljs-number">512</span>])
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(questions) &gt; <span class="hljs-number">500</span>:  <span class="hljs-comment"># Skip this if you want to use the full dataset</span>
        <span class="hljs-keyword">break</span>

docs = <span class="hljs-built_in">list</span>(questions)

<span class="hljs-comment"># example question</span>
<span class="hljs-built_in">print</span>(docs[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">What is the strongest Kevlar cord?
</code></pre>
<h3 id="Use-BGE-M3-Model-for-Embeddings" class="common-anchor-header">使用 BGE-M3 模型进行嵌入</h3><p>BGE-M3 模型可以将文本嵌入为密集向量和稀疏向量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction

ef = BGEM3EmbeddingFunction(use_fp16=<span class="hljs-literal">False</span>, device=<span class="hljs-string">&quot;cpu&quot;</span>)
dense_dim = ef.dim[<span class="hljs-string">&quot;dense&quot;</span>]

<span class="hljs-comment"># Generate embeddings using BGE-M3 model</span>
docs_embeddings = ef(docs)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 302473.85it/s]
Inference Embeddings: 100%|██████████| 32/32 [01:59&lt;00:00,  3.74s/it]
</code></pre>
<h3 id="Setup-Milvus-Collection-and-Index" class="common-anchor-header">设置 Milvus Collections 和索引</h3><p>我们将设置 Milvus Collections 并为向量场创建索引。</p>
<div class="alert alert-info">
<ul>
<li>将 uri 设置为本地文件，如"./milvus.db"，是最方便的方法，因为它会自动利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>将所有数据存储在此文件中。</li>
<li>如果你有大规模数据，比如超过一百万个向量，你可以在<a href="https://milvus.io/docs/quickstart.md">Docker 或 Kubernetes</a> 上设置性能更强的 Milvus 服务器。在此设置中，请使用服务器 uri（如 http://localhost:19530）作为您的 uri。</li>
<li>如果你想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的全托管云服务），请调整 uri 和令牌，它们与 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">公共端点和 API 密钥</a>相对应。</li>
</ul>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

<span class="hljs-comment"># Connect to Milvus given URI</span>
connections.connect(uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>)

<span class="hljs-comment"># Specify the data schema for the new Collection</span>
fields = [
    <span class="hljs-comment"># Use auto generated id as primary key</span>
    FieldSchema(
        name=<span class="hljs-string">&quot;pk&quot;</span>, dtype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>
    ),
    <span class="hljs-comment"># Store the original text to retrieve based on semantically distance</span>
    FieldSchema(name=<span class="hljs-string">&quot;text&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>),
    <span class="hljs-comment"># Milvus now supports both sparse and dense vectors,</span>
    <span class="hljs-comment"># we can store each in a separate field to conduct hybrid search on both vectors</span>
    FieldSchema(name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, dtype=DataType.SPARSE_FLOAT_VECTOR),
    FieldSchema(name=<span class="hljs-string">&quot;dense_vector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=dense_dim),
]
schema = CollectionSchema(fields)

<span class="hljs-comment"># Create collection (drop the old one if exists)</span>
col_name = <span class="hljs-string">&quot;hybrid_demo&quot;</span>
<span class="hljs-keyword">if</span> utility.has_collection(col_name):
    Collection(col_name).drop()
col = Collection(col_name, schema, consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)

<span class="hljs-comment"># To make vector search efficient, we need to create indices for the vector fields</span>
sparse_index = {<span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
col.create_index(<span class="hljs-string">&quot;sparse_vector&quot;</span>, sparse_index)
dense_index = {<span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
col.create_index(<span class="hljs-string">&quot;dense_vector&quot;</span>, dense_index)
col.load()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-Data-into-Milvus-Collection" class="common-anchor-header">将数据插入 Milvus Collections</h3><p>将文档及其 Embeddings 插入 Collections。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># For efficiency, we insert 50 records in each small batch</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(docs), <span class="hljs-number">50</span>):
    batched_entities = [
        docs[i : i + <span class="hljs-number">50</span>],
        docs_embeddings[<span class="hljs-string">&quot;sparse&quot;</span>][i : i + <span class="hljs-number">50</span>],
        docs_embeddings[<span class="hljs-string">&quot;dense&quot;</span>][i : i + <span class="hljs-number">50</span>],
    ]
    col.insert(batched_entities)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of entities inserted:&quot;</span>, col.num_entities)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Number of entities inserted: 502
</code></pre>
<h3 id="Enter-Your-Search-Query" class="common-anchor-header">输入搜索查询</h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Enter your search query</span>
query = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Enter your search query: &quot;</span>)
<span class="hljs-built_in">print</span>(query)

<span class="hljs-comment"># Generate embeddings for the query</span>
query_embeddings = ef([query])
<span class="hljs-comment"># print(query_embeddings)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">How to start learning programming?
</code></pre>
<h3 id="Run-the-Search" class="common-anchor-header">运行搜索</h3><p>我们将首先准备一些有用的函数来运行搜索：</p>
<ul>
<li><code translate="no">dense_search</code>只搜索密集向量场</li>
<li><code translate="no">sparse_search</code>只在稀疏向量场中搜索</li>
<li><code translate="no">hybrid_search</code>：使用加权 Reranker 在密集向量场和向量场中搜索</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    AnnSearchRequest,
    WeightedRanker,
)


<span class="hljs-keyword">def</span> <span class="hljs-title function_">dense_search</span>(<span class="hljs-params">col, query_dense_embedding, limit=<span class="hljs-number">10</span></span>):
    search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}
    res = col.search(
        [query_dense_embedding],
        anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
        limit=limit,
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
        param=search_params,
    )[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">return</span> [hit.get(<span class="hljs-string">&quot;text&quot;</span>) <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> res]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sparse_search</span>(<span class="hljs-params">col, query_sparse_embedding, limit=<span class="hljs-number">10</span></span>):
    search_params = {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {},
    }
    res = col.search(
        [query_sparse_embedding],
        anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
        limit=limit,
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
        param=search_params,
    )[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">return</span> [hit.get(<span class="hljs-string">&quot;text&quot;</span>) <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> res]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">hybrid_search</span>(<span class="hljs-params">
    col,
    query_dense_embedding,
    query_sparse_embedding,
    sparse_weight=<span class="hljs-number">1.0</span>,
    dense_weight=<span class="hljs-number">1.0</span>,
    limit=<span class="hljs-number">10</span>,
</span>):
    dense_search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}
    dense_req = AnnSearchRequest(
        [query_dense_embedding], <span class="hljs-string">&quot;dense_vector&quot;</span>, dense_search_params, limit=limit
    )
    sparse_search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}
    sparse_req = AnnSearchRequest(
        [query_sparse_embedding], <span class="hljs-string">&quot;sparse_vector&quot;</span>, sparse_search_params, limit=limit
    )
    rerank = WeightedRanker(sparse_weight, dense_weight)
    res = col.hybrid_search(
        [sparse_req, dense_req], rerank=rerank, limit=limit, output_fields=[<span class="hljs-string">&quot;text&quot;</span>]
    )[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">return</span> [hit.get(<span class="hljs-string">&quot;text&quot;</span>) <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> res]
<button class="copy-code-btn"></button></code></pre>
<p>让我们用定义的函数运行三种不同的搜索：</p>
<pre><code translate="no" class="language-python">dense_results = dense_search(col, query_embeddings[<span class="hljs-string">&quot;dense&quot;</span>][<span class="hljs-number">0</span>])
sparse_results = sparse_search(col, query_embeddings[<span class="hljs-string">&quot;sparse&quot;</span>][[<span class="hljs-number">0</span>]])
hybrid_results = hybrid_search(
    col,
    query_embeddings[<span class="hljs-string">&quot;dense&quot;</span>][<span class="hljs-number">0</span>],
    query_embeddings[<span class="hljs-string">&quot;sparse&quot;</span>][[<span class="hljs-number">0</span>]],
    sparse_weight=<span class="hljs-number">0.7</span>,
    dense_weight=<span class="hljs-number">1.0</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Display-Search-Results" class="common-anchor-header">显示搜索结果</h3><p>要显示密集搜索、稀疏搜索和混合搜索的结果，我们需要一些工具来格式化搜索结果。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">doc_text_formatting</span>(<span class="hljs-params">ef, query, docs</span>):
    tokenizer = ef.model.tokenizer
    query_tokens_ids = tokenizer.encode(query, return_offsets_mapping=<span class="hljs-literal">True</span>)
    query_tokens = tokenizer.convert_ids_to_tokens(query_tokens_ids)
    formatted_texts = []

    <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs:
        ldx = <span class="hljs-number">0</span>
        landmarks = []
        encoding = tokenizer.encode_plus(doc, return_offsets_mapping=<span class="hljs-literal">True</span>)
        tokens = tokenizer.convert_ids_to_tokens(encoding[<span class="hljs-string">&quot;input_ids&quot;</span>])[<span class="hljs-number">1</span>:-<span class="hljs-number">1</span>]
        offsets = encoding[<span class="hljs-string">&quot;offset_mapping&quot;</span>][<span class="hljs-number">1</span>:-<span class="hljs-number">1</span>]
        <span class="hljs-keyword">for</span> token, (start, end) <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(tokens, offsets):
            <span class="hljs-keyword">if</span> token <span class="hljs-keyword">in</span> query_tokens:
                <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(landmarks) != <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> start == landmarks[-<span class="hljs-number">1</span>]:
                    landmarks[-<span class="hljs-number">1</span>] = end
                <span class="hljs-keyword">else</span>:
                    landmarks.append(start)
                    landmarks.append(end)
        close = <span class="hljs-literal">False</span>
        formatted_text = <span class="hljs-string">&quot;&quot;</span>
        <span class="hljs-keyword">for</span> i, c <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(doc):
            <span class="hljs-keyword">if</span> ldx == <span class="hljs-built_in">len</span>(landmarks):
                <span class="hljs-keyword">pass</span>
            <span class="hljs-keyword">elif</span> i == landmarks[ldx]:
                <span class="hljs-keyword">if</span> close:
                    formatted_text += <span class="hljs-string">&quot;&lt;/span&gt;&quot;</span>
                <span class="hljs-keyword">else</span>:
                    formatted_text += <span class="hljs-string">&quot;&lt;span style=&#x27;color:red&#x27;&gt;&quot;</span>
                close = <span class="hljs-keyword">not</span> close
                ldx = ldx + <span class="hljs-number">1</span>
            formatted_text += c
        <span class="hljs-keyword">if</span> close <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span>:
            formatted_text += <span class="hljs-string">&quot;&lt;/span&gt;&quot;</span>
        formatted_texts.append(formatted_text)
    <span class="hljs-keyword">return</span> formatted_texts
<button class="copy-code-btn"></button></code></pre>
<p>然后，我们就可以用带高亮显示的文本显示搜索结果了：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> Markdown, display

<span class="hljs-comment"># Dense search results</span>
display(Markdown(<span class="hljs-string">&quot;**Dense Search Results:**&quot;</span>))
formatted_results = doc_text_formatting(ef, query, dense_results)
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> dense_results:
    display(Markdown(result))

<span class="hljs-comment"># Sparse search results</span>
display(Markdown(<span class="hljs-string">&quot;\n**Sparse Search Results:**&quot;</span>))
formatted_results = doc_text_formatting(ef, query, sparse_results)
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> formatted_results:
    display(Markdown(result))

<span class="hljs-comment"># Hybrid search results</span>
display(Markdown(<span class="hljs-string">&quot;\n**Hybrid Search Results:**&quot;</span>))
formatted_results = doc_text_formatting(ef, query, hybrid_results)
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> formatted_results:
    display(Markdown(result))
<button class="copy-code-btn"></button></code></pre>
<p><strong>密集搜索结果：</strong></p>
<p>开始学习机器人技术的最佳方法是什么？</p>
<p>如何学习 java 等计算机语言？</p>
<p>如何开始学习信息安全？</p>
<p>什么是 Java 编程？如何学习 Java 编程语言？</p>
<p>如何学习计算机安全？</p>
<p>开始学习机器人技术的最佳方法是什么？哪种开发板最适合我开始工作？</p>
<p>如何学习说流利的英语？</p>
<p>学习法语的最佳方法是什么？</p>
<p>如何让物理变得简单易学？</p>
<p>如何准备 UPSC？</p>
<p><strong>稀疏搜索结果：</strong></p>
<p>什么是 Java<span style='color:red'> 编程？如何</span>学习 Java 编程语言？</p>
<p><span style='color:red'> 开始学习</span>机器人技术的最佳方法是什么<span style='color:red'>？</span></p>
<p>机器<span style='color:red'> 学习的</span>替代方法是什么<span style='color:red'> ？</span></p>
<p><span style='color:red'>如何</span>使用 C 语言在 Linux 中创建新终端和新 shell<span style='color:red'> ？</span></p>
<p><span style='color:red'>如何</span>使用 C 语言在新终端（Linux 终端）中创建新 shell<span style='color:red'>？</span></p>
<p>在海得拉巴<span style='color:red'> 做</span>哪一行比较好<span style='color:red'>？</span></p>
<p>在海得拉巴做哪一行比较好<span style='color:red'>？</span></p>
<p><span style='color:red'> 启动</span>机器人技术的最佳方式是什么<span style='color:red'>？</span>哪种开发板最适合我<span style='color:red'> 开始</span>工作<span style='color:red'>？</span></p>
<p>新手需要掌握哪些数学知识<span style='color:red'> 才能</span>理解计算机<span style='color:red'> 编程</span>的算法<span style='color:red'> ？</span>哪些算法书籍适合完全初学者<span style='color:red'>？</span></p>
<p><span style='color:red'>如何</span>让生活适合自己，不让生活在精神上和情感上<span style='color:red'>虐待</span>自己<span style='color:red'>？</span></p>
<p><strong>混合搜索结果：</strong></p>
<p><span style='color:red'> 开始学习</span>机器人技术的最佳方法是什么<span style='color:red'>？</span>哪种开发板最好<span style='color:red'>？</span></p>
<p>什么是 Java<span style='color:red'> 编程？如何</span>学习 Java 编程语言？</p>
<p><span style='color:red'> 开始学习</span>机器人技术的最佳方法是什么<span style='color:red'>？</span></p>
<p><span style='color:red'>如何</span>备考 UPSC<span style='color:red'>？</span></p>
<p><span style='color:red'>如何</span>让物理变得简单<span style='color:red'> 易学</span><span style='color:red'>？</span></p>
<p>学习法语<span style='color:red'> 的</span>最佳方法是什么<span style='color:red'>？</span></p>
<p><span style='color:red'>如何</span><span style='color:red'> 学说</span>流利的英语<span style='color:red'>？</span></p>
<p><span style='color:red'>如何</span>学习计算机安全<span style='color:red'>？</span></p>
<p><span style='color:red'>如何</span>开始<span style='color:red'> 学习</span>信息安全<span style='color:red'>？</span></p>
<p><span style='color:red'>如何</span>学习 java 等计算机语言<span style='color:red'>？</span></p>
<p>机器<span style='color:red'> 学习的</span>替代方法是什么？</p>
<p><span style='color:red'>如何</span>使用 C<span style='color:red'> 语言</span>在 Linux 中创建新的终端和新的 shell<span style='color:red'> ？</span></p>
<p><span style='color:red'>如何</span>使用 C<span style='color:red'> 语言</span>在新终端（Linux 终端）中创建新 shell<span style='color:red'>？</span></p>
<p>在海得拉巴<span style='color:red'> 做</span>哪一行比较好<span style='color:red'>？</span></p>
<p>在海得拉巴做哪一行比较好<span style='color:red'>？</span></p>
<p>一个完全的新手需要掌握哪些数学知识<span style='color:red'> 才能</span>理解计算机<span style='color:red'> 编程</span>的算法<span style='color:red'> ？</span>哪些算法书籍适合完全初学者<span style='color:red'>？</span></p>
<p><span style='color:red'>如何</span>让生活适合自己，让生活不再从精神和情感上<span style='color:red'>虐待</span>自己<span style='color:red'>？</span></p>
<h3 id="Quick-Deploy" class="common-anchor-header">快速部署</h3><p>要了解如何使用本教程开始在线演示，请参考<a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/tutorials/quickstart/apps/hybrid_demo_with_milvus">示例应用程序</a>。</p>
