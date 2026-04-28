---
id: filtering-templating.md
title: 필터 템플릿
summary: >-
  Milvus에서 수많은 요소가 포함된 복잡한 필터 표현식, 특히 CJK 문자와 같은 비 ASCII 문자가 포함된 표현식은 쿼리 성능에 큰
  영향을 미칠 수 있습니다. 이 문제를 해결하기 위해 Milvus는 복잡한 표현식을 구문 분석하는 데 소요되는 시간을 줄여 효율성을 개선하도록
  설계된 필터 표현식 템플릿 메커니즘을 도입했습니다. 이 페이지에서는 검색, 쿼리 및 삭제 작업에서 필터 표현식 템플릿을 사용하는 방법에 대해
  설명합니다.
---
<h1 id="Filter-Templating" class="common-anchor-header">필터 템플릿<button data-href="#Filter-Templating" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus에서 수많은 요소가 포함된 복잡한 필터 표현식, 특히 CJK 문자와 같은 비 ASCII 문자가 포함된 표현식은 쿼리 성능에 큰 영향을 미칠 수 있습니다. 이 문제를 해결하기 위해 Milvus는 복잡한 표현식을 구문 분석하는 데 소요되는 시간을 줄여 효율성을 개선하도록 설계된 필터 표현식 템플릿 메커니즘을 도입했습니다. 이 페이지에서는 검색, 쿼리 및 삭제 작업에서 필터 표현식 템플릿을 사용하는 방법에 대해 설명합니다.</p>
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
    </button></h2><p>필터 표현식 템플릿을 사용하면 쿼리 실행 중에 값으로 동적으로 대체할 수 있는 자리 표시자를 사용하여 필터 표현식을 만들 수 있습니다. 템플릿을 사용하면 큰 배열이나 복잡한 표현식을 필터에 직접 포함하지 않아도 되므로 구문 분석 시간이 단축되고 쿼리 성능이 향상됩니다.</p>
<p><code translate="no">age</code> 과 <code translate="no">city</code> 이라는 두 개의 필드가 포함된 필터 표현식이 있고, 나이가 25세 이상이고 '北京'(베이징) 또는 '上海'(상하이)에 거주하는 모든 사람을 찾고자 한다고 가정해 보겠습니다. 필터 표현식에 값을 직접 포함하는 대신 템플릿을 사용할 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>여기서 <code translate="no">{age}</code> 및 <code translate="no">{city}</code> 은 쿼리가 실행될 때 <code translate="no">filter_params</code> 의 실제 값으로 대체되는 자리 표시자입니다.</p>
<p>Milvus에서 필터 표현식 템플릿을 사용하면 몇 가지 주요 이점이 있습니다:</p>
<ul>
<li><p>구문<strong>분석 시간 단축</strong>: 크거나 복잡한 필터 표현식을 자리 표시자로 대체함으로써 시스템에서 필터를 구문 분석하고 처리하는 데 소요되는 시간을 줄일 수 있습니다.</p></li>
<li><p><strong>쿼리 성능 향상</strong>: 구문 분석 오버헤드가 줄어들면 쿼리 성능이 향상되어 QPS가 높아지고 응답 시간이 빨라집니다.</p></li>
<li><p><strong>확장성</strong>: 데이터 세트가 증가하고 필터 표현식이 복잡해져도 템플릿을 사용하면 효율적이고 확장 가능한 성능을 유지할 수 있습니다.</p></li>
</ul>
<h2 id="Search-Operations" class="common-anchor-header">검색 작업<button data-href="#Search-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus의 검색 작업에서 <code translate="no">filter</code> 표현식은 필터링 조건을 정의하는 데 사용되며, <code translate="no">filter_params</code> 매개변수는 자리 표시자의 값을 지정하는 데 사용됩니다. <code translate="no">filter_params</code> 사전에는 Milvus가 필터 표현식으로 대체하는 데 사용할 동적 값이 포함되어 있습니다.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.search(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    vectors[:nq],
    <span class="hljs-built_in">filter</span>=expr,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;search_list&quot;</span>: <span class="hljs-number">100</span>}},
    filter_params=filter_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>이 예제에서는 검색을 실행할 때 Milvus가 <code translate="no">{age}</code> 을 <code translate="no">25</code> 으로, <code translate="no">{city}</code> 을 <code translate="no">[&quot;北京&quot;, &quot;上海&quot;]</code> 으로 동적으로 대체합니다.</p>
<h2 id="Query-Operations" class="common-anchor-header">쿼리 연산<button data-href="#Query-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus의 쿼리 연산에도 동일한 템플릿 메커니즘을 적용할 수 있습니다. <code translate="no">query</code> 함수에서 필터 표현식을 정의하고 <code translate="no">filter_params</code> 을 사용하여 대체할 값을 지정합니다.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.query(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">filter_params</code> 을 사용하면 Milvus는 값의 동적 삽입을 효율적으로 처리하여 쿼리 실행 속도를 향상시킵니다.</p>
<h2 id="Delete-Operations" class="common-anchor-header">삭제 작업<button data-href="#Delete-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>삭제 작업에서도 필터 표현식 템플릿을 사용할 수 있습니다. 검색 및 쿼리와 마찬가지로 <code translate="no">filter</code> 식은 조건을 정의하고 <code translate="no">filter_params</code> 은 자리 표시자에 대한 동적 값을 제공합니다.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.delete(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p>이 접근 방식은 특히 복잡한 필터 조건을 처리할 때 삭제 작업의 성능을 향상시킵니다.</p>
<h2 id="Conclusion" class="common-anchor-header">결론<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>필터 표현식 템플릿은 Milvus에서 쿼리 성능을 최적화하는 데 필수적인 도구입니다. 플레이스홀더와 <code translate="no">filter_params</code> 사전을 사용하면 복잡한 필터 표현식을 구문 분석하는 데 소요되는 시간을 크게 줄일 수 있습니다. 이는 쿼리 실행 속도와 전반적인 성능 향상으로 이어집니다.</p>
