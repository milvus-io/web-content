---
id: mmap.md
title: 使用 mmap
summary: >-
  内存映射（Mmap）支持直接访问磁盘上的大文件，从而使 Milvus
  能够将索引和数据同时存储在内存和硬盘中。这种方法有助于根据访问频率优化数据放置策略，在不会显著影响搜索性能的情况下，扩展 Collections
  的存储容量。 本页面将帮助您了解 Milvus 如何利用 mmap 实现快速高效的数据存储和检索。
---
<h1 id="Use-mmap" class="common-anchor-header">使用 mmap<button data-href="#Use-mmap" class="anchor-icon" translate="no">
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
    </button></h1><p>内存映射（mmap）支持直接访问磁盘上的大文件，使 Milvus 能够将索引和数据同时存储在内存和硬盘中。这种方法有助于根据访问频率优化数据放置策略，在不会显著影响搜索性能的情况下，为 Collections 扩展存储容量。 本页面将帮助您了解 Milvus 如何利用 mmap 实现快速高效的数据存储和检索。</p>
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
    </button></h2><p>Milvus 使用 Collection 来组织向量嵌入及其元数据，Collection 中的每一行代表一个实体。如下图左侧所示，向量字段存储向量嵌入，标量字段存储其元数据。当您在特定字段上创建索引并加载 Collection 后，Milvus 会将创建的索引和字段原始数据加载到内存中。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/mmap-illustrated.png" alt="Mmap Illustrated" class="doc-image" id="mmap-illustrated" /> 
   <span>mmap 图解</span>
  
 </span></p>
<p>Milvus 是一个内存密集型数据库系统，可用内存大小决定了 Collection 的容量。如果数据量超过内存容量，就无法将包含海量数据的字段加载到内存中——而这在 AI 驱动的应用程序中是常见的情况。</p>
<p>为解决此类问题，Milvus 引入了 mmap 机制，以平衡 Collection 中“热数据”和“冷数据”的加载。如上图右侧所示，您可以配置 Milvus，使其对特定字段的原始数据进行内存映射，而非将其完全加载到内存中。 这样，您就可以直接访问这些字段，无需担心内存问题，同时还能扩展Collection的容量。</p>
<p>通过对比左图和右图中的数据放置流程，可以发现左图中的内存占用远高于右图。 启用 mmap 后，本应加载到内存中的数据会被卸载到硬盘，并缓存到操作系统的页面缓存中，从而减少内存占用。不过，缓存未命中可能会导致性能下降。详情请参阅<a href="https://en.wikipedia.org/wiki/Mmap">这篇文章</a>。</p>
<p>在 Milvus 上配置 mmap 时，请务必遵循以下原则：始终将频繁访问的数据和索引完全加载到内存中，仅对其余字段使用 mmap。</p>
<h2 id="Use-mmap-in-Milvus" class="common-anchor-header">在 Milvus 中使用 mmap<button data-href="#Use-mmap-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供了全局、字段、索引和 Collection 级别的分层 mmap 设置，其中索引和字段级别的设置优先于 Collection 级别，而 Collection 级别又优先于全局级别。</p>
<h3 id="Global-mmap-settings" class="common-anchor-header">全局 mmap 设置<button data-href="#Global-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>集群级设置即全局设置，优先级最低。Milvus 在 `<code translate="no">milvus.yaml</code>` 中提供了若干与 mmap 相关的设置。这些设置将应用于集群中的所有 Collections。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">mmap:</span>
    <span class="hljs-attr">scalarField:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">scalarIndex:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">vectorField:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">vectorIndex:</span> <span class="hljs-literal">false</span>
    <span class="hljs-comment"># The following should be a path on a high-performance disk</span>
    <span class="hljs-attr">mmapDirPath:</span> <span class="hljs-string">any/valid/path</span> 
<span class="hljs-string">....</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>配置项</p></th>
     <th><p>描述</p></th>
     <th><p>默认值</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.scalarField</code></p></td>
     <td><p>指定是否将所有标量字段的原始数据映射到内存中。将此项设置为<code translate="no">true</code> 时，Milvus会将Collection中标量字段的原始数据映射到内存中，而非在接收到针对该Collection的加载请求时才将其完全加载。</p></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.scalarIndex</code></p></td>
     <td><p>指定是否将所有标量字段索引映射到内存中。将此项设置为<code translate="no">true</code> 时，Milvus 会将 Collection 的标量字段索引映射到内存中，而不是在收到针对该 Collection 的加载请求时将其完全加载。</p><p>目前，仅支持使用以下索引类型的标量字段：</p><ul><li>INVERTED</li></ul></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.vectorField</code></p></td>
     <td><p>指定是否将所有向量字段的原始数据映射到内存中。将此参数设置为<code translate="no">true</code> 时，Milvus会将Collection中向量字段的原始数据映射到内存中，而不是在收到针对该Collection的加载请求时将其完全加载。</p></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.vectorIndex</code></p></td>
     <td><p>指定是否将所有向量字段索引映射到内存中。将此参数设置为<code translate="no">true</code> 时，Milvus会将Collection的向量字段索引映射到内存中，而不是在收到针对该Collection的加载请求时将其完全加载。</p><p>目前，仅支持使用以下索引类型的向量字段：</p><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>BIN_FLAT</p></li><li><p>BIN_IVF_FLAT</p></li><li><p>HNSW</p></li><li><p>SCANN</p></li><li><p>稀疏_反向索引</p></li><li><p>SPARSE_WAND</p></li></ul></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.mmapDirPath</code></p></td>
     <td><p>指定内存映射文件的路径。若未指定，则采用默认值。 </p><p>默认值中的<code translate="no">localStorage.path</code> 占位符表示Milvus查询节点（QueryNodes）的硬盘。请确保您的查询节点配备高性能硬盘，以充分发挥mmap的优势。</p></td>
     <td><p><code translate="no">{localStorage.path}/mmap</code></p></td>
   </tr>
</table>
<p>若要将上述设置应用到您的 Milvus 集群，请按照《<a href="/docs/zh/v2.6.x/configure-helm.md#Configure-Milvus-via-configuration-file">使用 Helm 配置 Milvus</a>》和《<a href="/docs/zh/v2.6.x/configure_operator.md">使用 Milvus Operator 配置 Milvus</a>》中的步骤操作。</p>
<p>有时，面对特定用例时，全局 mmap 设置可能不够灵活。若要对特定 Collection 或其索引应用替代设置，请考虑针对 Collection、字段或索引配置专属的 mmap 设置。您需要先发布并加载 Collection，mmap 设置的更改才会生效。</p>
<h3 id="Field-specific-mmap-settings" class="common-anchor-header">字段级 mmap 设置<button data-href="#Field-specific-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>要配置字段级 mmap，您需要在添加字段时包含 `<code translate="no">mmap_enabled</code> ` 参数。通过将该参数设置为 `<code translate="no">True</code>`，即可为该特定字段启用 mmap。</p>
<p>以下示例演示了在添加字段时如何配置针对特定字段的 mmap。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN
)

schema = MilvusClient.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

schema = MilvusClient.create_schema()

<span class="hljs-comment"># Add a scalar field and enable mmap</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_chunk&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    mmap_enabled=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Alter mmap settings on a specific field</span>
<span class="hljs-comment"># The following assumes that you have a collection named `my_collection`</span>
client.alter_collection_field(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;doc_chunk&quot;</span>,
    field_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.Constant;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.*;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

Map&lt;String, String&gt; typeParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, String&gt;() {{
    put(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>);
}};
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;doc_chunk&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .typeParams(typeParams)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">req</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(req);

client.alterCollectionField(AlterCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;doc_chunk&quot;</span>)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;true&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>=<span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TOKEN</span>=<span class="hljs-string">&quot;YOUR_TOKEN&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">await</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-variable constant_">TOKEN</span>
});

<span class="hljs-keyword">const</span> schema = [
{
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>
},
{
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;doc_chunk&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">false</span>,
}
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionFieldProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;doc_chunk&quot;</span>,
    <span class="hljs-attr">properties</span>: {<span class="hljs-string">&quot;mmap_enable&quot;</span>: <span class="hljs-literal">true</span>}
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment">#restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> idField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512
    },
    &quot;isPrimary&quot;: true,
    &quot;autoId&quot;: false
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> docChunkField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;doc_chunk&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512,
        &quot;mmap.enabled&quot;: false
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$idField</span>,
        <span class="hljs-variable">$docChunkField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/fields/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;fieldName&quot;: &quot;doc_chunk&quot;,
    &quot;fieldParams&quot;:{
        &quot;mmap.enabled&quot;: true
    }
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>建议为存储海量数据的字段启用 mmap。该功能同时支持标量字段和向量字段。</p>
</div>
<p>随后，您可以使用上述创建的 Schema 创建一个 Collection。在收到加载该 Collection 的请求时，Milvus 会将<strong>doc_chunk</strong>字段的原始数据通过内存映射（mmap）加载到内存中。</p>
<h3 id="Index-specific-mmap-settings" class="common-anchor-header">针对特定索引的 mmap 设置<button data-href="#Index-specific-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>要配置特定索引的 mmap，您需要在添加索引时在索引参数中包含 `<code translate="no">mmap.enable</code> ` 属性。通过将该属性设置为 `<code translate="no">true</code>`，即可为该特定索引启用 mmap。</p>
<p>以下示例演示了在添加索引时如何配置针对特定索引的 mmap。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a varchar field</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>   
)

index_params = MilvusClient.prepare_index_params()

<span class="hljs-comment"># Create index on the varchar field with mmap settings</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
<span class="highlighted-wrapper-line">    params={ <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-string">&quot;false&quot;</span> }</span>
)

<span class="hljs-comment"># Change mmap settings for an index</span>
<span class="hljs-comment"># The following assumes that you have a collection named `my_collection`</span>
client.alter_index_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_name=<span class="hljs-string">&quot;title&quot;</span>,
    properties={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
        
List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(Constant.MMAP_ENABLED, <span class="hljs-literal">false</span>);
}};
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
        
client.alterIndexProperties(AlterIndexPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexName(<span class="hljs-string">&quot;title&quot;</span>)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;true&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create index on the varchar field with mmap settings</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">false</span> }
});

<span class="hljs-comment">// Change mmap settings for an index</span>
<span class="hljs-comment">// The following assumes that you have a collection named `my_collection`</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterIndexProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-attr">properties</span>:{<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">true</span>}
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;doc_chunk&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
                &quot;mmap.enabled&quot;: true
            }
        }
    ]
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexName&quot;: &quot;doc_chunk&quot;,
    &quot;properties&quot;: {
        &quot;mmap.enabled&quot;: false
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>这适用于向量字段和标量字段的索引。</p>
</div>
<p>随后，您可以在 Collection 中引用索引参数。当收到加载 Collection 的请求时，Milvus 会将<strong>标题</strong>字段的索引内存映射到内存中。</p>
<h3 id="Collection-specific-mmap-settings" class="common-anchor-header">Collection 级 mmap 设置<button data-href="#Collection-specific-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>要配置 Collection 级别的 mmap 策略，您需要在创建 Collection 的请求中包含 `<code translate="no">mmap.enabled</code> ` 属性。通过将该属性设置为 `<code translate="no">true</code>`，即可为 Collection 启用 mmap。</p>
<p>以下示例演示了如何在创建名为<strong>my_collection</strong>的 Collection 时启用 mmap。收到加载该 Collection 的请求后，Milvus 会将所有字段的原始数据映射到内存中。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Enable mmap when creating a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    properties={ <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-string">&quot;true&quot;</span> }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">req</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>)
        .build();
client.createCollection(req);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">scheme</span>: schema,
    <span class="hljs-attr">properties</span>: { <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">false</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: {
        \&quot;mmap.enabled\&quot;: \&quot;false\&quot;
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>您还可以更改现有 Collection 的 mmap 设置。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Release collection before change mmap settings</span>
client.release_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)

<span class="hljs-comment"># Ensure that the collection has already been released </span>
<span class="hljs-comment"># and run the following</span>
client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={
        <span class="hljs-string">&quot;mmap.enabled&quot;</span>: false
    }
)

<span class="hljs-comment"># Load the collection to make the above change take effect</span>
client.load_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.releaseCollection(ReleaseCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());
        
client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>)
        .build());

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());
       
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Release collection before change mmap settings</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releaseCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
});

<span class="hljs-comment">// Ensure that the collection has already been released </span>
<span class="hljs-comment">// and run the following</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">false</span>
    }
});

<span class="hljs-comment">// Load the collection to make the above change take effect</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/release&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;properties&quot;: {
        &quot;mmmap.enabled&quot;: false
    }
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>您需要释放该Collection才能修改其属性，并重新加载该Collection才能使更改生效。</p>
