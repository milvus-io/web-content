---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: تعرف على كيفية ترقية مجموعة Milvus باستخدام Helm Chart.
title: ترقية مجموعة Milvus باستخدام مخطط Helm
---
<div class="tab-wrapper"><a href="/docs/ar/upgrade_milvus_cluster-operator.md" class=''>Milvus</a><a href="/docs/ar/upgrade_milvus_cluster-helm.md" class='active '>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Helm-Chart" class="common-anchor-header">ترقية مجموعة Milvus باستخدام مخطط Helm<button data-href="#Upgrade-Milvus-Cluster-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الدليل كيفية ترقية مجموعة Milvus 2.6.x إلى الإصدار v3.0-beta باستخدام Helm.</p>
<div class="alert note">
<p>تم التحقق من صحة هذا الإجراء من Milvus 2.6.20 إلى Milvus v3.0-beta باستخدام مخطط Helm الخاص بـ Milvus الإصدار 5.0.22. إذا كنت تستخدم إصدار تصحيح آخر من Milvus 2.6.x أو إصدارًا آخر من مخطط Helm، فقم أولاً بالتحقق من صحة الترقية في بيئة غير إنتاجية.</p>
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
<li>Helm 3.14.0 أو أحدث</li>
<li>نشر Milvus 2.6.x موجود يُدار بواسطة Helm</li>
<li>قيم Helm المستخدمة في النشر الحالي</li>
<li>نسخة احتياطية حديثة من بيانات Milvus الوصفية والبيانات الدائمة</li>
</ul>
<p><strong>قيود قائمة انتظار الرسائل</strong>: عند الترقية إلى Milvus v3.0-beta، يجب الحفاظ على اختيارك الحالي لقائمة انتظار الرسائل. لا يُدعم التبديل بين أنظمة قوائم انتظار الرسائل المختلفة أثناء الترقية. سيتوفر دعم تغيير أنظمة قوائم انتظار الرسائل في الإصدارات المستقبلية.</p>
<div class="alert warning">
<p>لا تقم بتغيير مخطط Helm أو الرجوع إلى إصدار أقدم منه كجزء من هذا الإجراء. احتفظ بإصدار المخطط المثبت بالفعل لإصدار Helm الخاص بك. احتفظ خط الأساس الذي تم اختباره بمخطط Helm 5.0.22 وقام فقط بتغيير علامة صورة Milvus إلى <code translate="no">v3.0-beta</code>.</p>
<p>لا يتحقق هذا الإجراء من صحة الرجوع إلى إصدار أقدم أو التراجع عن الترقية عن طريق إعادة صورة Milvus إلى الإصدار 2.6.x. بعد أن تقوم الإصدارة v3.0-beta بكتابة البيانات، قد تفشل عملية التراجع التي تقتصر على الصورة في قراءة الحالة المحدثة. إذا فشلت عملية الترقية، أوقف عمليات الكتابة واستخدم خطة استعادة تعيد البيانات الوصفية ونسخ البيانات الدائمة الاحتياطية إلى ما قبل الترقية. تحقق من صحة خطة الاستعادة في بيئة غير إنتاجية أولاً.</p>
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
    </button></h2><p>تم إنشاء نشر Milvus 2.6.20 الذي تم التحقق من صحته باستخدام Helm Chart 5.0.22 باستخدام MixCoord وStreamingNode ولم يتم تشغيل IndexNode. لا تحتاج إلى خطوة منفصلة لترحيل المنسق عندما يستخدم النشر الخاص بك نفس الطوبولوجيا.</p>
<h3 id="Step-1-Confirm-the-current-topology" class="common-anchor-header">الخطوة 1: تأكيد التوبولوجيا الحالية<button data-href="#Step-1-Confirm-the-current-topology" class="anchor-icon" translate="no">
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
    </button></h3><p>احفظ القيم الكاملة للإصدار الحالي وتحقق من Pods قيد التشغيل:</p>
<pre><code translate="no" class="language-bash">helm get values &lt;release-name&gt; \
  --namespace &lt;namespace&gt; \
  --all &gt; milvus-values-before-upgrade.yaml

kubectl get pods --namespace &lt;namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>تأكد من أن المجموعة تستخدم MixCoord وStreamingNode وأنه لا يوجد أي Pod لـ IndexNode قيد التشغيل. يحافظ أمر الترقية الوارد لاحقًا في هذا الدليل على قيم Helm الحالية. إذا كانت قيمك الحالية تُفعّل IndexNode أو تستخدم طوبولوجيا مكونات أخرى، فلا تقم بتشغيل عملية الترقية هذه التي تقتصر على الصورة فقط. قم بإعادة إنتاج الطوبولوجيا في بيئة غير إنتاجية واحصل أولاً على خطة ترحيل معتمدة من قسم الهندسة.</p>
<h3 id="Step-2-Update-the-Helm-repository" class="common-anchor-header">الخطوة 2: تحديث مستودع Helm<button data-href="#Step-2-Update-the-Helm-repository" class="anchor-icon" translate="no">
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
    </button></h3><p>أضف مستودع Milvus Helm أو قم بتحديثه:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm --force-update
helm repo update zilliztech
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
تم أرشفة مستودع Milvus Helm Charts الموجود على <code translate="no">https://milvus-io.github.io/milvus-helm/</code>. استخدم المستودع الجديد <code translate="no">https://zilliztech.github.io/milvus-helm/</code> لإصدارات المخططات 4.0.31 والإصدارات الأحدث.
</div>
<h3 id="Step-3-Upgrade-Milvus" class="common-anchor-header">الخطوة 3: ترقية Milvus<button data-href="#Step-3-Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>تحقق من إصدار المخطط المثبت لإصدار Helm الخاص بك:</p>
<pre><code translate="no" class="language-bash">helm list --namespace &lt;namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>في عمود <code translate="no">CHART</code> ، قم بإزالة البادئة <code translate="no">milvus-</code> من القيمة واستخدم الإصدار المتبقي على النحو التالي: <code translate="no">&lt;current-chart-version&gt;</code>. ثم قم بتشغيل أمر الترقية:</p>
<pre><code translate="no" class="language-bash">helm upgrade &lt;release-name&gt; zilliztech/milvus \
  --namespace &lt;namespace&gt; \
  --version &lt;current-chart-version&gt; \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v3.0-beta&quot;</span> \
  --reset-then-reuse-values \
  --<span class="hljs-built_in">wait</span> \
  --<span class="hljs-built_in">timeout</span> 30m
<button class="copy-code-btn"></button></code></pre>
<p>يحتفظ الخيار <code translate="no">--reset-then-reuse-values</code> بالقيم من الإصدار السابق مع تطبيق تجاوز الصورة الصريح على الإعدادات الافتراضية المحددة لـ Chart.</p>
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
    </button></h2><p>تحقق من مراجعة Helm وحالة Pod وصور الحاويات:</p>
<pre><code translate="no" class="language-bash">helm <span class="hljs-built_in">history</span> &lt;release-name&gt; --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>تأكد من أن جميع أحمال العمل المطلوبة جاهزة، وأن جميع مكونات Milvus تستخدم <code translate="no">v3.0-beta</code> ، وأن مجموعاتك الحالية لا تزال قابلة للاستعلام والبحث. أكمل هذه الفحوصات قبل تمكين أي ميزة خاصة بالإصدار v3.0-beta.</p>
<div class="alert note">
<p>لا يؤدي الترقية إلى Milvus 3.0 إلى تمكين Storage V3. بعد التحقق من الترقية، راجع <a href="/docs/ar/storage-v3.md">Storage V3</a> قبل تمكين الميزات التي تعتمد عليه. بمجرد أن يقوم Milvus بكتابة بيانات Storage V3، لن يتم دعم الرجوع إلى إصدار أقدم من Milvus لا يمكنه قراءة Storage V3.</p>
</div>
