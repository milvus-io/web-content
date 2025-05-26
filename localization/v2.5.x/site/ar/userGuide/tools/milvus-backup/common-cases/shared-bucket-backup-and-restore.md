---
id: shared-bucket-backup-and-restore.md
summary: >-
  يشرح هذا الموضوع بالتفصيل عملية النسخ الاحتياطي لمجموعة من مثيل Milvus
  واستعادتها إلى مثيل آخر أثناء استخدام دلو مشترك لتخزين الكائنات
title: الترحيل بين المثيلات في دلو واحد (مسارات جذر مختلفة)
---
<h1 id="Migrate-Between-Instances-in-One-Bucket-Different-Root-Paths" class="common-anchor-header">الترحيل بين المثيلات في دلو واحد (مسارات جذر مختلفة)<button data-href="#Migrate-Between-Instances-in-One-Bucket-Different-Root-Paths" class="anchor-icon" translate="no">
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
    </button></h1><p>يوضح هذا الموضوع بالتفصيل عملية النسخ الاحتياطي لمجموعة من مثيل Milvus واستعادتها إلى مثيل آخر أثناء استخدام دلو مشترك لتخزين الكائنات، مع وجود مسارات جذر مختلفة لكل مثيل.</p>
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
    </button></h2><p>يوضح الرسم البياني أدناه عملية النسخ الاحتياطي والاستعادة باستخدام دلو مشترك.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/shared-bucket-backup-and-restore.png" alt="shared-bucket-backup-and-restore.png" class="doc-image" id="shared-bucket-backup-and-restore.png" />
   </span> <span class="img-wrapper"> <span>دلو مشترك للنسخ الاحتياطي والاستعادة. png</span> </span></p>
<p>لنفترض أن لدينا مثيلات Milvus، <code translate="no">milvus_A</code> و <code translate="no">milvus_B</code> ، وكلاهما يستخدم محرك التخزين الافتراضي MinIO لتخزين الكائنات. يشترك هذان المثيلان في نفس الدلو، <code translate="no">bucket_A</code> ، ولكنهما يخزنان بياناتهما في مسارات جذر مختلفة: <code translate="no">files_A</code> ل <code translate="no">milvus_A</code> والملفات_B ل <code translate="no">milvus_B</code>. في هذا المثال، هدفنا هو إكمال المهام التالية:</p>
<ol>
<li><p>إنشاء نسخة احتياطية (my_backup) للمجموعة coll المخزنة تحت مسار<code translate="no">files_A</code> لـ <code translate="no">milvus_A</code>.</p></li>
<li><p>الاستعادة من النسخة الاحتياطية وتخزينها في files_B لـ <code translate="no">milvus_B</code>.</p></li>
</ol>
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
<li><p>تأكد من تثبيت أداة النسخ <strong>الاحتياطي Milvus-backup</strong>.</p></li>
<li><p>تعرف على تكوين إعدادات تخزين كائنات Milvus. للحصول على التفاصيل، راجع <a href="https://milvus.io/docs/deploy_s3.md">تخزين الكائنات</a>.</p></li>
</ul>
<h2 id="Back-up-a-collection-from-milvusA" class="common-anchor-header">قم بعمل نسخة احتياطية من مجموعة من <code translate="no">milvus_A</code><button data-href="#Back-up-a-collection-from-milvusA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">الخطوة 1: إعداد التكوين</h3><p>انتقل إلى دليل مشروع milvus-backup وأنشئ دليلاً باسم التكوينات:</p>
<pre><code translate="no" class="language-shell">mkdir configs
cd configs
<button class="copy-code-btn"></button></code></pre>
<p>قم بتنزيل ملف التكوين الاحتياطي backup.yaml:</p>
<pre><code translate="no" class="language-shell">wget https://raw.githubusercontent.com/zilliztech/milvus-backup/main/configs/backup.yaml
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
<li><p><code translate="no">milvus.address</code>: عنوان IP أو اسم المضيف للخادم <code translate="no">milvus_A</code>.</p></li>
<li><p><code translate="no">milvus.port</code>: منفذ TCP الذي يستمع إليه خادم ميلفوس (الافتراضي 19530).</p></li>
</ul></li>
<li><p>تكوينات التخزين (إعدادات MinIO/S3)</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  <span class="hljs-attr">storageType:</span> <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_A</span> <span class="hljs-comment"># Address of MinIO/S3</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">iamEndpoint:</span> <span class="hljs-string">&quot;&quot;</span>
  
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">&quot;files_A&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># only for azure</span>
  <span class="hljs-attr">backupAccessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">backupSecretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  <span class="hljs-attr">backupBucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  <span class="hljs-attr">backupRootPath:</span> <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">minio.bucketName</code>: اسم الدلو المستخدم للتخزين <code translate="no">milvus_A</code>. في هذا المثال، اضبط على <code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.rootPath</code>: المسار الجذر داخل الدلو حيث يتم تخزين البيانات من <code translate="no">milvus_A</code>. في هذا المثال، تم التعيين إلى <code translate="no">files_A</code>.</p></li>
<li><p><code translate="no">minio.backupBucketName</code>: اسم الدلو المستخدم للتخزين. في هذا المثال، <code translate="no">milvus_A</code> و <code translate="no">milvus_B</code> يشتركان في الدلو. لذلك، قم بالتعيين إلى<code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.backupRootPath</code>: المسار الجذر داخل الدلو المخصص لتخزين ملفات النسخ الاحتياطي في <code translate="no">milvus_B</code>. في هذا المثال، استخدم مسارًا مختلفًا عن <code translate="no">milvus_A</code>. لذلك، قم بالتعيين إلى <code translate="no">backup</code>.</p></li>
</ul></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">الخطوة 3: إنشاء نسخة احتياطية</h3><p>بمجرد حفظ <code translate="no">backup.yaml</code> ، قم بإنشاء نسخة احتياطية باسم my_backup:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>يقوم هذا الأمر بإنشاء نسخة احتياطية <code translate="no">bucket_A/backup/my_backup</code> في مخزن الكائنات للمجموعة <code translate="no">coll</code>.</p>
<h2 id="Restore-the-backup-to-milvusB" class="common-anchor-header">استعادة النسخة الاحتياطية إلى <code translate="no">milvus_B</code><button data-href="#Restore-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Configure-restoration-settings" class="common-anchor-header">الخطوة 1: تكوين إعدادات الاستعادة</h3><p>كرر الخطوة 2 لتعديل التكوينات للاستعادة إلى <code translate="no">milvus_B</code> ، مع التأكد من تعيين <code translate="no">minio.bucketName</code> إلى <code translate="no">bucket_A</code> و <code translate="no">minio.rootPath</code> إلى <code translate="no">files_B</code> لتمييز مواقع التخزين بين المثيلين.</p>
<p>إليك نموذج تهيئة</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
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
  
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_B</span> <span class="hljs-comment"># Address of MinIO/S3</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">iamEndpoint:</span> <span class="hljs-string">&quot;&quot;</span>
  
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">&quot;files_B&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Restore-backup" class="common-anchor-header">الخطوة 2: استعادة النسخة الاحتياطية</h3><p>استعادة النسخة الاحتياطية إلى <code translate="no">milvus_B</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>يستعيد هذا الأمر النسخة الاحتياطية إلى مجموعة جديدة باسم <code translate="no">coll_bak</code> في <code translate="no">milvus_B</code> ، مع تخزين البيانات في <code translate="no">bucket_A/files_B/insert_log/[ID of new collection]</code>.</p>
