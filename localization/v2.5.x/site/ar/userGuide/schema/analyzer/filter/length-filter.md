---
id: length-filter.md
title: مرشح الطول
summary: >-
  يزيل عامل التصفية "الطول" الرموز التي لا تفي بمتطلبات الطول المحددة، مما يسمح
  لك بالتحكم في طول الرموز المحتفظ بها أثناء معالجة النص.
---
<h1 id="Length​" class="common-anchor-header">الطول<button data-href="#Length​" class="anchor-icon" translate="no">
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
    </button></h1><p>يقوم عامل التصفية <code translate="no">length</code> بإزالة الرموز التي لا تفي بمتطلبات الطول المحددة، مما يسمح لك بالتحكم في طول الرموز التي يتم الاحتفاظ بها أثناء معالجة النص.</p>
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
    </button></h2><p>عامل التصفية <code translate="no">length</code> هو عامل تصفية مخصص في ميلفوس، يتم تحديده من خلال الإعداد <code translate="no">&quot;type&quot;: &quot;length&quot;</code> في تكوين عامل التصفية. يمكنك تكوينه كقاموس داخل <code translate="no">analyzer_params</code> لتحديد حدود الطول.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>:[{​
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-comment"># Specifies the filter type as length​</span>
        <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Sets the maximum token length to 10 characters​</span>
    }],​
}​
<button class="copy-code-btn"></button></code></pre>
<p>يقبل عامل التصفية <code translate="no">length</code> المعلمات التالية القابلة للتكوين.</p>
<table data-block-token="A4b8dsBito2lFHxJ9dxck6M5nJv"><thead><tr><th data-block-token="JXZbdUMSyoJb5ZxhdLGcxGE2nEh" colspan="1" rowspan="1"><p data-block-token="Id41dwlZjoLnGCxWpKJcDg0Hnyf">المعلمة</p>
</th><th data-block-token="MvZqdxMSxowjEBxCQNzcxS8TnVd" colspan="1" rowspan="1"><p data-block-token="OsHjdVSvKodZ5Ox3U1KcXbYQnBc">الوصف</p>
</th></tr></thead><tbody><tr><td data-block-token="ZuZEdNiHIotOFTx3m9QcTPnWnle" colspan="1" rowspan="1"><p data-block-token="Dszdd3IDdowj5bxJyJhcP19tnng"><code translate="no">max</code></p>
</td><td data-block-token="Fx30ddBWYoyRhmxK34Kcgn1Ynjb" colspan="1" rowspan="1"><p data-block-token="MizvdmrQ2oycDjxNYrXcWqFtnXb">يضبط الحد الأقصى لطول الرمز المميز. تتم إزالة الرموز الأطول من هذا الطول.</p>
</td></tr></tbody></table>
<p>يعمل عامل التصفية <code translate="no">length</code> على المصطلحات التي تم إنشاؤها بواسطة أداة الترميز، لذلك يجب استخدامها مع أداة الترميز.</p>
<p>بعد تحديد <code translate="no">analyzer_params</code> ، يمكنك تطبيقها على حقل <code translate="no">VARCHAR</code> عند تحديد مخطط المجموعة. يسمح ذلك لميلفوس بمعالجة النص في ذلك الحقل باستخدام المحلل المحدد من أجل الترميز والتصفية الفعالة. لمزيد من التفاصيل، راجع <a href="/docs/ar/analyzer-overview.md#Example-use">مثال الاستخدام</a>.</p>
<h2 id="Example-output" class="common-anchor-header">مثال على الإخراج<button data-href="#Example-output" class="anchor-icon" translate="no">
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
    </button></h2><p>فيما يلي مثال على كيفية معالجة عامل التصفية <code translate="no">length</code> للنص.</p>
<p><strong>مثال</strong> على<strong>النص</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The length filter allows control over token length requirements for text processing.&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>الإخراج المتوقع</strong> (مع <code translate="no">max: 10</code>).</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;allows&quot;</span>, <span class="hljs-string">&quot;control&quot;</span>, <span class="hljs-string">&quot;over&quot;</span>, <span class="hljs-string">&quot;token&quot;</span>, <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>