---
id: milvus_backup_0_6_api.md
summary: >-
  إنشاء مهام النسخ الاحتياطي والاستعادة في Milvus Backup 0.6.0 ومراقبتها من خلال
  واجهة برمجة التطبيقات (API) عبر بروتوكول HTTP.
title: استخدام واجهة برمجة تطبيقات HTTP لـ Milvus Backup 0.6.0
---
<h1 id="Use-the-Milvus-Backup-060-HTTP-API" class="common-anchor-header">استخدام واجهة برمجة تطبيقات HTTP لـ Milvus Backup 0.6.0<button data-href="#Use-the-Milvus-Backup-060-HTTP-API" class="anchor-icon" translate="no">
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
    </button></h1><p>استخدم واجهة برمجة تطبيقات HTTP لـ Milvus Backup لإنشاء نسخ احتياطية واستعادة المجموعات ومراقبة المهام غير المتزامنة. يستخدم مثال اللقطة أدناه <strong>Milvus Backup 0.6.0</strong> مع <strong>Milvus 3.0.1 أو إصدار أحدث</strong>. بالنسبة إلى Backup 0.5.x، استخدم <a href="/docs/ar/milvus_backup_api.md">دليل واجهة برمجة التطبيقات 0.5.x</a>. بالنسبة للتثبيتات الحالية، راجع <a href="/docs/ar/milvus_backup_upgrade.md">ترقية Milvus Backup</a>.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">الحصول على Milvus Backup<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتنزيل واستخراج الملف الثنائي المناسب من <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">الإصدار v0.6.0</a>. للإنشاء من المصدر بدلاً من ذلك، اتبع <a href="/docs/ar/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">إرشادات الحصول على Milvus Backup</a>؛ يتطلب الإنشاء Go 1.26 أو أحدث.</p>
<h2 id="Prepare-configuration-file" class="common-anchor-header">تحضير ملف التكوين<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بإنشاء <a href="/docs/ar/milvus_backup_0_6_cli.md#Prepare-configuration-file">ملف</a> « <code translate="no">configs/backup.yaml</code> » باستخدام المثال v2 الموجود في <a href="/docs/ar/milvus_backup_0_6_cli.md#Prepare-configuration-file">«تحضير ملف التكوين</a>». قم بتكوين الوصول إلى Milvus، وتخزين المثيل، ووجهة النسخ الاحتياطي. يجب أن يكون خادم Milvus قادرًا أيضًا على الوصول إلى تخزين النسخ الاحتياطي لإجراء عمليات اللقطات.</p>
<p>إذا كان لديك ملف v1، فسيظل قابلاً للتحميل. راجع <a href="/docs/ar/milvus_backup_upgrade.md#Migrate-the-configuration">«ترحيل التكوين»</a> قبل تغيير مخططه أو متغيرات البيئة.</p>
<p>من الدليل الذي يحتوي على الملف الثنائي، افحص التكوين وتحقق من الاتصال:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>تابع عندما يُبلغ فحص الاتصال عن " <code translate="no">Success!</code>".</p>
<h2 id="Start-up-the-API-server" class="common-anchor-header">قم بتشغيل خادم واجهة برمجة التطبيقات (API)<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>ابدأ تشغيل الخدمة باستخدام التكوين الذي قمت بفحصه:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>المنفذ الافتراضي هو 8080. لاختيار منفذ آخر، استخدم <code translate="no">-p</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 18080 --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>قم بتشغيل أحد هذه الأوامر فقط لكل خدمة معينة. تستخدم الأمثلة أدناه المنفذ 8080؛ قم بتغيير عناوين URL الخاصة بها إذا اخترت منفذًا آخر. واجهة مستخدم Swagger متاحة على <code translate="no">http://localhost:8080/api/v1/docs/index.html</code>.</p>
<p>حافظ على تشغيل الخدمة أثناء استقصاء المهام. تنتمي معرّفات المهام والتقدم المباشر إلى عملية الخدمة؛ بينما تبقى النسخة الاحتياطية الدائمة في تخزين الكائنات بعد توقف العملية.</p>
<h2 id="Prepare-data" class="common-anchor-header">تحضير البيانات<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم مجموعة موجودة باسم <code translate="no">coll</code> ، أو أنشئ مجموعة الاختبار المكونة من 256 كيانًا من <a href="/docs/ar/snapshot-backup-and-restore.md#Prepare-sample-data">«تحضير بيانات العينة</a>». قم بتغيير أسماء المجموعات في الطلبات إذا كنت تستخدم بياناتك الخاصة. حافظ على بيانات الاختبار دون تغيير أثناء التحقق من النتيجة.</p>
<h2 id="Back-up-data" class="common-anchor-header">النسخ الاحتياطي للبيانات<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><p>أرسل طلب نسخ احتياطي غير متزامن:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;]
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>يتضمن الرد قيمة <code translate="no">requestId</code>. لا يعني الإرسال أن النسخ الاحتياطي قد اكتمل. انسخ هذه القيمة إلى <code translate="no">backup_id</code> وقم بالاستقصاء:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_backup?backup_id=BACKUP_REQUEST_ID&amp;backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>انتظر حتى تتحول القيمة <code translate="no">data.state_code</code> إلى <code translate="no">2</code>. تستخدم واجهة برمجة التطبيقات (API) حالات المهام التالية:</p>
<table>
<thead>
<tr><th><code translate="no">state_code</code></th><th>المعنى</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">0</code></td><td>مبدئي</td></tr>
<tr><td><code translate="no">1</code></td><td>قيد التنفيذ</td></tr>
<tr><td><code translate="no">2</code></td><td>نجاح</td></tr>
<tr><td><code translate="no">3</code></td><td>فشل</td></tr>
<tr><td><code translate="no">4</code></td><td>انتهت المهلة</td></tr>
</tbody>
</table>
<p>تحقق من كل من الاستجابة وحالة المهمة. لا يكفي وجود HTTP 200 وحده: فوجود استجابة غير صفرية لـ <code translate="no">code</code> يشير إلى وجود خطأ. يمكن أن تتجاهل الاستجابة الناجحة <code translate="no">code</code> لأن قيمتها تساوي صفرًا. إذا فشلت المهمة أو انتهت مهلة الانتظار، فافحص تفاصيل الاستجابة وسجل الخادم قبل الاستعادة من تلك النسخة الاحتياطية.</p>
<p>قم بإدراج النسخ الاحتياطية المخزنة وافحص النسخة الاحتياطية المكتملة حسب الاسم:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/list&#x27;
curl &#x27;http://localhost:8080/api/v1/get_backup?backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">get_backup</code> تُرجع بيانات تعريف JSON، بما في ذلك <code translate="no">collection_backups</code> ؛ <strong>ولا</strong> تقوم بتنزيل ملفات النسخ الاحتياطي. بالنسبة للنسخة الاحتياطية التي تم إنشاؤها بواسطة عملية أخرى، يمكن أن تُرجع الاستعلامات التي تعتمد على الاسم فقط بيانات تعريف دون عرض التقدم الفعلي للمهمة. استخدم معرّف المهمة من استجابة الإنشاء الخاصة بالخدمة الحالية عند مراقبة نسخة احتياطية نشطة.</p>
<p>التنسيق الافتراضي هو <code translate="no">auto</code> ، والذي يختار اللقطة (snapshot) على Milvus 3.0. لطلب سجل الثنائي (binlog) صراحةً، أضف <code translate="no">&quot;format&quot;: &quot;binlog&quot;</code> إلى نص طلب الإنشاء. الإعدادات المسبقة لـ CLI <code translate="no">--for</code> ليست حقلًا لطلب HTTP.</p>
<p>للحفاظ على النسخة الاحتياطية أو نقلها، انسخ الدليل بأكمله إلى تخزين الكائنات. راجع <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">دليل النقل 0.6.0</a>.</p>
<h2 id="Restore-data" class="common-anchor-header">استعادة البيانات<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
    </button></h2><p>تأكد من أن <code translate="no">coll_bak</code> غير موجود بالفعل. أرسل طلب استعادة مع لاحقة:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;_bak&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>يختار حقل HTTP <code translate="no">collection_names</code> الأسماء <strong>الموجودة في النسخة الاحتياطية</strong>، قبل تطبيق اللاحقة. يختار هذا الطلب <code translate="no">coll</code> ويُنشئ <code translate="no">coll_bak</code>. أما خيار CLI <code translate="no">--filter</code> فيطابق أسماء الهدف بعد إعادة التسمية؛ لا تستبدل <code translate="no">coll_bak</code> في حقل HTTP هذا.</p>
<p>انسخ <code translate="no">data.id</code> من استجابة الاستعادة وقم باستقصاء المهمة:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_restore?id=RESTORE_TASK_ID&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>انتظر ظهور <code translate="no">data.state_code: 2</code> وتحقق من <code translate="no">collection_restore_tasks</code> للتأكد من وجود مجموعة الأهداف المتوقعة. المهمة التي تم إرسالها لا تعتبر استعادة مُثبتة بعد.</p>
<h3 id="Restore-with-the-original-name" class="common-anchor-header">الاستعادة بالاسم الأصلي<button data-href="#Restore-with-the-original-name" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم مثيلًا مستهدفًا لا يوجد فيه <code translate="no">coll</code>. ابدأ خدمة API للنسخ الاحتياطي منفصلة تم تكوينها لهذا الهدف وموقع النسخ الاحتياطي المكتمل، ثم أرسل هذا الطلب إلى الخدمة المستهدفة:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>استقصِ <code translate="no">get_restore</code> على نفس الخدمة باستخدام معرّف المهمة الذي تم إرجاعه. قم بتكوين <code translate="no">milvus.*</code> لهدف الاستعادة و <code translate="no">backup.storage</code> للنسخة الاحتياطية الموجودة. راجع <a href="/docs/ar/milvus_backup_0_6_cli.md#Prepare-configuration-file">إعداد ملف التكوين</a>.</p>
<h2 id="Verify-restored-data" class="common-anchor-header">التحقق من البيانات المستعادة<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد نجاح مهمة الاستعادة، اتصل بمثيل Milvus الهدف وتحقق من وجود المجموعة والبيانات المتوقعة. بالنسبة لمجموعة الاختبار المكونة من 256 كيانًا، استخدم الفحوصات الكاملة للقيم العددية والمتجهات والبحث في <a href="/docs/ar/snapshot-backup-and-restore.md#Verify-the-result">«التحقق من النتيجة</a>».</p>
<p>قم بتغيير <code translate="no">coll_bak</code> إلى <code translate="no">coll</code> عند الاستعادة باستخدام الاسم الأصلي. يقوم رمز التحقق بقراءة البيانات المستعادة دون حذفها. بالنسبة لبيانات الإنتاج، قم بالمقارنة مع خط الأساس الذي تم تسجيله وقت النسخ الاحتياطي.</p>
