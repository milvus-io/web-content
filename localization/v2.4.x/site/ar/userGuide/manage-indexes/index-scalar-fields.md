---
id: index-scalar-fields.md
order: 2
summary: >-
  سيرشدك هذا الدليل إلى كيفية إنشاء وتكوين الفهارس العددية للحقول مثل الأعداد
  الصحيحة والسلاسل وما إلى ذلك.
title: فهرس الحقول العددية
---
<h1 id="Index-Scalar-Fields" class="common-anchor-header">فهرس الحقول العددية<button data-href="#Index-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>في Milvus، يتم استخدام الفهرس العددي لتسريع التصفية الوصفية حسب قيمة حقل معين غير متجه، على غرار فهرس قاعدة البيانات التقليدية. سيرشدك هذا الدليل إلى كيفية إنشاء وتكوين الفهارس العددية للحقول مثل الأعداد الصحيحة والسلاسل وغيرها.</p>
<h2 id="Types-of-scalar-indexing" class="common-anchor-header">أنواع الفهرسة العددية<button data-href="#Types-of-scalar-indexing" class="anchor-icon" translate="no">
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
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Auto-indexing">الفهرسة التلقائية</a></strong>: يقرر Milvus تلقائيًا نوع الفهرس بناءً على نوع بيانات الحقل القياسي. وهذا مناسب عندما لا تحتاج إلى التحكم في نوع الفهرس المحدد.</p></li>
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Custom-indexing">الفهرسة المخصصة</a></strong>: يمكنك تحديد نوع الفهرس الدقيق، مثل الفهرس المقلوب. يوفر هذا المزيد من التحكم في تحديد نوع الفهرس.</p></li>
</ul>
<h2 id="Auto-indexing" class="common-anchor-header">الفهرسة التلقائية<button data-href="#Auto-indexing" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>لاستخدام الفهرسة التلقائية، احذف معلمة <strong>نوع الفهرس</strong> في <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>بحيث يمكن لميلفوس استنتاج نوع الفهرس بناءً على نوع الحقل القياسي.</p>
</div>
<div class="language-java">
<p>لاستخدام الفهرسة التلقائية، احذف معلمة <strong>نوع الفهرس</strong> في <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>بحيث يمكن ل Milvus استنتاج نوع الفهرس بناءً على نوع الحقل القياسي.</p>
</div>
<div class="language-javascript">
<p>لاستخدام الفهرسة التلقائية، احذف معلمة <strong>نوع الفهرس</strong> في <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>بحيث يمكن ل Milvus استنتاج نوع الفهرس بناءً على نوع الحقل القياسي.</p>
</div>
<p>للاطلاع على التعيينات بين أنواع البيانات العددية وخوارزميات الفهرسة الافتراضية، راجع <a href="https://milvus.io/docs/scalar_index.md#Scalar-field-indexing-algorithms">خوارزميات فهرسة الحقل العددي</a>.</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Auto indexing</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

index_params = MilvusClient.prepare_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>

index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;&quot;</span>, <span class="hljs-comment"># Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
    index_name=<span class="hljs-string">&quot;default_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
  collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
  index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForScalarField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;scalar_1&quot;</span>) <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    .indexName(<span class="hljs-string">&quot;default_index&quot;</span>) <span class="hljs-comment">// Name of the index to be created</span>
    .indexType(<span class="hljs-string">&quot;&quot;</span>) <span class="hljs-comment">// Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>) <span class="hljs-comment">// Specify the collection name</span>
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment">// Specify the collection name</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;default_index&quot;</span>, <span class="hljs-comment">// Name of the index to be created</span>
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment">// Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
})
<button class="copy-code-btn"></button></code></pre>
<h2 id="Custom-indexing" class="common-anchor-header">فهرسة مخصصة<button data-href="#Custom-indexing" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>لاستخدام الفهرسة المخصصة، حدد نوع فهرسة معين باستخدام معلمة <strong>Index_type</strong> في <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>.</p>
</div>
<div class="language-java">
<p>لاستخدام الفهرسة المخصصة، حدد نوع فهرسة معين باستخدام معلمة <strong>indexType</strong> في . <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>.</p>
</div>
<div class="language-javascript">
<p>لاستخدام الفهرسة المخصصة، حدد نوع فهرسة معين باستخدام المعلمة <strong>index_type</strong> في . <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<p>ينشئ المثال أدناه فهرسًا مقلوبًا للحقل القياسي <code translate="no">scalar_2</code>.</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">index_params = MilvusClient.prepare_index_params() <span class="hljs-comment">#  Prepare an IndexParams object</span>

index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_2&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
  collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
  index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForScalarField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;scalar_1&quot;</span>) <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    .indexName(<span class="hljs-string">&quot;inverted_index&quot;</span>) <span class="hljs-comment">// Name of the index to be created</span>
    .indexType(<span class="hljs-string">&quot;INVERTED&quot;</span>) <span class="hljs-comment">// Type of index to be created</span>
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>) <span class="hljs-comment">// Specify the collection name</span>
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment">// Specify the collection name</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;inverted_index&quot;</span>, <span class="hljs-comment">// Name of the index to be created</span>
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span> <span class="hljs-comment">// Type of index to be created</span>
})
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p><strong>الطرق والمعلمات</strong></p>
<ul>
<li><p><strong>إعداد_المفهرس_بارامز()</strong></p>
<p>يقوم بإعداد كائن <strong>IndexParams</strong>.</p></li>
<li><p><strong>إضافة_الفهرس()</strong></p>
<p>يضيف تكوينات الفهرس إلى كائن <strong>IndexParams</strong>.</p>
<ul>
<li><p><strong>اسم_الحقل</strong><em>(سلسلة</em>)</p>
<p>اسم الحقل القياسي المراد فهرسته.</p></li>
<li><p><strong>نوع_الفهرس</strong><em>(سلسلة</em>):</p>
<p>نوع الفهرس القياسي المراد إنشاؤه. للفهرسة الضمنية، اتركها فارغة أو احذف هذه المعلمة.</p>
<p>للفهرسة المخصصة، القيم الصالحة هي:</p>
<ul>
<li><p><strong>INVERTED</strong>: (موصى به) يتكون الفهرس المقلوب من قاموس مصطلحات يحتوي على جميع الكلمات الرمزية مرتبة أبجديًا. لمزيد من التفاصيل، راجع <a href="/docs/ar/v2.4.x/scalar_index.md">الفهرس المقلوب</a>.</p></li>
<li><p><strong>STL_SORT</strong>: يفرز الحقول العددية باستخدام خوارزمية فرز مكتبة القالب القياسية. يدعم فقط الحقول الرقمية (مثل INT8 و INT16 و INT32 و INT64 و FLOAT و DOUBLE).</p></li>
<li><p><strong>تري</strong>: بنية بيانات شجرية لعمليات البحث والاسترجاع السريع للبادئة. يدعم حقول VARCHAR.</p></li>
</ul></li>
<li><p><strong>اسم_الفهرس</strong><em>(سلسلة</em>)</p>
<p>اسم الفهرس القياسي المراد إنشاؤه. يدعم كل حقل قياسي فهرسًا واحدًا.</p></li>
</ul></li>
<li><p><strong>إنشاء_فهرس()</strong></p>
<p>إنشاء الفهرس في المجموعة المحددة.</p>
<ul>
<li><p><strong>اسم_المجموعة</strong><em>(سلسلة</em>)</p>
<p>اسم المجموعة التي يتم إنشاء الفهرس لها.</p></li>
<li><p><strong>index_params</strong></p>
<p>كائن <strong>IndexParams</strong> الذي يحتوي على تكوينات الفهرس.</p></li>
</ul></li>
</ul>
</div>
<div class="language-java">
<p><strong>الأساليب والمعلمات</strong></p>
<ul>
<li>إعداد كائن <strong>IndexParam</strong>إعداد كائن IndexParam.<ul>
<li><strong>اسم الحقل</strong><em>(سلسلة</em>) اسم الحقل القياسي المراد فهرسته.</li>
<li><strong>اسم الفهرس</strong><em>(سلسلة</em>) اسم الفهرس القياسي المراد إنشاؤه. يدعم كل حقل قياسي فهرس واحد.</li>
<li><strong>نوع الفهرس</strong><em>(سلسلة</em>) نوع الفهرس القياسي المراد إنشاؤه. للفهرسة الضمنية، اتركها فارغة أو احذف هذه المعلمة. للفهرسة المخصصة، القيم الصالحة هي<ul>
<li><strong>INVERTED</strong>: (موصى به) يتكون الفهرس المقلوب من قاموس مصطلحات يحتوي على جميع الكلمات الرمزية مرتبة أبجديًا. لمزيد من التفاصيل، راجع <a href="/docs/ar/v2.4.x/scalar_index.md">الفهرس المقلوب</a>.</li>
<li><strong>STL_SORT</strong>: يفرز الحقول العددية باستخدام خوارزمية فرز مكتبة القالب القياسية. يدعم الحقول المنطقية والرقمية (مثل INT8 و INT16 و INT32 و INT64 و FLOAT و DOUBLE).</li>
<li><strong>تري</strong>: بنية بيانات شجرية لعمليات البحث والاسترجاع السريع للبادئة. يدعم حقول VARCHAR.</li>
</ul></li>
</ul></li>
<li><strong>CreateIndexReq إنشاء</strong>فهرس في المجموعة المحددة.<ul>
<li><strong>اسم المجموعة</strong><em>(سلسلة</em>) اسم المجموعة التي يتم إنشاء الفهرس لها.</li>
<li><strong>indexParams</strong><em>(قائمة<IndexParam></em>) قائمة بكائنات IndexParam التي تحتوي على تكوينات الفهرس.</li>
</ul></li>
</ul>
</div>
<div class="language-javascript">
<p><strong>الأساليب والمعلمات</strong></p>
<ul>
<li><p><strong>إنشاء فهرس</strong></p>
<p>إنشاء الفهرس في المجموعة المحددة.</p>
<ul>
<li><strong>اسم_المجموعة</strong><em>(سلسلة</em>) اسم المجموعة التي يتم إنشاء الفهرس لها.</li>
<li><strong>اسم_الحقل</strong><em>(سلسلة</em>) اسم الحقل القياسي المراد فهرسته.</li>
<li><strong>اسم_الفهرس</strong><em>(سلسلة</em>) اسم الفهرس القياسي المراد إنشاؤه. يدعم كل حقل قياسي فهرس واحد.</li>
<li><strong>نوع_الفهرس</strong><em>(سلسلة</em>) نوع الفهرس القياسي المراد إنشاؤه. للفهرسة الضمنية، اتركها فارغة أو احذف هذه المعلمة. للفهرسة المخصصة، القيم الصالحة هي<ul>
<li><strong>INVERTED</strong>: (موصى به) يتكون الفهرس المقلوب من قاموس مصطلحات يحتوي على جميع الكلمات الرمزية مرتبة أبجديًا. لمزيد من التفاصيل، راجع <a href="/docs/ar/v2.4.x/scalar_index.md">الفهرس المقلوب</a>.</li>
<li><strong>STL_SORT</strong>: يفرز الحقول العددية باستخدام خوارزمية فرز مكتبة القالب القياسية. يدعم الحقول المنطقية والرقمية (مثل INT8 و INT16 و INT32 و INT64 و FLOAT و DOUBLE).</li>
<li><strong>تري</strong>: بنية بيانات شجرية لعمليات البحث والاسترجاع السريع للبادئة. يدعم حقول VARCHAR.</li>
</ul></li>
</ul></li>
</ul>
</div>
<h2 id="Verifying-the-result" class="common-anchor-header">التحقق من النتيجة<button data-href="#Verifying-the-result" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>استخدم طريقة <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> للتحقق من إنشاء الفهارس العددية:</p>
</div>
<div class="language-java">
<p>استخدم الطريقة <code translate="no">listIndexes()</code> للتحقق من إنشاء الفهارس العددية:</p>
</div>
<div class="language-javascript">
<p>استخدم الأسلوب <code translate="no">listIndexes()</code> للتحقق من إنشاء الفهارس العددية:</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.list_indexes(
    collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>  <span class="hljs-comment"># Specify the collection name</span>
)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [&#x27;default_index&#x27;,&#x27;inverted_index&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.ListIndexesReq;

<span class="hljs-type">ListIndexesReq</span> <span class="hljs-variable">listIndexesReq</span> <span class="hljs-operator">=</span> ListIndexesReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>)  <span class="hljs-comment">// Specify the collection name</span>
    .build();

List&lt;String&gt; indexNames = client.listIndexes(listIndexesReq);

System.out.println(indexNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;default_index&quot;,</span>
<span class="hljs-comment">//     &quot;inverted_index&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listIndexes</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;test_scalar_index&#x27;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">indexes</span>)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;default_index&quot;,</span>
<span class="hljs-comment">//     &quot;inverted_index&quot;</span>
<span class="hljs-comment">// ]   </span>
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
    </button></h2><ul>
<li>تدعم الفهرسة العددية حاليًا أنواع البيانات INT8 و INT16 و INT32 و INT64 و FLOAT و DOUBLE و BOOL و VARCHAR و ARRAY، ولكن ليس نوع بيانات JSON.</li>
</ul>
