---
id: streaming_service.md
title: خدمة البث
summary: >-
  خدمة البث هي مفهوم لوحدة نظام البث الداخلي في Milvus، وهي مبنية حول سجل
  الكتابة الأمامية (WAL) لدعم مختلف الوظائف المتعلقة بالبث.
---
<h1 id="Streaming-Service" class="common-anchor-header">خدمة البث<button data-href="#Streaming-Service" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>خدمة التدفق</strong> هي مفهوم لوحدة نظام التدفق الداخلي في Milvus، وهي مبنية حول سجل الكتابة الأمامية (WAL) لدعم مختلف الوظائف المتعلقة بالبث. وتشمل هذه الوظائف استيعاب/اشتراك البيانات المتدفقة، واسترداد الأخطاء لحالة المجموعة، وتحويل البيانات المتدفقة إلى بيانات تاريخية، والاستعلامات المتزايدة للبيانات. من الناحية المعمارية، تتكون خدمة التدفق من ثلاثة مكونات رئيسية:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_distributed_arch.png" alt="Streaming Distributed Arc" class="doc-image" id="streaming-distributed-arc" />
   </span> <span class="img-wrapper"> <span>قوس التدفق الموزع</span> </span></p>
<ul>
<li><p><strong>منسق التدفق</strong>: مكون منطقي في عقدة المنسق. ويستخدم Etcd لاكتشاف الخدمة لتحديد موقع عقد التدفق المتاحة وهو مسؤول عن ربط WAL بعقد التدفق المقابلة. كما أنها تسجل الخدمة لفضح طوبولوجيا توزيع WAL، مما يسمح لعملاء البث بمعرفة عقدة البث المناسبة لعقدة دفق معينة.</p></li>
<li><p><strong>مجموعة عقدة التدفق</strong>: مجموعة من عُقد عامل التدفق المسؤولة عن جميع مهام معالجة البث، مثل إلحاق المحفظة واستعادة الحالة والاستعلام عن البيانات المتزايدة.</p></li>
<li><p><strong>عميل التدفق</strong>: عميل Milvus مطور داخليًا يقوم بتغليف الوظائف الأساسية مثل اكتشاف الخدمة والتحقق من الجاهزية. يتم استخدامه لبدء عمليات مثل كتابة الرسائل والاشتراك.</p></li>
</ul>
<h2 id="Message" class="common-anchor-header">الرسالة<button data-href="#Message" class="anchor-icon" translate="no">
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
    </button></h2><p>خدمة الدفق هي نظام تدفق يعتمد على السجلات، لذلك يتم تجريد جميع عمليات الكتابة في ميلفوس (مثل DML وDDL) <strong>كرسائل</strong>.</p>
<ul>
<li><p>يتم تعيين حقل <strong>Timestamp Oracle (TSO</strong> ) لكل رسالة من قبل خدمة الدفق، والذي يشير إلى ترتيب الرسالة في WAL. يحدد ترتيب الرسائل ترتيب عمليات الكتابة في ملفوس. وهذا يجعل من الممكن إعادة بناء أحدث حالة مجموعة من السجلات.</p></li>
<li><p>تنتمي كل رسالة إلى قناة افتراضية <strong>VChannel</strong> (قناة افتراضية) محددة وتحتفظ بخصائص ثابتة معينة داخل تلك القناة لضمان اتساق العملية. على سبيل المثال، يجب أن تحدث عملية "إدراج" دائمًا قبل عملية "إسقاط مجموعة" على نفس القناة.</p></li>
</ul>
<p>قد يشبه ترتيب الرسائل في ميلفوس ما يلي:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/message_order.png" alt="Message Order" class="doc-image" id="message-order" />
   </span> <span class="img-wrapper"> <span>ترتيب الرسائل</span> </span></p>
<h2 id="WAL-Component" class="common-anchor-header">مكون WAL<button data-href="#WAL-Component" class="anchor-icon" translate="no">
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
    </button></h2><p>لدعم قابلية التوسع الأفقي على نطاق واسع، فإن WAL في Milvus ليس ملف سجل واحد، بل هو مركب من سجلات متعددة. يمكن لكل سجل أن يدعم بشكل مستقل وظيفة التدفق لعدة قنوات VChannels V بشكل مستقل. في أي وقت معين، يُسمح لمكون WAL بالعمل على <strong>عقدة دفق واحدة</strong> فقط، وهذا القيد موعود من قبل كل من آلية التسييج للتخزين الأساسي ومنسق التدفق.</p>
<p>تتضمن الميزات الإضافية لمكون WAL ما يلي:</p>
<ul>
<li><p><strong>إدارة دورة حياة المقطع</strong>: استنادًا إلى السياسة مثل ظروف الذاكرة/حجم المقطع/وقت خمول المقطع، يدير WAL دورة حياة كل مقطع.</p></li>
<li><p><strong>دعم المعاملات الأساسية</strong>: نظرًا لأن كل رسالة لها حد للحجم، يدعم مكوّن WAL مستوى المعاملات البسيط للوعود بالكتابة الذرية على مستوى قناة VChannel.</p></li>
<li><p><strong>كتابة السجل عن بُعد عالية التردد</strong>: يدعم Milvus قوائم انتظار الرسائل عن بعد التابعة لجهة خارجية كمخزن WAL. وللتخفيف من زمن انتقال الرحلة ذهابًا وإيابًا (RTT) بين عقدة التدفق وتخزين WAL عن بُعد لتحسين إنتاجية الكتابة، تدعم خدمة التدفق عمليات كتابة السجل المتزامنة. يحافظ على ترتيب الرسائل من خلال مزامنة TSO و TSO، وتتم قراءة الرسائل في WAL بترتيب TSO.</p></li>
<li><p><strong>مخزن الكتابة المسبق</strong>: بعد أن تتم كتابة الرسائل إلى WAL، يتم تخزينها مؤقتًا في مخزن مؤقت للكتابة المسبقة. يتيح هذا إمكانية قراءة السجلات الخلفية للسجلات دون جلب الرسائل من مخزن WAL البعيد.</p></li>
<li><p><strong>يدعم تخزين WAL المتعدد</strong>: نقار الخشب ونقار الخشب وبولسار وكافكا. باستخدام نقار الخشب مع وضع القرص الصفري، يمكننا إزالة تبعية تخزين WAL عن بعد.</p></li>
</ul>
<h2 id="Recovery-Storage" class="common-anchor-header">تخزين الاسترداد<button data-href="#Recovery-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>يعمل مكوِّن تخزين <strong>الاسترداد</strong> دائمًا على عقدة التدفق التي يوجد بها مكوِّن WAL المقابل.</p>
<ul>
<li><p>وهو مسؤول عن تحويل البيانات المتدفقة إلى بيانات تاريخية ثابتة وتخزينها في تخزين الكائنات.</p></li>
<li><p>كما أنه يعالج استرداد الحالة في الذاكرة لمكون WAL على عقدة التدفق.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/recovery_storage.png" alt="Recovery Storage" class="doc-image" id="recovery-storage" />
   </span> <span class="img-wrapper"> <span>مخزن الاسترداد</span> </span></p>
<h2 id="Query-Delegator" class="common-anchor-header">مفوض الاستعلام<button data-href="#Query-Delegator" class="anchor-icon" translate="no">
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
    </button></h2><p>يعمل "مفوض <strong>الاستعلام</strong> " على كل عقدة تدفق وهو مسؤول عن تنفيذ <strong>الاستعلامات الإضافية</strong> على جزء واحد. حيث يقوم بإنشاء خطط الاستعلام وإرسالها إلى عقد الاستعلام ذات الصلة وتجميع النتائج.</p>
<p>بالإضافة إلى ذلك، يكون مفوض الاستعلام مسؤولاً عن بث <strong>عمليات الحذف</strong> إلى عقد الاستعلام الأخرى.</p>
<p>يتعايش مفوض الاستعلام دائمًا مع مكون WAL على نفس عقدة البث. ولكن إذا تم تكوين المجموعة مع تعدد النسخ، فسيتم نشر <strong>N-1</strong> المفوضين على عقد التدفق الأخرى.</p>
<h2 id="WAL-Lifetime-and-Wait-for-Ready" class="common-anchor-header">عمر WAL وانتظار الاستعداد<button data-href="#WAL-Lifetime-and-Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>من خلال فصل عقد الحوسبة عن التخزين، يمكن لـ Milvus نقل WAL بسهولة من عقدة تدفق إلى أخرى، مما يحقق توافرًا عاليًا في خدمة التدفق.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/wal_lifetime.png" alt="wal lifetime" class="doc-image" id="wal-lifetime" />
   </span> <span class="img-wrapper"> <span>عمر WAL</span> </span></p>
<h2 id="Wait-for-Ready" class="common-anchor-header">انتظار الاستعداد<button data-href="#Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>عندما يتم نقل WAL إلى عقدة تدفق جديدة، سيجد العميل أن عقدة التدفق القديمة ترفض بعض الطلبات. في هذه الأثناء، سيتم استرداد WAL في عقدة البث الجديدة، وسينتظر العميل أن تكون المحفظة على عقدة البث الجديدة جاهزة للخدمة.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_wait_for_ready.png" alt="wait for ready" class="doc-image" id="wait-for-ready" />
   </span> <span class="img-wrapper"> <span>انتظار الجاهزية</span> </span></p>
