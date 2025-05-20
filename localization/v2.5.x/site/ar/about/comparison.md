---
id: comparison.md
title: المقارنة
summary: تقارن هذه المقالة بين Milvus وحلول البحث المتجه الأخرى.
---
<h1 id="Comparing-Milvus-with-Alternatives" class="common-anchor-header">مقارنة ميلفوس مع البدائل<button data-href="#Comparing-Milvus-with-Alternatives" class="anchor-icon" translate="no">
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
    </button></h1><p>عند استكشاف خيارات قواعد البيانات المتجهة المختلفة، سيساعدك هذا الدليل الشامل على فهم ميزات Milvus الفريدة، مما يضمن لك اختيار قاعدة البيانات التي تناسب احتياجاتك الخاصة. وتجدر الإشارة إلى أن Milvus هي قاعدة بيانات متجهات رائدة مفتوحة المصدر، وتقدم <a href="https://zilliz.com/cloud">Zilliz Cloud</a> خدمة Milvus المُدارة بالكامل. لتقييم Milvus بموضوعية مقارنةً بمنافسيها، فكّر في استخدام <a href="https://github.com/zilliztech/VectorDBBench#quick-start">أدوات معيارية</a> لتحليل مقاييس الأداء.</p>
<h2 id="Milvus-highlights" class="common-anchor-header">أبرز مزايا ميلفوس<button data-href="#Milvus-highlights" class="anchor-icon" translate="no">
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
<li><p><strong>الوظائف</strong>: يتجاوز Milvus البحث الأساسي عن تشابه المتجهات من خلال دعم وظائف متقدمة مثل <a href="https://milvus.io/docs/sparse_vector.md">المتجهات المتفرقة</a> <a href="https://milvus.io/docs/single-vector-search.md#Bulk-vector-search">والمتجهات المجمعة</a> <a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">والبحث المصفى</a> وقدرات <a href="https://milvus.io/docs/multi-vector-search.md">البحث المختلط</a>.</p></li>
<li><p><strong>المرونة</strong>: تستوعب Milvus أوضاع نشر مختلفة وحزم SDK متعددة، كل ذلك ضمن نظام بيئي قوي ومتكامل.</p></li>
<li><p><strong>الأداء</strong>: يضمن Milvus المعالجة في الوقت الفعلي بإنتاجية عالية وزمن استجابة منخفض، مدعومًا بخوارزميات فهرسة محسّنة مثل <a href="https://milvus.io/docs/index.md#HNSW">HNSW</a> <a href="https://milvus.io/docs/disk_index.md">وDiskANN،</a> <a href="https://milvus.io/docs/gpu_index.md">وتسريع</a> متقدم <a href="https://milvus.io/docs/gpu_index.md">لوحدة معالجة الرسومات</a>.</p></li>
<li><p><strong>قابلية التوسع</strong>: تعمل بنيتها الموزعة المُصممة حسب الطلب على التوسع دون عناء، وتستوعب أي شيء بدءًا من مجموعات البيانات الصغيرة إلى المجموعات التي تتجاوز 10 مليارات ناقل.</p></li>
</ul>
<h2 id="Overall-comparison" class="common-anchor-header">مقارنة شاملة<button data-href="#Overall-comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>للمقارنة بين Milvus و Pinecone، وهما حلان لقاعدة بيانات المتجهات، تم تنظيم الجدول التالي لتسليط الضوء على الاختلافات عبر الميزات المختلفة.</p>
<table>
<thead>
<tr><th>الميزة</th><th>بينكون</th><th>ميلفوس</th><th>الملاحظات</th></tr>
</thead>
<tbody>
<tr><td>أوضاع النشر</td><td>SaaS فقط</td><td>Milvus Lite، وMilvus Lite، وUn-premalone Standalone &amp; Cluster، وZilliz Cloud Saas &amp; BYOC</td><td>يوفر Milvus مرونة أكبر في أوضاع النشر.</td></tr>
<tr><td>حزم SDK المدعومة</td><td>بايثون وجافا سكريبت/تايب سكريبت</td><td>Python, Java, NodeJS, NodeJS, Go, Restful API, C#, Rust</td><td>يدعم ميلفوس مجموعة أكبر من لغات البرمجة.</td></tr>
<tr><td>حالة المصدر المفتوح</td><td>مغلق</td><td>مفتوح المصدر</td><td>ميلفوس هي قاعدة بيانات متجهة مفتوحة المصدر شائعة ومفتوحة المصدر.</td></tr>
<tr><td>قابلية التوسع</td><td>التوسع لأعلى/لأسفل فقط</td><td>قابلية التوسع لأعلى/لأعلى ولأسفل فقط</td><td>يتميز ميلفوس ببنية موزعة لتعزيز قابلية التوسع.</td></tr>
<tr><td>التوفر</td><td>بنية قائمة على الكبسولة داخل المناطق المتاحة</td><td>تجاوز فشل المنطقة المتاحة و HA عبر المناطق المتاحة</td><td>يتيح نظام Milvus CDC (التقاط بيانات التغيير) أوضاعًا أساسية/احتياطية لتوافر أعلى.</td></tr>
<tr><td>تكلفة الأداء (دولار لكل مليون استعلام)</td><td>تبدأ من 0.178 دولار أمريكي لمجموعة بيانات متوسطة، و1.222 دولار أمريكي لمجموعة بيانات كبيرة</td><td>يبدأ سعر Zilliz Cloud من 0.148 دولار أمريكي لمجموعة بيانات متوسطة، و0.635 دولار أمريكي لمجموعة بيانات كبيرة؛ يتوفر إصدار مجاني</td><td>راجع <a href="https://zilliz.com/vector-database-benchmark-tool?database=ZillizCloud,Milvus,ElasticCloud,PgVector,Pinecone,QdrantCloud,WeaviateCloud&amp;dataset=medium&amp;filter=none,low,high&amp;tab=2">تقرير تصنيف التكلفة</a>.</td></tr>
<tr><td>تسريع GPU</td><td>غير مدعوم</td><td>دعم وحدة معالجة الرسومات NVIDIA GPU</td><td>يعمل تسريع وحدة معالجة الرسومات على تحسين الأداء بشكل كبير، وغالبًا ما يكون ذلك بأضعاف.</td></tr>
</tbody>
</table>
<h2 id="Terminology-comparison" class="common-anchor-header">مقارنة المصطلحات<button data-href="#Terminology-comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>على الرغم من أن كلاهما يخدمان وظائف متشابهة كقواعد بيانات متجهة، إلا أن المصطلحات الخاصة بالمجال بين Milvus و Pinecone تظهر اختلافات طفيفة. فيما يلي مقارنة مفصلة للمصطلحات.</p>
<table>
<thead>
<tr><th>بينكون</th><th>ميلفوس</th><th>الملاحظات</th></tr>
</thead>
<tbody>
<tr><td>الفهرس</td><td><a href="https://zilliz.com/comparison">المجموعة</a></td><td>في Pinecone، يعمل الفهرس كوحدة تنظيمية لتخزين وإدارة المتجهات ذات الحجم المتماثل، ويتكامل هذا الفهرس بشكل وثيق مع الأجهزة، المعروفة باسم القرون. في المقابل، تخدم مجموعات Milvus غرضًا مشابهًا ولكنها تتيح التعامل مع مجموعات متعددة ضمن مثيل واحد.</td></tr>
<tr><td>المجموعات</td><td><a href="https://milvus.io/docs/milvus_backup_overview.md#Milvus-Backup">النسخ الاحتياطي</a></td><td>في Pinecone، تعتبر المجموعة في الأساس لقطة ثابتة لفهرس ما، وتستخدم بشكل أساسي لأغراض النسخ الاحتياطي ولا يمكن الاستعلام عنها. في Milvus، الميزة المكافئة لإنشاء النسخ الاحتياطية أكثر شفافية ومباشرة.</td></tr>
<tr><td>مساحة الاسم</td><td><a href="https://milvus.io/docs/use-partition-key.md#Use-Partition-Key">مفتاح التقسيم</a></td><td>تسمح مساحات الأسماء بتقسيم المتجهات في الفهرس إلى مجموعات فرعية. يوفر Milvus طرقًا متعددة مثل مفتاح التقسيم أو مفتاح التقسيم لضمان عزل البيانات بكفاءة داخل مجموعة.</td></tr>
<tr><td>البيانات الوصفية</td><td><a href="https://milvus.io/docs/boolean.md">الحقل العددي</a></td><td>يعتمد التعامل مع البيانات الوصفية في Pinecone على أزواج المفاتيح والقيمة، بينما يسمح Milvus بالحقول العددية المعقدة، بما في ذلك أنواع البيانات القياسية وحقول JSON الديناميكية.</td></tr>
<tr><td>الاستعلام</td><td><a href="https://milvus.io/docs/single-vector-search.md">بحث</a></td><td>اسم الطريقة المستخدمة للعثور على أقرب الجيران لمتجه معين، ربما مع بعض المرشحات الإضافية المطبقة في الأعلى.</td></tr>
<tr><td>غير متاح</td><td><a href="https://milvus.io/docs/with-iterators.md">المتكرر</a></td><td>يفتقر Pinecone إلى ميزة التكرار عبر جميع المتجهات في الفهرس. يقدّم ميلفوس طريقتا "بحث مكرر" و"استعلام مكرر"، مما يعزز قدرات استرجاع البيانات عبر مجموعات البيانات.</td></tr>
</tbody>
</table>
<h2 id="Capability-comparison" class="common-anchor-header">مقارنة القدرات<button data-href="#Capability-comparison" class="anchor-icon" translate="no">
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
<tr><th>القدرة</th><th>بينيكون</th><th>ميلفوس</th></tr>
</thead>
<tbody>
<tr><td>أوضاع النشر</td><td>SaaS فقط</td><td>ميلفوس لايت، المستقل في مكان العمل والمجموعة، وزيليز كلاود ساس و BYOC</td></tr>
<tr><td>تضمين الوظائف</td><td>غير متوفرة</td><td>الدعم مع <a href="https://github.com/milvus-io/milvus-model">نموذج [نموذج] pymilvus [نموذج]</a></td></tr>
<tr><td>أنواع البيانات</td><td>سلسلة، رقم، رقم، بول، قائمة سلسلة</td><td>سلسلة، متغيرChar، عدد (Int، فلوات، مزدوج)، Bool، مصفوفة، JSON، متجه عائم، متجه ثنائي، BFloat16، Float16، متجه متناثر</td></tr>
<tr><td>أنواع المقاييس والفهارس</td><td>جوس، نقطة، إقليدي<br/>عائلة P، عائلة S، عائلة S</td><td>cosine، IP (نقطة)، L2 (إقليدي)، L2 (إقليدي)، Hamming، Jaccard<br/>FLAT، IVF_FLAT، IVF_SQ8، IVF_SQ8، IVF_PQ، HNSW، SCANN، فهارس GPU</td></tr>
<tr><td>تصميم المخطط</td><td>الوضع المرن</td><td>الوضع المرن، الوضع الصارم</td></tr>
<tr><td>الحقول المتجهة المتعددة</td><td>غير متاح</td><td>بحث متعدد المتجهات والهجين</td></tr>
<tr><td>الأدوات</td><td>مجموعات البيانات، الأدوات المساعدة النصية، موصل سبارك</td><td>Attu و Birdwatcher و Backup و CLI و CDC و Spark و Kafka الموصلات</td></tr>
</tbody>
</table>
<h3 id="Key-insights" class="common-anchor-header">الرؤى الرئيسية</h3><ul>
<li><p><strong>أوضاع النشر</strong>: يوفر Milvus مجموعة متنوعة من خيارات النشر، بما في ذلك النشر المحلي، وDocker، وKubernetes في أماكن العمل، وSaS السحابية، وSaS السحابية، وBearb Your Own Cloud (BYOC) للمؤسسات، في حين أن Pinecone يقتصر على النشر SaaS.</p></li>
<li><p><strong>وظائف التضمين</strong>: تدعم Milvus مكتبات التضمين الإضافية، مما يتيح الاستخدام المباشر لنماذج التضمين لتحويل بيانات المصدر إلى متجهات.</p></li>
<li><p><strong>أنواع البيانات</strong>: يدعم Milvus مجموعة واسعة من أنواع البيانات أكثر من Pinecone، بما في ذلك المصفوفات وJSON. يدعم Pinecone فقط بنية البيانات الوصفية المسطحة مع السلاسل أو الأرقام أو المنطقيات أو قوائم السلاسل كقيم، بينما يمكن لـ Milvus التعامل مع أي كائن JSON، بما في ذلك الهياكل المتداخلة، داخل حقل JSON. يحدّ Pinecone حجم البيانات الوصفية إلى 40 كيلوبايت لكل متجه.</p></li>
<li><p><strong>أنواع المقاييس والفهارس</strong>: يدعم Milvus مجموعة واسعة من أنواع المقاييس والفهارس لاستيعاب حالات الاستخدام المختلفة، بينما يحتوي Pinecone على مجموعة محدودة أكثر. في حين أن فهرس المتجه إلزامي في Milvus، يتوفر خيار AUTO_INDEX لتبسيط عملية التكوين.</p></li>
<li><p><strong>تصميم المخطط</strong>: يوفر Milvus أوضاعًا مرنة <code translate="no">create_collection</code> لتصميم المخطط، بما في ذلك إعداد سريع مع مخطط ديناميكي لتجربة أقل من المخطط على غرار Pinecone وإعداد مخصص مع حقول مخطط محددة مسبقًا وفهارس تشبه نظام إدارة قواعد البيانات العلائقية (RDBMS).</p></li>
<li><p>حقول<strong>متعددة المتجهات</strong>: يتيح Milvus تخزين حقول متجهات متعددة داخل مجموعة واحدة، والتي يمكن أن تكون إما متناثرة أو كثيفة وقد تختلف في الأبعاد. لا يقدم Pinecone ميزة مماثلة.</p></li>
<li><p><strong>الأدوات</strong>: تقدم Milvus مجموعة أكثر شمولاً من الأدوات لإدارة قواعد البيانات واستخدامها، مثل Attu وBirdwatcher وBirdwatcher و Backup و CLI و CDC وموصل Spark وKafka.</p></li>
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
<li><p><strong>التجربة</strong>: اختبر Milvus بشكل مباشر من خلال البدء بـ Milvus <a href="https://milvus.io/docs/quickstart.md">quickstart</a> أو <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">الاشتراك في Zilliz Cloud</a>.</p></li>
<li><p><strong>اعرف المزيد</strong>: تعمق أكثر في ميزات ميلفوس من خلال <a href="/docs/ar/glossary.md">مصطلحاتنا</a> الشاملة <a href="https://milvus.io/docs/manage-collections.md">وأدلة المستخدم</a>.</p></li>
<li><p><strong>استكشف البدائل</strong>: لمقارنة أوسع لخيارات قواعد البيانات المتجهة، استكشف موارد إضافية على <a href="https://zilliz.com/comparison">هذه الصفحة</a>.</p></li>
</ul>
