---
id: schema.md
title: 스키마 설명
summary: >-
  스키마는 컬렉션의 데이터 구조를 정의합니다. 컬렉션을 만들기 전에 컬렉션의 스키마를 설계해야 합니다. 이 페이지는 컬렉션 스키마를 이해하고
  직접 스키마 예제를 디자인하는 데 도움이 됩니다.
---
<h1 id="Schema-Explained​" class="common-anchor-header">스키마 설명<button data-href="#Schema-Explained​" class="anchor-icon" translate="no">
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
    </button></h1><p>스키마는 컬렉션의 데이터 구조를 정의합니다. 컬렉션을 만들기 전에 컬렉션의 스키마를 설계해야 합니다. 이 페이지는 컬렉션 스키마를 이해하고 직접 스키마 예제를 디자인하는 데 도움이 됩니다.</p>
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
    </button></h2><p>Milvus에서 컬렉션 스키마는 관계형 데이터베이스에서 테이블을 조립하여 Milvus가 컬렉션의 데이터를 구성하는 방법을 정의합니다. </p>
<p>잘 설계된 스키마는 데이터 모델을 추상화하고 검색을 통해 비즈니스 목표를 달성할 수 있는지 여부를 결정하기 때문에 필수적입니다. 또한 컬렉션에 삽입되는 모든 데이터 행은 스키마를 따라야 하므로 데이터 일관성과 장기적인 품질을 유지하는 데 도움이 됩니다. 기술적 관점에서 보면, 잘 정의된 스키마는 잘 정리된 컬럼 데이터 저장과 깔끔한 인덱스 구조로 이어져 검색 성능을 향상시킵니다.</p>
<p>컬렉션 스키마에는 기본 키, 최대 4개의 벡터 필드, 여러 개의 스칼라 필드가 있습니다. 다음 다이어그램은 문서를 스키마 필드 목록에 매핑하는 방법을 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-explained.png" alt="Schema design" class="doc-image" id="schema-design" />
   </span> <span class="img-wrapper"> <span>스키마 디자인</span> </span></p>
<p>검색 시스템의 데이터 모델 설계에는 비즈니스 요구 사항을 분석하고 스키마로 표현된 데이터 모델로 정보를 추상화하는 작업이 포함됩니다. 예를 들어, 텍스트를 검색하려면 '임베딩'을 통해 리터럴 문자열을 벡터로 변환하고 벡터 검색을 활성화하여 '색인화'해야 합니다. 이 필수 요건 외에도 게시 타임스탬프나 작성자 같은 다른 속성을 저장해야 할 수도 있습니다. 이 메타데이터를 사용하면 필터링을 통해 시맨틱 검색을 세분화하여 특정 날짜 이후에 또는 특정 작성자가 게시한 텍스트만 반환할 수 있습니다. 또한 이러한 스칼라를 기본 텍스트와 함께 검색하여 애플리케이션에서 검색 결과를 렌더링할 수도 있습니다. 이러한 텍스트 조각을 구성하기 위해 각각에 정수 또는 문자열로 표현되는 고유 식별자를 할당해야 합니다. 이러한 요소는 정교한 검색 로직을 구현하는 데 필수적입니다.</p>
<p>스키마 <a href="/docs/ko/v2.5.x/schema-hands-on.md">디자인 실습을</a> 참조하여 잘 설계된 스키마를 만드는 방법을 알아보세요.</p>
<h2 id="Create-Schema​" class="common-anchor-header">스키마 만들기<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 코드 스니펫은 스키마를 만드는 방법을 보여줍니다.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
schema = MilvusClient.create_schema()​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> schema = []​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export schema='{​
    &quot;fields&quot;: []​
}'​

</code></pre>
<h2 id="Add-Primary-Field​" class="common-anchor-header">기본 필드 추가<button data-href="#Add-Primary-Field​" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션의 기본 필드는 엔티티를 고유하게 식별합니다. <strong>Int64</strong> 또는 <strong>VarChar</strong> 값만 허용합니다. 다음 코드 스니펫은 기본 필드를 추가하는 방법을 보여줍니다.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,​
    datatype=DataType.INT64,​
<span class="highlighted-comment-line">    is_primary=<span class="hljs-literal">True</span>,​</span>
<span class="highlighted-comment-line">    auto_id=<span class="hljs-literal">False</span>,​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq; ​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)​
        .dataType(DataType.Int64)​
<span class="highlighted-comment-line">        .isPrimaryKey(<span class="hljs-literal">true</span>)​</span>
<span class="highlighted-comment-line">        .autoID(<span class="hljs-literal">false</span>)​</span>
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
<span class="highlighted-comment-line">    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>​</span>
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export primaryField='{​
    &quot;fieldName&quot;: &quot;my_id&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}'​
​
export schema='{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField​
    ]​
}'​

</code></pre>
<p>필드를 추가할 때 <code translate="no">is_primary</code> 속성을 <code translate="no">True</code> 으로 설정하여 해당 필드가 기본 필드임을 명시적으로 명확히 할 수 있습니다. 기본 필드는 기본적으로 <strong>Int64</strong> 값을 허용합니다. 이 경우 기본 필드 값은 <code translate="no">12345</code> 과 유사한 정수여야 합니다. 기본 필드에 <strong>VarChar</strong> 값을 사용하도록 선택한 경우 값은 <code translate="no">my_entity_1234</code> 과 유사한 문자열이어야 합니다.</p>
<p>또한 <code translate="no">autoId</code> 속성을 <code translate="no">True</code> 으로 설정하여 데이터 삽입 시 Milvus가 자동으로 기본 필드 값을 할당하도록 할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/v2.5.x/primary-field.md">기본 필드 및 자동 ID를</a> 참조하세요.</p>
<h2 id="Add-Vector-Fields​" class="common-anchor-header">벡터 필드 추가<button data-href="#Add-Vector-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>벡터 필드는 다양한 희소 및 고밀도 벡터 임베딩을 허용합니다. Milvus에서는 컬렉션에 4개의 벡터 필드를 추가할 수 있습니다. 다음 코드 스니펫은 벡터 필드를 추가하는 방법을 보여줍니다.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>,​
    datatype=DataType.FLOAT_VECTOR,​
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">5</span>​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)​
        .dataType(DataType.FloatVector)​
<span class="highlighted-wrapper-line">        .dimension(<span class="hljs-number">5</span>)​</span>
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
<span class="highlighted-wrapper-line">    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>​</span>
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export vectorField='{​
    &quot;fieldName&quot;: &quot;my_vector&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 5​
    }​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField​
    ]​
}&quot;​

</code></pre>
<p>위 코드 스니펫의 <code translate="no">dim</code> 매개 변수는 벡터 필드에 포함될 벡터 임베딩의 차원을 나타냅니다. <code translate="no">FLOAT_VECTOR</code> 값은 벡터 필드에 일반적으로 역수를 나타내는 데 사용되는 32비트 부동 소수점 목록이 들어 있음을 나타내며, 이 외에도 Milvus는 다음 유형의 벡터 임베딩을 지원합니다.</p>
<ul>
<li><p><code translate="no">FLOAT16_VECTOR</code></p>
<p>이 유형의 벡터 필드는 16비트 반정밀도 부동 소수점 목록을 보유하며 일반적으로 메모리 또는 대역폭이 제한된 딥 러닝 또는 GPU 기반 컴퓨팅 시나리오에 적용됩니다.</p></li>
<li><p><code translate="no">BFLOAT16_VECTOR</code></p>
<p>이 유형의 벡터 필드에는 정밀도는 떨어지지만 지수 범위는 Float32와 동일한 16비트 부동 소수점 숫자 목록이 들어 있습니다. 이러한 유형의 데이터는 정확도에 큰 영향을 주지 않으면서 메모리 사용량을 줄여주기 때문에 딥 러닝 시나리오에서 일반적으로 사용됩니다.</p></li>
<li><p><code translate="no">BINARY_VECTOR</code></p>
<p>이 유형의 벡터 필드에는 0과 1의 목록이 들어 있습니다. 이미지 처리 및 정보 검색 시나리오에서 데이터를 표현하기 위한 간결한 기능으로 사용됩니다.</p></li>
<li><p><code translate="no">SPARSE_FLOAT_VECTOR</code></p>
<p>이 유형의 벡터 필드에는 0이 아닌 숫자의 목록과 그 시퀀스 번호가 저장되어 희소 벡터 임베딩을 나타냅니다.</p></li>
</ul>
<h2 id="Add-Scalar-Fields​" class="common-anchor-header">스칼라 필드 추가<button data-href="#Add-Scalar-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>일반적인 경우, 스칼라 필드를 사용하여 Milvus에 저장된 벡터 임베딩의 메타데이터를 저장하고 메타데이터 필터링을 통해 ANN 검색을 수행하여 검색 결과의 정확성을 향상시킬 수 있습니다. Milvus는 <strong>VarChar</strong>, <strong>Boolean</strong>, <strong>Int</strong>, Float, <strong>Double</strong>, <strong>Array</strong>, JSON 등 여러 스칼라 필드 유형을 지원합니다.</p>
<h3 id="Add-String-Fields​" class="common-anchor-header">문자열 필드 추가</h3><p>Milvus에서는 VarChar 필드를 사용하여 문자열을 저장할 수 있습니다. VarChar 필드에 대한 자세한 내용은 <a href="/docs/ko/v2.5.x/string.md">문자열 필드를</a> 참조하십시오.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>,​
    datatype=DataType.VARCHAR,​
<span class="highlighted-wrapper-line">    max_length=<span class="hljs-number">512</span>​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)​
        .dataType(DataType.VarChar)​
<span class="highlighted-wrapper-line">        .maxLength(<span class="hljs-number">512</span>)​</span>
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
<span class="highlighted-wrapper-line">    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>​</span>
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export varCharField='{​
    &quot;fieldName&quot;: &quot;my_varchar&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 256​
    }​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField,​
        $varCharField​
    ]​
}&quot;​

</code></pre>
<h3 id="Add-Number-Fields​" class="common-anchor-header">숫자 필드 추가</h3><p>Milvus가 지원하는 숫자 유형은 <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, <code translate="no">Double</code> 입니다. 숫자 필드에 대한 자세한 내용은 <a href="/docs/ko/v2.5.x/number.md">숫자 필드를</a> 참조하세요.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_int64&quot;</span>,​
    datatype=DataType.INT64,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_int64&quot;</span>)​
        .dataType(DataType.Int64)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_int64&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export int64Field='{​
    &quot;fieldName&quot;: &quot;my_int64&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField,​
        $varCharField,​
        $int64Field​
    ]​
}&quot;​

</code></pre>
<h3 id="Add-Boolean-Fields​" class="common-anchor-header">부울 필드 추가</h3><p>Milvus는 부울 필드를 지원합니다. 다음 코드 스니펫은 부울 필드를 추가하는 방법을 보여줍니다.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_bool&quot;</span>,​
    datatype=DataType.BOOL,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_bool&quot;</span>)​
        .dataType(DataType.Bool)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_bool&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Boolean</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export boolField='{​
    &quot;fieldName&quot;: &quot;my_bool&quot;,​
    &quot;dataType&quot;: &quot;Boolean&quot;​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField,​
        $varCharField,​
        $int64Field,​
        $boolField​
    ]​
}&quot;​

</code></pre>
<h3 id="Add-JSON-fields​" class="common-anchor-header">JSON 필드 추가</h3><p>JSON 필드는 일반적으로 반구조화된 JSON 데이터를 저장합니다. JSON 필드에 대한 자세한 내용은 <a href="/docs/ko/v2.5.x/use-json-fields.md">JSON 필드를</a> 참조하세요.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_json&quot;</span>,​
    datatype=DataType.JSON,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_json&quot;</span>)​
        .dataType(DataType.JSON)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_json&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export jsonField='{​
    &quot;fieldName&quot;: &quot;my_json&quot;,​
    &quot;dataType&quot;: &quot;JSON&quot;​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField,​
        $varCharField,​
        $int64Field,​
        $boolField,​
        $jsonField​
    ]​
}&quot;​

</code></pre>
<h3 id="Add-Array-Fields​" class="common-anchor-header">배열 필드 추가</h3><p>배열 필드는 요소 목록을 저장합니다. 배열 필드에 있는 모든 요소의 데이터 유형은 동일해야 합니다. 배열 필드에 대한 자세한 내용은 배열 <a href="/docs/ko/v2.5.x/array_data_type.md">필드를</a> 참조하세요.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_array&quot;</span>,​
    datatype=DataType.ARRAY,​
    element_type=DataType.VARCHAR,​
    max_capacity=<span class="hljs-number">5</span>,​
    max_length=<span class="hljs-number">512</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_array&quot;</span>)​
        .dataType(DataType.Array)​
        .elementType(DataType.VarChar)​
        .maxCapacity(<span class="hljs-number">5</span>)​
        .maxLength(<span class="hljs-number">512</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_array&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,​
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>,​
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export arrayField='{​
    &quot;fieldName&quot;: &quot;my_array&quot;,​
    &quot;dataType&quot;: &quot;Array&quot;,​
    &quot;elementDataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 512​
    }​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField,​
        $varCharField,​
        $int64Field,​
        $boolField,​
        $jsonField,​
        $arrayField​
    ]​
}&quot;​

</code></pre>
<p></p>
