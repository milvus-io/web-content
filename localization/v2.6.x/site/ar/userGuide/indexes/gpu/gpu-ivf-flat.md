---
id: gpu-ivf-flat.md
title: GPU_IVF_FLAT
summary: >-
  إن فهرس GPU_IVF_FLAT هو نسخة مسرعة من فهرس IVF_FLAT، وهو مصمم حصريًا لبيئات
  GPU. وهو يقسم بيانات المتجهات إلى وحدات عنقودية nlist ويحسب التشابه من خلال
  مقارنة متجه الاستعلام المستهدف أولاً بمركز كل مجموعة. من خلال ضبط معلمة
  nprobe، يتم البحث عن المجموعات الواعدة فقط، مما يقلل من وقت الاستعلام مع
  الحفاظ على التوازن بين الدقة والسرعة. لمزيد من المعلومات حول المفاهيم
  التأسيسية، راجع IVF_FLAT.
---
<h1 id="GPUIVFFLAT" class="common-anchor-header">GPU_IVF_FLAT<button data-href="#GPUIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h1><p>فهرس <strong>GPU_IVF_FLAT</strong> هو نسخة مسرعة من فهرس IVF_FLAT، وهو مصمم حصريًا لبيئات GPU. وهو يقسم بيانات المتجهات إلى <code translate="no">nlist</code> وحدات عنقودية ويحسب التشابه من خلال مقارنة متجه الاستعلام المستهدف أولاً بمركز كل مجموعة. من خلال ضبط المعلمة <code translate="no">nprobe</code> ، يتم البحث عن المجموعات الواعدة فقط، مما يقلل من وقت الاستعلام مع الحفاظ على التوازن بين الدقة والسرعة. لمزيد من المعلومات حول المفاهيم التأسيسية، راجع <a href="/docs/ar/ivf-flat.md">IVF_FLAT</a>.</p>
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
    </button></h2><p>لإنشاء فهرس <code translate="no">GPU_IVF_FLAT</code> على حقل متجه في ميلفوس، استخدم طريقة <code translate="no">add_index()</code> ، مع تحديد <code translate="no">index_type</code> و <code translate="no">metric_type</code> ومعلمات إضافية للفهرس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_IVF_FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>, <span class="hljs-comment"># Number of clusters for the index</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. في هذا المثال، اضبط القيمة على <code translate="no">GPU_IVF_FLAT</code>.</p></li>
<li><p><code translate="no">metric_type</code>: الطريقة المستخدمة لحساب المسافة بين المتجهات. للحصول على التفاصيل، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p></li>
<li><p><code translate="no">params</code>: : خيارات التكوين الإضافية لبناء الفهرس.</p>
<ul>
<li><code translate="no">nlist</code>: عدد المجموعات لتقسيم مجموعة البيانات.</li>
</ul>
<p>لمعرفة المزيد من معلمات البناء المتوفرة للفهرس <code translate="no">GPU_IVF_FLAT</code> ، راجع <a href="/docs/ar/gpu-ivf-flat.md#Index-building-params">بارامز بناء الفهرس</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">params</code>: خيارات التكوين الإضافية للبحث على الفهرس.</p>
<ul>
<li><code translate="no">nprobe</code>: عدد المجموعات المطلوب البحث عنها.</li>
</ul>
<p>لمعرفة المزيد من معلمات البحث المتوفرة للفهرس <code translate="no">GPU_IVF_FLAT</code> ، راجع <a href="/docs/ar/gpu-ivf-flat.md#Index-specific-search-params">باراميات البحث الخاصة بالفهرس</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">معلمات بناء الفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">params</code> عند <a href="/docs/ar/gpu-ivf-flat.md#Build-index">إنشاء فهرس</a>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>عدد العناقيد المراد إنشاؤها باستخدام خوارزمية k-means أثناء بناء الفهرس. يخزن كل عنقود، ممثلاً بنقطة مركزية، قائمة من المتجهات. تؤدي زيادة هذه المعلمة إلى تقليل عدد المتجهات في كل مجموعة، مما يؤدي إلى إنشاء أقسام أصغر وأكثر تركيزًا.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>المدى</strong>: [1, 65536]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">128</code></p></td>
     <td><p>تعمل القيم الأكبر <code translate="no">nlist</code> على تحسين الاستدعاء من خلال إنشاء مجموعات أكثر دقة ولكنها تزيد من وقت بناء الفهرس. قم بالتحسين بناءً على حجم مجموعة البيانات والموارد المتاحة. في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">بارامترات البحث الخاصة بالفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="/docs/ar/gpu-ivf-flat.md#Search-on-index">البحث في الفهرس</a>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>عدد المجموعات للبحث عن المرشحين. تسمح القيم الأعلى بالبحث عن المزيد من المجموعات، مما يحسن الاستدعاء من خلال توسيع نطاق البحث ولكن على حساب زيادة زمن انتقال الاستعلام.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>المدى</strong>: [1, <em>nlist</em>]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">8</code></p></td>
     <td><p>تؤدي زيادة هذه القيمة إلى تحسين الاستدعاء ولكنها قد تؤدي إلى إبطاء البحث. قم بتعيين <code translate="no">nprobe</code> بشكل متناسب مع <code translate="no">nlist</code> لتحقيق التوازن بين السرعة والدقة.</p>
<p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [1، nlist].</p></td>
   </tr>
</table>
