---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: تعرف على كيفية تثبيت Milvus بشكل مستقل باستخدام Docker Compose.
title: تشغيل Milvus باستخدام Docker Compose (لينكس)
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">تشغيل Milvus باستخدام Docker Compose (لينكس)<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>توضح هذه الصفحة كيفية تشغيل مثيل Milvus في Docker باستخدام Docker Compose.</p>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات المسبقة<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><a href="https://docs.docker.com/get-docker/">تثبيت Docker</a>.</li>
<li>تثبيت <a href="https://docs.docker.com/compose/install/linux/">المكون الإضافي Docker Compose</a> (الإصدار 2 أو أحدث) والتحقق منه باستخدام <code translate="no">docker compose version</code>. تستخدم هذه الإرشادات الأمر <code translate="no">docker compose</code> ، وليس الأمر القديم <code translate="no">docker-compose</code> V1.</li>
<li><a href="/docs/ar/prerequisite-docker.md">تحقق من متطلبات الأجهزة والبرامج</a> قبل التثبيت.</li>
</ul>
<h2 id="Install-Milvus" class="common-anchor-header">تثبيت Milvus<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر Milvus ملف تكوين Docker Compose في مستودع Milvus. قم بتنزيل ملف التكوين الخاص بالإصدار v3.0.5 وابدأ عملية نشر جديدة:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yaml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>النشر الافتراضي (الإصدار 3.0.5):</strong> <code translate="no">docker compose up -d</code> يبدأ تشغيل ثلاث حاويات طويلة الأمد — <code translate="no">milvus-etcd</code> (البيانات الوصفية)، و <code translate="no">milvus-minio</code> (تخزين الكائنات)، و <code translate="no">milvus-standalone</code>. قائمة انتظار الرسائل هي <strong>Woodpecker (مدمجة، مع MinIO / تخزين الكائنات كخلفية WAL لها)</strong>، لذا لا يلزم وجود حاوية منفصلة لقائمة انتظار الرسائل.</p>
<p>كما يقوم التكوين بتشغيل خدمة « <code translate="no">milvus-volume-init</code> » لمرة واحدة لإعداد ملكية دليل البيانات. ويُغلق بعد إتمام تلك المهمة.</p>
<p><strong>قائمة انتظار الرسائل الافتراضية حسب الإصدار:</strong></p>
<ul>
<li><strong>2.5.x</strong> — قائمة انتظار الرسائل الافتراضية هي <strong>RocksMQ</strong>.</li>
<li><strong>2.6.x والإصدارات الأحدث</strong> — قائمة انتظار الرسائل الافتراضية هي <strong>Woodpecker (مضمنة)</strong>.</li>
</ul>
<p>استخدم التكوين المرفق بالإصدار الذي تنوي تثبيته. بالنسبة للنشر الحالي، اتبع إرشادات الترقية بدلاً من استبدال تكوينه بملف تثبيت جديد.</p>
<ul>
<li><p>إذا كان <code translate="no">docker compose</code> غير متاح، فقم بتثبيت المكون الإضافي Compose باستخدام <a href="https://docs.docker.com/compose/install/linux/">إرشادات Docker</a>.</p></li>
<li><p>إذا واجهت أي مشكلات في سحب الصورة، فاتصل بنا على <a href="mailto:community@zilliz.com">community@zilliz.com</a> مع تفاصيل حول المشكلة، وسنقدم لك الدعم اللازم.</p></li>
</ul>
</div>
<p>بعد بدء تشغيل Milvus،</p>
<ul>
<li>تكون الحاويات المسماة <strong>milvus-standalone</strong> و <strong>milvus-minio</strong> و <strong>milvus-etcd</strong> قيد التشغيل.
<ul>
<li>لا تكشف حاوية <strong>milvus-etcd</strong> عن أي منافذ للمضيف وتقوم بتعيين بياناتها إلى <strong>volumes/etcd</strong> في المجلد الحالي.</li>
<li>تقدم حاوية <strong>milvus-minio</strong> المنافذ <strong>9000</strong> <strong>و9001</strong> محليًا باستخدام بيانات اعتماد المصادقة الافتراضية وتقوم بتعيين بياناتها إلى <strong>volumes/minio</strong> في المجلد الحالي.</li>
<li>تقدم حاوية <strong>milvus-standalone</strong> المنافذ <strong>19530</strong> محليًّا باستخدام الإعدادات الافتراضية وتقوم بتعيين بياناتها إلى <strong>volumes/milvus</strong> في المجلد الحالي.</li>
</ul></li>
</ul>
<p>يمكنك التحقق مما إذا كانت الحاويات قيد التشغيل باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose ps</span>

NAME                IMAGE   COMMAND                  SERVICE      CREATED         STATUS                   PORTS
milvus-etcd         …       &quot;etcd -advertise-cli…&quot;   etcd         2 minutes ago   Up 2 minutes (healthy)   2379-2380/tcp
milvus-minio        …       &quot;/usr/bin/docker-ent…&quot;   minio        2 minutes ago   Up 2 minutes (healthy)   9000-9001/tcp
milvus-standalone   …       &quot;/tini -- milvus run…&quot;   standalone   2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9091-&gt;9091/tcp, 0.0.0.0:19530-&gt;19530/tcp
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك أيضًا الوصول إلى واجهة المستخدم على الويب لـ Milvus على <code translate="no">http://127.0.0.1:9091/webui/</code> لمعرفة المزيد عن مثيل Milvus الخاص بك. لمزيد من التفاصيل، راجع <a href="/docs/ar/milvus-webui.md">واجهة المستخدم على الويب</a> لـ <a href="/docs/ar/milvus-webui.md">Milvus</a>.</p>
<p>لتجربة الخادم قيد التشغيل، اتبع مسار <strong>«استخدام خادم Milvus موجود»</strong> في <a href="/docs/ar/quickstart.md">«البدء السريع»</a> وقم بالاتصال بـ <code translate="no">http://localhost:19530</code>. لا تستخدم كتلة الاتصال المحلية <code translate="no">.db</code> ، التي تبدأ قاعدة بيانات Milvus Lite منفصلة.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(اختياري) تحديث تكوينات Milvus<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>لتحديث تكوين Milvus ليناسب احتياجاتك، تحتاج إلى تعديل ملف <code translate="no">/milvus/configs/user.yaml</code> الموجود داخل الحاوية <code translate="no">milvus-standalone</code>.</p>
<ol>
<li><p>قم بالوصول إلى الحاوية <code translate="no">milvus-standalone</code>.</p>
<pre><code translate="no" class="language-shell">docker exec -it milvus-standalone bash
<button class="copy-code-btn"></button></code></pre></li>
<li><p>أضف إعدادات إضافية لتجاوز الإعدادات الافتراضية.
يفترض ما يلي أنك بحاجة إلى تجاوز الإعدادات الافتراضية لـ <code translate="no">proxy.healthCheckTimeout</code>. للاطلاع على عناصر التكوين القابلة للتطبيق، راجع <a href="/docs/ar/system_configuration.md">تكوين النظام</a>.</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; /milvus/configs/user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p>أعد تشغيل حاوية <code translate="no">milvus-standalone</code> لتطبيق التغييرات.</p>
<pre><code translate="no" class="language-shell">docker restart milvus-standalone
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">إيقاف وحذف Milvus<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك إيقاف هذا الحاوية وحذفها على النحو التالي</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-an-existing-deployment" class="common-anchor-header">ترقية نشر موجود<button data-href="#Upgrade-an-existing-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة لنشر Milvus 2.6.x المستقل، اتبع إرشادات <a href="/docs/ar/upgrade_milvus_standalone-docker.md">«ترقية Milvus المستقل باستخدام Docker Compose</a>». قم بعمل نسخة احتياطية من البيانات الوصفية والبيانات الدائمة، واحتفظ بالتبعيات والتكوينات الحالية، وتحقق من صحة مسار الترقية الموثق من المصدر إلى الهدف قبل تغيير صورة Milvus. لا تستبدل ملف Compose الخاص بالنشر الأقدم بتكوين التثبيت الجديد المذكور أعلاه.</p>
<p><strong>قيود قائمة انتظار الرسائل</strong>: عند الترقية إلى Milvus v3.0.5، يجب الحفاظ على اختيارك الحالي لقائمة انتظار الرسائل. لا يُدعم التبديل بين أنظمة قوائم انتظار الرسائل المختلفة أثناء الترقية. سيتوفر دعم تغيير أنظمة قوائم انتظار الرسائل في الإصدارات المستقبلية.</p>
<p>يتم تعيين Woodpecker افتراضيًا في Milvus 2.6.x والإصدارات الأحدث، بينما يتم تعيين <strong>RocksMQ</strong> افتراضيًا في عمليات النشر 2.5.x. إذا كانت عملية النشر التي تقوم بترقيتها لا تزال تعمل باستخدام RocksMQ، فقم بتثبيتها في « <code translate="no">user.yaml</code> » قبل تغيير صورة Milvus، حتى تحتفظ المثيل الذي تمت ترقيته بقائمة انتظار الرسائل الحالية بدلاً من البدء بالإعداد الافتراضي الجديد:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml — keep RocksMQ across the upgrade</span>
<span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد أن يبدأ تشغيل المثيل الذي تمت ترقيته على الإصدار v3.0.5، يمكنك الانتقال من RocksMQ إلى Woodpecker باستخدام ميزة <a href="/docs/ar/switch-mq-type.md">«تبديل قائمة انتظار الرسائل» (Switch Message Queue</a>)، المتوفرة في Milvus 3.0 والإصدارات الأحدث.</p>
<h2 id="Optional-dependencies" class="common-anchor-header">التبعيات الاختيارية<button data-href="#Optional-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>يعمل هذا النشر على <strong>Woodpecker</strong> (مدمج، خلفية MinIO WAL) للمراسلة، <strong>وetcd</strong> للبيانات الوصفية، <strong>وMinIO</strong> لتخزين الكائنات. لاستخدام قائمة انتظار رسائل مختلفة أو توصيل تخزين كائنات / بيانات وصفية خارجية، انظر:</p>
<ul>
<li>قائمة انتظار الرسائل: <a href="/docs/ar/woodpecker.md">Woodpecker</a> (الافتراضي) · <a href="/docs/ar/mq_pulsar.md">Pulsar</a> · <a href="/docs/ar/mq_kafka.md">Kafka</a> · <a href="/docs/ar/mq_rocksmq.md">RocksMQ</a></li>
<li>تخزين الكائنات: <a href="/docs/ar/deploy_s3.md">MinIO</a> (افتراضي) · <a href="/docs/ar/deploy_s3.md">AWS S3</a> · <a href="/docs/ar/abs.md">Azure Blob</a> · <a href="/docs/ar/gcs.md">GCP Cloud Storage</a> · <a href="/docs/ar/deploy_s3.md">Aliyun OSS</a> · <a href="/docs/ar/deploy_s3.md">Tencent COS</a> · <a href="/docs/ar/deploy_s3.md">Huawei OBS</a> · <a href="/docs/ar/deploy_s3.md">متوافق مع S3</a></li>
<li>البيانات الوصفية: <a href="/docs/ar/deploy_etcd.md">etcd</a></li>
</ul>
<div class="alert note">
<p>يتم تعطيل التخزين V3 افتراضيًا. قم بتمكينه قبل استخدام الميزات التي تعتمد عليه. للاطلاع على المتطلبات واعتبارات التوافق، راجع <a href="/docs/ar/storage-v3.md">التخزين V3</a>.</p>
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
    </button></h2><p>بعد تثبيت Milvus في Docker، يمكنك:</p>
<ul>
<li><p>راجع <a href="/docs/ar/quickstart.md">«البدء السريع</a> » لمعرفة ما يمكن لـ Milvus القيام به.</p></li>
<li><p>تعلم العمليات الأساسية لـ Milvus:</p>
<ul>
<li><a href="/docs/ar/manage_databases.md">إدارة قواعد البيانات</a></li>
<li><a href="/docs/ar/manage-collections.md">إدارة المجموعات</a></li>
<li><a href="/docs/ar/manage-partitions.md">إدارة الأقسام</a></li>
<li><a href="/docs/ar/insert-update-delete.md">الإدراج والتحديث والحذف</a></li>
<li><a href="/docs/ar/single-vector-search.md">البحث أحادي المتجه</a></li>
<li><a href="/docs/ar/multi-vector-search.md">البحث المختلط</a></li>
</ul></li>
<li><p><a href="/docs/ar/upgrade_milvus_standalone-docker.md">ترقية Milvus Standalone باستخدام Docker Compose</a>.</p></li>
<li><p><a href="/docs/ar/scaleout.md">توسيع نطاق مجموعة Milvus الخاصة بك</a>.</p></li>
<li><p>نشر مجموعة Milvus الخاصة بك على السحابة:</p>
<ul>
<li><a href="/docs/ar/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ar/gcp.md">Google Cloud</a></li>
<li><a href="/docs/ar/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>استكشف <a href="/docs/ar/milvus-webui.md">Milvus WebUI،</a> وهي واجهة ويب سهلة الاستخدام لمراقبة وإدارة Milvus.</p></li>
<li><p>اكتشف <a href="/docs/ar/milvus_backup_overview.md">Milvus Backup</a>، وهي أداة مفتوحة المصدر لنسخ بيانات Milvus احتياطيًا.</p></li>
<li><p>اكتشف <a href="/docs/ar/birdwatcher_overview.md">Birdwatcher،</a> وهي أداة مفتوحة المصدر لتصحيح أخطاء Milvus وتحديثات التكوين الديناميكية.</p></li>
<li><p>اكتشف <a href="https://github.com/zilliztech/attu">Attu،</a> وهي أداة واجهة مستخدم رسومية مفتوحة المصدر لإدارة Milvus بطريقة بديهية.</p></li>
<li><p><a href="/docs/ar/monitor.md">راقب Milvus باستخدام Prometheus</a>.</p></li>
</ul>
