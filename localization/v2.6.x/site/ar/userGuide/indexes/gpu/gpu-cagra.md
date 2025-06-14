---
id: gpu-cagra.md
title: GPU_CAGRA
summary: >-
  إن فهرس GPU_CAGRA هو فهرس قائم على الرسم البياني مُحسَّن لوحدات معالجة
  الرسومات. يمكن أن يكون استخدام وحدات معالجة الرسومات الاستدلالية لتشغيل إصدار
  وحدة معالجة الرسومات Milvus GPU أكثر فعالية من حيث التكلفة مقارنةً باستخدام
  وحدات معالجة الرسومات باهظة الثمن من فئة التدريب.
---
<h1 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h1><p>فهرس <strong>GPU_CAGRA</strong> هو فهرس قائم على الرسم البياني مُحسَّن لوحدات معالجة الرسومات. يمكن أن يكون استخدام وحدات معالجة الرسومات الاستدلالية لتشغيل إصدار وحدة معالجة الرسومات Milvus GPU أكثر فعالية من حيث التكلفة مقارنةً باستخدام وحدات معالجة الرسومات باهظة الثمن من فئة التدريب.</p>
<h2 id="Build-index" class="common-anchor-header">بناء الفهرس<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>لإنشاء فهرس <code translate="no">GPU_CAGRA</code> على حقل متجه في Milvus، استخدم طريقة <code translate="no">add_index()</code> ، مع تحديد <code translate="no">index_type</code> و <code translate="no">metric_type</code> ومعلمات إضافية للفهرس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_CAGRA&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;intermediate_graph_degree&quot;</span>: <span class="hljs-number">32</span>, <span class="hljs-comment"># Affects recall and build time by determining the graph’s degree before pruning</span>
        <span class="hljs-string">&quot;graph_degree&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Affets search performance and recall by setting the graph’s degree after pruning</span>
        <span class="hljs-string">&quot;build_algo&quot;</span>: <span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Selects the graph generation algorithm before pruning</span>
        <span class="hljs-string">&quot;cache_dataset_on_device&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>, <span class="hljs-comment"># Decides whether to cache the original dataset in GPU memory</span>
        <span class="hljs-string">&quot;adapt_for_cpu&quot;</span>: <span class="hljs-string">&quot;false&quot;</span>, <span class="hljs-comment"># Decides whether to use GPU for index-building and CPU for search</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. في هذا المثال، اضبط القيمة على <code translate="no">GPU_CAGRA</code>.</p></li>
<li><p><code translate="no">metric_type</code>: الطريقة المستخدمة لحساب المسافة بين المتجهات. للحصول على التفاصيل، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p></li>
<li><p><code translate="no">params</code>: خيارات التكوين الإضافية لبناء الفهرس. لمعرفة المزيد من معلمات البناء المتوفرة للفهرس <code translate="no">GPU_CAGRA</code> ، راجع <a href="/docs/ar/gpu-cagra.md#Index-building-params">بارامز بناء الفهرس</a>.</p></li>
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
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-comment"># Determines the size of intermediate results kept during the search</span>
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Specifies the number of entry points into the CAGRA graph during the search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><code translate="no">params</code>: خيارات التكوين الإضافية للبحث على الفهرس. لمعرفة المزيد من معلمات البحث المتوفرة للفهرس <code translate="no">GPU_CAGRA</code> ، راجع <a href="/docs/ar/gpu-cagra.md#Index-specific-search-params">باراميات البحث الخاصة بالفهرس</a>.</li>
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
<h3 id="Index-building-params" class="common-anchor-header">معلمات بناء الفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">params</code> عند <a href="/docs/ar/gpu-cagra.md#Build-index">إنشاء فهرس</a>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>القيمة الافتراضية</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">intermediate_graph_degree</code></p></td>
     <td><p>تؤثر على الاستدعاء ووقت الإنشاء من خلال تحديد درجة الرسم البياني قبل التقليم. القيم الموصى بها هي <code translate="no">32</code> أو <code translate="no">64</code>.</p></td>
     <td><p><code translate="no">128</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">graph_degree</code></p></td>
     <td><p>تؤثر على أداء البحث والاستدعاء من خلال تحديد درجة الرسم البياني بعد التقليم. ينتج عن الفرق الأكبر بين هاتين الدرجتين وقت بناء أطول. يجب أن تكون قيمته أصغر من قيمة <code translate="no">intermediate_graph_degree</code>.</p></td>
     <td><p><code translate="no">64</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">build_algo</code></p></td>
     <td><p>يحدد خوارزمية إنشاء الرسم البياني قبل التقليم. القيم الممكنة:</p>
<ul>
<li><p><code translate="no">IVF_PQ</code>: تقدم جودة أعلى ولكن وقت بناء أبطأ.</p></li>
<li><p><code translate="no">NN_DESCENT</code>: يوفر إنشاءً أسرع مع إمكانية استرجاع أقل.</p></li>
</ul></td>
     <td><p><code translate="no">IVF_PQ</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>يقرر ما إذا كان سيتم تخزين مجموعة البيانات الأصلية مؤقتًا في ذاكرة وحدة معالجة الرسومات. القيم الممكنة:</p>
<ul>
<li><p><code translate="no">"true"</code>: تخزين مجموعة البيانات الأصلية مؤقتًا لتحسين الاسترجاع من خلال تحسين نتائج البحث.</p></li>
<li><p><code translate="no">"false"</code>: لا يخزن مجموعة البيانات الأصلية مؤقتًا لحفظ ذاكرة وحدة معالجة الرسومات.</p></li>
</ul></td>
     <td><p><code translate="no">"false"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">adapt_for_cpu</code></p></td>
     <td><p>يقرر ما إذا كان سيتم استخدام وحدة معالجة الرسومات لبناء الفهرس ووحدة المعالجة المركزية للبحث. يتطلب تعيين هذه المعلمة إلى <code translate="no">"true"</code> وجود المعلمة <code translate="no">ef</code> في طلبات البحث.</p></td>
     <td><p><code translate="no">"false"</code></p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">بارامترات البحث الخاصة بالفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="/docs/ar/gpu-cagra.md#Search-on-index">البحث في الفهرس</a>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>القيمة الافتراضية</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">itopk_size</code></p></td>
     <td><p>تحدد حجم النتائج الوسيطة التي يتم الاحتفاظ بها أثناء البحث. قد تؤدي القيمة الأكبر إلى تحسين الاستدعاء على حساب أداء البحث. يجب أن تكون مساوية على الأقل للقيمة النهائية لأعلى k (الحد الأعلى) وعادةً ما تكون قوة 2 (على سبيل المثال، 16، 32، 64، 128).</p></td>
     <td><p>فارغة</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_width</code></p></td>
     <td><p>يحدد عدد نقاط الدخول إلى الرسم البياني CAGRA أثناء البحث. يمكن أن تؤدي زيادة هذه القيمة إلى تحسين الاستدعاء ولكنها قد تؤثر على أداء البحث （على سبيل المثال 1، 2، 4، 8، 16، 32).</p></td>
     <td><p>فارغة</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></p></td>
     <td><p>يتحكم في عملية تكرار البحث. بشكل افتراضي، يتم ضبطها على <code translate="no">0</code> ، وتحدد CAGRA تلقائيًا عدد التكرارات بناءً على <code translate="no">itopk_size</code> و <code translate="no">search_width</code>. يمكن أن يساعد ضبط هذه القيم يدويًا في تحقيق التوازن بين الأداء والدقة.</p></td>
     <td><p><code translate="no">0</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">team_size</code></p></td>
     <td><p>يحدد عدد خيوط CUDA المستخدمة لحساب المسافة المترية على وحدة معالجة الرسومات. القيم الشائعة هي قوة 2 حتى 32 (على سبيل المثال 2، 4، 8، 16، 32). لها تأثير طفيف على أداء البحث. القيمة الافتراضية هي <code translate="no">0</code> ، حيث يقوم Milvus تلقائيًا بتحديد <code translate="no">team_size</code> بناءً على بُعد المتجه.</p></td>
     <td><p><code translate="no">0</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>يحدد مفاضلة وقت/دقة الاستعلام. تؤدي القيمة الأعلى <code translate="no">ef</code> إلى بحث أكثر دقة ولكن أبطأ. هذه المعلمة إلزامية إذا قمت بتعيين <code translate="no">adapt_for_cpu</code> على <code translate="no">true</code> عند إنشاء الفهرس.</p></td>
     <td><p><code translate="no">[top_k, int_max]</code></p></td>
   </tr>
</table>
