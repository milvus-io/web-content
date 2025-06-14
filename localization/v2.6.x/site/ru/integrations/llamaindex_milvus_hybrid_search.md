---
id: llamaindex_milvus_hybrid_search.md
title: RAG использует гибридный поиск с Milvus и LlamaIndex
related_key: LlamaIndex
summary: >-
  Этот блокнот демонстрирует, как использовать Milvus для гибридного поиска в
  конвейерах [LlamaIndex](https://www.llamaindex.ai/) RAG. Мы начнем с
  рекомендуемого по умолчанию гибридного поиска (семантический + BM25), а затем
  рассмотрим другие альтернативные методы разреженного встраивания и настройку
  гибридного реранкера.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="common-anchor-header">RAG использует гибридный поиск с Milvus и LlamaIndex<button data-href="#RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p>Гибридный поиск использует сильные стороны семантического поиска и подбора ключевых слов для получения более точных и контекстно релевантных результатов. Сочетая преимущества семантического поиска и подбора ключевых слов, гибридный поиск особенно эффективен в сложных задачах поиска информации.</p>
<p>В этом блокноте показано, как использовать Milvus для гибридного поиска в конвейерах <a href="https://www.llamaindex.ai/">LlamaIndex</a> RAG. Мы начнем с рекомендуемого по умолчанию гибридного поиска (семантический + BM25), а затем рассмотрим другие альтернативные методы разреженного встраивания и настройку гибридного реранкера.</p>
<h2 id="Prerequisites" class="common-anchor-header">Необходимые условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Установите зависимости</strong></p>
<p>Прежде чем приступить к работе, убедитесь, что у вас установлены следующие зависимости:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Если вы используете Google Colab, вам может потребоваться <strong>перезапустить среду выполнения</strong> (перейдите в меню "Runtime" в верхней части интерфейса и выберите "Restart session" из выпадающего меню).</p>
</div>
<p><strong>Настройка учетных записей</strong></p>
<p>В этом учебнике используется OpenAI для встраивания текста и генерации ответов. Вам необходимо подготовить <a href="https://platform.openai.com/api-keys">ключ API OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы использовать векторное хранилище Milvus, укажите свой сервер Milvus <code translate="no">URI</code> (и, по желанию, <code translate="no">TOKEN</code>). Запустить сервер Milvus можно, следуя <a href="https://milvus.io/docs/install-overview.md">руководству по установке Milvus</a> или просто бесплатно попробовав <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a>.</p>
<blockquote>
<p>Полнотекстовый поиск в настоящее время поддерживается в Milvus Standalone, Milvus Distributed и Zilliz Cloud, но пока не поддерживается в Milvus Lite (планируется к внедрению в будущем). За дополнительной информацией обращайтесь по адресу support@zilliz.com.</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Загрузка примеров данных</strong></p>
<p>Выполните следующие команды, чтобы загрузить примеры документов в каталог "data/paul_graham":</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>Затем используйте <code translate="no">SimpleDirectoryReaderLoad</code> для загрузки эссе "Над чем я работал" Пола Грэма:</p>
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
<h2 id="Hybrid-Search-with-BM25" class="common-anchor-header">Гибридный поиск с BM25<button data-href="#Hybrid-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе показано, как выполнить гибридный поиск с помощью BM25. Для начала мы инициализируем <code translate="no">MilvusVectorStore</code> и создадим индекс для документов примера. В конфигурации по умолчанию используются:</p>
<ul>
<li>Плотные вкрапления из модели вкраплений по умолчанию (OpenAI's <code translate="no">text-embedding-ada-002</code>).</li>
<li>BM25 для полнотекстового поиска, если enable_sparse равно True</li>
<li>RRFRanker с k=60 для объединения результатов, если включен гибридный поиск.</li>
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
<p>Вот более подробная информация об аргументах для настройки плотных и разреженных полей на сайте <code translate="no">MilvusVectorStore</code>:</p>
<p><strong>плотное поле</strong></p>
<ul>
<li><code translate="no">enable_dense (bool)</code>: Булевский флаг для включения или отключения плотного встраивания. По умолчанию - True.</li>
<li><code translate="no">dim (int, optional)</code>: Размерность векторов встраивания для коллекции.</li>
<li><code translate="no">embedding_field (str, optional)</code>: : Имя поля плотного встраивания для коллекции, по умолчанию DEFAULT_EMBEDDING_KEY.</li>
<li><code translate="no">index_config (dict, optional)</code>: Конфигурация, используемая для построения индекса плотного встраивания. По умолчанию - None.</li>
<li><code translate="no">search_config (dict, optional)</code>: Конфигурация, используемая для поиска в плотном индексе Milvus. Обратите внимание, что она должна быть совместима с типом индекса, указанным в <code translate="no">index_config</code>. По умолчанию - Нет.</li>
<li><code translate="no">similarity_metric (str, optional)</code>: Метрика сходства, используемая для плотного встраивания; в настоящее время поддерживаются IP, COSINE и L2.</li>
</ul>
<p><strong>поле sparse (разреженное)</strong></p>
<ul>
<li><code translate="no">enable_sparse (bool)</code>: Булевский флаг для включения или отключения плотного встраивания. По умолчанию False.</li>
<li><code translate="no">sparse_embedding_field (str)</code>: Имя поля разреженного встраивания, по умолчанию DEFAULT_SPARSE_EMBEDDING_KEY.</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>: Если enable_sparse равно True, этот объект должен быть предоставлен для преобразования текста в разреженную вставку. Если None, то будет использована функция разреженного вложения по умолчанию (BM25BuiltInFunction), или используйте BGEM3SparseEmbedding для существующей коллекции без встроенных функций.</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>: Конфигурация, используемая для построения индекса разреженного вложения. По умолчанию - None.</li>
</ul>
<p>Чтобы включить гибридный поиск на этапе запроса, установите <code translate="no">vector_store_query_mode</code> в значение "hybrid". Это позволит объединить и ранжировать результаты как семантического, так и полнотекстового поиска. Проверим на примере запроса: "Чему автор научился в Viaweb?":</p>
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
<h3 id="Customize-text-analyzer" class="common-anchor-header">Настройка анализатора текста</h3><p>Анализаторы играют важную роль в полнотекстовом поиске, разбивая предложения на лексемы и выполняя лексическую обработку, например, стемминг и удаление стоп-слов. Как правило, они зависят от конкретного языка. Для получения более подробной информации обратитесь к <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Руководству по анализаторам Milvus</a>.</p>
<p>Milvus поддерживает два типа анализаторов: <strong>Встроенные анализаторы</strong> и <strong>Пользовательские анализаторы</strong>. По умолчанию, если <code translate="no">enable_sparse</code> имеет значение True, <code translate="no">MilvusVectorStore</code> использует <code translate="no">BM25BuiltInFunction</code> с настройками по умолчанию, применяя стандартный встроенный анализатор, который токенизирует текст на основе пунктуации.</p>
<p>Чтобы использовать другой анализатор или настроить существующий, вы можете указать значения аргумента <code translate="no">analyzer_params</code> при построении <code translate="no">BM25BuiltInFunction</code>. Затем задайте эту функцию в качестве <code translate="no">sparse_embedding_function</code> в <code translate="no">MilvusVectorStore</code>.</p>
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
<h2 id="Hybrid-Search-with-Other-Sparse-Embedding" class="common-anchor-header">Гибридный поиск с другими разреженными вкраплениями<button data-href="#Hybrid-Search-with-Other-Sparse-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>Помимо сочетания семантического поиска с BM25, Milvus также поддерживает гибридный поиск с использованием функции разреженного вложения, такой как <a href="https://arxiv.org/abs/2402.03216">BGE-M3</a>. В следующем примере для генерации разреженных вкраплений используется встроенный <code translate="no">BGEM3SparseEmbeddingFunction</code>.</p>
<p>Сначала нам нужно установить пакет <code translate="no">FlagEmbedding</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -q FlagEmbedding</span>
<button class="copy-code-btn"></button></code></pre>
<p>Затем построим векторное хранилище и индекс, используя модель OpenAI по умолчанию для денситного вложения и встроенную функцию BGE-M3 для разреженного вложения:</p>
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
<p>Теперь выполним гибридный поисковый запрос с примером вопроса:</p>
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
<h3 id="Customize-Sparse-Embedding-Function" class="common-anchor-header">Настройка функции разреженного встраивания</h3><p>Вы также можете настроить функцию разреженного встраивания, если она наследует от <code translate="no">BaseSparseEmbeddingFunction</code>, включая следующие методы:</p>
<ul>
<li><code translate="no">encode_queries</code>: Этот метод преобразует тексты в список разреженных вкраплений для запросов.</li>
<li><code translate="no">encode_documents</code>: Этот метод преобразует текст в список разреженных вкраплений для документов.</li>
</ul>
<p>Выходные данные каждого метода должны соответствовать формату разреженного вкрапления, которое представляет собой список словарей. Каждый словарь должен иметь ключ (целое число), представляющий измерение, и соответствующее значение (float), представляющее величину вкрапления в этом измерении (например, {1: 0.5, 2: 0.3}).</p>
<p>Например, вот реализация пользовательской функции разреженного вложения с использованием BGE-M3:</p>
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
<h2 id="Customize-hybrid-reranker" class="common-anchor-header">Настройка гибридного реранкера<button data-href="#Customize-hybrid-reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus поддерживает два типа <a href="https://milvus.io/docs/weighted-ranker.md">стратегий ранжирования</a>: Reciprocal Rank Fusion (RRF) и Weighted Scoring. По умолчанию в гибридном поиске <code translate="no">MilvusVectorStore</code> используется RRF с k=60. Чтобы настроить гибридный ранжировщик, измените следующие параметры:</p>
<ul>
<li><code translate="no">hybrid_ranker (str)</code>: Определяет тип ранжировщика, используемого в гибридных поисковых запросах. В настоящее время поддерживаются только ["RRFRanker", "WeightedRanker"]. По умолчанию установлено значение "RRFRanker".</li>
<li><code translate="no">hybrid_ranker_params (dict, optional)</code>: Параметры конфигурации для гибридного ранжировщика. Структура этого словаря зависит от конкретного используемого ранжировщика:<ul>
<li>Для "RRFRanker" он должен включать:<ul>
<li>"k" (int): Параметр, используемый в Reciprocal Rank Fusion (RRF). Это значение используется для расчета ранговых оценок в рамках алгоритма RRF, который объединяет несколько стратегий ранжирования в одну оценку для улучшения релевантности поиска. Если значение не указано, по умолчанию оно равно 60.</li>
</ul></li>
<li>Для "WeightedRanker" ожидается:<ul>
<li>"weights" (список float): Список из ровно двух весов:<ol>
<li>Вес для компонента плотного вложения.</li>
<li>Эти веса используются для баланса значимости плотных и разреженных компонентов вкраплений в процессе гибридного поиска. Если вес не указан, то по умолчанию он равен [1.0, 1.0].</li>
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
