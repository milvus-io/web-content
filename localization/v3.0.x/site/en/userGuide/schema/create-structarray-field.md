---
id: create-structarray-field.md
title: Create a StructArray Field
summary: >-
  Create a StructArray field when one entity needs to contain an ordered list of
  structured elements. A StructArray field is an Array field whose element type
  is Struct. Each Struct element follows the same schema and can contain scalar
  subfields, vector subfields, or both.
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
    </button></h2><p>This page uses a collection named <code translate="no">tech_articles</code>. Each entity represents one technical article, and the <code translate="no">chunks</code> field stores chunk-level data as Struct elements.</p>
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
<tr><td><code translate="no">Array</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.BOOL</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code>, or <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.FLOAT</code> or <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.VARCHAR</code> and set <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.FLOAT_VECTOR</code> and set <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.FLOAT16_VECTOR</code> and set <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.BFLOAT16_VECTOR</code> and set <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.INT8_VECTOR</code> and set <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.BINARY_VECTOR</code> and set <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Not supported</td><td>Sparse vector subfields are not supported in StructArray fields.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Not supported</td><td>Use <code translate="no">VARCHAR</code>, not <code translate="no">String</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Not supported</td><td>JSON subfields are not supported in StructArray fields.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Not supported</td><td>Geometry subfields and GIS functions are not supported in StructArray fields.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Not supported</td><td>Text subfields are not supported in StructArray fields.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Not supported</td><td>Timestamptz subfields and time-specific expressions are not supported in StructArray fields.</td></tr>
<tr><td>Nested <code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code>, or <code translate="no">ArrayOfStruct</code></td><td>Not supported</td><td>A StructArray field cannot contain nested arrays, nested vector arrays, nested Struct fields, or nested Array-of-Struct fields.</td></tr>
</tbody>
</table>
<p>For version-specific support, nullable behavior, and other limits, see <a href="/docs/structarray-limits.md">StructArray Limits</a>.</p>
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
    </button></h2><p>Milvus v3.0.x supports nullable StructArray fields. A nullable StructArray field allows an entity to store <code translate="no">null</code> for the entire StructArray field.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Warning
Nullable StructArray fields are available only in Milvus v3.0.x. For a nullable StructArray field, an entity can provide a valid StructArray value or set the whole field to <code translate="no">null</code>. When inserting a valid StructArray value, all subfields should either be null or have valid values. Inserting an entity with some subfields set to null and others set to valid values results in an error. For details, see <a href="/docs/structarray-limits.md">StructArray Limits</a>.</p>
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
    </button></h2><p>Milvus v3.0.x supports adding a StructArray field to an existing collection. The added StructArray field must be nullable, because entities that already exist in the collection do not have values for the new field.</p>
<p>To add a StructArray field to an existing collection, define the Struct schema first. Then call <code translate="no">add_collection_struct_field()</code> and set <code translate="no">nullable=True</code>.</p>
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
<p>After the StructArray field is added, existing entities return <code translate="no">null</code> for the new field across all its subfields.</p>
<p>After a StructArray field is created, you cannot add new subfields to that existing StructArray field. If you need additional element attributes later, call <code translate="no">drop_collection_field()</code> to drop the StructArray field, and then add a new StructArray field with the updated Struct schema.</p>
<pre><code translate="no" class="language-python">client.drop_collection_field(
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
<li><p>To insert nested data into the StructArray field, read <a href="/docs/insert-data-into-structarray-fields.md">Insert Data into StructArray Fields</a>.</p></li>
<li><p>To create vector and scalar indexes, read <a href="/docs/index-structarray-fields.md">Index StructArray Fields</a>.</p></li>
<li><p>To search StructArray vector subfields, read Basic Vector Search with StructArray.</p></li>
<li><p>To review supported data types, nullable behavior, and version-specific limitations, read <a href="/docs/structarray-limits.md">StructArray Limits</a>.</p></li>
</ol>
