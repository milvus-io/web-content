---
id: create-structarray-field.md
title: Create a StructArray Field
summary: >-
  當一個實體需要包含一組有序的結構化元素清單時，請建立一個 StructArray 欄位。StructArray 欄位是一種 Array 欄位，其元素類型為
  Struct。每個 Struct 元素均遵循相同的結構，並可包含標量子欄位、向量子欄位，或兩者兼具。
---
<h1 id="Create-a-StructArray-Field" class="common-anchor-header">Create a StructArray Field<button data-href="#Create-a-StructArray-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Create a StructArray field when one entity needs to contain an ordered list of structured elements. A StructArray field is an Array field whose element type is Struct. Each Struct element follows the same schema and can contain scalar subfields, vector subfields, or both.</p>
<p>This page shows how to define a Struct schema, add it as a StructArray field, choose subfields for later search and filtering, and understand the schema rules that apply before you insert or index data.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Before you begin<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 3.0.0 and later support nullable StructArray fields and adding StructArray fields to existing collections in Standalone and Distributed deployments. Earlier versions do not support these capabilities.</p>
<p>The creation, nullable creation, and field-addition examples are alternative workflows. Do not run them sequentially against the same collection. Reuse the client initialization for your selected language in the later examples.</p>
<p>This page uses a collection named <code translate="no">tech_articles</code>. Each entity represents one technical article, and the <code translate="no">chunks</code> field stores chunk-level data as Struct elements.</p>
<table>
<thead>
<tr><th>Field</th><th>Type</th><th>Purpose</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">doc_id</code></td><td><code translate="no">INT64</code></td><td>Primary key for the article.</td></tr>
<tr><td><code translate="no">title</code></td><td><code translate="no">VARCHAR</code></td><td>Article title.</td></tr>
<tr><td><code translate="no">category</code></td><td><code translate="no">VARCHAR</code></td><td>Article-level category.</td></tr>
<tr><td><code translate="no">title_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Article-level vector field, used later in hybrid search examples.</td></tr>
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>StructArray field that stores chunk-level text, metadata, and embeddings.</td></tr>
</tbody>
</table>
<p>The <code translate="no">chunks</code> StructArray field contains the following subfields.</p>
<table>
<thead>
<tr><th>Subfield</th><th>Type</th><th>Purpose</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">text</code></td><td><code translate="no">VARCHAR</code></td><td>Chunk text.</td></tr>
<tr><td><code translate="no">section</code></td><td><code translate="no">VARCHAR</code></td><td>Section name, such as <code translate="no">index</code>, <code translate="no">search</code>, or <code translate="no">filter</code>.</td></tr>
<tr><td><code translate="no">page</code></td><td><code translate="no">INT64</code></td><td>Page number or logical position of the chunk.</td></tr>
<tr><td><code translate="no">quality_score</code></td><td><code translate="no">FLOAT</code></td><td>Chunk-level score used in scalar filtering and range examples.</td></tr>
<tr><td><code translate="no">has_code</code></td><td><code translate="no">BOOL</code></td><td>Whether the chunk contains code.</td></tr>
<tr><td><code translate="no">emb_list_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Vector subfield for EmbeddingList search with <code translate="no">MAX_SIM*</code> metrics.</td></tr>
<tr><td><code translate="no">emb</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Vector subfield for element-level search with regular vector metrics.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>A vector field or vector subfield accepts only one index. If you need both EmbeddingList search and element-level search, define two separate vector subfields. In this example, <code translate="no">chunks[emb_list_vector]</code> is for EmbeddingList search, and <code translate="no">chunks[emb]</code> is for element-level search.</p>
</div>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">Supported subfield data types<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>A StructArray field stores one array value for each Struct subfield. When you define a Struct schema, choose subfield types from the supported scalar and vector families.</p>
<table>
<thead>
<tr><th>Struct subfield physical type</th><th>Support</th><th>Notes</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array&lt;Bool&gt;</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.BOOL</code>.</td></tr>
<tr><td><code translate="no">Array&lt;Int8/Int16/Int32/Int64&gt;</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code>, or <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array&lt;Float/Double&gt;</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.FLOAT</code> or <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array&lt;VarChar&gt;</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.VARCHAR</code> and set <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;FloatVector&gt;</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.FLOAT_VECTOR</code> and set <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Float16Vector&gt;</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.FLOAT16_VECTOR</code> and set <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BFloat16Vector&gt;</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.BFLOAT16_VECTOR</code> and set <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Int8Vector&gt;</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.INT8_VECTOR</code> and set <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BinaryVector&gt;</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.BINARY_VECTOR</code> and set <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;SparseFloatVector&gt;</code></td><td>Not supported</td><td>Sparse vector subfields are not supported in StructArray fields.</td></tr>
<tr><td><code translate="no">Array&lt;String&gt;</code></td><td>Not supported</td><td>Use <code translate="no">VARCHAR</code>, not <code translate="no">String</code>.</td></tr>
<tr><td><code translate="no">Array&lt;JSON&gt;</code></td><td>Not supported</td><td>JSON subfields are not supported in StructArray fields.</td></tr>
<tr><td><code translate="no">Array&lt;Geometry&gt;</code></td><td>Not supported</td><td>Geometry subfields and GIS functions are not supported in StructArray fields.</td></tr>
<tr><td><code translate="no">Array&lt;Text&gt;</code></td><td>Not supported</td><td>Text subfields are not supported in StructArray fields.</td></tr>
<tr><td><code translate="no">Array&lt;Timestamptz&gt;</code></td><td>Not supported</td><td>Timestamptz subfields and time-specific expressions are not supported in StructArray fields.</td></tr>
<tr><td>Nested <code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code>, or <code translate="no">ArrayOfStruct</code></td><td>Not supported</td><td>StructArray fields do not support nested array, vector-array, Struct, or Array-of-Struct subfields.</td></tr>
</tbody>
</table>
<p>For version-specific support, nullable behavior, and other limits, see <a href="/docs/zh-hant/structarray-limits.md">StructArray Limits</a>.</p>
<h2 id="Create-a-collection-with-a-StructArray-field" class="common-anchor-header">Create a collection with a StructArray field<button data-href="#Create-a-collection-with-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>To create a StructArray field, first define the Struct schema used by each element. Then add an Array field and set its element type to Struct.</p>
<ol>
<li><p>Create the collection schema.</p></li>
<li><p>Add collection-level fields, such as the primary key and article-level fields.</p></li>
<li><p>Create a Struct schema for elements stored inside the StructArray field.</p></li>
<li><p>Add scalar and vector subfields to the Struct schema.</p></li>
<li><p>Add an Array field with <code translate="no">element_type=DataType.STRUCT</code>.</p></li>
<li><p>Set <code translate="no">struct_schema</code> to the Struct schema.</p></li>
<li><p>Set <code translate="no">max_capacity</code> to limit how many Struct elements each entity can store in the field.</p></li>
</ol>
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

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">False</span>,
)

<span class="hljs-comment"># Collection-level fields.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Struct schema used by each element in the StructArray field.</span>
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)

<span class="hljs-comment"># Vector subfield for EmbeddingList search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Vector subfield for element-level search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Add the StructArray field.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    schema=schema,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">false</span>);

<span class="hljs-comment">// Collection-level fields.</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;category&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">128</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">4</span>)
        .build());

<span class="hljs-comment">// Add the StructArray field.</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;chunks&quot;</span>)
        .dataType(DataType.Array)
        .elementType(DataType.Struct)
        .maxCapacity(<span class="hljs-number">1000</span>)
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">65535</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;section&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">128</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;page&quot;</span>)
                .dataType(DataType.Int64)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;quality_score&quot;</span>)
                .dataType(DataType.Float)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;has_code&quot;</span>)
                .dataType(DataType.Bool)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;emb_list_vector&quot;</span>)
                .dataType(DataType.FloatVector)
                .dimension(<span class="hljs-number">4</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;emb&quot;</span>)
                .dataType(DataType.FloatVector)
                .dimension(<span class="hljs-number">4</span>)
                .build())
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .collectionSchema(schema)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
    <span class="hljs-keyword">return</span>
}

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">false</span>)

<span class="hljs-comment">// Collection-level fields.</span>
schema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;doc_id&quot;</span>).
        WithDataType(entity.FieldTypeInt64).
        WithIsPrimaryKey(<span class="hljs-literal">true</span>))
schema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;title&quot;</span>).
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(<span class="hljs-number">512</span>))
schema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;category&quot;</span>).
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(<span class="hljs-number">128</span>))
schema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;title_vector&quot;</span>).
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(<span class="hljs-number">4</span>))

<span class="hljs-comment">// Struct schema used by each element in the StructArray field.</span>
chunkSchema := entity.NewStructSchema()
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;text&quot;</span>).
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(<span class="hljs-number">65535</span>))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;section&quot;</span>).
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(<span class="hljs-number">128</span>))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;page&quot;</span>).
        WithDataType(entity.FieldTypeInt64))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;quality_score&quot;</span>).
        WithDataType(entity.FieldTypeFloat))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;has_code&quot;</span>).
        WithDataType(entity.FieldTypeBool))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;emb_list_vector&quot;</span>).
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(<span class="hljs-number">4</span>))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;emb&quot;</span>).
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(<span class="hljs-number">4</span>))

<span class="hljs-comment">// Add the StructArray field.</span>
schema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;chunks&quot;</span>).
        WithDataType(entity.FieldTypeArray).
        WithElementType(entity.FieldTypeStruct).
        WithMaxCapacity(<span class="hljs-number">1000</span>).
        WithStructSchema(chunkSchema))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Collection-level fields.</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">enable_dynamic_field</span>(<span class="hljs-literal">false</span>)
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64)
            .<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;title&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">512</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;category&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">128</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;title_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>),
    )
    <span class="hljs-comment">// Struct schema used by each element in the StructArray field.</span>
    .<span class="hljs-title function_ invoke__">add_struct_field</span>(
        StructFieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
            .<span class="hljs-title function_ invoke__">max_capacity</span>(<span class="hljs-number">1000</span>)
            .<span class="hljs-title function_ invoke__">add_field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
                    .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">65535</span>),
            )
            .<span class="hljs-title function_ invoke__">add_field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;section&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
                    .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">128</span>),
            )
            .<span class="hljs-title function_ invoke__">add_field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;page&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64),
            )
            .<span class="hljs-title function_ invoke__">add_field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;quality_score&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Float),
            )
            .<span class="hljs-title function_ invoke__">add_field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;has_code&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Bool),
            )
            .<span class="hljs-title function_ invoke__">add_field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;emb_list_vector&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
                    .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>),
            )
            .<span class="hljs-title function_ invoke__">add_field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;emb&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
                    .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>),
            ),
    );

client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
            .<span class="hljs-title function_ invoke__">schema</span>(schema)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

milvus::CollectionSchemaPtr collection_schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
collection_schema-&gt;<span class="hljs-built_in">SetEnableDynamicField</span>(<span class="hljs-literal">false</span>);

<span class="hljs-comment">// Collection-level fields.</span>
collection_schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;doc_id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>));
collection_schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;title&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">512</span>));
collection_schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;category&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">128</span>));
collection_schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;title_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>));

<span class="hljs-comment">// Struct schema used by each element in the StructArray field.</span>
milvus::StructFieldSchema struct_schema =
    milvus::<span class="hljs-built_in">StructFieldSchema</span>()
        .<span class="hljs-built_in">WithName</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
        .<span class="hljs-built_in">WithMaxCapacity</span>(<span class="hljs-number">1000</span>)
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">65535</span>))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;section&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">128</span>))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;page&quot;</span>, milvus::DataType::INT64))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;quality_score&quot;</span>, milvus::DataType::FLOAT))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;has_code&quot;</span>, milvus::DataType::BOOL))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;emb_list_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;emb&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>));
collection_schema-&gt;<span class="hljs-built_in">AddStructField</span>(std::<span class="hljs-built_in">move</span>(struct_schema));

status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                     .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                     .<span class="hljs-built_in">WithCollectionSchema</span>(collection_schema));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">fields</span>: [
    <span class="hljs-comment">// Collection-level fields.</span>
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">128</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span> },
    <span class="hljs-comment">// StructArray field.</span>
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chunks&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,
      <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Struct</span>,
      <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">fields</span>: [
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">65535</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">128</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;page&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;quality_score&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;has_code&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Bool</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;emb_list_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;emb&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span> },
      ],
    },
  ],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

CollectionSchema schema = <span class="hljs-keyword">new</span>()
{
    EnableDynamicFields = <span class="hljs-literal">false</span>,
    Fields =
    {
        <span class="hljs-comment">// Collection-level fields.</span>
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.Int64, isPrimaryKey: <span class="hljs-literal">true</span>),
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-number">512</span>),
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-number">128</span>),
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;title_vector&quot;</span>, DataType.FloatVector) { Dimension = <span class="hljs-number">4</span> }
    }
};

<span class="hljs-comment">// StructArray field.</span>
<span class="hljs-keyword">var</span> chunks = <span class="hljs-keyword">new</span> StructFieldSchema(<span class="hljs-string">&quot;chunks&quot;</span>)
{
    MaxCapacity = <span class="hljs-number">1000</span>
};
chunks.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-number">65535</span>));
chunks.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-number">128</span>));
chunks.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;page&quot;</span>, DataType.Int64));
chunks.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;quality_score&quot;</span>, DataType.Float));
chunks.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;has_code&quot;</span>, DataType.Bool));
chunks.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;emb_list_vector&quot;</span>, DataType.FloatVector) { Dimension = <span class="hljs-number">4</span> });
chunks.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;emb&quot;</span>, DataType.FloatVector) { Dimension = <span class="hljs-number">4</span> });
schema.StructFields.Add(chunks);

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    Schema = schema
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/create&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;schema&quot;: {
      &quot;autoID&quot;: false,
      &quot;enableDynamicField&quot;: false,
      &quot;fields&quot;: [
        {&quot;fieldName&quot;: &quot;doc_id&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;isPrimary&quot;: true},
        {&quot;fieldName&quot;: &quot;title&quot;, &quot;dataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: &quot;512&quot;}},
        {&quot;fieldName&quot;: &quot;category&quot;, &quot;dataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: &quot;128&quot;}},
        {&quot;fieldName&quot;: &quot;title_vector&quot;, &quot;dataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: &quot;4&quot;}}
      ],
      &quot;structFields&quot;: [
        {
          &quot;fieldName&quot;: &quot;chunks&quot;,
          &quot;typeParams&quot;: {&quot;max_capacity&quot;: &quot;1000&quot;},
          &quot;fields&quot;: [
            {&quot;fieldName&quot;: &quot;text&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: &quot;65535&quot;}},
            {&quot;fieldName&quot;: &quot;section&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: &quot;128&quot;}},
            {&quot;fieldName&quot;: &quot;page&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;Int64&quot;},
            {&quot;fieldName&quot;: &quot;quality_score&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;Float&quot;},
            {&quot;fieldName&quot;: &quot;has_code&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;Bool&quot;},
            {&quot;fieldName&quot;: &quot;emb_list_vector&quot;, &quot;dataType&quot;: &quot;ArrayOfVector&quot;, &quot;elementDataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: &quot;4&quot;}},
            {&quot;fieldName&quot;: &quot;emb&quot;, &quot;dataType&quot;: &quot;ArrayOfVector&quot;, &quot;elementDataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: &quot;4&quot;}}
          ]
        }
      ]
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Understand-StructArray-field-paths" class="common-anchor-header">Understand StructArray field paths<button data-href="#Understand-StructArray-field-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>After you create a StructArray field, refer to its subfields with the <code translate="no">structArray[subfield]</code> path syntax. Use this syntax when you create indexes, search vector subfields, output subfields, or build scalar filters.</p>
<table>
<thead>
<tr><th>Path</th><th>Meaning</th><th>Common usage</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[text]</code></td><td>The <code translate="no">text</code> subfield inside each Struct element.</td><td>Output field or scalar filtering.</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td>The section label for each chunk.</td><td>Scalar filtering.</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td>The chunk-level quality score.</td><td>Scalar filtering or scalar index.</td></tr>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td>The vector subfield used as an embedding list.</td><td>EmbeddingList search with <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td>The vector subfield used by each Struct element independently.</td><td>Element-level vector search.</td></tr>
</tbody>
</table>
<h2 id="Make-a-StructArray-field-nullable" class="common-anchor-header">Make a StructArray field nullable<button data-href="#Make-a-StructArray-field-nullable" class="anchor-icon" translate="no">
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
    </button></h2><p>A nullable StructArray field allows an entity to store NULL for the entire field, subject to the availability stated above. The following is a complete alternative to the previous collection-creation example. Run it only when <code translate="no">tech_articles</code> does not exist; it sets <code translate="no">nullable</code> on the StructArray parent before creating the collection.</p>
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

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">False</span>,
)

<span class="hljs-comment"># Collection-level fields.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Struct schema used by each element in the StructArray field.</span>
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)

<span class="hljs-comment"># Vector subfield for EmbeddingList search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Vector subfield for element-level search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Add the StructArray field.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    nullable=<span class="hljs-literal">True</span>,
    max_capacity=<span class="hljs-number">1000</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    schema=schema,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">false</span>);

<span class="hljs-comment">// Collection-level fields.</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;category&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">128</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">4</span>)
        .build());

<span class="hljs-comment">// Add the StructArray field.</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;chunks&quot;</span>)
        .dataType(DataType.Array)
        .elementType(DataType.Struct)
        .maxCapacity(<span class="hljs-number">1000</span>)
        .isNullable(Boolean.TRUE)
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">65535</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;section&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">128</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;page&quot;</span>)
                .dataType(DataType.Int64)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;quality_score&quot;</span>)
                .dataType(DataType.Float)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;has_code&quot;</span>)
                .dataType(DataType.Bool)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;emb_list_vector&quot;</span>)
                .dataType(DataType.FloatVector)
                .dimension(<span class="hljs-number">4</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;emb&quot;</span>)
                .dataType(DataType.FloatVector)
                .dimension(<span class="hljs-number">4</span>)
                .build())
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .collectionSchema(schema)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
    <span class="hljs-keyword">return</span>
}

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">false</span>)

<span class="hljs-comment">// Collection-level fields.</span>
schema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;doc_id&quot;</span>).
        WithDataType(entity.FieldTypeInt64).
        WithIsPrimaryKey(<span class="hljs-literal">true</span>))
schema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;title&quot;</span>).
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(<span class="hljs-number">512</span>))
schema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;category&quot;</span>).
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(<span class="hljs-number">128</span>))
schema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;title_vector&quot;</span>).
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(<span class="hljs-number">4</span>))

<span class="hljs-comment">// Struct schema used by each element in the StructArray field.</span>
chunkSchema := entity.NewStructSchema()
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;text&quot;</span>).
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(<span class="hljs-number">65535</span>))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;section&quot;</span>).
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(<span class="hljs-number">128</span>))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;page&quot;</span>).
        WithDataType(entity.FieldTypeInt64))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;quality_score&quot;</span>).
        WithDataType(entity.FieldTypeFloat))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;has_code&quot;</span>).
        WithDataType(entity.FieldTypeBool))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;emb_list_vector&quot;</span>).
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(<span class="hljs-number">4</span>))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;emb&quot;</span>).
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(<span class="hljs-number">4</span>))

<span class="hljs-comment">// Add the StructArray field.</span>
schema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;chunks&quot;</span>).
        WithDataType(entity.FieldTypeArray).
        WithElementType(entity.FieldTypeStruct).
        WithMaxCapacity(<span class="hljs-number">1000</span>).
        WithNullable(<span class="hljs-literal">true</span>).
        WithStructSchema(chunkSchema))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Collection-level fields.</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">enable_dynamic_field</span>(<span class="hljs-literal">false</span>)
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;doc_id&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64)
            .<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;title&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">512</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;category&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">128</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;title_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>),
    )
    <span class="hljs-comment">// Struct schema used by each element in the StructArray field.</span>
    .<span class="hljs-title function_ invoke__">add_struct_field</span>(
        StructFieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
            .<span class="hljs-title function_ invoke__">max_capacity</span>(<span class="hljs-number">1000</span>)
            .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
            .<span class="hljs-title function_ invoke__">add_field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
                    .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">65535</span>),
            )
            .<span class="hljs-title function_ invoke__">add_field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;section&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
                    .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">128</span>),
            )
            .<span class="hljs-title function_ invoke__">add_field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;page&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64),
            )
            .<span class="hljs-title function_ invoke__">add_field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;quality_score&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Float),
            )
            .<span class="hljs-title function_ invoke__">add_field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;has_code&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Bool),
            )
            .<span class="hljs-title function_ invoke__">add_field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;emb_list_vector&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
                    .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>),
            )
            .<span class="hljs-title function_ invoke__">add_field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;emb&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
                    .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>),
            ),
    );

client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
            .<span class="hljs-title function_ invoke__">schema</span>(schema)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

milvus::CollectionSchemaPtr collection_schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
collection_schema-&gt;<span class="hljs-built_in">SetEnableDynamicField</span>(<span class="hljs-literal">false</span>);

<span class="hljs-comment">// Collection-level fields.</span>
collection_schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;doc_id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>));
collection_schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;title&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">512</span>));
collection_schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;category&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">128</span>));
collection_schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;title_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>));

<span class="hljs-comment">// Struct schema used by each element in the StructArray field.</span>
milvus::StructFieldSchema struct_schema =
    milvus::<span class="hljs-built_in">StructFieldSchema</span>()
        .<span class="hljs-built_in">WithName</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
        .<span class="hljs-built_in">WithMaxCapacity</span>(<span class="hljs-number">1000</span>)
        .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">65535</span>))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;section&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">128</span>))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;page&quot;</span>, milvus::DataType::INT64))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;quality_score&quot;</span>, milvus::DataType::FLOAT))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;has_code&quot;</span>, milvus::DataType::BOOL))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;emb_list_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;emb&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>));
collection_schema-&gt;<span class="hljs-built_in">AddStructField</span>(std::<span class="hljs-built_in">move</span>(struct_schema));

status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                     .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                     .<span class="hljs-built_in">WithCollectionSchema</span>(collection_schema));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">fields</span>: [
    <span class="hljs-comment">// Collection-level fields.</span>
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">128</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span> },
    <span class="hljs-comment">// StructArray field.</span>
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chunks&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,
      <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Struct</span>,
      <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">fields</span>: [
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">65535</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">128</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;page&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;quality_score&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;has_code&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Bool</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;emb_list_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;emb&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span> },
      ],
    },
  ],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

CollectionSchema schema = <span class="hljs-keyword">new</span>()
{
    EnableDynamicFields = <span class="hljs-literal">false</span>,
    Fields =
    {
        <span class="hljs-comment">// Collection-level fields.</span>
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.Int64, isPrimaryKey: <span class="hljs-literal">true</span>),
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-number">512</span>),
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-number">128</span>),
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;title_vector&quot;</span>, DataType.FloatVector) { Dimension = <span class="hljs-number">4</span> }
    }
};

<span class="hljs-comment">// StructArray field.</span>
<span class="hljs-keyword">var</span> chunks = <span class="hljs-keyword">new</span> StructFieldSchema(<span class="hljs-string">&quot;chunks&quot;</span>)
{
    MaxCapacity = <span class="hljs-number">1000</span>,
    Nullable = <span class="hljs-literal">true</span>
};
chunks.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-number">65535</span>));
chunks.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-number">128</span>));
chunks.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;page&quot;</span>, DataType.Int64));
chunks.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;quality_score&quot;</span>, DataType.Float));
chunks.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;has_code&quot;</span>, DataType.Bool));
chunks.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;emb_list_vector&quot;</span>, DataType.FloatVector) { Dimension = <span class="hljs-number">4</span> });
chunks.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;emb&quot;</span>, DataType.FloatVector) { Dimension = <span class="hljs-number">4</span> });
schema.StructFields.Add(chunks);

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    Schema = schema
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/create&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;schema&quot;: {
      &quot;autoID&quot;: false,
      &quot;enableDynamicField&quot;: false,
      &quot;fields&quot;: [
        {&quot;fieldName&quot;: &quot;doc_id&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;isPrimary&quot;: true},
        {&quot;fieldName&quot;: &quot;title&quot;, &quot;dataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: &quot;512&quot;}},
        {&quot;fieldName&quot;: &quot;category&quot;, &quot;dataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: &quot;128&quot;}},
        {&quot;fieldName&quot;: &quot;title_vector&quot;, &quot;dataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: &quot;4&quot;}}
      ],
      &quot;structFields&quot;: [
        {
          &quot;fieldName&quot;: &quot;chunks&quot;,
          &quot;nullable&quot;: true,
          &quot;typeParams&quot;: {&quot;max_capacity&quot;: &quot;1000&quot;},
          &quot;fields&quot;: [
            {&quot;fieldName&quot;: &quot;text&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: &quot;65535&quot;}},
            {&quot;fieldName&quot;: &quot;section&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: &quot;128&quot;}},
            {&quot;fieldName&quot;: &quot;page&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;Int64&quot;},
            {&quot;fieldName&quot;: &quot;quality_score&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;Float&quot;},
            {&quot;fieldName&quot;: &quot;has_code&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;Bool&quot;},
            {&quot;fieldName&quot;: &quot;emb_list_vector&quot;, &quot;dataType&quot;: &quot;ArrayOfVector&quot;, &quot;elementDataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: &quot;4&quot;}},
            {&quot;fieldName&quot;: &quot;emb&quot;, &quot;dataType&quot;: &quot;ArrayOfVector&quot;, &quot;elementDataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: &quot;4&quot;}}
          ]
        }
      ]
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>NULL applies to the whole StructArray field. Do not configure individual Struct subfields as independently nullable. When supplying a valid StructArray value, do not mix null subfield arrays with valid subfield arrays. For details, see <a href="/docs/zh-hant/structarray-limits.md">StructArray Limits</a>.</p>
</div>
<h2 id="Add-a-StructArray-field-to-an-existing-collection" class="common-anchor-header">Add a StructArray field to an existing collection<button data-href="#Add-a-StructArray-field-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Subject to the availability stated above, you can add a StructArray field to an existing collection. The added StructArray field must be nullable, because entities that already exist in the collection do not have values for the new field.</p>
<p>For this alternative workflow, start with <code translate="no">tech_articles</code> containing the four collection-level fields from the first example but no <code translate="no">chunks</code> field. Reuse the initialized client for your selected language. Define the complete Struct schema, then add the field with its parent marked nullable. This schema operation is independent of the collection’s dynamic field setting (<code translate="no">enable_dynamic_field</code>); it does not enable arbitrary subfields inside a Struct.</p>
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
<pre><code translate="no" class="language-python">chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionStructFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

client.addCollectionStructField(AddCollectionStructFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;chunks&quot;</span>)
        .maxCapacity(<span class="hljs-number">1000</span>)
        .nullable(Boolean.TRUE)
        .addStructField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;text&quot;</span>).dataType(DataType.VarChar).maxLength(<span class="hljs-number">65535</span>).build())
        .addStructField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;section&quot;</span>).dataType(DataType.VarChar).maxLength(<span class="hljs-number">128</span>).build())
        .addStructField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;page&quot;</span>).dataType(DataType.Int64).build())
        .addStructField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;quality_score&quot;</span>).dataType(DataType.Float).build())
        .addStructField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;has_code&quot;</span>).dataType(DataType.Bool).build())
        .addStructField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;emb_list_vector&quot;</span>).dataType(DataType.FloatVector).dimension(<span class="hljs-number">4</span>).build())
        .addStructField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;emb&quot;</span>).dataType(DataType.FloatVector).dimension(<span class="hljs-number">4</span>).build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

chunkSchema := entity.NewStructSchema()
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;text&quot;</span>).
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(<span class="hljs-number">65535</span>))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;section&quot;</span>).
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(<span class="hljs-number">128</span>))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;page&quot;</span>).
        WithDataType(entity.FieldTypeInt64))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;quality_score&quot;</span>).
        WithDataType(entity.FieldTypeFloat))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;has_code&quot;</span>).
        WithDataType(entity.FieldTypeBool))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;emb_list_vector&quot;</span>).
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(<span class="hljs-number">4</span>))
chunkSchema.WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;emb&quot;</span>).
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(<span class="hljs-number">4</span>))

structField := entity.NewField().
        WithName(<span class="hljs-string">&quot;chunks&quot;</span>).
        WithDataType(entity.FieldTypeArray).
        WithElementType(entity.FieldTypeStruct).
        WithMaxCapacity(<span class="hljs-number">1000</span>).
        WithNullable(<span class="hljs-literal">true</span>).
        WithStructSchema(chunkSchema)

err = cli.AddCollectionStructField(ctx, milvusclient.NewAddCollectionStructFieldOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, structField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">chunk_schema</span> = StructFieldSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
    .<span class="hljs-title function_ invoke__">max_capacity</span>(<span class="hljs-number">1000</span>)
    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar).<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">65535</span>))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;section&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar).<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">128</span>))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;page&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;quality_score&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Float))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;has_code&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Bool))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;emb_list_vector&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector).<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;emb&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector).<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>));

client
    .<span class="hljs-title function_ invoke__">add_collection_struct_field</span>(
        AddCollectionStructFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
            .<span class="hljs-title function_ invoke__">struct_field</span>(chunk_schema)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

milvus::StructFieldSchema struct_schema =
    milvus::<span class="hljs-built_in">StructFieldSchema</span>()
        .<span class="hljs-built_in">WithName</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
        .<span class="hljs-built_in">WithMaxCapacity</span>(<span class="hljs-number">1000</span>)
        .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">65535</span>))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;section&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">128</span>))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;page&quot;</span>, milvus::DataType::INT64))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;quality_score&quot;</span>, milvus::DataType::FLOAT))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;has_code&quot;</span>, milvus::DataType::BOOL))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;emb_list_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>))
        .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;emb&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>));

status = client-&gt;<span class="hljs-built_in">AddCollectionStructField</span>(milvus::<span class="hljs-built_in">AddCollectionStructFieldRequest</span>()
                                                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                                   .<span class="hljs-built_in">WithStructField</span>(std::<span class="hljs-built_in">move</span>(struct_schema)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field</span>: {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chunks&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Struct</span>,
    <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">1000</span>,
    <span class="hljs-attr">fields</span>: [
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">65535</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">128</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;page&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;quality_score&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;has_code&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Bool</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;emb_list_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;emb&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span> },
    ],
  },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> addedChunkSchema = <span class="hljs-keyword">new</span> StructFieldSchema(<span class="hljs-string">&quot;chunks&quot;</span>)
{
    MaxCapacity = <span class="hljs-number">1000</span>,
    Nullable = <span class="hljs-literal">true</span>
};
addedChunkSchema.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-number">65535</span>));
addedChunkSchema.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-number">128</span>));
addedChunkSchema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;page&quot;</span>, DataType.Int64));
addedChunkSchema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;quality_score&quot;</span>, DataType.Float));
addedChunkSchema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;has_code&quot;</span>, DataType.Bool));
addedChunkSchema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;emb_list_vector&quot;</span>, DataType.FloatVector) { Dimension = <span class="hljs-number">4</span> });

addedChunkSchema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;emb&quot;</span>, DataType.FloatVector) { Dimension = <span class="hljs-number">4</span> });

<span class="hljs-keyword">await</span> client.AddCollectionStructFieldAsync(<span class="hljs-keyword">new</span> AddCollectionStructFieldReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    StructField = addedChunkSchema
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/struct_fields/add&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;schema&quot;: {
      &quot;fieldName&quot;: &quot;chunks&quot;,
      &quot;dataType&quot;: &quot;Array&quot;,
      &quot;elementDataType&quot;: &quot;Struct&quot;,
      &quot;nullable&quot;: true,
      &quot;typeParams&quot;: {&quot;max_capacity&quot;: &quot;1000&quot;},
      &quot;fields&quot;: [
        {&quot;fieldName&quot;: &quot;text&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: &quot;65535&quot;}},
        {&quot;fieldName&quot;: &quot;section&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: &quot;128&quot;}},
        {&quot;fieldName&quot;: &quot;page&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;Int64&quot;},
        {&quot;fieldName&quot;: &quot;quality_score&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;Float&quot;},
        {&quot;fieldName&quot;: &quot;has_code&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;Bool&quot;},
        {&quot;fieldName&quot;: &quot;emb_list_vector&quot;, &quot;dataType&quot;: &quot;ArrayOfVector&quot;, &quot;elementDataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: &quot;4&quot;}},
        {&quot;fieldName&quot;: &quot;emb&quot;, &quot;dataType&quot;: &quot;ArrayOfVector&quot;, &quot;elementDataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: &quot;4&quot;}}
      ]
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>After the StructArray field is added, existing entities return NULL for the new field until you populate it.</p>
<p>After a StructArray field is created, you cannot append subfields to that existing field. The following separate example replaces <code translate="no">chunks</code> with a schema that contains the original seven subfields and a new <code translate="no">source</code> string subfield.</p>
<p>Dropping a field removes its data; adding it again does not restore the old values. Preserve the data you need, follow the prerequisites in <a href="/docs/zh-hant/add-fields-to-an-existing-collection.md">Alter Collection Schema</a>, then repopulate and reindex the replacement field. This example retains the collection-level <code translate="no">title_vector</code> field so that dropping <code translate="no">chunks</code> does not remove every vector field from the collection.</p>
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
<pre><code translate="no" class="language-python">updated_chunk_schema = client.create_struct_field_schema()
updated_chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
updated_chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
updated_chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
updated_chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
updated_chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)
updated_chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)
updated_chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

updated_chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;source&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">256</span>,
)

client.drop_collection_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=updated_chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionStructFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionFieldReq;

client.dropCollectionField(DropCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;chunks&quot;</span>)
        .build());

client.addCollectionStructField(AddCollectionStructFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;chunks&quot;</span>)
        .maxCapacity(<span class="hljs-number">1000</span>)
        .nullable(Boolean.TRUE)
        .addStructField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;source&quot;</span>).dataType(DataType.VarChar).maxLength(<span class="hljs-number">256</span>).build())
        .addStructField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;text&quot;</span>).dataType(DataType.VarChar).maxLength(<span class="hljs-number">65535</span>).build())
        .addStructField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;section&quot;</span>).dataType(DataType.VarChar).maxLength(<span class="hljs-number">128</span>).build())
        .addStructField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;page&quot;</span>).dataType(DataType.Int64).build())
        .addStructField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;quality_score&quot;</span>).dataType(DataType.Float).build())
        .addStructField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;has_code&quot;</span>).dataType(DataType.Bool).build())
        .addStructField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;emb_list_vector&quot;</span>).dataType(DataType.FloatVector).dimension(<span class="hljs-number">4</span>).build())
        .addStructField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;emb&quot;</span>).dataType(DataType.FloatVector).dimension(<span class="hljs-number">4</span>).build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

updatedStructField := entity.NewField().
    WithName(<span class="hljs-string">&quot;chunks&quot;</span>).
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeStruct).
    WithMaxCapacity(<span class="hljs-number">1000</span>).
    WithNullable(<span class="hljs-literal">true</span>).
    WithStructSchema(entity.NewStructSchema().
        WithField(entity.NewField().WithName(<span class="hljs-string">&quot;source&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">256</span>)).
        WithField(entity.NewField().WithName(<span class="hljs-string">&quot;text&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">65535</span>)).
        WithField(entity.NewField().WithName(<span class="hljs-string">&quot;section&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">128</span>)).
        WithField(entity.NewField().WithName(<span class="hljs-string">&quot;page&quot;</span>).WithDataType(entity.FieldTypeInt64)).
        WithField(entity.NewField().WithName(<span class="hljs-string">&quot;quality_score&quot;</span>).WithDataType(entity.FieldTypeFloat)).
        WithField(entity.NewField().WithName(<span class="hljs-string">&quot;has_code&quot;</span>).WithDataType(entity.FieldTypeBool)).
        WithField(entity.NewField().WithName(<span class="hljs-string">&quot;emb_list_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">4</span>)).
        WithField(entity.NewField().WithName(<span class="hljs-string">&quot;emb&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">4</span>)))

err = cli.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
    <span class="hljs-keyword">return</span>
}

err = cli.AddCollectionStructField(ctx, milvusclient.NewAddCollectionStructFieldOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, updatedStructField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">updated_chunk_schema</span> = StructFieldSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
    .<span class="hljs-title function_ invoke__">max_capacity</span>(<span class="hljs-number">1000</span>)
    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;source&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar).<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">256</span>))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar).<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">65_535</span>))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;section&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar).<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">128</span>))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;page&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;quality_score&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Float))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;has_code&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Bool))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;emb_list_vector&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector).<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;emb&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector).<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>));

client
    .<span class="hljs-title function_ invoke__">drop_collection_field</span>(
        DropCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
            .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

client
    .<span class="hljs-title function_ invoke__">add_collection_struct_field</span>(
        AddCollectionStructFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
            .<span class="hljs-title function_ invoke__">struct_field</span>(updated_chunk_schema)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::StructFieldSchema <span class="hljs-title">updated_struct_schema</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks&quot;</span>)</span></span>;
updated_struct_schema.<span class="hljs-built_in">WithMaxCapacity</span>(<span class="hljs-number">1000</span>).<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>);
updated_struct_schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">65535</span>));
updated_struct_schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;section&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">128</span>));
updated_struct_schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;page&quot;</span>, milvus::DataType::INT64));
updated_struct_schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;quality_score&quot;</span>, milvus::DataType::FLOAT));
updated_struct_schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;has_code&quot;</span>, milvus::DataType::BOOL));
updated_struct_schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;emb_list_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>));
updated_struct_schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;emb&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>));

updated_struct_schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;source&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">256</span>));

status = client-&gt;<span class="hljs-built_in">DropCollectionField</span>(milvus::<span class="hljs-built_in">DropCollectionFieldRequest</span>()
                                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                         .<span class="hljs-built_in">WithFieldName</span>(<span class="hljs-string">&quot;chunks&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

status = client-&gt;<span class="hljs-built_in">AddCollectionStructField</span>(milvus::<span class="hljs-built_in">AddCollectionStructFieldRequest</span>()
                                              .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                              .<span class="hljs-built_in">WithStructField</span>(std::<span class="hljs-built_in">move</span>(updated_struct_schema)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionField</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field</span>: {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chunks&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Struct</span>,
    <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">1000</span>,
    <span class="hljs-attr">fields</span>: [
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;source&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">256</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">65535</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">128</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;page&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;quality_score&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;has_code&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Bool</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;emb_list_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;emb&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span> },
    ],
  },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> updatedChunkSchema = <span class="hljs-keyword">new</span> StructFieldSchema(<span class="hljs-string">&quot;chunks&quot;</span>)
{
    MaxCapacity = <span class="hljs-number">1000</span>,
    Nullable = <span class="hljs-literal">true</span>
};
updatedChunkSchema.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-number">65535</span>));
updatedChunkSchema.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;section&quot;</span>, <span class="hljs-number">128</span>));
updatedChunkSchema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;page&quot;</span>, DataType.Int64));
updatedChunkSchema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;quality_score&quot;</span>, DataType.Float));
updatedChunkSchema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;has_code&quot;</span>, DataType.Bool));
updatedChunkSchema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;emb_list_vector&quot;</span>, DataType.FloatVector) { Dimension = <span class="hljs-number">4</span> });
updatedChunkSchema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;emb&quot;</span>, DataType.FloatVector) { Dimension = <span class="hljs-number">4</span> });

updatedChunkSchema.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;source&quot;</span>, <span class="hljs-number">256</span>));

<span class="hljs-keyword">await</span> client.DropCollectionFieldAsync(<span class="hljs-keyword">new</span> DropCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    FieldName = <span class="hljs-string">&quot;chunks&quot;</span>
});

<span class="hljs-keyword">await</span> client.AddCollectionStructFieldAsync(<span class="hljs-keyword">new</span> AddCollectionStructFieldReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    StructField = updatedChunkSchema
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/fields/drop&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;fieldName&quot;: &quot;chunks&quot;
  }&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/struct_fields/add&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;schema&quot;: {
      &quot;fieldName&quot;: &quot;chunks&quot;,
      &quot;dataType&quot;: &quot;Array&quot;,
      &quot;elementDataType&quot;: &quot;Struct&quot;,
      &quot;nullable&quot;: true,
      &quot;typeParams&quot;: {&quot;max_capacity&quot;: &quot;1000&quot;},
      &quot;fields&quot;: [
        {&quot;fieldName&quot;: &quot;source&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: &quot;256&quot;}},
        {&quot;fieldName&quot;: &quot;text&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: &quot;65535&quot;}},
        {&quot;fieldName&quot;: &quot;section&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: &quot;128&quot;}},
        {&quot;fieldName&quot;: &quot;page&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;Int64&quot;},
        {&quot;fieldName&quot;: &quot;quality_score&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;Float&quot;},
        {&quot;fieldName&quot;: &quot;has_code&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;Bool&quot;},
        {&quot;fieldName&quot;: &quot;emb_list_vector&quot;, &quot;dataType&quot;: &quot;ArrayOfVector&quot;, &quot;elementDataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: &quot;4&quot;}},
        {&quot;fieldName&quot;: &quot;emb&quot;, &quot;dataType&quot;: &quot;ArrayOfVector&quot;, &quot;elementDataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: &quot;4&quot;}}
      ]
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Schema-rules" class="common-anchor-header">Schema rules<button data-href="#Schema-rules" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Rule</th><th>Explanation</th></tr>
</thead>
<tbody>
<tr><td>Struct is used as an Array element type.</td><td>Create a StructArray field as an Array field with <code translate="no">element_type=STRUCT</code>. Do not create Struct as a top-level collection field.</td></tr>
<tr><td>All elements share one schema.</td><td>Every Struct element in the same StructArray field follows the Struct schema defined for that field.</td></tr>
<tr><td><code translate="no">max_capacity</code> is required.</td><td>It limits how many Struct elements each entity can store in the StructArray field.</td></tr>
<tr><td>Only supported subfield types are allowed.</td><td>Use scalar and vector subfield types supported by StructArray. Do not define JSON, Geometry, Text, Timestamptz, SparseFloatVector, or nested Struct / Array subfields.</td></tr>
<tr><td>Vector subfields need indexes before search.</td><td>Create indexes on paths such as <code translate="no">chunks[emb_list_vector]</code> or <code translate="no">chunks[emb]</code> before running vector search.</td></tr>
<tr><td>One vector subfield has one index.</td><td>If you need both EmbeddingList search and element-level search, create two separate vector subfields.</td></tr>
<tr><td>Existing StructArray subfields are fixed.</td><td>After creating a StructArray field, do not expect to add more subfields to that same StructArray field.</td></tr>
<tr><td>Functions are not supported inside Struct.</td><td>Do not define functions for fields or subfields inside a StructArray field.</td></tr>
<tr><td>Scalar subfields should match filter needs.</td><td>Add fields such as <code translate="no">section</code>, <code translate="no">quality_score</code>, or <code translate="no">has_code</code> only when you need to filter, group, or output them later.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">Common mistakes<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Creating <code translate="no">DataType.STRUCT</code> as a top-level collection field instead of using it as the element type of an Array field.</p></li>
<li><p>Forgetting to set <code translate="no">max_capacity</code> on the StructArray field.</p></li>
<li><p>Defining unsupported subfield types, such as JSON, Geometry, Text, Timestamptz, SparseFloatVector, nested Array, nested Struct, or Array-of-Struct.</p></li>
<li><p>Using <code translate="no">String</code> as a subfield type. Use <code translate="no">VARCHAR</code> and set <code translate="no">max_length</code>.</p></li>
<li><p>Using one vector subfield for both EmbeddingList search and element-level search.</p></li>
<li><p>Adding only vector subfields and forgetting scalar subfields needed for filtering, such as <code translate="no">section</code>, <code translate="no">quality_score</code>, or <code translate="no">has_code</code>.</p></li>
<li><p>Treating vector subfields as <code translate="no">$[...]</code> scalar predicate inputs. Use vector subfields for vector search, and scalar subfields for scalar predicates.</p></li>
<li><p>Assuming new subfields can be added to an existing StructArray field after the field is created.</p></li>
<li><p>Using <code translate="no">chunks.emb</code> or <code translate="no">chunks.emb_list_vector</code> instead of the required path syntax <code translate="no">chunks[emb]</code> or <code translate="no">chunks[emb_list_vector]</code>.</p></li>
<li><p>Treating nullable StructArray behavior as available in every target version.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Next steps<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>To insert nested data into the StructArray field, read <a href="/docs/zh-hant/insert-data-into-structarray-fields.md">Insert Data into StructArray Fields</a>.</p></li>
<li><p>To create vector and scalar indexes, read <a href="/docs/zh-hant/index-structarray-fields.md">Index StructArray Fields</a>.</p></li>
<li><p>To search StructArray vector subfields, read <a href="/docs/zh-hant/basic-vector-search-with-structarray.md">Basic Vector Search with StructArray</a>.</p></li>
<li><p>To review supported data types, nullable behavior, and version-specific limitations, read <a href="/docs/zh-hant/structarray-limits.md">StructArray Limits</a>.</p></li>
</ol>
