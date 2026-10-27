---
id: ivf-rabitq-fastscan.md
title: IVF_RABITQ_FASTSCANCompatible with Milvus 3.0.x
summary: >-
  يجمع IVF_RABITQ_FASTSCAN بين تقنية IVF وتكمية RaBitQ الثنائية والمسح الدفعي
  SIMD لتوفير بحث متجهي يتسم بكفاءة في استخدام الذاكرة وإنتاجية عالية.
beta: Milvus 3.0.x
---
<h1 id="IVFRABITQFASTSCAN" class="common-anchor-header">IVF_RABITQ_FASTSCAN<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#IVFRABITQFASTSCAN" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">IVF_RABITQ_FASTSCAN</code> يجمع بين تقسيم IVF، والتكمية الثنائية RaBitQ، والمعالجة الدفعية FastScan. ويقوم بتخزين رموز RaBitQ ذات البت الواحد لمتجهات قاعدة البيانات، ويعالج الرموز في كتل ملائمة لـ SIMD تتكون من 32 متجهًا لقاعدة البيانات. وهذا يجعله خيارًا جيدًا لأحمال العمل عالية الإنتاجية والمقيدة بالذاكرة والتي يمكنها قبول النتائج التقريبية.</p>
<p>اختر « <code translate="no">IVF_RABITQ_FASTSCAN</code> » بدلاً من <a href="/docs/ar/ivf-rabitq.md">«IVF_RABITQ»</a> عندما تقوم عمليات البحث بمسح العديد من المرشحين ويكون الإنتاجية هي الهدف الأساسي. يتم توزيع تكلفة إعداد FastScan لكل استعلام على كتل الرموز المعبأة، لذا فهي عادةً ما تكون أكثر فائدة لمجموعات البيانات الكبيرة أو قوائم IVF الطويلة. بالنسبة للمجموعات الصغيرة أو عمليات البحث التي تفحص عددًا قليلاً من المرشحين، استخدم <code translate="no">IVF_RABITQ</code> بدلاً من ذلك. كما أنه يدعم تكمية الاستعلام القابلة للتكوين، والمزيد من أنواع التحسين، والمكررات.</p>
<h2 id="How-it-works" class="common-anchor-header">كيف يعمل<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">IVF_RABITQ_FASTSCAN</code> يستخدم المراحل التالية:</p>
<ol>
<li><strong>تقسيم IVF</strong>: يقوم IVF بتجميع المتجهات في مجموعات <code translate="no">nlist</code> ويبحث في المجموعات الأقرب في <code translate="no">nprobe</code>.</li>
<li><strong>ترميز RaBitQ</strong>: يتم ترميز كل بقايا متجه كرمز RaBitQ بمعدل بت واحد لكل بُعد.</li>
<li><strong>FastScan</strong>: يقوم الفهرس بتجميع الرموز من أجل معالجة دفعية SIMD ملائمة للذاكرة المؤقتة. ويقوم بتقييم 32 متجهًا من قاعدة البيانات في كل دفعة.</li>
<li><strong>التحسين الاختياري</strong>: عند تمكين هذه الميزة، يقوم مُحسّن FP32 بإعادة تقييم المرشحين قبل أن يعرض Milvus النتائج النهائية.</li>
</ol>
<p>فهرس Faiss الأساسي هو <code translate="no">IndexIVFRaBitQFastScan</code>. يقوم Knowhere بتغليفه بتحويل دوران عشوائي ويضيف أداة تحسين FP32 بشكل اختياري.</p>
<p>يقوم FastScan بأعمال الإعداد لكل استعلام، مثل إنشاء وتكمية جداول البحث المتعلقة بالاستعلام، قبل مسح كتل الكود المعبأة. قم بإجراء اختبار أداء لكل من <code translate="no">IVF_RABITQ</code> و <code translate="no">IVF_RABITQ_FASTSCAN</code> باستخدام بياناتك ومعلمات البحث الخاصة بك.</p>
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
    </button></h2><p>لبناء فهرس <code translate="no">IVF_RABITQ_FASTSCAN</code> على حقل متجه في Milvus، استخدم طريقة <code translate="no">add_index()</code> ، مع تحديد <code translate="no">index_type</code> و <code translate="no">metric_type</code> والمعلمات الإضافية للفهرس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_RABITQ_FASTSCAN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
<span class="highlighted-wrapper-line">    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span></span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>, <span class="hljs-comment"># Number of clusters for the index</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Enable refinement for higher recall</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;FP32&quot;</span> <span class="hljs-comment"># Refinement data format</span></span>
<span class="highlighted-comment-line">    } <span class="hljs-comment"># Index building params</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين:</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. في هذا المثال، اضبط القيمة على <code translate="no">IVF_RABITQ_FASTSCAN</code>.</p></li>
<li><p><code translate="no">metric_type</code>: الطريقة المستخدمة لحساب المسافة بين المتجهات. تشمل القيم المدعومة <code translate="no">COSINE</code> و <code translate="no">L2</code> و <code translate="no">IP</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p></li>
<li><p><code translate="no">params</code>: خيارات تكوين إضافية لإنشاء الفهرس. لمزيد من التفاصيل، راجع <a href="/docs/ar/ivf-rabitq-fastscan.md#Index-building-params">معلمات إنشاء الفهرس</a>.</p></li>
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
<p>قم بتعيين <code translate="no">nprobe</code> للتحكم في عدد مجموعات IVF التي يتم البحث فيها. إذا تم إنشاء الفهرس باستخدام التحديد الدقيق، فاستخدم <code translate="no">refine_k</code> للتحكم في مجموعة المرشحين التي يتم تمريرها إلى أداة التحديد الدقيق FP32.</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your Milvus server address</span>

search_params = {
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">128</span>, <span class="hljs-comment"># Number of clusters to search</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Refinement magnification factor</span></span>
<span class="highlighted-comment-line">    }</span>
}

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># TopK results to return</span>
<span class="highlighted-wrapper-line">    search_params=search_params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين:</p>
<ul>
<li><code translate="no">params</code>: خيارات تكوين إضافية للبحث في الفهرس. لمزيد من التفاصيل، راجع <a href="/docs/ar/ivf-rabitq-fastscan.md#Index-specific-search-params">معلمات البحث الخاصة بالفهرس</a>.</li>
</ul>
<div class="alert note">
<p>على عكس <code translate="no">IVF_RABITQ</code> ، لا يقبل <code translate="no">IVF_RABITQ_FASTSCAN</code> معلمة البحث <code translate="no">rbq_bits_query</code>. يستخدم FastScan دائمًا تكمية الاستعلام ذات 8 بت داخليًا، لذا قم بحذف <code translate="no">rbq_bits_query</code> أو اضبطه على <code translate="no">0</code> ؛ حيث يتم رفض القيم الأكبر.</p>
</div>
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
    </button></h2><p>يقدم هذا القسم نظرة عامة على المعلمات المستخدمة لإنشاء فهرس وإجراء عمليات البحث فيه.</p>
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
    </button></h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">params</code> عند <a href="/docs/ar/ivf-rabitq-fastscan.md#Build-index">إنشاء فهرس</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>عدد المجموعات المراد إنشاؤها باستخدام خوارزمية k-means أثناء إنشاء الفهرس. تخزن كل مجموعة، التي يمثلها مركز ثقل، قائمة من المتجهات. تؤدي زيادة هذه المعلمة إلى تقليل عدد المتجهات في كل مجموعة، مما يؤدي إلى إنشاء أقسام أصغر حجمًا وأكثر تركيزًا.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح<br><strong>النطاق</strong>: [1، 65536]<br><strong>القيمة الافتراضية</strong>: <code translate="no">128</code></p></td>
     <td><p>تؤدي القيم الأكبر لـ <code translate="no">nlist</code> إلى تحسين معدل الاسترجاع من خلال إنشاء مجموعات أكثر دقة، ولكنها تزيد من وقت إنشاء الفهرس. قم بالتحسين بناءً على حجم مجموعة البيانات والموارد المتاحة. في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [32، 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>يمكّن عملية التحسين ويخزن البيانات المحسّنة. يدعم <code translate="no">IVF_RABITQ_FASTSCAN</code> تحسين FP32 فقط.</p></td>
     <td><p><strong>النوع</strong>: منطقية<br><strong>النطاق</strong>: [<code translate="no">true</code> ، <code translate="no">false</code>]<br><strong>القيمة الافتراضية</strong>: <code translate="no">false</code></p></td>
     <td><p>اضبطه على <code translate="no">true</code> إذا كانت هناك حاجة إلى معدل استرجاع يبلغ 0.9 أو أكثر. يؤدي تمكين عملية التنقيح إلى تحسين الدقة، ولكنه يزيد من متطلبات التخزين ووقت إنشاء الفهرس.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>يحدد تمثيل البيانات المستخدم للتحسين عند تمكين <code translate="no">refine</code>. مطلوب فقط عندما يكون <code translate="no">refine</code> هو <code translate="no">true</code>.</p></td>
     <td><p><strong>النوع</strong>: سلسلة<br><strong>النطاق</strong>: [<code translate="no">FP32</code>, <code translate="no">FLAT</code>]<br><strong>القيمة الافتراضية</strong>: لا شيء</p></td>
     <td><p><code translate="no">IVF_RABITQ_FASTSCAN</code> يدعم تحسين FP32 فقط، و <code translate="no">FLAT</code> مطابق لـ <code translate="no">FP32</code>. مطابقة القيمة لا تراعي حالة الأحرف.</p></td>
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
    </button></h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="/docs/ar/ivf-rabitq-fastscan.md#Search-on-index">البحث في الفهرس</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>عدد المجموعات التي سيتم البحث فيها عن المرشحين. تسمح القيم الأعلى بالبحث في المزيد من المجموعات، مما يحسن معدل الاسترجاع من خلال توسيع نطاق البحث، ولكن على حساب زيادة زمن استجابة الاستعلام.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح<br><strong>النطاق</strong>: [1، <em>nlist</em>]<br><strong>القيمة الافتراضية</strong>: <code translate="no">8</code></p></td>
     <td><p>يؤدي زيادة هذه القيمة إلى تحسين معدل الاسترجاع، ولكنه قد يؤدي إلى إبطاء عملية البحث. اضبط <code translate="no">nprobe</code> بشكل متناسب مع <code translate="no">nlist</code> لتحقيق التوازن بين السرعة والدقة. في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [1، <em>nlist</em>].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>تستخدم عملية التحسين تكمية عالية الجودة لاختيار العدد المطلوب من أقرب الجيران من مجموعة مرشحين أكبر بـ <code translate="no">refine_k</code> مرة تم اختيارها باستخدام IVF_RABITQ_FASTSCAN. لا يكون لها أي تأثير إذا تم تعطيل عملية التحسين.</p></td>
     <td><p><strong>النوع</strong>: عدد عائم<br><strong>النطاق</strong>: [1, <em>float_max</em>)<br><strong>القيمة الافتراضية</strong>: <code translate="no">1</code></p></td>
     <td><p>تؤدي القيم الأعلى لـ <code translate="no">refine_k</code> إلى انخفاض معدل الاستعلامات في الثانية (QPS) ولكنها تزيد من معدل الاسترجاع. ابدأ بـ <code translate="no">1</code> واختبر القيم <code translate="no">2</code> و <code translate="no">3</code> و <code translate="no">4</code> و <code translate="no">5</code> لإيجاد التوازن الأمثل بين معدل الاستعلامات في الثانية (QPS) ومعدل الاسترجاع لمجموعة البيانات الخاصة بك.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rbq_bits_query</code></p></td>
     <td><p>يحدد ما إذا كان سيتم تطبيق تكمية عددية إضافية لمتجه الاستعلام. <strong>غير مدعوم في <code translate="no">IVF_RABITQ_FASTSCAN</code></strong>: يستخدم الفهرس دائمًا تكمية استعلام 8 بت داخليًا. قم بحذف هذه المعلمة أو اضبطها على <code translate="no">0</code> ؛ يتم رفض القيم الأكبر من <code translate="no">0</code>.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح<br><strong>النطاق</strong>: [0, 0]<br><strong>القيمة الافتراضية</strong>: <code translate="no">0</code></p></td>
     <td><p>اتركه غير محدد. لتكمية الاستعلام القابلة للتكوين، استخدم <a href="/docs/ar/ivf-rabitq.md">IVF_RABITQ</a> بدلاً من ذلك.</p></td>
   </tr>
</table>
<h2 id="Limitations" class="common-anchor-header">القيود<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li>يستخدم FastScan ترميز قاعدة بيانات RaBitQ ثابتًا مكونًا من 1 بت وتكمية استعلامات مكونة من 8 بت. يجب حذف <code translate="no">rbq_bits_query</code> أو تعيينه إلى <code translate="no">0</code>.</li>
<li>يتم دعم تحسين FP32 (ما يعادل <code translate="no">FLAT</code>) فقط.</li>
<li>لا يتم دعم المكررات.</li>
<li>هذا مؤشر CPU. ولا يعمل على GPU.</li>
<li>يعتمد الأداء الفعلي على دعم وحدة المعالجة المركزية (CPU) لـ SIMD، وأبعاد المتجهات، و <code translate="no">nlist</code> ، و <code translate="no">nprobe</code> ، وتوزيع البيانات. قم بإجراء اختبار أداء مع حمل العمل الخاص بك قبل نشره في بيئة الإنتاج.</li>
</ul>
<p>بالنسبة لمتغير RaBitQ غير FastScan وخيارات التحسين الإضافية الخاصة به، راجع <a href="/docs/ar/ivf-rabitq.md">IVF_RABITQ</a>.</p>
