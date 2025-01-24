---
id: ivf-flat.md
order: 1
summary: ستقدم هذه المقالة مؤشر IVF_FLAT في Milvus.
title: IVF_FLAT
---
<h1 id="IVFFLAT" class="common-anchor-header">IVF_FLAT<button data-href="#IVFFLAT" class="anchor-icon" translate="no">
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
    </button></h1><p>إن فهرس <strong>IVF_FLAT</strong> هو خوارزمية فهرسة يمكنها تحسين أداء البحث لمتجهات الفاصلة العائمة.</p>
<p>يعد هذا النوع من الفهرس مثاليًا لمجموعات البيانات واسعة النطاق التي تتطلب استجابات سريعة للاستعلام ودقة عالية، خاصةً عندما يمكن أن يؤدي تجميع مجموعة البيانات الخاصة بك إلى تقليل مساحة البحث وتوفر ذاكرة كافية لتخزين بيانات المجموعة.</p>
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
    </button></h2><p>يرمز المصطلح <strong>IVF_FLAT</strong> إلى <strong>الملف المقلوب المسطح (Inverted File Flat</strong>)، والذي يغلف النهج ثنائي الطبقات للفهرسة والبحث عن متجهات الفاصلة العائمة:</p>
<ul>
<li><strong>الملف المقلوب (IVF):</strong> يشير إلى تجميع مساحة المتجه إلى مناطق يمكن التحكم فيها باستخدام <a href="https://en.wikipedia.org/wiki/K-means_clustering">تجميع k-means</a>. يتم تمثيل كل مجموعة بنقطة <strong>مركزية</strong> تعمل كنقطة مرجعية للمتجهات داخلها.</li>
<li><strong>مسطح:</strong> يشير إلى أنه داخل كل مجموعة، يتم تخزين المتجهات في شكلها الأصلي (بنية مسطحة)، دون أي ضغط أو تكميم، لإجراء حسابات دقيقة للمسافات.</li>
</ul>
<p>يوضّح الشكل التالي كيفية عملها:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-1.png" alt="ivf-flat-1.png" class="doc-image" id="ivf-flat-1.png" />
    ivf-flat-1 </span> <span class="img-wrapper"> <span>.png</span> </span></p>
<p>تعمل طريقة الفهرسة هذه على تسريع عملية البحث، ولكنها تأتي مع عيب محتمل: قد لا يكون المرشح الذي تم العثور عليه كأقرب تضمين للاستعلام هو الأقرب بالضبط. يمكن أن يحدث هذا إذا كان أقرب تضمين إلى تضمين الاستعلام موجودًا في مجموعة مختلفة عن المجموعة المختارة بناءً على أقرب نقطة مركزية (انظر التصور أدناه).</p>
<p>ولمعالجة هذه المشكلة، يوفر <strong>IVF_FLAT</strong> معيارين فائقين يمكننا ضبطهما:</p>
<ul>
<li><code translate="no">nlist</code>: تحديد عدد الأقسام المراد إنشاؤها باستخدام خوارزمية k-means.</li>
<li><code translate="no">nprobe</code>: يحدد عدد الأقسام التي يجب أخذها في الاعتبار أثناء البحث عن المرشحين.</li>
</ul>
<p>الآن إذا قمنا بتعيين <code translate="no">nprobe</code> إلى 3 بدلاً من 1، نحصل على النتيجة التالية:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-2.png" alt="ivf-flat-2.png" class="doc-image" id="ivf-flat-2.png" />
    ivf-flat-2 </span> <span class="img-wrapper"> <span>.png</span> </span></p>
<p>من خلال زيادة القيمة <code translate="no">nprobe</code> ، يمكنك تضمين المزيد من الأقسام في البحث، مما قد يساعد في ضمان عدم تفويت أقرب تضمين للاستعلام، حتى لو كان موجودًا في قسم مختلف. ومع ذلك، فإن هذا يأتي على حساب زيادة وقت البحث، حيث يجب تقييم المزيد من المرشحين. لمزيد من المعلومات حول ضبط معلمات الفهرس، راجع <a href="#index-params">بارامز الفهرس</a>.</p>
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
    </button></h2><p>لإنشاء فهرس <code translate="no">IVF_FLAT</code> على حقل متجه في ميلفوس، استخدم الطريقة <code translate="no">add_index()</code> ، مع تحديد <code translate="no">index_type</code> و <code translate="no">metric_type</code> ومعلمات إضافية للفهرس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters for the index</span>
    } <span class="hljs-comment"># Index building params</span>
)

<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. في هذا المثال، اضبط القيمة على <code translate="no">IVF_FLAT</code>.</p></li>
<li><p><code translate="no">metric_type</code>: الطريقة المستخدمة لحساب المسافة بين المتجهات. تتضمن القيم المدعومة <code translate="no">COSINE</code> و <code translate="no">L2</code> و <code translate="no">IP</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p></li>
<li><p><code translate="no">params</code>: : خيارات التكوين الإضافية لبناء الفهرس.</p>
<ul>
<li><code translate="no">nlist</code>: عدد المجموعات لتقسيم مجموعة البيانات.</li>
</ul>
<p>لمعرفة المزيد من معلمات البناء المتوفرة للفهرس <code translate="no">IVF_FLAT</code> ، راجع <a href="#Index-building-params">بارامز بناء الفهرس</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: 10, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],  <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">limit</span>=3,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)

<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">params</code>: خيارات التكوين الإضافية للبحث على الفهرس.</p>
<ul>
<li><code translate="no">nprobe</code>: عدد المجموعات المطلوب البحث عنها.</li>
</ul>
<p>لمعرفة المزيد من معلمات البحث المتوفرة للفهرس <code translate="no">IVF_FLAT</code> ، راجع <a href="#index-specific-search-params">باراميات البحث الخاصة بالفهرس</a>.</p></li>
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
<tr><td><code translate="no">nlist</code></td><td>عدد العناقيد المراد إنشاؤها باستخدام خوارزمية k-means أثناء بناء الفهرس، حيث تخزن كل عنقود، ممثلة بنقطة مركزية، قائمة من المتجهات. تؤدي زيادة هذه المعلمة إلى تقليل عدد المتجهات في كل مجموعة، مما يؤدي إلى إنشاء أقسام أصغر وأكثر تركيزًا.</td><td><strong>النوع</strong>: عدد صحيح<br><strong>المدى</strong>: [1, 65536]<br><strong>القيمة الافتراضية</strong>: <code translate="no">128</code></td><td>تعمل القيم الأكبر <code translate="no">nlist</code> على تحسين الاستدعاء من خلال إنشاء مجموعات أكثر دقة ولكنها تزيد من وقت بناء الفهرس. قم بالتحسين بناءً على حجم مجموعة البيانات والموارد المتاحة، وفي معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [32, 4096].</td></tr>
</tbody>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">بارامترات البحث الخاصة بالفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="#Search-on-index">البحث في الفهرس</a>.</p>
<table>
<thead>
<tr><th><strong>المعلمة</strong></th><th><strong>الوصف</strong></th><th><strong>نطاق القيمة</strong></th><th><strong>اقتراح الضبط</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>عدد المجموعات للبحث عن المرشحين، تسمح القيم الأعلى بالبحث عن المزيد من المجموعات، مما يحسن الاستدعاء من خلال توسيع نطاق البحث ولكن على حساب زيادة زمن انتقال الاستعلام.</td><td><strong>النوع</strong>: عدد صحيح<br><strong>المدى</strong>: [1, <em>nlist</em>]<br><strong>القيمة الافتراضية</strong>: <code translate="no">8</code></td><td>تؤدي زيادة هذه القيمة إلى تحسين الاستدعاء ولكنها قد تؤدي إلى إبطاء البحث.قم بتعيين <code translate="no">nprobe</code> بشكل متناسب مع <code translate="no">nlist</code> لتحقيق التوازن بين السرعة والدقة.<br>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [1, nlist].</td></tr>
</tbody>
</table>
