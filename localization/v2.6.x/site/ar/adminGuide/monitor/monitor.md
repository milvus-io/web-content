---
id: monitor.md
title: نشر خدمات المراقبة
related_key: 'monitor, alert'
summary: >-
  تعرف على كيفية نشر خدمات المراقبة لمجموعة Milvus العنقودية باستخدام
  Prometheus.
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
    </button></h2><p>المقاييس هي مؤشرات توفر معلومات حول حالة تشغيل نظامك. على سبيل المثال، باستخدام المقاييس، يمكنك فهم مقدار موارد الذاكرة أو وحدة المعالجة المركزية التي تستهلكها عقدة البيانات في Milvus. أن تكون على دراية بأداء وحالة المكونات في مجموعة Milvus الخاصة بك يجعلك على دراية جيدة وبالتالي اتخاذ قرارات أفضل وتعديل تخصيص الموارد في الوقت المناسب.</p>
<p>بشكل عام، يتم تخزين المقاييس في قاعدة بيانات السلاسل الزمنية (TSDB)، مثل <a href="https://prometheus.io/">Prometheus،</a> ويتم تسجيل المقاييس بطابع زمني. في حالة مراقبة خدمات Milvus، يمكنك استخدام Prometheus لسحب البيانات من نقاط النهاية التي تم تعيينها بواسطة المصدرين. ثم يقوم Prometheus بتصدير مقاييس كل مكون من مكونات Milvus على <code translate="no">http://&lt;component-host&gt;:9091/metrics</code>.</p>
<p>ومع ذلك، قد يكون لديك العديد من النسخ المتماثلة لمكون واحد، مما يجعل التكوين اليدوي لـ Prometheus معقدًا للغاية. ولذلك، يمكنك استخدام <a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Oper</a>ator، وهو امتداد لـ Kubernetes، للإدارة الآلية والفعالة لمثيلات مراقبة Prometheus. يوفر لك استخدام Prometheus Operator Prometheus عناء إضافة أهداف القياس وموفري الخدمة يدويًا.</p>
<p>يمكّنك تعريف المورد المخصص (CRD) الخاص ب ServiceMonitor من تحديد كيفية مراقبة مجموعة ديناميكية من الخدمات بشكل واضح. كما يسمح أيضًا بتحديد الخدمات التي ستتم مراقبتها مع التكوين المطلوب باستخدام تحديدات التسمية. باستخدام مشغل Prometheus Operator، يمكنك تقديم اصطلاحات تحدد كيفية كشف المقاييس. يمكن اكتشاف الخدمات الجديدة تلقائيًا باتباع الاصطلاحات التي قمت بتعيينها دون الحاجة إلى إعادة التكوين اليدوي.</p>
<p>توضح الصورة التالية سير عمل بروميثيوس.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" />
   </span> <span class="img-wrapper"> <span>بروميثيوس_أرشيف</span> </span></p>
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
    </button></h2><p>يستخدم هذا البرنامج التعليمي <a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus</a> ليوفر عليك عناء تثبيت وتهيئة كل مكون من مكونات المراقبة والتنبيه يدويًا.</p>
<p>يقوم Kube-prometheus بجمع بيانات Kubernetes، ولوحات معلومات <a href="http://grafana.com/">Grafana،</a> <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">وقواعد Prometheus</a> مع الوثائق والبرامج النصية.</p>
<p>قبل نشر خدمات المراقبة، تحتاج إلى إنشاء مكدس مراقبة باستخدام التكوين الموجود في دليل بيانات كيوب-بروميثيوس kube-prometheus.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/prometheus-operator/kube-prometheus.git</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> kube-prometheus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply --server-side -f manifests/setup</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f manifests/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
لا يمكن لمكدس بروميثيوس-k8s الافتراضي التقاط مقاييس ميلفوس، وتحتاج إلى التصحيح:</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لحذف مكدس، قم بتشغيل <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code>.</p>
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. الوصول إلى لوحات المعلومات</h3><p>قم بإعادة توجيه خدمة Prometheus إلى المنفذ <code translate="no">9090</code> ، وخدمة Grafana إلى المنفذ <code translate="no">3000</code>.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/prometheus-k8s 9090</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/grafana 3000</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. تمكين ServiceMonitor</h3><p>لا يتم تمكين ServiceMonitor لـ Milvus Helm افتراضيًا. بعد تثبيت مشغل Prometheus في مجموعة Kubernetes، يمكنك تمكينه عن طريق إضافة المعلمة <code translate="no">metrics.serviceMonitor.enabled=true</code>.</p>
<h4 id="With-Helm" class="common-anchor-header">مع Helm</h4><p>يمكنك تمكين ServiceMonitor عن طريق تعيين المعلمة <code translate="no">metrics.serviceMonitor.enabled=true</code> كما يلي إذا كنت قد قمت بتثبيت مخطط Milvus Helm.</p>
<pre><code translate="no">```
$ helm upgrade my-release milvus/milvus --set metrics.serviceMonitor.enabled=true --reuse-values
```
</code></pre>
<p>عند اكتمال التثبيت، استخدم <code translate="no">kubectl</code> للتحقق من مورد ServiceMonitor.</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">مع مشغل Milvus Helm</h4><p>يمكنك تمكين ServiceMonitor على النحو التالي إذا كنت قد قمت بتثبيت ملفوس باستخدام مشغل ملفوس.</p>
<ol>
<li><p>قم بتشغيل الأمر التالي لتحرير مورد ميلفوس المخصص. يفترض الأمر التالي أن المورد المخصص اسمه <code translate="no">my-release</code>.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتحرير الحقل <code translate="no">spec.components.disableMetrics</code> إلى <code translate="no">false</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetrics:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>احفظ واخرج من المحرر.</p></li>
<li><p>انتظر حتى يقوم المُشغِّل بتسوية التغييرات. يمكنك التحقق من حالة المورد المخصص ميلفوس عن طريق تشغيل الأمر التالي.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> milvus my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span> <span class="hljs-operator">-</span>o yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>يجب أن يكون الحقل <code translate="no">status.components.metrics.serviceMonitor.enabled</code> هو <code translate="no">true</code>.</p>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3. تحقق من المقاييس</h3><p>بعد تمكين ServiceMonitor، يمكنك الوصول إلى لوحة تحكم بروميثيوس على <code translate="no">http://localhost:9090/</code>.</p>
<p>انقر على علامة التبويب <code translate="no">Status</code> ثم <code translate="no">Targets</code>. يجب أن ترى أهداف مكونات ميلفوس.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" />
   </span> <span class="img-wrapper"> <span>Prometheus_targets</span> </span></p>
<p>انقر على علامة التبويب <code translate="no">Graph</code> وأدخل التعبير <code translate="no">up{job=&quot;default/my-release&quot;}</code> في مربع إدخال التعبير. يجب أن ترى مقاييس مكونات ملفوس.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" />
   </span> <span class="img-wrapper"> <span>بروميثيوس_رسم بياني</span> </span></p>
<h3 id="4-Check-the-ServiceMonitor" class="common-anchor-header">4. تحقق من ServiceMonitor</h3><pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                           AGE
<span class="hljs-keyword">my</span>-release-milvus              54s
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
    </button></h2><ul>
<li>إذا كنت قد قمت بنشر خدمات المراقبة لمجموعة ميلفوس العنقودية، فقد ترغب أيضًا في تعلم<ul>
<li><a href="/docs/ar/visualize.md">تصوّر مقاييس ميلفوس في غرافانا</a></li>
<li><a href="/docs/ar/alert.md">إنشاء تنبيه لخدمات ميلفوس</a></li>
<li>ضبط <a href="/docs/ar/allocate.md">تخصيص الموارد</a> الخاصة بك</li>
</ul></li>
<li>إذا كنت تبحث عن معلومات حول كيفية توسيع نطاق مجموعة Milvus:<ul>
<li>تعلم كيفية <a href="/docs/ar/scaleout.md">توسيع نطاق مجموعة ميلفوس</a></li>
</ul></li>
<li>إذا كنت مهتمًا بترقية إصدار Milvus,<ul>
<li>اقرأ <a href="/docs/ar/upgrade_milvus_cluster-operator.md">دليل ترقية مجموعة Milvus العنقودية</a> ودليل <a href="/docs/ar/upgrade_milvus_standalone-operator.md">ترقية مجموعة Milvus المستقلة</a>.</li>
</ul></li>
</ul>
