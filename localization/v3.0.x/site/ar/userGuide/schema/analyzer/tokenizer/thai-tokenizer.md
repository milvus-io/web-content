---
id: thai-tokenizer.md
title: اللغة التايلانديةCompatible with Milvus 3.0.0+
summary: >-
  يقوم مُجزِّئ النص التايلاندي بتقسيم النص التايلاندي إلى وحدات كلمات، ويستبعد
  المسافات البيضاء والمقاطع التي لا تحتوي إلا على علامات الترقيم.
beta: Milvus 3.0.0+
---
<h1 id="Thai" class="common-anchor-header">اللغة التايلاندية<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Thai" class="anchor-icon" translate="no">
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
    </button></h1><p>يقوم أداة تحليل النص " <code translate="no">thai</code> " بتقسيم النص التايلاندي إلى رموز كلمات دون الاعتماد على المسافات. استخدم أداة التحليل هذه عندما تحتاج إلى إنشاء مسار تحليل مخصص للنص التايلاندي أو النص المختلط بين التايلاندية والإنجليزية.</p>
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
<p>بالنسبة للنصوص التايلاندية، استخدم المحلل المدمج <a href="/docs/ar/thai-analyzer.md"><code translate="no">thai</code></a> في معظم الحالات. يتضمن المحلل المدمج أداة التقطيع هذه إلى جانب تحويل الأحرف إلى صغرى، وتوحيد الأرقام العشرية، وإزالة الكلمات الممنوعة في اللغة التايلاندية. استخدم أداة التقطيع <code translate="no">thai</code> مباشرةً فقط عندما تحتاج إلى إنشاء مسار محلل مخصص.</p>
</div>
<p>لتكوين محلل باستخدام أداة تجزئة الكلمات <code translate="no">thai</code> ، قم بتعيين <code translate="no">tokenizer</code> إلى <code translate="no">thai</code> في <code translate="no">analyzer_params</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>لا يحتوي أداة التقطيع <code translate="no">thai</code> على معلمات قابلة للتكوين.</p>
<p>يمكن لمُجزئ الكلمات العمل مع مرشح واحد أو أكثر. على سبيل المثال، يستخدم التكوين التالي مُجزئ الكلمات <code translate="no">thai</code> مع <a href="/docs/ar/lowercase-filter.md"><code translate="no">lowercase</code></a> و <a href="/docs/ar/decimaldigit-filter.md"><code translate="no">decimaldigit</code></a> :</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        <span class="hljs-string">&quot;decimaldigit&quot;</span>,
    ],
}
<button class="copy-code-btn"></button></code></pre>
<p>لا يعادل مسار المعالجة المخصص هذا محلل <code translate="no">thai</code> المدمج لأنه لا يتضمن قاموس الكلمات الممنوعة <code translate="no">_thai_</code> المدمج. للحصول على مسار المعالجة الكامل المُعرَّف مسبقًا، استخدم <code translate="no">{&quot;type&quot;: &quot;thai&quot;}</code>.</p>
<p>يطبق أداة تحليل الكلمات السلوك التالي:</p>
<ul>
<li><strong>تجزئة اللغة التايلاندية</strong>: يقسم النص التايلاندي إلى رموز كلمات دون الاعتماد على المسافات البيضاء.</li>
<li><strong>تصفية المسافات البيضاء وعلامات الترقيم</strong>: تصفية المقاطع التي تحتوي على مسافات بيضاء وعلامات ترقيم فقط. وهذا يختلف عن <a href="/docs/ar/icu-tokenizer.md"><code translate="no">icu</code></a> أداة تحويل النص إلى رموز، التي يمكنها الاحتفاظ بعلامات الترقيم والمسافات كرموز.</li>
<li><strong>النص ذو النصوص المختلطة</strong>: يُنتج رموزًا لكلمات لاتينية في النص المختلط بين التايلاندية والإنجليزية.</li>
<li><strong>أداة التقطيع فقط</strong>: لا تقوم بتحويل الرموز إلى أحرف صغيرة، ولا تعمل على توحيد أرقام يونيكود، ولا تزيل الكلمات الممنوعة. أضف عوامل تصفية أو استخدم <a href="/docs/ar/thai-analyzer.md"><code translate="no">thai</code></a> لتلك الخطوات.</li>
<li><strong>دلالات الموضع</strong>: يستخدم مواضع الرموز القائمة على الأحرف والتي تشمل المسافات البيضاء وعلامات الترقيم التي تم تخطيها، مما يحافظ على اتساق سلوك مطابقة العبارات والقرب مع أدوات تحليل الرموز الأخرى غير اللاتينية.</li>
</ul>
<p>بعد تعريف « <code translate="no">analyzer_params</code> » ، يمكنك تطبيق المحلل على حقل « <code translate="no">VARCHAR</code> » عند تعريف مخطط المجموعة. لمزيد من التفاصيل، راجع <a href="/docs/ar/analyzer-overview.md#Example-use">«مثال</a> على <a href="/docs/ar/analyzer-overview.md#Example-use">الاستخدام</a>».</p>
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
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
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

sample_text = <span class="hljs-string">&quot;สวัสดี! ทดสอบ, ระบบ Milvus ๑๒๓&quot;</span>

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
    </button></h3><pre><code translate="no"><span class="hljs-selector-attr">[<span class="hljs-string">&#x27;สวัสดี&#x27;</span>, <span class="hljs-string">&#x27;ทดสอบ&#x27;</span>, <span class="hljs-string">&#x27;ระบบ&#x27;</span>, <span class="hljs-string">&#x27;Milvus&#x27;</span>, <span class="hljs-string">&#x27;๑๒๓&#x27;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
