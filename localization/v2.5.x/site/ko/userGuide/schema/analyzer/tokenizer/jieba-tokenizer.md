---
id: jieba-tokenizer.md
title: Jieba
summary: jieba 토큰화기는 중국어 텍스트를 구성 단어로 분해하여 처리합니다.
---
<h1 id="Jieba" class="common-anchor-header">Jieba<button data-href="#Jieba" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">jieba</code> 토큰화 도구는 중국어 텍스트를 구성 단어로 분해하여 처리합니다.</p>
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
    </button></h2><p>Milvus는 <code translate="no">jieba</code> 토큰화기에 대해 단순 구성과 사용자 지정 구성의 두 가지 구성 방식을 지원합니다.</p>
<h3 id="Simple-configuration" class="common-anchor-header">간단한 구성</h3><p>단순 구성을 사용하면 토큰화기를 <code translate="no">&quot;jieba&quot;</code> 로 설정하기만 하면 됩니다. 예를 들어</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Simple configuration: only specifying the tokenizer name</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,  <span class="hljs-comment"># Use the default settings: dict=[&quot;_default_&quot;], mode=&quot;search&quot;, hmm=true</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;jieba&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 간단한 구성은 다음 사용자 지정 구성과 동일합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Custom configuration equivalent to the simple configuration above</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,          <span class="hljs-comment"># Tokenizer type, fixed as &quot;jieba&quot;</span>
    <span class="hljs-string">&quot;dict&quot;</span>: [<span class="hljs-string">&quot;_default_&quot;</span>],     <span class="hljs-comment"># Use the default dictionary</span>
    <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;search&quot;</span>,          <span class="hljs-comment"># Use search mode for improved recall (see mode details below)</span>
    <span class="hljs-string">&quot;hmm&quot;</span>: true                <span class="hljs-comment"># Enable HMM for probabilistic segmentation</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>매개변수에 대한 자세한 내용은 <a href="/docs/ko/jieba-tokenizer.md#Custom-configuration">사용자 지정 구성을</a> 참조하세요.</p>
<h3 id="Custom-configuration" class="common-anchor-header">사용자 지정 구성</h3><p>더 많은 제어를 위해 사용자 지정 사전을 지정하고, 세분화 모드를 선택하고, 숨겨진 마르코프 모델(HMM)을 활성화 또는 비활성화할 수 있는 사용자 지정 구성을 제공할 수 있습니다. 예를 들어</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Custom configuration with user-defined settings</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,           <span class="hljs-comment"># Fixed tokenizer type</span>
        <span class="hljs-string">&quot;dict&quot;</span>: [<span class="hljs-string">&quot;customDictionary&quot;</span>],  <span class="hljs-comment"># Custom dictionary list; replace with your own terms</span>
        <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;exact&quot;</span>,           <span class="hljs-comment"># Use exact mode (non-overlapping tokens)</span>
        <span class="hljs-string">&quot;hmm&quot;</span>: false               <span class="hljs-comment"># Disable HMM; unmatched text will be split into individual characters</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>기본값</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">type</code></p></td>
     <td><p>토큰화기의 유형입니다. <code translate="no">"jieba"</code> 로 고정되어 있습니다.</p></td>
     <td><p><code translate="no">"jieba"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dict</code></p></td>
     <td><p>어휘를 정의하는 데 사용되는 사전 목록입니다. 자체 사전 단어를 제공하거나 <code translate="no">"_default_"</code> 을 사용하여 기본 사전과 결합할 수 있습니다. 예를 들어 <code translate="no">["_default_", "结巴分词器"]</code>.</p></td>
     <td><p><code translate="no">["_default_"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mode</code></p></td>
     <td><p>세분화 모드. 사용 가능한 값</p><ul><li><p><code translate="no">"exact"</code>: 가장 정확한 방식으로 문장을 세분화하여 텍스트 분석에 이상적입니다.</p></li><li><p><code translate="no">"search"</code>: 정확한 모드를 기반으로 긴 단어를 더 세분화하여 기억력을 향상시켜 검색 엔진 토큰화에 적합합니다.</p><p>자세한 내용은 <a href="https://github.com/fxsjy/jieba">Jieba 깃허브 프로젝트를</a> 참조하세요.</p></li></ul></td>
     <td><p><code translate="no">"search"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">hmm</code></p></td>
     <td><p>사전에서 찾을 수 없는 단어의 확률적 세분화를 위해 숨겨진 마르코프 모델(HMM)을 활성화할지 여부를 나타내는 부울 플래그입니다.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
</table>
<p><code translate="no">analyzer_params</code> 을 정의한 후 컬렉션 스키마를 정의할 때 <code translate="no">VARCHAR</code> 필드에 적용할 수 있습니다. 이렇게 하면 Milvus가 지정된 분석기를 사용하여 해당 필드의 텍스트를 처리하여 효율적인 토큰화 및 필터링을 수행할 수 있습니다. 자세한 내용은 <a href="/docs/ko/analyzer-overview.md#Example-use">사용 예시를</a> 참조하세요.</p>
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
    </button></h2><p>분석기 구성을 컬렉션 스키마에 적용하기 전에 <code translate="no">run_analyzer</code> 메서드를 사용하여 그 동작을 확인하세요.</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">분석기 구성</h3><div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: [<span class="hljs-string">&quot;结巴分词器&quot;</span>],
        <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;exact&quot;</span>,
        <span class="hljs-string">&quot;hmm&quot;</span>: <span class="hljs-literal">False</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">예상 출력</h3><pre><code translate="no" class="language-python">[<span class="hljs-string">&#x27;milvus&#x27;</span>, <span class="hljs-string">&#x27;结巴分词器&#x27;</span>, <span class="hljs-string">&#x27;中&#x27;</span>, <span class="hljs-string">&#x27;文&#x27;</span>, <span class="hljs-string">&#x27;测&#x27;</span>, <span class="hljs-string">&#x27;试&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
