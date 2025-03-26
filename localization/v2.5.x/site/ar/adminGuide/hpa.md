---
id: hpa.md
related_key: scale Milvus cluster with HPA
summary: >-
  تعرّف على كيفية تكوين التوسيع التلقائي للحاوية الأفقية (HPA) لتوسيع نطاق
  مجموعة Milvus بشكل ديناميكي.
title: تكوين التحجيم التلقائي للحاوية الأفقية (HPA) ل Milvus
---
<h1 id="Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="common-anchor-header">تكوين التحجيم التلقائي للحاوية الأفقية (HPA) ل Milvus<button data-href="#Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>التحجيم الأفقي للقرنة الأفقية التلقائي (HPA) هي ميزة Kubernetes التي تقوم تلقائيًا بضبط عدد القرون في عملية النشر بناءً على استخدام الموارد، مثل وحدة المعالجة المركزية أو الذاكرة. في Milvus، يمكن تطبيق HPA على مكونات عديمة الحالة مثل <code translate="no">proxy</code> و <code translate="no">queryNode</code> و <code translate="no">dataNode</code> و <code translate="no">indexNode</code> لتوسيع نطاق المجموعة ديناميكيًا استجابةً لتغيرات عبء العمل.</p>
<p>يشرح هذا الدليل كيفية تكوين HPA لمكونات Milvus باستخدام مشغل Milvus.</p>
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
<li>مجموعة Milvus قيد التشغيل تم نشرها باستخدام مشغل Milvus.</li>
<li>الوصول إلى <code translate="no">kubectl</code> لإدارة موارد Kubernetes.</li>
<li>الإلمام ببنية Milvus و Kubernetes HPA.</li>
</ul>
<h2 id="Configure-HPA-with-Milvus-Operator" class="common-anchor-header">تكوين HPA باستخدام مشغل Milvus<button data-href="#Configure-HPA-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>لتمكين HPA في مجموعة Milvus التي يديرها مشغل Milvus، اتبع الخطوات التالية:</p>
<ol>
<li><p><strong>اضبط النسخ المتماثلة على -1</strong>:</p>
<p>في مورد Milvus المخصص (CR)، قم بتعيين الحقل <code translate="no">replicas</code> إلى <code translate="no">-1</code> للمكون الذي تريد توسيع نطاقه باستخدام HPA. هذا يفوض التحكم في القياس إلى HPA بدلاً من المشغل. يمكنك تحرير المورد المخصص مباشرةً أو استخدام الأمر التالي <code translate="no">kubectl patch</code> للتبديل بسرعة إلى التحكم في HPA:</p>
<pre><code translate="no" class="language-bash">kubectl patch milvus &lt;your-release-name&gt; --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;json&#x27;</span> -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;replace&quot;, &quot;path&quot;: &quot;/spec/components/proxy/replicas&quot;, &quot;value&quot;: -1}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>استبدل <code translate="no">&lt;your-release-name&gt;</code> باسم مجموعة ميلفوس العنقودية الخاصة بك.</p>
<p>للتحقق من تطبيق التغيير، قم بالتشغيل:</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> milvus &lt;your-release-name&gt; -o jsonpath=<span class="hljs-string">&#x27;{.spec.components.proxy.replicas}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>يجب أن يكون الناتج المتوقع هو <code translate="no">-1</code> ، مما يؤكد أن المكون <code translate="no">proxy</code> أصبح الآن تحت سيطرة HPA.</p>
<p>بدلاً من ذلك، يمكنك تعريفه في CR YAML:</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: &lt;your-release-name&gt;
spec:
  mode: cluster
  components:
    proxy:
      replicas: -1
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>تعريف مورد HPA</strong>:</p>
<p>قم بإنشاء مورد HPA لاستهداف نشر المكون المطلوب. فيما يلي مثال للمكون <code translate="no">proxy</code>:</p>
<pre><code translate="no" class="language-yaml">apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-release-milvus-proxy-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-release-milvus-proxy
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - <span class="hljs-built_in">type</span>: Resource
      resource:
        name: cpu
        target:
          <span class="hljs-built_in">type</span>: Utilization
          averageUtilization: 60
    - <span class="hljs-built_in">type</span>: Resource
      resource:
        name: memory
        target:
          <span class="hljs-built_in">type</span>: Utilization
          averageUtilization: 60
  behavior:
    scaleUp:
      policies:
        - <span class="hljs-built_in">type</span>: Pods
          value: 1
          periodSeconds: 30
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - <span class="hljs-built_in">type</span>: Pods
          value: 1
          periodSeconds: 60
<button class="copy-code-btn"></button></code></pre>
<p>استبدل <code translate="no">my-release</code> في <code translate="no">metadata.name</code> و <code translate="no">spec.scaleTargetRef.name</code> باسم مجموعة ميلفوس الفعلي الخاص بك (على سبيل المثال، <code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> و <code translate="no">&lt;your-release-name&gt;-milvus-proxy</code>).</p></li>
<li><p><strong>قم بتطبيق تكوين HPA</strong>:</p>
<p>انشر مورد HPA باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f hpa.yaml
<button class="copy-code-btn"></button></code></pre>
<p>للتحقق من إنشاء HPA بنجاح، قم بتشغيله:</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> hpa
<button class="copy-code-btn"></button></code></pre>
<p>يجب أن ترى مخرجات مشابهة لـ:</p>
<pre><code translate="no">NAME                          REFERENCE                            TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
my-release-milvus-proxy-hpa   Deployment/my-release-milvus-proxy   &lt;some&gt;/60%      2         10        2          &lt;time&gt;
<button class="copy-code-btn"></button></code></pre>
<p>سيعكس الحقلان <code translate="no">NAME</code> و <code translate="no">REFERENCE</code> اسم المجموعة (على سبيل المثال، <code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> و <code translate="no">Deployment/&lt;your-release-name&gt;-milvus-proxy</code>).</p></li>
</ol>
<ul>
<li><code translate="no">scaleTargetRef</code>: يحدد النشر لتوسيع النطاق (على سبيل المثال، <code translate="no">my-release-milvus-proxy</code>).</li>
<li><code translate="no">minReplicas</code> و <code translate="no">maxReplicas</code>: يحدد نطاق القياس (من 2 إلى 10 كبسولات في هذا المثال).</li>
<li><code translate="no">metrics</code>: يقوم بتهيئة القياس بناءً على استخدام وحدة المعالجة المركزية والذاكرة، مستهدفًا متوسط استخدام بنسبة 60%.</li>
</ul>
<h2 id="Conclusion" class="common-anchor-header">الخلاصة<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>يسمح HPA لـ Milvus بالتكيف بكفاءة مع أعباء العمل المختلفة. باستخدام الأمر <code translate="no">kubectl patch</code> ، يمكنك تبديل أحد المكونات بسرعة إلى التحكم في HPA دون تحرير CR الكامل يدويًا. لمزيد من التفاصيل، راجع <a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/">وثائق Kubernetes HPA</a>.</p>
