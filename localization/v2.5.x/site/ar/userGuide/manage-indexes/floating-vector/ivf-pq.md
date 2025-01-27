---
id: ivf-pq.md
order: 2
summary: ستقدم هذه المقالة مؤشر IVF_PQ في Milvus.
title: IVF_PQ
---
<h1 id="IVFPQ" class="common-anchor-header">IVF_PQ<button data-href="#IVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>إن فهرس <strong>IVF_PQ</strong> هو خوارزمية فهرسة <strong>قائمة على التكميم</strong> للبحث التقريبي عن أقرب جار في المساحات عالية الأبعاد. على الرغم من أنها ليست بنفس سرعة بعض الأساليب القائمة على الرسم البياني، إلا أن <strong>IVF_PQ</strong> غالبًا ما تتطلب ذاكرة أقل بكثير، مما يجعلها خيارًا عمليًا لمجموعات البيانات الكبيرة.</p>
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
    </button></h2><p>يرمز <strong>IVF_PQ</strong> إلى <strong>الملف المقلوب مع تحديد كمية المنتج،</strong> وهو نهج هجين يجمع بين الفهرسة والضغط من أجل البحث الفعال عن المتجهات واسترجاعها. وهو يستفيد من مكونين أساسيين: <strong>الملف المقلوب (IVF)</strong> والتكميم <strong>الكمي</strong> للمنتج <strong>(PQ)</strong>.</p>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>يشبه IVF إنشاء فهرس في كتاب. بدلاً من مسح كل صفحة (أو، في حالتنا، كل متجه)، يمكنك البحث عن كلمات رئيسية محددة (مجموعات) في الفهرس للعثور بسرعة على الصفحات (المتجهات) ذات الصلة. في السيناريو الخاص بنا، يتم تجميع المتجهات في مجموعات، وستقوم الخوارزمية بالبحث ضمن مجموعات قليلة قريبة من متجه الاستعلام.</p>
<p>إليك كيفية عملها:</p>
<ol>
<li><strong>التجميع:</strong> يتم تقسيم مجموعة البيانات المتجهة إلى عدد محدد من العناقيد باستخدام خوارزمية تجميع مثل k-means. تحتوي كل مجموعة على مركزية (متجه تمثيلي للمجموعة).</li>
<li><strong>التعيين:</strong> يتم تعيين كل متجه إلى المجموعة التي يكون متجهها المركزي الأقرب إليه.</li>
<li><strong>الفهرس المقلوب:</strong> يتم إنشاء فهرس يعيّن مركز كل مجموعة عنقودية إلى قائمة المتجهات المعينة لتلك المجموعة.</li>
<li><strong>بحث:</strong> عند البحث عن أقرب الجيران، تقارن خوارزمية البحث متجه الاستعلام الخاص بك مع مراكز المجموعات العنقودية وتختار المجموعة (المجموعات) الواعدة. ثم يتم تضييق نطاق البحث إلى المتجهات داخل تلك المجموعات المختارة.</li>
</ol>
<p>لمعرفة المزيد حول تفاصيلها الفنية، راجع <a href="/docs/ar/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p>تكميم<strong>المنتج (PQ)</strong> هي طريقة ضغط للمتجهات عالية الأبعاد تقلل بشكل كبير من متطلبات التخزين مع تمكين عمليات البحث عن التشابه السريع.</p>
<p>تتضمن عملية PQ هذه المراحل الرئيسية:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-1.png" alt="pq-process-1" class="doc-image" id="pq-process-1" />
   </span> <span class="img-wrapper"> <span>عملية PQ- 1</span> </span></p>
<ol>
<li><strong>تحلل الأبعاد</strong>: تبدأ الخوارزمية بتحليل كل متجه عالي الأبعاد إلى <code translate="no">m</code> متجهات فرعية متساوية الحجم. يحوّل هذا التحلل الفضاء الأصلي ذا الأبعاد D إلى <code translate="no">m</code> فضاءات فرعية منفصلة، حيث يحتوي كل فضاء فرعي على أبعاد <em>D/م</em>. تتحكم المعلمة <code translate="no">m</code> في دقة التحلل وتؤثر بشكل مباشر على نسبة الضغط.</li>
<li><strong>توليد دفتر رموز الفضاء الفرعي</strong>: داخل كل فضاء فرعي، تطبق الخوارزمية <a href="https://en.wikipedia.org/wiki/K-means_clustering">تجميع k-means</a> لتعلم مجموعة من المتجهات التمثيلية (مركزيات). وتشكل هذه المركزيات مجتمعةً كتاب رموز لهذا الفضاء الفرعي. يتم تحديد عدد المراكز في كل دفتر رموز بواسطة البارامتر <code translate="no">nbits</code> ، حيث يحتوي كل دفتر رموز على 2^nbits من المراكز. على سبيل المثال، إذا كان <code translate="no">nbits = 8</code> ، سيحتوي كل دفتر رموز على 256 مركزاً. يتم تعيين فهرس فريد لكل مركزية مع <code translate="no">nbits</code> بت.</li>
<li><strong>تكميم</strong><strong>المتجهات</strong>: بالنسبة لكل متجه فرعي في المتجه الأصلي، يحدد PQ أقرب نقطة مركزية له داخل الفضاء الفرعي المقابل باستخدام نوع مقياس معين. تقوم هذه العملية بفعالية بتعيين كل متجه فرعي إلى أقرب متجه تمثيلي له في دفتر الرموز. وبدلاً من تخزين إحداثيات المتجه الفرعي بالكامل، يتم الاحتفاظ فقط بفهرس المتجه المركزي المطابق.</li>
<li><strong>التمثيل المضغوط</strong>: يتألف التمثيل المضغوط النهائي من <code translate="no">m</code> مؤشر، واحد من كل فضاء فرعي، ويشار إليها مجتمعة <strong>برموز PQ</strong>. يقلل هذا الترميز من متطلبات التخزين من <em>D × 32</em> بت (بافتراض أرقام الفاصلة العائمة 32 بت) إلى <em>m</em> × <em>nbits</em> بت، مما يحقق ضغطًا كبيرًا مع الحفاظ على القدرة على تقريب مسافات المتجهات.</li>
</ol>
<p>لمزيد من التفاصيل حول ضبط المعلمات وتحسينها، راجع <a href="#index-params">فهرس البارامترات</a>.</p>
<div class="alert note">
<p><strong>مثال على الضغط</strong></p>
<p>ضع في اعتبارك متجهًا بأبعاد <em>D = 128</em> بعدًا باستخدام أرقام ذات فاصلة عائمة 32 بت. باستخدام معلمات PQ <em>m = 64</em> (المتجهات الفرعية) و <em>nbits = 8</em> (وبالتالي <em>k =</em> 2^8 <em>= 256</em> مركزًا لكل مساحة فرعية)، يمكننا مقارنة متطلبات التخزين:</p>
<ul>
<li>المتجه الأصلي: 128 بُعدًا × 32 بت = 4096 بت</li>
<li>متجه مضغوط PQ: 64 متجهًا فرعيًا × 8 بت = 512 بت</li>
</ul>
<p>يمثل ذلك انخفاضًا بمقدار 8 أضعاف في متطلبات التخزين.</p>
</div>
<p><strong>حساب المسافة باستخدام PQ</strong></p>
<p>عند إجراء بحث التشابه مع متجه استعلام، يتيح PQ حساب المسافة بكفاءة من خلال الخطوات التالية:</p>
<ol>
<li><p><strong>المعالجة المسبقة للاستعلام</strong></p>
<ol>
<li>يتحلل متجه الاستعلام إلى <code translate="no">m</code> متجهات فرعية، بما يتطابق مع بنية تحليل PQ الأصلية.</li>
<li>لكل متجه استعلام فرعي ودفتر الرموز المقابل له (يحتوي على 2^nbits centroids)، يتم حساب وتخزين المسافات إلى جميع المراكز.</li>
<li>يؤدي هذا إلى إنشاء <code translate="no">m</code> جداول بحث، حيث يحتوي كل جدول على مسافات 2^nbits.</li>
</ol></li>
<li><p><strong>تقريب المسافات</strong></p>
<p>بالنسبة إلى أي متجه قاعدة بيانات ممثلة برموز PQ، يتم حساب المسافة التقريبية إلى متجه الاستعلام على النحو التالي:</p>
<ol>
<li>بالنسبة لكل متجه من المتجهات الفرعية <code translate="no">m</code> ، استرجع المسافة المحسوبة مسبقًا من جدول البحث المقابل باستخدام فهرس النواة المركزية المخزنة.</li>
<li>اجمع هذه المسافات <code translate="no">m</code> للحصول على المسافة التقريبية بناءً على نوع مقياس معين (مثل المسافة الإقليدية).</li>
</ol></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-2.png" alt="pq-process-1" class="doc-image" id="pq-process-1" />
   </span> <span class="img-wrapper"> <span>عملية pq-process-1</span> </span></p>
<h3 id="IVF-+-PQ" class="common-anchor-header">IVF + PQ</h3><p>يجمع مؤشر <strong>IVF_PQ</strong> بين نقاط قوة <strong>IVF</strong> <strong>وPQ</strong> لتسريع عمليات البحث. تعمل العملية في خطوتين:</p>
<ol>
<li><strong>التصفية الخشنة باستخدام IVF</strong>: يقسم IVF فضاء المتجه إلى مجموعات، مما يقلل من نطاق البحث. بدلاً من تقييم مجموعة البيانات بأكملها، تركز الخوارزمية فقط على المجموعات الأقرب إلى متجه الاستعلام.</li>
<li><strong>المقارنة الدقيقة مع PQ</strong>: داخل المجموعات المختارة، تستخدم PQ تمثيلات المتجهات المضغوطة والكمية لحساب المسافات التقريبية بسرعة.</li>
</ol>
<p>يتأثر أداء فهرس <strong>IVF_PQ</strong> بشكل كبير بالمعلمات التي تتحكم في كل من خوارزميات IVF و PQ. يعد ضبط هذه المعلمات أمرًا بالغ الأهمية لتحقيق أفضل النتائج لمجموعة بيانات وتطبيق معينين. يمكن العثور على معلومات أكثر تفصيلاً حول هذه المعلمات وكيفية ضبطها في <a href="#index-params">بارامز الفهرس</a>.</p>
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
    </button></h2><p>لإنشاء فهرس <code translate="no">IVF_PQ</code> على حقل متجه في ميلفوس، استخدم طريقة <code translate="no">add_index()</code> ، مع تحديد <code translate="no">index_type</code> و <code translate="no">metric_type</code> ومعلمات إضافية للفهرس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. في هذا المثال، اضبط القيمة على <code translate="no">IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: الطريقة المستخدمة لحساب المسافة بين المتجهات. تتضمن القيم المدعومة <code translate="no">COSINE</code> و <code translate="no">L2</code> و <code translate="no">IP</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p></li>
<li><p><code translate="no">params</code>: : خيارات التكوين الإضافية لبناء الفهرس.</p>
<ul>
<li><code translate="no">m</code>: عدد المتجهات الفرعية المراد تقسيم المتجه إليها.</li>
</ul>
<p>لمعرفة المزيد من معلمات البناء المتوفرة للفهرس <code translate="no">IVF_PQ</code> ، راجع <a href="#Index-building-params">بارامترات بناء الفهرس</a>.</p></li>
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
<p>لمعرفة المزيد من معلمات البحث المتوفرة للفهرس <code translate="no">IVF_PQ</code> ، راجع <a href="#index-specific-search-params">باراميات البحث الخاصة بالفهرس</a>.</p></li>
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
<tr><th></th><th><strong>المعلمة</strong></th><th><strong>الوصف</strong></th><th><strong>نطاق القيمة</strong></th><th><strong>اقتراح الضبط</strong></th></tr>
</thead>
<tbody>
<tr><td>عامل التجميع</td><td><code translate="no">nlist</code></td><td>عدد المجموعات المراد إنشاؤها باستخدام خوارزمية k-means أثناء بناء الفهرس.</td><td><strong>النوع</strong>: عدد صحيح<br><strong>النطاق</strong>: [1, 65536]<br><strong>القيمة الافتراضية</strong>: <code translate="no">128</code></td><td>تعمل القيم الأكبر <code translate="no">nlist</code> على تحسين الاستدعاء من خلال إنشاء مجموعات أكثر دقة ولكنها تزيد من وقت بناء الفهرس. قم بالتحسين بناءً على حجم مجموعة البيانات والموارد المتاحة.<br>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [32, 4096].</td></tr>
<tr><td>PQ</td><td><code translate="no">m</code></td><td>عدد المتجهات الفرعية (المستخدمة في التكميم) لتقسيم كل متجه عالي الأبعاد إلى متجهات عالية الأبعاد أثناء عملية التكميم.</td><td><strong>النوع</strong>: عدد صحيح<br><strong>المدى</strong>: [1, 65536]<br><strong>القيمة الافتراضية</strong>: لا يوجد</td><td>يمكن للقيمة الأعلى <code translate="no">m</code> تحسين الدقة، لكنها تزيد أيضًا من التعقيد الحسابي واستخدام الذاكرة.<br><code translate="no">m</code> يجب أن يكون مقسومًا على البُعد المتجه<em>(D</em>) لضمان التحلل الصحيح. القيمة الموصى بها عادةً هي <em>m = D/2</em>.<br>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [D/8، D].</td></tr>
<tr><td></td><td><code translate="no">nbits</code></td><td>عدد البتات المستخدمة لتمثيل فهرس مركزية كل متجه فرعي في النموذج المضغوط. وهو يحدد مباشرةً حجم كل دفتر رموز، حيث سيحتوي كل دفتر رموز على 2^nbits centroids. على سبيل المثال، إذا تم تعيين <code translate="no">nbits</code> على 8، فسيتم تمثيل كل متجه فرعي بفهرس مركزية مكون من 8 بت. وهذا يسمح بوجود 2^8 (256) مركزيات ممكنة في دفتر الرموز لهذا المتجه الفرعي.</td><td><strong>النوع</strong>: عدد صحيح<br><strong>المدى</strong>: [1, 64]<br><strong>القيمة الافتراضية</strong>: <code translate="no">8</code></td><td>تسمح القيمة الأعلى <code translate="no">nbits</code> باستخدام دفاتر رموز أكبر، مما قد يؤدي إلى تمثيل أكثر دقة للمتجهات الأصلية. ومع ذلك، فهذا يعني أيضًا استخدام المزيد من البتات لتخزين كل فهرس، مما يؤدي إلى ضغط أقل.<br>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [1, 16].</td></tr>
</tbody>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">بارامترات البحث الخاصة بالفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="#Search-on-index">البحث في الفهرس</a>.</p>
<table>
<thead>
<tr><th></th><th><strong>المعلمة</strong></th><th><strong>الوصف</strong></th><th><strong>نطاق القيمة</strong></th><th><strong>اقتراح الضبط</strong></th></tr>
</thead>
<tbody>
<tr><td>عامل التهيئة</td><td><code translate="no">nprobe</code></td><td>عدد المجموعات للبحث عن المرشحين.</td><td><strong>النوع</strong>: عدد صحيح<br><strong>المدى</strong>: [1, <em>nlist</em>]<br><strong>القيمة الافتراضية</strong>: <code translate="no">8</code></td><td>تسمح القيم الأعلى بالبحث في المزيد من المجموعات، مما يحسن الاستدعاء من خلال توسيع نطاق البحث ولكن على حساب زيادة زمن وصول الاستعلام.<br>قم بتعيين <code translate="no">nprobe</code> بشكل متناسب مع <code translate="no">nlist</code> لتحقيق التوازن بين السرعة والدقة.<br>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [1, nlist].</td></tr>
</tbody>
</table>
