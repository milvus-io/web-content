---
id: use-partition-key.md
title: استخدام مفتاح التقسيم
---
<h1 id="Use-Partition-Key​" class="common-anchor-header">استخدام مفتاح التقسيم<button data-href="#Use-Partition-Key​" class="anchor-icon" translate="no">
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
    </button></h1><p>مفتاح التقسيم هو حل لتحسين البحث استناداً إلى الأقسام. من خلال تعيين حقل قياسي محدد كمفتاح التقسيم وتحديد شروط التصفية بناءً على مفتاح التقسيم أثناء البحث، يمكن تضييق نطاق البحث إلى عدة أقسام، وبالتالي تحسين كفاءة البحث. ستقدم هذه المقالة كيفية استخدام مفتاح التقسيم والاعتبارات ذات الصلة.</p>
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
    </button></h2><p>في Milvus، يمكنك استخدام الأقسام لتنفيذ فصل البيانات وتحسين أداء البحث من خلال تقييد نطاق البحث إلى أقسام محددة. إذا اخترت إدارة الأقسام يدويًا، يمكنك إنشاء 1024 قسمًا كحد أقصى في مجموعة ما، وإدراج كيانات في هذه الأقسام استنادًا إلى قاعدة محددة بحيث يمكنك تضييق نطاق البحث عن طريق تقييد عمليات البحث ضمن عدد محدد من الأقسام.</p>
<p>يقدم لك Milvus مفتاح التقسيم لتتمكن من إعادة استخدام الأقسام في فصل البيانات للتغلب على الحد الأقصى لعدد الأقسام التي يمكنك إنشاؤها في مجموعة. عند إنشاء مجموعة، يمكنك استخدام حقل قياسي كمفتاح التقسيم. بمجرد أن تصبح المجموعة جاهزة، يقوم Milvus بإنشاء العدد المحدد من الأقسام داخل المجموعة مع كل قسم يتوافق مع نطاق من القيم الموجودة في مفتاح التقسيم. عند استلام الكيانات المدرجة، يقوم Milvus بتخزينها في أقسام مختلفة بناءً على قيم مفتاح التقسيم الخاصة بها.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-vs-partition-key.png" alt="Partition v.s. Partition Key" class="doc-image" id="partition-v.s.-partition-key" />
   </span> <span class="img-wrapper"> <span>التقسيم مقابل مفتاح القسم</span> </span></p>
<p>يوضح الشكل التالي كيفية معالجة Milvus لطلبات البحث في مجموعة مع تمكين ميزة مفتاح التقسيم أو بدونها. </p>
<ul>
<li><p>في حالة تعطيل مفتاح التقسيم، يبحث Milvus عن الكيانات الأكثر تشابهًا مع متجه الاستعلام داخل المجموعة. يمكنك تضييق نطاق البحث إذا كنت تعرف أي قسم يحتوي على أكثر النتائج ذات الصلة. </p></li>
<li><p>إذا تم تمكين مفتاح التقسيم، يحدد Milvus نطاق البحث استناداً إلى قيمة مفتاح التقسيم المحددة في عامل تصفية البحث ويقوم بمسح الكيانات الموجودة داخل الأقسام التي تتطابق فقط. </p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/with-and-without-partition-key.png" alt="With or Without Partition Key" class="doc-image" id="with-or-without-partition-key" />
   </span> <span class="img-wrapper"> <span>باستخدام مفتاح التقسيم أو بدونه</span> </span></p>
<h2 id="Use-Partition-Key​" class="common-anchor-header">استخدام مفتاح التقسيم<button data-href="#Use-Partition-Key​" class="anchor-icon" translate="no">
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
    </button></h2><p>لاستخدام مفتاح التقسيم، تحتاج إلى</p>
<ul>
<li><p>تعيين مفتاح التقسيم.</p></li>
<li><p>تعيين عدد الأقسام المراد إنشاؤها (اختياري)، و</p></li>
<li><p>إنشاء شرط تصفية استناداً إلى مفتاح التقسيم.</p></li>
</ul>
<h3 id="Set-Partition-Key​" class="common-anchor-header">تعيين مفتاح التقسيم</h3><p>لتعيين حقل قياسي كمفتاح التقسيم، تحتاج إلى تعيين السمة <code translate="no">is_partition_key</code> الخاصة به إلى <code translate="no">true</code> عند إضافة الحقل القياسي.</p>
<div class="multipleCode">
 <a href="#python">بيثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (​
    MilvusClient, DataType​
)​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
schema = client.create_schema()​
​
<span class="hljs-comment"># Add the partition key​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">512</span>,​
    <span class="hljs-comment"># highlight-next-line​</span>
    is_partition_key=<span class="hljs-literal">True</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
​
<span class="hljs-comment">// Create schema​</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
​
<span class="hljs-comment">// Add the partition key​</span>
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)​
        .dataType(DataType.VarChar)​
        .maxLength(<span class="hljs-number">512</span>)​
        <span class="hljs-comment">// highlight-next-line​</span>
        .isPartitionKey(<span class="hljs-literal">true</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// 3. Create a collection in customized setup mode​</span>
<span class="hljs-comment">// 3.1 Define fields​</span>
<span class="hljs-keyword">const</span> fields = [​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,​
        <span class="hljs-comment">// highlight-next-line​</span>
        <span class="hljs-attr">is_partition_key</span>: <span class="hljs-literal">true</span>​
    }​
]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: true,​
        &quot;enabledDynamicField&quot;: false,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;my_id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_vector&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;5&quot;​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_varchar&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;isPartitionKey&quot;: true,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 512​
                }​
            }​
        ]​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Partition-Numbers​" class="common-anchor-header">تعيين أرقام التقسيم</h3><p>عندما تقوم بتعيين حقل قياسي في مجموعة كمفتاح التقسيم، يقوم Milvus تلقائيًا بإنشاء 16 قسمًا في المجموعة. عند استلام أحد الكيانات، يختار Milvus قسمًا بناءً على قيمة مفتاح التقسيم لهذا الكيان ويخزن الكيان في القسم، مما يؤدي إلى احتواء بعض أو كل الأقسام على كيانات بقيم مفاتيح أقسام مختلفة. </p>
<p>يمكنك أيضًا تحديد عدد الأقسام المراد إنشاؤها مع المجموعة. لا يكون هذا صالحًا إلا إذا كان لديك حقل قياسي معيّن كمفتاح التقسيم.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    schema=schema,​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    num_partitions=<span class="hljs-number">1024</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
                .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
                .collectionSchema(schema)​
                .numPartitions(<span class="hljs-number">1024</span>)​
                .build();​
        client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">create_collection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">num_partitions</span>: <span class="hljs-number">1024</span>​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{​
    &quot;partitionsNum&quot;: 1024​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;myCollection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Filtering-Condition​" class="common-anchor-header">إنشاء شرط التصفية</h3><p>عند إجراء عمليات بحث ANN في مجموعة مع تمكين ميزة مفتاح التقسيم، تحتاج إلى تضمين تعبير تصفية يتضمن مفتاح التقسيم في طلب البحث. في تعبير التصفية، يمكنك في تعبير التصفية تقييد قيمة مفتاح التقسيم ضمن نطاق محدد بحيث يقيد Milvus نطاق البحث ضمن الأقسام المقابلة.</p>
<p>توضّح الأمثلة التالية التصفية المستندة إلى مفتاح القسم استناداً إلى قيمة مفتاح قسم محدد ومجموعة من قيم مفاتيح الأقسام.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Filter based on a single partition key value, or​</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>​
​
<span class="hljs-comment"># Filter based on multiple partition key values​</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Filter based on a single partition key value, or​</span>
<span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;partition_key == &#x27;x&#x27; &amp;&amp; &lt;other conditions&gt;&quot;</span>;​
​
<span class="hljs-comment">// Filter based on multiple partition key values​</span>
<span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;partition_key in [&#x27;x&#x27;, &#x27;y&#x27;, &#x27;z&#x27;] &amp;&amp; &lt;other conditions&gt;&quot;</span>;​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Filter based on a single partition key value, or​</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>​
​
<span class="hljs-comment">// Filter based on multiple partition key values​</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># Filter based on a single partition key value, or​</span>
export <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>​
​
<span class="hljs-comment"># Filter based on multiple partition key values​</span>
export <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>عليك أن تستبدل <code translate="no">partition_key</code> باسم الحقل الذي تم تعيينه كمفتاح التقسيم.</p>
</div>
<h2 id="Use-Partition-Key-Isolation" class="common-anchor-header">استخدام عزل مفتاح التقسيم<button data-href="#Use-Partition-Key-Isolation" class="anchor-icon" translate="no">
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
    </button></h2><p>في سيناريو الإيجارات المتعددة، يمكنك تعيين الحقل القياسي المتعلق بهويات المستأجرين كمفتاح التقسيم وإنشاء عامل تصفية يستند إلى قيمة محددة في هذا الحقل القياسي. لتحسين أداء البحث بشكل أكبر في سيناريوهات مماثلة، يقدم Milvus ميزة عزل مفتاح التقسيم.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-key-isolation.png" alt="Partition Key Isolation" class="doc-image" id="partition-key-isolation" />
   </span> <span class="img-wrapper"> <span>عزل مفتاح التقسيم</span> </span></p>
<p>كما هو موضح في الشكل أعلاه، يقوم Milvus بتجميع الكيانات بناءً على قيمة مفتاح التقسيم وإنشاء فهرس منفصل لكل مجموعة من هذه المجموعات. عند تلقي طلب بحث، يقوم ملفوس بتحديد موقع الفهرس استناداً إلى قيمة مفتاح التقسيم المحددة في شرط التصفية ويقيد نطاق البحث ضمن الكيانات المضمنة في الفهرس، وبالتالي تجنب مسح الكيانات غير ذات الصلة أثناء البحث وتحسين أداء البحث بشكل كبير. بمجرد تمكين عزل مفتاح التقسيم، يمكنك تضمين قيمة محددة فقط في عامل التصفية المستند إلى مفتاح التقسيم بحيث يمكن لـ Milvus تقييد نطاق البحث ضمن الكيانات المضمنة في الفهرس التي تتطابق.</p>
<div class="alert note">
<p>في الوقت الحالي، تنطبق ميزة عزل مفتاح التقسيم فقط على عمليات البحث مع تعيين نوع الفهرس إلى HNSW.</p>
</div>
<h3 id="Enable-Partition-Key-Isolation" class="common-anchor-header">تمكين عزل مفتاح التقسيم</h3><p>توضح الأمثلة البرمجية التالية كيفية تمكين عزل مفتاح التقسيم.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    <span class="hljs-comment"># highlight-next-line</span>
    properties={<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>: <span class="hljs-literal">True</span>}
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">collection</span>.<span class="hljs-property">request</span>.<span class="hljs-property">CreateCollectionReq</span>;

<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">String</span>&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
properties.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);

<span class="hljs-title class_">CreateCollectionReq</span> createCollectionReq = <span class="hljs-title class_">CreateCollectionReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-title function_">collectionSchema</span>(schema)
        .<span class="hljs-title function_">numPartitions</span>(<span class="hljs-number">1024</span>)
        .<span class="hljs-title function_">properties</span>(properties)
        .<span class="hljs-title function_">build</span>();
client.<span class="hljs-title function_">createCollection</span>(createCollectionReq);

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;partitionkey.isolation&quot;</span>: <span class="hljs-literal">true</span>
    }
})

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;partitionKeyIsolation&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;myCollection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>بمجرد تمكين عزل مفتاح القسم، لا يزال بإمكانك تعيين مفتاح القسم وعدد الأقسام كما هو موضح في <a href="#Set-Partition-Numbers">تعيين أرقام الأقسام</a>. لاحظ أن عامل التصفية المستند إلى مفتاح التقسيم يجب أن يتضمن قيمة مفتاح قسم محدد فقط.</p>
