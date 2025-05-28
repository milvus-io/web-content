---
id: configure_operator.md
label: Milvus Operator
related_key: Milvus Operator
summary: تعرف على كيفية تكوين Milvus باستخدام مشغل Milvus.
title: تكوين Milvus باستخدام مشغل Milvus
---
<h1 id="Configure-Milvus-with-Milvus-Operator" class="common-anchor-header">تكوين Milvus باستخدام مشغل Milvus<button data-href="#Configure-Milvus-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>في بيئة الإنتاج، تحتاج إلى تخصيص الموارد لمجموعة Milvus العنقودية استناداً إلى نوع الجهاز وعبء العمل. يمكنك التهيئة أثناء النشر أو تحديث التكوينات أثناء تشغيل المجموعة.</p>
<p>يقدم هذا الموضوع كيفية تكوين مجموعة Milvus العنقودية عند تثبيتها باستخدام مشغل Milvus.</p>
<p>يفترض هذا الموضوع أنك قمت بنشر مشغل Milvus. راجع <a href="/docs/ar/install_cluster-milvusoperator.md">نشر مشغل Milvus</a> لمزيد من المعلومات.</p>
<p>يتضمن تكوين مجموعة Milvus مع مشغل Milvus ما يلي:</p>
<ul>
<li>تكوينات الموارد العامة</li>
<li>تكوينات الموارد الخاصة</li>
</ul>
<div class="alert note">
ستحل تكوينات الموارد الخاصة محل تكوينات الموارد العامة. إذا قمت بتهيئة الموارد بشكل عام وتحديد المورد الخاص لمكون معين في نفس الوقت، فسيقوم المكون بإعطاء الأولوية للتكوينات الخاصة والاستجابة لها أولاً.</div>
<h2 id="Configure-global-resources" class="common-anchor-header">تكوين الموارد العامة<button data-href="#Configure-global-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>عند استخدام مشغّل Milvus لبدء تشغيل مجموعة Milvus، تحتاج إلى تحديد ملف تكوين. يستخدم المثال هنا ملف التكوين الافتراضي.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">apply</span> <span class="hljs-string">-f</span> <span class="hljs-string">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>تفاصيل ملف التكوين كما يلي:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">cluster</span>
  <span class="hljs-attr">dependencies:</span> {}
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}
<button class="copy-code-btn"></button></code></pre>
<p>يتضمن الحقل <code translate="no">spec.components</code> كلاً من تكوين الموارد العامة والخاصة لجميع مكونات Milvus. فيما يلي أربعة حقول شائعة الاستخدام لتكوين المورد العام.</p>
<ul>
<li><code translate="no">image</code>: صورة Milvus docker المستخدمة.</li>
<li><code translate="no">resources</code>: موارد الحوسبة المخصصة لكل مكون.</li>
<li><code translate="no">tolerations</code> و <code translate="no">nodeSelector</code>: قواعد الجدولة لكل مكون Milvus في مجموعة K8s. انظر <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/">التحمل</a> و <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/">nodeSelector</a> لمزيد من المعلومات.</li>
<li><code translate="no">env</code>: متغيرات البيئة.</li>
</ul>
<p>إذا كنت تريد تكوين المزيد من الحقول، راجع الوثائق <a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#ComponentSpec">هنا</a>.</p>
<p>لتكوين مورد عام لمجموعة ميلفوس، قم بإنشاء ملف <code translate="no">milvuscluster_resource.yaml</code>.</p>
<h3 id="Example" class="common-anchor-header">مثال</h3><p>يقوم المثال التالي بتهيئة المورد العام لمجموعة Milvus العنقودية.</p>
<pre><code translate="no"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">cluster</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">nodeSelector:</span> {}
    <span class="hljs-attr">tolerations:</span> {}
    <span class="hljs-attr">env:</span> {}
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">limits:</span>
        <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;4&#x27;</span>
        <span class="hljs-attr">memory:</span> <span class="hljs-string">8Gi</span>
      <span class="hljs-attr">requests:</span>
        <span class="hljs-attr">cpu:</span> <span class="hljs-string">200m</span>
        <span class="hljs-attr">memory:</span> <span class="hljs-string">512Mi</span>
<button class="copy-code-btn"></button></code></pre>
<p>قم بتشغيل الأمر التالي لتطبيق التكوينات الجديدة:</p>
<pre><code translate="no"><span class="hljs-attribute">kubectl</span> apply -f milvuscluster_resource.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
سيتم تحديث موارد المجموعة وفقًا لملف التكوين إذا كان هناك مجموعة Milvus باسم <code translate="no">my-release</code> في مجموعة K8s. خلاف ذلك، سيتم إنشاء مجموعة Milvus جديدة.</div>
<h2 id="Configure-private-resources" class="common-anchor-header">تكوين الموارد الخاصة<button data-href="#Configure-private-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>في الأصل في Milvus 2.0، تتضمن مجموعة Milvus العنقودية في الأصل سبعة مكونات: الوكيل، وتنسيق الجذر، وتنسيق البيانات، وتنسيق البيانات، وتنسيق الاستعلام، وعقدة الفهرس، وعقدة البيانات، وعقدة الاستعلام. ومع ذلك، تم إصدار مكون جديد، وهو تنسيق المزيج، مع Milvus 2.1.0. يتضمن تنسيق المزيج جميع مكونات المنسق. ولذلك، يعني بدء تشغيل تنسيق المزيج أنك لست بحاجة إلى تثبيت وبدء تشغيل المنسقين الآخرين بما في ذلك التنسيق الجذر وتنسيق البيانات وتنسيق الاستعلام.</p>
<p>تتضمن الحقول الشائعة المستخدمة لتكوين كل مكون ما يلي:</p>
<ul>
<li><code translate="no">replica</code>: عدد النسخ المتماثلة لكل مكون.</li>
<li><code translate="no">port</code>: رقم منفذ الاستماع لكل مكون.</li>
<li>الحقول الأربعة شائعة الاستخدام في تكوين الموارد العامة: <code translate="no">image</code> ، <code translate="no">env</code> ، <code translate="no">nodeSelector</code> ، ، <code translate="no">tolerations</code> ، <code translate="no">resources</code> (انظر أعلاه). لمزيد من الحقول القابلة للتكوين، انقر على كل مكون في <a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#MilvusComponents">هذه الوثائق</a>.</li>
</ul>
<div class="alert note">
بالإضافة إلى ذلك، عند تكوين الوكيل، هناك حقل إضافي يسمى "نوع الخدمة". يحدد هذا الحقل نوع الخدمة التي يوفرها ميلفوس في مجموعة K8s.</div>
<p>لتكوين موارد لمكون معين، أضف اسم المكون في الحقل تحت <code translate="no">spec.componets</code> أولاً ثم قم بتكوين موارده الخاصة.</p>
<div class="filter">
 <a href="#purpose">أغراض تكوين</a><a href="#component">المكونات أو التبعيات</a> </div>
<div class="filter-component table-wrapper">
<table id="component">
<thead>
  <tr>
    <th>التبعيات</th>
    <th>المكونات</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
        <ul>
            <li><a href="/docs/ar/configure_etcd.md">إلخd</a></li>
            <li><a href="/docs/ar/configure_minio.md">MinIO أو S3</a></li>
            <li><a href="/docs/ar/configure_pulsar.md">بولسار</a></li>
            <li><a href="/docs/ar/configure_rocksmq.md">RocksMQ</a></li>
        </ul>
    </td>
    <td>
        <ul>
            <li><a href="/docs/ar/configure_rootcoord.md">تنسيق الجذر</a></li>
            <li><a href="/docs/ar/configure_proxy.md">الوكيل</a></li>
            <li><a href="/docs/ar/configure_querycoord.md">تنسيق الاستعلام</a></li>
            <li><a href="/docs/ar/configure_querynode.md">عقدة الاستعلام</a></li>
            <li><a href="/docs/ar/configure_indexnode.md">عقدة الفهرس</a></li>
            <li><a href="/docs/ar/configure_datacoord.md">تنسيق البيانات</a></li>
            <li><a href="/docs/ar/configure_datanode.md">عقدة البيانات</a></li>
            <li><a href="/docs/ar/configure_localstorage.md">التخزين المحلي</a></li>
            <li><a href="/docs/ar/configure_log.md">السجل</a></li>
            <li><a href="/docs/ar/configure_msgchannel.md">قناة الرسائل</a></li>
            <li><a href="/docs/ar/configure_common.md">مشترك</a></li>
            <li><a href="/docs/ar/configure_gpu.md">وحدة معالجة الرسومات</a></li>
            <li><a href="/docs/ar/configure_grpc.md">GRPC</a></li>
            <li><a href="/docs/ar/configure_indexcoord.md">تنسيق الفهرس</a></li>
            <li><a href="/docs/ar/configure_metastore.md">مخزن الميتاستور</a></li>
            <li><a href="/docs/ar/configure_mq.md">قائمة انتظار الرسائل</a></li>
            <li><a href="/docs/ar/configure_natsmq.md">ناتسمك</a></li>
            <li><a href="/docs/ar/configure_tikv.md">تيكف</a></li>
            <li><a href="/docs/ar/configure_trace.md">التتبع</a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md">الحصة والحدود</a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-purpose table-wrapper">
<table id="purpose">
<thead>
  <tr>
    <th>الغرض</th>
    <th>المعلمات</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>ضبط الأداء</td>
    <td>
        <ul>
            <li><a href="/docs/ar/configure_querynode.md#queryNodegracefulTime"><code translate="no">queryNode.gracefulTime</code></a></li>
            <li><a href="/docs/ar/configure_rootcoord.md#rootCoordminSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="/docs/ar/configure_datacoord.md#dataCoordsegmentmaxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
            <li><a href="/docs/ar/configure_datacoord.md#dataCoordsegmentsealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
            <li><a href="/docs/ar/configure_datanode.md#dataNodeflushinsertBufSize"><code translate="no">dataNode.flush.insertBufSize</code></a></li>
            <li><a href="/docs/ar/configure_querycoord.md#queryCoordautoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
            <li><a href="/docs/ar/configure_querycoord.md#queryCoordautoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
            <li><a href="/docs/ar/configure_localstorage.md#localStorageenabled"><code translate="no">localStorage.enabled</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>البيانات والتعريف</td>
    <td>
        <ul>
            <li><a href="/docs/ar/configure_common.md#commonretentionDuration"><code translate="no">common.retentionDuration</code></a></li>
            <li><a href="/docs/ar/configure_rocksmq.md#rocksmqretentionTimeInMinutes"><code translate="no">rocksmq.retentionTimeInMinutes</code></a></li>
            <li><a href="/docs/ar/configure_datacoord.md#dataCoordenableCompaction"><code translate="no">dataCoord.enableCompaction</code></a></li>
            <li><a href="/docs/ar/configure_datacoord.md#dataCoordenableGarbageCollection"><code translate="no">dataCoord.enableGarbageCollection</code></a></li>
            <li><a href="/docs/ar/configure_datacoord.md#dataCoordgcdropTolerance"><code translate="no">dataCoord.gc.dropTolerance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>الإدارة</td>
    <td>
        <ul>
            <li><a href="/docs/ar/configure_log.md#loglevel"><code translate="no">log.level</code></a></li>
            <li><a href="/docs/ar/configure_log.md#logfilerootPath"><code translate="no">log.file.rootPath</code></a></li>
            <li><a href="/docs/ar/configure_log.md#logfilemaxAge"><code translate="no">log.file.maxAge</code></a></li>
            <li><a href="/docs/ar/configure_minio.md#minioaccessKeyID"><code translate="no">minio.accessKeyID</code></a></li>
            <li><a href="/docs/ar/configure_minio.md#miniosecretAccessKey"><code translate="no">minio.secretAccessKey</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>الحصة والحدود</td>
    <td>
        <ul>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitsmaxCollectionNumPerDB"><code translate="no">quotaAndLimits.limits.maxCollectionNumPerDB</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsddlenabled"><code translate="no">quotaAndLimits.ddl.enabled</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsddlcollectionRate"><code translate="no">quotaAndLimits.ddl.collectionRate</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsddlpartitionRate"><code translate="no">quotaAndLimits.ddl.partitionRate</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsindexRateenabled"><code translate="no">quotaAndLimits.indexRate.enabled</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsindexRatemax"><code translate="no">quotaAndLimits.indexRate.max</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsflushRateenabled"><code translate="no">quotaAndLimits.flushRate.enabled</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsflushmax"><code translate="no">quotaAndLimits.flush.max</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitscompationenabled"><code translate="no">quotaAndLimits.compation.enabled</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitscompactionmax"><code translate="no">quotaAndLimits.compaction.max</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsdmlenabled"><code translate="no">quotaAndLimits.dml.enabled</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatemax"><code translate="no">quotaAndLimits.dml.insertRate.max</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatecollectionmax"><code translate="no">quotaAndLimits.dml.insertRate.collection.max</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatecollectionmax"><code translate="no">quotaAndLimits.dml.deleteRate.collection.max</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatecollectionmax"><code translate="no">quotaAndLimits.dql.searchRate.collection.max</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatecollectionmax"><code translate="no">quotaAndLimits.dql.queryRate.collection.max</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuotaPerCollection"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuotaPerCollection</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingforceDeny"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionenabled"><code translate="no">quotaAndLimits.limitReading.queueProtection.enabled</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionnqInQueueThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionqueueLatencyThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionenabled"><code translate="no">quotaAndLimits.limitReading.resultProtection.enabled</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionmaxReadResultRate"><code translate="no">quotaAndLimits.limitReading.resultProtection.maxReadResultRate</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitReadingforceDeny"><code translate="no">quotaAndLimits.limitReading.forceDeny</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Example" class="common-anchor-header">مثال</h3><p>يقوم المثال أدناه بتكوين النسخ المتماثلة وموارد الحوسبة للنسخة المتماثلة وموارد الحوسبة للوكيل وعقدة البيانات في الملف <code translate="no">milvuscluster.yaml</code>.</p>
<pre><code translate="no"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">cluster</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">limits:</span>
        <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;4&#x27;</span>
        <span class="hljs-attr">memory:</span> <span class="hljs-string">8Gi</span>
      <span class="hljs-attr">requests:</span>
        <span class="hljs-attr">cpu:</span> <span class="hljs-string">200m</span>
        <span class="hljs-attr">memory:</span> <span class="hljs-string">512Mi</span>
    <span class="hljs-attr">rootCoord:</span> 
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">port:</span> <span class="hljs-number">8080</span>
      <span class="hljs-attr">resources:</span>
        <span class="hljs-attr">limits:</span>
          <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;6&#x27;</span>
          <span class="hljs-attr">memory:</span> <span class="hljs-string">&#x27;10Gi&#x27;</span>
    <span class="hljs-attr">dataCoord:</span> {}
    <span class="hljs-attr">queryCoord:</span> {}
    <span class="hljs-attr">indexCoord:</span> {}
    <span class="hljs-attr">dataNode:</span> {}
    <span class="hljs-attr">indexNode:</span> {}
    <span class="hljs-attr">queryNode:</span> {}
    <span class="hljs-attr">proxy:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">serviceType:</span> <span class="hljs-string">ClusterIP</span>
      <span class="hljs-attr">resources:</span>
        <span class="hljs-attr">limits:</span>
          <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;2&#x27;</span>
          <span class="hljs-attr">memory:</span> <span class="hljs-string">4Gi</span>
        <span class="hljs-attr">requests:</span>
          <span class="hljs-attr">cpu:</span> <span class="hljs-string">100m</span>
          <span class="hljs-attr">memory:</span> <span class="hljs-string">128Mi</span>
  <span class="hljs-attr">config:</span> {}
  <span class="hljs-attr">dependencies:</span> {}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
لا يقوم هذا المثال بتكوين ليس فقط الموارد العامة ولكن أيضًا موارد الحوسبة الخاصة للنسخة المتماثلة الجذرية والوكيل. عند استخدام ملف التكوين هذا لبدء تشغيل مجموعة Milvus، سيتم تطبيق تكوينات الموارد الخاصة على التنسيق الجذر والوكيل، بينما ستتبع بقية المكونات تكوين الموارد العامة.</div>
<p>قم بتشغيل الأمر التالي لتطبيق التكوينات الجديدة:</p>
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
    </button></h2><ul>
<li>تعلم كيفية إدارة تبعيات ميلفوس التالية باستخدام مشغل ميلفوس:<ul>
<li><a href="/docs/ar/object_storage_operator.md">تكوين تخزين الكائنات باستخدام مشغل Milvus</a></li>
<li><a href="/docs/ar/meta_storage_operator.md">تكوين التخزين التعريفي باستخدام مشغل Milvus</a></li>
<li><a href="/docs/ar/message_storage_operator.md">تكوين تخزين الرسائل باستخدام مشغل Milvus</a></li>
</ul></li>
</ul>
