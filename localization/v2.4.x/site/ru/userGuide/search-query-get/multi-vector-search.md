---
id: multi-vector-search.md
order: 2
summary: >-
  В этом руководстве показано, как выполнять гибридный поиск в Milvus и понимать
  ранжирование результатов.
title: Гибридный поиск
---
<h1 id="Hybrid-Search" class="common-anchor-header">Гибридный поиск<button data-href="#Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Начиная с версии Milvus 2.4, мы внедрили поддержку нескольких векторов и гибридный поиск, что означает, что пользователи могут объединять несколько векторных полей (до 10) в одну коллекцию. Эти векторы в разных столбцах представляют различные аспекты данных, полученные из разных моделей встраивания или подвергшиеся различным методам обработки. Результаты гибридного поиска интегрируются с помощью стратегий ранжирования, таких как Reciprocal Rank Fusion (RRF) и Weighted Scoring. Чтобы узнать больше о стратегиях ранжирования, обратитесь к разделу <a href="/docs/ru/v2.4.x/reranking.md">Ранжирование</a>.</p>
<p>Эта функция особенно полезна в сценариях комплексного поиска, например для определения наиболее похожего человека в векторной библиотеке на основе различных атрибутов, таких как фотографии, голос, отпечатки пальцев и т. д.</p>
<p>В этом руководстве вы узнаете, как:</p>
<ul>
<li><p>Создавать несколько экземпляров <code translate="no">AnnSearchRequest</code> для поиска сходства по различным векторным полям;</p></li>
<li><p>Настраивать стратегию ранжирования для объединения и ранжирования результатов поиска по нескольким экземплярам <code translate="no">AnnSearchRequest</code>;</p></li>
<li><p>Использовать <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a> метод для выполнения гибридного поиска.</p></li>
</ul>
<div class="alert note">
<p>Сниппеты кода на этой странице используют <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">модуль PyMilvus ORM</a> для взаимодействия с Milvus. Сниппеты кода с новым <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient SDK</a> будут доступны в ближайшее время.</p>
</div>
<h2 id="Preparations" class="common-anchor-header">Подготовка<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед началом гибридного поиска убедитесь, что у вас есть коллекция с несколькими векторными полями. В настоящее время в Milvus по умолчанию используется четыре векторных поля на коллекцию, которые можно расширить до десяти, изменив конфигурацию <a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum">proxy.maxVectorFieldNum</a>.</p>
<p>Ниже приведен пример создания коллекции с именем <code translate="no">test_collection</code> с двумя векторными полями, <code translate="no">filmVector</code> и <code translate="no">posterVector</code>, и вставки в нее случайных сущностей.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Connect to Milvus</span>
connections.connect(
    host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, <span class="hljs-comment"># Replace with your Milvus server IP</span>
    port=<span class="hljs-string">&quot;19530&quot;</span>
)

<span class="hljs-comment"># Create schema</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&quot;film_id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;filmVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>), <span class="hljs-comment"># Vector field for film vectors</span>
    FieldSchema(name=<span class="hljs-string">&quot;posterVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)] <span class="hljs-comment"># Vector field for poster vectors</span>

schema = CollectionSchema(fields=fields,enable_dynamic_field=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Create collection</span>
collection = Collection(name=<span class="hljs-string">&quot;test_collection&quot;</span>, schema=schema)

<span class="hljs-comment"># Create index for each vector field</span>
index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},
}

collection.create_index(<span class="hljs-string">&quot;filmVector&quot;</span>, index_params)
collection.create_index(<span class="hljs-string">&quot;posterVector&quot;</span>, index_params)

<span class="hljs-comment"># Generate random entities to insert</span>
entities = []

<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    <span class="hljs-comment"># generate random values for each field in the schema</span>
    film_id = random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">1000</span>)
    film_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]
    poster_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]

    <span class="hljs-comment"># create a dictionary for each entity</span>
    entity = {
        <span class="hljs-string">&quot;film_id&quot;</span>: film_id,
        <span class="hljs-string">&quot;filmVector&quot;</span>: film_vector,
        <span class="hljs-string">&quot;posterVector&quot;</span>: poster_vector
    }

    <span class="hljs-comment"># add the entity to the list</span>
    entities.append(entity)
    
collection.insert(entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-1-Create-Multiple-AnnSearchRequest-Instances" class="common-anchor-header">Шаг 1: Создание нескольких экземпляров AnnSearchRequest<button data-href="#Step-1-Create-Multiple-AnnSearchRequest-Instances" class="anchor-icon" translate="no">
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
    </button></h2><p>Гибридный поиск использует API <code translate="no">hybrid_search()</code> для выполнения нескольких поисковых запросов ANN за один вызов. Каждый <code translate="no">AnnSearchRequest</code> представляет собой один запрос на поиск по определенному векторному полю.</p>
<p>В следующем примере создаются два экземпляра <code translate="no">AnnSearchRequest</code> для выполнения индивидуального поиска сходства по двум векторным полям.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Create ANN search request 1 for filmVector</span>
query_filmVector = [[<span class="hljs-number">0.8896863042430693</span>, <span class="hljs-number">0.370613100114602</span>, <span class="hljs-number">0.23779315077113428</span>, <span class="hljs-number">0.38227915951132996</span>, <span class="hljs-number">0.5997064603128835</span>]]

search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_filmVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;filmVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_1 = AnnSearchRequest(**search_param_1)

<span class="hljs-comment"># Create ANN search request 2 for posterVector</span>
query_posterVector = [[<span class="hljs-number">0.02550758562349764</span>, <span class="hljs-number">0.006085637357292062</span>, <span class="hljs-number">0.5325251250159071</span>, <span class="hljs-number">0.7676432650114147</span>, <span class="hljs-number">0.5521074424751443</span>]]
search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_posterVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;posterVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_2 = AnnSearchRequest(**search_param_2)

<span class="hljs-comment"># Store these two requests as a list in `reqs`</span>
reqs = [request_1, request_2]
<button class="copy-code-btn"></button></code></pre>
<p>Параметры:</p>
<ul>
<li><p><code translate="no">AnnSearchRequest</code> <em>(объект</em>)</p>
<p>Класс, представляющий запрос на поиск ANN. Каждый гибридный поиск может содержать от 1 до 1024 объектов <code translate="no">ANNSearchRequest</code> одновременно.</p></li>
<li><p><code translate="no">data</code> <em>(список</em>)</p>
<p>Вектор запроса для поиска в одном <code translate="no">AnnSearchRequest</code>. В настоящее время этот параметр принимает список, содержащий только один вектор запроса, например, <code translate="no">[[0.5791814851218929, 0.5792985702614121, 0.8480776460143558, 0.16098005945243, 0.2842979317256803]]</code>. В будущем этот параметр будет расширен для приема нескольких векторов запроса.</p></li>
<li><p><code translate="no">anns_field</code> <em>(строка</em>)</p>
<p>Имя векторного поля для использования в одном <code translate="no">AnnSearchRequest</code>.</p></li>
<li><p><code translate="no">param</code> <em>(dict</em>)</p>
<p>Словарь параметров поиска для одного <code translate="no">AnnSearchRequest</code>. Эти параметры поиска идентичны параметрам для одновекторного поиска. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/single-vector-search.md#Search-parameters">Параметры поиска</a>.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>Максимальное количество результатов поиска для включения в один <code translate="no">ANNSearchRequest</code>.</p>
<p>Этот параметр влияет только на количество результатов поиска, возвращаемых в рамках отдельного <code translate="no">ANNSearchRequest</code>, и не определяет окончательные результаты, возвращаемые при вызове <code translate="no">hybrid_search</code>. В гибридном поиске конечные результаты определяются путем объединения и повторного ранжирования результатов из нескольких экземпляров <code translate="no">ANNSearchRequest</code>.</p></li>
</ul>
<h2 id="Step-2-Configure-a-Reranking-Strategy" class="common-anchor-header">Шаг 2: Настройте стратегию реранжирования<button data-href="#Step-2-Configure-a-Reranking-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>После создания экземпляров <code translate="no">AnnSearchRequest</code> настройте стратегию ранжирования для объединения и ранжирования результатов. В настоящее время существует два варианта: <code translate="no">WeightedRanker</code> и <code translate="no">RRFRanker</code>. Дополнительные сведения о стратегиях ранжирования см. в разделе <a href="/docs/ru/v2.4.x/reranking.md">Ранжирование</a>.</p>
<ul>
<li><p>Использовать взвешенную оценку</p>
<p>На сайте <code translate="no">WeightedRanker</code> результатам поиска по каждому векторному полю присваивается важность с заданными весами. Если вы отдаете предпочтение одним векторным полям перед другими, <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> может отразить это в объединенных результатах поиска.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker
<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
<span class="hljs-comment"># Assign weights of 0.8 to text search and 0.2 to image search</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>)  
<button class="copy-code-btn"></button></code></pre>
<p>При использовании <code translate="no">WeightedRanker</code> следует учитывать следующее:</p>
<ul>
<li>Каждое значение веса варьируется от 0 (наименее важное) до 1 (наиболее важное), влияя на итоговый суммарный балл.</li>
<li>Общее количество значений веса, указанных в <code translate="no">WeightedRanker</code>, должно равняться количеству созданных вами экземпляров <code translate="no">AnnSearchRequest</code>.</li>
</ul></li>
<li><p>Использование слияния взаимных рангов (RFF)</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Alternatively, use RRFRanker for reciprocal rank fusion reranking</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

rerank = RRFRanker()
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">Шаг 3: Выполните гибридный поиск<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>С заданными экземплярами <code translate="no">AnnSearchRequest</code> и стратегией ранжирования используйте метод <code translate="no">hybrid_search()</code> для выполнения гибридного поиска.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Before conducting hybrid search, load the collection into memory.</span>
collection.load()

res = collection.hybrid_search(
    reqs, <span class="hljs-comment"># List of AnnSearchRequests created in step 1</span>
    rerank, <span class="hljs-comment"># Reranking strategy specified in step 2</span>
    limit=<span class="hljs-number">2</span> <span class="hljs-comment"># Number of final search results to return</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>Параметры:</p>
<ul>
<li><p><code translate="no">reqs</code> <em>(список</em>)</p>
<p>Список поисковых запросов, где каждый запрос - это объект <code translate="no">ANNSearchRequest</code>. Каждый запрос может соответствовать различному векторному полю и различному набору параметров поиска.</p></li>
<li><p><code translate="no">rerank</code> <em>(объект</em>)</p>
<p>Стратегия ранжирования, используемая для гибридного поиска. Возможные значения: <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> и <code translate="no">RRFRanker()</code>.</p>
<p>Дополнительные сведения о стратегиях ранжирования см. в разделе <a href="/docs/ru/v2.4.x/reranking.md">Ранжирование</a>.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>Максимальное количество конечных результатов, возвращаемых при гибридном поиске.</p></li>
</ul>
<p>Вывод аналогичен следующему:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Limits<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>Обычно в каждой коллекции по умолчанию допускается до 4 векторных полей. Однако у вас есть возможность настроить конфигурацию <code translate="no">proxy.maxVectorFieldNum</code>, чтобы расширить максимальное количество векторных полей в коллекции, с максимальным ограничением в 10 векторных полей на коллекцию. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/configure_proxy.md#Proxy-related-Configurations">Конфигурации, связанные с прокси</a>.</p></li>
<li><p>Частично проиндексированные или загруженные векторные поля в коллекции приведут к ошибке.</p></li>
<li><p>В настоящее время каждый <code translate="no">AnnSearchRequest</code> в гибридном поиске может содержать только один вектор запроса.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>В каких сценариях рекомендуется использовать гибридный поиск?</strong></p>
<p>Гибридный поиск идеально подходит для сложных ситуаций, требующих высокой точности, особенно когда сущность может быть представлена несколькими различными векторами. Это относится к случаям, когда одни и те же данные, например предложение, обрабатываются с помощью различных моделей встраивания или когда мультимодальная информация (например, изображения, отпечатки пальцев и отпечатки голоса человека) преобразуется в различные векторные форматы. Присваивая веса этим векторам, их совместное влияние может значительно обогатить отзыв и повысить эффективность результатов поиска.</p></li>
<li><p><strong>Как взвешенный ранжировщик нормализует расстояния между различными векторными полями?</strong></p>
<p>Взвешенный ранжировщик нормализует расстояния между векторными полями с помощью присвоенных каждому полю весов. Он рассчитывает важность каждого векторного поля в соответствии с его весом, отдавая предпочтение полям с более высокими весами. Рекомендуется использовать один и тот же тип метрики для всех поисковых запросов ANN, чтобы обеспечить согласованность. Этот метод гарантирует, что векторы, считающиеся более значимыми, окажут большее влияние на общее ранжирование.</p></li>
<li><p><strong>Можно ли использовать альтернативные ранжировщики, такие как Cohere Ranker или BGE Ranker?</strong></p>
<p>В настоящее время поддерживаются только предоставленные ранжировщики. Планируется включить дополнительные ранжировщики в будущие обновления.</p></li>
<li><p><strong>Возможно ли одновременное выполнение нескольких операций гибридного поиска?</strong></p>
<p>Да, одновременное выполнение нескольких операций гибридного поиска поддерживается.</p></li>
<li><p><strong>Могу ли я использовать одно и то же векторное поле в нескольких объектах AnnSearchRequest для выполнения гибридного поиска?</strong></p>
<p>Технически, можно использовать одно и то же векторное поле в нескольких объектах AnnSearchRequest для гибридного поиска. Для гибридного поиска не обязательно иметь несколько векторных полей.</p></li>
</ul>
