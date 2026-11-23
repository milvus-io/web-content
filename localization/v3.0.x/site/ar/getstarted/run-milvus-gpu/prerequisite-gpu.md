---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: >-
  تعرف على الاستعدادات اللازمة قبل تثبيت Milvus باستخدام وحدة معالجة الرسومات
  (GPU).
title: متطلبات تثبيت Milvus مع وحدة معالجة الرسومات (GPU)
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">متطلبات تثبيت Milvus مع وحدة معالجة الرسومات (GPU)<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>تسرد هذه الصفحة متطلبات الأجهزة والبرامج اللازمة لإعداد Milvus مع دعم وحدة معالجة الرسومات (GPU).</p>
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
    </button></h2><p>تم إنشاء صورة Milvus GPU <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> لأجهزة GPU ذات قدرات الحوسبة 7.0 أو 7.5 أو 8.0 أو 8.6 أو 9.0 أو 10.0 أو 12.0. يجب أن يتمتع جهاز GPU الخاص بك بإحدى قدرات الحوسبة هذه، أو بقدرة حوسبة أحدث يمكنها تشغيل التعليمات البرمجية المصممة لإحدى هذه القدرات، مثل 8.9 أو 12.1. لمزيد من التفاصيل، راجع <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/cuda-platform.html#binary-compatibility">التوافق الثنائي</a> <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/05-appendices/compute-capabilities.html#family-specific-features">والميزات الخاصة بالعائلة</a>.</p>
<p>للتحقق مما إذا كان جهاز GPU الخاص بك يفي بالمتطلبات، راجع <a href="https://developer.nvidia.com/cuda-gpus">«قدرة الحوسبة لوحدة معالجة الرسومات (GPU)</a> » على موقع مطوري NVIDIA.</p>
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
    </button></h2><p>يجب أن يعمل المضيف الخاص بك على أحد <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/supported-platforms.html">توزيعات Linux المدعومة من قبل NVIDIA Container Toolkit</a> وأن يكون برنامج تشغيل NVIDIA الخاص بجهاز GPU الخاص بك مثبتًا.</p>
<p>تستند صورة GPU Milvus <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> إلى CUDA 12.9 Update 1. ويتطلب إعداد « <code translate="no">NVIDIA_REQUIRE_CUDA</code> » الخاص بها <code translate="no">cuda&gt;=12.9</code> ، لذا يجب أن يدعم برنامج تشغيل NVIDIA CUDA 12.9 أو إصدارًا أحدث. بالنسبة لـ CUDA 12.9 Update 1، تذكر NVIDIA إصدار برنامج التشغيل 575.57.08 أو أحدث على نظام Linux x86_64. للاطلاع على إصدارات برامج التشغيل لكل إصدار من CUDA، راجع <a href="https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html#cuda-driver">ملاحظات إصدار مجموعة أدوات CUDA</a>.</p>
<p>يقبل هذا الإعداد أيضًا برامج التشغيل من الفروع 535 و550 و560 و565 و570 في بعض ماركات وحدات معالجة الرسومات (GPU)، ولكن ليس في وحدات معالجة الرسومات GeForce أو Titan. مع برامج التشغيل هذه، تعتمد الصورة على <a href="https://docs.nvidia.com/deploy/cuda-compatibility/forward-compatibility.html">التوافق الأمامي لـ CUDA،</a> والذي تدعمه NVIDIA فقط على وحدات معالجة الرسومات (GPU) الخاصة بمراكز بيانات NVIDIA، وبعض وحدات تخزين (SKU) بطاقات RTX المجهزة للخوادم (NGC Server Ready)، ولوحات Jetson. إذا لم يستوفِ برنامج التشغيل هذه المتطلبات، فإن NVIDIA Container Toolkit تُبلغ عن خطأ «لم يتم العثور على برنامج تشغيل متوافق مع CUDA» ( <code translate="no">unsatisfied condition</code> ) ولا تقوم بإعداد وحدة معالجة الرسومات (GPU) للحاوية.</p>
<p>بالنسبة لمستخدمي Ubuntu 22.04، يمكنكم تثبيت برنامج التشغيل باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-580 nvidia-utils-580</span>
<button class="copy-code-btn"></button></code></pre>
<p>لا تدعم وحدات معالجة الرسومات (GPUs) ذات القدرة الحاسوبية 10.0 أو 12.0 (Blackwell) سوى وحدات النواة المفتوحة لبرنامج تشغيل NVIDIA. بالنسبة لهذه وحدات معالجة الرسومات (GPUs)، قم بتثبيت <code translate="no">nvidia-headless-580-open</code> بدلاً من <code translate="no">nvidia-headless-580</code>. لا تدعم وحدات النواة المفتوحة وحدات معالجة الرسومات (GPUs) الأقدم من Turing (قدرة الحوسبة 7.5)، مثل Volta (7.0)، لذا احتفظ بـ <code translate="no">nvidia-headless-580</code> لتلك الوحدات.</p>
<p>بالنسبة لتوزيعات Linux الأخرى، راجع <a href="https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/index.html">دليل تثبيت برنامج تشغيل NVIDIA</a>.</p>
<p>يمكنك التحقق مما إذا كان برنامج التشغيل قد تم تثبيته بشكل صحيح عن طريق تشغيل الأمر التالي. يعرض الناتج إصدار برنامج التشغيل المثبت.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="NVIDIA-Container-Toolkit" class="common-anchor-header">مجموعة أدوات NVIDIA Container Toolkit<button data-href="#NVIDIA-Container-Toolkit" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتثبيت مجموعة أدوات حاويات NVIDIA باتباع الخطوات الخاصة بتوزيع Linux الخاص بك الواردة في <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">دليل تثبيت مجموعة أدوات حاويات NVIDIA</a>.</p>
<p>إذا قمت بتثبيت Milvus باستخدام Docker Compose، فقم بتكوين Docker لاستخدام NVIDIA Container Runtime، وأعد تشغيل برنامج Docker الخفي، ثم قم بتشغيل حمل عمل نموذجي للتحقق من أن الحاويات يمكنها الوصول إلى وحدة معالجة الرسومات (GPU):</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> nvidia-ctk runtime configure --runtime=docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker run --<span class="hljs-built_in">rm</span> --runtime=nvidia --gpus all ubuntu nvidia-smi</span>
<button class="copy-code-btn"></button></code></pre>
<p>يعمل الأمر الأخير على تشغيل <code translate="no">nvidia-smi</code> في حاوية ويعرض معلومات حول أجهزة وحدة معالجة الرسومات (GPU) الموجودة على المضيف. إذا قمت بتثبيت Milvus على Kubernetes، فقم بإعداد عقد عمل وحدة معالجة الرسومات (GPU) الخاصة بك كما هو موضح في الأسئلة الشائعة في نهاية هذه الصفحة بدلاً من ذلك.</p>
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
    </button></h2><p>تنطبق المتطلبات الواردة في هذا القسم والأسئلة الشائعة أدناه عند تثبيت Milvus مع دعم GPU على Kubernetes باستخدام Helm.</p>
<p>يُنصح بتشغيل مجموعة Kubernetes على أنظمة Linux.</p>
<ul>
<li>kubectl هي أداة سطر الأوامر الخاصة بـ Kubernetes. استخدم إصدارًا من kubectl لا يختلف عن إصدار الكتلة إلا في إصدار فرعي واحد. يساعد استخدام أحدث إصدار من kubectl على تجنب المشكلات غير المتوقعة.</li>
<li>يُعد minikube ضروريًا عند تشغيل مجموعة Kubernetes محليًّا. يتطلب minikube وجود Docker كأحد التبعيات. تأكد من تثبيت Docker قبل تثبيت Milvus باستخدام Helm. راجع <a href="https://docs.docker.com/get-docker">«الحصول على Docker»</a> لمزيد من المعلومات.</li>
</ul>
<table>
<thead>
<tr><th>نظام التشغيل</th><th>البرامج</th><th>ملاحظة</th></tr>
</thead>
<tbody>
<tr><td>أنظمة Linux</td><td><ul><li>Kubernetes 1.16 أو أحدث</li><li>kubectl</li><li>Helm 3.0.0 أو أحدث</li><li>minikube (لـ Milvus المستقل)</li><li>Docker 19.03 أو أحدث (لـ Milvus المستقل)</li></ul></td><td>انظر <a href="https://helm.sh/docs/">وثائق Helm</a> لمزيد من المعلومات.</td></tr>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">كيف يمكنني تشغيل مجموعة K8s محليًا لأغراض الاختبار؟<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
<p>انتقل إلى صفحة <a href="https://minikube.sigs.k8s.io/docs/start/">«البدء</a> »، وتحقق مما إذا كنت تستوفي الشروط المذكورة في قسم <strong>«ما ستحتاج إليه</strong> »، وانقر على الأزرار التي تصف النظام الأساسي الذي تستهدفه، وانسخ الأوامر لتنزيل الملف الثنائي وتثبيته.</p>
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
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">كيف يمكنني بدء تشغيل مجموعة K8s باستخدام عقد عمل GPU؟<button data-href="#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا كنت تفضل استخدام عقد عمل مزودة بوحدة معالجة رسومات (GPU)، فيمكنك اتباع الخطوات التالية لإنشاء مجموعة K8s مزودة بعقد عمل مزودة بوحدة معالجة رسومات (GPU). نوصي بتثبيت Milvus على مجموعة K8s مزودة بعقد عمل مزودة بوحدة معالجة رسومات (GPU) واستخدام فئة التخزين الافتراضية المُوفرة.</p>
<ol>
<li>تحضير العقد العاملة المزودة بوحدة معالجة الرسومات (GPU)</li>
</ol>
<p>لاستخدام العقد العاملة المزودة بوحدة معالجة الرسومات (GPU)، اتبع الخطوات الواردة في <a href="https://github.com/NVIDIA/k8s-device-plugin#preparing-your-gpu-nodes">«تحضير عقد GPU الخاصة بك</a>».</p>
<ol start="2">
<li>تمكين دعم GPU على K8s</li>
</ol>
<p>قم بنشر المكون الإضافي <strong>nvidia-device-plugin</strong> باستخدام Helm باتباع <a href="https://github.com/NVIDIA/k8s-device-plugin#deployment-via-helm">هذه الخطوات</a>.</p>
<p>بعد الإعداد، اعرض موارد GPU باستخدام الأمر التالي. استبدل <code translate="no">&lt;gpu-worker-node&gt;</code> باسم العقدة الفعلي.</p>
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
