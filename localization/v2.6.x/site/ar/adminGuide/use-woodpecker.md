---
id: use-woodpecker.md
title: استخدام نقار الخشب (Milvus v2.6.x)
related_key: Woodpecker
summary: تعرّف على كيفية تمكين نقار الخشب كـ WAL في ميلفوس.
---
<h2 id="Use-Woodpecker-Milvus-v26x" class="common-anchor-header">استخدام Woodpecker (Milvus v2.6.x)<button data-href="#Use-Woodpecker-Milvus-v26x" class="anchor-icon" translate="no">
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
    </button></h2><p>يشرح هذا الدليل كيفية تمكين واستخدام Woodpecker كسجل الكتابة الأمامية (WAL) في Milvus 2.6.x. Woodpecker هو سجل الكتابة الأمامية السحابية الأصلي المصمم لتخزين الكائنات، ويوفر إنتاجية عالية، ونفقات تشغيلية منخفضة، وقابلية توسع سلسة. للحصول على تفاصيل البنية والمعيار القياسي، راجع <a href="/docs/ar/woodpecker_architecture.md">Woodpecker</a>.</p>
<h3 id="Overview" class="common-anchor-header">نظرة عامة</h3><ul>
<li>بدءًا من الإصدار 2.6 من Milvus 2.6، Woodpecker هو WAL اختياري يوفر عمليات كتابة مرتبة واسترداد كخدمة تسجيل.</li>
<li>كخيار قائمة انتظار للرسائل، يتصرف بشكل مشابه ل Pulsar/Kafka ويمكن تمكينه عبر التكوين.</li>
<li>يتم دعم خلفيتين للتخزين: نظام الملفات المحلي (<code translate="no">local</code>) وتخزين الكائنات (متوافق مع<code translate="no">minio</code>/S3).</li>
</ul>
<h3 id="Quick-start" class="common-anchor-header">بدء التشغيل السريع</h3><p>لتمكين Woodpecker، قم بتعيين نوع MQ إلى Woodpecker:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>ملاحظة: يعد تبديل <code translate="no">mq.type</code> لمجموعة قيد التشغيل عملية ترقية. اتبع إجراء الترقية بعناية وتحقق من صحتها على مجموعة جديدة قبل تبديل الإنتاج.</p>
<h3 id="Configuration" class="common-anchor-header">التكوين</h3><p>فيما يلي كتلة تكوين Woodpecker الكاملة (تحرير <code translate="no">milvus.yaml</code> أو تجاوز في <code translate="no">user.yaml</code>):</p>
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
      <span class="hljs-attr">maxFlushRetries:</span> <span class="hljs-number">5</span> <span class="hljs-comment"># Maximum size of write buffer in bytes.</span>
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
<p>الملاحظات الرئيسية:</p>
<ul>
<li><code translate="no">woodpecker.meta</code>
<ul>
<li><strong>النوع</strong>: حاليا فقط <code translate="no">etcd</code> مدعوم فقط . إعادة استخدام نفس إلخd مثل ميلفوس لتخزين البيانات الوصفية خفيفة الوزن.</li>
<li><strong>البادئة</strong>: البادئة الرئيسية للبيانات الوصفية. افتراضي: <code translate="no">woodpecker</code>.</li>
</ul></li>
<li><code translate="no">woodpecker.client</code>
<ul>
<li>يتحكم في سلوك إلحاق المقطع/التدوير/التدقيق على جانب العميل لتحقيق التوازن بين الإنتاجية وزمن الانتقال من طرف إلى طرف.</li>
</ul></li>
<li><code translate="no">woodpecker.logstore</code>
<ul>
<li>يتحكم في نُهج المزامنة/التدفق/التضخيم/التكثيف/قراءة مقاطع السجل. هذه هي المقابض الأساسية لضبط الإنتاجية/وقت الاستجابة.</li>
</ul></li>
<li><code translate="no">woodpecker.storage</code>
<ul>
<li><strong>النوع</strong>: <code translate="no">minio</code> لتخزين الكائنات المتوافقة مع MinIO/S3 (MinIO/S3/GCS/OSS، إلخ)؛ <code translate="no">local</code> لأنظمة الملفات المحلية/المشتركة.</li>
<li><strong>مسار الجذر</strong>: المسار الجذر للواجهة الخلفية للتخزين (فعال لـ <code translate="no">local</code> ؛ مع <code translate="no">minio</code> ، يتم تحديد المسارات بواسطة الجرافة/البادئة).</li>
</ul></li>
</ul>
<h3 id="Deployment-modes" class="common-anchor-header">أوضاع النشر</h3><p>يدعم ميلفوس كلاً من الوضعين المستقل والمجموعة. مصفوفة دعم الواجهة الخلفية للتخزين Woodpecker:</p>
<table>
<thead>
<tr><th></th><th><code translate="no">storage.type=local</code></th><th><code translate="no">storage.type=minio</code></th></tr>
</thead>
<tbody>
<tr><td>ميلفوس مستقل</td><td>مدعومة</td><td>مدعومة</td></tr>
<tr><td>مجموعة ميلفوس العنقودية</td><td>محدود (يحتاج إلى FS مشترك)</td><td>مدعوم</td></tr>
</tbody>
</table>
<p>ملاحظات:</p>
<ul>
<li>مع <code translate="no">minio</code> ، يشترك Woodpecker في نفس تخزين الكائنات مع Milvus (MinIO/S3/GCS/OSS، إلخ).</li>
<li>مع <code translate="no">local</code> ، يكون القرص المحلي ذو العقدة الواحدة مناسبًا فقط للقرص المستقل. إذا كان بإمكان جميع البودات الوصول إلى نظام ملفات مشترك (على سبيل المثال، NFS)، يمكن أن يستخدم وضع الكتلة أيضًا <code translate="no">local</code>.</li>
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
    </button></h2><h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="common-anchor-header">تمكين Woodpecker لمجموعة Milvus العنقودية على Kubernetes (مشغل Milvus، التخزين=minio)</h3><p>بعد تثبيت مشغل <a href="/docs/ar/install_cluster-milvusoperator.md">Milvus،</a> ابدأ تشغيل مجموعة Milvus مع تمكين Woodpecker باستخدام النموذج الرسمي:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml

<button class="copy-code-btn"></button></code></pre>
<p>يقوم هذا النموذج بتهيئة Woodpecker كقائمة انتظار للرسائل وتمكين عقدة التدفق. قد يستغرق بدء التشغيل الأول وقتًا لسحب الصور؛ انتظر حتى تصبح جميع الكبسولات جاهزة:</p>
<pre><code translate="no" class="language-bash">kubectl get pods
kubectl get milvus my-release -o yaml | grep -A2 status
<button class="copy-code-btn"></button></code></pre>
<p>عندما تكون جاهزة، يجب أن ترى كبسولات مشابهة لـ:</p>
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
<p>قم بتشغيل الأمر التالي لإلغاء تثبيت مجموعة ميلفوس العنقودية.</p>
<pre><code translate="no" class="language-bash">kubectl delete milvus my-release
<button class="copy-code-btn"></button></code></pre>
<p>إذا كنت بحاجة إلى ضبط معلمات Woodpecker، اتبع الإعدادات الموضحة في <a href="/docs/ar/deploy_pulsar.md">تكوين تخزين الرسائل</a>.</p>
<h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="common-anchor-header">تمكين Woodpecker لمجموعة Milvus العنقودية على Kubernetes (مخطط Helm، التخزين=minio)</h3><p>قم أولاً بإضافة مخطط Milvus Helm وتحديثه كما هو موضح في <a href="/docs/ar/install_cluster-helm.md">تشغيل Milvus في Kubernetes مع Helm</a>.</p>
<p>ثم قم بالنشر باستخدام أحد الأمثلة التالية:</p>
<p>- النشر العنقودي (الإعدادات الموصى بها مع تمكين Woodpecker وعقدة التدفق):</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.0 \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>- النشر المستقل (تم تمكين Woodpecker):</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.0 \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد النشر، اتبع المستندات لتوجيه المنفذ والاتصال. لضبط معلمات Woodpecker، اتبع الإعدادات الموضحة في <a href="/docs/ar/deploy_pulsar.md">تكوين تخزين الرسائل</a>.</p>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="common-anchor-header">قم بتمكين Woodpecker لـ Milvus Standalone في Docker (التخزين = محلي)</h3><p>اتبع <a href="/docs/ar/install_standalone-docker.md">تشغيل Milvus في Docker</a>. مثال:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh

<span class="hljs-comment"># Create user.yaml to enable Woodpecker with local filesystem</span>
<span class="hljs-built_in">cat</span> &gt; user.yaml &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
mq:
  <span class="hljs-built_in">type</span>: woodpecker
woodpecker:
  storage:
    <span class="hljs-built_in">type</span>: <span class="hljs-built_in">local</span>
    rootPath: /var/lib/milvus/woodpecker
EOF

bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من تغيير إعدادات Woodpecker، قم بتحديث <code translate="no">user.yaml</code> وتشغيل <code translate="no">bash standalone_embed.sh restart</code>.</p>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="common-anchor-header">قم بتمكين Woodpecker لـ Milvus Standalone مع Docker Compose (التخزين=محلي)</h3><p>اتبع <a href="/docs/ar/install_standalone-docker-compose.md">تشغيل Milvus مع Docker Compose</a>. مثال:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp-compose &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp-compose
wget https://github.com/milvus-io/milvus/releases/download/v2.6.0/milvus-standalone-docker-compose.yml -O docker-compose.yml
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
<h2 id="Throughput-tuning-tips" class="common-anchor-header">نصائح لضبط الإنتاجية<button data-href="#Throughput-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><p>استنادًا إلى المعايير وحدود الواجهة الخلفية في <a href="/docs/ar/woodpecker_architecture.md">Woodpecker،</a> قم بتحسين إنتاجية الكتابة من طرف إلى طرف من الجوانب التالية:</p>
<ul>
<li>جانب التخزين<ul>
<li><strong>تخزين الكائنات (متوافق مع minio/S3)</strong>: زيادة التزامن وحجم الكائن (تجنب الكائنات الصغيرة). راقب حدود عرض النطاق الترددي للشبكة والمجموعة. غالبًا ما تصل عقدة MinIO واحدة على SSD إلى حوالي 100 ميجابايت/ثانية محليًا؛ يمكن أن تصل عقدة EC2 واحدة إلى S3 إلى GB/s.</li>
<li><strong>أنظمة الملفات المحلية/المشتركة (المحلية)</strong>: يفضل NVMe/الأقراص السريعة. تأكد من أن FS يتعامل مع عمليات الكتابة الصغيرة وزمن انتقال المزامنة بشكل جيد.</li>
</ul></li>
<li>مقابض نقار الخشب<ul>
<li>قم بزيادة <code translate="no">logstore.segmentSyncPolicy.maxFlushSize</code> و <code translate="no">maxFlushThreads</code> للتدفقات الأكبر والتوازي الأعلى.</li>
<li>قم بضبط <code translate="no">maxInterval</code> وفقًا لخصائص الوسائط (مقايضة زمن الوصول بالإنتاجية مع تجميع أطول).</li>
<li>بالنسبة لتخزين الكائن، ضع في اعتبارك زيادة <code translate="no">segmentRollingPolicy.maxSize</code> لتقليل مفاتيح تبديل المقاطع.</li>
</ul></li>
<li>جانب العميل/التطبيق<ul>
<li>استخدم أحجام دفعات أكبر والمزيد من الكتّاب/العملاء المتزامنين.</li>
<li>التحكم في توقيت التحديث/إنشاء الفهرس (تجميع الدُفعات قبل التشغيل) لتجنب الكتابات الصغيرة المتكررة.</li>
</ul></li>
</ul>
<p>عرض توضيحي لإدراج الدُفعات</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> random

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://&lt;Proxy Pod IP&gt;:27017&quot;</span>,
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
<h2 id="Latency" class="common-anchor-header">الكمون<button data-href="#Latency" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker عبارة عن نظام WAL سحابي أصلي مصمم لتخزين الكائنات مع مفاضلات بين الإنتاجية والتكلفة والكمون. يعطي الوضع المدمج خفيف الوزن المدعوم حاليًا الأولوية لتحسين التكلفة والإنتاجية، حيث أن معظم السيناريوهات تتطلب فقط كتابة البيانات في غضون وقت معين بدلاً من المطالبة بزمن انتقال منخفض لطلبات الكتابة الفردية. ولذلك، يستخدم Woodpecker عمليات الكتابة المجمّعة، مع فواصل زمنية افتراضية تبلغ 10 مللي ثانية لعمليات التخزين الخلفية لنظام الملفات المحلي و200 مللي ثانية لعمليات التخزين الخلفية الشبيهة ب MinIO. أثناء عمليات الكتابة البطيئة، يساوي الحد الأقصى لزمن الاستجابة وقت الفاصل الزمني بالإضافة إلى وقت التدفق.</p>
<p>لاحظ أنه لا يتم تشغيل إدخال الدُفعات ليس فقط حسب الفواصل الزمنية ولكن أيضًا حسب حجم الدُفعة، والذي يتم تشغيله افتراضيًا على 2 ميغابايت.</p>
<p>للحصول على تفاصيل حول البنية وأوضاع النشر (MemoryBuffer / QuorumBuffer) والأداء، راجع <a href="/docs/ar/woodpecker_architecture.md">بنية Woodpecker</a>.</p>
<p>لمزيد من تفاصيل المعلمات، راجع <a href="https://github.com/zilliztech/woodpecker">مستودع Woodpecker GitHub</a>.</p>
