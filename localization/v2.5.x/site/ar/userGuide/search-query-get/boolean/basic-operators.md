---
id: basic-operators.md
summary: >-
  يوفر Milvus مجموعة غنية من العوامل الأساسية لمساعدتك في تصفية البيانات
  والاستعلام عنها بكفاءة. تسمح لك هذه العوامل بتحسين شروط البحث الخاصة بك
  استنادًا إلى الحقول القياسية والحسابات الرقمية والشروط المنطقية وغيرها. يعد
  فهم كيفية استخدام هذه العوامل أمرًا بالغ الأهمية لبناء استعلامات دقيقة وزيادة
  كفاءة عمليات البحث الخاصة بك.
title: المشغلون الأساسيون
---
<h1 id="Basic-Operators​" class="common-anchor-header">المشغلات الأساسية<button data-href="#Basic-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر ميلفوس مجموعة غنية من العوامل الأساسية لمساعدتك في تصفية البيانات والاستعلام عنها بكفاءة. تسمح لك هذه المعاملات بتحسين شروط البحث الخاصة بك بناءً على الحقول القياسية والحسابات الرقمية والشروط المنطقية وغيرها. يعد فهم كيفية استخدام هذه العوامل أمرًا بالغ الأهمية لبناء استعلامات دقيقة وزيادة كفاءة عمليات البحث الخاصة بك.</p>
<h2 id="Comparison-operators​" class="common-anchor-header">عوامل المقارنة<button data-href="#Comparison-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>تُستخدم عوامل المقارنة لتصفية البيانات بناءً على التساوي أو عدم المساواة أو الحجم. وهي قابلة للتطبيق على الحقول الرقمية والنصية والتاريخية.</p>
<h3 id="Supported-Comparison-Operators​" class="common-anchor-header">عوامل المقارنة المدعومة.</h3><ul>
<li><p><code translate="no">==</code> (يساوي إلى)</p></li>
<li><p><code translate="no">!=</code> (لا يساوي)</p></li>
<li><p><code translate="no">&gt;</code> (أكبر من)</p></li>
<li><p><code translate="no">&lt;</code> (أقل من)</p></li>
<li><p><code translate="no">&gt;=</code> (أكبر من أو يساوي)</p></li>
<li><p><code translate="no">&lt;=</code> (أقل من أو يساوي)</p></li>
</ul>
<h3 id="Example-1-Filtering-with-Equal-To-​" class="common-anchor-header">مثال 1: التصفية باستخدام Equal To (<code translate="no">==</code>)</h3><p>افترض أن لديك حقلًا باسم <code translate="no">status</code> وتريد العثور على جميع الكيانات التي يكون فيها <code translate="no">status</code> &quot;نشط&quot;. يمكنك استخدام عامل المساواة <code translate="no">==</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-Not-Equal-To-​" class="common-anchor-header">مثال 2: التصفية باستخدام لا يساوي (<code translate="no">!=</code>)</h3><p>للعثور على الكيانات حيث <code translate="no">status</code> ليس &quot;غير نشط&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status != &quot;inactive&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Filtering-with-Greater-Than-​" class="common-anchor-header">مثال 3: التصفية باستخدام أكبر من (<code translate="no">&gt;</code>)</h3><p>إذا كنت تريد العثور على جميع الكيانات التي تحتوي على <code translate="no">age</code> أكبر من 30</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;age &gt; 30&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Filtering-with-Less-Than-​" class="common-anchor-header">مثال 4: التصفية باستخدام أقل من (<code translate="no">&lt;</code>)</h3><p>للعثور على الكيانات التي يكون فيها <code translate="no">price</code> أقل من 100.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &lt; 100&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Filtering-with-Greater-Than-or-Equal-To-​" class="common-anchor-header">مثال 5: التصفية باستخدام أكبر من أو يساوي (<code translate="no">&gt;=</code>)</h3><p>إذا كنت ترغب في العثور على جميع الكيانات ذات <code translate="no">rating</code> أكبر من أو يساوي 4.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Filtering-with-Less-Than-or-Equal-To-​" class="common-anchor-header">مثال 6: التصفية باستخدام أقل من أو يساوي (<code translate="no">&lt;=</code>)</h3><p>للعثور على الكيانات التي تحتوي على <code translate="no">discount</code> أقل من أو تساوي 10٪.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators​" class="common-anchor-header">عوامل النطاق<button data-href="#Range-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>تساعد عوامل تشغيل النطاق في تصفية البيانات بناءً على مجموعات أو نطاقات محددة من القيم.</p>
<h3 id="Supported-Range-Operators​" class="common-anchor-header">معاملات النطاق المدعومة.</h3><ul>
<li><p><code translate="no">IN</code>: تستخدم لمطابقة القيم ضمن مجموعة أو نطاق محدد.</p></li>
<li><p><code translate="no">LIKE</code>: يُستخدم لمطابقة نمط (غالبًا للحقول النصية).</p></li>
</ul>
<h3 id="Example-1-Using-IN-to-Match-Multiple-Values​" class="common-anchor-header">مثال 1: استخدام <code translate="no">IN</code> لمطابقة قيم متعددة</h3><p>إذا كنت تريد العثور على جميع الكيانات التي يكون فيها <code translate="no">color</code> إما &quot;أحمر&quot; أو &quot;أخضر&quot; أو &quot;أزرق&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>يكون هذا مفيدًا عندما تريد التحقق من العضوية في قائمة من القيم.</p>
<h3 id="Example-2-Using-LIKE-for-Pattern-Matching​" class="common-anchor-header">مثال 2: استخدام <code translate="no">LIKE</code> لمطابقة الأنماط</h3><p>يُستخدم المشغل <code translate="no">LIKE</code> لمطابقة الأنماط في حقول السلاسل. يمكنه مطابقة السلاسل الفرعية في مواضع مختلفة داخل النص: <strong>كبادئة</strong> أو <strong>لاحقة</strong> أو <strong>لاحقة</strong>. يستخدم المشغل <code translate="no">LIKE</code> الرمز <code translate="no">%</code> كحرف بدل، والذي يمكن أن يطابق أي عدد من الأحرف (بما في ذلك الصفر).</p>
<h4 id="Prefix-Match-Starts-With​" class="common-anchor-header">مطابقة البادئة (يبدأ بـ)</h4><p>لإجراء مطابقة <strong>البادئة،</strong> حيث تبدأ السلسلة بنمط معين، يمكنك وضع النمط في البداية واستخدام <code translate="no">%</code> لمطابقة أي أحرف تليه. على سبيل المثال، للعثور على جميع المنتجات التي يبدأ اسمها <code translate="no">name</code> بـ &quot;Prod&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>سيطابق هذا أي منتج يبدأ اسمه بـ &quot;Prod&quot;، مثل &quot;المنتج أ&quot;، &quot;المنتج ب&quot;، إلخ.</p>
<h4 id="Suffix-Match-Ends-With​" class="common-anchor-header">مطابقة لاحقة (تنتهي بـ)</h4><p>لمطابقة <strong>اللاحقة،</strong> حيث تنتهي السلسلة بنمط معين، ضع الرمز <code translate="no">%</code> في بداية النمط. على سبيل المثال، للعثور على جميع المنتجات التي ينتهي اسمها <code translate="no">name</code> بـ &quot;XYZ&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%XYZ&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>سيؤدي هذا إلى مطابقة أي منتج ينتهي اسمه بـ &quot;XYZ&quot;، مثل &quot;ProductXYZ&quot;، &quot;SampleXYZ&quot;، إلخ.</p>
<h4 id="Infix-Match-Contains​" class="common-anchor-header">مطابقة لاحقة (يحتوي على)</h4><p>لإجراء تطابق <strong>لاحق،</strong> حيث يمكن أن يظهر النمط في أي مكان في السلسلة، يمكنك وضع الرمز <code translate="no">%</code> في بداية النمط ونهايته. على سبيل المثال، للعثور على جميع المنتجات التي يحتوي <code translate="no">name</code> على كلمة &quot;Pro&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%Pro%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>سيتطابق هذا مع أي منتج يحتوي اسمه على السلسلة الفرعية &quot;Pro&quot;، مثل &quot;منتج&quot; أو &quot;ProLine&quot; أو &quot;ProPro&quot; أو &quot;SuperPro&quot;.</p>
<h2 id="Arithmetic-Operators​" class="common-anchor-header">المعاملات الحسابية<button data-href="#Arithmetic-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>تسمح لك العوامل الحسابية بإنشاء شروط تستند إلى عمليات حسابية تتضمن حقول رقمية.</p>
<h3 id="Supported-Arithmetic-Operators​" class="common-anchor-header">المعاملات الحسابية المدعومة.</h3><ul>
<li><p><code translate="no">+</code> (الجمع)</p></li>
<li><p><code translate="no">-</code> (الطرح)</p></li>
<li><p><code translate="no">*</code> (الضرب)</p></li>
<li><p><code translate="no">/</code> (القسمة)</p></li>
<li><p><code translate="no">%</code> (المقياس)</p></li>
<li><p><code translate="no">**</code> (الأس)</p></li>
</ul>
<h3 id="Example-1-Using-Addition-+​" class="common-anchor-header">مثال 1: استخدام الجمع (<code translate="no">+</code>)</h3><p>لإيجاد الكيانات التي يكون فيها سعر <code translate="no">total</code> هو مجموع <code translate="no">base_price</code> و <code translate="no">tax</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total == base_price + tax&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-Subtraction--​" class="common-anchor-header">مثال 2: استخدام الطرح (<code translate="no">-</code>)</h3><p>للعثور على الكيانات التي يكون فيها <code translate="no">quantity</code> أكبر من 50 و <code translate="no">quantity_sold</code> أقل من 30.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;quantity - quantity_sold &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-Multiplication-​" class="common-anchor-header">مثال 3: استخدام الضرب (<code translate="no">*</code>)</h3><p>للعثور على الكيانات التي يكون فيها <code translate="no">price</code> أكبر من 100 و <code translate="no">quantity</code> أكبر من 10، مضروبًا.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price * quantity &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Using-Division-​" class="common-anchor-header">مثال 4: استخدام القسمة (<code translate="no">/</code>)</h3><p>للعثور على الكيانات التي يكون فيها <code translate="no">total_price</code> مقسومًا على <code translate="no">quantity</code> أقل من 50.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total_price / quantity &lt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Using-Modulus-​" class="common-anchor-header">مثال 5: استخدام المقياس (<code translate="no">%</code>)</h3><p>لإيجاد الكيانات التي يكون فيها <code translate="no">id</code> عددًا زوجيًا (أي يقبل القسمة على 2).</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Using-Exponentiation-​" class="common-anchor-header">مثال 6: استخدام الأس (<code translate="no">**</code>)</h3><p>للعثور على الكيانات التي يكون فيها <code translate="no">price</code> مرفوعًا للقوة 2 أكبر من 1000.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Logical-Operators​" class="common-anchor-header">المعاملات المنطقية<button data-href="#Logical-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>تُستخدم العوامل المنطقية لدمج عدة شروط في تعبير مرشح أكثر تعقيدًا. وتشمل هذه <code translate="no">AND</code> و <code translate="no">OR</code> و <code translate="no">NOT</code>.</p>
<h3 id="Supported-Logical-Operators​" class="common-anchor-header">المعاملات المنطقية المدعومة.</h3><ul>
<li><p><code translate="no">AND</code>: يجمع بين عدة شروط يجب أن تكون جميعها صحيحة.</p></li>
<li><p><code translate="no">OR</code>: يجمع بين شروط يجب أن يكون أحدها على الأقل صحيحًا.</p></li>
<li><p><code translate="no">NOT</code>: ينفي الشرط.</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-Combine-Conditions​" class="common-anchor-header">مثال 1: استخدام <code translate="no">AND</code> للجمع بين الشروط</h3><p>للعثور على جميع المنتجات التي يكون فيها <code translate="no">price</code> أكبر من 100 و <code translate="no">stock</code> أكبر من 50.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-Combine-Conditions​" class="common-anchor-header">مثال 2: استخدام <code translate="no">OR</code> لدمج الشروط</h3><p>للعثور على جميع المنتجات التي يكون فيها <code translate="no">color</code> إما &quot;أحمر&quot; أو &quot;أزرق&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-Exclude-a-Condition​" class="common-anchor-header">مثال 3: استخدام <code translate="no">NOT</code> لاستبعاد شرط</h3><p>للعثور على جميع المنتجات حيث <code translate="no">color</code> ليس &quot;أخضر&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="common-anchor-header">نصائح حول استخدام عوامل التشغيل الأساسية مع حقول JSON و ARRAY<button data-href="#Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>في حين أن المشغلات الأساسية في Milvus متعددة الاستخدامات ويمكن تطبيقها على الحقول القياسية، إلا أنه يمكن استخدامها أيضًا بفعالية مع المفاتيح والفهارس في حقلي JSON و ARRAY.</p>
<p>على سبيل المثال، إذا كان لديك حقل <code translate="no">product</code> يحتوي على مفاتيح متعددة مثل <code translate="no">price</code> و <code translate="no">model</code> و <code translate="no">tags</code> ، فقم دائمًا بالرجوع إلى المفتاح مباشرةً.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>للعثور على السجلات التي تتجاوز فيها درجة الحرارة الأولى في مصفوفة من درجات الحرارة المسجلة قيمة معينة، استخدم.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion​" class="common-anchor-header">خاتمة<button data-href="#Conclusion​" class="anchor-icon" translate="no">
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
    </button></h2><p>يقدم Milvus مجموعة من العوامل الأساسية التي تمنحك المرونة في تصفية بياناتك والاستعلام عنها. من خلال الجمع بين المقارنة والنطاق والعوامل الحسابية والمنطقية، يمكنك إنشاء تعبيرات تصفية قوية لتضييق نطاق نتائج البحث واسترداد البيانات التي تحتاجها بكفاءة.</p>
