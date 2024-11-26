---
id: nullable-and-default.md
title: 可归零和默认值
related_key: 'nullable, default'
summary: >-
  Milvus 允许你为标量字段（主字段除外）设置 `nullable` 属性和默认值。对于标记为 nullable=True
  的字段，你可以在插入数据时跳过该字段，或直接将其设置为空值，系统会将其视为空值而不会导致错误。
---
<h1 id="Nullable--Default​" class="common-anchor-header">可归零和默认值<button data-href="#Nullable--Default​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 允许你为标量字段（主字段除外）设置<code translate="no">nullable</code> 属性和默认值。对于标记为<code translate="no">nullable=True</code> 的字段，您可以在插入数据时跳过该字段，或直接将其设置为空值，系统会将其视为空值而不会导致错误。当字段具有默认值时，如果在插入过程中没有为该字段指定数据，系统将自动应用该值。</p>
<p>默认值和可归零属性允许处理带有空值的数据集并保留默认值设置，从而简化了从其他数据库系统到 Milvus 的数据迁移。在创建 Collections 时，也可以启用可归零属性或为可能存在不确定值的字段设置默认值。</p>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>只有标量字段（主字段除外）支持默认值和 nullable 属性。</p></li>
<li><p>JSON 和数组字段不支持默认值。</p></li>
<li><p>默认值或 nullable 属性只能在创建 Collections 时配置，之后不能修改。</p></li>
<li><p>启用了可归零属性的标量字段不能在分组搜索中用作<code translate="no">group_by_field</code> 。有关分组搜索的更多信息，请参阅<a href="/docs/zh/grouping-search.md">分组搜索</a>。</p></li>
<li><p>标记为可归零的字段不能用作分区键。有关分区键的更多信息，请参阅<a href="/docs/zh/use-partition-key.md">使用分区键</a>。</p></li>
<li><p>在启用可归零属性的标量字段上创建索引时，索引中将排除空值。</p></li>
</ul>
<h2 id="Nullable-attribute" class="common-anchor-header">可归零属性<button data-href="#Nullable-attribute" class="anchor-icon" translate="no">
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
    </button></h2><p>通过<code translate="no">nullable</code> 属性，可以在 Collections 中存储空值，从而在处理未知数据时提供灵活性。</p>
<h3 id="Set-the-nullable-attribute​" class="common-anchor-header">设置 nullable 属性</h3><p>创建 Collections 时，使用<code translate="no">nullable=True</code> 定义可归零字段（默认为<code translate="no">False</code> ）。下面的示例创建了一个名为<code translate="no">user_profiles_null</code> 的 Collection，并将<code translate="no">age</code> 字段设置为可归零。</p>
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
<h3 id="Insert-entities" class="common-anchor-header">插入实体</h3><p>在可空字段中插入数据时，插入空值或直接省略该字段。</p>
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
<h3 id="Search-and-query-with-null-values​" class="common-anchor-header">使用空值进行搜索和查询</h3><p>使用<code translate="no">search</code> 方法时，如果字段包含<code translate="no">null</code> 值，搜索结果将以空值返回该字段。</p>
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
<p>使用<code translate="no">query</code> 方法进行标量过滤时，空值的过滤结果都是 false，表示不会选择这些值。</p>
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
<p>要查询<code translate="no">null</code> 值的实体，请使用空表达式<code translate="no">&quot;&quot;</code> 。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">null_results = client.query(​
    collection_name=<span class="hljs-string">&quot;user_profiles_null&quot;</span>,​
    filter=<span class="hljs-string">&quot;&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]​
)​
​
# Example output:​
# [{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;age&quot;</span>: None}, {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;age&quot;</span>: None}]​

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
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]​
);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;user_profiles_null&quot;,​
    &quot;expr&quot;: &quot;&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;age&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:30,&quot;id&quot;:1},{&quot;age&quot;:null,&quot;id&quot;:2},{&quot;age&quot;:null,&quot;id&quot;:3}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Default-values​" class="common-anchor-header">默认值<button data-href="#Default-values​" class="anchor-icon" translate="no">
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
    </button></h2><p>默认值是分配给标量字段的预设值。如果在插入时没有为有默认值的字段提供值，系统会自动使用默认值。</p>
<h3 id="Set-default-values" class="common-anchor-header">设置默认值</h3><p>创建 Collections 时，使用<code translate="no">default_value</code> 参数定义字段的默认值。下面的示例显示了如何将<code translate="no">age</code> 的默认值设置为<code translate="no">18</code> ，将<code translate="no">status</code> 的默认值设置为<code translate="no">&quot;active&quot;</code> 。</p>
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
<h3 id="Insert-entities" class="common-anchor-header">插入实体</h3><p>插入数据时，如果省略有默认值的字段或将其值设为空，系统将使用默认值。</p>
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
<p>有关空值和默认值设置如何生效的更多信息，请参阅<a href="#applicable-rules">适用规则</a>。</p>
</div>
<h3 id="Search-and-query-with-default-values" class="common-anchor-header">使用默认值进行搜索和查询</h3><p>在向量搜索和标量过滤过程中，包含默认值的实体与其他实体的处理方式相同。您可以将默认值作为<code translate="no">search</code> 和<code translate="no">query</code> 操作符的一部分。</p>
<p>例如，在<code translate="no">search</code> 操作符中，将<code translate="no">age</code> 设置为默认值<code translate="no">18</code> 的实体将包含在结果中。</p>
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
<p>在<code translate="no">query</code> 操作符中，可以直接通过默认值进行匹配或过滤。</p>
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
<h2 id="Applicable-rules" class="common-anchor-header">适用规则<button data-href="#Applicable-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>下表总结了可归零列和默认值在不同配置组合下的行为。这些规则决定了 Milvus 在尝试插入空值或未提供字段值时如何处理数据。</p>
<table>
<thead>
<tr><th>可归零</th><th>默认值</th><th>默认值类型</th><th>用户输入</th><th>结果</th><th>示例</th></tr>
</thead>
<tbody>
<tr><td>✅</td><td>✅</td><td>非空</td><td>无/空</td><td>使用默认值</td><td><ul><li>字段：<code translate="no">age</code></li><li>默认值：<code translate="no">18</code></li><li>用户输入：空</li><li>结果：存储为<code translate="no">18</code></li></ul></td></tr>
<tr><td>✅</td><td>❌</td><td>-</td><td>无/空</td><td>存储为空</td><td><ul><li>字段：<code translate="no">middle_name</code></li><li>默认值： -用户</li><li>输入：空</li><li>结果：存储为空</td></tr>
<tr><td>❌</td><td>✅</td><td>非空</td><td>无/空</td><td>使用默认值</td><td><ul><li>字段：<code translate="no">status</code></li><li>默认值：<code translate="no">&quot;active&quot;</code></li><li>用户输入：空</li><li>结果：存储为<code translate="no">&quot;active&quot;</code></td></tr>
<tr><td>❌</td><td>❌</td><td>-</td><td>无/空</td><td>抛出错误</td><td><ul><li>字段：<code translate="no">email</code></li><li>默认值： -用户</li><li>输入：空</li><li>结果：操作被拒绝，系统抛出错误</td></tr>
<tr><td>❌</td><td>✅</td><td>空</td><td>无/空</td><td>抛出错误</td><td><ul><li>字段：<code translate="no">username</code></li><li>默认值：空用户</li><li>输入：空</li><li>结果：操作被拒绝，系统提示错误</td></tr>
</tbody>
</table>
