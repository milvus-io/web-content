---
id: rtree.md
title: RTREECompatible with Milvus 2.6.4+
summary: >-
  RTREE 索引是一种基于树的数据结构，可加速对 GEOMETRY 字段的查询。如果您的 Collection
  以“通用几何描述语言”（WKT）格式存储点、线或多边形等几何对象，并且您希望加快空间过滤的速度，那么 RTREE 是一个理想的选择。
beta: Milvus 2.6.4+
---
<h1 id="RTREE" class="common-anchor-header">RTREE<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#RTREE" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">RTREE</code> 索引是一种基于树的数据结构，可加速Milvus中<code translate="no">GEOMETRY</code> 字段的查询。如果您的集合以<a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">“通用文本”（WKT）</a>格式存储点、线或多边形等几何对象，并且您希望加速空间过滤，那么<code translate="no">RTREE</code> 是理想的选择。</p>
<h2 id="How-it-works" class="common-anchor-header">工作原理<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 使用<code translate="no">RTREE</code> 索引高效组织和过滤几何数据，该过程分为两个阶段：</p>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">第一阶段：构建索引<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>创建叶节点：</strong>对于每个几何对象，计算其<a href="https://en.wikipedia.org/wiki/Minimum_bounding_rectangle">最小包围矩形</a>（MBR）——即完全包含该对象的最小矩形，并将其存储为叶节点。</p></li>
<li><p><strong>聚合为更大矩形：</strong>将相邻的叶节点聚类，并用新的最小包围矩形（MBR）包裹每个组，从而形成内部节点。例如，组<strong>B</strong>包含<strong>D</strong>和<strong>E</strong>；组<strong>C</strong>包含<strong>F</strong>和<strong>G</strong>。</p></li>
<li><p><strong>添加根节点：</strong>添加一个其最小包围矩形（MBR）覆盖所有内部组的根节点，从而形成高度平衡的树结构。</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/how-retree-works.png" alt="How Retree Works" class="doc-image" id="how-retree-works" /> 
   <span>Retree 的工作原理</span>
  
 </span></p>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">第二阶段：加速查询<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>构建查询 MBR：</strong>计算查询几何体的 MBR。</p></li>
<li><p><strong>修剪分支：</strong>从根节点开始，将查询 MBR 与每个内部节点进行比较。跳过任何 MBR 与查询 MBR 不相交的分支。</p></li>
<li><p><strong>收集候选节点：</strong>沿相交的分支向下遍历，以收集候选叶节点。</p></li>
<li><p><strong>精确匹配：</strong>对每个候选节点，执行精确空间谓词以确定真正的匹配项。</p></li>
</ol>
<h2 id="Create-an-RTREE-index" class="common-anchor-header">创建 RTREE 索引<button data-href="#Create-an-RTREE-index" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以在Schema中定义的<code translate="no">GEOMETRY</code> 字段上创建<code translate="no">RTREE</code> 索引。</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a GEOMETRY field named &quot;geo&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add RTREE index on the &quot;geo&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;geo&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;RTREE&quot;</span>,      <span class="hljs-comment"># Spatial index for GEOMETRY</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;rtree_geo&quot;</span>,  <span class="hljs-comment"># Optional, name your index</span></span>
<span class="highlighted-comment-line">    params={}                <span class="hljs-comment"># No extra params needed</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;geo_demo&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;geo&quot;</span>)
        .indexName(<span class="hljs-string">&quot;rtree_geo&quot;</span>)
        .indexType(IndexParam.IndexType.RTREE)
        .build();

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;geo_demo&quot;</span>)
        .indexParams(Collections.singletonList(indexParam))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;geo_demo&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>, index.NewRTreeIndex()).
    WithIndexName(<span class="hljs-string">&quot;rtree_geo&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">index_params</span> = <span class="hljs-built_in">vec!</span>[
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;geo&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;rtree_geo&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Rtree),
];

<span class="hljs-keyword">let</span> <span class="hljs-variable">create_index_req</span> = CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;geo_demo&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_params</span>(index_params)
    .<span class="hljs-title function_ invoke__">build</span>()?;

client.<span class="hljs-title function_ invoke__">create_index</span>(create_index_req).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">index</span><span class="hljs-params">(<span class="hljs-string">&quot;geo&quot;</span>, <span class="hljs-string">&quot;rtree_geo&quot;</span>, milvus::IndexType::RTREE)</span></span>;

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>()
                                 .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;geo_demo&quot;</span>)
                                 .<span class="hljs-built_in">WithIndexes</span>({index}));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;geo_demo&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;geo&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">RTREE</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;rtree_geo&quot;</span>,
    <span class="hljs-attr">params</span>: {},
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Assume you have defined a GEOMETRY field named &quot;geo&quot; in your collection schema</span>

<span class="hljs-comment">// Prepare index parameters</span>
<span class="hljs-keyword">var</span> indexParam = <span class="hljs-keyword">new</span> IndexParam(
    fieldName: <span class="hljs-string">&quot;geo&quot;</span>,
    indexName: <span class="hljs-string">&quot;rtree_geo&quot;</span>,
    indexType: IndexType.Rtree);

<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;geo_demo&quot;</span>,
    Indexes = [indexParam]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;geo_demo&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;geo&quot;,
            &quot;indexName&quot;: &quot;rtree_geo&quot;,
            &quot;indexType&quot;: &quot;RTREE&quot;,
            &quot;params&quot;: {}
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-with-RTREE" class="common-anchor-header">使用 RTREE 进行查询<button data-href="#Query-with-RTREE" class="anchor-icon" translate="no">
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
    </button></h2><p>您可在<code translate="no">filter</code> 表达式中使用几何操作符进行过滤。当目标<code translate="no">GEOMETRY</code> 字段上存在<code translate="no">RTREE</code> 时，Milvus会自动利用该索引对候选结果进行筛选。若未创建该索引，过滤操作将回退为全表扫描。</p>
<p>有关可用几何特定操作符的完整列表，请参阅《<a href="/docs/zh/geometry-operators.md">几何操作符</a>》。</p>
<h3 id="Example-1-Filter-only" class="common-anchor-header">示例 1：仅筛选<button data-href="#Example-1-Filter-only" class="anchor-icon" translate="no">
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
    </button></h3><p>查找位于给定多边形内的所有几何对象：</p>
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
<pre><code translate="no" class="language-python">filter_expr = <span class="hljs-string">&quot;ST_WITHIN(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;geo_demo&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>],
    limit=<span class="hljs-number">10</span>
)
<span class="hljs-built_in">print</span>(res)   <span class="hljs-comment"># Expected: a list of rows where geo is entirely inside the polygon</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-type">String</span> <span class="hljs-variable">filter_expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ST_WITHIN(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>;

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;geo_demo&quot;</span>)
        .filter(filter_expr)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>))
        .limit(<span class="hljs-number">10</span>)
        .build());
System.out.println(resp);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

filter_expr := <span class="hljs-string">&quot;ST_WITHIN(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>

_, err = cli.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;geo_demo&quot;</span>).
    WithFilter(filter_expr).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>).
    WithLimit(<span class="hljs-number">10</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_expr</span> = <span class="hljs-string">&quot;ST_WITHIN(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_req</span> = QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;geo_demo&quot;</span>)
    .<span class="hljs-title function_ invoke__">filter</span>(filter_expr)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>])
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client.<span class="hljs-title function_ invoke__">query</span>(query_req).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string&gt;</span></span>

std::string filter_expr = <span class="hljs-string">&quot;ST_WITHIN(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>;

milvus::QueryResponse response;
status = client-&gt;<span class="hljs-built_in">Query</span>(milvus::<span class="hljs-built_in">QueryRequest</span>()
                           .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;geo_demo&quot;</span>)
                           .<span class="hljs-built_in">WithFilter</span>(filter_expr)
                           .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>})
                           .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>),
                       response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter_expr = <span class="hljs-string">&quot;ST_WITHIN(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;geo_demo&quot;</span>,
    <span class="hljs-attr">filter</span>: filter_expr,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;

<span class="hljs-built_in">string</span> filterExpr = <span class="hljs-string">&quot;ST_WITHIN(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>;

QueryResp res = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;geo_demo&quot;</span>,
    Expression = filterExpr,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters
    {
        OutputFields = { <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span> },
        Limit = <span class="hljs-number">10</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d @- &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
{
    <span class="hljs-string">&quot;collectionName&quot;</span>: <span class="hljs-string">&quot;geo_demo&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: <span class="hljs-string">&quot;ST_WITHIN(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>,
    <span class="hljs-string">&quot;outputFields&quot;</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>],
    <span class="hljs-string">&quot;limit&quot;</span>: 10
}
EOF
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Vector-search-+-spatial-filter" class="common-anchor-header">示例 2：向量搜索 + 空间过滤<button data-href="#Example-2-Vector-search-+-spatial-filter" class="anchor-icon" translate="no">
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
    </button></h3><p>查找同时与某条直线相交的最近向量：</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you&#x27;ve also created an index on &quot;vec&quot; and loaded the collection.</span>
query_vec = [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]]
filter_expr = <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>

hits = client.search(
    collection_name=<span class="hljs-string">&quot;geo_demo&quot;</span>,
    data=query_vec,
    limit=<span class="hljs-number">5</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>]
)
<span class="hljs-built_in">print</span>(hits)  <span class="hljs-comment"># Expected: top-k by vector similarity among rows whose geo intersects the line</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">float</span>[] query_vec = {<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>};
<span class="hljs-type">String</span> <span class="hljs-variable">filter_expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;geo_demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(query_vec)))
        .topK(<span class="hljs-number">5</span>)
        .filter(filter_expr)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>))
        .build());
System.out.println(resp);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

query_vec := []entity.Vector{entity.FloatVector{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}}
filter_expr := <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>

_, err = cli.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;geo_demo&quot;</span>, <span class="hljs-number">5</span>, query_vec).
    WithFilter(filter_expr).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vec</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1f32</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>];
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_expr</span> = <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">search_req</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;geo_demo&quot;</span>)
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vec&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vec]))
    .<span class="hljs-title function_ invoke__">filter</span>(filter_expr)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>])
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client.<span class="hljs-title function_ invoke__">search</span>(search_req).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string&gt;</span></span>

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vec = {<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>};
std::string filter_expr = <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>;

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(milvus::<span class="hljs-built_in">SearchRequest</span>()
                            .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;geo_demo&quot;</span>)
                            .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
                            .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vec&quot;</span>)
                            .<span class="hljs-built_in">WithFilter</span>(filter_expr)
                            .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>})
                            .<span class="hljs-built_in">AddFloatVector</span>(query_vec),
                        response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_vec = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>];
<span class="hljs-keyword">const</span> filter_expr = <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;geo_demo&quot;</span>,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vec&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vec],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">filter</span>: filter_expr,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>],
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Assume you&#x27;ve also created an index on &quot;vec&quot; and loaded the collection.</span>
<span class="hljs-keyword">var</span> queryVec = <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span> });
<span class="hljs-built_in">string</span> filterExpr = <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>;

SearchResp hits = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;geo_demo&quot;</span>,
    Vectors = [queryVec],
    VectorFieldName = <span class="hljs-string">&quot;vec&quot;</span>,
    MetricType = MetricType.L2,
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = filterExpr
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d @- &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
{
    <span class="hljs-string">&quot;collectionName&quot;</span>: <span class="hljs-string">&quot;geo_demo&quot;</span>,
    <span class="hljs-string">&quot;annsField&quot;</span>: <span class="hljs-string">&quot;vec&quot;</span>,
    <span class="hljs-string">&quot;data&quot;</span>: [[0.1, 0.2, 0.3, 0.4, 0.5]],
    <span class="hljs-string">&quot;limit&quot;</span>: 5,
    <span class="hljs-string">&quot;filter&quot;</span>: <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>,
    <span class="hljs-string">&quot;outputFields&quot;</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>]
}
EOF
<button class="copy-code-btn"></button></code></pre>
<p>有关如何使用<code translate="no">GEOMETRY</code> 字段的更多信息，请参阅<a href="/docs/zh/geometry-field.md">几何字段</a>。</p>
<h2 id="Drop-an-index" class="common-anchor-header">删除索引<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>使用 `<code translate="no">drop_index()</code> ` 方法从 Collection 中删除现有索引。</p>
<div class="alert note">
<ul>
<li><p>在<strong>v2.6.3</strong>及更早版本中，删除标量索引前必须先释放 Collection。</p></li>
<li><p>从<strong>v2.6.4</strong>及更高版本开始，一旦不再需要标量索引，即可直接删除，无需先释放 Collection。</p></li>
</ul>
</div>
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
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;geo_demo&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;rtree_geo&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DropIndexReq;

client.dropIndex(DropIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;geo_demo&quot;</span>)
        .indexName(<span class="hljs-string">&quot;rtree_geo&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption(<span class="hljs-string">&quot;geo_demo&quot;</span>, <span class="hljs-string">&quot;rtree_geo&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">drop_index_req</span> = DropIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;geo_demo&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;rtree_geo&quot;</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

client.<span class="hljs-title function_ invoke__">drop_index</span>(drop_index_req).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropIndex</span>(milvus::<span class="hljs-built_in">DropIndexRequest</span>()
                               .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;geo_demo&quot;</span>)
                               .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;rtree_geo&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;geo_demo&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;rtree_geo&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">await</span> client.DropIndexAsync(<span class="hljs-keyword">new</span> DropIndexReq
{
    CollectionName = <span class="hljs-string">&quot;geo_demo&quot;</span>, <span class="hljs-comment">// Name of the collection</span>
    IndexName = <span class="hljs-string">&quot;rtree_geo&quot;</span> <span class="hljs-comment">// Name of the index to drop</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;geo_demo&quot;,
    &quot;indexName&quot;: &quot;rtree_geo&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
