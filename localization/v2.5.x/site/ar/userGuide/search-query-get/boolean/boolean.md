---
id: boolean.md
title: شرح التصفية
summary: >-
  يوفر برنامج Milvus إمكانات تصفية قوية تتيح الاستعلام الدقيق عن بياناتك. تسمح
  لك تعبيرات التصفية باستهداف حقول قياسية محددة وتنقيح نتائج البحث بشروط مختلفة.
  يشرح هذا الدليل كيفية استخدام تعبيرات التصفية في ملفوس، مع أمثلة تركز على
  عمليات الاستعلام. يمكنك أيضًا تطبيق هذه المرشحات في طلبات البحث والحذف.
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
    </button></h1><p>يوفر برنامج Milvus إمكانات تصفية قوية تتيح الاستعلام الدقيق عن بياناتك. تسمح لك تعابير التصفية باستهداف حقول قياسية محددة وتنقيح نتائج البحث بشروط مختلفة. يشرح هذا الدليل كيفية استخدام تعبيرات التصفية في ملفوس، مع أمثلة تركز على عمليات الاستعلام. يمكنك أيضًا تطبيق هذه المرشحات في طلبات البحث والحذف.</p>
<h2 id="Basic-operators" class="common-anchor-header">العوامل الأساسية<button data-href="#Basic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم ملفوس العديد من العوامل الأساسية لتصفية البيانات:</p>
<ul>
<li><p><strong>عوامل المقارنة</strong> <code translate="no">==</code> <code translate="no">!=</code> و <code translate="no">&gt;</code> و و <code translate="no">&lt;</code> و <code translate="no">&gt;=</code> و <code translate="no">&lt;=</code> تسمح بالتصفية بناءً على الحقول الرقمية أو النصية.</p></li>
<li><p><strong>مرشحات النطاق</strong>: <code translate="no">IN</code> و <code translate="no">LIKE</code> تساعد في مطابقة نطاقات أو مجموعات قيم محددة.</p></li>
<li><p><strong>المعاملات الحسابية</strong>: <code translate="no">+</code> <code translate="no">-</code> و <code translate="no">*</code> و و <code translate="no">/</code> و <code translate="no">%</code> و <code translate="no">**</code> تستخدم للحسابات التي تتضمن حقول رقمية.</p></li>
<li><p><strong>المعاملات المنطقية</strong>: <code translate="no">AND</code> و <code translate="no">OR</code> ، و <code translate="no">NOT</code> تجمع بين عدة شروط في تعبيرات معقدة.</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">مثال: التصفية حسب اللون</h3><p>للعثور على كيانات ذات ألوان أساسية (أحمر، أو أخضر، أو أزرق) في حقل رقمي <code translate="no">color</code> ، استخدم تعبير التصفية التالي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">مثال: تصفية حقول JSON</h3><p>يسمح ميلفوس بالرجوع إلى المفاتيح في حقول JSON. على سبيل المثال، إذا كان لديك حقل JSON <code translate="no">product</code> مع المفتاحين <code translate="no">price</code> و <code translate="no">model</code> ، وتريد العثور على منتجات ذات طراز وسعر محدد أقل من 1850، استخدم تعبير التصفية هذا:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">مثال: تصفية حقول المصفوفات</h3><p>إذا كان لديك حقل مصفوفة <code translate="no">history_temperatures</code> يحتوي على سجلات متوسط درجات الحرارة التي أبلغت عنها المراصد منذ عام 2000، وتريد العثور على المراصد التي تجاوزت فيها درجة الحرارة في عام 2009 (العاشر المسجل) 23 درجة مئوية، استخدم هذا التعبير:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من المعلومات حول هذه العوامل الأساسية، راجع <a href="/docs/ar/basic-operators.md">المعاملات الأساسية</a>.</p>
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
    </button></h2><p>عند التصفية باستخدام أحرف CJK، يمكن أن تكون المعالجة أكثر تعقيدًا بسبب مجموعات الأحرف الأكبر واختلافات الترميز. يمكن أن يؤدي ذلك إلى أداء أبطأ، خاصةً مع المشغل <code translate="no">IN</code>.</p>
<p>يقدم Milvus قوالب تعبيرات التصفية لتحسين الأداء عند العمل مع أحرف CJK. من خلال فصل القيم الديناميكية عن تعبير عامل التصفية، يتعامل محرك الاستعلام مع إدخال المعلمات بكفاءة أكبر.</p>
<h3 id="Example" class="common-anchor-header">مثال</h3><p>للعثور على الأفراد الذين تزيد أعمارهم عن 25 عامًا ويعيشون إما في "北京" (بكين) أو "海海 海" (شنغهاي)، استخدم تعبير القالب التالي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لتحسين الأداء، استخدم هذا الشكل مع المعلمات:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>هذا الأسلوب يقلل من عبء التحليل ويحسن سرعة الاستعلام. للمزيد من المعلومات، راجع <a href="/docs/ar/filtering-templating.md">نموذج التصفية</a>.</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">المشغلات الخاصة بنوع البيانات<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر Milvus عوامل تصفية متقدمة لأنواع بيانات محددة، مثل حقول JSON و ARRAY و VARCHAR.</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">مشغلات خاصة بحقل JSON</h3><p>يوفر Milvus مشغلات متقدمة للاستعلام عن حقول JSON، مما يتيح تصفية دقيقة داخل هياكل JSON المعقدة:</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: التحقق من وجود تعبير JSON في الحقل.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: يتأكد من وجود جميع عناصر تعبير JSON.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: يقوم بتصفية الكيانات التي يوجد فيها عنصر واحد على الأقل في تعبير JSON.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من التفاصيل حول مشغلي JSON، راجع <a href="/docs/ar/json-operators.md">مشغلي JSON</a>.</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">المشغلات الخاصة بحقل ARRAY</h3><p>يوفر ميلفوس عوامل تصفية متقدمة لحقول المصفوفات، مثل <code translate="no">ARRAY_CONTAINS</code> و <code translate="no">ARRAY_CONTAINS_ALL</code> و <code translate="no">ARRAY_CONTAINS_ANY</code> و <code translate="no">ARRAY_LENGTH</code> ، والتي تسمح بالتحكم الدقيق في بيانات المصفوفات:</p>
<p><code translate="no">ARRAY_CONTAINS</code>: تصفية الكيانات التي تحتوي على عنصر معين.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: تصفية الكيانات التي تحتوي على جميع العناصر الموجودة في القائمة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: : تصفية الكيانات التي تحتوي على أي عنصر من القائمة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: تصفيات بناءً على طول المصفوفة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من التفاصيل حول مشغلي المصفوفة، راجع <a href="/docs/ar/array-operators.md">مشغلي ARRAY</a>.</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">المشغلات الخاصة بحقل VARCHAR</h3><p>يوفر ميلفوس مشغلات متخصصة لعمليات بحث دقيقة تستند إلى النص على حقول VARCHAR:</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> المشغل</h4><p>يسمح المشغل <code translate="no">TEXT_MATCH</code> باسترجاع المستندات بدقة بناءً على مصطلحات استعلام محددة. وهو مفيد بشكل خاص لعمليات البحث المصفاة التي تجمع بين المرشحات القياسية وعمليات البحث عن التشابه المتجه. على عكس عمليات البحث الدلالية، يركّز Text Match على التكرارات الدقيقة للمصطلحات.</p>
<p>يستخدم ميلفوس تانتيفي لدعم الفهرسة المقلوبة والبحث النصي القائم على المصطلحات. تتضمن العملية</p>
<ol>
<li><p><strong>المحلّل</strong>: ترميز النص المدخلات ومعالجتها.</p></li>
<li><p><strong>الفهرسة</strong>: ينشئ فهرسًا مقلوبًا يعيّن الرموز الفريدة للمستندات.</p></li>
</ol>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/keyword-match.md">مطابقة النص</a>.</p>
