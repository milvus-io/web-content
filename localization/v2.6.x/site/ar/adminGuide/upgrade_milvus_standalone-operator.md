---
id: upgrade_milvus_standalone-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: تعرف على كيفية ترقية ميلفوس المستقل مع مشغل ميلفوس.
title: ترقية برنامج Milvus Standalone باستخدام مشغل Milvus
---
<div class="tab-wrapper"><a href="/docs/ar/upgrade_milvus_standalone-operator.md" class='active '>مشغل ميلفوس ميلفوس</a><a href="/docs/ar/upgrade_milvus_standalone-helm.md" class=''>هيلم</a><a href="/docs/ar/upgrade_milvus_standalone-operator.md" class='active '>دوكر</a><a href="/docs/ar/upgrade_milvus_standalone-docker.md" class=''>كومبوزر</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Milvus-Operator" class="common-anchor-header">ترقية برنامج Milvus Standalone باستخدام مشغل Milvus<button data-href="#Upgrade-Milvus-Standalone-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الدليل كيفية ترقية النشر المستقل ل Milvus من الإصدار 2.5.x إلى الإصدار 2.6.7 باستخدام مشغل Milvus.</p>
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
    </button></h3><p>تنطوي الترقية من الإصدار 2.5.x من Milvus 2.5.x إلى الإصدار 2.6.7 على تغييرات معمارية مهمة:</p>
<ul>
<li><strong>دمج المنسقين</strong>: تم دمج المنسقين المنفصلين القدامى (<code translate="no">dataCoord</code> ، <code translate="no">queryCoord</code> ، و <code translate="no">indexCoord</code>) في منسق واحد <code translate="no">mixCoord</code></li>
<li><strong>مكونات جديدة</strong>: تقديم عقدة التدفق لتحسين معالجة البيانات</li>
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
<li>مجموعة Kubernetes مع نشر Milvus المستقلة عبر مشغل Milvus</li>
<li><code translate="no">kubectl</code> مهيأ للوصول إلى مجموعتك</li>
<li>تم تثبيت Helm 3.x</li>
</ul>
<p><strong>متطلبات التوافق:</strong></p>
<ul>
<li>Milvus v2.6.0-rc1 <strong>غير متوافق</strong> مع الإصدار 2.6.7. الترقيات المباشرة من الإصدارات المرشحة غير مدعومة.</li>
<li>إذا كنت تقوم حاليًا بتشغيل الإصدار 2.6.0-rc1 وتحتاج إلى الحفاظ على بياناتك، يُرجى الرجوع إلى <a href="https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997">دليل المجتمع هذا</a> للحصول على مساعدة الترحيل.</li>
<li><strong>يجب</strong> الترقية إلى الإصدار 2.5.16 أو أحدث قبل الترقية إلى الإصدار 2.6.7.</li>
</ul>
<p><strong>قيود قائمة انتظار الرسائل</strong>: عند الترقية إلى الإصدار 2.6.7 من Milvus، يجب عليك الحفاظ على اختيار قائمة انتظار الرسائل الحالية. التبديل بين أنظمة طابور الرسائل المختلفة أثناء الترقية غير مدعوم. سيتوفر دعم تغيير أنظمة قائمة انتظار الرسائل في الإصدارات المستقبلية.</p>
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
    </button></h2><h3 id="Step-1-Upgrade-Milvus-Operator" class="common-anchor-header">الخطوة 1: ترقية مشغل Milvus<button data-href="#Step-1-Upgrade-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p>أولاً، قم بترقية مشغل Milvus إلى الإصدار v1.3.0:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech-milvus-operator https://zilliztech.github.io/milvus-operator/
helm repo update zilliztech-milvus-operator
helm -n milvus-operator upgrade milvus-operator zilliztech-milvus-operator/milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>تحقق من ترقية المشغل:</p>
<pre><code translate="no" class="language-bash">kubectl -n milvus-operator get pods
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Upgrade-your-Milvus-standalone" class="common-anchor-header">الخطوة 2: ترقية مشغل ميلفوس المستقل الخاص بك<button data-href="#Step-2-Upgrade-your-Milvus-standalone" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="21-Upgrade-to-v2516" class="common-anchor-header">2.1 الترقية إلى الإصدار 2.5.16</h4><div class="alert-note">
<p>تخطي هذه الخطوة إذا كان النشر المستقل الخاص بك يعمل بالفعل بالإصدار 2.5.16 أو أعلى.</p>
</div>
<p>قم بإنشاء ملف تهيئة <code translate="no">milvusupgrade.yaml</code> للترقية إلى الإصدار 2.5.16:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>  <span class="hljs-comment"># Replace with your actual release name</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.16</span>
<button class="copy-code-btn"></button></code></pre>
<p>قم بتطبيق التكوين:</p>
<pre><code translate="no" class="language-bash">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge
<button class="copy-code-btn"></button></code></pre>
<p>انتظر حتى الانتهاء:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Verify all pods are ready</span>
kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<h4 id="22-Upgrade-to-v267" class="common-anchor-header">2.2 الترقية إلى الإصدار 2.6.7</h4><p>بمجرد تشغيل الإصدار 2.5.16 بنجاح، قم بالترقية إلى الإصدار 2.6.7:</p>
<p>قم بتحديث ملف التكوين الخاص بك (<code translate="no">milvusupgrade.yaml</code> في هذا المثال):</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>  <span class="hljs-comment"># Replace with your actual release name</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.7</span>
<button class="copy-code-btn"></button></code></pre>
<p>قم بتطبيق الترقية النهائية:</p>
<pre><code translate="no" class="language-bash">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-upgrade" class="common-anchor-header">التحقق من الترقية<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check pod status</span>
kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>للحصول على دعم إضافي، راجع <a href="https://milvus.io/docs">وثائق Milvus</a> أو <a href="https://github.com/milvus-io/milvus/discussions">منتدى المجتمع</a>.</p>
