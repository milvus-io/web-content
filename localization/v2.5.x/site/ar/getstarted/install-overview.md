---
id: install-overview.md
summary: >-
  Milvus هي قاعدة بيانات متجهات عالية الأداء وقابلة للتطوير. وهي تدعم حالات
  استخدام ذات نطاق واسع من الأحجام، بدءًا من العروض التوضيحية التي تعمل محليًا
  في دفاتر Jupyter Notebooks إلى مجموعات Kubernetes واسعة النطاق التي تتعامل مع
  عشرات المليارات من المتجهات. يوجد حاليًا ثلاثة خيارات لنشر Milvus_ Milvus Lite
  و Milvus Standalone و Milvus Distributed.
title: نظرة عامة على خيارات نشر ميلفوس
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">نظرة عامة على خيارات نشر ميلفوس<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>ميلفوس هي قاعدة بيانات متجهة عالية الأداء وقابلة للتطوير. وهي تدعم حالات استخدام ذات نطاق واسع من الأحجام، بدءًا من العروض التوضيحية التي تعمل محليًا في دفاتر Jupyter Notebooks إلى مجموعات Kubernetes واسعة النطاق التي تتعامل مع عشرات المليارات من المتجهات. يوجد حاليًا ثلاثة خيارات لنشر Milvus: Milvus Lite و Milvus Standalone و Milvus Distributed.</p>
<h2 id="Milvus-Lite" class="common-anchor-header">ميلفوس لايت<button data-href="#Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">ميلفوس لايت</a> هي مكتبة بايثون يمكن استيرادها إلى تطبيقاتك. وباعتبارها نسخة خفيفة الوزن من Milvus، فهي مثالية للنماذج الأولية السريعة في دفاتر Jupyter Notebooks أو التشغيل على الأجهزة الذكية ذات الموارد المحدودة. يدعم Milvus Lite نفس واجهات برمجة التطبيقات التي تدعمها تطبيقات Milvus الأخرى. يمكن أيضًا أن تعمل التعليمات البرمجية من جانب العميل التي تتفاعل مع Milvus Lite مع مثيلات Milvus في أوضاع النشر الأخرى.</p>
<p>لدمج Milvus Lite في تطبيقاتك، قم بتشغيل <code translate="no">pip install pymilvus</code> لتثبيته واستخدم البيان <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> لإنشاء قاعدة بيانات متجهة مع ملف محلي يستمر في جميع بياناتك. لمزيد من التفاصيل، راجع <a href="https://milvus.io/docs/milvus_lite.md">تشغيل Milvus Lite</a>.</p>
<h2 id="Milvus-Standalone" class="common-anchor-header">ميلفوس مستقل<button data-href="#Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standalone هو نشر خادم أحادي الجهاز. يتم تعبئة جميع مكونات Milvus Standalone في <a href="https://milvus.io/docs/install_standalone-docker.md">صورة Docker</a> واحدة، مما يجعل النشر مريحاً. إذا كان لديك عبء عمل إنتاجي ولكنك تفضل عدم استخدام Kubernetes، فإن تشغيل Milvus Standalone على جهاز واحد بذاكرة كافية يعد خيارًا جيدًا.</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">ميلفوس الموزع<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن نشر Milvus Distributed على مجموعات <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>. تتميز عملية النشر هذه ببنية سحابية أصلية، حيث يتم التعامل مع حمل الاستيعاب واستعلامات البحث بشكل منفصل بواسطة عقد معزولة، مما يسمح بالتكرار للمكونات الهامة. يوفر أعلى قابلية للتوسع والتوافر، بالإضافة إلى المرونة في تخصيص الموارد المخصصة في كل مكون. ميلفوس الموزعة هو الخيار الأفضل لمستخدمي المؤسسات الذين يقومون بتشغيل أنظمة بحث متجهية واسعة النطاق في الإنتاج.</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">اختيار النشر المناسب لحالة الاستخدام الخاصة بك<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
<li><p><strong>للنماذج الأولية السريعة</strong></p>
<p>إذا كنت ترغب في إنشاء شيء ما بسرعة كنموذج أولي أو لأغراض التعلم، مثل العروض التوضيحية للجيل المعزز للاسترجاع (RAG)، أو روبوتات الدردشة الآلية، أو البحث متعدد الوسائط، فإن Milvus Lite نفسه أو مزيج من Milvus Lite و Milvus Standalone مناسب. يمكنك استخدام Milvus Lite في دفاتر الملاحظات للنماذج الأولية السريعة واستكشاف أساليب مختلفة مثل استراتيجيات التقطيع المختلفة في RAG. قد ترغب في نشر التطبيق الذي تم إنشاؤه باستخدام Milvus Lite في إنتاج صغير النطاق لخدمة مستخدمين حقيقيين، أو التحقق من صحة الفكرة على مجموعات بيانات أكبر، لنقل أكثر من بضعة ملايين من المتجهات. يعد تطبيق Milvus Standalone مناسبًا. لا يزال من الممكن مشاركة منطق التطبيق الخاص بـ Milvus Lite حيث أن جميع عمليات نشر Milvus لها نفس واجهة برمجة التطبيقات من جانب العميل. يمكن أيضًا نقل البيانات المخزنة في Milvus Lite إلى Milvus Standalone باستخدام أداة سطر الأوامر.</p></li>
<li><p><strong>نشر الإنتاج على نطاق صغير</strong></p>
<p>بالنسبة للإنتاج في المراحل المبكرة من الإنتاج، عندما يكون المشروع لا يزال يبحث عن ملاءمة المنتج للسوق وتكون السرعة أكثر أهمية من قابلية التوسع، فإن Milvus Standalone هو الخيار الأفضل. لا يزال بإمكانه توسيع نطاقه ليصل إلى 100 مليون ناقل في حال توفر موارد كافية من الآلات، بينما يتطلب عمليات تطوير أقل بكثير من الحفاظ على مجموعة K8s.</p></li>
<li><p><strong>نشر الإنتاج على نطاق واسع</strong></p>
<p>نظرًا لأن عملك ينمو بسرعة ويتجاوز حجم البيانات سعة خادم واحد، فقد حان الوقت للتفكير في Milvus Distributed. يمكنك الاستمرار في استخدام Milvus Standalone لبيئة التطوير أو بيئة التدريج لراحتها، وتشغيل مجموعة K8s التي تدير Milvus Distributed. يمكن لهذا أن يدعمك نحو عشرات المليارات من المتجهات، بالإضافة إلى توفير المرونة في تخصيص حجم العقدة لحجم عملك الخاص، مثل حالات القراءة العالية والكتابة النادرة أو حالات الكتابة العالية والقراءة المنخفضة.</p></li>
<li><p><strong>البحث المحلي على أجهزة الحافة</strong></p>
<p>للبحث من خلال خاص أو حساس على الأجهزة المتطورة، يمكنك نشر Milvus Lite على الجهاز دون الاعتماد على خدمة مستندة إلى السحابة لإجراء بحث نصي أو بحث عن الصور. وهذا مناسب لحالات مثل البحث في المستندات الخاصة، أو اكتشاف الكائنات على الجهاز.</p></li>
</ul>
<p>يعتمد اختيار وضع نشر Milvus على مرحلة مشروعك وحجمه. يوفر Milvus حلاً مرنًا وقويًا لمختلف الاحتياجات، بدءًا من النماذج الأولية السريعة إلى النشر على نطاق واسع في المؤسسة.</p>
<ul>
<li>يوصى باستخدام<strong>Milvus Lite</strong> لمجموعات البيانات الأصغر حجمًا، حتى بضعة ملايين من المتجهات.</li>
<li>يعد<strong>Milvus Standalone</strong> مناسبًا لمجموعات البيانات متوسطة الحجم، حيث يصل حجمها إلى 100 مليون متجه.</li>
<li>تم تصميم<strong>Milvus Distributed</strong> لعمليات النشر على نطاق واسع، وهو قادر على التعامل مع مجموعات البيانات من 100 مليون إلى عشرات المليارات من المتجهات.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" />
   </span> <span class="img-wrapper"> <span>حدد خيار النشر لحالة الاستخدام الخاصة بك</span> </span></p>
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
<tr><th>الميزة</th><th>ميلفوس لايت</th><th>ميلفوس مستقل</th><th>ميلفوس الموزع</th></tr>
</thead>
<tbody>
<tr><td>SDK / العميل ليري</td><td>بايثون<br/>gRPC</td><td>Python<br/>Go<br/>Java Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Java Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>أنواع البيانات</td><td>متجه كثيف<br/>متجه متناثر<br/>متجه ثنائي متجه ثنائي<br/>منطقية<br/>عدد صحيح<br/>نقطة عائمة<br/>متغير شار<br/>صفيف<br/>JSON</td><td>متجه كثيف<br/>متجه متناثر<br/>متجه ثنائي متجه ثنائي<br/>منطقي<br/>عدد صحيح<br/>نقطة عائمة<br/>متغير شار<br/>صفيف<br/>JSON</td><td>متجه كثيف<br/>متجه متناثر<br/>متجه ثنائي متجه ثنائي<br/>منطقية<br/>عدد صحيح<br/>نقطة عائمة<br/>متغير شار<br/>صفيف<br/>JSON</td></tr>
<tr><td>إمكانيات البحث</td><td>البحث في المتجهات (بحث المتجهات (بحث ANN)<br/>تصفية البيانات الوصفية<br/>البحث في النطاق البحث في النطاق<br/>الاستعلام العددي<br/>الحصول على الكيانات حسب المفتاح الأساسي<br/>البحث الهجين</td><td>البحث في المتجهات (بحث المتجهات (بحث ANN)<br/>تصفية البيانات الوصفية<br/>البحث في النطاق<br/>الاستعلام العددي<br/>الحصول على الكيانات حسب المفتاح الأساسي<br/>البحث الهجين</td><td>البحث في المتجهات (بحث متجه (بحث الشبكة النانوية)<br/>تصفية البيانات الوصفية<br/>البحث في النطاق<br/>الاستعلام العددي<br/>الحصول على الكيانات حسب المفتاح الأساسي<br/>البحث الهجين</td></tr>
<tr><td>عمليات CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>إدارة البيانات المتقدمة</td><td>غير متاح</td><td>التحكم في الوصول<br/>التقسيم<br/>مفتاح التقسيم مفتاح التقسيم</td><td>التحكم في الوصول<br/>التقسيم<br/>مفتاح التقسيم مفتاح التقسيم<br/>تجميع الموارد المادية</td></tr>
<tr><td>مستويات الاتساق</td><td>قوي</td><td>قوي<br/>الثبات المحدود<br/>جلسة جلسة<br/>في نهاية المطاف</td><td>قوي<br/>الثبات المحدود<br/>جلسة جلسة<br/>الحدثية الحدثية</td></tr>
</tbody>
</table>
