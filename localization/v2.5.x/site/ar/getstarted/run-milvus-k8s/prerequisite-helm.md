---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: تعرف على الاستعدادات اللازمة قبل تثبيت Milvus مع Helm.
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
    </button></h1><p>تسرد هذه الصفحة متطلبات الأجهزة والبرمجيات لتشغيل ميلفوس وتشغيله.</p>
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
<tr><th>المكونات</th><th>المتطلبات</th><th>التوصية</th><th>ملاحظة</th></tr>
</thead>
<tbody>
<tr><td>وحدة المعالجة المركزية</td><td><ul><li>وحدة معالجة مركزية Intel من الجيل الثاني أو أعلى</li><li>أبل سيليكون</li></ul></td><td><ul><li>مستقل: 4 نواة أو أكثر</li><li>عنقودي: 8 نواة أو أكثر</li></ul></td><td></td></tr>
<tr><td>مجموعة تعليمات وحدة المعالجة المركزية</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>يتطلب البحث عن تشابه المتجهات وإنشاء الفهرس داخل Milvus دعم وحدة المعالجة المركزية لمجموعات امتدادات التعليمات الأحادية والبيانات المتعددة (SIMD). تأكد من أن وحدة المعالجة المركزية تدعم واحدة على الأقل من امتدادات SIMD المدرجة. راجع <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">وحدات المعالجة المركزية مع AVX</a> لمزيد من المعلومات.</td></tr>
<tr><td>ذاكرة الوصول العشوائي</td><td><ul><li>مستقل: 8G</li><li>المجموعة العنقودية: 32G</li></ul></td><td><ul><li>مستقل: 16G</li><li>الكتلة: 128G</li></ul></td><td>يعتمد حجم ذاكرة الوصول العشوائي على حجم البيانات.</td></tr>
<tr><td>القرص الصلب</td><td>محرك SATA 3.0 SSD أو CloudStorage</td><td>NVMe SSD أو أعلى</td><td>يعتمد حجم القرص الصلب على حجم البيانات.</td></tr>
</tbody>
</table>
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
    </button></h2><p>يوصى بتشغيل مجموعة Kubernetes على منصات Linux.</p>
<p>kubectl هي أداة سطر الأوامر لـ Kubernetes. استخدم إصدار kubectl الذي يقع ضمن فرق إصدار ثانوي واحد من مجموعتك. يساعد استخدام أحدث إصدار من kubectl على تجنب المشاكل غير المتوقعة.</p>
<p>يلزم استخدام minikube عند تشغيل مجموعة Kubernetes محليًا. يتطلب minikube Docker كتابع. تأكد من تثبيت Docker قبل تثبيت Milvus باستخدام Helm. راجع <a href="https://docs.docker.com/get-docker">الحصول على Docker</a> لمزيد من المعلومات.</p>
<table>
<thead>
<tr><th>نظام التشغيل</th><th>البرمجيات</th><th>ملاحظة</th></tr>
</thead>
<tbody>
<tr><td>منصات لينكس</td><td><ul><li>Kubernetes 1.16 أو أحدث</li><li>كوبكتل</li><li>هيلم 3.0.0 أو أحدث</li><li>مينيكيوب صغير (لميلفوس مستقل)</li><li>Docker 19.03 أو أحدث (لميلفوس مستقل)</li></ul></td><td>انظر <a href="https://helm.sh/docs/">مستندات Helm</a> لمزيد من المعلومات.</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>البرمجيات</th><th>الإصدار</th><th>ملاحظة</th></tr>
</thead>
<tbody>
<tr><td>إلخd</td><td>3.5.0</td><td>انظر <a href="#Additional-disk-requirements">متطلبات القرص الإضافية</a>.</td></tr>
<tr><td>مينيو</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>بولسار</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">متطلبات القرص الإضافية</h3><p>أداء القرص أمر بالغ الأهمية لـ etcd. يوصى بشدة باستخدام أقراص NVMe SSD المحلية. قد تتسبب استجابة القرص الأبطأ في إجراء انتخابات متكررة للمجموعة مما سيؤدي في النهاية إلى تدهور خدمة إلخd.</p>
<p>لاختبار ما إذا كان قرصك مؤهلاً، استخدم <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>من الناحية المثالية، يجب أن يصل القرص الخاص بك إلى أكثر من 500 IOPS وأقل من 10 مللي ثانية لنسبة 99% من زمن انتقال المزامنة. اقرأ <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">مستندات</a> etcd لمزيد من المتطلبات التفصيلية.</p>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">كيف يمكنني بدء تشغيل مجموعة K8s محليًا لأغراض الاختبار؟</h3><p>يمكنك استخدام أدوات مثل <a href="https://minikube.sigs.k8s.io/docs/">minikube</a> و <a href="https://kind.sigs.k8s.io/">kind</a> و <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> لإعداد مجموعة Kubernetes محليًا بسرعة. يستخدم الإجراء التالي minikube كمثال.</p>
<ol>
<li>تنزيل الميني كيوب</li>
</ol>
<p>انتقل إلى صفحة <a href="https://minikube.sigs.k8s.io/docs/start/">البدء،</a> وتحقق مما إذا كنت قد استوفيت الشروط المدرجة في قسم <strong>ما ستحتاجه،</strong> وانقر على الأزرار التي تصف منصتك المستهدفة، وانسخ الأوامر لتنزيل وتثبيت البرنامج الثنائي.</p>
<ol start="2">
<li>ابدأ تشغيل مجموعة K8s باستخدام minikube</li>
</ol>
<pre><code translate="no" class="language-shell">$ minikube start
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>تحقق من حالة مجموعة K8s العنقودية</li>
</ol>
<p>يمكنك التحقق من حالة مجموعة K8s المثبتة باستخدام الأمر التالي.</p>
<pre><code translate="no" class="language-shell">$ kubectl cluster-info
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>تأكد من أنه يمكنك الوصول إلى مجموعة K8s العنقودية عبر <code translate="no">kubectl</code>. إذا لم تكن قد قمت بتثبيت <code translate="no">kubectl</code> محليًا، راجع <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">استخدام kubectl داخل minikube</a>.</p>
</div>
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
<li><p>إذا كانت أجهزتك وبرامجك تفي بالمتطلبات، يمكنك</p>
<ul>
<li><a href="/docs/ar/install_cluster-milvusoperator.md">تشغيل ميلفوس في كوبرنتس باستخدام مشغل ميلفوس</a></li>
<li><a href="/docs/ar/install_cluster-helm.md">تشغيل ميلفوس في كيوبيرنتس باستخدام Helm</a></li>
</ul></li>
<li><p>راجع <a href="/docs/ar/system_configuration.md">تكوين النظام</a> لمعرفة المعلمات التي يمكنك تعيينها أثناء تثبيت ميلفوس.</p></li>
</ul>
