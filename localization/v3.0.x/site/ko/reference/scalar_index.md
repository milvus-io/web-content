---
id: scalar_index.md
related_key: scalar_index
summary: '스칼라 인덱스 유형을 비교하고, 필드 호환성을 확인하며, 자동 인덱스 선택 방식을 이해합니다.'
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
    </button></h1><p>스칼라 인덱스는 벡터 필드가 아닌 필드에 대한 <a href="/docs/ko/boolean.md">필터링</a> 속도를 높일 수 있습니다. 이 개요를 통해 인덱스를 선택하고, 필드 호환성을 확인하며, 자동 선택 기능을 이해하십시오.</p>
<p>자주 사용되거나 처리 속도가 느린 필터에 사용되는 필드에 인덱스를 생성하는 것을 고려하십시오. 인덱스 생성 요청에 포함할 각 필드에 대해 다음 두 가지 옵션 중 하나를 선택하십시오.</p>
<ul>
<li><strong>인덱스 유형 지정:</strong> 필드의 데이터 유형 및 필터와 호환되는 유형을 선택합니다.</li>
<li><strong> <code translate="no">AUTOINDEX</code> 사용: `</strong> <code translate="no">index_type</code> `을 ` <code translate="no">AUTOINDEX</code> `으로 설정하여 Milvus가 유형을 선택하도록 합니다. <a href="#AUTOINDEX-behavior">AUTOINDEX 동작을</a> 참조하십시오.</li>
</ul>
<h2 id="Index-types" class="common-anchor-header">인덱스 유형<button data-href="#Index-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Supported-predicates"></a>
<a id="Comparisons-and-membership"></a>
<a id="String-patterns"></a></p>
<p>지원되는 필터, 매개변수 및 생성 단계를 확인하려면 인덱스 가이드를 엽니다:</p>
<table>
<thead>
<tr><th>인덱스 유형</th><th>사용 목적</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/ko/inverted.md">INVERTED</a></td><td>등가, 소속 및 범위 필터.</td></tr>
<tr><td><a href="/docs/ko/bitmap.md">BITMAP</a></td><td>상태 코드와 같이 고유한 값이 적은 필드.</td></tr>
<tr><td><a href="/docs/ko/stl-sort.md">STL_SORT</a></td><td>값 조회 및 범위 필터.</td></tr>
<tr><td><a href="/docs/ko/trie.md">TRIE</a></td><td><code translate="no">VARCHAR</code> 필드에 대한 정확한 문자열 조회 및 접두사 일치.</td></tr>
<tr><td><a href="/docs/ko/ngram.md">NGRAM</a></td><td>LIKE 및 적용 가능한 정규식 필터.</td></tr>
<tr><td><a href="/docs/ko/rtree.md">RTREE</a></td><td><code translate="no">GEOMETRY</code> 필드에 대한 공간 필터.</td></tr>
</tbody>
</table>
<p>인덱스를 생성하기 전에 아래의 필드 호환성 표와 선택한 인덱스의 필터 지원 여부를 확인하십시오.</p>
<p><details id="Filter-execution">
<summary><strong>필터가 인덱스를 사용하는 방법</strong></summary></p>
<p>인덱스는 지원되는 표현식에만 사용되며, 그 외의 필터는 데이터를 스캔할 수 있습니다. 산술 연산 및 필드 간 비교는 리터럴 조회 가속 기능을 상속받지 않습니다. 논리 연산 및 NULL 테스트에 대해서는 <a href="/docs/ko/basic-operators.md">기본 연산자를</a> 참조하십시오.</p>
<p></details></p>
<p><a id="Choosing-a-scalar-index"></a></p>
<h2 id="Supported-field-types" class="common-anchor-header">지원되는 필드 유형<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Array-JSON-and-spatial-predicates"></a>
<a id="JSON-field-indexing"></a></p>
<p>필드의 데이터 유형을 확인하여 지원되는 명시적 인덱스를 확인하십시오. 배열 행에서 ‘ <code translate="no">ARRAY&lt;T&gt;</code> ’은 ‘ <code translate="no">ARRAY</code> ’을 의미하며, ‘ <code translate="no">element_type=T</code> ’은 다음과 같습니다:</p>
<table>
<thead>
<tr><th>필드 유형</th><th>명시적 인덱스 유형</th><th>조건</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>스칼라 부울 필드는 <code translate="no">STL_SORT</code> 를 지원하지 않습니다.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td><td><code translate="no">BITMAP</code> 주키 필드에서는 사용할 수 없습니다.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>명시적인 <code translate="no">BITMAP</code> 은 사용할 수 없습니다.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, <code translate="no">NGRAM</code></td><td><code translate="no">BITMAP</code> 주키 필드에서는 사용할 수 없습니다. <a href="#String-pattern-indexes">필터를 통한 인덱스 선택을</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td><a href="/docs/ko/timestamptz-field.md">TIMESTAMPTZ 필드를</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td><a href="/docs/ko/rtree.md">RTREE를</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td><a href="/docs/ko/array_data_type.md#Array-index-support">'배열 인덱스 지원'을</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code>, <code translate="no">ARRAY&lt;INT16&gt;</code>, <code translate="no">ARRAY&lt;INT32&gt;</code>, <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td><a href="/docs/ko/array_data_type.md#Array-index-support">'배열 인덱스 지원'을</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">INVERTED</code></td><td><a href="/docs/ko/array_data_type.md#Array-index-support">'배열 인덱스 지원'을</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td><a href="/docs/ko/array_data_type.md#Array-index-support">'배열 인덱스 지원'을</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>인덱싱된 경로와 형 변환 유형에 따라 다릅니다.</td><td><a href="/docs/ko/json-indexing.md#Understand-cast-types">JSON 경로 호환성 및 요구 사항을</a> 확인하십시오.</td></tr>
<tr><td>StructArray의 비벡터 하위 필드</td><td>서브필드의 데이터 유형에 따라 다릅니다.</td><td>서브필드를 별도로 인덱싱하십시오. ` <code translate="no">BOOL</code> ` 서브필드는 명시적인 ` <code translate="no">STL_SORT</code>`을 사용할 수 없습니다. <a href="/docs/ko/index-structarray-fields.md#Create-scalar-indexes">서브필드 규칙을</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">TEXT</code></td><td>없음</td><td><code translate="no">AUTOINDEX</code> 를 포함한 사용자 정의 스칼라 인덱스는 사용할 수 없습니다.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p><code translate="no">AUTOINDEX</code> 를 포함한 스칼라 인덱스는 재귀적 ARRAY 필드나 null이 허용되는 요소를 가진 배열을 지원하지 않습니다. 일반 배열 필터에 대한 <a href="/docs/ko/array_data_type.md#Array-index-support">배열 인덱스 지원</a> 및 하위 필드 규칙에 대해서는 <a href="/docs/ko/index-structarray-fields.md#Create-scalar-indexes">StructArray 필드 인덱스를</a> 참조하십시오.</p>
</blockquote>
</div>
<p><details id="String-pattern-indexes">
<summary><strong>VARCHAR 필터용 인덱스 선택</strong></summary></p>
<p><code translate="no">VARCHAR</code> 필드의 경우, 필터에 따라 호환되는 인덱스를 비교하십시오:</p>
<table>
<thead>
<tr><th>필터링 요구 사항</th><th>인덱스 가이드 및 조건</th></tr>
</thead>
<tbody>
<tr><td>정확한 문자열 조회 및 접두사</td><td><a href="/docs/ko/trie.md#Queries-accelerated-by-TRIE">TRIE</a>, <a href="/docs/ko/stl-sort.md#Queries-accelerated-by-STLSORT">STL_SORT</a> 또는 <a href="/docs/ko/inverted.md#Queries-accelerated-by-INVERTED">INVERTED</a>.</td></tr>
<tr><td>고유한 문자열 값이 적은 경우</td><td><a href="/docs/ko/bitmap.md#Queries-accelerated-by-BITMAP">BITMAP</a>; 패턴은 인덱싱된 값을 기준으로 평가됩니다.</td></tr>
<tr><td>LIKE 또는 적절한 고정 리터럴이 포함된 정규식</td><td><code translate="no">VARCHAR</code> 필드 또는 JSON 문자열 경로에 대한<a href="/docs/ko/ngram.md#Queries-accelerated-by-NGRAM">NGRAM</a>. 단, 그램 길이와 재확인 조건이 적용됩니다.</td></tr>
<tr><td>사용 가능한 고정 리터럴이 없는 정규식</td><td>쿼리는 데이터를 스캔하거나 많은 인덱스 값을 평가할 수 있습니다. 선택한 인덱스의 조건을 확인하십시오.</td></tr>
</tbody>
</table>
<p><code translate="no">VARCHAR</code> 의 범위 조건은 문자열에 숫자가 포함된 경우에도 문자열 정렬 순서를 따릅니다. 인덱스 사용 여부는 쿼리 계획, 추출 가능한 리터럴, 카디널리티 및 데이터 분포에 따라 달라집니다. 계획 규칙에 대해서는 <a href="/docs/ko/pattern-matching.md#Accelerate-pattern-matching-with-indexes">‘패턴 매칭’을</a> 참조하십시오. JSON 문자열 경로의 경우, <a href="/docs/ko/json-indexing.md">‘JSON 인덱싱’에서</a> 경로 및 <a href="/docs/ko/json-indexing.md">형</a> 변환 요구 사항을 확인하십시오.</p>
<p></details></p>
<p><a id="How-AUTOINDEX-selects"></a></p>
<h2 id="AUTOINDEX-behavior" class="common-anchor-header">AUTOINDEX 동작<button data-href="#AUTOINDEX-behavior" class="anchor-icon" translate="no">
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
    </button></h2><p>각 선택된 필드의 인덱스 정의에서 ` <code translate="no">index_type</code> `을 ` <code translate="no">AUTOINDEX</code> `으로 설정하십시오. Milvus는 데이터 유형을 사용하고, 해당되는 경우 각 인덱스 구축 시 고유 값의 수를 기반으로 유형을 선택합니다:</p>
<table>
<thead>
<tr><th>필드 유형</th><th>기본 선택</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> 고유 값이 100개 미만인 경우; 그 외에는 <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">ARRAY</code> <code translate="no">element_type</code> 는 , , , , , 중 하나로 설정되며, <code translate="no">INT8</code> <code translate="no">INT16</code> <code translate="no">INT32</code> <code translate="no">INT64</code> <code translate="no">FLOAT</code> <code translate="no">DOUBLE</code> <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> 고유 요소가 100개 미만인 경우; 그렇지 않은 경우 <code translate="no">INVERTED</code>.</td></tr>
<tr><td><code translate="no">JSON</code> 경로는 3.0 버전에서 기본적으로 <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> 또는 <code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code> 3.0에서는 기본적으로 변환됩니다. <a href="/docs/ko/json-indexing.md#Index-requirements">JSON 옵트인 설정을</a> 활성화하면 위의 스칼라 비트맵/정렬 전략이 사용됩니다.</td></tr>
<tr><td><code translate="no">JSON</code> <code translate="no">ARRAY_BOOL</code>, 또는 <code translate="no">ARRAY_DOUBLE</code> <code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">INVERTED</code> 을 명시적으로 사용하십시오. 기본 3.0.6 매핑은 이러한 형 변환에 대한 자동 선택을 거부합니다.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>지원되지 않습니다.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>지원되는 스칼라 필드의 경우, <code translate="no">index_type</code> 를 생략한 인덱스 정의도 자동 선택을 요청합니다. 요청에 포함되지 않은 필드는 인덱싱되지 않습니다.</p>
</blockquote>
</div>
<p><a id="Version-compatibility"></a></p>
<p><details>
<summary><strong>선택 세부 정보</strong></summary></p>
<ul>
<li><strong>내부 레이아웃:</strong> <code translate="no">AUTOINDEX</code> 는 <code translate="no">FLOAT</code> 및 <code translate="no">DOUBLE</code> 에 대한 비트맵 인덱싱과 같이 명시적인 선택 사항으로 사용할 수 없는 레이아웃을 선택할 수 있습니다. 카디널리티 기반 전략은 내부적으로 <code translate="no">HYBRID</code> 라고 하며, 이를 직접 지정할 수는 없습니다. 선택된 인덱스에 따라 어떤 필터가 이를 사용할 수 있는지 결정됩니다.</li>
<li><strong>카디널리티 임계값:</strong> <a id="Cardinality-threshold"></a> <code translate="no">bitmap_cardinality_limit</code> (범위: 1–1000)을 설정하여 기본 임계값을 재정의할 수 있습니다. 이 값보다 낮은 경우 비트맵이 사용되며, 이 값 이상인 경우 데이터 유형의 고카디널리티 레이아웃이 적용됩니다. 명시적으로 지정된 <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> 및 <code translate="no">BITMAP</code> 는 카디널리티 기반 선택을 우회하며 이 임계값을 무시합니다.</li>
<li><strong>관리자 재정의:</strong> <code translate="no">scalarAutoIndex.params.build</code> 를 통해 유형 매핑을 변경할 수 있습니다. <code translate="no">scalarAutoIndex.enable=false</code> (기본값)은 여전히 명시적인 <code translate="no">AUTOINDEX</code> 을 허용하며, <code translate="no">true</code> 는 유효한 수동 요청에 대해서도 자동 선택을 적용합니다.</li>
</ul>
<p></details></p>
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
    </button></h2><p><a id="Performance-considerations"></a>
<a id="Estimating-memory-requirements"></a></p>
<p>다음 작업을 위한 가이드를 선택하세요:</p>
<ul>
<li><strong>인덱스 생성:</strong> 매개변수 및 생성 예제에 대한 <a href="#Index-types">인덱스 가이드를</a> 사용하세요.</li>
<li><strong>리소스 계획:</strong> <a href="/docs/ko/stl-sort.md#Memory-considerations">STL_SORT</a>, <a href="/docs/ko/bitmap.md#Memory-considerations">BITMAP</a>, <a href="/docs/ko/inverted.md#Memory-considerations">INVERTED</a> 또는 <a href="/docs/ko/ngram.md#Memory-considerations">NGRAM에</a> 대한 메모리 지침을 참조하세요. 대표적인 데이터와 필터를 사용하여 메모리 사용량, 빌드 시간 및 쿼리 지연 시간을 비교하세요.</li>
<li><strong>텍스트 검색 구성:</strong> <a href="/docs/ko/keyword-match.md">‘텍스트 매치</a> ( <a href="/docs/ko/keyword-match.md">Text Match</a> )’ 및 <a href="/docs/ko/full-text-search.md">‘전체 텍스트 검색(Full Text Search</a> )’에서는 텍스트 분석, BM25, <code translate="no">TEXT_MATCH</code> 및 <code translate="no">PHRASE_MATCH</code> 에 대해 다룹니다. 스칼라 <code translate="no">INVERTED</code> 인덱스는 이러한 메커니즘을 지원하지 않습니다.</li>
</ul>
<p><details id="Drop-index-compatibility">
<summary><strong>구버전 Milvus에서 스칼라 인덱스 삭제</strong></summary></p>
<p>Milvus v2.6.3 이하 버전에서는 스칼라 인덱스를 삭제하기 전에 컬렉션을 해제해야 합니다. v2.6.4부터는 컬렉션을 해제하지 않고도 인덱스를 삭제할 수 있습니다.</p>
<p></details></p>
