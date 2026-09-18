---
id: snapshot-backup-and-restore.md
summary: قم بعمل نسخة احتياطية لمجموعة ما واستعادها باسم جديد في نفس مثيل Milvus.
title: النسخ الاحتياطي والاستعادة في مثيل واحد
---
<h1 id="Snapshot-Backup-and-Restore-in-One-Instance" class="common-anchor-header">النسخ الاحتياطي والاستعادة في مثيل واحد<button data-href="#Snapshot-Backup-and-Restore-in-One-Instance" class="anchor-icon" translate="no">
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
    </button></h1><p>قم بعمل نسخة احتياطية لمجموعة واستعادتها باسم جديد في نفس مثيل Milvus. يستخدم هذا المثال <strong>Milvus Backup 0.6.0</strong> لإنشاء لقطة من <code translate="no">coll</code> واستعادتها باسم <code translate="no">coll_bak</code> على <strong>Milvus 3.0.1 أو إصدار أحدث</strong>. بالنسبة لـ Backup 0.5.x، استخدم <a href="/docs/ar/single-instance-backup-and-restore.md">النسخ الاحتياطي والاستعادة في مثيل واحد</a>.</p>
<h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
<tr><th>الموقع</th><th>مثيل Milvus</th><th>مخزن الكائنات</th><th>الحاوية</th><th>مسار الجذر</th></tr>
</thead>
<tbody>
<tr><td>البيانات المصدر</td><td><code translate="no">milvus-a</code></td><td><code translate="no">minio-a</code></td><td><code translate="no">bucket-a</code></td><td><code translate="no">files</code></td></tr>
<tr><td>النسخة الاحتياطية التي أنشأها المصدر</td><td>—</td><td><code translate="no">minio-a</code></td><td><code translate="no">bucket-a</code></td><td><code translate="no">backup/my_backup</code></td></tr>
<tr><td>البيانات المستعادة</td><td><code translate="no">milvus-a</code></td><td><code translate="no">minio-a</code></td><td><code translate="no">bucket-a</code></td><td><code translate="no">files</code></td></tr>
</tbody>
</table>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>استخدم Milvus Backup 0.6.0 و Milvus 3.0.1 أو إصدار أحدث. قم بتثبيت الأداة كما هو موضح في <a href="/docs/ar/milvus_backup_0_6_cli.md">"النسخ الاحتياطي واستعادة البيانات باستخدام الأوامر</a>".</li>
<li>استخدم مجموعة موجودة باسم <code translate="no">coll</code> ، أو أنشئ مجموعة العينة الاختيارية أدناه. حافظ على بياناتها دون تغيير أثناء مقارنة نتائج المصدر والنتائج المستعادة.</li>
<li>اجعل منفذ gRPC الخاص بـ Milvus (19530) ومنفذ الإدارة (9091) وتخزين الكائنات متاحًا لـ Milvus Backup. يجب أيضًا أن يتمكن خادم Milvus من الوصول إلى تخزين النسخ الاحتياطي لتصدير واستيراد اللقطات.</li>
<li>استبدل أسماء المضيفين وأسماء الدلاء ومسارات الجذر وبيانات الاعتماد الواردة في المثال بإعدادات النشر الخاصة بك. يجب أن تتطابق إعدادات تخزين Milvus مع المثيل قيد التشغيل؛ ولا يؤدي تغيير تكوين النسخ الاحتياطي إلى إعادة تكوين Milvus.</li>
<li>تأكد من عدم وجود ملف « <code translate="no">coll_bak</code> » في المثيل الهدف.</li>
</ul>
<p>للاطلاع على إعدادات تخزين Milvus، راجع <a href="/docs/ar/deploy_s3.md">«تخزين الكائنات</a>». بالنسبة لتكوينات النسخ الاحتياطي v1 الحالية، راجع <a href="/docs/ar/milvus_backup_upgrade.md#Migrate-the-configuration">«ترقية Milvus Backup</a>».</p>
<h2 id="Prepare-sample-data" class="common-anchor-header">تحضير بيانات نموذجية<button data-href="#Prepare-sample-data" class="anchor-icon" translate="no">
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
    </button></h2><p>تستخدم الأوامر أدناه مجموعة موجودة باسم <code translate="no">coll</code>. يمكنك استخدام مجموعتك الخاصة عن طريق تغيير الأسماء بشكل متسق.</p>
<p>للحصول على مجموعة اختبار صغيرة، قم بتثبيت PyMilvus وقم بتشغيل ما يلي على اسم مجموعة فارغة. استبدل URI إذا لم يكن Milvus محليًا:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus==3.0.0
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
<span class="hljs-keyword">assert</span> <span class="hljs-keyword">not</span> client.has_collection(<span class="hljs-string">&quot;coll&quot;</span>), <span class="hljs-string">&quot;Use an empty sample collection name&quot;</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;label&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">64</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">8</span>)
indexes = client.prepare_index_params()
indexes.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)
client.create_collection(<span class="hljs-string">&quot;coll&quot;</span>, schema=schema, index_params=indexes)

rng = random.Random(<span class="hljs-number">601</span>)
rows = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;label&quot;</span>: <span class="hljs-string">f&quot;backup-docs-<span class="hljs-subst">{i}</span>&quot;</span>,
     <span class="hljs-string">&quot;vector&quot;</span>: [rng.randrange(<span class="hljs-number">256</span>) / <span class="hljs-number">256</span> <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">8</span>)]}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)
]
client.insert(<span class="hljs-string">&quot;coll&quot;</span>, rows)
client.flush(<span class="hljs-string">&quot;coll&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>يؤدي هذا إلى إنشاء 256 كيانًا. احتفظ ببيانات الاختبار هذه دون تغيير أثناء اتباع الخطوات المتبقية.</p>
<h2 id="Back-up-the-collection" class="common-anchor-header">النسخ الاحتياطي للمجموعة<button data-href="#Back-up-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">الخطوة 1: إعداد التكوين<button data-href="#Step-1-Prepare-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتشغيل الأمر التالي من الدليل الذي يحتوي على الملف الثنائي <code translate="no">milvus-backup</code>. احتفظ بهذا الدليل العملي للأوامر المتبقية:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>احفظ ما يلي باسم <code translate="no">configs/backup-source.yaml</code>. يستخدم المثال بيانات اعتماد الاختبار الافتراضية لـ MinIO؛ استبدلها ببيانات اعتماد مخزن الكائنات الخاص بك.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">configVersion:</span> <span class="hljs-string">v2</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">milvus-a</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">management:</span>
    <span class="hljs-attr">endpoint:</span> <span class="hljs-string">http://milvus-a:9091</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">provider:</span> <span class="hljs-string">minio</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">minio-a</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">bucket-a</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">files</span>
    <span class="hljs-attr">auth:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">static</span>
      <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span>
<span class="hljs-attr">backup:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">bucket-a</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">backup</span>
<span class="hljs-attr">transfer:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">auto</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">milvus.storage</code> يصف بيانات المثيل المصدر. يصف ملف « <code translate="no">backup.storage</code> » وجهة النسخ الاحتياطي. ترث حقول تخزين النسخ الاحتياطي غير المحددة قيمها من ملف « <code translate="no">milvus.storage</code> »، باستثناء الحقل « <code translate="no">rootPath</code> »، الذي يقبل القيمة الافتراضية « <code translate="no">backup</code> ».</p>
<p>إذا كان كل من Milvus و Milvus Backup يستخدمان عناوين مختلفة للوصول إلى مخزن الكائنات نفسه، فقم بتكوين <code translate="no">backup.storage.milvusAddress</code> و <code translate="no">milvusPort</code> بالعنوان الذي يمكن لخادم Milvus الوصول إليه. راجع <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">مثال التكوين 0.6.0</a>.</p>
<h3 id="Step-2-Check-connectivity-and-create-a-backup" class="common-anchor-header">الخطوة 2: التحقق من الاتصال وإنشاء نسخة احتياطية<button data-href="#Step-2-Check-connectivity-and-create-a-backup" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-source.yaml
./milvus-backup create --format snapshot --filter coll -n my_backup --config configs/backup-source.yaml
./milvus-backup get -n my_backup --config configs/backup-source.yaml
<button class="copy-code-btn"></button></code></pre>
<p>يجب أن يُظهر فحص الاتصال <code translate="no">Success!</code>. ويجب أن يُظهر الأمر create <code translate="no">create backup success</code> ، ويجب أن تسرد معلومات النسخ الاحتياطي <code translate="no">coll</code>.</p>
<p>يحدد الأمر الصريح <code translate="no">--format snapshot</code> سير عمل اللقطة. كما يحدد الأمر الافتراضي <code translate="no">auto</code> أيضًا اللقطة في Milvus 3.0. تتضمن النسخة الاحتياطية البيانات الوصفية وحزمة اللقطة المصدرة تحت <code translate="no">bucket-a/backup/my_backup</code>. احتفظ بالدليل بأكمله.</p>
<h2 id="Restore-within-the-same-instance" class="common-anchor-header">الاستعادة داخل نفس المثيل<button data-href="#Restore-within-the-same-instance" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم نفس التكوين لاستعادة النسخة الاحتياطية مع إضافة لاحقة:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-source.yaml
<button class="copy-code-btn"></button></code></pre>
<p>يتطابق الأمر CLI <code translate="no">--filter</code> مع اسم الهدف <strong>بعد</strong> تطبيق <code translate="no">-s</code> أو <code translate="no">--rename</code>. استخدم <code translate="no">coll_bak</code> ، وليس <code translate="no">coll</code> ، في أمر الاستعادة هذا. يمكن أن ينهي المرشح الذي لا يطابق أي شيء العملية بنجاح دون إنشاء مجموعة.</p>
<p>تستخدم المجموعة المستعادة مساحة التخزين المُعدة للمثيل الهدف. يتولى Milvus إدارة استيراد اللقطة وتخطيط البيانات الناتج.</p>
<h2 id="Verify-the-result" class="common-anchor-header">تحقق من النتيجة<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة لعينة البيانات الاختيارية المكونة من 256 كيانًا المذكورة أعلاه، قم بتشغيل هذا الأمر على هدف الاستعادة. استبدل <code translate="no">localhost:19530</code> بنقطة نهاية Milvus نفسها المستخدمة في إعداد البيانات. يقوم الأمر بالتحقق من العدد، وكل قيمة سكالارية ومتجهة، ونتيجة البحث المتجه دون حذف البيانات:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
<span class="hljs-keyword">assert</span> client.has_collection(<span class="hljs-string">&quot;coll_bak&quot;</span>)
<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> client.list_indexes(<span class="hljs-string">&quot;coll_bak&quot;</span>):
    indexes = client.prepare_index_params()
    indexes.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)
    client.create_index(<span class="hljs-string">&quot;coll_bak&quot;</span>, indexes)
client.load_collection(<span class="hljs-string">&quot;coll_bak&quot;</span>)

rng = random.Random(<span class="hljs-number">601</span>)
expected = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;label&quot;</span>: <span class="hljs-string">f&quot;backup-docs-<span class="hljs-subst">{i}</span>&quot;</span>,
     <span class="hljs-string">&quot;vector&quot;</span>: [rng.randrange(<span class="hljs-number">256</span>) / <span class="hljs-number">256</span> <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">8</span>)]}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)
]
count = client.query(<span class="hljs-string">&quot;coll_bak&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>, output_fields=[<span class="hljs-string">&quot;count(*)&quot;</span>],
                     consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)[<span class="hljs-number">0</span>][<span class="hljs-string">&quot;count(*)&quot;</span>]
actual = client.query(<span class="hljs-string">&quot;coll_bak&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id &gt;= 0&quot;</span>,
                      output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;label&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>], limit=<span class="hljs-number">512</span>,
                      consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)
<span class="hljs-keyword">assert</span> count == <span class="hljs-number">256</span>
<span class="hljs-keyword">assert</span> <span class="hljs-built_in">sorted</span>(actual, key=<span class="hljs-keyword">lambda</span> row: row[<span class="hljs-string">&quot;id&quot;</span>]) == expected
hits = client.search(<span class="hljs-string">&quot;coll_bak&quot;</span>, data=[expected[<span class="hljs-number">7</span>][<span class="hljs-string">&quot;vector&quot;</span>]], limit=<span class="hljs-number">1</span>,
                     consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)
<span class="hljs-keyword">assert</span> hits[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&quot;id&quot;</span>] == <span class="hljs-number">7</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Backup and restore verified&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة للبيانات الأخرى، قارنها بخط الأساس الخاص بك في وقت النسخ الاحتياطي. قم بإنشاء فهرس متجه مناسب قبل التحميل إذا كانت المجموعة المستعادة لا تحتوي على أي فهرس. لا يثبت نجاح الأمر وحده أن البيانات المتوقعة قد تم استعادتها.</p>
