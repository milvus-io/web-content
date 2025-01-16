---
id: dense-vector.md
title: المتجهات الكثيفة
summary: >-
  المتجهات الكثيفة هي تمثيلات رقمية للبيانات تُستخدم على نطاق واسع في التعلم
  الآلي وتحليل البيانات. وهي تتكون من مصفوفات بأرقام حقيقية، حيث تكون معظم
  العناصر أو جميعها غير صفرية. بالمقارنة مع المتجهات المتفرّقة، تحتوي المتجهات
  الكثيفة على المزيد من المعلومات على نفس مستوى الأبعاد، حيث يحتوي كل بُعد على
  قيم ذات معنى. يمكن لهذا التمثيل التقاط أنماط وعلاقات معقدة بشكل فعال، مما يسهل
  تحليل البيانات ومعالجتها في مساحات عالية الأبعاد. عادةً ما تحتوي المتجهات
  الكثيفة على عدد ثابت من الأبعاد، يتراوح بين بضع عشرات إلى عدة مئات أو حتى آلاف
  الأبعاد، اعتمادًا على التطبيق والمتطلبات المحددة.
---
<h1 id="Dense-Vector​" class="common-anchor-header">المتجهات الكثيفة<button data-href="#Dense-Vector​" class="anchor-icon" translate="no">
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
    </button></h1><p>المتجهات الكثيفة هي تمثيلات رقمية للبيانات تُستخدم على نطاق واسع في التعلم الآلي وتحليل البيانات. وهي تتكون من مصفوفات بأرقام حقيقية، حيث تكون معظم العناصر أو جميعها غير صفرية. بالمقارنة مع المتجهات المتناثرة، تحتوي المتجهات الكثيفة على المزيد من المعلومات على نفس مستوى الأبعاد، حيث يحتوي كل بُعد على قيم ذات معنى. يمكن لهذا التمثيل التقاط أنماط وعلاقات معقدة بشكل فعال، مما يسهل تحليل البيانات ومعالجتها في مساحات عالية الأبعاد. عادةً ما تحتوي المتجهات الكثيفة على عدد ثابت من الأبعاد، يتراوح بين بضع عشرات إلى عدة مئات أو حتى الآلاف، اعتمادًا على التطبيق والمتطلبات المحددة.</p>
<p>تُستخدم المتجهات الكثيفة بشكل أساسي في السيناريوهات التي تتطلب فهم دلالات البيانات، مثل أنظمة البحث الدلالي والتوصيات. في البحث الدلالي، تساعد المتجهات الكثيفة في التقاط الروابط الأساسية بين الاستعلامات والمستندات، مما يحسن من أهمية نتائج البحث. أما في أنظمة التوصيات، فهي تساعد في تحديد أوجه التشابه بين المستخدمين والعناصر، مما يوفر اقتراحات أكثر تخصيصًا.</p>
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
    </button></h2><p>عادةً ما يتم تمثيل المتجهات الكثيفة كمصفوفات من أرقام الفاصلة العائمة ذات الطول الثابت، مثل <code translate="no">[0.2, 0.7, 0.1, 0.8, 0.3, ..., 0.5]</code>. تتراوح أبعاد هذه المتجهات عادةً من مئات إلى آلاف الأبعاد، مثل 128 أو 256 أو 768 أو 1024. ويلتقط كل بُعد سمات دلالية محددة لكائن ما، مما يجعلها قابلة للتطبيق على سيناريوهات مختلفة من خلال حسابات التشابه.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/dense-vector.png" alt="Dense vectors in 2D space" class="doc-image" id="dense-vectors-in-2d-space" />
   </span> <span class="img-wrapper"> <span>المتجهات الكثيفة في الفضاء ثنائي الأبعاد</span> </span></p>
<p>توضح الصورة أعلاه تمثيل المتجهات الكثيفة في فضاء ثنائي الأبعاد. على الرغم من أن المتجهات الكثيفة في تطبيقات العالم الحقيقي غالبًا ما يكون لها أبعاد أعلى بكثير، إلا أن هذا الرسم التوضيحي ثنائي الأبعاد ينقل بشكل فعال العديد من المفاهيم الأساسية.</p>
<ul>
<li><p><strong>التمثيل متعدد الأبعاد:</strong> تمثل كل نقطة كائنًا مفاهيميًا (مثل <strong>ميلفوس</strong> <strong>وقاعدة بيانات المتجهات</strong> <strong>ونظام الاسترجاع،</strong> إلخ)، مع تحديد موضعها من خلال قيم أبعادها.</p></li>
<li><p><strong>العلاقات الدلالية:</strong> تعكس المسافات بين النقاط التشابه الدلالي بين المفاهيم. تشير النقاط الأقرب إلى المفاهيم الأكثر ارتباطاً من الناحية الدلالية.</p></li>
<li><p><strong>تأثير التجميع:</strong> يتم وضع المفاهيم ذات الصلة (مثل <strong>ميلفوس</strong> <strong>وقاعدة البيانات المتجهة</strong> <strong>ونظام الاسترجاع</strong>) بالقرب من بعضها البعض في الفضاء، مما يشكل مجموعة دلالية.</p></li>
</ul>
<p>فيما يلي مثال لمتجه كثيف حقيقي يمثل النص <code translate="no">&quot;Milvus is an efficient vector database&quot;</code>.</p>
<pre><code translate="no" class="language-JSON">[​
    -<span class="hljs-number">0.013052909</span>,​
    <span class="hljs-number">0.020387933</span>,​
    -<span class="hljs-number">0.007869</span>,​
    -<span class="hljs-number">0.11111383</span>,​
    -<span class="hljs-number">0.030188112</span>,​
    -<span class="hljs-number">0.0053388323</span>,​
    <span class="hljs-number">0.0010654867</span>,​
    <span class="hljs-number">0.072027855</span>,​
    <span class="hljs-comment">// ... more dimensions​</span>
]​
​

<button class="copy-code-btn"></button></code></pre>
<p>يمكن توليد المتجهات الكثيفة باستخدام نماذج <a href="https://en.wikipedia.org/wiki/Embedding">تضمين</a> مختلفة، مثل نماذج CNN (مثل <a href="https://pytorch.org/hub/pytorch_vision_resnet/">ResNet</a> <a href="https://pytorch.org/vision/stable/models/vgg.html">وVGG</a>) للصور ونماذج اللغة (مثل <a href="https://en.wikipedia.org/wiki/BERT_(language_model)">BERT</a> <a href="https://en.wikipedia.org/wiki/Word2vec">وWord2Vec</a>) للنصوص. تقوم هذه النماذج بتحويل البيانات الأولية إلى نقاط في فضاء عالي الأبعاد، مع التقاط السمات الدلالية للبيانات. بالإضافة إلى ذلك، يوفر Milvus طرقًا ملائمة لمساعدة المستخدمين على إنشاء متجهات كثيفة ومعالجتها، كما هو مفصل في Embedddings.</p>
<p>بمجرد تحويل البيانات إلى متجهات، يمكن تخزينها في ميلفوس لإدارتها واسترجاع المتجهات. يوضح الرسم البياني أدناه العملية الأساسية.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/use-dense-vector.png" alt="Use dense vecctors in Milvus" class="doc-image" id="use-dense-vecctors-in-milvus" />
   </span> <span class="img-wrapper"> <span>استخدام المتجهات الكثيفة في ملفوس</span> </span></p>
<div class="alert note">
<p>إلى جانب المتجهات الكثيفة، يدعم Milvus أيضًا المتجهات المتفرقة والمتجهات الثنائية. تعد المتجهات المتفرقة مناسبة للمطابقات الدقيقة بناءً على مصطلحات محددة، مثل البحث عن الكلمات الرئيسية ومطابقة المصطلحات، بينما تُستخدم المتجهات الثنائية بشكل شائع للتعامل بكفاءة مع البيانات ثنائية الثنائية، مثل مطابقة أنماط الصور وبعض تطبيقات التجزئة. لمزيد من المعلومات، راجع المتجهات <a href="/docs/ar/binary-vector.md">الثنائية</a> والمتجهات <a href="/docs/ar/sparse_vector.md">المتفرقة</a>.</p>
</div>
<h2 id="Use-dense-vectors-in-Milvus​" class="common-anchor-header">استخدام المتجهات الكثيفة في ميلفوس<button data-href="#Use-dense-vectors-in-Milvus​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Add-vector-field​" class="common-anchor-header">إضافة حقل متجه</h3><p>لاستخدام المتجهات الكثيفة في ملفوس، قم أولاً بتعريف حقل متجه لتخزين المتجهات الكثيفة عند إنشاء مجموعة. تتضمن هذه العملية.</p>
<ol>
<li><p>تعيين <code translate="no">datatype</code> إلى نوع بيانات متجه كثيف مدعوم. لمعرفة أنواع بيانات المتجهات الكثيفة المدعومة، راجع أنواع البيانات.</p></li>
<li><p>تحديد أبعاد المتجه الكثيف باستخدام المعلمة <code translate="no">dim</code>.</p></li>
</ol>
<p>في المثال أدناه، نضيف حقلاً متجهًا باسم <code translate="no">dense_vector</code> لتخزين المتجهات الكثيفة. نوع بيانات الحقل هو <code translate="no">FLOAT_VECTOR</code> ، بأبعاد <code translate="no">4</code>.</p>
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
schema.add_field(field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)​

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
        .fieldName(<span class="hljs-string">&quot;dense_vector&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">4</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
schema.<span class="hljs-title function_">push</span>({​
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;dense_vector&quot;</span>,​
  <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
  <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span>,​
});​
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
    &quot;fieldName&quot;: &quot;dense_vector&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 4​
    }​
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
<p><strong>أنواع البيانات المدعومة لحقول المتجهات الكثيفة</strong>:</p>
<table>
<thead>
<tr><th><strong>النوع</strong></th><th><strong>الوصف</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code></td><td>يخزن الأرقام ذات الفاصلة العائمة 32 بت، وتستخدم عادةً لتمثيل الأرقام الحقيقية في الحسابات العلمية والتعلم الآلي. مثالية للسيناريوهات التي تتطلب دقة عالية، مثل تمييز المتجهات المتشابهة.</td></tr>
<tr><td><code translate="no">FLOAT16_VECTOR</code></td><td>يخزن الأرقام ذات الفاصلة العائمة بنصف دقة 16 بت، وتستخدم للتعلم العميق وحسابات وحدة معالجة الرسومات. يوفر مساحة تخزين في السيناريوهات التي تكون فيها الدقة أقل أهمية، كما هو الحال في مرحلة الاستدعاء منخفضة الدقة لأنظمة التوصيات.</td></tr>
<tr><td><code translate="no">BFLOAT16_VECTOR</code></td><td>يخزّن أرقام الفاصلة العائمة الدماغية ذات 16 بت (bfloat16)، حيث يقدم نفس نطاق الأسس مثل Float32 ولكن بدقة أقل. مناسب للسيناريوهات التي تحتاج إلى معالجة كميات كبيرة من المتجهات بسرعة، مثل استرجاع الصور على نطاق واسع.</td></tr>
</tbody>
</table>
<h3 id="Set-index-params-for-vector-field​" class="common-anchor-header">تعيين بارامترات الفهرس لحقل المتجهات</h3><p>لتسريع عمليات البحث الدلالية، يجب إنشاء فهرس للحقل المتجه. يمكن للفهرسة تحسين كفاءة استرجاع البيانات المتجهة واسعة النطاق بشكل كبير.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()​
​
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>,​
    index_name=<span class="hljs-string">&quot;dense_vector_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
    <span class="hljs-keyword">params</span>={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>}​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;​
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.*;​
​
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
extraParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nlist&quot;</span>,<span class="hljs-number">128</span>);​
indexes.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;dense_vector&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">IVF_FLAT</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">IP</span>)​
        .<span class="hljs-title function_">extraParams</span>(extraParams)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MetricType</span>, <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> indexParams = {​
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;dense_vector_index&#x27;</span>,​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;dense_vector&#x27;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">IVF_FLAT</span>,​
    <span class="hljs-attr">params</span>: {​
      <span class="hljs-attr">nlist</span>: <span class="hljs-number">128</span>​
    },​
};​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;dense_vector&quot;,​
            &quot;metricType&quot;: &quot;IP&quot;,​
            &quot;indexName&quot;: &quot;dense_vector_index&quot;,​
            &quot;indexType&quot;: &quot;IVF_FLAT&quot;,​
            &quot;params&quot;:{&quot;nlist&quot;: 128}​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>في المثال أعلاه، يتم إنشاء فهرس باسم <code translate="no">dense_vector_index</code> للحقل <code translate="no">dense_vector</code> باستخدام نوع الفهرس <code translate="no">IVF_FLAT</code>. تم تعيين <code translate="no">metric_type</code> على <code translate="no">IP</code> ، مما يشير إلى أنه سيتم استخدام المنتج الداخلي كمقياس للمسافة.</p>
<p>يدعم ميلفوس أنواع الفهارس الأخرى أيضًا. لمزيد من التفاصيل، راجع <a href="https://milvus.io/docs/index.md?tab=floating">فهارس المتجهات العائمة</a>. بالإضافة إلى ذلك، يدعم Milvus أنواع مقاييس أخرى. لمزيد من المعلومات، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p>
<h3 id="Create-collection​" class="common-anchor-header">إنشاء مجموعة</h3><p>بمجرد اكتمال إعدادات المتجهات الكثيفة ومعلمة الفهرس يمكنك إنشاء مجموعة تحتوي على متجهات كثيفة. يستخدم المثال أدناه طريقة <code translate="no">create_collection</code> لإنشاء مجموعة باسم <code translate="no">my_dense_collection</code>.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;my_dense_collection&quot;</span>,​
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
        .collectionName(<span class="hljs-string">&quot;my_dense_collection&quot;</span>)​
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
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_dense_collection&#x27;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">index_params</span>: indexParams​
});​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_dense_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data​" class="common-anchor-header">إدراج البيانات</h3><p>بعد إنشاء المجموعة، استخدم الطريقة <code translate="no">insert</code> لإضافة بيانات تحتوي على متجهات كثيفة. تأكد من أن أبعاد المتجهات الكثيفة التي يتم إدراجها تتطابق مع القيمة <code translate="no">dim</code> المحددة عند إضافة حقل المتجهات الكثيفة.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">data = [​
    {<span class="hljs-string">&quot;dense_vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>]},​
    {<span class="hljs-string">&quot;dense_vector&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.8</span>]},​
]​
​
client.<span class="hljs-title function_">insert</span>(​
    collection_name=<span class="hljs-string">&quot;my_dense_collection&quot;</span>,​
    data=data​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;dense_vector\&quot;: [0.1, 0.2, 0.3, 0.4]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;dense_vector\&quot;: [0.2, 0.3, 0.4, 0.5]}&quot;</span>, JsonObject.class));​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_dense_collection&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
  { <span class="hljs-attr">dense_vector</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>] },​
  { <span class="hljs-attr">dense_vector</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.8</span>] },​
];​
​
client.<span class="hljs-title function_">insert</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_dense_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: data,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {&quot;dense_vector&quot;: [0.1, 0.2, 0.3, 0.4]},​
        {&quot;dense_vector&quot;: [0.2, 0.3, 0.4, 0.5]}        ​
    ],​
    &quot;collectionName&quot;: &quot;my_dense_collection&quot;​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:{&quot;insertCount&quot;:2,&quot;insertIds&quot;:[&quot;453577185629572531&quot;,&quot;453577185629572532&quot;]}}​</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search​" class="common-anchor-header">إجراء بحث التشابه</h3><p>يعد البحث الدلالي المستند إلى المتجهات الكثيفة إحدى الميزات الأساسية في ميلفوس، مما يسمح لك بالعثور بسرعة على البيانات الأكثر تشابهًا مع متجه الاستعلام بناءً على المسافة بين المتجهات. لإجراء بحث عن التشابه، قم بإعداد متجه الاستعلام ومعلمات البحث، ثم اتصل بالطريقة <code translate="no">search</code>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {​
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: 10}​
}​
​
query_vector = [0.1, 0.2, 0.3, 0.7]​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_dense_collection&quot;</span>,​
    data=[query_vector],​
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,​
    search_params=search_params,​
    <span class="hljs-built_in">limit</span>=5,​
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: &#x27;453718927992172271&#x27;, &#x27;distance&#x27;: 0.7599999904632568, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172271&#x27;}}, {&#x27;id&#x27;: &#x27;453718927992172270&#x27;, &#x27;distance&#x27;: 0.6299999952316284, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172270&#x27;}}]&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">data</span>.<span class="hljs-property">FloatVec</span>;​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
searchParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nprobe&quot;</span>,<span class="hljs-number">10</span>);​
​
<span class="hljs-title class_">FloatVec</span> queryVector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> float[]{<span class="hljs-number">0.</span>1f, <span class="hljs-number">0.</span>3f, <span class="hljs-number">0.</span>3f, <span class="hljs-number">0.</span>4f});​
​
<span class="hljs-title class_">SearchResp</span> searchR = client.<span class="hljs-title function_">search</span>(<span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;my_dense_collection&quot;</span>)​
        .<span class="hljs-title function_">data</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(queryVector))​
        .<span class="hljs-title function_">annsField</span>(<span class="hljs-string">&quot;dense_vector&quot;</span>)​
        .<span class="hljs-title function_">searchParams</span>(searchParams)​
        .<span class="hljs-title function_">topK</span>(<span class="hljs-number">5</span>)​
        .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-string">&quot;pk&quot;</span>))​
        .<span class="hljs-title function_">build</span>());​
        ​
<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(searchR.<span class="hljs-title function_">getSearchResults</span>());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={pk=453444327741536779}, score=0.65, id=453444327741536779), SearchResp.SearchResult(entity={pk=453444327741536778}, score=0.65, id=453444327741536778)]]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">query_vector = [0.1, 0.2, 0.3, 0.7];​
​
client.search({​
    collection_name: my_dense_collection,​
    data: query_vector,​
    <span class="hljs-built_in">limit</span>: 5,​
    output_fields: [<span class="hljs-string">&#x27;pk&#x27;</span>],​
    params: {​
        nprobe: 10​
    }​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_dense_collection&quot;,​
    &quot;data&quot;: [​
        [0.1, 0.2, 0.3, 0.7]​
    ],​
    &quot;annsField&quot;: &quot;dense_vector&quot;,​
    &quot;limit&quot;: 5,​
    &quot;searchParams&quot;:{​
        &quot;params&quot;:{&quot;nprobe&quot;:10}​
    },​
    &quot;outputFields&quot;: [&quot;pk&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;distance&quot;:0.55,&quot;id&quot;:&quot;453577185629572532&quot;,&quot;pk&quot;:&quot;453577185629572532&quot;},{&quot;distance&quot;:0.42,&quot;id&quot;:&quot;453577185629572531&quot;,&quot;pk&quot;:&quot;453577185629572531&quot;}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>للمزيد من المعلومات حول معلمات البحث عن التشابه، راجع <a href="/docs/ar/single-vector-search.md">بحث التشابه الأساسي</a>.</p>