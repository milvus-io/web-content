---
id: geometry-operators.md
title: 기하학 연산자Compatible with Milvus 2.6.4+
summary: >-
  Milvus는 기하학적 데이터를 관리하고 분석하는 데 필수적인 기하학 필드에 대한 공간 필터링용 연산자 세트를 지원합니다. 이러한 연산자를
  사용하면 개체 간의 기하학적 관계를 기반으로 엔티티를 검색할 수 있습니다.
beta: Milvus 2.6.4+
---
<h1 id="Geometry-Operators" class="common-anchor-header">기하학 연산자<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Geometry-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 기하학적 데이터를 관리하고 분석하는 데 필수적인 <code translate="no">GEOMETRY</code> 필드에서 공간 필터링을 위한 연산자 집합을 지원합니다. 이러한 연산자를 사용하면 개체 간의 기하학적 관계를 기반으로 엔티티를 검색할 수 있습니다.</p>
<p>모든 기하 도형 연산자는 컬렉션 스키마에 정의된 <code translate="no">GEOMETRY</code> 필드의 이름과 <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">잘 알려진 텍스트</a> (WKT) 형식으로 표현된 대상 기하 도형 객체라는 두 가지 기하 도형 인수를 받아 작동합니다.</p>
<h2 id="Use-syntax" class="common-anchor-header">구문 사용<button data-href="#Use-syntax" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">GEOMETRY</code> 필드를 필터링하려면 표현식에 기하 도형 연산자를 사용합니다:</p>
<ul>
<li><p>일반: <code translate="no">{operator}(geo_field, '{wkt}')</code></p></li>
<li><p>거리 기반: <code translate="no">ST_DWITHIN(geo_field, '{wkt}', distance)</code></p></li>
</ul>
<p>Where:</p>
<ul>
<li><p><code translate="no">operator</code> 는 지원되는 기하 도형 연산자 중 하나입니다(예: <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_INTERSECTS</code>). 연산자 이름은 모두 대문자 또는 모두 소문자여야 합니다. 지원되는 연산자 목록은 <a href="/docs/ko/geometry-operators.md#Supported-geometry-operators">지원되는 지오메트리 연산자를</a> 참조하십시오.</p></li>
<li><p><code translate="no">geo_field</code> 는 <code translate="no">GEOMETRY</code> 필드의 이름입니다.</p></li>
<li><p><code translate="no">'{wkt}'</code> 는 쿼리할 지오메트리의 WKT 표현입니다.</p></li>
<li><p><code translate="no">distance</code> 는 <code translate="no">ST_DWITHIN</code> 에 대한 임계값입니다.</p></li>
</ul>
<p>Milvus의 <code translate="no">GEOMETRY</code> 필드에 대한 자세한 내용은 <a href="/docs/ko/geometry-field.md">지오메트리 필드를</a> 참조하십시오.</p>
<h2 id="Supported-geometry-operators" class="common-anchor-header">지원되는 지오메트리 연산자<button data-href="#Supported-geometry-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 표에는 Milvus에서 사용할 수 있는 지오메트리 연산자가 나열되어 있습니다.</p>
<div class="alert note">
<p>연산자 이름은 <strong>모두 대문자</strong> 또는 <strong>모두 소문자여야</strong> 합니다. 동일한 연산자 이름 내에 대소문자를 혼용하지 마십시오.</p>
</div>
<table>
   <tr>
     <th><p>연산자</p></th>
     <th><p>설명</p></th>
     <th><p>예시</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ST_EQUALS(A, B)</code> / <code translate="no">st_equals(A, B)</code></p></td>
     <td><p>두 도형이 공간적으로 동일한 경우, 즉 점과 치수의 집합이 동일한 경우 TRUE를 반환합니다.</p></td>
     <td><p>두 도형(A와 B)이 공간적으로 정확히 동일한가요?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CONTAINS(A, B)</code> / <code translate="no">st_contains(A, B)</code></p></td>
     <td><p>도형 A가 도형 B를 완전히 포함하고 내부에 적어도 하나의 공통점이 있는 경우 TRUE를 반환합니다.</p></td>
     <td><p>도시 경계(A)에 특정 공원(B)이 포함되어 있나요?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CROSSES(A, B)</code> / <code translate="no">st_crosses(A, B)</code></p></td>
     <td><p>도형 A와 B가 부분적으로 교차하지만 서로를 완전히 포함하지 않으면 TRUE를 반환합니다.</p></td>
     <td><p>두 도로(A와 B)가 교차로에서 교차하나요?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_INTERSECTS(A, B)</code> / <code translate="no">st_intersects(A, B)</code></p></td>
     <td><p>도형 A와 B에 공통점이 하나 이상 있는 경우 TRUE를 반환합니다. 가장 일반적이고 널리 사용되는 공간 쿼리입니다.</p></td>
     <td><p>검색 지역(A)이 매장 위치(B)와 교차하나요?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_OVERLAPS(A, B)</code> / <code translate="no">st_overlaps(A, B)</code></p></td>
     <td><p>도형 A와 B의 크기가 같고 부분적으로 겹치며 어느 쪽도 다른 쪽을 완전히 포함하지 않는 경우 TRUE를 반환합니다.</p></td>
     <td><p>두 개의 토지 플롯(A와 B)이 겹치는가?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_TOUCHES(A, B)</code> / <code translate="no">st_touches(A, B)</code></p></td>
     <td><p>도형 A와 B가 공통 경계를 공유하지만 내부가 교차하지 않는 경우 TRUE를 반환합니다.</p></td>
     <td><p>인접한 두 도형(A와 B)이 경계를 공유하나요?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_WITHIN(A, B)</code> / <code translate="no">st_within(A, B)</code></p></td>
     <td><p>지오메트리 A가 지오메트리 B 안에 완전히 포함되고 내부에 공통점이 하나 이상 있는 경우 TRUE를 반환합니다. <code translate="no">ST_Contains(B, A)</code> 의 역수입니다.</p></td>
     <td><p>특정 관심 지점(A)이 정의된 검색 반경(B) 내에 있나요?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_DWITHIN(A, B, distance)</code> / <code translate="no">st_dwithin(A, B, distance)</code></p></td>
     <td><p>지오메트리 A와 지오메트리 B 사이의 거리가 지정된 거리보다 작거나 같으면 TRUE를 반환합니다.</p><p><strong>참고</strong>: 지오메트리 B는 현재 점만 지원합니다. 거리 단위는 미터입니다.</p></td>
     <td><p>특정 점(B)에서 5000미터 이내의 모든 점을 찾습니다.</p></td>
   </tr>
</table>
<h2 id="STEQUALS--stequals" class="common-anchor-header">ST_EQUALS / st_equals<button data-href="#STEQUALS--stequals" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ST_EQUALS</code> 연산자는 두 도형이 공간적으로 동일한 경우, 즉 점과 치수의 집합이 동일한 경우 TRUE를 반환합니다. 이 연산자는 저장된 두 도형 개체가 정확히 동일한 위치와 모양을 나타내는지 확인하는 데 유용합니다.</p>
<p><strong>예제</strong></p>
<p>저장된 도형(예: 점 또는 다각형)이 대상 도형과 정확히 동일한지 확인하려고 한다고 가정해 보겠습니다. 예를 들어, 저장된 점과 특정 관심 지점을 비교할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to check if a geometry matches a specific point</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_EQUALS(geo_field, &#x27;POINT(10 20)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STCONTAINS--stcontains" class="common-anchor-header">ST_CONTAINS / st_contains<button data-href="#STCONTAINS--stcontains" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ST_CONTAINS</code> 연산자는 첫 번째 지오메트리가 두 번째 지오메트리를 완전히 포함하는 경우 TRUE를 반환합니다. 이 연산자는 다각형 내의 점 또는 큰 다각형 내의 작은 다각형을 찾는 데 유용합니다.</p>
<p><strong>예제</strong></p>
<p>도시 구역의 집합이 있고 특정 구역의 경계 내에 있는 레스토랑과 같은 특정 관심 지점을 찾고 싶다고 가정해 보겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries completely within a specific polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_CONTAINS(geo_field, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STCROSSES--stcrosses" class="common-anchor-header">ST_CROSSES / st_crosses<button data-href="#STCROSSES--stcrosses" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ST_CROSSES</code> 연산자는 두 도형의 교차점이 원래 도형보다 작은 치수의 도형을 형성하는 경우 <code translate="no">TRUE</code> 을 반환합니다. 이는 일반적으로 다각형이나 다른 선을 가로지르는 선에 적용됩니다.</p>
<p><strong>예제</strong></p>
<p>특정 경계선(다른 선 문자열)을 가로지르거나 보호 구역(다각형)에 들어가는 모든 등산로(선 문자열)를 찾고자 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that cross a line string.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_CROSSES(geo_field, &#x27;LINESTRING(5 0, 5 10)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STINTERSECTS--stintersects" class="common-anchor-header">ST_INTERSECTS / st_intersects<button data-href="#STINTERSECTS--stintersects" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ST_INTERSECTS</code> 연산자는 두 도형의 경계 또는 내부에 공통점이 있는 경우 <code translate="no">TRUE</code> 을 반환합니다. 이 연산자는 모든 형태의 공간 중첩을 감지하는 범용 연산자입니다.</p>
<p><strong>예제</strong></p>
<p>도로 컬렉션이 있고 제안된 새 도로를 나타내는 특정 선 문자열과 교차하거나 닿는 모든 도로를 찾고자 하는 경우 <code translate="no">ST_INTERSECTS</code> 을 사용할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that intersect with a specific line string.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_INTERSECTS(geo_field, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STOVERLAPS--stoverlaps" class="common-anchor-header">ST_OVERLAPS / st_overlaps<button data-href="#STOVERLAPS--stoverlaps" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ST_OVERLAPS</code> 연산자는 동일한 치수의 두 도형이 부분적으로 교차하는 경우, 교차점 자체의 치수가 원래 도형과 같지만 둘 중 어느 것과도 같지 않은 경우 <code translate="no">TRUE</code> 을 반환합니다.</p>
<p><strong>예시</strong></p>
<p>겹치는 판매 지역 집합이 있고 새로 제안된 판매 지역과 부분적으로 겹치는 모든 지역을 찾고자 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that partially overlap with a polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_OVERLAPS(geo_field, &#x27;POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STTOUCHES--sttouches" class="common-anchor-header">ST_TOUCHES / st_touches<button data-href="#STTOUCHES--sttouches" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ST_TOUCHES</code> 연산자는 두 도형의 경계가 맞닿아 있지만 내부가 교차하지 않는 경우 <code translate="no">TRUE</code> 을 반환합니다. 이 연산자는 인접성을 감지하는 데 유용합니다.</p>
<p><strong>예제</strong></p>
<p>부동산 구획 지도가 있는데 겹치지 않고 공원에 바로 인접한 모든 구획을 찾고자 하는 경우.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that only touch a line string at their boundaries.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_TOUCHES(geo_field, &#x27;LINESTRING(0 0, 1 1)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STWITHIN--stwithin" class="common-anchor-header">ST_WITHIN / st_within<button data-href="#STWITHIN--stwithin" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ST_WITHIN</code> 연산자는 첫 번째 도형이 완전히 내부에 있거나 두 번째 도형의 경계에 있는 경우 <code translate="no">TRUE</code> 을 반환합니다. <code translate="no">ST_CONTAINS</code> 의 역수입니다.</p>
<p><strong>예제</strong></p>
<p>더 큰 지정된 공원 구역 내에 완전히 위치한 모든 작은 주거 지역을 찾고자 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that are completely within a larger polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_WITHIN(geo_field, &#x27;POLYGON((110 38, 115 38, 115 42, 110 42, 110 38))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">GEOMETRY</code> 필드 사용 방법에 대한 자세한 내용은 <a href="/docs/ko/geometry-field.md">도형 필드를</a> 참조하세요.</p>
<h2 id="STDWITHIN--stdwithin" class="common-anchor-header">ST_DWITHIN / st_dwithin<button data-href="#STDWITHIN--stdwithin" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ST_DWITHIN</code> 연산자는 지오메트리 A와 지오메트리 B 사이의 거리가 지정된 값(미터)보다 작거나 같으면 <code translate="no">TRUE</code> 을 반환합니다. 현재 지오메트리 B는 점이어야 합니다.</p>
<p><strong>예제</strong></p>
<p>매장 위치 컬렉션이 있고 특정 고객의 위치에서 5,000미터 이내에 있는 모든 매장을 찾고자 한다고 가정해 보겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Find all stores within 5000 meters of the point (120 30)</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_DWITHIN(geo_field, &#x27;POINT(120 30)&#x27;, 5000)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
