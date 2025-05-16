---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: تعرف على كيفية ترقية Milvus مستقل مع Docker Compose.
title: ترقية Milvus Standalone باستخدام Docker Compose
---
<div class="tab-wrapper"><a href="/docs/ar/v2.4.x/upgrade_milvus_standalone-helm.md" class=''>مشغل</a><a href="/docs/ar/v2.4.x/upgrade_milvus_standalone-operator.md" class=''>MilvusHelmDocker</a><a href="/docs/ar/v2.4.x/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
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
    </button></h1><p>يصف هذا الموضوع كيفية ترقية Milvus الخاص بك باستخدام Docker Compose.</p>
<p>في الحالات العادية، يمكنك ترقية <a href="#Upgrade-Milvus-by-changing-its-image">Milvus عن طريق تغيير صورته</a>. ومع ذلك، تحتاج إلى <a href="#Migrate-the-metadata">ترحيل البيانات الوصفية</a> قبل أي ترقية من الإصدار 2.1.x إلى الإصدار 2.4.23.</p>
<div class="alter note">
<p>نظرًا لمخاوف أمنية، يقوم Milvus بترقية MinIO الخاص به إلى RELEASE.2023-03-20T20-16-18Z مع إصدار الإصدار v2.2.5. قبل إجراء أي ترقيات من إصدارات Milvus Standalone السابقة المثبتة باستخدام Docker Compose، يجب عليك إنشاء نشر MinIO أحادي العقدة أحادي القيادة وترحيل إعدادات MinIO الحالية والمحتوى إلى النشر الجديد. لمزيد من التفاصيل، راجع <a href="https://min.io/docs/minio/linux/operations/install-deploy-manage/migrate-fs-gateway.html#id2">هذا الدليل</a>.</p>
</div>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">ترقية Milvus عن طريق تغيير صورته<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>في الحالات العادية، يمكنك ترقية Milvus على النحو التالي:</p>
<ol>
<li><p>تغيير علامة صورة Milvus في <code translate="no">docker-compose.yaml</code>.</p>
<pre><code translate="no" class="language-yaml">...
standalone:
  container_name: milvus-standalone
  image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتشغيل الأوامر التالية لتنفيذ الترقية.</p>
<pre><code translate="no" class="language-shell">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Migrate-the-metadata" class="common-anchor-header">ترحيل البيانات الوصفية<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>أوقف جميع مكونات ميلفوس.</p>
<pre><code translate="no">docker stop &lt;milvus-component-docker-container-name&gt;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بإعداد ملف التكوين <code translate="no">migration.yaml</code> لترحيل البيانات الوصفية.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># migration.yaml</span>
cmd:
  <span class="hljs-comment"># Option: run/backup/rollback</span>
  <span class="hljs-built_in">type</span>: run
  runWithBackup: true
config:
  sourceVersion: <span class="hljs-number">2.1</span><span class="hljs-number">.4</span>   <span class="hljs-comment"># Specify your milvus version</span>
  targetVersion: <span class="hljs-number">2.4</span><span class="hljs-number">.23</span>
  backupFilePath: /tmp/migration.bak
metastore:
  <span class="hljs-built_in">type</span>: etcd
etcd:
  endpoints:
    - milvus-etcd:<span class="hljs-number">2379</span>  <span class="hljs-comment"># Use the etcd container name</span>
  rootPath: by-dev <span class="hljs-comment"># The root path where data is stored in etcd</span>
  metaSubPath: meta
  kvSubPath: kv
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتشغيل حاوية الترحيل.</p>
<pre><code translate="no"><span class="hljs-comment"># Suppose your docker-compose run with the default milvus network,</span>
<span class="hljs-comment"># and you put migration.yaml in the same directory with docker-compose.yaml.</span>
docker run --<span class="hljs-built_in">rm</span> -it --network milvus -v $(<span class="hljs-built_in">pwd</span>)/migration.yaml:/milvus/configs/migration.yaml milvusdb/meta-migration:v2.2.0 /milvus/bin/meta-migration -config=/milvus/configs/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ابدأ تشغيل مكونات Milvus مرة أخرى باستخدام صورة Milvus الجديدة.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment">// Run the following only after update the milvus image tag in the docker-compose.yaml</span>
docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
    </button></h2><ul>
<li>قد ترغب أيضاً في معرفة كيفية القيام بـ<ul>
<li><a href="/docs/ar/v2.4.x/scaleout.md">توسيع نطاق مجموعة Milvus</a></li>
</ul></li>
<li>إذا كنت مستعدًا لنشر مجموعتك على السحابة:<ul>
<li>تعرف على كيفية <a href="/docs/ar/v2.4.x/eks.md">نشر Milvus على Amazon EKS باستخدام Terraform</a></li>
<li>تعلم كيفية <a href="/docs/ar/v2.4.x/gcp.md">نشر مجموعة Milvus العنقودية على GCP باستخدام Kubernetes</a></li>
<li>تعرف على كيفية <a href="/docs/ar/v2.4.x/azure.md">نشر</a> مجموعة <a href="/docs/ar/v2.4.x/azure.md">ميلفوس على مايكروسوفت أزور باستخدام Kubernetes</a></li>
</ul></li>
</ul>
