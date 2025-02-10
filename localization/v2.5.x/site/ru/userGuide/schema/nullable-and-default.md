---
id: nullable-and-default.md
title: Nullable & Default
related_key: 'nullable, default'
summary: >-
  Milvus позволяет установить атрибут `nullable` и значения по умолчанию для
  скалярных полей, за исключением первичного поля. Для полей, помеченных как
  nullable=True, вы можете пропустить поле при вставке данных или задать ему
  прямое нулевое значение, и система будет воспринимать его как нулевое, не
  вызывая ошибки.
---
<h1 id="Nullable--Default​" class="common-anchor-header">Nullable &amp; Default<button data-href="#Nullable--Default​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus позволяет установить атрибут <code translate="no">nullable</code> и значения по умолчанию для скалярных полей, за исключением первичного поля. Для полей, помеченных как <code translate="no">nullable=True</code>, вы можете пропустить поле при вставке данных или установить для него прямое нулевое значение, и система будет воспринимать его как нулевое, не вызывая ошибки. Если поле имеет значение по умолчанию, система автоматически применит это значение, если при вставке данных для поля не будет указано.</p>
<p>Атрибуты default value и nullable упрощают миграцию данных из других систем баз данных в Milvus, позволяя работать с наборами данных с нулевыми значениями и сохранять настройки значений по умолчанию. При создании коллекции вы также можете включить nullable или установить значения по умолчанию для полей, значения которых могут быть неопределенными.</p>
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
<li><p>Только скалярные поля, за исключением первичного поля, поддерживают значения по умолчанию и атрибут nullable.</p></li>
<li><p>Поля JSON и Array не поддерживают значения по умолчанию.</p></li>
<li><p>Значения по умолчанию или атрибут nullable можно настроить только при создании коллекции и не изменять после этого.</p></li>
<li><p>Скалярные поля с включенным атрибутом nullable нельзя использовать в качестве <code translate="no">group_by_field</code> в группировочном поиске. Дополнительные сведения о группировочном поиске см. в разделе <a href="/docs/ru/grouping-search.md">Группировочный поиск</a>.</p></li>
<li><p>Поля, помеченные как nullable, нельзя использовать в качестве ключей разделов. Дополнительные сведения о ключах разделов см. в разделе <a href="/docs/ru/use-partition-key.md">Использование ключей разделов</a>.</p></li>
<li><p>При создании индекса по скалярному полю с включенным атрибутом nullable нулевые значения будут исключены из индекса.</p></li>
</ul>
<h2 id="Nullable-attribute" class="common-anchor-header">Атрибут Nullable<button data-href="#Nullable-attribute" class="anchor-icon" translate="no">
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
    </button></h2><p>Атрибут <code translate="no">nullable</code> позволяет хранить в коллекции нулевые значения, обеспечивая гибкость при работе с неизвестными данными.</p>
<h3 id="Set-the-nullable-attribute​" class="common-anchor-header">Установка атрибута nullable</h3><p>При создании коллекции используйте <code translate="no">nullable=True</code> для определения полей с нулевыми значениями (по умолчанию <code translate="no">False</code>). Следующий пример создает коллекцию с именем <code translate="no">user_profiles_null</code> и устанавливает поле <code translate="no">age</code> как nullable.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
client = MilvusClient(uri=<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>)​
​
<span class="hljs-comment"># Define collection schema​</span>
schema = client.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    enable_dynamic_schema=<span class="hljs-literal">True</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;age&quot;</span>, datatype=DataType.INT64, nullable=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Nullable field​</span>
​
<span class="hljs-comment"># Set index params​</span>
index_params = client.prepare_index_params()​
index_params.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>, params={ <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span> })​
​
<span class="hljs-comment"># Create collection​</span>
client.create_collection(collection_name=<span class="hljs-string">&quot;user_profiles_null&quot;</span>, schema=schema, index_params=index_params)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-keyword">import</span> java.util.*;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
        ​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)​
        .dataType(DataType.Int64)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">5</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;age&quot;</span>)​
        .dataType(DataType.Int64)​
        .isNullable(<span class="hljs-literal">true</span>)​
        .build());​
​
List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
Map&lt;String,Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
extraParams.put(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">128</span>);​
indexes.add(IndexParam.builder()​
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)​
        .indexType(IndexParam.IndexType.IVF_FLAT)​
        .metricType(IndexParam.MetricType.L2)​
        .extraParams(extraParams)​
        .build());​
​
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;user_profiles_null&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexes)​
        .build();​
client.createCollection(requestCreate);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({​
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,​
});​
​
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;user_profiles_null&quot;</span>,​
  <span class="hljs-attr">schema</span>: [​
    {​
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,​
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">int64</span>,​
    },​
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span> },​
​
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span> },​
  ],​
​
  <span class="hljs-attr">index_params</span>: [​
    {​
      <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_inde&quot;</span>,​
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>,​
      <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">L2</span>,​
      <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,​
    },​
  ],​
});​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;id&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;vector&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 5​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> nullField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;age&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;nullable&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$pkField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$nullField</span>​
    ]​
}&quot;</span>​
​
<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;vector&quot;,​
            &quot;metricType&quot;: &quot;L2&quot;,​
            &quot;indexType&quot;: &quot;IVF_FLAT&quot;,​
            &quot;params&quot;:{&quot;nlist&quot;: 128}​
        }​
    ]&#x27;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;user_profiles_null\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-entities" class="common-anchor-header">Вставка сущностей</h3><p>Когда вы вставляете данные в поле с возможностью зануления, вставьте null или непосредственно опустите это поле.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">data = [​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">30</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-literal">None</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>]}​
]​
​
client.insert(collection_name=<span class="hljs-string">&quot;user_profiles_null&quot;</span>, data=data)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 1, \&quot;vector\&quot;: [0.1, 0.2, 0.3, 0.4, 0.5], \&quot;age\&quot;: 30}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 2, \&quot;vector\&quot;: [0.2, 0.3, 0.4, 0.5, 0.6], \&quot;age\&quot;: null}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 3, \&quot;vector\&quot;: [0.3, 0.4, 0.5, 0.6, 0.7]}&quot;</span>, JsonObject.class));​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;user_profiles_null&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">const data = [​
  { <span class="hljs-built_in">id</span>: <span class="hljs-number">1</span>, vector: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], age: <span class="hljs-number">30</span> },​
  { <span class="hljs-built_in">id</span>: <span class="hljs-number">2</span>, vector: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>], age: null },​
  { <span class="hljs-built_in">id</span>: <span class="hljs-number">3</span>, vector: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>] },​
];​
​
client.insert({​
  collection_name: <span class="hljs-string">&quot;user_profiles_null&quot;</span>,​
  data: data,​
});​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {&quot;id&quot;: 1, &quot;vector&quot;: [0.1, 0.2, 0.3, 0.4, 0.5], &quot;age&quot;: 30},​
        {&quot;id&quot;: 2, &quot;vector&quot;: [0.2, 0.3, 0.4, 0.5, 0.6], &quot;age&quot;: null}, ​
        {&quot;id&quot;: 3, &quot;vector&quot;: [0.3, 0.4, 0.5, 0.6, 0.7]} ​
    ],​
    &quot;collectionName&quot;: &quot;user_profiles_null&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-and-query-with-null-values​" class="common-anchor-header">Поиск и запрос с нулевыми значениями</h3><p>При использовании метода <code translate="no">search</code>, если поле содержит значения <code translate="no">null</code>, результат поиска вернет поле как null.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(​
    collection_name=<span class="hljs-string">&quot;user_profiles_null&quot;</span>,​
    data=[[0.1, 0.2, 0.4, 0.3, 0.128]],​
    <span class="hljs-built_in">limit</span>=2,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: 16}},​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.15838398039340973, &#x27;entity&#x27;: {&#x27;age&#x27;: 30, &#x27;id&#x27;: 1}}, {&#x27;id&#x27;: 2, &#x27;distance&#x27;: 0.28278401494026184, &#x27;entity&#x27;: {&#x27;age&#x27;: None, &#x27;id&#x27;: 2}}]&quot;] ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">SearchReq</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">data</span>.<span class="hljs-property">FloatVec</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">response</span>.<span class="hljs-property">SearchResp</span>;​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
params.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">16</span>);​
<span class="hljs-title class_">SearchResp</span> resp = client.<span class="hljs-title function_">search</span>(<span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;user_profiles_null&quot;</span>)​
        .<span class="hljs-title function_">annsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)​
        .<span class="hljs-title function_">data</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> float[]{<span class="hljs-number">0.</span>1f, <span class="hljs-number">0.</span>2f, <span class="hljs-number">0.</span>3f, <span class="hljs-number">0.</span>4f, <span class="hljs-number">0.</span>5f})))​
        .<span class="hljs-title function_">topK</span>(<span class="hljs-number">2</span>)​
        .<span class="hljs-title function_">searchParams</span>(params)​
        .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>))​
        .<span class="hljs-title function_">build</span>());​
​
<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(resp.<span class="hljs-title function_">getSearchResults</span>());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={id=1, age=30}, score=0.0, id=1), SearchResp.SearchResult(entity={id=2, age=null}, score=0.050000004, id=2)]]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.search({​
    collection_name: <span class="hljs-string">&#x27;user_profiles_null&#x27;</span>,​
    data: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.5</span>],​
    limit: <span class="hljs-number">2</span>,​
    output_fields: [<span class="hljs-string">&#x27;age&#x27;</span>, <span class="hljs-string">&#x27;id&#x27;</span>],​
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;25 &lt;= age &lt;= 35&#x27;</span>,​
    params: {​
        nprobe: <span class="hljs-number">16</span>​
    }​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;user_profiles_null&quot;,​
    &quot;data&quot;: [​
        [0.1, -0.2, 0.3, 0.4, 0.5]​
    ],​
    &quot;annsField&quot;: &quot;vector&quot;,​
    &quot;limit&quot;: 5,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;age&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment">#{&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:30,&quot;distance&quot;:0.16000001,&quot;id&quot;:1},{&quot;age&quot;:null,&quot;distance&quot;:0.28999996,&quot;id&quot;:2},{&quot;age&quot;:null,&quot;distance&quot;:0.52000004,&quot;id&quot;:3}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Когда вы используете метод <code translate="no">query</code> для скалярной фильтрации, результаты фильтрации для нулевых значений будут ложными, что означает, что они не будут выбраны.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Reviewing previously inserted data:​</span>
<span class="hljs-comment"># {&quot;id&quot;: 1, &quot;vector&quot;: [0.1, 0.2, ..., 0.128], &quot;age&quot;: 30}​</span>
<span class="hljs-comment"># {&quot;id&quot;: 2, &quot;vector&quot;: [0.2, 0.3, ..., 0.129], &quot;age&quot;: None}​</span>
<span class="hljs-comment"># {&quot;id&quot;: 3, &quot;vector&quot;: [0.3, 0.4, ..., 0.130], &quot;age&quot;: None}  # Omitted age  column is treated as None​</span>
​
results = client.query(​
    collection_name=<span class="hljs-string">&quot;user_profiles_null&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;age &gt;= 0&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]​
)​
​
<span class="hljs-comment"># Example output:​</span>
<span class="hljs-comment"># [​</span>
<span class="hljs-comment">#     {&quot;id&quot;: 1, &quot;age&quot;: 30}​</span>
<span class="hljs-comment"># ]​</span>
<span class="hljs-comment"># Note: Entities with `age` as `null` (id 2 and 3) will not appear in the result.​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;user_profiles_null&quot;</span>)​
        .filter(<span class="hljs-string">&quot;age &gt;= 0&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>))​
        .build());​
​
System.out.println(resp.getQueryResults());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [QueryResp.QueryResult(entity={id=1, age=30})]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>(​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;user_profiles_null&quot;</span>,​
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;age &gt;= 0&quot;</span>,​
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]​
);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;user_profiles_null&quot;,​
    &quot;filter&quot;: &quot;age &gt;= 0&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;age&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:30,&quot;id&quot;:1}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Чтобы вернуть сущности с нулевыми значениями, сделайте запрос без условия скалярной фильтрации следующим образом:</p>
<div class="alert note">
<p>Метод <code translate="no">query</code>, используемый без каких-либо условий фильтрации, возвращает все сущности в коллекции, включая сущности с нулевыми значениями. Чтобы ограничить количество возвращаемых сущностей, необходимо указать параметр <code translate="no">limit</code>.</p>
</div>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">null_results = client.query(
    collection_name=<span class="hljs-string">&quot;user_profiles_null&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>, <span class="hljs-comment"># Query without any filtering condition</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>],
    limit=<span class="hljs-number">10</span> <span class="hljs-comment"># `limit` parameter is required when using `query` method without filtering condition</span>
)
​
<span class="hljs-comment"># Example output:​</span>
<span class="hljs-comment"># [&quot;{&#x27;id&#x27;: 1, &#x27;age&#x27;: 30}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;age&#x27;: None}&quot;, &quot;{&#x27;id&#x27;: 3, &#x27;age&#x27;: None}&quot;]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">QueryResp resp = client.query(QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;user_profiles_null&quot;</span>)​
        .<span class="hljs-built_in">filter</span>(<span class="hljs-string">&quot;&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>))​
        .limit(<span class="hljs-number">10</span>)​
        .build());​
​
System.out.println(resp.getQueryResults());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>(​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;user_profiles_null&quot;</span>,​
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;&quot;</span>,​
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]​,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>​
);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;user_profiles_null&quot;,​
    &quot;expr&quot;: &quot;&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;age&quot;]​,
    &quot;limit&quot;: 10
}&#x27;</span>​
​
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:30,&quot;id&quot;:1},{&quot;age&quot;:null,&quot;id&quot;:2},{&quot;age&quot;:null,&quot;id&quot;:3}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Default-values​" class="common-anchor-header">Значения по умолчанию<button data-href="#Default-values​" class="anchor-icon" translate="no">
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
    </button></h2><p>Значения по умолчанию - это предустановленные значения, присваиваемые скалярным полям. Если при вставке вы не указываете значение для поля, имеющего значение по умолчанию, система автоматически использует значение по умолчанию.</p>
<h3 id="Set-default-values" class="common-anchor-header">Установка значений по умолчанию</h3><p>При создании коллекции используйте параметр <code translate="no">default_value</code>, чтобы задать значение по умолчанию для поля. В следующем примере показано, как установить значение по умолчанию для <code translate="no">age</code> на <code translate="no">18</code> и <code translate="no">status</code> на <code translate="no">&quot;active&quot;</code>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema = client.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    enable_dynamic_schema=<span class="hljs-literal">True</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;age&quot;</span>, datatype=DataType.INT64, default_value=<span class="hljs-number">18</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;status&quot;</span>, datatype=DataType.VARCHAR, default_value=<span class="hljs-string">&quot;active&quot;</span>, max_length=<span class="hljs-number">10</span>)​
​
index_params = client.prepare_index_params()​
index_params.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>, params={ <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span> })​
​
client.create_collection(collection_name=<span class="hljs-string">&quot;user_profiles_default&quot;</span>, schema=schema, index_params=index_params)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-keyword">import</span> java.util.*;​
​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)​
        .dataType(DataType.Int64)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">5</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;age&quot;</span>)​
        .dataType(DataType.Int64)​
        .defaultValue(<span class="hljs-number">18L</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;status&quot;</span>)​
        .dataType(DataType.VarChar)​
        .maxLength(<span class="hljs-number">10</span>)​
        .defaultValue(<span class="hljs-string">&quot;active&quot;</span>)​
        .build());​
​
List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
Map&lt;String,Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
extraParams.put(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">128</span>);​
indexes.add(IndexParam.builder()​
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)​
        .indexType(IndexParam.IndexType.IVF_FLAT)​
        .metricType(IndexParam.MetricType.L2)​
        .extraParams(extraParams)​
        .build());​
​
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;user_profiles_default&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexes)​
        .build();​
client.createCollection(requestCreate);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({​
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,​
});​
​
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;user_profiles_default&quot;</span>,​
  <span class="hljs-attr">schema</span>: [​
    {​
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,​
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">int64</span>,​
    },​
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span> },​
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">default_value</span>: <span class="hljs-number">18</span> },​
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;status&#x27;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">30</span>, <span class="hljs-attr">default_value</span>: <span class="hljs-string">&#x27;active&#x27;</span>},​
  ],​
​
  <span class="hljs-attr">index_params</span>: [​
    {​
      <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_inde&quot;</span>,​
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>,​
      <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">L2</span>,​
      <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">IVF_FLAT</span>,​
    },​
  ],​
});​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;id&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;vector&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 5​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> defaultValueField1=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;age&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;defaultValue&quot;: 18​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> defaultValueField2=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;status&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;defaultValue&quot;: &quot;active&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 10​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$pkField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$defaultValueField1</span>,​
        <span class="hljs-variable">$defaultValueField2</span>​
    ]​
}&quot;</span>​
​
<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;vector&quot;,​
            &quot;metricType&quot;: &quot;L2&quot;,​
            &quot;indexType&quot;: &quot;IVF_FLAT&quot;,​
            &quot;params&quot;:{&quot;nlist&quot;: 128}​
        }​
    ]&#x27;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;user_profiles_default\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-entities" class="common-anchor-header">Вставка сущностей</h3><p>При вставке данных, если вы опустите поля со значением по умолчанию или установите для них значение null, система будет использовать значение по умолчанию.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">data = [​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, ..., <span class="hljs-number">0.128</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-string">&quot;premium&quot;</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, ..., <span class="hljs-number">0.129</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, ..., <span class="hljs-number">0.130</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-literal">None</span>}, 
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, ..., <span class="hljs-number">0.131</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-string">&quot;inactive&quot;</span>} 
]​
​
client.insert(collection_name=<span class="hljs-string">&quot;user_profiles_default&quot;</span>, data=data)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">import com.google.gson.Gson;​
import com.google.gson.JsonObject;​
​
import io.milvus.v2.service.vector.request.InsertReq;​
import io.milvus.v2.service.vector.response.InsertResp;​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();​
Gson gson = <span class="hljs-keyword">new</span> Gson();​
rows.<span class="hljs-keyword">add</span>(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 1, \&quot;vector\&quot;: [0.1, 0.2, 0.3, 0.4, 0.5], \&quot;age\&quot;: 30, \&quot;status\&quot;: \&quot;premium\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>));​
rows.<span class="hljs-keyword">add</span>(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 2, \&quot;vector\&quot;: [0.2, 0.3, 0.4, 0.5, 0.6]}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>));​
rows.<span class="hljs-keyword">add</span>(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 3, \&quot;vector\&quot;: [0.3, 0.4, 0.5, 0.6, 0.7], \&quot;age\&quot;: 25, \&quot;status\&quot;: null}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>));​
rows.<span class="hljs-keyword">add</span>(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 4, \&quot;vector\&quot;: [0.4, 0.5, 0.6, 0.7, 0.8], \&quot;age\&quot;: null, \&quot;status\&quot;: \&quot;inactive\&quot;}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>));​
​
InsertResp insertR = client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;user_profiles_default&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-string">&quot;premium&quot;</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>]}, ​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-literal">null</span>}, ​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-literal">null</span>, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-string">&quot;inactive&quot;</span>}  ​
];​
​
client.<span class="hljs-title function_">insert</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;user_profiles_default&quot;</span>,​
  <span class="hljs-attr">data</span>: data,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {&quot;id&quot;: 1, &quot;vector&quot;: [0.1, 0.2, 0.3, 0.4, 0.5], &quot;age&quot;: 30, &quot;status&quot;: &quot;premium&quot;},​
        {&quot;id&quot;: 2, &quot;vector&quot;: [0.2, 0.3, 0.4, 0.5, 0.6]},​
        {&quot;id&quot;: 3, &quot;vector&quot;: [0.3, 0.4, 0.5, 0.6, 0.7], &quot;age&quot;: 25, &quot;status&quot;: null}, ​
        {&quot;id&quot;: 4, &quot;vector&quot;: [0.4, 0.5, 0.6, 0.7, 0.8], &quot;age&quot;: null, &quot;status&quot;: &quot;inactive&quot;}      ​
    ],​
    &quot;collectionName&quot;: &quot;user_profiles_default&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Дополнительную информацию о том, как вступают в силу параметры nullable и значения по умолчанию, см. в разделе <a href="#applicable-rules">Применимые правила</a>.</p>
</div>
<h3 id="Search-and-query-with-default-values" class="common-anchor-header">Поиск и запрос со значениями по умолчанию</h3><p>Сущности, содержащие значения по умолчанию, при векторном поиске и скалярной фильтрации обрабатываются так же, как и любые другие сущности. Значения по умолчанию можно включать в операции <code translate="no">search</code> и <code translate="no">query</code>.</p>
<p>Например, при выполнении операции <code translate="no">search</code> в результаты будут включены сущности, для которых в параметре <code translate="no">age</code> установлено значение по умолчанию <code translate="no">18</code>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(​
    collection_name=<span class="hljs-string">&quot;user_profiles_default&quot;</span>,​
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.128</span>]],​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">16</span>}},​
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;age == 18&quot;</span>,  <span class="hljs-comment"># 18 is the default value of the `age` field​</span>
    limit=<span class="hljs-number">10</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 2, &#x27;distance&#x27;: 0.28278401494026184, &#x27;entity&#x27;: {&#x27;id&#x27;: 2, &#x27;age&#x27;: 18, &#x27;status&#x27;: &#x27;active&#x27;}}, {&#x27;id&#x27;: 4, &#x27;distance&#x27;: 0.8315839767456055, &#x27;entity&#x27;: {&#x27;id&#x27;: 4, &#x27;age&#x27;: 18, &#x27;status&#x27;: &#x27;inactive&#x27;}}]&quot;] ​</span>
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">SearchReq</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">data</span>.<span class="hljs-property">FloatVec</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">response</span>.<span class="hljs-property">SearchResp</span>;​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
params.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">16</span>);​
<span class="hljs-title class_">SearchResp</span> resp = client.<span class="hljs-title function_">search</span>(<span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;user_profiles_default&quot;</span>)​
        .<span class="hljs-title function_">annsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)​
        .<span class="hljs-title function_">data</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> float[]{<span class="hljs-number">0.</span>1f, <span class="hljs-number">0.</span>2f, <span class="hljs-number">0.</span>3f, <span class="hljs-number">0.</span>4f, <span class="hljs-number">0.</span>5f})))​
        .<span class="hljs-title function_">searchParams</span>(params)​
        .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;age == 18&quot;</span>)​
        .<span class="hljs-title function_">topK</span>(<span class="hljs-number">10</span>)​
        .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>))​
        .<span class="hljs-title function_">build</span>());​
​
<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(resp.<span class="hljs-title function_">getSearchResults</span>());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={id=2, age=18, status=active}, score=0.050000004, id=2), SearchResp.SearchResult(entity={id=4, age=18, status=inactive}, score=0.45000002, id=4)]]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.search({​
    collection_name: <span class="hljs-string">&#x27;user_profiles_default&#x27;</span>,​
    data: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.5</span>],​
    limit: <span class="hljs-number">2</span>,​
    output_fields: [<span class="hljs-string">&#x27;age&#x27;</span>, <span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-string">&#x27;status&#x27;</span>],​
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;age == 18&#x27;</span>,​
    params: {​
        nprobe: <span class="hljs-number">16</span>​
    }​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;user_profiles_default&quot;,​
    &quot;data&quot;: [​
        [0.1, 0.2, 0.3, 0.4, 0.5]​
    ],​
    &quot;annsField&quot;: &quot;vector&quot;,​
    &quot;limit&quot;: 5,​
    &quot;filter&quot;: &quot;age == 18&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;age&quot;, &quot;status&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:18,&quot;distance&quot;:0.050000004,&quot;id&quot;:2,&quot;status&quot;:&quot;active&quot;},{&quot;age&quot;:18,&quot;distance&quot;:0.45000002,&quot;id&quot;:4,&quot;status&quot;:&quot;inactive&quot;}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>В операции <code translate="no">query</code> вы можете искать или фильтровать по значениям по умолчанию напрямую.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query all entities where `age` equals the default value (18)​</span>
default_age_results = client.query(​
    collection_name=<span class="hljs-string">&quot;user_profiles_default&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;age == 18&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]​
)​
​
<span class="hljs-comment"># Query all entities where `status` equals the default value (&quot;active&quot;)​</span>
default_status_results = client.query(​
    collection_name=<span class="hljs-string">&quot;user_profiles_default&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">ageResp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;user_profiles_default&quot;</span>)​
        .filter(<span class="hljs-string">&quot;age == 18&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>))​
        .build());​
​
System.out.println(ageResp.getQueryResults());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [QueryResp.QueryResult(entity={id=2, age=18, status=active}), QueryResp.QueryResult(entity={id=4, age=18, status=inactive})]​</span>
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">statusResp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;user_profiles_default&quot;</span>)​
        .filter(<span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>))​
        .build());​
​
System.out.println(statusResp.getQueryResults());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [QueryResp.QueryResult(entity={id=2, age=18, status=active}), QueryResp.QueryResult(entity={id=3, age=25, status=active})]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Query all entities where `age` equals the default value (18)​</span>
<span class="hljs-keyword">const</span> default_age_results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>(​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;user_profiles_default&quot;</span>,​
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;age == 18&quot;</span>,​
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]​
);​
<span class="hljs-comment">// Query all entities where `status` equals the default value (&quot;active&quot;)​</span>
<span class="hljs-keyword">const</span> default_status_results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>(​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;user_profiles_default&quot;</span>,​
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>,​
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;user_profiles_default&quot;,​
    &quot;filter&quot;: &quot;age == 18&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;age&quot;, &quot;status&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:18,&quot;id&quot;:2,&quot;status&quot;:&quot;active&quot;},{&quot;age&quot;:18,&quot;id&quot;:4,&quot;status&quot;:&quot;inactive&quot;}]}​</span>
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;user_profiles_default&quot;,​
    &quot;filter&quot;: &quot;status == \&quot;active\&quot;&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;age&quot;, &quot;status&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:18,&quot;id&quot;:2,&quot;status&quot;:&quot;active&quot;},{&quot;age&quot;:25,&quot;id&quot;:3,&quot;status&quot;:&quot;active&quot;}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Applicable-rules" class="common-anchor-header">Применимые правила<button data-href="#Applicable-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующей таблице представлено поведение нулевых столбцов и значений по умолчанию при различных комбинациях конфигурации. Эти правила определяют, как Milvus обрабатывает данные при попытке вставить нулевые значения или если значения полей не предоставлены.</p>
<table>
<thead>
<tr><th>Нулевые</th><th>Значение по умолчанию</th><th>Тип значения по умолчанию</th><th>Пользовательский ввод</th><th>Результат</th><th>Пример</th></tr>
</thead>
<tbody>
<tr><td>✅</td><td>✅</td><td>Non-null</td><td>Нет/нулевой</td><td>Используется значение по умолчанию</td><td><ul><li>Поле: <code translate="no">age</code></li><li>Значение по умолчанию: <code translate="no">18</code></li><li>Пользовательский ввод: null</li><li>Результат: хранится как <code translate="no">18</code></li></ul></td></tr>
<tr><td>✅</td><td>❌</td><td>-</td><td>Нет/null</td><td>Хранится как null</td><td><ul><li>Поле:</li><li> <code translate="no">middle_name</code></li><li>Значение по умолчанию:</li><li>-Ввод</li><li>пользователя</li><li>: null</li><li>Результат: сохранено как null</td></tr>
<tr><td>❌</td><td>✅</td><td>Не нулевое</td><td>None/null</td><td>Использует значение по умолчанию</td><td><ul><li>Поле:</li><li> <code translate="no">status</code></li><li>Значение по умолчанию:</li><li> <code translate="no">&quot;active&quot;</code></li><li>Пользовательский ввод: null</li><li>Результат: сохраняется как <code translate="no">&quot;active&quot;</code></td></tr>
<tr><td>❌</td><td>❌</td><td>-</td><td>Нет/null</td><td>Выбрасывает ошибку</td><td><ul><li>Поле:</li><li> <code translate="no">email</code></li><li>Значение по умолчанию:</li><li>-Ввод</li><li>пользователя</li><li>: null</li><li>Результат: Операция отклонена, система выбрасывает ошибку</td></tr>
<tr><td>❌</td><td>✅</td><td>Null</td><td>None/null</td><td>Выбрасывает ошибку</td><td><ul><li>Поле:</li><li> <code translate="no">username</code></li><li>Значение по умолчанию:</li><li>nullВвод</li><li>пользователя</li><li>: null</li><li>Результат: Операция отклонена, система выбрасывает ошибку</td></tr>
</tbody>
</table>
