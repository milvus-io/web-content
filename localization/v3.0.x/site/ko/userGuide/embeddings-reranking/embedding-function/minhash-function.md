---
id: minhash-function.md
title: MinHash 함수Compatible with Milvus 3.0.x
summary: MinHash를 사용하여 텍스트를 이진 벡터로 변환하여 Jaccard 기반 유사도 검색 및 중복에 가까운 검색을 수행합니다.
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
    </button></h1><p><strong>MinHash 함수는</strong> 원시 텍스트를 <strong>이진 벡터로</strong> 변환하여 문서 간의 <a href="https://en.wikipedia.org/wiki/Jaccard_index">Jaccard 유사성을</a> 대략적으로 계산합니다. 텍스트 슁글과 다중 해시 함수를 적용하여 고정 길이의 서명 벡터를 생성함으로써 대규모로 빠르게 중복에 가까운 문서를 감지하고 중복 제거를 수행할 수 있습니다.</p>
<p>내장된 기능인 MinHash는 Milvus 내에서 실행되며 외부 모델 추론이나 전처리가 필요하지 않습니다. 원시 텍스트를 삽입하기만 하면 Milvus가 MinHash 서명 벡터를 자동으로 생성합니다.</p>
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
<li><p>출력 필드는 <code translate="no">dim % 32 == 0</code> 을 만족하는 치수를 가진 <code translate="no">BINARY_VECTOR</code> 여야 합니다. 각 MinHash 서명은 32비트 해시 값이기 때문입니다.</p></li>
<li><p>이진 벡터 필드의 <code translate="no">dim</code> 은 <code translate="no">32 * num_hashes</code> 과 같아야 합니다. 불일치하면 오류가 발생합니다.</p></li>
<li><p>MinHash 함수 출력으로 <code translate="no">MINHASH_LSH</code> 인덱스를 사용하는 경우 <code translate="no">mh_element_bit_width</code> 을 <code translate="no">32</code> 으로 설정해야 합니다.</p></li>
</ul>
<h2 id="How-MinHash-works" class="common-anchor-header">MinHash 작동 방식<button data-href="#How-MinHash-works" class="anchor-icon" translate="no">
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
<p><summary>작동 방식을 보려면 확장하세요.</summary></p>
<p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash는</a> 집합 간의 <a href="https://en.wikipedia.org/wiki/Jaccard_index">Jaccard 유사성을</a> 추정하는 로컬리티에 민감한 해싱 기법입니다. 사용자가 원시 텍스트를 입력으로 제공하면 Milvus는 이진 벡터를 출력으로 생성하여 모든 중간 단계를 내부적으로 처리하는 이 파이프라인을 따라 MinHash 함수가 작동합니다.</p>
<p>전체 워크플로는 문서 수집과 쿼리 처리 모두에 사용되는 <strong>공유 텍스트 처리 파이프라인과</strong> 저장 및 검색을 위한 단계별 작업으로 구성됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/minhash-function.png" alt="Iaqkbfeh8oqggsx6nsocfosondo" class="doc-image" id="iaqkbfeh8oqggsx6nsocfosondo" />
   </span> <span class="img-wrapper"> <span>전체</span> </span>보기</p>
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
    </button></h3><p>문서 수집과 쿼리 처리 모두 동일한 4단계 변환을 통해 원시 텍스트를 전달합니다:</p>
<ol>
<li><p><strong>텍스트 분석</strong>: 텍스트는 <a href="/docs/ko/analyzer-overview.md">분석기에</a> 의해 처리되거나( <code translate="no">token_level</code> 가 <code translate="no">&quot;word&quot;</code> 일 때) 직접 사용됩니다( <code translate="no">token_level</code> 가 <code translate="no">&quot;char&quot;</code> 일 때). 단어 수준 토큰화는 입력 필드에 구성된 분석기를 적용하여 텍스트를 용어로 분할합니다(예: <code translate="no">&quot;milvus is vector db&quot;</code> 은 <code translate="no">[&quot;milvus&quot;, &quot;is&quot;, &quot;vector&quot;, &quot;db&quot;]</code> 이 됩니다).</p></li>
<li><p>대상<strong>포진</strong>: 토큰은 n-그램(대상 포진) 크기의 겹치는 n-그램(대상 포진)으로 분할됩니다( <code translate="no">shingle_size</code>). 예를 들어, 단어 수준이 3그램인 경우 <code translate="no">[&quot;information&quot;, &quot;retrieval&quot;, &quot;is&quot;, &quot;a&quot;, &quot;field&quot;]</code> 토큰은 <code translate="no">[&quot;information retrieval is&quot;, &quot;retrieval is a&quot;, &quot;is a field&quot;]</code> 과 같은 대상포진이 됩니다.</p></li>
<li><p><strong>MinHash 서명 생성</strong>: 여러 해시 함수(H1, H2, ..., Hn, 여기서 n = <code translate="no">num_hashes</code>)가 싱글 세트에 적용됩니다. 각 해시 함수에 대해 모든 지붕 널에 대한 최소 해시 값이 선택됩니다. 이러한 최소값의 모음은 원본 문서의 Jaccard 유사성을 근사화하는 고정 길이 표현인 MinHash 서명을 형성합니다.</p></li>
<li><p><strong>이진 벡터 인코딩</strong>: 각 서명 값은 32비트 해시이며, 전체 서명은 <code translate="no">32 * num_hashes</code> 크기의 <code translate="no">BINARY_VECTOR</code> 에 압축됩니다.</p></li>
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
    </button></h3><p>삽입하는 동안 공유 파이프라인에서 생성된 바이너리 벡터는 <code translate="no">MINHASH_LSH</code> 인덱스에 저장됩니다. 이 인덱스는 유사한 서명을 동일한 버킷으로 그룹화하여 쿼리 시 후보를 빠르게 검색할 수 있는 LSH(지역 민감 해싱) 테이블을 유지합니다.</p>
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
    </button></h3><p>검색 중에 쿼리 텍스트는 동일한 공유 파이프라인을 거쳐 바이너리 벡터를 생성합니다. 이 벡터는 <code translate="no">MINHASH_LSH</code> 인덱스에서 LSH 조회를 수행하는 데 사용되어 유사할 가능성이 있는 후보 쌍을 빠르게 식별합니다. 그런 다음 예상되는 Jaccard 유사도에 따라 후보의 순위를 매기고 상위 K 결과를 반환합니다.</p>
<p>두 경로 모두 동일한 변환 로직을 공유하기 때문에 콘텐츠가 매우 겹치는 두 문서는 유사한 MinHash 서명을 생성합니다. 따라서 이 기능은 문서의 어순, 서식 또는 사소한 문구가 다른 경우에도 중복에 가까운 문서를 찾는 데 효과적입니다.</p>
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
    </button></h2><p>MinHash 함수를 사용하기 전에 다음을 포함하도록 컬렉션 스키마를 계획하세요:</p>
<ul>
<li><p><strong>원시 콘텐츠를 위한 텍스트 필드</strong></p>
<p>컬렉션에는 원시 텍스트를 저장하기 위한 <code translate="no">VARCHAR</code> 필드가 포함되어야 합니다. 이 필드는 MinHash 함수에 대한 입력으로 사용됩니다.</p></li>
<li><p><strong>텍스트 필드를 위한 분석기</strong> (단어 수준 토큰화를 사용하는 경우)</p>
<p><code translate="no">token_level</code> 가 <code translate="no">&quot;word&quot;</code> (기본값)으로 설정된 경우 텍스트 필드에 분석기가 활성화되어 있어야 합니다. 분석기는 텍스트가 토큰화되기 전에 토큰화되는 방식을 정의합니다. 기본적으로 Milvus는 <code translate="no">standard</code> 분석기를 사용합니다. 다른 분석기를 구성하려면 <a href="/docs/ko/choose-the-right-analyzer-for-your-use-case.md">사용 사례에 적합한 분석기 선택을</a> 참조하세요.</p></li>
<li><p><strong>MinHash 출력을 위한 바이너리 벡터 필드</strong></p>
<p>컬렉션에는 MinHash 함수에 의해 생성된 바이너리 벡터를 저장할 <code translate="no">BINARY_VECTOR</code> 필드가 포함되어야 합니다. 차원은 <code translate="no">32 * num_hashes</code> 와 같아야 합니다.</p></li>
</ul>
<h2 id="Step-1-Create-a-collection-with-a-MinHash-function" class="common-anchor-header">1단계: MinHash 함수를 사용하여 컬렉션 만들기<button data-href="#Step-1-Create-a-collection-with-a-MinHash-function" class="anchor-icon" translate="no">
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
    </button></h2><p>MinHash 함수를 사용하려면 컬렉션을 만들 때 정의합니다. 이 함수는 컬렉션 스키마의 일부가 되어 데이터 삽입 및 검색 중에 자동으로 적용됩니다.</p>
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
    </button></h3><p>컬렉션 스키마에는 최소 3개의 필드가 포함되어야 합니다:</p>
<ul>
<li><p><strong>기본 필드</strong>: 컬렉션의 각 엔티티를 고유하게 식별합니다.</p></li>
<li><p><strong>텍스트 필드</strong> (<code translate="no">VARCHAR</code>): 원시 텍스트 문서를 저장합니다. Milvus가 MinHash 서명 생성을 위해 텍스트를 처리할 수 있도록 <code translate="no">enable_analyzer=True</code> 을 설정합니다. 기본적으로 Milvus는 텍스트 분석에 <code translate="no">standard</code> 분석기를 사용합니다. 다른 분석기를 구성하려면 <a href="/docs/ko/choose-the-right-analyzer-for-your-use-case.md">사용 사례에 적합한 분석기 선택을</a> 참조하세요.</p></li>
<li><p><strong>바이너리 벡터 필드</strong> (<code translate="no">BINARY_VECTOR</code>): MinHash 함수에 의해 자동으로 생성된 바이너리 벡터를 저장합니다. 차원은 <code translate="no">32 * num_hashes</code> 와 같아야 합니다.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
    </button></h3><p>MinHash 함수는 분석된 텍스트를 문서 간의 Jaccard 유사성을 근사화하는 이진 벡터로 변환합니다.</p>
<p>함수를 정의하고 스키마에 추가하세요:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<p>MinHash 함수의 <code translate="no">params</code> 딕셔너리는 다음 매개변수를 허용합니다. 모든 매개변수 이름은 <strong>대소문자를 구분하지</strong> 않습니다.</p>
<table>
   <tr>
     <th><p><strong>파라미터</strong></p></th>
     <th><p><strong>유형</strong></p></th>
     <th><p><strong>기본값</strong></p></th>
     <th><p><strong>설명</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">num_hashes</code></p></td>
     <td><p>int</p></td>
     <td><p>다음에서 파생됩니다. <code translate="no">dim / 32</code></p></td>
     <td><p>서명 생성을 위한 해시 함수의 개수입니다. 출력 바이너리 벡터 차원은 <code translate="no">32 &ast; num_hashes</code> 입니다. 값이 클수록 유사도 추정에서 분산이 줄어들지만 계산이 증가합니다. 권장: <code translate="no">256</code> (dim = 8192).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">shingle_size</code></p></td>
     <td><p>int</p></td>
     <td><p><code translate="no">3</code></p></td>
     <td><p>대상 포진에 대한 N-그램 크기입니다. 단어 수준: 1-3이 일반적입니다. 문자 수준: 2-6이 일반적입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">hash_function</code></p></td>
     <td><p>str</p></td>
     <td><p><code translate="no">"xxhash"</code></p></td>
     <td><p>사용할 해시 함수입니다. 옵션: </p><ul><li><p><code translate="no">"xxhash"</code> (빠름)</p></li><li><p><code translate="no">"sha1"</code> (느리고, 충돌 저항성이 높음).</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">token_level</code></p></td>
     <td><p>str</p></td>
     <td><p><code translate="no">"word"</code></p></td>
     <td><p>토큰화 수준. 옵션:</p><ul><li><p><code translate="no">"word"</code>: 필드의 분석기를 사용하여 토큰화한 다음 n-그램 슁글링을 적용합니다.</p></li><li><p><code translate="no">"char"</code> / <code translate="no">"character"</code>: 원시 문자에 직접 n-그램 슁글링을 적용합니다(분석기 없음).</p><p>단어 수준은 더 강력한 의미론과 더 높은 효율성을 제공하지만 언어별 토큰화에 따라 달라집니다. 문자 수준은 언어에 구애받지 않지만 더 약한 의미론으로 더 높은 차원의 슁글을 생성합니다.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">seed</code></p></td>
     <td><p>int</p></td>
     <td><p><code translate="no">1234</code></p></td>
     <td><p>MinHash 함수 초기화를 위한 임의의 시드입니다.</p></td>
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
    </button></h3><p>MinHash 바이너리 벡터에 권장되는 인덱스 유형은 <code translate="no">MINHASH_LSH</code> 이며, 메트릭 유형은 <code translate="no">MHJACCARD</code> 입니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
    </button></h3><p>위에 정의된 스키마 및 인덱스 파라미터를 사용하여 컬렉션을 생성합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
    </button></h2><p>컬렉션을 설정한 후 텍스트 데이터를 삽입합니다. MinHash 함수가 각 문서에 대한 바이너리 벡터를 자동으로 생성하므로 원시 텍스트만 제공하면 됩니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<h2 id="Step-3-Search-with-MinHash" class="common-anchor-header">3단계: MinHash로 검색<button data-href="#Step-3-Search-with-MinHash" class="anchor-icon" translate="no">
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
    </button></h2><p>데이터를 삽입한 후에는 원시 텍스트 쿼리를 제공하여 중복에 가까운 문서를 검색합니다. Milvus는 자동으로 쿼리 텍스트를 MinHash 바이너리 벡터로 변환하고 추정된 Jaccard 유사도를 사용하여 가장 유사한 문서를 검색합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
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
<li><p><a href="/docs/ko/full-text-search.md">전체 텍스트 검색</a>: 중복에 가까운 탐지 대신 어휘 관련성 순위를 매기는 데 BM25를 사용하세요.</p></li>
<li><p><a href="/docs/ko/analyzer-overview.md">분석기 개요</a>: 텍스트 토큰화를 위한 사용자 정의 분석기를 구성하세요.</p></li>
<li><p><a href="/docs/ko/minhash-lsh.md">MINHASH_LSH 색인</a>: 리콜 및 성능을 위한 LSH 매개변수 조정에 대해 알아보세요.</p></li>
</ul>
