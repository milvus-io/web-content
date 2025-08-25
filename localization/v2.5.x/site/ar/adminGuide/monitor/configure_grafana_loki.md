---
id: configure_grafana_loki.md
title: تكوين Grafana Loki
summary: >-
  يصف هذا الموضوع كيفية جمع السجلات باستخدام Loki وسجلات الاستعلام لمجموعة
  Milvus باستخدام Grafana.
---
<h1 id="Configure-Grafana-Loki" class="common-anchor-header">تكوين Grafana Loki<button data-href="#Configure-Grafana-Loki" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر هذا الدليل إرشادات حول كيفية تكوين Loki لتجميع السجلات و Grafana للاستعلام عن السجلات وعرضها لمجموعة Milvus.</p>
<p>في هذا الدليل، سوف تتعلم كيفية:</p>
<ul>
<li>نشر <a href="https://grafana.com/docs/loki/latest/get-started/overview/">Loki</a> و <a href="https://grafana.com/docs/loki/latest/send-data/promtail/">Promtail</a> على مجموعة Milvus باستخدام Helm.</li>
<li>تكوين تخزين الكائنات ل Loki.</li>
<li>الاستعلام عن السجلات باستخدام Grafana.</li>
</ul>
<p>كمرجع، سيتم إهمال <a href="https://grafana.com/docs/loki/latest/send-data/promtail/#promtail-agent">برومتيل،</a> لذا سنقدم لك سبيكة، والتي تم اقتراحها رسميًا من قبل مختبرات Grafana باعتبارها الوكيل الجديد لجمع سجلات Kubernetes وإعادة توجيهها إلى Loki.</p>
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
<li>لقد قمت بتثبيت <a href="/docs/ar/v2.5.x/install_cluster-helm.md">مجموعة Milvus على K8s</a>.</li>
<li>قمت بتثبيت الأدوات اللازمة، بما في ذلك <a href="https://helm.sh/docs/intro/install/">Helm</a> و <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
</ul>
<h2 id="Deploy-Loki" class="common-anchor-header">نشر لوكي<button data-href="#Deploy-Loki" class="anchor-icon" translate="no">
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
    </button></h2><p>لوكي هو نظام تجميع سجلات مستوحى من بروميثيوس. انشر Loki باستخدام Helm لجمع السجلات من مجموعة ميلفوس العنقودية.</p>
<h3 id="1-Add-Grafanas-Helm-Chart-Repository" class="common-anchor-header">1. إضافة مستودع المخططات البيانية لـ Grafana's Helm<button data-href="#1-Add-Grafanas-Helm-Chart-Repository" class="anchor-icon" translate="no">
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
    </button></h3><p>أضف مستودع مخططات Grafana إلى Helm وقم بتحديثه:</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> grafana https:<span class="hljs-comment">//grafana.github.io/helm-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Configure-Object-Storage-for-Loki" class="common-anchor-header">2. تكوين تخزين الكائنات لـ Loki<button data-href="#2-Configure-Object-Storage-for-Loki" class="anchor-icon" translate="no">
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
    </button></h3><p>اختر أحد خيارات التخزين التالية وأنشئ ملف تكوين <code translate="no">loki.yaml</code>:</p>
<ul>
<li><p>الخيار 1: استخدام MinIO للتخزين</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki:</span>
  <span class="hljs-attr">commonConfig:</span>
    <span class="hljs-attr">replication_factor:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled:</span> <span class="hljs-literal">false</span>

<span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>الخيار 2: استخدام AWS S3 للتخزين</p>
<p>في المثال التالي، استبدل <code translate="no">&lt;accessKey&gt;</code> و <code translate="no">&lt;keyId&gt;</code> بمفتاح ومعرف الوصول إلى S3 الخاص بك، و <code translate="no">s3.endpoint</code> بنقطة نهاية S3، و <code translate="no">s3.region</code> بمنطقة S3.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki:</span>
  <span class="hljs-attr">commonConfig:</span>
    <span class="hljs-attr">replication_factor:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketNames:</span>
      <span class="hljs-attr">chunks:</span> <span class="hljs-string">loki-chunks</span>
      <span class="hljs-attr">ruler:</span> <span class="hljs-string">loki-ruler</span>
      <span class="hljs-attr">admin:</span> <span class="hljs-string">loki-admin</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">&#x27;s3&#x27;</span>
    <span class="hljs-attr">s3:</span>
      <span class="hljs-attr">endpoint:</span> <span class="hljs-string">s3.us-west-2.amazonaws.com</span>
      <span class="hljs-attr">region:</span> <span class="hljs-string">us-west-2</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">&lt;accessKey&gt;</span>
      <span class="hljs-attr">accessKeyId:</span> <span class="hljs-string">&lt;keyId&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Install-Loki" class="common-anchor-header">3. تثبيت Loki<button data-href="#3-Install-Loki" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتشغيل الأوامر التالية لتثبيت Loki:</p>
<pre><code translate="no" class="language-shell">kubectl create ns loki
helm install --values loki.yaml loki grafana/loki -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Alloy" class="common-anchor-header">نشر السبيكة<button data-href="#Deploy-Alloy" class="anchor-icon" translate="no">
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
    </button></h2><p>سنعرض لك <a href="https://grafana.com/docs/alloy/latest/configure/">تكوين</a> السبيكة.</p>
<h3 id="1-Create-Alloy-Configuration" class="common-anchor-header">1. إنشاء تكوين السبيكة<button data-href="#1-Create-Alloy-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>سوف نستخدم <code translate="no">alloy.yaml</code> التالي لجمع سجلات جميع كبسولات Kubernetes وإرسالها إلى Loki عبر loki-gate:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">alloy:</span>
  <span class="hljs-attr">enableReporting:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">resources:</span> {}
  <span class="hljs-attr">configMap:</span>
    <span class="hljs-attr">create:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">content:</span> <span class="hljs-string">|-
      loki.write &quot;default&quot; {
        endpoint {
          url = &quot;http://loki-gateway/loki/api/v1/push&quot;
        }
      }
</span>
      <span class="hljs-string">discovery.kubernetes</span> <span class="hljs-string">&quot;pod&quot;</span> {
        <span class="hljs-string">role</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;pod&quot;</span>
      }

      <span class="hljs-string">loki.source.kubernetes</span> <span class="hljs-string">&quot;pod_logs&quot;</span> {
        <span class="hljs-string">targets</span>    <span class="hljs-string">=</span> <span class="hljs-string">discovery.relabel.pod_logs.output</span>
        <span class="hljs-string">forward_to</span> <span class="hljs-string">=</span> [<span class="hljs-string">loki.write.default.receiver</span>]
      }

      <span class="hljs-string">//</span> <span class="hljs-string">Rewrite</span> <span class="hljs-string">the</span> <span class="hljs-string">label</span> <span class="hljs-string">set</span> <span class="hljs-string">to</span> <span class="hljs-string">make</span> <span class="hljs-string">log</span> <span class="hljs-string">query</span> <span class="hljs-string">easier</span>
      <span class="hljs-string">discovery.relabel</span> <span class="hljs-string">&quot;pod_logs&quot;</span> {
        <span class="hljs-string">targets</span> <span class="hljs-string">=</span> <span class="hljs-string">discovery.kubernetes.pod.targets</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_namespace&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;namespace&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">&quot;pod&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_pod_name&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_pod_name&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;pod&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">&quot;container&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;container&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">&quot;app&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_pod_label_app_kubernetes_io_name&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_pod_label_app_kubernetes_io_name&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;app&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">&quot;job&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_namespace&quot;</span>, <span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_namespace&quot;</span>, <span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;job&quot;</span>
          <span class="hljs-string">separator</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;/&quot;</span>
          <span class="hljs-string">replacement</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;$1&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">L&quot;__path__&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_pod_uid&quot;</span>, <span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_pod_uid&quot;</span>, <span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;__path__&quot;</span>
          <span class="hljs-string">separator</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;/&quot;</span>
          <span class="hljs-string">replacement</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;/var/log/pods/*$1/*.log&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">&quot;container_runtime&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_pod_container_id&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_pod_container_id&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;container_runtime&quot;</span>
          <span class="hljs-string">regex</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;^(\\S+):\\/\\/.+$&quot;</span>
          <span class="hljs-string">replacement</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;$1&quot;</span>
        }
      }
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Alloy" class="common-anchor-header">2. تثبيت السبيكة<button data-href="#2-Install-Alloy" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">helm install  --values promtail.yaml promtail grafana/promtail -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-Logs-with-Grafana" class="common-anchor-header">الاستعلام عن السجلات باستخدام Grafana<button data-href="#Query-Logs-with-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><p>انشر Grafana وقم بتكوينه للاتصال بـ Loki للاستعلام عن السجلات.</p>
<h3 id="1-Deploy-Grafana" class="common-anchor-header">1. نشر غرافانا<button data-href="#1-Deploy-Grafana" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتثبيت Grafana باستخدام الأوامر التالية:</p>
<pre><code translate="no" class="language-shell">kubectl create ns monitoring
helm install my-grafana grafana/grafana --namespace monitoring
<button class="copy-code-btn"></button></code></pre>
<p>قبل أن تتمكن من الوصول إلى جرافانا، تحتاج إلى استرداد كلمة المرور <code translate="no">admin</code>:</p>
<pre><code translate="no" class="language-shell">kubectl get secret --namespace monitoring my-grafana -o jsonpath=&quot;{.data.admin-password}&quot; | base64 --decode ; echo
<button class="copy-code-btn"></button></code></pre>
<p>ثم، قم بإعادة توجيه منفذ Grafana إلى جهازك المحلي:</p>
<pre><code translate="no" class="language-shell">export POD_NAME=$(kubectl get pods --namespace monitoring -l &quot;app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-grafana&quot; -o jsonpath=&quot;{.items[0].metadata.name}&quot;)
kubectl --namespace monitoring port-forward $POD_NAME 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Add-Loki-as-a-Data-Source-in-Grafana" class="common-anchor-header">2. إضافة لوكي كمصدر بيانات في جرافانا<button data-href="#2-Add-Loki-as-a-Data-Source-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h3><p>بمجرد تشغيل Grafana، تحتاج إلى إضافة Loki كمصدر بيانات للاستعلام عن السجلات.</p>
<ol>
<li>افتح متصفح ويب وانتقل إلى <code translate="no">127.0.0.1:3000</code>. قم بتسجيل الدخول باستخدام اسم المستخدم <code translate="no">admin</code> وكلمة المرور التي تم الحصول عليها مسبقًا.</li>
<li>في القائمة اليمنى، اختر <strong>اتصالات</strong> &gt; <strong>إضافة اتصال جديد</strong>.</li>
<li>في الصفحة التي تظهر، اختر <strong>Loki</strong> كنوع مصدر البيانات. يمكنك إدخال <strong>لوكي</strong> في شريط البحث للعثور على مصدر البيانات.</li>
<li>في إعدادات مصدر بيانات Loki، حدد <strong>الاسم</strong> وعنوان <strong>URL،</strong> ثم انقر فوق <strong>حفظ واختبار</strong>.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/datasource.jpg" alt="DataSource" class="doc-image" id="datasource" />
   </span> <span class="img-wrapper"> <span>مصدر البيانات</span> </span></p>
<h3 id="3-Query-Milvus-Logs" class="common-anchor-header">3. الاستعلام عن سجلات ميلفوس<button data-href="#3-Query-Milvus-Logs" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد إضافة Loki كمصدر للبيانات، استعلم عن سجلات ميلفوس في غرافانا:</p>
<ol>
<li>في قائمة الجانب الأيسر، انقر فوق <strong>استكشاف</strong>.</li>
<li>في الزاوية العلوية اليسرى من الصفحة، اختر مصدر بيانات لوكي.</li>
<li>استخدم <strong>متصفح التسمية</strong> لتحديد التسميات والاستعلام عن السجلات.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvuslog.jpg" alt="Query" class="doc-image" id="query" />
   </span> <span class="img-wrapper"> <span>استعلام</span> </span></p>
