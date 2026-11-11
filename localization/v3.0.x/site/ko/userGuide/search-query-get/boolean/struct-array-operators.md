---
id: struct-array-operators.md
title: StructArray 연산자
summary: >-
  StructArray 연산자는 StructArray 필드 내의 스칼라 하위 필드에 대한 술어를 평가하여 엔티티를 필터링합니다. 이 페이지는
  element_filter, MATCH_* 연산자 계열 및 StructArray 경로에 대한 행 수준 술어에 대한 구문 참조 자료로
  활용하십시오.
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
    </button></h1><p>StructArray 연산자는 StructArray 필드 내의 스칼라 하위 필드에 대한 술어를 평가하여 엔티티를 필터링합니다. 이 페이지는 ` <code translate="no">element_filter</code>`, ` <code translate="no">MATCH_*</code> ` 연산자 계열 및 StructArray 경로에 대한 행 수준 술어에 대한 구문 참조로 활용하십시오.</p>
<p>StructArray 필터링에는 두 가지 연산자 계열과 일련의 행 수준 경로 술어가 있습니다:</p>
<table>
<thead>
<tr><th>필터 형식</th><th>주요 목적</th><th>결과 동작</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>스칼라 술어를 만족하는 Struct 요소를 일치시킵니다.</td><td>요소 수준 검색에서 일치하는 결과에는 요소 오프셋이 포함될 수 있습니다. 행 수준 쿼리 또는 필터링된 검색에서 결과 형식은 API 및 출력 필드에 따라 달라집니다.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>스칼라 술어 조건을 만족하는 Struct 요소의 개수에 따라 엔티티를 선택합니다.</td><td>행 수준 필터링. 이 연산자들은 그 자체로는 요소 오프셋을 반환하지 않습니다.</td></tr>
<tr><td>행 수준 경로 술어</td><td><code translate="no">$[...]</code> ( ) 술어 없이 하나의 요소 위치를 검사하거나, Struct 요소의 개수를 세거나, 여러 요소에 걸친 하위 필드 값을 검사합니다.</td><td>행 수준 필터링. 이러한 술어는 요소 오프셋을 반환하지 않습니다.</td></tr>
</tbody>
</table>
<p>StructArray 연산자에서는 스칼라 서브필드와 Milvus 3.0.6 이상 버전의 배열 서브필드를 사용합니다. 벡터 서브필드는 벡터 검색 경로에서 사용되며, 스칼라 술어 입력으로 사용되지 않습니다.</p>
<h2 id="When-to-use-which-operator" class="common-anchor-header">어떤 연산자를 언제 사용할지<button data-href="#When-to-use-which-operator" class="anchor-icon" translate="no">
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
    </button></h2><p>필터링 목표에 따라 연산자를 선택하십시오:</p>
<table>
<thead>
<tr><th>목표</th><th>사용</th></tr>
</thead>
<tbody>
<tr><td>스칼라 조건에 부합하는 요소로만 요소 수준 벡터 검색을 제한합니다.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>동일한 Struct 요소 내에서 여러 스칼라 조건에 일치시키는 경우.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>적어도 하나의 Struct 요소가 술어를 만족하는 엔티티만 반환합니다.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>모든 Struct 요소가 술어를 만족하는 엔티티만 반환합니다.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td><code translate="no">N</code> Struct 요소 중 최소, 최대 또는 정확히 해당 개수가 술어를 만족하는 엔티티만 반환합니다.</td><td><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code>, 또는 <code translate="no">MATCH_EXACT</code></td></tr>
<tr><td>첫 번째 청크와 같이 특정 위치에 있는 Struct 요소를 확인합니다.</td><td>다음과 같은 위치 기반 경로: <code translate="no">chunks[0][section]</code></td></tr>
<tr><td>엔티티 내의 Struct 요소 수를 기준으로 필터링합니다.</td><td><code translate="no">array_length(chunks)</code></td></tr>
<tr><td>동일한 요소에 대한 조건을 결합하지 않고, 구조체 요소가 하위 필드 값을 가지고 있는지 확인합니다.</td><td><code translate="no">array_contains</code>, <code translate="no">array_contains_any</code> 또는 <code translate="no">array_contains_all</code> 와 같은 서브필드 경로에서 <code translate="no">chunks[section]</code></td></tr>
</tbody>
</table>
<h2 id="Example-data" class="common-anchor-header">예제 데이터<button data-href="#Example-data" class="anchor-icon" translate="no">
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
    </button></h2><p>다음의 부분 엔티티 예시는 <strong>엔티티 A와</strong> <strong>엔티티 B의</strong> <code translate="no">chunks</code> 필드만 보여줍니다. 이는 완전한 삽입 페이로드가 아닙니다.</p>
<p><strong>엔티티 A</strong>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.74</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.72</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.83</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.87</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>엔티티 B</strong>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.95</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.97</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p><code translate="no">element_filter(structArrayField, predicate)</code> 를 사용하여 StructArray 필드 내의 Struct 요소를 일치시킵니다.</p>
<p>술어 내부에서는 <code translate="no">$[subfield]</code> 를 사용하여 현재 Struct 요소의 스칼라 하위 필드를 참조합니다.</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>엔티티 A와 엔티티 B 모두 일치합니다. 표시된 7개 요소 모두에서 ` <code translate="no">section</code> `가 ` <code translate="no">&quot;index&quot;</code>`로 설정되어 있습니다.</p>
<p>술어 내에서 여러 조건이 사용될 경우, 모든 <code translate="no">$[subfield]</code> 참조는 동일한 Struct 요소에 적용됩니다:</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)
<button class="copy-code-btn"></button></code></pre>
<p>엔티티 B만 일치합니다. 이 엔티티의 세 요소 모두 두 조건을 모두 충족합니다.</p>
<p>엔티티 수준 술어와 ` <code translate="no">element_filter</code>`를 결합할 때는 ` <code translate="no">element_filter</code> `를 식의 맨 끝에 배치해야 합니다:</p>
<pre><code translate="no" class="language-text"># Correct
category == &quot;index&quot; &amp;&amp; element_filter(chunks, $[quality_score] &gt; 0.9)

# Incorrect
element_filter(chunks, $[quality_score] &gt; 0.9) &amp;&amp; category == &quot;index&quot;
<button class="copy-code-btn"></button></code></pre>
<p>이 ` <code translate="no">category</code> ` 예제는 ` <code translate="no">category</code>`를 정의하지 않은 예제 데이터와 무관하게 표현식의 순서를 보여줍니다.</p>
<p><code translate="no">element_filter</code> 는 필터 표현식에서 한 번만 나타날 수 있습니다. <code translate="no">element_filter</code> 또는 <code translate="no">MATCH_*</code> 을 다른 <code translate="no">element_filter</code> 안에 중첩하지 마십시오.</p>
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
    </button></h2><p><code translate="no">MATCH_*</code> 연산자는 술어를 만족하는 Struct 요소의 수에 따라 엔티티를 선택해야 할 때 사용합니다. 이 연산자들은 다음과 같은 의미를 가집니다:</p>
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
<p><code translate="no">MATCH_ANY</code> <code translate="no">element_filter</code> 은 모두 적어도 하나의 Struct 요소가 술어를 만족함을 나타낼 수 있습니다. 행 수준 필터링만 필요한 경우 을 사용하십시오. 요소 수준 벡터 검색에 참여하는 Struct 요소를 필터링하는 등 요소 수준 제약 조건이 필요한 경우 을 사용하십시오. <code translate="no">MATCH_ANY</code> <code translate="no">element_filter</code> </p>
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
    </button></h3><p><code translate="no">MATCH_ANY</code> 는 StructArray의 요소 중 적어도 하나가 술어를 만족할 경우 <code translate="no">true</code> 로 평가됩니다.</p>
<pre><code translate="no" class="language-text">MATCH_ANY(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>Entity A와 Entity B는 모두 <code translate="no">section</code> 가 <code translate="no">&quot;index&quot;</code> 로 설정된 요소가 적어도 하나씩 있으므로 일치합니다.</p>
<p>빈 StructArray의 경우, <code translate="no">MATCH_ANY</code> 는 <code translate="no">false</code> 를 반환합니다.</p>
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
    </button></h3><p><code translate="no">MATCH_ALL</code> StructArray의 모든 요소가 술어를 만족하는 경우, MATCH_ALL은 <code translate="no">true</code> 로 평가됩니다.</p>
<pre><code translate="no" class="language-text">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>표시된 모든 요소의 <code translate="no">has_code</code> 가 <code translate="no">true</code> 로 설정되어 있으므로 엔티티 A와 엔티티 B 모두 일치합니다.</p>
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
<pre><code translate="no" class="language-text">MATCH_LEAST(chunks, $[quality_score] &gt; 0.9, threshold=2)
<button class="copy-code-btn"></button></code></pre>
<p>엔티티 B만 일치합니다. 엔티티 A에는 조건에 맞는 요소가 0개인 반면, 엔티티 B에는 3개가 있습니다.</p>
<p><code translate="no">MATCH_LEAST</code> 의 경우, <code translate="no">threshold</code> 는 양의 정수여야 합니다.</p>
<h3 id="MATCHMOST" class="common-anchor-header">MATCH_MOST<button data-href="#MATCHMOST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_MOST</code> 는 술어를 만족하는 요소의 수가 <code translate="no">threshold</code> 이하일 때 <code translate="no">true</code> 로 평가됩니다.</p>
<pre><code translate="no" class="language-text">MATCH_MOST(chunks, $[has_code] == true, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>두 엔티티 모두 일치하지 않음: 엔티티 A에는 4개의 적격 요소가 있고, 엔티티 B에는 3개가 있습니다.</p>
<p><code translate="no">MATCH_MOST</code> 의 경우, <code translate="no">threshold</code> 는 0이거나 양의 정수일 수 있습니다.</p>
<h3 id="MATCHEXACT" class="common-anchor-header">MATCH_EXACT의 경우, xml-ph-0001@deepl.internal는 0이거나 양의 정수일 수 있습니다.xml-ph-0000@deepl.internal의 경우, 술어를 만족하는 요소의 수가 xml-ph-0001@deepl.internal와 정확히 일치하면 xml-ph-0000@deepl.internal로 평가됩니다<button data-href="#MATCHEXACT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> 는 술어를 만족하는 요소의 수가 <code translate="no">threshold</code> 과 정확히 일치할 때 <code translate="no">true</code> 로 평가됩니다.</p>
<pre><code translate="no" class="language-text">MATCH_EXACT(chunks, $[section] == &quot;filter&quot;, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>두 엔티티 모두 <code translate="no">section</code> 가 <code translate="no">&quot;filter&quot;</code> 로 설정된 요소가 없으므로 일치하는 엔티티가 없습니다.</p>
<p><code translate="no">MATCH_EXACT</code> 의 경우, <code translate="no">threshold</code> 은 0이거나 양의 정수일 수 있습니다.</p>
<h2 id="Row-level-predicates-on-StructArray-paths" class="common-anchor-header">StructArray 경로에 대한 행 수준 술어<button data-href="#Row-level-predicates-on-StructArray-paths" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">element_filter</code> 및 <code translate="no">MATCH_*</code> 외에도, 일반 필터 표현식은 StructArray 필드나 그 스칼라 하위 필드 중 하나를 직접 참조할 수 있습니다. 이러한 술어는 엔티티 수준에서 평가되며 요소 오프셋을 반환하지 않습니다.</p>
<h3 id="Subfield-access" class="common-anchor-header">서브필드 액세스<button data-href="#Subfield-access" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Access-a-Struct-element-by-position" class="common-anchor-header">위치를 통해 Struct 요소에 접근하기</h4><p><code translate="no">structArrayField[index][subfield]</code> 을 사용하여 Struct 요소의 스칼라 하위 필드 중 하나를 0을 기준으로 한 위치에서 참조할 수 있습니다. 먼저 위치를 작성한 다음 하위 필드 이름을 작성합니다. 순서가 반전된 경로 <code translate="no">chunks[quality_score][0] &gt; 0.8</code> 는 유효하지 않습니다.</p>
<p>예를 들어, 첫 번째 요소의 품질 점수를 확인하려면 다음과 같이 합니다.</p>
<pre><code translate="no" class="language-text">chunks[0][quality_score] &gt; 0.8
<button class="copy-code-btn"></button></code></pre>
<p>이 표현식과 일치하는 것은 엔티티 B뿐입니다.</p>
<pre><code translate="no" class="language-text"># The first chunk belongs to the &quot;index&quot; section.
chunks[0][section] == &quot;index&quot;

# The second chunk has a high quality score.
chunks[1][quality_score] &gt; 0.9

# The first chunk is on page 1, 2, or 3.
chunks[0][page] in [1, 2, 3]

# Chained range on a positional path.
0.8 &lt; chunks[0][quality_score] &lt; 0.95
<button class="copy-code-btn"></button></code></pre>
<p>엔티티 A와 엔티티 B의 경우, 첫 번째 섹션 술어는 두 엔티티 모두에 일치하고, 두 번째 점수 술어는 엔티티 B에만 일치하며, 엄격한 점수 범위는 어느 쪽에도 일치하지 않습니다. <code translate="no">page</code> 술어는 일반적인 예시이며, 예제 데이터에는 <code translate="no">page</code> 가 정의되어 있지 않습니다.</p>
<p>위치 경로는 스칼라 하위 필드에 대한 비교, ` <code translate="no">in</code>`, ` <code translate="no">not in</code>` 및 연쇄된 범위 술어를 지원합니다. 엔티티의 `StructArray` 필드에 해당 위치에 요소가 없는 경우, 해당 엔티티는 일치하지 않습니다.</p>
<h3 id="ARRAY-operators" class="common-anchor-header">ARRAY 연산자<button data-href="#ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Access-array-subfields-by-position" class="common-anchor-header">위치를 통해 배열 하위 필드에 접근<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.6</span></h4><p>Milvus 3.0.6부터 위치 기반 경로는 스칼라 <code translate="no">ARRAY</code> 서브필드도 참조할 수 있습니다. <code translate="no">chunks[0][tags]</code> 는 첫 번째 Struct 요소의 내부 배열입니다. 이 배열은 배열 리터럴을 사용한 <code translate="no">==</code> 및 <code translate="no">!=</code> 연산, <code translate="no">array_contains</code>, <code translate="no">array_contains_any</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_length</code> 를 지원합니다. 이에 대한 비교 연산자( <code translate="no">in</code>, <code translate="no">like</code>) 및 산술 연산은 허용되지 않습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The first chunk is tagged &quot;tuning&quot;.</span>
array_contains(chunks[<span class="hljs-number">0</span>][tags], <span class="hljs-string">&quot;tuning&quot;</span>)

<span class="hljs-comment"># The first chunk has exactly these tags, in this order.</span>
chunks[<span class="hljs-number">0</span>][tags] == [<span class="hljs-string">&quot;search&quot;</span>, <span class="hljs-string">&quot;tuning&quot;</span>]

<span class="hljs-comment"># The first chunk has at least two tags.</span>
array_length(chunks[<span class="hljs-number">0</span>][tags]) &gt;= <span class="hljs-number">2</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">array_contains*</code>, <code translate="no">==</code> 및 <code translate="no">!=</code> 와 같이 전체 배열 하위 필드 경로(예: <code translate="no">array_contains(chunks[tags], &quot;tuning&quot;)</code>)에 대한 연산은 해당 경로가 Struct 요소당 하나의 내부 배열을 포함하므로 허용되지 않습니다. 대신 <code translate="no">MATCH_ANY(chunks, array_contains($[tags], &quot;tuning&quot;))</code> 를 사용하십시오.</p>
<h4 id="Count-Struct-elements" class="common-anchor-header">Struct 요소 수 계산</h4><p><code translate="no">array_length(structArrayField)</code> 을 사용하여 엔티티 내의 Struct 요소 수로 필터링하십시오. <code translate="no">array_length(chunks[section])</code> 과 같은 서브필드 경로에서 <code translate="no">array_length</code> 을 사용하면, 각 서브필드가 Struct 요소당 하나의 값을 포함하므로 동일한 개수가 반환됩니다.</p>
<pre><code translate="no" class="language-text"># Articles with at least three chunks.
array_length(chunks) &gt;= 3

# Articles with exactly one chunk.
array_length(chunks) == 1
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">&gt;= 3</code> 의 경우 상위 필드 개수 조건이 두 엔티티 모두에 일치하지만, <code translate="no">== 1</code> 의 경우 어느 쪽에도 일치하지 않습니다. 서브필드 경로에서 값의 개수를 계산할 수도 있습니다:</p>
<pre><code translate="no" class="language-text">ARRAY_LENGTH(chunks[quality_score]) == 3
<button class="copy-code-btn"></button></code></pre>
<p>엔티티 B만 일치합니다. 이는 해당 엔티티의 <code translate="no">quality_score</code> 하위 필드에 세 개의 값이 있기 때문입니다.</p>
<h4 id="Test-subfield-values-across-elements" class="common-anchor-header">여러 요소에 걸친 하위 필드 값 테스트</h4><p>예를 들어, 품질 점수 중 <code translate="no">0.74</code> 와 일치하는 값이 있는지 테스트해 보겠습니다:</p>
<pre><code translate="no" class="language-text">ARRAY_CONTAINS(chunks[quality_score], 0.74)
<button class="copy-code-btn"></button></code></pre>
<p>엔티티 A만 일치합니다.</p>
<p>스칼라 서브필드 경로에서 <code translate="no">array_contains</code>, <code translate="no">array_contains_any</code> 또는 <code translate="no">array_contains_all</code> 을 사용하여 엔티티 내의 모든 Struct 요소에 걸쳐 해당 서브필드의 값을 테스트할 수 있습니다. 각 서브필드 경로는 개별적으로 평가되므로, 서로 다른 서브필드에 대한 조건은 서로 다른 Struct 요소에 의해 충족될 수 있습니다.</p>
<pre><code translate="no" class="language-text"># At least one chunk belongs to the &quot;index&quot; section.
array_contains(chunks[section], &quot;index&quot;)

# At least one chunk belongs to the &quot;index&quot; or the &quot;search&quot; section.
array_contains_any(chunks[section], [&quot;index&quot;, &quot;search&quot;])

# The chunks cover both the &quot;index&quot; and the &quot;search&quot; sections,
# not necessarily in the same chunk.
array_contains_all(chunks[section], [&quot;index&quot;, &quot;search&quot;])
<button class="copy-code-btn"></button></code></pre>
<p>예제 데이터의 경우, <code translate="no">array_contains</code> 및 <code translate="no">array_contains_any</code> 표현식은 두 엔티티 모두와 일치합니다. <code translate="no">array_contains_all</code> 표현식은 두 엔티티 모두에 <code translate="no">&quot;search&quot;</code> 섹션이 없기 때문에 어느 쪽과도 일치하지 않습니다. 이 예제들은 서로 다른 서브필드에서 서로 다른 요소에 의해 조건이 충족되는 경우는 보여주지 않습니다.</p>
<p><code translate="no">array_contains(chunks[section], &quot;index&quot;)</code> <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code> 과 동일한 엔티티를 선택합니다. 술어는 요소별로 평가되므로, 동일한 Struct 요소에 대해 여러 조건이 충족되어야 할 때는 또는 을 사용하십시오. <code translate="no">$[...]</code> <code translate="no">MATCH_*</code> <code translate="no">element_filter</code> </p>
<h3 id="Test-whether-a-nullable-StructArray-field-is-null" class="common-anchor-header">Null 허용 StructArray 필드가 null인지 테스트<button data-href="#Test-whether-a-nullable-StructArray-field-is-null" class="anchor-icon" translate="no">
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
    </button></h3><p>Nullable StructArray 필드의 전체 값을 검사하려면 <code translate="no">IS NULL</code> 또는 <code translate="no">IS NOT NULL</code> 를 사용하십시오. NULL은 StructArray 필드 전체에 적용되므로, 이러한 술어는 하위 필드 경로가 아닌 필드 이름만 허용합니다.</p>
<pre><code translate="no" class="language-text"># Entities that have no chunks value.
chunks is null

# Entities that have a chunks value.
chunks is not null
<button class="copy-code-btn"></button></code></pre>
<p>적용 가능 여부에 대해서는 <a href="/docs/ko/structarray-limits.md#Nullable-and-dynamic-schema-limits">‘Nullable 및 동적 스키마 제한’을</a> 참조하십시오. 엔티티 A와 엔티티 B는 모두 NULL이 아닌 StructArray 값을 가지고 있습니다.</p>
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
    </button></h2><p><code translate="no">$[...]</code> 구문은 현재 Struct 요소의 스칼라 값을 나타냅니다. 술어 지원 여부는 스칼라 하위 필드 유형에 따라 달라집니다:</p>
<table>
<thead>
<tr><th>서브필드 유형</th><th>요소 수준 술어 지원</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code> 또는 <code translate="no">!($[has_code] == true)</code> 와 같은 스칼라 술어. <code translate="no">$[has_code]</code> 와 같은 단순한 부울 표현식은 피하십시오.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td>비교 연산, 연쇄 범위, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code> 또는 <code translate="no">%</code> 에 이어 비교 연산이 포함된 산술 표현식, 그리고 논리 연산 조합.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td>비교, 연쇄 범위, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code> 또는 <code translate="no">/</code> 을 포함한 산술 표현식에 이어지는 비교 연산, 그리고 논리 결합. <code translate="no">%</code> 연산자는 부동 소수점 하위 필드에서는 지원되지 않습니다.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>문자열 비교, 연쇄 범위, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">like</code>, <code translate="no">=~</code>, <code translate="no">!~</code> 및 논리 연산 조합.</td></tr>
<tr><td>스칼라 <code translate="no">ARRAY</code> 하위 필드 (Milvus 3.0.6 이상)</td><td><code translate="no">array_contains</code>, <code translate="no">array_contains_any</code>, <code translate="no">array_contains_all</code> 및 <code translate="no">array_length</code> on <code translate="no">$[tags]</code>, 여기에 <code translate="no">$[tags] is null</code> 및 <code translate="no">$[tags] is not null</code> 가 추가됩니다. <code translate="no">$[tags]</code> 에 대한 비교 연산자, <code translate="no">in</code> 및 <code translate="no">like</code> 는 거부됩니다.</td></tr>
<tr><td>요소가 null일 수 있는 하위 필드(Milvus 3.0.6 이상)</td><td><code translate="no">$[subfield] is null</code> 및 <code translate="no">$[subfield] is not null</code> 는 현재 Struct 요소의 값이 null인지 여부를 검사합니다. null 값을 가질 수 없는 하위 필드에서는 <code translate="no">is null</code> 가 항상 false입니다.</td></tr>
<tr><td>벡터 하위 필드</td><td><code translate="no">$[...]</code> 의 스칼라 술어 입력으로는 지원되지 않으며, Milvus 3.0.6 및 이후 버전에서 null 값을 허용하는 요소의 벡터 하위 필드에 대한 <code translate="no">$[emb] is null</code> 및 <code translate="no">$[emb] is not null</code> 만 예외입니다. 대신 EmbeddingList 검색 또는 요소 수준 벡터 검색을 통해 벡터 하위 필드를 사용하십시오.</td></tr>
</tbody>
</table>
<p><code translate="no">&amp;&amp;</code>, <code translate="no">||</code>, <code translate="no">!</code> 와 같은 논리 연산자는 술어 표현식에 적용됩니다. 예를 들어, <code translate="no">!$[has_code]</code> 대신 <code translate="no">!($[has_code] == true)</code> 를 작성하십시오.</p>
<h2 id="Null-values-in-element-level-predicates" class="common-anchor-header">요소 수준 술어에서의 null 값<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.6</span><button data-href="#Null-values-in-element-level-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 3.0.6부터, 요소-Nullable 하위 필드는 Struct 요소 내에서 Null 값을 가질 수 있습니다. Null 값은 StructArray 술어에서 3치 논리를 따릅니다:</p>
<ul>
<li><p>null 서브필드 값에 대한 비교( <code translate="no">in</code>), 조건( <code translate="no">like</code>) 또는 산술 술어는 false가 아닌 '알 수 없음'으로 처리됩니다. ` <code translate="no">&amp;&amp;</code>`, ` <code translate="no">\|\|</code>`, ` <code translate="no">!</code> `은 '알 수 없음' 결과를 전파하므로, ` <code translate="no">$[lang]</code> `이 null인 경우 ` <code translate="no">!($[lang] == &quot;en&quot;)</code> `은 여전히 '알 수 없음'으로 처리됩니다.</p></li>
<li><p><code translate="no">element_filter</code> 술어가 참인 Struct 요소만 유지합니다. 알 수 없는 요소는 일치하지 않습니다.</p></li>
<li><p><code translate="no">MATCH_*</code> 알 수 없는 요소를 미일치(miss)로 간주합니다. 어떤 요소라도 알 수 없는 경우 <code translate="no">MATCH_ALL</code> 는 false가 되지만, 빈 StructArray는 여전히 <code translate="no">MATCH_ALL</code> 를 만족합니다.</p></li>
<li><p><code translate="no">$[subfield] is null</code> <code translate="no">$[subfield] is not null</code> 는 항상 참 또는 거짓입니다. 이 함수들은 현재 요소의 유효성을 확인하므로, 는 값이 null인 요소와 정확히 일치합니다. <code translate="no">$[lang] is null</code> <code translate="no">lang</code> </p></li>
<li><p>배열 하위 필드에서, <code translate="no">$[tags]</code> 에 대한 <code translate="no">array_contains*</code> 는 null 내부 값을 건너뛰며 null 내부 배열과는 절대 일치하지 않고, <code translate="no">array_length($[tags])</code> 는 null 내부 값을 포함하며, <code translate="no">$[tags] is null</code> 는 null 내부 배열인 경우에만 true입니다.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Chunks whose language is unknown.</span>
element_filter(chunks, $[lang] <span class="hljs-keyword">is</span> null)

<span class="hljs-comment"># Entities where every chunk has a detected language.</span>
MATCH_ALL(chunks, $[lang] <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> null)

<span class="hljs-comment"># Entities with at least one chunk tagged &quot;tuning&quot;.</span>
MATCH_ANY(chunks, array_contains($[tags], <span class="hljs-string">&quot;tuning&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<p>행 수준 위치 경로도 동일한 규칙을 따릅니다: 첫 번째 요소의 <code translate="no">lang</code> 값이 null이거나, 엔티티에 해당 위치에 요소가 없거나, StructArray 필드가 null인 경우 <code translate="no">chunks[0][lang] == &quot;en&quot;</code> 의 결과가 알 수 없으므로 엔티티가 일치하지 않습니다.</p>
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
<li><p><code translate="no">text_match(field, &quot;...&quot;)</code> 또는 <code translate="no">phrase_match(field, &quot;...&quot;)</code> 과 같은 텍스트 일치 함수.</p></li>
<li><p>JSON 경로 구문, JSON 경로에 대한 ` <code translate="no">exists</code> `, 또는 ` <code translate="no">json_contains</code>`, ` <code translate="no">json_contains_all</code>`, ` <code translate="no">json_contains_any</code>`과 같은 JSON 함수.</p></li>
<li><p><code translate="no">array_contains</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_contains_any</code>, <code translate="no">array_length</code> 와 같은 배열 컨테이너 함수는 스칼라 하위 필드의 <code translate="no">$[subfield]</code> 에 적용됩니다. 대신 행 수준 술어에서 <code translate="no">chunks[section]</code> 와 같은 하위 필드 경로에 이러한 함수를 사용하십시오. Milvus 3.0.6부터는 스칼라 <code translate="no">ARRAY</code> 하위 필드의 <code translate="no">$[tags]</code> 에서도 지원됩니다.</p></li>
<li><p><code translate="no">$[subfield] is null</code> Milvus 3.0.6 이전 버전에서는 <code translate="no">$[subfield] is not null</code> 을 사용하십시오.</p></li>
</ul>
<ul>
<li><p><code translate="no">$[tags][0]</code> 와 같은 배열 하위 필드에 대한 첨자 및 <code translate="no">$[tags]</code> 에 대한 <code translate="no">like</code>.</p></li>
<li><p>지오메트리/GIS 함수.</p></li>
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
    </button></h2><p>다음 구문 규칙을 따르십시오:</p>
<ul>
<li><p><code translate="no">MATCH_*</code> 연산자 이름은 대소문자를 구분하지 않습니다.</p></li>
<li><p><code translate="no">$[subfield]</code> 는 <code translate="no">element_filter</code> 또는 <code translate="no">MATCH_*</code> 술어 내부에서만 사용하십시오. 예를 들어, <code translate="no">array_length($[section])</code> 는 허용되지 않습니다.</p></li>
<li><p><code translate="no">$[subfield]</code> 를 JSON 경로, 배열 컨테이너 또는 벡터 필드 참조로 사용하지 마십시오.</p></li>
<li><p><code translate="no">element_filter</code> 또는 <code translate="no">MATCH_*</code> 를 다른 StructArray 연산자 안에 중첩하지 마십시오.</p></li>
<li><p><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> 및 <code translate="no">MATCH_EXACT</code> 의 경우 이름이 지정된 <code translate="no">threshold=N</code> 를 사용하십시오.</p></li>
<li><p>위치 기반 경로에서는 하위 필드 이름 앞에 요소 위치를 작성하십시오. 즉, ` <code translate="no">chunks[section][0]</code>`이 아니라 ` <code translate="no">chunks[0][section]</code>`과 같이 작성하십시오.</p></li>
</ul>
<ul>
<li><code translate="no">IS NULL</code> 및 <code translate="no">IS NOT NULL</code> 는 <code translate="no">chunks is null</code> 와 같이 전체 StructArray 필드에서만 사용하거나, Milvus 3.0.6부터는 <code translate="no">element_filter</code> 또는 <code translate="no">MATCH_*</code> 내부의 <code translate="no">$[subfield]</code> 에서만 사용하십시오. <code translate="no">chunks[section]</code> 와 같은 하위 필드 경로에서는 사용하지 마십시오.</li>
</ul>
<ul>
<li><p>배열 하위 필드에 인덱스를 지정하지 마십시오. <code translate="no">$[tags][0]</code> 및 <code translate="no">chunks[0][tags][0]</code> 는 지원되지 않습니다.</p></li>
<li><p><code translate="no">MATCH_ANY</code> 빈 StructArray에 대해 이 연산을 수행하면 <code translate="no">false</code> 를 반환합니다.</p></li>
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
    </button></h2><p>관련 지침은 다음을 참조하십시오:</p>
<ul>
<li><p><a href="/docs/ko/filtered-search-with-structarray.md">StructArray를 사용한 필터링 검색</a></p></li>
<li><p><a href="/docs/ko/basic-vector-search-with-structarray.md">StructArray를 사용한 기본 벡터 검색</a></p></li>
<li><p><a href="/docs/ko/index-structarray-fields.md">StructArray 필드 인덱싱</a></p></li>
<li><p><a href="/docs/ko/structarray-limits.md">StructArray의 제한 사항</a></p></li>
</ul>
