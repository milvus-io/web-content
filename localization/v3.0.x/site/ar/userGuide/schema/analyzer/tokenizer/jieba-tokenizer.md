---
id: jieba-tokenizer.md
title: Jieba
summary: >-
  يقوم مُجزِّئ النص «جييبا» بمعالجة النص الصيني عن طريق تقسيمه إلى الكلمات
  المكونة له.
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
    </button></h1><p>يقوم أداة تحليل النص الصينية ( <code translate="no">jieba</code> ) بمعالجة النص الصيني عن طريق تقسيمه إلى الكلمات المكونة له.</p>
<div class="alert note">
<p>يحافظ مُجزئ النص « <code translate="no">jieba</code> » على علامات الترقيم كوحدات منفصلة في الناتج. على سبيل المثال، يتحول النص « <code translate="no">&quot;你好！世界。&quot;</code> » إلى « <code translate="no">[&quot;你好&quot;, &quot;！&quot;, &quot;世界&quot;, &quot;。&quot;]</code> ». لإزالة وحدات علامات الترقيم المستقلة هذه، استخدم مرشح <a href="/docs/ar/removepunct-filter.md"><code translate="no">removepunct</code></a> المرشح.</p>
</div>
<h2 id="Configuration" class="common-anchor-header">التكوين<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم Milvus طريقتين للتكوين لمُجزئ « <code translate="no">jieba</code> »: التكوين البسيط والتكوين المخصص.</p>
<h3 id="Simple-configuration" class="common-anchor-header">التكوين البسيط<button data-href="#Simple-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>في التكوين البسيط، ما عليك سوى تعيين أداة التقطيع إلى <code translate="no">&quot;jieba&quot;</code>. على سبيل المثال:</p>
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
<p>هذا التكوين البسيط يعادل التكوين المخصص التالي:</p>
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
<p>للحصول على تفاصيل حول المعلمات، راجع <a href="/docs/ar/jieba-tokenizer.md#Custom-configuration">«التكوين المخصص</a>».</p>
<h3 id="Custom-configuration" class="common-anchor-header">التكوين المخصص<button data-href="#Custom-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>لمزيد من التحكم، يمكنك توفير تكوين مخصص يتيح لك تحديد قاموس مخصص، واختيار وضع التجزئة، وتمكين أو تعطيل نموذج ماركوف المخفي (HMM). على سبيل المثال:</p>
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
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>القيمة الافتراضية</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">type</code></p></td>
     <td><p>نوع أداة التقطيع. هذه القيمة ثابتة وهي <code translate="no">"jieba"</code>.</p></td>
     <td><p><code translate="no">"jieba"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dict</code></p></td>
     <td><p>قائمة بالقواميس التي سيقوم المحلل بتحميلها كمصدر لمفرداته. الخيارات المدمجة:</p><ul><li><p><code translate="no">"_default_"</code>: يقوم بتحميل قاموس اللغة الصينية المبسطة المدمج في المحرك. لمزيد من التفاصيل، راجع ملف <a href="https://github.com/messense/jieba-rs/blob/v0.6.8/src/data/dict.txt">dict.txt</a>.</p></li><li><p><code translate="no">"_extend_default_"</code>: يقوم بتحميل كل ما في <code translate="no">"_default_"</code> بالإضافة إلى ملحق إضافي للصينية التقليدية. لمزيد من التفاصيل، راجع ملف <a href="https://github.com/milvus-io/milvus/blob/v2.5.11/internal/core/thirdparty/tantivy/tantivy-binding/src/analyzer/data/jieba/dict.txt.big">dict.txt.big</a>.</p><p>يمكنك أيضًا مزج القاموس المدمج مع أي عدد من القواميس المخصصة. مثال: <code translate="no">["_default_", "结巴分词器"]</code>.</p></li></ul></td>
     <td><p><code translate="no">["_default_"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mode</code></p></td>
     <td><p>وضع التجزئة. القيم الممكنة:</p><ul><li><p><code translate="no">"exact"</code>: يحاول تقسيم الجملة بأدق طريقة ممكنة، مما يجعله مثاليًا لتحليل النصوص.</p></li><li><p><code translate="no">"search"</code>: يعتمد على الوضع الدقيق من خلال تقسيم الكلمات الطويلة بشكل أكبر لتحسين الاسترجاع، مما يجعله مناسبًا لتقطيع الكلمات في محركات البحث.</p><p>لمزيد من المعلومات، راجع <a href="https://github.com/fxsjy/jieba">مشروع Jieba</a> على <a href="https://github.com/fxsjy/jieba">GitHub</a>.</p></li></ul></td>
     <td><p><code translate="no">"search"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">hmm</code></p></td>
     <td><p>علامة منطقية تشير إلى ما إذا كان سيتم تمكين نموذج ماركوف المخفي (HMM) للتجزئة الاحتمالية للكلمات غير الموجودة في القاموس.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
</table>
<p>لتحميل قاموس مخصص كبير من ملف خارجي بدلاً من تضمينه مباشرةً عبر <code translate="no">dict</code> ، انظر <a href="/docs/ar/jieba-tokenizer.md#Custom-configuration-with-a-dictionary-file">«التكوين المخصص باستخدام ملف قاموس»</a> أدناه.</p>
<p>بعد تعريف <code translate="no">analyzer_params</code> ، يمكنك تطبيقها على حقل <code translate="no">VARCHAR</code> عند تعريف مخطط المجموعة. وهذا يسمح لـ Milvus بمعالجة النص في ذلك الحقل باستخدام المحلل المحدد من أجل التقطيع إلى رموز والتصفية بكفاءة. لمزيد من التفاصيل، راجع <a href="/docs/ar/analyzer-overview.md#Example-use">«مثال على الاستخدام</a>».</p>
<!-- This section is published to both Cloud manuals, so the heading stays product-neutral. -->
### التكوين المخصص باستخدام ملف قاموس
<p>بالنسبة للمفردات المخصصة الكبيرة — مثل قوائم المصطلحات الخاصة بالمجال، أو مصطلحات المنتجات، أو قوائم الأسماء الخاصة — قم بتخزين الكلمات في ملف وتسجيل الملف كمورد ملف بعيد، ثم قم بالإشارة إليه من أداة التقطيع عبر المعلمة <code translate="no">extra_dict_file</code>. يقوم المحلل بتحميل هذه الكلمات إلى مفرداته بالإضافة إلى القاموس المدمج.</p>
<p>يكون الملف نصًا عاديًا بتنسيق UTF‑8، بحيث يحتوي كل سطر على مصطلح واحد. على سبيل المثال:</p>
<pre><code translate="no" class="language-plaintext">结巴分词器
向量数据库
<button class="copy-code-btn"></button></code></pre>
<p>قم بتحميل الملف إلى مخزن الكائنات الذي تم تكوين مجموعة Milvus الخاصة بك لاستخدامه، ثم قم بتسجيله:</p>
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
<p>يمكن الإشارة إلى المورد المسجل في أداة التقطيع عبر <code translate="no">extra_dict_file</code>:</p>
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
<p>يقبل المعلمة <code translate="no">extra_dict_file</code> كائنًا يحتوي على الحقول التالية:</p>
<table>
   <tr>
     <th><p>الحقل</p></th>
     <th><p>الوصف</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">type</code></p></td>
     <td><p>نوع المورد. استخدم <code translate="no">"remote"</code> للملف المسجل عبر <code translate="no">add_file_resource</code>. بالنسبة لمتغير <code translate="no">"local"</code> المستخدم في عمليات النشر ذاتية الاستضافة، راجع <a href="/docs/ar/manage-file-resources.md">إدارة موارد الملفات</a>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">resource_name</code></p></td>
     <td><p>الاسم المستخدم عند تسجيل الملف باستخدام <code translate="no">add_file_resource</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">file_name</code></p></td>
     <td><p>جزء اسم الملف من مسار مخزن الكائنات للمورد المسجل (على سبيل المثال، <code translate="no">"zh_terms.txt"</code> إذا تم تسجيل المورد عبر <code translate="no">path="file/zh_terms.txt"</code>).</p></td>
   </tr>
</table>
<p>يتم دمج الكلمات المضافة عبر <code translate="no">extra_dict_file</code> مع القاموس المدمج، بحيث تراها خوارزمية التجزئة في jieba جنبًا إلى جنب مع المدخلات الموجودة. ويعتمد ظهور أي مصطلح محدد كرمز مستقل على اختيار jieba لـ DAG المرجح احتماليًا — فقد يتم تقسيم مصطلح مخصص طويل مثل <code translate="no">向量数据库</code> إلى <code translate="no">向量</code> + <code translate="no">数据库</code> إذا كانت تلك المدخلات الأقصر ذات تكرارات أعلى في القاموس المدمج.</p>
<h2 id="Examples" class="common-anchor-header">أمثلة<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل تطبيق تكوين المحلل على مخطط المجموعة الخاص بك، تحقق من سلوكه باستخدام طريقة <code translate="no">run_analyzer</code>.</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">تكوين المحلل<button data-href="#Analyzer-configuration" class="anchor-icon" translate="no">
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
<h3 id="Verification-using-runanalyzer" class="common-anchor-header">التحقق باستخدام <code translate="no">run_analyzer</code><button data-href="#Verification-using-runanalyzer" class="anchor-icon" translate="no">
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
<h3 id="Expected-output" class="common-anchor-header">الناتج المتوقع<button data-href="#Expected-output" class="anchor-icon" translate="no">
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
    </button></h3><p>بالنسبة للنص النموذجي، يُنتج المحلل الرموز التالية بالترتيب. تختلف كائنات استجابة SDK وتنسيق العرض حسب اللغة؛ وتحتوي استجابة REST على هذه الرموز على الرابط <code translate="no">data.results[].tokens[].token</code>.</p>
<pre><code translate="no" class="language-plaintext">[&#x27;milvus&#x27;, &#x27;结巴分词器&#x27;, &#x27;中&#x27;, &#x27;文&#x27;, &#x27;测&#x27;, &#x27;试&#x27;]
<button class="copy-code-btn"></button></code></pre>
