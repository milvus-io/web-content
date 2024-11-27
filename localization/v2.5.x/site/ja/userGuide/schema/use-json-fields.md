---
id: use-json-fields.md
title: JSONフィールドの使用
summary: >-
  JSON（JavaScript Object
  Notation）は、複雑なデータ構造を柔軟に保存・照会できる軽量なデータ交換フォーマットです。Milvusでは、JSONフィールドを使用してベクトルデータと共に構造化された追加情報を保存することができ、ベクトルの類似性と構造化されたフィルタリングを組み合わせた高度な検索やクエリを可能にします。
---
<h1 id="JSON-Field​" class="common-anchor-header">JSONフィールド<button data-href="#JSON-Field​" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://en.wikipedia.org/wiki/JSON">JSON（JavaScript</a>Object Notation）は軽量なデータ交換フォーマットで、複雑なデータ構造の保存やクエリを柔軟に行うことができます。Milvusでは、JSONフィールドを使用してベクトルデータと共に構造化された追加情報を保存することができ、ベクトルの類似性と構造化されたフィルタリングを組み合わせた高度な検索やクエリを可能にします。</p>
<p>JSONフィールドは、検索結果を最適化するためにメタデータを必要とするアプリケーションに最適です。たとえば、電子商取引では、商品ベクトルをカテゴリ、価格、ブランドなどの属性で拡張できます。推薦システムでは、ユーザーベクトルを嗜好や人口統計情報と組み合わせることができます。以下は、典型的なJSONフィールドの例です。</p>
<pre><code translate="no" class="language-json">{​
  <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,​
  <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,​
  <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>​
}​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-JSON-field​" class="common-anchor-header">JSONフィールドの追加<button data-href="#Add-JSON-field​" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusでJSONフィールドを使用するには、コレクションスキーマで関連するフィールドタイプを定義し、<code translate="no">datatype</code> 、サポートされているJSONタイプ、すなわち、<code translate="no">JSON</code> 。</p>
<p>以下は、JSONフィールドを含むコレクションスキーマを定義する方法です。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
​
schema = client.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    enable_dynamic_fields=<span class="hljs-literal">True</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON)​
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
        ​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)​
        .dataType(DataType.JSON)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)​
        .dataType(DataType.Int64)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">3</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
<span class="hljs-keyword">const</span> schema = [​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
    <span class="hljs-attr">dim</span>: <span class="hljs-number">3</span>,​
  },​
];​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> jsonField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;metadata&quot;,​
    &quot;dataType&quot;: &quot;JSON&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;pk&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;embedding&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 3​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$jsonField</span>,​
        <span class="hljs-variable">$pkField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>この例では、<code translate="no">metadata</code> というJSONフィールドを追加して、商品カテゴリー、価格、ブランド情報など、ベクトルデータに関連する追加メタデータを格納する。</p>
<div class="alert note">
<p>プライマリフィールドとベクトルフィールドは、コレクションを作成するときに必須です。プライマリフィールドは各エンティティを一意に識別し、ベクトルフィールドは類似検索に重要です。詳細は<a href="/docs/ja/primary-field.md">Primary Field &amp; AutoID</a>,<a href="/docs/ja/dense-vector.md">Dense Vector</a>,<a href="/docs/ja/binary-vector.md">Binary Vector</a>,<a href="/docs/ja/sparse_vector.md">Sparse Vector</a> を参照。</p>
</div>
<h2 id="Create-collection​" class="common-anchor-header">コレクションの作成<button data-href="#Create-collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションを作成するとき、検索性能を確保するために、ベクトルフィールドのインデックスを作成する必要があります。この例では、<code translate="no">AUTOINDEX</code> を使用してインデックスのセットアップを簡素化します。詳細は<a href="https://milvus.io/docs/glossary.md#Auto-Index">AUTOINDEX</a> を参照。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">​
index_params = client.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;​
<span class="hljs-keyword">import</span> java.util.*;​
​
List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
indexes.add(IndexParam.builder()​
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .indexType(IndexParam.IndexType.AUTOINDEX)​
        .metricType(IndexParam.MetricType.COSINE)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = {​
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;embedding_index&#x27;</span>,​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;embedding&#x27;</span>,​
    <span class="hljs-attr">metricType</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">CONSINE</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,​
);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;embedding&quot;,​
            &quot;metricType&quot;: &quot;COSINE&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>定義されたスキーマとインデックスパラメーターを使用して、コレクションを作成する。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexes)​
        .build();​
client.createCollection(requestCreate);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">create_collection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_json_collection&quot;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">index_params</span>: indexParams​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_json_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data​" class="common-anchor-header">データの挿入<button data-href="#Insert-data​" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションを作成した後、JSONフィールドを含むデータを挿入できます。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Data to be inserted​</span>
data = [​
  {​
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},​
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,​
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]​
  },​
  {​
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;home_appliances&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">249.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandB&quot;</span>},​
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,​
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]​
  },​
  {​
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;furniture&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">399.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandC&quot;</span>},​
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,​
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]​
  }​
]​
​
<span class="hljs-comment"># Insert data into the collection​</span>
client.insert(​
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,​
    data=data​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;metadata\&quot;: {\&quot;category\&quot;: \&quot;electronics\&quot;, \&quot;price\&quot;: 99.99, \&quot;brand\&quot;: \&quot;BrandA\&quot;}, \&quot;pk\&quot;: 1, \&quot;embedding\&quot;: [0.1, 0.2, 0.3]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;metadata\&quot;: {\&quot;category\&quot;: \&quot;home_appliances\&quot;, \&quot;price\&quot;: 249.99, \&quot;brand\&quot;: \&quot;BrandB\&quot;}, \&quot;pk\&quot;: 2, \&quot;embedding\&quot;: [0.4, 0.5, 0.6]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;metadata\&quot;: {\&quot;category\&quot;: \&quot;furniture\&quot;, \&quot;price\&quot;: 399.99, \&quot;brand\&quot;: \&quot;BrandC\&quot;}, \&quot;pk\&quot;: 3, \&quot;embedding\&quot;: [0.7, 0.8, 0.9]}&quot;</span>, JsonObject.class));​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
  {​
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},​
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,​
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]​
  },​
  {​
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;home_appliances&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">249.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandB&quot;</span>},​
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,​
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]​
  },​
  {​
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;furniture&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">399.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandC&quot;</span>},​
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,​
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]​
  }​
]​
​
client.<span class="hljs-title function_">insert</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_json_collection&quot;</span>,​
    <span class="hljs-attr">data</span>: data​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {​
            &quot;metadata&quot;: {&quot;category&quot;: &quot;electronics&quot;, &quot;price&quot;: 99.99, &quot;brand&quot;: &quot;BrandA&quot;},​
            &quot;pk&quot;: 1,​
            &quot;embedding&quot;: [0.12, 0.34, 0.56]​
        },​
        {​
            &quot;metadata&quot;: {&quot;category&quot;: &quot;home_appliances&quot;, &quot;price&quot;: 249.99, &quot;brand&quot;: &quot;BrandB&quot;},​
            &quot;pk&quot;: 2,​
            &quot;embedding&quot;: [0.56, 0.78, 0.90]​
        },​
        {​
            &quot;metadata&quot;: {&quot;category&quot;: &quot;furniture&quot;, &quot;price&quot;: 399.99, &quot;brand&quot;: &quot;BrandC&quot;},​
            &quot;pk&quot;: 3,​
            &quot;embedding&quot;: [0.91, 0.18, 0.23]​
        }       ​
    ],​
    &quot;collectionName&quot;: &quot;my_json_collection&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>この例では</p>
<ul>
<li><p>各データエントリには、プライマリフィールド (<code translate="no">pk</code>) が含まれます。<code translate="no">metadata</code> は、商品カテゴリー、価格、ブランドなどの情報を格納する JSON フィールドです。</p></li>
<li><p><code translate="no">embedding</code> はベクトル類似性検索に使用される3次元ベクトルフィールドです。</p></li>
</ul>
<h2 id="Search-and-query​" class="common-anchor-header">検索とクエリ<button data-href="#Search-and-query​" class="anchor-icon" translate="no">
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
    </button></h2><p>JSONフィールドは検索時にスカラーフィルタリングを可能にし、milvusのベクトル検索機能を強化します。ベクトル類似度と並んでJSONプロパティに基づいてクエリを実行できます。</p>
<h3 id="Filter-queries​" class="common-anchor-header">フィルタクエリ</h3><p>特定の値にマッチするか、数値が特定の範囲内にあるかどうかをチェックするなど、JSONプロパティに基づいてデータをフィルタリングできます。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot; and metadata[&quot;price&quot;] &lt; 150&#x27;</span>​
​
res = client.query(​
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;] ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;​
​
String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;metadata[\&quot;category\&quot;] == \&quot;electronics\&quot; and metadata[\&quot;price\&quot;] &lt; 150&quot;</span>;​
QueryResp resp = client.query(QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)​
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)​
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;metadata&quot;</span>))​
        .build());​
​
System.out.println(resp.getQueryResults());​
​
// Output​
//​
// [QueryResp.QueryResult(entity={metadata={<span class="hljs-string">&quot;category&quot;</span>:<span class="hljs-string">&quot;electronics&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">99.99</span>,<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;BrandA&quot;</span>}, pk=<span class="hljs-number">1</span>})]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.query({​
    collection_name: <span class="hljs-string">&#x27;my_scalar_collection&#x27;</span>,​
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot; and metadata[&quot;price&quot;] &lt; 150&#x27;</span>,​
    output_fields: [<span class="hljs-string">&#x27;metadata&#x27;</span>]​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_json_collection&quot;,​
    &quot;filter&quot;: &quot;metadata[\&quot;category\&quot;] == \&quot;electronics\&quot; and metadata[\&quot;price\&quot;] &lt; 150&quot;,​
    &quot;outputFields&quot;: [&quot;metadata&quot;]​
}&#x27;</span>​
{<span class="hljs-string">&quot;code&quot;</span>:0,<span class="hljs-string">&quot;cost&quot;</span>:0,<span class="hljs-string">&quot;data&quot;</span>:[{<span class="hljs-string">&quot;metadata&quot;</span>:<span class="hljs-string">&quot;{\&quot;category\&quot;: \&quot;electronics\&quot;, \&quot;price\&quot;: 99.99, \&quot;brand\&quot;: \&quot;BrandA\&quot;}&quot;</span>,<span class="hljs-string">&quot;pk&quot;</span>:1}]}​

<button class="copy-code-btn"></button></code></pre>
<p>上記のクエリでは、Milvusは、<code translate="no">metadata</code> フィールドのカテゴリが<code translate="no">&quot;electronics&quot;</code> で、価格が150以下のエンティティをフィルタリングし、これらの条件に一致するエンティティを返します。</p>
<h3 id="Vector-search-with-JSON-filtering​" class="common-anchor-header">JSONフィルタリングによるベクトル検索</h3><p>ベクトル類似性とJSONフィルタリングを組み合わせることで、検索されたデータが意味的に一致するだけでなく、特定のビジネス条件を満たすようにすることができます。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;brand&quot;] == &quot;BrandA&quot;&#x27;</span>​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,​
    data=[[<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>]],​
    limit=<span class="hljs-number">5</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>],​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: -0.2479381263256073, &#x27;entity&#x27;: {&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}}}]&quot;] ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;​
​
String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;metadata[\&quot;brand\&quot;] == \&quot;BrandA\&quot;&quot;</span>;​
SearchResp resp = client.search(SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)​
        .annsField(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .data(Collections.singletonList(new FloatVec(new <span class="hljs-built_in">float</span>[]{<span class="hljs-number">0.3</span>f, -<span class="hljs-number">0.6</span>f, <span class="hljs-number">0.1</span>f})))​
        .topK(<span class="hljs-number">5</span>)​
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;metadata&quot;</span>))​
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)​
        .build());​
​
System.out.println(resp.getSearchResults());​
​
// Output​
//​
// [[SearchResp.SearchResult(entity={metadata={<span class="hljs-string">&quot;category&quot;</span>:<span class="hljs-string">&quot;electronics&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">99.99</span>,<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;BrandA&quot;</span>}}, score=-<span class="hljs-number">0.2364331</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">1</span>)]]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.search({​
    collection_name: <span class="hljs-string">&#x27;my_json_collection&#x27;</span>,​
    data: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>],​
    limit: <span class="hljs-number">5</span>,​
    output_fields: [<span class="hljs-string">&#x27;metadata&#x27;</span>],​
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot; and metadata[&quot;price&quot;] &lt; 150&#x27;</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_json_collection&quot;,​
    &quot;data&quot;: [​
        [0.3, -0.6, 0.1]​
    ],​
    &quot;annsField&quot;: &quot;embedding&quot;,​
    &quot;limit&quot;: 5,​
    &quot;searchParams&quot;:{​
        &quot;params&quot;:{&quot;nprobe&quot;:10}​
    },​
    &quot;outputFields&quot;: [&quot;metadata&quot;],​
    &quot;filter&quot;: &quot;metadata[\&quot;brand\&quot;] == \&quot;BrandA\&quot;&quot;​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;distance&quot;:-0.24793813,&quot;id&quot;:1,&quot;metadata&quot;:&quot;{\&quot;category\&quot;: \&quot;electronics\&quot;, \&quot;price\&quot;: 99.99, \&quot;brand\&quot;: \&quot;BrandA\&quot;}&quot;}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>この例では、Milvusはクエリベクトルに最も類似した上位5つのエンティティを返し、<code translate="no">metadata</code> フィールドには<code translate="no">&quot;BrandA&quot;</code> のブランドが含まれています。</p>
<p>さらに、Milvusは、<code translate="no">JSON_CONTAINS</code> 、<code translate="no">JSON_CONTAINS_ALL</code> 、<code translate="no">JSON_CONTAINS_ANY</code> などの高度なJSONフィルタリング演算子をサポートしており、クエリ機能をさらに強化することができます。詳細については、「<a href="/docs/ja/boolean.md">メタデータのフィルタリング</a>」を参照してください。</p>
<h2 id="Limits​" class="common-anchor-header">制限事項<button data-href="#Limits​" class="anchor-icon" translate="no">
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
<li><p><strong>インデックスの制限</strong>：データ構造が複雑なため、JSONフィールドのインデックス作成はサポートされていません。</p></li>
<li><p><strong>データ型のマッチング</strong>：JSONフィールドのキー値が整数または浮動小数点の場合、他の整数または浮動小数点のキー、または<code translate="no">INT32/64</code> 、<code translate="no">FLOAT32/64</code> フィールドとしか比較できません。キー値が文字列 (<code translate="no">VARCHAR</code>) の場合、別の文字列キーとしか比較できない。</p></li>
<li><p><strong>名前付けの制限</strong>：JSONキーに名前を付ける場合、アルファベット、数字、アンダースコアのみを使用することを推奨します。</p></li>
<li><p><strong>文字列値の取り扱い</strong>：文字列値(<code translate="no">VARCHAR</code>)の場合、MilvusはJSONフィールドの文字列をセマンティック変換せずにそのまま保存します。例えば<code translate="no">'a&quot;b'</code> <code translate="no">&quot;a'b&quot;</code>,<code translate="no">'a\\'b'</code>,<code translate="no">&quot;a\\&quot;b&quot;</code> は入力されたまま保存されますが、<code translate="no">'a'b'</code> と<code translate="no">&quot;a&quot;b&quot;</code> は無効とみなされます。</p></li>
<li><p><strong>入れ子辞書の処理</strong>：JSONフィールド値内のネストされた辞書は、文字列として扱われます。</p></li>
</ul>
