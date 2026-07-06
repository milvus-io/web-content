---
id: deploy_pulsar.md
title: تكوين تخزين الرسائل باستخدام Docker Compose أو Helm
related_key: 'Pulsar, storage'
summary: تعرف على كيفية تكوين تخزين الرسائل باستخدام Docker Compose أو Helm.
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
    </button></h1><p>يستخدم Milvus Pulsar أو Kafka لإدارة سجلات التغييرات الأخيرة، وإخراج سجلات التدفق، وتوفير اشتراكات السجلات. Pulsar هو نظام تخزين الرسائل الافتراضي. يقدم هذا الموضوع كيفية تكوين تخزين الرسائل باستخدام Docker Compose أو Helm.</p>
<p>يمكنك تكوين Pulsar باستخدام <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> أو على K8s، كما يمكنك تكوين Kafka على K8s.</p>
<div class="alert note">
<p><strong>قيود قائمة انتظار الرسائل</strong>: عند الترقية إلى Milvus v2.6.19، يجب الحفاظ على اختيارك الحالي لقائمة انتظار الرسائل. لا يُدعم التبديل بين أنظمة قوائم انتظار الرسائل المختلفة أثناء الترقية. سيتوفر دعم تغيير أنظمة قوائم انتظار الرسائل في الإصدارات المستقبلية.</p>
</div>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">تكوين Pulsar باستخدام Docker Compose<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1. تكوين Pulsar<button data-href="#1-Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h3><p>لتكوين Pulsar باستخدام Docker Compose، أدخل القيم الخاصة بك في قسم « <code translate="no">pulsar</code> » في الملف « <code translate="no">milvus.yaml</code> » الموجود في المسار milvus/configs.</p>
<pre><code translate="no"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span> <span class="hljs-comment"># Address of pulsar</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>انظر <a href="/docs/ar/v2.6.x/configure_pulsar.md">التكوينات المتعلقة بـ Pulsar</a> لمزيد من المعلومات.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. تشغيل Milvus<button data-href="#2-Run-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتشغيل الأمر التالي لبدء تشغيل Milvus الذي يستخدم تكوينات Pulsar.</p>
<pre><code translate="no"><span class="hljs-attribute">docker</span> compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">لا تصبح الإعدادات سارية المفعول إلا بعد بدء تشغيل Milvus. راجع <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">«بدء تشغيل Milvus</a> » لمزيد من المعلومات.</div>
<h2 id="Configure-Pulsar-with-Helm" class="common-anchor-header">تكوين Pulsar باستخدام Helm<button data-href="#Configure-Pulsar-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة لمجموعات Milvus على K8s، يمكنك تكوين Pulsar في نفس الأمر الذي يبدأ تشغيل Milvus. أو بدلاً من ذلك، يمكنك تكوين Pulsar باستخدام ملف « <code translate="no">values.yml</code> » الموجود في المسار /charts/milvus في مستودع <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> قبل بدء تشغيل Milvus.</p>
<p>للحصول على تفاصيل حول كيفية تكوين Milvus باستخدام Helm، راجع <a href="/docs/ar/v2.6.x/configure-helm.md">تكوين Milvus باستخدام مخططات Helm</a>. للحصول على تفاصيل حول عناصر التكوين المتعلقة بـ Pulsar، راجع <a href="/docs/ar/v2.6.x/configure_pulsar.md">التكوينات المتعلقة بـ Pulsar</a>.
|</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">استخدام ملف YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>قم بتكوين قسم <code translate="no">externalConfigFiles</code> في الملف <code translate="no">values.yaml</code>.</li>
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
<li>بعد تكوين الأقسام السابقة وحفظ ملف <code translate="no">values.yaml</code> ، قم بتشغيل الأمر التالي لتثبيت Milvus الذي يستخدم تكوينات Pulsar.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Woodpecker-with-Helm" class="common-anchor-header">تكوين Woodpecker باستخدام Helm<button data-href="#Configure-Woodpecker-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة لمجموعات Milvus على K8s، يمكنك تكوين Woodpecker في نفس الأمر الذي يبدأ تشغيل Milvus. أو بدلاً من ذلك، يمكنك تكوين Woodpecker باستخدام ملف <code translate="no">values.yml</code> الموجود في المسار /charts/milvus في مستودع <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> قبل بدء تشغيل Milvus.</p>
<p>للحصول على تفاصيل حول كيفية تكوين Milvus باستخدام Helm، راجع <a href="/docs/ar/v2.6.x/configure-helm.md">تكوين Milvus باستخدام مخططات Helm</a>. للحصول على تفاصيل حول عناصر التكوين المتعلقة بـ Woodpecker، راجع <a href="/docs/ar/v2.6.x/use-woodpecker.md">التكوينات المتعلقة بـ Woodpecker</a>.
|</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">استخدام ملف YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>قم بتكوين قسم <code translate="no">externalConfigFiles</code> في الملف <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    woodpecker:
      meta:
        type: etcd # The Type of the metadata provider. currently only support etcd.
        prefix: woodpecker # The Prefix of the metadata provider. default is woodpecker.
      client:
        segmentAppend:
          queueSize: 10000 # The size of the queue for pending messages to be sent of each log.
          maxRetries: 3 # Maximum number of retries for segment append operations.
        segmentRollingPolicy:
          maxSize: 256M # Maximum size of a segment.
          maxInterval: 10m # Maximum interval between two segments, default is 10 minutes.
          maxBlocks: 1000 # Maximum number of blocks in a segment
        auditor:
          maxInterval: 10s # Maximum interval between two auditing operations, default is 10 seconds.
      logstore:
        segmentSyncPolicy:
          maxInterval: 200ms # Maximum interval between two sync operations, default is 200 milliseconds.
          maxIntervalForLocalStorage: 10ms # Maximum interval between two sync operations local storage backend, default is 10 milliseconds.
          maxBytes: 256M # Maximum size of write buffer in bytes.
          maxEntries: 10000 # Maximum entries number of write buffer.
          maxFlushRetries: 5 # Maximum size of write buffer in bytes.
          retryInterval: 1000ms # Maximum interval between two retries. default is 1000 milliseconds.
          maxFlushSize: 2M # Maximum size of a fragment in bytes to flush.
          maxFlushThreads: 32 # Maximum number of threads to flush data
        segmentCompactionPolicy:
          maxSize: 2M # The maximum size of the merged files.
          maxParallelUploads: 4 # The maximum number of parallel upload threads for compaction.
          maxParallelReads: 8 # The maximum number of parallel read threads for compaction.
        segmentReadPolicy:
          maxBatchSize: 16M # Maximum size of a batch in bytes.
          maxFetchThreads: 32 # Maximum number of threads to fetch data.
      storage:
        type: minio # The Type of the storage provider. Valid values: [minio, local]
        rootPath: /var/lib/milvus/woodpecker # The root path of the storage provider.    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>بعد تكوين الأقسام السابقة وحفظ ملف <code translate="no">values.yaml</code> ، قم بتشغيل الأمر التالي لتثبيت Milvus الذي يستخدم تكوينات Woodpecker.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka-with-Helm" class="common-anchor-header">تكوين Kafka باستخدام Helm<button data-href="#Configure-Kafka-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة لمجموعات Milvus على K8s، يمكنك تكوين Kafka في نفس الأمر الذي يبدأ تشغيل Milvus. أو بدلاً من ذلك، يمكنك تكوين Kafka باستخدام ملف <code translate="no">values.yml</code> الموجود في المسار /charts/milvus في مستودع <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> قبل بدء تشغيل Milvus.</p>
<p>للحصول على تفاصيل حول كيفية تكوين Milvus باستخدام Helm، راجع <a href="/docs/ar/v2.6.x/configure-helm.md">تكوين Milvus باستخدام مخططات Helm</a>. للحصول على تفاصيل حول عناصر التكوين المتعلقة بـ Pulsar، راجع <a href="/docs/ar/v2.6.x/configure_pulsar.md">التكوينات المتعلقة بـ Pulsar</a>.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">استخدام ملف YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>قم بتكوين قسم <code translate="no">externalConfigFiles</code> في ملف <code translate="no">values.yaml</code> إذا كنت ترغب في استخدام Kafka كنظام تخزين الرسائل.</li>
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
<li>بعد تكوين الأقسام السابقة وحفظ ملف <code translate="no">values.yaml</code> ، قم بتشغيل الأمر التالي لتثبيت Milvus الذي يستخدم تكوينات Kafka.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-RocksMQ-with-Helm" class="common-anchor-header">تكوين RocksMQ باستخدام Helm<button data-href="#Configure-RocksMQ-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>يستخدم Milvus المستقل RocksMQ كمخزن الرسائل الافتراضي. للحصول على خطوات تفصيلية حول كيفية تكوين Milvus باستخدام Helm، راجع <a href="/docs/ar/v2.6.x/configure-helm.md">تكوين Milvus باستخدام مخططات Helm</a>. للحصول على تفاصيل حول عناصر التكوين المتعلقة بـ RocksMQ، راجع <a href="/docs/ar/v2.6.x/configure_rocksmq.md">التكوينات المتعلقة بـ RocksMQ</a>.</p>
<ul>
<li><p>إذا قمت بتشغيل Milvus باستخدام RocksMQ وأردت تغيير إعداداته، فيمكنك تشغيل الأمر <code translate="no">helm upgrade -f</code> مع الإعدادات المعدلة في ملف YAML التالي.</p></li>
<li><p>إذا كنت قد قمت بتثبيت Milvus بشكل مستقل باستخدام Helm مع مخزن رسائل بخلاف RocksMQ وترغب في إعادته إلى RocksMQ، فقم بتشغيل الأمر ` <code translate="no">helm upgrade -f</code> ` باستخدام ملف YAML التالي بعد مسح جميع المجموعات وإيقاف Milvus.</p></li>
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
<p>لا يُنصح بتغيير مخزن الرسائل. إذا كنت ترغب في القيام بذلك، فقم بإيقاف جميع عمليات DDL، ثم استدعِ واجهة برمجة التطبيقات (API) FlushAll لتفريغ جميع المجموعات، وأخيرًا أوقف Milvus قبل أن تقوم فعليًّا بتغيير مخزن الرسائل.</p>
</div>
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
    </button></h2><p>تعرف على كيفية تكوين تبعيات Milvus الأخرى باستخدام Docker Compose أو Helm:</p>
<ul>
<li><a href="/docs/ar/v2.6.x/deploy_s3.md">تكوين تخزين الكائنات باستخدام Docker Compose أو Helm</a></li>
<li><a href="/docs/ar/v2.6.x/deploy_etcd.md">تكوين تخزين البيانات الوصفية باستخدام Docker Compose أو Helm</a></li>
</ul>
