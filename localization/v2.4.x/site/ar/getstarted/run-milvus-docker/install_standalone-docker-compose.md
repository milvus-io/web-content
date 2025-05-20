---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: تعرف على كيفية تثبيت Milvus مستقل مع Docker Compose.
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
<li><a href="/docs/ar/v2.4.x/prerequisite-docker.md">تحقق من متطلبات الأجهزة والبرامج</a> قبل التثبيت.</li>
</ul>
<h2 id="Install-Milvus" class="common-anchor-header">تثبيت ميلفوس<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر Milvus ملف تكوين Docker Compose في مستودع Milvus. لتثبيت Milvus باستخدام Docker Compose، قم فقط بتشغيل</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download the configuration file</span>
$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose.yml -O docker-compose.yml

<span class="hljs-comment"># Start Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose up -d

Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>إذا فشلت في تشغيل الأمر أعلاه، يرجى التحقق مما إذا كان نظامك يحتوي على Docker Compose V1 مثبتاً على Docker Compose V1. إذا كانت هذه هي الحالة، ننصحك بالترحيل إلى Docker Compose V2 بسبب الملاحظات الموجودة في <a href="https://docs.docker.com/compose/">هذه الصفحة</a>.</p></li>
<li><p>إذا واجهت أي مشاكل في سحب الصورة، اتصل بنا على <a href="mailto:community@zilliz.com">community@zilliz.com</a> مع تفاصيل حول المشكلة، وسنقدم لك الدعم اللازم.</p></li>
</ul>
</div>
<p>بعد بدء تشغيل Milvus,</p>
<ul>
<li>تم تشغيل الحاويات المسماة <strong>milvus-standalone</strong> و <strong>milvus-minio</strong> و <strong>milvus-etcd</strong>.<ul>
<li>لا تعرض حاوية <strong>milvus-etcd</strong> أي منافذ للمضيف وتقوم بتعيين بياناتها إلى <strong>وحدات التخزين/etcd</strong> في المجلد الحالي.</li>
<li>تخدم حاوية <strong>milvus-minio</strong> المنفذين <strong>9090</strong> <strong>و9091</strong> محلياً باستخدام بيانات اعتماد المصادقة الافتراضية وتعيّن بياناتها إلى <strong>وحدات التخزين/minio</strong> في المجلد الحالي.</li>
<li>تخدم الحاوية <strong>المستقلة milvus-standalone</strong> المنافذ <strong>19530</strong> محلياً بالإعدادات الافتراضية وتعيّن بياناتها إلى <strong>وحدات التخزين/ميلفوس</strong> في المجلد الحالي.</li>
</ul></li>
</ul>
<p>يمكنك التحقق مما إذا كانت الحاويات قيد التشغيل باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker-compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك إيقاف وحذف هذه الحاوية كما يلي</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose down

<span class="hljs-comment"># Delete service data</span>
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes
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
    </button></h2><p>بعد تثبيت Milvus في Docker، يمكنك:</p>
<ul>
<li><p>التحقق من <a href="/docs/ar/v2.4.x/quickstart.md">Quickstart</a> لمعرفة ما يمكن لـ Milvus القيام به.</p></li>
<li><p>تعلم العمليات الأساسية لملفوس:</p>
<ul>
<li><a href="/docs/ar/v2.4.x/manage_databases.md">إدارة قواعد البيانات</a></li>
<li><a href="/docs/ar/v2.4.x/manage-collections.md">إدارة المجموعات</a></li>
<li><a href="/docs/ar/v2.4.x/manage-partitions.md">إدارة الأقسام</a></li>
<li><a href="/docs/ar/v2.4.x/insert-update-delete.md">إدراج وإدراج وحذف وإدراج وحذف</a></li>
<li><a href="/docs/ar/v2.4.x/single-vector-search.md">البحث في متجه واحد</a></li>
<li><a href="/docs/ar/v2.4.x/multi-vector-search.md">البحث الهجين</a></li>
</ul></li>
<li><p><a href="/docs/ar/v2.4.x/upgrade_milvus_cluster-helm.md">ترقية Milvus باستخدام مخطط Helm</a>.</p></li>
<li><p><a href="/docs/ar/v2.4.x/scaleout.md">توسيع نطاق مجموعة ميلفوس الخاصة بك</a>.</p></li>
<li><p>نشر مجموعة ميلفوس العنقودية الخاصة بك على السحب:</p>
<ul>
<li><a href="/docs/ar/v2.4.x/eks.md">أمازون EKS</a></li>
<li><a href="/docs/ar/v2.4.x/gcp.md">جوجل كلاود</a></li>
<li><a href="/docs/ar/v2.4.x/azure.md">مايكروسوفت أزور</a></li>
</ul></li>
<li><p>استكشف <a href="/docs/ar/v2.4.x/milvus_backup_overview.md">Milvus Backup،</a> وهي أداة مفتوحة المصدر للنسخ الاحتياطي لبيانات Milvus.</p></li>
<li><p>استكشف <a href="/docs/ar/v2.4.x/birdwatcher_overview.md">Birdwatcher،</a> وهي أداة مفتوحة المصدر لتصحيح أخطاء ميلفوس وتحديثات التكوين الديناميكية.</p></li>
<li><p>استكشف <a href="https://github.com/zilliztech/attu">Attu،</a> وهي أداة مفتوحة المصدر لواجهة المستخدم الرسومية لإدارة Milvus بسهولة.</p></li>
<li><p><a href="/docs/ar/v2.4.x/monitor.md">مراقبة ميلفوس باستخدام بروميثيوس</a>.</p></li>
</ul>
