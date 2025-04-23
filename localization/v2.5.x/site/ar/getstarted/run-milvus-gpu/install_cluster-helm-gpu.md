---
id: install_cluster-helm-gpu.md
label: Cluster (Helm)
related_key: Kubernetes
summary: تعرف على كيفية تثبيت مجموعة Milvus العنقودية على Kubernetes.
title: تشغيل Milvus مع دعم وحدة معالجة الرسومات باستخدام مخطط Helm
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="common-anchor-header">تشغيل Milvus مع دعم وحدة معالجة الرسومات باستخدام مخطط Helm<button data-href="#Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>توضح هذه الصفحة كيفية بدء تشغيل مثيل Milvus مع دعم وحدة معالجة الرسومات باستخدام مخطط Helm.</p>
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
    </button></h2><p>يستخدم Helm تنسيق تغليف يسمى المخططات. المخطط هو مجموعة من الملفات التي تصف مجموعة ذات صلة من موارد Kubernetes. يوفر Milvus مجموعة من المخططات لمساعدتك في نشر تبعيات ومكونات Milvus. إن <a href="https://artifacthub.io/packages/helm/milvus-helm/milvus">مخطط Milvus Helm Chart</a> هو حل يقوم بتمهيد نشر Milvus على مجموعة Kubernetes (K8s) باستخدام مدير الحزم Helm.</p>
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
<li><p><a href="/docs/ar/prerequisite-gpu.md#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes">إنشاء مجموعة K8s مع عقد عامل GPU</a>.</p></li>
<li><p>تثبيت <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. يمكنك التحقق من StorageClass المثبت على النحو التالي.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تحقق من <a href="/docs/ar/prerequisite-gpu.md">متطلبات الأجهزة والبرامج</a> قبل التثبيت.</p></li>
</ul>
<div class="alert note">
<p>إذا واجهت أي مشاكل في سحب الصورة، اتصل بنا على <a href="mailto:community@zilliz.com">community@zilliz.com</a> مع تفاصيل حول المشكلة، وسنقدم لك الدعم اللازم.</p>
</div>
<h2 id="Install-Helm-Chart-for-Milvus" class="common-anchor-header">تثبيت مخطط Helm لـ Milvus<button data-href="#Install-Helm-Chart-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Helm هو مدير حزم K8s الذي يمكن أن يساعدك في نشر Milvus بسرعة.</p>
<ol>
<li>إضافة مستودع Milvus Helm.</li>
</ol>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>تمت أرشفة الريبو الخاص بـ Milvus Helm Charts على <code translate="no">https://milvus-io.github.io/milvus-helm/</code> ويمكنك الحصول على المزيد من التحديثات من <code translate="no">https://zilliztech.github.io/milvus-helm/</code> على النحو التالي:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-meta prompt_"># </span><span class="language-bash">upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>لا يزال الريبو المؤرشف متاحًا للمخططات حتى الإصدار 4.0.31. للإصدارات الأحدث، استخدم الريبو الجديد بدلاً من ذلك.</p>
</div>
<ol start="2">
<li>تحديث الرسوم البيانية محليًا.</li>
</ol>
<pre><code translate="no"><span class="hljs-variable">$ </span>helm repo update
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Milvus" class="common-anchor-header">ابدأ تشغيل ميلفوس<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد تثبيت مخطط Helm، يمكنك بدء تشغيل Milvus على Kubernetes. في هذا القسم، سنرشدك في هذا القسم إلى خطوات بدء تشغيل Milvus مع دعم وحدة معالجة الرسومات.</p>
<p>يجب عليك بدء تشغيل Milvus مع Helm من خلال تحديد اسم الإصدار والمخطط والمعلمات التي تتوقع تغييرها. في هذا الدليل، نستخدم <code translate="no">my-release</code> كاسم الإصدار. لاستخدام اسم إصدار مختلف، استبدل <code translate="no">my-release</code> في الأوامر التالية بالاسم الذي تستخدمه.</p>
<p>يسمح لك Milvus بتعيين جهاز واحد أو أكثر من أجهزة وحدة معالجة الرسومات إلى Milvus.</p>
<h3 id="1-Assign-a-single-GPU-device" class="common-anchor-header">1. تعيين جهاز وحدة معالجة رسومات واحد</h3><p>يسمح لك Milvus مع دعم وحدة معالجة الرسومات بتعيين جهاز واحد أو أكثر من أجهزة وحدة معالجة الرسومات.</p>
<ul>
<li><p>مجموعة Milvus العنقودية</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
indexNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ميلفوس مستقل</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
standalone:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Assign-multiple-GPU-devices" class="common-anchor-header">2. تعيين أجهزة GPU متعددة لوحدة معالجة الرسومات</h3><p>بالإضافة إلى جهاز GPU واحد، يمكنك أيضاً تعيين أجهزة GPU متعددة إلى Milvus.</p>
<ul>
<li><p>مجموعة ميلفوس العنقودية</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
indexNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>في التهيئة أعلاه، تشترك عقدة الفهرس وعقدة الاستعلام في وحدتي معالجة رسومات. لتعيين وحدتي GPU مختلفتين لوحدتي GPU إلى عقدة الفهرس وعقدة الاستعلام، يمكنك تعديل التكوين وفقًا لذلك من خلال تعيين <code translate="no">extraEnv</code> في ملف التكوين على النحو التالي:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
indexNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;0&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre>
  <div class="alert note">
    <ul>
      <li>يجب أن يحتوي اسم الإصدار على أحرف وأرقام وشرطات فقط. غير مسموح بالنقاط في اسم الإصدار.</li>
      <li>يقوم سطر الأوامر الافتراضي بتثبيت الإصدار العنقودي من Milvus أثناء تثبيت Milvus مع Helm. هناك حاجة إلى مزيد من الإعدادات أثناء تثبيت Milvus مستقل.</li>
      <li>وفقًا <a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">لدليل ترحيل واجهة برمجة التطبيقات المهملة من Kuberenetes،</a> لم يعد يتم تقديم إصدار واجهة برمجة التطبيقات <b>Policy/v1beta1</b> من PodDisruptionBudget اعتبارًا من الإصدار v1.25. يُقترح عليك ترحيل القوائم وعملاء واجهة برمجة التطبيقات لاستخدام إصدار <b>السياسة/ الإصدار الأول من</b> واجهة برمجة التطبيقات بدلاً من ذلك. <br/>كحل بديل للمستخدمين الذين لا يزالون يستخدمون إصدار <b>Policy/v1beta1</b> API من PodDisruptionBudget على Kuberenetes v1.25 والإصدارات الأحدث، يمكنك بدلاً من ذلك تشغيل الأمر التالي لتثبيت Milvus:<br/> <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
      <li>انظر <a href="https://artifacthub.io/packages/helm/milvus/milvus">مخطط Milvus Helm</a> و <a href="https://helm.sh/docs/">Helm</a> لمزيد من المعلومات.</li>
    </ul>
  </div>
</li>
<li><p>ميلفوس مستقل</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
indexNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>في التهيئة أعلاه، تشترك عقدة الفهرس وعقدة الاستعلام في وحدتي معالجة رسومات. لتعيين وحدات معالجة رسومات مختلفة إلى عقدة الفهرس وعقدة الاستعلام، يمكنك تعديل التكوين وفقًا لذلك عن طريق تعيين extraEnv في ملف التكوين على النحو التالي:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
indexNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;0&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Check-Milvus-status" class="common-anchor-header">2. تحقق من حالة ميلفوس</h3><p>قم بتشغيل الأمر التالي للتحقق من حالة Milvus:</p>
<pre><code translate="no" class="language-bash">$ kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>بعد بدء تشغيل Milvus، يعرض العمود <code translate="no">READY</code> <code translate="no">1/1</code> لجميع الكبسولات.</p>
<ul>
<li><p>مجموعة ميلفوس العنقودية</p>
<pre><code translate="no" class="language-shell">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                1/1    Running   0        3m23s
my-release-etcd-1                                1/1    Running   0        3m23s
my-release-etcd-2                                1/1    Running   0        3m23s
my-release-milvus-datacoord-6fd4bd885c-gkzwx     1/1    Running   0        3m23s
my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        3m23s
my-release-milvus-indexcoord-5bfcf6bdd8-nmh5l    1/1    Running   0        3m23s
my-release-milvus-indexnode-5c5f7b5bd9-l8hjg     1/1    Running   0        3m24s
my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        3m24s
my-release-milvus-querycoord-579cd79455-xht5n    1/1    Running   0        3m24s
my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        3m24s
my-release-milvus-rootcoord-7fb9488465-dmbbj     1/1    Running   0        3m23s
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
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ميلفوس مستقل</p>
<pre><code translate="no" class="language-shell">NAME                                               READY   STATUS      RESTARTS   AGE
my-release-etcd-0                                  1/1     Running     0          30s
my-release-milvus-standalone-54c4f88cb9-f84pf      1/1     Running     0          30s
my-release-minio-5564fbbddc-mz7f5                  1/1     Running     0          30s
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. إعادة توجيه منفذ محلي إلى ميلفوس</h3><p>تحقق من المنفذ المحلي الذي يستمع إليه خادم Milvus. استبدل اسم الكبسولة باسمك.</p>
<pre><code translate="no" class="language-bash">$ kubectl get pod my-release-milvus-proxy-6bd7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
19530
<button class="copy-code-btn"></button></code></pre>
<p>بعد ذلك، قم بتشغيل الأمر التالي لإعادة توجيه منفذ محلي إلى المنفذ الذي يعمل عليه Milvus.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus 27017:19530
Forwarding from 127.0.0.1:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>اختياريًا، يمكنك استخدام <code translate="no">:19530</code> بدلًا من <code translate="no">27017:19530</code> في الأمر أعلاه للسماح لـ <code translate="no">kubectl</code> بتخصيص منفذ محلي لك حتى لا تضطر إلى إدارة تعارضات المنافذ.</p>
<p>بشكل افتراضي، يستمع منفذ إعادة توجيه المنفذ الخاص بـ kubectl بشكل افتراضي فقط على <code translate="no">localhost</code>. استخدم العلامة <code translate="no">address</code> إذا كنت تريد أن يستمع ميلفوس على عناوين IP المحددة أو جميع عناوين IP. الأمر التالي يجعل الأمر التالي المنفذ إلى الأمام يستمع على جميع عناوين IP على الجهاز المضيف.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530
Forwarding from 0.0.0.0:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>الآن، يمكنك الاتصال ب Milvus باستخدام المنفذ المعاد توجيهه.</p>
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
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27018:9091</span>
Forwarding from 0.0.0.0:27018 -&gt; 9091
<button class="copy-code-btn"></button></code></pre>
<p>الآن، يمكنك الوصول إلى واجهة مستخدم ويب Milvus Web UI على <code translate="no">http://localhost:27018</code>.</p>
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
    </button></h2><p>قم بتشغيل الأمر التالي لإلغاء تثبيت ميلفوس.</p>
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
    </button></h2><p>بعد تثبيت ميلفوس، يمكنك</p>
<ul>
<li><p>التحقق من <a href="/docs/ar/quickstart.md">Quickstart</a> لمعرفة ما يمكن لـ Milvus القيام به.</p></li>
<li><p>تعلم العمليات الأساسية لملفوس:</p>
<ul>
<li><a href="/docs/ar/manage_databases.md">إدارة قواعد البيانات</a></li>
<li><a href="/docs/ar/manage-collections.md">إدارة المجموعات</a></li>
<li><a href="/docs/ar/manage-partitions.md">إدارة الأقسام</a></li>
<li><a href="/docs/ar/insert-update-delete.md">إدراج وإدراج وحذف وإدراج وحذف</a></li>
<li><a href="/docs/ar/single-vector-search.md">البحث في متجه واحد</a></li>
<li><a href="/docs/ar/multi-vector-search.md">البحث الهجين</a></li>
</ul></li>
<li><p><a href="/docs/ar/upgrade_milvus_cluster-helm.md">ترقية Milvus باستخدام مخطط Helm</a>.</p></li>
<li><p><a href="/docs/ar/scaleout.md">توسيع نطاق مجموعة ميلفوس الخاصة بك</a></p></li>
<li><p>نشر مجموعة ميلفوس الخاصة بك على السحابة:</p>
<ul>
<li><a href="/docs/ar/eks.md">أمازون EKS</a></li>
<li><a href="/docs/ar/gcp.md">جوجل كلاود</a></li>
<li><a href="/docs/ar/azure.md">مايكروسوفت أزور</a></li>
</ul></li>
<li><p>استكشف <a href="/docs/ar/milvus-webui.md">واجهة Milvus WebUI،</a> وهي واجهة ويب سهلة الاستخدام لمراقبة وإدارة Milvus.</p></li>
<li><p>استكشف Milvus <a href="/docs/ar/milvus_backup_overview.md">Backup،</a> وهي أداة مفتوحة المصدر للنسخ الاحتياطية لبيانات Milvus.</p></li>
<li><p>استكشف <a href="/docs/ar/birdwatcher_overview.md">Birdwatcher،</a> وهي أداة مفتوحة المصدر لتصحيح أخطاء ميلفوس وتحديثات التكوين الديناميكية.</p></li>
<li><p>استكشف <a href="https://github.com/zilliztech/attu">Attu،</a> وهي أداة مفتوحة المصدر لواجهة المستخدم الرسومية لإدارة Milvus بسهولة.</p></li>
<li><p><a href="/docs/ar/monitor.md">راقب ميلفوس باستخدام بروميثيوس</a>.</p></li>
</ul>
