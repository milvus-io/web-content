---
id: upgrade-pulsar-v3.md
related_key: upgrade pulsar v3
summary: >-
  تعرّف على كيفية ترقية Pulsar من V2 إلى V3 في Milvus بحيث يمكنك استخدام أحدث
  إصدار من Milvus v2.5.x.
title: قم بترقية بولسار في ميلفوس من V2 إلى V3
---

<h1 id="Upgrading-Pulsar-​" class="common-anchor-header">ترقية بولسار<button data-href="#Upgrading-Pulsar-​" class="anchor-icon" translate="no">
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
    </button></h1><p>توضح هذه المقالة عملية ترقية مكون Pulsar من V2 إلى V3 إذا كان لديك بالفعل نشر Milvus يعمل مع Pulsar V2.</p>
<p>منذ الإصدار 2.5 من Milvus، سيستخدم <strong>Milvus-helm</strong> و <strong>milvus-oper</strong> Pulsar V3 افتراضيًا لإصلاح بعض الأخطاء والثغرات الأمنية. بينما يتوافق Milvus 2.5 مع Pulsar 2.x، فإن الترقية إلى Pulsar V3 اختيارية. لتحسين الثبات والأداء، نوصي بالترقية إلى Pulsar V3.</p>
<p>إذا كنت تفضل استخدام Pulsar V2 مع Milvus v2.5.x، اقرأ <a href="/docs/ar/v2.5.x/use-pulsar-v2.md">استخدام Pulsar V2 مع Milvus v2.5.x</a>.</p>
<div class="alert note">
<ol>
<li><p>تتطلب عملية الترقية انقطاعًا قصيرًا للخدمة (عادةً ما يستغرق الأمر من بضع دقائق إلى أكثر من عشر دقائق، اعتمادًا على كمية البيانات).</p></li>
<li><p>قبل العملية، تحتاج إلى إيقاف جميع العملاء قيد التشغيل من كتابة البيانات إلى ميلفوس. وإلا فقد تُفقد البيانات المكتوبة.</p></li>
<li><p>تفترض هذه المقالة أن Milvus مثبت في مساحة الاسم <code translate="no">default</code> واسمه <code translate="no">my-release</code>. يرجى تغيير المعلمات إلى مساحة الاسم واسم الإصدار الخاص بك أثناء تنفيذ الأوامر المنسوخة من هذه الصفحة.</p></li>
<li><p>تأكد من أن بيئة العمل الخاصة بك لديها أذونات ضمن مساحة الاسم المذكورة أعلاه في مجموعة Kubernetes وتم تثبيت الأوامر التالية.</p>
<p>أ. <code translate="no">kubectl</code> &gt;= 1.20</p>
<p>ب. <code translate="no">helm</code> &gt;= 3.14.0</p>
<p>c. <code translate="no">cat</code> ، <code translate="no">grep</code> ، <code translate="no">awk</code> لعمليات معالجة السلسلة لعمليات معالجة السلسلة</p>
<p>د. <code translate="no">curl</code> أو <strong>أتو v2.4+</strong> للتفاعل مع واجهة برمجة تطبيقات إدارة ميلفوس</p></li>
</ol>
</div>
<h2 id="Roadmap" class="common-anchor-header">خارطة الطريق<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>تتضمن عملية الترقية الخطوات التالية:</p>
<ol>
<li><p><a href="#Persist-data-not-consumed-in-Pulsar">استمرار البيانات غير المستهلكة في بولسار.</a></p></li>
<li><p><a href="#Stop-Milvus-and-delete-Pulsar-V2">إيقاف ميلفوس وحذف بولسار V2.</a></p></li>
<li><p><a href="#Start-Pulsar-V3-and-Milvus">بدء تشغيل بولسار V3 وميلفوس.</a></p></li>
</ol>
<h2 id="Procedures" class="common-anchor-header">الإجراءات<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>يقدم هذا القسم الإجراءات التفصيلية لترقية بولسار من V2 إلى V3 في ميلفوس.</p>
<h3 id="Persist-data-not-consumed-in-Pulsar" class="common-anchor-header">استمرار البيانات غير المستهلكة في بولسار</h3><p>في هذه الخطوة، تحتاج في هذه الخطوة إلى التأكد من استمرار البيانات الموجودة في بولسار إلى خدمة تخزين الكائنات. هناك طريقتان متاحتان، ويمكنك اختيار الطريقة التي تناسب احتياجاتك.</p>
<h4 id="Approach-1-Using-Attu" class="common-anchor-header">النهج 1: استخدام أتو</h4><p>إذا لم يكن لديك سوى عدد قليل من المجموعات في عملية نشر Milvus العاملة الخاصة بك مع عدم وجود العديد من الشرائح، يمكنك استخدام Attu لاستمرار البيانات إلى خدمة تخزين الكائنات.</p>
<ol>
<li><p>حدد كل مجموعة في جميع قواعد البيانات الخاصة بك، وادخل إلى لوحة <code translate="no">Segments</code> ، وانقر فوق الزر <code translate="no">Flush</code> </p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/attu-select-collection.png" alt="Segment panel of a collection" class="doc-image" id="segment-panel-of-a-collection" />
   </span> <span class="img-wrapper"> <span>لوحة شريحة من مجموعة</span> </span></p></li>
<li><p>ثم عند النافذة المنبثقة، انقر فوق <code translate="no">Flush</code> مرة أخرى.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/data-flush-prompt.png" alt="Data flush prompt in Attu" class="doc-image" id="data-flush-prompt-in-attu" />
   </span> <span class="img-wrapper"> <span>مطالبة تدفق البيانات في أتو</span> </span></p></li>
<li><p>ثم انتظر حتى تصبح جميع حالات الشرائح الثابتة للمجموعات <code translate="no">Flushed</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/view-data-peristent-process.png" alt="View data flush status in Attu" class="doc-image" id="view-data-flush-status-in-attu" />
   </span> <span class="img-wrapper"> <span>عرض حالة تدفق البيانات في أتو</span> </span></p></li>
</ol>
<h4 id="Approach-2-Using-management-API" class="common-anchor-header">النهج 2: استخدام واجهة برمجة تطبيقات الإدارة</h4><ol>
<li><p>وكيل المنفذ 9091 من وكيل Milvus إلى المضيف المحلي للعمليات اللاحقة.</p>
<pre><code translate="no" class="language-bash">kubectl -n <span class="hljs-keyword">default</span> port-forward deploy/my-release-milvus-proxy <span class="hljs-number">9091</span>:<span class="hljs-number">9091</span> &amp;​
<button class="copy-code-btn"></button></code></pre>
<p>الإخراج.</p>
<pre><code translate="no" class="language-yaml">[<span class="hljs-meta">1</span>] <span class="hljs-number">8116</span>​
Forwarding <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">9091</span> -&gt; <span class="hljs-number">9091</span>​

<button class="copy-code-btn"></button></code></pre></li>

<li><p>حفظ Pid للتنظيف اللاحق.</p>
<pre><code translate="no" class="language-yaml">pid=8116​

<button class="copy-code-btn"></button></code></pre></li>

<li><p>قم بتشغيل إجراء استمرار جميع البيانات المدرجة من بولسار إلى مخزن أوجبيكت.</p>
<pre><code translate="no" class="language-bash">curl 127.0.0.1:9091/api/v1/collections \​
|curl 127.0.0.1:9091/api/v1/persist -d @/dev/stdin\​
|jq <span class="hljs-string">&#x27;.flush_coll_segIDs&#x27;</span>| jq <span class="hljs-string">&#x27;[.[] | .data[]]&#x27;</span> | jq <span class="hljs-string">&#x27;{segmentIDs: (.)}&#x27;</span> \​
&gt; flushing_segments.json​
<span class="hljs-built_in">cat</span> flushing_segments.json​

<button class="copy-code-btn"></button></code></pre>

<p>الإخراج.</p>
<pre><code translate="no" class="language-yaml">{​
  <span class="hljs-string">&quot;segmentIDs&quot;</span>: [​
    <span class="hljs-number">454097953998181000</span>,​
    <span class="hljs-number">454097953999383600</span>,​
    <span class="hljs-number">454097953998180800</span>​
  ]​
}​

<button class="copy-code-btn"></button></code></pre></li>

<li><p>تحقق من مسح جميع المقاطع.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> flushing_segments.json|  curl -X GET 127.0.0.1:9091/api/v1/persist/state -d @/dev/stdin ​

<button class="copy-code-btn"></button></code></pre>

<p>عند الانتهاء، يجب أن ترى المخرجات التالية</p>
<pre><code translate="no" class="language-json">{<span class="hljs-string">&quot;status&quot;</span>:{},<span class="hljs-string">&quot;flushed&quot;</span>:<span class="hljs-literal">true</span>}​

<button class="copy-code-btn"></button></code></pre></li>

<li><p>إيقاف العملية الخلفية <code translate="no">kubectl port-forward</code> </p>
<pre><code translate="no" class="language-yaml"><span class="hljs-built_in">kill</span> <span class="hljs-variable">$pid</span>​

<button class="copy-code-btn"></button></code></pre>

<p>الإخراج.</p>
<pre><code translate="no" class="language-yaml">[<span class="hljs-meta">1</span>]  + <span class="hljs-number">8116</span> terminated  kubectl -n <span class="hljs-literal">default</span> port-forward deploy/my-release-milvus-proxy <span class="hljs-number">9091</span>:<span class="hljs-number">9091</span>                      ​

<button class="copy-code-btn"></button></code></pre></li>

</ol>
<h3 id="Stop-Milvus-and-delete-Pulsar-V2" class="common-anchor-header">أوقف Milvus واحذف Pulsar V2</h3><p>في هذه الخطوة، تحتاج إلى إيقاف جراب Milvus وحذف نشر Pulsar V2. هناك قسمان منفصلان متاحان:</p>
<ul>
<li><p>لمستخدمي Milvus Helm</p>
<p>إذا كنت قد قمت بتثبيت Milvus باستخدام مخطط Milvus Helm، انتقل إلى <a href="#Delete-Pulsar-V2-using-Helm">حذف Pulsar v2 باستخدام Helm</a>.</p></li>
<li><p>لمستخدمي مشغل Milvus Helm</p>
<p>إذا كنت قد قمت بتثبيت Milvus باستخدام مشغل Milvus، انتقل إلى <a href="#Delete-Pulsar-V2-using-Milvus-Operator">حذف Pulsar v2 باستخدام</a> مشغل Milvus.</p></li>
</ul>
<h4 id="Delete-Pulsar-V2-using-Helm" class="common-anchor-header">حذف Pulsar V2 باستخدام Helm</h4><p>إذا كنت قد قمت بتثبيت Milvus باستخدام مخطط Milvus Helm، اتبع الخطوات التالية لإيقاف جراب Milvus وحذف نشر Pulsar V2.</p>
<ol>
<li><p>احفظ قيم إصدار Milvus الحالية في <code translate="no">values.yaml</code> لاستعادتها لاحقًا.</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-literal">default</span> <span class="hljs-keyword">get</span> values my-release -o yaml &gt; values.yaml​
cat values.yaml​

<button class="copy-code-btn"></button></code></pre></li>

<li><p>استخدم الأمر لإيقاف ميلفوس وجميع التبعيات. لا تقلق بشأن وحدات تخزين البيانات، فسيتم الاحتفاظ بها بشكل افتراضي.</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-keyword">default</span> uninstall my-release​

<button class="copy-code-btn"></button></code></pre>

<p>الإخراج</p>
<pre><code translate="no" class="language-bash">These resources were kept due to the resource policy:​
[<span class="hljs-meta">PersistentVolumeClaim</span>] my-release-minio​
​
release <span class="hljs-string">&quot;my-release&quot;</span> uninstalled​

<button class="copy-code-btn"></button></code></pre></li>

<li><p>يجب مسح قائمة PVCs و PVs النابضة (مطالبات وحدة التخزين الثابتة ووحدات التخزين الثابتة)</p>
<pre><code translate="no" class="language-bash">kubectl -n default get pvc -lapp=pulsar,release=my-release |grep -v NAME |awk <span class="hljs-string">&#x27;{print $1}&#x27;</span> &gt; pulsar-pvcs.txt​
kubectl -n default get pvc -lapp=pulsar,release=my-release -o custom-columns=VOL:.spec.volumeName|grep -v VOL &gt; pulsar-pvs.txt​
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Volume Claims:&quot;</span>​
<span class="hljs-built_in">cat</span> pulsar-pvcs.txt​
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Volumes:&quot;</span>​
<span class="hljs-built_in">cat</span> pulsar-pvs.txt​

<button class="copy-code-btn"></button></code></pre>

<p>الإخراج</p>
<pre><code translate="no" class="language-yaml">Volume Claims:​
my-release-pulsar-bookie-journal-my-release-pulsar-bookie-0​
my-release-pulsar-bookie-journal-my-release-pulsar-bookie-1​
my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-0​
my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-1​
my-release-pulsar-zookeeper-data-my-release-pulsar-zookeeper-0​
Volumes:​
pvc-f590a4de-df31-4ca8-a424-007eac3c619a​
pvc-17b0e215-3e14-4d14-901e-1a1dda9ff5a3​
pvc-72f83c25-6ea1-45ee-9559-0b783f2c530b​
pvc-60dcb6e4-760d-46c7-af1a-d1fc153b0caf​
pvc-2da33f64-c053-42b9-bb72-c5d50779aa0a​

<button class="copy-code-btn"></button></code></pre></li>

<li><p>تحقق مما إذا كانت قائمة PVCs <code translate="no">pulsar-pvcs.txt</code> كلها لـ Pulsar. بمجرد التأكد من عدم وجود خطأ، احذف PVCs.</p>
<pre><code translate="no" class="language-bash">cat pulsar-pvcs.<span class="hljs-property">txt</span> |xargs -I {} kubectl -n <span class="hljs-keyword">default</span> <span class="hljs-keyword">delete</span> pvc {} --wait=<span class="hljs-literal">false</span>​

<button class="copy-code-btn"></button></code></pre>

<p>الإخراج.</p>
<pre><code translate="no" class="language-yaml">persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-bookie-journal-my-release-pulsar-bookie-0&quot;</span> deleted​
persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-bookie-journal-my-release-pulsar-bookie-1&quot;</span> deleted​
persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-0&quot;</span> deleted​
persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-1&quot;</span> deleted​
persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-zookeeper-data-my-release-pulsar-zookeeper-0&quot;</span> deleted​

<button class="copy-code-btn"></button></code></pre></li>

<li><p>(اختياري) اعتمادًا على فئة التخزين التي توفر PVC، قد تحتاج أيضًا إلى إزالة PVC يدويًا.</p>
<pre><code translate="no" class="language-yaml">cat pulsar-pvs.<span class="hljs-property">txt</span> |xargs -I {} kubectl -n <span class="hljs-keyword">default</span> <span class="hljs-keyword">delete</span> pvc {} --wait=<span class="hljs-literal">false</span>​

<button class="copy-code-btn"></button></code></pre>

<p>لا بأس إذا أخرجت أخطاء NotFound. تم حذفه بالفعل بواسطة وحدات تحكم kubernetes.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-f590a4de-df31-4ca8-a424-007eac3c619a&quot;</span> not found​
<span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-17b0e215-3e14-4d14-901e-1a1dda9ff5a3&quot;</span> not found​
<span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-72f83c25-6ea1-45ee-9559-0b783f2c530b&quot;</span> not found​
<span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-60dcb6e4-760d-46c7-af1a-d1fc153b0caf&quot;</span> not found​
<span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-2da33f64-c053-42b9-bb72-c5d50779aa0a&quot;</span> not found​

<button class="copy-code-btn"></button></code></pre></li>

</ol>
<h4 id="Delete-Pulsar-V2-using-Milvus-Operator" class="common-anchor-header">حذف Pulsar V2 باستخدام مشغل Milvus</h4><p>إذا كنت قد قمت بتثبيت Milvus باستخدام مشغل Milvus، اتبع الخطوات أدناه لإيقاف جراب Milvus وحذف نشر Pulsar V2.</p>
<ol>
<li><p>احفظ بيان Milvus الحالي في <code translate="no">milvus.yaml</code> لاستخدامه لاحقًا.</p>
<pre><code translate="no" class="language-bash">kubectl -n <span class="hljs-literal">default</span> <span class="hljs-keyword">get</span> milvus my-release -o yaml &gt; milvus.yaml​
head milvus.yaml -n <span class="hljs-number">20</span>​

<button class="copy-code-btn"></button></code></pre>

<p>الإخراج.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1​
kind: Milvus​
metadata:​
  annotations:​
    milvus.io/dependency-values-merged: <span class="hljs-string">&quot;true&quot;</span>​
    milvus.io/pod-service-label-added: <span class="hljs-string">&quot;true&quot;</span>​
    milvus.io/querynode-current-group-id: <span class="hljs-string">&quot;0&quot;</span>​
  creationTimestamp: <span class="hljs-string">&quot;2024-11-22T08:06:59Z&quot;</span>​
  finalizers:​
  - milvus.milvus.io/finalizer​
  generation: 3​
  labels:​
    app: milvus​
    milvus.io/operator-version: 1.1.2​
name: my-release​
namespace: default​
resourceVersion: <span class="hljs-string">&quot;692217324&quot;</span>​
uid: 7a469ed0-9df1-494e-bd9a-340fac4305b5​
spec:​
  components:​

<button class="copy-code-btn"></button></code></pre></li>

<li><p>إنشاء ملف <code translate="no">patch.yaml</code> بالمحتوى التالي.</p>
<pre><code translate="no" class="language-yaml"># a patch to retain etcd &amp; storage data and <span class="hljs-built_in">delete</span> pulsar data while <span class="hljs-built_in">delete</span> milvus​
spec:​
  dependencies:​
    etcd:​
      inCluster:​
        deletionPolicy: Retain​
        pvcDeletion: <span class="hljs-literal">false</span>​
    storage:​
      inCluster:​
        deletionPolicy: Retain​
        pvcDeletion: <span class="hljs-literal">false</span>​
    pulsar:​
      inCluster:​
        deletionPolicy: Delete​
        pvcDeletion: <span class="hljs-literal">true</span>​

<button class="copy-code-btn"></button></code></pre></li>

<li><p>استخدم <code translate="no">kubectl patch</code> للاحتفاظ ببيانات إلخd وبيانات التخزين وحذف بيانات بولسار أثناء حذف ميلفوس.</p>
<pre><code translate="no" class="language-yaml">kubectl -n <span class="hljs-keyword">default</span> patch milvus my-release --patch-file patch.yaml --<span class="hljs-keyword">type</span>=merge​

<button class="copy-code-btn"></button></code></pre>

<p>الإخراج.</p>
<pre><code translate="no" class="language-bash">milvus.milvus.io/my-release patched​

<button class="copy-code-btn"></button></code></pre></li>

<li><p>إيقاف ميلفوس وحذف بولسار V2. لا تقلق بشأن وحدات تخزين بيانات إلخd وبيانات تخزين الكائنات، سيتم الاحتفاظ بها افتراضيًا.</p>
<pre><code translate="no" class="language-bash">kubectl -n <span class="hljs-keyword">default</span> <span class="hljs-keyword">delete</span> milvus my-release --wait=<span class="hljs-literal">false</span>​
kubectl -n <span class="hljs-keyword">default</span> get milvus my-release​
kubectl -n <span class="hljs-keyword">default</span> <span class="hljs-keyword">delete</span> milvus my-release --wait=<span class="hljs-literal">true</span>​

<button class="copy-code-btn"></button></code></pre>

<p>الإخراج: لاحظ أنه قد يستغرق الأمر بضع دقائق حتى يتوقف ميلفوس برشاقة وحتى يقوم المشغل بحذف وحدات تخزين بولسار.</p>
<pre><code translate="no" class="language-bash">milvus.milvus.io <span class="hljs-string">&quot;my-release&quot;</span> deleted​
NAME         MODE      STATUS     UPDATED   AGE​
my-release   cluster   Deleting   <span class="hljs-literal">True</span>      41m​
milvus.milvus.io <span class="hljs-string">&quot;my-release&quot;</span> deleted​

<button class="copy-code-btn"></button></code></pre>

<p>انتظر حتى انتهاء الأمر.</p></li>
<li><p>تحقق مرة أخرى لترى أن مورد ميلفوس قد اختفى</p>
<pre><code translate="no" class="language-yaml">kubectl -n <span class="hljs-literal">default</span> <span class="hljs-keyword">get</span> milvus my-release​

<button class="copy-code-btn"></button></code></pre>

<p>يجب أن يكون الإخراج مثل.</p>
<pre><code translate="no" class="language-yaml">No resources found <span class="hljs-keyword">in</span> <span class="hljs-literal">default</span> <span class="hljs-keyword">namespace</span>.​

<button class="copy-code-btn"></button></code></pre></li>

</ol>
<h3 id="Start-Pulsar-V3-and-Milvus" class="common-anchor-header">بدء تشغيل بولسار V3 وميلفوس</h3><p>في هذه الخطوة، تحتاج في هذه الخطوة إلى بدء تشغيل مجلدات Pulsar V3 و Milvus. هناك قسمان منفصلان متاحان:</p>
<ul>
<li><p>لمستخدم Helm</p>
<p>إذا كنت قد قمت بتثبيت Milvus باستخدام مخطط Milvus Helm، انتقل إلى لمستخدمي <a href="#For-Helm-User">Milvus Helm</a>.</p></li>
<li><p>لمستخدمي مشغل ميلفوس</p>
<p>إذا كنت قد قمت بتثبيت Milvus باستخدام مشغل Milvus، انتقل إلى لمستخدم <a href="#For-Milvus-Operator-User">مشغل Mil</a>vus.</p></li>
</ul>
<h4 id="Start-Pulsar-V3-and-using-Helm" class="common-anchor-header">بدء تشغيل Pulsar V3 واستخدام Helm</h4><ol>
<li><p>قم بتحرير <code translate="no">values.yaml</code> المحفوظ في الخطوة السابقة.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change the following:​</span>
pulsar:​
  enabled: false <span class="hljs-comment"># set to false​</span>
  <span class="hljs-comment"># you may also clean up rest fields under pulsar field​</span>
  <span class="hljs-comment"># it&#x27;s ok to keep them though.​</span>
pulsarv3:​
  enabled: true​
  <span class="hljs-comment"># append other values for pulsar v3 chart if needs​</span>

<button class="copy-code-btn"></button></code></pre></li>

<li><p>قم بتحديث ريبو الدفة المحلي الخاص بك</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> zilliztech https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm​</span>
helm repo update zilliztech​

<button class="copy-code-btn"></button></code></pre>

<p>الإخراج</p>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;zilliztech&quot;</span> already exists <span class="hljs-keyword">with</span> the same configuration, skipping​
<span class="hljs-title class_">Hang</span> tight <span class="hljs-keyword">while</span> we grab the latest <span class="hljs-keyword">from</span> your chart repositories...​
...<span class="hljs-title class_">Successfully</span> got an update <span class="hljs-keyword">from</span> the <span class="hljs-string">&quot;zilliztech&quot;</span> chart repository​
<span class="hljs-title class_">Update</span> <span class="hljs-title class_">Complete</span>. ⎈<span class="hljs-title class_">Happy</span> <span class="hljs-title class_">Helming</span>!⎈​

<button class="copy-code-btn"></button></code></pre></li>

<li><p>قم بتثبيت إصدار ميلفوس الخاص بك بأحدث إصدار من مخطط الدفة باستخدام الإصدار المحرر <code translate="no">values.yaml</code> </p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-keyword">default</span> install my-release zilliztech/milvus --reset-values -f values.<span class="hljs-property">yaml</span>​

<button class="copy-code-btn"></button></code></pre>

<p>الإخراج</p>
<pre><code translate="no" class="language-bash"><span class="hljs-attr">NAME</span>: my-release​
<span class="hljs-variable constant_">LAST</span> <span class="hljs-attr">DEPLOYED</span>: <span class="hljs-title class_">Fri</span> <span class="hljs-title class_">Nov</span> <span class="hljs-number">22</span> <span class="hljs-number">15</span>:<span class="hljs-number">31</span>:<span class="hljs-number">27</span> <span class="hljs-number">2024</span>​
<span class="hljs-attr">NAMESPACE</span>: <span class="hljs-keyword">default</span>​
<span class="hljs-attr">STATUS</span>: deployed​
<span class="hljs-attr">REVISION</span>: <span class="hljs-number">1</span>​
<span class="hljs-variable constant_">TEST</span> <span class="hljs-attr">SUITE</span>: <span class="hljs-title class_">None</span>​

<button class="copy-code-btn"></button></code></pre></li>

<li><p>تحقق من البودات لمعرفة ما إذا كانت جميعها مجدولة وتعمل مع <code translate="no">kubectl -n default get pods</code>.</p>
<p>قد يستغرق الأمر بضع دقائق حتى تبدأ جميع الكبسولات في العمل</p>
<p>الإخراج مثل.</p>
<pre><code translate="no" class="language-bash">NAME                                          READY   STATUS      RESTARTS   AGE​
my-release-etcd<span class="hljs-number">-0</span>                             <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-milvus-datanode<span class="hljs-number">-56487b</span>c4bc-s6mbd   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m5s​
my-release-milvus-indexnode<span class="hljs-number">-6476894</span>d6-rv85d   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m5s​
my-release-milvus-mixcoord<span class="hljs-number">-6</span>d8875cb9c<span class="hljs-number">-67f</span>cq   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m4s​
my-release-milvus-proxy<span class="hljs-number">-7b</span>c45d57c5<span class="hljs-number">-2</span>qf8m      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m4s​
my-release-milvus-querynode<span class="hljs-number">-77465747b</span>-kt7f4   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m4s​
my-release-minio<span class="hljs-number">-684f</span>f4f5df-pnc97             <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m5s​
my-release-pulsarv3-bookie<span class="hljs-number">-0</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-pulsarv3-bookie<span class="hljs-number">-1</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-pulsarv3-bookie<span class="hljs-number">-2</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-pulsarv3-bookie-<span class="hljs-keyword">init</span><span class="hljs-number">-6</span>z4tk         <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m1s​
my-release-pulsarv3-broker<span class="hljs-number">-0</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-broker<span class="hljs-number">-1</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-proxy<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-proxy<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-pulsar-<span class="hljs-keyword">init</span>-wvqpc         <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m1s​
my-release-pulsarv3-recovery<span class="hljs-number">-0</span>                <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-pulsarv3-zookeeper<span class="hljs-number">-0</span>               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-zookeeper<span class="hljs-number">-1</span>               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-zookeeper<span class="hljs-number">-2</span>               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​

<button class="copy-code-btn"></button></code></pre></li>

</ol>
<h4 id="Start-Pulsar-V3-and-using-Milvus-Operator" class="common-anchor-header">بدء تشغيل Pulsar V3 واستخدام مشغل Milvus</h4><ol>
<li><p>قم بتحرير <code translate="no">milvus.yaml</code> المحفوظة في الخطوة السابقة.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change the followings fields:​</span>
apiVersion: milvus.io/v1beta1​
kind: Milvus​
metadata:​
  annotations: null <span class="hljs-comment"># this field should be removed or set to null​</span>
  resourceVersion: null <span class="hljs-comment"># this field should be removed or set to null​</span>
  uid: null <span class="hljs-comment"># this field should be removed or set to null​</span>
spec:​
  dependencies:​
    pulsar:​
      inCluster:​
        chartVersion: pulsar-v3​
        <span class="hljs-comment"># delete all previous values for pulsar v2 and set it to null.​</span>
        <span class="hljs-comment"># you may add additional values here for pulsar v3 if you&#x27;re sure about it.​</span>
        values: null​

<button class="copy-code-btn"></button></code></pre></li>

<li><p>تأكد من ترقية مشغل Milvus إلى الإصدار v1.1.2 أو إصدار أحدث</p>
<pre><code translate="no" class="language-yaml">helm repo <span class="hljs-keyword">add</span> milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator​</span>
helm repo update milvus-<span class="hljs-keyword">operator</span>​
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>​

<button class="copy-code-btn"></button></code></pre>

<p>استخدم الأمر لبدء تشغيل ميلفوس باستخدام Pulsar v3</p>
<pre><code translate="no" class="language-yaml">kubectl create -f milvus.yaml​

<button class="copy-code-btn"></button></code></pre>

<p>الإخراج</p>
<pre><code translate="no" class="language-yaml">milvus.milvus.io/my-release created​

<button class="copy-code-btn"></button></code></pre></li>

<li><p>تحقق من القرون لمعرفة ما إذا كانت جميعها مجدولة وتعمل مع <code translate="no">kubectl -n default get pods</code>. </p>
<p>قد يستغرق الأمر بضع دقائق لبدء تشغيل جميع الكبسولات.</p>
<p>الإخراج مثل.</p>
<pre><code translate="no" class="language-yaml">NAME                                            READY   STATUS      RESTARTS   AGE​
my-release-etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">65</span>m​
my-release-milvus-datanode<span class="hljs-number">-57f</span>d59ff58<span class="hljs-number">-5</span>mdrk     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">93</span>s​
my-release-milvus-indexnode<span class="hljs-number">-67867</span>c6b9b<span class="hljs-number">-4</span>wsbw    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">93</span>s​
my-release-milvus-mixcoord<span class="hljs-number">-797849f</span>9bb-sf8z5     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">93</span>s​
my-release-milvus-proxy<span class="hljs-number">-5</span>d5bf98445-c55m6        <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">93</span>s​
my-release-milvus-querynode<span class="hljs-number">-0</span><span class="hljs-number">-64797f</span>5c9-lw4rh   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">92</span>s​
my-release-minio<span class="hljs-number">-79476</span>ccb49-zvt2h               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">65</span>m​
my-release-pulsar-bookie<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-bookie<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-bookie<span class="hljs-number">-2</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-bookie-<span class="hljs-keyword">init</span>-v8fdj             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-broker<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-broker<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-proxy<span class="hljs-number">-0</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-proxy<span class="hljs-number">-1</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-pulsar-<span class="hljs-keyword">init</span><span class="hljs-number">-5l</span>hx7             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-recovery<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-zookeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-zookeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-zookeeper<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​

<button class="copy-code-btn"></button></code></pre></li>

</ol>
<p></p>
