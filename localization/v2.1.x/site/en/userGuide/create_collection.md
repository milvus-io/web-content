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
<p>A collection consists of one or more partitions. While creating a new collection, Milvus creates a default partition <code translate="no">_default</code>. See <a href="/docs/v2.1.x/glossary.md#Collection">Glossary - Collection</a> for more information.</p>
<p>The following example builds a two-<a href="/docs/v2.1.x/glossary.md#Sharding">shard</a> collection named <code translate="no">book</code>, with a primary key field named <code translate="no">book_id</code>, an <code translate="no">INT64</code> scalar field named <code translate="no">word_count</code>, and a two-dimensional floating-point vector field named <code translate="no">book_intro</code>. Real applications will likely use much higher dimensional vectors than the example.</p>
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
The collection to create must contain a primary key field and a vector field. INT64 and String are supported data type on primary key field.
</div>
<p>First, prepare necessary parameters, including field schema, collection schema, and collection name.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
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
  description=<span class="hljs-string">&quot;Test book search&quot;</span>
)
collection_name = <span class="hljs-string">&quot;book&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> <span class="hljs-keyword">params</span> = {
  collection_name: <span class="hljs-string">&quot;book&quot;</span>,
  description: <span class="hljs-string">&quot;Test book search&quot;</span>,
  fields: [
    {
      name: <span class="hljs-string">&quot;book_intro&quot;</span>,
      description: <span class="hljs-string">&quot;&quot;</span>,
      data_type: <span class="hljs-number">101</span>,  <span class="hljs-comment">// DataType.FloatVector</span>
      type_params: {
        dim: <span class="hljs-string">&quot;2&quot;</span>,
      },
    },
    {
      name: <span class="hljs-string">&quot;book_id&quot;</span>,
      data_type: <span class="hljs-number">5</span>,   <span class="hljs-comment">//DataType.Int64</span>
      is_primary_key: <span class="hljs-literal">true</span>,
      description: <span class="hljs-string">&quot;&quot;</span>,
    },
    {
      name: <span class="hljs-string">&quot;word_count&quot;</span>,
      data_type: <span class="hljs-number">5</span>,    <span class="hljs-comment">//DataType.Int64</span>
      description: <span class="hljs-string">&quot;&quot;</span>,
    },
  ],
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
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">create collection -c book -f book_id:INT64:book_id -f word_count:INT64:word_count -f book_intro:FLOAT_VECTOR:2 -p book_id
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/collection&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collection_name&quot;: &quot;book&quot;,
    &quot;schema&quot;: {
      &quot;autoID&quot;: false,
      &quot;description&quot;: &quot;Test book search&quot;,
      &quot;fields&quot;: [
        {
          &quot;name&quot;: &quot;book_id&quot;,
          &quot;description&quot;: &quot;book id&quot;,
          &quot;is_primary_key&quot;: true,
          &quot;autoID&quot;: false,
          &quot;data_type&quot;: 5
        },
        {
          &quot;name&quot;: &quot;word_count&quot;,
          &quot;description&quot;: &quot;count of words&quot;,
          &quot;is_primary_key&quot;: false,
          &quot;data_type&quot;: 5
        },
        {
          &quot;name&quot;: &quot;book_intro&quot;,
          &quot;description&quot;: &quot;embedded vector of book introduction&quot;,
          &quot;data_type&quot;: 101,
          &quot;is_primary_key&quot;: false,
          &quot;type_params&quot;: [
            {
              &quot;key&quot;: &quot;dim&quot;,
              &quot;value&quot;: &quot;2&quot;
            }
          ]
        }
      ],
      &quot;name&quot;: &quot;book&quot;
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-curl">
Output:
<pre><code translate="no" class="language-json">{}
<button class="copy-code-btn"></button></code></pre>
</div>
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
            <td><code translate="no">FieldSchema</code></td>
            <td>Schema of the fields within the collection to create. Refer to <a href="/docs/v2.1.x/schema.md">Schema</a> for more information.</td>
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
                    <li><code translate="no">DataType.INT64</code> (numpy.int64)</li>
                    <li><code translate="no">DataType.FLOAT</code> (numpy.float32)</li>
                    <li><code translate="no">DataType.DOUBLE</code> (numpy.double)</li>
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
            <td><code translate="no">CollectionSchema</code></td>
        <td>Schema of the collection to create. Refer to <a href="/docs/v2.1.x/schema.md">Schema</a> for more information.</td>
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
            <td>Schema of the fields within the collection to create. Refer to <a href="/docs/v2.1.x/schema.md">Schema</a> for more information.</td>
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
                    <li><code translate="no">entity.FieldTypeInt64</code> (numpy.int64)</li>
                </ul>
                For scalar field:
                <ul>
                    <li><code translate="no">entity.FieldTypeBool</code> (Boolean)</li>
                    <li><code translate="no">entity.FieldTypeInt64</code> (numpy.int64)</li>
                    <li><code translate="no">entity.FieldTypeFloat</code> (numpy.float32)</li>
                    <li><code translate="no">entity.FieldTypeDouble</code> (numpy.double)</li>
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
            <td>Schema of the filed and the collection to create.</td>
            <td>Refer to <a href="/docs/v2.1.x/schema.md">Schema</a> for more information.</td>
        </tr>
        <tr>
            <td><code translate="no">data_type</code></td>
            <td>Data type of the filed to create.</td>
            <td>Refer to <a href="https://github.com/milvus-io/milvus-sdk-node/blob/main/milvus/types/Common.ts">data type reference number</a> for more information.</td>
        </tr>
        <tr>
            <td><code translate="no">is_primary</code> (Mandatory for primary key field)</td>
            <td>Switch to control if the field is primary key field.</td>
            <td><code translate="no">True</code> or <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">auto_id</code></td>
            <td>Switch to enable or disable Automatic ID (primary key) allocation.</td>
            <td><code translate="no">True</code> or <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">dim</code> (Mandatory for vector field)</td>
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
                </ul>
                For scalar field:
                <ul>
                    <li><code translate="no">entity.FieldTypeBool</code> (Boolean)</li>
                    <li><code translate="no">entity.FieldTypeInt64</code> (numpy.int64)</li>
                    <li><code translate="no">entity.FieldTypeFloat</code> (numpy.float32)</li>
                    <li><code translate="no">entity.FieldTypeDouble</code> (numpy.double)</li>
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
            <td>[1,256]</td>
        </tr>
    </tbody>
</table>
<table class="language-shell">
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
            <td>The field schema in the `<fieldName>:<dataType>:<dimOfVector/desc>` format.</td>
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
            <td><code translate="no">collection_name</code></td>
            <td>Name of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">name</code> (schema)</td>
            <td>Must be the same as <code translate="no">collection_name</code>, this duplicated field is kept for historical reasons.</td>
            <td>Same as <code translate="no">collection_name</code></td>
        </tr>
        <tr>
            <td><code translate="no">autoID</code> (schema)</td>
            <td>Switch to enable or disable Automatic ID (primary key) allocation.</td>
            <td><code translate="no">True</code> or <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">description</code> (schema)</td>
            <td>Description of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">fields</code></td>
            <td>Schema of the fields within the collection to create. Refer to <a href="/docs/v2.1.x/schema.md">Schema</a> for more information.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">name</code>(field)</td>
            <td>Name of the field to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">description</code> (field)</td>
            <td>Description of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">is_primary_key</code>(Mandatory for primary key field)</td>
            <td>Switch to control if the field is primary key field.</td>
            <td><code translate="no">True</code> or <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">autoID</code> (field)(Mandatory for primary key field)</td>
            <td>Switch to enable or disable Automatic ID (primary key) allocation.</td>
            <td><code translate="no">True</code> or <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">data_type</code></td>
            <td>Data type of the field to create.</td>
            <td>
                Enums:
                <br>1: "Bool",
                <br>2: "Int8",
                <br>3: "Int16",
                <br>4: "Int32",
                <br>5: "Int64",
                <br>10: "Float",
                <br>11: "Double",
                <br>20: "String",
                <br>21: "VarChar",
                <br>100: "BinaryVector",
                <br>101: "FloatVector",
                <br>
                <br>For primary key field:
                <ul>
                    <li><code translate="no">DataType.INT64</code> (numpy.int64)</li>
                    <li><code translate="no">DataType.VARCHAR</code> (VARCHAR)</li>
                </ul>
                For scalar field:
                <ul>
                    <li><code translate="no">DataType.BOOL</code> (Boolean)</li>
                    <li><code translate="no">DataType.INT64</code> (numpy.int64)</li>
                    <li><code translate="no">DataType.FLOAT</code> (numpy.float32)</li>
                    <li><code translate="no">DataType.DOUBLE</code> (numpy.double)</li>
                </ul>
                For vector field:
                <ul>
                    <li><code translate="no">BINARY_VECTOR</code> (Binary vector)</li>
                    <li><code translate="no">FLOAT_VECTOR</code> (Float vector)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code translate="no">dim</code> (Mandatory for vector field)</td>
            <td>Dimension of the vector.</td>
            <td>[1, 32,768]</td>
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
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>
collection = <span class="hljs-title class_">Collection</span>(
    name=collection_name, 
    schema=schema, 
    using=<span class="hljs-string">&#x27;default&#x27;</span>, 
    shards_num=<span class="hljs-number">2</span>,
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.collectionManager.createCollection(<span class="hljs-keyword">params</span>);
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
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Follow the previous step.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># Follow the previous step.</span>
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
            <td>[1,256]</td>
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
            <td>[1,256]</td>
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
<tr><td>Number of fields in a collection</td><td>256</td></tr>
<tr><td>Number of shards in a collection</td><td>256</td></tr>
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
<li><a href="/docs/v2.1.x/insert_data.md">Insert data into Milvus</a></li>
<li><a href="/docs/v2.1.x/create_partition.md">Create a partition</a></li>
<li><a href="/docs/v2.1.x/build_index.md">Build an index for vectors</a></li>
<li><a href="/docs/v2.1.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.1.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul></li>
</ul>
