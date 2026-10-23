---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  يجمع HNSW_SQ بين الرسوم البيانية «العالم الصغير القابل للتنقل الهرمي» (HNSW)
  و«التكمية القياسية» (SQ)، مما ينتج عنه طريقة متقدمة للفهرسة المتجهة تتيح تحقيق
  توازن قابل للتحكم بين الحجم والدقة. وبالمقارنة مع HNSW القياسي، يحافظ هذا
  النوع من الفهارس على سرعة عالية في معالجة الاستعلامات مع زيادة طفيفة في وقت
  إنشاء الفهرس.
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
    </button></h1><p>يجمع<strong>HNSW_SQ</strong> بين الرسوم البيانية Hierarchical Navigable Small World (HNSW) والتكمية القياسية (SQ)، مما ينتج عنه طريقة متقدمة لفهرسة المتجهات توفر توازنًا قابلًا للتحكم بين الحجم والدقة. وبالمقارنة مع <a href="/docs/ar/hnsw.md">HNSW</a> القياسي، يحافظ هذا النوع من الفهارس على سرعة عالية في معالجة الاستعلامات مع زيادة طفيفة في وقت إنشاء الفهرس.</p>
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
    </button></h2><p>يجمع HNSW_SQ بين تقنيتين للفهرسة: <strong>HNSW</strong> للتنقل السريع القائم على الرسوم البيانية <strong>وSQ</strong> لضغط المتجهات بكفاءة.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>يقوم HNSW ببناء رسم بياني متعدد الطبقات حيث تتوافق كل عقدة مع متجه في مجموعة البيانات. في هذا الرسم البياني، يتم ربط العقد بناءً على تشابهها، مما يتيح التنقل السريع عبر مساحة البيانات. تسمح البنية الهرمية لخوارزمية البحث بتضييق نطاق الجيران المرشحين، مما يسرع عملية البحث بشكل كبير في المساحات عالية الأبعاد.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/hnsw.md">HNSW</a>.</p>
<h3 id="SQ" class="common-anchor-header">SQ<button data-href="#SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>SQ هي طريقة لضغط المتجهات من خلال تمثيلها بعدد أقل من البتات. على سبيل المثال:</p>
<ul>
<li><p>تستخدم<strong>SQ8</strong> 8 بتات، حيث تُخضع القيم لتعيين إلى 256 مستوى. لمزيد من المعلومات، راجع <a href="/docs/ar/ivf-sq8.md#SQ8">IVF_SQ8</a>.</p></li>
<li><p>تستخدم<strong>SQ6</strong> 6 بت لتمثيل كل قيمة عائمة، مما ينتج عنه 64 مستوى منفصلًا.</p></li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" /> 
   <span>Hnsw Sq</span>
  
 </span></p>
<p>يؤدي هذا التخفيض في الدقة إلى تقليل حجم الذاكرة بشكل كبير وتسريع عملية الحساب مع الحفاظ على البنية الأساسية للبيانات.</p>
<h3 id="SQ4U" class="common-anchor-header">SQ4U<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#SQ4U" class="anchor-icon" translate="no">
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
    </button></h3><p>بالنسبة للسيناريوهات التي تتطلب سرعة استعلام فائقة واستخدامًا أدنى للذاكرة، تقدم Milvus تقنية التكمية القياسية الموحدة ( <code translate="no">SQ4U</code> )، وهي عبارة عن تكمية قياسية موحدة ذات 4 بت. هذه طريقة قوية من التكمية القياسية التي تضغط قيمة العدد العائم لكل بُعد إلى عدد صحيح غير مُوقَّع <strong>مكون من 4 بت</strong>.</p>
<p>يشير الحرف «U» في SQ4U إلى «Uniform» (موحد). وعلى عكس التكمية القياسية غير الموحدة، التي تحسب عادةً القيم الدنيا والقصوى بشكل مستقل لكل بُعد (التكمية لكل بُعد)، فإن SQ4U تطبق استراتيجية <strong>التكمية الموحدة الشاملة</strong>:</p>
<ol>
<li><p><strong>الإحصائيات الشاملة</strong>: يحسب النظام قيمة دنيا <strong>واحدة</strong> <code translate="no">vmin</code> ونطاق قيم <strong>واحد</strong> <code translate="no">vdiff</code> ينطبقان على <strong>جميع أبعاد</strong> المتجه (أو مقطع المتجه بأكمله).</p></li>
<li><p><strong>التعيين الموحد</strong>: يُقسَّم نطاق القيم الشامل إلى 16 فترة متساوية. ويتم تعيين كل قيمة عائمة في المتجه، بغض النظر عن البعد الذي تنتمي إليه، إلى عدد صحيح مكون من 4 بتات (0–15) باستخدام هذه المعلمات المشتركة.</p></li>
</ol>
<p><strong>مزايا الأداء:</strong></p>
<ul>
<li><p><strong>نسبة ضغط تبلغ 8x:</strong> تقلل الحجم بمقدار 8x مقارنةً بـ <code translate="no">FP32</code> وبمقدار 2x مقارنةً بـ <code translate="no">SQ8</code> ، مما يقلل بشكل كبير من الضغط على عرض النطاق الترددي للذاكرة — الذي غالبًا ما يمثل عنق الزجاجة في البحث المتجهي.</p></li>
<li><p><strong>تحسين SIMD:</strong> تسمح البنية المدمجة للمعالجات الحديثة (AVX2/AVX-512) بمعالجة المزيد من الأبعاد في كل دورة. والأهم من ذلك، أن استخدام المعلمات العالمية يلغي الحاجة إلى تحميل قيم مقياس/إزاحة متفاوتة أثناء حساب المسافة، مما يحافظ على تشبع خط أنابيب التعليمات بالكامل.</p></li>
<li><p><strong>كفاءة ذاكرة التخزين المؤقت:</strong> تعني أحجام المتجهات الأصغر أن المزيد من البيانات تتسع في ذاكرة التخزين المؤقت لوحدة المعالجة المركزية، مما يقلل من زمن الاستجابة الناتج عن الوصول إلى الذاكرة.</p></li>
</ul>
<div class="alert note">
<p>نظرًا لمشاركة المعلمات العالمية، يُقدم SQ4U أفضل أداءً على البيانات المعيارية أو مجموعات البيانات ذات التوزيعات القيمية المتسقة عبر الأبعاد.</p>
</div>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ<button data-href="#HNSW-+-SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>يجمع HNSW_SQ بين نقاط القوة في HNSW وSQ لتمكين البحث التقريبي الفعال عن أقرب جار. وإليك كيفية عمل هذه العملية:</p>
<ol>
<li><p><strong>ضغط البيانات:</strong> يقوم SQ بضغط المتجهات باستخدام خيار " <code translate="no">sq_type</code> " (على سبيل المثال، SQ6 أو SQ8)، مما يقلل من استخدام الذاكرة. قد يؤدي هذا الضغط إلى انخفاض الدقة، لكنه يسمح للنظام بمعالجة مجموعات بيانات أكبر.</p></li>
<li><p><strong>بناء الرسم البياني:</strong> تُستخدم المتجهات المضغوطة لبناء رسم بياني HNSW. ونظرًا لأن البيانات مضغوطة، فإن الرسم البياني الناتج يكون أصغر حجمًا وأسرع في البحث.</p></li>
<li><p><strong>استرجاع المرشحين:</strong> عند تقديم متجه استعلام، تستخدم الخوارزمية البيانات المضغوطة لتحديد مجموعة من الجيران المرشحين بسرعة من مخطط HNSW.</p></li>
<li><p><strong>(اختياري) تحسين النتائج:</strong> يمكن تحسين النتائج المرشحة الأولية للحصول على دقة أفضل، بناءً على المعلمات التالية:</p>
<ul>
<li><p><code translate="no">refine</code>: يتحكم في تفعيل خطوة التحسين هذه أم لا. عند ضبطه على « <code translate="no">true</code> » (دقة عالية)، يعيد النظام حساب المسافات باستخدام تمثيلات عالية الدقة أو غير مضغوطة.</p></li>
<li><p><code translate="no">refine_type</code>: يحدد مستوى دقة البيانات المستخدمة أثناء التحسين (على سبيل المثال، SQ6، SQ8، BF16). يمكن أن يؤدي اختيار دقة أعلى مثل « <code translate="no">FP32</code> » إلى نتائج أكثر دقة، ولكنه يتطلب ذاكرة أكبر. ويجب أن تتجاوز هذه الدقة دقة مجموعة البيانات المضغوطة الأصلية المحددة بواسطة « <code translate="no">sq_type</code> ».</p></li>
<li><p><code translate="no">refine_k</code>: يعمل كعامل تكبير. على سبيل المثال، إذا كان عدد <em>k</em> الأعلى هو 100 و <code translate="no">refine_k</code> هو 2، فإن النظام يعيد ترتيب أفضل 200 مرشح ويعرض أفضل 100 منهم، مما يعزز الدقة الإجمالية.</p></li>
</ul></li>
</ol>
<p>للحصول على قائمة كاملة بالمعلمات والقيم الصالحة، راجع <a href="/docs/ar/hnsw-sq.md#Index-params">معلمات الفهرس</a>.</p>
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
    </button></h2><p>لبناء فهرس " <code translate="no">HNSW_SQ</code> " على حقل متجه في Milvus، استخدم طريقة " <code translate="no">add_index()</code> "، مع تحديد " <code translate="no">index_type</code>" و" <code translate="no">metric_type</code>" والمعلمات الإضافية للفهرس.</p>
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
<p>في هذا التكوين:</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. في هذا المثال، اضبط القيمة على <code translate="no">HNSW_SQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: الطريقة المستخدمة لحساب المسافة بين المتجهات. تشمل القيم المدعومة <code translate="no">COSINE</code> و <code translate="no">L2</code> و <code translate="no">IP</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p></li>
<li><p><code translate="no">params</code>: خيارات تكوين إضافية لإنشاء الفهرس. لمزيد من التفاصيل، راجع <a href="/docs/ar/hnsw-sq.md#Index-building-params">معلمات إنشاء الفهرس</a>.</p></li>
</ul>
<p>بمجرد تكوين معلمات الفهرس، يمكنك إنشاء الفهرس باستخدام الطريقة <code translate="no">create_index()</code> مباشرةً أو بتمرير معلمات الفهرس في الطريقة <code translate="no">create_collection</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/create-collection.md">إنشاء مجموعة</a>.</p>
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
    </button></h2><p>بمجرد إنشاء الفهرس وإدراج الكيانات، يمكنك إجراء عمليات بحث عن التشابه في الفهرس.</p>
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
<p>في هذا التكوين:</p>
<ul>
<li><code translate="no">params</code>: خيارات تكوين إضافية للبحث في الفهرس. لمزيد من التفاصيل، راجع <a href="/docs/ar/hnsw-sq.md#Index-specific-search-params">معلمات البحث الخاصة بالفهرس</a>.</li>
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
    </button></h2><p>يقدم هذا القسم نظرة عامة على المعلمات المستخدمة لإنشاء الفهرس وإجراء عمليات البحث فيه.</p>
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
    </button></h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">params</code> عند <a href="/docs/ar/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">إنشاء فهرس</a>.</p>
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
     <td><p>العدد الأقصى للوصلات (أو الحواف) التي يمكن أن تحتوي عليها كل عقدة في الرسم البياني، بما في ذلك الحواف الصادرة والواردة.</p><p>يؤثر هذا المعامل بشكل مباشر على كل من بناء الفهرس وعملية البحث.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح</p><p><strong>النطاق</strong>: [2، 2048]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">30</code> (ما يصل إلى 30 حافة صادرة و30 حافة واردة لكل عقدة)</p></td>
     <td><p>عادةً ما يؤدي زيادة القيمة <code translate="no">M</code> إلى <strong>دقة أعلى،</strong> ولكنه <strong>يزيد من استهلاك الذاكرة</strong> <strong>ويبطئ كل من عملية إنشاء الفهرس وعملية البحث</strong>.</p><p>فكر في زيادة <code translate="no">M</code> لمجموعات البيانات ذات الأبعاد العالية أو عندما يكون الاسترجاع العالي أمرًا بالغ الأهمية.</p><p>فكر في تقليل قيمة <code translate="no">M</code> عندما يكون استهلاك الذاكرة وسرعة البحث من الأولويات الرئيسية.</p><p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [5، 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>عدد الجيران المرشحين الذين يتم أخذهم في الاعتبار للاتصال أثناء إنشاء الفهرس.</p><p>يتم تقييم مجموعة أكبر من المرشحين لكل عنصر جديد، لكن العدد الأقصى للوصلات التي يتم إنشاؤها فعليًا لا يزال محدودًا بقيمة <code translate="no">M</code>.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح</p><p><strong>النطاق</strong>: [1، <em>int_max</em>]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">360</code></p></td>
     <td><p>عادةً ما يؤدي ارتفاع قيمة <code translate="no">efConstruction</code> إلى <strong>فهرس أكثر دقة</strong>، حيث يتم استكشاف المزيد من الوصلات المحتملة. ومع ذلك، يؤدي هذا أيضًا إلى <strong>إطالة وقت الفهرسة وزيادة استخدام الذاكرة</strong> أثناء الإنشاء.</p><p>فكر في زيادة قيمة <code translate="no">efConstruction</code> لتحسين الدقة، خاصة في السيناريوهات التي لا يكون فيها وقت الفهرسة عاملاً حاسماً.</p><p>فكر في تقليل قيمة <code translate="no">efConstruction</code> لتسريع عملية إنشاء الفهرس عندما تكون قيود الموارد مصدر قلق.</p><p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [50، 500].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>يحدد طريقة التكمية القياسية لضغط المتجهات. يوفر كل خيار توازنًا مختلفًا بين الضغط والدقة:</p><ul><li><p><code translate="no">SQ4U</code>: يقوم بترميز المتجهات باستخدام التكمية الموحدة ذات 4 بت. يوفر هذا الوضع أعلى سرعة وأعلى درجة من الضغط.</p></li><li><p><code translate="no">SQ6</code>: يقوم بترميز المتجهات باستخدام أعداد صحيحة ذات 6 بت.</p></li><li><p><code translate="no">SQ8</code>: يقوم بترميز المتجهات باستخدام أعداد صحيحة ذات 8 بت.</p></li><li><p><code translate="no">BF16</code>: يستخدم تنسيق Bfloat16.</p></li><li><p><code translate="no">FP16</code>: يستخدم تنسيق العدد العائم القياسي ذي 16 بت.</p></li></ul></td>
     <td><p><strong>النوع</strong>: سلسلة</p><p><strong>النطاق</strong>: [ <code translate="no">SQ4U</code> ، <code translate="no">SQ6</code> ، <code translate="no">SQ8</code> ، <code translate="no">BF16</code> ، <code translate="no">FP16</code> ]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">SQ8</code></p></td>
     <td><p>يعتمد اختيار <code translate="no">sq_type</code> على احتياجات التطبيق المحددة. يتم اختيار <code translate="no">SQ4U</code> لتحقيق أقصى سرعة وكفاءة في استخدام الذاكرة. قد يكون <code translate="no">SQ6</code> أو <code translate="no">SQ8</code> مناسبين لتحقيق أداء متوازن. من ناحية أخرى، إذا كانت الدقة هي الأولوية القصوى، فقد يُفضل استخدام <code translate="no">BF16</code> أو <code translate="no">FP16</code>.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>علامة منطقية تتحكم في ما إذا كانت خطوة التحسين ستُطبق أثناء البحث. يتضمن التحسين إعادة ترتيب النتائج الأولية عن طريق حساب المسافات الدقيقة بين متجه الاستعلام والمرشحين.</p></td>
     <td><p><strong>النوع</strong>: منطقية</p><p><strong>النطاق</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">false</code></p></td>
     <td><p>اضبطه على <code translate="no">true</code> إذا كانت الدقة العالية ضرورية ويمكنك تحمل أوقات بحث أبطأ قليلاً. استخدم <code translate="no">false</code> إذا كانت السرعة أولوية وكان التنازل الطفيف في الدقة مقبولاً.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>يحدد دقة البيانات المستخدمة في عملية التحسين.</p><p>يجب أن تكون هذه الدقة أعلى من دقة المتجهات المضغوطة (كما هو محدد بواسطة <code translate="no">sq_type</code>)، مما يؤثر على كل من دقة المتجهات المعاد ترتيبها وحجم الذاكرة التي تشغلها.</p></td>
     <td><p><strong>النوع</strong>: سلسلة</p><p><strong>النطاق</strong>: [ <code translate="no">SQ6</code> ، <code translate="no">SQ8</code> ، <code translate="no">BF16</code> ، <code translate="no">FP16</code> ، <code translate="no">FP32</code> ]</p><p><strong>القيمة الافتراضية</strong>: لا شيء</p></td>
     <td><p>استخدم <code translate="no">FP32</code> للحصول على أقصى دقة بتكلفة ذاكرة أعلى، أو <code translate="no">SQ6</code>/<code translate="no">SQ8</code> للحصول على ضغط أفضل. يوفر <code translate="no">BF16</code> و <code translate="no">FP16</code> بديلاً متوازناً.</p></td>
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
    </button></h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="/docs/ar/hnsw-sq.md#Search-on-index">البحث في الفهرس</a>. يمكن لإعدادات الخادم تجاوز الإعدادات الافتراضية للمعلمات التي تحذفها.</p>
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
     <td><p>يتحكم في نطاق البحث أثناء استرجاع أقرب الجيران. ويحدد عدد العقد التي يتم زيارتها وتقييمها كأقرب جيران محتملين. </p><p>يؤثر هذا المعامل على عملية البحث فقط ويُطبق حصريًا على الطبقة السفلية من الرسم البياني.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح</p><p><strong>النطاق</strong>: [1، <em>int_max</em>]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">max(limit, 16)</code> للبحث العادي باستخدام طريقة kNN؛ <code translate="no">512</code> للبحث النطاقي.</p><p>بالنسبة للبحث العادي باستخدام kNN، يجب أن تكون القيمة الصريحة لـ <code translate="no">ef</code> أكبر من أو تساوي <code translate="no">limit</code> (عدد أقرب الجيران المطلوب إرجاعهم).</p></td>
     <td><p>عادةً ما يؤدي استخدام قيمة <code translate="no">ef</code> أكبر إلى <strong>دقة بحث أعلى</strong> ، حيث يتم أخذ المزيد من الجيران المحتملين في الاعتبار. ومع ذلك، <strong>يؤدي</strong> هذا أيضًا <strong>إلى زيادة وقت البحث</strong>.</p><p>فكر في زيادة <code translate="no">ef</code> عندما يكون تحقيق استرجاع عالٍ أمرًا بالغ الأهمية ولا تكون سرعة البحث مصدر قلق كبير.</p><p>فكر في تقليل قيمة <code translate="no">ef</code> لإعطاء الأولوية لعمليات البحث الأسرع، خاصة في الحالات التي يكون فيها انخفاض طفيف في الدقة مقبولًا.</p><p>في معظم الحالات، نوصيك بتعيين قيمة ضمن هذا النطاق: [K، 10K].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>عامل التكبير الذي يتحكم في عدد المرشحين الإضافيين الذين يتم فحصهم خلال مرحلة التحسين، مقارنةً بأفضل K نتائج مطلوبة.</p></td>
     <td><p><strong>النوع</strong>: عدد عائم</p><p><strong>النطاق</strong>: [1، <em>float_max</em>)</p><p><strong>القيمة الافتراضية</strong>: 1</p></td>
     <td><p>يمكن أن تؤدي القيم الأعلى لـ <code translate="no">refine_k</code> إلى تحسين معدل الاسترجاع والدقة، ولكنها ستؤدي أيضًا إلى زيادة وقت البحث واستهلاك الموارد. تعني القيمة 1 أن عملية التحسين تأخذ في الاعتبار النتائج K الأولى فقط.</p></td>
   </tr>
</table>
