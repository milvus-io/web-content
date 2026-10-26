---
id: use-partition-key.md
title: Gunakan Kunci Partisi
summary: >-
  Partition Key adalah solusi optimalisasi pencarian yang didasarkan pada
  partisi. Dengan menetapkan bidang skalar tertentu sebagai Partition Key dan
  menentukan kondisi penyaringan berdasarkan Partition Key tersebut selama
  proses pencarian, cakupan pencarian dapat dipersempit menjadi beberapa
  partisi, sehingga meningkatkan efisiensi pencarian. Artikel ini akan membahas
  cara menggunakan Partition Key serta pertimbangan-pertimbangan terkait.
---
<h1 id="Use-Partition-Key" class="common-anchor-header">Gunakan Kunci Partisi<button data-href="#Use-Partition-Key" class="anchor-icon" translate="no">
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
    </button></h1><p>Kunci Partisi adalah solusi optimasi pencarian yang didasarkan pada partisi. Dengan menetapkan bidang skalar tertentu sebagai Kunci Partisi dan menentukan kondisi penyaringan berdasarkan Kunci Partisi selama proses pencarian, cakupan pencarian dapat dipersempit menjadi beberapa partisi, sehingga meningkatkan efisiensi pencarian. Artikel ini akan menjelaskan cara menggunakan Kunci Partisi serta pertimbangan terkait.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Di Milvus, Anda dapat menggunakan partisi untuk menerapkan pemisahan data dan meningkatkan kinerja pencarian dengan membatasi cakupan pencarian ke partisi tertentu. Jika Anda memilih untuk mengelola partisi secara manual, Anda dapat membuat maksimal 1.024 partisi dalam sebuah koleksi, dan menyisipkan entitas ke dalam partisi-partisi tersebut berdasarkan aturan tertentu sehingga Anda dapat mempersempit cakupan pencarian dengan membatasi pencarian pada sejumlah partisi tertentu.</p>
<p>Milvus memperkenalkan Partition Key agar Anda dapat menggunakan kembali partisi dalam pemisahan data untuk mengatasi batasan jumlah partisi yang dapat Anda buat dalam sebuah koleksi. Saat membuat koleksi, Anda dapat menggunakan bidang skalar sebagai Partition Key. Setelah koleksi siap, Milvus akan membuat jumlah partisi yang ditentukan di dalam koleksi tersebut. Setelah menerima entitas yang dimasukkan, Milvus menghitung nilai hash menggunakan nilai Kunci Partisi entitas tersebut, menjalankan operasi modulo berdasarkan nilai hash dan properti ` <code translate="no">partitions_num</code> ` koleksi untuk mendapatkan ID partisi tujuan, dan menyimpan entitas tersebut di partisi tujuan.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/partition-vs-partition-key.png" alt="Partition Vs Partition Key" class="doc-image" id="partition-vs-partition-key" /> 
   <span>Partisi vs Kunci Partisi</span>
  
 </span></p>
<p>Gambar berikut menggambarkan bagaimana Milvus memproses permintaan pencarian dalam sebuah koleksi dengan atau tanpa fitur Kunci Partisi yang diaktifkan.</p>
<ul>
<li><p>Jika Partition Key dinonaktifkan, Milvus mencari entitas yang paling mirip dengan vektor kueri di dalam koleksi. Anda dapat mempersempit cakupan pencarian jika mengetahui partisi mana yang berisi hasil paling relevan.</p></li>
<li><p>Jika Kunci Partisi diaktifkan, Milvus menentukan cakupan pencarian berdasarkan nilai Kunci Partisi yang ditentukan dalam filter pencarian dan hanya memindai entitas di dalam partisi yang cocok.</p></li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/with-and-without-partition-key.png" alt="With And Without Partition Key" class="doc-image" id="with-and-without-partition-key" /> 
   <span>Dengan dan Tanpa Partition Key</span>
  
 </span></p>
<h2 id="Use-Partition-Key" class="common-anchor-header">Gunakan Partition Key<button data-href="#Use-Partition-Key" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menggunakan Partition Key, Anda perlu</p>
<ul>
<li><p><a href="/docs/id/use-partition-key.md#Set-Partition-Key">Menetapkan Kunci Partisi</a>,</p></li>
<li><p><a href="/docs/id/use-partition-key.md#Set-Partition-Numbers">Menentukan jumlah partisi yang akan dibuat</a> (Opsional),</p></li>
<li><p><a href="/docs/id/use-partition-key.md#Create-Filtering-Condition">Membuat kondisi penyaringan berdasarkan Kunci Partisi</a>, dan</p></li>
<li><p><a href="/docs/id/use-partition-key.md#Index-Partition-Key">Membuat indeks Kunci Partisi</a> (Disarankan).</p></li>
</ul>
<h3 id="Set-Partition-Key" class="common-anchor-header">Menetapkan Kunci Partisi<button data-href="#Set-Partition-Key" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk menetapkan bidang skalar sebagai Kunci Partisi, Anda perlu mengatur atribut ` <code translate="no">is_partition_key</code> `-nya menjadi ` <code translate="no">true</code> ` saat menambahkan bidang skalar tersebut.</p>
<div class="alert note">
<p>Saat Anda menetapkan bidang skalar sebagai Kunci Partisi, nilai bidang tersebut tidak boleh kosong atau null.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient, DataType
)

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

schema = client.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>)
    
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>)

<span class="hljs-comment"># Add the partition key</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>, 
    datatype=DataType.VARCHAR, 
    max_length=<span class="hljs-number">512</span>,
<span class="highlighted-wrapper-line">    is_partition_key=<span class="hljs-literal">True</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-comment">// Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());
        
<span class="hljs-comment">// Add the partition key</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
<span class="highlighted-wrapper-line">        .isPartitionKey(<span class="hljs-literal">true</span>)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">false</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;my_varchar&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithIsPartitionKey(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">512</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// 3. Create a collection in customized setup mode</span>
<span class="hljs-comment">// 3.1 Define fields</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-attr">is_partition_key</span>: <span class="hljs-literal">true</span></span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            },
            {
                &quot;fieldName&quot;: &quot;my_varchar&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;isPartitionKey&quot;: true,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 512
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Partition-Numbers" class="common-anchor-header">Menetapkan Jumlah Partisi<button data-href="#Set-Partition-Numbers" class="anchor-icon" translate="no">
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
    </button></h3><p>Saat Anda menetapkan bidang skalar dalam koleksi sebagai Kunci Partisi, Milvus secara otomatis membuat 16 partisi dalam koleksi tersebut. Setelah menerima suatu entitas, Milvus memilih partisi berdasarkan nilai Kunci Partisi entitas tersebut dan menyimpan entitas tersebut di partisi tersebut, sehingga sebagian atau seluruh partisi menyimpan entitas dengan nilai Kunci Partisi yang berbeda-beda.</p>
<p>Anda juga dapat menentukan jumlah partisi yang akan dibuat bersamaan dengan koleksi. Hal ini hanya berlaku jika Anda memiliki bidang skalar yang ditetapkan sebagai Kunci Partisi.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    num_partitions=<span class="hljs-number">128</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
                .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
                .collectionSchema(schema)
                .numPartitions(<span class="hljs-number">128</span>)
                .build();
        client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithNumPartitions(<span class="hljs-number">128</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">create_collection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">num_partitions</span>: <span class="hljs-number">128</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;partitionsNum&quot;: 128
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Filtering-Condition" class="common-anchor-header">Membuat Kondisi Penyaringan<button data-href="#Create-Filtering-Condition" class="anchor-icon" translate="no">
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
    </button></h3><p>Saat melakukan pencarian ANN dalam koleksi dengan fitur Partition Key diaktifkan, Anda perlu menyertakan ekspresi penyaringan yang melibatkan Partition Key dalam permintaan pencarian. Dalam ekspresi penyaringan tersebut, Anda dapat membatasi nilai Partition Key dalam rentang tertentu sehingga Milvus membatasi cakupan pencarian hanya pada partisi yang sesuai.</p>
<p>Saat melakukan operasi penghapusan, disarankan untuk menyertakan ekspresi penyaringan yang menentukan satu Kunci Partisi untuk mencapai penghapusan yang lebih efisien. Pendekatan ini membatasi operasi penghapusan pada partisi tertentu, sehingga mengurangi amplifikasi penulisan selama pemadatan dan menghemat sumber daya untuk pemadatan dan pengindeksan.</p>
<p>Contoh-contoh berikut menunjukkan penyaringan berbasis Partition Key berdasarkan nilai Partition Key tertentu dan sekumpulan nilai Partition Key.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Filter based on a single partition key value, or</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>

<span class="hljs-comment"># Filter based on multiple partition key values</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Filter based on a single partition key value, or</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;partition_key == &#x27;x&#x27; &amp;&amp; &lt;other conditions&gt;&quot;</span>;

<span class="hljs-comment">// Filter based on multiple partition key values</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;partition_key in [&#x27;x&#x27;, &#x27;y&#x27;, &#x27;z&#x27;] &amp;&amp; &lt;other conditions&gt;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Filter based on a single partition key value, or</span>
filter = <span class="hljs-string">&quot;partition_key == &#x27;x&#x27; &amp;&amp; &lt;other conditions&gt;&quot;</span>

<span class="hljs-comment">// Filter based on multiple partition key values</span>
filter = <span class="hljs-string">&quot;partition_key in [&#x27;x&#x27;, &#x27;y&#x27;, &#x27;z&#x27;] &amp;&amp; &lt;other conditions&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Filter based on a single partition key value, or</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>

<span class="hljs-comment">// Filter based on multiple partition key values</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Filter based on a single partition key value, or</span>
<span class="hljs-built_in">export</span> filter=<span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>

<span class="hljs-comment"># Filter based on multiple partition key values</span>
<span class="hljs-built_in">export</span> filter=<span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Anda harus mengganti ` <code translate="no">partition_key</code> ` dengan nama bidang yang ditetapkan sebagai kunci partisi.</p>
</div>
<h3 id="Index-Partition-Key" class="common-anchor-header">Indeks Kunci Partisi<button data-href="#Index-Partition-Key" class="anchor-icon" translate="no">
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
    </button></h3><p>Kami menyarankan Anda membuat indeks skalar pada bidang Kunci Partisi.</p>
<p>Partition Key mempersempit pencarian ke partisi-partisi yang mungkin menyimpan nilai Partition Key yang cocok. Namun, setiap partisi biasanya menyimpan entitas dengan banyak nilai Partition Key yang berbeda, sehingga Milvus tetap mengevaluasi filter berbasis Partition Key terhadap setiap entitas di partisi yang dicari. Tanpa indeks skalar pada bidang tersebut, evaluasi tersebut berupa pemindaian penuh terhadap nilai-nilai bidang, yang dapat memakan porsi besar dari latensi pencarian pada koleksi besar. Dengan indeks skalar, Milvus justru mencari entitas yang cocok di dalam indeks.</p>
<p>Evaluasi ini terjadi terlepas dari jenis indeks vektor yang digunakan. Milvus dapat menyematkan nilai Partition Key ke dalam indeks vektor keluarga HNSW sehingga pencarian yang difilter berdasarkan Partition Key hanya menjelajahi sub-indeks yang relevan, tetapi optimasi tersebut hanya mempersempit jangkauan penjelajahan vektor — hal itu tidak menghilangkan evaluasi filter. Pencarian yang hanya menyaring berdasarkan bidang skalar tidak memiliki jalan pintas yang setara. Dalam kedua kasus tersebut, indeks skalar pada bidang Kunci Partisi lah yang membuat evaluasi tetap cepat.</p>
<p>Pilih jenis indeks berdasarkan bidang Kunci Partisi:</p>
<ul>
<li><p><a href="/docs/id/inverted.md">INVERTED</a> cocok untuk sebagian besar bidang Kunci Partisi, karena filter berbasis Kunci Partisi menggunakan kondisi " <code translate="no">==</code> " dan " <code translate="no">in</code> ".</p></li>
<li><p><a href="/docs/id/bitmap.md">BITMAP</a> cocok untuk bidang dengan sedikit nilai unik. Sebagai pedoman umum, gunakan hanya jika bidang tersebut memiliki kurang dari 500 nilai unik.</p></li>
<li><p><a href="/docs/id/stl-sort.md">STL_SORT</a> merupakan alternatif untuk bidang numerik dan bidang " <code translate="no">VARCHAR</code> ".</p></li>
</ul>
<p>Contoh berikut menambahkan indeks <code translate="no">INVERTED</code> pada bidang Partition Key ke parameter indeks koleksi, bersama dengan indeks pada bidang vektor.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

<span class="hljs-comment"># Index the partition key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span></span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());

<span class="hljs-comment">// Index the partition key</span>
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)
<span class="highlighted-wrapper-line">        .indexType(IndexParam.IndexType.INVERTED)</span>
        .build());

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOptions := []milvusclient.CreateIndexOption{
    milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>,
        index.NewAutoIndex(entity.COSINE)),
    <span class="hljs-comment">// Index the partition key</span>
    milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;my_varchar&quot;</span>,
        index.NewInvertedIndex()),
}

<span class="hljs-keyword">for</span> _, opt := <span class="hljs-keyword">range</span> indexOptions {
    indexTask, err := client.CreateIndex(ctx, opt)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        fmt.Println(err.Error())
        <span class="hljs-comment">// handle error</span>
    }
    err = indexTask.Await(ctx)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>
},{
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-comment">// Index the partition key</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span></span>
}]

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>(index_params)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;vector&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexName&quot;: &quot;vector&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        },
        {
            &quot;fieldName&quot;: &quot;my_varchar&quot;,
            &quot;indexName&quot;: &quot;my_varchar&quot;,
            &quot;indexType&quot;: &quot;INVERTED&quot;
        }
    ]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Berikan parameter indeks ini saat Anda membuat koleksi, atau buat indeks pada koleksi yang sudah ada. Untuk detailnya, lihat <a href="/docs/id/create-collection.md">Membuat Koleksi</a>.</p>
<h2 id="Use-Partition-Key-Isolation" class="common-anchor-header">Gunakan Isolasi Kunci Partisi<button data-href="#Use-Partition-Key-Isolation" class="anchor-icon" translate="no">
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
    </button></h2><p>Dalam skenario multi-tenancy, Anda dapat menetapkan bidang skalar yang terkait dengan identitas penyewa sebagai kunci partisi dan membuat filter berdasarkan nilai tertentu dalam bidang skalar ini. Untuk lebih meningkatkan kinerja pencarian dalam skenario serupa, Milvus memperkenalkan fitur Isolasi Kunci Partisi.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/partition-key-isolation.png" alt="Partition Key Isolation" class="doc-image" id="partition-key-isolation" /> 
   <span>Isolasi Kunci Partisi</span>
  
 </span></p>
<p>Seperti yang ditunjukkan pada gambar di atas, Milvus mengelompokkan entitas berdasarkan nilai Kunci Partisi dan membuat indeks terpisah untuk masing-masing kelompok tersebut. Setelah menerima permintaan pencarian, Milvus menemukan indeks berdasarkan nilai Kunci Partisi yang ditentukan dalam kondisi penyaringan dan membatasi cakupan pencarian hanya pada entitas yang termasuk dalam indeks tersebut, sehingga menghindari pemindaian entitas yang tidak relevan selama pencarian dan secara signifikan meningkatkan kinerja pencarian.</p>
<p>Setelah Anda mengaktifkan Isolasi Kunci Partisi, Anda harus menyertakan hanya satu nilai spesifik dalam filter berbasis Kunci Partisi agar Milvus dapat membatasi cakupan pencarian hanya pada entitas yang tercakup dalam indeks yang sesuai.</p>
<div class="alert note">
<p>Saat ini, fitur Isolasi Kunci Partisi hanya berlaku untuk pencarian dengan jenis indeks yang ditetapkan ke HNSW.</p>
</div>
<p>Partition Key Isolation tidak menggantikan indeks skalar pada bidang Partition Key. Nilai Partition Key dalam filter menemukan sub-indeks yang cocok, tetapi Milvus tetap mengevaluasi filter itu sendiri untuk mengidentifikasi entitas yang cocok, jadi kami menyarankan Anda juga <a href="/docs/id/use-partition-key.md#Index-Partition-Key">mengindeks Partition Key</a>.</p>
<h3 id="Enable-Partition-Key-Isolation" class="common-anchor-header">Aktifkan Isolasi Kunci Partisi<button data-href="#Enable-Partition-Key-Isolation" class="anchor-icon" translate="no">
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
    </button></h3><p>Contoh kode berikut menunjukkan cara mengaktifkan Isolasi Kunci Partisi.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    properties={<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>: <span class="hljs-literal">True</span>}</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
properties.put(<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .properties(properties)
        .build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithProperty(<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>, <span class="hljs-literal">true</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;partitionkey.isolation&quot;</span>: <span class="hljs-literal">true</span>
    }
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;partitionKeyIsolation&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setelah Anda mengaktifkan Isolasi Kunci Partisi, Anda masih dapat mengatur Kunci Partisi dan jumlah partisi seperti yang dijelaskan dalam <a href="/docs/id/use-partition-key.md#Set-Partition-Numbers">Menetapkan Nomor Partisi</a>. Perhatikan bahwa filter berbasis Kunci Partisi hanya boleh menyertakan nilai Kunci Partisi tertentu.</p>
