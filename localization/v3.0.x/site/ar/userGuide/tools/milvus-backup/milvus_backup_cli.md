---
id: milvus_backup_cli.md
summary: تعرف على كيفية استخدام Milvus Backup عبر واجهة سطر الأوامر (CLI)
title: >-
  النسخ الاحتياطي واستعادة البيانات باستخدام الأوامرCompatible with Milvus
  Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">النسخ الاحتياطي واستعادة البيانات باستخدام الأوامر<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
<p>يوفر Milvus Backup ميزات النسخ الاحتياطي واستعادة البيانات لضمان أمان بيانات Milvus الخاصة بك.</p>
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
    </button></h2><p>يمكنك إما تنزيل الملف الثنائي المُجمَّع أو إنشاءه من المصدر.</p>
<p>قم بتنزيل الملف الثنائي المناسب لنظام التشغيل والبنية الخاصة بك من <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16">الإصدار 0.5.16</a>. استخدم التكوين والأمثلة المطابقة للإصدار 0.5.16 الموجودة في هذه الصفحة.</p>
<p>لبناء الإصدار 0.5.16 من المصدر، قم بتثبيت Go 1.25 أو أحدث وقم بتشغيل:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.5.16 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>قم بتنزيل <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml">ملف التكوين النموذجي</a> وقم بتعديله ليتناسب مع احتياجاتك.</p>
<p>ثم أنشئ مجلدًا بجانب الملف الثنائي لـ Milvus Backup الذي تم تنزيله أو بنائه، واسمي المجلد <code translate="no">configs</code> ، وضع ملف التكوين داخل مجلد <code translate="no">configs</code>.</p>
<p>يجب أن تكون بنية المجلدات لديك مشابهة لما يلي:</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>يستخدم هذا المثال MinIO لتخزين النسخ الاحتياطي. اضبط ملف <code translate="no">minio.*</code> ليتوافق مع تخزين Milvus ووجهة النسخ الاحتياطي، بما في ذلك العناوين وبيانات الاعتماد وأسماء الباكيت ومسارات الجذر.</p>
<div class="alert note">
<p>يختلف اسم حاوية Minio الافتراضية باختلاف طريقة تثبيت Milvus. عند إجراء تغييرات على إعدادات Minio، يرجى الرجوع إلى الجدول التالي.</p>
<table>
<thead>
<tr><th>الحقل</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>الملفات</td><td>ملف</td></tr>
</tbody>
</table>
</div>
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
    </button></h2><p>إذا كنت تقوم بتشغيل مثيل Milvus محلي فارغ على المنفذ الافتراضي، فاستخدم نماذج البرامج النصية لـ Python لتوليد بعض البيانات في مثيلك. لا تتردد في إجراء التغييرات اللازمة على البرامج النصية لتناسب احتياجاتك.</p>
<p>احصل على <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">البرامج النصية</a>. ثم قم بتشغيلها لإنشاء البيانات. تأكد من تثبيت <a href="https://pypi.org/project/pymilvus/">PyMilvus،</a> وهو SDK Python الرسمي لـ Milvus.</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>هذه الخطوة اختيارية. إذا تخطيت هذه الخطوة، فتأكد من وجود بعض البيانات بالفعل في مثيل Milvus الخاص بك.</p>
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
    </button></h2><p>لاحظ أن تشغيل Milvus Backup على مثيل Milvus لن يؤثر عادةً على تشغيل المثيل. يظل مثيل Milvus الخاص بك يعمل بكامل طاقته أثناء النسخ الاحتياطي أو الاستعادة.</p>
<div class="tab-wrapper"></div>
<p>قم بتشغيل الأمر التالي لإنشاء نسخة احتياطية.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد تنفيذ الأمر، يمكنك التحقق من ملفات النسخ الاحتياطي في الحاوية المحددة في إعدادات Minio. على وجه التحديد، يمكنك تنزيلها باستخدام <strong>Minio Console</strong> أو عميل <strong>mc</strong>.</p>
<p>للتنزيل من <a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">Minio Console،</a> قم بتسجيل الدخول إلى Minio Console، وحدد السلة المحددة في <code translate="no">minio.backupBucketName</code> ، وحدد الملفات الموجودة في السلة، وانقر فوق <strong>«تنزيل»</strong> لتنزيلها.</p>
<p>إذا كنت تفضل <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">عميل mc</a>، فاتبع الخطوات التالية:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>الآن، يمكنك حفظ ملفات النسخ الاحتياطي في مكان آمن لاستعادتها في المستقبل، أو تحميلها إلى <a href="https://cloud.zilliz.com">Zilliz Cloud</a> لإنشاء قاعدة بيانات متجهة مُدارة تحتوي على بياناتك. لمزيد من التفاصيل، راجع <a href="https://zilliz.com/doc/migrate_from_milvus-2x">«الترحيل من Milvus إلى Zilliz Cloud</a>».</p>
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
    </button></h2><div class="tab-wrapper"></div>
<p>يمكنك تشغيل الأمر <code translate="no">restore</code> مع العلامة <code translate="no">-s</code> لإنشاء مجموعة جديدة عن طريق استعادة البيانات من النسخة الاحتياطية:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p>تسمح لك العلامة <code translate="no">-s</code> بتعيين لاحقة للمجموعة الجديدة المراد إنشاؤها. سيؤدي الأمر أعلاه إلى إنشاء مجموعة جديدة تسمى <strong>hello_milvus_recover</strong> في مثيل Milvus الخاص بك.</p>
<p>إذا كنت تفضل استعادة المجموعة التي تم نسخها احتياطيًا دون تغيير اسمها، فقم بإزالة المجموعة قبل استعادتها من النسخة الاحتياطية. يمكنك الآن تنظيف البيانات التي تم إنشاؤها في " <a href="#Prepare-data">تحضير البيانات</a> " عن طريق تشغيل الأمر التالي.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>ثم قم بتشغيل الأمر التالي لاستعادة البيانات من النسخة الاحتياطية.</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>بالنسبة لبيانات العينة القابلة للتخلص منها التي تم إنشاؤها أعلاه، يقوم البرنامج النصي المنبع بفهرسة واستعلام <code translate="no">hello_milvus_recover</code> و <code translate="no">hello_milvus2_recover</code> ، ثم <strong>يحذف كلا المجموعتين المستعادتين</strong>. قم بتشغيله فقط بعد استعادة كلتا مجموعتي العينة باستخدام <code translate="no">_recover</code>. بالنسبة لبياناتك الخاصة، قارنها بخط الأساس الخاص بوقت النسخ الاحتياطي دون استخدام هذا البرنامج النصي للتنظيف.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/verify_data.py -o example/verify_data.py
python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>لاحظ أن البرنامج النصي أعلاه يفترض أنك قد قمت بتشغيل الأمر <code translate="no">restore</code> مع العلامة <code translate="no">-s</code> وأن اللاحقة مضبوطة على <code translate="no">_recover</code>. لا تتردد في إجراء التغييرات اللازمة على البرنامج النصي لتناسب احتياجاتك.</p>
