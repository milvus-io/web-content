---
id: sparse-inverted-index.md
title: الفهرس_المتفرق_المقلوب_الفهرس
summary: >-
  فهرس SPARSE_INVERTED_INDEX هو نوع فهرس يستخدمه Milvus لتخزين المتجهات المتفرقة
  والبحث فيها بكفاءة. يستفيد هذا النوع من الفهرس من مبادئ الفهرسة المقلوبة
  لإنشاء بنية بحث عالية الكفاءة للبيانات المتفرقة.
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">الفهرس_المتفرق_المقلوب_الفهرس<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p>الفهرس <code translate="no">SPARSE_INVERTED_INDEX</code> هو نوع فهرس يستخدمه Milvus لتخزين المتجهات المتفرقة والبحث فيها بكفاءة. يستفيد هذا النوع من الفهرس من مبادئ الفهرسة المقلوبة لإنشاء بنية بحث عالية الكفاءة للبيانات المتفرقة. لمزيد من المعلومات، راجع <a href="/docs/ar/inverted.md">INVERTED</a>.</p>
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
    </button></h2><p>لإنشاء فهرس <code translate="no">SPARSE_INVERTED_INDEX</code> على حقل متجه متناثر في ميلفوس، استخدم الطريقة <code translate="no">add_index()</code> ، مع تحديد <code translate="no">index_type</code> و <code translate="no">metric_type</code> ومعلمات إضافية للفهرس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_sparse_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># Algorithm used for building and querying the index</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. في هذا المثال، اضبط القيمة على <code translate="no">SPARSE_INVERTED_INDEX</code>.</p></li>
<li><p><code translate="no">metric_type</code>: المقياس المستخدم لحساب التشابه بين المتجهات المتفرقة. قيم صالحة:</p>
<ul>
<li><p><code translate="no">IP</code> (الضرب الداخلي): يقيس التشابه باستخدام الضرب النقطي.</p></li>
<li><p><code translate="no">BM25</code>: يستخدم عادةً للبحث في النص الكامل، مع التركيز على التشابه النصي.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/metric.md">أنواع القياس</a> <a href="/docs/ar/full-text-search.md">والبحث في النص الكامل</a>.</p></li>
</ul></li>
<li><p><code translate="no">params.inverted_index_algo</code>: الخوارزمية المستخدمة لبناء الفهرس والاستعلام عنه. قيم صالحة:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code> (افتراضي): معالجة استعلام المستند في الوقت المحسن (DAAT) باستخدام خوارزمية MaxScore. يوفر MaxScore أداءً أفضل لقيم <em>k</em> العالية أو الاستعلامات التي تحتوي على العديد من المصطلحات عن طريق تخطي المصطلحات والمستندات التي من المحتمل أن يكون لها تأثير ضئيل. وهي تحقق ذلك من خلال تقسيم المصطلحات إلى مجموعات أساسية وغير أساسية بناءً على درجات التأثير القصوى، مع التركيز على المصطلحات التي يمكن أن تساهم في أعلى k من النتائج.</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: معالجة استعلام DAAT الأمثل باستخدام خوارزمية WAND. تقوم WAND بتقييم عدد أقل من المستندات التي تم الوصول إليها من خلال الاستفادة من درجات التأثير القصوى لتخطي المستندات غير المنافسة، ولكن لديها نفقات أعلى لكل ضربة. وهذا يجعل WAND أكثر كفاءة للاستعلامات ذات القيم <em>k</em> الصغيرة أو الاستعلامات القصيرة، حيث يكون التخطي أكثر جدوى.</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: معالجة استعلام المصطلح الأساسي في الوقت (TAAT). على الرغم من أنها أبطأ مقارنةً بـ <code translate="no">DAAT_MAXSCORE</code> و <code translate="no">DAAT_WAND</code> ، إلا أن <code translate="no">TAAT_NAIVE</code> تقدم ميزة فريدة. على عكس خوارزميات DAAT، التي تستخدم درجات التأثير القصوى المخزنة مؤقتًا والتي تظل ثابتة بغض النظر عن التغييرات التي تطرأ على معلمة التجميع العالمية (avgdl)، يتكيف <code translate="no">TAAT_NAIVE</code> ديناميكيًا مع هذه التغييرات.</p></li>
</ul>
<p>لمعرفة المزيد من معلمات البناء المتوفرة للفهرس <code translate="no">SPARSE_INVERTED_INDEX</code> ، راجع <a href="/docs/ar/sparse-inverted-index.md#Index-building-params">بارامترات بناء الفهرس</a>.</p></li>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=query_vector,  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>لمعرفة المزيد من معلمات البحث المتوفرة للفهرس <code translate="no">SPARSE_INVERTED_INDEX</code> ، راجع <a href="/docs/ar/ivf-flat.md#share-KDWodFEx6oCm2yxgEUAcXaUDnwg">باراميات البحث الخاصة بالفهرس</a>.</p>
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
<h3 id="Index-building-params" class="common-anchor-header">معلمات بناء الفهرس<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">params</code> عند <a href="/docs/ar/sparse-inverted-index.md#Build-index">إنشاء فهرس</a>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>الخوارزمية المستخدمة لبناء الفهرس والاستعلام عنه. وهي تحدد كيفية معالجة الفهرس للاستعلامات.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code> (افتراضي)، <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code></p></td>
     <td><p>استخدم <code translate="no">"DAAT_MAXSCORE"</code> للسيناريوهات ذات القيم k العالية أو الاستعلامات التي تحتوي على العديد من المصطلحات، والتي يمكن أن تستفيد من تخطي المستندات غير التنافسية. </p><p>اختر <code translate="no">"DAAT_WAND"</code> للاستعلامات ذات القيم k الصغيرة أو الاستعلامات القصيرة للاستفادة من التخطي الأكثر كفاءة.</p><p>استخدم <code translate="no">"TAAT_NAIVE"</code> إذا كان التعديل الديناميكي لتغيرات المجموعة (على سبيل المثال، avgdl) مطلوبًا.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">بارامترات البحث الخاصة بالفهرس<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="/docs/ar/sparse-inverted-index.md#Search-on-index">البحث في الفهرس</a>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>نسبة أصغر القيم المراد تجاهلها أثناء البحث، مما يساعد على تقليل التشويش.</p></td>
     <td><p>الكسر بين 0.0 و1.0 (على سبيل المثال، 0.2 يتجاهل أصغر 20% من القيم)</p></td>
     <td><p>اضبط هذه المعلمة استنادًا إلى مستوى التشتت والتشويش في متجهات الاستعلام لديك.</p><p>تتحكم هذه المعلمة في نسبة القيم منخفضة الحجم التي تم إسقاطها أثناء البحث. يمكن أن تؤدي زيادة هذه القيمة (على سبيل المثال، إلى <code translate="no">0.2</code>) إلى تقليل التشويش وتركيز البحث على مكونات أكثر أهمية، مما قد يحسن الدقة والكفاءة. ومع ذلك، فإن إسقاط المزيد من القيم يمكن أن يقلل أيضًا من الاستدعاء عن طريق استبعاد الإشارات ذات الصلة المحتملة. اختر القيمة التي توازن بين الاستدعاء والدقة لعبء العمل لديك.</p></td>
   </tr>
</table>
