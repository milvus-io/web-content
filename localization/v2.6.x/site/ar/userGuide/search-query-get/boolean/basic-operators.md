---
id: basic-operators.md
title: المشغلات الأساسية
summary: >-
  يوفر Milvus مجموعة غنية من العوامل الأساسية لمساعدتك في تصفية البيانات
  والاستعلام عنها بكفاءة. تسمح لك هذه العوامل بتحسين شروط البحث الخاصة بك
  استنادًا إلى الحقول القياسية والحسابات الرقمية والشروط المنطقية وغيرها. يعد
  فهم كيفية استخدام هذه العوامل أمرًا بالغ الأهمية لبناء استعلامات دقيقة وزيادة
  كفاءة عمليات البحث الخاصة بك.
---
<h1 id="Basic-Operators" class="common-anchor-header">المشغلات الأساسية<button data-href="#Basic-Operators" class="anchor-icon" translate="no">
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
<h2 id="Comparison-operators" class="common-anchor-header">عوامل المقارنة<button data-href="#Comparison-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>تُستخدم عوامل المقارنة لتصفية البيانات بناءً على التساوي أو عدم المساواة أو الحجم. وهي قابلة للتطبيق على الحقول الرقمية والنصية.</p>
<h3 id="Supported-Comparison-Operators" class="common-anchor-header">عوامل المقارنة المدعومة:</h3><ul>
<li><p><code translate="no">==</code> (يساوي)</p></li>
<li><p><code translate="no">!=</code> (لا يساوي)</p></li>
<li><p><code translate="no">&gt;</code> (أكبر من)</p></li>
<li><p><code translate="no">&lt;</code> (أقل من)</p></li>
<li><p><code translate="no">&gt;=</code> (أكبر من أو يساوي)</p></li>
<li><p><code translate="no">&lt;=</code> (أقل من أو يساوي)</p></li>
</ul>
<h3 id="Example-1-Filtering-with-Equal-To-" class="common-anchor-header">مثال 1: التصفية باستخدام يساوي إلى (<code translate="no">==</code>)</h3><p>افترض أن لديك حقلًا باسم <code translate="no">status</code> وتريد العثور على جميع الكيانات التي يكون فيها <code translate="no">status</code> "نشط". يمكنك استخدام عامل المساواة <code translate="no">==</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-Not-Equal-To-" class="common-anchor-header">مثال 2: التصفية باستخدام لا يساوي (<code translate="no">!=</code>)</h3><p>للعثور على الكيانات حيث <code translate="no">status</code> ليس "غير نشط":</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status != &quot;inactive&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Filtering-with-Greater-Than-" class="common-anchor-header">مثال 3: التصفية باستخدام أكبر من (<code translate="no">&gt;</code>)</h3><p>إذا كنت تريد العثور على جميع الكيانات التي تحتوي على <code translate="no">age</code> أكبر من 30</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;age &gt; 30&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Filtering-with-Less-Than" class="common-anchor-header">مثال 4: التصفية باستخدام أقل من</h3><p>للعثور على الكيانات التي يكون فيها <code translate="no">price</code> أقل من 100:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &lt; 100&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Filtering-with-Greater-Than-or-Equal-To-" class="common-anchor-header">مثال 5: التصفية باستخدام أكبر من أو يساوي (<code translate="no">&gt;=</code>)</h3><p>إذا كنت تريد العثور على جميع الكيانات ذات <code translate="no">rating</code> أكبر من أو يساوي 4</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Filtering-with-Less-Than-or-Equal-To" class="common-anchor-header">مثال 6: التصفية باستخدام أقل من أو يساوي إلى</h3><p>للعثور على الكيانات التي تحتوي على <code translate="no">discount</code> أقل من أو يساوي 10٪:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators" class="common-anchor-header">عوامل النطاق<button data-href="#Range-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>تساعد عوامل المدى في تصفية البيانات بناءً على مجموعات أو نطاقات محددة من القيم.</p>
<h3 id="Supported-Range-Operators" class="common-anchor-header">معاملات النطاق المدعومة:</h3><ul>
<li><p><code translate="no">IN</code>: تستخدم لمطابقة القيم ضمن مجموعة أو نطاق محدد.</p></li>
<li><p><code translate="no">LIKE</code>: يُستخدم لمطابقة نمط (غالبًا للحقول النصية).</p></li>
</ul>
<h3 id="Example-1-Using-IN-to-Match-Multiple-Values" class="common-anchor-header">مثال 1: استخدام <code translate="no">IN</code> لمطابقة قيم متعددة</h3><p>إذا كنت تريد العثور على جميع الكيانات التي يكون فيها <code translate="no">color</code> إما "أحمر" أو "أخضر" أو "أزرق":</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>يكون هذا مفيدًا عندما تريد التحقق من العضوية في قائمة من القيم.</p>
<h3 id="Example-2-Using-LIKE-for-Pattern-Matching" class="common-anchor-header">مثال 2: استخدام <code translate="no">LIKE</code> لمطابقة الأنماط</h3><p>يُستخدم المشغل <code translate="no">LIKE</code> لمطابقة الأنماط في حقول السلاسل. يمكنه مطابقة السلاسل الفرعية في مواضع مختلفة داخل النص: <strong>كبادئة</strong> أو <strong>لاحقة</strong> أو <strong>لاحقة</strong>. يستخدم المشغل <code translate="no">LIKE</code> الرمز <code translate="no">%</code> كحرف بدل، والذي يمكن أن يطابق أي عدد من الأحرف (بما في ذلك الصفر).</p>
<h3 id="Prefix-Match-Starts-With" class="common-anchor-header">مطابقة البادئة (يبدأ بـ)</h3><p>لإجراء مطابقة <strong>البادئة،</strong> حيث تبدأ السلسلة بنمط معين، يمكنك وضع النمط في البداية واستخدام <code translate="no">%</code> لمطابقة أي أحرف تليه. على سبيل المثال، للعثور على جميع المنتجات التي يبدأ اسمها <code translate="no">name</code> بـ "Prod":</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>سوف يطابق هذا أي منتج يبدأ اسمه بـ "Prod"، مثل "المنتج أ"، "المنتج ب"، إلخ.</p>
<h3 id="Suffix-Match-Ends-With" class="common-anchor-header">مطابقة لاحقة (تنتهي بـ)</h3><p>لمطابقة <strong>اللاحقة،</strong> حيث تنتهي السلسلة بنمط معين، ضع الرمز <code translate="no">%</code> في بداية النمط. على سبيل المثال، للعثور على جميع المنتجات التي ينتهي اسمها <code translate="no">name</code> بـ "XYZ":</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%XYZ&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>سيؤدي هذا إلى مطابقة أي منتج ينتهي اسمه بـ "XYZ"، مثل "ProductXYZ" أو "SampleXYZ"، إلخ.</p>
<h3 id="Infix-Match-Contains" class="common-anchor-header">مطابقة لاحقة (يحتوي على)</h3><p>لإجراء تطابق <strong>لاحق،</strong> حيث يمكن أن يظهر النمط في أي مكان في السلسلة، يمكنك وضع الرمز <code translate="no">%</code> في بداية النمط ونهايته. على سبيل المثال، للعثور على جميع المنتجات التي يحتوي <code translate="no">name</code> على كلمة "Pro":</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%Pro%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>سيتطابق هذا مع أي منتج يحتوي اسمه على السلسلة الفرعية "Pro"، مثل "منتج" أو "ProLine" أو "ProPro" أو "SuperPro".</p>
<h2 id="Arithmetic-Operators" class="common-anchor-header">المعاملات الحسابية<button data-href="#Arithmetic-Operators" class="anchor-icon" translate="no">
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
<h3 id="Supported-Arithmetic-Operators" class="common-anchor-header">المعاملات الحسابية المدعومة:</h3><ul>
<li><p><code translate="no">+</code> (الجمع)</p></li>
<li><p><code translate="no">-</code> (الطرح)</p></li>
<li><p><code translate="no">*</code> (الضرب)</p></li>
<li><p><code translate="no">/</code> (القسمة)</p></li>
<li><p><code translate="no">%</code> (المقياس)</p></li>
<li><p><code translate="no">**</code> (الأس)</p></li>
</ul>
<h3 id="Example-1-Using-Modulus-" class="common-anchor-header">مثال 1: استخدام المقياس (<code translate="no">%</code>)</h3><p>لإيجاد الكيانات التي يكون فيها <code translate="no">id</code> عددًا زوجيًا (أي يقبل القسمة على 2):</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-Exponentiation-" class="common-anchor-header">مثال 2: استخدام الأس (<code translate="no">**</code>)</h3><p>للعثور على الكيانات التي يكون فيها <code translate="no">price</code> مرفوعًا للقوة 2 أكبر من 1000:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Logical-Operators" class="common-anchor-header">المعاملات المنطقية<button data-href="#Logical-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>تُستخدم العوامل المنطقية لدمج شروط متعددة في تعبير مرشح أكثر تعقيدًا. وتشمل هذه <code translate="no">AND</code> و <code translate="no">OR</code> و <code translate="no">NOT</code>.</p>
<h3 id="Supported-Logical-Operators" class="common-anchor-header">المعاملات المنطقية المدعومة:</h3><ul>
<li><p><code translate="no">AND</code>: يجمع بين عدة شروط يجب أن تكون جميعها صحيحة.</p></li>
<li><p><code translate="no">OR</code>: يجمع بين شروط يجب أن يكون أحدها على الأقل صحيحًا.</p></li>
<li><p><code translate="no">NOT</code>: ينفي الشرط.</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-Combine-Conditions" class="common-anchor-header">مثال 1: استخدام <code translate="no">AND</code> للجمع بين الشروط</h3><p>للعثور على جميع المنتجات التي يكون فيها <code translate="no">price</code> أكبر من 100 و <code translate="no">stock</code> أكبر من 50:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-Combine-Conditions" class="common-anchor-header">مثال 2: استخدام <code translate="no">OR</code> لدمج الشروط</h3><p>للعثور على جميع المنتجات التي يكون فيها <code translate="no">color</code> إما "أحمر" أو "أزرق":</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-Exclude-a-Condition" class="common-anchor-header">مثال 3: استخدام <code translate="no">NOT</code> لاستبعاد شرط</h3><p>للعثور على جميع المنتجات حيث <code translate="no">color</code> ليس "أخضر":</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="IS-NULL-and-IS-NOT-NULL-Operators" class="common-anchor-header">المشغلان IS NULL و IS NOT NULL<button data-href="#IS-NULL-and-IS-NOT-NULL-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم استخدام المشغّلين <code translate="no">IS NULL</code> و <code translate="no">IS NOT NULL</code> لتصفية الحقول بناءً على ما إذا كانت تحتوي على قيمة فارغة (عدم وجود بيانات).</p>
<ul>
<li><p><code translate="no">IS NULL</code>: يحدد الكيانات التي يحتوي فيها حقل معين على قيمة فارغة، أي أن القيمة غير موجودة أو غير محددة.</p></li>
<li><p><code translate="no">IS NOT NULL</code>: يحدد الكيانات التي يحتوي فيها حقل معين على أي قيمة أخرى غير فارغة، أي أن الحقل يحتوي على قيمة صحيحة ومحددة.</p></li>
</ul>
<div class="alert note">
<p>العوامل غير حساسة لحالة الأحرف، لذا يمكنك استخدام <code translate="no">IS NULL</code> أو <code translate="no">is null</code> ، و <code translate="no">IS NOT NULL</code> أو <code translate="no">is not null</code>.</p>
</div>
<h3 id="Regular-Scalar-Fields-with-Null-Values" class="common-anchor-header">الحقول العددية العادية ذات القيم الفارغة</h3><p>يسمح ميلفوس بالتصفية على الحقول العددية العادية، مثل السلاسل أو الأرقام، ذات القيم الفارغة.</p>
<div class="alert note">
<p>لا يتم التعامل مع السلسلة الفارغة <code translate="no">&quot;&quot;</code> كقيمة فارغة لحقل <code translate="no">VARCHAR</code>.</p>
</div>
<p>لاسترداد الكيانات التي يكون فيها الحقل <code translate="no">description</code> فارغًا:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لاسترداد الكيانات التي يكون فيها الحقل <code translate="no">description</code> غير فارغ:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NOT NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لاسترداد الكيانات التي يكون فيها الحقل <code translate="no">description</code> غير فارغ والحقل <code translate="no">price</code> أعلى من 10:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NOT NULL AND price &gt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="JSON-Fields-with-Null-Values" class="common-anchor-header">حقول JSON ذات القيم الفارغة</h3><p>يسمح Milvus بالتصفية على حقول JSON التي تحتوي على قيم فارغة. يتم التعامل مع حقل JSON على أنه فارغ بالطرق التالية:</p>
<ul>
<li><p>يتم تعيين كائن JSON بأكمله بشكل صريح إلى لا شيء (فارغ)، على سبيل المثال، <code translate="no">{&quot;metadata&quot;: None}</code>.</p></li>
<li><p>يكون حقل JSON نفسه مفقودًا تمامًا من الكيان.</p></li>
</ul>
<div class="alert note">
<p>إذا كانت بعض العناصر داخل كائن JSON فارغة (مثل المفاتيح الفردية)، يظل الحقل يعتبر غير فارغ. على سبيل المثال، لا يتم التعامل مع <code translate="no">\{&quot;metadata&quot;: \{&quot;category&quot;: None, &quot;price&quot;: 99.99}}</code> على أنه فارغ، على الرغم من أن المفتاح <code translate="no">category</code> فارغ.</p>
</div>
<p>لمزيد من التوضيح لكيفية تعامل Milvus مع حقول JSON ذات القيم الفارغة، انظر إلى نموذج البيانات التالي مع حقل JSON <code translate="no">metadata</code>:</p>
<pre><code translate="no" class="language-python">data = [
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
  },
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-comment"># Entire JSON object is null</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]
  },
  {  <span class="hljs-comment"># JSON field `metadata` is completely missing</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]
  },
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>}, <span class="hljs-comment"># Individual key value is null</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">4</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.21</span>]
  }
]
<button class="copy-code-btn"></button></code></pre>
<p><strong>مثال 1: استرداد الكيانات التي يكون فيها <code translate="no">metadata</code> فارغًا</strong></p>
<p>للعثور على الكيانات التي يكون فيها الحقل <code translate="no">metadata</code> إما مفقودًا أو تم تعيينه صراحةً إلى لا شيء:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata IS NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: None, &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: None, &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>مثال 2: استرداد الكيانات حيث <code translate="no">metadata</code> ليس فارغًا</strong></p>
<p>للعثور على الكيانات التي يكون فيها الحقل <code translate="no">metadata</code> غير فارغ:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata IS NOT NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: None, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="ARRAY-Fields-with-Null-Values" class="common-anchor-header">حقول ARRAY ذات القيم الفارغة</h3><p>يسمح Milvus بالتصفية على حقول ARRAY التي تحتوي على قيم فارغة. يتم التعامل مع حقل ARRAY على أنه فارغ بالطرق التالية:</p>
<ul>
<li><p>يتم تعيين حقل ARRAY بالكامل إلى لا شيء (فارغ)، على سبيل المثال، <code translate="no">&quot;tags&quot;: None</code>.</p></li>
<li><p>يكون حقل ARRAY مفقودًا تمامًا من الكيان.</p></li>
</ul>
<div class="alert note">
<p>لا يمكن أن يحتوي حقل ARRAY على قيم فارغة جزئية لأن جميع العناصر في حقل ARRAY يجب أن يكون لها نفس نوع البيانات. لمزيد من التفاصيل، راجع <a href="/docs/ar/array_data_type.md">حقل المصفوفة</a>.</p>
</div>
<p>لمزيد من التوضيح لكيفية تعامل Milvus مع حقول ARRAY ذات القيم الفارغة، انظر نموذج البيانات التالي مع حقل ARRAY <code translate="no">tags</code>:</p>
<pre><code translate="no" class="language-python">data = [
  {
      <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;pop&quot;</span>, <span class="hljs-string">&quot;rock&quot;</span>, <span class="hljs-string">&quot;classic&quot;</span>],
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
  },
  {
      <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-literal">None</span>,  <span class="hljs-comment"># Entire ARRAY is null</span>
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.78</span>, <span class="hljs-number">0.91</span>, <span class="hljs-number">0.23</span>]
  },
  {  <span class="hljs-comment"># The tags field is completely missing</span>
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">9</span>, <span class="hljs-number">5</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.11</span>, <span class="hljs-number">0.23</span>]
  }
]
<button class="copy-code-btn"></button></code></pre>
<p><strong>مثال 1: استرداد الكيانات حيث <code translate="no">tags</code> فارغة</strong></p>
<p>لاسترداد الكيانات التي يكون فيها الحقل <code translate="no">tags</code> إما مفقودًا أو تم تعيينه صراحةً إلى <code translate="no">None</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [4, 5], &#x27;embedding&#x27;: [0.78, 0.91, 0.23], &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [9, 5], &#x27;embedding&#x27;: [0.18, 0.11, 0.23], &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>مثال 2: استرداد الكيانات حيث <code translate="no">tags</code> ليس فارغًا</strong></p>
<p>لاسترداد الكيانات التي يكون فيها الحقل <code translate="no">tags</code> غير فارغ:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NOT NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: None, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields" class="common-anchor-header">نصائح حول استخدام عوامل التشغيل الأساسية مع حقول JSON و ARRAY<button data-href="#Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>في حين أن المشغلات الأساسية في ميلفوس متعددة الاستخدامات ويمكن تطبيقها على الحقول القياسية، إلا أنه يمكن استخدامها بفعالية مع المفاتيح والفهارس في حقلي JSON و ARRAY.</p>
<p>على سبيل المثال، إذا كان لديك حقل <code translate="no">product</code> يحتوي على مفاتيح متعددة مثل <code translate="no">price</code> و <code translate="no">model</code> و <code translate="no">tags</code> ، فقم دائمًا بالرجوع إلى المفتاح مباشرةً:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>للعثور على السجلات التي تتجاوز فيها درجة الحرارة الأولى في مصفوفة من درجات الحرارة المسجلة قيمة معينة، استخدم:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion" class="common-anchor-header">خاتمة<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
