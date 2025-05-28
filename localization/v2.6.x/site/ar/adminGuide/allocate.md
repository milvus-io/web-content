---
id: allocate.md
title: تخصيص الموارد لميلفوس على Kubernetes
summary: تعرف على كيفية تخصيص الموارد لـ Milvus على Kubernetes.
---
<h1 id="Allocate-Resources-on-Kubernetes" class="common-anchor-header">تخصيص الموارد على Kubernetes<button data-href="#Allocate-Resources-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الموضوع كيفية تخصيص الموارد لمجموعة Milvus على Kubernetes.</p>
<p>بشكل عام، يجب أن تكون الموارد التي تخصصها لمجموعة Milvus في الإنتاج متناسبة مع عبء عمل الجهاز. يجب عليك أيضًا مراعاة نوع الجهاز عند تخصيص الموارد. على الرغم من أنه يمكنك تحديث التكوينات عند تشغيل المجموعة، إلا أننا نوصي بتعيين القيم قبل <a href="/docs/ar/install_cluster-helm.md">نشر المجموعة</a>.</p>
<div class="alert note">
<p>للحصول على معلومات حول كيفية تخصيص الموارد باستخدام مشغل Milvus، راجع <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/allocate-resources.md#allocate-resources-with-milvus-operator">تخصيص الموارد باستخدام مشغل Milvus</a>.</p>
</div>
<h2 id="1-View-available-resources" class="common-anchor-header">1. عرض الموارد المتاحة<button data-href="#1-View-available-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتشغيل <code translate="no">kubectl describe nodes</code> لعرض الموارد المتاحة في المثيلات التي قمت بتزويدها.</p>
<h2 id="2-Allocate-resources" class="common-anchor-header">2. تخصيص الموارد<button data-href="#2-Allocate-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم Helm لتخصيص موارد وحدة المعالجة المركزية وموارد الذاكرة لمكونات Milvus.</p>
<div class="alert note">
سيؤدي استخدام Helm لترقية الموارد إلى إجراء تحديث متجدد للقرون قيد التشغيل.</div>
<p>هناك طريقتان لتخصيص الموارد:</p>
<ul>
<li><a href="/docs/ar/allocate.md#Allocate-resources-with-commands">استخدم الأوامر</a></li>
<li><a href="/docs/ar/allocate.md#Allocate-resources-by-setting-configuration-file">تعيين المعلمات في الملف <code translate="no">YAML</code> </a></li>
</ul>
<h3 id="Allocate-resources-with-commands" class="common-anchor-header">تخصيص الموارد باستخدام الأوامر</h3><p>تحتاج إلى تعيين متغيرات الموارد لكل مكون من مكونات Milvus إذا كنت تستخدم <code translate="no">--set</code> لتحديث تكوينات الموارد.</p>
<div class="filter">
 <a href="#cluster">عنقود</a><a href="#standalone">ميلفوس المستقل</a> <a href="#cluster">ميلفوس العنقودي</a></div>
<div class="table-wrapper filter-standalone" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --set standalone.resources.limits.cpu=2 --set standalone.resources.limits.memory=4Gi --set standalone.resources.requests.cpu=0.1 --set standalone.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="table-wrapper filter-cluster" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --set dataNode.resources.limits.cpu=2 --set dataNode.resources.limits.memory=4Gi --set dataNode.resources.requests.cpu=0.1 --set dataNode.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Allocate-resources-by-setting-configuration-file" class="common-anchor-header">تخصيص الموارد عن طريق تعيين ملف التكوين</h3><p>يمكنك أيضًا تخصيص موارد وحدة المعالجة المركزية وموارد الذاكرة عن طريق تحديد المعلمات <code translate="no">resources.requests</code> و <code translate="no">resources.limits</code> في الملف <code translate="no">resources.yaml</code>.</p>
<pre><code translate="no" class="language-Yaml"><span class="hljs-attr">dataNode:</span>
  <span class="hljs-attr">resources:</span>
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;4&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;16Gi&quot;</span>
    <span class="hljs-attr">requests:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;4Gi&quot;</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">resources:</span>
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;4&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;16Gi&quot;</span>
    <span class="hljs-attr">requests:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;4Gi&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Apply-configurations" class="common-anchor-header">3. تطبيق التكوينات<button data-href="#3-Apply-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتشغيل الأمر التالي لتطبيق التكوينات الجديدة على مجموعة ميلفوس العنقودية الخاصة بك.</p>
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values -f resources.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
إذا لم يتم تحديد <code translate="no">resources.limits</code> ، ستستهلك الكبسولات جميع موارد وحدة المعالجة المركزية والذاكرة المتاحة. لذلك، تأكد من تحديد <code translate="no">resources.requests</code> و <code translate="no">resources.limits</code> لتجنب التخصيص الكلي للموارد عندما تتطلب المهام الأخرى قيد التشغيل على نفس المثيل استهلاك المزيد من الذاكرة.</div>
<p>راجع <a href="https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/">وثائق Kubernetes</a> لمزيد من المعلومات حول إدارة الموارد.</p>
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
<li>قد ترغب أيضًا في معرفة كيفية:<ul>
<li><a href="/docs/ar/scaleout.md">توسيع نطاق مجموعة Milvus العنقودية</a></li>
<li><a href="/docs/ar/upgrade_milvus_cluster-operator.md">ترقية مجموعة ميلفوس العنقودية</a></li>
<li><a href="/docs/ar/upgrade_milvus_standalone-operator.md">ترقية مجموعة ميلفوس المستقلة</a></li>
</ul></li>
<li>إذا كنت مستعداً لنشر مجموعتك العنقودية على السحابة<ul>
<li>تعرف على كيفية <a href="/docs/ar/eks.md">نشر Milvus على Amazon EKS باستخدام Terraform</a></li>
<li>تعلم كيفية <a href="/docs/ar/gcp.md">نشر مجموعة ميلفوس العنقودية على GCP باستخدام Kubernetes</a></li>
<li>تعرف على كيفية <a href="/docs/ar/azure.md">نشر Milvus على Microsoft Azure باستخدام Kubernetes</a></li>
</ul></li>
</ul>
