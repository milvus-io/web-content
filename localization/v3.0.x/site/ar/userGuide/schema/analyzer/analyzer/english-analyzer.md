---
id: english-analyzer.md
title: الإنجليزية
summary: >-
  صُمم محلل اللغة الإنجليزية في Milvus لمعالجة النصوص الإنجليزية، مع تطبيق
  القواعد الخاصة باللغة في عمليات التقطيع والتصفية.
---
<h1 id="English" class="common-anchor-header">الإنجليزية<button data-href="#English" class="anchor-icon" translate="no">
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
    </button></h1><p>تم تصميم محلل « <code translate="no">english</code> » في Milvus لمعالجة النصوص باللغة الإنجليزية، مع تطبيق قواعد خاصة باللغة فيما يتعلق بتجزئة النص إلى وحدات وتصفيته.</p>
<h2 id="Definition" class="common-anchor-header">التعريف<button data-href="#Definition" class="anchor-icon" translate="no">
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
    </button></h2><p>يستخدم محلل « <code translate="no">english</code> » المكونات التالية:</p>
<ul>
<li><p><strong>أداة التقطيع</strong>: تستخدم أداة <a href="/docs/ar/standard-tokenizer.md">التقطيع «<code translate="no">standard</code> »</a> لتقسيم النص إلى وحدات كلمات منفصلة.</p></li>
<li><p><strong>مرشحات</strong>: تتضمن مرشحات متعددة لمعالجة النص بشكل شامل:</p>
<ul>
<li><p><a href="/docs/ar/lowercase-filter.md"><code translate="no">lowercase</code></a>: يحول جميع الرموز إلى أحرف صغيرة، مما يتيح إجراء عمليات بحث لا تراعي تمييز الأحرف الكبيرة والصغيرة.</p></li>
<li><p><a href="/docs/ar/stemmer-filter.md"><code translate="no">stemmer</code></a>: يختزل الكلمات إلى صيغتها الجذرية لدعم مطابقة أوسع نطاقًا (على سبيل المثال، تتحول كلمة «running» إلى «run»).</p></li>
<li><p><a href="/docs/ar/stop-filter.md"><code translate="no">stop_words</code></a>: يزيل الكلمات الممنوعة الشائعة في اللغة الإنجليزية للتركيز على المصطلحات الرئيسية في النص.</p></li>
</ul></li>
</ul>
<p>تتطابق وظائف محلل « <code translate="no">english</code> » مع التكوين التالي للمحلل المخصص:</p>
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
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_english_&quot;</span>]
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Arrays.asList(<span class="hljs-string">&quot;lowercase&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stemmer&quot;</span>);
                    put(<span class="hljs-string">&quot;language&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
                }},
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    put(<span class="hljs-string">&quot;stop_words&quot;</span>, Collections.singletonList(<span class="hljs-string">&quot;_english_&quot;</span>));
                }}
        )
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
            <span class="hljs-string">&quot;type&quot;</span>:     <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
        }, <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
            <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;_english_&quot;</span>},
        }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span> },
        { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_english_&quot;</span>] }
    ]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>},
    {<span class="hljs-string">&quot;filter&quot;</span>, {
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stemmer&quot;</span>}, {<span class="hljs-string">&quot;language&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}},
        {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>}, {<span class="hljs-string">&quot;stop_words&quot;</span>, {<span class="hljs-string">&quot;_english_&quot;</span>}}}
    }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span> },
        { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_english_&quot;</span>] }
    ]
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System.Collections.Generic;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span>,
    [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">object</span>[]
    {
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;stemmer&quot;</span>,
            [<span class="hljs-string">&quot;language&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span>
        },
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;stop&quot;</span>,
            [<span class="hljs-string">&quot;stop_words&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;_english_&quot;</span> }
        }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;standard&quot;,
  &quot;filter&quot;: [
    &quot;lowercase&quot;,
    {
      &quot;type&quot;: &quot;stemmer&quot;,
      &quot;language&quot;: &quot;english&quot;
    },
    {
      &quot;type&quot;: &quot;stop&quot;,
      &quot;stop_words&quot;: [
        &quot;_english_&quot;
      ]
    }
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>لتطبيق محلل « <code translate="no">english</code> » على حقل ما، ما عليك سوى تعيين « <code translate="no">type</code> » إلى « <code translate="no">english</code> » في « <code translate="no">analyzer_params</code> »، وإدراج المعلمات الاختيارية حسب الحاجة.</p>
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
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;type&quot;: &quot;english&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>يقبل محلل <code translate="no">english</code> المعلمات الاختيارية التالية:</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">stop_words</code></p></td>
     <td><p>مصفوفة تحتوي على قائمة بالكلمات الممنوعة، والتي سيتم إزالتها من عملية التقطيع إلى رموز. القيمة الافتراضية هي <code translate="no">_english_</code> ، وهي مجموعة مدمجة من الكلمات الممنوعة الشائعة في اللغة الإنجليزية.</p></td>
   </tr>
</table>
<p>مثال على التكوين باستخدام كلمات التوقف المخصصة:</p>
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
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>},
    {<span class="hljs-string">&quot;stop_words&quot;</span>, {<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>}}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>]
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span>,
    [<span class="hljs-string">&quot;stop_words&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span> }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;type&quot;: &quot;english&quot;,
  &quot;stop_words&quot;: [
    &quot;a&quot;,
    &quot;an&quot;,
    &quot;the&quot;
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد تعريف <code translate="no">analyzer_params</code> ، يمكنك تطبيقها على حقل <code translate="no">VARCHAR</code> عند تعريف مخطط المجموعة. يتيح ذلك لـ Milvus معالجة النص في هذا الحقل باستخدام أداة التحليل المحددة من أجل التقطيع والتصفية بكفاءة. لمزيد من التفاصيل، راجع <a href="/docs/ar/analyzer-overview.md#Example-use">مثال الاستخدام</a>.</p>
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
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-comment"># Uses the default `_english_` stop-word list</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-comment">// Uses the default `_english_` stop-word list</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span> <span class="hljs-comment">// Uses the default `_english_` stop-word list</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;type&quot;: &quot;english&quot;
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
sample_text = <span class="hljs-string">&quot;Milvus is a vector database built for scale!&quot;</span>

<span class="hljs-comment"># Run the english analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;English analyzer output:&quot;</span>, result)
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
texts.add(<span class="hljs-string">&quot;Milvus is a vector database built for scale!&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();

<span class="hljs-keyword">for</span> (RunAnalyzerResp.AnalyzerResult result : results) {
    <span class="hljs-keyword">for</span> (RunAnalyzerResp.AnalyzerToken token : result.getTokens()) {
        System.out.println(<span class="hljs-string">&quot;English analyzer output: &quot;</span> + token.getToken());
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

texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Milvus is a vector database built for scale!&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, r := <span class="hljs-keyword">range</span> result {
    <span class="hljs-keyword">for</span> _, token := <span class="hljs-keyword">range</span> r.Tokens {
        fmt.Println(<span class="hljs-string">&quot;English analyzer output:&quot;</span>, token.Text)
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">run_analyzer</span>(
        RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">texts</span>([<span class="hljs-string">&quot;Milvus is a vector database built for scale!&quot;</span>])
            .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">for</span> <span class="hljs-variable">result</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>() {
    <span class="hljs-keyword">for</span> <span class="hljs-variable">token</span> <span class="hljs-keyword">in</span> result.<span class="hljs-title function_ invoke__">get_tokens</span>() {
        <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;English analyzer output: {}&quot;</span>, token.<span class="hljs-title function_ invoke__">get_text</span>());
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

std::string text = <span class="hljs-string">&quot;Milvus is a vector database built for scale!&quot;</span>;
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
        std::cout &lt;&lt; <span class="hljs-string">&quot;English analyzer output: &quot;</span> &lt;&lt; token.token_ &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>,
});

<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&#x27;Milvus is a vector database built for scale!&#x27;</span>;
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">text</span>: sample_text,
  analyzer_params,
});
<span class="hljs-keyword">const</span> tokens = result.<span class="hljs-property">results</span>.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.<span class="hljs-property">tokens</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">token</span>));
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;English analyzer output:&#x27;</span>, tokens);
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
<span class="hljs-keyword">var</span> sampleText = <span class="hljs-string">&quot;Milvus is a vector database built for scale!&quot;</span>;

<span class="hljs-comment">// Run the english analyzer with the defined configuration</span>
RunAnalyzerResp result = <span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { sampleText }
});

<span class="hljs-keyword">foreach</span> (AnalyzerResult r <span class="hljs-keyword">in</span> result.Results)
{
    <span class="hljs-keyword">foreach</span> (AnalyzerToken t <span class="hljs-keyword">in</span> r.Tokens)
    {
        Console.WriteLine(<span class="hljs-string">$&quot;English analyzer output: <span class="hljs-subst">{t.Token}</span>&quot;</span>);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;type\&quot;: \&quot;english\&quot;}&quot;,
    &quot;text&quot;: [&quot;Milvus is a vector database built for scale!&quot;]
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
    </button></h3><p>بالنسبة للنص النموذجي، يُنتج المحلل الرموز التالية بالترتيب. تختلف كائنات استجابة SDK وتنسيق العرض المطبوع باختلاف اللغة؛ وتحتوي استجابة REST على هذه الرموز على الرابط <code translate="no">data.results[].tokens[].token</code>.</p>
<pre><code translate="no" class="language-plaintext">[&#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;databas&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
