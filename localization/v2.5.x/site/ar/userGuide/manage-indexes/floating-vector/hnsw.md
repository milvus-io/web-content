---
id: hnsw.md
order: 1
summary: ستقدم هذه المقالة مؤشر HNSW في ميلفوس.
title: HNSW
---
<h1 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h1><p>فهرس <strong>HNSW</strong> عبارة عن خوارزمية فهرسة <strong>قائمة على الرسم البياني</strong> يمكنها تحسين الأداء عند البحث عن المتجهات العائمة عالية الأبعاد. وهي توفر دقة بحث <strong>ممتازة</strong> وزمن استجابة <strong>منخفض،</strong> بينما تتطلب ذاكرة <strong>عالية</strong> للحفاظ على بنية الرسم البياني الهرمي.</p>
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
    </button></h2><p>تُنشئ خوارزمية العالم الصغير القابل للملاحة الهرمي (HNSW) رسمًا بيانيًا متعدد الطبقات، يشبه الخريطة بمستويات تكبير مختلفة. تحتوي <strong>الطبقة السفلية</strong> على جميع نقاط البيانات، بينما تتكون <strong>الطبقات العليا</strong> من مجموعة فرعية من نقاط البيانات المأخوذة من الطبقة السفلية.</p>
<p>في هذا التسلسل الهرمي، تحتوي كل طبقة على عقد تمثل نقاط البيانات، متصلة بحواف تشير إلى قربها. توفر الطبقات العليا قفزات بعيدة المدى للاقتراب بسرعة من الهدف، بينما تتيح الطبقات السفلى إمكانية البحث الدقيق للحصول على أدق النتائج.</p>
<p>إليك كيفية عملها</p>
<ol>
<li><strong>نقطة الدخول</strong>: يبدأ البحث عند نقطة دخول ثابتة في الطبقة العليا، وهي عقدة محددة مسبقًا في الرسم البياني.</li>
<li><strong>البحث الجشع</strong>: تنتقل الخوارزمية بشراهة إلى أقرب جار في الطبقة الحالية حتى لا تتمكن من الاقتراب من متجه الاستعلام. تخدم الطبقات العليا غرضًا ملاحيًا، حيث تعمل كمرشح خشن لتحديد نقاط الدخول المحتملة للبحث الأدق في المستويات الأدنى.</li>
<li><strong>نزول الطبقة</strong>: بمجرد الوصول إلى <strong>الحد الأدنى المحلي</strong> في الطبقة الحالية، تقفز الخوارزمية إلى الطبقة السفلى، باستخدام اتصال محدد مسبقًا، وتكرر البحث الجشع.</li>
<li><strong>التنقيح</strong><strong>النهائي</strong>: تستمر هذه العملية حتى الوصول إلى الطبقة السفلى، حيث تحدد خطوة التنقية النهائية أقرب الجيران.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" />
   </span> <span class="img-wrapper"> <span>HNSW</span> </span></p>
<p>يعتمد أداء HNSW على العديد من المعلمات الرئيسية التي تتحكم في كل من بنية الرسم البياني وسلوك البحث. وتشمل هذه المعلمات</p>
<ul>
<li><code translate="no">M</code>: الحد الأقصى لعدد الحواف أو الوصلات التي يمكن أن تمتلكها كل عقدة في الرسم البياني في كل مستوى من مستويات التسلسل الهرمي. يؤدي ارتفاع <code translate="no">M</code> إلى رسم بياني أكثر كثافة ويزيد من التذكر والدقة لأن البحث لديه المزيد من المسارات لاستكشافها، وهو ما يستهلك أيضًا المزيد من الذاكرة ويبطئ وقت الإدراج بسبب الاتصالات الإضافية. كما هو موضح في الصورة أعلاه، يشير <strong>M = 5</strong> إلى أن كل عقدة في الرسم البياني HNSW متصلة مباشرةً بخمس عقد أخرى كحد أقصى. وهذا يخلق بنية رسم بياني معتدلة الكثافة حيث يكون للعقد مسارات متعددة للوصول إلى العقد الأخرى.</li>
<li><code translate="no">efConstruction</code>: عدد المرشحين الذين تم أخذهم في الاعتبار أثناء بناء الفهرس. يؤدي ارتفاع <code translate="no">efConstruction</code> عمومًا إلى الحصول على رسم بياني بجودة أفضل ولكنه يتطلب وقتًا أطول للبناء.</li>
<li><code translate="no">ef</code>: عدد الجيران الذين يتم تقييمهم أثناء البحث. زيادة <code translate="no">ef</code> يحسن من احتمالية العثور على أقرب الجيران ولكنه يبطئ عملية البحث.</li>
</ul>
<p>للحصول على تفاصيل حول كيفية ضبط هذه الإعدادات لتناسب احتياجاتك، راجع <a href="#index-params">بارامز الفهرس</a>.</p>
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
    </button></h2><p>لإنشاء فهرس <code translate="no">HNSW</code> على حقل متجه في ميلفوس، استخدم الطريقة <code translate="no">add_index()</code> ، مع تحديد <code translate="no">index_type</code> و <code translate="no">metric_type</code> ومعلمات إضافية للفهرس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. في هذا المثال، اضبط القيمة على <code translate="no">HNSW</code>.</p></li>
<li><p><code translate="no">metric_type</code>: الطريقة المستخدمة لحساب المسافة بين المتجهات. تتضمن القيم المدعومة <code translate="no">COSINE</code> و <code translate="no">L2</code> و <code translate="no">IP</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p></li>
<li><p><code translate="no">params</code>: : خيارات التكوين الإضافية لبناء الفهرس.</p>
<ul>
<li><code translate="no">M</code>: الحد الأقصى لعدد الجيران الذين يمكن لكل عقدة الاتصال بهم.</li>
<li><code translate="no">efConstruction</code>: : عدد الجيران المرشحين للاتصال أثناء بناء الفهرس.</li>
</ul>
<p>لمعرفة المزيد من معلمات البناء المتوفرة للفهرس <code translate="no">HNSW</code> ، راجع <a href="#Index-building-params">بارامز بناء الفهرس</a>.</p></li>
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
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">params</code>: خيارات التكوين الإضافية للبحث على الفهرس.</p>
<ul>
<li><code translate="no">ef</code>: عدد الكيانات المجاورة التي يجب أخذها في الاعتبار أثناء البحث.</li>
</ul>
<p>لمعرفة المزيد من معلمات البحث المتوفرة للفهرس <code translate="no">HNSW</code> ، راجع <a href="#index-specific-search-params">باراميات البحث الخاصة بالفهرس</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">بارامترات الفهرس<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>يقدم هذا القسم نظرة عامة على المعلمات المستخدمة لبناء الفهرس وإجراء عمليات البحث على الفهرس.</p>
<h3 id="Index-building-params" class="common-anchor-header">معلمات بناء الفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">params</code> عند <a href="#Build-index">إنشاء فهرس</a>.</p>
<table>
<thead>
<tr><th><strong>المعلمة</strong></th><th><strong>الوصف</strong></th><th><strong>نطاق القيمة</strong></th><th><strong>اقتراح الضبط</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>الحد الأقصى لعدد الاتصالات （أو الحواف) التي يمكن أن تحتويها كل عقدة في الرسم البياني، بما في ذلك الحواف الصادرة والواردة.<br>تؤثر هذه المعلمة بشكل مباشر على كل من بناء الفهرس والبحث.</td><td><strong>النوع</strong>: عدد صحيح<br><strong>المدى</strong>: [2, 2048]<br><strong>القيمة الافتراضية</strong>: <code translate="no">30</code> (حتى 30 حافة صادرة و30 حافة واردة لكل عقدة)</td><td>يؤدي وجود <code translate="no">M</code> أكبر بشكل عام إلى <strong>دقة أعلى</strong> ولكنه <strong>يزيد من عبء الذاكرة</strong> ويبطئ <strong>بناء الفهرس والبحث</strong>.<br>ضع في اعتبارك زيادة <code translate="no">M</code> لمجموعات البيانات ذات الأبعاد العالية أو عندما يكون الاستدعاء العالي أمرًا بالغ الأهمية.<br>ضع في اعتبارك تقليل <code translate="no">M</code> عندما يكون استخدام الذاكرة وسرعة البحث من الاهتمامات الأساسية.<br>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [5, 100].</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>عدد الجيران المرشحين الذين تم أخذهم في الاعتبار أثناء إنشاء الفهرس.<br>يتم تقييم مجموعة أكبر من المرشحين لكل عنصر جديد، ولكن لا يزال الحد الأقصى لعدد الاتصالات التي تم إنشاؤها بالفعل محدودًا بـ <code translate="no">M</code>.</td><td><strong>النوع</strong>: عدد صحيح<br><strong>المدى</strong>: [1، <em>int_max</em>]<br><strong>القيمة الافتراضية</strong>: <code translate="no">360</code></td><td>يؤدي ارتفاع <code translate="no">efConstruction</code> عادةً إلى <strong>فهرس أكثر دقة،</strong> حيث يتم استكشاف المزيد من الاتصالات المحتملة. ومع ذلك، يؤدي هذا أيضًا إلى <strong>وقت فهرسة أطول وزيادة استخدام الذاكرة</strong> أثناء الإنشاء.<br>ضع في اعتبارك زيادة <code translate="no">efConstruction</code> لتحسين الدقة، خاصة في السيناريوهات التي يكون فيها وقت الفهرسة أقل أهمية.<br>فكر في تقليل <code translate="no">efConstruction</code> لتسريع بناء الفهرس عندما تكون قيود الموارد مصدر قلق.<br>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [50, 500].</td></tr>
</tbody>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">بارامترات البحث الخاصة بالفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="#Search-on-index">البحث في الفهرس</a>.</p>
<table>
<thead>
<tr><th><strong>المعلمة</strong></th><th><strong>الوصف</strong></th><th><strong>نطاق القيمة</strong></th><th><strong>ضبط الاقتراح</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td><strong>يتحكم في اتساع نطاق البحث أثناء استرجاع أقرب جار.</strong> تحدد عدد العقد التي تتم زيارتها وتقييمها كأقرب جيران محتملين. تؤثر هذه المعلمة على عملية البحث فقط وتطبق حصرياً على الطبقة السفلية من الرسم البياني.</td><td><strong>النوع</strong>: عدد صحيح<br><strong>المدى</strong>: [1، <em>int_max</em>]<br><strong>القيمة الافتراضية</strong>: <em>الحد</em> (أقرب عدد من الجيران الأقرب للإرجاع)</td><td>يؤدي وجود <code translate="no">ef</code> أكبر بشكل عام إلى <strong>دقة بحث أعلى</strong> حيث يتم النظر في المزيد من الجيران المحتملين. ومع ذلك، يؤدي ذلك أيضًا <strong>إلى زيادة وقت البحث</strong>.<br>ضع في اعتبارك زيادة <code translate="no">ef</code> عندما يكون تحقيق الاستدعاء العالي أمرًا بالغ الأهمية وتكون سرعة البحث أقل أهمية.<br>ضع في اعتبارك تقليل <code translate="no">ef</code> لإعطاء الأولوية لعمليات البحث الأسرع، خاصةً في السيناريوهات التي يكون فيها الانخفاض الطفيف في الدقة مقبولاً.<br>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [K, 10K].</td></tr>
</tbody>
</table>
