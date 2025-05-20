---
id: hybrid_search_with_milvus.md
summary: 使用 Milvus 進行混合搜尋
title: 使用 Milvus 進行混合搜尋
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hybrid_search_with_milvus.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hybrid_search_with_milvus.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<h1 id="Hybrid-Search-with-Milvus" class="common-anchor-header">使用 Milvus 進行混合搜尋<button data-href="#Hybrid-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>如果您想體驗本教學的最終效果，可以直接到 https://demos.milvus.io/hybrid-search/</p>
<p><img translate="no" src="https://raw.githubusercontent.com/milvus-io/bootcamp/master/bootcamp/tutorials/quickstart/apps/hybrid_demo_with_milvus/pics/demo.png"/></p>
<p>在本教程中，我們將示範如何使用<a href="https://milvus.io/docs/multi-vector-search.md">Milvus</a>和<a href="https://github.com/FlagOpen/FlagEmbedding/tree/master/FlagEmbedding/BGE_M3">BGE-M3 模型</a>進行混合搜索。BGE-M3 模型可以將文字轉換成密集向量和稀疏向量。Milvus 支援在一個集合中同時儲存這兩種向量，允許進行混合搜尋，以提高搜尋結果的相關性。</p>
<p>Milvus 支援密集、稀疏和混合檢索方法：</p>
<ul>
<li>密集檢索：利用語意上下文來瞭解查詢背後的意義。</li>
<li>稀疏檢索：強調關鍵字比對，根據特定詞彙尋找結果，相當於全文檢索。</li>
<li>混合式檢索：結合 Dense 與 Sparse 兩種方法，擷取完整的上下文與特定關鍵字，以獲得全面的搜尋結果。</li>
</ul>
<p>透過整合這些方法，Milvus Hybrid Search 可平衡語義與詞彙的相似性，改善搜尋結果的整體相關性。本手冊將介紹設定和使用這些檢索策略的過程，並強調它們在各種搜尋情況下的有效性。</p>
<h3 id="Dependencies-and-Environment" class="common-anchor-header">依賴與環境</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus <span class="hljs-string">&quot;pymilvus[model]&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Download-Dataset" class="common-anchor-header">下載資料集</h3><p>為了示範搜尋，我們需要一個文件語料庫。讓我們使用 Quora 重複問題資料集，並將其放置在本機目錄中。</p>
<p>資料集的來源：<a href="https://www.quora.com/q/quoradata/First-Quora-Dataset-Release-Question-Pairs">第一次 Quora 資料集發佈：問題對</a></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Run this cell to download the dataset</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget http://qim.fs.quoracdn.net/quora_duplicate_questions.tsv</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Load-and-Prepare-Data" class="common-anchor-header">載入並準備資料</h3><p>我們將載入資料集，並準備一個小型語料庫，以供搜尋。</p>
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
<h3 id="Use-BGE-M3-Model-for-Embeddings" class="common-anchor-header">使用 BGE-M3 模型進行嵌入</h3><p>BGE-M3 模型可以將文字嵌入為密集向量和稀疏向量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction

ef = BGEM3EmbeddingFunction(use_fp16=<span class="hljs-literal">False</span>, device=<span class="hljs-string">&quot;cpu&quot;</span>)
dense_dim = ef.dim[<span class="hljs-string">&quot;dense&quot;</span>]

<span class="hljs-comment"># Generate embeddings using BGE-M3 model</span>
docs_embeddings = ef(docs)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 302473.85it/s]
Inference Embeddings: 100%|██████████| 32/32 [01:59&lt;00:00,  3.74s/it]
</code></pre>
<h3 id="Setup-Milvus-Collection-and-Index" class="common-anchor-header">設定 Milvus 收集與索引</h3><p>我們將設定 Milvus 套件，並為向量欄位建立索引。</p>
<div class="alert alert-info">
<ul>
<li>將 uri 設定為本機檔案，例如 "./milvus.db" 是最方便的方法，因為它會自動利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>將所有資料儲存在這個檔案中。</li>
<li>如果您有大規模的資料，例如超過一百萬個向量，您可以在<a href="https://milvus.io/docs/quickstart.md">Docker 或 Kubernetes</a> 上架設效能更高的 Milvus 伺服器。在此設定中，請使用伺服器的 uri，例如：http://localhost:19530。</li>
<li>如果您想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>，Milvus 的完全管理<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">雲端</a>服務，請調整 uri 和 token，對應 Zilliz Cloud 的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint 和 API key</a>。</li>
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
<h3 id="Insert-Data-into-Milvus-Collection" class="common-anchor-header">將資料插入 Milvus 套件</h3><p>插入文件及其嵌入到資料集中。</p>
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
<h3 id="Enter-Your-Search-Query" class="common-anchor-header">輸入您的搜尋查詢</h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Enter your search query</span>
query = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Enter your search query: &quot;</span>)
<span class="hljs-built_in">print</span>(query)

<span class="hljs-comment"># Generate embeddings for the query</span>
query_embeddings = ef([query])
<span class="hljs-comment"># print(query_embeddings)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">How to start learning programming?
</code></pre>
<h3 id="Run-the-Search" class="common-anchor-header">執行搜尋</h3><p>我們會先準備一些有用的函式來執行搜尋：</p>
<ul>
<li><code translate="no">dense_search</code>只在密集向量場中搜尋</li>
<li><code translate="no">sparse_search</code>：僅在稀疏向量場中搜尋</li>
<li><code translate="no">hybrid_search</code>：同時在密集向量場和向量場中使用加權重排器進行搜尋</li>
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
<p>讓我們使用定義的函式執行三種不同的搜尋：</p>
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
<h3 id="Display-Search-Results" class="common-anchor-header">顯示搜尋結果</h3><p>要顯示密集、稀疏和混合搜尋的結果，我們需要一些工具來格式化結果。</p>
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
<p>然後，我們就可以將搜尋結果顯示在有高亮點的文字中：</p>
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
<p><strong>密集搜尋結果：</strong></p>
<p>開始學習機器人的最佳方法是什麼？</p>
<p>如何學習 java 等電腦語言？</p>
<p>如何開始學習資訊安全？</p>
<p>什麼是 Java 程式設計？如何學習 Java 程式語言 ?</p>
<p>如何學習電腦安全？</p>
<p>如何開始學習機器人？哪種開發板最適合我開始工作？</p>
<p>如何學習流利的英語？</p>
<p>學習法語的最佳方法是什麼？</p>
<p>如何讓物理變得容易學習？</p>
<p>如何準備 UPSC？</p>
<p><strong>稀疏搜尋結果：</strong></p>
<p>什麼是 Java<span style='color:red'> 程式</span>語言？<span style='color:red'> 如何</span>學習 Java 程式語言 ?</p>
<p><span style='color:red'> 開始學習</span>機器人的最佳方式是什麼<span style='color:red'>？</span></p>
<p>機器<span style='color:red'> 學習的</span>替代方法是什麼？</p>
<p><span style='color:red'>如何</span>使用 C<span style='color:red'> 程式</span>語言在 Linux 中建立新終端和新 shell<span style='color:red'> ？</span></p>
<p><span style='color:red'>如何</span>使用 C<span style='color:red'> 程式</span>語言在新終端（Linux 終端）建立新 shell<span style='color:red'>？</span></p>
<p>在海德拉巴<span style='color:red'> 開設</span>哪家公司比較好<span style='color:red'>?</span></p>
<p>在海得拉巴<span style='color:red'> 開設</span>哪家公司比較好<span style='color:red'>?</span></p>
<p><span style='color:red'> 開辦</span>機器人的最佳方式是什麼<span style='color:red'>？</span>哪種開發板最適合我<span style='color:red'> 開始</span>工作<span style='color:red'>？</span></p>
<p>一個完全的新手需要哪些<span style='color:red'> 數學來</span>理解電腦<span style='color:red'> 程式設計</span>的演算法<span style='color:red'> ？</span>哪些有關演算法的書籍適合完全的初學者<span style='color:red'>？</span></p>
<p><span style='color:red'>如何</span>讓生活適合自己，讓生活不再在精神上和情緒上<span style='color:red'>虐待</span>自己<span style='color:red'>？</span></p>
<p><strong>混合搜尋結果：</strong></p>
<p><span style='color:red'> 開始學習</span>機器人的最佳方式是什麼<span style='color:red'>？</span>哪種開發板最好，我可以<span style='color:red'> 開始</span>工作<span style='color:red'>？</span></p>
<p>什麼是 Java<span style='color:red'> 程式設計？如何</span>學習 Java 程式語言？</p>
<p><span style='color:red'> 開始學習</span>機器人的最佳方式是什麼<span style='color:red'>？</span></p>
<p><span style='color:red'>如何</span>準備 UPSC<span style='color:red'>？</span></p>
<p><span style='color:red'>如何</span>讓物理<span style='color:red'> 變得</span>容易學習<span style='color:red'>？</span></p>
<p>學習法語<span style='color:red'> 的</span>最佳方法是什麼<span style='color:red'>？</span></p>
<p><span style='color:red'>如何</span><span style='color:red'> 才能</span>學會說流利的英語<span style='color:red'>？</span></p>
<p><span style='color:red'>如何</span>學習電腦安全<span style='color:red'>？</span></p>
<p><span style='color:red'>如何</span>開始<span style='color:red'> 學習</span>資訊安全<span style='color:red'>？</span></p>
<p><span style='color:red'>如何</span>學習 java 等電腦語言<span style='color:red'>？</span></p>
<p>機器<span style='color:red'> 學習</span><span style='color:red'> 的</span>替代方法是什麼？</p>
<p><span style='color:red'>如何</span>在 Linux 中使用 C<span style='color:red'> 程式</span>建立新的 Terminal 和新的 shell<span style='color:red'> ？</span></p>
<p><span style='color:red'>如何</span>使用 C<span style='color:red'> 程式</span>語言在新的終端（Linux 終端）建立新的 shell<span style='color:red'>？</span></p>
<p>在海德拉巴<span style='color:red'> 開設</span>哪家公司比較好<span style='color:red'>?</span></p>
<p>在海得拉巴<span style='color:red'> 開設</span>哪家公司比較好<span style='color:red'>?</span></p>
<p>一個完全的新手需要哪些數學知識<span style='color:red'> 才能</span>理解電腦<span style='color:red'> 程式設計</span>的演算法<span style='color:red'> ？</span>有哪些有關演算法的書籍適合初學者<span style='color:red'>？</span></p>
<p><span style='color:red'>如何</span>讓生活適合您，並避免生活在精神上和情緒上<span style='color:red'>虐待</span>您<span style='color:red'>？</span></p>
<h3 id="Quick-Deploy" class="common-anchor-header">快速部署</h3><p>若要瞭解如何利用本教學開始線上示範，請參考<a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/tutorials/quickstart/apps/hybrid_demo_with_milvus">範例應用程式</a>。</p>
