---
id: english-analyzer.md
title: 영어 분석기
related_key: 'english, analyzer'
summary: Milvus의 '영어' 분석기는 영어 텍스트를 처리하도록 설계되어 토큰화 및 필터링에 대한 언어별 규칙을 적용합니다.
---
<h1 id="English​" class="common-anchor-header">영어<button data-href="#English​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus의 <code translate="no">english</code> 분석기는 영어 텍스트를 처리하도록 설계되어 토큰화 및 필터링에 대한 언어별 규칙을 적용합니다.</p>
<h3 id="Definition​" class="common-anchor-header">정의</h3><p><code translate="no">english</code> 분석기는 다음 구성 요소를 사용합니다.</p>
<ul>
<li><p><strong>토큰화 도구</strong>: 를 사용하여 <a href="/docs/ko/standard-tokenizer.md"><code translate="no">standard tokenizer</code></a> 를 사용하여 텍스트를 개별 단어 단위로 분할합니다.</p></li>
<li><p>필터: 포괄적인 텍스트 처리를 위한 여러 필터가 포함되어 있습니다.</p>
<ul>
<li><p><a href="/docs/ko/lowercase-filter.md"><code translate="no">lowercase</code></a>: 모든 토큰을 소문자로 변환하여 대소문자를 구분하지 않고 검색할 수 있도록 합니다.</p></li>
<li><p><a href="/docs/ko/stemmer-filter.md"><code translate="no">stemmer</code></a>: 더 광범위한 검색을 지원하기 위해 단어를 어근 형태로 축소합니다(예: "running"이 "run"이 됨).</p></li>
<li><p><a href="/docs/ko/stop-filter.md"><code translate="no">stop_words</code></a>: 텍스트의 주요 용어에 집중하기 위해 일반적인 영어 중단어를 제거합니다.</p></li>
</ul></li>
</ul>
<p><code translate="no">english</code> 분석기의 기능은 다음과 같은 사용자 정의 분석기 구성과 동일합니다.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>,​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,​
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
        }，{​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,​
            <span class="hljs-string">&quot;stop_words&quot;</span>: <span class="hljs-string">&quot;_english_&quot;</span>,​
        }​
    ]​
}​
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuration​" class="common-anchor-header">구성</h3><p><code translate="no">english</code> 분석기를 필드에 적용하려면 <code translate="no">analyzer_params</code> 에서 <code translate="no">type</code> 을 <code translate="no">english</code> 으로 설정하고 필요에 따라 선택적 매개변수를 포함하면 됩니다.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">english</code> 분석기는 다음과 같은 선택적 매개변수를 허용합니다: </p>
<table data-block-token="YMmUdQtabozHZnxC09QcajU0nvd"><thead><tr><th data-block-token="N1Qfdbd9Vok7mkx0OGpcx49cnUM" colspan="1" rowspan="1"><p data-block-token="PxYUdGyrMoa4x5x3sCpcF7JLn1e">매개변수</p>
</th><th data-block-token="WIQKdcE3coxEirxwmpucXGuin7f" colspan="1" rowspan="1"><p data-block-token="VAHCdZFTkoeSJNxgPmicGnOZnWh">설명</p>
</th></tr></thead><tbody><tr><td data-block-token="NzThd1pxQoektPxhqrQc7Oxcnhl" colspan="1" rowspan="1"><p data-block-token="SW6SdE2iyohhGaxQIfpcjZfCnBx"><code translate="no">stop_words</code></p>
</td><td data-block-token="KSAbdmKPCowsR7x7UO8c8ngFnnh" colspan="1" rowspan="1"><p data-block-token="F3E1dFjL3oUrl5xWq3ucpVPon7c">토큰화에서 제거할 중지 단어 목록이 포함된 배열입니다. 기본값은 기본 제공되는 일반적인 영어 중지 단어 집합인 <code translate="no">_english_</code> 입니다.</p>
</td></tr></tbody></table>
<p>사용자 정의 중지 단어를 사용한 구성 예시.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">analyzer_params</code> 을 정의한 후 컬렉션 스키마를 정의할 때 <code translate="no">VARCHAR</code> 필드에 적용할 수 있습니다. 이렇게 하면 Milvus가 효율적인 토큰화 및 필터링을 위해 지정된 분석기를 사용하여 해당 필드의 텍스트를 처리할 수 있습니다. 자세한 내용은 <a href="/docs/ko/analyzer-overview.md#Example-use">사용 예시를</a> 참조하세요.</p>
<h3 id="Example-output​" class="common-anchor-header">예제 출력</h3><p>다음은 <code translate="no">english</code> 분석기가 텍스트를 처리하는 방식입니다.</p>
<p><strong>원본 텍스트</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>예상 출력</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;databas&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
