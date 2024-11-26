---
id: stemmer-filter.md
title: 스템머 필터
summary: '''어간'' 필터는 단어를 기본 또는 어근 형태(어간이라고 함)로 줄여주므로 다양한 변형에서 비슷한 의미를 가진 단어를 쉽게 찾을 수 있습니다.'
---
<h1 id="Stemmer​" class="common-anchor-header">어간<button data-href="#Stemmer​" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">stemmer</code> 필터는 단어를 기본 또는 어근 형태(어간이라고 함)로 축소하여 다양한 변형에서 비슷한 의미를 가진 단어를 쉽게 찾을 수 있도록 해줍니다. <code translate="no">stemmer</code> 필터는 여러 언어를 지원하므로 다양한 언어적 맥락에서 효과적으로 검색하고 색인을 생성할 수 있습니다.</p>
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
    </button></h2><p><code translate="no">stemmer</code> 필터는 Milvus의 사용자 정의 필터입니다. 이 필터를 사용하려면 필터 구성에서 <code translate="no">&quot;type&quot;: &quot;stemmer&quot;</code> 을 <code translate="no">language</code> 매개변수와 함께 지정하여 원하는 어간 언어를 선택합니다.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>:[{​
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>, <span class="hljs-comment"># Specifies the filter type as stemmer​</span>
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-comment"># Sets the language for stemming to English​</span>
    }],​
}​
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">stemmer</code> 필터는 다음과 같은 구성 가능한 매개 변수를 허용합니다.</p>
<table data-block-token="CnsXd9Ej7ozbQixt3lzcMqoanUf"><thead><tr><th data-block-token="ASZldv4hso4KpYxws1LcIE6fnSb" colspan="1" rowspan="1"><p data-block-token="FgIodsPFMoIlfDxk0GLcnf6Cn3c">파라미터</p>
</th><th data-block-token="UwUpdXmE2oaLOjxYKpac4U4enUb" colspan="1" rowspan="1"><p data-block-token="S3g4d2pl3o1QfOxDrrCc0bHwn6l">설명</p>
</th></tr></thead><tbody><tr><td data-block-token="Qlg7d56pCo2leCxk3rkcZswhngb" colspan="1" rowspan="1"><p data-block-token="V7Ajd2RyToVjNTxbGEEcVHdYnxb"><code translate="no">language</code></p>
</td><td data-block-token="NTbNd7XeuoBsfsxzQ1Kc0jKonKb" colspan="1" rowspan="1"><p data-block-token="J4nPdCcSToFTGYx6Huhc7kpqnRd">형태소 분석 프로세스의 언어를 지정합니다. 지원되는 언어는 다음과 같습니다: <code translate="no">"arabic"</code>, <code translate="no">"danish"</code>, <code translate="no">"dutch"</code>, <code translate="no">"english"</code>, <code translate="no">"finnish"</code>, <code translate="no">"french"</code>, <code translate="no">"german"</code>, <code translate="no">"greek"</code>, <code translate="no">"hungarian"</code>, <code translate="no">"italian"</code>, <code translate="no">"norwegian"</code>, <code translate="no">"portuguese"</code>, <code translate="no">"romanian"</code>, <code translate="no">"russian"</code>, <code translate="no">"spanish"</code>, <code translate="no">"swedish"</code>, <code translate="no">"tamil"</code>, <code translate="no">"turkish"</code></p>
</td></tr></tbody></table>
<p><code translate="no">stemmer</code> 필터는 토큰 생성기에 의해 생성된 용어에 대해 작동하므로 토큰 생성기와 함께 사용해야 합니다.</p>
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
    </button></h2><p>다음은 <code translate="no">stemmer</code> 필터가 텍스트를 처리하는 방법의 예입니다.</p>
<p><strong>원본 텍스트</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;running runs looked ran runner&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>예상 출력</strong> ( <code translate="no">language: &quot;english&quot;</code> 포함).</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;look&quot;</span>, <span class="hljs-string">&quot;ran&quot;</span>, <span class="hljs-string">&quot;runner&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
