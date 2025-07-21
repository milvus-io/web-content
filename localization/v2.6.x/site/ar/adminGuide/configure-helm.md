---
id: configure-helm.md
label: Helm
related_key: configure
summary: تكوين ميلفوس مع مخططات هيلم.
title: تكوين Milvus مع مخططات Helm Charts
---
<h1 id="Configure-Milvus-with-Helm-Charts" class="common-anchor-header">تكوين Milvus مع مخططات Helm Charts<button data-href="#Configure-Milvus-with-Helm-Charts" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الموضوع كيفية تكوين مكونات Milvus وتوابعها التابعة لجهة خارجية مع مخططات Helm.</p>
<div class="alert note">
في الإصدار الحالي، تسري جميع المعلمات فقط بعد إعادة تشغيل Milvus.</div>
<h2 id="Configure-Milvus-via-configuration-file" class="common-anchor-header">تكوين Milvus عبر ملف التكوين<button data-href="#Configure-Milvus-via-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك تكوين Milvus باستخدام ملف تكوين <code translate="no">values.yaml</code>.</p>
<h3 id="Download-a-configuration-file" class="common-anchor-header">تنزيل ملف التكوين</h3><p><a href="https://raw.githubusercontent.com/zilliztech/milvus-helm/master/charts/milvus/values.yaml">قم بتنزيل</a> <code translate="no">values.yaml</code> مباشرة أو باستخدام الأمر التالي.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>wget <span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/raw.githubusercontent.com/milvus</span>-io/milvus-helm/master/charts/milvus/values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Modify-the-configuration-file" class="common-anchor-header">تعديل ملف التكوين</h3><p>قم بتهيئة مثيل ميلفوس الخاص بك ليناسب سيناريوهات تطبيقك من خلال تعديل المعلمات المقابلة في <code translate="no">values.yaml</code>.</p>
<p>على وجه التحديد، ابحث عن <code translate="no">extraConfigFiles</code> في <code translate="no">values.yaml</code> وضع التكوينات الخاصة بك في هذا القسم على النحو التالي:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Extra configs for milvus.yaml</span>
<span class="hljs-comment"># If set, this config will merge into milvus.yaml</span>
<span class="hljs-comment"># Please follow the config structure in the milvus.yaml</span>
<span class="hljs-comment"># at https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml</span>
<span class="hljs-comment"># <span class="hljs-doctag">Note:</span> this config will be the top priority which will override the config</span>
<span class="hljs-comment"># in the image and helm chart.</span>
<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    #    For example to set the graceful time for query nodes
    #    queryNodes:
    #      gracefulTime: 10
</span><button class="copy-code-btn"></button></code></pre>
<p>راجع الروابط التالية لمزيد من المعلومات حول كل معلمة.</p>
<p>مرتبة حسب:</p>
<div class="filter">
<a href="#component">المكونات أو التبعيات</a> <a href="#purpose">أغراض التكوين</a> </div>
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
            <li><a href="/docs/ar/configure_etcd.md">إلخ</a></li>
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
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/ar/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
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
<p>للاطلاع على معلمات أخرى خاصة بتثبيت Kubernetes، راجع <a href="https://github.com/milvus-io/milvus-helm/tree/master/charts/milvus#configuration">تكوين مخطط Milvus Helm البياني</a>.</p>
<h3 id="Start-Milvus" class="common-anchor-header">بدء تشغيل ميلفوس</h3><p>بعد الانتهاء من تعديل ملف التكوين، يمكنك بعد ذلك بدء تشغيل ملف Milvus بالملف.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release milvus/milvus -f values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Milvus-via-command-line" class="common-anchor-header">تكوين ميلفوس عبر سطر الأوامر<button data-href="#Configure-Milvus-via-command-line" class="anchor-icon" translate="no">
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
    </button></h2><p>بدلاً من ذلك، يمكنك ترقية تكوينات ملف Milvus مباشرةً باستخدام أمر Helm.</p>
<h3 id="Check-the-configurable-parameters" class="common-anchor-header">تحقق من المعلمات القابلة للتكوين</h3><p>قبل الترقية، يمكنك التحقق من المعلمات القابلة للتكوين باستخدام مخططات Helm.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm show values milvus/milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Start-Milvus" class="common-anchor-header">بدء تشغيل ميلفوس</h3><p>قم بتكوين وبدء تشغيل Milvus عن طريق إضافة <code translate="no">--values</code> أو <code translate="no">--set</code> في الأمر الخاص بالترقية.</p>
<pre><code translate="no"><span class="hljs-meta prompt_"># </span><span class="language-bash">For instance, upgrade the Milvus cluster with compaction disabled</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> dataCoord.enableCompaction=<span class="hljs-literal">false</span></span>
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
<li>تعلم <a href="/docs/ar/monitor.md">مراقبة Milvus باستخدام مشغل Prometheus على Kubernetes</a></li>
<li>تعلم <a href="/docs/ar/visualize.md">تصور مقاييس ميلفوس في غرافانا</a>.</li>
</ul></li>
<li><p>إذا كنت تبحث عن إرشادات حول كيفية تخصيص الموارد:</p>
<ul>
<li><a href="/docs/ar/allocate.md#standalone">تخصيص الموارد على Kubernetes</a></li>
</ul></li>
</ul>
