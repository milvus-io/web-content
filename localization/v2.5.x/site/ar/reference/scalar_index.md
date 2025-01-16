---
id: scalar_index.md
related_key: scalar_index
summary: المؤشر القياسي في ميلفوس.
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
    </button></h1><p>يدعم Milvus عمليات البحث المفهرسة التي تجمع بين الحقول القياسية والمتجهة. ولتعزيز كفاءة عمليات البحث التي تتضمن حقولاً قياسية، قدم ميلفوس فهرسة الحقول القياسية بدءاً من الإصدار 2.1.0. تقدم هذه المقالة لمحة عامة عن فهرسة الحقول القياسية في ملفوس، مما يساعدك على فهم أهميتها وتنفيذها.</p>
<h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد إجراء عمليات البحث عن تشابه المتجهات في Milvus، يمكنك استخدام العوامل المنطقية لتنظيم الحقول القياسية في تعبيرات منطقية.</p>
<p>عندما يتلقى Milvus طلب بحث بتعبير منطقي كهذا، فإنه يقوم بتحليل التعبير المنطقي إلى شجرة بناء الجملة المجردة (AST) لإنشاء خطة فعلية لتصفية السمات. ثم يطبق Milvus الخطة الفيزيائية في كل جزء لتوليد <a href="/docs/ar/bitset.md">مجموعة بتات</a> كنتيجة للتصفية ويتضمن النتيجة كمعامل بحث متجه لتضييق نطاق البحث. في هذه الحالة، تعتمد سرعة عمليات البحث المتجه بشكل كبير على سرعة تصفية السمة.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/scalar_index.png" alt="Attribute filtering in a segment" class="doc-image" id="attribute-filtering-in-a-segment" />
   </span> <span class="img-wrapper"> <span>تصفية السمة في مقطع</span> </span></p>
<p>تعد فهرسة الحقول العددية طريقة لضمان سرعة تصفية السمات من خلال فرز قيم الحقول العددية بطريقة معينة لتسريع استرجاع المعلومات.</p>
<h2 id="Scalar-field-indexing-algorithms" class="common-anchor-header">خوارزميات فهرسة الحقول العددية<button data-href="#Scalar-field-indexing-algorithms" class="anchor-icon" translate="no">
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
    </button></h2><p>يهدف ميلفوس إلى تحقيق استخدام منخفض للذاكرة، وكفاءة تصفية عالية، ووقت تحميل قصير من خلال خوارزميات فهرسة الحقول العددية. تصنف هذه الخوارزميات إلى نوعين رئيسيين: <a href="#auto-indexing">الفهرسة التلقائية</a> <a href="#inverted-indexing">والفهرسة المقلوبة</a>.</p>
<h3 id="Auto-indexing" class="common-anchor-header">الفهرسة التلقائية</h3><p>يوفر ميلفوس الخيار <code translate="no">AUTOINDEX</code> لتحريرك من الاضطرار إلى اختيار نوع الفهرسة يدويًا. عند استدعاء طريقة <code translate="no">create_index</code> ، إذا لم يتم تحديد <code translate="no">index_type</code> ، يقوم ميلفوس تلقائيًا باختيار نوع الفهرسة الأنسب بناءً على نوع البيانات.</p>
<p>يسرد الجدول التالي أنواع البيانات التي يدعمها Milvus وخوارزميات الفهرسة التلقائية المقابلة لها.</p>
<table>
<thead>
<tr><th>نوع البيانات</th><th>خوارزمية الفهرسة التلقائية</th></tr>
</thead>
<tbody>
<tr><td>فهرس مقلوب</td><td>فهرس مقلوب</td></tr>
<tr><td>INT8</td><td>فهرس مقلوب</td></tr>
<tr><td>INT16</td><td>فهرس مقلوب</td></tr>
<tr><td>INT32</td><td>فهرس مقلوب</td></tr>
<tr><td>INT64</td><td>فهرس مقلوب</td></tr>
<tr><td>فهرس مسطح</td><td>فهرس مقلوب</td></tr>
<tr><td>مزدوج</td><td>فهرس مقلوب</td></tr>
</tbody>
</table>
<h3 id="Inverted-indexing" class="common-anchor-header">الفهرسة المقلوبة</h3><p>توفر الفهرسة المقلوبة طريقة مرنة لإنشاء فهرس لحقل قياسي عن طريق تحديد معلمات الفهرس يدويًا. تعمل هذه الطريقة بشكل جيد مع سيناريوهات مختلفة، بما في ذلك الاستعلامات النقطية، واستعلامات مطابقة الأنماط، وعمليات البحث عن النص الكامل، وعمليات البحث عن JSON، وعمليات البحث المنطقي، وحتى استعلامات مطابقة البادئة.</p>
<p>يتم تشغيل الفهارس المقلوبة التي تم تنفيذها في Milvus بواسطة <a href="https://github.com/quickwit-oss/tantivy">Tantivy،</a> وهي مكتبة محرك بحث النص الكامل. تضمن Tantivy أن تكون الفهرسة المقلوبة في Milvus فعالة وسريعة.</p>
<p>يحتوي الفهرس المقلوب على عنصرين رئيسيين: قاموس المصطلح والقائمة المقلوبة. يتضمن قاموس المصطلحات جميع الكلمات الرمزية مرتبة أبجديًا، بينما تحتوي القائمة المقلوبة على قائمة المستندات التي تظهر فيها كل كلمة. هذا الإعداد يجعل الاستعلامات النقطية واستعلامات النطاق أسرع بكثير وأكثر كفاءة من عمليات البحث الغاشمة.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/scalar_index_inverted.png" alt="Inverted index diagram" class="doc-image" id="inverted-index-diagram" />
   </span> <span class="img-wrapper"> <span>مخطط الفهرس المقلوب</span> </span></p>
<p>تتضح مزايا استخدام الفهرس المقلوب بشكل خاص في العمليات التالية:</p>
<ul>
<li><strong>الاستعلام النقطي</strong>: على سبيل المثال، عند البحث عن المستندات التي تحتوي على كلمة <strong>Milvus،</strong> تبدأ العملية بالتحقق مما إذا كانت كلمة <strong>Milvus</strong> موجودة في قاموس المصطلح. إذا لم يتم العثور عليها، فلا توجد مستندات تحتوي على الكلمة. ومع ذلك، إذا تم العثور عليها، يتم استرجاع القائمة المقلوبة المرتبطة بكلمة <strong>Milvus،</strong> مع الإشارة إلى المستندات التي تحتوي على الكلمة. تعد هذه الطريقة أكثر كفاءة بكثير من البحث بالقوة الغاشمة من خلال مليون مستند، حيث يقلل قاموس المصطلحات المصنفة بشكل كبير من تعقيدات الوقت اللازم للعثور على كلمة <strong>Milvus</strong>.</li>
<li><strong>استعلام النطاق</strong>: يتم أيضًا تعزيز كفاءة استعلامات النطاق، مثل العثور على المستندات التي تحتوي على كلمات أكبر من <strong>جدا</strong> أبجديًا، من خلال قاموس المصطلحات المصنفة. يعد هذا النهج أكثر كفاءة من البحث الفوري، مما يوفر نتائج أسرع وأكثر دقة.</li>
</ul>
<h3 id="Test-results" class="common-anchor-header">نتائج الاختبار</h3><p>لتوضيح التحسينات في الأداء التي توفرها الفهارس القياسية في ميلفوس، تم إجراء تجربة تقارن أداء العديد من التعبيرات باستخدام الفهرسة المقلوبة والبحث بالقوة الغاشمة على البيانات الأولية.</p>
<p>تضمنت التجربة اختبار تعبيرات مختلفة في ظل شرطين: باستخدام فهرس مقلوب وبحث بالقوة الغاشمة. لضمان العدالة، تم الحفاظ على نفس توزيع البيانات عبر الاختبارات، باستخدام نفس المجموعة في كل مرة. قبل كل اختبار، تم تحرير المجموعة، وتم إسقاط الفهرس وإعادة بنائه. بالإضافة إلى ذلك، تم إجراء استعلام دافئ قبل كل اختبار لتقليل تأثير البيانات الباردة والساخنة، وتم تنفيذ كل استعلام عدة مرات لضمان الدقة.</p>
<p>بالنسبة لمجموعة بيانات مكونة من <strong>مليون</strong> سجل، يمكن أن يوفر استخدام <strong>فهرس مقلوب</strong> ما يصل إلى <strong>30 ضعفًا</strong> من الأداء للاستعلامات النقطية. يمكن أن تكون مكاسب الأداء أكثر أهمية بالنسبة لمجموعات البيانات الأكبر حجمًا.</p>
<h2 id="Performance-recommandations" class="common-anchor-header">توصيات الأداء<button data-href="#Performance-recommandations" class="anchor-icon" translate="no">
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
    </button></h2><p>للاستفادة الكاملة من قدرة Milvus في فهرسة الحقول القياسية وإطلاق العنان لقوته في عمليات البحث عن التشابه المتجه، قد تحتاج إلى نموذج لتقدير حجم الذاكرة المطلوبة بناءً على البيانات التي لديك.</p>
<p>تسرد الجداول التالية وظائف التقدير لجميع أنواع البيانات التي يدعمها ملفوس.</p>
<ul>
<li><p>الحقول العددية</p>
<table>
<thead>
<tr><th>نوع البيانات</th><th>دالة تقدير الذاكرة (ميغابايت)</th></tr>
</thead>
<tbody>
<tr><td>INT8</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT16</td><td>عدد الصفوف * <strong>12/1024</strong> / 1024 / 1024</td></tr>
<tr><td>INT32</td><td>عدد الصفوف * <strong>12</strong> / 1024 / 1024 / 1024</td></tr>
<tr><td>INT64</td><td>numOfRows * <strong>24</strong> / 1024 / 1024 / 1024</td></tr>
<tr><td>FLOAT32</td><td>عدد الصفوف * <strong>12</strong> / 1024 / 1024 / 1024</td></tr>
<tr><td>مزدوج</td><td>عدد الصفوف * <strong>24</strong> / 1024 / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
<li><p>حقول السلسلة</p>
<table>
<thead>
<tr><th>طول السلسلة</th><th>دالة تقدير الذاكرة (ميغابايت)</th></tr>
</thead>
<tbody>
<tr><td>(0, 8]</td><td>numOfRows * <strong>128</strong> / 1024 / 1024</td></tr>
<tr><td>(8, 16]</td><td>عدد الصفوف * <strong>144</strong> / 1024 / 1024 / 1024</td></tr>
<tr><td>(16, 32]</td><td>عدد الصفوف * <strong>160</strong> / 1024 / 1024 / 1024</td></tr>
<tr><td>(32, 64]</td><td>عدد الصفوف * <strong>192</strong> / 1024 / 1024 / 1024</td></tr>
<tr><td>(64, 128]</td><td>عدد الصفوف * <strong>256</strong> / 1024 / 1024 / 1024</td></tr>
<tr><td>(128, 65535]</td><td>numOfRows * <strong>strLen * 1.5</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
</ul>
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
<li><p>لفهرسة حقل عدد ثابت، اقرأ <a href="/docs/ar/index-scalar-fields.md">إنشاء فهرس على عدد ثابت</a>.</p></li>
<li><p>لمعرفة المزيد حول المصطلحات والقواعد ذات الصلة المذكورة أعلاه، اقرأ</p>
<ul>
<li><a href="/docs/ar/bitset.md">مجموعة بت</a></li>
<li><a href="/docs/ar/multi-vector-search.md">البحث الهجين</a></li>
<li><a href="/docs/ar/boolean.md">قواعد التعبير المنطقي</a></li>
<li><a href="/docs/ar/schema.md#Supported-data-type">أنواع البيانات المدعومة</a></li>
</ul></li>
</ul>