---
id: milvus-cdc-overview.md
order: 1
summary: >-
  Milvus-CDC هي أداة سهلة الاستخدام يمكنها التقاط ومزامنة البيانات الإضافية في
  مثيلات Milvus.
title: نظرة عامة على مركز مكافحة الأمراض والوقاية منها
---
<h1 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC هي أداة سهلة الاستخدام يمكنها التقاط ومزامنة البيانات الإضافية في مثيلات Milvus. وهي تضمن موثوقية بيانات الأعمال من خلال نقلها بسلاسة بين مثيلات المصدر والهدف، مما يسمح بسهولة النسخ الاحتياطي التزايدي واستعادة البيانات في حالات الكوارث.</p>
<h2 id="Key-capabilities" class="common-anchor-header">القدرات الرئيسية<button data-href="#Key-capabilities" class="anchor-icon" translate="no">
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
<li><p><strong>مزامنة البيانات المتسلسلة</strong>: يضمن تكامل البيانات واتساقها من خلال مزامنة تغييرات البيانات بالتتابع بين مثيلات Milvus.</p></li>
<li><p><strong>النسخ التزايدي للبيانات</strong>: يقوم بتكرار البيانات التزايدية، بما في ذلك عمليات الإدراج والحذف، من المصدر Milvus إلى الهدف Milvus، مما يوفر تخزينًا مستمرًا.</p></li>
<li><p><strong>إدارة مهام CDC</strong>: يسمح بإدارة مهام CDC من خلال طلبات OpenAPI، بما في ذلك إنشاء مهام CDC والاستعلام عن حالتها وحذفها.</p></li>
</ul>
<p>بالإضافة إلى ذلك، نحن نخطط لتوسيع قدراتنا لتشمل دعم التكامل مع أنظمة معالجة التدفق في المستقبل.</p>
<h2 id="Architecture" class="common-anchor-header">البنية<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>تتبنى Milvus-CCDC بنية مع مكونين رئيسيين - خادم HTTP الذي يدير المهام والبيانات الوصفية، و <strong>Corelib</strong> الذي يزامن تنفيذ المهام مع قارئ يحصل على البيانات من مثيل Milvus المصدر وكاتب يرسل البيانات المعالجة إلى مثيل Milvus الهدف.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-cdc-architecture.png" alt="milvus-cdc-architecture" class="doc-image" id="milvus-cdc-architecture" />
   </span> <span class="img-wrapper"> <span>معمارية ميلفوس-سي دي سي-مركز البيانات</span> </span></p>
<p>في الرسم البياني السابق</p>
<ul>
<li><p><strong>خادم HTTP</strong>: يعالج طلبات المستخدم وينفذ المهام ويحافظ على البيانات الوصفية. وهو بمثابة مستوى التحكم لتنسيق المهام داخل نظام Milvus-CDC.</p></li>
<li><p><strong>Corelib</strong>: مسؤول عن المزامنة الفعلية للمهام. يتضمن مكون قارئ يقوم باسترداد المعلومات من مصدر ميلفوس المصدر وقائمة انتظار الرسائل (MQ)، ومكون كاتب يقوم بترجمة الرسائل من MQ إلى معلمات واجهة برمجة التطبيقات لنظام ميلفوس ويرسل هذه الطلبات إلى الهدف ميلفوس لإكمال عملية المزامنة.</p></li>
</ul>
<h2 id="Workflow" class="common-anchor-header">سير العمل<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>يتضمن تدفق معالجة بيانات مالفوس-مزامنة البيانات الخطوات التالية:</p>
<ol>
<li><p><strong>إنشاء المهمة</strong>: يبدأ المستخدمون مهمة CDC عبر طلبات HTTP.</p></li>
<li><p><strong>استرجاع البيانات الوصفية</strong>: يقوم النظام بجلب البيانات الوصفية الخاصة بالمجموعة من المصدر Milvus's etcd، بما في ذلك معلومات القناة ونقطة التفتيش الخاصة بالمجموعة.</p></li>
<li><p><strong>اتصال MQ</strong>: مع وجود البيانات الوصفية في متناول اليد، يتصل النظام ب MQ لبدء الاشتراك في دفق البيانات.</p></li>
<li><p><strong>معالجة البيانات</strong>: تتم قراءة البيانات من MQ وتحليلها وتمريرها إما باستخدام Go SDK أو معالجتها لتكرار العمليات التي يتم إجراؤها في المصدر Milvus.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-cdc-workflow.png" alt="milvus-cdc-workflow" class="doc-image" id="milvus-cdc-workflow" />
   </span> <span class="img-wrapper"> <span>سير عمل ميلفوس-سي دي سي</span> </span></p>
<h2 id="Limits" class="common-anchor-header">الحدود<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><strong>تزامن البيانات التزايدي</strong>: اعتبارًا من الآن، تم تصميم Milvus-CCD لمزامنة البيانات التزايدية فقط. إذا كان عملك يتطلب نسخة احتياطية كاملة للبيانات، يرجى <a href="https://milvus.io/community">التواصل معنا</a> للحصول على المساعدة.</p></li>
<li><p><strong>نطاق المزامنة</strong>: حاليًا، يمكن ل Milvus-CDC مزامنة البيانات على مستوى المجموعة. نحن نعمل على إضافة دعم لمزامنة البيانات على مستوى المجموعة في الإصدارات القادمة.</p></li>
<li><p><strong>طلبات واجهة برمجة التطبيقات المدعومة</strong>: يدعم Milvus-CDC حاليًا طلبات واجهة برمجة التطبيقات التالية. نخطط لتوسيع الدعم ليشمل طلبات إضافية في الإصدارات المستقبلية:</p>
<ul>
<li><p>إنشاء/إسقاط مجموعة</p></li>
<li><p>إدراج/حذف/إسقاط/إدراج</p></li>
<li><p>إنشاء/إسقاط قسم</p></li>
<li><p>إنشاء/إسقاط فهرس</p></li>
<li><p>تحميل/إصدار/إدخال/إسقاط</p></li>
<li><p>تحميل/إزالة/إصدار قسم</p></li>
<li><p>إنشاء/إسقاط قاعدة بيانات</p></li>
</ul></li>
</ul>
