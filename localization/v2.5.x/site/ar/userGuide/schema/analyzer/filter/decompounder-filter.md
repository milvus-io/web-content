---
id: decompounder-filter.md
title: فلتر مزيل العادم
summary: >-
  يقسّم فلتر "decompounder" الكلمات المركّبة إلى مكوّنات فردية استنادًا إلى
  قاموس محدد، مما يسهّل البحث عن أجزاء من المصطلحات المركّبة. هذا المرشح مفيد
  بشكل خاص للغات التي تستخدم كلمات مركبة بشكل متكرر، مثل الألمانية.
---
<h1 id="Decompounder​" class="common-anchor-header">مفكك الكلمات المركبة<button data-href="#Decompounder​" class="anchor-icon" translate="no">
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
    </button></h1><p>يقوم عامل التصفية <code translate="no">decompounder</code> بتقسيم الكلمات المركبة إلى مكونات فردية بناءً على قاموس محدد، مما يسهل البحث عن أجزاء من المصطلحات المركبة. هذا الفلتر مفيد بشكل خاص للغات التي تستخدم كلمات مركبة بشكل متكرر، مثل الألمانية.</p>
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
    </button></h2><p>عامل التصفية <code translate="no">decompounder</code> هو عامل تصفية مخصص في ميلفوس. لاستخدامه، حدد <code translate="no">&quot;type&quot;: &quot;decompounder&quot;</code> في تكوين عامل التصفية، إلى جانب معلمة <code translate="no">word_list</code> التي توفر قاموس مكونات الكلمات المراد التعرف عليها.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>:[{​
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment"># Specifies the filter type as decompounder​</span>
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>],​
    }],​
}​
<button class="copy-code-btn"></button></code></pre>
<p>يقبل عامل التصفية <code translate="no">decompounder</code> المعلمات التالية القابلة للتكوين.</p>
<table data-block-token="O4ZcdyoEToqP22xm5ELcYyIhnEh"><thead><tr><th data-block-token="MW4TdhfD2oe0KTx9qwGcP5XEnIh" colspan="1" rowspan="1"><p data-block-token="Y5tddmngjoAyd1xtaDzc7It5nRf">المعلمة</p>
</th><th data-block-token="Vk8Id7BMRoJMIkxN0YPc4lJgn2f" colspan="1" rowspan="1"><p data-block-token="D4v9dtQ53oCx6ExVKhxcPj1EnWg">الوصف</p>
</th></tr></thead><tbody><tr><td data-block-token="CDQldJSkAonYPIxTkiWcWpqPnOd" colspan="1" rowspan="1"><p data-block-token="TX4ndGkwkogWybxIfZocILJOnbd"><code translate="no">word_list</code></p>
</td><td data-block-token="VrxtdsWnZon6oPxMmbQcCgclnUg" colspan="1" rowspan="1"><p data-block-token="BXP4dHimoocoozxbHAecJOA6nTe">قائمة بمكونات الكلمات المستخدمة لتقسيم المصطلحات المركبة. يحدد هذا القاموس كيفية تحليل الكلمات المركبة إلى مصطلحات فردية.</p>
</td></tr></tbody></table>
<p>يعمل عامل التصفية <code translate="no">decompounder</code> على المصطلحات التي تم إنشاؤها بواسطة أداة الترميز، لذا يجب استخدامه مع أداة الترميز.</p>
<p>بعد تحديد <code translate="no">analyzer_params</code> ، يمكنك تطبيقها على حقل <code translate="no">VARCHAR</code> عند تحديد مخطط المجموعة. يسمح ذلك لميلفوس بمعالجة النص في ذلك الحقل باستخدام المحلل المحدد من أجل الترميز والتصفية الفعالة. لمزيد من التفاصيل، راجع <a href="/docs/ar/analyzer-overview.md#Example-use">مثال الاستخدام</a>.</p>
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
    </button></h2><p>فيما يلي مثال على كيفية معالجة عامل التصفية <code translate="no">decompounder</code> للنص.</p>
<p><strong>النص الأصلي</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;dampfschifffahrt brotbackautomat&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>الإخراج المتوقع</strong> (مع <code translate="no">word_list: [&quot;dampf&quot;, &quot;schiff&quot;, &quot;fahrt&quot;, &quot;brot&quot;, &quot;backen&quot;, &quot;automat&quot;]</code>).</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brotbackautomat&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
