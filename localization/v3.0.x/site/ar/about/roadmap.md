---
id: roadmap.md
title: خريطة طريق Milvus
related_key: Milvus roadmap
summary: >-
  استكشف خطة عمل Milvus فيما يتعلق بالبحث والتحليلات وتطوير المخططات والتكامل مع
  بحيرة البيانات والأداء عبر الإصدارين 3.0 و3.1.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">خريطة طريق Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>يجمع Milvus 3.0 بين الاسترجاع متعدد المتجهات، والاستعلامات بنمط SQL، والمخططات المرنة، والوصول إلى البيانات المخزنة في بحيرة البيانات. وتستند المراحل التالية إلى هذا الأساس من خلال استعلامات أكثر ثراءً، ونماذج بيانات أوسع نطاقًا، وتحسينات في الأداء والحجم. تحدد خارطة الطريق هذه أولويات Milvus مفتوح المصدر.</p>
<p>أصبح Milvus 3.0 متاحًا للجميع بدءًا من <strong>الإصدار v3.0.1</strong>. تم تقديم الإمكانات المُصدرة أدناه في <strong>الإصدار v3.0.0؛</strong> ويتم تحديد الميزات التمهيدية والإمكانات الاختيارية عند ظهورها. توسع سلسلة الإصدارات <strong>3.0.x</strong> نطاق هذه القدرات، بينما <strong>يستهدف</strong> الإصدار <strong>3.1 شهر ديسمبر 2026</strong>. قد تتغير الميزات المخطط لها والتواريخ المستهدفة مع تقدم عملية التطوير.</p>
<h2 id="Search-and-retrieval" class="common-anchor-header">البحث والاسترجاع<button data-href="#Search-and-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>تركز خارطة طريق الاسترجاع على دمج المزيد من إشارات الصلة داخل Milvus، بدءًا من مطابقة النص والتمثيلات متعددة المتجهات وصولًا إلى إعادة الترتيب ووجهات نظر نتائج البحث.</p>
<p><strong>متوفرة في الإصدار 3.0</strong></p>
<ul>
<li><strong>الاسترجاع متعدد المتجهات:</strong> يدعم البحث في StructArray كل من Muvera وLemur، مع استخدام « <code translate="no">element_filter</code> » للتصفية على مستوى العناصر. تشمل سياسات المطابقة: « <code translate="no">MATCH_ANY</code> » و« <code translate="no">MATCH_ALL</code> » و« <code translate="no">MATCH_LEAST</code> » و« <code translate="no">MATCH_MOST</code> » و« <code translate="no">MATCH_EXACT</code> ».</li>
<li><strong>مطابقة النص والتشابه:</strong> تعمل القواميس المخصصة والمرادفات على تكييف استرجاع النص وفقًا لاحتياجات التطبيق. يدعم التصفية باستخدام التعبيرات النمطية (Regex) مطابقة الأنماط، كما يدعم MinHash الكشف عن النصوص شبه المكررة.</li>
<li><strong>إعادة الترتيب والاستدلال:</strong> يقدم Milvus 3.0 مجموعة أولية من قدرات إعادة الترتيب في سلسلة الوظائف (Function Chain)، إلى جانب مزود الاستدلال Hugging Face. ومن المقرر توفير قدرات سلسلة الوظائف المتبقية في الإصدار 3.0.x.</li>
<li><strong>تجميع نتائج البحث:</strong> يوفر تجميع نتائج البحث جوانب تصفية لنتائج البحث.</li>
</ul>
<p><strong>مخطط للإصدار 3.0.x</strong></p>
<p>من المقرر أن تضيف سلسلة الإصدارات 3.0.x المطابقة التقريبية والإحصاءات الشاملة، بالإضافة إلى الدعم الكامل لسلسلة الوظائف.</p>
<p><strong>مخطط له في الإصدار 3.1</strong></p>
<p>تشمل الخطط الاسترجاع القائم على Grep، والتكامل الأوثق بين البحث عن أقرب جار تقريبي (ANN) والتصفية من خلال دمج مرشح ANN، وتحسينات على الاسترجاع المتفرق.</p>
<h2 id="Analytics-and-SQL-style-querying" class="common-anchor-header">التحليلات والاستعلامات بنمط SQL<button data-href="#Analytics-and-SQL-style-querying" class="anchor-icon" translate="no">
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
    </button></h2><p>تعمل Milvus على توسيع محرك الاستعلام الخاص بها حتى تتمكن التطبيقات من فرز البيانات وتجميعها جنبًا إلى جنب مع عملية الاسترجاع. وتضيف المرحلة التالية عمليات الربط، وطرق العرض المادية، والحسابات المخصصة.</p>
<p><strong>متوفر في الإصدار 3.0</strong></p>
<p>يدعم الاستعلام والبحث عملية الفرز باستخدام « <code translate="no">ORDER BY</code> ». تضيف ميزة «Query Aggregation» وظيفة « <code translate="no">GROUP BY</code> » لحساب الإحصائيات المجمعة.</p>
<p><strong>مخطط للإصدار 3.1</strong></p>
<ul>
<li><strong>استعلامات أكثر ثراءً:</strong> إدخال عمليات الربط، بدءًا من عمليات الربط شبه الكاملة، ومجموعات العروض المادية.</li>
<li><strong>تحديثات البيانات وسلامتها:</strong> دعم التحديثات في المكان وإزالة التكرار للمفاتيح الأساسية أثناء الاستيعاب.</li>
<li><strong>تكرار الاستعلام ودلالات JSON:</strong> إضافة مكرر استعلام يحفظ الحالة، و <code translate="no">GROUP BY</code> JSON، ودلالات NULL في SQL / JSON.</li>
<li><strong>الحساب المخصص:</strong> دعم الدوال المحددة من قبل المستخدم (UDFs) في Python.</li>
</ul>
<h2 id="Flexible-schema-and-data-types" class="common-anchor-header">مرونة المخطط وأنواع البيانات<button data-href="#Flexible-schema-and-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>تركز أعمال المخطط على تطوير المجموعات الحالية وتمثيل نطاق أوسع من البيانات. وهي تشمل تغييرات الحقول، والهياكل متعددة المتجهات، والنصوص الطويلة، وانتهاء صلاحية الكيانات.</p>
<p><strong>متوفر في الإصدار 3.0</strong></p>
<ul>
<li><strong>تغييرات المخطط عبر الإنترنت:</strong> تدعم المجموعات الحالية إضافة الحقول عبر الإنترنت، بما في ذلك حقول المتجهات و <code translate="no">Array&lt;Struct&gt;</code>. تتوفر ميزة حذف الحقول في <strong>النسخة التجريبية</strong> وقد تكون هناك بعض القيود.</li>
<li><strong>التعبئة التكميلية للبيانات الحالية:</strong> تستخدم التعبئة التكميلية الخارجية موصل Spark. أما التعبئة التكميلية الداخلية، فتقوم بإرفاق دالة BM25 أو MinHash بمجموعة ما وتحسب ناتجها على البيانات الحالية.</li>
<li><strong>البيانات النصية والمتعددة المتجهات:</strong> يخزن النوع <code translate="no">TEXT</code> النصوص الطويلة، بينما يدعم StructArray الاسترجاع بالتفاعل المتأخر من خلال <code translate="no">MAX_SIM</code>. يتطلب <code translate="no">TEXT</code> الاشتراك في Storage V3.</li>
<li><strong>القيم NULL وانتهاء الصلاحية:</strong> تقبل الحقول المتجهة القيم NULL، ويتحكم وقت البقاء (TTL) على مستوى الكيان في انتهاء الصلاحية.</li>
</ul>
<p><strong>مخطط له في الإصدار 3.0.x</strong></p>
<p>تعمل تحسينات المخطط المخطط لها على توسيع دعم StructArray للأنواع والقيم NULL وإضافة الحقول وإزالتها. كما تضيف دعمًا للصيغ الجزيئية ومرشحات <code translate="no">IS NULL</code> / <code translate="no">IS NOT NULL</code> لحقول المتجهات.</p>
<p><strong>مخطط للإصدار 3.1</strong></p>
<p>تشمل امتدادات نموذج البيانات التالية JSON وStruct المتداخلة، والمفاتيح الأساسية المركبة، والمجموعات التي لا تحتوي على حقول متجهة، والمتجهات المتفرقة في StructList.</p>
<h2 id="Lake-integration-and-data-versioning" class="common-anchor-header">التكامل مع Lake وإصدارات البيانات<button data-href="#Lake-integration-and-data-versioning" class="anchor-icon" translate="no">
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
    </button></h2><p>تعمل Milvus على تطوير تكامل أوثق مع تخزين بحيرة البيانات والمعالجة الدفعية. تتيح المجموعات الخارجية الوصول إلى البيانات في مكان وجودها، بينما توفر اللقطات أساسًا لإصدارات البيانات.</p>
<p><strong>متوفر في الإصدار 3.0</strong></p>
<ul>
<li><strong>الوصول إلى البيانات الخارجية:</strong> تدعم المجموعات الخارجية بيانات Lance وParquet وIceberg.</li>
<li><strong>اللقطات والتكامل الدفعي:</strong> تلتقط اللقطة إصدارًا من بيانات المجموعة، ويدعم موصل Spark سير العمل الدفعي.</li>
<li><strong>أساس التخزين:</strong> يوفر التخزين V3 (Loon) دعمًا اختياريًا لـ Vortex وLance. يتم تعطيله افتراضيًا ويتم تمكينه من خلال <code translate="no">common.storage.useLoonFFI</code>. تعتمد كل من اللقطات و <code translate="no">TEXT</code> عليه.</li>
</ul>
<p><strong>مخطط للإصدار 3.0.x</strong></p>
<p>تسمح التحسينات المخطط لها باستخدام لقطة جمع Milvus كجمع خارجي. كما يمتد دعم الجداول الخارجية ليشمل تجزئة JSON وإضافة حقول وظيفية وإزالة الحقول.</p>
<p><strong>مخطط للإصدار 3.1</strong></p>
<p>تشمل الخطط الفهارس المتفرقة والعددية المستندة إلى S3، إلى جانب الحذف من خلال الاستيراد.</p>
<h2 id="Performance-indexing-and-scale" class="common-anchor-header">الأداء والفهرسة والتوسع<button data-href="#Performance-indexing-and-scale" class="anchor-icon" translate="no">
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
    </button></h2><p>تغطي خارطة طريق الأداء فهارس الاسترجاع وتنفيذ الاستعلامات ونمو المجموعات. كما تتناول الاستعادة والاستعلامات التي تتطلب قراءة البيانات من تخزين الكائنات.</p>
<p><strong>متوفر في الإصدار 3.0</strong></p>
<ul>
<li><strong>الفهرسة المتفرقة:</strong> يقدم إصلاح الفهرس المتفرق SINDI.</li>
<li><strong>اختيار الفهرس:</strong> يقبل فهرس التمرير المباشر لـ " <code translate="no">FAISS</code> " سلاسل مصنع الفهارس Faiss، مع خيارات تشمل SVS و Panorama و PQ و IVFPQ و ScaNN. كما تتوفر فهرسة DiskANN لقوائم التضمين (EmbList).</li>
<li><strong>الضغط:</strong> توفر ميزة «Force Merge» تحكمًا صريحًا في دمج المقاطع.</li>
</ul>
<p><strong>مخطط للإصدار 3.1</strong></p>
<ul>
<li><strong>الاستعلامات التي تراعي التخزين:</strong> إضافة دفع المسند لـ Vortex، بما في ذلك التقليم على مستوى الصفحة وتخطي الفهارس.</li>
<li><strong>نمو المجموعة والتأجير:</strong> دعم تقسيم الشظايا، ومفاتيح التجزئة المخصصة، وتحسينات التأجير المتعدد.</li>
<li><strong>تنفيذ الاستعلامات والفهرسة:</strong> تطوير QueryView، وتحسين الدعم للمجموعات الواسعة، وتقليل نتائج التدفق، ودعم الفهارس المتعددة.</li>
<li><strong>موثوقية الكتابة:</strong> دعم عمليات الكتابة المتجانسة.</li>
<li><strong>التخزين المؤقت لتخزين الكائنات:</strong> استخدام Talon كذاكرة تخزين مؤقتة لـ S3 لتحسين التعافي من الأعطال وأداء الاستعلامات غير النشطة.</li>
</ul>
<h2 id="Beyond-31" class="common-anchor-header">ما بعد الإصدار 3.1<button data-href="#Beyond-31" class="anchor-icon" translate="no">
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
    </button></h2><p>تشمل الأعمال طويلة المدى السفر عبر الزمن والتراجع عن اللقطات. ولا يزال نطاقها وتوقيت إصدارها قيد التأكيد.</p>
<h2 id="Help-shape-the-roadmap" class="common-anchor-header">ساعد في تشكيل خارطة الطريق<button data-href="#Help-shape-the-roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>شارك أحمال العمل والقيود وطلبات الميزات التي تهم تطبيقاتك في <a href="https://github.com/milvus-io/milvus/discussions">مناقشات GitHub</a>. أبلغ عن الأخطاء من خلال <a href="https://github.com/milvus-io/milvus/issues">مشكلات GitHub</a>.</p>
<p>للمساهمة بالكود أو الوثائق، ابدأ <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">بدليل المساهمين</a>.</p>
