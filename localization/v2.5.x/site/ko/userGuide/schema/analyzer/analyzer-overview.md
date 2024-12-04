---
id: analyzer-overview.md
title: 분석기 개요
summary: >-
  텍스트 처리에서 분석기는 원시 텍스트를 구조화되고 검색 가능한 형식으로 변환하는 중요한 구성 요소입니다. 각 분석기는 일반적으로 토큰화기와
  필터라는 두 가지 핵심 요소로 구성됩니다. 이 두 요소는 함께 입력 텍스트를 토큰으로 변환하고, 이러한 토큰을 정제하며, 효율적인 색인 및
  검색을 위해 준비합니다.
---
<h1 id="Analyzer-Overview​" class="common-anchor-header">분석기 개요<button data-href="#Analyzer-Overview​" class="anchor-icon" translate="no">
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
    </button></h1><p>텍스트 처리에서 <strong>분석기는</strong> 원시 텍스트를 구조화되고 검색 가능한 형식으로 변환하는 중요한 구성 요소입니다. 각 분석기는 일반적으로 <strong>토큰화기와</strong> <strong>필터라는</strong> 두 가지 핵심 요소로 구성됩니다. 이들은 함께 입력 텍스트를 토큰으로 변환하고, 이러한 토큰을 정제하며, 효율적인 색인 및 검색을 위해 준비합니다.</p>
<p><a href="https://github.com/quickwit-oss/tantivy">Tantivy에</a> 의해 구동되는 Milvus의 분석기는 컬렉션 스키마에 <code translate="no">VARCHAR</code> 필드를 추가할 때 컬렉션 생성 중에 구성됩니다. 분석기가 생성한 토큰은 텍스트 매칭을 위한 인덱스를 구축하는 데 사용하거나 전체 텍스트 검색을 위해 스파스 임베딩으로 변환할 수 있습니다. 자세한 내용은 <a href="/docs/ko/keyword-match.md">텍스트 일치</a> 또는 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색을</a> 참조하세요.</p>
<div class="alert note">
<p>분석기를 사용하면 성능에 영향을 미칠 수 있습니다.</p>
<ul>
<li><p><strong>전체 텍스트 검색:</strong> 전체 텍스트 검색의 경우, 토큰화가 완료될 때까지 기다려야 하기 때문에 DataNode 및 <strong>QueryNode</strong> 채널은 데이터를 더 느리게 소비합니다. 따라서 새로 수집된 데이터를 검색에 사용할 수 있게 되는 데 시간이 더 오래 걸립니다.</p></li>
<li><p><strong>텍스트 일치:</strong> 텍스트 매칭의 경우, 인덱스를 구축하기 전에 토큰화가 완료되어야 하므로 인덱스 생성도 더 느려집니다.</p></li>
</ul>
</div>
<h2 id="Anatomy-of-an-analyzer​" class="common-anchor-header">분석기의 구조<button data-href="#Anatomy-of-an-analyzer​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus의 분석기는 정확히 하나의 <strong>토큰화기와</strong> <strong>0개 이상의</strong> 필터로 구성됩니다.</p>
<ul>
<li><p><strong>토큰화 도구</strong>: 토큰화기는 입력 텍스트를 토큰이라는 개별 단위로 분해합니다. 이러한 토큰은 토큰라이저 유형에 따라 단어 또는 구문일 수 있습니다.</p></li>
<li><p><strong>필터</strong>: 필터: 토큰에 필터를 적용하여 토큰을 소문자로 만들거나 일반적인 단어를 제거하는 등 토큰을 더욱 세분화할 수 있습니다.</p></li>
</ul>
<p>아래 워크플로에서는 분석기가 텍스트를 처리하는 방법을 보여줍니다.</p>
<p><img translate="no" src="/docs/v2.5.x/assets/analyzer-overview.png" alt="analyzer-overview" width="400"/></p>
<h2 id="Analyzer-types​" class="common-anchor-header">분석기 유형<button data-href="#Analyzer-types​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 서로 다른 텍스트 처리 요구 사항을 충족하기 위해 두 가지 유형의 분석기를 제공합니다.</p>
<ul>
<li><p><strong>내장 분석기</strong>: 최소한의 설정으로 일반적인 텍스트 처리 작업을 처리하는 사전 정의된 구성입니다. 기본 제공 분석기는 복잡한 구성이 필요하지 않으므로 범용 검색에 이상적입니다.</p></li>
<li><p><strong>사용자 정의 분석기</strong>: 보다 고급 요구 사항이 필요한 경우, 사용자 정의 분석기를 사용하면 토큰화 도구와 0개 이상의 필터를 모두 지정하여 자신만의 구성을 정의할 수 있습니다. 이 수준의 사용자 지정은 텍스트 처리에 대한 정밀한 제어가 필요한 특수한 사용 사례에 특히 유용합니다.</p></li>
</ul>
<div class="alert note">
<p>수집 생성 중에 분석기 구성을 생략하는 경우, Milvus는 기본적으로 모든 텍스트 처리에 <code translate="no">standard</code> 분석기를 사용합니다. 자세한 내용은 <a href="/docs/ko/standard-analyzer.md">표준을</a> 참조하세요.</p>
</div>
<h3 id="Built-in-analyzer​" class="common-anchor-header">기본 제공 분석기</h3><p>Milvus의 기본 제공 분석기는 특정 토큰화기 및 필터로 미리 구성되어 있으므로 이러한 구성 요소를 직접 정의할 필요 없이 즉시 사용할 수 있습니다. 각 기본 제공 분석기는 사전 설정된 토큰화 도구와 필터가 포함된 템플릿 역할을 하며, 사용자 지정을 위한 선택적 매개변수를 제공합니다.</p>
<p>예를 들어 <code translate="no">standard</code> 기본 제공 분석기를 사용하려면 <code translate="no">standard</code> 이름을 <code translate="no">type</code> 로 지정하고 선택적으로 이 분석기 유형에 특정한 추가 구성(예: <code translate="no">stop_words</code>)을 포함하면 됩니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Uses the standard built-in analyzer​</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment"># Defines a list of common words (stop words) to exclude from tokenization​</span>
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;stop_words&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Uses the standard built-in analyzer</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment">// Defines a list of common words (stop words) to exclude from tokenization</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>위의 <code translate="no">standard</code> 기본 제공 분석기의 구성은 다음 매개 변수를 사용하여 사용자 정의 분석기를 설정하는 것과 동일하며, <code translate="no">tokenizer</code> 및 <code translate="no">filter</code> 옵션은 동일한 기능을 달성하기 위해 명시적으로 정의됩니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>,​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,​
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]​
        }​
    ]​
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;filter&quot;</span>,
        <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;lowercase&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt;() {{
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;stop_words&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
                }}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]
        }
    ]
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;filter&quot;:  [
       &quot;lowercase&quot;,
       {
            &quot;type&quot;: &quot;stop&quot;,
            &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
       }
   ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus는 다음과 같은 내장 분석기를 제공하며, 각 분석기는 <code translate="no">type</code> 파라미터로 이름을 지정하여 직접 사용할 수 있습니다.</p>
<ul>
<li><p><code translate="no">standard</code>: 표준 토큰화 및 소문자 필터링을 적용하는 범용 텍스트 처리에 적합합니다.</p></li>
<li><p><code translate="no">english</code>: 영어 중단어를 지원하여 영어 텍스트에 최적화되어 있습니다.</p></li>
<li><p><code translate="no">chinese</code>: 중국어 구조에 맞는 토큰화 등 중국어 텍스트 처리에 특화되어 있습니다.</p></li>
</ul>
<h3 id="Custom-analyzer​" class="common-anchor-header">사용자 지정 분석기</h3><p>보다 고급 텍스트 처리를 위해 Milvus의 사용자 지정 분석기를 사용하면 <strong>토큰화기와</strong> 필터를 모두 지정하여 맞춤형 텍스트 처리 파이프라인을 구축할 수 있습니다. 이 설정은 정밀한 제어가 필요한 특수한 사용 사례에 이상적입니다.</p>
<h4 id="Tokenizer​" class="common-anchor-header">토큰화 도구</h4><p><strong>토큰화</strong> 도구는 사용자 정의 분석기의 <strong>필수</strong> 구성 요소로, 입력 텍스트를 개별 단위 또는 <strong>토큰으로</strong> 분해하여 분석기 파이프라인을 시작합니다. 토큰화는 토큰화 유형에 따라 공백이나 구두점으로 분할하는 등의 특정 규칙을 따릅니다. 이 프로세스를 통해 각 단어나 구를 보다 정확하고 독립적으로 처리할 수 있습니다.</p>
<p>예를 들어, 토큰화 도구는 <code translate="no">&quot;Vector Database Built for Scale&quot;</code> 텍스트를 별도의 토큰으로 변환합니다.</p>
<pre><code translate="no" class="language-Plain Text">[<span class="hljs-string">&quot;Vector&quot;</span>, <span class="hljs-string">&quot;Database&quot;</span>, <span class="hljs-string">&quot;Built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;Scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
<p><strong>토큰화기 지정 예시</strong>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;whitespace&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;whitespace&quot;
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filter​" class="common-anchor-header">필터</h4><p><strong>필터는</strong> 토큰화 도구가 생성한 토큰에 대해 필요에 따라 토큰을 변형하거나 정제하는 <strong>선택적</strong> 구성 요소입니다. 예를 들어, 토큰화된 용어 <code translate="no">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]</code> 에 <code translate="no">lowercase</code> 필터를 적용하면 다음과 같은 결과가 나올 수 있습니다.</p>
<pre><code translate="no">[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;database&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
<p>사용자 정의 분석기의 필터는 구성 요구 사항에 따라 <strong>기본 제공</strong> 또는 <strong>사용자 정의가</strong> 가능합니다.</p>
<ul>
<li><p><strong>기본 제공 필터</strong>: Milvus에서 미리 구성한 것으로, 최소한의 설정만 필요합니다. 이러한 필터는 이름을 지정하여 바로 사용할 수 있습니다. 아래 필터는 바로 사용할 수 있는 기본 제공 필터입니다.</p>
<ul>
<li><p><code translate="no">lowercase</code>: 텍스트를 소문자로 변환하여 대소문자를 구분하지 않는 매칭을 보장합니다. 자세한 내용은 <a href="/docs/ko/lowercase-filter.md">소문자를</a> 참조하세요.</p></li>
<li><p><code translate="no">asciifolding</code>: ASCII가 아닌 문자를 ASCII에 해당하는 문자로 변환하여 다국어 텍스트 처리를 간소화합니다. 자세한 내용은 <a href="/docs/ko/ascii-folding-filter.md">ASCII 접기를</a> 참조하세요.</p></li>
<li><p><code translate="no">alphanumonly</code>: 다른 문자를 제거하여 영숫자 문자만 유지합니다. 자세한 내용은 <a href="/docs/ko/alphanumonly-filter.md">영숫자만을</a> 참조하세요.</p></li>
<li><p><code translate="no">cnalphanumonly</code>: 한자, 영문자 또는 숫자 이외의 문자가 포함된 토큰을 제거합니다. 자세한 내용은 <a href="/docs/ko/cnalphanumonly-filter.md">영숫자만을</a> 참조하십시오.</p></li>
<li><p><code translate="no">cncharonly</code>: 한자 이외의 문자가 포함된 토큰을 제거합니다. 자세한 내용은 <a href="/docs/ko/cncharonly-filter.md">Cncharonly를</a> 참조하세요.</p></li>
</ul>
<p><strong>기본 제공 필터 사용 예제입니다</strong>:</p>
<p><div class="multipleCode">
<a href="#python">파이썬 </a><a href="#java">자바</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer​</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment"># Optional: Built-in filter that converts text to lowercase​</span>
}​
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-string">&quot;lowercase&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment">// Optional: Built-in filter that converts text to lowercase</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
   &quot;type&quot;: &quot;standard&quot;,
   &quot;filter&quot;:  [&quot;lowercase&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>사용자 정의 필터</strong>: 사용자 정의 필터를 사용하면 특수한 구성을 할 수 있습니다. 유효한 필터 유형(<code translate="no">filter.type</code>)을 선택하고 각 필터 유형에 대한 특정 설정을 추가하여 사용자 정의 필터를 정의할 수 있습니다. 사용자 지정을 지원하는 필터 유형의 예는 다음과 같습니다.</p>
<ul>
<li><p><code translate="no">stop</code>: 중지 단어 목록을 설정하여 지정된 일반 단어를 제거합니다(예: <code translate="no">&quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]</code>). 자세한 내용은 <a href="/docs/ko/stop-filter.md">중지를</a> 참조하세요.</p></li>
<li><p><code translate="no">length</code>: 최대 토큰 길이를 설정하는 등 길이 기준에 따라 토큰을 제외합니다. 자세한 내용은 <a href="/docs/ko/length-filter.md">길이를</a> 참조하세요.</p></li>
<li><p><code translate="no">stemmer</code>: 보다 유연한 매칭을 위해 단어를 어근 형태로 줄입니다. 자세한 내용은 <a href="/docs/ko/stemmer-filter.md">어간을</a> 참조하세요.</p></li>
</ul>
<p><strong>사용자 정의 필터 구성 예제</strong>:</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer​</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies &#x27;stop&#x27; as the filter type​</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment"># Customizes stop words for this filter type​</span>
        }​
    ]​
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;filter&quot;</span>,
    <span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt;() {{
        <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
        <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;stop_words&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
    }}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">const analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, // Mandatory: Specifies tokenizer
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, // Specifies <span class="hljs-string">&#x27;stop&#x27;</span> <span class="hljs-keyword">as</span> the <span class="hljs-built_in">filter</span> <span class="hljs-built_in">type</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], // Customizes stop words <span class="hljs-keyword">for</span> this <span class="hljs-built_in">filter</span> <span class="hljs-built_in">type</span>
        }
    ]
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
    &quot;type&quot;: &quot;standard&quot;,
    &quot;filter&quot;:  [
    {
            &quot;type&quot;: &quot;stop&quot;,
            &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
    }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Example-use​" class="common-anchor-header">사용 예<button data-href="#Example-use​" class="anchor-icon" translate="no">
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
    </button></h2><p>이 예에서는 임베딩을 위한 벡터 필드와 텍스트 처리 기능을 위한 두 개의 <code translate="no">VARCHAR</code> 필드가 있는 컬렉션 스키마를 정의합니다. 각 <code translate="no">VARCHAR</code> 필드는 서로 다른 처리 요구 사항을 처리하기 위해 자체 분석기 설정으로 구성됩니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
<span class="hljs-comment"># Set up a Milvus client​</span>
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
)​
​
<span class="hljs-comment"># Create schema​</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
<span class="hljs-comment"># Add fields to schema​</span>
​
<span class="hljs-comment"># Use a built-in analyzer​</span>
analyzer_params_built_in = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
<span class="hljs-comment"># Add VARCHAR field `title_en`​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;title_en&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params_built_in,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​
​
<span class="hljs-comment"># Configure a custom analyzer​</span>
analyzer_params_custom = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-comment"># Built-in filter​</span>
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-comment"># Custom filter​</span>
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>​
        },​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Custom filter​</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]​
        }​
    ]​
}​
​
<span class="hljs-comment"># Add VARCHAR field `title`​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;title&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params_custom,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​
​
<span class="hljs-comment"># Add vector field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)​
<span class="hljs-comment"># Add primary field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
​
<span class="hljs-comment"># Set up index params for vector field​</span>
index_params = client.prepare_index_params()​
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>)​
​
<span class="hljs-comment"># Create collection with defined schema​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">client</span>.<span class="hljs-property">ConnectConfig</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">client</span>.<span class="hljs-property">MilvusClientV2</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">DataType</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">collection</span>.<span class="hljs-property">request</span>.<span class="hljs-property">AddFieldReq</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">collection</span>.<span class="hljs-property">request</span>.<span class="hljs-property">CreateCollectionReq</span>;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-title class_">ConnectConfig</span> config = <span class="hljs-title class_">ConnectConfig</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_">build</span>();
<span class="hljs-title class_">MilvusClientV2</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-comment">// Create schema</span>
<span class="hljs-title class_">CreateCollectionReq</span>.<span class="hljs-property">CollectionSchema</span> schema = <span class="hljs-title class_">CreateCollectionReq</span>.<span class="hljs-property">CollectionSchema</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">enableDynamicField</span>(<span class="hljs-literal">false</span>)
        .<span class="hljs-title function_">build</span>();

<span class="hljs-comment">// Add fields to schema</span>
<span class="hljs-comment">// Use a built-in analyzer</span>
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParamsBuiltin = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParamsBuiltin.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
<span class="hljs-comment">// Add VARCHAR field `title_en`</span>
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;title_en&quot;</span>)
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">1000</span>)
        .<span class="hljs-title function_">enableAnalyzer</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">analyzerParams</span>(analyzerParamsBuiltin)
        .<span class="hljs-title function_">enableMatch</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">build</span>());

<span class="hljs-comment">// Configure a custom analyzer</span>
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;filter&quot;</span>,
        <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;lowercase&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt;() {{
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;length&quot;</span>);
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;max&quot;</span>, <span class="hljs-number">40</span>);
                }},
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt;() {{
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;stop_words&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
                }}
        )
);
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;title&quot;</span>)
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">1000</span>)
        .<span class="hljs-title function_">enableAnalyzer</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">analyzerParams</span>(analyzerParams)
        .<span class="hljs-title function_">enableMatch</span>(<span class="hljs-literal">true</span>) <span class="hljs-comment">// must enable this if you use TextMatch</span>
        .<span class="hljs-title function_">build</span>());

<span class="hljs-comment">// Add vector field</span>
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>)
        .<span class="hljs-title function_">dimension</span>(<span class="hljs-number">3</span>)
        .<span class="hljs-title function_">build</span>());
<span class="hljs-comment">// Add primary field</span>
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;id&quot;</span>)
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>)
        .<span class="hljs-title function_">isPrimaryKey</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">autoID</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">build</span>());

<span class="hljs-comment">// Set up index params for vector field</span>
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>)
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">COSINE</span>)
        .<span class="hljs-title function_">build</span>());

<span class="hljs-comment">// Create collection with defined schema</span>
<span class="hljs-title class_">CreateCollectionReq</span> requestCreate = <span class="hljs-title class_">CreateCollectionReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)
        .<span class="hljs-title function_">collectionSchema</span>(schema)
        .<span class="hljs-title function_">indexParams</span>(indexes)
        .<span class="hljs-title function_">build</span>();
client.<span class="hljs-title function_">createCollection</span>(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { MilvusClient, DataType } from <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-built_in">new</span> MilvusClient(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);
<span class="hljs-comment">// Use a built-in analyzer for VARCHAR field `title_en`</span>
<span class="hljs-keyword">const</span> analyzerParamsBuiltIn = {
  <span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;english&quot;</span>,
};

<span class="hljs-comment">// Configure a custom analyzer for VARCHAR field `title`</span>
<span class="hljs-keyword">const</span> analyzerParamsCustom = {
  tokenizer: <span class="hljs-string">&quot;standard&quot;</span>,
  filter: [
    <span class="hljs-string">&quot;lowercase&quot;</span>,
    {
      <span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;length&quot;</span>,
      max: <span class="hljs-number">40</span>,
    },
    {
      <span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;stop&quot;</span>,
      stop_words: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>],
    },
  ],
};

<span class="hljs-comment">// Create schema</span>
<span class="hljs-keyword">const</span> schema = {
  auto_id: <span class="hljs-literal">true</span>,
  fields: [
    {
      name: <span class="hljs-string">&quot;id&quot;</span>,
      <span class="hljs-keyword">type</span>: DataType.INT64,
      is_primary: <span class="hljs-literal">true</span>,
    },
    {
      name: <span class="hljs-string">&quot;title_en&quot;</span>,
      data_type: DataType.VARCHAR,
      max_length: <span class="hljs-number">1000</span>,
      enable_analyzer: <span class="hljs-literal">true</span>,
      analyzer_params: analyzerParamsBuiltIn,
      enable_match: <span class="hljs-literal">true</span>,
    },
    {
      name: <span class="hljs-string">&quot;title&quot;</span>,
      data_type: DataType.VARCHAR,
      max_length: <span class="hljs-number">1000</span>,
      enable_analyzer: <span class="hljs-literal">true</span>,
      analyzer_params: analyzerParamsCustom,
      enable_match: <span class="hljs-literal">true</span>,
    },
    {
      name: <span class="hljs-string">&quot;embedding&quot;</span>,
      data_type: DataType.FLOAT_VECTOR,
      dim: <span class="hljs-number">4</span>,
    },
  ],
};

<span class="hljs-comment">// Set up index params for vector field</span>
<span class="hljs-keyword">const</span> indexParams = [
  {
    name: <span class="hljs-string">&quot;embedding&quot;</span>,
    metric_type: <span class="hljs-string">&quot;COSINE&quot;</span>,
    index_type: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  },
];

<span class="hljs-comment">// Create collection with defined schema</span>
await client.createCollection({
  collection_name: <span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,
  schema: schema,
  index_params: indexParams,
});

console.log(<span class="hljs-string">&quot;Collection created successfully!&quot;</span>);

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;title_en&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true,
                    &quot;analyzer_params&quot;: {&quot;type&quot;: &quot;english&quot;}
                }
            },
            {
                &quot;fieldName&quot;: &quot;title&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true,
                    &quot;analyzer_params&quot;: {
                        &quot;tokenizer&quot;: &quot;standard&quot;,
                        &quot;filter&quot;:[
                            &quot;lowercase&quot;,
                            {
                                &quot;type&quot;:&quot;length&quot;,
                                &quot;max&quot;:40
                            },
                            {
                                &quot;type&quot;:&quot;stop&quot;,
                                &quot;stop_words&quot;:[&quot;of&quot;,&quot;to&quot;]
                            }
                        ]
                    }
                }
            },
            {
                &quot;fieldName&quot;: &quot;embedding&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;:3
                }
            }
        ]
    }&#x27;</span>
    
<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;YOUR_COLLECTION_NAME\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
