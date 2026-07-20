---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: >-
  تعرف على كيفية تثبيت Milvus بشكل مستقل باستخدام Docker Desktop لنظام التشغيل
  Windows.
title: تشغيل Milvus في Docker (لينكس)
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
    </button></h1><p>توضح هذه الصفحة كيفية تشغيل Milvus على نظام Windows باستخدام Docker Desktop لـ Windows.​</p>
<h2 id="Prerequisites​" class="common-anchor-header">المتطلبات الأساسية​<button data-href="#Prerequisites​" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.docker.com/desktop/setup/install/windows-install/">تثبيت Docker Desktop</a>.</p></li>
<li><p><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">تثبيت Windows Subsystem for Linux 2 (WSL 2)</a>.​</p></li>
<li><p>تثبيت Python 3.8 أو إصدار أحدث.</p></li>
</ul>
<h2 id="Run-Milvus-in-Docker​" class="common-anchor-header">تشغيل Milvus في Docker​<button data-href="#Run-Milvus-in-Docker​" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر Milvus برنامج نصي للتثبيت لتثبيته كحاوية Docker. بمجرد تثبيت Docker Desktop على Microsoft Windows، يمكنك الوصول إلى واجهة Docker CLI من PowerShell أو موجه أوامر Windows في وضع <strong>المسؤول</strong> ومن WSL 2. ​</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">من PowerShell أو موجه أوامر Windows​<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا كنت أكثر إلمامًا بـ PowerShell أو موجه أوامر Windows، فإن موجه الأوامر هو كما يلي.</p>
<ol>
<li><p>افتح Docker Desktop في وضع المسؤول عن طريق النقر بزر الماوس الأيمن واختيار <strong>«تشغيل كمسؤول</strong>».​</p></li>
<li><p>قم بتنزيل البرنامج النصي للتثبيت واحفظه باسم « <code translate="no">standalone.bat</code> ».​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;Invoke-WebRequest https://raw.githubusercontent.com/milvus-io/milvus/refs/heads/master/scripts/standalone_embed.bat -OutFile standalone.bat​

</code></pre></li>
<li><p>قم بتشغيل البرنامج النصي الذي تم تنزيله لبدء تشغيل Milvus كحاوية Docker.​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;standalone.bat start​
Wait for Milvus starting...​
Start successfully.​
To change the default Milvus configuration, edit user.yaml and restart the service.​

</code></pre>
<p>بعد تشغيل البرنامج النصي للتثبيت:​</p>
<ul>
<li><p>تم تشغيل حاوية Docker باسم <strong>milvus-standalone</strong> على المنفذ <strong>19530</strong>.​</p></li>
<li><p>تم تثبيت embed etcd مع Milvus في نفس الحاوية ويعمل على المنفذ <strong>2379</strong>. ويتم تعيين ملف التكوين الخاص به إلى <strong>embedEtcd.yaml</strong> في المجلد الحالي.​</p></li>
<li><p>يتم تعيين وحدة تخزين بيانات Milvus إلى <strong>volumes/milvus</strong> في المجلد الحالي.​</p></li>
</ul>
<p>يمكنك استخدام الأوامر التالية لإدارة حاوية Milvus والبيانات المخزنة.​</p>
<pre><code translate="no" class="language-powershell"># Stop Milvus​
C:\&gt;standalone.bat stop​
Stop successfully.​
​
# Delete Milvus container​
C:\&gt;standalone.bat delete​
Delete Milvus container successfully. # Container has been removed.​
Delete successfully. # Data has been removed.​

</code></pre></li>
</ol>
<h3 id="From-WSL-2​" class="common-anchor-header">من WSL 2​<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا كنت تفضل تشغيل Milvus باستخدام أوامر Linux ونصوص shell على نظام Windows، فتأكد من تثبيت WSL 2 مسبقًا. للحصول على تفاصيل حول كيفية تثبيت WSL 2، يمكنك الرجوع إلى هذه <a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">المقالة من Microsoft</a>.​</p>
<ol>
<li><p>ابدأ تشغيل WSL 2.​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>قم بتنزيل البرنامج النصي للتثبيت​</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Download the installation script​</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh​
​
<span class="hljs-comment"># Start the Docker container​</span>
$ bash standalone_embed.sh start​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>ابدأ تشغيل Milvus كحاوية Docker.</p>
<pre><code translate="no" class="language-bash">$ bash standalone_embed.sh start​
Wait <span class="hljs-keyword">for</span> Milvus Starting...​
Start successfully.​
To change the default Milvus configuration, add your settings to the user.yaml file and <span class="hljs-keyword">then</span> restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>يمكنك استخدام الأوامر التالية لإدارة حاوية Milvus والبيانات المخزنة.​</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Stop Milvus​</span>
$ bash standalone_embed.sh stop​
Stop successfully.​
​
<span class="hljs-comment"># Delete Milvus data​</span>
$ bash standalone_embed.sh stop​
Delete Milvus container successfully.​
Delete successfully.​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Run-Milvus-with-Docker-Compose​" class="common-anchor-header">تشغيل Milvus باستخدام Docker Compose​<button data-href="#Run-Milvus-with-Docker-Compose​" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد تثبيت Docker Desktop على نظام Microsoft Windows، يمكنك الوصول إلى واجهة Docker CLI من PowerShell أو موجه أوامر Windows في وضع <strong>المسؤول</strong>. يمكنك تشغيل Docker Compose إما في PowerShell أو موجه أوامر Windows أو WSL 2 لبدء تشغيل Milvus.</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">من PowerShell أو موجه أوامر Windows<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
<li><p>افتح Docker Desktop في وضع المسؤول عن طريق النقر بزر الماوس الأيمن واختيار <strong>«تشغيل كمسؤول</strong>».​</p></li>
<li><p>قم بتشغيل الأوامر التالية في PowerShell أو موجه أوامر Windows لتنزيل ملف تكوين Docker Compose لـ Milvus Standalone وتشغيل Milvus.</p>
<pre><code translate="no" class="language-powershell"># Download the configuration file and rename it as docker-compose.yml​
C:\&gt;Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.6.20/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml​
​
# Start Milvus​
C:\&gt;docker compose up -d​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

</code></pre>
<p>اعتمادًا على اتصالك بالشبكة، قد يستغرق تنزيل الصور الخاصة بتثبيت Milvus بعض الوقت. بمجرد تشغيل الحاويات المسماة <strong>milvus-standalone</strong> و <strong>milvus-minio</strong> و <strong>milvus-etcd،</strong> ستلاحظ أن​</p>
<ul>
<li><p>أن حاوية <strong>milvus-etcd</strong> لا تكشف أي منافذ للمضيف وتقوم بتعيين بياناتها إلى <strong>volumes/etcd</strong> في المجلد الحالي.​</p></li>
<li><p>تقدم حاوية <strong>milvus-minio</strong> المنافذ <strong>9090</strong> <strong>و9091</strong> محليًّا باستخدام بيانات اعتماد المصادقة الافتراضية وتقوم بتعيين بياناتها إلى <strong>volumes/minio</strong> في المجلد الحالي.</p></li>
<li><p>تقدم حاوية <strong>milvus-standalone</strong> المنافذ <strong>19530</strong> محليًّا باستخدام الإعدادات الافتراضية وتقوم بتعيين بياناتها إلى <strong>volumes/milvus</strong> في المجلد الحالي.​</p></li>
</ul></li>
</ol>
<p>يمكنك أيضًا استدعاء إصدار Linux من أوامر Docker Compose إذا كان WSL 2 مثبتًا لديك.​</p>
<h3 id="From-WSL-2​" class="common-anchor-header">من WSL 2​<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>الإجراء مشابه لاستخدام Docker Compose لتثبيت Milvus في أنظمة Linux.​</p>
<ol>
<li><p>قم بتشغيل WSL 2.​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>قم بتنزيل ملف تكوين Milvus.​</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.20/milvus-standalone-docker-compose.yml -O docker-compose.yml​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتشغيل Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d​</span>
​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="FAQs​" class="common-anchor-header">الأسئلة الشائعة​<button data-href="#FAQs​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="common-anchor-header">كيف يمكنني التعامل مع الخطأ " <code translate="no">Docker Engine stopped</code> "؟​<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="anchor-icon" translate="no">
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
    </button></h3><p>بمجرد تثبيت Docker Desktop في Windows، قد تواجه خطأ " <code translate="no">Docker Engine stopped</code> " إذا لم يتم تكوين جهاز الكمبيوتر الخاص بك بشكل صحيح. في هذه الحالة، قد تحتاج إلى إجراء الفحوصات التالية:​</p>
<ol>
<li><p>تحقق مما إذا كانت المحاكاة الافتراضية ممكّنة أم لا.​</p>
<p>يمكنك التحقق مما إذا كانت المحاكاة الافتراضية ممكّنة من خلال الاطلاع على علامة التبويب " <strong>الأداء</strong> " في " <strong>مدير المهام</strong>".​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/task-manager.png" alt="Virtualization in Task Manager" class="doc-image" id="virtualization-in-task-manager" /> 
   <span>المحاكاة الافتراضية في «مدير المهام»</span>
  
 </span></p>
<p>إذا كانت المحاكاة الافتراضية معطلة، فقد تحتاج إلى التحقق من إعدادات BIOS الخاصة ببرنامج اللوحة الأم. تختلف طريقة تمكين المحاكاة الافتراضية في إعدادات BIOS باختلاف الشركات المصنعة للوحات الأم. بالنسبة للوحات الأم من ASUS، على سبيل المثال، يمكنك الرجوع إلى <a href="https://www.asus.com/support/faq/1043786/">هذه المقالة</a> حول تمكين المحاكاة الافتراضية.​</p>
<p>بعد ذلك، ستحتاج إلى إعادة تشغيل جهاز الكمبيوتر الخاص بك وتمكين Hyper-V. لمزيد من التفاصيل، راجع هذه <a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">المقالة</a> من <a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">Microsoft</a>.​</p></li>
<li><p>تحقق مما إذا كانت خدمة Docker Desktop قد تم تشغيلها أم لا.​</p>
<p>يمكنك تشغيل الأمر التالي لبدء تشغيل خدمة Docker Desktop.​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;net start com.docker.service​
The Docker for Windows Service service is starting.​
The Docker for Windows Service service was started successfully.​

</code></pre></li>
<li><p>تحقق مما إذا كان WSL قد تم تثبيته بشكل صحيح.</p>
<p>يمكنك تشغيل الأمر التالي لتثبيت أو تحديث WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --update​
Checking for updates.​
The most recent version of Windows Subsystem for Linux is already installed.​

</code></pre></li>
<li><p>تحقق مما إذا كان برنامج Docker Daemon قد تم تشغيله أم لا.</p>
<p>تحتاج إلى الانتقال إلى دليل تثبيت Docker Desktop وتشغيل الأمر <code translate="no">.\DockerCli.exe -SwitchDaemon</code> لبدء تشغيل Docker Daemon.​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;cd &quot;C:\Program Files\Docker\Docker&quot;​
C:\Program Files\Docker\Docker&gt;.\DockerCli.exe -SwitchDaemon​
Switching to windows engine: Post &quot;http://ipc/engine/switch&quot;: open \\.\pipe\dockerBackendApiServer: The system cannot find the file specified.​

</code></pre></li>
<li><p>تحقق مما إذا كنت قد قمت بتشغيل Docker Desktop في وضع <strong>المسؤول</strong>.</p>
<p>تأكد من أنك قد قمت بتشغيل Docker Desktop في وضع المسؤول. للقيام بذلك، انقر بزر الماوس الأيمن على <strong>Docker Desktop</strong> واختر <strong>«تشغيل كمسؤول</strong>».​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop.png" alt="Start Docker Desktop as Administrator" class="doc-image" id="start-docker-desktop-as-administrator" /> 
   <span>تشغيل Docker Desktop كمسؤول</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="common-anchor-header">كيف يمكنني التعامل مع المشكلات المتعلقة بـ WSL أثناء نشر Milvus؟​<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا واجهت مشكلات متعلقة بـ WSL أثناء تشغيل Milvus من WSL 2، فقد تحتاج إلى التحقق مما إذا كنت قد قمت بتكوين Docker Desktop لاستخدام المحرك المستند إلى WSL 2 على النحو التالي:​</p>
<ol>
<li><p>تأكد من تحديد خيار «استخدام المحرك القائم على WSL 2» في <strong>«الإعدادات»</strong> &gt; <strong>«عام</strong>».</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>استخدام المحرك المستند إلى WSL 2 في إعدادات Docker Desktop</span>
  
 </span></p></li>
<li><p>اختر من توزيعات WSL 2 المثبتة لديك تلك التي تريد تمكين تكامل Docker عليها بالانتقال إلى: <strong>الإعدادات</strong> &gt; <strong>الموارد</strong> &gt; <strong>تكامل WSL</strong>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>تحديد توزيعات WSL 2 في إعدادات Docker Desktop</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="common-anchor-header">كيف يمكنني التعامل مع الأخطاء المتعلقة بحجم التخزين التي تظهر أثناء بدء تشغيل Milvus والتي تنص على « <code translate="no">Read config failed</code> »؟​<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="anchor-icon" translate="no">
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
  
   <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" /> 
   <span>رسالة الخطأ «فشل قراءة التكوين» عند بدء تشغيل Milvus</span>
  
 </span></p>
<p>للتعامل مع الخطأ الذي يظهر أثناء بدء تشغيل Milvus والذي ينص على «فشل قراءة التكوين»، تحتاج إلى التحقق مما إذا كان وحدة التخزين المثبتة في حاوية Milvus صحيحة. إذا كانت وحدة التخزين مثبتة بشكل صحيح في الحاوية، يمكنك استخدام الأمر <code translate="no">docker exec</code> للدخول إلى الحاوية وإدراج مجلد <strong>/milvus/configs</strong> كما يلي:​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>عرض ملفات تكوين Milvus</span>
  
 </span></p>
<p>​</p>
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
<li><p>الاطلاع على <a href="/docs/ar/v2.6.x/quickstart.md">دليل البدء السريع</a> لمعرفة ما يمكن لـ Milvus القيام به.</p></li>
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
