---
id: add-fields-to-an-existing-collection.md
title: 修改Collection Schema
summary: 通过添加或删除用户定义的字段或函数及其生成的向量字段，来修改现有的Collection Schema。
---
<h1 id="Alter-Collection-Schema" class="common-anchor-header">修改Collection Schema<button data-href="#Alter-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>当 Collection 从开发环境迁移到生产环境时，其 Schema 通常会发生变化。您可以添加标量字段（如<code translate="no">source_uri</code> 或<code translate="no">review_status</code> ）以实现过滤和应用逻辑；添加新的向量字段以存储应用程序生成的 Embeddings；添加 BM25 函数及其生成的稀疏向量字段，以便对现有文本进行词汇搜索；或者移除不再使用的字段和函数。 “修改Schema”功能允许您就地进行受支持的字段和函数更改，而无需重新创建Collection。</p>
<div class="alert note">
<p>本指南涵盖了托管集合中用户定义字段以及函数及其生成的向量字段的Schema更改。若要向外部集合添加字段，请参阅<a href="/docs/zh/alter-external-collection-schema.md">“修改外部集合Schema”</a>。对于字段属性的更改（例如，更改<code translate="no">VARCHAR</code> 字段的<code translate="no">max_length</code> 或<code translate="no">ARRAY</code> 字段的<code translate="no">max_capacity</code> ），请参阅<a href="/docs/zh/alter-collection-field.md">“修改Collection字段”</a>。 有关动态字段行为，请参阅<a href="/docs/zh/enable-dynamic-field.md">“Dynamic Field</a>”和<a href="/docs/zh/modify-collection.md">“修改Collection”</a>。</p>
</div>
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
    </button></h2><p><strong>添加用户定义字段</strong></p>
<ul>
<li><p>添加的用户定义字段必须允许为空。在调用<code translate="no">add_collection_field()</code> 时，请设置<code translate="no">nullable=True</code> 。对于现有实体，除非您添加的是带有<code translate="no">default_value</code> 的标量字段，否则新增字段的类型默认为<code translate="no">NULL</code> 。</p></li>
<li><p>Milvus 2.6.x 及更高版本支持添加用户定义的标量字段。Milvus 2.6.18 及更高版本支持添加用户定义的向量字段。</p></li>
</ul>
<ul>
<li>Milvus 3.0.0 及更高版本支持添加 StructArray 字段。添加的 StructArray 字段必须允许为空。</li>
</ul>
<ul>
<li>字段名称在Collection中的所有字段中必须是唯一的。</li>
</ul>
<p><strong>添加函数及其生成的向量字段</strong></p>
<ul>
<li><p>每次Schema更新只能添加一个函数和一个生成的向量字段。</p></li>
<li><p>支持的函数决定了生成的向量字段类型：<code translate="no">BM25</code> 会生成一个<code translate="no">SPARSE_FLOAT_VECTOR</code> 字段，而<code translate="no">MINHASH</code> 会生成一个<code translate="no">BINARY_VECTOR</code> 字段。</p></li>
<li><p>生成的向量字段必须是新字段。它不能指向Schema中已存在的字段。</p></li>
<li><p>生成的向量字段不能为可空。</p></li>
<li><p>该函数所使用的输入字段必须已在Collection中存在。</p></li>
<li><p>将 BM25 或 MinHash 函数添加到现有 Collection 时，该函数的输入必须是<code translate="no">VARCHAR</code> 字段。此工作流不支持<code translate="no">TEXT</code> 输入，因为 Milvus 无法根据该输入类型为现有实体回填生成的输出。</p></li>
</ul>
<p><strong>删除用户定义字段</strong></p>
<ul>
<li><p>您无法删除 Collection 中的主键字段、Partition Key 字段、聚簇键字段或最后一个向量字段。</p></li>
<li><p>您可以删除整个<code translate="no">ARRAY&lt;STRUCT&gt;</code> 字段，但无法删除<code translate="no">ARRAY&lt;STRUCT&gt;</code> 字段内的单个子字段。</p></li>
<li><p>您无法直接删除用作函数输入字段或作为函数输出字段生成的字段。要删除函数输出字段，请删除生成该字段的函数。</p></li>
</ul>
<p><strong>删除函数及其生成的向量字段</strong></p>
<ul>
<li><p>在此模式变更工作流中，删除函数将移除该函数、其生成的向量字段以及关联的索引。函数的输入字段仍保留在 Collection 模式中。</p></li>
<li><p>如果删除该函数生成的向量字段会导致 Collection 中不再存在任何向量字段，则删除该函数的操作将被拒绝。</p></li>
</ul>
<div class="alert note">
<p>对于超出支持的添加和删除操作范围的 Schema 变更，请重新创建或迁移 Collection。</p>
</div>
<p><a id="add-fields-to-an-existing-collection"></a></p>
<h2 id="Add-fields-and-Functions-to-an-existing-collection" class="common-anchor-header">向现有Collection添加字段和函数<button data-href="#Add-fields-and-Functions-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>请根据您是要添加用户定义字段，还是要添加生成向量场的函数，选择相应的工作流：</p>
<ul>
<li><p>当需要用于过滤、查询输出或应用逻辑的新元数据时，<a href="#Add-user-defined-scalar-fields--Milvus-26x">请添加用户定义的标量字段</a>。</p></li>
<li><p>当需要一个其元素共享相同 Struct Schema 的数组字段时，<a href="#Add-StructArray-fields--Milvus-300">请添加 StructArray 字段</a>。</p></li>
<li><p>当您的应用程序生成 Embeddings 并将向量值写入 Milvus 时，<a href="#Add-user-defined-vector-fields--Milvus-2618">请添加用户定义的向量字段</a>。</p></li>
<li><p>当 Milvus 需要根据现有字段生成向量值时（例如从文本中生成 BM25 稀疏向量或 MinHash 签名），<a href="#Add-a-Function-and-its-generated-vector-field--Milvus-30x">请添加函数及其生成的向量字段</a>。</p></li>
</ul>
<p>在所有情况下，新字段名称在 Collection 中不得已存在，且字段总数不得超过 Milvus 的字段数量限制。详情请参阅《<a href="/docs/zh/limitations.md#number-of-resources-in-a-collection">Milvus 限制</a>》。</p>
<h3 id="Add-user-defined-scalar-fields" class="common-anchor-header">添加用户定义的标量字段<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-user-defined-scalar-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>使用 `<code translate="no">add_collection_field()</code> ` 将用户定义的标量字段添加到现有 Collection 中。</p>
<p>这与在 Dynamic Field 中存储任意键不同：在 Schema 更新生效后，新的标量字段将成为 Collection 模式的常规组成部分。您可以向其中插入或更新值，在支持的情况下为其创建索引，在查询和搜索过滤器中使用它，并在查询或搜索结果中返回该字段的值。</p>
<p>由于现有实体是在新字段创建之前插入的，因此每个添加的用户定义标量字段都必须允许为空：</p>
<ul>
<li><p>如果您添加一个标量字段时使用 `<code translate="no">nullable=True</code> ` 且未指定 `<code translate="no">default_value</code>`，现有实体在新字段上将返回 `<code translate="no">NULL</code> `。</p></li>
<li><p>如果您添加的标量字段同时包含<code translate="no">nullable=True</code> 和<code translate="no">default_value</code> ，现有实体将返回默认值，而非<code translate="no">NULL</code> 。</p></li>
</ul>
<p>标量过滤表达式无法匹配<code translate="no">NULL</code> 标量值。有关详细信息，请参阅<a href="/docs/zh/nullable-and-default.md">“可为空字段”</a>。</p>
<p><strong>示例：添加一个可为空的标量字段</strong></p>
<p>以下示例向名为<code translate="no">product_catalog</code> 的现有 Collection 中添加了一个可为空的<code translate="no">source</code> 字段。</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, Function, FunctionType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;source&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionStructFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFunctionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropFunctionFieldReq;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);
client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;source&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">128</span>)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

newField := entity.NewField().
    WithName(<span class="hljs-string">&quot;source&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithNullable(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">128</span>)
err = client.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, newField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;
client
    .<span class="hljs-title function_ invoke__">add_collection_field</span>(
        AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;source&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
                    .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">128</span>)
                    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::FieldSchema field = milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;source&quot;</span>, milvus::DataType::VARCHAR)
                                .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">128</span>)
                                .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>);
status = client-&gt;<span class="hljs-built_in">AddCollectionField</span>(
    milvus::<span class="hljs-built_in">AddCollectionFieldRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>).<span class="hljs-built_in">WithField</span>(std::<span class="hljs-built_in">move</span>(field)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;source&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">128</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig { Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span> });
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">await</span> client.AddCollectionFieldAsync(<span class="hljs-keyword">new</span> AddCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Field = FieldSchema.CreateVarchar(<span class="hljs-string">&quot;source&quot;</span>, maxLength: <span class="hljs-number">128</span>, nullable: <span class="hljs-literal">true</span>)
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/fields/add&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;product_catalog&quot;,
       &quot;schema&quot;: {
         &quot;fieldName&quot;: &quot;source&quot;,
         &quot;dataType&quot;: &quot;VarChar&quot;,
         &quot;nullable&quot;: true,
         &quot;elementTypeParams&quot;: {
           &quot;max_length&quot;: 128
         }
       }
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>添加字段后，Collection中已存在的实体在查询 `<code translate="no">source</code>` 时将返回 `<code translate="no">NULL</code> `。新实体可在插入（insert）或更新插入（upsert）时设置 `<code translate="no">source</code> `。</p>
<p><strong>示例：添加一个具有默认值的标量字段</strong></p>
<p>如果希望现有实体返回具体值而非<code translate="no">NULL</code> ，请在添加标量字段时指定<code translate="no">default_value</code> 。以下示例添加了一个<code translate="no">review_status</code> 字段，并使用<code translate="no">&quot;unreviewed&quot;</code> 作为默认值。</p>
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
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;review_status&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    default_value=<span class="hljs-string">&quot;unreviewed&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;review_status&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">32</span>)
        .isNullable(<span class="hljs-literal">true</span>)
        .defaultValue(<span class="hljs-string">&quot;unreviewed&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">newField := entity.NewField().
    WithName(<span class="hljs-string">&quot;review_status&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithNullable(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">32</span>).
    WithDefaultValueString(<span class="hljs-string">&quot;unreviewed&quot;</span>)
err = client.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, newField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">add_collection_field</span>(
        AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;review_status&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
                    .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">32</span>)
                    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
                    .<span class="hljs-title function_ invoke__">default_value</span>(DefaultValue::<span class="hljs-title function_ invoke__">String</span>(<span class="hljs-string">&quot;unreviewed&quot;</span>.<span class="hljs-title function_ invoke__">into</span>())),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::FieldSchema field = milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;review_status&quot;</span>, milvus::DataType::VARCHAR)
                                .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">32</span>)
                                .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>)
                                .<span class="hljs-built_in">WithDefaultValue</span>(<span class="hljs-string">&quot;unreviewed&quot;</span>);
status = client-&gt;<span class="hljs-built_in">AddCollectionField</span>(
    milvus::<span class="hljs-built_in">AddCollectionFieldRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>).<span class="hljs-built_in">WithField</span>(std::<span class="hljs-built_in">move</span>(field)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;review_status&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">32</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">default_value</span>: <span class="hljs-string">&quot;unreviewed&quot;</span>,
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.AddCollectionFieldAsync(<span class="hljs-keyword">new</span> AddCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Field = FieldSchema.CreateVarchar(<span class="hljs-string">&quot;review_status&quot;</span>, maxLength: <span class="hljs-number">32</span>, nullable: <span class="hljs-literal">true</span>, defaultValue: <span class="hljs-string">&quot;unreviewed&quot;</span>)
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/fields/add&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;product_catalog&quot;,
       &quot;schema&quot;: {
         &quot;fieldName&quot;: &quot;review_status&quot;,
         &quot;dataType&quot;: &quot;VarChar&quot;,
         &quot;nullable&quot;: true,
         &quot;defaultValue&quot;: &quot;unreviewed&quot;,
         &quot;elementTypeParams&quot;: {
           &quot;max_length&quot;: 32
         }
       }
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>字段添加后，Collection中已存在的实体在查询<code translate="no">review_status</code> 时会返回<code translate="no">&quot;unreviewed&quot;</code> 。新实体可以设置不同的值，或者在未提供值时使用默认值。</p>
<h3 id="Add-StructArray-fields" class="common-anchor-header">添加 StructArray 字段<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0</span><button data-href="#Add-StructArray-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>使用 `<code translate="no">add_collection_struct_field()</code> ` 添加一个接受 Struct 元素数组的 StructArray 字段。要添加 StructArray 字段，请按以下步骤操作：</p>
<ol>
<li><p>创建一个 Struct Schema，其中包含所需的支持数据类型的子字段。有关适用数据类型，请参阅<a href="/docs/zh/structarray-limits.md#Supported-subfield-data-types">StructArray 限制</a>。</p></li>
<li><p>引用上述创建的 Struct Schema，并在<code translate="no">add_collection_struct_field()</code> 中设置该字段的最大容量。</p></li>
<li><p>在请求中设置 `<code translate="no">nullable=True</code> `。</p></li>
</ol>
<p><strong>示例：添加一个可为空的 StructArray 字段</strong></p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create a struct schema</span>
struct_schema = client.create_struct_field_schema()

<span class="hljs-comment"># add a scalar field to the struct</span>
struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># add a vector field to the struct with mmap enabled</span>
struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line">client.add_collection_struct_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;books&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    struct_schema=struct_schema,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">1024</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span></span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>
Map&lt;String, String&gt; mmapParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
mmapParams.put(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);
client.addCollectionStructField(AddCollectionStructFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;books&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;chunks&quot;</span>)
        .maxCapacity(<span class="hljs-number">1024</span>)
        .nullable(<span class="hljs-literal">true</span>)
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">65535</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;chapter&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">512</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
                .dataType(DataType.FloatVector)
                .dimension(<span class="hljs-number">5</span>)
                .typeParams(mmapParams)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;chapter_vector&quot;</span>)
                .dataType(DataType.FloatVector)
                .dimension(<span class="hljs-number">5</span>)
                .typeParams(mmapParams)
                .build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>
structSchema := entity.NewStructSchema().
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;text&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">65535</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;chapter&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">512</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;text_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">5</span>).WithTypeParams(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;chapter_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">5</span>).WithTypeParams(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>))
newField := entity.NewField().
    WithName(<span class="hljs-string">&quot;chunks&quot;</span>).
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeStruct).
    WithNullable(<span class="hljs-literal">true</span>).
    WithMaxCapacity(<span class="hljs-number">1024</span>).
    WithStructSchema(structSchema)
err = client.AddCollectionStructField(ctx, milvusclient.NewAddCollectionStructFieldOption(<span class="hljs-string">&quot;books&quot;</span>, newField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add struct field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">struct_schema</span> = StructFieldSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
    .<span class="hljs-title function_ invoke__">max_capacity</span>(<span class="hljs-number">1024</span>)
    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">65535</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;chapter&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">512</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">type_params</span>(
                std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;mmap.enabled&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;true&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>())]),
            ),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;chapter_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">type_params</span>(
                std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;mmap.enabled&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;true&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>())]),
            ),
    );
client
    .<span class="hljs-title function_ invoke__">add_collection_struct_field</span>(
        AddCollectionStructFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;books&quot;</span>)
            .<span class="hljs-title function_ invoke__">struct_field</span>(struct_schema)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>
milvus::StructFieldSchema struct_schema = milvus::<span class="hljs-built_in">StructFieldSchema</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
                                              .<span class="hljs-built_in">WithMaxCapacity</span>(<span class="hljs-number">1024</span>)
                                              .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>)
                                              .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">65535</span>))
                                              .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;chapter&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">512</span>))
                                              .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">5</span>).<span class="hljs-built_in">AddTypeParam</span>(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>))
                                              .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;chapter_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">5</span>).<span class="hljs-built_in">AddTypeParam</span>(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>));
status = client-&gt;<span class="hljs-built_in">AddCollectionStructField</span>(
    milvus::<span class="hljs-built_in">AddCollectionStructFieldRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;books&quot;</span>).<span class="hljs-built_in">WithStructField</span>(std::<span class="hljs-built_in">move</span>(struct_schema)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;books&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chunks&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;Array&quot;</span>,
        <span class="hljs-attr">element_type</span>: <span class="hljs-string">&quot;Struct&quot;</span>,
        <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">1024</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">fields</span>: [
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">65535</span> },
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chapter&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span> },
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;FloatVector&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">true</span> },
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chapter_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;FloatVector&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">true</span> },
        ],
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Create a struct schema</span>
<span class="hljs-keyword">var</span> structSchema = <span class="hljs-keyword">new</span> StructFieldSchema(<span class="hljs-string">&quot;chunks&quot;</span>)
{
    MaxCapacity = <span class="hljs-number">1024</span>,
    Nullable = <span class="hljs-literal">true</span>
};

<span class="hljs-comment">// add a scalar field to the struct</span>
structSchema.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;text&quot;</span>, maxLength: <span class="hljs-number">65535</span>));
structSchema.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;chapter&quot;</span>, maxLength: <span class="hljs-number">512</span>));

<span class="hljs-comment">// add a vector field to the struct with mmap enabled</span>
<span class="hljs-keyword">var</span> textVector = FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;text_vector&quot;</span>, dimension: <span class="hljs-number">5</span>);
textVector.TypeParams[<span class="hljs-string">&quot;mmap.enabled&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>;
structSchema.Fields.Add(textVector);

<span class="hljs-keyword">var</span> chapterVector = FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;chapter_vector&quot;</span>, dimension: <span class="hljs-number">5</span>);
chapterVector.TypeParams[<span class="hljs-string">&quot;mmap.enabled&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>;
structSchema.Fields.Add(chapterVector);

<span class="hljs-keyword">await</span> client.AddCollectionStructFieldAsync(<span class="hljs-keyword">new</span> AddCollectionStructFieldReq
{
    CollectionName = <span class="hljs-string">&quot;books&quot;</span>,
    StructField = structSchema
});
<button class="copy-code-btn"></button></code></pre>
<p>添加 StructArray 字段后，Collection 中已存在的实体在所有子字段上对 `<code translate="no">chunks</code> ` 的返回值均为 `<code translate="no">NULL</code> `。插入新实体时，请确保所有子字段要么为 `<code translate="no">NULL</code> `，要么具有有效值。若某些子字段设置为 `<code translate="no">NULL</code> ` 而其他子字段设置为有效值，则会导致错误。</p>
<h3 id="Add-user-defined-vector-fields" class="common-anchor-header">添加用户定义的向量字段<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.18+</span><button data-href="#Add-user-defined-vector-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>当您的应用程序生成 Embeddings 并将向量值写入 Milvus 时，请使用<code translate="no">add_collection_field()</code> 添加用户定义的向量字段。</p>
<p>每个添加的用户定义向量字段都必须为可空。对于现有实体，新向量字段的值默认为<code translate="no">NULL</code> ，直到您通过upsert或回填工作流写入向量值为止。新实体可在插入时包含该向量字段。向量搜索会跳过向量值为<code translate="no">NULL</code> 的实体。有关详细信息，请参阅<a href="/docs/zh/nullable-and-default.md">《可空字段》</a>。</p>
<p><strong>示例：添加可空向量字段</strong></p>
<p>以下示例向现有 Collection 中添加了一个名为<code translate="no">embedding_v2</code> 的可空稠密向量字段。请将<code translate="no">dim</code> 设置为应用程序生成的 Embeddings 的维度。</p>
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
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.FLOAT_VECTOR,</span>
<span class="highlighted-comment-line">    dim=<span class="hljs-number">768</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;embedding_v2&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">newField := entity.NewField().
    WithName(<span class="hljs-string">&quot;embedding_v2&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithNullable(<span class="hljs-literal">true</span>).
    WithDim(<span class="hljs-number">768</span>)
err = client.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, newField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">add_collection_field</span>(
        AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;embedding_v2&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
                    .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">768</span>)
                    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::FieldSchema field = milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;embedding_v2&quot;</span>, milvus::DataType::FLOAT_VECTOR)
                                .<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">768</span>)
                                .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>);
status = client-&gt;<span class="hljs-built_in">AddCollectionField</span>(
    milvus::<span class="hljs-built_in">AddCollectionFieldRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>).<span class="hljs-built_in">WithField</span>(std::<span class="hljs-built_in">move</span>(field)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding_v2&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;FloatVector&quot;</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> embeddingV2 = FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;embedding_v2&quot;</span>, dimension: <span class="hljs-number">768</span>);
embeddingV2.Nullable = <span class="hljs-literal">true</span>;

<span class="hljs-keyword">await</span> client.AddCollectionFieldAsync(<span class="hljs-keyword">new</span> AddCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Field = embeddingV2
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/fields/add&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;product_catalog&quot;,
       &quot;schema&quot;: {
         &quot;fieldName&quot;: &quot;embedding_v2&quot;,
         &quot;dataType&quot;: &quot;FloatVector&quot;,
         &quot;nullable&quot;: true,
         &quot;elementTypeParams&quot;: {
           &quot;dim&quot;: 768
         }
       }
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>添加字段后，请在搜索该新向量字段之前为其创建索引：</p>
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
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .indexParams(Collections.singletonList(IndexParam.builder()
                .fieldName(<span class="hljs-string">&quot;embedding_v2&quot;</span>)
                .indexType(IndexParam.IndexType.AUTOINDEX)
                .metricType(IndexParam.MetricType.COSINE)
                .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOpt := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;embedding_v2&quot;</span>, index.NewAutoIndex(entity.COSINE))
_, err = client.CreateIndex(ctx, indexOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to create index: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">create_index</span>(
        CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_param</span>(
                IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;embedding_v2&quot;</span>)
                    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
                    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-function">milvus::IndexDesc <span class="hljs-title">index_desc</span><span class="hljs-params">(<span class="hljs-string">&quot;embedding_v2&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE)</span></span>;
status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(
    milvus::<span class="hljs-built_in">CreateIndexRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>).<span class="hljs-built_in">AddIndex</span>(std::<span class="hljs-built_in">move</span>(index_desc)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;embedding_v2&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Indexes = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;embedding_v2&quot;</span>, <span class="hljs-string">&quot;embedding_v2&quot;</span>, IndexType.AutoIndex, MetricType.Cosine)
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/create&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;product_catalog&quot;,
       &quot;indexParams&quot;: [
         {
           &quot;fieldName&quot;: &quot;embedding_v2&quot;,
           &quot;params&quot;: {&quot;index_type&quot;: &quot;AUTOINDEX&quot;},
           &quot;metricType&quot;: &quot;COSINE&quot;
         }
       ]
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>现有实体的 `<code translate="no">embedding_v2</code> ` 字段值为 `<code translate="no">NULL</code> `，因此在按该字段搜索时会被跳过。若要使现有实体可通过 `<code translate="no">embedding_v2</code>` 进行搜索，请通过 upsert 或回填工作流写入非空向量值。新建实体可在插入时包含 `<code translate="no">embedding_v2</code> `。</p>
<p><a id="add-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Add-a-Function-and-its-generated-vector-field" class="common-anchor-header">添加函数及其生成的向量字段<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Add-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>当需要 Milvus 根据已存储在现有 Collection 中的数据生成新的向量字段时，请使用此工作流。该操作将添加三个相关的 Schema 元素：</p>
<ul>
<li><p>一个从一个或多个现有输入字段读取数据的函数定义。</p></li>
<li><p>一个用于存储函数输出结果的新向量字段。</p></li>
<li><p>一个绑定到新向量字段的索引定义。</p></li>
</ul>
<p>例如，BM25函数读取现有的<code translate="no">VARCHAR</code> 字段，并生成用于词法搜索的<code translate="no">SPARSE_FLOAT_VECTOR</code> 字段；MinHash函数则生成用于近似重复检测的<code translate="no">BINARY_VECTOR</code> 字段。此工作流不会添加或替换函数的输入字段。</p>
<div class="alert note">
<p>此功能需要 Storage V3。有关启用说明和兼容性注意事项，请参阅<a href="/docs/zh/storage-v3.md">Storage V3</a>。</p>
</div>
<p>将函数及其生成的向量字段添加到现有 Collection 中，还需进行 Schema 版本压缩和存储版本压缩。如果任一设置被禁用，Milvus 将拒绝该请求。这些额外先决条件仅在修改现有 Collection 时适用；在初始 Schema 中定义函数时，不会使用此现有数据回填工作流。</p>
<p>支持的 Function 决定了生成的向量字段类型：</p>
<table>
<thead>
<tr><th>函数</th><th>生成的向量字段类型</th><th>典型输入字段</th><th>典型用例</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BM25</code></td><td><code translate="no">SPARSE_FLOAT_VECTOR</code></td><td>启用了分析器的<code translate="no">VARCHAR</code> 场</td><td>词法搜索与关键词相关性</td></tr>
<tr><td><code translate="no">MINHASH</code></td><td><code translate="no">BINARY_VECTOR</code></td><td>一个<code translate="no">VARCHAR</code> 字段</td><td>近似重复检测</td></tr>
</tbody>
</table>
<p>有关每个函数工作原理的详细信息，请参阅<a href="/docs/zh/bm25-function.md">BM25 函数</a>和<a href="/docs/zh/minhash-function.md">MinHash 函数</a>。</p>
<p>生成的向量字段在Collection中不得已存在，且不能为可空字段。函数的输入字段必须已存在。</p>
<p><strong>示例：添加一个 BM25 函数及其生成的稀疏向量字段</strong></p>
<p>以下示例向现有 Collection 中添加了一个名为<code translate="no">text_bm25</code> 的 BM25 函数及其生成的稀疏向量字段<code translate="no">text_sparse</code> 。该 Collection 必须已包含一个名为<code translate="no">text</code> 的<code translate="no">VARCHAR</code> 字段，且已启用分析器。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python">sparse_field = client.create_field_schema(
    name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    data_type=DataType.SPARSE_FLOAT_VECTOR,
    desc=<span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>,
)

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse&quot;</span>],
    function_type=FunctionType.BM25,
)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,
    },
)

<span class="highlighted-comment-line">client.add_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_schema=sparse_field,</span>
<span class="highlighted-comment-line">    func=bm25_function,</span>
<span class="highlighted-comment-line">    index_params=index_params,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>
client.addFunctionField(AddFunctionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .indexParam(IndexParam.builder()
                .fieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
                .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
                .metricType(IndexParam.MetricType.BM25)
                .build())
        .function(CreateCollectionReq.Function.builder()
                .name(<span class="hljs-string">&quot;text_bm25&quot;</span>)
                .functionType(FunctionType.BM25)
                .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
                .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse&quot;</span>))
                .build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>
field := entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector)
function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25&quot;</span>).
    WithType(entity.FunctionTypeBM25).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse&quot;</span>)
boundIndex := index.NewSparseInvertedIndex(entity.BM25, <span class="hljs-number">0.2</span>)
err = client.AddFunctionField(ctx, milvusclient.NewAddFunctionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, field, function, boundIndex))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add function field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>
client
    .<span class="hljs-title function_ invoke__">add_function_field</span>(
        AddFunctionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::SparseFloatVector),
            )
            .<span class="hljs-title function_ invoke__">function</span>(
                Function::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text_bm25&quot;</span>)
                    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Bm25)
                    .<span class="hljs-title function_ invoke__">input_fields</span>([<span class="hljs-string">&quot;text&quot;</span>])
                    .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;text_sparse&quot;</span>]),
            )
            .<span class="hljs-title function_ invoke__">index</span>(
                IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>)
                    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::SparseInvertedIndex)
                    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Bm25),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>
<span class="hljs-function">milvus::FieldSchema <span class="hljs-title">sparse_field</span><span class="hljs-params">(<span class="hljs-string">&quot;text_sparse&quot;</span>, milvus::DataType::SPARSE_FLOAT_VECTOR)</span></span>;
milvus::FunctionPtr function = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::Function&gt;(<span class="hljs-string">&quot;text_bm25&quot;</span>, milvus::FunctionType::BM25);
function-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;text&quot;</span>);
function-&gt;<span class="hljs-built_in">AddOutputFieldName</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>);
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">index</span><span class="hljs-params">(<span class="hljs-string">&quot;text_sparse&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, milvus::IndexType::SPARSE_INVERTED_INDEX, milvus::MetricType::BM25)</span></span>;
status = client-&gt;<span class="hljs-built_in">AddFunctionField</span>(milvus::<span class="hljs-built_in">AddFunctionFieldRequest</span>()
                                      .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
                                      .<span class="hljs-built_in">WithField</span>(std::<span class="hljs-built_in">move</span>(sparse_field))
                                      .<span class="hljs-built_in">WithFunction</span>(function)
                                      .<span class="hljs-built_in">WithIndex</span>(std::<span class="hljs-built_in">move</span>(index)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addFunctionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;SparseFloatVector&quot;</span>,
    },
    <span class="hljs-attr">function</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_bm25&quot;</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;text&quot;</span>],
        <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;text_sparse&quot;</span>],
    },
    <span class="hljs-attr">extra_params</span>: {
        <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
        <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">inverted_index_algo</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
            <span class="hljs-attr">bm25_k1</span>: <span class="hljs-number">1.2</span>,
            <span class="hljs-attr">bm25_b</span>: <span class="hljs-number">0.75</span>,
        },
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.AddFunctionFieldAsync(<span class="hljs-keyword">new</span> AddFunctionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Field = FieldSchema.CreateSparseFloatVector(<span class="hljs-string">&quot;text_sparse&quot;</span>, description: <span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>),
    Function = FunctionSchema.CreateBm25(<span class="hljs-string">&quot;text_bm25&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;text_sparse&quot;</span>),
    IndexParam = <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;text_sparse&quot;</span>, <span class="hljs-string">&quot;text_sparse&quot;</span>, IndexType.SparseInvertedIndex, MetricType.Bm25)
    {
        ExtraParams = { [<span class="hljs-string">&quot;inverted_index_algo&quot;</span>] = <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>, [<span class="hljs-string">&quot;bm25_k1&quot;</span>] = <span class="hljs-string">&quot;1.2&quot;</span>, [<span class="hljs-string">&quot;bm25_b&quot;</span>] = <span class="hljs-string">&quot;0.75&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">index_params</code> 对象必须包含且仅包含一个针对新Function输出字段的索引定义。Milvus会在同一Schema变更中添加该Function、其生成的向量字段以及绑定索引定义。请勿在调用<code translate="no">add_function_field()</code> 之后单独调用<code translate="no">create_index()</code> 。</p>
<p>从概念上讲，此操作会添加以下 Function、生成的输出字段以及绑定索引定义：</p>
<pre><code translate="no" class="language-plaintext">New Function:
  name: &quot;text_bm25&quot;
  type: BM25
  input_field_names: [&quot;text&quot;]
  output_field_names: [&quot;text_sparse&quot;]

New generated output field:
  name: &quot;text_sparse&quot;
  data_type: SPARSE_FLOAT_VECTOR
  nullable: false

Bound index:
  field_name: &quot;text_sparse&quot;
  index_type: SPARSE_INVERTED_INDEX
  metric_type: BM25
<button class="copy-code-btn"></button></code></pre>
<p>请求成功后，<code translate="no">describe_collection()</code> 会在 Collection 模式中同时返回新的<code translate="no">text_bm25</code> 函数及其生成的<code translate="no">text_sparse</code> 向量字段。Milvus 会在新实体写入时生成其函数输出。 对于现有实体，Milvus 会通过后台压缩异步填充生成的向量字段。Schema可见性确认了Schema更新成功，但并不表示所有现有实体的回填都已完成。有关完整的 BM25 搜索工作流，请参阅<a href="/docs/zh/full-text-search.md">“全文搜索”</a>。</p>
<p>Milvus 还支持 MinHash 函数及其生成的二进制向量字段，用于近似重复项检测。MinHash 函数使用<code translate="no">FunctionType.MINHASH</code> ，并将结果写入新的<code translate="no">BINARY_VECTOR</code> 输出字段。有关配置详情，请参阅<a href="/docs/zh/minhash-function.md">MinHash 函数</a>。</p>
<p><a id="drop-fields-from-an-existing-collection"></a></p>
<h2 id="Drop-fields-and-Functions-from-an-existing-collection" class="common-anchor-header">从现有 Collection 中删除字段和函数<button data-href="#Drop-fields-and-Functions-from-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>当用户定义字段不再属于您的集合模型时，您可以直接将其删除。若要删除一个函数及其生成的向量字段，请删除该函数；Milvus 将在同一 Schema 变更中移除生成的字段及其索引。</p>
<h3 id="Drop-user-defined-fields" class="common-anchor-header">删除用户定义字段<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-user-defined-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>使用 `<code translate="no">drop_collection_field()</code> ` 删除不再属于 Collection 模型的用户定义标量、向量或 StructArray 字段。</p>
<p>删除字段会首先更改 Collection Schema 和字段可见性：</p>
<ul>
<li><p><code translate="no">drop_collection_field()</code> 执行成功后，Schema 将得到更新：<code translate="no">describe_collection()</code> 不再返回已删除的字段，且查询或搜索将无法在<code translate="no">output_fields</code> 中返回该字段，也无法在表达式中使用该字段。</p></li>
<li><p>基于已删除字段构建的索引将作为Schema更新的一部分被清理。</p></li>
</ul>
<p>存储清理与Schema清理是分开处理的。有关详细信息，请参阅<a href="#When-is-storage-space-reclaimed-after-dropping-a-field">“删除字段后何时回收存储空间？</a>”。</p>
<p><strong>示例：删除用户定义的标量字段</strong></p>
<p>以下示例假设<code translate="no">experiment_tag</code> 是<code translate="no">product_catalog</code> 中的一个用户定义标量字段，并将该字段从 Collection 中删除。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;experiment_tag&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropCollectionField(DropCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;experiment_tag&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;experiment_tag&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">drop_collection_field</span>(
        DropCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;experiment_tag&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropCollectionField</span>(milvus::<span class="hljs-built_in">DropCollectionFieldRequest</span>()
                                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
                                         .<span class="hljs-built_in">WithFieldName</span>(<span class="hljs-string">&quot;experiment_tag&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;experiment_tag&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.DropCollectionFieldAsync(<span class="hljs-keyword">new</span> DropCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    FieldName = <span class="hljs-string">&quot;experiment_tag&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<p>删除字段后，您可以调用 `<code translate="no">describe_collection()</code> ` 来验证该字段是否已不再属于 Schema。</p>
<p><strong>示例：删除 StructArray 字段</strong></p>
<p>以下示例假设 `<code translate="no">chunks</code> ` 是 `<code translate="no">my_collection</code>` 中的一个 StructArray 字段，并将它从 Collection 中删除。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropCollectionField(DropCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;chunks&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;chunks&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">drop_collection_field</span>(
        DropCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropCollectionField</span>(milvus::<span class="hljs-built_in">DropCollectionFieldRequest</span>()
                                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                         .<span class="hljs-built_in">WithFieldName</span>(<span class="hljs-string">&quot;chunks&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.DropCollectionFieldAsync(<span class="hljs-keyword">new</span> DropCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    FieldName = <span class="hljs-string">&quot;chunks&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<p><strong>示例：删除用户定义的向量字段</strong></p>
<p>您可以使用相同的<code translate="no">drop_collection_field()</code> 方法删除向量字段，但删除后 Collection 中仍必须至少包含一个向量字段。这对于那些暂时包含多种向量表示形式、随后将统一为其中一种的 Collection 非常有用。</p>
<p>以下示例假设 `<code translate="no">image_vector</code> ` 是 `<code translate="no">hybrid_catalog</code>` 中的用户定义向量场，且 Collection 中仍保留另一个向量场，例如 `<code translate="no">text_vector</code>`。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;hybrid_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropCollectionField(DropCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;hybrid_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption(<span class="hljs-string">&quot;hybrid_catalog&quot;</span>, <span class="hljs-string">&quot;image_vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">drop_collection_field</span>(
        DropCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;hybrid_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropCollectionField</span>(milvus::<span class="hljs-built_in">DropCollectionFieldRequest</span>()
                                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;hybrid_catalog&quot;</span>)
                                         .<span class="hljs-built_in">WithFieldName</span>(<span class="hljs-string">&quot;image_vector&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.DropCollectionFieldAsync(<span class="hljs-keyword">new</span> DropCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;hybrid_catalog&quot;</span>,
    FieldName = <span class="hljs-string">&quot;image_vector&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<p>如果<code translate="no">image_vector</code> 是 Collection 中的最后一个向量场，则 drop 操作将被拒绝。</p>
<p><a id="drop-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Drop-a-Function-and-its-generated-vector-field" class="common-anchor-header">删除函数及其生成的向量场<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>当您不再需要某个函数或其生成的向量场时（例如 BM25 函数及其生成的稀疏向量场），请使用此操作。</p>
<p>调用<code translate="no">drop_function_field()</code> 并传入函数名称。Milvus 将移除该函数、其生成的向量场以及关联的索引，同时保留函数的输入字段。</p>
<p><strong>示例：删除 BM25 函数及其生成的稀疏向量场</strong></p>
<p>以下示例假设<code translate="no">text_bm25</code> 是<code translate="no">product_catalog</code> 中的一个BM25函数，并生成一个名为<code translate="no">text_sparse</code> 的稀疏向量输出字段。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.drop_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    function_name=<span class="hljs-string">&quot;text_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropFunctionField(DropFunctionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .functionName(<span class="hljs-string">&quot;text_bm25&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropFunctionField(ctx, milvusclient.NewDropFunctionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;text_bm25&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop function field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">drop_function_field</span>(
        DropFunctionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">function_name</span>(<span class="hljs-string">&quot;text_bm25&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropFunctionField</span>(milvus::<span class="hljs-built_in">DropFunctionFieldRequest</span>()
                                       .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
                                       .<span class="hljs-built_in">WithFunctionName</span>(<span class="hljs-string">&quot;text_bm25&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropFunctionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">function_name</span>: <span class="hljs-string">&quot;text_bm25&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.DropFunctionFieldAsync(<span class="hljs-keyword">new</span> DropFunctionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    FunctionName = <span class="hljs-string">&quot;text_bm25&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<p>操作成功后，<code translate="no">describe_collection()</code> 将不再返回已删除的函数或其生成的向量字段。函数的输入字段仍保留在Schema中。</p>
<p>如果移除该函数的输出字段会导致Collection中不再包含任何向量字段，则该操作将被拒绝。</p>
<h2 id="FAQ" class="common-anchor-header">常见问题<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Which-method-should-I-use-to-add-a-field-or-Function" class="common-anchor-header">应使用哪种方法添加字段或函数？<button data-href="#Which-method-should-I-use-to-add-a-field-or-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>请使用 `<code translate="no">add_collection_field()</code> ` 添加用户定义的标量字段或向量字段。</p>
<p>当需要一个其元素共享相同 Struct Schema 的数组字段时，请使用 `<code translate="no">add_collection_struct_field()</code> ` 添加 StructArray 字段。</p>
<p>使用 `<code translate="no">add_function_field()</code> ` 在同一Schema更改中添加函数、其生成的向量字段以及绑定索引定义。</p>
<h3 id="Why-must-added-user-defined-fields-be-nullable" class="common-anchor-header">为什么添加的用户定义字段必须允许为空？<button data-href="#Why-must-added-user-defined-fields-be-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>现有实体是在新字段存在之前插入的，因此它们没有该字段的值。设置<code translate="no">nullable=True</code> 可让Milvus将缺失值表示为<code translate="no">NULL</code> ，直到您的应用程序写入值，或者对于标量字段，直到应用默认值为止。</p>
<p>此规则适用于使用<code translate="no">add_collection_field()</code> 添加的用户定义标量字段和用户定义向量字段，以及使用<code translate="no">add_collection_struct_field()</code> 添加的StructArray字段。它不适用于函数生成的向量字段，因为该字段不能为可空。</p>
<h3 id="What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="common-anchor-header">添加用户定义字段后，现有实体会发生什么变化？<button data-href="#What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="anchor-icon" translate="no">
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
    </button></h3><p>对于用户定义的标量字段，除非您设置了<code translate="no">default_value</code> ，否则现有实体将返回<code translate="no">NULL</code> 。如果您设置了<code translate="no">default_value</code> ，现有实体将返回该默认值。</p>
<p>对于用户定义的向量字段，现有实体的该新向量字段值为<code translate="no">NULL</code> 。基于新增字段的向量搜索会跳过向量值为<code translate="no">NULL</code> 的实体。若要使现有实体可通过新向量字段进行搜索，请通过upsert或回填工作流写入非NULL的向量值。新建实体可在插入时包含该新向量字段。</p>
<p>对于 StructArray 字段，现有实体在其所有子字段中针对新 StructArray 字段返回<code translate="no">NULL</code> 。新实体必须为所有子字段提供<code translate="no">NULL</code> ，或者为所有子字段提供有效值。</p>
<h3 id="Can-I-add-BM25-lexical-search-to-an-existing-collection" class="common-anchor-header">我可以将 BM25 词汇搜索功能添加到现有 Collection 中吗？<button data-href="#Can-I-add-BM25-lexical-search-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>可以。如果Collection中已有启用分析器的<code translate="no">VARCHAR</code> 字段，您可以添加一个BM25函数及其生成的稀疏向量字段以实现词法搜索。在此工作流中，Milvus会在同一Schema变更中添加该函数、新的<code translate="no">SPARSE_FLOAT_VECTOR</code> 输出字段以及绑定索引定义。 在此模式变更工作流中，您无法将现有的<code translate="no">TEXT</code> 字段用作BM25输入。若要使用<code translate="no">TEXT</code> 输入，请在创建Collection时定义该字段和BM25函数。</p>
<p>调用<code translate="no">add_function_field()</code> 时，请提供一个<code translate="no">index_params</code> 对象，该对象包含一个<code translate="no">SPARSE_INVERTED_INDEX</code> 索引，并为新输出字段指定<code translate="no">metric_type=&quot;BM25&quot;</code> 。Milvus会将该索引定义绑定到生成的字段，作为同一Schema变更的一部分。</p>
<h3 id="How-do-I-drop-a-Function-and-its-generated-vector-field" class="common-anchor-header">如何删除一个函数及其生成的向量字段？<button data-href="#How-do-I-drop-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>调用<code translate="no">drop_function_field()</code> 并传入函数名称。在此模式变更工作流中，Milvus 会同时移除该函数、其生成的向量字段以及关联的索引，同时保留该函数的输入字段。</p>
<h3 id="Do-I-need-to-wait-after-altering-a-collection-schema" class="common-anchor-header">修改Collection Schema后需要等待吗？<button data-href="#Do-I-need-to-wait-after-altering-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>通常无需手动等待。如果后续操作依赖于更新后的 Schema，您可以先调用 `<code translate="no">describe_collection()</code> ` 来确认 Milvus 当前返回的 Schema。</p>
<p>在分布式部署中，Milvus 组件刷新 Collection 元数据时可能会存在短暂的传播窗口。如果 Schema 更改后立即执行的操作因 Schema 相关错误而失败，请刷新 Schema 并重试该操作。</p>
<h3 id="When-is-storage-space-reclaimed-after-dropping-a-field" class="common-anchor-header">删除字段后，存储空间何时会被回收？<button data-href="#When-is-storage-space-reclaimed-after-dropping-a-field" class="anchor-icon" translate="no">
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
    </button></h3><p>删除字段会将其从当前Schema和常规查询/搜索可见范围内移除，但该字段的历史数据不会立即从对象存储中物理删除。</p>
<p>存储空间可在后续的压缩过程中被回收。压缩是一个后台进程，它将现有数据文件重组为新的、更紧凑的文件。字段被删除后，新压缩的文件将遵循当前 Schema，并省略已删除的字段。Milvus 不保证在删除字段后能立即或在固定时间内减少存储空间。</p>
<h3 id="What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">如果我添加一个与Dynamic Field键同名的标量字段会怎样？<button data-href="#What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>如果启用了 Dynamic Field，您可以添加一个与现有 Dynamic Field 键同名的标量字段。在常规查询输出中，新标量字段会掩盖 Dynamic Field 键，但原始动态数据仍保存在<code translate="no">$meta</code> 中。</p>
<p>例如，如果现有实体存储了一个名为<code translate="no">source</code> 的动态键，而您随后添加了一个名为<code translate="no">source</code> 的标量字段，则<code translate="no">source</code> 的常规查询结果将引用该标量字段。若要访问原始动态值，请使用<code translate="no">$meta</code> 路径语法，例如<code translate="no">$meta[&quot;source&quot;]</code> 。</p>
