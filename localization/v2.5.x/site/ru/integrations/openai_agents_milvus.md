---
id: openai_agents_milvus.md
summary: >-
  В этом блокноте показано, как создать агента, который может запрашивать Milvus
  на естественном языке с помощью вызова функций. Мы объединим фреймворк OpenAI
  Agents с мощными возможностями векторного поиска Milvus, чтобы создать
  приятный опыт поиска.
title: 'Интеграция Milvus с агентами OpenAI: Пошаговое руководство'
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/openai_agents_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/openai_agents_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Milvus-Integration-with-OpenAI-Agents-A-Step-by-Step-Guide" class="common-anchor-header">Интеграция Milvus с агентами OpenAI: Пошаговое руководство<button data-href="#Milvus-Integration-with-OpenAI-Agents-A-Step-by-Step-Guide" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом блокноте показано, как создать агента, который может запрашивать Milvus на естественном языке с помощью вызова функций. Мы объединим фреймворк OpenAI Agents с мощными возможностями векторного поиска Milvus для создания удобного поиска.</p>
<h2 id="OpenAI-Agents" class="common-anchor-header">Агенты OpenAI<button data-href="#OpenAI-Agents" class="anchor-icon" translate="no">
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
    </button></h2><p>OpenAI Agents SDK позволяет создавать агентурные приложения ИИ в легком, простом в использовании пакете с очень небольшим количеством абстракций. Это готовый к производству апгрейд предыдущей экспериментальной разработки для агентов, Swarm. Agents SDK имеет очень небольшой набор примитивов:</p>
<ul>
<li>Агенты, которые представляют собой LLM, оснащенные инструкциями и инструментами.</li>
<li>Handoffs, которые позволяют агентам делегировать другим агентам выполнение определенных задач</li>
<li>Guardrails, которые позволяют проверять входные данные агентов.</li>
</ul>
<p>В сочетании с Python эти примитивы достаточно мощны, чтобы выразить сложные отношения между инструментами и агентами, и позволяют создавать реальные приложения без сложного обучения. Кроме того, SDK поставляется со встроенной трассировкой, которая позволяет визуализировать и отлаживать агентские потоки, а также оценивать их и даже настраивать модели для вашего приложения.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/openai-agent.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Milvus" class="common-anchor-header">Milvus<button data-href="#Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus - это высокопроизводительная и масштабируемая векторная база данных с открытым исходным кодом, которая эффективно работает в самых разных средах, от ноутбука до крупных распределенных систем. Она доступна как в виде программного обеспечения с открытым исходным кодом, так и в виде <a href="https://zilliz.com/">облачного предложения</a>.</p>
<h2 id="Setup-and-Dependencies" class="common-anchor-header">Настройка и зависимости<button data-href="#Setup-and-Dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>Сначала нам нужно настроить среду с необходимыми библиотеками и инициализировать asyncio для совместимости с Jupyter.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install openai pymilvus pydantic nest_asyncio</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Если вы используете Google Colab, то для включения только что установленных зависимостей вам может потребоваться <strong>перезапустить среду выполнения</strong> (нажмите на меню "Runtime" в верхней части экрана и выберите "Restart session" из выпадающего меню).</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> asyncio
<span class="hljs-keyword">import</span> nest_asyncio
<span class="hljs-keyword">from</span> dotenv <span class="hljs-keyword">import</span> load_dotenv

load_dotenv()

nest_asyncio.apply()
<button class="copy-code-btn"></button></code></pre>
<p>Мы будем использовать модели из OpenAI. Вам необходимо подготовить <a href="https://platform.openai.com/docs/quickstart">api ключ</a> <code translate="no">OPENAI_API_KEY</code> в качестве переменной окружения.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-Milvus-and-Creating-a-Schema" class="common-anchor-header">Подключение к Milvus и создание схемы<button data-href="#Connecting-to-Milvus-and-Creating-a-Schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Теперь мы подключимся к нашему экземпляру Milvus и создадим схему для нашей коллекции. Эта схема будет определять структуру наших данных, включая:</p>
<ul>
<li>поле ID в качестве первичного ключа</li>
<li>текстовое поле для хранения содержимого документа</li>
<li>Разреженное векторное поле для хранения вкраплений BM25.</li>
</ul>
<h3 id="Full-Text-Search-in-Milvus-25" class="common-anchor-header">Полнотекстовый поиск в Milvus 2.5</h3><ul>
<li>Единая система для векторного поиска и поиска по ключевым словам (единые API)</li>
<li>Встроенный алгоритм sparse-BM25 (аналогичен использованию Elasticsearch, но основан на векторах)</li>
<li>Нет необходимости вручную генерировать вкрапления для поиска по ключевым словам</li>
</ul>
<p><img translate="no" src="https://milvus.io/docs/v2.5.x/assets/full-text-search.png" width="70%" alt="img"></p>
<h2 id="Install-Milvus-with-Docker" class="common-anchor-header">Установка Milvus с помощью Docker<button data-href="#Install-Milvus-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Прежде чем запускать этот пример, убедитесь, что установили Milvus и запустили его с помощью Docker, посмотрите нашу документацию - https://milvus.io/docs/install_standalone-docker.md.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema()

<span class="hljs-comment"># Simple schema that handles both text and vectors</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>
)
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'auto_id': False, 'description': '', 'fields': [{'name': 'id', 'description': '', 'type': &lt;DataType.INT64: 5&gt;, 'is_primary': True, 'auto_id': True}, {'name': 'text', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 1000, 'enable_analyzer': True}}, {'name': 'sparse', 'description': '', 'type': &lt;DataType.SPARSE_FLOAT_VECTOR: 104&gt;}], 'enable_dynamic_field': False}
</code></pre>
<h2 id="Setting-Up-BM25-for-Full-Text-Search" class="common-anchor-header">Настройка BM25 для полнотекстового поиска<button data-href="#Setting-Up-BM25-for-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus поддерживает полнотекстовый поиск с помощью функций BM25. Здесь мы определяем функцию, которая будет автоматически преобразовывать наши текстовые данные в разреженные векторные представления, оптимизированные для текстового поиска.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function

<span class="hljs-comment"># Milvus handles tokenization and BM25 conversion</span>
bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>,  <span class="hljs-comment"># Function name</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Name of the VARCHAR field containing raw text data</span>
    output_field_names=[
        <span class="hljs-string">&quot;sparse&quot;</span>
    ],  <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings</span>
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'auto_id': False, 'description': '', 'fields': [{'name': 'id', 'description': '', 'type': &lt;DataType.INT64: 5&gt;, 'is_primary': True, 'auto_id': True}, {'name': 'text', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 1000, 'enable_analyzer': True}}, {'name': 'sparse', 'description': '', 'type': &lt;DataType.SPARSE_FLOAT_VECTOR: 104&gt;, 'is_function_output': True}], 'enable_dynamic_field': False, 'functions': [{'name': 'text_bm25_emb', 'description': '', 'type': &lt;FunctionType.BM25: 1&gt;, 'input_field_names': ['text'], 'output_field_names': ['sparse'], 'params': {}}]}
</code></pre>
<h2 id="Creating-the-Collection-and-Loading-Sample-Data" class="common-anchor-header">Создание коллекции и загрузка образцов данных<button data-href="#Creating-the-Collection-and-Loading-Sample-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Теперь мы создадим нашу коллекцию с параметрами схемы и индекса, а затем загрузим несколько примеров данных об информационном поиске и Milvus.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;BM25&quot;</span>)

<span class="hljs-keyword">if</span> client.has_collection(<span class="hljs-string">&quot;demo&quot;</span>):
    client.drop_collection(<span class="hljs-string">&quot;demo&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo&quot;</span>,
    schema=schema,
    index_params=index_params,
)

<span class="hljs-comment">## 3. Loading Test Data</span>
client.insert(
    <span class="hljs-string">&quot;demo&quot;</span>,
    [
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Information retrieval helps users find relevant documents in large datasets.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Search engines use information retrieval techniques to index and rank web pages.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;The core of IR is matching user queries with the most relevant content.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Vector search is revolutionising modern information retrieval systems.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Machine learning improves ranking algorithms in information retrieval.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;IR techniques include keyword-based search, semantic search, and vector search.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Boolean retrieval is one of the earliest information retrieval methods.&quot;</span>
        },
        {<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;TF-IDF is a classic method used to score document relevance in IR.&quot;</span>},
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Modern IR systems integrate deep learning for better contextual understanding.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Milvus is an open-source vector database designed for AI-powered search.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Milvus enables fast and scalable similarity search on high-dimensional data.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;With Milvus, developers can build applications that support image, text, and video retrieval.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Milvus integrates well with deep learning frameworks like PyTorch and TensorFlow.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;The core of Milvus is optimised for approximate nearest neighbour (ANN) search.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Milvus supports hybrid search combining structured and unstructured data.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Large-scale AI applications rely on Milvus for efficient vector retrieval.&quot;</span>
        },
        {<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Milvus makes it easy to perform high-speed similarity searches.&quot;</span>},
        {<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Cloud-native by design, Milvus scales effortlessly with demand.&quot;</span>},
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Milvus powers applications in recommendation systems, fraud detection, and genomics.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;The latest version of Milvus introduces faster indexing and lower latency.&quot;</span>
        },
        {<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Milvus supports HNSW, IVF_FLAT, and other popular ANN algorithms.&quot;</span>},
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Vector embeddings from models like OpenAI’s CLIP can be indexed in Milvus.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Milvus has built-in support for multi-tenancy in enterprise use cases.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;The Milvus community actively contributes to improving its performance.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Milvus integrates with data pipelines like Apache Kafka for real-time updates.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Using Milvus, companies can enhance search experiences with vector search.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Milvus plays a crucial role in powering AI search in medical research.&quot;</span>
        },
        {<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Milvus integrates with LangChain for advanced RAG pipelines.&quot;</span>},
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Open-source contributors continue to enhance Milvus’ search performance.&quot;</span>
        },
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Multi-modal search in Milvus enables applications beyond text and images.&quot;</span>
        },
        {<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Milvus has an intuitive REST API for easy integration.&quot;</span>},
        {<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Milvus’ FAISS and HNSW backends provide flexibility in indexing.&quot;</span>},
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;The architecture of Milvus ensures fault tolerance and high availability.&quot;</span>
        },
        {<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Milvus integrates seamlessly with LLM-based applications.&quot;</span>},
        {<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Startups leverage Milvus to build next-gen AI-powered products.&quot;</span>},
        {<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Milvus Cloud offers a managed solution for vector search at scale.&quot;</span>},
        {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;The future of AI search is being shaped by Milvus and similar vector databases.&quot;</span>
        },
    ],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'insert_count': 37, 'ids': [456486814660619140, 456486814660619141, 456486814660619142, 456486814660619143, 456486814660619144, 456486814660619145, 456486814660619146, 456486814660619147, 456486814660619148, 456486814660619149, 456486814660619150, 456486814660619151, 456486814660619152, 456486814660619153, 456486814660619154, 456486814660619155, 456486814660619156, 456486814660619157, 456486814660619158, 456486814660619159, 456486814660619160, 456486814660619161, 456486814660619162, 456486814660619163, 456486814660619164, 456486814660619165, 456486814660619166, 456486814660619167, 456486814660619168, 456486814660619169, 456486814660619170, 456486814660619171, 456486814660619172, 456486814660619173, 456486814660619174, 456486814660619175, 456486814660619176], 'cost': 0}
</code></pre>
<h2 id="Defining-Output-Types-for-Structured-Results" class="common-anchor-header">Определение типов вывода для структурированных результатов<button data-href="#Defining-Output-Types-for-Structured-Results" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы сделать результаты поиска более структурированными и удобными для работы, мы определим модели Pydantic, которые определят формат результатов поиска.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pydantic <span class="hljs-keyword">import</span> BaseModel


<span class="hljs-comment"># Simplified output model for search results</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">MilvusSearchResult</span>(<span class="hljs-title class_ inherited__">BaseModel</span>):
    <span class="hljs-built_in">id</span>: <span class="hljs-built_in">int</span>
    text: <span class="hljs-built_in">str</span>


<span class="hljs-keyword">class</span> <span class="hljs-title class_">MilvusSearchResults</span>(<span class="hljs-title class_ inherited__">BaseModel</span>):
    results: <span class="hljs-built_in">list</span>[MilvusSearchResult]
    query: <span class="hljs-built_in">str</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Creating-a-Custom-Search-Tool" class="common-anchor-header">Создание пользовательского инструмента поиска<button data-href="#Creating-a-Custom-Search-Tool" class="anchor-icon" translate="no">
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
    </button></h2><p>Далее мы создадим пользовательский функциональный инструмент, который наш агент сможет использовать для поиска в базе данных Milvus. Этот инструмент будет:</p>
<ol>
<li>Принимать имя коллекции, текст запроса и параметр ограничения</li>
<li>Выполнять поиск BM25 по коллекции Milvus</li>
<li>Возвращать результаты в структурированном формате.</li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">Any</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> agents <span class="hljs-keyword">import</span> function_tool, RunContextWrapper


<span class="hljs-meta">@function_tool</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">search_milvus_text</span>(<span class="hljs-params">
    ctx: RunContextWrapper[<span class="hljs-type">Any</span>], collection_name: <span class="hljs-built_in">str</span>, query_text: <span class="hljs-built_in">str</span>, limit: <span class="hljs-built_in">int</span>
</span>) -&gt; <span class="hljs-built_in">str</span>:
    <span class="hljs-string">&quot;&quot;&quot;Search for text documents in a Milvus collection using full text search.

    Args:
        collection_name: Name of the Milvus collection to search.
        query_text: The text query to search for.
        limit: Maximum number of results to return.
    &quot;&quot;&quot;</span>
    <span class="hljs-keyword">try</span>:
        <span class="hljs-comment"># Initialize Milvus client</span>
        client = MilvusClient()

        <span class="hljs-comment"># Prepare search parameters for BM25</span>
        search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}}

        <span class="hljs-comment"># Execute search with text query</span>
        results = client.search(
            collection_name=collection_name,
            data=[query_text],
            anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,
            limit=limit,
            search_params=search_params,
            output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
        )
        <span class="hljs-keyword">return</span> json.dumps(
            {<span class="hljs-string">&quot;results&quot;</span>: results, <span class="hljs-string">&quot;query&quot;</span>: query_text, <span class="hljs-string">&quot;collection&quot;</span>: collection_name}
        )

    <span class="hljs-keyword">except</span> Exception <span class="hljs-keyword">as</span> e:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Exception is: <span class="hljs-subst">{e}</span>&quot;</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;Error searching Milvus: <span class="hljs-subst">{<span class="hljs-built_in">str</span>(e)}</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Building-the-Agent" class="common-anchor-header">Создание агента<button data-href="#Building-the-Agent" class="anchor-icon" translate="no">
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
    </button></h2><p>Теперь мы создадим агента, который сможет использовать наш инструмент поиска. Мы дадим ему инструкции по обработке поисковых запросов и укажем, что он должен возвращать результаты в нашем структурированном формате.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> agents <span class="hljs-keyword">import</span> Agent, Runner, WebSearchTool, trace


<span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">main</span>():
    agent = Agent(
        name=<span class="hljs-string">&quot;Milvus Searcher&quot;</span>,
        instructions=<span class="hljs-string">&quot;&quot;&quot;
        You are a helpful agent that can search through Milvus vector database using full text search. Return the results in a structured format.
        &quot;&quot;&quot;</span>,
        tools=[
            WebSearchTool(user_location={<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;approximate&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;New York&quot;</span>}),
            search_milvus_text,
        ],
        output_type=MilvusSearchResults,
    )

    <span class="hljs-keyword">with</span> trace(<span class="hljs-string">&quot;Milvus search example&quot;</span>):
        result = <span class="hljs-keyword">await</span> Runner.run(
            agent,
            <span class="hljs-string">&quot;Find documents in the &#x27;demo&#x27; collection that are similar to this concept: &#x27;information retrieval&#x27;&quot;</span>,
        )
        <span class="hljs-comment"># print(result.final_output.results)</span>
        formatted_results = <span class="hljs-string">&quot;\n&quot;</span>.join(
            <span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. ID: <span class="hljs-subst">{res.<span class="hljs-built_in">id</span>}</span>, Text: <span class="hljs-subst">{res.text}</span>&quot;</span>
            <span class="hljs-keyword">for</span> i, res <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(result.final_output.results)
        )
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Search results:\n<span class="hljs-subst">{formatted_results}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">asyncio.run(main())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Search results:
1. ID: 456486814660619146, Text: Boolean retrieval is one of the earliest information retrieval methods.
2. ID: 456486814660619144, Text: Machine learning improves ranking algorithms in information retrieval.
3. ID: 456486814660619143, Text: Vector search is revolutionising modern information retrieval systems.
4. ID: 456486814660619140, Text: Information retrieval helps users find relevant documents in large datasets.
5. ID: 456486814660619141, Text: Search engines use information retrieval techniques to index and rank web pages.
</code></pre>
