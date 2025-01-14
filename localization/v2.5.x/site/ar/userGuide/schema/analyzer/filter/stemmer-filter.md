---
id: stemmer-filter.md
title: فلتر ستيمير
summary: >-
  يعمل مرشح "الجذع" على تقليل الكلمات إلى شكلها الأساسي أو الجذري (المعروف باسم
  الجذع)، مما يسهل مطابقة الكلمات ذات المعاني المتشابهة عبر التصريفات المختلفة.
---
<h1 id="Stemmer​" class="common-anchor-header">الجذع<button data-href="#Stemmer​" class="anchor-icon" translate="no">
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
    </button></h1><p>يقوم مرشح <code translate="no">stemmer</code> بتقليل الكلمات إلى شكلها الأساسي أو الجذري (المعروف باسم الجذع)، مما يسهل مطابقة الكلمات ذات المعاني المتشابهة عبر تصريفات مختلفة. يدعم مرشح <code translate="no">stemmer</code> لغات متعددة، مما يسمح بالبحث والفهرسة الفعالة في سياقات لغوية مختلفة.</p>
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
    </button></h2><p>عامل التصفية <code translate="no">stemmer</code> هو عامل تصفية مخصص في ميلفوس. لاستخدامه، حدد <code translate="no">&quot;type&quot;: &quot;stemmer&quot;</code> في تكوين الفلتر، إلى جانب معلمة <code translate="no">language</code> لتحديد اللغة المرغوبة للوقف.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>:[{​
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>, <span class="hljs-comment"># Specifies the filter type as stemmer​</span>
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-comment"># Sets the language for stemming to English​</span>
    }],​
}​
<button class="copy-code-btn"></button></code></pre>
<p>يقبل عامل التصفية <code translate="no">stemmer</code> المعلمات التالية القابلة للتكوين.</p>
<table data-block-token="CnsXd9Ej7ozbQixt3lzcMqoanUf"><thead><tr><th data-block-token="ASZldv4hso4KpYxws1LcIE6fnSb" colspan="1" rowspan="1"><p data-block-token="FgIodsPFMoIlfDxk0GLcnf6Cn3c">المعلمة</p>
</th><th data-block-token="UwUpdXmE2oaLOjxYKpac4U4enUb" colspan="1" rowspan="1"><p data-block-token="S3g4d2pl3o1QfOxDrrCc0bHwn6l">الوصف</p>
</th></tr></thead><tbody><tr><td data-block-token="Qlg7d56pCo2leCxk3rkcZswhngb" colspan="1" rowspan="1"><p data-block-token="V7Ajd2RyToVjNTxbGEEcVHdYnxb"><code translate="no">language</code></p>
</td><td data-block-token="NTbNd7XeuoBsfsxzQ1Kc0jKonKb" colspan="1" rowspan="1"><p data-block-token="J4nPdCcSToFTGYx6Huhc7kpqnRd">تحديد لغة عملية الجذع. اللغات المدعومة تشمل: <code translate="no">"arabic"</code> <code translate="no">"danish"</code> و <code translate="no">"dutch"</code> و و <code translate="no">"english"</code> و و <code translate="no">"finnish"</code> و <code translate="no">"french"</code> و <code translate="no">"german"</code> و و <code translate="no">"greek"</code> و <code translate="no">"hungarian"</code> و <code translate="no">"italian"</code> و <code translate="no">"norwegian"</code> و و <code translate="no">"portuguese"</code> و <code translate="no">"romanian"</code> و <code translate="no">"russian"</code> و <code translate="no">"spanish"</code> و <code translate="no">"swedish"</code> و <code translate="no">"tamil"</code> و <code translate="no">"turkish"</code></p>
</td></tr></tbody></table>
<p>يعمل مرشح <code translate="no">stemmer</code> على المصطلحات التي تم إنشاؤها بواسطة أداة الترميز، لذلك يجب استخدامه مع أداة الترميز.</p>
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
    </button></h2><p>فيما يلي مثال على كيفية معالجة عامل التصفية <code translate="no">stemmer</code> للنص.</p>
<p><strong>النص الأصلي</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;running runs looked ran runner&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>الإخراج المتوقع</strong> (مع <code translate="no">language: &quot;english&quot;</code>).</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;look&quot;</span>, <span class="hljs-string">&quot;ran&quot;</span>, <span class="hljs-string">&quot;runner&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
