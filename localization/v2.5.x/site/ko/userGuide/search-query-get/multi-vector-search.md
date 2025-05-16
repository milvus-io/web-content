---
id: multi-vector-search.md
title: 하이브리드 검색
summary: >-
  하이브리드 검색은 여러 개의 ANN 검색을 동시에 수행하고, 이러한 ANN 검색에서 여러 결과 집합의 순위를 재조정하여 최종적으로 하나의
  결과 집합을 반환하는 검색 방법을 말합니다. 하이브리드 검색을 사용하면 검색 정확도를 높일 수 있습니다. Milvus는 여러 개의 벡터
  필드가 있는 컬렉션에서 하이브리드 검색을 수행할 수 있도록 지원합니다.
---
<h1 id="Hybrid-Search" class="common-anchor-header">하이브리드 검색<button data-href="#Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>하이브리드 검색은 여러 개의 ANN 검색을 동시에 수행하고, 이러한 ANN 검색에서 여러 결과 집합의 순위를 재조정하여 최종적으로 하나의 결과 집합을 반환하는 검색 방법을 말합니다. 하이브리드 검색을 사용하면 검색 정확도를 높일 수 있습니다. Milvus는 여러 개의 벡터 필드가 있는 컬렉션에서 하이브리드 검색을 수행할 수 있도록 지원합니다.</p>
<p>하이브리드 검색은 희소 밀도 벡터 검색과 다중 모드 검색을 포함한 시나리오에서 가장 일반적으로 사용됩니다. 이 가이드에서는 구체적인 예시를 통해 Milvus에서 하이브리드 검색을 수행하는 방법을 설명합니다.</p>
<h2 id="Scenarios" class="common-anchor-header">시나리오<button data-href="#Scenarios" class="anchor-icon" translate="no">
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
    </button></h2><p>하이브리드 검색은 다음 두 가지 시나리오에 적합합니다:</p>
<h3 id="Sparse-Dense-Vector-Search" class="common-anchor-header">희소 밀도 벡터 검색</h3><p>다양한 유형의 벡터는 서로 다른 정보를 나타낼 수 있으며, 다양한 임베딩 모델을 사용하면 데이터의 다양한 특징과 측면을 보다 포괄적으로 나타낼 수 있습니다. 예를 들어, 같은 문장에 대해 서로 다른 임베딩 모델을 사용하면 의미적 의미를 나타내는 고밀도 벡터와 문장의 단어 빈도를 나타내는 스파스 벡터를 생성할 수 있습니다.</p>
<ul>
<li><p><strong>스파스 벡터:</strong> 스파스 벡터는 벡터 차원이 높고 0이 아닌 값이 거의 없다는 특징이 있습니다. 이러한 구조는 기존의 정보 검색 애플리케이션에 특히 적합합니다. 대부분의 경우, 스파스 벡터에 사용되는 차원 수는 하나 이상의 언어에 걸쳐 서로 다른 토큰에 해당합니다. 각 차원에는 문서 내에서 해당 토큰의 상대적 중요성을 나타내는 값이 할당됩니다. 이 레이아웃은 키워드 매칭과 관련된 작업에 유리합니다.</p></li>
<li><p><strong>고밀도 벡터:</strong> 고밀도 벡터는 신경망에서 파생된 임베딩입니다. 정렬된 배열로 배열된 이 벡터는 입력 텍스트의 의미적 본질을 포착합니다. 고밀도 벡터는 텍스트 처리에만 국한되지 않고 컴퓨터 비전에서도 시각적 데이터의 의미를 표현하는 데 광범위하게 사용됩니다. 일반적으로 텍스트 임베딩 모델에 의해 생성되는 이러한 고밀도 벡터는 대부분 또는 모든 요소가 0이 아닌 것이 특징입니다. 따라서 고밀도 벡터는 정확한 키워드가 일치하지 않더라도 벡터 거리를 기반으로 가장 유사한 결과를 반환할 수 있기 때문에 시맨틱 검색 애플리케이션에 특히 효과적입니다. 이 기능을 사용하면 키워드 기반 접근 방식에서는 놓칠 수 있는 개념 간의 관계를 포착하여 보다 미묘하고 문맥을 인식하는 검색 결과를 얻을 수 있습니다.</p></li>
</ul>
<p>자세한 내용은 <a href="/docs/ko/sparse_vector.md">스파스 벡터</a> 및 <a href="/docs/ko/dense-vector.md">밀도 벡터를</a> 참조하세요.</p>
<h3 id="Multimodal-Search" class="common-anchor-header">멀티모달 검색</h3><p>멀티모달 검색은 이미지, 동영상, 오디오, 텍스트 등 여러 양식에 걸쳐 비정형 데이터의 유사성 검색을 말합니다. 예를 들어, 지문, 음성, 얼굴 특징 등 다양한 양식의 데이터를 사용하여 사람을 표현할 수 있습니다. 하이브리드 검색은 여러 검색을 동시에 지원합니다. 예를 들어 지문과 음성 지문이 비슷한 사람을 검색할 수 있습니다.</p>
<h2 id="Workflow" class="common-anchor-header">워크플로<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>하이브리드 검색을 수행하는 주요 워크플로는 다음과 같습니다:</p>
<ol>
<li><p><a href="https://zilliz.com/learn/explore-colbert-token-level-embedding-and-ranking-model-for-similarity-search#A-Quick-Recap-of-BERT">BERT</a> 및 <a href="https://zilliz.com/learn/NLP-essentials-understanding-transformers-in-AI">Transformers와</a> 같은 임베딩 모델을 통해 고밀도 벡터를 생성합니다.</p></li>
<li><p><a href="https://zilliz.com/learn/mastering-bm25-a-deep-dive-into-the-algorithm-and-application-in-milvus">BM25</a>, <a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#BGE-M3">BGE-M3</a>, <a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#SPLADE">SPLADE</a> 등과 같은 임베딩 모델을 통해 스파스 벡터를 생성합니다.</p></li>
<li><p>Milvus에서 컬렉션을 생성하고 고밀도 및 스파스 벡터 필드를 모두 포함하는 컬렉션 스키마를 정의합니다.</p></li>
<li><p>이전 단계에서 방금 생성한 컬렉션에 스파스-밀도 벡터를 삽입합니다.</p></li>
<li><p>하이브리드 검색을 수행합니다: 고밀도 벡터에 대한 ANN 검색은 가장 유사한 상위 K개의 결과 집합을 반환하고, 스파스 벡터에 대한 텍스트 일치도 상위 K개의 결과 집합을 반환합니다.</p></li>
<li><p>정규화: 정규화: 상위 K 결과의 두 세트의 점수를 정규화하여 점수를 [0,1] 사이의 범위로 변환합니다.</p></li>
<li><p>적절한 재순위 전략을 선택하여 두 개의 상위 K 결과 세트를 병합하고 재순위화하여 최종적으로 상위 K 결과 세트를 반환합니다.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/hybrid-search.png" alt="Hybrid Search" class="doc-image" id="hybrid-search" />
   </span> <span class="img-wrapper"> <span>하이브리드 검색</span> </span></p>
<h2 id="Examples" class="common-anchor-header">예제<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 구체적인 예시를 통해 희소밀도 벡터에 대해 하이브리드 검색을 수행하여 텍스트 검색의 정확도를 높이는 방법을 설명합니다.</p>
<h3 id="Create-a-collection-with-multiple-vector-fields" class="common-anchor-header">여러 개의 벡터 필드가 있는 컬렉션 만들기</h3><p>컬렉션을 만드는 과정은 컬렉션 스키마 정의, 인덱스 매개변수 구성, 컬렉션 생성의 세 부분으로 구성됩니다.</p>
<h4 id="Define-schema" class="common-anchor-header">스키마 정의</h4><p>이 예에서는 컬렉션 스키마 내에 여러 개의 벡터 필드를 정의해야 합니다. 현재 각 컬렉션은 기본적으로 최대 4개의 벡터 필드를 포함할 수 있습니다. 하지만 필요에 따라 컬렉션에 최대 10개의 벡터 필드를 포함하도록 <code translate="no">proxy.maxVectorFieldNum</code> 값을 수정할 수도 있습니다.</p>
<p>다음 예에서는 컬렉션 스키마를 정의하며, <code translate="no">dense</code> 및 <code translate="no">sparse</code> 은 두 개의 벡터 필드입니다:</p>
<ul>
<li><p><code translate="no">id</code>: 이 필드는 텍스트 ID를 저장하는 기본 키 역할을 합니다. 이 필드의 데이터 유형은 INT64입니다.</p></li>
<li><p><code translate="no">text</code>: 이 필드는 텍스트 콘텐츠를 저장하는 데 사용됩니다. 이 필드의 데이터 유형은 최대 길이가 1000자인 VARCHAR입니다.</p></li>
<li><p><code translate="no">dense</code>: 이 필드는 텍스트의 밀도 벡터를 저장하는 데 사용됩니다. 이 필드의 데이터 유형은 FLOAT_VECTOR이며 벡터 차원은 768입니다.</p></li>
<li><p><code translate="no">sparse</code>: 이 필드는 텍스트의 스파스 벡터를 저장하는 데 사용됩니다. 이 필드의 데이터 유형은 SPARSE_FLOAT_VECTOR입니다.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create a collection in customized setup mode</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient, DataType
)

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)
<span class="hljs-comment"># Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)
schema.add_field(field_name=<span class="hljs-string">&quot;dense&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;dense&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
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

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">true</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">1000</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;dense&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// Create a collection in customized setup mode</span>
<span class="hljs-comment">// Define fields</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SPARSE_FLOAT_VECTOR</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;dense&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: false,
        &quot;enabledDynamicField&quot;: true,
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
                    &quot;max_length&quot;: 1000
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            },
            {
                &quot;fieldName&quot;: &quot;dense&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>스파스 벡터 검색 시, 전체 텍스트 검색 기능을 활용하여 스파스 임베딩 벡터를 생성하는 프로세스를 간소화할 수 있습니다. 자세한 내용은 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색을</a> 참조하세요.</p>
<h4 id="Create-index" class="common-anchor-header">색인 생성</h4><p>수집 스키마를 정의한 후에는 벡터 인덱스와 유사성 메트릭을 설정해야 합니다. 이 예에서는 밀집 벡터 필드 <code translate="no">dense</code> 와 희소 벡터 필드 <code translate="no">sparse</code> 에 대해 <strong>AUTOINDEX</strong> 유형의 인덱스가 생성됩니다. 필요에 따라 다른 인덱스 유형을 사용할 수 있습니다. 지원되는 인덱스 유형에 대해 알아보려면 <a href="/docs/ko/index-vector-fields.md">사용 가능한 인덱스 유형을</a> 참조하세요.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add indexes</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_name=<span class="hljs-string">&quot;dense_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Index type for sparse vectors</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Currently, only IP (Inner Product) is supported for sparse vectors</span>
    params={<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># The ratio of small vector values to be dropped during indexing</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

Map&lt;String, Object&gt; denseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForDenseField</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;dense&quot;</span>)
        .indexName(<span class="hljs-string">&quot;dense_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build();

Map&lt;String, Object&gt; sparseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
sparseParams.put(<span class="hljs-string">&quot;drop_ratio_build&quot;</span>, <span class="hljs-number">0.2</span>);
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForSparseField</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .indexName(<span class="hljs-string">&quot;sparse_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .extraParams(sparseParams)
        .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForDenseField);
indexParams.add(indexParamForSparseField);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOption1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>,
    index.NewSparseInvertedIndex(entity.IP, <span class="hljs-number">0.2</span>))
indexOption2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;dense&quot;</span>,
    index.NewAutoIndex(index.MetricType(entity.IP)))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;dense&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>
},{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>
}]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;dense&quot;,
            &quot;metricType&quot;: &quot;IP&quot;,
            &quot;indexName&quot;: &quot;dense_index&quot;,
            &quot;indexType&quot;:&quot;AUTOINDEX&quot;
        },
        {
            &quot;fieldName&quot;: &quot;sparse&quot;,
            &quot;metricType&quot;: &quot;IP&quot;,
            &quot;indexName&quot;: &quot;sparse_index&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-collection" class="common-anchor-header">컬렉션 만들기</h4><p>앞의 두 단계에서 구성한 컬렉션 스키마와 인덱스를 사용하여 <code translate="no">demo</code> 이라는 이름의 컬렉션을 만듭니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption1, indexOption2))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">index_params</span>: index_params,
})
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
<h3 id="Insert-data" class="common-anchor-header">데이터 삽입</h3><p>희소 밀도 벡터를 <code translate="no">demo</code> 컬렉션에 삽입합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

data=[
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>:{<span class="hljs-number">9637</span>: <span class="hljs-number">0.30856525997853057</span>, <span class="hljs-number">4399</span>: <span class="hljs-number">0.19771651149001523</span>, ...}, <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>:{<span class="hljs-number">6959</span>: <span class="hljs-number">0.31025067641541815</span>, <span class="hljs-number">1729</span>: <span class="hljs-number">0.8265339135915016</span>, ...}, <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, ...]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>:{<span class="hljs-number">1220</span>: <span class="hljs-number">0.15303302147479103</span>, <span class="hljs-number">7335</span>: <span class="hljs-number">0.9436728846033107</span>, ...}, <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, ...]}]

res = client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);
row1.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>);
row1.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense1));
row1.add(<span class="hljs-string">&quot;sparse&quot;</span>, gson.toJsonTree(sparse1));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);
row2.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>);
row2.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense2));
row2.add(<span class="hljs-string">&quot;sparse&quot;</span>, gson.toJsonTree(sparse2));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>);
row3.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>);
row3.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense3));
row3.add(<span class="hljs-string">&quot;sparse&quot;</span>, gson.toJsonTree(sparse3));

List&lt;JsonObject&gt; data = Arrays.asList(row1, row2, row3);
<span class="hljs-type">InsertReq</span> <span class="hljs-variable">insertReq</span> <span class="hljs-operator">=</span> InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(insertReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">v := <span class="hljs-built_in">make</span>([]entity.SparseEmbedding, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>)
sparseVector1, _ := entity.NewSliceSparseEmbedding([]<span class="hljs-type">uint32</span>{<span class="hljs-number">9637</span>, <span class="hljs-number">4399</span>, <span class="hljs-number">3573</span>}, []<span class="hljs-type">float32</span>{<span class="hljs-number">0.30856525997853057</span>, <span class="hljs-number">0.19771651149001523</span>, <span class="hljs-number">0.1576378135</span>})
v = <span class="hljs-built_in">append</span>(v, sparseVector1)
sparseVector2, _ := entity.NewSliceSparseEmbedding([]<span class="hljs-type">uint32</span>{<span class="hljs-number">6959</span>, <span class="hljs-number">1729</span>, <span class="hljs-number">5263</span>}, []<span class="hljs-type">float32</span>{<span class="hljs-number">0.31025067641541815</span>, <span class="hljs-number">0.8265339135915016</span>, <span class="hljs-number">0.68647322132</span>})
v = <span class="hljs-built_in">append</span>(v, sparseVector2)
sparseVector3, _ := entity.NewSliceSparseEmbedding([]<span class="hljs-type">uint32</span>{<span class="hljs-number">1220</span>, <span class="hljs-number">7335</span>}, []<span class="hljs-type">float32</span>{<span class="hljs-number">0.15303302147479103</span>, <span class="hljs-number">0.9436728846033107</span>})
v = <span class="hljs-built_in">append</span>(v, sparseVector3)
sparseColumn := column.NewColumnSparseVectors(<span class="hljs-string">&quot;sparse&quot;</span>, v)

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>}).
    WithVarcharColumn(<span class="hljs-string">&quot;text&quot;</span>, []<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
        <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
        <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
    }).
    WithFloatVectorColumn(<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>},
        {<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>},
        {<span class="hljs-number">0.43742130801983836</span>, <span class="hljs-number">-0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>},
    }).
    WithColumns(sparseColumn))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">var</span> data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>, <span class="hljs-attr">sparse</span>:[<span class="hljs-number">9637</span>: <span class="hljs-number">0.30856525997853057</span>, <span class="hljs-number">4399</span>: <span class="hljs-number">0.19771651149001523</span>, ...] , <span class="hljs-attr">dense</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>, <span class="hljs-attr">sparse</span>:[<span class="hljs-number">6959</span>: <span class="hljs-number">0.31025067641541815</span>, <span class="hljs-number">1729</span>: <span class="hljs-number">0.8265339135915016</span>, ...] , <span class="hljs-attr">dense</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>]},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span> , <span class="hljs-attr">sparse</span>:[<span class="hljs-number">1220</span>: <span class="hljs-number">0.15303302147479103</span>, <span class="hljs-number">7335</span>: <span class="hljs-number">0.9436728846033107</span>, ...] , <span class="hljs-attr">dense</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>]}       
]

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data,
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 0, &quot;text&quot;: &quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;, &quot;sparse&quot;:{&quot;9637&quot;: 0.30856525997853057, &quot;4399&quot;: 0.19771651149001523}, &quot;dense&quot;: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, ...]},
        {&quot;id&quot;: 1, &quot;text&quot;: &quot;Alan Turing was the first person to conduct substantial research in AI.&quot;, &quot;sparse&quot;:{&quot;6959&quot;: 0.31025067641541815, &quot;1729&quot;: 0.8265339135915016}, &quot;dense&quot;: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, ...]},
        {&quot;id&quot;: 2, &quot;text&quot;: &quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;, &quot;sparse&quot;:{&quot;1220&quot;: 0.15303302147479103, &quot;7335&quot;: 0.9436728846033107}, &quot;dense&quot;: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, ...]}
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-multiple-AnnSearchRequest-instances" class="common-anchor-header">여러 AnnSearchRequest 인스턴스 만들기</h3><p>하이브리드 검색은 <code translate="no">hybrid_search()</code> 함수에 여러 개의 <code translate="no">AnnSearchRequest</code> 을 생성하여 구현되며, 각 <code translate="no">AnnSearchRequest</code> 은 특정 벡터 필드에 대한 기본 ANN 검색 요청을 나타냅니다. 따라서 하이브리드 검색을 수행하기 전에 각 벡터 필드에 대해 <code translate="no">AnnSearchRequest</code> 을 생성해야 합니다.</p>
<p><code translate="no">AnnSearchRequest</code> 에서 <code translate="no">expr</code> 파라미터를 구성하여 하이브리드 검색에 대한 필터링 조건을 설정할 수 있습니다. <a href="/docs/ko/filtered-search.md">필터링된 검색</a> 및 <a href="/docs/ko/filtering">필터링을</a> 참조하세요.</p>
<div class="alert note">
<p>하이브리드 검색에서 각 <code translate="no">AnnSearchRequest</code> 은 하나의 쿼리 벡터만 지원합니다.</p>
</div>
<p>"누가 AI 연구를 시작했나요?"라는 쿼리 텍스트가 이미 스파스 및 밀도 벡터로 변환되었다고 가정해 보겠습니다. 이를 기반으로 다음 예제와 같이 <code translate="no">sparse</code> 및 <code translate="no">dense</code> 벡터 필드에 대해 각각 두 개의 <code translate="no">AnnSearchRequest</code> 검색 요청이 생성됩니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

query_dense_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: [query_dense_vector],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_1 = AnnSearchRequest(**search_param_1)

query_sparse_vector = {<span class="hljs-number">3573</span>: <span class="hljs-number">0.34701499565746674</span>, <span class="hljs-number">5263</span>: <span class="hljs-number">0.2639375518635271</span>}
search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: [query_sparse_vector],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_2 = AnnSearchRequest(**search_param_2)

reqs = [request_1, request_2]

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BaseVector;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.SparseFloatVec;

<span class="hljs-type">float</span>[] dense = <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.0475336798f</span>,  <span class="hljs-number">0.0521207601f</span>,  <span class="hljs-number">0.0904406682f</span>, ...};
SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;Long, Float&gt;() {{
    put(<span class="hljs-number">3573L</span>, <span class="hljs-number">0.34701499f</span>);
    put(<span class="hljs-number">5263L</span>, <span class="hljs-number">0.263937551f</span>);
    ...
}};

List&lt;BaseVector&gt; queryDenseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(dense));
List&lt;BaseVector&gt; querySparseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">SparseFloatVec</span>(sparse));

List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;dense&quot;</span>)
        .vectors(queryDenseVectors)
        .metricType(IndexParam.MetricType.IP)
        .params(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .vectors(querySparseVectors)
        .metricType(IndexParam.MetricType.IP)
        .params(<span class="hljs-string">&quot;{\&quot;drop_ratio_build\&quot;: 0.2}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}
sparseVector, _ := entity.NewSliceSparseEmbedding([]<span class="hljs-type">uint32</span>{<span class="hljs-number">3573</span>, <span class="hljs-number">5263</span>}, []<span class="hljs-type">float32</span>{<span class="hljs-number">0.34701499</span>, <span class="hljs-number">0.263937551</span>})

request1 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-number">2</span>, entity.FloatVector(queryVector)).
    WithAnnParam(index.NewIvfAnnParam(<span class="hljs-number">10</span>)).
    WithSearchParam(index.MetricTypeKey, <span class="hljs-string">&quot;IP&quot;</span>)
annParam := index.NewSparseAnnParam()
annParam.WithDropRatio(<span class="hljs-number">0.2</span>)
request2 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-number">2</span>, sparseVector).
    WithAnnParam(annParam).
    WithSearchParam(index.MetricTypeKey, <span class="hljs-string">&quot;IP&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_vector, 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense&quot;</span>, 
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}

<span class="hljs-keyword">const</span> search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_sparse_vector, 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse&quot;</span>, 
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> req=<span class="hljs-string">&#x27;[
    {
        &quot;data&quot;: [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592,....]],
        &quot;annsField&quot;: &quot;dense&quot;,
        &quot;params&quot;: {
            &quot;params&quot;: {
                &quot;nprobe&quot;: 10
             }
        },
        &quot;limit&quot;: 2
    },
    {
        &quot;data&quot;: [{&quot;3573&quot;: 0.34701499565746674}, {&quot;5263&quot;: 0.2639375518635271}],
        &quot;annsField&quot;: &quot;sparse&quot;,
        &quot;params&quot;: {
            &quot;params&quot;: {
                &quot;drop_ratio_build&quot;: 0.2
             }
        },
        &quot;limit&quot;: 2
    }
 ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">limit</code> 매개 변수가 2로 설정되었으므로 각 <code translate="no">AnnSearchRequest</code> 은 2개의 검색 결과를 반환합니다. 이 예에서는 <code translate="no">AnnSearchRequest</code> 2개가 생성되므로 총 4개의 검색 결과가 반환됩니다.</p>
<h3 id="Configure-a-reranking-strategy" class="common-anchor-header">순위 재조정 전략 구성</h3><p>두 세트의 ANN 검색 결과를 병합하고 재랭크하려면 적절한 재랭크 전략을 선택해야 합니다. Milvus는 두 가지 유형의 재랭크 전략을 지원합니다: <strong>가중랭커와</strong> <strong>RRFRanker입니다</strong>. 재랭크 전략을 선택할 때 고려해야 할 한 가지는 벡터 필드에서 하나 이상의 기본 ANN 검색에 중점을 둘 것인지 여부입니다.</p>
<ul>
<li><p><strong>가중 랭커</strong>: 이 전략은 특정 벡터 필드를 강조하는 결과가 필요한 경우에 권장됩니다. 가중랭커를 사용하면 특정 벡터 필드에 더 높은 가중치를 할당하여 해당 필드를 더 강조할 수 있습니다. 예를 들어, 다중 모드 검색에서는 이미지의 텍스트 설명이 이미지의 색상보다 더 중요하게 고려될 수 있습니다.</p></li>
<li><p><strong>상호 순위 퓨전 랭킹(RRFRanker</strong>): 이 전략은 특별히 강조할 부분이 없을 때 권장됩니다. RRF는 각 벡터 필드의 중요도를 효과적으로 균형 있게 조정할 수 있습니다.</p></li>
</ul>
<p>이 두 가지 순위 재조정 전략의 메커니즘에 대한 자세한 내용은 <a href="/docs/ko/reranking.md">순위 재조정을</a> 참조하세요.</p>
<p>다음 두 가지 예에서는 WeightedRanker 및 RRFRanker 재랭킹 전략을 사용하는 방법을 설명합니다:</p>
<ol>
<li><p><strong>예 1: 가중치랭커 사용하기</strong></p>
<p>WeightedRanker 전략을 사용할 때는 <code translate="no">WeightedRanker</code> 함수에 가중치 값을 입력해야 합니다. 하이브리드 검색의 기본 ANN 검색 횟수는 입력해야 하는 값의 수에 해당합니다. 입력 값은 [0,1] 범위여야 하며, 1에 가까운 값일수록 중요도가 높음을 나타냅니다.</p>
<p><div class="multipleCode">
<a href="#python">파이썬</a><a href="#java">자바</a><a href="#go">Go</a><a href="#javascript">NodeJS</a><a href="#bash">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

ranker = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>) 
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BaseRanker;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;

<span class="hljs-type">BaseRanker</span> <span class="hljs-variable">reranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">reranker := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> rerank = <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;ws&quot;,
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>예 2: RRFRanker 사용</strong></p>
<p>RRFRanker 전략을 사용할 때는 매개 변수 값 <code translate="no">k</code> 을 RRFRanker에 입력해야 합니다. <code translate="no">k</code> 의 기본값은 60입니다. 이 매개변수는 모든 검색에서 중요도의 균형을 맞추고 혼합하는 것을 목표로 다양한 ANN 검색에서 순위를 결합하는 방법을 결정하는 데 도움이 됩니다.</p>
<p><div class="multipleCode">
<a href="#python">파이썬</a><a href="#java">자바</a><a href="#go">Go</a><a href="#javascript">NodeJS</a><a href="#bash">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

ranker = RRFRanker(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BaseRanker;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;

<span class="hljs-type">BaseRanker</span> <span class="hljs-variable">reranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">reranker := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> rerank = <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;rrf&quot;,
        &quot;params&quot;: { &quot;k&quot;: 100}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Perform-a-Hybrid-Search" class="common-anchor-header">하이브리드 검색 수행</h3><p>하이브리드 검색을 수행하기 전에 컬렉션을 메모리에 로드해야 합니다. 컬렉션의 벡터 필드에 인덱스가 없거나 로드되지 않은 경우 하이브리드 검색 메서드를 호출할 때 오류가 발생합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=reqs,
    ranker=ranker,
    limit=<span class="hljs-number">2</span>
)
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .searchRequests(searchRequests)
        .ranker(reranker)
        .topK(<span class="hljs-number">2</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSets, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-number">2</span>,
    request1,
    request2,
).WithReranker(reranker))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
})

<span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">RRFRanker</span>, <span class="hljs-title class_">WeightedRanker</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: [search_param_1, search_param_2],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>)
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/advanced_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;search\&quot;: <span class="hljs-variable">${req}</span>,
    \&quot;rerank\&quot;: {
        \&quot;strategy\&quot;:\&quot;rrf\&quot;,
        \&quot;params\&quot;: {
            \&quot;k\&quot;: 10
        }
    },
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [
        \&quot;user_id\&quot;,
        \&quot;word_count\&quot;,
        \&quot;book_describe\&quot;
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>다음은 출력입니다:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">limit=2</code> 이 하이브리드 검색에 지정되었으므로 Milvus는 3단계에서 4개의 검색 결과의 순위를 재조정하여 최종적으로 가장 유사한 상위 2개의 검색 결과만 반환합니다.</p>
