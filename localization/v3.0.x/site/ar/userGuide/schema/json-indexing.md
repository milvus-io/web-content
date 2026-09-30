---
id: json-indexing.md
title: فهرسة JSON
summary: >-
  توفر حقول JSON طريقة مرنة لتخزين البيانات الوصفية المنظمة في Milvus. وبدون
  الفهرسة، تتطلب الاستعلامات على حقول JSON إجراء عمليات مسح كاملة للمجموعة، وهو
  ما يؤدي إلى إبطاء الأداء مع نمو مجموعة البيانات الخاصة بك. تعمل فهرسة JSON على
  إنشاء فهارس لمسارات محددة داخل بيانات JSON الخاصة بك، بحيث يتم تنفيذ استعلامات
  المساواة والنطاق واستعلامات التصفية الأخرى على تلك المسارات بسرعة.
---
<h1 id="JSON-Indexing" class="common-anchor-header">فهرسة JSON<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>توفر حقول JSON طريقة مرنة لتخزين البيانات الوصفية المنظمة في Milvus. بدون الفهرسة، تتطلب الاستعلامات على حقول JSON إجراء عمليات مسح كاملة للمجموعة، مما يؤدي إلى بطء الأداء مع نمو مجموعة البيانات الخاصة بك. تعمل فهرسة JSON على إنشاء فهرس على مسار محدد داخل بيانات JSON الخاصة بك، بحيث يتم تنفيذ استعلامات المساواة والنطاق واستعلامات التصفية الأخرى على هذا المسار بسرعة.</p>
<p>تعد فهرسة JSON مثالية لما يلي:</p>
<ul>
<li><p>المخططات المنظمة ذات المفاتيح الثابتة والمعروفة</p></li>
<li><p>استعلامات المساواة و <code translate="no">IN</code> والنطاق ومطابقة النص على مسارات JSON محددة</p></li>
<li><p>السيناريوهات التي تحتاج فيها إلى تحكم دقيق في المفاتيح التي يتم فهرستها</p></li>
</ul>
<p>بالنسبة لمستندات JSON المعقدة ذات أنماط الاستعلام المتنوعة، ضع في اعتبارك استخدام <a href="/docs/ar/json-shredding.md">تقطيع JSON</a> كبديل.</p>
<h2 id="Index-type-overview" class="common-anchor-header">نظرة عامة على أنواع الفهرسة<button data-href="#Index-type-overview" class="anchor-icon" translate="no">
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
    </button></h2><p>يقدم Milvus أربعة أنواع من الفهارس لمسارات JSON. كل منها مناسب لنمط استعلام مختلف.</p>
<p>قبل اختيار نوع الفهرس، حدد <strong>نوع التحويل</strong> لمسار JSON. يحدد نوع التحويل كيفية تفسير Milvus للقيمة في ذلك المسار وأنواع الفهارس المتاحة.</p>
<h3 id="Understand-cast-types" class="common-anchor-header">فهم أنواع التحويل<button data-href="#Understand-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">json_cast_type</code> هو نوع البيانات المستخدم لتفسير وفهرسة القيمة الموجودة في <code translate="no">json_path</code>. وهو يختلف عن نوع مخطط الحقل: يظل الحقل حقلًا من نوع « <code translate="no">JSON</code> »، ولكن يتم التعامل مع كل مسار مفهرس على أنه نوع محدد من القيم العددية أو المصفوفات أو كائنات JSON.</p>
<p>اختر نوع التحويل الذي يتطابق مع القيم المخزنة في المسار. للتحقق مما إذا كان نوع التحويل يعمل مع نوع فهرس معين، راجع <a href="/docs/ar/json-indexing.md#compatibility-reference">مرجع التوافق</a>.</p>
<table>
<thead>
<tr><th>نوع التحويل</th><th>استخدمه عندما تكون قيمة المسار...</th><th>قيمة مثال</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>قيمة منطقية</td><td><code translate="no">true</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>قيمة عددية</td><td><code translate="no">99.99</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>قيمة سلسلة</td><td><code translate="no">&quot;electronics&quot;</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>مصفوفة من القيم المنطقية</td><td><code translate="no">[true, false]</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>مصفوفة من القيم العددية</td><td><code translate="no">[1.2, 3.14]</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>مصفوفة من القيم النصية</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td>كائن JSON كامل أو كائن فرعي. تم إهمال فهرسة كائنات JSON الكاملة بدءًا من الإصدار Milvus 3.0.0.</td><td><code translate="no">{&quot;supplier&quot;: {&quot;country&quot;: &quot;USA&quot;}}</code></td></tr>
</tbody>
</table>
<p>إذا كانت القيم الموجودة في نفس المسار ذات أنواع غير متسقة، فسيتم فهرسة القيم التي تتطابق مع نوع التحويل فقط. على سبيل المثال، إذا كان <code translate="no">metadata[&quot;price&quot;]</code> يحتوي على كل من <code translate="no">99.99</code> و <code translate="no">&quot;99.99&quot;</code> ، فإن الفهرس من نوع التحويل <code translate="no">DOUBLE</code> يتضمن القيمة الرقمية ويتخطى القيمة النصية. لتحويل القيم النصية أثناء الفهرسة، استخدم <code translate="no">json_cast_function</code> ؛ انظر <a href="/docs/ar/json-indexing.md#example-5-convert-data-type-at-index-time">المثال 5: تحويل نوع البيانات في وقت الفهرسة</a>.</p>
<h3 id="Choose-an-index-type" class="common-anchor-header">اختر نوع الفهرس<button data-href="#Choose-an-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد اختيار نوع التحويل، اختر نوع الفهرس وفقًا لنمط الاستعلام الخاص بك.</p>
<table>
<thead>
<tr><th>نمط الاستعلام</th><th>نوع الفهرس الموصى به</th><th>متطلبات نوع التحويل</th><th>ملاحظات</th></tr>
</thead>
<tbody>
<tr><td>مرشحات المساواة والنطاق المختلطة على القيم العددية</td><td><code translate="no">AUTOINDEX</code></td><td>استخدم <code translate="no">BOOL</code> أو <code translate="no">DOUBLE</code> أو <code translate="no">VARCHAR</code>.</td><td>دع Milvus يختار تخطيط الفهرس الداخلي بناءً على عدد القيم.</td></tr>
<tr><td>مرشحات على القيم داخل مصفوفات JSON</td><td><code translate="no">INVERTED</code></td><td>استخدم <code translate="no">ARRAY_BOOL</code> أو <code translate="no">ARRAY_DOUBLE</code> أو <code translate="no">ARRAY_VARCHAR</code>.</td><td>مطلوب لجميع أنواع تحويل المصفوفات.</td></tr>
<tr><td>فهرسة الكائن بأكمله أو جزء منه (مهملة)</td><td><code translate="no">INVERTED</code> أو <code translate="no">AUTOINDEX</code> (للتوافق فقط)</td><td>استخدم <code translate="no">JSON</code>.</td><td>مدعوم لأغراض التوافق. بالنسبة لأحمال العمل الجديدة، قم بإنشاء فهارس خاصة بالمسار أو ضع في اعتبارك <a href="/docs/ar/json-shredding.md">تقطيع JSON</a>.</td></tr>
<tr><td>مرشحات النطاق للأرقام أو السلاسل القابلة للفرز</td><td><code translate="no">STL_SORT</code> أو <code translate="no">AUTOINDEX</code></td><td>استخدم <code translate="no">DOUBLE</code> أو <code translate="no">VARCHAR</code>.</td><td>استخدم <code translate="no">STL_SORT</code> لفرض تخطيط مرتب؛ واستخدم <code translate="no">AUTOINDEX</code> عندما تريد التحديد التلقائي.</td></tr>
<tr><td>مرشحات المساواة أو <code translate="no">IN</code> للقيم ذات الكاردينالية المنخفضة</td><td><code translate="no">BITMAP</code> أو <code translate="no">AUTOINDEX</code></td><td>استخدم <code translate="no">BOOL</code> أو <code translate="no">VARCHAR</code>.</td><td>استخدم <code translate="no">BITMAP</code> لفرض تخطيط الصورة النقطية. بالنسبة للقيم الرقمية، استخدم <code translate="no">AUTOINDEX</code> أو <code translate="no">STL_SORT</code>.</td></tr>
</tbody>
</table>
<p>في حالة الشك، ابدأ باستخدام <code translate="no">AUTOINDEX</code> للمسارات القياسية. استخدم <code translate="no">INVERTED</code> بشكل صريح لأنواع التحويل إلى المصفوفات واستعلامات مطابقة النص. لا يزال فهرسة JSON للكائن بأكمله باستخدام <code translate="no">INVERTED</code> أو <code translate="no">AUTOINDEX</code> مدعومة، ولكنها أصبحت مهملة بدءًا من Milvus 3.0.0.</p>
<h3 id="AUTOINDEX" class="common-anchor-header">AUTOINDEX<button data-href="#AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">AUTOINDEX</code> يعتمد على <code translate="no">json_cast_type</code> الذي تحدده. في Milvus 3.0، لم يعد <code translate="no">AUTOINDEX</code> يُحل دائمًا إلى <code translate="no">INVERTED</code> لفهارس مسارات JSON.</p>
<table>
<thead>
<tr><th>نوع التحويل</th><th><code translate="no">AUTOINDEX</code> السلوك</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>، <code translate="no">DOUBLE</code> ، <code translate="no">VARCHAR</code></td><td>يختار بين <code translate="no">BITMAP</code> و <code translate="no">STL_SORT</code> بناءً على عدد قيم العنصر.</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code>، <code translate="no">ARRAY_DOUBLE</code> ، <code translate="no">ARRAY_VARCHAR</code></td><td>غير مدعوم. استخدم <code translate="no">INVERTED</code> صراحةً كنوع الفهرس.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>يستخدم <code translate="no">INVERTED</code> لفهرسة الكائن بأكمله أو الكائنات الفرعية. تم إهمال هذا الوضع بدءًا من Milvus 3.0.0.</td></tr>
</tbody>
</table>
<p>بالنسبة لأنواع التحويل القياسية (<code translate="no">BOOL</code> و <code translate="no">DOUBLE</code> و <code translate="no">VARCHAR</code>)، يُعد « <code translate="no">AUTOINDEX</code> » نقطة البداية الموصى بها عندما تريد أن يختار Milvus تخطيط الفهرس الداخلي. أثناء إنشاء الفهرس، يقيس Milvus <strong>عدد</strong> القيم في مسار JSON. ويشير <strong>«عدد القيم</strong> » إلى عدد القيم المتميزة في ذلك المسار.</p>
<p>بناءً على الكاردينالية، يختار Milvus أحد التخطيطين الداخليين التاليين:</p>
<ul>
<li><p><strong>عدد القيم المنخفض</strong>: تتكرر القيم كثيرًا، مثل <code translate="no">metadata[&quot;in_stock&quot;]</code> مع <code translate="no">true</code> و <code translate="no">false</code> ، أو <code translate="no">metadata[&quot;status&quot;]</code> مع مجموعة صغيرة من سلاسل الحالة. يقوم Milvus بإنشاء فهرس <code translate="no">BITMAP</code> داخليًّا لتسريع عمليات المقارنة (equality) وعمليات التصفية ( <code translate="no">IN</code> ).</p></li>
<li><p><strong>عدد كبير من القيم</strong>: معظم القيم متمايزة، مثل <code translate="no">metadata[&quot;price&quot;]</code> و <code translate="no">metadata[&quot;created_at&quot;]</code> و <code translate="no">metadata[&quot;product_id&quot;]</code>. يقوم Milvus بإنشاء فهرس <code translate="no">STL_SORT</code> داخليًا لتسريع عمليات التصفية حسب النطاق مثل <code translate="no">&gt;</code> و <code translate="no">&lt;</code> و <code translate="no">&gt;=</code> و <code translate="no">&lt;=</code>.</p></li>
</ul>
<p>العتبة الافتراضية لـ <code translate="no">BITMAP</code> مقابل<code translate="no">STL_SORT</code> هي <strong>100 قيمة مميزة</strong>. يمكنك ضبط هذه العتبة باستخدام <code translate="no">bitmap_cardinality_limit</code> ؛ انظر <a href="/docs/ar/json-indexing.md#how-do-i-tune-autoindexs-bitmap-vs-stl-sort-threshold">كيف يمكنني ضبط عتبة BITMAP مقابل STL_SORT في AUTOINDEX؟</a>.</p>
<div class="alert note">
<p><strong>تغيير في السلوك في Milvus 3.0</strong>. في الإصدارات السابقة، كان <code translate="no">AUTOINDEX</code> على مسارات JSON ينشئ دائمًا فهرس <code translate="no">INVERTED</code>. بدءًا من Milvus 3.0، يختار <code translate="no">AUTOINDEX</code> بين <code translate="no">BITMAP</code> و <code translate="no">STL_SORT</code> لأنواع التحويل القياسية. بالنسبة لـ <code translate="no">JSON</code> ، لا يزال <code translate="no">AUTOINDEX</code> يستخدم <code translate="no">INVERTED</code> ، على الرغم من أن فهرسة JSON للكائن بأكمله أصبحت مهملة. بالنسبة لأنواع التحويل المصفوفية واستعلامات مطابقة النص، حدد <code translate="no">INVERTED</code> صراحةً.</p>
</div>
<h3 id="INVERTED" class="common-anchor-header">يُعد الخيار<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">INVERTED</code> هي الخيار الأنسب عندما تحتاج إلى استعلامات مطابقة النص أو فهرسة المصفوفات. كما أنها تظل متاحة لفهرسة JSON للكائنات بأكملها التي تم إهمالها.</p>
<p>حدد <code translate="no">INVERTED</code> بشكل صريح في الحالات التالية:</p>
<ul>
<li><p>تحتاج إلى فهرسة القيم داخل مصفوفات JSON.</p></li>
<li><p>تقوم بصيانة فهرس موجود على كائن JSON كامل أو كائن فرعي وترغب في جعل سلوك " <code translate="no">INVERTED</code> " صريحًا.</p></li>
<li><p>ترغب في نوع فهرس واحد يتعامل مع استعلامات المساواة و <code translate="no">IN</code> والنطاق ومطابقة النص والمصفوفات. يظل دعم الكائن بأكمله متاحًا للتوافق، على حساب حجم فهرس أكبر.</p></li>
</ul>
<p>بالنسبة للفهارس الموجودة على كائنات JSON بأكملها (<code translate="no">json_cast_type=&quot;JSON&quot;</code>)، يمكنك الاستمرار في استخدام إما <code translate="no">INVERTED</code> أو <code translate="no">AUTOINDEX</code>. يستخدم <code translate="no">AUTOINDEX</code> <code translate="no">INVERTED</code> لهذا النوع من التحويل. لم يعد يُنصح بفهرسة JSON للكائن بأكمله لأحمال العمل الجديدة.</p>
<p>للحصول على التفاصيل، راجع <a href="/docs/ar/inverted.md">INVERTED</a>.</p>
<h3 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">STL_SORT</code> يخزن القيم من مسار JSON بترتيب مرتب. وقد تم تحسينه لمرشحات النطاق على القيم الرقمية أو قيم السلاسل القابلة للفرز.</p>
<p><code translate="no">STL_SORT</code> يدعم فقط أنواع التحويل <code translate="no">DOUBLE</code> و <code translate="no">VARCHAR</code>. استخدمه في الحالات التالية:</p>
<ul>
<li><p>تقوم عوامل التصفية الخاصة بك بمقارنة القيم باستخدام <code translate="no">&gt;</code> أو <code translate="no">&lt;</code> أو <code translate="no">&gt;=</code> أو <code translate="no">&lt;=</code>.</p></li>
<li><p>تتميز القيم المفهرسة بعدد كبير من العناصر، مثل الأسعار أو الطوابع الزمنية أو معرّفات الهوية أو الرموز القابلة للفرز.</p></li>
<li><p>ترغب في فرض تخطيط مرتب بدلاً من ترك الاختيار لـ <code translate="no">AUTOINDEX</code>.</p></li>
</ul>
<p><code translate="no">STL_SORT</code> لا يدعم أنواع التحويل <code translate="no">BOOL</code> أو <code translate="no">ARRAY_*</code> أو <code translate="no">JSON</code>. استخدم <code translate="no">INVERTED</code> للمصفوفات. يمكن أن تستمر الفهارس الحالية للكائنات بأكملها في استخدام <code translate="no">INVERTED</code> أو <code translate="no">AUTOINDEX</code> ، ولكن فهرسة JSON للكائنات بأكملها أصبحت قديمة.</p>
<p>للحصول على التفاصيل، راجع <a href="/docs/ar/stl-sort.md">STL_SORT</a>.</p>
<h3 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BITMAP</code> يُنشئ صورة نقطية مدمجة لكل قيمة مميزة في مسار JSON. وقد تم تحسينه لعمليات التصفية على أساس المساواة و <code translate="no">IN</code> للقيم التي تتكرر كثيرًا.</p>
<p><code translate="no">BITMAP</code> يدعم فقط أنواع التحويل <code translate="no">BOOL</code> و <code translate="no">VARCHAR</code>. استخدمه عندما:</p>
<ul>
<li><p>تستخدم عوامل التصفية الخاصة بك <code translate="no">==</code> أو <code translate="no">IN</code>.</p></li>
<li><p>تتميز القيم المفهرسة بعدد قليل من القيم، مثل القيم المنطقية أو قيم الحالة أو مجموعة صغيرة من الفئات.</p></li>
<li><p>ترغب في فرض تخطيط صورة نقطية بدلاً من ترك الاختيار لـ <code translate="no">AUTOINDEX</code>.</p></li>
</ul>
<p><code translate="no">BITMAP</code> لا يدعم أنواع التحويل <code translate="no">DOUBLE</code> أو <code translate="no">ARRAY_*</code> أو <code translate="no">JSON</code>. بالنسبة للقيم الرقمية، استخدم بدلاً من ذلك <code translate="no">AUTOINDEX</code> أو <code translate="no">STL_SORT</code> أو <code translate="no">INVERTED</code>.</p>
<p>للحصول على التفاصيل، راجع <a href="/docs/ar/bitmap.md">BITMAP</a>.</p>
<h3 id="Compatibility-reference" class="common-anchor-header">مرجع التوافق<button data-href="#Compatibility-reference" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم المصفوفة التالية كمرجع سريع لتركيبات <code translate="no">(cast type, index type)</code> المدعومة.</p>
<table>
<thead>
<tr><th>تحويل النوع</th><th>الوصف</th><th>مثال على القيمة</th><th>AUTOINDEX</th><th>INVERTED</th><th>STL_SORT</th><th>BITMAP</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>القيم المنطقية (<code translate="no">true</code>/<code translate="no">false</code>).</td><td><code translate="no">true</code></td><td>نعم</td><td>نعم</td><td>لا</td><td>نعم</td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>القيم العددية (أعداد صحيحة أو أعداد عائمة).</td><td><code translate="no">99.99</code></td><td>نعم</td><td>نعم</td><td>نعم</td><td>لا</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>القيم النصية.</td><td><code translate="no">&quot;electronics&quot;</code></td><td>نعم</td><td>نعم</td><td>نعم</td><td>نعم</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>مصفوفة من القيم المنطقية.</td><td><code translate="no">[true, false]</code></td><td>لا</td><td>نعم</td><td>لا</td><td>لا</td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>مصفوفة من الأرقام.</td><td><code translate="no">[1.2, 3.14]</code></td><td>لا</td><td>نعم</td><td>لا</td><td>لا</td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>مصفوفة من السلاسل.</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td><td>لا</td><td>نعم</td><td>لا</td><td>لا</td></tr>
<tr><td><code translate="no">JSON</code></td><td>كائن JSON كامل أو كائن فرعي مع الاستدلال التلقائي على النوع والتسطيح. تم إهماله بدءًا من Milvus 3.0.0.</td><td>أي كائن متداخل</td><td>نعم (مهمل)</td><td>نعم (مهمل)</td><td>لا</td><td>لا</td></tr>
</tbody>
</table>
<p>بالنسبة للخلايا التي تحمل علامة " <code translate="no">No</code>"، يرفض Milvus الطلب عند إنشاء الفهرس. بالنسبة لأنواع التحويل إلى مصفوفة، استخدم " <code translate="no">INVERTED</code> " بشكل صريح (لا يغطي "<code translate="no">AUTOINDEX</code> " المصفوفات).</p>
<h2 id="Create-a-JSON-index" class="common-anchor-header">إنشاء فهرس JSON<button data-href="#Create-a-JSON-index" class="anchor-icon" translate="no">
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
    </button></h2><p>يشرح هذا القسم كيفية فهرسة أشكال مختلفة من بيانات JSON. تستخدم جميع الأمثلة البنية النموذجية أدناه وتفترض أن لديك بالفعل مجموعة تتضمن حقل <code translate="no">JSON</code> باسم <code translate="no">metadata</code>.</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">هيكل JSON النموذجي<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Basic-setup" class="common-anchor-header">الإعداد الأساسي<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>تفترض الأمثلة أدناه أن لديك <code translate="no">MilvusClient</code> باسم <code translate="no">client</code> متصل بنشر Milvus الخاص بك، ومجموعة تتضمن بالفعل حقل <code translate="no">JSON</code> باسم <code translate="no">metadata</code>. إذا كنت بحاجة إلى إعدادها من البداية، فقم بتوسيع المربع أدناه.</p>
<p><details></p>
<p><summary>الاتصال وإنشاء مجموعة نموذجية</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Define a schema with a JSON field</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)
schema.add_field(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.JSON, nullable=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Minimal vector index so the collection can be loaded</span>
vec_index = client.prepare_index_params()
vec_index.add_index(field_name=<span class="hljs-string">&quot;vec&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    schema=schema,
    index_params=vec_index,
)

<span class="hljs-comment"># Insert one row that matches the sample JSON structure above</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[{
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }],
)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>قم بإعداد كائن index-params لجمع تعريفات الفهرس المضافة في الأمثلة أدناه:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<p>يُظهر كل مثال من الأمثلة التالية استدعاءً واحدًا لـ <code translate="no">index_params.add_index(...)</code>. اختر الاستدعاءات التي تتطابق مع بياناتك وقم باستدعائها على نفس كائن <code translate="no">index_params</code>. ثم قم بتطبيق كل شيء في استدعاء واحد لـ <code translate="no">client.create_index(...)</code> في النهاية. لمزيد من التفاصيل، راجع <a href="/docs/ar/json-indexing.md#apply-the-index">تطبيق الفهرس</a>.</p>
<h3 id="Example-1-Index-a-top-level-key-with-AUTOINDEX" class="common-anchor-header">المثال 1: فهرسة مفتاح من المستوى الأعلى باستخدام AUTOINDEX<button data-href="#Example-1-Index-a-top-level-key-with-AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بفهرسة حقل <code translate="no">category</code> للتصفية السريعة حسب فئة المنتج. باستخدام <code translate="no">AUTOINDEX</code> ، يختار Milvus بين <code translate="no">BITMAP</code> أو <code translate="no">STL_SORT</code> بناءً على عدد الفئات المتميزة الموجودة في بياناتك.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">المثال 2: فهرسة مفتاح متداخل<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بفهرسة الحقل <code translate="no">email</code> المتداخل بعمق للبحث عن جهات اتصال الموردين. تقبل المعلمة <code translate="no">json_path</code> أي عمق لترميز الأقواس.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-queries-with-STLSORT" class="common-anchor-header">المثال 3: استعلامات النطاق باستخدام STL_SORT<button data-href="#Example-3-Range-queries-with-STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p>عندما تعلم أن استعلاماتك على مسار ما ستكون مهيمنة عليها مقارنات النطاق (<code translate="no">&gt;</code> ، <code translate="no">&lt;</code> ، <code translate="no">&gt;=</code> ، <code translate="no">&lt;=</code>)، اختر <code translate="no">STL_SORT</code> مباشرةً. يؤدي ذلك إلى تجاوز قياس الكاردينالية وإنشاء التخطيط المصنف على الفور.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>بعد الفهرسة، تستخدم استعلامات النطاق مثل <code translate="no">metadata[&quot;price&quot;] &gt; 50 AND metadata[&quot;price&quot;] &lt; 100</code> البحث الثنائي بدلاً من المسح الكامل.</p>
<h3 id="Example-4-Equality-queries-with-BITMAP" class="common-anchor-header">المثال 4: استعلامات المساواة باستخدام BITMAP<button data-href="#Example-4-Equality-queries-with-BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p>بالنسبة للمفاتيح ذات الكاردينالية المنخفضة، مثل رموز الحالة أو القيم المنطقية أو السلاسل الشبيهة بقوائم التعداد، اختر <code translate="no">BITMAP</code> مباشرةً. تصبح استعلامات المساواة و <code translate="no">IN</code> عمليات bitmap.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;in_stock_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;in_stock&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;BOOL&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">BITMAP</code> كما أنه مناسب تمامًا لحقول مثل عمود " <code translate="no">status</code> " الذي يحتوي على عدد قليل من قيم السلاسل المتميزة.</p>
<h3 id="Example-5-Convert-data-type-at-index-time" class="common-anchor-header">المثال 5: تحويل نوع البيانات عند إنشاء الفهرس<button data-href="#Example-5-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>عندما يتم تخزين البيانات الرقمية عن طريق الخطأ كسلاسل نصية، استخدم <code translate="no">STRING_TO_DOUBLE</code> لتحويل القيمة إلى رقم أثناء إنشاء الفهرس.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>إذا فشل التحويل لصف ما (على سبيل المثال، سلسلة غير رقمية مثل <code translate="no">&quot;invalid&quot;</code>)، يتم تخطي هذا الصف أثناء الفهرسة.</p>
<h3 id="Example-6-Index-entire-JSON-objects" class="common-anchor-header">المثال 6: فهرسة كائنات JSON بالكامل<button data-href="#Example-6-Index-entire-JSON-objects" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert warning">
<p>بدءًا من Milvus 3.0.0، تم إيقاف استخدام فهرسة كائنات JSON بالكامل (<code translate="no">json_cast_type=&quot;JSON&quot;</code>)، والمعروفة أيضًا باسم الفهرسة المسطحة لـ JSON. لا يزال يتم دعم الفهارس الحالية وطلبات إنشاء الفهارس الجديدة من أجل التوافق، ولكن لم يعد يُنصح باستخدام هذا الوضع لأحمال العمل الجديدة. قم بإنشاء فهارس مسار JSON لمسارات الاستعلام المعروفة. بالنسبة لمستندات JSON المعقدة أو المتطورة ذات أنماط الاستعلام الواسعة، ضع في اعتبارك <a href="/docs/ar/json-shredding.md">تقطيع JSON</a>. لا يعمل تقطيع JSON على تسريع القيم داخل المصفوفات؛ استخدم فهارس مسار JSON مع أنواع تحويل المصفوفات لتلك الاستعلامات.</p>
</div>
<p>بالنسبة لأحمال العمل الحالية المتوافقة، يؤدي تعيين " <code translate="no">json_cast_type=&quot;JSON&quot;</code> " إلى فهرسة الهيكل الكامل في المسار المحدد. يقوم Milvus بتسوية الكائنات المتداخلة إلى مسارات ويستنتج نوع كل قيمة تلقائيًا. تصبح جميع المفاتيح الموجودة ضمن المسار قابلة للبحث.</p>
<p><code translate="no">AUTOINDEX</code> يستخدم بشكل شفاف <code translate="no">INVERTED</code> لنوع التحويل <code translate="no">JSON</code> ، نظرًا لأن التسوية واستنتاج النوع هما من إمكانيات الفهرس المعكوس.</p>
<p>فهرسة كائن <code translate="no">metadata</code> بالكامل:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>أو فهرسة كائن فرعي، مثل جميع معلومات <code translate="no">supplier</code>:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>يؤدي فهرسة الكائنات بالكامل إلى زيادة حجم الفهرس. بالنسبة لأحمال العمل الجديدة التي تحتوي على مستندات متداخلة بعمق وأنماط استعلام متنوعة، استخدم الفهارس الخاصة بالمسار أو ضع في اعتبارك <a href="/docs/ar/json-shredding.md">تقطيع JSON</a>.</p>
<h3 id="Apply-the-index" class="common-anchor-header">تطبيق الفهرس<button data-href="#Apply-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد إضافة جميع معلمات الفهرس، قم بتطبيقها على مجموعتك:</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>تتم عمليات إنشاء الفهرس بشكل غير متزامن. استخدم <code translate="no">client.describe_index(...)</code> للتحقق من حالة إنشاء فهرس معين. يُظهر الحقل <code translate="no">state</code> <code translate="no">Finished</code> بمجرد اكتمال الإنشاء، بينما تُظهر الحقول <code translate="no">total_rows</code> و <code translate="no">indexed_rows</code> و <code translate="no">pending_index_rows</code> التقدم المحرز خلال العملية.</p>
<pre><code translate="no" class="language-python">client.describe_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>نموذج للاستجابة:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;json_path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;json_cast_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;VARCHAR&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AUTOINDEX&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category_index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;total_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;indexed_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;pending_index_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;state&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Finished&quot;</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد أن يُبلغ <code translate="no">state</code> عن <code translate="no">Finished</code> ، تستخدم الاستعلامات التي تُجرى على المسار المفهرس الفهرس الجديد تلقائيًا.</p>
<p>بالنسبة لمدخلات <code translate="no">AUTOINDEX</code> ، يتم الإبلاغ عن الحقل <code translate="no">index_type</code> في هذا الرد على أنه <code translate="no">AUTOINDEX</code>. لا يكشف Milvus حاليًا عن التخطيط الأساسي (<code translate="no">BITMAP</code> أو <code translate="no">STL_SORT</code>) الذي تم اختياره وقت الإنشاء. تعامل مع هذا الاختيار على أنه تحسين داخلي: ستعمل استعلامات المساواة و <code translate="no">IN</code> والنطاق على المسار بغض النظر عن التخطيط الذي تم اختياره.</p>
<h2 id="FAQ" class="common-anchor-header">الأسئلة الشائعة<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="common-anchor-header">كيف أختار بين AUTOINDEX ونوع الفهرس الصريح؟<button data-href="#How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>ابدأ بـ <code translate="no">AUTOINDEX</code>. فهو يختار التخطيط المناسب بناءً على عدد عناصر البيانات، ويغطي معظم استعلامات المساواة، <code translate="no">IN</code> ، واستعلامات النطاق على مسارات JSON. اختر نوعًا صريحًا في الحالات التالية:</p>
<ul>
<li><p>كنت تعرف نمط الاستعلام الخاص بك (على سبيل المثال، استخدم دائمًا <code translate="no">STL_SORT</code> للاستعلامات النطاقية، و <code translate="no">BITMAP</code> للاستعلامات المساواة على القيم ذات الكاردينالية المنخفضة) وترغب في تخطي قياس الكاردينالية.</p></li>
<li><p>كنت بحاجة إلى استعلامات مطابقة النص أو السلسلة الفرعية. استخدم <code translate="no">INVERTED</code>.</p></li>
<li><p>كنت تقوم بفهرسة أنواع تحويل المصفوفات. استخدم <code translate="no">INVERTED</code> بشكل صريح.</p></li>
<li><p>أنت تقوم بصيانة فهرس JSON لكامل الكائن موجود بالفعل. يظل كل من <code translate="no">INVERTED</code> و <code translate="no">AUTOINDEX</code> مدعومين من أجل التوافق، ولكن فهرسة JSON لكامل الكائن أصبحت مهملة بدءًا من Milvus 3.0.0.</p></li>
</ul>
<h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">ماذا يحدث إذا استخدم تعبير التصفية في الاستعلام نوعًا مختلفًا عن نوع التحويل المفهرس؟<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا كان تعبير التصفية الخاص بك يستخدم نوعًا مختلفًا عن <code translate="no">json_cast_type</code> الخاص بالفهرس، فلن يستخدم Milvus الفهرس وقد يلجأ إلى مسح قوي أبطأ إذا سمحت البيانات بذلك. للحصول على أفضل أداء، قم دائمًا بمواءمة تعبير التصفية مع نوع التحويل الخاص بالفهرس. على سبيل المثال، إذا تم إنشاء فهرس رقمي باستخدام <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code> ، فلن تستفيد من الفهرس سوى شروط التصفية الرقمية.</p>
<h3 id="What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">ماذا لو احتوى مفتاح JSON على أنواع بيانات غير متسقة عبر كيانات مختلفة؟<button data-href="#What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>قد تؤدي الأنواع غير المتسقة إلى <strong>فهرسة جزئية</strong>. على سبيل المثال، إذا تم تخزين <code translate="no">metadata[&quot;price&quot;]</code> كرقم (<code translate="no">99.99</code>) وكسلسلة (<code translate="no">&quot;99.99&quot;</code>) وقمت بإنشاء فهرس باستخدام <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code> ، فسيتم فهرسة القيم الرقمية فقط. يتم تخطي الإدخالات في شكل سلاسل ولن تظهر في نتائج التصفية. استخدم <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> لتحويل السلاسل إلى أرقام عند الفهرسة، أو قم بتعديل البيانات المصدر بحيث تكون جميع الإدخالات من نفس النوع.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">هل يمكنني إنشاء فهارس متعددة على نفس مفتاح JSON؟<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>لا. يسمح Milvus بإنشاء فهرس واحد كحد أقصى لكل زوج من <code translate="no">(field, json_path)</code> ، بغض النظر عن نوع التحويل أو نوع الفهرس. لا يمكنك إنشاء كل من فهرس « <code translate="no">INVERTED</code> » وفهرس « <code translate="no">BITMAP</code> » على نفس المسار، أو إنشاء فهرسين على نفس المسار بنوعي تحويل مختلفين. ومع ذلك، يمكنك إنشاء فهرس على كائن JSON بأكمله وفهرس منفصل على مفتاح متداخل داخل هذا الكائن لأنهما مساران مختلفان.</p>
<h3 id="How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="common-anchor-header">كيف يمكنني ضبط عتبة BITMAP مقابل STL_SORT في AUTOINDEX؟<button data-href="#How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="anchor-icon" translate="no">
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
    </button></h3><p>بشكل افتراضي، يختار <code translate="no">AUTOINDEX</code> خيار « <code translate="no">BITMAP</code> » عندما تحتوي القيم المفهرسة على <strong>100 قيمة مميزة أو أقل،</strong> ويختار خيار « <code translate="no">STL_SORT</code> » في الحالات الأخرى. يمكنك تجاوز هذا الحد عن طريق إضافة <code translate="no">&quot;bitmap_cardinality_limit&quot;</code> إلى معلمات الفهرس (النطاق: 1-1000):</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># use BITMAP up to 200 distinct values</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>لا يحتاج معظم المستخدمين إلى ضبط هذا الإعداد. قم برفع القيمة إذا كان لديك حقل ذو عدد عناصر معتدل تفضل معالجته بنظام الخرائط الثنائية؛ وقم بخفضها لدفع <code translate="no">AUTOINDEX</code> نحو <code translate="no">STL_SORT</code> في وقت أبكر. يتم تجاهل هذا الإعداد عند تحديد <code translate="no">INVERTED</code> أو <code translate="no">STL_SORT</code> أو <code translate="no">BITMAP</code> بشكل صريح.</p>
