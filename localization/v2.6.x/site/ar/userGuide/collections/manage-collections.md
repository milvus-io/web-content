---
id: manage-collections.md
title: شرح المجموعات
summary: >-
  في ميلفوس، يمكنك إنشاء مجموعات متعددة لإدارة بياناتك، وإدراج بياناتك ككيانات
  في المجموعات. تتشابه المجموعات والكيانات مع الجداول والسجلات في قواعد البيانات
  العلائقية. تساعدك هذه الصفحة في التعرف على المجموعة والمفاهيم ذات الصلة.
---
<h1 id="Collection-Explained" class="common-anchor-header">شرح المجموعات<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>في ميلفوس، يمكنك إنشاء مجموعات متعددة لإدارة بياناتك، وإدراج بياناتك ككيانات في المجموعات. تتشابه المجموعات والكيانات مع الجداول والسجلات في قواعد البيانات العلائقية. تساعدك هذه الصفحة في التعرف على المجموعة والمفاهيم ذات الصلة.</p>
<h2 id="Collection" class="common-anchor-header">المجموعة<button data-href="#Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>المجموعة عبارة عن جدول ثنائي الأبعاد يحتوي على أعمدة ثابتة وصفوف متغيرة. يمثل كل عمود حقلاً، ويمثل كل صف كيانًا.</p>
<p>يعرض المخطط التالي مجموعة تحتوي على ثمانية أعمدة وستة كيانات.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" />
   </span> <span class="img-wrapper"> <span>شرح المجموعة</span> </span></p>
<h2 id="Schema-and-Fields" class="common-anchor-header">المخطط والحقول<button data-href="#Schema-and-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>عند وصف كائن ما، نذكر عادةً سماته، مثل الحجم والوزن والموضع. يمكنك استخدام هذه السمات كحقول في مجموعة. لكل حقل خصائص مقيدة مختلفة، مثل نوع البيانات وأبعاد الحقل المتجه. يمكنك تكوين مخطط مجموعة من خلال إنشاء الحقول وتحديد ترتيبها. لمعرفة أنواع البيانات الممكنة القابلة للتطبيق، راجع <a href="/docs/ar/schema.md">شرح المخطط</a>.</p>
<p>يجب عليك تضمين جميع الحقول المعرفة من قبل المخطط في الكيانات المراد إدراجها. لجعل بعضها اختياري، فكر في تمكين الحقل الديناميكي. للحصول على التفاصيل، راجع الحقل <a href="/docs/ar/enable-dynamic-field.md">الديناميكي</a>.</p>
<ul>
<li><p><strong>جعلها قابلة للإلغاء أو تعيين قيم افتراضية</strong></p>
<p>للحصول على تفاصيل حول كيفية جعل الحقل قابلاً للإلغاء أو تعيين القيمة الافتراضية، راجع <a href="/docs/ar/nullable-and-default.md">Nullable &amp; Default</a>.</p></li>
<li><p><strong>تمكين الحقل الديناميكي</strong></p>
<p>للحصول على تفاصيل حول كيفية تمكين الحقل الديناميكي واستخدامه، راجع الحقل <a href="/docs/ar/enable-dynamic-field.md">الديناميكي</a>.</p></li>
</ul>
<h2 id="Primary-key-and-AutoId" class="common-anchor-header">المفتاح الأساسي والمعرف التلقائي<button data-href="#Primary-key-and-AutoId" class="anchor-icon" translate="no">
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
    </button></h2><p>على غرار الحقل الأساسي في قاعدة البيانات العلائقية، تحتوي المجموعة على حقل أساسي لتمييز الكيان عن غيره. كل قيمة في الحقل الأساسي فريدة عالميًا وتتوافق مع كيان واحد محدد.</p>
<p>كما هو موضح في الرسم البياني أعلاه، يعمل الحقل المسمى <strong>بالمعرّف</strong> كحقل أساسي، ويتوافق المعرف الأول <strong>0</strong> مع كيان بعنوان <em>معدل وفيات فيروس كورونا غير مهم</em>. لن يكون هناك أي كيان آخر يحتوي على الحقل الأساسي 0.</p>
<p>يقبل الحقل الأساسي الأعداد الصحيحة أو السلاسل فقط. عند إدراج الكيانات، يجب عليك تضمين قيم الحقل الأساسي افتراضيًا. ومع ذلك، إذا قمت بتمكين <strong>المعرف التلقائي</strong> عند إنشاء المجموعة، فسوف يقوم Milvus بإنشاء تلك القيم عند إدراج البيانات. في مثل هذه الحالة، استبعد قيم الحقل الأساسي من الكيانات المراد إدراجها.</p>
<p>لمزيد من المعلومات، يرجى الرجوع إلى <a href="/docs/ar/primary-field.md">الحقل الأساسي والمعرف التلقائي</a>.</p>
<h2 id="Index" class="common-anchor-header">الفهرس<button data-href="#Index" class="anchor-icon" translate="no">
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
    </button></h2><p>يؤدي إنشاء فهارس على حقول محددة إلى تحسين كفاءة البحث. ننصحك بإنشاء فهارس لجميع الحقول التي تعتمد عليها خدمتك، ومن بينها فهارس على حقول المتجهات إلزامية.</p>
<h2 id="Entity" class="common-anchor-header">الكيانات<button data-href="#Entity" class="anchor-icon" translate="no">
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
    </button></h2><p>الكيانات هي سجلات البيانات التي تشترك في نفس مجموعة الحقول في مجموعة. تشكل القيم الموجودة في جميع الحقول في نفس الصف كيانًا.</p>
<p>يمكنك إدراج أكبر عدد من الكيانات التي تحتاجها في مجموعة. ومع ذلك، كلما زاد عدد الكيانات، يزداد حجم الذاكرة التي تستغرقها أيضًا، مما يؤثر على أداء البحث.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/schema.md">شرح المخطط</a>.</p>
<h2 id="Load-and-Release" class="common-anchor-header">التحميل والتحرير<button data-href="#Load-and-Release" class="anchor-icon" translate="no">
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
    </button></h2><p>تحميل مجموعة هو الشرط الأساسي لإجراء عمليات بحث واستعلامات التشابه في المجموعات. عند تحميل مجموعة، يقوم برنامج Milvus بتحميل جميع ملفات الفهرس والبيانات الأولية في كل حقل في الذاكرة للاستجابة السريعة لعمليات البحث والاستعلامات.</p>
<p>عمليات البحث والاستعلامات هي عمليات تستهلك الكثير من الذاكرة. لتوفير التكلفة، يُنصح بتحرير المجموعات غير المستخدمة حاليًا.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/load-and-release.md">التحميل والتحرير</a>.</p>
<h2 id="Search-and-Query" class="common-anchor-header">البحث والاستعلام<button data-href="#Search-and-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد إنشاء الفهارس وتحميل المجموعة، يمكنك بدء البحث عن التشابه من خلال تغذية متجه استعلام واحد أو عدة متجهات استعلام. على سبيل المثال، عند تلقي التمثيل المتجه لاستعلامك المحمول في طلب بحث، يستخدم Milvus نوع المقياس المحدد لقياس التشابه بين متجه الاستعلام وتلك الموجودة في المجموعة المستهدفة قبل إرجاع تلك المتجهات المتشابهة دلاليًا مع الاستعلام.</p>
<p>يمكنك أيضًا تضمين تصفية البيانات الوصفية ضمن عمليات البحث والاستعلامات لتحسين ملاءمة النتائج. لاحظ أن شروط تصفية بيانات التعريف إلزامية في الاستعلامات ولكنها اختيارية في عمليات البحث.</p>
<p>للحصول على تفاصيل حول أنواع المقاييس القابلة للتطبيق، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p>
<p>للمزيد من المعلومات حول عمليات البحث والاستعلامات، راجع المقالات الموجودة في فصل البحث وإعادة التصنيف، ومن بين الميزات الأساسية:</p>
<ul>
<li><p><a href="/docs/ar/single-vector-search.md">بحث ANN الأساسي</a></p></li>
<li><p><a href="/docs/ar/filtered-search.md">البحث المصفى</a></p></li>
<li><p><a href="/docs/ar/range-search.md">بحث النطاق</a></p></li>
<li><p><a href="/docs/ar/grouping-search.md">تجميع البحث</a></p></li>
<li><p><a href="/docs/ar/multi-vector-search.md">البحث الهجين</a></p></li>
<li><p><a href="/docs/ar/with-iterators.md">بحث مكرر البحث</a></p></li>
<li><p><a href="/docs/ar/get-and-scalar-query.md">استعلام</a></p></li>
<li><p><a href="/docs/ar/full-text-search.md">بحث النص الكامل</a></p></li>
<li><p><a href="/docs/ar/keyword-match.md">مطابقة النص</a></p></li>
</ul>
<p>بالإضافة إلى ذلك، يوفر ميلفوس أيضًا تحسينات لتحسين أداء البحث وكفاءته. يتم تعطيلها افتراضيًا، ويمكنك تمكينها واستخدامها وفقًا لمتطلبات الخدمة الخاصة بك. وهي</p>
<ul>
<li><p><a href="/docs/ar/use-partition-key.md">استخدام مفتاح التقسيم</a></p></li>
<li><p><a href="/docs/ar/mmap.md">استخدام mmap</a></p></li>
<li><p><a href="/docs/ar/clustering-compaction.md">ضغط التجميع</a></p></li>
</ul>
<h2 id="Partition" class="common-anchor-header">التقسيم<button data-href="#Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>الأقسام هي مجموعات فرعية من مجموعة، والتي تشترك في نفس مجموعة الحقول مع مجموعتها الأصلية، ويحتوي كل منها على مجموعة فرعية من الكيانات.</p>
<p>من خلال تخصيص كيانات في أقسام مختلفة، يمكنك إنشاء مجموعات كيانات. يمكنك إجراء عمليات بحث واستعلامات في أقسام محددة لجعل Milvus يتجاهل الكيانات الموجودة في الأقسام الأخرى، وتحسين كفاءة البحث.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/manage-partitions.md">إدارة الأقسام</a>.</p>
<h2 id="Shard" class="common-anchor-header">الشرائح<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>الأجزاء هي شرائح أفقية من مجموعة. يتوافق كل جزء مع قناة إدخال بيانات. تحتوي كل مجموعة على شريحة افتراضيًا. يمكنك تعيين العدد المناسب من الشرائح عند إنشاء مجموعة استنادًا إلى الإنتاجية المتوقعة وحجم البيانات المراد إدراجها في المجموعة.</p>
<p>للحصول على تفاصيل حول كيفية تعيين رقم الجزء، راجع <a href="/docs/ar/create-collection.md">إنشاء مجموعة</a>.</p>
<h2 id="Alias" class="common-anchor-header">الأسماء المستعارة<button data-href="#Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك إنشاء أسماء مستعارة لمجموعاتك. يمكن أن تحتوي المجموعة على عدة أسماء مستعارة، ولكن لا يمكن للمجموعات مشاركة اسم مستعار. عند تلقي طلب مقابل مجموعة، يقوم Milvus بتحديد موقع المجموعة استنادًا إلى الاسم المقدم. إذا لم تكن المجموعة بالاسم المقدم غير موجودة، يستمر Milvus في تحديد موقع الاسم المقدم كاسم مستعار. يمكنك استخدام الأسماء المستعارة للمجموعات لتكييف شفرتك مع سيناريوهات مختلفة.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/manage-aliases.md">إدارة الأسماء المستعارة</a>.</p>
<h2 id="Function" class="common-anchor-header">الدالة<button data-href="#Function" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك تعيين وظائف لـ Milvus لاشتقاق الحقول عند إنشاء المجموعة. على سبيل المثال، تستخدم دالة البحث عن النص الكامل الدالة المعرفة من قبل المستخدم لاشتقاق حقل متجه متناثر من حقل متغير محدد. لمزيد من المعلومات حول البحث في النص الكامل، راجع <a href="/docs/ar/full-text-search.md">البحث في النص الكامل</a>.</p>
<h2 id="Consistency-Level" class="common-anchor-header">مستوى الاتساق<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>تستخدم أنظمة قواعد البيانات الموزعة عادةً مستوى الاتساق لتحديد تماثل البيانات عبر عقد البيانات والنسخ المتماثلة. يمكنك تعيين مستويات اتساق منفصلة عند إنشاء مجموعة أو إجراء عمليات بحث عن التشابه داخل المجموعة. مستويات الاتساق القابلة للتطبيق هي: الاتساق <strong>القوي،</strong> <strong>والركود المحدود،</strong> <strong>والجلسة،</strong> <strong>والنهائي</strong>.</p>
<p>للحصول على تفاصيل حول مستويات الاتساق هذه، راجع <a href="/docs/ar/tune_consistency.md">مستوى الاتساق</a>.</p>
