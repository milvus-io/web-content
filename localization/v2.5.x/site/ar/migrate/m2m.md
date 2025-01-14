---
id: m2m.md
summary: >-
  يوفر هذا الدليل عملية شاملة وخطوة بخطوة لترحيل البيانات من Milvus 1.x (بما في
  ذلك 0.9.x وما فوق) إلى Milvus 2.x.
title: من ميلفوس 1.x
---
<h1 id="From-Milvus-1x" class="common-anchor-header">من ميلفوس 1.x<button data-href="#From-Milvus-1x" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر هذا الدليل عملية شاملة وخطوة بخطوة لترحيل البيانات من Milvus 1.x (بما في ذلك 0.9.x وما فوق) إلى Milvus 2.x. باتباع هذا الدليل، ستتمكن من نقل بياناتك بكفاءة، والاستفادة من ميزات Milvus 2.x المتقدمة والأداء المحسّن.</p>
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
<li><strong>إصدارات البرامج</strong>:<ul>
<li>المصدر ميلفوس المصدر: 0.9.x إلى 1.x</li>
<li>الهدف ملفوس: 2.x</li>
</ul></li>
<li><strong>الأدوات المطلوبة</strong>:<ul>
<li>أداة<a href="https://github.com/zilliztech/milvus-migration">الترحيل Milvus-migration</a>. للحصول على تفاصيل التثبيت، راجع <a href="/docs/ar/milvusdm_install.md">تثبيت أداة الترحيل</a>.</li>
</ul></li>
</ul>
<h2 id="Export-metadata-of-the-source-Milvus-installation" class="common-anchor-header">تصدير البيانات الوصفية الخاصة بتثبيت Milvus المصدر<button data-href="#Export-metadata-of-the-source-Milvus-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>لإعداد بيانات الترحيل لـ Milvus 0.9.x حتى 1.x، قم بإيقاف Milvus المصدر أو على الأقل إيقاف تنفيذ أي عمليات DML فيه.</p>
<ol>
<li><p>تصدير البيانات الوصفية لتثبيت المصدر Milvus المصدر إلى <code translate="no">meta.json</code>.</p>
<ul>
<li>بالنسبة لتلك التثبيتات التي تستخدم MySQL كواجهة خلفية، قم بتشغيل</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -m <span class="hljs-string">&quot;user:password@tcp(adderss)/milvus?charset=utf8mb4&amp;parseTime=True&amp;loc=Local&quot;</span> -o outputDir
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>بالنسبة لتلك التثبيتات التي تستخدم SQLite كواجهة خلفية، قم بتشغيل</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -s /milvus/db/meta.sqlite -o outputDir
<button class="copy-code-btn"></button></code></pre></li>
<li><p>انسخ المجلد <code translate="no">tables</code> من تثبيت Milvus الخاص بك، ثم انقل المجلد <code translate="no">meta.json</code> والمجلد <code translate="no">tables</code> إلى مجلد فارغ.</p>
<p>بمجرد الانتهاء من هذه الخطوة، يجب أن تبدو بنية المجلد الفارغ بهذا الشكل:</p>
<pre><code translate="no">migration_data
├── meta.json
└── tables
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتحميل المجلد الذي تم إعداده في الخطوة السابقة إلى دلو تخزين كتلة S3 أو استخدم هذا المجلد المحلي مباشرة في القسم التالي.</p></li>
</ol>
<h2 id="Configure-the-migration-file" class="common-anchor-header">تكوين ملف الترحيل<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>احفظ مثال ملف تهيئة الترحيل بصيغة <code translate="no">migration.yaml</code> وقم بتعديل التكوينات بناءً على ظروفك الفعلية. لك الحرية في وضع ملف التكوين في أي دليل محلي.</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: milvus1x
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 16
meta:
  mode: <span class="hljs-built_in">local</span>
  localFile: /outputDir/test/meta.json
<span class="hljs-built_in">source</span>:
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    tablesDir: /db/tables/
target:
  mode: remote
  remote:
    outputDir: <span class="hljs-string">&quot;migration/test/xx&quot;</span>
    ak: xxxx
    sk: xxxx
    cloud: aws
    region: us-west-2
    bucket: xxxxx
    useIAM: <span class="hljs-literal">true</span>
    checkBucket: <span class="hljs-literal">false</span>
  milvus2x:
    endpoint: <span class="hljs-string">&quot;{yourMilvus2_xServerAddress}:{port}&quot;</span>
    username: xxxx
    password: xxxx
<button class="copy-code-btn"></button></code></pre>
<p>يصف الجدول التالي المعلمات في ملف التكوين النموذجي. للحصول على قائمة كاملة بالتكوينات، ارجع إلى <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#migrationyaml-reference">Milvus Migration: Milvus1.x إلى Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>تزامن خيوط الترحيل.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>الوضع التشغيلي لمهمة الترحيل. تعيين إلى <code translate="no">milvus1x</code> عند الترحيل من Milvus 1.x.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>حجم المخزن المؤقت للقراءة من Milvus 1.x في كل دفعة. الوحدة: كيلوبايت.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>حجم المخزن المؤقت للكتابة إلى Milvus 2.x في كل دفعة. الوحدة: كيلوبايت: كيلوبايت.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">loader</code></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">loader.worker.limit</code></td><td>تزامن خيوط المحمل.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>تحديد مكان قراءة ملف التعريف meta.json. قيم صالحة: <code translate="no">local</code> ، <code translate="no">remote</code> ، <code translate="no">mysql</code> ، ، <code translate="no">sqlite</code>.</td></tr>
<tr><td><code translate="no">meta.localFile</code></td><td>مسار الدليل المحلي حيث يوجد الملف <code translate="no">meta.json</code>. يتم استخدام هذا التكوين فقط عندما يتم تعيين <code translate="no">meta.mode</code> على <code translate="no">local</code>. للحصول على تكوينات التعريف الأخرى، راجع <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#meta">README_1X</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>يحدد مكان قراءة الملفات المصدر من. القيم الصالحة:<br/>- <code translate="no">local</code>: يقرأ الملفات من قرص محلي.<br/>- <code translate="no">remote</code>: يقرأ الملفات من وحدة تخزين بعيدة.</td></tr>
<tr><td><code translate="no">source.local.tablesDir</code></td><td>مسار الدليل حيث توجد الملفات المصدر. على سبيل المثال، <code translate="no">/db/tables/</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>موقع التخزين للملفات الملقاة. القيم الصالحة:<br/>- <code translate="no">local</code>: تخزين الملفات الملقاة على الأقراص المحلية.<br/>- <code translate="no">remote</code>: تخزين الملفات الملقاة على وحدة تخزين الكائنات.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>مسار دليل الإخراج في دلو التخزين السحابي.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>مفتاح الوصول للتخزين Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>المفتاح السري للتخزين Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>مزود خدمة التخزين السحابي. مثال على القيم: <code translate="no">aws</code> ، <code translate="no">gcp</code> ، <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>منطقة التخزين السحابي. يمكن أن تكون أي قيمة إذا كنت تستخدم MinIO المحلي.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>اسم الدلو لتخزين البيانات. يجب أن تكون القيمة هي نفس قيمة التكوين في Milvus 2.x. لمزيد من المعلومات، راجع <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">تكوينات النظام</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>ما إذا كنت تريد استخدام دور IAM للاتصال.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>ما إذا كان سيتم التحقق من وجود الدلو المحدد في تخزين الكائنات.</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>عنوان خادم Milvus الهدف.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>اسم المستخدم لخادم Milvus 2.x. هذه المعلمة مطلوبة إذا تم تمكين مصادقة المستخدم لخادم Milvus الخاص بك. لمزيد من المعلومات، راجع <a href="https://milvus.io/docs/authenticate.md">تمكين المصادقة</a>.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>كلمة المرور لخادم Milvus 2.x. هذه المعلمة مطلوبة إذا تم تمكين مصادقة المستخدم لخادم Milvus الخاص بك. لمزيد من المعلومات، راجع <a href="https://milvus.io/docs/authenticate.md">تمكين المصادقة</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">بدء مهمة الترحيل<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>ابدأ مهمة الترحيل باستخدام الأمر التالي. استبدل <code translate="no">{YourConfigFilePath}</code> بالدليل المحلي حيث يوجد ملف التكوين <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  dump  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>يقوم الأمر أعلاه بتحويل بيانات المصدر في Milvus 1.x إلى ملفات NumPy، ثم يستخدم عملية <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">الإدراج الجماعي</a> لكتابة البيانات إلى الحزمة المستهدفة.</p></li>
<li><p>بمجرد إنشاء ملفات NumPy، قم باستيراد هذه الملفات إلى Milvus 2.x باستخدام الأمر التالي. استبدل <code translate="no">{YourConfigFilePath}</code> بالدليل المحلي حيث يوجد ملف التكوين <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  load  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
    </button></h2><p>بمجرد تنفيذ مهمة الترحيل، يمكنك إجراء مكالمات واجهة برمجة التطبيقات أو استخدام Attu لعرض عدد الكيانات التي تم ترحيلها. لمزيد من المعلومات، راجع <a href="https://github.com/zilliztech/attu">Attu</a> و <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
