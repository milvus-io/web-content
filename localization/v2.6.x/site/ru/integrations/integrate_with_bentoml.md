---
id: integrate_with_bentoml.md
summary: >-
  В этом руководстве показано, как использовать открытую модель встраивания и
  крупноязычную модель на BentoCloud с векторной базой данных Milvus для
  создания приложения Retrieval Augmented Generation (RAG).
title: Генерация с дополнением к поиску (RAG) с помощью Milvus и BentoML
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-BentoML" class="common-anchor-header">Генерация с дополнением к поиску (RAG) с помощью Milvus и BentoML<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-BentoML" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_bentoml.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_bentoml.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<h2 id="Introduction" class="common-anchor-header">Введение<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом руководстве показано, как использовать открытую модель встраивания и крупноязычную модель на BentoCloud с векторной базой данных Milvus для создания приложения RAG (Retrieval Augmented Generation). BentoCloud - это платформа AI Inference Platform для быстро развивающихся команд ИИ, предлагающая полностью управляемую инфраструктуру, предназначенную для вывода моделей. Она работает в сочетании с BentoML, фреймворком для обслуживания моделей с открытым исходным кодом, чтобы облегчить создание и развертывание высокопроизводительных модельных сервисов. В этой демонстрации мы используем Milvus Lite в качестве базы данных векторов - это облегченная версия Milvus, которая может быть встроена в ваше приложение на Python.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Прежде чем начать<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite доступен на PyPI. Вы можете установить его через pip для Python 3.8+:</p>
<pre><code translate="no" class="language-python">$ pip install -U pymilvus milvus-lite bentoml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Если вы используете Google Colab, для включения только что установленных зависимостей вам может потребоваться <strong>перезапустить среду выполнения</strong> (нажмите на меню "Runtime" в верхней части экрана и выберите "Restart session" из выпадающего меню).</p>
</div>
<p>После входа в BentoCloud мы можем взаимодействовать с развернутыми сервисами BentoCloud Services в Deployments, а соответствующий END_POINT и API находятся в Playground -&gt; Python. Данные о городе можно скачать <a href="https://github.com/ytang07/bento_octo_milvus_RAG/tree/main/data">здесь</a>.</p>
<h2 id="Serving-Embeddings-with-BentoMLBentoCloud" class="common-anchor-header">Обслуживание вкраплений с помощью BentoML/BentoCloud<button data-href="#Serving-Embeddings-with-BentoMLBentoCloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы использовать эту конечную точку, импортируйте <code translate="no">bentoml</code> и настройте HTTP-клиент, используя <code translate="no">SyncHTTPClient</code>, указав конечную точку и, опционально, токен (если вы включите <code translate="no">Endpoint Authorization</code> в BentoCloud). В качестве альтернативы можно использовать ту же модель, обслуживаемую через BentoML, используя его репозиторий <a href="https://github.com/bentoml/BentoSentenceTransformers">Sentence Transformers Embeddings</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> bentoml

BENTO_EMBEDDING_MODEL_END_POINT = <span class="hljs-string">&quot;BENTO_EMBEDDING_MODEL_END_POINT&quot;</span>
BENTO_API_TOKEN = <span class="hljs-string">&quot;BENTO_API_TOKEN&quot;</span>

embedding_client = bentoml.SyncHTTPClient(
    BENTO_EMBEDDING_MODEL_END_POINT, token=BENTO_API_TOKEN
)
<button class="copy-code-btn"></button></code></pre>
<p>После подключения к embedding_client нам нужно обработать наши данные. Мы предоставили несколько функций для выполнения разбиения и встраивания данных.</p>
<p>Чтение файлов и предварительная обработка текста в список строк.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># naively chunk on newlines</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">chunk_text</span>(<span class="hljs-params">filename: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">list</span>:
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(filename, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> f:
        text = f.read()
    sentences = text.split(<span class="hljs-string">&quot;\n&quot;</span>)
    <span class="hljs-keyword">return</span> sentences
<button class="copy-code-btn"></button></code></pre>
<p>Сначала нам нужно загрузить данные о городе.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> requests
<span class="hljs-keyword">import</span> urllib.request

<span class="hljs-comment"># set up the data source</span>
repo = <span class="hljs-string">&quot;ytang07/bento_octo_milvus_RAG&quot;</span>
directory = <span class="hljs-string">&quot;data&quot;</span>
save_dir = <span class="hljs-string">&quot;./city_data&quot;</span>
api_url = <span class="hljs-string">f&quot;https://api.github.com/repos/<span class="hljs-subst">{repo}</span>/contents/<span class="hljs-subst">{directory}</span>&quot;</span>


response = requests.get(api_url)
data = response.json()

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> os.path.exists(save_dir):
    os.makedirs(save_dir)

<span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> data:
    <span class="hljs-keyword">if</span> item[<span class="hljs-string">&quot;type&quot;</span>] == <span class="hljs-string">&quot;file&quot;</span>:
        file_url = item[<span class="hljs-string">&quot;download_url&quot;</span>]
        file_path = os.path.join(save_dir, item[<span class="hljs-string">&quot;name&quot;</span>])
        urllib.request.urlretrieve(file_url, file_path)
<button class="copy-code-btn"></button></code></pre>
<p>Затем мы обработаем каждый из имеющихся файлов.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># please upload your data directory under this file&#x27;s folder</span>
cities = os.listdir(<span class="hljs-string">&quot;city_data&quot;</span>)
<span class="hljs-comment"># store chunked text for each of the cities in a list of dicts</span>
city_chunks = []
<span class="hljs-keyword">for</span> city <span class="hljs-keyword">in</span> cities:
    chunked = chunk_text(<span class="hljs-string">f&quot;city_data/<span class="hljs-subst">{city}</span>&quot;</span>)
    cleaned = []
    <span class="hljs-keyword">for</span> chunk <span class="hljs-keyword">in</span> chunked:
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(chunk) &gt; <span class="hljs-number">7</span>:
            cleaned.append(chunk)
    mapped = {<span class="hljs-string">&quot;city_name&quot;</span>: city.split(<span class="hljs-string">&quot;.&quot;</span>)[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;chunks&quot;</span>: cleaned}
    city_chunks.append(mapped)
<button class="copy-code-btn"></button></code></pre>
<p>Разбивает список строк на список вкраплений, в каждом из которых сгруппировано 25 текстовых строк.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">get_embeddings</span>(<span class="hljs-params">texts: <span class="hljs-built_in">list</span></span>) -&gt; <span class="hljs-built_in">list</span>:
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(texts) &gt; <span class="hljs-number">25</span>:
        splits = [texts[x : x + <span class="hljs-number">25</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(texts), <span class="hljs-number">25</span>)]
        embeddings = []
        <span class="hljs-keyword">for</span> split <span class="hljs-keyword">in</span> splits:
            embedding_split = embedding_client.encode(sentences=split)
            embeddings += embedding_split
        <span class="hljs-keyword">return</span> embeddings
    <span class="hljs-keyword">return</span> embedding_client.encode(
        sentences=texts,
    )
<button class="copy-code-btn"></button></code></pre>
<p>Теперь нам нужно сопоставить вкрапления и текстовые фрагменты. Поскольку список вкраплений и список предложений должны совпадать по индексу, мы можем пройтись по <code translate="no">enumerate</code> по любому из этих списков, чтобы сопоставить их.</p>
<pre><code translate="no" class="language-python">entries = []
<span class="hljs-keyword">for</span> city_dict <span class="hljs-keyword">in</span> city_chunks:
    <span class="hljs-comment"># No need for the embeddings list if get_embeddings already returns a list of lists</span>
    embedding_list = get_embeddings(city_dict[<span class="hljs-string">&quot;chunks&quot;</span>])  <span class="hljs-comment"># returns a list of lists</span>
    <span class="hljs-comment"># Now match texts with embeddings and city name</span>
    <span class="hljs-keyword">for</span> i, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(embedding_list):
        entry = {
            <span class="hljs-string">&quot;embedding&quot;</span>: embedding,
            <span class="hljs-string">&quot;sentence&quot;</span>: city_dict[<span class="hljs-string">&quot;chunks&quot;</span>][
                i
            ],  <span class="hljs-comment"># Assume &quot;chunks&quot; has the corresponding texts for the embeddings</span>
            <span class="hljs-string">&quot;city&quot;</span>: city_dict[<span class="hljs-string">&quot;city_name&quot;</span>],
        }
        entries.append(entry)
    <span class="hljs-built_in">print</span>(entries)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Inserting-Data-into-a-Vector-Database-for-Retrieval" class="common-anchor-header">Вставка данных в векторную базу данных для извлечения<button data-href="#Inserting-Data-into-a-Vector-Database-for-Retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>Подготовив вкрапления и данные, мы можем вставить векторы вместе с метаданными в Milvus Lite для последующего поиска векторов. Первый шаг в этом разделе - запуск клиента для подключения к Milvus Lite. Мы просто импортируем модуль <code translate="no">MilvusClient</code> и инициализируем клиент Milvus Lite, который подключается к вашей векторной базе данных Milvus Lite. Размерность определяется размером модели встраивания, например, модель Sentence Transformer <code translate="no">all-MiniLM-L6-v2</code> создает векторы размером 384.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

COLLECTION_NAME = <span class="hljs-string">&quot;Bento_Milvus_RAG&quot;</span>  <span class="hljs-comment"># random name for your collection</span>
DIMENSION = <span class="hljs-number">384</span>

<span class="hljs-comment"># Initialize a Milvus Lite client</span>
milvus_client = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Что касается аргумента <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Установка <code translate="no">uri</code> в качестве локального файла, например,<code translate="no">./milvus.db</code>, является наиболее удобным методом, так как он автоматически использует <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> для хранения всех данных в этом файле.</li>
<li>Если у вас большой объем данных, вы можете настроить более производительный сервер Milvus на <a href="https://milvus.io/docs/quickstart.md">docker или kubernetes</a>. В этом случае используйте ури сервера, например<code translate="no">http://localhost:19530</code>, в качестве <code translate="no">uri</code>.</li>
<li>Если вы хотите использовать <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемый облачный сервис для Milvus, измените <code translate="no">uri</code> и <code translate="no">token</code>, которые соответствуют <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">публичной конечной точке и ключу Api</a> в Zilliz Cloud.</li>
</ul>
</div>
<p>Или с помощью старого API connections.connect (не рекомендуется):</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections

connections.connect(uri=<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Creating-Your-Milvus-Lite-Collection" class="common-anchor-header">Создание коллекции Milvus Lite<button data-href="#Creating-Your-Milvus-Lite-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Создание коллекции с помощью Milvus Lite включает в себя два этапа: во-первых, определение схемы, а во-вторых, определение индекса. Для этого раздела нам понадобится один модуль: DataType, который указывает нам, какой тип данных будет находиться в поле. Также нам понадобятся две функции для создания схемы и добавления полей. create_schema(): создает схему коллекции, add_field(): добавляет поле в схему коллекции.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Collection

<span class="hljs-comment"># Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># 3.2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=DIMENSION)
<button class="copy-code-btn"></button></code></pre>
<p>Теперь, когда мы создали схему и успешно определили поле данных, нам нужно определить индекс. С точки зрения поиска, "индекс" определяет, как мы собираемся отображать наши данные для поиска. Для этого проекта мы используем стандартный вариант <a href="https://docs.zilliz.com/docs/autoindex-explained">AUTOINDEX</a> для индексации данных.</p>
<p>Далее мы создаем коллекцию с заданными ранее именем, схемой и индексом. Наконец, мы вставляем обработанные ранее данные.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># prepare index parameters</span>
index_params = milvus_client.prepare_index_params()

<span class="hljs-comment"># add index</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># use autoindex instead of other complex indexing method</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,  <span class="hljs-comment"># L2, COSINE, or IP</span>
)

<span class="hljs-comment"># create collection</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(
    collection_name=COLLECTION_NAME, schema=schema, index_params=index_params
)

<span class="hljs-comment"># Outside the loop, now you upsert all the entries at once</span>
milvus_client.insert(collection_name=COLLECTION_NAME, data=entries)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-Your-LLM-for-RAG" class="common-anchor-header">Настройка LLM для RAG<button data-href="#Set-up-Your-LLM-for-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы создать приложение RAG, нам нужно развернуть LLM на BentoCloud. Давайте воспользуемся последней версией Llama3 LLM. Как только он будет запущен, просто скопируйте конечную точку и токен этого модельного сервиса и настройте для него клиента.</p>
<pre><code translate="no" class="language-python">BENTO_LLM_END_POINT = <span class="hljs-string">&quot;BENTO_LLM_END_POINT&quot;</span>

llm_client = bentoml.SyncHTTPClient(BENTO_LLM_END_POINT, token=BENTO_API_TOKEN)
<button class="copy-code-btn"></button></code></pre>
<h2 id="LLM-Instructions" class="common-anchor-header">Инструкции LLM<button data-href="#LLM-Instructions" class="anchor-icon" translate="no">
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
    </button></h2><p>Теперь мы настроим инструкции LLM с подсказкой, контекстом и вопросом. Вот функция, которая ведет себя как LLM и возвращает вывод от клиента в строковом формате.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">dorag</span>(<span class="hljs-params">question: <span class="hljs-built_in">str</span>, context: <span class="hljs-built_in">str</span></span>):

    prompt = (
        <span class="hljs-string">f&quot;You are a helpful assistant. The user has a question. Answer the user question based only on the context: <span class="hljs-subst">{context}</span>. \n&quot;</span>
        <span class="hljs-string">f&quot;The user question is <span class="hljs-subst">{question}</span>&quot;</span>
    )

    results = llm_client.generate(
        max_tokens=<span class="hljs-number">1024</span>,
        prompt=prompt,
    )

    res = <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results:
        res += result

    <span class="hljs-keyword">return</span> res
<button class="copy-code-btn"></button></code></pre>
<h2 id="A-RAG-Example" class="common-anchor-header">Пример RAG<button data-href="#A-RAG-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>Теперь мы готовы задать вопрос. Эта функция просто принимает вопрос, а затем выполняет RAG, чтобы сгенерировать соответствующий контекст из фоновой информации. Затем мы передаем контекст и вопрос в dorag() и получаем результат.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What state is Cambridge in?&quot;</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">ask_a_question</span>(<span class="hljs-params">question</span>):
    embeddings = get_embeddings([question])
    res = milvus_client.search(
        collection_name=COLLECTION_NAME,
        data=embeddings,  <span class="hljs-comment"># search for the one (1) embedding returned as a list of lists</span>
        anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,  <span class="hljs-comment"># Search across embeddings</span>
        limit=<span class="hljs-number">5</span>,  <span class="hljs-comment"># get me the top 5 results</span>
        output_fields=[<span class="hljs-string">&quot;sentence&quot;</span>],  <span class="hljs-comment"># get the sentence/chunk and city</span>
    )

    sentences = []
    <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
        <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
            <span class="hljs-built_in">print</span>(hit)
            sentences.append(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;sentence&quot;</span>])
    context = <span class="hljs-string">&quot;. &quot;</span>.join(sentences)
    <span class="hljs-keyword">return</span> context


context = ask_a_question(question=question)
<span class="hljs-built_in">print</span>(context)
<button class="copy-code-btn"></button></code></pre>
<p>Реализация RAG</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(dorag(question=question, context=context))
<button class="copy-code-btn"></button></code></pre>
<p>Для примера с вопросом о том, в каком штате находится Кембридж, мы можем распечатать весь ответ из BentoML. Однако если мы потратим время на его разбор, он будет выглядеть более симпатично и сообщит нам, что Кембридж находится в штате Массачусетс.</p>
