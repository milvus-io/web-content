---
id: cross-bucket-backup-and-restore.md
summary: >-
  يشرح هذا الموضوع بالتفصيل عملية النسخ الاحتياطي لمجموعة من مجموعة من مثيل
  Milvus واستعادتها إلى مثيل آخر
title: الترحيل بين المثيلات عبر الدلاء
---
<h1 id="Migrate-Between-Instances-Across-Buckets" class="common-anchor-header">الترحيل بين المثيلات عبر الدلاء<button data-href="#Migrate-Between-Instances-Across-Buckets" class="anchor-icon" translate="no">
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
    </button></h1><p>يوضح هذا الموضوع بالتفصيل عملية النسخ الاحتياطي لمجموعة من مثيل Milvus واستعادتها إلى مثيل آخر، مع استخدام كل مثيل دلاء مختلفة داخل نفس مخزن الكائنات.</p>
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
    </button></h2><p>يوضح الرسم البياني أدناه عملية النسخ الاحتياطي والاستعادة باستخدام دلاء مختلفة داخل نفس وحدة تخزين الكائنات.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cross-bucket-backup-and-restore.png" alt="cross-bucket-backup-and-restore.png" class="doc-image" id="cross-bucket-backup-and-restore.png" />
   </span> <span class="img-wrapper"> <span>النسخ الاحتياطي والاستعادة عبر الدلو. png</span> </span></p>
<p>لنفترض أن لدينا مثيلين من Milvus، <code translate="no">milvus_A</code> و <code translate="no">milvus_B</code> ، وكلاهما يستخدم محرك التخزين الافتراضي MinIO لتخزين الكائنات. تستخدم هاتان المثيلتان دلاء مختلفة الدلو_A و <code translate="no">bucket_B</code> داخل نفس مخزن الكائنات. في هذا المثال، هدفنا هو إكمال المهام التالية:</p>
<ol>
<li><p>إنشاء نسخة احتياطية (<code translate="no">my_backup</code>) للمجموعة <code translate="no">coll</code> في <code translate="no">bucket_A</code> وتخزين النسخة الاحتياطية في <code translate="no">bucket_B</code>.</p></li>
<li><p>في <code translate="no">bucket_B</code> ، الاستعادة من النسخة الاحتياطية وتسمية المجموعة المستعادة <code translate="no">coll_bak</code>.</p></li>
</ol>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية**<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>تأكد من تثبيت أداة النسخ <strong>الاحتياطي Milvus-backup</strong>.</p></li>
<li><p>تعرف على تكوين إعدادات تخزين كائنات ميلفوس. للحصول على التفاصيل، راجع <a href="https://milvus.io/docs/deploy_s3.md">تخزين الكائنات</a>.</p></li>
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">الخطوة 1: إعداد التكوين</h3><p>انتقل إلى دليل مشروع النسخ الاحتياطي لـ milvus-backup وأنشئ دليلاً باسم التكوينات:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">mkdir</span> configs
<span class="hljs-built_in">cd</span> configs
<button class="copy-code-btn"></button></code></pre>
<p>قم بتنزيل ملف التكوين الاحتياطي <code translate="no">backup.yaml</code>:</p>
<pre><code translate="no" class="language-shell">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-backup/main/configs/backup.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>تبدو بنية الملف هكذا:</p>
<pre><code translate="no">├── configs
│   └── backup.yaml
├── milvus-backup
└── README.md
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Edit-configuration-file" class="common-anchor-header">الخطوة 2: تحرير ملف التكوين</h3><p>قم بتعديل ملف backup.yaml لتعيين التكوينات المناسبة لـ<code translate="no">milvus_A</code>:</p>
<ul>
<li><p>تكوينات الاتصال</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
milvus:
  address: milvus_A
  port: <span class="hljs-number">19530</span>
  authorizationEnabled: false
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  tlsMode: <span class="hljs-number">0</span>
  user: <span class="hljs-string">&quot;root&quot;</span>
  password: <span class="hljs-string">&quot;Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">milvus.address</code>: عنوان IP أو اسم المضيف للخادم <code translate="no">milvus_A</code>.</p></li>
<li><p><code translate="no">milvus.port</code>: منفذ TCP الذي يستمع إليه خادم ميلفوس (الافتراضي 19530).</p></li>
</ul></li>
<li><p>تكوينات التخزين (إعدادات MinIO/S3)</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
minio:
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  storageType: <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  address: localhost <span class="hljs-comment"># Address of MinIO/S3</span>
  port: <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  accessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  secretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  useSSL: false <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  useIAM: false
  iamEndpoint: <span class="hljs-string">&quot;&quot;</span>
  
  bucketName: <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  rootPath: <span class="hljs-string">&quot;files&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># only for azure</span>
  backupAccessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  backupSecretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  backupBucketName: <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  backupRootPath: <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">minio.bucketName</code>: اسم الدلو المستخدم لتخزين البيانات في <code translate="no">milvus_A</code>. في هذا المثال، تم تعيينه إلى <code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.rootPath</code>: المسار الجذر داخل الدلو حيث يتم تخزين البيانات من <code translate="no">milvus_A</code>. في هذا المثال، تم التعيين إلى <code translate="no">files</code>.</p></li>
<li><p><code translate="no">minio.backupBucketName</code>: اسم الدلو المستخدم للتخزين الاحتياطي في<code translate="no">milvus_B</code>. في هذا المثال، يستخدم <code translate="no">milvus_A</code> و <code translate="no">milvus_B</code> دلاء مختلفة. لذلك، قم بالتعيين إلى <code translate="no">bucket_B</code>.</p></li>
<li><p><code translate="no">minio.backupRootPath</code>: المسار الجذر داخل الدلو المخصص لتخزين ملفات النسخ الاحتياطي في <code translate="no">milvus_B</code>. في هذا المثال، اضبط على <code translate="no">backup</code>.</p></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">الخطوة 3: إنشاء نسخة احتياطية</h3><p>بمجرد حفظ backup.yaml، قم بإنشاء نسخة احتياطية باسم <code translate="no">my_backup</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>ينشئ هذا الأمر النسخة الاحتياطية <code translate="no">bucket_B/backup/my_backup</code> في تخزين الكائنات للمجموعة coll.</p>
<h2 id="Restore-the-backup-to-milvusB" class="common-anchor-header">استعادة النسخة الاحتياطية إلى milvus_B<button data-href="#Restore-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Configure-restoration-settings" class="common-anchor-header">الخطوة 1: تكوين إعدادات الاستعادة</h3><p>كرر الخطوة 2 لتعديل التكوينات للاستعادة إلى <code translate="no">milvus_B</code> ، مع التأكد من ضبط <code translate="no">minio.bucketName</code> على <code translate="no">bucket_B</code>.</p>
<p>إليك نموذج تكوين</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
milvus:
  address: milvus_B
  port: <span class="hljs-number">19530</span>
  authorizationEnabled: false
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  tlsMode: <span class="hljs-number">0</span>
  user: <span class="hljs-string">&quot;root&quot;</span>
  password: <span class="hljs-string">&quot;Milvus&quot;</span>
  
<span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
minio:
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  storageType: <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  address: localhost <span class="hljs-comment"># Address of MinIO/S3</span>
  port: <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  accessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  secretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  useSSL: false <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  useIAM: false
  iamEndpoint: <span class="hljs-string">&quot;&quot;</span>
  
  bucketName: <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  rootPath: <span class="hljs-string">&quot;files&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># only for azure</span>
  backupAccessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  backupSecretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  backupBucketName: <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  backupRootPath: <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
...
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Restore-backup" class="common-anchor-header">الخطوة 2: استعادة النسخة الاحتياطية</h3><p>استعادة النسخة الاحتياطية إلى <code translate="no">milvus_B</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>يستعيد هذا الأمر النسخة الاحتياطية إلى مجموعة جديدة باسم <code translate="no">coll_bak</code> في <code translate="no">milvus_B</code> ، مع تخزين البيانات في <code translate="no">bucket_B/files/insert_log/[ID of new collection]</code>.</p>
