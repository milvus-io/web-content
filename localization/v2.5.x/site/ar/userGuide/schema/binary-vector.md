---
id: binary-vector.md
title: المتجهات الثنائية
summary: >-
  المتجهات الثنائية هي شكل خاص من أشكال تمثيل البيانات التي تحول متجهات الفاصلة
  العائمة التقليدية عالية الأبعاد إلى متجهات ثنائية تحتوي على 0 و1 فقط. لا يؤدي
  هذا التحويل إلى ضغط حجم المتجه فحسب، بل يقلل أيضًا من تكاليف التخزين والتكاليف
  الحسابية مع الاحتفاظ بالمعلومات الدلالية. عندما لا تكون الدقة للخصائص غير
  الحرجة ضرورية، يمكن للمتجهات الثنائية أن تحافظ بشكل فعال على معظم سلامة وفائدة
  متجهات الفاصلة العائمة الأصلية.
---
<h1 id="Binary-Vector​" class="common-anchor-header">المتجهات الثنائية<button data-href="#Binary-Vector​" class="anchor-icon" translate="no">
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
    </button></h1><p>المتجهات الثنائية هي شكل خاص من أشكال تمثيل البيانات التي تحول متجهات الفاصلة العائمة التقليدية عالية الأبعاد إلى متجهات ثنائية تحتوي على 0 و1 فقط. لا يؤدي هذا التحويل إلى ضغط حجم المتجه فحسب، بل يقلل أيضًا من تكاليف التخزين والتكاليف الحسابية مع الاحتفاظ بالمعلومات الدلالية. عندما لا تكون الدقة للخصائص غير الحرجة ضرورية، يمكن للمتجهات الثنائية أن تحافظ بشكل فعال على معظم سلامة وفائدة متجهات الفاصلة العائمة الأصلية.</p>
<p>تتمتع المتجهات الثنائية بمجموعة واسعة من التطبيقات، خاصة في الحالات التي تكون فيها الكفاءة الحسابية وتحسين التخزين أمرًا بالغ الأهمية. في أنظمة الذكاء الاصطناعي واسعة النطاق، مثل محركات البحث أو أنظمة التوصية، تعد المعالجة الآنية لكميات هائلة من البيانات أمرًا أساسيًا. من خلال تقليل حجم المتجهات، تساعد المتجهات الثنائية في تقليل زمن الاستجابة والتكاليف الحسابية دون التضحية بالدقة بشكل كبير. بالإضافة إلى ذلك، تُعدّ المتجهات الثنائية مفيدة في البيئات المحدودة الموارد، مثل الأجهزة المحمولة والأنظمة المدمجة، حيث تكون الذاكرة وقوة المعالجة محدودة. من خلال استخدام المتجهات الثنائية، يمكن تنفيذ وظائف الذكاء الاصطناعي المعقدة في هذه البيئات المحدودة مع الحفاظ على الأداء العالي.</p>
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
    </button></h2><p>المتجهات الثنائية هي طريقة لترميز الكائنات المعقدة (مثل الصور أو النصوص أو الصوت) إلى قيم ثنائية ذات طول ثابت. في ميلفوس، يتم تمثيل المتجهات الثنائية عادةً كمصفوفات بت أو مصفوفات بايت. على سبيل المثال، يمكن تمثيل متجه ثنائي ثنائي 8 أبعاد على شكل <code translate="no">[1, 0, 1, 1, 0, 0, 1, 0]</code>.</p>
<p>يوضح الرسم البياني أدناه كيف تمثل المتجهات الثنائية وجود كلمات رئيسية في محتوى النص. في هذا المثال، يتم استخدام متجه ثنائي من 10 أبعاد لتمثيل نصين مختلفين<strong>(النص 1</strong> <strong>والنص 2</strong>)، حيث يتوافق كل بُعد مع كلمة في المفردات: 1 يشير إلى وجود الكلمة في النص، بينما يشير 0 إلى غيابها.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/binary-vector.png" alt="Binary vector representation of text content" class="doc-image" id="binary-vector-representation-of-text-content" />
   </span> <span class="img-wrapper"> <span>التمثيل المتجه الثنائي لمحتوى النص</span> </span></p>
<p>تتميز المتجهات الثنائية بالخصائص التالية.</p>
<ul>
<li><p><strong>كفاءة التخزين:</strong> يتطلب كل بُعد تخزين بت واحد فقط، مما يقلل من مساحة التخزين بشكل كبير.</p></li>
<li><p><strong>الحساب السريع:</strong> يمكن حساب التشابه بين المتجهات بسرعة باستخدام عمليات متشابهة البتات مثل XOR.</p></li>
<li><p><strong>طول ثابت:</strong> يظل طول المتجه ثابتًا بغض النظر عن طول النص الأصلي، مما يجعل الفهرسة والاسترجاع أسهل.</p></li>
<li><p><strong>بسيط وبديهي:</strong> يعكس مباشرةً وجود الكلمات الرئيسية، مما يجعله مناسبًا لبعض مهام الاسترجاع المتخصصة.</p></li>
</ul>
<p>يمكن إنشاء المتجهات الثنائية من خلال طرق مختلفة. في معالجة النصوص، يمكن استخدام المفردات المحددة مسبقًا لتعيين البتات المقابلة بناءً على وجود الكلمات. في معالجة الصور، يمكن لخوارزميات التجزئة الإدراكية (مثل <a href="https://en.wikipedia.org/wiki/Perceptual_hashing">pHash</a>) توليد ميزات ثنائية للصور. في تطبيقات التعلّم الآلي، يمكن تحويل مخرجات النماذج إلى ثنائية للحصول على تمثيلات متجهات ثنائية.</p>
<p>بعد تحويلها إلى متجهات ثنائية، يمكن تخزين البيانات في ميلفوس للإدارة واسترجاع المتجهات. يوضح الرسم البياني أدناه العملية الأساسية.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/use-binary-vector.png" alt="Use binary vectors in Milvus" class="doc-image" id="use-binary-vectors-in-milvus" />
   </span> <span class="img-wrapper"> <span>استخدام المتجهات الثنائية في ملفوس</span> </span></p>
<div class="alert note">
<p>على الرغم من أن المتجهات الثنائية تتفوق في سيناريوهات محددة، إلا أن لها قيودًا في قدرتها التعبيرية، مما يجعل من الصعب التقاط العلاقات الدلالية المعقدة. لذلك، في سيناريوهات العالم الحقيقي، غالبًا ما تُستخدم المتجهات الثنائية جنبًا إلى جنب مع أنواع المتجهات الأخرى لتحقيق التوازن بين الكفاءة والتعبير. لمزيد من المعلومات، راجع المتجهات <a href="/docs/ar/dense-vector.md">الكثيفة</a> والمتجهات <a href="/docs/ar/sparse_vector.md">المتفرقة</a>.</p>
</div>
<h2 id="Use-binary-vectors-in-Milvus​" class="common-anchor-header">استخدام المتجهات الثنائية في ميلفوس<button data-href="#Use-binary-vectors-in-Milvus​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Add-vector-field​" class="common-anchor-header">إضافة حقل متجه</h3><p>لاستخدام المتجهات الثنائية في ملفوس، قم أولاً بتعريف حقل متجه لتخزين المتجهات الثنائية عند إنشاء مجموعة. تتضمن هذه العملية.</p>
<ol>
<li><p>تعيين <code translate="no">datatype</code> إلى نوع بيانات المتجه الثنائي المدعوم، أي <code translate="no">BINARY_VECTOR</code>.</p></li>
<li><p>تحديد أبعاد المتجه باستخدام المعلمة <code translate="no">dim</code>. لاحظ أنه يجب أن يكون <code translate="no">dim</code> من مضاعفات العدد 8 حيث يجب تحويل المتجهات الثنائية إلى مصفوفة بايت عند الإدراج. سيتم تعبئة كل 8 قيم منطقية (0 أو 1) في بايت واحد. على سبيل المثال، إذا كان <code translate="no">dim=128</code> ، يلزم وجود مصفوفة 16 بايت للإدراج.</p></li>
</ol>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
​
schema = client.create_schema(​
    auto_id=<span class="hljs-literal">True</span>,​
    enable_dynamic_fields=<span class="hljs-literal">True</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>, datatype=DataType.BINARY_VECTOR, dim=<span class="hljs-number">128</span>)​

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
        .fieldName(<span class="hljs-string">&quot;binary_vector&quot;</span>)​
        .dataType(DataType.BinaryVector)​
        .dimension(<span class="hljs-number">128</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
schema.<span class="hljs-title function_">push</span>({​
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;binary vector&quot;</span>,​
  <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">BinaryVector</span>,​
  <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span>,​
});​

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
    &quot;fieldName&quot;: &quot;binary_vector&quot;,​
    &quot;dataType&quot;: &quot;BinaryVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 128​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: true,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ],​
    \&quot;enableDynamicField\&quot;: true​
}&quot;</span>​
​

<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، تمت إضافة حقل متجه باسم <code translate="no">binary_vector</code> لتخزين المتجهات الثنائية. نوع بيانات هذا الحقل هو <code translate="no">BINARY_VECTOR</code> ، ببعد 128.</p>
<h3 id="Set-index-params-for-vector-field​" class="common-anchor-header">تعيين بارامترات الفهرس لحقل المتجه</h3><p>لتسريع عمليات البحث، يجب إنشاء فهرس لحقل المتجه الثنائي. يمكن للفهرسة تحسين كفاءة استرجاع البيانات المتجهة واسعة النطاق بشكل كبير.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()​
​
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,​
    index_name=<span class="hljs-string">&quot;binary_vector_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;BIN_IVF_FLAT&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;HAMMING&quot;</span>,​
    <span class="hljs-keyword">params</span>={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>}​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;​
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.*;​
​
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
extraParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nlist&quot;</span>,<span class="hljs-number">128</span>);​
indexParams.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;binary_vector&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">BIN_IVF_FLAT</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">HAMMING</span>)​
        .<span class="hljs-title function_">extraParams</span>(extraParams)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MetricType</span>, <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> indexParams = {​
  <span class="hljs-attr">indexName</span>: <span class="hljs-string">&quot;binary_vector_index&quot;</span>,​
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;binary_vector&quot;</span>,​
  <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">HAMMING</span>,​
  <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">BIN_IVF_FLAT</span>,​
  <span class="hljs-attr">params</span>: {​
    <span class="hljs-attr">nlist</span>: <span class="hljs-number">128</span>,​
  },​
};​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;binary_vector&quot;,​
            &quot;metricType&quot;: &quot;HAMMING&quot;,​
            &quot;indexName&quot;: &quot;binary_vector_index&quot;,​
            &quot;indexType&quot;: &quot;BIN_IVF_FLAT&quot;,​
            &quot;params&quot;:{&quot;nlist&quot;: 128}​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>في المثال أعلاه، يتم إنشاء فهرس باسم <code translate="no">binary_vector_index</code> للحقل <code translate="no">binary_vector</code> ، باستخدام نوع الفهرس <code translate="no">BIN_IVF_FLAT</code>. تم تعيين <code translate="no">metric_type</code> على <code translate="no">HAMMING</code> ، مما يشير إلى استخدام مسافة هامينج لقياس التشابه.</p>
<p>إلى جانب <code translate="no">BIN_IVF_FLAT</code> ، يدعم ميلفوس أنواع الفهارس الأخرى للمتجهات الثنائية. لمزيد من التفاصيل، راجع <a href="https://milvus.io/docs/index.md?tab=binary">فهارس المتجهات الثنائية</a>. بالإضافة إلى ذلك، يدعم ميلفوس مقاييس تشابه أخرى للمتجهات الثنائية. لمزيد من المعلومات، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p>
<h3 id="Create-collection​" class="common-anchor-header">إنشاء مجموعة</h3><p>بمجرد اكتمال إعدادات المتجه الثنائي والفهرس الثنائي، قم بإنشاء مجموعة تحتوي على متجهات ثنائية. يستخدم المثال أدناه طريقة <code translate="no">create_collection</code> لإنشاء مجموعة باسم <code translate="no">my_binary_collection</code>.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;my_binary_collection&quot;</span>,​
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
        .collectionName(<span class="hljs-string">&quot;my_binary_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexParams)​
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
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_dense_collection&#x27;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">index_params</span>: indexParams​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_binary_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data​" class="common-anchor-header">إدراج البيانات</h3><p>بعد إنشاء المجموعة، استخدم الأسلوب <code translate="no">insert</code> لإضافة بيانات تحتوي على متجهات ثنائية. لاحظ أنه يجب توفير المتجهات الثنائية على شكل مصفوفة بايت، حيث يمثل كل بايت 8 قيم منطقية.</p>
<p>على سبيل المثال، بالنسبة إلى متجه ثنائي مكون من 128 بُعدًا، يلزم توفير مصفوفة من 16 بايت (بما أن 128 بت ÷ 8 بت/بايت = 16 بايت). فيما يلي مثال على شيفرة لإدخال البيانات.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">convert_bool_list_to_bytes</span>(<span class="hljs-params">bool_list</span>):​
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(bool_list) % <span class="hljs-number">8</span> != <span class="hljs-number">0</span>:​
        <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The length of a boolean list must be a multiple of 8&quot;</span>)​
​
    byte_array = <span class="hljs-built_in">bytearray</span>(<span class="hljs-built_in">len</span>(bool_list) // <span class="hljs-number">8</span>)​
    <span class="hljs-keyword">for</span> i, bit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(bool_list):​
        <span class="hljs-keyword">if</span> bit == <span class="hljs-number">1</span>:​
            index = i // <span class="hljs-number">8</span>​
            shift = i % <span class="hljs-number">8</span>​
            byte_array[index] |= (<span class="hljs-number">1</span> &lt;&lt; shift)​
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">bytes</span>(byte_array)​
​
​
bool_vectors = [​
    [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>] + [<span class="hljs-number">0</span>] * <span class="hljs-number">112</span>,​
    [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] + [<span class="hljs-number">0</span>] * <span class="hljs-number">112</span>,​
]​
​
data = [{<span class="hljs-string">&quot;binary_vector&quot;</span>: convert_bool_list_to_bytes(bool_vector) <span class="hljs-keyword">for</span> bool_vector <span class="hljs-keyword">in</span> bool_vectors}]​
​
client.insert(​
    collection_name=<span class="hljs-string">&quot;my_binary_collection&quot;</span>,​
    data=data​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">byte</span>[] convertBoolArrayToBytes(<span class="hljs-type">boolean</span>[] booleanArray) {​
    <span class="hljs-type">byte</span>[] byteArray = <span class="hljs-keyword">new</span> <span class="hljs-title class_">byte</span>[booleanArray.length / Byte.SIZE];​
    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; booleanArray.length; i++) {​
        <span class="hljs-keyword">if</span> (booleanArray[i]) {​
            <span class="hljs-type">int</span> <span class="hljs-variable">index</span> <span class="hljs-operator">=</span> i / Byte.SIZE;​
            <span class="hljs-type">int</span> <span class="hljs-variable">shift</span> <span class="hljs-operator">=</span> i % Byte.SIZE;​
            byteArray[index] |= (<span class="hljs-type">byte</span>) (<span class="hljs-number">1</span> &lt;&lt; shift);​
        }​
    }​
​
    <span class="hljs-keyword">return</span> byteArray;​
}​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
{​
    <span class="hljs-type">boolean</span>[] boolArray = {<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};​
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
    row.add(<span class="hljs-string">&quot;binary_vector&quot;</span>, gson.toJsonTree(convertBoolArrayToBytes(boolArray)));​
    rows.add(row);​
}​
{​
    <span class="hljs-type">boolean</span>[] boolArray = {<span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};​
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
    row.add(<span class="hljs-string">&quot;binary_vector&quot;</span>, gson.toJsonTree(convertBoolArrayToBytes(boolArray)));​
    rows.add(row);​
}​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_binary_collection&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
  { <span class="hljs-attr">binary_vector</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] },​
  { <span class="hljs-attr">binary_vector</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] },​
];​
​
client.<span class="hljs-title function_">insert</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_binary_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: data,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;data\&quot;: <span class="hljs-variable">$data</span>,​
    \&quot;collectionName\&quot;: \&quot;my_binary_collection\&quot;​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search​" class="common-anchor-header">إجراء بحث التشابه</h3><p>البحث عن التشابه هو أحد الميزات الأساسية في ميلفوس، مما يسمح لك بالعثور بسرعة على البيانات الأكثر تشابهًا مع متجه الاستعلام بناءً على المسافة بين المتجهات. لإجراء بحث تشابه باستخدام متجهات ثنائية، قم بإعداد متجه الاستعلام ومعلمات البحث، ثم قم باستدعاء الطريقة <code translate="no">search</code>.</p>
<p>أثناء عمليات البحث، يجب أيضًا توفير المتجهات الثنائية في شكل مصفوفة بايت. تأكد من أن أبعاد متجه الاستعلام تتطابق مع البعد المحدد عند تحديد <code translate="no">dim</code> وأن كل 8 قيم منطقية يتم تحويلها إلى بايت واحد.</p>
<div class="multipleCode">
 <a href="#python">بيثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {​
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: 10}​
}​
​
query_bool_list = [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0] + [0] * 112​
query_vector = convert_bool_list_to_bytes(query_bool_list)​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_binary_collection&quot;</span>,​
    data=[query_vector],​
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,​
    search_params=search_params,​
    <span class="hljs-built_in">limit</span>=5,​
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: &#x27;453718927992172268&#x27;, &#x27;distance&#x27;: 10.0, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172268&#x27;}}]&quot;] ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">SearchReq</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">data</span>.<span class="hljs-property">BinaryVec</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">response</span>.<span class="hljs-property">SearchResp</span>;​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
searchParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nprobe&quot;</span>,<span class="hljs-number">10</span>);​
​
boolean[] boolArray = {<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};​
<span class="hljs-title class_">BinaryVec</span> queryVector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(<span class="hljs-title function_">convertBoolArrayToBytes</span>(boolArray));​
​
<span class="hljs-title class_">SearchResp</span> searchR = client.<span class="hljs-title function_">search</span>(<span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;my_binary_collection&quot;</span>)​
        .<span class="hljs-title function_">data</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(queryVector))​
        .<span class="hljs-title function_">annsField</span>(<span class="hljs-string">&quot;binary_vector&quot;</span>)​
        .<span class="hljs-title function_">searchParams</span>(searchParams)​
        .<span class="hljs-title function_">topK</span>(<span class="hljs-number">5</span>)​
        .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-string">&quot;pk&quot;</span>))​
        .<span class="hljs-title function_">build</span>());​
        ​
 <span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(searchR.<span class="hljs-title function_">getSearchResults</span>());​
 ​
 <span class="hljs-comment">// Output​</span>
 <span class="hljs-comment">//​</span>
 <span class="hljs-comment">// [[SearchResp.SearchResult(entity={pk=453444327741536775}, score=0.0, id=453444327741536775), SearchResp.SearchResult(entity={pk=453444327741536776}, score=7.0, id=453444327741536776)]]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">query_vector = [1,0,1,0,1,1,1,1,1,1,1,1];​
​
client.search({​
    collection_name: <span class="hljs-string">&#x27;my_binary_collection&#x27;</span>,​
    data: query_vector,​
    <span class="hljs-built_in">limit</span>: 5,​
    output_fields: [<span class="hljs-string">&#x27;pk&#x27;</span>],​
    params: {​
        nprobe: 10​
    }​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{​
        &quot;params&quot;:{&quot;nprobe&quot;:10}​
    }&#x27;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_binary_collection\&quot;,​
    \&quot;data\&quot;: <span class="hljs-variable">$data</span>,​
    \&quot;annsField\&quot;: \&quot;binary_vector\&quot;,​
    \&quot;limit\&quot;: 5,​
    \&quot;searchParams\&quot;:<span class="hljs-variable">$searchParams</span>,​
    \&quot;outputFields\&quot;: [\&quot;pk\&quot;]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من المعلومات حول معلمات بحث التشابه، راجع <a href="/docs/ar/single-vector-search.md">بحث ANN الأساسي</a>.</p>
<p></p>
