---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Docker Compose
summary: >-
  تعرف على كيفية تثبيت Milvus بشكل مستقل مع دعم وحدة معالجة الرسومات (GPU)
  باستخدام Docker Compose.
title: تشغيل Milvus مع دعم وحدة معالجة الرسومات (GPU) باستخدام Docker Compose
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">تشغيل Milvus مع دعم وحدة معالجة الرسومات (GPU) باستخدام Docker Compose<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>توضح هذه الصفحة كيفية تشغيل مثيل Milvus مع دعم GPU باستخدام Docker Compose.</p>
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
    </button></h2><ul>
<li><a href="https://docs.docker.com/get-docker/">تثبيت Docker</a>.</li>
<li><a href="/docs/ar/prerequisite-gpu.md">تحقق من متطلبات الأجهزة والبرامج</a> قبل التثبيت.</li>
</ul>
<div class="alert note">
<p>إذا واجهت أي مشكلات في سحب الصورة، فاتصل بنا على <a href="mailto:community@zilliz.com">community@zilliz.com</a> مع تفاصيل حول المشكلة، وسنقدم لك الدعم اللازم.</p>
</div>
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
    </button></h2><p>لتثبيت Milvus مع دعم GPU باستخدام Docker Compose، اتبع الخطوات التالية.</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. قم بتنزيل ملف YAML وتهيئته<button data-href="#1-Download-and-configure-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بالتنزيل <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml"><code translate="no">milvus-standalone-docker-compose-gpu.yaml</code></a> وحفظه باسم docker-compose.yml يدويًّا، أو باستخدام الأمر التالي.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>للتحقق من التنزيل، قارن ناتج الأمر التالي مع ملخص <code translate="no">sha256</code> المدرج لـ <code translate="no">milvus-standalone-docker-compose-gpu.yaml</code> في <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">صفحة الإصدار</a>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sha256sum</span> docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك تغيير أجهزة GPU المخصصة لـ Milvus في قسم <code translate="no">deploy</code> الخاص بخدمة <code translate="no">standalone</code> في ملف YAML على النحو التالي:</p>
<ul>
<li>لتخصيص جهاز GPU معين لـ Milvus، حدد موقع الحقل <code translate="no">deploy.resources.reservations.devices[0].device_ids</code> في تعريف خدمة <code translate="no">standalone</code> واستبدل قيمته بمعرف GPU المطلوب. يمكنك استخدام أداة <code translate="no">nvidia-smi</code> ، المضمنة في برامج تشغيل شاشات NVIDIA GPU، لتحديد معرف جهاز GPU. يدعم Milvus أجهزة GPU متعددة.</li>
</ul>
<p>تعيين جهاز GPU واحد لـ Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&quot;0&quot;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>تعيين أجهزة GPU متعددة لـ Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2. بدء تشغيل Milvus<button data-href="#2-Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>في الدليل الذي يحتوي على ملف docker-compose.yml، قم بتشغيل Milvus عن طريق تنفيذ الأمر التالي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>إذا فشلت في تشغيل الأمر أعلاه، فتحقق مما إذا كان نظامك يحتوي على Docker Compose V1 مثبتًا. إذا كان الأمر كذلك، يُنصح بالترحيل إلى Docker Compose V2 نظرًا للملاحظات الواردة في <a href="https://docs.docker.com/compose/">هذه الصفحة</a>.</p>
</div>
<p>بعد بدء تشغيل Milvus،</p>
<ul>
<li>تكون الحاويات المسماة <strong>milvus-standalone</strong> و <strong>milvus-minio</strong> و <strong>milvus-etcd</strong> قيد التشغيل.
<ul>
<li>لا تكشف حاوية <strong>milvus-etcd</strong> عن أي منافذ للمضيف وتقوم بتعيين بياناتها إلى <strong>volumes/etcd</strong> في المجلد الحالي.</li>
<li>تقدم حاوية <strong>milvus-minio</strong> المنافذ <strong>9000</strong> <strong>و9001</strong> باستخدام بيانات اعتماد المصادقة الافتراضية وتقوم بتعيين بياناتها إلى <strong>volumes/minio</strong> في المجلد الحالي.</li>
<li>تقدم حاوية <strong>milvus-standalone</strong> المنافذ <strong>19530</strong> <strong>و9091</strong> بالإعدادات الافتراضية وتقوم بتعيين بياناتها إلى <strong>volumes/milvus</strong> في المجلد الحالي.</li>
</ul></li>
</ul>
<p>تقوم خدمة « <code translate="no">standalone</code> » بتعيين « <code translate="no">security_opt: seccomp:unconfined</code> »، بحيث تعمل حاوية Milvus بدون ملف تعريف seccomp الافتراضي لـ Docker.</p>
<div class="alert warning">
<blockquote>
<p>ينشر ملف Compose هذه المنافذ بدون عنوان IP للمضيف، لذا يقوم Docker بربطها بجميع واجهات الشبكة الخاصة بالمضيف، ويمكن للأجهزة الأخرى التي يمكنها الوصول إلى هذا المضيف الاتصال بـ Milvus و MinIO. يستخدم MinIO مفتاح الوصول والمفتاح السري <code translate="no">minioadmin</code> ، اللذين تم تعيينهما في ملف Compose. لنشر المنافذ على عنوان loopback فقط، أضف <code translate="no">127.0.0.1:</code> إلى إدخالات <code translate="no">ports</code> لخدمات <code translate="no">minio</code> و <code translate="no">standalone</code> في <code translate="no">docker-compose.yml</code> ، على سبيل المثال <code translate="no">&quot;127.0.0.1:19530:19530&quot;</code> ، وقم بتشغيل <code translate="no">sudo docker compose up -d</code> مرة أخرى. للحصول على التفاصيل، راجع <a href="https://docs.docker.com/engine/network/port-publishing/">نشر المنافذ وتعيينها</a>. لاستخدام بيانات اعتماد MinIO أخرى، قم بتغيير <code translate="no">MINIO_ACCESS_KEY</code> و <code translate="no">MINIO_SECRET_KEY</code> لخدمة <code translate="no">minio</code> ، وقم بتعيين نفس القيم في <code translate="no">minio.accessKeyID</code> و <code translate="no">minio.secretAccessKey</code> في تكوين Milvus. لفرض اسم مستخدم وكلمة مرور لاتصالات العميل بـ Milvus، راجع <a href="/docs/ar/authenticate.md">مصادقة وصول المستخدم</a>.</p>
</blockquote>
</div>
<p>يمكنك التحقق مما إذا كانت الحاويات قيد التشغيل باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>
<button class="copy-code-btn"></button></code></pre>
<p>بشكل افتراضي، يعرض الأمر الحاويات قيد التشغيل فقط. تأكد من أن النتيجة تضم الحاويات <strong>milvus-etcd</strong> <strong>وmilvus-minio</strong> <strong>وmilvus-standalone،</strong> وأن عمود « <code translate="no">STATUS</code> » لكل منها يبدأ بـ <code translate="no">Up</code>.</p>
<p>يمكنك أيضًا الوصول إلى واجهة المستخدم على الويب لـ Milvus (Milvus WebUI) على <code translate="no">http://127.0.0.1:9091/webui/</code> لمعرفة المزيد عن مثيل Milvus الخاص بك. لمزيد من التفاصيل، راجع <a href="/docs/ar/milvus-webui.md">واجهة المستخدم على الويب</a> لـ <a href="/docs/ar/milvus-webui.md">Milvus (Milvus WebUI)</a>.</p>
<p>لتغيير أجهزة GPU التي يستخدمها Milvus بعد بدء تشغيله، قم بتحرير الحقل <code translate="no">device_ids</code> الموجود ضمن <code translate="no">deploy.resources.reservations.devices</code> الخاص بخدمة <code translate="no">standalone</code> في ملف docker-compose.yml كما هو موضح في الخطوة 1، ثم قم بتشغيل الأمر التالي. ونظرًا لتغيير تكوين الخدمة، يتوقف <code translate="no">docker compose up</code> ويقوم بإعادة إنشاء حاوية <strong>milvus-standalone</strong>. للحصول على التفاصيل، راجع <a href="https://docs.docker.com/compose/how-tos/gpu-support/">«تشغيل خدمات Docker Compose مع الوصول إلى وحدة معالجة الرسومات (GPU)</a>».</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك إيقاف هذه الحاوية وحذفها على النحو التالي.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-memory-pool" class="common-anchor-header">تكوين تجمع الذاكرة<button data-href="#Configure-memory-pool" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد تشغيل Milvus، يمكنك تخصيص تجمع الذاكرة عن طريق تغيير إعدادات <code translate="no">initMemSize</code> و <code translate="no">maxMemSize</code> في قسم <code translate="no">gpu</code> من تكوين Milvus.</p>
<div class="alert note">
<p>يوجد ملف <code translate="no">milvus.yaml</code> في الدليل <code translate="no">/milvus/configs/</code> داخل حاوية Milvus. الإعدادات الموجودة في ملف <code translate="no">user.yaml</code> في نفس الدليل تلغي القيم الموجودة في <code translate="no">milvus.yaml</code>.</p>
</div>
<p>للاحتفاظ بإعداداتك عند إعادة إنشاء الحاوية، قم بتخزينها في ملف <code translate="no">user.yaml</code> على المضيف وقم بتركيب الملف في الحاوية على النحو التالي.</p>
<ol>
<li><p>في الدليل الذي يحتوي على ملف docker-compose.yml، أنشئ ملفًا باسم <code translate="no">user.yaml</code> مع الإعدادات التي تريد تغييرها. يوضح المثال التالي قسم <code translate="no">gpu</code> بقيمه الافتراضية. استبدلها بالأحجام التي تحتاجها:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: الحجم الأولي لمجمع الذاكرة، بالميغابايت. القيمة الافتراضية هي 2048.</li>
<li><code translate="no">maxMemSize</code>: الحجم الأقصى لمجمع الذاكرة، بالميغابايت. القيمة الافتراضية هي 4096.</li>
</ul></li>
<li><p>في ملف docker-compose.yml، أضف ملف <code translate="no">user.yaml</code> إلى قائمة <code translate="no">volumes</code> الخاصة بخدمة <code translate="no">standalone</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>أعد إنشاء حاوية Milvus لتطبيق التغييرات:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>بعد تثبيت الملف، أعد تشغيل خدمة <code translate="no">standalone</code> لتطبيق التغييرات اللاحقة على <code translate="no">user.yaml</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose restart standalone</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>يتم تعطيل Storage V3 افتراضيًا. قم بتمكينه قبل استخدام الميزات التي تعتمد عليه. للاطلاع على المتطلبات واعتبارات التوافق، راجع <a href="/docs/ar/storage-v3.md">Storage V3</a>.</p>
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
<li><p>راجع «البدء السريع» ( <a href="/docs/ar/quickstart.md">Quickstart</a> ) لمعرفة ما يمكن لـ Milvus القيام به.</p></li>
<li><p>راجع <a href="/docs/ar/milvus-webui.md">واجهة المستخدم على الويب لـ Milvus</a> لمعرفة المزيد عن مثيل Milvus.</p></li>
<li><p>تعلم العمليات الأساسية لـ Milvus:</p>
<ul>
<li><a href="/docs/ar/manage_databases.md">إدارة قواعد البيانات</a></li>
<li><a href="/docs/ar/manage-collections.md">إدارة المجموعات</a></li>
<li><a href="/docs/ar/manage-partitions.md">إدارة الأقسام</a></li>
<li><a href="/docs/ar/insert-update-delete.md">الإدراج والتحديث والحذف</a></li>
<li><a href="/docs/ar/single-vector-search.md">البحث أحادي المتجه</a></li>
<li><a href="/docs/ar/multi-vector-search.md">البحث المختلط</a></li>
</ul></li>
<li><p><a href="/docs/ar/upgrade_milvus_standalone-docker.md">قم بترقية Milvus Standalone باستخدام Docker Compose</a>. تعرض تلك الصفحة علامة صورة وحدة المعالجة المركزية (CPU). بالنسبة لنشر وحدة معالجة الرسومات (GPU) هذا، احتفظ باللاحقة <code translate="no">-gpu</code> (<code translate="no">milvusdb/milvus:v3.0.5-gpu</code>) واحتفظ بإعدادات <code translate="no">deploy</code> و <code translate="no">user.yaml</code>.</p></li>
<li><p><a href="/docs/ar/scaleout.md">قم بتوسيع نطاق مجموعة Milvus</a> على Kubernetes. يستخدم هذا الإجراء Helm ولا ينطبق على عملية النشر هذه باستخدام Docker.</p></li>
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
