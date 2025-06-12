---
id: gpu-ivf-pq.md
title: GPU_IVF_PQ
summary: >-
  يعتمد فهرس GPU_IVF_PQ على مفهوم IVF_PQ من خلال الجمع بين تجميع الملفات المقلوب
  مع تجميع المنتج الكمي (PQ)، والذي يقسم المتجهات عالية الأبعاد إلى مساحات فرعية
  أصغر ويحدد كميتها من أجل عمليات بحث فعالة عن التشابه. تم تصميم GPU_IVF_PQ
  حصريًا لبيئات وحدة معالجة الرسومات، ويستفيد من المعالجة المتوازية لتسريع
  العمليات الحسابية والتعامل مع البيانات المتجهة واسعة النطاق بفعالية. لمزيد من
  المعلومات حول المفاهيم التأسيسية، راجع IVF_IVF_PQ.
---
<h1 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>يعتمد فهرس <strong>GPU_IVF_PQ</strong> على مفهوم <strong>IVF_PQ</strong> من خلال الجمع بين تجميع الملفات المقلوب مع تجميع المنتج الكمي (PQ)، والذي يقسم المتجهات عالية الأبعاد إلى مساحات فرعية أصغر ويحدد كميتها من أجل عمليات بحث فعالة عن التشابه. تم تصميم GPU_IVF_PQ حصريًا لبيئات وحدة معالجة الرسومات، ويستفيد من المعالجة المتوازية لتسريع العمليات الحسابية والتعامل مع البيانات المتجهة واسعة النطاق بفعالية. لمزيد من المعلومات حول المفاهيم التأسيسية، راجع <a href="/docs/ar/ivf-pq.md">IVF_IVF_PQ</a>.</p>
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
    </button></h2><p>لإنشاء فهرس <code translate="no">GPU_IVF_PQ</code> على حقل متجه في ميلفوس، استخدم طريقة <code translate="no">add_index()</code> ، مع تحديد <code translate="no">index_type</code> و <code translate="no">metric_type</code> ومعلمات إضافية للفهرس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. في هذا المثال، اضبط القيمة على <code translate="no">GPU_IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: الطريقة المستخدمة لحساب المسافة بين المتجهات. تتضمن القيم المدعومة <code translate="no">COSINE</code> و <code translate="no">L2</code> و <code translate="no">IP</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p></li>
<li><p><code translate="no">params</code>: : خيارات التكوين الإضافية لبناء الفهرس.</p>
<ul>
<li><code translate="no">m</code>: عدد المتجهات الفرعية المراد تقسيم المتجه إليها.</li>
</ul>
<p>لمعرفة المزيد من معلمات البناء المتوفرة للفهرس <code translate="no">GPU_IVF_PQ</code> ، راجع <a href="/docs/ar/gpu-ivf-pq.md#Index-building-params">بارامترات بناء الفهرس</a>.</p></li>
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
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
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
<p>لمعرفة المزيد من معلمات البحث المتوفرة للفهرس <code translate="no">GPU_IVF_PQ</code> ، راجع <a href="/docs/ar/gpu-ivf-pq.md#Index-specific-search-params">باراميات البحث الخاصة بالفهرس</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">معلمات بناء الفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">params</code> عند <a href="/docs/ar/gpu-ivf-pq.md#Build-index">إنشاء فهرس</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p>عامل التجميع</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>عدد المجموعات المراد إنشاؤها باستخدام خوارزمية k-means أثناء بناء الفهرس.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>المدى</strong>: [1, 65536]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">128</code></p></td>
     <td><p>تعمل القيم الأكبر <code translate="no">nlist</code> على تحسين الاسترجاع من خلال إنشاء مجموعات أكثر دقة ولكنها تزيد من وقت بناء الفهرس. قم بالتحسين بناءً على حجم مجموعة البيانات والموارد المتاحة. في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>عدد المتجهات الفرعية (المستخدمة في التكميم) لتقسيم كل متجه عالي الأبعاد إلى متجهات عالية الأبعاد أثناء عملية التكميم.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>المدى</strong>: [1, 65536]</p>
<p><strong>القيمة الافتراضية</strong>: لا يوجد</p></td>
     <td><p>يمكن لقيمة <code translate="no">m</code> الأعلى أن تحسن الدقة، لكنها تزيد أيضًا من التعقيد الحسابي واستخدام الذاكرة. <code translate="no">m</code> يجب أن تكون القيمة قاسماً على البعد المتجه<em>(D</em>) لضمان التحلل الصحيح. القيمة الموصى بها عادةً هي <em>m = D/2</em>.</p>
<p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [D/8، D].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>عدد البتات المستخدمة لتمثيل فهرس مركزية كل متجه فرعي في النموذج المضغوط. وهو يحدد مباشرةً حجم كل دفتر رموز، حيث سيحتوي كل دفتر رموز على 2 ^{\نص{نبت}}$ من وحدات مركزية. على سبيل المثال، إذا تم تعيين <code translate="no">nbits</code> على 8، فسيتم تمثيل كل متجه فرعي بفهرس مركزية من 8 بت. وهذا يسمح بوجود 2^8$ (256) مركزية ممكنة في دفتر الرموز لهذا المتجه الفرعي.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>المدى</strong>: [1, 64]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">8</code></p></td>
     <td><p>تسمح القيمة الأعلى <code translate="no">nbits</code> بوجود دفاتر رموز أكبر، مما قد يؤدي إلى تمثيلات أكثر دقة للمتجهات الأصلية. ومع ذلك، فإن ذلك يعني أيضًا استخدام المزيد من البتات لتخزين كل فهرس، مما يؤدي إلى ضغط أقل. في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>يقرر ما إذا كان سيتم تخزين مجموعة البيانات الأصلية مؤقتًا في ذاكرة وحدة معالجة الرسومات. القيم الممكنة:</p>
<ul>
<li><p><code translate="no">"true"</code>: تخزين مجموعة البيانات الأصلية مؤقتًا لتحسين الاسترجاع من خلال تحسين نتائج البحث.</p></li>
<li><p><code translate="no">"false"</code>: لا يخزن مجموعة البيانات الأصلية مؤقتًا لحفظ ذاكرة وحدة معالجة الرسومات.</p></li>
</ul></td>
     <td><p><strong>النوع</strong>: سلسلة <strong>النطاق</strong>: [<code translate="no">"true"</code> ، <code translate="no">"false"</code>]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">"false"</code></p></td>
     <td><p>يعمل تعيينها على <code translate="no">"true"</code> على تحسين الاستدعاء من خلال تحسين نتائج البحث ولكنه يستخدم المزيد من ذاكرة وحدة معالجة الرسومات. ضبطه على <code translate="no">"false"</code> يحافظ على ذاكرة وحدة معالجة الرسومات.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">بارامترات البحث الخاصة بالفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="/docs/ar/gpu-ivf-pq.md#Search-on-index">البحث في الفهرس</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p>عامل التهيئة</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>عدد المجموعات للبحث عن المرشحين.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>المدى</strong>: [1, <em>nlist</em>]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">8</code></p></td>
     <td><p>تسمح القيم الأعلى بالبحث في عدد أكبر من المجموعات، مما يحسّن الاستدعاء من خلال توسيع نطاق البحث ولكن على حساب زيادة زمن انتقال الاستعلام. قم بتعيين <code translate="no">nprobe</code> بشكل متناسب مع <code translate="no">nlist</code> لتحقيق التوازن بين السرعة والدقة.</p>
<p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [1, nlist].</p></td>
   </tr>
</table>
