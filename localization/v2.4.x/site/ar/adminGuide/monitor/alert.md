---
id: alert.md
title: إنشاء تنبيه
related_key: monitor and alert.
summary: تعرف على كيفية إنشاء تنبيه لخدمات Milvus في Grafana.
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">إنشاء تنبيه لخدمات ملفوس<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>يقدم هذا الموضوع آلية التنبيه لخدمات ملفوس ويشرح لماذا ومتى وكيف يمكن إنشاء تنبيهات في ملفوس.</p>
<p>من خلال إنشاء التنبيهات، يمكنك تلقي تنبيهات عندما تتجاوز قيمة مقياس معين الحد الذي قمت بتحديده مسبقاً.</p>
<p>على سبيل المثال، يمكنك إنشاء تنبيه وتعيين 80 ميغابايت كقيمة قصوى لاستخدام الذاكرة من قبل مكونات Milvus. إذا تجاوز الاستخدام الفعلي الرقم المحدد مسبقًا، ستتلقى تنبيهات لتذكيرك بأن استخدام الذاكرة بواسطة مكون Milvus يتجاوز 80 ميغابايت. وبناءً على التنبيه، يمكنك بعد ذلك تعديل تخصيص الموارد وفقاً لذلك وفي الوقت المناسب لضمان توفر الخدمة.</p>
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
    </button></h2><p>فيما يلي بعض السيناريوهات الشائعة التي تحتاج فيها إلى إنشاء تنبيه لـ</p>
<ul>
<li>استخدام وحدة المعالجة المركزية أو الذاكرة من قبل مكونات Milvus مرتفع جداً.</li>
<li>انخفاض مساحة القرص في كبسولات مكونات Milvus.</li>
<li>إعادة تشغيل كبسولات مكونات Milvus بشكل متكرر جداً.</li>
</ul>
<p>تتوفر المقاييس التالية لتكوين التنبيهات:</p>
<table>
<thead>
<tr><th>القياس</th><th>الوصف</th><th>وحدة القياس</th></tr>
</thead>
<tbody>
<tr><td>استخدام وحدة المعالجة المركزية</td><td>استخدام وحدة المعالجة المركزية بواسطة مكونات Milvus التي يشار إليها بوقت تشغيل وحدة المعالجة المركزية.</td><td>الثانية</td></tr>
<tr><td>الذاكرة</td><td>موارد الذاكرة التي تستهلكها مكونات Milvus.</td><td>ميغابايت</td></tr>
<tr><td>جوروتينات</td><td>الأنشطة المنفذة المتزامنة في لغة GO.</td><td>/</td></tr>
<tr><td>خيوط نظام التشغيل</td><td>خيوط، أو عمليات خفيفة الوزن في نظام التشغيل.</td><td>/</td></tr>
<tr><td>العمليات المفتوحة Fds</td><td>العدد الحالي لواصفات الملفات المستخدمة.</td><td>/</td></tr>
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
    </button></h2><p>يأخذ هذا الدليل مثالاً لإنشاء تنبيه لاستخدام ذاكرة مكونات Milvus. لإنشاء أنواع أخرى من التنبيهات، يرجى تعديل الأوامر وفقاً لذلك. إذا واجهتك أي مشاكل أثناء العملية، لا تتردد في طرحها في <a href="https://github.com/milvus-io/milvus/discussions">مناقشات Github</a> أو بدء موضوع على <a href="https://discord.com/invite/8uyFbECzPX">Discord</a>.</p>
<h3 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية</h3><p>يفترض هذا البرنامج التعليمي أنك قمت بتثبيت Grafana وتهيئته. إذا لم يكن كذلك، نوصي بقراءة <a href="/docs/ar/v2.4.x/monitor.md">دليل المراقبة</a>.</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. إضافة استعلام جديد</h3><p>لإضافة تنبيه لاستخدام الذاكرة لمكونات ميلفوس، قم بتحرير لوحة الذاكرة. ثم، أضف استعلامًا جديدًا بالمقياس: <code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" />
   </span> <span class="img-wrapper"> <span>تنبيه_مقياس</span> </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. احفظ لوحة التحكم</h3><p>احفظ لوحة التحكم، وانتظر بضع دقائق لرؤية التنبيه.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" />
   </span> <span class="img-wrapper"> <span>لوحة_التنبيه</span> </span></p>
<p>لا يدعم استعلام تنبيه Grafana متغيرات القالب. لذلك، يجب إضافة استعلام ثانٍ بدون أي متغيرات قالب في التسميات. يتم تسمية الاستعلام الثاني باسم "A" افتراضيًا. يمكنك إعادة تسميته بالنقر على القائمة المنسدلة.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" />
   </span> <span class="img-wrapper"> <span>تنبيه_استعلام</span> </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. إضافة إشعارات التنبيه</h3><p>لتلقي إشعارات التنبيه، أضف &quot;قناة تنبيه&quot;. ثم، حدد القناة في الحقل &quot;إرسال إلى&quot;.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" />
   </span> <span class="img-wrapper"> <span>تنبيه_التنبيه</span> </span></p>
<p>إذا تم إنشاء التنبيه وتشغيله بنجاح، ستتلقى الإشعار كما هو موضح في لقطة الشاشة أدناه.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" />
   </span> <span class="img-wrapper"> <span>رسالة_التنبيه</span> </span></p>
<p>لحذف تنبيه، انتقل إلى لوحة "تنبيه" وانقر على زر الحذف.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" />
   </span> <span class="img-wrapper"> <span>حذف_تنبيه</span> </span></p>
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
<li>إذا كنت بحاجة إلى بدء خدمات المراقبة لـ Milvus:<ul>
<li>اقرأ <a href="/docs/ar/v2.4.x/monitor.md">دليل المراقبة</a></li>
<li>تعرف على كيفية <a href="/docs/ar/v2.4.x/visualize.md">تصور مقاييس المراقبة</a></li>
</ul></li>
<li>إذا قمت بإنشاء تنبيهات لاستخدام الذاكرة بواسطة مكونات Milvus:<ul>
<li>تعرف على كيفية <a href="/docs/ar/v2.4.x/allocate.md#standalone">تخصيص الموارد</a></li>
</ul></li>
<li>إذا كنت تبحث عن معلومات حول كيفية توسيع نطاق مجموعة Milvus:<ul>
<li>تعلم كيفية <a href="/docs/ar/v2.4.x/scaleout.md">توسيع نطاق مجموعة Milvus</a></li>
</ul></li>
</ul>
