---
id: alter-external-collection-schema.md
title: Mengubah Skema Koleksi EksternalCompatible with Milvus 3.0.x
summary: >-
  Pelajari cara menampilkan kolom tambahan dari sumber data eksternal dalam
  koleksi eksternal yang sudah ada.
beta: Milvus 3.0.x
---
<h1 id="Alter-External-Collection-Schema" class="common-anchor-header">Mengubah Skema Koleksi Eksternal<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Alter-External-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>Sumber data eksternal sering kali mengalami perubahan setelah Anda membuat koleksi eksternal. Misalnya, tabel lakehouse yang sudah menyimpan embeddings mungkin nantinya akan mencakup bidang skalar baru, seperti skor, kategori, atau cap waktu, yang ingin Anda tampilkan dalam hasil kueri atau gunakan dalam filter.</p>
<p>Alih-alih membuat ulang koleksi eksternal atau menyalin data sumber ke Milvus, tambahkan bidang Milvus yang dipetakan ke bidang yang sudah ada di sumber data eksternal. Setelah menambahkan bidang tersebut, segarkan koleksi eksternal agar bidang baru tersebut dapat digunakan dalam kueri dan pencarian.</p>
<h2 id="Limits" class="common-anchor-header">Batasan<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>Koleksi eksternal saat ini mendukung penambahan bidang setelah pembuatan. Perubahan skema lainnya, seperti menghapus bidang, mengganti nama bidang, mengubah tipe data bidang, mengubah dimensi vektor, atau memetakan ulang <code translate="no">external_field</code>, tidak didukung.</li>
<li>Anda hanya dapat menambahkan bidang yang sudah ada di sumber data eksternal. Operasi ini memetakan bidang eksternal yang sudah ada ke bidang Milvus. Operasi ini tidak membuat bidang baru di sumber data eksternal atau mengisi ulang data sumber.</li>
<li>Penambahan bidang <code translate="no">SPARSE_FLOAT_VECTOR</code> ke koleksi eksternal yang sudah ada tidak didukung.</li>
<li>Menambahkan bidang StructArray ke koleksi eksternal yang sudah ada tidak didukung. Jika koleksi eksternal Anda memerlukan bidang StructArray, tentukan bidang tersebut dalam skema koleksi saat Anda membuat koleksi tersebut.</li>
</ul>
<h2 id="Add-a-field" class="common-anchor-header">Menambahkan bidang<button data-href="#Add-a-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum menambahkan bidang ke koleksi eksternal, pastikan bidang tersebut sudah ada di sumber data eksternal. Kemudian panggil ` <code translate="no">add_collection_field()</code> ` untuk menampilkan bidang tersebut di Milvus dengan mengatur ` <code translate="no">external_field</code> ` ke nama bidang di sumber data eksternal. Atur ` <code translate="no">data_type</code> ` ke tipe data Milvus yang sesuai dengan bidang di sumber data eksternal. Misalnya, jika bidang yang dipetakan menyimpan nilai presisi ganda, gunakan ` <code translate="no">DataType.DOUBLE</code>`.</p>
<p>Berbeda dengan koleksi yang dikelola, nilai untuk kolom yang ditambahkan dibaca dari sumber data eksternal setelah Anda menyegarkan koleksi eksternal.</p>
<h3 id="Add-a-scalar-field" class="common-anchor-header">Menambahkan bidang skalar<button data-href="#Add-a-scalar-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan ` <code translate="no">add_collection_field()</code> ` untuk menambahkan bidang skalar jika Anda ingin menampilkan bidang tersebut dalam hasil kueri atau menggunakannya dalam filter. Contoh berikut menambahkan bidang ` <code translate="no">score</code> ` yang dipetakan ke bidang ` <code translate="no">score</code> ` di sumber data eksternal.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   CSharp</a>
 <a href="#bash">   cURL</a>
</div>
```python
from pymilvus import DataType, MilvusClient
<p>client = MilvusClient(
uri="http://localhost:19530",
token="root:Milvus",
)</p>
<p>client.add_collection_field(
collection_name="product_embeddings",
field_name="score",
data_type=DataType.DOUBLE,
nullable=True,
# highlight-next-line
external_field="score",
)</p>
<pre><code translate="no">
```java
<span class="hljs-comment">// Note: milvus-sdk-java does not support adding a field to an</span>
<span class="hljs-comment">// external collection as of v3.0.10 (addCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: The Go SDK does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of client/v3.0.0 (AddCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2 <span class="hljs-keyword">as</span> sdk;
<span class="hljs-keyword">use</span> milvus::v2::error::<span class="hljs-type">Result</span>;
<span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(
    &amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>),
).<span class="hljs-keyword">await</span>?;

client.<span class="hljs-title function_ invoke__">add_collection_field</span>(
    sdk::request::collection::AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_embeddings&quot;</span>)
        .<span class="hljs-title function_ invoke__">field</span>(
            sdk::FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;score&quot;</span>)
                .<span class="hljs-title function_ invoke__">data_type</span>(sdk::DataType::Double)
                .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
                .<span class="hljs-title function_ invoke__">external_field</span>(<span class="hljs-string">&quot;score&quot;</span>),
        )
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Note: milvus-sdk-cpp does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of v3.0.3 (AddCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
   <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;product_embeddings&#x27;</span>,
   <span class="hljs-attr">field</span>: {
     <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;score&#x27;</span>,
     <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Double</span>,
     <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
     <span class="hljs-attr">external_field</span>: <span class="hljs-string">&#x27;score&#x27;</span>,
   },
 });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Note: milvus-sdk-csharp does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of v3.0.0 (AddCollectionFieldAsync cannot set the</span>
<span class="hljs-comment">// external_field mapping).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: The RESTful API does not support adding a field to an external</span>
<span class="hljs-comment"># collection (POST /v2/vectordb/collections/fields/add routes through</span>
<span class="hljs-comment"># AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini, <code translate="no">score</code> adalah nama bidang di Milvus, dan <code translate="no">external_field=&quot;score&quot;</code> memetakan bidang tersebut ke bidang <code translate="no">score</code> di sumber data eksternal. Tetapkan <code translate="no">nullable=True</code> karena bidang tersebut ditambahkan setelah koleksi telah dibuat.</p>
<h3 id="Add-a-vector-field" class="common-anchor-header">Menambahkan bidang vektor<button data-href="#Add-a-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Anda juga dapat menambahkan bidang vektor jika sumber data eksternal sudah berisi nilai-nilai vektor. Atur <code translate="no">data_type</code> dan <code translate="no">dim</code> vektor agar sesuai dengan bidang vektor di sumber data eksternal.</p>
<p>Contoh berikut menambahkan bidang vektor padat bernama <code translate="no">image_embedding_v2</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   CSharp</a>
 <a href="#bash">   cURL</a>
</div>
```python
client.add_collection_field(
    collection_name="product_embeddings",
    field_name="image_embedding_v2",
    data_type=DataType.FLOAT_VECTOR,
    dim=768,
    nullable=True,
    # highlight-next-line
    external_field="image_embedding_v2",
)
```
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Note: milvus-sdk-java does not support adding a field to an</span>
<span class="hljs-comment">// external collection as of v3.0.10 (addCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: The Go SDK does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of client/v3.0.0 (AddCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client.<span class="hljs-title function_ invoke__">add_collection_field</span>(
    sdk::request::collection::AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_embeddings&quot;</span>)
        .<span class="hljs-title function_ invoke__">field</span>(
            sdk::FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;image_embedding_v2&quot;</span>)
                .<span class="hljs-title function_ invoke__">data_type</span>(sdk::DataType::FloatVector)
                .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">768</span>)
                .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
                .<span class="hljs-title function_ invoke__">external_field</span>(<span class="hljs-string">&quot;image_embedding_v2&quot;</span>),
        )
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Note: milvus-sdk-cpp does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of v3.0.3 (AddCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
   <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;product_embeddings&#x27;</span>,
   <span class="hljs-attr">field</span>: {
     <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;image_embedding_v2&#x27;</span>,
     <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
     <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>,
     <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
     <span class="hljs-attr">external_field</span>: <span class="hljs-string">&#x27;image_embedding_v2&#x27;</span>,
   },
 });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Note: milvus-sdk-csharp does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of v3.0.0 (AddCollectionFieldAsync cannot set the</span>
<span class="hljs-comment">// external_field mapping).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: The RESTful API does not support adding a field to an external</span>
<span class="hljs-comment"># collection (POST /v2/vectordb/collections/fields/add routes through</span>
<span class="hljs-comment"># AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<p>Jika Anda berencana menjalankan pencarian vektor pada bidang vektor yang ditambahkan, buatlah indeks untuk bidang tersebut sebelum menyegarkan koleksi eksternal.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
```python
index_params = client.prepare_index_params()
<p>index_params.add_index(
field_name="image_embedding_v2",
index_type="AUTOINDEX",
metric_type="COSINE",
)</p>
<p>client.create_index(
collection_name="product_embeddings",
index_params=index_params,
)</p>
<pre><code translate="no">
```java
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.RefreshExternalCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.RefreshExternalCollectionResp;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;image_embedding_v2&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_embeddings&quot;</span>)
        .indexParams(Collections.singletonList(indexParam))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

_, err = client.CreateIndex(ctx, milvusclient.NewCreateIndexOption(
    <span class="hljs-string">&quot;product_embeddings&quot;</span>, <span class="hljs-string">&quot;image_embedding_v2&quot;</span>,
    index.NewAutoIndex(index.MetricType(entity.COSINE))))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client.<span class="hljs-title function_ invoke__">create_index</span>(
    sdk::request::index::CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_embeddings&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_param</span>(
            sdk::IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;image_embedding_v2&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_type</span>(sdk::IndexType::AutoIndex)
                .<span class="hljs-title function_ invoke__">metric_type</span>(sdk::MetricType::Cosine),
        )
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> </span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-function">std::cout <span class="hljs-title">CreateIndex</span><span class="hljs-params">(milvus::CreateIndexRequest()
                                 .WithCollectionName(<span class="hljs-string">&quot;product_embeddings&quot;</span>)
                                 .AddIndex(std::move(index_desc)))</span></span>;
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-function">std::cout <span class="hljs-title">RefreshExternalCollection</span><span class="hljs-params">(request, response)</span></span>;
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">refreshExternalCollection</span>({
   <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;product_embeddings&#x27;</span>,
 });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp">RefreshExternalCollectionResp resp = <span class="hljs-keyword">await</span> client.RefreshExternalCollectionAsync(
    <span class="hljs-keyword">new</span> RefreshExternalCollectionReq
    {
        CollectionName = <span class="hljs-string">&quot;product_embeddings&quot;</span>
    });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/jobs/external_collection/refresh&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;product_embeddings&quot;
}&#x27;</span> 
<button class="copy-code-btn"></button></code></pre>
