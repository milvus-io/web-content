---
id: timestamptz-field.md
title: Поле TIMESTAMPTZCompatible with Milvus 2.6.6+
summary: >-
  Приложения, которые отслеживают время в разных регионах, такие как системы
  электронной коммерции, инструменты для совместной работы или распределённые
  системы ведения журналов, требуют точной обработки временных меток с учётом
  часовых поясов. Тип данных TIMESTAMPTZ в Milvus обеспечивает эту возможность,
  храня временные метки вместе с соответствующими часовыми поясами.
beta: Milvus 2.6.6+
---
<h1 id="TIMESTAMPTZ-Field" class="common-anchor-header">Поле TIMESTAMPTZ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.6+</span><button data-href="#TIMESTAMPTZ-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Приложения, отслеживающие время в разных регионах, такие как системы электронной коммерции, инструменты для совместной работы или распределенное ведение журналов, требуют точной обработки временных меток с учетом часовых поясов. Тип данных « <code translate="no">TIMESTAMPTZ</code> » в Milvus обеспечивает эту возможность, сохраняя временные метки вместе с соответствующим часовым поясом.</p>
<h2 id="What-is-a-TIMESTAMPTZ-field" class="common-anchor-header">Что такое поле TIMESTAMPTZ?<button data-href="#What-is-a-TIMESTAMPTZ-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Поле <code translate="no">TIMESTAMPTZ</code> — это тип данных, определённый в схеме (<code translate="no">DataType.TIMESTAMPTZ</code>) в Milvus, который обрабатывает входные данные с учётом часовых поясов и хранит все временные точки внутренне в виде абсолютного времени по UTC:</p>
<ul>
<li><p><strong>Допустимый формат входных данных</strong>: строки в <a href="https://en.wikipedia.org/wiki/ISO_8601">формате ISO 8601</a> со смещением часового пояса (например, <code translate="no">&quot;2025-05-01T23:59:59+08:00&quot;</code> обозначает 11:59:59 вечера 1 мая 2025 года (UTC+08:00)).</p></li>
<li><p><strong>Внутреннее хранение</strong>: все значения <code translate="no">TIMESTAMPTZ</code> нормализуются и хранятся в формате <a href="https://en.wikipedia.org/wiki/Coordinated_Universal_Time">всемирного координированного времени</a> (UTC).</p></li>
<li><p><strong>Сравнение и фильтрация</strong>: все операции фильтрации и сортировки выполняются в формате UTC, что обеспечивает согласованные и предсказуемые результаты в разных часовых поясах.</p></li>
</ul>
<div class="alert note">
<ul>
<li><p>Вы можете установить параметр « <code translate="no">nullable=True</code> » для полей « <code translate="no">TIMESTAMPTZ</code> », чтобы разрешить отсутствие значений.</p></li>
<li><p>Вы можете указать значение метки времени по умолчанию с помощью атрибута « <code translate="no">default_value</code> » в формате <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>.</p></li>
</ul>
<p>Подробности см. в разделе <a href="/docs/ru/nullable-and-default.md">«Допустимые нулевые значения и значения по умолчанию</a> ».</p>
</div>
<h2 id="Basic-operations" class="common-anchor-header">Основные операции<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Основной рабочий процесс использования поля « <code translate="no">TIMESTAMPTZ</code> » аналогичен работе с другими скалярными полями в Milvus: определение поля → вставка данных → запрос/фильтрация.</p>
<h3 id="Step-1-Define-a-TIMESTAMPTZ-field" class="common-anchor-header">Шаг 1: Определение поля TIMESTAMPTZ<button data-href="#Step-1-Define-a-TIMESTAMPTZ-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы использовать поле ` <code translate="no">TIMESTAMPTZ</code> `, явно определите его в схеме коллекции при создании коллекции. В следующем примере показано, как создать коллекцию с полем ` <code translate="no">tsz</code> ` типа ` <code translate="no">DataType.TIMESTAMPTZ</code>`.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> datetime
<span class="hljs-keyword">import</span> pytz

server_address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
collection_name = <span class="hljs-string">&quot;timestamptz_test123&quot;</span>

client = MilvusClient(uri=server_address)

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema()
<span class="hljs-comment"># Add a primary key field</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="hljs-comment"># Add a TIMESTAMPTZ field that allows null values</span>
<span class="highlighted-wrapper-line">schema.add_field(<span class="hljs-string">&quot;tsz&quot;</span>, DataType.TIMESTAMPTZ, nullable=<span class="hljs-literal">True</span>)</span>
<span class="hljs-comment"># Add a vector field</span>
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)

client.create_collection(collection_name, schema=schema, consistency_level=<span class="hljs-string">&quot;Session&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; with a TimestampTz field created successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.HasCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">serverAddress</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">collectionName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;timestamptz_test123&quot;</span>;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(serverAddress)
        .build());

<span class="hljs-keyword">if</span> (client.hasCollection(HasCollectionReq.builder()
        .collectionName(collectionName)
        .build())) {
    client.dropCollection(DropCollectionReq.builder()
            .collectionName(collectionName)
            .build());
}

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<span class="hljs-comment">// Add a primary key field</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());
<span class="hljs-comment">// Add a TIMESTAMPTZ field that allows null values</span>
<span class="highlighted-wrapper-line">schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;tsz&quot;</span>).dataType(DataType.Timestamptz).isNullable(<span class="hljs-literal">true</span>).build());</span>
<span class="hljs-comment">// Add a vector field</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vec&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">4</span>)
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(collectionName)
        .collectionSchema(schema)
        .consistencyLevel(ConsistencyLevel.SESSION)
        .build());
System.out.printf(<span class="hljs-string">&quot;Collection &#x27;%s&#x27; with a TimestampTz field created successfully.%n&quot;</span>, collectionName);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> server_address = <span class="hljs-string">&quot;localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> collection_name = <span class="hljs-string">&quot;timestamptz_test123&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: server_address });

<span class="hljs-keyword">const</span> has = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasCollection</span>({ <span class="hljs-attr">collection_name</span>: collection_name });
<span class="hljs-keyword">if</span> (has.<span class="hljs-property">value</span>) {
    <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({ <span class="hljs-attr">collection_name</span>: collection_name });
}

<span class="hljs-keyword">const</span> schema = [
    <span class="hljs-comment">// Add a primary key field</span>
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span> },
    <span class="hljs-comment">// Add a TIMESTAMPTZ field that allows null values</span>
<span class="highlighted-wrapper-line">    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;tsz&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Timestamptz</span>, <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span> },</span>
    <span class="hljs-comment">// Add a vector field</span>
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vec&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span> },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Session&quot;</span>,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Collection &#x27;<span class="hljs-subst">${collection_name}</span>&#x27; with a TimestampTz field created successfully.`</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

collectionName := <span class="hljs-string">&quot;timestamptz_test123&quot;</span>
has, err := cli.HasCollection(ctx, milvusclient.NewHasCollectionOption(collectionName))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<span class="hljs-keyword">if</span> has {
    err = cli.DropCollection(ctx, milvusclient.NewDropCollectionOption(collectionName))
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        fmt.Println(err.Error())
        <span class="hljs-keyword">return</span>
    }
}

schema := entity.NewSchema().
    WithName(collectionName).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;tsz&quot;</span>).WithDataType(entity.FieldTypeTimestamptz).WithNullable(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;vec&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">4</span>))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema).
    WithConsistencyLevel(entity.ClSession))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Printf(<span class="hljs-string">&quot;Collection &#x27;%s&#x27; with a TimestampTz field created successfully.\n&quot;</span>, collectionName)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;timestamptz_test123&quot;,
    &quot;schema&quot;: {
        &quot;autoID&quot;: false,
        &quot;enableDynamicField&quot;: false,
        &quot;fields&quot;: [
            {&quot;fieldName&quot;: &quot;id&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;isPrimary&quot;: true},
            {&quot;fieldName&quot;: &quot;tsz&quot;, &quot;dataType&quot;: &quot;Timestamptz&quot;, &quot;nullable&quot;: true},
            {&quot;fieldName&quot;: &quot;vec&quot;, &quot;dataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: 4}}
        ]
    },
    &quot;consistencyLevel&quot;: &quot;Session&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-data" class="common-anchor-header">Шаг 2: Вставка данных<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Вставьте сущности, содержащие строки в формате ISO 8601 со смещениями часовых поясов.</p>
<p>В приведенном ниже примере в коллекцию вставляется 8 193 строки примерных данных. Каждая строка содержит:</p>
<ul>
<li><p>уникальный ID</p></li>
<li><p>метку времени с учетом часового пояса (по шанхайскому времени)</p></li>
<li><p>простой 4-мерный вектор</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">data_size = <span class="hljs-number">8193</span>

<span class="hljs-comment"># Get the Asia/Shanghai time zone using the pytz library</span>
<span class="hljs-comment"># You can use any valid IANA time zone identifier such as:</span>
<span class="hljs-comment">#   &quot;Asia/Tokyo&quot;, &quot;America/New_York&quot;, &quot;Europe/London&quot;, &quot;UTC&quot;, etc.</span>
<span class="hljs-comment"># To view all available values:</span>
<span class="hljs-comment">#   import pytz; print(pytz.all_timezones)</span>
<span class="hljs-comment"># Reference:</span>
<span class="hljs-comment">#   IANA database – https://www.iana.org/time-zones</span>
<span class="hljs-comment">#   Wikipedia – https://en.wikipedia.org/wiki/List_of_tz_database_time_zones</span>
shanghai_tz = pytz.timezone(<span class="hljs-string">&quot;Asia/Shanghai&quot;</span>)

data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: i + <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;tsz&quot;</span>: shanghai_tz.localize(
            datetime.datetime(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>) + datetime.timedelta(days=i)
        ).isoformat(),
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-built_in">float</span>(i) / <span class="hljs-number">10</span> <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">4</span>)],
    }
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(data_size)
]

client.insert(collection_name, data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Data inserted successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-keyword">import</span> java.time.ZoneId;
<span class="hljs-keyword">import</span> java.time.ZonedDateTime;
<span class="hljs-keyword">import</span> java.time.format.DateTimeFormatter;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">int</span> <span class="hljs-variable">dataSize</span> <span class="hljs-operator">=</span> <span class="hljs-number">8193</span>;

<span class="hljs-comment">// Get the Asia/Shanghai time zone</span>
<span class="hljs-comment">// You can use any valid IANA time zone identifier such as:</span>
<span class="hljs-comment">//   &quot;Asia/Tokyo&quot;, &quot;America/New_York&quot;, &quot;Europe/London&quot;, &quot;UTC&quot;, etc.</span>
<span class="hljs-comment">// To view all available values:</span>
<span class="hljs-comment">//   System.out.println(ZoneId.getAvailableZoneIds());</span>
<span class="hljs-comment">// Reference:</span>
<span class="hljs-comment">//   IANA database – https://www.iana.org/time-zones</span>
<span class="hljs-comment">//   Wikipedia – https://en.wikipedia.org/wiki/List_of_tz_database_time_zones</span>
<span class="hljs-type">ZoneId</span> <span class="hljs-variable">shanghaiTz</span> <span class="hljs-operator">=</span> ZoneId.of(<span class="hljs-string">&quot;Asia/Shanghai&quot;</span>);
<span class="hljs-type">ZonedDateTime</span> <span class="hljs-variable">start</span> <span class="hljs-operator">=</span> ZonedDateTime.of(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, shanghaiTz);

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; data = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; dataSize; i++) {
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, i + <span class="hljs-number">1</span>);
    <span class="hljs-comment">// ISO 8601 string with a time-zone offset, such as &quot;2025-01-01T00:00:00+08:00&quot;</span>
    row.addProperty(<span class="hljs-string">&quot;tsz&quot;</span>, start.plusDays(i).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME));
    row.add(<span class="hljs-string">&quot;vec&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.0f</span>, <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>}));
    data.add(row);
}

client.insert(InsertReq.builder()
        .collectionName(collectionName)
        .data(data)
        .build());
System.out.println(<span class="hljs-string">&quot;Data inserted successfully.&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data_size = <span class="hljs-number">8193</span>;

<span class="hljs-comment">// Build ISO 8601 strings with the Asia/Shanghai time-zone offset (+08:00).</span>
<span class="hljs-comment">// Any ISO 8601 string with a time-zone offset is accepted, such as</span>
<span class="hljs-comment">// &quot;2025-01-01T00:00:00Z&quot; or &quot;2025-01-01T00:00:00-05:00&quot;.</span>
<span class="hljs-keyword">const</span> data = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; data_size; i++) {
    <span class="hljs-keyword">const</span> day = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">UTC</span>(<span class="hljs-number">2025</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span> + i));
    data.<span class="hljs-title function_">push</span>({
        <span class="hljs-attr">id</span>: i + <span class="hljs-number">1</span>,
        <span class="hljs-attr">tsz</span>: <span class="hljs-string">`<span class="hljs-subst">${day.toISOString().slice(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>)}</span>T00:00:00+08:00`</span>,
        <span class="hljs-attr">vec</span>: [<span class="hljs-number">0.0</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>],
    });
}

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,
    <span class="hljs-attr">data</span>: data,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Data inserted successfully.&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>

<span class="hljs-comment">// Timestamps are written as ISO 8601 strings with a time-zone offset</span>
tszValues := []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;2025-01-01T00:00:00+08:00&quot;</span>,
    <span class="hljs-string">&quot;2025-01-02T00:00:00+08:00&quot;</span>,
    <span class="hljs-string">&quot;2025-01-03T00:00:00+08:00&quot;</span>,
    <span class="hljs-string">&quot;2025-01-04T00:00:00+08:00&quot;</span>,
    <span class="hljs-string">&quot;2025-01-05T00:00:00+08:00&quot;</span>,
}

_, err = cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(collectionName).
    WithColumns(
        column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>}),
        column.NewColumnTimestamptzIsoString(<span class="hljs-string">&quot;tsz&quot;</span>, tszValues),
        column.NewColumnFloatVector(<span class="hljs-string">&quot;vec&quot;</span>, <span class="hljs-number">4</span>, [][]<span class="hljs-type">float32</span>{
            {<span class="hljs-number">0.0</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>},
            {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>},
            {<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>},
            {<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>},
            {<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>},
        }),
    ))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Println(<span class="hljs-string">&quot;Data inserted successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;timestamptz_test123&quot;,
    &quot;data&quot;: [
        {&quot;id&quot;: 1, &quot;tsz&quot;: &quot;2025-01-01T00:00:00+08:00&quot;, &quot;vec&quot;: [0.0, 0.1, 0.2, 0.3]},
        {&quot;id&quot;: 2, &quot;tsz&quot;: &quot;2025-01-02T00:00:00+08:00&quot;, &quot;vec&quot;: [0.1, 0.2, 0.3, 0.4]},
        {&quot;id&quot;: 3, &quot;tsz&quot;: &quot;2025-01-03T00:00:00+08:00&quot;, &quot;vec&quot;: [0.2, 0.3, 0.4, 0.5]},
        {&quot;id&quot;: 4, &quot;tsz&quot;: &quot;2025-01-04T00:00:00+08:00&quot;, &quot;vec&quot;: [0.3, 0.4, 0.5, 0.6]},
        {&quot;id&quot;: 5, &quot;tsz&quot;: &quot;2025-01-05T00:00:00+08:00&quot;, &quot;vec&quot;: [0.4, 0.5, 0.6, 0.7]}
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Filtering-operations" class="common-anchor-header">Шаг 3: Операции фильтрации<button data-href="#Step-3-Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">TIMESTAMPTZ</code> поддерживает скалярные сравнения, арифметику интервалов и извлечение временных компонентов.</p>
<p>Прежде чем выполнять операции фильтрации над полями <code translate="no">TIMESTAMPTZ</code>, убедитесь, что:</p>
<ul>
<li><p>Вы создали индекс для каждого векторного поля.</p></li>
<li><p>Коллекция загружена в память.</p></li>
</ul>
<p><details></p>
<p><summary>Показать пример кода</summary></p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index on vector field</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vec&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;vec_index&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
client.create_index(collection_name, index_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Index created successfully.&quot;</span>)

<span class="hljs-comment"># Load the collection</span>
client.load_collection(collection_name)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; loaded successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-comment">// Create index on vector field</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;vec&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .indexName(<span class="hljs-string">&quot;vec_index&quot;</span>)
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createIndex(CreateIndexReq.builder()
        .collectionName(collectionName)
        .indexParams(Collections.singletonList(indexParam))
        .build());
System.out.println(<span class="hljs-string">&quot;Index created successfully.&quot;</span>);

<span class="hljs-comment">// Load the collection</span>
client.loadCollection(LoadCollectionReq.builder()
        .collectionName(collectionName)
        .build());
System.out.printf(<span class="hljs-string">&quot;Collection &#x27;%s&#x27; loaded successfully.%n&quot;</span>, collectionName);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create index on vector field</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vec&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vec_index&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Index created successfully.&quot;</span>);

<span class="hljs-comment">// Load the collection</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({ <span class="hljs-attr">collection_name</span>: collection_name });
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Collection &#x27;<span class="hljs-subst">${collection_name}</span>&#x27; loaded successfully.`</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

idxOpt := milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;vec&quot;</span>, index.NewAutoIndex(entity.COSINE))
indexTask, err := cli.CreateIndex(ctx, idxOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">if</span> err = indexTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
fmt.Println(<span class="hljs-string">&quot;Index created successfully.&quot;</span>)

loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(collectionName))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">if</span> err = loadTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
fmt.Printf(<span class="hljs-string">&quot;Collection &#x27;%s&#x27; loaded successfully.\n&quot;</span>, collectionName)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;timestamptz_test123&quot;,
    &quot;indexParams&quot;: [{&quot;fieldName&quot;: &quot;vec&quot;, &quot;indexName&quot;: &quot;vec_index&quot;, &quot;metricType&quot;: &quot;COSINE&quot;, &quot;indexType&quot;: &quot;AUTOINDEX&quot;}]
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;timestamptz_test123&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h4 id="Query-with-timestamp-filtering" class="common-anchor-header">Запрос с фильтрацией по временным меткам</h4><p>Используйте арифметические операторы, такие как <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;=</code>. Полный список арифметических операторов, доступных в Milvus, см. в разделе <a href="/docs/ru/basic-operators.md#Arithmetic-operators">«Арифметические операторы</a>».</p>
<p>В приведенном ниже примере фильтруются сущности с метками времени (<code translate="no">tsz</code>), которые не равны <strong>2025-01-03T00:00:00+08:00</strong>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query for entities where tsz is not equal to &#x27;2025-01-03T00:00:00+08:00&#x27;</span>
<span class="highlighted-wrapper-line">expr = <span class="hljs-string">&quot;tsz != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span></span>

results = client.query(
    collection_name=collection_name,
    <span class="hljs-built_in">filter</span>=expr,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query result:  data: [&quot;{&#x27;id&#x27;: 1, &#x27;tsz&#x27;: &#x27;2024-12-31T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;tsz&#x27;: &#x27;2025-01-01T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 4, &#x27;tsz&#x27;: &#x27;2025-01-03T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 5, &#x27;tsz&#x27;: &#x27;2025-01-04T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 6, &#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 7, &#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 8, &#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 9, &#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 10, &#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 11, &#x27;tsz&#x27;: &#x27;2025-01-10T16:00:00Z&#x27;}&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="hljs-comment">// Query for entities where tsz is not equal to &#x27;2025-01-03T00:00:00+08:00&#x27;</span>
<span class="highlighted-wrapper-line"><span class="hljs-type">String</span> <span class="hljs-variable">expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;tsz != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span>;</span>

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(collectionName)
        .filter(expr)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>))
        .limit(<span class="hljs-number">10</span>)
        .build());

System.out.println(<span class="hljs-string">&quot;Query result: &quot;</span> + results.getQueryResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Query for entities where tsz is not equal to &#x27;2025-01-03T00:00:00+08:00&#x27;</span>
<span class="highlighted-wrapper-line"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;tsz != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span>;</span>

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,
    <span class="hljs-attr">filter</span>: expr,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results.<span class="hljs-property">data</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">expr := <span class="hljs-string">&quot;tsz != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span>

resultSet, err := cli.Query(ctx, milvusclient.NewQueryOption(collectionName).
    WithFilter(expr).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>).
    WithLimit(<span class="hljs-number">10</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Println(<span class="hljs-string">&quot;Query result: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;tsz&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;timestamptz_test123&quot;,
    &quot;filter&quot;: &quot;tsz != ISO &#x27;</span>\&#x27;<span class="hljs-string">&#x27;2025-01-03T00:00:00+08:00&#x27;</span>\&#x27;<span class="hljs-string">&#x27;&quot;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;tsz&quot;],
    &quot;limit&quot;: 10
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>В приведенном выше примере</p>
<ul>
<li><p><code translate="no">tsz</code> <code translate="no">TIMESTAMPTZ</code> — это имя поля, определённое в схеме.</p></li>
<li><p><code translate="no">ISO '2025-01-03T00:00:00+08:00'</code> — это литерал временной метки в формате <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>, включая смещение часового пояса.</p></li>
<li><p><code translate="no">!=</code> сравнивает значение поля с этим литералом. Другие поддерживаемые операторы включают <code translate="no">==</code>, <code translate="no">&lt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;</code> и <code translate="no">&gt;=</code>.</p></li>
</ul>
<h4 id="Interval-operations" class="common-anchor-header">Операции с интервалами</h4><p>Вы можете выполнять арифметические операции над полями <code translate="no">TIMESTAMPTZ</code>, используя значения <strong>INTERVAL</strong> в <a href="https://en.wikipedia.org/wiki/ISO_8601#Durations">формате продолжительности ISO 8601</a>. Это позволяет при фильтрации данных складывать или вычитать из временной метки продолжительности, такие как дни, часы или минуты.</p>
<p>Например, следующий запрос фильтрует сущности, у которых временная метка (<code translate="no">tsz</code>) плюс ноль дней <strong>не равна</strong> <strong>2025-01-03T00:00:00+08:00</strong>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-wrapper-line">expr = <span class="hljs-string">&quot;tsz + INTERVAL &#x27;P0D&#x27; != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span></span>

results = client.query(
    collection_name, 
    <span class="hljs-built_in">filter</span>=expr, 
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>], 
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query result:  data: [&quot;{&#x27;id&#x27;: 1, &#x27;tsz&#x27;: &#x27;2024-12-31T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;tsz&#x27;: &#x27;2025-01-01T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 4, &#x27;tsz&#x27;: &#x27;2025-01-03T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 5, &#x27;tsz&#x27;: &#x27;2025-01-04T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 6, &#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 7, &#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 8, &#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 9, &#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 10, &#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 11, &#x27;tsz&#x27;: &#x27;2025-01-10T16:00:00Z&#x27;}&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="highlighted-wrapper-line"><span class="hljs-type">String</span> <span class="hljs-variable">expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;tsz + INTERVAL &#x27;P0D&#x27; != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span>;</span>

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(collectionName)
        .filter(expr)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>))
        .limit(<span class="hljs-number">10</span>)
        .build());

System.out.println(<span class="hljs-string">&quot;Query result: &quot;</span> + results.getQueryResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="highlighted-wrapper-line"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;tsz + INTERVAL &#x27;P0D&#x27; != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span>;</span>

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,
    <span class="hljs-attr">filter</span>: expr,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results.<span class="hljs-property">data</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">expr := <span class="hljs-string">&quot;tsz + INTERVAL &#x27;P0D&#x27; != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span>

resultSet, err := cli.Query(ctx, milvusclient.NewQueryOption(collectionName).
    WithFilter(expr).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>).
    WithLimit(<span class="hljs-number">10</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Println(<span class="hljs-string">&quot;Query result: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;tsz&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;timestamptz_test123&quot;,
    &quot;filter&quot;: &quot;tsz + INTERVAL &#x27;</span>\&#x27;<span class="hljs-string">&#x27;P0D&#x27;</span>\&#x27;<span class="hljs-string">&#x27; != ISO &#x27;</span>\&#x27;<span class="hljs-string">&#x27;2025-01-03T00:00:00+08:00&#x27;</span>\&#x27;<span class="hljs-string">&#x27;&quot;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;tsz&quot;],
    &quot;limit&quot;: 10
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">INTERVAL</code> Значения соответствуют <a href="https://www.w3.org/TR/xmlschema-2/#duration">синтаксису продолжительности</a> по стандарту <a href="https://www.w3.org/TR/xmlschema-2/#duration">ISO 8601</a>. Например:</p>
<ul>
<li><p><code translate="no">P1D</code> → 1 день</p></li>
<li><p><code translate="no">PT3H</code> → 3 часа</p></li>
<li><p><code translate="no">P2DT6H</code> → 2 дня и 6 часов</p></li>
</ul>
<p>Вы можете использовать арифметику <code translate="no">INTERVAL</code> непосредственно в выражениях фильтров, например:</p>
<ul>
<li><p><code translate="no">tsz + INTERVAL 'P3D'</code> → Добавляет 3 дня</p></li>
<li><p><code translate="no">tsz - INTERVAL 'PT2H'</code> → Вычитает 2 часа</p></li>
</ul>
</div>
<h4 id="Search-with-timestamp-filtering" class="common-anchor-header">Поиск с фильтрацией по временным меткам</h4><p>Вы можете сочетать фильтрацию по меткам времени ( <code translate="no">TIMESTAMPTZ</code> ) с векторным поиском по схожести, чтобы сузить результаты как по времени, так и по степени схожести.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define a time-based filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;tsz &gt; ISO &#x27;2025-01-05T00:00:00+08:00&#x27;&quot;</span>

res = client.search(
    collection_name=collection_name,             <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]],                  <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                                      <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                                <span class="hljs-comment"># Filter expression using TIMESTAMPTZ</span></span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],  <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search result: &quot;</span>, res)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Search result:  data: [[{&#x27;id&#x27;: 10, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;, &#x27;id&#x27;: 10}}, {&#x27;id&#x27;: 9, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;, &#x27;id&#x27;: 9}}, {&#x27;id&#x27;: 8, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;, &#x27;id&#x27;: 8}}, {&#x27;id&#x27;: 7, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;, &#x27;id&#x27;: 7}}, {&#x27;id&#x27;: 6, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;, &#x27;id&#x27;: 6}}]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-comment">// Define a time-based filter expression</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;tsz &gt; ISO &#x27;2025-01-05T00:00:00+08:00&#x27;&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(collectionName)                                                      <span class="hljs-comment">// Collection name</span>
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>}))) <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
        .limit(<span class="hljs-number">5</span>)                                                                            <span class="hljs-comment">// Max. number of results to return</span>
<span class="highlighted-wrapper-line">        .filter(filter)                                                                      <span class="hljs-comment">// Filter expression using TIMESTAMPTZ</span></span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>))                                            <span class="hljs-comment">// Fields to include in the search results</span>
        .build());

System.out.println(<span class="hljs-string">&quot;Search result: &quot;</span> + res.getSearchResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Define a time-based filter expression</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;tsz &gt; ISO &#x27;2025-01-05T00:00:00+08:00&#x27;&quot;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,  <span class="hljs-comment">// Collection name</span>
    <span class="hljs-attr">data</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]],      <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,                          <span class="hljs-comment">// Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-attr">filter</span>: filter,                    <span class="hljs-comment">// Filter expression using TIMESTAMPTZ</span></span>
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],      <span class="hljs-comment">// Fields to include in the search results</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Search result: &quot;</span>, res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;tsz &gt; ISO &#x27;2025-01-05T00:00:00+08:00&#x27;&quot;</span>
queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}
annParam := index.NewCustomAnnParam()
annParam.WithExtraParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;COSINE&quot;</span>)

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    collectionName,
    <span class="hljs-number">5</span>,
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;vec&quot;</span>).
    WithFilter(filter).
    WithAnnParam(annParam).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> _, rs := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, rs.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, rs.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;timestamptz_test123&quot;,
    &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]],
    &quot;limit&quot;: 5,
    &quot;filter&quot;: &quot;tsz &gt; ISO &#x27;</span>\&#x27;<span class="hljs-string">&#x27;2025-01-05T00:00:00+08:00&#x27;</span>\&#x27;<span class="hljs-string">&#x27;&quot;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;tsz&quot;],
    &quot;searchParams&quot;: {&quot;metricType&quot;: &quot;COSINE&quot;}
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Если ваша коллекция содержит два или более векторных полей, вы можете выполнять гибридные поисковые операции с фильтрацией по временным меткам. Подробности см. в разделе <a href="/docs/ru/multi-vector-search.md">«Гибридный поиск по нескольким векторам</a>».</p>
</div>
<h2 id="Advanced-usage" class="common-anchor-header">Расширенное использование<button data-href="#Advanced-usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Для расширенного использования вы можете управлять часовыми поясами на разных уровнях (например, на уровне базы данных, коллекции или запроса) или ускорять запросы по полям « <code translate="no">TIMESTAMPTZ</code> » с помощью индексов.</p>
<h3 id="Manage-time-zones-at-different-levels" class="common-anchor-header">Управление часовыми поясами на разных уровнях<button data-href="#Manage-time-zones-at-different-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>Вы можете контролировать часовой пояс для полей <code translate="no">TIMESTAMPTZ</code> на уровне <strong>базы данных</strong>, <strong>коллекции</strong> или <strong>запроса/поиска</strong>.</p>
<table>
   <tr>
     <th><p>Уровень</p></th>
     <th><p>Параметр</p></th>
     <th><p>Область действия</p></th>
     <th><p>Приоритет</p></th>
   </tr>
   <tr>
     <td><p>База данных</p></td>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>По умолчанию для всех коллекций в базе данных</p></td>
     <td><p>Самый низкий</p></td>
   </tr>
   <tr>
     <td><p>Коллекция</p></td>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>Переопределяет настройку часового пояса по умолчанию в базе данных для данной коллекции</p></td>
     <td><p>Средний</p></td>
   </tr>
   <tr>
     <td><p>Запрос/поиск/гибридный поиск</p></td>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>Временное переопределение для одной конкретной операции</p></td>
     <td><p>Наивысший</p></td>
   </tr>
</table>
<p>Пошаговые инструкции и примеры кода см. на соответствующих страницах:</p>
<ul>
<li><p><a href="/docs/ru/modify-collection.md#Example-6-Set-collection-time-zone">Изменение коллекции</a></p></li>
<li><p><a href="/docs/ru/manage_databases.md#Manage-database-properties">База данных</a></p></li>
<li><p><a href="/docs/ru/get-and-scalar-query.md#Temporarily-set-a-timezone-for-a-query">Запрос</a></p></li>
<li><p><a href="/docs/ru/single-vector-search.md#Temporarily-set-a-timezone-for-a-search">Базовый векторный поиск</a></p></li>
<li><p><a href="/docs/ru/multi-vector-search.md">Гибридный поиск по нескольким векторам</a></p></li>
</ul>
<h3 id="Accelerate-queries" class="common-anchor-header">Ускорение запросов<button data-href="#Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>По умолчанию запросы по полям типа « <code translate="no">TIMESTAMPTZ</code> » без индекса выполняют полное сканирование всех строк, что может замедлять работу при работе с большими наборами данных. Чтобы ускорить запросы по временным меткам, создайте индекс « <code translate="no">STL_SORT</code> » для поля типа « <code translate="no">TIMESTAMPTZ</code> ».</p>
<p>Подробности см. в разделе <a href="/docs/ru/stl-sort.md">STL_SORT</a>.</p>
