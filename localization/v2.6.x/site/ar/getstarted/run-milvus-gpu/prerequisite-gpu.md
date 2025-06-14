---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: تعرف على الاستعدادات اللازمة قبل تثبيت Milvus مع وحدة معالجة الرسومات.
title: متطلبات تثبيت Milvus مع وحدة معالجة الرسومات
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">متطلبات تثبيت Milvus مع وحدة معالجة الرسومات<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>تسرد هذه الصفحة متطلبات الأجهزة والبرامج لإعداد Milvus مع دعم وحدة معالجة الرسومات.</p>
<h2 id="Compute-capability" class="common-anchor-header">قدرة الحوسبة<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>يجب أن تكون قدرة الحوسبة لجهاز وحدة معالجة الرسومات الخاصة بك واحدة مما يلي: 6.0, 7.0, 7.5, 8.0, 8.6, 9.0.</p>
<p>للتحقق مما إذا كان جهاز وحدة معالجة الرسومات الخاص بك يفي بالمتطلبات، تحقق من <a href="https://developer.nvidia.com/cuda-gpus">قدرة الحوسبة</a> لوحدة معالجة الرسومات <a href="https://developer.nvidia.com/cuda-gpus">الخاصة بك</a> على موقع مطور NVIDIA.</p>
<h2 id="NVIDIA-driver" class="common-anchor-header">برنامج تشغيل NVIDIA<button data-href="#NVIDIA-driver" class="anchor-icon" translate="no">
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
    </button></h2><p>يجب أن يكون برنامج تشغيل NVIDIA لجهاز وحدة معالجة الرسومات الخاص بك على إحدى <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">توزيعات Linux المدعومة،</a> وأن تكون مجموعة أدوات NVIDIA Container Toolkit مثبتة باتباع <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">هذا الدليل</a>.</p>
<p>بالنسبة لمستخدمي Ubuntu 22.04، يمكنك تثبيت برنامج التشغيل ومجموعة أدوات الحاوية باستخدام الأوامر التالية:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545</span>
<button class="copy-code-btn"></button></code></pre>
<p>لمستخدمي أنظمة التشغيل الأخرى، راجع <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian">دليل التثبيت الرسمي</a>.</p>
<p>يمكنك التحقق من تثبيت برنامج التشغيل بشكل صحيح من خلال تشغيل الأمر التالي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
version:        545.29.06
<button class="copy-code-btn"></button></code></pre>
<p>يوصى باستخدام برامج التشغيل من الإصدار 545 وما فوق.</p>
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
<ul>
<li>kubectl هي أداة سطر الأوامر لـ Kubernetes. استخدم إصدار kubectl الذي يقع ضمن فرق إصدار ثانوي واحد من مجموعتك. يساعد استخدام أحدث إصدار من kubectl على تجنب المشاكل غير المتوقعة.</li>
<li>يلزم استخدام minikube عند تشغيل مجموعة Kubernetes محليًا. يتطلب minikube Docker كتابع. تأكد من تثبيت Docker قبل تثبيت Milvus باستخدام Helm. راجع <a href="https://docs.docker.com/get-docker">الحصول على Docker</a> لمزيد من المعلومات.</li>
</ul>
<table>
<thead>
<tr><th>نظام التشغيل</th><th>البرمجيات</th><th>ملاحظة</th></tr>
</thead>
<tbody>
<tr><td>منصات لينكس</td><td><ul><li>Kubernetes 1.16 أو أحدث</li><li>كوبكتل</li><li>هيلم 3.0.0 أو أحدث</li><li>مينيكيوب صغير (لميلفوس مستقل)</li><li>Docker 19.03 أو أحدث (لميلفوس مستقل)</li></ul></td><td>راجع <a href="https://helm.sh/docs/">مستندات Helm</a> لمزيد من المعلومات.</td></tr>
</tbody>
</table>
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
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>تحقق من حالة مجموعة K8s العنقودية</li>
</ol>
<p>يمكنك التحقق من حالة مجموعة K8s المثبتة باستخدام الأمر التالي.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>تأكد من أنه يمكنك الوصول إلى مجموعة K8s العنقودية عبر <code translate="no">kubectl</code>. إذا لم تكن قد قمت بتثبيت <code translate="no">kubectl</code> محليًا، راجع <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">استخدام kubectl داخل minikube</a>.</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">كيف يمكنني بدء تشغيل مجموعة K8s مع عقد عامل GPU؟</h3><p>إذا كنت تفضل استخدام العقد العاملة الممكّنة لوحدة معالجة الرسومات، يمكنك اتباع الخطوات أدناه لإنشاء مجموعة K8s مع عقد عاملة بوحدة معالجة الرسومات. نوصي بتثبيت Milvus على مجموعة K8s مع عقد عامل GPU واستخدام فئة التخزين الافتراضية الموفرة.</p>
<ol>
<li>إعداد العقد العاملة بوحدة معالجة الرسومات</li>
</ol>
<p>لاستخدام العُقد العاملة الممكّنة لوحدة معالجة الرسومات GPU، اتبع الخطوات في <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes">إعداد عُ</a>قد <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes">وحدة معالجة الرسومات</a>.</p>
<ol start="2">
<li>تمكين دعم GPU على K8s</li>
</ol>
<p>نشر <strong>البرنامج المساعد nvidia-devidia-device-plugin</strong> مع Helm باتباع <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm">الخطوات التالية</a>.</p>
<p>بعد الإعداد، اعرض موارد وحدة معالجة الرسومات باستخدام الأمر التالي. استبدل <code translate="no">&lt;gpu-worker-node&gt;</code> باسم العقدة الفعلية.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">  $ </span><span class="language-bash">kubectl describe node &lt;gpu-worker-node&gt;</span>

  Capacity:
  ...
  nvidia.com/gpu:     4
  ...
  Allocatable:
  ...
  nvidia.com/gpu:     4
  ...
  ```  
<button class="copy-code-btn"></button></code></pre>
