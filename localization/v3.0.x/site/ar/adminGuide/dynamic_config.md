---
id: dynamic_config.md
related_key: configure
summary: تعرف على التكوين الديناميكي لـ Milvus.
title: تكوين Milvus أثناء التشغيل
---
<h1 id="Configure-Milvus-on-the-Fly" class="common-anchor-header">تكوين Milvus أثناء التشغيل<button data-href="#Configure-Milvus-on-the-Fly" class="anchor-icon" translate="no">
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
    </button></h1><p>يتيح لك Milvus تغيير بعض إعداداته أثناء التشغيل.</p>
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
    </button></h2><p>تأكد من ما يلي:</p>
<ul>
<li>أن يكون برنامج Birdwatcher مثبتًا. لمزيد من التفاصيل، راجع <a href="/docs/ar/birdwatcher_install_guides.md">تثبيت Birdwatcher،</a></li>
<li>أن برنامج etcdctl مثبت لديك. لمزيد من التفاصيل، راجع <a href="https://etcd.io/docs/v3.5/dev-guide/interacting_v3/">التفاعل مع etcd،</a> أو</li>
<li>أن يكون لديك عملاء etcd آخرون مثبتون، مثل عميل Python.</li>
</ul>
<div class="alert note">
<ul>
<li>تقوم الأمثلة الواردة في هذا الدليل بتغيير قيمة <code translate="no">proxy.minPasswordLength</code> إلى <code translate="no">8</code>. يمكنك استبدال المفتاح بالمفاتيح المناسبة المدرجة في " <a href="/docs/ar/dynamic_config.md#Applicable-configuration-items">عناصر التكوين القابلة للتطبيق</a>".</li>
<li>تفترض الأمثلة الواردة في هذا الدليل أن المسار الجذري لـ Milvus الخاص بك هو <code translate="no">by-dev</code>. جميع التكوينات مدرجة تحت المسار <code translate="no">by-dev/config</code>. يختلف المسار الجذري لـ Milvus باختلاف طريقة تثبيته. بالنسبة للمثيلات المثبتة باستخدام مخططات Helm، يكون المسار الجذري افتراضيًا هو <code translate="no">by-dev</code>. إذا كنت لا تعرف المسار الجذري، فراجع <a href="/docs/ar/birdwatcher_usage_guides.md#Connect-to-etcd">«الاتصال بـ etcd</a>».</li>
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
    </button></h2><p>في Milvus، يتم تعيين <code translate="no">proxy.minPasswordLength</code> على <code translate="no">6</code> افتراضيًا. لتغيير هذه القيمة، يمكنك القيام بما يلي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl put by-dev/config/proxy/minPasswordLength 8</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">or</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,set config-etcd --key by-dev/config/proxy/minPasswordLength --value 8&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>ثم يمكنك التحقق من الإعدادات كما يلي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl get by-dev/config/proxy/minPasswordLength</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Roll-back-configurations" class="common-anchor-header">التراجع عن التكوينات<button data-href="#Roll-back-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>يتيح لك Milvus أيضًا التراجع عن التكوينات في حالة عدم صلاحية القيمة التي تم تغييرها.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl del by-dev/config/proxy/minPasswordLength</span> 
<span class="hljs-meta prompt_"># </span><span class="language-bash">or</span> 
<span class="hljs-meta prompt_">$ </span><span class="language-bash">birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,remove config-etcd --key by-dev/config/proxy/minPasswordLength&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>ثم يمكنك التحقق من الإعدادات على النحو التالي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl get by-dev/config/proxy/minPasswordLength</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="View-configurations" class="common-anchor-header">عرض الإعدادات<button data-href="#View-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>بدلاً من عرض قيمة عنصر تكوين معين، يمكنك أيضًا عرض قائمة بجميع العناصر.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl get --prefix by-dev/config</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">or</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,show config-etcd&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>لعرض إعدادات عقدة معينة:</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect --etcd ip:port 
Milvus(by-dev) &gt; show session          # List all nodes with their server ID
Milvus(by-dev) &gt; visit querycoord 1    # Visit a node by server ID
QueryCoord-1(ip:port) &gt; configuration  # List the configuration of the node
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
    </button></h2><p>حاليًا، يمكنك تغيير عناصر التكوين التالية على الفور.</p>
<table>
<thead>
<tr><th>عنصر التكوين</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td>pulsar.maxMessageSize</td><td>5242880</td></tr>
<tr><td>common.retentionDuration</td><td>86400</td></tr>
<tr><td>common.entityExpiration</td><td>-1</td></tr>
<tr><td>common.gracefulTime</td><td>5000</td></tr>
<tr><td>common.gracefulStopTimeout</td><td>30</td></tr>
<tr><td>quotaAndLimits.ddl.enabled</td><td>خطأ</td></tr>
<tr><td>quotaAndLimits.indexRate.enabled</td><td>خطأ</td></tr>
<tr><td>quotaAndLimits.flushRate.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.compactionRate.enabled</td><td>خطأ</td></tr>
<tr><td>quotaAndLimits.dml.enabled</td><td>خطأ</td></tr>
<tr><td>quotaAndLimits.dql.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limits.collection.maxNum</td><td>64</td></tr>
<tr><td>quotaAndLimits.limitWriting.forceDeny</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitWriting.ttProtection.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</td><td>9223372036854775807</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.enabled</td><td>صحيح</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</td><td>0.85</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</td><td>0.95</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</td><td>0.85</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.مستوى_الذاكرة_الأعلى_لعقدة_الاستعلام</td><td>0.95</td></tr>
<tr><td>quotaAndLimits.limitWriting.diskProtection.enabled</td><td>صحيح</td></tr>
<tr><td>quotaAndLimits.limitWriting.diskProtection.diskQuota</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.forceDeny</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</td><td>9223372036854775807</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.resultProtection.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitReading.resultProtection.maxReadResultRate</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.coolOffSpeed</td><td>0.9</td></tr>
<tr><td>autoIndex.enable</td><td>FALSE</td></tr>
<tr><td>autoIndex.params.build</td><td>“”</td></tr>
<tr><td>autoIndex.params.extra</td><td>“”</td></tr>
<tr><td>autoIndex.params.search</td><td>“”</td></tr>
<tr><td>proxy.maxNameLength</td><td>255</td></tr>
<tr><td>proxy.maxUsernameLength</td><td>32</td></tr>
<tr><td>proxy.minPasswordLength</td><td>6</td></tr>
<tr><td>الحد الأقصى لطول كلمة المرور للوكيل</td><td>72</td></tr>
<tr><td>proxy.maxFieldNum</td><td>64</td></tr>
<tr><td>proxy.maxShardNum</td><td>256</td></tr>
<tr><td>proxy.maxDimension</td><td>32768</td></tr>
<tr><td>proxy.maxUserNum</td><td>100</td></tr>
<tr><td>proxy.maxRoleNum</td><td>10</td></tr>
<tr><td>queryNode.enableDisk</td><td>صحيح</td></tr>
<tr><td>dataCoord.segment.diskSegmentMaxSize</td><td>2048</td></tr>
<tr><td>dataCoord.compaction.enableAutoCompaction</td><td>صحيح</td></tr>
</tbody>
</table>
<h2 id="Whats-next" class="common-anchor-header">الخطوة التالية<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>تعرف على كيفية تكوين Milvus المثبت باستخدام <a href="/docs/ar/configure_operator.md">Milvus Operator</a> <a href="/docs/ar/configure-helm.md">ومخططات Helm</a> <a href="/docs/ar/configure-docker.md">وDocker</a>.</li>
</ul>
