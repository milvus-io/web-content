---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  يجمع فهرس HNSW_SQ بين الرسوم البيانية للعالم الصغير القابل للتنقل الهرمي
  (HNSW) مع الفهرسة الكمية العددية (SQ)، مما يخلق طريقة فهرسة متجهة متقدمة توفر
  مفاضلة بين الحجم والدقة يمكن التحكم فيها. بالمقارنة مع HNSW القياسي، يحافظ هذا
  النوع من الفهرس على سرعة معالجة استعلامات عالية مع زيادة طفيفة في وقت إنشاء
  الفهرس.
---
<h1 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h1><p>يجمع<strong>HNSW_SQ</strong> بين الرسوم البيانية للعالم الصغير القابل للتنقل الهرمي (HNSW) مع الفهرسة الكمية العددية (SQ)، مما يؤدي إلى إنشاء طريقة فهرسة متجهة متقدمة توفر مفاضلة بين الحجم والدقة يمكن التحكم فيها. بالمقارنة مع <a href="/docs/ar/hnsw.md">HNSW</a> القياسي، يحافظ هذا النوع من الفهرس على سرعة معالجة استعلامات عالية مع زيادة طفيفة في وقت إنشاء الفهرس.</p>
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
    </button></h2><p>يجمع HNSW_SQ بين تقنيتي فهرسة: <strong>HNSW</strong> للتنقل السريع القائم على الرسم البياني <strong>وSQ</strong> لضغط المتجهات بكفاءة.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>ينشئ HNSW رسمًا بيانيًا متعدد الطبقات حيث تتوافق كل عقدة مع متجه في مجموعة البيانات. في هذا الرسم البياني، ترتبط العُقد في هذا الرسم البياني بناءً على تشابهها، مما يتيح التنقل السريع عبر فضاء البيانات. يسمح الهيكل الهرمي لخوارزمية البحث بتضييق نطاق الجيران المرشحين، مما يسرّع عملية البحث بشكل كبير في المساحات عالية الأبعاد.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/hnsw.md">HNSW</a>.</p>
<h3 id="SQ" class="common-anchor-header">SQ</h3><p>SQ هي طريقة لضغط المتجهات من خلال تمثيلها بعدد أقل من البتات. على سبيل المثال</p>
<ul>
<li><p>تستخدم<strong>SQ8 8</strong> بت، وتعيين القيم إلى 256 مستوى.  لمزيد من المعلومات، راجع <a href="/docs/ar/ivf-sq8.md#SQ8">IVF_SQ8</a>.</p></li>
<li><p>يستخدم<strong>SQ6 6</strong> بت لتمثيل كل قيمة من الفاصلة العائمة، مما ينتج عنه 64 مستوى منفصل.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" />
   </span> <span class="img-wrapper"> <span>Hnsw Sq</span> </span></p>
<p>يقلل هذا التخفيض في الدقة بشكل كبير من بصمة الذاكرة ويسرّع من عملية الحساب مع الاحتفاظ بالبنية الأساسية للبيانات.</p>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ</h3><p>يجمع HNSW_SQ بين نقاط القوة في HNSW وSQ لتمكين البحث التقريبي الفعال لأقرب جار. إليك كيفية عمل العملية</p>
<ol>
<li><p><strong>ضغط البيانات:</strong> يضغط SQ المتجهات باستخدام <code translate="no">sq_type</code> (على سبيل المثال، SQ6 أو SQ8)، مما يقلل من استخدام الذاكرة. قد يقلل هذا الضغط من الدقة، لكنه يسمح للنظام بالتعامل مع مجموعات بيانات أكبر.</p></li>
<li><p><strong>بناء الرسم البياني:</strong> تُستخدم المتجهات المضغوطة لبناء رسم بياني HNSW. نظرًا لأن البيانات مضغوطة، يكون الرسم البياني الناتج أصغر حجمًا وأسرع في البحث.</p></li>
<li><p><strong>استرجاع المتجهات المرشحة:</strong> عندما يتم توفير متجه استعلام، تستخدم الخوارزمية البيانات المضغوطة لتحديد مجموعة من الجيران المرشحين بسرعة من الرسم البياني HNSW.</p></li>
<li><p><strong>(اختياري) تنقيح النتائج:</strong> يمكن تنقيح النتائج الأولية المرشحة للحصول على دقة أفضل، بناءً على المعلمات التالية:</p>
<ul>
<li><p><code translate="no">refine</code>: يتحكم فيما إذا كانت خطوة التنقيح هذه مفعلة أم لا. عند ضبطها على <code translate="no">true</code> ، يقوم النظام بإعادة حساب المسافات باستخدام تمثيلات عالية الدقة أو غير مضغوطة.</p></li>
<li><p><code translate="no">refine_type</code>: يحدد مستوى دقة البيانات المستخدمة أثناء التنقيح (على سبيل المثال، SQ6 أو SQ8 أو BF16). يمكن أن يؤدي الاختيار ذو الدقة الأعلى مثل <code translate="no">FP32</code> إلى نتائج أكثر دقة ولكنه يتطلب المزيد من الذاكرة. يجب أن يتجاوز هذا دقة مجموعة البيانات المضغوطة الأصلية <code translate="no">sq_type</code>.</p></li>
<li><p><code translate="no">refine_k</code>: يعمل كعامل تكبير. على سبيل المثال، إذا كان أعلى <em>k</em> هو 100 و <code translate="no">refine_k</code> هو 2، فإن النظام يعيد ترتيب أفضل 200 مرشح ويعيد أفضل 100 مرشح، مما يعزز الدقة الإجمالية.</p></li>
</ul></li>
</ol>
<p>للحصول على قائمة كاملة بالمعلمات والقيم الصالحة، راجع <a href="/docs/ar/hnsw-sq.md#Index-params">بارامز الفهرس</a>.</p>
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
    </button></h2><p>لإنشاء فهرس <code translate="no">HNSW_SQ</code> على حقل متجه في ميلفوس، استخدم الطريقة <code translate="no">add_index()</code> ، مع تحديد <code translate="no">index_type</code> و <code translate="no">metric_type</code> ومعلمات إضافية للفهرس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_SQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;sq_type&quot;</span>: <span class="hljs-string">&quot;SQ6&quot;</span>, <span class="hljs-comment"># Scalar quantizer type</span>
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. في هذا المثال، اضبط القيمة على <code translate="no">HNSW_SQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: الطريقة المستخدمة لحساب المسافة بين المتجهات. تتضمن القيم المدعومة <code translate="no">COSINE</code> و <code translate="no">L2</code> و <code translate="no">IP</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p></li>
<li><p><code translate="no">params</code>: خيارات التكوين الإضافية لبناء الفهرس. لمزيد من التفاصيل، راجع <a href="/docs/ar/hnsw-sq.md#Index-building-params">بارامترات بناء الفهرس</a>.</p></li>
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
<li><code translate="no">params</code>: خيارات تكوين إضافية للبحث على الفهرس. لمزيد من التفاصيل، راجع <a href="/docs/ar/hnsw-sq.md#Index-specific-search-params">باراميات البحث الخاصة بالفهرس</a>.</li>
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
<h3 id="Index-building-params" class="common-anchor-header">معلمات بناء الفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">params</code> عند <a href="/docs/ar/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">إنشاء فهرس</a>.</p>
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
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>يحدد طريقة التكميم القياسي لضغط المتجهات. يوفر كل خيار توازنًا مختلفًا بين الضغط والدقة:</p>
<ul>
<li><p><code translate="no">SQ6</code>: يشفر المتجهات باستخدام أعداد صحيحة 6 بت.</p></li>
<li><p><code translate="no">SQ8</code>: ترميز المتجهات باستخدام أعداد صحيحة 8 بت.</p></li>
<li><p><code translate="no">BF16</code>: يستخدم تنسيق Bfloat16.</p></li>
<li><p><code translate="no">FP16</code>: يستخدم تنسيق الفاصلة العائمة القياسي 16 بت.</p></li>
</ul></td>
     <td><p><strong>النوع</strong>: <strong>نطاق</strong> السلسلة: [ <code translate="no">SQ6</code> ، <code translate="no">SQ8</code> ، ، <code translate="no">BF16</code> ، <code translate="no">FP16</code> ]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">SQ8</code></p></td>
     <td><p>يعتمد اختيار <code translate="no">sq_type</code> على احتياجات التطبيق المحدد. إذا كانت كفاءة الذاكرة هي الشاغل الأساسي، فقد يكون <code translate="no">SQ6</code> أو <code translate="no">SQ8</code> مناسبًا. من ناحية أخرى، إذا كانت الدقة أمرًا بالغ الأهمية، فقد يكون <code translate="no">BF16</code> أو <code translate="no">FP16</code> هو المفضل.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>علامة منطقية تتحكم فيما إذا كان يتم تطبيق خطوة تنقيح أثناء البحث. يتضمن التنقيح إعادة ترتيب النتائج الأولية عن طريق حساب المسافات الدقيقة بين متجه الاستعلام والمرشحين.</p></td>
     <td><p><strong>النوع</strong>: <strong>نطاق</strong> منطقي: [<code translate="no">true</code> ، <code translate="no">false</code>]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">false</code></p></td>
     <td><p>اضبط على <code translate="no">true</code> إذا كانت الدقة العالية ضرورية ويمكنك تحمل أوقات بحث أبطأ قليلاً. استخدم <code translate="no">false</code> إذا كانت السرعة أولوية وكان التنازل البسيط في الدقة مقبولاً.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>تحدد دقة البيانات المستخدمة في التنقيح. يجب أن تكون هذه الدقة أعلى من دقة المتجهات المضغوطة (كما تم تعيينها بواسطة <code translate="no">sq_type</code>)، مما يؤثر على دقة المتجهات المعاد تصنيفها وعلى بصمة الذاكرة الخاصة بها.</p></td>
     <td><p><strong>النوع</strong>: سلسلة <strong>النطاق</strong>: [ <code translate="no">SQ6</code> ، <code translate="no">SQ8</code> ، ، <code translate="no">BF16</code> ، <code translate="no">FP16</code> ، <code translate="no">FP32</code> ]</p>
<p><strong>القيمة الافتراضية</strong>: لا يوجد</p></td>
     <td><p>استخدم <code translate="no">FP32</code> للحصول على أقصى قدر من الدقة بتكلفة ذاكرة أعلى، أو <code translate="no">SQ6</code>/<code translate="no">SQ8</code> للحصول على ضغط أفضل. <code translate="no">BF16</code> و <code translate="no">FP16</code> يقدمان بديلاً متوازنًا.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">بارامترات البحث الخاصة بالفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="/docs/ar/hnsw-sq.md#share-DeFldzMQQoc2W4x2YiIcYUbqnne">البحث في الفهرس</a>.</p>
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
     <td><p>يؤدي وجود <code translate="no">ef</code> أكبر بشكل عام إلى <strong>دقة بحث أعلى</strong> حيث يتم النظر في المزيد من الجيران المحتملين. ومع ذلك، يؤدي ذلك أيضًا <strong>إلى زيادة وقت البحث</strong>. ضع في اعتبارك زيادة <code translate="no">ef</code> عندما يكون تحقيق استرجاع عالٍ أمرًا بالغ الأهمية وتكون سرعة البحث أقل أهمية.</p>
<p>ضع في اعتبارك تقليل <code translate="no">ef</code> لإعطاء الأولوية لعمليات البحث الأسرع، خاصةً في السيناريوهات التي يكون فيها الانخفاض الطفيف في الدقة مقبولاً.</p>
<p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [ك، 10 آلاف].</p></td>
   </tr>
   <tr>
     <td><p>س كيو</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>عامل التكبير الذي يتحكم في عدد المرشحين الإضافيين الذين يتم فحصهم أثناء مرحلة التنقيح، بالنسبة لأعلى النتائج K المطلوبة.</p></td>
     <td><p><strong>النوع</strong>: عائم <strong>المدى</strong>: [1, <em>float_max</em>)</p>
<p><strong>القيمة الافتراضية</strong>: 1</p></td>
     <td><p>يمكن أن تؤدي القيم الأعلى لـ <code translate="no">refine_k</code> إلى تحسين الاستدعاء والدقة ولكنها ستزيد أيضًا من وقت البحث واستخدام الموارد. تعني القيمة 1 أن عملية التنقيح تأخذ في الاعتبار أفضل النتائج الأولية K فقط.</p></td>
   </tr>
</table>
