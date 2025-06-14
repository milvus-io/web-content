---
id: coordinator_ha.md
summary: تعرف على دوافع وإجراءات عمل منسقي ميلفوس في وضع الاستعداد النشط.
title: المنسق HA
---

<h1 id="Coordinator-HA" class="common-anchor-header">المنسق HA<button data-href="#Coordinator-HA" class="anchor-icon" translate="no">
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
    </button></h1><p>كما هو موضح في <a href="/docs/ar/v2.5.x/architecture_overview.md">بنية Milvus،</a> تتكون Milvus من العديد من المكونات وتعمل بطريقة موزعة. من بين جميع المكونات، يضمن Milvus التوافر العالي للعاملين من خلال <a href="/docs/ar/v2.5.x/scaleout.md">زيادة وتوسيع</a> نطاق العقد، مما يجعل المنسقين الحلقة الضعيفة الوحيدة في السلسلة.</p>
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
    </button></h2><p>في الإصدار 2.2.3، يطبّق Milvus التوافر العالي للمنسقين لجعلهم يعملون في وضع الاستعداد النشط، مما يخفف من نقاط الفشل الأحادية المحتملة (SPoFs) التي يمكن أن تؤدي إلى عدم توفر الخدمة.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/coordinator_ha.png" alt="Coordinator HA" class="doc-image" id="coordinator-ha" />
   </span> <span class="img-wrapper"> <span>المنسق HA</span> </span></p>
<p>يوضح الشكل أعلاه كيفية عمل المنسقين في وضع الاستعداد النشط. عند بدء تشغيل زوج من المنسقين، يقومون بالتسجيل في etcd باستخدام معرف الخادم الخاص بهم ويتنافسون على الدور النشط. المنسق الذي ينجح في استئجار الدور النشط من الخادم سيبدأ في الخدمة، وسيبقى المنسق الآخر في الزوج في وضع الاستعداد، يراقب الدور النشط ويكون جاهزًا للخدمة في حالة وفاة المنسق النشط.</p>
<h2 id="Enable-coordinator-HA" class="common-anchor-header">تمكين المنسق HA<button data-href="#Enable-coordinator-HA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="With-Helm" class="common-anchor-header">مع Helm</h3><p>لبدء تشغيل منسقين متعددين وجعلهم يعملون في وضع الاستعداد النشط، يجب عليك إجراء التغييرات التالية على ملف <code translate="no">values.yaml</code>.</p>
<ul>
<li>قم بتعيين <code translate="no">xxxCoordinator.replicas</code> إلى <code translate="no">2</code>.</li>
<li>قم بتعيين <code translate="no">xxxCoordinator.activeStandby.enabled</code> إلى <code translate="no">true</code>.</li>
</ul>
<p>يستخدم مقتطف التعليمات البرمجية التالي RootCoord كمثال. يمكنك فعل الشيء نفسه مع المنسقين من الأنواع الأخرى.</p>
<pre><code translate="no" class="language-yaml">rootCoordinator:
  enabled: true
  <span class="hljs-comment"># You can set the number of replicas greater than 1 only if you also need to set activeStandby.enabled to true.</span>
  replicas: <span class="hljs-number">2</span>  <span class="hljs-comment"># Otherwise, remove this configuration item.</span>
  resources: {}
  nodeSelector: {}
  affinity: {}
  tolerations: []
  extraEnv: []
  heaptrack:
    enabled: false
  profiling:
    enabled: false  <span class="hljs-comment"># Enable live profiling</span>
  activeStandby:
    enabled: true  <span class="hljs-comment"># Set this to true to have RootCoordinators work in active-standby mode.</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="With-Docker" class="common-anchor-header">باستخدام Docker</h3><p>لبدء تشغيل منسقين متعددين وجعلهم يعملون في وضع الاستعداد النشط، يمكنك إضافة بعض التعريفات إلى ملف <code translate="no">docker-compose</code> الذي تستخدمه لبدء تشغيل مجموعة ميلفوس الخاصة بك.</p>
<p>يستخدم مقتطف الشيفرة التالي RootCoord كمثال. يمكنك فعل الشيء نفسه مع المنسقين من الأنواع الأخرى.</p>
<pre><code translate="no" class="language-yaml">  rootcoord:
    container_name: milvus-rootcoord
    image: milvusdb/milvus:v2<span class="hljs-number">.2</span><span class="hljs-number">.3</span>
    command: [<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;rootcoord&quot;</span>]
    environment:
      ETCD_ENDPOINTS: etcd:<span class="hljs-number">2379</span>
      MINIO_ADDRESS: minio:<span class="hljs-number">9000</span>
      PULSAR_ADDRESS: pulsar://pulsar:<span class="hljs-number">6650</span>
      ROOT_COORD_ADDRESS: rootcoord:<span class="hljs-number">53100</span>
      <span class="hljs-comment"># add ROOT_COORD_ENABLE_ACTIVE_STANDBY to enable active standby</span>
      ROOT_COORD_ENABLE_ACTIVE_STANDBY: true
    depends_on:
      - <span class="hljs-string">&quot;etcd&quot;</span>
      - <span class="hljs-string">&quot;pulsar&quot;</span>
      - <span class="hljs-string">&quot;minio&quot;</span>

<span class="hljs-comment"># add the following to have RootCoords work in active-standby mode</span>
<span class="hljs-comment"># rootcoord-1:</span>
<span class="hljs-comment"># container_name: milvus-rootcoord-1</span>
<span class="hljs-comment"># image: milvusdb/milvus:v2.2.3</span>
<span class="hljs-comment"># command: [&quot;milvus&quot;, &quot;run&quot;, &quot;rootcoord&quot;]</span>
<span class="hljs-comment"># environment:</span>
<span class="hljs-comment"># ETCD_ENDPOINTS: etcd:2379</span>
<span class="hljs-comment"># MINIO_ADDRESS: minio:9000</span>
<span class="hljs-comment"># PULSAR_ADDRESS: pulsar://pulsar:6650</span>
<span class="hljs-comment"># ROOT_COORD_ADDRESS: rootcoord-1:53100</span>
<span class="hljs-comment"># # add ROOT_COORD_ENABLE_ACTIVE_STANDBY to enable active standby</span>
<span class="hljs-comment"># ROOT_COORD_ENABLE_ACTIVE_STANDBY: true</span>
<span class="hljs-comment"># depends_on:</span>
<span class="hljs-comment"># - &quot;etcd&quot;</span>
<span class="hljs-comment"># - &quot;pulsar&quot;</span>
<span class="hljs-comment"># - &quot;minio&quot;</span>
<button class="copy-code-btn"></button></code></pre>

<h3 id="With-MacLinux-shell" class="common-anchor-header">مع قذيفة ماك/لينكس</h3><p>لبدء تشغيل عدة منسقين وجعلهم يعملون في وضع الاستعداد النشط، يمكنك</p>
<ol>
<li><p>تحميل التعليمات البرمجية المصدرية لـ Milvus على محرك الأقراص المحلي، وبدء <a href="https://github.com/milvus-io/milvus/blob/master/DEVELOPMENT.md">تشغيل مجموعة Milvus من التعليمات البرمجية المصدرية</a> كما يلي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">sudo</span> ./scripts/start_cluster.sh
<button class="copy-code-btn"></button></code></pre>
<p>يعمل Milvus بمنسق واحد فقط من كل نوع في نهاية هذه الخطوة.</p></li>
<li><p>قم بتحديث <code translate="no">milvus.yaml</code> لتغيير رقم منفذ المنسق من كل نوع. يستخدم ما يلي <strong>rootCoord</strong> كمثال.</p>
<pre><code translate="no" class="language-yaml">rootCoord:
  address: localhost
  port: <span class="hljs-number">53100</span> <span class="hljs-comment"># change to 53001</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ابدأ تشغيل المنسق الاحتياطي.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">nohup</span> ./bin/milvus run rootcoord &gt; /tmp/rootcoord2.<span class="hljs-built_in">log</span> 2&gt;&amp;1 &amp;
<button class="copy-code-btn"></button></code></pre>
<p>في نهاية هذه الخطوة، قم بتشغيل الأمر التالي للتحقق من وجود عمليتي منسقين.</p>
<pre><code translate="no" class="language-shell">ps aux|grep milvus
<button class="copy-code-btn"></button></code></pre>
<p>يجب أن تكون المخرجات مشابهة لـ</p>
<pre><code translate="no" class="language-shell">&gt; ps aux|grep milvus
root        12813   0.7 0.2 410709648   82432   ??  S   5:18PM  0:33.28 ./bin/milvus run rootcoord
root        12816   0.5 0.2 409487968   62352   ??  S   5:18PM  0:22.69 ./bin/milvus run proxy
root        17739   0.1 0.3 410289872   91792 s003  SN  6:01PM  0:00.30 ./bin/milvus run rootcoord
...
<button class="copy-code-btn"></button></code></pre>
<p>ويقوم المنسق الاحتياطي بإخراج إدخال سجل كل عشر ثوانٍ على النحو التالي:</p>
<pre><code translate="no" class="language-shell">[INFO] [sessionutil/session_util.go:649] [<span class="hljs-string">&quot;serverName: rootcoord is in STANDBY ...&quot;</span>]
<button class="copy-code-btn"></button></code></pre></li>
<li><p>أوقف المنسق النشط في زوج وراقب سلوك المنسق الاحتياطي.</p>
<p>يمكنك أن تجد أن الأمر يستغرق 60 ثانية حتى يتولى المنسق الاحتياطي الدور النشط.</p>
<pre><code translate="no" class="language-shell">[2022/09/21 11:58:33.855 +08:00] [DEBUG] [sessionutil/session_util.go:677] [<span class="hljs-string">&quot;watch the ACTIVE key&quot;</span>] [DELETE=<span class="hljs-string">&quot;key:\&quot;by-dev/meta/session/rootcoord\&quot; mod_revision:167 &quot;</span>]
[2022/09/21 11:58:33.856 +08:00] [DEBUG] [sessionutil/session_util.go:677] [<span class="hljs-string">&quot;watch the ACTIVE key&quot;</span>] [DELETE=<span class="hljs-string">&quot;key:\&quot;by-dev/meta/session/rootcoord-15\&quot; mod_revision:167 &quot;</span>]
[2022/09/21 11:58:33.856 +08:00] [INFO] [sessionutil/session_util.go:683] [<span class="hljs-string">&quot;stop watching ACTIVE key&quot;</span>]
[2022/09/21 11:58:33.856 +08:00] [INFO] [sessionutil/session_util.go:655] [<span class="hljs-string">&quot;start retrying to register as ACTIVE service...&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [INFO] [sessionutil/session_util.go:641] [<span class="hljs-string">&quot;register ACTIVE service successfully&quot;</span>] [ServerID=19]
[2022/09/21 11:58:33.859 +08:00] [INFO] [sessionutil/session_util.go:690] [<span class="hljs-string">&quot;quit STANDBY mode, this node will become ACTIVE&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [INFO] [rootcoord/root_coord.go:638] [<span class="hljs-string">&quot;rootcoord switch from standby to active, activating&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [INFO] [rootcoord/root_coord.go:306] [<span class="hljs-string">&quot;RootCoord Register Finished&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [DEBUG] [rootcoord/service.go:148] [<span class="hljs-string">&quot;RootCoord start done ...&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [DEBUG] [components/root_coord.go:58] [<span class="hljs-string">&quot;RootCoord successfully started&quot;</span>]
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Related-configuration-items" class="common-anchor-header">عناصر التكوين ذات الصلة<button data-href="#Related-configuration-items" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم تعطيل المنسق HA افتراضيًا. ويمكنك تمكين هذه الميزة يدويًا عن طريق تغيير العناصر التالية في ملف تكوين Milvus.</p>
<ul>
<li><a href="/docs/ar/v2.5.x/configure_rootcoord.md#rootCoordactiveStandbyenabled">تمكين rootCoord.activeStandby.enabled</a></li>
<li><a href="/docs/ar/v2.5.x/configure_querycoord.md#queryCoordactiveStandbyenabled">تمكين queryCoord.activeStandby.enabled</a></li>
<li><a href="/docs/ar/v2.5.x/configure_datacoord.md#dataCoordactiveStandbyenabled">dataCoord.activeStandby.enabled</a></li>
</ul>
<h2 id="Limits" class="common-anchor-header">الحدود<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>لا يوجد حالياً ضمان تناسق قوي بين الخدمة النشطة والخدمة الاحتياطية. لذلك، يحتاج المنسق الاحتياطي إلى إعادة تحميل البيانات الوصفية أثناء تولي الدور النشط.</p>
<p>لا يقوم Etcd بإصدار عقد إيجار إلا بعد انتهاء مهلة جلسة العمل الحالية. يتم تحديد المهلة الافتراضية لجلسة العمل بـ 60 ثانية. ولذلك، توجد فجوة مدتها 60 ثانية بين وقت وفاة المنسق النشط ووقت تولي المنسق الاحتياطي للدور النشط.</p>
