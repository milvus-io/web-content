---
id: gpu-index-overview.md
title: نظرة عامة على فهرس GPU
summary: >-
  يمكن أن يؤدي إنشاء فهرس مع دعم وحدة معالجة الرسومات في Milvus إلى تحسين أداء
  البحث بشكل كبير في سيناريوهات الإنتاجية العالية والاستدعاء العالي.
---
<h1 id="GPU-Index-Overview" class="common-anchor-header">نظرة عامة على فهرس GPU<button data-href="#GPU-Index-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>يمكن أن يؤدي إنشاء فهرس مع دعم GPU في Milvus إلى تحسين أداء البحث بشكل كبير في سيناريوهات الإنتاجية العالية والاستدعاء العالي.</p>
<p>يقارن الشكل التالي معدل إنتاجية الاستعلام (الاستعلامات في الثانية) لمختلف تكوينات الفهرس عبر إعدادات الأجهزة المختلفة ومجموعات البيانات المتجهة (Cohere وOpenAI) وأحجام دفعات البحث، مما يوضح أن <code translate="no">GPU_CAGRA</code> يتفوق باستمرار على الطرق الأخرى.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/gpu-index-performance.png" alt="Gpu Index Performance" class="doc-image" id="gpu-index-performance" />
   </span> <span class="img-wrapper"> <span>أداء فهرس وحدة المعالجة المركزية</span> </span></p>
<h2 id="Limits" class="common-anchor-header">الحدود<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>بالنسبة إلى <code translate="no">GPU_IVF_FLAT</code> ، القيمة القصوى لـ <code translate="no">limit</code> هي 1,024.</p></li>
<li><p>بالنسبة لـ <code translate="no">GPU_IVF_PQ</code> و <code translate="no">GPU_CAGRA</code> ، القيمة القصوى لـ <code translate="no">limit</code> هي 1,024.</p></li>
<li><p>في حين أنه لا توجد مجموعة <code translate="no">limit</code> لـ <code translate="no">GPU_BRUTE_FORCE</code> ، يوصى بعدم تجاوز 4,096 لتجنب مشاكل الأداء المحتملة.</p></li>
<li><p>في الوقت الحالي، لا تدعم فهارس GPU المسافة <code translate="no">COSINE</code>. إذا كانت المسافة <code translate="no">COSINE</code> مطلوبة، يجب تطبيع البيانات أولاً، ثم يمكن استخدام مسافة المنتج الداخلي (IP) كبديل.</p></li>
<li><p>تحميل حماية OOM لفهارس وحدة معالجة الرسومات غير مدعوم بالكامل، قد يؤدي تحميل الكثير من البيانات إلى تعطل QueryNode.</p></li>
<li><p>لا تدعم فهارس وحدة معالجة الرسومات وظائف البحث مثل <a href="/docs/ar/range-search.md">البحث في النطاق</a> <a href="/docs/ar/grouping-search.md">والبحث في التجميع</a>.</p></li>
</ul>
<h2 id="Supported-GPU-index-types" class="common-anchor-header">أنواع فهارس GPU المدعومة<button data-href="#Supported-GPU-index-types" class="anchor-icon" translate="no">
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
    </button></h2><p>يسرد الجدول التالي أنواع فهارس GPU المدعومة من قبل Milvus.</p>
<table>
   <tr>
     <th><p>نوع الفهرس</p></th>
     <th><p>الوصف</p></th>
     <th><p>استخدام الذاكرة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/gpu-cagra.md">GPU_CAGRA</a></p></td>
     <td><p>GPU_CAGRA هو فهرس قائم على الرسم البياني مُحسَّن لوحدات معالجة الرسوم البيانية، ويمكن أن يكون استخدام وحدات معالجة الرسومات الاستدلالية لتشغيل إصدار Milvus GPU أكثر فعالية من حيث التكلفة مقارنةً باستخدام وحدات معالجة الرسومات باهظة الثمن من فئة التدريب.</p></td>
     <td><p>يبلغ استخدام الذاكرة حوالي 1.8 ضعف استخدام البيانات المتجهة الأصلية.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/gpu-ivf-flat.md">GPU_IVF_FLAT</a></p></td>
     <td><p>GPU_IVF_FLAT هو فهرس IVF الأساسي، وتكون البيانات المشفرة المخزنة في كل وحدة متسقة مع البيانات الأصلية. عند إجراء عمليات البحث، لاحظ أنه يمكنك تعيين أعلى k (<code translate="no">limit</code>) حتى 256 لأي بحث مقابل مجموعة مفهرسة GPU_IVF_FLAT.</p></td>
     <td><p>يتطلب ذاكرة مساوية لحجم البيانات الأصلية.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/gpu-ivf-pq.md">GPU_IVF_PQ</a></p></td>
     <td><p>يُنفذ GPU_IVF_PQ تجميع فهرس IVF قبل تكميم حاصل ضرب المتجهات. عند إجراء عمليات البحث، لاحظ أنه يمكنك تعيين أعلى k (<code translate="no">limit</code>) حتى 8,192 لأي بحث مقابل مجموعة مفهرسة GPU_IVF_FLAT.</p></td>
     <td><p>يستخدم بصمة ذاكرة أصغر، والتي تعتمد على إعدادات معلمة الضغط.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/gpu-brute-force.md">gpU_brute_forforce</a></p></td>
     <td><p>تم تصميم GPU_BRUTE_FORCE للحالات التي يكون فيها الاستدعاء العالي للغاية أمرًا بالغ الأهمية، مما يضمن استدعاء 1 من خلال مقارنة كل استعلام مع جميع المتجهات في مجموعة البيانات. يتطلب فقط نوع المقياس (<code translate="no">metric_type</code>) و top-k (<code translate="no">limit</code>) كمعلمات بناء الفهرس والبحث.</p></td>
     <td><p>يتطلب ذاكرة مساوية لحجم البيانات الأصلية.</p></td>
   </tr>
</table>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">تكوين إعدادات Milvus للتحكم في ذاكرة وحدة معالجة الرسومات<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>يستخدم Milvus مجموعة ذاكرة رسومات عامة لتخصيص ذاكرة وحدة معالجة الرسومات. وهو يدعم معلمتين <code translate="no">initMemSize</code> و <code translate="no">maxMemSize</code> في <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">ملف تكوين Milvus</a>. يتم تعيين حجم التجمع في البداية على <code translate="no">initMemSize</code> ، وسيتم توسيعه تلقائيًا إلى <code translate="no">maxMemSize</code> بعد تجاوز هذا الحد.</p>
<p>ويكون الافتراضي <code translate="no">initMemSize</code> هو 1/2 من ذاكرة وحدة معالجة الرسومات المتوفرة عند بدء تشغيل Milvus، ويكون الافتراضي <code translate="no">maxMemSize</code> يساوي كل ذاكرة وحدة معالجة الرسومات المتوفرة.</p>
<p>حتى الإصدار Milvus 2.4.1، كان Milvus يستخدم تجمع ذاكرة GPU موحد لوحدة معالجة الرسومات. بالنسبة للإصدارات السابقة للإصدار 2.4.1، كان يوصى بتعيين كلتا القيمتين إلى 0.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>بدءًا من الإصدار Milvus 2.4.1 وما بعده، يتم استخدام مخزن ذاكرة وحدة معالجة الرسومات فقط لبيانات وحدة معالجة الرسومات المؤقتة أثناء عمليات البحث. لذلك، يوصى بتعيينها إلى 2048 و4096.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>لمعرفة كيفية إنشاء فهرس GPU، راجع الدليل الخاص بكل نوع من أنواع الفهارس.</p>
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
    </button></h2><ul>
<li><p><strong>متى يكون من المناسب استخدام فهرس GPU؟</strong></p>
<p>يكون فهرس GPU مفيدًا بشكل خاص في المواقف التي تتطلب إنتاجية عالية أو استدعاءً عاليًا. على سبيل المثال، عند التعامل مع الدفعات الكبيرة، يمكن أن تتجاوز إنتاجية فهرسة وحدة معالجة الرسومات إنتاجية فهرسة وحدة المعالجة المركزية بما يصل إلى 100 مرة. في السيناريوهات ذات الدفعات الأصغر، لا تزال فهارس وحدة معالجة الرسومات تتفوق بشكل كبير على فهارس وحدة المعالجة المركزية من حيث الأداء. علاوةً على ذلك، إذا كانت هناك متطلبات لإدخال البيانات بسرعة، فإن دمج وحدة معالجة الرسومات يمكن أن يسرّع عملية إنشاء الفهارس بشكل كبير.</p></li>
<li><p><strong>في أي السيناريوهات تكون فهارس وحدة معالجة الرسومات مثل GPU_CAGRA و GPU_IVF_PQ و GPU_IVF_PQ و GPU_IVF_FLAT و GPU_BRUT_FORCE الأنسب؟</strong></p>
<p><code translate="no">GPU_CAGRA</code> تعد الفهارس مثالية للسيناريوهات التي تتطلب أداءً محسنًا، وإن كان ذلك على حساب استهلاك المزيد من الذاكرة. بالنسبة للبيئات التي يكون فيها الحفاظ على الذاكرة أولوية، يمكن أن يساعد الفهرس <code translate="no">GPU_IVF_PQ</code> في تقليل متطلبات التخزين، على الرغم من أن ذلك يأتي مع خسارة أعلى في الدقة. يعمل الفهرس <code translate="no">GPU_IVF_FLAT</code> كخيار متوازن، حيث يوفر حلاً وسطًا بين الأداء واستخدام الذاكرة. أخيرًا، تم تصميم الفهرس <code translate="no">GPU_BRUTE_FORCE</code> لعمليات البحث الشاملة، مما يضمن معدل استدعاء يبلغ 1 من خلال إجراء عمليات بحث اجتياحية.</p></li>
</ul>
