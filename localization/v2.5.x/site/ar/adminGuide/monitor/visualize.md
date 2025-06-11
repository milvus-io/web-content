---
id: visualize.md
title: تصور المقاييس
related_key: "monitor, alert"
summary: تعرف على كيفية تصور مقاييس Milvus في Grafana.
---

<h1 id="Visualize-Milvus-Metrics-in-Grafana" class="common-anchor-header">تصور مقاييس ميلفوس في غرافانا<button data-href="#Visualize-Milvus-Metrics-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الموضوع كيفية تصور مقاييس ميلفوس باستخدام غرافانا.</p>
<p>كما هو موضح في <a href="/docs/ar/v2.5.x/monitor.md">دليل المراقبة،</a> تحتوي المقاييس على معلومات مفيدة مثل مقدار الذاكرة المستخدمة من قبل مكون Milvus محدد. تساعدك مراقبة المقاييس على فهم أداء Milvus وحالة تشغيله بشكل أفضل بحيث يمكنك ضبط تخصيص الموارد في الوقت المناسب.</p>
<p>التصور عبارة عن مخطط بياني يوضح التغير في استخدام الموارد عبر الزمن، مما يسهل عليك رؤية وملاحظة التغييرات التي تطرأ على استخدام الموارد بسرعة خاصة عند وقوع حدث ما.</p>
<p>يستخدم هذا البرنامج التعليمي Grafana، وهي منصة مفتوحة المصدر لتحليلات السلاسل الزمنية، لتصور مقاييس الأداء المختلفة لمجموعة Milvus المنشورة على Kubernetes (K8s).</p>
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
<li>لقد قمت <a href="/docs/ar/v2.5.x/install_cluster-helm.md">بتثبيت مجموعة Milvus على K8s)</a>.</li>
<li>تحتاج إلى <a href="/docs/ar/v2.5.x/monitor.md">تكوين Prometheus</a> لمراقبة وجمع المقاييس قبل استخدام Grafana لتصور المقاييس. إذا نجح الإعداد، يمكنك الوصول إلى Grafana على <code translate="no">http://localhost:3000</code>. أو يمكنك أيضًا الوصول إلى Grafana باستخدام Grafana الافتراضي Grafana <code translate="no">user:password</code> من <code translate="no">admin:admin</code>.</li>
</ul>
<h2 id="Visualize-metrics-using-Grafana" class="common-anchor-header">تصور المقاييس باستخدام Grafana<button data-href="#Visualize-metrics-using-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Download-and-import-dashboard" class="common-anchor-header">1. تنزيل لوحة المعلومات واستيرادها</h3><p>قم بتنزيل واستيراد لوحة معلومات Milvus من ملف JSON.</p>
<pre><code translate="no">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/refs/heads/master/deployments/monitor/grafana/milvus-dashboard.json</span>
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/import_dashboard.png" alt="Download_and_import" class="doc-image" id="download_and_import" />
   </span> <span class="img-wrapper"> <span>تنزيل_واستيراد</span> </span></p>
<h3 id="2-View-metrics" class="common-anchor-header">2. عرض المقاييس</h3><p>حدد مثيل Milvus الذي تريد مراقبته. ثم يمكنك رؤية لوحة مكونات Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/grafana_select.png" alt="Select_instance" class="doc-image" id="select_instance" />
   </span> <span class="img-wrapper"> <span>حدد_مثلاً</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/grafana_panel.png" alt="Grafana_panel" class="doc-image" id="grafana_panel" />
   </span> <span class="img-wrapper"> <span>Grafana_panel</span> </span></p>
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
<li>إذا كنت قد قمت بتعيين Grafana لتصور مقاييس Milvus، فقد ترغب أيضًا في<ul>
<li>تعلم كيفية <a href="/docs/ar/v2.5.x/alert.md">إنشاء تنبيه لخدمات ميلفوس</a></li>
<li>ضبط <a href="/docs/ar/v2.5.x/allocate.md">تخصيص الموارد</a> الخاصة بك</li>
<li><a href="/docs/ar/v2.5.x/scaleout.md">توسيع نطاق مجموعة ميلفوس أو توسيع نطاقها في مجموعة ميلفوس</a></li>
</ul></li>
<li>إذا كنت مهتمًا بترقية إصدار Milvus,<ul>
<li>اقرأ <a href="/docs/ar/v2.5.x/upgrade_milvus_cluster-operator.md">الدليل الخاص بترقية مجموعة Milvus العنقودية</a> ودليل <a href="/docs/ar/v2.5.x/upgrade_milvus_standalone-operator.md">ترقية مجموعة Milvus المستقلة</a>.</li>
</ul></li>
</ul>
