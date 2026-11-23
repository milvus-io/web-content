---
id: upgrade-pulsar-v3.md
related_key: upgrade pulsar v3
summary: >-
  تعرف على كيفية ترقية Pulsar من الإصدار V2 إلى الإصدار V3 في Milvus حتى تتمكن
  من استخدام أحدث إصدار من Milvus v2.5.x.
title: ترقية Pulsar في Milvus من الإصدار V2 إلى الإصدار V3
---
<h1 id="Upgrading-Pulsar-​" class="common-anchor-header">ترقية Pulsar ​<button data-href="#Upgrading-Pulsar-​" class="anchor-icon" translate="no">
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
    </button></h1><p>توضح هذه المقالة الإجراءات التي يجب اتباعها لترقية مكون Pulsar الخاص بك من الإصدار V2 إلى الإصدار V3 إذا كان لديك بالفعل نشر Milvus يعمل مع Pulsar V2.​</p>
<p>ابتداءً من الإصدار Milvus v2.5، سيستخدم كل من <strong>milvus-helm</strong> و <strong>milvus-operator</strong> Pulsar الإصدار 3 بشكل افتراضي لإصلاح بعض الأخطاء والثغرات الأمنية.​ على الرغم من أن Milvus 2.5 متوافق مع Pulsar 2.x، فإن الترقية إلى Pulsar الإصدار 3 اختيارية. ولتحسين الاستقرار والأداء، نوصي بالترقية إلى Pulsar الإصدار 3.</p>
<p>إذا كنت تفضل استخدام Pulsar V2 مع Milvus v2.5.x، فاقرأ <a href="/docs/ar/use-pulsar-v2.md">«استخدام Pulsar V2 مع Milvus v2.5.x</a>».</p>
<div class="alert note">
<ol>
<li><p>تتطلب عملية الترقية انقطاعًا قصيرًا للخدمة (يستغرق عادةً من بضع دقائق إلى أكثر من عشر دقائق، اعتمادًا على حجم البيانات).​</p></li>
<li><p>قبل بدء العملية، يجب إيقاف جميع العملاء قيد التشغيل لمنعهم من كتابة البيانات إلى Milvus. وإلا، فقد تُفقد البيانات المكتوبة.​</p></li>
<li><p>يفترض هذا المقال أن Milvus مثبت في مساحة الاسم <code translate="no">default</code> ويحمل الاسم <code translate="no">my-release</code>. يرجى تغيير المعلمات لتتناسب مع مساحة الاسم الخاصة بك واسم الإصدار الخاص بك أثناء تنفيذ الأوامر المنسوخة من هذه الصفحة.​</p></li>
<li><p>تأكد من أن بيئة العمل الخاصة بك تتمتع بأذونات ضمن مساحة الاسم المذكورة أعلاه في مجموعة Kubernetes وأن الأوامر التالية مثبتة:​</p>
<p>أ. <code translate="no">kubectl</code> &gt;= 1.20​</p>
<p>ب. <code translate="no">helm</code> &gt;= 3.14.0​</p>
<p>ج. <code translate="no">cat</code> و <code translate="no">grep</code> و <code translate="no">awk</code> لعمليات معالجة السلاسل​</p>
<p>د. <code translate="no">curl</code> أو <strong>Attu v2.4+</strong> للتفاعل مع واجهة برمجة تطبيقات إدارة milvus​</p></li>
</ol>
</div>
<h2 id="Roadmap" class="common-anchor-header">خريطة الطريق<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
<li><p><a href="#Persist-data-not-consumed-in-Pulsar">حفظ البيانات التي لم يتم استهلاكها في Pulsar​.</a></p></li>
<li><p><a href="#Stop-Milvus-and-delete-Pulsar-V2">إيقاف تشغيل Milvus وحذف Pulsar V2​.</a></p></li>
<li><p><a href="#Start-Pulsar-V3-and-Milvus">تشغيل Pulsar V3 و Milvus​.</a></p></li>
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
    </button></h2><p>يقدم هذا القسم الإجراءات التفصيلية لترقية Pulsar من الإصدار V2 إلى الإصدار V3 في Milvus.</p>
<h3 id="Persist-data-not-consumed-in-Pulsar" class="common-anchor-header">حفظ البيانات غير المستهلكة في Pulsar<button data-href="#Persist-data-not-consumed-in-Pulsar" class="anchor-icon" translate="no">
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
    </button></h3><p>في هذه الخطوة، عليك التأكد من أن البيانات الموجودة في Pulsar قد تم حفظها في خدمة تخزين الكائنات​. هناك طريقتان متاحتان، ويمكنك اختيار الطريقة التي تناسب احتياجاتك​.</p>
<h4 id="Approach-1-Using-Attu" class="common-anchor-header">الطريقة 1: استخدام Attu</h4><p>إذا كان لديك عدد قليل فقط من المجموعات في نشر Milvus العامل الخاص بك مع عدد قليل من المقاطع، فيمكنك استخدام Attu لحفظ البيانات في خدمة تخزين الكائنات.</p>
<ol>
<li><p>حدد كل مجموعة في جميع قواعد البيانات الخاصة بك، وانتقل إلى لوحة " <code translate="no">Segments</code> " (المجموعات)، وانقر على زر " <code translate="no">Flush</code> " (تحديد المجموعات)​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/attu-select-collection.png" alt="Segment panel of a collection" class="doc-image" id="segment-panel-of-a-collection" /> 
   <span>لوحة الشرائح الخاصة بمجموعة ما</span>
  
 </span></p></li>
<li><p>ثم في النافذة المنبثقة، انقر على « <code translate="no">Flush</code> » مرة أخرى.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data-flush-prompt.png" alt="Data flush prompt in Attu" class="doc-image" id="data-flush-prompt-in-attu" /> 
   <span>مطالبة بتفريغ البيانات في Attu</span>
  
 </span></p></li>
<li><p>ثم انتظر حتى تصبح «حالات الشرائح الدائمة» لجميع المجموعات « <code translate="no">Flushed</code> ».​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/view-data-peristent-process.png" alt="View data flush status in Attu" class="doc-image" id="view-data-flush-status-in-attu" /> 
   <span>عرض حالة مسح البيانات في Attu</span>
  
 </span></p></li>
</ol>
<h4 id="Approach-2-Using-management-API" class="common-anchor-header">الطريقة 2: استخدام واجهة برمجة التطبيقات (API) للإدارة</h4><ol>
<li><p>قم بتوجيه المنفذ 9091 لبروكسي Milvus إلى المضيف المحلي لإجراء العمليات اللاحقة.​</p>
<pre><code translate="no" class="language-bash">kubectl -n default port-forward deploy/my-release-milvus-proxy 9091:9091 &amp;​
<button class="copy-code-btn"></button></code></pre>
<p>الناتج:​</p>
<pre><code translate="no" class="language-yaml">[<span class="hljs-number">1</span>] <span class="hljs-number">8116</span><span class="hljs-string">​</span>
<span class="hljs-string">Forwarding</span> <span class="hljs-string">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span><span class="hljs-string">:9091</span> <span class="hljs-string">-&gt;</span> <span class="hljs-number">9091</span><span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>احفظ رقم PID للتنظيف لاحقًا.​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">pid=8116​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>تشغيل الإجراء الخاص بحفظ جميع البيانات التي تم إدخالها من Pulsar إلى Ojbect Storage​.</p>
<pre><code translate="no" class="language-bash">curl 127.0.0.1:9091/api/v1/collections \​
|curl 127.0.0.1:9091/api/v1/persist -d @/dev/stdin\​
|jq <span class="hljs-string">&#x27;.flush_coll_segIDs&#x27;</span>| jq <span class="hljs-string">&#x27;[.[] | .data[]]&#x27;</span> | jq <span class="hljs-string">&#x27;{segmentIDs: (.)}&#x27;</span> \​
&gt; flushing_segments.json​
<span class="hljs-built_in">cat</span> flushing_segments.json​

<button class="copy-code-btn"></button></code></pre>
<p>النتيجة:​</p>
<pre><code translate="no" class="language-yaml">{<span class="hljs-string">​</span>
  <span class="hljs-attr">&quot;segmentIDs&quot;:</span> [<span class="hljs-string">​</span>
    <span class="hljs-number">454097953998181000</span>,<span class="hljs-string">​</span>
    <span class="hljs-number">454097953999383600</span>,<span class="hljs-string">​</span>
    <span class="hljs-number">454097953998180800</span><span class="hljs-string">​</span>
  ]<span class="hljs-string">​</span>
}<span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>تحقق من مسح جميع المقاطع.​</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> flushing_segments.json|  curl -X GET 127.0.0.1:9091/api/v1/persist/state -d @/dev/stdin ​

<button class="copy-code-btn"></button></code></pre>
<p>عند الانتهاء، ستظهر النتيجة التالية​</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span><span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span><span class="hljs-attr">&quot;flushed&quot;</span><span class="hljs-punctuation">:</span><span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">}</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>أوقف عملية « <code translate="no">kubectl port-forward</code> » التي تعمل في الخلفية​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kill</span> <span class="hljs-string">$pid​</span>

<button class="copy-code-btn"></button></code></pre>
<p>الناتج:​</p>
<pre><code translate="no" class="language-yaml">[<span class="hljs-number">1</span>]  <span class="hljs-string">+</span> <span class="hljs-number">8116 </span><span class="hljs-string">terminated</span>  <span class="hljs-string">kubectl</span> <span class="hljs-string">-n</span> <span class="hljs-string">default</span> <span class="hljs-string">port-forward</span> <span class="hljs-string">deploy/my-release-milvus-proxy</span> <span class="hljs-number">9091</span><span class="hljs-string">:9091</span>                      <span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Stop-Milvus-and-delete-Pulsar-V2" class="common-anchor-header">إيقاف Milvus وحذف Pulsar V2<button data-href="#Stop-Milvus-and-delete-Pulsar-V2" class="anchor-icon" translate="no">
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
    </button></h3><p>في هذه الخطوة، تحتاج إلى إيقاف pod Milvus وحذف نشر Pulsar V2. هناك قسمان منفصلان متاحان:</p>
<ul>
<li><p>لمستخدمي Milvus Helm</p>
<p>إذا كنت قد قمت بتثبيت Milvus باستخدام مخطط Milvus Helm، فانتقل إلى <a href="#Delete-Pulsar-V2-using-Helm">حذف Pulsar v2 باستخدام Helm</a>.</p></li>
<li><p>لمستخدمي Milvus Operator</p>
<p>إذا كنت قد قمت بتثبيت Milvus باستخدام Milvus Operator، فانتقل إلى <a href="#Delete-Pulsar-V2-using-Milvus-Operator">«حذف Pulsar v2 باستخدام Milvus Operator</a>».</p></li>
</ul>
<h4 id="Delete-Pulsar-V2-using-Helm" class="common-anchor-header">حذف Pulsar V2 باستخدام Helm</h4><p>إذا كنت قد قمت بتثبيت Milvus باستخدام مخطط Milvus Helm، فاتبع الخطوات التالية لإيقاف تشغيل pod Milvus وحذف نشر Pulsar V2.</p>
<ol>
<li><p>احفظ قيم الإصدار الحالي لـ Milvus في ملف <code translate="no">values.yaml</code> لاستعادتها لاحقًا:​</p>
<pre><code translate="no" class="language-bash">helm -n default get values my-release -o yaml &gt; values.yaml​
<span class="hljs-built_in">cat</span> values.yaml​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>استخدم الأمر لإيقاف Milvus وجميع التبعيات. لا تقلق بشأن أحجام البيانات، فسيتم الاحتفاظ بها افتراضيًا.​</p>
<pre><code translate="no" class="language-bash">helm -n default uninstall my-release​

<button class="copy-code-btn"></button></code></pre>
<p>المخرجات​</p>
<pre><code translate="no" class="language-bash">These resources were kept due to the resource policy:​
[PersistentVolumeClaim] my-release-minio​
​
release <span class="hljs-string">&quot;my-release&quot;</span> uninstalled​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>يجب مسح قائمة PVCs و PVs الخاصة بـ Pulsar (مطالبات وحدات التخزين الدائمة ووحدات التخزين الدائمة)​</p>
<pre><code translate="no" class="language-bash">kubectl -n default get pvc -lapp=pulsar,release=my-release |grep -v NAME |awk <span class="hljs-string">&#x27;{print $1}&#x27;</span> &gt; pulsar-pvcs.txt​
kubectl -n default get pvc -lapp=pulsar,release=my-release -o custom-columns=VOL:.spec.volumeName|grep -v VOL &gt; pulsar-pvs.txt​
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Volume Claims:&quot;</span>​
<span class="hljs-built_in">cat</span> pulsar-pvcs.txt​
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Volumes:&quot;</span>​
<span class="hljs-built_in">cat</span> pulsar-pvs.txt​

<button class="copy-code-btn"></button></code></pre>
<p>الناتج​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">Volume</span> <span class="hljs-string">Claims:​</span>
<span class="hljs-string">my-release-pulsar-bookie-journal-my-release-pulsar-bookie-0​</span>
<span class="hljs-string">my-release-pulsar-bookie-journal-my-release-pulsar-bookie-1​</span>
<span class="hljs-string">my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-0​</span>
<span class="hljs-string">my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-1​</span>
<span class="hljs-string">my-release-pulsar-zookeeper-data-my-release-pulsar-zookeeper-0​</span>
<span class="hljs-string">Volumes:​</span>
<span class="hljs-string">pvc-f590a4de-df31-4ca8-a424-007eac3c619a​</span>
<span class="hljs-string">pvc-17b0e215-3e14-4d14-901e-1a1dda9ff5a3​</span>
<span class="hljs-string">pvc-72f83c25-6ea1-45ee-9559-0b783f2c530b​</span>
<span class="hljs-string">pvc-60dcb6e4-760d-46c7-af1a-d1fc153b0caf​</span>
<span class="hljs-string">pvc-2da33f64-c053-42b9-bb72-c5d50779aa0a​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>تحقق مما إذا كانت قائمة PVCs في <code translate="no">pulsar-pvcs.txt</code> تخص Pulsar بالكامل​ بمجرد التأكد من عدم وجود أخطاء، احذف PVCs.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> pulsar-pvcs.txt |xargs -I {} kubectl -n default delete pvc {} --<span class="hljs-built_in">wait</span>=<span class="hljs-literal">false</span>​

<button class="copy-code-btn"></button></code></pre>
<p>الناتج:​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-bookie-journal-my-release-pulsar-bookie-0&quot;</span> <span class="hljs-string">deleted​</span>
<span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-bookie-journal-my-release-pulsar-bookie-1&quot;</span> <span class="hljs-string">deleted​</span>
<span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-0&quot;</span> <span class="hljs-string">deleted​</span>
<span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-1&quot;</span> <span class="hljs-string">deleted​</span>
<span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-zookeeper-data-my-release-pulsar-zookeeper-0&quot;</span> <span class="hljs-string">deleted​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>(اختياري) اعتمادًا على فئة التخزين التي توفر PVC، قد تحتاج أيضًا إلى إزالة PV يدويًا.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">cat</span> <span class="hljs-string">pulsar-pvs.txt</span> <span class="hljs-string">|xargs</span> <span class="hljs-string">-I</span> {} <span class="hljs-string">kubectl</span> <span class="hljs-string">-n</span> <span class="hljs-string">default</span> <span class="hljs-string">delete</span> <span class="hljs-string">pvc</span> {} <span class="hljs-string">--wait=false​</span>

<button class="copy-code-btn"></button></code></pre>
<p>لا بأس إذا ظهرت أخطاء NotFound. فقد تم حذفها بالفعل بواسطة وحدات التحكم في Kubernetes.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-f590a4de-df31-4ca8-a424-007eac3c619a&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>
<span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-17b0e215-3e14-4d14-901e-1a1dda9ff5a3&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>
<span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-72f83c25-6ea1-45ee-9559-0b783f2c530b&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>
<span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-60dcb6e4-760d-46c7-af1a-d1fc153b0caf&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>
<span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-2da33f64-c053-42b9-bb72-c5d50779aa0a&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h4 id="Delete-Pulsar-V2-using-Milvus-Operator" class="common-anchor-header">حذف Pulsar V2 باستخدام Milvus Operator</h4><p>إذا كنت قد قمت بتثبيت Milvus باستخدام Milvus Operator، فاتبع الخطوات التالية لإيقاف pod Milvus وحذف نشر Pulsar V2.</p>
<ol>
<li><p>احفظ ملف Milvus Manifest الحالي في <code translate="no">milvus.yaml</code> لاستخدامه لاحقًا​.</p>
<pre><code translate="no" class="language-bash">kubectl -n default get milvus my-release -o yaml &gt; milvus.yaml​
<span class="hljs-built_in">head</span> milvus.yaml -n 20​

<button class="copy-code-btn"></button></code></pre>
<p>الناتج:​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1​</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus​</span>
<span class="hljs-string">metadata:​</span>
  <span class="hljs-string">annotations:​</span>
    <span class="hljs-attr">milvus.io/dependency-values-merged:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-string">​</span>
    <span class="hljs-attr">milvus.io/pod-service-label-added:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-string">​</span>
    <span class="hljs-attr">milvus.io/querynode-current-group-id:</span> <span class="hljs-string">&quot;0&quot;</span><span class="hljs-string">​</span>
  <span class="hljs-attr">creationTimestamp:</span> <span class="hljs-string">&quot;2024-11-22T08:06:59Z&quot;</span><span class="hljs-string">​</span>
  <span class="hljs-string">finalizers:​</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">milvus.milvus.io/finalizer​</span>
  <span class="hljs-attr">generation:</span> <span class="hljs-number">3</span><span class="hljs-string">​</span>
  <span class="hljs-string">labels:​</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus​</span>
    <span class="hljs-attr">milvus.io/operator-version:</span> <span class="hljs-number">1.1</span><span class="hljs-number">.2</span><span class="hljs-string">​</span>
<span class="hljs-attr">name:</span> <span class="hljs-string">my-release​</span>
<span class="hljs-attr">namespace:</span> <span class="hljs-string">default​</span>
<span class="hljs-attr">resourceVersion:</span> <span class="hljs-string">&quot;692217324&quot;</span><span class="hljs-string">​</span>
<span class="hljs-attr">uid:</span> <span class="hljs-string">7a469ed0-9df1-494e-bd9a-340fac4305b5​</span>
<span class="hljs-string">spec:​</span>
  <span class="hljs-string">components:​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>أنشئ ملف <code translate="no">patch.yaml</code> بالمحتوى التالي.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># a patch to retain etcd &amp; storage data and delete pulsar data while delete milvus​</span>
<span class="hljs-string">spec:​</span>
  <span class="hljs-string">dependencies:​</span>
    <span class="hljs-string">etcd:​</span>
      <span class="hljs-string">inCluster:​</span>
        <span class="hljs-attr">deletionPolicy:</span> <span class="hljs-string">Retain​</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">false</span><span class="hljs-string">​</span>
    <span class="hljs-string">storage:​</span>
      <span class="hljs-string">inCluster:​</span>
        <span class="hljs-attr">deletionPolicy:</span> <span class="hljs-string">Retain​</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">false</span><span class="hljs-string">​</span>
    <span class="hljs-string">pulsar:​</span>
      <span class="hljs-string">inCluster:​</span>
        <span class="hljs-attr">deletionPolicy:</span> <span class="hljs-string">Delete​</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">true</span><span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>استخدم ملف <code translate="no">kubectl patch</code> للاحتفاظ ببيانات etcd وبيانات التخزين وحذف بيانات Pulsar أثناء حذف Milvus.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">-n</span> <span class="hljs-string">default</span> <span class="hljs-string">patch</span> <span class="hljs-string">milvus</span> <span class="hljs-string">my-release</span> <span class="hljs-string">--patch-file</span> <span class="hljs-string">patch.yaml</span> <span class="hljs-string">--type=merge​</span>

<button class="copy-code-btn"></button></code></pre>
<p>النتيجة:​</p>
<pre><code translate="no" class="language-bash">milvus.milvus.io/my-release patched​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>أوقف Milvus واحذف pulsar V2. لا تقلق بشأن وحدات تخزين بيانات etcd ووحدات تخزين الكائنات، فسيتم الاحتفاظ بها افتراضيًا.</p>
<pre><code translate="no" class="language-bash">kubectl -n default delete milvus my-release --<span class="hljs-built_in">wait</span>=<span class="hljs-literal">false</span>​
kubectl -n default get milvus my-release​
kubectl -n default delete milvus my-release --<span class="hljs-built_in">wait</span>=<span class="hljs-literal">true</span>​

<button class="copy-code-btn"></button></code></pre>
<p>النتيجة: لاحظ أن الأمر قد يستغرق بضع دقائق حتى يتوقف milvus بشكل سلس ويقوم المشغل بحذف وحدات تخزين pulsar.​</p>
<pre><code translate="no" class="language-bash">milvus.milvus.io <span class="hljs-string">&quot;my-release&quot;</span> deleted​
NAME         MODE      STATUS     UPDATED   AGE​
my-release   cluster   Deleting   True      41m​
milvus.milvus.io <span class="hljs-string">&quot;my-release&quot;</span> deleted​

<button class="copy-code-btn"></button></code></pre>
<p>انتظر حتى ينتهي تنفيذ الأمر.</p></li>
<li><p>تحقق مرة أخرى للتأكد من اختفاء مورد Milvus​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">-n</span> <span class="hljs-string">default</span> <span class="hljs-string">get</span> <span class="hljs-string">milvus</span> <span class="hljs-string">my-release​</span>

<button class="copy-code-btn"></button></code></pre>
<p>يجب أن يكون الناتج كما يلي:​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-literal">No</span> <span class="hljs-string">resources</span> <span class="hljs-string">found</span> <span class="hljs-string">in</span> <span class="hljs-string">default</span> <span class="hljs-string">namespace.​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Start-Pulsar-V3-and-Milvus" class="common-anchor-header">بدء تشغيل Pulsar V3 و Milvus<button data-href="#Start-Pulsar-V3-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>في هذه الخطوة، تحتاج إلى تشغيل وحدات Pulsar V3 وMilvus. هناك قسمان منفصلان متاحان:</p>
<ul>
<li><p>لمستخدمي Helm</p>
<p>إذا كنت قد قمت بتثبيت Milvus باستخدام مخطط Milvus Helm، فانتقل إلى <a href="#For-Helm-User">"لمستخدمي Helm"</a>.</p></li>
<li><p>لمستخدمي Milvus Operator</p>
<p>إذا كنت قد قمت بتثبيت Milvus باستخدام Milvus Operator، فانتقل إلى <a href="#For-Milvus-Operator-User">"لمستخدمي Milvus Operator"</a>.</p></li>
</ul>
<h4 id="Start-Pulsar-V3-and-using-Helm" class="common-anchor-header">تشغيل Pulsar V3 باستخدام Helm</h4><ol>
<li><p>قم بتحرير ملف « <code translate="no">values.yaml</code> » الذي تم حفظه في الخطوة السابقة.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change the following:​</span>
<span class="hljs-string">pulsar:​</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to false​</span>
  <span class="hljs-comment"># you may also clean up rest fields under pulsar field​</span>
  <span class="hljs-comment"># it&#x27;s ok to keep them though.​</span>
<span class="hljs-string">pulsarv3:​</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span><span class="hljs-string">​</span>
  <span class="hljs-comment"># append other values for pulsar v3 chart if needs​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتحديث مستودع Helm المحلي​</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm​
helm repo update zilliztech​

<button class="copy-code-btn"></button></code></pre>
<p>النتيجة</p>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;zilliztech&quot;</span> already exists with the same configuration, skipping​
Hang tight <span class="hljs-keyword">while</span> we grab the latest from your chart repositories...​
...Successfully got an update from the <span class="hljs-string">&quot;zilliztech&quot;</span> chart repository​
Update Complete. ⎈Happy Helming!⎈​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتثبيت إصدار Milvus الخاص بك باستخدام أحدث إصدار من مخطط Helm باستخدام ملف <code translate="no">values.yaml</code> الذي تم تعديله​</p>
<pre><code translate="no" class="language-bash">helm -n default install my-release zilliztech/milvus --reset-values -f values.yaml​

<button class="copy-code-btn"></button></code></pre>
<p>النتيجة</p>
<pre><code translate="no" class="language-bash">NAME: my-release​
LAST DEPLOYED: Fri Nov 22 15:31:27 2024​
NAMESPACE: default​
STATUS: deployed​
REVISION: 1​
TEST SUITE: None​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>تحقق من البودات لمعرفة ما إذا كانت جميعها قد تمت جدولتها وتشغيلها باستخدام ملف <code translate="no">kubectl -n default get pods</code>.</p>
<p>قد يستغرق الأمر بضع دقائق حتى تبدأ جميع البودات في العمل​</p>
<p>يكون الناتج كما يلي:​</p>
<pre><code translate="no" class="language-bash">NAME                                          READY   STATUS      RESTARTS   AGE​
my-release-etcd-0                             1/1     Running     0          4m3s​
my-release-milvus-datanode-56487bc4bc-s6mbd   1/1     Running     0          4m5s​
my-release-milvus-indexnode-6476894d6-rv85d   1/1     Running     0          4m5s​
my-release-milvus-mixcoord-6d8875cb9c-67fcq   1/1     Running     0          4m4s​
my-release-milvus-proxy-7bc45d57c5-2qf8m      1/1     Running     0          4m4s​
my-release-milvus-querynode-77465747b-kt7f4   1/1     Running     0          4m4s​
my-release-minio-684ff4f5df-pnc97             1/1     Running     0          4m5s​
my-release-pulsarv3-bookie-0                  1/1     Running     0          4m3s​
my-release-pulsarv3-bookie-1                  1/1     Running     0          4m3s​
my-release-pulsarv3-bookie-2                  1/1     Running     0          4m3s​
my-release-pulsarv3-bookie-init-6z4tk         0/1     Completed   0          4m1s​
my-release-pulsarv3-broker-0                  1/1     Running     0          4m2s​
my-release-pulsarv3-broker-1                  1/1     Running     0          4m2s​
my-release-pulsarv3-proxy-0                   1/1     Running     0          4m2s​
my-release-pulsarv3-proxy-1                   1/1     Running     0          4m2s​
my-release-pulsarv3-pulsar-init-wvqpc         0/1     Completed   0          4m1s​
my-release-pulsarv3-recovery-0                1/1     Running     0          4m3s​
my-release-pulsarv3-zookeeper-0               1/1     Running     0          4m2s​
my-release-pulsarv3-zookeeper-1               1/1     Running     0          4m2s​
my-release-pulsarv3-zookeeper-2               1/1     Running     0          4m2s​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h4 id="Start-Pulsar-V3-and-using-Milvus-Operator" class="common-anchor-header">ابدأ تشغيل Pulsar V3 واستخدم Milvus Operator</h4><ol>
<li><p>قم بتحرير ملف " <code translate="no">milvus.yaml</code> " الذي تم حفظه في الخطوة السابقة.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change the followings fields:​</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1​</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus​</span>
<span class="hljs-string">metadata:​</span>
  <span class="hljs-attr">annotations:</span> <span class="hljs-literal">null</span> <span class="hljs-comment"># this field should be removed or set to null​</span>
  <span class="hljs-attr">resourceVersion:</span> <span class="hljs-literal">null</span> <span class="hljs-comment"># this field should be removed or set to null​</span>
  <span class="hljs-attr">uid:</span> <span class="hljs-literal">null</span> <span class="hljs-comment"># this field should be removed or set to null​</span>
<span class="hljs-string">spec:​</span>
  <span class="hljs-string">dependencies:​</span>
    <span class="hljs-string">pulsar:​</span>
      <span class="hljs-string">inCluster:​</span>
        <span class="hljs-attr">chartVersion:</span> <span class="hljs-string">pulsar-v3​</span>
        <span class="hljs-comment"># delete all previous values for pulsar v2 and set it to null.​</span>
        <span class="hljs-comment"># you may add additional values here for pulsar v3 if you&#x27;re sure about it.​</span>
        <span class="hljs-attr">values:</span> <span class="hljs-literal">null</span><span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>تأكد من ترقية Milvus Operator إلى الإصدار v1.1.2 أو أحدث​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">helm</span> <span class="hljs-string">repo</span> <span class="hljs-string">add</span> <span class="hljs-string">milvus-operator</span> <span class="hljs-string">https://zilliztech.github.io/milvus-operator​</span>
<span class="hljs-string">helm</span> <span class="hljs-string">repo</span> <span class="hljs-string">update</span> <span class="hljs-string">milvus-operator​</span>
<span class="hljs-string">helm</span> <span class="hljs-string">-n</span> <span class="hljs-string">milvus-operator</span> <span class="hljs-string">upgrade</span> <span class="hljs-string">milvus-operator</span> <span class="hljs-string">milvus-operator/milvus-operator​</span>

<button class="copy-code-btn"></button></code></pre>
<p>استخدم الأمر لبدء تشغيل Milvus مع Pulsar v3​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">create</span> <span class="hljs-string">-f</span> <span class="hljs-string">milvus.yaml​</span>

<button class="copy-code-btn"></button></code></pre>
<p>النتيجة​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">milvus.milvus.io/my-release</span> <span class="hljs-string">created​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>تحقق من البودات لمعرفة ما إذا كانت جميعها قد تمت جدولتها وتشغيلها​ باستخدام <code translate="no">kubectl -n default get pods</code>. ​</p>
<p>قد يستغرق الأمر بضع دقائق حتى تبدأ جميع الوحدات في العمل.</p>
<p>سيكون الناتج كما يلي:​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">NAME</span>                                            <span class="hljs-string">READY</span>   <span class="hljs-string">STATUS</span>      <span class="hljs-string">RESTARTS</span>   <span class="hljs-string">AGE​</span>
<span class="hljs-string">my-release-etcd-0</span>                               <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">65m​</span>
<span class="hljs-string">my-release-milvus-datanode-57fd59ff58-5mdrk</span>     <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">93s​</span>
<span class="hljs-string">my-release-milvus-indexnode-67867c6b9b-4wsbw</span>    <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">93s​</span>
<span class="hljs-string">my-release-milvus-mixcoord-797849f9bb-sf8z5</span>     <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">93s​</span>
<span class="hljs-string">my-release-milvus-proxy-5d5bf98445-c55m6</span>        <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">93s​</span>
<span class="hljs-string">my-release-milvus-querynode-0-64797f5c9-lw4rh</span>   <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">92s​</span>
<span class="hljs-string">my-release-minio-79476ccb49-zvt2h</span>               <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">65m​</span>
<span class="hljs-string">my-release-pulsar-bookie-0</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-bookie-1</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-bookie-2</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-bookie-init-v8fdj</span>             <span class="hljs-number">0</span><span class="hljs-string">/1</span>     <span class="hljs-string">Completed</span>   <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-broker-0</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-broker-1</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-proxy-0</span>                       <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-proxy-1</span>                       <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-pulsar-init-5lhx7</span>             <span class="hljs-number">0</span><span class="hljs-string">/1</span>     <span class="hljs-string">Completed</span>   <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-recovery-0</span>                    <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-zookeeper-0</span>                   <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-zookeeper-1</span>                   <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-zookeeper-2</span>                   <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>​</p>
