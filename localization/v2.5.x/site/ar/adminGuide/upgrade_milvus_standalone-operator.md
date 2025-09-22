---
id: upgrade_milvus_standalone-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: تعرف على كيفية ترقية ميلفوس المستقل مع مشغل ميلفوس.
title: ترقية Milvus Standalone مع مشغل Milvus
---
<div class="tab-wrapper"><a href="/docs/ar/v2.5.x/upgrade_milvus_standalone-operator.md" class='active '>مشغل ميلفوس ميلفوس</a><a href="/docs/ar/v2.5.x/upgrade_milvus_standalone-helm.md" class=''>هيلم</a><a href="/docs/ar/v2.5.x/upgrade_milvus_standalone-operator.md" class='active '>دوكر</a><a href="/docs/ar/v2.5.x/upgrade_milvus_standalone-docker.md" class=''>كومبوزر</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Milvus-Operator" class="common-anchor-header">ترقية Milvus Standalone مع مشغل Milvus<button data-href="#Upgrade-Milvus-Standalone-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الدليل كيفية ترقية Milvus المستقل الخاص بك مع مشغل Milvus.</p>
<h2 id="Upgrade-your-Milvus-operator" class="common-anchor-header">ترقية مشغل ميلفوس الخاص بك<button data-href="#Upgrade-your-Milvus-operator" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتشغيل الأمر التالي لترقية إصدار مشغل Milvus الخاص بك إلى الإصدار v1.2.0.</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> zilliztech-milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator/</span>
helm repo update zilliztech-milvus-<span class="hljs-keyword">operator</span>
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> zilliztech-milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد أن تقوم بترقية مشغل ميلفوس الخاص بك إلى أحدث إصدار، يكون لديك الخيارات التالية:</p>
<ul>
<li>لترقية ميلفوس من الإصدار 2.2.3 أو الإصدارات الأحدث إلى الإصدار 2.5.18، يمكنك <a href="#Conduct-a-rolling-upgrade">إجراء ترقية متجددة</a>.</li>
<li>لترقية ميلفوس من إصدار ثانوي قبل الإصدار 2.2.3 إلى 2.5.18، يُنصح بترقية ميلفوس <a href="#Upgrade-Milvus-by-changing-its-image">عن طريق تغيير إصدار الصورة الخاص به</a>.</li>
<li>لترقية Milvus من الإصدار 2.1.x إلى الإصدار 2.5.18، تحتاج إلى <a href="#Migrate-the-metadata">ترحيل البيانات الوصفية</a> قبل الترقية الفعلية.</li>
</ul>
<h2 id="Conduct-a-rolling-upgrade" class="common-anchor-header">إجراء ترقية متجددة<button data-href="#Conduct-a-rolling-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>منذ الإصدار Milvus 2.2.3، يمكنك تكوين منسقي Milvus للعمل في وضع الاستعداد النشط وتمكين ميزة الترقية المتجددة لهم، بحيث يمكن لـ Milvus الاستجابة للطلبات الواردة أثناء ترقيات المنسق. في الإصدارات السابقة، يجب إزالة المنسقين ثم إنشاؤهم أثناء الترقية، مما قد يؤدي إلى تعطل معين للخدمة.</p>
<p>استنادًا إلى إمكانيات التحديث المتداول التي توفرها Kubernetes، يفرض مشغل Milvus تحديثًا مرتبًا لعمليات النشر وفقًا لتبعياتها. بالإضافة إلى ذلك، تطبق Milvus آلية لضمان بقاء مكوناتها متوافقة مع تلك التي تعتمد عليها أثناء الترقية، مما يقلل بشكل كبير من وقت تعطل الخدمة المحتمل.</p>
<p>يتم تعطيل ميزة الترقية المتجددة بشكل افتراضي. تحتاج إلى تمكينها بشكل صريح من خلال ملف تهيئة.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">rollingUpgrade</span> <span class="hljs-comment"># Default value, can be omitted</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.18</span>
<button class="copy-code-btn"></button></code></pre>
<p>في ملف التكوين أعلاه، اضبط <code translate="no">spec.components.enableRollingUpdate</code> على <code translate="no">true</code> واضبط <code translate="no">spec.components.image</code> على إصدار Milvus المطلوب.</p>
<p>بشكل افتراضي، يقوم ملف Milvus بإجراء ترقية متجددة للمنسقين بطريقة مرتبة، حيث يقوم باستبدال صور حجرة المنسق واحدة تلو الأخرى. لتقليل وقت الترقية، ضع في اعتبارك تعيين <code translate="no">spec.components.imageUpdateMode</code> إلى <code translate="no">all</code> بحيث يستبدل ميلفوس جميع صور الكبسولات في نفس الوقت.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">all</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.18</span>
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك تعيين <code translate="no">spec.components.imageUpdateMode</code> إلى <code translate="no">rollingDowngrade</code> لجعل Milvus يستبدل صور جراب المنسق بإصدار أقل.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">rollingDowngrade</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:&lt;some-older-version&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>ثم احفظ التكوين الخاص بك كملف YAML (على سبيل المثال، <code translate="no">milvusupgrade.yaml</code>) وقم بتصحيح ملف التكوين هذا إلى مثيل Milvus الخاص بك على النحو التالي:</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">قم بترقية Milvus عن طريق تغيير صورته<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>في الحالات العادية، يمكنك ببساطة تحديث Milvus الخاص بك إلى الأحدث عن طريق تغيير صورته. ومع ذلك، لاحظ أنه سيكون هناك وقت تعطل معين عند ترقية ميلفوس بهذه الطريقة.</p>
<p>قم بتكوين ملف تهيئة على النحو التالي واحفظه باسم <strong>milvusupgrade.yaml:</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">components:</span>
   <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.18</span>
<button class="copy-code-btn"></button></code></pre>
<p>ثم قم بتشغيل ما يلي لتنفيذ الترقية:</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<h2 id="Migrate-the-metadata" class="common-anchor-header">ترحيل البيانات الوصفية<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>منذ الإصدار Milvus 2.2.0، أصبحت البيانات الوصفية غير متوافقة مع تلك الموجودة في الإصدارات السابقة. تفترض مقتطفات الأمثلة التالية ترقية من Milvus 2.1.4 إلى Milvus v2.5.18.</p>
<h3 id="1-Create-a-yaml-file-for-metadata-migration" class="common-anchor-header">1. إنشاء ملف <code translate="no">.yaml</code> لترحيل البيانات الوصفية<button data-href="#1-Create-a-yaml-file-for-metadata-migration" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بإنشاء ملف ترحيل البيانات الوصفية. وفيما يلي مثال على ذلك. تحتاج إلى تحديد <code translate="no">name</code> و <code translate="no">sourceVersion</code> و <code translate="no">targetVersion</code> في ملف التكوين. المثال التالي يحدد <code translate="no">name</code> إلى <code translate="no">my-release-upgrade</code> و <code translate="no">sourceVersion</code> إلى <code translate="no">v2.1.4</code> و <code translate="no">targetVersion</code> إلى <code translate="no">v2.5.18</code>. هذا يعني أنه سيتم ترقية مثيل Milvus الخاص بك من الإصدار 2.1.4 إلى الإصدار 2.5.18.</p>
<pre><code translate="no"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">MilvusUpgrade</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-upgrade</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">milvus:</span>
    <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">sourceVersion:</span> <span class="hljs-string">&quot;v2.1.4&quot;</span>
  <span class="hljs-attr">targetVersion:</span> <span class="hljs-string">&quot;v2.5.18&quot;</span>
  <span class="hljs-comment"># below are some omit default values:</span>
  <span class="hljs-comment"># targetImage: &quot;milvusdb/milvus:v2.5.18&quot;</span>
  <span class="hljs-comment"># toolImage: &quot;milvusdb/meta-migration:v2.2.0&quot;</span>
  <span class="hljs-comment"># operation: upgrade</span>
  <span class="hljs-comment"># rollbackIfFailed: true</span>
  <span class="hljs-comment"># backupPVC: &quot;&quot;</span>
  <span class="hljs-comment"># maxRetry: 3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Apply-the-new-configuration" class="common-anchor-header">2. تطبيق التكوين الجديد<button data-href="#2-Apply-the-new-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتشغيل الأمر التالي لتطبيق التكوين الجديد.</p>
<pre><code translate="no">$ kubectl <span class="hljs-built_in">create</span> -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/<span class="hljs-built_in">config</span>/samples/milvusupgrade.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-status-of-metadata-migration" class="common-anchor-header">3. التحقق من حالة ترحيل البيانات الوصفية<button data-href="#3-Check-the-status-of-metadata-migration" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتشغيل الأمر التالي للتحقق من حالة ترحيل بيانات التعريف.</p>
<pre><code translate="no">kubectl <span class="hljs-keyword">describe</span> milvus <span class="hljs-keyword">release</span><span class="hljs-operator">-</span>name
<button class="copy-code-btn"></button></code></pre>
<p>تعني الحالة <code translate="no">ready</code> في الإخراج أن حالة في الإخراج أن عملية ترحيل البيانات الوصفية ناجحة.</p>
<p>أو يمكنك أيضًا تشغيل <code translate="no">kubectl get pod</code> للتحقق من جميع الكبسولات. إذا كانت جميع القرون <code translate="no">ready</code> ، فإن ترحيل البيانات الوصفية ناجح.</p>
<h3 id="4-Delete-my-release-upgrade" class="common-anchor-header">4. حذف <code translate="no">my-release-upgrade</code><button data-href="#4-Delete-my-release-upgrade" class="anchor-icon" translate="no">
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
    </button></h3><p>عند نجاح الترقية، احذف <code translate="no">my-release-upgrade</code> في ملف YAML.</p>
