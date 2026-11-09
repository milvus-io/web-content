---
id: jieba-tokenizer.md
title: Jieba
summary: jieba 토큰화기는 중국어 텍스트를 구성하는 단어 단위로 분해하여 처리합니다.
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
    </button></h1><p><code translate="no">jieba</code> 토큰화기는 중국어 텍스트를 구성하는 단어 단위로 분해하여 처리합니다.</p>
<div class="alert note">
<p><code translate="no">jieba</code> 토큰화기는 구두점을 출력에서 별도의 토큰으로 유지합니다. 예를 들어, <code translate="no">&quot;你好！世界。&quot;</code> 는 <code translate="no">[&quot;你好&quot;, &quot;！&quot;, &quot;世界&quot;, &quot;。&quot;]</code> 가 됩니다. 이러한 독립된 구두점 토큰을 제거하려면 <a href="/docs/ko/removepunct-filter.md"><code translate="no">removepunct</code></a> 필터를 사용하십시오.</p>
</div>
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
    </button></h2><p>Milvus는 ` <code translate="no">jieba</code> ` 토큰화기에 대해 간단한 구성과 사용자 정의 구성, 두 가지 구성 방식을 지원합니다.</p>
<h3 id="Simple-configuration" class="common-anchor-header">간단한 구성<button data-href="#Simple-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>간단한 구성의 경우, 토큰화기를 <code translate="no">&quot;jieba&quot;</code> 로 설정하기만 하면 됩니다. 예를 들어:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Simple configuration: only specifying the tokenizer name</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,  <span class="hljs-comment"># Use the default settings: dict=[&quot;_default_&quot;], mode=&quot;search&quot;, hmm=True</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Simple configuration: only specifying the tokenizer name</span>
<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span> <span class="hljs-comment">// Use the default settings: dict=[&quot;_default_&quot;], mode=&quot;search&quot;, hmm=True</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;jieba&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 간단한 구성은 다음의 사용자 정의 구성과 동일합니다:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Custom configuration equivalent to the simple configuration above</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {                 <span class="hljs-comment"># Tokenizer configuration</span>
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,           <span class="hljs-comment"># Tokenizer type, fixed as &quot;jieba&quot;</span>
        <span class="hljs-string">&quot;dict&quot;</span>: [<span class="hljs-string">&quot;_default_&quot;</span>],     <span class="hljs-comment"># Use the default dictionary</span>
        <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;search&quot;</span>,          <span class="hljs-comment"># Use search mode for improved recall (see mode details below)</span>
        <span class="hljs-string">&quot;hmm&quot;</span>: <span class="hljs-literal">True</span>                <span class="hljs-comment"># Enable HMM for probabilistic segmentation</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
  put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
  put(<span class="hljs-string">&quot;dict&quot;</span>, Collections.singletonList(<span class="hljs-string">&quot;_default_&quot;</span>));
  put(<span class="hljs-string">&quot;mode&quot;</span>, <span class="hljs-string">&quot;search&quot;</span>);
  put(<span class="hljs-string">&quot;hmm&quot;</span>, <span class="hljs-literal">true</span>);
}});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
  <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;dict&quot;</span>: []any{<span class="hljs-string">&quot;_default_&quot;</span>},
    <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;search&quot;</span>,
    <span class="hljs-string">&quot;hmm&quot;</span>:  <span class="hljs-literal">true</span>,
  },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: [<span class="hljs-string">&quot;_default_&quot;</span>],
        <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;search&quot;</span>,
        <span class="hljs-string">&quot;hmm&quot;</span>: <span class="hljs-literal">true</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>},
        {<span class="hljs-string">&quot;dict&quot;</span>, {<span class="hljs-string">&quot;_default_&quot;</span>}},
        {<span class="hljs-string">&quot;mode&quot;</span>, <span class="hljs-string">&quot;search&quot;</span>},
        {<span class="hljs-string">&quot;hmm&quot;</span>, <span class="hljs-literal">true</span>}
    }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-attr">dict</span>: [<span class="hljs-string">&quot;_default_&quot;</span>],
    <span class="hljs-attr">mode</span>: <span class="hljs-string">&quot;search&quot;</span>,
    <span class="hljs-attr">hmm</span>: <span class="hljs-literal">true</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Custom configuration equivalent to the simple configuration above</span>
<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Tokenizer configuration</span>
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>,               <span class="hljs-comment">// Tokenizer type, fixed as &quot;jieba&quot;</span>
        [<span class="hljs-string">&quot;dict&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;_default_&quot;</span> }, <span class="hljs-comment">// Use the default dictionary</span>
        [<span class="hljs-string">&quot;mode&quot;</span>] = <span class="hljs-string">&quot;search&quot;</span>,              <span class="hljs-comment">// Use search mode for improved recall (see mode details below)</span>
        [<span class="hljs-string">&quot;hmm&quot;</span>] = <span class="hljs-literal">true</span>                    <span class="hljs-comment">// Enable HMM for probabilistic segmentation</span>
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: {
    &quot;type&quot;: &quot;jieba&quot;,
    &quot;dict&quot;: [&quot;_default_&quot;],
    &quot;mode&quot;: &quot;search&quot;,
    &quot;hmm&quot;: true
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>매개변수에 대한 자세한 내용은 <a href="/docs/ko/jieba-tokenizer.md#Custom-configuration">‘사용자 지정 구성’을</a> 참조하십시오.</p>
<h3 id="Custom-configuration" class="common-anchor-header">사용자 지정 구성<button data-href="#Custom-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>더 세밀한 제어를 위해 사용자 지정 구성을 제공하여 사용자 지정 사전을 지정하고, 분할 모드를 선택하며, 숨겨진 마르코프 모델(HMM)을 활성화하거나 비활성화할 수 있습니다. 예를 들어:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Custom configuration with user-defined settings</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,           <span class="hljs-comment"># Fixed tokenizer type</span>
        <span class="hljs-string">&quot;dict&quot;</span>: [<span class="hljs-string">&quot;customDictionary&quot;</span>],  <span class="hljs-comment"># Custom dictionary list; replace with your own terms</span>
        <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;exact&quot;</span>,           <span class="hljs-comment"># Use exact mode (non-overlapping tokens)</span>
        <span class="hljs-string">&quot;hmm&quot;</span>: <span class="hljs-literal">False</span>               <span class="hljs-comment"># Disable HMM; unmatched text will be split into individual characters</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
  put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
  put(<span class="hljs-string">&quot;dict&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;customDictionary&quot;</span>));
  put(<span class="hljs-string">&quot;mode&quot;</span>, <span class="hljs-string">&quot;exact&quot;</span>);
  put(<span class="hljs-string">&quot;hmm&quot;</span>, <span class="hljs-literal">false</span>);
}});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
  <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
      <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
      <span class="hljs-string">&quot;dict&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;customDictionary&quot;</span>},
      <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;exact&quot;</span>,
      <span class="hljs-string">&quot;hmm&quot;</span>:  <span class="hljs-literal">false</span>,
  },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: [<span class="hljs-string">&quot;customDictionary&quot;</span>],
        <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;exact&quot;</span>,
        <span class="hljs-string">&quot;hmm&quot;</span>: <span class="hljs-literal">false</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
  {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
      {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>},
      {<span class="hljs-string">&quot;dict&quot;</span>, {<span class="hljs-string">&quot;customDictionary&quot;</span>}},
      {<span class="hljs-string">&quot;mode&quot;</span>, <span class="hljs-string">&quot;exact&quot;</span>},
      {<span class="hljs-string">&quot;hmm&quot;</span>, <span class="hljs-literal">false</span>}
  }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-attr">dict</span>: [<span class="hljs-string">&quot;customDictionary&quot;</span>],
    <span class="hljs-attr">mode</span>: <span class="hljs-string">&quot;exact&quot;</span>,
    <span class="hljs-attr">hmm</span>: <span class="hljs-literal">false</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Custom configuration with user-defined settings</span>
<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>,                  <span class="hljs-comment">// Fixed tokenizer type</span>
        [<span class="hljs-string">&quot;dict&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;customDictionary&quot;</span> }, <span class="hljs-comment">// Custom dictionary list; replace with your own terms</span>
        [<span class="hljs-string">&quot;mode&quot;</span>] = <span class="hljs-string">&quot;exact&quot;</span>,                  <span class="hljs-comment">// Use exact mode (non-overlapping tokens)</span>
        [<span class="hljs-string">&quot;hmm&quot;</span>] = <span class="hljs-literal">false</span>                      <span class="hljs-comment">// Disable HMM; unmatched text will be split into individual characters</span>
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: {
    &quot;type&quot;: &quot;jieba&quot;,
    &quot;dict&quot;: [&quot;customDictionary&quot;],
    &quot;mode&quot;: &quot;exact&quot;,
    &quot;hmm&quot;: false
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>매개변수</p></th>
     <th><p>설명</p></th>
     <th><p>기본값</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">type</code></p></td>
     <td><p>토큰화기의 유형입니다. 이 값은 ` <code translate="no">"jieba"</code>`로 고정되어 있습니다.</p></td>
     <td><p><code translate="no">"jieba"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dict</code></p></td>
     <td><p>분석기가 어휘 소스로 로드할 사전 목록입니다. 내장 옵션:</p><ul><li><p><code translate="no">"_default_"</code>: 엔진의 내장 간체 중국어 사전을 불러옵니다. 자세한 내용은 <a href="https://github.com/messense/jieba-rs/blob/v0.6.8/src/data/dict.txt">dict.txt를</a> 참조하십시오.</p></li><li><p><code translate="no">"_extend_default_"</code>: <code translate="no">"_default_"</code> 에 포함된 모든 항목과 추가된 전통 중국어 보충 사전을 함께 불러옵니다. 자세한 내용은 <a href="https://github.com/milvus-io/milvus/blob/v2.5.11/internal/core/thirdparty/tantivy/tantivy-binding/src/analyzer/data/jieba/dict.txt.big">dict.txt.big을</a> 참조하십시오.</p><p>내장 사전을 원하는 수의 사용자 정의 사전과 혼합하여 사용할 수도 있습니다. 예: <code translate="no">["_default_", "结巴分词器"]</code>.</p></li></ul></td>
     <td><p><code translate="no">["_default_"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mode</code></p></td>
     <td><p>구분 모드. 가능한 값:</p><ul><li><p><code translate="no">"exact"</code>: 문장을 최대한 정확하게 분절하려고 시도하므로, 텍스트 분석에 이상적입니다.</p></li><li><p><code translate="no">"search"</code>: 정확한 모드를 기반으로 긴 단어를 더 세분화하여 재현율을 높이며, 검색 엔진 토큰화에 적합합니다.</p><p>자세한 내용은 <a href="https://github.com/fxsjy/jieba">Jieba GitHub 프로젝트를</a> 참조하십시오.</p></li></ul></td>
     <td><p><code translate="no">"search"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">hmm</code></p></td>
     <td><p>사전에 없는 단어의 확률적 분할을 위해 숨겨진 마르코프 모델(HMM)을 활성화할지 여부를 나타내는 부울 플래그입니다.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
</table>
<p><code translate="no">dict</code> 를 통해 사용자 정의 어휘를 인라인으로 포함하는 대신 외부 파일에서 대용량 사용자 정의 어휘를 불러오려면, 아래의 <a href="/docs/ko/jieba-tokenizer.md#Custom-configuration-with-a-dictionary-file">‘사전 파일을 사용한 사용자 정의 구성’을</a> 참조하십시오.</p>
<p><code translate="no">analyzer_params</code> 를 정의한 후에는 컬렉션 스키마를 정의할 때 ‘ <code translate="no">VARCHAR</code> ’ 필드에 이를 적용할 수 있습니다. 이를 통해 Milvus는 지정된 분석기를 사용하여 해당 필드의 텍스트를 처리함으로써 효율적인 토큰화 및 필터링을 수행할 수 있습니다. 자세한 내용은 <a href="/docs/ko/analyzer-overview.md#Example-use">‘사용 예’를</a> 참조하십시오.</p>
<!-- This section is published to both Cloud manuals, so the heading stays product-neutral. -->
### 사전 파일을 사용한 사용자 정의 구성
<p>대규모 사용자 정의 어휘(도메인 용어집, 제품 용어, 고유명사 목록 등)의 경우, 단어를 파일에 저장하고 해당 파일을 원격 파일 리소스로 등록한 다음, <code translate="no">extra_dict_file</code> 매개변수를 통해 토큰화기에서 이를 참조하십시오. 분석기는 내장 사전 위에 이러한 단어를 어휘에 로드합니다.</p>
<p>파일은 한 줄에 하나의 용어가 포함된 일반 UTF‑8 텍스트 형식이어야 합니다. 예:</p>
<pre><code translate="no" class="language-plaintext">结巴分词器
向量数据库
<button class="copy-code-btn"></button></code></pre>
<p>파일을 Milvus 클러스터가 사용하도록 구성된 오브젝트 스토어에 업로드한 다음, 등록하십시오:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Register the uploaded file under a name you&#x27;ll reference from analyzer configs.</span>
client.add_file_resource(
    name=<span class="hljs-string">&quot;zh_terms&quot;</span>,
    path=<span class="hljs-string">&quot;file/zh_terms.txt&quot;</span>,    <span class="hljs-comment"># full S3 object key, including the rootPath prefix</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.AddFileResourceReq;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

client.addFileResource(AddFileResourceReq.builder()
        .name(<span class="hljs-string">&quot;zh_terms&quot;</span>)
        .path(<span class="hljs-string">&quot;file/zh_terms.txt&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.AddFileResource(ctx, milvusclient.NewAddFileResourceOption(<span class="hljs-string">&quot;zh_terms&quot;</span>, <span class="hljs-string">&quot;file/zh_terms.txt&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

client.<span class="hljs-title function_ invoke__">add_file_resource</span>(AddFileResourceRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;zh_terms&quot;</span>)
    .<span class="hljs-title function_ invoke__">path</span>(<span class="hljs-string">&quot;file/zh_terms.txt&quot;</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::AddFileResourceRequest add_file_request;
add_file_request.<span class="hljs-built_in">WithName</span>(<span class="hljs-string">&quot;zh_terms&quot;</span>);
add_file_request.<span class="hljs-built_in">WithPath</span>(<span class="hljs-string">&quot;file/zh_terms.txt&quot;</span>);
status = client-&gt;<span class="hljs-built_in">AddFileResource</span>(add_file_request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addFileResource</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;zh_terms&quot;</span>,
  <span class="hljs-attr">path</span>: <span class="hljs-string">&quot;file/zh_terms.txt&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Register the uploaded file under a name you&#x27;ll reference from analyzer configs.</span>
<span class="hljs-keyword">await</span> client.AddFileResourceAsync(<span class="hljs-keyword">new</span> AddFileResourceReq
{
    Name = <span class="hljs-string">&quot;zh_terms&quot;</span>,
    Path = <span class="hljs-string">&quot;file/zh_terms.txt&quot;</span> <span class="hljs-comment">// full S3 object key, including the rootPath prefix</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/file_resources/add&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;name&quot;: &quot;zh_terms&quot;,
    &quot;path&quot;: &quot;file/zh_terms.txt&quot;
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">extra_dict_file</code> 를 통해 토큰화기에서 등록된 리소스를 참조합니다:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: [<span class="hljs-string">&quot;_default_&quot;</span>],             <span class="hljs-comment"># keep the built-in dictionary</span>
        <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;exact&quot;</span>,
        <span class="hljs-string">&quot;hmm&quot;</span>: <span class="hljs-literal">False</span>,
        <span class="hljs-string">&quot;extra_dict_file&quot;</span>: {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
            <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;zh_terms&quot;</span>,
            <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;zh_terms.txt&quot;</span>,
        },
    },
}

result = client.run_analyzer(<span class="hljs-string">&quot;milvus结巴分词器中文测试&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
  put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
  put(<span class="hljs-string">&quot;dict&quot;</span>, Collections.singletonList(<span class="hljs-string">&quot;_default_&quot;</span>));
  put(<span class="hljs-string">&quot;mode&quot;</span>, <span class="hljs-string">&quot;exact&quot;</span>);
  put(<span class="hljs-string">&quot;hmm&quot;</span>, <span class="hljs-literal">false</span>);
  put(<span class="hljs-string">&quot;extra_dict_file&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;remote&quot;</span>);
    put(<span class="hljs-string">&quot;resource_name&quot;</span>, <span class="hljs-string">&quot;zh_terms&quot;</span>);
    put(<span class="hljs-string">&quot;file_name&quot;</span>, <span class="hljs-string">&quot;zh_terms.txt&quot;</span>);
  }});
}});

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;milvus结巴分词器中文测试&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;milvus结巴分词器中文测试&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, r := <span class="hljs-keyword">range</span> result {
    <span class="hljs-keyword">for</span> _, token := <span class="hljs-keyword">range</span> r.Tokens {
        fmt.Println(<span class="hljs-string">&quot;Jieba analyzer output:&quot;</span>, token.Text)
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = serde_json::json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: [<span class="hljs-string">&quot;_default_&quot;</span>],
        <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;exact&quot;</span>,
        <span class="hljs-string">&quot;hmm&quot;</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-string">&quot;extra_dict_file&quot;</span>: {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
            <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;zh_terms&quot;</span>,
            <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;zh_terms.txt&quot;</span>
        }
    }
});

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>([<span class="hljs-string">&quot;milvus结巴分词器中文测试&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, response.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>},
        {<span class="hljs-string">&quot;dict&quot;</span>, {<span class="hljs-string">&quot;_default_&quot;</span>}},
        {<span class="hljs-string">&quot;mode&quot;</span>, <span class="hljs-string">&quot;exact&quot;</span>},
        {<span class="hljs-string">&quot;hmm&quot;</span>, <span class="hljs-literal">false</span>},
        {<span class="hljs-string">&quot;extra_dict_file&quot;</span>, {
            {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;remote&quot;</span>},
            {<span class="hljs-string">&quot;resource_name&quot;</span>, <span class="hljs-string">&quot;zh_terms&quot;</span>},
            {<span class="hljs-string">&quot;file_name&quot;</span>, <span class="hljs-string">&quot;zh_terms.txt&quot;</span>}
        }}
    }}
};

milvus::RunAnalyzerRequest request;
request.<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);
request.<span class="hljs-built_in">AddText</span>(<span class="hljs-string">&quot;milvus结巴分词器中文测试&quot;</span>);

milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-attr">dict</span>: [<span class="hljs-string">&quot;_default_&quot;</span>],
    <span class="hljs-attr">mode</span>: <span class="hljs-string">&quot;exact&quot;</span>,
    <span class="hljs-attr">hmm</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">extra_dict_file</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;remote&quot;</span>,
      <span class="hljs-attr">resource_name</span>: <span class="hljs-string">&quot;zh_terms&quot;</span>,
      <span class="hljs-attr">file_name</span>: <span class="hljs-string">&quot;zh_terms.txt&quot;</span>,
    },
  },
};

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;milvus结巴分词器中文测试&quot;</span>,
  analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(result.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>,
        [<span class="hljs-string">&quot;dict&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;_default_&quot;</span> }, <span class="hljs-comment">// keep the built-in dictionary</span>
        [<span class="hljs-string">&quot;mode&quot;</span>] = <span class="hljs-string">&quot;exact&quot;</span>,
        [<span class="hljs-string">&quot;hmm&quot;</span>] = <span class="hljs-literal">false</span>,
        [<span class="hljs-string">&quot;extra_dict_file&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;remote&quot;</span>,
            [<span class="hljs-string">&quot;resource_name&quot;</span>] = <span class="hljs-string">&quot;zh_terms&quot;</span>,
            [<span class="hljs-string">&quot;file_name&quot;</span>] = <span class="hljs-string">&quot;zh_terms.txt&quot;</span>
        }
    }
};

<span class="hljs-keyword">var</span> result = <span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;milvus结巴分词器中文测试&quot;</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;text&quot;: [&quot;milvus结巴分词器中文测试&quot;],
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;jieba\&quot;,\&quot;dict\&quot;:[\&quot;_default_\&quot;],\&quot;mode\&quot;:\&quot;exact\&quot;,\&quot;hmm\&quot;:false,\&quot;extra_dict_file\&quot;:{\&quot;type\&quot;:\&quot;remote\&quot;,\&quot;resource_name\&quot;:\&quot;zh_terms\&quot;,\&quot;file_name\&quot;:\&quot;zh_terms.txt\&quot;}}}&quot;
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">extra_dict_file</code> 매개변수는 다음 필드를 가진 객체를 받아들입니다:</p>
<table>
   <tr>
     <th><p>필드</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">type</code></p></td>
     <td><p>리소스 유형입니다. <code translate="no">add_file_resource</code> 를 통해 등록된 파일의 경우 <code translate="no">"remote"</code> 를 사용하십시오. 자체 호스팅 배포에서 사용되는 <code translate="no">"local"</code> 변형에 대해서는 <a href="/docs/ko/manage-file-resources.md">‘파일 리소스 관리’를</a> 참조하십시오.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">resource_name</code></p></td>
     <td><p><code translate="no">add_file_resource</code> 에 파일을 등록할 때 사용된 이름입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">file_name</code></p></td>
     <td><p>등록된 리소스의 오브젝트 스토어 경로 중 파일 이름 부분(예: 리소스가 <code translate="no">path="file/zh_terms.txt"</code> 에 등록된 경우 <code translate="no">"zh_terms.txt"</code> ).</p></td>
   </tr>
</table>
<p><code translate="no">extra_dict_file</code> 를 통해 추가된 단어는 내장 사전에 병합되므로, jieba의 분절 알고리즘은 이를 기존 항목과 함께 인식합니다. 특정 용어가 독립된 토큰으로 나타나는지는 jieba의 확률 가중 DAG 선택에 따라 달라집니다. <code translate="no">向量数据库</code> 와 같은 긴 사용자 정의 용어도, <code translate="no">向量</code> 와 <code translate="no">数据库</code> 와 같은 더 짧은 항목이 내장 사전에서 더 높은 빈도를 보인다면 여전히 이 두 단어로 분할될 수 있습니다.</p>
<h2 id="Examples" class="common-anchor-header">예시<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>분석기 구성을 컬렉션 스키마에 적용하기 전에, ` <code translate="no">run_analyzer</code> ` 메서드를 사용하여 동작을 확인해 보십시오.</p>
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: [<span class="hljs-string">&quot;结巴分词器&quot;</span>],
        <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;exact&quot;</span>,
        <span class="hljs-string">&quot;hmm&quot;</span>: <span class="hljs-literal">False</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
  put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
  put(<span class="hljs-string">&quot;dict&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;结巴分词器&quot;</span>));
  put(<span class="hljs-string">&quot;mode&quot;</span>, <span class="hljs-string">&quot;exact&quot;</span>);
  put(<span class="hljs-string">&quot;hmm&quot;</span>, <span class="hljs-literal">false</span>);
}});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
  <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
      <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
      <span class="hljs-string">&quot;dict&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;结巴分词器&quot;</span>},
      <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;exact&quot;</span>,
      <span class="hljs-string">&quot;hmm&quot;</span>:  <span class="hljs-literal">false</span>,
  },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: [<span class="hljs-string">&quot;结巴分词器&quot;</span>],
        <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;exact&quot;</span>,
        <span class="hljs-string">&quot;hmm&quot;</span>: <span class="hljs-literal">false</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
  {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
      {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>},
      {<span class="hljs-string">&quot;dict&quot;</span>, {<span class="hljs-string">&quot;结巴分词器&quot;</span>}},
      {<span class="hljs-string">&quot;mode&quot;</span>, <span class="hljs-string">&quot;exact&quot;</span>},
      {<span class="hljs-string">&quot;hmm&quot;</span>, <span class="hljs-literal">false</span>}
  }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-attr">dict</span>: [<span class="hljs-string">&quot;结巴分词器&quot;</span>],
    <span class="hljs-attr">mode</span>: <span class="hljs-string">&quot;exact&quot;</span>,
    <span class="hljs-attr">hmm</span>: <span class="hljs-literal">false</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>,
        [<span class="hljs-string">&quot;dict&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;结巴分词器&quot;</span> },
        [<span class="hljs-string">&quot;mode&quot;</span>] = <span class="hljs-string">&quot;exact&quot;</span>,
        [<span class="hljs-string">&quot;hmm&quot;</span>] = <span class="hljs-literal">false</span>
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: {
    &quot;type&quot;: &quot;jieba&quot;,
    &quot;dict&quot;: [&quot;结巴分词器&quot;],
    &quot;mode&quot;: &quot;exact&quot;,
    &quot;hmm&quot;: false
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer" class="common-anchor-header">다음 언어를 사용한 검증 <code translate="no">run_analyzer</code><button data-href="#Verification-using-runanalyzer" class="anchor-icon" translate="no">
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
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
)

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;milvus结巴分词器中文测试&quot;</span>

<span class="hljs-comment"># Run the jieba tokenizer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Jieba analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.*;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;milvus结巴分词器中文测试&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();

<span class="hljs-keyword">for</span> (RunAnalyzerResp.AnalyzerResult result : results) {
    <span class="hljs-keyword">for</span> (RunAnalyzerResp.AnalyzerToken token : result.getTokens()) {
        System.out.println(<span class="hljs-string">&quot;Jieba analyzer output: &quot;</span> + token.getToken());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;milvus结巴分词器中文测试&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, r := <span class="hljs-keyword">range</span> result {
    <span class="hljs-keyword">for</span> _, token := <span class="hljs-keyword">range</span> r.Tokens {
        fmt.Println(<span class="hljs-string">&quot;Jieba analyzer output:&quot;</span>, token.Text)
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">run_analyzer</span>(
        RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">texts</span>([<span class="hljs-string">&quot;milvus结巴分词器中文测试&quot;</span>])
            .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">for</span> <span class="hljs-variable">result</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>() {
    <span class="hljs-keyword">for</span> <span class="hljs-variable">token</span> <span class="hljs-keyword">in</span> result.<span class="hljs-title function_ invoke__">get_tokens</span>() {
        <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;Jieba analyzer output: {}&quot;</span>, token.<span class="hljs-title function_ invoke__">get_text</span>());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

std::string text = <span class="hljs-string">&quot;milvus结巴分词器中文测试&quot;</span>;
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">RunAnalyzerRequest</span>()
                       .<span class="hljs-built_in">AddText</span>(text)
                       .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);

milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : response.<span class="hljs-built_in">Results</span>()) {
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; token : result.<span class="hljs-built_in">Tokens</span>()) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;Jieba analyzer output: &quot;</span> &lt;&lt; token.token_ &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>,
});

<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&#x27;milvus结巴分词器中文测试&#x27;</span>;
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">text</span>: sample_text,
  analyzer_params,
});
<span class="hljs-keyword">const</span> tokens = result.<span class="hljs-property">results</span>.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.<span class="hljs-property">tokens</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">token</span>));
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Jieba analyzer output:&#x27;</span>, tokens);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Sample text to analyze</span>
<span class="hljs-keyword">var</span> sampleText = <span class="hljs-string">&quot;milvus结巴分词器中文测试&quot;</span>;

<span class="hljs-comment">// Run the jieba tokenizer with the defined configuration</span>
RunAnalyzerResp result = <span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { sampleText }
});

<span class="hljs-keyword">foreach</span> (AnalyzerResult r <span class="hljs-keyword">in</span> result.Results)
{
    <span class="hljs-keyword">foreach</span> (AnalyzerToken t <span class="hljs-keyword">in</span> r.Tokens)
    {
        Console.WriteLine(<span class="hljs-string">$&quot;Jieba analyzer output: <span class="hljs-subst">{t.Token}</span>&quot;</span>);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;text&quot;: [&quot;milvus结巴分词器中文测试&quot;],
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;jieba\&quot;,\&quot;dict\&quot;:[\&quot;结巴分词器\&quot;],\&quot;mode\&quot;:\&quot;exact\&quot;,\&quot;hmm\&quot;:false}}&quot;
  }&#x27;</span>
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
    </button></h3><p>샘플 텍스트에 대해 분석기는 다음과 같은 토큰을 순서대로 생성합니다. SDK 응답 객체와 출력 형식은 언어에 따라 다르며, REST 응답에는 <code translate="no">data.results[].tokens[].token</code> 에서 이러한 토큰이 포함되어 있습니다.</p>
<pre><code translate="no" class="language-plaintext">[&#x27;milvus&#x27;, &#x27;结巴分词器&#x27;, &#x27;中&#x27;, &#x27;文&#x27;, &#x27;测&#x27;, &#x27;试&#x27;]
<button class="copy-code-btn"></button></code></pre>
