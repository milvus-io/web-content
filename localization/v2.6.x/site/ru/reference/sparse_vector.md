---
id: sparse_vector.md
summary: 'Узнайте, как использовать разреженные векторы в Milvus.'
title: Разреженный вектор
---
<h1 id="Sparse-Vector" class="common-anchor-header">Разреженный вектор<button data-href="#Sparse-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>Разреженные векторы представляют слова или фразы с помощью векторных вкраплений, в которых большинство элементов равны нулю, и только один ненулевой элемент указывает на присутствие конкретного слова. Модели с разреженными векторами, такие как <a href="https://arxiv.org/abs/2109.10086">SPLADEv2</a>, превосходят модели с плотными векторами в поиске знаний за пределами области, осознании ключевых слов и интерпретируемости. Они особенно полезны в информационном поиске, обработке естественного языка и рекомендательных системах, где сочетание разреженных векторов для отзыва с большой моделью для ранжирования может значительно улучшить результаты поиска.</p>
<p>В Milvus использование разреженных векторов происходит по той же схеме, что и использование плотных векторов. Он включает создание коллекции с колонкой разреженных векторов, вставку данных, создание индекса, поиск по сходству и скалярные запросы.</p>
<p>В этом руководстве вы узнаете, как:</p>
<ul>
<li>Готовить вкрапления разреженных векторов;</li>
<li>Создавать коллекцию с полем разреженного вектора;</li>
<li>Вставлять сущности с разреженными векторными вложениями;</li>
<li>Индексировать коллекцию и выполнять ANN-поиск по разреженным векторам.</li>
</ul>
<p>Чтобы увидеть разреженные векторы в действии, обратитесь к <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/milvus_client/sparse.py">hello_sparse.py</a>.</p>
<div class="admonition note">
    <p><b>примечания</b></p>
        В настоящее время поддержка разреженных векторов является бета-версией в версии 2.4.0, а в планах сделать ее общедоступной в версии 3.0.0.</div>
<h2 id="Prepare-sparse-vector-embeddings" class="common-anchor-header">Подготовка вкраплений разреженных векторов<button data-href="#Prepare-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы использовать разреженные векторы в Milvus, подготовьте векторные вкрапления в одном из поддерживаемых форматов:</p>
<ul>
<li><p><strong>Sparse Matrices</strong>: Используйте семейство классов <a href="https://docs.scipy.org/doc/scipy/reference/sparse.html#module-scipy.sparse">scipy.sparse</a> для представления разреженных вкраплений. Этот метод эффективен для работы с крупномасштабными, высокоразмерными данными.</p></li>
<li><p><strong>Список словарей</strong>: Представьте каждое разреженное вкрапление в виде словаря, структурированного как <code translate="no">{dimension_index: value, ...}</code>, где каждая пара ключ-значение представляет собой индекс размерности и соответствующее ему значение.</p>
<p>Пример:</p>
<pre><code translate="no" class="language-python">{<span class="hljs-number">2</span>: <span class="hljs-number">0.33</span>, <span class="hljs-number">98</span>: <span class="hljs-number">0.72</span>, ...}
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Список кортежей (Iterables of Tuples</strong>): Аналогично списку словарей, но для указания только ненулевых размерностей и их значений используется итерабельный список кортежей, <code translate="no">[(dimension_index, value)]</code>.</p>
<p>Пример:</p>
<pre><code translate="no" class="language-python">[(<span class="hljs-number">2</span>, <span class="hljs-number">0.33</span>), (<span class="hljs-number">98</span>, <span class="hljs-number">0.72</span>), ...]
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Следующий пример готовит разреженные вкрапления, генерируя случайную разреженную матрицу для 10 000 сущностей, каждая из которых имеет 10 000 измерений и плотность разреженности 0,005.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare entities with sparse vector representation</span>
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> random

rng = np.random.default_rng()

num_entities, dim = <span class="hljs-number">10000</span>, <span class="hljs-number">10000</span>

<span class="hljs-comment"># Generate random sparse rows with an average of 25 non-zero elements per row</span>
entities = [
    {
        <span class="hljs-string">&quot;scalar_field&quot;</span>: rng.random(),
        <span class="hljs-comment"># To represent a single sparse vector row, you can use:</span>
        <span class="hljs-comment"># - Any of the scipy.sparse sparse matrices class family with shape[0] == 1</span>
        <span class="hljs-comment"># - Dict[int, float]</span>
        <span class="hljs-comment"># - Iterable[Tuple[int, float]]</span>
        <span class="hljs-string">&quot;sparse_vector&quot;</span>: {
            d: rng.random() <span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> random.sample(<span class="hljs-built_in">range</span>(dim), random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">30</span>))
        },
    }
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_entities)
]

<span class="hljs-comment"># print the first entity to check the representation</span>
<span class="hljs-built_in">print</span>(entities[<span class="hljs-number">0</span>])

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &#x27;scalar_field&#x27;: 0.520821523849214,</span>
<span class="hljs-comment">#     &#x27;sparse_vector&#x27;: {</span>
<span class="hljs-comment">#         5263: 0.2639375518635271,</span>
<span class="hljs-comment">#         3573: 0.34701499565746674,</span>
<span class="hljs-comment">#         9637: 0.30856525997853057,</span>
<span class="hljs-comment">#         4399: 0.19771651149001523,</span>
<span class="hljs-comment">#         6959: 0.31025067641541815,</span>
<span class="hljs-comment">#         1729: 0.8265339135915016,</span>
<span class="hljs-comment">#         1220: 0.15303302147479103,</span>
<span class="hljs-comment">#         7335: 0.9436728846033107,</span>
<span class="hljs-comment">#         6167: 0.19929870545596562,</span>
<span class="hljs-comment">#         5891: 0.8214617920371853,</span>
<span class="hljs-comment">#         2245: 0.7852255053773395,</span>
<span class="hljs-comment">#         2886: 0.8787982039149889,</span>
<span class="hljs-comment">#         8966: 0.9000606703940665,</span>
<span class="hljs-comment">#         4910: 0.3001170013981104,</span>
<span class="hljs-comment">#         17: 0.00875671667413136,</span>
<span class="hljs-comment">#         3279: 0.7003425473001098,</span>
<span class="hljs-comment">#         2622: 0.7571360018373428,</span>
<span class="hljs-comment">#         4962: 0.3901879090102064,</span>
<span class="hljs-comment">#         4698: 0.22589525720196246,</span>
<span class="hljs-comment">#         3290: 0.5510228492587324,</span>
<span class="hljs-comment">#         6185: 0.4508413201390492</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>примечания</b></p>
<p>Размеры вектора должны быть типа Python <code translate="no">int</code> или <code translate="no">numpy.integer</code>, а значения должны быть типа Python <code translate="no">float</code> или <code translate="no">numpy.floating</code>.</p>
</div>
<p>Для генерации вкраплений можно также использовать пакет <code translate="no">model</code>, встроенный в библиотеку PyMilvus, который предлагает ряд функций вкраплений. Подробнее см. в разделе <a href="/docs/ru/embeddings.md">Вкрапления</a>.</p>
<h2 id="Create-a-collection-with-a-sparse-vector-field" class="common-anchor-header">Создание коллекции с разреженным векторным полем<button data-href="#Create-a-collection-with-a-sparse-vector-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы создать коллекцию с разреженным векторным полем, установите <strong>тип данных</strong> разреженного векторного поля на <strong>DataType.SPARSE_FLOAT_VECTOR</strong>. В отличие от плотных векторов, для разреженных векторов не нужно указывать размерность.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a MilvusClient instance</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a collection with a sparse vector field</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;scalar_field&quot;</span>, datatype=DataType.DOUBLE)
<span class="hljs-comment"># For sparse vector, no need to specify dimension</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR) <span class="hljs-comment"># set `datatype` to `SPARSE_FLOAT_VECTOR`</span>

client.create_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<p>Подробнее об общих параметрах коллекции см. в <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection()</a>.</p>
<h2 id="Insert-entities-with-sparse-vector-embeddings" class="common-anchor-header">Вставка сущностей с разреженными векторными вкраплениями<button data-href="#Insert-entities-with-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы вставить сущности с разреженными векторными вложениями, просто передайте список сущностей в метод <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a> методу.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert entities</span>
client.insert(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-the-collection" class="common-anchor-header">Индексирование коллекции<button data-href="#Index-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед выполнением поиска по сходству создайте индекс для коллекции. Дополнительную информацию о типах и параметрах индексов см. в разделах <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">add_index()</a> и <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index()</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the collection</span>

<span class="hljs-comment"># Prepare index params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># the type of index to be created. set to `SPARSE_INVERTED_INDEX` or `SPARSE_WAND`.</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># the metric type to be used for the index. Currently, only `IP` (Inner Product) is supported.</span>
    params={<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}, <span class="hljs-comment"># the ratio of small vector values to be dropped during indexing.</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<p>Для создания индексов на разреженных векторах обратите внимание на следующее:</p>
<ul>
<li><p><code translate="no">index_type</code>: Тип индекса, который необходимо построить. Возможные варианты для разреженных векторов:</p>
<ul>
<li><p><code translate="no">SPARSE_INVERTED_INDEX</code>: Инвертированный индекс, который сопоставляет каждое измерение с его ненулевыми векторами, облегчая прямой доступ к соответствующим данным при поиске. Идеально подходит для наборов данных с разреженными, но высокоразмерными данными.</p></li>
<li><p><code translate="no">SPARSE_WAND</code>: Использует алгоритм Weak-AND (WAND) для быстрого обхода маловероятных кандидатов, фокусируя оценку на тех, кто имеет более высокий потенциал ранжирования. Рассматривает размерности как термины, а векторы - как документы, что ускоряет поиск в больших разреженных наборах данных.</p></li>
</ul></li>
<li><p><code translate="no">metric_type</code>: Для разреженных векторов поддерживается только метрика расстояния <code translate="no">IP</code> (Inner Product).</p></li>
<li><p><code translate="no">params.drop_ratio_build</code>: Параметр index используется специально для разреженных векторов. Он управляет долей малых значений вектора, которые исключаются в процессе индексирования. Этот параметр позволяет тонко настраивать компромисс между эффективностью и точностью, игнорируя малые значения при построении индекса. Например, если <code translate="no">drop_ratio_build = 0.3</code>, то при построении индекса все значения из всех разреженных векторов собираются и сортируются. Наименьшие 30 % этих значений не включаются в индекс, что снижает вычислительную нагрузку при поиске.</p></li>
</ul>
<p>Дополнительную информацию см. в разделе <a href="/docs/ru/index.md">Индекс в памяти</a>.</p>
<h2 id="Perform-ANN-search" class="common-anchor-header">Выполнение поиска ANN<button data-href="#Perform-ANN-search" class="anchor-icon" translate="no">
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
    </button></h2><p>После того как коллекция проиндексирована и загружена в память, используйте <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a> для получения соответствующих документов на основе запроса.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load the collection into memory</span>
client.load_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>)

<span class="hljs-comment"># Perform ANN search on sparse vectors</span>

<span class="hljs-comment"># for demo purpose we search for the last inserted vector</span>
query_vector = entities[-<span class="hljs-number">1</span>][<span class="hljs-string">&quot;sparse_vector&quot;</span>]

search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}, <span class="hljs-comment"># the ratio of small vector values to be dropped during search.</span>
}

search_res = client.search(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;scalar_field&quot;</span>],
    search_params=search_params,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> search_res:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;hit: <span class="hljs-subst">{hit}</span>&quot;</span>)
        
<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># hit: {&#x27;id&#x27;: &#x27;448458373272710786&#x27;, &#x27;distance&#x27;: 7.220192909240723, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;448458373272710786&#x27;, &#x27;scalar_field&#x27;: 0.46767865218233806}}</span>
<span class="hljs-comment"># hit: {&#x27;id&#x27;: &#x27;448458373272708317&#x27;, &#x27;distance&#x27;: 1.2287548780441284, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;448458373272708317&#x27;, &#x27;scalar_field&#x27;: 0.7315987515699472}}</span>
<span class="hljs-comment"># hit: {&#x27;id&#x27;: &#x27;448458373272702005&#x27;, &#x27;distance&#x27;: 0.9848432540893555, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;448458373272702005&#x27;, &#x27;scalar_field&#x27;: 0.9871869181562156}}</span>
<button class="copy-code-btn"></button></code></pre>
<p>При настройке параметров поиска обратите внимание на следующее:</p>
<ul>
<li><code translate="no">params.drop_ratio_search</code>: Параметр поиска, используемый специально для разреженных векторов. Этот параметр позволяет тонко настроить процесс поиска, указав соотношение наименьших значений в векторе запроса, которые следует игнорировать. Это помогает сбалансировать точность и производительность поиска. Чем меньше значение <code translate="no">drop_ratio_search</code>, тем меньше вклад этих малых значений в итоговую оценку. Игнорирование некоторых малых значений позволяет повысить производительность поиска с минимальным влиянием на точность.</li>
</ul>
<h2 id="Perform-scalar-queries" class="common-anchor-header">Выполнение скалярных запросов<button data-href="#Perform-scalar-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Помимо ANN-поиска, Milvus также поддерживает скалярные запросы к разреженным векторам. Эти запросы позволяют получать документы на основе скалярного значения, связанного с разреженным вектором. Дополнительную информацию о параметрах см. в разделе <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">query()</a>.</p>
<p>Фильтр сущностей со значением <strong>scalar_field</strong> больше 3:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform a query by specifying filter expr</span>
filter_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;scalar_field &gt; 0.999&quot;</span>,
)

<span class="hljs-built_in">print</span>(filter_query_res[:<span class="hljs-number">2</span>])

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [{&#x27;pk&#x27;: &#x27;448458373272701862&#x27;, &#x27;scalar_field&#x27;: 0.9994093623822689, &#x27;sparse_vector&#x27;: {173: 0.35266244411468506, 400: 0.49995484948158264, 480: 0.8757831454277039, 661: 0.9931875467300415, 1040: 0.0965644046664238, 1728: 0.7478245496749878, 2365: 0.4351981580257416, 2923: 0.5505295395851135, 3181: 0.7396837472915649, 3848: 0.4428485333919525, 4701: 0.39119353890419006, 5199: 0.790219783782959, 5798: 0.9623121619224548, 6213: 0.453134149312973, 6341: 0.745091438293457, 6775: 0.27766478061676025, 6875: 0.017947908490896225, 8093: 0.11834774166345596, 8617: 0.2289179265499115, 8991: 0.36600416898727417, 9346: 0.5502803921699524}}, {&#x27;pk&#x27;: &#x27;448458373272702421&#x27;, &#x27;scalar_field&#x27;: 0.9990218525410719, &#x27;sparse_vector&#x27;: {448: 0.587817907333374, 1866: 0.0994109958410263, 2438: 0.8672442436218262, 2533: 0.8063794374465942, 2595: 0.02122959867119789, 2828: 0.33827054500579834, 2871: 0.1984412521123886, 2938: 0.09674275666475296, 3154: 0.21552987396717072, 3662: 0.5236313343048096, 3711: 0.6463911533355713, 4029: 0.4041993021965027, 7143: 0.7370485663414001, 7589: 0.37588241696357727, 7776: 0.436136394739151, 7962: 0.06377989053726196, 8385: 0.5808192491531372, 8592: 0.8865005970001221, 8648: 0.05727503448724747, 9071: 0.9450633525848389, 9161: 0.146037295460701, 9358: 0.1903032660484314, 9679: 0.3146636486053467, 9974: 0.8561339378356934, 9991: 0.15841573476791382}}]</span>
<button class="copy-code-btn"></button></code></pre>
<p>Фильтр сущностей по первичному ключу:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># primary keys of entities that satisfy the filter</span>
pks = [ret[<span class="hljs-string">&quot;pk&quot;</span>] <span class="hljs-keyword">for</span> ret <span class="hljs-keyword">in</span> filter_query_res]

<span class="hljs-comment"># Perform a query by primary key</span>
pk_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;pk == &#x27;<span class="hljs-subst">{pks[<span class="hljs-number">0</span>]}</span>&#x27;&quot;</span>
)

<span class="hljs-built_in">print</span>(pk_query_res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [{&#x27;scalar_field&#x27;: 0.9994093623822689, &#x27;sparse_vector&#x27;: {173: 0.35266244411468506, 400: 0.49995484948158264, 480: 0.8757831454277039, 661: 0.9931875467300415, 1040: 0.0965644046664238, 1728: 0.7478245496749878, 2365: 0.4351981580257416, 2923: 0.5505295395851135, 3181: 0.7396837472915649, 3848: 0.4428485333919525, 4701: 0.39119353890419006, 5199: 0.790219783782959, 5798: 0.9623121619224548, 6213: 0.453134149312973, 6341: 0.745091438293457, 6775: 0.27766478061676025, 6875: 0.017947908490896225, 8093: 0.11834774166345596, 8617: 0.2289179265499115, 8991: 0.36600416898727417, 9346: 0.5502803921699524}, &#x27;pk&#x27;: &#x27;448458373272701862&#x27;}]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Ограничения<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>При использовании разреженных векторов в Milvus учитывайте следующие ограничения:</p>
<ul>
<li><p>В настоящее время для разреженных векторов поддерживается только метрика расстояния <strong>IP</strong>.</p></li>
<li><p>Для полей разреженных векторов поддерживаются только типы индексов <strong>SPARSE_INVERTED_INDEX</strong> и <strong>SPARSE_WAND</strong>.</p></li>
<li><p>В настоящее время <a href="https://milvus.io/docs/single-vector-search.md#Range-search">поиск по диапазону</a>, <a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">поиск по группировке</a> и <a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">поиск по итератору</a> не поддерживаются для разреженных векторов.</p></li>
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
<li><p><strong>Какая метрика расстояния поддерживается для разреженных векторов?</strong></p>
<p>Для разреженных векторов поддерживается только метрика расстояния Inner Product (IP) из-за высокой размерности разреженных векторов, что делает нецелесообразным использование расстояния L2 и косинусного расстояния.</p></li>
<li><p><strong>Объясните, пожалуйста, разницу между SPARSE_INVERTED_INDEX и SPARSE_WAND, и как мне выбрать между ними?</strong></p>
<p><strong>SPARSE_INVERTED_INDEX</strong> - это традиционный инвертированный индекс, а <strong>SPARSE_WAND</strong> использует алгоритм <a href="https://dl.acm.org/doi/10.1145/956863.956944">Weak-AND</a> для уменьшения количества полных оценок IP-расстояния во время поиска. <strong>SPARSE_WAND</strong> обычно быстрее, но его производительность может снижаться с увеличением плотности векторов. Чтобы выбрать один из них, проведите эксперименты и бенчмарки, основанные на вашем конкретном наборе данных и сценарии использования.</p></li>
<li><p><strong>Как выбрать параметры drop_ratio_build и drop_ratio_search?</strong></p>
<p>Выбор параметров <strong>drop_ratio_build</strong> и <strong>drop_ratio_search</strong> зависит от характеристик ваших данных и ваших требований к задержке/пропускной способности и точности поиска.</p></li>
<li><p><strong>Какие типы данных поддерживаются для разреженных вкраплений?</strong></p>
<p>Размерная часть должна быть беззнаковым 32-битным целым числом, а часть значения может быть неотрицательным 32-битным числом с плавающей точкой.</p></li>
<li><p><strong>Может ли размерность разреженного вкрапления быть любым дискретным значением в пространстве uint32?</strong></p>
<p>Да, за одним исключением. Размерность разреженного вкрапления может быть любой величиной в диапазоне <code translate="no">[0, maximum of uint32)</code>. Это означает, что вы не можете использовать максимальное значение uint32.</p></li>
<li><p><strong>Поиск в растущих сегментах осуществляется через индекс или методом грубой силы?</strong></p>
<p>Поиск по растущим сегментам осуществляется через индекс того же типа, что и индекс запечатанного сегмента. Для новых растущих сегментов до построения индекса используется поиск методом грубой силы.</p></li>
<li><p><strong>Можно ли в одной коллекции иметь как разреженные, так и плотные векторы?</strong></p>
<p>Да, благодаря поддержке нескольких типов векторов можно создавать коллекции с колонками как разреженных, так и плотных векторов и выполнять в них гибридный поиск.</p></li>
<li><p><strong>Каковы требования к вставке или поиску разреженных вкраплений?</strong></p>
<p>Разреженные вкрапления должны иметь хотя бы одно ненулевое значение, а индексы векторов должны быть неотрицательными.</p></li>
</ul>
