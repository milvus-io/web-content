---
id: schema.md
summary: Learn how to define a schema in Milvus.
title: Manage Schema
---
<h1 id="Manage-Schema" class="common-anchor-header">Manage Schema<button data-href="#Manage-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic introduces schema in Milvus. Schema is used to define the properties of a collection and the fields within.</p>
<h2 id="Field-schema" class="common-anchor-header">Field schema<button data-href="#Field-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>A field schema is the logical definition of a field. It is the first thing you need to define before defining a <a href="#Collection-schema">collection schema</a> and <a href="/docs/v2.4.x/manage-collections.md">managing collections</a>.</p>
<p>Milvus supports only one primary key field in a collection.</p>
<h3 id="Field-schema-properties" class="common-anchor-header">Field schema properties</h3><table class="properties">
    <thead>
    <tr>
        <th>Properties</th>
        <th>Description</th>
        <th>Note</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">name</code></td>
        <td>Name of the field in the collection to create</td>
        <td>Data type: String.<br/>Mandatory</td>
    </tr>
    <tr>
        <td><code translate="no">dtype</code></td>
        <td>Data type of the field</td>
        <td>Mandatory</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Description of the field</td>
        <td>Data type: String.<br/>Optional</td>
    </tr>
    <tr>
        <td><code translate="no">is_primary</code></td>
        <td>Whether to set the field as the primary key field or not</td>
        <td>Data type: Boolean (<code translate="no">true</code> or <code translate="no">false</code>).<br/>Mandatory for the primary key field</td>
    </tr>
        <tr>
            <td><code translate="no">auto_id</code> (Mandatory for primary key field)</td>
            <td>Switch to enable or disable automatic ID (primary key) allocation.</td>
            <td><code translate="no">True</code> or <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code> (Mandatory for VARCHAR field)</td>
            <td>Maximum byte length for strings allowed to be inserted. Note that multibyte characters (e.g., Unicode characters) may occupy more than one byte each, so ensure the byte length of inserted strings does not exceed the specified limit.</td>
            <td>[1, 65,535]</td>
        </tr>
    <tr>
        <td><code translate="no">dim</code></td>
        <td>Dimension of the vector</td>
            <td>Data type: Integer &isin;[1, 32768].<br/>Mandatory for a dense vector field. Omit for a <a href="https://milvus.io/docs/sparse_vector.md">sparse vector</a> field.</td>
    </tr>
    <tr>
        <td><code translate="no">is_partition_key</code></td>
        <td>Whether this field is a partition-key field.</td>
        <td>Data type: Boolean (<code translate="no">true</code> or <code translate="no">false</code>).</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-field-schema" class="common-anchor-header">Create a field schema</h3><p>To reduce the complexity in data inserts, Milvus allows you to specify a default value for each scalar field during field schema creation, excluding the primary key field. This indicates that if you leave a field empty when inserting data, the default value you specified for this field applies.</p>
<p>Create a regular field schema:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># The following creates a field and use it as the partition key</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Create a field schema with default field values:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema

fields = [
  FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
  <span class="hljs-comment"># configure default value `25` for field `age`</span>
  FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, default_value=<span class="hljs-number">25</span>, description=<span class="hljs-string">&quot;age&quot;</span>),
  embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)
]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Supported-data-types" class="common-anchor-header">Supported data types</h3><p><code translate="no">DataType</code> defines the kind of data a field contains. Different fields support different data types.</p>
<ul>
<li><p>Primary key field supports:</p>
<ul>
<li>INT64: numpy.int64</li>
<li>VARCHAR: VARCHAR</li>
</ul></li>
<li><p>Scalar field supports:</p>
<ul>
<li>BOOL: Boolean (<code translate="no">true</code> or <code translate="no">false</code>)</li>
<li>INT8: numpy.int8</li>
<li>INT16: numpy.int16</li>
<li>INT32: numpy.int32</li>
<li>INT64: numpy.int64</li>
<li>FLOAT: numpy.float32</li>
<li>DOUBLE: numpy.double</li>
<li>VARCHAR: VARCHAR</li>
<li>JSON: <a href="/docs/v2.4.x/use-json-fields.md">JSON</a></li>
<li>Array: <a href="/docs/v2.4.x/array_data_type.md">Array</a></li>
</ul>
<p>JSON as a composite data type is available. A JSON field comprises key-value pairs. Each key is a string, and a value can be a number, string, boolean value, array, or list. For details, refer to <a href="/docs/v2.4.x/use-json-fields.md">JSON: a new data type</a>.</p></li>
<li><p>Vector field supports:</p>
<ul>
<li>BINARY_VECTOR: Stores binary data as a sequence of 0s and 1s, used for compact feature representation in image processing and information retrieval.</li>
<li>FLOAT_VECTOR: Stores 32-bit floating-point numbers, commonly used in scientific computing and machine learning for representing real numbers.</li>
<li>FLOAT16_VECTOR: Stores 16-bit half-precision floating-point numbers, used in deep learning and GPU computations for memory and bandwidth efficiency.</li>
<li>BFLOAT16_VECTOR: Stores 16-bit floating-point numbers with reduced precision but the same exponent range as Float32, popular in deep learning for reducing memory and computational requirements without significantly impacting accuracy.</li>
<li>SPARSE_FLOAT_VECTOR: Stores a list of non-zero elements and their corresponding indices, used for representing sparse vectors. For more information, refer to <a href="/docs/v2.4.x/sparse_vector.md">Sparse Vectors</a>.</li>
</ul>
<p>Milvus supports multiple vector fields in a collection. For more information, refer to <a href="/docs/v2.4.x/multi-vector-search.md">Hybrid Search</a>.</p></li>
</ul>
<h2 id="Collection-schema" class="common-anchor-header">Collection schema<button data-href="#Collection-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>A collection schema is the logical definition of a collection. Usually you need to define the <a href="#Field-schema">field schema</a> before defining a collection schema and <a href="/docs/v2.4.x/manage-collections.md">managing collections</a>.</p>
<h3 id="Collection-schema-properties" class="common-anchor-header">Collection schema properties</h3><table class="properties">
    <thead>
    <tr>
        <th>Properties</th>
        <th>Description</th>
        <th>Note</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">field</code></td>
        <td>Fields in the collection to create</td>
        <td>Mandatory</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Description of the collection</td>
        <td>Data type: String.<br/>Optional</td>
    </tr>
    <tr>
        <td><code translate="no">partition_key_field</code></td>
        <td>Name of a field that is designed to act as the partition key.</td>
        <td>Data type: String.<br/>Optional</td>
    </tr>
    <tr>
        <td><code translate="no">enable_dynamic_field</code></td>
        <td>Whether to enable dynamic schema or not</td>
        <td>Data type: Boolean (<code translate="no">true</code> or <code translate="no">false</code>).<br/>Optional, defaults to <code translate="no">False</code>.<br/>For details on dynamic schema, refer to <a herf="enable-dynamic-field.md">Dynamic Schema</a> and the user guides for managing collections.</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-collection-schema" class="common-anchor-header">Create a collection schema</h3><div class="alert note">
  Define the field schemas before defining a collection schema.
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># Enable partition key on a field if you need to implement multi-tenancy based on the partition-key field</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Set enable_dynamic_field to True if you need to use dynamic fields. </span>
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;desc of a collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Create a collection with the schema specified:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection,connections
conn = connections.connect(host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, port=<span class="hljs-number">19530</span>)
collection_name1 = <span class="hljs-string">&quot;tutorial_1&quot;</span>
collection1 = Collection(name=collection_name1, schema=schema, using=<span class="hljs-string">&#x27;default&#x27;</span>, shards_num=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>You can define the shard number with <code translate="no">shards_num</code>.</li>
<li>You can define the Milvus server on which you wish to create a collection by specifying the alias in <code translate="no">using</code>.</li>
<li>You can enable the partition key feature on a field by setting <code translate="no">is_partition_key</code> to <code translate="no">True</code> on the field if you need to implement <a href="/docs/v2.4.x/multi_tenancy.md">partition-key-based multi-tenancy</a>.</li>
<li>You can enable dynamic schema by setting <code translate="no">enable_dynamic_field</code> to <code translate="no">True</code> in the collection schema if you need to <a href="/docs/v2.4.x/enable-dynamic-field.md">enable dynamic field</a>.</li>
</ul>
</div>
<p><br/>
You can also create a collection with <code translate="no">Collection.construct_from_dataframe</code>, which automatically generates a collection schema from DataFrame and creates a collection.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
df = pd.DataFrame({
    <span class="hljs-string">&quot;id&quot;</span>: [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;age&quot;</span>: [random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">40</span>) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;embedding&quot;</span>: [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;position&quot;</span>: <span class="hljs-string">&quot;test_pos&quot;</span>
})

collection, ins_res = Collection.construct_from_dataframe(
    <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    df,
    primary_field=<span class="hljs-string">&#x27;id&#x27;</span>,
    auto_id=<span class="hljs-literal">False</span>
    )
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Learn how to prepare schema when <a href="/docs/v2.4.x/manage-collections.md">managing collections</a>.</li>
<li>Read more about <a href="/docs/v2.4.x/enable-dynamic-field.md">dynamic schema</a>.</li>
<li>Read more about partition-key in <a href="/docs/v2.4.x/multi_tenancy.md">Multi-tenancy</a>.</li>
</ul>
