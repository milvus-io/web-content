---
id: install_cluster-helm.md
label: Helm
related_key: Kubernetes
summary: تعرف على كيفية تثبيت مجموعة Milvus العنقودية على Kubernetes.
title: تثبيت مجموعة ميلفوس العنقودية مع هيلم
---
<h1 id="Run-Milvus-in-Kubernetes-with-Helm" class="common-anchor-header">تشغيل Milvus في Kubernetes باستخدام Helm<button data-href="#Run-Milvus-in-Kubernetes-with-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>توضح هذه الصفحة كيفية بدء تشغيل مثيل Milvus في Kubernetes باستخدام <a href="https://github.com/zilliztech/milvus-helm">مخططات Milvus Helm</a>.</p>
<h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>يستخدم Helm تنسيق تغليف يسمى المخططات. المخطط عبارة عن مجموعة من الملفات التي تصف مجموعة ذات صلة من موارد Kubernetes. يوفر Milvus مجموعة من المخططات لمساعدتك في نشر تبعيات ومكونات Milvus.</p>
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
<li><p><a href="https://helm.sh/docs/intro/install/">تثبيت Helm CLI</a>.</p></li>
<li><p><a href="/docs/ar/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">إنشاء مجموعة K8s</a>.</p></li>
<li><p>تثبيت <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. يمكنك التحقق من StorageClass المثبت على النحو التالي.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تحقق من <a href="/docs/ar/prerequisite-helm.md">متطلبات الأجهزة والبرامج</a> قبل التثبيت.</p></li>
<li><p>قبل تثبيت Milvus، يوصى باستخدام <a href="https://milvus.io/tools/sizing">أداة تحجيم Milvus</a> لتقدير متطلبات الأجهزة بناءً على حجم بياناتك. يساعد ذلك على ضمان الأداء الأمثل وتخصيص الموارد لتثبيت Milvus الخاص بك.</p></li>
</ul>
<div class="alert note">
<p>إذا واجهتك أي مشاكل في سحب الصورة، اتصل بنا على <a href="mailto:community@zilliz.com">community@zilliz.com</a> مع تفاصيل المشكلة، وسنقدم لك الدعم اللازم.</p>
</div>
<h2 id="Install-Milvus-Helm-Chart" class="common-anchor-header">تثبيت مخطط ميلفوس هيلم<button data-href="#Install-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل تثبيت مخططات Milvus Helm Charts، تحتاج إلى إضافة مستودع Milvus Helm.</p>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>تمت أرشفة ريبو Milvus Helm Charts على <code translate="no">https://github.com/milvus-io/milvus-helm</code> ويمكنك الحصول على المزيد من التحديثات من <code translate="no">https://github.com/zilliztech/milvus-helm</code> على النحو التالي:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>لا يزال الريبو المؤرشف متاحًا للمخططات حتى الإصدار 4.0.31. للإصدارات الأحدث، استخدم الريبو الجديد بدلاً من ذلك.</p>
</div>
<p>ثم قم بجلب مخططات Milvus من المستودع على النحو التالي:</p>
<pre><code translate="no">$ helm repo update
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك دائمًا تشغيل هذا الأمر لجلب أحدث مخططات Milvus Helm.</p>
<h2 id="Online-install" class="common-anchor-header">التثبيت عبر الإنترنت<button data-href="#Online-install" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. نشر مجموعة Milvus</h3><p>بمجرد تثبيت مخطط Helm، يمكنك بدء تشغيل Milvus على Kubernetes. سيرشدك هذا القسم إلى خطوات بدء تشغيل Milvus.</p>
<pre><code translate="no" class="language-shell">$ helm install my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>في الأمر أعلاه، <code translate="no">my-release</code> هو اسم الإصدار، و <code translate="no">milvus/milvus</code> هو مستودع المخطط المثبت محليًا. لاستخدام اسم مختلف، استبدل <code translate="no">my-release</code> بالاسم الذي تراه مناسبًا.</p>
<p>ينشر الأمر أعلاه مجموعة Milvus مع مكوناتها وتوابعها باستخدام التكوينات الافتراضية. لتخصيص هذه الإعدادات، نوصيك باستخدام <a href="https://milvus.io/tools/sizing">أداة Milvus Sizing Tool</a> لضبط التكوينات بناءً على حجم بياناتك الفعلي ثم تنزيل ملف YAML المقابل. لمعرفة المزيد حول معلمات التكوين، راجع <a href="https://milvus.io/docs/system_configuration.md">قائمة مراجعة تكوينات نظام Milvus</a>.</p>
<div class="alert note">
  <ul>
    <li>يجب أن يحتوي اسم الإصدار على أحرف وأرقام وشرطات فقط. النقاط غير مسموح بها في اسم الإصدار.</li>
    <li>يقوم سطر الأوامر الافتراضي بتثبيت الإصدار العنقودي من Milvus أثناء تثبيت Milvus مع Helm. هناك حاجة إلى مزيد من الإعدادات أثناء تثبيت Milvus مستقل.</li>
    <li>وفقًا <a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">لدليل ترحيل واجهة برمجة التطبيقات المهملة لـ Kubernetes،</a> لم يعد يتم تقديم إصدار واجهة برمجة التطبيقات <b>السياسة/إصدار v1beta1</b> من PodDisruptionBudget اعتبارًا من الإصدار v1.25. يُقترح عليك ترحيل البيانات وعملاء واجهة برمجة التطبيقات لاستخدام إصدار واجهة برمجة تطبيقات <b>السياسة/الإصدار الأول</b> بدلاً من ذلك. <br/>كحل بديل للمستخدمين الذين لا يزالون يستخدمون إصدار <b>السياسة/ الإصدار الأول</b> من واجهة برمجة التطبيقات من PodDisruptionBudget على Kubernetes v1.25 والإصدارات الأحدث، يمكنك بدلاً من ذلك تشغيل الأمر التالي لتثبيت Milvus:<br/> <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
    <li>انظر <a href="https://artifacthub.io/packages/helm/milvus/milvus">مخطط Milvus Helm</a> و <a href="https://helm.sh/docs/">Helm</a> لمزيد من المعلومات.</li>
  </ul>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. تحقق من حالة مجموعة ميلفوس</h3><p>قم بتشغيل الأمر التالي للتحقق من حالة جميع الكبسولات في مجموعة ميلفوس الخاصة بك.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد تشغيل جميع الكبسولات، يجب أن تكون مخرجات الأمر أعلاه مشابهة لما يلي:</p>
<pre><code translate="no">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                1/1    Running   0        3m23s
my-release-etcd-1                                1/1    Running   0        3m23s
my-release-etcd-2                                1/1    Running   0        3m23s
my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        3m23s
my-release-milvus-indexnode-5c5f7b5bd9-l8hjg     1/1    Running   0        3m24s
my-release-milvus-mixcoord-7fb9488465-dmbbj      1/1    Running   0        3m23s
my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        3m24s
my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        3m24s
my-release-minio-0                               1/1    Running   0        3m23s
my-release-minio-1                               1/1    Running   0        3m23s
my-release-minio-2                               1/1    Running   0        3m23s
my-release-minio-3                               1/1    Running   0        3m23s
my-release-pulsar-autorecovery-86f5dbdf77-lchpc  1/1    Running   0        3m24s
my-release-pulsar-bookkeeper-0                   1/1    Running   0        3m23s
my-release-pulsar-bookkeeper-1                   1/1    Running   0        98s
my-release-pulsar-broker-556ff89d4c-2m29m        1/1    Running   0        3m23s
my-release-pulsar-proxy-6fbd75db75-nhg4v         1/1    Running   0        3m23s
my-release-pulsar-zookeeper-0                    1/1    Running   0        3m23s
my-release-pulsar-zookeeper-metadata-98zbr       0/1   Completed  0        3m24s
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك أيضًا الوصول إلى Milvus WebUI على <code translate="no">http://127.0.0.1:9091/webui/</code> لمعرفة المزيد عن مثيل Milvus الخاص بك. للحصول على التفاصيل، ارجع إلى <a href="/docs/ar/milvus-webui.md">Milvus WebUI</a>.</p>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. إعادة توجيه منفذ محلي إلى ميلفوس</h3><p>قم بتشغيل الأمر التالي للحصول على المنفذ الذي تخدم فيه مجموعة ميلفوس الخاصة بك.</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-6b</span>d7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>يظهر الإخراج أن مثيل Milvus يعمل على المنفذ الافتراضي <strong>19530</strong>.</p>
<div class="alert note">
<p>إذا كنت قد قمت بنشر Milvus في الوضع المستقل، قم بتغيير اسم الكبسولة من <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> إلى <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code>.</p>
</div>
<p>ثم، قم بتشغيل الأمر التالي لإعادة توجيه منفذ محلي إلى المنفذ الذي يخدم فيه ميلفوس.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>اختياريًا، يمكنك استخدام <code translate="no">:19530</code> بدلًا من <code translate="no">27017:19530</code> في الأمر أعلاه للسماح لـ <code translate="no">kubectl</code> بتخصيص منفذ محلي لك حتى لا تضطر إلى إدارة تعارضات المنافذ.</p>
<p>بشكل افتراضي، يستمع منفذ إعادة توجيه المنفذ الخاص بـ kubectl بشكل افتراضي فقط على <code translate="no">localhost</code>. استخدم العلامة <code translate="no">address</code> إذا كنت تريد أن يستمع ميلفوس على عناوين IP المحددة أو جميع عناوين IP. الأمر التالي يجعل أمر إعادة توجيه المنفذ يستمع على جميع عناوين IP على الجهاز المضيف.</p>
<h2 id="Access-Milvus-WebUI" class="common-anchor-header">الوصول إلى Milvus WebUI<button data-href="#Access-Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h2><p>يأتي Milvus مزودًا بأداة واجهة مستخدم رسومية مدمجة تسمى Milvus WebUI والتي يمكنك الوصول إليها من خلال متصفحك. تعزز واجهة مستخدم Milvus WebUI إمكانية مراقبة النظام بواجهة بسيطة وبديهية. يمكنك استخدام واجهة مستخدم ويب Milvus Web UI لمراقبة الإحصائيات والمقاييس الخاصة بمكونات وتبعيات Milvus، والتحقق من تفاصيل قاعدة البيانات والتجميع، وسرد تكوينات Milvus المفصلة. للحصول على تفاصيل حول واجهة مستخدم ميلفوس ويب، راجع واجهة مستخدم ميلفوس <a href="/docs/ar/milvus-webui.md">ويب</a></p>
<p>لتمكين الوصول إلى واجهة مستخدم ويب Milvus Web UI، تحتاج إلى إعادة توجيه منفذ إلى منفذ محلي.</p>
<pre><code translate="no" class="language-shell">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27018</span>:<span class="hljs-number">9091</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27018</span> -&gt; <span class="hljs-number">9091</span>
<button class="copy-code-btn"></button></code></pre>
<p>الآن، يمكنك الوصول إلى واجهة مستخدم ويب Milvus Web UI على <code translate="no">http://localhost:27018</code>.</p>
<h2 id="Offline-install" class="common-anchor-header">التثبيت دون اتصال<button data-href="#Offline-install" class="anchor-icon" translate="no">
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
    </button></h2><p>إذا كنت في بيئة مقيدة بالشبكة، اتبع الإجراء الوارد في هذا القسم لبدء مجموعة Milvus.</p>
<h3 id="1-Get-Milvus-manifest" class="common-anchor-header">1. احصل على بيان ميلفوس</h3><p>قم بتشغيل الأمر التالي للحصول على بيان Milvus.</p>
<pre><code translate="no" class="language-shell">$ helm template my-release milvus/milvus &gt; milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>يقوم الأمر أعلاه بعرض قوالب المخططات لمجموعة Milvus ويحفظ المخرجات في ملف بيان باسم <code translate="no">milvus_manifest.yaml</code>. باستخدام هذا البيان، يمكنك تثبيت مجموعة Milvus مع مكوناتها وتوابعها في كبسولات منفصلة.</p>
<div class="alert note">
<ul>
<li>لتثبيت مثيل Milvus في الوضع المستقل حيث يتم تضمين جميع مكونات Milvus في كبسولة واحدة، يجب عليك تشغيل <code translate="no">helm template my-release --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsar.enabled=false milvus/milvus &gt; milvus_manifest.yaml</code> بدلاً من ذلك لعرض قوالب البيان لمثيل Milvus في الوضع المستقل.</li>
<li>لتغيير تكوينات Milvus، قم بتحميل قالب <a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml"><code translate="no">value.yaml</code></a> القالب، ضع الإعدادات التي تريدها فيه، واستخدم <code translate="no">helm template -f values.yaml my-release milvus/milvus &gt; milvus_manifest.yaml</code> لعرض البيان وفقًا لذلك.</li>
</ul>
</div>
<h3 id="2-Download-image-pulling-script" class="common-anchor-header">2. تنزيل البرنامج النصي لسحب الصور</h3><p>تم تطوير البرنامج النصي لسحب الصور بلغة Python. يجب عليك تنزيل البرنامج النصي مع تبعياته في ملف <code translate="no">requirement.txt</code>.</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt</span>
$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Pull-and-save-images" class="common-anchor-header">3. سحب الصور وحفظها</h3><p>قم بتشغيل الأمر التالي لسحب الصور المطلوبة وحفظها.</p>
<pre><code translate="no" class="language-shell">$ pip3 install -r requirements.txt
$ python3 save_image.py --manifest milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>يتم سحب الصور في مجلد فرعي باسم <code translate="no">images</code> في الدليل الحالي.</p>
<h3 id="4-Load-images" class="common-anchor-header">4. تحميل الصور</h3><p>يمكنك الآن تحميل الصور إلى المضيفين في البيئة المقيدة بالشبكة على النحو التالي:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> $(find . -<span class="hljs-built_in">type</span> f -name <span class="hljs-string">&quot;*.tar.gz&quot;</span>) ; <span class="hljs-keyword">do</span> gunzip -c <span class="hljs-variable">$image</span> | docker load; <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="5-Deploy-Milvus" class="common-anchor-header">5. نشر ميلفوس</h3><pre><code translate="no" class="language-shell">$ kubectl apply -f milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>حتى الآن، يمكنك اتباع الخطوتين <a href="#2-Check-Milvus-cluster-status">2</a> <a href="#3-Forward-a-local-port-to-Milvus">و3</a> من التثبيت عبر الإنترنت للتحقق من حالة المجموعة وإعادة توجيه منفذ محلي إلى Milvus.</p>
<h2 id="Upgrade-running-Milvus-cluster" class="common-anchor-header">ترقية مجموعة ميلفوس قيد التشغيل<button data-href="#Upgrade-running-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتشغيل الأمر التالي لترقية مجموعة Milvus قيد التشغيل إلى أحدث إصدار:</p>
<pre><code translate="no" class="language-shell">$ helm repo update
$ helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">إلغاء تثبيت ميلفوس<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتشغيل الأمر التالي لإلغاء تثبيت Milvus.</p>
<pre><code translate="no" class="language-bash">$ helm uninstall my-release
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>بعد تثبيت Milvus في Docker، يمكنك:</p>
<ul>
<li><p>التحقق من <a href="/docs/ar/quickstart.md">Hello Milvus</a> لمعرفة ما يمكن لـ Milvus القيام به.</p></li>
<li><p>تعلم العمليات الأساسية لميلفوس:</p>
<ul>
<li><a href="/docs/ar/manage_databases.md">إدارة قواعد البيانات</a></li>
<li><a href="/docs/ar/manage-collections.md">إدارة المجموعات</a></li>
<li><a href="/docs/ar/manage-partitions.md">إدارة الأقسام</a></li>
<li><a href="/docs/ar/insert-update-delete.md">إدراج وإدراج وحذف وإدراج وحذف</a></li>
<li><a href="/docs/ar/single-vector-search.md">البحث في متجه واحد</a></li>
<li><a href="/docs/ar/multi-vector-search.md">البحث الهجين</a></li>
</ul></li>
<li><p><a href="/docs/ar/upgrade_milvus_cluster-helm.md">ترقية Milvus باستخدام مخطط Helm</a>.</p></li>
<li><p><a href="/docs/ar/scaleout.md">توسيع نطاق مجموعة ميلفوس الخاصة بك</a>.</p></li>
<li><p>نشر مجموعة ميلفوس العنقودية الخاصة بك على السحب:</p>
<ul>
<li><a href="/docs/ar/eks.md">أمازون EKS</a></li>
<li><a href="/docs/ar/gcp.md">جوجل كلاود</a></li>
<li><a href="/docs/ar/azure.md">مايكروسوفت أزور</a></li>
</ul></li>
<li><p>استكشف <a href="/docs/ar/milvus-webui.md">واجهة Milvus WebUI،</a> وهي واجهة ويب سهلة الاستخدام لمراقبة وإدارة Milvus.</p></li>
<li><p>استكشف Milvus <a href="/docs/ar/milvus_backup_overview.md">Backup،</a> وهي أداة مفتوحة المصدر للنسخ الاحتياطية لبيانات Milvus.</p></li>
<li><p>استكشف <a href="/docs/ar/birdwatcher_overview.md">Birdwatcher،</a> وهي أداة مفتوحة المصدر لتصحيح أخطاء ميلفوس وتحديثات التكوين الديناميكية.</p></li>
<li><p>استكشف <a href="https://milvus.io/docs/attu.md">Attu،</a> وهي أداة مفتوحة المصدر لواجهة المستخدم الرسومية لإدارة Milvus بسهولة.</p></li>
<li><p><a href="/docs/ar/monitor.md">راقب ميلفوس باستخدام بروميثيوس</a>.</p></li>
</ul>
