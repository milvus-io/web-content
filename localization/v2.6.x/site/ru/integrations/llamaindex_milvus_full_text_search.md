---
id: llamaindex_milvus_full_text_search.md
title: Использование полнотекстового поиска с LlamaIndex и Milvus
related_key: LlamaIndex
summary: >-
  В этом руководстве вы узнаете, как с помощью LlamaIndex и Milvus создать
  систему RAG, использующую полнотекстовый поиск и гибридный поиск. Сначала мы
  реализуем только полнотекстовый поиск, а затем усовершенствуем его,
  интегрировав семантический поиск для получения более полных результатов.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="common-anchor-header">Использование полнотекстового поиска с LlamaIndex и Milvus<button data-href="#Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>Полнотекстовый поиск</strong> использует точное сопоставление ключевых слов, часто применяя такие алгоритмы, как BM25, для ранжирования документов по релевантности. В системах <strong>генерации с расширенным поиском (RAG)</strong> этот метод извлекает релевантный текст для улучшения ответов, сгенерированных ИИ.</p>
<p>В то же время <strong>семантический поиск</strong> интерпретирует контекстуальный смысл, чтобы предоставить более широкие результаты. Объединение обоих подходов создает <strong>гибридный поиск</strong>, который улучшает извлечение информации — особенно в тех случаях, когда одного метода недостаточно.</p>
<p>Благодаря подходу Sparse-BM25 <a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">в Milvus 2.5</a> исходный текст автоматически преобразуется в разреженные векторы. Это устраняет необходимость в ручном создании разреженных вложений и позволяет реализовать гибридную стратегию поиска, которая обеспечивает баланс между семантическим пониманием и релевантностью ключевых слов.</p>
<p>В этом руководстве вы узнаете, как использовать LlamaIndex и Milvus для создания системы RAG с помощью полнотекстового и гибридного поиска. Мы начнём с реализации только полнотекстового поиска, а затем усовершенствуем его, интегрировав семантический поиск для получения более полных результатов.</p>
<blockquote>
<p>Прежде чем приступить к изучению этого руководства, убедитесь, что вы знакомы с <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">полнотекстовым поиском</a> и <a href="https://milvus.io/docs/integrate_with_llamaindex.md">основами использования Milvus в LlamaIndex</a>.</p>
</blockquote>
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
    </button></h2><p><strong>Установка зависимостей</strong></p>
<p>Прежде чем приступить к работе, убедитесь, что у вас установлены следующие зависимости:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>Если вы используете Google Colab, возможно, вам потребуется <strong>перезапустить среду выполнения</strong> (перейдите в меню «Runtime» в верхней части интерфейса и выберите «Restart session» в раскрывающемся меню).</p>
</blockquote>
</div>
<p><strong>Настройте учетные записи</strong></p>
<p>В этом руководстве для встраивания текста и генерации ответов используется OpenAI. Вам необходимо подготовить <a href="https://platform.openai.com/api-keys">ключ API OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы использовать векторное хранилище Milvus, укажите адрес вашего сервера Milvus <code translate="no">URI</code> (и, по желанию, <code translate="no">TOKEN</code>). Чтобы запустить сервер Milvus, вы можете настроить его, следуя <a href="https://milvus.io/docs/install-overview.md">руководству по установке Milvus</a>, или просто воспользоваться бесплатной версией <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a>.</p>
<blockquote>
<p>Полнотекстовый поиск в настоящее время поддерживается в Milvus Standalone, Milvus Distributed и Zilliz Cloud, но пока не поддерживается в Milvus Lite (реализация запланирована на будущее). Для получения дополнительной информации обращайтесь по адресу support@zilliz.com.</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Загрузка примеров данных</strong></p>
<p>Выполните следующие команды, чтобы загрузить примеры документов в каталог «data/paul_graham»:</p>
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
<h2 id="RAG-with-Full-Text-Search" class="common-anchor-header">RAG с полнотекстовым поиском<button data-href="#RAG-with-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Интеграция полнотекстового поиска в систему RAG позволяет сбалансировать семантический поиск с точным и предсказуемым поиском по ключевым словам. Вы также можете использовать только полнотекстовый поиск, хотя для получения лучших результатов рекомендуется сочетать его с семантическим поиском. Здесь, в демонстрационных целях, мы покажем как полнотекстовый поиск отдельно, так и гибридный поиск.</p>
<p>Для начала воспользуйтесь командой ` <code translate="no">SimpleDirectoryReaderLoad</code> `, чтобы загрузить эссе Пола Грэма «What I Worked On»:</p>
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
<h3 id="Full-Text-Search-with-BM25" class="common-anchor-header">Полнотекстовый поиск с помощью BM25<button data-href="#Full-Text-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MilvusVectorStore</code> от LlamaIndex поддерживает полнотекстовый поиск, обеспечивая эффективный поиск по ключевым словам. Используя встроенную функцию <code translate="no">sparse_embedding_function</code>, он применяет алгоритм BM25 для ранжирования результатов поиска.</p>
<p>В этом разделе мы продемонстрируем, как реализовать систему RAG с использованием BM25 для полнотекстового поиска.</p>
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
<p>Приведённый выше код вставляет примеры документов в Milvus и создаёт индекс, позволяющий использовать ранжирование по алгоритму BM25 для полнотекстового поиска. Он отключает плотное вложение и использует <code translate="no">BM25BuiltInFunction</code> с параметрами по умолчанию.</p>
<p>Вы можете указать входные и выходные поля в параметрах <code translate="no">BM25BuiltInFunction</code>:</p>
<ul>
<li><code translate="no">input_field_names (str)</code>: Поле входного текста (по умолчанию: «text»). Оно указывает, к какому текстовому полю применяется алгоритм BM25. Измените это значение, если используете собственную коллекцию с другим именем текстового поля.</li>
<li><code translate="no">output_field_names (str)</code>: Поле, в котором хранятся результаты работы данной функции BM25 (по умолчанию: «sparse_embedding»).</li>
</ul>
<p>После настройки хранилища векторов вы можете выполнять полнотекстовые поисковые запросы с помощью Milvus в режиме запроса «sparse» или «text_search»:</p>
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
<h4 id="Customize-text-analyzer" class="common-anchor-header">Настройка текстового анализатора</h4><p>Анализаторы играют важную роль в полнотекстовом поиске, разбивая предложения на токены и выполняя лексическую обработку, такую как стемминг и удаление стоп-слов. Как правило, они зависят от конкретного языка. Более подробную информацию см. в <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Руководстве по анализаторам Milvus</a>.</p>
<p>Milvus поддерживает два типа анализаторов: <strong>встроенные</strong> и <strong>пользовательские</strong>. По умолчанию в режиме « <code translate="no">BM25BuiltInFunction</code> » используется стандартный встроенный анализатор, который разбивает текст на лексемы на основе знаков препинания.</p>
<p>Чтобы использовать другой анализатор или настроить существующий, можно передать значение в аргумент ` <code translate="no">analyzer_params</code> `:</p>
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
<h3 id="Hybrid-Search-with-Reranker" class="common-anchor-header">Гибридный поиск с реранкером<button data-href="#Hybrid-Search-with-Reranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Гибридная система поиска сочетает в себе семантический поиск и полнотекстовый поиск, оптимизируя производительность поиска в системе RAG.</p>
<p>В следующем примере для семантического поиска используется вложение OpenAI, а для полнотекстового поиска — алгоритм BM25:</p>
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
<p><strong>Как это работает</strong></p>
<p>При таком подходе документы хранятся в коллекции Milvus с обоими векторными полями:</p>
<ul>
<li><code translate="no">embedding</code>: плотные вложения, сгенерированные моделью вложений OpenAI для семантического поиска;</li>
<li><code translate="no">sparse_embedding</code>: Редкие вложения, вычисленные с помощью BM25BuiltInFunction для полнотекстового поиска.</li>
</ul>
<p>Кроме того, мы применили стратегию переранжирования с использованием «RRFRanker» с его параметрами по умолчанию. Чтобы настроить переранжировщик, вы можете сконфигурировать <code translate="no">hybrid_ranker</code> и <code translate="no">hybrid_ranker_params</code> в соответствии с <a href="https://milvus.io/docs/weighted-ranker.md">Руководством по переранжированию Milvus</a>.</p>
<p>Теперь давайте протестируем систему RAG с помощью примерного запроса:</p>
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
<p>Этот гибридный подход обеспечивает более точные и контекстно-зависимые ответы в системе RAG за счёт использования как семантического, так и ключевого поиска.</p>
