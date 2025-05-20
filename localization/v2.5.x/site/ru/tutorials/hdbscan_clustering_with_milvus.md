---
id: hdbscan_clustering_with_milvus.md
summary: >-
  В этом блокноте мы будем использовать модель встраивания BGE-M3 для извлечения
  вложений из набора данных новостных заголовков, использовать Milvus для
  эффективного вычисления расстояний между вложениями, чтобы помочь HDBSCAN в
  кластеризации, а затем визуализировать результаты для анализа с помощью метода
  UMAP. Этот блокнот является адаптацией Milvus статьи Дилана Кастильо.
title: Кластеризация HDBSCAN с помощью Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hdbscan_clustering_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hdbscan_clustering_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="HDBSCAN-Clustering-with-Milvus" class="common-anchor-header">Кластеризация HDBSCAN с помощью Milvus<button data-href="#HDBSCAN-Clustering-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>С помощью моделей глубокого обучения данные могут быть преобразованы во вкрапления, которые отражают значимые представления исходных данных. Применяя алгоритм кластеризации без контроля, мы можем объединить похожие точки данных в группы на основе присущих им закономерностей. HDBSCAN (Hierarchical Density-Based Spatial Clustering of Applications with Noise) - это широко используемый алгоритм кластеризации, который эффективно группирует точки данных, анализируя их плотность и расстояние. Он особенно полезен для обнаружения кластеров различной формы и размера. В этом блокноте мы будем использовать HDBSCAN с Milvus, высокопроизводительной векторной базой данных, для группировки точек данных в отдельные группы на основе их вкраплений.</p>
<p>HDBSCAN (Hierarchical Density-Based Spatial Clustering of Applications with Noise) - это алгоритм кластеризации, основанный на вычислении расстояний между точками данных в пространстве вкраплений. Эти вкрапления, созданные моделями глубокого обучения, представляют данные в высокоразмерной форме. Чтобы сгруппировать похожие точки данных, HDBSCAN определяет их близость и плотность, но эффективное вычисление этих расстояний, особенно для больших наборов данных, может быть сложной задачей.</p>
<p>Milvus, высокопроизводительная база данных векторов, оптимизирует этот процесс, сохраняя и индексируя вкрапления, что позволяет быстро находить похожие векторы. При совместном использовании HDBSCAN и Milvus обеспечивают эффективную кластеризацию больших наборов данных в пространстве вкраплений.</p>
<p>В этом блокноте мы используем модель встраивания BGE-M3 для извлечения встраиваний из набора данных новостных заголовков, используем Milvus для эффективного вычисления расстояний между встраиваниями, чтобы помочь HDBSCAN в кластеризации, а затем визуализируем результаты для анализа с помощью метода UMAP. Этот блокнот является адаптацией Milvus к <a href="https://dylancastillo.co/posts/clustering-documents-with-openai-langchain-hdbscan.html">статье Дилана Кастильо</a>.</p>
<h2 id="Preparation" class="common-anchor-header">Подготовка<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>загрузите набор данных новостей с сайта https://www.kaggle.com/datasets/dylanjcastillo/news-headlines-2024/.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install hdbscan</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install plotly</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install umap-learn</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Download-Data" class="common-anchor-header">Загрузить данные<button data-href="#Download-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Скачайте новостной набор данных с https://www.kaggle.com/datasets/dylanjcastillo/news-headlines-2024/, извлеките <code translate="no">news_data_dedup.csv</code> и поместите его в текущую директорию.</p>
<p>Или вы можете скачать через curl:</p>
<pre><code translate="no" class="language-bash">%%bash
curl -L -o ~/Downloads/news-headlines-2024.zip\
  https://www.kaggle.com/api/v1/datasets/download/dylanjcastillo/news-headlines-2024
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:--  0:00:02 --:--:--     0 --:--:--     0
100  225k  100  225k    0     0  33151      0  0:00:06  0:00:06 --:--:-- 62160:03  114k  0:00:07  0:00:06  0:00:01 66615    0  30519      0  0:00:07  0:00:06  0:00:01 61622
</code></pre>
<h2 id="Extract-Embeddings-to-Milvus" class="common-anchor-header">Извлечение вкраплений в Milvus<button data-href="#Extract-Embeddings-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Мы создадим коллекцию с помощью Milvus и извлечем плотные вкрапления с помощью модели BGE-M3.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
<span class="hljs-keyword">from</span> dotenv <span class="hljs-keyword">import</span> load_dotenv
<span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, Collection, connections, CollectionSchema, DataType

load_dotenv()

df = pd.read_csv(<span class="hljs-string">&quot;news_data_dedup.csv&quot;</span>)


docs = [
    <span class="hljs-string">f&quot;<span class="hljs-subst">{title}</span>\n<span class="hljs-subst">{description}</span>&quot;</span> <span class="hljs-keyword">for</span> title, description <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(df.title, df.description)
]
ef = BGEM3EmbeddingFunction()

embeddings = ef(docs)[<span class="hljs-string">&quot;dense&quot;</span>]

connections.connect(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<ul>
<li>Если вам нужна локальная векторная база данных только для небольшого масштаба данных или прототипирования, установка uri в качестве локального файла, например<code translate="no">./milvus.db</code>, является наиболее удобным методом, так как он автоматически использует <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> для хранения всех данных в этом файле.</li>
<li>Если у вас большой объем данных, скажем, более миллиона векторов, вы можете настроить более производительный сервер Milvus на <a href="https://milvus.io/docs/quickstart.md">Docker или Kubernetes</a>. В этом случае используйте адрес и порт сервера в качестве uri, например,<code translate="no">http://localhost:19530</code>. Если вы включили функцию аутентификации на Milvus, используйте "<your_username>:<your_password>" в качестве токена, в противном случае не задавайте токен.</li>
<li>Если вы используете <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемый облачный сервис для Milvus, настройте <code translate="no">uri</code> и <code translate="no">token</code>, которые соответствуют <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">публичной конечной точке и ключу API</a> в Zilliz Cloud.</li>
</ul>
</blockquote>
</div>
<pre><code translate="no" class="language-python">fields = [
    FieldSchema(
        name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>
    ),  <span class="hljs-comment"># Primary ID field</span>
    FieldSchema(
        name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>
    ),  <span class="hljs-comment"># Float vector field (embedding)</span>
    FieldSchema(
        name=<span class="hljs-string">&quot;text&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>
    ),  <span class="hljs-comment"># Float vector field (embedding)</span>
]

schema = CollectionSchema(fields=fields, description=<span class="hljs-string">&quot;Embedding collection&quot;</span>)

collection = Collection(name=<span class="hljs-string">&quot;news_data&quot;</span>, schema=schema)

<span class="hljs-keyword">for</span> doc, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(docs, embeddings):
    collection.insert({<span class="hljs-string">&quot;text&quot;</span>: doc, <span class="hljs-string">&quot;embedding&quot;</span>: embedding})
    <span class="hljs-built_in">print</span>(doc)

index_params = {<span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;FLAT&quot;</span>, <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}

collection.create_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, index_params=index_params)

collection.flush()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Construct-the-Distance-Matrix-for-HDBSCAN" class="common-anchor-header">Построение матрицы расстояний для HDBSCAN<button data-href="#Construct-the-Distance-Matrix-for-HDBSCAN" class="anchor-icon" translate="no">
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
    </button></h2><p>HDBSCAN требует вычисления расстояний между точками для кластеризации, что может потребовать больших вычислительных затрат. Поскольку удаленные точки оказывают меньшее влияние на назначение кластеризации, мы можем повысить эффективность, вычислив топ-к ближайших соседей. В этом примере мы используем индекс FLAT, но для больших наборов данных Milvus поддерживает более продвинутые методы индексации, чтобы ускорить процесс поиска. Во-первых, нам нужно получить итератор для итерации коллекции Milvus, которую мы ранее создали.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> hdbscan
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
<span class="hljs-keyword">import</span> plotly.express <span class="hljs-keyword">as</span> px
<span class="hljs-keyword">from</span> umap <span class="hljs-keyword">import</span> UMAP
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection

collection = Collection(name=<span class="hljs-string">&quot;news_data&quot;</span>)
collection.load()

iterator = collection.query_iterator(
    batch_size=<span class="hljs-number">10</span>, expr=<span class="hljs-string">&quot;id &gt; 0&quot;</span>, output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>]
)

search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
}  <span class="hljs-comment"># L2 is Euclidean distance</span>

ids = []
dist = {}

embeddings = []
<button class="copy-code-btn"></button></code></pre>
<p>Мы будем итерировать все вкрапления в коллекции Milvus. Для каждого вкрапления мы будем искать его топ-к соседей в той же коллекции, получать их идентификаторы и расстояния. Затем нам также нужно построить словарь для сопоставления исходного идентификатора с непрерывным индексом в матрице расстояний. После этого нужно создать матрицу расстояний, которая инициализируется всеми элементами как бесконечность, и заполнить ее искомыми элементами. Таким образом, расстояние между удаленными точками будет игнорироваться. Наконец, мы используем библиотеку HDBSCAN для кластеризации точек с помощью созданной матрицы расстояний. Нам нужно установить метрику на 'precomputed', чтобы указать, что данные - это матрица расстояний, а не оригинальные вкрапления.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    batch = iterator.<span class="hljs-built_in">next</span>()
    batch_ids = [data[<span class="hljs-string">&quot;id&quot;</span>] <span class="hljs-keyword">for</span> data <span class="hljs-keyword">in</span> batch]
    ids.extend(batch_ids)

    query_vectors = [data[<span class="hljs-string">&quot;embedding&quot;</span>] <span class="hljs-keyword">for</span> data <span class="hljs-keyword">in</span> batch]
    embeddings.extend(query_vectors)

    results = collection.search(
        data=query_vectors,
        limit=<span class="hljs-number">50</span>,
        anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
        param=search_params,
        output_fields=[<span class="hljs-string">&quot;id&quot;</span>],
    )
    <span class="hljs-keyword">for</span> i, batch_id <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(batch_ids):
        dist[batch_id] = []
        <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results[i]:
            dist[batch_id].append((result.<span class="hljs-built_in">id</span>, result.distance))

    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(batch) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">break</span>

ids2index = {}

<span class="hljs-keyword">for</span> <span class="hljs-built_in">id</span> <span class="hljs-keyword">in</span> dist:
    ids2index[<span class="hljs-built_in">id</span>] = <span class="hljs-built_in">len</span>(ids2index)

dist_metric = np.full((<span class="hljs-built_in">len</span>(ids), <span class="hljs-built_in">len</span>(ids)), np.inf, dtype=np.float64)

<span class="hljs-keyword">for</span> <span class="hljs-built_in">id</span> <span class="hljs-keyword">in</span> dist:
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> dist[<span class="hljs-built_in">id</span>]:
        dist_metric[ids2index[<span class="hljs-built_in">id</span>]][ids2index[result[<span class="hljs-number">0</span>]]] = result[<span class="hljs-number">1</span>]

h = hdbscan.HDBSCAN(min_samples=<span class="hljs-number">3</span>, min_cluster_size=<span class="hljs-number">3</span>, metric=<span class="hljs-string">&quot;precomputed&quot;</span>)
hdb = h.fit(dist_metric)
<button class="copy-code-btn"></button></code></pre>
<p>После этого кластеризация HDBSCAN завершена. Мы можем получить некоторые данные и показать их кластер. Обратите внимание, что некоторые данные не будут отнесены ни к одному кластеру, что означает, что они являются шумом, поскольку расположены в какой-то разреженной области.</p>
<h2 id="Clusters-Visualization-using-UMAP" class="common-anchor-header">Визуализация кластеров с помощью UMAP<button data-href="#Clusters-Visualization-using-UMAP" class="anchor-icon" translate="no">
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
    </button></h2><p>Мы уже кластеризовали данные с помощью HDBSCAN и можем получить метки для каждой точки данных. Однако, используя некоторые методы визуализации, мы можем получить полную картину кластеров для интуитивного анализа. Сейчас мы будем использовать UMAP для визуализации кластеров. UMAP - это эффективный метод, используемый для уменьшения размерности, сохраняющий структуру высокоразмерных данных и проецирующий их в более низкоразмерное пространство для визуализации или дальнейшего анализа. С его помощью мы можем визуализировать исходные высокоразмерные данные в 2D- или 3D-пространстве и четко видеть кластеры. Здесь мы снова итерируем точки данных и получаем идентификатор и текст исходных данных, затем с помощью ploty строим график точек данных с этими метаданными на рисунке и используем разные цвета для представления различных кластеров.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> plotly.io <span class="hljs-keyword">as</span> pio

pio.renderers.default = <span class="hljs-string">&quot;notebook&quot;</span>

umap = UMAP(n_components=<span class="hljs-number">2</span>, random_state=<span class="hljs-number">42</span>, n_neighbors=<span class="hljs-number">80</span>, min_dist=<span class="hljs-number">0.1</span>)

df_umap = (
    pd.DataFrame(umap.fit_transform(np.array(embeddings)), columns=[<span class="hljs-string">&quot;x&quot;</span>, <span class="hljs-string">&quot;y&quot;</span>])
    .assign(cluster=<span class="hljs-keyword">lambda</span> df: hdb.labels_.astype(<span class="hljs-built_in">str</span>))
    .query(<span class="hljs-string">&#x27;cluster != &quot;-1&quot;&#x27;</span>)
    .sort_values(by=<span class="hljs-string">&quot;cluster&quot;</span>)
)
iterator = collection.query_iterator(
    batch_size=<span class="hljs-number">10</span>, expr=<span class="hljs-string">&quot;id &gt; 0&quot;</span>, output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)

ids = []
texts = []

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    batch = iterator.<span class="hljs-built_in">next</span>()
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(batch) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">break</span>
    batch_ids = [data[<span class="hljs-string">&quot;id&quot;</span>] <span class="hljs-keyword">for</span> data <span class="hljs-keyword">in</span> batch]
    batch_texts = [data[<span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-keyword">for</span> data <span class="hljs-keyword">in</span> batch]
    ids.extend(batch_ids)
    texts.extend(batch_texts)

show_texts = [texts[i] <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> df_umap.index]

df_umap[<span class="hljs-string">&quot;hover_text&quot;</span>] = show_texts
fig = px.scatter(
    df_umap, x=<span class="hljs-string">&quot;x&quot;</span>, y=<span class="hljs-string">&quot;y&quot;</span>, color=<span class="hljs-string">&quot;cluster&quot;</span>, hover_data={<span class="hljs-string">&quot;hover_text&quot;</span>: <span class="hljs-literal">True</span>}
)
fig.show()
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/images/hdbscan_clustering_with_milvus.png" alt="image" class="doc-image" id="image" />
   </span> <span class="img-wrapper"> <span>изображение</span> </span></p>
<p>Здесь мы демонстрируем, что данные хорошо кластеризованы, и вы можете навести курсор на точки, чтобы проверить текст, который они представляют. Мы надеемся, что с помощью этого блокнота вы узнаете, как эффективно использовать HDBSCAN для кластеризации вкраплений с помощью Milvus, что также может быть применено к другим типам данных. В сочетании с большими языковыми моделями этот подход позволяет проводить более глубокий анализ данных в больших масштабах.</p>
