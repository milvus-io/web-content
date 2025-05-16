---
id: index-scalar-fields.md
order: 2
summary: >-
  Это руководство поможет вам создать и настроить скалярные индексы для таких
  полей, как целые числа, строки и т. д.
title: Скалярные поля индексов
---
<h1 id="Index-Scalar-Fields" class="common-anchor-header">Скалярные поля индексов<button data-href="#Index-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>В Milvus скалярный индекс используется для ускорения метафильтрации по определенному значению не векторного поля, подобно традиционному индексу базы данных. В этом руководстве вы узнаете, как создать и настроить скалярные индексы для таких полей, как целые числа, строки и т. д.</p>
<h2 id="Types-of-scalar-indexing" class="common-anchor-header">Типы скалярного индексирования<button data-href="#Types-of-scalar-indexing" class="anchor-icon" translate="no">
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
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Auto-indexing">Автоматическое индексирование</a></strong>: Milvus автоматически определяет тип индекса, основываясь на типе данных скалярного поля. Это подходит, когда вам не нужно контролировать конкретный тип индекса.</p></li>
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Custom-indexing">Пользовательское индексирование</a></strong>: Вы указываете точный тип индекса, например инвертированный индекс. Это обеспечивает больший контроль над выбором типа индекса.</p></li>
</ul>
<h2 id="Auto-indexing" class="common-anchor-header">Автоиндексация<button data-href="#Auto-indexing" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Чтобы использовать автоматическое индексирование, опустите параметр <strong>index_type</strong> в строке <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>чтобы Milvus мог определить тип индекса на основе типа скалярного поля.</p>
</div>
<div class="language-java">
<p>Чтобы использовать автоматическое индексирование, опустите параметр <strong>indexType</strong> в <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>, чтобы Milvus мог определить тип индекса на основе типа скалярного поля.</p>
</div>
<div class="language-javascript">
<p>Чтобы использовать автоматическое индексирование, опустите параметр <strong>index_type</strong> в <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>, чтобы Milvus мог определить тип индекса на основе типа скалярного поля.</p>
</div>
<p>Сопоставления между скалярными типами данных и алгоритмами индексации по умолчанию см. в разделе <a href="https://milvus.io/docs/scalar_index.md#Scalar-field-indexing-algorithms">Алгоритмы индексации скалярных полей</a>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Auto indexing</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

index_params = MilvusClient.prepare_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>

index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;&quot;</span>, <span class="hljs-comment"># Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
    index_name=<span class="hljs-string">&quot;default_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
  collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
  index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForScalarField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;scalar_1&quot;</span>) <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    .indexName(<span class="hljs-string">&quot;default_index&quot;</span>) <span class="hljs-comment">// Name of the index to be created</span>
    .indexType(<span class="hljs-string">&quot;&quot;</span>) <span class="hljs-comment">// Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>) <span class="hljs-comment">// Specify the collection name</span>
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment">// Specify the collection name</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;default_index&quot;</span>, <span class="hljs-comment">// Name of the index to be created</span>
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment">// Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
})
<button class="copy-code-btn"></button></code></pre>
<h2 id="Custom-indexing" class="common-anchor-header">Пользовательское индексирование<button data-href="#Custom-indexing" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Чтобы использовать пользовательскую индексацию, укажите конкретный тип индекса с помощью параметра <strong>index_type</strong> в файле <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>.</p>
</div>
<div class="language-java">
<p>Чтобы использовать пользовательскую индексацию, укажите конкретный тип индекса с помощью параметра <strong>indexType</strong> в <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>.</p>
</div>
<div class="language-javascript">
<p>Чтобы использовать пользовательскую индексацию, укажите конкретный тип индекса с помощью параметра <strong>index_type</strong> в <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<p>В примере ниже создается инвертированный индекс для скалярного поля <code translate="no">scalar_2</code>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">index_params = MilvusClient.prepare_index_params() <span class="hljs-comment">#  Prepare an IndexParams object</span>

index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_2&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
  collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
  index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForScalarField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;scalar_1&quot;</span>) <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    .indexName(<span class="hljs-string">&quot;inverted_index&quot;</span>) <span class="hljs-comment">// Name of the index to be created</span>
    .indexType(<span class="hljs-string">&quot;INVERTED&quot;</span>) <span class="hljs-comment">// Type of index to be created</span>
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>) <span class="hljs-comment">// Specify the collection name</span>
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment">// Specify the collection name</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;inverted_index&quot;</span>, <span class="hljs-comment">// Name of the index to be created</span>
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span> <span class="hljs-comment">// Type of index to be created</span>
})
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p><strong>Методы и параметры</strong></p>
<ul>
<li><p><strong>prepare_index_params()</strong></p>
<p>Подготавливает объект <strong>IndexParams</strong>.</p></li>
<li><p><strong>add_index()</strong></p>
<p>Добавляет конфигурации индекса в объект <strong>IndexParams</strong>.</p>
<ul>
<li><p><strong>имя_поля</strong><em>(строка</em>)</p>
<p>Имя скалярного поля для индексации.</p></li>
<li><p><strong>index_type</strong><em>(строка</em>):</p>
<p>Тип создаваемого скалярного индекса. Для неявного индексирования оставьте его пустым или опустите этот параметр.</p>
<p>Для пользовательского индексирования допустимыми значениями являются:</p>
<ul>
<li><p><strong>INVERTED</strong>: (Рекомендуется) Инвертированный индекс состоит из словаря терминов, содержащего все токенизированные слова, отсортированные в алфавитном порядке. Подробнее см. в разделе <a href="/docs/ru/v2.4.x/scalar_index.md">Скалярный индекс</a>.</p></li>
<li><p><strong>STL_SORT</strong>: Сортирует скалярные поля с помощью стандартного алгоритма сортировки библиотеки шаблонов. Поддерживаются только числовые поля (например, INT8, INT16, INT32, INT64, FLOAT, DOUBLE).</p></li>
<li><p><strong>Trie</strong>: Древовидная структура данных для быстрого поиска и извлечения префиксов. Поддерживает поля VARCHAR.</p></li>
</ul></li>
<li><p><strong>имя_индекса</strong><em>(строка</em>)</p>
<p>Имя создаваемого скалярного индекса. Каждое скалярное поле поддерживает один индекс.</p></li>
</ul></li>
<li><p><strong>create_index()</strong></p>
<p>Создает индекс в указанной коллекции.</p>
<ul>
<li><p><strong>имя_коллекции</strong><em>(строка</em>)</p>
<p>Имя коллекции, для которой создается индекс.</p></li>
<li><p><strong>index_params</strong></p>
<p>Объект <strong>IndexParams</strong>, содержащий конфигурации индекса.</p></li>
</ul></li>
</ul>
</div>
<div class="language-java">
<p><strong>Методы и параметры</strong></p>
<ul>
<li><strong>IndexParam</strong>Подготавливает объект IndexParam.<ul>
<li><strong>fieldName</strong><em>(String</em>) Имя скалярного поля для индексации.</li>
<li><strong>indexName</strong><em>(String</em>) Имя создаваемого скалярного индекса. Каждое скалярное поле поддерживает один индекс.</li>
<li><strong>indexType</strong><em>(String</em>) Тип создаваемого скалярного индекса. Для неявного индексирования оставьте его пустым или опустите этот параметр. Для пользовательского индексирования допустимыми значениями являются:<ul>
<li><strong>INVERTED</strong>: (Рекомендуется) Инвертированный индекс состоит из словаря терминов, содержащего все токенизированные слова, отсортированные в алфавитном порядке. Подробнее см. в разделе <a href="/docs/ru/v2.4.x/scalar_index.md">Скалярный индекс</a>.</li>
<li><strong>STL_SORT</strong>: Сортирует скалярные поля с помощью стандартного алгоритма сортировки библиотеки шаблонов. Поддерживает булевы и числовые поля (например, INT8, INT16, INT32, INT64, FLOAT, DOUBLE).</li>
<li><strong>Trie</strong>: Древовидная структура данных для быстрого поиска и извлечения префиксов. Поддерживает поля VARCHAR.</li>
</ul></li>
</ul></li>
<li><strong>CreateIndexReq</strong>Создает индекс в указанной коллекции.<ul>
<li><strong>collectionName</strong><em>(String</em>) Имя коллекции, для которой создается индекс.</li>
<li><strong>indexParams</strong><em>(List<IndexParam></em>) Список объектов IndexParam, содержащих конфигурации индекса.</li>
</ul></li>
</ul>
</div>
<div class="language-javascript">
<p><strong>Методы и параметры</strong></p>
<ul>
<li><p><strong>createIndex</strong></p>
<p>Создает индекс в указанной коллекции.</p>
<ul>
<li><strong>Имя_коллекции</strong><em>(строка</em>) Имя коллекции, для которой создается индекс.</li>
<li><strong>имя_поля</strong><em>(строка</em>) Имя скалярного поля для индексации.</li>
<li><strong>index_name</strong><em>(string</em>) Имя создаваемого скалярного индекса. Каждое скалярное поле поддерживает один индекс.</li>
<li><strong>index_type</strong><em>(строка</em>) Тип создаваемого скалярного индекса. Для неявного индексирования оставьте его пустым или опустите этот параметр. Для пользовательского индексирования допустимыми значениями являются:<ul>
<li><strong>INVERTED</strong>: (рекомендуется) Инвертированный индекс состоит из словаря терминов, содержащего все токенизированные слова, отсортированные в алфавитном порядке. Подробнее см. в разделе <a href="/docs/ru/v2.4.x/scalar_index.md">Скалярный индекс</a>.</li>
<li><strong>STL_SORT</strong>: Сортирует скалярные поля с помощью стандартного алгоритма сортировки библиотеки шаблонов. Поддерживает булевы и числовые поля (например, INT8, INT16, INT32, INT64, FLOAT, DOUBLE).</li>
<li><strong>Trie</strong>: Древовидная структура данных для быстрого поиска и извлечения префиксов. Поддерживает поля VARCHAR.</li>
</ul></li>
</ul></li>
</ul>
</div>
<h2 id="Verifying-the-result" class="common-anchor-header">Проверка результата<button data-href="#Verifying-the-result" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Используйте метод <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> для проверки создания скалярных индексов:</p>
</div>
<div class="language-java">
<p>Используйте метод <code translate="no">listIndexes()</code> для проверки создания скалярных индексов:</p>
</div>
<div class="language-javascript">
<p>Используйте метод <code translate="no">listIndexes()</code> для проверки создания скалярных индексов:</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.list_indexes(
    collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>  <span class="hljs-comment"># Specify the collection name</span>
)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [&#x27;default_index&#x27;,&#x27;inverted_index&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.ListIndexesReq;

<span class="hljs-type">ListIndexesReq</span> <span class="hljs-variable">listIndexesReq</span> <span class="hljs-operator">=</span> ListIndexesReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>)  <span class="hljs-comment">// Specify the collection name</span>
    .build();

List&lt;String&gt; indexNames = client.listIndexes(listIndexesReq);

System.out.println(indexNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;default_index&quot;,</span>
<span class="hljs-comment">//     &quot;inverted_index&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listIndexes</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;test_scalar_index&#x27;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">indexes</span>)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;default_index&quot;,</span>
<span class="hljs-comment">//     &quot;inverted_index&quot;</span>
<span class="hljs-comment">// ]   </span>
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
    </button></h2><ul>
<li>В настоящее время скалярная индексация поддерживает типы данных INT8, INT16, INT32, INT64, FLOAT, DOUBLE, BOOL, VARCHAR и ARRAY, но не тип данных JSON.</li>
</ul>
