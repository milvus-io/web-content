---
id: decompounder-filter.md
title: 디컴파운더 필터
summary: >-
  '디컴파운더' 필터는 지정된 사전을 기반으로 복합어를 개별 구성 요소로 분할하여 복합어의 일부를 더 쉽게 검색할 수 있도록 해줍니다. 이
  필터는 독일어와 같이 복합어를 자주 사용하는 언어에 특히 유용합니다.
---
<h1 id="Decompounder​" class="common-anchor-header">합성어 분해기<button data-href="#Decompounder​" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">decompounder</code> 필터는 지정된 사전을 기반으로 복합어를 개별 구성 요소로 분할하여 복합어의 일부를 더 쉽게 검색할 수 있도록 해줍니다. 이 필터는 독일어와 같이 복합어를 자주 사용하는 언어에 특히 유용합니다.</p>
<h2 id="Configuration​" class="common-anchor-header">구성<button data-href="#Configuration​" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">decompounder</code> 필터는 Milvus의 사용자 지정 필터입니다. 이 필터를 사용하려면 필터 구성에 <code translate="no">&quot;type&quot;: &quot;decompounder&quot;</code> 을 지정하고 인식할 단어 구성 요소의 사전을 제공하는 <code translate="no">word_list</code> 매개 변수를 지정하세요.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>:[{​
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment"># Specifies the filter type as decompounder​</span>
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>],​
    }],​
}​
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">decompounder</code> 필터는 다음과 같은 구성 가능한 매개변수를 허용합니다.</p>
<table data-block-token="O4ZcdyoEToqP22xm5ELcYyIhnEh"><thead><tr><th data-block-token="MW4TdhfD2oe0KTx9qwGcP5XEnIh" colspan="1" rowspan="1"><p data-block-token="Y5tddmngjoAyd1xtaDzc7It5nRf">파라미터</p>
</th><th data-block-token="Vk8Id7BMRoJMIkxN0YPc4lJgn2f" colspan="1" rowspan="1"><p data-block-token="D4v9dtQ53oCx6ExVKhxcPj1EnWg">설명</p>
</th></tr></thead><tbody><tr><td data-block-token="CDQldJSkAonYPIxTkiWcWpqPnOd" colspan="1" rowspan="1"><p data-block-token="TX4ndGkwkogWybxIfZocILJOnbd"><code translate="no">word_list</code></p>
</td><td data-block-token="VrxtdsWnZon6oPxMmbQcCgclnUg" colspan="1" rowspan="1"><p data-block-token="BXP4dHimoocoozxbHAecJOA6nTe">복합 용어를 분할하는 데 사용되는 단어 구성 요소 목록입니다. 이 사전은 복합어가 개별 용어로 분해되는 방식을 결정합니다.</p>
</td></tr></tbody></table>
<p><code translate="no">decompounder</code> 필터는 토큰화기에 의해 생성된 용어에 대해 작동하므로 토큰화기와 함께 사용해야 합니다.</p>
<p><code translate="no">analyzer_params</code> 을 정의한 후 컬렉션 스키마를 정의할 때 <code translate="no">VARCHAR</code> 필드에 적용할 수 있습니다. 이렇게 하면 Milvus가 지정된 분석기를 사용하여 해당 필드의 텍스트를 처리하여 효율적인 토큰화 및 필터링을 수행할 수 있습니다. 자세한 내용은 <a href="/docs/ko/analyzer-overview.md#Example-use">사용 예시를</a> 참조하세요.</p>
<h2 id="Example-output​" class="common-anchor-header">예제 출력<button data-href="#Example-output​" class="anchor-icon" translate="no">
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
    </button></h2><p>다음은 <code translate="no">decompounder</code> 필터가 텍스트를 처리하는 방법의 예입니다.</p>
<p><strong>원본 텍스트</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;dampfschifffahrt brotbackautomat&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>예상 출력</strong> ( <code translate="no">word_list: [&quot;dampf&quot;, &quot;schiff&quot;, &quot;fahrt&quot;, &quot;brot&quot;, &quot;backen&quot;, &quot;automat&quot;]</code> 포함).</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brotbackautomat&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
