---
id: standard-analyzer.md
title: 표준 분석기
related_key: 'standard, analyzer'
summary: >-
  '표준' 분석기는 Milvus의 기본 분석기로, 분석기를 지정하지 않으면 텍스트 필드에 자동으로 적용됩니다. 문법 기반 토큰화를 사용하므로
  대부분의 언어에 효과적입니다.
---
<h1 id="Standard​" class="common-anchor-header">표준<button data-href="#Standard​" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">standard</code> 분석기는 Milvus의 기본 분석기로, 분석기를 지정하지 않으면 텍스트 필드에 자동으로 적용됩니다. 문법 기반 토큰화를 사용하므로 대부분의 언어에 효과적입니다.</p>
<h2 id="Definition​" class="common-anchor-header">정의<button data-href="#Definition​" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">standard</code> 분석기는 다음으로 구성됩니다.</p>
<ul>
<li><p><strong>토큰화 도구</strong>: <code translate="no">standard</code> 토큰화 도구를 사용하여 문법 규칙에 따라 텍스트를 개별 단어 단위로 분할합니다. 자세한 내용은 <a href="/docs/ko/standard-tokenizer.md">표준을</a> 참조하세요.</p></li>
<li><p><strong>필터</strong>: <code translate="no">lowercase</code> 필터를 사용하여 모든 토큰을 소문자로 변환하여 대소문자를 구분하지 않고 검색할 수 있도록 합니다. 자세한 내용은 다음을 참조하세요.<a href="/docs/ko/lowercase-filter.md"><code translate="no">lowercase filter</code></a>.</p></li>
</ul>
<p><code translate="no">standard</code> 분석기의 기능은 다음 사용자 지정 분석기 구성과 동일합니다.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p><code translate="no">standard</code> 분석기를 필드에 적용하려면 <code translate="no">analyzer_params</code> 에서 <code translate="no">type</code> 을 <code translate="no">standard</code> 으로 설정하고 필요에 따라 선택적 매개변수를 포함하면 됩니다.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Specifies the standard analyzer type​</span>
}​
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">standard</code> 분석기는 다음과 같은 선택적 매개변수를 허용합니다: </p>
<table data-block-token="RYdmdh6LRoVtrVxY4RHcvUTxned"><thead><tr><th data-block-token="IbXLd0A89oY8rjxRXsccdHxmn6d" colspan="1" rowspan="1"><p data-block-token="Afe5dOJUIoIEhOxAPyqcUlqdnih">매개변수</p>
</th><th data-block-token="LpTFdYXm6ox6Rgx5wAWciQjfnjn" colspan="1" rowspan="1"><p data-block-token="LR2QdjlzVoMv8ixoLDScpuhsnxb">설명</p>
</th></tr></thead><tbody><tr><td data-block-token="AJKvdnlG8oAp8exzFbocIvf9nGf" colspan="1" rowspan="1"><p data-block-token="EXV8djjJtoYolLxllxRcIivYnre"><code translate="no">stop_words</code></p>
</td><td data-block-token="KWkqdOBuRoPg39xtTqWcf5RQnbb" colspan="1" rowspan="1"><p data-block-token="R8HedE6qTo4UmlxpQaLcE8oNn0b">토큰화에서 제거할 중지 단어 목록이 포함된 배열입니다. 기본값은 기본 제공되는 일반적인 영어 중지 단어 집합인 <code translate="no">_english_</code> 입니다. <code translate="no">_english_</code> 에 대한 자세한 내용은 <a href="https://github.com/milvus-io/milvus/blob/master/internal/core/thirdparty/tantivy/tantivy-binding/src/stop_words.rs">여기에서</a> 확인할 수 있습니다.</p>
</td></tr></tbody></table>
<p>사용자 정의 중지 단어의 구성 예시.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Specifies the standard analyzer type​</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>, [<span class="hljs-string">&quot;of&quot;</span>] <span class="hljs-comment"># Optional: List of words to exclude from tokenization​</span>
}​
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">analyzer_params</code> 을 정의한 후 컬렉션 스키마를 정의할 때 <code translate="no">VARCHAR</code> 필드에 적용할 수 있습니다. 이렇게 하면 Milvus가 효율적인 토큰화 및 필터링을 위해 지정된 분석기를 사용하여 해당 필드의 텍스트를 처리할 수 있습니다. 자세한 내용은 <a href="/docs/ko/analyzer-overview.md#">사용 예시를</a> 참조하세요.</p>
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
    </button></h2><p>다음은 <code translate="no">standard</code> 분석기가 텍스트를 처리하는 방식입니다.</p>
<p><strong>원본 텍스트</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>예상 출력입니다</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;the&quot;</span>, <span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;database&quot;</span>, <span class="hljs-string">&quot;is&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
