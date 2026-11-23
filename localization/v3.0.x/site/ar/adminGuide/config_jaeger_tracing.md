---
id: config_jaeger_tracing.md
title: تكوين التتبع
related_key: 'Jaeger, Milvus, Trace'
summary: يقدم هذا الدليل إرشادات حول كيفية تهيئة Jaeger لجمع مسارات التشغيل لـ Milvus.
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
    </button></h1><p>يقدم هذا الدليل إرشادات حول كيفية تكوين Jaeger لجمع التتبع لـ Milvus.</p>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات المسبقة<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>يجب أن تكون قد قمت بتثبيت الأدوات الضرورية، بما في ذلك <a href="https://helm.sh/docs/intro/install/">Helm</a> و <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
</ul>
<h2 id="Deploy-Jaeger" class="common-anchor-header">نشر Jaeger<button data-href="#Deploy-Jaeger" class="anchor-icon" translate="no">
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
    </button></h2><p>Jaeger هي منصة تتبع موزعة تم إصدارها كمصدر مفتوح بواسطة <a href="http://uber.github.io/">Uber Technologies</a>.</p>
<p>يقوم هذا الدليل بنشر Jaeger v2 باستخدام <a href="https://github.com/jaegertracing/helm-charts">مخطط Jaeger Helm</a>. بشكل افتراضي، ينشر المخطط Jaeger باستخدام نموذج "الكل في واحد" والتخزين في الذاكرة، وهو ما يناسب الاختبار. لمعرفة طرق أخرى لتشغيل Jaeger على Kubernetes، راجع <a href="https://www.jaegertracing.io/docs/2.23/deployment/kubernetes/">النشر على Kubernetes</a>.</p>
<h3 id="1-Install-Jaeger" class="common-anchor-header">1. تثبيت Jaeger<button data-href="#1-Install-Jaeger" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتثبيت Jaeger في مساحة الاسم (namespace) التي قمت بتثبيت Milvus فيها. تشير إعدادات Milvus في القسم التالي إلى خدمة Jaeger باسمها المختصر، <code translate="no">jaeger</code> ، ولا يقوم Kubernetes بحل اسم الخدمة بدون مساحة اسم إلا ضمن مساحة اسم البود (pod) الذي يقوم بالاستعلام.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add jaegertracing https://jaegertracing.github.io/helm-charts</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm install jaeger jaegertracing/jaeger --version 4.19.0</span>
<button class="copy-code-btn"></button></code></pre>
<p>يُشير ملف README الخاص بالرسم البياني إلى أن الرسم البياني تجريبي، ويذكر أن تغييرات جذرية قد تحدث في الإصدارات الثانوية، لذا فإن الأمر يثبت إصدار الرسم البياني. يقوم إصدار الرسم البياني 4.19.0 بنشر Jaeger 2.23.0.</p>
<h3 id="2-Check-the-Jaeger-pod" class="common-anchor-header">2. التحقق من بود Jaeger<button data-href="#2-Check-the-Jaeger-pod" class="anchor-icon" translate="no">
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
    </button></h3><p>للتحقق من أن بود Jaeger قيد التشغيل، قم بتشغيل الأمر التالي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods -l app.kubernetes.io/instance=jaeger,app.kubernetes.io/component=all-in-one</span>
<button class="copy-code-btn"></button></code></pre>
<p>ينشئ المخطط خدمة باسم <code translate="no">jaeger</code>. تعرض الخدمة مستقبل OTLP gRPC على المنفذ <code translate="no">4317</code> وواجهة مستخدم Jaeger على المنفذ <code translate="no">16686</code>.</p>
<h2 id="Install-Milvus-with-Helm-Chart" class="common-anchor-header">تثبيت Milvus باستخدام مخطط Helm<button data-href="#Install-Milvus-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>لإرسال التتبع من Milvus إلى Jaeger عبر OTLP، احفظ الإعدادات التالية في ملف باسم <code translate="no">values.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    trace:
      exporter: otlp
      sampleFraction: 1
      otlp:
        endpoint: &quot;jaeger:4317&quot;
        method: grpc
        secure: false
</span><button class="copy-code-btn"></button></code></pre>
<p>باستخدام هذه الإعدادات، يقوم Milvus بأخذ عينات من كل طلب (<code translate="no">sampleFraction: 1</code>) ويصدر التتبع عبر OTLP gRPC بدون TLS (<code translate="no">secure: false</code>) إلى المنفذ <code translate="no">4317</code> لخدمة <code translate="no">jaeger</code>.</p>
<p>لتطبيق الإعدادات المذكورة أعلاه على نشر جديد لـ Milvus، قم بتشغيل الأوامر التالية:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade --install my-release zilliztech/milvus --version 5.0.22 -f values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>لتطبيق الإعدادات المذكورة أعلاه على نشر Milvus موجود بالفعل، قم بتشغيل الأمر التالي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values -f values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>يستخدم هذا الأمر <code translate="no">--reset-then-reuse-values</code> ، والذي يتطلب Helm 3.14 أو أحدث. باستخدام هذا الخيار، يعيد Helm تعيين القيم إلى القيم الافتراضية لإصدار المخطط المحدد في <code translate="no">--version</code> ، ويطبق قيم الإصدار الحالي الخاص بك، ثم يطبق القيم من <code translate="no">-f</code>. وبالتالي، فإن كل قيمة في <code translate="no">values.yaml</code> تتجاوز قيمة الإصدار الحالي الخاص بك، ويتم استبدال إدخال <code translate="no">user.yaml</code> الموجود ضمن <code translate="no">extraConfigFiles</code> بالكامل. للعثور على <code translate="no">&lt;current-chart-version&gt;</code> ، قم بتشغيل <code translate="no">helm list</code> وقم بإزالة البادئة <code translate="no">milvus-</code> من القيمة الموجودة في العمود <code translate="no">CHART</code>. إذا قمت بتشغيل <code translate="no">helm upgrade</code> مع <code translate="no">-f</code> أو <code translate="no">--set</code> ولكن بدون <code translate="no">--reset-then-reuse-values</code> أو <code translate="no">--reuse-values</code> ، فلن يحتفظ Helm بالقيم التي قمت بتعيينها عند التثبيت.</p>
</div>
<h2 id="View-Traces" class="common-anchor-header">عرض التتبع<button data-href="#View-Traces" class="anchor-icon" translate="no">
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
    </button></h2><p>خدمة <code translate="no">jaeger</code> هي من النوع <code translate="no">ClusterIP</code> ، ولا يقوم المخطط بإنشاء مدخل (ingress) بشكل افتراضي. لفتح واجهة مستخدم Jaeger من جهازك المحلي، قم بتوجيه منفذ واجهة المستخدم:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward svc/jaeger 16686:16686</span>
<button class="copy-code-btn"></button></code></pre>
<p>ثم افتح <code translate="no">http://localhost:16686</code> في متصفح.</p>
<p>تُظهر لقطة الشاشة التالية واجهة مستخدم Jaeger مع مسارات Milvus أثناء عملية بحث وعملية جمع الأحمال:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-search.PNG" alt="Trace Search Request" class="doc-image" id="trace-search-request" /> 
   <span>طلب البحث عن التتبع</span>
  
 </span></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-load.png" alt="Trace Load Collection Request" class="doc-image" id="trace-load-collection-request" /> 
   <span>تتبع طلب جمع الأحمال</span>
  
 </span></p>
