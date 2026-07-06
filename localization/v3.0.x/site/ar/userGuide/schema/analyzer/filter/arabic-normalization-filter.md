---
id: arabic-normalization-filter.md
title: توحيد النص العربيCompatible with Milvus 3.0.0+
summary: >-
  يقوم مرشح «arabic_normalization» بتوحيد أشكال الحروف العربية المختلفة وإزالة
  علامات التشكيل والتطويل.
beta: Milvus 3.0.0+
---
<h1 id="Arabic-Normalization" class="common-anchor-header">توحيد النص العربي<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Arabic-Normalization" class="anchor-icon" translate="no">
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
    </button></h1><p>يُعد مرشح " <code translate="no">arabic_normalization</code> " مرشحًا مدمجًا للرموز النصية الخاصة بالنصوص العربية. يعمل هذا المرشح على توحيد أشكال الحروف الخاصة باللغة العربية وإزالة العلامات الاختيارية التي قد تؤدي إلى ظهور المصطلحات العربية المتطابقة بشكل مختلف أثناء تحليل النص.</p>
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
    </button></h2><div class="alert note">
<p>بالنسبة للنصوص العربية، استخدم <a href="/docs/ar/arabic-analyzer.md"><code translate="no">arabic</code></a> في معظم الحالات. يتضمن المحلل المدمج هذا المرشح إلى جانب التقطيع القياسي، وتحويل الأحرف إلى صغرى، وتوحيد الأرقام العشرية، واستخلاص الجذور العربية، وإزالة الكلمات الممنوعة العربية. لا تستخدم « <code translate="no">arabic_normalization</code> » مباشرةً إلا عندما تحتاج إلى إنشاء مسار محلل مخصص.</p>
</div>
<p>لاستخدام مرشح <code translate="no">arabic_normalization</code> في محلل مخصص، أضفه إلى قسم « <code translate="no">filter</code> » في <code translate="no">analyzer_params</code>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;arabic_normalization&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<p>لا يحتوي مرشح <code translate="no">arabic_normalization</code> على معلمات قابلة للتكوين.</p>
<p>يطبق المرشح التحويلات التالية:</p>
<table>
   <tr>
     <th><p>التحويل</p></th>
     <th><p>من</p></th>
     <th><p>إلى</p></th>
   </tr>
   <tr>
     <td><p>متغيرات الحمزة + الألف</p></td>
     <td><p><code translate="no">آ</code>، <code translate="no">أ</code> ، <code translate="no">إ</code></p></td>
     <td><p><code translate="no">ا</code></p></td>
   </tr>
   <tr>
     <td><p>«ت» المربوطة</p></td>
     <td><p><code translate="no">ة</code></p></td>
     <td><p><code translate="no">ه</code></p></td>
   </tr>
   <tr>
     <td><p>الألف المكسورة</p></td>
     <td><p><code translate="no">ى</code></p></td>
     <td><p><code translate="no">ي</code></p></td>
   </tr>
   <tr>
     <td><p>الحركات</p></td>
     <td><p><code translate="no">U+064B</code> من خلال <code translate="no">U+065F</code></p></td>
     <td><p>تم حذفها</p></td>
   </tr>
   <tr>
     <td><p>التطويل / الكشيدة</p></td>
     <td><p><code translate="no">ـ</code></p></td>
     <td><p>تمت إزالته</p></td>
   </tr>
</table>
<p>يعمل المرشح على الرموز التي يولدها أداة الترميز. التكوين أعلاه هو مثال متعمد لمحلل مخصص ولا يتضمن مسار المعالجة الكامل للغة العربية.</p>
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
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;arabic_normalization&quot;</span>],
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

sample_text = <span class="hljs-string">&quot;آدم أحمد إسلام مدرسة كبرى كِتَابٌ عـــربي&quot;</span>

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
    </button></h3><pre><code translate="no"><span class="hljs-selector-attr">[<span class="hljs-string">&#x27;ادم&#x27;</span>, <span class="hljs-string">&#x27;احمد&#x27;</span>, <span class="hljs-string">&#x27;اسلام&#x27;</span>, <span class="hljs-string">&#x27;مدرسه&#x27;</span>, <span class="hljs-string">&#x27;كبري&#x27;</span>, <span class="hljs-string">&#x27;كتاب&#x27;</span>, <span class="hljs-string">&#x27;عربي&#x27;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
