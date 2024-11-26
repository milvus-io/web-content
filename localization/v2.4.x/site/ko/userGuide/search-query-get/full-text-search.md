---
id: full-text-search.md
title: 전체 텍스트 검색
related_key: 'full, text, search'
summary: 전체 텍스트 검색은 텍스트 데이터 세트에서 특정 용어나 구문이 포함된 문서를 검색한 다음 관련성에 따라 결과의 순위를 매기는 기능입니다.
---
<h1 id="Full-Text-Search​" class="common-anchor-header">전체 텍스트 검색<button data-href="#Full-Text-Search​" class="anchor-icon" translate="no">
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
<h2 id="Overview​" class="common-anchor-header">개요<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>전체 텍스트 검색은 수동 임베딩의 필요성을 제거하여 텍스트 기반 검색 프로세스를 간소화합니다. 이 기능은 다음 워크플로우를 통해 작동합니다.</p>
<ol>
<li><p><strong>텍스트 입력</strong>: 원시 텍스트 문서를 삽입하거나 수동으로 임베드할 필요 없이 쿼리 텍스트를 제공합니다.</p></li>
<li><p><strong>텍스트 분석</strong>: Milvus는 분석기를 사용하여 입력 텍스트를 검색 가능한 개별 용어로 토큰화합니다.</p></li>
<li><p><strong>함수 처리</strong>: 내장된 함수는 토큰화된 용어를 수신하여 희소 벡터 표현으로 변환합니다.</p></li>
<li><p><strong>컬렉션 저장소</strong>: Milvus는 효율적인 검색을 위해 이러한 희소 임베딩을 컬렉션에 저장합니다.</p></li>
<li><p><strong>BM25 점수</strong>: 검색 중에 Milvus는 BM25 알고리즘을 적용하여 저장된 문서에 대한 점수를 계산하고 쿼리 텍스트와의 관련성에 따라 일치하는 결과의 순위를 매깁니다.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/full-text-search.png" alt="Full text search" class="doc-image" id="full-text-search" />
   </span> <span class="img-wrapper"> <span>전체 텍스트 검색</span> </span></p>
<p>전체 텍스트 검색을 사용하려면 다음 주요 단계를 따르세요.</p>
<ol>
<li><p><a href="#Create-a-collection-for-full-text-search">컬렉션을 만듭니다</a>: 필요한 필드로 컬렉션을 설정하고 원시 텍스트를 스파스 임베딩으로 변환하는 함수를 정의합니다.</p></li>
<li><p><a href="#Insert-text-data">데이터 삽입하기</a>: 원시 텍스트 문서를 컬렉션에 수집합니다.</p></li>
<li><p><a href="#Perform-full-text-search">검색 수행하기</a>: 쿼리 텍스트를 사용하여 컬렉션을 검색하고 관련 결과를 검색합니다.</p></li>
</ol>
<h2 id="Create-a-collection-for-full-text-search​" class="common-anchor-header">전체 텍스트 검색을 위한 컬렉션 만들기<button data-href="#Create-a-collection-for-full-text-search​" class="anchor-icon" translate="no">
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
    </button></h2><p>전체 텍스트 검색을 사용하려면 특정 스키마로 컬렉션을 만드세요. 이 스키마에는 세 가지 필수 필드가 포함되어야 합니다.</p>
<ul>
<li><p>컬렉션의 각 엔터티를 고유하게 식별하는 기본 필드.</p></li>
<li><p><code translate="no">enable_analyzer</code> 속성이 <code translate="no">True</code> 로 설정된 원시 텍스트 문서를 저장하는 <code translate="no">VARCHAR</code> 필드. 이를 통해 Milvus는 함수 처리를 위해 텍스트를 특정 용어로 토큰화할 수 있습니다.</p></li>
<li><p><code translate="no">VARCHAR</code> 필드에 대해 Milvus가 자동으로 생성하는 스파스 임베딩을 저장하기 위해 예약된 <code translate="no">SPARSE_FLOAT_VECTOR</code> 필드.</p></li>
</ul>
<h3 id="Define-the-collection-schema" class="common-anchor-header">컬렉션 스키마 정의하기</h3><p>먼저 스키마를 생성하고 필요한 필드를 추가합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType​
​
schema = MilvusClient.create_schema()​
​
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)​

<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는</p>
<ul>
<li><p><code translate="no">id</code>는 기본 키 역할을 하며 <code translate="no">auto_id=True</code> 로 자동 생성됩니다.</p></li>
<li><p><code translate="no">text</code>는 전체 텍스트 검색 작업을 위한 원시 텍스트 데이터를 저장합니다. 데이터 유형은 <code translate="no">VARCHAR</code> 이 Milvus의 텍스트 저장용 문자열 데이터 유형이므로 <code translate="no">VARCHAR</code> 이어야 합니다. <code translate="no">enable_analyzer=True</code> 를 설정하면 Milvus가 텍스트를 토큰화할 수 있습니다. 기본적으로 Milvus는 텍스트 분석에 <a href="/docs/ko/standard-analyzer.md">표준 분석기를</a> 사용합니다. 다른 분석기를 구성하려면 <a href="/docs/ko/analyzer-overview.md">개요를</a> 참조하세요.</p></li>
<li><p><code translate="no">sparse</code>전체 텍스트 검색 작업을 위해 내부적으로 생성된 스파스 임베딩을 저장하기 위해 예약된 벡터 필드입니다. 데이터 유형은 <code translate="no">SPARSE_FLOAT_VECTOR</code> 여야 합니다.</p></li>
</ul>
<p>이제 텍스트를 스파스 벡터 표현으로 변환하는 함수를 정의한 다음 스키마에 추가합니다.</p>
<pre><code translate="no" class="language-python">bm25_function = Function(​
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name​</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text data​</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings​</span>
    function_type=FunctionType.BM25,​
)​
​
schema.add_function(bm25_function)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="EfAfdS3iXoAULPxQ3mwckzTrnUb"><thead><tr><th data-block-token="O3sLd5KNXou4Egxq6XVcoNiJnMW" colspan="1" rowspan="1"><p data-block-token="QRttdgJBpo2hEuxb438c7eOgn2f">매개변수</p>
</th><th data-block-token="SMGGduN8zo3cgXxVnwZcW0UAnbA" colspan="1" rowspan="1"><p data-block-token="LY39dA2eOoyVUUxvKwlcyyjdn3e">설명</p>
</th></tr></thead><tbody><tr><td data-block-token="Pbj3dPvuno3x6kxnCsWcTb3knag" colspan="1" rowspan="1"><p data-block-token="EeHOdxCjloFUAGxuY1CcScCTnDe"><code translate="no">name</code></p>
<p data-block-token="FzAJdVbrzozmTdxwy4fcJQkQnlh"></p>
</td><td data-block-token="VJWydnWHJoV66jx6oEPcH9lGnvh" colspan="1" rowspan="1"><p data-block-token="Clg3dWrJpo39lfxSWjVcbE7GnYm">함수의 이름입니다. 이 함수는 <code translate="no">text</code> 필드에 있는 원시 텍스트를 검색 가능한 벡터로 변환하여 <code translate="no">sparse</code> 필드에 저장합니다.</p>
</td></tr><tr><td data-block-token="ShPJdlvMQoXnSHxIQ1GcoyegnEb" colspan="1" rowspan="1"><p data-block-token="HFT1dYVCioUj4PxnNSVcYIBInNh"><code translate="no">input_field_names</code></p>
</td><td data-block-token="YiZCdrUaaovWnrxef29cmpQFn9c" colspan="1" rowspan="1"><p data-block-token="YFVOd29cUovDpXx7L2zcJK37n1g">텍스트를 스파스-벡터로 변환해야 하는 <code translate="no">VARCHAR</code> 필드의 이름입니다. <code translate="no">FunctionType.BM25</code> 의 경우 이 매개변수는 하나의 필드 이름만 허용합니다.</p>
</td></tr><tr><td data-block-token="QpcMdDoXfo62aNxQfoyc2E6lneg" colspan="1" rowspan="1"><p data-block-token="D1LkdH1KIojwKDx14HUcHdDJnPh"><code translate="no">output_field_names</code></p>
</td><td data-block-token="TrvodS2xDoF6UhxeFNScRg86nuf" colspan="1" rowspan="1"><p data-block-token="CO6bdbNhQo9ZprxlGdecjs9RnEf">내부적으로 생성된 스파스 벡터가 저장될 필드의 이름입니다. <code translate="no">FunctionType.BM25</code> 의 경우 이 매개변수는 하나의 필드 이름만 허용합니다.</p>
</td></tr><tr><td data-block-token="UvgkdWp5RoXa0QxL3CKcoEZVnIf" colspan="1" rowspan="1"><p data-block-token="PWZSd2E48oWB2QxqVoVcMHGxn7c"><code translate="no">function_type</code></p>
</td><td data-block-token="VdcmdmiiWoy0nex8a29clnslnQg" colspan="1" rowspan="1"><p data-block-token="Q2eSdvOqeoNa6dxcGjcc2LKinDg">사용할 함수의 유형입니다. 값을 <code translate="no">FunctionType.BM25</code> 으로 설정합니다.</p>
</td></tr></tbody></table>
<div class="alert note">
<p>텍스트에서 스파스 벡터로 변환해야 하는 <code translate="no">VARCHAR</code> 필드가 여러 개 있는 컬렉션의 경우 컬렉션 스키마에 별도의 함수를 추가하여 각 함수에 고유한 이름과 <code translate="no">output_field_names</code> 값을 갖도록 합니다.</p>
</div>
<h3 id="Configure-the-index" class="common-anchor-header">인덱스 구성</h3><p>필요한 필드와 기본 제공 함수로 스키마를 정의한 후에는 컬렉션의 색인을 설정하세요. 이 과정을 간소화하기 위해 <code translate="no">AUTOINDEX</code> 을 <code translate="no">index_type</code> 으로 사용하면 Milvus가 데이터 구조에 따라 가장 적합한 인덱스 유형을 선택하고 구성할 수 있습니다.</p>
<pre><code translate="no" class="language-python">index_params = <span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, ​
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="XEoodLxOFoukWJx9aLXcH46snXc"><thead><tr><th data-block-token="PfGNdbuq9o9PEWxzAWecWWoInUf" colspan="1" rowspan="1"><p data-block-token="KX1VdsOJCoO0Exxhg8acsduwncd">파라미터</p>
</th><th data-block-token="VNwBdAyWKoPktSxYaBtcn5rKnNb" colspan="1" rowspan="1"><p data-block-token="Oo1PduIsxo4HcMx2NRmcxvAMnld">설명</p>
</th></tr></thead><tbody><tr><td data-block-token="UxxWdkIBPoSbjOx7MO8csiFEn5d" colspan="1" rowspan="1"><p data-block-token="NYODddTbmoYoBrxPQ8ectvGxnPe"><code translate="no">field_name</code></p>
</td><td data-block-token="L2ZGdkB2voKhmsx8ezecoPxmnVf" colspan="1" rowspan="1"><p data-block-token="Y16fdZ6hPoXVlgxSTQjctsTonac">인덱싱할 벡터 필드의 이름입니다. 전체 텍스트 검색의 경우, 생성된 스파스 벡터를 저장하는 필드여야 합니다. 이 예에서는 값을 <code translate="no">sparse</code> 로 설정합니다.</p>
</td></tr><tr><td data-block-token="Wn1rdzso5o8AmqxqxiqccBpCnD4" colspan="1" rowspan="1"><p data-block-token="WLDrdOzSXoiKEOxoDREctDounRf"><code translate="no">index_type</code></p>
</td><td data-block-token="I9TpdLWlXozM3Hx2Z9mcWvDHnNc" colspan="1" rowspan="1"><p data-block-token="Q3cgdK7OTo3kzXxQ1Y2cSarZned">생성할 인덱스의 유형. <code translate="no">AUTOINDEX</code> 을 입력하면 Milvus가 인덱스 설정을 자동으로 최적화합니다. 인덱스 설정을 보다 세밀하게 제어해야 하는 경우 Milvus에서 스파스 벡터에 사용할 수 있는 다양한 인덱스 유형 중에서 선택할 수 있습니다. 자세한 내용은 <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Milvus에서 지원되는 인덱스를</a> 참조하세요.</p>
</td></tr><tr><td data-block-token="KJfgdQmD1odMgdxkG6uczBYknQh" colspan="1" rowspan="1"><p data-block-token="XVCsdz9Ulo93A2xavPtcF9Bvnec"><code translate="no">metric_type</code></p>
</td><td data-block-token="S3NHds6MTodtrsxRILIc8E1wngh" colspan="1" rowspan="1"><p data-block-token="G9i7dPczzoyJRHxyXbecrWBBn0d">특히 전체 텍스트 검색 기능을 사용하려면 이 매개변수의 값을 <code translate="no">BM25</code> 으로 설정해야 합니다.</p>
</td></tr></tbody></table>
<h3 id="Create-the-collection​" class="common-anchor-header">컬렉션 만들기</h3><p>이제 정의된 스키마 및 인덱스 매개변수를 사용하여 컬렉션을 생성합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, ​
    schema=schema, ​
    index_params=index_params​
)​

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
    </button></h2><p>컬렉션과 인덱스를 설정했으면 텍스트 데이터를 삽입할 준비가 된 것입니다. 이 과정에서는 원시 텍스트만 제공하면 됩니다. 앞서 정의한 내장 함수가 각 텍스트 항목에 해당하는 스파스 벡터를 자동으로 생성합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">insert</span>(<span class="hljs-string">&#x27;demo&#x27;</span>, [​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Artificial intelligence was founded as an academic discipline in 1956.&#x27;</span>},​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Alan Turing was the first person to conduct substantial research in AI.&#x27;</span>},​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Born in Maida Vale, London, Turing was raised in southern England.&#x27;</span>},​
])​

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
    </button></h2><p>컬렉션에 데이터를 삽입한 후에는 원시 텍스트 쿼리를 사용하여 전체 텍스트 검색을 수행할 수 있습니다. Milvus는 쿼리를 자동으로 스파스 벡터로 변환하고 BM25 알고리즘을 사용하여 일치하는 검색 결과의 순위를 매긴 다음 상위 K (<code translate="no">limit</code>) 결과를 반환합니다.</p>
<pre><code translate="no" class="language-python">search_params = {​
    <span class="hljs-string">&#x27;params&#x27;</span>: {<span class="hljs-string">&#x27;drop_ratio_search&#x27;</span>: 0.6},​
}​
​
MilvusClient.search(​
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, ​
    data=[<span class="hljs-string">&#x27;Who started AI research?&#x27;</span>],​
    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,​
    <span class="hljs-built_in">limit</span>=3,​
    search_params=search_params​
)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="M37Zdx7XdoYN41xdKtfcHcJpnqh"><thead><tr><th data-block-token="UhTwdxk3Mo5eLjxff0PcL1CHn8b" colspan="1" rowspan="1"><p data-block-token="OwUXdMhOgoRxjzx5t9ecKR9Zn6J">파라미터</p>
</th><th data-block-token="GM88dTMzTof30QxS9O2cVyrnnJd" colspan="1" rowspan="1"><p data-block-token="Nlp5dAJY8or40nxV6auc20XHnjh">설명</p>
</th></tr></thead><tbody><tr><td data-block-token="QpGIdQ2m0oogCvxColKcNWnYnUc" colspan="1" rowspan="1"><p data-block-token="TkffdBxkKo2hVvx9gGucca46nic"><code translate="no">search_params</code></p>
</td><td data-block-token="HYemdqt6Dow9tvxOcYScmYdPn8e" colspan="1" rowspan="1"><p data-block-token="JiIOdJrBcoGIQ4xrqYycMdjnn7g">검색 매개변수가 포함된 사전입니다.</p>
</td></tr><tr><td data-block-token="DJDgdH5WUoZQxkxmLzQcXqcXnQh" colspan="1" rowspan="1"><p data-block-token="LKWbdw498o9mtRxm9gDcg28FnQd"><code translate="no">params.drop_ratio_search</code></p>
</td><td data-block-token="SEJ7d5y18otFTOxy7gLcvLYRnfb" colspan="1" rowspan="1"><p data-block-token="MnladDjOGoUphGxrZzXchD0anzf">검색 시 무시할 빈도가 낮은 용어의 비율입니다. 자세한 내용은 <a href="/docs/ko/sparse_vector.md">스파스 벡터를</a> 참조하세요.</p>
</td></tr><tr><td data-block-token="XPPYdAYUPoASg5xuIYmcyxqHnPe" colspan="1" rowspan="1"><p data-block-token="T90ndG7H0okLa4xa1wzcHQmEnEg"><code translate="no">data</code></p>
</td><td data-block-token="NMhsduxr1oUESPx2J8YcA8csnA1" colspan="1" rowspan="1"><p data-block-token="ZmEQdkdGtofQsAx9YXNcsnlHnYe">원시 쿼리 텍스트입니다.</p>
</td></tr><tr><td data-block-token="O4OVdL9BIollH1xORz3czhInnSh" colspan="1" rowspan="1"><p data-block-token="CYdGd82dRopaWrxfJ9ycWQQnnPc"><code translate="no">anns_field</code></p>
</td><td data-block-token="MsKIdxGj6oWeBExoFurcxWCnnGh" colspan="1" rowspan="1"><p data-block-token="RsMDdgo0roTSBuxYwm6cGw3inZd">내부적으로 생성된 스파스 벡터를 포함하는 필드의 이름입니다.</p>
</td></tr><tr><td data-block-token="G0ewd9TQ1o1RQRxZA9ucMO9tnBK" colspan="1" rowspan="1"><p data-block-token="JOyTdUmLIo5aV0x4ChOcLiDQnLh"><code translate="no">limit</code></p>
</td><td data-block-token="H21hdYGZQoQe5FxYnwCch58qn0g" colspan="1" rowspan="1"><p data-block-token="ATKidHgXoo7c7dxM7cgcE46engb">반환할 상위 일치 항목의 최대 개수입니다.</p>
</td></tr></tbody></table>
<p></p>
