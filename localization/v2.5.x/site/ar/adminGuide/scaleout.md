---
id: scaleout.md
related_key: scale Milvus cluster
summary: >-
  تعرف على كيفية توسيع النطاق يدويًا أو تلقائيًا وتوسيع نطاقه في مجموعة Milvus
  العنقودية.
title: توسيع نطاق مجموعة ميلفوس العنقودية
---

<h1 id="Scale-a-Milvus-Cluster" class="common-anchor-header">توسيع نطاق مجموعة ميلفوس العنقودية<button data-href="#Scale-a-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>يدعم Milvus التوسع الأفقي لمكوناته. هذا يعني أنه يمكنك إما زيادة أو تقليل عدد العُقد العاملة من كل نوع وفقًا لحاجتك الخاصة.</p>
<p>يصف هذا الموضوع كيفية توسيع نطاق مجموعة Milvus وتوسيع نطاقها. نفترض أنك قد قمت بالفعل <a href="/docs/ar/v2.5.x/install_cluster-helm.md">بتثبيت مجموعة Milvus</a> قبل التوسع. نوصي أيضًا بالتعرف على <a href="/docs/ar/v2.5.x/architecture_overview.md">بنية Milvus</a> قبل البدء.</p>
<p>يأخذ هذا البرنامج التعليمي توسيع نطاق ثلاث عقد استعلام كمثال. لتوسيع نطاق أنواع أخرى من العُقد، استبدل <code translate="no">queryNode</code> بنوع العقدة المطابق في سطر الأوامر.</p>
<div class="alert note">
<p>للحصول على معلومات حول كيفية توسيع نطاق مجموعة باستخدام مشغل Milvus، راجع <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/scale-a-milvus-cluster.md">توسيع نطاق مجموعة باستخدام مشغل Milvus</a>.</p>
</div>
<h2 id="What-is-horizontal-scaling" class="common-anchor-header">ما هو القياس الأفقي؟<button data-href="#What-is-horizontal-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>يتضمن التوسع الأفقي التوسع للخارج والتوسع للداخل.</p>
<h3 id="Scaling-out" class="common-anchor-header">التوسع للخارج</h3><p>يشير توسيع النطاق إلى زيادة عدد العقد في المجموعة. على عكس التوسع، لا يتطلب توسيع النطاق إلى الخارج تخصيص المزيد من الموارد لعقدة واحدة في المجموعة. بدلاً من ذلك، يعمل توسيع النطاق على توسيع الكتلة أفقياً عن طريق إضافة المزيد من العقد.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/scale_out.jpg" alt="Scaleout" class="doc-image" id="scaleout" />
   </span> <span class="img-wrapper"> <span>توسيع النطاق</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/scale_up.jpg" alt="Scaleup" class="doc-image" id="scaleup" />
   </span> <span class="img-wrapper"> <span>توسيع النطاق</span> </span></p>
<p>وفقًا <a href="/docs/ar/v2.5.x/architecture_overview.md">لبنية Milvus،</a> تتضمن العقد العاملة عديمة الحالة عقدة الاستعلام وعقدة البيانات وعقدة الفهرس والوكيل. لذلك، يمكنك توسيع نطاق هذه الأنواع من العقد لتناسب احتياجات عملك وسيناريوهات التطبيق. يمكنك إما توسيع نطاق مجموعة Milvus يدويًا أو تلقائيًا.</p>
<p>بشكل عام، ستحتاج بشكل عام إلى توسيع نطاق مجموعة Milvus التي قمت بإنشائها إذا تم استخدامها بشكل مفرط. فيما يلي بعض المواقف النموذجية التي قد تحتاج فيها إلى توسيع نطاق مجموعة Milvus:</p>
<ul>
<li>ارتفاع استخدام وحدة المعالجة المركزية والذاكرة لفترة من الزمن.</li>
<li>يصبح إنتاجية الاستعلام أعلى.</li>
<li>مطلوب سرعة أعلى للفهرسة.</li>
<li>الحاجة إلى معالجة كميات هائلة من مجموعات البيانات الكبيرة.</li>
<li>يجب ضمان التوافر العالي لخدمة Milvus.</li>
</ul>
<h3 id="Scaling-in" class="common-anchor-header">التوسع في</h3><p>يشير التوسع في إلى تقليل عدد العقد في المجموعة. بشكل عام، ستحتاج إلى التوسع في مجموعة ميلفوس التي قمت بإنشائها إذا كانت غير مستغلة بشكل كافٍ. فيما يلي بعض المواقف النموذجية التي تحتاج فيها إلى التوسع في مجموعة Milvus العنقودية:</p>
<ul>
<li>انخفاض استخدام وحدة المعالجة المركزية والذاكرة لفترة من الزمن.</li>
<li>يصبح إنتاجية الاستعلام أقل.</li>
<li>سرعة أعلى للفهرسة غير مطلوبة.</li>
<li>حجم مجموعة البيانات المراد معالجتها صغير.</li>
</ul>
<div class="alert note">
لا نوصي بتقليل عدد عقد العمال بشكل كبير. على سبيل المثال، إذا كان هناك خمس عقد بيانات في المجموعة، نوصي بتقليل عقدة بيانات واحدة في كل مرة لضمان توافر الخدمة. إذا كانت الخدمة متوفرة بعد المحاولة الأولى للتوسع، يمكنك الاستمرار في تقليل عدد عقدة البيانات بشكل أكبر.</div>
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
    </button></h2><p>قم بتشغيل <code translate="no">kubectl get pods</code> للحصول على قائمة بالمكونات وحالة عملها في مجموعة Milvus التي قمت بإنشائها.</p>
<pre><code translate="no">NAME                                            READY   STATUS       RESTARTS   AGE
my-release-etcd-0                               1/1     Running      0          1m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running      0          1m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running      0          1m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running      0          1m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running      0          1m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running      0          1m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running      0          1m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running      0          1m
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running      0          1m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running      0          1m
my-release-minio-5564fbbddc-9sbgv               1/1     Running      0          1m 
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
يدعم Milvus إضافة العقد العاملة فقط ولا يدعم إضافة مكونات المنسق.</div>
<h2 id="Scale-a-Milvus-cluster" class="common-anchor-header">توسيع نطاق مجموعة Milvus<button data-href="#Scale-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك توسيع نطاق مجموعة Milvus إما يدويًا أو تلقائيًا. للتوسع التلقائي باستخدام التحجيم التلقائي للقرنة الأفقية (HPA)، راجع <a href="/docs/ar/v2.5.x/hpa.md">تكوين HPA لـ Milvus</a>. إذا تم تمكين القياس التلقائي، فإن مجموعة Milvus ستتقلص أو تتوسع تلقائيًا عندما يصل استهلاك موارد وحدة المعالجة المركزية والذاكرة إلى القيمة التي قمت بتعيينها.</p>
<p>في الوقت الحالي، يدعم Milvus 2.1.0 حاليًا التوسيع والتوسع يدويًا فقط.</p>
<h4 id="Scaling-out" class="common-anchor-header">توسيع النطاق</h4><p>قم بتشغيل <code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=3 --reuse-values</code> لتوسيع نطاق عقدة الاستعلام يدويًا.</p>
<p>إذا نجحت، تتم إضافة ثلاث كبسولات قيد التشغيل على عقدة الاستعلام كما هو موضح في المثال التالي.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          2m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running   0          2m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running   0          2m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running   0          2m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running   0          2m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running   0          2m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running   0          2m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running   0          2m
my-release-milvus-querynode-7c7779c6f8-czq9f    1/1     Running   0          5s
my-release-milvus-querynode-7c7779c6f8-jcdcn    1/1     Running   0          5s
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running   0          2m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running   0          2m
my-release-minio-5564fbbddc-9sbgv               1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<h4 id="Scaling-in" class="common-anchor-header">توسيع النطاق</h4><p>قم بتشغيل <code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=1 --reuse-values</code> لتوسيع نطاق عقدة الاستعلام.</p>
<p>إذا نجحت، يتم تقليل ثلاث كبسولات قيد التشغيل على عقدة الاستعلام إلى واحدة كما هو موضح في المثال التالي.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          2m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running   0          2m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running   0          2m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running   0          2m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running   0          2m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running   0          2m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running   0          2m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running   0          2m
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running   0          2m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running   0          2m
my-release-minio-5564fbbddc-9sbgv               1/1     Running   0          2m
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
    </button></h2><ul>
<li><p>إذا كنت تريد معرفة كيفية مراقبة خدمات ملفوس وإنشاء التنبيهات:</p>
<ul>
<li>تعلم <a href="/docs/ar/v2.5.x/monitor.md">مراقبة Milvus باستخدام مشغل Prometheus على Kubernetes</a></li>
</ul></li>
<li><p>إذا كنت مستعداً لنشر مجموعتك على السحابة</p>
<ul>
<li>تعرف على كيفية <a href="/docs/ar/v2.5.x/eks.md">نشر Milvus على Amazon EKS باستخدام Terraform</a></li>
<li>تعرف على كيفية <a href="/docs/ar/v2.5.x/gcp.md">نشر مجموعة Milvus العنقودية على GCP باستخدام Kubernetes</a></li>
<li>تعرف على كيفية <a href="/docs/ar/v2.5.x/azure.md">نشر ميلفوس على مايكروسوفت أزور باستخدام Kubernetes</a></li>
</ul></li>
<li><p>إذا كنت تبحث عن إرشادات حول كيفية تخصيص الموارد:</p>
<ul>
<li><a href="/docs/ar/v2.5.x/allocate.md#standalone">تخصيص الموارد على Kubernetes</a></li>
</ul></li>
</ul>
