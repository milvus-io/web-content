---
id: cncharonly-filter.md
title: Cncharonly 필터
summary: '''cnalphanumonly` 필터는 한자, 영문자 또는 숫자 이외의 문자가 포함된 토큰을 제거합니다.'
---
<h1 id="Cncharonly​" class="common-anchor-header">Cncharonly<button data-href="#Cncharonly​" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">cncharonly</code> 필터는 중국어 이외의 문자가 포함된 토큰을 제거합니다. 이 필터는 중국어 텍스트에만 집중하여 다른 문자, 숫자 또는 기호가 포함된 토큰을 모두 걸러내고자 할 때 유용합니다.</p>
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
    </button></h2><p><code translate="no">cncharonly</code> 필터는 Milvus에 내장되어 있습니다. 사용하려면 <code translate="no">analyzer_params</code> 내의 <code translate="no">filter</code> 섹션에 이름을 지정하기만 하면 됩니다.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cncharonly&quot;</span>],​
}​
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">cncharonly</code> 필터는 토큰 생성기에 의해 생성된 용어에 대해 작동하므로 토큰 생성기와 함께 사용해야 합니다.</p>
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
    </button></h2><p>다음은 <code translate="no">cncharonly</code> 필터가 텍스트를 처리하는 방법의 예입니다.</p>
<p><strong>원본 텍스트</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;Milvus 是 LF AI &amp; Data Foundation 下的一个开源项目，以 Apache 2.0 许可发布。&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>예상 출력</strong></p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;是&quot;</span>, <span class="hljs-string">&quot;下&quot;</span>, <span class="hljs-string">&quot;的&quot;</span>, <span class="hljs-string">&quot;一个&quot;</span>, <span class="hljs-string">&quot;开源&quot;</span>, <span class="hljs-string">&quot;项目&quot;</span>, <span class="hljs-string">&quot;以&quot;</span>, <span class="hljs-string">&quot;许可&quot;</span>, <span class="hljs-string">&quot;发布&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
