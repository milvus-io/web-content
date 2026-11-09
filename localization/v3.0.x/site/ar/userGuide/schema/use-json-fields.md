---
id: use-json-fields.md
title: حقل JSON
summary: >-
  يتيح لك Milvus تخزين البيانات المنظمة وفهرستها ضمن حقل واحد باستخدام نوع
  البيانات JSON. وهذا يتيح إنشاء مخططات مرنة تحتوي على سمات متداخلة، مع الحفاظ
  في الوقت نفسه على إمكانية التصفية الفعالة عبر فهرسة JSON.
---
<h1 id="JSON-Field" class="common-anchor-header">حقل JSON<button data-href="#JSON-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>يتيح لك Milvus تخزين البيانات المنظمة وفهرستها داخل حقل واحد باستخدام نوع البيانات JSON ( <code translate="no">JSON</code> ). وهذا يتيح إنشاء مخططات مرنة ذات سمات متداخلة، مع السماح في الوقت نفسه بالتصفية الفعالة عبر فهرسة JSON.</p>
<h2 id="What-is-a-JSON-field" class="common-anchor-header">ما هو حقل JSON؟<button data-href="#What-is-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>حقل JSON هو حقل محدد بمخطط في Milvus يخزن بيانات منظمة من نوع المفتاح والقيمة. ويمكن أن تتضمن القيم سلاسل نصية أو أرقامًا أو قيمًا منطقية أو مصفوفات أو كائنات متداخلة بعمق.</p>
<p>فيما يلي مثال على الشكل الذي قد يبدو عليه حقل JSON في مستند ما:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال:</p>
<ul>
<li><p><code translate="no">metadata</code> هو حقل JSON المُعرَّف في المخطط.</p></li>
<li><p>يمكنك تخزين القيم المسطحة (على سبيل المثال <code translate="no">category</code> ، <code translate="no">in_stock</code>)، والمصفوفات (<code translate="no">tags</code>)، والكائنات المتداخلة (<code translate="no">supplier</code>).</p></li>
</ul>
<h2 id="Define-a-JSON-field-in-the-schema" class="common-anchor-header">تحديد حقل JSON في المخطط<button data-href="#Define-a-JSON-field-in-the-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>لاستخدام حقل JSON، قم بتعريفه صراحةً في مخطط المجموعة عن طريق تحديد <code translate="no">DataType</code> على أنه <code translate="no">JSON</code>.</p>
<p>يُنشئ المثال أدناه مجموعةً يحتوي مخططها على الحقول التالية:</p>
<ul>
<li><p>المفتاح الأساسي (<code translate="no">product_id</code>)</p></li>
<li><p>حقل <code translate="no">vector</code> (إلزامي لكل مجموعة)</p></li>
<li><p>حقل « <code translate="no">metadata</code> » من النوع « <code translate="no">JSON</code> »، والذي يمكنه تخزين البيانات المنظمة مثل القيم المسطحة أو المصفوفات أو الكائنات المتداخلة</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create schema with a JSON field</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>)

schema.add_field(field_name=<span class="hljs-string">&quot;product_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
<span class="highlighted-wrapper-line">schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON, nullable=<span class="hljs-literal">True</span>)  <span class="hljs-comment"># JSON field that allows null values</span></span>

client.create_collection(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">true</span>)
        .build();
        
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;product_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .dataType(DataType.JSON)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
        
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>
});

<span class="hljs-comment">// Create collection</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
<span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
<span class="hljs-attr">fields</span>: [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;product_id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,
    <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>  <span class="hljs-comment">// JSON field that allows null values</span>
  }
],
<span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">true</span>
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">true</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;product_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;metadata&quot;</span>).
    WithDataType(entity.FieldTypeJSON).
    WithNullable(<span class="hljs-literal">true</span>),
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment"># 字段定义</span>
<span class="hljs-built_in">export</span> productIdField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;product_id&quot;,
  &quot;dataType&quot;: &quot;Int64&quot;,
  &quot;isPrimary&quot;: true,
  &quot;autoID&quot;: false
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;vector&quot;,
  &quot;dataType&quot;: &quot;FloatVector&quot;,
  &quot;elementTypeParams&quot;: {
    &quot;dim&quot;: 5
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> metadataField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;dataType&quot;: &quot;JSON&quot;,
  &quot;isNullable&quot;: true
}&#x27;</span>

<span class="hljs-comment"># 构造 schema</span>
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
  \&quot;autoID\&quot;: false,
  \&quot;enableDynamicField\&quot;: true,
  \&quot;fields\&quot;: [
    <span class="hljs-variable">$productIdField</span>,
    <span class="hljs-variable">$vectorField</span>,
    <span class="hljs-variable">$metadataField</span>
  ]
}&quot;</span>

<span class="hljs-comment"># 创建集合</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;product_catalog\&quot;,
  \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>يمكنك أيضًا تمكين ميزة الحقول الديناميكية لتخزين الحقول غير المعلنة بمرونة، ولكنها ليست مطلوبة لتشغيل حقول JSON. لمزيد من المعلومات، راجع <a href="/docs/ar/enable-dynamic-field.md">الحقل الديناميكي</a>.</p>
</div>
<h2 id="Insert-entities-with-JSON-data" class="common-anchor-header">إدراج الكيانات التي تحتوي على بيانات JSON<button data-href="#Insert-entities-with-JSON-data" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد إنشاء المجموعة، قم بإدراج الكيانات التي تحتوي على كائنات JSON منظمة في حقل JSON « <code translate="no">metadata</code> ».</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">entities = [
    {
        <span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }
]

client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-number">1</span>);
row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>)));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">metadata</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
metadata.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;electronics&quot;</span>);
metadata.addProperty(<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;BrandA&quot;</span>);
metadata.addProperty(<span class="hljs-string">&quot;in_stock&quot;</span>, <span class="hljs-literal">true</span>);
metadata.addProperty(<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-number">99.99</span>);
metadata.addProperty(<span class="hljs-string">&quot;string_price&quot;</span>, <span class="hljs-string">&quot;99.99&quot;</span>);
metadata.add(<span class="hljs-string">&quot;tags&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>)));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">supplier</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
supplier.addProperty(<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;SupplierX&quot;</span>);
supplier.addProperty(<span class="hljs-string">&quot;country&quot;</span>, <span class="hljs-string">&quot;USA&quot;</span>);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">contact</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
contact.addProperty(<span class="hljs-string">&quot;email&quot;</span>, <span class="hljs-string">&quot;support@supplierx.com&quot;</span>);
contact.addProperty(<span class="hljs-string">&quot;phone&quot;</span>, <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>);

supplier.add(<span class="hljs-string">&quot;contact&quot;</span>, contact);
metadata.add(<span class="hljs-string">&quot;supplier&quot;</span>, supplier);
row.add(<span class="hljs-string">&quot;metadata&quot;</span>, metadata);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .data(Collections.singletonList(row))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> entities = [
    {
        <span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }
]

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>, 
    <span class="hljs-attr">data</span>: entities
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;product_catalog&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;product_id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>},
    }).WithColumns(
    column.NewColumnJSONBytes(<span class="hljs-string">&quot;metadata&quot;</span>, [][]<span class="hljs-type">byte</span>{
        []<span class="hljs-type">byte</span>(<span class="hljs-string">`{
            &quot;category&quot;: &quot;electronics&quot;,
            &quot;brand&quot;: &quot;BrandA&quot;,
            &quot;in_stock&quot;: true,
            &quot;price&quot;: 99.99,
            &quot;string_price&quot;: &quot;99.99&quot;,
            &quot;tags&quot;: [&quot;clearance&quot;, &quot;summer_sale&quot;],
            &quot;supplier&quot;: {
                &quot;name&quot;: &quot;SupplierX&quot;,
                &quot;country&quot;: &quot;USA&quot;,
                &quot;contact&quot;: {
                    &quot;email&quot;: &quot;support@supplierx.com&quot;,
                    &quot;phone&quot;: &quot;+1-800-555-0199&quot;
                }
            }
        }`</span>),
    }),
))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> entities=<span class="hljs-string">&#x27;[
  {
    &quot;product_id&quot;: 1,
    &quot;vector&quot;: [0.1, 0.2, 0.3, 0.4, 0.5],
    &quot;metadata&quot;: {
      &quot;category&quot;: &quot;electronics&quot;,
      &quot;brand&quot;: &quot;BrandA&quot;,
      &quot;in_stock&quot;: true,
      &quot;price&quot;: 99.99,
      &quot;string_price&quot;: &quot;99.99&quot;,
      &quot;tags&quot;: [&quot;clearance&quot;, &quot;summer_sale&quot;],
      &quot;supplier&quot;: {
        &quot;name&quot;: &quot;SupplierX&quot;,
        &quot;country&quot;: &quot;USA&quot;,
        &quot;contact&quot;: {
          &quot;email&quot;: &quot;support@supplierx.com&quot;,
          &quot;phone&quot;: &quot;+1-800-555-0199&quot;
        }
      }
    }
  }
]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/product_catalog/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;data\&quot;: <span class="hljs-variable">$entities</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-values-inside-the-JSON-field" class="common-anchor-header">فهرسة القيم داخل حقل JSON<button data-href="#Index-values-inside-the-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>لتسريع عملية التصفية القياسية على حقول JSON، يدعم Milvus <strong>فهرسة مسارات JSON،</strong> والتي تقوم بفهرسة مسارات JSON محددة بنوع قياسي مُعلن.</p>
<div class="alert note">
<p>تعد فهرسة حقول JSON <strong>اختيارية</strong>. لا يزال بإمكانك الاستعلام أو التصفية حسب مسارات JSON بدون فهرس، ولكن قد يؤدي ذلك إلى انخفاض الأداء بسبب البحث بالقوة الغاشمة.</p>
</div>
<h3 id="JSON-path-indexing" class="common-anchor-header">فهرسة مسارات JSON<button data-href="#JSON-path-indexing" class="anchor-icon" translate="no">
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
    </button></h3><p>لإنشاء فهرس مسار JSON، حدد:</p>
<ul>
<li><p><strong>مسار JSON</strong> (<code translate="no">json_path</code>): المسار إلى المفتاح أو الحقل المتداخل داخل كائن JSON الخاص بك الذي تريد فهرسته.</p>
<ul>
<li><p>مثال:</p>
<ul>
<li><p>بالنسبة للمفتاح، <code translate="no">metadata[&quot;category&quot;]</code></p></li>
<li><p>بالنسبة للحقل المتداخل، <code translate="no">metadata[&quot;contact&quot;][&quot;email&quot;]</code></p></li>
</ul>
<p>يحدد هذا المكان الذي يجب أن يبحث فيه محرك الفهرسة داخل بنية JSON.</p></li>
</ul></li>
<li><p><strong>نوع التحويل في JSON</strong> (<code translate="no">json_cast_type</code>): نوع البيانات الذي يجب أن يستخدمه Milvus عند تفسير وفهرسة القيمة في المسار المحدد.</p>
<ul>
<li><p>يجب أن يتطابق هذا النوع مع نوع البيانات الفعلي للحقل الذي يتم فهرسته. إذا كنت ترغب في تحويل نوع البيانات إلى نوع آخر أثناء الفهرسة، ففكر في <a href="/docs/ar/use-json-fields.md#Use-JSON-cast-functions-for-type-conversion--Milvus-2514">استخدام دالة التحويل</a>.</p></li>
<li><p>للاطلاع على القائمة الكاملة، انظر <a href="/docs/ar/use-json-fields.md#Supported-JSON-cast-types">أدناه</a>.</p></li>
</ul></li>
</ul>
<h4 id="Supported-JSON-cast-types" class="common-anchor-header">أنواع التحويل في JSON المدعومة</h4><p>أنواع التحويل لا تميز بين الأحرف الكبيرة والصغيرة. الأنواع التالية مدعومة:</p>
<table>
   <tr>
     <th><p>نوع التحويل</p></th>
     <th><p>الوصف</p></th>
     <th><p>مثال على قيمة JSON</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">bool</code></p></td>
     <td><p>قيمة منطقية</p></td>
     <td><p><code translate="no">true</code>، <code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">double</code></p></td>
     <td><p>قيمة عددية (عدد صحيح أو عدد عائم)</p></td>
     <td><p><code translate="no">42</code>، <code translate="no">99.99</code> ، <code translate="no">-15.5</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">varchar</code></p></td>
     <td><p>قيمة سلسلة</p></td>
     <td><p><code translate="no">"electronics"</code>، <code translate="no">"BrandA"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">array_bool</code></p></td>
     <td><p>مصفوفة من القيم المنطقية</p></td>
     <td><p><code translate="no">[true, false, true]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">array_double</code></p></td>
     <td><p>مصفوفة من الأرقام</p></td>
     <td><p><code translate="no">[1.2, 3.14, 42]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">array_varchar</code></p></td>
     <td><p>مصفوفة من السلاسل</p></td>
     <td><p><code translate="no">["tag1", "tag2", "tag3"]</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>يجب أن تحتوي المصفوفات على عناصر من نفس النوع لتحقيق الفهرسة المثلى. لمزيد من المعلومات، راجع <a href="/docs/ar/array_data_type.md">حقل المصفوفة</a>.</p>
</div>
<h4 id="Example-Create-JSON-path-indexes" class="common-anchor-header">مثال: إنشاء فهارس مسارات JSON</h4><p>باستخدام بنية JSON " <code translate="no">metadata</code> " الواردة في مقدمتنا، فيما يلي أمثلة على كيفية إنشاء فهارس على مسارات JSON مختلفة:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the category field as a string</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,  <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Index the tags array as string array</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;tags_array_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;tags\&quot;]&quot;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;array_varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String,Object&gt; extraParams1 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams1.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>);
extraParams1.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;category_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams1)
        .build());

Map&lt;String,Object&gt; extraParams2 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams2.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;tags\&quot;]&quot;</span>);
extraParams2.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;array_varchar&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;tags_array_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams2)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = [
  {
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;category_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment">// Can also use &quot;INVERTED&quot; for JSON path indexing</span>
    <span class="hljs-attr">extra_params</span>: {
      <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
      <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;varchar&quot;</span>,
    },
  },
  {
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;tags_array_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment">// Can also use &quot;INVERTED&quot; for JSON path indexing</span>
    <span class="hljs-attr">extra_params</span>: {
      <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;tags&quot;]&#x27;</span>,
      <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;array_varchar&quot;</span>,
    },
  },
];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
)

jsonIndex1 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;category&quot;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;category_index&quot;</span>)
jsonIndex2 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;array_varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;tags&quot;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;tags_array_index&quot;</span>)

indexOpt1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex2)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> categoryIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;category_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;category\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;varchar&quot;
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> tagsArrayIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;tags_array_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;tags\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;array_varchar&quot;
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Use-JSON-cast-functions-for-type-conversion" class="common-anchor-header">استخدام دوال تحويل JSON لتحويل الأنواع<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.14+</span></h4><p>إذا كان مفتاح حقل JSON الخاص بك يحتوي على قيم بتنسيق غير صحيح (على سبيل المثال، أرقام مخزنة كسلاسل)، فيمكنك استخدام وظائف التحويل لتحويل القيم أثناء الفهرسة.</p>
<h5 id="Supported-cast-functions" class="common-anchor-header">وظائف التحويل المدعومة</h5><p>وظائف التحويل لا تميز بين الأحرف الكبيرة والصغيرة. الأنواع التالية مدعومة:</p>
<table>
   <tr>
     <th><p>وظيفة التحويل</p></th>
     <th><p>يحول من → إلى</p></th>
     <th><p>حالة الاستخدام</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">"STRING_TO_DOUBLE"</code></p></td>
     <td><p>سلسلة → رقمي (double)</p></td>
     <td><p>تحويل <code translate="no">"99.99"</code> إلى <code translate="no">99.99</code></p></td>
   </tr>
</table>
<h5 id="Example-Cast-string-numbers-to-double" class="common-anchor-header">مثال: تحويل الأرقام في السلسلة إلى دبل</h5><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Convert string numbers to double for indexing</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;string_price\&quot;]&quot;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-comment"># Data cast type</span>
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span> <span class="hljs-comment"># Cast function; case insensitive</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String,Object&gt; extraParams3 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams3.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;string_price\&quot;]&quot;</span>);
extraParams3.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;double&quot;</span>);
extraParams3.put(<span class="hljs-string">&quot;json_cast_function&quot;</span>, <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;string_to_double_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams3)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;string_to_double_index&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment">// Can also use &quot;INVERTED&quot;</span>
  <span class="hljs-attr">extra_params</span>: {
    <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
    <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;double&quot;</span>,
    <span class="hljs-attr">json_cast_function</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>, <span class="hljs-comment">// Case insensitive</span>
  },
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">jsonIndex3 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`metadata[&quot;string_price&quot;]`</span>)
                    .WithIndexName(<span class="hljs-string">&quot;string_to_double_index&quot;</span>)

indexOpt3 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex3)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> stringToDoubleIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;string_to_double_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;string_price\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;double&quot;,
    &quot;json_cast_function&quot;: &quot;STRING_TO_DOUBLE&quot;
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>المعلمة <code translate="no">json_cast_type</code> إلزامية ويجب أن تكون مطابقة لنوع الإخراج الخاص بوظيفة التحويل.</p></li>
<li><p>إذا فشل التحويل (على سبيل المثال، سلسلة غير رقمية)، يتم تخطي القيمة ولا يتم فهرستها.</p></li>
</ul>
</div>
<h3 id="Apply-indexes-to-the-collection" class="common-anchor-header">تطبيق الفهارس على المجموعة<button data-href="#Apply-indexes-to-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد تعريف معلمات الفهرس، يمكنك تطبيقها على المجموعة باستخدام <code translate="no">create_index()</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>(indexParams)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexTask1, err := client.CreateIndex(ctx, indexOpt1)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask2, err := client.CreateIndex(ctx, indexOpt2)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask3, err := client.CreateIndex(ctx, indexOpt3)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask4, err := client.CreateIndex(ctx, indexOpt4)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask5, err := client.CreateIndex(ctx, indexOpt5)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&quot;[
  <span class="hljs-variable">$categoryIndex</span>,
  <span class="hljs-variable">$tagsArrayIndex</span>,
  <span class="hljs-variable">$stringToDoubleIndex</span>
]&quot;</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;product_catalog\&quot;,
  \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Filter-by-JSON-field-values" class="common-anchor-header">التصفية حسب قيم حقول JSON<button data-href="#Filter-by-JSON-field-values" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد إدراج حقول JSON وفهرستها، يمكنك التصفية بناءً عليها باستخدام تعبيرات التصفية القياسية مع صيغة مسار JSON.</p>
<p>على سبيل المثال:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;price&quot;] &gt; 50&#x27;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;featured&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filterCategory</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;] == \&quot;electronics\&quot;&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">filterPrice</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;metadata[\&quot;price\&quot;] &gt; 50&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">filterTags</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains(metadata[\&quot;tags\&quot;], \&quot;featured\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filterCategory = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>;
<span class="hljs-keyword">const</span> filterPrice = <span class="hljs-string">&#x27;metadata[&quot;price&quot;] &gt; 50&#x27;</span>;
<span class="hljs-keyword">const</span> filterTags = <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;featured&quot;)&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filterCategory := <span class="hljs-string">`metadata[&quot;category&quot;] == &quot;electronics&quot;`</span>
filterPrice := <span class="hljs-string">`metadata[&quot;price&quot;] &gt; 50`</span>
filterTags := <span class="hljs-string">`json_contains(metadata[&quot;tags&quot;], &quot;featured&quot;)`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> filterCategory=<span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>
<span class="hljs-built_in">export</span> filterPrice=<span class="hljs-string">&#x27;metadata[&quot;price&quot;] &gt; 50&#x27;</span>
<span class="hljs-built_in">export</span> filterTags=<span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;featured&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لاستخدام هذه التعبيرات في عملية بحث أو استعلام، تأكد مما يلي:</p>
<ul>
<li><p>أنك قمت بإنشاء فهرس لكل حقل متجه.</p></li>
<li><p>تم تحميل المجموعة في الذاكرة.</p></li>
</ul>
<p>للحصول على قائمة كاملة بالمشغلات والتعبيرات المدعومة، راجع <a href="/docs/ar/json-operators.md">مشغلات JSON</a>.</p>
<h2 id="Pull-it-all-together" class="common-anchor-header">تجميع كل ذلك معًا<button data-href="#Pull-it-all-together" class="anchor-icon" translate="no">
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
    </button></h2><p>لقد تعلمت حتى الآن كيفية تعريف القيم المنظمة وإدراجها وفهرستها (اختياريًا) داخل حقل JSON.</p>
<p>لإكمال سير العمل في تطبيق عملي، ستحتاج أيضًا إلى:</p>
<ul>
<li><p><strong>إنشاء فهرس لحقول المتجهات</strong> (إجراء إلزامي لكل حقل متجه في المجموعة)</p>
<p>راجع <a href="/docs/ar/create-collection.md#Optional-Set-Index-Parameters">«تعيين معلمات الفهرس</a>»</p></li>
<li><p><strong>تحميل المجموعة</strong></p>
<p>راجع <a href="/docs/ar/load-and-release.md">«التحميل والإفراج»</a></p></li>
<li><p><strong>البحث أو الاستعلام باستخدام عوامل تصفية مسار JSON</strong></p>
<p>راجع " <a href="/docs/ar/filtered-search.md">البحث المُصفى</a> <a href="/docs/ar/json-operators.md">ومُشغِّلات JSON</a>"</p></li>
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
    </button></h2><h3 id="What-are-the-differences-between-a-JSON-field-and-the-dynamic-field" class="common-anchor-header">ما الفروق بين حقل JSON والحقل الديناميكي؟<button data-href="#What-are-the-differences-between-a-JSON-field-and-the-dynamic-field" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>يتم تعريف<strong>حقل JSON</strong> في المخطط. يجب عليك الإعلان عن الحقل صراحةً في المخطط.</p></li>
<li><p>أما<strong>الحقل الديناميكي</strong> فهو كائن JSON مخفي (<code translate="no">$meta</code>) يقوم تلقائيًا بتخزين أي حقل غير محدد في المخطط.</p></li>
</ul>
<p>يدعم كلاهما الهياكل المتداخلة وفهرسة مسار JSON، لكن الحقول الديناميكية أكثر ملاءمةً للهياكل البيانات الاختيارية أو المتطورة.</p>
<p>يرجى الرجوع إلى " <a href="/docs/ar/enable-dynamic-field.md">الحقل الديناميكي</a> " للحصول على التفاصيل.</p>
<h3 id="Are-there-any-limitations-on-the-size-of-a-JSON-field" class="common-anchor-header">هل توجد أي قيود على حجم حقل JSON؟<button data-href="#Are-there-any-limitations-on-the-size-of-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h3><p>نعم. يقتصر حجم كل حقل JSON على 65,536 بايت.</p>
<h3 id="Does-a-JSON-field-support-setting-a-default-value" class="common-anchor-header">هل يدعم حقل JSON تعيين قيمة افتراضية؟<button data-href="#Does-a-JSON-field-support-setting-a-default-value" class="anchor-icon" translate="no">
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
    </button></h3><p>لا، لا تدعم حقول JSON القيم الافتراضية. ومع ذلك، يمكنك تعيين " <code translate="no">nullable=True</code> " عند تعريف الحقل للسماح بالإدخالات الفارغة.</p>
<p>يرجى الرجوع إلى "القيم الفارغة والقيم الافتراضية" ( <a href="/docs/ar/nullable-and-default.md">Nullable &amp; Default</a> ) للحصول على التفاصيل.</p>
<h3 id="Are-there-any-naming-conventions-for-JSON-field-keys" class="common-anchor-header">هل توجد أي قواعد لتسمية مفاتيح حقول JSON؟<button data-href="#Are-there-any-naming-conventions-for-JSON-field-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>نعم، لضمان التوافق مع الاستعلامات والفهرسة:</p>
<ul>
<li><p>استخدم الأحرف والأرقام وعلامات التسطير السفلية فقط في مفاتيح JSON.</p></li>
<li><p>تجنب استخدام الأحرف الخاصة أو المسافات أو النقاط (<code translate="no">.</code> ، <code translate="no">/</code> ، إلخ).</p></li>
<li><p>قد تتسبب المفاتيح غير المتوافقة في حدوث مشكلات في تحليل تعبيرات التصفية.</p></li>
</ul>
<h3 id="How-does-Milvus-handle-string-values-in-JSON-fields" class="common-anchor-header">كيف يتعامل Milvus مع قيم السلاسل في حقول JSON؟<button data-href="#How-does-Milvus-handle-string-values-in-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>يخزن Milvus القيم النصية تمامًا كما تظهر في مدخلات JSON — دون أي تحويل دلالي. قد تؤدي السلاسل التي لا تحتوي على علامات اقتباس صحيحة إلى حدوث أخطاء أثناء التحليل.</p>
<p><strong>أمثلة على السلاسل الصحيحة</strong>:</p>
<pre><code translate="no" class="language-plaintext">&quot;a\&quot;b&quot;, &quot;a&#x27;b&quot;, &quot;a\\b&quot;
<button class="copy-code-btn"></button></code></pre>
<p><strong>أمثلة على السلاسل غير الصحيحة</strong>:</p>
<pre><code translate="no" class="language-plaintext">&#x27;a&quot;b&#x27;, &#x27;a\&#x27;b&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="What-filtering-logic-does-Milvus-use-for-indexed-JSON-paths" class="common-anchor-header">ما هي منطقية التصفية التي يستخدمها Milvus لمسارات JSON المفهرسة؟<button data-href="#What-filtering-logic-does-Milvus-use-for-indexed-JSON-paths" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>الفهرسة الرقمية</strong>:</p>
<p>إذا تم إنشاء فهرس باستخدام <code translate="no">json_cast_type=&quot;double&quot;</code> ، فلن تستفيد من هذا الفهرس سوى شروط التصفية الرقمية (على سبيل المثال، <code translate="no">&gt;</code> ، <code translate="no">&lt;</code> ، <code translate="no">== 42</code>). قد تلجأ الشروط غير الرقمية إلى المسح بالقوة الغاشمة.</p></li>
<li><p><strong>فهرسة السلاسل</strong>:</p>
<p>إذا كان الفهرس يستخدم <code translate="no">json_cast_type=&quot;varchar&quot;</code> ، فلن تستفيد من الفهرس سوى شروط التصفية التي تتضمن سلاسل نصية؛ وقد تلجأ الأنواع الأخرى إلى المسح الشامل.</p></li>
<li><p><strong>فهرسة المنطقية</strong>:</p>
<p>تعمل الفهرسة المنطقية بشكل مشابه للفهرسة النصية، حيث يتم استخدام الفهرس فقط عندما تتطابق الشرط تمامًا مع "صحيح" أو "خطأ".</p></li>
</ul>
<h3 id="What-about-numeric-precision-when-indexing-JSON-fields" class="common-anchor-header">ماذا عن الدقة العددية عند فهرسة حقول JSON؟<button data-href="#What-about-numeric-precision-when-indexing-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>يخزن Milvus جميع القيم الرقمية المفهرسة كأرقام مزدوجة.</p>
<p>إذا تجاوزت القيمة الرقمية <strong>2^53،</strong> فقد تفقد دقتها. وقد يؤدي فقدان الدقة هذا إلى عدم مطابقة استعلامات التصفية للقيم خارج النطاق بدقة.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-path-with-different-cast-types" class="common-anchor-header">هل يمكنني إنشاء فهارس متعددة على نفس مسار JSON بأنواع تحويل مختلفة؟<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-path-with-different-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p>لا، فكل مسار JSON يدعم <strong>فهرسًا واحدًا فقط</strong>. يجب عليك اختيار نوع تحويل واحد ( <code translate="no">json_cast_type</code> ) يتوافق مع بياناتك. لا يُدعم إنشاء فهارس متعددة على نفس المسار باستخدام أنواع تحويل مختلفة.</p>
<h3 id="What-if-values-on-a-JSON-path-have-inconsistent-types" class="common-anchor-header">ماذا لو كانت أنواع القيم في مسار JSON غير متسقة؟<button data-href="#What-if-values-on-a-JSON-path-have-inconsistent-types" class="anchor-icon" translate="no">
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
    </button></h3><p>قد تؤدي الأنواع غير المتسقة عبر الكيانات إلى <strong>فهرسة جزئية</strong>. على سبيل المثال، إذا تم تخزين <code translate="no">metadata[&quot;price&quot;]</code> كرقم (<code translate="no">99.99</code>) وكسلسلة (<code translate="no">&quot;99.99&quot;</code>)، وتم تعريف الفهرس بـ <code translate="no">json_cast_type=&quot;double&quot;</code> ، فسيتم فهرسة القيم الرقمية فقط. وسيتم تخطي الإدخالات ذات الصيغة النصية ولن تظهر في نتائج التصفية.</p>
<h3 id="Can-I-use-filters-with-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">هل يمكنني استخدام عوامل التصفية بنوع مختلف عن نوع التحويل المفهرس؟<button data-href="#Can-I-use-filters-with-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا كان تعبير التصفية الخاص بك يستخدم نوعًا مختلفًا عن نوع التحويل ( <code translate="no">json_cast_type</code>) الخاص بالفهرس، <strong>فلن يستخدم</strong> النظام <strong>الفهرس،</strong> وقد يلجأ إلى مسح قوي أبطأ — إذا سمحت البيانات بذلك. للحصول على أفضل أداء، قم دائمًا بمواءمة تعبير التصفية الخاص بك مع نوع التحويل الخاص بالفهرس.</p>
