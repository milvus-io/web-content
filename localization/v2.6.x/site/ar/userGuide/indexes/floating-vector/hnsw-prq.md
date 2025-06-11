---
id: hnsw-prq.md
title: HNSW_PRQ
summary: >-
  تستفيد HNSW_PRQ من الرسوم البيانية للعالم الصغير القابل للتنقل الهرمي (HNSW)
  مع التكميم الكمي المتبقي للمنتج (PRQ)، مما يوفر طريقة فهرسة متجهة متقدمة تتيح
  لك ضبط المفاضلة بين حجم الفهرس والدقة بدقة. تتجاوز طريقة PRQ طريقة الفهرسة
  الكمية المتبقية للمنتج (PQ) التقليدية من خلال تقديم خطوة الفهرسة الكمية
  المتبقية (RQ) لالتقاط معلومات إضافية، مما يؤدي إلى دقة أعلى أو فهارس أكثر
  إحكامًا مقارنةً بالطرق القائمة على PQ فقط. ومع ذلك، يمكن أن تؤدي الخطوات
  الإضافية إلى زيادة النفقات الحسابية أثناء بناء الفهرس والبحث.
---
<h1 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ<button data-href="#HNSWPRQ" class="anchor-icon" translate="no">
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
    </button></h1><p>تستفيد<strong>HNSW_PRQ</strong> من الرسوم البيانية للعالم الصغير القابل للتنقل الهرمي (HNSW) مع التكميم الكمي المتبقي للمنتج (PRQ)، مما يوفر طريقة فهرسة متجهة متقدمة تتيح لك ضبط المفاضلة بين حجم الفهرس والدقة بدقة. تتجاوز طريقة PRQ طريقة التكميم الكمي للمنتج (PQ) التقليدية من خلال إدخال خطوة التكميم الكمي المتبقي (RQ) لالتقاط معلومات إضافية، مما يؤدي إلى دقة أعلى أو فهارس أكثر إحكامًا مقارنةً بالطرق القائمة على PQ فقط. ومع ذلك، يمكن أن تؤدي الخطوات الإضافية إلى زيادة النفقات الحسابية أثناء بناء الفهرس والبحث.</p>
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
    </button></h2><p>يجمع HNSW_PRQ بين تقنيتين للفهرسة: <strong>HSNW</strong> للتنقل السريع القائم على الرسم البياني و <strong>PRQ</strong> لضغط المتجهات بكفاءة.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>ينشئ HNSW رسمًا بيانيًا متعدد الطبقات حيث تتوافق كل عقدة مع متجه في مجموعة البيانات. في هذا الرسم البياني، ترتبط العُقد في هذا الرسم البياني بناءً على تشابهها، مما يتيح التنقل السريع عبر فضاء البيانات. يسمح الهيكل الهرمي لخوارزمية البحث بتضييق نطاق الجيران المرشحين، مما يسرّع عملية البحث بشكل كبير في المساحات عالية الأبعاد.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/hnsw.md">HNSW</a>.</p>
<h3 id="PRQ" class="common-anchor-header">PRQ</h3><p>PRQ هو نهج ضغط متجه متعدد المراحل يجمع بين تقنيتين متكاملتين: PQ وRQ. من خلال تقسيم المتجه عالي الأبعاد أولاً إلى متجهات فرعية أصغر (عن طريق PQ) ثم تكميم أي فرق متبقٍ (عن طريق RQ)، يحقق PRQ تمثيلًا مضغوطًا ودقيقًا في الوقت نفسه للبيانات الأصلية.</p>
<p>يوضح الشكل التالي كيفية عمله.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw-prq.png" alt="Hnsw Prq" class="doc-image" id="hnsw-prq" />
   </span> <span class="img-wrapper"> <span>Hnsw Prq</span> </span></p>
<ol>
<li><p><strong>تكميم المنتج (PQ)</strong></p>
<p>في هذه المرحلة، يتم تقسيم المتجه الأصلي إلى متجهات فرعية أصغر، ويتم تعيين كل متجه فرعي إلى أقرب نقطة مركزية له في دفتر الرموز المكتسبة. يقلل هذا التعيين بشكل كبير من حجم البيانات ولكنه يقدم بعض أخطاء التقريب نظرًا لأن كل متجه فرعي يتم تقريبه بواسطة نقطة مركزية واحدة. لمزيد من التفاصيل، راجع <a href="/docs/ar/ivf-pq.md#PQ">IVF_PQ</a>.</p></li>
<li><p><strong>التكميم الكمي المتبقي (RQ)</strong></p>
<p>بعد مرحلة PQ، تقوم RQ بتقدير الكمية المتبقية - الفرق بين المتجه الأصلي وتقريبه القائم على PQ - باستخدام دفاتر رموز إضافية. ولأن هذا المتبقي عادةً ما يكون أصغر بكثير، يمكن ترميزه بدقة أكبر دون زيادة كبيرة في التخزين.</p>
<p>وتحدد المعلمة <code translate="no">nrq</code> عدد المرات التي يتم فيها تكميم هذا المتبقي بشكل متكرر، مما يسمح لك بضبط التوازن بين كفاءة الضغط والدقة.</p></li>
<li><p><strong>تمثيل الضغط النهائي</strong></p>
<p>بمجرد انتهاء RQ من تكميم المتبقي، يتم دمج الرموز الصحيحة من كل من PQ و RQ في فهرس مضغوط واحد. من خلال التقاط التفاصيل الدقيقة التي قد يفوتها PQ وحده، يعزز RQ الدقة دون التسبب في زيادة كبيرة في التخزين. هذا التآزر بين PQ وRQ هو ما يميز PRQ.</p></li>
</ol>
<h3 id="HNSW-+-PRQ" class="common-anchor-header">HNSW + PRQ</h3><p>من خلال الجمع بين HNSW و PRQ، يحتفظ <strong>HNSW_PRQ</strong> بالبحث السريع القائم على الرسم البياني ل HNSW مع الاستفادة من الضغط متعدد المراحل ل PRQ. يبدو سير العمل كما يلي:</p>
<ol>
<li><p><strong>ضغط البيانات:</strong> يتم تحويل كل متجه أولاً عن طريق PQ إلى تمثيل خشن، ثم يتم تكميم البقايا من خلال RQ لمزيد من التنقيح. والنتيجة هي مجموعة من الرموز المدمجة التي تمثل كل متجه.</p></li>
<li><p><strong>بناء الرسم البياني:</strong> تشكل المتجهات المضغوطة (بما في ذلك كل من رموز PQ و RQ) الأساس لبناء الرسم البياني HNSW. ولأن البيانات يتم تخزينها في شكل مضغوط، يتطلب الرسم البياني ذاكرة أقل، ويتم تسريع عملية التنقل من خلاله.</p></li>
<li><p><strong>استرجاع المرشح:</strong> أثناء البحث، يستخدم HNSW التمثيلات المضغوطة لاجتياز الرسم البياني واسترجاع مجموعة من المرشحين. وهذا يقلل بشكل كبير من عدد المتجهات التي تحتاج إلى النظر فيها.</p></li>
<li><p><strong>(اختياري) تنقيح النتائج:</strong> يمكن تنقيح النتائج الأولية المرشحة للحصول على دقة أفضل، بناءً على المعلمات التالية:</p>
<ul>
<li><p><code translate="no">refine</code>: يتحكم فيما إذا كانت خطوة التنقيح هذه مفعلة أم لا. عند ضبطها على <code translate="no">true</code> ، يقوم النظام بإعادة حساب المسافات باستخدام تمثيلات عالية الدقة أو غير مضغوطة.</p></li>
<li><p><code translate="no">refine_type</code>: يحدد مستوى دقة البيانات المستخدمة أثناء التنقيح (على سبيل المثال، SQ6 أو SQ8 أو BF16). يمكن أن يؤدي الاختيار ذو الدقة الأعلى مثل <code translate="no">FP32</code> إلى نتائج أكثر دقة ولكنه يتطلب المزيد من الذاكرة. يجب أن يتجاوز هذا دقة مجموعة البيانات المضغوطة الأصلية <code translate="no">sq_type</code>.</p></li>
<li><p><code translate="no">refine_k</code>: يعمل كعامل تكبير. على سبيل المثال، إذا كان أعلى <em>k</em> هو 100 و <code translate="no">refine_k</code> هو 2، فإن النظام يعيد ترتيب أفضل 200 مرشح ويعيد أفضل 100 مرشح، مما يعزز الدقة الإجمالية.</p></li>
</ul></li>
</ol>
<p>للحصول على قائمة كاملة بالمعلمات والقيم الصالحة، راجع <a href="/docs/ar/hnsw-prq.md#Index-params">بارامز الفهرس</a>.</p>
<h2 id="Build-index" class="common-anchor-header">إنشاء فهرس<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>لإنشاء فهرس <code translate="no">HNSW_PRQ</code> على حقل متجه في ميلفوس، استخدم الطريقة <code translate="no">add_index()</code> ، مع تحديد <code translate="no">index_type</code> و <code translate="no">metric_type</code> ومعلمات إضافية للفهرس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PRQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;nrq&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. في هذا المثال، اضبط القيمة على <code translate="no">HNSW_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: الطريقة المستخدمة لحساب المسافة بين المتجهات. تتضمن القيم المدعومة <code translate="no">COSINE</code> و <code translate="no">L2</code> و <code translate="no">IP</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p></li>
<li><p><code translate="no">params</code>: خيارات التكوين الإضافية لبناء الفهرس. لمزيد من التفاصيل، راجع <a href="/docs/ar/hnsw-prq.md#Index-building-params">بارامترات بناء الفهرس</a>.</p></li>
</ul>
<p>بمجرد تكوين معلمات الفهرس، يمكنك إنشاء الفهرس باستخدام الأسلوب <code translate="no">create_index()</code> مباشرةً أو تمرير بارامترات الفهرس في الأسلوب <code translate="no">create_collection</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/create-collection.md">إنشاء مجموعة</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">البحث في الفهرس<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد إنشاء الفهرس وإدراج الكيانات، يمكنك إجراء عمليات بحث عن التشابه على الفهرس.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Parameter controlling query time/accuracy trade-off</span>
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># The magnification factor</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><code translate="no">params</code>: خيارات تكوين إضافية للبحث على الفهرس. لمزيد من التفاصيل، راجع <a href="/docs/ar/hnsw-prq.md#Index-specific-search-params">باراميات البحث الخاصة بالفهرس</a>.</li>
</ul>
<h2 id="Index-params" class="common-anchor-header">باراميز الفهرس<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر هذا القسم نظرة عامة على المعلمات المستخدمة لبناء الفهرس وإجراء عمليات البحث على الفهرس.</p>
<h3 id="Index-building-params" class="common-anchor-header">معلمات بناء الفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">params</code> عند <a href="/docs/ar/hnsw-prq.md#Build-index">إنشاء فهرس</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>الحد الأقصى لعدد الوصلات （أو الحواف) التي يمكن أن تحتويها كل عقدة في الرسم البياني، بما في ذلك الحواف الصادرة والواردة. تؤثر هذه المعلمة بشكل مباشر على كل من بناء الفهرس والبحث.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>المدى</strong>: [2, 2048]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">30</code> (حتى 30 حافة صادرة و30 حافة واردة لكل عقدة)</p></td>
     <td><p>يؤدي وجود <code translate="no">M</code> أكبر بشكل عام إلى <strong>دقة أعلى</strong> ولكنه <strong>يزيد من عبء الذاكرة</strong> ويبطئ <strong>بناء الفهرس والبحث</strong>. ضع في اعتبارك زيادة <code translate="no">M</code> لمجموعات البيانات ذات الأبعاد العالية أو عندما يكون الاستدعاء العالي أمرًا بالغ الأهمية.</p>
<p>ضع في اعتبارك تقليل <code translate="no">M</code> عندما يكون استخدام الذاكرة وسرعة البحث من الاهتمامات الأساسية.</p>
<p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>عدد الجيران المرشحين الذين تم أخذهم في الاعتبار للاتصال أثناء إنشاء الفهرس. يتم تقييم مجموعة أكبر من المرشحين لكل عنصر جديد، ولكن يظل الحد الأقصى لعدد الاتصالات التي تم إنشاؤها بالفعل محدودًا بـ <code translate="no">M</code>.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>المدى</strong>: [1، <em>int_max</em>]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">360</code></p></td>
     <td><p>يؤدي ارتفاع <code translate="no">efConstruction</code> عادةً إلى <strong>فهرس أكثر دقة،</strong> حيث يتم استكشاف المزيد من الاتصالات المحتملة. ومع ذلك، يؤدي هذا أيضًا إلى <strong>إطالة وقت الفهرسة وزيادة استخدام الذاكرة</strong> أثناء الإنشاء. ضع في اعتبارك زيادة <code translate="no">efConstruction</code> لتحسين الدقة، خاصة في السيناريوهات التي يكون فيها وقت الفهرسة أقل أهمية.</p>
<p>فكر في تقليل <code translate="no">efConstruction</code> لتسريع بناء الفهرس عندما تكون قيود الموارد مصدر قلق.</p>
<p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>عدد المتجهات الفرعية (المستخدمة في التكميم) لتقسيم كل متجه عالي الأبعاد إلى متجهات عالية الأبعاد أثناء عملية التكميم.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>المدى</strong>: [1, 65536]</p>
<p><strong>القيمة الافتراضية</strong>: لا يوجد</p></td>
     <td><p>يمكن لقيمة <code translate="no">m</code> الأعلى أن تحسن الدقة، لكنها تزيد أيضًا من التعقيد الحسابي واستخدام الذاكرة. <code translate="no">m</code> يجب أن تكون القيمة قاسماً على البعد المتجه<em>(D</em>) لضمان التحلل الصحيح. القيمة الموصى بها عادةً هي <em>m = D/2</em>.</p>
<p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [D/8، D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>عدد البتات المستخدمة لتمثيل فهرس مركزية كل متجه فرعي في النموذج المضغوط. وهو يحدد مباشرةً حجم كل دفتر رموز، حيث سيحتوي كل دفتر رموز على 2 ^{\نص{نبت}}$ من وحدات مركزية. على سبيل المثال، إذا تم تعيين <code translate="no">nbits</code> على 8، فسيتم تمثيل كل متجه فرعي بفهرس مركزية من 8 بت. وهذا يسمح بوجود 2^8$ (256) مركزية ممكنة في دفتر الرموز لهذا المتجه الفرعي.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>المدى</strong>: [1, 64]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">8</code></p></td>
     <td><p>تسمح القيمة الأعلى <code translate="no">nbits</code> بوجود دفاتر رموز أكبر، مما قد يؤدي إلى تمثيلات أكثر دقة للمتجهات الأصلية. ومع ذلك، فإن ذلك يعني أيضًا استخدام المزيد من البتات لتخزين كل فهرس، مما يؤدي إلى ضغط أقل. في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nrq</code></p></td>
     <td><p>يتحكم في عدد المعادلات الفرعية المتبقية المستخدمة في مرحلة RQ. من المحتمل أن يحقق المزيد من المعادلات الفرعية ضغطًا أكبر ولكن قد يؤدي إلى فقدان المزيد من المعلومات.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>المدى</strong>: [1, 16]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">2</code></p></td>
     <td><p>تسمح القيمة الأعلى <code translate="no">nrq</code> بخطوات تكنيز فرعي إضافية متبقية، مما قد يؤدي إلى إعادة بناء أكثر دقة للمتجهات الأصلية. ومع ذلك، فإن ذلك يعني أيضًا تخزين وحساب المزيد من التكافؤات الفرعية مما يؤدي إلى حجم فهرس أكبر ونفقات حسابية أكبر.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>علامة منطقية تتحكم فيما إذا كان يتم تطبيق خطوة تنقيح أثناء البحث. تتضمن عملية التنقيح إعادة ترتيب النتائج الأولية عن طريق حساب المسافات الدقيقة بين متجه الاستعلام والمرشحين.</p></td>
     <td><p><strong>النوع</strong>: <strong>نطاق</strong> منطقي: [<code translate="no">true</code> ، <code translate="no">false</code>]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">false</code></p></td>
     <td><p>اضبط على <code translate="no">true</code> إذا كانت الدقة العالية ضرورية ويمكنك تحمل أوقات بحث أبطأ قليلاً. استخدم <code translate="no">false</code> إذا كانت السرعة أولوية وكان التنازل البسيط في الدقة مقبولاً.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>يحدد دقة البيانات المستخدمة أثناء عملية التنقيح. يجب أن تكون هذه الدقة أعلى من دقة المتجهات المضغوطة (كما تم تعيينها بواسطة المعلمات <code translate="no">m</code> و <code translate="no">nbits</code> ).</p></td>
     <td><p><strong>النوع</strong>: سلسلة <strong>النطاق</strong>: [ <code translate="no">SQ6</code> ، <code translate="no">SQ8</code> ، ، <code translate="no">BF16</code> ، <code translate="no">FP16</code> ، <code translate="no">FP32</code> ]</p>
<p><strong>القيمة الافتراضية</strong>: لا يوجد</p></td>
     <td><p>استخدم <code translate="no">FP32</code> للحصول على أقصى قدر من الدقة بتكلفة ذاكرة أعلى، أو <code translate="no">SQ6</code>/<code translate="no">SQ8</code> للحصول على ضغط أفضل. <code translate="no">BF16</code> و <code translate="no">FP16</code> يقدمان بديلاً متوازنًا.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">بارامترات البحث الخاصة بالفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="/docs/ar/hnsw-prq.md#Search-on-index">البحث في الفهرس</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>يتحكم في اتساع نطاق البحث أثناء استرجاع أقرب جار. وهي تحدد عدد العقد التي تتم زيارتها وتقييمها كأقرب جيران محتملين. 
 تؤثر هذه المعلمة على عملية البحث فقط وتطبق حصرياً على الطبقة السفلية من الرسم البياني.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>المدى</strong>: [1، <em>int_max</em>]</p>
<p><strong>القيمة الافتراضية</strong>: <em>الحد</em> (أقرب عدد من الجيران الأقرب إلى أقرب جيران للإرجاع)</p></td>
     <td><p>يؤدي وجود <code translate="no">ef</code> أكبر بشكل عام إلى <strong>دقة بحث أعلى</strong> حيث يتم النظر في المزيد من الجيران المحتملين. ومع ذلك، فإن هذا <strong>يزيد</strong> أيضًا <strong>من وقت البحث</strong>. ضع في اعتبارك زيادة <code translate="no">ef</code> عندما يكون تحقيق استرجاع عالٍ أمرًا بالغ الأهمية وتكون سرعة البحث أقل أهمية.</p>
<p>ضع في اعتبارك تقليل <code translate="no">ef</code> لإعطاء الأولوية لعمليات البحث الأسرع، خاصةً في السيناريوهات التي يكون فيها الانخفاض الطفيف في الدقة مقبولاً.</p>
<p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>عامل التكبير الذي يتحكم في عدد المرشحين الإضافيين الذين يتم فحصهم أثناء مرحلة التنقيح (إعادة الترتيب)، بالنسبة لأعلى النتائج K المطلوبة.</p></td>
     <td><p><strong>النوع</strong>: عائم <strong>المدى</strong>: [1, <em>float_max</em>)</p>
<p><strong>القيمة الافتراضية</strong>: 1</p></td>
     <td><p>يمكن أن تؤدي القيم الأعلى ل <code translate="no">refine_k</code> إلى تحسين الاستدعاء والدقة ولكنها ستزيد أيضًا من وقت البحث واستخدام الموارد. تعني القيمة 1 أن عملية التنقيح تأخذ في الاعتبار أفضل النتائج الأولية K فقط.</p></td>
   </tr>
</table>
