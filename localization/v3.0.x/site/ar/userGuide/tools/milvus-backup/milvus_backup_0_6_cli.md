---
id: milvus_backup_0_6_cli.md
summary: >-
  قم بتكوين Milvus Backup الإصدار 0.6.0، وإنشاء نسخة احتياطية، والتحقق من
  البيانات المستعادة باستخدام واجهة سطر الأوامر (CLI).
title: استخدم Milvus Backup الإصدار 0.6.0
---
<h1 id="Use-Milvus-Backup-060" class="common-anchor-header">استخدم Milvus Backup الإصدار 0.6.0<button data-href="#Use-Milvus-Backup-060" class="anchor-icon" translate="no">
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
    </button></h1><p>استخدم Milvus Backup لنسخ المجموعات احتياطيًا واستعادتها في نفس مثيل Milvus أو في مثيل آخر. يغطي هذا الدليل <strong>Milvus Backup 0.6.0</strong>. يتم دعم النسخ الاحتياطي والاستعادة على Milvus 3.0 رسميًا بدءًا من <strong>الإصدار Milvus 3.0.1</strong>. يدعم الإصدار 0.6.0 أيضًا سير عمل binlog على إصدارات Milvus 2.x المدعومة؛ تحقق <a href="/docs/ar/milvus_backup_overview.md#Compatibility-matrix">من توافق Milvus Backup</a>.</p>
<p>إذا كنت لا تزال تستخدم النسخة 0.5.x من Backup، فاستخدم <a href="/docs/ar/milvus_backup_cli.md">دليل واجهة CLI</a> الخاص <a href="/docs/ar/milvus_backup_cli.md">بالإصدار 0.5.x</a>. إذا كنت تقوم بالترقية، فاتبع أولاً <a href="/docs/ar/milvus_backup_upgrade.md">إرشادات ترقية Milvus Backup</a>.</p>
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
    </button></h2><p>قم بتنزيل الملف الثنائي الخاص بنظام التشغيل والبنية الخاصة بك من <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">الإصدار v0.6.0،</a> ثم قم بفك ضغطه. احتفظ بالملف الثنائي وأمثلة التكوين في نفس الإصدار.</p>
<p>للبناء من المصدر بدلاً من ذلك، قم بتثبيت <strong>Go 1.26 أو أحدث</strong>، ثم قم بتشغيل:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.6.0 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<p>لا يتطلب الملف الثنائي المُعد مسبقًا وجود Go. قم بتشغيل جميع أوامر shell اللاحقة من الدليل الذي يحتوي على ملف <code translate="no">milvus-backup</code>.</p>
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
    </button></h2><p>يحتاج Milvus Backup إلى الوصول إلى نقطة نهاية Milvus gRPC، ونقطة نهاية الإدارة الخاصة به، ومساحة تخزين المثيل، ووجهة النسخ الاحتياطي. بالنسبة لنسخ الاحتياطي اللقطات، يحتاج خادم Milvus أيضًا إلى الوصول إلى مساحة تخزين النسخ الاحتياطي.</p>
<p>قم بإنشاء دليل التكوين:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>احفظ هذا المثال الخاص بـ MinIO باسم <code translate="no">configs/backup.yaml</code>. استبدل العناوين وبيانات الاعتماد ووحدة التخزين والمسار الجذري بإعدادات النشر الخاص بك. بيانات الاعتماد <code translate="no">minioadmin</code> هي الإعدادات الافتراضية لاختبار MinIO.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">configVersion:</span> <span class="hljs-string">v2</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">management:</span>
    <span class="hljs-attr">endpoint:</span> <span class="hljs-string">http://localhost:9091</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">provider:</span> <span class="hljs-string">minio</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">files</span>
    <span class="hljs-attr">auth:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">static</span>
      <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span>
<span class="hljs-attr">backup:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">backup</span>
<span class="hljs-attr">transfer:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">auto</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">milvus.grpc</code> يتصل بالمثيل الذي يتم نسخه احتياطيًا أو استعادته. إذا تم تمكين المصادقة، فقم أيضًا بتعيين <code translate="no">milvus.user</code> و <code translate="no">milvus.password</code>.</li>
<li><code translate="no">milvus.management.endpoint</code> يُستخدم لإيقاف/استئناف عملية جمع القمامة أثناء النسخ الاحتياطي.</li>
<li><code translate="no">milvus.storage</code> يجب أن يتطابق مع تخزين الكائنات الفعلي للمثيل. لا يؤدي تعيين دلو هنا إلى تغيير تكوين Milvus.</li>
<li><code translate="no">backup.storage</code> يحدد موقع النسخ الاحتياطي. ترث الحقول غير المحددة قيمتها من <code translate="no">milvus.storage</code> ، باستثناء <code translate="no">rootPath</code> ، الذي يكون افتراضيًا <code translate="no">backup</code>.</li>
<li><code translate="no">transfer.mode: auto</code> يختار النسخ من جانب التخزين عندما تتطابق الخلفيات، ويختار البث عبر Milvus Backup في الحالات الأخرى. يتحكم هذا الإعداد في نقل الكائنات، وليس في تنسيق النسخ الاحتياطي.</li>
</ul>
<p>فيما يلي الإعدادات الافتراضية النموذجية للتخزين. تأكد من القيم في النشر قيد التشغيل قبل استخدامها.</p>
<table>
<thead>
<tr><th>الإعداد</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>المخزن</td><td><code translate="no">a-bucket</code></td><td><code translate="no">milvus-bucket</code></td></tr>
<tr><td>مسار الجذر</td><td><code translate="no">files</code></td><td><code translate="no">file</code></td></tr>
</tbody>
</table>
<p>إذا كان خادم Milvus يستخدم عنوانًا مختلفًا للوصول إلى مخزن النسخ الاحتياطي، فقم بتعيين <code translate="no">backup.storage.milvusAddress</code> و <code translate="no">milvusPort</code> إلى العنوان الذي يمكن للخادم الوصول إليه. للاطلاع على المصادقة و TLS وموفري التخزين الآخرين والإعدادات الإضافية، راجع <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">مثال التكوين 0.6.0</a>.</p>
<p>افحص القيم الفعلية وتحقق من الاتصال:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config show</code> يخفي القيم السرية ويبلغ عن مصدر كل قيمة. يجب أن يُبلغ فحص الاتصال عن <code translate="no">Success!</code>. قم بحل أخطاء الاتصال أو التخزين قبل إنشاء نسخة احتياطية.</p>
<p>بالنسبة لتكوينات الإصدار 1 الحالية، راجع <a href="/docs/ar/milvus_backup_upgrade.md#Migrate-the-configuration">ترقية النسخ الاحتياطي لـ Milvus</a>. لا تحل الترجمة التلقائية للتكوين محل علامات CLI التي تمت إزالتها.</p>
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
    </button></h2><p>استخدم مجموعة موجودة باسم <code translate="no">coll</code> وتأكد من عدم وجود <code translate="no">coll_bak</code>. سجل المخطط وعدد الكيانات والقيم القياسية والمتجهة التمثيلية ونتيجة بحث معروفة قبل النسخ الاحتياطي. حافظ على البيانات النموذجية دون تغيير أثناء مقارنة النسخة المستعادة. لإنشاء مجموعة بيانات صغيرة يمكن التخلص منها بدلاً من ذلك، استخدم <a href="/docs/ar/snapshot-backup-and-restore.md#Prepare-sample-data">«تحضير بيانات عينة</a>».</p>
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
    </button></h2><p>قم بإنشاء نسخة احتياطية مسماة من <code translate="no">coll</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup.yaml
./milvus-backup list --config configs/backup.yaml
./milvus-backup get -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>يجب أن يُظهر الأمر create <code translate="no">create backup success</code>. يُرجع الأمر <code translate="no">get</code> بيانات تعريف النسخ الاحتياطي؛ تحقق من وجود المجموعة المتوقعة. يؤدي حذف <code translate="no">--filter</code> إلى نسخ جميع المجموعات المؤهلة احتياطيًا. يتم تخطي المجموعات الخارجية.</p>
<p><code translate="no">--filter</code> يقبل الأسماء المفصولة بفواصل: <code translate="no">coll</code> في قاعدة البيانات الافتراضية، أو <code translate="no">db1.coll</code> ، أو <code translate="no">'db1.*'</code> لجميع المجموعات في قاعدة البيانات. ضع أنماط الاقتباس التي تحتوي على <code translate="no">*</code> بين علامتي اقتباس لمنع التوسع في شل.</p>
<h3 id="Choose-a-backup-format-or-purpose" class="common-anchor-header">اختر تنسيق النسخ الاحتياطي أو الغرض منه<button data-href="#Choose-a-backup-format-or-purpose" class="anchor-icon" translate="no">
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
    </button></h3><p>مع الإعداد الافتراضي <code translate="no">--format auto</code> ، يستخدم Milvus 3.0 نسخًا احتياطية من اللقطات؛ بينما تستخدم خوادم Milvus 2.x المدعومة سجلات binlog. للاحتفاظ بسلوك سجلات binlog بشكل صريح، قم بتمرير <code translate="no">--format binlog</code>. يختار <a href="/docs/ar/snapshot-backup-and-restore.md">مثال اللقطة</a> <code translate="no">--format snapshot</code> بشكل صريح.</p>
<p>استخدم <code translate="no">--for</code> عندما يتطابق الغرض مع سير عملك:</p>
<table>
<thead>
<tr><th>الغرض</th><th>القيم التي يطبقها الإعداد المسبق</th><th>الاستخدام المقصود</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">clone</code></td><td>تمكين النسخ الاحتياطي باستخدام نموذج RBAC؛ مع الاحتفاظ باختياراتك الخاصة بالتنسيق والاستراتيجية</td><td>نسخ البيانات إلى مثيل آخر؛ يستخدم الإعداد المسبق " <code translate="no">auto</code> " لقطة (snapshot) على Milvus 3.0</td></tr>
<tr><td><code translate="no">archive</code></td><td>يفرض استخدام <code translate="no">binlog</code> ويُفعّل النسخ الاحتياطي باستخدام نموذج RBAC</td><td>الاحتفاظ بنسخة احتياطية بتنسيق binlog لاستعادتها لاحقًا</td></tr>
<tr><td><code translate="no">secondary</code></td><td>يفرض استخدام <code translate="no">binlog</code> و <code translate="no">bulk_flush</code> والنسخ الاحتياطي RBAC وفهرسة البيانات الوصفية الإضافية</td><td>تهيئة نسخة ثانوية في طوبولوجيا تكرار مهيأة</td></tr>
</tbody>
</table>
<p>على سبيل المثال:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --for clone --filter coll -n clone_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>تتجاوز الإعدادات المسبقة القيم المتعارضة للخيارات التي تحددها. على سبيل المثال، يؤدي الإعداد المسبق <code translate="no">--for archive --format snapshot</code> إلى إنشاء نسخة احتياطية بتنسيق binlog. لا تؤدي النسخ الاحتياطي لبيانات تعريف RBAC إلى استعادتها تلقائيًا؛ استخدم خيار <code translate="no">--rbac</code> الخاص بأمر الاستعادة عند الحاجة.</p>
<p><code translate="no">secondary</code> ليس اختصارًا للاستعادة العادية عبر المثيلات. كما يتطلب الوصول إلى etcd المصدر للحصول على بيانات تعريف الفهرس، ومعرفات مجموعة النسخ المتماثل والقنوات الصحيحة، ووجهة ثانوية جديدة. يجب أن يحتفظ النسخ الاحتياطي ببيانات التعريف الكاملة، بما في ذلك <code translate="no">meta/full_meta.json</code>. يقع تكوين النسخ المتماثل وتنفيذ التحويل التلقائي خارج نطاق هذا الدليل. راجع <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">المصدر والمرجع</a> الخاصين بالإصدار <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">0.6.0</a> للاطلاع على التنفيذ والمتطلبات الخاصة بهذا الإصدار.</p>
<h3 id="Preserve-the-complete-backup" class="common-anchor-header">الحفاظ على النسخة الاحتياطية الكاملة<button data-href="#Preserve-the-complete-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>يتم تخزين النسخة الاحتياطية في <code translate="no">&lt;backup.storage.bucketName&gt;/&lt;backup.storage.rootPath&gt;/&lt;backup_name&gt;</code>. احتفظ بكل كائن في هذا الدليل. تتضمن النسخ الاحتياطية اللقطية حزمة مُصدَّرة بالإضافة إلى البيانات الوصفية.</p>
<p>لا تقم بنسخ ملفات البيانات الوصفية فقط ولا تفترض أن النسخة الاحتياطية اللقطية لها نفس تخطيط النسخة الاحتياطية من سجلات الثنائيات.</p>
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
    </button></h2><p>استعد <code translate="no">coll</code> كـ <code translate="no">coll_bak</code> في المثيل الذي تم تكوينه:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>في واجهة سطر الأوامر (CLI)، يتطابق <code translate="no">--filter</code> مع الأسماء <strong>بعد</strong> تطبيق <code translate="no">-s</code> أو <code translate="no">--rename</code>. لا يتطابق الأمر الذي يحتوي على <code translate="no">--filter coll -s _bak</code> مع أي شيء ويمكن أن ينتهي بنجاح دون استعادة أي مجموعة.</p>
<p>لاستعادة البيانات باستخدام الاسم الأصلي، اختر وجهة لا يوجد فيها اسم المجموعة هذا، ووجه التكوين إلى تلك الوجهة وموقع النسخ الاحتياطي، واحذف اللاحقة:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll -n my_backup --config configs/backup-target.yaml
<button class="copy-code-btn"></button></code></pre>
<p>للحصول على مثال كامل لنفس المثيل، راجع <a href="/docs/ar/snapshot-backup-and-restore.md">النسخ الاحتياطي والاستعادة في مثيل واحد</a>. تستخدم الصفحات الحالية للحالات الشائعة عبر المثيلات النسخة 0.5.16 من Backup وتكوين v1؛ لا تقم بتطبيق أوامرها دون تغيير على الإصدار 0.6.0. للحصول على تكوين النقل الخاص بالإصدار 0.6.0، راجع <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">دليل النقل الخاص بالإصدار</a>.</p>
<h2 id="Verify-restored-data" class="common-anchor-header">تحقق من البيانات المستعادة<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>تأكد من وجود « <code translate="no">coll_bak</code> ». إذا لم تقم عملية الاستعادة بإعادة إنشاء فهرس المتجهات الخاص بها، فأنشئ الفهرس المناسب لمخططك قبل تحميل المجموعة. قارن مخططها، وعدد الكيانات، والقيم القياسية والمتجهة، ونتائج البحث المعروفة، مع خط الأساس الذي تم تسجيله قبل النسخ الاحتياطي.</p>
<p>بالنسبة لمجموعة البيانات القابلة للتخلص منها المكونة من 256 كيانًا، استخدم الفحوصات الكاملة الواردة في <a href="/docs/ar/snapshot-backup-and-restore.md#Verify-the-result">«التحقق من النتيجة</a>». لا يُثبت نجاح الأمر وحده أن البيانات المتوقعة قد تم استعادتها.</p>
