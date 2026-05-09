---
id: nullable-and-default.md
title: 可空欄位
summary: 設定可空欄位和預設值，包括模式、插入、索引、搜尋和篩選行為。
---
<h1 id="Nullable-Fields" class="common-anchor-header">可空欄位<button data-href="#Nullable-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 支援 nullable 欄位，允許欄位值遺失或明確設定為 NULL。可空欄位在模式層級定義，並一致地應用於資料擷取、索引、搜尋和查詢作業。</p>
<p>在下列情況下使用可空欄位</p>
<ul>
<li>資料從允許缺失值的外部系統擷取。</li>
<li>某些元資料是可選的，或只適用於部分資料集。</li>
<li>向量嵌入以非同步方式產生，並在稍後插入。</li>
</ul>
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
<li><p>允許 NULL 值的向量欄位不支援<code translate="no">IS NULL</code> 或<code translate="no">IS NOT NULL</code> 過濾表達式。您無法根據向量欄位值是否為 NULL 來明確過濾實體。</p></li>
<li><p><a href="/docs/zh-hant/array-of-structs.md">Structs 陣列</a>欄位不支援 NULL 值。您無法將 Array of Structs 欄位或嵌套在其內的任何欄位標記為 nullable。</p></li>
<li><p>nullable 屬性是在欄位建立時定義的，之後就無法修改。您無法啟用或停用現有欄位的 nullability。</p></li>
<li><p>標記為 nullable 的欄位不能用作分割鍵。分区键字段必须始终包含有效的非空值。如需詳細資訊，請參閱<a href="/docs/zh-hant/use-partition-key.md">使用分割區金鑰</a>。</p></li>
</ul>
<h2 id="What-is-a-nullable-field" class="common-anchor-header">什麼是可空欄位？<button data-href="#What-is-a-nullable-field" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中，是否允許欄位儲存 NULL 值是由一個名為<code translate="no">nullable</code> 的模式層級欄位屬性所控制。</p>
<p>當一個欄位被定義為<code translate="no">nullable=True</code> 時，Milvus 允許在資料擷取過程中，欄位的值是缺失的。實際上，Milvus 將以下兩種輸入視為等同，並將欄位值儲存為 NULL：</p>
<ul>
<li>欄位從輸入實體中省略。</li>
<li>欄位被明確設定為 NULL (例如，Python 中的<code translate="no">None</code> )。</li>
</ul>
<p>如果欄位未定義為 nullable (預設行為)，每個實體都必須提供該欄位的有效值。遺漏欄位或明確指定 NULL 值會導致插入或匯入作業失敗。</p>
<p>集合模式中的<strong>標量欄位和向量欄位</strong>都支援 nullable 屬性。但是，Array of Structs 欄位不支援 nullable 屬性。</p>
<div class="alert note">
<p>Nullability 決定欄位值是否可能遺失；它並未定義當欄位遺失時使用的值。</p>
<ul>
<li>如果配置的 nullable 欄位沒有預設值，遺漏欄位會導致儲存 NULL 值。</li>
<li>如果配置了預設值，Milvus 可能會儲存預設值。詳情請參閱<a href="/docs/zh-hant/default-values.md">預設值</a>。</li>
</ul>
</div>
<h2 id="Define-a-nullable-field-in-the-collection-schema" class="common-anchor-header">在集合模式中定義可空字段<button data-href="#Define-a-nullable-field-in-the-collection-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>要使用可空欄位，必須在定義集合模式時啟用可空屬性。</p>
<p>在這個範例中，集合模式定義了一個向量欄位，名稱為<code translate="no">embedding</code> ，其<code translate="no">nullable=True</code> 。這允許集合中的實體在資料擷取過程中省略向量值或明確地將其設定為 NULL。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Define schema fields</span>
schema = client.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)  <span class="hljs-comment"># Primary field</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
<span class="highlighted-wrapper-line">    nullable=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable the nullable attribute; defaults to False</span></span>
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">4</span>)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(Collections.emptyList())
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">fields</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
      <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span>,
      <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
    },
  ],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;embedding&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">4</span>).
    WithNullable(<span class="hljs-literal">true</span>),
)

err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;id&quot;,
  &quot;dataType&quot;: &quot;Int64&quot;,
  &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> embeddingField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;embedding&quot;,
  &quot;dataType&quot;: &quot;FloatVector&quot;,
  &quot;typeParams&quot;: {&quot;dim&quot;: &quot;4&quot;},
  &quot;nullable&quot;: true
}&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: {
      \&quot;fields\&quot;: [
        <span class="hljs-variable">$pkField</span>,
        <span class="hljs-variable">$embeddingField</span>
      ]
    }
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在此模式中：</p>
<ul>
<li><code translate="no">embedding</code> 欄位明確地標記為 nullable。</li>
<li>實體可省略<code translate="no">embedding</code> 欄位，或在插入時為其指定 NULL 值。</li>
<li>允許 NULL 值的決定是在集合建立時固定的。</li>
</ul>
<p>為了清楚起見，以下的範例著重於可宣告無效的向量欄位 (<code translate="no">embedding</code>)。定義 nullable 標量欄位是可選的，不需要遵循本指南的其他部分。</p>
<p><details>
<summary>可選：定義空標量欄位</summary></p>
<p>標量欄位也可以使用相同的<code translate="no">nullable</code> 屬性定義為 nullable，並且在擷取過程中遵循相同的規則。例如</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;age&quot;</span>,
    datatype=DataType.INT64,
<span class="highlighted-wrapper-line">    nullable=<span class="hljs-literal">True</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;age&quot;</span>)
        .dataType(DataType.Int64)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Add to the fields array when calling createCollection:</span>
<span class="hljs-comment">// { name: &quot;age&quot;, data_type: DataType.Int64, nullable: true },</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;age&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithNullable(<span class="hljs-literal">true</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Add another field object to the schema &quot;fields&quot; array, for example:</span>
<span class="hljs-comment"># { &quot;fieldName&quot;: &quot;age&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;nullable&quot;: true }</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h2 id="Insert-behavior-with-missing-or-NULL-values" class="common-anchor-header">遺失或 NULL 值的插入行為<button data-href="#Insert-behavior-with-missing-or-NULL-values" class="anchor-icon" translate="no">
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
    </button></h2><p>一旦在集合模式中將欄位定義為 nullable，Milvus 就允許在資料擷取過程中，將欄位值遺失或明確設定為 NULL。</p>
<p>以下範例將三個實體插入在<a href="#define-a-nullable-field-in-the-collection-schema">集合模式中定義可為空欄位</a>所建立的集合，展示這些不同的情況。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: <span class="hljs-literal">None</span>,  <span class="hljs-comment"># Explicitly set to NULL</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,  <span class="hljs-comment"># Field omitted → stored as NULL</span>
    },
]

client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 1, \&quot;embedding\&quot;: [0.1, 0.2, 0.3, 0.4]}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 2, \&quot;embedding\&quot;: null}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 3}&quot;</span>, JsonObject.class));

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
  { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>] },
  { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">embedding</span>: <span class="hljs-literal">null</span> },
  { <span class="hljs-attr">id</span>: <span class="hljs-number">3</span> },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: data,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

<span class="hljs-comment">// Assumes `client` is the Milvus client from the Go schema example above.</span>
ctx := context.Background()

rows := []any{
    <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-type">int64</span>(<span class="hljs-number">1</span>), <span class="hljs-string">&quot;embedding&quot;</span>: []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}},
    <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-type">int64</span>(<span class="hljs-number">2</span>), <span class="hljs-string">&quot;embedding&quot;</span>: <span class="hljs-literal">nil</span>},
    <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-type">int64</span>(<span class="hljs-number">3</span>)},
}

_, err := client.Insert(ctx, milvusclient.NewRowBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>, rows...))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
      {&quot;id&quot;: 1, &quot;embedding&quot;: [0.1, 0.2, 0.3, 0.4]},
      {&quot;id&quot;: 2, &quot;embedding&quot;: null},
      {&quot;id&quot;: 3}
    ]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在這個範例中</p>
<ul>
<li>實體<strong>id = 1</strong>提供一個有效的向量值。</li>
<li>Entity<strong>id = 2</strong>明確地指定一個 NULL 值給<code translate="no">embedding</code> 欄位。</li>
<li>Entity<strong>id = 3</strong>完全省略了<code translate="no">embedding</code> 欄位；Milvus 將其儲存為 NULL。</li>
</ul>
<h2 id="Index-behavior-on-nullable-fields" class="common-anchor-header">可為空欄位的索引行為<button data-href="#Index-behavior-on-nullable-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>插入資料後，你可以像往常一樣在可空欄位建立索引。關鍵的差別在於 Milvus 在索引建立時如何處理 NULL 值：</p>
<ul>
<li>只有具有非空值的實體才會被加入索引。</li>
<li>具有 NULL 值的實體會被跳過，並且不參與索引建立。</li>
</ul>
<p>對於可歸零的向量欄位，這表示只有具有有效向量的實體才可透過向量相似性進行搜尋。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set index parameters</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

<span class="hljs-comment"># Create index</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_params=index_params,
)

<span class="hljs-comment"># Load collection for future search operations</span>
client.load_collection(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexName(<span class="hljs-string">&quot;embedding_idx&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexParams(indexes)
        .build());

<span class="hljs-type">LoadCollectionReq</span> <span class="hljs-variable">loadReq</span> <span class="hljs-operator">=</span> LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build();
client.loadCollection(loadReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;embedding_idx&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

<span class="hljs-comment">// Assumes `client` is the Milvus client from the Go schema example above.</span>
ctx := context.Background()

indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>,
    index.NewAutoIndex(entity.COSINE))

_, err := client.CreateIndex(ctx, indexOption)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}

_, err = client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
      {
        &quot;fieldName&quot;: &quot;embedding&quot;,
        &quot;metricType&quot;: &quot;COSINE&quot;,
        &quot;indexType&quot;: &quot;AUTOINDEX&quot;
      }
    ]
  }&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -d <span class="hljs-string">&#x27;{&quot;collectionName&quot;: &quot;my_collection&quot;}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>此時</p>
<ul>
<li>具有有效 embedding 值的實體已建立索引並可供搜尋。</li>
<li>嵌入值為 NULL 的實體仍保留在集合中，但它們不會包含在向量索引中。</li>
</ul>
<h2 id="Search-behavior-with-nullable-fields" class="common-anchor-header">可為空欄位的搜尋行為<button data-href="#Search-behavior-with-nullable-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>當您在可空欄位執行搜尋作業時，Milvus 只會評估在搜尋中使用的欄位具有非空值的實體。向量欄位為 NULL 的實體會自動跳過。</p>
<p>對於可為空的向量欄位，例如本範例中的<code translate="no">embedding</code> ：</p>
<ul>
<li>只有具有有效向量值的實體才會被評估和排序。</li>
<li>具有 NULL 向量的實體不會造成錯誤。</li>
<li>如果有效向量的數量小於要求的<code translate="no">topK</code> (<code translate="no">limit</code>)，Milvus 返回的結果可能少於<code translate="no">limit</code> 。</li>
</ul>
<p>以下範例在可為空的向量欄位上執行向量搜尋<code translate="no">embedding</code> ：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>},
    output_fields=[<span class="hljs-string">&quot;embedding&quot;</span>],
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;COSINE&quot;</span>);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embedding&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>})))
        .topK(<span class="hljs-number">3</span>)
        .searchParams(searchParams)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;embedding&quot;</span>))
        .build());

System.out.println(resp.getSearchResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">search_params</span>: { <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span> },
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;embedding&quot;</span>],
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

<span class="hljs-comment">// Assumes `client` is the Milvus client from the Go schema example above.</span>
ctx := context.Background()

query := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-number">3</span>,
    []entity.Vector{entity.FloatVector(query)},
).WithANNSField(<span class="hljs-string">&quot;embedding&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;embedding&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}
fmt.Println(resultSets)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]],
    &quot;annsField&quot;: &quot;embedding&quot;,
    &quot;limit&quot;: 3,
    &quot;searchParams&quot;: {&quot;metricType&quot;: &quot;COSINE&quot;},
    &quot;outputFields&quot;: [&quot;embedding&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在這個搜尋中</p>
<ul>
<li>只有具有非空<code translate="no">embedding</code> 值的實體才會被視為候選。</li>
<li><code translate="no">embedding</code> 具有 NULL 值的實體將被排除在評估之外。</li>
<li>返回結果的數量取決於集合中存在多少個有效向量。</li>
</ul>
<h2 id="Query-and-filtering-implications" class="common-anchor-header">查詢和篩選的影響<button data-href="#Query-and-filtering-implications" class="anchor-icon" translate="no">
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
    </button></h2><p>前面的範例著重於向量欄位。本節說明 NULL 值在<strong>標量篩選表達式</strong>中的表現。</p>
<p>標量欄位可以使用<code translate="no">nullable=True</code> 定義，並遵循與向量欄位相同的擷取規則。不過，<strong>NULL 標量值在篩選表達式中總是求值為 false</strong>。</p>
<p>例如，給定一個可為空的標量欄位<code translate="no">age</code> ，以下篩選器會選擇年齡大於 18 歲的實體：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; 18&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;age &gt; 18&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;age &gt; 18&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;age &gt; 18&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use in query/search filter parameter, for example:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;age &gt; 18&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">age</code> 為 NULL 的實體會被排除在結果之外，因為 NULL 值不符合篩選條件。</p>
<p>同樣地，相等檢查也不匹配 NULL 值。舉例來說：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`status == &quot;active&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># &quot;filter&quot;: &quot;status == \&quot;active\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">status</code> 為 NULL 的實體會從結果中剔除。</p>
<h2 id="Nullable-fields-and-default-values" class="common-anchor-header">可歸空欄位及預設值<button data-href="#Nullable-fields-and-default-values" class="anchor-icon" translate="no">
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
    </button></h2><p>當<code translate="no">nullable</code> 和<code translate="no">default_value</code> 都設定為欄位時，以下規則決定 Milvus 在插入時如何處理 NULL 輸入或遺漏的欄位值。</p>
<table>
<thead>
<tr><th>Nullable 已啟用</th><th>預設值</th><th>使用者輸入 (NULL 或省略)</th><th>結果</th></tr>
</thead>
<tbody>
<tr><td>是</td><td>是 (非 NULL)</td><td>NULL 或省略</td><td>使用預設值</td></tr>
<tr><td>是</td><td>無</td><td>NULL 或省略</td><td>儲存為 NULL</td></tr>
<tr><td>無</td><td>是（非 NULL）</td><td>NULL 或省略</td><td>使用預設值</td></tr>
<tr><td>無</td><td>無</td><td>NULL 或省略</td><td>產生錯誤</td></tr>
<tr><td>無</td><td>是 (NULL 預設)</td><td>NULL 或省略</td><td>產生錯誤</td></tr>
</tbody>
</table>
<p><strong>主要啟示：</strong></p>
<ul>
<li>當欄位有非 NULL 預設值時，不論是否啟用<code translate="no">nullable</code> ，都會使用該值。</li>
<li>當<code translate="no">nullable=True</code> 但未設定預設值時，欄位會儲存 NULL。</li>
<li>當<code translate="no">nullable=False</code> 但未設定預設值時，插入會出錯失敗。</li>
<li>在非空欄位上設定 NULL 預設值是無效的，並會導致錯誤。</li>
</ul>
<p>有關預設值的完整範例和 API 使用，請參閱<a href="/docs/zh-hant/default-values.md">預設值</a>。</p>
