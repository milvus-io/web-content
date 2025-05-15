---
id: index-vector-fields.md
order: 1
summary: >-
  This guide walks you through the basic operations on creating and managing
  indexes on vector fields in a collection.
title: Index Vector Fields
---
<h1 id="Index-Vector-Fields" class="common-anchor-header">Index Vector Fields<button data-href="#Index-Vector-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide walks you through the basic operations on creating and managing indexes on vector fields in a collection.</p>
<h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Leveraging the metadata stored in an index file, Milvus organizes your data in a specialized structure, facilitating rapid retrieval of requested information during searches or queries.</p>
<p>Milvus provides several index types and metrics to sort field values for efficient similarity searches. The following table lists the supported index types and metrics for different vector field types. Currently, Milvus supports various types of vector data, including floating point embeddings (often known as floating point vectors or dense vectors), binary embeddings (also known as binary vectors), and sparse embeddings (also known as sparse vectors). For details, refer to <a href="/docs/v2.4.x/index.md">In-memory Index</a> and <a href="/docs/v2.4.x/metric.md">Similarity Metrics</a>.</p>
<div class="filter">
  <a href="#floating">Floating point embeddings</a>
  <a href="#binary">Binary embeddings</a>
  <a href="#sparse">Sparse embeddings</a>
</div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Metric Types</th>
    <th class="tg-0pky">Index Types</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Euclidean distance (L2)</li><li>Inner product (IP)</li><li>Cosine similarity (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>FLAT</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Metric Types</th>
    <th class="tg-0pky">Index Types</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Jaccard (JACCARD)</li><li>Hamming (HAMMING)</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Metric Types</th>
    <th class="tg-0pky">Index Types</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>SPARSE_INVERTED_INDEX</li><li>SPARSE_WAND</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<p>It is recommended to create indexes for both the vector field and scalar fields that are frequently accessed.</p>
<h2 id="Preparations" class="common-anchor-header">Preparations<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>As explained in <a href="/docs/v2.4.x/manage-collections.md">Manage Collections</a>, Milvus automatically generates an index and loads it into memory when creating a collection if any of the following conditions are specified in the collection creation request:</p>
<ul>
<li><p>The dimensionality of the vector field and the metric type, or</p></li>
<li><p>The schema and the index parameters.</p></li>
</ul>
<p>The code snippet below repurposes the existing code to establish a connection to a Milvus instance and create a collection without specifying its index parameters. In this case, the collection lacks an index and remains unloaded.</p>
<div class="language-python">
<p>To prepare for indexing, use <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> to connect to the Milvus server and set up a collection by using <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a>, <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a>, and <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a>.</p>
</div>
<div class="language-java">
<p>To prepare for indexing, use <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a> to connect to the Milvus server and set up a collection by using <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md"><code translate="no">createSchema()</code></a>, <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md"><code translate="no">addField()</code></a>, and <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a>.</p>
</div>
<div class="language-javascript">
<p>To prepare for indexing, use <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> to connect to the Milvus server and set up a collection by using <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a>.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create schema</span>
<span class="hljs-comment"># 2.1. Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># 2.2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

<span class="hljs-comment"># 3. Create collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>, 
    schema=schema, 
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create a collection</span>

<span class="hljs-comment">// 2.1 Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

<span class="hljs-comment">// 2.2 Add fields to schema</span>
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;id&quot;</span>).dataType(DataType.Int64).isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>).dataType(DataType.FloatVector).dimension(<span class="hljs-number">5</span>).build());

<span class="hljs-comment">// 3 Create a collection without schema and index parameters</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
.collectionName(<span class="hljs-string">&quot;customized_setup&quot;</span>)
.collectionSchema(schema)
.build();

client.createCollection(customizedSetupReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// 2. Define fields for the collection</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
    },
]

<span class="hljs-comment">// 3. Create a collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)  

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-Collection" class="common-anchor-header">Index a Collection<button data-href="#Index-a-Collection" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>To create an index for a collection or index a collection, use <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md"><code translate="no">prepare_index_params()</code></a> to prepare index parameters and <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md"><code translate="no">create_index()</code></a> to create the index.</p>
</div>
<div class="language-java">
<p>To create an index for a collection or index a collection, use <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a> to prepare index parameters and <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/createIndex.md"><code translate="no">createIndex()</code></a> to create the index.</p>
</div>
<div class="language-javascript">
<p>To create an index for a collection or index a collection, use <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4.1. Set up the index parameters</span>
index_params = MilvusClient.prepare_index_params()

<span class="hljs-comment"># 4.2. Add an index on the vector field.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
    params={ <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span> }
)

<span class="hljs-comment"># 4.3. Create an index file</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>,
    index_params=index_params,
    sync=<span class="hljs-literal">False</span> <span class="hljs-comment"># Whether to wait for index creation to complete before returning. Defaults to True.</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-comment">// 4 Prepare index parameters</span>

<span class="hljs-comment">// 4.2 Add an index for the vector field &quot;vector&quot;</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForVectorField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
    .indexName(<span class="hljs-string">&quot;vector_index&quot;</span>)
    .indexType(IndexParam.IndexType.IVF_FLAT)
    .metricType(IndexParam.MetricType.COSINE)
    .extraParams(Map.of(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">128</span>))
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-comment">// 4.3 Crate an index file</span>
<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup&quot;</span>)
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Set up index for the collection</span>
<span class="hljs-comment">// 4.1. Set up the index parameters</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,   
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span> }
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>The name of the target file to apply this object applies.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>The algorithm that is used to measure similarity between vectors. Possible values are <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. This is available only when the specified field is a vector field. For more information, refer to <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Indexes supported in Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>The name of the algorithm used to arrange data in the specific field. For applicable algorithms, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a> and <a href="https://milvus.io/docs/disk_index.md">On-disk Index</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">index_name</code></td>
      <td>The name of the index file generated after this object has been applied.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>The fine-tuning parameters for the specified index type. For details on possible keys and value ranges, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>The name of an existing collection.</td>
    </tr>
    <tr>
      <td><code translate="no">index_params</code></td>
      <td>An <strong>IndexParams</strong> object containing a list of <strong>IndexParam</strong> objects.</td>
    </tr>
    <tr>
      <td><code translate="no">sync</code></td>
      <td>Controls how the index is built in relation to the client’s request. Valid values:<br><ul><li><code translate="no">True</code> (default): The client waits until the index is fully built before it returns. This means you will not get a response until the process is complete.</li><li><code translate="no">False</code>: The client returns immediately after the request is received and the index is being built in the background. To find out if index creation has been completed, use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md">describe_index()</a> method.</li></ul></td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>The name of the target field to apply this IndexParam object applies.</td>
    </tr>
    <tr>
      <td><code translate="no">indexName</code></td>
      <td>The name of the index file generated after this object has been applied.</td>
    </tr>
    <tr>
      <td><code translate="no">indexType</code></td>
      <td>The name of the algorithm used to arrange data in the specific field. For applicable algorithms, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a> and <a href="https://milvus.io/docs/disk_index.md">On-disk Index</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metricType</code></td>
      <td>The distance metric to use for the index. Possible values are <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>.</td>
    </tr>
    <tr>
      <td><code translate="no">extraParams</code></td>
      <td>Extra index parameters. For details, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a> and <a href="https://milvus.io/docs/disk_index.md">On-disk Index</a>.</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>The name of an existing collection.</td>
    </tr>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>The name of the field in which to create an index.</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>The type of the index to create.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>The metric type used to measure vector distance.</td>
    </tr>
    <tr>
      <td><code translate="no">index_name</code></td>
      <td>The name of the index to create.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>Other index-specific parameters.</td>
    </tr>
  </tbody>
</table>
<div class="admonition note">
<p><strong>notes</strong></p>
<p>Currently, you can create only one index file for each field in a collection.</p>
</div>
<h2 id="Check-Index-Details" class="common-anchor-header">Check Index Details<button data-href="#Check-Index-Details" class="anchor-icon" translate="no">
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
    </button></h2><p>Once you have created an index, you can check its details.</p>
<div class="language-python">
<p>To check the index details, use <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> to list the index names and <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md"><code translate="no">describe_index()</code></a> to get the index details.</p>
</div>
<div class="language-java">
<p>To check the index details, use <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/describeIndex.md"><code translate="no">describeIndex()</code></a> to get the index details.</p>
</div>
<div class="language-javascript">
<p>To check the index details, use <a href="https://milvus.io/api-reference/node/v2.4.x/Management/describeIndex.md"><code translate="no">describeIndex()</code></a> to get the index details.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. Describe index</span>
res = client.list_indexes(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     &quot;vector_index&quot;,</span>
<span class="hljs-comment"># ]</span>

res = client.describe_index(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;index_type&quot;: ,</span>
<span class="hljs-comment">#     &quot;metric_type&quot;: &quot;COSINE&quot;,</span>
<span class="hljs-comment">#     &quot;field_name&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">#     &quot;index_name&quot;: &quot;vector_index&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DescribeIndexReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.response.DescribeIndexResp;

<span class="hljs-comment">// 5. Describe index</span>
<span class="hljs-comment">// 5.1 List the index names</span>
<span class="hljs-type">ListIndexesReq</span> <span class="hljs-variable">listIndexesReq</span> <span class="hljs-operator">=</span> ListIndexesReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup&quot;</span>)
    .build();

List&lt;String&gt; indexNames = client.listIndexes(listIndexesReq);

System.out.println(indexNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;vector_index&quot;</span>
<span class="hljs-comment">// ]</span>

<span class="hljs-comment">// 5.2 Describe an index</span>
<span class="hljs-type">DescribeIndexReq</span> <span class="hljs-variable">describeIndexReq</span> <span class="hljs-operator">=</span> DescribeIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup&quot;</span>)
    .indexName(<span class="hljs-string">&quot;vector_index&quot;</span>)
    .build();

<span class="hljs-type">DescribeIndexResp</span> <span class="hljs-variable">describeIndexResp</span> <span class="hljs-operator">=</span> client.describeIndex(describeIndexReq);

System.out.println(JSONObject.toJSON(describeIndexResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//     &quot;metricType&quot;: &quot;COSINE&quot;,</span>
<span class="hljs-comment">//     &quot;indexType&quot;: &quot;AUTOINDEX&quot;,</span>
<span class="hljs-comment">//     &quot;fieldName&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">//     &quot;indexName&quot;: &quot;vector_index&quot;</span>
<span class="hljs-comment">// }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. Describe the index</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res.<span class="hljs-property">index_descriptions</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>))

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &quot;params&quot;: [</span>
<span class="hljs-comment">//       {</span>
<span class="hljs-comment">//         &quot;key&quot;: &quot;index_type&quot;,</span>
<span class="hljs-comment">//         &quot;value&quot;: &quot;AUTOINDEX&quot;</span>
<span class="hljs-comment">//       },</span>
<span class="hljs-comment">//       {</span>
<span class="hljs-comment">//         &quot;key&quot;: &quot;metric_type&quot;,</span>
<span class="hljs-comment">//         &quot;value&quot;: &quot;COSINE&quot;</span>
<span class="hljs-comment">//       }</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &quot;index_name&quot;: &quot;vector_index&quot;,</span>
<span class="hljs-comment">//     &quot;indexID&quot;: &quot;449007919953063141&quot;,</span>
<span class="hljs-comment">//     &quot;field_name&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">//     &quot;indexed_rows&quot;: &quot;0&quot;,</span>
<span class="hljs-comment">//     &quot;total_rows&quot;: &quot;0&quot;,</span>
<span class="hljs-comment">//     &quot;state&quot;: &quot;Finished&quot;,</span>
<span class="hljs-comment">//     &quot;index_state_fail_reason&quot;: &quot;&quot;,</span>
<span class="hljs-comment">//     &quot;pending_index_rows&quot;: &quot;0&quot;</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>You can check the index file created on a specific field, and collect the statistics on the number of rows indexed using this index file.</p>
<h2 id="Drop-an-Index" class="common-anchor-header">Drop an Index<button data-href="#Drop-an-Index" class="anchor-icon" translate="no">
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
    </button></h2><p>You can simply drop an index if it is no longer needed.</p>
<div class="alert note">
<p>Before dropping an index, make sure it has been released first.</p>
</div>
<div class="language-python">
<p>To drop an index, use <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/drop_index.md"><code translate="no">drop_index()</code></a>.</p>
</div>
<div class="language-java">
<p>To drop an index, use <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/dropIndex.md"><code translate="no">dropIndex()</code></a>.</p>
</div>
<div class="language-javascript">
<p>To drop an index, use <a href="https://milvus.io/api-reference/node/v2.4.x/Management/dropIndex.md"><code translate="no">dropIndex()</code></a>.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 6. Drop index</span>
client.drop_index(
    collection_name=<span class="hljs-string">&quot;customized_setup&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 6. Drop index</span>

<span class="hljs-type">DropIndexReq</span> <span class="hljs-variable">dropIndexReq</span> <span class="hljs-operator">=</span> DropIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup&quot;</span>)
    .indexName(<span class="hljs-string">&quot;vector_index&quot;</span>)
    .build();

client.dropIndex(dropIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 6. Drop the index</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
