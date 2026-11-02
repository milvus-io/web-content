---
id: install-overview.md
summary: >-
  اختر إصدار Milvus Lite أو Standalone أو Distributed وفقًا لحجم العمل ومتطلبات
  التوافر وبيئة التشغيل.
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
    </button></h1><p>يدعم Milvus النماذج الأولية المحلية وخدمات البحث المتجه على نطاق واسع. اختر من بين Milvus Lite وMilvus Standalone وMilvus Distributed بناءً على بياناتك، وحجم أحمال القراءة والكتابة، ومتطلبات التوافر، وبيئة التشغيل.</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> هي مكتبة Python يمكن استيرادها إلى تطبيقاتك. وباعتبارها إصدارًا خفيفًا من Milvus، فهي مثالية لإنشاء النماذج الأولية بسرعة في Jupyter Notebooks أو للتشغيل على الأجهزة الذكية ذات الموارد المحدودة. يدعم Milvus Lite نفس واجهات برمجة التطبيقات (APIs) مثل عمليات نشر Milvus الأخرى. كما يمكن للكود من جانب العميل الذي يتفاعل مع Milvus Lite العمل مع مثيلات Milvus في أوضاع النشر الأخرى.</p>
<p>بالنسبة للأمثلة المحلية، استخدم Python 3.10 أو أحدث وقم بتثبيت التبعية الاختيارية Lite بشكل صريح. في نظام Windows، يتخطى pip الإضافة <code translate="no">milvus-lite</code> ، لذا يلزم ذكر اسم الحزمة صراحةً:</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>استخدم <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> لفتح التخزين المحلي. يقوم Milvus Lite 3.x بإنشاء دليل في هذا المسار؛ ويتطلب ملف قاعدة بيانات Milvus Lite 2.x الموجود مسبقًا التصدير والترحيل. راجع <a href="/docs/ar/milvus_lite.md">«تشغيل Milvus Lite»</a> لمعرفة متطلبات النظام الأساسي <a href="/docs/ar/quickstart.md">و«البدء السريع»</a> للحصول على مثال كامل للإدراج والبحث.</p>
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
    </button></h2><p>Milvus Standalone هو نشر خادم على جهاز واحد. يتم تجميع جميع مكونات Milvus Standalone في <a href="https://milvus.io/docs/install_standalone-docker.md">صورة Docker</a> واحدة، مما يجعل النشر مريحًا. إذا كان لديك حمل عمل إنتاجي ولكنك تفضل عدم استخدام Kubernetes، فإن تشغيل Milvus Standalone على جهاز واحد بذاكرة كافية يعد خيارًا جيدًا. بشكل افتراضي، يعمل Milvus Standalone باستخدام <strong>Woodpecker</strong> (مدمج) كقائمة انتظار الرسائل الخاصة به، لذلك لا توجد خدمة مراسلة منفصلة لتشغيلها.</p>
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
<li><p><strong>لإنشاء النماذج الأولية السريعة</strong></p>
<p>استخدم Milvus Lite في جهاز كمبيوتر محمول لاختبار التضمينات واستراتيجيات تقسيم RAG وسلوك الاسترجاع. انتقل إلى Milvus Standalone عندما تحتاج إلى خادم مشترك أو عندما تتجاوز سعة الذاكرة وحجم الاستعلامات المحددة سعة البيئة المحلية. واجهة برمجة التطبيقات (API) الخاصة بالعميل متشابهة، ولكن تحقق من الاختلافات في الميزات وقم بترحيل البيانات المخزنة بشكل منفصل.</p></li>
<li><p><strong>النشر الإنتاجي على نطاق صغير</strong></p>
<p>استخدم Milvus Standalone عندما يكون خادم واحد كافياً لتلبية متطلبات عبء العمل والتوافر، وتفضل العمل بدون Kubernetes. قم بتقدير الذاكرة بناءً على أبعاد المتجهات، والحقول القياسية، وإعدادات الفهرس، والنسخ المتماثلة، ثم قم بإجراء اختبار أداء لتزامن الاستعلامات المتوقع ومعدل الكتابة. لا يحدد عدد المتجهات وحده السعة.</p></li>
<li><p><strong>النشر في بيئة الإنتاج على نطاق واسع</strong></p>
<p>مع النمو السريع لأعمالك وتجاوز حجم البيانات سعة خادم واحد، حان الوقت للنظر في استخدام Milvus Distributed. يمكنك الاستمرار في استخدام Milvus Standalone لبيئة التطوير أو البيئة التجريبية لراحتك، وتشغيل مجموعة K8s التي تعمل عليها Milvus Distributed. يمكن أن يدعمك هذا في التعامل مع عشرات المليارات من المتجهات، فضلاً عن توفير المرونة في تخصيص حجم العقدة وفقًا لحمل العمل الخاص بك، مثل حالات القراءة العالية والكتابة النادرة أو الكتابة العالية والقراءة المنخفضة.</p></li>
<li><p><strong>البحث المحلي على الأجهزة الطرفية</strong></p>
<p>للبحث في البيانات الخاصة أو الحساسة الموجودة على أجهزة الحافة، يمكنك نشر Milvus Lite على الجهاز دون الاعتماد على خدمة قائمة على السحابة لإجراء البحث عن النصوص أو الصور. وهذا مناسب لحالات مثل البحث في المستندات الخاصة، أو اكتشاف الكائنات على الجهاز.</p></li>
</ul>
<p>يعتمد اختيار وضع نشر Milvus على مرحلة مشروعك وحجمه. يوفر Milvus حلاً مرنًا وقويًا لاحتياجات متنوعة، بدءًا من النماذج الأولية السريعة وصولاً إلى النشر المؤسسي واسع النطاق.</p>
<ul>
<li>يتناسب<strong>Milvus Lite</strong> مع التقييم المحلي وأحمال العمل ضمن موارد تطبيق واحد.</li>
<li>يوفر<strong>Milvus Standalone</strong> خدمة مشتركة عندما يلبي خادم واحد متطلبات السعة والتوافر المحددة لديك.</li>
<li>يوفر<strong>Milvus Distributed</strong> قابلية التوسع والتكرار على مستوى المكونات عندما تحتاج إلى التوسع إلى ما هو أبعد من خادم واحد أو عزل موارد القراءة والكتابة.</li>
</ul>
<p>يستخدم كل من Milvus Standalone و Distributed قائمة انتظار الرسائل وتخزين الكائنات ومخزن البيانات الوصفية. يعمل Milvus Lite محليًّا بدون هذه الخدمات المنفصلة. للاطلاع على التبعيات الافتراضية لنشر الخوادم وخيارات الخدمات الخارجية، راجع <a href="/docs/ar/data-infra-integration-overview.md">«البنية التحتية للبيانات</a>».</p>
<p>إذا كنت تريد خدمة مُدارة بدلاً من تشغيل البنية التحتية للخادم، ففكر في استخدام <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. للنشر العملي، تابع باستخدام <a href="/docs/ar/install_standalone-docker.md">Docker</a> أو <a href="/docs/ar/install_cluster-milvusoperator.md">Kubernetes</a>.</p>
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
    </button></h2><p>يصف عمود «Lite» إصدار Milvus Lite 3.2.2. تحقق من <a href="/docs/ar/milvus_lite.md#Supported-features-and-limits">حدود Milvus Lite</a> قبل الاعتماد على ميزة خادم في تطبيق محلي.</p>
<table>
<thead>
<tr><th>الميزة</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>مجموعة أدوات التطوير (SDK) / مكتبة العميل</td><td>Python (محول PyMilvus المحلي)</td><td>بايثون<br/>Go<br/>جافا<br/>Node.js<br/>C#<br/>RESTful</td><td>بايثون<br/>جافا<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>أنواع البيانات</td><td>المتجه الكثيف<br/>المتجه المتفرق<br/>المنطقي<br/>الصحيح<br/>العائم<br/>VarChar<br/>المصفوفة<br/>JSON</td><td>متجه كثيف<br/>متجه متفرق<br/>متجه ثنائي<br/>منطقية<br/>عدد صحيح<br/>عدد عائم<br/>VarChar<br/>مصفوفة<br/>JSON</td><td>متجه كثيف<br/>متجه متفرق<br/>متجه ثنائي<br/>منطقي<br/>عدد صحيح<br/>عدد عائم<br/>VarChar<br/>مصفوفة<br/>JSON</td></tr>
<tr><td>قدرات البحث</td><td>البحث المتجه (البحث باستخدام الشبكة العصبية الاصطناعية)<br/>تصفية البيانات الوصفية<br/>البحث في النطاق<br/>الاستعلام القياسي<br/>الحصول على الكيانات حسب المفتاح الأساسي<br/>البحث المختلط</td><td>البحث المتجه (البحث باستخدام الشبكة العصبية الاصطناعية)<br/>تصفية البيانات الوصفية<br/>البحث في النطاق<br/>الاستعلام القياسي<br/>استرجاع الكيانات حسب المفتاح الأساسي<br/>البحث الهجين</td><td>البحث المتجه (البحث باستخدام الشبكات العصبية الاصطناعية)<br/>تصفية البيانات الوصفية<br/>البحث في النطاق<br/>الاستعلام القياسي<br/>استرداد الكيانات حسب المفتاح الأساسي<br/>البحث الهجين</td></tr>
<tr><td>عمليات CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>إدارة البيانات المتقدمة</td><td>قواعد البيانات<br/>الأقسام<br/>الأسماء المستعارة<br/>لا توجد ضوابط وصول</td><td>التحكم في الوصول<br/>التقسيم<br/>مفتاح التقسيم</td><td>التحكم في الوصول<br/>التقسيم<br/>مفتاح التقسيم<br/>تجميع الموارد المادية</td></tr>
<tr><td>مستويات الاتساق</td><td>غير قابل للتطبيق: عملية محلية واحدة تخدم جميع الطلبات؛ يُقبل <code translate="no">consistency_level</code> ولكنه لا يؤثر</td><td><br/>قوي تقادم محدود<br/>الجلسة<br/>في نهاية المطاف</td><td><br/>القوي، التقادم المحدود (<br/>)، الجلسة (Session) (<br/>)، في نهاية المطاف (Eventual)</td></tr>
<tr><td>قائمة انتظار الرسائل</td><td>غير متوفر</td><td>Woodpecker (مدمج)</td><td>وودبيكر (خدمة)</td></tr>
</tbody>
</table>
