---
id: tiered-storage-overview.md
title: نظرة عامة على التخزين المتدرجCompatible with Milvus 2.6.4+
summary: >-
  في Milvus، يتطلب وضع التحميل الكامل التقليدي أن تقوم كل عقدة استعلام بتحميل
  جميع حقول المخطط وفهارس المقطع عند التهيئة، حتى البيانات التي قد لا يتم الوصول
  إليها أبدًا. يضمن هذا توافر البيانات بشكل فوري ولكنه غالبًا ما يؤدي إلى إهدار
  الموارد، بما في ذلك الاستخدام العالي للذاكرة، ونشاط القرص الثقيل، والنفقات
  الزائدة الكبيرة للإدخال/الإخراج، خاصةً عند التعامل مع مجموعات البيانات واسعة
  النطاق.
beta: Milvus 2.6.4+
---
<h1 id="Tiered-Storage-Overview" class="common-anchor-header">نظرة عامة على التخزين المتدرج<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Tiered-Storage-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>في Milvus، يتطلب <strong>وضع التحميل الكامل</strong> التقليدي أن تقوم كل عقدة استعلام بتحميل جميع حقول المخطط وفهارس <a href="https://zilliverse.feishu.cn/wiki/IBX3w5p4Tipy1KkNxI6cbEOwnGf">المقطع</a> عند التهيئة، حتى البيانات التي قد لا يتم الوصول إليها أبدًا. وهذا يضمن التوافر الفوري للبيانات ولكنه يؤدي في كثير من الأحيان إلى إهدار الموارد، بما في ذلك الاستخدام العالي للذاكرة، ونشاط القرص الثقيل، والنفقات الزائدة الكبيرة للإدخال/الإخراج، خاصة عند التعامل مع مجموعات البيانات واسعة النطاق.</p>
<p>يتصدى<strong>التخزين المتدرج</strong> لهذا التحدي من خلال فصل التخزين المؤقت للبيانات عن تحميل المقاطع. فبدلاً من تحميل جميع البيانات دفعة واحدة، يقدم Milvus طبقة تخزين مؤقت تميز بين البيانات الساخنة (المخزنة محليًا) والبيانات الباردة (المخزنة عن بُعد). تقوم الآن QueryNode الآن بتحميل البيانات الوصفية خفيفة الوزن فقط في البداية وتسحب البيانات أو تخليها ديناميكيًا عند الطلب. يؤدي ذلك إلى تقليل وقت التحميل بشكل كبير، وتحسين استخدام الموارد المحلية، وتمكين QueryNode من معالجة مجموعات البيانات التي تتجاوز بكثير سعة الذاكرة الفعلية أو سعة القرص.</p>
<p>يمكنك التفكير في تمكين التخزين المتدرج في سيناريوهات مثل:</p>
<ul>
<li><p>المجموعات التي تتجاوز سعة الذاكرة المتاحة أو سعة NVMe لعقدة استعلام واحدة</p></li>
<li><p>أحمال العمل التحليلية أو أحمال العمل الدفعية حيث يكون التحميل الأسرع أكثر أهمية من زمن انتقال الاستعلام الأول</p></li>
<li><p>أحمال العمل المختلطة التي يمكن أن تتسامح مع حالات فقدان ذاكرة التخزين المؤقت العرضية للبيانات التي يتم الوصول إليها بشكل أقل تكرارًا</p></li>
</ul>
<div class="alert note">
<p>لمزيد من التفاصيل حول الشرائح والقطع، راجع <a href="https://zilliverse.feishu.cn/wiki/IBX3w5p4Tipy1KkNxI6cbEOwnGf">شرح الشريحة</a>.</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">كيف يعمل<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>يعمل التخزين المتدرج على تغيير كيفية إدارة QueryNode لبيانات المقطع. فبدلاً من التخزين المؤقت لكل حقل وفهرس في وقت التحميل، تقوم QueryNode الآن بتحميل <strong>البيانات الوصفية</strong> فقط وتستخدم طبقة تخزين مؤقت لجلب البيانات وإخلائها ديناميكيًا.</p>
<div class="alert note">
<p>تتضمن<strong>البيانات الوصفية</strong> المخطط وتعريفات الفهرس وخرائط القطع وأعداد الصفوف والمراجع إلى الكائنات البعيدة. هذه البيانات صغيرة ودائمًا ما يتم تخزينها مؤقتًا ولا يتم إخلاؤها أبدًا.</p>
</div>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">وضع التحميل الكامل مقابل وضع التخزين المتدرج<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>بينما يتعامل كل من وضعي التحميل الكامل والتخزين المتدرج مع نفس البيانات، إلا أنهما يختلفان في توقيت وكيفية تخزين QueryNode لهذه المكونات مؤقتًا.</p>
<ul>
<li><p><strong>وضع التحميل الكامل</strong>: في وقت التحميل، تقوم QueryNode بتخزين بيانات المجموعة الكاملة مؤقتًا، بما في ذلك البيانات الوصفية وبيانات الحقول والفهارس، من تخزين الكائنات.</p></li>
<li><p><strong>وضع التخزين المتدرج</strong>: في وقت التحميل، تقوم QueryNode بتخزين البيانات الوصفية فقط. يتم سحب بيانات الحقل عند الطلب عند الطلب على شكل أجزاء. تظل ملفات الفهرس بعيدة حتى يحتاج إليها الاستعلام الأول؛ ثم يتم جلب الفهرس الكامل لكل جزء وتخزينه مؤقتًا.</p></li>
</ul>
<p>يوضح الرسم البياني أدناه هذه الاختلافات.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/full-load-mode-vs-tiered-storage-mode.png" alt="Full Load Mode Vs Tiered Storage Mode" class="doc-image" id="full-load-mode-vs-tiered-storage-mode" />
   </span> <span class="img-wrapper"> <span>وضع التحميل الكامل مقابل وضع التخزين المتدرج</span> </span></p>
<h3 id="QueryNode-loading-workflow" class="common-anchor-header">سير عمل تحميل عقدة الاستعلام<button data-href="#QueryNode-loading-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>في وضع التخزين المتدرج، يتكون سير العمل من ثلاث مراحل:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/querynode-loading-workflow.png" alt="Querynode Loading Workflow" class="doc-image" id="querynode-loading-workflow" />
   </span> <span class="img-wrapper"> <span>سير عمل تحميل عقدة الاستعلام</span> </span></p>
<h4 id="Lazy-load" class="common-anchor-header">التحميل البطيء</h4><p>عند التهيئة، يقوم Milvus بتحميل كسول، حيث يقوم بتخزين <strong>البيانات الوصفية</strong> التي تحتوي على تعريفات المخطط ومعلومات الفهرس وتعيينات القطع وأعداد الصفوف مؤقتًا فقط.</p>
<p>لا يتم تنزيل بيانات الحقل أو ملفات الفهرس في هذه المرحلة. هذا يجعل المجموعات قابلة للاستعلام بسرعة ويقلل من استخدام موارد بدء التشغيل.</p>
<p><strong>المزايا</strong></p>
<ul>
<li><p>وقت تحميل المجموعات بشكل أسرع بكثير</p></li>
<li><p>الحد الأدنى من الذاكرة وبصمة القرص</p></li>
<li><p>تمكين QueryNodes من معالجة المزيد من المقاطع بشكل متزامن</p></li>
</ul>
<p><strong>التكوين</strong></p>
<p>يتم تطبيقه تلقائيًا عند تمكين التخزين المتدرج. لا يلزم إعداد يدوي.</p>
<h4 id="Partial-load" class="common-anchor-header">التحميل الجزئي</h4><p>عند بدء عملية استعلام أو عملية بحث، تقوم عقدة الاستعلام بإجراء تحميل جزئي، حيث تقوم بجلب أجزاء الحقل أو الفهارس المطلوبة فقط من تخزين الكائنات وتخزينها مؤقتاً لإعادة استخدامها.</p>
<ul>
<li><p><strong>الحقول</strong>: يتم تحميلها عند الطلب على مستوى <strong>القطعة</strong> </p></li>
<li><p><strong>الفهارس:</strong> يتم تحميلها في أول مرة يتم الوصول إليها على مستوى <strong>القطعة</strong> </p></li>
</ul>
<p><strong>الفوائد</strong></p>
<ul>
<li><p>تقليل الضغط على الذاكرة والقرص</p></li>
<li><p>يسمح لميلفوس بالاستعلام عن مجموعات البيانات الكبيرة بكفاءة</p></li>
<li><p>يوازن بين وقت استجابة الاستعلام وكفاءة الموارد</p></li>
</ul>
<p><strong>التكوين</strong></p>
<p>التحميل الجزئي هو السلوك الافتراضي عند تمكين التخزين المتدرج. لتقليل زمن انتقال الضربة الأولى للحقول أو الفهارس المهمة، استخدم <strong>الإحماء</strong> للتحميل المسبق للبيانات قبل الاستعلامات. راجع <a href="/docs/ar/warm-up.md">الإحماء</a> للحصول على أمثلة للتكوين.</p>
<h4 id="Eviction" class="common-anchor-header">الإخلاء</h4><p>للحفاظ على الاستخدام الصحي للموارد، يقوم Milvus تلقائياً بتحرير البيانات المخزنة مؤقتاً غير المستخدمة عند الوصول إلى العتبات.</p>
<p>يتبع الإخلاء سياسة "الإخلاء <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">الأقل استخداماً" (LRU</a> ) وتحكمه معلمات قابلة للتكوين:</p>
<ul>
<li><p><strong>العلامات المائية:</strong> تحديد عتبات البدء والإيقاف لعتبات الإخلاء</p></li>
<li><p><strong>TTL TTL لذاكرة التخزين المؤقت:</strong> يزيل العناصر المخزنة مؤقتًا القديمة بعد مدة محددة</p></li>
<li><p><strong>نسبة الالتزام الزائد:</strong> يسمح بزيادة الاشتراك المؤقت قبل تسريع عملية الإخلاء</p></li>
</ul>
<p><strong>المزايا</strong></p>
<ul>
<li><p>يحافظ على استقرار استخدام ذاكرة التخزين المؤقت عبر أعباء العمل</p></li>
<li><p>يزيد من إعادة استخدام ذاكرة التخزين المؤقت إلى أقصى حد مع منع الأعطال</p></li>
<li><p>يحافظ على أداء يمكن التنبؤ به بمرور الوقت</p></li>
</ul>
<p><strong>التكوين</strong></p>
<p>تمكين معلمات الإخلاء وضبطها في <code translate="no">milvus.yaml</code>. راجع <a href="/docs/ar/eviction.md">الإخلاء</a> للحصول على تكوين مفصل.</p>
<h2 id="Getting-started" class="common-anchor-header">الشروع في العمل<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
<li><p>ميلفوس 2.6.4+</p></li>
<li><p>عقد الاستعلام مع ذاكرة وموارد قرص مخصصة</p></li>
<li><p>خلفية تخزين الكائنات (S3، MinIO، إلخ)</p></li>
</ul>
<div class="alert warning">
<p>يجب عدم مشاركة موارد عقدة الاستعلام مع أحمال العمل الأخرى. يمكن أن تتسبب الموارد المشتركة في إساءة تقدير السعة المتاحة في التخزين المتدرج مما يؤدي إلى حدوث أعطال.</p>
</div>
<h3 id="Basic-configuration-template" class="common-anchor-header">قالب التكوين الأساسي<button data-href="#Basic-configuration-template" class="anchor-icon" translate="no">
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
    </button></h3><p>تحرير ملف تكوين Milvus (<code translate="no">milvus.yaml</code>) لتكوين إعدادات التخزين المتدرج:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Warm Up Configuration</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar field data</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar indexes</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>   <span class="hljs-comment"># Don&#x27;t preload vector field data (large)</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload vector indexes</span>
      
      <span class="hljs-comment"># Eviction Configuration</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      
      <span class="hljs-comment"># Memory Watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>   <span class="hljs-comment"># Stop evicting at 75%</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>  <span class="hljs-comment"># Start evicting at 80%</span>
      
      <span class="hljs-comment"># Disk Watermarks  </span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>
      
      <span class="hljs-comment"># Cache TTL (7 days)</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
      
      <span class="hljs-comment"># Overcommit Ratios</span>
      <span class="hljs-attr">evictableMemoryCacheRatio:</span> <span class="hljs-number">0.3</span>
      <span class="hljs-attr">evictableDiskCacheRatio:</span> <span class="hljs-number">0.3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Next-steps" class="common-anchor-header">الخطوات التالية<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>تكوين الإحماء</strong> - تحسين التحميل المسبق لأنماط الوصول الخاصة بك. انظر <a href="/docs/ar/warm-up.md">الإحماء</a>.</p></li>
<li><p><strong>ضبط الإخلاء</strong> - قم بتعيين العلامات المائية المناسبة و TTL المناسب لقيود الموارد الخاصة بك. راجع <a href="/docs/ar/eviction.md">الإخلاء</a>.</p></li>
<li><p><strong>مراقبة الأداء</strong> - تتبع معدلات الوصول إلى ذاكرة التخزين المؤقت، وتكرار الإخلاء، وأنماط زمن انتقال الاستعلام.</p></li>
<li><p><strong>تكرار التهيئة</strong> - اضبط الإعدادات بناءً على خصائص عبء العمل الملحوظة.</p></li>
</ol>
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
    </button></h2><h3 id="Can-I-change-Tiered-Storage-parameters-at-runtime" class="common-anchor-header">هل يمكنني تغيير معلمات التخزين المتدرج في وقت التشغيل؟<button data-href="#Can-I-change-Tiered-Storage-parameters-at-runtime" class="anchor-icon" translate="no">
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
    </button></h3><p>لا، يجب تعيين جميع المعلمات في <code translate="no">milvus.yaml</code> قبل بدء تشغيل Milvus. تتطلب التغييرات إعادة التشغيل لتصبح سارية المفعول.</p>
<h3 id="Does-Tiered-Storage-affect-data-durability" class="common-anchor-header">هل يؤثر التخزين المتدرج على متانة البيانات؟<button data-href="#Does-Tiered-Storage-affect-data-durability" class="anchor-icon" translate="no">
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
    </button></h3><p>لا. لا يزال يتم التعامل مع استمرارية البيانات عن طريق تخزين الكائنات عن بُعد. يقوم التخزين المتدرج بإدارة التخزين المؤقت فقط على عقد الاستعلام.</p>
<h3 id="Will-queries-always-be-faster-with-Tiered-Storage" class="common-anchor-header">هل ستكون الاستعلامات أسرع دائمًا مع التخزين المتدرج؟<button data-href="#Will-queries-always-be-faster-with-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>ليس بالضرورة. يقلل التخزين المتدرج من وقت التحميل واستخدام الموارد، ولكن قد تشهد الاستعلامات التي تلمس البيانات غير المخزنة مؤقتًا (الباردة) زمن استجابة أعلى. بالنسبة لأعباء العمل الحساسة لزمن الاستعلام، يوصى باستخدام وضع التحميل الكامل.</p>
<h3 id="Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="common-anchor-header">لماذا يستمر نفاد موارد عقدة الاستعلام حتى مع تمكين التخزين المتدرج؟<button data-href="#Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="anchor-icon" translate="no">
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
    </button></h3><p>هناك سببان شائعان:</p>
<ul>
<li><p>تم تكوين عقدة الاستعلام بموارد قليلة جداً. تعتبر العلامات المائية نسبية بالنسبة للموارد المتاحة، لذا فإن نقص التزويد يزيد من سوء التقدير.</p></li>
<li><p>تتم مشاركة موارد عقدة الاستعلام مع أعباء عمل أخرى، لذلك لا يمكن للتخزين المتدرج تقييم السعة الفعلية المتاحة بشكل صحيح.</p></li>
</ul>
<h3 id="Why-do-some-queries-fail-under-high-concurrency" class="common-anchor-header">لماذا تفشل بعض الاستعلامات في ظل التزامن العالي؟<button data-href="#Why-do-some-queries-fail-under-high-concurrency" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا وصل عدد كبير جدًا من الاستعلامات إلى البيانات الساخنة في نفس الوقت، فقد يتم تجاوز حدود موارد QueryNode. قد تفشل بعض المواضيع بسبب مهلات حجز الموارد. يمكن أن تؤدي إعادة المحاولة بعد انخفاض الحمل، أو تخصيص المزيد من الموارد، إلى حل هذه المشكلة.</p>
<h3 id="Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="common-anchor-header">لماذا يزداد زمن انتقال البحث/الاستعلام بعد تمكين التخزين المتدرج؟<button data-href="#Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>تتضمن الأسباب المحتملة ما يلي:</p>
<ul>
<li><p>الاستعلامات المتكررة للبيانات الباردة، والتي يجب جلبها من التخزين.</p></li>
<li><p>نسبة التزام زائدة مرتفعة للغاية، مما يؤدي إلى الإخلاء المتكرر.</p></li>
<li><p>تعيين علامات مائية قريبة جدًا من بعضها البعض، مما يتسبب في الإخلاء المتزامن المتكرر.</p></li>
</ul>
<h3 id="Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="common-anchor-header">هل يمكن للتخزين المتدرج التعامل مع البيانات غير المحدودة عن طريق الالتزام الزائد بذاكرة التخزين المؤقت؟<button data-href="#Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="anchor-icon" translate="no">
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
    </button></h3><p>لا. تسمح نسب الالتزام الزائد ل QueryNodes بالعمل مع شرائح أكثر مما تسمح به الذاكرة الفعلية، ولكن يمكن أن تؤدي النسب العالية للغاية إلى الإخلاء المتكرر أو تعطل ذاكرة التخزين المؤقت أو فشل الاستعلام.</p>
