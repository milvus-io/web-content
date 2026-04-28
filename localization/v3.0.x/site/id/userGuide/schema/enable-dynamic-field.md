---
id: enable-dynamic-field.md
title: Bidang Dinamis
summary: >-
  Milvus memungkinkan Anda untuk menyisipkan entitas dengan struktur yang
  fleksibel dan berkembang melalui fitur khusus yang disebut bidang dinamis.
  Bidang ini diimplementasikan sebagai bidang JSON tersembunyi bernama $meta,
  yang secara otomatis menyimpan bidang apa pun dalam data Anda yang tidak
  secara eksplisit didefinisikan dalam skema koleksi.
---
<h1 id="Dynamic-Field" class="common-anchor-header">Bidang Dinamis<button data-href="#Dynamic-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus memungkinkan Anda untuk menyisipkan entitas dengan struktur yang fleksibel dan terus berkembang melalui fitur khusus yang disebut <strong>bidang dinamis</strong>. Field ini diimplementasikan sebagai field JSON tersembunyi bernama <code translate="no">$meta</code>, yang secara otomatis menyimpan field apa pun dalam data Anda yang <strong>tidak secara eksplisit didefinisikan</strong> dalam skema koleksi.</p>
<h2 id="How-it-works" class="common-anchor-header">Bagaimana cara kerjanya<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Ketika bidang dinamis diaktifkan, Milvus menambahkan bidang <code translate="no">$meta</code> yang tersembunyi ke setiap entitas. Bidang ini bertipe JSON, yang berarti dapat menyimpan struktur data apa pun yang kompatibel dengan JSON dan dapat diindeks menggunakan sintaksis jalur JSON.</p>
<p>Selama penyisipan data, setiap field yang tidak dideklarasikan dalam skema secara otomatis disimpan sebagai pasangan key-value di dalam field dinamis ini.</p>
<p>Anda tidak perlu mengelola <code translate="no">$meta</code> secara manual-Milvus menanganinya secara transparan.</p>
<p>Sebagai contoh, jika skema koleksi Anda hanya mendefinisikan <code translate="no">id</code> dan <code translate="no">vector</code>, dan Anda memasukkan entitas berikut ini:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Item A&quot;</span><span class="hljs-punctuation">,</span>    <span class="hljs-comment">// Not in schema</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;books&quot;</span>  <span class="hljs-comment">// Not in schema</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dengan mengaktifkan fitur bidang dinamis, Milvus akan menyimpannya secara internal sebagai:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">&quot;$meta&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="highlighted-comment-line">    <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Item A&quot;</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;books&quot;</span></span>
<span class="highlighted-comment-line">  <span class="hljs-punctuation">}</span></span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Hal ini memungkinkan Anda untuk mengembangkan struktur data Anda tanpa mengubah skema.</p>
<p>Kasus penggunaan yang umum meliputi:</p>
<ul>
<li><p>Menyimpan bidang opsional atau bidang yang jarang diambil</p></li>
<li><p>Menangkap metadata yang bervariasi berdasarkan entitas</p></li>
<li><p>Mendukung pemfilteran yang fleksibel melalui indeks pada kunci bidang dinamis tertentu</p></li>
</ul>
<h2 id="Supported-data-types" class="common-anchor-header">Tipe data yang didukung<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Bidang dinamis mendukung semua tipe data skalar yang disediakan oleh Milvus, termasuk nilai sederhana dan kompleks. Tipe data ini berlaku untuk **nilai kunci yang disimpan di <code translate="no">$meta</code>.</p>
<p><strong>Tipe-tipe yang didukung meliputi:</strong></p>
<ul>
<li><p>String (<code translate="no">VARCHAR</code>)</p></li>
<li><p>Bilangan bulat (<code translate="no">INT8</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>)</p></li>
<li><p>Titik mengambang (<code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>)</p></li>
<li><p>Boolean (<code translate="no">BOOL</code>)</p></li>
<li><p>Larik nilai skalar (<code translate="no">ARRAY</code>)</p></li>
<li><p>Objek JSON (<code translate="no">JSON</code>)</p></li>
</ul>
<p><strong>Contoh:</strong></p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Acme&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">29.99</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;new&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;hot&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;specs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;weight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;1.2kg&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;dimensions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;width&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;height&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span> <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Masing-masing kunci dan nilai di atas akan disimpan di dalam bidang <code translate="no">$meta</code>.</p>
<h2 id="Enable-dynamic-field" class="common-anchor-header">Mengaktifkan bidang dinamis<button data-href="#Enable-dynamic-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menggunakan fitur bidang dinamis, setel <code translate="no">enable_dynamic_field=True</code> saat membuat skema koleksi:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Initialize client</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create schema with dynamic field enabled</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
<span class="highlighted-wrapper-line">    enable_dynamic_field=<span class="hljs-literal">True</span>,</span>
)

<span class="hljs-comment"># Add explicitly defined fields</span>
schema.add_field(field_name=<span class="hljs-string">&quot;my_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

<span class="hljs-comment"># Create the collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">true</span>)
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">CreateCollectionReq</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-comment">// Initialize client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;localhost:19530&#x27;</span> });

<span class="hljs-comment">// Create collection</span>
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
  <span class="hljs-attr">schema</span>:  [
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;my_id&#x27;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;my_vector&#x27;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">type_params</span>: {
          <span class="hljs-attr">dim</span>: <span class="hljs-string">&#x27;5&#x27;</span>,
      }
   ],
   <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">true</span>
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">true</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;my_id&quot;</span>).pk
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;my_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> myIdField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;my_id&quot;,
  &quot;dataType&quot;: &quot;Int64&quot;,
  &quot;isPrimary&quot;: true,
  &quot;autoID&quot;: false
}&#x27;</span>

<span class="hljs-built_in">export</span> myVectorField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;my_vector&quot;,
  &quot;dataType&quot;: &quot;FloatVector&quot;,
  &quot;elementTypeParams&quot;: {
    &quot;dim&quot;: 5
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
  \&quot;autoID\&quot;: false,
  \&quot;enableDynamicField\&quot;: true,
  \&quot;fields\&quot;: [
    <span class="hljs-variable">$myIdField</span>,
    <span class="hljs-variable">$myVectorField</span>
  ]
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
  \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-entities-to-the-collection" class="common-anchor-header">Menyisipkan entitas ke dalam koleksi<button data-href="#Insert-entities-to-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Bidang dinamis memungkinkan Anda menyisipkan bidang tambahan yang tidak didefinisikan dalam skema. Bidang ini akan disimpan secara otomatis di <code translate="no">$meta</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">entities = [
    {
        <span class="hljs-string">&quot;my_id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-comment"># Explicitly defined primary field</span>
        <span class="hljs-string">&quot;my_vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-comment"># Explicitly defined vector field</span>
        <span class="hljs-string">&quot;overview&quot;</span>: <span class="hljs-string">&quot;Great product&quot;</span>,       <span class="hljs-comment"># Scalar key not defined in schema</span>
        <span class="hljs-string">&quot;words&quot;</span>: <span class="hljs-number">150</span>,                      <span class="hljs-comment"># Scalar key not defined in schema</span>
        <span class="hljs-string">&quot;dynamic_json&quot;</span>: {                  <span class="hljs-comment"># JSON key not defined in schema</span>
            <span class="hljs-string">&quot;varchar&quot;</span>: <span class="hljs-string">&quot;some text&quot;</span>,
            <span class="hljs-string">&quot;nested&quot;</span>: {
                <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-number">42.5</span>
            },
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>        <span class="hljs-comment"># Number stored as string</span>
        }
    }
]

client.insert(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;my_id&quot;</span>, <span class="hljs-number">1</span>);
row.add(<span class="hljs-string">&quot;my_vector&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>)));
row.addProperty(<span class="hljs-string">&quot;overview&quot;</span>, <span class="hljs-string">&quot;Great product&quot;</span>);
row.addProperty(<span class="hljs-string">&quot;words&quot;</span>, <span class="hljs-number">150</span>);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">dynamic</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
dynamic.addProperty(<span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">&quot;some text&quot;</span>);
dynamic.addProperty(<span class="hljs-string">&quot;string_price&quot;</span>, <span class="hljs-string">&quot;99.99&quot;</span>);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">nested</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
nested.addProperty(<span class="hljs-string">&quot;value&quot;</span>, <span class="hljs-number">42.5</span>);

dynamic.add(<span class="hljs-string">&quot;nested&quot;</span>, nested);
row.add(<span class="hljs-string">&quot;dynamic_json&quot;</span>, dynamic);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(row))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">const</span> entities = [
  {
    <span class="hljs-attr">my_id</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">my_vector</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
    <span class="hljs-attr">overview</span>: <span class="hljs-string">&#x27;Great product&#x27;</span>,
    <span class="hljs-attr">words</span>: <span class="hljs-number">150</span>,
    <span class="hljs-attr">dynamic_json</span>: {
      <span class="hljs-attr">varchar</span>: <span class="hljs-string">&#x27;some text&#x27;</span>,
      <span class="hljs-attr">nested</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-number">42.5</span>,
      },
      <span class="hljs-attr">string_price</span>: <span class="hljs-string">&#x27;99.99&#x27;</span>,
    },
  },
];
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">data</span>: entities,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;my_id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;my_vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>},
    }).WithColumns(
    column.NewColumnVarChar(<span class="hljs-string">&quot;overview&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Great product&quot;</span>}),
    column.NewColumnInt32(<span class="hljs-string">&quot;words&quot;</span>, []<span class="hljs-type">int32</span>{<span class="hljs-number">150</span>}),
    column.NewColumnJSONBytes(<span class="hljs-string">&quot;dynamic_json&quot;</span>, [][]<span class="hljs-type">byte</span>{
        []<span class="hljs-type">byte</span>(<span class="hljs-string">`{
            varchar: &#x27;some text&#x27;,
            nested: {
                value: 42.5,
            },
            string_price: &#x27;99.99&#x27;,
        }`</span>),
    }),
))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
  &quot;data&quot;: [
    {
      &quot;my_id&quot;: 1,
      &quot;my_vector&quot;: [0.1, 0.2, 0.3, 0.4, 0.5],
      &quot;overview&quot;: &quot;Great product&quot;,
      &quot;words&quot;: 150,
      &quot;dynamic_json&quot;: {
        &quot;varchar&quot;: &quot;some text&quot;,
        &quot;nested&quot;: {
          &quot;value&quot;: 42.5
        },
        &quot;string_price&quot;: &quot;99.99&quot;
      }
    }
  ],
  &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-keys-in-the-dynamic-field--Milvus-2511+" class="common-anchor-header">Kunci indeks dalam bidang dinamis<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Index-keys-in-the-dynamic-field--Milvus-2511+" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus memungkinkan Anda menggunakan <strong>pengindeksan jalur JSON</strong> untuk membuat indeks pada kunci tertentu di dalam bidang dinamis. Ini dapat berupa nilai skalar atau nilai bersarang dalam objek JSON.</p>
<div class="alert note">
<p>Mengindeks kunci bidang dinamis bersifat <strong>opsional</strong>. Anda masih dapat melakukan kueri atau memfilter berdasarkan kunci bidang dinamis tanpa indeks, namun hal ini dapat mengakibatkan kinerja yang lebih lambat karena pencarian secara brute force.</p>
</div>
<h3 id="JSON-path-indexing-syntax" class="common-anchor-header">Sintaks pengindeksan jalur JSON</h3><p>Untuk membuat indeks jalur JSON, tentukan:</p>
<ul>
<li><p><strong>Jalur JSON</strong> (<code translate="no">json_path</code>): Jalur ke kunci atau bidang bersarang di dalam objek JSON yang ingin Anda indeks.</p>
<ul>
<li><p>Contoh: <code translate="no">metadata[&quot;category&quot;]</code></p>
<p>Ini menentukan di mana mesin pengindeks harus mencari di dalam struktur JSON.</p></li>
</ul></li>
<li><p><strong>Tipe cast JSON</strong> (<code translate="no">json_cast_type</code>): Tipe data yang harus digunakan Milvus ketika menginterpretasikan dan mengindeks nilai pada jalur yang ditentukan.</p>
<ul>
<li><p>Tipe ini harus sesuai dengan tipe data aktual dari bidang yang diindeks.</p></li>
<li><p>Untuk daftar lengkapnya, lihat <a href="/docs/id/use-json-fields.md#Supported-JSON-cast-types">Jenis cast JSON yang didukung</a>.</p></li>
</ul></li>
</ul>
<h3 id="Use-JSON-path-to-index-dynamic-field-keys" class="common-anchor-header">Menggunakan jalur JSON untuk mengindeks kunci bidang dinamis</h3><p>Karena bidang dinamis adalah bidang JSON, Anda dapat mengindeks kunci apa pun di dalamnya menggunakan sintaksis jalur JSON. Ini berfungsi baik untuk nilai skalar sederhana maupun struktur bertingkat yang kompleks.</p>
<p><strong>Contoh jalur JSON:</strong></p>
<ul>
<li><p>Untuk kunci sederhana: <code translate="no">overview</code>, <code translate="no">words</code></p></li>
<li><p>Untuk kunci bersarang: <code translate="no">dynamic_json['varchar']</code>, <code translate="no">dynamic_json['nested']['value']</code></p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Index a simple string key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;overview&quot;</span>,  <span class="hljs-comment"># Key name in the dynamic field</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;overview_index&quot;</span>,  <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>,   <span class="hljs-comment"># Data type that Milvus uses when indexing the values</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;overview&quot;</span>        <span class="hljs-comment"># JSON path to the key</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Index a simple numeric key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;words&quot;</span>,  <span class="hljs-comment"># Key name in the dynamic field</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;words_index&quot;</span>,  <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>,  <span class="hljs-comment"># Data type that Milvus uses when indexing the values</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;words&quot;</span> <span class="hljs-comment"># JSON path to the key</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Index a nested key within a JSON object</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dynamic_json&quot;</span>, <span class="hljs-comment"># JSON key name in the dynamic field</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;json_varchar_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-comment"># Data type that Milvus uses when indexing the values</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span> <span class="hljs-comment"># JSON path to the nested key</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Index a deeply nested key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dynamic_json&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;json_nested_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;nested&#x27;][&#x27;value&#x27;]&quot;</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String,Object&gt; extraParams1 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams1.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;overview&quot;</span>);
extraParams1.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;overview&quot;</span>)
        .indexName(<span class="hljs-string">&quot;overview_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams1)
        .build());

Map&lt;String,Object&gt; extraParams2 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams2.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;words&quot;</span>);
extraParams2.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;double&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;words&quot;</span>)
        .indexName(<span class="hljs-string">&quot;words_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams2)
        .build());

Map&lt;String,Object&gt; extraParams3 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams3.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span>);
extraParams3.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;dynamic_json&quot;</span>)
        .indexName(<span class="hljs-string">&quot;json_varchar_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams3)
        .build());

Map&lt;String,Object&gt; extraParams4 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams4.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;nested&#x27;][&#x27;value&#x27;]&quot;</span>);
extraParams4.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;double&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;dynamic_json&quot;</span>)
        .indexName(<span class="hljs-string">&quot;json_nested_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams4)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = [
    {
      <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;overview&#x27;</span>,
      <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;overview_index&#x27;</span>,
      <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;NONE&#x27;</span>,
      <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;overview&#x27;</span>,
        <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&#x27;varchar&#x27;</span>,
      },
    },
    {
      <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;words&#x27;</span>,
      <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;words_index&#x27;</span>,
      <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;NONE&#x27;</span>,
      <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;words&#x27;</span>,
        <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&#x27;double&#x27;</span>,
      },
    },
    {
      <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;dynamic_json&#x27;</span>,
      <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;json_varchar_index&#x27;</span>,
      <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;NONE&#x27;</span>,
      <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&#x27;varchar&#x27;</span>,
        <span class="hljs-attr">json_path</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span>,
      },
    },
    {
      <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;dynamic_json&#x27;</span>,
      <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;json_nested_index&#x27;</span>,
      <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;NONE&#x27;</span>,
      <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&#x27;double&#x27;</span>,
        <span class="hljs-attr">json_path</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;nested&#x27;][&#x27;value&#x27;]&quot;</span>,
      },
    },
  ];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
)

jsonIndex1 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">&quot;overview&quot;</span>)
    .WithIndexName(<span class="hljs-string">&quot;overview_index&quot;</span>)
jsonIndex2 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">&quot;words&quot;</span>)
    .WithIndexName(<span class="hljs-string">&quot;words_index&quot;</span>)
jsonIndex3 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">`dynamic_json[&#x27;varchar&#x27;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;json_varchar_index&quot;</span>)
jsonIndex4 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`dynamic_json[&#x27;nested&#x27;][&#x27;value&#x27;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;json_nested_index&quot;</span>)

indexOpt1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;overview&quot;</span>, jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;words&quot;</span>, jsonIndex2)
indexOpt3 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;dynamic_json&quot;</span>, jsonIndex3)
indexOpt4 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;dynamic_json&quot;</span>, jsonIndex4)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> overviewIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;dynamic_json&quot;,
  &quot;indexName&quot;: &quot;overview_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_cast_type&quot;: &quot;varchar&quot;,
    &quot;json_path&quot;: &quot;dynamic_json[\&quot;overview\&quot;]&quot;
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> wordsIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;dynamic_json&quot;,
  &quot;indexName&quot;: &quot;words_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_cast_type&quot;: &quot;double&quot;,
    &quot;json_path&quot;: &quot;dynamic_json[\&quot;words\&quot;]&quot;
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> varcharIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;dynamic_json&quot;,
  &quot;indexName&quot;: &quot;json_varchar_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_cast_type&quot;: &quot;varchar&quot;,
    &quot;json_path&quot;: &quot;dynamic_json[\&quot;varchar\&quot;]&quot;
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> nestedIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;dynamic_json&quot;,
  &quot;indexName&quot;: &quot;json_nested_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_cast_type&quot;: &quot;double&quot;,
          &quot;json_path&quot;: &quot;dynamic_json[\&quot;nested\&quot;][\&quot;value\&quot;]&quot;
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Use-JSON-cast-functions-for-type-conversion--Milvus-2514+" class="common-anchor-header">Gunakan fungsi cast JSON untuk konversi tipe<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.14+</span></h3><p>Jika kunci bidang dinamis berisi nilai dalam format yang salah, (misalnya angka yang disimpan sebagai string), Anda dapat menggunakan fungsi cast untuk mengonversinya:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Convert a string to double before indexing</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dynamic_json&quot;</span>, <span class="hljs-comment"># JSON key name</span>
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_string_price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;string_price&#x27;]&quot;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-comment"># Must be the output type of the cast function</span>
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span> <span class="hljs-comment"># Case insensitive; convert string to double</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String,Object&gt; extraParams5 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams5.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;string_price&#x27;]&quot;</span>);
extraParams5.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;double&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;dynamic_json&quot;</span>)
        .indexName(<span class="hljs-string">&quot;json_string_price_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams5)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;dynamic_json&#x27;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;json_string_price_index&#x27;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;NONE&#x27;</span>,
    <span class="hljs-attr">params</span>: {
      <span class="hljs-attr">json_path</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;string_price&#x27;]&quot;</span>,
      <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&#x27;double&#x27;</span>,
      <span class="hljs-attr">json_cast_function</span>: <span class="hljs-string">&#x27;STRING_TO_DOUBLE&#x27;</span>,
    },
  });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">jsonIndex5 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`dynamic_json[&#x27;string_price&#x27;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;json_string_price_index&quot;</span>)
indexOpt5 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;dynamic_json&quot;</span>, jsonIndex5)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> stringPriceIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;dynamic_json&quot;,
  &quot;indexName&quot;: &quot;json_string_price_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;dynamic_json[\&quot;string_price\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;double&quot;,
    &quot;json_cast_function&quot;: &quot;STRING_TO_DOUBLE&quot;
  }
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>Jika konversi tipe gagal (misalnya, nilai <code translate="no">&quot;not_a_number&quot;</code> tidak dapat dikonversi menjadi angka), nilai tersebut akan dilewati dan tidak diindeks.</p></li>
<li><p>Untuk detail tentang parameter fungsi cast, lihat <a href="/docs/id/use-json-fields.md#Use-JSON-cast-functions-for-type-conversion">Bidang JSON</a>.</p></li>
</ul>
</div>
<h3 id="Apply-indexes-to-the-collection" class="common-anchor-header">Menerapkan indeks ke koleksi</h3><p>Setelah mendefinisikan parameter indeks, Anda dapat menerapkannya ke koleksi menggunakan <code translate="no">create_index()</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">  <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>(indexParams);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexTask1, err := client.CreateIndex(ctx, indexOpt1)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask2, err := client.CreateIndex(ctx, indexOpt2)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask3, err := client.CreateIndex(ctx, indexOpt3)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask4, err := client.CreateIndex(ctx, indexOpt4)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask5, err := client.CreateIndex(ctx, indexOpt5)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&quot;[
  <span class="hljs-variable">$varcharIndex</span>,
  <span class="hljs-variable">$nestedIndex</span>,
  <span class="hljs-variable">$overviewIndex</span>,
  <span class="hljs-variable">$wordsIndex</span>,
  <span class="hljs-variable">$stringPriceIndex</span>
]&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
  \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Filter-by-dynamic-field-keys" class="common-anchor-header">Memfilter berdasarkan kunci bidang dinamis<button data-href="#Filter-by-dynamic-field-keys" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah menyisipkan entitas dengan kunci bidang dinamis, Anda dapat memfilternya menggunakan ekspresi filter standar.</p>
<ul>
<li><p>Untuk kunci non-JSON (misalnya string, angka, boolean), Anda dapat mereferensikannya dengan nama kunci secara langsung.</p></li>
<li><p>Untuk kunci yang menyimpan objek JSON, gunakan sintaksis jalur JSON untuk mengakses nilai bersarang.</p></li>
</ul>
<p>Berdasarkan<a href="/docs/id/enable-dynamic-field.md#Insert-entities-to-the-collection">contoh entitas</a> dari bagian sebelumnya, ekspresi filter yang valid meliputi:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;overview == &quot;Great product&quot;&#x27;</span>                <span class="hljs-comment"># Non-JSON key</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;words &gt;= 100&#x27;</span>                               <span class="hljs-comment"># Non-JSON key</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;dynamic_json[&quot;nested&quot;][&quot;value&quot;] &lt; 50&#x27;</span>       <span class="hljs-comment"># JSON object key</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;overview == &quot;Great product&quot;&#x27;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;words &gt;= 100&#x27;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;dynamic_json[&quot;nested&quot;][&quot;value&quot;] &lt; 50&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">filter = <span class="hljs-string">&#x27;overview == &quot;Great product&quot;&#x27;</span>                <span class="hljs-comment">// Non-JSON key</span>
filter = <span class="hljs-string">&#x27;words &gt;= 100&#x27;</span>                               <span class="hljs-comment">// Non-JSON key</span>
filter = <span class="hljs-string">&#x27;dynamic_json[&quot;nested&quot;][&quot;value&quot;] &lt; 50&#x27;</span>       <span class="hljs-comment">// JSON object key</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&#x27;overview == &quot;Great product&quot;&#x27;</span>
filter := <span class="hljs-string">&#x27;words &gt;= 100&#x27;</span>
filter := <span class="hljs-string">&#x27;dynamic_json[&quot;nested&quot;][&quot;value&quot;] &lt; 50&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> filterOverview=<span class="hljs-string">&#x27;overview == &quot;Great product&quot;&#x27;</span>
<span class="hljs-built_in">export</span> filterWords=<span class="hljs-string">&#x27;words &gt;= 100&#x27;</span>
<span class="hljs-built_in">export</span> filterNestedValue=<span class="hljs-string">&#x27;dynamic_json[&quot;nested&quot;][&quot;value&quot;] &lt; 50&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Mengambil kunci bidang dinamis</strong>: Untuk mengembalikan kunci bidang dinamis dalam hasil pencarian atau kueri, Anda harus secara eksplisit menentukannya dalam parameter <code translate="no">output_fields</code> menggunakan sintaksis jalur JSON yang sama dengan pemfilteran:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Include dynamic field keys in search results</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                         <span class="hljs-comment"># Filter expression defined earlier</span>
    limit=<span class="hljs-number">10</span>,
<span class="highlighted-comment-line">    output_fields=[</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;overview&quot;</span>,                        <span class="hljs-comment"># Simple dynamic field key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&#x27;dynamic_json[&quot;varchar&quot;]&#x27;</span>          <span class="hljs-comment"># Nested JSON key</span></span>
<span class="highlighted-comment-line">    ]</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>)
        .token(<span class="hljs-string">&quot;YOUR_CLUSTER_TOKEN&quot;</span>)
        .build());

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">5</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;overview&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span>))
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;YOUR_CLUSTER_TOKEN&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">filters</span>: filter,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;overview&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span>]
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>
token := <span class="hljs-string">&quot;YOUR_CLUSTER_TOKEN&quot;</span>

client, err := client.New(ctx, &amp;client.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;my_vector&quot;</span>).
    WithFilter(filter).
    WithOutputFields(<span class="hljs-string">&quot;overview&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;YOUR_CLUSTER_TOKEN&quot;</span>
<span class="hljs-built_in">export</span> FILTER=<span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
  \&quot;data\&quot;: [
    [0.1, 0.2, 0.3, 0.4, 0.5]
  ],
  \&quot;annsField\&quot;: \&quot;my_vector\&quot;,
  \&quot;filter\&quot;: \&quot;<span class="hljs-variable">${FILTER}</span>\&quot;,
  \&quot;limit\&quot;: 5,
  \&quot;outputFields\&quot;: [\&quot;overview\&quot;, \&quot;dynamic_json.varchar\&quot;]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Kunci bidang dinamis tidak disertakan dalam hasil secara default dan harus diminta secara eksplisit.</p>
</div>
<p>Untuk daftar lengkap operator yang didukung dan ekspresi penyaringan, lihat <a href="/docs/id/filtered-search.md">Pencarian yang Difilter</a>.</p>
<h2 id="Put-it-all-together" class="common-anchor-header">Menyatukan semuanya<button data-href="#Put-it-all-together" class="anchor-icon" translate="no">
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
    </button></h2><p>Sekarang, Anda telah mempelajari cara menggunakan bidang dinamis untuk menyimpan dan mengindeks kunci secara fleksibel yang tidak didefinisikan dalam skema. Setelah kunci bidang dinamis dimasukkan, Anda dapat menggunakannya seperti bidang lain dalam ekspresi filter-tidak diperlukan sintaks khusus.</p>
<p>Untuk menyelesaikan alur kerja dalam aplikasi dunia nyata, Anda juga perlu:</p>
<ul>
<li><p><strong>Membuat indeks pada bidang vektor Anda</strong> (wajib untuk setiap koleksi)</p>
<p>Lihat Mengatur <a href="/docs/id/create-collection.md#Optional-Set-Index-Parameters">Parameter Indeks</a></p></li>
<li><p><strong>Memuat koleksi</strong></p>
<p>Lihat <a href="/docs/id/load-and-release.md">Memuat &amp; Melepaskan</a></p></li>
<li><p><strong>Mencari atau membuat kueri menggunakan filter jalur JSON</strong></p>
<p>Lihat <a href="/docs/id/filtered-search.md">Pencarian yang Difilter</a> dan <a href="/docs/id/json-operators.md">Operator JSON</a></p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">PERTANYAAN UMUM<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="When-should-I-define-a-field-explicitly-in-the-schema-instead-of-using-a-dynamic-field-key" class="common-anchor-header">Kapan saya harus mendefinisikan bidang secara eksplisit di dalam skema alih-alih menggunakan kunci bidang dinamis?</h3><p>Anda harus mendefinisikan bidang secara eksplisit dalam skema alih-alih menggunakan kunci bidang dinamis bila:</p>
<ul>
<li><p><strong>Field tersebut sering disertakan dalam output_fields</strong>: Hanya field yang didefinisikan secara eksplisit yang dijamin dapat diambil secara efisien melalui <code translate="no">output_fields</code>. Kunci bidang dinamis tidak dioptimalkan untuk pengambilan frekuensi tinggi dan dapat menimbulkan biaya tambahan kinerja.</p></li>
<li><p><strong>Bidang ini sering diakses atau disaring</strong>: Meskipun pengindeksan kunci bidang dinamis dapat memberikan kinerja pemfilteran yang serupa dengan bidang skema tetap, bidang yang didefinisikan secara eksplisit menawarkan struktur yang lebih jelas dan pemeliharaan yang lebih baik.</p></li>
<li><p><strong>Anda memerlukan kontrol penuh atas perilaku bidang</strong>: Field eksplisit mendukung batasan tingkat skema, validasi, dan pengetikan yang lebih jelas, yang berguna untuk mengelola integritas dan konsistensi data.</p></li>
<li><p><strong>Anda ingin menghindari inkonsistensi pengindeksan</strong>: Data dalam kunci bidang dinamis lebih rentan terhadap ketidakkonsistenan jenis atau struktur. Menggunakan skema tetap membantu memastikan kualitas data, terutama jika Anda berencana menggunakan pengindeksan atau casting.</p></li>
</ul>
<h3 id="Can-I-create-multiple-indexes-on-the-same-dynamic-field-key-with-different-data-types" class="common-anchor-header">Dapatkah saya membuat beberapa indeks pada kunci bidang dinamis yang sama dengan tipe data yang berbeda?</h3><p>Tidak, Anda <strong>hanya</strong> dapat membuat <strong>satu indeks per jalur JSON</strong>. Meskipun kunci bidang dinamis berisi nilai tipe campuran (misalnya, beberapa string dan beberapa angka), Anda harus memilih satu <code translate="no">json_cast_type</code> saat mengindeks jalur tersebut. Beberapa indeks pada kunci yang sama dengan jenis yang berbeda tidak didukung saat ini.</p>
<h3 id="When-indexing-a-dynamic-field-key-what-if-the-data-casting-fails" class="common-anchor-header">Ketika mengindeks kunci bidang dinamis, bagaimana jika casting data gagal?</h3><p>Jika Anda telah membuat indeks pada kunci bidang dinamis dan casting data gagal-misalnya, nilai yang dimaksudkan untuk di-cast ke <code translate="no">double</code> adalah string non-numerik seperti <code translate="no">&quot;abc&quot;</code>-nilai spesifik tersebut akan <strong>dilewati secara diam-diam selama pembuatan indeks</strong>. Nilai tersebut tidak akan muncul dalam indeks dan oleh karena itu <strong>tidak akan dikembalikan dalam hasil pencarian atau kueri berbasis filter</strong> yang mengandalkan indeks.</p>
<p>Ini memiliki beberapa implikasi penting:</p>
<ul>
<li><p><strong>Tidak ada fallback ke pemindaian penuh</strong>: Jika sebagian besar entitas berhasil diindeks, kueri penyaringan akan bergantung sepenuhnya pada indeks. Entitas yang gagal diindeks akan dikecualikan dari kumpulan hasil, meskipun secara logika cocok dengan kondisi filter.</p></li>
<li><p><strong>Risiko akurasi pencarian</strong>: Pada set data besar yang kualitas datanya tidak konsisten (terutama pada kunci bidang dinamis), perilaku ini dapat menyebabkan hasil yang tidak diharapkan. Sangat penting untuk memastikan pemformatan data yang konsisten dan valid sebelum mengindeks.</p></li>
<li><p><strong>Gunakan fungsi cast dengan hati-hati</strong>: Jika Anda menggunakan <code translate="no">json_cast_function</code> untuk mengonversi string menjadi angka selama pengindeksan, pastikan nilai string dapat dikonversi dengan baik. Ketidaksesuaian antara <code translate="no">json_cast_type</code> dan jenis yang dikonversi akan mengakibatkan kesalahan atau entri yang dilewati.</p></li>
</ul>
<h3 id="What-happens-if-my-query-uses-a-different-data-type-than-the-indexed-cast-type" class="common-anchor-header">Apa yang terjadi jika kueri saya menggunakan tipe data yang berbeda dari tipe cast yang diindeks?</h3><p>Jika kueri Anda membandingkan kunci bidang dinamis menggunakan <strong>tipe data yang berbeda</strong> dari yang digunakan dalam indeks (misalnya, kueri dengan perbandingan string saat indeks di-cast ke <code translate="no">double</code>), sistem <strong>tidak</strong> akan <strong>menggunakan indeks tersebut</strong>, dan mungkin kembali ke pemindaian penuh <em>hanya jika memungkinkan</em>. Untuk performa dan akurasi terbaik, pastikan jenis kueri Anda sesuai dengan <code translate="no">json_cast_type</code> yang digunakan selama pembuatan indeks.</p>
