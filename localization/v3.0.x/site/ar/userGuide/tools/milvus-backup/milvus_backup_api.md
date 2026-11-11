---
id: milvus_backup_api.md
summary: تعرف على كيفية استخدام Milvus Backup عبر واجهة برمجة التطبيقات (API)
title: >-
  النسخ الاحتياطي واستعادة البيانات باستخدام واجهات برمجة التطبيقات
  (API)Compatible with Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">النسخ الاحتياطي واستعادة البيانات باستخدام واجهات برمجة التطبيقات (API)<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>للاطلاع على سير العمل الحالي، راجع <a href="/docs/ar/milvus_backup_0_6_api.md">دليل واجهة برمجة التطبيقات (HTTP API)</a> أو <a href="/docs/ar/milvus_backup_upgrade.md">قم بالترقية من الإصدار 0.5.x</a>. تحقق من <a href="/docs/ar/milvus_backup_overview.md#Compatibility-matrix">مصفوفة التوافق</a> لمعرفة إصدارات خادم Milvus المدعومة.</p>
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
<p>ثم أنشئ مجلدًا بجانب الملف الثنائي لـ Milvus Backup الذي تم تنزيله أو بنائه، واسمِ المجلد <code translate="no">configs</code> ، وضع ملف التكوين داخل المجلد <code translate="no">configs</code>.</p>
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
<h2 id="Start-up-the-API-server" class="common-anchor-header">تشغيل خادم واجهة برمجة التطبيقات (API)<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>ثم يمكنك تشغيل خادم واجهة برمجة التطبيقات (API) على النحو التالي:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server
<button class="copy-code-btn"></button></code></pre>
<p>يستمع خادم واجهة برمجة التطبيقات (API) على المنفذ 8080 بشكل افتراضي. يمكنك تغيير ذلك عن طريق تشغيله باستخدام العلامة <code translate="no">-p</code>. لبدء تشغيل خادم واجهة برمجة التطبيقات (API) على المنفذ 443، اتبع الخطوات التالية:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك الوصول إلى واجهة مستخدم Swagger باستخدام http://localhost:<port>/api/v1/docs/index.html.</p>
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
    </button></h2><p>إذا كنت تقوم بتشغيل مثيل Milvus محلي فارغ يستمع على المنفذ الافتراضي 19530، فاستخدم نماذج البرامج النصية لـ Python لتوليد بعض البيانات في مثيلك. لا تتردد في إجراء التغييرات اللازمة على البرامج النصية لتناسب احتياجاتك.</p>
<p>احصل على <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">البرامج النصية</a>. ثم قم بتشغيل البرامج النصية لإنشاء البيانات. تأكد من تثبيت <a href="https://pypi.org/project/pymilvus/">PyMilvus، وهو</a> SDK Python الرسمي لـ Milvus.</p>
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
    </button></h2><div class="tab-wrapper"></div>
<p>لاحظ أن تشغيل Milvus Backup على مثيل Milvus لن يؤثر عادةً على تشغيل المثيل. يظل مثيل Milvus الخاص بك يعمل بكامل طاقته أثناء النسخ الاحتياطي أو الاستعادة.</p>
<p>قم بتشغيل الأمر التالي لإنشاء نسخة احتياطية. قم بتغيير <code translate="no">collection_names</code> و <code translate="no">backup_name</code> إذا لزم الأمر.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
  &quot;async&quot;: true,
  &quot;backup_name&quot;: &quot;my_backup&quot;,
  &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ]
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>طلب الإنشاء غير متزامن. قم باستقصاء <code translate="no">get_backup</code> باستخدام <code translate="no">requestId</code> الذي تم إرجاعه كـ <code translate="no">backup_id</code> وانتظر حتى يصبح <code translate="no">data.state_code</code> هو <code translate="no">2</code> قبل الاستعادة.</p>
<p>يمكنك سرد النسخ الاحتياطية الموجودة في الحاوية المحددة في إعدادات Minio على النحو التالي:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/list&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>استرجع بيانات تعريف النسخة الاحتياطية على النحو التالي:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>استبدل <code translate="no">backup_id</code> و <code translate="no">backup_name</code> بالقيم الخاصة بنسختك الاحتياطية. تعرض نقطة النهاية هذه بيانات تعريف JSON، وليس ملفات النسخ الاحتياطي. انسخ دليل النسخ الاحتياطي بالكامل من تخزين الكائنات عند أرشفته.</p>
<p>الآن، يمكنك حفظ ملفات النسخ الاحتياطي في مكان آمن لاستعادتها في المستقبل، أو تحميلها إلى <a href="https://cloud.zilliz.com">Zilliz Cloud</a> لإنشاء قاعدة بيانات متجهات مُدارة تحتوي على بياناتك. لمزيد من التفاصيل، راجع <a href="https://zilliz.com/doc/migrate_from_milvus-2x">«الترحيل من Milvus إلى Zilliz Cloud</a>».</p>
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
<p>يمكنك استدعاء أمر واجهة برمجة التطبيقات (API) للاستعادة باستخدام خيار « <code translate="no">collection_suffix</code> » لإنشاء مجموعة جديدة عن طريق استعادة البيانات من النسخة الاحتياطية. قم بتغيير « <code translate="no">collection_names</code> » و« <code translate="no">backup_name</code> » إذا لزم الأمر.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;_recover&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>يتيح لك الخيار <code translate="no">collection_suffix</code> تعيين لاحقة للمجموعة الجديدة المراد إنشاؤها. سيؤدي الأمر أعلاه إلى إنشاء مجموعة جديدة باسم <strong>hello_milvus_recover</strong> في مثيل Milvus الخاص بك.</p>
<p>إذا كنت تفضل استعادة المجموعة التي تم نسخها احتياطيًا دون تغيير اسمها، فقم بحذف المجموعة قبل استعادتها من النسخة الاحتياطية. يمكنك الآن تنظيف البيانات التي تم إنشاؤها في <a href="#Prepare-data">«تحضير البيانات» (Prepare data</a> ) عن طريق تشغيل الأمر التالي.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>ثم قم بتشغيل الأمر التالي لاستعادة البيانات من النسخة الاحتياطية.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>قد تستغرق عملية الاستعادة وقتًا طويلاً اعتمادًا على حجم البيانات المراد استعادتها. لذلك، تطلب الأمثلة أعلاه التنفيذ غير المتزامن باستخدام <code translate="no">&quot;async&quot;: true</code>. يمكنك التحقق من حالة مهمة الاستعادة عن طريق تشغيل:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>تذكر تغيير <code translate="no">test_restore_id</code> إلى <code translate="no">data.id</code> الذي ترجعه واجهة برمجة التطبيقات (API) الخاصة بالاستعادة. انتظر حتى يصبح <code translate="no">data.state_code</code> هو <code translate="no">2</code> قبل التحقق من البيانات؛ حيث يشير <code translate="no">3</code> إلى الفشل و <code translate="no">4</code> إلى انتهاء المهلة.</p>
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
    </button></h2><p>بعد نجاح المهمة، تأكد من وجود <code translate="no">hello_milvus_recover</code>. قم بإنشاء فهرس مناسب، وقم بتحميل المجموعة، وقارن عدد الكيانات والقيم القياسية والمتجهة ونتائج البحث مع البيانات المصدر التي تم التقاطها قبل النسخ الاحتياطي. لاستعادة الاسم الأصلي، استخدم <code translate="no">hello_milvus</code> بدلاً من ذلك.</p>
<p>يتوقع نموذج <code translate="no">verify_data.py</code> المرتبط بدليل واجهة سطر الأوامر (CLI) وجود مجموعتين مستعادتين ويقوم بحذفهما في النهاية. وهذا غير مناسب لمثال واجهة برمجة التطبيقات (API) هذا، الذي يختار <code translate="no">hello_milvus</code> فقط.</p>
