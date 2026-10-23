---
id: hnsw.md
title: HNSW
summary: >-
  مؤشر HNSW هو خوارزمية فهرسة قائمة على الرسوم البيانية يمكنها تحسين الأداء عند
  البحث عن متجهات عائمة عالية الأبعاد. ويوفر دقة بحث ممتازة وزمن استجابة منخفض،
  في حين أنه يتطلب استهلاكًا كبيرًا للذاكرة للحفاظ على هيكل الرسم البياني الهرمي
  الخاص به.
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
    </button></h1><p>مؤشر <strong>HNSW</strong> هو خوارزمية فهرسة <strong>قائمة على الرسوم البيانية</strong> يمكنها تحسين الأداء عند البحث عن متجهات عائمة عالية الأبعاد. ويوفر دقة بحث <strong>ممتازة</strong> وزمن استجابة <strong>منخفض</strong> ، في حين يتطلب استهلاكًا <strong>كبيرًا</strong> للذاكرة للحفاظ على هيكل الرسم البياني الهرمي الخاص به.</p>
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
    </button></h2><p>تقوم خوارزمية Hierarchical Navigable Small World (HNSW) ببناء رسم بياني متعدد الطبقات، يشبه إلى حد ما خريطة ذات مستويات تكبير مختلفة. تحتوي <strong>الطبقة السفلية</strong> على جميع نقاط البيانات، بينما تتكون <strong>الطبقات العليا</strong> من مجموعة فرعية من نقاط البيانات التي تم أخذ عينات منها من الطبقة السفلية.</p>
<p>في هذا التسلسل الهرمي، تحتوي كل طبقة على عقد تمثل نقاط البيانات، متصلة بحواف تشير إلى مدى قربها من بعضها. توفر الطبقات العليا قفزات لمسافات طويلة للوصول بسرعة إلى الهدف، بينما تتيح الطبقات السفلية إجراء بحث دقيق للحصول على النتائج الأكثر دقة.</p>
<p>وإليك كيفية عملها:</p>
<ol>
<li><p><strong>نقطة الدخول</strong>: يبدأ البحث من نقطة دخول ثابتة في الطبقة العليا، وهي عقدة محددة مسبقًا في الرسم البياني.</p></li>
<li><p><strong>البحث الجشع</strong>: تتحرك الخوارزمية بشكل جشع نحو أقرب جار في الطبقة الحالية حتى يتعذر عليها الاقتراب أكثر من متجه الاستعلام. تخدم الطبقات العليا غرضًا تنقلًا، حيث تعمل كمرشح تقريبي لتحديد نقاط الدخول المحتملة للبحث الأكثر دقة في المستويات الأدنى.</p></li>
<li><p><strong>النزول بين الطبقات</strong>: بمجرد الوصول إلى <strong>الحد الأدنى المحلي</strong> في الطبقة الحالية، تقفز الخوارزمية إلى الطبقة السفلية، باستخدام اتصال محدد مسبقًا، وتكرر البحث الجشع.</p></li>
<li><p><strong>التحسين</strong><strong>النهائي</strong>: تستمر هذه العملية حتى الوصول إلى الطبقة السفلية، حيث تحدد خطوة التحسين النهائية أقرب الجيران.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" /> 
   <span>HNSW</span>
  
 </span></p>
<p>يعتمد أداء HNSW على عدة معلمات رئيسية تتحكم في كل من بنية الرسم البياني وسلوك البحث. وتشمل هذه المعلمات:</p>
<ul>
<li><p><code translate="no">M</code> <code translate="no">M</code>: الحد الأقصى لعدد الحواف أو الوصلات التي يمكن أن تمتلكها كل عقدة في الرسم البياني في كل مستوى من مستويات التسلسل الهرمي. يؤدي ارتفاع قيمة إلى رسم بياني أكثر كثافة ويزيد من معدل الاسترجاع والدقة، حيث يتوفر للبحث مسارات أكثر لاستكشافها، وهو ما يستهلك أيضًا ذاكرة أكبر ويبطئ وقت الإدراج بسبب الوصلات الإضافية. كما هو موضح في الصورة أعلاه، يشير <strong>M = 5</strong> إلى أن كل عقدة في مخطط HNSW متصلة مباشرة بحد أقصى 5 عقد أخرى. وهذا يخلق بنية مخطط متوسطة الكثافة حيث تمتلك العقد مسارات متعددة للوصول إلى العقد الأخرى.</p></li>
<li><p><code translate="no">efConstruction</code>: عدد المرشحين الذين يتم أخذهم في الاعتبار أثناء إنشاء الفهرس. عادةً ما يؤدي ارتفاع قيمة « <code translate="no">efConstruction</code> » إلى رسم بياني ذي جودة أفضل، ولكنه يتطلب مزيدًا من الوقت لإنشائه.</p></li>
<li><p><code translate="no">ef</code>: عدد الجيران الذين يتم تقييمهم أثناء عملية البحث. تؤدي زيادة قيمة <code translate="no">ef</code> إلى تحسين احتمالية العثور على أقرب الجيران، ولكنها تبطئ عملية البحث.</p></li>
</ul>
<p>للحصول على تفاصيل حول كيفية ضبط هذه الإعدادات لتناسب احتياجاتك، راجع <a href="/docs/ar/hnsw.md#Index-params">معلمات الفهرس</a>.</p>
<h2 id="Build-index" class="common-anchor-header">إنشاء الفهرس<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>يستخدم هذا المثال عميلاً متصلاً باسم <code translate="no">client</code> ومجموعة موجودة باسم <code translate="no">your_collection_name</code>. تحتوي المجموعة على حقل متجه خماسي الأبعاد باسم <code translate="no">your_vector_field_name</code>.</p>
<p>حدد معلمات الفهرس باستخدام <code translate="no">add_index()</code> ، ثم قم بإنشاء الفهرس باستخدام <code translate="no">create_index()</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()

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

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين:</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. في هذا المثال، قم بتعيين القيمة إلى <code translate="no">HNSW</code>.</p></li>
<li><p><code translate="no">metric_type</code>: الطريقة المستخدمة لحساب المسافة بين المتجهات. تشمل القيم المدعومة <code translate="no">COSINE</code> و <code translate="no">L2</code> و <code translate="no">IP</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p></li>
<li><p><code translate="no">params</code>: خيارات تكوين إضافية لإنشاء الفهرس.</p>
<ul>
<li><p><code translate="no">M</code>: الحد الأقصى لعدد الجيران الذين يمكن لكل عقدة الاتصال بهم.</p></li>
<li><p><code translate="no">efConstruction</code>: عدد الجيران المرشحين الذين يتم النظر في الاتصال بهم أثناء إنشاء الفهرس.</p></li>
</ul>
<p>يُعيّن المثال <code translate="no">M=64</code> و <code translate="no">efConstruction=100</code> كإعدادات تجاوز. للاطلاع على القيم الافتراضية والنطاقات المقبولة، راجع <a href="/docs/ar/hnsw.md#Index-building-params">معلمات إنشاء الفهرس</a>.</p></li>
</ul>
<p>لإنشاء مجموعة وفهرسها معًا، قم بتمرير معلمات الفهرس إلى <code translate="no">create_collection()</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/create-collection.md">إنشاء مجموعة</a>.</p>
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
    </button></h2><p>بعد إنشاء الفهرس وإدراج الكيانات، قم بتحميل المجموعة والبحث في حقلها المتجه. بالنسبة لعمليات البحث kNN العادية، قم بتعيين <code translate="no">ef</code> على <code translate="no">limit</code> على الأقل.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

client.load_collection(collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>)

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين:</p>
<ul>
<li><p><code translate="no">params</code>: خيارات تكوين إضافية للبحث في الفهرس.</p>
<ul>
<li><code translate="no">ef</code>: عدد الجيران الذين يجب أخذهم في الاعتبار أثناء البحث.</li>
</ul>
<p>لمعرفة المزيد عن معلمات البحث المتاحة لمؤشر <code translate="no">HNSW</code> ، راجع <a href="/docs/ar/hnsw.md#Index-specific-search-params">معلمات البحث الخاصة بالمؤشر</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">معلمات الفهرس<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>تسرد الجداول أدناه معلمات إنشاء الفهرس والبحث. يمكن لإعدادات الخادم تجاوز القيم الافتراضية للمعلمات التي تحذفها.</p>
<h3 id="Index-building-params" class="common-anchor-header">معلمات إنشاء الفهرس<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">params</code> عند <a href="/docs/ar/hnsw.md#Build-index">إنشاء فهرس</a>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>الحد الأقصى لعدد الاتصالات (أو الحواف) التي يمكن أن تحتوي عليها كل عقدة في الرسم البياني، بما في ذلك الحواف الصادرة والواردة. تؤثر هذه المعلمة بشكل مباشر على كل من إنشاء الفهرس وعملية البحث.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>النطاق</strong>: [2، 2048]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">30</code> (ما يصل إلى 30 حافة صادرة و30 حافة واردة لكل عقدة)</p></td>
     <td><p>عادةً ما يؤدي زيادة القيمة " <code translate="no">M</code> " إلى <strong>دقة أعلى</strong> ، ولكنه <strong>يزيد من استهلاك الذاكرة</strong> <strong>ويبطئ كل من عملية إنشاء الفهرس وعملية البحث</strong>. ضع في اعتبارك زيادة القيمة " <code translate="no">M</code> " لمجموعات البيانات ذات الأبعاد العالية أو عندما يكون معدل الاسترجاع العالي أمرًا بالغ الأهمية.</p><p>فكر في تقليل قيمة <code translate="no">M</code> عندما يكون استهلاك الذاكرة وسرعة البحث من الأولويات الرئيسية.</p><p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [5، 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>عدد الجيران المرشحين الذين يتم أخذهم في الاعتبار للاتصال أثناء إنشاء الفهرس. يتم تقييم مجموعة أكبر من المرشحين لكل عنصر جديد، لكن العدد الأقصى للاتصالات التي يتم إنشاؤها فعليًا لا يزال محدودًا بقيمة <code translate="no">M</code>.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>النطاق</strong>: [1، <em>int_max</em>]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">360</code></p></td>
     <td><p>عادةً ما يؤدي ارتفاع قيمة <code translate="no">efConstruction</code> إلى <strong>فهرس أكثر دقة</strong>، حيث يتم استكشاف المزيد من الوصلات المحتملة. ومع ذلك، يؤدي هذا أيضًا إلى <strong>إطالة وقت الفهرسة وزيادة استخدام الذاكرة</strong> أثناء الإنشاء. ضع في اعتبارك زيادة قيمة <code translate="no">efConstruction</code> لتحسين الدقة، خاصةً في السيناريوهات التي لا يكون فيها وقت الفهرسة عاملاً حاسماً.</p><p>فكر في تقليل قيمة <code translate="no">efConstruction</code> لتسريع عملية إنشاء الفهرس عندما تكون قيود الموارد مصدر قلق.</p><p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [50، 500].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">معلمات البحث الخاصة بالفهرس<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="/docs/ar/hnsw.md#Search-on-index">البحث في الفهرس</a>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>يتحكم في نطاق البحث أثناء استرجاع أقرب الجيران. ويحدد عدد العقد التي يتم زيارتها وتقييمها كأقرب الجيران المحتملين.  يؤثر هذا المعامل على عملية البحث فقط وينطبق حصريًا على الطبقة السفلية من الرسم البياني.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>النطاق</strong>: [1, <em>int_max</em>]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">max(limit, 16)</code> للبحث العادي باستخدام kNN؛ <code translate="no">512</code> للبحث النطاقي.</p><p>بالنسبة للبحث العادي باستخدام kNN، يجب أن تكون القيمة الصريحة لـ <code translate="no">ef</code> أكبر من أو تساوي <code translate="no">limit</code> (عدد الجيران الأقرب المطلوب إرجاعهم).</p></td>
     <td><p>عادةً ما يؤدي ارتفاع قيمة <code translate="no">ef</code> إلى <strong>زيادة دقة البحث</strong> ، حيث يتم أخذ المزيد من الجيران المحتملين في الاعتبار. ومع ذلك، <strong>يؤدي</strong> هذا أيضًا <strong>إلى زيادة وقت البحث</strong>. فكر في زيادة <code translate="no">ef</code> عندما يكون تحقيق نسبة استرجاع عالية أمرًا بالغ الأهمية، ولا تمثل سرعة البحث مصدر قلق كبير.</p><p>فكر في تقليل قيمة <code translate="no">ef</code> لإعطاء الأولوية لعمليات البحث الأسرع، خاصة في الحالات التي يكون فيها انخفاض طفيف في الدقة مقبولًا.</p><p>في معظم الحالات، نوصيك بتعيين قيمة ضمن هذا النطاق: [K، 10K].</p></td>
   </tr>
</table>
