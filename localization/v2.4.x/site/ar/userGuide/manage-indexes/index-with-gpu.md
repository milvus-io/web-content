---
id: index-with-gpu.md
order: 3
summary: يشرح هذا الدليل كيفية إنشاء فهرس مع دعم GPU في Milvus لتحسين أداء البحث.
title: الفهرس باستخدام وحدة معالجة الرسومات
---
<h1 id="Index-with-GPU" class="common-anchor-header">الفهرس باستخدام وحدة معالجة الرسومات<button data-href="#Index-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>يوضح هذا الدليل الخطوات اللازمة لإنشاء فهرس مع دعم GPU في Milvus، والذي يمكن أن يحسن أداء البحث بشكل كبير في سيناريوهات الإنتاجية العالية والاستدعاء العالي. للحصول على تفاصيل حول أنواع فهارس GPU التي تدعمها Milvus، راجع <a href="/docs/ar/v2.4.x/gpu_index.md">فهرس GPU</a>.</p>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">تكوين إعدادات Milvus للتحكم في ذاكرة GPU<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>يستخدم Milvus مخزن ذاكرة رسومات عام لتخصيص ذاكرة وحدة معالجة الرسومات.</p>
<p>وهو يدعم معلمتين <code translate="no">initMemSize</code> و <code translate="no">maxMemSize</code> في <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">ملف تكوين Milvus</a>. يتم تعيين حجم التجمع في البداية على <code translate="no">initMemSize</code> ، وسيتم توسيعه تلقائيًا إلى <code translate="no">maxMemSize</code> بعد تجاوز هذا الحد.</p>
<p>ويكون الافتراضي <code translate="no">initMemSize</code> هو 1/2 من ذاكرة وحدة معالجة الرسومات المتوفرة عند بدء تشغيل Milvus، ويكون الافتراضي <code translate="no">maxMemSize</code> يساوي كل ذاكرة وحدة معالجة الرسومات المتوفرة.</p>
<p>حتى الإصدار Milvus 2.4.1 (بما في ذلك الإصدار 2.4.1)، استخدم Milvus تجمع ذاكرة GPU موحد. بالنسبة للإصدارات السابقة للإصدار 2.4.1( بما في ذلك الإصدار 2.4.1)، كان يوصى بتعيين كلتا القيمتين إلى 0.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>بدءًا من الإصدار Milvus 2.4.1 وما بعده، يتم استخدام مخزن ذاكرة وحدة معالجة الرسومات فقط لبيانات وحدة معالجة الرسومات المؤقتة أثناء عمليات البحث. لذلك، يوصى بتعيينها إلى 2048 و4096.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-an-index" class="common-anchor-header">إنشاء فهرس<button data-href="#Build-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>توضح الأمثلة التالية كيفية إنشاء فهارس GPU بأنواعها المختلفة.</p>
<h3 id="Prepare-index-parameters" class="common-anchor-header">إعداد معلمات الفهرس</h3><p>عند إعداد معلمات فهرس GPU، قم بتعريف <strong>نوع_الفهرس</strong> <strong>ونوع_المقياس</strong> <strong>والبارامز</strong>:</p>
<ul>
<li><p><strong>نوع_الفهرس</strong><em>(سلسلة</em>): نوع الفهرس المستخدم لتسريع البحث المتجه. تتضمن الخيارات الصالحة <strong>GPU_CAGRA</strong> و <strong>GPU_IVF_FLAT</strong> و <strong>GPU_IVF_FLAT</strong> و <strong>GPU_IVF_PQ</strong> و <strong>GPU_BRUTE_FORCE</strong>.</p></li>
<li><p><strong>نوع_المقياس</strong><em>(سلسلة</em>): نوع المقاييس المستخدمة لقياس تشابه المتجهات. الخيارات الصالحة هي <strong>IP</strong> و <strong>L2</strong>.</p></li>
<li><p><strong>بارامز</strong><em>(إملاء</em>): معلمات البناء الخاصة بالفهرس. تعتمد الخيارات الصالحة لهذه المعلمة على نوع الفهرس.</p></li>
</ul>
<p>فيما يلي أمثلة على التكوينات لأنواع الفهرس المختلفة:</p>
<ul>
<li><p>فهرس<strong>GPU_CAGRA</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_CAGRA&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&#x27;intermediate_graph_degree&#x27;</span>: <span class="hljs-number">64</span>,
        <span class="hljs-string">&#x27;graph_degree&#x27;</span>: <span class="hljs-number">32</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>تتضمن الخيارات الممكنة <strong>للمعلمات</strong> ما يلي:</p>
<ul>
<li><p><strong>intermediate_graph_degree</strong><em>(int</em>): يؤثر على الاستدعاء ووقت الإنشاء من خلال تحديد درجة الرسم البياني قبل التقليم. القيم الموصى بها هي <strong>32</strong> أو <strong>64</strong>.</p></li>
<li><p><strong>درجة_الرسم البياني</strong><em>(int</em>): تؤثر على أداء البحث والاستدعاء من خلال تحديد درجة الرسم البياني بعد التقليم. عادةً ما تكون نصف <strong>درجة_درجة_الرسم البياني المتوسطة</strong>. ينتج عن الفرق الأكبر بين هاتين الدرجتين وقت بناء أطول. يجب أن تكون قيمته أصغر من قيمة <strong>intermediate_graph_degree</strong>.</p></li>
<li><p><strong>build_algo</strong><em>(سلسلة</em>): يحدد خوارزمية إنشاء الرسم البياني قبل التقليم. الخيارات الممكنة:</p>
<ul>
<li><p><strong>IVF_PQ</strong>: تقدم جودة أعلى ولكن وقت بناء أبطأ.</p></li>
<li><p><strong>NN_DESCENT</strong>: يوفر بناء أسرع مع احتمال استرجاع أقل.</p></li>
</ul></li>
<li><p><strong>cache_dataset_dataset_on_device</strong><em>(سلسلة،</em> <strong>"صواب"</strong> | <strong>"خطأ")</strong>: يقرر ما إذا كان سيتم تخزين مجموعة البيانات الأصلية مؤقتًا في ذاكرة وحدة معالجة الرسومات. يعمل ضبط هذا على <strong>"صواب"</strong> على تحسين الاستدعاء من خلال تحسين نتائج البحث، بينما يعمل ضبطه على <strong>"خطأ"</strong> على الحفاظ على ذاكرة وحدة معالجة الرسومات.</p></li>
</ul></li>
<li><p>فهرس<strong>GPU_IVF_FLAT</strong> أو <strong>GPU_IVF_PQ</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_IVF_FLAT&quot;</span>, <span class="hljs-comment"># Or GPU_IVF_PQ</span>
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>تتطابق خيارات <strong>البارامز</strong> مع تلك المستخدمة في <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a></strong> <strong><a href="https://milvus.io/docs/index.md#IVF_PQ">وIVF_PQ</a></strong>.</p></li>
<li><p>فهرس<strong>GPU_BRUTE_FORCE</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>: <span class="hljs-string">&#x27;GPU_BRUTE_FORCE&#x27;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>لا توجد تكوينات <strong>بارامز</strong> إضافية مطلوبة.</p></li>
</ul>
<h3 id="Build-index" class="common-anchor-header">بناء الفهرس</h3><p>بعد تكوين معلمات الفهرس في <strong>index_params،</strong> قم باستدعاء طريقة <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/create_index.md"><code translate="no">create_index()</code></a> لإنشاء الفهرس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get an existing collection</span>
collection = Collection(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)

collection.create_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field on which an index is built</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search" class="common-anchor-header">بحث<button data-href="#Search" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد إنشاء فهرس GPU، فإن الخطوة التالية هي إعداد معلمات البحث قبل إجراء البحث.</p>
<h3 id="Prepare-search-parameters" class="common-anchor-header">إعداد معلمات البحث</h3><p>فيما يلي أمثلة على تكوينات لأنواع الفهرس المختلفة:</p>
<ul>
<li><p>فهرس<strong>GPU_BRUTE_FORCE</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>لا توجد تكوينات <strong>بارامترات</strong> إضافية مطلوبة.</p></li>
<li><p>فهرس<strong>GPU_CAGRA</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;min_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;max_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;team_size&quot;</span>: <span class="hljs-number">0</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>تتضمن معلمات البحث الرئيسية:</p>
<ul>
<li><p><strong>itopk_size</strong>: يحدد حجم النتائج الوسيطة المحفوظة أثناء البحث. قد تؤدي القيمة الأكبر إلى تحسين الاستدعاء على حساب أداء البحث. يجب أن تكون مساوية على الأقل للقيمة النهائية لأعلى k<strong>(الحد</strong> الأعلى) وعادةً ما تكون قوة 2 (على سبيل المثال، 16، 32، 64، 128).</p></li>
<li><p><strong>عرض_البحث</strong>: يحدد عدد نقاط الدخول إلى الرسم البياني CAGRA أثناء البحث. قد تؤدي زيادة هذه القيمة إلى تحسين الاستدعاء ولكنها قد تؤثر على أداء البحث.</p></li>
<li><p><strong>min_iterations</strong> / <strong>max_iterations</strong>: تتحكم هذه المعلمات في عملية تكرار البحث. بشكل افتراضي، يتم تعيينهما على <strong>0،</strong> وتحدد CAGRA تلقائيًا عدد التكرارات بناءً على <strong>itopk_size</strong> <strong>وعرض_البحث</strong>. يمكن أن يساعد ضبط هذه القيم يدويًا في تحقيق التوازن بين الأداء والدقة.</p></li>
<li><p><strong>team_size</strong>: يحدد عدد خيوط CUDA المستخدمة لحساب المسافة المترية على وحدة معالجة الرسومات. القيم الشائعة هي قوة 2 حتى 32 (على سبيل المثال 2، 4، 8، 16، 32). لها تأثير طفيف على أداء البحث. القيمة الافتراضية هي <strong>0،</strong> حيث يقوم Milvus تلقائيًا بتحديد <strong>حجم_الفريق</strong> تلقائيًا استنادًا إلى بُعد المتجه.</p></li>
</ul></li>
<li><p>فهرس<strong>GPU_IVF_FLAT</strong> أو <strong>GPU_IVF_PQ</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}
<button class="copy-code-btn"></button></code></pre>
<p>تتشابه معلمات البحث لهذين النوعين من الفهرسين مع تلك المستخدمة في <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a> و <a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong>. لمزيد من المعلومات، راجع <a href="https://milvus.io/docs/search.md#Prepare-search-parameters">إجراء بحث تشابه المتجهات</a>.</p></li>
</ul>
<h3 id="Conduct-a-search" class="common-anchor-header">إجراء بحث</h3><p>استخدم طريقة <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search.md"><code translate="no">search()</code></a> لإجراء بحث تشابه متجه على فهرس GPU.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load data into memory</span>
collection.load()

collection.search(
    data=[[query_vector]], <span class="hljs-comment"># Your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field</span>
    param=search_params,
    limit=<span class="hljs-number">100</span> <span class="hljs-comment"># Number of the results to return</span>
)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>عند استخدام فهارس GPU، كن على دراية ببعض القيود:</p>
<ul>
<li><p>بالنسبة إلى <strong>GPU_IVF_FLAT،</strong> الحد الأقصى لقيمة <strong>الحد</strong> هو 1024.</p></li>
<li><p>بالنسبة لفهرسي <strong>GPU_IVF_PQ</strong> و <strong>GPU_CAGRA،</strong> القيمة القصوى <strong>للحد</strong> هي 1024.</p></li>
<li><p>في حين أنه لا يوجد حد أقصى معين <strong>للحد</strong> على <strong>GPU_BRUTE_FORCE،</strong> يوصى بعدم تجاوز 4096 لتجنب مشاكل الأداء المحتملة.</p></li>
<li><p>لا تدعم فهارس وحدة معالجة الرسومات حاليًا مسافة COSINE. إذا كانت مسافة COSINE مطلوبة، يجب تطبيع البيانات أولاً، ثم يمكن استخدام مسافة المنتج الداخلي (IP) كبديل.</p></li>
<li><p>تحميل حماية OOM لفهارس وحدة معالجة الرسومات غير مدعوم بالكامل، قد يؤدي تحميل الكثير من البيانات إلى تعطل QueryNode.</p></li>
<li><p>لا تدعم فهارس وحدة معالجة الرسومات وظائف البحث مثل <a href="https://milvus.io/docs/single-vector-search.md#Range-search">البحث في النطاق</a> <a href="https://milvus.io/docs/single-vector-search.md#Grouping-searchh">والبحث بالتجميع</a>.</p></li>
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
    </button></h2><ul>
<li><p><strong>متى يكون من المناسب استخدام فهرس GPU؟</strong></p>
<p>يكون فهرس GPU مفيدًا بشكل خاص في المواقف التي تتطلب إنتاجية عالية أو استرجاعًا عاليًا. على سبيل المثال، عند التعامل مع الدفعات الكبيرة، يمكن أن تتجاوز إنتاجية فهرسة وحدة معالجة الرسومات إنتاجية فهرسة وحدة المعالجة المركزية بما يصل إلى 100 مرة. في السيناريوهات ذات الدُفعات الأصغر، لا تزال فهارس وحدة معالجة الرسومات تتفوق بشكل كبير على فهارس وحدة المعالجة المركزية من حيث الأداء. علاوةً على ذلك، إذا كانت هناك متطلبات لإدخال البيانات بسرعة، فإن دمج وحدة معالجة الرسومات يمكن أن يسرّع عملية إنشاء الفهارس بشكل كبير.</p></li>
<li><p><strong>ما هي السيناريوهات التي تكون فيها فهارس وحدة معالجة الرسومات مثل CAGRA وGPU_IVF_PQ وGPU_IVF_FFLAT وGPU_BRUTE_FORCE الأنسب؟</strong></p>
<p>تُعد فهارس CAGRA مثالية للسيناريوهات التي تتطلب أداءً محسنًا، وإن كان ذلك على حساب استهلاك المزيد من الذاكرة. بالنسبة للبيئات التي يكون فيها الحفاظ على الذاكرة أولوية، يمكن أن يساعد فهرس <strong>GPU_IVF_PQ</strong> في تقليل متطلبات التخزين، على الرغم من أن ذلك يأتي مع خسارة أعلى في الدقة. يعمل فهرس <strong>GPU_IVF_FLAT</strong> كخيار متوازن، حيث يوفر حلاً وسطًا بين الأداء واستخدام الذاكرة. أخيرًا، تم تصميم فهرس <strong>GPU_BRUTE_FORCE</strong> لعمليات البحث الشاملة، مما يضمن معدل استرجاع 1 من خلال إجراء عمليات بحث اجتياحية.</p></li>
</ul>
