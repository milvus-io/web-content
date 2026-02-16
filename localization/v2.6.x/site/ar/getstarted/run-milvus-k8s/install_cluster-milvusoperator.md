---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
summary: تعلم كيفية تثبيت مجموعة Milvus العنقودية على Kubernetes باستخدام مشغل Milvus
title: تثبيت مجموعة ميلفوس العنقودية مع مشغل ميلفوس
---
<h1 id="Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="common-anchor-header">تشغيل Milvus في Kubernetes باستخدام مشغل Milvus<button data-href="#Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>توضح هذه الصفحة كيفية بدء تشغيل مثيل Milvus في Kubernetes باستخدام <a href="https://github.com/zilliztech/milvus-operator">مشغل Mil</a>vus.</p>
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
    </button></h2><p>مشغّل Milvus هو حل يساعدك على نشر وإدارة مكدس خدمة Milvus كامل لمجموعات Kubernetes (K8s) المستهدفة. تتضمن الحزمة جميع مكونات Milvus والتبعيات ذات الصلة مثل etcd وPulsar وMinIO.</p>
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
<li><p><a href="/docs/ar/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">إنشاء مجموعة K8s</a>.</p></li>
<li><p>تثبيت <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. يمكنك التحقق من StorageClass المثبت على النحو التالي.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تحقق من <a href="/docs/ar/prerequisite-helm.md">متطلبات الأجهزة والبرامج</a> قبل التثبيت.</p></li>
<li><p>قبل تثبيت Milvus، يوصى باستخدام <a href="https://milvus.io/tools/sizing">أداة تحجيم Milvus</a> لتقدير متطلبات الأجهزة بناءً على حجم بياناتك. يساعد ذلك على ضمان الأداء الأمثل وتخصيص الموارد لتثبيت Milvus الخاص بك.</p></li>
</ul>
<div class="alert note">
<p>إذا واجهتك أي مشاكل في سحب الصورة، اتصل بنا على <a href="mailto:community@zilliz.com">community@zilliz.com</a> مع تفاصيل المشكلة، وسنقدم لك الدعم اللازم.</p>
</div>
<h2 id="Install-Milvus-Operator" class="common-anchor-header">تثبيت مشغل Milvus<button data-href="#Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم مشغل Milvus بتعريف الموارد المخصصة لمجموعة Milvus على رأس <a href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/">موارد Kubernetes المخصصة</a>. عندما يتم تعريف الموارد المخصصة، يمكنك استخدام واجهات برمجة تطبيقات K8s بطريقة توضيحية وإدارة مكدس نشر Milvus لضمان قابليته للتوسع والتوافر العالي.</p>
<div class="filter">
 <a href="#helm">هيلم</a> <a href="#kubectl">كوبيكتل</a></div>
<div class="filter-helm">
<p>قم بتشغيل الأمر التالي لتثبيت مشغل Milvus مع Helm.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm install milvus-operator \
  -n milvus-operator --create-namespace \
  --<span class="hljs-built_in">wait</span> --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.3.0/milvus-operator-1.3.0.tgz</span>
<button class="copy-code-btn"></button></code></pre>
<p>سترى مخرجات مشابهة لما يلي بعد انتهاء عملية التثبيت.</p>
<pre><code translate="no" class="language-shell">NAME: milvus-operator
LAST DEPLOYED: Thu Jul  7 13:18:40 2022
NAMESPACE: milvus-operator
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
Milvus Operator Is Starting, use `kubectl get -n milvus-operator deploy/milvus-operator` to check if its successfully installed
If Operator not started successfully, check the checker&#x27;s log with `kubectl -n milvus-operator logs job/milvus-operator-checker`
Full Installation doc can be found in https://github.com/zilliztech/milvus-operator/blob/main/docs/installation/installation.md
Quick start with `kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_minimum.yaml`
More samples can be found in https://github.com/zilliztech/milvus-operator/tree/main/config/samples
CRD Documentation can be found in https://github.com/zilliztech/milvus-operator/tree/main/docs/CRD
<button class="copy-code-btn"></button></code></pre>
<p>إذا كنت قد قمت بتثبيت مشغل ميلفوس من قبل، قم بترقية الأمر التالي:</p>
<pre><code translate="no" class="language-shell">helm upgrade milvus-operator \
  -n milvus-operator --create-namespace \
  --wait --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.3.0/milvus-operator-1.3.0.tgz
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-kubectl">
<p>قم بتشغيل الأمر التالي لتثبيت مشغل ميلفوس مع <code translate="no">kubectl</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>سترى مخرجات مشابهة لما يلي بعد انتهاء عملية التثبيت.</p>
<pre><code translate="no" class="language-shell">namespace/milvus-operator created
customresourcedefinition.apiextensions.k8s.io/milvusclusters.milvus.io created
serviceaccount/milvus-operator-controller-manager created
role.rbac.authorization.k8s.io/milvus-operator-leader-election-role created
clusterrole.rbac.authorization.k8s.io/milvus-operator-manager-role created
clusterrole.rbac.authorization.k8s.io/milvus-operator-metrics-reader created
clusterrole.rbac.authorization.k8s.io/milvus-operator-proxy-role created
rolebinding.rbac.authorization.k8s.io/milvus-operator-leader-election-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/milvus-operator-manager-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/milvus-operator-proxy-rolebinding created
configmap/milvus-operator-manager-config created
service/milvus-operator-controller-manager-metrics-service created
service/milvus-operator-webhook-service created
deployment.apps/milvus-operator-controller-manager created
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك التحقق من تشغيل جراب مشغل ميلفوس على النحو التالي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods -n milvus-operator</span>

NAME                               READY   STATUS    RESTARTS   AGE
milvus-operator-5fd77b87dc-msrk4   1/1     Running   0          46s
<button class="copy-code-btn"></button></code></pre>
</div>
<h2 id="Deploy-Milvus" class="common-anchor-header">نشر ميلفوس ميلفوس<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. نشر مجموعة ميلفوس<button data-href="#1-Deploy-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h3><p>بمجرد تشغيل جراب مشغل Milvus، يمكنك نشر مجموعة Milvus على النحو التالي.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>يقوم الأمر أعلاه بنشر مجموعة Milvus مع <strong>Woodpecker</strong> كقائمة انتظار للرسائل (موصى به للإصدار 2.6.11) وجميع المكونات المعمارية الجديدة بما في ذلك عقدة البث.</p>
<p><strong>أبرز الملامح المعمارية في هذا النشر:</strong></p>
<ul>
<li><strong>قائمة انتظار الرسائل</strong>: <a href="/docs/ar/use-woodpecker.md">يستخدم Woodpecker</a> (يقلل من صيانة البنية التحتية)</li>
<li><strong>عقدة التدفق</strong>: ممكّنة لمعالجة البيانات المحسّنة</li>
<li><strong>منسق المزيج</strong>: مكونات منسق مدمجة لتحسين الكفاءة</li>
</ul>
<p>لتخصيص هذه الإعدادات، نوصيك باستخدام <a href="https://milvus.io/tools/sizing">أداة تحجيم Milvus</a> لضبط التكوينات بناءً على حجم بياناتك الفعلي ثم تنزيل ملف YAML المقابل. لمعرفة المزيد حول معلمات التكوين، راجع <a href="https://milvus.io/docs/system_configuration.md">قائمة مراجعة تكوينات نظام Milvus</a>.</p>
<div class="alert note">
<ul>
<li>يجب أن يحتوي اسم الإصدار على أحرف وأرقام وشرطات فقط. النقاط غير مسموح بها في اسم الإصدار.</li>
<li>يمكنك أيضًا نشر مثيل Milvus في الوضع المستقل، حيث يتم تضمين جميع مكوناته داخل حجرة واحدة. للقيام بذلك، قم بتغيير عنوان URL لملف التكوين في الأمر أعلاه إلى <code translate="no">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_default.yaml</code></li>
</ul>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. تحقق من حالة مجموعة ميلفوس<button data-href="#2-Check-Milvus-cluster-status" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتشغيل الأمر التالي للتحقق من حالة مجموعة ميلفوس العنقودية</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get milvus my-release -o yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد أن تصبح مجموعة Milvus جاهزة، يجب أن تكون مخرجات الأمر أعلاه مشابهة لما يلي. إذا بقي الحقل <code translate="no">status.status</code> <code translate="no">Unhealthy</code> ، فإن مجموعة ميلفوس الخاصة بك لا تزال قيد الإنشاء.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">status:</span>
  <span class="hljs-attr">conditions:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;xxxx-xx-xxTxx:xx:xxZ&quot;</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">StorageReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">StorageReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;xxxx-xx-xxTxx:xx:xxZ&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">Pulsar</span> <span class="hljs-string">is</span> <span class="hljs-string">ready</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">PulsarReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">PulsarReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;xxxx-xx-xxTxx:xx:xxZ&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">Etcd</span> <span class="hljs-string">endpoints</span> <span class="hljs-string">is</span> <span class="hljs-string">healthy</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">EtcdReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">EtcdReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;xxxx-xx-xxTxx:xx:xxZ&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">All</span> <span class="hljs-string">Milvus</span> <span class="hljs-string">components</span> <span class="hljs-string">are</span> <span class="hljs-string">healthy</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">MilvusClusterHealthy</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">MilvusReady</span>
  <span class="hljs-attr">endpoint:</span> <span class="hljs-string">my-release-milvus.default:19530</span>
  <span class="hljs-attr">status:</span> <span class="hljs-string">Healthy</span>
<button class="copy-code-btn"></button></code></pre>
<p>ينشئ مشغل Milvus تبعيات Milvus، مثل etcd وPulsar وMinIO، ثم مكونات Milvus، مثل الوكيل والمنسقين والعقد.</p>
<p>بمجرد أن تصبح مجموعة Milvus جاهزة، يجب أن تكون حالة جميع الكبسولات في مجموعة Milvus مشابهة لما يلي.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods</span>

NAME                                             READY   STATUS    RESTARTS   AGE
my-release-etcd-0                                1/1     Running   0          2m36s
my-release-etcd-1                                1/1     Running   0          2m36s
my-release-etcd-2                                1/1     Running   0          2m36s
my-release-milvus-datanode-58955c65b9-j4j7s      1/1     Running   0          92s
my-release-milvus-mixcoord-686f84968f-jcv5d      1/1     Running   0          92s
my-release-milvus-proxy-646f48fc7c-4lctb         1/1     Running   0          92s
my-release-milvus-querynode-0-d89d7677b-x7j7q    1/1     Running   0          91s
my-release-milvus-streamingnode-556bdcc87c-2qwcc 1/1     Running   0          92s
my-release-minio-0                               1/1     Running   0          2m36s
my-release-minio-1                               1/1     Running   0          2m36s
my-release-minio-2                               1/1     Running   0          2m35s
my-release-minio-3                               1/1     Running   0          2m35s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. إعادة توجيه منفذ محلي إلى ميلفوس<button data-href="#3-Forward-a-local-port-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتشغيل الأمر التالي للحصول على المنفذ الذي تعمل عليه مجموعة Milvus العنقودية الخاصة بك.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pod my-release-milvus-proxy-84f67cdb7f-pg6wf --template</span>
=&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;
19530
<button class="copy-code-btn"></button></code></pre>
<p>يُظهر الإخراج أن مثيل Milvus يعمل على المنفذ الافتراضي <strong>19530</strong>.</p>
<div class="alert note">
<p>إذا كنت قد قمت بنشر Milvus في الوضع المستقل، قم بتغيير اسم الكبسولة من <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> إلى <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code>.</p>
</div>
<p>ثم، قم بتشغيل الأمر التالي لإعادة توجيه منفذ محلي إلى المنفذ الذي يخدم فيه ميلفوس.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward service/my-release-milvus 27017:19530</span>
Forwarding from 127.0.0.1:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>اختياريًا، يمكنك استخدام <code translate="no">:19530</code> بدلًا من <code translate="no">27017:19530</code> في الأمر أعلاه للسماح لـ <code translate="no">kubectl</code> بتخصيص منفذ محلي لك حتى لا تضطر إلى إدارة تعارضات المنافذ.</p>
<p>بشكل افتراضي، يستمع منفذ إعادة توجيه المنفذ الخاص بـ kubectl بشكل افتراضي فقط على <code translate="no">localhost</code>. استخدم العلامة <code translate="no">address</code> إذا كنت تريد أن يستمع ميلفوس على عناوين IP المحددة أو جميع عناوين IP. الأمر التالي يجعل الأمر التالي المنفذ إلى الأمام يستمع على جميع عناوين IP على الجهاز المضيف.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530</span>
Forwarding from 0.0.0.0:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك الآن الاتصال ب Milvus باستخدام المنفذ المعاد توجيهه.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(اختياري) تحديث تكوينات Milvus<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك عرض وتحديث تكوينات مجموعة ميلفوس الخاصة بك عن طريق استدعاء الأمر <code translate="no">patch</code> على النحو التالي:</p>
<ol>
<li><p>قم بتشغيل الأمر التالي لمعاينة التكوينات المحتملة.</p>
<p>يفترض ما يلي أنك تريد تحديث المعلمة <code translate="no">spec.components.disableMetric</code> إلى <code translate="no">false</code> مللي ثانية.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl patch milvus my-release --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;merge&#x27;</span>\
  -p <span class="hljs-string">&#x27;{&quot;spec&quot;:{&quot;components&quot;:{&quot;disableMetric&quot;:false}}}&#x27;</span> \
  --dry-run=client -o yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>للاطلاع على عناصر التكوين القابلة للتطبيق، راجع <a href="/docs/ar/system_configuration.md">تكوين النظام</a>.</p></li>
<li><p>قم بتحديث التكوينات.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl patch milvus my-release --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;merge&#x27;</span>\
  -p <span class="hljs-string">&#x27;{&quot;spec&quot;:{&quot;components&quot;:{&quot;disableMetric&quot;:false}}}&#x27;</span></span> 
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
    </button></h2><p>يأتي Milvus مزودًا بأداة واجهة مستخدم رسومية مدمجة تسمى Milvus WebUI يمكنك الوصول إليها من خلال متصفحك. تعمل واجهة مستخدم ويب Milvus WebUI على تحسين إمكانية مراقبة النظام من خلال واجهة بسيطة وبديهية. يمكنك استخدام واجهة مستخدم ويب Milvus Web UI لمراقبة الإحصائيات والمقاييس الخاصة بمكونات وتبعيات Milvus، والتحقق من تفاصيل قاعدة البيانات والتجميع، وسرد تكوينات Milvus المفصلة. للحصول على تفاصيل حول واجهة مستخدم ميلفوس ويب، راجع واجهة مستخدم ميلفوس <a href="/docs/ar/milvus-webui.md">ويب</a></p>
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
    </button></h2><p>قم بتشغيل الأمر التالي لإلغاء تثبيت مجموعة Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl delete milvus my-release</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>عندما تقوم بحذف مجموعة Milvus باستخدام التكوين الافتراضي، لا يتم حذف التبعيات مثل etcd وPulsar وMinIO. لذلك، في المرة القادمة عندما تقوم بتثبيت نفس مثيل مجموعة Milvus، سيتم استخدام هذه التبعيات مرة أخرى.</li>
<li>لحذف التبعيات ومطالبات وحدة التخزين الثابتة (PVCs) مع مجموعة Milvus العنقودية، راجع <a href="https://github.com/zilliztech/milvus-operator/blob/main/config/samples/milvus_deletion.yaml">ملف التكوين</a>.</li>
</ul>
</div>
<h2 id="Uninstall-Milvus-Operator" class="common-anchor-header">إلغاء تثبيت مشغل Milvus<button data-href="#Uninstall-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>هناك أيضًا طريقتان لإلغاء تثبيت مشغل Milvus.</p>
<ul>
<li><a href="#Uninstall-with-Helm">إلغاء التثبيت باستخدام Helm</a></li>
<li><a href="#Uninstall-with-kubectl">إلغاء التثبيت باستخدام kubectl</a></li>
</ul>
<h4 id="Uninstall-with-Helm" class="common-anchor-header">إلغاء التثبيت باستخدام Helm</h4><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm -n milvus-operator uninstall milvus-operator</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Uninstall-with-kubectl" class="common-anchor-header">إلغاء التثبيت باستخدام kubectl</h4><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl delete -f https://raw.githubusercontent.com/zilliztech/milvus-operator/v1.3.0/deploy/manifests/deployment.yaml</span>
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
<li><p>التحقق من <a href="/docs/ar/quickstart.md">Hello Milvus</a> لمعرفة ما يمكن أن يفعله ميلفوس.</p></li>
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
