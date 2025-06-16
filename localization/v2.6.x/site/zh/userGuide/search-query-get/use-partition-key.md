---
id: use-partition-key.md
title: 使用分区密钥
summary: >-
  分区关键字是一种基于分区的搜索优化解决方案。通过指定一个特定的标量字段作为 Partition Key，并在搜索过程中根据 Partition Key
  指定过滤条件，可以将搜索范围缩小到几个分区，从而提高搜索效率。本文将介绍如何使用 Partition Key 及相关注意事项。
---
<h1 id="Use-Partition-Key" class="common-anchor-header">使用分区密钥<button data-href="#Use-Partition-Key" class="anchor-icon" translate="no">
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
    </button></h1><p>分区关键字是一种基于分区的搜索优化解决方案。通过指定特定标量字段作为 Partition Key，并在搜索过程中根据 Partition Key 指定过滤条件，可以将搜索范围缩小到多个分区，从而提高搜索效率。本文将介绍如何使用 Partition Key 以及相关注意事项。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中，你可以使用分区来实现数据隔离，并通过将搜索范围限制在特定分区来提高搜索性能。如果选择手动管理分区，可以在 Collections 中创建最多 1,024 个分区，并根据特定规则将实体插入这些分区，这样就可以通过限制在特定数量的分区内进行搜索来缩小搜索范围。</p>
<p>Milvus 引入了分区密钥，供你在数据隔离中重复使用分区，以克服在集合中创建分区数量的限制。创建 Collections 时，可以使用标量字段作为 Partition Key。一旦集合准备就绪，Milvus 就会在集合内创建指定数量的分区。收到插入的实体后，Milvus 会使用实体的分区密钥值计算一个哈希值，根据哈希值和集合的<code translate="no">partitions_num</code> 属性执行求模操作，以获得目标分区 ID，并将实体存储到目标分区中。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/partition-vs-partition-key.png" alt="Partition Vs Partition Key" class="doc-image" id="partition-vs-partition-key" />
   </span> <span class="img-wrapper"> <span>分区与分区 Key</span> </span></p>
<p>下图说明了在启用或未启用分区密钥功能的情况下，Milvus 如何处理 Collections 中的搜索请求。</p>
<ul>
<li><p>如果禁用了 Partition Key，Milvus 会在 Collections 中搜索与查询向量最相似的实体。如果知道哪个分区包含最相关的结果，就可以缩小搜索范围。</p></li>
<li><p>如果启用了分区关键字，Milvus 会根据搜索过滤器中指定的分区关键字值确定搜索范围，并只扫描分区内匹配的实体。</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/with-and-without-partition-key.png" alt="With And Without Partition Key" class="doc-image" id="with-and-without-partition-key" />
   </span> <span class="img-wrapper"> <span>有无分区密钥</span> </span></p>
<h2 id="Use-Partition-Key" class="common-anchor-header">使用分区密钥<button data-href="#Use-Partition-Key" class="anchor-icon" translate="no">
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
    </button></h2><p>要使用分区密钥，您需要</p>
<ul>
<li><p><a href="/docs/zh/use-partition-key.md#Set-Partition-Key">设置分区密钥</a>、</p></li>
<li><p><a href="/docs/zh/use-partition-key.md#Set-Partition-Numbers">设置要创建的分区数量</a>（可选），以及</p></li>
<li><p><a href="/docs/zh/use-partition-key.md#Create-Filtering-Condition">根据分区密钥创建过滤条件</a>。</p></li>
</ul>
<h3 id="Set-Partition-Key" class="common-anchor-header">设置分区密钥</h3><p>要将标量字段指定为分区密钥，需要在添加标量字段时将其<code translate="no">is_partition_key</code> 属性设置为<code translate="no">true</code> 。</p>
<div class="alert note">
<p>将标量字段设置为 Partition Key 时，字段值不能为空或 null。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
<h3 id="Set-Partition-Numbers" class="common-anchor-header">设置分区编号</h3><p>当你指定一个 Collections 中的标量字段作为 Partition Key 时，Milvus 会自动在 Collections 中创建 16 个分区。在接收到一个实体时，Milvus 会根据这个实体的 Partition Key 值选择一个分区，并将实体存储在分区中，从而导致部分或全部分区持有不同 Partition Key 值的实体。</p>
<p>您还可以确定与 Collections 一起创建的分区数量。只有将标量字段指定为 Partition Key 时，这种方法才有效。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Filtering-Condition" class="common-anchor-header">创建过滤条件</h3><p>在启用分区关键字功能的 Collections 中进行 ANN 搜索时，需要在搜索请求中包含涉及分区关键字的过滤表达式。在过滤表达式中，你可以将 Partition Key 的值限制在特定范围内，这样 Milvus 就会将搜索范围限制在相应的分区内。</p>
<p>在执行删除操作时，建议加入指定单一分区键的过滤表达式，以实现更高效的删除。这种方法将删除操作限制在特定分区内，减少了压缩过程中的写入放大，节省了用于压缩和索引的资源。</p>
<p>下面的示例演示了基于 Partition Key 的过滤，它基于一个特定的 Partition Key 值和一组 Partition Key 值。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
<p>必须将<code translate="no">partition_key</code> 替换为指定为分区密钥的字段名称。</p>
</div>
<h2 id="Use-Partition-Key-Isolation" class="common-anchor-header">使用 Partition Key 隔离<button data-href="#Use-Partition-Key-Isolation" class="anchor-icon" translate="no">
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
    </button></h2><p>在多租户场景中，可以将与租户身份相关的标量字段指定为分区密钥，并根据此标量字段中的特定值创建过滤器。为了进一步提高类似情况下的搜索性能，Milvus 引入了分区密钥隔离功能。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/partition-key-isolation.png" alt="Partition Key Isolation" class="doc-image" id="partition-key-isolation" />
   </span> <span class="img-wrapper"> <span>分区密钥隔离</span> </span></p>
<p>如上图所示，Milvus 根据分区键值对实体进行分组，并为每个分组创建单独的索引。收到搜索请求后，Milvus 会根据过滤条件中指定的 Partition Key 值定位索引，并将搜索范围限制在索引所包含的实体内，从而避免在搜索过程中扫描不相关的实体，大大提高搜索性能。</p>
<p>启用 "分区密钥隔离 "后，必须在基于分区密钥的过滤条件中只包含一个特定值，这样 Milvus 才能在匹配的索引所包含的实体内限制搜索范围。</p>
<div class="alert note">
<p>目前，分区密钥隔离功能只适用于索引类型设置为 HNSW 的搜索。</p>
</div>
<h3 id="Enable-Partition-Key-Isolation" class="common-anchor-header">启用分区密钥隔离功能</h3><p>以下代码示例演示了如何启用分区键隔离。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>启用分区密钥隔离后，仍可按照<a href="/docs/zh/use-partition-key.md#Set-Partition-Numbers">设置分区编号</a>中的说明设置分区密钥和分区数量。请注意，基于 Partition Key 的过滤器应只包含特定的 Partition Key 值。</p>
