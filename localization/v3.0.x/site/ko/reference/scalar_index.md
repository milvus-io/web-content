---
id: scalar_index.md
related_key: scalar_index
summary: >-
  스칼라 인덱스는 벡터 필드가 아닌 필드에 대한 필터링 속도를 높여줍니다. 이 참조 문서에서는 Milvus가 스칼라 인덱스를 선택하는 방법,
  지정할 수 있는 인덱스 유형, 그리고 각 인덱스가 지원하는 데이터 유형에 대해 설명합니다.
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
    </button></h1><p>스칼라 인덱스는 카테고리, 가격, 타임스탬프, 위치와 같은 비벡터 필드에 대한 필터링 속도를 높여줍니다. 필터 표현식을 통해 검색 범위가 좁혀지면, 스칼라 인덱스를 통해 Milvus는 해당 필드를 스캔하지 않고도 일치하는 엔티티를 찾을 수 있습니다.</p>
<p>어떤 인덱스를 선택해야 할지 확실하지 않다면 <code translate="no">AUTOINDEX</code> 를 사용하십시오. 특정 동작이 필요한 경우에만 인덱스 유형을 수동으로 지정하십시오.</p>
<h2 id="Choosing-a-scalar-index" class="common-anchor-header">스칼라 인덱스 선택<button data-href="#Choosing-a-scalar-index" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 표에는 ` <code translate="no">AUTOINDEX</code>`를 사용할 때 Milvus가 기본적으로 선택하는 인덱스와, 각 데이터 유형에 대해 수동으로 지정할 수 있는 인덱스 유형이 나열되어 있습니다.</p>
<table>
<thead>
<tr><th>데이터 유형</th><th>AUTOINDEX 기본값</th><th>수동 인덱스 유형</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, <code translate="no">NGRAM</code>, <code translate="no">FMINDEX</code></td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">JSON</code> 형식이 지정된 스칼라 또는 배열로 형변환</td><td><code translate="no">HYBRID</code></td><td><code translate="no">json_cast_type</code> 에 따라 다름; <a href="#JSON-field-indexing">JSON 필드 인덱싱을</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">JSON</code> 다음과 함께 <code translate="no">json_cast_type=&quot;JSON&quot;</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code> 다음과 같이 <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>지원되지 않음</td><td>없음</td></tr>
</tbody>
</table>
<p><code translate="no">HYBRID</code> 는 내부 전략이며, 직접 지정할 수 있는 유형이 아닙니다. <a href="#How-AUTOINDEX-selects">AUTOINDEX의 선택 방식에 대해서는 ‘How AUTOINDEX selects’를</a> 참조하십시오.</p>
<p>다음과 같은 제한 사항이 적용됩니다:</p>
<ul>
<li><strong>주 키:</strong> <code translate="no">BITMAP</code> 는 주 키 필드에서는 사용할 수 없습니다.</li>
<li><strong>배열:</strong> 재귀적 배열과 null 허용 요소가 포함된 배열은 <code translate="no">AUTOINDEX</code> 을 포함한 스칼라 인덱싱을 지원하지 않습니다. 일반 배열은 부울, 정수, 부동 소수점 및 VARCHAR 요소를 지원합니다.</li>
<li><strong>구조체 배열:</strong> 스칼라 하위 필드를 개별적으로 인덱싱해야 합니다. 지원 방식은 일반 배열과 다를 수 있습니다. 예를 들어, 부울 구조체 하위 필드는 명시적인 <code translate="no">STL_SORT</code> 를 지원하지 않습니다.</li>
<li><strong>TEXT:</strong> <code translate="no">AUTOINDEX</code> 을 포함한 사용자 정의 스칼라 인덱스는 사용할 수 없습니다. 텍스트 분석과 BM25 검색은 별도의 메커니즘을 사용합니다.</li>
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
    </button></h2><table>
<thead>
<tr><th>인덱스 유형</th><th>용도</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>범용 등가, 소속, 범위 필터.</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>고유 값이 적은 필드; 콤팩트한 비트 단위 필터링.</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>정렬된 값 조회 및 범위 필터링.</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>문자열 동일성 및 접두사 일치.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>후보 집합을 좁혀 문자열에 대한 LIKE 및 정규식 적용.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>정확한 접두사, 접미사 및 중첩 부분 문자열 일치.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td>GEOMETRY 필드에 대한 공간 필터링.</td></tr>
</tbody>
</table>
<p>생성 예제, 인덱스 매개변수 및 지원되는 쿼리에 대해서는 <a href="/docs/ko/bitmap.md">BITMAP</a>, <a href="/docs/ko/inverted.md">INVERTED</a>, <a href="/docs/ko/ngram.md">NGRAM</a>, <a href="/docs/ko/stl-sort.md">STL_SORT</a>, <a href="/docs/ko/trie.md">TRIE</a>, <a href="/docs/ko/fmindex.md">FMINDEX</a> 및 <a href="/docs/ko/rtree.md">RTREE를</a> 참조하십시오.</p>
<h2 id="How-AUTOINDEX-selects" class="common-anchor-header">AUTOINDEX의 선택 방식<button data-href="#How-AUTOINDEX-selects" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">AUTOINDEX</code> 의 경우, Milvus는 필드 유형, 서버 구성 및 일부 필드의 경우 고유 값의 수(카디널리티)를 사용하여 인덱스를 선택합니다. 기본 선택 항목은 <a href="#Choosing-a-scalar-index">스칼라 인덱스 선택에</a> 나열되어 있습니다.</p>
<p>대부분의 필드에 대해 <code translate="no">AUTOINDEX</code> 는 카디널리티에 따라 인덱스를 선택하는 내부 ‘ <code translate="no">HYBRID</code> ’ 전략을 사용합니다:</p>
<ul>
<li><strong><code translate="no">BITMAP</code></strong> 빌드에 고유 값이 100개 미만인 경우.</li>
<li><strong><code translate="no">STL_SORT</code></strong> 빌드에 고유 값이 100개 이상 포함된 경우.</li>
</ul>
<p>배열 인덱스는 별도의 호환성 정책을 사용합니다. 클러스터가 이를 지원하는 경우 높은 카디널리티 분기에서는 ` <code translate="no">STL_SORT</code> `를 사용하고, 그렇지 않은 경우 ` <code translate="no">INVERTED</code> `를 사용합니다. <a href="#Version-compatibility">‘버전 호환성’을</a> 참조하십시오.</p>
<p><code translate="no">HYBRID</code> 이는 내부 전용이므로 직접 지정할 수 없습니다. 내부 선택은 해당 필드에 대한 명시적 선택 사항으로 사용할 수 없는 인덱스(예: 부동 소수점 값에 대한 비트맵 인덱싱)도 사용할 수 있습니다.</p>
<blockquote>
<p>이러한 선택 사항은 기본값입니다. 관리자는 <code translate="no">scalarAutoIndex.params.build</code> 를 통해 이를 변경할 수 있습니다. <code translate="no">scalarAutoIndex.enable</code> 설정의 기본값은 <code translate="no">false</code> 이며, 이 경우 인덱스 유형이 생략되었을 때에도 명시적인 <code translate="no">AUTOINDEX</code> 및 선택이 여전히 허용됩니다. 이 설정을 <code translate="no">true</code> 로 설정하면, 그렇지 않으면 유효한 수동 요청에도 자동 선택이 적용됩니다.</p>
</blockquote>
<h2 id="JSON-field-indexing" class="common-anchor-header">JSON 필드 인덱싱<button data-href="#JSON-field-indexing" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON 값에 인덱스를 생성하려면, 인덱싱할 값의 유형을 지정하기 위해 ` <code translate="no">json_cast_type</code> `을 명시해야 합니다. 이 매개변수는 자동 및 수동 인덱싱 모두에 필수입니다. 경로를 지정하려면 ` <code translate="no">json_path</code> `을 사용하십시오. 생략할 경우, Milvus는 요청에 제공된 필드 이름을 사용합니다.</p>
<table>
<thead>
<tr><th>json_cast_type</th><th>AUTOINDEX 기본값</th><th>수동 인덱싱 유형</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">NGRAM</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
</tbody>
</table>
<p><code translate="no">JSON</code> 형변환은 유형 지정 스칼라 경로 인덱스 대신 전체 JSON 인덱싱을 선택하며, <code translate="no">AUTOINDEX</code> 의 기본값을 <code translate="no">HYBRID</code> 에서 <code translate="no">INVERTED</code> 로 변경합니다.</p>
<p>선택적 ` <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> `는 ` <code translate="no">DOUBLE</code> ` 형 변환 시 문자열 값을 변환합니다. 다른 형 변환 유형과는 함께 사용할 수 없습니다. ` <code translate="no">TRIE</code> `와 ` <code translate="no">FMINDEX</code> ` 모두 JSON 필드를 지원하지 않습니다.</p>
<h2 id="Supported-predicates" class="common-anchor-header">지원되는 술어<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 표는 각 인덱스가 어떤 술어 평가에 도움이 되는지 보여줍니다. <strong>인덱스 지원이 있다고 해서 Milvus가 모든 쿼리에 해당 인덱스를 사용한다는 보장은 없습니다.</strong> 특정 표현식이나 패턴에 인덱스가 적합하지 않은 경우 <strong>,</strong> Milvus는 필드 데이터를 스캔할 수 있습니다.</p>
<h3 id="Comparisons-and-membership" class="common-anchor-header">비교 및 멤버십<button data-href="#Comparisons-and-membership" class="anchor-icon" translate="no">
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
    </button></h3><p>등가 및 멤버십 연산에는 <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">in</code>, <code translate="no">not in</code> 가 포함됩니다. 범위 비교 연산에는 <code translate="no">&lt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;</code>, <code translate="no">&gt;=</code> 및 <code translate="no">10 &lt;= price &lt; 50</code> 와 같은 표현식이 포함됩니다.</p>
<table>
<thead>
<tr><th>인덱스 유형</th><th>필드 데이터 유형</th><th>인덱스가 지원하는 술어</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td><code translate="no">BOOL</code></td><td>등가 및 소속</td></tr>
<tr><td><code translate="no">INVERTED</code></td><td>정수, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>등가, 소속, 범위</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td><code translate="no">BOOL</code></td><td>동등성 및 소속</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>정수, <code translate="no">VARCHAR</code></td><td>등가성, 소속성 및 범위</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>정수, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">TIMESTAMPTZ</code>, <code translate="no">VARCHAR</code></td><td>등가성, 집합 소속, 및 범위</td></tr>
<tr><td><code translate="no">TRIE</code></td><td><code translate="no">VARCHAR</code></td><td>동등성, 소속 관계 및 범위; 범위 평가 시 여러 인덱스된 문자열을 방문할 수 있음</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td><code translate="no">VARCHAR</code></td><td>문자열 패턴만 가능; 직접적인 동일성, 소속 여부 또는 범위 조회는 불가능</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">VARCHAR</code></td><td>문자열 패턴만 가능; 직접적인 등가, 소속 또는 범위 조회는 불가능</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td>아래에 나열된 공간 술어</td></tr>
<tr><td><code translate="no">AUTOINDEX</code></td><td>지원되는 스칼라 유형</td><td>선택한 인덱스에 따라 다릅니다. 내부 <code translate="no">HYBRID</code> 선택은 해당 비트맵, 정렬 또는 반전 인덱스의 기능을 사용합니다.</td></tr>
</tbody>
</table>
<p>VARCHAR 범위는 문자열 값을 숫자로 해석하지 않고 그대로 비교합니다. 이 표는 리터럴 값에 대한 비교만을 설명하며, 산술 표현식이나 두 필드 간의 비교가 동일한 인덱스 가속화를 받는다는 것을 의미하지는 않습니다.</p>
<h3 id="String-patterns" class="common-anchor-header">문자열 패턴<button data-href="#String-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>이 표는 VARCHAR 필드에 적용됩니다. JSON 문자열 경로의 경우, JSON 인덱싱 표에서 지원하는 인덱스와 ` <code translate="no">VARCHAR</code> ` 형 변환을 사용하십시오. 해당 문자열 동작이 적용됩니다.</p>
<ul>
<li><strong>예:</strong> 인덱스는 정확한 일치 항목을 반환합니다.</li>
<li><strong>인덱싱된 값 확인:</strong> Milvus는 인덱스에 저장된 문자열을 기준으로 패턴을 평가하며, 이 과정에서 많은 개별 문자열을 조회해야 할 수 있습니다.</li>
<li><strong>후보:</strong> 인덱스가 가능한 일치 항목을 좁힌 다음, Milvus가 원본 값을 확인합니다.</li>
<li><strong>스캔:</strong> 인덱스가 술어를 처리하지 못하며, Milvus는 다른 적격 경로를 사용하거나 필드를 스캔합니다.</li>
</ul>
<table>
<thead>
<tr><th>인덱스 유형</th><th>접두사 <code translate="no">like &quot;abc%&quot;</code></th><th>접미사 <code translate="no">like &quot;%abc&quot;</code></th><th>부분 문자열 <code translate="no">like &quot;%abc%&quot;</code></th><th>일반 LIKE <code translate="no">like &quot;a%b_c&quot;</code></th><th>정규식 <code translate="no">=~ &quot;a.*b&quot;</code></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>예</td><td>스캔</td><td>스캔</td><td>예</td><td>스캔</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>인덱싱된 값 확인</td><td>인덱스 값 확인</td><td>인덱스 값 확인</td><td>인덱스 값 확인</td><td>인덱스 값 확인</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>예</td><td>인덱스 값 확인</td><td>인덱스 값 확인</td><td>인덱스 값 확인</td><td>인덱스 값 확인</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>예</td><td>인덱스 값 확인</td><td>인덱스 값 확인</td><td>인덱스 값 확인</td><td>인덱스 값 확인</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>후보자</td><td>후보</td><td>후보; 구성된 그램 길이 범위 내의 리터럴에 정확히 일치하는 항목</td><td>후보</td><td>후보</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>예</td><td>예</td><td>예</td><td>후보자</td><td>후보</td></tr>
</tbody>
</table>
<p>이 항목들은 쿼리 계획 수립 후의 연산자를 설명합니다. Milvus는 리터럴 LIKE 패턴을 등가 조건으로, 간단한 앵커가 지정된 정규식을 등가, 접두사 또는 접미사 일치 조건으로 단순화할 수 있습니다. 예를 들어, ` <code translate="no">name =~ &quot;^abc$&quot;</code> `는 등가 테스트가 되어 등가 테이블을 따릅니다.</p>
<p><code translate="no">INVERTED</code> 더 복잡한 LIKE 패턴은 인덱스를 사용할 수 있더라도, 간단한 접미사 및 부분 문자열 형태는 스캔으로 처리합니다. <code translate="no">NGRAM</code> 는 길이가 최소 <code translate="no">min_gram</code> 인 리터럴 텍스트를 필요로 하며, 일반적인 LIKE는 비어 있지 않은 각 리터럴 조각이 해당 최소 길이를 충족해야 하며, 정규식 가속은 적절한 리터럴을 추출하는 데 달려 있습니다. 그렇지 않은 경우, Milvus는 데이터를 스캔합니다. 패턴이 유용한 필터링 기능을 거의 제공하지 않거나 인덱스를 통해 해결하는 데 비용이 너무 많이 드는 경우, ` <code translate="no">FMINDEX</code> `도 스캔을 선택할 수 있습니다.</p>
<p>이는 문자열 값 술어입니다. <code translate="no">TEXT_MATCH</code> 및 <code translate="no">PHRASE_MATCH</code> 와 같은 토큰 기반 함수는 필드 속성을 통해 구성된 텍스트 일치 인덱싱을 사용하며, 스칼라 <code translate="no">INVERTED</code> 인덱스를 선택해도 이러한 함수는 활성화되지 않습니다.</p>
<h3 id="Array-JSON-and-spatial-predicates" class="common-anchor-header">배열, JSON 및 공간 술어<button data-href="#Array-JSON-and-spatial-predicates" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>인덱스 유형</th><th>데이터 유형 또는 형 변환</th><th>인덱스를 사용할 수 있는 술어</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code> 또는 유효한 <code translate="no">AUTOINDEX</code> 선택 항목</td><td>지원되는 요소 유형을 가진 일반 배열</td><td><code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, <code translate="no">ARRAY_CONTAINS_ALL</code></td><td>위치에 관계없이 요소와 일치합니다. 인덱스/유형 제한은 여전히 적용됩니다.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>부울, 정수 또는 VARCHAR 값으로 구성된 일반 배열</td><td>전체 배열 <code translate="no">==</code> 및 <code translate="no">!=</code></td><td>인덱스 후보에 이어 원본 배열에 대한 검사를 수행할 수 있습니다. 부동 소수점 배열의 경우 스캔 방식으로 대체되며, 비트맵 인덱스는 이 후보 경로를 지원하지 않습니다.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code> 또는 유효한 <code translate="no">AUTOINDEX</code> 선택 항목</td><td><code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> 로 형변환된 JSON 경로, 또는 <code translate="no">VARCHAR</code></td><td>변환된 유형에 적합한 비교 및 멤버십</td><td>인덱싱된 경로와 형 변환은 쿼리와 일치해야 합니다. 문자열 패턴은 앞의 표를 따릅니다.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>다음으로 형변환된 JSON 경로 <code translate="no">VARCHAR</code></td><td>LIKE 및 정규식 패턴으로 변환된 JSON 경로</td><td>VARCHAR NGRAM 인덱스와 동일한 패턴 유효성 규칙을 사용합니다.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> 또는 유효한 <code translate="no">AUTOINDEX</code> 선택</td><td><code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> 또는 <code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_CONTAINS_ANY</code>, <code translate="no">JSON_CONTAINS_ALL</code></td><td>호환되는 요소 유형이 필요합니다. 유형이 혼합되거나 중첩된 배열인 피연산자는 스캔 방식으로 대체될 수 있습니다.</td></tr>
<tr><td><code translate="no">INVERTED</code> 형 변환 시 <code translate="no">JSON</code></td><td>전체 JSON 인덱스</td><td>지원되는 스칼라 경로에 대한 비교 및 멤버십; 지원되는 문자열 패턴; 지원되는 배열 경로에 대한 JSON 포함 관계</td><td>문자열 경로는 INVERTED 동작을 따릅니다. 배열 포함 여부는 호환되는 요소 유형이 필요합니다.</td></tr>
<tr><td>JSON 경로 인덱스 및 전체 JSON 인덱스</td><td>인덱싱된 JSON 경로</td><td><code translate="no">exists</code></td><td>경로가 존재하는지 여부를 검사하며, 이는 경로의 값을 검사하거나 전체 필드가 null인지 여부를 검사하는 것과는 다릅니다.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td><code translate="no">ST_EQUALS</code>, <code translate="no">ST_INTERSECTS</code>, <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_WITHIN</code>, <code translate="no">ST_TOUCHES</code>, <code translate="no">ST_OVERLAPS</code>, <code translate="no">ST_CROSSES</code>, <code translate="no">ST_DWITHIN</code></td><td>바운딩 박스를 사용하여 후보를 찾은 다음, 정확한 공간적 관계를 확인합니다. <code translate="no">ST_ISVALID</code> 는 RTREE를 사용하지 않습니다.</td></tr>
</tbody>
</table>
<p>배열 포함 지원이 <code translate="no">values[0]</code> 와 같이 특정 위치의 요소에 대한 인덱스 조회나 배열 길이에 대한 조회를 의미하는 것은 아닙니다. 전체 배열의 동일성 검사에서는 순서와 길이도 확인해야 하며, 이는 요소의 소속 여부만으로는 확인할 수 없습니다.</p>
<p><code translate="no">IS NULL</code> <code translate="no">IS NOT NULL</code> 는 유효성 정보를 사용하며 특정 스칼라 인덱스 유형을 요구하지 않습니다. 술어를 , , 와 결합할 수 있으며, 각 부분은 자체적으로 허용되는 실행 경로를 사용할 수 있습니다. <code translate="no">and</code> <code translate="no">or</code> <code translate="no">not</code></p>
<h2 id="Version-compatibility" class="common-anchor-header">버전 호환성<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>대부분의 스칼라 인덱스( <code translate="no">BITMAP</code>, <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code> 및 일반 스칼라 필드에 대한 <code translate="no">NGRAM</code> )에는 버전 요구 사항이 없습니다. 아래 요구 사항은 배열 필드에 대한 인덱스, JSON-path 인덱스 및 <code translate="no">FMINDEX</code> 와 같은 최신 조합에만 적용됩니다.</p>
<p>이러한 요구 사항은 스칼라 인덱스 엔진 버전 번호를 사용하며, 이는 Milvus 소프트웨어 릴리스 번호와는 별개의 내부 기능 카운터입니다.</p>
<table>
<thead>
<tr><th>기능</th><th>요구 사항</th></tr>
</thead>
<tbody>
<tr><td>명시적 <code translate="no">FMINDEX</code></td><td>스칼라 인덱스 엔진 버전 5 이상</td></tr>
<tr><td>명시적 일반 배열에 대한 <code translate="no">STL_SORT</code> </td><td>스칼라 인덱스 엔진 버전 3 이상(배열 정렬 지원이 활성화된 경우)</td></tr>
<tr><td><code translate="no">HYBRID</code> 일반 배열에 대해 <code translate="no">STL_SORT</code> 선택</td><td>스칼라 인덱스 엔진 버전 5 이상이며, 배열 정렬 지원이 활성화된 경우</td></tr>
<tr><td><code translate="no">BITMAP</code>, JSON 스칼라 경로에 대한 <code translate="no">STL_SORT</code> 또는 <code translate="no">HYBRID</code> </td><td>스칼라 인덱스 엔진 버전 4 이상</td></tr>
<tr><td><code translate="no">STL_SORT</code> 또는 유형 지정된 JSON 배열 경로의 경우 <code translate="no">HYBRID</code> </td><td>스칼라 인덱스 엔진 버전 3 이상, 배열 정렬 지원이 활성화된 경우</td></tr>
</tbody>
</table>
<p>배열 또는 JSON 호환성 요구 사항이 충족되지 않는 경우, 영향을 받는 자동 요청은 <code translate="no">INVERTED</code> 로 대체될 수 있으며, 지원되지 않는 조합에 대한 명시적 요청은 실패합니다. 일반 배열 <code translate="no">HYBRID</code> 의 경우, 높은 카디널리티 분기는 정렬된 인덱싱을 사용할 수 있을 때까지 <code translate="no">INVERTED</code> 를 계속 사용합니다.</p>
<h2 id="Performance-considerations" class="common-anchor-header">성능 고려 사항<button data-href="#Performance-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>인덱스 성능은 데이터 분포와 애플리케이션에서 사용하는 필터에 따라 달라집니다. 카디널리티, 문자열 길이, 배열 길이, 일치하는 엔티티의 수는 모두 메모리 사용량과 쿼리 지연 시간에 영향을 미칠 수 있습니다. 대표적인 데이터와 필터 표현식을 사용하여 인덱스를 비교하고, 메모리 사용량, 생성 시간, 쿼리 지연 시간을 함께 측정하십시오.</p>
<h3 id="Estimating-memory-requirements" class="common-anchor-header">메모리 요구량 추정<button data-href="#Estimating-memory-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 공식은 메모리 매핑이 비활성화된 상태에서 스칼라 인덱스가 로드된 후 필요한 메모리 양을 대략적으로 추정해 줍니다. <code translate="no">STL_SORT</code> 의 공식은 NULL 값이 없는 일반적인 스칼라 필드를 가정합니다.</p>
<ul>
<li><code translate="no">N</code>: 엔티티 수.</li>
<li><code translate="no">D</code>: 고유 값의 수.</li>
<li><code translate="no">l</code>: 고유 문자열의 평균 길이( <strong>바이트</strong> 단위).</li>
<li><code translate="no">S</code>: 저장 압축 전 생성된 인덱스의 크기( <strong>바이트</strong> 단위).</li>
</ul>
<table>
<thead>
<tr><th>인덱스 유형</th><th>대략적인 메모리 사용량(바이트 단위)</th><th>직관적 설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">STL_SORT</code> <code translate="no">INT8</code>, , 또는 <code translate="no">INT16</code> <code translate="no">INT32</code> <code translate="no">FLOAT</code></td><td><code translate="no">12 * N</code></td><td>엔티티당 약 12바이트.</td></tr>
<tr><td><code translate="no">STL_SORT</code> <code translate="no">INT64</code>, 또는 <code translate="no">DOUBLE</code> <code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">20 * N</code></td><td>값이 더 큰 경우 엔티티당 약 20바이트입니다.</td></tr>
<tr><td><code translate="no">STL_SORT</code> 에서 <code translate="no">VARCHAR</code></td><td><code translate="no">8 * N + (l + 16) * D</code></td><td>반복되는 문자열은 저장 공간을 공유하므로, 고유한 문자열이 적을수록 일반적으로 메모리 사용량이 줄어듭니다.</td></tr>
<tr><td><code translate="no">BITMAP</code>, 고밀도 비트맵을 사용하여</td><td><code translate="no">(D + 1) * N / 8</code></td><td>on각 고유 값은 엔티티당 대략 1비트가 필요하며, 유효한 엔티티를 추적하기 위한 비트맵 1개가 추가로 필요합니다.</td></tr>
<tr><td><code translate="no">INVERTED</code> 또는 <code translate="no">NGRAM</code></td><td><code translate="no">S</code></td><td>구축된 인덱스의 크기를 기준으로 시작하십시오.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">2 * S</code></td><td>구축된 인덱스 크기의 약 2배를 허용합니다.</td></tr>
</tbody>
</table>
<p>결과를 <code translate="no">1024 * 1024</code> 로 나누어 바이트를 <strong>MiB로</strong> 변환합니다. 예를 들어, 100만 개의 null이 아닌 <code translate="no">INT64</code> 값을 가진 <code translate="no">STL_SORT</code> 인덱스의 경우, 주요 데이터 구조에 약 <strong>19 MiB가</strong> 필요합니다. 모든 문자열이 고유한 VARCHAR 필드의 경우, 추정치는 <code translate="no">(l + 24) * N</code> 로 단순화됩니다. 평균 32바이트인 100만 개의 고유 문자열은 약 <strong>53 MiB를</strong> 차지합니다.</p>
<p>BITMAP 공식은 고밀도 비트맵 저장을 설명하며, 선택적 오프셋 캐시를 활성화하면 64비트 시스템에서 약 <code translate="no">8 * N</code> 바이트가 추가됩니다. <code translate="no">INVERTED</code>, <code translate="no">NGRAM</code> 및 <code translate="no">FMINDEX</code> 의 경우, 대표 데이터에 인덱스를 생성하여 <code translate="no">S</code> 를 구하십시오. 원시 데이터 크기는 생성된 인덱스 크기를 대체할 수 없습니다. <code translate="no">AUTOINDEX</code> 의 경우, 실제로 선택된 인덱스에 대한 공식을 사용하고 세그먼트별 추정치를 적용한 다음, 로드된 세그먼트와 복제본 전체에 걸쳐 이를 합산하십시오.</p>
<p>이는 대략적인 계획 수치일 뿐, 메모리 제한값이 아닙니다. 이 수치에는 인덱스 생성, 로딩 및 쿼리 실행 중에 사용되는 임시 메모리가 포함되지 않으며, 숫자형 <code translate="no">STL_SORT</code> 보다 문자열 및 비트맵 인덱스의 고유 값과 데이터 분포에 더 민감하게 반응합니다. 정확도에 대한 고정된 비율은 보장되지 않습니다. 메모리 매핑, 구형 인덱스 형식, 배열 및 JSON 필드는 별도의 측정이 필요합니다. 배포 규모를 결정하기 전에 대표적인 데이터와 쿼리를 사용하여 실제 메모리 사용량을 확인하고, 피크 사용량을 대비해 여유 공간을 확보하십시오.</p>
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
<li>인덱스 생성 및 구성 예제는 <a href="/docs/ko/bitmap.md">BITMAP</a>, <a href="/docs/ko/inverted.md">INVERTED</a>, <a href="/docs/ko/ngram.md">NGRAM</a>, <a href="/docs/ko/stl-sort.md">STL_SORT</a>, <a href="/docs/ko/trie.md">TRIE</a>, <a href="/docs/ko/fmindex.md">FMINDEX</a> 및 <a href="/docs/ko/rtree.md">RTREE를</a> 참조하십시오.</li>
<li>필드 정의 및 컬렉션 스키마에 대해서는 <a href="/docs/ko/schema.md">‘스키마 설명</a>’을 참조하십시오.</li>
</ul>
