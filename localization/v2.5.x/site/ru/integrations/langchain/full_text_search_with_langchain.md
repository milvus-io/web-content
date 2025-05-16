---
id: full_text_search_with_langchain.md
summary: >-
  В этом уроке мы покажем, как использовать LangChain и Milvus для реализации
  полнотекстового поиска в вашем приложении.
title: Использование полнотекстового поиска с помощью LangChain и Milvus
---
<h1 id="Using-Full-Text-Search-with-LangChain-and-Milvus" class="common-anchor-header">Использование полнотекстового поиска с помощью LangChain и Milvus<button data-href="#Using-Full-Text-Search-with-LangChain-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/langchain/full_text_search_with_langchain.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/langchain/full_text_search_with_langchain.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p><a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">Полнотекстовый поиск</a> - это традиционный метод поиска документов по определенным ключевым словам или фразам в тексте. Он ранжирует результаты на основе оценки релевантности, рассчитанной с учетом таких факторов, как частота встречаемости терминов. В то время как семантический поиск лучше понимает смысл и контекст, полнотекстовый поиск превосходит его в точности подбора ключевых слов, что делает его полезным дополнением к семантическому поиску. Алгоритм BM25 широко используется для ранжирования в полнотекстовом поиске и играет ключевую роль в Retrieval-Augmented Generation (RAG).</p>
<p>В<a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5</a> реализованы встроенные возможности полнотекстового поиска с использованием BM25. Этот подход преобразует текст в разреженные векторы, которые представляют собой оценки BM25. Вы можете просто ввести необработанный текст, и Milvus автоматически сгенерирует и сохранит разреженные векторы, без необходимости ручной генерации разреженных вкраплений.</p>
<p>Интеграция LangChain с Milvus также добавила эту функцию, упростив процесс внедрения полнотекстового поиска в приложения RAG. Комбинируя полнотекстовый поиск с семантическим поиском с помощью плотных векторов, вы можете получить гибридный подход, который использует как семантический контекст из плотных вкраплений, так и точную релевантность ключевых слов из сопоставления слов. Такая интеграция повышает точность, релевантность и удобство работы с поисковыми системами.</p>
<p>В этом руководстве мы покажем, как использовать LangChain и Milvus для реализации полнотекстового поиска в вашем приложении.</p>
<div class="alert note">
<ul>
<li>В настоящее время полнотекстовый поиск доступен в Milvus Standalone, Milvus Distributed и Zilliz Cloud, хотя пока не поддерживается в Milvus Lite (в котором эта функция запланирована на будущее). За дополнительной информацией обращайтесь по адресу support@zilliz.com.</li>
<li>Прежде чем приступить к этому руководству, убедитесь, что вы имеете базовое представление о <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">полнотекстовом поиске</a> и <a href="https://milvus.io/docs/basic_usage_langchain.md">базовом использовании</a> интеграции LangChain Milvus.</li>
</ul>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Предварительные условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед запуском этого блокнота убедитесь, что у вас установлены следующие зависимости:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade --quiet  langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4 <span class="hljs-comment">#langchain-voyageai</span></span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Если вы используете Google Colab, то для включения только что установленных зависимостей вам может потребоваться <strong>перезапустить среду выполнения</strong> (нажмите на меню "Runtime" в верхней части экрана и выберите "Restart session" из выпадающего меню).</p>
</div>
<p>Мы будем использовать модели из OpenAI. Вам необходимо подготовить переменные окружения <code translate="no">OPENAI_API_KEY</code> из <a href="https://platform.openai.com/docs/quickstart">OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Укажите ваш сервер Milvus <code translate="no">URI</code> (и, по желанию, <code translate="no">TOKEN</code>). О том, как установить и запустить сервер Milvus, читайте в этом <a href="https://milvus.io/docs/install_standalone-docker-compose.md">руководстве</a>.</p>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = ...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Подготовьте несколько примеров документов:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

docs = [
    Document(page_content=<span class="hljs-string">&quot;I like this apple&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;fruit&quot;</span>}),
    Document(page_content=<span class="hljs-string">&quot;I like swimming&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;sport&quot;</span>}),
    Document(page_content=<span class="hljs-string">&quot;I like dogs&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;pets&quot;</span>}),
]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialization-with-BM25-Function" class="common-anchor-header">Инициализация с помощью функции BM25<button data-href="#Initialization-with-BM25-Function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Hybrid-Search" class="common-anchor-header">Гибридный поиск</h3><p>Для полнотекстового поиска Milvus VectorStore принимает параметр <code translate="no">builtin_function</code>. Через этот параметр вы можете передать экземпляр <code translate="no">BM25BuiltInFunction</code>. Это отличается от семантического поиска, который обычно передает плотные вкрапления в <code translate="no">VectorStore</code>,</p>
<p>Вот простой пример гибридного поиска в Milvus с использованием плотных вкраплений OpenAI для семантического поиска и BM25 для полнотекстового поиска:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus, BM25BuiltInFunction
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),
    <span class="hljs-comment"># `dense` is for OpenAI embeddings, `sparse` is the output field of BM25 function</span>
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>В приведенном выше коде мы определяем экземпляр <code translate="no">BM25BuiltInFunction</code> и передаем его объекту <code translate="no">Milvus</code>. <code translate="no">BM25BuiltInFunction</code> - это облегченный класс-обертка для <a href="https://milvus.io/docs/manage-collections.md#Function"><code translate="no">Function</code></a> в Milvus.</p>
<p>Вы можете указать поля ввода и вывода для этой функции в параметрах <code translate="no">BM25BuiltInFunction</code>:</p>
<ul>
<li><code translate="no">input_field_names</code> (str): Имя поля ввода, по умолчанию <code translate="no">text</code>. Оно указывает, какое поле эта функция считывает в качестве входного.</li>
<li><code translate="no">output_field_names</code> (str): Имя выходного поля, по умолчанию <code translate="no">sparse</code>. Указывает, в какое поле эта функция выводит результат вычислений.</li>
</ul>
<p>Обратите внимание, что в параметрах инициализации Milvus, упомянутых выше, мы также указываем <code translate="no">vector_field=[&quot;dense&quot;, &quot;sparse&quot;]</code>. Поскольку поле <code translate="no">sparse</code> принимается за выходное поле, определяемое полем <code translate="no">BM25BuiltInFunction</code>, другое поле <code translate="no">dense</code> будет автоматически назначено выходным полем OpenAIEmbeddings.</p>
<p>На практике, особенно при объединении нескольких вкраплений или функций, мы рекомендуем явно указывать поля ввода и вывода для каждой функции, чтобы избежать двусмысленности.</p>
<p>В следующем примере мы явно указываем поля ввода и вывода <code translate="no">BM25BuiltInFunction</code>, чтобы было понятно, для какого поля предназначена встроенная функция.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># from langchain_voyageai import VoyageAIEmbeddings</span>

embedding1 = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)
embedding2 = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-3-large&quot;</span>)
<span class="hljs-comment"># embedding2 = VoyageAIEmbeddings(model=&quot;voyage-3&quot;)  # You can also use embedding from other embedding model providers, e.g VoyageAIEmbeddings</span>


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=[embedding1, embedding2],
    builtin_function=BM25BuiltInFunction(
        input_field_names=<span class="hljs-string">&quot;text&quot;</span>, output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>
    ),
    text_field=<span class="hljs-string">&quot;text&quot;</span>,  <span class="hljs-comment"># `text` is the input field name of BM25BuiltInFunction</span>
    <span class="hljs-comment"># `sparse` is the output field name of BM25BuiltInFunction, and `dense1` and `dense2` are the output field names of embedding1 and embedding2</span>
    vector_field=[<span class="hljs-string">&quot;dense1&quot;</span>, <span class="hljs-string">&quot;dense2&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)

vectorstore.vector_fields
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['dense1', 'dense2', 'sparse']
</code></pre>
<p>В этом примере у нас есть три векторных поля. Из них <code translate="no">sparse</code> используется как выходное поле для <code translate="no">BM25BuiltInFunction</code>, а два других, <code translate="no">dense1</code> и <code translate="no">dense2</code>, автоматически назначаются выходными полями для двух моделей <code translate="no">OpenAIEmbeddings</code> (в соответствии с порядком).</p>
<p>Таким образом, вы можете определить несколько векторных полей и назначить им различные комбинации вкраплений или функций, чтобы реализовать гибридный поиск.</p>
<p>При выполнении гибридного поиска нам нужно только передать текст запроса и опционально задать параметры topK и reranker. Экземпляр <code translate="no">vectorstore</code> автоматически обработает векторные вкрапления и встроенные функции и, наконец, использует реранкер для уточнения результатов. Основные детали реализации процесса поиска скрыты от пользователя.</p>
<pre><code translate="no" class="language-python">vectorstore.similarity_search(
    <span class="hljs-string">&quot;Do I like apples?&quot;</span>, k=<span class="hljs-number">1</span>
)  <span class="hljs-comment"># , ranker_type=&quot;weighted&quot;, ranker_params={&quot;weights&quot;:[0.3, 0.3, 0.4]})</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'category': 'fruit', 'pk': 454646931479251897}, page_content='I like this apple')]
</code></pre>
<p>Для получения дополнительной информации о гибридном поиске вы можете обратиться к <a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">введению в гибридный поиск</a> и этому <a href="https://milvus.io/docs/milvus_hybrid_search_retriever.md">учебнику по гибридному поиску LangChain Milvus</a>.</p>
<h3 id="BM25-search-without-embedding" class="common-anchor-header">Поиск BM25 без встраивания</h3><p>Если вы хотите выполнять только полнотекстовый поиск с помощью функции BM25 без использования семантического поиска на основе встраивания, вы можете установить параметр встраивания на <code translate="no">None</code> и сохранить только <code translate="no">builtin_function</code>, указанный в качестве экземпляра функции BM25. Векторное поле имеет только "разреженное" поле. Например:</p>
<pre><code translate="no" class="language-python">vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=<span class="hljs-literal">None</span>,
    builtin_function=BM25BuiltInFunction(
        output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>,
    ),
    vector_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)

vectorstore.vector_fields
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['sparse']
</code></pre>
<h2 id="Customize-analyzer" class="common-anchor-header">Настроить анализатор<button data-href="#Customize-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Анализаторы играют важную роль в полнотекстовом поиске, разбивая предложение на лексемы и выполняя лексический анализ, например, стемминг и удаление стоп-слов. Анализаторы обычно зависят от конкретного языка. Вы можете обратиться к <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">этому руководству</a>, чтобы узнать больше об анализаторах в Milvus.</p>
<p>Milvus поддерживает два типа анализаторов: <strong>Встроенные анализаторы</strong> и <strong>Пользовательские анализаторы</strong>. По умолчанию на сайте <code translate="no">BM25BuiltInFunction</code> будет использоваться <a href="https://milvus.io/docs/standard-analyzer.md">стандартный встроенный анализатор</a>, который является самым базовым анализатором и выполняет токенизацию текста с пунктуацией.</p>
<p>Если вы хотите использовать другой анализатор или настроить его, вы можете передать параметр <code translate="no">analyzer_params</code> в инициализации <code translate="no">BM25BuiltInFunction</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params_custom = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter</span>
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},  <span class="hljs-comment"># Custom filter</span>
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},  <span class="hljs-comment"># Custom filter</span>
    ],
}


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(
        output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>,
        enable_match=<span class="hljs-literal">True</span>,
        analyzer_params=analyzer_params_custom,
    ),
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Мы можем взглянуть на схему коллекции Milvus и убедиться, что настроенный анализатор настроен правильно.</p>
<pre><code translate="no" class="language-python">vectorstore.col.schema
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'auto_id': True, 'description': '', 'fields': [{'name': 'text', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535, 'enable_match': True, 'enable_analyzer': True, 'analyzer_params': {'tokenizer': 'standard', 'filter': ['lowercase', {'type': 'length', 'max': 40}, {'type': 'stop', 'stop_words': ['of', 'to']}]}}}, {'name': 'pk', 'description': '', 'type': &lt;DataType.INT64: 5&gt;, 'is_primary': True, 'auto_id': True}, {'name': 'dense', 'description': '', 'type': &lt;DataType.FLOAT_VECTOR: 101&gt;, 'params': {'dim': 1536}}, {'name': 'sparse', 'description': '', 'type': &lt;DataType.SPARSE_FLOAT_VECTOR: 104&gt;, 'is_function_output': True}, {'name': 'category', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535}}], 'enable_dynamic_field': False, 'functions': [{'name': 'bm25_function_de368e79', 'description': '', 'type': &lt;FunctionType.BM25: 1&gt;, 'input_field_names': ['text'], 'output_field_names': ['sparse'], 'params': {}}]}
</code></pre>
<p>Более подробную информацию о концептах, например, <code translate="no">analyzer</code>, <code translate="no">tokenizer</code>, <code translate="no">filter</code>, <code translate="no">enable_match</code>, <code translate="no">analyzer_params</code>, можно найти в <a href="https://milvus.io/docs/analyzer-overview.md">документации к анализатору</a>.</p>
<h2 id="Using-Hybrid-Search-and-Reranking-in-RAG" class="common-anchor-header">Использование гибридного поиска и реранжирования в RAG<button data-href="#Using-Hybrid-Search-and-Reranking-in-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>Мы узнали, как использовать базовую встроенную функцию BM25 в LangChain и Milvus. Давайте представим оптимизированную реализацию RAG с гибридным поиском и реранжированием.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>На этой диаграмме показан процесс гибридного поиска и реранжирования, сочетающий BM25 для подбора ключевых слов и векторный поиск для семантического поиска. Результаты, полученные обоими методами, объединяются, ранжируются и передаются в LLM для генерации окончательного ответа.</p>
<p>Гибридный поиск балансирует между точностью и семантическим пониманием, повышая точность и устойчивость к различным запросам. Он извлекает кандидатов с помощью полнотекстового поиска BM25 и векторного поиска, обеспечивая семантический, контекстный и точный поиск.</p>
<p>Давайте начнем с примера.</p>
<h3 id="Prepare-the-data" class="common-anchor-header">Подготовка данных</h3><p>Мы используем Langchain WebBaseLoader для загрузки документов из веб-источников и разбиваем их на фрагменты с помощью RecursiveCharacterTextSplitter.</p>
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
<h3 id="Load-the-document-into-Milvus-vector-store" class="common-anchor-header">Загрузка документа в векторное хранилище Milvus</h3><p>Как и в предыдущем вступлении, мы инициализируем и загружаем подготовленные документы в векторное хранилище Milvus, которое содержит два векторных поля: <code translate="no">dense</code> - для вставки OpenAI и <code translate="no">sparse</code> - для функции BM25.</p>
<pre><code translate="no" class="language-python">vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-RAG-chain" class="common-anchor-header">Построение цепочки RAG</h3><p>Мы подготавливаем экземпляр LLM и подсказку, а затем объединяем их в RAG-конвейер с помощью языка выражений LangChain.</p>
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
<p>Используйте язык LCEL (LangChain Expression Language) для построения RAG-цепочки.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the RAG (Retrieval-Augmented Generation) chain for AI response generation</span>
rag_chain = (
    {<span class="hljs-string">&quot;context&quot;</span>: retriever | format_docs, <span class="hljs-string">&quot;question&quot;</span>: RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

<span class="hljs-comment"># rag_chain.get_graph().print_ascii()</span>
<button class="copy-code-btn"></button></code></pre>
<p>Вызовите цепочку RAG с определенным вопросом и получите ответ</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What is PAL and PoT?&quot;</span>
res = rag_chain.invoke(query)
res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'PAL (Program-aided Language models) and PoT (Program of Thoughts prompting) are approaches that involve using language models to generate programming language statements to solve natural language reasoning problems. This method offloads the solution step to a runtime, such as a Python interpreter, allowing for complex computation and reasoning to be handled externally. PAL and PoT rely on language models with strong coding skills to effectively generate and execute these programming statements.'
</code></pre>
<p>Поздравляем! Вы построили гибридную (плотный вектор + разреженная функция bm25) поисковую RAG-цепочку на базе Milvus и LangChain.</p>
