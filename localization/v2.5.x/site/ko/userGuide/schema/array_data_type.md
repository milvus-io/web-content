---
id: array_data_type.md
title: 배열 필드
summary: "ARRAY 필드는 동일한 데이터 유형의 정렬된 요소 집합을 저장합니다. 다음은 ARRAY 필드가 데이터를 저장하는 방법의 예입니다:"
---

<h1 id="Array-Field" class="common-anchor-header">배열 필드<button data-href="#Array-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>배열 필드는 동일한 데이터 유형의 정렬된 요소 집합을 저장합니다. 다음은 배열 필드가 데이터를 저장하는 방법의 예입니다:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;pop&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;rock&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;classic&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ratings&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">5</span><span class="hljs-punctuation">,</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span> <span class="hljs-number">3</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
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
<li><p><strong>기본값</strong>: ARRAY 필드는 기본값을 지원하지 않습니다. 그러나 <code translate="no">nullable</code> 속성을 <code translate="no">True</code> 으로 설정하여 null 값을 허용할 수 있습니다. 자세한 내용은 <a href="/docs/ko/v2.5.x/nullable-and-default.md">Null 가능 및 기본값을</a> 참조하세요.</p></li>
<li><p><strong>데이터 유형</strong>: 배열 필드의 모든 요소는 <code translate="no">element_type</code> 에 지정된 대로 동일한 데이터 유형을 가져야 합니다. <code translate="no">element_type</code> 을 <code translate="no">VARCHAR</code> 으로 설정한 경우 배열 요소에 대해서도 <code translate="no">max_length</code> 을 설정해야 합니다.</p></li>
<li><p><strong>배열 용량</strong>: 배열 필드의 요소 수는 <code translate="no">max_capacity</code> 에 지정된 대로 배열을 생성할 때 정의된 최대 용량보다 작거나 같아야 합니다. 값은 <strong>1에서</strong> <strong>4096</strong> 범위 내의 정수여야 합니다.</p></li>
<li><p><strong>문자열 처리</strong>: 배열 필드의 문자열 값은 시맨틱 이스케이프나 변환 없이 있는 그대로 저장됩니다. 예를 들어 <code translate="no">'a&quot;b'</code>, <code translate="no">&quot;a'b&quot;</code>, <code translate="no">'a\'b'</code>, <code translate="no">&quot;a\&quot;b&quot;</code> 은 입력한 대로 저장되고 <code translate="no">'a'b'</code> 및 <code translate="no">&quot;a&quot;b&quot;</code> 은 유효하지 않은 값으로 간주됩니다.</p></li>
</ul>
<h2 id="Add-ARRAY-field" class="common-anchor-header">ARRAY 필드 추가<button data-href="#Add-ARRAY-field" class="anchor-icon" translate="no">
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
    </button></h2><p>배열 필드 Milvus를 사용하려면 컬렉션 스키마를 만들 때 관련 필드 유형을 정의합니다. 이 프로세스에는 다음이 포함됩니다:</p>
<ol>
<li><p><code translate="no">datatype</code> 을 지원되는 배열 데이터 유형인 <code translate="no">ARRAY</code> 으로 설정합니다.</p></li>
<li><p><code translate="no">element_type</code> 매개변수를 사용하여 배열에 있는 요소의 데이터 유형을 지정합니다. <code translate="no">VARCHAR</code> 또는 <code translate="no">INT64</code> 과 같이 Milvus에서 지원하는 모든 스칼라 데이터 유형이 될 수 있습니다. 동일한 배열의 모든 요소는 동일한 데이터 유형이어야 합니다.</p></li>
<li><p><code translate="no">max_capacity</code> 매개변수를 사용하여 배열의 최대 용량, 즉 배열에 포함할 수 있는 최대 요소 수를 정의합니다.</p></li>
</ol>
<p>다음은 배열 필드를 포함하는 컬렉션 스키마를 정의하는 방법입니다:</p>
<div class="alert note">
<p>스키마를 정의할 때 <code translate="no">enable_dynamic_fields=True</code> 을 설정하면 Milvus에서는 미리 정의하지 않은 스칼라 필드를 삽입할 수 있습니다. 그러나 이렇게 하면 쿼리 및 관리의 복잡성이 증가하여 성능에 영향을 미칠 수 있습니다. 자세한 내용은 <a href="/docs/ko/v2.5.x/enable-dynamic-field.md">동적 필드를</a> 참조하세요.</p>
</div>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#http">HTTP</a></div>
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

<span class="hljs-comment"># Add `tags` and `ratings` ARRAY fields with nullable=True</span>
schema.add_field(field_name=<span class="hljs-string">&quot;tags&quot;</span>, datatype=DataType.ARRAY, element_type=DataType.VARCHAR, max_capacity=<span class="hljs-number">10</span>, max_length=<span class="hljs-number">65535</span>, nullable=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;ratings&quot;</span>, datatype=DataType.ARRAY, element_type=DataType.INT64, max_capacity=<span class="hljs-number">5</span>, nullable=<span class="hljs-literal">True</span>)
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
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)
        .dataType(DataType.Array)
        .elementType(DataType.VarChar)
        .maxCapacity(<span class="hljs-number">10</span>)
        .maxLength(<span class="hljs-number">65535</span>)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;ratings&quot;</span>)
        .dataType(DataType.Array)
        .elementType(DataType.Int64)
        .maxCapacity(<span class="hljs-number">5</span>)
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
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;pk&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;embedding&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">3</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;tags&quot;</span>).
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeVarChar).
    WithMaxCapacity(<span class="hljs-number">10</span>).
    WithMaxLength(<span class="hljs-number">65535</span>).
    WithNullable(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;ratings&quot;</span>).
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeInt64).
    WithMaxCapacity(<span class="hljs-number">5</span>).
    WithNullable(<span class="hljs-literal">true</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;tags&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">65535</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;rating&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>,
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
<pre><code translate="no" class="language-http">export arrayField1='{
    &quot;fieldName&quot;: &quot;tags&quot;,
    &quot;dataType&quot;: &quot;Array&quot;,
    &quot;elementDataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_capacity&quot;: 10,
        &quot;max_length&quot;: 65535
    }
}'

export arrayField2='{
    &quot;fieldName&quot;: &quot;ratings&quot;,
    &quot;dataType&quot;: &quot;Array&quot;,
    &quot;elementDataType&quot;: &quot;Int64&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_capacity&quot;: 5
    }
}'

export pkField='{
    &quot;fieldName&quot;: &quot;pk&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}'

export vectorField='{
    &quot;fieldName&quot;: &quot;embedding&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 3
    }
}'

export schema=&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        $arrayField1,
        $arrayField2,
        $pkField,
        $vectorField
    ]
}&quot;
</code></pre>
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
    </button></h2><p>인덱싱은 검색 및 쿼리 성능을 개선하는 데 도움이 됩니다. Milvus에서 인덱싱은 벡터 필드의 경우 필수이지만 스칼라 필드의 경우 선택 사항입니다.</p>
<p>다음 예는 <code translate="no">AUTOINDEX</code> 인덱스 유형을 사용하여 벡터 필드 <code translate="no">embedding</code> 와 배열 필드 <code translate="no">tags</code> 에 인덱스를 생성하는 예제입니다. 이 유형을 사용하면 Milvus는 데이터 유형에 따라 가장 적합한 인덱스를 자동으로 선택합니다. 각 필드에 대한 인덱스 유형과 매개변수를 사용자 지정할 수도 있습니다. 자세한 내용은 <a href="/docs/ko/v2.5.x/index-explained.md">인덱스 설명을</a> 참조하세요.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set index params</span>

index_params = client.prepare_index_params()

<span class="hljs-comment"># Index `age` with AUTOINDEX</span>
index_params.add_index(
field_name=<span class="hljs-string">&quot;tags&quot;</span>,
index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
index_name=<span class="hljs-string">&quot;tags_index&quot;</span>
)

<span class="hljs-comment"># Index `embedding` with AUTOINDEX and specify similarity metric type</span>
index_params.add_index(
field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Use automatic indexing to simplify complex index settings</span>
metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> <span class="hljs-comment"># Specify similarity metric type, options include L2, COSINE, or IP</span>
)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)
        .indexName(<span class="hljs-string">&quot;tags_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .build());
        
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOpt1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>, index.NewInvertedIndex())
indexOpt2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>, index.NewAutoIndex(entity.COSINE))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = [{
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;inverted_index&#x27;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;tags&#x27;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
)];

indexParams.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;embedding_index&#x27;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;embedding&#x27;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;tags&quot;,
            &quot;indexName&quot;: &quot;inverted_index&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        },
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-collection" class="common-anchor-header">컬렉션 만들기<button data-href="#Create-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>스키마와 인덱스가 정의되면 ARRAY 필드를 포함하는 컬렉션을 만듭니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
    WithIndexOptions(indexOpt1, indexOpt2))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handler err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">create_collection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: indexParams
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">데이터 삽입<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션을 생성한 후 ARRAY 필드를 포함하는 데이터를 삽입할 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample data</span>
data = [
  {
      <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;pop&quot;</span>, <span class="hljs-string">&quot;rock&quot;</span>, <span class="hljs-string">&quot;classic&quot;</span>],
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
  },
  {
      <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-literal">None</span>,  <span class="hljs-comment"># Entire ARRAY is null</span>
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.78</span>, <span class="hljs-number">0.91</span>, <span class="hljs-number">0.23</span>]
  },
  {  <span class="hljs-comment"># The tags field is completely missing</span>
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">9</span>, <span class="hljs-number">5</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.11</span>, <span class="hljs-number">0.23</span>]
  }
]

client.insert(
collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
data=data
)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;tags\&quot;: [\&quot;pop\&quot;, \&quot;rock\&quot;, \&quot;classic\&quot;], \&quot;ratings\&quot;: [5, 4, 3], \&quot;pk\&quot;: 1, \&quot;embedding\&quot;: [0.12, 0.34, 0.56]}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;tags\&quot;: null, \&quot;ratings\&quot;: [4, 5], \&quot;pk\&quot;: 2, \&quot;embedding\&quot;: [0.78, 0.91, 0.23]}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;ratings\&quot;: [9, 5], \&quot;pk\&quot;: 3, \&quot;embedding\&quot;: [0.18, 0.11, 0.23]}&quot;</span>, JsonObject.class));

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">column1, _ := column.NewNullableColumnVarCharArray(<span class="hljs-string">&quot;tags&quot;</span>,
    [][]<span class="hljs-type">string</span>{{<span class="hljs-string">&quot;pop&quot;</span>, <span class="hljs-string">&quot;rock&quot;</span>, <span class="hljs-string">&quot;classic&quot;</span>}},
    []<span class="hljs-type">bool</span>{<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>})
column2, _ := column.NewNullableColumnInt64Array(<span class="hljs-string">&quot;ratings&quot;</span>,
    [][]<span class="hljs-type">int64</span>{{<span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>}, {<span class="hljs-number">4</span>, <span class="hljs-number">5</span>}, {<span class="hljs-number">9</span>, <span class="hljs-number">5</span>}},
    []<span class="hljs-type">bool</span>{<span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>})

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;pk&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;embedding&quot;</span>, <span class="hljs-number">3</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>},
        {<span class="hljs-number">0.78</span>, <span class="hljs-number">0.91</span>, <span class="hljs-number">0.23</span>},
        {<span class="hljs-number">0.18</span>, <span class="hljs-number">0.11</span>, <span class="hljs-number">0.23</span>},
    }).WithColumns(column1, column2))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
    {
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;pop&quot;</span>, <span class="hljs-string">&quot;rock&quot;</span>, <span class="hljs-string">&quot;classic&quot;</span>],
        <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>],
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
    },
    {
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;jazz&quot;</span>, <span class="hljs-string">&quot;blues&quot;</span>],
        <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>],
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.78</span>, <span class="hljs-number">0.91</span>, <span class="hljs-number">0.23</span>]
    },
    {
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronic&quot;</span>, <span class="hljs-string">&quot;dance&quot;</span>],
        <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>],
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.67</span>, <span class="hljs-number">0.45</span>, <span class="hljs-number">0.89</span>]
    }
];

client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: data,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {
        &quot;tags&quot;: [&quot;pop&quot;, &quot;rock&quot;, &quot;classic&quot;],
        &quot;ratings&quot;: [5, 4, 3],
        &quot;pk&quot;: 1,
        &quot;embedding&quot;: [0.12, 0.34, 0.56]
    },
    {
        &quot;tags&quot;: [&quot;jazz&quot;, &quot;blues&quot;],
        &quot;ratings&quot;: [4, 5],
        &quot;pk&quot;: 2,
        &quot;embedding&quot;: [0.78, 0.91, 0.23]
    },
    {
        &quot;tags&quot;: [&quot;electronic&quot;, &quot;dance&quot;],
        &quot;ratings&quot;: [3, 3, 4],
        &quot;pk&quot;: 3,
        &quot;embedding&quot;: [0.67, 0.45, 0.89]
    }       
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-with-filter-expressions" class="common-anchor-header">필터 표현식을 사용한 쿼리<button data-href="#Query-with-filter-expressions" class="anchor-icon" translate="no">
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
    </button></h2><p>엔티티를 삽입한 후 <code translate="no">query</code> 메서드를 사용하여 지정된 필터 표현식과 일치하는 엔티티를 검색합니다.</p>
<p><code translate="no">tags</code> 이 null이 아닌 엔티티를 검색하려면 다음과 같이 하세요:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query to exclude entities where `tags` is not null</span>

<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NOT NULL&#x27;</span>

res = client.query(
collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
output_fields=[<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment"># &quot;{&#x27;tags&#x27;: [&#x27;pop&#x27;, &#x27;rock&#x27;, &#x27;classic&#x27;], &#x27;ratings&#x27;: [5, 4, 3], &#x27;pk&#x27;: 1}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;tags IS NOT NULL&quot;</span>;
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
        .build());

System.out.println(resp.getQueryResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [QueryResp.QueryResult(entity={ratings=[5, 4, 3], pk=1, tags=[pop, rock, classic]})]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;tags IS NOT NULL&quot;</span>
rs, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithFilter(filter).
    WithOutputFields(<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(<span class="hljs-string">&quot;pk&quot;</span>, rs.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>).FieldData().GetScalars())
fmt.Println(<span class="hljs-string">&quot;tags&quot;</span>, rs.GetColumn(<span class="hljs-string">&quot;tags&quot;</span>).FieldData().GetScalars())
fmt.Println(<span class="hljs-string">&quot;ratings&quot;</span>, rs.GetColumn(<span class="hljs-string">&quot;ratings&quot;</span>).FieldData().GetScalars())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;tags IS NOT NULL&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;tags&#x27;</span>, <span class="hljs-string">&#x27;ratings&#x27;</span>, <span class="hljs-string">&#x27;embedding&#x27;</span>]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;filter&quot;: &quot;tags IS NOT NULL&quot;,
    &quot;outputFields&quot;: [&quot;tags&quot;, &quot;ratings&quot;, &quot;embedding&quot;]
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ratings</code> 의 첫 번째 요소 값이 4보다 큰 엔티티를 검색하려면 다음과 같이 하세요:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ratings[0] &gt; 4&#x27;</span>

res = client.query(
collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
output_fields=[<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment"># &quot;{&#x27;tags&#x27;: [&#x27;pop&#x27;, &#x27;rock&#x27;, &#x27;classic&#x27;], &#x27;ratings&#x27;: [5, 4, 3], &#x27;embedding&#x27;: [0.12, 0.34, 0.56], &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment"># &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [9, 5], &#x27;embedding&#x27;: [0.18, 0.11, 0.23], &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ratings[0] &gt; 4&quot;</span>

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
        .build());

System.out.println(resp.getQueryResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={ratings=[5, 4, 3], pk=1, tags=[pop, rock, classic]}), </span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={ratings=[9, 5], pk=3, tags=[]})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter = <span class="hljs-string">&quot;ratings[0] &gt; 4&quot;</span>
rs, err = client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithFilter(filter).
    WithOutputFields(<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(<span class="hljs-string">&quot;pk&quot;</span>, rs.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>))
fmt.Println(<span class="hljs-string">&quot;tags&quot;</span>, rs.GetColumn(<span class="hljs-string">&quot;tags&quot;</span>))
fmt.Println(<span class="hljs-string">&quot;ratings&quot;</span>, rs.GetColumn(<span class="hljs-string">&quot;ratings&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;ratings[0] &gt; 4&#x27;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>:<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">filter</span>:filter,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>]
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Example output:</span>
<span class="hljs-comment">// data: [</span>
<span class="hljs-comment">//     &quot;{&#x27;tags&#x27;: [&#x27;pop&#x27;, &#x27;rock&#x27;, &#x27;classic&#x27;], &#x27;ratings&#x27;: [5, 4, 3], &#x27;embedding&#x27;: [0.12, 0.34, 0.56], &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">//     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [9, 5], &#x27;embedding&#x27;: [0.18, 0.11, 0.23], &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;my_collection&quot;,
  &quot;filter&quot;: &quot;ratings[0] &gt; 4&quot;,
  &quot;outputFields&quot;: [&quot;tags&quot;, &quot;ratings&quot;, &quot;embedding&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Vector-search-with-filter-expressions" class="common-anchor-header">필터 표현식을 사용한 벡터 검색<button data-href="#Vector-search-with-filter-expressions" class="anchor-icon" translate="no">
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
    </button></h2><p>기본 스칼라 필드 필터링 외에도 벡터 유사도 검색을 스칼라 필드 필터와 결합할 수 있습니다. 예를 들어, 다음 코드는 벡터 검색에 스칼라 필드 필터를 추가하는 방법을 보여줍니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags[0] == &quot;pop&quot;&#x27;</span>

res = client.search(
collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
data=[[<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>]],
limit=<span class="hljs-number">5</span>,
search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
output_fields=[<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
<span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment"># &quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: -0.2479381263256073, &#x27;entity&#x27;: {&#x27;tags&#x27;: [&#x27;pop&#x27;, &#x27;rock&#x27;, &#x27;classic&#x27;], &#x27;ratings&#x27;: [5, 4, 3], &#x27;embedding&#x27;: [0.11999999731779099, 0.3400000035762787, 0.5600000023841858]}}]&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;tags[0] == \&quot;pop\&quot;&quot;</span>;
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embedding&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3f</span>, -<span class="hljs-number">0.6f</span>, <span class="hljs-number">0.1f</span>})))
        .topK(<span class="hljs-number">5</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>))
        .filter(filter)
        .build());

System.out.println(resp.getSearchResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={ratings=[5, 4, 3], embedding=[0.12, 0.34, 0.56], tags=[pop, rock, classic]}, score=-0.24793813, id=1)]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3</span>, <span class="hljs-number">-0.6</span>, <span class="hljs-number">0.1</span>}
filter = <span class="hljs-string">&quot;tags[0] == \&quot;pop\&quot;&quot;</span>

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;embedding&quot;</span>).
    WithFilter(filter).
    WithOutputFields(<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>).
    WithAnnParam(annParam))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;tags&quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;tags&quot;</span>).FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;ratings&quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;ratings&quot;</span>).FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;embedding&quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;embedding&quot;</span>).FieldData().GetVectors())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;tags&#x27;</span>, <span class="hljs-string">&#x27;ratings&#x27;</span>, <span class="hljs-string">&#x27;embdding&#x27;</span>],
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;tags[0] == &quot;pop&quot;&#x27;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        [0.3, -0.6, 0.1]
    ],
    &quot;annsField&quot;: &quot;embedding&quot;,
    &quot;limit&quot;: 5,
    &quot;filter&quot;: &quot;tags[0] == \&quot;pop\&quot;&quot;,
    &quot;outputFields&quot;: [&quot;tags&quot;, &quot;ratings&quot;, &quot;embedding&quot;]
}&#x27;</span>

<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;distance&quot;:-0.24793813,&quot;embedding&quot;:[0.12,0.34,0.56],&quot;id&quot;:1,&quot;ratings&quot;:{&quot;Data&quot;:{&quot;LongData&quot;:{&quot;data&quot;:[5,4,3]}}},&quot;tags&quot;:{&quot;Data&quot;:{&quot;StringData&quot;:{&quot;data&quot;:[&quot;pop&quot;,&quot;rock&quot;,&quot;classic&quot;]}}}}]}</span>
<button class="copy-code-btn"></button></code></pre>
<p>또한 Milvus는 <code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ALL</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, <code translate="no">ARRAY_LENGTH</code> 과 같은 고급 배열 필터링 연산자를 지원하여 쿼리 기능을 더욱 향상시킵니다. 자세한 내용은 <a href="/docs/ko/v2.5.x/array-operators.md">배열 연산자를</a> 참조하세요.</p>
