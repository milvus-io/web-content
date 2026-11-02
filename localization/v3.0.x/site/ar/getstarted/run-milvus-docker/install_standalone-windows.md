---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: >-
  تعرف على كيفية تثبيت Milvus بشكل مستقل باستخدام Docker Desktop لنظام التشغيل
  Windows.
title: تشغيل Milvus في Docker (Windows)
---
<h1 id="Run-Milvus-in-Docker-Windows" class="common-anchor-header">تشغيل Milvus في Docker (Windows)<button data-href="#Run-Milvus-in-Docker-Windows" class="anchor-icon" translate="no">
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
    </button></h1><blockquote>
<p>بشكل افتراضي، يعمل هذا النشر على تشغيل <strong>Woodpecker</strong> (نظام الملفات المحلي) كقائمة انتظار الرسائل الخاصة به، لذا لا توجد حاجة إلى خدمة خارجية لقائمة انتظار الرسائل. انظر <a href="/docs/ar/woodpecker.md">Woodpecker</a>.</p>
</blockquote>
<p>توضح هذه الصفحة كيفية تشغيل Milvus على نظام Windows باستخدام Docker Desktop مع الخلفية WSL 2 وحاويات Linux.</p>
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
<li><a href="https://docs.docker.com/desktop/setup/install/windows-install/">قم بتثبيت Docker Desktop</a> وتأكد من استيفاء متطلبات Windows والأجهزة الخاصة به.</li>
<li><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">قم بتثبيت Windows Subsystem for Linux 2 (WSL 2)</a>.</li>
<li>قم بتشغيل Docker Desktop، وقم بتمكين <strong>خيار «استخدام المحرك المستند إلى WSL 2</strong>»، وحدد حاويات Linux. بالنسبة للأوامر التي يتم تشغيلها داخل توزيع WSL، قم أيضًا بتمكين هذا التوزيع ضمن <strong>«الإعدادات»</strong> &gt; <strong>«الموارد</strong> » &gt; <strong>«تكامل WSL</strong>». انظر <a href="https://docs.docker.com/desktop/features/wsl/">الخلفية WSL 2 لـ Docker Desktop</a>.</li>
</ul>
<p>قم بإجراء الفحوصات التالية في PowerShell أو موجه أوامر Windows قبل تنزيل ملفات Milvus:</p>
<pre><code translate="no" class="language-powershell">wsl --version
docker info --format &quot;{{.OSType}}&quot;
docker compose version
</code></pre>
<p>يجب أن يكون نوع نظام التشغيل Docker هو " <code translate="no">linux</code>". تستخدم أمثلة Compose المكون الإضافي " <code translate="no">docker compose</code> " (الإصدار 2 أو الأحدث)، وليس الأمر القديم " <code translate="no">docker-compose</code> " الإصدار 1.</p>
<h2 id="Run-Milvus-in-Docker" class="common-anchor-header">تشغيل Milvus في Docker<button data-href="#Run-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>اختر أحد المحطات الطرفية التالية. قم بتشغيل الأوامر في دليل عمل قابل للكتابة؛ حيث يقوم البرنامج النصي بتخزين ملفات التكوين ودليل <code translate="no">volumes</code> هناك.</p>
<p>يتم تنزيل البرنامج النصي من فرع Milvus <code translate="no">master</code>. يتم تعريف علامة صورة Docker الخاصة به في البرنامج النصي وقد تختلف عن الإصدار v3.0.3. لنشر هذا الإصدار بالضبط، استخدم تكوين Docker Compose المحدد بالإصدار أدناه.</p>
<h3 id="From-PowerShell" class="common-anchor-header">من PowerShell<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتنزيل البرنامج النصي، ثم قم بتشغيل Milvus:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -OutFile standalone.bat
.\standalone.bat start
</code></pre>
<p>يتطلب PowerShell البادئة <code translate="no">.\</code> لتشغيل البرنامج النصي من دليل العمل.</p>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">من موجه أوامر Windows<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم <code translate="no">curl.exe</code> لتنزيل البرنامج النصي؛ حيث إن <code translate="no">Invoke-WebRequest</code> هو أمر PowerShell ولا يعمل في موجه الأوامر:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -o standalone.bat
standalone.bat start
</code></pre>
<p>بعد تشغيل أي من تسلسل أوامر Windows التالية:</p>
<ul>
<li>تعمل حاوية Docker المسماة <strong>milvus-standalone</strong> على المنفذ <strong>19530</strong>.</li>
<li>يعمل etcd المدمج في نفس الحاوية على المنفذ <strong>2379</strong>. ويُربط ملف التكوين الخاص به بملف <strong>embedEtcd.yaml</strong> الموجود في دليل العمل.</li>
<li>يخزن Milvus البيانات في مجلد <strong>volumes/milvus</strong> في دليل العمل.</li>
<li>توجد تعليلات التكوين في <strong>ملف user.yaml</strong> الموجود في دليل العمل. أعد تشغيل الحاوية بعد تغييرها.</li>
</ul>
<p>تحقق من حالة الصورة والحاوية في أي من المحطات الطرفية:</p>
<pre><code translate="no" class="language-powershell">docker inspect --format &quot;{{.Config.Image}}&quot; milvus-standalone
docker ps --filter name=milvus-standalone
</code></pre>
<p>لإيقاف Milvus من PowerShell، قم بتشغيل الأمر « <code translate="no">.\standalone.bat stop</code> »؛ ومن موجه الأوامر، قم بتشغيل الأمر « <code translate="no">standalone.bat stop</code> ». يقوم الأمر « <code translate="no">delete</code> » بإزالة كل من الحاوية والبيانات المخزنة فيها. قم بعمل نسخة احتياطية من البيانات قبل استخدامها.</p>
<h3 id="From-WSL-2" class="common-anchor-header">من WSL 2<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>افتح توزيع WSL المثبت لديك من محطة Windows:</p>
<pre><code translate="no" class="language-powershell">wsl
</code></pre>
<p>في محطة WSL، قم بتنزيل البرنامج النصي لـ Linux وقم بتشغيل Milvus مرة واحدة:</p>
<pre><code translate="no" class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>لإيقاف Milvus، قم بتشغيل الأمر <code translate="no">bash standalone_embed.sh stop</code>. يقوم الأمر <code translate="no">bash standalone_embed.sh delete</code> بإزالة الحاوية والتكوين والبيانات؛ قم بعمل نسخة احتياطية من البيانات قبل استخدامها.</p>
<h2 id="Run-Milvus-with-Docker-Compose" class="common-anchor-header">تشغيل Milvus باستخدام Docker Compose<button data-href="#Run-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم التكوين المرفق بالإصدار v3.0.3. قم بتشغيل تسلسل الأوامر الخاص بمحطة العمل الخاصة بك فقط.</p>
<h3 id="From-PowerShell" class="common-anchor-header">من PowerShell<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتنزيل التكوين وابدأ تشغيل Milvus:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml&quot; -OutFile docker-compose.yml
docker compose up -d
docker compose ps
</code></pre>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">من موجه أوامر Windows<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتنزيل ملف التكوين وابدأ تشغيل Milvus:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml&quot; -o docker-compose.yml
docker compose up -d
docker compose ps
</code></pre>
<h3 id="From-WSL-2" class="common-anchor-header">من WSL 2<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>افتح توزيع WSL الخاص بك، ثم قم بتشغيل أوامر Linux التالية:</p>
<pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml -O docker-compose.yml
docker compose up -d
docker compose ps
<button class="copy-code-btn"></button></code></pre>
<p>يبدأ التكوين تشغيل ثلاث حاويات طويلة الأمد: <strong>milvus-standalone</strong> و <strong>milvus-minio</strong> و <strong>milvus-etcd</strong>. كما يقوم بتشغيل خدمة <code translate="no">milvus-volume-init</code> لمرة واحدة لإعداد ملكية دليل البيانات. يتم تعيين بياناتها إلى <strong>volumes/milvus</strong> و <strong>volumes/minio</strong> و <strong>volumes/etcd</strong> في دليل العمل. يُتيح MinIO المنفذين <strong>9000</strong> <strong>و9001</strong>؛ بينما يُتيح Milvus المنفذين <strong>19530</strong> <strong>و9091</strong>. للاطلاع على أوامر التكوين ودورة الحياة، راجع <a href="/docs/ar/install_standalone-docker-compose.md">«تشغيل Milvus باستخدام Docker Compose</a>».</p>
<h2 id="FAQs" class="common-anchor-header">الأسئلة الشائعة<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error" class="common-anchor-header">كيف يمكنني التعامل مع خطأ « <code translate="no">Docker Engine stopped</code> »؟<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error" class="anchor-icon" translate="no">
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
    </button></h3><p>يستخدم Milvus حاويات Linux. تحقق من Docker Desktop ووحدة WSL 2 الخلفية الخاصة به قبل إعادة محاولة التثبيت:</p>
<ol>
<li><p>قم بتمكين المحاكاة الافتراضية للأجهزة في BIOS/UEFI إذا أظهر <strong>«مدير المهام»</strong> &gt; <strong>«الأداء»</strong> أنها معطلة. راجع <a href="https://docs.docker.com/desktop/setup/install/windows-install/#system-requirements">متطلبات Docker Desktop لنظام Windows</a>.</p></li>
<li><p>ابدأ تشغيل Docker Desktop من قائمة «ابدأ» في Windows وانتظر حتى يتم تشغيل محركه. قد تكون امتيازات المسؤول مطلوبة لتثبيت WSL أو تحديثه أو لأوضاع تثبيت Docker Desktop محددة؛ وهي ليست متطلبًا عامًا لتشغيل حاويات Linux باستخدام الخلفية WSL 2.</p></li>
<li><p>تحقق من WSL من محطة Windows. إذا كان يحتاج إلى تحديث، فقم بتشغيل أمر التحديث باستخدام الامتيازات التي يطلبها Windows:</p>
<pre><code translate="no" class="language-powershell">wsl --version
wsl --update
</code></pre></li>
<li><p>قم بتمكين <strong>استخدام المحرك المستند إلى WSL 2</strong> في Docker Desktop. إذا كانت قائمة Docker تعرض خيار <strong>«التبديل إلى حاويات Linux</strong>»، فحدد هذا الخيار. لا تقم بالتبديل إلى حاويات Windows لاستكشاف أخطاء صورة Milvus Linux وإصلاحها.</p></li>
<li><p>قم بتشغيل الفحص التالي في محطة العمل التي تستخدمها للتثبيت:</p>
<pre><code translate="no" class="language-powershell">docker info --format &quot;{{.OSType}}&quot;
</code></pre>
<p>يجب أن يُرجع النتيجة « <code translate="no">linux</code> ». إذا تعذر الاتصال بالخدمة الخلفية، فاتبع <a href="https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/">إرشادات استكشاف الأخطاء وإصلاحها في Docker Desktop</a> قبل إعادة تشغيل البرنامج النصي لـ Milvus. لا يُثبت تشغيل « <code translate="no">com.docker.service</code> » وحده أن محرك Linux الخاص بـ WSL 2 قيد التشغيل.</p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="common-anchor-header">كيف يمكنني التعامل مع المشكلات المتعلقة بـ WSL أثناء نشر Milvus؟<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا واجهت مشكلات متعلقة بـ WSL أثناء تشغيل Milvus من WSL 2، فقد تحتاج إلى التحقق مما إذا كنت قد قمت بتكوين Docker Desktop لاستخدام المحرك القائم على WSL 2 على النحو التالي:</p>
<ol>
<li><p>تأكد من تحديد خيار «استخدام المحرك القائم على WSL 2» في <strong>«الإعدادات»</strong> &gt; <strong>«عام</strong>».</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>استخدام المحرك القائم على WSL 2 في إعدادات Docker Desktop</span>
  
 </span></p></li>
<li><p>اختر من توزيعات WSL 2 المثبتة لديك تلك التي تريد تمكين تكامل Docker عليها بالانتقال إلى: <strong>الإعدادات</strong> &gt; <strong>الموارد</strong> &gt; <strong>تكامل WSL</strong>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>تحديد توزيعات WSL 2 في إعدادات Docker Desktop</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="common-anchor-header">كيف يمكنني التعامل مع الأخطاء المتعلقة بحجم التخزين التي تظهر أثناء بدء تشغيل Milvus والتي تنص على « <code translate="no">Read config failed</code> »؟<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="anchor-icon" translate="no">
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
    </button></h3><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" /> 
   <span>رسالة الخطأ «فشل قراءة التكوين» عند بدء تشغيل Milvus</span>
  
 </span></p>
<p>للتعامل مع الخطأ الذي يظهر أثناء بدء تشغيل Milvus والذي ينص على «فشل قراءة التكوين»، تحتاج إلى التحقق مما إذا كان وحدة التخزين المثبتة في حاوية Milvus صحيحة. إذا كانت وحدة التخزين مثبتة بشكل صحيح في الحاوية، يمكنك استخدام الأمر <code translate="no">docker exec</code> للدخول إلى الحاوية وإدراج مجلد <strong>/milvus/configs</strong> كما يلي:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>عرض ملفات تكوين Milvus</span>
  
 </span></p>
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
    </button></h2><p>بعد تثبيت Milvus في Docker، اتبع مسار <strong>«استخدام خادم Milvus موجود</strong> » في <a href="/docs/ar/quickstart.md">«البدء السريع»</a> وقم بتوصيل SDK بـ <code translate="no">http://localhost:19530</code>. لا يحتاج مسار الخادم هذا إلى Milvus Lite؛ حيث سيقوم كتلة الاتصال المحلية <code translate="no">.db</code> بتشغيل قاعدة بيانات محلية منفصلة بدلاً من استخدام هذه الحاوية.</p>
<p>يمكنك أيضًا:</p>
<ul>
<li><p>راجع «البدء السريع» ( <a href="/docs/ar/quickstart.md">Quickstart</a> ) لمعرفة ما يمكن لـ Milvus القيام به.</p></li>
<li><p>تعلم العمليات الأساسية لـ Milvus:</p>
<ul>
<li><a href="/docs/ar/manage_databases.md">إدارة قواعد البيانات</a></li>
<li><a href="/docs/ar/manage-collections.md">إدارة المجموعات</a></li>
<li><a href="/docs/ar/manage-partitions.md">إدارة الأقسام</a></li>
<li><a href="/docs/ar/insert-update-delete.md">الإدراج والتحديث والحذف</a></li>
<li><a href="/docs/ar/single-vector-search.md">البحث أحادي المتجه</a></li>
<li><a href="/docs/ar/multi-vector-search.md">البحث المختلط</a></li>
</ul></li>
<li><p>بالنسبة لعمليات النشر باستخدام Compose، اتبع <a href="/docs/ar/upgrade_milvus_standalone-docker.md">إرشادات ترقية Milvus Standalone باستخدام Docker Compose؛</a> وتحقق من صحة الإجراء في بيئتك قبل الترقية.</p></li>
<li><p><a href="/docs/ar/scaleout.md">قم بتوسيع نطاق مجموعة Milvus الخاصة بك</a>.</p></li>
<li><p>انشر مجموعة Milvus الخاصة بك على السحابة:</p>
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
