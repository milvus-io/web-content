---
id: boolean.md
title: شرح التصفية
summary: >-
  يوفر Milvus إمكانات تصفية قوية تتيح إجراء استعلامات دقيقة عن بياناتك. تتيح لك
  تعبيرات التصفية استهداف حقول قياسية محددة وتحسين نتائج البحث باستخدام شروط
  مختلفة. يشرح هذا الدليل كيفية استخدام تعبيرات التصفية في Milvus، مع أمثلة تركز
  على عمليات الاستعلام. يمكنك أيضًا تطبيق هذه المرشحات في طلبات البحث والحذف.
---
<h1 id="Filtering-Explained" class="common-anchor-header">شرح التصفية<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر Milvus إمكانيات تصفية قوية تتيح إجراء استعلامات دقيقة عن بياناتك. تتيح لك تعبيرات التصفية استهداف حقول قياسية محددة وتحسين نتائج البحث باستخدام شروط مختلفة. يشرح هذا الدليل كيفية استخدام تعبيرات التصفية في Milvus، مع أمثلة تركز على عمليات الاستعلام. يمكنك أيضًا تطبيق هذه المرشحات في طلبات البحث والحذف.</p>
<h2 id="Basic-operators" class="common-anchor-header">المشغلات الأساسية<button data-href="#Basic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم Milvus عدة عوامل أساسية لتصفية البيانات:</p>
<ul>
<li><p><strong>عوامل المقارنة</strong>: <code translate="no">==</code> ، <code translate="no">!=</code> ، <code translate="no">&gt;</code> ، <code translate="no">&lt;</code> ، <code translate="no">&gt;=</code> ، و <code translate="no">&lt;=</code> تتيح التصفية بناءً على الحقول الرقمية أو النصية.</p></li>
<li><p><strong>مرشحات النطاق والأنماط</strong>: <code translate="no">IN</code> و <code translate="no">LIKE</code> و <code translate="no">=~</code> و <code translate="no">!~</code> تُطابق القيم أو أنماط أحرف البدل أو أنماط التعبيرات العادية. للحصول على تفاصيل حول أنماط السلاسل، راجع <a href="/docs/ar/pattern-matching.md">«مطابقة الأنماط</a>».</p></li>
<li><p><strong>المشغلات الحسابية</strong>: تُستخدم <code translate="no">+</code> و <code translate="no">-</code> و <code translate="no">*</code> و <code translate="no">/</code> و <code translate="no">%</code> و <code translate="no">**</code> في الحسابات التي تتضمن حقولًا رقمية.</p></li>
<li><p><strong>المُشغِّلات البتية</strong>: في Milvus 3.0.0 والإصدارات الأحدث، تُستخدم <code translate="no">&amp;</code> و <code translate="no">|</code> و <code translate="no">^</code> لتصفية الحقول الصحيحة التي تشفر علامات متعددة، مثل أذونات الوصول أو بتات الحالة. لمزيد من التفاصيل، راجع <a href="/docs/ar/basic-operators.md#Bitwise-operators">«المُشغِّلات الأساسية</a>».</p></li>
<li><p><strong>المشغلات المنطقية</strong>: تجمع<strong>المشغلات</strong> <code translate="no">AND</code> و <code translate="no">OR</code> و <code translate="no">NOT</code> بين شروط متعددة لتكوين تعبيرات معقدة.</p></li>
<li><p><strong>المشغلات IS NULL و IS NOT NULL</strong>: تُستخدم المشغلات <code translate="no">IS NULL</code> و <code translate="no">IS NOT NULL</code> لتصفية الحقول بناءً على ما إذا كانت تحتوي على قيمة فارغة (عدم وجود بيانات) أم لا. لمزيد من التفاصيل، راجع " <a href="/docs/ar/basic-operators.md#IS-NULL-and-IS-NOT-NULL-operators">المشغلات الأساسية</a>".</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">مثال: التصفية حسب اللون<button data-href="#Example-Filtering-by-Color" class="anchor-icon" translate="no">
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
    </button></h3><p>للعثور على الكيانات ذات الألوان الأساسية (الأحمر أو الأخضر أو الأزرق) في حقل قياسي <code translate="no">color</code> ، استخدم تعبير التصفية التالي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Permission-Bits" class="common-anchor-header">مثال: التصفية حسب بتات الأذونات<button data-href="#Example-Filtering-by-Permission-Bits" class="anchor-icon" translate="no">
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
    </button></h3><p>للعثور على الكيانات التي يحتوي حقلها الصحيح <code translate="no">permissions</code> على بت <code translate="no">SHARE</code> ، استخدم عامل AND البتوي (<code translate="no">&amp;</code>):</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;(permissions &amp; 4) == 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Regex-Pattern" class="common-anchor-header">مثال: التصفية حسب نمط Regex<button data-href="#Example-Filtering-by-Regex-Pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>للعثور على الكيانات التي يحتوي حقل <code translate="no">message</code> الخاص بها على رمز خطأ مثل <code translate="no">E1001</code> ، استخدم عامل مطابقة regex <code translate="no">=~</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>تستخدم عوامل تصفية Regex مطابقة السلسلة الفرعية. لفرض مطابقة قيمة الحقل بالكامل مع النمط، أضف المراسي <code translate="no">^</code> و <code translate="no">$</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/pattern-matching.md">مطابقة الأنماط</a>.</p>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">مثال: تصفية حقول JSON<button data-href="#Example-Filtering-JSON-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>يسمح Milvus بالإشارة إلى المفاتيح في حقول JSON. على سبيل المثال، إذا كان لديك حقل JSON <code translate="no">product</code> يحتوي على المفاتيح <code translate="no">price</code> و <code translate="no">model</code> ، وتريد العثور على منتجات ذات طراز معين وسعر أقل من 1,850، فاستخدم تعبير التصفية التالي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">مثال: تصفية حقول المصفوفات<button data-href="#Example-Filtering-Array-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا كان لديك حقل صفيف <code translate="no">history_temperatures</code> يحتوي على سجلات متوسط درجات الحرارة التي أبلغت عنها محطات الرصد منذ عام 2000، وتريد العثور على محطات الرصد التي تجاوزت فيها درجة الحرارة في عام 2009 (العام العاشر المسجل) 23 درجة مئوية، فاستخدم هذا التعبير:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من المعلومات حول هذه العوامل الأساسية، راجع <a href="/docs/ar/basic-operators.md">«العوامل الأساسية</a>».</p>
<h2 id="Filter-expression-templates" class="common-anchor-header">قوالب تعبيرات التصفية<button data-href="#Filter-expression-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>عند التصفية باستخدام أحرف CJK، قد تكون المعالجة أكثر تعقيدًا نظرًا لمجموعات الأحرف الأكبر حجمًا والاختلافات في الترميز. وقد يؤدي ذلك إلى انخفاض الأداء، خاصةً مع عامل <code translate="no">IN</code>.</p>
<p>يقدم Milvus قوالب تعبيرات التصفية لتحسين الأداء عند العمل مع أحرف CJK. من خلال فصل القيم الديناميكية عن تعبير التصفية، يتعامل محرك الاستعلام مع إدراج المعلمات بكفاءة أكبر.</p>
<h3 id="Example" class="common-anchor-header">مثال<button data-href="#Example" class="anchor-icon" translate="no">
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
    </button></h3><p>للعثور على الأفراد الذين تزيد أعمارهم عن 25 عامًا والذين يعيشون إما في «北京» (بكين) أو «上海» (شنغهاي)، استخدم قالب التعبير التالي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لتحسين الأداء، استخدم هذا الشكل المعدل باستخدام المعلمات:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>يقلل هذا النهج من عبء التحليل ويحسن سرعة الاستعلام. لمزيد من المعلومات، راجع <a href="/docs/ar/filtering-templating.md">قوالب التصفية</a>.</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">المشغلات الخاصة بأنواع البيانات<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر Milvus عوامل تصفية متقدمة لأنواع بيانات محددة، مثل حقول JSON وARRAY وVARCHAR.</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">المشغلات الخاصة بحقول JSON<button data-href="#JSON-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>يوفر Milvus عوامل تشغيل متقدمة للاستعلام عن حقول JSON، مما يتيح التصفية الدقيقة داخل هياكل JSON المعقدة:</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: يتحقق من وجود تعبير JSON في الحقل.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: يضمن وجود جميع عناصر تعبير JSON.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: يقوم بالتصفية بحثًا عن الكيانات التي يوجد فيها عنصر واحد على الأقل في تعبير JSON.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من التفاصيل حول عوامل JSON، راجع <a href="/docs/ar/json-operators.md">عوامل JSON</a>.</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">عوامل خاصة بحقول ARRAY<button data-href="#ARRAY-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>يوفر Milvus عوامل تصفية متقدمة لحقول المصفوفات، مثل <code translate="no">ARRAY_CONTAINS</code> و <code translate="no">ARRAY_CONTAINS_ALL</code> و <code translate="no">ARRAY_CONTAINS_ANY</code> و <code translate="no">ARRAY_LENGTH</code> ، والتي تتيح تحكمًا دقيقًا في بيانات المصفوفات:</p>
<p><code translate="no">ARRAY_CONTAINS</code>: يقوم بتصفية الكيانات التي تحتوي على عنصر معين.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: يقوم بتصفية الكيانات التي تحتوي على جميع العناصر الموجودة في القائمة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: تصفية الكيانات التي تحتوي على أي عنصر من القائمة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: تصفية بناءً على طول المصفوفة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من التفاصيل حول عوامل الصفيف، راجع <a href="/docs/ar/array-operators.md">عوامل الصفيف (ARRAY Operators</a>).</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">مشغلات خاصة بحقول VARCHAR<button data-href="#VARCHAR-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>يوفر Milvus عوامل تشغيل متخصصة لإجراء عمليات بحث نصية دقيقة في حقول VARCHAR:</p>
<h4 id="Pattern-matching-operators" class="common-anchor-header">مشغلات مطابقة الأنماط</h4><p>تعمل عوامل التشغيل <code translate="no">LIKE</code> و <code translate="no">=~</code> و <code translate="no">!~</code> على مطابقة أنماط السلاسل في حقول <code translate="no">VARCHAR</code> ومسارات سلاسل JSON وعناصر <code translate="no">ARRAY&lt;VARCHAR&gt;</code> محددة. استخدم <code translate="no">LIKE</code> لأنماط أحرف البدل البسيطة. استخدم <code translate="no">=~</code> و <code translate="no">!~</code> للتعبيرات العادية RE2.</p>
<p>للحصول على التفاصيل، راجع <a href="/docs/ar/pattern-matching.md">«مطابقة الأنماط</a>».</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> المُشغِّل</h4><p>يتيح عامل التشغيل « <code translate="no">TEXT_MATCH</code> » استرجاع المستندات بدقة بناءً على مصطلحات استعلام محددة. وهو مفيد بشكل خاص لعمليات البحث المُصفاة التي تجمع بين عوامل التصفية القياسية وعمليات البحث عن التشابه المتجهي. وعلى عكس عمليات البحث الدلالي، يركز «Text Match» على التكرارات الدقيقة للمصطلحات.</p>
<p>يستخدم Milvus Tantivy لدعم الفهرسة المعكوسة والبحث النصي القائم على المصطلحات. تتضمن العملية ما يلي:</p>
<ol>
<li><p><strong>المحلل</strong>: يقوم بتجزئة النص المدخل إلى رموز ومعالجته.</p></li>
<li><p><strong>الفهرسة</strong>: إنشاء فهرس معكوس يربط الرموز الفريدة بالوثائق.</p></li>
</ol>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/keyword-match.md">«مطابقة النص</a>».</p>
<h4 id="PHRASEMATCH-operator--Milvus-26x" class="common-anchor-header"><code translate="no">PHRASE_MATCH</code> المشغل<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span></h4><p>يتيح عامل التشغيل <strong>PHRASE_MATCH</strong> استرجاع المستندات بدقة استنادًا إلى التطابقات الدقيقة للعبارات، مع مراعاة كل من ترتيب مصطلحات الاستعلام وتجاورها.</p>
<p>لمزيد من التفاصيل، راجع " <a href="/docs/ar/phrase-match.md">مطابقة العبارات</a>".</p>
