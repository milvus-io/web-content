---
id: arabic-analyzer.md
title: العربيةCompatible with Milvus 3.0.0+
summary: >-
  يقوم محلل اللغة العربية المدمج بمعالجة النص العربي من خلال توحيد أشكال الحروف
  والأرقام المختلفة، واستخلاص جذور الكلمات، وإزالة الكلمات غير المهمة في اللغة
  العربية.
beta: Milvus 3.0.0+
---
<h1 id="Arabic" class="common-anchor-header">العربية<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Arabic" class="anchor-icon" translate="no">
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
    </button></h1><p>محلل « <code translate="no">arabic</code> » هو محلل مدمج للنصوص العربية. استخدم هذا المحلل عندما تحتاج إلى أن يقوم Milvus بتوحيد أشكال الحروف العربية المختلفة، وإزالة علامات التشكيل والتطويل، وتحويل الأرقام العربية-الهندية، وتطبيق عملية استخلاص الجذور العربية، وإزالة الكلمات الممنوعة العربية.</p>
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
    </button></h2><p>المحللات المدمجة هي قوالب محللات مقدمة من Milvus. لاستخدام محلل مدمج، قم بتعيين <code translate="no">type</code> إلى اسم محلل محدد مسبقًا في <code translate="no">analyzer_params</code>.</p>
<p>لاستخدام المحلل العربي المدمج، قم بتعيين <code translate="no">type</code> إلى <code translate="no">arabic</code>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;arabic&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>يقبل محلل <code translate="no">arabic</code> المعلمة الاختيارية التالية:</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>النوع</p></th>
     <th><p>القيمة الافتراضية</p></th>
     <th><p>الوصف</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">stop_words</code></p></td>
     <td><p><code translate="no">list[str]</code></p></td>
     <td><p><code translate="no">_arabic_</code></p></td>
     <td><p>قائمة بالكلمات الممنوعة الإضافية التي يجب إزالتها من عملية التقطيع إلى رموز. بشكل افتراضي، يستخدم محلل " <code translate="no">arabic</code> " قاموس " <code translate="no">_arabic_</code> " المدمج. للاطلاع على القاموس الافتراضي، راجع <a href="https://github.com/milvus-io/milvus/blob/1945ba399b4552fd0fd0b131f7c735ddde21e71c/internal/core/thirdparty/tantivy/tantivy-binding/src/analyzer/filter/stop_words/arabic.txt">قائمة الكلمات الممنوعة</a> في Milvus <a href="https://github.com/milvus-io/milvus/blob/1945ba399b4552fd0fd0b131f7c735ddde21e71c/internal/core/thirdparty/tantivy/tantivy-binding/src/analyzer/filter/stop_words/arabic.txt">Arabic</a>. تم الحصول على هذه القائمة من <a href="https://github.com/apache/lucene/blob/main/lucene/analysis/common/src/resources/org/apache/lucene/analysis/ar/stopwords.txt">ملف الكلمات الممنوعة في</a> Apache Lucene <a href="https://github.com/apache/lucene/blob/main/lucene/analysis/common/src/resources/org/apache/lucene/analysis/ar/stopwords.txt">Arabic</a>.</p></td>
   </tr>
</table>
<p>لإضافة كلمات توقف مخصصة، قم بتضمين <code translate="no">stop_words</code>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;arabic&quot;</span>,
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;ميلفوس&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<p>يطبق Milvus الكلمات الممنوعة المخصصة بالإضافة إلى قاموس <code translate="no">_arabic_</code> المدمج.</p>
<p>المحلل المدمج <code translate="no">arabic</code> يعادل تكوين المحلل المخصص التالي:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        <span class="hljs-string">&quot;decimaldigit&quot;</span>,
        <span class="hljs-string">&quot;arabic_normalization&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;arabic&quot;</span>,
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: <span class="hljs-string">&quot;_arabic_&quot;</span>,
        },
    ],
}
<button class="copy-code-btn"></button></code></pre>
<p>يطبق هذا المحلل خطوات المعالجة التالية:</p>
<ul>
<li><strong>التقطيع إلى رموز</strong>: يستخدم أداة التقطيع <code translate="no">standard</code> لتقسيم النص إلى رموز.</li>
<li><strong>توحيد الأرقام</strong>: يستخدم مرشح « <code translate="no">decimaldigit</code> » لتحويل الأرقام العشرية العربية-الهندية وأرقام يونيكود الأخرى إلى أرقام ASCII.</li>
<li><strong>توحيد الحروف العربية</strong>: يستخدم مرشح <code translate="no">arabic_normalization</code> لتوحيد أشكال حرف الألف المختلفة، وحرف التاء المربوطة، وحرف الألف المكسورة، وإزالة الحركات والتطويل.</li>
<li><strong>الاستخلاص</strong>: يستخدم مرشح <code translate="no">stemmer</code> مع تعيين <code translate="no">language</code> على <code translate="no">arabic</code>.</li>
<li><strong>إزالة الكلمات الممنوعة</strong>: يستخدم مرشح " <code translate="no">stop</code> " مع القاموس المدمج " <code translate="no">_arabic_</code> ".</li>
</ul>
<p>بعد تعريف <code translate="no">analyzer_params</code> ، يمكنك تطبيق المحلل على حقل <code translate="no">VARCHAR</code> عند تعريف مخطط المجموعة. لمزيد من التفاصيل، راجع <a href="/docs/ar/analyzer-overview.md#Example-use">مثال الاستخدام</a>.</p>
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
    </button></h3><pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;arabic&quot;</span>,
}
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sample_text = <span class="hljs-string">&quot;كِتَابٌ عـــربي ١٢٣&quot;</span>

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
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
    </button></h3><pre><code translate="no"><span class="hljs-selector-attr">[<span class="hljs-string">&#x27;كتاب&#x27;</span>, <span class="hljs-string">&#x27;عرب&#x27;</span>, <span class="hljs-string">&#x27;123&#x27;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
