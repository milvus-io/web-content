---
id: config_jaeger_tracing.md
title: تكوين التتبع
related_key: 'Jaeger, Milvus, Trace'
summary: يوفر هذا الدليل إرشادات حول كيفية تكوين Jaeger لتجميع الآثار لـ Milvus.
---
<h1 id="Configure-Trace" class="common-anchor-header">تكوين التتبع<button data-href="#Configure-Trace" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر هذا الدليل إرشادات حول كيفية تكوين Jaeger لتجميع التتبع لـ Milvus.</p>
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
<li>أن تكون قد قمت بتثبيت الأدوات الضرورية، بما في ذلك <a href="https://helm.sh/docs/intro/install/">Helm</a> و <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
<li>يجب تثبيت الإصدار 1.6.1 أو أعلى من Cert-manager. يمكن العثور على دليل التثبيت <a href="https://cert-manager.io/v1.6-docs/installation/#default-static-install">هنا</a>.</li>
</ul>
<h2 id="Deply-Jaeger" class="common-anchor-header">ديبلي جايجر<button data-href="#Deply-Jaeger" class="anchor-icon" translate="no">
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
    </button></h2><p>جايجر هي منصة تتبع موزعة تم إصدارها كمصدر مفتوح من قبل <a href="http://uber.github.io/">أوبر تكنولوجيز</a>.</p>
<h3 id="1-Installing-the-Jaeger-Operator-on-Kubernetes" class="common-anchor-header">1. تثبيت مشغل Jaeger على Kubernetes</h3><p>لتثبيت المشغل، قم بتشغيل:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl create namespace observability</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl create -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.62.0/jaeger-operator.yaml -n observability</span>
<button class="copy-code-btn"></button></code></pre>
<p>في هذه المرحلة، يجب أن يكون هناك نشر <code translate="no">jaeger-operator</code> متاحًا. يمكنك عرضه عن طريق تشغيل الأمر التالي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get deployment jaeger-operator -n observability</span>

NAME              DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
jaeger-operator   1         1         1            1           48s
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Deploy-Jaeger" class="common-anchor-header">2. نشر جايجر</h3><p>أبسط طريقة ممكنة لإنشاء مثيل Jaeger هي إنشاء ملف YAML مثل المثال التالي. سيؤدي هذا إلى تثبيت استراتيجية AllInOne الافتراضية التي تنشر صورة <strong>الكل في واحد</strong> (تجمع بين <strong>Jaeger-Aagent</strong> <strong>وJaeger- Collector</strong> <strong>وJaeger-</strong> <strong>Collector</strong> <strong>وJaeger-query</strong> وJaeger UI) في جراب واحد، باستخدام <strong>التخزين في الذاكرة</strong> افتراضيًا.</p>
<p>إذا كنت ترغب في تخزين الآثار لفترة طويلة، يرجى الرجوع إلى <a href="https://www.jaegertracing.io/docs/1.62/operator/#production-strategy">استراتيجية الإنتاج</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">jaegertracing.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Jaeger</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">jaeger</span>
<button class="copy-code-btn"></button></code></pre>
<p>يمكن بعد ذلك استخدام ملف YAML مع <code translate="no">kubectl</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f simplest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>في غضون ثوانٍ قليلة، سيتوفر مثيل جديد في الذاكرة من Jaeger، وهو مناسب للعروض التوضيحية السريعة وأغراض التطوير. للتحقق من المثيلات التي تم إنشاؤها، قم بإدراج كائنات Jaeger:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get jaegers</span>

NAME     STATUS    VERSION   STRATEGY   STORAGE   AGE
jaeger   Running   1.62.0    allinone   memory    13s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Milvus-with-Helm-Chart" class="common-anchor-header">تثبيت ميلفوس مع مخطط هيلم<button data-href="#Install-Milvus-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك تثبيت Milvus مع مخطط Helm أو ترقيته باستخدام الإعدادات التالية:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    trace:
      exporter: jaeger
      sampleFraction: 1
      jaeger:
        url: &quot;http://jaeger-collector:14268/api/traces&quot;
</span><button class="copy-code-btn"></button></code></pre>
<p>لتطبيق الإعدادات المذكورة أعلاه على نشر Milvus جديد، يمكنك تشغيل الأمر التالي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade --install -f values.yaml my-release milvus/milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>لتطبيق الإعدادات المذكورة أعلاه على عملية نشر Milvus موجودة، يمكنك تشغيل الأمر التالي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release -f values.yaml milvus/milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="View-Traces" class="common-anchor-header">عرض التتبعات<button data-href="#View-Traces" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد أن تقوم بنشر جايجر وميلفوس مع مخطط هيلم، يتم تمكين الدخول بواسطة dfault. يمكنك عرض الدخول عن طريق تشغيل الأمر التالي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get ingress</span>

NAME           CLASS    HOSTS   ADDRESS         PORTS   AGE
jaeger-query   &lt;none&gt;   *       192.168.122.34  80      14m
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد توفر الدخول، يمكنك الوصول إلى واجهة مستخدم Jaeger من خلال الانتقال إلى <code translate="no">http://${ADDRESS}</code>. استبدل <code translate="no">${ADDRESS}</code> بعنوان IP الفعلي للمدخل.</p>
<p>تُظهر لقطة الشاشة التالية واجهة المستخدم Jaeger UI مع آثار ميلفوس أثناء عملية بحث وعملية تجميع تحميل:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/jaeger-trace-search.PNG" alt="Trace Search Request" class="doc-image" id="trace-search-request" />
   </span> <span class="img-wrapper"> <span>طلب بحث التتبع</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/jaeger-trace-load.png" alt="Trace Load Collection Request" class="doc-image" id="trace-load-collection-request" />
   </span> <span class="img-wrapper"> <span>تتبع طلب تجميع التحميل</span> </span></p>
