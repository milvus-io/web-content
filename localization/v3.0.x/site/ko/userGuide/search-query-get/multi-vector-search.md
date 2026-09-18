---
id: multi-vector-search.md
title: 다중 벡터 하이브리드 검색
summary: >-
  많은 애플리케이션에서, 객체는 제목이나 설명과 같은 다양한 정보나 텍스트, 이미지, 오디오와 같은 여러 모달리티를 통해 검색될 수 있습니다.
  예를 들어, 텍스트와 이미지가 포함된 트윗은 텍스트나 이미지 중 하나라도 검색 쿼리의 의미와 일치할 경우 검색 대상이 됩니다. 하이브리드
  검색은 이러한 다양한 영역에 걸친 검색을 결합하여 검색 경험을 향상시킵니다. Milvus는 여러 벡터 필드에 대한 검색을 허용하고, 여러
  개의 근사 최인접 이웃(ANN) 검색을 동시에 수행함으로써 이를 지원합니다. 다중 벡터 하이브리드 검색은 텍스트와 이미지를 모두 검색하거나,
  동일한 객체를 설명하는 여러 텍스트 필드를 검색하거나, 검색 품질을 높이기 위해 밀집 벡터와 희소 벡터를 함께 검색하려는 경우에 특히
  유용합니다.
---
<h1 id="Multi-Vector-Hybrid-Search" class="common-anchor-header">다중 벡터 하이브리드 검색<button data-href="#Multi-Vector-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>많은 응용 분야에서, 객체는 제목이나 설명과 같은 다양한 정보 세트를 통해, 또는 텍스트, 이미지, 오디오와 같은 여러 모달리티를 활용하여 검색될 수 있습니다. 예를 들어, 텍스트와 이미지가 포함된 트윗의 경우, 텍스트나 이미지 중 어느 하나라도 검색 쿼리의 의미와 일치하면 검색 대상이 됩니다. 하이브리드 검색은 이러한 다양한 영역에 걸친 검색을 결합하여 검색 경험을 향상시킵니다. Milvus는 여러 벡터 필드에 대한 검색을 허용하고, 여러 개의 근사 최인접 이웃(ANN) 검색을 동시에 수행함으로써 이를 지원합니다. 다중 벡터 하이브리드 검색은 텍스트와 이미지를 모두 검색하거나, 동일한 객체를 설명하는 여러 텍스트 필드를 검색하거나, 검색 품질을 높이기 위해 밀집 벡터와 희소 벡터를 함께 검색하려는 경우에 특히 유용합니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hybrid-search-workflow.png" alt="Hybrid Search Workflow" class="doc-image" id="hybrid-search-workflow" /> 
   <span>하이브리드 검색 워크플로우</span>
  
 </span></p>
<p>다중 벡터 하이브리드 검색은 서로 다른 검색 방법을 통합하거나 다양한 모달리티의 임베딩을 아우릅니다:</p>
<ul>
<li><p><strong>희소-밀집 벡터 검색</strong>: <a href="/docs/ko/dense-vector.md">밀집 벡터는</a> 의미적 관계를 포착하는 데 탁월한 반면, <a href="/docs/ko/sparse_vector.md">희소 벡터는</a> 정확한 키워드 일치에 매우 효과적입니다. 하이브리드 검색은 이러한 접근 방식을 결합하여 광범위한 개념적 이해와 정확한 용어 관련성을 모두 제공함으로써 검색 결과를 향상시킵니다. 각 방법의 장점을 활용함으로써 하이브리드 검색은 개별 접근 방식의 한계를 극복하고, 복잡한 쿼리에 대해 더 나은 성능을 제공합니다. 다음은 의미 검색과 전체 텍스트 검색을 결합한 하이브리드 검색에 대한 더 자세한 <a href="/docs/ko/full_text_search_with_milvus.md">가이드입니다</a>.</p></li>
<li><p><strong>다중 모달 벡터 검색</strong>: 다중 모달 벡터 검색은 텍스트, 이미지, 오디오 등 다양한 데이터 유형을 아우르는 검색을 가능하게 하는 강력한 기술입니다. 이 접근 방식의 주요 장점은 서로 다른 모달리티를 통합하여 매끄럽고 일관된 검색 경험을 제공한다는 점입니다. 예를 들어, 상품 검색에서 사용자는 텍스트와 이미지로 모두 설명된 상품을 찾기 위해 텍스트 쿼리를 입력할 수 있습니다. 하이브리드 검색 방식을 통해 이러한 모달리티를 결합함으로써 검색 정확도를 높이거나 검색 결과를 더욱 풍부하게 만들 수 있습니다.</p></li>
</ul>
<h2 id="Example" class="common-anchor-header">예시<button data-href="#Example" class="anchor-icon" translate="no">
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
    </button></h2><p>각 제품에 텍스트 설명과 이미지가 포함된 실제 사용 사례를 살펴보겠습니다. 이용 가능한 데이터를 바탕으로 다음 세 가지 유형의 검색을 수행할 수 있습니다:</p>
<ul>
<li><p><strong>의미론적 텍스트 검색:</strong> 이는 밀집 벡터를 사용하여 제품의 텍스트 설명을 검색하는 방식입니다. 텍스트 임베딩은 <a href="https://zilliz.com/learn/explore-colbert-token-level-embedding-and-ranking-model-for-similarity-search?_gl=1*d243m9*_gcl_au*MjcyNTAwMzUyLjE3NDMxMzE1MjY.*_ga*MTQ3OTI4MDc5My4xNzQzMTMxNTI2*_ga_KKMVYG8YF2*MTc0NTkwODU0Mi45NC4xLjE3NDU5MDg4MzcuMC4wLjA.#A-Quick-Recap-of-BERT">BERT</a> 및 <a href="https://zilliz.com/learn/NLP-essentials-understanding-transformers-in-AI?_gl=1*d243m9*_gcl_au*MjcyNTAwMzUyLjE3NDMxMzE1MjY.*_ga*MTQ3OTI4MDc5My4xNzQzMTMxNTI2*_ga_KKMVYG8YF2*MTc0NTkwODU0Mi45NC4xLjE3NDU5MDg4MzcuMC4wLjA.">Transformers와</a> 같은 모델이나 <a href="https://zilliz.com/learn/guide-to-using-openai-text-embedding-models">OpenAI와</a> 같은 서비스를 통해 생성할 수 있습니다.</p></li>
<li><p><strong>전체 텍스트 검색</strong>: 이 경우, 스파스 벡터를 활용한 키워드 매칭을 통해 제품의 텍스트 설명을 검색합니다. 이를 위해 <a href="https://zilliz.com/learn/mastering-bm25-a-deep-dive-into-the-algorithm-and-application-in-milvus">BM25와</a> 같은 알고리즘이나 <a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings?_gl=1*1cde1oq*_gcl_au*MjcyNTAwMzUyLjE3NDMxMzE1MjY.*_ga*MTQ3OTI4MDc5My4xNzQzMTMxNTI2*_ga_KKMVYG8YF2*MTc0NTkwODU0Mi45NC4xLjE3NDU5MDg4MzcuMC4wLjA.#BGE-M3">BGE-M3</a>, <a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings?_gl=1*ov2die*_gcl_au*MjcyNTAwMzUyLjE3NDMxMzE1MjY.*_ga*MTQ3OTI4MDc5My4xNzQzMTMxNTI2*_ga_KKMVYG8YF2*MTc0NTkwODU0Mi45NC4xLjE3NDU5MDg4MzcuMC4wLjA.#SPLADE">SPLADE와</a> 같은 스파스 임베딩 모델을 활용할 수 있습니다.</p></li>
<li><p><strong>다중 모달 이미지 검색:</strong> 이 방법은 밀집 벡터를 사용한 텍스트 쿼리를 통해 이미지를 검색합니다. 이미지 임베딩은 <a href="https://zilliz.com/learn/exploring-openai-clip-the-future-of-multimodal-ai-learning">CLIP과</a> 같은 모델을 사용하여 생성할 수 있습니다.</p></li>
</ul>
<p>이 가이드에서는 제품의 원본 텍스트 설명과 이미지 임베딩을 바탕으로, 위의 검색 방법을 결합한 다중 모달 하이브리드 검색의 예시를 단계별로 안내합니다. 다중 벡터 데이터를 저장하고 재순위 지정 전략을 통해 하이브리드 검색을 수행하는 방법을 시연할 것입니다.</p>
<h2 id="Create-a-collection-with-multiple-vector-fields" class="common-anchor-header">여러 벡터 필드가 포함된 컬렉션 생성<button data-href="#Create-a-collection-with-multiple-vector-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션을 생성하는 과정에는 컬렉션 스키마 정의, 인덱스 매개변수 구성, 컬렉션 생성이라는 세 가지 주요 단계가 포함됩니다.</p>
<h3 id="Define-schema" class="common-anchor-header">스키마 정의<button data-href="#Define-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>다중 벡터 하이브리드 검색을 위해서는 컬렉션 스키마 내에 여러 벡터 필드를 정의해야 합니다. 컬렉션에 허용되는 벡터 필드 수에 대한 제한 사항에 대한 자세한 내용은 <a href="https://zilliverse.feishu.cn/wiki/PuxkwMWvbiHxvTkHsVkcMZP9n5f#E5yxdHM16okh57xV3WKcTJsYn0f">Zilliz Cloud 사용 제한을</a> 참조하십시오.  그러나 필요한 경우, <a href="/docs/ko/configure_proxy.md#proxymaxVectorFieldNum"><code translate="no">proxy.maxVectorFieldNum</code></a> 조정하여 필요에 따라 컬렉션에 최대 10개의 벡터 필드를 포함시킬 수 있습니다.</p>
<p>이 예제에서는 다음 필드를 스키마에 포함합니다:</p>
<ul>
<li><p><code translate="no">id</code>: 텍스트 ID를 저장하기 위한 기본 키 역할을 합니다. 이 필드의 데이터 유형은 ` <code translate="no">INT64</code>`입니다.</p></li>
<li><p><code translate="no">text</code>: 텍스트 콘텐츠를 저장하는 데 사용됩니다. 이 필드의 데이터 유형은 ` <code translate="no">VARCHAR</code> `이며 최대 길이는 1000바이트입니다. 전체 텍스트 검색을 용이하게 하기 위해 ` <code translate="no">enable_analyzer</code> ` 옵션은 ` <code translate="no">True</code> `로 설정되어 있습니다.</p></li>
<li><p><code translate="no">text_dense</code>: 텍스트의 밀집 벡터를 저장하는 데 사용됩니다. 이 필드는 데이터 유형이 ` <code translate="no">FLOAT_VECTOR</code> `이며, 벡터 차원은 768입니다.</p></li>
<li><p><code translate="no">text_sparse</code>: 텍스트의 스파스 벡터를 저장하는 데 사용됩니다. 이 필드의 데이터 유형은 <code translate="no">SPARSE_FLOAT_VECTOR</code> 입니다.</p></li>
<li><p><code translate="no">image_dense</code>: 상품 이미지의 밀집 벡터를 저장하는 데 사용됩니다. 이 필드의 데이터 유형은 <code translate="no">FLOAT_VETOR</code> 이며, 벡터 차원은 512입니다.</p></li>
</ul>
<p>텍스트 필드에 대해 내장된 BM25 알고리즘을 사용하여 전체 텍스트 검색을 수행할 예정이므로, 스키마에 Milvus <code translate="no">Function</code> 를 추가해야 합니다. 자세한 내용은 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색을</a> 참조하십시오.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient, DataType, Function, FunctionType
)

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Init schema with auto_id disabled</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;product id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;raw text of product description&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_dense&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;text dense embedding&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;text sparse embedding auto-generated by the built-in BM25 function&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;image_dense&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">512</span>, description=<span class="hljs-string">&quot;image dense embedding&quot;</span>)

<span class="hljs-comment"># Add function to schema</span>
bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse&quot;</span>],
    function_type=FunctionType.BM25,
)
schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

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
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;image_dense&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">512</span>)
        .build());

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse&quot;</span>))
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

function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse&quot;</span>).
    WithType(entity.FunctionTypeBM25)

schema := entity.NewSchema()

schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">1000</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_dense&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;image_dense&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">512</span>),
).WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

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
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_dense&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;image_dense&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">512</span>
    }
];

<span class="hljs-comment">// define function</span>
<span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_bm25_emb&quot;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;text bm25 function&quot;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;text&quot;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;text_sparse&quot;</span>],
      <span class="hljs-attr">params</span>: {},
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: false,
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;text_bm25_emb&quot;,
                &quot;type&quot;: &quot;BM25&quot;,
                &quot;inputFieldNames&quot;: [&quot;text&quot;],
                &quot;outputFieldNames&quot;: [&quot;text_sparse&quot;],
                &quot;params&quot;: {}
            }
        ],
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
                &quot;fieldName&quot;: &quot;text_dense&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;768&quot;
                }
            },
            {
                &quot;fieldName&quot;: &quot;text_sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            },
            {
                &quot;fieldName&quot;: &quot;image_dense&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;512&quot;
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::FunctionPtr function = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::Function&gt;(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, milvus::FunctionType::BM25, <span class="hljs-string">&quot;text bm25 function&quot;</span>);
function-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;text&quot;</span>);
function-&gt;<span class="hljs-built_in">AddOutputFieldName</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>);

milvus::CollectionSchemaPtr schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
schema-&gt;<span class="hljs-built_in">AddField</span>({<span class="hljs-string">&quot;id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>});
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1000</span>).<span class="hljs-built_in">EnableAnalyzer</span>(<span class="hljs-literal">true</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text_dense&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">768</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>({<span class="hljs-string">&quot;text_sparse&quot;</span>, milvus::DataType::SPARSE_FLOAT_VECTOR});
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;image_dense&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">512</span>));
schema-&gt;<span class="hljs-built_in">AddFunction</span>(function);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-index" class="common-anchor-header">인덱스 생성<button data-href="#Create-index" class="anchor-icon" translate="no">
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
    </button></h3><p>컬렉션 스키마를 정의한 후, 다음 단계는 벡터 인덱스를 구성하고 유사도 메트릭을 지정하는 것입니다. 주어진 예시에서는:</p>
<ul>
<li><p><code translate="no">text_dense_index</code>: 텍스트 밀집 벡터 필드에 대해 <code translate="no">AUTOINDEX</code> 유형의 인덱스가 <code translate="no">IP</code> 메트릭 유형으로 생성됩니다.</p></li>
<li><p><code translate="no">text_sparse_index</code>: 텍스트 스파스 벡터 필드에는<code translate="no">SPARSE_INVERTED_INDEX</code>유형에 <code translate="no">BM25</code> 메트릭 유형을 가진 인덱스가 사용됩니다.</p></li>
<li><p><code translate="no">image_dense_index</code>: 이미지 밀집 벡터 필드에 대해 <code translate="no">AUTOINDEX</code> 유형의 인덱스가 생성되며, 메트릭 유형은 <code translate="no">IP</code> 입니다.</p></li>
</ul>
<p>필요에 따라 사용 환경과 데이터 유형에 가장 적합한 다른 인덱스 유형을 선택할 수 있습니다. 지원되는 인덱스 유형에 대한 자세한 내용은 <a href="/docs/ko/index-vector-fields.md">사용 가능한 인덱스 유형에</a> 대한 문서를 참조하십시오.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add indexes</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_dense&quot;</span>,
    index_name=<span class="hljs-string">&quot;text_dense_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    index_name=<span class="hljs-string">&quot;text_sparse_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># or &quot;DAAT_WAND&quot; or &quot;TAAT_NAIVE&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;image_dense&quot;</span>,
    index_name=<span class="hljs-string">&quot;image_dense_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

Map&lt;String, Object&gt; denseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForTextDense</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense&quot;</span>)
        .indexName(<span class="hljs-string">&quot;text_dense_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build();

Map&lt;String, Object&gt; sparseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
sparseParams.put(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForTextSparse</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
        .indexName(<span class="hljs-string">&quot;text_sparse_index&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.BM25)
        .extraParams(sparseParams)
        .build();

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForImageDense</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;image_dense&quot;</span>)
        .indexName(<span class="hljs-string">&quot;image_dense_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForTextDense);
indexParams.add(indexParamForTextSparse);
indexParams.add(indexParamForImageDense);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOption1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;text_dense&quot;</span>,
    index.NewAutoIndex(index.MetricType(entity.IP)))
indexOption2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;text_sparse&quot;</span>,
    index.NewSparseInvertedIndex(entity.BM25, <span class="hljs-number">0.2</span>))
indexOption3 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;image_dense&quot;</span>,
    index.NewAutoIndex(index.MetricType(entity.IP)))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;text_dense&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;text_dense_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>
},{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;text_sparse_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">params</span>: {
      <span class="hljs-attr">inverted_index_algo</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>, 
    }
},{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;image_dense&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;image_dense_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>
}]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;text_dense&quot;,
            &quot;metricType&quot;: &quot;IP&quot;,
            &quot;indexName&quot;: &quot;text_dense_index&quot;,
            &quot;indexType&quot;:&quot;AUTOINDEX&quot;
        },
        {
            &quot;fieldName&quot;: &quot;text_sparse&quot;,
            &quot;metricType&quot;: &quot;BM25&quot;,
            &quot;indexName&quot;: &quot;text_sparse_index&quot;,
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;,
            &quot;params&quot;:{&quot;inverted_index_algo&quot;: &quot;DAAT_MAXSCORE&quot;}
        },
        {
            &quot;fieldName&quot;: &quot;image_dense&quot;,
            &quot;metricType&quot;: &quot;IP&quot;,
            &quot;indexName&quot;: &quot;image_dense_index&quot;,
            &quot;indexType&quot;:&quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-function">milvus::IndexDesc <span class="hljs-title">text_sparse_index</span><span class="hljs-params">(<span class="hljs-string">&quot;text_sparse&quot;</span>, <span class="hljs-string">&quot;text_sparse_index&quot;</span>, milvus::IndexType::SPARSE_INVERTED_INDEX, milvus::MetricType::BM25)</span></span>;
text_sparse_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);

std::vector&lt;milvus::IndexDesc&gt; indexes = {
    milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;text_dense&quot;</span>, <span class="hljs-string">&quot;text_dense_index&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::IP),
    text_sparse_index,
    milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;image_dense&quot;</span>, <span class="hljs-string">&quot;image_dense_index&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::IP),
};
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-collection" class="common-anchor-header">컬렉션 생성<button data-href="#Create-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>앞서 두 단계에서 구성한 컬렉션 스키마 및 인덱스를 사용하여 ‘ <code translate="no">demo</code> ’라는 이름의 컬렉션을 생성합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
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
        WithIndexOptions(indexOption1, indexOption2, indexOption3))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">functions</span>: functions,
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
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                      .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                      .<span class="hljs-built_in">WithCollectionSchema</span>(schema)
                                      .<span class="hljs-built_in">WithIndexes</span>(std::<span class="hljs-built_in">move</span>(indexes)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
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
    </button></h2><p>이 섹션에서는 앞서 정의한 스키마에 따라 <code translate="no">my_collection</code> 컬렉션에 데이터를 삽입합니다. 삽입 시, 자동 생성된 값을 가진 필드를 제외한 모든 필드에 올바른 형식의 데이터가 제공되도록 해야 합니다. 이 예시에서:</p>
<ul>
<li><p><code translate="no">id</code>: 제품 ID를 나타내는 정수</p></li>
<li><p><code translate="no">text</code>: 상품 설명을 포함하는 문자열</p></li>
<li><p><code translate="no">text_dense</code>: 텍스트 설명의 밀집 임베딩을 나타내는 768개의 부동 소수점 값 목록</p></li>
<li><p><code translate="no">image_dense</code>: 상품 이미지의 밀집 임베딩을 나타내는 512개의 부동소수점 값 목록</p></li>
</ul>
<p>각 필드에 대한 밀집 임베딩을 생성할 때 동일한 모델을 사용하거나 서로 다른 모델을 사용할 수 있습니다. 이 예시에서 두 밀집 임베딩은 차원이 서로 다르므로, 서로 다른 모델로 생성되었음을 시사합니다. 나중에 각 검색을 정의할 때는 해당 모델을 사용하여 적절한 쿼리 임베딩을 생성해야 합니다.</p>
<p>이 예제에서는 내장된 BM25 함수를 사용하여 텍스트 필드에서 스파스 임베딩을 생성하므로, 스파스 벡터를 수동으로 제공할 필요가 없습니다. 그러나 BM25를 사용하지 않기로 선택한 경우, 스파스 임베딩을 직접 사전 계산하여 제공해야 합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Generate example vectors</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_dense_vector</span>(<span class="hljs-params">dim</span>):
    <span class="hljs-keyword">return</span> [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)]

data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Red cotton t-shirt with round neck&quot;</span>,
        <span class="hljs-string">&quot;text_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">768</span>),
        <span class="hljs-string">&quot;image_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">512</span>)
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Wireless noise-cancelling over-ear headphones&quot;</span>,
        <span class="hljs-string">&quot;text_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">768</span>),
        <span class="hljs-string">&quot;image_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">512</span>)
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Stainless steel water bottle, 500ml&quot;</span>,
        <span class="hljs-string">&quot;text_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">768</span>),
        <span class="hljs-string">&quot;image_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">512</span>)
    }
]

res = client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">0</span>);
row1.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Red cotton t-shirt with round neck&quot;</span>);
row1.add(<span class="hljs-string">&quot;text_dense&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, ...}));
row1.add(<span class="hljs-string">&quot;image_dense&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.6366019600530924f</span>, -<span class="hljs-number">0.09323198122475052f</span>, ...}));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);
row2.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Wireless noise-cancelling over-ear headphones&quot;</span>);
row2.add(<span class="hljs-string">&quot;text_dense&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.19886812562848388f</span>, <span class="hljs-number">0.06023560599112088f</span>, <span class="hljs-number">0.6976963061752597f</span>, ...}));
row2.add(<span class="hljs-string">&quot;image_dense&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.6414180010301553f</span>, <span class="hljs-number">0.8976979978567611f</span>, ...}));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);
row3.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Stainless steel water bottle, 500ml&quot;</span>);
row3.add(<span class="hljs-string">&quot;text_dense&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.43742130801983836f</span>, -<span class="hljs-number">0.5597502546264526f</span>, <span class="hljs-number">0.6457887650909682f</span>, ...}));
row3.add(<span class="hljs-string">&quot;image_dense&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.6901259768402174f</span>, <span class="hljs-number">0.6100500332193755f</span>, ...}));

List&lt;JsonObject&gt; data = Arrays.asList(row1, row2, row3);
<span class="hljs-type">InsertReq</span> <span class="hljs-variable">insertReq</span> <span class="hljs-operator">=</span> InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(insertReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>}).
    WithVarcharColumn(<span class="hljs-string">&quot;text&quot;</span>, []<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;Red cotton t-shirt with round neck&quot;</span>,
        <span class="hljs-string">&quot;Wireless noise-cancelling over-ear headphones&quot;</span>,
        <span class="hljs-string">&quot;Stainless steel water bottle, 500ml&quot;</span>,
    }).
    WithFloatVectorColumn(<span class="hljs-string">&quot;text_dense&quot;</span>, <span class="hljs-number">768</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...},
        {<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, ...},
        {<span class="hljs-number">0.43742130801983836</span>, <span class="hljs-number">-0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, ...},
    }).
    WithFloatVectorColumn(<span class="hljs-string">&quot;image_dense&quot;</span>, <span class="hljs-number">512</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.6366019600530924</span>, <span class="hljs-number">-0.09323198122475052</span>, ...},
        {<span class="hljs-number">0.6414180010301553</span>, <span class="hljs-number">0.8976979978567611</span>, ...},
        {<span class="hljs-number">-0.6901259768402174</span>, <span class="hljs-number">0.6100500332193755</span>, ...},
    }))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">var</span> data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Red cotton t-shirt with round neck&quot;</span> , <span class="hljs-attr">text_dense</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...], <span class="hljs-attr">image_dense</span>: [<span class="hljs-number">0.6366019600530924</span>, -<span class="hljs-number">0.09323198122475052</span>, ...]},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Wireless noise-cancelling over-ear headphones&quot;</span> , <span class="hljs-attr">text_dense</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, ...], <span class="hljs-attr">image_dense</span>: [<span class="hljs-number">0.6414180010301553</span>, <span class="hljs-number">0.8976979978567611</span>, ...]},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Stainless steel water bottle, 500ml&quot;</span> , <span class="hljs-attr">text_dense</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, ...], <span class="hljs-attr">image_dense</span>: [-<span class="hljs-number">0.6901259768402174</span>, <span class="hljs-number">0.6100500332193755</span>, ...]}
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
        {&quot;id&quot;: 0, &quot;text&quot;: &quot;Red cotton t-shirt with round neck&quot; , &quot;text_dense&quot;: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, ...], &quot;image_dense&quot;: [0.6366019600530924, -0.09323198122475052, ...]},
        {&quot;id&quot;: 1, &quot;text&quot;: &quot;Wireless noise-cancelling over-ear headphones&quot; , &quot;text_dense&quot;: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, ...], &quot;image_dense&quot;: [0.6414180010301553, 0.8976979978567611, ...]},
        {&quot;id&quot;: 2, &quot;text&quot;: &quot;Stainless steel water bottle, 500ml&quot; , &quot;text_dense&quot;: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, ...], &quot;image_dense&quot;: [-0.6901259768402174, 0.6100500332193755, ...]}
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;random&gt;</span></span>

<span class="hljs-function">std::vector&lt;<span class="hljs-type">float</span>&gt;
<span class="hljs-title">GenerateFloatVector</span><span class="hljs-params">(<span class="hljs-type">int</span> dimension)</span> </span>{
    std::random_device rd;
    <span class="hljs-function">std::mt19937 <span class="hljs-title">ran</span><span class="hljs-params">(rd())</span></span>;
    <span class="hljs-function">std::uniform_real_distribution&lt;<span class="hljs-type">float</span>&gt; <span class="hljs-title">float_gen</span><span class="hljs-params">(<span class="hljs-number">0.0</span>, <span class="hljs-number">1.0</span>)</span></span>;
    <span class="hljs-function">std::vector&lt;<span class="hljs-type">float</span>&gt; <span class="hljs-title">vector</span><span class="hljs-params">(dimension)</span></span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span> d = <span class="hljs-number">0</span>; d &lt; dimension; ++d) {
        vector[d] = <span class="hljs-built_in">float_gen</span>(ran);
    }
    <span class="hljs-keyword">return</span> vector;
}

milvus::EntityRows data = {
    {{<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">0</span>}, {<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Red cotton t-shirt with round neck&quot;</span>}, {<span class="hljs-string">&quot;text_dense&quot;</span>, <span class="hljs-built_in">GenerateFloatVector</span>(<span class="hljs-number">768</span>)}, {<span class="hljs-string">&quot;image_dense&quot;</span>, <span class="hljs-built_in">GenerateFloatVector</span>(<span class="hljs-number">512</span>)}},
    {{<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>}, {<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Wireless noise-cancelling over-ear headphones&quot;</span>}, {<span class="hljs-string">&quot;text_dense&quot;</span>, <span class="hljs-built_in">GenerateFloatVector</span>(<span class="hljs-number">768</span>)}, {<span class="hljs-string">&quot;image_dense&quot;</span>, <span class="hljs-built_in">GenerateFloatVector</span>(<span class="hljs-number">512</span>)}},
    {{<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>}, {<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Stainless steel water bottle, 500ml&quot;</span>}, {<span class="hljs-string">&quot;text_dense&quot;</span>, <span class="hljs-built_in">GenerateFloatVector</span>(<span class="hljs-number">768</span>)}, {<span class="hljs-string">&quot;image_dense&quot;</span>, <span class="hljs-built_in">GenerateFloatVector</span>(<span class="hljs-number">512</span>)}}
};

milvus::InsertResponse response;
status = client-&gt;<span class="hljs-built_in">Insert</span>(milvus::<span class="hljs-built_in">InsertRequest</span>()
                            .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                            .<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(data)),
                        response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Perform-Hybrid-Search" class="common-anchor-header">하이브리드 검색 수행<button data-href="#Perform-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Create-multiple-AnnSearchRequest-instances" class="common-anchor-header">1단계: 여러 개의 AnnSearchRequest 인스턴스 생성<button data-href="#Step-1-Create-multiple-AnnSearchRequest-instances" class="anchor-icon" translate="no">
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
    </button></h3><p>하이브리드 검색은 ` <code translate="no">hybrid_search()</code> ` 함수 내에서 여러 개의 ` <code translate="no">AnnSearchRequest</code> ` 인스턴스를 생성하여 구현되며, 각 ` <code translate="no">AnnSearchRequest</code> `는 특정 벡터 필드에 대한 기본 ANN 검색 요청을 나타냅니다. 따라서 하이브리드 검색을 수행하기 전에 각 벡터 필드에 대해 ` <code translate="no">AnnSearchRequest</code> `를 생성해야 합니다.</p>
<p>또한, <code translate="no">AnnSearchRequest</code> 내의 <code translate="no">expr</code> 매개변수를 구성하여 하이브리드 검색에 대한 필터링 조건을 설정할 수 있습니다. <a href="/docs/ko/filtered-search.md">‘필터링된 검색’</a> 및 <a href="/docs/ko/boolean.md">‘필터링 설명’을</a> 참조하십시오.</p>
<div class="alert note">
<p>하이브리드 검색에서 각 <code translate="no">AnnSearchRequest</code> 는 하나의 쿼리 데이터만 지원합니다.</p>
</div>
<p>다양한 검색 벡터 필드의 기능을 시연하기 위해, 샘플 쿼리를 사용하여 세 가지 <code translate="no">AnnSearchRequest</code> 검색 요청을 구성해 보겠습니다. 또한 이 과정에서 미리 계산된 밀집 벡터(dense vectors)를 사용할 것입니다. 검색 요청은 다음 벡터 필드를 대상으로 합니다:</p>
<ul>
<li><p><code translate="no">text_dense</code> 의미론적 텍스트 검색: 직접적인 키워드 일치보다는 문맥을 이해하고 의미를 기반으로 한 검색을 가능하게 합니다.</p></li>
<li><p><code translate="no">text_sparse</code>전체 텍스트 검색 또는 키워드 일치: 텍스트 내의 정확한 단어 또는 구문 일치에 중점을 둡니다.</p></li>
<li><p><code translate="no">image_dense</code>다중 모달 텍스트-이미지 검색용으로, 쿼리의 의미적 내용을 기반으로 관련 제품 이미지를 검색합니다.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

query_text = <span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>
query_dense_vector = generate_dense_vector(<span class="hljs-number">768</span>)
query_multimodal_vector = generate_dense_vector(<span class="hljs-number">512</span>)

<span class="hljs-comment"># text semantic search (dense)</span>
search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: [query_dense_vector],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_dense&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_1 = AnnSearchRequest(**search_param_1)

<span class="hljs-comment"># full-text search (sparse)</span>
search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: [query_text],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_2 = AnnSearchRequest(**search_param_2)

<span class="hljs-comment"># text-to-image search (multimodal)</span>
search_param_3 = {
    <span class="hljs-string">&quot;data&quot;</span>: [query_multimodal_vector],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;image_dense&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_3 = AnnSearchRequest(**search_param_3)

reqs = [request_1, request_2, request_3]

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BaseVector;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.SparseFloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">float</span>[] queryDense = <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.0475336798f</span>,  <span class="hljs-number">0.0521207601f</span>,  <span class="hljs-number">0.0904406682f</span>, ...};
<span class="hljs-type">float</span>[] queryMultimodal = <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.0158298651f</span>, <span class="hljs-number">0.5264158340f</span>, ...};

List&lt;BaseVector&gt; queryTexts = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>));
List&lt;BaseVector&gt; queryDenseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(queryDense));
List&lt;BaseVector&gt; queryMultimodalVectors = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(queryMultimodal));

List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_dense&quot;</span>)
        .vectors(queryDenseVectors)
        .params(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
        .vectors(queryTexts)
        .topK(<span class="hljs-number">2</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;image_dense&quot;</span>)
        .vectors(queryMultimodalVectors)
        .params(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryText := entity.Text(<span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>)
queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...}
queryMultimodalVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.015829865178701663</span>, <span class="hljs-number">0.5264158340734488</span>, ...}

request1 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_dense&quot;</span>, <span class="hljs-number">2</span>, entity.FloatVector(queryVector)).
    WithAnnParam(index.NewIvfAnnParam(<span class="hljs-number">10</span>))

annParam := index.NewSparseAnnParam()
annParam.WithDropRatio(<span class="hljs-number">0.2</span>)
request2 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_sparse&quot;</span>, <span class="hljs-number">2</span>, queryText).
    WithAnnParam(annParam)

request3 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;image_dense&quot;</span>, <span class="hljs-number">2</span>, entity.FloatVector(queryMultimodalVector)).
    WithAnnParam(index.NewIvfAnnParam(<span class="hljs-number">10</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_text = <span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>
<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...]
<span class="hljs-keyword">const</span> query_multimodal_vector = [<span class="hljs-number">0.015829865178701663</span>, <span class="hljs-number">0.5264158340734488</span>, ...]

<span class="hljs-keyword">const</span> search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_vector, 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_dense&quot;</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}

<span class="hljs-keyword">const</span> search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_text, 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>, 
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}

<span class="hljs-keyword">const</span> search_param_3 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_multimodal_vector, 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;image_dense&quot;</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> req=<span class="hljs-string">&#x27;[
    {
        &quot;data&quot;: [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, ...]],
        &quot;annsField&quot;: &quot;text_dense&quot;,
        &quot;params&quot;: {&quot;nprobe&quot;: 10},
        &quot;limit&quot;: 2
    },
    {
        &quot;data&quot;: [&quot;white headphones, quiet and comfortable&quot;],
        &quot;annsField&quot;: &quot;text_sparse&quot;,
        &quot;limit&quot;: 2
    },
    {
        &quot;data&quot;: [[0.015829865178701663, 0.5264158340734488, ...]],
        &quot;annsField&quot;: &quot;image_dense&quot;,
        &quot;params&quot;: {&quot;nprobe&quot;: 10},
        &quot;limit&quot;: 2
    }
 ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> query_text = <span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>;
<span class="hljs-keyword">auto</span> query_dense_vector = <span class="hljs-built_in">GenerateFloatVector</span>(<span class="hljs-number">768</span>);
<span class="hljs-keyword">auto</span> query_multimodal_vector = <span class="hljs-built_in">GenerateFloatVector</span>(<span class="hljs-number">512</span>);

<span class="hljs-comment">// text semantic search (dense)</span>
<span class="hljs-keyword">auto</span> sub_req1 = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">AddFloatVector</span>(query_dense_vector)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;text_dense&quot;</span>)
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>);
sub_req<span class="hljs-number">1.</span><span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>);

<span class="hljs-comment">// full-text search (sparse)</span>
<span class="hljs-keyword">auto</span> sub_req2 = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">AddEmbeddedText</span>(query_text)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>)
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>);

<span class="hljs-comment">// text-to-image search (multimodal)</span>
<span class="hljs-keyword">auto</span> sub_req3 = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">AddFloatVector</span>(query_multimodal_vector)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;image_dense&quot;</span>)
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>);
sub_req<span class="hljs-number">3.</span><span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">limit</code> 매개변수가 2로 설정되어 있으므로, 각 <code translate="no">AnnSearchRequest</code> 호출은 2개의 검색 결과를 반환합니다. 이 예제에서는 3개의 <code translate="no">AnnSearchRequest</code> 인스턴스가 생성되어 총 6개의 검색 결과가 반환됩니다.</p>
<h3 id="Step-2-Configure-a-reranking-strategy" class="common-anchor-header">2단계: 재순위 지정 전략 구성<button data-href="#Step-2-Configure-a-reranking-strategy" class="anchor-icon" translate="no">
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
    </button></h3><p>ANN 검색 결과 집합을 병합하고 재순위를 매기려면 적절한 재순위 지정 전략을 선택하는 것이 필수적입니다. Milvus는 여러 유형의 재순위 지정 전략을 제공합니다. 이러한 재순위 지정 메커니즘에 대한 자세한 내용은 <a href="/docs/ko/weighted-ranker.md">Weighted Ranker</a> 또는 <a href="/docs/ko/rrf-ranker.md">RRF Ranker를</a> 참조하십시오.</p>
<p>이 예제에서는 특정 검색 쿼리에 특별히 중점을 두지 않으므로 RRFRanker 전략을 사용하겠습니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">ranker = Function(
    name=<span class="hljs-string">&quot;rrf&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>, 
        <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>  <span class="hljs-comment"># Optional</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-type">Function</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> Function.builder()
        .name(<span class="hljs-string">&quot;rrf&quot;</span>)
        .functionType(FunctionType.RERANK)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;rrf&quot;</span>)
        .param(<span class="hljs-string">&quot;k&quot;</span>, <span class="hljs-string">&quot;100&quot;</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;rrf&#x27;</span>,
  <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">params</span>: {
      <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>, 
      <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">reranker := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{&quot;k&quot;: 100}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> ranker = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::RRFRerank&gt;(<span class="hljs-number">100</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">3단계: 하이브리드 검색 수행<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>하이브리드 검색을 시작하기 전에 컬렉션이 로드되었는지 확인하십시오. 컬렉션 내의 벡터 필드 중 인덱스가 없거나 메모리에 로드되지 않은 것이 있으면, 하이브리드 검색 메서드를 실행할 때 오류가 발생합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">res = client.hybrid_search(
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
        .ranker(ranker)
        .topK(<span class="hljs-number">2</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSets, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-number">2</span>,
    request1,
    request2,
    request3,
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
  <span class="hljs-attr">data</span>: [search_param_1, search_param_2, search_param_3],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">rerank</span>: rerank
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/hybrid_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;search\&quot;: <span class="hljs-variable">${req}</span>,
    \&quot;rerank\&quot;: {
        \&quot;strategy\&quot;:\&quot;rrf\&quot;,
        \&quot;params\&quot;: <span class="hljs-variable">${rerank}</span>
    },
    \&quot;limit\&quot;: 2
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">HybridSearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(sub_req1)))
                   .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(sub_req2)))
                   .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(sub_req3)))
                   .<span class="hljs-built_in">WithRerank</span>(ranker)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; result : response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    std::cout &lt;&lt; <span class="hljs-string">&quot;TopK results:&quot;</span> &lt;&lt; std::endl;
    milvus::EntityRows output_rows;
    status = result.<span class="hljs-built_in">OutputRows</span>(output_rows);
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;\t&quot;</span> &lt;&lt; row &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>다음은 출력 결과입니다:</p>
<pre><code translate="no" class="language-text">[&quot;[&#x27;id: 1, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 2, distance: 0.006422005593776703, entity: {}&#x27;]&quot;]
<button class="copy-code-btn"></button></code></pre>
<p>하이브리드 검색에 ‘ <code translate="no">limit=2</code> ’ 매개변수가 지정되면, Milvus는 세 번의 검색에서 얻은 여섯 개의 결과를 재순위화합니다. 최종적으로 가장 유사한 상위 두 결과만 반환됩니다.</p>
<h2 id="Advanced-usage" class="common-anchor-header">고급 사용법<button data-href="#Advanced-usage" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Temporarily-set-a-timezone-for-a-hybrid-search" class="common-anchor-header">하이브리드 검색을 위해 시간대를 일시적으로 설정하기<button data-href="#Temporarily-set-a-timezone-for-a-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>컬렉션에 <code translate="no">TIMESTAMPTZ</code> 필드가 있는 경우, 하이브리드 검색 호출에서 <code translate="no">timezone</code> 매개변수를 설정하여 단일 작업에 대해 데이터베이스 또는 컬렉션의 기본 시간대를 일시적으로 재정의할 수 있습니다. 이는 작업 중에 <code translate="no">TIMESTAMPTZ</code> 값이 표시되고 비교되는 방식을 제어합니다.</p>
<p><code translate="no">timezone</code> 의 값은 유효한 <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">IANA 시간대 식별자</a> (예: <strong>Asia/Shanghai</strong>, <strong>America/Chicago</strong> 또는 <strong>UTC</strong>)여야 합니다. <code translate="no">TIMESTAMPTZ</code> 필드 사용 방법에 대한 자세한 내용은 <a href="/docs/ko/timestamptz-field.md">TIMESTAMPTZ 필드를</a> 참조하십시오.</p>
<p>다음 예제는 하이브리드 검색 작업에 대해 시간대를 임시로 설정하는 방법을 보여줍니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=reqs,
    ranker=ranker,
    limit=<span class="hljs-number">2</span>,
<span class="highlighted-wrapper-line">    timezone=<span class="hljs-string">&quot;America/Havana&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;AnnSearchReq&gt; tzRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
tzRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_dense&quot;</span>)
        .vectors(queryDenseVectors)
        .params(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
<span class="highlighted-wrapper-line">        .timezone(<span class="hljs-string">&quot;America/Havana&quot;</span>)</span>
        .build());
tzRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
        .vectors(queryTexts)
        .topK(<span class="hljs-number">2</span>)
<span class="highlighted-wrapper-line">        .timezone(<span class="hljs-string">&quot;America/Havana&quot;</span>)</span>
        .build());
tzRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;image_dense&quot;</span>)
        .vectors(queryMultimodalVectors)
        .params(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
<span class="highlighted-wrapper-line">        .timezone(<span class="hljs-string">&quot;America/Havana&quot;</span>)</span>
        .build());

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">tzHybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .searchRequests(tzRequests)
        .ranker(ranker)
        .topK(<span class="hljs-number">2</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">tzSearchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(tzHybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">tzRequest1 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_dense&quot;</span>, <span class="hljs-number">2</span>, entity.FloatVector(queryVector)).
    WithAnnParam(index.NewIvfAnnParam(<span class="hljs-number">10</span>)).
<span class="highlighted-wrapper-line">    WithSearchParam(<span class="hljs-string">&quot;timezone&quot;</span>, <span class="hljs-string">&quot;America/Havana&quot;</span>)</span>

tzRequest2 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_sparse&quot;</span>, <span class="hljs-number">2</span>, queryText).
    WithAnnParam(annParam).
<span class="highlighted-wrapper-line">    WithSearchParam(<span class="hljs-string">&quot;timezone&quot;</span>, <span class="hljs-string">&quot;America/Havana&quot;</span>)</span>

tzRequest3 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;image_dense&quot;</span>, <span class="hljs-number">2</span>, entity.FloatVector(queryMultimodalVector)).
    WithAnnParam(index.NewIvfAnnParam(<span class="hljs-number">10</span>)).
<span class="highlighted-wrapper-line">    WithSearchParam(<span class="hljs-string">&quot;timezone&quot;</span>, <span class="hljs-string">&quot;America/Havana&quot;</span>)</span>

resultSets, err = client.HybridSearch(ctx, milvusclient.NewHybridSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-number">2</span>,
    tzRequest1,
    tzRequest2,
    tzRequest3,
).WithReranker(reranker))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: [
    { ...search_param_1, <span class="hljs-attr">params</span>: { <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">timezone</span>: <span class="hljs-string">&quot;America/Havana&quot;</span> } },
    { ...search_param_2, <span class="hljs-attr">params</span>: { <span class="hljs-attr">timezone</span>: <span class="hljs-string">&quot;America/Havana&quot;</span> } },
    { ...search_param_3, <span class="hljs-attr">params</span>: { <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">timezone</span>: <span class="hljs-string">&quot;America/Havana&quot;</span> } },
  ],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">rerank</span>: rerank
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/hybrid_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;search&quot;: [
        {
            &quot;data&quot;: [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, ...]],
            &quot;annsField&quot;: &quot;text_dense&quot;,
            &quot;params&quot;: {&quot;nprobe&quot;: 10, &quot;timezone&quot;: &quot;America/Havana&quot;},
            &quot;limit&quot;: 2
        },
        {
            &quot;data&quot;: [&quot;white headphones, quiet and comfortable&quot;],
            &quot;annsField&quot;: &quot;text_sparse&quot;,
            &quot;params&quot;: {&quot;timezone&quot;: &quot;America/Havana&quot;},
            &quot;limit&quot;: 2
        },
        {
            &quot;data&quot;: [[0.015829865178701663, 0.5264158340734488, ...]],
            &quot;annsField&quot;: &quot;image_dense&quot;,
            &quot;params&quot;: {&quot;nprobe&quot;: 10, &quot;timezone&quot;: &quot;America/Havana&quot;},
            &quot;limit&quot;: 2
        }
    ],
    &quot;rerank&quot;: {
        &quot;strategy&quot;: &quot;rrf&quot;,
        &quot;params&quot;: {&quot;k&quot;: 100}
    },
    &quot;limit&quot;: 2
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> tz_req1 = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                   .<span class="hljs-built_in">AddFloatVector</span>(query_dense_vector)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;text_dense&quot;</span>)
<span class="highlighted-wrapper-line">                   .<span class="hljs-built_in">WithTimezone</span>(<span class="hljs-string">&quot;America/Havana&quot;</span>)</span>
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>);
tz_req<span class="hljs-number">1.</span><span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>);

<span class="hljs-keyword">auto</span> tz_req2 = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                   .<span class="hljs-built_in">AddEmbeddedText</span>(query_text)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>)
<span class="highlighted-wrapper-line">                   .<span class="hljs-built_in">WithTimezone</span>(<span class="hljs-string">&quot;America/Havana&quot;</span>)</span>
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>);

<span class="hljs-keyword">auto</span> tz_req3 = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                   .<span class="hljs-built_in">AddFloatVector</span>(query_multimodal_vector)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;image_dense&quot;</span>)
<span class="highlighted-wrapper-line">                   .<span class="hljs-built_in">WithTimezone</span>(<span class="hljs-string">&quot;America/Havana&quot;</span>)</span>
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>);
tz_req<span class="hljs-number">3.</span><span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>);

<span class="hljs-keyword">auto</span> tz_request = milvus::<span class="hljs-built_in">HybridSearchRequest</span>()
                      .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                      .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(tz_req1)))
                      .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(tz_req2)))
                      .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(tz_req3)))
                      .<span class="hljs-built_in">WithRerank</span>(ranker)
                      .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>);

milvus::SearchResponse tz_response;
status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(tz_request, tz_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
