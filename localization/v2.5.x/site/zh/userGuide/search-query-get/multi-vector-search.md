---
id: multi-vector-search.md
title: 混合搜索
summary: >-
  混合搜索指的是一种同时进行多个 ANN 搜索、对这些 ANN 搜索的多组结果进行 Rerankers
  并最终返回一组结果的搜索方法。使用混合搜索可以提高搜索精度。Milvus 支持在具有多个向量场的 Collections 上进行混合搜索。
---
<h1 id="Hybrid-Search" class="common-anchor-header">混合搜索<button data-href="#Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>混合搜索指的是一种同时进行多个 ANN 搜索、对这些 ANN 搜索的多组结果进行 Rerankers 并最终返回一组结果的搜索方法。使用混合搜索可以提高搜索的准确性。Milvus 支持在具有多个向量场的 Collections 上进行混合搜索。</p>
<p>混合搜索最常用于稀疏密集向量搜索和多模态搜索等场景。本指南将通过一个具体实例演示如何在 Milvus 中进行混合搜索。</p>
<h2 id="Scenarios" class="common-anchor-header">应用场景<button data-href="#Scenarios" class="anchor-icon" translate="no">
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
    </button></h2><p>混合搜索适用于以下两种情况：</p>
<h3 id="Sparse-Dense-Vector-Search" class="common-anchor-header">稀疏-密集向量搜索</h3><p>不同类型的向量可以表示不同的信息，使用不同的嵌入模型可以更全面地表示数据的不同特征和方面。例如，对同一个句子使用不同的 Embeddings 模型，可以生成表示语义的密集向量和表示句子中词频的稀疏向量。</p>
<ul>
<li><p><strong>稀疏向量：</strong>稀疏向量的特点是其向量维度高，存在很少的非零值。这种结构使其特别适合传统的信息检索应用。在大多数情况下，稀疏向量中使用的维数对应于一种或多种语言中的不同词块。每个维度都有一个值，表示该标记在文档中的相对重要性。这种布局对于涉及关键词匹配的任务非常有利。</p></li>
<li><p><strong>密集向量：</strong>密集向量是从神经网络中衍生出来的嵌入。当排列成有序数组时，这些向量能捕捉到输入文本的语义本质。需要注意的是，稠密向量并不局限于文本处理；它们还广泛应用于计算机视觉领域，以表示视觉数据的语义。这些稠密向量通常由文本 Embeddings 模型生成，其特点是大部分或所有元素都非零。因此，密集向量对于语义搜索应用特别有效，因为即使在没有精确关键词匹配的情况下，它们也能根据向量距离返回最相似的结果。这种功能可以获得更细致入微、更能感知上下文的搜索结果，通常可以捕捉到基于关键词的方法可能忽略的概念之间的关系。</p></li>
</ul>
<p>更多详情，请参阅<a href="/docs/zh/sparse_vector.md">稀疏向量</a>和<a href="/docs/zh/dense-vector.md">密集向量</a>。</p>
<h3 id="Multimodal-Search" class="common-anchor-header">多模式搜索</h3><p>多模态搜索是指跨多种模态（如图像、视频、音频、文本等）对非结构化数据进行相似性搜索。例如，一个人可以用指纹、声纹和面部特征等多种数据模式来表示。混合搜索支持同时进行多种搜索。例如，用相似的指纹和声纹搜索一个人。</p>
<h2 id="Workflow" class="common-anchor-header">工作流程<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>混合搜索的主要工作流程如下：</p>
<ol>
<li><p>通过<a href="https://zilliz.com/learn/explore-colbert-token-level-embedding-and-ranking-model-for-similarity-search#A-Quick-Recap-of-BERT">BERT</a>和<a href="https://zilliz.com/learn/NLP-essentials-understanding-transformers-in-AI">Transformers</a> 等嵌入模型生成密集向量。</p></li>
<li><p>通过<a href="https://zilliz.com/learn/mastering-bm25-a-deep-dive-into-the-algorithm-and-application-in-milvus">BM25</a>、<a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#BGE-M3">BGE-M3</a>、<a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#SPLADE">SPLADE</a> 等嵌入模型生成稀疏向量。</p></li>
<li><p>在 Milvus 中创建 Collections 并定义 Collections Schema，其中包括密集向量场和稀疏向量场。</p></li>
<li><p>将稀疏密集向量插入上一步刚刚创建的 Collections 中。</p></li>
<li><p>进行混合搜索：稠密向量上的 ANN 搜索将返回一组前 K 个最相似的结果，稀疏向量上的文本匹配也将返回一组前 K 个结果。</p></li>
<li><p>归一化：对两组 K 强结果的得分进行归一化，将得分转换为 [0,1] 之间的范围。</p></li>
<li><p>选择适当的 Rerankers 策略，对两组 Top-K 结果进行合并和重排，最终返回一组 Top-K 结果。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/hybrid-search.png" alt="Hybrid Search" class="doc-image" id="hybrid-search" />
   </span> <span class="img-wrapper"> <span>混合搜索</span> </span></p>
<h2 id="Examples" class="common-anchor-header">示例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>本节将使用一个具体示例来说明如何在稀疏密集向量上进行混合搜索，以提高文本搜索的准确性。</p>
<h3 id="Create-a-collection-with-multiple-vector-fields" class="common-anchor-header">创建具有多个向量场的 Collections</h3><p>创建 Collections 的过程包括三个部分：定义 Collections Schema、配置索引参数和创建 Collections。</p>
<h4 id="Define-schema" class="common-anchor-header">定义 Schema</h4><p>在本例中，需要在 Collections Schema 中定义多个向量字段。目前，每个 Collection 默认最多可包含 4 个向量字段。但也可以根据需要修改<code translate="no">proxy.maxVectorFieldNum</code> 的值，在集合中最多包含 10 个向量字段。</p>
<p>下面的示例定义了一个 Collection Schema，其中<code translate="no">dense</code> 和<code translate="no">sparse</code> 是两个向量字段：</p>
<ul>
<li><p><code translate="no">id</code>:该字段是存储文本 ID 的主键。该字段的数据类型为 INT64。</p></li>
<li><p><code translate="no">text</code>:该字段用于存储文本内容。该字段的数据类型为 VARCHAR，最大长度为 1000 个字符。</p></li>
<li><p><code translate="no">dense</code>:该字段用于存储文本的密集向量。该字段的数据类型为 FLOAT_VECTOR，向量维数为 768。</p></li>
<li><p><code translate="no">sparse</code>:该字段用于存储文本的稀疏向量。该字段的数据类型为 SPARSE_FLOAT_VECTOR。</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create a collection in customized setup mode</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient, DataType
)

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)
<span class="hljs-comment"># Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)
schema.add_field(field_name=<span class="hljs-string">&quot;dense&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
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

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;dense&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
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

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">true</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">1000</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;dense&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// Create a collection in customized setup mode</span>
<span class="hljs-comment">// Define fields</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SPARSE_FLOAT_VECTOR</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;dense&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: false,
        &quot;enabledDynamicField&quot;: true,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            },
            {
                &quot;fieldName&quot;: &quot;dense&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在稀疏向量搜索过程中，可以利用全文搜索功能简化生成稀疏嵌入向量的过程。有关详细信息，请参阅<a href="/docs/zh/full-text-search.md">全文搜索</a>。</p>
<h4 id="Create-index" class="common-anchor-header">创建索引</h4><p>定义完 Collections Schema 后，有必要设置向量索引和相似度度量。在本例中，为密集向量场<code translate="no">dense</code> 和稀疏向量场<code translate="no">sparse</code> 都创建了<strong>AUTOINDEX</strong>类型的索引。您可以根据需要使用其他索引类型。要了解支持的索引类型，请参阅<a href="/docs/zh/index-vector-fields.md">可用索引类型</a>。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add indexes</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_name=<span class="hljs-string">&quot;dense_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Index type for sparse vectors</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Currently, only IP (Inner Product) is supported for sparse vectors</span>
    params={<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># The ratio of small vector values to be dropped during indexing</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

Map&lt;String, Object&gt; denseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForDenseField</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;dense&quot;</span>)
        .indexName(<span class="hljs-string">&quot;dense_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build();

Map&lt;String, Object&gt; sparseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
sparseParams.put(<span class="hljs-string">&quot;drop_ratio_build&quot;</span>, <span class="hljs-number">0.2</span>);
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForSparseField</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .indexName(<span class="hljs-string">&quot;sparse_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .extraParams(sparseParams)
        .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForDenseField);
indexParams.add(indexParamForSparseField);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOption1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>,
    index.NewSparseInvertedIndex(entity.IP, <span class="hljs-number">0.2</span>))
indexOption2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;dense&quot;</span>,
    index.NewAutoIndex(index.MetricType(entity.IP)))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;dense&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>
},{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>
}]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;dense&quot;,
            &quot;metricType&quot;: &quot;IP&quot;,
            &quot;indexName&quot;: &quot;dense_index&quot;,
            &quot;indexType&quot;:&quot;AUTOINDEX&quot;
        },
        {
            &quot;fieldName&quot;: &quot;sparse&quot;,
            &quot;metricType&quot;: &quot;IP&quot;,
            &quot;indexName&quot;: &quot;sparse_index&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-collection" class="common-anchor-header">创建 Collections</h4><p>使用前两个步骤中配置的集合 Schema 和索引创建名为<code translate="no">demo</code> 的集合。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption1, indexOption2))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">index_params</span>: index_params,
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">插入数据</h3><p>将稀疏密集向量插入集合<code translate="no">demo</code> 。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

data=[
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>:{<span class="hljs-number">9637</span>: <span class="hljs-number">0.30856525997853057</span>, <span class="hljs-number">4399</span>: <span class="hljs-number">0.19771651149001523</span>, ...}, <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>:{<span class="hljs-number">6959</span>: <span class="hljs-number">0.31025067641541815</span>, <span class="hljs-number">1729</span>: <span class="hljs-number">0.8265339135915016</span>, ...}, <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, ...]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>:{<span class="hljs-number">1220</span>: <span class="hljs-number">0.15303302147479103</span>, <span class="hljs-number">7335</span>: <span class="hljs-number">0.9436728846033107</span>, ...}, <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, ...]}]

res = client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);
row1.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>);
row1.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense1));
row1.add(<span class="hljs-string">&quot;sparse&quot;</span>, gson.toJsonTree(sparse1));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);
row2.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>);
row2.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense2));
row2.add(<span class="hljs-string">&quot;sparse&quot;</span>, gson.toJsonTree(sparse2));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>);
row3.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>);
row3.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense3));
row3.add(<span class="hljs-string">&quot;sparse&quot;</span>, gson.toJsonTree(sparse3));

List&lt;JsonObject&gt; data = Arrays.asList(row1, row2, row3);
<span class="hljs-type">InsertReq</span> <span class="hljs-variable">insertReq</span> <span class="hljs-operator">=</span> InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(insertReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">v := <span class="hljs-built_in">make</span>([]entity.SparseEmbedding, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>)
sparseVector1, _ := entity.NewSliceSparseEmbedding([]<span class="hljs-type">uint32</span>{<span class="hljs-number">9637</span>, <span class="hljs-number">4399</span>, <span class="hljs-number">3573</span>}, []<span class="hljs-type">float32</span>{<span class="hljs-number">0.30856525997853057</span>, <span class="hljs-number">0.19771651149001523</span>, <span class="hljs-number">0.1576378135</span>})
v = <span class="hljs-built_in">append</span>(v, sparseVector1)
sparseVector2, _ := entity.NewSliceSparseEmbedding([]<span class="hljs-type">uint32</span>{<span class="hljs-number">6959</span>, <span class="hljs-number">1729</span>, <span class="hljs-number">5263</span>}, []<span class="hljs-type">float32</span>{<span class="hljs-number">0.31025067641541815</span>, <span class="hljs-number">0.8265339135915016</span>, <span class="hljs-number">0.68647322132</span>})
v = <span class="hljs-built_in">append</span>(v, sparseVector2)
sparseVector3, _ := entity.NewSliceSparseEmbedding([]<span class="hljs-type">uint32</span>{<span class="hljs-number">1220</span>, <span class="hljs-number">7335</span>}, []<span class="hljs-type">float32</span>{<span class="hljs-number">0.15303302147479103</span>, <span class="hljs-number">0.9436728846033107</span>})
v = <span class="hljs-built_in">append</span>(v, sparseVector3)
sparseColumn := column.NewColumnSparseVectors(<span class="hljs-string">&quot;sparse&quot;</span>, v)

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>}).
    WithVarcharColumn(<span class="hljs-string">&quot;text&quot;</span>, []<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
        <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
        <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
    }).
    WithFloatVectorColumn(<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>},
        {<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>},
        {<span class="hljs-number">0.43742130801983836</span>, <span class="hljs-number">-0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>},
    }).
    WithColumns(sparseColumn))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">var</span> data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>, <span class="hljs-attr">sparse</span>:[<span class="hljs-number">9637</span>: <span class="hljs-number">0.30856525997853057</span>, <span class="hljs-number">4399</span>: <span class="hljs-number">0.19771651149001523</span>, ...] , <span class="hljs-attr">dense</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>, <span class="hljs-attr">sparse</span>:[<span class="hljs-number">6959</span>: <span class="hljs-number">0.31025067641541815</span>, <span class="hljs-number">1729</span>: <span class="hljs-number">0.8265339135915016</span>, ...] , <span class="hljs-attr">dense</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>]},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span> , <span class="hljs-attr">sparse</span>:[<span class="hljs-number">1220</span>: <span class="hljs-number">0.15303302147479103</span>, <span class="hljs-number">7335</span>: <span class="hljs-number">0.9436728846033107</span>, ...] , <span class="hljs-attr">dense</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>]}       
]

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data,
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 0, &quot;text&quot;: &quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;, &quot;sparse&quot;:{&quot;9637&quot;: 0.30856525997853057, &quot;4399&quot;: 0.19771651149001523}, &quot;dense&quot;: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, ...]},
        {&quot;id&quot;: 1, &quot;text&quot;: &quot;Alan Turing was the first person to conduct substantial research in AI.&quot;, &quot;sparse&quot;:{&quot;6959&quot;: 0.31025067641541815, &quot;1729&quot;: 0.8265339135915016}, &quot;dense&quot;: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, ...]},
        {&quot;id&quot;: 2, &quot;text&quot;: &quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;, &quot;sparse&quot;:{&quot;1220&quot;: 0.15303302147479103, &quot;7335&quot;: 0.9436728846033107}, &quot;dense&quot;: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, ...]}
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-multiple-AnnSearchRequest-instances" class="common-anchor-header">创建多个 AnnSearchRequest 实例</h3><p>混合搜索是通过在<code translate="no">hybrid_search()</code> 函数中创建多个<code translate="no">AnnSearchRequest</code> 来实现的，其中每个<code translate="no">AnnSearchRequest</code> 代表一个特定向量场的基本 ANN 搜索请求。因此，在进行混合搜索之前，有必要为每个向量场创建一个<code translate="no">AnnSearchRequest</code> 。</p>
<p>通过在<code translate="no">AnnSearchRequest</code> 中配置<code translate="no">expr</code> 参数，可以为混合搜索设置过滤条件。请参阅<a href="/docs/zh/filtered-search.md">过滤搜索</a>和<a href="/docs/zh/filtering">过滤</a>。</p>
<div class="alert note">
<p>在混合搜索中，每个<code translate="no">AnnSearchRequest</code> 只支持一个查询向量。</p>
</div>
<p>假设查询文本 "谁开始了人工智能研究？"已经被转换成稀疏向量和密集向量。在此基础上，分别针对<code translate="no">sparse</code> 和<code translate="no">dense</code> 向量字段创建两个<code translate="no">AnnSearchRequest</code> 搜索请求，如下例所示。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

query_dense_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: [query_dense_vector],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_1 = AnnSearchRequest(**search_param_1)

query_sparse_vector = {<span class="hljs-number">3573</span>: <span class="hljs-number">0.34701499565746674</span>, <span class="hljs-number">5263</span>: <span class="hljs-number">0.2639375518635271</span>}
search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: [query_sparse_vector],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_2 = AnnSearchRequest(**search_param_2)

reqs = [request_1, request_2]

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BaseVector;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.SparseFloatVec;

<span class="hljs-type">float</span>[] dense = <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.0475336798f</span>,  <span class="hljs-number">0.0521207601f</span>,  <span class="hljs-number">0.0904406682f</span>, ...};
SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;Long, Float&gt;() {{
    put(<span class="hljs-number">3573L</span>, <span class="hljs-number">0.34701499f</span>);
    put(<span class="hljs-number">5263L</span>, <span class="hljs-number">0.263937551f</span>);
    ...
}};

List&lt;BaseVector&gt; queryDenseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(dense));
List&lt;BaseVector&gt; querySparseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">SparseFloatVec</span>(sparse));

List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;dense&quot;</span>)
        .vectors(queryDenseVectors)
        .metricType(IndexParam.MetricType.IP)
        .params(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .vectors(querySparseVectors)
        .metricType(IndexParam.MetricType.IP)
        .params(<span class="hljs-string">&quot;{\&quot;drop_ratio_build\&quot;: 0.2}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}
sparseVector, _ := entity.NewSliceSparseEmbedding([]<span class="hljs-type">uint32</span>{<span class="hljs-number">3573</span>, <span class="hljs-number">5263</span>}, []<span class="hljs-type">float32</span>{<span class="hljs-number">0.34701499</span>, <span class="hljs-number">0.263937551</span>})

request1 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-number">2</span>, entity.FloatVector(queryVector)).
    WithAnnParam(index.NewIvfAnnParam(<span class="hljs-number">10</span>)).
    WithSearchParam(index.MetricTypeKey, <span class="hljs-string">&quot;IP&quot;</span>)
annParam := index.NewSparseAnnParam()
annParam.WithDropRatio(<span class="hljs-number">0.2</span>)
request2 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-number">2</span>, sparseVector).
    WithAnnParam(annParam).
    WithSearchParam(index.MetricTypeKey, <span class="hljs-string">&quot;IP&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_vector, 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense&quot;</span>, 
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}

<span class="hljs-keyword">const</span> search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_sparse_vector, 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse&quot;</span>, 
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> req=<span class="hljs-string">&#x27;[
    {
        &quot;data&quot;: [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592,....]],
        &quot;annsField&quot;: &quot;dense&quot;,
        &quot;params&quot;: {
            &quot;params&quot;: {
                &quot;nprobe&quot;: 10
             }
        },
        &quot;limit&quot;: 2
    },
    {
        &quot;data&quot;: [{&quot;3573&quot;: 0.34701499565746674}, {&quot;5263&quot;: 0.2639375518635271}],
        &quot;annsField&quot;: &quot;sparse&quot;,
        &quot;params&quot;: {
            &quot;params&quot;: {
                &quot;drop_ratio_build&quot;: 0.2
             }
        },
        &quot;limit&quot;: 2
    }
 ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>由于<code translate="no">limit</code> 参数设置为 2，因此每个<code translate="no">AnnSearchRequest</code> 都会返回 2 个搜索结果。在本例中，创建了 2 个<code translate="no">AnnSearchRequest</code> ，因此总共会返回 4 个搜索结果。</p>
<h3 id="Configure-a-reranking-strategy" class="common-anchor-header">配置 Rerankers 策略</h3><p>要对两组 ANN 搜索结果进行合并和重新排序，有必要选择适当的重新排序策略。Milvus 支持两种重排策略：<strong>加权排名策略（WeightedRanker</strong>）和<strong>重</strong> <strong>排序</strong>策略（<strong>RRFRanker</strong>）。在选择重排策略时，需要考虑的一个问题是，是否强调向量场上的一个或多个基本 ANN 搜索。</p>
<ul>
<li><p><strong>加权排名</strong>：如果您要求结果强调特定的向量场，建议使用该策略。通过 WeightedRanker，您可以为某些向量场分配更高的权重，从而更加强调这些向量场。例如，在多模态搜索中，图片的文字描述可能比图片的颜色更重要。</p></li>
<li><p><strong>RRFRanker（互易排名融合排名器）</strong>：在没有特定重点的情况下，建议采用这种策略。RRF 可以有效平衡每个向量场的重要性。</p></li>
</ul>
<p>有关这两种 Reranking 策略机制的更多详情，请参阅<a href="/docs/zh/reranking.md">Reranking</a>。</p>
<p>下面两个示例演示了如何使用 WeightedRanker 和 RRFRanker 重排序策略：</p>
<ol>
<li><p><strong>例 1：使用加权排名策略</strong></p>
<p>使用 WeightedRanker 策略时，需要在<code translate="no">WeightedRanker</code> 函数中输入权重值。混合搜索中的基本 ANN 搜索次数与需要输入的值的次数相对应。输入值的范围应为 [0,1]，数值越接近 1 表示重要性越高。</p>
<p><div class="multipleCode">
<a href="#python">Python</a><a href="#java">Java</a><a href="#go">Go</a><a href="#javascript">NodeJS</a><a href="#bash">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

ranker = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>) 
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BaseRanker;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;

<span class="hljs-type">BaseRanker</span> <span class="hljs-variable">reranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">reranker := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> rerank = <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;ws&quot;,
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>示例 2：使用 RRFRanker</strong></p>
<p>使用 RRFRanker 策略时，需要将参数值<code translate="no">k</code> 输入 RRFRanker。<code translate="no">k</code> 的默认值为 60。该参数有助于确定如何组合来自不同 ANN 搜索的排名，目的是平衡和混合所有搜索的重要性。</p>
<p><div class="multipleCode">
<a href="#python">Python</a><a href="#java">Java</a><a href="#go">Go</a><a href="#javascript">NodeJS</a><a href="#bash">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

ranker = RRFRanker(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BaseRanker;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;

<span class="hljs-type">BaseRanker</span> <span class="hljs-variable">reranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">reranker := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> rerank = <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;rrf&quot;,
        &quot;params&quot;: { &quot;k&quot;: 100}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Perform-a-Hybrid-Search" class="common-anchor-header">执行混合搜索</h3><p>在进行混合搜索之前，有必要将 Collections 加载到内存中。如果集合中的任何向量字段没有索引或没有加载，调用 Hybrid Search 方法时就会出错。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=reqs,
    ranker=ranker,
    limit=<span class="hljs-number">2</span>
)
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .searchRequests(searchRequests)
        .ranker(reranker)
        .topK(<span class="hljs-number">2</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSets, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-number">2</span>,
    request1,
    request2,
).WithReranker(reranker))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
})

<span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">RRFRanker</span>, <span class="hljs-title class_">WeightedRanker</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: [search_param_1, search_param_2],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>)
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/advanced_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;search\&quot;: <span class="hljs-variable">${req}</span>,
    \&quot;rerank\&quot;: {
        \&quot;strategy\&quot;:\&quot;rrf\&quot;,
        \&quot;params\&quot;: {
            \&quot;k\&quot;: 10
        }
    },
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [
        \&quot;user_id\&quot;,
        \&quot;word_count\&quot;,
        \&quot;book_describe\&quot;
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>输出结果如下：</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<p>由于在混合搜索中指定了<code translate="no">limit=2</code> ，Milvus 将对步骤 3 中的 4 个搜索结果进行重新排序，最终只返回最相似的前 2 个搜索结果。</p>
