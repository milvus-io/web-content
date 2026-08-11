---
id: json-indexing.md
title: JSON 인덱싱
summary: >-
  JSON 필드는 Milvus에 구조화된 메타데이터를 저장할 수 있는 유연한 방법을 제공합니다. 인덱싱이 없으면 JSON 필드에 대한 쿼리를
  실행할 때 컬렉션 전체를 스캔해야 하므로, 데이터 세트가 커질수록 처리 속도가 느려집니다. JSON 인덱싱을 사용하면 JSON 데이터 내의
  특정 경로에 인덱스를 생성하므로, 해당 경로에 대한 등가, 범위 및 기타 필터 쿼리가 빠르게 실행됩니다.
---
<h1 id="JSON-Indexing" class="common-anchor-header">JSON 인덱싱<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>JSON 필드는 Milvus에 구조화된 메타데이터를 저장할 수 있는 유연한 방법을 제공합니다. 인덱싱이 없으면 JSON 필드에 대한 쿼리를 실행할 때 컬렉션 전체를 스캔해야 하므로, 데이터 세트가 커질수록 처리 속도가 느려집니다. JSON 인덱싱은 JSON 데이터 내의 특정 경로에 인덱스를 생성하여, 해당 경로에 대한 등가, 범위 및 기타 필터 쿼리가 빠르게 실행되도록 합니다.</p>
<p>JSON 인덱싱은 다음 용도에 이상적입니다:</p>
<ul>
<li><p>일관되고 알려진 키를 가진 구조화된 스키마</p></li>
<li><p>특정 JSON 경로에 대한 등가, <code translate="no">IN</code>, 범위 및 텍스트 일치 쿼리</p></li>
<li><p>어떤 키를 인덱싱할지 정밀하게 제어해야 하는 시나리오</p></li>
</ul>
<p>다양한 쿼리 패턴이 있는 복잡한 JSON 문서의 경우, 대안으로 <a href="/docs/ko/json-shredding.md">JSON 분할(JSON Shredding)을</a> 고려해 보십시오.</p>
<h2 id="Index-type-overview" class="common-anchor-header">인덱스 유형 개요<button data-href="#Index-type-overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 JSON 경로에 대해 네 가지 인덱스 유형을 제공합니다. 각 유형은 서로 다른 쿼리 패턴에 적합합니다.</p>
<p>인덱스 유형을 선택하기 전에 JSON 경로의 <strong>캐스트 유형을</strong> 확인하십시오. 캐스트 유형에 따라 Milvus가 해당 경로의 값을 해석하는 방식과 사용 가능한 인덱스 유형이 결정됩니다.</p>
<h3 id="Understand-cast-types" class="common-anchor-header">캐스트 유형 이해<button data-href="#Understand-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">json_cast_type</code> 캐스트 유형(cast type)은 <code translate="no">json_path</code> 경로의 값을 해석하고 색인화하는 데 사용되는 데이터 유형입니다. 이는 필드 스키마 유형과는 다릅니다. 필드는 여전히 Milvus 데이터베이스( <code translate="no">JSON</code> )의 필드이지만, 색인화된 각 경로는 특정 스칼라, 배열 또는 JSON 객체 유형으로 처리됩니다.</p>
<p>경로에 저장된 값과 일치하는 캐스트 유형을 선택하십시오. 캐스트 유형이 특정 인덱스 유형과 호환되는지 확인하려면 <a href="/docs/ko/json-indexing.md#compatibility-reference">호환성 참조를</a> 참조하십시오.</p>
<table>
<thead>
<tr><th>변환 유형</th><th>경로 값이 다음과 같은 경우 사용하십시오…</th><th>예시 값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>부울 값</td><td><code translate="no">true</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>숫자 값</td><td><code translate="no">99.99</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>문자열 값</td><td><code translate="no">&quot;electronics&quot;</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>부울 값의 배열</td><td><code translate="no">[true, false]</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>숫자 값의 배열</td><td><code translate="no">[1.2, 3.14]</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>문자열 값의 배열</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td>전체 JSON 객체 또는 하위 객체. 전체 객체에 대한 JSON 인덱싱은 Milvus 3.0.0부터 더 이상 권장되지 않습니다.</td><td><code translate="no">{&quot;supplier&quot;: {&quot;country&quot;: &quot;USA&quot;}}</code></td></tr>
</tbody>
</table>
<p>동일한 경로의 값들이 서로 다른 유형인 경우, 형 변환된 유형과 일치하는 값만 인덱싱됩니다. 예를 들어, ` <code translate="no">metadata[&quot;price&quot;]</code> `에 ` <code translate="no">99.99</code> `과 ` <code translate="no">&quot;99.99&quot;</code>`이 모두 포함되어 있다면, ` <code translate="no">DOUBLE</code> ` 형 변환 유형의 인덱스는 숫자 값을 포함하고 문자열 값은 제외합니다. 인덱싱 중에 문자열 값을 변환하려면 ` <code translate="no">json_cast_function</code>`을 사용하십시오. <a href="/docs/ko/json-indexing.md#example-5-convert-data-type-at-index-time">예제 5: 인덱싱 시 데이터 유형 변환을</a> 참조하십시오.</p>
<h3 id="Choose-an-index-type" class="common-anchor-header">인덱스 유형 선택<button data-href="#Choose-an-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>캐스트 유형을 선택한 후, 쿼리 패턴에 따라 인덱스 유형을 선택하십시오.</p>
<table>
<thead>
<tr><th>쿼리 패턴</th><th>권장 인덱스 유형</th><th>캐스트 유형 요구 사항</th><th>참고 사항</th></tr>
</thead>
<tbody>
<tr><td>스칼라 값에 대한 등가 및 범위 필터의 혼합 사용</td><td><code translate="no">AUTOINDEX</code></td><td><code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> 또는 <code translate="no">VARCHAR</code> 를 사용하십시오.</td><td>Milvus가 값의 카디널리티에 따라 내부 인덱스 레이아웃을 선택하도록 합니다.</td></tr>
<tr><td>JSON 배열 내 값에 대한 필터</td><td><code translate="no">INVERTED</code></td><td><code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> 또는 <code translate="no">ARRAY_VARCHAR</code> 을 사용하십시오.</td><td>모든 배열 형식에 필수입니다.</td></tr>
<tr><td>전체 객체 또는 하위 객체 인덱싱 (사용 중단됨)</td><td><code translate="no">INVERTED</code> 또는 <code translate="no">AUTOINDEX</code> (호환성 용도로만 사용)</td><td><code translate="no">JSON</code> 를 사용하십시오.</td><td>호환성을 위해 지원됩니다. 새로운 워크로드의 경우 경로별 인덱스를 생성하거나 <a href="/docs/ko/json-shredding.md">JSON 분할을</a> 고려하십시오.</td></tr>
<tr><td>숫자 또는 정렬 가능한 문자열에 대한 범위 필터</td><td><code translate="no">STL_SORT</code> 또는 <code translate="no">AUTOINDEX</code></td><td><code translate="no">DOUBLE</code> 또는 <code translate="no">VARCHAR</code> 을 사용하십시오.</td><td><code translate="no">STL_SORT</code> 를 사용하여 정렬된 레이아웃을 강제 적용하고, 자동 선택을 원할 때는 <code translate="no">AUTOINDEX</code> 를 사용하십시오.</td></tr>
<tr><td>카드널리티가 낮은 값에 대한 등가 또는 <code translate="no">IN</code> 필터</td><td><code translate="no">BITMAP</code> 또는 <code translate="no">AUTOINDEX</code></td><td><code translate="no">BOOL</code> 또는 <code translate="no">VARCHAR</code> 을 사용하십시오.</td><td><code translate="no">BITMAP</code> 를 사용하여 비트맵 레이아웃을 강제 적용하십시오. 숫자 값의 경우 <code translate="no">AUTOINDEX</code> 또는 <code translate="no">STL_SORT</code> 를 사용하십시오.</td></tr>
</tbody>
</table>
<p>확실하지 않은 경우, 스칼라 경로에는 <code translate="no">AUTOINDEX</code> 로 시작하십시오. 배열 형 변환 및 텍스트 일치 쿼리의 경우 <code translate="no">INVERTED</code> 를 명시적으로 사용하십시오. <code translate="no">INVERTED</code> 또는 <code translate="no">AUTOINDEX</code> 를 사용한 전체 객체 JSON 인덱싱은 계속 지원되지만, Milvus 3.0.0부터 사용이 권장되지 않습니다.</p>
<h3 id="AUTOINDEX" class="common-anchor-header">AUTOINDEX<button data-href="#AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">AUTOINDEX</code> 의 동작은 사용자가 지정한 <code translate="no">json_cast_type</code> 에 따라 달라집니다. Milvus 3.0에서는 JSON 경로 인덱스의 경우 <code translate="no">AUTOINDEX</code> 가 더 이상 항상 <code translate="no">INVERTED</code> 로 해석되지 않습니다.</p>
<table>
<thead>
<tr><th>형 변환</th><th><code translate="no">AUTOINDEX</code> 동작</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>값의 카디널리티에 따라 <code translate="no">BITMAP</code> 과 <code translate="no">STL_SORT</code> 중 하나를 선택합니다.</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code>, <code translate="no">ARRAY_VARCHAR</code></td><td>지원되지 않습니다. 인덱스 유형으로 <code translate="no">INVERTED</code> 을 명시적으로 사용하십시오.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>전체 객체 또는 하위 객체 인덱싱에 <code translate="no">INVERTED</code> 를 사용합니다. 이 모드는 Milvus 3.0.0부터 더 이상 권장되지 않습니다.</td></tr>
</tbody>
</table>
<p>스칼라 형 변환 유형(<code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code>)의 경우, Milvus가 내부 인덱스 레이아웃을 선택하도록 하려면 <code translate="no">AUTOINDEX</code> 을 시작점으로 사용하는 것이 권장됩니다. 인덱스 구축 과정에서 Milvus는 JSON 경로에서 값의 <strong>카디널리티를</strong> 측정합니다. 카디널리티란 해당 경로에 있는 고유 값의 수를 의미합니다.</p>
<p>카디널리티에 따라 Milvus는 다음 두 가지 내부 레이아웃 중 하나를 선택합니다:</p>
<ul>
<li><p><strong>낮은 카디널리티</strong>: 값이 자주 반복되는 경우입니다. 예를 들어, <code translate="no">metadata[&quot;in_stock&quot;]</code> 에 <code translate="no">true</code> 및 <code translate="no">false</code> 가 있거나, <code translate="no">metadata[&quot;status&quot;]</code> 에 소수의 상태 문자열이 있는 경우입니다. Milvus는 빠른 등가 비교(equality) 및 <code translate="no">IN</code> 필터링을 위해 내부적으로 <code translate="no">BITMAP</code> 인덱스를 구축합니다.</p></li>
<li><p><strong>높은 카디널리티</strong>: 대부분의 값이 고유한 경우입니다(예: <code translate="no">metadata[&quot;price&quot;]</code>, <code translate="no">metadata[&quot;created_at&quot;]</code>, <code translate="no">metadata[&quot;product_id&quot;]</code>). Milvus는 <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code> 와 같은 빠른 범위 필터를 위해 내부적으로 <code translate="no">STL_SORT</code> 인덱스를 생성합니다.</p></li>
</ul>
<p><code translate="no">BITMAP</code> 와<code translate="no">STL_SORT</code> 간의 기본 임계값은 <strong>고유 값 100개입니다</strong>. <code translate="no">bitmap_cardinality_limit</code> 를 사용하여 이 임계값을 조정할 수 있습니다. 자세한 내용은 <a href="/docs/ko/json-indexing.md#how-do-i-tune-autoindexs-bitmap-vs-stl-sort-threshold">“AUTOINDEX의 BITMAP-vs-STL_SORT 임계값은 어떻게 조정하나요?</a>”를 참조하십시오.</p>
<div class="alert note">
<p><strong>Milvus 3.0에서 동작이 변경되었습니다</strong>. 이전 버전에서는 JSON 경로에 대한 <code translate="no">AUTOINDEX</code> 가 항상 <code translate="no">INVERTED</code> 인덱스를 생성했습니다. Milvus 3.0부터는 <code translate="no">AUTOINDEX</code> 가 스칼라 캐스트 유형에 대해 <code translate="no">BITMAP</code> 와 <code translate="no">STL_SORT</code> 중에서 선택합니다. <code translate="no">JSON</code> 의 경우, <code translate="no">AUTOINDEX</code> 는 여전히 <code translate="no">INVERTED</code> 를 사용하지만, 전체 객체 JSON 인덱싱은 더 이상 권장되지 않습니다. 배열 캐스트 유형 및 텍스트 일치 쿼리의 경우, <code translate="no">INVERTED</code> 를 명시적으로 지정해야 합니다.</p>
</div>
<h3 id="INVERTED" class="common-anchor-header">INVERTED<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">INVERTED</code> 는 텍스트 일치 쿼리나 배열 인덱싱이 필요한 경우 가장 적합합니다. 또한 더 이상 권장되지 않는 전체 객체 JSON 인덱싱에도 계속 사용할 수 있습니다.</p>
<p>다음과 같은 경우에는 <code translate="no">INVERTED</code> 을 명시적으로 지정하십시오.</p>
<ul>
<li><p>JSON 배열 내부의 값에 인덱스를 생성해야 하는 경우.</p></li>
<li><p>기존 JSON 객체 전체 또는 하위 객체에 대한 인덱스를 유지하면서 ` <code translate="no">INVERTED</code> ` 동작을 명시적으로 적용하고자 할 때.</p></li>
<li><p>등가, <code translate="no">IN</code>, 범위, 텍스트 일치 및 배열 쿼리를 모두 처리할 수 있는 단일 인덱스 유형을 원할 때. 호환성을 위해 전체 객체 지원은 계속 사용할 수 있으나, 인덱스 크기가 더 커진다는 단점이 있습니다.</p></li>
</ul>
<p>전체 JSON 객체(<code translate="no">json_cast_type=&quot;JSON&quot;</code>)에 대한 기존 인덱스의 경우, <code translate="no">INVERTED</code> 또는 <code translate="no">AUTOINDEX</code> 을 계속 사용할 수 있습니다. <code translate="no">AUTOINDEX</code> 은 이 형 변환 유형에 대해 <code translate="no">INVERTED</code> 을 사용합니다. 새로운 워크로드의 경우 전체 객체 JSON 인덱싱은 더 이상 권장되지 않습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/inverted.md">INVERTED</a>를 참조하십시오.</p>
<h3 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">STL_SORT</code> 는 JSON 경로의 값을 정렬된 순서대로 저장합니다. 이 함수는 숫자 값이나 정렬 가능한 문자열 값에 대한 범위 필터링에 최적화되어 있습니다.</p>
<p><code translate="no">STL_SORT</code> <code translate="no">DOUBLE</code> 및 형 변환만 지원합니다. 다음과 같은 경우에 사용하십시오: <code translate="no">VARCHAR</code> </p>
<ul>
<li><p>필터에서 <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> 또는 <code translate="no">&lt;=</code> 와 값을 비교하는 경우.</p></li>
<li><p>가격, 타임스탬프, ID 또는 정렬 가능한 코드와 같이 인덱싱된 값의 카디널리티가 높은 경우.</p></li>
<li><p><code translate="no">AUTOINDEX</code> 가 자동으로 결정하는 대신 정렬된 레이아웃을 강제로 적용하려는 경우.</p></li>
</ul>
<p><code translate="no">STL_SORT</code> <code translate="no">BOOL</code>, 또는 형 변환을 지원하지 않습니다. 배열의 경우 를 사용하십시오. 기존의 전체 객체 인덱스는 계속해서 또는 를 사용할 수 있지만, 전체 객체 JSON 인덱싱은 더 이상 사용되지 않습니다. <code translate="no">ARRAY_*</code> <code translate="no">JSON</code> <code translate="no">INVERTED</code> <code translate="no">INVERTED</code> <code translate="no">AUTOINDEX</code></p>
<p>자세한 내용은 <a href="/docs/ko/stl-sort.md">STL_SORT</a>를 참조하십시오.</p>
<h3 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BITMAP</code> JSON 경로 내의 각 고유 값에 대해 압축된 비트맵을 생성합니다. 이 기능은 자주 반복되는 값에 대한 등가성 및 <code translate="no">IN</code> 필터에 최적화되어 있습니다.</p>
<p><code translate="no">BITMAP</code> <code translate="no">BOOL</code> 및 형 변환만 지원합니다. 다음과 같은 경우에 사용하십시오: <code translate="no">VARCHAR</code> </p>
<ul>
<li><p>필터에 ` <code translate="no">==</code> ` 또는 ` <code translate="no">IN</code>`을 사용하는 경우.</p></li>
<li><p>부울 값, 상태 값 또는 소수의 범주와 같이 인덱싱된 값의 카디널리티가 낮은 경우.</p></li>
<li><p><code translate="no">AUTOINDEX</code> 가 자동으로 선택하도록 두지 않고 비트맵 레이아웃을 강제 적용하려는 경우.</p></li>
</ul>
<p><code translate="no">BITMAP</code> <code translate="no">DOUBLE</code>, 또는 형 변환을 지원하지 않습니다. 숫자 값의 경우 대신 , 또는 을 사용하십시오. <code translate="no">ARRAY_*</code> <code translate="no">JSON</code> <code translate="no">AUTOINDEX</code> <code translate="no">STL_SORT</code> <code translate="no">INVERTED</code> </p>
<p>자세한 내용은 <a href="/docs/ko/bitmap.md">BITMAP</a>을 참조하십시오.</p>
<h3 id="Compatibility-reference" class="common-anchor-header">호환성 참조<button data-href="#Compatibility-reference" class="anchor-icon" translate="no">
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
    </button></h3><p>지원되는 <code translate="no">(cast type, index type)</code> 조합에 대한 빠른 참조로 다음 매트릭스를 사용하십시오.</p>
<table>
<thead>
<tr><th>형 변환</th><th>설명</th><th>예시 값</th><th>AUTOINDEX</th><th>INVERTED</th><th>STL_SORT</th><th>BITMAP</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>부울 값(<code translate="no">true</code>/<code translate="no">false</code>).</td><td><code translate="no">true</code></td><td>예</td><td>예</td><td>아니요</td><td>예</td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>숫자 값(정수 또는 실수).</td><td><code translate="no">99.99</code></td><td>예</td><td>예</td><td>예</td><td>아니요</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>문자열 값.</td><td><code translate="no">&quot;electronics&quot;</code></td><td>예</td><td>예</td><td>예</td><td>예</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>부울 값의 배열.</td><td><code translate="no">[true, false]</code></td><td>아니요</td><td>예</td><td>아니요</td><td>아니요</td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>숫자 배열.</td><td><code translate="no">[1.2, 3.14]</code></td><td>아니요</td><td>예</td><td>아니요</td><td>아니요</td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>문자열 배열.</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td><td>아니요</td><td>예</td><td>아니요</td><td>아니요</td></tr>
<tr><td><code translate="no">JSON</code></td><td>자동 유형 추론 및 평탄화가 적용된 전체 JSON 객체 또는 하위 객체. Milvus 3.0.0부터 사용이 권장되지 않습니다.</td><td>중첩된 객체</td><td>예 (사용 중단됨)</td><td>예 (사용 중단 예정)</td><td>아니요</td><td>아니요</td></tr>
</tbody>
</table>
<p><code translate="no">No</code> 로 표시된 셀의 경우, Milvus는 인덱스 생성 시점에 요청을 거부합니다. 배열 형식으로 변환된 유형의 경우, <code translate="no">INVERTED</code> 를 명시적으로 사용하십시오(<code translate="no">AUTOINDEX</code> 는 배열을 지원하지 않습니다).</p>
<h2 id="Create-a-JSON-index" class="common-anchor-header">JSON 인덱스 생성<button data-href="#Create-a-JSON-index" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 다양한 형태의 JSON 데이터에 인덱스를 생성하는 방법을 단계별로 설명합니다. 모든 예제는 아래의 샘플 구조를 사용하며, <code translate="no">metadata</code> 라는 이름의 <code translate="no">JSON</code> 필드가 포함된 컬렉션이 이미 존재한다고 가정합니다.</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">JSON 샘플 구조<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Basic-setup" class="common-anchor-header">기본 설정<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>아래 예제는 Milvus 배포 환경에 연결된 <code translate="no">client</code> 라는 이름의 <code translate="no">MilvusClient</code> 가 있고, <code translate="no">metadata</code> 라는 이름의 <code translate="no">JSON</code> 필드가 이미 포함된 컬렉션이 있다고 가정합니다. 이를 처음부터 설정해야 하는 경우, 아래 블록을 확장하십시오.</p>
<p><details></p>
<p><summary>연결 및 샘플 컬렉션 생성</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Define a schema with a JSON field</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)
schema.add_field(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.JSON, nullable=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Minimal vector index so the collection can be loaded</span>
vec_index = client.prepare_index_params()
vec_index.add_index(field_name=<span class="hljs-string">&quot;vec&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    schema=schema,
    index_params=vec_index,
)

<span class="hljs-comment"># Insert one row that matches the sample JSON structure above</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[{
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }],
)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>아래 예제에 추가된 인덱스 정의를 수집할 index-params 객체를 준비하십시오:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<p>다음의 각 예제는 하나의 ` <code translate="no">index_params.add_index(...)</code> ` 호출을 보여줍니다. 데이터에 맞는 예제를 선택하여 동일한 ` <code translate="no">index_params</code> ` 객체에 대해 호출하십시오. 그런 다음 마지막에 단일 ` <code translate="no">client.create_index(...)</code> ` 호출로 모든 내용을 적용하십시오. 자세한 내용은 <a href="/docs/ko/json-indexing.md#apply-the-index">인덱스 적용을</a> 참조하십시오.</p>
<h3 id="Example-1-Index-a-top-level-key-with-AUTOINDEX" class="common-anchor-header">예제 1: AUTOINDEX를 사용하여 최상위 키에 인덱스 생성<button data-href="#Example-1-Index-a-top-level-key-with-AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>제품 카테고리별로 빠르게 필터링할 수 있도록 <code translate="no">category</code> 필드에 인덱스를 생성합니다. <code translate="no">AUTOINDEX</code> 을 사용하면 Milvus는 데이터에 존재하는 고유 카테고리 수에 따라 <code translate="no">BITMAP</code> 또는 <code translate="no">STL_SORT</code> 중 하나를 선택합니다.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">예 2: 중첩된 키에 인덱스 생성<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>공급업체 연락처 조회를 위해 깊게 중첩된 ` <code translate="no">email</code> ` 필드에 인덱스를 생성합니다. ` <code translate="no">json_path</code> ` 매개변수는 어떤 깊이의 중괄호 표기법도 허용합니다.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-queries-with-STLSORT" class="common-anchor-header">예 3: STL_SORT를 사용한 범위 쿼리<button data-href="#Example-3-Range-queries-with-STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p>경로 기반 쿼리가 범위 비교(<code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code>) 위주로 이루어질 것이 확실한 경우, 직접 <code translate="no">STL_SORT</code> 를 선택하십시오. 이렇게 하면 카디널리티 측정을 건너뛰고 정렬된 레이아웃을 즉시 구축할 수 있습니다.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>인덱싱이 완료된 후에는 <code translate="no">metadata[&quot;price&quot;] &gt; 50 AND metadata[&quot;price&quot;] &lt; 100</code> 와 같은 범위 쿼리가 전체 스캔 대신 이진 검색을 사용합니다.</p>
<h3 id="Example-4-Equality-queries-with-BITMAP" class="common-anchor-header">예제 4: BITMAP을 사용한 등가 쿼리<button data-href="#Example-4-Equality-queries-with-BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p>상태 코드, 부울 값 또는 열거형과 유사한 문자열과 같이 카디널리티가 낮은 키의 경우, <code translate="no">BITMAP</code> 를 직접 선택하십시오. 등가 쿼리와 <code translate="no">IN</code> 쿼리는 비트맵 연산으로 변환됩니다.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;in_stock_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;in_stock&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;BOOL&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">BITMAP</code> 또한, 고유한 문자열 값이 소수인 <code translate="no">status</code> 열과 같은 필드에도 매우 적합합니다.</p>
<h3 id="Example-5-Convert-data-type-at-index-time" class="common-anchor-header">예제 5: 인덱스 생성 시 데이터 유형 변환<button data-href="#Example-5-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>숫자 데이터가 실수로 문자열로 저장된 경우, 인덱스 생성 중에 <code translate="no">STRING_TO_DOUBLE</code> 를 사용하여 값을 숫자로 변환하십시오.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>특정 행에서 변환이 실패하는 경우(예: <code translate="no">&quot;invalid&quot;</code> 과 같은 비숫자 문자열), 해당 행은 인덱싱 과정에서 건너뜁니다.</p>
<h3 id="Example-6-Index-entire-JSON-objects" class="common-anchor-header">예 6: 전체 JSON 객체 인덱싱<button data-href="#Example-6-Index-entire-JSON-objects" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert warning">
<p>Milvus 3.0.0부터 JSON 플랫 인덱싱이라고도 하는 전체 객체 JSON 인덱싱(<code translate="no">json_cast_type=&quot;JSON&quot;</code>)은 더 이상 사용되지 않습니다. 호환성을 위해 기존 인덱스와 새로운 인덱스 생성 요청은 계속 지원되지만, 새로운 워크로드에는 이 모드를 더 이상 권장하지 않습니다. 알려진 쿼리 경로에 대해서는 JSON 경로 인덱스를 생성하십시오. 광범위한 쿼리 패턴을 가진 복잡하거나 지속적으로 변화하는 JSON 문서의 경우, <a href="/docs/ko/json-shredding.md">JSON 분할(JSON Shredding)을</a> 고려해 보십시오. JSON 분할은 배열 내부의 값에 대해서는 성능 향상을 제공하지 않으므로, 해당 쿼리에는 배열 캐스트 유형을 사용하는 JSON 경로 인덱스를 활용하십시오.</p>
</div>
<p>호환되는 기존 워크로드의 경우, ` <code translate="no">json_cast_type=&quot;JSON&quot;</code> `를 설정하면 지정된 경로의 전체 구조가 인덱싱됩니다. Milvus는 중첩된 객체를 경로로 평탄화하고 각 값의 유형을 자동으로 추론합니다. 해당 경로 아래의 모든 키는 검색 가능해집니다.</p>
<p><code translate="no">AUTOINDEX</code> 평탄화 및 유형 추론은 인버티드 인덱스(inverted-index) 기능에 해당하므로, ` <code translate="no">JSON</code> ` 캐스트 유형의 경우 ` <code translate="no">INVERTED</code> `를 투명하게 사용합니다.</p>
<p><code translate="no">metadata</code> 객체 전체를 인덱싱하려면:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>또는 모든 <code translate="no">supplier</code> 정보와 같은 하위 객체를 색인화합니다:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>전체 객체를 인덱싱하면 인덱스 크기가 증가합니다. 문서가 깊게 중첩되어 있고 쿼리 패턴이 다양한 새로운 워크로드의 경우, 경로별 인덱스를 사용하거나 <a href="/docs/ko/json-shredding.md">JSON 분할(JSON Shredding</a>) <a href="/docs/ko/json-shredding.md">을</a> 고려해 보십시오.</p>
<h3 id="Apply-the-index" class="common-anchor-header">인덱스 적용<button data-href="#Apply-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>모든 인덱스 매개변수를 추가한 후, 컬렉션에 적용합니다:</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>인덱스 구축은 비동기적으로 실행됩니다. <code translate="no">client.describe_index(...)</code> 을 사용하여 특정 인덱스의 구축 상태를 확인하십시오. 구축이 완료되면 <code translate="no">state</code> 필드에 <code translate="no">Finished</code> 이 표시되며, <code translate="no">total_rows</code>, <code translate="no">indexed_rows</code>, <code translate="no">pending_index_rows</code> 필드에서는 진행 상황을 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-python">client.describe_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>응답 예시:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;json_path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;json_cast_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;VARCHAR&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AUTOINDEX&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category_index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;total_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;indexed_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;pending_index_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;state&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Finished&quot;</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">state</code> 에서 <code translate="no">Finished</code> 를 반환하면, 인덱싱된 경로에 대한 쿼리는 자동으로 새로운 인덱스를 사용합니다.</p>
<p><code translate="no">AUTOINDEX</code> 항목의 경우, 이 응답의 <code translate="no">index_type</code> 필드는 <code translate="no">AUTOINDEX</code> 로 보고됩니다. Milvus는 현재 빌드 시점에 어떤 기본 레이아웃(<code translate="no">BITMAP</code> 또는 <code translate="no">STL_SORT</code>)이 선택되었는지 공개하지 않습니다. 이 선택은 내부 최적화로 간주하십시오. 경로에 대한 등가, <code translate="no">IN</code> 및 범위 쿼리는 어떤 레이아웃이 선택되었는지와 관계없이 정상적으로 작동합니다.</p>
<h2 id="FAQ" class="common-anchor-header">자주 묻는 질문<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="common-anchor-header">AUTOINDEX와 명시적 인덱스 유형 중 어떻게 선택해야 하나요?<button data-href="#How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">AUTOINDEX</code> <code translate="no">IN</code> 부터 시작하세요. 이 인덱스는 데이터의 카디널리티에 따라 적절한 레이아웃을 선택하며, JSON 경로에 대한 대부분의 등가 쿼리( ) 및 범위 쿼리를 처리합니다. 다음과 같은 경우에는 명시적 유형을 선택하세요:</p>
<ul>
<li><p>쿼리 패턴을 알고 있는 경우(예: 항상 범위 쿼리를 사용하는 경우 <code translate="no">STL_SORT</code> 를, 낮은 카디널리티 값에 대한 등가 쿼리를 항상 사용하는 경우 <code translate="no">BITMAP</code> 를 선택)이며, 카디널리티 측정을 건너뛰고 싶은 경우.</p></li>
<li><p>텍스트 일치 또는 부분 문자열 쿼리가 필요한 경우. <code translate="no">INVERTED</code> 를 사용하십시오.</p></li>
<li><p>배열 캐스트 유형에 인덱싱을 수행하는 경우입니다. <code translate="no">INVERTED</code> 를 명시적으로 사용하십시오.</p></li>
<li><p>기존의 전체 객체 JSON 인덱스를 유지 관리하고 있는 경우입니다. 호환성을 위해 <code translate="no">INVERTED</code> 와 <code translate="no">AUTOINDEX</code> 모두 계속 지원되지만, 전체 객체 JSON 인덱싱은 Milvus 3.0.0부터 더 이상 권장되지 않습니다.</p></li>
</ul>
<h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">쿼리의 필터 표현식이 인덱싱된 형 변환 유형과 다른 유형을 사용하는 경우 어떻게 되나요?<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>필터 표현식이 인덱스의 <code translate="no">json_cast_type</code> 과 다른 유형을 사용하는 경우, Milvus는 해당 인덱스를 사용하지 않으며, 데이터가 허용하는 경우 더 느린 무차별 대입 스캔으로 대체될 수 있습니다. 최상의 성능을 얻으려면 항상 필터 표현식을 인덱스의 캐스트 유형과 일치시켜야 합니다. 예를 들어, <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code> 로 숫자형 인덱스가 생성된 경우, 숫자형 필터 조건만 해당 인덱스를 활용합니다.</p>
<h3 id="What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">JSON 키의 데이터 유형이 엔티티마다 일관되지 않은 경우에는 어떻게 되나요?<button data-href="#What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>일관되지 않은 데이터 유형은 <strong>부분 인덱싱으로</strong> 이어질 수 있습니다. 예를 들어, ` <code translate="no">metadata[&quot;price&quot;]</code> `가 숫자(`<code translate="no">99.99</code>`)와 문자열(`<code translate="no">&quot;99.99&quot;</code>`)로 모두 저장되어 있고, ` <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code>`로 인덱스를 생성하면 숫자 값만 인덱싱됩니다. 문자열 형식의 항목은 건너뛰어지며 필터 결과에 나타나지 않습니다. 인덱싱 시점에 <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> 를 사용하여 문자열을 숫자로 변환하거나, 모든 항목이 동일한 유형을 갖도록 원본 데이터를 수정하십시오.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">동일한 JSON 키에 대해 여러 개의 인덱스를 생성할 수 있나요?<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>아니요. Milvus는 형 변환 유형이나 인덱스 유형에 관계없이 <code translate="no">(field, json_path)</code> 쌍당 최대 하나의 인덱스만 허용합니다. 동일한 경로에 <code translate="no">INVERTED</code> 인덱스와 <code translate="no">BITMAP</code> 인덱스를 모두 생성할 수 없으며, 동일한 경로에 캐스트 유형이 다른 두 개의 인덱스를 생성할 수도 없습니다. 그러나 전체 JSON 객체에 대한 인덱스와 해당 객체 내의 중첩된 키에 대한 별도의 인덱스는 서로 다른 경로이므로 생성할 수 있습니다.</p>
<h3 id="How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="common-anchor-header">AUTOINDEX의 BITMAP 대 STL_SORT 임계값은 어떻게 조정하나요?<button data-href="#How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="anchor-icon" translate="no">
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
    </button></h3><p>기본적으로 <code translate="no">AUTOINDEX</code> 는 인덱싱된 값의 <strong>고유 값이 100개 이하일</strong> 때 <code translate="no">BITMAP</code> 를 선택하고, 그 외의 경우에는 <code translate="no">STL_SORT</code> 를 선택합니다. 인덱스 매개변수에 <code translate="no">&quot;bitmap_cardinality_limit&quot;</code> 를 추가하여 이 임계값을 재정의할 수 있습니다(범위: 1-1000):</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># use BITMAP up to 200 distinct values</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>대부분의 사용자는 이 설정을 조정할 필요가 없습니다. 비트맵 처리를 원하는 중간 정도의 카디널리티를 가진 필드가 있다면 이 값을 높이고, <code translate="no">AUTOINDEX</code> 가 더 빨리 <code translate="no">STL_SORT</code> 로 전환되도록 하려면 이 값을 낮추십시오. <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> 또는 <code translate="no">BITMAP</code> 를 명시적으로 지정하면 이 설정은 무시됩니다.</p>
