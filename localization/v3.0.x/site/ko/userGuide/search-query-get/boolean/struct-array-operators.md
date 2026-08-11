---
id: struct-array-operators.md
title: StructArray 연산자
summary: >-
  StructArray 연산자는 StructArray 필드 내의 스칼라 하위 필드에 대한 술어를 평가하여 엔티티를 필터링합니다. 이 페이지는
  element_filter 및 MATCH_* 연산자 계열에 대한 구문 참조 자료로 활용하십시오.
---
<h1 id="StructArray-Operators" class="common-anchor-header">StructArray 연산자<button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>StructArray 연산자는 StructArray 필드 내의 스칼라 하위 필드에 대한 술어를 평가하여 엔티티를 필터링합니다. 이 페이지는 ` <code translate="no">element_filter</code> ` 및 ` <code translate="no">MATCH_*</code> ` 연산자 계열에 대한 구문 참조 자료로 활용하십시오.</p>
<p>StructArray 필터링에는 두 가지 연산자 계열이 있습니다:</p>
<table>
<thead>
<tr><th>연산자 계열</th><th>주요 용도</th><th>결과 동작</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>스칼라 술레이트를 만족하는 Struct 요소를 일치시킵니다.</td><td>요소 수준 검색에서 일치하는 결과에는 요소 오프셋이 포함될 수 있습니다. 행 수준 쿼리 또는 필터링된 검색에서 결과 형식은 API 및 출력 필드에 따라 달라집니다.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>스칼라 술어 조건을 만족하는 Struct 요소의 개수에 따라 엔티티를 선택합니다.</td><td>행 수준 필터링. 이 연산자들은 자체적으로 요소 오프셋을 반환하지 않습니다.</td></tr>
</tbody>
</table>
<p>StructArray 연산자에서는 스칼라 하위 필드를 사용합니다. 벡터 하위 필드는 벡터 검색 경로에서 사용되며, 스칼라 술어 입력으로 사용되지 않습니다.</p>
<h2 id="When-to-use-which-operator" class="common-anchor-header">어떤 연산자를 언제 사용해야 하는가<button data-href="#When-to-use-which-operator" class="anchor-icon" translate="no">
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
<tr><th>목표</th><th>사용법</th></tr>
</thead>
<tbody>
<tr><td>스칼라 조건에 부합하는 요소로 요소 수준 벡터 검색을 제한합니다.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>동일한 Struct 요소 내에서 여러 스칼라 조건에 일치시키려면.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>적어도 하나의 Struct 요소가 술어를 만족하는 엔티티만 반환합니다.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>모든 Struct 요소가 술어를 만족하는 엔티티만 반환합니다.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td><code translate="no">N</code> Struct 요소 중 최소, 최대 또는 정확히 해당 개수가 술어를 만족하는 엔티티만 반환합니다.</td><td><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> 또는 <code translate="no">MATCH_EXACT</code></td></tr>
</tbody>
</table>
<h2 id="Element-Filter" class="common-anchor-header">요소 필터<button data-href="#Element-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">element_filter(structArrayField, predicate)</code> 을 사용하여 StructArray 필드의 Struct 요소를 일치시킵니다.</p>
<p>술어 내에서 <code translate="no">$[subfield]</code> 를 사용하여 현재 Struct 요소의 스칼라 하위 필드를 참조합니다.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>술어 내에서 여러 조건이 사용되는 경우, 모든 ` <code translate="no">$[subfield]</code> ` 참조는 동일한 Struct 요소에 적용됩니다.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; $[quality_score] &gt; <span class="hljs-number">0.9</span>)
<button class="copy-code-btn"></button></code></pre>
<p>엔티티 수준 술어와 ` <code translate="no">element_filter</code>`를 결합할 때는 ` <code translate="no">element_filter</code> `를 식의 맨 끝에 배치하십시오:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Correct</span>
category == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>)

<span class="hljs-comment"># Incorrect</span>
element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>) &amp;&amp; category == <span class="hljs-string">&quot;index&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">element_filter</code> 는 필터 표현식에서 한 번만 나타날 수 있습니다. <code translate="no">element_filter</code> 또는 <code translate="no">MATCH_*</code> 를 다른 <code translate="no">element_filter</code> 안에 중첩하지 마십시오.</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">일치 계열 연산자<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">MATCH_*</code> 연산자는 술어를 만족하는 Struct 요소의 수에 따라 엔티티를 선택해야 할 때 사용합니다.</p>
<table>
<thead>
<tr><th>연산자</th><th>의미</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>적어도 하나의 Struct 요소가 술어를 만족합니다.</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>모든 Struct 요소가 술어를 만족합니다.</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td><code translate="no">N</code> 개 이상의 Struct 요소가 술어를 만족합니다.</td></tr>
<tr><td><code translate="no">MATCH_MOST(field, predicate, threshold=N)</code></td><td><code translate="no">N</code> 개 이하의 Struct 요소가 술어를 만족합니다.</td></tr>
<tr><td><code translate="no">MATCH_EXACT(field, predicate, threshold=N)</code></td><td><code translate="no">N</code> 개의 Struct 요소가 정확히 해당 술어를 만족합니다.</td></tr>
</tbody>
</table>
<p><code translate="no">MATCH_ANY</code> <code translate="no">element_filter</code> 은 모두 적어도 하나의 Struct 요소가 술어를 만족함을 나타낼 수 있습니다. 행 수준 필터링만 필요한 경우 를 사용하십시오. 요소 수준 벡터 검색에 참여하는 Struct 요소를 필터링하는 등 요소 수준 제약 조건이 필요한 경우 를 사용하십시오. <code translate="no">MATCH_ANY</code> <code translate="no">element_filter</code> </p>
<h3 id="MATCHANY" class="common-anchor-header">MATCH_ANY<button data-href="#MATCHANY" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ANY</code> StructArray의 요소 중 적어도 하나가 술어를 만족하면 <code translate="no">true</code> 로 평가됩니다.</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>빈 StructArray의 경우, ` <code translate="no">MATCH_ANY</code> `는 ` <code translate="no">false</code>`를 반환합니다.</p>
<h3 id="MATCHALL" class="common-anchor-header">MATCH_ALL<button data-href="#MATCHALL" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ALL</code> StructArray의 모든 요소가 술어를 만족하는 경우, <code translate="no">true</code> 로 평가됩니다.</p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>빈 StructArray의 경우, <code translate="no">MATCH_ALL</code> 는 <code translate="no">true</code> 를 반환합니다.</p>
<h3 id="MATCHLEAST" class="common-anchor-header">MATCH_LEAST<button data-href="#MATCHLEAST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> 는 술어를 만족하는 요소의 수가 <code translate="no">threshold</code> 이상일 때 <code translate="no">true</code> 로 평가됩니다.</p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>, threshold=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">MATCH_LEAST</code> 의 경우, <code translate="no">threshold</code> 는 양의 정수여야 합니다.</p>
<h3 id="MATCHMOST" class="common-anchor-header">MATCH_MOST는 술어를 만족하는 요소의 개수가 xml-ph-0001@deepl.internal보다 작거나 같을 때 xml-ph-0000@deepl.internal로 평가됩니다.<button data-href="#MATCHMOST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_MOST</code> 술어를 만족하는 요소의 개수가 <code translate="no">threshold</code> 이하인 경우, <code translate="no">true</code> 로 평가됩니다.</p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[has_code] == true, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">MATCH_MOST</code> 의 경우, <code translate="no">threshold</code> 는 0이거나 양의 정수일 수 있습니다.</p>
<h3 id="MATCHEXACT" class="common-anchor-header">MATCH_EXACT<button data-href="#MATCHEXACT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> 는 술어를 만족하는 요소의 개수가 <code translate="no">threshold</code> 와 정확히 일치할 때 <code translate="no">true</code> 로 평가됩니다.</p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[section] == <span class="hljs-string">&quot;filter&quot;</span>, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">MATCH_EXACT</code> 의 경우, <code translate="no">threshold</code> 는 0이거나 양의 정수일 수 있습니다.</p>
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
    </button></h2><p><code translate="no">$[...]</code> 구문은 현재 Struct 요소의 스칼라 값을 나타냅니다. 술어 지원 여부는 스칼라 하위 필드 유형에 따라 다릅니다.</p>
<table>
<thead>
<tr><th>서브필드 유형</th><th>요소 수준 술어 지원</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code> 이나 <code translate="no">!($[has_code] == true)</code> 과 같은 스칼라 술어. <code translate="no">$[has_code]</code> 과 같은 단순한 부울 표현식은 피하십시오.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td>비교 연산, 연쇄 범위, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code> 또는 <code translate="no">%</code> 와 같은 산술 표현식에 비교 연산이 뒤따르는 경우, 그리고 논리 결합.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td>비교, 연쇄 범위, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code> 또는 <code translate="no">/</code> 와 같은 산술 표현식에 이어지는 비교 연산, 그리고 논리 결합. <code translate="no">%</code> 연산자는 부동 소수점 하위 필드에서는 지원되지 않습니다.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>문자열 비교, 연쇄 범위, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">like</code>, <code translate="no">=~</code>, <code translate="no">!~</code> 및 논리 연산 조합.</td></tr>
<tr><td>벡터 하위 필드</td><td><code translate="no">$[...]</code> 의 스칼라 술어 입력으로는 지원되지 않습니다. 대신 EmbeddingList 검색이나 요소 수준 벡터 검색을 통해 벡터 하위 필드를 사용하십시오.</td></tr>
</tbody>
</table>
<p><code translate="no">&amp;&amp;</code>, <code translate="no">\|\|</code>, <code translate="no">!</code> 와 같은 논리 연산자는 술어 표현식에 적용됩니다. 예를 들어, <code translate="no">!$[has_code]</code> 대신 <code translate="no">!($[has_code] == true)</code> 를 작성하십시오.</p>
<h2 id="Unsupported-predicates" class="common-anchor-header">지원되지 않는 술어<button data-href="#Unsupported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>요소 수준 <code translate="no">$[...]</code> 술어는 다음을 지원하지 않습니다:</p>
<ul>
<li><p><code translate="no">text_match(field, &quot;...&quot;)</code> 이나 <code translate="no">phrase_match(field, &quot;...&quot;)</code> 과 같은 텍스트 일치 함수.</p></li>
<li><p>JSON 경로 구문, JSON 경로에 대한 <code translate="no">exists</code>, 또는 <code translate="no">json_contains</code>, <code translate="no">json_contains_all</code>, <code translate="no">json_contains_any</code> 과 같은 JSON 함수.</p></li>
<li><p><code translate="no">array_contains</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_contains_any</code> 또는 <code translate="no">array_length</code> 과 같은 배열 컨테이너 함수.</p></li>
<li><p><code translate="no">$[subfield] is null</code> 또는 <code translate="no">$[subfield] is not null</code>.</p></li>
<li><p>기하학/GIS 함수.</p></li>
<li><p>timestamptz 표현식.</p></li>
<li><p><code translate="no">random_sample(...)</code>.</p></li>
<li><p>필드 수준 벡터 술어.</p></li>
<li><p>특정 함수 시그니처 및 실행 경로가 StructArray 요소 수준 술어를 명시적으로 지원하지 않는 한, 일반 필터 함수 호출.</p></li>
</ul>
<h2 id="Syntax-rules" class="common-anchor-header">구문 규칙<button data-href="#Syntax-rules" class="anchor-icon" translate="no">
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
<li><p><code translate="no">MATCH_*</code> 연산자 이름은 대소문자를 구분하지 않습니다.</p></li>
<li><p><code translate="no">$[subfield]</code> 는 <code translate="no">element_filter</code> 또는 <code translate="no">MATCH_*</code> 술어 내에서만 사용하십시오.</p></li>
<li><p><code translate="no">$[subfield]</code> 를 JSON 경로, 배열 컨테이너 또는 벡터 필드 참조로 사용하지 마십시오.</p></li>
<li><p><code translate="no">element_filter</code> 또는 <code translate="no">MATCH_*</code> 를 다른 StructArray 연산자 안에 중첩하지 마십시오.</p></li>
<li><p><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> 및 <code translate="no">MATCH_EXACT</code> 의 경우 이름이 지정된 <code translate="no">threshold=N</code> 를 사용하십시오.</p></li>
<li><p><code translate="no">MATCH_ANY</code> 빈 StructArray에 대해 호출하면 <code translate="no">false</code> 를 반환합니다.</p></li>
<li><p><code translate="no">MATCH_ALL</code> 빈 StructArray에 대해 호출하면 <code translate="no">true</code> 를 반환합니다.</p></li>
</ul>
<h2 id="See-also" class="common-anchor-header">참조<button data-href="#See-also" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/ko/filtered-search-with-structarray.md">StructArray를 사용한 필터링 검색</a></p></li>
<li><p><a href="/docs/ko/basic-vector-search-with-structarray.md">StructArray를 사용한 기본 벡터 검색</a></p></li>
<li><p><a href="/docs/ko/index-structarray-fields.md">StructArray 필드 인덱싱</a></p></li>
<li><p><a href="/docs/ko/structarray-limits.md">StructArray의 제한 사항</a></p></li>
</ul>
