---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: تعرف على كيفية ترقية مجموعة Milvus باستخدام Milvus Operator.
title: ترقية مجموعة Milvus باستخدام Milvus Operator
---
<div class="tab-wrapper"><a href="/docs/ar/upgrade_milvus_cluster-operator.md" class='active '>Milvus</a><a href="/docs/ar/upgrade_milvus_cluster-helm.md" class=''>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">ترقية مجموعة Milvus باستخدام Milvus Operator<button data-href="#Upgrade-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الدليل كيفية ترقية مجموعة Milvus 2.6.x إلى الإصدار v3.0-beta باستخدام Milvus Operator.</p>
<div class="alert note">
<p>تم التحقق من صحة هذا الإجراء من Milvus 2.6.20 إلى Milvus v3.0-beta باستخدام Milvus Operator 1.3.0 وMixCoord وStreamingNode وWoodpecker وetcd داخل المجموعة وMinIO داخل المجموعة. إذا كنت تستخدم إصدار تصحيح آخر من Milvus 2.6.x، أو إصدار Operator مختلف، أو طوبولوجيا مكونات مختلفة، أو قائمة انتظار رسائل مختلفة، أو تكوين تبعيات مختلف، فقم بالتحقق من صحة الترقية أولاً في بيئة غير إنتاجية.</p>
</div>
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
<li>مجموعة Kubernetes تحتوي على مجموعة Milvus 2.6.x تديرها Milvus Operator</li>
<li><code translate="no">kubectl</code> الوصول إلى المجموعة</li>
<li>بيان الموارد المخصصة (CR) الكامل لـ Milvus المستخدم في النشر الحالي</li>
<li>طريقة التثبيت وقوائم البيانات المستخدمة لـ Milvus Operator الحالي</li>
<li>نسخة احتياطية حديثة من بيانات Milvus الوصفية والبيانات الدائمة</li>
</ul>
<p><strong>قيود قائمة انتظار الرسائل</strong>: عند الترقية إلى Milvus v3.0-beta، يجب الحفاظ على اختيارك الحالي لقائمة انتظار الرسائل. لا يُدعم التبديل بين أنظمة قوائم انتظار الرسائل المختلفة أثناء الترقية. سيتوفر دعم تغيير أنظمة قوائم انتظار الرسائل في الإصدارات المستقبلية.</p>
<div class="alert warning">
<p>قم بتطبيق ملف تعريف المورد المخصص (CR) الكامل لـ Milvus من أجل هذه الترقية. لا تستخدم تصحيح دمج يقتصر على الصورة فقط. يمكن لـ Operator تعيين قيم افتراضية لحقول المكونات التي تم حذفها والتي لا تحتوي على نسخ متماثلة، مما قد يؤدي إلى إعادة تمكين مكون تم تعطيله في النشر الحالي للإصدار 2.6.x.</p>
<p>لا يتحقق هذا الإجراء من صحة الرجوع إلى إصدار أقدم أو التراجع عن الترقية عن طريق إعادة صورة Milvus إلى الإصدار 2.6.x. بعد أن تقوم الإصدار v3.0-beta بكتابة البيانات، قد يفشل التراجع الذي يقتصر على الصورة في قراءة الحالة المحدثة. إذا فشل الترقية، أوقف عمليات الكتابة واستخدم خطة استعادة تعيد البيانات الوصفية قبل الترقية ونسخ البيانات الدائمة الاحتياطية. تحقق من صحة خطة الاستعادة في بيئة غير إنتاجية أولاً.</p>
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
    </button></h2><h3 id="Step-1-Back-up-the-current-Milvus-CR" class="common-anchor-header">الخطوة 1: قم بعمل نسخة احتياطية من CR الحالي لـ Milvus<button data-href="#Step-1-Back-up-the-current-Milvus-CR" class="anchor-icon" translate="no">
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
    </button></h3><p>احفظ CR الحالي قبل تغيير النشر:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;instance-name&gt; \
  --namespace &lt;namespace&gt; \
  --output yaml &gt; milvus-before-upgrade.yaml
<button class="copy-code-btn"></button></code></pre>
<p>استخدم ملف البيان المصدر للنشر الحالي الخاص بك كملف بيان الترقية. لا تقم بتطبيق ملف النسخ الاحتياطي المصدَّر مباشرةً دون إزالة البيانات الوصفية التي يديرها الخادم وحقول الحالة أولاً.</p>
<h3 id="Step-2-Confirm-the-Milvus-Operator-version" class="common-anchor-header">الخطوة 2: تأكيد إصدار Milvus Operator<button data-href="#Step-2-Confirm-the-Milvus-Operator-version" class="anchor-icon" translate="no">
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
    </button></h3><p>تحقق من الصورة المستخدمة بواسطة Milvus Operator المثبت:</p>
<pre><code translate="no" class="language-bash">kubectl get deployments --all-namespaces \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.namespace}{&quot;\t&quot;}{.metadata.name}{&quot;\t&quot;}{range .spec.template.spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span> \
  | grep milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>أبقت عملية الترقية التي تم التحقق من صحتها على إصدار Milvus Operator عند 1.3.0. احتفظ بإصدار Operator الذي يدير حاليًا نشر Milvus 2.6.x الخاص بك ما لم تتطلب سياسة الدعم الخاصة بك ترقية Operator منفصلة. لا تقم بتخفيض إصدار Operator الأحدث إلى الإصدار الذي تم اختباره. إذا كنت بحاجة إلى تغيير إصدار Operator، فاستخدم نفس طريقة التثبيت Helm أو <code translate="no">kubectl</code> ونفس اسم الإصدار ومساحة الاسم المستخدمة في التثبيت الحالي، ثم قم بالتحقق من صحة تغيير Operator قبل تحديث Milvus CR.</p>
<h3 id="Step-3-Update-the-Milvus-image" class="common-anchor-header">الخطوة 3: تحديث صورة Milvus<button data-href="#Step-3-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>في بيان Milvus CR الكامل، قم بتغيير <code translate="no">spec.components.image</code> إلى الإصدار المستهدف. احتفظ بالوضع الحالي، وطوبولوجيا المكونات، وقائمة انتظار الرسائل، وetcd، والتخزين، وإعدادات التبعية الأخرى. يوضح المقتطف التالي الحقول التي يجب تأكيدها؛ لا تستبدل CR الكامل الخاص بك بهذا المقتطف.</p>
<p>قبل تطبيق طلب التغيير المستهدف، تأكد من أن <code translate="no">indexNode.replicas</code> هو <code translate="no">0</code>. استخدمت تهيئة Milvus 2.6.20 التي تم التحقق من صحتها هذا الإعداد بالفعل. احتفظ بالإعداد الصريح لعدم وجود نسخ متماثلة في طلب التغيير المستهدف.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">&lt;instance-name&gt;</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">&lt;namespace&gt;</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0-beta</span>
    <span class="hljs-attr">indexNode:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p>قم بتطبيق ملف CR الكامل:</p>
<pre><code translate="no" class="language-bash">kubectl apply --filename milvus.yaml
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
    </button></h2><p>تحقق من حالة CR وحالة Pod وصور الحاويات:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;instance-name&gt; \
  --namespace &lt;namespace&gt; \
  --output jsonpath=<span class="hljs-string">&#x27;{.status.status}{&quot;\t&quot;}{.status.currentImage}{&quot;\n&quot;}&#x27;</span>

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>تأكد من أن CR الخاص بـ Milvus يُبلغ عن <code translate="no">Healthy</code> ، وأن جميع مكونات Milvus تستخدم <code translate="no">milvusdb/milvus:v3.0-beta</code> ، وأنه لا يوجد أي Pod لـ IndexNode قيد التشغيل، وأن المجموعات الحالية لا تزال قابلة للاستعلام والبحث. أكمل هذه الفحوصات قبل تمكين أي ميزة خاصة بالإصدار v3.0-beta.</p>
