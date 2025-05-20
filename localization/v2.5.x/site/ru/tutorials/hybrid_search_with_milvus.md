---
id: hybrid_search_with_milvus.md
summary: Гибридный поиск с Milvus
title: Гибридный поиск с Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hybrid_search_with_milvus.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hybrid_search_with_milvus.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<h1 id="Hybrid-Search-with-Milvus" class="common-anchor-header">Гибридный поиск с Milvus<button data-href="#Hybrid-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Если вы хотите увидеть окончательный эффект от этого урока, вы можете перейти по ссылке https://demos.milvus.io/hybrid-search/.</p>
<p><img translate="no" src="https://raw.githubusercontent.com/milvus-io/bootcamp/master/bootcamp/tutorials/quickstart/apps/hybrid_demo_with_milvus/pics/demo.png"/></p>
<p>В этом уроке мы покажем, как проводить гибридный поиск с помощью <a href="https://milvus.io/docs/multi-vector-search.md">Milvus</a> и <a href="https://github.com/FlagOpen/FlagEmbedding/tree/master/FlagEmbedding/BGE_M3">модели BGE-M3</a>. Модель BGE-M3 может преобразовывать текст в плотные и разреженные векторы. Milvus поддерживает хранение обоих типов векторов в одной коллекции, что позволяет осуществлять гибридный поиск, повышающий релевантность результатов.</p>
<p>Milvus поддерживает плотный, разреженный и гибридный методы поиска:</p>
<ul>
<li>Плотный поиск: Использует семантический контекст для понимания смысла запросов.</li>
<li>Разрозненный поиск: Упор делается на сопоставление ключевых слов для поиска результатов по определенным терминам, что эквивалентно полнотекстовому поиску.</li>
<li>Гибридный поиск: Сочетает в себе плотный и разреженный подходы, захватывая полный контекст и конкретные ключевые слова для получения исчерпывающих результатов поиска.</li>
</ul>
<p>Интегрируя эти методы, гибридный поиск Milvus уравновешивает семантическое и лексическое сходство, улучшая общую релевантность результатов поиска. В этом блокноте мы рассмотрим процесс настройки и использования этих стратегий поиска, подчеркнем их эффективность в различных сценариях поиска.</p>
<h3 id="Dependencies-and-Environment" class="common-anchor-header">Зависимости и окружение</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus <span class="hljs-string">&quot;pymilvus[model]&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Download-Dataset" class="common-anchor-header">Загрузить набор данных</h3><p>Для демонстрации поиска нам нужен корпус документов. Давайте воспользуемся набором данных Quora Duplicate Questions и поместим его в локальную директорию.</p>
<p>Источник набора данных: <a href="https://www.quora.com/q/quoradata/First-Quora-Dataset-Release-Question-Pairs">First Quora Dataset Release: Question Pairs</a></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Run this cell to download the dataset</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget http://qim.fs.quoracdn.net/quora_duplicate_questions.tsv</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Load-and-Prepare-Data" class="common-anchor-header">Загрузка и подготовка данных</h3><p>Мы загрузим набор данных и подготовим небольшой корпус для поиска.</p>
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
<h3 id="Use-BGE-M3-Model-for-Embeddings" class="common-anchor-header">Использование модели BGE-M3 для вкраплений</h3><p>Модель BGE-M3 может встраивать тексты в виде плотных и разреженных векторов.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction

ef = BGEM3EmbeddingFunction(use_fp16=<span class="hljs-literal">False</span>, device=<span class="hljs-string">&quot;cpu&quot;</span>)
dense_dim = ef.dim[<span class="hljs-string">&quot;dense&quot;</span>]

<span class="hljs-comment"># Generate embeddings using BGE-M3 model</span>
docs_embeddings = ef(docs)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 302473.85it/s]
Inference Embeddings: 100%|██████████| 32/32 [01:59&lt;00:00,  3.74s/it]
</code></pre>
<h3 id="Setup-Milvus-Collection-and-Index" class="common-anchor-header">Настройка коллекции и индекса Milvus</h3><p>Мы настроим коллекцию Milvus и создадим индексы для векторных полей.</p>
<div class="alert alert-info">
<ul>
<li>Задание uri локального файла, например "./milvus.db", является наиболее удобным методом, поскольку он автоматически использует <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> для хранения всех данных в этом файле.</li>
<li>Если у вас большой объем данных, скажем, более миллиона векторов, вы можете настроить более производительный сервер Milvus на <a href="https://milvus.io/docs/quickstart.md">Docker или Kubernetes</a>. В этом случае в качестве uri используйте ури сервера, например http://localhost:19530.</li>
<li>Если вы хотите использовать <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемый облачный сервис для Milvus, настройте uri и token, которые соответствуют <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">публичной конечной точке и ключу API</a> в Zilliz Cloud.</li>
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
<h3 id="Insert-Data-into-Milvus-Collection" class="common-anchor-header">Вставка данных в коллекцию Milvus</h3><p>Вставьте документы и их вкрапления в коллекцию.</p>
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
<h3 id="Enter-Your-Search-Query" class="common-anchor-header">Введите поисковый запрос</h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Enter your search query</span>
query = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Enter your search query: &quot;</span>)
<span class="hljs-built_in">print</span>(query)

<span class="hljs-comment"># Generate embeddings for the query</span>
query_embeddings = ef([query])
<span class="hljs-comment"># print(query_embeddings)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">How to start learning programming?
</code></pre>
<h3 id="Run-the-Search" class="common-anchor-header">Запуск поиска</h3><p>Сначала мы подготовим несколько полезных функций для запуска поиска:</p>
<ul>
<li><code translate="no">dense_search</code>: только поиск по плотному векторному полю</li>
<li><code translate="no">sparse_search</code>: поиск только по разреженному векторному полю</li>
<li><code translate="no">hybrid_search</code>: поиск по плотному и векторному полю с взвешенным реранкером</li>
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
<p>Запустим три разных поиска с заданными функциями:</p>
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
<h3 id="Display-Search-Results" class="common-anchor-header">Отображение результатов поиска</h3><p>Чтобы отобразить результаты плотного, разреженного и гибридного поиска, нам понадобятся утилиты для форматирования результатов.</p>
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
<p>Затем мы можем отобразить результаты поиска в виде текста с выделением:</p>
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
<p><strong>Результаты плотного поиска:</strong></p>
<p>Как лучше всего начать изучать робототехнику?</p>
<p>Как выучить такой компьютерный язык, как java?</p>
<p>Как начать изучать информационную безопасность?</p>
<p>Что такое программирование на Java? Как выучить язык программирования Java?</p>
<p>Как выучить компьютерную безопасность?</p>
<p>Как лучше всего начать заниматься робототехникой? Какая самая лучшая плата для разработки, чтобы я мог начать работать на ней?</p>
<p>Как научиться свободно говорить по-английски?</p>
<p>Каковы лучшие способы выучить французский язык?</p>
<p>Как сделать физику легкой для изучения?</p>
<p>Как подготовиться к UPSC?</p>
<p><strong>Результаты разреженного поиска:</strong></p>
<p>Что такое<span style='color:red'> программирование</span> на Java<span style='color:red'>?</span><span style='color:red'> Как</span> выучить язык программирования Java?</p>
<p>С чего лучше всего<span style='color:red'> начать изучение</span> робототехники<span style='color:red'>?</span></p>
<p>Что является альтернативой машинному<span style='color:red'> обучению?</span></p>
<p><span style='color:red'>Как</span> создать новый терминал и новую оболочку в Linux с помощью<span style='color:red'> программирования</span> на C<span style='color:red'>?</span></p>
<p><span style='color:red'>Как</span> создать новую оболочку в новом терминале с помощью<span style='color:red'> программирования</span> на C (терминал Linux)<span style='color:red'>?</span></p>
<p>Какой бизнес лучше<span style='color:red'> начать</span> в Хайдарабаде<span style='color:red'>?</span></p>
<p>Какой бизнес лучше<span style='color:red'> начать</span> в Хайдарабаде<span style='color:red'>?</span></p>
<p>Как лучше всего<span style='color:red'> начать</span> заниматься робототехникой<span style='color:red'>?</span> Какая самая лучшая плата для разработки, чтобы я мог<span style='color:red'> начать</span> работать на ней<span style='color:red'>?</span></p>
<p>Какая математика нужна новичку<span style='color:red'> для</span> понимания алгоритмов компьютерного<span style='color:red'> программирования?</span> Какие книги по алгоритмам подходят для новичков<span style='color:red'>?</span></p>
<p><span style='color:red'>Как</span> сделать так, чтобы жизнь устраивала вас и не позволяла издеваться <span style='color:red'>над</span> вами психически и эмоционально<span style='color:red'>?</span></p>
<p><strong>Результаты поиска по запросу Гибрид:</strong></p>
<p>Как лучше всего<span style='color:red'> начать</span> заниматься робототехникой<span style='color:red'>?</span> Какая плата лучше для разработки, чтобы я мог<span style='color:red'> начать</span> работать на ней<span style='color:red'>?</span></p>
<p>Что такое<span style='color:red'> программирование</span> на Java<span style='color:red'>?</span><span style='color:red'> Как</span> выучить язык программирования Java?</p>
<p>Как лучше всего<span style='color:red'> начать изучать</span> робототехнику<span style='color:red'>?</span></p>
<p><span style='color:red'>Как</span> подготовиться к UPSC<span style='color:red'>?</span></p>
<p><span style='color:red'>Как</span> сделать физику легкой<span style='color:red'> для</span> изучения<span style='color:red'>?</span></p>
<p>Каковы лучшие способы изучения французского языка<span style='color:red'>?</span></p>
<p><span style='color:red'>Как</span> научиться свободно говорить по-английски<span style='color:red'>?</span></p>
<p><span style='color:red'>Как</span> научиться компьютерной безопасности<span style='color:red'>?</span></p>
<p><span style='color:red'>Как</span> начать<span style='color:red'> изучать</span> информационную безопасность<span style='color:red'>?</span></p>
<p><span style='color:red'>Как</span> выучить такой компьютерный язык, как java<span style='color:red'>?</span></p>
<p>Что является альтернативой машинному<span style='color:red'> обучению?</span></p>
<p><span style='color:red'>Как</span> создать новый терминал и новую оболочку в Linux с помощью<span style='color:red'> программирования</span> на C<span style='color:red'>?</span></p>
<p><span style='color:red'>Как</span> создать новую оболочку в новом терминале с помощью<span style='color:red'> программирования</span> на C (терминал Linux)<span style='color:red'>?</span></p>
<p>Какой бизнес лучше<span style='color:red'> начать</span> в Хайдарабаде<span style='color:red'>?</span></p>
<p>Какой бизнес лучше<span style='color:red'> начать</span> в Хайдарабаде<span style='color:red'>?</span></p>
<p>Какая математика нужна новичку<span style='color:red'> для</span> понимания алгоритмов компьютерного<span style='color:red'> программирования?</span> Какие книги по алгоритмам подходят для начинающих<span style='color:red'>?</span></p>
<p><span style='color:red'>Как</span> сделать так, чтобы жизнь вас устраивала, и не дать жизни издеваться <span style='color:red'>над</span> вами психически и эмоционально<span style='color:red'>?</span></p>
<h3 id="Quick-Deploy" class="common-anchor-header">Быстрое развертывание</h3><p>Чтобы узнать, как запустить онлайн-демонстрацию с помощью этого учебника, пожалуйста, обратитесь к <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/tutorials/quickstart/apps/hybrid_demo_with_milvus">примеру приложения</a>.</p>
