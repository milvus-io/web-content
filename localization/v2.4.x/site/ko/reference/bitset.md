---
id: bitset.md
summary: Milvus의 비트셋에 대해 알아보세요.
title: 비트셋
---
<h1 id="Bitset" class="common-anchor-header">비트셋<button data-href="#Bitset" class="anchor-icon" translate="no">
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
    </button></h1><p>이 주제에서는 Milvus에서 속성 필터링 및 <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">삭제 작업과</a> 같은 주요 기능을 활성화하는 데 도움이 되는 비트셋 메커니즘을 소개합니다.</p>
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
    </button></h2><p>비트셋은 비트의 집합입니다. 비트는 일반적으로 <code translate="no">0</code> 및 <code translate="no">1</code> 또는 부울 값 <code translate="no">true</code> 및 <code translate="no">false</code> 과 같이 두 가지 값만 가능한 요소입니다. Milvus에서 비트셋은 비트 번호 <code translate="no">0</code> 및 <code translate="no">1</code> 의 배열로, 특정 데이터를 정수, 부동 소수점 또는 문자 대신 간결하고 효율적으로 표현하는 데 사용할 수 있습니다. 비트 번호는 기본적으로 <code translate="no">0</code> 이며, 특정 요구 사항을 충족하는 경우에만 <code translate="no">1</code> 으로 설정됩니다.</p>
<p>비트셋에 대한 연산은 출력 값이 유효하거나 유효하지 않은 <a href="/docs/ko/v2.4.x/boolean.md">부울 논리로</a> 수행되며, 각각 <code translate="no">1</code> 및 <code translate="no">0</code> 으로도 표시됩니다. 예를 들어 <a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">논리 연산자</a> <code translate="no">AND</code> 를 사용하여 동일한 인덱스 위치에 있는 항목을 기준으로 두 비트셋을 비교하고 그 결과로 새 비트셋을 생성할 수 있습니다. 한 위치의 두 항목이 같으면 새 비트셋에 <code translate="no">1</code>, 다르면 <code translate="no">0</code> 이 해당 위치에 기록됩니다.</p>
<h2 id="Implementation" class="common-anchor-header">구현<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>비트셋은 Milvus가 시간 여행을 통해 속성 필터링, 데이터 삭제 및 쿼리를 수행하는 데 도움이 되는 간단하면서도 강력한 메커니즘입니다.</p>
<h3 id="Attribute-filtering" class="common-anchor-header">속성 필터링</h3><p>비트셋은 두 가지 가능한 값만 포함하므로 <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">속성 필터링의</a> 결과를 저장하는 데 적합합니다. 주어진 속성 필터의 요구 사항을 충족하는 데이터는 <code translate="no">1</code> 로 표시됩니다.</p>
<h3 id="Data-deletion" class="common-anchor-header">데이터 삭제</h3><p>비트셋은 세그먼트의 행이 삭제되었는지 여부에 대한 정보를 간결하게 저장하는 역할을 합니다. 삭제된 엔티티는 해당 비트셋에 <code translate="no">1</code> 로 표시되며, 검색 또는 쿼리 중에 <a href="https://milvus.io/blog/deleting-data-in-milvus.md">계산되지 않습니다</a>.</p>
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
    </button></h2><p>여기에서는 위에서 설명한 비트셋의 세 가지 주요 구현을 모두 참조하여 Milvus에서 비트셋이 어떻게 사용되는지 보여주는 세 가지 예를 제시합니다. 세 가지 경우 모두 8개의 엔티티가 있는 세그먼트가 있고, 그 다음 일련의 데이터 조작 언어(DML) 이벤트가 아래 표시된 순서대로 발생합니다.</p>
<ul>
<li><code translate="no">primary_key</code>s가 각각 [1, 2, 3, 4]인 4개의 엔티티는 타임스탬프 <code translate="no">ts</code> 가 100과 같을 때 삽입됩니다.</li>
<li><code translate="no">primary_key</code>s가 [5, 6, 7, 8]인 나머지 4개 엔티티는 타임스탬프 <code translate="no">ts</code> 가 200일 때 삽입됩니다.</li>
<li><code translate="no">primary_key</code>s가 [7, 8]인 엔티티는 타임스탬프 <code translate="no">ts</code> 가 300일 때 삭제됩니다.</li>
<li><code translate="no">primary_key</code>s가 [1, 3, 5, 7]인 엔티티만 속성 필터링 조건을 충족합니다.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" />
   </span> <span class="img-wrapper"> <span>DML 이벤트 순서</span> </span></p>
<h3 id="Case-one" class="common-anchor-header">사례 1</h3><p>이 경우 사용자가 <code translate="no">time_travel</code> 를 150 으로 설정하면 사용자가 <code translate="no">ts = 150</code> 을 만족하는 데이터에 대한 쿼리를 수행한다는 의미입니다. 비트셋 생성 프로세스는 그림 1에 설명되어 있습니다.</p>
<p>초기 필터링 단계에서 <code translate="no">filter_bitset</code> 은 <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> 이며, 엔티티 [1, 3, 5, 7]은 유효한 필터링 결과이므로 <code translate="no">1</code> 로 표시됩니다.</p>
<p>그러나 엔티티 [4, 5, 6, 7]은 <code translate="no">ts</code> 이 150 일 때 벡터 데이터베이스에 삽입되지 않았습니다. 따라서 이 네 개의 엔티티는 필터링 조건에 관계없이 0으로 표시되어야 합니다. 이제 비트셋 결과는 <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code> 이 되어야 합니다.</p>
<p><a href="#data-deletion">데이터 삭제에서</a> 설명한 대로 <code translate="no">1</code> 로 표시된 엔티티는 검색 또는 쿼리 중에 무시됩니다. 이제 삭제 비트맵과 결합하기 위해 비트셋 결과를 뒤집어야 하며, 그러면 <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> 이 됩니다.</p>
<p>삭제 비트셋 <code translate="no">del_bitset</code> 의 경우 초기 값은 <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 이 되어야 합니다. 그러나 엔티티 7과 8은 <code translate="no">ts</code> 이 300이 될 때까지 삭제되지 않습니다. 따라서 <code translate="no">ts</code> 이 150일 때 엔티티 7과 8은 여전히 유효합니다. 결과적으로 시간 여행 후 <code translate="no">del_bitset</code> 값은 <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 입니다.</p>
<p>이제 시간 여행 및 속성 필터링 후에 <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> 과 <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 두 개의 비트셋이 생겼습니다.  이 두 비트셋을 <code translate="no">OR</code> 이진 논리 연산자와 결합합니다. 결과_비트셋의 최종 값은 <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> 이며, 이는 다음 검색 또는 쿼리 단계에서 엔티티 1과 3만 계산됨을 의미합니다.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." />
   <span>그림 1. 시간 여행 = 150으로 검색하기</span>. </span></p>
<h3 id="Case-two" class="common-anchor-header">사례 2</h3><p>이 경우 사용자는 <code translate="no">time_travel</code> 을 250으로 설정합니다. 비트셋 생성 과정은 그림 2에 설명되어 있습니다.</p>
<p>사례 1과 마찬가지로 초기 <code translate="no">filter_bitset</code> 는 <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> 입니다.</p>
<p><code translate="no">ts</code> = 250일 때 모든 엔티티는 벡터 데이터베이스에 있습니다. 따라서 타임스탬프를 고려할 때 <code translate="no">filter_bitset</code> 는 동일하게 유지됩니다. 다시 결과를 뒤집어서 <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 를 얻어야 합니다.</p>
<p>삭제 비트셋 <code translate="no">del_bitset</code> 의 경우 초기 값은 <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 입니다. 그러나 엔티티 7과 8은 <code translate="no">ts</code> 이 300이 될 때까지 삭제되지 않았습니다. 따라서 <code translate="no">ts</code> 이 250일 때 엔티티 7과 8은 여전히 유효합니다. 결과적으로 시간 여행 후 <code translate="no">del_bitset</code> 은 <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 입니다.</p>
<p>이제 시간 여행 및 속성 필터링 뒤에 <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 과 <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 두 개의 비트셋이 있습니다. 이 두 비트셋을 <code translate="no">OR</code> 이진 논리 연산자와 결합합니다. 결과_비트셋은 <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 입니다. 즉, 다음 검색 또는 쿼리 단계에서는 [1, 3, 5, 7] 엔티트만 계산됩니다.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." />
   <span>그림 2. 시간 여행 = 250으로 검색하기</span>. </span></p>
<h3 id="Case-three" class="common-anchor-header">사례 3</h3><p>이 경우 사용자는 <code translate="no">time_travel</code> 를 350으로 설정합니다. 비트셋 생성 과정은 그림 3에 설명되어 있습니다.</p>
<p>이전 사례와 마찬가지로 초기 <code translate="no">filter_bitset</code> 는 <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 입니다.</p>
<p><code translate="no">ts</code>= 350일 때 모든 엔티티는 벡터 데이터베이스에 있습니다. 따라서 최종적으로 뒤집힌 <code translate="no">filter_bitset</code> 은 <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 으로 사례 2와 동일합니다.</p>
<p>삭제 비트셋 <code translate="no">del_bitset</code> 은 엔티티 7과 8이 <code translate="no">ts = 350</code> 일 때 이미 삭제되었으므로 <code translate="no">del_bitset</code> 의 결과는 <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 입니다.</p>
<p>이제 시간 여행 및 속성 필터링 후 두 개의 비트셋이 있습니다: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 과 <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> .  이 두 비트셋을 <code translate="no">OR</code> 이진 논리 연산자와 결합합니다. 최종 <code translate="no">result_bitset</code> 은 <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code> 입니다. 즉, 다음 검색 또는 쿼리 단계에서는 엔티티 [1, 3, 5]만 계산됩니다.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." />
   <span>그림 3. 시간 여행 = 350으로 검색하기</span>. </span></p>
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
    </button></h2><p>이제 Milvus에서 비트셋이 어떻게 작동하는지 알았으니, 여러분도 해보고 싶을 것입니다:</p>
<ul>
<li><a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">문자열을 사용하여</a> 검색 결과를 <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">필터링하는</a> 방법을 알아보거나, 문서에서 <a href="https://milvus.io/docs/hybridsearch.md">하이브리드 검색을</a> 참조하세요.</li>
<li>Milvus에서 <a href="https://milvus.io/docs/v2.1.x/data_processing.md">데이터가 처리되는 방식을</a> 이해합니다.</li>
</ul>
