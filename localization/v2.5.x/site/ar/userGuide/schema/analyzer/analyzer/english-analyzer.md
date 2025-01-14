---
id: english-analyzer.md
title: محلل اللغة الإنجليزية
related_key: 'english, analyzer'
summary: >-
  تم تصميم محلل "اللغة الإنجليزية" في Milvus لمعالجة النص الإنجليزي، وتطبيق
  قواعد خاصة باللغة لترميز النصوص وتصفيتها.
---
<h1 id="English​" class="common-anchor-header">اللغة الإنجليزية<button data-href="#English​" class="anchor-icon" translate="no">
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
    </button></h1><p>تم تصميم محلل <code translate="no">english</code> في ميلفوس لمعالجة النص الإنجليزي، وتطبيق قواعد خاصة باللغة لترميز وتصفية الرموز.</p>
<h3 id="Definition​" class="common-anchor-header">التعريف</h3><p>يستخدم محلل <code translate="no">english</code> المكونات التالية.</p>
<ul>
<li><p><strong>أداة الترميز</strong>: يستخدم <a href="/docs/ar/standard-tokenizer.md"><code translate="no">standard tokenizer</code></a> لتقسيم النص إلى وحدات كلمات منفصلة.</p></li>
<li><p>المرشحات: يتضمن مرشحات متعددة لمعالجة النص بشكل شامل.</p>
<ul>
<li><p><a href="/docs/ar/lowercase-filter.md"><code translate="no">lowercase</code></a>: يحول جميع الرموز إلى أحرف صغيرة، مما يتيح عمليات بحث غير حساسة لحالة الأحرف.</p></li>
<li><p><a href="/docs/ar/stemmer-filter.md"><code translate="no">stemmer</code></a>: يقلل الكلمات إلى صيغتها الجذرية لدعم مطابقة أوسع (على سبيل المثال، "تشغيل" تصبح "تشغيل").</p></li>
<li><p><a href="/docs/ar/stop-filter.md"><code translate="no">stop_words</code></a>: يزيل كلمات التوقف الإنجليزية الشائعة للتركيز على المصطلحات الرئيسية في النص.</p></li>
</ul></li>
</ul>
<p>وظيفة محلل <code translate="no">english</code> مكافئة لتكوين المحلل المخصص التالي.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>,​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,​
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
        }，{​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,​
            <span class="hljs-string">&quot;stop_words&quot;</span>: <span class="hljs-string">&quot;_english_&quot;</span>,​
        }​
    ]​
}​
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuration​" class="common-anchor-header">التكوين</h3><p>لتطبيق محلل <code translate="no">english</code> على أحد الحقول، ما عليك سوى تعيين <code translate="no">type</code> إلى <code translate="no">english</code> في <code translate="no">analyzer_params</code> ، وتضمين معلمات اختيارية حسب الحاجة.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<p>يقبل محلل <code translate="no">english</code> المعلمات الاختيارية التالية: </p>
<table data-block-token="YMmUdQtabozHZnxC09QcajU0nvd"><thead><tr><th data-block-token="N1Qfdbd9Vok7mkx0OGpcx49cnUM" colspan="1" rowspan="1"><p data-block-token="PxYUdGyrMoa4x5x3sCpcF7JLn1e">المعلمة</p>
</th><th data-block-token="WIQKdcE3coxEirxwmpucXGuin7f" colspan="1" rowspan="1"><p data-block-token="VAHCdZFTkoeSJNxgPmicGnOZnWh">الوصف</p>
</th></tr></thead><tbody><tr><td data-block-token="NzThd1pxQoektPxhqrQc7Oxcnhl" colspan="1" rowspan="1"><p data-block-token="SW6SdE2iyohhGaxQIfpcjZfCnBx"><code translate="no">stop_words</code></p>
</td><td data-block-token="KSAbdmKPCowsR7x7UO8c8ngFnnh" colspan="1" rowspan="1"><p data-block-token="F3E1dFjL3oUrl5xWq3ucpVPon7c">مصفوفة تحتوي على قائمة بكلمات التوقف، والتي ستتم إزالتها من الترميز. الإعداد الافتراضي هو <code translate="no">_english_</code> ، وهي مجموعة مدمجة من كلمات التوقف الشائعة في اللغة الإنجليزية.</p>
</td></tr></tbody></table>
<p>مثال على التكوين مع كلمات الإيقاف المخصصة.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<p>بعد تحديد <code translate="no">analyzer_params</code> ، يمكنك تطبيقها على حقل <code translate="no">VARCHAR</code> عند تحديد مخطط مجموعة. يسمح ذلك لـ Milvus بمعالجة النص في هذا الحقل باستخدام المحلل المحدد من أجل ترميز وتصفية فعالة. لمزيد من التفاصيل، راجع <a href="/docs/ar/analyzer-overview.md#Example-use">مثال الاستخدام</a>.</p>
<h3 id="Example-output​" class="common-anchor-header">مثال على الإخراج</h3><p>فيما يلي كيفية معالجة محلل <code translate="no">english</code> للنص.</p>
<p><strong>النص الأصلي</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>الناتج المتوقع</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;databas&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
