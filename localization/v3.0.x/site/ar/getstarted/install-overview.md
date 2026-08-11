---
id: install-overview.md
summary: >-
  Milvus هي قاعدة بيانات متجهة عالية الأداء وقابلة للتوسع. وهي تدعم حالات
  استخدام متنوعة من حيث الحجم، بدءًا من العروض التوضيحية التي تُشغَّل محليًّا في
  Jupyter Notebooks وصولًا إلى مجموعات Kubernetes الضخمة التي تعالج عشرات
  المليارات من المتجهات. حاليًّا، هناك ثلاثة خيارات لنشر Milvus: Milvus Lite
  وMilvus Standalone وMilvus Distributed.
title: نظرة عامة على خيارات نشر Milvus
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">نظرة عامة على خيارات نشر Milvus<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus هي قاعدة بيانات متجهة عالية الأداء وقابلة للتوسع. وهي تدعم حالات استخدام بمجموعة واسعة من الأحجام، بدءًا من العروض التوضيحية التي تعمل محليًا في Jupyter Notebooks وصولًا إلى مجموعات Kubernetes الضخمة التي تتعامل مع عشرات المليارات من المتجهات. حاليًا، هناك ثلاثة خيارات لنشر Milvus: Milvus Lite وMilvus Standalone وMilvus Distributed.</p>
<h2 id="Milvus-Lite" class="common-anchor-header">Milvus Lite<button data-href="#Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> هي مكتبة Python يمكن استيرادها إلى تطبيقاتك. وباعتبارها نسخة خفيفة الوزن من Milvus، فهي مثالية لإنشاء النماذج الأولية السريعة في Jupyter Notebooks أو للتشغيل على الأجهزة الذكية ذات الموارد المحدودة. يدعم Milvus Lite نفس واجهات برمجة التطبيقات (APIs) مثل عمليات نشر Milvus الأخرى. كما يمكن للكود من جانب العميل الذي يتفاعل مع Milvus Lite العمل مع مثيلات Milvus في أوضاع النشر الأخرى.</p>
<p>لدمج Milvus Lite في تطبيقاتك، قم بتشغيل الأمر <code translate="no">pip install pymilvus</code> لتثبيته واستخدم العبارة <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> لإنشاء مثيل لقاعدة بيانات متجهة باستخدام ملف محلي يحفظ جميع بياناتك. لمزيد من التفاصيل، راجع <a href="https://milvus.io/docs/milvus_lite.md">تشغيل Milvus Lite</a>.</p>
<h2 id="Milvus-Standalone" class="common-anchor-header">Milvus Standalone<button data-href="#Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standalone هو نشر خادم على جهاز واحد. يتم تجميع جميع مكونات Milvus Standalone في <a href="https://milvus.io/docs/install_standalone-docker.md">صورة Docker</a> واحدة، مما يجعل النشر مريحًا. إذا كان لديك حمل عمل إنتاجي ولكنك تفضل عدم استخدام Kubernetes، فإن تشغيل Milvus Standalone على جهاز واحد مزود بذاكرة كافية يعد خيارًا جيدًا. بشكل افتراضي، يقوم Milvus Standalone بتشغيل <strong>Woodpecker</strong> (مدمج) كقائمة انتظار الرسائل الخاصة به، لذلك لا توجد خدمة مراسلة منفصلة لتشغيلها.</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus Distributed<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن نشر Milvus Distributed على مجموعات <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>. يتميز هذا النشر بهندسة سحابية أصلية، حيث تتم معالجة أحمال الاستيعاب واستعلامات البحث بشكل منفصل بواسطة عقد معزولة، مما يتيح التكرار للمكونات الحيوية. ويوفر أعلى مستويات قابلية التوسع والتوافر، بالإضافة إلى المرونة في تخصيص الموارد المخصصة لكل مكون. يُعد Milvus Distributed الخيار الأمثل لمستخدمي المؤسسات الذين يشغلون أنظمة بحث متجهية واسعة النطاق في بيئة الإنتاج. بشكل افتراضي، يعمل Milvus Distributed باستخدام <strong>Woodpecker</strong> كقائمة انتظار الرسائل الخاصة به، ويتم نشره كخدمة مخصصة جنبًا إلى جنب مع Milvus.</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">اختر طريقة النشر المناسبة لحالة الاستخدام الخاصة بك<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h2><p>يعتمد اختيار وضع النشر عادةً على مرحلة تطوير تطبيقك:</p>
<ul>
<li><p><strong>لإنشاء نماذج أولية سريعة</strong></p>
<p>إذا كنت ترغب في إنشاء شيء ما بسرعة كنموذج أولي أو لأغراض التعلم، مثل عروض توضيحية لتقنية التوليد المعزز بالاسترجاع (RAG)، أو روبوتات الدردشة التي تعمل بالذكاء الاصطناعي، أو البحث متعدد الوسائط، فإن Milvus Lite نفسه أو مزيجًا من Milvus Lite وMilvus Standalone يعد خيارًا مناسبًا. يمكنك استخدام Milvus Lite في دفاتر العمل (notebooks) لإنشاء النماذج الأولية بسرعة واستكشاف مناهج متنوعة مثل استراتيجيات التجزئة المختلفة في RAG. قد ترغب في نشر التطبيق الذي تم إنشاؤه باستخدام Milvus Lite في بيئة إنتاجية صغيرة الحجم لخدمة مستخدمين حقيقيين، أو للتحقق من صحة الفكرة على مجموعات بيانات أكبر، على سبيل المثال أكثر من بضعة ملايين من المتجهات. في هذه الحالة، يُعد Milvus Standalone هو الخيار المناسب. لا يزال من الممكن مشاركة منطق التطبيق الخاص بـ Milvus Lite، حيث إن جميع عمليات نشر Milvus تستخدم نفس واجهة برمجة التطبيقات (API) من جانب العميل. كما يمكن نقل البيانات المخزنة في Milvus Lite إلى Milvus Standalone باستخدام أداة سطر الأوامر.</p></li>
<li><p><strong>النشر في بيئة إنتاجية صغيرة الحجم</strong></p>
<p>بالنسبة للإنتاج في المراحل المبكرة، عندما لا يزال المشروع يبحث عن التوافق بين المنتج والسوق وتكون المرونة أكثر أهمية من قابلية التوسع، فإن Milvus Standalone هو الخيار الأفضل. لا يزال بإمكانه التوسع حتى 100 مليون متجه في حالة توفر موارد كافية للجهاز، بينما يتطلب جهود DevOps أقل بكثير من صيانة مجموعة K8s.</p></li>
<li><p><strong>النشر في بيئة الإنتاج على نطاق واسع</strong></p>
<p>مع النمو السريع لأعمالك وتجاوز حجم البيانات سعة الخادم الفردي، حان الوقت للنظر في استخدام Milvus Distributed. يمكنك الاستمرار في استخدام Milvus Standalone لبيئة التطوير أو البيئة التجريبية لما توفره من راحة، وتشغيل مجموعة K8s التي تعمل عليها Milvus Distributed. يمكن أن يدعمك هذا في التعامل مع عشرات المليارات من المتجهات، فضلاً عن توفير المرونة في تخصيص حجم العقدة وفقًا لحمل العمل الخاص بك، مثل حالات القراءة العالية والكتابة النادرة أو الكتابة العالية والقراءة المنخفضة.</p></li>
<li><p><strong>البحث المحلي على الأجهزة الطرفية</strong></p>
<p>للبحث في البيانات الخاصة أو الحساسة على أجهزة الحافة، يمكنك نشر Milvus Lite على الجهاز دون الاعتماد على خدمة قائمة على السحابة لإجراء البحث عن النصوص أو الصور. وهذا مناسب لحالات مثل البحث في المستندات الخاصة، أو اكتشاف الكائنات على الجهاز.</p></li>
</ul>
<p>يعتمد اختيار وضع نشر Milvus على مرحلة مشروعك وحجمه. يوفر Milvus حلاً مرنًا وقويًا لاحتياجات متنوعة، بدءًا من النماذج الأولية السريعة وصولاً إلى النشر المؤسسي واسع النطاق.</p>
<ul>
<li>يُوصى باستخدام<strong>Milvus Lite</strong> لمجموعات البيانات الأصغر حجمًا، التي تصل إلى بضعة ملايين من المتجهات.</li>
<li>يُعد<strong>Milvus Standalone</strong> مناسبًا لمجموعات البيانات متوسطة الحجم، التي تصل إلى 100 مليون متجه.</li>
<li>تم تصميم<strong>Milvus Distributed</strong> للنشر على نطاق واسع، وهو قادر على معالجة مجموعات البيانات التي تتراوح من 100 مليون إلى عشرات المليارات من المتجهات.</li>
</ul>
<p>بغض النظر عن وضع النشر، تعتمد كل مثيل من Milvus على قائمة انتظار الرسائل، وتخزين الكائنات، ومخزن البيانات الوصفية — بشكل افتراضي <strong>Woodpecker</strong> <strong>وMinIO</strong> <strong>وetcd</strong>. لمعرفة المزيد عن هذه التبعيات، أو ضبطها، أو ربط خدمات خارجية، راجع <a href="/docs/ar/data-infra-integration-overview.md">البنية التحتية للبيانات</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>اختر خيار النشر المناسب لحالة الاستخدام الخاصة بك</span>
  
 </span></p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">مقارنة بين الوظائف<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
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
<tr><th>الميزة</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / مكتبة العميل</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>أنواع البيانات</td><td>المتجه الكثيف<br/>المتجه المتفرق<br/>المتجه الثنائي<br/>المنطقي<br/>الصحيح<br/>العائم<br/>VarChar<br/>المصفوفة<br/>JSON</td><td>متجه كثيف<br/>متجه متفرق<br/>متجه ثنائي<br/>منطقية<br/>عدد صحيح<br/>عدد عائم<br/>VarChar<br/>مصفوفة<br/>JSON</td><td>متجه كثيف<br/>متجه متفرق<br/>متجه ثنائي<br/>منطقية<br/>عدد صحيح<br/>عدد عائم<br/>VarChar<br/>مصفوفة<br/>JSON</td></tr>
<tr><td>قدرات البحث</td><td>البحث المتجه (البحث باستخدام الشبكات العصبية الاصطناعية)<br/>تصفية البيانات الوصفية<br/>البحث في النطاق<br/>الاستعلام القياسي<br/>استرداد الكيانات حسب المفتاح الأساسي<br/>البحث المختلط</td><td>البحث المتجه (البحث باستخدام الشبكات العصبية الاصطناعية)<br/>تصفية البيانات الوصفية<br/>البحث في النطاق<br/>الاستعلام القياسي<br/>استرداد الكيانات حسب المفتاح الأساسي<br/>البحث الهجين</td><td>البحث المتجه (البحث باستخدام الشبكات العصبية الاصطناعية)<br/>تصفية البيانات الوصفية<br/>البحث في النطاق<br/>الاستعلام القياسي<br/>استرداد الكيانات حسب المفتاح الأساسي<br/>البحث الهجين</td></tr>
<tr><td>عمليات CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>إدارة البيانات المتقدمة</td><td>غير متوفر</td><td>التحكم في الوصول<br/>القسم<br/>مفتاح القسم</td><td>التحكم في الوصول<br/>التقسيم<br/>مفتاح التقسيم<br/>تجميع الموارد المادية</td></tr>
<tr><td>مستويات الاتساق</td><td>قوي</td><td>قوي<br/>تقادم محدود<br/>الجلسة<br/>في نهاية المطاف</td><td>قوي<br/>تقادم محدود<br/>الجلسة<br/>نهائي</td></tr>
<tr><td>قائمة انتظار الرسائل</td><td>غير متوفر</td><td>Woodpecker (مدمج)</td><td>وودبيكر (خدمة)</td></tr>
</tbody>
</table>
