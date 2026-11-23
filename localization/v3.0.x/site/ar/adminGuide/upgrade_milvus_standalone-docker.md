---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 2
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: تعرف على كيفية ترقية الإصدار المستقل من Milvus باستخدام Docker Compose.
title: ترقية Milvus Standalone باستخدام Docker Compose
---
<div class="tab-wrapper"><a href="/docs/ar/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/ar/upgrade_milvus_standalone-docker.md" class='active '>Operator Helm Docker Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">ترقية Milvus Standalone باستخدام Docker Compose<button data-href="#Upgrade-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الدليل كيفية ترقية نشر Milvus 2.6.x المستقل إلى الإصدار v3.0.5 باستخدام Docker Compose.</p>
<div class="alert note">
<p>تم التحقق من صحة هذا الإجراء باستخدام التكوين الرسمي لـ Milvus 2.6.20 المستقل مع Docker Compose مع تغيير في الصورة فقط. تضيف الخطوة 2 أيضًا خدمة ملكية دليل البيانات من تكوين Compose للإصدار v3.0.5، وهو ما لم يشمله ذلك التحقق.</p>
</div>
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
<li>محرك Docker و Docker Compose V2</li>
<li>نشر مستقل حالي لـ Milvus 2.6.x مُدار بواسطة Docker Compose</li>
<li>ملف Docker Compose والتكوين المستخدمان للنشر الحالي</li>
<li>نسخة احتياطية حديثة من بيانات Milvus الوصفية والبيانات الدائمة</li>
</ul>
<p><strong>قيود قائمة انتظار الرسائل</strong>: عند الترقية إلى Milvus v3.0.5، يجب الحفاظ على اختيارك الحالي لقائمة انتظار الرسائل. لا يُدعم التبديل بين أنظمة قوائم انتظار الرسائل المختلفة أثناء الترقية. سيتوفر دعم تغيير أنظمة قوائم انتظار الرسائل في الإصدارات المستقبلية.</p>
<div class="alert warning">
<p>لا تستبدل ملف Compose الحالي أو تغير إصدارات التبعيات كجزء من هذا الإجراء. احتفظ بـ etcd الحالي، وتخزين الكائنات، وقائمة انتظار الرسائل، ووحدات التخزين، والتكوين. قم بتحديث علامة صورة Milvus وأضف خدمة ملكية دليل البيانات الموضحة في الخطوة 2.</p>
<p>إذا كان ملف Compose الخاص بك يستخدم <code translate="no">minio/minio:RELEASE.2024-12-18T13-15-44Z</code> ولم يتمكن Docker من سحب هذه الصورة، فقم بتغييرها إلى <code translate="no">milvusdb/minio:RELEASE.2024-12-18T13-15-44Z</code> ، والتي يستخدمها تكوين Compose الإصدار v3.0.5. احتفظ بنفس علامة الإصدار.</p>
<p>لا يتحقق هذا الإجراء من صحة الرجوع إلى إصدار أقدم أو التراجع عن الترقية عن طريق إعادة صورة Milvus إلى الإصدار 2.6.x. بعد أن تقوم الإصدارة v3.0.5 بكتابة البيانات، قد يفشل التراجع الذي يقتصر على الصورة في قراءة الحالة المحدثة. إذا فشل الترقية، أوقف عمليات الكتابة واستخدم خطة استعادة تعيد البيانات الوصفية قبل الترقية ونسخ البيانات الدائمة الاحتياطية. تحقق من صحة خطة الاستعادة في بيئة غير إنتاجية أولاً.</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">عملية الترقية<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Back-up-the-current-configuration" class="common-anchor-header">الخطوة 1: النسخ الاحتياطي للتكوين الحالي<button data-href="#Step-1-Back-up-the-current-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>احفظ نسخة من ملف Compose الحالي وأي ملفات تكوين Milvus مركبة:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cp</span> docker-compose.yml docker-compose-before-upgrade.yml
<button class="copy-code-btn"></button></code></pre>
<p>تأكد من أن الحاويات الحالية تعمل بشكل سليم قبل بدء الترقية:</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Update-the-Milvus-image" class="common-anchor-header">الخطوة 2: تحديث صورة Milvus<button data-href="#Step-2-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>في ملف Compose الحالي، قم بتحديث صورة خدمة <code translate="no">standalone</code> ، واستبدل إدخالات <code translate="no">depends_on</code> الخاصة بها بالإدخالات أدناه، وأضف خدمة <code translate="no">milvus-volume-init</code>. استخدم الصورة نفسها لكلتا الخدمتين، وقم بتركيب الدليل المضيف نفسه الذي تقوم خدمة <code translate="no">standalone</code> بتركيبه في <code translate="no">/var/lib/milvus</code>. احتفظ بالإعدادات الأخرى لخدمة <code translate="no">standalone</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">milvus-volume-init:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;0:0&quot;</span>
    <span class="hljs-attr">network_mode:</span> <span class="hljs-string">none</span>
    <span class="hljs-attr">read_only:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">&quot;no&quot;</span>
    <span class="hljs-attr">entrypoint:</span> [<span class="hljs-string">&quot;/bin/sh&quot;</span>, <span class="hljs-string">&quot;-c&quot;</span>]
    <span class="hljs-attr">command:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">|
        set -eu
        uid=&quot;$$(id -u milvus)&quot;
        gid=&quot;$$(id -g milvus)&quot;
        marker=&quot;/var/lib/milvus/.milvus-volume-owner-$${uid}-$${gid}&quot;
        if [ ! -e &quot;$${marker}&quot; ]; then
          echo &quot;Preparing /var/lib/milvus for $${uid}:$${gid}&quot;
          chown -R &quot;$${uid}:$${gid}&quot; /var/lib/milvus
          touch &quot;$${marker}&quot;
          chown &quot;$${uid}:$${gid}&quot; &quot;$${marker}&quot;
        fi
</span>    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>

  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-attr">milvus-volume-init:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_completed_successfully</span>
      <span class="hljs-attr">etcd:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
      <span class="hljs-attr">minio:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
<button class="copy-code-btn"></button></code></pre>
<p>تُشغّل صور Milvus v3.0.5 برنامج Milvus بصفتها مستخدمًا غير جذر <code translate="no">milvus</code> ، بينما لا تحدد صور Milvus 2.6.x مستخدمًا وتُشغّل Milvus بصفتها <code translate="no">root</code>. تأتي خدمة <code translate="no">milvus-volume-init</code> من تكوين Compose الإصدار v3.0.5. وتعمل هذه الخدمة مرة واحدة باسم <code translate="no">root</code> قبل بدء تشغيل Milvus، وتقوم بتغيير مالك المجلد <code translate="no">/var/lib/milvus</code> ومحتوياته إلى المستخدم والمجموعة <code translate="no">milvus</code> ، حتى يتمكن Milvus من الكتابة في الملفات التي أنشأها النشر 2.6.x. ثم تقوم بكتابة ملف علامة <code translate="no">.milvus-volume-owner-&lt;uid&gt;-&lt;gid&gt;</code> في المجلد <code translate="no">/var/lib/milvus</code> ولا تُجري أي تغييرات في عمليات التشغيل اللاحقة طالما ظل ملف العلامة موجودًا. إذا قمت لاحقًا باستعادة ملفات مملوكة لمستخدم آخر إلى دليل البيانات، فقم بإزالة ملف العلامة حتى تعمل الخدمة مرة أخرى.</p>
<p>قم بسحب الصورة المستهدفة وإعادة إنشاء حاوية Milvus. نظرًا لأن خدمة <code translate="no">standalone</code> تعتمد على <code translate="no">milvus-volume-init</code> ، يقوم Docker Compose بتشغيل <code translate="no">milvus-volume-init</code> حتى اكتماله قبل بدء تشغيل حاوية Milvus الجديدة:</p>
<pre><code translate="no" class="language-bash">docker compose pull standalone
docker compose up --detach standalone
<button class="copy-code-btn"></button></code></pre>
<p>يحافظ Docker Compose على تشغيل حاويات etcd وobject-storage الحالية ويعيد استخدام دلائل البيانات التي تم تكوينها. إذا قمت بتغيير تكوين أحد التبعيات، على سبيل المثال صورة MinIO، فإن Compose يعيد إنشاء تلك الحاوية ويحتفظ بوحدات التخزين المثبتة بها.</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">تحقق من الترقية<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>تحقق من حالة الحاوية والصورة المستخدمة من قبل حاوية Milvus:</p>
<pre><code translate="no" class="language-bash">docker compose ps

docker compose images standalone

docker compose logs --<span class="hljs-built_in">tail</span> 100 standalone
<button class="copy-code-btn"></button></code></pre>
<p>تأكد من أن خدمة <code translate="no">standalone</code> تعمل بشكل سليم، وأن صورتها هي <code translate="no">milvusdb/milvus:v3.0.5</code> ، وأن المجموعات الحالية لا تزال قابلة للاستعلام والبحث. أكمل هذه الفحوصات قبل تمكين أي ميزة خاصة بالإصدار v3.0.5.</p>
<div class="alert note">
<p>لا يؤدي الترقية إلى Milvus 3.0 إلى تمكين Storage V3. بعد التحقق من الترقية، راجع <a href="/docs/ar/storage-v3.md">Storage V3</a> قبل تمكين الميزات التي تعتمد عليه. بمجرد أن يقوم Milvus بكتابة بيانات Storage V3، لن يتم دعم الرجوع إلى إصدار أقدم من Milvus لا يمكنه قراءة Storage V3.</p>
</div>
