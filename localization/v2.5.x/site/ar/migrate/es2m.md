---
id: es2m.md
summary: >-
  يوفر هذا الدليل عملية شاملة وخطوة بخطوة لترحيل البيانات من Elasticsearch إلى
  Milvus 2.x.
title: من Elasticsearch
---

<h1 id="From-Elasticsearch" class="common-anchor-header">من Elasticsearch<button data-href="#From-Elasticsearch" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر هذا الدليل عملية شاملة وخطوة بخطوة لترحيل البيانات من Elasticsearch إلى Milvus 2.x. باتباع هذا الدليل، ستتمكن من نقل بياناتك بكفاءة، والاستفادة من ميزات Milvus 2.x المتقدمة والأداء المحسّن.</p>
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
<li>المصدر Elasticsearch: 7.x أو 8.x</li>
<li>الهدف ميلفوس: 2.x</li>
<li>للحصول على تفاصيل التثبيت، راجع <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html">تثبيت Elasticsearch</a> <a href="https://milvus.io/docs/install_standalone-docker.md">وتثبيت Milvus</a>.</li>
</ul></li>
<li><strong>الأدوات المطلوبة</strong>:<ul>
<li>أداة<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>. للحصول على تفاصيل التثبيت، راجع <a href="/docs/ar/v2.5.x/milvusdm_install.md">تثبيت أداة الترحيل</a>.</li>
</ul></li>
<li><strong>أنواع البيانات المدعومة للترحيل</strong>: الحقول التي سيتم ترحيلها من فهرس Elasticsearch المصدر هي من الأنواع التالية - <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector،</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">والكلمات الرئيسية،</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">والنص،</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">والطويل،</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">والصحيح،</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">والمزدوج،</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">والعائم،</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">والمنطقي،</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">والكائن</a>. أنواع البيانات غير المدرجة هنا غير مدعومة حاليًا للترحيل. ارجع إلى <a href="#field-mapping-reference">مرجع تخطيط الحقول</a> للحصول على معلومات مفصلة حول تخطيطات البيانات بين مجموعات Milvus وفهارس Elasticsearch.</li>
<li><strong>متطلبات فهرس Elasticsearch</strong>:<ul>
<li>يجب أن يحتوي فهرس Elasticsearch المصدر على حقل متجه من النوع <code translate="no">dense_vector</code>. لا يمكن بدء الترحيل بدون حقل متجه.</li>
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
    </button></h2><p>احفظ مثال ملف تهيئة الترحيل بصيغة <code translate="no">migration.yaml</code> وقم بتعديل التكوينات بناءً على ظروفك الفعلية. لك مطلق الحرية في وضع ملف التكوين في أي دليل محلي.</p>
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    workMode: <span class="hljs-string">&quot;elasticsearch&quot;</span> <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: <span class="hljs-number">2500</span> <span class="hljs-comment"># buffer size to read from Elasticsearch in each batch. A value ranging from 2000 to 4000 is recommended.</span>
meta: <span class="hljs-comment"># meta configs for the source Elasticsearch index and target Milvus 2.x collection.</span>
  mode: <span class="hljs-string">&quot;config&quot;</span> <span class="hljs-comment"># specifies the source for meta configs. currently, onlly `config` is supported.</span>
  version: <span class="hljs-string">&quot;8.9.1&quot;</span>
  index: <span class="hljs-string">&quot;qatest_index&quot;</span> <span class="hljs-comment"># identifies the Elasticsearch index to migrate data from.</span>
  fields: <span class="hljs-comment"># fields within the Elasticsearch index to be migrated.</span>
  - name: <span class="hljs-string">&quot;my_vector&quot;</span> <span class="hljs-comment"># name of the Elasticsearch field.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;dense_vector&quot;</span> <span class="hljs-comment"># data type of the Elasticsearch field.</span>
    dims: <span class="hljs-number">128</span> <span class="hljs-comment"># dimension of the vector field. required only when `type` is `dense_vector`.</span>
  - name: <span class="hljs-string">&quot;id&quot;</span>
    pk: true <span class="hljs-comment"># specifies if the field serves as a primary key.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;long&quot;</span>
  - name: <span class="hljs-string">&quot;num&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;integer&quot;</span>
  - name: <span class="hljs-string">&quot;double1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;double&quot;</span>
  - name: <span class="hljs-string">&quot;text1&quot;</span>
    maxLen: <span class="hljs-number">1000</span> <span class="hljs-comment"># max. length of data fields. required only for `keyword` and `text` data types.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;text&quot;</span>
  - name: <span class="hljs-string">&quot;bl1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;boolean&quot;</span>
  - name: <span class="hljs-string">&quot;float1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;float&quot;</span>
  milvus: <span class="hljs-comment"># configs specific to creating the collection in Milvus 2.x</span>
    collection: <span class="hljs-string">&quot;Collection_01&quot;</span> <span class="hljs-comment"># name of the Milvus collection. defaults to the Elasticsearch index name if not specified.</span>
    closeDynamicField: false <span class="hljs-comment"># specifies whether to disable the dynamic field in the collection. defaults to `false`.</span>
    shardNum: <span class="hljs-number">2</span> <span class="hljs-comment"># number of shards to be created in the collection.</span>
    consistencyLevel: Strong <span class="hljs-comment"># consistency level for Milvus collection.</span>
source: <span class="hljs-comment"># connection configs for the source Elasticsearch server</span>
  es:
    urls:
    - <span class="hljs-string">&quot;http://10.15.1.***:9200&quot;</span> <span class="hljs-comment"># address of the source Elasticsearch server.</span>
    username: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># username for the Elasticsearch server.</span>
    password: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># password for the Elasticsearch server.</span>
target:
  mode: <span class="hljs-string">&quot;remote&quot;</span> <span class="hljs-comment"># storage location for dumped files. valid values: `remote` and `local`.</span>
  remote: <span class="hljs-comment"># configs for remote storage</span>
    outputDir: <span class="hljs-string">&quot;migration/milvus/test&quot;</span> <span class="hljs-comment"># output directory path in the cloud storage bucket.</span>
    cloud: <span class="hljs-string">&quot;aws&quot;</span> <span class="hljs-comment"># cloud storage service provider. Examples: `aws`, `gcp`, `azure`, etc.</span>
    region: <span class="hljs-string">&quot;us-west-2&quot;</span> <span class="hljs-comment"># region of the cloud storage; can be any value if using local Minio.</span>
    bucket: <span class="hljs-string">&quot;zilliz-aws-us-****-*-********&quot;</span> <span class="hljs-comment"># bucket name for storing data; must align with configs in milvus.yaml for Milvus 2.x.</span>
    useIAM: true <span class="hljs-comment"># whether to use an IAM Role for connection.</span>
    checkBucket: false <span class="hljs-comment"># checks if the specified bucket exists in the storage.</span>
  milvus2x: <span class="hljs-comment"># connection configs for the target Milvus 2.x server</span>
    endpoint: <span class="hljs-string">&quot;http://10.102.*.**:19530&quot;</span> <span class="hljs-comment"># address of the target Milvus server.</span>
    username: <span class="hljs-string">&quot;****&quot;</span> <span class="hljs-comment"># username for the Milvus 2.x server.</span>
    password: <span class="hljs-string">&quot;******&quot;</span> <span class="hljs-comment"># password for the Milvus 2.x server.</span>
<button class="copy-code-btn"></button></code></pre>
<p>يصف الجدول التالي المعلمات في ملف التكوين النموذجي. للحصول على قائمة كاملة من التكوينات، ارجع إلى <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_ES.md#migrationyaml-reference">Milvus Migration: Elasticsearch إلى Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>الوضع التشغيلي لمهمة الترحيل. اضبط على <code translate="no">elasticsearch</code> عند الترحيل من فهارس Elasticsearch.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>حجم المخزن المؤقت للقراءة من Elasticsearch في كل دفعة. الوحدة: كيلوبايت.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>يحدد مصدر التكوينات الوصفية. حالياً، يتم دعم <code translate="no">config</code> فقط.</td></tr>
<tr><td><code translate="no">meta.index</code></td><td>يحدد فهرس Elasticsearch لترحيل البيانات منه.</td></tr>
<tr><td><code translate="no">meta.fields</code></td><td>الحقول داخل فهرس Elasticsearch المراد ترحيلها.</td></tr>
<tr><td><code translate="no">meta.fields.name</code></td><td>اسم حقل Elasticsearch.</td></tr>
<tr><td><code translate="no">meta.fields.maxLen</code></td><td>الحد الأقصى لطول الحقل. هذه المعلمة مطلوبة فقط عندما يكون <code translate="no">meta.fields.type</code> هو <code translate="no">keyword</code> أو <code translate="no">text</code>.</td></tr>
<tr><td><code translate="no">meta.fields.pk</code></td><td>تحديد ما إذا كان الحقل يعمل كمفتاح أساسي.</td></tr>
<tr><td><code translate="no">meta.fields.type</code></td><td>نوع بيانات حقل Elasticsearch. في الوقت الحالي، يتم دعم أنواع البيانات التالية في Elasticsearch: <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dasticsearch: متجه_كثيف،</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">كلمة رئيسية،</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">نص،</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">طويل،</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">عدد صحيح، عدد</a> صحيح، <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">عدد مزدوج،</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">عدد عائم، عدد</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">منطقي،</a> <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">كائن</a>.</td></tr>
<tr><td><code translate="no">meta.fields.dims</code></td><td>بُعد الحقل المتجه. هذه المعلمة مطلوبة فقط عندما يكون <code translate="no">meta.fields.type</code> هو <code translate="no">dense_vector</code>.</td></tr>
<tr><td><code translate="no">meta.milvus</code></td><td>التكوينات الخاصة بإنشاء المجموعة في Milvus 2.x.</td></tr>
<tr><td><code translate="no">meta.milvus.collection</code></td><td>اسم مجموعة Milvus. افتراضي إلى اسم فهرس Elasticsearch إذا لم يتم تحديده.</td></tr>
<tr><td><code translate="no">meta.milvus.closeDynamicField</code></td><td>يحدد ما إذا كان سيتم تعطيل الحقل الديناميكي في المجموعة. افتراضي إلى <code translate="no">false</code>. لمزيد من المعلومات حول الحقول الديناميكية، راجع <a href="https://milvus.io/docs/enable-dynamic-field.md#Enable-Dynamic-Field">تمكين الحقل الديناميكي</a>.</td></tr>
<tr><td><code translate="no">meta.milvus.shardNum</code></td><td>عدد الأجزاء المراد إنشاؤها في المجموعة. لمزيد من المعلومات حول الأجزاء، راجع <a href="https://milvus.io/docs/glossary.md#Shard">المصطلحات</a>.</td></tr>
<tr><td><code translate="no">meta.milvus.consistencyLevel</code></td><td>مستوى الاتساق للمجموعة في Milvus. لمزيد من المعلومات، راجع <a href="https://milvus.io/docs/consistency.md">الاتساق</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.es</code></td><td>تكوينات الاتصال لخادم Elasticsearch المصدر.</td></tr>
<tr><td><code translate="no">source.es.urls</code></td><td>عنوان خادم Elasticsearch المصدر.</td></tr>
<tr><td><code translate="no">source.es.username</code></td><td>اسم المستخدم لخادم Elasticsearch.</td></tr>
<tr><td><code translate="no">source.es.password</code></td><td>كلمة المرور لخادم Elasticsearch.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>موقع تخزين الملفات التي تم تفريغها. القيم الصالحة:<br/>- <code translate="no">local</code>: تخزين الملفات التي تم تفريغها على الأقراص المحلية.<br/>- <code translate="no">remote</code>: تخزين الملفات التي تم تفريغها على وحدة تخزين الكائنات.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>مسار دليل الإخراج في دلو التخزين السحابي.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>موفر خدمة التخزين السحابي. مثال على القيم: <code translate="no">aws</code> ، <code translate="no">gcp</code> ، <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>منطقة التخزين السحابي. يمكن أن تكون أي قيمة إذا كنت تستخدم MinIO المحلي.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>اسم الدلو لتخزين البيانات. يجب أن تكون القيمة هي نفس قيمة التكوين في Milvus 2.x. لمزيد من المعلومات، راجع <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">تكوينات النظام</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>ما إذا كنت تريد استخدام دور IAM للاتصال.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>ما إذا كان سيتم التحقق من وجود الدلو المحدد في تخزين الكائنات.</td></tr>
<tr><td><code translate="no">target.milvus2x</code></td><td>تكوينات الاتصال لخادم Milvus 2.x الهدف.</td></tr>
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
    </button></h2><p>ابدأ مهمة الترحيل باستخدام الأمر التالي. استبدل <code translate="no">{YourConfigFilePath}</code> بالدليل المحلي حيث يوجد ملف التكوين <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>فيما يلي مثال على إخراج سجل الترحيل الناجح:</p>
<pre><code translate="no" class="language-bash">[task/load_base_task.go:94] [<span class="hljs-string">&quot;[LoadTasker] Dec Task Processing--------------&gt;&quot;</span>] [Count=0] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[task/load_base_task.go:76] [<span class="hljs-string">&quot;[LoadTasker] Progress Task ---------------&gt;&quot;</span>] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[dbclient/cus_field_milvus2x.go:86] [<span class="hljs-string">&quot;[Milvus2x] begin to ShowCollectionRows&quot;</span>]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static: &quot;</span>] [collection=test_mul_field4_rename1] [beforeCount=50000] [afterCount=100000] [increase=50000]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static Total&quot;</span>] [<span class="hljs-string">&quot;Total Collections&quot;</span>=1] [beforeTotalCount=50000] [afterTotalCount=100000] [totalIncrease=50000]
[migration/es_starter.go:25] [<span class="hljs-string">&quot;[Starter] migration ES to Milvus finish!!!&quot;</span>] [Cost=80.009174459]
[starter/starter.go:106] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=80.00928425]
[cleaner/remote_cleaner.go:27] [<span class="hljs-string">&quot;[Remote Cleaner] Begin to clean files&quot;</span>] [bucket=a-bucket] [rootPath=testfiles/output/zwh/migration]
[cmd/start.go:32] [<span class="hljs-string">&quot;[Cleaner] clean file success!&quot;</span>]
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
    </button></h2><p>بمجرد تنفيذ مهمة الترحيل، يمكنك إجراء مكالمات واجهة برمجة التطبيقات أو استخدام Attu لعرض عدد الكيانات التي تم ترحيلها. لمزيد من المعلومات، راجع <a href="https://github.com/zilliztech/attu">Attu</a> و <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
<h2 id="Field-mapping-reference" class="common-anchor-header">مرجع تعيين الحقل<button data-href="#Field-mapping-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>راجع الجدول أدناه لفهم كيفية تعيين أنواع الحقول في فهارس Elasticsearch إلى أنواع الحقول في مجموعات Milvus.</p>
<p>لمزيد من المعلومات حول أنواع البيانات المدعومة في Milvus، راجع <a href="https://milvus.io/docs/schema.md#Supported-data-types">أنواع البيانات المدعومة</a>.</p>
<table>
<thead>
<tr><th>نوع حقل Elasticsearch</th><th>نوع حقل ملفوس</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td>متجه_كثيف</td><td>المتجه العائم</td><td>تظل أبعاد المتجه دون تغيير أثناء الترحيل.</td></tr>
<tr><td>كلمة رئيسية</td><td>فارشار</td><td>تعيين الحد الأقصى للطول (من 1 إلى 65,535 65,535). يمكن أن تؤدي السلاسل التي تتجاوز الحد الأقصى إلى حدوث أخطاء في الترحيل.</td></tr>
<tr><td>نص</td><td>فارشار</td><td>تعيين الحد الأقصى للطول (من 1 إلى 65,535 65,535). يمكن أن تؤدي السلاسل التي تتجاوز الحد إلى حدوث أخطاء في الترحيل.</td></tr>
<tr><td>طويل</td><td>Int64</td><td>-</td></tr>
<tr><td>عدد صحيح</td><td>Int32</td><td>-</td></tr>
<tr><td>مزدوج</td><td>مضاعف</td><td>-</td></tr>
<tr><td>عائم</td><td>عائم</td><td>-</td></tr>
<tr><td>منطقية</td><td>بولي</td><td>-</td></tr>
<tr><td>كائن</td><td>JSON</td><td>-</td></tr>
</tbody>
</table>
