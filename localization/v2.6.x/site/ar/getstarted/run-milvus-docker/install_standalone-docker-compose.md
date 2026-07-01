---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: تعرف على كيفية تثبيت Milvus بشكل مستقل باستخدام Docker Compose.
title: تشغيل Milvus باستخدام Docker Compose (Linux)
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">تشغيل Milvus باستخدام Docker Compose (Linux)<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
<li><a href="https://docs.docker.com/get-docker/">قم بتثبيت Docker</a>.</li>
<li><a href="/docs/ar/v2.6.x/prerequisite-docker.md">تحقق من متطلبات الأجهزة والبرامج</a> قبل التثبيت.</li>
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
    </button></h2><p>يوفر Milvus ملف تكوين Docker Compose في مستودع Milvus. لتثبيت Milvus باستخدام Docker Compose، ما عليك سوى تشغيل</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose.yml -O docker-compose.yml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>ما الجديد في الإصدار v2.6.17:</strong></p>
<ul>
<li><strong>بنية محسّنة</strong>: تتضمن عقدة البث الجديدة والمكونات المُحسّنة</li>
<li><strong>التبعيات المحدثة</strong>: تتضمن أحدث إصدارات MinIO و etcd</li>
<li><strong>تكوين محسّن</strong>: إعدادات مُحسّنة لأداء أفضل</li>
</ul>
<p>قم دائمًا بتنزيل أحدث تكوين لـ Docker Compose لضمان التوافق مع ميزات الإصدار v2.6.17.</p>
<ul>
<li><p>إذا فشلت في تشغيل الأمر أعلاه، يرجى التحقق مما إذا كان نظامك يحتوي على Docker Compose V1 مثبتًا. إذا كان الأمر كذلك، يُنصح بالترحيل إلى Docker Compose V2 وفقًا للملاحظات الواردة في <a href="https://docs.docker.com/compose/">هذه الصفحة</a>.</p></li>
<li><p>إذا واجهت أي مشكلات في سحب الصورة، فاتصل بنا على <a href="mailto:community@zilliz.com">community@zilliz.com</a> مع تفاصيل حول المشكلة، وسنقدم لك الدعم اللازم.</p></li>
</ul>
</div>
<p>بعد بدء تشغيل Milvus،</p>
<ul>
<li>تكون الحاويات المسماة <strong>milvus-standalone</strong> و <strong>milvus-minio</strong> و <strong>milvus-etcd</strong> قيد التشغيل.
<ul>
<li>لا تكشف حاوية <strong>milvus-etcd</strong> عن أي منافذ للمضيف وتقوم بتعيين بياناتها إلى <strong>volumes/etcd</strong> في المجلد الحالي.</li>
<li>تقدم حاوية <strong>milvus-minio</strong> المنافذ <strong>9090</strong> <strong>و9091</strong> محليًا باستخدام بيانات اعتماد المصادقة الافتراضية وتقوم بتعيين بياناتها إلى <strong>volumes/minio</strong> في المجلد الحالي.</li>
<li>تقدم حاوية <strong>milvus-standalone</strong> المنافذ <strong>19530</strong> محليًّا باستخدام الإعدادات الافتراضية وتقوم بتعيين بياناتها إلى <strong>volumes/milvus</strong> في المجلد الحالي.</li>
</ul></li>
</ul>
<p>يمكنك التحقق مما إذا كانت الحاويات قيد التشغيل باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker-compose ps</span>

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك أيضًا الوصول إلى واجهة المستخدم على الويب لـ Milvus على <code translate="no">http://127.0.0.1:9091/webui/</code> لمعرفة المزيد عن مثيل Milvus الخاص بك. لمزيد من التفاصيل، راجع <a href="/docs/ar/v2.6.x/milvus-webui.md">واجهة المستخدم على الويب</a> ل <a href="/docs/ar/v2.6.x/milvus-webui.md">ـ Milvus</a>.</p>
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
    </button></h2><p>لتحديث إعدادات Milvus لتناسب احتياجاتك، تحتاج إلى تعديل ملف <code translate="no">/milvus/configs/user.yaml</code> الموجود داخل حاوية <code translate="no">milvus-standalone</code>.</p>
<ol>
<li><p>قم بالوصول إلى الحاوية <code translate="no">milvus-standalone</code>.</p>
<pre><code translate="no" class="language-shell">docker exec -it milvus-standalone bash
<button class="copy-code-btn"></button></code></pre></li>
<li><p>أضف إعدادات إضافية لتجاوز الإعدادات الافتراضية.
يفترض ما يلي أنك بحاجة إلى تجاوز ملف <code translate="no">proxy.healthCheckTimeout</code> الافتراضي. للاطلاع على عناصر التكوين القابلة للتطبيق، راجع <a href="/docs/ar/v2.6.x/system_configuration.md">تكوين النظام</a>.</p>
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
    </button></h2><p>يمكنك إيقاف هذه الحاوية وحذفها على النحو التالي</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
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
<li><p>الاطلاع على <a href="/docs/ar/v2.6.x/quickstart.md">«البدء السريع»</a> لمعرفة ما يمكن لـ Milvus القيام به.</p></li>
<li><p>تعلم العمليات الأساسية لـ Milvus:</p>
<ul>
<li><a href="/docs/ar/v2.6.x/manage_databases.md">إدارة قواعد البيانات</a></li>
<li><a href="/docs/ar/v2.6.x/manage-collections.md">إدارة المجموعات</a></li>
<li><a href="/docs/ar/v2.6.x/manage-partitions.md">إدارة الأقسام</a></li>
<li><a href="/docs/ar/v2.6.x/insert-update-delete.md">الإدراج والتحديث والحذف</a></li>
<li><a href="/docs/ar/v2.6.x/single-vector-search.md">البحث أحادي المتجه</a></li>
<li><a href="/docs/ar/v2.6.x/multi-vector-search.md">البحث المختلط</a></li>
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
