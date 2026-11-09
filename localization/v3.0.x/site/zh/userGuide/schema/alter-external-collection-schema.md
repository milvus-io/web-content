---
id: alter-external-collection-schema.md
title: 修改外部Collection SchemaCompatible with Milvus 3.0.x
summary: 了解如何在现有外部Collection中，从外部数据源中暴露一个额外的字段。
beta: Milvus 3.0.x
---
<h1 id="Alter-External-Collection-Schema" class="common-anchor-header">修改外部Collection Schema<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Alter-External-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>创建外部Collection后，外部数据源通常会发生变化。例如，一个已经存储了Embeddings的湖屋表，后来可能会包含一个新的标量字段（如得分、类别或时间戳），而您希望在查询结果中返回该字段，或将其用于过滤条件。</p>
<p>与其重新创建外部 Collection 或将源数据复制到 Milvus 中，不如添加一个 Milvus 字段，将其映射到外部数据源中的现有字段。添加字段后，请刷新外部 Collection，以便在查询和搜索中使用该新字段。</p>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>外部Collection目前支持在创建后添加字段。其他Schema更改（例如删除字段、重命名字段、更改字段数据类型、更改向量维度或重新映射<code translate="no">external_field</code> ）均不支持。</li>
<li>您只能添加在外部数据源中已存在的字段。此操作将现有的外部字段映射到 Milvus 字段，不会在外部数据源中创建新字段，也不会回填源数据。</li>
<li>不支持向现有外部 Collection 添加<code translate="no">SPARSE_FLOAT_VECTOR</code> 字段。</li>
<li>不支持将 StructArray 字段添加到现有外部 Collection 中。如果您的外部 Collection 需要 StructArray 字段，请在创建 Collection 时在 Schema 中定义该字段。</li>
</ul>
<h2 id="Add-a-field" class="common-anchor-header">添加字段<button data-href="#Add-a-field" class="anchor-icon" translate="no">
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
    </button></h2><p>在将字段添加到外部Collection之前，请确认该字段已在外部数据源中存在。然后调用<code translate="no">add_collection_field()</code> ，通过将<code translate="no">external_field</code> 设置为外部数据源中的字段名称，在Milvus中暴露该字段。将<code translate="no">data_type</code> 设置为与外部数据源中该字段匹配的Milvus数据类型。例如，如果映射的字段存储双精度值，请使用<code translate="no">DataType.DOUBLE</code> 。</p>
<p>与管理 Collections 不同，在刷新外部 Collection 后，新增字段的值将从外部数据源中读取。</p>
<h3 id="Add-a-scalar-field" class="common-anchor-header">添加标量字段<button data-href="#Add-a-scalar-field" class="anchor-icon" translate="no">
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
    </button></h3><p>若要在查询结果中返回该字段或在筛选器中使用该字段，请使用 `<code translate="no">add_collection_field()</code> ` 添加标量字段。以下示例添加了一个名为 `<code translate="no">score</code> ` 的字段，该字段映射到外部数据源中的 `<code translate="no">score</code> ` 字段。</p>
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
# 下一行高亮
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
<p>在此示例中，<code translate="no">score</code> 是 Milvus 字段名称，<code translate="no">external_field=&quot;score&quot;</code> 将其映射到外部数据源中的<code translate="no">score</code> 字段。请将<code translate="no">nullable=True</code> 设为 true，因为该字段是在 Collection 创建完成后才添加的。</p>
<h3 id="Add-a-vector-field" class="common-anchor-header">添加向量字段<button data-href="#Add-a-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>如果外部数据源中已包含向量值，您还可以添加向量字段。请将向量字段<code translate="no">data_type</code> 和<code translate="no">dim</code> 设置为与外部数据源中的向量字段相对应。</p>
<p>以下示例添加了一个名为<code translate="no">image_embedding_v2</code> 的稠密向量字段。</p>
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
<p>如果您计划对已添加的向量字段执行向量搜索，请在刷新外部Collection之前为该字段创建索引。</p>
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
