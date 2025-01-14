---
id: array_data_type.md
title: حقل المصفوفة
summary: >-
  يُستخدم نوع المصفوفة لتخزين الحقول التي تحتوي على قيم متعددة من نفس نوع
  البيانات. ويوفر طريقة مرنة لتخزين السمات ذات العناصر المتعددة، مما يجعلها
  مفيدة بشكل خاص في السيناريوهات التي تحتاج إلى حفظ مجموعة من البيانات ذات
  الصلة. في Milvus، يمكنك تخزين حقول المصفوفات جنبًا إلى جنب مع البيانات
  المتجهة، مما يتيح متطلبات استعلام وتصفية أكثر تعقيدًا.
---
<h1 id="Array-Field​" class="common-anchor-header">حقل المصفوفة<button data-href="#Array-Field​" class="anchor-icon" translate="no">
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
    </button></h1><p>يُستخدم نوع المصفوفة لتخزين الحقول التي تحتوي على قيم متعددة من نفس نوع البيانات. يوفر طريقة مرنة لتخزين السمات ذات العناصر المتعددة، مما يجعلها مفيدة بشكل خاص في السيناريوهات التي تحتاج إلى حفظ مجموعة من البيانات ذات الصلة. في Milvus، يمكنك تخزين حقول المصفوفات جنبًا إلى جنب مع البيانات المتجهة، مما يتيح متطلبات استعلام وتصفية أكثر تعقيدًا.</p>
<p>على سبيل المثال، في نظام التوصية بالموسيقى، يمكن لحقل المصفوفة تخزين قائمة علامات لأغنية ما؛ وفي تحليل سلوك المستخدم، يمكن تخزين تقييمات المستخدمين للأغاني. فيما يلي مثال لحقل مصفوفة نموذجي.</p>
<pre><code translate="no" class="language-JSON">{​
  <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;pop&quot;</span>, <span class="hljs-string">&quot;rock&quot;</span>, <span class="hljs-string">&quot;classic&quot;</span>],​
  <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>]​
}​

<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، <code translate="no">tags</code> و <code translate="no">ratings</code> كلاهما حقلا مصفوفة. الحقل <code translate="no">tags</code> عبارة عن مصفوفة سلاسل تمثل أنواع الأغاني مثل البوب والروك والكلاسيكية، بينما الحقل <code translate="no">ratings</code> عبارة عن مصفوفة أعداد صحيحة تمثل تقييمات المستخدمين للأغنية، والتي تتراوح من 1 إلى 5. توفر حقول المصفوفات هذه طريقة مرنة لتخزين البيانات متعددة القيم، مما يسهل إجراء تحليل مفصل أثناء الاستعلامات والتصفية.</p>
<h2 id="Add-Array-field​" class="common-anchor-header">إضافة حقل مصفوفة<button data-href="#Add-Array-field​" class="anchor-icon" translate="no">
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
    </button></h2><p>لاستخدام حقول المصفوفات في Milvus، قم بتعريف نوع الحقل ذي الصلة عند إنشاء مخطط المجموعة. تتضمن هذه العملية.</p>
<ol>
<li><p>تعيين <code translate="no">datatype</code> إلى نوع بيانات المصفوفات المدعوم، <code translate="no">ARRAY</code>.</p></li>
<li><p>استخدام المعلمة <code translate="no">element_type</code> لتحديد نوع بيانات العناصر في المصفوفة. يمكن أن يكون هذا أي نوع بيانات قياسي مدعوم من قبل Milvus، مثل <code translate="no">VARCHAR</code> أو <code translate="no">INT64</code>. يجب أن تكون جميع العناصر في نفس المصفوفة من نفس نوع البيانات.</p></li>
<li><p>استخدام المعلمة <code translate="no">max_capacity</code> لتحديد السعة القصوى للمصفوفة، أي الحد الأقصى لعدد العناصر التي يمكن أن تحتويها.</p></li>
</ol>
<p>إليك كيفية تعريف مخطط مجموعة يتضمن حقول المصفوفات.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
​
schema = client.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    enable_dynamic_fields=<span class="hljs-literal">True</span>,​
)​
​
<span class="hljs-comment"># Add an Array field with elements of type VARCHAR​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;tags&quot;</span>, datatype=DataType.ARRAY, element_type=DataType.VARCHAR, max_capacity=<span class="hljs-number">10</span>)​
<span class="hljs-comment"># Add an Array field with elements of type INT64​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;ratings&quot;</span>, datatype=DataType.ARRAY, element_type=DataType.INT64, max_capacity=<span class="hljs-number">5</span>)​
​
<span class="hljs-comment"># Add primary field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
​
<span class="hljs-comment"># Add vector field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
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
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)​
        .dataType(DataType.Array)​
        .elementType(DataType.VarChar)​
        .maxCapacity(<span class="hljs-number">10</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;ratings&quot;</span>)​
        .dataType(DataType.Array)​
        .elementType(DataType.Int64)​
        .maxCapacity(<span class="hljs-number">5</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)​
        .dataType(DataType.Int64)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">3</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
<span class="hljs-keyword">const</span> schema = [​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;tags&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,​
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">10</span>,​
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">65535</span>​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;rating&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,​
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
    <span class="hljs-attr">dim</span>: <span class="hljs-number">3</span>,​
  },​
];​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> arrayField1=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;tags&quot;,​
    &quot;dataType&quot;: &quot;Array&quot;,​
    &quot;elementDataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_capacity&quot;: 10,​
        &quot;max_length&quot;: 100​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> arrayField2=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;ratings&quot;,​
    &quot;dataType&quot;: &quot;Array&quot;,​
    &quot;elementDataType&quot;: &quot;Int64&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_capacity&quot;: 5​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;pk&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;embedding&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 3​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$arrayField1</span>,​
        <span class="hljs-variable">$arrayField2</span>,​
        <span class="hljs-variable">$pkField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال</p>
<ul>
<li><p><code translate="no">tags</code> هي مصفوفة سلاسل مع ضبط <code translate="no">element_type</code> على <code translate="no">VARCHAR</code> ، مما يشير إلى أن العناصر في المصفوفة يجب أن تكون سلاسل. <code translate="no">max_capacity</code> مضبوطة على 10، مما يعني أن المصفوفة يمكن أن تحتوي على ما يصل إلى 10 عناصر.</p></li>
<li><p><code translate="no">ratings</code> هي مصفوفة عدد صحيح مع تعيين <code translate="no">element_type</code> إلى <code translate="no">INT64</code> ، مما يشير إلى أن العناصر يجب أن تكون أعدادًا صحيحة. <code translate="no">max_capacity</code> مضبوط على 5، مما يسمح بما يصل إلى 5 تصنيفات.</p></li>
<li><p>نضيف أيضًا حقل مفتاح أساسي <code translate="no">pk</code> وحقل متجه <code translate="no">embedding</code>.</p></li>
</ul>
<div class="alert note">
<p>يكون الحقل الأساسي وحقل المتجه إلزاميًا عند إنشاء مجموعة. يعرّف الحقل الأساسي كل كيان بشكل فريد، في حين أن الحقل المتجه مهم للبحث عن التشابه. للمزيد من التفاصيل، راجع <a href="/docs/ar/primary-field.md">الحقل الأساسي والمعرف التلقائي</a> أو <a href="/docs/ar/dense-vector.md">المتجه الكثيف</a> أو <a href="/docs/ar/binary-vector.md">المتجه الثنائي</a> أو <a href="/docs/ar/sparse_vector.md">المتجه المتناثر</a>.</p>
</div>
<h2 id="Set-index-params​" class="common-anchor-header">تعيين معلمات الفهرس<button data-href="#Set-index-params​" class="anchor-icon" translate="no">
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
    </button></h2><p>يعد تعيين معلمات الفهرس لحقول المصفوفة أمرًا اختياريًا ولكن يمكن أن يحسن كفاءة الاسترجاع بشكل كبير.</p>
<p>في المثال التالي، نقوم بإنشاء <code translate="no">AUTOINDEX</code> للحقل <code translate="no">tags</code> ، مما يعني أن ميلفوس سيقوم تلقائيًا بإنشاء فهرس قياسي مناسب بناءً على نوع البيانات.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters​</span>
index_params = client.prepare_index_params()  <span class="hljs-comment"># Prepare IndexParams object​</span>
​
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;tags&quot;</span>,  <span class="hljs-comment"># Name of the Array field to index​</span>
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Index type​</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span>  <span class="hljs-comment"># Index name​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;​
<span class="hljs-keyword">import</span> java.util.*;​
​
List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
indexes.add(IndexParam.builder()​
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)​
        .indexName(<span class="hljs-string">&quot;inverted_index&quot;</span>)​
        .indexType(IndexParam.IndexType.AUTOINDEX)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = [{​
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;inverted_index&#x27;</span>,​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;tags&#x27;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,​
)];​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;tags&quot;,​
            &quot;indexName&quot;: &quot;inverted_index&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>بالإضافة إلى <code translate="no">AUTOINDEX</code> ، يمكنك تحديد أنواع الفهارس العددية الأخرى مثل <code translate="no">INVERTED</code> أو <code translate="no">BITMAP</code>. لمعرفة أنواع الفهارس المدعومة، راجع <a href="/docs/ar/index-scalar-fields.md">الفهارس العددية</a>.</p>
<p>علاوة على ذلك، يجب عليك إنشاء فهرس للحقل المتجه قبل إنشاء المجموعة. في هذا المثال، نستخدم في هذا المثال <code translate="no">AUTOINDEX</code> لتبسيط إعداد الفهرس المتجه.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add vector index​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Use automatic indexing to simplify complex index settings​</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>  <span class="hljs-comment"># Specify similarity metric type, such as L2, COSINE, or IP​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">indexes.<span class="hljs-keyword">add</span>(IndexParam.builder()​
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .indexType(IndexParam.IndexType.AUTOINDEX)​
        .metricType(IndexParam.MetricType.COSINE)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"> indexParams.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;embedding_index&#x27;</span>,​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;embedding&#x27;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;tags&quot;,​
            &quot;indexName&quot;: &quot;inverted_index&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        },​
        {​
            &quot;fieldName&quot;: &quot;embedding&quot;,​
            &quot;metricType&quot;: &quot;COSINE&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-collection​" class="common-anchor-header">إنشاء مجموعة<button data-href="#Create-collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم المخطط المحدد ومعلمات الفهرس لإنشاء مجموعة.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;my_array_collection&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_array_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexes)​
        .build();​
client.createCollection(requestCreate);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">create_collection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_array_collection&quot;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">index_params</span>: indexParams​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_array_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data​" class="common-anchor-header">إدراج البيانات<button data-href="#Insert-data​" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد إنشاء المجموعة، يمكنك إدراج البيانات التي تتضمن حقول المصفوفة.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">data = [​
    {​
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;pop&quot;</span>, <span class="hljs-string">&quot;rock&quot;</span>, <span class="hljs-string">&quot;classic&quot;</span>],​
        <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>],​
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,​
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]​
    },​
    {​
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;jazz&quot;</span>, <span class="hljs-string">&quot;blues&quot;</span>],​
        <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>],​
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,​
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.78</span>, <span class="hljs-number">0.91</span>, <span class="hljs-number">0.23</span>]​
    },​
    {​
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronic&quot;</span>, <span class="hljs-string">&quot;dance&quot;</span>],​
        <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>],​
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,​
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.67</span>, <span class="hljs-number">0.45</span>, <span class="hljs-number">0.89</span>]​
    }​
]​
​
client.<span class="hljs-title function_">insert</span>(​
    collection_name=<span class="hljs-string">&quot;my_array_collection&quot;</span>,​
    data=data​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;tags\&quot;: [\&quot;pop\&quot;, \&quot;rock\&quot;, \&quot;classic\&quot;], \&quot;ratings\&quot;: [5, 4, 3], \&quot;pk\&quot;: 1, \&quot;embedding\&quot;: [0.1, 0.2, 0.3]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;tags\&quot;: [\&quot;jazz\&quot;, \&quot;blues\&quot;], \&quot;ratings\&quot;: [4, 5], \&quot;pk\&quot;: 2, \&quot;embedding\&quot;: [0.4, 0.5, 0.6]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;tags\&quot;: [\&quot;electronic\&quot;, \&quot;dance\&quot;], \&quot;ratings\&quot;: [3, 3, 4], \&quot;pk\&quot;: 3, \&quot;embedding\&quot;: [0.7, 0.8, 0.9]}&quot;</span>, JsonObject.class));​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_array_collection&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
    {​
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;pop&quot;</span>, <span class="hljs-string">&quot;rock&quot;</span>, <span class="hljs-string">&quot;classic&quot;</span>],​
        <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>],​
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,​
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]​
    },​
    {​
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;jazz&quot;</span>, <span class="hljs-string">&quot;blues&quot;</span>],​
        <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>],​
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,​
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.78</span>, <span class="hljs-number">0.91</span>, <span class="hljs-number">0.23</span>]​
    },​
    {​
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronic&quot;</span>, <span class="hljs-string">&quot;dance&quot;</span>],​
        <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>],​
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,​
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.67</span>, <span class="hljs-number">0.45</span>, <span class="hljs-number">0.89</span>]​
    }​
];​
​
client.<span class="hljs-title function_">insert</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_array_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: data,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {​
        &quot;tags&quot;: [&quot;pop&quot;, &quot;rock&quot;, &quot;classic&quot;],​
        &quot;ratings&quot;: [5, 4, 3],​
        &quot;pk&quot;: 1,​
        &quot;embedding&quot;: [0.12, 0.34, 0.56]​
    },​
    {​
        &quot;tags&quot;: [&quot;jazz&quot;, &quot;blues&quot;],​
        &quot;ratings&quot;: [4, 5],​
        &quot;pk&quot;: 2,​
        &quot;embedding&quot;: [0.78, 0.91, 0.23]​
    },​
    {​
        &quot;tags&quot;: [&quot;electronic&quot;, &quot;dance&quot;],​
        &quot;ratings&quot;: [3, 3, 4],​
        &quot;pk&quot;: 3,​
        &quot;embedding&quot;: [0.67, 0.45, 0.89]​
    }       ​
    ],​
    &quot;collectionName&quot;: &quot;my_array_collection&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال</p>
<ul>
<li><p>يتضمن كل إدخال بيانات حقلًا أساسيًا (<code translate="no">pk</code>)، بينما <code translate="no">tags</code> و <code translate="no">ratings</code> هما حقلا مصفوفة يستخدمان لتخزين العلامات والتقييمات.</p></li>
<li><p><code translate="no">embedding</code> هو حقل متجه ثلاثي الأبعاد يستخدم لعمليات البحث عن التشابه المتجه.</p></li>
</ul>
<h2 id="Search-and-query​" class="common-anchor-header">البحث والاستعلام<button data-href="#Search-and-query​" class="anchor-icon" translate="no">
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
    </button></h2><p>تعمل حقول المصفوفات على تمكين التصفية العددية أثناء عمليات البحث، مما يعزز قدرات البحث المتجهية في ميلفوس. يمكنك الاستعلام بناءً على خصائص حقول المصفوفات إلى جانب عمليات البحث عن التشابه المتجه.</p>
<h3 id="Filter-queries​" class="common-anchor-header">تصفية الاستعلامات</h3><p>يمكنك تصفية البيانات استنادًا إلى خصائص حقول المصفوفة، مثل الوصول إلى عنصر معين أو التحقق مما إذا كان عنصر المصفوفة يفي بشرط معين.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ratings[0] &lt; 4&#x27;</span>​
​
res = client.query(​
    collection_name=<span class="hljs-string">&quot;my_array_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    output_fields=[<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;{&#x27;pk&#x27;: 3, &#x27;tags&#x27;: [&#x27;electronic&#x27;, &#x27;dance&#x27;], &#x27;ratings&#x27;: [3, 3, 4], &#x27;embedding&#x27;: [np.float32(0.67), np.float32(0.45), np.float32(0.89)]}&quot;] ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;​
​
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ratings[0] &lt; 4&quot;</span>;​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_array_collection&quot;</span>)​
        .filter(filter)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>))​
        .build());​
​
System.out.println(resp.getQueryResults());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [QueryResp.QueryResult(entity={ratings=[3, 3, 4], pk=3, embedding=[0.7, 0.8, 0.9], tags=[electronic, dance]})]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.query({​
    collection_name: <span class="hljs-string">&#x27;my_array_collection&#x27;</span>,​
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;ratings[0] &lt; 4&#x27;</span>,​
    output_fields: [<span class="hljs-string">&#x27;tags&#x27;</span>, <span class="hljs-string">&#x27;ratings&#x27;</span>, <span class="hljs-string">&#x27;embedding&#x27;</span>]​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_array_collection&quot;,​
    &quot;filter&quot;: &quot;ratings[0] &lt; 4&quot;,​
    &quot;outputFields&quot;: [&quot;tags&quot;, &quot;ratings&quot;, &quot;embedding&quot;]​
}&#x27;</span>​
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;embedding&quot;:[0.67,0.45,0.89],&quot;pk&quot;:3,&quot;ratings&quot;:{&quot;Data&quot;:{&quot;LongData&quot;:{&quot;data&quot;:[3,3,4]}}},&quot;tags&quot;:{&quot;Data&quot;:{&quot;StringData&quot;:{&quot;data&quot;:[&quot;electronic&quot;,&quot;dance&quot;]}}}}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>في هذا الاستعلام، يقوم Milvus بتصفية الكيانات التي يكون فيها العنصر الأول من المصفوفة <code translate="no">ratings</code> أقل من 4، مع إرجاع الكيانات التي تطابق الشرط.</p>
<h3 id="Vector-search-with-Array-filtering​" class="common-anchor-header">البحث المتجه مع تصفية المصفوفة</h3><p>من خلال الجمع بين تشابه المتجهات مع تصفية المصفوفات، يمكنك التأكد من أن البيانات المسترجعة ليست متشابهة في الدلالات فحسب، بل تفي أيضًا بشروط محددة، مما يجعل نتائج البحث أكثر دقة وتوافقًا مع احتياجات العمل.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags[0] == &quot;pop&quot;&#x27;</span>​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_array_collection&quot;</span>,​
    data=[[<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>]],​
    limit=<span class="hljs-number">5</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    output_fields=[<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: 1.1276001930236816, &#x27;entity&#x27;: {&#x27;ratings&#x27;: [5, 4, 3], &#x27;embedding&#x27;: [0.11999999731779099, 0.3400000035762787, 0.5600000023841858], &#x27;tags&#x27;: [&#x27;pop&#x27;, &#x27;rock&#x27;, &#x27;classic&#x27;]}}]&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;​
​
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;tags[0] == \&quot;pop\&quot;&quot;</span>;​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_array_collection&quot;</span>)​
        .annsField(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3f</span>, -<span class="hljs-number">0.6f</span>, <span class="hljs-number">0.1f</span>})))​
        .topK(<span class="hljs-number">5</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>))​
        .filter(filter)​
        .build());​
​
System.out.println(resp.getSearchResults());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={ratings=[5, 4, 3], embedding=[0.1, 0.2, 0.3], tags=[pop, rock, classic]}, score=-0.2364331, id=1)]]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.search({​
    collection_name: <span class="hljs-string">&#x27;my_array_collection&#x27;</span>,​
    data: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>],​
    limit: <span class="hljs-number">5</span>,​
    output_fields: [<span class="hljs-string">&#x27;tags&#x27;</span>, <span class="hljs-string">&#x27;ratings&#x27;</span>, <span class="hljs-string">&#x27;embdding&#x27;</span>],​
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;tags[0] == &quot;pop&quot;&#x27;</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_array_collection&quot;,​
    &quot;data&quot;: [​
        [0.3, -0.6, 0.1]​
    ],​
    &quot;annsField&quot;: &quot;embedding&quot;,​
    &quot;limit&quot;: 5,​
    &quot;filter&quot;: &quot;tags[0] == \&quot;pop\&quot;&quot;,​
    &quot;outputFields&quot;: [&quot;tags&quot;, &quot;ratings&quot;, &quot;embedding&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;distance&quot;:-0.24793813,&quot;embedding&quot;:[0.12,0.34,0.56],&quot;id&quot;:1,&quot;ratings&quot;:{&quot;Data&quot;:{&quot;LongData&quot;:{&quot;data&quot;:[5,4,3]}}},&quot;tags&quot;:{&quot;Data&quot;:{&quot;StringData&quot;:{&quot;data&quot;:[&quot;pop&quot;,&quot;rock&quot;,&quot;classic&quot;]}}}}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، يقوم Milvus بإرجاع أفضل 5 كيانات الأكثر تشابهًا مع متجه الاستعلام، حيث يكون العنصر الأول في مصفوفة <code translate="no">tags</code> هو <code translate="no">&quot;pop&quot;</code>.</p>
<p>بالإضافة إلى ذلك، يدعم ميلفوس عوامل تصفية المصفوفات المتقدمة مثل <code translate="no">ARRAY_CONTAINS</code> و <code translate="no">ARRAY_CONTAINS_ALL</code> و <code translate="no">ARRAY_CONTAINS_ANY</code> و <code translate="no">ARRAY_LENGTH</code> لتعزيز قدرات الاستعلام. لمزيد من التفاصيل، راجع <a href="/docs/ar/boolean.md">تصفية البيانات الوصفية</a>.</p>
<h2 id="Limits​" class="common-anchor-header">الحدود<button data-href="#Limits​" class="anchor-icon" translate="no">
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
<li><p><strong>نوع البيانات</strong>: يجب أن تحتوي جميع العناصر في حقل المصفوفة على نفس نوع البيانات، كما هو محدد في <code translate="no">element_type</code>.</p></li>
<li><p><strong>سعة المصفوفة</strong>: يجب أن يكون عدد العناصر في حقل المصفوفة أقل من أو يساوي السعة القصوى المحددة عند إنشاء المصفوفة، كما هو محدد في <code translate="no">max_capacity</code>.</p></li>
<li><p><strong>التعامل مع السلسلة</strong>: يتم تخزين قيم السلسلة في حقول المصفوفات كما هي، دون هروب دلالي أو تحويل. على سبيل المثال، يتم تخزين <code translate="no">'a&quot;b'</code> و <code translate="no">&quot;a'b&quot;</code> و <code translate="no">'a\'b'</code> و <code translate="no">&quot;a\&quot;b&quot;</code> كما تم إدخالها، بينما <code translate="no">'a'b'</code> و <code translate="no">&quot;a&quot;b&quot;</code> تعتبر قيمًا غير صالحة.</p></li>
</ul>
