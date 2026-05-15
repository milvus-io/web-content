---
id: set_up_cdc_replication.md
summary: تعلم كيفية نشر مجموعتين من مجموعات Milvus وتكوين النسخ المتماثل CDC بينهما.
title: إعداد النسخ المتماثل CDC
---
<h1 id="Set-Up-CDC-Replication" class="common-anchor-header">إعداد النسخ المتماثل CDC<button data-href="#Set-Up-CDC-Replication" class="anchor-icon" translate="no">
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
    </button></h1><p>يوضح هذا الدليل كيفية نشر مجموعتين مستقلتين من مجموعات Milvus مع مشغل Milvus وتكوين النسخ المتماثل ل CDC من مجموعة مصدر إلى مجموعة مستهدفة.</p>
<p>تستخدم الأمثلة:</p>
<ul>
<li><code translate="no">source-cluster</code> كمجموعة أساسية.</li>
<li><code translate="no">target-cluster</code> كمجموعة احتياطية.</li>
<li><code translate="no">milvus</code> كمساحة أسماء لمجموعات Milvus.</li>
<li><code translate="no">milvus-operator</code> كمساحة أسماء لمشغل Milvus.</li>
</ul>
<p>قبل أن تبدأ، اقرأ <a href="/docs/ar/v2.6.x/milvus_cdc_overview.md">Milvus CDC</a> لفهم نموذج الاستعداد الأساسي وخيارات تجاوز الفشل.</p>
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
<li>Milvus v2.6.16 أو أحدث.</li>
<li>مشغل Milvus الإصدار 1.3.4 أو أحدث.</li>
<li>تتوفر مجموعة Kubernetes.</li>
<li>يمكن لمجموعتي المصدر والهدف الاتصال ببعضهما البعض عبر الشبكة.</li>
<li>لديك بيانات اعتماد المسؤول لكلا مجموعتي Milvus.</li>
<li>أنت تعرف عدد القنوات الفعلية لكل مجموعة.</li>
</ul>
<h2 id="Step-1-Upgrade-Milvus-Operator" class="common-anchor-header">الخطوة 1: ترقية مشغل ميلفوس<button data-href="#Step-1-Upgrade-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بإضافة مستودع Milvus Operator Helm:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech-milvus-operator https://zilliztech.github.io/milvus-operator/
<button class="copy-code-btn"></button></code></pre>
<p>قم بتحديث المستودع:</p>
<pre><code translate="no" class="language-bash">helm repo update zilliztech-milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>قم بتثبيت أو ترقية مشغل Milvus:</p>
<pre><code translate="no" class="language-bash">helm -n milvus-operator upgrade --install milvus-operator \
  zilliztech-milvus-operator/milvus-operator \
  --create-namespace
<button class="copy-code-btn"></button></code></pre>
<p>تحقق من تشغيل جراب المشغل:</p>
<pre><code translate="no" class="language-bash">kubectl get pods -n milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>مثال على الإخراج:</p>
<pre><code translate="no" class="language-text">NAME                               READY   STATUS    RESTARTS   AGE
milvus-operator-6f7d8c9c7d-xm4tj   1/1     Running   0          54s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Deploy-the-Source-Cluster" class="common-anchor-header">الخطوة 2: نشر مجموعة المصدر<button data-href="#Step-2-Deploy-the-Source-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بإنشاء ملف باسم <code translate="no">milvus_source_cluster.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">source-cluster</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">milvus</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">standalone</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.16</span>
    <span class="hljs-attr">cdc:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>تطبيق التكوين:</p>
<pre><code translate="no" class="language-bash">kubectl create namespace milvus
kubectl apply -f milvus_source_cluster.yaml
<button class="copy-code-btn"></button></code></pre>
<p>تحقق من تشغيل كبسولات مجموعة المصدر:</p>
<pre><code translate="no" class="language-bash">kubectl get pods -n milvus
<button class="copy-code-btn"></button></code></pre>
<p>مثال على الإخراج:</p>
<pre><code translate="no" class="language-text">NAME                                                   READY   STATUS    RESTARTS   AGE
source-cluster-etcd-0                                  1/1     Running   0          3m
source-cluster-minio-6d8f7d9b9f-9t7j2                  1/1     Running   0          3m
source-cluster-milvus-standalone-7f8d9c8f6d-r2m5x      1/1     Running   0          2m
source-cluster-milvus-cdc-66d64747bd-sckxj             1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<p>تأكد من أن جراب CDC، مثل <code translate="no">source-cluster-milvus-cdc-...</code> ، في حالة <code translate="no">Running</code>.</p>
<h2 id="Step-3-Deploy-the-Target-Cluster" class="common-anchor-header">الخطوة 3: نشر المجموعة المستهدفة<button data-href="#Step-3-Deploy-the-Target-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بإنشاء ملف باسم <code translate="no">milvus_target_cluster.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">target-cluster</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">milvus</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">standalone</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.16</span>
    <span class="hljs-attr">cdc:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>يتم تمكين مكون CDC على الكتلة الهدف أيضًا. يكون خاملاً بينما يكون الهدف في وضع الاستعداد، ولكنه مطلوب إذا أصبح الهدف لاحقًا هو الأساسي بعد التبديل.</p>
<p>قم بتطبيق التكوين:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_target_cluster.yaml
<button class="copy-code-btn"></button></code></pre>
<p>تحقق من أن كبسولات المجموعة الهدف قيد التشغيل:</p>
<pre><code translate="no" class="language-bash">kubectl get pods -n milvus | grep -E <span class="hljs-string">&#x27;NAME|target-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>مثال على الإخراج:</p>
<pre><code translate="no" class="language-text">NAME                                                   READY   STATUS    RESTARTS   AGE
target-cluster-etcd-0                                  1/1     Running   0          3m
target-cluster-minio-5f7c8d9b6f-k8s2q                  1/1     Running   0          3m
target-cluster-milvus-standalone-66dc8d9f7f-5n6bp      1/1     Running   0          2m
target-cluster-milvus-cdc-7f8c9d6b8c-q4t9m             1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Prepare-Cluster-Information" class="common-anchor-header">الخطوة 4: إعداد معلومات المجموعة<button data-href="#Step-4-Prepare-Cluster-Information" class="anchor-icon" translate="no">
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
    </button></h2><p>احصل على عناوين خدمة Milvus لكلا المجموعتين:</p>
<pre><code translate="no" class="language-bash">kubectl get svc -n milvus | grep -E <span class="hljs-string">&#x27;NAME|source-cluster|target-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>مثال على الإخراج:</p>
<pre><code translate="no" class="language-text">NAME                                  TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)              AGE
source-cluster-milvus                 ClusterIP   10.98.124.90     &lt;none&gt;        19530/TCP,9091/TCP   8m
target-cluster-milvus                 ClusterIP   10.109.234.172   &lt;none&gt;        19530/TCP,9091/TCP   3m
<button class="copy-code-btn"></button></code></pre>
<p>قم بإعداد نوعين من العناوين:</p>
<ul>
<li>تتم كتابة عناوين المجموعات إلى تكوين النسخ المتماثل وتستخدمها مكونات CDC. يجب أن تكون هذه العناوين قابلة للوصول إليها من قرون CDC.</li>
<li>يتم استخدام عناوين العميل فقط بواسطة عميل Python عند استدعاء واجهات برمجة تطبيقات Milvus. إذا كنت تقوم بتشغيل عميل Python خارج مجموعة Kubernetes، فقم بتعرض خدمات Milvus من خلال طريقة الوصول العادية، مثل موازن التحميل أو الدخول أو المنفذ إلى الأمام.</li>
</ul>
<p>قم بإعداد معلومات الاتصال وقوائم pchannel لكلا المجموعتين:</p>
<pre><code translate="no" class="language-python">source_cluster_addr = <span class="hljs-string">&quot;http://source-cluster-milvus.milvus.svc.cluster.local:19530&quot;</span>
target_cluster_addr = <span class="hljs-string">&quot;http://target-cluster-milvus.milvus.svc.cluster.local:19530&quot;</span>

source_client_addr = source_cluster_addr
target_client_addr = target_cluster_addr

<span class="hljs-comment"># If your Python client runs outside the Kubernetes cluster, replace only</span>
<span class="hljs-comment"># source_client_addr and target_client_addr with externally reachable addresses.</span>
<span class="hljs-comment"># Keep source_cluster_addr and target_cluster_addr reachable from CDC pods.</span>
<span class="hljs-comment"># For example:</span>
<span class="hljs-comment"># source_client_addr = &quot;http://127.0.0.1:19530&quot;</span>
<span class="hljs-comment"># target_client_addr = &quot;http://127.0.0.1:19531&quot;</span>

source_cluster_token = <span class="hljs-string">&quot;root:Milvus&quot;</span>
target_cluster_token = <span class="hljs-string">&quot;root:Milvus&quot;</span>

source_cluster_id = <span class="hljs-string">&quot;source-cluster&quot;</span>
target_cluster_id = <span class="hljs-string">&quot;target-cluster&quot;</span>

pchannel_num = <span class="hljs-number">16</span>
source_cluster_pchannels = [
    <span class="hljs-string">f&quot;<span class="hljs-subst">{source_cluster_id}</span>-rootcoord-dml_<span class="hljs-subst">{i}</span>&quot;</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(pchannel_num)
]
target_cluster_pchannels = [
    <span class="hljs-string">f&quot;<span class="hljs-subst">{target_cluster_id}</span>-rootcoord-dml_<span class="hljs-subst">{i}</span>&quot;</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(pchannel_num)
]
<button class="copy-code-btn"></button></code></pre>
<p>استبدل العناوين بعناوين خدمة Milvus الفعلية في بيئتك. لا تقم بتعيين <code translate="no">source_cluster_addr</code> أو <code translate="no">target_cluster_addr</code> إلى عنوان منفذ إعادة توجيه محلي ما لم يكن بإمكان كبسولات CDC الوصول إلى هذا العنوان أيضًا. يجب أن تتطابق قائمة pchannel مع نشر Milvus الخاص بك. لا تنسخ قيم المثال دون التحقق من تكوين مجموعتك.</p>
<h2 id="Step-5-Create-the-Replication-Configuration" class="common-anchor-header">الخطوة 5: إنشاء تكوين النسخ المتماثل<button data-href="#Step-5-Create-the-Replication-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بإنشاء تكوين النسخ المتماثل من <code translate="no">source-cluster</code> إلى <code translate="no">target-cluster</code>:</p>
<pre><code translate="no" class="language-python">replicate_config = {
    <span class="hljs-string">&quot;clusters&quot;</span>: [
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: source_cluster_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: source_cluster_addr,
                <span class="hljs-string">&quot;token&quot;</span>: source_cluster_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: source_cluster_pchannels,
        },
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: target_cluster_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: target_cluster_addr,
                <span class="hljs-string">&quot;token&quot;</span>: target_cluster_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: target_cluster_pchannels,
        },
    ],
    <span class="hljs-string">&quot;cross_cluster_topology&quot;</span>: [
        {
            <span class="hljs-string">&quot;source_cluster_id&quot;</span>: source_cluster_id,
            <span class="hljs-string">&quot;target_cluster_id&quot;</span>: target_cluster_id,
        }
    ],
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-6-Apply-the-Replication-Configuration" class="common-anchor-header">الخطوة 6: تطبيق تكوين النسخ المتماثل<button data-href="#Step-6-Apply-the-Replication-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتطبيق نفس التكوين على كلا المجموعتين:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

source_client = MilvusClient(
    uri=source_client_addr,
    token=source_cluster_token,
)
target_client = MilvusClient(
    uri=target_client_addr,
    token=target_cluster_token,
)

<span class="hljs-keyword">try</span>:
    source_client.update_replicate_configuration(**replicate_config)
    target_client.update_replicate_configuration(**replicate_config)
<span class="hljs-keyword">finally</span>:
    source_client.close()
    target_client.close()
<button class="copy-code-btn"></button></code></pre>
<p>من أجل أتمتة الإنتاج، استخدم عملاء منفصلين قصيري الأجل لعملية مستوى التحكم هذه. يؤدي ذلك إلى تجنب مشاركة نفس قناة gRPC مع حركة مرور DML للتطبيق أثناء تغيير دور المجموعة.</p>
<p>بعد تطبيق التهيئة، يتم نسخ التغييرات المكتوبة على <code translate="no">source-cluster</code> إلى <code translate="no">target-cluster</code>.</p>
<h2 id="Step-7-Verify-Data-Replication" class="common-anchor-header">الخطوة 7: التحقق من النسخ المتماثل للبيانات<button data-href="#Step-7-Verify-Data-Replication" class="anchor-icon" translate="no">
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
    </button></h2><p>للتحقق من عمل النسخ المتماثل</p>
<ol>
<li>اتصل بـ <code translate="no">source-cluster</code>.</li>
<li>إنشاء مجموعة.</li>
<li>أدخل البيانات في المجموعة.</li>
<li>قم بتحميل المجموعة وتشغيل استعلام أو بحث على <code translate="no">source-cluster</code>.</li>
<li>الاتصال ب <code translate="no">target-cluster</code>.</li>
<li>قم بتشغيل نفس الاستعلام أو البحث على <code translate="no">target-cluster</code> دون تحميل المجموعة يدويًا على المجموعة الاحتياطية.</li>
<li>تأكد من أن البيانات المتوقعة مرئية على كلا المجموعتين.</li>
</ol>
<p>المجموعة المستهدفة هي مجموعة احتياطية في هذه الطوبولوجيا. لا تقم بتشغيل عمليات DDL أو DCL اليدوية، مثل <code translate="no">load_collection</code> ، على المجموعة الاحتياطية. يجب تنفيذ هذه العمليات على المجموعة المصدر ونسخها إلى المجموعة الهدف.</p>
<p>يعتمد رمز التحقق الدقيق على مخطط المجموعة الخاص بك. للحصول على سير عمل تجميع Milvus الأساسي، راجع وثائق البدء السريع لـ Milvus.</p>
<h2 id="CDC-Lag" class="common-anchor-header">تأخر CDC<button data-href="#CDC-Lag" class="anchor-icon" translate="no">
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
    </button></h2><p>تأخر CDC هو نافذة البيانات بين المجموعة الأساسية والمجموعة الاحتياطية. يجب مراقبته باستمرار بعد تكوين النسخ المتماثل.</p>
<p>يمكن أن يزيد تأخر CDC عندما:</p>
<ul>
<li>ارتفاع معدل الكتابة الأساسي.</li>
<li>زيادة زمن انتقال الشبكة أو فقدان الحزمة بين المجموعات.</li>
<li>زيادة التحميل على المجموعة الاحتياطية.</li>
<li>تكون عقد CDC غير متوفرة بشكل كافٍ.</li>
<li>تشغيل عمليات DDL أو عمليات استيراد كبيرة.</li>
</ul>
<p>استخدم تأخر CDC لتوجيه القرارات التشغيلية:</p>
<ul>
<li>إذا كان التأخر منخفضاً، يجب أن يكتمل التحويل بشكل أسرع.</li>
<li>إذا كان التأخر مرتفعاً، فقد يؤدي تجاوز الفشل إلى فقدان المزيد من البيانات.</li>
</ul>
<p>يمكنك تقدير تأخر CDC باستخدام استعلام PromQL التالي:</p>
<pre><code translate="no" class="language-promql">clamp_min(
  max by (channel_name) (
    milvus_wal_last_confirmed_time_tick
  )
  -
  min by (channel_name) (
    milvus_cdc_last_replicated_time_tick
  ),
  0
)
</code></pre>
<p>تكون النتيجة بالثواني. بالنسبة لكل قناة مصدر، يقارن الاستعلام بين آخر نقرة زمنية مؤكدة ل WAL مع آخر نقرة زمنية تم نسخها بواسطة CDC. إذا تم النسخ المتماثل الأساسي إلى مجموعات احتياطية متعددة، فإن تعبير <code translate="no">min by (channel_name)</code> يُبلغ عن أبطأ تقدم للنسخ المتماثل لتلك القناة.</p>
<p>في حالة قيام Prometheus بكشط مجموعات Milvus متعددة، أضف عوامل تصفية التسمية التي تطابق عملية النشر لديك، مثل <code translate="no">namespace</code> أو <code translate="no">app_kubernetes_io_instance</code> ، لتجنب خلط المقاييس من مجموعات مختلفة.</p>
<h2 id="FAQ" class="common-anchor-header">الأسئلة الشائعة<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Do-I-need-to-call-updatereplicateconfiguration-on-both-clusters" class="common-anchor-header">هل أحتاج إلى استدعاء <code translate="no">update_replicate_configuration</code> على كلا المجموعتين؟<button data-href="#Do-I-need-to-call-updatereplicateconfiguration-on-both-clusters" class="anchor-icon" translate="no">
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
    </button></h3><p>نعم. قم بتطبيق نفس الطوبولوجيا على جميع المجموعات المشاركة. إذا لم تكن إحدى العناقيد أساسية في وقت الاستدعاء، فإنها تنتظر حتى يتم تطبيق الطوبولوجيا من خلال CDC.</p>
<h3 id="How-should-I-choose-clusterid" class="common-anchor-header">كيف يمكنني اختيار <code translate="no">cluster_id</code> ؟<button data-href="#How-should-I-choose-clusterid" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم معرّفًا ثابتًا وفريدًا لكل مجموعة. يستخدم المعرف أيضًا في أسماء قنوات pchannel ومراجع طوبولوجيا النسخ المتماثل.</p>
<h3 id="Can-I-change-pchannels-after-replication-is-configured" class="common-anchor-header">هل يمكنني تغيير pchannels بعد تكوين النسخ المتماثل؟<button data-href="#Can-I-change-pchannels-after-replication-is-configured" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكنك تحديث الطوبولوجيا، ولكن يجب أن تتطابق قائمة pchannel مع تخطيط المجموعة. تعامل مع تغييرات pchannel كعملية متقدمة وتحقق من النسخ المتماثل بعناية بعد ذلك.</p>
