---
id: create_collection.md
related_key: create collection
summary: Learn how to create a collection in Milvus.
title: Create a Collection
---
<h1 id="Create-a-Collection" class="common-anchor-header">Create a Collection<button data-href="#Create-a-Collection" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to create a collection in Milvus.</p>
<p>A collection consists of one or more partitions. While creating a new collection, Milvus creates a default partition <code translate="no">_default</code>. See <a href="/docs/v2.3.x/glossary.md#Collection">Glossary - Collection</a> for more information.</p>
<p>The following example builds a two-<a href="/docs/v2.3.x/glossary.md#Sharding">shard</a> collection named <code translate="no">book</code>, with a primary key field named <code translate="no">book_id</code>, an <code translate="no">INT64</code> scalar field named <code translate="no">word_count</code>, and a two-dimensional floating-point vector field named <code translate="no">book_intro</code>. Real applications will likely use much higher dimensional vectors than the example.</p>
<div class="alert note">
<p>When interacting with Milvus using Python code, you have the flexibility to choose between PyMilvus and MilvusClient (new). For more information, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.3.x/About.md">Python SDK</a>.</p>
</div>
<h2 id="Prepare-Schema" class="common-anchor-header">Prepare Schema<button data-href="#Prepare-Schema" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
The collection to create must contain a primary key field and a vector field. INT64 and VarChar are supported data type on primary key field.
</div>
<p>First, prepare necessary parameters, including the field schema, collection schema, and collection name.</p>
<p>Before defining a collection schema, create a schema for each field in the collection. To reduce the complexity in data inserts, Milvus allows you to specify a default value for each scalar field, excluding a primary key field. This indicates that if you leave a field empty when inserting data, the default value you configured for this field during field schema creation will be used.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> CollectionSchema, FieldSchema, DataType
book_id = FieldSchema(
  name=<span class="hljs-string">&quot;book_id&quot;</span>,
  dtype=DataType.INT64,
  is_primary=<span class="hljs-literal">True</span>,
)
book_name = FieldSchema(
  name=<span class="hljs-string">&quot;book_name&quot;</span>,
  dtype=DataType.VARCHAR,
  max_length=<span class="hljs-number">200</span>,
  <span class="hljs-comment"># The default value will be used if this field is left empty during data inserts or upserts.</span>
  <span class="hljs-comment"># The data type of `default_value` must be the same as that specified in `dtype`.</span>
  default_value=<span class="hljs-string">&quot;Unknown&quot;</span>
)
word_count = FieldSchema(
  name=<span class="hljs-string">&quot;word_count&quot;</span>,
  dtype=DataType.INT64,
  <span class="hljs-comment"># The default value will be used if this field is left empty during data inserts or upserts.</span>
  <span class="hljs-comment"># The data type of `default_value` must be the same as that specified in `dtype`.</span>
  default_value=<span class="hljs-number">9999</span>
)
book_intro = FieldSchema(
  name=<span class="hljs-string">&quot;book_intro&quot;</span>,
  dtype=DataType.FLOAT_VECTOR,
  dim=<span class="hljs-number">2</span>
)
schema = CollectionSchema(
  fields=[book_id, book_name, word_count, book_intro],
  description=<span class="hljs-string">&quot;Test book search&quot;</span>,
  enable_dynamic_field=<span class="hljs-literal">True</span>
)
collection_name = <span class="hljs-string">&quot;book&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;
<span class="hljs-keyword">const</span> params = {
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
  <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;Test book search&quot;</span>,
  <span class="hljs-attr">fields</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;book_intro&quot;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
      <span class="hljs-attr">dim</span>: <span class="hljs-number">2</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;book_id&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;&quot;</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;book_name&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">256</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;&quot;</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;word_count&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;&quot;</span>,
    },
  ],
  <span class="hljs-attr">enableDynamicField</span>: <span class="hljs-literal">true</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">var</span> (
    collectionName = <span class="hljs-string">&quot;book&quot;</span>
)
schema := &amp;entity.Schema{
  CollectionName: collectionName,
  Description:    <span class="hljs-string">&quot;Test book search&quot;</span>,
  Fields: []*entity.Field{
    {
      Name:       <span class="hljs-string">&quot;book_id&quot;</span>,
      DataType:   entity.FieldTypeInt64,
      PrimaryKey: <span class="hljs-literal">true</span>,
      AutoID:     <span class="hljs-literal">false</span>,
    },
    {
      Name:       <span class="hljs-string">&quot;word_count&quot;</span>,
      DataType:   entity.FieldTypeInt64,
      PrimaryKey: <span class="hljs-literal">false</span>,
      AutoID:     <span class="hljs-literal">false</span>,
    },
    {
      Name:     <span class="hljs-string">&quot;book_intro&quot;</span>,
      DataType: entity.FieldTypeFloatVector,
      TypeParams: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{
          <span class="hljs-string">&quot;dim&quot;</span>: <span class="hljs-string">&quot;2&quot;</span>,
      },
    },
  },
  EnableDynamicField: <span class="hljs-literal">true</span>,
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">FieldType</span> <span class="hljs-variable">fieldType1</span> <span class="hljs-operator">=</span> FieldType.newBuilder()
        .withName(<span class="hljs-string">&quot;book_id&quot;</span>)
        .withDataType(DataType.Int64)
        .withPrimaryKey(<span class="hljs-literal">true</span>)
        .withAutoID(<span class="hljs-literal">false</span>)
        .build();
<span class="hljs-type">FieldType</span> <span class="hljs-variable">fieldType2</span> <span class="hljs-operator">=</span> FieldType.newBuilder()
        .withName(<span class="hljs-string">&quot;word_count&quot;</span>)
        .withDataType(DataType.Int64)
        .build();
<span class="hljs-type">FieldType</span> <span class="hljs-variable">fieldType3</span> <span class="hljs-operator">=</span> FieldType.newBuilder()
        .withName(<span class="hljs-string">&quot;book_intro&quot;</span>)
        .withDataType(DataType.FloatVector)
        .withDimension(<span class="hljs-number">2</span>)
        .build();
<span class="hljs-type">CreateCollectionParam</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionParam.newBuilder()
        .withCollectionName(<span class="hljs-string">&quot;book&quot;</span>)
        .withDescription(<span class="hljs-string">&quot;Test book search&quot;</span>)
        .withShardsNum(<span class="hljs-number">2</span>)
        .addFieldType(fieldType1)
        .addFieldType(fieldType2)
        .addFieldType(fieldType3)
        .withEnableDynamicField(<span class="hljs-literal">true</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<div style="display: none">
<pre><code translate="no" class="language-shell">create collection -c book -f book_id:INT64:book_id -f word_count:INT64:word_count -f book_intro:FLOAT_VECTOR:2 -p book_id
<button class="copy-code-btn"></button></code></pre>
</div>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/collections/create&#x27;</span> \
  -H <span class="hljs-string">&#x27;Authorization: Bearer ${TOKEN}&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
       &quot;dbName&quot;: &quot;default&quot;,   
       &quot;collectionName&quot;: &quot;medium_articles&quot;,
       &quot;dimension&quot;: 256,
       &quot;metricType&quot;: &quot;L2&quot;,
       &quot;primaryField&quot;: &quot;id&quot;,
       &quot;vectorField&quot;: &quot;vector&quot;
      }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-curl">
Output:
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
</div>
<table class="language-python">
    <thead>
        <tr>
            <th>Schema Type</th>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr><td rowspan="10"><code translate="no">FieldSchema</code></td>
            <td><code translate="no">name</code></td>
            <td>Name of the field to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">dtype</code></td>
            <td>Data type of the field to create.</td>
            <td>For primary key field:
                <ul>
                    <li><code translate="no">DataType.INT64</code> (numpy.int64)</li>
                    <li><code translate="no">DataType.VARCHAR</code> (VARCHAR)</li>
                </ul>
                For scalar field:
                <ul>
                    <li><code translate="no">DataType.BOOL</code> (Boolean)</li>
                    <li><code translate="no">DataType.INT8</code> (numpy.int8)</li>
                    <li><code translate="no">DataType.INT16</code> (numpy.int16)</li>
                    <li><code translate="no">DataType.INT32</code> (numpy.int32)</li>
                    <li><code translate="no">DataType.INT64</code> (numpy.int64)</li>
                    <li><code translate="no">DataType.FLOAT</code> (numpy.float32)</li>
                    <li><code translate="no">DataType.DOUBLE</code> (numpy.double)</li>
                    <li><code translate="no">DataType.VARCHAR</code> (VARCHAR)</li>
                    <li><code translate="no">DataType.JSON</code> (JSON) </li>
                    <li><code translate="no">DataType.ARRAY</code></li>
                </ul>
                For vector field:
                <ul>
                    <li><code translate="no">BINARY_VECTOR</code> (Binary vector)</li>
                    <li><code translate="no">FLOAT_VECTOR</code> (Float vector)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code translate="no">element_type</code> (Mandatory for ARRAY field)</td>
            <td>Data type of array elements to create. The data type of all elements in an array field must be the same.</td>
            <td>Valid values:
                <ul>
                    <li><code translate="no">DataType.Int8</code></li>
                    <li><code translate="no">DataType.Int16</code></li>
                    <li><code translate="no">DataType.Int32</code></li>
                    <li><code translate="no">DataType.Int64</code></li>
                    <li><code translate="no">DataType.VARCHAR</code></li>
                    <li><code translate="no">DataType.BOOL</code></li>
                    <li><code translate="no">DataType.FLOAT</code></li>
                    <li><code translate="no">DataType.DOUBLE</code></li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code translate="no">is_primary</code></td>
            <td>Switch to control if the field is the primary key field. This parameter is mandatory for the primary key field.</td>
            <td><code translate="no">True</code> or <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">auto_id</code></td>
            <td>Switch to enable or disable automatic ID (primary key) allocation. This parameter is mandatory for the primary key field and defaults to <code translate="no">False</code></td>
            <td><code translate="no">True</code> or <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code> (Mandatory for VARCHAR field)</td>
            <td>Maximum length of strings allowed to be inserted.</td>
            <td>[1, 65,535]</td>
        </tr>
        <tr>
            <td><code translate="no">max_capacity</code> (Mandatory for ARRAY field)</td>
            <td>Maximum number of elements allowed for an array field.</td>
            <td>[1, 4,096]</td>
        </tr>
        <tr>
            <td><code translate="no">default_value</code></td>
            <td>Default value of the field. This parameter is available only for non-array and non-JSON scalar fields. You cannot specify a default value for a primary key field. Refer to <a href="#parameter-default_value">Parameter default_value</a> for more information.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">dim</code> (Mandatory for vector field)</td>
            <td>Dimension of the vector.</td>
            <td>[1, 32,768]</td>
        </tr>
        <tr>
            <td><code translate="no">description</code> (Optional)</td>
            <td>Description of the field.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td rowspan="4"><code translate="no">CollectionSchema</code></td>
            <td><code translate="no">fields</code></td>
            <td>Fields of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">description</code> (Optional)</td>
            <td>Description of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">enable_dynamic_field</code></td>
            <td>Whether to enable dynamic schema or not</td>
            <td>Data type: Boolean (<code translate="no">true</code> or <code translate="no">false</code>).<br/>Optional, defaults to <code translate="no">False</code>.<br/>For details on dynamic schema, refer to <a herf="dynamic_schema.md">Dynamic Schema</a> and the user guides for managing collections.</td>
            </tr>
        <tr>
            <td><code translate="no">collection_name</code></td>
            <td>Name of the collection to create.</td>
            <td>N/A</td>
        </tr>
    </tbody>
</table>
<table class="language-go">
    <thead>
        <tr>
            <th>Type</th>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="5"><code translate="no">entity.Schema</code></td>
            <td><code translate="no">CollectionName</code></td>
            <td>Name of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">Description</code></td>
            <td>Description of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">AutoID</code></td>
            <td>Switch to enable or disable Automatic ID (primary key) allocation.</td>
            <td><code translate="no">True</code> or <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">Fields</code></td>
            <td>Schema of the fields within the collection to create. Refer to <a href="/docs/v2.3.x/schema.md">Schema</a> for more information.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">EnableDynamicField</code></td>
            <td>Whether to enable dynamic schema or not. For details on dynamic schema, refer to <a herf="dynamic_schema.md">Dynamic Schema</a> and the user guides for managing collections.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td rowspan="9"><code translate="no">entity.Field</code></td>
            <td><code translate="no">Name</code></td>
            <td>Name of the field to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">PrimaryKey</code></td>
            <td>Whether this field is the primary key. This is mandatory for the primary key.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">AutoID</code></td>
            <td>Whether this field value automatically increments. This is mandatory for the primary key.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">Description</code></td>
            <td>Description of the field.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">DataType</code></td>
            <td>Data type of the field to create.</td>
            <td>For primary key field:
                <ul>
                    <li><code translate="no">entity.FieldTypeInt64 (numpy.int64)</code></li>
                    <li><code translate="no">entity.FieldTypeVarChar (VARCHAR)</code></li>
                </ul>
                For scalar field:
                <ul>
                    <li><code translate="no">entity.FieldTypeBool (Boolean)</code></li>
                    <li><code translate="no">entity.FieldTypeInt8 (numpy.int8)</code></li>
                    <li><code translate="no">entity.FieldTypeInt16 (numpy.int16)</code></li>
                    <li><code translate="no">entity.FieldTypeInt32 (numpy.int32)</code></li>
                    <li><code translate="no">entity.FieldTypeInt64 (numpy.int64)</code></li>
                    <li><code translate="no">entity.FieldTypeFloat (numpy.float32)</code></li>
                    <li><code translate="no">entity.FieldTypeDouble (numpy.double)</code></li>
                    <li><code translate="no">entity.FieldTypeVarChar (VARCHAR)</code></li>
                </ul>
                For vector field:
                <ul>
                    <li><code translate="no">entity.FieldTypeBinaryVector</code> (Binary vector)</li>
                    <li><code translate="no">entity.FieldTypeFloatVector</code> (Float vector)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code translate="no">TypeParams</code></td>
            <td>A string mapping to set parameters for a specific data type.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">IndexParams</code></td>
            <td>A string mapping to set parameters for the index of the collection.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">IsDynamic</code></td>
            <td>Whether dynamic schema is enabled on this field.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">IsPartitionKey</code></td>
            <td>Whether this field acts as the partition key.</td>
            <td>N/A</td>
        </tr>
    </tbody>
</table>
<table class="language-javascript">
    <thead>
        <tr>
            <th>Interface</th>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="8"><code translate="no">CreateCollectionReq</code></td>
            <td><code translate="no">collection_name</code></td>
            <td>Name of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">shards_num</code></td>
            <td>Number of shards to create along with the collection.</td>
            <td>[1, 16]</td>
        </tr>
        <tr>
            <td><code translate="no">description</code></td>
            <td>Description of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">consistency_level</code></td>
            <td>Consistency level of the collection. For details, refer to [Consistency Level](consistency.md)</td>
            <td>Possible values are as follows:<ul>
                <li><code translate="no">Strong</code></li>
                <li><code translate="no">Session</code></li>
                <li><code translate="no">Bounded</code></li>
                <li><code translate="no">Eventually</code></li>
                <li><code translate="no">Customized</code></li>
            </td>
        </tr>
        <tr>
            <td><code translate="no">fields</code></td>
            <td>Schema of the field and the collection to create.</td>
            <td>Refer to <a href="/docs/v2.3.x/schema.md">Schema</a> for more information.</td>
        </tr>
        <tr>
            <td><code translate="no">num_partitions</code></td>
            <td>Number of parititions to create along within the collection.</td>
            <td>[1, 4096]</td>
        </tr>
        <tr>
            <td><code translate="no">partition_key_field</code></td>
            <td>Name of the field that is designed to act as the partiion key. For details, refer to [Use Partition Key](partition_key.md)</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">enable_dynamic_field</code> | <code translate="no">enableDynamicField</code></td>
            <td>Whether to enable dynamic schema for this collection.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td rowspan="10"><code translate="no">FieldType</code></td>
            <td><code translate="no">name</code></td>
            <td>Name of the field.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">description</code></td>
            <td>Description of the field.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">data_type</code> | <code translate="no">DataType</code></td>
            <td>Data type of the filed to create.</td>
            <td>Refer to <a href="https://github.com/milvus-io/milvus-sdk-node/blob/main/milvus/const/Milvus.ts#L287">data type reference number</a> for more information.</td>
        </tr>
        <tr>
            <td><code translate="no">is_primary_key</code></td>
            <td>Switch to control if the field is primary key field. This is mandatory for the parimary key.</td>
            <td><code translate="no">true</code> or <code translate="no">false</code></td>
        </tr>
        <tr>
            <td><code translate="no">is_partition_key</code></td>
            <td>Switch to control if the field acts as the partition key.</td>
            <td><code translate="no">true</code> or <code translate="no">false</code></td>
        </tr>
        <tr>
            <td><code translate="no">is_dynamic</code></td>
            <td>Switch to control if the field is a dynamic field.</td>
            <td><code translate="no">true</code> or <code translate="no">false</code></td>
        </tr>
        <tr>
            <td><code translate="no">autoID</code></td>
            <td>Switch to enable or disable Automatic ID (primary key) allocation.</td>
            <td><code translate="no">true</code> or <code translate="no">false</code></td>
        </tr>
        <tr>
            <td><code translate="no">dim</code></td>
            <td>Dimension of the vector. This is mandatory for a vector field.</td>
            <td>[1, 32768]</td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code></td>
            <td>Dimension of the vector. This is mandatory for a string field.</td>
            <td>[1, 32768]</td>
        </tr>
        <tr>
            <td><code translate="no">default_value</code> (Optional)</td>
            <td>Default value that applies if not specified.</td>
            <td>N/A</td>
        </tr>
    </tbody>
</table>
<table class="language-java">
    <thead>
        <tr>
            <th>Class</th>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="8"><code translate="no">CreateCollectionSchema.newBuilder()</code></td>
            <td><code translate="no">withCollectionName(String collectionName)</code></td>
            <td>Name of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">withDatabaseName(String databaseName)</code></td>
            <td>Name of the database in which the collection is to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">withShardsNum(int shardsNum)</code></td>
            <td>Number of shards to create along with the collection.</td>
            <td>[1, 16]</td>
        </tr>
        <tr>
            <td><code translate="no">withEnableDynamicField(boolean enableDynamicField)</code></td>
            <td>Whether to enable dynamic field for this collection.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">withDescription(boolean description)</code></td>
            <td>Description of this collection.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">withFieldTypes(List<FieldType> fieldType)</code></td>
            <td>Fields in this collection</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)</code></td>
            <td>Description of this collection.</td>
            <td>Possible values are as follows: <ul>
                <li><code translate="no">STRONG</code></li>
                <li><code translate="no">BOUNDED</code></li>
                <li><code translate="no">EVENTUALLY</code></li>
            </td>
        </tr>
        <tr>
            <td><code translate="no">withPartitionsNum(int partitionsNum)</code></td>
            <td>Number of partitions to create in this collection.</td>
            <td>[1, 4096]</td>
        </tr>
        <tr>
            <td rowspan="7"><code translate="no">FieldType.newBuilder()</code></td>
            <td><code translate="no">withName(String name)</code></td>
            <td>Name of the field to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">withIsDynamic(boolean isDynamic)</code></td>
            <td>Whether this field is a dynamic field.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">withPrimaryKey(boolean primaryKey)</code></td>
            <td>Whether this field is the primary key.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">withDescription(String description)</code></td>
            <td>Description of this field.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">withDataType(DataType datatype)</code></td>
            <td>Data type of the field to create.</td>
            <td>For primary key field:
                <ul>
                    <li><code translate="no">DataType.Int64</code> (numpy.int64)</li>
                    <li><code translate="no">DataType.VarChar</code> (VARCHAR)</li>
                </ul>
                For scalar field:
                <ul>
                    <li><code translate="no">DataType.Bool</code> (Boolean)</li>
                    <li><code translate="no">DataType.Int8</code> (numpy.int8)</li>
                    <li><code translate="no">DataType.Int16</code> (numpy.int16)</li>
                    <li><code translate="no">DataType.Int32</code> (numpy.int32)</li>
                    <li><code translate="no">DataType.Int64</code> (numpy.int64)</li>
                    <li><code translate="no">DataType.Float</code> (numpy.float32)</li>
                    <li><code translate="no">DataType.Double</code> (numpy.double)</li>
                    <li><code translate="no">DataType.VarChar</code> (VARCHAR)</li>
                </ul>
                For vector field:
                <ul>
                    <li><code translate="no">DataType.BinaryVector</code> (Binary vector)</li>
                    <li><code translate="no">DataType.FloatVector</code> (Float vector)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code translate="no">withAutoID(boolean autoId)</code></td>
            <td>Switch to enable or disable Automatic ID (primary key) allocation.</td>
            <td><code translate="no">True</code> or <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">withDimension(int dimension)</code> (Mandatory for vector field)</td>
            <td>Dimension of the vector.</td>
            <td>[1, 32768]</td>
        </tr>
    </tbody>
</table>
<table class="language-shell" style="display: none">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>The name of the collection.</td>
        </tr>
        <tr>
            <td>-f (Multiple)</td>
            <td>The field schema in the <code translate="no">&lt;fieldName&gt;:&lt;dataType&gt;:&lt;dimOfVector/desc&gt;</code> format.</td>
        </tr>
        <tr>
            <td>-p</td>
            <td>The name of the primary key field.</td>
        </tr>
        <tr>
            <td>-a (Optional)</td>
            <td>Flag to generate IDs automatically.</td>
        </tr>
        <tr>
            <td>-d (Optional)</td>
            <td>The description of the collection.</td>
        </tr>
    </tbody>
</table>
<table class="language-curl">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">dbName</code></td>
            <td>The name of the database to which the collection to create belongs to.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">collectionName</code></td>
            <td>(Required) The name of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">dimension</code></td>
            <td>(Required) The number of dimensions for the vector field of the collection.<br>The value ranges from <code translate="no">32</code> to <code translate="no">32768</code>.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">metricType</code></td>
            <td>The distance metric used for the collection.<br>The value defaults to <code translate="no">L2</code>.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">primaryField</code></td>
            <td>The name of the primary key field.<br>The value defaults to <code translate="no">id</code>.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">vectorField</code>(field)</td>
            <td>The name of the vector field.<br>The value defaults to <code translate="no">vector</code>.</td>
            <td>N/A</td>
        </tr>
    </tbody>
</table>
<h2 id="Create-a-collection-with-the-schema" class="common-anchor-header">Create a collection with the schema<button data-href="#Create-a-collection-with-the-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Then, create a collection with the schema you specified above.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>
collection = <span class="hljs-title class_">Collection</span>(
    name=collection_name,
    schema=schema,
    using=<span class="hljs-string">&#x27;default&#x27;</span>,
    shards_num=<span class="hljs-number">2</span>
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.createCollection(<span class="hljs-keyword">params</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = milvusClient.<span class="hljs-title class_">CreateCollection</span>(
    context.<span class="hljs-title class_">Background</span>(), <span class="hljs-comment">// ctx</span>
    schema,
    <span class="hljs-number">2</span>, <span class="hljs-comment">// shardNum</span>
)
<span class="hljs-keyword">if</span> err != nil {
    log.<span class="hljs-title class_">Fatal</span>(<span class="hljs-string">&quot;failed to create collection:&quot;</span>, err.<span class="hljs-title class_">Error</span>())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">milvusClient.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">using</code> (optional)</td>
            <td>By specifying the server alias here, you can choose in which Milvus server you create a collection.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">shards_num</code> (optional)</td>
            <td>Number of the shards for the collection to create.</td>
            <td>[1,16]</td>
        </tr>
        <tr>
            <td><code translate="no">num_partitions</code> (optional)</td>
            <td>Number of logical partitions for the collection to create.</td>
            <td>[1,4096]</td>
        </tr>
        <tr>
            <td><code translate="no">*kwargs: collection.ttl.seconds</code> (optional)</td>
            <td>Collection time to live (TTL) is the expiration time of a collection. Data in an expired collection will be cleaned up and will not be involved in searches or queries. Specify TTL in the unit of seconds.</td>
            <td>The value should be 0 or greater. 0 means TTL is disabled.</td>
        </tr>
    </tbody>
</table>
<table class="language-go">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">ctx</code></td>
            <td>Context to control API invocation process.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">shardNum</code></td>
            <td>Number of the shards for the collection to create.</td>
            <td>[1,16]</td>
        </tr>
    </tbody>
</table>
<h2 id="Limits" class="common-anchor-header">Limits<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Resource-configuration" class="common-anchor-header">Resource configuration</h3><table>
<thead>
<tr><th>Feature</th><th>Maximum limit</th></tr>
</thead>
<tbody>
<tr><td>Length of a collection name</td><td>255 characters</td></tr>
<tr><td>Number of partitions in a collection</td><td>4,096</td></tr>
<tr><td>Number of fields in a collection</td><td>64</td></tr>
<tr><td>Number of shards in a collection</td><td>16</td></tr>
</tbody>
</table>
<h3 id="Parameter-defaultvalue" class="common-anchor-header">Parameter <code translate="no">default_value</code></h3><ul>
<li><code translate="no">default_value</code> is available only for non-array and non-JSON scalar fields.</li>
<li><code translate="no">default_value</code> does not apply to the primary key.</li>
<li>The data type of <code translate="no">default_value</code> must be the same as that specified in <code translate="no">dtype</code>. Otherwise, an error can occur.</li>
<li>In the case of using <code translate="no">auto_id</code>, it’s not allowed to set all the remaining fields to use default values. That is, when performing insert or upsert operations, you need to specify values for at least one field. Otherwise, an error can occur.</li>
</ul>
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
<li>Learn more basic operations of Milvus:
<ul>
<li><a href="/docs/v2.3.x/insert_data.md">Insert data into Milvus</a></li>
<li><a href="/docs/v2.3.x/create_partition.md">Create a partition</a></li>
<li><a href="/docs/v2.3.x/build_index.md">Build an index for vectors</a></li>
<li><a href="/docs/v2.3.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.3.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul></li>
</ul>
