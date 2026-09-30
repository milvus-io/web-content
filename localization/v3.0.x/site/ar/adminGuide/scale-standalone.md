---
id: scale-standalone.md
title: مقياس Milvus Standalone
summary: >-
  Milvus Standalone هو نشر خادم أحادي الجهاز. يتم تعبئة جميع مكونات Milvus
  Standalone في صورة Docker واحدة، مما يجعل النشر مريحًا. يصف هذا الموضوع كيفية
  توسيع نطاق مثيل Milvus الذي يعمل في هذا الوضع.
---
<h1 id="Scale-Milvus-Standalone" class="common-anchor-header">مقياس Milvus Standalone<button data-href="#Scale-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Standalone هو نشر خادم أحادي الجهاز. يتم حزم جميع مكونات Milvus Standalone في <a href="/docs/ar/install_standalone-docker.md">صورة Docker</a> واحدة، مما يجعل النشر مريحاً. يصف هذا الموضوع كيفية توسيع نطاق مثيل Milvus الذي يعمل في هذا الوضع.</p>
<h2 id="Prerequsites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequsites" class="anchor-icon" translate="no">
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
    </button></h2><p>عند نشر Milvus Standalone مع <a href="/docs/ar/install_standalone-docker.md">Docker</a> أو <a href="/docs/ar/install_standalone-docker-compose.md">Docker Compose،</a> يقوم البرنامج النصي للنشر (<code translate="no">standalone_embed.sh</code>) أو ملف التكوين (<code translate="no">docker-compose.yml</code>) بإنشاء عدة وحدات تخزين وتعيينها إلى دلائل المضيف لضمان استمرار البيانات.</p>
<p>لتوسيع نطاق مثيل Milvus الذي تم نشره بهذه الطريقة، يجب عليك إيقاف وإزالة الحاوية أو مكدس الحاويات الموجود، وإعادة نشر Milvus Standalone مع إعدادات التكوين المحدثة، وإعادة استخدام البيانات المستمرة على المضيف لتشغيل مثيل جديد.</p>
<p>يسرد الجدول التالي تعيين وحدة التخزين بين المضيف والحاويات.</p>
<table>
   <tr>
     <th><p>خيار النشر</p></th>
     <th><p>مسار المضيف</p></th>
     <th><p>مسار الحاوية</p></th>
   </tr>
   <tr>
     <td rowspan="3"><p>وحدة الإرساء</p></td>
     <td><p><code translate="no">$(pwd)/volumes/milvus</code></p></td>
     <td><p><code translate="no">/var/lib/milvus</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">$(pwd)/embedEtcd.yaml</code></p></td>
     <td><p><code translate="no">/milvus/configs/embedEtcd.yaml</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">$(pwd)/user.yaml</code></p></td>
     <td><p><code translate="no">/milvus/configs/user.yaml</code></p></td>
   </tr>
   <tr>
     <td rowspan="3"><p>إرساء Docker Compose</p></td>
     <td><p><code translate="no">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/etcd</code>(ميلفوس-إيتسد)</p></td>
     <td><p><code translate="no">/etcd</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/minio</code>(ميلفوس-مينيو)</p></td>
     <td><p><code translate="no">/minio_data</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus</code>(milvus-standalone)</p></td>
     <td><p><code translate="no">/var/lib/milvus</code></p></td>
   </tr>
</table>
<p>قبل تشغيل الإجراءات الواردة في هذا الدليل، تأكد من استمرار بياناتك في مسارات المضيف المذكورة أعلاه.</p>
<h2 id="Scale-instances-deployed-using-Docker" class="common-anchor-header">توسيع نطاق المثيلات التي تم نشرها باستخدام Docker<button data-href="#Scale-instances-deployed-using-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>لتوسيع نطاق مثيل Milvus قيد التشغيل حاليًا، يجب إيقاف المثيل وإزالة الحاوية وإعادة نشر المثيل بإعدادات جديدة وبيانات مستمرة.</p>
<p>الإجراء المحدد هو كما يلي:</p>
<ol>
<li><p>قم بتشغيل <code translate="no">docker stats milvus-standalone</code> لعرض وحدة المعالجة المركزية والذاكرة المخصصة لمثيل Milvus. يجب أن يكون الإخراج مشابهًا لما يلي:</p>
<pre><code translate="no" class="language-bash">CONTAINER ID   NAME                CPU %     MEM USAGE / LIMIT     MEM %     NET I/O       BLOCK I/O         PIDS
917da667f2ff   milvus-standalone   6.10%     171.8MiB / 3.886GiB   4.32%     1.57kB / 0B   1.01GB / 1.79MB   31
<button class="copy-code-btn"></button></code></pre>
<p>في إخراج الأمر، يمكنك العثور على استخدام الموارد الحالي لمثيل Milvus الخاص بك.</p></li>
<li><p>قم بإيقاف الحاوية وإزالتها.</p>
<pre><code translate="no" class="language-bash">$ docker stop milvus-standalone
$ docker <span class="hljs-built_in">rm</span> milvus-standalone
<button class="copy-code-btn"></button></code></pre></li>
<li><p>حدد موقع ملف البرنامج النصي <code translate="no">standalone_embed.sh</code> ، وابحث عن الأمر <code translate="no">docker run</code> ، وأضف حدود الموارد.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
    <span class="hljs-string">sudo</span> <span class="hljs-string">docker</span> <span class="hljs-string">run</span> <span class="hljs-string">-d</span> <span class="hljs-string">\</span>
        <span class="hljs-string">--name</span> <span class="hljs-string">milvus-standalone</span> <span class="hljs-string">\</span>
        <span class="hljs-string">--security-opt</span> <span class="hljs-string">seccomp:unconfined</span> <span class="hljs-string">\</span>
        <span class="hljs-string">-e</span> <span class="hljs-string">ETCD_USE_EMBED=true</span> <span class="hljs-string">\</span>
        <span class="hljs-string">-e</span> <span class="hljs-string">ETCD_DATA_DIR=/var/lib/milvus/etcd</span> <span class="hljs-string">\</span>
        <span class="hljs-string">-e</span> <span class="hljs-string">ETCD_CONFIG_PATH=/milvus/configs/embedEtcd.yaml</span> <span class="hljs-string">\</span>
        <span class="hljs-string">-e</span> <span class="hljs-string">COMMON_STORAGETYPE=local</span> <span class="hljs-string">\</span>
        <span class="hljs-string">-v</span> <span class="hljs-string">$(pwd)/volumes/milvus:/var/lib/milvus</span> <span class="hljs-string">\</span>
        <span class="hljs-string">-v</span> <span class="hljs-string">$(pwd)/embedEtcd.yaml:/milvus/configs/embedEtcd.yaml</span> <span class="hljs-string">\</span>
        <span class="hljs-string">-v</span> <span class="hljs-string">$(pwd)/user.yaml:/milvus/configs/user.yaml</span> <span class="hljs-string">\</span>
        <span class="hljs-string">-p</span> <span class="hljs-number">19530</span><span class="hljs-string">:19530</span> <span class="hljs-string">\</span>
        <span class="hljs-string">-p</span> <span class="hljs-number">9091</span><span class="hljs-string">:9091</span> <span class="hljs-string">\</span>
        <span class="hljs-string">-p</span> <span class="hljs-number">2379</span><span class="hljs-string">:2379</span> <span class="hljs-string">\</span>
        <span class="hljs-string">--health-cmd=&quot;curl</span> <span class="hljs-string">-f</span> <span class="hljs-string">http://localhost:9091/healthz&quot;</span> <span class="hljs-string">\</span>
        <span class="hljs-string">--health-interval=30s</span> <span class="hljs-string">\</span>
        <span class="hljs-string">--health-start-period=90s</span> <span class="hljs-string">\</span>
        <span class="hljs-string">--health-timeout=20s</span> <span class="hljs-string">\</span>
        <span class="hljs-string">--health-retries=3</span> <span class="hljs-string">\</span>
<span class="highlighted-comment-line">        <span class="hljs-string">--memory=&quot;4g&quot;</span> <span class="hljs-string">\</span>          <span class="hljs-comment"># New memory limit</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">--cpus=&quot;2.0&quot;</span> <span class="hljs-string">\</span>           <span class="hljs-comment"># New CPU limit</span></span>
        <span class="hljs-string">milvusdb/milvus:v2.5.11</span> <span class="hljs-string">\</span>
        <span class="hljs-string">milvus</span> <span class="hljs-string">run</span> <span class="hljs-string">standalone</span>  <span class="hljs-number">1</span><span class="hljs-string">&gt;</span> <span class="hljs-string">/dev/null</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تأكد من وجود البيانات المستمرة في نفس المجلد الموجود في البرنامج النصي <code translate="no">standalone_embed.sh</code> ، وقم بتشغيل البرنامج النصي على النحو التالي:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span>  bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتشغيل <code translate="no">docker stats milvus-standalone</code> لعرض وحدة المعالجة المركزية والذاكرة المخصصة لمثيل ميلفوس بعد القياس. يجب أن تكون المخرجات مشابهة لما يلي:</p>
<pre><code translate="no" class="language-bash">CONTAINER ID   NAME                CPU %     MEM USAGE / LIMIT   MEM %     NET I/O       BLOCK I/O        PIDS
7aea450f87ce   milvus-standalone   7.52%     210.9MiB / 4GiB     5.15%     1.05kB / 0B   610kB / 8.19kB   29
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Scale-instances-deployed-using-Docker-Compose" class="common-anchor-header">توسيع نطاق المثيلات التي تم نشرها باستخدام Docker Compose<button data-href="#Scale-instances-deployed-using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><p>لتوسيع نطاق مثيل Milvus قيد التشغيل حاليًا، يجب إيقاف المثيل وإزالة مكدس الحاوية وإعادة نشر المثيل بإعدادات جديدة وبيانات مستمرة.</p>
<p>الإجراء المحدد هو كما يلي:</p>
<ol>
<li><p>قم بتشغيل <code translate="no">docker stats milvus-standalone</code> لعرض وحدة المعالجة المركزية والذاكرة المخصصة لمثيل Milvus. يجب أن يكون الإخراج مشابهًا لما يلي:</p>
<pre><code translate="no" class="language-bash">CONTAINER ID   NAME                CPU %     MEM USAGE / LIMIT     MEM %     NET I/O       BLOCK I/O         PIDS
917da667f2ff   milvus-standalone   6.10%     171.8MiB / 3.886GiB   4.32%     1.57kB / 0B   1.01GB / 1.79MB   31
<button class="copy-code-btn"></button></code></pre>
<p>في إخراج الأمر، يمكنك العثور على استخدام الموارد الحالي لمثيل Milvus الخاص بك.</p></li>
<li><p>قم بإيقاف وإزالة مكدس الحاوية.</p>
<pre><code translate="no" class="language-bash">$ docker compose down
<button class="copy-code-btn"></button></code></pre></li>
<li><p>حدد موقع ملف التكوين <code translate="no">docker-compose.yml</code> ، وابحث عن القسم المستقل، وأضف حدود الموارد.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.8</span>
    <span class="hljs-attr">command:</span> [<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;standalone&quot;</span>]
<span class="highlighted-comment-line">    <span class="hljs-attr">deploy:</span></span>
<span class="highlighted-comment-line">      <span class="hljs-attr">resources:</span></span>
<span class="highlighted-comment-line">        <span class="hljs-attr">limits:</span></span>
<span class="highlighted-comment-line">          <span class="hljs-attr">cpus:</span> <span class="hljs-string">&quot;2&quot;</span>   <span class="hljs-comment"># new cpu limits</span></span>
<span class="highlighted-comment-line">          <span class="hljs-attr">memory:</span> <span class="hljs-string">4G</span>  <span class="hljs-comment"># new memory limits</span></span>
    <span class="hljs-attr">security_opt:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">seccomp:unconfined</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-attr">ETCD_ENDPOINTS:</span> <span class="hljs-string">etcd:2379</span>
      <span class="hljs-attr">MINIO_ADDRESS:</span> <span class="hljs-string">minio:9000</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
    <span class="hljs-attr">healthcheck:</span>
      <span class="hljs-attr">test:</span> [<span class="hljs-string">&quot;CMD&quot;</span>, <span class="hljs-string">&quot;curl&quot;</span>, <span class="hljs-string">&quot;-f&quot;</span>, <span class="hljs-string">&quot;http://localhost:9091/healthz&quot;</span>]
      <span class="hljs-attr">interval:</span> <span class="hljs-string">30s</span>
      <span class="hljs-attr">start_period:</span> <span class="hljs-string">90s</span>
      <span class="hljs-attr">timeout:</span> <span class="hljs-string">20s</span>
      <span class="hljs-attr">retries:</span> <span class="hljs-number">3</span>
    <span class="hljs-attr">ports:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;19530:19530&quot;</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;9091:9091&quot;</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;etcd&quot;</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;minio&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تأكد من توفر البيانات المستمرة، وقم بتشغيل <code translate="no">docker compose</code> على النحو التالي:</p>
<pre><code translate="no" class="language-bash">docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتشغيل <code translate="no">docker stats milvus-standalone</code> لعرض وحدة المعالجة المركزية والذاكرة المخصصة لمثيل ميلفوس بعد القياس. يجب أن تكون المخرجات مشابهة لما يلي:</p>
<pre><code translate="no" class="language-bash">CONTAINER ID   NAME                CPU %     MEM USAGE / LIMIT   MEM %     NET I/O       BLOCK I/O        PIDS
7aea450f87ce   milvus-standalone   7.52%     210.9MiB / 4GiB     5.15%     1.05kB / 0B   610kB / 8.19kB   29
<button class="copy-code-btn"></button></code></pre></li>
</ol>
