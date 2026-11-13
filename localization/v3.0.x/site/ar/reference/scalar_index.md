---
id: scalar_index.md
related_key: scalar_index
summary: >-
  تعمل الفهارس القياسية على تسريع عملية التصفية في الحقول غير المتجهة. يشرح هذا
  الدليل كيفية قيام Milvus باختيار الفهارس القياسية، وأنواع الفهارس التي يمكنك
  تحديدها، وأنواع البيانات التي يدعمها كل فهرس.
title: الفهرس القياسي
---
<h1 id="Scalar-Index" class="common-anchor-header">الفهرس القياسي<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>تعمل الفهارس القياسية على تسريع عملية التصفية في الحقول غير المتجهة، مثل الفئات والأسعار والطوابع الزمنية والمواقع. عندما يضيق تعبير التصفية نطاق البحث، تسمح الفهرس القياسي لـ Milvus بتحديد الكيانات المطابقة دون الحاجة إلى مسح الحقل.</p>
<p>إذا كنت غير متأكد من الفهرس الذي يجب اختياره، فاستخدم <code translate="no">AUTOINDEX</code>. لا تحدد نوع الفهرس يدويًا إلا عندما تحتاج إلى سلوك معين.</p>
<h2 id="Choosing-a-scalar-index" class="common-anchor-header">اختيار فهرس سكالاري<button data-href="#Choosing-a-scalar-index" class="anchor-icon" translate="no">
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
    </button></h2><p>يسرد الجدول التالي الفهرس الذي يختاره Milvus افتراضيًا عند استخدام <code translate="no">AUTOINDEX</code> ، إلى جانب أنواع الفهارس التي يمكنك تحديدها يدويًّا لكل نوع من أنواع البيانات.</p>
<table>
<thead>
<tr><th>نوع البيانات</th><th>الافتراضي لـ AUTOINDEX</th><th>أنواع الفهارس اليدوية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>، <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>، <code translate="no">INT16</code> ، <code translate="no">INT32</code> ، <code translate="no">INT64</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>، <code translate="no">BITMAP</code> ، <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">FLOAT</code>، <code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>، <code translate="no">BITMAP</code> ، <code translate="no">STL_SORT</code> ، <code translate="no">TRIE</code> ، <code translate="no">NGRAM</code> ، <code translate="no">FMINDEX</code></td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">JSON</code> مع تحويل إلى قيمة عددية أو مصفوفة محددة النوع</td><td><code translate="no">HYBRID</code></td><td>يعتمد على <code translate="no">json_cast_type</code> ؛ انظر <a href="#JSON-field-indexing">فهرسة حقول JSON</a>.</td></tr>
<tr><td><code translate="no">JSON</code> مع <code translate="no">json_cast_type=&quot;JSON&quot;</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>، <code translate="no">BITMAP</code> ، <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code> من خلال <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>، <code translate="no">BITMAP</code> ، <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>، <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>، <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>، <code translate="no">BITMAP</code> ، <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>غير مدعوم</td><td>لا شيء</td></tr>
</tbody>
</table>
<p><code translate="no">HYBRID</code> هي استراتيجية داخلية، وليست نوعًا يمكنك تحديده مباشرةً. انظر <a href="#How-AUTOINDEX-selects">كيفية اختيار AUTOINDEX</a>.</p>
<p>تنطبق القيود التالية:</p>
<ul>
<li><strong>المفاتيح الأساسية:</strong> لا يتوفر <code translate="no">BITMAP</code> في حقول المفاتيح الأساسية.</li>
<li><strong>المصفوفات:</strong> لا تدعم المصفوفات التكرارية والمصفوفات ذات العناصر القابلة للقيمة الفارغة الفهرسة القياسية، بما في ذلك <code translate="no">AUTOINDEX</code>. تدعم المصفوفات العادية العناصر المنطقية، والأعداد الصحيحة، والأعداد العائمة، وعناصر VARCHAR.</li>
<li><strong>مصفوفات الهياكل:</strong> قم بفهرسة الحقول الفرعية القياسية بشكل فردي. قد يختلف دعمها عن المصفوفات العادية؛ على سبيل المثال، لا يدعم الحقل الفرعي من نوع Boolean في الهياكل <code translate="no">STL_SORT</code> الصريح.</li>
<li><strong>TEXT:</strong> الفهارس القياسية التي ينشئها المستخدم، بما في ذلك <code translate="no">AUTOINDEX</code> ، غير متوفرة. يستخدم تحليل النص والبحث BM25 آليات منفصلة.</li>
</ul>
<h2 id="Index-types" class="common-anchor-header">أنواع الفهارس<button data-href="#Index-types" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>نوع الفهرس</th><th>الغرض</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>مرشحات المساواة والانتماء والنطاق للأغراض العامة.</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>الحقول ذات القيم المتميزة القليلة؛ التصفية المدمجة على مستوى البتات.</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>عمليات البحث عن القيم المرتبة وتصفية النطاقات.</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>المساواة بين السلاسل ومطابقة البادئات.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>استخدام LIKE والتعبيرات النمطية على السلاسل عن طريق تضييق نطاق المرشحين.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>المطابقة الدقيقة لسلسلة فرعية في البادئة واللاحقة والوسط.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td>التصفية المكانية لحقول GEOMETRY.</td></tr>
</tbody>
</table>
<p>للاطلاع على أمثلة الإنشاء ومعلمات الفهرس والاستعلامات المدعومة، راجع <a href="/docs/ar/bitmap.md">BITMAP</a> و <a href="/docs/ar/inverted.md">INVERTED</a> و <a href="/docs/ar/ngram.md">NGRAM</a> و <a href="/docs/ar/stl-sort.md">STL_SORT</a> و <a href="/docs/ar/trie.md">TRIE</a> و <a href="/docs/ar/fmindex.md">FMINDEX</a> و <a href="/docs/ar/rtree.md">RTREE</a>.</p>
<h2 id="How-AUTOINDEX-selects" class="common-anchor-header">كيفية اختيار AUTOINDEX<button data-href="#How-AUTOINDEX-selects" class="anchor-icon" translate="no">
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
    </button></h2><p>باستخدام <code translate="no">AUTOINDEX</code> ، يختار Milvus الفهرس بناءً على نوع الحقل وتكوين الخادم، وبالنسبة لبعض الحقول، عدد القيم المتميزة (العددية). ترد الاختيارات الافتراضية في قسم <a href="#Choosing-a-scalar-index">«اختيار فهرس سكالاري</a>».</p>
<p>بالنسبة لمعظم الحقول، يستخدم <code translate="no">AUTOINDEX</code> استراتيجية داخلية تُعرف باسم «الترتيب حسب الكاردينالية» ( <code translate="no">HYBRID</code> ) التي تختار الفهرس بناءً على الكاردينالية:</p>
<ul>
<li><strong><code translate="no">BITMAP</code></strong> عندما يحتوي البناء على أقل من 100 قيمة مميزة.</li>
<li><strong><code translate="no">STL_SORT</code></strong> عندما يحتوي البناء على 100 قيمة مميزة أو أكثر.</li>
</ul>
<p>تستخدم فهارس المصفوفات سياسة توافق منفصلة: يستخدم فرع الكاردينالية العالية منها <code translate="no">STL_SORT</code> عندما تدعمه المجموعة، و <code translate="no">INVERTED</code> في الحالات الأخرى. انظر <a href="#Version-compatibility">توافق الإصدارات</a>.</p>
<p><code translate="no">HYBRID</code> هي داخلية فقط — لا يمكنك تحديدها مباشرةً. يمكن أن يستخدم الاختيار الداخلي أيضًا فهرسًا غير متاح كخيار صريح لهذا الحقل، مثل فهرسة الصور النقطية للقيم ذات العلامة العائمة.</p>
<blockquote>
<p>هذه الاختيارات هي الإعدادات الافتراضية. يمكن للمسؤولين تغييرها من خلال <code translate="no">scalarAutoIndex.params.build</code>. الإعداد الافتراضي لـ <code translate="no">scalarAutoIndex.enable</code> هو <code translate="no">false</code> ، والذي لا يزال يسمح بـ <code translate="no">AUTOINDEX</code> والاختيار الصريح عند حذف نوع الفهرس؛ كما أن ضبطه على <code translate="no">true</code> يطبق أيضًا الاختيار التلقائي على الطلبات اليدوية الصالحة بخلاف ذلك.</p>
</blockquote>
<h2 id="JSON-field-indexing" class="common-anchor-header">فهرسة حقول JSON<button data-href="#JSON-field-indexing" class="anchor-icon" translate="no">
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
    </button></h2><p>لفهرسة قيم JSON، حدد <code translate="no">json_cast_type</code> للإشارة إلى نوع القيم المراد فهرستها. هذه المعلمة مطلوبة لكل من الفهرسة التلقائية واليدوية. استخدم <code translate="no">json_path</code> لتحديد المسار؛ إذا تم حذفه، يستخدم Milvus اسم الحقل المقدم في الطلب.</p>
<table>
<thead>
<tr><th>json_cast_type</th><th>الافتراضي لـ AUTOINDEX</th><th>أنواع الفهرسة اليدوية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>، <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>، <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>، <code translate="no">BITMAP</code> ، <code translate="no">STL_SORT</code> ، <code translate="no">NGRAM</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
</tbody>
</table>
<p>يختار التحويل <code translate="no">JSON</code> الفهرسة الكاملة لـ JSON بدلاً من فهرس مسار سكالي من نوع معين، ويغير الإعداد الافتراضي لـ <code translate="no">AUTOINDEX</code> من <code translate="no">HYBRID</code> إلى <code translate="no">INVERTED</code>.</p>
<p>يقوم التحويل الاختياري <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> بتحويل القيم النصية لعملية التحويل <code translate="no">DOUBLE</code>. ولا يمكن استخدامه مع أنواع التحويل الأخرى. ولا يدعم كل من <code translate="no">TRIE</code> و <code translate="no">FMINDEX</code> حقول JSON.</p>
<h2 id="Supported-predicates" class="common-anchor-header">المسندات المدعومة<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>توضح الجداول التالية المسندات التي يمكن لكل فهرس المساعدة في تقييمها. <strong>لا يضمن دعم الفهرس أن Milvus سيستخدم الفهرس في كل استعلام.</strong> يمكن لـ Milvus مسح بيانات الحقول عندما يكون الفهرس غير مناسب لتعبير أو نمط معين.</p>
<h3 id="Comparisons-and-membership" class="common-anchor-header">المقارنات والعضوية<button data-href="#Comparisons-and-membership" class="anchor-icon" translate="no">
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
    </button></h3><p>تشمل المساواة والعضوية <code translate="no">==</code> و <code translate="no">!=</code> و <code translate="no">in</code> و <code translate="no">not in</code>. تشمل مقارنات النطاق <code translate="no">&lt;</code> و <code translate="no">&lt;=</code> و <code translate="no">&gt;</code> و <code translate="no">&gt;=</code> ، والتعبيرات مثل <code translate="no">10 &lt;= price &lt; 50</code>.</p>
<table>
<thead>
<tr><th>نوع الفهرس</th><th>أنواع بيانات الحقول</th><th>المسندات التي يدعمها الفهرس</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td><code translate="no">BOOL</code></td><td>المساواة والانتماء</td></tr>
<tr><td><code translate="no">INVERTED</code></td><td>الأعداد الصحيحة، <code translate="no">FLOAT</code> ، <code translate="no">DOUBLE</code> ، <code translate="no">VARCHAR</code></td><td>المساواة والانتماء والنطاقات</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td><code translate="no">BOOL</code></td><td>المساواة والانتماء</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>الأعداد الصحيحة، <code translate="no">VARCHAR</code></td><td>المساواة والانتماء والنطاقات</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>الأعداد الصحيحة، <code translate="no">FLOAT</code> ، <code translate="no">DOUBLE</code> ، <code translate="no">TIMESTAMPTZ</code> ، <code translate="no">VARCHAR</code></td><td>المساواة والانتماء والنطاقات</td></tr>
<tr><td><code translate="no">TRIE</code></td><td><code translate="no">VARCHAR</code></td><td>المساواة والانتماء والنطاقات؛ قد يؤدي تقييم النطاق إلى زيارة عدة سلاسل مفهرسة</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td><code translate="no">VARCHAR</code></td><td>أنماط السلاسل فقط؛ لا يوجد بحث مباشر عن المساواة أو الانتماء أو النطاق</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">VARCHAR</code></td><td>أنماط السلاسل فقط؛ لا يوجد بحث مباشر عن المساواة أو الانتماء أو النطاق</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td>المسندات المكانية، المذكورة أدناه</td></tr>
<tr><td><code translate="no">AUTOINDEX</code></td><td>أنواع القيم العددية المدعومة</td><td>يعتمد على الفهرس المحدد. تستخدم عمليات الاختيار الداخلية لـ <code translate="no">HYBRID</code> إمكانيات الفهرس النقطي أو المفروز أو المقلوب الخاص بها.</td></tr>
</tbody>
</table>
<p>تقوم نطاقات VARCHAR بمقارنة قيم السلاسل بدلاً من تفسيرها كأرقام. يصف الجدول المقارنات مع القيم الحرفية فقط؛ ولا يعني ذلك أن التعبيرات الحسابية أو المقارنات بين حقلين تحصل على نفس تسريع الفهرس.</p>
<h3 id="String-patterns" class="common-anchor-header">أنماط السلاسل<button data-href="#String-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>ينطبق هذا الجدول على حقول VARCHAR. بالنسبة لمسارات سلاسل JSON، استخدم فهرسًا وتحويل " <code translate="no">VARCHAR</code> " المدعومين من قبل جدول فهرسة JSON؛ حيث ينطبق سلوك السلسلة المقابل.</p>
<ul>
<li><strong>نعم:</strong> يُرجع الفهرس التطابقات الدقيقة.</li>
<li><strong>التحقق من القيم المفهرسة:</strong> يقوم Milvus بتقييم النمط مقابل السلاسل المخزنة في الفهرس، مما قد يتطلب مراجعة العديد من السلاسل المختلفة.</li>
<li><strong>المرشحون:</strong> يضيق الفهرس نطاق التطابقات المحتملة، ثم يتحقق Milvus من القيم الأصلية.</li>
<li><strong>المسح:</strong> لا يخدم الفهرس الشرط؛ يستخدم Milvus مسارًا آخر مؤهلًا أو يقوم بمسح الحقل.</li>
</ul>
<table>
<thead>
<tr><th>نوع الفهرس</th><th>البادئة <code translate="no">like &quot;abc%&quot;</code></th><th>اللاحقة <code translate="no">like &quot;%abc&quot;</code></th><th>سلسلة فرعية <code translate="no">like &quot;%abc%&quot;</code></th><th>LIKE عام <code translate="no">like &quot;a%b_c&quot;</code></th><th>Regex <code translate="no">=~ &quot;a.*b&quot;</code></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>نعم</td><td>مسح</td><td>مسح</td><td>نعم</td><td>مسح</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>التحقق من القيم المفهرسة</td><td>التحقق من القيم المفهرسة</td><td>التحقق من القيم المفهرسة</td><td>تحقق من القيم المفهرسة</td><td>التحقق من القيم المفهرسة</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>نعم</td><td>تحقق من القيم المفهرسة</td><td>تحقق من القيم المفهرسة</td><td>التحقق من القيم المفهرسة</td><td>تحقق من القيم المفهرسة</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>نعم</td><td>تحقق من القيم المفهرسة</td><td>تحقق من القيم المفهرسة</td><td>التحقق من القيم المفهرسة</td><td>تحقق من القيم المفهرسة</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>المرشحون</td><td>المرشحون</td><td>المرشحون؛ دقيقون بالنسبة لعنصر حرفي ضمن نطاق طول الجرام المُعدّ مسبقًا</td><td>المرشحون</td><td>الخيارات</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>نعم</td><td>نعم</td><td>نعم</td><td>المرشحون</td><td>المرشحون</td></tr>
</tbody>
</table>
<p>تصف هذه المدخلات المشغل بعد تخطيط الاستعلام. يمكن لـ Milvus تبسيط نمط LIKE الحرفي إلى المساواة، وتبسيط تعبير عادي بسيط مثبت إلى المساواة أو مطابقة البادئة أو اللاحقة؛ على سبيل المثال، يصبح <code translate="no">name =~ &quot;^abc$&quot;</code> اختبار مساواة ويتبع جدول المساواة.</p>
<p><code translate="no">INVERTED</code> يعامل أشكال اللاحقة والسلسلة الفرعية البسيطة على أنها عمليات مسح حتى وإن كانت أنماط LIKE الأكثر تعقيدًا يمكنها استخدام الفهرس. يتطلب <code translate="no">NGRAM</code> نصًا حرفيًا بطول <code translate="no">min_gram</code> حرفًا على الأقل؛ ويتطلب LIKE العام أن تفي كل جزء حرفي غير فارغ بهذا الحد الأدنى، وتعتمد تسريع التعبيرات العادية على استخراج القيم الحرفية المناسبة. وإلا، يقوم Milvus بمسح البيانات. يمكن لـ <code translate="no">FMINDEX</code> أيضًا اختيار المسح عندما يوفر النمط تصفية مفيدة قليلة أو يكون حله عبر الفهرس مكلفًا للغاية.</p>
<p>هذه هي المسندات ذات القيم النصية. تستخدم الدوال القائمة على الرموز (Token-based functions) مثل <code translate="no">TEXT_MATCH</code> و <code translate="no">PHRASE_MATCH</code> فهرسة مطابقة النص التي يتم تكوينها من خلال خصائص الحقول؛ ولا يؤدي اختيار فهرس <code translate="no">INVERTED</code> سكالي إلى تمكين تلك الدوال.</p>
<h3 id="Array-JSON-and-spatial-predicates" class="common-anchor-header">المسندات الصفية من نوع المصفوفات وJSON والمسندات الصفية المكانية<button data-href="#Array-JSON-and-spatial-predicates" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>نوع الفهرس</th><th>نوع البيانات أو التحويل</th><th>المسندات التي يمكنها استخدام الفهرس</th><th>ملاحظات</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code>، <code translate="no">BITMAP</code> ، <code translate="no">STL_SORT</code> ، أو اختيار مؤهل من <code translate="no">AUTOINDEX</code> </td><td>المصفوفات العادية ذات أنواع العناصر المدعومة</td><td><code translate="no">ARRAY_CONTAINS</code>، <code translate="no">ARRAY_CONTAINS_ANY</code> ، <code translate="no">ARRAY_CONTAINS_ALL</code></td><td>تطابق العناصر بغض النظر عن موضعها. لا تزال قيود الفهرس/النوع سارية.</td></tr>
<tr><td><code translate="no">INVERTED</code>، <code translate="no">STL_SORT</code></td><td>المصفوفات العادية ذات القيم المنطقية أو الصحيحة أو VARCHAR</td><td><code translate="no">==</code> للمصفوفة بأكملها و <code translate="no">!=</code></td><td>يمكن استخدام المرشحين للفهرس متبوعًا بفحص المصفوفات الأصلية. تعود المصفوفات ذات النقاط العائمة إلى المسح؛ ولا تدعم الفهارس النقطية مسار المرشح هذا.</td></tr>
<tr><td><code translate="no">INVERTED</code>، <code translate="no">BITMAP</code> ، <code translate="no">STL_SORT</code> ، أو اختيار مؤهل من نوع <code translate="no">AUTOINDEX</code> </td><td>مسارات JSON التي يتم تحويلها إلى <code translate="no">BOOL</code> أو <code translate="no">DOUBLE</code> أو <code translate="no">VARCHAR</code></td><td>المقارنات والعضوية المناسبة لنوع التحويل</td><td>يجب أن يتطابق المسار المفهرس والتحويل مع الاستعلام. تتبع أنماط السلاسل الجدول السابق.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>مسارات JSON التي يتم تحويلها إلى <code translate="no">VARCHAR</code></td><td>أنماط LIKE و regex</td><td>تستخدم نفس قواعد أهلية الأنماط مثل فهارس VARCHAR NGRAM.</td></tr>
<tr><td><code translate="no">INVERTED</code>، أو <code translate="no">STL_SORT</code> ، أو اختيار <code translate="no">AUTOINDEX</code> مؤهل</td><td>مسارات JSON التي يتم تحويلها إلى <code translate="no">ARRAY_BOOL</code> أو <code translate="no">ARRAY_DOUBLE</code> أو <code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">JSON_CONTAINS</code>، أو <code translate="no">JSON_CONTAINS_ANY</code> ، <code translate="no">JSON_CONTAINS_ALL</code></td><td>يتطلب أنواع عناصر متوافقة. يمكن أن تعود المعاملات ذات الأنواع المختلطة أو المصفوفات المتداخلة إلى المسح.</td></tr>
<tr><td><code translate="no">INVERTED</code> مع التحويل <code translate="no">JSON</code></td><td>فهرس JSON الكامل</td><td>المقارنات والعضوية على مسارات القيم العددية المدعومة؛ أنماط السلاسل المدعومة؛ احتواء JSON على مسارات المصفوفات المدعومة</td><td>تتبع مسارات السلاسل سلوك INVERTED. يتطلب احتواء المصفوفات أنواع عناصر متوافقة.</td></tr>
<tr><td>فهارس مسارات JSON وفهارس JSON الكاملة</td><td>مسارات JSON المفهرسة</td><td><code translate="no">exists</code></td><td>يختبر ما إذا كان المسار موجودًا، وهو أمر يختلف عن اختبار قيمته أو ما إذا كان الحقل بأكمله فارغًا.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td><code translate="no">ST_EQUALS</code>، <code translate="no">ST_INTERSECTS</code> ، <code translate="no">ST_CONTAINS</code> ، <code translate="no">ST_WITHIN</code> ، <code translate="no">ST_TOUCHES</code> ، <code translate="no">ST_OVERLAPS</code> ، <code translate="no">ST_CROSSES</code> ، <code translate="no">ST_DWITHIN</code></td><td>يستخدم الصناديق المحيطة للعثور على العناصر المرشحة، ثم يتحقق من العلاقة المكانية الدقيقة. لا يستخدم <code translate="no">ST_ISVALID</code> RTREE.</td></tr>
</tbody>
</table>
<p>لا يعني دعم احتواء المصفوفة البحث في الفهرس عن عنصر في موضع محدد، مثل <code translate="no">values[0]</code> ، أو عن طول المصفوفة. يجب أن تتحقق المساواة في المصفوفة بأكملها أيضًا من الترتيب والطول، وهو ما لا يمكن أن يحدده انتماء العنصر وحده.</p>
<p><code translate="no">IS NULL</code> ويستخدم كل من <code translate="no">IS NOT NULL</code> معلومات الصحة ولا يتطلبان نوعًا معينًا من الفهارس القياسية. يمكنك دمج المسندات مع <code translate="no">and</code> و <code translate="no">or</code> و <code translate="no">not</code> ؛ حيث يمكن لكل جزء استخدام مسار التنفيذ المؤهل الخاص به.</p>
<h2 id="Version-compatibility" class="common-anchor-header">توافق الإصدارات<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>معظم الفهارس القياسية — <code translate="no">BITMAP</code> و <code translate="no">INVERTED</code> و <code translate="no">STL_SORT</code> و <code translate="no">TRIE</code> و <code translate="no">NGRAM</code> على الحقول القياسية العادية — لا تتطلب إصدارًا معينًا. تنطبق المتطلبات أدناه فقط على التركيبات الأحدث: الفهارس على حقول المصفوفات، وفهارس مسار JSON، و <code translate="no">FMINDEX</code>.</p>
<p>تستخدم هذه المتطلبات أرقام إصدارات محرك الفهرسة القياسية، وهو عداد قدرات داخلي يختلف عن أرقام إصدارات برنامج Milvus.</p>
<table>
<thead>
<tr><th>القدرة</th><th>المتطلب</th></tr>
</thead>
<tbody>
<tr><td>صريح <code translate="no">FMINDEX</code></td><td>الإصدار 5 أو أحدث من محرك الفهرس السكالي</td></tr>
<tr><td>صريح: استخدام " <code translate="no">STL_SORT</code> " على المصفوفات العادية</td><td>محرك الفهرسة السكالارية الإصدار 3 أو أحدث، مع تمكين دعم فرز المصفوفات</td></tr>
<tr><td><code translate="no">HYBRID</code> تحديد " <code translate="no">STL_SORT</code> " للمصفوفات العادية</td><td>محرك الفهرسة القياسية الإصدار 5 أو أحدث، مع تمكين دعم فرز المصفوفات</td></tr>
<tr><td><code translate="no">BITMAP</code>، أو " <code translate="no">STL_SORT</code>" ، أو " <code translate="no">HYBRID</code> " على مسارات القيم العددية في JSON</td><td>محرك الفهرسة القياسية الإصدار 4 أو أحدث</td></tr>
<tr><td><code translate="no">STL_SORT</code> أو <code translate="no">HYBRID</code> في مسارات المصفوفات JSON المحددة النوع</td><td>محرك الفهرسة العددية الإصدار 3 أو أحدث، مع تمكين دعم فرز المصفوفات</td></tr>
</tbody>
</table>
<p>إذا لم يتم استيفاء متطلبات التوافق مع المصفوفات أو JSON، فقد تعود الطلبات التلقائية المتأثرة إلى استخدام <code translate="no">INVERTED</code> ، وستفشل الطلبات الصريحة للتركيبات غير المدعومة. بالنسبة لـ <code translate="no">HYBRID</code> للمصفوفات العادية، يستمر الفرع ذو الكثافة العالية في استخدام <code translate="no">INVERTED</code> حتى يتوفر الفهرسة المرتبة.</p>
<h2 id="Performance-considerations" class="common-anchor-header">اعتبارات الأداء<button data-href="#Performance-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>يعتمد أداء الفهرس على توزيع البيانات والمرشحات التي يستخدمها تطبيقك. يمكن أن تؤثر الكاردينالية وطول السلسلة وطول المصفوفة وعدد الكيانات المتطابقة على استخدام الذاكرة وزمن استجابة الاستعلام. قارن بين الفهارس باستخدام بيانات تمثيلية وتعبيرات التصفية، وقم بقياس استخدام الذاكرة ووقت الإنشاء وزمن استجابة الاستعلام معًا.</p>
<h3 id="Estimating-memory-requirements" class="common-anchor-header">تقدير متطلبات الذاكرة<button data-href="#Estimating-memory-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>تقدم الصيغ التالية فكرة تقريبية عن الذاكرة التي يحتاجها الفهرس القياسي بعد التحميل، مع تعطيل تعيين الذاكرة. تفترض صيغ <code translate="no">STL_SORT</code> وجود حقول قياسية عادية بدون قيم فارغة.</p>
<ul>
<li><code translate="no">N</code>: عدد الكيانات.</li>
<li><code translate="no">D</code>: عدد القيم المتميزة.</li>
<li><code translate="no">l</code>: متوسط طول السلاسل المتميزة، <strong>بالبايت</strong>.</li>
<li><code translate="no">S</code>: حجم الفهرس الذي تم إنشاؤه قبل ضغط التخزين، <strong>بالبايت</strong>.</li>
</ul>
<table>
<thead>
<tr><th>نوع الفهرس</th><th>تقدير تقريبي للذاكرة بالبايت</th><th>المنطق</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">STL_SORT</code> على <code translate="no">INT8</code> ، <code translate="no">INT16</code> ، <code translate="no">INT32</code> ، أو <code translate="no">FLOAT</code></td><td><code translate="no">12 * N</code></td><td>حوالي 12 بايت لكل كيان.</td></tr>
<tr><td><code translate="no">STL_SORT</code> على <code translate="no">INT64</code> أو <code translate="no">DOUBLE</code> أو <code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">20 * N</code></td><td>حوالي 20 بايت لكل كيان للقيم الأكبر.</td></tr>
<tr><td><code translate="no">STL_SORT</code> على <code translate="no">VARCHAR</code></td><td><code translate="no">8 * N + (l + 16) * D</code></td><td>تتشارك السلاسل المتكررة مساحة التخزين، لذا فإن عدد السلاسل الفريدة الأقل يعني عادةً استخدام ذاكرة أقل.</td></tr>
<tr><td><code translate="no">BITMAP</code>، باستخدام خرائط بت كثيفة</td><td><code translate="no">(D + 1) * N / 8</code></td><td>تحتاج كل قيمة مميزة إلى حوالي بت واحد لكل كيان، بالإضافة إلى خريطة بت واحدة لتتبع الكيانات الصالحة.</td></tr>
<tr><td><code translate="no">INVERTED</code> أو <code translate="no">NGRAM</code></td><td><code translate="no">S</code></td><td>ابدأ بحجم يقارب حجم الفهرس الذي تم إنشاؤه.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">2 * S</code></td><td>اسمح بحوالي ضعف حجم الفهرس الذي تم إنشاؤه.</td></tr>
</tbody>
</table>
<p>قسّم النتيجة على <code translate="no">1024 * 1024</code> لتحويل البايتات إلى <strong>ميغابايت (MiB)</strong>. على سبيل المثال، يحتاج فهرس <code translate="no">STL_SORT</code> الذي يحتوي على مليون قيمة غير فارغة من نوع <code translate="no">INT64</code> إلى حوالي <strong>19 ميغابايت</strong> لهياكل البيانات الرئيسية الخاصة به. بالنسبة لحقول VARCHAR حيث تكون كل سلسلة فريدة، يُبسط التقدير إلى <code translate="no">(l + 24) * N</code> ؛ فمليون سلسلة فريدة بمتوسط 32 بايت تعطي حوالي <strong>53 ميغابايت</strong>.</p>
<p>تصف صيغة BITMAP التخزين الكثيف للخرائط النقطية؛ ويؤدي تمكين ذاكرة التخزين المؤقتة الاختيارية للإزاحة إلى إضافة حوالي <code translate="no">8 * N</code> بايت على نظام 64 بت. بالنسبة لـ <code translate="no">INVERTED</code> و <code translate="no">NGRAM</code> و <code translate="no">FMINDEX</code> ، قم بإنشاء فهرس على بيانات تمثيلية للحصول على <code translate="no">S</code> — لا يُعد حجم البيانات الأولية بديلاً عن حجم الفهرس الذي تم إنشاؤه. بالنسبة لـ <code translate="no">AUTOINDEX</code> ، استخدم الصيغة الخاصة بالفهرس المحدد فعليًّا، وقم بتطبيق التقديرات لكل مقطع، ثم اجمعها عبر المقاطع والنسخ المتماثلة التي تم تحميلها.</p>
<p>هذه أرقام تخطيط تقريبية، وليست حدودًا للذاكرة. وهي لا تشمل الذاكرة المؤقتة المستخدمة أثناء الإنشاء والتحميل والاستعلامات، كما أنها أكثر حساسية للقيم المتميزة وتوزيع البيانات بالنسبة لفهارس السلاسل والصور النقطية مقارنةً بال <code translate="no">STL_SORT</code> الرقمية. ولا توجد نسبة مئوية ثابتة مضمونة للدقة. يتطلب تخطيط الذاكرة، وتنسيقات الفهارس القديمة، والمصفوفات، وحقول JSON قياسًا منفصلاً. قبل تحديد حجم النشر، تحقق من الاستخدام الفعلي للذاكرة باستخدام بيانات واستعلامات تمثيلية، واترك مساحة احتياطية للاستخدام في أوقات الذروة.</p>
<h2 id="Whats-next" class="common-anchor-header">الخطوات التالية<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>للحصول على أمثلة لإنشاء الفهارس وتكوينها، راجع <a href="/docs/ar/bitmap.md">BITMAP</a> <a href="/docs/ar/inverted.md">وINVERTED</a> <a href="/docs/ar/ngram.md">وNGRAM</a> <a href="/docs/ar/stl-sort.md">وSTL_SORT</a> <a href="/docs/ar/trie.md">وTRIE</a> <a href="/docs/ar/fmindex.md">وFMINDEX</a> <a href="/docs/ar/rtree.md">وRTREE</a>.</li>
<li>للاطلاع على تعريفات الحقول ومخططات المجموعات، راجع <a href="/docs/ar/schema.md">شرح المخطط</a>.</li>
</ul>
