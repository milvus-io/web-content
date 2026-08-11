---
id: array-operators.md
title: مشغلات المصفوفات
summary: >-
  يوفر Milvus عوامل تشغيل قوية للاستعلام عن حقول المصفوفات، مما يتيح لك تصفية
  الكيانات واسترجاعها بناءً على محتويات المصفوفات.
---
<h1 id="ARRAY-Operators" class="common-anchor-header">مشغلات المصفوفات<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر Milvus عوامل تشغيل قوية للاستعلام عن حقول المصفوفات، مما يتيح لك تصفية الكيانات واسترجاعها بناءً على محتويات المصفوفات.</p>
<div class="alert note">
<p>يجب أن تكون جميع العناصر داخل المصفوفة من نفس النوع، ويتم التعامل مع الهياكل المتداخلة داخل المصفوفات على أنها سلاسل نصية عادية. لذلك، عند العمل مع حقول المصفوفات، يُنصح بتجنب التداخل المفرط والتأكد من أن هياكل البيانات الخاصة بك مسطحة قدر الإمكان لتحقيق الأداء الأمثل.</p>
</div>
<h2 id="Available-ARRAY-Operators" class="common-anchor-header">مشغلات ARRAY المتاحة<button data-href="#Available-ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>تتيح مشغلات المصفوفات إجراء استعلامات دقيقة لحقول المصفوفات في Milvus. وهذه المشغلات هي:</p>
<ul>
<li><p><a href="/docs/ar/v2.6.x/array-operators.md#ARRAYCONTAINS"><code translate="no">ARRAY_CONTAINS(identifier, expr)</code></a>: يتحقق من وجود عنصر معين في حقل المصفوفة.</p></li>
<li><p><a href="/docs/ar/v2.6.x/array-operators.md#ARRAYCONTAINSALL"><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code></a>: يضمن وجود جميع عناصر القائمة المحددة في حقل المصفوفة.</p></li>
<li><p><a href="/docs/ar/v2.6.x/array-operators.md#ARRAYCONTAINSANY"><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code></a>: يتحقق من وجود أي عنصر من القائمة المحددة في حقل المصفوفة.</p></li>
<li><p><a href="/docs/ar/v2.6.x/array-operators.md#ARRAYLENGTH"><code translate="no">ARRAY_LENGTH(identifier)</code></a>: يُرجع عدد العناصر الموجودة في حقل المصفوفة ويمكن دمجه مع عوامل المقارنة للتصفية.</p></li>
</ul>
<h2 id="ARRAYCONTAINS" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p>يتحقق عامل التشغيل <code translate="no">ARRAY_CONTAINS</code> من وجود عنصر معين في حقل المصفوفة. وهو مفيد عندما تريد العثور على الكيانات التي يوجد فيها عنصر معين في المصفوفة.</p>
<p><strong>مثال</strong></p>
<p>لنفترض أن لديك حقل صفيف <code translate="no">history_temperatures</code> ، الذي يحتوي على أدنى درجات الحرارة المسجلة لسنوات مختلفة. للعثور على جميع الكيانات التي يحتوي الصفيف فيها على القيمة <code translate="no">23</code> ، يمكنك استخدام تعبير التصفية التالي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>سيؤدي هذا إلى إرجاع جميع الكيانات التي يحتوي فيها المصفوف « <code translate="no">history_temperatures</code> » على القيمة « <code translate="no">23</code> ».</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">ARRAY_CONTAINS_ALL<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>يضمن عامل التشغيل <code translate="no">ARRAY_CONTAINS_ALL</code> وجود جميع عناصر القائمة المحددة في حقل المصفوفة. ويُعد هذا العامل مفيدًا عندما تريد مطابقة الكيانات التي تحتوي على قيم متعددة في المصفوفة.</p>
<p><strong>مثال</strong></p>
<p>إذا كنت تريد العثور على جميع الكيانات التي يحتوي مصفوفة <code translate="no">history_temperatures</code> فيها على كل من <code translate="no">23</code> و <code translate="no">24</code> ، فيمكنك استخدام:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>سيؤدي هذا إلى إرجاع جميع الكيانات التي يحتوي فيها المصفوف <code translate="no">history_temperatures</code> على كلتا القيمتين المحددتين.</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">ARRAY_CONTAINS_ANY<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>يتحقق عامل التشغيل <code translate="no">ARRAY_CONTAINS_ANY</code> من وجود أي عنصر من العناصر الموجودة في القائمة المحددة في حقل المصفوفة. ويكون هذا مفيدًا عندما تريد مطابقة الكيانات التي تحتوي على قيمة واحدة على الأقل من القيم المحددة في المصفوفة.</p>
<p><strong>مثال</strong></p>
<p>للعثور على جميع الكيانات التي يحتوي مصفوفة <code translate="no">history_temperatures</code> الخاصة بها على إما <code translate="no">23</code> أو <code translate="no">24</code> ، يمكنك استخدام:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>سيؤدي هذا إلى إرجاع جميع الكيانات التي يحتوي فيها المصفوفة <code translate="no">history_temperatures</code> على قيمة واحدة على الأقل من القيم <code translate="no">23</code> أو <code translate="no">24</code>.</p>
<h2 id="ARRAYLENGTH" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH" class="anchor-icon" translate="no">
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
    </button></h2><p>تُرجع دالة <code translate="no">ARRAY_LENGTH</code> طول (عدد عناصر) حقل المصفوفة. وهي تقبل معلمة واحدة فقط: معرف حقل المصفوفة.</p>
<p><strong>مثال</strong></p>
<p>للعثور على جميع الكيانات التي يحتوي فيها المصفوفة <code translate="no">history_temperatures</code> على أقل من 10 عناصر:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>سيؤدي هذا إلى إرجاع جميع الكيانات التي يحتوي مصفوفة <code translate="no">history_temperatures</code> الخاصة بها على أقل من 10 عناصر.</p>
