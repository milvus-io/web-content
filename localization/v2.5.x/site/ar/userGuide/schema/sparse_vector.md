---
id: sparse_vector.md
title: متجه متناثر
summary: >-
  تُعد المتجهات المتفرقة طريقة مهمة لتمثيل البيانات في استرجاع المعلومات ومعالجة
  اللغات الطبيعية. بينما تشتهر المتجهات الكثيفة بقدراتها الممتازة على الفهم
  الدلالي، إلا أن المتجهات المتفرقة غالباً ما تقدم نتائج أكثر دقة عندما يتعلق
  الأمر بالتطبيقات التي تتطلب مطابقة دقيقة للكلمات أو العبارات الرئيسية.
---
<h1 id="Sparse-Vector​" class="common-anchor-header">المتجهات المتفرقة<button data-href="#Sparse-Vector​" class="anchor-icon" translate="no">
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
    </button></h1><p>تعد المتجهات المتفرقة طريقة مهمة لتمثيل البيانات في استرجاع المعلومات ومعالجة اللغات الطبيعية. بينما تشتهر المتجهات الكثيفة بقدراتها الممتازة على الفهم الدلالي، غالبًا ما توفر المتجهات المتفرقة نتائج أكثر دقة عندما يتعلق الأمر بالتطبيقات التي تتطلب مطابقة دقيقة للكلمات أو العبارات الرئيسية.</p>
<h2 id="Overview​" class="common-anchor-header">نظرة عامة<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>المتجهات المتفرقة هي تمثيل خاص للمتجهات عالية الأبعاد حيث تكون معظم عناصرها صفرية، وبعض أبعادها فقط ذات قيم غير صفرية. هذه الخاصية تجعل المتجهات المتفرقة فعالة بشكل خاص في التعامل مع البيانات واسعة النطاق وعالية الأبعاد ولكن متناثرة. تشمل التطبيقات الشائعة ما يلي.</p>
<ul>
<li><p><strong>تحليل النصوص:</strong> تمثيل المستندات على هيئة متجهات كيس من الكلمات، حيث يتوافق كل بُعد مع كلمة، والكلمات التي تظهر في المستند فقط هي التي لها قيم غير صفرية.</p></li>
<li><p><strong>أنظمة التوصيات:</strong> مصفوفات التفاعل بين المستخدم والعنصر، حيث يمثل كل بُعد تقييم المستخدم لعنصر معين، حيث يتفاعل معظم المستخدمين مع عدد قليل من العناصر فقط.</p></li>
<li><p><strong>معالجة الصور:</strong> تمثيل الميزات المحلية، مع التركيز فقط على النقاط الرئيسية في الصورة، مما ينتج عنه متجهات متناثرة عالية الأبعاد.</p></li>
</ul>
<p>كما هو موضح في الرسم البياني أدناه، عادةً ما يتم تمثيل المتجهات الكثيفة كمصفوفات مستمرة حيث يكون لكل موضع قيمة (على سبيل المثال، <code translate="no">[0.3, 0.8, 0.2, 0.3, 0.1]</code>). في المقابل، تخزّن المتجهات المتفرقة العناصر غير الصفرية ومؤشراتها فقط، وغالبًا ما يتم تمثيلها كأزواج قيمة مفتاح-قيمة (على سبيل المثال، <code translate="no">[{2: 0.2}, ..., {9997: 0.5}, {9999: 0.7}]</code>). يقلل هذا التمثيل بشكل كبير من مساحة التخزين ويزيد من الكفاءة الحسابية، خاصة عند التعامل مع بيانات عالية الأبعاد للغاية (على سبيل المثال، 10000 بُعد).</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/sparse-vector.png" alt="Spare vector representation" class="doc-image" id="spare-vector-representation" />
   </span> <span class="img-wrapper"> <span>تمثيل المتجهات المتفرقة</span> </span></p>
<p>يمكن إنشاء المتجهات المتفرقة باستخدام طرق مختلفة، مثل <a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf">TF-IDF</a> (تردد المصطلح-تردد المستند العكسي) و <a href="https://en.wikipedia.org/wiki/Okapi_BM25">BM25</a> في معالجة النصوص. بالإضافة إلى ذلك، يوفر Milvus طرقًا ملائمة للمساعدة في توليد المتجهات المتفرقة ومعالجتها. لمزيد من التفاصيل، راجع <a href="/docs/ar/embeddings.md">التضمينات</a>.</p>
<p>بالنسبة للبيانات النصية، يوفر Milvus أيضًا إمكانات البحث في النص الكامل، مما يسمح لك بإجراء عمليات بحث عن المتجهات مباشرةً على بيانات النص الخام دون استخدام نماذج تضمين خارجية لإنشاء متجهات متفرقة. لمزيد من المعلومات، راجع <a href="/docs/ar/full-text-search.md">البحث عن النص الكامل</a>.</p>
<p>بعد التحويل إلى متجهات، يمكن تخزين البيانات في ميلفوس لإدارتها واسترجاع المتجهات. يوضح الرسم البياني أدناه العملية الأساسية.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/use-sparse-vector.png" alt="Use sparse vector in Milvus" class="doc-image" id="use-sparse-vector-in-milvus" />
   </span> <span class="img-wrapper"> <span>استخدام المتجهات المتفرقة في ملفوس</span> </span></p>
<div class="alert note">
<p>بالإضافة إلى المتجهات المتناثرة، يدعم ميلفوس أيضًا المتجهات الكثيفة والمتجهات الثنائية. تُعد المتجهات الكثيفة مثالية لالتقاط العلاقات الدلالية العميقة، بينما تتفوق المتجهات الثنائية في سيناريوهات مثل مقارنات التشابه السريعة وإلغاء تكرار المحتوى. لمزيد من المعلومات، راجع المتجهات <a href="/docs/ar/dense-vector.md">الكثيفة</a> <a href="/docs/ar/binary-vector.md">والمتجهات الثنائية</a>.</p>
</div>
<h2 id="Use-sparse-vectors-in-Milvus​" class="common-anchor-header">استخدام المتجهات المتفرقة في ميلفوس<button data-href="#Use-sparse-vectors-in-Milvus​" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم Milvus تمثيل المتجهات المتفرقة بأي من التنسيقات التالية.</p>
<ul>
<li><p>مصفوفة متفرقة (باستخدام فئة <code translate="no">scipy.sparse</code> )</p>
<p><div class="multipleCode">
<a href="#python">بايثون </a><a href="#java">جافا</a><a href="#curl">جافا</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> scipy.sparse <span class="hljs-keyword">import</span> csr_matrix​
​
<span class="hljs-comment"># Create a sparse matrix​</span>
row = [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>]​
col = [<span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>]​
data = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>]​
sparse_matrix = csr_matrix((data, (row, col)), shape=(<span class="hljs-number">3</span>, <span class="hljs-number">3</span>))​
​
<span class="hljs-comment"># Represent sparse vector using the sparse matrix​</span>
sparse_vector = sparse_matrix.getrow(<span class="hljs-number">0</span>)​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>قائمة القواميس (بتنسيق <code translate="no">{dimension_index: value, ...}</code>)</p>
<p><div class="multipleCode">
<a href="#python">بايثون </a><a href="#java">جافا جافا</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Represent sparse vector using a dictionary​</span>
sparse_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.5</span>, <span class="hljs-number">100</span>: <span class="hljs-number">0.3</span>, <span class="hljs-number">500</span>: <span class="hljs-number">0.8</span>, <span class="hljs-number">1024</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">5000</span>: <span class="hljs-number">0.6</span>}]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">SortedMap</span>&lt;<span class="hljs-title class_">Long</span>, <span class="hljs-title class_">Float</span>&gt; sparseVector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();​
sparseVector.<span class="hljs-title function_">put</span>(1L, <span class="hljs-number">0.</span>5f);​
sparseVector.<span class="hljs-title function_">put</span>(100L, <span class="hljs-number">0.</span>3f);​
sparseVector.<span class="hljs-title function_">put</span>(500L, <span class="hljs-number">0.</span>8f);​
sparseVector.<span class="hljs-title function_">put</span>(1024L, <span class="hljs-number">0.</span>2f);​
sparseVector.<span class="hljs-title function_">put</span>(5000L, <span class="hljs-number">0.</span>6f);​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>قائمة القواميس التكرارية (منسقة على <code translate="no">[(dimension_index, value)]</code>)</p>
<p><div class="multipleCode">
<a href="#python">بايثون </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Represent sparse vector using a list of tuples​</span>
sparse_vector = [[(<span class="hljs-number">1</span>, <span class="hljs-number">0.5</span>), (<span class="hljs-number">100</span>, <span class="hljs-number">0.3</span>), (<span class="hljs-number">500</span>, <span class="hljs-number">0.8</span>), (<span class="hljs-number">1024</span>, <span class="hljs-number">0.2</span>), (<span class="hljs-number">5000</span>, <span class="hljs-number">0.6</span>)]]​

<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Add-vector-field​" class="common-anchor-header">إضافة حقل متجه</h3><p>لاستخدام المتجهات المتفرقة في Milvus، قم بتعريف حقل لتخزين المتجهات المتفرقة عند إنشاء مجموعة. تتضمن هذه العملية.</p>
<ol>
<li><p>تعيين <code translate="no">datatype</code> إلى نوع بيانات المتجهات المتفرقة المدعومة، <code translate="no">SPARSE_FLOAT_VECTOR</code>.</p></li>
<li><p>لا حاجة لتحديد البُعد.</p></li>
</ol>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
​
client.drop_collection(collection_name=<span class="hljs-string">&quot;my_sparse_collection&quot;</span>)​
​
schema = client.create_schema(​
    auto_id=<span class="hljs-literal">True</span>,​
    enable_dynamic_fields=<span class="hljs-literal">True</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
        ​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)​
        .dataType(DataType.VarChar)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .autoID(<span class="hljs-literal">true</span>)​
        .maxLength(<span class="hljs-number">100</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;sparse_vector&quot;</span>)​
        .dataType(DataType.SparseFloatVector)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> schema = [​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,​
  }​
];​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;pk&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;isPrimary&quot;: true,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 100​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;sparse_vector&quot;,​
    &quot;dataType&quot;: &quot;SparseFloatVector&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: true,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، تمت إضافة حقل متجه باسم <code translate="no">sparse_vector</code> لتخزين المتجهات المتفرقة. نوع بيانات هذا الحقل هو <code translate="no">SPARSE_FLOAT_VECTOR</code>.</p>
<h3 id="Set-index-params-for-vector-field​" class="common-anchor-header">تعيين بارامترات الفهرس للحقل المتجه</h3><p>تشبه عملية إنشاء فهرس للمتجهات المتفرقة عملية إنشاء فهرس للمتجهات <a href="/docs/ar/dense-vector.md">الكثيفة،</a> ولكن مع وجود اختلافات في نوع الفهرس المحدد (<code translate="no">index_type</code>)، ومقياس المسافة (<code translate="no">metric_type</code>)، ومعلمات الفهرس (<code translate="no">params</code>).</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#curl">جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()​
​
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,​
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
    <span class="hljs-keyword">params</span>={<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>},​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;​
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.*;​
​
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
extraParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;drop_ratio_build&quot;</span>, <span class="hljs-number">0.2</span>);​
indexes.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)​
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">IP</span>)​
        .<span class="hljs-title function_">extraParams</span>(extraParams)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = <span class="hljs-keyword">await</span> client.createIndex({​
    index_name: <span class="hljs-string">&#x27;sparse_inverted_index&#x27;</span>,​
    field_name: <span class="hljs-string">&#x27;sparse_vector&#x27;</span>,​
    metric_type: MetricType.IP,​
    index_type: IndexType.SPARSE_WAND,​
    <span class="hljs-keyword">params</span>: {​
      drop_ratio_build: <span class="hljs-number">0.2</span>,​
    },​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;sparse_vector&quot;,​
            &quot;metricType&quot;: &quot;IP&quot;,​
            &quot;indexName&quot;: &quot;sparse_inverted_index&quot;,​
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;,​
            &quot;params&quot;:{&quot;drop_ratio_build&quot;: 0.2}​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>في المثال أعلاه.</p>
<ul>
<li><p>يتم إنشاء فهرس من النوع <code translate="no">SPARSE_INVERTED_INDEX</code> للمتجه المتناثر. بالنسبة للمتجهات المتناثرة، يمكنك تحديد <code translate="no">SPARSE_INVERTED_INDEX</code> أو <code translate="no">SPARSE_WAND</code>. لمزيد من التفاصيل، راجع <a href="https://milvus.io/docs/index.md?tab=sparse">فهارس المتجهات المتفرقة</a>.</p></li>
<li><p>بالنسبة للمتجهات المتناثرة، يدعم <code translate="no">metric_type</code> فقط <code translate="no">IP</code> (الضرب الداخلي)، ويستخدم لقياس التشابه بين متجهين متناثرين. للمزيد من المعلومات حول التشابه، راجع <a href="/docs/ar/metric.md">أنواع المتجهات المترية</a>.</p></li>
<li><p><code translate="no">drop_ratio_build</code> هي معلمة فهرس اختيارية مخصصة للمتجهات المتفرقة. تتحكم في نسبة قيم المتجهات الصغيرة المستبعدة أثناء بناء الفهرس. على سبيل المثال، باستخدام <code translate="no">{&quot;drop_ratio_build&quot;: 0.2}</code> ، سيتم استبعاد أصغر 20٪ من قيم المتجهات أثناء إنشاء الفهرس، مما يقلل من الجهد الحسابي أثناء عمليات البحث.</p></li>
</ul>
<h3 id="Create-collection​" class="common-anchor-header">إنشاء مجموعة</h3><p>بمجرد اكتمال إعدادات المتجهات المتناثرة والفهرس، يمكنك إنشاء مجموعة تحتوي على متجهات متفرقة. يستخدم المثال أدناه طريقة <ins><code translate="no">create_collection</code></ins> لإنشاء مجموعة باسم <code translate="no">my_sparse_collection</code>.</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#curl">جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;my_sparse_collection&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
        ​
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_sparse_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexes)​
        .build();​
client.createCollection(requestCreate);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({​
    <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>​
});​
​
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_sparse_collection&#x27;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">index_params</span>: indexParams​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_sparse_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data​" class="common-anchor-header">إدراج البيانات</h3><p>بعد إنشاء المجموعة، أدخل البيانات التي تحتوي على متجهات متفرقة.</p>
<div class="multipleCode">
   <a href="#python">بيثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">sparse_vectors = [​
    {<span class="hljs-string">&quot;sparse_vector&quot;</span>: {<span class="hljs-number">1</span>: <span class="hljs-number">0.5</span>, <span class="hljs-number">100</span>: <span class="hljs-number">0.3</span>, <span class="hljs-number">500</span>: <span class="hljs-number">0.8</span>}},​
    {<span class="hljs-string">&quot;sparse_vector&quot;</span>: {<span class="hljs-number">10</span>: <span class="hljs-number">0.1</span>, <span class="hljs-number">200</span>: <span class="hljs-number">0.7</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.9</span>}},​
]​
​
client.<span class="hljs-title function_">insert</span>(​
    collection_name=<span class="hljs-string">&quot;my_sparse_collection&quot;</span>,​
    data=sparse_vectors​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
{​
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
    SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();​
    sparse.put(<span class="hljs-number">1L</span>, <span class="hljs-number">0.5f</span>);​
    sparse.put(<span class="hljs-number">100L</span>, <span class="hljs-number">0.3f</span>);​
    sparse.put(<span class="hljs-number">500L</span>, <span class="hljs-number">0.8f</span>);​
    row.add(<span class="hljs-string">&quot;sparse_vector&quot;</span>, gson.toJsonTree(sparse));​
    rows.add(row);​
}​
{​
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
    SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();​
    sparse.put(<span class="hljs-number">10L</span>, <span class="hljs-number">0.1f</span>);​
    sparse.put(<span class="hljs-number">200L</span>, <span class="hljs-number">0.7f</span>);​
    sparse.put(<span class="hljs-number">1000L</span>, <span class="hljs-number">0.9f</span>);​
    row.add(<span class="hljs-string">&quot;sparse_vector&quot;</span>, gson.toJsonTree(sparse));​
    rows.add(row);​
}​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_sparse_collection&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
  { <span class="hljs-attr">sparse_vector</span>: { <span class="hljs-string">&quot;1&quot;</span>: <span class="hljs-number">0.5</span>, <span class="hljs-string">&quot;100&quot;</span>: <span class="hljs-number">0.3</span>, <span class="hljs-string">&quot;500&quot;</span>: <span class="hljs-number">0.8</span> } },​
  { <span class="hljs-attr">sparse_vector</span>: { <span class="hljs-string">&quot;10&quot;</span>: <span class="hljs-number">0.1</span>, <span class="hljs-string">&quot;200&quot;</span>: <span class="hljs-number">0.7</span>, <span class="hljs-string">&quot;1000&quot;</span>: <span class="hljs-number">0.9</span> } },​
];​
client.<span class="hljs-title function_">insert</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_sparse_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: data,​
});​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {&quot;sparse_vector&quot;: {&quot;1&quot;: 0.5, &quot;100&quot;: 0.3, &quot;500&quot;: 0.8}},​
        {&quot;sparse_vector&quot;: {&quot;10&quot;: 0.1, &quot;200&quot;: 0.7, &quot;1000&quot;: 0.9}}        ​
    ],​
    &quot;collectionName&quot;: &quot;my_sparse_collection&quot;​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:{&quot;insertCount&quot;:2,&quot;insertIds&quot;:[&quot;453577185629572534&quot;,&quot;453577185629572535&quot;]}}​</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search​" class="common-anchor-header">إجراء بحث التشابه</h3><p>لإجراء بحث التشابه باستخدام متجهات متناثرة، قم بإعداد متجه الاستعلام ومعلمات البحث.</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare search parameters​</span>
search_params = {​
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># Additional optional search parameters​</span>
}​
​
<span class="hljs-comment"># Prepare the query vector​</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]​

<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، <code translate="no">drop_ratio_search</code> هي معلمة اختيارية مخصصة للمتجهات المتناثرة، مما يسمح بضبط القيم الصغيرة في متجه الاستعلام أثناء البحث. على سبيل المثال، باستخدام <code translate="no">{&quot;drop_ratio_search&quot;: 0.2}</code> ، سيتم تجاهل أصغر 20% من القيم في متجه الاستعلام أثناء البحث.</p>
<p>بعد ذلك، قم بتنفيذ بحث التشابه باستخدام الطريقة <code translate="no">search</code>.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_sparse_collection&quot;</span>,​
    data=query_vector,​
    <span class="hljs-built_in">limit</span>=3,​
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>],​
    search_params=search_params,​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: &#x27;453718927992172266&#x27;, &#x27;distance&#x27;: 0.6299999952316284, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172266&#x27;}}, {&#x27;id&#x27;: &#x27;453718927992172265&#x27;, &#x27;distance&#x27;: 0.10000000149011612, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172265&#x27;}}]&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">SearchReq</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">data</span>.<span class="hljs-property">SparseFloatVec</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">response</span>.<span class="hljs-property">SearchResp</span>;​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
searchParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0.2</span>);​
​
<span class="hljs-title class_">SortedMap</span>&lt;<span class="hljs-title class_">Long</span>, <span class="hljs-title class_">Float</span>&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();​
sparse.<span class="hljs-title function_">put</span>(10L, <span class="hljs-number">0.</span>1f);​
sparse.<span class="hljs-title function_">put</span>(200L, <span class="hljs-number">0.</span>7f);​
sparse.<span class="hljs-title function_">put</span>(1000L, <span class="hljs-number">0.</span>9f);​
​
<span class="hljs-title class_">SparseFloatVec</span> queryVector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SparseFloatVec</span>(sparse);​
​
<span class="hljs-title class_">SearchResp</span> searchR = client.<span class="hljs-title function_">search</span>(<span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;my_sparse_collection&quot;</span>)​
        .<span class="hljs-title function_">data</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(queryVector))​
        .<span class="hljs-title function_">annsField</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)​
        .<span class="hljs-title function_">searchParams</span>(searchParams)​
        .<span class="hljs-title function_">topK</span>(<span class="hljs-number">3</span>)​
        .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-string">&quot;pk&quot;</span>))​
        .<span class="hljs-title function_">build</span>());​
        ​
<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(searchR.<span class="hljs-title function_">getSearchResults</span>());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={pk=453444327741536759}, score=1.31, id=453444327741536759), SearchResp.SearchResult(entity={pk=453444327741536756}, score=1.31, id=453444327741536756), SearchResp.SearchResult(entity={pk=453444327741536753}, score=1.31, id=453444327741536753)]]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.search({​
    collection_name: <span class="hljs-string">&#x27;my_sparse_collection&#x27;</span>,​
    data: {1: 0.2, 50: 0.4, 1000: 0.7},​
    <span class="hljs-built_in">limit</span>: 3,​
    output_fields: [<span class="hljs-string">&#x27;pk&#x27;</span>],​
    params: {​
        drop_ratio_search: 0.2​
    }​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_sparse_collection&quot;,​
    &quot;data&quot;: [​
        {&quot;1&quot;: 0.2, &quot;50&quot;: 0.4, &quot;1000&quot;: 0.7}​
    ],​
    &quot;annsField&quot;: &quot;sparse_vector&quot;,​
    &quot;limit&quot;: 3,​
    &quot;searchParams&quot;:{​
        &quot;params&quot;:{&quot;drop_ratio_search&quot;: 0.2}​
    },​
    &quot;outputFields&quot;: [&quot;pk&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;distance&quot;:0.63,&quot;id&quot;:&quot;453577185629572535&quot;,&quot;pk&quot;:&quot;453577185629572535&quot;},{&quot;distance&quot;:0.1,&quot;id&quot;:&quot;453577185629572534&quot;,&quot;pk&quot;:&quot;453577185629572534&quot;}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من المعلومات حول معلمات البحث عن التشابه، راجع <a href="/docs/ar/single-vector-search.md">بحث التشابه الأساسي</a>.</p>
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
    </button></h2><p>عند استخدام المتجهات المتفرقة في ميلفوس، ضع في اعتبارك الحدود التالية:</p>
<ul>
<li><p>حاليًا، يتم دعم مقاييس المسافة <strong>IP</strong> و <strong>BM25</strong> (للبحث في النص الكامل) فقط للمتجهات المتفرقة. إن الأبعاد العالية للمتجهات المتفرقة تجعل المسافة L2 ومسافة جيب التمام غير عملية.</p></li>
<li><p>بالنسبة لحقول المتجهات المتناثرة، يتم دعم أنواع الفهرس <strong>SPARSE_INVERTED_INDEX</strong> و <strong>SPARSE_WAND</strong> فقط.</p></li>
<li><p>أنواع البيانات المدعومة للمتجهات المتفرقة:</p>
<ul>
<li>يجب أن يكون جزء البُعد عددًا صحيحًا غير موقع 32 بت;</li>
<li>يمكن أن يكون جزء القيمة رقمًا عائمًا غير سالب 32 بت غير سالب.</li>
</ul></li>
<li><p>يجب أن تستوفي المتجهات المتفرقة المتطلبات التالية للإدراج والبحث:</p>
<ul>
<li>قيمة واحدة على الأقل في المتجه لا تساوي صفرًا;</li>
<li>مؤشرات المتجهات غير سالبة.</li>
</ul></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">الأسئلة الشائعة<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>هل يمكنكم شرح الفرق بين SPARSE_INVERTED_INDEX و SPARSE_WAND، وكيف يمكنني الاختيار بينهما؟</strong></p>
<p><strong>SPARSE_INVERTED_INDEX</strong> هو فهرس مقلوب تقليدي، بينما يستخدم <strong>SPARSE_WAND</strong> خوارزمية <strong>SPARSE_WAND</strong> خوارزمية <a href="https://dl.acm.org/doi/10.1145/956863.956944">ضعيفة-AND</a> لتقليل عدد تقييمات مسافة IP الكاملة أثناء البحث. عادةً ما تكون <strong>SPARSE_WAND</strong> أسرع، لكن أداءها يمكن أن ينخفض مع زيادة كثافة المتجهات. للاختيار بينها، قم بإجراء التجارب والمعايير بناءً على مجموعة البيانات وحالة الاستخدام الخاصة بك.</p></li>
<li><p><strong>كيف يمكنني اختيار معلمات drop_ratio_build و drop_ratio_search؟</strong></p>
<p>يعتمد اختيار <strong>دروب_راتيو_بناء</strong> <strong>ودروب_راتيو_بحث</strong> على خصائص بياناتك ومتطلباتك من حيث زمن انتقال/إنتاجية البحث والدقة.</p></li>
<li><p><strong>هل يمكن أن يكون بُعد التضمين المتناثر أي قيمة منفصلة ضمن فضاء uint32؟</strong></p>
<p>نعم، مع استثناء واحد. يمكن أن يكون بُعد التضمين المتناثر أي قيمة في نطاق <code translate="no">[0, maximum of uint32)</code>. هذا يعني أنه لا يمكنك استخدام القيمة القصوى ل uint32.</p></li>
<li><p><strong>هل تجرى عمليات البحث على المقاطع المتزايدة من خلال فهرس أم بالقوة الغاشمة؟</strong></p>
<p>تجرى عمليات البحث على المقاطع المتنامية من خلال فهرس من نفس نوع فهرس المقطع المختوم. بالنسبة للمقاطع المتنامية الجديدة قبل إنشاء الفهرس، يتم استخدام البحث بالقوة الغاشمة.</p></li>
<li><p><strong>هل من الممكن وجود متجهات متناثرة وكثيفة في مجموعة واحدة؟</strong></p>
<p>نعم، مع دعم أنواع المتجهات المتعددة، يمكنك إنشاء مجموعات مع كل من أعمدة المتجهات المتفرقة والكثيفة وإجراء عمليات بحث مختلطة عليها.</p></li>
</ul>