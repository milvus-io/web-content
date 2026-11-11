---
id: milvus_backup_overview.md
summary: >-
  يوفر Milvus Backup سير عمل عبر واجهة سطر الأوامر (CLI) وواجهة برمجة التطبيقات
  HTTP (API) لإجراء النسخ الاحتياطي لبيانات Milvus واستعادتها.
title: Milvus Backup
---
<h1 id="Milvus-Backup" class="common-anchor-header">Milvus Backup<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>يقوم Milvus Backup بعمل نسخ احتياطية لمجموعات Milvus واستعادتها في نفس المثيل أو في مثيل آخر. ويوفر واجهة سطر الأوامر (CLI) وواجهة برمجة تطبيقات HTTP.</p>
<p>يضيف Milvus Backup <strong>0.6.0</strong> نسخًا احتياطية على شكل لقطات لـ Milvus 3.0، ومخطط تكوين v2 ذي إصدارات، وإعدادات مسبقة مخصصة لإنشاء النسخ الاحتياطية. يبدأ الدعم الرسمي للنسخ الاحتياطي والاستعادة لـ Milvus 3.0 مع <strong>الإصدار Milvus 3.0.1</strong>.</p>
<h2 id="Choose-your-guide" class="common-anchor-header">اختر دليلك<button data-href="#Choose-your-guide" class="anchor-icon" translate="no">
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
    </button></h2><p>يحتوي Milvus Backup على إصداره الخاص، المنفصل عن إصدار خادم Milvus. تغطي الأدلة الحالية سلسلة الإصدارات 0.6.x؛ بينما يحتفظ قسم Backup 0.5.x بسير العمل السابق. تحدد تسميات عناوين الصفحات سلسلة Backup القابلة للتطبيق. تستخدم إرشادات التثبيت والأمثلة إصدارًا محددًا تم التحقق من صحته. تحقق من توافق خادم Milvus المصدر والهدف بشكل منفصل.</p>
<table>
<thead>
<tr><th>مهمتك</th><th>الدليل</th></tr>
</thead>
<tbody>
<tr><td>استمر في استخدام النسخة الاحتياطية 0.5.x</td><td><a href="/docs/ar/milvus_backup_cli.md">أوامر الإصدار 0.5.x</a> <a href="/docs/ar/milvus_backup_api.md">وواجهة برمجة التطبيقات HTTP</a>، مع أمثلة مرتبطة بالإصدار 0.5.16</td></tr>
<tr><td>ترقية تثبيت Backup موجود</td><td><a href="/docs/ar/milvus_backup_upgrade.md">الترقية من الإصدار 0.5.x إلى الإصدار 0.6.x</a></td></tr>
<tr><td>تثبيت واستخدام Backup 0.6.x</td><td><a href="/docs/ar/milvus_backup_0_6_cli.md">الأوامر والتكوين،</a> أو <a href="/docs/ar/milvus_backup_0_6_api.md">واجهة برمجة التطبيقات HTTP</a></td></tr>
<tr><td>النسخ الاحتياطي واستعادة لقطة على Milvus 3.0.1 أو أحدث</td><td><a href="/docs/ar/snapshot-backup-and-restore.md">النسخ الاحتياطي للقطعة اللحظية واستعادتها في مثيل واحد</a></td></tr>
</tbody>
</table>
<p>تحتفظ الأدلة الحالية <a href="/docs/ar/single-instance-backup-and-restore.md">الخاصة بنفس المثيل،</a> <a href="/docs/ar/shared-bucket-backup-and-restore.md">والحاوية المشتركة</a>، <a href="/docs/ar/cross-bucket-backup-and-restore.md">وعبر الحاويات</a>، <a href="/docs/ar/multi-storage-backup-and-restore.md">وعبر التخزين</a> بتكوين وأوامر الإصدار 0.5.16. ولا تتغير الأمثلة الواردة فيها عند نشر إصدار جديد من Backup.</p>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>استخدم ملف Backup الثنائي وأمثلة التكوين من نفس الإصدار. يحدد <a href="/docs/ar/milvus_backup_cli.md#Obtain-Milvus-Backup">دليل الإصدار 0.5.x</a> الإصدار 0.5.16؛ بينما يحدد <a href="/docs/ar/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">الدليل الحالي</a> الإصدار 0.6.0.</li>
<li>قم بتوفير وصول شبكي إلى Milvus وتخزينه ووجهة النسخ الاحتياطي. تتطلب عمليات اللقطات أيضًا أن يتمكن خادم Milvus من الوصول إلى مخزن النسخ الاحتياطي.</li>
<li>تحقق من توافق الخادم أدناه. يُشترط وجود Go فقط عند البناء من المصدر: الإصدار 1.25 أو أحدث لـ Backup 0.5.16، والإصدار 1.26 أو أحدث لـ 0.6.0.</li>
</ul>
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_backup_architecture.png" alt="Milvus Backup components" class="doc-image" id="milvus-backup-components" /> 
   <span>مكونات Milvus Backup</span>
  
 </span></p>
<p>ينسق Milvus Backup بيانات تعريف المجموعة ونسخ البيانات الاحتياطية بين مثيل Milvus ومخزن النسخ الاحتياطي. في النسخة 0.6.0 من Backup، يحدد التنسيق المحدد كيفية تصدير بيانات المجموعة واستعادتها:</p>
<table>
<thead>
<tr><th>التنسيق</th><th>سلوك النسخ الاحتياطي والاستعادة</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">snapshot</code></td><td>يقوم Milvus بتصدير حزمة لقطة للمجموعة. يسجل Milvus Backup معلومات الحزمة، وتقوم عملية الاستعادة باستيراد الحزمة عبر Milvus. يدير الخادم تخطيط البيانات الناتج.</td></tr>
<tr><td><code translate="no">binlog</code></td><td>يقوم Milvus Backup بنسخ ملفات بيانات المجموعة والبيانات الوصفية، ثم يعيد إنشاء المجموعات ويستورد البيانات التي تم نسخها احتياطيًا أثناء الاستعادة.</td></tr>
<tr><td><code translate="no">auto</code></td><td>يتم تحديد التنسيق وفقًا للميزات التي يدعمها الخادم. في Milvus 3.0، يتم اختيار «لقطة».</td></tr>
</tbody>
</table>
<p>يحتوي دليل النسخ الاحتياطي على البيانات الوصفية والملفات المطلوبة حسب تنسيقه. احتفظ بالدليل بالكامل عند أرشفته أو نقله. لا تفترض أن النسخ الاحتياطي للقطعة يستخدم تخطيط دليل binlog.</p>
<p>في الإصدار 0.6.0، تقوم الإعدادات المسبقة لـ « <code translate="no">create --for</code> » بتكوين خيارات مخصصة للأغراض: « <code translate="no">clone</code> » تحتفظ بالتنسيق المختار، بينما تتطلب « <code translate="no">archive</code> » و« <code translate="no">secondary</code> » وجود binlog. يتطلب الخادم الثانوي أيضًا تكوين طوبولوجيا النسخ المتماثل؛ ولا تتطلب الترحيل العادي بين المثيلات وجود خادم ثانوي. انظر <a href="/docs/ar/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">«اختيار تنسيق النسخ الاحتياطي أو الغرض</a>».</p>
<p>يتخطى الإصدار 0.6.0 من النسخ الاحتياطي المجموعات الخارجية أثناء عملية النسخ الاحتياطي. ولا تعني نجاح المهمة بالضرورة أن بيانات المجموعات الخارجية قد تم تضمينها.</p>
<h2 id="Compatibility-matrix" class="common-anchor-header">مصفوفة التوافق<button data-href="#Compatibility-matrix" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>لا يتطلب Backup 0.6.0 ترقية كل تثبيت لـ Milvus إلى</strong> <strong>الإصدار</strong><strong>3.0.</strong> فهو يدعم سير عمل سجلات الثنائيات (binlog) على إصدارات Milvus 2.x المدعومة. يبدأ الدعم الرسمي للنسخ الاحتياطي والاستعادة لسلسلة Milvus 3.0 مع <strong>الإصدار Milvus 3.0.1؛</strong> ويستخدم مثال اللقطة تلك السلسلة.</p>
<p>تم التحقق من صحة <a href="/docs/ar/milvus_backup_upgrade.md">دليل الترقية</a> باستخدام Backup 0.5.16 و0.6.0 على Milvus 2.6.11، بما في ذلك استعادة نسخة احتياطية من الإصدار 0.5.16 باستخدام الإصدار 0.6.0. لا توسع هذه المجموعة التي تم اختبارها نطاق المصفوفة أدناه.</p>
<p>يجب أن تشكل إصدارات Milvus المصدر والهدف زوجًا مدعومًا. لا يكفي وجود إصدار هدف أحدث وحده لإثبات التوافق. تغطي المصفوفة القديمة التالية إصدارات Milvus 2.x، كما هو موثق منذ إصدار Milvus Backup 0.5.7؛ وهي لا تثبت توافق الترحيل من الإصدارات 2.x إلى 3.0.</p>
<table>
<thead>
<tr><th>النسخ الاحتياطي من ↓ / الاستعادة إلى →</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th><th>Milvus الإصدار 2.6.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus الإصدار 2.2.x</td><td>لا</td><td>لا</td><td>نعم</td><td>نعم</td><td>نعم</td></tr>
<tr><td>Milvus الإصدار 2.3.x</td><td>لا</td><td>لا</td><td>نعم</td><td>نعم</td><td>نعم</td></tr>
<tr><td>Milvus الإصدار 2.4.x</td><td>لا</td><td>لا</td><td>نعم</td><td>نعم</td><td>نعم</td></tr>
<tr><td>Milvus الإصدار 2.5.x</td><td>لا</td><td>لا</td><td>لا</td><td>نعم</td><td>نعم</td></tr>
<tr><td>Milvus الإصدار 2.6.x</td><td>لا</td><td>لا</td><td>لا</td><td>لا</td><td>نعم</td></tr>
</tbody>
</table>
<p>قبل إجراء الترحيل بين الإصدارات، تحقق من الإصدار المصدر والإصدار الهدف وتنسيق النسخ الاحتياطي بالرجوع إلى <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">وثائق إصدار النسخ الاحتياطي</a>. لا تشمل هذه الأدلة المصفوفة القديمة أي تركيبات غير مدرجة.</p>
<h2 id="Release-notes" class="common-anchor-header">ملاحظات الإصدار<button data-href="#Release-notes" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0</a></li>
</ul>
