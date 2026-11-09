---
id: use-json-fields.md
title: JSON 필드
summary: >-
  Milvus를 사용하면 JSON 데이터형을 통해 단일 필드 내에 구조화된 데이터를 저장하고 인덱싱할 수 있습니다. 이를 통해 중첩된 속성을
  가진 유연한 스키마를 구성할 수 있을 뿐만 아니라, JSON 인덱싱을 통해 효율적인 필터링도 가능합니다.
---
<h1 id="JSON-Field" class="common-anchor-header">JSON 필드<button data-href="#JSON-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus에서는 ` <code translate="no">JSON</code> ` 데이터형을 사용하여 단일 필드 내에 구조화된 데이터를 저장하고 색인을 생성할 수 있습니다. 이를 통해 중첩된 속성을 가진 유연한 스키마를 구성할 수 있으며, 동시에 JSON 색인화를 통해 효율적인 필터링이 가능합니다.</p>
<h2 id="What-is-a-JSON-field" class="common-anchor-header">JSON 필드란 무엇인가요?<button data-href="#What-is-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON 필드는 Milvus에서 구조화된 키-값 데이터를 저장하는 스키마 정의 필드입니다. 값에는 문자열, 숫자, 부울, 배열 또는 깊게 중첩된 객체가 포함될 수 있습니다.</p>
<p>다음은 문서 내에서 JSON 필드가 어떻게 표시될 수 있는지에 대한 예시입니다:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 예시에서:</p>
<ul>
<li><p><code translate="no">metadata</code> 는 스키마에 정의된 JSON 필드입니다.</p></li>
<li><p>플랫 값(예: <code translate="no">category</code>, <code translate="no">in_stock</code>), 배열(<code translate="no">tags</code>), 중첩된 객체(<code translate="no">supplier</code>)를 저장할 수 있습니다.</p></li>
</ul>
<h2 id="Define-a-JSON-field-in-the-schema" class="common-anchor-header">스키마에서 JSON 필드 정의하기<button data-href="#Define-a-JSON-field-in-the-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON 필드를 사용하려면 컬렉션 스키마에서 <code translate="no">DataType</code> 을 <code translate="no">JSON</code> 으로 명시적으로 정의해야 합니다.</p>
<p>아래 예제는 다음 필드를 포함하는 스키마를 가진 컬렉션을 생성합니다:</p>
<ul>
<li><p>기본 키(<code translate="no">product_id</code>)</p></li>
<li><p><code translate="no">vector</code> 필드(각 컬렉션에 필수)</p></li>
<li><p><code translate="no">JSON</code> 유형의 <code translate="no">metadata</code> 필드(플랫 값, 배열 또는 중첩된 객체와 같은 구조화된 데이터를 저장할 수 있음)</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create schema with a JSON field</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>)

schema.add_field(field_name=<span class="hljs-string">&quot;product_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
<span class="highlighted-wrapper-line">schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON, nullable=<span class="hljs-literal">True</span>)  <span class="hljs-comment"># JSON field that allows null values</span></span>

client.create_collection(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">true</span>)
        .build();
        
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;product_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .dataType(DataType.JSON)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
        
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>
});

<span class="hljs-comment">// Create collection</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
<span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
<span class="hljs-attr">fields</span>: [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;product_id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,
    <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>  <span class="hljs-comment">// JSON field that allows null values</span>
  }
],
<span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">true</span>
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">true</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;product_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;metadata&quot;</span>).
    WithDataType(entity.FieldTypeJSON).
    WithNullable(<span class="hljs-literal">true</span>),
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment"># 字段定义</span>
<span class="hljs-built_in">export</span> productIdField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;product_id&quot;,
  &quot;dataType&quot;: &quot;Int64&quot;,
  &quot;isPrimary&quot;: true,
  &quot;autoID&quot;: false
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;vector&quot;,
  &quot;dataType&quot;: &quot;FloatVector&quot;,
  &quot;elementTypeParams&quot;: {
    &quot;dim&quot;: 5
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> metadataField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;dataType&quot;: &quot;JSON&quot;,
  &quot;isNullable&quot;: true
}&#x27;</span>

<span class="hljs-comment"># 构造 schema</span>
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
  \&quot;autoID\&quot;: false,
  \&quot;enableDynamicField\&quot;: true,
  \&quot;fields\&quot;: [
    <span class="hljs-variable">$productIdField</span>,
    <span class="hljs-variable">$vectorField</span>,
    <span class="hljs-variable">$metadataField</span>
  ]
}&quot;</span>

<span class="hljs-comment"># 创建集合</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;product_catalog\&quot;,
  \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>동적 필드 기능을 활성화하여 선언되지 않은 필드를 유연하게 저장할 수도 있지만, JSON 필드가 작동하는 데 필수적인 기능은 아닙니다. 자세한 내용은 <a href="/docs/ko/enable-dynamic-field.md">동적 필드를</a> 참조하십시오.</p>
</div>
<h2 id="Insert-entities-with-JSON-data" class="common-anchor-header">JSON 데이터가 포함된 엔티티 삽입<button data-href="#Insert-entities-with-JSON-data" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션이 생성되면, ` <code translate="no">metadata</code> ` JSON 필드에 구조화된 JSON 객체를 포함하는 엔티티를 삽입합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">entities = [
    {
        <span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }
]

client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-number">1</span>);
row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>)));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">metadata</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
metadata.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;electronics&quot;</span>);
metadata.addProperty(<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;BrandA&quot;</span>);
metadata.addProperty(<span class="hljs-string">&quot;in_stock&quot;</span>, <span class="hljs-literal">true</span>);
metadata.addProperty(<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-number">99.99</span>);
metadata.addProperty(<span class="hljs-string">&quot;string_price&quot;</span>, <span class="hljs-string">&quot;99.99&quot;</span>);
metadata.add(<span class="hljs-string">&quot;tags&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>)));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">supplier</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
supplier.addProperty(<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;SupplierX&quot;</span>);
supplier.addProperty(<span class="hljs-string">&quot;country&quot;</span>, <span class="hljs-string">&quot;USA&quot;</span>);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">contact</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
contact.addProperty(<span class="hljs-string">&quot;email&quot;</span>, <span class="hljs-string">&quot;support@supplierx.com&quot;</span>);
contact.addProperty(<span class="hljs-string">&quot;phone&quot;</span>, <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>);

supplier.add(<span class="hljs-string">&quot;contact&quot;</span>, contact);
metadata.add(<span class="hljs-string">&quot;supplier&quot;</span>, supplier);
row.add(<span class="hljs-string">&quot;metadata&quot;</span>, metadata);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .data(Collections.singletonList(row))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> entities = [
    {
        <span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }
]

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>, 
    <span class="hljs-attr">data</span>: entities
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;product_catalog&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;product_id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>},
    }).WithColumns(
    column.NewColumnJSONBytes(<span class="hljs-string">&quot;metadata&quot;</span>, [][]<span class="hljs-type">byte</span>{
        []<span class="hljs-type">byte</span>(<span class="hljs-string">`{
            &quot;category&quot;: &quot;electronics&quot;,
            &quot;brand&quot;: &quot;BrandA&quot;,
            &quot;in_stock&quot;: true,
            &quot;price&quot;: 99.99,
            &quot;string_price&quot;: &quot;99.99&quot;,
            &quot;tags&quot;: [&quot;clearance&quot;, &quot;summer_sale&quot;],
            &quot;supplier&quot;: {
                &quot;name&quot;: &quot;SupplierX&quot;,
                &quot;country&quot;: &quot;USA&quot;,
                &quot;contact&quot;: {
                    &quot;email&quot;: &quot;support@supplierx.com&quot;,
                    &quot;phone&quot;: &quot;+1-800-555-0199&quot;
                }
            }
        }`</span>),
    }),
))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> entities=<span class="hljs-string">&#x27;[
  {
    &quot;product_id&quot;: 1,
    &quot;vector&quot;: [0.1, 0.2, 0.3, 0.4, 0.5],
    &quot;metadata&quot;: {
      &quot;category&quot;: &quot;electronics&quot;,
      &quot;brand&quot;: &quot;BrandA&quot;,
      &quot;in_stock&quot;: true,
      &quot;price&quot;: 99.99,
      &quot;string_price&quot;: &quot;99.99&quot;,
      &quot;tags&quot;: [&quot;clearance&quot;, &quot;summer_sale&quot;],
      &quot;supplier&quot;: {
        &quot;name&quot;: &quot;SupplierX&quot;,
        &quot;country&quot;: &quot;USA&quot;,
        &quot;contact&quot;: {
          &quot;email&quot;: &quot;support@supplierx.com&quot;,
          &quot;phone&quot;: &quot;+1-800-555-0199&quot;
        }
      }
    }
  }
]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/product_catalog/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;data\&quot;: <span class="hljs-variable">$entities</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-values-inside-the-JSON-field" class="common-anchor-header">JSON 필드 내 값 인덱싱<button data-href="#Index-values-inside-the-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON 필드에 대한 스칼라 필터링 속도를 높이기 위해 Milvus는 <strong>JSON 경로 인덱싱을</strong> 지원하며, 이를 통해 선언된 스칼라 유형으로 특정 JSON 경로를 인덱싱할 수 있습니다.</p>
<div class="alert note">
<p>JSON 필드의 인덱싱은 <strong>선택</strong> 사항입니다. 인덱스가 없어도 JSON 경로를 기준으로 쿼리하거나 필터링할 수 있지만, 무차별 대입 검색으로 인해 성능이 저하될 수 있습니다.</p>
</div>
<h3 id="JSON-path-indexing" class="common-anchor-header">JSON 경로 인덱싱<button data-href="#JSON-path-indexing" class="anchor-icon" translate="no">
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
    </button></h3><p>JSON 경로 인덱스를 생성하려면 다음을 지정하십시오.</p>
<ul>
<li><p><strong>JSON 경로</strong> (<code translate="no">json_path</code>): 인덱싱하려는 JSON 객체 내의 키 또는 중첩된 필드로 이동하는 경로입니다.</p>
<ul>
<li><p>예:</p>
<ul>
<li><p>키의 경우, <code translate="no">metadata[&quot;category&quot;]</code></p></li>
<li><p>중첩된 필드의 경우, <code translate="no">metadata[&quot;contact&quot;][&quot;email&quot;]</code></p></li>
</ul>
<p>이는 인덱싱 엔진이 JSON 구조 내에서 어디를 확인해야 하는지를 정의합니다.</p></li>
</ul></li>
<li><p><strong>JSON 캐스트 유형</strong> (<code translate="no">json_cast_type</code>): Milvus가 지정된 경로의 값을 해석하고 색인화할 때 사용해야 하는 데이터 유형입니다.</p>
<ul>
<li><p>이 유형은 인덱싱되는 필드의 실제 데이터 유형과 일치해야 합니다. 인덱싱 중에 데이터 유형을 다른 유형으로 변환하려면 <a href="/docs/ko/use-json-fields.md#Use-JSON-cast-functions-for-type-conversion--Milvus-2514">캐스트 함수 사용을</a> 고려하십시오.</p></li>
<li><p>전체 목록은 <a href="/docs/ko/use-json-fields.md#Supported-JSON-cast-types">아래를</a> 참조하십시오.</p></li>
</ul></li>
</ul>
<h4 id="Supported-JSON-cast-types" class="common-anchor-header">지원되는 JSON 형 변환 유형</h4><p>캐스트 유형은 대소문자를 구분하지 않습니다. 다음 유형이 지원됩니다:</p>
<table>
   <tr>
     <th><p>변환 유형</p></th>
     <th><p>설명</p></th>
     <th><p>JSON 값 예시</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">bool</code></p></td>
     <td><p>부울 값</p></td>
     <td><p><code translate="no">true</code>, <code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">double</code></p></td>
     <td><p>숫자 값 (정수 또는 실수)</p></td>
     <td><p><code translate="no">42</code>, <code translate="no">99.99</code>, <code translate="no">-15.5</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">varchar</code></p></td>
     <td><p>문자열 값</p></td>
     <td><p><code translate="no">"electronics"</code>, <code translate="no">"BrandA"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">array_bool</code></p></td>
     <td><p>부울 값의 배열</p></td>
     <td><p><code translate="no">[true, false, true]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">array_double</code></p></td>
     <td><p>숫자 배열</p></td>
     <td><p><code translate="no">[1.2, 3.14, 42]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">array_varchar</code></p></td>
     <td><p>문자열 배열</p></td>
     <td><p><code translate="no">["tag1", "tag2", "tag3"]</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>최적의 인덱싱을 위해 배열에는 동일한 유형의 요소만 포함되어야 합니다. 자세한 내용은 <a href="/docs/ko/array_data_type.md">'배열 필드</a>'를 참조하십시오.</p>
</div>
<h4 id="Example-Create-JSON-path-indexes" class="common-anchor-header">예: JSON 경로 인덱스 생성</h4><p>소개 부분에서 다룬 <code translate="no">metadata</code> JSON 구조를 사용하여, 다양한 JSON 경로에 인덱스를 생성하는 방법은 다음과 같습니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the category field as a string</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,  <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Index the tags array as string array</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;tags_array_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;tags\&quot;]&quot;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;array_varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String,Object&gt; extraParams1 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams1.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>);
extraParams1.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;category_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams1)
        .build());

Map&lt;String,Object&gt; extraParams2 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams2.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;tags\&quot;]&quot;</span>);
extraParams2.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;array_varchar&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;tags_array_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams2)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = [
  {
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;category_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment">// Can also use &quot;INVERTED&quot; for JSON path indexing</span>
    <span class="hljs-attr">extra_params</span>: {
      <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
      <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;varchar&quot;</span>,
    },
  },
  {
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;tags_array_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment">// Can also use &quot;INVERTED&quot; for JSON path indexing</span>
    <span class="hljs-attr">extra_params</span>: {
      <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;tags&quot;]&#x27;</span>,
      <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;array_varchar&quot;</span>,
    },
  },
];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
)

jsonIndex1 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;category&quot;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;category_index&quot;</span>)
jsonIndex2 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;array_varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;tags&quot;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;tags_array_index&quot;</span>)

indexOpt1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex2)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> categoryIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;category_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;category\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;varchar&quot;
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> tagsArrayIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;tags_array_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;tags\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;array_varchar&quot;
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Use-JSON-cast-functions-for-type-conversion" class="common-anchor-header">형식 변환을 위해 JSON 캐스트 함수 사용<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.14+</span></h4><p>JSON 필드 키에 잘못된 형식의 값(예: 문자열로 저장된 숫자)이 포함된 경우, 캐스트 함수를 사용하여 인덱싱 과정에서 값을 변환할 수 있습니다.</p>
<h5 id="Supported-cast-functions" class="common-anchor-header">지원되는 캐스트 함수</h5><p>캐스트 함수는 대소문자를 구분하지 않습니다. 다음 유형이 지원됩니다:</p>
<table>
   <tr>
     <th><p>변환 함수</p></th>
     <th><p>변환 대상 → 변환 결과</p></th>
     <th><p>사용 사례</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">"STRING_TO_DOUBLE"</code></p></td>
     <td><p>문자열 → 숫자(double)</p></td>
     <td><p><code translate="no">"99.99"</code> 를 다음으로 변환 <code translate="no">99.99</code></p></td>
   </tr>
</table>
<h5 id="Example-Cast-string-numbers-to-double" class="common-anchor-header">예시: 문자열 형태의 숫자를 double로 형변환하기</h5><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Convert string numbers to double for indexing</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;string_price\&quot;]&quot;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-comment"># Data cast type</span>
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span> <span class="hljs-comment"># Cast function; case insensitive</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String,Object&gt; extraParams3 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams3.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;string_price\&quot;]&quot;</span>);
extraParams3.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;double&quot;</span>);
extraParams3.put(<span class="hljs-string">&quot;json_cast_function&quot;</span>, <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;string_to_double_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams3)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;string_to_double_index&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment">// Can also use &quot;INVERTED&quot;</span>
  <span class="hljs-attr">extra_params</span>: {
    <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
    <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;double&quot;</span>,
    <span class="hljs-attr">json_cast_function</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>, <span class="hljs-comment">// Case insensitive</span>
  },
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">jsonIndex3 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`metadata[&quot;string_price&quot;]`</span>)
                    .WithIndexName(<span class="hljs-string">&quot;string_to_double_index&quot;</span>)

indexOpt3 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex3)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> stringToDoubleIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;string_to_double_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;string_price\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;double&quot;,
    &quot;json_cast_function&quot;: &quot;STRING_TO_DOUBLE&quot;
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p><code translate="no">json_cast_type</code> 매개변수는 필수이며, 캐스팅 함수의 출력 유형과 동일해야 합니다.</p></li>
<li><p>변환에 실패하는 경우(예: 숫자가 아닌 문자열), 해당 값은 건너뛰어지며 인덱싱되지 않습니다.</p></li>
</ul>
</div>
<h3 id="Apply-indexes-to-the-collection" class="common-anchor-header">컬렉션에 인덱스 적용<button data-href="#Apply-indexes-to-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>인덱스 매개변수를 정의한 후, ` <code translate="no">create_index()</code>`를 사용하여 컬렉션에 인덱스를 적용할 수 있습니다:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>(indexParams)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexTask1, err := client.CreateIndex(ctx, indexOpt1)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask2, err := client.CreateIndex(ctx, indexOpt2)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask3, err := client.CreateIndex(ctx, indexOpt3)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask4, err := client.CreateIndex(ctx, indexOpt4)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask5, err := client.CreateIndex(ctx, indexOpt5)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&quot;[
  <span class="hljs-variable">$categoryIndex</span>,
  <span class="hljs-variable">$tagsArrayIndex</span>,
  <span class="hljs-variable">$stringToDoubleIndex</span>
]&quot;</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;product_catalog\&quot;,
  \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Filter-by-JSON-field-values" class="common-anchor-header">JSON 필드 값으로 필터링<button data-href="#Filter-by-JSON-field-values" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON 필드를 삽입하고 인덱싱한 후에는 JSON 경로 구문을 사용하는 표준 필터 표현식을 통해 해당 필드를 기준으로 필터링할 수 있습니다.</p>
<p>예:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;price&quot;] &gt; 50&#x27;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;featured&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filterCategory</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;] == \&quot;electronics\&quot;&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">filterPrice</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;metadata[\&quot;price\&quot;] &gt; 50&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">filterTags</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains(metadata[\&quot;tags\&quot;], \&quot;featured\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filterCategory = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>;
<span class="hljs-keyword">const</span> filterPrice = <span class="hljs-string">&#x27;metadata[&quot;price&quot;] &gt; 50&#x27;</span>;
<span class="hljs-keyword">const</span> filterTags = <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;featured&quot;)&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filterCategory := <span class="hljs-string">`metadata[&quot;category&quot;] == &quot;electronics&quot;`</span>
filterPrice := <span class="hljs-string">`metadata[&quot;price&quot;] &gt; 50`</span>
filterTags := <span class="hljs-string">`json_contains(metadata[&quot;tags&quot;], &quot;featured&quot;)`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> filterCategory=<span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>
<span class="hljs-built_in">export</span> filterPrice=<span class="hljs-string">&#x27;metadata[&quot;price&quot;] &gt; 50&#x27;</span>
<span class="hljs-built_in">export</span> filterTags=<span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;featured&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>검색이나 쿼리에서 이러한 표현식을 사용하려면 다음 사항을 확인하십시오:</p>
<ul>
<li><p>각 벡터 필드에 대해 인덱스를 생성했어야 합니다.</p></li>
<li><p>컬렉션이 메모리에 로드되어 있어야 합니다.</p></li>
</ul>
<p>지원되는 연산자 및 표현식의 전체 목록은 <a href="/docs/ko/json-operators.md">JSON 연산자를</a> 참조하십시오.</p>
<h2 id="Pull-it-all-together" class="common-anchor-header">모든 내용을 종합해 봅시다<button data-href="#Pull-it-all-together" class="anchor-icon" translate="no">
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
    </button></h2><p>지금까지 JSON 필드 내에서 구조화된 값을 정의하고, 삽입하며, 필요에 따라 인덱스를 생성하는 방법을 배웠습니다.</p>
<p>실제 애플리케이션에서 워크플로를 완료하려면 다음 작업도 수행해야 합니다.</p>
<ul>
<li><p><strong>벡터 필드에 인덱스를 생성합니다</strong> (컬렉션 내 각 벡터 필드에 대해 필수).</p>
<p><a href="/docs/ko/create-collection.md#Optional-Set-Index-Parameters">'인덱스 매개변수 설정</a>'을 참조하십시오</p></li>
<li><p><strong>컬렉션 로드하기</strong></p>
<p><a href="/docs/ko/load-and-release.md">'로드 및 릴리스</a>' 참조</p></li>
<li><p><strong>JSON 경로 필터를 사용하여 검색하거나 쿼리하기</strong></p>
<p><a href="/docs/ko/filtered-search.md">'필터링된 검색</a> 및 <a href="/docs/ko/json-operators.md">JSON 연산자</a>' 참조</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">자주 묻는 질문<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="What-are-the-differences-between-a-JSON-field-and-the-dynamic-field" class="common-anchor-header">JSON 필드와 동적 필드의 차이점은 무엇입니까?<button data-href="#What-are-the-differences-between-a-JSON-field-and-the-dynamic-field" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>JSON 필드는</strong> 스키마로 정의됩니다. 스키마에서 해당 필드를 명시적으로 선언해야 합니다.</p></li>
<li><p><strong>동적 필드는</strong> 스키마에 정의되지 않은 모든 필드를 자동으로 저장하는 숨겨진 JSON 객체(<code translate="no">$meta</code>)입니다.</p></li>
</ul>
<p>둘 다 중첩 구조와 JSON 경로 인덱싱을 지원하지만, 동적 필드는 선택적 또는 진화하는 데이터 구조에 더 적합합니다.</p>
<p>자세한 내용은 <a href="/docs/ko/enable-dynamic-field.md">동적 필드를</a> 참조하십시오.</p>
<h3 id="Are-there-any-limitations-on-the-size-of-a-JSON-field" class="common-anchor-header">JSON 필드의 크기에 제한이 있습니까?<button data-href="#Are-there-any-limitations-on-the-size-of-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h3><p>예. 각 JSON 필드는 65,536바이트로 제한됩니다.</p>
<h3 id="Does-a-JSON-field-support-setting-a-default-value" class="common-anchor-header">JSON 필드에서 기본값 설정이 가능한가요?<button data-href="#Does-a-JSON-field-support-setting-a-default-value" class="anchor-icon" translate="no">
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
    </button></h3><p>아니요, JSON 필드는 기본값을 지원하지 않습니다. 그러나 필드를 정의할 때 ` <code translate="no">nullable=True</code> `를 설정하여 빈 항목을 허용할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/nullable-and-default.md">'Nullable 및 기본값</a> '을 참조하십시오.</p>
<h3 id="Are-there-any-naming-conventions-for-JSON-field-keys" class="common-anchor-header">JSON 필드 키에 대한 명명 규칙이 있나요?<button data-href="#Are-there-any-naming-conventions-for-JSON-field-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>예, 쿼리 및 인덱싱과의 호환성을 보장하기 위해:</p>
<ul>
<li><p>JSON 키에는 영문자, 숫자 및 밑줄(_)만 사용하십시오.</p></li>
<li><p>특수 문자, 공백 또는 점(<code translate="no">.</code>, <code translate="no">/</code> 등)의 사용은 피하십시오.</p></li>
<li><p>호환되지 않는 키를 사용하면 필터 표현식에서 구문 분석 문제가 발생할 수 있습니다.</p></li>
</ul>
<h3 id="How-does-Milvus-handle-string-values-in-JSON-fields" class="common-anchor-header">Milvus는 JSON 필드의 문자열 값을 어떻게 처리하나요?<button data-href="#How-does-Milvus-handle-string-values-in-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus는 의미적 변환 없이 JSON 입력에 표시된 그대로 문자열 값을 저장합니다. 따옴표가 올바르게 지정되지 않은 문자열은 파싱 중에 오류를 일으킬 수 있습니다.</p>
<p><strong>유효한 문자열의 예</strong>:</p>
<pre><code translate="no" class="language-plaintext">&quot;a\&quot;b&quot;, &quot;a&#x27;b&quot;, &quot;a\\b&quot;
<button class="copy-code-btn"></button></code></pre>
<p><strong>유효하지 않은 문자열의 예</strong>:</p>
<pre><code translate="no" class="language-plaintext">&#x27;a&quot;b&#x27;, &#x27;a\&#x27;b&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="What-filtering-logic-does-Milvus-use-for-indexed-JSON-paths" class="common-anchor-header">Milvus는 인덱싱된 JSON 경로에 대해 어떤 필터링 로직을 사용하나요?<button data-href="#What-filtering-logic-does-Milvus-use-for-indexed-JSON-paths" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>숫자 인덱싱</strong>:</p>
<p><code translate="no">json_cast_type=&quot;double&quot;</code> 로 인덱스가 생성된 경우, 숫자형 필터 조건(예: <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">== 42</code>)만 해당 인덱스를 활용합니다. 숫자가 아닌 조건의 경우 무차별 스캔으로 대체될 수 있습니다.</p></li>
<li><p><strong>문자열 인덱싱</strong>:</p>
<p>인덱스가 ` <code translate="no">json_cast_type=&quot;varchar&quot;</code>`를 사용하는 경우, 문자열 필터 조건만 해당 인덱스의 이점을 누릴 수 있으며, 다른 유형의 조건은 무차별 스캔으로 전환될 수 있습니다.</p></li>
<li><p><strong>부울 인덱싱</strong>:</p>
<p>부울 인덱싱은 문자열 인덱싱과 유사하게 작동하며, 조건이 true 또는 false와 정확히 일치할 때만 인덱스가 사용됩니다.</p></li>
</ul>
<h3 id="What-about-numeric-precision-when-indexing-JSON-fields" class="common-anchor-header">JSON 필드를 인덱싱할 때 숫자 정밀도는 어떻게 되나요?<button data-href="#What-about-numeric-precision-when-indexing-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus는 인덱싱된 모든 숫자 값을 double 형식으로 저장합니다.</p>
<p>숫자 값이 <strong>2^53을</strong> 초과하면 정밀도가 떨어질 수 있습니다. 이러한 정밀도 손실로 인해 필터 쿼리가 범위 외 값과 정확히 일치하지 않을 수 있습니다.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-path-with-different-cast-types" class="common-anchor-header">동일한 JSON 경로에 서로 다른 캐스트 유형을 사용하여 여러 인덱스를 생성할 수 있나요?<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-path-with-different-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p>아니요, 각 JSON 경로는 <strong>하나의 인덱스만</strong> 지원합니다. 데이터에 맞는 단일 변환 유형( <code translate="no">json_cast_type</code> )을 선택해야 합니다. 동일한 경로에 서로 다른 변환 유형을 사용하여 여러 인덱스를 생성하는 것은 지원되지 않습니다.</p>
<h3 id="What-if-values-on-a-JSON-path-have-inconsistent-types" class="common-anchor-header">JSON 경로의 값 유형이 일관되지 않은 경우에는 어떻게 되나요?<button data-href="#What-if-values-on-a-JSON-path-have-inconsistent-types" class="anchor-icon" translate="no">
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
    </button></h3><p>엔티티 간에 유형이 일관되지 않으면 <strong>부분 인덱싱이</strong> 발생할 수 있습니다. 예를 들어, <code translate="no">metadata[&quot;price&quot;]</code> 가 숫자(<code translate="no">99.99</code>)와 문자열(<code translate="no">&quot;99.99&quot;</code>)로 모두 저장되어 있고, 인덱스가 <code translate="no">json_cast_type=&quot;double&quot;</code> 로 정의된 경우, 숫자 값만 인덱싱됩니다. 문자열 형식의 항목은 건너뛰어지며 필터 결과에 표시되지 않습니다.</p>
<h3 id="Can-I-use-filters-with-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">인덱싱된 캐스트 유형과 다른 유형의 필터를 사용할 수 있나요?<button data-href="#Can-I-use-filters-with-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>필터 표현식이 인덱스의 <code translate="no">json_cast_type</code> 과 다른 유형을 사용하는 경우, 시스템은 <strong>해당 인덱스를 사용하지 않으며</strong>, 데이터가 허용하는 경우 더 느린 무차별 대입(brute-force) 스캔으로 대체될 수 있습니다. 최상의 성능을 얻으려면 항상 필터 표현식을 인덱스의 캐스트 유형과 일치시켜야 합니다.</p>
