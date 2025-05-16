---
id: create_collection.md
related_key: create collection
summary: Learn how to create a collection in Milvus.
title: ''
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
<p>A collection consists of one or more partitions. While creating a new collection, Milvus creates a default partition <code translate="no">_default</code>. See <a href="/docs/v2.2.x/glossary.md#Collection">Glossary - Collection</a> for more information.</p>
<p>The following example builds a two-<a href="/docs/v2.2.x/glossary.md#Sharding">shard</a> collection named <code translate="no">book</code>, with a primary key field named <code translate="no">book_id</code>, an <code translate="no">INT64</code> scalar field named <code translate="no">word_count</code>, and a two-dimensional floating-point vector field named <code translate="no">book_intro</code>. Real applications will likely use much higher dimensional vectors than the example.</p>
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
<p>First, prepare necessary parameters, including field schema, collection schema, and collection name.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
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
)
word_count = FieldSchema(
  name=<span class="hljs-string">&quot;word_count&quot;</span>,
  dtype=DataType.INT64,
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
  EnableDynamicField: <span class="hljs-literal">true</span>
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
<p>Output:</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
</div>
<pre><code translate="no" class="language-csharp"><span class="hljs-type">var</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">CollectionSchema</span>
{
    Fields =
    {
        FieldSchema.Create&lt;<span class="hljs-type">long</span>&gt;(<span class="hljs-string">&quot;book_id&quot;</span>, isPrimaryKey: <span class="hljs-literal">true</span>),
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;book_name&quot;</span>, maxLength: <span class="hljs-number">200</span>),
        FieldSchema.Create&lt;<span class="hljs-type">long</span>&gt;(<span class="hljs-string">&quot;word_count&quot;</span>),
        FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;book_intro&quot;</span>, dimension: <span class="hljs-number">2</span>)
    },
    Description = <span class="hljs-string">&quot;Test book search&quot;</span>,
    EnableDynamicFields = <span class="hljs-literal">true</span>
};
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
            <td><b><code translate="no">FieldSchema</code><b></td>
            <td>Schema of the fields within the collection to create. Refer to <a href="/docs/v2.2.x/schema.md">Schema</a> for more information.</td>
            <td>N/A</td>
        </tr>
        <tr>
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
                </ul>
                For vector field:
                <ul>
                    <li><code translate="no">BINARY_VECTOR</code> (Binary vector)</li>
                    <li><code translate="no">FLOAT_VECTOR</code> (Float vector)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code translate="no">is_primary</code> (Mandatory for primary key field)</td>
            <td>Switch to control if the field is primary key field.</td>
            <td><code translate="no">True</code> or <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">auto_id</code> (Mandatory for primary key field)</td>
            <td>Switch to enable or disable automatic ID (primary key) allocation.</td>
            <td><code translate="no">True</code> or <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code> (Mandatory for VARCHAR field)</td>
            <td>Maximum length of strings allowed to be inserted.</td>
            <td>[1, 65,535]</td>
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
            <td><b><code translate="no">CollectionSchema</code><b></td>
        <td>Schema of the collection to create. Refer to <a href="/docs/v2.2.x/schema.md">Schema</a> for more information.</td>
        <td>N/A</td>
        </tr>
        <tr>
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
        <td>enable_dynamic_field</td>
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
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">collectionName</code></td>
            <td>Name of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">description</code></td>
            <td>Description of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">Fields</code></td>
            <td>Schema of the fields within the collection to create. Refer to <a href="/docs/v2.2.x/schema.md">Schema</a> for more information.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">Name</code></td>
            <td>Name of the field to create.</td>
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
            <td><code translate="no">PrimaryKey</code> (Mandatory for primary key field)</td>
            <td>Switch to control if the field is primary key field.</td>
            <td><code translate="no">True</code> or <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">AutoID</code> (Mandatory for primary key field)</td>
            <td>Switch to enable or disable Automatic ID (primary key) allocation.</td>
            <td><code translate="no">True</code> or <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">dim</code> (Mandatory for vector field)</td>
            <td>Dimension of the vector.</td>
            <td>[1, 32768]</td>
        </tr>
    </tbody>
</table>
<table class="language-javascript">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">collection_name</code></td>
            <td>Name of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">description</code></td>
            <td>Description of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">fields</code></td>
            <td>Schema of the field and the collection to create.</td>
            <td>Refer to <a href="/docs/v2.2.x/schema.md">Schema</a> for more information.</td>
        </tr>
        <tr>
            <td><code translate="no">data_type</code></td>
            <td>Data type of the filed to create.</td>
            <td>Refer to <a href="https://github.com/milvus-io/milvus-sdk-node/blob/main/milvus/const/Milvus.ts#L287">data type reference number</a> for more information.</td>
        </tr>
        <tr>
            <td><code translate="no">is_primary_key</code> (Mandatory for primary key field)</td>
            <td>Switch to control if the field is primary key field.</td>
            <td><code translate="no">true</code> or <code translate="no">false</code></td>
        </tr>
        <tr>
            <td><code translate="no">autoID</code></td>
            <td>Switch to enable or disable Automatic ID (primary key) allocation.</td>
            <td><code translate="no">true</code> or <code translate="no">false</code></td>
        </tr>
        <tr>
            <td><code translate="no">dim</code> (Mandatory for vector field)</td>
            <td>Dimension of the vector.</td>
            <td>[1, 32768]</td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code> (Mandatory for VarChar field)</td>
            <td>Dimension of the vector.</td>
            <td>[1, 32768]</td>
        </tr>
        <tr>
            <td><code translate="no">description</code> (Optional)</td>
            <td>Description of the field.</td>
            <td>N/A</td>
        </tr>
    </tbody>
</table>
<table class="language-java">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">Name</code></td>
            <td>Name of the field to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">Description</code></td>
            <td>Description of the field to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">DataType</code></td>
            <td>Data type of the field to create.</td>
            <td>For primary key field:
                <ul>
                    <li><code translate="no">entity.FieldTypeInt64</code> (numpy.int64)</li>
                    <li><code translate="no">entity.FieldTypeVarChar</code> (VARCHAR)</li>
                </ul>
                For scalar field:
                <ul>
                    <li><code translate="no">entity.FieldTypeBool</code> (Boolean)</li>
                    <li><code translate="no">entity.FieldTypeInt8</code> (numpy.int8)</li>
                    <li><code translate="no">entity.FieldTypeInt16</code> (numpy.int16)</li>
                    <li><code translate="no">entity.FieldTypeInt32</code> (numpy.int32)</li>
                    <li><code translate="no">entity.FieldTypeInt64</code> (numpy.int64)</li>
                    <li><code translate="no">entity.FieldTypeFloat</code> (numpy.float32)</li>
                    <li><code translate="no">entity.FieldTypeDouble</code> (numpy.double)</li>
                    <li><code translate="no">entity.FieldTypeVarChar</code> (VARCHAR)</li>
                </ul>
                For vector field:
                <ul>
                    <li><code translate="no">entity.FieldTypeBinaryVector</code> (Binary vector)</li>
                    <li><code translate="no">entity.FieldTypeFloatVector</code> (Float vector)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code translate="no">PrimaryKey</code> (Mandatory for primary key field)</td>
            <td>Switch to control if the field is primary key field.</td>
            <td><code translate="no">True</code> or <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">AutoID</code></td>
            <td>Switch to enable or disable Automatic ID (primary key) allocation.</td>
            <td><code translate="no">True</code> or <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">Dimension</code> (Mandatory for vector field)</td>
            <td>Dimension of the vector.</td>
            <td>[1, 32768]</td>
        </tr>
        <tr>
            <td><code translate="no">CollectionName</code></td>
            <td>Name of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">Description</code> (Optional)</td>
            <td>Description of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">ShardsNum</code></td>
            <td>Number of the shards for the collection to create.</td>
            <td>[1,16]</td>
        </tr>
        <tr>
            <td><code translate="no">PartitionsNum</code></td>
            <td>Number of the logical partitions for the collection to create.</td>
            <td>[1,4096]</td>
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
<table class="language-csharp">
    <thead>
        <tr>
            <th>Class</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">CollectionSchema</code></td>
            <td>The logical definition of a collection, describing the fields which makes it up.</td>
            <td>Possible parameters: <ul>
                <li><code translate="no">Fields</code>: A list of Fields derived from the <code translate="no">FieldSchema</code> class.</li>
                <li><code translate="no">Description</code>: (Optional) Description of the collection schema.</li>
                <li><code translate="no">EnableDynamicFields</code>: (Optional) Whether to enable dynamic fields.</li>
            </ul></td>
        </tr>
        <tr>
            <td><code translate="no">FieldSchema</code></td>
            <td>The logical definition of a collection, describing the fields which makes it up.</td>
            <td>Possible methods: <ul>
                <li><code translate="no">Create(string name, MilvusDataType dataType, bool isPrimaryKey, bool autoId, bool isPartitionKey, string description)</code></li>
                <li><code translate="no">Create<TData>(string name, bool isPrimaryKey, bool autoId, bool isPartitionKey, string description)</code></li>
                <li><code translate="no">CreateVarchar(string name, int maxLength, bool isPrimaryKey, bool autoId, bool isPartitionKey, string description)</code></li>
                <li><code translate="no">CreateFloatVector(string name, int dimension, string description)</code></li>
                <li><code translate="no">CreateBinaryVector(string name, int dimension, string description)</code></li>
                <li><code translate="no">CreateJson(string name)</code></li>
            </ul></td>
        </tr>
    </tbody>
</table>
## Create a collection with the schema
<p>Then, create a collection with the schema you specified above.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>
collection = <span class="hljs-title class_">Collection</span>(
    name=collection_name,
    schema=schema,
    using=<span class="hljs-string">&#x27;default&#x27;</span>,
    shards_num=<span class="hljs-number">2</span>
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">createCollection</span>(param);
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
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> collection = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title class_">CreateCollectionAsync</span>(collectionName, schema, <span class="hljs-attr">shardsNum</span>: <span class="hljs-number">2</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \
     --url <span class="hljs-string">&quot;<span class="hljs-variable">${MILVUS_HOST}</span>:<span class="hljs-variable">${MILVUS_PORT}</span>/v1/vector/collections/create&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
     --header <span class="hljs-string">&quot;accept: application/json&quot;</span> \
     --header <span class="hljs-string">&quot;content-type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;dbName&quot;: &quot;default&quot;,   
       &quot;collectionName&quot;: &quot;medium_articles&quot;,
       &quot;dimension&quot;: 256,
       &quot;metricType&quot;: &quot;L2&quot;,
       &quot;primaryField&quot;: &quot;id&quot;,
       &quot;vectorField&quot;: &quot;vector&quot;
      }&#x27;</span>
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
<table class="language-csharp">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">collectionName</code></td>
            <td>Name of the collection.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">schema</code></td>
            <td>Schema of the collection. Should be a <code translate="no">CollectionSchema</code> object.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">consistencyLevel</code></td>
            <td>Consistency Level of the collection.</td>
            <td>Possible values are <ul>
                <li><code translate="no">ConsistencyLevel.Strong</code></li>
                <li><code translate="no">ConsistencyLevel.Session</code></li>
                <li><code translate="no">ConsistencyLevel.BoundedStaleness</code></li>
                <li><code translate="no">ConsistencyLevel.Eventually</code></li>
                <li><code translate="no">ConsistencyLevel.Customized</code></li>
            </ul></td>
        </tr>
        <tr></td>
        <tr>
            <td><code translate="no">shardsNum</code></td>
            <td>Number of shards to create.</td>
            <td>N/A</td>
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
    </button></h2><table>
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
<li><a href="/docs/v2.2.x/insert_data.md">Insert data into Milvus</a></li>
<li><a href="/docs/v2.2.x/create_partition.md">Create a partition</a></li>
<li><a href="/docs/v2.2.x/build_index.md">Build an index for vectors</a></li>
<li><a href="/docs/v2.2.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.2.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul></li>
</ul>
