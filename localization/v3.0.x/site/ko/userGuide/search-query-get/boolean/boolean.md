---
id: boolean.md
title: 필터링 설명
summary: >-
  Milvus는 데이터를 정밀하게 쿼리할 수 있는 강력한 필터링 기능을 제공합니다. 필터 표현식을 사용하면 특정 스칼라 필드를 대상으로
  지정하고 다양한 조건을 적용하여 검색 결과를 세분화할 수 있습니다. 이 가이드에서는 쿼리 작업에 중점을 둔 예제를 통해 Milvus에서 필터
  표현식을 사용하는 방법을 설명합니다. 또한 이러한 필터를 검색 및 삭제 요청에도 적용할 수 있습니다.
---
<h1 id="Filtering-Explained" class="common-anchor-header">필터링 설명<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 데이터를 정밀하게 쿼리할 수 있는 강력한 필터링 기능을 제공합니다. 필터 표현식을 사용하면 특정 스칼라 필드를 대상으로 지정하고 다양한 조건을 적용하여 검색 결과를 세분화할 수 있습니다. 이 가이드에서는 쿼리 작업에 중점을 둔 예제를 통해 Milvus에서 필터 표현식을 사용하는 방법을 설명합니다. 또한 이러한 필터를 검색 및 삭제 요청에도 적용할 수 있습니다.</p>
<h2 id="Basic-operators" class="common-anchor-header">기본 연산자<button data-href="#Basic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 데이터 필터링을 위해 다음과 같은 여러 기본 연산자를 지원합니다:</p>
<ul>
<li><p><strong>비교 연산자</strong>: <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code> 는 숫자 또는 텍스트 필드를 기반으로 필터링을 수행할 수 있게 해줍니다.</p></li>
<li><p><strong>범위 및 패턴 필터</strong>: <code translate="no">IN</code>, <code translate="no">LIKE</code>, <code translate="no">=~</code> 및 <code translate="no">!~</code> 는 값, 와일드카드 패턴 또는 정규식 패턴과 일치합니다. 문자열 패턴에 대한 자세한 내용은 <a href="/docs/ko/pattern-matching.md">‘패턴 일치</a>’를 참조하십시오.</p></li>
<li><p><strong>산술 연산자</strong>: <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code>, <code translate="no">%</code> 및 <code translate="no">**</code> 는 숫자 필드와 관련된 계산에 사용됩니다.</p></li>
<li><p><strong>비트 연산자</strong>: Milvus 3.0.0 이상 버전에서는 <code translate="no">&amp;</code>, <code translate="no">|</code> 및 <code translate="no">^</code> 가 권한이나 상태 비트와 같은 여러 플래그를 인코딩하는 정수 필드를 필터링합니다. 자세한 내용은 <a href="/docs/ko/basic-operators.md#Bitwise-operators">기본 연산자를</a> 참조하십시오.</p></li>
<li><p><strong>논리 연산자</strong>: <code translate="no">AND</code>, <code translate="no">OR</code> 및 <code translate="no">NOT</code> 는 여러 조건을 결합하여 복잡한 표현식을 만듭니다.</p></li>
<li><p><strong>IS NULL 및 IS NOT NULL 연산자</strong>: <code translate="no">IS NULL</code> 및 <code translate="no">IS NOT NULL</code> 연산자는 필드에 NULL 값(데이터 부재)이 포함되어 있는지 여부에 따라 필드를 필터링하는 데 사용됩니다. 자세한 내용은 <a href="/docs/ko/basic-operators.md#IS-NULL-and-IS-NOT-NULL-operators">기본 연산자를</a> 참조하십시오.</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">예: 색상별 필터링<button data-href="#Example-Filtering-by-Color" class="anchor-icon" translate="no">
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
    </button></h3><p>스칼라 필드 <code translate="no">color</code> 에 기본 색상(빨강, 초록, 파랑)이 포함된 엔티티를 찾으려면 다음 필터 표현식을 사용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Permission-Bits" class="common-anchor-header">예: 권한 비트별 필터링<button data-href="#Example-Filtering-by-Permission-Bits" class="anchor-icon" translate="no">
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
    </button></h3><p>정수형 필드 <code translate="no">permissions</code> 에 <code translate="no">SHARE</code> 비트가 설정된 엔티티를 찾으려면 비트별 AND 연산자(<code translate="no">&amp;</code>)를 사용합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;(permissions &amp; 4) == 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Regex-Pattern" class="common-anchor-header">예: 정규식 패턴을 사용한 필터링<button data-href="#Example-Filtering-by-Regex-Pattern" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">message</code> 필드에 <code translate="no">E1001</code> 와 같은 오류 코드가 포함된 엔티티를 찾으려면 정규식 일치 연산자 <code translate="no">=~</code> 를 사용하십시오:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>정규식 필터는 부분 문자열 일치를 사용합니다. 필드 값 전체가 패턴과 일치하도록 하려면 <code translate="no">^</code> 및 <code translate="no">$</code> 앵커를 추가하십시오. 자세한 내용은 <a href="/docs/ko/pattern-matching.md">‘패턴 일치’를</a> 참조하십시오.</p>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">예시: JSON 필드 필터링<button data-href="#Example-Filtering-JSON-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus에서는 JSON 필드의 키를 참조할 수 있습니다. 예를 들어, <code translate="no">product</code> 라는 JSON 필드에 <code translate="no">price</code> 및 <code translate="no">model</code> 키가 있고, 특정 모델이며 가격이 1,850 미만인 제품을 찾으려면 다음 필터 표현식을 사용하십시오:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">예시: 배열 필드 필터링<button data-href="#Example-Filtering-Array-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>2000년 이후 관측소에서 보고한 평균 기온 기록이 포함된 배열 필드 ` <code translate="no">history_temperatures</code> `가 있고, 2009년(기록된 10번째 해)의 기온이 23°C를 초과하는 관측소를 찾으려면 다음 표현식을 사용하십시오:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이러한 기본 연산자에 대한 자세한 내용은 <a href="/docs/ko/basic-operators.md">‘기본 연산자’를</a> 참조하십시오.</p>
<h2 id="Filter-expression-templates" class="common-anchor-header">필터 표현식 템플릿<button data-href="#Filter-expression-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>CJK 문자를 사용하여 필터링할 경우, 문자 집합이 더 크고 인코딩 방식이 다르기 때문에 처리 과정이 더 복잡해질 수 있습니다. 이로 인해 특히 ` <code translate="no">IN</code> ` 연산자를 사용할 때 성능이 저하될 수 있습니다.</p>
<p>Milvus는 CJK 문자를 다룰 때 성능을 최적화하기 위해 필터 표현식 템플릿 기능을 도입했습니다. 동적 값을 필터 표현식에서 분리함으로써 쿼리 엔진이 매개변수 삽입을 더 효율적으로 처리할 수 있습니다.</p>
<h3 id="Example" class="common-anchor-header">예시<button data-href="#Example" class="anchor-icon" translate="no">
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
    </button></h3><p>“北京”(베이징) 또는 “上海”(상하이)에 거주하는 25세 이상의 개인을 찾으려면 다음 템플릿 표현식을 사용하십시오.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>성능을 향상시키려면 매개변수를 포함한 다음 변형식을 사용하십시오:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>이 방식은 구문 분석 오버헤드를 줄이고 쿼리 속도를 향상시킵니다. 자세한 내용은 <a href="/docs/ko/filtering-templating.md">필터 템플릿을</a> 참조하십시오.</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">데이터 유형별 연산자<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
<h3 id="JSON-field-specific-operators" class="common-anchor-header">JSON 필드 전용 연산자<button data-href="#JSON-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus는 JSON 필드 쿼리를 위한 고급 연산자를 제공하여, 복잡한 JSON 구조 내에서 정밀한 필터링이 가능하게 합니다:</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: 필드에 JSON 표현식이 존재하는지 확인합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: JSON 표현식의 모든 요소가 포함되어 있는지 확인합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: JSON 표현식에 적어도 하나의 요소가 존재하는 엔티티를 필터링합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>JSON 연산자에 대한 자세한 내용은 <a href="/docs/ko/json-operators.md">JSON 연산자를</a> 참조하십시오.</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">ARRAY 필드 전용 연산자<button data-href="#ARRAY-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus는 배열 필드에 대한 고급 필터링 연산자( <code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ALL</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, <code translate="no">ARRAY_LENGTH</code> 등)를 제공하여 배열 데이터를 세밀하게 제어할 수 있게 합니다:</p>
<p><code translate="no">ARRAY_CONTAINS</code>: 특정 요소를 포함하는 엔티티를 필터링합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: 목록에 포함된 모든 요소가 존재하는 엔티티를 필터링합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: 목록에 포함된 요소 중 하나라도 포함된 엔티티를 필터링합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: 배열의 길이를 기준으로 필터링합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>배열 연산자에 대한 자세한 내용은 <a href="/docs/ko/array-operators.md">ARRAY 연산자를</a> 참조하십시오.</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">VARCHAR 필드 전용 연산자<button data-href="#VARCHAR-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus는 VARCHAR 필드에 대한 정밀한 텍스트 기반 검색을 위한 전용 연산자를 제공합니다:</p>
<h4 id="Pattern-matching-operators" class="common-anchor-header">패턴 매칭 연산자</h4><p><code translate="no">LIKE</code>, <code translate="no">=~</code> 및 <code translate="no">!~</code> 연산자는 <code translate="no">VARCHAR</code> 필드, JSON 문자열 경로 및 특정 <code translate="no">ARRAY&lt;VARCHAR&gt;</code> 요소에서 문자열 패턴을 일치시킵니다. 간단한 와일드카드 패턴의 경우 <code translate="no">LIKE</code> 를 사용하십시오. RE2 정규식의 경우 <code translate="no">=~</code> 및 <code translate="no">!~</code> 를 사용하십시오.</p>
<p>자세한 내용은 <a href="/docs/ko/pattern-matching.md">‘패턴 매칭</a>’을 참조하십시오.</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> 연산자</h4><p><code translate="no">TEXT_MATCH</code> 연산자는 특정 쿼리 용어를 기반으로 문서를 정밀하게 검색할 수 있게 해줍니다. 이 연산자는 스칼라 필터와 벡터 유사도 검색을 결합한 필터링 검색에 특히 유용합니다. 시맨틱 검색과 달리, Text Match는 용어의 정확한 출현 여부에 중점을 둡니다.</p>
<p>Milvus는 Tantivy를 사용하여 역색인 및 용어 기반 텍스트 검색을 지원합니다. 이 과정은 다음과 같습니다.</p>
<ol>
<li><p><strong>분석기(Analyzer)</strong>: 입력 텍스트를 토큰화하고 처리합니다.</p></li>
<li><p><strong>색인 생성</strong>: 고유한 토큰을 문서에 매핑하는 역색인을 생성합니다.</p></li>
</ol>
<p>자세한 내용은 <a href="/docs/ko/keyword-match.md">‘텍스트 매치</a>’를 참조하십시오.</p>
<h4 id="PHRASEMATCH-operator--Milvus-26x" class="common-anchor-header"><code translate="no">PHRASE_MATCH</code> 연산자<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span></h4><p><strong>PHRASE_MATCH</strong> 연산자는 쿼리 용어의 순서와 인접성을 모두 고려하여 정확한 구문 일치를 기반으로 문서를 정밀하게 검색할 수 있게 해줍니다.</p>
<p>자세한 내용은 <a href="/docs/ko/phrase-match.md">구문 일치를</a> 참조하십시오.</p>
