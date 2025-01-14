---
id: from-m2x.md
summary: >-
  يوفر هذا الدليل عملية شاملة ومفصلة خطوة بخطوة لترحيل البيانات من Milvus 2.3.x
  إلى Milvus 2.3.x أو أعلى.
title: من Milvus 2.3.x
---
<h1 id="From-Milvus-23x" class="common-anchor-header">من Milvus 2.3.x<button data-href="#From-Milvus-23x" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر هذا الدليل عملية شاملة ومفصلة خطوة بخطوة لترحيل البيانات من Milvus 2.3.x إلى Milvus 2.3.x أو أعلى.</p>
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
<li><strong>إصدارات البرنامج</strong>:<ul>
<li>المصدر Milvus المصدر: 2.3.0+ (تستخدم الأداة أداة التحويل لجلب بيانات المجموعة المصدرية، مما يتطلب أن يكون الإصدار 2.3.0 أو أعلى من الإصدار 2.3.0).</li>
<li>ميلفوس الهدف: 2.3.0+</li>
</ul></li>
<li><strong>الأدوات المطلوبة</strong>:<ul>
<li>أداة<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>. للحصول على تفاصيل التثبيت، راجع <a href="/docs/ar/milvusdm_install.md">تثبيت أداة الترحيل</a>.</li>
</ul></li>
<li><strong>إعداد البيانات</strong>:<ul>
<li>تأكد من تحميل مجموعة Milvus المصدر وجاهزة لتصدير البيانات.</li>
<li>إذا كان الميلفوس الهدف لا يحتوي على مجموعة مطابقة للمجموعة المصدر، ستقوم أداة الترحيل <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> بإنشائها تلقائيًا. لاحظ أنه بعد الترحيل، لن تتم فهرسة المجموعة الهدف، ويجب عليك فهرسة المجموعة يدويًا بعد ذلك.</li>
</ul></li>
</ul>
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
    workMode: milvus2x
    reader:
      bufferSize: 500

meta:
  mode: config
  version: 2.3.0
  collection: src_table_name

<span class="hljs-built_in">source</span>:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx

target:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx
<button class="copy-code-btn"></button></code></pre>
<p>يصف الجدول التالي المعلمات في ملف التكوين النموذجي. لمزيد من المعلومات، ارجع إلى <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus Migration: Milvus2.x إلى Milvus2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>الوضع التشغيلي لمهمة الترحيل. تعيين إلى milvus2x عند الترحيل من Milvus 2.x.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>حجم المخزن المؤقت للقراءة من Milvus 2.x في كل دفعة.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>تحديد مكان قراءة ملف التعريف. تعيين إلى تكوين، للإشارة إلى إمكانية الحصول على تكوين التعريف من ملف migration.yaml هذا.</td></tr>
<tr><td><code translate="no">meta.version</code></td><td>مصدر إصدار ملف Milvus. تعيين إلى 2.3.0 أو أعلى.</td></tr>
<tr><td><code translate="no">meta.collection</code></td><td>اسم مجموعة المصدر.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.milvus2x.endpoint</code></td><td>عنوان مصدر خادم ملفوس المصدر.</td></tr>
<tr><td><code translate="no">source.milvus2x.username</code></td><td>اسم المستخدم لخادم Milvus المصدر. هذه المعلمة مطلوبة إذا تم تمكين مصادقة المستخدم لخادم Milvus الخاص بك. لمزيد من المعلومات، راجع <a href="/docs/ar/authenticate.md">تمكين المصادقة</a>.</td></tr>
<tr><td><code translate="no">source.milvus2x.password</code></td><td>كلمة المرور لخادم Milvus المصدر. هذه المعلمة مطلوبة إذا تم تمكين مصادقة المستخدم لخادم Milvus الخاص بك. لمزيد من المعلومات، راجع <a href="/docs/ar/authenticate.md">تمكين المصادقة</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>عنوان خادم Milvus الهدف.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>اسم المستخدم لخادم Milvus الهدف. هذه المعلمة مطلوبة إذا تم تمكين مصادقة المستخدم لخادم Milvus الخاص بك. لمزيد من المعلومات، راجع <a href="/docs/ar/authenticate.md">تمكين المصادقة</a>.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>كلمة المرور لخادم Milvus الهدف. هذه المعلمة مطلوبة إذا تم تمكين مصادقة المستخدم لخادم Milvus الخاص بك. لمزيد من المعلومات، راجع <a href="/docs/ar/authenticate.md">تمكين المصادقة</a>.</td></tr>
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
    </button></h2><p>لديك خياران لبدء مهمة الترحيل - باستخدام CLI أو تقديم طلبات واجهة برمجة التطبيقات. اختر الخيار الذي يناسب احتياجاتك.</p>
<h3 id="Option-1-Using-CLI" class="common-anchor-header">الخيار 1: استخدام CLI</h3><p>ابدأ مهمة الترحيل باستخدام الأمر التالي. استبدل <code translate="no">{YourConfigFilePath}</code> بالدليل المحلي حيث يوجد ملف التهيئة <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>راقب السجلات للحصول على تحديثات التقدم. يجب أن تتضمن سجلات الترحيل الناجحة إدخالات مثل:</p>
<pre><code translate="no" class="language-bash">[INFO] [migration/milvus2x_starter.go:79] [<span class="hljs-string">&quot;=================&gt;JobProcess!&quot;</span>] [Percent=100]
[INFO] [migration/milvus2x_starter.go:27] [<span class="hljs-string">&quot;[Starter] migration Milvus2x to Milvus2x finish!!!&quot;</span>] [Cost=94.877717375]
[INFO] [starter/starter.go:109] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=94.878243583]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-2-Making-API-requests" class="common-anchor-header">الخيار 2: إجراء طلبات واجهة برمجة التطبيقات</h3><p>يمكنك أيضًا استخدام واجهة برمجة التطبيقات (Restful API) لتنفيذ الترحيل. ابدأ تشغيل خادم واجهة برمجة التطبيقات باستخدام:</p>
<pre><code translate="no" class="language-bash">./milvus-migration server run -p 8080
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد بدء تشغيل الخادم بنجاح، ضع الملف <code translate="no">migration.yaml</code> في الدليل <code translate="no">configs/</code> للمشروع وابدأ الترحيل باستخدام:</p>
<pre><code translate="no" class="language-bash">curl -XPOST http://localhost:8080/api/v1/start
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>بعد اكتمال مهمة الترحيل، استخدم Attu لعرض عدد الكيانات التي تم ترحيلها. بالإضافة إلى ذلك، يمكنك إنشاء فهارس وتحميل المجموعات في Attu. لمزيد من المعلومات، راجع <a href="https://github.com/zilliztech/attu">Attu</a> و <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
<h2 id="Additional-configuration-options" class="common-anchor-header">خيارات التكوين الإضافية<button data-href="#Additional-configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>بالإضافة إلى التكوينات الأساسية المذكورة أعلاه، يمكنك أيضًا إضافة إعدادات إضافية بناءً على متطلباتك الخاصة.</p>
<ul>
<li><p><strong>ترحيل الحقل الانتقائي</strong>: إذا كنت بحاجة إلى ترحيل حقول محددة فقط في مجموعة ما بدلاً من جميع الحقول، فحدد الحقول المراد ترحيلها في القسم <code translate="no">meta</code> من الملف <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-yaml">meta:
  fields:
    - name: <span class="hljs-built_in">id</span>
    - name: title_vector
    - name: reading_time
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>المجموعة المستهدفة المخصصة</strong>: لتخصيص خصائص المجموعة الهدف، أضف التكوينات ذات الصلة في القسم <code translate="no">meta</code> من الملف <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">meta</span>:
  <span class="hljs-attr">milvus</span>:
    <span class="hljs-attr">collection</span>: target_collection_name
    <span class="hljs-attr">shardNum</span>: <span class="hljs-number">2</span>
    <span class="hljs-attr">closeDynamicField</span>: <span class="hljs-literal">false</span>
    <span class="hljs-attr">consistencyLevel</span>: <span class="hljs-title class_">Customized</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>للحصول على معلومات مفصلة، راجع <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">ترحيل Milvus: Milvus2.x إلى Milvus2.x</a>.</p>
