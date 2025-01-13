---
id: boolean.md
summary: >-
  Milvus는 데이터를 정밀하게 쿼리할 수 있는 강력한 필터링 기능을 제공합니다. 필터 표현식을 사용하면 특정 스칼라 필드를 대상으로
  지정하고 다양한 조건으로 검색 결과를 구체화할 수 있습니다. 이 가이드에서는 쿼리 작업에 초점을 맞춘 예제를 통해 Milvus에서 필터
  표현식을 사용하는 방법을 설명합니다. 검색 및 삭제 요청에도 이러한 필터를 적용할 수 있습니다.
title: 필터링 설명
---
<h1 id="Filtering-Explained​" class="common-anchor-header">필터링 설명<button data-href="#Filtering-Explained​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 데이터를 정밀하게 쿼리할 수 있는 강력한 필터링 기능을 제공합니다. 필터 표현식을 사용하면 특정 스칼라 필드를 대상으로 지정하고 다양한 조건으로 검색 결과를 구체화할 수 있습니다. 이 가이드에서는 쿼리 작업에 초점을 맞춘 예제를 통해 Milvus에서 필터 표현식을 사용하는 방법을 설명합니다. 검색 및 삭제 요청에도 이러한 필터를 적용할 수 있습니다.</p>
<h2 id="Basic-operators​" class="common-anchor-header">기본 연산자<button data-href="#Basic-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 데이터 필터링을 위한 몇 가지 기본 연산자를 지원합니다.</p>
<ul>
<li><p><strong>비교 연산자</strong> <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code> 를 사용하면 숫자, 텍스트 또는 날짜 필드를 기준으로 필터링할 수 있습니다.</p></li>
<li><p><strong>범위 필터</strong>: <code translate="no">IN</code> 및 <code translate="no">LIKE</code> 은 특정 값 범위 또는 집합을 일치시키는 데 도움이 됩니다.</p></li>
<li><p><strong>산술 연산자</strong>: <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code>, <code translate="no">%</code> 및 ``는 숫자 필드와 관련된 계산에 사용됩니다.</p></li>
<li><p><strong>논리 연산자</strong>: <code translate="no">AND</code>, <code translate="no">OR</code>, <code translate="no">NOT</code> 또는 '&amp;&amp;', '||', '~', '!'는 여러 조건을 복잡한 표현식으로 결합합니다.</p></li>
</ul>
<h3 id="Example-Filtering-by-Color​" class="common-anchor-header">예시: 색상으로 필터링하기</h3><p>스칼라 필드 <code translate="no">color</code> 에서 원색(빨강, 초록, 파랑)을 가진 엔티티를 찾으려면 다음 필터 표현식을 사용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-JSON-Fields​" class="common-anchor-header">예시: JSON 필드 필터링</h3><p>Milvus에서는 JSON 필드에서 키를 참조할 수 있습니다. 예를 들어 키가 <code translate="no">price</code> 및 <code translate="no">model</code> 인 JSON 필드 <code translate="no">product</code> 가 있고 특정 모델과 가격이 1,850보다 낮은 제품을 찾고자 하는 경우 다음 필터 표현식을 사용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; and product[&quot;price&quot;] &lt; 1850&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields​" class="common-anchor-header">예시: 배열 필드 필터링</h3><p>온도 기록이 포함된 배열 필드 <code translate="no">history_temperatures</code> 가 있고 10번째 기록 온도가 23°C를 초과하는 관측소를 찾고자 하는 경우 이 표현식을 사용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>이러한 기본 연산자에 대한 자세한 내용은 <a href="/docs/ko/basic-operators.md">기본 연산자를</a> 참조하세요.</p>
<h2 id="Filter-expression-templates​" class="common-anchor-header">필터 표현식 템플릿<button data-href="#Filter-expression-templates​" class="anchor-icon" translate="no">
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
    </button></h2><p>한중일 문자를 사용하여 필터링하는 경우, 더 큰 문자 집합과 인코딩 차이로 인해 처리가 더 복잡해질 수 있습니다. 이로 인해 특히 <code translate="no">IN</code> 연산자의 경우 성능이 느려질 수 있습니다.</p>
<p>Milvus는 한중일 문자로 작업할 때 성능을 최적화하기 위해 필터 표현식 템플릿을 도입했습니다. 필터 표현식에서 동적 값을 분리함으로써 쿼리 엔진이 매개변수 삽입을 보다 효율적으로 처리합니다.</p>
<h3 id="Example​" class="common-anchor-header">예제</h3><p>'北京'(베이징) 또는 '上海'(상하이)에 거주하는 25세 이상의 개인을 찾으려면 다음 템플릿 표현식을 사용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 and city in [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>성능을 향상시키려면 이 변형을 매개변수와 함께 사용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} and city in {city}&quot;</span>,​
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}​

<button class="copy-code-btn"></button></code></pre>
<p>이 접근 방식은 구문 분석 오버헤드를 줄이고 쿼리 속도를 향상시킵니다. 자세한 내용은 <a href="/docs/ko/filtering-templating.md">필터 템플릿을</a> 참조하세요.</p>
<h2 id="Data-type-specific-operators​" class="common-anchor-header">데이터 유형별 연산자<button data-href="#Data-type-specific-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 JSON, ARRAY, VARCHAR 필드와 같은 특정 데이터 유형에 대한 고급 필터링 연산자를 제공합니다.</p>
<h3 id="JSON-field-specific-operators​" class="common-anchor-header">JSON 필드별 연산자</h3><p>Milvus는 JSON 필드 쿼리를 위한 고급 연산자를 제공하여 복잡한 JSON 구조 내에서 정밀한 필터링을 가능하게 합니다.</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: 필드에 JSON 표현식이 존재하는지 확인합니다.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>]}​
filter=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: JSON 표현식의 모든 요소가 존재하는지 확인합니다.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>, <span class="hljs-string">&quot;discount&quot;</span>]}​
filter=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: JSON 표현식에 요소가 하나 이상 존재하는 엔티티를 필터링합니다.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>]}​
filter=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>JSON 연산자에 대한 자세한 내용은 <a href="/docs/ko/json-operators.md">JSON 연산자를</a> 참조하세요.</p>
<h3 id="ARRAY-field-specific-operators​" class="common-anchor-header">배열 필드별 연산자</h3><p>Milvus는 배열 데이터를 세밀하게 제어할 수 있는 <code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ALL</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, <code translate="no">ARRAY_LENGTH</code> 와 같은 배열 필드에 대한 고급 필터링 연산자를 제공합니다.</p>
<p><code translate="no">ARRAY_CONTAINS</code>: 특정 요소를 포함하는 엔티티를 필터링합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: 목록의 모든 요소가 있는 엔티티를 필터링합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: 목록의 모든 요소를 포함하는 엔터티를 필터링합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: 배열의 길이를 기준으로 필터링합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>배열 연산자에 대한 자세한 내용은 <a href="/docs/ko/array-operators.md">배열 연산자를</a> 참조하십시오.</p>
<h3 id="VARCHAR-field-specific-operators​" class="common-anchor-header">VARCHAR 필드별 연산자</h3><p><code translate="no">Text_Match</code> 연산자를 사용하면 특정 쿼리 용어를 기반으로 정확한 문서 검색이 가능합니다. 스칼라 필터와 벡터 유사도 검색을 결합하는 필터링 검색에 특히 유용합니다. 시맨틱 검색과 달리, 텍스트 일치는 정확한 용어 발생에 초점을 맞춥니다.</p>
<p>Milvus는 Tantivy를 사용해 역 인덱싱과 용어 기반 텍스트 검색을 지원합니다. 프로세스에는 다음이 포함됩니다.</p>
<ol>
<li><p><strong>분석기</strong>: 입력 텍스트를 토큰화하여 처리합니다.</p></li>
<li><p><strong>인덱싱</strong>: 고유 토큰을 문서에 매핑하는 역 인덱스를 생성합니다.</p></li>
</ol>
<p>자세한 내용은 <a href="/docs/ko/keyword-match.md">텍스트 일치를</a> 참조하세요.</p>
