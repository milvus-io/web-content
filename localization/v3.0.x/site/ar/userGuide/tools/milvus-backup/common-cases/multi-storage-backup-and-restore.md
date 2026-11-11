---
id: multi-storage-backup-and-restore.md
summary: >-
  يشرح هذا الموضوع بالتفصيل عملية إنشاء نسخة احتياطية لمجموعة بيانات من مثيل
  Milvus واحد واستعادتها إلى مثيل آخر
title: الترحيل بين المثيلات عبر بيئات S3Compatible with Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Migrate-Between-Instances-Across-S3-Environments" class="common-anchor-header">الترحيل بين المثيلات عبر بيئات S3<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Migrate-Between-Instances-Across-S3-Environments" class="anchor-icon" translate="no">
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
    </button></h1><p>للاطلاع على سير العمل الحالي، راجع <a href="/docs/ar/milvus_backup_0_6_cli.md">دليل واجهة سطر الأوامر (CLI)</a> أو <a href="/docs/ar/milvus_backup_upgrade.md">قم بالترقية من الإصدار 0.5.x</a>. تحقق من <a href="/docs/ar/milvus_backup_overview.md#Compatibility-matrix">مصفوفة التوافق</a> لمعرفة إصدارات خادم Milvus المدعومة.</p>
<p>يشرح هذا الموضوع بالتفصيل عملية النسخ الاحتياطي لمجموعة من
مثيل Milvus واستعادتها إلى مثيل آخر، مع استخدام كل مثيل
تخزين كائنات مختلف.</p>
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
    </button></h2><p>يوضح الرسم البياني أدناه عملية النسخ الاحتياطي والاستعادة باستخدام
تخزين كائنات مختلف.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/multi-storage-backup-and-restore.png" alt="multi-storage-backup-and-restore.png" class="doc-image" id="multi-storage-backup-and-restore.png" /> 
   <span>multi-storage-backup-and-restore.png</span>
  
 </span></p>
<p>لنفترض أن لدينا مثيلين لـ Milvus، <code translate="no">milvus_A</code> و <code translate="no">milvus_B</code> ، يستخدمان
تخزين كائنات مختلف. في هذا المثال، هدفنا هو إكمال
المهام التالية:</p>
<ol>
<li><p>إنشاء نسخة احتياطية (my_backup) لمجموعة <code translate="no">coll</code> في <code translate="no">bucket_A</code> من
وحدة تخزين الكائنات الخاصة بـ<code translate="no">milvus_A</code>.</p></li>
<li><p>نقل النسخة الاحتياطية my_backup إلى <code translate="no">bucket_B</code> في تخزين الكائنات الخاص بـ <code translate="no">milvus_B</code>.</p></li>
</ol>
<p>في <code translate="no">bucket_B</code> ، قم بالاستعادة من النسخة الاحتياطية وقم بتسمية المجموعة المستعادة
coll_bak.</p>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات المسبقة<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>قم بتثبيت <strong>Milvus Backup 0.5.16</strong> باستخدام <a href="/docs/ar/milvus_backup_cli.md#Obtain-Milvus-Backup">دليل واجهة سطر الأوامر (CLI)</a> للإصدار <a href="/docs/ar/milvus_backup_cli.md#Obtain-Milvus-Backup">0.5.x</a>.</p></li>
<li><p>تعرف على كيفية تكوين إعدادات تخزين الكائنات في Milvus.
للحصول على التفاصيل، راجع <a href="https://milvus.io/docs/deploy_s3.md">تخزين الكائنات
</a>.</p></li>
</ul>
<h2 id="Back-up-a-collection-from-milvusA" class="common-anchor-header">النسخ الاحتياطي لمجموعة من milvus_A<button data-href="#Back-up-a-collection-from-milvusA" class="anchor-icon" translate="no">
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
    </button></h3><p>انتقل إلى دليل مشروع milvus-backup وأنشئ دليلًا
باسم <code translate="no">configs</code>. قم بتشغيل الأوامر التالية من الدليل الذي يحتوي على <code translate="no">milvus-backup</code>:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>قم بتنزيل ملف تكوين النسخ الاحتياطي <code translate="no">backup.yaml</code>:</p>
<pre><code translate="no" class="language-shell">wget -O configs/backup.yaml https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>تبدو بنية الملف كما يلي:</p>
<pre><code translate="no">├── configs
│   └── backup.yaml
├── milvus-backup
└── README.md
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Edit-configuration-file" class="common-anchor-header">الخطوة 2: تحرير ملف التكوين<button data-href="#Step-2-Edit-configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p>يُظهر ملف YAML أدناه الحقول التي يجب تعديلها في ملف v1 الذي تم تنزيله. احتفظ بالإعدادات الأخرى المطلوبة. قم بتوجيه <code translate="no">milvus.address</code> و <code translate="no">milvus.port</code> إلى المثيل الذي يتم نسخه احتياطيًا أو استعادته. اضبط <code translate="no">minio.backupAddress</code> و <code translate="no">minio.backupPort</code> و <code translate="no">minio.backupStorageType</code> على وجهة النسخ الاحتياطي، و <code translate="no">backup.gcPause.address</code> على نقطة نهاية إدارة Milvus المصدر (المنفذ 9091 افتراضيًا). استبدل جميع عناوين الأمثلة وأسماء الحاويات والمسارات وبيانات الاعتماد بإعدادات النشر الخاصة بك.</p>
<p>قم بتعديل ملف <code translate="no">backup.yaml</code> لتعيين التكوينات المناسبة لـ
milvus_A:</p>
<ul>
<li><p>تكوينات الاتصال</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_A</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  <span class="hljs-attr">tlsMode:</span> <span class="hljs-number">0</span>
  <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;root&quot;</span>
  <span class="hljs-attr">password:</span> <span class="hljs-string">&quot;Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">milvus.address</code>: عنوان IP أو اسم المضيف لخادم milvus_A.</p></li>
<li><p><code translate="no">milvus.port</code>: منفذ TCP الذي يستمع عليه خادم Milvus (الافتراضي
19530).</p></li>
</ul></li>
<li><p>تكوينات التخزين (إعدادات MinIO/S3)</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  <span class="hljs-attr">storageType:</span> <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  <span class="hljs-attr">address:</span> <span class="hljs-string">minio_A</span> <span class="hljs-comment"># Address of MinIO/S3</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">iamEndpoint:</span> <span class="hljs-string">&quot;&quot;</span>
  
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">&quot;files&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># Backup storage credentials</span>
  <span class="hljs-attr">backupAccessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">backupSecretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  <span class="hljs-attr">backupBucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  <span class="hljs-attr">backupRootPath:</span> <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">minio.bucketName</code>: اسم الحاوية المستخدمة لتخزين البيانات في milvus_A. في هذا المثال، اضبطه على <code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.rootPath</code>: المسار الجذري داخل الحاوية حيث يتم تخزين البيانات الواردة من milvus_A. في هذا المثال، اضبطه على <code translate="no">files</code>.</p></li>
<li><p><code translate="no">minio.backupBucketName</code>: اسم الحاوية المستخدمة لتخزين النسخ الاحتياطية. في هذا المثال، اضبطه على <code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.backupRootPath</code>: المسار الجذري داخل الباكيت المخصص لتخزين ملفات النسخ الاحتياطي في <code translate="no">milvus_B</code>. في هذا المثال، اضبطه على <code translate="no">backup</code>.</p></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">الخطوة 3: إنشاء نسخة احتياطية<button data-href="#Step-3-Create-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>بمجرد حفظ ملف backup.yaml، قم بإنشاء نسخة احتياطية باسم <code translate="no">my_backup</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>يُنشئ هذا الأمر النسخة الاحتياطية <code translate="no">bucket_A/backup/my_backup</code> في مخزن الكائنات <code translate="no">milvus_A</code>.</p>
<h2 id="Manually-transfer-the-backup-to-milvusB" class="common-anchor-header">انقل النسخة الاحتياطية يدويًّا إلى milvus_B<button data-href="#Manually-transfer-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><p>نظرًا لأن <code translate="no">milvus_A</code> و <code translate="no">milvus_B</code> يستخدمان تخزين كائنات مختلفين، فأنت بحاجة إلى
تنزيل النسخة الاحتياطية يدويًّا من تخزين milvus_A وتحميلها إلى
تخزين<code translate="no">milvus_B</code>.</p>
<p><strong>استخدام وحدة التحكم MinIO</strong></p>
<ol>
<li><p>قم بتسجيل الدخول إلى وحدة تحكم MinIO.</p></li>
<li><p>حدد موقع الحاوية المحددة في minio.address لـ milvus_A.</p></li>
<li><p>حدد ملفات النسخ الاحتياطي الموجودة في الحاوية.</p></li>
<li><p>انقر على <strong>«تنزيل»</strong> لتنزيل الملفات إلى جهازك.</p></li>
</ol>
<p><strong>استخدام عميل mc</strong></p>
<p>بدلاً من ذلك، يمكنك استخدام <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">عميل mc
</a> لتنزيل ملفات النسخ الاحتياطي:</p>
<ol>
<li>تكوين مضيف MinIO:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>عرض قائمة السلال المتاحة:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>تنزيل دلو بشكل متكرر:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد تنزيل ملفات النسخ الاحتياطي، يمكنك تحميلها إلى
مخزن الكائنات الذي يستخدمه <code translate="no">milvus_B</code> لاستعادتها في المستقبل. أو بدلاً من ذلك، يمكنك
تحميل النسخة الاحتياطية إلى <a href="https://cloud.zilliz.com/">Zilliz Cloud</a> لإنشاء
قاعدة بيانات متجهات مُدارة تحتوي على بياناتك. لمزيد من التفاصيل، راجع " <a href="https://zilliz.com/doc/migrate_from_milvus-2x">الترحيل
من Milvus إلى Zilliz
Cloud</a>".</p>
<h2 id="Restore-from-the-backup-to-milvusB" class="common-anchor-header">الاستعادة من النسخة الاحتياطية إلى milvus_B<button data-href="#Restore-from-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Configure-restoration-settings" class="common-anchor-header">الخطوة 1: تكوين إعدادات الاستعادة<button data-href="#Step-1-Configure-restoration-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>كرر الخطوة
2 لتعديل التكوينات الخاصة بالاستعادة إلى <code translate="no">milvus_B</code> ، مع التأكد من ضبط <code translate="no">minio.bucketName</code> على <code translate="no">bucket_B</code>.</p>
<p>فيما يلي مثال على التكوين:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_B</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  <span class="hljs-attr">tlsMode:</span> <span class="hljs-number">0</span>
  <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;root&quot;</span>
  <span class="hljs-attr">password:</span> <span class="hljs-string">&quot;Milvus&quot;</span>
  
<span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  <span class="hljs-attr">storageType:</span> <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  <span class="hljs-attr">address:</span> <span class="hljs-string">minio_B</span> <span class="hljs-comment"># Address of MinIO/S3</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">iamEndpoint:</span> <span class="hljs-string">&quot;&quot;</span>
  
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">&quot;files&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># Backup storage credentials</span>
  <span class="hljs-attr">backupAccessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">backupSecretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  <span class="hljs-attr">backupBucketName:</span> <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  <span class="hljs-attr">backupRootPath:</span> <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Restore-from-the-backup" class="common-anchor-header">الخطوة 2: الاستعادة من النسخة الاحتياطية<button data-href="#Step-2-Restore-from-the-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>استعادة النسخة الاحتياطية إلى <code translate="no">milvus_B</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>يستعيد هذا الأمر النسخة الاحتياطية إلى مجموعة جديدة باسم coll_bak في
<code translate="no">milvus_B</code> ، باستخدام جذر التخزين المُهيأ للمثيل الهدف <code translate="no">bucket_B/files</code> ضمن تخزين الكائنات الخاص بـ <code translate="no">milvus_B</code>.</p>
<p>في النسخة 0.5.16 من Backup، يقوم الخيار <code translate="no">-c</code> الذي تم إهماله بتحديد اسم المجموعة في النسخة الاحتياطية، قبل تطبيق <code translate="no">_bak</code>. أما البديل <code translate="no">--filter</code> في الإصدار 0.6.0 فيستخدم اسم الهدف بدلاً من ذلك؛ انظر <a href="/docs/ar/milvus_backup_upgrade.md#Update-CLI-commands">تحديث أوامر واجهة سطر الأوامر (CLI)</a>.</p>
<p>بعد الاستعادة، تأكد من وجود <code translate="no">coll_bak</code> ، وأنشئ فهرس متجه مناسبًا إذا لزم الأمر، وقارن عدد الكيانات والقيم التمثيلية ونتائج البحث مع خط الأساس الذي تم تسجيله قبل النسخ الاحتياطي. لا يكفي نجاح الأمر وحده للتحقق من صحة البيانات.</p>
