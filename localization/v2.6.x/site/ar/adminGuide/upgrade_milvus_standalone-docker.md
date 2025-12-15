---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: تعرف على كيفية ترقية Milvus مستقل مع Docker Compose.
title: ترقية Milvus Standalone باستخدام Docker Compose
---
<div class="tab-wrapper"><a href="/docs/ar/upgrade_milvus_standalone-operator.md" class=''>مشغل</a><a href="/docs/ar/upgrade_milvus_standalone-helm.md" class=''>MilvusHelmDocker</a><a href="/docs/ar/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
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
    </button></h1><p>يصف هذا الدليل كيفية ترقية نشر Milvus المستقل من الإصدار 2.5.x إلى الإصدار 2.6.7 باستخدام Docker Compose.</p>
<h2 id="Before-you-start" class="common-anchor-header">قبل البدء<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-new-in-v267" class="common-anchor-header">الجديد في الإصدار 2.6.7<button data-href="#Whats-new-in-v267" class="anchor-icon" translate="no">
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
    </button></h3><p>تتضمن الترقية من الإصدار 2.5.x من Milvus 2.5.x إلى الإصدار 2.6.7 تغييرات معمارية مهمة:</p>
<ul>
<li><strong>دمج المنسقين</strong>: تم دمج المنسقات المنفصلة القديمة (<code translate="no">dataCoord</code> ، <code translate="no">queryCoord</code> ، و <code translate="no">indexCoord</code>) في منسق واحد <code translate="no">mixCoord</code></li>
<li><strong>مكونات جديدة</strong>: إدخال عقدة التدفق لتحسين معالجة البيانات</li>
<li><strong>إزالة المكونات</strong>: <code translate="no">indexNode</code> تمت إزالة وتوحيد </li>
</ul>
<p>تضمن عملية الترقية هذه الانتقال السليم إلى البنية الجديدة. لمزيد من المعلومات عن التغييرات في البنية، راجع <a href="/docs/ar/architecture_overview.md">نظرة عامة</a> على <a href="/docs/ar/architecture_overview.md">بنية ميلفوس</a>.</p>
<h3 id="Requirements" class="common-anchor-header">المتطلبات<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>متطلبات النظام:</strong></p>
<ul>
<li>تم تثبيت Docker و Docker Compose</li>
<li>تم نشر Milvus المستقل عبر Docker Compose</li>
</ul>
<p><strong>متطلبات التوافق:</strong></p>
<ul>
<li>Milvus v2.6.0-rc1 <strong>غير متوافق</strong> مع الإصدار 2.6.7. الترقيات المباشرة من الإصدارات المرشحة غير مدعومة.</li>
<li>إذا كنت تقوم حاليًا بتشغيل الإصدار 2.6.0-rc1 وتحتاج إلى الحفاظ على بياناتك، يُرجى الرجوع إلى <a href="https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997">دليل المجتمع هذا</a> للحصول على المساعدة في الترحيل.</li>
<li><strong>يجب</strong> الترقية إلى الإصدار 2.5.16 أو أحدث قبل الترقية إلى الإصدار 2.6.7.</li>
</ul>
<p><strong>قيود قائمة انتظار الرسائل</strong>: عند الترقية إلى الإصدار 2.6.7 من Milvus، يجب عليك الحفاظ على اختيارك لقائمة انتظار الرسائل الحالية. التبديل بين أنظمة طابور الرسائل المختلفة أثناء الترقية غير مدعوم. سيتوفر دعم تغيير أنظمة قوائم انتظار الرسائل في الإصدارات المستقبلية.</p>
<div class="alter note">
<p>نظرًا لمخاوف أمنية، تقوم Milvus بترقية نظام MinIO إلى RELEASE.2024-12-18T13-15-44Z مع إصدار الإصدار v2.6.7.</p>
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
    </button></h2><h3 id="Step-1-Upgrade-to-v2516" class="common-anchor-header">الخطوة 1: الترقية إلى الإصدار 2.5.16<button data-href="#Step-1-Upgrade-to-v2516" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>تخطي هذه الخطوة إذا كان النشر المستقل الخاص بك يعمل بالفعل بالإصدار 2.5.16 أو أعلى.</p>
</div>
<ol>
<li><p>قم بتحرير ملفك الحالي <code translate="no">docker-compose.yaml</code> وقم بتحديث علامة صورة Milvus إلى الإصدار 2.5.16:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.16</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتطبيق الترقية إلى الإصدار 2.5.16:</p>
<pre><code translate="no" class="language-bash">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تحقق من الترقية إلى الإصدار 2.5.16:</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Step-2-Upgrade-to-v267" class="common-anchor-header">الخطوة 2: الترقية إلى الإصدار 2.6.7<button data-href="#Step-2-Upgrade-to-v267" class="anchor-icon" translate="no">
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
    </button></h3><p>بمجرد تشغيل الإصدار 2.5.16 بنجاح، قم بالترقية إلى الإصدار 2.6.7:</p>
<ol>
<li><p>قم بتحرير ملف <code translate="no">docker-compose.yaml</code> الموجود لديك وقم بتحديث كل من علامتي صورة Milvus و MinIO:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-minio</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">minio/minio:RELEASE.2024-12-18T13-15-44Z</span>

<span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.7</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتطبيق الترقية النهائية:</p>
<pre><code translate="no" class="language-bash">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
    </button></h2><p>تأكد من أن النشر المستقل الخاص بك يقوم بتشغيل الإصدار الجديد:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check container status</span>
docker compose ps

<span class="hljs-comment"># Check Milvus version</span>
docker compose logs standalone | grep <span class="hljs-string">&quot;version&quot;</span>
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
    </button></h2><ul>
<li>قد ترغب أيضًا في معرفة كيفية القيام بما يلي:<ul>
<li><a href="/docs/ar/scaleout.md">توسيع نطاق مجموعة ميلفوس العنقودية</a></li>
</ul></li>
<li>إذا كنت جاهزًا لنشر مجموعتك على السحابة:<ul>
<li>تعرف على كيفية <a href="/docs/ar/eks.md">نشر Milvus على Amazon EKS باستخدام Terraform</a></li>
<li>تعلم كيفية <a href="/docs/ar/gcp.md">نشر مجموعة Milvus العنقودية على GCP باستخدام Kubernetes</a></li>
<li>تعرف على كيفية <a href="/docs/ar/azure.md">نشر</a> مجموعة <a href="/docs/ar/azure.md">ميلفوس على مايكروسوفت أزور باستخدام Kubernetes</a></li>
</ul></li>
</ul>
