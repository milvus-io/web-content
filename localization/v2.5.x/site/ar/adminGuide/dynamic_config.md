---
id: dynamic_config.md
related_key: configure
summary: تعرف على التكوين الديناميكي لميلفوس.
title: تكوين ميلفوس أثناء التنقل
---
<h1 id="Configure-Milvus-on-the-Fly" class="common-anchor-header">تكوين ميلفوس أثناء التنقل<button data-href="#Configure-Milvus-on-the-Fly" class="anchor-icon" translate="no">
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
    </button></h1><p>يسمح لك Milvus بتغيير بعض تكويناته أثناء التنقل.</p>
<h2 id="Before-you-start" class="common-anchor-header">قبل البدء<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>تحتاج إلى التأكد من أن: ：</p>
<ul>
<li>لديك برنامج Birdwatcher مثبتاً. لمزيد من التفاصيل، راجع <a href="/docs/ar/birdwatcher_install_guides.md">تثبيت Birdwatcher</a>,</li>
<li>لديك برنامج إلخdctl مثبت لديك. لمزيد من التفاصيل، راجع <a href="https://etcd.io/docs/v3.5/dev-guide/interacting_v3/">التفاعل مع إلخ</a>d، أو</li>
<li>إذا كان لديك عملاء آخرين لـ etcd، مثل عميل Python، مثبتين.</li>
</ul>
<div class="alert note">
<ul>
<li>تقوم الأمثلة في هذا الدليل بتغيير قيمة <code translate="no">proxy.minPasswordLength</code> إلى <code translate="no">8</code>. يمكنك استبدال المفتاح بالمفاتيح القابلة للتطبيق المدرجة في <a href="/docs/ar/dynamic_config.md#Applicable-configuration-items">عناصر التكوين القابلة للتطبيق</a>.</li>
<li>تفترض الأمثلة في هذا الدليل أن المسار الجذر لـ Milvus الخاص بك هو <code translate="no">by-dev</code>. جميع التكوينات مدرجة تحت المسار <code translate="no">by-dev/config</code>. يختلف مسار جذر Milvus باختلاف طريقة تثبيته. بالنسبة للمثيلات المثبتة باستخدام مخططات Helm، يتم تعيين المسار الجذر افتراضيًا إلى <code translate="no">by-dev</code>. إذا كنت لا تعرف المسار الجذر، فارجع إلى <a href="/docs/ar/birdwatcher_usage_guides.md#Connect-to-etcd">الاتصال بـ etcd</a>.</li>
</ul>
</div>
<h2 id="Change-configurations" class="common-anchor-header">تغيير التكوينات<button data-href="#Change-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>في ميلفوس، يتم تعيين <code translate="no">proxy.minPasswordLength</code> على <code translate="no">6</code> افتراضيًا. لتغيير هذه القيمة، يمكنك القيام بما يلي:</p>
<pre><code translate="no" class="language-shell">$ etcdctl put by-dev/config/proxy/minPasswordLength 8
<span class="hljs-comment"># or</span>
$ birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,set config-etcd --key by-dev/config/proxy/minPasswordLength --value 8&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>ثم يمكنك التحقق من التكوينات على النحو التالي:</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">get</span> <span class="hljs-keyword">by</span>-dev/config/proxy/minPasswordLength
<button class="copy-code-btn"></button></code></pre>
<h2 id="Roll-back-configurations" class="common-anchor-header">استرجاع التكوينات<button data-href="#Roll-back-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>يسمح لك Milvus أيضاً باستعادة التكوينات الخاصة بك في حال لم تعد القيمة التي تم تغييرها سارية.</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">del</span> by-dev/config/proxy/minPasswordLength 
<span class="hljs-comment"># or </span>
$ birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,remove config-etcd --key by-dev/config/proxy/minPasswordLength&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>ثم يمكنك التحقق من التكوينات على النحو التالي:</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">get</span> <span class="hljs-keyword">by</span>-dev/config/proxy/minPasswordLength
<button class="copy-code-btn"></button></code></pre>
<h2 id="View-configurations" class="common-anchor-header">عرض التكوينات<button data-href="#View-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>بدلاً من عرض قيمة عنصر تكوين معين، يمكنك أيضاً سرد جميع التكوينات.</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">get</span> --prefix <span class="hljs-keyword">by</span>-dev/config
<span class="hljs-meta"># or</span>
$ birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,show config-etcd&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لعرض تكوينات عقدة محددة:</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect --etcd ip:port 
Milvus(by-dev) &gt; show session          <span class="hljs-comment"># List all nodes with their server ID</span>
Milvus(by-dev) &gt; visit querycoord <span class="hljs-number">1</span>    <span class="hljs-comment"># Visit a node by server ID</span>
QueryCoord-<span class="hljs-number">1</span>(ip:port) &gt; configuration  <span class="hljs-comment"># List the configuration of the node</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Applicable-configuration-items" class="common-anchor-header">عناصر التكوين القابلة للتطبيق<button data-href="#Applicable-configuration-items" class="anchor-icon" translate="no">
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
    </button></h2><p>في الوقت الحالي، يمكنك تغيير عناصر التكوين التالية بشكل سريع.</p>
<table>
<thead>
<tr><th>عنصر التكوين</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td>pulsar.maxMessageSize</td><td>5242880</td></tr>
<tr><td>شائع.مدة الاحتفاظ</td><td>86400</td></tr>
<tr><td>شائع.entityExpiration</td><td>-1</td></tr>
<tr><td>الوقت الشائع.gracefulTime</td><td>5000</td></tr>
<tr><td>شائع.gracefulStopTimeTimeout</td><td>30</td></tr>
<tr><td>quotaAndLimits.ddl.enabled</td><td>FALSE</td></tr>
<tr><td>تم تمكين quotaAndLimits.indexRate.enabled</td><td>FALSE</td></tr>
<tr><td>تم تمكين quotaAndLimits.flushRate.enabled</td><td>FALSE</td></tr>
<tr><td>تم تمكين quotaAndLimits.compactionRate.enabled</td><td>FALSE</td></tr>
<tr><td>تم تمكين quotaAndLimits.dml.enabled</td><td>FALSE</td></tr>
<tr><td>تم تمكين quotaAndLimits.dql.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limits.collection.maxNum</td><td>64</td></tr>
<tr><td>quotaAndLimits.limitWriting.forceDeny.forceDeny</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitWriting.ttProtection.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitWriting.ttProtection.maxTimeTickTickDelay</td><td>9223372036854775807</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.enabled</td><td>TRUE</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</td><td>0.85</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</td><td>0.95</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</td><td>0.85</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</td><td>0.95</td></tr>
<tr><td>quotaAndLimits.limitWriting.diskProtection.enabled</td><td>TRUE</td></tr>
<tr><td>quotaAndLimits.limitWriting.diskProtection.diskQuota</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.forceDeny.forceDeny</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</td><td>9223372036854775807</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.resultProtection.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitReading.resultProtection.maxReadResultRate</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.coolOffSpeed</td><td>0.9</td></tr>
<tr><td>تمكين الفهرس التلقائي</td><td>FALSE</td></tr>
<tr><td>بناء الفهرس التلقائي</td><td>""</td></tr>
<tr><td>autoIndex.params.extra</td><td>""</td></tr>
<tr><td>بحث.بارامز.بارامز.بحث</td><td>""</td></tr>
<tr><td>proxy.maxNameLength</td><td>255</td></tr>
<tr><td>proxy.maxUsernameLength.maxUsernameLength</td><td>32</td></tr>
<tr><td>الحد الأدنى لطول كلمة المرور</td><td>6</td></tr>
<tr><td>الحد الأقصى لطول كلمة المرور</td><td>256</td></tr>
<tr><td>proxy.maxFieldNum</td><td>64</td></tr>
<tr><td>proxy.maxShardNum</td><td>256</td></tr>
<tr><td>proxy.maxDimension</td><td>32768</td></tr>
<tr><td>proxy.maxUserNum</td><td>100</td></tr>
<tr><td>proxy.maxRoleNum</td><td>10</td></tr>
<tr><td>queryNode.enableDisk</td><td>TRUE</td></tr>
<tr><td>dataCoord.segment.diskSegmentMaxSize</td><td>2048</td></tr>
<tr><td>dataCoord.compaction.enableAutoCompaction</td><td>صحيح</td></tr>
</tbody>
</table>
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
<li>تعرف على المزيد حول <a href="/docs/ar/system_configuration.md">تكوينات النظام</a>.</li>
<li>تعرف على كيفية تكوين Milvus المثبت باستخدام <a href="/docs/ar/configure_operator.md">مشغل Milvus</a> <a href="/docs/ar/configure-helm.md">ومخططات Helm</a> <a href="/docs/ar/configure-docker.md">وDocker</a>.</li>
</ul>
