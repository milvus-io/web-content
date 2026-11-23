---
id: scalar_index.md
related_key: scalar_index
summary: >-
  قارن بين أنواع الفهارس القياسية، وتحقق من توافق الحقول، وافهم كيفية الاختيار
  التلقائي للفهارس.
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
    </button></h1><p>يمكن للفهارس القياسية تسريع <a href="/docs/ar/boolean.md">عملية التصفية</a> في الحقول غير المتجهة. استخدم هذه النظرة العامة لاختيار فهرس، والتحقق من توافق الحقول، وفهم عملية الاختيار التلقائي.</p>
<p>ضع في اعتبارك فهرسة الحقول المستخدمة في عمليات التصفية المتكررة أو البطيئة. لكل حقل تضمه في طلب إنشاء الفهرس، اختر أحد الخيارين التاليين:</p>
<ul>
<li><strong>تحديد نوع الفهرس:</strong> اختر نوعًا متوافقًا مع نوع بيانات الحقل ومعايير التصفية الخاصة بك.</li>
<li><strong>استخدم " <code translate="no">AUTOINDEX</code>":</strong> اضبط " <code translate="no">index_type</code> " على " <code translate="no">AUTOINDEX</code> " للسماح لـ Milvus باختيار النوع. راجع <a href="#AUTOINDEX-behavior">سلوك AUTOINDEX</a>.</li>
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
    </button></h2><p><a id="Supported-predicates"></a>
<a id="Comparisons-and-membership"></a>
<a id="String-patterns"></a></p>
<p>افتح دليل الفهرس للاطلاع على عوامل التصفية والمعلمات المدعومة وخطوات الإنشاء:</p>
<table>
<thead>
<tr><th>نوع الفهرس</th><th>يُستخدم لـ</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/ar/inverted.md">INVERTED</a></td><td>مرشحات المساواة والعضوية والنطاق.</td></tr>
<tr><td><a href="/docs/ar/bitmap.md">BITMAP</a></td><td>الحقول التي تحتوي على عدد قليل من القيم المتميزة، مثل رموز الحالة.</td></tr>
<tr><td><a href="/docs/ar/stl-sort.md">STL_SORT</a></td><td>عمليات البحث عن القيم وفلاتر النطاق.</td></tr>
<tr><td><a href="/docs/ar/trie.md">TRIE</a></td><td>عمليات البحث الدقيق عن السلاسل ومطابقة البادئات في الحقول ذات النوع " <code translate="no">VARCHAR</code> ".</td></tr>
<tr><td><a href="/docs/ar/ngram.md">NGRAM</a></td><td>مرشحات LIKE والتعبيرات النمطية المؤهلة.</td></tr>
<tr><td><a href="/docs/ar/rtree.md">RTREE</a></td><td>مرشحات مكانية على حقول <code translate="no">GEOMETRY</code>.</td></tr>
</tbody>
</table>
<p>تحقق من جدول توافق الحقول أدناه ودعم المرشحات في الفهرس المحدد قبل إنشاء الفهرس.</p>
<p><details id="Filter-execution">
<summary><strong>كيف تستخدم المرشحات الفهارس</strong></summary></p>
<p>يخدم الفهرس التعبيرات المؤهلة فقط؛ بينما يمكن للمرشحات الأخرى مسح البيانات. لا ترث العمليات الحسابية والمقارنات بين الحقول تسريع البحث عن القيم الحرفية. بالنسبة للتركيبات المنطقية واختبارات NULL، راجع " <a href="/docs/ar/basic-operators.md">المشغلات الأساسية</a>".</p>
<p></details></p>
<p><a id="Choosing-a-scalar-index"></a></p>
<h2 id="Supported-field-types" class="common-anchor-header">أنواع الحقول المدعومة<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Array-JSON-and-spatial-predicates"></a>
<a id="JSON-field-indexing"></a></p>
<p>ابحث عن نوع بيانات الحقل لمعرفة الفهارس الصريحة المدعومة له. في صفوف المصفوفات، تعني عبارة " <code translate="no">ARRAY&lt;T&gt;</code> " (تحديد الحقل) ما يلي: <code translate="no">ARRAY</code> مع <code translate="no">element_type=T</code>:</p>
<table>
<thead>
<tr><th>نوع الحقل</th><th>أنواع الفهارس الصريحة</th><th>الشروط</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">INVERTED</code>، <code translate="no">BITMAP</code></td><td>لا تدعم الحقول المنطقية ذات القيم العددية <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">INT8</code>، <code translate="no">INT16</code> ، <code translate="no">INT32</code> ، <code translate="no">INT64</code></td><td><code translate="no">INVERTED</code>، <code translate="no">BITMAP</code> ، <code translate="no">STL_SORT</code></td><td><code translate="no">BITMAP</code> غير متاح في حقول المفتاح الأساسي.</td></tr>
<tr><td><code translate="no">FLOAT</code>، <code translate="no">DOUBLE</code></td><td><code translate="no">INVERTED</code>، <code translate="no">STL_SORT</code></td><td><code translate="no">BITMAP</code> الصريح غير متاح.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code>، <code translate="no">BITMAP</code> ، <code translate="no">STL_SORT</code> ، <code translate="no">TRIE</code> ، <code translate="no">NGRAM</code></td><td><code translate="no">BITMAP</code> غير متاح في حقول المفتاح الأساسي. انظر <a href="#String-pattern-indexes">اختيار الفهرس حسب المرشح</a>.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td>انظر <a href="/docs/ar/timestamptz-field.md">حقل TIMESTAMPTZ</a>.</td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td>انظر <a href="/docs/ar/rtree.md">RTREE</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">INVERTED</code>، <code translate="no">BITMAP</code></td><td>انظر <a href="/docs/ar/array_data_type.md#Array-index-support">دعم فهرس المصفوفة</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code>، <code translate="no">ARRAY&lt;INT16&gt;</code> ، <code translate="no">ARRAY&lt;INT32&gt;</code> ، <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">INVERTED</code>، <code translate="no">BITMAP</code></td><td>انظر <a href="/docs/ar/array_data_type.md#Array-index-support">دعم مؤشر المصفوفة</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>، <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">INVERTED</code></td><td>انظر <a href="/docs/ar/array_data_type.md#Array-index-support">دعم مؤشرات المصفوفات</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">INVERTED</code>، <code translate="no">BITMAP</code></td><td>انظر <a href="/docs/ar/array_data_type.md#Array-index-support">دعم مؤشر المصفوفة</a>.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>يعتمد على المسار المفهرس ونوع التحويل.</td><td>تحقق من <a href="/docs/ar/json-indexing.md#Understand-cast-types">توافق مسار JSON ومتطلباته</a>.</td></tr>
<tr><td>الحقول الفرعية غير المتجهة في StructArray</td><td>يعتمد على نوع بيانات الحقل الفرعي.</td><td>قم بفهرسة الحقول الفرعية بشكل منفصل؛ لا يمكن للحقول الفرعية من نوع " <code translate="no">BOOL</code> " استخدام " <code translate="no">STL_SORT</code>" بشكل صريح. انظر <a href="/docs/ar/index-structarray-fields.md#Create-scalar-indexes">قواعد الحقول الفرعية</a>.</td></tr>
<tr><td><code translate="no">TEXT</code></td><td>لا شيء</td><td>الفهارس القياسية التي أنشأها المستخدم، بما في ذلك <code translate="no">AUTOINDEX</code> ، غير متوفرة.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>لا تدعم الفهارس القياسية، بما في ذلك <code translate="no">AUTOINDEX</code> ، الحقول ARRAY التكرارية أو المصفوفات ذات العناصر القابلة للقيمة الفارغة. راجع <a href="/docs/ar/array_data_type.md#Array-index-support">دعم فهرس المصفوفة</a> لمرشحات المصفوفات العادية <a href="/docs/ar/index-structarray-fields.md#Create-scalar-indexes">وفهرسة حقول StructArray</a> للاطلاع على قواعد الحقول الفرعية.</p>
</blockquote>
</div>
<p><details id="String-pattern-indexes">
<summary><strong>اختر فهرسًا لمرشحات VARCHAR</strong></summary></p>
<p>بالنسبة لحقل <code translate="no">VARCHAR</code> ، قارن بين الفهارس المتوافقة بناءً على عوامل التصفية الخاصة بك:</p>
<table>
<thead>
<tr><th>حاجة التصفية</th><th>إرشادات الفهرس وشروطه</th></tr>
</thead>
<tbody>
<tr><td>عمليات البحث عن سلاسل نصية مطابقة تمامًا والبادئات</td><td><a href="/docs/ar/trie.md#Queries-accelerated-by-TRIE">TRIE</a> أو <a href="/docs/ar/stl-sort.md#Queries-accelerated-by-STLSORT">STL_SORT</a> أو <a href="/docs/ar/inverted.md#Queries-accelerated-by-INVERTED">INVERTED</a>.</td></tr>
<tr><td>عدد قليل من قيم السلاسل المتميزة</td><td><a href="/docs/ar/bitmap.md#Queries-accelerated-by-BITMAP">BITMAP</a>؛ يتم تقييم الأنماط مقابل القيم المفهرسة.</td></tr>
<tr><td>LIKE أو regex مع قيم ثابتة مناسبة</td><td><a href="/docs/ar/ngram.md#Queries-accelerated-by-NGRAM">NGRAM</a> على حقول <code translate="no">VARCHAR</code> أو مسارات سلاسل JSON، مع مراعاة شروط طول الجرام وإعادة الفحص.</td></tr>
<tr><td>Regex بدون قيم ثابتة قابلة للاستخدام</td><td>يمكن للاستعلام مسح البيانات أو تقييم العديد من القيم المفهرسة؛ تحقق من شروط الفهرس المحدد.</td></tr>
</tbody>
</table>
<p>تستخدم النطاقات في <code translate="no">VARCHAR</code> ترتيب السلاسل، حتى عندما تحتوي السلاسل على أرقام. يعتمد استخدام الفهرس على تخطيط الاستعلام، والقيم الثابتة القابلة للاستخراج، والعددية، وتوزيع البيانات. راجع <a href="/docs/ar/pattern-matching.md#Accelerate-pattern-matching-with-indexes">مطابقة الأنماط</a> للاطلاع على قواعد التخطيط. بالنسبة لمسارات سلاسل JSON، تحقق من متطلبات المسار والتحويل في <a href="/docs/ar/json-indexing.md">فهرسة JSON</a>.</p>
<p></details></p>
<p><a id="How-AUTOINDEX-selects"></a></p>
<h2 id="AUTOINDEX-behavior" class="common-anchor-header">سلوك AUTOINDEX<button data-href="#AUTOINDEX-behavior" class="anchor-icon" translate="no">
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
    </button></h2><p>اضبط " <code translate="no">index_type</code> " على " <code translate="no">AUTOINDEX</code> " في تعريف فهرس كل حقل محدد. يختار Milvus النوع باستخدام نوع البيانات، وعند الاقتضاء، عدد القيم المتميزة في كل عملية إنشاء فهرس:</p>
<table>
<thead>
<tr><th>نوع الحقل</th><th>الاختيار الافتراضي</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>، <code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>، <code translate="no">INT16</code> ، <code translate="no">INT32</code> ، <code translate="no">INT64</code> ، <code translate="no">FLOAT</code> ، <code translate="no">DOUBLE</code> ، <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> لأقل من 100 قيمة مميزة؛ وإلا فـ <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">ARRAY</code> مع تعيين <code translate="no">element_type</code> على <code translate="no">INT8</code> ، <code translate="no">INT16</code> ، <code translate="no">INT32</code> ، <code translate="no">INT64</code> ، <code translate="no">FLOAT</code> ، <code translate="no">DOUBLE</code> ، أو <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> لعدد أقل من 100 عنصر مميز؛ وإلا <code translate="no">INVERTED</code>.</td></tr>
<tr><td><code translate="no">JSON</code> يتم تحويل المسارات إلى <code translate="no">BOOL</code> أو <code translate="no">DOUBLE</code> أو <code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code> بشكل افتراضي في الإصدار 3.0. يتيح <a href="/docs/ar/json-indexing.md#Index-requirements">إعداد JSON الاختياري</a> الاستراتيجية القيمية للخرائط النقطية/المرتبة المذكورة أعلاه.</td></tr>
<tr><td><code translate="no">JSON</code> يتم تحويل المسارات إلى <code translate="no">ARRAY_BOOL</code> أو <code translate="no">ARRAY_DOUBLE</code> أو <code translate="no">ARRAY_VARCHAR</code></td><td>استخدم <code translate="no">INVERTED</code> صراحةً؛ حيث يرفض التعيين الافتراضي في الإصدار 3.0.6 الاختيار التلقائي لهذه التحويلات.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>غير مدعوم.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>بالنسبة لحقل سكالاري مدعوم، فإن تعريف الفهرس الذي يغفل <code translate="no">index_type</code> يطلب أيضًا الاختيار التلقائي. لا يتم فهرسة الحقول غير المدرجة في الطلب.</p>
</blockquote>
</div>
<p><a id="Version-compatibility"></a></p>
<p><details>
<summary><strong>تفاصيل الاختيار</strong></summary></p>
<ul>
<li><strong>التخطيطات الداخلية:</strong> يمكن لـ <code translate="no">AUTOINDEX</code> اختيار تخطيطات غير متوفرة كخيارات صريحة، مثل فهرسة الصور النقطية لـ <code translate="no">FLOAT</code> و <code translate="no">DOUBLE</code>. تُسمى الاستراتيجية القائمة على الكاردينالية داخليًا بـ <code translate="no">HYBRID</code> ؛ ولا يمكنك تحديدها مباشرةً. يحدد الفهرس المحدد المرشحات التي يمكنها استخدامه.</li>
<li><strong>عتبة الكاردينالية:</strong> <a id="Cardinality-threshold"></a>اضبط <code translate="no">bitmap_cardinality_limit</code> (النطاق: 1–1000) لتجاوز العتبة الافتراضية. تستخدم القيم الأقل من هذه العتبة تخطيط الصورة النقطية؛ أما عند هذه العتبة أو أعلى منها، فيُطبق تخطيط الكاردينالية العالية لنوع البيانات. تتجاوز عمليات الإنشاء الصريحة <code translate="no">INVERTED</code> و <code translate="no">STL_SORT</code> و <code translate="no">BITMAP</code> عملية الاختيار القائمة على الكاردينالية وتتجاهل هذه العتبة.</li>
<li><strong>تجاوزات المسؤول:</strong> قم بتغيير تعيينات الأنواع من خلال <code translate="no">scalarAutoIndex.params.build</code>. لا يزال <code translate="no">scalarAutoIndex.enable=false</code> (الافتراضي) يسمح بـ <code translate="no">AUTOINDEX</code> الصريح؛ كما يطبق <code translate="no">true</code> الاختيار التلقائي على الطلبات اليدوية الصالحة.</li>
</ul>
<p></details></p>
<h2 id="Whats-next" class="common-anchor-header">ما هي الخطوة التالية<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Performance-considerations"></a>
<a id="Estimating-memory-requirements"></a></p>
<p>اختر دليلًا لمهمتك التالية:</p>
<ul>
<li><strong>إنشاء فهرس:</strong> استخدم <a href="#Index-types">دليل الفهرس</a> للاطلاع على المعلمات وأمثلة الإنشاء.</li>
<li><strong>تخطيط الموارد:</strong> راجع إرشادات الذاكرة الخاصة بـ <a href="/docs/ar/stl-sort.md#Memory-considerations">STL_SORT</a> أو <a href="/docs/ar/bitmap.md#Memory-considerations">BITMAP</a> أو <a href="/docs/ar/inverted.md#Memory-considerations">INVERTED</a> أو <a href="/docs/ar/ngram.md#Memory-considerations">NGRAM</a>. قارن استخدام الذاكرة ووقت الإنشاء وزمن استجابة الاستعلام باستخدام بيانات وفلاتر تمثيلية.</li>
<li><strong>تكوين البحث النصي:</strong> تغطي " <a href="/docs/ar/keyword-match.md">مطابقة النص</a> " و" <a href="/docs/ar/full-text-search.md">البحث النصي الكامل</a> " تحليل النص وBM25 و <code translate="no">TEXT_MATCH</code> و <code translate="no">PHRASE_MATCH</code>. لا يتيح الفهرس القياسي <code translate="no">INVERTED</code> هذه الآليات.</li>
</ul>
<p><details id="Drop-index-compatibility">
<summary><strong>إزالة الفهارس القياسية في الإصدارات القديمة من Milvus</strong></summary></p>
<p>في Milvus الإصدار 2.6.3 أو ما قبله، قم بتحرير المجموعة قبل حذف الفهرس القياسي. بدءًا من الإصدار 2.6.4 فصاعدًا، يمكنك حذفه دون تحرير المجموعة.</p>
<p></details></p>
