---
id: milvus_backup_upgrade.md
summary: >-
  ترقية برنامج Milvus Backup من الإصدار 0.5.x إلى الإصدار 0.6.0، وتحديث
  الإعدادات والأوامر، والتحقق من صحة عمليات النسخ الاحتياطي والاستعادة.
title: ترقية أداة Milvus Backup إلى الإصدار 0.6.0
---
<h1 id="Upgrade-Milvus-Backup-to-060" class="common-anchor-header">ترقية أداة Milvus Backup إلى الإصدار 0.6.0<button data-href="#Upgrade-Milvus-Backup-to-060" class="anchor-icon" translate="no">
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
    </button></h1><p>استخدم هذا الدليل عند ترقية <strong>أداة Milvus Backup</strong> من الإصدار 0.5.x إلى الإصدار 0.6.0. لا يؤدي هذا إلى ترقية خادم Milvus الخاص بك. إذا كنت ستستمر في استخدام الإصدار 0.5.x، فاستمر في استخدام دليل <a href="/docs/ar/milvus_backup_cli.md">واجهة سطر الأوامر (CLI)</a> أو <a href="/docs/ar/milvus_backup_api.md">واجهة برمجة التطبيقات (API)</a> <a href="/docs/ar/milvus_backup_cli.md">الخاص بالإصدار 0.5.x</a>. للتثبيت الجديد، استخدم <a href="/docs/ar/milvus_backup_0_6_cli.md">دليل الإصدار 0.6.0</a>.</p>
<p>لا تزال تكوينات YAML من الإصدار V1 تُحمَّل عبر الترجمة التلقائية. ومع ذلك، يتم رفض علامات CLI التي تم إهمالها في الإصدار 0.6.0، ويتغير تنسيق النسخ الاحتياطي الافتراضي في Milvus 3.0. راجع كلًّا من التكوينات والأوامر قبل تبديل المهام أو الخدمات المجدولة.</p>
<h2 id="Check-the-starting-point" class="common-anchor-header">تحقق من نقطة البداية<button data-href="#Check-the-starting-point" class="anchor-icon" translate="no">
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
    </button></h2><p>سجل إصدار النسخ الاحتياطي، وإصداري Milvus المصدر والهدف، وملفات التكوين، وتجاوزات متغيرات البيئة، وموقع النسخ الاحتياطي، والأوامر المستخدمة بواسطة البرامج النصية أو خدمات واجهة برمجة التطبيقات (API). تحقق من <a href="/docs/ar/milvus_backup_overview.md#Compatibility-matrix">معلومات التوافق</a> الخاصة بإصدارات الخادم تلك.</p>
<p>احتفظ بالدليل الثنائي الأصلي ودليل التكوين ودلائل النسخ الاحتياطي الحالية أثناء التحقق من صحة التثبيت الجديد. قم بتنزيل الإصدار 0.6.0 في دليل منفصل باستخدام <a href="/docs/ar/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">«الحصول على Milvus Backup</a>». يتم تشغيل جميع الأوامر أدناه من هذا الدليل وتستدعي الملف الثنائي للإصدار 0.6.0. ضع نسخة من تكوين الإصدار v1 الخاص بك في <code translate="no">configs/backup-v1.yaml</code>.</p>
<h2 id="Migrate-the-configuration" class="common-anchor-header">ترحيل التكوين<button data-href="#Migrate-the-configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>لا يزال ملف التكوين v1 يُحمَّل في الإصدار 0.6.0. يقوم Milvus Backup بترجمته إلى v2 عند بدء التشغيل ويعرض تحذيرًا. لحفظ ملف التكوين المترجم في ملف منفصل:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config migrate --config configs/backup-v1.yaml --output configs/backup-v2.yaml --strict
./milvus-backup config show --config configs/backup-v2.yaml
./milvus-backup check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">--strict</code> يرفض التكوين المهاجر غير الصالح. بدون ملف <code translate="no">--output</code> ، يقوم الأمر بكتابة ملف YAML الخاص بالإصدار v2 إلى المخرج القياسي. راجع الملف الجديد واستخدمه فقط بعد التحقق من صحة إعداداته.</p>
<table>
<thead>
<tr><th>إعداد الإصدار v1</th><th>إعداد الإصدار 2</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.address</code>، <code translate="no">milvus.port</code></td><td><code translate="no">milvus.grpc.address</code>، <code translate="no">milvus.grpc.port</code></td></tr>
<tr><td>تخزين المصدر ضمن <code translate="no">minio.*</code></td><td><code translate="no">milvus.storage.*</code></td></tr>
<tr><td>مساحة تخزين النسخ الاحتياطي تحت <code translate="no">minio.backup*</code></td><td><code translate="no">backup.storage.*</code></td></tr>
<tr><td>بيانات اعتماد التخزين</td><td><code translate="no">milvus.storage.auth.*</code> / <code translate="no">backup.storage.auth.*</code> ، مع <code translate="no">auth.type</code></td></tr>
<tr><td><code translate="no">minio.crossStorage</code></td><td><code translate="no">transfer.mode</code></td></tr>
<tr><td><code translate="no">backup.gcPause.address</code></td><td><code translate="no">milvus.management.endpoint</code></td></tr>
</tbody>
</table>
<p>راجع متغيرات البيئة في نفس التغيير الذي يتم فيه تعديل ملف التكوين. لا تقبل النسخة V2 سوى متغيرات البيئة المدعومة المتعلقة ببيانات الاعتماد، مثل <code translate="no">MILVUS_STORAGE_AUTH_SECRET_ACCESS_KEY</code>. لا يتم تطبيق أسماء النسخة القديمة v1 على ملف v2. بالنسبة للإعدادات غير المتعلقة ببيانات الاعتماد، مثل أسماء الحاويات ونقاط النهاية، استخدم YAML أو تجاوز مفتاح التكوين:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup-v2.yaml --set milvus.storage.bucketName=my-bucket
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config migrate</code> يبلغ عن متغيرات البيئة المتأثرة دون نسخ قيمها السرية إلى ملف الإخراج. راجع <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/env_variables.md">متغيرات بيئة الإصدار 2 المدعومة</a>. يحل الأمر ` <code translate="no">config show</code> ` محل الأمر ` <code translate="no">check config</code> ` الذي تم إهماله.</p>
<h2 id="Update-CLI-commands" class="common-anchor-header">تحديث أوامر واجهة سطر الأوامر (CLI)<button data-href="#Update-CLI-commands" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم رفض العلامات التي تم إهمالها في الإصدار 0.5 في الإصدار 0.6.0. قم بتحديث البرامج النصية قبل ترقية الملف الثنائي.</p>
<table>
<thead>
<tr><th>الأمر</th><th>الخيار الذي تمت إزالته</th><th>البديل</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">create</code></td><td><code translate="no">--colls</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--force</code> / <code translate="no">-f</code></td><td><code translate="no">--strategy skip_flush</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--meta_only</code></td><td><code translate="no">--strategy meta_only</code></td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--collections</code> / <code translate="no">-c</code> ، <code translate="no">--databases</code> / <code translate="no">-d</code> ، <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code>، باستخدام أسماء الأهداف</td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--restore_index</code></td><td><code translate="no">--rebuild_index</code></td></tr>
<tr><td><code translate="no">get</code></td><td><code translate="no">--detail</code> / <code translate="no">-d</code></td><td>إزالة العلامة؛ <code translate="no">get</code> يعرض معلومات النسخ الاحتياطي</td></tr>
<tr><td><code translate="no">list</code></td><td><code translate="no">--collection</code> / <code translate="no">-c</code></td><td>لا يوجد مرشح تجميع مكافئ</td></tr>
</tbody>
</table>
<p>على سبيل المثال، تختار أوامر الإصدار 0.5.16 التالية اسم المصدر <code translate="no">coll</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>تستخدم بدائلها في الإصدار 0.6.0 اسم الهدف للاستعادة:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>يمكن لمرشح الاستعادة الذي لا يطابق أي شيء أن ينتهي بنجاح دون إنشاء مجموعة. تحقق دائمًا من المجموعة الهدف وبياناتها. لا يزال <code translate="no">collection_names</code> في واجهة برمجة تطبيقات HTTP يختار أسماء المصادر في النسخة الاحتياطية؛ راجع <a href="/docs/ar/milvus_backup_0_6_api.md#Restore-data">دليل واجهة برمجة التطبيقات 0.6.0</a>.</p>
<h2 id="Choose-the-backup-behavior" class="common-anchor-header">اختر سلوك النسخ الاحتياطي<button data-href="#Choose-the-backup-behavior" class="anchor-icon" translate="no">
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
<li>على خوادم Milvus 2.x المدعومة، يستخدم تنسيق <code translate="no">auto</code> سجلات binlog. لا تتطلب ترقية النسخ الاحتياطي الانتقال إلى Milvus 3.0.</li>
<li>في Milvus 3.0، يختار <code translate="no">auto</code> «snapshot». يبدأ الدعم الرسمي للنسخ الاحتياطي والاستعادة اعتبارًا من Milvus 3.0.1. قم بتمرير <code translate="no">--format binlog</code> للاحتفاظ بسلوك binlog عند إنشاء نسخة احتياطية.</li>
<li>لا يحافظ توافق تكوين الإصدار 1 على علامات الأوامر التي تمت إزالتها ولا يتجاوز الإعداد الافتراضي للتنسيق الجديد.</li>
<li>يمكن للإعدادات المسبقة الخاصة بالغرض تعيين التنسيق وخيارات أخرى. على سبيل المثال، يفرض <code translate="no">--for archive</code> استخدام سجل الثنائي حتى إذا تم توفير <code translate="no">--format snapshot</code> أيضًا. راجع <a href="/docs/ar/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">خيارات التنسيق والغرض</a>.</li>
<li>يتم تخطي المجموعات الخارجية أثناء النسخ الاحتياطي. تحقق من بيانات تعريف النسخ الاحتياطي بدلاً من اعتبار نجاح المهمة دليلاً على تضمين كل مجموعة.</li>
</ul>
<h2 id="Validate-before-switching-jobs" class="common-anchor-header">التحقق من الصحة قبل تبديل المهام<button data-href="#Validate-before-switching-jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>يحافظ المثال التالي على تنسيق سجل الثنائي (binlog) ويستعيد البيانات إلى مجموعة جديدة. استبدل <code translate="no">coll</code> بمجموعة قمت بتسجيل مخططها وعددها وقيمها القياسية والمتجهة ونتائج البحث الخاصة بها. استخدم اسم نسخ احتياطي جديد وتأكد من عدم وجود الاسم الهدف <code translate="no">coll_upgrade_check</code>.</p>
<pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-v2.yaml
./milvus-backup create --filter coll --format binlog -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup get -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_upgrade_check -n upgrade_check -s _upgrade_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>تأكد من أن النسخة الاحتياطية تتضمن <code translate="no">coll</code> وأن <code translate="no">coll_upgrade_check</code> موجود بعد الاستعادة. قم بإنشاء فهرس المتجهات الخاص بها إذا لزم الأمر، وقم بتحميله، وقارن البيانات المستعادة ونتائج البحث مع خط الأساس المسجل. حافظ على البيانات المصدر دون تغيير أثناء هذا الاختبار.</p>
<p>اختبر أيضًا نسخة احتياطية حالية تمثيلية قبل الاعتماد عليها باستخدام الأداة الجديدة. بالنسبة لنسخة احتياطية 0.5.16 باسم <code translate="no">legacy_backup</code> تحتوي على <code translate="no">coll</code> ، استخدم اسم هدفًا منفصلاً:</p>
<pre><code translate="no" class="language-shell">./milvus-backup get -n legacy_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_legacy_check -n legacy_backup -s _legacy_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>تم التحقق من صحة مسارات الترقية هذه باستخدام <strong>Milvus 2.6.11،</strong> والنسخة الاحتياطية <strong>0.5.16 → 0.6.0،</strong> والنسخ الاحتياطية لـ binlog في MinIO. تم استعادة كل من النسخ الاحتياطية التي تم إنشاؤها حديثًا والنسخ الاحتياطية الموجودة بقيم كيانات متطابقة ونتائج بحث متجهية. هذا لا يضمن التوافق مع كل نسخة احتياطية سابقة أو مع استعادة البيانات من Milvus 2.x إلى 3.0. كما أنه لا يضمن أن الإصدار 0.5.x يمكنه قراءة النسخ الاحتياطية التي تم إنشاؤها بواسطة الإصدار 0.6.0.</p>
<p>بمجرد نجاح عملية التحقق من الصحة، قم بتحديث المهام لاستخدام الملف الثنائي الجديد، والتكوين الذي تم التحقق منه، وإعدادات البيئة، وعلامات الاستبدال معًا. بالنسبة لعمليات نشر واجهة برمجة التطبيقات (API)، قم بتشغيل الخدمة الجديدة باستخدام التكوين الذي تم التحقق منه وتحقق من إتمام المهمة من خلال <a href="/docs/ar/milvus_backup_0_6_api.md">واجهة برمجة التطبيقات HTTP 0.6.0</a>. لتبني اللقطات على Milvus 3.0.1 أو إصدار أحدث، اتبع إرشادات <a href="/docs/ar/snapshot-backup-and-restore.md">«النسخ الاحتياطي للقطات واستعادتها في مثيل واحد</a>».</p>
