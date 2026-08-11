---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: تعرف على الاستعدادات اللازمة قبل تثبيت Milvus باستخدام Helm.
title: متطلبات تشغيل Milvus على Kubernetes
---
<h1 id="Requirements-for-running-Milvus-on-Kubernetes" class="common-anchor-header">متطلبات تشغيل Milvus على Kubernetes<button data-href="#Requirements-for-running-Milvus-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>تسرد هذه الصفحة متطلبات الأجهزة والبرامج اللازمة لتشغيل Milvus.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">متطلبات الأجهزة<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>المكون</th><th>المتطلب</th><th>التوصية</th><th>ملاحظة</th></tr>
</thead>
<tbody>
<tr><td>وحدة المعالجة المركزية</td><td><ul><li>معالج Intel Core من الجيل الثاني أو أحدث</li><li>Apple Silicon</li></ul></td><td><ul><li>مستقل: 4 نوى أو أكثر</li><li>المجموعة: 8 نوى أو أكثر</li></ul></td><td></td></tr>
<tr><td>مجموعة تعليمات وحدة المعالجة المركزية</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>يتطلب البحث عن التشابه بين المتجهات وإنشاء الفهارس داخل Milvus دعم وحدة المعالجة المركزية (CPU) لمجموعات امتدادات التعليمات الفردية والبيانات المتعددة (SIMD). تأكد من أن وحدة المعالجة المركزية تدعم واحدًا على الأقل من امتدادات SIMD المذكورة. راجع <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">وحدات المعالجة المركزية المزودة بـ AVX</a> لمزيد من المعلومات.</td></tr>
<tr><td>ذاكرة الوصول العشوائي (RAM)</td><td><ul><li>نظام مستقل: 8G</li><li>المجموعة: 32G</li></ul></td><td><ul><li>جهاز مستقل: 16G</li><li>المجموعة: 128G</li></ul></td><td>يعتمد حجم ذاكرة الوصول العشوائي (RAM) على حجم البيانات.</td></tr>
<tr><td>محرك الأقراص الثابتة</td><td>محرك أقراص SSD SATA 3.0 أو CloudStorage</td><td>محرك أقراص SSD من نوع NVMe أو أعلى</td><td>يعتمد حجم القرص الصلب على حجم البيانات.</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">متطلبات البرامج<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>يُنصح بتشغيل مجموعة Kubernetes على أنظمة تشغيل Linux.</p>
<p>kubectl هي أداة سطر الأوامر الخاصة بـ Kubernetes. استخدم إصدارًا من kubectl لا يختلف عن إصدار الكتلة إلا في إصدار فرعي واحد. يساعد استخدام أحدث إصدار من kubectl على تجنب المشكلات غير المتوقعة.</p>
<p>minikube مطلوب عند تشغيل مجموعة Kubernetes محليًا. يتطلب minikube Docker كمتطلب. تأكد من تثبيت Docker قبل تثبيت Milvus باستخدام Helm. راجع <a href="https://docs.docker.com/get-docker">الحصول على Docker</a> لمزيد من المعلومات.</p>
<table>
<thead>
<tr><th>نظام التشغيل</th><th>البرامج</th><th>ملاحظة</th></tr>
</thead>
<tbody>
<tr><td>أنظمة Linux</td><td><ul><li>Kubernetes 1.16 أو أحدث</li><li>kubectl</li><li>Helm 3.0.0 أو أحدث</li><li>minikube (لـ Milvus المستقل)</li><li>Docker 19.03 أو أحدث (لـ Milvus المستقل)</li></ul></td><td>انظر <a href="https://helm.sh/docs/">وثائق Helm</a> لمزيد من المعلومات.</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>البرامج</th><th>الإصدار</th><th>ملاحظة</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>انظر <a href="#Additional-disk-requirements">متطلبات القرص الإضافية</a>.</td></tr>
<tr><td>MinIO</td><td>الإصدار 2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>مُضمّن مع Milvus (وضع الخدمة: <code translate="no">v0.1.36</code>+)</td><td>قائمة انتظار الرسائل الافتراضية. بالنسبة لعمليات النشر الموزعة، يمكن تشغيل Woodpecker <strong>كخدمة</strong> مخصصة؛ قم بتثبيت إصداره باستخدام <code translate="no">--set woodpecker.image.tag</code>. يتم دعم وضع الخدمة بدءًا من الإصدار <code translate="no">v0.1.36</code> من Woodpecker فصاعدًا.</td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td>اختياري — فقط إذا قمت بتحويل قائمة انتظار الرسائل إلى Pulsar؛ غير مثبت بشكل افتراضي.</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">متطلبات القرص الإضافية<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>يعد أداء القرص أمرًا بالغ الأهمية لـ etcd. يوصى بشدة باستخدام محركات أقراص SSD NVMe محلية. قد يؤدي بطء استجابة القرص إلى إجراء انتخابات متكررة للمجموعة، مما يؤدي في النهاية إلى تدهور خدمة etcd.</p>
<p>لاختبار ما إذا كان القرص الخاص بك مؤهلاً، استخدم <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>من الناحية المثالية، يجب أن يصل القرص إلى أكثر من 500 IOPS وأن يكون زمن انتقال fsync في المئوية 99 أقل من 10 مللي ثانية. اقرأ <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">وثائق</a> etcd للحصول على متطلبات أكثر تفصيلاً.</p>
<h2 id="FAQs" class="common-anchor-header">الأسئلة الشائعة<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">كيف يمكنني بدء تشغيل مجموعة K8s محليًا لأغراض الاختبار؟<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكنك استخدام أدوات مثل <a href="https://minikube.sigs.k8s.io/docs/">minikube</a> و <a href="https://kind.sigs.k8s.io/">kind</a> و <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> لإعداد مجموعة Kubernetes محليًا بسرعة. يستخدم الإجراء التالي minikube كمثال.</p>
<ol>
<li>تنزيل minikube</li>
</ol>
<p>انتقل إلى صفحة <a href="https://minikube.sigs.k8s.io/docs/start/">«البدء</a> »، وتحقق مما إذا كنت تستوفي الشروط المذكورة في قسم <strong>«ما ستحتاج إليه</strong> »، وانقر على الأزرار التي تصف النظام الأساسي المستهدف، وانسخ الأوامر لتنزيل الملف الثنائي وتثبيته.</p>
<ol start="2">
<li>بدء تشغيل مجموعة K8s باستخدام minikube</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>التحقق من حالة مجموعة K8s</li>
</ol>
<p>يمكنك التحقق من حالة مجموعة K8s المثبتة باستخدام الأمر التالي.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>تأكد من أنه يمكنك الوصول إلى مجموعة K8s عبر <code translate="no">kubectl</code>. إذا لم تكن قد قمت بتثبيت <code translate="no">kubectl</code> محليًا، فراجع <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">استخدام kubectl داخل minikube</a>.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">الخطوة التالية<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>إذا كانت الأجهزة والبرامج لديك تستوفي المتطلبات، فيمكنك:</p>
<ul>
<li><a href="/docs/ar/install_cluster-milvusoperator.md">تشغيل Milvus في Kubernetes باستخدام Milvus Operator</a></li>
<li><a href="/docs/ar/install_cluster-helm.md">تشغيل Milvus في Kubernetes باستخدام Helm</a></li>
</ul></li>
<li><p>راجع <a href="/docs/ar/system_configuration.md">«تكوين النظام»</a> لمعرفة المعلمات التي يمكنك ضبطها أثناء تثبيت Milvus.</p></li>
</ul>
