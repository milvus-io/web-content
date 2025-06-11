---
id: f2m.md
title: من فايس
related_key: "Faiss, migrate, import"
summary: تعرف على كيفية ترحيل بيانات فايس إلى ميلفوس.
---

<h1 id="From-Faiss" class="common-anchor-header">من فايس<button data-href="#From-Faiss" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر هذا الدليل عملية شاملة وخطوة بخطوة لترحيل البيانات من فايس إلى ميلفوس 2.x. باتباع هذا الدليل، ستتمكن من نقل بياناتك بكفاءة والاستفادة من ميزات ميلفوس 2.x المتقدمة والأداء المحسّن.</p>
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
<li>المصدر فايس المصدر</li>
<li>الهدف ملفوس: 2.x</li>
<li>للحصول على تفاصيل التثبيت، راجع <a href="https://github.com/facebookresearch/faiss/blob/main/INSTALL.md">تثبيت فايس</a> <a href="https://milvus.io/docs/install_standalone-docker.md">وتثبيت ملفوس</a>.</li>
</ul></li>
<li><strong>الأدوات المطلوبة</strong>:<ul>
<li>أداة<a href="https://github.com/zilliztech/milvus-migration">الترحيل Milvus-migration</a>. للحصول على تفاصيل التثبيت، راجع <a href="/docs/ar/v2.5.x/milvusdm_install.md">تثبيت أداة الترحيل</a>.</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration" class="common-anchor-header">تكوين الترحيل<button data-href="#Configure-the-migration" class="anchor-icon" translate="no">
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
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: faiss    <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 2
<span class="hljs-built_in">source</span>: <span class="hljs-comment"># configs for the source Faiss index.</span>
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    faissFile: ./testfiles/faiss/faiss_ivf_flat.index

target: <span class="hljs-comment"># configs for the target Milvus collection.</span>
create:
collection:
name: test1w
shardsNums: 2
dim: 256
metricType: L2

mode: remote
remote:
outputDir: testfiles/output/
cloud: aws
endpoint: 0.0.0.0:9000
region: ap-southeast-1
bucket: a-bucket
ak: minioadmin
sk: minioadmin
useIAM: <span class="hljs-literal">false</span>
useSSL: <span class="hljs-literal">false</span>
checkBucket: <span class="hljs-literal">true</span>
milvus2x:
endpoint: localhost:19530
username: xxxxx
password: xxxxx

<button class="copy-code-btn"></button></code></pre>

<p>يصف الجدول التالي المعلمات في ملف التكوين النموذجي. للحصول على قائمة كاملة بالتكوينات، ارجع إلى <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_FAISS.md#migrationyaml-reference">Milvus Migration: فايس إلى ميلفوس 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>تزامن خيوط الترحيل.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>الوضع التشغيلي لمهمة الترحيل. تعيين إلى فايس عند الترحيل من فهارس فايس.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>حجم المخزن المؤقت للقراءة من فايس في كل دفعة. الوحدة: كيلوبايت.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>حجم المخزن المؤقت للكتابة إلى ميلفيس في كل دفعة. الوحدة: كيلوبايت: كيلوبايت.</td></tr>
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
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>يحدد مكان قراءة الملفات المصدر من. القيم الصالحة:<br/>- <code translate="no">local</code>: يقرأ الملفات من قرص محلي.<br/>- <code translate="no">remote</code>: يقرأ الملفات من وحدة تخزين بعيدة.</td></tr>
<tr><td><code translate="no">source.local.faissFile</code></td><td>مسار الدليل حيث توجد الملفات المصدر. على سبيل المثال، <code translate="no">/db/faiss.index</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.create.collection.name</code></td><td>اسم مجموعة ميلفوس.</td></tr>
<tr><td><code translate="no">target.create.collection.shardsNums</code></td><td>عدد الأجزاء المراد إنشاؤها في المجموعة. لمزيد من المعلومات عن القطع، راجع <a href="https://milvus.io/docs/glossary.md#Shard">المصطلحات</a>.</td></tr>
<tr><td><code translate="no">target.create.collection.dim</code></td><td>بُعد الحقل المتجه.</td></tr>
<tr><td><code translate="no">target.create.collection.metricType</code></td><td>النوع المتري المستخدم لقياس أوجه التشابه بين المتجهات. لمزيد من المعلومات، راجع <a href="https://milvus.io/docs/glossary.md#Metric-type">المصطلحات</a>.</td></tr>
<tr><td><code translate="no">target.mode</code></td><td>موقع تخزين الملفات الملقاة. القيم الصالحة:<br/>- <code translate="no">local</code>: تخزين الملفات التي تم تفريغها على الأقراص المحلية.<br/>- <code translate="no">remote</code>: تخزين الملفات التي تم تفريغها على وحدة تخزين الكائنات.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>مسار دليل الإخراج في دلو التخزين السحابي.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>موفر خدمة التخزين السحابي. مثال على القيم: <code translate="no">aws</code> ، <code translate="no">gcp</code> ، <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.endpoint</code></td><td>نقطة نهاية تخزين Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>منطقة التخزين السحابي. يمكن أن تكون أي قيمة إذا كنت تستخدم MinIO المحلي.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>اسم الدلو لتخزين البيانات. يجب أن تكون القيمة هي نفس قيمة التكوين في Milvus 2.x. لمزيد من المعلومات، راجع <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">تكوينات النظام</a>.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>مفتاح الوصول لمخزن Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>مفتاح سري لتخزين Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>ما إذا كان سيتم استخدام دور IAM للاتصال.</td></tr>
<tr><td><code translate="no">target.remote.useSSL</code></td><td>ما إذا كان سيتم تمكين SSL عند الاتصال بـ Milvus 2.x. لمزيد من المعلومات، راجع <a href="https://milvus.io/docs/tls.md#Encryption-in-Transit">التشفير في النقل</a>.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>ما إذا كان سيتم التحقق مما إذا كانت الحافظة المحددة موجودة في تخزين الكائنات.</td></tr>
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
<p>يقوم الأمر أعلاه بتحويل بيانات فهرس Faiss إلى ملفات NumPy، ثم يستخدم عملية <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">الإدراج الجماعي</a> لكتابة البيانات إلى الدلو الهدف.</p></li>
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
