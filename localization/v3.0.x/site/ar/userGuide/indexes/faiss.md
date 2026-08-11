---
id: faiss.md
title: FAISSCompatible with Milvus 3.0.0+
summary: >-
  استخدم ميزة تمرير فهرس FAISS لتوفير سلاسل إنشاء فهرس FAISS ومعلمات البحث
  الخاصة بكل مصنع في Milvus 3.0.
beta: Milvus 3.0.0+
---
<h1 id="FAISS" class="common-anchor-header">FAISS<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#FAISS" class="anchor-icon" translate="no">
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
    </button></h1><p>يُعد نوع الفهرس <code translate="no">FAISS</code> ميزة تمرير على مستوى الخبراء متوفرة في Milvus 3.0.0 والإصدارات الأحدث. تتيح لك هذه الميزة توفير <a href="https://github.com/facebookresearch/faiss/wiki/The-index-factory">سلسلة مصنع فهرس Faiss</a> بدلاً من اختيار نوع فهرس Milvus ثابت.</p>
<p>استخدم <code translate="no">FAISS</code> إذا كان لديك بالفعل وصفة Faiss تم اختبارها وتحتاج إلى التحكم المباشر في تكوينها. بالنسبة للوصفات الشائعة التي لها نوع فهرس Milvus مخصص، يفضل استخدام النوع المخصص لأنه يتمتع بعقد معلمات مستقر وموثق.</p>
<div class="alert note">
<p>لا يدعم Milvus تلقائيًا سلسلة مصنع مقبولة من قبل Faiss الأصلي. يعتمد التوافق على نوع حقل المتجهات، والمقياس، والأبعاد، ووحدات Faiss المُدمجة في صورة Milvus، وما إذا كان الفهرس الناتج يدعم العمليات التي يتطلبها Milvus.</p>
</div>
<h2 id="Limits" class="common-anchor-header">القيود<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><code translate="no">FAISS</code> يدعم الحقول <code translate="no">FLOAT_VECTOR</code> و <code translate="no">BINARY_VECTOR</code>. ولا يدعم الحقول <code translate="no">FLOAT16_VECTOR</code> و <code translate="no">BFLOAT16_VECTOR</code> و <code translate="no">INT8_VECTOR</code> و <code translate="no">SPARSE_FLOAT_VECTOR</code>.</p></li>
<li><p>يعمل محول <code translate="no">FAISS</code> العام على وحدة المعالجة المركزية (CPU). وهو ليس نوع فهرس Faiss الخاص بوحدة معالجة الرسومات (GPU).</p></li>
<li><p>يُعد معلمة البناء <code translate="no">faiss_index_name</code> إلزامية. يقوم Milvus بتمرير قيمتها إلى Faiss دون تحويل الوصفة إلى نوع فهرس Milvus مخصص.</p></li>
<li><p>معلمات البناء والبحث خاصة بكل مصنع. قد يرفض مصنع ما معلمة يدعمها مصنع آخر.</p></li>
<li><p>يتطلب التصفية القياسية أن يدعم فهرس Faiss الأساسي محدد المعرف (ID selector). تغطي اختبارات Milvus 3.0.0 البحث المُصفى باستخدام مصانع الأرقام العائمة <code translate="no">Flat</code> و <code translate="no">IVF64,Flat</code> و <code translate="no">HNSW16,Flat</code>. لا تفترض أن كل مصنع يدعم المرشحات أو أن الفهارس الثنائية <code translate="no">FAISS</code> تدعم التصفية القياسية.</p></li>
<li><p>لا يتم دعم مكررات البحث.</p></li>
<li><p>لا يوفر المُهايئ استرجاع المتجهات الأولية.</p></li>
<li><p>يعتمد دعم البحث عن النطاق على المصنع. يتمتع Float <code translate="no">Flat</code> بتغطية الإصدار. لا تستخدم البحث عن النطاق مع الفهارس الثنائية <code translate="no">FAISS</code>.</p></li>
<li><p>يمكن أن يتم إنشاء المصنع بنجاح ولكنه يرفض مع ذلك بعض عمليات البحث في Milvus. على سبيل المثال، يرفض <code translate="no">PQ8x4</code> المستقل المحدد المستخدم في البحث المُصفى سكاليارياً. تحقق من صحة الاستخدام غير المُصفى بشكل منفصل.</p></li>
<li><p>في Milvus 3.0.0، تحقق من صحة نتائج <code translate="no">COSINE</code> وعتبات البحث عن النطاق بعد إعادة تحميل الفهرس. لا يستعيد Knowhere v3.0.6 حالة تطبيع جيب التمام لمحول <code translate="no">FAISS</code> أثناء عملية إزالة التسلسل.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">كيفية العمل<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/faiss-index-flow.png" alt="FAISS index passthrough workflow" class="doc-image" id="faiss-index-passthrough-workflow" /> 
   <span>سير عمل تمرير فهرس FAISS</span>
  
 </span></p>
<p>لبناء الفهرس، يقوم Milvus بإعادة توجيه <code translate="no">faiss_index_name</code> ونوع حقل المتجه والمقياس ومعلمات البناء الأخرى إلى محول Knowhere FAISS. يستدعي المحول <code translate="no">faiss::index_factory()</code> لحقول <code translate="no">FLOAT_VECTOR</code> أو <code translate="no">faiss::index_binary_factory()</code> لحقول <code translate="no">BINARY_VECTOR</code>. الكائن الناتج هو فهرس Faiss أصلي يُدار من خلال دورة حياة فهرس Milvus العادية.</p>
<p>بالنسبة للبحث، يقوم المُهايئ بتحويل المعلمات المحددة الخاصة بالمصنع إلى كائن Faiss المطابق <code translate="no">SearchParameters</code>. وبالنسبة لمصانع الأرقام العائمة المدعومة، فإنه يمرر أيضًا مجموعة بتات مرشح Milvus كمحدد Faiss. دعم المحدد خاص بالمصنع، ولا تُنشئ الاختبارات التي تم إصدارها تصفية قياسية لمؤشرات <code translate="no">FAISS</code> الثنائية. ولهذا السبب يمكن أن تكون الوصفة صالحة في Faiss المستقل ولكنها ترفض عملية مطلوبة من قبل مسار البحث في Milvus.</p>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Milvus 3.0.0 أو أحدث</li>
<li>PyMilvus 3.0.0 أو أحدث</li>
<li>الإلمام بصيغة مصنع الفهرس Faiss ومتطلبات التدريب الخاصة بالمصنع المحدد</li>
</ul>
<p>للحصول على إرشادات التثبيت، راجع <a href="/docs/ar/install-pymilvus.md">تثبيت PyMilvus</a>.</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">اختر سلسلة مصنع<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>تصف سلسلة المصنع فهرس Faiss كسلسلة من المكونات. الأمثلة التالية مشمولة باختبار الإصدار Milvus 3.0.0. هذه القائمة ليست شاملة.</p>
<table>
<thead>
<tr><th>سلسلة المصنع</th><th>نوع الحقل</th><th>المقاييس المستخدمة في اختبارات الإصدار</th><th>معلمات البحث</th><th>ملاحظات</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>، <code translate="no">IP</code> ، <code translate="no">COSINE</code></td><td>لا شيء</td><td>البحث الدقيق.</td></tr>
<tr><td><code translate="no">IVF64,Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>، <code translate="no">IP</code> ، <code translate="no">COSINE</code></td><td><code translate="no">nprobe</code></td><td>IVF مع 64 قائمة مقلوبة ومتجهات غير مضغوطة.</td></tr>
<tr><td><code translate="no">HNSW16,Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>، <code translate="no">IP</code> ، <code translate="no">COSINE</code></td><td><code translate="no">efSearch</code></td><td>رسم بياني HNSW مع تخزين متجهات مسطحة.</td></tr>
<tr><td><code translate="no">OPQ16,IVF64,PQ16x4</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td>خاص بالمصنع</td><td>يجمع بين OPQ و IVF و PQ. تحقق من صحة حجم التدريب ومعدل الاسترجاع باستخدام بياناتك.</td></tr>
<tr><td><code translate="no">IVF64,PQ8x4,RFlat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td><code translate="no">nprobe</code>، <code translate="no">k_factor</code></td><td>يستخدم مُحسِّنًا مسطحًا بعد استرجاع المرشحين من PQ.</td></tr>
<tr><td><code translate="no">PQ8x4</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td>لا شيء</td><td>يتضمن اختبارات الإصدار. يفشل البحث المُصفى بالقيم العددية لأن الفهرس يرفض المُحدد؛ تحقق من الاستخدام غير المُصفى بشكل منفصل.</td></tr>
<tr><td><code translate="no">BFlat</code></td><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HAMMING</code></td><td>لا شيء</td><td>البحث الدقيق عن المتجهات الثنائية.</td></tr>
</tbody>
</table>
<p>تشير إدخالات " <code translate="no">COSINE</code> " إلى تغطية اختبارات "smoke" للبناء والبحث. بالنسبة لـ Milvus 3.0.0، لا تحدد هذه الإدخالات صحة النتيجة أو البحث عن النطاق بعد إعادة تحميل الفهرس. انظر <a href="#limits">"الحدود"</a>.</p>
<h2 id="Build-and-search-a-float-index" class="common-anchor-header">إنشاء فهرس عائم والبحث فيه<button data-href="#Build-and-search-a-float-index" class="anchor-icon" translate="no">
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
    </button></h2><p>يُنشئ المثال التالي 3,000 متجهًا ذي 128 بُعدًا. ويوفر هذا بيانات تدريب كافية لوصفة " <code translate="no">IVF64,Flat</code> " المستخدمة في المثال. قم بتوسيع كتلة الإعداد وتشغيلها قبل إنشاء الفهرس والبحث فيه.</p>
<p><details></p>
<p><summary>تحضير مجموعة المتجهات ذات الأرقام العائمة</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;faiss_float_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">32</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

client.create_collection(collection_name=collection_name, schema=schema)

rows = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;reference&quot;</span> <span class="hljs-keyword">if</span> i % <span class="hljs-number">2</span> == <span class="hljs-number">0</span> <span class="hljs-keyword">else</span> <span class="hljs-string">&quot;query&quot;</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: vector,
    }
    <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)
]

client.insert(collection_name=collection_name, data=rows)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Build-the-index" class="common-anchor-header">إنشاء الفهرس<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>اضبط « <code translate="no">index_type</code> » على « <code translate="no">FAISS</code> »، واستخدم « <code translate="no">faiss_index_name</code> » لاختيار الوصفة الأصلية لمصنع Faiss.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;faiss_ivf_flat&quot;</span>,
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,</span>
<span class="highlighted-comment-line">    params={<span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;IVF64,Flat&quot;</span>},</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>تقوم سلسلة المصنع <code translate="no">IVF64,Flat</code> بإنشاء فهرس IVF يحتوي على 64 قائمة معكوسة وتخزين المتجهات غير المضغوطة في كل قائمة.</p>
<h3 id="Search-the-index" class="common-anchor-header">البحث في الفهرس<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتعيين معلمات البحث الخاصة بالمصنع داخل <code translate="no">search_params.params</code>. بالنسبة لمصنع IVF، يتحكم <code translate="no">nprobe</code> في عدد القوائم المقلوبة التي يبحث فيها Faiss.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>},</span>
<span class="highlighted-comment-line">}</span>

results = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;reference&quot;&#x27;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;category&quot;</span>],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<p>يستخدم الاستعلام <code translate="no">nprobe=8</code> ، لذا يبحث Faiss في 8 قوائم معكوسة من أصل 64. يقصر المرشح النتائج على الكيانات التي تكون قيمة <code translate="no">category</code> الخاصة بها هي <code translate="no">reference</code>.</p>
<h2 id="Build-and-search-a-binary-index" class="common-anchor-header">إنشاء فهرس ثنائي والبحث فيه<button data-href="#Build-and-search-a-binary-index" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة لحقول <code translate="no">BINARY_VECTOR</code> ، استخدم سلسلة مصنع ثنائية مثل <code translate="no">BFlat</code> ومقياس ثنائي متوافق. قم بتوسيع كتلة الإعداد وتشغيلها قبل إنشاء الفهرس والبحث فيه.</p>
<p><details></p>
<p><summary>تحضير مجموعة المتجهات الثنائية</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;faiss_binary_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">7</span>)
vectors = [<span class="hljs-built_in">bytes</span>(rng.getrandbits(<span class="hljs-number">8</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">16</span>)) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">300</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;binary_vector&quot;</span>, DataType.BINARY_VECTOR, dim=<span class="hljs-number">128</span>)

client.create_collection(collection_name=collection_name, schema=schema)
client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;binary_vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Build-the-index" class="common-anchor-header">إنشاء الفهرس<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم <code translate="no">BFlat</code> كسلسلة مصنع و <code translate="no">HAMMING</code> كمقياس لهذا المثال الخاص بالمتجهات الثنائية.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;faiss_binary_flat&quot;</span>,
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;HAMMING&quot;</span>,</span>
<span class="highlighted-comment-line">    params={<span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;BFlat&quot;</span>},</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-the-index" class="common-anchor-header">البحث في الفهرس<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BFlat</code> لا يحتوي على معلمة بحث خاصة بالعائلة. قم بتمرير تعيين فارغ لـ <code translate="no">params</code> عند إنشاء طلب البحث.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {<span class="hljs-string">&quot;params&quot;</span>: {}}</span>

results = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">5</span>,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<p>يُمثَّل كل متجه ثنائي ذي 128 بُعدًا بـ 16 بايت. لمزيد من المعلومات، راجع <a href="/docs/ar/binary-vector.md">«المتجه الثنائي</a>».</p>
<h2 id="Configure-build-and-search-parameters" class="common-anchor-header">تكوين معلمات الإنشاء والبحث<button data-href="#Configure-build-and-search-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>يحتوي نوع الفهرس <code translate="no">FAISS</code> على معلمة إنشاء واحدة مطلوبة للتمرير.</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الموقع</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">faiss_index_name</code></td><td><code translate="no">params</code> في <code translate="no">add_index()</code></td><td>سلسلة مصنع الفهرس Faiss. على سبيل المثال، <code translate="no">IVF64,Flat</code>.</td></tr>
</tbody>
</table>
<p>قم بتعيين معلمات البحث الخاصة بالمصنع داخل <code translate="no">search_params.params</code>. يسرد الجدول التالي أمثلة شائعة، وهو ليس شاملاً.</p>
<table>
<thead>
<tr><th>المعلمة</th><th>مصنع مثال</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td><code translate="no">IVF64,Flat</code></td><td>عدد القوائم المقلوبة المطلوب البحث فيها.</td></tr>
<tr><td><code translate="no">efSearch</code></td><td><code translate="no">HNSW16,Flat</code></td><td>حجم قائمة المرشحين للبحث HNSW.</td></tr>
<tr><td><code translate="no">k_factor</code></td><td><code translate="no">IVF64,PQ8x4,RFlat</code></td><td>عدد المرشحين المقدمين إلى أداة التصفية بالنسبة إلى أفضل K المطلوب.</td></tr>
</tbody>
</table>
<p>يقوم Milvus بإعادة توجيه المعلمات الإضافية التي يتعرف عليها المُهايئ فقط. يتم رفض مفاتيح البناء ومفاتيح البحث غير المعروفة التي لا تدعمها عائلة المصانع المحددة. لا يحتفظ Milvus بمخطط معلمات عام لكل مصنع محتمل. راجع وثائق Faiss الخاصة بالمصنع المحدد، ثم تحقق من صحة تدفق البناء والبحث بالكامل مقابل الإصدار والصورة الدقيقين لـ Milvus اللذين تخطط لنشرهما.</p>
<h2 id="Handle-errors-and-unsupported-operations" class="common-anchor-header">التعامل مع الأخطاء والعمليات غير المدعومة<button data-href="#Handle-errors-and-unsupported-operations" class="anchor-icon" translate="no">
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
<li><p>إذا كانت سلسلة المصنع غير صالحة أو غير متوفرة في بنية Milvus، يفشل إنشاء الفهرس. تحقق من حالة الفهرس وسبب الفشل قبل تحميل المجموعة.</p></li>
<li><p>إذا كان نوع المعلمة غير صحيح، يفشل البحث. على سبيل المثال، يتم رفض <code translate="no">nprobe=&quot;invalid&quot;</code> لأن <code translate="no">nprobe</code> يجب أن يكون رقميًا.</p></li>
<li><p>إذا كانت إحدى المعلمات لا تنطبق على المصنع الذي تم إنشاؤه، فإن المحول يرفضها باعتبارها غير مدعومة.</p></li>
<li><p>إذا كان المصنع لا يدعم محدد Milvus، فقد يفشل البحث المُصفى حتى عندما يكون بإمكان المصنع نفسه البحث في Faiss المستقل.</p></li>
<li><p>لا تستخدم <code translate="no">search_iterator()</code> مع فهرس <code translate="no">FAISS</code>.</p></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">ما هي الخطوة التالية<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>تعرف على كيفية تنظيم فهارس Milvus في <a href="/docs/ar/index-explained.md">«شرح الفهرس</a>».</li>
<li>قارن بين أنواع الفهارس المخصصة <a href="/docs/ar/ivf-flat.md">IVF_FLAT</a> و <a href="/docs/ar/hnsw.md">HNSW</a>.</li>
<li>راجع " <a href="/docs/ar/metric.md">أنواع المقاييس</a> " قبل اختيار مقياس للمصنع.</li>
</ul>
