---
id: full-text-search.md
title: 전체 텍스트 검색
summary: >-
  전체 텍스트 검색은 텍스트 데이터 세트에서 특정 용어나 구문이 포함된 문서를 검색한 후, 관련성에 따라 결과의 순위를 매기는 기능입니다. 이
  기능은 정확한 용어를 놓칠 수 있는 의미 기반 검색의 한계를 극복하여, 가장 정확하고 문맥에 적합한 결과를 제공해 줍니다. 또한, 원시
  텍스트 입력을 허용하여 벡터 검색을 간소화하며, 사용자가 수동으로 벡터 임베딩을 생성할 필요 없이 텍스트 데이터를 스파스 임베딩으로 자동
  변환합니다.
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
    </button></h1><p>전체 텍스트 검색은 텍스트 데이터 세트에서 특정 용어나 구문이 포함된 문서를 검색한 후, 관련성에 따라 결과의 순위를 매기는 기능입니다. 이 기능은 정확한 용어를 간과할 수 있는 의미 기반 검색의 한계를 극복하여, 가장 정확하고 문맥에 적합한 결과를 제공합니다. 또한, 원시 텍스트 입력을 허용하여 벡터 검색을 간소화하며, 사용자가 수동으로 벡터 임베딩을 생성할 필요 없이 텍스트 데이터를 스파스 임베딩으로 자동 변환합니다.</p>
<p>관련성 점수 산정을 위해 BM25 알고리즘을 사용하는 이 기능은, 특정 검색어와 밀접하게 일치하는 문서를 우선적으로 선정하는 검색 강화 생성(RAG) 시나리오에서 특히 유용합니다.</p>
<div class="alert note">
<p>전체 텍스트 검색과 의미 기반 고밀도 벡터 검색을 통합함으로써 검색 결과의 정확성과 관련성을 높일 수 있습니다. 자세한 내용은 <a href="/docs/ko/multi-vector-search.md">하이브리드 검색을</a> 참조하십시오.</p>
</div>
<h2 id="BM25-implementation" class="common-anchor-header">BM25 구현<button data-href="#BM25-implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 정보 검색 시스템에서 널리 채택된 점수 산정 함수인 BM25 관련성 알고리즘을 기반으로 한 전체 텍스트 검색 기능을 제공하며, 이를 검색 워크플로우에 통합하여 정확하고 관련성 순위가 매겨진 텍스트 결과를 제공합니다.</p>
<p>Milvus의 전체 텍스트 검색은 다음 워크플로를 따릅니다:</p>
<ol>
<li><p><strong>원본 텍스트 입력</strong>: 임베딩 모델 없이도 텍스트 문서를 삽입하거나 일반 텍스트로 쿼리를 입력할 수 있습니다.</p></li>
<li><p><strong>텍스트 분석</strong>: Milvus는 <a href="/docs/ko/analyzer-overview.md">분석기를</a> 사용하여 텍스트를 색인화 및 검색이 가능한 의미 있는 용어로 처리합니다.</p></li>
<li><p><strong>BM25 함수 처리</strong>: 내장된 함수가 이러한 용어를 BM25 점수 산정에 최적화된 스파스 벡터 표현으로 변환합니다.</p></li>
<li><p><strong>컬렉션 저장</strong>: Milvus는 빠른 검색 및 순위 지정을 위해 결과로 생성된 스파스 임베딩을 컬렉션에 저장합니다.</p></li>
<li><p><strong>BM25 관련성 점수 산정</strong>: 검색 시, Milvus는 BM25 점수 산정 함수를 적용하여 문서의 관련성을 계산하고, 쿼리 용어와 가장 잘 일치하는 결과를 순위별로 반환합니다.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/full-text-search.png" alt="Full Text Search" class="doc-image" id="full-text-search" /> 
   <span>전체 텍스트 검색</span>
  
 </span></p>
<p>전체 텍스트 검색을 사용하려면 다음 주요 단계를 따르십시오:</p>
<ol>
<li><p><a href="/docs/ko/full-text-search.md#Create-a-collection-for-BM25-full-text-search">컬렉션 생성</a>: 필수 필드를 설정하고, 원본 텍스트를 스파스 임베딩으로 변환하는 BM25 함수를 정의합니다.</p></li>
<li><p><a href="/docs/ko/full-text-search.md#Insert-text-data">데이터 삽입</a>: 원본 텍스트 문서를 컬렉션에 수집합니다.</p></li>
<li><p><a href="/docs/ko/full-text-search.md#Perform-full-text-search">검색 수행</a>: 자연어 쿼리 텍스트를 사용하여 BM25 관련도에 기반한 순위가 매겨진 결과를 검색합니다.</p></li>
</ol>
<h2 id="Create-a-collection-for-BM25-full-text-search" class="common-anchor-header">BM25 전체 텍스트 검색용 컬렉션 생성<button data-href="#Create-a-collection-for-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25 기반 전체 텍스트 검색을 활성화하려면, 필수 필드가 포함된 컬렉션을 준비하고, 스파스 벡터를 생성하는 BM25 함수를 정의하며, 인덱스를 구성한 다음 컬렉션을 생성해야 합니다.</p>
<h3 id="Define-schema-fields" class="common-anchor-header">스키마 필드 정의<button data-href="#Define-schema-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>컬렉션 스키마에는 최소한 다음 세 가지 필수 필드가 포함되어야 합니다.</p>
<ul>
<li><p><strong>기본 필드</strong>: 컬렉션 내 각 엔티티를 고유하게 식별합니다.</p></li>
<li><p><strong>문자열 필드</strong> (<code translate="no">VARCHAR</code> 또는 <code translate="no">TEXT</code>): 원본 텍스트 문서를 저장합니다. Milvus가 BM25 관련성 순위를 위해 텍스트를 처리할 수 있도록 <code translate="no">enable_analyzer=True</code> 를 설정해야 합니다. 기본적으로 Milvus는 <a href="/docs/ko/standard-analyzer.md"><code translate="no">standard</code></a><a href="/docs/ko/standard-analyzer.md"> analyzer를</a> 사용합니다. 다른 분석기를 구성하려면 <a href="/docs/ko/analyzer-overview.md">‘분석기 개요’를</a> 참조하십시오. 이 페이지의 예제에서는 <code translate="no">VARCHAR</code> 를 사용합니다. 긴 텍스트의 경우 입력 필드를 <code translate="no">TEXT</code> 로 정의하고 <code translate="no">max_length</code> 를 생략할 수 있습니다. 전체 예제는 <a href="/docs/ko/text.md">‘텍스트 필드’를</a> 참조하십시오.</p></li>
<li><p><strong>스파스 벡터 필드</strong> (<code translate="no">SPARSE_FLOAT_VECTOR</code>): BM25 함수에 의해 자동 생성된 스파스 임베딩을 저장합니다.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

schema = client.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Primary field</span>
<span class="highlighted-comment-line">schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Text field</span></span>
<span class="highlighted-comment-line">schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR) <span class="hljs-comment"># Sparse vector field; no dim required for sparse vectors</span></span>
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
<p>앞서 제시된 구성에서,</p>
<ul>
<li><p><code translate="no">id</code>:는 기본 키 역할을 하며 <code translate="no">auto_id=True</code> 를 사용하여 자동으로 생성됩니다.</p></li>
<li><p><code translate="no">text</code>: 전체 텍스트 검색 작업을 위해 원시 텍스트 데이터를 저장합니다. 이 필드는 분량이 제한된 텍스트의 경우 <code translate="no">VARCHAR</code> 를, 긴 원본 콘텐츠의 경우 <code translate="no">TEXT</code> 를 사용할 수 있습니다.</p></li>
<li><p><code translate="no">sparse</code>: 전체 텍스트 검색 작업을 위해 내부적으로 생성된 스파스 임베딩을 저장하기 위해 예약된 벡터 필드입니다. 데이터 유형은 반드시 <code translate="no">SPARSE_FLOAT_VECTOR</code> 이어야 합니다.</p></li>
</ul>
<h3 id="Define-the-BM25-function" class="common-anchor-header">BM25 함수 정의<button data-href="#Define-the-BM25-function" class="anchor-icon" translate="no">
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
    </button></h3><p>BM25 함수는 토큰화된 텍스트를 BM25 스코어링을 지원하는 스파스 벡터로 변환합니다.</p>
<p>함수를 정의하고 스키마에 추가하세요:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR or TEXT field containing raw text data</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings</span>
<span class="highlighted-wrapper-line">    function_type=FunctionType.BM25, <span class="hljs-comment"># Set to `BM25`</span></span>
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
     <th><p>매개변수</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>함수의 이름입니다. 이 함수는 ` <code translate="no">text</code> ` 필드의 원시 텍스트를 BM25와 호환되는 스파스 벡터로 변환하며, 변환된 벡터는 ` <code translate="no">sparse</code> ` 필드에 저장됩니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>텍스트를 스파스 벡터로 변환해야 하는 ` <code translate="no">VARCHAR</code> ` 또는 ` <code translate="no">TEXT</code> ` 필드의 이름입니다. ` <code translate="no">FunctionType.BM25</code>`의 경우, 이 매개변수는 하나의 필드 이름만 허용합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>내부에서 생성된 스파스 벡터가 저장될 필드의 이름입니다. ` <code translate="no">FunctionType.BM25</code>`의 경우, 이 매개변수는 하나의 필드 이름만 허용합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>사용할 함수의 유형입니다. 반드시 <code translate="no">FunctionType.BM25</code> 이어야 합니다.</p></td>
   </tr>
</table>
<div class="alert note">
<p>여러 텍스트 필드에 BM25 처리가 필요한 경우, <strong>필드당 하나의 BM25 함수를</strong> 정의하고, 각 함수마다 고유한 이름과 출력 필드를 지정해야 합니다.</p>
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
    </button></h3><p>필요한 필드와 내장 함수를 사용하여 스키마를 정의한 후, 컬렉션에 대한 인덱스를 설정하십시오.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
     <th><p>매개변수</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>인덱싱할 벡터 필드의 이름입니다. 전체 텍스트 검색의 경우, 생성된 스파스 벡터가 저장된 필드여야 합니다. 이 예제에서는 값을 ` <code translate="no">sparse</code>`로 설정합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>생성할 인덱스의 유형입니다. Milvus에서 BM25 전체 텍스트 검색을 수행하려면 이 값을 <code translate="no">SPARSE_INVERTED_INDEX</code> 로 설정하십시오. 자세한 내용은 <a href="/docs/ko/sparse-inverted-index.md">SPARSE_INVERTED_INDEX를</a> 참조하십시오.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">metric_type</code></p></td>
     <td><p>이 매개변수의 값은 특히 전체 텍스트 검색 기능을 위해 반드시 <code translate="no">BM25</code> 로 설정해야 합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>인덱스에 특화된 추가 매개변수들의 사전입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.inverted_index_algo</code></p></td>
     <td><p>BM25 스파스 인버티드 인덱스를 구축하고 쿼리하는 데 사용되는 알고리즘입니다. 유효한 값:</p><ul><li><p><code translate="no">"DAAT_MAXSCORE"</code> (기본값): Document-at-a-Time MaxScore 쿼리 처리. 이 옵션은 <em>k</em> 값이 높거나 검색어가 많은 쿼리가 포함된 전체 텍스트 검색 워크로드에 적합합니다. 배경 정보는 <a href="https://dl.acm.org/doi/10.1016/0306-4573%2895%2900020-H">‘쿼리 평가: 전략 및 최적화’를</a> 참조하십시오.</p></li><li><p><code translate="no">"DAAT_WAND"</code>: Document-at-a-Time WAND 쿼리 처리. 이 옵션은 <em>k</em> 값이 작거나 쿼리가 짧은 전체 텍스트 검색 워크로드에 적합합니다. 자세한 내용은 <a href="https://dl.acm.org/doi/10.1145/956863.956944">‘2단계 검색 프로세스를 사용한 효율적인 쿼리 평가’를</a> 참조하십시오.</p></li><li><p><code translate="no">"TAAT_NAIVE"</code>: 기본 Term-at-a-Time 쿼리 처리. 이 옵션은 기준선으로 사용하거나, 평균 문서 길이 등 전체 컬렉션 통계에 따라 점수가 동적으로 조정되어야 할 때 사용합니다.</p></li><li><p><code translate="no">"BLOCK_MAX_MAXSCORE"</code>: 블록 수준 최대 점수 메타데이터를 사용하는 MaxScore 쿼리 처리. 배경 정보는 <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">‘블록-맥스 인덱스를 사용한 더 빠른 상위 k개 문서 검색’을</a> 참조하십시오.</p></li><li><p><code translate="no">"BLOCK_MAX_WAND"</code>: 블록 수준 최대 점수 메타데이터를 사용하는 WAND 쿼리 처리. 배경 정보는 <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">‘블록-맥스 인덱스를 사용한 더 빠른 상위 k개 문서 검색’을</a> 참조하십시오.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.bm25_k1</code></p></td>
     <td><p>용어 빈도 포화도를 제어합니다. 값이 높을수록 문서 순위 결정 시 용어 빈도의 중요도가 증가합니다. 권장 범위: [1.2, 2.0]. 기본값: 1.2.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.bm25_b</code></p></td>
     <td><p>문서 길이의 정규화 정도를 제어합니다. 일반적으로 0에서 1 사이의 값이 사용되며, 기본값은 0.75입니다. 값이 0이면 길이 정규화가 적용되지 않으며, 값이 1이면 완전한 길이 정규화가 적용됩니다.</p></td>
   </tr>
</table>
<h3 id="Create-the-collection" class="common-anchor-header">컬렉션 생성<button data-href="#Create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>이제 정의된 스키마 및 인덱스 매개변수를 사용하여 컬렉션을 생성합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
    </button></h2><p>컬렉션과 인덱스를 설정한 후에는 텍스트 데이터를 삽입할 준비가 된 것입니다. 이 과정에서 원본 텍스트만 제공하면 됩니다. 앞서 정의한 내장 함수가 각 텍스트 항목에 대해 해당 스파스 벡터를 자동으로 생성합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
    </button></h2><p>컬렉션에 데이터를 삽입한 후에는 원본 텍스트 쿼리를 사용하여 전체 텍스트 검색을 수행할 수 있습니다. Milvus는 쿼리를 자동으로 스파스 벡터로 변환하고, BM25 알고리즘을 사용하여 일치하는 검색 결과를 순위 지정한 후, 상위 K개(<code translate="no">limit</code>) 결과를 반환합니다.</p>
<div class="alert note">
<p>텍스트 하이라이터를 구성하여 검색 결과에서 일치하는 용어를 강조 표시할 수 있습니다. 자세한 내용은 <a href="/docs/ko/text-highlighter.md">텍스트 하이라이터를</a> 참조하십시오.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>, 
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&#x27;whats the focus of information retrieval?&#x27;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&#x27;text&#x27;</span>], <span class="hljs-comment"># Fields to return in search results; sparse field cannot be output</span></span>
    limit=<span class="hljs-number">3</span>,
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();

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
        &quot;params&quot;:{}
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>매개변수</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_params</code></p></td>
     <td><p>검색 매개변수가 포함된 사전입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.drop_ratio_search</code></p></td>
     <td><p>검색 시 무시할 중요도가 낮은 용어의 비율입니다. 값은 [0.0, 1.0) 범위 내에 있어야 합니다. 자세한 내용은 <a href="/docs/ko/sparse_vector.md">‘스파스 벡터’를</a> 참조하십시오.</p></td>
   </tr>
   <tr>
     <td></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">data</code></p></td>
     <td><p>자연어로 작성된 원본 쿼리 텍스트입니다. Milvus는 BM25 함수를 사용하여 텍스트 쿼리를 스파스 벡터로 자동 변환하므로, 미리 계산된 벡터를 제공하지 마십시오.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">anns_field</code></p></td>
     <td><p>내부에서 생성된 스파스 벡터가 포함된 필드의 이름입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_fields</code></p></td>
     <td><p>검색 결과에 반환할 필드 이름 목록입니다. BM25로 생성된 임베딩이 포함된 <strong>스파스 벡터 필드를 제외한</strong> 모든 필드를 지원합니다. 일반적인 출력 필드로는 기본 키 필드(예: <code translate="no">id</code>)와 원본 텍스트 필드(예: <code translate="no">text</code>)가 있습니다. 자세한 내용은 <a href="/docs/ko/full-text-search.md#Can-I-output-or-access-the-sparse-vectors-generated-by-the-BM25-function-in-full-text-search">FAQ를</a> 참조하십시오.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">limit</code></p></td>
     <td><p>반환할 상위 일치 항목의 최대 개수입니다.</p></td>
   </tr>
</table>
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
    </button></h2><h3 id="Can-I-output-or-access-the-sparse-vectors-generated-by-the-BM25-function-in-full-text-search" class="common-anchor-header">전체 텍스트 검색에서 BM25 함수가 생성한 스파스 벡터를 출력하거나 액세스할 수 있나요?<button data-href="#Can-I-output-or-access-the-sparse-vectors-generated-by-the-BM25-function-in-full-text-search" class="anchor-icon" translate="no">
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
    </button></h3><p>아니요, BM25 함수에 의해 생성된 스파스 벡터는 전체 텍스트 검색에서 직접 액세스하거나 출력할 수 없습니다. 자세한 내용은 다음과 같습니다.</p>
<ul>
<li><p>BM25 함수는 순위 지정 및 검색을 위해 내부적으로 스파스 벡터를 생성합니다.</p></li>
<li><p>이러한 벡터는 스파스 필드에 저장되지만 다음 항목에 포함될 수는 없습니다. <code translate="no">output_fields</code></p></li>
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
<h3 id="Why-do-I-need-to-define-a-sparse-vector-field-if-I-cant-access-it" class="common-anchor-header">접근할 수 없다면 왜 스파스 벡터 필드를 정의해야 합니까?<button data-href="#Why-do-I-need-to-define-a-sparse-vector-field-if-I-cant-access-it" class="anchor-icon" translate="no">
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
    </button></h3><p>스파스 벡터 필드는 사용자가 직접 상호작용하지 않는 데이터베이스 인덱스와 유사하게 내부 검색 인덱스 역할을 합니다.</p>
<p><strong>설계 근거</strong>:</p>
<ul>
<li><p>관심사의 분리: 사용자는 텍스트(입력/출력)를 다루고, Milvus는 벡터(내부 처리)를 처리합니다.</p></li>
<li><p>성능: 미리 계산된 스파스 벡터를 통해 쿼리 시 빠른 BM25 순위 산출이 가능합니다</p></li>
<li><p>사용자 경험: 간단한 텍스트 인터페이스 뒤에 복잡한 벡터 연산을 추상화합니다</p></li>
</ul>
<p><strong>벡터에 직접 접근해야 하는 경우</strong>:</p>
<ul>
<li><p>전체 텍스트 검색 대신 수동 스파스 벡터 연산을 사용하십시오</p></li>
<li><p>사용자 정의 스파스 벡터 워크플로우를 위해 별도의 컬렉션을 생성하십시오</p></li>
</ul>
<p>자세한 내용은 <a href="/docs/ko/sparse_vector.md">‘스파스 벡터</a>’를 참조하십시오.</p>
