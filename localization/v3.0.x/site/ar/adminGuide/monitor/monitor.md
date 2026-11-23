---
id: monitor.md
title: نشر خدمات المراقبة
related_key: 'monitor, alert'
summary: تعرف على كيفية نشر خدمات المراقبة لمجموعة Milvus باستخدام Prometheus.
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">نشر خدمات المراقبة على Kubernetes<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الموضوع كيفية استخدام Prometheus لنشر خدمات المراقبة لمجموعة Milvus على Kubernetes.</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">مراقبة المقاييس باستخدام Prometheus<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>المقاييس هي مؤشرات توفر معلومات حول حالة تشغيل نظامك. على سبيل المثال، باستخدام المقاييس، يمكنك معرفة مقدار الذاكرة أو موارد وحدة المعالجة المركزية (CPU) التي تستهلكها عقدة البيانات في Milvus. إن معرفة أداء وحالة المكونات في مجموعة Milvus الخاصة بك تجعلك على دراية تامة، وبالتالي يمكنك اتخاذ قرارات أفضل وتعديل تخصيص الموارد في الوقت المناسب.</p>
<p>بشكل عام، يتم تخزين المقاييس في قاعدة بيانات السلاسل الزمنية (TSDB)، مثل <a href="https://prometheus.io/">Prometheus،</a> ويتم تسجيل المقاييس مع طابع زمني. في حالة مراقبة خدمات Milvus، يمكنك استخدام Prometheus لسحب البيانات من نقاط النهاية التي يحددها المُصدِّرون. ثم يقوم Prometheus بتصدير مقاييس كل مكون من مكونات Milvus على <code translate="no">http://&lt;component-host&gt;:9091/metrics</code>.</p>
<p>ومع ذلك، قد يكون لديك عدة نسخ متماثلة لمكون واحد، مما يجعل التكوين اليدوي لـ Prometheus معقدًا للغاية. لذلك، يمكنك استخدام <a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator، وهو</a> امتداد لـ Kubernetes، من أجل الإدارة الآلية والفعالة لمثيلات مراقبة Prometheus. يوفر لك استخدام Prometheus Operator عناء إضافة أهداف المقاييس وموفري الخدمات يدويًّا.</p>
<p>يتيح لك تعريف المورد المخصص (CRD) لـ ServiceMonitor تحديد كيفية مراقبة مجموعة ديناميكية من الخدمات بشكل إعلاني. كما يسمح باختيار الخدمات المراد مراقبتها بالتكوين المطلوب باستخدام اختيارات التسميات. باستخدام Prometheus Operator، يمكنك إدخال قواعد تحدد كيفية عرض المقاييس. يمكن اكتشاف الخدمات الجديدة تلقائيًا وفقًا للقواعد التي تحددها دون الحاجة إلى إعادة التكوين يدويًّا.</p>
<p>توضح الصورة التالية سير عمل Prometheus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" /> 
   <span>Prometheus_architecture</span>
  
 </span></p>
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
    </button></h2><p>يستخدم هذا البرنامج التعليمي <a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus</a> لتجنيبك عناء تثبيت كل مكون من مكونات المراقبة والتنبيه وتكوينه يدويًّا.</p>
<p>يقوم kube-prometheus بجمع ملفات Kubernetes manifests ولوحات معلومات <a href="http://grafana.com/">Grafana</a> <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">وقواعد Prometheus</a> جنبًا إلى جنب مع الوثائق والنصوص البرمجية.</p>
<p>قبل نشر خدمات المراقبة، تحتاج إلى إنشاء مكدس مراقبة باستخدام التكوين الموجود في دليل ملفات kube-prometheus.</p>
<p>تستخدم الأوامر التالية فرع « <code translate="no">release-0.19</code> » من kube-prometheus، الذي يدعم إصدارات Kubernetes 1.35 و1.36 و1.37. لاختيار الفرع المناسب لإصدار Kubernetes الخاص بك، راجع <a href="https://github.com/prometheus-operator/kube-prometheus#compatibility">مصفوفة التوافق</a> الخاصة <a href="https://github.com/prometheus-operator/kube-prometheus#compatibility">بـ kube-prometheus</a>.</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> --branch release-0.19 https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
لا يمكن لدور المجموعة الافتراضي prometheus-k8s التقاط مقاييس milvus، لذا يلزم تطبيق التصحيح التالي:
</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لحذف مكدس، قم بتشغيل الأمر <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code>.</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">نشر خدمات المراقبة على Kubernetes<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. الوصول إلى لوحات المعلومات<button data-href="#1-Access-the-dashboards" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتوجيه خدمة Prometheus إلى المنفذ <code translate="no">9090</code> ، وخدمة Grafana إلى المنفذ <code translate="no">3000</code>.</p>
<pre><code translate="no" class="language-bash">$ kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. تمكين ServiceMonitor<button data-href="#2-Enable-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>لا يتم تمكين ServiceMonitor لـ Milvus Helm بشكل افتراضي. بعد تثبيت Prometheus Operator في مجموعة Kubernetes، يمكنك تمكينه عن طريق إضافة المعلمة <code translate="no">metrics.serviceMonitor.enabled=true</code>.</p>
<h4 id="With-Helm" class="common-anchor-header">باستخدام Helm</h4><p>يمكنك تمكين ServiceMonitor عن طريق تعيين المعلمة <code translate="no">metrics.serviceMonitor.enabled=true</code> على النحو التالي إذا كنت قد قمت بتثبيت مخطط Milvus Helm.</p>
<pre><code translate="no" class="language-bash">$ helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>يستخدم هذا الأمر <code translate="no">--reset-then-reuse-values</code> ، والذي يتطلب Helm 3.14 أو أحدث. باستخدام هذا الخيار، يعيد Helm تعيين القيم إلى القيم الافتراضية لإصدار المخطط المحدد في <code translate="no">--version</code> ، ويطبق قيم الإصدار الحالي الخاص بك، ثم يطبق القيم من <code translate="no">--set</code>. للعثور على <code translate="no">&lt;current-chart-version&gt;</code> ، قم بتشغيل <code translate="no">helm list</code> وقم بإزالة البادئة <code translate="no">milvus-</code> من القيمة الموجودة في عمود <code translate="no">CHART</code>. إذا قمت بتشغيل <code translate="no">helm upgrade</code> باستخدام <code translate="no">-f</code> أو <code translate="no">--set</code> ولكن بدون <code translate="no">--reset-then-reuse-values</code> أو <code translate="no">--reuse-values</code> ، فلن يحتفظ Helm بالقيم التي قمت بتعيينها عند التثبيت.</p>
</div>
<p>عند اكتمال التثبيت، استخدم <code translate="no">kubectl</code> للتحقق من مورد ServiceMonitor.</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">باستخدام Milvus Operator</h4><p>إذا كنت قد قمت بتثبيت Milvus باستخدام Milvus Operator، فإن المشغل يقوم بإنشاء PodMonitor بدلاً من ServiceMonitor. يحمل PodMonitor نفس اسم المورد المخصص لـ Milvus. يقوم المشغل بإنشائه فقط عندما لا تكون المقاييس معطلة في المورد المخصص وعندما يكون PodMonitor CRD موجودًا في المجموعة. يقوم دليل kube-prometheus <code translate="no">manifests/setup</code> بتثبيت هذا CRD. للتأكد من تمكين المقاييس، اتبع الخطوات التالية.</p>
<ol>
<li><p>قم بتشغيل الأمر التالي لتعديل المورد المخصص لـ Milvus. يفترض الأمر التالي أن المورد المخصص يسمى <code translate="no">my-release</code>.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتعديل حقل <code translate="no">spec.components.disableMetric</code> ليصبح <code translate="no">false</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetric:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>احفظ التغييرات واخرج من المحرر.</p></li>
<li><p>انتظر حتى يقوم المشغل بمطابقة التغييرات. يمكنك التحقق من PodMonitor عن طريق تشغيل الأمر التالي.</p>
<pre><code translate="no" class="language-bash">$ kubectl get podmonitor my-release
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3. التحقق من المقاييس<button data-href="#3-Check-the-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد تمكين ServiceMonitor أو PodMonitor، يمكنك الوصول إلى لوحة معلومات Prometheus على <code translate="no">http://localhost:9090/</code>.</p>
<p>انقر فوق علامة التبويب « <code translate="no">Status</code> » ثم « <code translate="no">Targets</code> ». يجب أن ترى أهداف مكونات Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" /> 
   <span>Prometheus_targets</span>
  
 </span></p>
<p>انقر على علامة التبويب « <code translate="no">Graph</code> » وأدخل التعبير « <code translate="no">up{app_kubernetes_io_instance=&quot;my-release&quot;}</code> » في مربع إدخال التعبير. ستظهر لك المقاييس الخاصة بمكونات Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" /> 
   <span>Prometheus_graph</span>
  
 </span></p>
<h3 id="4-Check-the-ServiceMonitor" class="common-anchor-header">4. تحقق من ServiceMonitor<button data-href="#4-Check-the-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا كنت قد قمت بتثبيت Milvus باستخدام Helm، فقم بتشغيل الأمر التالي لعرض قائمة ServiceMonitor. يطلق المخطط عليه اسم <code translate="no">my-release-milvus</code> لمجموعة Milvus و <code translate="no">my-release-milvus-standalone</code> لـ Milvus المستقل.</p>
<pre><code translate="no" class="language-bash">$ kubectl get servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">NAME                           AGE
my-release-milvus              54s
<button class="copy-code-btn"></button></code></pre>
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
<li>إذا كنت قد قمت بنشر خدمات المراقبة لمجموعة Milvus، فقد ترغب أيضًا في تعلم ما يلي:
<ul>
<li><a href="/docs/ar/visualize.md">تصور مقاييس Milvus في Grafana</a></li>
<li><a href="/docs/ar/alert.md">إنشاء تنبيه لخدمات Milvus</a></li>
<li>ضبط <a href="/docs/ar/allocate.md">تخصيص الموارد</a></li>
</ul></li>
<li>إذا كنت تبحث عن معلومات حول كيفية توسيع نطاق مجموعة Milvus:
<ul>
<li>تعلم <a href="/docs/ar/scaleout.md">كيفية توسيع نطاق مجموعة Milvus</a></li>
</ul></li>
<li>إذا كنت مهتمًا بترقية إصدار Milvus،
<ul>
<li>اقرأ <a href="/docs/ar/upgrade_milvus_cluster-operator.md">دليل ترقية مجموعة Milvus</a> <a href="/docs/ar/upgrade_milvus_standalone-operator.md">ودليل ترقية Milvus المستقل</a>.</li>
</ul></li>
</ul>
