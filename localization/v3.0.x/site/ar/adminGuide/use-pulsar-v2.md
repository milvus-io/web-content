---
id: use-pulsar-v2.md
related_key: use pulsar v2 with milvus v2.5.x
summary: >-
  توصيك شركة Milvus بترقية Pulsar إلى الإصدار 3 لـ Milvus v2.5.x. ومع ذلك، إذا
  كنت تفضل استخدام Pulsar v2، فإن هذه المقالة سترشدك إلى خطوات متابعة استخدام
  Pulsar v2 مع Milvus v2.5.x.
title: استخدام Pulsar v2 مع Milvus v2.5.x
---
<h1 id="Use-Pulsar-v2-with-Milvus-v25x" class="common-anchor-header">استخدام Pulsar v2 مع Milvus v2.5.x<button data-href="#Use-Pulsar-v2-with-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h1><p>تنصحك Milvus بترقية Pulsar إلى الإصدار 3 لتشغيل Milvus v2.5.x. لمزيد من التفاصيل، راجع <a href="/docs/ar/upgrade-pulsar-v3.md">ترقية Pulsar</a>. ومع ذلك، إذا كنت تفضل استخدام Pulsar v2 مع Milvus v2.5.x، فإن هذه المقالة سترشدك خلال إجراء تشغيل Milvus v2.5.x مع Pulsar v2.</p>
<p>إذا كان لديك مثيل Milvus قيد التشغيل بالفعل وترغب في ترقيته إلى الإصدار 2.5.x ولكنك تواصل استخدام Pulsar v2، يمكنك اتباع الخطوات الواردة في هذه الصفحة.</p>
<h2 id="Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="common-anchor-header">الاستمرار في استخدام Pulsar v2 أثناء ترقية Milvus v2.5.x<button data-href="#Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h2><p>سيرشدك هذا القسم إلى الخطوات اللازمة لمواصلة استخدام Pulsar v2 أثناء ترقية مثيل Milvus قيد التشغيل إلى الإصدار Milvus v2.5.x.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">لمستخدمي مشغل Milvus</h3><p>مشغل Milvus متوافق مع ترقيات Pulsar v2 بشكل افتراضي. يمكنك ترقية مثيل Milvus الخاص بك إلى الإصدار 2.5.x بالرجوع إلى <a href="/docs/ar/upgrade_milvus_cluster-operator.md">ترقية مجموعة Milvus العنقودية مع مشغل Milvus</a>.</p>
<p>بمجرد اكتمال الترقية، يمكنك متابعة استخدام Pulsar v2 مع مثيل Milvus الخاص بك.</p>
<h3 id="For-Helm-users" class="common-anchor-header">لمستخدمي Helm</h3><p>قبل الترقية، تأكد من أن</p>
<ul>
<li><p>إصدار Helm الخاص بك أعلى من الإصدار 3.12، ويوصى باستخدام أحدث إصدار.</p>
<p>لمزيد من المعلومات، راجع <a href="https://helm.sh/docs/intro/install/">تثبيت Helm</a>.</p></li>
<li><p>إصدار Kubernetes veresion الخاص بك أعلى من الإصدار v1.20.</p></li>
</ul>
<p>العمليات في هذه المقالة تفترض أن:</p>
<ul>
<li><p>تم تثبيت Milvus في مساحة الأسماء <code translate="no">default</code>.</p></li>
<li><p>اسم إصدار Milvus هو <code translate="no">my-release</code>.</p></li>
</ul>
<p>تحتاج إلى تغيير الملف <code translate="no">values.yaml</code> لتحديد إصدار Pulsar كإصدار v2 قبل ترقية Milvus. الخطوات كالتالي:</p>
<ol>
<li><p>احصل على ملف <code translate="no">values.yaml</code> الحالي لمثيل Milvus الخاص بك.</p>
<pre><code translate="no" class="language-bash">namespace=default
release=my-release
helm -n <span class="hljs-variable">${namespace}</span> get values <span class="hljs-variable">${release}</span> -o yaml &gt; values.yaml
<span class="hljs-built_in">cat</span> values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتحرير الملف <code translate="no">values.yaml</code> لتحديد إصدار Pulsar كإصدار v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># ... omit existing values</span>
<span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">pulsarv3:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
<span class="hljs-attr">image:</span>
  <span class="hljs-attr">all:</span>
    <span class="hljs-attr">repository:</span> <span class="hljs-string">milvusdb/milvus</span>
    <span class="hljs-attr">tag:</span> <span class="hljs-string">v2.5.0-beta</span> 
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة إلى <code translate="no">image</code> ، قم بتغيير <code translate="no">tag</code> إلى إصدار ميلفوس المطلوب (على سبيل المثال <code translate="no">v2.5.0-beta</code>).</p></li>
<li><p>تحديث مخطط Milvus Helm.</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm
helm repo update milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ترقية مثيل Milvus.</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-variable">$namespace</span> upgrade <span class="hljs-variable">$releaase</span> milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Creating-a-new-Milvus-instance-with-Pulsar-v2" class="common-anchor-header">إنشاء مثيل جديد لـ Milvus باستخدام Pulsar v2<button data-href="#Creating-a-new-Milvus-instance-with-Pulsar-v2" class="anchor-icon" translate="no">
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
    </button></h2><p>سيرشدك هذا القسم إلى خطوات إنشاء مثيل Milvus جديد باستخدام Pulsar v2.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">لمستخدمي مشغل Milvus</h3><p>قبل أن تقوم بنشر Milvus v2.5.x، تحتاج إلى تنزيل ملف تعريف موارد العميل (CRD) الخاص ب Milvus وتحريره. للحصول على تفاصيل حول كيفية تثبيت Milvus باستخدام مشغل Milvus، راجع <a href="/docs/ar/install_cluster-milvusoperator.md">تثبيت مجموعة Milvus العنقودية باستخدام مشغل Milvus</a>.</p>
<ol>
<li><p>قم بتنزيل ملف CRD.</p>
<pre><code translate="no" class="language-bash">wget https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتحرير الملف <code translate="no">milvus_cluster_default.yaml</code> لتحديد إصدار Pulsar كإصدار v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">cluster</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">pulsar:</span>
      <span class="hljs-attr">inCluster:</span>
        <span class="hljs-attr">chartVersion:</span> <span class="hljs-string">pulsar-v2</span>
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة إلى <code translate="no">dependencies</code> ، قم بتغيير <code translate="no">pulsar.inCluster.chartVersion</code> إلى <code translate="no">pulsar-v2</code>.</p></li>
<li><p>تابع الخطوات الواردة في <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">تثبيت مجموعة Milvus العنقودية مع مشغل Milvus</a> لنشر Milvus v2.5.x مع Pulsar v2 باستخدام ملف CRD الذي تم تحريره.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_cluster_default.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="For-Helm-users" class="common-anchor-header">لمستخدمي Helm</h3><p>قبل أن تقوم بنشر Milvus v2.5.x، يمكنك إما إعداد ملف <code translate="no">values.yaml</code> أو استخدام المعلمات المضمنة لتحديد إصدار Pulsar. للحصول على تفاصيل حول كيفية تثبيت Milvus باستخدام Helm، راجع <a href="/docs/ar/install_cluster-helm.md">تثبيت مجموعة Milvus العنقودية باستخدام Helm</a>.</p>
<ul>
<li><p>استخدم المعلمات المضمنة لتحديد إصدار Pulsar كإصدار v2.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">true</span>,pulsarv3.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>استخدم ملف <code translate="no">values.yaml</code> لتحديد إصدار Pulsar كإصدار v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">pulsarv3:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد ذلك، قم بنشر Milvus v2.5.x مع Pulsar v2 باستخدام الملف <code translate="no">values.yaml</code>.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
