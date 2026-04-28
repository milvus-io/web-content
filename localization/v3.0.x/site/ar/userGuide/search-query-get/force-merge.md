---
id: force-merge.md
title: فرض الدمج بالقوةCompatible with Milvus 3.0.x
summary: >-
  استخدم ضغط الدمج القسري لدمج المقاطع الصغيرة وتحسين أداء الاستعلام وكفاءة
  التخزين.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">فرض الدمج بالقوة<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>تم تصميم "فرض الدمج" لدمج المقاطع الصغيرة والمجزأة في مقاطع أقل وأكبر لتحسين أداء الاستعلام وكفاءة التخزين. يشرح هذا الدليل كيفية استخدام الدمج القسري للدمج.</p>
<div class="alert note">
<p>هذه الميزة في المعاينة العامة. لا تستخدمها في بيئات الإنتاج.</p>
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
    </button></h2><p>يحافظ <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">الدمج</a> القياسي على أحجام المقاطع بالقرب من <code translate="no">maxSize</code> المكوّنة من خلال عمليات الدمج من واحد إلى واحد، ولكن لا يزال بإمكانه ترك أجزاء متوسطة الحجم لا يمكن دمجها أكثر دون تجاوز الحدود. على سبيل المثال، كما هو موضح أدناه، إذا كانت المجموعة تحتوي على خمسة مقاطع بحجم 2 ميغابايت و <code translate="no">maxSize</code> 3 ميغابايت، فإن دمج أي مقطعين سيتجاوز الحد، لذلك لا يمكن للضغط القياسي تقليل عدد المقاطع بشكل أكبر ويبقى التخطيط المجزأ.</p>
<p>تضيف فرض الدمج معلمة <code translate="no">target_size</code> وتدعم إعادة تنظيم المقاطع نحو الحجم المطلوب في حدود تفاوت ضيق عندما يكون ذلك ممكنًا. كما هو موضح أدناه، إذا كان الحجم المحدد <code translate="no">target_size</code> هو 4 ميغابايت، يمكن دمج المقاطع الخمسة الصغيرة بحجم 2 ميغابايت في عدد أقل من المقاطع الأكبر. يقلل هذا من عدد المقاطع الزائد، ويدعم أهدافًا أكبر من الإعدادات الافتراضية <code translate="no">maxSize</code> ، وعندما يكون الهدف كبيرًا جدًا، يتيح للنظام اختيار حجم الإخراج العملي وعدد المقاطع للأجهزة الحالية وطوبولوجيا QueryNode.</p>
<p>لفهم طريقة الضغط التي يجب استخدامها، راجع <a href="#faq">الأسئلة الشائعة</a>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" />
   </span> <span class="img-wrapper"> <span>R8eow3kaqqhkktokblockcmocnvxmnee</span> </span></p>
<p>يعمل فرض ضغط الدمج على توسيع واجهة برمجة التطبيقات الحالية <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> الحالي باستخدام معلمة <code translate="no">target_size</code>. وهو متوافق تمامًا مع الإصدارات السابقة: تستمر مكالمات الدمج الحالية بدون <code translate="no">target_size</code> في العمل كما كانت من قبل.</p>
<p>يعمل فرض الدمج بشكل غير متزامن. لا يمنع عمليات البحث أو الاستعلام، على الرغم من أنه يستهلك موارد الإدخال/الإخراج وموارد الذاكرة أثناء التنفيذ.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">استخدام فرض الدمج الإجباري<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
<li><p>الإصدار 2.6.15 من ميلفوس أو إصدار أحدث</p></li>
<li><p>pymilvus 2.6.13 أو أحدث</p></li>
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
    </button></h3><p>تتحكم معلمات التكوين التالية في سلوك فرض الدمج. قم بتعيينها في ملف تكوين Milvus أو عبر متغيرات البيئة.</p>
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
     <td><p>الحد الأقصى الافتراضي لحجم المقطع الافتراضي بالميجابايت. يُستخدم كهدف عندما يكون <code translate="no">target_size</code> هو 0 أو تم حذفه. يُستخدم أيضًا كحد أدنى للقيمة المسموح بها للقيمة الصريحة <code translate="no">target_size</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>عتبة عدد المقاطع لاختيار الخوارزمية. عندما يتجاوز عدد المقاطع هذه القيمة، يستخدم Milvus خوارزمية جشعة أسرع لتخطيط الدمج.</p><ul><li><p>خوارزمية<strong>قياسية</strong> (تُستخدم عندما يكون عدد المقاطع &lt;= <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): تنتج نتائج دمج أكثر مثالية ولكنها تستغرق وقتًا أطول في الحساب.</p></li><li><p><strong>الخوارزمية الجشعة</strong> (تُستخدم عندما يكون عدد المقاطع &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): تكمل التخطيط بشكل أسرع بكثير على حساب تجميع أقل قليلاً من تجميع المقاطع الأمثل.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>يتم تقسيم ذاكرة DataNode على هذا العامل لحساب أكبر حجم مقطع يمكن أن يسمح به النظام.</p><ul><li><p>تخصص القيمة الأكبر ذاكرة أقل للدمج ولكنها تترك المزيد لعمليات DataNode الأخرى، مما يحسن استقرار العقدة.</p></li><li><p>القيمة الأصغر تسمح بعمليات دمج أكبر ولكنها تزيد من ضغط الذاكرة.</p></li><li><p>على سبيل المثال، باستخدام العامل الافتراضي 4.0 وعقدة بيانات ذات ذاكرة 16 جيجابايت، تكون ميزانية الدمج 4 جيجابايت. وهذا يعني أن الحجم الإجمالي للمقاطع التي يتم دمجها في عملية واحدة لا يمكن أن يتجاوز 4 جيجابايت.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>يتم تقسيم الحد الأدنى لذاكرة QueryNode على هذا العامل. يُستخدم أثناء حساب الحجم التلقائي (<code translate="no">target_size=max_int64</code>) لضمان إمكانية تحميل المقاطع المدمجة بواسطة QueryNodes.</p><ul><li><p>تنتج القيمة الأكبر مقاطع أصغر يسهل تحميلها بواسطة QueryNodes.</p></li><li><p>تسمح القيمة الأصغر بتحميل مقاطع أكبر ولكنها قد تتسبب في فشل التحميل على عقد الاستعلام المقيدة بالذاكرة.</p></li><li><p>على سبيل المثال، مع وجود العامل الافتراضي 4.0 وأصغر عقدة استعلام تحتوي على ذاكرة 16 جيجابايت، لن يتجاوز حجم الهدف المحسوب تلقائيًا 4 جيجابايت. يمنع هذا الأمر فرض الدمج من إنتاج مقاطع كبيرة جدًا بحيث لا تستطيع عقد الاستعلام تحميلها.</p></li></ul></td>
   </tr>
</table>
<p>لتطبيق التغييرات المذكورة أعلاه على مجموعة Milvus الخاصة بك، يُرجى اتباع الخطوات الواردة في <a href="/docs/ar/configure-helm.md#Configure-Milvus-via-configuration-file">تكوين Milvus مع Helm</a> <a href="/docs/ar/configure_operator.md">وتكوين Milvus مع مشغلي Milvus</a>.</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">تشغيل ضغط الدمج القسري<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكنك تشغيل فرض الدمج بالقوة عن طريق استدعاء <code translate="no">compact()</code> باستخدام المعلمة <code translate="no">target_size</code>. للحصول على تفاصيل المعلمة، انظر <a href="#parameter-reference">مرجع المعلمة</a> أدناه.</p>
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
<p>فيما يلي أمثلة توضح كيفية استخدام كل وضع من أوضاع ضغط الدمج القسري.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">افتراضي (ضغط قياسي)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

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
<h4 id="Automatic-size-calculation" class="common-anchor-header">حساب الحجم التلقائي</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Parameter-reference" class="common-anchor-header">مرجع المعلمة</h4><p>يشرح الجدول التالي المعلمات.</p>
<table>
   <tr>
     <th><p><strong>المعلمة</strong></p></th>
     <th><p><strong>النوع</strong></p></th>
     <th><p><strong>الوصف</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>شريحة</p></td>
     <td><p>مطلوب. اسم المجموعة المراد ضغطها.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>اختياري. حجم المقطع المستهدف بالميجابايت. هناك 3 خيارات لقيمة المعلمة:</p><ul><li><p><strong>0 أو محذوف</strong>: يستخدم <code translate="no">dataCoord.segment.maxSize</code> الذي تم تكوينه (افتراضي: 512 ميغابايت). مكافئ للضغط القياسي.</p></li><li><p><strong>القيمة الصريحة</strong>: يدمج المقاطع بالحجم المحدد تقريبًا بالميجابايت (على سبيل المثال: 2048). يجب أن يكون أكبر من أو يساوي <code translate="no">dataCoord.segment.maxSize</code>.</p></li><li><p><strong>max_int64 ((1 &lt;&lt;63) - 1)</strong>: يحسب الحجم الأمثل تلقائيًا استنادًا إلى توزيع المقطع الحالي وموارد العقدة المتاحة.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>إذا كان <code translate="no">target_size</code> المحدد أقل من المكوّن <code translate="no">dataCoord.segment.maxSize</code> ، يتم رفض الطلب مع ظهور خطأ.</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">التحقق من تقدم الدمج<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>يعمل ضغط الدمج القسري بشكل غير متزامن. استخدم معرف المهمة التي تم إرجاعها للتحقق من التقدم:</p>
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
<li><p><strong>لا تستخدم ضغط الدمج القسري في بيئات الإنتاج.</strong></p></li>
<li><p><strong>استخدم وضع حساب الحجم التلقائي لمعظم الحالات.</strong> يتيح الإعداد <code translate="no">target_size</code> إلى <code translate="no">max_int64</code> لـ Milvus تحليل توزيع المقطع وموارد العقدة لتحديد أفضل حجم. هذا هو النهج الموصى به ما لم يكن لديك متطلبات تحجيم محددة.</p></li>
<li><p><strong>ضع في اعتبارك مفاضلة الأداء.</strong> يعد ضغط الدمج القسري عملية كثيفة الاستخدام للموارد. فهي تقوم بقراءة بيانات المقطع ودمجها وإعادة كتابتها. قم بجدولتها خلال فترات انخفاض حركة المرور لتقليل التأثير على زمن انتقال الاستعلام.</p></li>
<li><p><strong>راقب عدد المقاطع قبل وبعد.</strong> استخدم <code translate="no">get_compaction_state()</code> و <code translate="no">list_persistent_segments</code> للتحقق من أن عملية الدمج أنتجت عددًا أقل وأكبر من المقاطع كما هو متوقع.</p></li>
</ul>
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
    </button></h2><p><strong>كيف تختلف عملية الدمج القسري عن الضغط القياسي؟</strong></p>
<p>يخدم هذان النوعان من عمليات الضغط أغراضًا مختلفة.</p>
<ul>
<li><p>الدمج القياسي (targetSize=0 أو محذوف) هو مسار تنظيف تدريجي بأفضل جهد ممكن.</p></li>
<li><p>أما الدمج القسري (targetSize&gt;0) فهو مسار إعادة تجميع على مستوى المجموعة لإنتاج مقاطع أقل وأكبر وقريبة من الهدف.</p></li>
</ul>
<p>يتمثل الاختلاف الرئيسي في شكل الدمج: الدمج القياسي هو فعليًا م → 1 لكل مهمة، بينما الدمج القسري هو م → ن عبر المدخلات المجمعة. هذا هو السبب في أن دمج القوة يمكن أن يحل تخطيطات المقاطع التي لا يستطيع الدمج القياسي حلها. يقارن الجدول التالي بين نوعي العمليات.</p>
<table>
   <tr>
     <th><p><strong>البُعد</strong></p></th>
     <th><p><strong>الدمج القياسي (افتراضي)</strong></p></th>
     <th><p><strong>فرض الدمج</strong></p></th>
   </tr>
   <tr>
     <td><p>مشغل واجهة برمجة التطبيقات</p></td>
     <td><p>TargetSize=0 (أو لم يتم تعيينه)، لا توجد علامة Major/L0</p></td>
     <td><p>حجم الهدف&gt;0 (ميغابايت)</p></td>
   </tr>
   <tr>
     <td><p>الهدف الأساسي</p></td>
     <td><p>التنظيف التدريجي للأجزاء الواضحة؛ الصيانة الروتينية</p></td>
     <td><p>الدمج على مستوى المجموعة للبحث والتوازن</p></td>
   </tr>
   <tr>
     <td><p>مصدر حجم المقطع</p></td>
     <td><p>البيانات الثابتة dataCoord.segment.maxSize (تكوين الخادم)</p></td>
     <td><p>الحجم المستهدف للمستخدم، ثم مثبت بأمان بواسطة maxSafeSafeSize</p></td>
   </tr>
   <tr>
     <td><p>صلاحية المعلمة</p></td>
     <td><p>لا يوجد ضبط لحجم المستخدم</p></td>
     <td><p>يجب أن يكون حجم المستخدم المستهدف &gt;= dataCoord.segment.maxSize؛ وإلا تم رفضه</p></td>
   </tr>
   <tr>
     <td><p>الحد الأعلى للأمان</p></td>
     <td><p>سقف التكوين فقط</p></td>
     <td><p>maxSafeSafeSize = الحد الأدنى (ميم عقدة الاستعلام، ميم عقدة البيانات) / عامل_الذاكرة (مستقل غير مجمّع: مزيد من النصف)</p></td>
   </tr>
   <tr>
     <td><p>دمج الشكل</p></td>
     <td><p>م → 1 لكل مهمة، الإخراج &lt;= configMaxSize</p></td>
     <td><p>م → ن، مخرجات قريبة من حجم الهدف</p></td>
   </tr>
   <tr>
     <td><p>سلوك المقطع المتوسط</p></td>
     <td><p>يمكن أن تتعطل بشكل دائم (على سبيل المثال، لا يمكن أن يصبح مقطعان بنسبة 60% قانونيًا مقطعًا واحدًا بنسبة 120%)</p></td>
     <td><p>إعادة التجميع + التقسيم يعمل؛ لا يوجد نمط "عالق عند 60%"</p></td>
   </tr>
   <tr>
     <td><p>قدرة تسطيح المجموعة</p></td>
     <td><p>محدودة؛ قد تظل عمليات التشغيل المتكررة تترك العديد من المقاطع المتوسطة</p></td>
     <td><p>قوي؛ مصمم لتقليل عدد المقاطع ودفع الامتلاء إلى أعلى</p></td>
   </tr>
   <tr>
     <td><p>وعي الطوبولوجيا</p></td>
     <td><p>لا يوجد</p></td>
     <td><p>نعم؛ يستخدم تخطيط QueryNode/نسخة طبق الأصل/التخطيط الشارد</p></td>
   </tr>
   <tr>
     <td><p>ضبط توازي مسار القراءة</p></td>
     <td><p>لا يوجد</p></td>
     <td><p>يضبط عدد المخرجات باستخدام queryNodeCount / (النسخ المتماثلة × الأجزاء) عندما يكون صالحًا</p></td>
   </tr>
   <tr>
     <td><p>حالة الاستخدام النموذجية</p></td>
     <td><p>التنظيف اليومي عالي الوتيرة بعد عمليات الكتابة/الحذف</p></td>
     <td><p>الإعداد المعياري، وتحسين البحث، ومواءمة توازي التحميل</p></td>
   </tr>
   <tr>
     <td><p>توقع النطاق</p></td>
     <td><p>لا تتوقع إعادة حزم المجموعة الكاملة</p></td>
     <td><p>مخصص لنتائج إعادة الحزمة على مستوى المجموعة</p></td>
   </tr>
</table>
<p><strong>إرشادات الاختيار:</strong></p>
<ul>
<li><p>اختر الدمج القياسي للتنظيف التدريجي منخفض المخاطر.</p></li>
<li><p>اختر الدمج القسري عندما تريد صراحةً إعادة تشكيل المجموعة إلى شرائح أقل وأكبر تتماشى مع سلوك البحث والتحميل.</p></li>
</ul>
<p><strong>كيف يختلف فرض الدمج عن ضغط التجميع؟</strong></p>
<p>يعمل<a href="/docs/ar/clustering-compaction.md">ضغط</a> التجميع (<code translate="no">is_clustering=True</code>) على إعادة تنظيم البيانات داخل المقاطع استنادًا إلى مفتاح تجميع لتحسين تقليم البحث. يعمل الدمج القسري (<code translate="no">target_size=N</code>) على تحسين أحجام المقاطع دون تغيير توزيع البيانات. يخدمان أغراضًا مختلفة ويمكن استخدامهما معًا - قم بتشغيل ضغط التجميع أولاً لتنظيم البيانات، ثم فرض الدمج لدمج المقاطع الناتجة.</p>
<p><strong>هل يمكنني تشغيل فرض الدمج على مجموعة يتم الاستعلام عنها؟</strong></p>
<p>نعم. يعمل فرض الدمج بشكل غير متزامن ولا يحظر الاستعلامات. ومع ذلك، فإنه يستهلك موارد DataNode وموارد الإدخال/الإخراج على القرص، لذلك قد يزيد زمن انتقال الاستعلام أثناء الدمج. قم بجدولة فرض الدمج خلال فترات انخفاض حركة المرور للحصول على أفضل النتائج.</p>
<p><strong>ماذا يحدث إذا قمت بتعيين حجم_هدف أصغر من الحد الأقصى للحجم؟</strong></p>
<p>يتم رفض الطلب مع ظهور خطأ. يجب أن يكون الحجم المستهدف أكبر من أو يساوي الحجم الذي تم تكوينه <code translate="no">dataCoord.segment.maxSize</code>.</p>
