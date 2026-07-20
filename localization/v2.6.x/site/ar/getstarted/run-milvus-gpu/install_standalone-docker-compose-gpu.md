---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Kubernetes
summary: تعرف على كيفية تثبيت مجموعة Milvus على Kubernetes.
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
<li><a href="/docs/ar/v2.6.x/prerequisite-gpu.md">تحقق من متطلبات الأجهزة والبرامج</a> قبل التثبيت.</li>
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
    </button></h3><p>قم بالتنزيل <a href="https://github.com/milvus-io/milvus/releases/download/v2.6.20/milvus-standalone-docker-compose-gpu.yml"><code translate="no">milvus-standalone-docker-compose-gpu.yml</code></a> وحفظه باسم docker-compose.yml يدويًّا، أو باستخدام الأمر التالي.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.20/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>تحتاج إلى إجراء بعض التغييرات على متغيرات البيئة للخدمة المستقلة في ملف YAML على النحو التالي:</p>
<ul>
<li>لتخصيص جهاز GPU معين لـ Milvus، حدد موقع الحقل « <code translate="no">deploy.resources.reservations.devices[0].devices_ids</code> » في تعريف الخدمة « <code translate="no">standalone</code> » واستبدل قيمته بمعرف جهاز GPU المطلوب. يمكنك استخدام أداة « <code translate="no">nvidia-smi</code> »، المضمنة في برامج تشغيل شاشات NVIDIA GPU، لتحديد معرف جهاز GPU. يدعم Milvus أجهزة GPU متعددة.</li>
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

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>إذا فشلت في تشغيل الأمر أعلاه، فتحقق مما إذا كان نظامك يحتوي على Docker Compose V1 مثبتًا. إذا كان الأمر كذلك، يُنصح بالترحيل إلى Docker Compose V2 نظرًا للملاحظات الواردة في <a href="https://docs.docker.com/compose/">هذه الصفحة</a>.</p>
</div>
<p>بعد بدء تشغيل Milvus،</p>
<ul>
<li>تكون الحاويات المسماة <strong>milvus-standalone</strong> و <strong>milvus-minio</strong> و <strong>milvus-etcd</strong> قيد التشغيل.
<ul>
<li>لا تكشف حاوية <strong>milvus-etcd</strong> عن أي منافذ للمضيف وتقوم بتعيين بياناتها إلى <strong>volumes/etcd</strong> في المجلد الحالي.</li>
<li>تقدم حاوية <strong>milvus-minio</strong> المنافذ <strong>9090</strong> <strong>و9091</strong> محليًّا باستخدام بيانات اعتماد المصادقة الافتراضية وتقوم بتعيين بياناتها إلى <strong>volumes/minio</strong> في المجلد الحالي.</li>
<li>تقدم حاوية <strong>milvus-standalone</strong> المنافذ <strong>19530</strong> محليًّا باستخدام الإعدادات الافتراضية وتقوم بتعيين بياناتها إلى <strong>volumes/milvus</strong> في المجلد الحالي.</li>
</ul></li>
</ul>
<p>يمكنك التحقق مما إذا كانت الحاويات قيد التشغيل باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك أيضًا الوصول إلى واجهة المستخدم على الويب لـ Milvus على <code translate="no">http://127.0.0.1:9091/webui/</code> لمعرفة المزيد عن مثيل Milvus الخاص بك. لمزيد من التفاصيل، راجع <a href="/docs/ar/v2.6.x/milvus-webui.md">واجهة المستخدم على الويب</a> ل <a href="/docs/ar/v2.6.x/milvus-webui.md">ـ Milvus</a>.</p>
<p>إذا كنت قد قمت بتعيين أجهزة GPU متعددة لـ Milvus في ملف docker-compose.yml، فيمكنك تحديد جهاز GPU الذي سيكون مرئيًا أو متاحًا للاستخدام.</p>
<p>اجعل جهاز GPU <code translate="no">0</code> مرئيًا لـ Milvus:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">CUDA_VISIBLE_DEVICES=0 ./milvus run standalone</span>
<button class="copy-code-btn"></button></code></pre>
<p>اجعل أجهزة GPU <code translate="no">0</code> و <code translate="no">1</code> مرئية لـ Milvus:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">CUDA_VISIBLE_DEVICES=0,1 ./milvus run standalone</span>
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
    </button></h2><p>بعد تشغيل Milvus، يمكنك تخصيص تجمع الذاكرة عن طريق تعديل إعدادات <code translate="no">initMemSize</code> و <code translate="no">maxMemSize</code> في ملف <code translate="no">milvus.yaml</code>.</p>
<div class="alert note">
<p>يوجد ملف <code translate="no">milvus.yaml</code> في الدليل <code translate="no">/milvus/configs/</code> داخل حاوية Milvus.</p>
</div>
<p>لتكوين تجمع الذاكرة، قم بتعديل إعدادات <code translate="no">initMemSize</code> و <code translate="no">maxMemSize</code> في ملف <code translate="no">milvus.yaml</code> على النحو التالي.</p>
<ol>
<li><p>استخدم الأمر التالي لنسخ ملف <code translate="no">milvus.yaml</code> من حاوية Milvus إلى جهازك المحلي. استبدل <code translate="no">&lt;milvus_container_id&gt;</code> بمعرف حاوية Milvus الفعلي الخاص بك.</p>
<pre><code translate="no" class="language-shell">docker cp &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>افتح ملف <code translate="no">milvus.yaml</code> الذي تم نسخه باستخدام محرر النصوص المفضل لديك. على سبيل المثال، باستخدام vim:</p>
<pre><code translate="no" class="language-shell">vim milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتعديل إعدادات <code translate="no">initMemSize</code> و <code translate="no">maxMemSize</code> حسب الحاجة واحفظ التغييرات:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: الحجم الأولي لمجمع الذاكرة. القيمة الافتراضية هي 1024.</li>
<li><code translate="no">maxMemSize</code>: الحجم الأقصى لمجمع الذاكرة. القيمة الافتراضية هي 2048.</li>
</ul></li>
<li><p>استخدم الأمر التالي لنسخ ملف <code translate="no">milvus.yaml</code> المعدل مرة أخرى إلى حاوية Milvus. استبدل <code translate="no">&lt;milvus_container_id&gt;</code> بمعرف حاوية Milvus الفعلي الخاص بك.</p>
<pre><code translate="no" class="language-shell">docker cp milvus.yaml &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>أعد تشغيل حاوية Milvus لتطبيق التغييرات:</p>
<pre><code translate="no" class="language-shell">docker stop &lt;milvus_container_id&gt;
docker start &lt;milvus_container_id&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
<li><p>راجع «البدء السريع» ( <a href="/docs/ar/v2.6.x/quickstart.md">Quickstart</a> ) لمعرفة ما يمكن لـ Milvus القيام به.</p></li>
<li><p>راجع <a href="/docs/ar/v2.6.x/milvus-webui.md">واجهة المستخدم على الويب لـ Milvus</a> لمعرفة المزيد عن مثيل Milvus.</p></li>
<li><p>تعلم العمليات الأساسية لـ Milvus:</p>
<ul>
<li><a href="/docs/ar/v2.6.x/manage_databases.md">إدارة قواعد البيانات</a></li>
<li><a href="/docs/ar/v2.6.x/manage-collections.md">إدارة المجموعات</a></li>
<li><a href="/docs/ar/v2.6.x/manage-partitions.md">إدارة الأقسام</a></li>
<li><a href="/docs/ar/v2.6.x/insert-update-delete.md">الإدراج والتحديث والحذف</a></li>
<li><a href="/docs/ar/v2.6.x/single-vector-search.md">البحث أحادي المتجه</a></li>
<li><a href="/docs/ar/v2.6.x/multi-vector-search.md">البحث الهجين</a></li>
</ul></li>
<li><p><a href="/docs/ar/v2.6.x/upgrade_milvus_cluster-helm.md">ترقية Milvus باستخدام Helm Chart</a>.</p></li>
<li><p><a href="/docs/ar/v2.6.x/scaleout.md">توسيع نطاق مجموعة Milvus الخاصة بك</a>.</p></li>
<li><p>نشر مجموعة Milvus الخاصة بك على السحابة:</p>
<ul>
<li><a href="/docs/ar/v2.6.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ar/v2.6.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/ar/v2.6.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>استكشف <a href="/docs/ar/v2.6.x/milvus-webui.md">Milvus WebUI،</a> وهي واجهة ويب سهلة الاستخدام لمراقبة وإدارة Milvus.</p></li>
<li><p>اكتشف <a href="/docs/ar/v2.6.x/milvus_backup_overview.md">Milvus Backup</a>، وهي أداة مفتوحة المصدر لنسخ بيانات Milvus احتياطيًا.</p></li>
<li><p>اكتشف <a href="/docs/ar/v2.6.x/birdwatcher_overview.md">Birdwatcher،</a> وهي أداة مفتوحة المصدر لتصحيح أخطاء Milvus وتحديثات التكوين الديناميكية.</p></li>
<li><p>اكتشف <a href="https://github.com/zilliztech/attu">Attu،</a> وهي أداة واجهة مستخدم رسومية مفتوحة المصدر لإدارة Milvus بطريقة بديهية.</p></li>
<li><p><a href="/docs/ar/v2.6.x/monitor.md">راقب Milvus باستخدام Prometheus</a>.</p></li>
</ul>
