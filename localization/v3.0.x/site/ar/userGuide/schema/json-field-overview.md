---
id: json-field-overview.md
title: JSON Field Overview
summary: >-
  عند تطوير تطبيقات مثل كتالوجات المنتجات أو أنظمة إدارة المحتوى أو محركات
  تفضيلات المستخدمين، غالبًا ما تحتاج إلى تخزين بيانات وصفية مرنة جنبًا إلى جنب
  مع التضمينات المتجهة. فخصائص المنتجات تختلف حسب الفئة، وتفضيلات المستخدمين
  تتطور بمرور الوقت، كما أن خصائص المستندات تتميز بهياكل متداخلة معقدة. وتحل
  حقول JSON في Milvus هذه المشكلة من خلال السماح لك بتخزين البيانات المنظمة
  المرنة والاستعلام عنها دون المساس بالأداء.
---
<h1 id="JSON-Field-Overview" class="common-anchor-header">JSON Field Overview<button data-href="#JSON-Field-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>When building applications like product catalogs, content management systems, or user preference engines, you often need to store flexible metadata alongside your vector embeddings. Product attributes vary by category, user preferences evolve over time, and document properties have complex nested structures. JSON fields in Milvus solve this challenge by allowing you to store and query flexible structured data without sacrificing performance.</p>
<h2 id="What-is-a-JSON-field" class="common-anchor-header">What is a JSON field?<button data-href="#What-is-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>A JSON field is a schema-defined data type (<code translate="no">DataType.JSON</code>) in Milvus that stores structured key-value data. Unlike traditional rigid database columns, JSON fields accommodate nested objects, arrays, and mixed data types while providing multiple indexing options for fast queries.</p>
<p>Example JSON field structure:</p>
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
<p>In this example, <code translate="no">metadata</code> is a single JSON field that contains a mix of flat values (e.g. <code translate="no">category</code>, <code translate="no">in_stock</code>), arrays (<code translate="no">tags</code>), and nested objects (<code translate="no">supplier</code>).</p>
<div class="alert note">
<p><strong>Naming convention:</strong> Use only letters, numbers, and underscores in JSON keys. Avoid special characters, spaces, or dots as they may cause parsing issues in queries.</p>
</div>
<h2 id="JSON-field-vs-dynamic-field" class="common-anchor-header">JSON field vs. dynamic field<button data-href="#JSON-field-vs-dynamic-field" class="anchor-icon" translate="no">
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
    </button></h2><p>A common point of confusion is the difference between a JSON field and the <a href="/docs/ar/enable-dynamic-field.md">dynamic field</a>. While both are related to JSON, they serve different purposes.</p>
<p>The table below summarizes the key differences between a JSON field and the dynamic field:</p>
<table>
   <tr>
     <th><p>Feature</p></th>
     <th><p>JSON Field</p></th>
     <th><p>Dynamic Field</p></th>
   </tr>
   <tr>
     <td><p>Schema definition</p></td>
     <td><p>A scalar field that must be explicitly declared in the collection schema with the <code translate="no">DataType.JSON</code> type.</p></td>
     <td><p>A hidden JSON field (named <code translate="no">$meta</code>) that automatically stores undeclared fields.</p></td>
   </tr>
   <tr>
     <td><p>Use case</p></td>
     <td><p>Stores structured data where the schema is known and consistent.</p></td>
     <td><p>Stores flexible, evolving, or semi-structured data that doesn't fit a fixed schema.</p></td>
   </tr>
   <tr>
     <td><p>Control</p></td>
     <td><p>You control the field name and structure.</p></td>
     <td><p>System-managed for undefined fields.</p></td>
   </tr>
   <tr>
     <td><p>Querying</p></td>
     <td><p>Query using your field name or target key inside the JSON field: <code translate="no">metadata["key"]</code>.</p></td>
     <td><p>Query directly using the dynamic field key: <code translate="no">"dynamic_key"</code> or via <code translate="no">$meta</code>: <code translate="no">$meta["dynamic_key"]</code></p></td>
   </tr>
</table>
<h2 id="Basic-operations" class="common-anchor-header">Basic operations<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p>The fundamental workflow for using a JSON field involves defining it in your schema, inserting data, and then querying the data using specific filter expressions.</p>
<h3 id="Define-a-JSON-field" class="common-anchor-header">Define a JSON field<button data-href="#Define-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h3><p>To use a JSON field, explicitly define it in your collection schema when creating the collection. The following example demonstrates how to create a collection with a <code translate="no">metadata</code> field of type <code translate="no">DataType.JSON</code>:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

<span class="hljs-comment"># Create schema</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>)

schema.add_field(field_name=<span class="hljs-string">&quot;product_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Primary field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>) <span class="hljs-comment"># Vector field</span>
<span class="hljs-comment"># Define a JSON field that allows null values</span>
<span class="highlighted-wrapper-line">schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON, nullable=<span class="hljs-literal">True</span>)</span>

client.create_collection(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);

<span class="hljs-comment">// Primary field</span>
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;product_id&quot;</span>).dataType(DataType.Int64).isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
<span class="hljs-comment">// Vector field</span>
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>).dataType(DataType.FloatVector).dimension(<span class="hljs-number">5</span>).build());
<span class="hljs-comment">// Define a JSON field that allows null values</span>
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;metadata&quot;</span>).dataType(DataType.JSON).isNullable(<span class="hljs-literal">true</span>).build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .collectionSchema(schema)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

<span class="hljs-comment">// Set up a Milvus client</span>
ctx := context.Background()
cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

<span class="hljs-comment">// Create schema</span>
schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">true</span>)

<span class="hljs-comment">// Primary field</span>
schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;product_id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>))
<span class="hljs-comment">// Vector field</span>
schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">5</span>))
<span class="hljs-comment">// Define a JSON field that allows null values</span>
schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;metadata&quot;</span>).WithDataType(entity.FieldTypeJSON).WithNullable(<span class="hljs-literal">true</span>))

<span class="hljs-keyword">if</span> err := cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, schema)); err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(
    &amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>),
)
.<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Create schema</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">enable_dynamic_field</span>(<span class="hljs-literal">true</span>)
    <span class="hljs-comment">// Primary field</span>
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;product_id&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64)
            .<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>),
    )
    <span class="hljs-comment">// Vector field</span>
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">5</span>),
    )
    <span class="hljs-comment">// Define a JSON field that allows null values</span>
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Json)
            .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>),
    );

client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">schema</span>(schema)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Create schema</span>
milvus::CollectionSchema schema;
schema.<span class="hljs-built_in">SetEnableDynamicField</span>(<span class="hljs-literal">true</span>);

<span class="hljs-comment">// Primary field</span>
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;product_id&quot;</span>, milvus::DataType::INT64).<span class="hljs-built_in">WithPrimaryKey</span>(<span class="hljs-literal">true</span>));
<span class="hljs-comment">// Vector field</span>
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">5</span>));
<span class="hljs-comment">// Define a JSON field that allows null values</span>
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;metadata&quot;</span>, milvus::DataType::JSON).<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>));

status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
    .<span class="hljs-built_in">WithCollectionSchema</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;(schema)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span> = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TOKEN</span> = <span class="hljs-string">&quot;root:Milvus&quot;</span>;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>, <span class="hljs-attr">token</span>: <span class="hljs-variable constant_">TOKEN</span> });

<span class="hljs-comment">// Create schema</span>
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;product_id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,
  },
  <span class="hljs-comment">// Define a JSON field that allows null values</span>
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,
    <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
  },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
  <span class="hljs-attr">enableDynamicField</span>: <span class="hljs-literal">true</span>,
  schema,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Set up a Milvus client</span>
MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

<span class="hljs-comment">// Create schema</span>
CollectionSchema schema = <span class="hljs-keyword">new</span>()
{
    EnableDynamicFields = <span class="hljs-literal">true</span>,
    Fields =
    {
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;product_id&quot;</span>, DataType.Int64, isPrimaryKey: <span class="hljs-literal">true</span>), <span class="hljs-comment">// Primary field</span>
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FloatVector) { Dimension = <span class="hljs-number">5</span> }, <span class="hljs-comment">// Vector field</span>
        <span class="hljs-comment">// Define a JSON field that allows null values</span>
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.Json) { Nullable = <span class="hljs-literal">true</span> }
    }
};

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Schema = schema
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;accept: application/json&quot;</span> \
  --header <span class="hljs-string">&quot;content-type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;product_catalog&quot;,
    &quot;schema&quot;: {
      &quot;autoId&quot;: false,
      &quot;enableDynamicField&quot;: true,
      &quot;fields&quot;: [
        {
          &quot;fieldName&quot;: &quot;product_id&quot;,
          &quot;dataType&quot;: &quot;Int64&quot;,
          &quot;isPrimary&quot;: true
        },
        {
          &quot;fieldName&quot;: &quot;vector&quot;,
          &quot;dataType&quot;: &quot;FloatVector&quot;,
          &quot;elementTypeParams&quot;: {
            &quot;dim&quot;: 5
          }
        },
        {
          &quot;fieldName&quot;: &quot;metadata&quot;,
          &quot;dataType&quot;: &quot;JSON&quot;,
          &quot;nullable&quot;: true
        }
      ]
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>In this example, the JSON field defined in the collection schema allows null values with <code translate="no">nullable=True</code>. For details, refer to <a href="/docs/ar/nullable-and-default.md">Nullable & Default</a>.</p>
</div>
<h3 id="Insert-data" class="common-anchor-header">Insert data<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Once the collection is created, insert entities that contain structured JSON objects in your designated JSON field. Your data should be formatted as a list of dictionaries.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">entities = [
    {
        <span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;metadata&quot;</span>: { <span class="hljs-comment"># JSON field</span></span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;supplier&quot;</span>: {</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;contact&quot;</span>: {</span>
<span class="highlighted-comment-line">                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,</span>
<span class="highlighted-comment-line">                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span></span>
<span class="highlighted-comment-line">                }</span>
<span class="highlighted-comment-line">            }</span>
<span class="highlighted-comment-line">        }</span>
    }
]

client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-comment">// Insert data</span>
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();

List&lt;JsonObject&gt; data = Arrays.asList(
    gson.fromJson(
        <span class="hljs-string">&quot;{\&quot;product_id\&quot;: 1, \&quot;vector\&quot;: [0.1, 0.2, 0.3, 0.4, 0.5], \&quot;metadata\&quot;: {\&quot;category\&quot;: \&quot;electronics\&quot;, \&quot;brand\&quot;: \&quot;BrandA\&quot;, \&quot;in_stock\&quot;: true, \&quot;price\&quot;: 99.99, \&quot;string_price\&quot;: \&quot;99.99\&quot;, \&quot;tags\&quot;: [\&quot;clearance\&quot;, \&quot;summer_sale\&quot;], \&quot;supplier\&quot;: {\&quot;name\&quot;: \&quot;SupplierX\&quot;, \&quot;country\&quot;: \&quot;USA\&quot;, \&quot;contact\&quot;: {\&quot;email\&quot;: \&quot;support@supplierx.com\&quot;, \&quot;phone\&quot;: \&quot;+1-800-555-0199\&quot;}}}}&quot;</span>,
        JsonObject.class
    )
);

<span class="hljs-type">InsertReq</span> <span class="hljs-variable">insertReq</span> <span class="hljs-operator">=</span> InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .data(data)
        .build();
client.insert(insertReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;encoding/json&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

<span class="hljs-comment">// Insert data</span>
metadata, _ := json.Marshal(<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;category&quot;</span>:     <span class="hljs-string">&quot;electronics&quot;</span>,
    <span class="hljs-string">&quot;brand&quot;</span>:        <span class="hljs-string">&quot;BrandA&quot;</span>,
    <span class="hljs-string">&quot;in_stock&quot;</span>:     <span class="hljs-literal">true</span>,
    <span class="hljs-string">&quot;price&quot;</span>:        <span class="hljs-number">99.99</span>,
    <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
    <span class="hljs-string">&quot;tags&quot;</span>:         []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>},
    <span class="hljs-string">&quot;supplier&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;name&quot;</span>:    <span class="hljs-string">&quot;SupplierX&quot;</span>,
        <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
        <span class="hljs-string">&quot;contact&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
            <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
            <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>,
        },
    },
})

columns := []column.Column{
    column.NewColumnInt64(<span class="hljs-string">&quot;product_id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>}),
    column.NewColumnFloatVector(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}}),
    column.NewColumnJSONBytes(<span class="hljs-string">&quot;metadata&quot;</span>, [][]<span class="hljs-type">byte</span>{metadata}),
}

<span class="hljs-keyword">if</span> _, err := cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, columns...)); err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-comment">// Insert data</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">entities</span> = <span class="hljs-built_in">vec!</span>[
    json!({
        <span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1_f32</span>, <span class="hljs-number">0.2_f32</span>, <span class="hljs-number">0.3_f32</span>, <span class="hljs-number">0.4_f32</span>, <span class="hljs-number">0.5_f32</span>],
        <span class="hljs-comment">// JSON field</span>
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
    }),
];

client
    .<span class="hljs-title function_ invoke__">insert</span>(
        InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">rows</span>(entities)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>

<span class="hljs-comment">// Insert data</span>
milvus::EntityRows rows = {
    {
        {<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-number">1</span>},
        {<span class="hljs-string">&quot;vector&quot;</span>, {<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}},
        <span class="hljs-comment">// JSON field</span>
        {<span class="hljs-string">&quot;metadata&quot;</span>, {
            {<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;electronics&quot;</span>},
            {<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;BrandA&quot;</span>},
            {<span class="hljs-string">&quot;in_stock&quot;</span>, <span class="hljs-literal">true</span>},
            {<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-number">99.99</span>},
            {<span class="hljs-string">&quot;string_price&quot;</span>, <span class="hljs-string">&quot;99.99&quot;</span>},
            {<span class="hljs-string">&quot;tags&quot;</span>, {<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>}},
            {<span class="hljs-string">&quot;supplier&quot;</span>, {
                {<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;SupplierX&quot;</span>},
                {<span class="hljs-string">&quot;country&quot;</span>, <span class="hljs-string">&quot;USA&quot;</span>},
                {<span class="hljs-string">&quot;contact&quot;</span>, {
                    {<span class="hljs-string">&quot;email&quot;</span>, <span class="hljs-string">&quot;support@supplierx.com&quot;</span>},
                    {<span class="hljs-string">&quot;phone&quot;</span>, <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>}
                }}
            }}
        }}
    }
};

milvus::InsertResponse insert_resp;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Insert</span>(milvus::<span class="hljs-built_in">InsertRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
    .<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(rows)), insert_resp);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Insert data</span>
<span class="hljs-keyword">const</span> entities = [
  {
    <span class="hljs-attr">product_id</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
    <span class="hljs-comment">// JSON field</span>
    <span class="hljs-attr">metadata</span>: {
      <span class="hljs-attr">category</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
      <span class="hljs-attr">brand</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
      <span class="hljs-attr">in_stock</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">price</span>: <span class="hljs-number">99.99</span>,
      <span class="hljs-attr">string_price</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
      <span class="hljs-attr">tags</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
      <span class="hljs-attr">supplier</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
        <span class="hljs-attr">country</span>: <span class="hljs-string">&quot;USA&quot;</span>,
        <span class="hljs-attr">contact</span>: {
          <span class="hljs-attr">email</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
          <span class="hljs-attr">phone</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>,
        },
      },
    },
  },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
  <span class="hljs-attr">data</span>: entities,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;

<span class="hljs-comment">// Insert data</span>
<span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    RowsData =
    [
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
        {
            [<span class="hljs-string">&quot;product_id&quot;</span>] = <span class="hljs-number">1L</span>,
            [<span class="hljs-string">&quot;vector&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span> },
            [<span class="hljs-string">&quot;metadata&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; <span class="hljs-comment">// JSON field</span>
            {
                [<span class="hljs-string">&quot;category&quot;</span>] = <span class="hljs-string">&quot;electronics&quot;</span>,
                [<span class="hljs-string">&quot;brand&quot;</span>] = <span class="hljs-string">&quot;BrandA&quot;</span>,
                [<span class="hljs-string">&quot;in_stock&quot;</span>] = <span class="hljs-literal">true</span>,
                [<span class="hljs-string">&quot;price&quot;</span>] = <span class="hljs-number">99.99</span>,
                [<span class="hljs-string">&quot;string_price&quot;</span>] = <span class="hljs-string">&quot;99.99&quot;</span>,
                [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span> },
                [<span class="hljs-string">&quot;supplier&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
                {
                    [<span class="hljs-string">&quot;name&quot;</span>] = <span class="hljs-string">&quot;SupplierX&quot;</span>,
                    [<span class="hljs-string">&quot;country&quot;</span>] = <span class="hljs-string">&quot;USA&quot;</span>,
                    [<span class="hljs-string">&quot;contact&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
                    {
                        [<span class="hljs-string">&quot;email&quot;</span>] = <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                        [<span class="hljs-string">&quot;phone&quot;</span>] = <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                    }
                }
            }
        }
    ]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;accept: application/json&quot;</span> \
  --header <span class="hljs-string">&quot;content-type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;product_catalog&quot;,
    &quot;data&quot;: [
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
    ]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Filtering-operations" class="common-anchor-header">Filtering operations<button data-href="#Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p>Before you can perform filtering operations on JSON fields, make sure:</p>
<ul>
<li><p>You have created an index on each vector field.</p></li>
<li><p>The collection is loaded into memory.</p></li>
</ul>
<p><details></p>
<p><summary>Show code</summary></p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

client.create_index(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, index_params=index_params)

client.load_collection(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-comment">// Create an index on the vector field</span>
client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .indexParams(Arrays.asList(IndexParam.builder()
                .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
                .indexName(<span class="hljs-string">&quot;vector_index&quot;</span>)
                .indexType(IndexParam.IndexType.AUTOINDEX)
                .metricType(IndexParam.MetricType.COSINE)
                .build()))
        .build());

<span class="hljs-comment">// Load the collection</span>
client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

<span class="hljs-comment">// Create an index on the vector field</span>
indexTask, err := cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(
    <span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, index.NewAutoIndex(entity.COSINE),
).WithIndexName(<span class="hljs-string">&quot;vector_index&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<span class="hljs-keyword">if</span> err := indexTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-comment">// Load the collection</span>
loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;product_catalog&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<span class="hljs-keyword">if</span> err := loadTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Create an index on the vector field</span>
client
    .<span class="hljs-title function_ invoke__">create_index</span>(
        CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[
                IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                    .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;vector_index&quot;</span>)
                    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
                    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine),
            ])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Load the collection</span>
client
    .<span class="hljs-title function_ invoke__">load_collection</span>(
        LoadCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>

<span class="hljs-comment">// Create an index on the vector field</span>
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">index</span><span class="hljs-params">(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;vector_index&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE)</span></span>;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
    .<span class="hljs-built_in">WithIndexes</span>({std::<span class="hljs-built_in">move</span>(index)})
    .<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Load the collection</span>
status = client-&gt;<span class="hljs-built_in">LoadCollection</span>(milvus::<span class="hljs-built_in">LoadCollectionRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
    .<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Create an index on the vector field</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
  <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">COSINE</span>,
});

<span class="hljs-comment">// Load the collection</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Create an index on the vector field</span>
<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Indexes = [<span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;vector_index&quot;</span>, IndexType.AutoIndex, MetricType.Cosine)]
});

<span class="hljs-comment">// Load the collection</span>
<span class="hljs-keyword">await</span> client.LoadCollectionAsync(<span class="hljs-keyword">new</span> LoadCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Create an index on the vector field</span>
curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;accept: application/json&quot;</span> \
  --header <span class="hljs-string">&quot;content-type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;product_catalog&quot;,
    &quot;indexParams&quot;: [
      {
        &quot;fieldName&quot;: &quot;vector&quot;,
        &quot;indexName&quot;: &quot;vector_index&quot;,
        &quot;indexType&quot;: &quot;AUTOINDEX&quot;,
        &quot;metricType&quot;: &quot;COSINE&quot;
      }
    ]
  }&#x27;</span>

<span class="hljs-comment"># Load the collection</span>
curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;accept: application/json&quot;</span> \
  --header <span class="hljs-string">&quot;content-type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;product_catalog&quot;
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Once these requirements are met, you can use the expressions below to filter on your collection based on the values within the JSON field. These filter expressions leverage specific JSON path syntax and dedicated operators.</p>
<h4 id="Filtering-with-JSON-path-syntax" class="common-anchor-header">Filtering with JSON path syntax</h4><p>To query a specific key, use bracket notation to access JSON keys: <code translate="no">json_field_name[&quot;key&quot;]</code>. For nested keys, chain them together: <code translate="no">json_field_name[&quot;key1&quot;][&quot;key2&quot;]</code>.</p>
<p>To filter for entities where the <code translate="no">category</code> is <code translate="no">&quot;electronics&quot;</code>:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>

client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-comment">// Define filter expression</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;] == \&quot;electronics\&quot;&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>) <span class="hljs-comment">// Collection name</span>
        .data(Arrays.asList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}))) <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
        .limit(<span class="hljs-number">5</span>) <span class="hljs-comment">// Max. number of results to return</span>
        .filter(filter) <span class="hljs-comment">// Filter expression</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>)) <span class="hljs-comment">// Fields to include in the search results</span>
        .build());

System.out.println(resp.getSearchResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

<span class="hljs-comment">// Define filter expression</span>
filter := <span class="hljs-string">`metadata[&quot;category&quot;] == &quot;electronics&quot;`</span>

res, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-comment">// Collection name</span>
    <span class="hljs-number">5</span>, <span class="hljs-comment">// Max. number of results to return</span>
    []entity.Vector{entity.FloatVector{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}}, <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
).WithFilter(filter).WithOutputFields(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>)) <span class="hljs-comment">// Filter expression; fields to include in the search results</span>
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> res {
    log.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Define filter expression</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;metadata[&quot;category&quot;] == &quot;electronics&quot;&quot;#</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">search</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>) <span class="hljs-comment">// Collection name</span>
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1_f32</span>, <span class="hljs-number">0.2_f32</span>, <span class="hljs-number">0.3_f32</span>, <span class="hljs-number">0.4_f32</span>, <span class="hljs-number">0.5_f32</span>]])) <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>) <span class="hljs-comment">// Max. number of results to return</span>
            .<span class="hljs-title function_ invoke__">filter</span>(filter) <span class="hljs-comment">// Filter expression</span>
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]) <span class="hljs-comment">// Fields to include in the search results</span>
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{} rows returned&quot;</span>, search.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">len</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Define filter expression</span>
std::string filter = <span class="hljs-string">R&quot;(metadata[&quot;category&quot;] == &quot;electronics&quot;)&quot;</span>;

milvus::SearchRequest search_request;
search_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>); <span class="hljs-comment">// Collection name</span>
search_request.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}); <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
search_request.<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>); <span class="hljs-comment">// Max. number of results to return</span>
search_request.<span class="hljs-built_in">WithFilter</span>(filter); <span class="hljs-comment">// Filter expression</span>
search_request.<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>}); <span class="hljs-comment">// Fields to include in the search results</span>

milvus::SearchResponse search_response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(search_request, search_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Define filter expression</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-comment">// Collection name</span>
  <span class="hljs-attr">data</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>, <span class="hljs-comment">// Max. number of results to return</span>
  filter, <span class="hljs-comment">// Filter expression</span>
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>], <span class="hljs-comment">// Fields to include in the search results</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Define filter expression</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;metadata[\&quot;category\&quot;] == \&quot;electronics\&quot;&quot;</span>;

SearchResp res = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-comment">// Collection name</span>
    VectorFieldName = <span class="hljs-string">&quot;vector&quot;</span>,
    Vectors = [<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span> }], <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
    Limit = <span class="hljs-number">5</span>, <span class="hljs-comment">// Max. number of results to return</span>
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = filter, <span class="hljs-comment">// Filter expression</span>
        OutputFields = { <span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span> } <span class="hljs-comment">// Fields to include in the search results</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Define filter expression</span>
FILTER=<span class="hljs-string">&#x27;metadata[\&quot;category\&quot;] == \&quot;electronics\&quot;&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;accept: application/json&quot;</span> \
  --header <span class="hljs-string">&quot;content-type: application/json&quot;</span> \
  --data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;product_catalog\&quot;,
    \&quot;data\&quot;: [[0.1, 0.2, 0.3, 0.4, 0.5]],
    \&quot;limit\&quot;: 5,
    \&quot;filter\&quot;: \&quot;<span class="hljs-variable">${FILTER}</span>\&quot;,
    \&quot;outputFields\&quot;: [\&quot;product_id\&quot;, \&quot;metadata\&quot;]
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>To filter for entities where the nested key <code translate="no">supplier[&quot;country&quot;]</code> is <code translate="no">&quot;USA&quot;</code>:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;country&quot;] == &quot;USA&quot;&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-comment">// Define filter expression</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;metadata[\&quot;supplier\&quot;][\&quot;country\&quot;] == \&quot;USA\&quot;&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>) <span class="hljs-comment">// Collection name</span>
        .data(Arrays.asList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}))) <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
        .limit(<span class="hljs-number">5</span>) <span class="hljs-comment">// Max. number of results to return</span>
        .filter(filter) <span class="hljs-comment">// Filter expression</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>)) <span class="hljs-comment">// Fields to include in the search results</span>
        .build());

System.out.println(resp.getSearchResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

<span class="hljs-comment">// Define filter expression</span>
filter := <span class="hljs-string">`metadata[&quot;supplier&quot;][&quot;country&quot;] == &quot;USA&quot;`</span>

res, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-comment">// Collection name</span>
    <span class="hljs-number">5</span>, <span class="hljs-comment">// Max. number of results to return</span>
    []entity.Vector{entity.FloatVector{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}}, <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
).WithFilter(filter).WithOutputFields(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>)) <span class="hljs-comment">// Filter expression; fields to include in the search results</span>
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> res {
    log.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Define filter expression</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;metadata[&quot;supplier&quot;][&quot;country&quot;] == &quot;USA&quot;&quot;#</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">search</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>) <span class="hljs-comment">// Collection name</span>
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1_f32</span>, <span class="hljs-number">0.2_f32</span>, <span class="hljs-number">0.3_f32</span>, <span class="hljs-number">0.4_f32</span>, <span class="hljs-number">0.5_f32</span>]])) <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>) <span class="hljs-comment">// Max. number of results to return</span>
            .<span class="hljs-title function_ invoke__">filter</span>(filter) <span class="hljs-comment">// Filter expression</span>
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]) <span class="hljs-comment">// Fields to include in the search results</span>
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{} rows returned&quot;</span>, search.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">len</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Define filter expression</span>
std::string filter = <span class="hljs-string">R&quot;(metadata[&quot;supplier&quot;][&quot;country&quot;] == &quot;USA&quot;)&quot;</span>;

milvus::SearchRequest search_request;
search_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>); <span class="hljs-comment">// Collection name</span>
search_request.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}); <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
search_request.<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>); <span class="hljs-comment">// Max. number of results to return</span>
search_request.<span class="hljs-built_in">WithFilter</span>(filter); <span class="hljs-comment">// Filter expression</span>
search_request.<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>}); <span class="hljs-comment">// Fields to include in the search results</span>

milvus::SearchResponse search_response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(search_request, search_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Define filter expression</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;country&quot;] == &quot;USA&quot;&#x27;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-comment">// Collection name</span>
  <span class="hljs-attr">data</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>, <span class="hljs-comment">// Max. number of results to return</span>
  filter, <span class="hljs-comment">// Filter expression</span>
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>], <span class="hljs-comment">// Fields to include in the search results</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Define filter expression</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;metadata[\&quot;supplier\&quot;][\&quot;country\&quot;] == \&quot;USA\&quot;&quot;</span>;

SearchResp res = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-comment">// Collection name</span>
    VectorFieldName = <span class="hljs-string">&quot;vector&quot;</span>,
    Vectors = [<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span> }], <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
    Limit = <span class="hljs-number">5</span>, <span class="hljs-comment">// Max. number of results to return</span>
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = filter, <span class="hljs-comment">// Filter expression</span>
        OutputFields = { <span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span> } <span class="hljs-comment">// Fields to include in the search results</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Define filter expression</span>
FILTER=<span class="hljs-string">&#x27;metadata[\&quot;supplier\&quot;][\&quot;country\&quot;] == \&quot;USA\&quot;&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;accept: application/json&quot;</span> \
  --header <span class="hljs-string">&quot;content-type: application/json&quot;</span> \
  --data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;product_catalog\&quot;,
    \&quot;data\&quot;: [[0.1, 0.2, 0.3, 0.4, 0.5]],
    \&quot;limit\&quot;: 5,
    \&quot;filter\&quot;: \&quot;<span class="hljs-variable">${FILTER}</span>\&quot;,
    \&quot;outputFields\&quot;: [\&quot;product_id\&quot;, \&quot;metadata\&quot;]
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filtering-with-JSON-specific-operators" class="common-anchor-header">Filtering with JSON-specific operators</h4><p>Milvus also provides special operators for querying array values on specific JSON field keys. For example:</p>
<ul>
<li><p><code translate="no">json_contains(identifier, expr)</code>: Checks if a specific element or sub-array exists within a JSON array</p></li>
<li><p><code translate="no">json_contains_all(identifier, expr)</code>: Ensures that all elements of the specified JSON expression are present in the field</p></li>
<li><p><code translate="no">json_contains_any(identifier, expr)</code>: Filters entities where at least one member of the JSON expression exists within the field</p></li>
</ul>
<p>To find a product that has the <code translate="no">&quot;summer_sale&quot;</code> value under the <code translate="no">tags</code> key:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;summer_sale&quot;)&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-comment">// Define filter expression</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains(metadata[\&quot;tags\&quot;], \&quot;summer_sale\&quot;)&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>) <span class="hljs-comment">// Collection name</span>
        .data(Arrays.asList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}))) <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
        .limit(<span class="hljs-number">5</span>) <span class="hljs-comment">// Max. number of results to return</span>
        .filter(filter) <span class="hljs-comment">// Filter expression</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>)) <span class="hljs-comment">// Fields to include in the search results</span>
        .build());

System.out.println(resp.getSearchResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

<span class="hljs-comment">// Define filter expression</span>
filter := <span class="hljs-string">`json_contains(metadata[&quot;tags&quot;], &quot;summer_sale&quot;)`</span>

res, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-comment">// Collection name</span>
    <span class="hljs-number">5</span>, <span class="hljs-comment">// Max. number of results to return</span>
    []entity.Vector{entity.FloatVector{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}}, <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
).WithFilter(filter).WithOutputFields(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>)) <span class="hljs-comment">// Filter expression; fields to include in the search results</span>
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> res {
    log.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Define filter expression</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;json_contains(metadata[&quot;tags&quot;], &quot;summer_sale&quot;)&quot;#</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">search</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>) <span class="hljs-comment">// Collection name</span>
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1_f32</span>, <span class="hljs-number">0.2_f32</span>, <span class="hljs-number">0.3_f32</span>, <span class="hljs-number">0.4_f32</span>, <span class="hljs-number">0.5_f32</span>]])) <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>) <span class="hljs-comment">// Max. number of results to return</span>
            .<span class="hljs-title function_ invoke__">filter</span>(filter) <span class="hljs-comment">// Filter expression</span>
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]) <span class="hljs-comment">// Fields to include in the search results</span>
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{} rows returned&quot;</span>, search.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">len</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Define filter expression</span>
std::string filter = <span class="hljs-string">R&quot;(json_contains(metadata[&quot;tags&quot;], &quot;summer_sale&quot;))&quot;</span>;

milvus::SearchRequest search_request;
search_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>); <span class="hljs-comment">// Collection name</span>
search_request.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}); <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
search_request.<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>); <span class="hljs-comment">// Max. number of results to return</span>
search_request.<span class="hljs-built_in">WithFilter</span>(filter); <span class="hljs-comment">// Filter expression</span>
search_request.<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>}); <span class="hljs-comment">// Fields to include in the search results</span>

milvus::SearchResponse search_response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(search_request, search_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Define filter expression</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;summer_sale&quot;)&#x27;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-comment">// Collection name</span>
  <span class="hljs-attr">data</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>, <span class="hljs-comment">// Max. number of results to return</span>
  filter, <span class="hljs-comment">// Filter expression</span>
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>], <span class="hljs-comment">// Fields to include in the search results</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Define filter expression</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains(metadata[\&quot;tags\&quot;], \&quot;summer_sale\&quot;)&quot;</span>;

SearchResp res = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-comment">// Collection name</span>
    VectorFieldName = <span class="hljs-string">&quot;vector&quot;</span>,
    Vectors = [<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span> }], <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
    Limit = <span class="hljs-number">5</span>, <span class="hljs-comment">// Max. number of results to return</span>
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = filter, <span class="hljs-comment">// Filter expression</span>
        OutputFields = { <span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span> } <span class="hljs-comment">// Fields to include in the search results</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Define filter expression</span>
FILTER=<span class="hljs-string">&#x27;json_contains(metadata[\&quot;tags\&quot;], \&quot;summer_sale\&quot;)&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;accept: application/json&quot;</span> \
  --header <span class="hljs-string">&quot;content-type: application/json&quot;</span> \
  --data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;product_catalog\&quot;,
    \&quot;data\&quot;: [[0.1, 0.2, 0.3, 0.4, 0.5]],
    \&quot;limit\&quot;: 5,
    \&quot;filter\&quot;: \&quot;<span class="hljs-variable">${FILTER}</span>\&quot;,
    \&quot;outputFields\&quot;: [\&quot;product_id\&quot;, \&quot;metadata\&quot;]
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>To find a product that has at least one of the <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;new&quot;</code>, or <code translate="no">&quot;clearance&quot;</code> values under the <code translate="no">tags</code> key:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(metadata[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-comment">// Define filter expression</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains_any(metadata[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>) <span class="hljs-comment">// Collection name</span>
        .data(Arrays.asList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}))) <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
        .limit(<span class="hljs-number">5</span>) <span class="hljs-comment">// Max. number of results to return</span>
        .filter(filter) <span class="hljs-comment">// Filter expression</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>)) <span class="hljs-comment">// Fields to include in the search results</span>
        .build());

System.out.println(resp.getSearchResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

<span class="hljs-comment">// Define filter expression</span>
filter := <span class="hljs-string">`json_contains_any(metadata[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])`</span>

res, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-comment">// Collection name</span>
    <span class="hljs-number">5</span>, <span class="hljs-comment">// Max. number of results to return</span>
    []entity.Vector{entity.FloatVector{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}}, <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
).WithFilter(filter).WithOutputFields(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>)) <span class="hljs-comment">// Filter expression; fields to include in the search results</span>
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> res {
    log.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Define filter expression</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;json_contains_any(metadata[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&quot;#</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">search</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>) <span class="hljs-comment">// Collection name</span>
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1_f32</span>, <span class="hljs-number">0.2_f32</span>, <span class="hljs-number">0.3_f32</span>, <span class="hljs-number">0.4_f32</span>, <span class="hljs-number">0.5_f32</span>]])) <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>) <span class="hljs-comment">// Max. number of results to return</span>
            .<span class="hljs-title function_ invoke__">filter</span>(filter) <span class="hljs-comment">// Filter expression</span>
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]) <span class="hljs-comment">// Fields to include in the search results</span>
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{} rows returned&quot;</span>, search.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">len</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Define filter expression</span>
std::string filter = <span class="hljs-string">R&quot;(json_contains_any(metadata[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]))&quot;</span>;

milvus::SearchRequest search_request;
search_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>); <span class="hljs-comment">// Collection name</span>
search_request.<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}); <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
search_request.<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>); <span class="hljs-comment">// Max. number of results to return</span>
search_request.<span class="hljs-built_in">WithFilter</span>(filter); <span class="hljs-comment">// Filter expression</span>
search_request.<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>}); <span class="hljs-comment">// Fields to include in the search results</span>

milvus::SearchResponse search_response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(search_request, search_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Define filter expression</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains_any(metadata[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-comment">// Collection name</span>
  <span class="hljs-attr">data</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
  <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>, <span class="hljs-comment">// Max. number of results to return</span>
  filter, <span class="hljs-comment">// Filter expression</span>
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>], <span class="hljs-comment">// Fields to include in the search results</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Define filter expression</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains_any(metadata[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;

SearchResp res = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-comment">// Collection name</span>
    VectorFieldName = <span class="hljs-string">&quot;vector&quot;</span>,
    Vectors = [<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span> }], <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
    Limit = <span class="hljs-number">5</span>, <span class="hljs-comment">// Max. number of results to return</span>
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = filter, <span class="hljs-comment">// Filter expression</span>
        OutputFields = { <span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span> } <span class="hljs-comment">// Fields to include in the search results</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Define filter expression</span>
FILTER=<span class="hljs-string">&#x27;json_contains_any(metadata[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;accept: application/json&quot;</span> \
  --header <span class="hljs-string">&quot;content-type: application/json&quot;</span> \
  --data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;product_catalog\&quot;,
    \&quot;data\&quot;: [[0.1, 0.2, 0.3, 0.4, 0.5]],
    \&quot;limit\&quot;: 5,
    \&quot;filter\&quot;: \&quot;<span class="hljs-variable">${FILTER}</span>\&quot;,
    \&quot;outputFields\&quot;: [\&quot;product_id\&quot;, \&quot;metadata\&quot;]
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>For more information about JSON-specific operators, refer to <a href="/docs/ar/json-operators.md">JSON Operators</a>.</p>
<h2 id="Next-Accelerate-JSON-queries" class="common-anchor-header">Next: Accelerate JSON queries<button data-href="#Next-Accelerate-JSON-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>By default, queries on JSON fields without acceleration will perform a full scan of all rows, which can be slow on large datasets. To speed up JSON queries, Milvus provides advanced indexing and storage optimization features.</p>
<div class="alert warning">
<p>Whole-object JSON indexing (<code translate="no">json_cast_type=&quot;JSON&quot;</code>), also known as JSON flat indexing, is deprecated. Index-creation requests for it succeed for compatibility, but Milvus retains only the logical index definition and does not build a physical index. Use JSON path indexing for known query paths, or consider <a href="/docs/ar/json-shredding.md">JSON Shredding</a> for broad query acceleration.</p>
</div>
<p>The table below summarizes their differences and best-use scenarios:</p>
<table>
   <tr>
     <th><p>Technique</p></th>
     <th><p>Best For</p></th>
     <th><p>Arrays Acceleration</p></th>
     <th><p>Notes</p></th>
   </tr>
   <tr>
     <td><p>JSON Indexing</p></td>
     <td><p>Small set of frequently accessed keys, arrays on a specific array key</p></td>
     <td><p>Yes (on indexed array key)</p></td>
     <td><p>Must preselect keys, maintenance needed if schema evolves</p></td>
   </tr>
   <tr>
     <td><p>JSON Shredding</p></td>
     <td><p>General speed-up across many keys, flexible for varied queries</p></td>
     <td><p>No (does not accelerate values inside arrays)</p></td>
     <td><p>Extra storage config, arrays still need per-key index</p></td>
   </tr>
   <tr>
     <td><p>NGRAM Index</p></td>
     <td><p>Wildcard searches, substring matching in text fields</p></td>
     <td><p>N/A</p></td>
     <td><p>Not for numeric/range filters</p></td>
   </tr>
</table>
<p><strong>Tip:</strong> You can combine these approaches—for example, use JSON shredding for broad query acceleration, JSON indexing for high-frequency array keys, and NGRAM indexing for flexible text search.</p>
<p>For implementation details, refer to:</p>
<ul>
<li><p><a href="/docs/ar/json-indexing.md">JSON Indexing</a></p></li>
<li><p><a href="/docs/ar/json-shredding.md">JSON Shredding</a></p></li>
<li><p><a href="/docs/ar/ngram.md">NGRAM</a></p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Are-there-any-limitations-on-the-size-of-a-JSON-field" class="common-anchor-header">Are there any limitations on the size of a JSON field?<button data-href="#Are-there-any-limitations-on-the-size-of-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Yes. Each JSON field is limited to 65,536 bytes.</p>
<h3 id="Does-a-JSON-field-support-setting-a-default-value" class="common-anchor-header">Does a JSON field support setting a default value?<button data-href="#Does-a-JSON-field-support-setting-a-default-value" class="anchor-icon" translate="no">
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
    </button></h3><p>No, JSON fields do not support default values. However, you can set <code translate="no">nullable=True</code> when defining the field to allow empty entries.</p>
<p>Refer to <a href="/docs/ar/nullable-and-default.md">Nullable & Default</a> for details.</p>
<h3 id="Are-there-any-naming-conventions-for-JSON-field-keys" class="common-anchor-header">Are there any naming conventions for JSON field keys?<button data-href="#Are-there-any-naming-conventions-for-JSON-field-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Yes, to ensure compatibility with queries and indexing:</p>
<ul>
<li><p>Use only letters, numbers, and underscores in JSON keys.</p></li>
<li><p>Avoid using special characters, spaces, or dots (<code translate="no">.</code>, <code translate="no">/</code>, etc.).</p></li>
<li><p>Incompatible keys may cause parsing issues in filter expressions.</p></li>
</ul>
<h3 id="How-does-Milvus-handle-string-values-in-JSON-fields" class="common-anchor-header">How does Milvus handle string values in JSON fields?<button data-href="#How-does-Milvus-handle-string-values-in-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus stores string values exactly as they appear in the JSON input—without semantic transformation. Improperly quoted strings may result in errors during parsing.</p>
<p><strong>Examples of valid strings</strong>:</p>
<pre><code translate="no" class="language-plaintext">&quot;a\&quot;b&quot;, &quot;a&#x27;b&quot;, &quot;a\\b&quot;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Examples of invalid strings</strong>:</p>
<pre><code translate="no" class="language-plaintext">&#x27;a&quot;b&#x27;, &#x27;a\&#x27;b&#x27;
<button class="copy-code-btn"></button></code></pre>
