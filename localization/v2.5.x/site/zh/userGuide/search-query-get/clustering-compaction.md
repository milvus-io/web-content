---
id: clustering-compaction.md
title: 聚类压缩
summary: 聚类压缩旨在提高搜索性能，降低大型 Collections 的成本。本指南将帮助您了解聚类压缩以及该功能如何提高搜索性能。
---
<h1 id="Clustering-Compaction" class="common-anchor-header">聚类压缩<button data-href="#Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>聚类压缩旨在提高搜索性能，降低大型 Collections 的成本。本指南将帮助您了解聚类压缩以及该功能如何提高搜索性能。</p>
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
    </button></h2><p>Milvus 将输入的实体存储在 Collections 中的分段中，并在分段已满时将其封存。如果出现这种情况，就会创建一个新的段来容纳更多的实体。因此，实体会任意地分布在不同的段中。这种分布要求 Milvus 搜索多个分段，以找到与给定查询向量最近的邻居。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/without-clustering-compaction.png" alt="Without Clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>无聚类压缩</span> </span></p>
<p>如果 Milvus 可以根据特定字段中的值将实体分布在不同的段中，那么搜索范围就可以限制在一个段内，从而提高搜索性能。</p>
<p><strong>聚类压缩（Clustering Compaction</strong>）是 Milvus 的一项功能，它能根据标量字段中的值在 Collections 中的段之间重新分配实体。要启用此功能，首先需要选择一个标量字段作为<strong>聚类键</strong>。这样，当实体的聚类键值在特定范围内时，Milvus 就能将实体重新分配到段中。当你触发聚类压缩时，Milvus 会生成/更新一个名为<strong>PartitionStats</strong> 的全局索引，它记录了段和聚类键值之间的映射关系。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/clustering-compaction.png" alt="Clustering Compaction" class="doc-image" id="clustering-compaction" />
   </span> <span class="img-wrapper"> <span>聚类压缩</span> </span></p>
<p>以<strong>PartitionStats</strong>为参考，Milvus 可以在收到带有聚类键值的搜索/查询请求时，剪切不相关的数据，并将搜索范围限制在与键值映射的段内，从而提高搜索性能。有关性能改进的详细信息，请参阅<a href="/docs/zh/v2.5.x/clustering-compaction.md#Benchmark-Test">基准测试</a>。</p>
<h2 id="Use-Clustering-Compaction" class="common-anchor-header">使用聚类压缩<button data-href="#Use-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 的聚类压缩功能具有高度可配置性。你可以选择手动触发，也可以将其设置为由 Milvus 每隔一段时间自动触发。要启用聚类压缩，请执行以下操作：</p>
<h3 id="Global-Configuration" class="common-anchor-header">全局配置</h3><p>您需要修改 Milvus 配置文件，如下所示。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">clustering:</span>
      <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> 
      <span class="hljs-attr">autoEnable:</span> <span class="hljs-literal">false</span> 
      <span class="hljs-attr">triggerInterval:</span> <span class="hljs-number">600</span> 
      <span class="hljs-attr">minInterval:</span> <span class="hljs-number">3600</span> 
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-number">259200</span> 
      <span class="hljs-attr">newDataSizeThreshold:</span> <span class="hljs-string">512m</span> 
      <span class="hljs-attr">timeout:</span> <span class="hljs-number">7200</span>
     
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">enableSegmentPrune:</span> <span class="hljs-literal">true</span> 

<span class="hljs-attr">datanode:</span>
  <span class="hljs-attr">clusteringCompaction:</span>
    <span class="hljs-attr">memoryBufferRatio:</span> <span class="hljs-number">0.1</span> 
    <span class="hljs-attr">workPoolSize:</span> <span class="hljs-number">8</span>  
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">usePartitionKeyAsClusteringKey:</span> <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>配置项目</p></th>
     <th><p>说明</p></th>
     <th><p>默认值</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">dataCoord.compaction.clustering</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">enable</code></p></td>
     <td><p>指定是否启用聚类压缩。如果需要为每个具有聚类密钥的 Collections 启用此功能，请将其设置为<code translate="no">true</code> 。</p></td>
     <td><p>假</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">autoEnable</code></p></td>
     <td><p>指定是否启用自动触发压缩。将此设置为<code translate="no">true</code> 表示 Milvus 在指定的时间间隔对具有聚类键的 Collections 进行压缩。</p></td>
     <td><p>假</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">triggerInterval</code></p></td>
     <td><p>以毫秒为单位指定 Milvus 开始聚类压缩的时间间隔。只有将<code translate="no">autoEnable</code> 设置为<code translate="no">true</code> 时才适用。</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">minInterval</code></p></td>
     <td><p>以毫秒为单位指定最小间隔。仅当设置<code translate="no">autoEnable</code> 至<code translate="no">true</code> 时适用。</p><p>将其设置为大于<code translate="no">triggerInterval</code> 的整数有助于避免在短时间内重复压缩。</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">maxInterval</code></p></td>
     <td><p>以毫秒为单位指定最大间隔。只有将<code translate="no">autoEnable</code> 设置为<code translate="no">true</code> 时才适用。</p><p>一旦 Milvus 检测到某个 Collections 的聚类压缩持续时间超过此值，就会强制进行聚类压缩。</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">newDataSizeThreshold</code></p></td>
     <td><p>指定触发聚类压缩的上阈值。这仅适用于将<code translate="no">autoEnable</code> 设置为<code translate="no">true</code> 时。</p><p>一旦 Milvus 检测到 Collections 中的数据量超过此值，就会启动聚类压缩进程。</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">timeout</code></p></td>
     <td><p>指定聚类压缩的超时持续时间。如果执行时间超过此值，则聚类压缩失败。</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">queryNode</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">enableSegmentPrune</code></p></td>
     <td><p>指定 Milvus 是否在收到搜索/查询请求时参考 PartitionStats 来剪切数据。将此值设为<code translate="no">true</code> ，这样 Milvus 就能在收到搜索/查询请求时通过引用 PartitionStats 来剪切数据。</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">dataNode.clusteringCompaction</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryBufferRatio</code></p></td>
     <td><p>指定集群压缩任务的内存缓冲区比率。  当数据大小超过使用此比率计算出的分配缓冲区大小时，Milvus 会刷新数据。</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">workPoolSize</code></p></td>
     <td><p>指定聚类压缩任务的工作池大小。</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">common</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">usePartitionKeyAsClusteringKey</code></p></td>
     <td><p>指定是否使用 Collections 中的分区密钥作为聚类密钥。将此设置为 "true"，Milvus 就会将 Collections 中的分区密钥作为聚类密钥。 </p><p>你可以在 Collection 中通过显式设置聚类密钥来覆盖此设置。</p></td>
     <td></td>
   </tr>
</table>
<p>要将上述更改应用到 Milvus 群集，请按照 "<a href="/docs/zh/v2.5.x/configure-helm.md#Configure-Milvus-via-configuration-file">使用 Helm 配置 Milvus</a>"和 "<a href="/docs/zh/v2.5.x/configure_operator.md">使用 Milvus Operator 配置 Milvus</a>"中的步骤<a href="/docs/zh/v2.5.x/configure_operator.md">操作</a>。</p>
<h3 id="Collection-Configuration" class="common-anchor-header">Collection 配置</h3><p>要在特定 Collections 中进行聚类压缩，应从该 Collections 中选择一个标量字段作为聚类密钥。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN
)

schema = MilvusClient.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;key&quot;</span>, DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;var&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;clustering_test&quot;</span>,
    schema=schema
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
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;key&quot;</span>)
        .dataType(DataType.Int64)
        .isClusteringKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;var&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;clustering_test&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span> = <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TOKEN</span> = <span class="hljs-string">&#x27;root:Milvus&#x27;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-variable constant_">TOKEN</span>,
});
<span class="hljs-keyword">const</span> schema = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;id&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;key&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">is_clustering_key</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;var&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">false</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
      <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,
    },
  ];
  
  <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;clustering_test&#x27;</span>,
    <span class="hljs-attr">schema</span>: schema,
  });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>您可以使用以下数据类型的标量字段作为聚类键：<code translate="no">Int8</code>,<code translate="no">Int16</code>,<code translate="no">Int32</code>,<code translate="no">Int64</code>,<code translate="no">Float</code>,<code translate="no">Double</code> 和<code translate="no">VarChar</code> 。</p>
</div>
<h3 id="Trigger-Clustering-Compaction" class="common-anchor-header">触发聚类压缩</h3><p>如果启用了自动聚类压实，Milvus 会在指定的时间间隔自动触发压实。或者，您也可以按如下方式手动触发压缩：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># trigger a manual compaction</span>
job_id = client.compact(
    collection_name=<span class="hljs-string">&quot;clustering_test&quot;</span>, 
    is_clustering=<span class="hljs-literal">True</span>
)

<span class="hljs-comment"># get the compaction state</span>
client.get_compaction_state(
    job_id=job_id,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.CompactReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.GetCompactionStateReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.CompactResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.GetCompactionStateResp;

<span class="hljs-type">CompactResp</span> <span class="hljs-variable">compactResp</span> <span class="hljs-operator">=</span> client.compact(CompactReq.builder()
        .collectionName(<span class="hljs-string">&quot;clustering_test&quot;</span>)
        .isClustering(<span class="hljs-literal">true</span>)
        .build());

<span class="hljs-type">GetCompactionStateResp</span> <span class="hljs-variable">stateResp</span> <span class="hljs-operator">=</span> client.getCompactionState(GetCompactionStateReq.builder()
        .compactionID(compactResp.getCompactionID())
        .build());

System.out.println(stateResp.getState());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// trigger a manual compaction</span>
<span class="hljs-keyword">const</span> {compactionID} = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">compact</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;clustering_test&quot;</span>, 
    <span class="hljs-attr">is_clustering</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-comment">// get the compaction state</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getCompactionState</span>({
    <span class="hljs-attr">compactionID</span>: compactionID,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Benchmark-Test" class="common-anchor-header">基准测试<button data-href="#Benchmark-Test" class="anchor-icon" translate="no">
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
    </button></h2><p>数据量和查询模式共同决定了聚类压缩所能带来的性能提升。一项内部基准测试表明，聚类压缩最多可将每秒查询次数（QPS）提高 25 倍。</p>
<p>该基准测试是在一个包含来自 2000 万个 768 维 LAION 数据集的实体的 Collections 上进行的，该数据集的<code translate="no">key</code> 字段被指定为聚类密钥。在 Collections 中触发聚类压缩后，会发送并发搜索，直到 CPU 使用率达到高水位。</p>
<table>
   <tr>
     <th rowspan="2"><p>搜索过滤器</p></th>
     <th rowspan="2"><p>剪切率</p></th>
     <th colspan="5"><p>延迟</p></th>
     <th rowspan="2"><p>请求/秒</p></th>
   </tr>
   <tr>
     <td><p>平均值</p></td>
     <td><p>最小值</p></td>
     <td><p>最大值</p></td>
     <td><p>中位数</p></td>
     <td><p>TP99</p></td>
   </tr>
   <tr>
     <td><p>不适用</p></td>
     <td><p>0%</p></td>
     <td><p>1685</p></td>
     <td><p>672</p></td>
     <td><p>2294</p></td>
     <td><p>1710</p></td>
     <td><p>2291</p></td>
     <td><p>17.75</p></td>
   </tr>
   <tr>
     <td><p>密钥&gt;200 和密钥 &lt; 800</p></td>
     <td><p>40.2%</p></td>
     <td><p>1045</p></td>
     <td><p>47</p></td>
     <td><p>1828</p></td>
     <td><p>1085</p></td>
     <td><p>1617</p></td>
     <td><p>28.38</p></td>
   </tr>
   <tr>
     <td><p>键&gt;200 和键 &lt; 600</p></td>
     <td><p>59.8%</p></td>
     <td><p>829</p></td>
     <td><p>45</p></td>
     <td><p>1483</p></td>
     <td><p>882</p></td>
     <td><p>1303</p></td>
     <td><p>35.78</p></td>
   </tr>
   <tr>
     <td><p>键&gt;200 和键 &lt; 400</p></td>
     <td><p>79.5%</p></td>
     <td><p>550</p></td>
     <td><p>100</p></td>
     <td><p>985</p></td>
     <td><p>584</p></td>
     <td><p>898</p></td>
     <td><p>54.00</p></td>
   </tr>
   <tr>
     <td><p>键==1000</p></td>
     <td><p>99%</p></td>
     <td><p>68</p></td>
     <td><p>24</p></td>
     <td><p>1273</p></td>
     <td><p>70</p></td>
     <td><p>246</p></td>
     <td><p>431.41</p></td>
   </tr>
</table>
<p>随着搜索筛选器中搜索范围的缩小，剪切率也随之增加。这意味着在搜索过程中会跳过更多的实体。比较第一行和最后一行的统计数据，可以发现不进行聚类压缩的搜索需要扫描整个 Collections。另一方面，使用特定键进行聚类压缩的搜索可以实现高达 25 倍的改进。</p>
<h2 id="Best-Practices" class="common-anchor-header">最佳实践<button data-href="#Best-Practices" class="anchor-icon" translate="no">
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
    </button></h2><p>以下是一些有效使用聚类压缩的提示：</p>
<ul>
<li><p>为数据量较大的 Collections 启用此功能。</p>
<p>Collections 中的数据量越大，搜索性能就越高。对于超过 100 万个实体的集合，启用此功能是一个不错的选择。</p></li>
<li><p>选择合适的聚类关键字。</p>
<p>可以使用通常用作筛选条件的标量字段作为聚类关键字。对于保存多个租户数据的 Collections，可以利用区分一个租户和另一个租户的字段作为聚类密钥。</p></li>
<li><p>使用 Partition Key 作为聚类密钥。</p>
<p>如果你想为 Milvus 实例中的所有 Collections 启用此功能，或者在使用分区密钥的大型 Collections 中仍面临性能问题，可以将<code translate="no">common.usePartitionKeyAsClusteringKey</code> 设置为<code translate="no">true</code> 。通过这样做，当你选择 Collections 中的标量字段作为分区键时，你将拥有一个聚类键和一个分区键。</p>
<p>请注意，此设置不会阻止您选择另一个标量字段作为聚类键。明确指定的聚类键始终优先。</p></li>
</ul>
