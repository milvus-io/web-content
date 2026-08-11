---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 2
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: تعرف على كيفية ترقية الإصدار المستقل من Milvus باستخدام Docker Compose.
title: ترقية Milvus Standalone باستخدام Docker Compose
---
<div class="tab-wrapper"><a href="/docs/ar/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/ar/upgrade_milvus_standalone-docker.md" class='active '>OperatorHelmDocker Compose</a></div>
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
    </button></h1><p>يصف هذا الدليل كيفية ترقية نشر Milvus 2.6.x المستقل إلى الإصدار v3.0-beta باستخدام Docker Compose.</p>
<div class="alert note">
<p>تم التحقق من صحة هذا الإجراء باستخدام التكوين الرسمي لـ Milvus 2.6.20 المستقل مع Docker Compose. احتفظت عملية الترقية بـ etcd وMinIO وWoodpecker ودلائل البيانات الحالية، واكتفت بتغيير صورة Milvus إلى <code translate="no">milvusdb/milvus:v3.0-beta</code>.</p>
</div>
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
<li>محرك Docker و Docker Compose V2</li>
<li>نشر قائم لـ Milvus 2.6.x المستقل يُدار بواسطة Docker Compose</li>
<li>ملف Docker Compose والتكوين المستخدمان للنشر الحالي</li>
<li>نسخة احتياطية حديثة من بيانات Milvus الوصفية والبيانات الدائمة</li>
</ul>
<p><strong>قيود قائمة انتظار الرسائل</strong>: عند الترقية إلى Milvus v3.0-beta، يجب الحفاظ على اختيارك الحالي لقائمة انتظار الرسائل. لا يُدعم التبديل بين أنظمة قوائم انتظار الرسائل المختلفة أثناء الترقية. سيتوفر دعم تغيير أنظمة قوائم انتظار الرسائل في الإصدارات المستقبلية.</p>
<div class="alert warning">
<p>لا تستبدل ملف Compose الحالي أو تغير إصدارات التبعيات كجزء من هذا الإجراء. احتفظ بـ etcd الحالي، وتخزين الكائنات، وقائمة انتظار الرسائل، ووحدات التخزين، والتكوين. قم بتحديث علامة صورة Milvus فقط.</p>
<p>لا يتحقق هذا الإجراء من صحة الرجوع إلى إصدار أقدم أو التراجع عن الترقية عن طريق إعادة صورة Milvus إلى الإصدار 2.6.x. بعد أن تقوم الإصدار v3.0-beta بكتابة البيانات، قد تفشل عملية التراجع الخاصة بالصورة فقط في قراءة الحالة المحدثة. إذا فشلت عملية الترقية، أوقف عمليات الكتابة واستخدم خطة استعادة تعيد البيانات الوصفية قبل الترقية ونسخ البيانات الدائمة الاحتياطية. تحقق من صحة خطة الاستعادة في بيئة غير إنتاجية أولاً.</p>
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
    </button></h3><p>في ملف Compose الحالي، قم بتحديث الصورة الخاصة بخدمة <code translate="no">standalone</code> فقط:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0-beta</span>
<button class="copy-code-btn"></button></code></pre>
<p>قم بسحب الصورة المستهدفة وأعد إنشاء حاوية Milvus فقط:</p>
<pre><code translate="no" class="language-bash">docker compose pull standalone
docker compose up --detach standalone
<button class="copy-code-btn"></button></code></pre>
<p>يحافظ Docker Compose على تشغيل حاويات etcd وobject-storage الحالية ويعيد استخدام دلائل البيانات التي تم تكوينها.</p>
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
    </button></h2><p>تحقق من حالة الحاوية والصورة التي تستخدمها حاوية Milvus:</p>
<pre><code translate="no" class="language-bash">docker compose ps

docker compose images standalone

docker compose logs --<span class="hljs-built_in">tail</span> 100 standalone
<button class="copy-code-btn"></button></code></pre>
<p>تأكد من أن خدمة <code translate="no">standalone</code> تعمل بشكل سليم، وأن صورتها هي <code translate="no">milvusdb/milvus:v3.0-beta</code> ، وأن المجموعات الحالية لا تزال قابلة للاستعلام والبحث. أكمل هذه الفحوصات قبل تمكين أي ميزة خاصة بالإصدار v3.0-beta.</p>
