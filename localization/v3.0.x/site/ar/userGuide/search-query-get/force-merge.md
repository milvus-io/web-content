---
id: force-merge.md
title: الضغط القسري للدمجCompatible with Milvus 3.0.x
summary: >-
  استخدم عملية «دمج قسري» لتجميع المقاطع الصغيرة وتحسين أداء الاستعلامات وكفاءة
  التخزين.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">الضغط القسري للدمج<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>تم تصميم "الدمج القسري" لتوحيد الأجزاء الصغيرة والمجزأة إلى أجزاء أقل عددًا وأكبر حجمًا لتحسين أداء الاستعلامات وكفاءة التخزين. يشرح هذا الدليل كيفية استخدام ضغط الدمج القسري.</p>
<div class="alert note">
<p>هذه الميزة في مرحلة العرض العام. لا تستخدمها في بيئات الإنتاج.</p>
</div>
<h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">maxSize</code> يحافظ <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">الضغط</a> القياسي على أحجام المقاطع قريبة من الحد الأقصى المكون لـ " <code translate="no">maxSize</code> " من خلال عمليات دمج متعددة إلى واحدة، ولكنه قد يترك شظايا متوسطة الحجم لا يمكن دمجها أكثر دون تجاوز الحدود. على سبيل المثال، كما هو موضح أدناه، إذا كانت المجموعة تحتوي على خمسة شرائح بحجم 2 ميغابايت وكان الحد الأقصى المسموح به ( ) هو 3 ميغابايت، فإن دمج أي شريحتين سيتجاوز الحد، وبالتالي لا يمكن للضغط القياسي تقليل عدد الشرائح أكثر من ذلك ويبقى التخطيط المجزأ كما هو.</p>
<p>يضيف الدمج القسري معلمة " <code translate="no">target_size</code> " ويدعم إعادة تنظيم المقاطع نحو الحجم المطلوب ضمن نطاق تفاوت ضيق عندما يكون ذلك ممكنًا. كما هو موضح أدناه، إذا كانت قيمة <code translate="no">target_size</code> المحددة هي 4 ميغابايت، فيمكن دمج المقاطع الصغيرة الخمسة التي يبلغ حجم كل منها 2 ميغابايت في عدد أقل من المقاطع الأكبر حجمًا. ويؤدي ذلك إلى تقليل عدد المقاطع الزائدة، ودعم الأهداف الأكبر من إعدادات <code translate="no">maxSize</code> الافتراضية، وعندما يكون الهدف كبيرًا جدًّا، فإنه يتيح للنظام اختيار حجم إخراج عملي وعدد مقاطع مناسب للأجهزة الحالية وطوبولوجيا QueryNode.</p>
<p>لفهم طريقة الضغط التي يجب استخدامها، راجع <a href="#faq">الأسئلة الشائعة</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" /> 
   <span>R8eow3kaqhktokblcmocnvxmnee</span>
  
 </span></p>
<p>يعمل ضغط الدمج القسري على توسيع نطاق واجهة برمجة التطبيقات (API) الحالية <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> بمعلمة « <code translate="no">target_size</code> ». وهي متوافقة تمامًا مع الإصدارات السابقة: تستمر استدعاءات الضغط الحالية التي لا تحتوي على « <code translate="no">target_size</code> » في العمل كما كان من قبل.</p>
<p>تعمل عملية الدمج القسري بشكل غير متزامن. وهي لا تعطل عمليات البحث أو الاستعلام، على الرغم من أنها تستهلك موارد الإدخال/الإخراج والذاكرة أثناء التنفيذ.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">استخدام الضغط بالدمج القسري<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>إصدار Milvus 3.0 أو أحدث</p></li>
<li><p>PyMilvus 3.0 أو أحدث</p></li>
</ul>
<h3 id="Global-Configuration" class="common-anchor-header">التكوين العام<button data-href="#Global-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>تتحكم معلمات التكوين التالية في سلوك "الدمج القسري". قم بتعيينها في ملف تكوين Milvus أو عبر متغيرات البيئة.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">segment:</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">512</span>         <span class="hljs-comment"># Default segment max size (MB).</span>
                         <span class="hljs-comment"># Used when target_size is 0 or omitted.</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">maxFullSegmentThreshold:</span> <span class="hljs-number">100</span>
                         <span class="hljs-comment"># When segment count exceeds this threshold,</span>
                         <span class="hljs-comment"># a faster greedy algorithm is used instead</span>
                         <span class="hljs-comment"># of the standard merge algorithm.</span>
    <span class="hljs-attr">forceMerge:</span>
      <span class="hljs-attr">datanodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># DataNode memory divided by this factor</span>
                         <span class="hljs-comment"># determines the the largest segment</span>
                         <span class="hljs-comment"># size the system can allow.</span>
      <span class="hljs-attr">querynodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># Minimum QueryNode memory divided by this</span>
                         <span class="hljs-comment"># factor. Used in automatic size calculation</span>
                         <span class="hljs-comment"># to ensure merged segments can be loaded.</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>القيمة الافتراضية</p></th>
     <th><p>الوصف</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.segment.maxSize</code></p></td>
     <td><p>512</p></td>
     <td><p>الحجم الأقصى الافتراضي للمقطع بالميغابايت. تُستخدم كقيمة مستهدفة عندما تكون قيمة « <code translate="no">target_size</code> » تساوي 0 أو تم حذفها. كما تُستخدم كالقيمة الدنيا المسموح بها لـ « <code translate="no">target_size</code> » الصريحة.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>عتبة عدد المقاطع لاختيار الخوارزمية. عندما يتجاوز عدد المقاطع هذه القيمة، يستخدم Milvus خوارزمية جشعة أسرع لتخطيط الدمج.</p><ul><li><p><strong>الخوارزمية القياسية</strong> (تُستخدم عندما يكون عدد المقاطع &lt;= <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): تنتج نتائج دمج أكثر مثالية ولكنها تستغرق وقتًا أطول في الحساب.</p></li><li><p><strong>الخوارزمية الجشعة</strong> (تُستخدم عندما يكون عدد المقاطع &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): تُنجز التخطيط بشكل أسرع بكثير على حساب تجميع مقاطع أقل مثالية قليلاً.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>يتم تقسيم ذاكرة DataNode على هذا العامل لحساب أكبر حجم للقطعة يمكن للنظام السماح به.</p><ul><li><p>كلما زادت القيمة، قلت الذاكرة المخصصة لعملية الدمج، ولكن يتبقى المزيد لعمليات DataNode الأخرى، مما يحسن  استقرار العقدة.</p></li><li><p>تسمح القيمة الأصغر بعمليات دمج أكبر، لكنها تزيد من الضغط على الذاكرة.</p></li><li><p>على سبيل المثال، باستخدام العامل الافتراضي 4.0 وعقدة DataNode ذات ذاكرة سعة 16 جيجابايت، تبلغ ميزانية الدمج 4 جيجابايت. وهذا يعني أن الحجم الإجمالي للمقاطع التي يتم دمجها في عملية واحدة لا يمكن أن يتجاوز 4 جيجابايت.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>يتم تقسيم الحد الأدنى لذاكرة QueryNode على هذا العامل. يُستخدم أثناء الحساب التلقائي للحجم (<code translate="no">target_size=max_int64</code>) لضمان إمكانية تحميل المقاطع المدمجة بواسطة QueryNodes.</p><ul><li><p>تؤدي القيمة الأكبر إلى إنتاج شرائح أصغر يسهل على عقد QueryNode تحميلها.</p></li><li><p>أما القيمة الأصغر فتسمح بشرائح أكبر حجمًا، لكنها قد تتسبب في فشل التحميل على عقد QueryNode ذات الذاكرة المحدودة.</p></li><li><p>على سبيل المثال، مع العامل الافتراضي 4.0 وأصغر عقدة استعلام (QueryNode) ذات ذاكرة تبلغ 16 جيجابايت، لن يتجاوز الحجم المستهدف المحسوب تلقائيًا 4 جيجابايت. وهذا يمنع ميزة «الدمج القسري» (Force Merge) من إنتاج شرائح كبيرة جدًا بحيث يتعذر على عقد الاستعلام (QueryNodes) تحميلها.</p></li></ul></td>
   </tr>
</table>
<p>لتطبيق التغييرات المذكورة أعلاه على مجموعة Milvus الخاصة بك، يرجى اتباع الخطوات الواردة في <a href="/docs/ar/configure-helm.md#Configure-Milvus-via-configuration-file">«تكوين Milvus باستخدام Helm</a> » <a href="/docs/ar/configure_operator.md">و«تكوين Milvus باستخدام Milvus Operators</a>».</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">تشغيل عملية ضغط «Force Merge»<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكنك تشغيل ضغط «Force Merge» عن طريق استدعاء ` <code translate="no">compact()</code> ` باستخدام المعلمة ` <code translate="no">target_size</code> `. للحصول على تفاصيل المعلمات، راجع <a href="#parameter-reference">«مرجع المعلمات»</a> أدناه.</p>
<p>تتوفر ثلاثة أوضاع لضغط الدمج القسري:</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 512 MB)
│  Equivalent to standard compaction
│
├─ Mode 2: target_size = 2048
│  Merges segments to ~2 GB each
│  Must be &gt;= config maxSize
│
└─ Mode 3: target_size = max_int64
   Auto-calculates optimal size based on
   segment distribution and node memory
<button class="copy-code-btn"></button></code></pre>
<p>فيما يلي أمثلة توضح كيفية استخدام كل وضع من أوضاع الضغط بالدمج القسري.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">الافتراضي (الضغط القياسي)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 512 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">الحجم المستهدف الصريح</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=<span class="hljs-string">&quot;2048&quot;</span>  <span class="hljs-comment"># The unit is MB</span>
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Automatic-size-calculation" class="common-anchor-header">حساب الحجم تلقائيًا</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<p><a id="parameter-reference"></a></p>
<h4 id="Parameter-reference" class="common-anchor-header">مرجع المعلمات</h4><p>يوضح الجدول التالي المعلمات.</p>
<table>
   <tr>
     <th><p><strong>المعلمة</strong></p></th>
     <th><p><strong>النوع</strong></p></th>
     <th><p><strong>الوصف</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>مطلوب. اسم المجموعة المراد ضغطها.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>اختياري. حجم المقطع المستهدف بالميغابايت. هناك 3 خيارات لقيمة المعلمة:</p><ul><li><p><strong>0 أو غير محدد</strong>: يستخدم القيمة المحددة لـ " <code translate="no">dataCoord.segment.maxSize</code> " (القيمة الافتراضية: 512 ميغابايت). يعادل الضغط القياسي.</p></li><li><p><strong>قيمة صريحة</strong>: يدمج المقاطع إلى الحجم المحدد تقريبًا بالميغابايت (على سبيل المثال، 2048). يجب أن يكون أكبر من أو يساوي القيمة المحددة لـ <code translate="no">dataCoord.segment.maxSize</code>.</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>: يحسب الحجم الأمثل تلقائيًا بناءً على التوزيع الحالي للشرائح وموارد العقدة المتاحة.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>إذا كان <code translate="no">target_size</code> المحدد أقل من <code translate="no">dataCoord.segment.maxSize</code> المعيّن، فسيتم رفض الطلب مع ظهور خطأ.</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">التحقق من تقدم عملية الضغط<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>يتم تشغيل عملية الضغط «Force Merge» بشكل غير متزامن. استخدم معرّف المهمة الذي تم إرجاعه للتحقق من التقدم:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">أفضل الممارسات<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>لا تستخدم عملية الضغط بالدمج القسري في بيئات الإنتاج.</strong></p></li>
<li><p><strong>استخدم وضع الحساب التلقائي للحجم في معظم الحالات.</strong> يتيح تعيين <code translate="no">target_size</code> إلى <code translate="no">max_int64</code> لـ Milvus تحليل توزيع المقاطع وموارد العقد لتحديد الحجم الأمثل. هذا هو النهج الموصى به ما لم تكن لديك متطلبات محددة للحجم.</p></li>
<li><p><strong>ضع في اعتبارك المقايضة في الأداء.</strong> يعد ضغط الدمج القسري عملية تستهلك الكثير من الموارد. فهو يقرأ بيانات المقاطع ويدمجها ويعيد كتابتها. قم بجدولته خلال فترات انخفاض حركة المرور لتقليل التأثير على زمن استجابة الاستعلامات.</p></li>
<li><p><strong>راقب عدد المقاطع قبل وبعد العملية.</strong> استخدم <code translate="no">get_compaction_state()</code> و <code translate="no">list_persistent_segments</code> للتحقق من أن عملية الضغط قد أنتجت مقاطع أقل وأكبر حجمًا كما هو متوقع.</p></li>
</ul>
<p><a id="faq"></a></p>
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
    </button></h2><p><strong>كيف يختلف «Force Merge» عن عملية الضغط القياسية؟</strong></p>
<p>يخدم هذان النوعان من عمليات الضغط أغراضًا مختلفة.</p>
<ul>
<li><p>التكثيف القياسي (targetSize=0 أو تم حذفه) هو مسار تنظيف تدريجي يبذل أقصى جهد ممكن.</p></li>
<li><p>أما الدمج القسري (targetSize&gt;0) فهو مسار إعادة تجميع على مستوى المجموعة لإنتاج شرائح أقل عددًا وأكبر حجمًا وقريبة من الحجم المستهدف.</p></li>
</ul>
<p>الفرق الرئيسي يكمن في شكل الدمج: حيث يعمل الضغط القياسي فعليًّا على تحويل m إلى 1 لكل مهمة، بينما يعمل الدمج القسري على تحويل m إلى n عبر المدخلات المجمعة. ولهذا السبب، يمكن للدمج القسري معالجة تخطيطات المقاطع التي لا يستطيع الضغط القياسي معالجتها. يقارن الجدول التالي بين هذين النوعين من العمليات.</p>
<table>
   <tr>
     <th><p><strong>البعد</strong></p></th>
     <th><p><strong>التكثيف القياسي (الافتراضي)</strong></p></th>
     <th><p><strong>الدمج القسري</strong></p></th>
   </tr>
   <tr>
     <td><p>مشغل واجهة برمجة التطبيقات</p></td>
     <td><p>targetSize=0 (أو غير محدد)، بدون علامة Major/L0</p></td>
     <td><p>targetSize&gt;0 (ميجابايت)</p></td>
   </tr>
   <tr>
     <td><p>الهدف الأساسي</p></td>
     <td><p>التنظيف التدريجي للأجزاء الواضحة؛ الصيانة الروتينية</p></td>
     <td><p>التوحيد على مستوى المجموعة بأكملها لأغراض البحث والتوازن</p></td>
   </tr>
   <tr>
     <td><p>مصدر حجم المقطع</p></td>
     <td><p>ثابت dataCoord.segment.maxSize (تكوين الخادم)</p></td>
     <td><p>القيمة التي يحددها المستخدم targetSize، ثم يتم تقييدها بأمان بواسطة maxSafeSize</p></td>
   </tr>
   <tr>
     <td><p>صلاحية المعلمة</p></td>
     <td><p>لا يوجد ضبط لحجم المستخدم</p></td>
     <td><p>يجب أن يكون targetSize الذي يحدده المستخدم &gt;= dataCoord.segment.maxSize؛ وإلا فسيتم رفضه</p></td>
   </tr>
   <tr>
     <td><p>الحد الأعلى الآمن</p></td>
     <td><p>الحد الأقصى المحدد في التكوين فقط</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor (في حالة التشغيل المستقل بدون تجميع: يُقسّم إلى النصف مرة أخرى)</p></td>
   </tr>
   <tr>
     <td><p>شكل الدمج</p></td>
     <td><p>m → 1 لكل مهمة، المخرجات &lt;= configMaxSize</p></td>
     <td><p>m → n، المخرجات قريبة من targetSize</p></td>
   </tr>
   <tr>
     <td><p>سلوك المقطع المتوسط</p></td>
     <td><p>قد يتعطل بشكل دائم (على سبيل المثال، لا يمكن أن يتحول شريحتان بنسبة 60٪ بشكل قانوني إلى شريحة واحدة بنسبة 120٪)</p></td>
     <td><p>تعمل إعادة التعبئة + التقسيم؛ لا يوجد نمط "التعطل عند 60%"</p></td>
   </tr>
   <tr>
     <td><p>قدرة تسطيح المجموعة</p></td>
     <td><p>محدودة؛ قد تؤدي عمليات التشغيل المتكررة إلى بقاء العديد من الشرائح المتوسطة</p></td>
     <td><p>قوية؛ مصممة لتقليل عدد الشرائح وزيادة نسبة الامتلاء</p></td>
   </tr>
   <tr>
     <td><p>الوعي بالطوبولوجيا</p></td>
     <td><p>لا شيء</p></td>
     <td><p>نعم؛ يستخدم تخطيط QueryNode/replica/shard</p></td>
   </tr>
   <tr>
     <td><p>ضبط التوازي في مسار القراءة</p></td>
     <td><p>لا شيء</p></td>
     <td><p>يضبط عدد المخرجات باستخدام queryNodeCount / (النسخ المتماثلة × الشرائح) عندما يكون ذلك صالحًا</p></td>
   </tr>
   <tr>
     <td><p>حالة الاستخدام النموذجية</p></td>
     <td><p>التنظيف اليومي لمعدلات التسرب العالية بعد عمليات الكتابة/الحذف</p></td>
     <td><p>التحضير لاختبار الأداء، وتحسين البحث، ومواءمة التوازي في التحميل</p></td>
   </tr>
   <tr>
     <td><p>توقعات النطاق</p></td>
     <td><p>لا تتوقع إعادة تجميع المجموعة بالكامل</p></td>
     <td><p>مخصص لنتائج إعادة التعبئة على مستوى المجموعة</p></td>
   </tr>
</table>
<p><strong>إرشادات الاختيار:</strong></p>
<ul>
<li><p>اختر الضغط القياسي للتنظيف التدريجي منخفض المخاطر.</p></li>
<li><p>اختر الدمج القسري عندما ترغب صراحةً في إعادة تشكيل المجموعة إلى شرائح أقل عددًا وأكبر حجمًا تتوافق مع سلوك البحث والتحميل.</p></li>
</ul>
<p><strong>كيف يختلف الدمج القسري عن ضغط التجميع؟</strong></p>
<p>يعيد ضغط التجميع (<code translate="no">is_clustering=True</code>) تنظيم البيانات داخل المقاطع استنادًا إلى مفتاح التجميع لتحسين تقليص البحث. يعمل الدمج القسري (<code translate="no">target_size=N</code>) على تحسين أحجام المقاطع دون تغيير توزيع البيانات. يخدم كل منهما أغراضًا مختلفة ويمكن استخدامهما معًا — قم بتشغيل ضغط التجميع أولاً لتنظيم البيانات، ثم الدمج القسري لتوحيد المقاطع الناتجة.</p>
<p><strong>هل يمكنني تشغيل «الدمج القسري» على مجموعة يجري الاستعلام عنها؟</strong></p>
<p>نعم. تعمل «Force Merge» بشكل غير متزامن ولا تعطل الاستعلامات. ومع ذلك، فهي تستهلك موارد DataNode وموارد الإدخال/الإخراج (I/O) للقرص، لذا قد يزداد زمن استجابة الاستعلامات أثناء عملية الضغط. قم بجدولة «Force Merge» خلال فترات انخفاض حركة المرور للحصول على أفضل النتائج.</p>
<p><strong>ماذا يحدث إذا قمت بتعيين target_size أصغر من maxSize؟</strong></p>
<p>يتم رفض الطلب مع ظهور رسالة خطأ. يجب أن يكون الحجم المستهدف أكبر من أو يساوي القيمة المُعدة لـ ` <code translate="no">dataCoord.segment.maxSize</code>`.</p>
