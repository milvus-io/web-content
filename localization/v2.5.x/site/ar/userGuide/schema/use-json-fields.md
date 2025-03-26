---
id: use-json-fields.md
title: استخدام حقول JSON
summary: >-
  JSON (تدوين كائنات جافا سكريبت) هو تنسيق خفيف الوزن لتبادل البيانات يوفر طريقة
  مرنة لتخزين هياكل البيانات المعقدة والاستعلام عنها. في Milvus، يمكنك تخزين
  معلومات منظمة إضافية إلى جانب بيانات المتجهات باستخدام حقول JSON، مما يتيح
  عمليات بحث واستعلامات متقدمة تجمع بين تشابه المتجهات والتصفية المنظمة.
---
<h1 id="JSON-Field​" class="common-anchor-header">حقل JSON<button data-href="#JSON-Field​" class="anchor-icon" translate="no">
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
    </button></h1><p>حقل <a href="https://en.wikipedia.org/wiki/JSON">JSON</a> هو حقل قياسي يخزن معلومات إضافية إلى جانب تضمينات المتجهات، في أزواج مفاتيح-قيم. فيما يلي مثال على كيفية تخزين البيانات بتنسيق JSON:</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;metadata&quot;</span>: {
    <span class="hljs-string">&quot;product_info&quot;</span>: {
      <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>
    },
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
    <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;summer_sale&quot;</span>, <span class="hljs-string">&quot;clearance&quot;</span>]
  }
}
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
<li><strong>حجم الحقل</strong>: يقتصر حجم حقول JSON على 65,536 بايت.</li>
<li><strong>القواميس المتداخلة</strong>: يتم التعامل مع أي قواميس متداخلة داخل قيم حقول JSON كسلاسل عادية للتخزين.</li>
<li><strong>القيم الافتراضية</strong>: لا تدعم حقول JSON القيم الافتراضية. ومع ذلك، يمكنك تعيين السمة <code translate="no">nullable</code> إلى <code translate="no">True</code> للسماح بالقيم الفارغة. لمزيد من التفاصيل، راجع <a href="/docs/ar/nullable-and-default.md">Nullable &amp; Default</a>.</li>
<li><strong>مطابقة النوع</strong>: إذا كانت القيمة الرئيسية لحقل JSON عبارة عن عدد صحيح أو عدد عائم فلا يمكن مقارنتها (عبر مرشحات التعبير) إلا بمفتاح رقمي آخر من نفس النوع.</li>
<li><strong>التسمية</strong>: عند تسمية مفاتيح JSON، يوصى باستخدام الأحرف والأرقام والشرطات السفلية فقط. قد يسبب استخدام أحرف أخرى مشاكل عند التصفية أو البحث.</li>
<li><strong>التعامل مع السلسلة</strong>: يخزن Milvus قيم السلسلة في حقول JSON كما تم إدخالها، دون تحويل دلالي. على سبيل المثال<ul>
<li><code translate="no">'a&quot;b'</code> <code translate="no">&quot;a'b&quot;</code> و و و يتم تخزينها كما هي تمامًا. <code translate="no">'a\\'b'</code> <code translate="no">&quot;a\\&quot;b&quot;</code> </li>
<li><code translate="no">'a'b'</code> و <code translate="no">&quot;a&quot;b&quot;</code> تعتبر غير صالحة.</li>
</ul></li>
<li><strong>فهرسة JSON</strong>: عند فهرسة حقل JSON، يمكنك تحديد مسار واحد أو أكثر في حقل JSON لتسريع التصفية. يزيد كل مسار إضافي من عبء الفهرسة الزائد، لذا خطط لاستراتيجية الفهرسة بعناية. لمزيد من الاعتبارات حول فهرسة حقل JSON، راجع <a href="#considerations-on-json-indexing">اعتبارات فهرسة JSON</a>.</li>
</ul>
<h2 id="Add-JSON-field​" class="common-anchor-header">إضافة حقل JSON<button data-href="#Add-JSON-field​" class="anchor-icon" translate="no">
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
    </button></h2><p>لإضافة حقل JSON <code translate="no">metadata</code> إلى مخطط مجموعتك، استخدم <code translate="no">DataType.JSON</code>. يحدد المثال أدناه البيانات الوصفية لحقل JSON الذي يسمح بقيم فارغة:</p>
<p>إليك كيفية تعريف مخطط مجموعة يتضمن حقل JSON.</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Import necessary libraries</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Define server address</span>
SERVER_ADDR = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment"># Create a MilvusClient instance</span>
client = MilvusClient(uri=SERVER_ADDR)

<span class="hljs-comment"># Define the collection schema</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Add a JSON field that supports null values</span>
schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON, nullable=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .dataType(DataType.JSON)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">3</span>)
        .build());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">3</span>,
  },
];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;pk&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;embedding&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">3</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;metadata&quot;</span>).
    WithDataType(entity.FieldTypeJSON),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> jsonField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;metadata&quot;,
    &quot;dataType&quot;: &quot;JSON&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;pk&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;embedding&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 3
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;enableDynamicField\&quot;: true,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$jsonField</span>,
        <span class="hljs-variable">$pkField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>قم بتعيين <code translate="no">enable_dynamic_fields=True</code> إذا كنت بحاجة إلى إدراج حقول إضافية غير محددة في المستقبل.</li>
<li>استخدم <code translate="no">nullable=True</code> للسماح بوجود كائنات JSON مفقودة أو فارغة.</li>
</ul>
</div>
<h2 id="Set-index-params" class="common-anchor-header">تعيين بارامترات الفهرس<button data-href="#Set-index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>تساعد الفهرسة ميلفوس على تصفية أو البحث بسرعة عبر كميات كبيرة من البيانات. في ملفوس، الفهرسة هي</p>
<ul>
<li>إلزامي للحقول المتجهة (لتشغيل عمليات البحث عن التشابه بكفاءة).</li>
<li>اختياري لحقول JSON (لتسريع عمليات التصفية العددية على مسارات JSON محددة).</li>
</ul>
<h3 id="Index-a-JSON-field" class="common-anchor-header">فهرسة حقل JSON</h3><p>بشكل افتراضي، لا تتم فهرسة حقول JSON، لذا يجب على أي استعلامات تصفية (على سبيل المثال، <code translate="no">metadata[&quot;price&quot;] &lt; 100</code>) مسح جميع الصفوف. إذا كنت ترغب في تسريع الاستعلامات على مسارات محددة داخل الحقل <code translate="no">metadata</code> ، يمكنك إنشاء فهرس مقلوب على كل مسار تهتم به. في هذا المثال، سننشئ فهرسين على مسارات مختلفة داخل حقل JSON <code translate="no">metadata</code>:</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

# Example <span class="hljs-number">1</span>: Index the <span class="hljs-string">&#x27;category&#x27;</span> key inside <span class="hljs-string">&#x27;product_info&#x27;</span> as a <span class="hljs-type">string</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_1&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>
    }
)

# Example <span class="hljs-number">2</span>: Index <span class="hljs-string">&#x27;price&#x27;</span> as a numeric <span class="hljs-keyword">type</span> (double)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_2&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;

<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; extraParams_1 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams_1.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>);
extraParams_1.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);
indexes.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;json_index_1&quot;</span>)
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">INVERTED</span>)
        .<span class="hljs-title function_">extraParams</span>(extraParams_1)
        .<span class="hljs-title function_">build</span>());

<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; extraParams_2 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams_2.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>);
extraParams_2.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;double&quot;</span>);
indexes.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;json_index_2&quot;</span>)
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">INVERTED</span>)
        .<span class="hljs-title function_">extraParams</span>(extraParams_2)
        .<span class="hljs-title function_">build</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = [
    {
        field_name: <span class="hljs-string">&quot;metadata&quot;</span>,
        index_type: <span class="hljs-string">&quot;INVERTED&quot;</span>,
        index_name: <span class="hljs-string">&quot;json_index_1&quot;</span>,
        <span class="hljs-keyword">params</span>: {
            json_path: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,
            json_cast_type: <span class="hljs-string">&quot;varchar&quot;</span>
        }
    },
    {
        field_name: <span class="hljs-string">&quot;metadata&quot;</span>,
        index_type: <span class="hljs-string">&quot;INVERTED&quot;</span>,
        index_name: <span class="hljs-string">&quot;json_index_2&quot;</span>,
        <span class="hljs-keyword">params</span>: {
            json_path: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,
            json_cast_type: <span class="hljs-string">&quot;double&quot;</span>
        }
    }
]

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">jsonIndex1 := index.NewJSONPathIndex(index.Inverted, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;product_info&quot;][&quot;category&quot;]`</span>)
jsonIndex2 := index.NewJSONPathIndex(index.Inverted, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`metadata[&quot;price&quot;]`</span>)
indexOpt1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>, <span class="hljs-string">&quot;meta&quot;</span>, jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>, <span class="hljs-string">&quot;meta&quot;</span>, jsonIndex2)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;metadata&quot;,
            &quot;indexName&quot;: &quot;json_index_1&quot;,
            &quot;indexType&quot;: &quot;INVERTED&quot;,
            &quot;params&quot;: {
                &quot;json_path&quot;: &quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;,
                &quot;json_cast_type&quot;: &quot;varchar&quot;
            }
        }
    ]
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;metadata&quot;,
            &quot;indexName&quot;: &quot;json_index_2&quot;,
            &quot;indexType&quot;: &quot;INVERTED&quot;,
            &quot;params&quot;: {
                &quot;json_path&quot;: &quot;metadata[\&quot;price\&quot;]&quot;,
                &quot;json_cast_type&quot;: &quot;double&quot;
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th><strong>المعلمة</strong></th><th><strong>الوصف</strong></th><th><strong>قيمة المثال</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">field_name</code></td><td>اسم حقل JSON في مخططك.</td><td><code translate="no">&quot;metadata&quot;</code></td></tr>
<tr><td><code translate="no">index_type</code></td><td>نوع الفهرس المراد إنشاؤه؛ حاليًا فقط <code translate="no">INVERTED</code> مدعوم لفهرسة مسار JSON.</td><td><code translate="no">&quot;INVERTED&quot;</code></td></tr>
<tr><td><code translate="no">index_name</code></td><td>(اختياري) اسم فهرس مخصص. حدد أسماء مختلفة إذا قمت بإنشاء فهارس متعددة على نفس حقل JSON.</td><td><code translate="no">&quot;json_index_1&quot;</code></td></tr>
<tr><td><code translate="no">params.json_path</code></td><td>تحديد مسار JSON المراد فهرسته. يمكنك استهداف مفاتيح متداخلة أو مواضع مصفوفة أو كليهما (على سبيل المثال، <code translate="no">metadata[&quot;product_info&quot;][&quot;category&quot;]</code> أو <code translate="no">metadata[&quot;tags&quot;][0]</code>)، إذا كان المسار مفقودًا أو كان عنصر المصفوفة غير موجود لصف معين، يتم ببساطة تخطي هذا الصف أثناء الفهرسة، ولا يتم طرح أي خطأ.</td><td><code translate="no">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</code></td></tr>
<tr><td><code translate="no">params.json_cast_type</code></td><td>نوع البيانات الذي سيقوم ميلفوس بإرسال قيم JSON المستخرجة إليه عند بناء الفهرس. القيم الصالحة: <ul><li> <code translate="no">&quot;bool&quot;</code> أو <code translate="no">&quot;BOOL&quot;</code></li><li><code translate="no">&quot;double&quot;</code> أو <code translate="no">&quot;DOUBLE&quot;</code></li><li> <code translate="no">&quot;varchar&quot;</code> أو <code translate="no">&quot;VARCHAR&quot;</code></li></ul><br><strong>ملاحظة</strong>: بالنسبة لقيم الأعداد الصحيحة، يستخدم Milvus داخليًا مزدوجًا للفهرس. الأعداد الصحيحة الكبيرة التي تزيد عن 2^53 تفقد الدقة. في حال فشل الإرسال (بسبب عدم تطابق النوع)، لا يتم طرح أي خطأ، ولا تتم فهرسة قيمة ذلك الصف.</td><td><code translate="no">&quot;varchar&quot;</code></td></tr>
</tbody>
</table>
<h4 id="Considerations-on-JSON-indexing" class="common-anchor-header">اعتبارات حول فهرسة JSON</h4><ul>
<li><strong>منطق الفهرسة</strong>:<ul>
<li>إذا <strong>أنشأت فهرسًا من النوع المزدوج</strong> (<code translate="no">json_cast_type=&quot;double&quot;</code>)، يمكن فقط لشروط التصفية من النوع الرقمي استخدام الفهرس. إذا قارن عامل التصفية فهرسًا مزدوجًا بشرط غير رقمي، فإن ميلفوس يعود إلى البحث بالقوة الغاشمة.</li>
<li>إذا قمت <strong>بإنشاء فهرس من نوع varchar</strong> (<code translate="no">json_cast_type=&quot;varchar&quot;</code>)، يمكن فقط لشروط التصفية من نوع السلسلة استخدام الفهرس. خلاف ذلك، يعود ميلفوس إلى القوة الغاشمة.</li>
<li>تتصرف الفهرسة<strong>المنطقية</strong> بشكل مشابه للنوع المتغير.</li>
</ul></li>
<li><strong>تعبيرات المصطلحات</strong>:<ul>
<li>يمكنك استخدام <code translate="no">json[&quot;field&quot;] in [value1, value2, …]</code>. ومع ذلك، يعمل الفهرس فقط للقيم العددية المخزنة تحت هذا المسار. إذا كان <code translate="no">json[&quot;field&quot;]</code> عبارة عن مصفوفة، يعود الاستعلام إلى القوة الغاشمة (الفهرسة من نوع الصفيف غير مدعومة بعد).</li>
</ul></li>
<li><strong>الدقة العددية</strong>:<ul>
<li>داخليًا، يقوم ميلفوس بفهرسة جميع الحقول الرقمية كمضاعفات. إذا تجاوزت قيمة رقمية 2^53، فإنها تفقد الدقة، وقد لا تتطابق الاستعلامات على تلك القيم خارج النطاق تمامًا.</li>
</ul></li>
<li><strong>تكامل البيانات</strong>:<ul>
<li>لا يقوم Milvus بتحليل مفاتيح JSON أو تحويلها إلى ما هو أبعد من الصب المحدد. إذا كانت بيانات المصدر غير متناسقة (على سبيل المثال، تخزن بعض الصفوف سلسلة للمفتاح <code translate="no">&quot;k&quot;</code> بينما تخزن أخرى رقمًا)، فلن تتم فهرسة بعض الصفوف.</li>
</ul></li>
</ul>
<h3 id="Index-a-vector-field" class="common-anchor-header">فهرسة حقل متجه</h3><p>يقوم المثال التالي بإنشاء فهرس على تضمين الحقل المتجه، باستخدام نوع الفهرس AUTOINDEX. باستخدام هذا النوع، يختار Milvus تلقائيًا الفهرس الأنسب بناءً على نوع البيانات. يمكنك أيضًا تخصيص نوع الفهرس والبارامترات لكل حقل.</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set index params</span>

index_params = client.prepare_index_params()

<span class="hljs-comment"># Index `embedding` with AUTOINDEX and specify similarity metric type</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Use automatic indexing to simplify complex index settings</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>  <span class="hljs-comment"># Specify similarity metric type, options include L2, COSINE, or IP</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexName(<span class="hljs-string">&quot;vector_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;embedding_index&#x27;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;embedding&#x27;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;vector_index&#x27;</span>,
    <span class="hljs-attr">metricType</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">CONSINE</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">vectorIndex := index.NewAutoIndex(entity.COSINE)
indexOpt := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>, vectorIndex)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;indexName&quot;: &quot;vector_index&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
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
    </button></h2><p>بمجرد تحديد المخطط والفهرس، قم بإنشاء مجموعة تتضمن حقول سلسلة.</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">create_collection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_json_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: indexParams
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>, schema).
        WithIndexOptions(indexOpt1, indexOpt2, indexOpt))
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-comment">// handler err</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_json_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>

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
    </button></h2><p>بعد إنشاء المجموعة، أدرج الكيانات التي تطابق المخطط.</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample data</span>
data = [
    {
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;summer_sale&quot;</span>]
        },
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
    },
    {
        <span class="hljs-string">&quot;metadata&quot;</span>: <span class="hljs-literal">None</span>,  <span class="hljs-comment"># Entire JSON object is null</span>
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]
    },
    {
        <span class="hljs-comment"># JSON field is completely missing</span>
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]
    },
    {
        <span class="hljs-comment"># Some sub-keys are null</span>
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandB&quot;</span>},
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">59.99</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">None</span>
        },
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.21</span>]
    }
]

client.insert(
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,
    data=data
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
Gson gson = <span class="hljs-keyword">new</span> Gson();
rows.<span class="hljs-keyword">add</span>(gson.fromJson(<span class="hljs-string">&quot;{\&quot;metadata\&quot;:{\&quot;product_info\&quot;:{\&quot;category\&quot;:\&quot;electronics\&quot;,\&quot;brand\&quot;:\&quot;BrandA\&quot;},\&quot;price\&quot;:99.99,\&quot;in_stock\&quot;:True,\&quot;tags\&quot;:[\&quot;summer_sale\&quot;]},\&quot;pk\&quot;:1,\&quot;embedding\&quot;:[0.12,0.34,0.56]}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>));
rows.<span class="hljs-keyword">add</span>(gson.fromJson(<span class="hljs-string">&quot;{\&quot;metadata\&quot;:null,\&quot;pk\&quot;:2,\&quot;embedding\&quot;:[0.56,0.78,0.90]}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>));
rows.<span class="hljs-keyword">add</span>(gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;:3,\&quot;embedding\&quot;:[0.91,0.18,0.23]}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>));
rows.<span class="hljs-keyword">add</span>(gson.fromJson(<span class="hljs-string">&quot;{\&quot;metadata\&quot;:{\&quot;product_info\&quot;:{\&quot;category\&quot;:null,\&quot;brand\&quot;:\&quot;BrandB\&quot;},\&quot;price\&quot;:59.99,\&quot;in_stock\&quot;:null},\&quot;pk\&quot;:4,\&quot;embedding\&quot;:[0.56,0.38,0.21]}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>));

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)
        .data(rows)
        .build());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">const data = [
    {
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;summer_sale&quot;</span>]
        },
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
    },
    {
        <span class="hljs-string">&quot;metadata&quot;</span>: <span class="hljs-literal">None</span>,  <span class="hljs-comment"># Entire JSON object is null</span>
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]
    },
    {
        <span class="hljs-comment"># JSON field is completely missing</span>
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]
    },
    {
        <span class="hljs-comment"># Some sub-keys are null</span>
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandB&quot;</span>},
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">59.99</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">None</span>
        },
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.21</span>]
    }
];

<span class="hljs-keyword">await</span> client.insert({
    collection_name: <span class="hljs-string">&quot;my_json_collection&quot;</span>,
    data: data
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

resp, err := cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;pk&quot;</span>, []int64{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;embedding&quot;</span>, <span class="hljs-number">3</span>, [][]float32{
        {<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>},
        {<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>},
        {<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>},
        {<span class="hljs-number">0.56</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.21</span>},
    }).WithColumns(
    column.NewColumnJSONBytes(<span class="hljs-string">&quot;metadata&quot;</span>, [][]<span class="hljs-type">byte</span>{
        []<span class="hljs-type">byte</span>(`{
        <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},
        <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>: True,
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;summer_sale&quot;</span>]
    }`),
        []<span class="hljs-type">byte</span>(`<span class="hljs-literal">null</span>`),
        []<span class="hljs-type">byte</span>(`<span class="hljs-literal">null</span>`),
        []<span class="hljs-type">byte</span>(`<span class="hljs-string">&quot;metadata&quot;</span>: {
        <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: None, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandB&quot;</span>},
        <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">59.99</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>: None
    }`),
    }),
))
<span class="hljs-keyword">if</span> err != nil {
    <span class="hljs-comment">// handle err</span>
}
fmt.Println(resp)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {
             &quot;metadata&quot;:  {
                   &quot;product_info&quot;: {&quot;category&quot;: &quot;electronics&quot;, &quot;brand&quot;: &quot;BrandA&quot;},
                  &quot;price&quot;:  99.99,
                   &quot;in_stock&quot;:  true,
                  &quot;tags&quot;: [&quot;summer_sale&quot;]
              }, 
             &quot;varchar_field2&quot;: &quot;High quality product&quot;, 
             &quot;pk&quot;: 1, 
             &quot;embedding&quot;: [0.1, 0.2, 0.3]
          },
          {
              &quot;metadata&quot;: null,
              &quot;pk&quot;: 2,
              &quot;embedding&quot;: [0.56, 0.78, 0.90]
          },
         {
               &quot;pk&quot;: 3,
               &quot;embedding&quot;: [0.91, 0.18, 0.23]
         },
        {
              &quot;metadata&quot;: {
                     &quot;product_info&quot;: {&quot;category&quot;: null, &quot;brand&quot;: &quot;BrandB&quot;},
                     &quot;price&quot;: 59.99,
                     &quot;in_stock&quot;: null
               },
              &quot;pk&quot;: 4,
              &quot;embedding&quot;: [0.56, 0.38, 0.21]
         }
    ],
    &quot;collectionName&quot;: &quot;my_json_collection&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Query-with-filter-expressions" class="common-anchor-header">الاستعلام باستخدام تعبيرات التصفية</h3><p>بعد إدراج الكيانات، استخدم طريقة الاستعلام لاسترداد الكيانات التي تطابق تعبيرات التصفية المحددة.</p>
<div class="alert note">
<p>بالنسبة لحقول JSON التي تسمح بقيم فارغة، سيتم التعامل مع الحقل على أنه فارغ إذا كان كائن JSON بأكمله مفقودًا أو مضبوطًا على لا شيء. لمزيد من المعلومات، راجع حقول JSON ذات القيم الفارغة.</p>
</div>
<p>لاسترداد الكيانات التي تكون فيها البيانات الوصفية غير فارغة:</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query to filter out records with null metadata</span>

<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata is not null&#x27;</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-comment"># Expected result:</span>
<span class="hljs-comment"># Rows with pk=1 and pk=4 have valid, non-null metadata.</span>
<span class="hljs-comment"># Rows with pk=2 (metadata=None) and pk=3 (no metadata key) are excluded.</span>

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;product_info&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;price&#x27;: 99.99, &#x27;in_stock&#x27;: True, &#x27;tags&#x27;: [&#x27;summer_sale&#x27;]}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;product_info&#x27;: {&#x27;category&#x27;: None, &#x27;brand&#x27;: &#x27;BrandB&#x27;}, &#x27;price&#x27;: 59.99, &#x27;in_stock&#x27;: None}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;metadata is not null&quot;</span>;
QueryResp resp = client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
        .build());

System.out.println(resp.getQueryResults());

// Output
//
// [
//    QueryResp.QueryResult(entity={metadata={<span class="hljs-string">&quot;product_info&quot;</span>:{<span class="hljs-string">&quot;category&quot;</span>:<span class="hljs-string">&quot;electronics&quot;</span>,<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;BrandA&quot;</span>},<span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">99.99</span>,<span class="hljs-string">&quot;in_stock&quot;</span>:true,<span class="hljs-string">&quot;tags&quot;</span>:[<span class="hljs-string">&quot;summer_sale&quot;</span>]}, pk=<span class="hljs-number">1</span>}),
//    QueryResp.QueryResult(entity={metadata={<span class="hljs-string">&quot;product_info&quot;</span>:{<span class="hljs-string">&quot;category&quot;</span>:null,<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;BrandB&quot;</span>},<span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">59.99</span>,<span class="hljs-string">&quot;in_stock&quot;</span>:null}, pk=<span class="hljs-number">4</span>})
// ]

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.query({
    collection_name: <span class="hljs-string">&#x27;my_scalar_collection&#x27;</span>,
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot; and metadata[&quot;price&quot;] &lt; 150&#x27;</span>,
    output_fields: [<span class="hljs-string">&#x27;metadata&#x27;</span>]
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">rs, err := cli.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;metadata is not null&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(rs.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>))
fmt.Println(rs.GetColumn(<span class="hljs-string">&quot;metadata&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_json_collection&quot;,
    &quot;filter&quot;: &quot;metadata is not null&quot;,
    &quot;outputFields&quot;: [&quot;metadata&quot;, &quot;pk&quot;]
}&#x27;</span>

<span class="hljs-comment">#{&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;metadata&quot;:&quot;{\&quot;product_info\&quot;: {\&quot;category\&quot;: \&quot;electronics\&quot;, \&quot;brand\&quot;: \&quot;BrandA\&quot;}, \&quot;price\&quot;: 99.99, \&quot;in_stock\&quot;: true, \&quot;tags\&quot;: [\&quot;summer_sale\&quot;]}&quot;,&quot;pk&quot;:1},{&quot;metadata&quot;:&quot;&quot;,&quot;pk&quot;:2},{&quot;metadata&quot;:&quot;&quot;,&quot;pk&quot;:3},{&quot;metadata&quot;:&quot;{\&quot;product_info\&quot;: {\&quot;category\&quot;: null, \&quot;brand\&quot;: \&quot;BrandB\&quot;}, \&quot;price\&quot;: 59.99, \&quot;in_stock\&quot;: null}&quot;,&quot;pk&quot;:4}]}</span>

<button class="copy-code-btn"></button></code></pre>
<p>لاسترداد الكيانات حيث <code translate="no">metadata[&quot;product_info&quot;][&quot;category&quot;]</code> هو <code translate="no">&quot;electronics&quot;</code>:</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;product_info&quot;][&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-comment"># Expected result:</span>
<span class="hljs-comment"># - Only pk=1 has &quot;category&quot;: &quot;electronics&quot;.</span>
<span class="hljs-comment"># - pk=4 has &quot;category&quot;: None, so it doesn&#x27;t match.</span>
<span class="hljs-comment"># - pk=2 and pk=3 have no valid metadata.</span>

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;pk&#x27;: 1, &#x27;metadata&#x27;: {&#x27;product_info&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;price&#x27;: 99.99, &#x27;in_stock&#x27;: True, &#x27;tags&#x27;: [&#x27;summer_sale&#x27;]}}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;] == \&quot;electronics\&quot;&quot;</span>;

QueryResp resp = client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
        .build());

System.out.println(resp.getQueryResults());

// Output
// [QueryResp.QueryResult(entity={metadata={<span class="hljs-string">&quot;product_info&quot;</span>:{<span class="hljs-string">&quot;category&quot;</span>:<span class="hljs-string">&quot;electronics&quot;</span>,<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;BrandA&quot;</span>},<span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">99.99</span>,<span class="hljs-string">&quot;in_stock&quot;</span>:true,<span class="hljs-string">&quot;tags&quot;</span>:[<span class="hljs-string">&quot;summer_sale&quot;</span>]}, pk=<span class="hljs-number">1</span>})]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">const <span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>;
const res = <span class="hljs-keyword">await</span> client.query({
    collection_name: <span class="hljs-string">&quot;my_json_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>: <span class="hljs-built_in">filter</span>,
    output_fields: [<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
});

// Example output:
// {
//.  data: [
//      {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;metadata&#x27;</span>: {<span class="hljs-string">&#x27;category&#x27;</span>: <span class="hljs-string">&#x27;electronics&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;BrandA&#x27;</span>}}
// ]
// }
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">rs, err := cli.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>).
    WithFilter(`metadata[<span class="hljs-string">&quot;product_info&quot;</span>][<span class="hljs-string">&quot;category&quot;</span>] == <span class="hljs-string">&quot;electronics&quot;</span>`).
    WithOutputFields(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
<span class="hljs-keyword">if</span> err != nil {
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(rs.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>))
fmt.Println(rs.GetColumn(<span class="hljs-string">&quot;metadata&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;my_json_collection&quot;,
  &quot;filter&quot;: &quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;] == \&quot;electronics\&quot;&quot;,
  &quot;outputFields&quot;: [&quot;metadata&quot;, &quot;pk&quot;]
}&#x27;</span>

<span class="hljs-comment">#{&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;metadata&quot;:&quot;{\&quot;product_info\&quot;: {\&quot;category\&quot;: \&quot;electronics\&quot;, \&quot;brand\&quot;: \&quot;BrandA\&quot;}, \&quot;price\&quot;: 99.99, \&quot;in_stock\&quot;: true, \&quot;tags\&quot;: [\&quot;summer_sale\&quot;]}&quot;,&quot;pk&quot;:1}]}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Vector-search-with-JSON-filtering​" class="common-anchor-header">البحث المتجه مع تصفية JSON</h3><p>بالإضافة إلى تصفية الحقول القياسية الأساسية، يمكنك دمج عمليات البحث عن التشابه المتجه مع مرشحات الحقول القياسية. على سبيل المثال، توضح الشيفرة التالية كيفية إضافة عامل تصفية الحقل القياسي إلى بحث متجه:</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;product_info&quot;][&quot;brand&quot;] == &quot;BrandA&quot;&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,
    data=[[<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>]],
    limit=<span class="hljs-number">5</span>,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>],
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>
)

<span class="hljs-comment"># Expected result:</span>
<span class="hljs-comment"># - Only pk=1 has &quot;brand&quot;: &quot;BrandA&quot; in metadata[&quot;product_info&quot;].</span>
<span class="hljs-comment"># - pk=4 has &quot;brand&quot;: &quot;BrandB&quot;.</span>
<span class="hljs-comment"># - pk=2 and pk=3 have no valid metadata.</span>
<span class="hljs-comment"># Hence, only pk=1 matches the filter.</span>

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: -0.2479381263256073, &#x27;entity&#x27;: {&#x27;metadata&#x27;: {&#x27;product_info&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;price&#x27;: 99.99, &#x27;in_stock&#x27;: True, &#x27;tags&#x27;: [&#x27;summer_sale&#x27;]}}}]&quot;</span>
<span class="hljs-comment"># ]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;brand\&quot;] == \&quot;BrandA\&quot;&quot;</span>;

SearchResp resp = client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embedding&quot;</span>)
        .data(Collections.singletonList(new FloatVec(new <span class="hljs-built_in">float</span>[]{<span class="hljs-number">0.3</span>f, -<span class="hljs-number">0.6</span>f, <span class="hljs-number">0.1</span>f})))
        .topK(<span class="hljs-number">5</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;metadata&quot;</span>))
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .build());

System.out.println(resp.getSearchResults());

// Output
//
// [
//   [
//     SearchResp.SearchResult(entity={metadata={<span class="hljs-string">&quot;product_info&quot;</span>:{<span class="hljs-string">&quot;category&quot;</span>:<span class="hljs-string">&quot;electronics&quot;</span>,<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;BrandA&quot;</span>},<span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">99.99</span>,<span class="hljs-string">&quot;in_stock&quot;</span>:true,<span class="hljs-string">&quot;tags&quot;</span>:[<span class="hljs-string">&quot;summer_sale&quot;</span>]}}, score=-<span class="hljs-number">0.24793813</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">1</span>)
//   ]
// ]

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.search({
    collection_name: <span class="hljs-string">&#x27;my_json_collection&#x27;</span>,
    data: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>],
    limit: <span class="hljs-number">5</span>,
    output_fields: [<span class="hljs-string">&#x27;metadata&#x27;</span>],
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot; and metadata[&quot;price&quot;] &lt; 150&#x27;</span>,
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3</span>, <span class="hljs-number">-0.6</span>, <span class="hljs-number">-0.1</span>}

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>)
resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_json_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,                    <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithOutputFields(<span class="hljs-string">&quot;metadata&quot;</span>).WithAnnParam(annParam))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to perform basic ANN search collection: &quot;</span>, err.Error())
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    log.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
    log.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;my_json_collection&quot;,
  &quot;data&quot;: [
    [0.3, -0.6, 0.1]
  ],
  &quot;annsField&quot;: &quot;embedding&quot;,
  &quot;limit&quot;: 5,
  &quot;searchParams&quot;: {
    &quot;params&quot;: {
      &quot;nprobe&quot;: 10
    }
  },
  &quot;outputFields&quot;: [&quot;metadata&quot;],
  &quot;filter&quot;: &quot;metadata[\&quot;product_info\&quot;][\&quot;brand\&quot;] == \&quot;BrandA\&quot;&quot;
}&#x27;</span>

<span class="hljs-comment">##{&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;metadata&quot;:&quot;{\&quot;product_info\&quot;: {\&quot;category\&quot;: \&quot;electronics\&quot;, \&quot;brand\&quot;: \&quot;BrandA\&quot;}, \&quot;price\&quot;: 99.99, \&quot;in_stock\&quot;: true, \&quot;tags\&quot;: [\&quot;summer_sale\&quot;]}&quot;,&quot;pk&quot;:1}]}</span>

<button class="copy-code-btn"></button></code></pre>
<p>بالإضافة إلى ذلك، يدعم Milvus عوامل تصفية JSON المتقدمة مثل <code translate="no">JSON_CONTAINS</code> و <code translate="no">JSON_CONTAINS_ALL</code> و <code translate="no">JSON_CONTAINS_ANY</code> ، والتي يمكن أن تعزز قدرات الاستعلام بشكل أكبر. لمزيد من التفاصيل، راجع <a href="/docs/ar/json-operators.md">مشغلات JSON</a>.</p>
