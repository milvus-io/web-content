---
id: switch_milvus_standalone_mq_type-operator.md
summary: تعرّف على كيفية تبديل نوع قائمة انتظار الرسائل لـ Milvus المستقل.
title: تبديل نوع MQ لـ Milvus Standalone
---
<h1 id="Switch-MQ-Type-for-Milvus-Standalone" class="common-anchor-header">تبديل نوع MQ لـ Milvus Standalone<button data-href="#Switch-MQ-Type-for-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الموضوع كيفية تبديل نوع قائمة انتظار الرسائل (MQ) لنشر Milvus مستقل موجود. يدعم Milvus تبديل MQ عبر الإنترنت دون توقف.</p>
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
<li>مثيل Milvus مستقل قيد التشغيل مثبت عبر <a href="/docs/ar/v2.6.x/install_standalone-docker.md">Docker</a> أو <a href="/docs/ar/v2.6.x/install_standalone-docker-compose.md">Docker Compose</a>.</li>
<li>تمت ترقية مثيل Milvus إلى أحدث إصدار يدعم ميزة تبديل MQ هذه.</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">سير العمل العام<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>سير العمل العام لتبديل نوع MQ هو كما يلي:</p>
<ol>
<li>تأكد من تشغيل مثيل Milvus بشكل صحيح.</li>
<li>تأكيد نوع MQ المصدر ونوع MQ الهدف.</li>
<li>قم بتكوين إعدادات وصول MQ الهدف في تكوين Milvus دون تغيير القيمة <code translate="no">mqType</code>.</li>
<li>قم بتشغيل التبديل عن طريق استدعاء واجهة برمجة التطبيقات WAL تغيير WAL.</li>
<li>راقب السجلات للتحقق من اكتمال التبديل بنجاح.</li>
</ol>
<div class="alert note">
<p>قبل التبديل، تأكد قبل التبديل من أن MQ الهدف لا يحتوي على مواضيع بنفس الأسماء التي يستخدمها مثيل Milvus الحالي. هذا مهم بشكل خاص إذا كانت خدمة MQ الهدف قد تم استخدامها مسبقاً من قبل مثيل Milvus آخر، حيث يمكن أن تؤدي أسماء المواضيع المتضاربة إلى سلوك غير متوقع.</p>
</div>
<h2 id="Switch-from-RocksMQ-to-Woodpecker-Local-Storage" class="common-anchor-header">التبديل من RocksMQ إلى نقار الخشب (التخزين المحلي)<button data-href="#Switch-from-RocksMQ-to-Woodpecker-Local-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>ينطبق هذا الإجراء على عمليات نشر <strong>Milvus Standalone Docker المستقلة</strong> التي تستخدم RocksMQ بشكل افتراضي.</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">الخطوة 1: تحقق من أن مثيل Milvus قيد التشغيل<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>تأكد من تشغيل مثيل Milvus Standalone Docker بشكل صحيح. يمكنك التحقق من ذلك من خلال إنشاء مجموعة اختبار وإدراج البيانات وتشغيل استعلام.</p>
<h3 id="Step-2-Configure-Woodpecker-with-local-storage" class="common-anchor-header">الخطوة 2: تكوين Woodpecker مع التخزين المحلي<button data-href="#Step-2-Configure-Woodpecker-with-local-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتحديث تكوين Milvus لإضافة إعدادات Woodpecker <strong>دون</strong> تغيير القيمة <code translate="no">mqType</code>. قم بإنشاء أو تحديث الملف <code translate="no">user.yaml</code> بالمحتوى التالي:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">local</span>
<button class="copy-code-btn"></button></code></pre>
<p>ثم أعد تشغيل مثيل Milvus لتطبيق التكوين:</p>
<pre><code translate="no" class="language-shell">bash standalone_embed.sh restart
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">الخطوة 3: قم بتشغيل مفتاح MQ<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتشغيل الأمر التالي لتشغيل التبديل إلى Woodpecker:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>استبدل <code translate="no">&lt;mixcoord_addr&gt;</code> بالعنوان الفعلي لخدمة MixCoord (افتراضيًا، <code translate="no">localhost</code> لعمليات النشر المستقلة).</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">الخطوة 4: تحقق من اكتمال التبديل<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>تكتمل عملية التبديل تلقائياً. راقب سجلات ميلفوس للرسائل الرئيسية التالية للتأكد من اكتمال عملية التبديل:</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>في رسائل السجل أعلاه، <code translate="no">&lt;MQ1&gt;</code> هو نوع MQ المصدر (<code translate="no">rocksmq</code>)، و <code translate="no">&lt;MQ2&gt;</code> هو نوع MQ الهدف (<code translate="no">woodpecker</code>).</p>
<ul>
<li>تشير الرسالة الأولى إلى أن تبديل WAL من المصدر إلى الهدف قد اكتمل.</li>
<li>تشير الرسالة الثانية إلى أن جميع القنوات الفعلية قد تم تبديلها.</li>
<li>تشير الرسالة الثالثة إلى أن تكوين <code translate="no">mq.type</code> قد تم تحديثه في etcd.</li>
</ul>
</div>
<h2 id="Switch-from-RocksMQ-to-Woodpecker-MinIO-Storage" class="common-anchor-header">التبديل من RocksMQ إلى Woodpecker (تخزين MinIO)<button data-href="#Switch-from-RocksMQ-to-Woodpecker-MinIO-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>ينطبق هذا الإجراء على عمليات نشر <strong>Milvus Standalone Docker Compose المستقلة</strong>.</p>
<div class="alert note">
<p>بدءًا من الإصدار 2.6 من Milvus v2.6، يعلن الإعداد الافتراضي <code translate="no">docker-compose.yaml</code> بالفعل <code translate="no">mqType</code> على أنه Woodpecker. ما لم تقم بتعديل التكوين الافتراضي أو الترقية من الإصدار 2.5، قد لا يكون هذا الإجراء ضروريًا.</p>
</div>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">الخطوة 1: تحقق من تشغيل مثيل ميلفوس<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>تأكد من تشغيل مثيل Milvus Standalone Docker Compose بشكل صحيح.</p>
<h3 id="Step-2-Optional-Verify-Woodpecker-configuration" class="common-anchor-header">الخطوة 2: (اختياري) التحقق من تكوين Woodpecker<button data-href="#Step-2-Optional-Verify-Woodpecker-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>يقوم تكوين Milvus الافتراضي بتعيين نوع تخزين Woodpecker إلى MinIO، لذلك لا يلزم إجراء تكوين إضافي في معظم الحالات.</p>
<p>ومع ذلك، إذا كنت قد قمت بتخصيص تكوين Woodpecker مسبقًا، يجب عليك التأكد من تعيين <code translate="no">woodpecker.storage.type</code> على <code translate="no">minio</code>. قم بإنشاء أو تحديث الملف <code translate="no">user.yaml</code> بالمحتوى التالي:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span>
<button class="copy-code-btn"></button></code></pre>
<p>ثم أعد تشغيل مثيل ميلفوس لتطبيق التكوين:</p>
<pre><code translate="no" class="language-shell">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">الخطوة 3: قم بتشغيل مفتاح MQ<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتشغيل الأمر التالي لتشغيل التبديل إلى Woodpecker:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>استبدل <code translate="no">&lt;mixcoord_addr&gt;</code> بالعنوان الفعلي لخدمة MixCoord (افتراضيًا، <code translate="no">localhost</code> لعمليات النشر المستقلة).</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">الخطوة 4: تحقق من اكتمال التبديل<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>تكتمل عملية التبديل تلقائياً. راقب سجلات ميلفوس للرسائل الرئيسية التالية للتأكد من اكتمال عملية التبديل:</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>في رسائل السجل أعلاه، <code translate="no">&lt;MQ1&gt;</code> هو نوع MQ المصدر (<code translate="no">rocksmq</code>)، و <code translate="no">&lt;MQ2&gt;</code> هو نوع MQ الهدف (<code translate="no">woodpecker</code>).</p>
<ul>
<li>تشير الرسالة الأولى إلى أن تبديل WAL من المصدر إلى الهدف قد اكتمل.</li>
<li>تشير الرسالة الثانية إلى أن جميع القنوات الفعلية قد تم تبديلها.</li>
<li>تشير الرسالة الثالثة إلى أن التكوين <code translate="no">mq.type</code> قد تم تحديثه في etcd.</li>
</ul>
</div>
