---
id: analyzer-overview.md
title: 분석기 개요
summary: >-
  텍스트 처리에서 분석기(analyzer)는 원시 텍스트를 구조화되고 검색 가능한 형식으로 변환하는 핵심 구성 요소입니다. 각 분석기는
  일반적으로 토큰화기(tokenizer)와 필터(filter)라는 두 가지 핵심 요소로 구성됩니다. 이 두 요소는 함께 입력 텍스트를 토큰으로
  변환하고, 이러한 토큰을 정제하여 효율적인 색인 생성 및 검색이 가능하도록 준비합니다.
---
<h1 id="Analyzer-Overview" class="common-anchor-header">분석기 개요<button data-href="#Analyzer-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>텍스트 처리에서 <strong>분석기</strong> ( <strong>analyzer</strong> )는 원시 텍스트를 구조화되고 검색 가능한 형식으로 변환하는 핵심 구성 요소입니다. 각 분석기는 일반적으로 <strong>토큰화기(tokenizer)</strong> 와 <strong>필터(filter)</strong>라는 두 가지 핵심 요소로 구성됩니다. 이 두 요소는 함께 입력 텍스트를 토큰으로 변환하고, 토큰을 정제하며, 효율적인 색인 생성 및 검색을 위해 토큰을 준비합니다.</p>
<p>Milvus에서는 컬렉션 스키마에 ` <code translate="no">VARCHAR</code> ` 필드를 추가할 때 컬렉션 생성 과정에서 분석기를 구성합니다. 분석기가 생성한 토큰은 키워드 일치를 위한 인덱스를 구축하는 데 사용되거나, 전체 텍스트 검색을 위해 스파스 임베딩으로 변환될 수 있습니다. 자세한 내용은 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색</a>, <a href="/docs/ko/phrase-match.md">구문 일치</a> 또는 <a href="/docs/ko/keyword-match.md">텍스트 일치를</a> 참조하십시오.</p>
<div class="alert note">
<p>분석기를 사용하면 성능에 영향을 미칠 수 있습니다.</p>
<ul>
<li><p><strong>전체 텍스트 검색:</strong> 전체 텍스트 검색의 경우, <strong>DataNode</strong> 및 <strong>QueryNode</strong> 채널은 토큰화가 완료될 때까지 기다려야 하므로 데이터를 더 느리게 처리합니다. 그 결과, 새로 수집된 데이터가 검색에 사용 가능해지는 데 더 오랜 시간이 걸립니다.</p></li>
<li><p><strong>키워드 일치:</strong> 키워드 일치의 경우, 인덱스를 생성하기 전에 토큰화가 완료되어야 하므로 인덱스 생성 속도도 느려집니다.</p></li>
</ul>
</div>
<h2 id="Anatomy-of-an-analyzer" class="common-anchor-header">분석기의 구조<button data-href="#Anatomy-of-an-analyzer" class="anchor-icon" translate="no">
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
<li><p><strong>토큰화기</strong>(Tokenizer): 토큰화기는 입력 텍스트를 토큰이라고 하는 개별 단위로 분할합니다. 이러한 토큰은 토큰화기 유형에 따라 단어 또는 구가 될 수 있습니다.</p></li>
<li><p><strong>필터</strong>: 필터를 토큰에 적용하여 토큰을 더욱 정제할 수 있습니다(예: 소문자로 변환하거나 흔한 단어를 제거하는 등).</p></li>
</ul>
<div class="alert note">
<p>토큰화기는 UTF-8 형식만 지원합니다. 다른 형식에 대한 지원은 향후 릴리스에서 추가될 예정입니다.</p>
</div>
<p>아래 워크플로는 분석기가 텍스트를 처리하는 과정을 보여줍니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/analyzer-process-workflow.png" alt="Analyzer Process Workflow" class="doc-image" id="analyzer-process-workflow" /> 
   <span>분석기 처리 워크플로</span>
  
 </span></p>
<h2 id="Analyzer-types" class="common-anchor-header">분석기 유형<button data-href="#Analyzer-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 다양한 텍스트 처리 요구 사항을 충족하기 위해 두 가지 유형의 분석기를 제공합니다.</p>
<ul>
<li><p><strong>내장 분석기</strong>: 최소한의 설정만으로 일반적인 텍스트 처리 작업을 수행할 수 있도록 미리 정의된 구성입니다. 내장 분석기는 복잡한 구성이 필요하지 않으므로 범용 검색에 이상적입니다.</p></li>
<li><p><strong>사용자 정의 분석기</strong>: 보다 고급 요구 사항을 충족하기 위해, 사용자 정의 분석기를 사용하면 토큰화기(tokenizer)와 0개 이상의 필터를 지정하여 자체 구성을 정의할 수 있습니다. 이러한 수준의 사용자 정의는 텍스트 처리를 정밀하게 제어해야 하는 특수한 사용 사례에 특히 유용합니다.</p></li>
</ul>
<div class="alert note">
<ul>
<li>컬렉션 생성 시 분석기 구성을 생략하면, Milvus는 기본적으로 모든 텍스트 처리에 ‘ <code translate="no">standard</code> ’ 분석기를 사용합니다. 자세한 내용은 <a href="/docs/ko/standard-analyzer.md">표준 분석기를</a> 참조하십시오.</li>
<li>최적의 검색 및 쿼리 성능을 얻으려면 텍스트 데이터의 언어에 맞는 분석기를 선택하십시오. 예를 들어, ‘ <code translate="no">standard</code> ’ 분석기는 다목적으로 사용할 수 있지만, 중국어, 아랍어, 태국어, 일본어 또는 한국어와 같이 고유한 문법 구조를 가진 언어의 경우 최선의 선택이 아닐 수 있습니다. 이러한 경우에는 <a href="/docs/ko/chinese-analyzer.md"><code translate="no">chinese</code></a>, <a href="/docs/ko/arabic-analyzer.md"><code translate="no">arabic</code></a>, 또는 <a href="/docs/ko/thai-analyzer.md"><code translate="no">thai</code></a>, 또는 특수한 토큰화기를 갖춘 사용자 정의 분석기(예: <a href="/docs/ko/lindera-tokenizer.md"><code translate="no">lindera</code></a>, <a href="/docs/ko/icu-tokenizer.md"><code translate="no">icu</code></a>) 및 필터를 갖춘 사용자 정의 분석기를 사용하는 것이 정확한 토큰화와 더 나은 검색 결과를 보장하기 위해 적극 권장됩니다.</li>
</ul>
</div>
<h3 id="Built-in-analyzer" class="common-anchor-header">내장 분석기<button data-href="#Built-in-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus의 내장 분석기는 특정 토큰화기 및 필터가 미리 구성되어 있으므로, 이러한 구성 요소를 직접 정의할 필요 없이 즉시 사용할 수 있습니다. 각 내장 분석기는 사전 설정된 토큰화기와 필터를 포함하는 템플릿 역할을 하며, 사용자 지정을 위한 선택적 매개변수를 제공합니다.</p>
<p>예를 들어, ` <code translate="no">standard</code> ` 내장 분석기를 사용하려면 ` <code translate="no">type</code> `에 해당 이름 <code translate="no">standard</code> 을 지정하고, 선택적으로 ` <code translate="no">stop_words</code>`와 같이 이 분석기 유형에 특화된 추가 구성을 포함하면 됩니다:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Uses the standard built-in analyzer</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment"># Defines a list of common words (stop words) to exclude from tokenization</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Uses the standard built-in analyzer</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment">// Defines a list of common words (stop words) to exclude from tokenization</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>분석기의 실행 결과를 확인하려면 <code translate="no">run_analyzer</code> 메서드를 사용하십시오:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
text = <span class="hljs-string">&quot;An efficient system relies on a robust analyzer to correctly process text for various applications.&quot;</span>

<span class="hljs-comment"># Run analyzer</span>
result = client.run_analyzer(
    text,
    analyzer_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;An efficient system relies on a robust analyzer to correctly process text for various applications.&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascrip# Sample text to analyze</span>
<span class="hljs-keyword">const</span> text = <span class="hljs-string">&quot;An efficient system relies on a robust analyzer to correctly process text for various applications.&quot;</span>

<span class="hljs-comment">// Run analyzer</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">run_analyzer</span>({
    text,
    analyzer_params
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;encoding/json&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

bs, _ := json.Marshal(analyzerParams)
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;An efficient system relies on a robust analyzer to correctly process text for various applications.&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>출력 결과는 다음과 같습니다:</p>
<pre><code translate="no" class="language-plaintext">[&#x27;efficient&#x27;, &#x27;system&#x27;, &#x27;relies&#x27;, &#x27;on&#x27;, &#x27;robust&#x27;, &#x27;analyzer&#x27;, &#x27;to&#x27;, &#x27;correctly&#x27;, &#x27;process&#x27;, &#x27;text&#x27;, &#x27;various&#x27;, &#x27;applications&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p>이는 분석기가 중지어(stop words)인 <code translate="no">&quot;a&quot;</code>, <code translate="no">&quot;an&quot;</code>, <code translate="no">&quot;for&quot;</code> 를 걸러내고, 나머지 의미 있는 토큰을 반환함으로써 입력 텍스트를 올바르게 토큰화했음을 보여줍니다.</p>
<p>위의 <code translate="no">standard</code> 내장 분석기 구성은 다음 매개변수를 사용하여 <a href="/docs/ko/analyzer-overview.md#Custom-analyzer">사용자 정의 분석기를</a> 설정하는 것과 동일하며, 여기서 <code translate="no">tokenizer</code> 및 <code translate="no">filter</code> 옵션은 유사한 기능을 구현하기 위해 명시적으로 정의되었습니다:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Arrays.asList(<span class="hljs-string">&quot;lowercase&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
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
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;stop&quot;</span>,
        <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>},
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
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
<p>Milvus는 다음과 같은 내장 분석기를 제공하며, 각 분석기는 특정 텍스트 처리 요구 사항에 맞게 설계되었습니다:</p>
<ul>
<li><p><code translate="no">standard</code>: 범용 텍스트 처리에 적합하며, 표준 토큰화 및 소문자 필터링을 적용합니다.</p></li>
<li><p><code translate="no">english</code>: 영어 텍스트에 최적화되어 있으며, 영어 스톱워드를 지원합니다.</p></li>
<li><p><code translate="no">chinese</code>: 중국어 텍스트 처리에 특화되어 있으며, 중국어 언어 구조에 맞춘 토큰화를 포함합니다.</p></li>
<li><p><code translate="no">arabic</code>: 아랍어 텍스트 처리에 특화되어 있으며, 아랍어 정규화, 소수점 자릿수 정규화, 아랍어 어근 추출 및 아랍어 스톱워드 제거 기능을 제공합니다.</p></li>
<li><p><code translate="no">thai</code>: 태국어 텍스트 처리에 특화되어 있으며, 태국어 단어 분할, 소수점 숫자 정규화 및 태국어 스톱워드 제거 기능을 제공합니다.</p></li>
</ul>
<h3 id="Custom-analyzer" class="common-anchor-header">사용자 정의 분석기<button data-href="#Custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>보다 고급 텍스트 처리를 위해 Milvus의 사용자 정의 분석기를 사용하면 <strong>토큰화기와</strong> <strong>필터를</strong> 모두 지정하여 맞춤형 텍스트 처리 파이프라인을 구축할 수 있습니다. 이 설정은 정밀한 제어가 필요한 특수한 사용 사례에 이상적입니다.</p>
<h4 id="Tokenizer" class="common-anchor-header">토큰화기</h4><p><strong>토큰화기는</strong> 사용자 정의 분석기의 <strong>필수</strong> 구성 요소로, 입력 텍스트를 개별 단위 또는 <strong>토큰으로</strong> 분할하여 분석기 파이프라인을 시작합니다. 토큰화는 토큰화기 유형에 따라 공백이나 구두점에 의한 분할과 같은 특정 규칙을 따릅니다. 이 과정을 통해 각 단어나 구를 보다 정밀하고 독립적으로 처리할 수 있습니다.</p>
<p>예를 들어, 토큰화기는 “ <code translate="no">&quot;Vector Database Built for Scale&quot;</code> ”라는 텍스트를 다음과 같이 개별 토큰으로 변환합니다:</p>
<pre><code translate="no" class="language-plaintext">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]
<button class="copy-code-btn"></button></code></pre>
<p><strong>토큰화기 지정 예시</strong>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;whitespace&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;whitespace&quot;
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filter" class="common-anchor-header">필터</h4><p><strong>필터는</strong> 토큰화기가 생성한 토큰을 처리하여 필요에 따라 변환하거나 정제하는 <strong>선택적</strong> 구성 요소입니다. 예를 들어, 토큰화된 용어 ` <code translate="no">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]</code>`에 ` <code translate="no">lowercase</code> ` 필터를 적용하면 결과는 다음과 같을 수 있습니다:</p>
<pre><code translate="no" class="language-sql">[&quot;vector&quot;, &quot;database&quot;, &quot;built&quot;, &quot;for&quot;, &quot;scale&quot;]
<button class="copy-code-btn"></button></code></pre>
<p>사용자 정의 분석기의 필터는 구성 요구 사항에 따라 <strong>내장</strong> 필터이거나 <strong>사용자 정의</strong> 필터일 수 있습니다.</p>
<ul>
<li><p><strong>내장 필터</strong>: Milvus에서 미리 구성되어 있어 최소한의 설정만 필요합니다. 필터 이름을 지정하면 바로 사용할 수 있습니다. 다음 필터들은 바로 사용할 수 있도록 내장되어 있습니다:</p>
<ul>
<li><p><code translate="no">lowercase</code>: 텍스트를 소문자로 변환하여 대소문자를 구분하지 않는 일치 처리를 보장합니다. 자세한 내용은 <a href="/docs/ko/lowercase-filter.md">소문자 변환</a>을 참조하십시오.</p></li>
<li><p><code translate="no">asciifolding</code>: 비 ASCII 문자를 ASCII 등가 문자로 변환하여 다국어 텍스트 처리를 간소화합니다. 자세한 내용은 <a href="/docs/ko/ascii-folding-filter.md">ASCII 폴딩을</a> 참조하십시오.</p></li>
<li><p><code translate="no">alphanumonly</code>: 영숫자 외의 문자를 제거하여 영숫자만 남깁니다. 자세한 내용은 <a href="/docs/ko/alphanumonly-filter.md">Alphanumonly를</a> 참조하십시오.</p></li>
<li><p><code translate="no">cnalphanumonly</code>: 한자, 영어 알파벳 또는 숫자 이외의 문자가 포함된 토큰을 제거합니다. 자세한 내용은 <a href="/docs/ko/cnalphanumonly-filter.md">Cnalphanumonly를</a> 참조하십시오.</p></li>
<li><p><code translate="no">cncharonly</code>: 한자 이외의 문자가 포함된 토큰을 제거합니다. 자세한 내용은 <a href="/docs/ko/cncharonly-filter.md">Cncharonly를</a> 참조하십시오.</p></li>
<li><p><code translate="no">pinyin</code>: 중국어 토큰에 병음 토큰 형태를 추가하여, 중국어 텍스트에 대해 병음 기반 일치를 가능하게 합니다. 자세한 내용은 <a href="/docs/ko/pinyin-filter.md">‘병음</a>’을 참조하십시오.</p></li>
</ul>
<p><strong>내장 필터 사용 예시:</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#javascript">NodeJS</a>
<a href="#go">Go</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment"># Optional: Built-in filter that converts text to lowercase</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>, Collections.singletonList(<span class="hljs-string">&quot;lowercase&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment">// Optional: Built-in filter that converts text to lowercase</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-string">&quot;lowercase&quot;</span>}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;filter&quot;:  [&quot;lowercase&quot;]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>사용자 정의 필터</strong>: 사용자 정의 필터를 사용하면 특수한 구성이 가능합니다. 유효한 필터 유형(<code translate="no">filter.type</code>)을 선택하고 각 필터 유형에 대한 구체적인 설정을 추가하여 사용자 정의 필터를 정의할 수 있습니다. 사용자 정의를 지원하는 필터 유형의 예:</p>
<ul>
<li><p><code translate="no">stop</code>: 중지어(stop word) 목록을 설정하여 지정된 일반 단어를 제거합니다(예: <code translate="no">&quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]</code>). 자세한 내용은 <a href="/docs/ko/stop-filter.md">중지어(Stop</a>)를 참조하십시오.</p></li>
<li><p><code translate="no">length</code>: 최대 토큰 길이 설정과 같은 길이 기준에 따라 토큰을 제외합니다. 자세한 내용은 <a href="/docs/ko/length-filter.md">‘길이(Length</a>)’를 참조하십시오.</p></li>
<li><p><code translate="no">stemmer</code>: 보다 유연한 일치를 위해 단어를 어근 형태로 변환합니다. 자세한 내용은 <a href="/docs/ko/stemmer-filter.md">‘Stemmer’를</a> 참조하십시오.</p></li>
</ul>
<p><strong>사용자 정의 필터 구성 예시:</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#javascript">NodeJS</a>
<a href="#go">Go</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies &#x27;stop&#x27; as the filter type</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment"># Customizes stop words for this filter type</span>
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
            put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
        }}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment">// Specifies &#x27;stop&#x27; as the filter type</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment">// Customizes stop words for this filter type</span>
        }
    ]
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;stop&quot;</span>,
        <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>},
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
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
<h2 id="Example-use" class="common-anchor-header">사용 예시<button data-href="#Example-use" class="anchor-icon" translate="no">
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
    </button></h2><p>이 예제에서는 다음을 포함하는 컬렉션 스키마를 생성합니다:</p>
<ul>
<li><p>임베딩을 위한 벡터 필드.</p></li>
<li><p>텍스트 처리를 위한 두 개의 <code translate="no">VARCHAR</code> 필드:</p>
<ul>
<li><p>한 필드는 내장 분석기를 사용합니다.</p></li>
<li><p>다른 하나는 사용자 정의 분석기를 사용합니다.</p></li>
</ul></li>
</ul>
<p>이러한 구성을 컬렉션에 적용하기 전에, ` <code translate="no">run_analyzer</code> ` 메서드를 사용하여 각 분석기를 검증합니다.</p>
<h3 id="Step-1-Initialize-MilvusClient-and-create-schema" class="common-anchor-header">1단계: MilvusClient 초기화 및 스키마 생성<button data-href="#Step-1-Initialize-MilvusClient-and-create-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>먼저 Milvus 클라이언트를 설정하고 새 스키마를 생성합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Set up a Milvus client</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a new schema</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-comment">// Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">false</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)  

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema().WithAutoID(<span class="hljs-literal">true</span>).WithDynamicFieldEnabled(<span class="hljs-literal">false</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Define-and-verify-analyzer-configurations" class="common-anchor-header">2단계: 분석기 구성 정의 및 검증<button data-href="#Step-2-Define-and-verify-analyzer-configurations" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>내장 분석기(</strong><code translate="no">english</code><strong>)를 구성하고 검증합니다</strong><strong>:</strong></p>
<ul>
<li><p><strong>구성:</strong> 내장된 영어 분석기의 분석기 매개변수를 정의합니다.</p></li>
<li><p><strong>검증:</strong> <code translate="no">run_analyzer</code> 를 사용하여 해당 구성이 예상된 토큰화를 생성하는지 확인합니다.</p></li>
</ul>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#javascript">NodeJS</a>
<a href="#go">Go</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Built-in analyzer configuration for English text processing</span>
analyzer_params_built_in = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Verify built-in analyzer configuration</span>
sample_text = <span class="hljs-string">&quot;Milvus simplifies text analysis for search.&quot;</span>
result = client.run_analyzer(sample_text, analyzer_params_built_in)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Built-in analyzer output:&quot;</span>, result)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Built-in analyzer output: [&#x27;milvus&#x27;, &#x27;simplifi&#x27;, &#x27;text&#x27;, &#x27;analysi&#x27;, &#x27;search&#x27;]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParamsBuiltin = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParamsBuiltin.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;Milvus simplifies text ana

lysis for search.&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Use a built-in analyzer for VARCHAR field `title_en`</span>
<span class="hljs-keyword">const</span> analyzerParamsBuiltIn = {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span>,
};

<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;Milvus simplifies text analysis for search.&quot;</span>;
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">run_analyzer</span>({
    <span class="hljs-attr">text</span>: sample_text, 
    <span class="hljs-attr">analyzer_params</span>: analyzer_params_built_in
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>}

bs, _ := json.Marshal(analyzerParams)
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Milvus simplifies text analysis for search.&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>사용자 정의 분석기를 구성하고 검증합니다:</strong></p>
<ul>
<li><p><strong>구성:</strong> 표준 토큰화기와 내장 소문자 변환 필터, 토큰 길이 및 스톱 워드에 대한 사용자 정의 필터를 함께 사용하는 사용자 정의 분석기를 정의합니다.</p></li>
<li><p><strong>검증:</strong> <code translate="no">run_analyzer</code> 를 사용하여 사용자 정의 구성이 텍스트를 의도한 대로 처리하는지 확인합니다.</p></li>
</ul>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#javascript">NodeJS</a>
<a href="#go">Go</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Custom analyzer configuration with a standard tokenizer and custom filters</span>
analyzer_params_custom = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter: convert tokens to lowercase</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,  <span class="hljs-comment"># Custom filter: restrict token length</span>
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,  <span class="hljs-comment"># Custom filter: remove specified stop words</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># Verify custom analyzer configuration</span>
sample_text = <span class="hljs-string">&quot;Milvus provides flexible, customizable analyzers for robust text processing.&quot;</span>
result = client.run_analyzer(sample_text, analyzer_params_custom)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Custom analyzer output:&quot;</span>, result)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Custom analyzer output: [&#x27;milvus&#x27;, &#x27;provides&#x27;, &#x27;flexible&#x27;, &#x27;customizable&#x27;, &#x27;analyzers&#x27;, &#x27;robust&#x27;, &#x27;text&#x27;, &#x27;processing&#x27;]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Configure a custom analyzer</span>
Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Arrays.asList(<span class="hljs-string">&quot;lowercase&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;length&quot;</span>);
                    put(<span class="hljs-string">&quot;max&quot;</span>, <span class="hljs-number">40</span>);
                }},
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
                }}
        )
);

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;Milvus provides flexible, customizable analyzers for robust text processing.&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Configure a custom analyzer for VARCHAR field `title`</span>
<span class="hljs-keyword">const</span> analyzerParamsCustom = {
  <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span>,
  <span class="hljs-attr">filter</span>: [
    <span class="hljs-string">&quot;lowercase&quot;</span>,
    {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;length&quot;</span>,
      <span class="hljs-attr">max</span>: <span class="hljs-number">40</span>,
    },
    {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;stop&quot;</span>,
      <span class="hljs-attr">stop_words</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>],
    },
  ],
};
<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;Milvus provides flexible, customizable analyzers for robust text processing.&quot;</span>;
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">run_analyzer</span>({
    <span class="hljs-attr">text</span>: sample_text, 
    <span class="hljs-attr">analyzer_params</span>: analyzer_params_built_in
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-string">&quot;lowercase&quot;</span>, 
    <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
        <span class="hljs-string">&quot;max&quot;</span>:  <span class="hljs-number">40</span>,
    <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
        <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>},
    }}}
    
bs, _ := json.Marshal(analyzerParams)
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Milvus provides flexible, customizable analyzers for robust text processing.&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># curl</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Step-3-Add-fields-to-the-schema" class="common-anchor-header">3단계: 스키마에 필드 추가<button data-href="#Step-3-Add-fields-to-the-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>분석기 구성을 검증했으므로, 이제 스키마 필드에 이를 추가합니다:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add VARCHAR field &#x27;title_en&#x27; using the built-in analyzer configuration</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;title_en&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1000</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
    analyzer_params=analyzer_params_built_in,
    enable_match=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Add VARCHAR field &#x27;title&#x27; using the custom analyzer configuration</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;title&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1000</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
    analyzer_params=analyzer_params_custom,
    enable_match=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Add a vector field for embeddings</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)

<span class="hljs-comment"># Add a primary key field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .analyzerParams(analyzerParams)
        .enableMatch(<span class="hljs-literal">true</span>) <span class="hljs-comment">// must enable this if you use TextMatch</span>
        .build());

<span class="hljs-comment">// Add vector field</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">3</span>)
        .build());
<span class="hljs-comment">// Add primary field</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create schema</span>
<span class="hljs-keyword">const</span> schema = {
  <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">fields</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">INT64</span>,
      <span class="hljs-attr">is_primary</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title_en&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">analyzer_params</span>: analyzerParamsBuiltIn,
      <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">analyzer_params</span>: analyzerParamsCustom,
      <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FLOAT_VECTOR</span>,
      <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span>,
    },
  ],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;embedding&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">3</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">1000</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithAnalyzerParams(analyzerParams).
    WithEnableMatch(<span class="hljs-literal">true</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Prepare-index-parameters-and-create-the-collection" class="common-anchor-header">4단계: 인덱스 매개변수 준비 및 컬렉션 생성<button data-href="#Step-4-Prepare-index-parameters-and-create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up index parameters for the vector field</span>
index_params = client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>)

<span class="hljs-comment"># Create the collection with the defined schema and index parameters</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Set up index params for vector field</span>
List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());

<span class="hljs-comment">// Create collection with defined schema</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Set up index params for vector field</span>
<span class="hljs-keyword">const</span> indexParams = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  },
];

<span class="hljs-comment">// Create collection with defined schema</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">schema</span>: schema,
  <span class="hljs-attr">index_params</span>: indexParams,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Collection created successfully!&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">idx := index.NewAutoIndex(index.MetricType(entity.COSINE))
indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>, idx)

err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>애널라이저를 구성한 후에는 Milvus에서 제공하는 텍스트 검색 기능과 연동할 수 있습니다. 자세한 내용은 다음과 같습니다:</p>
<ul>
<li><p><a href="/docs/ko/full-text-search.md">전체 텍스트 검색</a></p></li>
<li><p><a href="/docs/ko/keyword-match.md">텍스트 일치</a></p></li>
<li><p><a href="/docs/ko/phrase-match.md">구문 일치</a></p></li>
</ul>
