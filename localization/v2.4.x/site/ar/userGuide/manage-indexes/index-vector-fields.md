---
id: index-vector-fields.md
order: 1
summary: >-
  يرشدك هذا الدليل إلى العمليات الأساسية لإنشاء الفهارس وإدارتها على الحقول
  المتجهة في مجموعة.
title: فهرسة الحقول المتجهة
---
<h1 id="Index-Vector-Fields" class="common-anchor-header">فهرسة الحقول المتجهة<button data-href="#Index-Vector-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>يرشدك هذا الدليل إلى العمليات الأساسية لإنشاء الفهارس وإدارتها على الحقول المتجهة في مجموعة.</p>
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
    </button></h2><p>من خلال الاستفادة من البيانات الوصفية المخزنة في ملف الفهرس، ينظم Milvus بياناتك في بنية متخصصة، مما يسهل الاسترجاع السريع للمعلومات المطلوبة أثناء عمليات البحث أو الاستعلامات.</p>
<p>يوفر Milvus العديد من أنواع الفهارس والمقاييس لفرز قيم الحقول لإجراء عمليات بحث فعالة للتشابه. يسرد الجدول التالي أنواع الفهارس والمقاييس المدعومة لأنواع الحقول المتجهة المختلفة. يدعم Milvus حاليًا أنواعًا مختلفة من بيانات المتجهات، بما في ذلك التضمينات ذات النقطة العائمة (المعروفة غالبًا باسم متجهات النقطة العائمة أو المتجهات الكثيفة)، والتضمينات الثنائية (المعروفة أيضًا باسم المتجهات الثنائية)، والتضمينات المتفرقة (المعروفة أيضًا باسم المتجهات المتفرقة). لمزيد من التفاصيل، راجع <a href="/docs/ar/v2.4.x/index.md">الفهرس داخل الذاكرة</a> <a href="/docs/ar/v2.4.x/metric.md">ومقاييس التشابه</a>.</p>
<div class="filter">
 <a href="#floating">تضمينات النقطة العائمة</a> <a href="#binary">التضمينات الثنائية التضمينات الثنائية</a> <a href="#sparse">التضمينات المتفرقة</a></div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">أنواع المقاييس</th>
    <th class="tg-0pky">أنواع الفهرس</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>المسافة الإقليدية (L2)</li><li>الضرب الداخلي (IP)</li><li>تشابه جيب التمام (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>مسطح</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">أنواع المقاييس</th>
    <th class="tg-0pky">أنواع الفهرس</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>جاكارد (JACCARD)</li><li>هامينغ (HAMMING)</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">الأنواع المترية</th>
    <th class="tg-0pky">أنواع الفهرس</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>الفهرس_المتفرق_المقلوب_الفهرس</li><li>SPARSE_WAND</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<p>يوصى بإنشاء فهارس لكل من الحقل المتجه والحقول القياسية التي يتم الوصول إليها بشكل متكرر.</p>
<h2 id="Preparations" class="common-anchor-header">الإعدادات<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>كما هو موضح في <a href="/docs/ar/v2.4.x/manage-collections.md">إدارة المجموع</a>ات، يقوم ميلفوس تلقائيًا بإنشاء فهرس وتحميله في الذاكرة عند إنشاء مجموعة إذا تم تحديد أي من الشروط التالية في طلب إنشاء المجموعة</p>
<ul>
<li><p>بُعد الحقل المتجه ونوع المقياس، أو</p></li>
<li><p>المخطط ومعلمات الفهرس.</p></li>
</ul>
<p>يقوم مقتطف التعليمات البرمجية أدناه بإعادة استخدام التعليمات البرمجية الحالية لإنشاء اتصال بمثيل Milvus وإنشاء مجموعة دون تحديد معلمات الفهرس الخاصة بها. في هذه الحالة، تفتقر المجموعة إلى فهرس وتبقى غير محملة.</p>
<div class="language-python">
<p>للتحضير للفهرسة، استخدم <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> للاتصال بخادم Milvus وإنشاء مجموعة باستخدام <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a>, <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a>و <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a>.</p>
</div>
<div class="language-java">
<p>للتحضير للفهرسة، استخدم <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a> للاتصال بخادم ميلفوس وإعداد مجموعة باستخدام <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md"><code translate="no">createSchema()</code></a>, <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md"><code translate="no">addField()</code></a>و <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a>.</p>
</div>
<div class="language-javascript">
<p>للتحضير للفهرسة، استخدم <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> للاتصال بخادم ميلفوس وإعداد مجموعة باستخدام <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create schema</span>
<span class="hljs-comment"># 2.1. Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># 2.2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

<span class="hljs-comment"># 3. Create collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>, 
    schema=schema, 
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create a collection</span>

<span class="hljs-comment">// 2.1 Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

<span class="hljs-comment">// 2.2 Add fields to schema</span>
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;id&quot;</span>).dataType(DataType.Int64).isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>).dataType(DataType.FloatVector).dimension(<span class="hljs-number">5</span>).build());

<span class="hljs-comment">// 3 Create a collection without schema and index parameters</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
.collectionName(<span class="hljs-string">&quot;customized_setup&quot;</span>)
.collectionSchema(schema)
.build();

client.createCollection(customizedSetupReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// 2. Define fields for the collection</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
    },
]

<span class="hljs-comment">// 3. Create a collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)  

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-Collection" class="common-anchor-header">فهرسة مجموعة<button data-href="#Index-a-Collection" class="anchor-icon" translate="no">
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
<p>لإنشاء فهرس لمجموعة أو فهرسة مجموعة، استخدم . <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md"><code translate="no">prepare_index_params()</code></a> لإعداد معلمات الفهرس و <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md"><code translate="no">create_index()</code></a> لإنشاء الفهرس.</p>
</div>
<div class="language-java">
<p>لإنشاء فهرس لمجموعة أو فهرسة مجموعة، استخدم <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a> لإعداد معلمات الفهرس و <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/createIndex.md"><code translate="no">createIndex()</code></a> لإنشاء الفهرس.</p>
</div>
<div class="language-javascript">
<p>لإنشاء فهرس لمجموعة أو فهرسة مجموعة، استخدم <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4.1. Set up the index parameters</span>
index_params = MilvusClient.prepare_index_params()

<span class="hljs-comment"># 4.2. Add an index on the vector field.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
    params={ <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span> }
)

<span class="hljs-comment"># 4.3. Create an index file</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>,
    index_params=index_params,
    sync=<span class="hljs-literal">False</span> <span class="hljs-comment"># Whether to wait for index creation to complete before returning. Defaults to True.</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-comment">// 4 Prepare index parameters</span>

<span class="hljs-comment">// 4.2 Add an index for the vector field &quot;vector&quot;</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForVectorField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
    .indexName(<span class="hljs-string">&quot;vector_index&quot;</span>)
    .indexType(IndexParam.IndexType.IVF_FLAT)
    .metricType(IndexParam.MetricType.COSINE)
    .extraParams(Map.of(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">128</span>))
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-comment">// 4.3 Crate an index file</span>
<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup&quot;</span>)
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Set up index for the collection</span>
<span class="hljs-comment">// 4.1. Set up the index parameters</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,   
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span> }
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
  <thead>
    <tr>
      <th>المعلمة</th>
      <th>الوصف</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>اسم الملف الهدف لتطبيق هذا الكائن.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>الخوارزمية المستخدمة لقياس التشابه بين المتجهات. القيم الممكنة هي <strong>IP</strong> و <strong>L2</strong> و <strong>COSINE</strong> و <strong>JACCARD</strong> و <strong>HAMMING</strong>. يتوفر هذا فقط عندما يكون الحقل المحدد هو حقل متجه. لمزيد من المعلومات، راجع <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">الفهارس المدعومة في ميلفوس</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>اسم الخوارزمية المستخدمة لترتيب البيانات في الحقل المحدد. لمعرفة الخوارزميات القابلة للتطبيق، راجع <a href="https://milvus.io/docs/index.md">الفهرس داخل الذاكرة</a> <a href="https://milvus.io/docs/disk_index.md">والفهرس على القرص</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">index_name</code></td>
      <td>اسم ملف الفهرس الذي تم إنشاؤه بعد تطبيق هذا الكائن.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>معلمات الضبط الدقيق لنوع الفهرس المحدد. للحصول على تفاصيل حول المفاتيح الممكنة ونطاقات القيم، راجع الفهرس <a href="https://milvus.io/docs/index.md">داخل الذاكرة</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>اسم مجموعة موجودة.</td>
    </tr>
    <tr>
      <td><code translate="no">index_params</code></td>
      <td>كائن <strong>IndexParams</strong> يحتوي على قائمة من كائنات <strong>IndexParam</strong>.</td>
    </tr>
    <tr>
      <td><code translate="no">sync</code></td>
      <td>يتحكم في كيفية بناء الفهرس فيما يتعلق بطلب العميل. قيم صالحة:<br><ul><li><code translate="no">True</code> (افتراضي): ينتظر العميل حتى يتم بناء الفهرس بالكامل قبل إرجاعه. هذا يعني أنك لن تحصل على استجابة حتى تكتمل العملية.</li><li><code translate="no">False</code>: يعود العميل فور استلام الطلب ويتم إنشاء الفهرس في الخلفية. لمعرفة ما إذا كان إنشاء الفهرس قد اكتمل، استخدم طريقة <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md">describe_index()</a>.</li></ul></td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>المعلمة</th>
      <th>الوصف</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>اسم الحقل المستهدف لتطبيق كائن IndexParam هذا.</td>
    </tr>
    <tr>
      <td><code translate="no">indexName</code></td>
      <td>اسم ملف الفهرس الذي تم إنشاؤه بعد تطبيق هذا الكائن.</td>
    </tr>
    <tr>
      <td><code translate="no">indexType</code></td>
      <td>اسم الخوارزمية المستخدمة لترتيب البيانات في الحقل المحدد. لمعرفة الخوارزميات القابلة للتطبيق، راجع <a href="https://milvus.io/docs/index.md">الفهرس داخل الذاكرة</a> <a href="https://milvus.io/docs/disk_index.md">والفهرس على القرص</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metricType</code></td>
      <td>مقياس المسافة المراد استخدامه للفهرس. القيم الممكنة هي <strong>IP</strong> <strong>وL2</strong> <strong>وCOSINE</strong> <strong>وJACCARD</strong> <strong>وHAMMING</strong>.</td>
    </tr>
    <tr>
      <td><code translate="no">extraParams</code></td>
      <td>معلمات الفهرس الإضافية. لمزيد من التفاصيل، راجع الفهرس <a href="https://milvus.io/docs/index.md">داخل الذاكرة</a> والفهرس <a href="https://milvus.io/docs/disk_index.md">على القرص</a>.</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>المعلمة</th>
      <th>الوصف</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>اسم المجموعة الموجودة.</td>
    </tr>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>اسم الحقل المراد إنشاء فهرس فيه.</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>نوع الفهرس المراد إنشاؤه.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>نوع المقياس المستخدم لقياس المسافة المتجهة.</td>
    </tr>
    <tr>
      <td><code translate="no">index_name</code></td>
      <td>اسم الفهرس المراد إنشاؤه.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>معلمات أخرى خاصة بالفهرس.</td>
    </tr>
  </tbody>
</table>
<div class="admonition note">
<p><strong>ملاحظات</strong></p>
<p>يمكنك حاليًا إنشاء ملف فهرس واحد فقط لكل حقل في مجموعة.</p>
</div>
<h2 id="Check-Index-Details" class="common-anchor-header">التحقق من تفاصيل الفهرس<button data-href="#Check-Index-Details" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد إنشاء فهرس، يمكنك التحقق من تفاصيله.</p>
<div class="language-python">
<p>للتحقق من تفاصيل الفهرس، استخدم <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> لسرد أسماء الفهرس و <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md"><code translate="no">describe_index()</code></a> للحصول على تفاصيل الفهرس.</p>
</div>
<div class="language-java">
<p>للتحقق من تفاصيل الفهرس، استخدم <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/describeIndex.md"><code translate="no">describeIndex()</code></a> للحصول على تفاصيل الفهرس.</p>
</div>
<div class="language-javascript">
<p>للتحقق من تفاصيل الفهرس، استخدم <a href="https://milvus.io/api-reference/node/v2.4.x/Management/describeIndex.md"><code translate="no">describeIndex()</code></a> للحصول على تفاصيل الفهرس.</p>
</div>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. Describe index</span>
res = client.list_indexes(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     &quot;vector_index&quot;,</span>
<span class="hljs-comment"># ]</span>

res = client.describe_index(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;index_type&quot;: ,</span>
<span class="hljs-comment">#     &quot;metric_type&quot;: &quot;COSINE&quot;,</span>
<span class="hljs-comment">#     &quot;field_name&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">#     &quot;index_name&quot;: &quot;vector_index&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">index</span>.<span class="hljs-property">request</span>.<span class="hljs-property">DescribeIndexReq</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">index</span>.<span class="hljs-property">response</span>.<span class="hljs-property">DescribeIndexResp</span>;

<span class="hljs-comment">// 5. Describe index</span>
<span class="hljs-comment">// 5.1 List the index names</span>
<span class="hljs-title class_">ListIndexesReq</span> listIndexesReq = <span class="hljs-title class_">ListIndexesReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;customized_setup&quot;</span>)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; indexNames = client.<span class="hljs-title function_">listIndexes</span>(listIndexesReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(indexNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;vector_index&quot;</span>
<span class="hljs-comment">// ]</span>

<span class="hljs-comment">// 5.2 Describe an index</span>
<span class="hljs-title class_">DescribeIndexReq</span> describeIndexReq = <span class="hljs-title class_">DescribeIndexReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;customized_setup&quot;</span>)
    .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;vector_index&quot;</span>)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">DescribeIndexResp</span> describeIndexResp = client.<span class="hljs-title function_">describeIndex</span>(describeIndexReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(describeIndexResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//     &quot;metricType&quot;: &quot;COSINE&quot;,</span>
<span class="hljs-comment">//     &quot;indexType&quot;: &quot;AUTOINDEX&quot;,</span>
<span class="hljs-comment">//     &quot;fieldName&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">//     &quot;indexName&quot;: &quot;vector_index&quot;</span>
<span class="hljs-comment">// }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. Describe the index</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res.<span class="hljs-property">index_descriptions</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>))

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &quot;params&quot;: [</span>
<span class="hljs-comment">//       {</span>
<span class="hljs-comment">//         &quot;key&quot;: &quot;index_type&quot;,</span>
<span class="hljs-comment">//         &quot;value&quot;: &quot;AUTOINDEX&quot;</span>
<span class="hljs-comment">//       },</span>
<span class="hljs-comment">//       {</span>
<span class="hljs-comment">//         &quot;key&quot;: &quot;metric_type&quot;,</span>
<span class="hljs-comment">//         &quot;value&quot;: &quot;COSINE&quot;</span>
<span class="hljs-comment">//       }</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &quot;index_name&quot;: &quot;vector_index&quot;,</span>
<span class="hljs-comment">//     &quot;indexID&quot;: &quot;449007919953063141&quot;,</span>
<span class="hljs-comment">//     &quot;field_name&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">//     &quot;indexed_rows&quot;: &quot;0&quot;,</span>
<span class="hljs-comment">//     &quot;total_rows&quot;: &quot;0&quot;,</span>
<span class="hljs-comment">//     &quot;state&quot;: &quot;Finished&quot;,</span>
<span class="hljs-comment">//     &quot;index_state_fail_reason&quot;: &quot;&quot;,</span>
<span class="hljs-comment">//     &quot;pending_index_rows&quot;: &quot;0&quot;</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك التحقق من ملف الفهرس الذي تم إنشاؤه على حقل معين، وجمع إحصائيات عدد الصفوف المفهرسة باستخدام ملف الفهرس هذا.</p>
<h2 id="Drop-an-Index" class="common-anchor-header">إسقاط فهرس<button data-href="#Drop-an-Index" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك ببساطة إسقاط فهرس إذا لم تعد هناك حاجة إليه.</p>
<div class="alert note">
<p>قبل إسقاط فهرس، تأكد أولاً من إصداره.</p>
</div>
<div class="language-python">
<p>لإسقاط فهرس، استخدم <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/drop_index.md"><code translate="no">drop_index()</code></a>.</p>
</div>
<div class="language-java">
<p>لإسقاط فهرس، استخدم . <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/dropIndex.md"><code translate="no">dropIndex()</code></a>.</p>
</div>
<div class="language-javascript">
<p>لإسقاط فهرس، استخدم . <a href="https://milvus.io/api-reference/node/v2.4.x/Management/dropIndex.md"><code translate="no">dropIndex()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 6. Drop index</span>
client.drop_index(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 6. Drop index</span>

<span class="hljs-type">DropIndexReq</span> <span class="hljs-variable">dropIndexReq</span> <span class="hljs-operator">=</span> DropIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup&quot;</span>)
    .indexName(<span class="hljs-string">&quot;vector_index&quot;</span>)
    .build();

client.dropIndex(dropIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 6. Drop the index</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
