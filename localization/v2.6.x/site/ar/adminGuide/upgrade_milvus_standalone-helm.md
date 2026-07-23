---
id: upgrade_milvus_standalone-helm.md
label: Helm
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: تعرف على كيفية ترقية الإصدار المستقل من Milvus باستخدام مخطط Helm.
title: ترقية Milvus Standalone باستخدام Helm Chart
---
<div class="tab-wrapper"><a href="/docs/ar/v2.6.x/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/ar/v2.6.x/upgrade_milvus_standalone-docker.md" class=''>OperatorHelmDocker Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Helm-Chart" class="common-anchor-header">ترقية Milvus Standalone باستخدام Helm Chart<button data-href="#Upgrade-Milvus-Standalone-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الدليل كيفية ترقية نشر Milvus المستقل من الإصدار v2.5.x إلى الإصدار v2.6.17 باستخدام مخطط Helm.</p>
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
    </button></h2><h3 id="Whats-new-in-v2617" class="common-anchor-header">ما الجديد في الإصدار v2.6.17<button data-href="#Whats-new-in-v2617" class="anchor-icon" translate="no">
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
    </button></h3><p>تتضمن الترقية من Milvus 2.5.x إلى 2.6.17 تغييرات كبيرة في البنية:</p>
<ul>
<li><strong>دمج المنسقين</strong>: تم دمج المنسقين المنفصلين القدامى (<code translate="no">dataCoord</code> ، <code translate="no">queryCoord</code> ، <code translate="no">indexCoord</code>) في منسق واحد <code translate="no">mixCoord</code></li>
<li><strong>مكونات جديدة</strong>: إدخال «عقدة البث» (Streaming Node) لتحسين معالجة البيانات</li>
<li><strong>إزالة المكونات</strong>: تمت إزالة <code translate="no">indexNode</code> ودمجه</li>
</ul>
<p>تضمن عملية الترقية هذه الترحيل السليم إلى البنية الجديدة. لمزيد من المعلومات حول تغييرات البنية، راجع <a href="/docs/ar/v2.6.x/architecture_overview.md">«نظرة عامة</a> على <a href="/docs/ar/v2.6.x/architecture_overview.md">بنية Milvus</a>».</p>
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
<li>إصدار Helm &gt;= 3.14.0</li>
<li>إصدار Kubernetes &gt;= 1.20.0</li>
<li>نظام Milvus المستقل الذي تم نشره عبر Helm Chart</li>
</ul>
<p><strong>متطلبات التوافق:</strong></p>
<ul>
<li>Milvus v2.6.0-rc1 <strong>غير متوافق</strong> مع الإصدار v2.6.17. لا يتم دعم الترقيات المباشرة من الإصدارات التجريبية.</li>
<li>إذا كنت تستخدم الإصدار v2.6.0-rc1 حاليًا وتحتاج إلى الاحتفاظ ببياناتك، فيرجى الرجوع إلى <a href="https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997">دليل المجتمع هذا</a> للحصول على المساعدة في عملية الترحيل.</li>
<li><strong>يجب</strong> عليك الترقية إلى الإصدار v2.5.16 أو أحدث قبل الترقية إلى الإصدار v2.6.17.</li>
</ul>
<p><strong>قيود قائمة انتظار الرسائل</strong>: عند الترقية إلى Milvus v2.6.17، يجب الحفاظ على اختيارك الحالي لقائمة انتظار الرسائل. لا يتم دعم التبديل بين أنظمة قوائم انتظار الرسائل المختلفة أثناء الترقية. سيتوفر دعم تغيير أنظمة قوائم انتظار الرسائل في الإصدارات المستقبلية.</p>
<div class="alert note">
بدءًا من إصدار مخطط Helm الخاص بـ Milvus 4.2.21، قمنا بإدخال مخطط pulsar-v3.x كاعتماد. من أجل التوافق مع الإصدارات السابقة، يرجى ترقية Helm إلى الإصدار v3.14 أو أحدث، وتأكد من إضافة الخيار <code translate="no">--reset-then-reuse-values</code> كلما استخدمت <code translate="no">helm upgrade</code>.
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
    </button></h2><h3 id="Step-1-Upgrade-Helm-Chart" class="common-anchor-header">الخطوة 1: ترقية مخطط Helm<button data-href="#Step-1-Upgrade-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h3><p>أولاً، قم بترقية مخطط Milvus Helm إلى الإصدار 5.0.0:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update zilliztech
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
تم أرشفة مستودع مخططات Helm الخاصة بـ Milvus الموجود على <code translate="no">https://milvus-io.github.io/milvus-helm/</code>. استخدم المستودع الجديد <code translate="no">https://zilliztech.github.io/milvus-helm/</code> لإصدارات المخطط 4.0.31 والإصدارات الأحدث.
</div>
<p>للتحقق من توافق إصدار مخطط Helm مع إصدارات Milvus:</p>
<pre><code translate="no" class="language-bash">helm search repo zilliztech/milvus --versions
<button class="copy-code-btn"></button></code></pre>
<p>يفترض هذا الدليل أنك تقوم بتثبيت أحدث إصدار. إذا كنت بحاجة إلى تثبيت إصدار معين، فحدد المعلمة <code translate="no">--version</code> وفقًا لذلك.</p>
<h3 id="Step-2-Upgrade-to-v2516" class="common-anchor-header">الخطوة 2: الترقية إلى الإصدار v2.5.16<button data-href="#Step-2-Upgrade-to-v2516" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert-note">
<p>تخط هذه الخطوة إذا كان النشر المستقل الخاص بك يعمل بالفعل بالإصدار v2.5.16 أو أعلى.</p>
</div>
<p>قم بترقية Milvus المستقل إلى الإصدار v2.5.16:</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.5.16&quot;</span> \
  --reset-then-reuse-values \
  --version=4.2.58
<button class="copy-code-btn"></button></code></pre>
<p>انتظر حتى تكتمل عملية الترقية:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Verify all pods are ready</span>
kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Upgrade-to-v2617" class="common-anchor-header">الخطوة 3: الترقية إلى الإصدار v2.6.17<button data-href="#Step-3-Upgrade-to-v2617" class="anchor-icon" translate="no">
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
    </button></h3><p>بمجرد تشغيل الإصدار 2.5.16 بنجاح، قم بالترقية إلى الإصدار 2.6.17:</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.6.17&quot;</span> \
  --reset-then-reuse-values \
  --version=5.0.0
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>تأكد من أن النسخة المستقلة تعمل بالإصدار الجديد:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check pod status</span>
kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>للحصول على دعم إضافي، راجع <a href="https://milvus.io/docs">وثائق Milvus</a> أو <a href="https://github.com/milvus-io/milvus/discussions">منتدى المجتمع</a>.</p>
