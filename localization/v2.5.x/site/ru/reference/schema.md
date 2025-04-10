---
id: schema.md
title: Объяснение схемы
summary: >-
  Схема определяет структуру данных коллекции. Прежде чем создавать коллекцию,
  необходимо разработать ее схему. Эта страница поможет вам понять схему
  коллекции и самостоятельно разработать пример схемы.
---
<h1 id="Schema-Explained" class="common-anchor-header">Объяснение схемы<button data-href="#Schema-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Схема определяет структуру данных коллекции. Прежде чем создавать коллекцию, необходимо разработать ее схему. Эта страница поможет вам понять схему коллекции и самостоятельно разработать пример схемы.</p>
<h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>В Zilliz Cloud схема коллекции представляет собой таблицу в реляционной базе данных, которая определяет, как Zilliz Cloud организует данные в коллекции.</p>
<p>Хорошо продуманная схема очень важна, поскольку она абстрагирует модель данных и определяет, можно ли достичь бизнес-целей с помощью поиска. Кроме того, поскольку каждая строка данных, вставляемая в коллекцию, должна соответствовать схеме, это помогает поддерживать согласованность данных и долгосрочное качество. С технической точки зрения четко определенная схема приводит к хорошо организованному хранению данных в столбцах и более чистой структуре индексов, что повышает производительность поиска.</p>
<p>Схема коллекции имеет первичный ключ, максимум четыре векторных поля и несколько скалярных полей. На следующей схеме показано, как сопоставить статью со списком полей схемы.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-design-anatomy.png" alt="Schema Design Anatomy" class="doc-image" id="schema-design-anatomy" />
   </span> <span class="img-wrapper"> <span>Анатомия проектирования схемы</span> </span></p>
<p>Проектирование модели данных поисковой системы включает в себя анализ потребностей бизнеса и абстрагирование информации в виде модели данных, выраженной в виде схемы. Например, поиск по фрагменту текста должен быть "проиндексирован" путем преобразования буквенной строки в вектор с помощью "встраивания" и включения векторного поиска. Помимо этого основного требования, может потребоваться хранение других свойств, таких как временная метка публикации и автор. Эти метаданные позволяют уточнять семантический поиск с помощью фильтрации, возвращая только тексты, опубликованные после определенной даты или определенным автором. Вы также можете получить эти скаляры вместе с основным текстом, чтобы отобразить результат поиска в приложении. Для упорядочивания этих фрагментов текста каждому из них должен быть присвоен уникальный идентификатор, выраженный в виде целого числа или строки. Эти элементы необходимы для реализации сложной логики поиска.</p>
<p>Обратитесь к <a href="/docs/ru/schema-hands-on.md">Schema Design Hands-On</a>, чтобы узнать, как создать хорошо продуманную схему.</p>
<h2 id="Create-Schema" class="common-anchor-header">Создание схемы<button data-href="#Create-Schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Следующий фрагмент кода демонстрирует, как создать схему.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> schema = []
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
log.Println(schema)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;fields&quot;: []
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-Primary-Field" class="common-anchor-header">Добавить первичное поле<button data-href="#Add-Primary-Field" class="anchor-icon" translate="no">
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
    </button></h2><p>Первичное поле в коллекции уникально идентифицирует сущность. Оно принимает только значения <strong>Int64</strong> или <strong>VarChar</strong>. Следующие фрагменты кода демонстрируют, как добавить первичное поле.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,
    datatype=DataType.INT64,
    <span class="hljs-comment"># highlight-start</span>
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">False</span>,
    <span class="hljs-comment"># highlight-end</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq; 

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
        .dataType(DataType.Int64)
        <span class="hljs-comment">// highlight-start</span>
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        <span class="hljs-comment">// highlight-end</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-comment">// highlight-start</span>
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>
    <span class="hljs-comment">// highlight-end</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    <span class="hljs-comment">// highlight-start</span>
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">false</span>),
    <span class="hljs-comment">// highlight-end</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        $primaryField
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>При добавлении поля вы можете явно указать его как первичное, установив для свойства <code translate="no">is_primary</code> значение <code translate="no">True</code>. По умолчанию первичное поле принимает значения <strong>Int64</strong>. В этом случае значением первичного поля должны быть целые числа, аналогичные <code translate="no">12345</code>. Если вы решили использовать в первичном поле значения <strong>VarChar</strong>, то значения должны быть строками, аналогичными <code translate="no">my_entity_1234</code>.</p>
<p>Вы также можете установить для свойства <code translate="no">autoId</code> значение <code translate="no">True</code>, чтобы Zilliz Cloud автоматически выделял значения первичного поля при вставке данных.</p>
<p>Подробнее см. в разделе <a href="/docs/ru/primary-field.md">Первичное поле и автоидентификатор</a>.</p>
<h2 id="Add-Vector-Fields" class="common-anchor-header">Добавление векторных полей<button data-href="#Add-Vector-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Векторные поля принимают различные разреженные и плотные векторные вложения. В Zilliz Cloud вы можете добавить в коллекцию четыре векторных поля. Следующие фрагменты кода демонстрируют, как добавить векторное поле.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    <span class="hljs-comment"># highlight-next-line</span>
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        <span class="hljs-comment">// highlight-next-line</span>
        .dimension(<span class="hljs-number">5</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-comment">// highlight-next-line</span>
    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    <span class="hljs-comment">// highlight-next-line</span>
    WithDim(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Параметр <code translate="no">dim</code> в приведенных выше фрагментах кода указывает на размерность векторных вкраплений, которые будут храниться в векторном поле. Значение <code translate="no">FLOAT_VECTOR</code> указывает на то, что векторное поле содержит список 32-битных плавающих чисел, которые обычно используются для представления антилогарифмов. Кроме того, Zilliz Cloud также поддерживает следующие типы векторных вкраплений:</p>
<ul>
<li><p><code translate="no">FLOAT16_VECTOR</code></p>
<p>Векторное поле этого типа содержит список 16-битных чисел с плавающей запятой половинной точности и обычно применяется в сценариях глубокого обучения или вычислений на базе GPU с ограничением памяти или пропускной способности.</p></li>
<li><p><code translate="no">BFLOAT16_VECTOR</code></p>
<p>Векторное поле этого типа содержит список 16-битных чисел с плавающей точкой, которые имеют пониженную точность, но тот же диапазон экспонент, что и Float32. Этот тип данных часто используется в сценариях глубокого обучения, так как позволяет сократить расход памяти без существенного влияния на точность.</p></li>
<li><p><code translate="no">BINARY_VECTOR</code></p>
<p>Векторное поле этого типа содержит список 0 и 1. Они служат компактными элементами для представления данных в сценариях обработки изображений и поиска информации.</p></li>
<li><p><code translate="no">SPARSE_FLOAT_VECTOR</code></p>
<p>Векторное поле этого типа содержит список ненулевых чисел и их порядковых номеров для представления разреженных векторных вкраплений.</p></li>
</ul>
<h2 id="Add-Scalar-Fields" class="common-anchor-header">Добавление скалярных полей<button data-href="#Add-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>В распространенных случаях вы можете использовать скалярные поля для хранения метаданных векторных вкраплений, хранящихся в Milvus, и проводить ANN-поиск с фильтрацией метаданных для повышения корректности результатов поиска. Zilliz Cloud поддерживает несколько типов скалярных полей, включая <strong>VarChar</strong>, <strong>Boolean</strong>, <strong>Int</strong>, <strong>Float</strong>, <strong>Double</strong>, <strong>Array</strong> и <strong>JSON</strong>.</p>
<h3 id="Add-String-Fields" class="common-anchor-header">Добавление строковых полей</h3><p>В Milvus вы можете использовать поля VarChar для хранения строк. Подробнее о поле VarChar см. в разделе <a href="/docs/ru/string.md">"Строковое поле"</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>,
    datatype=DataType.VARCHAR,
    <span class="hljs-comment"># highlight-next-line</span>
    max_length=<span class="hljs-number">512</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)
        .dataType(DataType.VarChar)
        <span class="hljs-comment">// highlight-next-line</span>
        .maxLength(<span class="hljs-number">512</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-comment">// highlight-next-line</span>
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_varchar&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">512</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> varCharField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_varchar&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 256
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Number-Fields" class="common-anchor-header">Добавление числовых полей</h3><p>Milvus поддерживает следующие типы чисел: <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code> и <code translate="no">Double</code>. Подробнее о числовых полях см. в разделе <a href="/docs/ru/number.md">Числовое поле</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_int64&quot;</span>,
    datatype=DataType.INT64,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_int64&quot;</span>)
        .dataType(DataType.Int64)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_int64&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_int64&quot;</span>).
    WithDataType(entity.FieldTypeInt64),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> int64Field=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_int64&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Boolean-Fields" class="common-anchor-header">Добавление булевых полей</h3><p>Milvus поддерживает булевы поля. В следующих фрагментах кода показано, как добавить булево поле.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_bool&quot;</span>,
    datatype=DataType.BOOL,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_bool&quot;</span>)
        .dataType(DataType.Bool)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_bool&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Boolean</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_bool&quot;</span>).
    WithDataType(entity.FieldTypeBool),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> boolField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_bool&quot;,
    &quot;dataType&quot;: &quot;Boolean&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>,
        <span class="hljs-variable">$boolField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-JSON-fields" class="common-anchor-header">Добавление полей JSON</h3><p>Поле JSON обычно хранит полуструктурированные данные JSON. Подробнее о полях JSON читайте в разделе <a href="/docs/ru/use-json-fields.md">Поле JSON</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_json&quot;</span>,
    datatype=DataType.JSON,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_json&quot;</span>)
        .dataType(DataType.JSON)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_json&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_json&quot;</span>).
    WithDataType(entity.FieldTypeJSON),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> jsonField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_json&quot;,
    &quot;dataType&quot;: &quot;JSON&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>,
        <span class="hljs-variable">$boolField</span>,
        <span class="hljs-variable">$jsonField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Array-Fields" class="common-anchor-header">Добавление полей массива</h3><p>Поле массива хранит список элементов. Типы данных всех элементов в поле массива должны быть одинаковыми. Подробнее о полях массива см. в разделе <a href="/docs/ru/array_data_type.md">Поле массива</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_array&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.VARCHAR,
    max_capacity=<span class="hljs-number">5</span>,
    max_length=<span class="hljs-number">512</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_array&quot;</span>)
        .dataType(DataType.Array)
        .elementType(DataType.VarChar)
        .maxCapacity(<span class="hljs-number">5</span>)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_array&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_array&quot;</span>).
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeInt64).
    WithMaxLength(<span class="hljs-number">512</span>).
    WithMaxCapacity(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> arrayField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_array&quot;,
    &quot;dataType&quot;: &quot;Array&quot;,
    &quot;elementDataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>,
        <span class="hljs-variable">$boolField</span>,
        <span class="hljs-variable">$jsonField</span>,
        <span class="hljs-variable">$arrayField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
