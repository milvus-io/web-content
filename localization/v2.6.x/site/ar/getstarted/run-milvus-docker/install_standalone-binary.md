---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: تعرف على كيفية تثبيت Milvus المستقل مع حزمة RPM/DEB المبنية مسبقاً.
title: تثبيت برنامج Milvus Standalone مع حزمة RPM/DEB
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">تثبيت برنامج Milvus Standalone مع حزمة RPM/DEB<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>توضح هذه الصفحة كيفية تثبيت Milvus Standalone مع حزمة RPM/DEB مبنية مسبقاً.</p>
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
<li>أن تكون قد قمت مسبقاً بتثبيت libstdc++8.5.0 أو إصدار أحدث.</li>
<li><a href="/docs/ar/prerequisite-docker.md">تحقق من متطلبات الأجهزة والبرامج</a> قبل التثبيت.</li>
</ul>
<h2 id="Download-the-RPMDEB-Package" class="common-anchor-header">تنزيل حزمة RPM/DEB<button data-href="#Download-the-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك تنزيل حزمة RPM/DEB وفقاً لبنية نظامك من <a href="https://github.com/milvus-io/milvus/releases/tag/v2.6.3">صفحة إصدارات Milvus</a>.</p>
<ul>
<li>بالنسبة ل x86_64/amd64، قم بتنزيل حزمة <strong>milvus_2.6.0-1_amd64.deb</strong> أو حزمة <strong>milvus_2.6.0-1_amd64.rpm.</strong> </li>
<li>بالنسبة إلى ARM64، قم بتنزيل حزمة <strong>milvus_2.6.0.0-1_arm64.deb</strong> أو حزمة <strong>milvus_2.6.0-1_arm64.rpm.</strong> </li>
</ul>
<p>يفترض الأمر التالي أنك ستقوم بتشغيل Milvus Standalone على جهاز x86_64/amd64.</p>
<pre><code translate="no" class="language-shell">wget https://github.com/milvus-io/milvus/releases/download/v2.6.3/milvus_2.6.0-1_amd64.rpm -O milvus_2.6.0-1_amd64.rpm
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-the-RPMDEB-Package" class="common-anchor-header">تثبيت حزمة RPM/DEB<button data-href="#Install-the-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h2><p>لتثبيت حزمة RPM/DEB، يمكنك استخدام مدير الحزم الخاص بنظامك.</p>
<p>بالنسبة للأنظمة المستندة إلى RPM (مثل CentOS وFedora وRHEL)، استخدم الأمر <code translate="no">yum</code> لتثبيت الحزمة.</p>
<pre><code translate="no" class="language-shell">yum install -y ./milvus_2.6.0-1_amd64.rpm
rpm -qa| grep milvus
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة للأنظمة المستندة إلى DEB (مثل Ubuntu و Debian)، استخدم الأمر <code translate="no">apt</code> لتثبيت الحزمة.</p>
<pre><code translate="no" class="language-shell">apt install -y  ./milvus_2.6.0-1_amd64.deb
dpkg -l | grep milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Milvus-Standalone" class="common-anchor-header">ابدأ تشغيل ميلفوس Standalone<button data-href="#Start-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد اكتمال التثبيت، يتم تثبيت ميلفوس كخدمة systemd ويمكن بدء تشغيله باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">systemctl start milvus
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك التحقق من حالة خدمة ميلفوس باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">systemctl status milvus
<button class="copy-code-btn"></button></code></pre>
<p>إذا كان ميلفوس يعمل بنجاح، يجب أن ترى المخرجات التالية:</p>
<pre><code translate="no"><span class="hljs-string">●</span> <span class="hljs-string">milvus.service</span> <span class="hljs-bullet">-</span> <span class="hljs-string">Milvus</span> <span class="hljs-string">Standalone</span> <span class="hljs-string">Server</span>
   <span class="hljs-attr">Loaded:</span> <span class="hljs-string">loaded</span> <span class="hljs-string">(/lib/systemd/system/milvus.service;</span> <span class="hljs-string">enabled;</span> <span class="hljs-attr">vendor preset:</span> <span class="hljs-string">enabled)</span>
   <span class="hljs-attr">Active:</span> <span class="hljs-string">active</span> <span class="hljs-string">(running)</span> <span class="hljs-string">since</span> <span class="hljs-string">Fri</span> <span class="hljs-number">2025-08-10 10:30:00 </span><span class="hljs-string">UTC;</span> <span class="hljs-string">5s</span> <span class="hljs-string">ago</span>
 <span class="hljs-attr">Main PID:</span> <span class="hljs-number">1044122</span> <span class="hljs-string">(milvus)</span>
    <span class="hljs-attr">Tasks: 10 (limit:</span> <span class="hljs-number">4915</span><span class="hljs-string">)</span>
   <span class="hljs-attr">CGroup:</span> <span class="hljs-string">/system.slice/milvus.service</span>
           <span class="hljs-string">└─1044122</span> <span class="hljs-string">/usr/bin/milvus</span> <span class="hljs-string">run</span> <span class="hljs-string">standalone</span>
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك العثور على ملف خدمة ميلفوس الثنائي في <code translate="no">/usr/bin/milvus</code> ، وملف خدمة systemd في <code translate="no">/lib/systemd/system/milvus.service</code> ، والتبعيات في <code translate="no">/usr/lib/milvus/</code>.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(اختياري) تحديث تكوينات ميلفوس<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك تعديل تكوينات ميلفوس في ملف <code translate="no">/etc/milvus/configs/milvus.yaml</code>. على سبيل المثال، لتغيير <code translate="no">proxy.healthCheckTimeout</code> إلى <code translate="no">1000</code> مللي ثانية، يمكنك البحث عن المعلمة الهدف وتعديلها وفقًا لذلك. للاطلاع على عناصر التكوين القابلة للتطبيق، راجع <a href="/docs/ar/system_configuration.md">تكوين النظام</a>.</p>
<h2 id="Stop-Milvus-Standalone" class="common-anchor-header">إيقاف Milvus Standalone<button data-href="#Stop-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>لإيقاف Milvus Standalone، يمكنك استخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">systemctl stop milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus-Standalone" class="common-anchor-header">إلغاء تثبيت Milvus Standalone<button data-href="#Uninstall-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>لإلغاء تثبيت Milvus Standalone، يمكنك استخدام الأمر التالي:</p>
<p>للأنظمة المستندة إلى RPM:</p>
<pre><code translate="no" class="language-shell">rpm -e milvus
<button class="copy-code-btn"></button></code></pre>
<p>للأنظمة المستندة إلى DEB:</p>
<pre><code translate="no" class="language-shell">apt remove milvus
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>بعد تثبيت ميلفوس ستاندالون، يمكنك:</p>
<ul>
<li><p>التحقق من <a href="/docs/ar/quickstart.md">Quickstart</a> لمعرفة ما يمكن أن يفعله ميلفوس.</p></li>
<li><p>تعلم العمليات الأساسية لملفوس:</p>
<ul>
<li><a href="/docs/ar/manage_databases.md">إدارة قواعد البيانات</a></li>
<li><a href="/docs/ar/manage-collections.md">إدارة المجموعات</a></li>
<li><a href="/docs/ar/manage-partitions.md">إدارة الأقسام</a></li>
<li><a href="/docs/ar/insert-update-delete.md">إدراج وإدراج وحذف وإدراج وحذف</a></li>
<li><a href="/docs/ar/single-vector-search.md">البحث في متجه واحد</a></li>
<li><a href="/docs/ar/multi-vector-search.md">البحث الهجين</a></li>
</ul></li>
<li><p><a href="/docs/ar/upgrade_milvus_cluster-helm.md">ترقية Milvus باستخدام مخطط Helm</a>.</p></li>
<li><p><a href="/docs/ar/scaleout.md">توسيع نطاق مجموعة ميلفوس الخاصة بك</a></p></li>
<li><p>نشر مجموعة ميلفوس الخاصة بك على السحابة:</p>
<ul>
<li><a href="/docs/ar/eks.md">أمازون EKS</a></li>
<li><a href="/docs/ar/gcp.md">جوجل كلاود</a></li>
<li><a href="/docs/ar/azure.md">مايكروسوفت أزور</a></li>
</ul></li>
<li><p>استكشف <a href="/docs/ar/milvus-webui.md">واجهة Milvus WebUI،</a> وهي واجهة ويب سهلة الاستخدام لمراقبة وإدارة Milvus.</p></li>
<li><p>استكشف Milvus <a href="/docs/ar/milvus_backup_overview.md">Backup،</a> وهي أداة مفتوحة المصدر للنسخ الاحتياطية لبيانات Milvus.</p></li>
<li><p>استكشف <a href="/docs/ar/birdwatcher_overview.md">Birdwatcher،</a> وهي أداة مفتوحة المصدر لتصحيح أخطاء ميلفوس وتحديثات التكوين الديناميكية.</p></li>
<li><p>استكشف <a href="https://github.com/zilliztech/attu">Attu،</a> وهي أداة مفتوحة المصدر لواجهة المستخدم الرسومية لإدارة Milvus بسهولة.</p></li>
<li><p><a href="/docs/ar/monitor.md">راقب ميلفوس باستخدام بروميثيوس</a>.</p></li>
</ul>
