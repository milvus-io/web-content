---
id: full-text-search.md
title: 전체 텍스트 검색
summary: >-
  전체 텍스트 검색은 텍스트 데이터 세트에서 특정 용어나 구문이 포함된 문서를 검색한 다음 관련성에 따라 결과의 순위를 매기는 기능입니다. 이
  기능은 정확한 용어를 놓칠 수 있는 시맨틱 검색의 한계를 극복하여 가장 정확하고 문맥과 연관성이 높은 결과를 얻을 수 있도록 해줍니다.
  또한, 원시 텍스트 입력을 받아 벡터 임베딩을 수동으로 생성할 필요 없이 텍스트 데이터를 스파스 임베딩으로 자동 변환함으로써 벡터 검색을
  간소화합니다.
---
<h1 id="Full-Text-Search" class="common-anchor-header">전체 텍스트 검색<button data-href="#Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>전체 텍스트 검색은 텍스트 데이터 세트에서 특정 용어나 구문이 포함된 문서를 검색한 다음 관련성에 따라 결과의 순위를 매기는 기능입니다. 이 기능은 정확한 용어를 놓칠 수 있는 시맨틱 검색의 한계를 극복하여 가장 정확하고 문맥과 연관성이 높은 결과를 얻을 수 있도록 해줍니다. 또한, 원시 텍스트 입력을 받아 벡터 임베딩을 수동으로 생성할 필요 없이 텍스트 데이터를 스파스 임베딩으로 자동 변환함으로써 벡터 검색을 간소화합니다.</p>
<p>관련성 점수에 BM25 알고리즘을 사용하는 이 기능은 특정 검색어와 가장 근접하게 일치하는 문서의 우선순위를 정하는 검색 증강 생성(RAG) 시나리오에서 특히 유용합니다.</p>
<div class="alert note">
<p>전체 텍스트 검색과 시맨틱 기반의 고밀도 벡터 검색을 통합하면 검색 결과의 정확도와 관련성을 높일 수 있습니다. 자세한 내용은 <a href="/docs/ko/multi-vector-search.md">하이브리드 검색을</a> 참조하세요.</p>
</div>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>전체 텍스트 검색은 수동 임베딩의 필요성을 제거하여 텍스트 기반 검색 프로세스를 간소화합니다. 이 기능은 다음 워크플로우를 통해 작동합니다:</p>
<ol>
<li><p><strong>텍스트 입력</strong>: 원시 텍스트 문서를 삽입하거나 수동으로 임베드할 필요 없이 쿼리 텍스트를 제공합니다.</p></li>
<li><p><strong>텍스트 분석</strong>: Milvus는 <a href="/docs/ko/analyzer-overview.md">분석기를</a> 사용하여 입력 텍스트를 검색 가능한 개별 용어로 토큰화합니다.</p></li>
<li><p><strong>함수 처리</strong>: 내장된 함수는 토큰화된 용어를 수신하여 희소 벡터 표현으로 변환합니다.</p></li>
<li><p><strong>컬렉션 저장소</strong>: Milvus는 효율적인 검색을 위해 이러한 희소 임베딩을 컬렉션에 저장합니다.</p></li>
<li><p><strong>BM25 점수</strong>: 검색 중에 Milvus는 BM25 알고리즘을 적용하여 저장된 문서에 대한 점수를 계산하고 쿼리 텍스트와의 관련성에 따라 일치하는 결과의 순위를 매깁니다.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/full-text-search.png" alt="Full Text Search" class="doc-image" id="full-text-search" />
   </span> <span class="img-wrapper"> <span>전체 텍스트 검색</span> </span></p>
<p>전체 텍스트 검색을 사용하려면 다음 주요 단계를 따르세요:</p>
<ol>
<li><p><a href="/docs/ko/full-text-search.md#Create-a-collection-for-full-text-search">컬렉션을 만듭니다</a>: 필요한 필드로 컬렉션을 설정하고 원시 텍스트를 스파스 임베딩으로 변환하는 함수를 정의합니다.</p></li>
<li><p><a href="/docs/ko/full-text-search.md#Insert-text-data">데이터 삽입</a>: 원시 텍스트 문서를 컬렉션에 수집합니다.</p></li>
<li><p><a href="/docs/ko/full-text-search.md#Perform-full-text-search">검색 수행하기</a>: 쿼리 텍스트를 사용하여 컬렉션을 검색하고 관련 결과를 검색합니다.</p></li>
</ol>
<h2 id="Create-a-collection-for-full-text-search" class="common-anchor-header">전체 텍스트 검색을 위한 컬렉션 만들기<button data-href="#Create-a-collection-for-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>전체 텍스트 검색을 사용하려면 특정 스키마로 컬렉션을 만드세요. 이 스키마에는 세 가지 필수 필드가 포함되어야 합니다:</p>
<ul>
<li><p>컬렉션의 각 엔터티를 고유하게 식별하는 기본 필드.</p></li>
<li><p><code translate="no">enable_analyzer</code> 속성이 <code translate="no">True</code> 로 설정된 원시 텍스트 문서를 저장하는 <code translate="no">VARCHAR</code> 필드. 이를 통해 Milvus는 함수 처리를 위해 텍스트를 특정 용어로 토큰화할 수 있습니다.</p></li>
<li><p><code translate="no">VARCHAR</code> 필드에 대해 Milvus가 자동으로 생성하는 스파스 임베딩을 저장하기 위해 예약된 <code translate="no">SPARSE_FLOAT_VECTOR</code> 필드.</p></li>
</ul>
<h3 id="Define-the-collection-schema" class="common-anchor-header">컬렉션 스키마 정의하기<button data-href="#Define-the-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>먼저 스키마를 생성하고 필요한 필드를 추가합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

schema = client.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
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
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">1000</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,
  },
];

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는</p>
<ul>
<li><p><code translate="no">id</code>은 기본 키로 사용되며 <code translate="no">auto_id=True</code> 으로 자동 생성됩니다.</p></li>
<li><p><code translate="no">text</code>는 전체 텍스트 검색 작업을 위한 원시 텍스트 데이터를 저장합니다. 데이터 유형은 <code translate="no">VARCHAR</code> 이 텍스트 저장을 위한 Milvus 문자열 데이터 유형이므로 <code translate="no">VARCHAR</code> 여야 합니다. <code translate="no">enable_analyzer=True</code> 을 설정하면 Milvus가 텍스트를 토큰화할 수 있습니다. 기본적으로 Milvus는 텍스트 분석을 위해 <a href="/docs/ko/standard-analyzer.md"><code translate="no">standard</code></a><a href="/docs/ko/standard-analyzer.md"> 분석기를</a> 사용합니다. 다른 분석기를 구성하려면 <a href="/docs/ko/analyzer-overview.md">분석기 개요를</a> 참조하세요.</p></li>
<li><p><code translate="no">sparse</code>전체 텍스트 검색 작업을 위해 내부적으로 생성된 스파스 임베딩을 저장하기 위해 예약된 벡터 필드입니다. 데이터 유형은 <code translate="no">SPARSE_FLOAT_VECTOR</code> 여야 합니다.</p></li>
</ul>
<p>이제 텍스트를 스파스 벡터 표현으로 변환하는 함수를 정의한 다음 스키마에 추가합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text data</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings</span>
    function_type=FunctionType.BM25, <span class="hljs-comment"># Set to `BM25`</span>
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;sparse&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;text_bm25_emb&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&#x27;sparse&#x27;</span>],
      <span class="hljs-attr">params</span>: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            }
        ],
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;text_bm25_emb&quot;,
                &quot;type&quot;: &quot;BM25&quot;,
                &quot;inputFieldNames&quot;: [&quot;text&quot;],
                &quot;outputFieldNames&quot;: [&quot;sparse&quot;],
                &quot;params&quot;: {}
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>함수의 이름입니다. 이 함수는 <code translate="no">text</code> 필드의 원시 텍스트를 검색 가능한 벡터로 변환하여 <code translate="no">sparse</code> 필드에 저장합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>텍스트를 스파스-벡터로 변환해야 하는 <code translate="no">VARCHAR</code> 필드의 이름입니다. <code translate="no">FunctionType.BM25</code> 의 경우 이 매개변수는 하나의 필드 이름만 허용합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>내부적으로 생성된 스파스 벡터가 저장될 필드의 이름입니다. <code translate="no">FunctionType.BM25</code> 의 경우 이 매개변수는 하나의 필드 이름만 허용합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>사용할 함수의 유형입니다. 값을 <code translate="no">FunctionType.BM25</code> 으로 설정합니다.</p></td>
   </tr>
</table>
<div class="alert note">
<p>텍스트에서 스파스 벡터로 변환해야 하는 <code translate="no">VARCHAR</code> 필드가 여러 개 있는 컬렉션의 경우 컬렉션 스키마에 별도의 함수를 추가하여 각 함수에 고유한 이름과 <code translate="no">output_field_names</code> 값을 갖도록 합니다.</p>
</div>
<h3 id="Configure-the-index" class="common-anchor-header">인덱스 구성<button data-href="#Configure-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>필요한 필드와 기본 제공 함수로 스키마를 정의한 후에는 컬렉션의 색인을 설정하세요. 이 과정을 간소화하기 위해 <code translate="no">AUTOINDEX</code> 을 <code translate="no">index_type</code> 으로 사용하면 Milvus가 데이터 구조에 따라 가장 적합한 인덱스 유형을 선택하고 구성할 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,

    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>
    }

)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String,Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);
params.put(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-number">1.2</span>);
params.put(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-number">0.75</span>);

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.BM25)
        .extraParams(params)
        .build());    
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>,
    index.NewAutoIndex(entity.MetricType(entity.BM25)))
    .WithExtraParam(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>)
    .WithExtraParam(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-number">1.2</span>)
    .WithExtraParam(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-number">0.75</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>
    }
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;sparse&quot;,
            &quot;metricType&quot;: &quot;BM25&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;,
            &quot;params&quot;:{
               &quot;inverted_index_algo&quot;: &quot;DAAT_MAXSCORE&quot;,
               &quot;bm25_k1&quot;: 1.2,
               &quot;bm25_b&quot;: 0.75
            }
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>인덱싱할 벡터 필드의 이름입니다. 전체 텍스트 검색의 경우, 생성된 스파스 벡터를 저장하는 필드여야 합니다. 이 예에서는 값을 <code translate="no">sparse</code> 로 설정합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>생성할 인덱스의 유형. <code translate="no">AUTOINDEX</code> 을 입력하면 Milvus가 자동으로 인덱스 설정을 최적화합니다. 인덱스 설정을 보다 세밀하게 제어해야 하는 경우 Milvus에서 스파스 벡터에 사용할 수 있는 다양한 인덱스 유형 중에서 선택할 수 있습니다. 자세한 내용은 <a href="/docs/ko/index.md#Indexes-supported-in-Milvus">Milvus에서 지원되는 인덱스를</a> 참조하세요.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">metric_type</code></p></td>
     <td><p>특히 전체 텍스트 검색 기능을 사용하려면 이 매개변수의 값을 <code translate="no">BM25</code> 로 설정해야 합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>인덱스와 관련된 추가 매개변수 사전입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.inverted_index_algo</code></p></td>
     <td><p>인덱스 구축 및 쿼리에 사용되는 알고리즘입니다. 유효한 값입니다:</p><ul><li><p><code translate="no">"DAAT_MAXSCORE"</code> (기본값): MaxScore 알고리즘을 사용하여 DAAT(Document-at-a-Time) 쿼리 처리를 최적화합니다. MaxScore는 영향이 미미할 것 같은 용어와 문서를 건너뛰는 방식으로 높은 <em>k</em> 값이나 많은 용어가 포함된 쿼리에 대해 더 나은 성능을 제공합니다. 최대 영향력 점수를 기준으로 용어를 필수 및 비필수 그룹으로 분류하여 상위 k 결과에 기여할 수 있는 용어에 집중함으로써 이를 달성합니다.</p></li><li><p><code translate="no">"DAAT_WAND"</code>: WAND 알고리즘을 사용하여 최적화된 DAAT 쿼리 처리. WAND는 최대 영향력 점수를 활용하여 비경쟁 문서를 건너뛰기 때문에 히트 문서를 더 적게 평가하지만, 히트당 오버헤드가 더 높습니다. 따라서 건너뛰기가 더 용이한 작은 <em>k</em> 값의 쿼리나 짧은 쿼리에는 WAND가 더 효율적입니다.</p></li><li><p><code translate="no">"TAAT_NAIVE"</code>: 기본 TAAT(Term-at-a-Time) 쿼리 처리. <code translate="no">DAAT_MAXSCORE</code> 및 <code translate="no">DAAT_WAND</code> 에 비해 느리지만 <code translate="no">TAAT_NAIVE</code> 은 고유한 이점을 제공합니다. 전역 수집 매개변수(avgdl)의 변경에 관계없이 정적으로 유지되는 캐시된 최대 영향 점수를 사용하는 DAAT 알고리즘과 달리 <code translate="no">TAAT_NAIVE</code> 은 이러한 변경에 동적으로 적응합니다.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.bm25_k1</code></p></td>
     <td><p>용어 빈도 포화도를 제어합니다. 값이 높을수록 문서 순위에서 용어 빈도의 중요도가 높아집니다. 값 범위: [1.2, 2.0].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.bm25_b</code></p></td>
     <td><p>문서 길이가 정규화되는 정도를 제어합니다. 일반적으로 0에서 1 사이의 값이 사용되며, 일반적인 기본값은 0.75 정도입니다. 값이 1이면 길이 정규화를 하지 않고, 값이 0이면 전체 정규화를 의미합니다.</p></td>
   </tr>
</table>
<h3 id="Create-the-collection" class="common-anchor-header">컬렉션 만들기<button data-href="#Create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>이제 정의한 스키마 및 인덱스 매개변수를 사용하여 컬렉션을 생성합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">create_collection</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>, 
    <span class="hljs-attr">schema</span>: schema, 
    <span class="hljs-attr">index_params</span>: index_params,
    <span class="hljs-attr">functions</span>: functions
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-text-data" class="common-anchor-header">텍스트 데이터 삽입<button data-href="#Insert-text-data" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션과 인덱스를 설정했으면 텍스트 데이터를 삽입할 준비가 되었습니다. 이 과정에서는 원시 텍스트만 제공하면 됩니다. 앞서 정의한 내장 함수는 각 텍스트 항목에 해당하는 스파스 벡터를 자동으로 생성합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.insert(<span class="hljs-string">&#x27;my_collection&#x27;</span>, [
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval is a field of study.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval focuses on finding relevant information in large datasets.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;data mining and information retrieval overlap in research.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; rows = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;information retrieval is a field of study.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;information retrieval focuses on finding relevant information in large datasets.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;data mining and information retrieval overlap in research.\&quot;}&quot;</span>, JsonObject.class)
);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
<span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>, 
<span class="hljs-attr">data</span>: [
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval is a field of study.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval focuses on finding relevant information in large datasets.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;data mining and information retrieval overlap in research.&#x27;</span>},
]);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;text&quot;: &quot;information retrieval is a field of study.&quot;},
        {&quot;text&quot;: &quot;information retrieval focuses on finding relevant information in large datasets.&quot;},
        {&quot;text&quot;: &quot;data mining and information retrieval overlap in research.&quot;}       
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Perform-full-text-search" class="common-anchor-header">전체 텍스트 검색 수행<button data-href="#Perform-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션에 데이터를 삽입한 후에는 원시 텍스트 쿼리를 사용하여 전체 텍스트 검색을 수행할 수 있습니다. Milvus는 자동으로 쿼리를 스파스 벡터로 변환하고 BM25 알고리즘을 사용하여 일치하는 검색 결과의 순위를 매긴 다음 상위 K (<code translate="no">limit</code>) 결과를 반환합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&#x27;params&#x27;</span>: {<span class="hljs-string">&#x27;drop_ratio_search&#x27;</span>: <span class="hljs-number">0.2</span>},
}

client.search(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>, 
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&#x27;whats the focus of information retrieval?&#x27;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&#x27;text&#x27;</span>], <span class="hljs-comment"># Fields to return in search results; sparse field cannot be output</span></span>
    limit=<span class="hljs-number">3</span>,
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0.2</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;whats the focus of information retrieval?&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse&quot;</span>)
        .topK(<span class="hljs-number">3</span>)
        .searchParams(searchParams)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0.2</span>)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;whats the focus of information retrieval?&quot;</span>)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithAnnParam(annSearchParams).
    WithOutputFields(<span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;text: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;text&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>, 
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&#x27;whats the focus of information retrieval?&#x27;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&#x27;sparse&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">params</span>: {<span class="hljs-string">&#x27;drop_ratio_search&#x27;</span>: <span class="hljs-number">0.2</span>},
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        &quot;whats the focus of information retrieval?&quot;
    ],
    &quot;annsField&quot;: &quot;sparse&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [
        &quot;text&quot;
    ],
    &quot;searchParams&quot;:{
        &quot;params&quot;:{
            &quot;drop_ratio_search&quot;:0.2
        }
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_params</code></p></td>
     <td><p>검색 매개변수가 포함된 사전입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.drop_ratio_search</code></p></td>
     <td><p>검색 시 무시할 중요도가 낮은 용어의 비율입니다. 자세한 내용은 <a href="/docs/ko/sparse_vector.md">스파스 벡터를</a> 참조하세요.</p></td>
   </tr>
   <tr>
     <td></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">data</code></p></td>
     <td><p>자연어로 된 원시 쿼리 텍스트. Milvus는 BM25 함수를 사용하여 텍스트 쿼리를 자동으로 스파스 벡터로 변환하며, 미리 계산된 벡터를 제공하지 않습니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">anns_field</code></p></td>
     <td><p>내부적으로 생성된 스파스 벡터가 포함된 필드의 이름입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_fields</code></p></td>
     <td><p>검색 결과에 반환할 필드 이름의 목록입니다. BM25로 생성된 임베딩이 포함된 <strong>스파스 벡터 필드를 제외한</strong> 모든 필드를 지원합니다. 일반적인 출력 필드에는 기본 키 필드(예: <code translate="no">id</code>)와 원본 텍스트 필드(예: <code translate="no">text</code>)가 포함됩니다. 자세한 내용은 <a href="/docs/ko/full-text-search.md#Can-I-output-or-access-the-sparse-vectors-generated-by-the-BM25-function-in-full-text-search">FAQ를</a> 참조하세요.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">limit</code></p></td>
     <td><p>반환할 상위 일치 항목의 최대 개수입니다.</p></td>
   </tr>
</table>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-I-output-or-access-the-sparse-vectors-generated-by-the-BM25-function-in-full-text-search" class="common-anchor-header">전체 텍스트 검색에서 BM25 함수에 의해 생성된 스파스 벡터를 출력하거나 액세스할 수 있나요?<button data-href="#Can-I-output-or-access-the-sparse-vectors-generated-by-the-BM25-function-in-full-text-search" class="anchor-icon" translate="no">
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
    </button></h3><p>아니요, BM25 함수에 의해 생성된 스파스 벡터는 전체 텍스트 검색에서 직접 액세스하거나 출력할 수 없습니다. 자세한 내용은 다음과 같습니다:</p>
<ul>
<li><p>BM25 함수는 내부적으로 랭킹 및 검색을 위해 스파스 벡터를 생성합니다.</p></li>
<li><p>이러한 벡터는 스파스 필드에 저장되지만 다음에는 포함될 수 없습니다. <code translate="no">output_fields</code></p></li>
<li><p>원본 텍스트 필드와 메타데이터(예: <code translate="no">id</code>, <code translate="no">text</code>)만 출력할 수 있습니다.</p></li>
</ul>
<p>예시:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># ❌ This throws an error - you cannot output the sparse field</span>
client.search(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;query text&#x27;</span>],
    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,
<span class="highlighted-wrapper-line">    output_fields=[<span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;sparse&#x27;</span>]  <span class="hljs-comment"># &#x27;sparse&#x27; causes an error</span></span>
    limit=<span class="hljs-number">3</span>,
    search_params=search_params
)

<span class="hljs-comment"># ✅ This works - output text fields only</span>
client.search(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;query text&#x27;</span>],
    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,
<span class="highlighted-wrapper-line">    output_fields=[<span class="hljs-string">&#x27;text&#x27;</span>]</span>
    limit=<span class="hljs-number">3</span>,
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Why-do-I-need-to-define-a-sparse-vector-field-if-I-cant-access-it" class="common-anchor-header">액세스할 수 없는데 왜 스파스 벡터 필드를 정의해야 하나요?<button data-href="#Why-do-I-need-to-define-a-sparse-vector-field-if-I-cant-access-it" class="anchor-icon" translate="no">
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
    </button></h3><p>스파스 벡터 필드는 사용자가 직접 상호 작용하지 않는 데이터베이스 인덱스와 유사한 내부 검색 인덱스 역할을 합니다.</p>
<p><strong>설계 근거</strong>:</p>
<ul>
<li><p>관심사 분리: 사용자는 텍스트(입력/출력)로 작업하고, Milvus는 벡터(내부 처리)를 처리합니다.</p></li>
<li><p>성능: 사전 계산된 스파스 벡터를 통해 쿼리 중 빠른 BM25 순위 지정 가능</p></li>
<li><p>사용자 경험: 간단한 텍스트 인터페이스 뒤에 복잡한 벡터 연산을 추상화합니다.</p></li>
</ul>
<p><strong>벡터 액세스가 필요한 경우</strong>:</p>
<ul>
<li><p>전체 텍스트 검색 대신 수동 스파스 벡터 연산 사용</p></li>
<li><p>사용자 정의 스파스 벡터 워크플로우를 위한 별도의 컬렉션 생성</p></li>
</ul>
<p>자세한 내용은 <a href="/docs/ko/sparse_vector.md">스파스 벡터를</a> 참조하세요.</p>
