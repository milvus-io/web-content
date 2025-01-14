---
id: standard-analyzer.md
title: محلل قياسي
related_key: 'standard, analyzer'
summary: >-
  المحلل "القياسي" هو المحلل الافتراضي في Milvus، والذي يتم تطبيقه تلقائيًا على
  حقول النصوص إذا لم يتم تحديد محلل. وهو يستخدم الترميز القائم على القواعد
  النحوية، مما يجعله فعالاً لمعظم اللغات.
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
    </button></h1><p>محلل <code translate="no">standard</code> هو المحلل الافتراضي في ميلفوس، والذي يتم تطبيقه تلقائيًا على حقول النص إذا لم يتم تحديد محلل. وهو يستخدم الترميز القائم على القواعد النحوية، مما يجعله فعالاً لمعظم اللغات.</p>
<h2 id="Definition​" class="common-anchor-header">التعريف<button data-href="#Definition​" class="anchor-icon" translate="no">
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
    </button></h2><p>يتكون محلل <code translate="no">standard</code> من.</p>
<ul>
<li><p><strong>أداة الترميز</strong>: يستخدم أداة الترميز <code translate="no">standard</code> لتقسيم النص إلى وحدات كلمات منفصلة بناءً على قواعد النحو. لمزيد من المعلومات، راجع <a href="/docs/ar/standard-tokenizer.md">المعيار</a>.</p></li>
<li><p><strong>عامل التصفية</strong>: يستخدم عامل التصفية <code translate="no">lowercase</code> لتحويل جميع الرموز إلى أحرف صغيرة، مما يتيح عمليات بحث غير حساسة لحالة الأحرف. لمزيد من المعلومات، راجع<a href="/docs/ar/lowercase-filter.md"><code translate="no">lowercase filter</code></a>.</p></li>
</ul>
<p>تكافئ وظيفة محلل <code translate="no">standard</code> تكوين المحلل المخصص التالي.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>لتطبيق محلل <code translate="no">standard</code> على أحد الحقول، ما عليك سوى تعيين <code translate="no">type</code> إلى <code translate="no">standard</code> في <code translate="no">analyzer_params</code> ، وتضمين معلمات اختيارية حسب الحاجة.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Specifies the standard analyzer type​</span>
}​
<button class="copy-code-btn"></button></code></pre>
<p>يقبل محلل <code translate="no">standard</code> المعلمات الاختيارية التالية: </p>
<table data-block-token="RYdmdh6LRoVtrVxY4RHcvUTxned"><thead><tr><th data-block-token="IbXLd0A89oY8rjxRXsccdHxmn6d" colspan="1" rowspan="1"><p data-block-token="Afe5dOJUIoIEhOxAPyqcUlqdnih">المعلمة</p>
</th><th data-block-token="LpTFdYXm6ox6Rgx5wAWciQjfnjn" colspan="1" rowspan="1"><p data-block-token="LR2QdjlzVoMv8ixoLDScpuhsnxb">الوصف</p>
</th></tr></thead><tbody><tr><td data-block-token="AJKvdnlG8oAp8exzFbocIvf9nGf" colspan="1" rowspan="1"><p data-block-token="EXV8djjJtoYolLxllxRcIivYnre"><code translate="no">stop_words</code></p>
</td><td data-block-token="KWkqdOBuRoPg39xtTqWcf5RQnbb" colspan="1" rowspan="1"><p data-block-token="R8HedE6qTo4UmlxpQaLcE8oNn0b">مصفوفة تحتوي على قائمة بكلمات التوقف، والتي ستتم إزالتها من الترميز. افتراضي إلى <code translate="no">_english_</code> ، وهي مجموعة مدمجة من كلمات التوقف الشائعة في اللغة الإنجليزية. يمكن الاطلاع على تفاصيل <code translate="no">_english_</code> <a href="https://github.com/milvus-io/milvus/blob/master/internal/core/thirdparty/tantivy/tantivy-binding/src/stop_words.rs">هنا</a>.</p>
</td></tr></tbody></table>
<p>مثال على تكوين كلمات التوقف المخصصة.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Specifies the standard analyzer type​</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>, [<span class="hljs-string">&quot;of&quot;</span>] <span class="hljs-comment"># Optional: List of words to exclude from tokenization​</span>
}​
<button class="copy-code-btn"></button></code></pre>
<p>بعد تحديد <code translate="no">analyzer_params</code> ، يمكنك تطبيقها على حقل <code translate="no">VARCHAR</code> عند تحديد مخطط المجموعة. يسمح هذا لميلفوس بمعالجة النص في هذا الحقل باستخدام المحلل المحدد من أجل ترميز وتصفية فعالة. لمزيد من المعلومات، راجع <a href="/docs/ar/analyzer-overview.md#">مثال الاستخدام</a>.</p>
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
    </button></h2><p>إليك كيفية معالجة محلل <code translate="no">standard</code> للنص.</p>
<p><strong>النص الأصلي</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>الناتج المتوقع</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;the&quot;</span>, <span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;database&quot;</span>, <span class="hljs-string">&quot;is&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
