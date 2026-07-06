---
id: pinyin-filter.md
title: البينيينCompatible with Milvus 3.0.x
summary: >-
  يقوم مرشح «البينين» بتحويل الرموز المميزة للأحرف الصينية إلى رموز مميزة بنظام
  «البينين» أثناء تحليل النص، مما يتيح إجراء المطابقة استنادًا إلى نظام
  «البينين» للنصوص الصينية.
beta: Milvus 3.0.x
---
<h1 id="Pinyin" class="common-anchor-header">البينيين<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Pinyin" class="anchor-icon" translate="no">
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
    </button></h1><p>غالبًا ما يتطلب البحث عن النص الصيني من المستخدمين إدخال الأحرف الصينية تمامًا كما تظهر في النص المفهرس. في عمليات البحث عن الأسماء، والإكمال التلقائي، والبحث أثناء الكتابة، غالبًا ما يكتب المستخدمون بينيين بدلاً من الأحرف الصينية. على سبيل المثال، قد يكتب المستخدم « <code translate="no">zuqiu</code> » للبحث عن « <code translate="no">足球</code> ». يضيف مرشح « <code translate="no">pinyin</code> » رموز بينيين إلى ناتج المحلل بحيث يمكن للنص الصيني مطابقة الإدخال بالبينيين دون الحاجة إلى حقل منفصل للبينيين.</p>
<p>يُستخدم مرشح <code translate="no">pinyin</code> عادةً مع أداة تجزئة <a href="/docs/ar/jieba-tokenizer.md">Jieba</a> للنص الصيني. وهو يعمل في مسار مرشحات محلل مخصص ويمكنه إصدار أشكال متعددة من رموز بينيين لنفس الرمز الصيني.</p>
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
    </button></h2><p>لاستخدام الخيارات الافتراضية، حدد <code translate="no">&quot;pinyin&quot;</code> في قسم <code translate="no">filter</code> في <code translate="no">analyzer_params</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>],</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>يحتفظ هذا الاختصار بالرموز الصينية الأصلية ويُنتج رموز بينيين على مستوى الحرف. ولا يُنتج بينيين مركبًا أو أحرف بينيين الأولى ما لم تقم بتمكين هذه الخيارات صراحةً.</p>
<p>للتحكم الكامل، حدد المرشح ككائن وقم بتكوين أشكال رموز بينيين التي يصدرها Milvus.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;filter&quot;</span>: [</span>
<span class="highlighted-comment-line">        {</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">False</span>,</span>
<span class="highlighted-comment-line">        }</span>
<span class="highlighted-comment-line">    ],</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>يقبل المرشح المعلمات التالية.</p>
<table>
<thead>
<tr><th>المعلمة</th><th>النوع</th><th>القيمة الافتراضية</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">keep_original</code></td><td>منطقية</td><td><code translate="no">true</code></td><td>يحتفظ بالرمز الصيني الأصلي في ناتج المحلل.</td></tr>
<tr><td><code translate="no">keep_full_pinyin</code></td><td>منطقية</td><td><code translate="no">true</code></td><td>يصدر رموز بينيين على مستوى الحرف. على سبيل المثال، ينتج عن <code translate="no">中文</code> <code translate="no">zhong</code> و <code translate="no">wen</code>.</td></tr>
<tr><td><code translate="no">keep_joined_full_pinyin</code></td><td>منطقية</td><td><code translate="no">false</code></td><td>يُصدر رمز بينيين مدمجًا لكل رمز مصدر. على سبيل المثال، ينتج عن <code translate="no">中文</code> الرمز <code translate="no">zhongwen</code>.</td></tr>
<tr><td><code translate="no">keep_separate_first_letter</code></td><td>منطقية</td><td><code translate="no">false</code></td><td>يُخرج رمزًا من الأحرف الأولى بالبينيين لكل رمز مصدر. على سبيل المثال، يُنتج <code translate="no">中文</code> <code translate="no">zw</code> .</td></tr>
</tbody>
</table>
<p>يعمل المرشح على الرموز التي ينتجها مُجزئ الرموز. بالنسبة للنص الصيني، استخدمه مع مُجزئ رموز مثل <code translate="no">jieba</code>.</p>
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
    </button></h2><p>قبل تطبيق تكوين المحلل على مخطط المجموعة الخاص بك، تحقق من سلوكه باستخدام <code translate="no">run_analyzer</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sample_text = <span class="hljs-string">&quot;中文测试&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-Chinese-text-with-character-level-Pinyin" class="common-anchor-header">مطابقة النص الصيني مع الرموز الصوتية (Pinyin) على مستوى الحرف<button data-href="#Match-Chinese-text-with-character-level-Pinyin" class="anchor-icon" translate="no">
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
    </button></h3><p>يحتفظ مرشح <code translate="no">pinyin</code> الافتراضي بالرموز الصينية الأصلية ويصدر رموز بينيين على مستوى الحرف.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>],
}

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<p>الناتج المتوقع:</p>
<pre><code translate="no" class="language-plaintext">[&#x27;中文&#x27;, &#x27;zhong&#x27;, &#x27;wen&#x27;, &#x27;测试&#x27;, &#x27;ce&#x27;, &#x27;shi&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-Chinese-terms-with-joined-Pinyin" class="common-anchor-header">مطابقة المصطلحات الصينية مع نظام بينيين المركب<button data-href="#Match-Chinese-terms-with-joined-Pinyin" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتمكين <code translate="no">keep_joined_full_pinyin</code> عندما تحتاج إلى مطابقة مصطلح صيني مع شكله الكامل المركب من بينيين.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">False</span>,
        }
    ],
}

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<p>الناتج المتوقع:</p>
<pre><code translate="no" class="language-plaintext">[&#x27;中文&#x27;, &#x27;zhongwen&#x27;, &#x27;测试&#x27;, &#x27;ceshi&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-Chinese-terms-with-Pinyin-initials" class="common-anchor-header">مطابقة المصطلحات الصينية مع الأحرف الأولى من بينيين<button data-href="#Match-Chinese-terms-with-Pinyin-initials" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتمكين " <code translate="no">keep_separate_first_letter</code> " عندما تحتاج إلى مطابقة مصطلح صيني مع الأحرف الأولى من شكله بالبينيين.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">True</span>,
        }
    ],
}

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<p>النتيجة المتوقعة:</p>
<pre><code translate="no" class="language-plaintext">[&#x27;中文&#x27;, &#x27;zw&#x27;, &#x27;测试&#x27;, &#x27;cs&#x27;]
<button class="copy-code-btn"></button></code></pre>
