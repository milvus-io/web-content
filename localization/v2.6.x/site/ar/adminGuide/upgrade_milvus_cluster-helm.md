---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: تعرف على كيفية ترقية مجموعة ميلفوس العنقودية باستخدام مخطط هيلم.
title: ترقية مجموعة ميلفوس العنقودية باستخدام مخطط هيلم
---
<div class="tab-wrapper"><a href="/docs/ar/upgrade_milvus_cluster-helm.md" class='active '>مشغل</a><a href="/docs/ar/upgrade_milvus_cluster-operator.md" class=''>ميلفوس هيلم</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Helm-Chart" class="common-anchor-header">ترقية مجموعة ميلفوس العنقودية باستخدام مخطط هيلم<button data-href="#Upgrade-Milvus-Cluster-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الدليل كيفية ترقية مجموعة Milvus العنقودية من الإصدار 2.5.x إلى الإصدار 2.6.0 باستخدام مخطط Helm.</p>
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
    </button></h2><h3 id="Whats-new-in-v260" class="common-anchor-header">ما الجديد في الإصدار 2.6.0</h3><p>تتضمن الترقية من الإصدار 2.5.x من Milvus 2.5.x إلى الإصدار 2.6.0 تغييرات معمارية مهمة:</p>
<ul>
<li><strong>دمج المنسقين</strong>: تم دمج المنسقين المنفصلين القدامى (<code translate="no">dataCoord</code> ، <code translate="no">queryCoord</code> ، و <code translate="no">indexCoord</code>) في منسق واحد <code translate="no">mixCoord</code></li>
<li><strong>مكونات جديدة</strong>: إدخال عقدة التدفق لتحسين معالجة البيانات</li>
<li><strong>إزالة المكونات</strong>: <code translate="no">indexNode</code> تمت إزالة وتوحيد </li>
</ul>
<p>تضمن عملية الترقية هذه الانتقال السليم إلى البنية الجديدة. لمزيد من المعلومات عن التغييرات في البنية، راجع <a href="/docs/ar/architecture_overview.md">نظرة عامة</a> على <a href="/docs/ar/architecture_overview.md">بنية ميلفوس</a>.</p>
<h3 id="Requirements" class="common-anchor-header">المتطلبات</h3><p><strong>متطلبات النظام:</strong></p>
<ul>
<li>إصدار Helm &gt;= 3.14.0</li>
<li>إصدار Kubernetes &gt;= 1.20.0</li>
<li>تم نشر مجموعة Milvus عبر مخطط Helm</li>
</ul>
<p><strong>متطلبات التوافق:</strong></p>
<ul>
<li>Milvus v2.6.0-rc1 <strong>غير متوافق</strong> مع الإصدار 2.6.0. الترقيات المباشرة من الإصدارات المرشحة غير مدعومة.</li>
<li>إذا كنت تقوم حاليًا بتشغيل الإصدار 2.6.0-rc1 وتحتاج إلى الحفاظ على بياناتك، يُرجى الرجوع إلى <a href="https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997">دليل المجتمع هذا</a> للحصول على مساعدة الترحيل.</li>
<li><strong>يجب أن</strong> تقوم بالترقية إلى الإصدار 2.5.16 أو أحدث مع تمكين <code translate="no">mixCoordinator</code> قبل الترقية إلى الإصدار 2.6.0.</li>
</ul>
<div class="alert note">
منذ الإصدار 4.2.21 من مخطط Milvus Helm البياني 4.2.21، قدمنا مخطط pulsar-v3.x كإصدار تبعي. للتوافق مع الإصدارات السابقة، يُرجى ترقية Helm إلى الإصدار 3.14 أو إصدار أحدث، وتأكد من إضافة الخيار <code translate="no">--reset-then-reuse-values</code> كلما استخدمت <code translate="no">helm upgrade</code>.</div>
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
    </button></h2><h3 id="Step-1-Upgrade-Helm-Chart" class="common-anchor-header">الخطوة 1: ترقية مخطط Helm</h3><p>أولاً، قم بترقية مخطط Milvus Helm الخاص بك إلى الإصدار 5.0.0:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update zilliztech
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
تمت أرشفة الريبو الخاص بمخططات Milvus Helm Charts على <code translate="no">https://milvus-io.github.io/milvus-helm/</code>. استخدم الريبو الجديد <code translate="no">https://zilliztech.github.io/milvus-helm/</code> لإصدارات المخطط 4.0.31 والإصدارات الأحدث.</div>
<p>للتحقق من توافق إصدار مخطط Helm البياني مع إصدارات Milvus:</p>
<pre><code translate="no" class="language-bash">helm search repo zilliztech/milvus --versions
<button class="copy-code-btn"></button></code></pre>
<p>يفترض هذا الدليل أنك تقوم بتثبيت أحدث إصدار. إذا كنت بحاجة إلى تثبيت إصدار معين، فحدد المعلمة <code translate="no">--version</code> وفقًا لذلك.</p>
<h3 id="Step-2-Upgrade-to-v2516-with-mixCoordinator" class="common-anchor-header">الخطوة 2: الترقية إلى الإصدار 2.5.16 باستخدام mixCoordinator</h3><p>تحقق مما إذا كانت مجموعتك تستخدم حاليًا منسقين منفصلين:</p>
<pre><code translate="no" class="language-bash">kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>إذا كنت ترى كبسولات منسقين منفصلة (<code translate="no">datacoord</code> ، <code translate="no">querycoord</code> ، <code translate="no">indexcoord</code>)، قم بالترقية إلى الإصدار 2.5.16 وقم بتمكين <code translate="no">mixCoordinator</code>:</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.5.16&quot;</span> \
  --<span class="hljs-built_in">set</span> mixCoordinator.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> rootCoordinator.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> indexCoordinator.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> queryCoordinator.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> dataCoordinator.enabled=<span class="hljs-literal">false</span> \
  --reset-then-reuse-values \
  --version=4.2.58
<button class="copy-code-btn"></button></code></pre>
<div class="alert-note">
<p>إذا كانت مجموعتك تستخدم بالفعل <code translate="no">mixCoordinator</code> ، فما عليك سوى ترقية الصورة:</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.5.16&quot;</span> \
  --reset-then-reuse-values \
  --version=4.2.58
<button class="copy-code-btn"></button></code></pre>
</div>
<p>انتظر حتى تكتمل الترقية:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Verify all pods are ready</span>
kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Upgrade-to-v260" class="common-anchor-header">الخطوة 3: الترقية إلى الإصدار 2.6.0</h3><p>بمجرد تشغيل الإصدار 2.5.16 بنجاح مع <code translate="no">mixCoordinator</code> ، قم بالترقية إلى الإصدار 2.6.0:</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.6.0&quot;</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span> \
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
    </button></h2><p>تأكد من تشغيل مجموعتك للإصدار الجديد:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check pod status</span>
kubectl get pods

<span class="hljs-comment"># Verify Helm release</span>
helm list
<button class="copy-code-btn"></button></code></pre>
<p>للحصول على دعم إضافي، راجع <a href="https://milvus.io/docs">وثائق Milvus</a> أو <a href="https://github.com/milvus-io/milvus/discussions">منتدى المجتمع</a>.</p>
