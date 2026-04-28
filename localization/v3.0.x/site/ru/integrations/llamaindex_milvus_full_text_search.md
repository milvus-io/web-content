---
id: llamaindex_milvus_full_text_search.md
title: Использование полнотекстового поиска с LlamaIndex и Milvus
related_key: LlamaIndex
summary: >-
  В этом уроке вы узнаете, как использовать LlamaIndex и Milvus для создания
  системы RAG с использованием полнотекстового и гибридного поиска. Мы начнем с
  реализации только полнотекстового поиска, а затем расширим его, интегрировав
  семантический поиск для получения более полных результатов.
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
    </button></h1><p><strong>Полнотекстовый поиск</strong> использует точное соответствие ключевых слов, часто применяя алгоритмы типа BM25 для ранжирования документов по релевантности. В системах <strong>Retrieval-Augmented Generation (RAG)</strong> этот метод позволяет извлекать релевантный текст для улучшения ответов, генерируемых ИИ.</p>
<p>В то же время <strong>семантический поиск</strong> интерпретирует контекстное значение для получения более широких результатов. Сочетание обоих подходов позволяет создать <strong>гибридный поиск</strong>, который улучшает поиск информации - особенно в тех случаях, когда одного метода недостаточно.</p>
<p>Благодаря подходу Sparse-BM25 в <a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5</a> необработанный текст автоматически преобразуется в разреженные векторы. Это устраняет необходимость в ручном создании разреженных вкраплений и позволяет использовать гибридную стратегию поиска, которая позволяет сбалансировать семантическое понимание и релевантность ключевых слов.</p>
<p>В этом руководстве вы узнаете, как использовать LlamaIndex и Milvus для создания системы RAG с использованием полнотекстового и гибридного поиска. Мы начнем с реализации только полнотекстового поиска, а затем расширим его, интегрировав семантический поиск для получения более полных результатов.</p>
<blockquote>
<p>Прежде чем приступить к этому уроку, убедитесь, что вы знакомы с <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">полнотекстовым поиском</a> и <a href="https://milvus.io/docs/integrate_with_llamaindex.md">основами использования Milvus в LlamaIndex</a>.</p>
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
    </button></h2><p><strong>Установите зависимости</strong></p>
<p>Прежде чем приступить к работе, убедитесь, что у вас установлены следующие зависимости:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>Если вы используете Google Colab, вам может потребоваться <strong>перезапустить среду выполнения</strong> (перейдите в меню "Runtime" в верхней части интерфейса и выберите "Restart session" из выпадающего меню).</p>
</blockquote>
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
<p><strong>Загрузить примеры данных</strong></p>
<p>Выполните следующие команды, чтобы загрузить примеры документов в каталог "data/paul_graham":</p>
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
    </button></h2><p>Интеграция полнотекстового поиска в систему RAG позволяет сбалансировать семантический поиск с точным и предсказуемым поиском по ключевым словам. Вы также можете использовать только полнотекстовый поиск, хотя для получения лучших результатов рекомендуется сочетать полнотекстовый поиск с семантическим. Здесь в целях демонстрации мы покажем только полнотекстовый поиск и гибридный поиск.</p>
<p>Для начала воспользуйтесь сайтом <code translate="no">SimpleDirectoryReaderLoad</code>, чтобы загрузить эссе Пола Грэма "Над чем я работал":</p>
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
<h3 id="Full-Text-Search-with-BM25" class="common-anchor-header">Полнотекстовый поиск с BM25</h3><p>LlamaIndex's <code translate="no">MilvusVectorStore</code> поддерживает полнотекстовый поиск, обеспечивая эффективное извлечение информации на основе ключевых слов. Используя встроенную функцию <code translate="no">sparse_embedding_function</code>, он применяет скоринг BM25 для ранжирования результатов поиска.</p>
<p>В этом разделе мы покажем, как реализовать RAG-систему, использующую BM25 для полнотекстового поиска.</p>
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
<p>Приведенный выше код вставляет примеры документов в Milvus и строит индекс, чтобы включить ранжирование BM25 для полнотекстового поиска. Он отключает плотное встраивание и использует <code translate="no">BM25BuiltInFunction</code> с параметрами по умолчанию.</p>
<p>Вы можете указать поля ввода и вывода в параметрах <code translate="no">BM25BuiltInFunction</code>:</p>
<ul>
<li><code translate="no">input_field_names (str)</code>: Входное текстовое поле (по умолчанию: "text"). Оно указывает, к какому текстовому полю применяется алгоритм BM25. Измените это значение, если используете собственную коллекцию с другим именем текстового поля.</li>
<li><code translate="no">output_field_names (str)</code>: Поле, в котором хранятся выходы данной функции BM25 (по умолчанию: "sparse_embedding").</li>
</ul>
<p>После того как векторное хранилище настроено, вы можете выполнять полнотекстовые поисковые запросы с помощью Milvus с режимом запроса "sparse" или "text_search":</p>
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
<h4 id="Customize-text-analyzer" class="common-anchor-header">Настройка анализатора текста</h4><p>Анализаторы играют важную роль в полнотекстовом поиске, разбивая предложения на лексемы и выполняя лексическую обработку, например, стемминг и удаление стоп-слов. Как правило, они зависят от конкретного языка. Для получения более подробной информации обратитесь к <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Руководству по анализаторам Milvus</a>.</p>
<p>Milvus поддерживает два типа анализаторов: <strong>Встроенные анализаторы</strong> и <strong>Пользовательские анализаторы</strong>. По умолчанию на сайте <code translate="no">BM25BuiltInFunction</code> используется стандартный встроенный анализатор, который выполняет токенизацию текста на основе пунктуации.</p>
<p>Чтобы использовать другой анализатор или настроить существующий, вы можете передать значение аргументу <code translate="no">analyzer_params</code>:</p>
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
<h3 id="Hybrid-Search-with-Reranker" class="common-anchor-header">Гибридный поиск с реранкером</h3><p>Гибридная система поиска сочетает в себе семантический и полнотекстовый поиск, оптимизируя производительность поиска в системе RAG.</p>
<p>В следующем примере используется вставка OpenAI для семантического поиска и BM25 для полнотекстового поиска:</p>
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
<p>При этом подходе документы хранятся в коллекции Milvus с обоими векторными полями:</p>
<ul>
<li><code translate="no">embedding</code>: : Плотные вкрапления, сгенерированные моделью вкраплений OpenAI для семантического поиска.</li>
<li><code translate="no">sparse_embedding</code>: : разреженными вкраплениями, вычисленными с помощью BM25BuiltInFunction для полнотекстового поиска.</li>
</ul>
<p>Кроме того, мы применили стратегию ранжирования с помощью "RRFRanker" с параметрами по умолчанию. Чтобы настроить реранкер, вы можете сконфигурировать <code translate="no">hybrid_ranker</code> и <code translate="no">hybrid_ranker_params</code>, следуя <a href="https://milvus.io/docs/weighted-ranker.md">руководству Milvus Reranking Guide</a>.</p>
<p>Теперь давайте протестируем систему RAG на примере запроса:</p>
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
<p>Этот гибридный подход обеспечивает более точные, учитывающие контекст ответы в системе RAG за счет использования как семантического поиска, так и поиска по ключевым словам.</p>
