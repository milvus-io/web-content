---
id: standard-tokenizer.md
title: الرمز المميز القياسي
summary: >-
  تقوم أداة الترميز "القياسية" في Milvus بتقسيم النص بناءً على المسافات وعلامات
  الترقيم، مما يجعلها مناسبة لمعظم اللغات.
---
<h1 id="Standard​" class="common-anchor-header">قياسي<button data-href="#Standard​" class="anchor-icon" translate="no">
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
    </button></h1><p>يقوم أداة ترميز <code translate="no">standard</code> في Milvus بتقسيم النص بناءً على المسافات وعلامات الترقيم، مما يجعله مناسبًا لمعظم اللغات.</p>
<h2 id="Configuration​" class="common-anchor-header">التكوين<button data-href="#Configuration​" class="anchor-icon" translate="no">
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
    </button></h2><p>لتكوين محلل باستخدام أداة الترميز <code translate="no">standard</code> ، قم بتعيين <code translate="no">tokenizer</code> إلى <code translate="no">standard</code> في <code translate="no">analyzer_params</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
}​

<button class="copy-code-btn"></button></code></pre>
<p>يمكن أن يعمل الرمز المميز <code translate="no">standard</code> مع واحد أو أكثر من المرشحات. على سبيل المثال، يُعرّف الرمز التالي محللاً يستخدم أداة الترميز <code translate="no">standard</code> ومرشح <code translate="no">lowercase</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>]​
}​

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>من أجل إعداد أبسط، يمكنك اختيار استخدام <a href="/docs/ar/standard-analyzer.md"><code translate="no">standard analyzer</code></a>الذي يجمع بين أداة الترميز <code translate="no">standard</code> مع أداة الترميز و <a href="/docs/ar/lowercase-filter.md"><code translate="no">lowercase filter</code></a>.</p>
</div>
<p>بعد تحديد <code translate="no">analyzer_params</code> ، يمكنك تطبيقها على حقل <code translate="no">VARCHAR</code> عند تحديد مخطط المجموعة. يسمح هذا لميلفوس بمعالجة النص في ذلك الحقل باستخدام المحلل المحدد لترميز وتصفية فعالة. لمزيد من التفاصيل، راجع <a href="/docs/ar/analyzer-overview.md#Example-use">مثال الاستخدام</a>.</p>
<h2 id="Example-output​" class="common-anchor-header">مثال على الإخراج<button data-href="#Example-output​" class="anchor-icon" translate="no">
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
    </button></h2><p>فيما يلي مثال على كيفية معالجة أداة الترميز <code translate="no">standard</code> للنص.</p>
<p><strong>النص الأصلي</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>الإخراج المتوقع</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;The&quot;</span>, <span class="hljs-string">&quot;Milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;database&quot;</span>, <span class="hljs-string">&quot;is&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
