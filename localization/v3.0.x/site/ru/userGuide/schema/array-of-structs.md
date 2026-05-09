---
id: array-of-structs.md
title: Массив структур
summary: >-
  Используйте поля StructArray для хранения упорядоченных элементов Struct с
  общей схемой векторных и скалярных полей.
---
<h1 id="StructArray" class="common-anchor-header">Массив структур<button data-href="#StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Поле Array of Structs, или StructArray, в сущности хранит упорядоченный набор элементов Struct. Каждая структура в массиве имеет одну и ту же предопределенную схему, состоящую из нескольких векторов и скалярных полей.</p>
<p>Вот пример сущности из коллекции, содержащей поле StructArray.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    &#x27;id&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
    &#x27;title&#x27;<span class="hljs-punctuation">:</span> &#x27;Walden&#x27;<span class="hljs-punctuation">,</span>
    &#x27;title_vector&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.4</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.5</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    &#x27;author&#x27;<span class="hljs-punctuation">:</span> &#x27;Henry David Thoreau&#x27;<span class="hljs-punctuation">,</span>
    &#x27;year_of_publication&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-number">1845</span><span class="hljs-punctuation">,</span>
<span class="highlighted-comment-line">    &#x27;chunks&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span></span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">{</span></span>
<span class="highlighted-comment-line">            &#x27;text&#x27;<span class="hljs-punctuation">:</span> &#x27;When I wrote the following pages<span class="hljs-punctuation">,</span> or rather the bulk of them...&#x27;<span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;text_vector&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.5</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;chapter&#x27;<span class="hljs-punctuation">:</span> &#x27;Economy&#x27;<span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">{</span></span>
<span class="highlighted-comment-line">            &#x27;text&#x27;<span class="hljs-punctuation">:</span> &#x27;I would fain say something<span class="hljs-punctuation">,</span> not so much concerning the Chinese and...&#x27;<span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;text_vector&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.7</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.4</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.7</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.8</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;chapter&#x27;<span class="hljs-punctuation">:</span> &#x27;Economy&#x27;</span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">}</span></span>
<span class="highlighted-comment-line">    <span class="hljs-punctuation">]</span></span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// hightlight-end</span></span>
<span class="highlighted-comment-line"><span class="hljs-punctuation">}</span></span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<p>В приведенном примере поле <code translate="no">chunks</code> является полем StructArray, а каждый элемент Struct содержит свои собственные поля, а именно <code translate="no">text</code>, <code translate="no">text_vector</code> и <code translate="no">chapter</code>.</p>
<h2 id="When-to-use" class="common-anchor-header">Когда использовать<button data-href="#When-to-use" class="anchor-icon" translate="no">
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
    </button></h2><p>Современные приложения искусственного интеллекта, от автономного вождения до мультимодального поиска, все чаще опираются на вложенные разнородные данные. Традиционные плоские модели данных с трудом справляются с представлением сложных отношений, таких как<strong>"один документ с множеством аннотированных фрагментов</strong>" или<strong>"одна сцена вождения с множеством наблюдаемых маневров</strong>". Именно здесь тип данных StructArray в Milvus проявляет себя наилучшим образом.</p>
<p>Чтобы быстро определить, подходит ли поле StructArray для ваших сценариев применения, подумайте, подходят ли:</p>
<ul>
<li><p>Ваши данные имеют иерархическую структуру, например, один документ с множеством аннотированных фрагментов.</p></li>
<li><p>Результатом поиска должен быть документ, а не фрагменты, как в примере выше.</p></li>
<li><p>Результаты поиска содержат большое количество дубликатов, и вы с трудом извлекаете конечные результаты, используя такие методы, как группировка, дедупликация и повторное ранжирование.</p></li>
</ul>
<p>Если ваши ответы на вопросы выше утвердительны, вам следует использовать StructArray.</p>
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
<li><p><strong>Типы данных</strong></p>
<p>При создании коллекции вы можете использовать тип Struct в качестве типа данных для элементов в поле Array. Однако вы не можете добавить StructArray в существующую коллекцию, и Milvus не поддерживает использование типа Struct в качестве типа данных для поля коллекции.</p>
<p>Структуры в поле Array имеют одну и ту же схему, которая должна быть определена при создании поля Array.</p>
<p>Схема Struct содержит как векторные, так и скалярные поля, как указано ниже:</p>
<p><Grid columnSize="2" widthRatios="50,50"></p>
<pre><code translate="no">  &lt;div&gt;

      Applicable vector fields:

      - `FLOAT_VECTOR`

      - `FLOAT16_VECTOR`

      - `BFLOAT16_VECTOR`

      - `INT8_VECTOR`

      - `BINARY_VECTOR`

  &lt;/div&gt;

  &lt;div&gt;

      Applicable scalar fields:

      - `VARCHAR`

      - `INT8/16/32/64`

      - `FLOAT`

      - `DOUBLE`

      - `BOOL`

  &lt;/div&gt;
</code></pre>
<p></Grid></p>
<p>Следите за тем, чтобы количество векторных полей как на уровне коллекции, так и в Structs не превышало 10.</p></li>
<li><p><strong>Нулевые и значения по умолчанию</strong></p>
<p>Поле StructArray не является нулевым и не принимает значения по умолчанию.</p></li>
<li><p><strong>Функция</strong></p>
<p>Вы не можете использовать функцию для получения векторного поля из скалярного поля внутри Struct.</p></li>
<li><p><strong>Тип индекса и тип метрики</strong></p>
<p>Все векторные поля в коллекции должны быть проиндексированы. Чтобы проиндексировать векторное поле в поле StructArray, Milvus использует список вкраплений для организации векторных вкраплений в каждом элементе Struct и индексирует весь список вкраплений как единое целое.</p>
<p>Вы можете использовать <code translate="no">AUTOINDEX</code> или <code translate="no">HNSW</code> в качестве типа индекса и любой метрический тип, перечисленный ниже, чтобы построить индексы для списков вкраплений в поле StructArray.</p>
<p><table>
<tr>
<th><p>Тип индекса</p></th>
<th><p>Метрический тип</p></th>
<th><p>Примечания</p></th>
</tr>
<tr>
<td rowspan="3"><ul><li><p><code translate="no">AUTOINDEX</code></p></li><li><p><code translate="no">HNSW</code></p></li><li><p><code translate="no">IVF_FLAT</code></p></li><li><p><code translate="no">DISKANN</code></p></li></ul></td>
<td rowspan="3"><ul><li><p><code translate="no">MAX_SIM_COSINE</code></p></li><li><p><code translate="no">MAX_SIM_IP</code></p></li><li><p><code translate="no">MAX_SIM_L2</code></p></li></ul></td>
<td rowspan="3"><p>Для списков встраивания следующих типов:</p><ul><li><p><code translate="no">FLOAT_VECTOR</code></p></li><li><p><code translate="no">FLOAT16_VECTOR</code></p></li><li><p><code translate="no">BFLOAT16_VECTOR</code></p></li><li><p><code translate="no">INT8_VECTOR</code></p></li><li><p><code translate="no">BINARY_VECTOR</code></p></li></ul></td>
</tr>
</table></p>
<p>Подробные сведения о том, как Milvus вычисляет сходство между запросом и списком вложений, см. в разделе <a href="/docs/ru/metric.md#Maximum-similarity">Максимальное сходство</a>.</p>
<p>Скалярные поля в поле StructArray поддерживают следующие типы индексов:</p>
<ul>
<li><p><code translate="no">INVERTED</code></p>
<p>Обычно это относится к строкоподобным или категориальным фильтрам, например <code translate="no">structA[color]</code> или <code translate="no">structA[str_val]</code>. Подробнее см. в разделе <a href="/docs/ru/inverted.md">INVERTED</a>.</p></li>
<li><p><code translate="no">STL_SORT</code></p>
<p>Обычно это относится к ускорению диапазона или порядка для числовых значений, например <code translate="no">strctA[num_val]</code>. Подробнее см. в разделе <a href="/docs/ru/stl-sort.md">STL_SORT</a>.</p></li>
</ul></li>
<li><p><strong>Данные для апсерт</strong></p>
<p>Структуры не поддерживают апсерт в режиме слияния. Однако вы можете выполнять апсерт в режиме переопределения для обновления данных в структурах. Подробнее о различиях между апсерт в режиме слияния и в режиме переопределения см. в разделе <a href="/docs/ru/upsert-entities.md#Overview">Апсерт сущностей</a>.</p></li>
<li><p><strong>Скалярная фильтрация</strong></p>
<p>Вы можете использовать <strong>фильтры элементов</strong> и <strong>операторы семейства match</strong> для скалярной фильтрации по скалярному подполю в поле StructArray. Подробнее см. в разделе <a href="/docs/ru/array-of-structs.md#Scalar-filtering-in-a-StructArray-field">Скалярная фильтрация в поле StructArray</a>.</p></li>
</ul>
<h2 id="Add-a-StructArray" class="common-anchor-header">Добавление массива StructArray<button data-href="#Add-a-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы добавить поле StructArray в Milvus, вам нужно определить поле массива при создании коллекции и установить тип данных для его элементов на Struct. Процесс выглядит следующим образом:</p>
<ol>
<li><p>Установите тип данных поля <code translate="no">DataType.ARRAY</code> при добавлении поля как поля Array в схему коллекции.</p></li>
<li><p>Установите для атрибута <code translate="no">element_type</code> поля значение <code translate="no">DataType.STRUCT</code>, чтобы сделать поле массивом Struct.</p></li>
<li><p>Создайте схему Struct и включите в нее необходимые поля. Затем сделайте ссылку на схему Struct в атрибуте поля <code translate="no">struct_schema</code>.</p></li>
<li><p>Установите для атрибута <code translate="no">max_capacity</code> поля соответствующее значение, чтобы указать максимальное количество структур, которые каждая сущность может содержать в этом поле.</p></li>
<li><p><strong>(Необязательно</strong>) Вы можете установить <code translate="no">mmap.enabled</code> для любого поля в элементе Struct, чтобы сбалансировать горячие и холодные данные в Struct.</p></li>
</ol>
<p>Вот как можно определить схему коллекции, включающую поле StructArray:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

schema = client.create_schema()

<span class="hljs-comment"># add the primary field to the collection</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># add some scalar fields to the collection</span>
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;author&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;year_of_publication&quot;</span>, datatype=DataType.INT64)

<span class="hljs-comment"># add a vector field to the collection</span>
schema.add_field(field_name=<span class="hljs-string">&quot;title_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line"><span class="hljs-comment"># Create a struct schema</span></span>
<span class="highlighted-comment-line">struct_schema = client.create_struct_field_schema()</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># add a scalar field to the struct</span></span>
<span class="highlighted-comment-line">struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)</span>
<span class="highlighted-comment-line">struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># add a vector field to the struct with mmap enabled</span></span>
<span class="highlighted-comment-line">struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># reference the struct schema in an Array field with its </span></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># element type set to `DataType.STRUCT`</span></span>
<span class="highlighted-comment-line">schema.add_field(<span class="hljs-string">&quot;chunks&quot;</span>, datatype=DataType.ARRAY, element_type=DataType.STRUCT, </span>
<span class="highlighted-comment-line">                    struct_schema=struct_schema, max_capacity=<span class="hljs-number">1000</span>)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">collectionSchema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;author&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;year_of_publication&quot;</span>)
        .dataType(DataType.Int64)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

Map&lt;String, String&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;mmap_enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;chunks&quot;</span>)
        .dataType(DataType.Array)
        .elementType(DataType.Struct)
        .maxCapacity(<span class="hljs-number">1000</span>)
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">65535</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;chapter&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">512</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
                .dataType(DataType.FloatVector)
                .dimension(VECTOR_DIM)
                .typeParams(params)
                .build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">INT64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;author&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;year_of_publication&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">INT64</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FLOAT_VECTOR</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,
  },
<span class="highlighted-comment-line">  {</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">ARRAY</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">STRUCT</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">fields</span>: [</span>
<span class="highlighted-comment-line">      {</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">max_length</span>: <span class="hljs-number">65535</span>,</span>
<span class="highlighted-comment-line">      },</span>
<span class="highlighted-comment-line">      {</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chapter&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,</span>
<span class="highlighted-comment-line">      },</span>
<span class="highlighted-comment-line">      {</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_vector&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FLOAT_VECTOR</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">mmap_enabled</span>: <span class="hljs-literal">true</span>,</span>
<span class="highlighted-comment-line">      },</span>
<span class="highlighted-comment-line">    ],</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">1000</span>,</span>
<span class="highlighted-comment-line">  },</span>
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
SCHEMA=<span class="hljs-string">&#x27;{
  &quot;autoID&quot;: true,
  &quot;fields&quot;: [
    {
      &quot;fieldName&quot;: &quot;id&quot;,
      &quot;dataType&quot;: &quot;Int64&quot;,
      &quot;isPrimary&quot;: true
    },
    {
      &quot;fieldName&quot;: &quot;title&quot;,
      &quot;dataType&quot;: &quot;VarChar&quot;,
      &quot;elementTypeParams&quot;: { &quot;max_length&quot;: &quot;512&quot; }
    },
    {
      &quot;fieldName&quot;: &quot;author&quot;,
      &quot;dataType&quot;: &quot;VarChar&quot;,
      &quot;elementTypeParams&quot;: { &quot;max_length&quot;: &quot;512&quot; }
    },
    {
      &quot;fieldName&quot;: &quot;year_of_publication&quot;,
      &quot;dataType&quot;: &quot;Int64&quot;
    },
    {
      &quot;fieldName&quot;: &quot;title_vector&quot;,
      &quot;dataType&quot;: &quot;FloatVector&quot;,
      &quot;elementTypeParams&quot;: { &quot;dim&quot;: &quot;5&quot; }
    }
  ],
  &quot;structArrayFields&quot;: [
    {
      &quot;name&quot;: &quot;chunks&quot;,
      &quot;description&quot;: &quot;Array of document chunks with text and vectors&quot;,
      &quot;elementTypeParams&quot;:{
         &quot;max_capacity&quot;: 1000
      },
      &quot;fields&quot;: [
        {
          &quot;fieldName&quot;: &quot;text&quot;,
          &quot;dataType&quot;: &quot;VarChar&quot;,
          &quot;elementTypeParams&quot;: { &quot;max_length&quot;: &quot;65535&quot; }
        },
        {
          &quot;fieldName&quot;: &quot;chapter&quot;,
          &quot;dataType&quot;: &quot;VarChar&quot;,
          &quot;elementTypeParams&quot;: { &quot;max_length&quot;: &quot;512&quot; }
        },
        {
          &quot;fieldName&quot;: &quot;text_vector&quot;,
          &quot;dataType&quot;: &quot;FloatVector&quot;,
          &quot;elementTypeParams&quot;: {
            &quot;dim&quot;: &quot;5&quot;,
            &quot;mmap_enabled&quot;: &quot;true&quot;
          }
        }
      ]
    }
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Выделенные строки в примере кода выше иллюстрируют, как включить StructArray в схему коллекции.</p>
<h2 id="Set-index-params" class="common-anchor-header">Установка индексных параметров<button data-href="#Set-index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Индексирование является обязательным для всех векторных полей, включая как векторные поля в коллекции, так и поля, определенные в элементе Struct.</p>
<p>Применимые параметры индекса зависят от типа индекса. Для получения подробной информации о применимых параметрах индекса обратитесь к разделу <a href="/docs/ru/index-explained.md">Объяснение индекса</a> и документации по выбранному типу индекса.</p>
<h3 id="Index-an-embedding-list" class="common-anchor-header">Индексирование списка встраивания<button data-href="#Index-an-embedding-list" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы проиндексировать список встраивания, необходимо установить тип индекса <code translate="no">AUTOINDEX</code> или любой из применимых типов индексов, перечисленных выше, и использовать указанный тип метрики для Milvus для измерения сходства между списками встраивания.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Create an index for the vector field in the collection</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
)

<span class="highlighted-comment-line"><span class="hljs-comment"># Create an index for the vector field in the element Struct</span></span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;title_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.MAX_SIM_COSINE)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;books&quot;</span>,
  <span class="hljs-attr">fields</span>: schema,
});

<span class="hljs-keyword">const</span> indexParams = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span>,
  },
<span class="highlighted-comment-line">  {</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,</span>
<span class="highlighted-comment-line">  },</span>
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
INDEX_PARAMS=<span class="hljs-string">&#x27;[
  {
    &quot;fieldName&quot;: &quot;title_vector&quot;,
    &quot;indexName&quot;: &quot;title_vector_index&quot;,
    &quot;indexType&quot;: &quot;AUTOINDEX&quot;,
    &quot;metricType&quot;: &quot;L2&quot;
  },
  {
    &quot;fieldName&quot;: &quot;chunks[text_vector]&quot;,
    &quot;indexName&quot;: &quot;chunks_text_vector_index&quot;,
    &quot;indexType&quot;: &quot;AUTOINDEX&quot;,
    &quot;metricType&quot;: &quot;MAX_SIM_COSINE&quot;
  }
]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Index-a-scalar-struct-sub-field" class="common-anchor-header">Индексирование вложенного поля скалярной структуры<button data-href="#Index-a-scalar-struct-sub-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Когда вы создаете индексы для скалярного подполя struct, Milvus фактически строит индекс на <strong>уровне элемента</strong>, а не на уровне строки, чтобы ускорить скалярную фильтрацию.</p>
<p>Следующий фрагмент кода создает индекс на подполе scalar struct с именем <code translate="no">chunks[text]</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[text]&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;chunks[text]&quot;</span>)
        .indexType(IndexParam.IndexType.INVERTED)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[text]&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">INDEX_PARAMS += <span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;chunks[text]&quot;,
    &quot;indexName&quot;: &quot;chunks_text_vector_index&quot;,
    &quot;indexType&quot;: &quot;INVERTED&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-collection" class="common-anchor-header">Создание коллекции<button data-href="#Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Когда схема и индекс готовы, можно создать коллекцию, включающую поле StructArray.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(collectionSchema)
        .indexParams(indexParams)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">fields</span>: schema,
  <span class="hljs-attr">indexes</span>: indexParams,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/create&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;description\&quot;: \&quot;A collection for storing book information with struct array chunks\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$SCHEMA</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$INDEX_PARAMS</span>
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">Вставка данных<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>После создания коллекции вы можете вставить данные, включающие массивы структур, следующим образом.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample data</span>
data = {
    <span class="hljs-string">&#x27;title&#x27;</span>: <span class="hljs-string">&#x27;Walden&#x27;</span>,
    <span class="hljs-string">&#x27;title_vector&#x27;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
    <span class="hljs-string">&#x27;author&#x27;</span>: <span class="hljs-string">&#x27;Henry David Thoreau&#x27;</span>,
    <span class="hljs-string">&#x27;year_of_publication&#x27;</span>: <span class="hljs-number">1845</span>,
    <span class="hljs-string">&#x27;chunks&#x27;</span>: [
        {
            <span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;When I wrote the following pages, or rather the bulk of them...&#x27;</span>,
            <span class="hljs-string">&#x27;text_vector&#x27;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.5</span>],
            <span class="hljs-string">&#x27;chapter&#x27;</span>: <span class="hljs-string">&#x27;Economy&#x27;</span>,
        },
        {
            <span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;I would fain say something, not so much concerning the Chinese and...&#x27;</span>,
            <span class="hljs-string">&#x27;text_vector&#x27;</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>],
            <span class="hljs-string">&#x27;chapter&#x27;</span>: <span class="hljs-string">&#x27;Economy&#x27;</span>
        }
    ]
}

<span class="hljs-comment"># insert data</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[data]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonArray;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;Walden&quot;</span>);
row.add(<span class="hljs-string">&quot;title_vector&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>)));
row.addProperty(<span class="hljs-string">&quot;author&quot;</span>, <span class="hljs-string">&quot;Henry David Thoreau&quot;</span>);
row.addProperty(<span class="hljs-string">&quot;year_of_publication&quot;</span>, <span class="hljs-number">1845</span>);

<span class="hljs-type">JsonArray</span> <span class="hljs-variable">structArr</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonArray</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">struct1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
struct1.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;When I wrote the following pages, or rather the bulk of them...&quot;</span>);
struct1.add(<span class="hljs-string">&quot;text_vector&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.3f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.5f</span>)));
struct1.addProperty(<span class="hljs-string">&quot;chapter&quot;</span>, <span class="hljs-string">&quot;Economy&quot;</span>);
structArr.add(struct1);
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">struct2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
struct2.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;I would fain say something, not so much concerning the Chinese and...&quot;</span>);
struct2.add(<span class="hljs-string">&quot;text_vector&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.7f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.7f</span>, <span class="hljs-number">0.8f</span>)));
struct2.addProperty(<span class="hljs-string">&quot;chapter&quot;</span>, <span class="hljs-string">&quot;Economy&quot;</span>);
structArr.add(struct2);

row.add(<span class="hljs-string">&quot;chunks&quot;</span>, structArr);

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(row))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">  {
    <span class="hljs-attr">id</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Walden&quot;</span>,
    <span class="hljs-attr">title_vector</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
    <span class="hljs-attr">author</span>: <span class="hljs-string">&quot;Henry David Thoreau&quot;</span>,
    <span class="hljs-string">&quot;year-of-publication&quot;</span>: <span class="hljs-number">1845</span>,
    <span class="hljs-attr">chunks</span>: [
      {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;When I wrote the following pages, or rather the bulk of them...&quot;</span>,
        <span class="hljs-attr">text_vector</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.5</span>],
        <span class="hljs-attr">chapter</span>: <span class="hljs-string">&quot;Economy&quot;</span>,
      },
      {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;I would fain say something, not so much concerning the Chinese and...&quot;</span>,
        <span class="hljs-attr">text_vector</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>],
        <span class="hljs-attr">chapter</span>: <span class="hljs-string">&quot;Economy&quot;</span>,
      },
    ],
  },
];

<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;books&quot;</span>,
  <span class="hljs-attr">data</span>: data,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/insert&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
      {
        &quot;title&quot;: &quot;Walden&quot;,
        &quot;title_vector&quot;: [0.1, 0.2, 0.3, 0.4, 0.5],
        &quot;author&quot;: &quot;Henry David Thoreau&quot;,
        &quot;year_of_publication&quot;: 1845,
        &quot;chunks&quot;: [
          {
            &quot;text&quot;: &quot;When I wrote the following pages, or rather the bulk of them...&quot;,
            &quot;text_vector&quot;: [0.3, 0.2, 0.3, 0.2, 0.5],
            &quot;chapter&quot;: &quot;Economy&quot;
          },
          {
            &quot;text&quot;: &quot;I would fain say something, not so much concerning the Chinese and...&quot;,
            &quot;text_vector&quot;: [0.7, 0.4, 0.2, 0.7, 0.8],
            &quot;chapter&quot;: &quot;Economy&quot;
          }
        ]
      }
    ]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Нужно больше данных?</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>, <span class="hljs-type">Dict</span>, <span class="hljs-type">Any</span>

<span class="hljs-comment"># Real classic books (title, author, year)</span>
BOOKS = [
    (<span class="hljs-string">&quot;Pride and Prejudice&quot;</span>, <span class="hljs-string">&quot;Jane Austen&quot;</span>, <span class="hljs-number">1813</span>),
    (<span class="hljs-string">&quot;Moby Dick&quot;</span>, <span class="hljs-string">&quot;Herman Melville&quot;</span>, <span class="hljs-number">1851</span>),
    (<span class="hljs-string">&quot;Frankenstein&quot;</span>, <span class="hljs-string">&quot;Mary Shelley&quot;</span>, <span class="hljs-number">1818</span>),
    (<span class="hljs-string">&quot;The Picture of Dorian Gray&quot;</span>, <span class="hljs-string">&quot;Oscar Wilde&quot;</span>, <span class="hljs-number">1890</span>),
    (<span class="hljs-string">&quot;Dracula&quot;</span>, <span class="hljs-string">&quot;Bram Stoker&quot;</span>, <span class="hljs-number">1897</span>),
    (<span class="hljs-string">&quot;The Adventures of Sherlock Holmes&quot;</span>, <span class="hljs-string">&quot;Arthur Conan Doyle&quot;</span>, <span class="hljs-number">1892</span>),
    (<span class="hljs-string">&quot;Alice&#x27;s Adventures in Wonderland&quot;</span>, <span class="hljs-string">&quot;Lewis Carroll&quot;</span>, <span class="hljs-number">1865</span>),
    (<span class="hljs-string">&quot;The Time Machine&quot;</span>, <span class="hljs-string">&quot;H.G. Wells&quot;</span>, <span class="hljs-number">1895</span>),
    (<span class="hljs-string">&quot;The Scarlet Letter&quot;</span>, <span class="hljs-string">&quot;Nathaniel Hawthorne&quot;</span>, <span class="hljs-number">1850</span>),
    (<span class="hljs-string">&quot;Leaves of Grass&quot;</span>, <span class="hljs-string">&quot;Walt Whitman&quot;</span>, <span class="hljs-number">1855</span>),
    (<span class="hljs-string">&quot;The Brothers Karamazov&quot;</span>, <span class="hljs-string">&quot;Fyodor Dostoevsky&quot;</span>, <span class="hljs-number">1880</span>),
    (<span class="hljs-string">&quot;Crime and Punishment&quot;</span>, <span class="hljs-string">&quot;Fyodor Dostoevsky&quot;</span>, <span class="hljs-number">1866</span>),
    (<span class="hljs-string">&quot;Anna Karenina&quot;</span>, <span class="hljs-string">&quot;Leo Tolstoy&quot;</span>, <span class="hljs-number">1877</span>),
    (<span class="hljs-string">&quot;War and Peace&quot;</span>, <span class="hljs-string">&quot;Leo Tolstoy&quot;</span>, <span class="hljs-number">1869</span>),
    (<span class="hljs-string">&quot;Great Expectations&quot;</span>, <span class="hljs-string">&quot;Charles Dickens&quot;</span>, <span class="hljs-number">1861</span>),
    (<span class="hljs-string">&quot;Oliver Twist&quot;</span>, <span class="hljs-string">&quot;Charles Dickens&quot;</span>, <span class="hljs-number">1837</span>),
    (<span class="hljs-string">&quot;Wuthering Heights&quot;</span>, <span class="hljs-string">&quot;Emily Brontë&quot;</span>, <span class="hljs-number">1847</span>),
    (<span class="hljs-string">&quot;Jane Eyre&quot;</span>, <span class="hljs-string">&quot;Charlotte Brontë&quot;</span>, <span class="hljs-number">1847</span>),
    (<span class="hljs-string">&quot;The Call of the Wild&quot;</span>, <span class="hljs-string">&quot;Jack London&quot;</span>, <span class="hljs-number">1903</span>),
    (<span class="hljs-string">&quot;The Jungle Book&quot;</span>, <span class="hljs-string">&quot;Rudyard Kipling&quot;</span>, <span class="hljs-number">1894</span>),
]

<span class="hljs-comment"># Common chapter names for classics</span>
CHAPTERS = [
    <span class="hljs-string">&quot;Introduction&quot;</span>, <span class="hljs-string">&quot;Prologue&quot;</span>, <span class="hljs-string">&quot;Chapter I&quot;</span>, <span class="hljs-string">&quot;Chapter II&quot;</span>, <span class="hljs-string">&quot;Chapter III&quot;</span>,
    <span class="hljs-string">&quot;Chapter IV&quot;</span>, <span class="hljs-string">&quot;Chapter V&quot;</span>, <span class="hljs-string">&quot;Chapter VI&quot;</span>, <span class="hljs-string">&quot;Chapter VII&quot;</span>, <span class="hljs-string">&quot;Chapter VIII&quot;</span>,
    <span class="hljs-string">&quot;Chapter IX&quot;</span>, <span class="hljs-string">&quot;Chapter X&quot;</span>, <span class="hljs-string">&quot;Epilogue&quot;</span>, <span class="hljs-string">&quot;Conclusion&quot;</span>, <span class="hljs-string">&quot;Afterword&quot;</span>,
    <span class="hljs-string">&quot;Economy&quot;</span>, <span class="hljs-string">&quot;Where I Lived&quot;</span>, <span class="hljs-string">&quot;Reading&quot;</span>, <span class="hljs-string">&quot;Sounds&quot;</span>, <span class="hljs-string">&quot;Solitude&quot;</span>,
    <span class="hljs-string">&quot;Visitors&quot;</span>, <span class="hljs-string">&quot;The Bean-Field&quot;</span>, <span class="hljs-string">&quot;The Village&quot;</span>, <span class="hljs-string">&quot;The Ponds&quot;</span>, <span class="hljs-string">&quot;Baker Farm&quot;</span>
]

<span class="hljs-comment"># Placeholder text snippets (mimicking 19th-century prose)</span>
TEXT_SNIPPETS = [
    <span class="hljs-string">&quot;When I wrote the following pages, or rather the bulk of them...&quot;</span>,
    <span class="hljs-string">&quot;I would fain say something, not so much concerning the Chinese and...&quot;</span>,
    <span class="hljs-string">&quot;It is a truth universally acknowledged, that a single man in possession...&quot;</span>,
    <span class="hljs-string">&quot;Call me Ishmael. Some years ago—never mind how long precisely...&quot;</span>,
    <span class="hljs-string">&quot;It was the best of times, it was the worst of times...&quot;</span>,
    <span class="hljs-string">&quot;All happy families are alike; each unhappy family is unhappy in its own way.&quot;</span>,
    <span class="hljs-string">&quot;Whether I shall turn out to be the hero of my own life, or whether that station...&quot;</span>,
    <span class="hljs-string">&quot;You will rejoice to hear that no disaster has accompanied the commencement...&quot;</span>,
    <span class="hljs-string">&quot;The world is too much with us; late and soon, getting and spending...&quot;</span>,
    <span class="hljs-string">&quot;He was an old man who fished alone in a skiff in the Gulf Stream...&quot;</span>
]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">random_vector</span>() -&gt; <span class="hljs-type">List</span>[<span class="hljs-built_in">float</span>]:
    <span class="hljs-keyword">return</span> [<span class="hljs-built_in">round</span>(random.random(), <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>)]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_chunk</span>() -&gt; <span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]:
    <span class="hljs-keyword">return</span> {
        <span class="hljs-string">&quot;text&quot;</span>: random.choice(TEXT_SNIPPETS),
        <span class="hljs-string">&quot;text_vector&quot;</span>: random_vector(),
        <span class="hljs-string">&quot;chapter&quot;</span>: random.choice(CHAPTERS)
    }

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_record</span>(<span class="hljs-params">record_id: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]:
    title, author, year = random.choice(BOOKS)
    num_chunks = random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">5</span>)  <span class="hljs-comment"># 1 to 5 chunks per book</span>
    chunks = [generate_chunk() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_chunks)]
    <span class="hljs-keyword">return</span> {
        <span class="hljs-string">&quot;title&quot;</span>: title,
        <span class="hljs-string">&quot;title_vector&quot;</span>: random_vector(),
        <span class="hljs-string">&quot;author&quot;</span>: author,
        <span class="hljs-string">&quot;year_of_publication&quot;</span>: year,
        <span class="hljs-string">&quot;chunks&quot;</span>: chunks
    }

<span class="hljs-comment"># Generate 1000 records</span>
data = [generate_record(i) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>)]

<span class="hljs-comment"># Insert the generated data</span>
client.insert(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, data=data)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h2 id="Vector-search-in-a-StructArray-field" class="common-anchor-header">Векторный поиск в поле StructArray<button data-href="#Vector-search-in-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете выполнять векторный поиск в векторных полях коллекции и в StructArray.</p>
<p>В частности, вы должны объединить имя поля StructArray и имена целевых векторных полей в элементах Struct в качестве значения параметра <code translate="no">anns_field</code> в поисковом запросе и использовать <code translate="no">EmbeddingList</code> для аккуратной организации векторов запроса.</p>
<div class="alert note">
<p>Milvus предоставляет <code translate="no">EmbeddingList</code>, чтобы помочь вам более аккуратно организовать векторы запросов для поиска по списку вложений в StructArray. Каждый <code translate="no">EmbeddingList</code> содержит по меньшей мере векторное вложение и ожидает в ответ некоторое количество сущностей topK.</p>
<p>Однако <code translate="no">EmbeddingList</code> можно использовать только в запросах <code translate="no">search()</code> без параметров поиска по диапазону или группировке, не говоря уже о запросах <code translate="no">search_iterator()</code>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

<span class="hljs-comment"># each query embedding list triggers a single search</span>
embeddingList1 = EmbeddingList()
embeddingList1.add([<span class="hljs-number">0.2</span>, <span class="hljs-number">0.9</span>, <span class="hljs-number">0.4</span>, -<span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>])

embeddingList2 = EmbeddingList()
embeddingList2.add([-<span class="hljs-number">0.2</span>, -<span class="hljs-number">0.2</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.9</span>])
embeddingList2.add([-<span class="hljs-number">0.4</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>])

<span class="hljs-comment"># a search with a single embedding list</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[ embeddingList1 ],
    anns_field=<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>},
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;chunks[text]&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddingList;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;

<span class="hljs-type">EmbeddingList</span> <span class="hljs-variable">embeddingList1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddingList</span>();
embeddingList1.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.2f</span>, <span class="hljs-number">0.9f</span>, <span class="hljs-number">0.4f</span>, -<span class="hljs-number">0.3f</span>, <span class="hljs-number">0.2f</span>}));

<span class="hljs-type">EmbeddingList</span> <span class="hljs-variable">embeddingList2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddingList</span>();
embeddingList2.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.2f</span>, -<span class="hljs-number">0.2f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.9f</span>}));
embeddingList2.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.4f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.8f</span>, <span class="hljs-number">0.2f</span>}));

Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .annsField(<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>)
        .data(Collections.singletonList(embeddingList1))
        .searchParams(params)
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;chunks[text]&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> embeddingList1 = [[<span class="hljs-number">0.2</span>, <span class="hljs-number">0.9</span>, <span class="hljs-number">0.4</span>, -<span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>]];
<span class="hljs-keyword">const</span> embeddingList2 = [
  [-<span class="hljs-number">0.2</span>, -<span class="hljs-number">0.2</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.9</span>],
  [-<span class="hljs-number">0.4</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>],
];
<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;books&quot;</span>,
  <span class="hljs-attr">data</span>: embeddingList1,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,
  <span class="hljs-attr">search_params</span>: { <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span> },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;chunks[text]&quot;</span>],
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
embeddingList1=<span class="hljs-string">&#x27;[[0.2,0.9,0.4,-0.3,0.2]]&#x27;</span>
embeddingList2=<span class="hljs-string">&#x27;[[-0.2,-0.2,0.5,0.6,0.9],[-0.4,0.3,0.5,0.8,0.2]]&#x27;</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;data\&quot;: [<span class="hljs-variable">$embeddingList1</span>],
    \&quot;annsField\&quot;: \&quot;chunks[text_vector]\&quot;,
    \&quot;searchParams\&quot;: {\&quot;metric_type\&quot;: \&quot;MAX_SIM_COSINE\&quot;},
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [\&quot;chunks[text]\&quot;]
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>В приведенном выше поисковом запросе используется <code translate="no">chunks[text_vector]</code> для ссылки на поле <code translate="no">text_vector</code> в элементах Struct. Вы можете использовать этот синтаксис для задания параметров <code translate="no">anns_field</code> и <code translate="no">output_fields</code>.</p>
<p>В результате будет получен список из трех наиболее похожих сущностей.</p>
<p><details></p>
<p><summary>Выход</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &#x27;id&#x27;: 461417939772144945,</span>
<span class="hljs-comment">#             &#x27;distance&#x27;: 0.9675756096839905,</span>
<span class="hljs-comment">#             &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#                 &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;All happy families are alike; each unhappy family is unhappy in its own way.&#x27;}</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &#x27;id&#x27;: 461417939772144965,</span>
<span class="hljs-comment">#             &#x27;distance&#x27;: 0.9555778503417969,</span>
<span class="hljs-comment">#             &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#                 &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;When I wrote the following pages, or rather the bulk of them...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;It was the best of times, it was the worst of times...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &#x27;id&#x27;: 461417939772144962,</span>
<span class="hljs-comment">#             &#x27;distance&#x27;: 0.9469035863876343,</span>
<span class="hljs-comment">#             &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#                 &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>В параметр <code translate="no">data</code> можно также включить несколько списков встраивания, чтобы получить результаты поиска для каждого из этих списков встраивания.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># a search with multiple embedding lists</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[ embeddingList1, embeddingList2 ],
    anns_field=<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>},
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;chunks[text]&quot;</span>]
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .annsField(<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>)
        .data(Arrays.asList(embeddingList1, embeddingList2))
        .searchParams(params)
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;chunks[text]&quot;</span>))
        .build());
        
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; searchResults.size(); i++) {
    System.out.println(<span class="hljs-string">&quot;Results of No.&quot;</span> + i + <span class="hljs-string">&quot; embedding list&quot;</span>);
    List&lt;SearchResp.SearchResult&gt; results = searchResults.get(i);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> results2 = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;books&quot;</span>,
  <span class="hljs-attr">data</span>: [embeddingList1, embeddingList2],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,
  <span class="hljs-attr">search_params</span>: { <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span> },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;chunks[text]&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;data\&quot;: [<span class="hljs-variable">$embeddingList1</span>, <span class="hljs-variable">$embeddingList2</span>],
    \&quot;annsField\&quot;: \&quot;chunks[text_vector]\&quot;,
    \&quot;searchParams\&quot;: {\&quot;metric_type\&quot;: \&quot;MAX_SIM_COSINE\&quot;},
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [\&quot;chunks[text]\&quot;]
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>В результате будет получен список из трех наиболее похожих сущностей для каждого списка встраивания.</p>
<p><details></p>
<p><summary>Вывод</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># [</span>
<span class="hljs-comment">#   [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144945,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 0.9675756096839905,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;All happy families are alike; each unhappy family is unhappy in its own way.&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144965,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 0.9555778503417969,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;When I wrote the following pages, or rather the bulk of them...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It was the best of times, it was the worst of times...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144962,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 0.9469035863876343,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment">#   ],</span>
<span class="hljs-comment">#   [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144663,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 1.9761409759521484,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It was the best of times, it was the worst of times...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It is a truth universally acknowledged, that a single man in possession...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Whether I shall turn out to be the hero of my own life, or whether that station...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144692,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 1.974656581878662,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It is a truth universally acknowledged, that a single man in possession...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144662,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 1.9406685829162598,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It is a truth universally acknowledged, that a single man in possession...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment">#   ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>В приведенном выше примере кода <code translate="no">embeddingList1</code> - это список встраивания, состоящий из одного вектора, а <code translate="no">embeddingList2</code> содержит два вектора. Каждый из них запускает отдельный поисковый запрос и ожидает список топ-K похожих сущностей.</p>
<h2 id="Scalar-filtering-in-a-StructArray-field" class="common-anchor-header">Скалярная фильтрация в поле StructArray<button data-href="#Scalar-filtering-in-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете использовать <strong>фильтры элементов</strong> и <strong>операторы семейства match</strong> для проведения скалярной фильтрации по скалярному подполю в StructArray. Более подробную информацию и примеры двух вышеуказанных типов операторов см. в разделе <a href="/docs/ru/struct-array-operators.md">Операторы массива структур</a>.</p>
<h3 id="Element-filters" class="common-anchor-header">Фильтры элементов<button data-href="#Element-filters" class="anchor-icon" translate="no">
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
    </button></h3><p>Это фильтр на уровне сущности, который проверяет, удовлетворяет ли предикату хотя бы один элемент в поле StructArray сущности. Например, следующий фильтр элементов возвращает сущности, которые содержат хотя бы один чанк, начинающийся с "Red" в подполе <code translate="no">text</code>.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[text] LIKE <span class="hljs-string">&quot;Red%&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>В предикате, который оценивается для каждого элемента, можно использовать почти все операторы сравнения, диапазона и арифметические операторы, а логические операторы можно использовать для объединения нескольких условий для одного элемента. Подробнее см. в разделе <a href="/docs/ru/basic-operators.md">Основные операторы</a>.</p>
<p>Если в отфильтрованном поиске или запросе присутствует несколько выражений скалярной фильтрации, поместите выражение фильтрации элемента после всех выражений фильтрации уровня сущности, как показано ниже.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># correct</span>
<span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span> &amp;&amp; element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>)

<span class="hljs-comment"># incorrect, resulting errors</span>
element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>) &amp;&amp; <span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-family-operators" class="common-anchor-header">Операторы семейства совпадений<button data-href="#Match-family-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Операторы семейства совпадений работают и над полем StructArray. Вместо того чтобы просто проверять, существует ли элемент, можно определить, сколько элементов (или какая доля) должны удовлетворять предикату элемента.</p>
<ul>
<li><p><code translate="no">MATCH_ANY(chunks, $[text] LIKE &quot;Red%&quot;)</code></p>
<p>Это возвращает сущности, которые содержат хотя бы один чанк, начинающийся с "Red" в подполе <code translate="no">text</code>; семантически это эквивалентно <code translate="no">element_filter</code>.</p></li>
<li><p><code translate="no">MATCH_ALL(chunks, $[text] LIKE &quot;Red%&quot;)</code></p>
<p>Это возвращает сущности, чьи текстовые подполя во всех чанках начинаются с "Red".</p></li>
<li><p><code translate="no">MATCH_LEAST(chunks, $[text] LIKE &quot;Red%&quot;, k)</code></p>
<p>Это возвращает сущности, содержащие не менее <code translate="no">k</code> блоков, которые начинаются с "Red" в подполе <code translate="no">text</code>.</p></li>
<li><p><code translate="no">MATCH_MOST(chunks, $[text] LIKE &quot;Red%&quot;, k)</code></p>
<p>Возвращаются сущности, содержащие не более <code translate="no">k</code> блоков, начинающихся с "Red" в подполе <code translate="no">text</code>.</p></li>
<li><p><code translate="no">MATCH_EXACT(chunks, $[text] LIKE &quot;Red%&quot;, k)</code></p>
<p>Возвращаются сущности, содержащие ровно <code translate="no">k</code> фрагментов, начинающихся с "Red" в подполе <code translate="no">text</code>.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Следующие шаги<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>Разработка собственного типа данных StructArray представляет собой значительный прогресс в возможностях Milvus по работе со сложными структурами данных. Чтобы лучше понять примеры использования и максимально использовать эту новую функцию, рекомендуем вам прочитать раздел <a href="/docs/ru/best-practices-for-array-of-structs.md">"Проектирование схем с использованием массива структур"</a>.</p>
