---
id: hnsw-prq.md
title: HNSW_PRQ
summary: >-
  تستفيد تقنية HNSW_PRQ من الرسوم البيانية «العالم الصغير القابل للتنقل الهرمي»
  (HNSW) مع «تكمية البقايا المنتجية» (PRQ)، لتقدم طريقة متقدمة للفهرسة المتجهة
  تتيح لك ضبط التوازن بدقة بين حجم الفهرس ودقته. تتجاوز تقنية PRQ تقنية التكمية
  المنتجية (PQ) التقليدية من خلال إدخال خطوة التكمية المتبقية (RQ) لالتقاط
  معلومات إضافية، مما يؤدي إلى دقة أعلى أو فهارس أكثر إيجازًا مقارنةً بالطرق
  القائمة على تقنية PQ وحدها. ومع ذلك، قد تؤدي الخطوات الإضافية إلى زيادة العبء
  الحسابي أثناء إنشاء الفهرس والبحث فيه.
---
<h1 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ<button data-href="#HNSWPRQ" class="anchor-icon" translate="no">
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
    </button></h1><p>يستفيد<strong>HNSW_PRQ</strong> من الرسوم البيانية Hierarchical Navigable Small World (HNSW) مع تقنية Product Residual Quantization (PRQ)، مما يوفر طريقة متقدمة لفهرسة المتجهات تتيح لك ضبط التوازن بدقة بين حجم الفهرس ودقته. تتجاوز تقنية PRQ تقنية التكمية المنتجية (PQ) التقليدية من خلال إدخال خطوة التكمية المتبقية (RQ) لالتقاط معلومات إضافية، مما يؤدي إلى دقة أعلى أو فهارس أكثر إيجازًا مقارنةً بالطرق القائمة على تقنية PQ وحدها. ومع ذلك، قد تؤدي الخطوات الإضافية إلى زيادة العبء الحسابي أثناء إنشاء الفهرس والبحث فيه.</p>
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
    </button></h2><p>يجمع HNSW_PRQ بين تقنيتين للفهرسة: <strong>HSNW</strong> للتنقل السريع القائم على الرسوم البيانية <strong>وPRQ</strong> لضغط المتجهات بكفاءة.</p>
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
    </button></h3><p>يقوم HNSW ببناء رسم بياني متعدد الطبقات حيث تتوافق كل عقدة مع متجه في مجموعة البيانات. في هذا الرسم البياني، يتم ربط العقد بناءً على تشابهها، مما يتيح التنقل السريع عبر مساحة البيانات. تسمح البنية الهرمية لخوارزمية البحث بتضييق نطاق الجيران المرشحين، مما يؤدي إلى تسريع عملية البحث بشكل كبير في المساحات عالية الأبعاد.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/hnsw.md">HNSW</a>.</p>
<h3 id="PRQ" class="common-anchor-header">PRQ<button data-href="#PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PRQ هي طريقة ضغط متجهات متعددة المراحل تجمع بين تقنيتين متكاملتين: PQ و RQ. من خلال تقسيم متجه عالي الأبعاد أولاً إلى متجهات فرعية أصغر (عبر PQ) ثم تكمية أي فرق متبقي (عبر RQ)، تحقق PRQ تمثيلاً مضغوطًا ودقيقًا في الوقت نفسه للبيانات الأصلية.</p>
<p>يوضح الشكل التالي كيفية عملها.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-prq.png" alt="Hnsw Prq" class="doc-image" id="hnsw-prq" /> 
   <span>Hnsw Prq</span>
  
 </span></p>
<ol>
<li><p><strong>تكمية المنتج (PQ)</strong></p>
<p>في هذه المرحلة، يتم تقسيم المتجه الأصلي إلى متجهات فرعية أصغر، ويتم تعيين كل متجه فرعي إلى أقرب مركز له في دفتر الترميز المُتعلم. يقلل هذا التعيين من حجم البيانات بشكل كبير، لكنه يؤدي إلى بعض أخطاء التقريب، حيث يتم تقريب كل متجه فرعي بواسطة مركز واحد. لمزيد من التفاصيل، راجع <a href="/docs/ar/ivf-pq.md#PQ">IVF_PQ</a>.</p></li>
<li><p><strong>تكمية المتبقي (RQ)</strong></p>
<p>بعد مرحلة PQ، تقوم RQ بتكمية المتبقي — وهو الفرق بين المتجه الأصلي والتقريب المستند إلى PQ — باستخدام دفاتر ترميز إضافية. ونظرًا لأن هذا المتبقي عادةً ما يكون أصغر بكثير، فيمكن ترميزه بدقة أكبر دون زيادة كبيرة في سعة التخزين.</p>
<p>تحدد المعلمة « <code translate="no">nrq</code> » عدد المرات التي يتم فيها تكمية هذا المتبقي بشكل تكراري، مما يتيح لك ضبط التوازن بين كفاءة الضغط والدقة.</p></li>
<li><p><strong>تمثيل الضغط النهائي</strong></p>
<p>بمجرد أن تنتهي RQ من تكمية الباقي، يتم دمج الرموز الصحيحة من كل من PQ وRQ في فهرس مضغوط واحد. من خلال التقاط التفاصيل الدقيقة التي قد تفوت PQ وحدها، تعزز RQ الدقة دون التسبب في زيادة كبيرة في مساحة التخزين. هذا التآزر بين PQ وRQ هو ما يميز PRQ.</p></li>
</ol>
<h3 id="HNSW-+-PRQ" class="common-anchor-header">HNSW + PRQ<button data-href="#HNSW-+-PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>من خلال دمج HNSW مع PRQ، يحتفظ <strong>HNSW_PRQ</strong> بالبحث السريع القائم على الرسوم البيانية الخاص بـ HNSW مع الاستفادة من الضغط متعدد المراحل لـ PRQ. يبدو سير العمل كما يلي:</p>
<ol>
<li><p><strong>ضغط البيانات:</strong> يتم أولًا تحويل كل متجه عبر PQ إلى تمثيل تقريبي، ثم يتم تكمية القيم المتبقية عبر RQ لمزيد من التحسين. والنتيجة هي مجموعة من الرموز المدمجة التي تمثل كل متجه.</p></li>
<li><p><strong>بناء الرسم البياني:</strong> تشكل المتجهات المضغوطة (بما في ذلك رموز PQ وRQ) الأساس لبناء الرسم البياني لـ HNSW. ونظرًا لتخزين البيانات في شكل مضغوط، فإن الرسم البياني يتطلب ذاكرة أقل، ويتم تسريع التنقل خلاله.</p></li>
<li><p><strong>استرجاع المرشحين:</strong> أثناء البحث، يستخدم HNSW التمثيلات المضغوطة لاجتياز الرسم البياني واسترجاع مجموعة من المرشحين. وهذا يقلل بشكل كبير من عدد المتجهات التي تحتاج إلى النظر فيها.</p></li>
<li><p><strong>(اختياري) تحسين النتائج:</strong> يمكن تحسين النتائج المرشحة الأولية للحصول على دقة أفضل، بناءً على المعلمات التالية:</p>
<ul>
<li><p><code translate="no">refine</code>: يتحكم في تفعيل خطوة التحسين هذه أم لا. عند ضبطه على « <code translate="no">true</code> » (التحسين)، يعيد النظام حساب المسافات باستخدام تمثيلات عالية الدقة أو غير مضغوطة.</p></li>
<li><p><code translate="no">refine_type</code>: يحدد مستوى دقة البيانات المستخدمة أثناء التحسين (على سبيل المثال، SQ6، SQ8، BF16). يمكن أن يؤدي اختيار دقة أعلى مثل « <code translate="no">FP32</code> » إلى نتائج أكثر دقة، لكنه يتطلب ذاكرة أكبر. ويجب أن تتجاوز هذه الدقة دقة مجموعة البيانات المضغوطة الأصلية المحددة بواسطة « <code translate="no">sq_type</code> ».</p></li>
<li><p><code translate="no">refine_k</code>: يعمل كعامل تكبير. على سبيل المثال، إذا كان عدد <em>k</em> الأعلى هو 100 و <code translate="no">refine_k</code> هو 2، فإن النظام يعيد ترتيب أفضل 200 مرشح ويعرض أفضل 100 منهم، مما يعزز الدقة الإجمالية.</p></li>
</ul></li>
</ol>
<p>للحصول على قائمة كاملة بالمعلمات والقيم الصالحة، راجع <a href="/docs/ar/hnsw-prq.md#Index-params">معلمات الفهرس</a>.</p>
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
    </button></h2><p>لبناء فهرس " <code translate="no">HNSW_PRQ</code> " على حقل متجه في Milvus، استخدم طريقة " <code translate="no">add_index()</code> "، مع تحديد " <code translate="no">index_type</code>" و" <code translate="no">metric_type</code>" والمعلمات الإضافية للفهرس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PRQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;nrq&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين:</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. في هذا المثال، اضبط القيمة على <code translate="no">HNSW_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: الطريقة المستخدمة لحساب المسافة بين المتجهات. تشمل القيم المدعومة <code translate="no">COSINE</code> و <code translate="no">L2</code> و <code translate="no">IP</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p></li>
<li><p><code translate="no">params</code>: خيارات تكوين إضافية لإنشاء الفهرس. لمزيد من التفاصيل، راجع <a href="/docs/ar/hnsw-prq.md#Index-building-params">معلمات إنشاء الفهرس</a>.</p></li>
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
<li><code translate="no">params</code>: خيارات تكوين إضافية للبحث في الفهرس. لمزيد من التفاصيل، راجع <a href="/docs/ar/hnsw-prq.md#Index-specific-search-params">معلمات البحث الخاصة بالفهرس</a>.</li>
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
    </button></h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">params</code> عند <a href="/docs/ar/hnsw-prq.md#Build-index">إنشاء فهرس</a>.</p>
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
     <td><p>العدد الأقصى للوصلات (أو الحواف) التي يمكن أن تحتوي عليها كل عقدة في الرسم البياني، بما في ذلك الحواف الصادرة والواردة.
يؤثر هذا المعامل بشكل مباشر على كل من بناء الفهرس وعملية البحث.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح
 <strong>النطاق</strong>: [2، 2048]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">30</code> (ما يصل إلى 30 حافة صادرة و30 حافة واردة لكل عقدة)</p></td>
     <td><p>عادةً ما يؤدي ارتفاع قيمة <code translate="no">M</code> إلى <strong>دقة أعلى</strong> ، لكنه <strong>يزيد من استهلاك الذاكرة</strong> <strong>ويبطئ كل من عملية بناء الفهرس وعملية البحث</strong>.
ضع في اعتبارك زيادة <code translate="no">M</code> لمجموعات البيانات ذات الأبعاد العالية أو عندما يكون معدل الاسترجاع العالي أمرًا بالغ الأهمية.</p>
<p>فكر في تقليل قيمة <code translate="no">M</code> عندما يكون استهلاك الذاكرة وسرعة البحث من الأولويات الرئيسية.</p>
<p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [5، 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>عدد الجيران المرشحين الذين يتم أخذهم في الاعتبار للاتصال أثناء إنشاء الفهرس.
يتم تقييم مجموعة أكبر من المرشحين لكل عنصر جديد، لكن العدد الأقصى للاتصالات التي يتم إنشاؤها فعليًّا لا يزال محدودًا بقيمة <code translate="no">M</code>.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح
 <strong>النطاق</strong>: [1, <em>int_max</em>]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">360</code></p></td>
     <td><p>عادةً ما يؤدي ارتفاع قيمة <code translate="no">efConstruction</code> إلى <strong>فهرس أكثر دقة</strong>، حيث يتم استكشاف المزيد من الوصلات المحتملة. ومع ذلك، يؤدي هذا أيضًا إلى <strong>إطالة وقت الفهرسة وزيادة استخدام الذاكرة</strong> أثناء الإنشاء.
ضع في اعتبارك زيادة قيمة <code translate="no">efConstruction</code> لتحسين الدقة، خاصةً في السيناريوهات التي لا يكون فيها وقت الفهرسة عاملاً حاسماً.</p>
<p>فكر في تقليل قيمة <code translate="no">efConstruction</code> لتسريع عملية إنشاء الفهرس عندما تكون قيود الموارد مصدر قلق.</p>
<p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [50، 500].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>عدد المتجهات الفرعية (المستخدمة في التكمية) التي يُقسَّم إليها كل متجه عالي الأبعاد أثناء عملية التكمية.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح
 <strong>النطاق</strong>: [1، 65536]</p>
<p><strong>القيمة الافتراضية</strong>: لا شيء</p></td>
     <td><p>يمكن أن تؤدي قيمة <code translate="no">m</code> الأعلى إلى تحسين الدقة، ولكنها تزيد أيضًا من التعقيد الحسابي واستخدام الذاكرة.
يجب أن يكون <code translate="no">m</code> قاسمًا لبُعد المتجه (<em>D</em>) لضمان التحليل الصحيح. القيمة الموصى بها عادةً هي <em>m = D/2</em>.</p>
<p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [D/8، D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>عدد البتات المستخدمة لتمثيل مؤشر مركز كل متجه فرعي في الشكل المضغوط. وهو يحدد بشكل مباشر حجم كل دفتر تشفير.
 سيحتوي كل دفتر رموز على<sup>2n بت من</sup> مراكز الثقل. على سبيل المثال، إذا تم تعيين <code translate="no">nbits</code> على 8، فسيتم تمثيل كل متجه فرعي بفهرس مركز ثقل مكون من 8 بت. وهذا يسمح بوجود<sup>2⁸</sup> (256) مركز ثقل محتمل في دفتر الرموز لذلك المتجه الفرعي.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح
 <strong>النطاق</strong>: [1، 24]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">8</code></p></td>
     <td><p>تسمح قيمة <code translate="no">nbits</code> الأعلى بإنشاء دفاتر ترميز أكبر، مما قد يؤدي إلى تمثيلات أكثر دقة للمتجهات الأصلية. ومع ذلك، فإن هذا يعني أيضًا استخدام المزيد من البتات لتخزين كل مؤشر، مما يؤدي إلى انخفاض معدل الضغط.
في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [1، 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nrq</code></p></td>
     <td><p>يتحكم في عدد أجهزة التكمية الفرعية المتبقية المستخدمة في مرحلة RQ. قد يؤدي استخدام المزيد من أجهزة التكمية الفرعية إلى تحقيق ضغط أكبر، ولكنه قد يؤدي أيضًا إلى فقدان المزيد من المعلومات.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح
 <strong>النطاق</strong>: [1، 16]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">2</code></p></td>
     <td><p>تسمح القيمة الأعلى لـ « <code translate="no">nrq</code> » بإجراء خطوات إضافية من التكمية الفرعية المتبقية، مما قد يؤدي إلى إعادة بناء أكثر دقة للمتجهات الأصلية. ومع ذلك، فإن هذا يعني أيضًا تخزين وحساب المزيد من أجهزة التكمية الفرعية، مما يؤدي إلى حجم فهرس أكبر وعبء حسابي أكبر.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>علامة منطقية تتحكم في ما إذا كانت خطوة التحسين تُطبق أثناء البحث. يتضمن التحسين إعادة ترتيب النتائج الأولية عن طريق حساب المسافات الدقيقة بين متجه الاستعلام والمرشحين.</p></td>
     <td><p><strong>النوع</strong>: منطقية
 <strong>النطاق</strong>: [<code translate="no">true</code> ، <code translate="no">false</code>]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">false</code></p></td>
     <td><p>اضبطه على <code translate="no">true</code> إذا كانت الدقة العالية ضرورية ويمكنك تحمل أوقات بحث أبطأ قليلاً. استخدم <code translate="no">false</code> إذا كانت السرعة أولوية وكان التنازل الطفيف في الدقة مقبولاً.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>يحدد دقة البيانات المستخدمة أثناء عملية التحسين.
 يجب أن تكون هذه الدقة أعلى من دقة المتجهات المضغوطة (كما هو محدد بواسطة المعلمتين <code translate="no">m</code> و <code translate="no">nbits</code> ).</p></td>
     <td><p><strong>النوع</strong>: سلسلة
 <strong>النطاق</strong>: [ <code translate="no">SQ6</code> ، <code translate="no">SQ8</code> ، <code translate="no">BF16</code> ، <code translate="no">FP16</code> ، <code translate="no">FP32</code> ]</p>
<p><strong>القيمة الافتراضية</strong>: لا شيء</p></td>
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
    </button></h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="/docs/ar/hnsw-prq.md#Search-on-index">البحث في الفهرس</a>.</p>
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
     <td><p>يتحكم في نطاق البحث أثناء استرجاع أقرب الجيران. ويحدد عدد العقد التي يتم زيارتها وتقييمها كأقرب جيران محتملين. 
 تؤثر هذه المعلمة على عملية البحث فقط وتطبق حصريًا على الطبقة السفلية من الرسم البياني.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح
 <strong>النطاق</strong>: [1, <em>int_max</em>]</p>
<p><strong>القيمة الافتراضية</strong>: <em>limit</em> (أقرب جيران TopK المطلوب إرجاعهم)</p></td>
     <td><p>عادةً ما يؤدي زيادة القيمة <code translate="no">ef</code> إلى <strong>دقة بحث أعلى</strong> ، حيث يتم أخذ المزيد من الجيران المحتملين في الاعتبار. ومع ذلك، <strong>فإن</strong> هذا <strong>يؤدي</strong> أيضًا <strong>إلى زيادة وقت البحث</strong>.
 فكر في زيادة القيمة <code translate="no">ef</code> عندما يكون تحقيق نسبة استرجاع عالية أمرًا بالغ الأهمية، ولا تمثل سرعة البحث مصدر قلق كبير.</p>
<p>فكر في تقليل <code translate="no">ef</code> لإعطاء الأولوية لعمليات البحث الأسرع، خاصة في الحالات التي يكون فيها انخفاض طفيف في الدقة مقبولًا.</p>
<p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [K، 10K].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>عامل التكبير الذي يتحكم في عدد المرشحين الإضافيين الذين يتم فحصهم خلال مرحلة التحسين (إعادة الترتيب)، بالنسبة إلى النتائج K الأولى المطلوبة.</p></td>
     <td><p><strong>النوع</strong>: عدد عائم
 <strong>النطاق</strong>: [1, <em>float_max</em>)</p>
<p><strong>القيمة الافتراضية</strong>: 1</p></td>
     <td><p>يمكن أن تؤدي القيم الأعلى لـ <code translate="no">refine_k</code> إلى تحسين معدل الاسترجاع والدقة، ولكنها ستؤدي أيضًا إلى زيادة وقت البحث واستهلاك الموارد. تعني القيمة 1 أن عملية التحسين تأخذ في الاعتبار النتائج K الأولى فقط.</p></td>
   </tr>
</table>
