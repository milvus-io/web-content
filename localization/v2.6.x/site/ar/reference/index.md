---
id: index.md
related_key: index
summary: آلية الفهرس في ميلفوس.
title: الفهرس داخل الذاكرة
---
<h1 id="In-memory-Index" class="common-anchor-header">الفهرس داخل الذاكرة<button data-href="#In-memory-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>يسرد هذا الموضوع أنواع مختلفة من الفهارس داخل الذاكرة التي يدعمها ملفوس، والسيناريوهات التي تناسب كل منها، والمعلمات التي يمكن للمستخدمين تكوينها لتحقيق أداء بحث أفضل. بالنسبة للفهارس على القرص، راجع <strong><a href="/docs/ar/disk_index.md">الفهرسة على القرص</a></strong>.</p>
<p>الفهرسة هي عملية تنظيم البيانات بكفاءة، وتلعب دورًا رئيسيًا في جعل البحث عن التشابه مفيدًا من خلال تسريع الاستعلامات التي تستغرق وقتًا طويلاً على مجموعات البيانات الكبيرة بشكل كبير.</p>
<p>لتحسين أداء الاستعلام، يمكنك <a href="/docs/ar/index-vector-fields.md">تحديد نوع فهرس</a> لكل حقل متجه.</p>
<div class="alert note">
يدعم حقل المتجه حاليًا نوع فهرس واحد فقط. يقوم ميلفوس تلقائيًا بحذف الفهرس القديم عند تبديل نوع الفهرس.</div>
<h2 id="ANNS-vector-indexes" class="common-anchor-header">فهارس المتجهات ANNS<button data-href="#ANNS-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>تستخدم معظم أنواع الفهارس المتجهة التي يدعمها Milvus خوارزميات البحث التقريبي الأقرب للجيران (ANNS). وبالمقارنة مع الاسترجاع الدقيق، الذي عادةً ما يستغرق وقتًا طويلاً، فإن الفكرة الأساسية لـ ANNS لم تعد تقتصر على إرجاع النتيجة الأكثر دقة، بل البحث عن جيران الهدف فقط. تعمل ANNS على تحسين كفاءة الاسترجاع من خلال التضحية بالدقة ضمن نطاق مقبول.</p>
<p>وفقًا لطرق التنفيذ، يمكن تصنيف فهرس متجه ANNS إلى أربعة أنواع: قائم على الشجرة وقائم على الرسم البياني وقائم على التجزئة وقائم على التجزئة الكمية.</p>
<h2 id="Indexes-supported-in-Milvus" class="common-anchor-header">الفهارس المدعومة في ميلفوس<button data-href="#Indexes-supported-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>تدعم Milvus أنواعًا مختلفة من الفهارس، والتي يتم تصنيفها حسب نوع التضمينات المتجهة التي تتعامل معها: <strong>تضمينات الف</strong> اصلة العائمة (المعروفة أيضًا باسم متجهات النقطة العائمة أو المتجهات الكثيفة)، والتضمينات <strong>الثنائية</strong> (المعروفة أيضًا باسم المتجهات الثنائية)، <strong>والتضمينات المتفرقة</strong> (المعروفة أيضًا باسم المتجهات المتفرقة).</p>
<div class="filter">
 <a href="#floating">تضمينات الفاصلة العائمة</a> <a href="#binary">التضمينات الثنائية التضمينات الثنائية</a> <a href="#sparse">التضمينات المتفرقة</a></div>
<div class="filter-floating">
<h3 id="Indexes-for-floating-point-embeddings" class="common-anchor-header">فهارس لتضمينات الفاصلة العائمة<button data-href="#Indexes-for-floating-point-embeddings" class="anchor-icon" translate="no">
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
    </button></h3><p>بالنسبة للتضمينات ذات الفاصلة العائمة ذات 128 بُعدًا (المتجهات)، فإن مساحة التخزين التي تشغلها هي 128 * حجم العوامة = 512 بايت. <a href="/docs/ar/metric.md">ومقاييس المسافة</a> المستخدمة لتضمينات الفاصلة العائمة هي المسافة الإقليدية (<code translate="no">L2</code>) والمنتج الداخلي (<code translate="no">IP</code>).</p>
<p>وتتضمن هذه الأنواع من الفهارس <code translate="no">FLAT</code> و <code translate="no">IVF_FLAT</code> و و <code translate="no">IVF_PQ</code> و <code translate="no">IVF_SQ8</code> و <code translate="no">HNSW</code> و <code translate="no">HNSW_SQ</code> و <code translate="no">HNSW_PQ</code> و <code translate="no">HNSW_PRQ</code> و <code translate="no">SCANN</code> لعمليات البحث في الشبكة العنكبوتية القائمة على وحدة المعالجة المركزية.</p>
</div>
<div class="filter-binary">
<h3 id="Indexes-for-binary-embeddings" class="common-anchor-header">فهارس التضمينات الثنائية<button data-href="#Indexes-for-binary-embeddings" class="anchor-icon" translate="no">
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
    </button></h3><p>بالنسبة للتضمينات الثنائية ذات 128 بُعدًا، تبلغ مساحة التخزين التي تشغلها 128 / 8 = 16 بايت. ومقاييس المسافة المستخدمة للتضمينات الثنائية هي <code translate="no">JACCARD</code> و <code translate="no">HAMMING</code>.</p>
<p>يتضمن هذا النوع من الفهارس <code translate="no">BIN_FLAT</code> و <code translate="no">BIN_IVF_FLAT</code>.</p>
</div>
<div class="filter-sparse">
<h3 id="Indexes-for-sparse-embeddings" class="common-anchor-header">فهارس التضمينات المتفرقة<button data-href="#Indexes-for-sparse-embeddings" class="anchor-icon" translate="no">
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
    </button></h3><p>تدعم فهارس التضمينات المتفرقة مقاييس <code translate="no">IP</code> و <code translate="no">BM25</code> (للبحث في النص الكامل) فقط.</p>
<p>نوع الفهرس المدعوم للتضمينات المتفرقة: <code translate="no">SPARSE_INVERTED_INDEX</code>.</p>
<div class="alert note">
<p>من الإصدار Milvus 2.5.4 فصاعدًا، تم إهمال <code translate="no">SPARSE_WAND</code>. بدلاً من ذلك، يوصى باستخدام <code translate="no">&quot;inverted_index_algo&quot;: &quot;DAAT_WAND&quot;</code> للمعادلة مع الحفاظ على التوافق. لمزيد من المعلومات، راجع <a href="/docs/ar/sparse_vector.md#Set-index-params-for-vector-field">متجه متناثر</a>.</p>
</div>
</div>
<div class="filter-floating table-wrapper">
<table id="floating">
<thead>
  <tr>
    <th>الفهرس المدعوم</th>
    <th>التصنيف</th>
    <th>السيناريو</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>مسطح</td>
    <td>غير متاح</td>
    <td>
      <ul>
        <li>مجموعة بيانات صغيرة نسبيًا</li>
        <li>يتطلب معدل استرجاع 100%</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_FLAT</td>
    <td>غير متاح</td>
    <td>
      <ul>
        <li>استعلام عالي السرعة</li>
        <li>يتطلب معدل استرجاع عالٍ قدر الإمكان</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_SQ8</td>
    <td>فهرس قائم على التكميم</td>
    <td>
      <ul>
        <li>استعلام عالي السرعة للغاية</li>
        <li>موارد ذاكرة محدودة</li>
        <li>يقبل مساومة طفيفة في معدل الاستدعاء</li>
      </ul>
    </td>
  </tr>  
  <tr>
    <td>IVF_PQ</td>
    <td>الفهرس المستند إلى التقدير الكمي</td>
    <td>
      <ul>
        <li>استعلام عالي السرعة</li>
        <li>موارد ذاكرة محدودة</li>
        <li>يقبل تنازلات طفيفة في معدل الاسترجاع</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW</td>
    <td>فهرس قائم على الرسم البياني</td>
    <td>
      <ul>
        <li>استعلام عالي السرعة للغاية</li>
        <li>يتطلب معدل استرجاع عالٍ قدر الإمكان</li>
        <li>موارد ذاكرة كبيرة</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW_SQ</td>
    <td>فهرس قائم على القياس الكمي</td>
    <td>
      <ul>
        <li>استعلام عالي السرعة للغاية</li>
        <li>موارد ذاكرة محدودة</li>
        <li>يقبل تنازلاً بسيطاً في معدل الاسترجاع</li>
      </ul>
    </td>
  </tr>
    <tr>
    <td>HNSW_PQ</td>
    <td>الفهرس المستند إلى القياس الكمي</td>
    <td>
      <ul>
        <li>استعلام متوسط السرعة</li>
        <li>موارد ذاكرة محدودة للغاية</li>
        <li>يقبل تنازلات طفيفة في معدل الاسترجاع</li>
      </ul>
    </td>
  </tr>
    </tr>
    <tr>
    <td>HNSW_PRQ</td>
    <td>الفهرس المستند إلى القياس الكمي</td>
    <td>
      <ul>
        <li>استعلام متوسط السرعة</li>
        <li>موارد ذاكرة محدودة للغاية</li>
        <li>يقبل تنازلات طفيفة في معدل الاسترجاع</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SCANN</td>
    <td>فهرس قائم على تحديد الكميات</td>
    <td>
      <ul>
        <li>استعلام عالي السرعة للغاية</li>
        <li>يتطلب معدل استرجاع عالٍ قدر الإمكان</li>
        <li>موارد ذاكرة كبيرة</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper">
<table id="binary">
<thead>
  <tr>
    <th>الفهرس المدعوم</th>
    <th>التصنيف</th>
    <th>السيناريو</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>BIN_FLAT</td>
    <td>فهرس قائم على التحويل الكمي</td>
    <td><ul>
      <li>يعتمد على مجموعات بيانات صغيرة نسبياً.</li>
      <li>يتطلب دقة مثالية.</li>
      <li>لا ينطبق أي ضغط.</li>
      <li>يضمن نتائج بحث دقيقة.</li>
    </ul></td>
  </tr>
  <tr>
    <td>BIN_IVF_FLAT</td>
    <td>فهرس قائم على التكميم</td>
    <td><ul>
      <li>استعلام عالي السرعة</li>
      <li>يتطلب معدل استرجاع عالٍ قدر الإمكان</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper">
<table id="sparse">
<thead>
  <tr>
    <th>الفهرس المدعوم</th>
    <th>التصنيف</th>
    <th>السيناريو</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>الفهرس_المقلوب_المتفرق</td>
    <td>فهرس مقلوب</td>
    <td><ul>
      <li>يعتمد على مجموعات بيانات صغيرة نسبيًا.</li>
      <li>يتطلب معدل استرجاع 100%.</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-floating">
<h3 id="FLAT" class="common-anchor-header">FLAT<button data-href="#FLAT" class="anchor-icon" translate="no">
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
    </button></h3><p>بالنسبة لتطبيقات البحث عن تشابه المتجهات التي تتطلب دقة مثالية وتعتمد على مجموعات بيانات صغيرة نسبيًا (بمقياس مليون)، يعد الفهرس المسطح خيارًا جيدًا. لا يقوم FLAT بضغط المتجهات، وهو الفهرس الوحيد الذي يمكن أن يضمن نتائج بحث دقيقة. يمكن أيضًا استخدام النتائج من FLAT كنقطة مقارنة للنتائج التي تنتجها الفهارس الأخرى التي لديها أقل من 100% من الاستدعاء.</p>
<p>يتميز فهرس FLAT بالدقة لأنه يتبع نهجًا شاملًا للبحث، مما يعني أنه لكل استعلام تتم مقارنة المدخلات المستهدفة بكل مجموعة من المتجهات في مجموعة البيانات. هذا يجعل FLAT أبطأ فهرس في قائمتنا، وهو غير مناسب للاستعلام عن بيانات المتجهات الضخمة. لا توجد معلمات مطلوبة لفهرس FLAT في Milvus، ولا يحتاج استخدامه إلى بناء فهرس إضافي.</p>
<ul>
<li><p>معلمات البحث</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[اختياري] مقياس المسافة المختار.</td><td>انظر <a href="/docs/ar/metric.md">المقاييس المدعومة</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="IVFFLAT" class="common-anchor-header">IVF_FLAT<button data-href="#IVFFLAT" class="anchor-icon" translate="no">
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
    </button></h3><p>يقسم IVF_FLAT بيانات المتجهات إلى <code translate="no">nlist</code> وحدات عنقودية، ثم يقارن المسافات بين متجه الإدخال الهدف ومركز كل مجموعة. اعتمادًا على عدد المجموعات التي تم تعيين النظام للاستعلام عنها (<code translate="no">nprobe</code>)، يتم إرجاع نتائج بحث التشابه بناءً على المقارنات بين المدخلات المستهدفة والمتجهات في المجموعة (المجموعات) الأكثر تشابهًا فقط - مما يقلل وقت الاستعلام بشكل كبير.</p>
<p>من خلال ضبط <code translate="no">nprobe</code> ، يمكن إيجاد توازن مثالي بين الدقة والسرعة لسيناريو معين. توضح النتائج من <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">اختبار أداء IVF_FLAT</a> أن وقت الاستعلام يزداد بشكل حاد مع زيادة عدد متجهات المدخلات المستهدفة (<code translate="no">nq</code>)، وعدد المجموعات المطلوب البحث عنها (<code translate="no">nprobe</code>).</p>
<p>إن IVF_FLAT هو فهرس IVF_FLAT الأساسي، والبيانات المشفرة المخزنة في كل وحدة متسقة مع البيانات الأصلية.</p>
<ul>
<li><p>معلمات بناء الفهرس</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>عدد وحدات المجموعة</td><td>[1, 65536]</td><td>128</td></tr>
</tbody>
</table>
</li>
<li><p>معلمات البحث</p>
<ul>
<li><p>بحث مشترك</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>عدد الوحدات المطلوب الاستعلام عنها</td><td>[1، ن ليست]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>بحث النطاق</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>الحد الأقصى لعدد الدلاء التي لا ترجع أي نتائج بحث.<br/>هذه معلمة بحث نطاق وتنهي عملية البحث عندما يصل عدد الدلاء الفارغة المتتالية إلى القيمة المحددة.<br/>يمكن أن تؤدي زيادة هذه القيمة إلى تحسين معدل الاستدعاء على حساب زيادة وقت البحث.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFSQ8" class="common-anchor-header">IVF_SQ8<button data-href="#IVFSQ8" class="anchor-icon" translate="no">
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
    </button></h3><p>لا يقوم IVF_FLAT بإجراء أي ضغط، لذا فإن ملفات الفهرس التي ينتجها تكون تقريبًا بنفس حجم بيانات المتجه الأصلية غير المفهرسة. على سبيل المثال، إذا كان حجم مجموعة بيانات SIFT 1B الأصلية 476 جيجابايت، فإن ملفات فهرس IVF_SQ8_FLAT الخاصة بها ستكون أصغر قليلاً (حوالي 470 جيجابايت). سيؤدي تحميل جميع ملفات الفهرس في الذاكرة إلى استهلاك 470 جيجابايت من مساحة التخزين.</p>
<p>عندما تكون موارد ذاكرة القرص أو وحدة المعالجة المركزية أو وحدة معالجة الرسومات محدودة، فإن IVF_SQ8 هو خيار أفضل من IVF_FLAT. يمكن لنوع الفهرس هذا تحويل كل FLOAT (4 بايت) إلى UINT8 (1 بايت) عن طريق إجراء التكميم الكمي Scalar Quantization (SQ). يقلل هذا من استهلاك القرص ووحدة المعالجة المركزية وذاكرة وحدة معالجة الرسومات بنسبة 70-75%. بالنسبة لمجموعة بيانات SIFT 1B، تتطلب ملفات فهرس IVF_SQ8 مساحة تخزين 140 جيجابايت فقط.</p>
<ul>
<li><p>معلمات بناء الفهرس</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>عدد وحدات التجميع</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
<li><p>معلمات البحث</p>
<ul>
<li><p>بحث مشترك</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>عدد الوحدات المطلوب الاستعلام عنها</td><td>[1، ن ليست]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>بحث النطاق</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>الحد الأقصى لعدد الدلاء التي لا ترجع أي نتائج بحث.<br/>هذه معلمة بحث نطاق وتنهي عملية البحث عندما يصل عدد الدلاء الفارغة المتتالية إلى القيمة المحددة.<br/>يمكن أن تؤدي زيادة هذه القيمة إلى تحسين معدل الاستدعاء على حساب زيادة وقت البحث.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFPQ" class="common-anchor-header">IVF_PQ<button data-href="#IVFPQ" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">PQ</code> (التكميم الكمي للمنتج) يحلل بشكل موحد الفضاء المتجه الأصلي عالي الأبعاد إلى نواتج ديكارتية من <code translate="no">m</code> مساحات متجهة منخفضة الأبعاد، ثم يقوم بتكميم المساحات المتجهة منخفضة الأبعاد المتحللة. وبدلاً من حساب المسافات بين المتجه الهدف ومركز جميع الوحدات، يتيح التكميم الكمي للمنتج حساب المسافات بين المتجه الهدف ومركز التجميع لكل فضاء منخفض الأبعاد ويقلل بشكل كبير من تعقيد الوقت وتعقيد المساحة للخوارزمية.</p>
<p>يقوم IVF_PQ بإجراء تجميع فهرس IVF قبل تكميم حاصل ضرب المتجهات. ملف الفهرس الخاص به أصغر من IVF_SQ8، لكنه يتسبب أيضًا في فقدان الدقة أثناء البحث عن المتجهات.</p>
<div class="alert note">
<p>تختلف معلمات بناء الفهرس ومعلمات البحث باختلاف توزيع Milvus. حدد توزيع Milvus الخاص بك أولاً.</p>
</div>
<ul>
<li><p>معلمات بناء الفهرس</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>عدد وحدات الكتلة</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">m</code></td><td>عدد عوامل تكميم المنتج</td><td><code translate="no">dim mod m == 0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[اختياري] عدد البتات التي يتم تخزين كل متجه منخفض الأبعاد فيها.</td><td>[1، 24] (8 افتراضيًا)</td></tr>
</tbody>
</table>
</li>
<li><p>معلمات البحث</p>
<ul>
<li><p>بحث مشترك</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>عدد الوحدات المطلوب الاستعلام عنها</td><td>[1، ن ليست]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>بحث النطاق</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>الحد الأقصى لعدد الدلاء التي لا ترجع أي نتائج بحث.<br/>هذه معلمة بحث نطاق وتنهي عملية البحث عندما يصل عدد الدلاء الفارغة المتتالية إلى القيمة المحددة.<br/>يمكن أن تؤدي زيادة هذه القيمة إلى تحسين معدل الاستدعاء على حساب زيادة وقت البحث.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="SCANN" class="common-anchor-header">SCANN<button data-href="#SCANN" class="anchor-icon" translate="no">
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
    </button></h3><p>يشبه ScaNN (ScaNN (ScaNN (ScaNN (ScaNN (ScaNN (ScaNN (ScaNN (ScaNN (ScaNN (ScaNN (ScaNN (ScaNN (ScaNN (ScaNN (ScaNN (ScaNN (ScaNN (Scalable Nearest Neighbours) يشبه IVF_PQ من حيث تجميع المتجهات وتكميم المنتج. ما يجعلها مختلفة يكمن في تفاصيل تنفيذ تكميم المنتج واستخدام SIMD (أحادي التعليمات / متعدد البيانات) للحساب الفعال.</p>
<ul>
<li><p>معلمات بناء الفهرس</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>عدد وحدات الكتلة</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">with_raw_data</code></td><td>ما إذا كان سيتم تضمين البيانات الأولية في الفهرس</td><td><code translate="no">True</code> أو <code translate="no">False</code>. الافتراضي إلى <code translate="no">True</code>.</td></tr>
</tbody>
</table>
  <div class="alert note">
<p>على عكس IVF_PQ، تنطبق القيم الافتراضية على <code translate="no">m</code> و <code translate="no">nbits</code> لتحسين الأداء.</p>
  </div>
</li>
<li><p>معلمات البحث</p>
<ul>
<li><p>البحث الشائع</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>عدد الوحدات المطلوب الاستعلام عنها</td><td>[1، nlist]</td><td></td></tr>
<tr><td><code translate="no">reorder_k</code></td><td>عدد الوحدات المرشحة للاستعلام عنها</td><td>[<code translate="no">top_k</code> ، ∞]</td><td><code translate="no">top_k</code></td></tr>
</tbody>
</table>
</li>
<li><p>نطاق البحث</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>الحد الأقصى لعدد الدلاء التي لا ترجع أي نتائج بحث.<br/>هذه معلمة بحث نطاق وتنهي عملية البحث عندما يصل عدد الدلاء الفارغة المتتالية إلى القيمة المحددة.<br/>يمكن أن تؤدي زيادة هذه القيمة إلى تحسين معدل الاستدعاء على حساب زيادة وقت البحث.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW (الرسم البياني الهرمي للعالم الصغير القابل للملاحة) هي خوارزمية فهرسة قائمة على الرسم البياني. وهي تبني بنية تنقل متعددة الطبقات للصورة وفقًا لقواعد معينة. في هذا الهيكل، تكون الطبقات العليا أكثر تناثرًا والمسافات بين العقد أبعد؛ أما الطبقات السفلى فهي أكثر كثافة والمسافات بين العقد أقرب. يبدأ البحث من الطبقة العليا، ويعثر على العقدة الأقرب إلى الهدف في هذه الطبقة، ثم يدخل إلى الطبقة التالية لبدء بحث آخر. بعد عدة تكرارات، يمكن أن يقترب بسرعة من الموضع المستهدف.</p>
<p>من أجل تحسين الأداء، يحدّ HNSW من الحد الأقصى لدرجة العقد في كل طبقة من الرسم البياني إلى <code translate="no">M</code>. بالإضافة إلى ذلك، يمكنك استخدام <code translate="no">efConstruction</code> (عند بناء الفهرس) أو <code translate="no">ef</code> (عند البحث عن الأهداف) لتحديد نطاق بحث.</p>
<ul>
<li><p>معلمات بناء الفهرس</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M تحدد الحد الأقصى لعدد الاتصالات الصادرة في الرسم البياني. يؤدي ارتفاع M إلى دقة أعلى/وقت تشغيل أعلى عند بناء ef/efConstruction ثابت.</td><td>[2, 2048]</td><td>لا يوجد</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>يتحكم ef_construction في سرعة البحث عن الفهرس/سرعة البناء. قد تؤدي زيادة معلمة efConstruction إلى تحسين جودة الفهرس، ولكنها تميل أيضًا إلى إطالة وقت الفهرسة.</td><td>[1، int_max]</td><td>لا يوجد</td></tr>
</tbody>
</table>
</li>
<li><p>معلمات البحث</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>معلمة تتحكم في مفاضلة وقت/دقة البحث. يؤدي ارتفاع <code translate="no">ef</code> إلى بحث أكثر دقة ولكن أبطأ.</td><td>[<code translate="no">top_k</code> ، int_max]</td><td>لا يوجد</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h3><p>التكمية الكمية العددية (SQ) هي تقنية تُستخدم لتجزئة بيانات الفاصلة العائمة إلى مجموعة محدودة من القيم بناءً على مقدارها. على سبيل المثال، يمثل <strong>SQ6</strong> التكميم الكمي إلى (2^6 = 64) قيم منفصلة، حيث يتم ترميز كل رقم عائم باستخدام 6 بت. وبالمثل، يقوم <strong>SQ8</strong> بتكميم البيانات إلى (2 ^ 8 = 256) قيم منفصلة، حيث يتم تمثيل كل رقم عائم ب 8 بتات. يقلل هذا التكميم من بصمة الذاكرة مع الحفاظ على البنية الأساسية للبيانات من أجل معالجة فعالة.</p>
<p>وبالاقتران مع SQ، يوفر HNSW_SQ مفاضلة يمكن التحكم فيها بين حجم الفهرس والدقة، مع الحفاظ على أداء استعلام عالٍ في الثانية (QPS). وبالمقارنة مع HNSW القياسي، فإنه يؤدي إلى زيادة متواضعة في وقت بناء الفهرس.</p>
<ul>
<li><p>معلمات بناء الفهرس</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M تحدد الحد الأقصى لعدد الاتصالات الصادرة في الرسم البياني. يؤدي ارتفاع M إلى دقة أعلى/وقت تشغيل أعلى عند بناء ef/efConstruction ثابت.</td><td>[2, 2048]</td><td>لا يوجد</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>يتحكم ef_construction في سرعة البحث عن الفهرس/سرعة البناء. قد تؤدي زيادة معلمة efConstruction إلى تحسين جودة الفهرس، ولكنها تميل أيضًا إلى إطالة وقت الفهرسة.</td><td>[1، int_max]</td><td>لا شيء</td></tr>
<tr><td><code translate="no">sq_type</code></td><td>نوع الكميات العددية.</td><td><code translate="no">SQ6</code>،<code translate="no">SQ8</code> ، <code translate="no">BF16</code>, <code translate="no">FP16</code></td><td><code translate="no">SQ8</code></td></tr>
<tr><td><code translate="no">refine</code></td><td>ما إذا كان يتم حجز البيانات المكررة أثناء إنشاء الفهرس.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>نوع بيانات الفهرس المنقح.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>لا يوجد</td></tr>
</tbody>
</table>
</li>
<li><p>معلمات البحث</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>معلمة تتحكم في مفاضلة وقت/دقة البحث. يؤدي ارتفاع <code translate="no">ef</code> إلى بحث أكثر دقة ولكن أبطأ.</td><td>[<code translate="no">top_k</code> ، int_max]</td><td>لا يوجد</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>عامل التكبير للتكرير مقارنة بـ <em>k</em>.</td><td>[ 1, <em>float_max</em>]</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPQ" class="common-anchor-header">HNSW_PQ<button data-href="#HNSWPQ" class="anchor-icon" translate="no">
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
    </button></h3><p>تتمثل الفكرة الأساسية لـ PQ في تقسيم المتجه إلى <code translate="no">m</code> متجهات فرعية، كل منها سيجد <em>2^{nbits}</em> مركزيات على أساس kmeans، وسيختار كل متجه فرعي أقرب متجه فرعي كمتجه فرعي تقريبي له. ثم نقوم بتسجيل جميع المئويات، بحيث يمكن ترميز كل متجه فرعي على أنه <code translate="no">nbits</code> ، ويمكن ترميز متجه عائم طوله <code translate="no">dim</code> على أنه <em>م ⋅ nbits</em> بت.</p>
<p>وبالاقتران مع PQ، يوفر HNSW_PQ مفاضلة يمكن التحكم فيها بين حجم الفهرس والدقة، ولكن لديه قيمة QPS أقل ومعدل استرجاع أعلى من HNSW_SQ لنفس معدل الضغط. بالمقارنة مع HNSW_SQ، يستغرق بناء الفهرس وقتًا أطول.</p>
<ul>
<li><p>معلمات بناء الفهرس</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M تحدد الحد الأقصى لعدد الاتصالات الصادرة في الرسم البياني. يؤدي ارتفاع M إلى دقة أعلى/وقت تشغيل أعلى عند بناء ef/efConstruction ثابت.</td><td>[2, 2048]</td><td>لا يوجد</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>يتحكم ef_construction في سرعة البحث عن الفهرس/سرعة البناء. قد تؤدي زيادة معلمة efConstruction إلى تحسين جودة الفهرس، ولكنها تميل أيضًا إلى إطالة وقت الفهرسة.</td><td>[1، int_max]</td><td>لا يوجد</td></tr>
<tr><td><code translate="no">m</code></td><td>عدد مجموعات المتجهات الفرعية المراد تقسيم المتجه إليها.</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>عدد البتات التي يتم تقسيم كل مجموعة من المتجهات الفرعية إليها.</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">refine</code></td><td>ما إذا كان يتم حجز البيانات المكررة أثناء بناء الفهرس.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>نوع بيانات الفهرس المنقح.</td><td><code translate="no">SQ6</code>، <code translate="no">SQ8</code> ، <code translate="no">BF16</code> ، ، <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>لا يوجد</td></tr>
</tbody>
</table>
</li>
<li><p>معلمات البحث</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>معلمة تتحكم في مفاضلة وقت/دقة البحث. يؤدي ارتفاع <code translate="no">ef</code> إلى بحث أكثر دقة ولكن أبطأ.</td><td>[<code translate="no">top_k</code> ، int_max]</td><td>لا يوجد</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>عامل التكبير للتكرير مقارنة بـ <em>k</em>.</td><td>[ 1, <em>float_max</em>]</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ<button data-href="#HNSWPRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PRQ مشابه لـ PQ، ويقسم المتجه أيضًا إلى <code translate="no">m</code> مجموعات. سيتم ترميز كل متجه فرعي على أنه <code translate="no">nbits</code>. بعد إكمال تكميم pq، سيحسب المتجه المتبقي بين المتجه والمتجه المكمم pq، ويطبق تكميم pq على المتجه المتبقي. سيتم إجراء ما مجموعه <code translate="no">nrq</code> عملية تكميم pq كاملة، وبالتالي سيتم ترميز متجه عائم طوله <code translate="no">dim</code> على هيئة <em>m ⋅ nbits ⋅ nrq</em> bits.</p>
<p>يوفر HNSW_PRQ، بالاقتران مع مُكوِّن الكمية المتبقية من المنتج (PRQ)، مفاضلة أعلى يمكن التحكم فيها بين حجم المؤشر والدقة. لديه قيمة QPS مكافئة تقريبًا ومعدل استرجاع أعلى من HNSW_PQ لنفس معدل الضغط. بالمقارنة مع HNSW_PQ، قد يزيد وقت بناء الفهرس عدة مرات.</p>
<ul>
<li><p>معلمات بناء الفهرس</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M تحدد الحد الأقصى لعدد الاتصالات الصادرة في الرسم البياني. يؤدي ارتفاع M إلى دقة أعلى/وقت تشغيل أعلى عند بناء ef/efConstruction ثابت.</td><td>[2, 2048]</td><td>لا يوجد</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>يتحكم ef_construction في سرعة البحث عن الفهرس/سرعة البناء. قد تؤدي زيادة معلمة efConstruction إلى تحسين جودة الفهرس، ولكنها تميل أيضًا إلى إطالة وقت الفهرسة.</td><td>[1، int_max]</td><td>لا يوجد</td></tr>
<tr><td><code translate="no">m</code></td><td>عدد مجموعات المتجهات الفرعية المراد تقسيم المتجه إليها.</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>عدد البتات التي يتم تقسيم كل مجموعة من المتجهات الفرعية إليها.</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">nrq</code></td><td>عدد المتجهات الفرعية المتبقية.</td><td>[1, 16]</td><td>2</td></tr>
<tr><td><code translate="no">refine</code></td><td>ما إذا كانت البيانات المكررة محجوزة أثناء بناء الفهرس.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>نوع بيانات الفهرس المنقح.</td><td><code translate="no">SQ6</code>، <code translate="no">SQ8</code> ، <code translate="no">BF16</code> ، ، <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>لا يوجد</td></tr>
</tbody>
</table>
</li>
<li><p>معلمات البحث</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>معلمة تتحكم في مفاضلة وقت/دقة البحث. يؤدي ارتفاع <code translate="no">ef</code> إلى بحث أكثر دقة ولكن أبطأ.</td><td>[<code translate="no">top_k</code> ، int_max]</td><td>لا يوجد</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>عامل التكبير للتكرير مقارنة بـ <em>k</em>.</td><td>[ 1, <em>float_max</em>]</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<div class="filter-binary">
<h3 id="BINFLAT" class="common-anchor-header">BIN_FLAT<button data-href="#BINFLAT" class="anchor-icon" translate="no">
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
    </button></h3><p>هذا المؤشر هو نفسه تمامًا مثل FLAT باستثناء أنه يمكن استخدامه فقط للتضمينات الثنائية.</p>
<p>بالنسبة لتطبيقات البحث عن التشابه المتجهي التي تتطلب دقة مثالية وتعتمد على مجموعات بيانات صغيرة نسبيًا (بمقياس مليون)، يعتبر الفهرس BIN_FLAT خيارًا جيدًا. لا يقوم الفهرس BIN_FLAT بضغط المتجهات، وهو الفهرس الوحيد الذي يمكن أن يضمن نتائج بحث دقيقة. يمكن أيضًا استخدام نتائج الفهرس BIN_FLAT كنقطة مقارنة للنتائج التي تنتجها الفهارس الأخرى التي تقل نسبة استرجاعها عن 100%.</p>
<p>يتسم BIN_FLAT بالدقة لأنه يتبع نهجًا شاملًا في البحث، وهو ما يعني أنه تتم مقارنة المدخلات المستهدفة لكل استعلام مع المتجهات في مجموعة البيانات. هذا يجعل من BIN_FLAT أبطأ فهرس في قائمتنا، وهو غير مناسب للاستعلام عن بيانات المتجهات الضخمة. لا توجد معلمات لفهرس BIN_FLAT في Milvus، ولا يتطلب استخدامه تدريبًا على البيانات أو تخزينًا إضافيًا.</p>
<ul>
<li><p>معلمات البحث</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[اختياري] مقياس المسافة المختار.</td><td>انظر <a href="/docs/ar/metric.md">المقاييس المدعومة</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="BINIVFFLAT" class="common-anchor-header">BIN_IVF_FLAT<button data-href="#BINIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h3><p>هذا المؤشر مماثل تمامًا لـ IVF_FLAT باستثناء أنه لا يمكن استخدامه إلا للتضمينات الثنائية.</p>
<p>يقسم BIN_IVF_FLAT بيانات المتجه إلى <code translate="no">nlist</code> وحدة عنقودية، ثم يقارن المسافات بين متجه الإدخال الهدف ومركز كل مجموعة. واعتمادًا على عدد المجموعات التي تم تعيين النظام للاستعلام عنها (<code translate="no">nprobe</code>)، يتم إرجاع نتائج البحث عن التشابه بناءً على المقارنات بين المدخلات المستهدفة والمتجهات في المجموعة (المجموعات) الأكثر تشابهًا فقط - مما يقلل وقت الاستعلام بشكل كبير.</p>
<p>من خلال ضبط <code translate="no">nprobe</code> ، يمكن إيجاد توازن مثالي بين الدقة والسرعة لسيناريو معين. يزداد وقت الاستعلام بشكل حاد مع زيادة عدد متجهات المدخلات المستهدفة (<code translate="no">nq</code>)، وعدد المجموعات المطلوب البحث عنها (<code translate="no">nprobe</code>).</p>
<p>BIN_IVF_FLAT هو فهرس BIN_IVF الأساسي، وتكون البيانات المشفرة المخزنة في كل وحدة متسقة مع البيانات الأصلية.</p>
<ul>
<li><p>معلمات بناء الفهرس</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>عدد وحدات المجموعة</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
<li><p>معلمات البحث</p>
<ul>
<li><p>بحث مشترك</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>عدد الوحدات المطلوب الاستعلام عنها</td><td>[1، ن ليست]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>بحث النطاق</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>الحد الأقصى لعدد الدلاء التي لا ترجع أي نتائج بحث.<br/>هذه معلمة بحث نطاق وتنهي عملية البحث عندما يصل عدد الدلاء الفارغة المتتالية إلى القيمة المحددة.<br/>يمكن أن تؤدي زيادة هذه القيمة إلى تحسين معدل الاستدعاء على حساب زيادة وقت البحث.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
</div>
<div class="filter-sparse">
<h3 id="SPARSEINVERTEDINDEX" class="common-anchor-header">متناثر_مقلوب_الفهرس<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>يحتفظ كل بُعد بقائمة من المتجهات التي لها قيمة غير صفرية في هذا البُعد. أثناء البحث، يكرر Milvus خلال كل بُعد من أبعاد متجه الاستعلام ويحسب الدرجات للمتجهات التي لها قيم غير صفرية في تلك الأبعاد.</p>
<ul>
<li><p>معلمات بناء الفهرس</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">inverted_index_algo</code></td><td>الخوارزمية المستخدمة لبناء الفهرس والاستعلام عنه. لمزيد من التفاصيل، راجع <a href="/docs/ar/sparse_vector.md#Set-index-params-for-vector-field">متجه متناثر</a>.</td><td><code translate="no">DAAT_MAXSCORE</code> (افتراضي)، <code translate="no">DAAT_WAND</code>, <code translate="no">TAAT_NAIVE</code></td></tr>
<tr><td><code translate="no">bm25_k1</code></td><td>يتحكم في تشبع تردد المصطلح. تزيد القيم الأعلى من أهمية ترددات المصطلحات في ترتيب المستندات.</td><td>[1.2, 2.0]</td></tr>
<tr><td><code translate="no">bm25_b</code></td><td>يتحكم في مدى تطبيع طول المستند. الإعداد الافتراضي هو 0.75.</td><td>[0, 1]</td></tr>
</tbody>
</table>
  <div class="alert note">
<p>تم إهمال المعلمة <code translate="no">drop_ratio_build</code> منذ الإصدار 2.5.4 من Milvus، والتي لا يزال من الممكن قبولها أثناء إنشاء الفهرس، ولكن لن يكون لها تأثير فعلي على الفهرس.</p>
  </div>
</li>
<li><p>معلمات البحث</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_search</code></td><td>نسبة قيم المتجهات الصغيرة التي يتم استبعادها أثناء عملية البحث. يسمح هذا الخيار بضبط عملية البحث بشكل دقيق من خلال تحديد نسبة أصغر القيم في متجه الاستعلام التي يجب تجاهلها. يساعد في تحقيق التوازن بين دقة البحث والأداء. كلما قلت القيمة المحددة ل <code translate="no">drop_ratio_search</code> ، قلت مساهمة هذه القيم الصغيرة في النتيجة النهائية. من خلال تجاهل بعض القيم الصغيرة، يمكن تحسين أداء البحث بأقل تأثير على الدقة.</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">ما الفرق بين مؤشر FLAT ومؤشر IVF_FLAT؟</font></summary></p>
<p>يقسم الفهرس IVF_FLAT مساحة المتجه إلى <code translate="no">nlist</code> مجموعة. إذا احتفظت بالقيمة الافتراضية <code translate="no">nlist</code> كـ 16384، يقارن Milvus المسافات بين المتجه الهدف ومراكز جميع المجموعات الـ 16384 للحصول على <code translate="no">nprobe</code> أقرب مجموعات. ثم يقارن Milvus المسافات بين المتجه الهدف والمتجهات في المجموعات المحددة للحصول على أقرب المتجهات. على عكس IVF_FLAT، يقارن FLAT مباشرةً المسافات بين المتجه الهدف وكل متجه.</p>
<p>
لذلك، عندما يكون العدد الإجمالي للمتجهات يساوي تقريبًا <code translate="no">nlist</code> ، فإن IVF_FLAT و FLAT لا يوجد فرق كبير في طريقة الحساب المطلوبة وأداء البحث. ولكن مع زيادة عدد المتجهات إلى ضعفين أو ثلاثة أضعاف أو ن ضعف <code translate="no">nlist</code> ، يبدأ فهرس IVF_FLAT في إظهار مزايا أكبر بشكل متزايد.</p>
<p>
راجع <a href="https://medium.com/unstructured-data-service/how-to-choose-an-index-in-milvus-4f3d15259212">كيفية اختيار فهرس في ميلفوس</a> لمزيد من المعلومات.</p>
</details>
<h2 id="Whats-next" class="common-anchor-header">ما التالي<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>تعرف على المزيد حول <a href="/docs/ar/metric.md">مقاييس التشابه</a> المدعومة في ملفوس.</li>
</ul>
