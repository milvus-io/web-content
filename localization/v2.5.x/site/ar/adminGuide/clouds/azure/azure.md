---
id: azure.md
title: نشر Milvus على Microsoft Azure باستخدام Kubernetes
related_key: cluster
summary: تعرف على كيفية نشر مجموعة Milvus العنقودية على Azure.
---
<h1 id="Deploy-Milvus-on-Azure-with-AKS" class="common-anchor-header">نشر ميلفوس على Azure باستخدام AKS<button data-href="#Deploy-Milvus-on-Azure-with-AKS" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الموضوع كيفية توفير مجموعة وإنشاء مجموعة باستخدام <a href="https://azure.microsoft.com/en-us/services/kubernetes-service/#overview">خدمة Azure Kubernetes</a> (AKS) <a href="https://portal.azure.com">وبوابة Azure</a>.</p>
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
    </button></h2><p>تأكد من إعداد مشروع Azure الخاص بك بشكل صحيح وأن لديك حق الوصول إلى الموارد التي تريد استخدامها. اتصل بالمسؤولين لديك إذا لم تكن متأكدًا من إذن الوصول الخاص بك.</p>
<h2 id="Software-requirements" class="common-anchor-header">متطلبات البرنامج<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
<li><a href="https://docs.microsoft.com/en-us/cli/azure/install-azure-cli#install">Azure CLI</a></li>
<li><a href="https://kubernetes.io/docs/tasks/tools/">كوبكتل</a></li>
<li><a href="https://helm.sh/docs/intro/install/">هيلم</a></li>
</ul>
<p>بدلاً من ذلك، يمكنك استخدام <a href="https://learn.microsoft.com/en-us/azure/cloud-shell/overview">Cloud Shell</a> التي تحتوي على Azure CLI و kubectl و Helm المثبتة مسبقاً.</p>
<div class="alert note">بعد تثبيت Azure CLI، تأكد من مصادقتك بشكل صحيح. </div>
<h2 id="Provision-a-Kubernetes-cluster" class="common-anchor-header">توفير مجموعة Kubernetes<button data-href="#Provision-a-Kubernetes-cluster" class="anchor-icon" translate="no">
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
<li>قم بتسجيل الدخول إلى بوابة Azure.</li>
<li>في قائمة بوابة Azure أو من الصفحة <strong>الرئيسية،</strong> حدد <strong>إنشاء مورد</strong>.</li>
<li>حدد <strong>حاويات</strong> &gt; <strong>خدمة Kubernetes</strong>.</li>
<li>في صفحة <strong>الأساسيات،</strong> قم بتكوين الخيارات التالية:</li>
</ol>
<ul>
<li><p><strong>تفاصيل المشروع</strong>:</p>
<ul>
<li><p><strong>الاشتراك</strong>: اتصل بمسؤول Azure الخاص بمؤسستك لتحديد الاشتراك الذي يجب عليك استخدامه.</p>
<ul>
<li><strong>مجموعة الموارد</strong>: اتصل بمسؤول Azure الخاص بمؤسستك لتحديد مجموعة الموارد التي يجب عليك استخدامها.</li>
</ul></li>
</ul></li>
<li><p><strong>تفاصيل المجموعة</strong>:</p>
<ul>
<li><p><strong>اسم مجموعة Kubernetes</strong>: أدخل اسم المجموعة.</p></li>
<li><p><strong>المنطقة</strong>: حدد منطقة.</p></li>
<li><p><strong>مناطق التوفر</strong>: حدد <a href="https://docs.microsoft.com/en-us/azure/aks/availability-zones#overview-of-availability-zones-for-aks-clusters">مناطق التوفر</a> حسب حاجتك. بالنسبة لمجموعات الإنتاج، نوصي بتحديد مناطق توافر متعددة.</p></li>
</ul></li>
<li><p><strong>تجمع العُقد الأساسي</strong>:</p>
<ul>
<li><p><strong>حجم العقدة</strong>: نوصي باختيار أجهزة افتراضية ذات ذاكرة وصول عشوائي لا تقل سعتها عن 16 جيجابايت من ذاكرة الوصول العشوائي، ولكن يمكنك تحديد أحجام الأجهزة الافتراضية حسب حاجتك.</p></li>
<li><p><strong>طريقة القياس</strong>: اختر طريقة القياس.</p></li>
<li><p><strong>نطاق عدد العُقد</strong>: حدد نطاقًا لعدد العقد.</p></li>
</ul></li>
<li><p><strong>تجمعات العقد</strong>:</p>
<ul>
<li><p><strong>تمكين العقد الافتراضية</strong>: حدد خانة الاختيار لتمكين العقد الافتراضية.</p></li>
<li><p><strong>تمكين مجموعات نطاق الأجهزة الافتراضية</strong>: نوصي باختيار <code translate="no">enabled</code>.</p></li>
</ul></li>
<li><p><strong>الشبكات</strong>:</p>
<ul>
<li><p><strong>تكوين الشبكة</strong>: نوصي باختيار <code translate="no">Kubenet</code>.</p></li>
<li><p><strong>بادئة اسم DNS</strong>: أدخل بادئة اسم DNS.</p></li>
<li><p><strong>توجيه حركة المرور</strong>:</p>
<ul>
<li><p><strong>موازن التحميل</strong>: <code translate="no">Standard</code>.</p></li>
<li><p><strong>توجيه تطبيق HTTP</strong>: غير مطلوب.</p></li>
</ul></li>
</ul></li>
</ul>
<ol start="5">
<li>بعد تكوين الخيارات، انقر فوق <strong>مراجعة + إنشاء</strong> ثم <strong>إنشاء</strong> عند اكتمال التحقق من الصحة. يستغرق إنشاء الكتلة بضع دقائق.</li>
</ol>
<h2 id="Connect-to-the-cluster" class="common-anchor-header">الاتصال بالمجموعة<button data-href="#Connect-to-the-cluster" class="anchor-icon" translate="no">
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
<li>انتقل إلى المجموعة التي قمت بإنشائها في خدمات Kubernetes وانقر عليها.</li>
<li>في جزء التنقل على الجانب الأيمن، انقر <code translate="no">Overview</code>.</li>
<li>في صفحة <strong>النظرة العامة</strong> التي تظهر، انقر فوق <strong>اتصال</strong> لعرض مجموعة الموارد والاشتراك.</li>
</ol>
<h2 id="Set-a-subscription-and-credentials" class="common-anchor-header">تعيين اشتراك وبيانات اعتماد<button data-href="#Set-a-subscription-and-credentials" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">يمكنك استخدام Azure Cloud Shell لتنفيذ الإجراءات التالية.</div>
<ol>
<li>قم بتشغيل الأمر التالي لتعيين اشتراكك.</li>
</ol>
<pre><code translate="no" class="language-shell">az account <span class="hljs-built_in">set</span> --subscription EXAMPLE-SUBSCRIPTION-ID
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>قم بتشغيل الأمر التالي لتنزيل بيانات الاعتماد وتهيئة Kubernetes CLI لاستخدامها.</li>
</ol>
<pre><code translate="no" class="language-shell">az aks <span class="hljs-keyword">get</span>-credentials --resource-<span class="hljs-keyword">group</span> YOUR-RESOURCE-GROUP --name YOUR-CLUSTER-NAME
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
استخدم نفس الصدفة للإجراءات التالية. إذا قمت بالتبديل إلى غلاف آخر، فقم بتشغيل الأوامر السابقة مرة أخرى.</div>
<h2 id="Using-Azure-Blob-Storage-as-external-object-storage" class="common-anchor-header">استخدام Azure Blob Storage كمخزن كائنات خارجي<button data-href="#Using-Azure-Blob-Storage-as-external-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>تخزين Azure Blob Storage هو إصدار Azure من خدمة التخزين البسيط من AWS (S3).</p>
<ul>
<li>إنشاء حساب تخزين وحاوية</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account create -n milvustesting1 -g MyResourceGroup -l eastus --sku Standard_LRS --<span class="hljs-built_in">min</span>-tls-version TLS1_2
az storage container create -n testmilvus --account-name milvustesting1
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>الحصول على المفتاح السري، استخدم القيمة الأولى</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account keys list --account-name milvustesting2
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>إضافة القيم.yaml</li>
</ul>
<pre><code translate="no" class="language-yaml">cluster:
  enabled: <span class="hljs-literal">true</span>

service:
  <span class="hljs-built_in">type</span>: LoadBalancer

extraConfigFiles:
  user.yaml: |+
    common:
      storageType: remote

minio:
  enabled: <span class="hljs-literal">false</span>

externalS3:
  enabled: <span class="hljs-literal">true</span>
  host: core.windows.net
  port: 443
  rootPath: my-release
  bucketName: testmilvus <span class="hljs-comment"># the storage account container name</span>
  cloudProvider: azure
  useSSL: <span class="hljs-literal">true</span>
  accessKey: <span class="hljs-string">&quot;milvustesting1&quot;</span> <span class="hljs-comment"># the storage account name</span>
  secretKey: <span class="hljs-string">&quot;&lt;secret-key&gt;&quot;</span> 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Milvus" class="common-anchor-header">نشر ميلفوس<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>الآن مجموعة Kubernetes جاهزة. لننشر ميلفوس الآن.</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update
helm install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>في الأوامر السابقة، نضيف الريبو الخاص بمخططات Milvus Helm محليًا ونقوم بتحديث الريبو لجلب أحدث المخططات. ثم نقوم بتثبيت مثيل Milvus ونسميه <strong>الإصدار الخاص بي</strong>.</p>
<p>لاحظ قيمة التهيئة <code translate="no">service.type</code> ، والتي تشير إلى أننا نرغب في تعريض مثيل Milvus من خلال موازن تحميل من الطبقة الرابعة.</p>
<h2 id="Verify-the-deployment" class="common-anchor-header">تحقق من النشر<button data-href="#Verify-the-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد تشغيل جميع البودات، قم بتشغيل الأمر التالي للحصول على عنوان IP الخارجي.</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> services|grep my-release-milvus|grep LoadBalancer|awk <span class="hljs-string">&#x27;{print $4}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Hello-Milvus" class="common-anchor-header">مرحباً ميلفوس<button data-href="#Hello-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>يُرجى الرجوع إلى <a href="https://milvus.io/docs/v2.3.x/example_code.md">Hello Mil</a>vus، وتغيير قيمة المضيف إلى عنوان IP الخارجي، ثم تشغيل الكود.</p>
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
    </button></h2><p>إذا كنت تريد معرفة كيفية نشر ميلفوس على السحب الأخرى:</p>
<ul>
<li><a href="/docs/ar/eks.md">نشر مجموعة Milvus العنقودية على AWS باستخدام Kubernetes</a></li>
<li><a href="/docs/ar/gcp.md">نشر مجموعة Milvus العنقودية على GCP باستخدام Kubernetes</a></li>
</ul>
