---
id: milvus_backup_cli.md
summary: تعلم كيفية استخدام Milvus Backup من خلال CLI
title: النسخ الاحتياطي واستعادة البيانات باستخدام الأوامر
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">النسخ الاحتياطي واستعادة البيانات باستخدام الأوامر<button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر برنامج Milvus Backup ميزات النسخ الاحتياطي للبيانات واستعادتها لضمان أمان بيانات Milvus الخاصة بك.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">الحصول على النسخ الاحتياطي لميلفوس<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك إما تنزيل النسخة الثنائية المجمعة أو الإنشاء من المصدر.</p>
<p>لتنزيل الإصدار الثنائي المترجم، انتقل إلى صفحة <a href="https://github.com/zilliztech/milvus-backup/releases">الإصدار،</a> حيث يمكنك العثور على جميع الإصدارات الرسمية. تذكر، استخدم دائمًا الثنائيات الموجودة في الإصدار الذي يحمل علامة <strong>الأحدث</strong>.</p>
<p>للتجميع من المصدر، قم بما يلي:</p>
<pre><code translate="no" class="language-shell">git clone git@github.com:zilliztech/milvus-backup.git
go get
go build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-configuration-file" class="common-anchor-header">إعداد ملف التكوين<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتنزيل <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/master/configs/backup.yaml">ملف التكوين النموذجي</a> وقم بتخصيصه ليناسب احتياجاتك.</p>
<p>ثم قم بإنشاء مجلد إلى جانب الإصدار الثنائي الذي تم تنزيله أو إنشاؤه من Milvus Backup، وقم بتسمية المجلد <code translate="no">configs</code> ، وضع ملف التكوين داخل المجلد <code translate="no">configs</code>.</p>
<p>يجب أن تكون بنية مجلدك مشابهة لما يلي:</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>نظرًا لأن ملف Milvus Backup لا يمكنه نسخ بياناتك احتياطيًا إلى مسار محلي، تأكد من صحة إعدادات Minio عند تخصيص ملف التكوين.</p>
<div class="alert note">
<p>يختلف اسم دلو Minio الافتراضي باختلاف طريقة تثبيت Milvus. عند إجراء تغييرات على إعدادات Minio، قم بالرجوع إلى الجدول التالي.</p>
<table>
<thead>
<tr><th>الحقل</th><th>دلو الإرساء</th><th>هيلم / مشغل ميلفوس</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>دلو</td><td>ميلفوس-الدلو</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>الملفات</td><td>ملف</td></tr>
</tbody>
</table>
</div>
<h2 id="Prepare-data" class="common-anchor-header">إعداد البيانات<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>إذا قمت بتشغيل مثيل Milvus محلي فارغ في المنفذ الافتراضي، استخدم مثال البرامج النصية Python لإنشاء بعض البيانات في مثيلك. لا تتردد في إجراء التغييرات اللازمة على البرامج النصية لتناسب احتياجاتك.</p>
<p>احصل على <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/main/example/prepare_data.py">البرامج</a> النصية. ثم قم بتشغيل البرامج النصية لإنشاء البيانات. تأكّد من تثبيت <a href="https://pypi.org/project/pymilvus/">PyMilvus،</a> وهي مجموعة أدوات تطوير البرمجة الرسمية لـ Milvus Python SDK.</p>
<pre><code translate="no" class="language-shell">python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>هذه الخطوة اختيارية. إذا تخطيت هذه الخطوة، تأكد من أن لديك بالفعل بعض البيانات في مثيل Milvus الخاص بك.</p>
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
    </button></h2><p>لاحظ أن تشغيل النسخ الاحتياطي لـ Milvus Backup على مثيل Milvus لن يؤثر عادةً على تشغيل المثيل. يعمل مثيل Milvus الخاص بك بشكل كامل أثناء النسخ الاحتياطي أو الاستعادة.</p>
<div class="tab-wrapper"></div>
<p>قم بتشغيل الأمر التالي لإنشاء نسخة احتياطية.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n &lt;backup_name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد تنفيذ الأمر، يمكنك التحقق من ملفات النسخ الاحتياطي في الدلو المحدد في إعدادات Minio. على وجه التحديد، يمكنك تنزيلها باستخدام <strong>Minio Console</strong> أو عميل <strong>mc</strong>.</p>
<p>للتنزيل من Minio <a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">Console،</a> قم بتسجيل الدخول إلى Minio Console، وحدد موقع الدلو المحدد في <code translate="no">minio.address</code> ، وحدد الملفات الموجودة في الدلو، وانقر فوق <strong>تنزيل</strong> لتنزيلها.</p>
<p>إذا كنت تفضل <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">عميل mc،</a> فقم بما يلي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>الآن، يمكنك حفظ ملفات النسخ الاحتياطية في مكان آمن لاستعادتها في المستقبل، أو تحميلها إلى <a href="https://cloud.zilliz.com">Zilliz Cloud</a> لإنشاء قاعدة بيانات متجهة مُدارة ببياناتك. لمزيد من التفاصيل، راجع <a href="https://zilliz.com/doc/migrate_from_milvus-2x">الترحيل من ميلفوس إلى زيليز كلاود</a>.</p>
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
<p>يمكنك تشغيل الأمر <code translate="no">restore</code> باستخدام العلامة <code translate="no">-s</code> لإنشاء مجموعة جديدة من خلال استعادة البيانات من النسخة الاحتياطية:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p>تسمح لك العلامة <code translate="no">-s</code> بتعيين لاحقة للمجموعة الجديدة المراد إنشاؤها. سيُنشئ الأمر أعلاه مجموعة جديدة تسمى <strong>hello_milvus_recover</strong> في مثيل Milvus الخاص بك.</p>
<p>إذا كنت تفضل استعادة المجموعة التي تم نسخها احتياطيًا دون تغيير اسمها، فقم بإسقاط المجموعة قبل استعادتها من النسخة الاحتياطية. يمكنك الآن تنظيف البيانات التي تم إنشاؤها في <a href="#Prepare-data">إعداد البيانات</a> عن طريق تشغيل الأمر التالي.</p>
<pre><code translate="no" class="language-shell">python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>ثم قم بتشغيل الأمر التالي لاستعادة البيانات من النسخة الاحتياطية.</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>بمجرد اكتمال الاستعادة، يمكنك التحقق من البيانات المستعادة عن طريق فهرسة المجموعة المستعادة على النحو التالي:</p>
<pre><code translate="no" class="language-shell">python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>لاحظ أن البرنامج النصي أعلاه يفترض أنك قمت بتشغيل الأمر <code translate="no">restore</code> مع العلم <code translate="no">-s</code> وتعيين اللاحقة على <code translate="no">-recover</code>. لا تتردد في إجراء التغييرات اللازمة على البرنامج النصي لتناسب حاجتك.</p>
