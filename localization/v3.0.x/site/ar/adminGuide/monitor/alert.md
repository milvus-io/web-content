---
id: alert.md
title: إنشاء تنبيه
related_key: monitor and alert.
summary: تعرف على كيفية إنشاء تنبيه لخدمات Milvus في Grafana.
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">إنشاء تنبيه لخدمات Milvus<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>يقدم هذا الموضوع آلية التنبيهات لخدمات Milvus ويشرح سبب إنشاء التنبيهات في Milvus ومتى وكيف يتم ذلك.</p>
<p>من خلال إنشاء التنبيهات، يمكنك تلقي إشعارات عندما تتجاوز قيمة مقياس معين الحد الذي حددته مسبقًا.</p>
<p>على سبيل المثال، يمكنك إنشاء تنبيه وتعيين 80 ميغابايت كحد أقصى لاستخدام الذاكرة من قبل مكونات Milvus. إذا تجاوز الاستخدام الفعلي الرقم المحدد مسبقًا، فستتلقى تنبيهات تذكرك بأن استخدام الذاكرة من قبل مكونات Milvus يتجاوز 80 ميغابايت. عند تلقي التنبيه، يمكنك بعد ذلك تعديل تخصيص الموارد وفقًا لذلك وفي الوقت المناسب لضمان توفر الخدمة.</p>
<h2 id="Scenarios-for-creating-alerts" class="common-anchor-header">سيناريوهات إنشاء التنبيهات<button data-href="#Scenarios-for-creating-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>فيما يلي بعض السيناريوهات الشائعة التي تحتاج فيها إلى إنشاء تنبيه.</p>
<ul>
<li>استخدام وحدة المعالجة المركزية (CPU) أو الذاكرة من قبل مكونات Milvus مرتفع جدًا.</li>
<li>تقل مساحة القرص المتوفرة في بودات مكونات Milvus.</li>
<li>تتم إعادة تشغيل حاويات مكونات Milvus بشكل متكرر للغاية.</li>
</ul>
<p>المقاييس التالية متاحة لتكوين التنبيهات:</p>
<table>
<thead>
<tr><th>المقياس</th><th>الوصف</th><th>وحدة القياس</th></tr>
</thead>
<tbody>
<tr><td>استخدام وحدة المعالجة المركزية</td><td>استخدام وحدة المعالجة المركزية (CPU) من قبل مكونات Milvus، والذي يُشار إليه بوقت تشغيل وحدة المعالجة المركزية (CPU).</td><td>ثانية</td></tr>
<tr><td>الذاكرة</td><td>موارد الذاكرة التي تستهلكها مكونات Milvus.</td><td>ميجابايت</td></tr>
<tr><td>غوروتينات</td><td>الأنشطة التي يتم تنفيذها بشكل متزامن بلغة GO.</td><td>/</td></tr>
<tr><td>خيوط نظام التشغيل</td><td>الخيوط، أو العمليات الخفيفة في نظام التشغيل.</td><td>/</td></tr>
<tr><td>مؤشرات الملفات المفتوحة للعمليات</td><td>العدد الحالي لموصِّفات الملفات المستخدمة.</td><td>/</td></tr>
</tbody>
</table>
<h2 id="Set-up-alerts" class="common-anchor-header">إعداد التنبيهات<button data-href="#Set-up-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>يستند هذا الدليل إلى مثال إنشاء تنبيه لاستخدام الذاكرة لمكونات Milvus. لإنشاء أنواع أخرى من التنبيهات، يرجى تعديل الأوامر وفقًا لذلك. إذا واجهت أي مشاكل أثناء العملية، فلا تتردد في طرح سؤالك في <a href="https://discuss.milvus.io/">منتدى Milvus</a> أو بدء مناقشة على <a href="https://discord.com/invite/8uyFbECzPX">Discord</a>.</p>
<h3 id="Prerequisites" class="common-anchor-header">المتطلبات<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><p>يفترض هذا البرنامج التعليمي أن Grafana مثبت ومهيأ لديك. إذا لم يكن الأمر كذلك، نوصي بقراءة <a href="/docs/ar/monitor.md">دليل المراقبة</a>.</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. إضافة استعلام جديد<button data-href="#1-Add-a-new-query" class="anchor-icon" translate="no">
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
    </button></h3><p>لإضافة تنبيه لاستخدام الذاكرة لمكونات Milvus، قم بتحرير لوحة الذاكرة (Memory). ثم أضف استعلامًا جديدًا بالمقياس التالي: <code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" /> 
   <span>Alert_metric</span>
  
 </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. احفظ لوحة المعلومات<button data-href="#2-Save-the-dashboard" class="anchor-icon" translate="no">
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
    </button></h3><p>احفظ لوحة المعلومات، وانتظر بضع دقائق حتى تظهر التنبيهات.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" /> 
   <span>Alert_dashboard</span>
  
 </span></p>
<p>لا يدعم استعلام التنبيه في Grafana متغيرات القوالب. لذلك، يجب إضافة استعلام ثانٍ بدون أي متغيرات قوالب في التسميات. يُسمى الاستعلام الثاني «A» افتراضيًا. يمكنك إعادة تسميته بالنقر فوق القائمة المنسدلة.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" /> 
   <span>استعلام_التنبيه</span>
  
 </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. إضافة إخطارات التنبيهات<button data-href="#3-Add-alert-notifications" class="anchor-icon" translate="no">
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
    </button></h3><p>لتلقي إشعارات التنبيهات، قم بإنشاء نقطة اتصال. في Grafana، انتقل إلى <strong>«Alerts &amp; IRM</strong> » &gt; <strong>«Alerting»</strong> &gt; <strong>«Notification configuration</strong>»، وحدد علامة التبويب <strong>«Contact points</strong> »، ثم انقر على <strong> «+ New contact point</strong>». بعد ذلك، في قسم <strong>«Configure notifications</strong> » الخاص بقاعدة التنبيه، حدد نقطة الاتصال، أو قم بتوجيه الإشعارات عبر سياسات الإشعارات.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" /> 
   <span>Alert_notification</span>
  
 </span></p>
<p>إذا تم إنشاء التنبيه وتشغيله بنجاح، فستتلقى الإشعار كما هو موضح في لقطة الشاشة أدناه.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" /> 
   <span>رسالة_الإشعار</span>
  
 </span></p>
<p>لحذف تنبيه، انتقل إلى لوحة «التنبيهات» وانقر على زر الحذف.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" /> 
   <span>حذف_التنبيه</span>
  
 </span></p>
<h2 id="Whats-next" class="common-anchor-header">الخطوة التالية<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>إذا كنت بحاجة إلى بدء مراقبة خدمات Milvus:
<ul>
<li>اقرأ <a href="/docs/ar/monitor.md">دليل المراقبة</a></li>
<li>تعرف على كيفية <a href="/docs/ar/visualize.md">عرض مقاييس المراقبة</a></li>
</ul></li>
<li>إذا كنت قد أنشأت تنبيهات لاستخدام الذاكرة من قبل مكونات Milvus:
<ul>
<li>تعرف على كيفية <a href="/docs/ar/allocate.md#standalone">تخصيص الموارد</a></li>
</ul></li>
<li>إذا كنت تبحث عن معلومات حول كيفية توسيع نطاق مجموعة Milvus:
<ul>
<li>تعرف على <a href="/docs/ar/scaleout.md">كيفية توسيع نطاق مجموعة Milvus</a></li>
</ul></li>
</ul>
