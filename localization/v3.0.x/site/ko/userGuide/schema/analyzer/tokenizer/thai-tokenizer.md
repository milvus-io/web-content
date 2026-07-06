---
id: thai-tokenizer.md
title: 태국어Compatible with Milvus 3.0.0+
summary: '태국어 토큰화기는 태국어 텍스트를 단어 토큰으로 분할하고, 공백 및 구두점만으로 구성된 부분을 걸러냅니다.'
beta: Milvus 3.0.0+
---
<h1 id="Thai" class="common-anchor-header">태국어<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Thai" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">thai</code> 토큰화기는 공백에 의존하지 않고 태국어 텍스트를 단어 토큰으로 분할합니다. 태국어 또는 태국어와 영어가 혼합된 텍스트에 대한 사용자 지정 분석기 파이프라인을 구축해야 할 때 이 토큰화기를 사용하십시오.</p>
<h2 id="Configuration" class="common-anchor-header">구성<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>태국어 텍스트의 경우, 대부분의 경우 내장된 <a href="/docs/ko/thai-analyzer.md"><code translate="no">thai</code></a> 분석기를 사용하십시오. 내장 분석기에는 이 토큰화기와 함께 소문자 변환, 소수점 숫자 정규화, 태국어 스톱워드 제거 기능이 포함되어 있습니다. 사용자 정의 분석기 파이프라인을 구축해야 하는 경우에만 <code translate="no">thai</code> 토큰화기를 직접 사용하십시오.</p>
</div>
<p><code translate="no">thai</code> 토큰화기를 사용하여 분석기를 구성하려면, <code translate="no">analyzer_params</code> 에서 ` <code translate="no">tokenizer</code> `을 ` <code translate="no">thai</code> `으로 설정하십시오.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">thai</code> 토큰화기에는 구성 가능한 매개변수가 없습니다.</p>
<p>이 토큰화기는 하나 이상의 필터와 함께 작동할 수 있습니다. 예를 들어, 다음 구성에서는 <code translate="no">thai</code> 토큰화기를 <a href="/docs/ko/lowercase-filter.md"><code translate="no">lowercase</code></a> 및 <a href="/docs/ko/decimaldigit-filter.md"><code translate="no">decimaldigit</code></a> 필터를 함께 사용합니다:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        <span class="hljs-string">&quot;decimaldigit&quot;</span>,
    ],
}
<button class="copy-code-btn"></button></code></pre>
<p>이 사용자 정의 파이프라인은 내장된 <code translate="no">_thai_</code> 중지어 사전을 포함하지 않으므로, 내장된 <code translate="no">thai</code> 분석기와 동일하지 않습니다. 완전한 사전 정의된 파이프라인을 사용하려면 <code translate="no">{&quot;type&quot;: &quot;thai&quot;}</code> 를 참조하십시오.</p>
<p>이 토큰화기는 다음과 같은 동작을 적용합니다:</p>
<ul>
<li><strong>태국어 분절</strong>: 공백에 의존하지 않고 태국어 텍스트를 단어 토큰으로 분절합니다.</li>
<li><strong>공백 및 구두점 필터링</strong>: 공백과 구두점만으로 구성된 세그먼트를 필터링하여 제거합니다. 이는 <a href="/docs/ko/icu-tokenizer.md"><code translate="no">icu</code></a> 구분자와는 다릅니다. 해당 구분자는 구두점과 공백을 토큰으로 보존할 수 있습니다.</li>
<li><strong>혼합 문자 텍스트</strong>: 태국어와 영어가 혼합된 텍스트에서 라틴 문자 단어 토큰을 출력합니다.</li>
<li><strong>토큰화기 전용</strong>: 토큰을 소문자로 변환하지 않으며, 유니코드 숫자를 정규화하지 않고, 스톱 워드를 제거하지 않습니다. 해당 단계에 필터를 추가하거나 내장된 <a href="/docs/ko/thai-analyzer.md"><code translate="no">thai</code></a> 분석기를 사용하십시오.</li>
<li><strong>위치 의미론</strong>: 건너뛴 공백 및 구두점을 포함하는 문자 기반 토큰 위치를 사용하므로, 구문 및 근접성 매칭 동작이 다른 비라틴 문자 토큰화기와 일관성을 유지합니다.</li>
</ul>
<p><code translate="no">analyzer_params</code> 를 정의한 후, 컬렉션 스키마를 정의할 때 <code translate="no">VARCHAR</code> 필드에 분석기를 적용할 수 있습니다. 자세한 내용은 <a href="/docs/ko/analyzer-overview.md#Example-use">사용 예제를</a> 참조하십시오.</p>
<h2 id="Examples" class="common-anchor-header">예제<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>분석기 구성을 컬렉션 스키마에 적용하기 전에 <code translate="no">run_analyzer</code> 메서드를 사용하여 동작을 확인하십시오.</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">분석기 구성<button data-href="#Analyzer-configuration" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer" class="common-anchor-header">다음 방법을 사용한 검증 <code translate="no">run_analyzer</code><button data-href="#Verification-using-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sample_text = <span class="hljs-string">&quot;สวัสดี! ทดสอบ, ระบบ Milvus ๑๒๓&quot;</span>

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">예상 출력<button data-href="#Expected-output" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no"><span class="hljs-selector-attr">[<span class="hljs-string">&#x27;สวัสดี&#x27;</span>, <span class="hljs-string">&#x27;ทดสอบ&#x27;</span>, <span class="hljs-string">&#x27;ระบบ&#x27;</span>, <span class="hljs-string">&#x27;Milvus&#x27;</span>, <span class="hljs-string">&#x27;๑๒๓&#x27;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
