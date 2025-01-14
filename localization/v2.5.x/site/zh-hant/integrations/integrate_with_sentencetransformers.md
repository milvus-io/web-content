---
id: integrate_with_sentencetransformers.md
summary: 本頁討論如何使用 Milvus 搜尋電影
title: 使用 Milvus 和 SentenceTransformers 搜尋電影
---
<h1 id="Movie-Search-Using-Milvus-and-SentenceTransformers" class="common-anchor-header">使用 Milvus 和 SentenceTransformers 搜尋電影<button data-href="#Movie-Search-Using-Milvus-and-SentenceTransformers" class="anchor-icon" translate="no">
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
    </button></h1><p>在這個範例中，我們將使用 Milvus 和 SentenceTransformers 函式庫搜尋電影劇情摘要。我們要使用的資料集是 HuggingFace 上託管的<a href="https://huggingface.co/datasets/vishnupriyavr/wiki-movie-plots-with-summaries">Wikipedia Movie Plots with Summaries</a>。</p>
<p>讓我們開始吧！</p>
<h2 id="Required-Libraries" class="common-anchor-header">所需的函式庫<button data-href="#Required-Libraries" class="anchor-icon" translate="no">
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
    </button></h2><p>在這個範例中，我們將使用<code translate="no">pymilvus</code> 連線使用 Milvus，使用<code translate="no">sentence-transformers</code> 產生向量嵌入，使用<code translate="no">datasets</code> 下載範例資料集。</p>
<pre><code translate="no" class="language-shell">pip install pymilvus sentence-transformers datasets tqdm
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">FieldSchema</span>, <span class="hljs-title class_">CollectionSchema</span>, <span class="hljs-title class_">DataType</span>
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> <span class="hljs-title class_">SentenceTransformer</span>
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<button class="copy-code-btn"></button></code></pre>
<p>我們將定義一些全局參數、</p>
<pre><code translate="no" class="language-python">embedding_dim = <span class="hljs-number">384</span>
collection_name = <span class="hljs-string">&quot;movie_embeddings&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Downloading-and-Opening-the-Dataset" class="common-anchor-header">下載與開啟資料集<button data-href="#Downloading-and-Opening-the-Dataset" class="anchor-icon" translate="no">
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
    </button></h2><p>在單一行中，<code translate="no">datasets</code> 允許我們下載和開啟資料集。資料庫會在本機快取資料集，並在下次執行時使用該副本。每一行都包含一部電影的詳細資料，該電影附有一篇 Wikipedia 文章。我們使用<code translate="no">Title</code>,<code translate="no">PlotSummary</code>,<code translate="no">Release Year</code> 和<code translate="no">Origin/Ethnicity</code> 列。</p>
<pre><code translate="no" class="language-python">ds = load_dataset(<span class="hljs-string">&quot;vishnupriyavr/wiki-movie-plots-with-summaries&quot;</span>, <span class="hljs-built_in">split</span>=<span class="hljs-string">&quot;train&quot;</span>)
<span class="hljs-built_in">print</span>(ds)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-the-Database" class="common-anchor-header">連接至資料庫<button data-href="#Connecting-to-the-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>此時，我們要開始設定 Milvus。步驟如下：</p>
<ol>
<li>在本地檔案中建立一個 Milvus Lite 資料庫。(將此 URI 改為 Milvus Standalone 和 Milvus Distributed 的伺服器位址)。</li>
</ol>
<pre><code translate="no" class="language-python">client = <span class="hljs-title class_">MilvusClient</span>(uri=<span class="hljs-string">&quot;./sentence_transformers_example.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>建立資料模式。這將指定組成元素的欄位，包括向量嵌入的維度。</li>
</ol>
<pre><code translate="no" class="language-python">fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;title&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim),
    FieldSchema(name=<span class="hljs-string">&quot;year&quot;</span>, dtype=DataType.INT64),
    FieldSchema(name=<span class="hljs-string">&quot;origin&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">64</span>),
]

schema = CollectionSchema(fields=fields, enable_dynamic_field=<span class="hljs-literal">False</span>)
client.create_collection(collection_name=collection_name, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>定義向量搜尋索引演算法。Milvus Lite 支援 FLAT 索引類型，而 Milvus Standalone 和 Milvus Distributed 則實施多種方法，例如 IVF、HNSW 和 DiskANN。對於本範例中的小型資料，任何搜尋索引類型都已經足夠，因此我們在此使用最簡單的 FLAT 索引類型。</li>
</ol>
<pre><code translate="no" class="language-python">index_params = client.<span class="hljs-title function_">prepare_index_params</span>()
index_params.<span class="hljs-title function_">add_index</span>(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;IP&quot;</span>)
client.<span class="hljs-title function_">create_index</span>(collection_name, index_params)
<button class="copy-code-btn"></button></code></pre>
<p>完成這些步驟後，我們就可以將資料插入資料庫並執行搜尋。任何新增的資料都會自動建立索引，並立即可供搜尋。如果資料非常新，搜尋速度可能會較慢，因為會對仍在建立索引過程中的資料使用暴力搜尋。</p>
<h2 id="Inserting-the-Data" class="common-anchor-header">插入資料<button data-href="#Inserting-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>在這個範例中，我們要使用 SentenceTransformers miniLM 模型來建立繪圖文字的嵌入。這個模型會傳回 384 個維度的嵌入。</p>
<pre><code translate="no" class="language-python">model = <span class="hljs-title class_">SentenceTransformer</span>(<span class="hljs-string">&quot;all-MiniLM-L12-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>我們在資料的行上循環，嵌入圖面摘要欄位，並將實體插入向量資料庫。一般而言，您應該在成批的資料項目上執行此步驟，以最大化嵌入模型的 CPU 或 GPU 吞吐量，就像我們在這裡所做的一樣。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> batch in <span class="hljs-title function_">tqdm</span><span class="hljs-params">(ds.batch(batch_size=<span class="hljs-number">512</span>)</span>):
    embeddings = model.encode(batch[<span class="hljs-string">&quot;PlotSummary&quot;</span>])
    data = [
        {<span class="hljs-string">&quot;title&quot;</span>: title, <span class="hljs-string">&quot;embedding&quot;</span>: embedding, <span class="hljs-string">&quot;year&quot;</span>: year, <span class="hljs-string">&quot;origin&quot;</span>: origin}
        <span class="hljs-keyword">for</span> title, embedding, year, origin in <span class="hljs-title function_">zip</span><span class="hljs-params">(
            batch[<span class="hljs-string">&quot;Title&quot;</span>], embeddings, batch[<span class="hljs-string">&quot;Release Year&quot;</span>], batch[<span class="hljs-string">&quot;Origin/Ethnicity&quot;</span>]
        )</span>
    ]
    res = client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>上述操作相對耗時，因為嵌入需要時間。在 2023 MacBook Pro 上使用 CPU 執行此步驟約需 2 分鐘，使用專用 GPU 執行此步驟則會更快。休息一下，喝杯咖啡吧！</p>
</div>
<h2 id="Performing-the-Search" class="common-anchor-header">執行搜尋<button data-href="#Performing-the-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>將所有資料插入 Milvus 後，我們就可以開始執行搜尋。在這個範例中，我們要根據 Wikipedia 的劇情摘要搜尋電影。由於我們進行的是批次搜尋，因此搜尋時間會在電影搜尋中共享。(您能猜到我心目中根據查詢描述文字要檢索哪部電影嗎？)</p>
<pre><code translate="no" class="language-python">queries = [
    <span class="hljs-string">&#x27;A shark terrorizes an LA beach.&#x27;</span>,
    <span class="hljs-string">&#x27;An archaeologist searches for ancient artifacts while fighting Nazis.&#x27;</span>,
    <span class="hljs-string">&#x27;Teenagers in detention learn about themselves.&#x27;</span>,
    <span class="hljs-string">&#x27;A teenager fakes illness to get off school and have adventures with two friends.&#x27;</span>,
    <span class="hljs-string">&#x27;A young couple with a kid look after a hotel during winter and the husband goes insane.&#x27;</span>,
    <span class="hljs-string">&#x27;Four turtles fight bad guys.&#x27;</span>
    ]

<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_query</span>(<span class="hljs-params">data</span>):
    vectors = model.encode(data)
    <span class="hljs-keyword">return</span> [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> vectors]


query_vectors = embed_query(queries)

res = client.search(
    collection_name=collection_name,
    data=query_vectors,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;origin == &quot;American&quot; and year &gt; 1945 and year &lt; 2000&#x27;</span>,
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>],
)

<span class="hljs-keyword">for</span> idx, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(res):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, queries[idx])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>].get(<span class="hljs-string">&quot;title&quot;</span>), <span class="hljs-string">&quot;(&quot;</span>, <span class="hljs-built_in">round</span>(hit[<span class="hljs-string">&quot;distance&quot;</span>], <span class="hljs-number">2</span>), <span class="hljs-string">&quot;)&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>結果如下</p>
<pre><code translate="no" class="language-shell">Query: An archaeologist searches <span class="hljs-keyword">for</span> ancient artifacts <span class="hljs-keyword">while</span> fighting Nazis.
Results:
Love Slaves of the Amazons ( <span class="hljs-number">0.4</span> )
A Time to Love <span class="hljs-keyword">and</span> a Time to Die ( <span class="hljs-number">0.39</span> )
The Fifth Element ( <span class="hljs-number">0.39</span> )

Query: Teenagers <span class="hljs-keyword">in</span> detention learn about themselves.
Results:
The Breakfast Club ( <span class="hljs-number">0.54</span> )
Up the Academy ( <span class="hljs-number">0.46</span> )
Fame ( <span class="hljs-number">0.43</span> )

Query: A teenager fakes illness to get off school <span class="hljs-keyword">and</span> have adventures <span class="hljs-keyword">with</span> two friends.
Results:
Ferris Buelle<span class="hljs-string">r&#x27;s Day Off ( 0.48 )
Fever Lake ( 0.47 )
Losin&#x27;</span> It ( <span class="hljs-number">0.39</span> )

Query: A young couple <span class="hljs-keyword">with</span> a kid look after a hotel during winter <span class="hljs-keyword">and</span> the husband goes insane.
Results:
The Shining ( <span class="hljs-number">0.48</span> )
The Four Seasons ( <span class="hljs-number">0.42</span> )
Highball ( <span class="hljs-number">0.41</span> )

Query: Four turtles fight bad guys.
Results:
Teenage Mutant Ninja Turtles II: The Secret of the Ooze ( <span class="hljs-number">0.47</span> )
Devil May Hare ( <span class="hljs-number">0.43</span> )
Attack of the Giant Leeches ( <span class="hljs-number">0.42</span> )
<button class="copy-code-btn"></button></code></pre>
