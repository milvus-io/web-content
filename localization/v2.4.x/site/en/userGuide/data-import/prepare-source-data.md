---
id: prepare-source-data.md
order: 0
title: Prepare Source Data
summary: >-
  This page discusses something you should consider before you start
  bulk-inserting data into your collection.
---
<h1 id="Prepare-Source-Data" class="common-anchor-header">Prepare Source Data<button data-href="#Prepare-Source-Data" class="anchor-icon" translate="no">
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
    </button></h1><p>This page discusses something you should consider before you start bulk-inserting data into your collection.</p>
<h2 id="Before-you-start" class="common-anchor-header">Before you start<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>The target collection requires mapping the source data to its schema. The diagram below shows how acceptable source data is mapped to the schema of a target collection.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/map-data-to-schema.png" alt="Map data to schema" class="doc-image" id="map-data-to-schema" />
    <span>Map data to schema</span>
  </span>
</p>
<p>You should carefully examine your data and design the schema of the target collection accordingly.</p>
<p>Taking the JSON data in the above diagram as an example, there are two entities in the rows list, each row having six fields. The collection schema selectively includes four: <strong>id</strong>, <strong>vector</strong>, <strong>scalar_1</strong>, and <strong>scalar_2</strong>.</p>
<p>There are two more things to consider when designing the schema:</p>
<ul>
<li><p><strong>Whether to enable AutoID</strong></p>
<p>The <strong>id</strong> field serves as the primary field of the collection. To make the primary field automatically increment, you can enable <strong>AutoID</strong> in the schema. In this case, you should exclude the <strong>id</strong> field from each row in the source data.</p></li>
<li><p><strong>Whether to enable dynamic fields</strong></p>
<p>The target collection can also store fields not included in its pre-defined schema if the schema enables dynamic fields. The <strong>$meta</strong> field is a reserved JSON field to hold dynamic fields and their values in key-value pairs. In the above diagram, the fields <strong>dynamic_field_1</strong> and <strong>dynamic_field_2</strong> and the values will be saved as key-value pairs in the <strong>$meta</strong> field.</p></li>
</ul>
<p>The following code shows how to set up the schema for the collection illustrated in the above diagram.</p>
<div class="language-python">
<p>To obtain more information, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> and <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> in the SDK reference.</p>
</div>
<div class="language-java">
<p>To obtain more information, refer to <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/CollectionSchema.md"><code translate="no">CollectionSchema</code></a> in the SDK reference.</p>
</div>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># You need to work out a collection schema out of your dataset.</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>
)

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;scalar_1&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;scalar_2&quot;</span>, datatype=DataType.INT64)

schema.verify()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.grpc.DataType;
<span class="hljs-keyword">import</span> io.milvus.param.collection.CollectionSchemaParam;
<span class="hljs-keyword">import</span> io.milvus.param.collection.FieldType;

<span class="hljs-comment">// Define schema for the target collection</span>
<span class="hljs-type">FieldType</span> <span class="hljs-variable">id</span> <span class="hljs-operator">=</span> FieldType.newBuilder()
        .withName(<span class="hljs-string">&quot;id&quot;</span>)
        .withDataType(DataType.Int64)
        .withPrimaryKey(<span class="hljs-literal">true</span>)
        .withAutoID(<span class="hljs-literal">false</span>)
        .build();

<span class="hljs-type">FieldType</span> <span class="hljs-variable">vector</span> <span class="hljs-operator">=</span> FieldType.newBuilder()
        .withName(<span class="hljs-string">&quot;vector&quot;</span>)
        .withDataType(DataType.FloatVector)
        .withDimension(<span class="hljs-number">768</span>)
        .build();

<span class="hljs-type">FieldType</span> <span class="hljs-variable">scalar1</span> <span class="hljs-operator">=</span> FieldType.newBuilder()
        .withName(<span class="hljs-string">&quot;scalar_1&quot;</span>)
        .withDataType(DataType.VarChar)
        .withMaxLength(<span class="hljs-number">512</span>)
        .build();

<span class="hljs-type">FieldType</span> <span class="hljs-variable">scalar2</span> <span class="hljs-operator">=</span> FieldType.newBuilder()
        .withName(<span class="hljs-string">&quot;scalar_2&quot;</span>)
        .withDataType(DataType.Int64)
        .build();

<span class="hljs-type">CollectionSchemaParam</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CollectionSchemaParam.newBuilder()
        .withEnableDynamicField(<span class="hljs-literal">true</span>)
        .addFieldType(id)
        .addFieldType(vector)
        .addFieldType(scalar1)
        .addFieldType(scalar2)
        .build();
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-BulkWriter" class="common-anchor-header">Set up BulkWriter<button data-href="#Set-up-BulkWriter" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>BulkWriter</strong> is a tool designed to convert raw datasets into a format suitable for importing via the RESTful Import API. It offers two types of writers:</p>
<ul>
<li><strong>LocalBulkWriter</strong>: Reads the designated dataset and transforms it into an easy-to-use format.</li>
<li><strong>RemoteBulkWriter</strong>: Performs the same task as the LocalBulkWriter but additionally transfers the converted data files to a specified remote object storage bucket.</li>
</ul>
<p><strong>RemoteBulkWriter</strong> differs from <strong>LocalBulkWriter</strong> in that <strong>RemoteBulkWriter</strong> transfers the converted data files to a target object storage bucket.</p>
<h3 id="Set-up-LocalBulkWriter" class="common-anchor-header">Set up LocalBulkWriter</h3><p>A <strong>LocalBulkWriter</strong> appends rows from the source dataset and commits them to a local file of the specified format.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> LocalBulkWriter, BulkFileType
<span class="hljs-comment"># Use `from pymilvus import LocalBulkWriter, BulkFileType` </span>
<span class="hljs-comment"># when you use pymilvus earlier than 2.4.2 </span>

writer = LocalBulkWriter(
    schema=schema,
    local_path=<span class="hljs-string">&#x27;.&#x27;</span>,
    segment_size=<span class="hljs-number">512</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>, <span class="hljs-comment"># Default value</span>
    file_type=BulkFileType.PARQUET
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.bulkwriter.LocalBulkWriter;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.LocalBulkWriterParam;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.common.clientenum.BulkFileType;

<span class="hljs-type">LocalBulkWriterParam</span> <span class="hljs-variable">localBulkWriterParam</span> <span class="hljs-operator">=</span> LocalBulkWriterParam.newBuilder()
    .withCollectionSchema(schema)
    .withLocalPath(<span class="hljs-string">&quot;.&quot;</span>)
    .withChunkSize(<span class="hljs-number">512</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>)
    .withFileType(BulkFileType.PARQUET)
    .build();

<span class="hljs-type">LocalBulkWriter</span> <span class="hljs-variable">localBulkWriter</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">LocalBulkWriter</span>(localBulkWriterParam);
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>When creating a <strong>LocalBulkWriter</strong>, you should:</p>
<ul>
<li>Reference the created schema in <code translate="no">schema</code>.</li>
<li>Set <code translate="no">local_path</code> to the output directory.</li>
<li>Set <code translate="no">file_type</code> to the output file type.</li>
<li>If your dataset contains a large number of records, you are advised to segment your data by setting <code translate="no">segment_size</code> to a proper value.</li>
</ul>
<p>For details on parameter settings, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/LocalBulkWriter/LocalBulkWriter.md">LocalBulkWriter</a> in the SDK reference.</p>
</div>
<div class="language-java">
<p>When creating a <strong>LocalBulkWriter</strong>, you should:</p>
<ul>
<li>Reference the created schema in <code translate="no">CollectionSchema()</code>.</li>
<li>Set the output directory in <code translate="no">withLocalPath()</code>.</li>
<li>Set the output file type in <code translate="no">withFileType()</code>.</li>
<li>If your dataset contains a large number of records, you are advised to segment your data by setting <code translate="no">withChunkSize()</code> to a proper value.</li>
</ul>
<p>For details on parameter settings, refer to LocalBulkWriter in the SDK reference.</p>
</div>
<h3 id="Set-up-RemoteBulkWriter" class="common-anchor-header">Set up RemoteBulkWriter</h3><p>Instead of committing appended data to a local file, a <strong>RemoteBulkWriter</strong> commits them to a remote bucket. Therefore, you should set up a <strong>ConnectParam</strong> object before creating a <strong>RemoteBulkWriter</strong>.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> RemoteBulkWriter
<span class="hljs-comment"># Use `from pymilvus import RemoteBulkWriter` </span>
<span class="hljs-comment"># when you use pymilvus earlier than 2.4.2 </span>

<span class="hljs-comment"># Third-party constants</span>
ACCESS_KEY=<span class="hljs-string">&quot;minioadmin&quot;</span>
SECRET_KEY=<span class="hljs-string">&quot;minioadmin&quot;</span>
BUCKET_NAME=<span class="hljs-string">&quot;milvus-bucket&quot;</span>

<span class="hljs-comment"># Connections parameters to access the remote bucket</span>
conn = RemoteBulkWriter.S3ConnectParam(
    endpoint=<span class="hljs-string">&quot;localhost:9000&quot;</span>, <span class="hljs-comment"># the default MinIO service started along with Milvus</span>
    access_key=ACCESS_KEY,
    secret_key=SECRET_KEY,
    bucket_name=BUCKET_NAME,
    secure=<span class="hljs-literal">False</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.bulkwriter.common.clientenum.BulkFileType;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.connect.S3ConnectParam;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.connect.StorageConnectParam;

<span class="hljs-type">String</span> <span class="hljs-variable">ACCESS_KEY</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;minioadmin&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">SECRET_KEY</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;minioadmin&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">BUCKET_NAME</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;milvus-bucket&quot;</span>;

<span class="hljs-type">StorageConnectParam</span> <span class="hljs-variable">storageConnectParam</span> <span class="hljs-operator">=</span> S3ConnectParam.newBuilder()
    .withEndpoint(MINIO_URI)
    .withAccessKey(ACCESS_KEY)
    .withSecretKey(SECRET_KEY)
    .withBucketName(BUCKET_NAME)
    .build();
<button class="copy-code-btn"></button></code></pre>
<p>Once the connection parameters are ready, you can reference it in the <strong>RemoteBulkWriter</strong> as follows:</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> BulkFileType
<span class="hljs-comment"># Use `from pymilvus import BulkFileType` </span>
<span class="hljs-comment"># when you use pymilvus earlier than 2.4.2 </span>

writer = RemoteBulkWriter(
    schema=schema,
    remote_path=<span class="hljs-string">&quot;/&quot;</span>,
    connect_param=conn,
    file_type=BulkFileType.PARQUET
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.bulkwriter.RemoteBulkWriter;
<span class="hljs-keyword">import</span> io.milvus.bulkwriter.RemoteBulkWriterParam;

<span class="hljs-type">RemoteBulkWriterParam</span> <span class="hljs-variable">remoteBulkWriterParam</span> <span class="hljs-operator">=</span> RemoteBulkWriterParam.newBuilder()
    .withCollectionSchema(schema)
    .withConnectParam(storageConnectParam)
    .withChunkSize(<span class="hljs-number">512</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>)
    .withRemotePath(<span class="hljs-string">&quot;/&quot;</span>)
    .withFileType(BulkFileType.PARQUET)
    .build();

<span class="hljs-type">RemoteBulkWriter</span> <span class="hljs-variable">remoteBulkWriter</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RemoteBulkWriter</span>(remoteBulkWriterParam);
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>The parameters for creating a <strong>RemoteBulkWriter</strong> are barely the same as those for a <strong>LocalBulkWriter</strong>, except <code translate="no">connect_param</code>. For details on parameter settings, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/RemoteBulkWriter/RemoteBulkWriter.md">RemoteBulkWriter</a> and <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/RemoteBulkWriter/S3ConnectParam.md">ConnectParam</a> in the SDK reference.</p>
</div>
<div class="language-java">
<p>The parameters for creating a <strong>RemoteBulkWriter</strong> are barely the same as those for a <strong>LocalBulkWriter</strong>, except <code translate="no">StorageConnectParam</code>. For details on parameter settings, refer to RemoteBulkWriter and StorageConnectParam in the SDK reference.</p>
</div>
<h2 id="Start-writing" class="common-anchor-header">Start writing<button data-href="#Start-writing" class="anchor-icon" translate="no">
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
<p>A <strong>BulkWriter</strong> has two methods: <code translate="no">append_row()</code> adds a row from a source dataset, and <code translate="no">commit()</code> commits added rows to a local file or a remote bucket.</p>
</div>
<div class="language-java">
<p>A <strong>BulkWriter</strong> has two methods: <code translate="no">appendRow()</code> adds a row from a source dataset, and <code translate="no">commit()</code> commits added rows to a local file or a remote bucket.</p>
</div>
<p>For demonstration purposes, the following code appends randomly generated data.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> <span class="hljs-type">string</span>

def generate_random_str(length=<span class="hljs-number">5</span>):
    letters = <span class="hljs-type">string</span>.ascii_uppercase
    digits = <span class="hljs-type">string</span>.digits
    
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;&#x27;</span>.join(random.choices(letters + digits, k=length))

<span class="hljs-keyword">for</span> i in <span class="hljs-keyword">range</span>(<span class="hljs-number">10000</span>):
    writer.append_row({
        <span class="hljs-string">&quot;id&quot;</span>: i, 
        <span class="hljs-string">&quot;vector&quot;</span>: [random.uniform(<span class="hljs-number">-1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ in <span class="hljs-keyword">range</span>(<span class="hljs-number">768</span>)],
        <span class="hljs-string">&quot;scalar_1&quot;</span>: generate_random_str(random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">20</span>)),
        <span class="hljs-string">&quot;scalar_2&quot;</span>: random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">100</span>)
    })
    
writer.commit()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.<span class="hljs-property">alibaba</span>.<span class="hljs-property">fastjson</span>.<span class="hljs-property">JSONObject</span>;

<span class="hljs-keyword">for</span> (int i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10000</span>; i++) {
    <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span> json = <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>();
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;id&quot;</span>, i);
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title function_">get_random_vector</span>(<span class="hljs-number">768</span>));
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-title function_">get_random_string</span>(<span class="hljs-number">20</span>));
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;scalar_2&quot;</span>, (long) (<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">100</span>));

    <span class="hljs-comment">// localBulkWriter.appendRow(json);</span>
    remoteBulkWriter.<span class="hljs-title function_">appendRow</span>(json);
}

<span class="hljs-comment">// localBulkWriter.commit(false);</span>
remoteBulkWriter.<span class="hljs-title function_">commit</span>(<span class="hljs-literal">false</span>);
<button class="copy-code-btn"></button></code></pre>
<p>Since the schema defined permits dynamic fields, you can also include non-schema-defined fields in the data to insert as follows.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> string

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_random_string</span>(<span class="hljs-params">length=<span class="hljs-number">5</span></span>):
    letters = string.ascii_uppercase
    digits = string.digits
    
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;&#x27;</span>.join(random.choices(letters + digits, k=length))

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10000</span>):
    writer.append_row({
        <span class="hljs-string">&quot;id&quot;</span>: i, 
        <span class="hljs-string">&quot;vector&quot;</span>:[random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">768</span>)],
        <span class="hljs-string">&quot;scalar_1&quot;</span>: generate_random_string(),
        <span class="hljs-string">&quot;scalar_2&quot;</span>: random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">100</span>),
        <span class="hljs-string">&quot;dynamic_field_1&quot;</span>: random.choice([<span class="hljs-literal">True</span>, <span class="hljs-literal">False</span>]),
        <span class="hljs-string">&quot;dynamic_field_2&quot;</span>: random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">100</span>)
    })
    
writer.commit()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">for</span> (int i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10000</span>; i++) {
    <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span> json = <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>();
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;id&quot;</span>, i);
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title function_">get_random_vector</span>(<span class="hljs-number">768</span>));
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-title function_">get_random_string</span>(<span class="hljs-number">20</span>));
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;scalar_2&quot;</span>, (long) (<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">100</span>));
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;dynamic_field_1&quot;</span>, <span class="hljs-title function_">get_random_boolean</span>());
    json.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;dynamic_field_2&quot;</span>, (long) (<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">100</span>));

    <span class="hljs-comment">// localBulkWriter.appendRow(json);</span>
    remoteBulkWriter.<span class="hljs-title function_">appendRow</span>(json);
}

<span class="hljs-comment">// localBulkWriter.commit(false);</span>
remoteBulkWriter.<span class="hljs-title function_">commit</span>(<span class="hljs-literal">false</span>);
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-results" class="common-anchor-header">Verify the results<button data-href="#Verify-the-results" class="anchor-icon" translate="no">
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
<p>To check the results, you can get the actual output path by printing the <code translate="no">batch_files</code> property of the writer.</p>
</div>
<div class="language-java">
<p>To check the results, you can get the actual output path by printing the <code translate="no">getBatchFiles()</code> method of the writer.</p>
</div>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(writer.batch_files)

<span class="hljs-comment"># [[&#x27;d4220a9e-45be-4ccb-8cb5-bf09304b9f23/1.parquet&#x27;],</span>
<span class="hljs-comment">#  [&#x27;d4220a9e-45be-4ccb-8cb5-bf09304b9f23/2.parquet&#x27;]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// localBulkWriter.getBatchFiles();</span>
remoteBulkWriter.<span class="hljs-title function_">getBatchFiles</span>();

<span class="hljs-comment">// </span>

<span class="hljs-comment">// Close the BulkWriter</span>
<span class="hljs-keyword">try</span> {
    localBulkWriter.<span class="hljs-title function_">close</span>();
    remoteBulkWriter.<span class="hljs-title function_">close</span>();            
} <span class="hljs-keyword">catch</span> (<span class="hljs-title class_">Exception</span> e) {
    <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> handle exception</span>
    e.<span class="hljs-title function_">printStackTrace</span>();
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>BulkWriter</strong> generates a UUID, creates a sub-folder using the UUID in the provided output directory, and places all generated files in the sub-folder. <a href="https://assets.zilliz.com/bulk_writer.zip">Click here</a> to download the prepared sample data.</p>
<p>Possible folder structures are as follows:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON</span>
├── folder
│   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
│       └── <span class="hljs-number">1.j</span>son 

<span class="hljs-comment"># Parquet</span>
├── folder
│   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
│       └── <span class="hljs-number">1.</span>parquet 
<button class="copy-code-btn"></button></code></pre>
