---
id: use-json-fields.md
title: JSON 필드 사용
summary: >-
  JSON(JavaScript 객체 표기법)은 복잡한 데이터 구조를 저장하고 쿼리할 수 있는 유연한 방법을 제공하는 경량 데이터 교환
  형식입니다. Milvus에서는 JSON 필드를 사용하여 벡터 데이터와 함께 추가적인 구조화된 정보를 저장할 수 있으므로 벡터 유사성과
  구조화된 필터링을 결합한 고급 검색 및 쿼리가 가능합니다.
---
<h1 id="JSON-Field​" class="common-anchor-header">JSON 필드<button data-href="#JSON-Field​" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://en.wikipedia.org/wiki/JSON">JSON</a> 필드는 벡터 임베딩과 함께 추가 정보를 키-값 쌍으로 저장하는 스칼라 필드입니다. 다음은 데이터가 JSON 형식으로 저장되는 방법의 예입니다:</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;metadata&quot;</span>: {
    <span class="hljs-string">&quot;product_info&quot;</span>: {
      <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>
    },
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
    <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;summer_sale&quot;</span>, <span class="hljs-string">&quot;clearance&quot;</span>]
  }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">제한<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><strong>필드 크기</strong>: JSON 필드의 크기는 65,536바이트로 제한됩니다.</li>
<li><strong>중첩된 사전</strong>: 중첩 사전: JSON 필드 값 내에 중첩된 사전은 저장 시 일반 문자열로 취급됩니다.</li>
<li><strong>기본값</strong>: JSON 필드는 기본값을 지원하지 않습니다. 그러나 <code translate="no">nullable</code> 속성을 <code translate="no">True</code> 으로 설정하여 null 값을 허용할 수 있습니다. 자세한 내용은 <a href="/docs/ko/nullable-and-default.md">Null 가능 및 기본값을</a> 참조하세요.</li>
<li><strong>유형 일치</strong>: JSON 필드의 키 값이 정수 또는 실수인 경우 표현식 필터를 통해서만 같은 유형의 다른 숫자 키와 비교할 수 있습니다.</li>
<li><strong>이름 지정</strong>: JSON 키의 이름을 지정할 때는 문자, 숫자, 밑줄만 사용하는 것이 좋습니다. 다른 문자를 사용하면 필터링이나 검색 시 문제가 발생할 수 있습니다.</li>
<li><strong>문자열 처리</strong>: 밀버스는 문자열 값을 의미 변환 없이 입력한 그대로 JSON 필드에 저장합니다. 예를 들어<ul>
<li><code translate="no">'a&quot;b'</code>, <code translate="no">&quot;a'b&quot;</code>, <code translate="no">'a\\'b'</code>, <code translate="no">&quot;a\\&quot;b&quot;</code> 는 그대로 저장됩니다.</li>
<li><code translate="no">'a'b'</code> 와 <code translate="no">&quot;a&quot;b&quot;</code> 는 유효하지 않은 것으로 간주됩니다.</li>
</ul></li>
<li><strong>JSON 인덱싱</strong>: JSON 필드를 색인할 때 JSON 필드에 하나 이상의 경로를 지정하여 필터링 속도를 높일 수 있습니다. 경로가 추가될 때마다 인덱싱 오버헤드가 증가하므로 인덱싱 전략을 신중하게 계획하세요. JSON 필드 인덱싱에 대한 자세한 고려 <a href="#considerations-on-json-indexing">사항은 JSON 인덱싱에 대한 고려 사항을</a> 참조하세요.</li>
</ul>
<h2 id="Add-JSON-field​" class="common-anchor-header">JSON 필드 추가<button data-href="#Add-JSON-field​" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션 스키마에 이 JSON 필드 <code translate="no">metadata</code> 를 추가하려면 <code translate="no">DataType.JSON</code> 을 사용합니다. 아래 예에서는 null 값을 허용하는 JSON 필드 메타데이터를 정의합니다:</p>
<p>다음은 JSON 필드를 포함하는 컬렉션 스키마를 정의하는 방법입니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Import necessary libraries</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Define server address</span>
SERVER_ADDR = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment"># Create a MilvusClient instance</span>
client = MilvusClient(uri=SERVER_ADDR)

<span class="hljs-comment"># Define the collection schema</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Add a JSON field that supports null values</span>
schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON, nullable=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .dataType(DataType.JSON)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">3</span>)
        .build());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">3</span>,
  },
];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;pk&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;embedding&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">3</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;metadata&quot;</span>).
    WithDataType(entity.FieldTypeJSON),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> jsonField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;metadata&quot;,
    &quot;dataType&quot;: &quot;JSON&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;pk&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;embedding&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 3
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;enableDynamicField\&quot;: true,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$jsonField</span>,
        <span class="hljs-variable">$pkField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>나중에 정의되지 않은 필드를 추가로 삽입해야 하는 경우 <code translate="no">enable_dynamic_fields=True</code> 을 설정하세요.</li>
<li>누락되거나 null인 JSON 객체를 허용하려면 <code translate="no">nullable=True</code> 을 사용합니다.</li>
</ul>
</div>
<h2 id="Set-index-params" class="common-anchor-header">인덱스 매개변수 설정<button data-href="#Set-index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>인덱싱은 Milvus가 대량의 데이터를 빠르게 필터링하거나 검색하는 데 도움이 됩니다. Milvus에서 인덱싱은</p>
<ul>
<li>벡터 필드의 경우 필수(유사도 검색을 효율적으로 실행하기 위해).</li>
<li>JSON 필드의 경우 선택 사항(특정 JSON 경로에서 스칼라 필터의 속도를 높이기 위해).</li>
</ul>
<h3 id="Index-a-JSON-field" class="common-anchor-header">JSON 필드 색인화</h3><p>기본적으로 JSON 필드는 색인화되지 않으므로 모든 필터 쿼리(예: <code translate="no">metadata[&quot;price&quot;] &lt; 100</code>)는 모든 행을 스캔해야 합니다. <code translate="no">metadata</code> 필드 내의 특정 경로에 대한 쿼리를 가속화하려면 관심 있는 각 경로에 반전된 인덱스를 만들면 됩니다. 이 예에서는 <code translate="no">metadata</code> JSON 필드 내의 서로 다른 경로에 대해 두 개의 인덱스를 생성합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

# Example <span class="hljs-number">1</span>: Index the <span class="hljs-string">&#x27;category&#x27;</span> key inside <span class="hljs-string">&#x27;product_info&#x27;</span> as a <span class="hljs-type">string</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_1&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>
    }
)

# Example <span class="hljs-number">2</span>: Index <span class="hljs-string">&#x27;price&#x27;</span> as a numeric <span class="hljs-keyword">type</span> (double)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_2&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;

<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; extraParams_1 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams_1.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>);
extraParams_1.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);
indexes.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;json_index_1&quot;</span>)
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">INVERTED</span>)
        .<span class="hljs-title function_">extraParams</span>(extraParams_1)
        .<span class="hljs-title function_">build</span>());

<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; extraParams_2 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams_2.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>);
extraParams_2.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;double&quot;</span>);
indexes.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;json_index_2&quot;</span>)
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">INVERTED</span>)
        .<span class="hljs-title function_">extraParams</span>(extraParams_2)
        .<span class="hljs-title function_">build</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = [
    {
        field_name: <span class="hljs-string">&quot;metadata&quot;</span>,
        index_type: <span class="hljs-string">&quot;INVERTED&quot;</span>,
        index_name: <span class="hljs-string">&quot;json_index_1&quot;</span>,
        <span class="hljs-keyword">params</span>: {
            json_path: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,
            json_cast_type: <span class="hljs-string">&quot;varchar&quot;</span>
        }
    },
    {
        field_name: <span class="hljs-string">&quot;metadata&quot;</span>,
        index_type: <span class="hljs-string">&quot;INVERTED&quot;</span>,
        index_name: <span class="hljs-string">&quot;json_index_2&quot;</span>,
        <span class="hljs-keyword">params</span>: {
            json_path: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,
            json_cast_type: <span class="hljs-string">&quot;double&quot;</span>
        }
    }
]

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">jsonIndex1 := index.NewJSONPathIndex(index.Inverted, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;product_info&quot;][&quot;category&quot;]`</span>)
jsonIndex2 := index.NewJSONPathIndex(index.Inverted, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`metadata[&quot;price&quot;]`</span>)
indexOpt1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>, <span class="hljs-string">&quot;meta&quot;</span>, jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>, <span class="hljs-string">&quot;meta&quot;</span>, jsonIndex2)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;metadata&quot;,
            &quot;indexName&quot;: &quot;json_index_1&quot;,
            &quot;indexType&quot;: &quot;INVERTED&quot;,
            &quot;params&quot;: {
                &quot;json_path&quot;: &quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;,
                &quot;json_cast_type&quot;: &quot;varchar&quot;
            }
        }
    ]
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;metadata&quot;,
            &quot;indexName&quot;: &quot;json_index_2&quot;,
            &quot;indexType&quot;: &quot;INVERTED&quot;,
            &quot;params&quot;: {
                &quot;json_path&quot;: &quot;metadata[\&quot;price\&quot;]&quot;,
                &quot;json_cast_type&quot;: &quot;double&quot;
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th><strong>파라미터</strong></th><th><strong>설명</strong></th><th><strong>예제 값</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">field_name</code></td><td>스키마에 있는 JSON 필드의 이름입니다.</td><td><code translate="no">&quot;metadata&quot;</code></td></tr>
<tr><td><code translate="no">index_type</code></td><td>생성할 인덱스 유형으로, 현재 JSON 경로 인덱싱에는 <code translate="no">INVERTED</code> 만 지원됩니다.</td><td><code translate="no">&quot;INVERTED&quot;</code></td></tr>
<tr><td><code translate="no">index_name</code></td><td>(선택 사항) 사용자 정의 인덱스 이름. 동일한 JSON 필드에 여러 인덱스를 생성하는 경우 다른 이름을 지정합니다.</td><td><code translate="no">&quot;json_index_1&quot;</code></td></tr>
<tr><td><code translate="no">params.json_path</code></td><td>인덱싱할 JSON 경로를 지정합니다. 중첩된 키, 배열 위치 또는 둘 다(예: <code translate="no">metadata[&quot;product_info&quot;][&quot;category&quot;]</code> 또는 <code translate="no">metadata[&quot;tags&quot;][0]</code>)를 대상으로 할 수 있으며, 경로가 누락되거나 특정 행에 대한 배열 요소가 없는 경우 해당 행은 인덱싱 중에 건너뛰고 오류는 발생하지 않습니다.</td><td><code translate="no">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</code></td></tr>
<tr><td><code translate="no">params.json_cast_type</code></td><td>인덱스를 생성할 때 Milvus가 추출된 JSON 값을 형변환할 데이터 유형입니다. 유효한 값 <ul><li> <code translate="no">&quot;bool&quot;</code> 또는 <code translate="no">&quot;BOOL&quot;</code></li><li><code translate="no">&quot;double&quot;</code> 또는 <code translate="no">&quot;DOUBLE&quot;</code></li><li> <code translate="no">&quot;varchar&quot;</code> 또는 <code translate="no">&quot;VARCHAR&quot;</code></li></ul><br><strong>참고</strong>: 정수 값의 경우, Milvus는 내부적으로 인덱스에 더블을 사용합니다. 2^53 이상의 큰 정수는 정밀도가 떨어집니다. 유형 불일치로 인해 형 변환이 실패하면 오류가 발생하지 않으며 해당 행의 값은 색인되지 않습니다.</td><td><code translate="no">&quot;varchar&quot;</code></td></tr>
</tbody>
</table>
<h4 id="Considerations-on-JSON-indexing" class="common-anchor-header">JSON 인덱싱에 대한 고려 사항</h4><ul>
<li><strong>필터링 로직</strong>:<ul>
<li><strong>이중 유형 인덱스(</strong><code translate="no">json_cast_type=&quot;double&quot;</code><strong>)를 만드는</strong> 경우 숫자 유형 필터 조건만 인덱스를 사용할 수 있습니다. 필터가 이중 인덱스를 숫자가 아닌 조건과 비교하는 경우, Milvus는 무차별 대입 검색으로 돌아갑니다.</li>
<li><strong>바차르 타입 인덱스(</strong><code translate="no">json_cast_type=&quot;varchar&quot;</code><strong>)를 생성하는</strong> 경우 문자열 타입 필터 조건만 인덱스를 사용할 수 있습니다. 그렇지 않으면 Milvus는 무차별 대입 검색으로 돌아갑니다.</li>
<li><strong>부울</strong> 인덱싱은 바차르 타입과 유사하게 작동합니다.</li>
</ul></li>
<li><strong>용어 표현식</strong>:<ul>
<li><code translate="no">json[&quot;field&quot;] in [value1, value2, …]</code> 을 사용할 수 있습니다. 그러나 인덱스는 해당 경로 아래에 저장된 스칼라 값에 대해서만 작동합니다. <code translate="no">json[&quot;field&quot;]</code> 이 배열인 경우 쿼리는 무차별 대입으로 돌아갑니다(배열형 인덱싱은 아직 지원되지 않음).</li>
</ul></li>
<li><strong>숫자 정밀도</strong>:<ul>
<li>내부적으로 Milvus는 모든 숫자 필드를 이중으로 색인합니다. 숫자 값이 2^53을 초과하면 정밀도가 떨어지며, 범위를 벗어난 값에 대한 쿼리는 정확히 일치하지 않을 수 있습니다.</li>
</ul></li>
<li><strong>데이터 무결성</strong>:<ul>
<li>Milvus는 지정된 형 변환을 넘어서는 JSON 키를 구문 분석하거나 변환하지 않습니다. 소스 데이터가 일관성이 없는 경우(예: 일부 행은 <code translate="no">&quot;k&quot;</code> 키에 대해 문자열을 저장하고 다른 행은 숫자를 저장하는 경우), 일부 행은 색인되지 않습니다.</li>
</ul></li>
</ul>
<h3 id="Index-a-vector-field" class="common-anchor-header">벡터 필드 색인 생성</h3><p>다음 예는 AUTOINDEX 인덱스 유형을 사용하여 벡터 필드 임베딩에 대한 인덱스를 생성하는 예제입니다. 이 유형을 사용하면 Milvus가 데이터 유형에 따라 가장 적합한 인덱스를 자동으로 선택합니다. 각 필드에 대한 인덱스 유형과 매개변수를 사용자 지정할 수도 있습니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set index params</span>

index_params = client.prepare_index_params()

<span class="hljs-comment"># Index `embedding` with AUTOINDEX and specify similarity metric type</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Use automatic indexing to simplify complex index settings</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>  <span class="hljs-comment"># Specify similarity metric type, options include L2, COSINE, or IP</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexName(<span class="hljs-string">&quot;vector_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;embedding_index&#x27;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;embedding&#x27;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;vector_index&#x27;</span>,
    <span class="hljs-attr">metricType</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">CONSINE</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">vectorIndex := index.NewAutoIndex(entity.COSINE)
indexOpt := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>, vectorIndex)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;indexName&quot;: &quot;vector_index&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-collection​" class="common-anchor-header">컬렉션 생성<button data-href="#Create-collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>스키마와 인덱스가 정의되면 문자열 필드를 포함하는 컬렉션을 만듭니다.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">create_collection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_json_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: indexParams
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>, schema).
        WithIndexOptions(indexOpt1, indexOpt2, indexOpt))
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-comment">// handler err</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_json_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data​" class="common-anchor-header">데이터 삽입<button data-href="#Insert-data​" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션을 만든 후 스키마와 일치하는 엔티티를 삽입합니다.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample data</span>
data = [
    {
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;summer_sale&quot;</span>]
        },
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
    },
    {
        <span class="hljs-string">&quot;metadata&quot;</span>: <span class="hljs-literal">None</span>,  <span class="hljs-comment"># Entire JSON object is null</span>
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]
    },
    {
        <span class="hljs-comment"># JSON field is completely missing</span>
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]
    },
    {
        <span class="hljs-comment"># Some sub-keys are null</span>
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandB&quot;</span>},
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">59.99</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">None</span>
        },
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.21</span>]
    }
]

client.insert(
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,
    data=data
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
Gson gson = <span class="hljs-keyword">new</span> Gson();
rows.<span class="hljs-keyword">add</span>(gson.fromJson(<span class="hljs-string">&quot;{\&quot;metadata\&quot;:{\&quot;product_info\&quot;:{\&quot;category\&quot;:\&quot;electronics\&quot;,\&quot;brand\&quot;:\&quot;BrandA\&quot;},\&quot;price\&quot;:99.99,\&quot;in_stock\&quot;:True,\&quot;tags\&quot;:[\&quot;summer_sale\&quot;]},\&quot;pk\&quot;:1,\&quot;embedding\&quot;:[0.12,0.34,0.56]}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>));
rows.<span class="hljs-keyword">add</span>(gson.fromJson(<span class="hljs-string">&quot;{\&quot;metadata\&quot;:null,\&quot;pk\&quot;:2,\&quot;embedding\&quot;:[0.56,0.78,0.90]}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>));
rows.<span class="hljs-keyword">add</span>(gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;:3,\&quot;embedding\&quot;:[0.91,0.18,0.23]}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>));
rows.<span class="hljs-keyword">add</span>(gson.fromJson(<span class="hljs-string">&quot;{\&quot;metadata\&quot;:{\&quot;product_info\&quot;:{\&quot;category\&quot;:null,\&quot;brand\&quot;:\&quot;BrandB\&quot;},\&quot;price\&quot;:59.99,\&quot;in_stock\&quot;:null},\&quot;pk\&quot;:4,\&quot;embedding\&quot;:[0.56,0.38,0.21]}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>));

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)
        .data(rows)
        .build());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">const data = [
    {
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;summer_sale&quot;</span>]
        },
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
    },
    {
        <span class="hljs-string">&quot;metadata&quot;</span>: <span class="hljs-literal">None</span>,  <span class="hljs-comment"># Entire JSON object is null</span>
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]
    },
    {
        <span class="hljs-comment"># JSON field is completely missing</span>
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]
    },
    {
        <span class="hljs-comment"># Some sub-keys are null</span>
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandB&quot;</span>},
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">59.99</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">None</span>
        },
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.21</span>]
    }
];

<span class="hljs-keyword">await</span> client.insert({
    collection_name: <span class="hljs-string">&quot;my_json_collection&quot;</span>,
    data: data
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

resp, err := cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;pk&quot;</span>, []int64{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;embedding&quot;</span>, <span class="hljs-number">3</span>, [][]float32{
        {<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>},
        {<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>},
        {<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>},
        {<span class="hljs-number">0.56</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.21</span>},
    }).WithColumns(
    column.NewColumnJSONBytes(<span class="hljs-string">&quot;metadata&quot;</span>, [][]<span class="hljs-type">byte</span>{
        []<span class="hljs-type">byte</span>(`{
        <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},
        <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>: True,
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;summer_sale&quot;</span>]
    }`),
        []<span class="hljs-type">byte</span>(`<span class="hljs-literal">null</span>`),
        []<span class="hljs-type">byte</span>(`<span class="hljs-literal">null</span>`),
        []<span class="hljs-type">byte</span>(`<span class="hljs-string">&quot;metadata&quot;</span>: {
        <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: None, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandB&quot;</span>},
        <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">59.99</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>: None
    }`),
    }),
))
<span class="hljs-keyword">if</span> err != nil {
    <span class="hljs-comment">// handle err</span>
}
fmt.Println(resp)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {
             &quot;metadata&quot;:  {
                   &quot;product_info&quot;: {&quot;category&quot;: &quot;electronics&quot;, &quot;brand&quot;: &quot;BrandA&quot;},
                  &quot;price&quot;:  99.99,
                   &quot;in_stock&quot;:  true,
                  &quot;tags&quot;: [&quot;summer_sale&quot;]
              }, 
             &quot;varchar_field2&quot;: &quot;High quality product&quot;, 
             &quot;pk&quot;: 1, 
             &quot;embedding&quot;: [0.1, 0.2, 0.3]
          },
          {
              &quot;metadata&quot;: null,
              &quot;pk&quot;: 2,
              &quot;embedding&quot;: [0.56, 0.78, 0.90]
          },
         {
               &quot;pk&quot;: 3,
               &quot;embedding&quot;: [0.91, 0.18, 0.23]
         },
        {
              &quot;metadata&quot;: {
                     &quot;product_info&quot;: {&quot;category&quot;: null, &quot;brand&quot;: &quot;BrandB&quot;},
                     &quot;price&quot;: 59.99,
                     &quot;in_stock&quot;: null
               },
              &quot;pk&quot;: 4,
              &quot;embedding&quot;: [0.56, 0.38, 0.21]
         }
    ],
    &quot;collectionName&quot;: &quot;my_json_collection&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Query-with-filter-expressions" class="common-anchor-header">필터 표현식을 사용하여 쿼리</h3><p>엔티티를 삽입한 후 쿼리 메서드를 사용하여 지정된 필터 표현식과 일치하는 엔티티를 검색합니다.</p>
<div class="alert note">
<p>널 값을 허용하는 JSON 필드의 경우 전체 JSON 객체가 누락되거나 없음으로 설정된 경우 필드가 널로 처리됩니다. 자세한 내용은 Null 값이 있는 JSON 필드를 참조하세요.</p>
</div>
<p>메타데이터가 null이 아닌 엔티티를 검색하려면 다음과 같이 하세요:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query to filter out records with null metadata</span>

<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata is not null&#x27;</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-comment"># Expected result:</span>
<span class="hljs-comment"># Rows with pk=1 and pk=4 have valid, non-null metadata.</span>
<span class="hljs-comment"># Rows with pk=2 (metadata=None) and pk=3 (no metadata key) are excluded.</span>

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;product_info&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;price&#x27;: 99.99, &#x27;in_stock&#x27;: True, &#x27;tags&#x27;: [&#x27;summer_sale&#x27;]}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;product_info&#x27;: {&#x27;category&#x27;: None, &#x27;brand&#x27;: &#x27;BrandB&#x27;}, &#x27;price&#x27;: 59.99, &#x27;in_stock&#x27;: None}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;metadata is not null&quot;</span>;
QueryResp resp = client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
        .build());

System.out.println(resp.getQueryResults());

// Output
//
// [
//    QueryResp.QueryResult(entity={metadata={<span class="hljs-string">&quot;product_info&quot;</span>:{<span class="hljs-string">&quot;category&quot;</span>:<span class="hljs-string">&quot;electronics&quot;</span>,<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;BrandA&quot;</span>},<span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">99.99</span>,<span class="hljs-string">&quot;in_stock&quot;</span>:true,<span class="hljs-string">&quot;tags&quot;</span>:[<span class="hljs-string">&quot;summer_sale&quot;</span>]}, pk=<span class="hljs-number">1</span>}),
//    QueryResp.QueryResult(entity={metadata={<span class="hljs-string">&quot;product_info&quot;</span>:{<span class="hljs-string">&quot;category&quot;</span>:null,<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;BrandB&quot;</span>},<span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">59.99</span>,<span class="hljs-string">&quot;in_stock&quot;</span>:null}, pk=<span class="hljs-number">4</span>})
// ]

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.query({
    collection_name: <span class="hljs-string">&#x27;my_scalar_collection&#x27;</span>,
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot; and metadata[&quot;price&quot;] &lt; 150&#x27;</span>,
    output_fields: [<span class="hljs-string">&#x27;metadata&#x27;</span>]
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">rs, err := cli.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;metadata is not null&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(rs.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>))
fmt.Println(rs.GetColumn(<span class="hljs-string">&quot;metadata&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_json_collection&quot;,
    &quot;filter&quot;: &quot;metadata is not null&quot;,
    &quot;outputFields&quot;: [&quot;metadata&quot;, &quot;pk&quot;]
}&#x27;</span>

<span class="hljs-comment">#{&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;metadata&quot;:&quot;{\&quot;product_info\&quot;: {\&quot;category\&quot;: \&quot;electronics\&quot;, \&quot;brand\&quot;: \&quot;BrandA\&quot;}, \&quot;price\&quot;: 99.99, \&quot;in_stock\&quot;: true, \&quot;tags\&quot;: [\&quot;summer_sale\&quot;]}&quot;,&quot;pk&quot;:1},{&quot;metadata&quot;:&quot;&quot;,&quot;pk&quot;:2},{&quot;metadata&quot;:&quot;&quot;,&quot;pk&quot;:3},{&quot;metadata&quot;:&quot;{\&quot;product_info\&quot;: {\&quot;category\&quot;: null, \&quot;brand\&quot;: \&quot;BrandB\&quot;}, \&quot;price\&quot;: 59.99, \&quot;in_stock\&quot;: null}&quot;,&quot;pk&quot;:4}]}</span>

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">metadata[&quot;product_info&quot;][&quot;category&quot;]</code> 가 <code translate="no">&quot;electronics&quot;</code> 인 엔티티를 검색하려면:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;product_info&quot;][&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-comment"># Expected result:</span>
<span class="hljs-comment"># - Only pk=1 has &quot;category&quot;: &quot;electronics&quot;.</span>
<span class="hljs-comment"># - pk=4 has &quot;category&quot;: None, so it doesn&#x27;t match.</span>
<span class="hljs-comment"># - pk=2 and pk=3 have no valid metadata.</span>

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;pk&#x27;: 1, &#x27;metadata&#x27;: {&#x27;product_info&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;price&#x27;: 99.99, &#x27;in_stock&#x27;: True, &#x27;tags&#x27;: [&#x27;summer_sale&#x27;]}}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;] == \&quot;electronics\&quot;&quot;</span>;

QueryResp resp = client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
        .build());

System.out.println(resp.getQueryResults());

// Output
// [QueryResp.QueryResult(entity={metadata={<span class="hljs-string">&quot;product_info&quot;</span>:{<span class="hljs-string">&quot;category&quot;</span>:<span class="hljs-string">&quot;electronics&quot;</span>,<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;BrandA&quot;</span>},<span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">99.99</span>,<span class="hljs-string">&quot;in_stock&quot;</span>:true,<span class="hljs-string">&quot;tags&quot;</span>:[<span class="hljs-string">&quot;summer_sale&quot;</span>]}, pk=<span class="hljs-number">1</span>})]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">const <span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>;
const res = <span class="hljs-keyword">await</span> client.query({
    collection_name: <span class="hljs-string">&quot;my_json_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>: <span class="hljs-built_in">filter</span>,
    output_fields: [<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
});

// Example output:
// {
//.  data: [
//      {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;metadata&#x27;</span>: {<span class="hljs-string">&#x27;category&#x27;</span>: <span class="hljs-string">&#x27;electronics&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;BrandA&#x27;</span>}}
// ]
// }
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">rs, err := cli.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>).
    WithFilter(`metadata[<span class="hljs-string">&quot;product_info&quot;</span>][<span class="hljs-string">&quot;category&quot;</span>] == <span class="hljs-string">&quot;electronics&quot;</span>`).
    WithOutputFields(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
<span class="hljs-keyword">if</span> err != nil {
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(rs.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>))
fmt.Println(rs.GetColumn(<span class="hljs-string">&quot;metadata&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;my_json_collection&quot;,
  &quot;filter&quot;: &quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;] == \&quot;electronics\&quot;&quot;,
  &quot;outputFields&quot;: [&quot;metadata&quot;, &quot;pk&quot;]
}&#x27;</span>

<span class="hljs-comment">#{&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;metadata&quot;:&quot;{\&quot;product_info\&quot;: {\&quot;category\&quot;: \&quot;electronics\&quot;, \&quot;brand\&quot;: \&quot;BrandA\&quot;}, \&quot;price\&quot;: 99.99, \&quot;in_stock\&quot;: true, \&quot;tags\&quot;: [\&quot;summer_sale\&quot;]}&quot;,&quot;pk&quot;:1}]}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Vector-search-with-JSON-filtering​" class="common-anchor-header">JSON 필터링을 사용한 벡터 검색</h3><p>기본 스칼라 필드 필터링 외에도 벡터 유사도 검색을 스칼라 필드 필터와 결합할 수 있습니다. 예를 들어, 다음 코드는 벡터 검색에 스칼라 필드 필터를 추가하는 방법을 보여줍니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;product_info&quot;][&quot;brand&quot;] == &quot;BrandA&quot;&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,
    data=[[<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>]],
    limit=<span class="hljs-number">5</span>,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>],
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>
)

<span class="hljs-comment"># Expected result:</span>
<span class="hljs-comment"># - Only pk=1 has &quot;brand&quot;: &quot;BrandA&quot; in metadata[&quot;product_info&quot;].</span>
<span class="hljs-comment"># - pk=4 has &quot;brand&quot;: &quot;BrandB&quot;.</span>
<span class="hljs-comment"># - pk=2 and pk=3 have no valid metadata.</span>
<span class="hljs-comment"># Hence, only pk=1 matches the filter.</span>

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: -0.2479381263256073, &#x27;entity&#x27;: {&#x27;metadata&#x27;: {&#x27;product_info&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;price&#x27;: 99.99, &#x27;in_stock&#x27;: True, &#x27;tags&#x27;: [&#x27;summer_sale&#x27;]}}}]&quot;</span>
<span class="hljs-comment"># ]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;brand\&quot;] == \&quot;BrandA\&quot;&quot;</span>;

SearchResp resp = client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embedding&quot;</span>)
        .data(Collections.singletonList(new FloatVec(new <span class="hljs-built_in">float</span>[]{<span class="hljs-number">0.3</span>f, -<span class="hljs-number">0.6</span>f, <span class="hljs-number">0.1</span>f})))
        .topK(<span class="hljs-number">5</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;metadata&quot;</span>))
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .build());

System.out.println(resp.getSearchResults());

// Output
//
// [
//   [
//     SearchResp.SearchResult(entity={metadata={<span class="hljs-string">&quot;product_info&quot;</span>:{<span class="hljs-string">&quot;category&quot;</span>:<span class="hljs-string">&quot;electronics&quot;</span>,<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;BrandA&quot;</span>},<span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">99.99</span>,<span class="hljs-string">&quot;in_stock&quot;</span>:true,<span class="hljs-string">&quot;tags&quot;</span>:[<span class="hljs-string">&quot;summer_sale&quot;</span>]}}, score=-<span class="hljs-number">0.24793813</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">1</span>)
//   ]
// ]

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.search({
    collection_name: <span class="hljs-string">&#x27;my_json_collection&#x27;</span>,
    data: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>],
    limit: <span class="hljs-number">5</span>,
    output_fields: [<span class="hljs-string">&#x27;metadata&#x27;</span>],
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot; and metadata[&quot;price&quot;] &lt; 150&#x27;</span>,
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3</span>, <span class="hljs-number">-0.6</span>, <span class="hljs-number">-0.1</span>}

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>)
resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_json_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,                    <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithOutputFields(<span class="hljs-string">&quot;metadata&quot;</span>).WithAnnParam(annParam))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to perform basic ANN search collection: &quot;</span>, err.Error())
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    log.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
    log.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;my_json_collection&quot;,
  &quot;data&quot;: [
    [0.3, -0.6, 0.1]
  ],
  &quot;annsField&quot;: &quot;embedding&quot;,
  &quot;limit&quot;: 5,
  &quot;searchParams&quot;: {
    &quot;params&quot;: {
      &quot;nprobe&quot;: 10
    }
  },
  &quot;outputFields&quot;: [&quot;metadata&quot;],
  &quot;filter&quot;: &quot;metadata[\&quot;product_info\&quot;][\&quot;brand\&quot;] == \&quot;BrandA\&quot;&quot;
}&#x27;</span>

<span class="hljs-comment">##{&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;metadata&quot;:&quot;{\&quot;product_info\&quot;: {\&quot;category\&quot;: \&quot;electronics\&quot;, \&quot;brand\&quot;: \&quot;BrandA\&quot;}, \&quot;price\&quot;: 99.99, \&quot;in_stock\&quot;: true, \&quot;tags\&quot;: [\&quot;summer_sale\&quot;]}&quot;,&quot;pk&quot;:1}]}</span>

<button class="copy-code-btn"></button></code></pre>
<p>또한 Milvus는 <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_CONTAINS_ALL</code>, <code translate="no">JSON_CONTAINS_ANY</code> 와 같은 고급 JSON 필터링 연산자를 지원하여 쿼리 기능을 더욱 향상시킬 수 있습니다. 자세한 내용은 <a href="/docs/ko/json-operators.md">JSON 연산자를</a> 참조하세요.</p>
