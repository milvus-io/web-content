---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: تعرف على كيفية ترقية مجموعة ميلفوس العنقودية باستخدام مخطط هيلم.
title: ترقية مجموعة Milvus العنقودية باستخدام مخطط Helm
---
<div class="tab-wrapper"><a href="/docs/ar/upgrade_milvus_cluster-helm.md" class='active '>مشغل</a><a href="/docs/ar/upgrade_milvus_cluster-operator.md" class=''>ميلفوس هيلم</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Helm-Chart" class="common-anchor-header">ترقية مجموعة Milvus العنقودية باستخدام مخطط Helm<button data-href="#Upgrade-Milvus-Cluster-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الدليل كيفية ترقية مجموعة Milvus الخاصة بك باستخدام مخططات Milvus Helm.</p>
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
<li>إصدار Helm &gt;= 3.14.0</li>
<li>إصدار Kubernetes &gt;= 1.20.0</li>
</ul>
<div class="alert note">
<p>منذ الإصدار 4.2.21 من مخطط Milvus-Helm، قدمنا مخطط pulsar-v3.x كإصدار تبعي. للتوافق مع الإصدارات السابقة، يُرجى ترقية الدفة إلى الإصدار 3.14 أو إصدار أحدث، وتأكد من إضافة الخيار <code translate="no">--reset-then-reuse-values</code> كلما استخدمت <code translate="no">helm upgrade</code>.</p>
</div>
<h2 id="Check-Milvus-Helm-Chart" class="common-anchor-header">تحقق من مخطط ميلفوس هيلم<button data-href="#Check-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتشغيل الأوامر التالية للتحقق من إصدارات Milvus الجديدة.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update zilliztech</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm search repo zilliztech/milvus --versions</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>تمت أرشفة ريبو Milvus Helm Charts على <code translate="no">https://milvus-io.github.io/milvus-helm/</code> ويمكنك الحصول على تحديثات أخرى من <code translate="no">https://zilliztech.github.io/milvus-helm/</code> على النحو التالي:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-meta prompt_"># </span><span class="language-bash">upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>لا يزال الريبو المؤرشف متاحًا للمخططات حتى الإصدار 4.0.31. بالنسبة للإصدارات الأحدث، استخدم الريبو الجديد بدلاً من ذلك.</p>
</div>
<pre><code translate="no">NAME                    CHART VERSION   APP VERSION             DESCRIPTION                                       
zilliztech/milvus       4.1.34          2.4.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.33          2.4.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.32          2.4.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.31          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.30          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.29          2.4.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.24          2.3.11                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.23          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.22          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.21          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.20          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.18          2.3.10                  Milvus is an open-source vector database built ... 
zilliztech/milvus       4.1.18          2.3.9                   Milvus is an open-source vector database built ...                                       
zilliztech/milvus       4.1.17          2.3.8                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.16          2.3.7                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.15          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.14          2.3.6                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.13          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.12          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.11          2.3.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.10          2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.9           2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.8           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.7           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.6           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.5           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.4           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.3           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.2           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.1           2.3.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.0           2.3.0                   Milvus is an open-source vector database built ...
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك اختيار مسار الترقية لميلفوس الخاص بك على النحو التالي:</p>
<div style="display: none;">- [إجراء ترقية متجددة] (#إجراء ترقية متجددة) من الإصدار 2.2.3 والإصدارات الأحدث إلى الإصدار 2.5.12.</div>
<ul>
<li><p><a href="#Upgrade-Milvus-using-Helm">ترقية Milvus باستخدام Helm</a> للترقية من إصدار ثانوي قبل الإصدار 2.2.3 إلى الإصدار 2.5.12.</p></li>
<li><p><a href="#Migrate-the-metadata">قم بترحيل البيانات الوصفية</a> قبل الترقية من الإصدار 2.1.x من Milvus إلى الإصدار 2.5.12.</p></li>
</ul>
<div style="display: none;">
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
<p>تتطلب الترقيات المتجددة أن يعمل المنسقون في وضع الاستعداد النشط. يمكنك استخدام <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/upgrade/rollingUpdate.sh">البرنامج النصي</a> الذي نقدمه لتهيئة المنسقين للعمل في وضع الاستعداد النشط وبدء الترقية المتجددة.</p>
<p>استنادًا إلى إمكانيات التحديث المتجدد التي توفرها Kubernetes، يفرض البرنامج النصي أعلاه تحديثًا مرتبًا لعمليات النشر وفقًا لتبعياتها. بالإضافة إلى ذلك، تطبق Milvus آلية لضمان بقاء مكوناتها متوافقة مع تلك التي تعتمد عليها أثناء الترقية، مما يقلل بشكل كبير من وقت تعطل الخدمة المحتمل.</p>
<p>ينطبق البرنامج النصي فقط على ترقية Milvus المثبتة مع Helm. يسرد الجدول التالي علامات الأوامر المتوفرة في البرامج النصية.</p>
<table>
<thead>
<tr><th>المعلمات</th><th>الوصف</th><th>القيمة الافتراضية</th><th>مطلوبة</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>اسم مثيل ميلفوس</td><td><code translate="no">None</code></td><td>صحيح</td></tr>
<tr><td><code translate="no">n</code></td><td>مساحة الاسم الذي تم تثبيت Milvus فيه</td><td><code translate="no">default</code></td><td>خطأ</td></tr>
<tr><td><code translate="no">t</code></td><td>إصدار ميلفوس المستهدف</td><td><code translate="no">None</code></td><td>صحيح</td></tr>
<tr><td><code translate="no">w</code></td><td>علامة صورة ميلفوس الجديدة</td><td><code translate="no">milvusdb/milvus:v2.2.3</code></td><td>صحيح</td></tr>
<tr><td><code translate="no">o</code></td><td>التشغيل</td><td><code translate="no">update</code></td><td>خطأ</td></tr>
</tbody>
</table>
<p>بمجرد التأكد من أن جميع عمليات النشر في مثيل Milvus الخاص بك في حالتها الطبيعية. يمكنك تشغيل الأمر التالي لترقية مثيل Milvus إلى 2.5.12.</p>
<pre><code translate="no" class="language-shell">sh rollingUpdate.sh -n default -i my-release -o update -t 2.5.12 -w &#x27;milvusdb/milvus:v2.5.12&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ol>
<li>يقوم البرنامج النصي بترميز ترتيب ترقية عمليات النشر بشكل ثابت ولا يمكن تغييره.</li>
<li>يستخدم البرنامج النصي <code translate="no">kubectl patch</code> لتحديث عمليات النشر و <code translate="no">kubectl rollout status</code> لمراقبة حالتها.</li>
<li>يستخدم البرنامج النصي <code translate="no">kubectl patch</code> لتحديث التسمية <code translate="no">app.kubernetes.io/version</code> لعمليات النشر إلى التسمية المحددة بعد العلامة <code translate="no">-t</code> في الأمر.</li>
</ol>
</div>
</div>
<h2 id="Upgrade-Milvus-using-Helm" class="common-anchor-header">ترقية ميلفوس باستخدام هيلم<button data-href="#Upgrade-Milvus-using-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>لترقية ميلفوس من إصدار ثانوي قبل الإصدار 2.2.3 إلى الأحدث، قم بتشغيل الأوامر التالية:</p>
<pre><code translate="no" class="language-shell">helm repo update zilliztech
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values --version=4.1.24 # use the helm chart version here
<button class="copy-code-btn"></button></code></pre>
<p>استخدم إصدار مخطط Helm في الأمر السابق. للحصول على تفاصيل حول كيفية الحصول على إصدار مخطط Helm، راجع <a href="#Check-the-Milvus-version">التحقق من إصدار Milvus</a>.</p>
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
    </button></h2><p>منذ الإصدار Milvus 2.2.0، أصبحت البيانات الوصفية غير متوافقة مع تلك الموجودة في الإصدارات السابقة. تفترض مقتطفات الأمثلة التالية ترقية من Milvus 2.1.4 إلى Milvus 2.2.0.</p>
<h3 id="1-Check-the-Milvus-version" class="common-anchor-header">1. تحقق من إصدار ملفوس</h3><p>قم بتشغيل <code translate="no">$ helm list</code> للتحقق من إصدار تطبيق Milvus الخاص بك. يمكنك أن ترى أن <code translate="no">APP VERSION</code> هو 2.1.4.</p>
<pre><code translate="no">NAME                NAMESPACE   REVISION    UPDATED                                 STATUS      CHART           APP VERSION    
<span class="hljs-keyword">new</span><span class="hljs-operator">-</span><span class="hljs-keyword">release</span>         <span class="hljs-keyword">default</span>     <span class="hljs-number">1</span>           <span class="hljs-number">2022</span><span class="hljs-number">-11</span><span class="hljs-number">-21</span> <span class="hljs-number">15</span>:<span class="hljs-number">41</span>:<span class="hljs-number">25.51539</span> <span class="hljs-operator">+</span><span class="hljs-number">0800</span> CST     deployed    milvus<span class="hljs-number">-3.2</span><span class="hljs-number">.18</span>   <span class="hljs-number">2.1</span><span class="hljs-number">.4</span> 
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Check-the-running-pods" class="common-anchor-header">2. تحقق من القرون قيد التشغيل</h3><p>قم بتشغيل <code translate="no">$ kubectl get pods</code> للتحقق من القرون قيد التشغيل. يمكنك رؤية الإخراج التالي.</p>
<pre><code translate="no">NAME                                             READY   STATUS      RESTARTS   AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datacoord<span class="hljs-number">-664</span>c58798d<span class="hljs-operator">-</span>fl75s    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-5</span>f75686c55<span class="hljs-operator">-</span>xfg2r     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>indexcoord<span class="hljs-number">-5</span>f98b97589<span class="hljs-number">-2</span>l48r   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>indexnode<span class="hljs-number">-857</span>b4ddf98<span class="hljs-operator">-</span>vmd75    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-6</span>c548f787f<span class="hljs-operator">-</span>scspp        <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querycoord<span class="hljs-operator">-</span>c454f44cd<span class="hljs-operator">-</span>dwmwq    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-76</span>bb4946d<span class="hljs-operator">-</span>lbrz6     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>rootcoord<span class="hljs-number">-7764</span>c5b686<span class="hljs-number">-62</span>msm    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-0</span>                              <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-1</span>                              <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-2</span>                              <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-3</span>                              <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>bookie<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>bookie<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>bookie<span class="hljs-number">-2</span>                      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>bookie<span class="hljs-operator">-</span>init<span class="hljs-operator">-</span>tjxpj             <span class="hljs-number">0</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>broker<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>proxy<span class="hljs-number">-0</span>                       <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>init<span class="hljs-operator">-</span>c8vvc             <span class="hljs-number">0</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>recovery<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>zookeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>zookeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">20</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>zookeeper<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">20</span>m
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-image-tag" class="common-anchor-header">3. تحقق من علامة الصورة</h3><p>تحقق من علامة الصورة للبود <code translate="no">my-release-milvus-proxy-6c548f787f-scspp</code>. يمكنك رؤية إصدار مجموعة ميلفوس الخاص بك هو الإصدار 2.1.4.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods my-release-milvus-proxy-6c548f787f-scspp -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">milvusdb/milvus:v2.1.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-Migrate-the-metadata" class="common-anchor-header">4. ترحيل البيانات الوصفية</h3><p>من التغييرات الرئيسية في Milvus 2.2 هو بنية البيانات الوصفية لفهارس المقاطع. لذلك ، تحتاج إلى استخدام Helm لترحيل البيانات الوصفية أثناء ترقية Milvus من الإصدار 2.1.x إلى الإصدار 2.2.0. إليك <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">برنامج نصي</a> لترحيل البيانات الوصفية بأمان.</p>
<p>ينطبق هذا البرنامج النصي فقط على Milvus المثبت على مجموعة K8s. قم بالرجوع إلى الإصدار السابق باستخدام عملية التراجع أولاً في حالة حدوث خطأ أثناء العملية.</p>
<p>يسرد الجدول التالي العمليات التي يمكنك القيام بها لترحيل البيانات الوصفية.</p>
<table>
<thead>
<tr><th>المعلمات</th><th>الوصف</th><th>القيمة الافتراضية</th><th>مطلوبة</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>اسم مثيل Milvus.</td><td><code translate="no">None</code></td><td>صحيح</td></tr>
<tr><td><code translate="no">n</code></td><td>مساحة الاسم التي تم تثبيت Milvus فيها.</td><td><code translate="no">default</code></td><td>خطأ</td></tr>
<tr><td><code translate="no">s</code></td><td>إصدار Milvus المصدر.</td><td><code translate="no">None</code></td><td>صحيح</td></tr>
<tr><td><code translate="no">t</code></td><td>إصدار ميلفوس الهدف.</td><td><code translate="no">None</code></td><td>صحيح</td></tr>
<tr><td><code translate="no">r</code></td><td>المسار الجذر لـ Milvus meta.</td><td><code translate="no">by-dev</code></td><td>خطأ</td></tr>
<tr><td><code translate="no">w</code></td><td>علامة صورة ملفوس الجديدة.</td><td><code translate="no">milvusdb/milvus:v2.2.0</code></td><td>خطأ</td></tr>
<tr><td><code translate="no">m</code></td><td>علامة صورة الترحيل الوصفية للصور الوصفية.</td><td><code translate="no">milvusdb/meta-migration:v2.2.0</code></td><td>خطأ</td></tr>
<tr><td><code translate="no">o</code></td><td>عملية الترحيل الوصفية.</td><td><code translate="no">migrate</code></td><td>خطأ</td></tr>
<tr><td><code translate="no">d</code></td><td>ما إذا كان سيتم حذف جراب الترحيل بعد اكتمال الترحيل.</td><td><code translate="no">false</code></td><td>خطأ</td></tr>
<tr><td><code translate="no">c</code></td><td>فئة التخزين لـ pvc الترحيل الوصفية.</td><td><code translate="no">default storage class</code></td><td>خطأ</td></tr>
<tr><td><code translate="no">e</code></td><td>نقطة إن بوينت إلخd المستخدمة من قبل ميلفوس.</td><td><code translate="no">etcd svc installed with milvus</code></td><td>خطأ</td></tr>
</tbody>
</table>
<h4 id="1-Migrate-the-metadata" class="common-anchor-header">1. ترحيل البيانات الوصفية</h4><ol>
<li>تحميل <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">البرنامج النصي للترحيل</a>.</li>
<li>إيقاف مكونات Milvus. يمكن أن تتسبب أي جلسة عمل مباشرة في Milvus etcd في فشل الترحيل.</li>
<li>إنشاء نسخة احتياطية للبيانات الوصفية ل Milvus.</li>
<li>ترحيل البيانات الوصفية ل Milvus.</li>
<li>ابدأ تشغيل مكونات Milvus بصورة جديدة.</li>
</ol>
<h4 id="2-Upgrade-Milvus-from-v21x-to-220" class="common-anchor-header">2. ترقية ملفوس من الإصدار 2.1.x إلى 2.2.0</h4><p>تفترض الأوامر التالية أنك قمت بترقية ملفوس من الإصدار 2.1.4 إلى 2.2.0. قم بتغييرها إلى الإصدارات التي تناسب احتياجاتك.</p>
<ol>
<li><p>حدد اسم مثيل Milvus وإصدار Milvus المصدر وإصدار Milvus الهدف.</p>
<pre><code translate="no">./migrate.sh -i my-release -s 2.1.4 -t 2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>حدد مساحة الاسم مع <code translate="no">-n</code> إذا لم يكن Milvus الخاص بك مثبتًا في مساحة اسم K8s الافتراضية.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>حدد مسار الجذر مع <code translate="no">-r</code> إذا كان Milvus الخاص بك مثبتًا مع المخصص <code translate="no">rootpath</code>.</p>
<pre><code translate="no">./migrate<span class="hljs-selector-class">.sh</span> -<span class="hljs-selector-tag">i</span> my-release -n milvus -s <span class="hljs-number">2.1</span>.<span class="hljs-number">4</span> -t <span class="hljs-number">2.2</span>.<span class="hljs-number">0</span> -<span class="hljs-attribute">r</span> by-dev
<button class="copy-code-btn"></button></code></pre></li>
<li><p>حدد علامة الصورة مع <code translate="no">-w</code> إذا كان Milvus الخاص بك مثبتًا مع مخصص <code translate="no">image</code>.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -w milvusdb/milvus:v2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتعيين <code translate="no">-d true</code> إذا كنت تريد إزالة جراب الترحيل تلقائيًا بعد اكتمال الترحيل.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -w milvusdb/milvus:v2.2.0 -d <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>التراجع والترحيل مرة أخرى إذا فشلت عملية الترحيل.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -o rollback -w milvusdb/milvus:v2.1.4
./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -o migrate -w milvusdb/milvus:v2.2.0
<button class="copy-code-btn"></button></code></pre></li>
</ol>
