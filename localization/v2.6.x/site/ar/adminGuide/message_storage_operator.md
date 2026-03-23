---
id: message_storage_operator.md
title: تكوين تخزين الرسائل مع مشغل Milvus
related_key: 'minio, s3, storage, etcd, pulsar'
summary: تعرف على كيفية تكوين تخزين الرسائل باستخدام مشغل Milvus.
---
<h1 id="Configure-Message-Storage-with-Milvus-Operator" class="common-anchor-header">تكوين تخزين الرسائل مع مشغل Milvus<button data-href="#Configure-Message-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>يستخدم Milvus RocksMQ أو Pulsar أو Kafka لإدارة سجلات التغييرات الأخيرة، وإخراج سجلات الدفق، وتوفير اشتراكات السجل. يقدم هذا الموضوع كيفية تكوين تبعيات تخزين الرسائل عند تثبيت Milvus مع مشغل Milvus. لمزيد من التفاصيل، راجع <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md">تكوين تخزين الرسائل مع</a> مشغل Milvus في مستودع مشغل Milvus.</p>
<p>يفترض هذا الموضوع أنك قمت بنشر مشغل Milvus.</p>
<div class="alert note">راجع <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">نشر مشغل Milvus</a> لمزيد من المعلومات. </div>
<p>تحتاج إلى تحديد ملف تكوين لاستخدام مشغل Milvus لبدء تشغيل مجموعة Milvus.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-string">kubectl</span> <span class="hljs-string">apply</span> <span class="hljs-string">-f</span> <span class="hljs-string">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>تحتاج فقط إلى تحرير قالب التعليمات البرمجية في <code translate="no">milvus_cluster_default.yaml</code> لتكوين تبعيات الطرف الثالث. تقدم الأقسام التالية كيفية تكوين تخزين الكائنات و etcd وPulsar على التوالي.</p>
<h2 id="Before-you-begin" class="common-anchor-header">قبل أن تبدأ<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح الجدول أدناه ما إذا كانت RocksMQ و Pulsar و Kafka و Woodpecker مدعومة في وضع Milvus المستقل ووضع المجموعة.</p>
<table>
<thead>
<tr><th style="text-align:center"></th><th style="text-align:center">RocksMQ</th><th style="text-align:center">بولسار</th><th style="text-align:center">كافكا</th><th style="text-align:center">نقار الخشب</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">الوضع المستقل</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
<tr><td style="text-align:center">الوضع العنقودي</td><td style="text-align:center">✖️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>هناك أيضًا قيود أخرى لتحديد تخزين الرسائل:</p>
<ul>
<li>يتم دعم مخزن رسائل واحد فقط لمثيل Milvus واحد. ومع ذلك لا يزال لدينا توافق مع الإصدارات السابقة مع تعيين مخازن رسائل متعددة لمثيل واحد. الأولوية كما يلي:<ul>
<li>الوضع المستقل:  RocksMQ (افتراضي)&gt; بولسار &gt; كافكا</li>
<li>الوضع العنقودي: بولسار (افتراضي)&gt; كافكا &gt; كافكا</li>
</ul></li>
<li>لا يمكن تغيير تخزين الرسائل أثناء تشغيل نظام Milvus.</li>
<li>يتم دعم إصدار Kafka 2.x أو 3.x فقط.</li>
<li><strong>قيود الترقية</strong>: <strong>قيود قائمة انتظار الرسائل</strong>: عند الترقية إلى الإصدار 2.6.13 من Milvus، يجب الحفاظ على اختيار قائمة انتظار الرسائل الحالية. التبديل بين أنظمة طابور الرسائل المختلفة أثناء الترقية غير مدعوم. سيتوفر دعم تغيير أنظمة قائمة انتظار الرسائل في الإصدارات المستقبلية.</li>
</ul>
<h2 id="Configure-RocksMQ" class="common-anchor-header">تكوين RocksMQ<button data-href="#Configure-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><p>RocksMQ هو التخزين الافتراضي للرسائل في نظام Milvus المستقل.</p>
<div class="alert note">
<p>وحالياً، يمكنك فقط تكوين RocksMQ كمخزن للرسائل في نظام Milvus المستقل مع مشغل Milvus.</p>
</div>
<h4 id="Example" class="common-anchor-header">مثال</h4><p>يقوم المثال التالي بتكوين خدمة RocksMQ.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">standalone</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">rocksmq</span>
    <span class="hljs-attr">rocksmq:</span>
      <span class="hljs-attr">persistence:</span>
        <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">true</span>
        <span class="hljs-attr">persistentVolumeClaim:</span>
          <span class="hljs-attr">spec:</span>
            <span class="hljs-attr">accessModes:</span> [<span class="hljs-string">&quot;ReadWriteOnce&quot;</span>]
            <span class="hljs-attr">storageClassName:</span> <span class="hljs-string">&quot;local-path&quot;</span>  <span class="hljs-comment"># Specify your storage class</span>
            <span class="hljs-attr">resources:</span>
              <span class="hljs-attr">requests:</span>
                <span class="hljs-attr">storage:</span> <span class="hljs-string">10Gi</span>  <span class="hljs-comment"># Specify your desired storage size</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}
<button class="copy-code-btn"></button></code></pre>
<h5 id="Key-configuration-options" class="common-anchor-header">خيارات التكوين الرئيسية:</h5><ul>
<li><code translate="no">msgStreamType</code>:: rocksmq: يقوم بتعيين RocksMQ بشكل صريح كقائمة انتظار الرسائل</li>
<li><code translate="no">persistence.enabled</code>: تمكين التخزين الدائم لبيانات RocksMQ.</li>
<li><code translate="no">persistence.pvcDeletion</code>: عندما يكون صحيحًا، سيتم حذف PVC عندما يتم حذف مثيل Milvus</li>
<li><code translate="no">persistentVolumeClaim.spec</code>: مواصفات Kubernetes PVC القياسية</li>
<li><code translate="no">accessModes</code>: عادةً <code translate="no">ReadWriteOnce</code> لتخزين الكتل</li>
<li><code translate="no">storageClassName</code>: فئة التخزين الخاصة بمجموعتك</li>
<li><code translate="no">storage</code>: حجم وحدة التخزين الثابتة</li>
</ul>
<h2 id="Configure-Woodpecker" class="common-anchor-header">تكوين Woodpecker<button data-href="#Configure-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker هو سجل كتابة أمامي سحابي أصلي (WAL) مصمم لتخزين الكائنات. وهو يوفر إنتاجية عالية، ونفقات تشغيلية منخفضة، وقابلية توسع سلسة. لمزيد من التفاصيل، راجع <a href="/docs/ar/use-woodpecker.md">استخدام Woodpecker</a>.</p>
<h2 id="Configure-Pulsar" class="common-anchor-header">تكوين بولسار<button data-href="#Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>يدير Pulsar سجلات التغييرات الأخيرة، ويخرج سجلات الدفق، ويوفر اشتراكات السجل. يتم دعم تكوين Pulsar لتخزين الرسائل في كل من Milvus المستقل و Milvus cluster. ومع ذلك، مع مشغل Milvus، يمكنك فقط تكوين Pulsar كمخزن للرسائل لمجموعة Milvus العنقودية. أضف الحقول المطلوبة ضمن <code translate="no">spec.dependencies.pulsar</code> لتكوين Pulsar.</p>
<p><code translate="no">pulsar</code> يدعم <code translate="no">external</code> و <code translate="no">inCluster</code>.</p>
<h3 id="External-Pulsar" class="common-anchor-header">بولسار خارجي<button data-href="#External-Pulsar" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">external</code> يشير إلى استخدام خدمة بولسار خارجية. تتضمن الحقول المستخدمة لتكوين خدمة بولسار خارجية ما يلي:</p>
<ul>
<li><code translate="no">external</code>:  تشير القيمة <code translate="no">true</code> إلى أن ميلفوس يستخدم خدمة بولسار خارجية.</li>
<li><code translate="no">endpoints</code>: نقاط نهاية بولسار.</li>
</ul>
<h4 id="Example" class="common-anchor-header">مثال</h4><p>يقوم المثال التالي بتكوين خدمة بولسار خارجية.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span> <span class="hljs-comment"># Optional</span>
    <span class="hljs-attr">pulsar:</span> <span class="hljs-comment"># Optional</span>
      <span class="hljs-comment"># Whether (=true) to use an existed external pulsar as specified in the field endpoints or </span>
      <span class="hljs-comment"># (=false) create a new pulsar inside the same kubernetes cluster for milvus.</span>
      <span class="hljs-attr">external:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Optional default=false</span>
      <span class="hljs-comment"># The external pulsar endpoints if external=true</span>
      <span class="hljs-attr">endpoints:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span><span class="hljs-string">:6650</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}           
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-Pulsar" class="common-anchor-header">بولسار داخلي<button data-href="#Internal-Pulsar" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">inCluster</code> يشير إلى أنه عند بدء تشغيل مجموعة Milvus، تبدأ خدمة Pulsar تلقائياً في المجموعة.</p>
<h4 id="Example" class="common-anchor-header">مثال</h4><p>يقوم المثال التالي بتكوين خدمة Pulsar داخلية.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">pulsar:</span>
      <span class="hljs-attr">inCluster:</span>
        <span class="hljs-attr">values:</span>
          <span class="hljs-attr">components:</span>
            <span class="hljs-attr">autorecovery:</span> <span class="hljs-literal">false</span>
          <span class="hljs-attr">zookeeper:</span>
            <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">1</span>
          <span class="hljs-attr">bookkeeper:</span>
            <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">1</span>
            <span class="hljs-attr">resoureces:</span>
              <span class="hljs-attr">limit:</span>
                <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;4&#x27;</span>
              <span class="hljs-attr">memory:</span> <span class="hljs-string">8Gi</span>
            <span class="hljs-attr">requests:</span>
              <span class="hljs-attr">cpu:</span> <span class="hljs-string">200m</span>
              <span class="hljs-attr">memory:</span> <span class="hljs-string">512Mi</span>
          <span class="hljs-attr">broker:</span>
            <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">1</span>
            <span class="hljs-attr">configData:</span>
              <span class="hljs-comment">## Enable `autoSkipNonRecoverableData` since bookkeeper is running</span>
              <span class="hljs-comment">## without persistence</span>
              <span class="hljs-attr">autoSkipNonRecoverableData:</span> <span class="hljs-string">&quot;true&quot;</span>
              <span class="hljs-attr">managedLedgerDefaultEnsembleSize:</span> <span class="hljs-string">&quot;1&quot;</span>
              <span class="hljs-attr">managedLedgerDefaultWriteQuorum:</span> <span class="hljs-string">&quot;1&quot;</span>
              <span class="hljs-attr">managedLedgerDefaultAckQuorum:</span> <span class="hljs-string">&quot;1&quot;</span>
          <span class="hljs-attr">proxy:</span>
            <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}            
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">يحدد هذا المثال أعداد النسخ المتماثلة لكل مكون من مكونات Pulsar، وموارد الحوسبة الخاصة ب Pulsar BookKeeper، وتكوينات أخرى.</div>
<div class="alert note">ابحث عن عناصر التكوين الكاملة لتكوين خدمة Pulsar الداخلية في <a href="https://artifacthub.io/packages/helm/apache/pulsar/2.7.8?modal=values">القيم.yaml.</a> أضف عناصر التكوين حسب الحاجة ضمن <code translate="no">pulsar.inCluster.values</code> كما هو موضح في المثال السابق.</div>
<p>بافتراض أن ملف التكوين اسمه <code translate="no">milvuscluster.yaml</code> ، قم بتشغيل الأمر التالي لتطبيق التكوين.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka" class="common-anchor-header">تكوين كافكا<button data-href="#Configure-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar هو مخزن الرسائل الافتراضي في مجموعة Milvus. إذا كنت تريد استخدام كافكا، أضف الحقل الاختياري <code translate="no">msgStreamType</code> لتكوين كافكا.</p>
<p><code translate="no">kafka</code> يدعم <code translate="no">external</code> و <code translate="no">inCluster</code>.</p>
<h3 id="External-Kafka" class="common-anchor-header">كافكا الخارجية<button data-href="#External-Kafka" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">external</code> يشير إلى استخدام خدمة كافكا خارجية.</p>
<p>تتضمن الحقول المستخدمة لتكوين خدمة كافكا خارجية ما يلي:</p>
<ul>
<li><code translate="no">external</code>: تشير القيمة <code translate="no">true</code> إلى أن ميلفوس يستخدم خدمة كافكا خارجية.</li>
<li><code translate="no">brokerList</code>: قائمة الوسطاء لإرسال الرسائل إليهم.</li>
</ul>
<h4 id="Example" class="common-anchor-header">مثال</h4><p>يقوم المثال التالي بتكوين خدمة كافكا خارجية.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-comment"># securityProtocol supports: PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL </span>
      <span class="hljs-attr">securityProtocol:</span> <span class="hljs-string">PLAINTEXT</span>
      <span class="hljs-comment"># saslMechanisms supports: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512</span>
      <span class="hljs-attr">saslMechanisms:</span> <span class="hljs-string">PLAIN</span>
      <span class="hljs-attr">saslUsername:</span> <span class="hljs-string">&quot;&quot;</span>
      <span class="hljs-attr">saslPassword:</span> <span class="hljs-string">&quot;&quot;</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-comment"># Omit other fields ...</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">&quot;kafka&quot;</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-attr">external:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">brokerList:</span> 
        <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;kafkaBrokerAddr1:9092&quot;</span>
        <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;kafkaBrokerAddr2:9092&quot;</span>
        <span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>يتم دعم تكوينات SASL في المشغل الإصدار 0.8.5 أو إصدار أعلى.</p>
</blockquote>
<h3 id="Internal-Kafka" class="common-anchor-header">كافكا الداخلية<button data-href="#Internal-Kafka" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">inCluster</code> يشير إلى أنه عند بدء تشغيل مجموعة Milvus، تبدأ خدمة كافكا تلقائيًا في المجموعة.</p>
<h4 id="Example" class="common-anchor-header">مثال</h4><p>يقوم المثال التالي بتكوين خدمة كافكا داخلية.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span> 
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">&quot;kafka&quot;</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-attr">inCluster:</span> 
        <span class="hljs-attr">values:</span> {} <span class="hljs-comment"># values can be found in https://artifacthub.io/packages/helm/bitnami/kafka</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}
<button class="copy-code-btn"></button></code></pre>
<p>ابحث عن عناصر التكوين الكاملة لتكوين خدمة كافكا الداخلية <a href="https://artifacthub.io/packages/helm/bitnami/kafka">هنا</a>. أضف عناصر التكوين حسب الحاجة ضمن <code translate="no">kafka.inCluster.values</code>.</p>
<p>على افتراض أن ملف التكوين اسمه <code translate="no">milvuscluster.yaml</code> ، قم بتشغيل الأمر التالي لتطبيق التكوين.</p>
<pre><code translate="no"><span class="hljs-attribute">kubectl</span> apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">ما التالي<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>تعرف على كيفية تكوين تبعيات Milvus الأخرى باستخدام مشغل Milvus:</p>
<ul>
<li><a href="/docs/ar/object_storage_operator.md">تكوين تخزين الكائنات باستخدام مشغل Milvus</a></li>
<li><a href="/docs/ar/meta_storage_operator.md">تكوين التخزين التعريفي باستخدام مشغل Milvus</a></li>
</ul>
