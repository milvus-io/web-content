---
id: release_notes.md
summary: ملاحظات إصدار Milvus
title: ملاحظات الإصدار
---
<h1 id="Release-Notes" class="common-anchor-header">ملاحظات الإصدار<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>اكتشف ما الجديد في Milvus! تلخص هذه الصفحة الميزات الجديدة والتحسينات والمشكلات المعروفة وإصلاحات الأخطاء في كل إصدار. ننصحك بزيارة هذه الصفحة بانتظام للتعرف على التحديثات.</p>
<h2 id="v301" class="common-anchor-header">الإصدار 3.0.1<button data-href="#v301" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 9 سبتمبر 2026</p>
<table>
<thead>
<tr><th>إصدار Milvus</th><th>إصدار SDK لـ Python</th><th>إصدار Node.js SDK</th><th>إصدار Java SDK</th><th>إصدار Go SDK</th></tr>
</thead>
<tbody>
<tr><td>3.0.1</td><td>3.0.1</td><td>3.0.5</td><td>3.0.9</td><td>3.0.1</td></tr>
</tbody>
</table>
<p>يسعدنا الإعلان عن إصدار Milvus v3.0.1! يضيف هذا الإصدار إدارة اللقطات باستخدام REST v2، وقدرات موسعة لإعادة الترتيب، ودعم حقل TEXT في عميل Go وواجهة برمجة التطبيقات RESTful، إلى جانب تحسينات في الأداء وإصلاحات تتعلق بـ Storage V3 واتساق البيانات والأمان.</p>
<h3 id="Features-improvements" class="common-anchor-header">تحسينات الميزات<button data-href="#Features-improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>تمت إضافة واجهات برمجة تطبيقات REST v2 لإدارة اللقطات الأصلية على نطاق المجموعة والاستعادة غير المتزامنة (<a href="https://github.com/milvus-io/milvus/pull/52118">#52118</a>، <a href="https://github.com/milvus-io/milvus/pull/52172">#52172</a>)</li>
<li>تمت إضافة عتبة قابلة للتكوين لعدد النتائج للتحكم في اختيار مسار إخراج Take لعمليات البحث والاستعلام (<a href="https://github.com/milvus-io/milvus/pull/52437">#52437</a>)</li>
<li>تمت إضافة دعم حقل TEXT إلى عميل Go وواجهة برمجة التطبيقات RESTful (<a href="https://github.com/milvus-io/milvus/pull/52450">#52450</a>)</li>
<li>تمت إضافة معدلات IOPS الأولية والقصوى القابلة للتكوين للقراءة للجداول الخارجية (<a href="https://github.com/milvus-io/milvus/pull/52503">#52503</a>)</li>
<li>تمت إضافة إعداد اختياري لمهام تحديث المجموعات الخارجية للانتظار حتى يتم فهرسة جميع المقاطع قبل الإبلاغ عن اكتمال العملية، دون تأخير نشر البيانات (<a href="https://github.com/milvus-io/milvus/pull/52712">#52712</a>)</li>
<li>تمت إضافة دعم إعادة ترتيب L1 لسلاسل وظائف البحث (<a href="https://github.com/milvus-io/milvus/pull/52745">#52745</a>)</li>
<li>تمت إضافة إعادة ترتيب RRF المرجح مع أوزان اختيارية لكل طلب ANN عبر FunctionScore وREST والبحث الهجين القديم وعميل Go (<a href="https://github.com/milvus-io/milvus/pull/52891">#52891</a>، <a href="https://github.com/milvus-io/milvus/pull/52926">#52926</a>)</li>
</ul>
<h3 id="Stability-improvements" class="common-anchor-header">تحسينات في الاستقرار<button data-href="#Stability-improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>تم تحسين أمان الذاكرة في فهارس وذاكرات التخزين المؤقت لـ RTree الهندسية، ومعالجة استعلامات WKB غير القابلة للتحليل واستعلامات الهندسة الفارغة (<a href="https://github.com/milvus-io/milvus/pull/51312">#51312</a>)</li>
<li>تحسين إدارة الذاكرة من خلال استعادة تخصيص الذاكرة المؤقتة على مستوى العملية وتصحيح تقديرات الذاكرة لتحميل حقول التخزين V2/V3 المتزامن وتحميل فهرس V3 القياسي (<a href="https://github.com/milvus-io/milvus/pull/51405">#51405</a>)</li>
<li>تقليل الاختناقات في التنزيل واستخدام الذاكرة أثناء إنشاء فهارس المجموعات الخارجية من خلال جعل عمليات القراءة متوازية وتدفق البيانات المتجهة الأولية إلى القرص (<a href="https://github.com/milvus-io/milvus/pull/51651">#51651</a>)</li>
<li>تحسين إنتاجية Woodpecker لأحمال العمل ذات الدُفعات الصغيرة والتزامن العالي من خلال تجميع عمليات الإضافة من جانب العميل وكشف إعدادات المزامنة (<a href="https://github.com/milvus-io/milvus/pull/51810">#51810</a>)</li>
<li>تحسين ملكية قارئ السجلات واتساق مدة الصلاحية، ومعالجة الكتل الفارغة، والإبلاغ عن أخطاء القراءة عبر مسارات التخزين والضغط (<a href="https://github.com/milvus-io/milvus/pull/51891">#51891</a>)</li>
<li>تحسين كفاءة فحص التجزئة للتجميع باستخدام مسار متداخل رباعي الاتجاهات ووسائل حماية ضد التضارب وحدود إعادة التجزئة (<a href="https://github.com/milvus-io/milvus/pull/51977">#51977</a>)</li>
<li>تقليل عبء معالجة الإدراج عن طريق تخطي تحليل نص الإدراج في سجل WAL للمجموعات التي لا تحتوي على حقول إخراج BM25 أو MinHash (<a href="https://github.com/milvus-io/milvus/pull/51986">#51986</a>)</li>
<li>تحسين الإبلاغ عن أعطال التخزين ومعالجة إعادة المحاولة من خلال الحفاظ على تصنيفات الأخطاء المؤقتة والدائمة عبر طبقات التنفيذ (<a href="https://github.com/milvus-io/milvus/pull/51990">#51990</a>)</li>
<li>تحسين أداء الاستعلامات المكانية من خلال تمكين تقسيم GIS الخشن/الدقيق ودمج المسندات في نفس العمود بشكل افتراضي (<a href="https://github.com/milvus-io/milvus/pull/52008">#52008</a>)</li>
<li>تحسين جدولة مهام فهرسة النصوص وتجزئة JSON باستخدام التحكم في القبول القائم على قائمة المهام المتراكمة المشتركة وأولوية الإرسال بالتناوب (<a href="https://github.com/milvus-io/milvus/pull/52010">#52010</a>)</li>
<li>تمت إضافة دعم mmap لتعيينات إزاحة المقاطع المختومة، مع خيارات تحميل مخصصة وحساب موارد القرص (<a href="https://github.com/milvus-io/milvus/pull/52035">#52035</a>)</li>
<li>تم تحسين تحميل بيانات Storage V2 عن طريق تشغيل تقدير ذاكرة المقاطع لكل عمود عند الطلب (<a href="https://github.com/milvus-io/milvus/pull/52037">#52037</a>)</li>
<li>تمت إضافة دعم AutoIndex من جانب الخادم للفهارس المرتبطة بحقول إخراج الوظائف الجديدة، مما يسمح لطلبات add_function_field بحذف معلمات الفهرس أو تحديد AUTOINDEX (<a href="https://github.com/milvus-io/milvus/pull/52109">#52109</a>)</li>
<li>تم تقليل أحجام بيانات تقارير توزيع QueryNode من خلال إعداد التقارير التزايدية مع اللجوء إلى التقرير الكامل كخيار بديل، وتقليل تخصيصات الذاكرة أثناء جمع المقاييس (<a href="https://github.com/milvus-io/milvus/pull/52111">#52111</a>، <a href="https://github.com/milvus-io/milvus/pull/52119">#52119</a>)</li>
<li>تحسين قوة تجزئة كلمات المرور عن طريق زيادة تكلفة bcrypt من 4 إلى 10، مع ضرورة تدوير بيانات الاعتماد لترقية التجزئات الحالية (<a href="https://github.com/milvus-io/milvus/pull/52145">#52145</a>)</li>
<li>تم تقليل عمليات فك التشفير الزائدة أثناء عمليات استيراد Parquet من خلال قراءة الأعمدة الطرفية المطلوبة فقط لحقول فرعية لمصفوفة البنية (<a href="https://github.com/milvus-io/milvus/pull/52224">#52224</a>)</li>
<li>تحسين تجميع الدمج القسري من خلال التخطيط متعدد الجولات القائم على الحجم وإلغاء إعداد عتبة التخطيط القديمة (<a href="https://github.com/milvus-io/milvus/pull/52242">#52242</a>)</li>
<li>تم تحديث cgosymbolizer لمنع تعطل عمليات Milvus التي تعمل برقم PID 1 بعد حدوث أخطاء أصلية (<a href="https://github.com/milvus-io/milvus/pull/52299">#52299</a>)</li>
<li>تحسين التحقق من عدد الصفوف لمدخلات التمييز الدلالي (<a href="https://github.com/milvus-io/milvus/pull/52409">#52409</a>)</li>
<li>تحسين التحكم في إعادة محاولة الاستيراد مع تراجع قابل للتكوين لإعادة محاولات الكتابة (<a href="https://github.com/milvus-io/milvus/pull/52414">#52414</a>، <a href="https://github.com/milvus-io/milvus/pull/52415">#52415</a>، <a href="https://github.com/milvus-io/milvus/pull/52427">#52427</a>)</li>
<li>تم تحسين إدارة دورة حياة مهام التحليل من خلال استعادة إصدارات الإحصائيات القديمة والحفاظ على حالات المحطات الطرفية (<a href="https://github.com/milvus-io/milvus/pull/52416">#52416</a>، <a href="https://github.com/milvus-io/milvus/pull/52417">#52417</a>)</li>
<li>تحسين تنسيق دورة حياة المقاطع عن طريق انتظار تحرير المقطع بعد انتهاء مهلة القفل (<a href="https://github.com/milvus-io/milvus/pull/52422">#52422</a>)</li>
<li>تحسين فرز التخزين لضغط البيانات باستخدام دمج k-way (<a href="https://github.com/milvus-io/milvus/pull/52429">#52429</a>)</li>
<li>تقليل توسع مخزن صحة الحقول القابلة للفراغ عن طريق الحفاظ على الأقنعة المعبأة عبر الوصول إلى المجموعات وتقييم التعبيرات وإحصائيات JSON (<a href="https://github.com/milvus-io/milvus/pull/52451">#52451</a>)</li>
<li>تحسين حماية بيانات الاعتماد الحساسة ومفاتيح واجهة برمجة التطبيقات (API) وتجزئة كلمات مرور RBAC وتفاصيل مصادر التجميع الخارجية من خلال منع الكشف عنها في السجلات أو رسائل الخطأ (<a href="https://github.com/milvus-io/milvus/pull/52487">#52487</a>، <a href="https://github.com/milvus-io/milvus/pull/52664">#52664</a>، <a href="https://github.com/milvus-io/milvus/pull/52710">#52710</a>)</li>
<li>تحسين التحكم في التزامن للتحديث الجزئي باستخدام التحقق المتفائل من CAS والمحاولات الآمنة للتعارضات المؤهلة (<a href="https://github.com/milvus-io/milvus/pull/52495">#52495</a>)</li>
<li>تحسين استقرار لقطات قراءة المقاطع المتنامية وإدارة عمر لقطات المخطط (<a href="https://github.com/milvus-io/milvus/pull/52572">#52572</a>)</li>
<li>تقليل عمليات المسح الزائدة لبيانات تعريف التفويض أثناء عمليات النسخ الاحتياطي (<a href="https://github.com/milvus-io/milvus/pull/52612">#52612</a>)</li>
<li>تحسين تعيين معرفات المتجهات القابلة للصفر عن طريق نقلها إلى طبقة الفهرس، وتوحيد معالجة المعرفات المنطقية، ودعم التعيينات المدعومة بـ mmap للفهارس المختومة (<a href="https://github.com/milvus-io/milvus/pull/52657">#52657</a>)</li>
<li>تحسين التزامن بين تجميع Sonic JIT وتحميل المكونات الإضافية لـ Go في إصدارات CPU و GPU (<a href="https://github.com/milvus-io/milvus/pull/52738">#52738</a>)</li>
<li>تحسين تحليل مسار الكتابة للوكيل من خلال ذاكرة التخزين المؤقت للبيانات الوصفية، مما أدى إلى التخلص من طلبات RPC الزائدة للمنسق وتحسين تصنيف الأخطاء (<a href="https://github.com/milvus-io/milvus/pull/52739">#52739</a>)</li>
<li>تقليل وقت حساب الاسترجاع من حوالي 3.08 ثوانٍ إلى 18.5 مللي ثانية عند topk=100000 في المعيار المرجعي المُبلغ عنه (<a href="https://github.com/milvus-io/milvus/pull/52763">#52763</a>)</li>
<li>تحسين تصفية الحقول القابلة للصفر من خلال إعادة استخدام خرائط بتات الصلاحية، مما يقلل من التخزين الزائد لإزاحة القيمة الصفرية، ويسرع عمليات نسخ مجموعات البتات (<a href="https://github.com/milvus-io/milvus/pull/52801">#52801</a>، <a href="https://github.com/milvus-io/milvus/pull/52823">#52823</a>، <a href="https://github.com/milvus-io/milvus/pull/52825">#52825</a>)</li>
<li>تم تحسين الفهارس القياسية الهجينة على الحقول الفرعية للبنى المتداخلة باستخدام STL_SORT عندما يصل عدد العناصر المتميزة إلى حد سعة خريطة البتات (<a href="https://github.com/milvus-io/milvus/pull/52849">#52849</a>)</li>
<li>تحسين كفاءة تصفية معرّفات المقاطع في ذاكرة التخزين المؤقتة للبيانات الوصفية (<a href="https://github.com/milvus-io/milvus/pull/52855">رقم #52855</a>)</li>
<li>تقليل تخصيصات الذاكرة في وظائف مساعدة التجزئة (<a href="https://github.com/milvus-io/milvus/pull/52857">#52857</a>)</li>
<li>تحسين فرز نتائج إعادة الترتيب المدمجة عن طريق التخلص من عمليات البحث في الخريطة لكل مقارنة (<a href="https://github.com/milvus-io/milvus/pull/52885">#52885</a>)</li>
<li>تحسين أمان الذاكرة عند التعامل مع القيم الافتراضية لـ JSON وعروض السلاسل غير المنتهية بـ NUL (<a href="https://github.com/milvus-io/milvus/pull/52906">#52906</a>)</li>
<li>تحسين أوقات بناء C++ من خلال التجميع الموحد المحدد النطاق، وتحسين التخزين المؤقت للمترجم، وتقليل أعمال التجميع الزائدة عن الحاجة (<a href="https://github.com/milvus-io/milvus/pull/52995">#52995</a>)</li>
<li>تحسين تغطية مقاييس نظام الملفات وحداثتها من خلال جمع المقاييس من أنظمة الملفات المخزنة مؤقتًا في وقت الاستخراج مع الحفاظ على أسماء المقاييس وتسمياتها الحالية (<a href="https://github.com/milvus-io/milvus/pull/53026">#53026</a>)</li>
<li>تمت إضافة إعداد growingBuildThreadRate القابل للتحديث لتكوين عدد الخيوط لكل عملية بناء مؤشر مؤقت للقطاع المتنامي مع الاحتفاظ بالإعداد الافتراضي أحادي الخيط (<a href="https://github.com/milvus-io/milvus/pull/53033">#53033</a>)</li>
<li>تمت إضافة دعم إعادة كتابة بيانات الحقول mmap إلى الإصدار 3.0 من خلال ترقية رجعية، مع خيار queryNode.mmap.writeback المعطل افتراضيًا (<a href="https://github.com/milvus-io/milvus/pull/53079">#53079</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">إصلاحات الأخطاء<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>تم إصلاح النتائج غير الصحيحة والتحقق غير المتسق من المسندات في استعلامات JSON وARRAY وTIMESTAMPTZ، بما في ذلك المسندات ذات الأنواع المختلطة، ومقارنات الأعداد الكبيرة، والتصفية عبر دفعات متعددة (<a href="https://github.com/milvus-io/milvus/pull/51775">#51775</a>)</li>
<li>تم إصلاح عدم اتساق البيانات المحدثة أثناء عمليات تحديث المجموعات الخارجية المتوازية عندما تمتد ملفات مصدر أحد الأجزاء عبر مهام متعددة (<a href="https://github.com/milvus-io/milvus/pull/51893">#51893</a>)</li>
<li>تم إصلاح تعبيرات MATCH التي كانت تقبل الشروط التي لا تعمل على مستوى العنصر (<a href="https://github.com/milvus-io/milvus/pull/51940">#51940</a>)</li>
<li>تم إصلاح عمليات البحث التي لا توجد لها نتائج مطابقة والتي كانت تفشل بسبب خطأ نوع معرّف غير مدعوم (<a href="https://github.com/milvus-io/milvus/pull/51999">#51999</a>)</li>
<li>تم إصلاح توقف Milvus المستقل أثناء إيقاف التشغيل عن طريق إضافة مهلة ترحيل قابلة للتكوين بقيمة افتراضية تبلغ 10 ثوانٍ (<a href="https://github.com/milvus-io/milvus/pull/52027">#52027</a>)</li>
<li>تم إصلاح طلبات تضمين الجداول الخارجية التي تستخدم هوية الكتلة الخاطئة عندما يتم مشاركة عمال DataNode عبر مجموعات الخدمة (<a href="https://github.com/milvus-io/milvus/pull/52042">#52042</a>)</li>
<li>تم إصلاح مشكلة كانت تمنع تحديث integration_id و model_deployment_id لوظائف TextEmbedding (<a href="https://github.com/milvus-io/milvus/pull/52081">#52081</a>)</li>
<li>تم إصلاح استجابات HTTP JSON التي كانت تتجاهل الحالة الصريحة ok=false لمقاطع التعبئة اللاحقة الفاشلة (<a href="https://github.com/milvus-io/milvus/pull/52082">#52082</a>)</li>
<li>تم إصلاح فشل تحميل كائنات MinIO مع ظهور خطأ HTTP 400 XAmzContentChecksumMismatch عند إعادة المحاولة بعد انتهاء مهلة النقل أو انخفاض السرعة (<a href="https://github.com/milvus-io/milvus/pull/52128">#52128</a>، <a href="https://github.com/milvus-io/milvus/pull/52194">#52194</a>)</li>
<li>تم إصلاح توقف موازنة المقاطع بين QueryNodes عند تمكين خدمة البث (<a href="https://github.com/milvus-io/milvus/pull/52147">#52147</a>، <a href="https://github.com/milvus-io/milvus/pull/52169">#52169</a>)</li>
<li>تم إصلاح فقدان البيانات الصامت أثناء ضغط المزج عندما تعذر إعادة بناء السجلات المحتفظ بها (<a href="https://github.com/milvus-io/milvus/pull/52200">#52200</a>)</li>
<li>تم إصلاح مشكلة فقدان إعدادات المجموعات عند استعادة اللقطات والانتقال بشكل غير متوقع إلى "التناسق القوي" (Strong consistency) كإعداد افتراضي (<a href="https://github.com/milvus-io/milvus/pull/52206">#52206</a>)</li>
<li>تم إصلاح حذف التدفق الذي كان يفقد المقاطع المختومة التي تم تحميلها حديثًا، مما يسمح بالاستعلام عن البيانات المحذوفة (<a href="https://github.com/milvus-io/milvus/pull/52218">#52218</a>)</li>
<li>تم إصلاح عدم إنشاء الفهارس المتداخلة بشكل صحيح للبيانات الفارغة (<a href="https://github.com/milvus-io/milvus/pull/52247">#52247</a>)</li>
<li>تم إصلاح حالات التعطل عند التبديل إلى خدمة التدفق التي كانت تترك العمليات في انتظار إلى أجل غير مسمى (<a href="https://github.com/milvus-io/milvus/pull/52292">#52292</a>)</li>
<li>تم إصلاح القيم الافتراضية غير الصحيحة للهندسة أثناء الضغط وإعادة بناء السجلات، وعلامات "null" غير الصحيحة لقيم الهندسة المملوءة افتراضيًا في عمليات استيراد Parquet (<a href="https://github.com/milvus-io/milvus/pull/52350">#52350</a>)</li>
<li>تم إصلاح رفض المقاطع V3 الصالحة أثناء عملية الضغط والاستعادة بعد إعادة تشغيل DataCoord (<a href="https://github.com/milvus-io/milvus/pull/52383">#52383</a>، <a href="https://github.com/milvus-io/milvus/pull/52389">#52389</a>، <a href="https://github.com/milvus-io/milvus/pull/52390">#52390</a>، <a href="https://github.com/milvus-io/milvus/pull/52391">#52391</a>، <a href="https://github.com/milvus-io/milvus/pull/52392">#52392،</a> <a href="https://github.com/milvus-io/milvus/pull/52393">#52393</a>)</li>
<li>تم إصلاح حالات فشل تحميل المقاطع المصحوبة بخطأ بيانات تعريف الإصدار المفقودة عند استخدام الفهارس العددية المختلطة على الحقول الفرعية لمصفوفة VARCHAR في الهياكل (<a href="https://github.com/milvus-io/milvus/pull/52385">#52385</a>)</li>
<li>تم إصلاح فشل تحديث الأعمدة الخارجية عند إعادة فتح قائمة البيانات المحدثة (<a href="https://github.com/milvus-io/milvus/pull/52397">#52397</a>)</li>
<li>تم إصلاح المعالجة غير الصحيحة للتوقيت الزمني في عمليات البحث التي تحتوي على شروط تعتمد على الوقت (<a href="https://github.com/milvus-io/milvus/pull/52407">#52407</a>)</li>
<li>تم إصلاح المعالجة غير الصحيحة لمدخلات ArrayOfVector في طلبات البحث (<a href="https://github.com/milvus-io/milvus/pull/52408">#52408</a>)</li>
<li>تم إصلاح فشل عمليات الإدراج في رفض الصفوف التي تتجاوز حد الحجم المدعوم (<a href="https://github.com/milvus-io/milvus/pull/52426">#52426</a>)</li>
<li>تم إصلاح مشكلة تجاهل الفهارس المؤقتة لإصدار الفهرس المستهدف المُعدّ مسبقًا (<a href="https://github.com/milvus-io/milvus/pull/52449">#52449</a>)</li>
<li>تم إصلاح مشكلة عدم إرجاع حقول الإخراج المتجهة الكثيفة في الاستعلامات التي تستخدم order_by (<a href="https://github.com/milvus-io/milvus/pull/52504">#52504</a>، <a href="https://github.com/milvus-io/milvus/pull/52606">#52606</a>)</li>
<li>تم إصلاح بقاء الامتيازات الملغاة سارية المفعول بعد إزالتها من مجموعة الامتيازات (<a href="https://github.com/milvus-io/milvus/pull/52554">#52554</a>)</li>
<li>تم إصلاح الأعداد غير الصحيحة لملفات binlog وتسميات تنسيق التخزين لشرائح Storage V3 بعد إعادة تشغيل DataCoord (<a href="https://github.com/milvus-io/milvus/pull/52571">#52571</a>، <a href="https://github.com/milvus-io/milvus/pull/52578">#52578</a>)</li>
<li>تم إصلاح توقف عمليات استعادة اللقطات الخارجية بسبب عدم موثوقية عمليات التحقق من إصدارات العمال أو إعادة المحاولة المتكررة للعمال غير المدعومين حتى انتهاء المهلة (<a href="https://github.com/milvus-io/milvus/pull/52639">#52639</a>)</li>
<li>تم إصلاح حالات فشل تحميل المقاطع للفهارس HYBRID في الحقول الفرعية من نوع struct-array مع ملفات STLSORT القديمة من الإصدار 3.0.0، دون الحاجة إلى إعادة الفهرسة (<a href="https://github.com/milvus-io/milvus/pull/52643">#52643</a>)</li>
<li>تم إصلاح حالات التعطل عند معالجة مخازن بيانات Arrow C ذات الطول صفر (<a href="https://github.com/milvus-io/milvus/pull/52652">#52652</a>)</li>
<li>تم إصلاح المعالجة غير الصحيحة للفشل عند تحميل أو إعادة فتح شرائح التخزين V3 بعد أخطاء البيان، مع الحفاظ على حالة الشريحة الحالية لإعادة المحاولة بأمان (<a href="https://github.com/milvus-io/milvus/pull/52678">#52678</a>)</li>
<li>تم إصلاح حالات فشل الاستعلامات عندما واجهت عوامل تصفية عناصر ARRAY مجموعات كاملة من القيم NULL أو المصفوفات الفارغة قبل العناصر اللاحقة (<a href="https://github.com/milvus-io/milvus/pull/52720">#52720</a>)</li>
<li>تم إصلاح مهام التعبئة التي تقوم بتثبيت التضمينات القديمة بعد تغيير مخطط المجموعة (<a href="https://github.com/milvus-io/milvus/pull/52789">#52789</a>)</li>
<li>تم إصلاح مشكلة إرجاع الحقول المفقودة في سجلات Storage V3 بقيمة NULL بدلاً من قيمها الافتراضية المعلنة (<a href="https://github.com/milvus-io/milvus/pull/52790">#52790</a>، <a href="https://github.com/milvus-io/milvus/pull/52807">#52807</a>، <a href="https://github.com/milvus-io/milvus/pull/52888">#52888</a>)</li>
<li>تم إصلاح حالات فشل النسخ من جانب الخادم التي كانت تمنع استعادة لقطات Storage V3 على GCS باستخدام بيانات اعتماد IAM/OAuth، بما في ذلك نسخ الكائنات التي يزيد حجمها عن 5 جيجابايت (<a href="https://github.com/milvus-io/milvus/pull/52792">#52792</a>)</li>
<li>تم إصلاح الوصول غير المصادق عليه من خلال تدفق مكالمات gRPC على منفذ الوكيل الخارجي (<a href="https://github.com/milvus-io/milvus/pull/52854">#52854</a>)</li>
<li>تم إصلاح مشكلة فقدان البيانات لطوابعها الزمنية الأصلية بعد ضغط المجموعات (<a href="https://github.com/milvus-io/milvus/pull/52859">#52859</a>)</li>
<li>تم إصلاح أعطال عقدة البث الناتجة عن فشل عمليات التفريغ المتكررة بعد إضافة حقل TEXT إلى المجموعات التي تحتوي على شرائح Storage V2 موجودة مسبقًا (<a href="https://github.com/milvus-io/milvus/pull/52897">#52897</a>)</li>
<li>تم إصلاح مشكلة الصفوف منتهية الصلاحية في شرائح Storage V3 التي تفشل في تشغيل عملية التضغط المستندة إلى حقل TTL وتبقى مخزنة حتى يتم استيفاء شرط تضغط آخر (<a href="https://github.com/milvus-io/milvus/pull/52931">#52931</a>)</li>
<li>تم إصلاح عدم اتساق المفاتيح الأساسية التي يتم إنشاؤها تلقائيًا بين المجموعات المصدر والهدف أثناء عمليات الاستيراد المكررة عبر CDC (<a href="https://github.com/milvus-io/milvus/pull/52941">#52941</a>)</li>
<li>تم إصلاح فقدان عمليات الكتابة المتزامنة أثناء ترحيل الخلفية WAL (<a href="https://github.com/milvus-io/milvus/pull/52947">#52947</a>، <a href="https://github.com/milvus-io/milvus/pull/52951">#52951</a>، <a href="https://github.com/milvus-io/milvus/pull/52955">#52955</a>)</li>
<li>تم إصلاح مشكلة أن الفهارس HYBRID المتداخلة المعاد بناؤها أو المضغوطة التي تحتوي على بيانات ذات كاردينالية عالية تصبح غير قابلة للقراءة بعد التراجع إلى إصدار أقدم (<a href="https://github.com/milvus-io/milvus/pull/52959">#52959</a>)</li>
<li>تم إصلاح معالجة العناصر ذات القيمة "null" في صفوف المتجهات الكثيفة الخارجية عن طريق قبول الصفوف القابلة للقيمة "null" التي تحتوي على قيم "null" بالكامل وإضافة معالجة قابلة للتكوين للصفوف التي تحتوي على قيم "null" جزئيًا (<a href="https://github.com/milvus-io/milvus/pull/52968">#52968</a>)</li>
<li>تم إصلاح الأعداد غير الصحيحة لصفوف شرائح V3 وفشل عمليات ضغط الفرز المتكررة بعد تجاوز فشل عقدة البث (<a href="https://github.com/milvus-io/milvus/pull/52970">#52970</a>)</li>
<li>تم إصلاح الاستعلامات التي تجمع بين شروط النطاق وعلامة OR، والتي كانت تتجاهل السجلات عند الحد الأدنى الشامل (<a href="https://github.com/milvus-io/milvus/pull/52998">#52998</a>)</li>
<li>تم إصلاح عمليات البحث باستخدام المفتاح الأساسي التي كانت تفشل في الحفاظ على ترتيب المعرفات المطلوب (<a href="https://github.com/milvus-io/milvus/pull/52999">#52999</a>)</li>
<li>تم إصلاح مشكلة كانت تمنع تحميل شرائح التخزين V2 القائمة القابلة للتوسيع عند إضافة حقل TEXT بعد تمكين التخزين V3، مما يؤدي إلى تعطيل عمليات التفريغ والفرز والفهرسة (<a href="https://github.com/milvus-io/milvus/pull/53002">#53002</a>)</li>
<li>تم إصلاح اللقطات التي تتضمن شرائح Storage V3 غير الملتزم بها، مما تسبب في ظهور تقارير نجاح عمليات الاستعادة في حين تعذر تحميل الشرائح المستعادة (<a href="https://github.com/milvus-io/milvus/pull/53022">#53022</a>، <a href="https://github.com/milvus-io/milvus/pull/53039">#53039</a>)</li>
<li>تم إصلاح مشكلة عدم تحميل فهارس النص في Storage V3 عندما كانت ملفاتها مخزنة في أدلة مهام أو إصدارات متداخلة (<a href="https://github.com/milvus-io/milvus/pull/53062">#53062</a>)</li>
</ul>
<h2 id="v300" class="common-anchor-header">v3.0.0<button data-href="#v300" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 29 يوليو 2026</p>
<table>
<thead>
<tr><th>إصدار Milvus</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th><th>إصدار Java SDK</th><th>إصدار Go SDK</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>تم الإصدار الرسمي لـ Milvus 3.0.0! استنادًا إلى بنية Lake-Native التي تم تقديمها في <a href="https://milvus.io/docs/release_notes.md#v30-beta">الإصدار 3.0-beta</a>، يكمل هذا الإصدار ما بدأته النسخة التجريبية: تغطي المجموعات الخارجية (External Collection) المزيد من سير عمل Lakehouse؛ ويدعم المخطط (schema) عمليات الإضافة والتعبئة والحذف عبر الإنترنت؛ وتم إعادة بناء الفهرس المتفرق (sparse index) حول SINDI؛ ويكمل كل من StructArray والبحث المتعدد الأوجه محرك الاسترجاع؛ كما يوسع تمرير FAISS و TEXT خيارات الفهرسة والطرق؛ ويعمل Woodpecker كخدمة مستقلة.</p>
<p>شاهد الفيديو أدناه لمعرفة المزيد عن Milvus 3.0 وجلسة الأسئلة والأجوبة (AMA) مع القائمين على الصيانة الأساسية:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>إذا كنت جديدًا على سلسلة الإصدارات 3.0، فإن قسم «ملخص ميزات Core 3.0» أدناه يلخص القدرات التي تم تقديمها في الإصدار 3.0-beta؛ وتحتوي <a href="https://milvus.io/docs/release_notes.md#v30-beta">ملاحظات الإصدار 3.0-beta</a> على التفاصيل الكاملة.</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">ما الجديد في الإصدار 3.0.0 (منذ الإصدار 3.0-beta)<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">المجموعة الخارجية: سير عمل أكثر اكتمالًا لنظام «ليكهاوس»</h4><p>قدمت النسخة 3.0-beta ميزة "External Collection": الرجوع إلى ملفات بحيرة البيانات في مكانها الأصلي، وإنشاء الفهارس، والبحث فيها دون نسخ البيانات إلى Milvus. ويوسع هذا الإصدار نطاق هذه الميزة لتشمل سير عمل استرجاع "lakehouse" الكامل. يمكن الآن للحقول الخارجية تغذية حقول إخراج الدوال مثل متجهات BM25 المتفرقة، وتوقيعات MinHash، وتضمينات النص، بحيث يتم إنشاء حقول الاسترجاع المستمدة من النص والنموذج داخل Milvus دون نسخ الجدول المصدر. كما يدعم التحديث تطور المخطط التراكمي: عندما تكتسب الجدولة الخارجية أعمدة جديدة، يقوم Milvus بتصحيح الأجزاء المتأثرة بدلاً من إعادة بناء المجموعة.</p>
<p>يضيف هذا الإصدار أيضًا تنسيقًا خارجيًا يُسمى « <code translate="no">milvus-table</code> » الذي يعامل بيانات تعريف Milvus Snapshot وبيانات بيان Storage V3 كمصدر خارجي، بحيث يمكن تقديم لقطة المجموعة نفسها كجدول خارجي — تحصل أنظمة المعالجة الدفعية وأنظمة التقديم على عرض مشترك مدعوم ببيان لنفس البيانات.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/create-an-external-collection.md">إنشاء مجموعة خارجية</a> <a href="/docs/ar/snapshots.md">ولقطات</a>.</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">مخطط مرن: إضافة الأعمدة وتعبئتها بأثر رجعي وحذفها عبر الإنترنت</h4><p>لا تظل المخططات ثابتة في بيئة الإنتاج — حيث يتم استبدال النماذج المدمجة، وتتكرار الميزات، ويتم إهمال الحقول — وكان هذا يعني في السابق إعادة بناء المجموعة بالكامل مع توقف مؤقت أو عمليات كتابة مزدوجة. الإصدار 3.0.0 يغلق هذه الحلقة: يمكن إضافة الأعمدة وتعبئتها وحذفها بينما يستمر تقديم الخدمة.</p>
<p>يعمل التعبئة في كلا الاتجاهين. تتعامل التعبئة الخارجية مع القيم المحسوبة خارج Milvus: أضف عمودًا، وقم بأخذ لقطة للمجموعة كنقطة انطلاق متسقة، وقم بتشغيل المهمة دون اتصال بالإنترنت، وأعد كتابة القيم، ويقوم Milvus بفهرسة العمود الجديد بشكل تدريجي — وبذلك تصبح ترقية نموذج التضمين عبر مئات الملايين من الصفوف مسارًا سريعًا دون أي توقف. يغطي التعبئة الداخلية القيم المشتقة من النواة: قم بإرفاق دالة BM25 أو MinHash بمجموعة موجودة ويتم حساب حقل الإخراج الخاص بها تلقائيًا على البيانات الموجودة.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/add-fields-to-an-existing-collection.md">«إضافة حقول إلى مجموعة موجودة</a>».</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">تجديد الفهرس المتفرق: SINDI، وBlock-Max WAND، وBlock-Max MaxScore</h4><p>يقوم Milvus 3.0 بتحديث فهرس المتجهات المتفرقة بشكل شامل. ويقدم خوارزميات بحث جديدة — <a href="https://arxiv.org/abs/2509.08395">SINDI</a> و Block-Max WAND و Block-Max MaxScore — إلى جانب ضغط القائمة المقلوبة، والتكمية القابلة للتكوين، واختيار خوارزمية البحث لكل حمل عمل. كما تم تحسين التحميل عبر mmap، والتسلسل، وتقييم BM25، مما يقلل من تكلفة تخزين الفهرس وتحميله للبحث عن المتجهات المتفرقة والنصوص الكاملة على نطاق واسع. في الاختبارات المعيارية الداخلية، يكون حجم فهرس BM25 المضغوط أصغر بنحو 3 أضعاف من حجم الفهرس المتفرق 2.6 عند معدل استرجاع مماثل، وتصل SINDI إلى ما يقارب 10 أضعاف معدل QPS لـ MaxScore على التضمينات المتفرقة المُتعلَّمة. بمجرد تمكين إصدار الفهرس الجديد (انظر ملاحظات التوافق والسلوك)، يصبح SINDI هو الإعداد الافتراضي للبحث المتفرق عن IP، ويصبح MaxScore هو الإعداد الافتراضي لـ BM25.</p>
<h4 id="StructArray-coverage" class="common-anchor-header">تغطية StructArray</h4><p>يدعم StructArray الآن القيم الفارغة، وفهارس الصور النقطية، وإضافة الحقول الديناميكية إلى المجموعات الحية، والتحديث الجزئي لحقول البنية من خلال upsert، مع تغطية REST والاستيراد المجمّع بما يتناسب مع ذلك.</p>
<p>يضيف البحث على مستوى العنصر بحثًا هجينًا عبر الحقول الفرعية المتجهة مع إمكانية التجميع القابل للتكوين لكل كيان (متغيرات max / sum / avg / top-k)، بالإضافة إلى البحث عن النطاق والتجميع (group-by) داخله. تغطي التصفية المتداخلة المسندات ( <code translate="no">element_filter</code> )، والمحددات الكمية ( <code translate="no">MATCH_ANY</code> / <code translate="no">MATCH_ALL</code> / <code translate="no">MATCH_LEAST</code> / <code translate="no">MATCH_MOST</code> / <code translate="no">MATCH_EXACT</code> )، والوصول إلى الحقول الفرعية الموضعية مثل <code translate="no">tags[0][name]</code> ، و <code translate="no">array_length()</code> في عمود البنية.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/array-of-structs.md">StructArray</a> <a href="/docs/ar/struct-array-operators.md">وعوامل StructArray</a>.</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">تجميع البحث والبحث المتعدد الأوجه</h4><p>يقوم "تجميع الاستعلامات" من الإصدار التجريبي بحساب إحصائيات دقيقة للبيانات التي تمت تصفيتها؛ ويضيف الإصدار 3.0.0 ميزة التصفية حسب الجوانب في مسار البحث. حدد حقلًا من جوانب التصفية عند إجراء البحث، وسيقوم Milvus بإرجاع قيم الجوانب الأعلى، حيث يمثل كل منها العضو الأكثر مطابقة في ترتيب الشبكة العصبية الاصطناعية (ANN) ومُرفقًا بمجموعات مثل COUNT و AVG — الشريط الجانبي للبحث المُصنَّف (العلامة التجارية، النطاق السعري، السمات) في طلب واحد، بدلاً من الاسترجاع الزائد والعد من جانب العميل.</p>
<h4 id="Function-Chain-reranking" class="common-anchor-header">إعادة الترتيب عبر سلسلة الوظائف</h4><p>أصبح من الممكن الآن إعادة الترتيب من خلال واجهة برمجة تطبيقات سلسلة الوظائف (Function Chain API)، التي تنفذ مسارًا مرتبًا ومحدد النوع كجزء من طلب بحث واحد. يمكن للسلسلة أن تجمع بين إعادة التقييم المبكر L0 على QueryNode وإعادة الترتيب L2 بعد التخفيض على Proxy، مما يدعم تحويل الدرجات ودمجها، وإعادة الترتيب القائم على النموذج، والفرز، وتقليص المرشحين دون الحاجة إلى تنسيق من جانب العميل. يضيف هذا الإصدار أيضًا تقييم XGBoost الأصلي لإعادة الترتيب في المستوى L0 باستخدام نماذج UBJ المسجلة كموارد ملفات (FileResources)، إلى جانب مزودي الاستدلال من Hugging Face لتضمين النصوص وإعادة الترتيب بناءً على تشابه الجمل، والتي يديرها الخادم.</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">حقول النصوص الطويلة (TEXT)</h4><p>تجعل حقول TEXT النصوص الطويلة ذات أولوية قصوى، مع إزالة حدود الطول من جانب التخزين: فهي تدعم <code translate="no">text_match</code> و <code translate="no">phrase_match</code> وBM25. تظل القيم التي يقل حجمها عن 64 كيلوبايت مضمنة؛ بينما تنتقل القيم الأكبر إلى ملفات LOB على مستوى القسم بتنسيق Vortex، حيث يخزن العمود مراجع <code translate="no">(file_id, offset)</code> فقط. يتم مشاركة ملفات LOB عبر المقاطع، لذا فإن عملية الضغط تنقل المراجع بدلاً من إعادة كتابة النص. بالنسبة لـ RAG، يعني هذا استرداد المتجهات والنص المصدر من نفس المخزن في عملية إدخال/إخراج واحدة — دون الحاجة إلى تشغيل مخزن blob خارجي.</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">تمرير فهرس FAISS</h4><p>يقبل نوع الفهرس الجديد « <code translate="no">FAISS</code> » سلاسل مصنع الفهرس Faiss التعسفية عبر المعلمة « <code translate="no">faiss_index_name</code> » — <code translate="no">IVF64,Flat</code> ، <code translate="no">HNSW16,Flat</code> ، <code translate="no">OPQ16,IVF64,PQ16x4</code> — مع تمرير معلمات البحث، بحيث يتم إعادة إنتاج وصفات Faiss مباشرةً على Milvus.</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">دعم تنسيقي Vortex و Lance</h4><p>تكتسب طبقة التخزين تنسيقين عموديين مفتوحين: Vortex باعتباره التنسيق الداخلي من الجيل التالي — الترميزات التكيفية (القاموس، RLE، حزم البتات، الضغط الخاص بالقيم العائمة)، وفك الضغط بدون نسخ، والمُحسّن لأحمال العمل المختلطة بين المتجهات والقيم القياسية — وLance جنبًا إلى جنب مع Parquet للتبادل في النظام البيئي المفتوح. من المقرر أن يصبح Vortex التنسيق الداخلي الافتراضي، مع تضمين دفع المرشحات (filter pushdown) ومتغير محلي في خطة العمل.</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">النشر المستقل لـ Woodpecker</h4><p>يمكن الآن نشر Woodpecker، وهو WAL الذي يشكل جوهر مسار الكتابة المتدفقة، كخدمة مستقلة بدلاً من تضمينه في العقد الأخرى — مع إمكانية التوسع المستقل وعزل الأعطال وقابلية المراقبة، مثل أي خدمة صغيرة أخرى. وهذا أمر مهم للغاية بالنسبة للمجموعات الكبيرة وأحمال العمل ذات معدل الكتابة العالي.</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">ملخص ميزات الإصدار 3.0<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>تم تقديم الميزات أدناه في <a href="https://milvus.io/docs/release_notes.md#v30-beta">الإصدار 3.0-beta</a> وهي جزء من الإصدار 3.0.0؛ راجع ملاحظات الإصدار التجريبي للاطلاع على التفاصيل الكاملة.</p>
<ul>
<li><strong>المجموعة الخارجية</strong> — استعلام بيانات lakehouse (Parquet، Lance، Iceberg، Vortex) في مكانها: بدون نسخ، للقراءة فقط، ومزامنة من خلال التحديث التراكمي.</li>
<li><strong>Snapshot</strong> — طرق عرض التجميع للقراءة فقط في وقت محدد حسب مرجع المقطع، مع سعة تخزين هامشية تقترب من الصفر.</li>
<li><strong>التخزين V3 (Loon)</strong> — تخزين عمودي قائم على قائمة البيانات في تخزين الكائنات؛ وهو الأساس لميزة «اللقطة» و«المجموعة الخارجية».</li>
<li><strong>الاستعلام / البحث ORDER BY</strong> — فرز متعدد الحقول من جانب الخادم مع ترتيب ASC / DESC لكل حقل.</li>
<li><strong>تجميع الاستعلامات</strong> — COUNT / SUM / AVG / MIN / MAX مع التجميع حسب المجموعات، ويتم تقييمها من جانب الخادم.</li>
<li><strong>EmbList + DiskANN</strong> — فهرسة متعددة المتجهات على القرص لقوائم التضمين StructArray، مع مسارات تسريع مثل Muvera وLemur.</li>
<li><strong>دالة MinHash (doc-in، doc-out)</strong> — توقيعات MinHash من جانب الخادم بالإضافة إلى ميزة « <code translate="no">MINHASH_LSH</code> » للكشف عن التكرارات شبه المتطابقة.</li>
<li><strong>المتجهات القابلة للقيمة الفارغة</strong> — NULL في جميع أنواع المتجهات الستة؛ يتخطى البحث الصفوف التي تحتوي على NULL، ويمتد AddField ليشمل حقول المتجهات.</li>
<li><strong>مدة صلاحية الكيان (Entity TTL</strong> ) — انتهاء الصلاحية لكل صف بناءً على حقل TIMESTAMPTZ.</li>
<li><strong>FileResource</strong> — قواميس مُدارة عبر الكتلة، وقوائم المرادفات، وقوائم الكلمات المُستبعدة للمحللات، وBM25، وText Match.</li>
<li><strong>Force Merge</strong> — ضغط المقاطع الذي يتم تشغيله بواسطة المشغل، في الوضع المتزامن أو غير المتزامن.</li>
</ul>
<h3 id="Compatibility-and-behavior-notes" class="common-anchor-header">ملاحظات حول التوافق والسلوك<button data-href="#Compatibility-and-behavior-notes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>يتم تعطيل Storage V3 (Loon) افتراضيًا.</strong> تتطلب الميزات التي تعتمد عليه — مثل حقول Snapshot وTEXT — تمكينه يدويًا عبر <code translate="no">common.storage.useLoonFFI</code>. سيتم تمكين Storage V3 افتراضيًا في إصدار لاحق.</li>
<li><strong>يتم ضمان التوافق والتراجع بين الإصدارين 2.6 و3.0</strong> — يمكن التراجع عن نشر الإصدار 3.0 إلى الإصدار 2.6. ومع ذلك، بمجرد تمكين أو استخدام الميزات التي تغير تنسيق البيانات المتسلسلة (على سبيل المثال Storage V3)، لن يكون التراجع ممكنًا بعد ذلك.</li>
<li><strong>إصدارات الفهرس الجديدة اختيارية في الوقت الحالي.</strong> تتطلب خوارزميات الفهرس التي تم تقديمها حديثًا رفع إصدار الفهرس المستهدف يدويًّا (<code translate="no">dataCoord.targetVecIndexVersion</code> إلى 10، و <code translate="no">dataCoord.targetScalarIndexVersion</code> إلى 4) قبل أن تصبح سارية المفعول؛ وسيتم تمكينها افتراضيًّا في إصدار لاحق.</li>
<li><strong>تم تحويل صور GPU إلى CUDA 12.9</strong> ولم تعد تحافظ على توافق GPU مع Ubuntu 20.04.</li>
</ul>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 9 مايو 2026</p>
<table>
<thead>
<tr><th>إصدار Milvus</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>يوسع Milvus 3.0-beta قاعدة بيانات المتجهات Milvus من خلال تكامل جديد مع نظام Lakebase المفتوح: تتيح ميزة External Collection لـ Milvus الاستعلام عن جداول Lakebase الخارجية دون نسخ، ويمكن لـ Spark قراءة مجموعات Milvus مباشرةً من خلال Snapshot. كما يوفر هذا الإصدار إمكانيات استرجاع أكثر ثراءً، ومخططًا أكثر تعبيرًا، وتخصيصًا أعمق للبحث النصي، وضوابط أكثر دقة لدورة حياة البيانات والنماذج، والمزيد من الضوابط من جانب المشغل. يُعد Milvus 3.0 النواة الأساسية لـ Zilliz Lakebase، حيث يدعم خدماته الموحدة، وعمليات الاكتشاف، والمعالجة المجمعة.</p>
<h3 id="Key-Features" class="common-anchor-header">الميزات الرئيسية<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">المجموعات الخارجية</h4><p>في خطوط أنابيب بيانات الذكاء الاصطناعي النموذجية، توجد تيرابايتات من التضمينات والبيانات الوصفية بالفعل في تخزين الكائنات كجداول Parquet أو Lance أو Iceberg. تؤدي نسخ تلك البيانات إلى Milvus إلى مضاعفة تكلفة التخزين، وإضافة خط أنابيب ETL يجب الحفاظ على تزامنه، ونقل إدارة البيانات بعيدًا عن العميل.</p>
<p>تعمل «الجمع الخارجي» على التخلص من عملية النسخ. يمكن لمجموعة Milvus الرجوع إلى الملفات في مواقعها الحالية، ولا يدير Milvus سوى المخطط والفهارس وتنفيذ الاستعلامات. يضمن التحديث التراكمي توافق المجموعة مع الملفات الأساسية. يمكن للعملاء الذين لا يمكن لبياناتهم مغادرة بحيرة البيانات، مثل فرق الشؤون المالية والرعاية الصحية، تشغيل استرجاع المتجهات على تلك البيانات في مكانها الحالي. كما يمكن تقديم مجموعة بيانات واحدة موجودة في بحيرة البيانات من خلال عدة مثيلات لـ Milvus في آن واحد.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/create-an-external-collection.md">إنشاء مجموعة خارجية</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">اللقطة</h4><p>غالبًا ما يحتاج تقديم الخدمة واكتشاف الدُفعات إلى نفس المجموعة في الوقت نفسه. يتطلب تقييم نموذج A/B، وإزالة التكرار على نطاق واسع، والتحقق من صحة التعبئة الرجعية، والتراجع عن الإصدار، عرضًا مستقرًا للمجموعة بينما لا تزال عمليات الكتابة جارية.</p>
<p>تُنشئ اللقطة عرضًا في وقت محدد وقراءة فقط للمجموعة من خلال الإشارة إلى الشرائح الموجودة بدلاً من نسخ البيانات، وبالتالي تكون تكلفة التخزين الهامشية قريبة من الصفر. يمكن للمهام الدفعية القراءة من اللقطة في ظل عزل من نمط MVCC بينما تستمر المجموعة الحية في قبول عمليات الكتابة.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/snapshots.md">«اللقطات</a>» <a href="/docs/ar/manage-snapshots.md">و«إدارة اللقطات</a>» و <a href="/docs/ar/snapshot-use-cases.md">«حالات استخدام اللقطات</a>».</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">ترتيب الاستعلامات/البحث</h4><p>يقبل البحث والاستعلام الآن الترتيب متعدد الحقول، مع نقل عملية الفرز إلى نواة Milvus وإمكانية ضبط المعلمات « <code translate="no">ASC</code> » و« <code translate="no">DESC</code> » لكل حقل على حدة. وهذا يسد فجوة شائعة في الإنتاج: غالبًا ما لا يتوافق ترتيب «Top-K» حسب المسافة وحدها مع احتياجات العمل عندما لا يكون العنصر الأكثر تشابهًا هو الأرخص أو الأحدث أو الأكثر شعبية.</p>
<p>لم تعد التطبيقات مضطرة إلى استرداد نتائج أكثر من اللازم وإعادة الترتيب على جانب العميل لتقديم ترتيب مركب.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">«فرز نتائج البحث حسب الحقول القياسية</a> » <a href="/docs/ar/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">و«فرز نتائج الاستعلام</a>».</p>
<h4 id="Query-Aggregation" class="common-anchor-header">تجميع الاستعلامات</h4><p>كان إنتاج إحصائيات توزيع المستأجرين، أو إحصائيات اكتمال الحقول، أو تقدم طرح الإصدارات من مجموعة Milvus يتطلب سحب الكيانات المطابقة إلى العميل وتجميعها هناك. يدفع Milvus 3.0 التجميع القياسي بنمط SQL إلى النواة. يقبل استدعاء الاستعلام " <code translate="no">group_by_fields</code> " وتعبيرات التجميع في " <code translate="no">output_fields</code>"، بما في ذلك " <code translate="no">count(*)</code>" و" <code translate="no">count(&lt;field&gt;)</code>" و" <code translate="no">sum(&lt;field&gt;)</code>" و" <code translate="no">avg(&lt;field&gt;)</code>" و" <code translate="no">min(&lt;field&gt;)</code>" و" <code translate="no">max(&lt;field&gt;)</code>". يتم تقييم التجميع من جانب الخادم بعد التصفية.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">«تجميع نتائج الاستعلام</a>».</p>
<h4 id="Null-Vector" class="common-anchor-header">المتجه الفارغ</h4><p>غالبًا ما يتم إنتاج التضمينات بشكل غير متزامن، لذا قد يصل الكيان قبل وصول متجهه. تحتوي البيانات متعددة الوسائط أيضًا على فجوات طبيعية، مثل مقطع فيديو بدون تسميات توضيحية أو منتج بدون صورة. لم تكن الإصدارات السابقة تقدم حلاً جيدًا: فإما أن تؤخر التطبيقات عملية الكتابة حتى يصبح المتجه جاهزًا، أو تملأ متجهًا مؤقتًا، وكلا الخيارين يضر بجودة الاسترجاع.</p>
<p>يدعم Milvus 3.0 القيمة NULL في حقول المتجهات عبر جميع أنواع المتجهات الستة. يتخطى البحث المتجهات ذات القيمة NULL تلقائيًا، ولا تتأثر جودة الاسترجاع، ولا تشغل المتجهات ذات القيمة NULL أي مساحة تخزين فعليًّا. يمتد « <code translate="no">AddField</code> » أيضًا ليشمل حقول المتجهات في إطار هذا التغيير: باستخدام « <code translate="no">nullable=True</code> »، يمكن لمجموعة (Collection) موجودة بالفعل إضافة حقول متجهات جديدة عبر الإنترنت دون الحاجة إلى إعادة البناء.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/nullable-and-default.md">«الحقول القابلة للصفر» (Nullable Fields</a>).</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">القاموس المخصص وقاموس المرادفات</h4><p>لا تلبي أدوات تحليل الكلمات الجاهزة دائمًا متطلبات جودة البحث في بيئة الإنتاج. يمكن أن تستفيد اللغة الصينية والمجالات المتخصصة مثل الطب والقانون والكيمياء والمجموعات النصية متعددة اللغات بشكل كبير من القواميس المخصصة وجداول المرادفات. حتى الآن، كانت هذه الموارد تتواجد في الغالب كعمليات إعادة كتابة للاستعلامات من جانب التطبيق.</p>
<p>يضيف Milvus 3.0 آلية FileResource لتسجيل قواميس أدوات التقطيع المخصصة، وقوائم المرادفات، وقوائم الكلمات الممنوعة، وقواعد تفكيك المركبات. بمجرد التسجيل، يمكن الرجوع إلى المورد من أي أداة تجزئة أو مرشح، ويصبح ساري المفعول على BM25 وأدوات التحليل و«مطابقة النص». يمكن الآن إصدار إصدارات من القواميس والمرادفات وإدارتها مركزيًا بدلاً من توزيعها عبر كود التطبيق.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/manage-file-resources.md">«إدارة موارد الملفات</a>».</p>
<h4 id="Entity-TTL" class="common-anchor-header">مدة صلاحية الكيان (TTL)</h4><p>تعد مدة صلاحية الكيان (TTL) على مستوى المجموعة ومستوى القسم غير دقيقة بما يكفي للعديد من سيناريوهات دورة الحياة والامتثال. غالبًا ما يكون للمستأجرين المختلفين داخل نفس المجموعة قواعد احتفاظ مختلفة، وقد تحتاج الكيانات الفردية إلى انتهاء صلاحيتها وفقًا لجدول زمني لا يتطابق مع بقية المجموعة.</p>
<p>يدعم Milvus 3.0 مدة الصلاحية (TTL) لكل كيان. قم بتعريف حقل « <code translate="no">TIMESTAMPTZ</code> » في المخطط، وقم بتمييزه كحقل TTL من خلال خاصية المجموعة، وسيقوم Milvus باستعادة الكيانات منتهية الصلاحية تلقائيًا. ويشمل ذلك طلبات «الحق في النسيان»، وبيانات الجلسة منتهية الصلاحية، وسجل المحادثات المحدود دون الحاجة إلى التنظيف من جانب التطبيق.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">«تعيين مدة الصلاحية (TTL) على مستوى الكيان</a>».</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>أضاف Milvus 2.6 فهرس <code translate="no">MINHASH_LSH</code> للكشف عن التكرارات شبه المتطابقة المستندة إلى المجموعات، لكن كان لا يزال يتعين على التطبيقات حساب توقيعات MinHash قبل كتابة البيانات في Milvus.</p>
<p>يضيف Milvus 3.0 دالة MinHash من جانب الخادم. قم بتعريف حقل إدخال <code translate="no">VARCHAR</code> وحقل إخراج <code translate="no">BINARY_VECTOR</code> في المخطط، وأرفق دالة <code translate="no">FunctionType.MINHASH</code> ، وسيقوم Milvus بحساب التوقيعات أثناء الإدراج والإدراج المجمّع والبحث. إلى جانب ميزة " <code translate="no">MINHASH_LSH</code>"، يدعم هذا سير عمل إزالة التكرار لمجموعات البيانات الكبيرة، وأخذ البصمات، وكشف الانتحال داخل Milvus.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/minhash-function.md">دالة MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>لم يعد الافتراض القائل «كيان واحد = متجه واحد» مناسبًا لعمليات الاسترجاع الحديثة. يتم تقسيم المستندات الطويلة إلى أجزاء عديدة، وتصدر نماذج التفاعل المتأخر مثل ColBERT متجهًا واحدًا لكل رمز، ويمكن أن تحمل الكيانات متعددة الوسائط عدة طرق عرض.</p>
<p>يخزن EmbList قائمة متجهات ذات طول متغير لكل كيان، مع استخدام " <code translate="no">DISKANN</code> " كفهرس على القرص. يعمل مسار القرص على التحكم في استخدام ذاكرة الوصول العشوائي (RAM) عندما يتجاوز المجموع اللغوي سعة الذاكرة المخصصة. يُعد EmbList + <code translate="no">DISKANN</code> أول متغير من عائلة StructList الأوسع نطاقًا في هذا الإصدار التجريبي (RC). أما باقي العائلة، بما في ذلك تصفية StructList وتسريع المتجهات المتعددة Muvera / Lemur، فمن المقرر تضمينها في الإصدار الرسمي 3.0.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/search-with-embedding-lists.md">البحث باستخدام قوائم التضمين</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">الدمج القسري</h4><p>تتراكم تجزئة المقاطع في أحمال العمل الإنتاجية بمرور الوقت، مما يتسبب في تقلب زمن استجابة الاستعلامات وزيادة حجم التخزين.</p>
<p>يضيف Milvus 3.0 القدرة على تشغيل ضغط المقاطع بشكل صريح خلال فترات خارج أوقات الذروة، في كل من الوضعين المتزامن وغير المتزامن.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/force-merge.md">«إجبار ضغط الدمج</a>».</p>
<h4 id="Storage-V3" class="common-anchor-header">التخزين V3</h4><p>يقدم Milvus 3.0 التخزين V3، وهو محرك تخزين عمودي قائم على قائمة البيانات، حيث تُخزّن البيانات والبيانات الوصفية في تخزين كائنات متوافق مع S3. يتم تسجيل كل إصدار من مجموعة البيانات كلقطة ثابتة لقائمة البيانات، وهي ملف مشفر بتنسيق Avro يسجل مجموعات الأعمدة وسجلات التغييرات والإحصائيات التي تتكون منها مجموعة البيانات.</p>
<p>قوائم البيانات هي ملفات Avro مضغوطة، وتسجل سجلات التغييرات عمليات الحذف على مستوى الكيانات دون إعادة كتابة ملفات البيانات. وهذا يحافظ على انخفاض عبء البيانات الوصفية مع نمو مجموعات البيانات. كما تفصل قائمة البيانات تتبع البيانات الوصفية عن مسار الاستعلام، مما يسمح للمجموعة (Collection) بإدارة المزيد من المقاطع دون الإضرار بأداء الاستعلام.</p>
<p>ونظرًا لأن الحالات يتم تخزينها في مخزن الكائنات، فإن مجموعة البيانات تكون ذاتية الوصف: يمكن لأي قارئ لديه حق الوصول إلى مسار التخزين اكتشافها وتفسيرها دون الحاجة إلى كتالوج مركزي. وتدعم هذه الخاصية تكامل «المجموعة الخارجية» و«اللقطة» وعمليات تكامل بحيرات البيانات المستقبلية.</p>
