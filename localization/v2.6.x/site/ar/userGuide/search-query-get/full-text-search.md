---
id: full-text-search.md
title: البحث في النص الكامل
summary: >-
  البحث عن النص الكامل هي ميزة تسترجع المستندات التي تحتوي على مصطلحات أو عبارات
  محددة في مجموعات البيانات النصية، ثم تقوم بترتيب النتائج بناءً على مدى
  ملاءمتها. تتغلب هذه الميزة على قيود البحث الدلالي، التي قد تغفل المصطلحات
  الدقيقة، مما يضمن حصولك على النتائج الأكثر دقة وذات الصلة بالسياق. بالإضافة
  إلى ذلك، تعمل هذه الميزة على تبسيط عمليات البحث المتجهية من خلال قبول مدخلات
  نصية أولية، وتحويل بياناتك النصية تلقائيًا إلى تضمينات متفرقة دون الحاجة إلى
  إنشاء تضمينات متجهة يدويًا.
---
<h1 id="Full-Text-Search" class="common-anchor-header">البحث في النص الكامل<button data-href="#Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>البحث بالنص الكامل هي ميزة تسترجع المستندات التي تحتوي على مصطلحات أو عبارات محددة في مجموعات البيانات النصية، ثم تقوم بترتيب النتائج بناءً على مدى ملاءمتها. تتغلب هذه الميزة على قيود البحث الدلالي التي قد تغفل المصطلحات الدقيقة، مما يضمن حصولك على النتائج الأكثر دقة وذات الصلة بالسياق. بالإضافة إلى ذلك، تعمل هذه الميزة على تبسيط عمليات البحث المتجهية من خلال قبول مدخلات النص الخام، وتحويل بياناتك النصية تلقائيًا إلى تضمينات متفرقة دون الحاجة إلى إنشاء تضمينات متجهة يدويًا.</p>
<p>وباستخدام خوارزمية BM25 لتسجيل درجة الملاءمة، تُعد هذه الميزة ذات قيمة خاصة في سيناريوهات التوليد المعزز للاسترجاع (RAG)، حيث تعطي الأولوية للمستندات التي تتطابق بشكل وثيق مع مصطلحات بحث محددة.</p>
<div class="alert note">
<p>من خلال دمج البحث عن النص الكامل مع البحث المتجه الكثيف القائم على الدلالة، يمكنك تحسين دقة نتائج البحث ومدى ملاءمتها. لمزيد من المعلومات، راجع <a href="/docs/ar/multi-vector-search.md">البحث المختلط</a>.</p>
</div>
<h2 id="BM25-implementation" class="common-anchor-header">تطبيق BM25<button data-href="#BM25-implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر Milvus بحثًا نصيًا كاملاً مدعومًا بخوارزمية الملاءمة BM25، وهي وظيفة تسجيل نقاط معتمدة على نطاق واسع في أنظمة استرجاع المعلومات، ويدمجها Milvus في سير عمل البحث لتقديم نتائج نصية دقيقة ومطابقة للمعلومات ذات الصلة.</p>
<p>يتبع البحث عن النص الكامل في ميلفوس سير العمل أدناه:</p>
<ol>
<li><p><strong>إدخال النص الخام</strong>: تقوم بإدخال مستندات نصية أو تقديم استعلام باستخدام نص عادي، دون الحاجة إلى نماذج تضمين.</p></li>
<li><p><strong>تحليل النص</strong>: يستخدم ميلفوس <a href="/docs/ar/analyzer-overview.md">محلل</a> لمعالجة النص الخاص بك إلى مصطلحات ذات معنى يمكن فهرستها والبحث فيها.</p></li>
<li><p><strong>معالجة دالة BM25</strong>: تقوم الدالة المدمجة بتحويل هذه المصطلحات إلى تمثيلات متجهة متفرقة محسّنة لتسجيل BM25.</p></li>
<li><p><strong>مخزن المجموعة</strong>: يخزن ميلفوس التضمينات المتفرقة الناتجة في مجموعة لاسترجاعها وترتيبها بسرعة.</p></li>
<li><p><strong>تسجيل درجة الملاءمة BM25</strong>: في وقت البحث، يطبّق ميلفوس دالة تسجيل BM25 لحساب مدى ملاءمة المستند وإرجاع النتائج المصنفة التي تتطابق بشكل أفضل مع مصطلحات الاستعلام.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/full-text-search.png" alt="Full Text Search" class="doc-image" id="full-text-search" />
   </span> <span class="img-wrapper"> <span>البحث بالنص الكامل</span> </span></p>
<p>لاستخدام البحث بالنص الكامل، اتبع الخطوات الرئيسية التالية:</p>
<ol>
<li><p><a href="/docs/ar/full-text-search.md#Create-a-collection-for-BM25-full-text-search">إنشاء مجموعة</a>: إعداد الحقول المطلوبة وتحديد دالة BM25 التي تحوّل النص الخام إلى تضمينات متفرقة.</p></li>
<li><p><a href="/docs/ar/full-text-search.md#Insert-text-data">إدراج البيانات</a>: أدخل مستنداتك النصية الأولية في المجموعة.</p></li>
<li><p><a href="/docs/ar/full-text-search.md#Perform-full-text-search">إجراء عمليات البحث</a>: استخدم نص الاستعلام باللغة الطبيعية لاسترداد النتائج المرتبة بناءً على صلة BM25.</p></li>
</ol>
<h2 id="Create-a-collection-for-BM25-full-text-search" class="common-anchor-header">إنشاء مجموعة للبحث عن النص الكامل لـ BM25<button data-href="#Create-a-collection-for-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>لتمكين البحث عن النص الكامل المدعوم من BM25، يجب عليك إعداد مجموعة بالحقول المطلوبة، وتحديد دالة BM25 لإنشاء متجهات متناثرة، وتكوين فهرس، ثم إنشاء المجموعة.</p>
<h3 id="Define-schema-fields" class="common-anchor-header">تحديد حقول المخطط<button data-href="#Define-schema-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>يجب أن يتضمن مخطط مجموعتك ثلاثة حقول مطلوبة على الأقل:</p>
<ul>
<li><p><strong>الحقل الأساسي</strong>: يحدد بشكل فريد كل كيان في المجموعة.</p></li>
<li><p><strong>حقل نصي</strong> (<code translate="no">VARCHAR</code>): يخزن المستندات النصية الخام. يجب تعيين <code translate="no">enable_analyzer=True</code> حتى يتمكن ميلفوس من معالجة النص لترتيب صلة BM25. بشكل افتراضي، يستخدم Milvus <a href="/docs/ar/standard-analyzer.md"><code translate="no">standard</code></a><a href="/docs/ar/standard-analyzer.md"> محلل</a> لتحليل النص. لتكوين محلل مختلف، ارجع إلى <a href="/docs/ar/analyzer-overview.md">نظرة عامة على المحلل</a>.</p></li>
<li><p><strong>حقل متجه متناثر</strong> (<code translate="no">SPARSE_FLOAT_VECTOR</code>): يخزن التضمينات المتناثرة التي يتم إنشاؤها تلقائيًا بواسطة دالة BM25.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا</a> <a href="#go">جو جو</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

schema = client.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Primary field</span>
<span class="highlighted-comment-line">schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Text field</span></span>
<span class="highlighted-comment-line">schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR) <span class="hljs-comment"># Sparse vector field; no dim required for sparse vectors</span></span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">1000</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,
  },
];

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>في التكوين السابق,</p>
<ul>
<li><p><code translate="no">id</code>: يعمل كمفتاح أساسي ويتم إنشاؤه تلقائيًا باستخدام <code translate="no">auto_id=True</code>.</p></li>
<li><p><code translate="no">text</code>: يخزن بيانات النص الخام لعمليات البحث عن النص الكامل. يجب أن يكون نوع البيانات <code translate="no">VARCHAR</code> ، حيث أن <code translate="no">VARCHAR</code> هو نوع بيانات سلسلة ميلفوس لتخزين النص.</p></li>
<li><p><code translate="no">sparse</code>:: حقل متجه محجوز لتخزين التضمينات المتفرقة التي تم إنشاؤها داخليًا لعمليات البحث عن النص الكامل. يجب أن يكون نوع البيانات <code translate="no">SPARSE_FLOAT_VECTOR</code>.</p></li>
</ul>
<h3 id="Define-the-BM25-function" class="common-anchor-header">تعريف دالة BM25<button data-href="#Define-the-BM25-function" class="anchor-icon" translate="no">
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
    </button></h3><p>تقوم الدالة BM25 بتحويل النص الرمزي إلى متجهات متفرقة تدعم تسجيل BM25.</p>
<p>عرّف الدالة وأضفها إلى مخططك:</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#go">جو</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text data</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings</span>
<span class="highlighted-wrapper-line">    function_type=FunctionType.BM25, <span class="hljs-comment"># Set to `BM25`</span></span>
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;sparse&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;text_bm25_emb&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&#x27;sparse&#x27;</span>],
      <span class="hljs-attr">params</span>: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            }
        ],
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;text_bm25_emb&quot;,
                &quot;type&quot;: &quot;BM25&quot;,
                &quot;inputFieldNames&quot;: [&quot;text&quot;],
                &quot;outputFieldNames&quot;: [&quot;sparse&quot;],
                &quot;params&quot;: {}
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>اسم الدالة. تقوم هذه الدالة بتحويل النص الخام من الحقل <code translate="no">text</code> إلى متجهات متناثرة متوافقة مع BM25 والتي سيتم تخزينها في الحقل <code translate="no">sparse</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>اسم الحقل <code translate="no">VARCHAR</code> الذي يتطلب تحويل النص إلى متجهات متفرقة. بالنسبة إلى <code translate="no">FunctionType.BM25</code> ، تقبل هذه المعلمة اسم حقل واحد فقط.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>اسم الحقل حيث سيتم تخزين المتجهات المتفرقة التي تم إنشاؤها داخلياً. بالنسبة إلى <code translate="no">FunctionType.BM25</code> ، تقبل هذه المعلمة اسم حقل واحد فقط.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>نوع الدالة المراد استخدامها. يجب أن يكون <code translate="no">FunctionType.BM25</code>.</p></td>
   </tr>
</table>
<div class="alert note">
<p>إذا كانت هناك حقول متعددة <code translate="no">VARCHAR</code> تتطلب معالجة BM25، قم بتعريف <strong>دالة BM25 واحدة لكل حقل،</strong> لكل منها اسم فريد وحقل إخراج.</p>
</div>
<h3 id="Configure-the-index" class="common-anchor-header">تكوين الفهرس<button data-href="#Configure-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد تحديد المخطط مع الحقول الضرورية والدالة المدمجة، قم بإعداد الفهرس لمجموعتك.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#go">جو</a> <a href="#javascript">NodeJS</a> <a href="#bash">CURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,

    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>
    }

)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String,Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);
params.put(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-number">1.2</span>);
params.put(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-number">0.75</span>);

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.BM25)
        .extraParams(params)
        .build());    
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>,
    index.NewAutoIndex(entity.MetricType(entity.BM25)))
    .WithExtraParam(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>)
    .WithExtraParam(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-number">1.2</span>)
    .WithExtraParam(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-number">0.75</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>
    }
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;sparse&quot;,
            &quot;metricType&quot;: &quot;BM25&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;,
            &quot;params&quot;:{
               &quot;inverted_index_algo&quot;: &quot;DAAT_MAXSCORE&quot;,
               &quot;bm25_k1&quot;: 1.2,
               &quot;bm25_b&quot;: 0.75
            }
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>اسم الحقل المتجه المراد فهرسته. للبحث عن النص الكامل، يجب أن يكون هذا هو الحقل الذي يخزن المتجهات المتفرقة التي تم إنشاؤها. في هذا المثال، اضبط القيمة على <code translate="no">sparse</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>نوع الفهرس المراد إنشاؤه. <code translate="no">AUTOINDEX</code> يسمح لـ Milvus بتحسين إعدادات الفهرس تلقائيًا. إذا كنت بحاجة إلى مزيد من التحكم في إعدادات الفهرس الخاص بك، يمكنك الاختيار من بين أنواع الفهارس المختلفة المتاحة للمتجهات المتفرقة في ملفوس. لمزيد من المعلومات، راجع <a href="/docs/ar/index.md#Indexes-supported-in-Milvus">الفهارس المدعومة في ملفوس</a>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">metric_type</code></p></td>
     <td><p>يجب تعيين قيمة هذه المعلمة على <code translate="no">BM25</code> خصيصًا لوظيفة البحث عن النص الكامل.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>قاموس المعلمات الإضافية الخاصة بالفهرس.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.inverted_index_algo</code></p></td>
     <td><p>الخوارزمية المستخدمة لبناء الفهرس والاستعلام عنه. قيم صالحة:</p><ul><li><p><code translate="no">"DAAT_MAXSCORE"</code> (افتراضي): معالجة استعلام المستند في الوقت المحسن (DAAT) باستخدام خوارزمية MaxScore. يوفر MaxScore أداءً أفضل لقيم <em>k</em> العالية أو الاستعلامات التي تحتوي على العديد من المصطلحات عن طريق تخطي المصطلحات والمستندات التي من المحتمل أن يكون لها تأثير ضئيل. وهي تحقق ذلك من خلال تقسيم المصطلحات إلى مجموعات أساسية وغير أساسية بناءً على درجات التأثير القصوى، مع التركيز على المصطلحات التي يمكن أن تساهم في أعلى k من النتائج.</p></li><li><p><code translate="no">"DAAT_WAND"</code>: معالجة استعلام DAAT الأمثل باستخدام خوارزمية WAND. تقوم WAND بتقييم عدد أقل من المستندات التي تم الوصول إليها من خلال الاستفادة من درجات التأثير القصوى لتخطي المستندات غير المنافسة، ولكن لديها نفقات أعلى لكل ضربة. هذا يجعل WAND أكثر كفاءة للاستعلامات ذات القيم <em>k</em> الصغيرة أو الاستعلامات القصيرة، حيث يكون التخطي أكثر جدوى.</p></li><li><p><code translate="no">"TAAT_NAIVE"</code>: معالجة استعلام المصطلح الأساسي في الوقت (TAAT). على الرغم من أنها أبطأ مقارنةً بـ <code translate="no">DAAT_MAXSCORE</code> و <code translate="no">DAAT_WAND</code> ، إلا أن <code translate="no">TAAT_NAIVE</code> تقدم ميزة فريدة. على عكس خوارزميات DAAT، التي تستخدم درجات التأثير القصوى المخزنة مؤقتًا والتي تظل ثابتة بغض النظر عن التغييرات التي تطرأ على معلمة التجميع العالمية (avgdl)، يتكيف <code translate="no">TAAT_NAIVE</code> ديناميكيًا مع هذه التغييرات.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.bm25_k1</code></p></td>
     <td><p>يتحكم في تشبع تردد المصطلح. تزيد القيم الأعلى من أهمية ترددات المصطلحات في ترتيب المستندات. نطاق القيمة: [1.2, 2.0].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.bm25_b</code></p></td>
     <td><p>يتحكم في مدى تطبيع طول المستند. يتم استخدام القيم بين 0 و1 عادة، مع وجود قيمة افتراضية شائعة حوالي 0.75. القيمة 1 تعني عدم تطبيع الطول، بينما القيمة 0 تعني التطبيع الكامل.</p></td>
   </tr>
</table>
<h3 id="Create-the-collection" class="common-anchor-header">إنشاء المجموعة<button data-href="#Create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>الآن أنشئ المجموعة باستخدام المخطط ومعلمات الفهرس المحددة.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#go">جو</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">create_collection</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>, 
    <span class="hljs-attr">schema</span>: schema, 
    <span class="hljs-attr">index_params</span>: index_params,
    <span class="hljs-attr">functions</span>: functions
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-text-data" class="common-anchor-header">أدخل بيانات نصية<button data-href="#Insert-text-data" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد إعداد المجموعة والفهرس الخاص بك، أنت جاهز لإدراج البيانات النصية. في هذه العملية، تحتاج فقط إلى توفير النص الخام. تقوم الدالة المدمجة التي حددناها سابقًا تلقائيًا بإنشاء المتجه المتناثر المقابل لكل إدخال نصي.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#go">جو</a> <a href="#javascript">نودجيس</a> <a href="#bash">CURL</a></div>
<pre><code translate="no" class="language-python">client.insert(<span class="hljs-string">&#x27;my_collection&#x27;</span>, [
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval is a field of study.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval focuses on finding relevant information in large datasets.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;data mining and information retrieval overlap in research.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; rows = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;information retrieval is a field of study.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;information retrieval focuses on finding relevant information in large datasets.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;data mining and information retrieval overlap in research.\&quot;}&quot;</span>, JsonObject.class)
);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
<span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>, 
<span class="hljs-attr">data</span>: [
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval is a field of study.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval focuses on finding relevant information in large datasets.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;data mining and information retrieval overlap in research.&#x27;</span>},
]);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;text&quot;: &quot;information retrieval is a field of study.&quot;},
        {&quot;text&quot;: &quot;information retrieval focuses on finding relevant information in large datasets.&quot;},
        {&quot;text&quot;: &quot;data mining and information retrieval overlap in research.&quot;}       
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Perform-full-text-search" class="common-anchor-header">إجراء بحث نصي كامل<button data-href="#Perform-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد إدراج البيانات في مجموعتك، يمكنك إجراء عمليات بحث نصية كاملة باستخدام استعلامات نصية خام. يقوم Milvus تلقائيًا بتحويل استعلامك إلى متجه متناثر وترتيب نتائج البحث المتطابقة باستخدام خوارزمية BM25، ثم يُرجع أعلىK (<code translate="no">limit</code>) النتائج.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#go">جو</a> <a href="#javascript">NodeJS</a> <a href="#bash">CURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>, 
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&#x27;whats the focus of information retrieval?&#x27;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&#x27;text&#x27;</span>], <span class="hljs-comment"># Fields to return in search results; sparse field cannot be output</span></span>
    limit=<span class="hljs-number">3</span>,
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;whats the focus of information retrieval?&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse&quot;</span>)
        .topK(<span class="hljs-number">3</span>)
        .searchParams(searchParams)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">annSearchParams := index.NewCustomAnnParam()
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;whats the focus of information retrieval?&quot;</span>)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithAnnParam(annSearchParams).
    WithOutputFields(<span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;text: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;text&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>, 
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&#x27;whats the focus of information retrieval?&#x27;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&#x27;sparse&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        &quot;whats the focus of information retrieval?&quot;
    ],
    &quot;annsField&quot;: &quot;sparse&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [
        &quot;text&quot;
    ],
    &quot;searchParams&quot;:{
        &quot;params&quot;:{}
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_params</code></p></td>
     <td><p>قاموس يحتوي على معلمات البحث.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.drop_ratio_search</code></p></td>
     <td><p>نسبة المصطلحات منخفضة الأهمية لتجاهلها أثناء البحث. لمزيد من التفاصيل، راجع <a href="/docs/ar/sparse_vector.md">Sparse Vector</a>.</p></td>
   </tr>
   <tr>
     <td></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">data</code></p></td>
     <td><p>نص استعلام أولي بلغة طبيعية. يقوم ميلفوس بتحويل الاستعلام النصي تلقائياً إلى متجهات متفرقة باستخدام الدالة BM25 - لا تقدم متجهات محسوبة مسبقاً.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">anns_field</code></p></td>
     <td><p>اسم الحقل الذي يحتوي على متجهات متفرقة تم إنشاؤها داخلياً.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_fields</code></p></td>
     <td><p>قائمة بأسماء الحقول لإرجاعها في نتائج البحث. يدعم جميع الحقول <strong>باستثناء الحقل المتجه المتناثر</strong> الذي يحتوي على التضمينات التي تم إنشاؤها بواسطة BM25. تتضمن حقول الإخراج الشائعة حقل المفتاح الأساسي (على سبيل المثال، <code translate="no">id</code>) وحقل النص الأصلي (على سبيل المثال، <code translate="no">text</code>). لمزيد من المعلومات، راجع <a href="/docs/ar/full-text-search.md#Can-I-output-or-access-the-sparse-vectors-generated-by-the-BM25-function-in-full-text-search">الأسئلة الشائعة</a>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">limit</code></p></td>
     <td><p>الحد الأقصى لعدد أعلى التطابقات التي سيتم إرجاعها.</p></td>
   </tr>
</table>
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
    </button></h2><h3 id="Can-I-output-or-access-the-sparse-vectors-generated-by-the-BM25-function-in-full-text-search" class="common-anchor-header">هل يمكنني إخراج أو الوصول إلى المتجهات المتفرقة التي تم إنشاؤها بواسطة دالة BM25 في البحث عن النص الكامل؟<button data-href="#Can-I-output-or-access-the-sparse-vectors-generated-by-the-BM25-function-in-full-text-search" class="anchor-icon" translate="no">
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
    </button></h3><p>لا، المتجهات المتفرقة التي تم إنشاؤها بواسطة دالة BM25 لا يمكن الوصول إليها أو إخراجها مباشرةً في البحث عن النص الكامل. فيما يلي التفاصيل:</p>
<ul>
<li><p>تقوم الدالة BM25 بإنشاء متجهات متفرقة داخليًا للترتيب والاسترجاع</p></li>
<li><p>يتم تخزين هذه المتجهات في الحقل المتناثر ولكن لا يمكن تضمينها في <code translate="no">output_fields</code></p></li>
<li><p>يمكنك فقط إخراج حقول النص الأصلي والبيانات الوصفية (مثل <code translate="no">id</code> ، <code translate="no">text</code>)</p></li>
</ul>
<p>مثال:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># ❌ This throws an error - you cannot output the sparse field</span>
client.search(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;query text&#x27;</span>],
    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,
<span class="highlighted-wrapper-line">    output_fields=[<span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;sparse&#x27;</span>]  <span class="hljs-comment"># &#x27;sparse&#x27; causes an error</span></span>
    limit=<span class="hljs-number">3</span>,
    search_params=search_params
)

<span class="hljs-comment"># ✅ This works - output text fields only</span>
client.search(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;query text&#x27;</span>],
    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,
<span class="highlighted-wrapper-line">    output_fields=[<span class="hljs-string">&#x27;text&#x27;</span>]</span>
    limit=<span class="hljs-number">3</span>,
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Why-do-I-need-to-define-a-sparse-vector-field-if-I-cant-access-it" class="common-anchor-header">لماذا أحتاج إلى تعريف حقل متجه متناثر إذا لم يكن بإمكاني الوصول إليه؟<button data-href="#Why-do-I-need-to-define-a-sparse-vector-field-if-I-cant-access-it" class="anchor-icon" translate="no">
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
    </button></h3><p>يعمل حقل المتجه المتناثر بمثابة فهرس بحث داخلي، على غرار فهارس قواعد البيانات التي لا يتفاعل معها المستخدمون مباشرةً.</p>
<p><strong>أساس منطقي للتصميم</strong>:</p>
<ul>
<li><p>فصل الاهتمامات: أنت تعمل مع النص (الإدخال/الإخراج)، بينما يتعامل ميلفوس مع المتجهات (المعالجة الداخلية)</p></li>
<li><p>الأداء: تتيح المتجهات المتناثرة المحسوبة مسبقًا ترتيب BM25 السريع أثناء الاستعلامات</p></li>
<li><p>تجربة المستخدم: يلخص عمليات المتجهات المعقدة خلف واجهة نصية بسيطة</p></li>
</ul>
<p><strong>إذا كنت بحاجة إلى الوصول إلى المتجهات</strong></p>
<ul>
<li><p>استخدم عمليات المتجهات المتفرقة يدوياً بدلاً من البحث النصي الكامل</p></li>
<li><p>إنشاء مجموعات منفصلة لسير عمل المتجهات المتفرقة المخصصة</p></li>
</ul>
<p>للحصول على التفاصيل، راجع <a href="/docs/ar/sparse_vector.md">المتجهات المتفرقة</a>.</p>
