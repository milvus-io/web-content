---
id: schema.md
summary: Learn how to define a schema in Milvus.
title: ''
---
<h1 id="Schema" class="common-anchor-header">Schema<button data-href="#Schema" class="anchor-icon" translate="no">
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
    </button></h2><p>A field schema is the logical definition of a field. It is the first thing you need to define before defining a <a href="#Collection-schema">collection schema</a> and <a href="/docs/v2.1.x/create_collection.md">creating a collection</a>.</p>
<p>Milvus supports only one primary key field in a collection.</p>
<h3 id="Field-schema-properties" class="common-anchor-header">Field schema properties</h3><table class="properties">
    <thead>
    <tr>
        <th>Properties</td>
        <th>Description</th>
        <th>Note</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>name</td>
        <td>Name of the field in the collection to create</td>
        <td>Data type: String.<br/>Mandatory</td>
    </tr>
    <tr>
        <td>dtype</td>
        <td>Data type of the field</td>
        <td>Mandatory</td>
    </tr>
    <tr>
        <td>description</td>
        <td>Description of the field</td>
        <td>Data type: String.<br/>Optional</td>
    </tr>
    <tr>
        <td>is_primary</td>
        <td>Whether to set the field as the primary key field or not</td>
        <td>Data type: Boolean (<code translate="no">true</code> or <code translate="no">false</code>).<br/>Mandatory for the primary key field</td>
    </tr>
    <tr>
        <td>dim</td>
        <td>Dimension of the vector</td>
    <td>Data type: Integer &isin;[1, 32768].<br/>Mandatory for the vector field</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-field-schema" class="common-anchor-header">Create a field schema</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Supported-data-type" class="common-anchor-header">Supported data type</h3><p><code translate="no">DataType</code> defines the kind of data a field contains. Different fields support different data types.</p>
<ul>
<li>Primary key field supports:
<ul>
<li>INT64: numpy.int64</li>
<li>VARCHAR: VARCHAR</li>
</ul></li>
<li>Scalar field supports:
<ul>
<li>BOOL: Boolean (<code translate="no">true</code> or <code translate="no">false</code>)</li>
<li>INT8: numpy.int8</li>
<li>INT16: numpy.int16</li>
<li>INT32: numpy.int32</li>
<li>INT64: numpy.int64</li>
<li>FLOAT: numpy.float32</li>
<li>DOUBLE: numpy.double</li>
<li>VARCHAR: VARCHAR</li>
</ul></li>
<li>Vector field supports:
<ul>
<li>BINARY_VECTOR: Binary vector</li>
<li>FLOAT_VECTOR: Float vector</li>
</ul></li>
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
    </button></h2><p>A collection schema is the logical definition of a collection. Usually you need to define the <a href="#Field-schema">field schema</a> before defining a collection schema and <a href="/docs/v2.1.x/create_collection.md">creating a collection</a>.</p>
<h3 id="Collection-schema-properties" class="common-anchor-header">Collection schema properties</h3><table class="properties">
    <thead>
    <tr>
        <th>Properties</td>
        <th>Description</th>
        <th>Note</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>field</td>
        <td>Fields in the collection to create</td>
        <td>Mandatory</td>
    </tr>
    <tr>
        <td>description</td>
        <td>Description of the collection</td>
        <td>Data type: String.<br/>Optional</td>
    </tr>
    <tr>
        <td>auto_id</td>
        <td>Whether to enable Automatic ID (primary key) allocation or not</td>
        <td>Data type: Boolean (<code translate="no">true</code> or <code translate="no">false</code>).<br/>Optional</td>
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
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=<span class="hljs-literal">False</span>, description=<span class="hljs-string">&quot;desc of a collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Create a collection with the schema specified:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>
collection_name1 = <span class="hljs-string">&quot;tutorial_1&quot;</span>
collection1 = <span class="hljs-title class_">Collection</span>(name=collection_name1, schema=schema, using=<span class="hljs-string">&#x27;default&#x27;</span>, shards_num=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
  You can define the shard number with <code translate="no">shards_num</code> and in which Milvus server you wish to create a collection by specifying the alias in <code translate="no">using</code>.
  </div>
<p><br/>
You can also create a collection with <code translate="no">Collection.construct_from_dataframe</code>, which automatically generates a collection schema from DataFrame and creates a collection.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
df = pd.DataFrame({
        <span class="hljs-string">&quot;id&quot;</span>: [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
        <span class="hljs-string">&quot;age&quot;</span>: [random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">40</span>) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
        <span class="hljs-string">&quot;embedding&quot;</span>: [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)]
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
<li>Learn how to prepare schema when <a href="/docs/v2.1.x/create_collection.md">creating a collection</a>.</li>
</ul>
