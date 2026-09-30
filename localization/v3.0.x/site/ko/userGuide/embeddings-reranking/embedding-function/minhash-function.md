---
id: minhash-function.md
title: MinHash 함수Compatible with Milvus 3.0.x
summary: 'MinHash를 사용하여 텍스트를 이진 벡터로 변환한 뒤, 자카드(Jaccard) 기반 유사도 검색 및 준중복 문서 탐지에 활용하십시오.'
beta: Milvus 3.0.x
---
<h1 id="MinHash-Function" class="common-anchor-header">MinHash 함수<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#MinHash-Function" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>MinHash 함수는</strong> 원본 텍스트를 문서 간의 <a href="https://en.wikipedia.org/wiki/Jaccard_index">자카드 유사도를</a> 근사하는 <strong>이진 벡터로</strong> 변환합니다. 이 함수는 텍스트 쉐이링 및 여러 해시 함수를 적용하여 고정 길이의 시그니처 벡터를 생성함으로써, 대규모 환경에서 빠른 유사 문서 탐지 및 문서 중복 제거를 가능하게 합니다.</p>
<p>내장 함수인 MinHash는 Milvus 내에서 실행되며, 외부 모델 추론이나 전처리가 필요하지 않습니다. 원본 텍스트를 입력하면 Milvus가 MinHash 시그니처 벡터를 자동으로 생성합니다.</p>
<h2 id="Limits" class="common-anchor-header">제한 사항<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>각 MinHash 시그니처는 32비트 해시 값이므로, 출력 필드는 <code translate="no">dim % 32 == 0</code> 조건을 충족하는 차원을 가진 <code translate="no">BINARY_VECTOR</code> 이어야 합니다.</p></li>
<li><p>이진 벡터 필드의 <code translate="no">dim</code> 는 <code translate="no">32 * num_hashes</code> 와 동일해야 합니다. 일치하지 않을 경우 오류가 발생합니다.</p></li>
<li><p><code translate="no">MINHASH_LSH</code> 인덱스를 MinHash 함수 출력과 함께 사용할 경우, <code translate="no">mh_element_bit_width</code> 는 <code translate="no">32</code> 로 설정되어야 합니다.</p></li>
</ul>
<h2 id="How-MinHash-works" class="common-anchor-header">MinHash의 작동 원리<button data-href="#How-MinHash-works" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>작동 원리 보기</summary></p>
<p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash는</a> 집합 간의 <a href="https://en.wikipedia.org/wiki/Jaccard_index">Jaccard 유사도를</a> 추정하는 국소성 민감 해싱 기법입니다. Milvus에서 MinHash 함수는 다음과 같은 파이프라인을 따릅니다. 사용자는 원본 텍스트를 입력으로 제공하면, Milvus는 이진 벡터를 출력으로 생성하며, 모든 중간 단계는 내부적으로 처리됩니다.</p>
<p>전체 워크플로는 문서 수집 및 쿼리 처리 모두에서 사용되는 <strong>공통 텍스트 처리 파이프라인으로</strong> 구성되며, 그 뒤를 이어 저장 및 검색을 위한 단계별 작업이 수행됩니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/minhash-function.png" alt="Iaqkbfeh8oqggsx6nsocfosondo" class="doc-image" id="iaqkbfeh8oqggsx6nsocfosondo" /> 
   <span>Iaqkbfeh8oqggsx6nsocfosondo</span>
  
 </span></p>
<h3 id="Shared-text-processing-pipeline" class="common-anchor-header">공유 텍스트 처리 파이프라인<button data-href="#Shared-text-processing-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>문서 수집과 쿼리 처리 모두 원본 텍스트를 동일한 4단계 변환 과정을 거칩니다:</p>
<ol>
<li><p><strong>텍스트 분석</strong>: 텍스트는 <a href="/docs/ko/analyzer-overview.md">분석기</a> ( <code translate="no">token_level</code> 가 <code translate="no">&quot;word&quot;</code> 인 경우)를 통해 처리되거나 직접 사용됩니다( <code translate="no">token_level</code> 가 <code translate="no">&quot;char&quot;</code> 인 경우). 단어 수준 토큰화는 입력 필드에 구성된 분석기를 적용하여 텍스트를 용어로 분할합니다. 예를 들어, <code translate="no">&quot;milvus is vector db&quot;</code> 는 <code translate="no">[&quot;milvus&quot;, &quot;is&quot;, &quot;vector&quot;, &quot;db&quot;]</code> 가 됩니다.</p></li>
<li><p><strong>싱글링(Shingling)</strong>: 토큰은 크기 <code translate="no">shingle_size</code> 인 중첩된 n-그램(싱글)으로 분할됩니다. 예를 들어, 단어 수준에서 3-그램을 사용하는 경우, 토큰 <code translate="no">[&quot;information&quot;, &quot;retrieval&quot;, &quot;is&quot;, &quot;a&quot;, &quot;field&quot;]</code> 은 <code translate="no">[&quot;information retrieval is&quot;, &quot;retrieval is a&quot;, &quot;is a field&quot;]</code> 과 같은 싱글이 됩니다.</p></li>
<li><p><strong>MinHash 서명 생성</strong>: 여러 해시 함수(H1, H2, …, Hn, 여기서 n = <code translate="no">num_hashes</code>)가 싱글 집합에 적용됩니다. 각 해시 함수에 대해, 모든 싱글에서 가장 작은 해시 값이 선택됩니다. 이러한 최소값들의 집합이 MinHash 서명을 형성하며, 이는 원본 문서의 자카드 유사도를 근사하는 고정 길이 표현입니다.</p></li>
<li><p><strong>이진 벡터 인코딩</strong>: 각 서명 값은 32비트 해시이며, 전체 서명은 차원 <code translate="no">32 * num_hashes</code> 의 <code translate="no">BINARY_VECTOR</code> 로 압축됩니다.</p></li>
</ol>
<h3 id="Document-ingestion" class="common-anchor-header">문서 수집<button data-href="#Document-ingestion" class="anchor-icon" translate="no">
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
    </button></h3><p>삽입 시, 공유 파이프라인에서 생성된 이진 벡터는 <code translate="no">MINHASH_LSH</code> 인덱스에 저장됩니다. 이 인덱스는 유사한 서명을 동일한 버킷으로 묶는 LSH(Locality-Sensitive Hashing) 테이블을 유지하여, 쿼리 시 후보를 빠르게 검색할 수 있도록 합니다.</p>
<h3 id="Query-processing" class="common-anchor-header">쿼리 처리<button data-href="#Query-processing" class="anchor-icon" translate="no">
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
    </button></h3><p>검색 시, 쿼리 텍스트는 동일한 공유 파이프라인을 거쳐 이진 벡터를 생성합니다. 이 벡터는 <code translate="no">MINHASH_LSH</code> 인덱스에서 LSH 조회를 수행하는 데 사용되며, 이를 통해 유사할 가능성이 높은 후보 쌍을 신속하게 식별합니다. Jaccard 정제 기능이 활성화되지 않은 경우, Milvus는 추정된 Jaccard 유사도에 따라 순위가 매겨지지 않은 LSH 후보들을 반환합니다. Jaccard 정교화 기능이 활성화되면, Milvus는 저장된 원시 MinHash 시그니처를 사용하여 추정된 Jaccard 유사도에 따라 후보를 순위 매기고 상위 K개 결과를 반환합니다.</p>
<p>두 경로 모두 동일한 변환 논리를 공유하기 때문에, 내용이 크게 중복되는 두 문서는 유사한 MinHash 시그니처를 생성합니다. 이로 인해 문서의 단어 순서, 서식 또는 사소한 표현이 다르더라도 준중복 문서를 효과적으로 찾을 수 있습니다.</p>
<p></details></p>
<h2 id="Before-you-start" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>MinHash 함수를 사용하기 전에, 다음 사항을 포함하도록 컬렉션 스키마를 계획하십시오:</p>
<ul>
<li><p><strong>원본 콘텐츠를 저장할 텍스트 필드</strong></p>
<p>컬렉션에는 원본 텍스트를 저장할 ` <code translate="no">VARCHAR</code> ` 필드가 반드시 포함되어야 합니다. 이 필드는 MinHash 함수의 입력으로 사용됩니다.</p></li>
<li><p><strong>텍스트 필드용 분석기</strong> (단어 수준 토큰화 사용 시)</p>
<p><code translate="no">token_level</code> 가 <code translate="no">&quot;word&quot;</code> (기본값)으로 설정된 경우, 텍스트 필드에는 분석기가 활성화되어 있어야 합니다. 분석기는 쉐이링(shingling) 전에 텍스트가 어떻게 토큰화될지를 정의합니다. 기본적으로 Milvus는 <code translate="no">standard</code> 분석기를 사용합니다. 다른 분석기를 구성하려면 <a href="/docs/ko/choose-the-right-analyzer-for-your-use-case.md">‘사용 사례에 적합한 분석기 선택’을</a> 참조하십시오.</p></li>
<li><p><strong>MinHash 출력을 위한 이진 벡터 필드</strong></p>
<p>컬렉션에는 MinHash 함수에 의해 생성된 이진 벡터를 저장하기 위한 ` <code translate="no">BINARY_VECTOR</code> ` 필드가 포함되어야 합니다. 차원은 ` <code translate="no">32 * num_hashes</code>`와 동일해야 합니다.</p></li>
</ul>
<h2 id="Step-1-Create-a-collection-with-a-MinHash-function" class="common-anchor-header">1단계: MinHash 함수가 포함된 컬렉션 생성<button data-href="#Step-1-Create-a-collection-with-a-MinHash-function" class="anchor-icon" translate="no">
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
    </button></h2><p>MinHash 함수를 사용하려면 컬렉션을 생성할 때 해당 함수를 정의해야 합니다. 이 함수는 컬렉션 스키마의 일부가 되며, 데이터 삽입 및 검색 시 자동으로 적용됩니다.</p>
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
    </button></h3><p>컬렉션 스키마에는 다음 세 가지 필드가 반드시 포함되어야 합니다.</p>
<ul>
<li><p><strong>기본 필드(Primary field</strong>): 컬렉션 내 각 엔티티를 고유하게 식별합니다.</p></li>
<li><p><strong>텍스트 필드</strong> (<code translate="no">VARCHAR</code>): 원시 텍스트 문서를 저장합니다. Milvus가 MinHash 서명 생성을 위해 텍스트를 처리할 수 있도록 ` <code translate="no">enable_analyzer=True</code> `를 설정하십시오. 기본적으로 Milvus는 텍스트 분석에 ` <code translate="no">standard</code> ` 분석기를 사용합니다. 다른 분석기를 구성하려면 <a href="/docs/ko/choose-the-right-analyzer-for-your-use-case.md">‘사용 사례에 적합한 분석기 선택’을</a> 참조하십시오.</p></li>
<li><p><strong>바이너리 벡터 필드</strong> (<code translate="no">BINARY_VECTOR</code>): MinHash 함수에 의해 자동 생성된 바이너리 벡터를 저장합니다. 차원은 <code translate="no">32 * num_hashes</code> 와 동일해야 합니다.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

schema = client.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;document_content&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>, enable_analyzer=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>, datatype=DataType.BINARY_VECTOR, dim=<span class="hljs-number">8192</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-the-MinHash-function" class="common-anchor-header">MinHash 함수 정의<button data-href="#Define-the-MinHash-function" class="anchor-icon" translate="no">
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
    </button></h3><p>MinHash 함수는 분석된 텍스트를 문서 간의 자카드 유사도를 근사화하는 이진 벡터로 변환합니다.</p>
<p>함수를 정의하고 스키마에 추가하세요:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">minhash_function = Function(
    name=<span class="hljs-string">&quot;minhash_function&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document_content&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text</span>
    output_field_names=[<span class="hljs-string">&quot;binary_vector&quot;</span>], <span class="hljs-comment"># Name of the BINARY_VECTOR field for generated signatures</span>
    function_type=FunctionType.MINHASH,
    params={
        <span class="hljs-string">&quot;num_hashes&quot;</span>: <span class="hljs-number">256</span>, <span class="hljs-comment"># Number of hash functions; produces dim = 32 * 256 = 8192</span>
        <span class="hljs-string">&quot;shingle_size&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-comment"># N-gram size for shingling</span>
    }
)

schema.add_function(minhash_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>구성 옵션</strong></p>
<p>MinHash 함수의 ` <code translate="no">params</code> ` 사전은 다음 매개변수를 지원합니다. 모든 매개변수 이름은 <strong>대소문자를 구분하지</strong> 않습니다.</p>
<table>
   <tr>
     <th><p><strong>매개변수</strong></p></th>
     <th><p><strong>유형</strong></p></th>
     <th><p><strong>기본값</strong></p></th>
     <th><p><strong>설명</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">num_hashes</code></p></td>
     <td><p>int</p></td>
     <td><p>파생됨 <code translate="no">dim / 32</code></p></td>
     <td><p>서명 생성을 위한 해시 함수의 개수입니다. 출력 이진 벡터의 차원은 <code translate="no">32 &ast; num_hashes</code> 와 같습니다. 값이 클수록 유사도 추정 시 분산은 줄어들지만 계산량은 증가합니다. 권장값: <code translate="no">256</code> (차원 = 8192).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">shingle_size</code></p></td>
     <td><p>int</p></td>
     <td><p><code translate="no">3</code></p></td>
     <td><p>싱글링(shingling)에 사용되는 N-그램 크기. 단어 수준: 일반적으로 1~3입니다. 문자 수준: 일반적으로 2~6입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">hash_function</code></p></td>
     <td><p>str</p></td>
     <td><p><code translate="no">"xxhash"</code></p></td>
     <td><p>사용할 해시 함수. 옵션: </p><ul><li><p><code translate="no">"xxhash"</code> (빠름)</p></li><li><p><code translate="no">"sha1"</code> (속도는 느리지만, 충돌 저항성이 높음).</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">token_level</code></p></td>
     <td><p>str</p></td>
     <td><p><code translate="no">"word"</code></p></td>
     <td><p>토큰화 수준. 옵션:</p><ul><li><p><code translate="no">"word"</code>: 토큰화를 위해 필드의 분석기를 사용한 다음, n-그램 싱글링을 적용합니다.</p></li><li><p><code translate="no">"char"</code> / <code translate="no">"character"</code>: 원시 문자에 직접 n-그램 싱글링을 적용합니다(분석기 없음).</p><p>단어 수준은 더 강력한 의미론과 높은 효율성을 제공하지만, 언어별 토큰화에 의존합니다. 문자 수준은 언어에 구애받지 않지만, 의미론은 약하고 차원이 더 높은 싱글을 생성합니다.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">seed</code></p></td>
     <td><p>int</p></td>
     <td><p><code translate="no">1234</code></p></td>
     <td><p>MinHash 함수 초기화를 위한 난수 시드입니다.</p></td>
   </tr>
</table>
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
    </button></h3><p>MinHash 이진 벡터에 권장되는 인덱스 유형은 <code translate="no">MINHASH_LSH</code> 이며, 메트릭 유형은 <code translate="no">MHJACCARD</code> 입니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: <span class="hljs-number">32</span>,
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>검색 시 Jaccard 정밀화(Jaccard refinement)를 사용할 경우, ` <code translate="no">with_raw_data</code> `를 ` <code translate="no">True</code> `로 설정하십시오. LSH 조회 결과로 반환된 후보에 대한 예상 Jaccard 유사도를 계산하려면 원시 MinHash 시그니처가 필요합니다.</p>
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
    </button></h3><p>위에서 정의한 스키마 및 인덱스 매개변수를 사용하여 컬렉션을 생성합니다:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;dedup_collection&quot;</span>,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Insert-documents" class="common-anchor-header">2단계: 문서 삽입<button data-href="#Step-2-Insert-documents" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션을 설정한 후 텍스트 데이터를 삽입합니다. 원시 텍스트만 제공하면 됩니다. MinHash 함수가 각 문서에 대한 이진 벡터를 자동으로 생성합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.insert(
    <span class="hljs-string">&quot;dedup_collection&quot;</span>,
    [
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a field of study that helps users find relevant information in large datasets&quot;</span>},
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>},
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a field of research helping users search for relevant information in large datasets&quot;</span>},
    ],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Search-with-MinHash" class="common-anchor-header">3단계: MinHash를 사용하여 검색<button data-href="#Step-3-Search-with-MinHash" class="anchor-icon" translate="no">
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
    </button></h2><p>데이터를 삽입한 후, 원본 텍스트 쿼리를 제공하여 준중복 문서를 검색하세요. Milvus는 각 쿼리를 자동으로 MinHash 이진 벡터로 변환합니다. Jaccard 정밀화 기능을 활성화하면 추정된 Jaccard 유사도에 따라 LSH 후보들의 순위를 매길 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>: <span class="hljs-literal">True</span>,
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">3</span>,
    },
}

results = client.search(
    collection_name=<span class="hljs-string">&quot;dedup_collection&quot;</span>,
    data=[<span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document_content&quot;</span>],
    search_params=search_params,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;ID: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, Distance: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Document: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document_content&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">mh_search_with_jaccard</code> 를 <code translate="no">True</code> 로 설정하여 Jaccard 정제 기능을 활성화합니다. <code translate="no">refine_k</code> 는 정제에 사용되는 후보 풀의 용량을 제어합니다. Milvus는 <code translate="no">max(refine_k, limit)</code> 를 용량으로 사용하지만, LSH 조회 결과 일치 항목이 적을 경우 더 적은 수의 후보만 정제할 수 있습니다. <code translate="no">refine_k</code> 를 늘리면 추가 계산 비용이 발생하지만 결과 품질이 향상될 수 있습니다.</p>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/ko/full-text-search.md">전체 텍스트 검색</a>: 근사 중복 탐지 대신 어휘적 관련성 순위를 매기기 위해 BM25를 사용합니다.</p></li>
<li><p><a href="/docs/ko/analyzer-overview.md">분석기 개요</a>: 텍스트 토큰화를 위해 사용자 정의 분석기를 구성합니다.</p></li>
<li><p><a href="/docs/ko/minhash-lsh.md">MINHASH_LSH 인덱스</a>: 리콜 및 성능을 위한 LSH 매개변수 튜닝에 대해 알아보세요.</p></li>
</ul>
