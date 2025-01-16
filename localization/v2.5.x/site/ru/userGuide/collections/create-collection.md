---
id: create-collection.md
title: Создать коллекцию
---
<h1 id="Create-Collection​" class="common-anchor-header">Создать коллекцию<button data-href="#Create-Collection​" class="anchor-icon" translate="no">
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
    </button></h1><p>Вы можете создать коллекцию, определив ее схему, параметры индекса, тип метрики и необходимость загрузки при создании. На этой странице описано, как создать коллекцию с нуля.</p>
<h2 id="Overview​" class="common-anchor-header">Обзор<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Коллекция - это двумерная таблица с фиксированными столбцами и вариантами строк. Каждый столбец представляет поле, а каждая строка - сущность. Для реализации такого структурного управления данными необходима схема. Каждая вставляемая сущность должна соответствовать ограничениям, определенным в схеме.</p>
<p>Вы можете определить каждый аспект коллекции, включая ее схему, параметры индекса, тип метрики и необходимость ее загрузки при создании, чтобы убедиться, что коллекция полностью соответствует вашим требованиям.</p>
<p>Чтобы создать коллекцию, необходимо</p>
<ul>
<li><p><a href="#create-schema">Создать схему</a></p></li>
<li><p><a href="#optional-set-index-parameters">Задать параметры индекса</a> (необязательно)</p></li>
<li><p><a href="#create-collection">Создать коллекцию</a></p></li>
</ul>
<h2 id="Create-Schema​" class="common-anchor-header">Создать схему<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>Схема определяет структуру данных коллекции. При создании коллекции необходимо разработать схему в соответствии с вашими требованиями. Для получения подробной информации см. раздел <a href="/docs/ru/manage-collections.md">"Объяснение схемы"</a>.</p>
<p>Следующие фрагменты кода создают схему с динамическим полем enabled и тремя обязательными полями <code translate="no">my_id</code>, <code translate="no">my_vector</code> и <code translate="no">my_varchar</code>.</p>
<div class="alert note">
<p>Вы можете установить значения по умолчанию для любого скалярного поля и сделать его нулевым. Подробнее см. в разделе <a href="/docs/ru/nullable-and-default.md">Nullable &amp; Default</a>.</p>
</div>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Create a collection in customized setup mode​</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
<span class="hljs-comment"># 3.1. Create schema​</span>
schema = MilvusClient.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    enable_dynamic_field=<span class="hljs-literal">True</span>,​
)​
​
<span class="hljs-comment"># 3.2. Add fields to schema​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;my_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
​
<span class="hljs-comment">// 1. Connect to Milvus server​</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()​
        .uri(CLUSTER_ENDPOINT)​
        .token(TOKEN)​
        .build();​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);​
​
<span class="hljs-comment">// 3. Create a collection in customized setup mode​</span>
​
<span class="hljs-comment">// 3.1 Create schema​</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
​
<span class="hljs-comment">// 3.2 Add fields to schema​</span>
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)​
        .dataType(DataType.Int64)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .autoID(<span class="hljs-literal">false</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">5</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)​
        .dataType(DataType.VarChar)​
        .maxLength(<span class="hljs-number">512</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// 3. Create a collection in customized setup mode​</span>
<span class="hljs-comment">// 3.1 Define fields​</span>
<span class="hljs-keyword">const</span> fields = [​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>​
    }​
]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>​
​
schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">true</span>).​
        WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_id&quot;</span>).WithIsAutoID(<span class="hljs-literal">true</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>)).​
        WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">5</span>)).​
        WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_varchar&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">512</span>))thDim(<span class="hljs-number">5</span>))​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: false,​
        &quot;enabledDynamicField&quot;: false,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;my_id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_vector&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;5&quot;​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_varchar&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 512​
                }​
            }​
        ]​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Optional-Set-Index-Parameters​" class="common-anchor-header">(Необязательно) Установка параметров индекса<button data-href="#Optional-Set-Index-Parameters​" class="anchor-icon" translate="no">
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
    </button></h2><p>Создание индекса для определенного поля ускоряет поиск по этому полю. Индекс записывает порядок следования сущностей в коллекции. Как показано в следующих фрагментах кода, вы можете использовать <code translate="no">metric_type</code> и <code translate="no">index_type</code> для выбора подходящих способов индексации поля в Milvus и измерения сходства между векторными вкраплениями.</p>
<p>В Milvus вы можете использовать <code translate="no">AUTOINDEX</code> в качестве типа индекса для всех векторных полей и один из <code translate="no">COSINE</code>, <code translate="no">L2</code> и <code translate="no">IP</code> в качестве типа метрики в зависимости от ваших потребностей.</p>
<p>Как показано в приведенном выше фрагменте кода, для векторных полей необходимо задать как тип индекса, так и тип метрики, а для скалярных полей - только тип индекса. Индексы обязательны для векторных полей, и рекомендуется создавать индексы для скалярных полей, часто используемых в условиях фильтрации.</p>
<p>Подробнее см. в разделе <a href="/docs/ru/index-vector-fields.md">"Индексы"</a>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.3. Prepare index parameters​</span>
index_params = client.prepare_index_params()​
​
<span class="hljs-comment"># 3.4. Add indexes​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,​
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>​
)​
​
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, ​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;​
<span class="hljs-keyword">import</span> java.util.*;​
​
<span class="hljs-comment">// 3.3 Prepare index parameters​</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForIdField</span> <span class="hljs-operator">=</span> IndexParam.builder()​
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)​
        .indexType(IndexParam.IndexType.STL_SORT)​
        .build();​
​
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForVectorField</span> <span class="hljs-operator">=</span> IndexParam.builder()​
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)​
        .indexType(IndexParam.IndexType.AUTOINDEX)​
        .metricType(IndexParam.MetricType.COSINE)​
        .build();​
​
List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
indexParams.add(indexParamForIdField);​
indexParams.add(indexParamForVectorField);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.2 Prepare index parameters​</span>
<span class="hljs-keyword">const</span> index_params = [{​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;STL_SORT&quot;</span>​
},{​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>​
}]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2&quot;</span>​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>​
)​
​
indexOptions := []client.CreateIndexOption{​
    client.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;my_vector&quot;</span>, index.NewAutoIndex(entity.COSINE)).WithIndexName(<span class="hljs-string">&quot;my_vector&quot;</span>),​
    client.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;my_id&quot;</span>, index.NewSortedIndex()).WithIndexName(<span class="hljs-string">&quot;my_id&quot;</span>),​
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;my_vector&quot;,​
            &quot;metricType&quot;: &quot;COSINE&quot;,​
            &quot;indexName&quot;: &quot;my_vector&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        },​
        {​
            &quot;fieldName&quot;: &quot;my_id&quot;,​
            &quot;indexName&quot;: &quot;my_id&quot;,​
            &quot;indexType&quot;: &quot;STL_SORT&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-Collection​" class="common-anchor-header">Создание коллекции<button data-href="#Create-Collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>Если вы создали коллекцию с параметрами индекса, Milvus автоматически загружает коллекцию при ее создании. В этом случае индексируются все поля, указанные в параметрах индекса.</p>
<p>В следующих фрагментах кода показано, как создать коллекцию с индексными параметрами и проверить состояние ее загрузки.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.5. Create a collection with the index loaded simultaneously​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​
​
res = client.get_load_state(​
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;​
​
<span class="hljs-comment">// 3.4 Create a collection with schema and index parameters​</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq1</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexParams)​
        .build();​
​
client.createCollection(customizedSetupReq1);​
​
<span class="hljs-comment">// 3.5 Get load state of the collection​</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">customSetupLoadStateReq1</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()​
        .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)​
        .build();​
​
<span class="hljs-type">Boolean</span> <span class="hljs-variable">loaded</span> <span class="hljs-operator">=</span> client.getLoadState(customSetupLoadStateReq1);​
System.out.println(loaded);​
​
<span class="hljs-comment">// Output:​</span>
<span class="hljs-comment">// true​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.3 Create a collection with fields and index parameters​</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>,​
    <span class="hljs-attr">fields</span>: fields,​
    <span class="hljs-attr">index_params</span>: index_params,​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)  ​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// Success​</span>
<span class="hljs-comment">// ​</span>
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// LoadStateLoaded​</span>
<span class="hljs-comment">// ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2&quot;</span>​
​
err := cli.CreateCollection(ctx, client.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_1&quot;</span>, schema).​
    WithIndexOptions(indexOptions...),​
)​
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
    <span class="hljs-comment">// handle error​</span>
}​
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;customized_setup_1\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Вы также можете создать коллекцию без индексных параметров и добавить их впоследствии. В этом случае Milvus не загружает коллекцию при ее создании. Подробнее о том, как создать индексы для существующей коллекции, читайте в разделе <a href="/docs/ru/index-vector-fields.md">Index Explained</a>.</p>
<p>Следующий фрагмент кода демонстрирует, как создать коллекцию без индекса, при этом статус загрузки коллекции при создании остается незагруженным.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.6. Create a collection and index it separately​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,​
    schema=schema,​
)​
​
res = client.get_load_state(​
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 3.6 Create a collection and index it separately​</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq2</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)​
    .collectionSchema(schema)​
    .build();​
​
client.createCollection(customizedSetupReq2);​
​
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">customSetupLoadStateReq2</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()​
        .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)​
        .build();​
        ​
<span class="hljs-type">Boolean</span> <span class="hljs-variable">loaded</span> <span class="hljs-operator">=</span> client.getLoadState(customSetupLoadStateReq2);​
System.out.println(loaded);​
​
<span class="hljs-comment">// Output:​</span>
<span class="hljs-comment">// false​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.4 Create a collection and index it seperately​</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,​
    <span class="hljs-attr">fields</span>: fields,​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// Success​</span>
<span class="hljs-comment">// ​</span>
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// LoadStateNotLoad​</span>
<span class="hljs-comment">// ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2&quot;</span>​
​
err := cli.CreateCollection(ctx, client.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_2&quot;</span>, schema))​
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
    <span class="hljs-comment">// handle error​</span>
}​
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;customized_setup_2\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>​
}&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/get_load_state&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;customized_setup_2\&quot;​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Milvus также предоставляет возможность мгновенного создания коллекции. Подробнее см. в разделе <a href="/docs/ru/create-collection-instantly.md">"Мгновенное создание коллекции"</a>.</p>
<h2 id="Set-Collection-Properties​" class="common-anchor-header">Установка свойств коллекции<button data-href="#Set-Collection-Properties​" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете задать свойства создаваемой коллекции, чтобы она вписалась в ваш сервис. Ниже перечислены применимые свойства.</p>
<h3 id="Set-Shard-Number​" class="common-anchor-header">Установить номер осколка</h3><p>Осколки - это горизонтальные срезы коллекции. Каждый шард соответствует каналу ввода данных. По умолчанию каждая коллекция имеет один шард. При создании коллекции вы можете установить соответствующее количество шардов, исходя из ожидаемой пропускной способности и объема данных, которые будут вставляться в коллекцию.</p>
<p>В обычных случаях следует увеличивать количество шардов на один каждый раз, когда ожидаемая пропускная способность увеличивается на 500 МБ/с или объем данных для вставки увеличивается на 100 ГБ. Это предложение основано на нашем собственном опыте и может не полностью соответствовать сценариям ваших приложений. Вы можете изменить это число в соответствии со своими потребностями или просто использовать значение по умолчанию.</p>
<p>Следующий фрагмент кода демонстрирует, как установить номер шарда при создании коллекции.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-meta"># With shard number​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;customized_setup_3&quot;</span>,​
    schema=schema,​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    num_shards=<span class="hljs-number">1</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// With shard number​</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq3</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
    .collectionName(<span class="hljs-string">&quot;customized_setup_3&quot;</span>)​
    .collectionSchema(collectionSchema)​
    <span class="hljs-comment">// highlight-next-line​</span>
    .numShards(<span class="hljs-number">1</span>)​
    .build();​
client.createCollection(customizedSetupReq3);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> createCollectionReq = {​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_3&quot;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-comment">// highlight-next-line​</span>
    <span class="hljs-attr">shards_num</span>: <span class="hljs-number">1</span>​
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2&quot;</span>​
​
err := cli.CreateCollection(ctx, client.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_3&quot;</span>, schema).WithShardNum(<span class="hljs-number">1</span>))​
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
    <span class="hljs-comment">// handle error​</span>
}​
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{​
    &quot;shardsNum&quot;: 1​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;customized_setup_3\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-mmap​" class="common-anchor-header">Включить mmap</h3><p>Milvus по умолчанию включает mmap для всех коллекций, что позволяет Milvus отображать необработанные данные полей в память вместо их полной загрузки. Это уменьшает объем занимаемой памяти и увеличивает емкость коллекции. Подробнее о mmap см. в разделе <a href="/docs/ru/mmap.md">Использование mmap</a>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># With mmap​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;customized_setup_4&quot;</span>,​
    schema=schema,​
    <span class="hljs-comment"># highlight-next-line​</span>
    enable_mmap=<span class="hljs-literal">False</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.Constant;​
​
<span class="hljs-comment">// With MMap​</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq4</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;customized_setup_4&quot;</span>)​
        .collectionSchema(schema)​
        <span class="hljs-comment">// highlight-next-line​</span>
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>)​
        .build();​
client.createCollection(customizedSetupReq4);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">create_collection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_4&quot;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
     <span class="hljs-attr">properties</span>: {​
        <span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">true</span>,​
     },​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2&quot;</span>​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/pkg/common&quot;</span>​
)​
​
err := cli.CreateCollection(ctx, client.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_4&quot;</span>, schema).WithProperty(common.MmapEnabledKey, <span class="hljs-literal">true</span>))​
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
    <span class="hljs-comment">// handle error​</span>
}​
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># Currently not available for REST</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Collection-TTL​" class="common-anchor-header">Установка TTL коллекции</h3><p>Если коллекция должна быть отброшена на определенный период, подумайте о том, чтобы установить ее время жизни (TTL) в секундах. Как только TTL истечет, Milvus удалит сущности в коллекции и сбросит коллекцию. Удаление происходит асинхронно, что означает, что поиск и запросы все еще возможны до завершения удаления.</p>
<p>Следующий фрагмент кода устанавливает TTL на один день (86400 секунд). Рекомендуется устанавливать TTL как минимум на пару дней.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># With TTL​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;customized_setup_5&quot;</span>,​
    schema=schema,​
    <span class="hljs-comment"># highlight-start​</span>
    properties={​
        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">86400</span>​
    }​
    <span class="hljs-comment"># highlight-end​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.Constant;​
​
<span class="hljs-comment">// With TTL​</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq5</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;customized_setup_5&quot;</span>)​
        .collectionSchema(schema)​
        <span class="hljs-comment">// highlight-next-line​</span>
        .property(Constant.TTL_SECONDS, <span class="hljs-string">&quot;86400&quot;</span>)​
        .build();​
client.createCollection(customizedSetupReq5);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> createCollectionReq = {​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_5&quot;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-comment">// highlight-start​</span>
    <span class="hljs-attr">properties</span>: {​
        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">86400</span>​
    }​
    <span class="hljs-comment">// highlight-end​</span>
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2&quot;</span>​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/pkg/common&quot;</span>​
)​
​
err = cli.CreateCollection(ctx, client.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_5&quot;</span>, schema).​
        WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">86400</span>)) <span class="hljs-comment">//  TTL in seconds​</span>
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
        <span class="hljs-comment">// handle error​</span>
}​
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{​
    &quot;ttlSeconds&quot;: 86400​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;customized_setup_5\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Consistency-Level​" class="common-anchor-header">Установка уровня согласованности</h3><p>При создании коллекции вы можете установить уровень согласованности для поисков и запросов в коллекции. Вы также можете изменить уровень согласованности коллекции во время определенного поиска или запроса.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># With consistency level​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;customized_setup_6&quot;</span>,​
    schema=schema,​
    <span class="hljs-comment"># highlight-next​</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;​
​
<span class="hljs-comment">// With consistency level​</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq6</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;customized_setup_6&quot;</span>)​
        .collectionSchema(schema)​
        <span class="hljs-comment">// highlight-next-line​</span>
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
client.createCollection(customizedSetupReq6);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> createCollectionReq = {​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_6&quot;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-comment">// highlight-next​</span>
    <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Bounded&quot;</span>,​
    <span class="hljs-comment">// highlight-end​</span>
}​
​
client.<span class="hljs-title function_">createCollection</span>(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2&quot;</span>​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>​
)​
​
err := cli.CreateCollection(ctx, client.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_6&quot;</span>, schema).​
    WithConsistencyLevel(entity.ClBounded))​
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
    <span class="hljs-comment">// handle error​</span>
}​
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{​
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;customized_setup_6\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Подробнее об уровнях согласованности см. в разделе <a href="/docs/ru/consistency.md">Уровень согласованности</a>.</p>
<h3 id="Enable-Dynamic-Field​" class="common-anchor-header">Включение динамического поля</h3><p>Динамическое поле в коллекции - это зарезервированное поле JavaScript Object Notation (JSON) с именем <strong>$meta</strong>. После включения этого поля Milvus сохраняет все не определенные схемой поля, содержащиеся в каждой сущности, и их значения в виде пар ключ-значение в зарезервированном поле.</p>
<p>Подробнее о том, как использовать динамическое поле, читайте в разделе <a href="/docs/ru/enable-dynamic-field.md">Динамическое поле</a>.</p>