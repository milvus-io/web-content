---
id: woodpecker.md
title: Woodpecker
related_key: Woodpecker
summary: >-
  تعرف على كيفية عمل Woodpecker كقائمة انتظار الرسائل الافتراضية (WAL) في
  Milvus، وكيفية تشغيله في الوضع المدمج أو وضع الخدمة.
---
<h1 id="Woodpecker" class="common-anchor-header">Woodpecker<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Woodpecker هو <strong>قائمة انتظار الرسائل الافتراضية (سجل الكتابة المسبقة، WAL)</strong> في Milvus 3.x. وهو سجل WAL أصلي للسحابة مصمم لتخزين الكائنات، ويوفر إنتاجية عالية، وتكاليف تشغيل منخفضة، وقابلية توسع سلسة. للاطلاع على تفاصيل البنية والمعايير القياسية، راجع <a href="/docs/ar/woodpecker_architecture.md">Woodpecker</a>.</p>
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
    </button></h2><ul>
<li>في Milvus 3.x، يُعد Woodpecker سجل الكتابة المسبق/قائمة انتظار الرسائل <strong>الافتراضية،</strong> حيث يوفر عمليات كتابة مرتبة واستعادة البيانات بصفته خدمة التسجيل. ولا يلزم وجود خدمة خارجية لقائمة انتظار الرسائل (مثل Pulsar أو Kafka).</li>
<li>يمكن تشغيل Woodpecker <strong>مدمجًا</strong> في عقدة Milvus/البث (افتراضيًا)، أو <strong>كخدمة مخصصة</strong> مع وحدات pod الخاصة بها (في النظم الموزعة/المجموعات فقط).</li>
<li>وهي تدعم ثلاثة أوضاع لـ « <code translate="no">storage.type</code> »: تخزين الكائنات (<code translate="no">minio</code> ، الوضع الافتراضي)، ونظام الملفات المحلي (<code translate="no">local</code>)، و <code translate="no">service</code> المخصص. راجع <a href="#Deployment-modes">أوضاع النشر</a>.</li>
</ul>
<h2 id="Quick-start" class="common-anchor-header">البداية السريعة<button data-href="#Quick-start" class="anchor-icon" translate="no">
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
    </button></h2><p>لتمكين Woodpecker، اضبط نوع MQ على Woodpecker:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>ملاحظة: يعد التبديل إلى <code translate="no">mq.type</code> لمجموعة قيد التشغيل عملية ترقية. اتبع إجراءات الترقية بعناية وقم بالتحقق من صحتها على مجموعة جديدة قبل التبديل في بيئة الإنتاج.</p>
<h2 id="Configuration" class="common-anchor-header">التكوين<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>فيما يلي كتلة تكوين Woodpecker الكاملة (قم بتحرير <code translate="no">milvus.yaml</code> أو استبدالها في <code translate="no">user.yaml</code>):</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of woodpecker, used to manage Milvus logs of recent mutation operations, output streaming log, and provide embedded log sequential read and write.</span>
<span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">meta:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">etcd</span> <span class="hljs-comment"># The Type of the metadata provider. currently only support etcd.</span>
    <span class="hljs-attr">prefix:</span> <span class="hljs-string">woodpecker</span> <span class="hljs-comment"># The Prefix of the metadata provider. default is woodpecker.</span>
  <span class="hljs-attr">client:</span>
    <span class="hljs-attr">segmentAppend:</span>
      <span class="hljs-attr">queueSize:</span> <span class="hljs-number">10000</span> <span class="hljs-comment"># The size of the queue for pending messages to be sent of each log.</span>
      <span class="hljs-attr">maxRetries:</span> <span class="hljs-number">3</span> <span class="hljs-comment"># Maximum number of retries for segment append operations.</span>
    <span class="hljs-attr">segmentRollingPolicy:</span>
      <span class="hljs-attr">maxSize:</span> <span class="hljs-string">256M</span> <span class="hljs-comment"># Maximum size of a segment.</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">10m</span> <span class="hljs-comment"># Maximum interval between two segments, default is 10 minutes.</span>
      <span class="hljs-attr">maxBlocks:</span> <span class="hljs-number">1000</span> <span class="hljs-comment"># Maximum number of blocks in a segment</span>
    <span class="hljs-attr">auditor:</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">10s</span> <span class="hljs-comment"># Maximum interval between two auditing operations, default is 10 seconds.</span>
  <span class="hljs-attr">logstore:</span>
    <span class="hljs-attr">segmentSyncPolicy:</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">200ms</span> <span class="hljs-comment"># Maximum interval between two sync operations, default is 200 milliseconds.</span>
      <span class="hljs-attr">maxIntervalForLocalStorage:</span> <span class="hljs-string">10ms</span> <span class="hljs-comment"># Maximum interval between two sync operations local storage backend, default is 10 milliseconds.</span>
      <span class="hljs-attr">maxBytes:</span> <span class="hljs-string">256M</span> <span class="hljs-comment"># Maximum size of write buffer in bytes.</span>
      <span class="hljs-attr">maxEntries:</span> <span class="hljs-number">10000</span> <span class="hljs-comment"># Maximum entries number of write buffer.</span>
      <span class="hljs-attr">maxFlushRetries:</span> <span class="hljs-number">5</span> <span class="hljs-comment"># Maximum number of flush retries.</span>
      <span class="hljs-attr">retryInterval:</span> <span class="hljs-string">1000ms</span> <span class="hljs-comment"># Maximum interval between two retries. default is 1000 milliseconds.</span>
      <span class="hljs-attr">maxFlushSize:</span> <span class="hljs-string">2M</span> <span class="hljs-comment"># Maximum size of a fragment in bytes to flush.</span>
      <span class="hljs-attr">maxFlushThreads:</span> <span class="hljs-number">32</span> <span class="hljs-comment"># Maximum number of threads to flush data</span>
    <span class="hljs-attr">segmentCompactionPolicy:</span>
      <span class="hljs-attr">maxSize:</span> <span class="hljs-string">2M</span> <span class="hljs-comment"># The maximum size of the merged files.</span>
      <span class="hljs-attr">maxParallelUploads:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># The maximum number of parallel upload threads for compaction.</span>
      <span class="hljs-attr">maxParallelReads:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># The maximum number of parallel read threads for compaction.</span>
    <span class="hljs-attr">segmentReadPolicy:</span>
      <span class="hljs-attr">maxBatchSize:</span> <span class="hljs-string">16M</span> <span class="hljs-comment"># Maximum size of a batch in bytes.</span>
      <span class="hljs-attr">maxFetchThreads:</span> <span class="hljs-number">32</span> <span class="hljs-comment"># Maximum number of threads to fetch data.</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span> <span class="hljs-comment"># The Type of the storage provider. Valid values: [minio, local]</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">/var/lib/milvus/woodpecker</span> <span class="hljs-comment"># The root path of the storage provider.</span>
<button class="copy-code-btn"></button></code></pre>
<p>ملاحظات أساسية:</p>
<ul>
<li><code translate="no">woodpecker.meta</code>
<ul>
<li><strong>النوع</strong>: لا يُدعم حاليًا سوى <code translate="no">etcd</code>. أعد استخدام نفس etcd المستخدم في Milvus لتخزين البيانات الوصفية الخفيفة.</li>
<li><strong>البادئة</strong>: بادئة المفتاح للبيانات الوصفية. القيمة الافتراضية: <code translate="no">woodpecker</code>.</li>
</ul></li>
<li><code translate="no">woodpecker.client</code>
<ul>
<li>يتحكم في سلوك إضافة المقاطع/التدوير/التدقيق على جانب العميل لتحقيق التوازن بين معدل النقل وزمن الوصول من طرف إلى طرف.</li>
</ul></li>
<li><code translate="no">woodpecker.logstore</code>
<ul>
<li>يتحكم في سياسات المزامنة/التفريغ/الضغط/القراءة لشرائح السجلات. هذه هي أدوات الضبط الأساسية لضبط معدل النقل/زمن الوصول.</li>
</ul></li>
<li><code translate="no">woodpecker.storage</code>
<ul>
<li><strong>النوع</strong>: <code translate="no">minio</code> لتخزين الكائنات المتوافق مع MinIO/S3 (MinIO/S3/GCS/OSS، إلخ)؛ <code translate="no">local</code> لأنظمة الملفات المحلية/المشتركة.</li>
<li><strong>rootPath</strong>: المسار الجذري لخلفية التخزين (يسري على <code translate="no">local</code> ؛ أما مع <code translate="no">minio</code> ، فتتحدد المسارات حسب الحاوية/البادئة).</li>
</ul></li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">أوضاع النشر<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم Woodpecker ثلاثة أوضاع لـ <code translate="no">storage.type</code>:</p>
<table>
<thead>
<tr><th><code translate="no">storage.type</code></th><th>كيفية تشغيل Woodpecker</th><th>الخلفية WAL</th><th>Milvus المستقل</th><th>Milvus الموزع (المجموعة)</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio</code> (الافتراضي)</td><td>مُدمج في عقدة Milvus/البث</td><td>تخزين الكائنات (متوافق مع MinIO/S3)</td><td>مدعوم</td><td>مدعوم</td></tr>
<tr><td><code translate="no">local</code></td><td>مدمج في عقدة Milvus/البث</td><td>نظام الملفات المحلي</td><td>مدعوم</td><td>محدود (تحتاج جميع العقد إلى نظام ملفات مشترك، مثل NFS)</td></tr>
<tr><td><code translate="no">service</code></td><td><strong>خدمة Woodpecker مخصصة</strong> (بودات خاصة بها)</td><td>تخزين الكائنات (متوافق مع MinIO/S3)</td><td><strong>غير مدعوم</strong></td><td>مدعوم</td></tr>
</tbody>
</table>
<p>ملاحظات:</p>
<ul>
<li>مع وضع " <code translate="no">minio</code>"، يشارك Woodpecker نفس تخزين الكائنات مع Milvus (MinIO/S3/GCS/OSS، إلخ).</li>
<li>مع وضع "التخزين المباشر" ( <code translate="no">local</code>)، لا يكون القرص المحلي ذو العقدة الواحدة مناسبًا إلا لوضع "المستقل" (Standalone). إذا كان بإمكان جميع البودات الوصول إلى نظام ملفات مشترك (مثل NFS)، فيمكن لوضع "العنقود" (Cluster) أيضًا استخدام وضع "التخزين المباشر" ( <code translate="no">local</code>).</li>
<li><strong><code translate="no">service</code> يعمل هذا الوضع على تشغيل Woodpecker كخدمة منفصلة وقابلة للتوسع بشكل مستقل، وهو متاح فقط لعمليات النشر الموزعة/العنقودية.</strong> تستخدم عمليات النشر المستقلة الأوضاع المدمجة (<code translate="no">minio</code> أو <code translate="no">local</code>).</li>
</ul>
<h2 id="Object-storage-compatibility-for-storagetypeminio" class="common-anchor-header">توافق تخزين الكائنات مع <code translate="no">storage.type=minio</code><button data-href="#Object-storage-compatibility-for-storagetypeminio" class="anchor-icon" translate="no">
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
    </button></h2><p>تلخص المصفوفة التالية التوافق المعروف حاليًا لخلفية تخزين الكائنات عند تكوين Woodpecker باستخدام <code translate="no">storage.type=minio</code>. تستند هذه المعلومات إلى <a href="https://github.com/zilliztech/woodpecker/discussions/150">مناقشة GitHub رقم #150</a>.</p>
<table>
<thead>
<tr><th>المزود / الخدمة</th><th>الحالة</th><th>ملاحظات</th></tr>
</thead>
<tbody>
<tr><td>تخزين Azure Blob</td><td>مدعوم</td><td>يستخدم Azure SDK الأصلي.</td></tr>
<tr><td>AWS S3</td><td>مدعوم</td><td>S3 الأصلي مع دعم كامل للكتابة المشروطة.</td></tr>
<tr><td>MinIO (<code translate="no">&gt;= 2024-12</code>)</td><td>مدعوم</td><td>دعم كامل للكتابة المشروطة لـ S3.</td></tr>
<tr><td>Aliyun OSS</td><td>مدعوم</td><td>مدعوم من خلال واجهته المتوافقة مع S3.</td></tr>
<tr><td>Tencent COS</td><td>مدعوم</td><td>مدعوم من خلال واجهته المتوافقة مع S3.</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>مدعوم</td><td>مدعوم من خلال وضع التوافق مع S3.</td></tr>
<tr><td>Huawei Cloud OBS</td><td>غير مدعوم</td><td>يفتقر إلى دلالات الكتابة الشرطية المطلوبة.</td></tr>
<tr><td>VAST Data</td><td>مدعوم</td><td>تم التحقق منه من قبل المجتمع؛ يعمل مع المجموعات غير المُصنَّفة حسب الإصدار فقط.</td></tr>
<tr><td>وسائط تخزين أخرى متوافقة مع S3</td><td>جزئي</td><td>يعتمد على الدعم الكامل لدلالات الكتابة المشروطة لـ S3.</td></tr>
</tbody>
</table>
<p>ملاحظات:</p>
<ul>
<li>يعتمد التوافق على الدعم الأصلي لـ SDK أو الدعم لدلالات الكتابة المشروطة لـ S3.</li>
<li>إذا كنت تستضيف MinIO لـ Woodpecker بنفسك، فاستخدم الإصدار <code translate="no">RELEASE.2024-12-18T13-15-44Z</code> أو أحدث.</li>
<li>تعكس هذه المصفوفة <a href="https://github.com/zilliztech/woodpecker/discussions/150">المناقشة الحالية</a> وقد تتطور مع التحقق من دعم الخلفية بشكل أكبر.</li>
</ul>
<h2 id="Deployment-guides" class="common-anchor-header">أدلة النشر<button data-href="#Deployment-guides" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="common-anchor-header">تمكين Woodpecker لمجموعة Milvus على Kubernetes (Milvus Operator، storage=minio)<button data-href="#Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد تثبيت <a href="/docs/ar/install_cluster-milvusoperator.md">Milvus Operator</a>، قم بتشغيل مجموعة Milvus مع تمكين Woodpecker باستخدام النموذج الرسمي:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml

<button class="copy-code-btn"></button></code></pre>
<p>يقوم هذا النموذج بتكوين Woodpecker كقائمة انتظار الرسائل وتمكين Streaming Node. قد يستغرق التشغيل الأول بعض الوقت لسحب الصور؛ انتظر حتى تصبح جميع البودات جاهزة:</p>
<pre><code translate="no" class="language-bash">kubectl get pods
kubectl get milvus my-release -o yaml | grep -A2 status
<button class="copy-code-btn"></button></code></pre>
<p>عندما تصبح جاهزة، سترى وحدات تشبه ما يلي:</p>
<pre><code translate="no">NAME                                               READY   STATUS    RESTARTS   AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-1</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-2</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-7</span>f8f88499d<span class="hljs-operator">-</span>kc66r        <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>mixcoord<span class="hljs-number">-7</span>cd7998d<span class="hljs-operator">-</span>x59kg          <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-5</span>b56cf8446<span class="hljs-operator">-</span>pbnjm           <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-0</span><span class="hljs-number">-558</span>d9cdd57<span class="hljs-operator">-</span>sgbfx     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>streamingnode<span class="hljs-number">-58</span>fbfdfdd8<span class="hljs-operator">-</span>vtxfd   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-0</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-1</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-2</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-3</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
<button class="copy-code-btn"></button></code></pre>
<p>قم بتشغيل الأمر التالي لإلغاء تثبيت مجموعة Milvus.</p>
<pre><code translate="no" class="language-bash">kubectl delete milvus my-release
<button class="copy-code-btn"></button></code></pre>
<p>إذا كنت بحاجة إلى تعديل معلمات Woodpecker، فاتبع الإعدادات الموضحة في <a href="#Configuration">قسم «التكوين</a>».</p>
<h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="common-anchor-header">تمكين Woodpecker لمجموعة Milvus على Kubernetes (مخطط Helm، التخزين=minio)<button data-href="#Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>أولاً، أضف مخطط Helm الخاص بـ Milvus وقم بتحديثه كما هو موضح في <a href="/docs/ar/install_cluster-helm.md">«تشغيل Milvus في Kubernetes باستخدام Helm</a>».</p>
<p>ثم قم بالنشر باستخدام أحد الأمثلة التالية:</p>
<p>– نشر الكتلة (الإعدادات الموصى بها مع تمكين Woodpecker و Streaming Node):</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>– النشر المستقل (مع تمكين Woodpecker):</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد النشر، اتبع الإرشادات الواردة في الوثائق لإعادة توجيه المنافذ والاتصال. لضبط معلمات Woodpecker، اتبع الإعدادات الموضحة في <a href="#Configuration">«التكوين</a>».</p>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="common-anchor-header">تمكين Woodpecker لـ Milvus المستقل في Docker (storage=local)<button data-href="#Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="anchor-icon" translate="no">
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
    </button></h3><p>في Milvus 3.x، يستخدم النشر المستقل في Docker Woodpecker مع <strong>نظام الملفات المحلي</strong> كخلفية WAL <strong>بشكل افتراضي</strong> — ولا يتطلب الأمر أي تكوين إضافي. اتبع إرشادات <a href="/docs/ar/install_standalone-docker.md">«تشغيل Milvus في Docker</a>»:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>لضبط Woodpecker، قم بتحرير ملف <code translate="no">user.yaml</code> الذي تم إنشاؤه بعد التشغيل الأول وقم بتشغيل <code translate="no">bash standalone_embed.sh restart</code> لتطبيق التغييرات (يؤدي تشغيل <code translate="no">start</code> جديد إلى إعادة إنشاء ملف <code translate="no">user.yaml</code> ، لذا قم بتطبيق التعديلات باستخدام <code translate="no">restart</code>):</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml</span>
<span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">logstore:</span>
    <span class="hljs-attr">segmentSyncPolicy:</span>
      <span class="hljs-attr">maxFlushThreads:</span> <span class="hljs-number">16</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="common-anchor-header">تمكين Woodpecker لـ Milvus Standalone باستخدام Docker Compose (storage=minio)<button data-href="#Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>اتبع <a href="/docs/ar/install_standalone-docker-compose.md">إرشادات تشغيل Milvus باستخدام Docker Compose</a>. مثال:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp-compose &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp-compose
wget https://github.com/milvus-io/milvus/releases/download/v3.0-beta/milvus-standalone-docker-compose.yml -O docker-compose.yml
<span class="hljs-comment"># By default, the Docker Compose standalone uses Woodpecker</span>
<span class="hljs-built_in">sudo</span> docker compose up -d
<span class="hljs-comment"># If you need to change Woodpecker parameters further, write an override:</span>
docker <span class="hljs-built_in">exec</span> -it milvus-standalone bash -lc <span class="hljs-string">&#x27;cat &gt; /milvus/configs/user.yaml &lt;&lt;EOF
mq:
  type: woodpecker
woodpecker:
  logstore:
    segmentSyncPolicy: 
      maxFlushThreads: 16
  storage:
    type: minio
EOF&#x27;</span>

<span class="hljs-comment"># Restart the container to apply the changes</span>
docker restart milvus-standalone
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-Woodpecker-service-mode-for-a-Milvus-Cluster-Helm" class="common-anchor-header">تمكين وضع خدمة Woodpecker لمجموعة Milvus (Helm)<button data-href="#Enable-Woodpecker-service-mode-for-a-Milvus-Cluster-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p>يعد <strong>وضع خدمة</strong> Woodpecker إحدى ميزات <strong>Milvus 3.0</strong>. بالنسبة لعمليات النشر الموزعة/المجمعة، يمكنك تشغيل Woodpecker <strong>كخدمة مخصصة</strong> (pods منفصلة) بدلاً من تضمينها في عقدة البث عن طريق تعيين <code translate="no">streaming.woodpecker.embedded=false</code>:</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> woodpecker.image.tag=v0.1.33 \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.woodpecker.embedded=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>يؤدي هذا إلى نشر Woodpecker كمجموعة StatefulSet مخصصة (<code translate="no">my-release-milvus-woodpecker</code> ، 4 نسخ متماثلة افتراضيًا) مدعومة بخدمة بدون واجهة مستخدم، ومجمعة عبر بروتوكول gossip على المنافذ <code translate="no">18080</code> (الخدمة)، و <code translate="no">17946</code> (gossip)، و <code translate="no">9091</code> (المقاييس)، مع استخدام MinIO كخلفية تخزين لها. تحتاج الخدمة إلى نصاب قانوني مكون من <strong>3</strong> عقد؛ ويحافظ الإعداد الافتراضي المكون من <strong>4</strong> نسخ متماثلة على النصاب القانوني مع تحمل تعطل عقدة واحدة، لذا لا تضبط <code translate="no">woodpecker.replicaCount</code> على أقل من 3. ثم تتضمن المجموعة مجموعة بودات <code translate="no">woodpecker</code> منفصلة:</p>
<pre><code translate="no"><span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">0</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">1</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">2</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>يُستخدم وضع Woodpecker <code translate="no">service</code> في عمليات النشر <strong>الموزعة/المجمعة</strong> فقط — أما عمليات النشر المستقلة فتعمل باستخدام Woodpecker المدمج (<code translate="no">minio</code> أو <code translate="no">local</code>). لا يدعم Milvus Operator حتى الآن وضع خدمة Woodpecker.</p>
</div>
<h2 id="Throughput-tuning-tips" class="common-anchor-header">نصائح لضبط معدل النقل<button data-href="#Throughput-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><p>يختلف ملف أداء Woodpecker ووقت الاستجابة بين الوضع <strong>المدمج</strong> ووضع <strong>الخدمة</strong> (ميزة في Milvus 3.0). تم تنظيم الإرشادات أدناه حسب الوضع.</p>
<h3 id="Embedded-mode" class="common-anchor-header">الوضع المدمج<button data-href="#Embedded-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>استنادًا إلى المعايير المرجعية وحدود الخلفية في <a href="/docs/ar/woodpecker_architecture.md">Woodpecker</a>، قم بتحسين معدل نقل البيانات للكتابة من البداية إلى النهاية من الجوانب التالية:</p>
<ul>
<li>جانب التخزين
<ul>
<li><strong>تخزين الكائنات (متوافق مع MinIO/S3)</strong>: قم بزيادة التزامن وحجم الكائنات (تجنب الكائنات الصغيرة جدًا). راقب حدود عرض النطاق الترددي للشبكة ووحدة التخزين. غالبًا ما يبلغ الحد الأقصى لعقدة MinIO واحدة على SSD حوالي 100 ميجابايت/ثانية محليًّا؛ بينما يمكن أن تصل سرعة نقل البيانات من EC2 إلى S3 إلى جيجابايت/ثانية.</li>
<li><strong>أنظمة الملفات المحلية/المشتركة (محلية)</strong>: يُفضل استخدام NVMe/الأقراص السريعة. تأكد من أن نظام الملفات يتعامل جيدًا مع عمليات الكتابة الصغيرة وزمن انتقال fsync.</li>
</ul></li>
<li>أدوات ضبط Woodpecker
<ul>
<li>قم بزيادة القيم في <code translate="no">logstore.segmentSyncPolicy.maxFlushSize</code> و <code translate="no">maxFlushThreads</code> للحصول على عمليات مسح أكبر وتوازي أعلى.</li>
<li>اضبط <code translate="no">maxInterval</code> وفقًا لخصائص الوسائط (استبدل زمن الوصول بالإنتاجية مع تجميع أطول).</li>
<li>بالنسبة لتخزين الكائنات، ضع في اعتبارك زيادة <code translate="no">segmentRollingPolicy.maxSize</code> لتقليل تبديل المقاطع.</li>
</ul></li>
<li>جانب العميل/التطبيق
<ul>
<li>استخدم أحجام دفعات أكبر وعددًا أكبر من الكُتّاب/العملاء المتزامنين.</li>
<li>تحكم في توقيت التحديث/بناء الفهرس (تجميع الدُفعات قبل التشغيل) لتجنب عمليات الكتابة الصغيرة المتكررة.</li>
</ul></li>
</ul>
<h3 id="Service-mode-Milvus-30+" class="common-anchor-header">وضع الخدمة (Milvus 3.0+)<button data-href="#Service-mode-Milvus-30+" class="anchor-icon" translate="no">
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
    </button></h3><p>يحافظ وضع الخدمة على معدل نقل الكتابة العالي لـ WAL المدعوم بتخزين الكائنات مع إضافة زمن انتقال منخفض (انظر <a href="#Latency">زمن الانتقال</a>). لا تزال عمليات الضبط المذكورة أعلاه من جانب التخزين وجانب العميل سارية؛ بالإضافة إلى ذلك، نظرًا لأن Woodpecker يعمل كخدمة مستقلة، يمكنك توسيع سعة الكتابة أفقيًا عن طريق إضافة نسخ متماثلة (<code translate="no">woodpecker.replicaCount</code> ، الافتراضي 4)، وتستفيد عمليات الكتابة من النسخ المتماثل بنظام النصاب القانوني ذي RTT واحد وعمليات القراءة التي تراعي الطوبولوجيا والتي تتجنب إعادة التوجيه بواسطة الوسيط.</p>
<p><strong>عرض توضيحي للإدراج الدفعي</strong> — استخدم ما يلي لقياس معدل نقل البيانات للكتابة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> time

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://&lt;Proxy Pod IP&gt;:19530&quot;</span>,
)

<span class="hljs-comment"># 2. Create a collection</span>
res = client.create_collection(
    collection_name=<span class="hljs-string">&quot;test_milvus_wp&quot;</span>,
    dimension=<span class="hljs-number">512</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
    shards_num=<span class="hljs-number">2</span>,
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># 3. Insert randomly generated vectors</span>
colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
data = []

batch_size = <span class="hljs-number">1000</span>
batch_count = <span class="hljs-number">2000</span>
<span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(batch_count):
    start_time = time.time()
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserting <span class="hljs-subst">{j}</span>th vectors <span class="hljs-subst">{j * batch_size}</span> startTime<span class="hljs-subst">{start_time}</span>&quot;</span>)
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(batch_size):
        current_color = random.choice(colors)
        data.append({
            <span class="hljs-string">&quot;id&quot;</span>: (j*batch_size + i),
            <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">512</span>) ],
            <span class="hljs-string">&quot;color&quot;</span>: current_color,
            <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;<span class="hljs-subst">{current_color}</span>_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">1000</span>, <span class="hljs-number">9999</span>))}</span>&quot;</span>
        })
    res = client.insert(
        collection_name=<span class="hljs-string">&quot;test_milvus_wp&quot;</span>,
        data=data
    )
    data = []
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{j}</span>th vectors endTime:<span class="hljs-subst">{time.time()}</span> costTime:<span class="hljs-subst">{time.time() - start_time}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Latency" class="common-anchor-header">الزمن الاستجابة<button data-href="#Latency" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Embedded-mode" class="common-anchor-header">الوضع المدمج<button data-href="#Embedded-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Woodpecker هو WAL سحابي أصلي مصمم لتخزين الكائنات مع توازن بين معدل النقل والتكلفة وزمن الاستجابة. يعطي الوضع المدمج خفيف الوزن الأولوية لتحسين التكلفة ومعدل النقل، حيث تتطلب معظم السيناريوهات كتابة البيانات في غضون فترة زمنية معينة فقط بدلاً من المطالبة بزمن استجابة منخفض لطلبات الكتابة الفردية. لذلك، يستخدم Woodpecker عمليات الكتابة المجمعة، بفواصل زمنية افتراضية تبلغ 10 مللي ثانية لخلفية تخزين نظام الملفات المحلي و200 مللي ثانية لخلفية التخزين المشابهة لـ MinIO. أثناء عمليات الكتابة البطيئة، يساوي زمن الوصول الأقصى الفاصل الزمني مضافًا إليه وقت التفريغ.</p>
<p>لاحظ أن الإدراج الدفعي لا يتم تشغيله فقط بواسطة الفواصل الزمنية، بل أيضًا بحجم الدفعة، الذي يبلغ 2 ميغابايت بشكل افتراضي.</p>
<h3 id="Service-mode-Milvus-30+" class="common-anchor-header">وضع الخدمة (Milvus 3.0+)<button data-href="#Service-mode-Milvus-30+" class="anchor-icon" translate="no">
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
    </button></h3><p>يوفر وضع الخدمة <strong>زمن انتقال للكتابة بمستوى الميلي ثانية</strong> — من نفس مرتبة WAL التقليدي ذي النسخ الثلاث على القرص المحلي — مع الحفاظ على التكلفة منخفضة. في النشر النموذجي ذي النسخ الثلاث عبر مناطق التوفر (AZ)، يظل زمن انتقال الكتابة في نطاق الميلي ثانية. ويحقق ذلك من خلال:</p>
<ul>
<li><strong>عمليات الكتابة ذات النصاب القانوني</strong> في<strong>جولة واحدة (One-RTT)</strong> — حيث يكمل النسخ المتماثل الذي يحركه العميل عملية كتابة النصاب القانوني خلال جولة واحدة، مع تثبيت حركة المرور عبر المناطق (AZ) عند حجم بيانات نسختين متماثلتين (مقارنةً بحركة المرور الإضافية عبر المناطق التي تبلغ حوالي 1/3، وهي النسبة النموذجية في النسخ المتماثل القائم على الوسيط/القائد).</li>
<li><strong>عمليات قراءة أحادية القفزة تراعي التوبولوجيا</strong> — تذهب كل عملية قراءة مباشرةً إلى النسخة المتماثلة الأقرب بدلاً من إعادة توجيهها عبر وسيط، مما يتجنب عمليات القراءة العشوائية عبر المناطق (حوالي ثلثي حركة مرور القراءة عبر المناطق) في الأنظمة القائمة على الوسيط.</li>
<li><strong>التحميل الفوري إلى تخزين الكائنات بعد تدوير المقطع</strong> — يتتبع كل مقطع دورة حياته الكاملة ويتم تحميله إلى تخزين الكائنات فور تدويره، مما يحافظ على انخفاض الحجم الذي يشغله على القرص المحلي وتكلفة التخزين دون المساومة على زمن الوصول.</li>
<li><strong>لا يوجد تكرار مستمر من عقدة إلى أخرى</strong> — يتم الاحتفاظ بالسجلات في تخزين الكائنات الذي يعمل كوحدة تخزين مشتركة، لذا فإن التحويل التلقائي في حالة الفشل يعيد تحميل النسخ المتبقية فقط (بدون نسخ العقدة بأكملها)، ولا يكون التوسع مقيدًا بنطاق ترددي التكرار بين العقد، كما أن استبدال العقد على نطاق واسع لا يتسبب في حدوث «عواصف تكرار».</li>
</ul>
<p>في عمليات النشر عبر مناطق التوافر (AZ)، يوفر وضع الخدمة أيضًا ما يقارب <strong>ثلث حركة مرور الكتابة</strong> <strong>وثلثي حركة مرور القراءة</strong> عبر شبكات مناطق التوافر مقارنةً بأنظمة السجلات القائمة على الوسيط. للاطلاع على التصميم الكامل وتحليل التكلفة، راجع <a href="/docs/ar/woodpecker_architecture.md">بنية Woodpecker</a>.</p>
<p>للحصول على تفاصيل حول البنية وأوضاع النشر (MemoryBuffer / QuorumBuffer) والأداء، راجع <a href="/docs/ar/woodpecker_architecture.md">«بنية Woodpecker</a>».</p>
<p>لمزيد من التفاصيل حول المعلمات، راجع <a href="https://github.com/zilliztech/woodpecker">مستودع</a> Woodpecker على <a href="https://github.com/zilliztech/woodpecker">GitHub</a>.</p>
