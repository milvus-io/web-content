---
id: scalar_index.md
related_key: scalar_index
summary: Milvus의 스칼라 인덱스.
title: 스칼라 인덱스
---
<h1 id="Scalar-Index" class="common-anchor-header">스칼라 인덱스<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 스칼라 필드와 벡터 필드를 결합한 필터링된 검색을 지원합니다. 스칼라 필드와 관련된 검색의 효율성을 높이기 위해 Milvus는 버전 2.1.0부터 스칼라 필드 인덱싱을 도입했습니다. 이 문서에서는 Milvus의 스칼라 필드 인덱싱에 대한 개요를 제공하여 그 중요성과 구현을 이해하는 데 도움을 드립니다.</p>
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
    </button></h2><p>Milvus에서 벡터 유사도 검색을 수행한 후에는 논리 연산자를 사용하여 스칼라 필드를 부울 표현식으로 구성할 수 있습니다.</p>
<p>이러한 부울 식이 포함된 검색 요청을 받으면 Milvus는 부울 식을 추상 구문 트리(AST)로 구문 분석하여 속성 필터링을 위한 물리적 계획을 생성합니다. 그런 다음 Milvus는 각 세그먼트에 물리적 계획을 적용하여 필터링 결과인 <a href="/docs/ko/v2.4.x/bitset.md">비트셋을</a> 생성하고 그 결과를 벡터 검색 매개변수로 포함시켜 검색 범위를 좁힙니다. 이 경우 벡터 검색의 속도는 속성 필터링의 속도에 크게 좌우됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scalar_index.png" alt="Attribute filtering in a segment" class="doc-image" id="attribute-filtering-in-a-segment" />
   </span> <span class="img-wrapper"> <span>세그먼트의 속성 필터링</span> </span></p>
<p>스칼라 필드 인덱싱은 정보 검색을 가속화하기 위해 스칼라 필드 값을 특정 방식으로 정렬하여 속성 필터링 속도를 보장하는 방법입니다.</p>
<h2 id="Scalar-field-indexing-algorithms" class="common-anchor-header">스칼라 필드 인덱싱 알고리즘<button data-href="#Scalar-field-indexing-algorithms" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 스칼라 필드 인덱싱 알고리즘을 통해 낮은 메모리 사용량, 높은 필터링 효율성, 짧은 로딩 시간을 달성하는 것을 목표로 합니다. 이러한 알고리즘은 <a href="#auto-indexing">자동 인덱싱과</a> <a href="#inverted-indexing">역 인덱싱의</a> 두 가지 주요 유형으로 분류됩니다.</p>
<h3 id="Auto-indexing" class="common-anchor-header">자동 인덱싱</h3><p>Milvus는 인덱스 유형을 수동으로 선택할 필요가 없도록 <code translate="no">AUTOINDEX</code> 옵션을 제공합니다. <code translate="no">create_index</code> 메서드를 호출할 때 <code translate="no">index_type</code> 을 지정하지 않으면 Milvus는 데이터 유형에 따라 가장 적합한 인덱스 유형을 자동으로 선택합니다.</p>
<p>다음 표에는 Milvus가 지원하는 데이터 유형과 해당 자동 인덱싱 알고리즘이 나와 있습니다.</p>
<table>
<thead>
<tr><th>데이터 유형</th><th>자동 인덱싱 알고리즘</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>역 인덱스</td></tr>
<tr><td>INT8</td><td>반전 인덱스</td></tr>
<tr><td>INT16</td><td>반전된 인덱스</td></tr>
<tr><td>INT32</td><td>반전 인덱스</td></tr>
<tr><td>INT64</td><td>반전 인덱스</td></tr>
<tr><td>FLOAT</td><td>반전 인덱스</td></tr>
<tr><td>DOUBLE</td><td>반전 인덱스</td></tr>
</tbody>
</table>
<h3 id="Inverted-indexing" class="common-anchor-header">반전 인덱싱</h3><p>반전 인덱싱은 인덱스 매개변수를 수동으로 지정하여 스칼라 필드에 대한 인덱스를 생성하는 유연한 방법을 제공합니다. 이 방법은 포인트 쿼리, 패턴 일치 쿼리, 전체 텍스트 검색, JSON 검색, 부울 검색, 접두사 일치 쿼리 등 다양한 시나리오에서 잘 작동합니다.</p>
<p>Milvus에서 구현된 반전 인덱스는 전체 텍스트 검색 엔진 라이브러리인 <a href="https://github.com/quickwit-oss/tantivy">Tantivy에</a> 의해 구동됩니다. Tantivy는 Milvus의 반전 인덱싱이 효율적이고 빠르도록 보장합니다.</p>
<p>반전 색인에는 용어 사전과 반전 목록이라는 두 가지 주요 구성 요소가 있습니다. 용어 사전에는 토큰화된 모든 단어가 알파벳순으로 정렬되어 있고, 반전 목록에는 각 단어가 나타나는 문서 목록이 포함되어 있습니다. 이 설정은 무차별 대입 검색보다 포인트 쿼리와 범위 쿼리를 훨씬 더 빠르고 효율적으로 만듭니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scalar_index_inverted.png" alt="Inverted index diagram" class="doc-image" id="inverted-index-diagram" />
   </span> <span class="img-wrapper"> <span>반전 색인 다이어그램</span> </span></p>
<p>반전 인덱스 사용의 장점은 다음 작업에서 특히 두드러집니다:</p>
<ul>
<li><strong>포인트 쿼리</strong>: 예를 들어, <strong>Milvus라는</strong> 단어가 포함된 문서를 검색할 때, 용어 사전에 <strong>Milvus가</strong> 있는지 확인하는 것으로 프로세스가 시작됩니다. 찾을 수 없으면 해당 단어가 포함된 문서가 없는 것입니다. 그러나 발견되면 <strong>Milvus와</strong> 관련된 반전된 목록이 검색되어 해당 단어가 포함된 문서가 표시됩니다. 이 방법은 정렬된 용어 사전이 <strong>Milvus라는</strong> 단어를 찾는 데 걸리는 시간을 크게 줄여주기 때문에 백만 개의 문서를 무차별적으로 검색하는 것보다 훨씬 더 효율적입니다.</li>
<li><strong>범위 쿼리</strong>: <strong>매우보다</strong> 알파벳순으로 큰 단어가 포함된 문서를 찾는 것과 같은 범위 쿼리의 효율성도 정렬된 용어 사전을 통해 향상됩니다. 이 접근 방식은 무차별 검색보다 더 효율적이므로 더 빠르고 정확한 결과를 제공합니다.</li>
</ul>
<h3 id="Test-results" class="common-anchor-header">테스트 결과</h3><p>Milvus의 스칼라 인덱스가 제공하는 성능 향상을 입증하기 위해, 원시 데이터에서 역 인덱싱과 무차별 대입 검색을 사용하는 여러 표현식의 성능을 비교하는 실험을 실시했습니다.</p>
<p>이 실험에서는 반전 인덱스와 무차별 대입 검색의 두 가지 조건에서 다양한 표현식을 테스트했습니다. 공정성을 보장하기 위해 매번 동일한 컬렉션을 사용하여 테스트 전반에 걸쳐 동일한 데이터 분포를 유지했습니다. 각 테스트 전에 컬렉션을 해제하고 인덱스를 삭제한 후 다시 구축했습니다. 또한 콜드 데이터와 핫 데이터의 영향을 최소화하기 위해 각 테스트 전에 웜 쿼리를 수행했으며, 정확성을 보장하기 위해 각 쿼리를 여러 번 실행했습니다.</p>
<p><strong>100만</strong> 개의 레코드로 구성된 데이터 세트의 경우, <strong>반전 인덱스를</strong> 사용하면 포인트 쿼리의 성능이 최대 <strong>30배까지</strong> 향상될 수 있습니다. 더 큰 데이터 세트의 경우 성능 향상은 훨씬 더 커질 수 있습니다.</p>
<h2 id="Performance-recommandations" class="common-anchor-header">성능 권장 사항<button data-href="#Performance-recommandations" class="anchor-icon" translate="no">
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
    </button></h2><p>스칼라 필드 인덱싱에서 Milvus의 기능을 최대한 활용하고 벡터 유사도 검색에서 그 힘을 발휘하려면, 보유한 데이터를 기반으로 필요한 메모리 크기를 추정하는 모델이 필요할 수 있습니다.</p>
<p>다음 표에는 Milvus가 지원하는 모든 데이터 유형에 대한 추정 함수가 나와 있습니다.</p>
<ul>
<li><p>숫자 필드</p>
<table>
<thead>
<tr><th>데이터 유형</th><th>메모리 추정 함수(MB)</th></tr>
</thead>
<tbody>
<tr><td>INT8</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT16</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT32</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT64</td><td>numOfRows * <strong>24</strong> / 1024 / 1024</td></tr>
<tr><td>FLOAT32</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>DOUBLE</td><td>numOfRows * <strong>24</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
<li><p>문자열 필드</p>
<table>
<thead>
<tr><th>문자열 길이</th><th>메모리 추정 함수(MB)</th></tr>
</thead>
<tbody>
<tr><td>(0, 8]</td><td>numOfRows * <strong>128</strong> / 1024 / 1024</td></tr>
<tr><td>(8, 16]</td><td>numOfRows * <strong>144</strong> / 1024 / 1024</td></tr>
<tr><td>(16, 32]</td><td>numOfRows * <strong>160</strong> / 1024 / 1024</td></tr>
<tr><td>(32, 64]</td><td>numOfRows * <strong>192</strong> / 1024 / 1024</td></tr>
<tr><td>(64, 128]</td><td>numOfRows * <strong>256</strong> / 1024 / 1024</td></tr>
<tr><td>(128, 65535]</td><td>numOfRows * <strong>strLen * 1.5</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">다음 작업<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>스칼라 필드를 색인하려면 <a href="/docs/ko/v2.4.x/index-scalar-fields.md">스칼라에 색인 만들기를</a> 참조하세요.</p></li>
<li><p>위에서 언급한 관련 용어와 규칙에 대해 자세히 알아보려면 다음을 읽어보세요.</p>
<ul>
<li><a href="/docs/ko/v2.4.x/bitset.md">비트셋</a></li>
<li><a href="/docs/ko/v2.4.x/multi-vector-search.md">하이브리드 검색</a></li>
<li><a href="/docs/ko/v2.4.x/boolean.md">부울 표현식 규칙</a></li>
<li><a href="/docs/ko/v2.4.x/schema.md#Supported-data-type">지원되는 데이터 유형</a></li>
</ul></li>
</ul>
