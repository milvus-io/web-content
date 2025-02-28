---
id: milvus_backup_api.md
summary: تعلم كيفية استخدام Milvus Backup من خلال واجهة برمجة التطبيقات (API)
title: النسخ الاحتياطي واستعادة البيانات باستخدام واجهات برمجة التطبيقات
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">النسخ الاحتياطي واستعادة البيانات باستخدام واجهات برمجة التطبيقات<button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> git@github.com:zilliztech/milvus-backup.git
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
مساحة العمل ─ ─ ميلفوس باكوب ─ ─ ─ التكوينات ─ ─ ΚFECTECT ─ ─ النسخ الاحتياطي.yaml</pre>
<p>نظرًا لتعذر النسخ الاحتياطي لـ Milvus Backup على بياناتك إلى مسار محلي، تأكد من صحة إعدادات Minio عند تخصيص ملف التكوين.</p>
<div class="alert note">
<p>يختلف اسم دلو Minio الافتراضي باختلاف طريقة تثبيت ملف Milvus. عند إجراء تغييرات على إعدادات Minio، قم بالرجوع إلى الجدول التالي.</p>
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
<h2 id="Start-up-the-API-server" class="common-anchor-header">بدء تشغيل خادم API<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>ثم يمكنك بدء تشغيل خادم API على النحو التالي:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server
<button class="copy-code-btn"></button></code></pre>
<p>يستمع خادم API على المنفذ 8080 افتراضيًا. يمكنك تغييره عن طريق تشغيله باستخدام العلامة <code translate="no">-p</code>. لبدء استماع خادم واجهة برمجة التطبيقات على المنفذ 443، قم بما يلي:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك الوصول إلى واجهة مستخدم Swagger UI باستخدام http://localhost:<port>/api/v1/docs/index.html.</p>
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
    </button></h2><p>إذا قمت بتشغيل مثيل Milvus محلي فارغ يستمع على المنفذ الافتراضي 19530، استخدم مثال البرامج النصية Python لإنشاء بعض البيانات في مثيلك. لا تتردد في إجراء التغييرات اللازمة على البرامج النصية لتناسب احتياجاتك.</p>
<p>احصل على <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/main/example/prepare_data.py">البرامج</a> النصية. ثم قم بتشغيل البرامج النصية لإنشاء البيانات. تأكد من تثبيت <a href="https://pypi.org/project/pymilvus/">PyMilvus،</a> وهي مجموعة أدوات تطوير البرمجيات الرسمية لـ Milvus Python SDK.</p>
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
    </button></h2><div class="tab-wrapper"></div>
<p>لاحظ أن تشغيل النسخ الاحتياطي لـ Milvus Backup على مثيل Milvus لن يؤثر عادةً على تشغيل المثيل. يعمل مثيل Milvus الخاص بك بشكل كامل أثناء النسخ الاحتياطي أو الاستعادة.</p>
<p>قم بتشغيل الأمر التالي لإنشاء نسخة احتياطية. قم بتغيير <code translate="no">collection_names</code> و <code translate="no">backup_name</code> إذا لزم الأمر.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST <span class="hljs-string">&#x27;http://localhost:8080/api/v1/create&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
--data-raw <span class="hljs-string">&#x27;{
  &quot;async&quot;: true,
  &quot;backup_name&quot;: &quot;my_backup&quot;,
  &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد تنفيذ الأمر، يمكنك سرد النسخ الاحتياطية في الدلو المحدد في إعدادات Minio على النحو التالي:</p>
<pre><code translate="no" class="language-shell">curl --location --request <span class="hljs-variable constant_">GET</span> <span class="hljs-string">&#x27;http://localhost:8080/api/v1/list&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>وتنزيل ملفات النسخ الاحتياطية على النحو التالي:</p>
<pre><code translate="no" class="language-shell">curl --location --request <span class="hljs-variable constant_">GET</span> <span class="hljs-string">&#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>أثناء تشغيل الأمر أعلاه، قم بتغيير <code translate="no">backup_id</code> و <code translate="no">backup_name</code> إلى العنوان الذي تم إرجاعه بواسطة واجهة برمجة تطبيقات القائمة.</p>
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
<p>يمكنك استدعاء أمر استعادة واجهة برمجة التطبيقات مع خيار <code translate="no">collection_suffix</code> لإنشاء مجموعة جديدة من خلال استعادة البيانات من النسخة الاحتياطية. قم بتغيير <code translate="no">collection_names</code> و <code translate="no">backup_name</code> إذا لزم الأمر.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST <span class="hljs-string">&#x27;http://localhost:8080/api/v1/restore&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;_recover&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>يتيح لك الخيار <code translate="no">collection_suffix</code> تعيين لاحقة للمجموعة الجديدة المراد إنشاؤها. سيؤدي الأمر أعلاه إلى إنشاء مجموعة جديدة تسمى <strong>hello_milvus_recover</strong> في مثيل Milvus الخاص بك.</p>
<p>إذا كنت تفضل استعادة المجموعة التي تم نسخها احتياطيًا دون تغيير اسمها، فقم بإسقاط المجموعة قبل استعادتها من النسخة الاحتياطية. يمكنك الآن تنظيف البيانات التي تم إنشاؤها في <a href="#Prepare-data">إعداد البيانات</a> عن طريق تشغيل الأمر التالي.</p>
<pre><code translate="no" class="language-shell">python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>ثم قم بتشغيل الأمر التالي لاستعادة البيانات من النسخة الاحتياطية.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST <span class="hljs-string">&#x27;http://localhost:8080/api/v1/restore&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>يمكن أن تستغرق عملية الاستعادة وقتاً طويلاً اعتماداً على حجم البيانات المراد استعادتها. لذلك، يتم تشغيل جميع مهام الاستعادة بشكل غير متزامن. يمكنك التحقق من حالة مهمة الاستعادة عن طريق التشغيل:</p>
<pre><code translate="no" class="language-shell">curl --location --request <span class="hljs-variable constant_">GET</span> <span class="hljs-string">&#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27;</span> \
--header <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>تذكّر تغيير <code translate="no">test_restore_id</code> إلى تلك التي تمت استعادتها بواسطة واجهة برمجة تطبيقات الاستعادة.</p>
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
    </button></h2><p>بمجرد اكتمال الاستعادة، يمكنك التحقق من البيانات المستعادة عن طريق فهرسة المجموعة المستعادة على النحو التالي:</p>
<pre><code translate="no" class="language-shell">python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>لاحظ أن البرنامج النصي أعلاه يفترض أنك قمت بتشغيل الأمر <code translate="no">restore</code> مع العلم <code translate="no">-s</code> وتعيين اللاحقة على <code translate="no">-recover</code>. لا تتردد في إجراء التغييرات اللازمة على البرنامج النصي لتناسب حاجتك.</p>
