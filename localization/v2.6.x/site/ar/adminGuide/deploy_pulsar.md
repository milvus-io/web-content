---
id: deploy_pulsar.md
title: تكوين تخزين الرسائل باستخدام Docker Compose أو Helm
related_key: 'Pulsar, storage'
summary: تعرّف على كيفية تكوين تخزين الرسائل باستخدام Docker Compose أو Helm.
---
<h1 id="Configure-Message-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">تكوين تخزين الرسائل باستخدام Docker Compose أو Helm<button data-href="#Configure-Message-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>يستخدم Milvus نظام Pulsar أو Kafka لإدارة سجلات التغييرات الأخيرة، وإخراج سجلات الدفق، وتوفير اشتراكات السجلات. Pulsar هو نظام تخزين الرسائل الافتراضي. يقدم هذا الموضوع كيفية تكوين تخزين الرسائل باستخدام Docker Compose أو Helm.</p>
<p>يمكنك تكوين Pulsar مع <a href="https://docs.docker.com/get-started/overview/">Docker Comp</a> ose أو على K8s وتكوين Kafka على K8s.</p>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">تكوين بولسار باستخدام Docker Compose<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1. تكوين بولسار</h3><p>لتهيئة Pulsar مع Docker Compose، قم بتوفير القيم الخاصة بك للقسم <code translate="no">pulsar</code> في الملف <code translate="no">milvus.yaml</code> على مسار milvus/configs.</p>
<pre><code translate="no"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span> <span class="hljs-comment"># Address of pulsar</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>راجع <a href="/docs/ar/configure_pulsar.md">التكوينات المتعلقة بـ Pulsar</a> لمزيد من المعلومات.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. تشغيل ميلفوس</h3><p>قم بتشغيل الأمر التالي لبدء تشغيل Milvus الذي يستخدم تكوينات Pulsar.</p>
<pre><code translate="no"><span class="hljs-attribute">docker</span> compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">لا تدخل التكوينات حيز التنفيذ إلا بعد بدء تشغيل ميلفوس. انظر <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">بدء تشغيل Milvus</a> لمزيد من المعلومات.</div>
<h2 id="Configure-Pulsar-with-Helm" class="common-anchor-header">تكوين Pulsar مع Helm<button data-href="#Configure-Pulsar-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة لمجموعات Milvus على K8s، يمكنك تكوين Pulsar في نفس الأمر الذي يبدأ تشغيل Milvus. وبدلاً من ذلك، يمكنك تكوين Pulsar باستخدام الملف <code translate="no">values.yml</code> على المسار /charts/milvus في مستودع <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> قبل بدء تشغيل Milvus.</p>
<p>للحصول على تفاصيل حول كيفية تكوين ملف Milvus باستخدام Helm، راجع <a href="/docs/ar/configure-helm.md">تكوين Milvus باستخدام مخططات Helm</a>. للحصول على تفاصيل حول عناصر التكوين المتعلقة بـ Pulsar، راجع <a href="/docs/ar/configure_pulsar.md">التكوينات المتعلقة بـ Pulsar</a>. |</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">استخدام ملف YAML</h3><ol>
<li>قم بتكوين القسم <code translate="no">externalConfigFiles</code> في الملف <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    pulsar:
      address: localhost # Address of pulsar
      port: 6650 # Port of Pulsar
      webport: 80 # Web port of pulsar, if you connect direcly without proxy, should use 8080
      maxMessageSize: 5242880 # 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.
      tenant: public
      namespace: default    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>بعد تهيئة الأقسام السابقة وحفظ الملف <code translate="no">values.yaml</code> ، قم بتشغيل الأمر التالي لتثبيت ملف Milvus الذي يستخدم تكوينات بولسار.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka-with-Helm" class="common-anchor-header">تكوين كافكا مع هيلم<button data-href="#Configure-Kafka-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة لمجموعات Milvus على K8s، يمكنك تكوين Kafka في نفس الأمر الذي يبدأ تشغيل Milvus. وبدلاً من ذلك، يمكنك تكوين كافكا باستخدام الملف <code translate="no">values.yml</code> على مسار /charts/milvus في مستودع <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> قبل بدء تشغيل Milvus.</p>
<p>للحصول على تفاصيل حول كيفية تكوين ملف Milvus باستخدام Helm، راجع <a href="/docs/ar/configure-helm.md">تكوين ملف Milvus باستخدام مخططات Helm</a>. للحصول على تفاصيل حول عناصر التكوين المتعلقة بـ Pulsar، راجع <a href="/docs/ar/configure_pulsar.md">التكوينات المتعلقة بـ Pulsar</a>.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">استخدام ملف YAML</h3><ol>
<li>قم بتكوين القسم <code translate="no">externalConfigFiles</code> في الملف <code translate="no">values.yaml</code> إذا كنت تريد استخدام كافكا كنظام تخزين الرسائل.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    kafka:
      brokerList:
        -  &lt;your_kafka_address&gt;:&lt;your_kafka_port&gt;
      saslUsername:
      saslPassword:
      saslMechanisms: PLAIN
      securityProtocol: SASL_SSL    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>بعد تكوين الأقسام السابقة وحفظ الملف <code translate="no">values.yaml</code> ، قم بتشغيل الأمر التالي لتثبيت ملف Milvus الذي يستخدم تكوينات كافكا.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-RocksMQ-with-Helm" class="common-anchor-header">تكوين RocksMQ مع Helm<button data-href="#Configure-RocksMQ-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>يستخدم ملف Milvus المستقل RocksMQ كمخزن افتراضي للرسائل. للحصول على خطوات مفصلة حول كيفية تكوين Milvus مع Helm، راجع <a href="/docs/ar/configure-helm.md">تكوين Mil</a>vus <a href="/docs/ar/configure-helm.md">مع مخططات Helm</a>. للحصول على تفاصيل حول عناصر التكوين المتعلقة بـ RocksMQ، راجع <a href="/docs/ar/configure_rocksmq.md">التكوينات المتعلقة بـ RocksMQ</a>.</p>
<ul>
<li><p>إذا قمت ببدء تشغيل Milvus مع RocksMQ وأردت تغيير إعداداته، يمكنك تشغيل <code translate="no">helm upgrade -f</code> بالإعدادات التي تم تغييرها في ملف YAML التالي.</p></li>
<li><p>إذا كنت قد قمت بتثبيت Milvus مستقل باستخدام Helm مع مخزن رسائل غير RocksMQ وتريد تغييره مرة أخرى إلى RocksMQ، فقم بتشغيل <code translate="no">helm upgrade -f</code> مع ملف YAML التالي بعد مسح جميع المجموعات وإيقاف Milvus.</p></li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    rocksmq:
      # The path where the message is stored in rocksmq
      # please adjust in embedded Milvus: /tmp/milvus/rdb_data
      path: /var/lib/milvus/rdb_data
      lrucacheratio: 0.06 # rocksdb cache memory ratio
      rocksmqPageSize: 67108864 # 64 MB, 64 * 1024 * 1024 bytes, The size of each page of messages in rocksmq
      retentionTimeInMinutes: 4320 # 3 days, 3 * 24 * 60 minutes, The retention time of the message in rocksmq.
      retentionSizeInMB: 8192 # 8 GB, 8 * 1024 MB, The retention size of the message in rocksmq.
      compactionInterval: 86400 # 1 day, trigger rocksdb compaction every day to remove deleted data
      # compaction compression type, only support use 0,7.
      # 0 means not compress, 7 will use zstd
      # len of types means num of rocksdb level.
      compressionTypes: [0, 0, 7, 7, 7]    
</span><button class="copy-code-btn"></button></code></pre>
<div class="alert warning">
<p>لا ينصح بتغيير مخزن الرسائل. إذا كنت ترغب في القيام بذلك، أوقف جميع عمليات DDL، ثم قم باستدعاء FlushAll API لمسح جميع المجموعات، وأخيراً أوقف Milvus في النهاية قبل أن تقوم بتغيير مخزن الرسائل فعلياً.</p>
</div>
<h2 id="Configure-NATS-with-Helm" class="common-anchor-header">تكوين NATS مع Helm<button data-href="#Configure-NATS-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS هو مخزن رسائل تجريبي بديل لـ RocksMQ. للحصول على خطوات مفصلة حول كيفية تكوين ميلفوس مع Helm، راجع <a href="/docs/ar/configure-helm.md">تكوين ميل</a>فوس <a href="/docs/ar/configure-helm.md">مع مخططات Helm</a>. للحصول على تفاصيل حول عناصر التكوين المتعلقة بـ RocksMQ، راجع <a href="/docs/ar/configure_natsmq.md">التكوينات المتعلقة بـ NATS</a>.</p>
<ul>
<li><p>إذا قمت ببدء تشغيل ملف Milvus مع NATS وأردت تغيير إعداداته، يمكنك تشغيل <code translate="no">helm upgrade -f</code> بالإعدادات التي تم تغييرها في ملف YAML التالي.</p></li>
<li><p>إذا كنت قد قمت بتثبيت Milvus مستقل مع مخزن رسائل غير NATS وتريد تغييره إلى NATS، قم بتشغيل <code translate="no">helm upgrade -f</code> مع ملف YAML التالي بعد مسح جميع المجموعات وإيقاف Milvus.</p></li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    mq:
      type: natsmq
    natsmq:
      # server side configuration for natsmq.
      server: 
        # 4222 by default, Port for nats server listening.
        port: 4222 
        # /var/lib/milvus/nats by default, directory to use for JetStream storage of nats.
        storeDir: /var/lib/milvus/nats 
        # (B) 16GB by default, Maximum size of the &#x27;file&#x27; storage.
        maxFileStore: 17179869184 
        # (B) 8MB by default, Maximum number of bytes in a message payload.
        maxPayload: 8388608 
        # (B) 64MB by default, Maximum number of bytes buffered for a connection applies to client connections.
        maxPending: 67108864 
        # (√ms) 4s by default, waiting for initialization of natsmq finished.
        initializeTimeout: 4000 
        monitor:
          # false by default, If true enable debug log messages.
          debug: false 
          # true by default, If set to false, log without timestamps.
          logTime: true 
          # no log file by default, Log file path relative to.. .
          logFile: 
          # (B) 0, unlimited by default, Size in bytes after the log file rolls over to a new one.
          logSizeLimit: 0 
        retention:
          # (min) 3 days by default, Maximum age of any message in the P-channel.
          maxAge: 4320 
          # (B) None by default, How many bytes the single P-channel may contain. Removing oldest messages if the P-channel exceeds this size.
          maxBytes:
          # None by default, How many message the single P-channel may contain. Removing oldest messages if the P-channel exceeds this limit.    
          maxMsgs: 
</span><button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>الاختيار بين RocksMQ و NATS؟</strong></p>
<p>يستخدم RocksMQ CGO للتفاعل مع RocksDB ويدير الذاكرة بنفسه، بينما يقوم NATS المدمج في تثبيت Milvus بتفويض إدارة الذاكرة إلى جامع القمامة الخاص بـ Go (GC).</p>
<p>في السيناريو الذي تكون فيه حزمة البيانات أصغر من 64 كيلوبايت، يتفوق RocksDB من حيث استخدام الذاكرة واستخدام وحدة المعالجة المركزية ووقت الاستجابة. من ناحية أخرى، إذا كانت حزمة البيانات أكبر من 64 كيلوبايت، يتفوق NATS من حيث وقت الاستجابة مع وجود ذاكرة كافية وجدولة GC مثالية.</p>
<p>في الوقت الحالي، يُنصح باستخدام NATS للتجارب فقط.</p>
</div>
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
    </button></h2><p>تعرف على كيفية تكوين تبعيات Milvus الأخرى باستخدام Docker Compose أو Helm:</p>
<ul>
<li><a href="/docs/ar/deploy_s3.md">تكوين تخزين الكائنات باستخدام Docker Compose أو Helm</a></li>
<li><a href="/docs/ar/deploy_etcd.md">تكوين التخزين التعريفي باستخدام Docker Compose أو Helm</a></li>
</ul>
