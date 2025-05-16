---
id: clustering-compaction.md
title: 聚类压缩
related_key: 'clustering, compaction'
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction.png" alt="Without clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>无聚类压缩</span> </span></p>
<p>如果 Milvus 可以根据特定字段中的值将实体分布在不同的段中，那么搜索范围就可以限制在一个段内，从而提高搜索性能。</p>
<p><strong>聚类压缩（Clustering Compaction</strong>）是 Milvus 的一项功能，它能根据标量字段中的值在 Collections 中的段之间重新分配实体。要启用此功能，首先需要选择一个标量字段作为<strong>聚类键</strong>。这样，当实体的聚类键值在特定范围内时，Milvus 就能将实体重新分配到段中。当你触发聚类压缩时，Milvus 会生成/更新一个名为<strong>PartitionStats</strong> 的全局索引，它记录了段和聚类键值之间的映射关系。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction-2.png" alt="With Clustering Compaction" class="doc-image" id="with-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>使用聚类压缩</span> </span></p>
<p><strong>PartitionStats</strong>作为参考，Milvus 可以在收到带有聚类键值的搜索/查询请求时，剪切不相关的数据，并将搜索范围限制在与键值映射的段内，从而提高搜索性能。有关性能改进的详细信息，请参阅基准测试。</p>
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
<pre><code translate="no" class="language-yaml">dataCoord:
  compaction:
    clustering:
      <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span> 
      autoEnable: <span class="hljs-literal">false</span> 
      triggerInterval: 600 
      minInterval: 3600 
      maxInterval: 259200 
      newDataSizeThreshold: 512m 
      <span class="hljs-built_in">timeout</span>: 7200
     
queryNode:
  enableSegmentPrune: <span class="hljs-literal">true</span> 

datanode:
  clusteringCompaction:
    memoryBufferRatio: 0.1 
    workPoolSize: 8  
common:
  usePartitionKeyAsClusteringKey: <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">dataCoord.compaction.clustering</code></p>
<table>
<thead>
<tr><th>配置项</th><th>默认值</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enable</code></td><td>指定是否启用聚类压缩。<br>如果需要为每个具有聚类密钥的 Collections 启用此功能，请将其设置为<code translate="no">true</code> 。</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">autoEnable</code></td><td>指定是否启用自动触发压缩。<br>将此项设置为<code translate="no">true</code> 表示 Milvus 在指定的时间间隔内压缩具有聚类密钥的 Collections。</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">triggerInterval</code></td><td>以毫秒为单位指定 Milvus 开始聚类压缩的时间间隔。<br>只有当<code translate="no">autoEnable</code> 设置为<code translate="no">true</code> 时，此参数才有效。</td><td>-</td></tr>
<tr><td><code translate="no">minInterval</code></td><td>以秒为单位指定最小间隔。<br>此参数仅在<code translate="no">autoEnable</code> 设置为<code translate="no">true</code> 时有效。<br>将其设置为大于 triggerInterval 的整数有助于避免在短时间内重复压缩。</td><td>-</td></tr>
<tr><td><code translate="no">maxInterval</code></td><td>指定最大间隔（以秒为单位）。<br>该参数仅在<code translate="no">autoEnable</code> 设置为<code translate="no">true</code> 时有效。<br>一旦 Milvus 检测到某个 Collections 未进行聚类压缩的时间超过此值，它就会强制进行聚类压缩。</td><td>-</td></tr>
<tr><td><code translate="no">newDataSizeThreshold</code></td><td>指定触发聚类压缩的上阈值。<br>该参数仅在<code translate="no">autoEnable</code> 设置为<code translate="no">true</code> 时有效。<br>一旦 Milvus 检测到 Collections 中的数据量超过此值，就会启动聚类压缩进程。</td><td>-</td></tr>
<tr><td><code translate="no">timeout</code></td><td>指定聚类压缩的超时持续时间。<br>如果执行时间超过此值，则聚类压缩失败。</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">queryNode</code></p>
<table>
<thead>
<tr><th>配置项</th><th>配置项</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enableSegmentPrune</code></td><td>指定 Milvus 是否在收到搜索/查询请求时参考 PartitionStats 来剪切数据。<br>将此项设置为<code translate="no">true</code> 可使 Milvus 在搜索/查询请求期间从分段中剪除无关数据。</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">dataNode.clusteringCompaction</code></p>
<table>
<thead>
<tr><th>配置项</th><th>默认值</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">memoryBufferRatio</code></td><td>指定集群压缩任务的内存缓冲区比率。 <br>当数据大小超过使用此比率计算的分配缓冲区大小时，Milvus 会刷新数据。</td><td>-</td></tr>
<tr><td><code translate="no">workPoolSize</code></td><td>指定聚类压缩任务的工作池大小。</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">common</code></p>
<table>
<thead>
<tr><th>配置项</th><th>配置项</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">usePartitionKeyAsClusteringKey</code></td><td>指定是否将 Collections 中的分区密钥用作聚类密钥。<br>将其设置为<code translate="no">true</code> 表示将分区密钥用作聚类密钥。<br>您可以在 Collections 中通过显式设置聚类密钥来覆盖此设置。</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
</ul>
<p>要将上述更改应用到 Milvus 群集，请按照 "<a href="/docs/zh/v2.4.x/configure-helm.md">使用 Helm 配置 Milvus</a>"和 "<a href="/docs/zh/v2.4.x/configure_operator.md">使用 Milvus Operator 配置 Milvus</a>"中的步骤<a href="/docs/zh/v2.4.x/configure_operator.md">操作</a>。</p>
<h3 id="Collection-Configuration" class="common-anchor-header">Collection 配置</h3><p>要在特定 Collections 中进行聚类压缩，应从 Collections 中选择一个标量字段作为聚类密钥。</p>
<pre><code translate="no" class="language-python">default_fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;key&quot;</span>, dtype=DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;var&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, is_primary=<span class="hljs-literal">False</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embeddings&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=dim)
]

default_schema = CollectionSchema(
    fields=default_fields, 
    description=<span class="hljs-string">&quot;test clustering-key collection&quot;</span>
)

coll1 = Collection(name=<span class="hljs-string">&quot;clustering_test&quot;</span>, schema=default_schema)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>可以使用以下数据类型的标量字段作为聚类键：<code translate="no">Int8</code>,<code translate="no">Int16</code>,<code translate="no">Int32</code>,<code translate="no">Int64</code>,<code translate="no">Float</code>,<code translate="no">Double</code>, 和<code translate="no">VarChar</code> 。</p>
</div>
<h2 id="Trigger-Clustering-Compaction" class="common-anchor-header">触发聚类压缩<button data-href="#Trigger-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>如果启用了自动聚类压实，Milvus 会在指定的时间间隔自动触发压实。或者，您也可以按如下方式手动触发压缩：</p>
<pre><code translate="no" class="language-python">coll1.compact(is_clustering=<span class="hljs-literal">True</span>)
coll1.get_compaction_state(is_clustering=<span class="hljs-literal">True</span>)
coll1.wait_for_compaction_completed(is_clustering=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Benchmark-Test" class="common-anchor-header">基准测试</h3><p>数据量和查询模式共同决定了聚类压缩所能带来的性能提升。一项内部基准测试表明，聚类压缩最多可将每秒查询次数（QPS）提高 25 倍。</p>
<p>该基准测试是在一个包含来自 2000 万个 768 维 LAION 数据集的实体的 Collections 上进行的，关键字段被指定为聚类密钥。在 Collections 中触发聚类压缩后，会发送并发搜索，直到 CPU 使用率达到高水位。</p>
<table>
  <thead>
    <tr>
      <th rowspan="2">搜索过滤器</th>
      <th rowspan="2">剪切率</th>
      <th colspan="5">延迟（毫秒）</th>
      <th rowspan="2">QPS （请求/秒）</th>
    </tr>
    <tr>
      <th>平均值</th>
      <th>最小值</th>
      <th>最大值</th>
      <th>中位数</th>
      <th>TP99</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>无</td>
      <td>0%</td>
      <td>1685</td>
      <td>672</td>
      <td>2294</td>
      <td>1710</td>
      <td>2291</td>
      <td>17.75</td>
    </tr>
    <tr>
      <td>键 &gt; 200 和键 &lt; 800</td>
      <td>40.2%</td>
      <td>1045</td>
      <td>47</td>
      <td>1828</td>
      <td>1085</td>
      <td>1617</td>
      <td>28.38</td>
    </tr>
    <tr>
      <td>键 &gt; 200 和键 &lt; 600</td>
      <td>59.8%</td>
      <td>829</td>
      <td>45</td>
      <td>1483</td>
      <td>882</td>
      <td>1303</td>
      <td>35.78</td>
    </tr>
    <tr>
      <td>键 &gt; 200 和键 &lt; 400</td>
      <td>79.5%</td>
      <td>550</td>
      <td>100</td>
      <td>985</td>
      <td>584</td>
      <td>898</td>
      <td>54.00</td>
    </tr>
    <tr>
      <td>key == 1000</td>
      <td>99%</td>
      <td>68</td>
      <td>24</td>
      <td>1273</td>
      <td>70</td>
      <td>246</td>
      <td>431.41</td>
    </tr>
  </tbody>
</table>
<p>随着搜索筛选器中搜索范围的缩小，剪切率也随之增加。这意味着在搜索过程中会跳过更多的实体。比较第一行和最后一行的统计数据，可以发现不进行聚类压缩的搜索需要扫描整个 Collections。另一方面，使用特定键进行聚类压缩的搜索可以实现高达 25 倍的改进。</p>
<h2 id="Best-practices" class="common-anchor-header">最佳实践<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p>为数据量较大的 Collections 启用此功能。 Collections 中的数据量越大，搜索性能就越高。对于超过 100 万个实体的集合，启用此功能是一个不错的选择。</p></li>
<li><p>选择合适的聚类关键字：可以使用通常用作筛选条件的标量字段作为聚类关键字。对于保存多个租户数据的 Collections，可以利用区分一个租户和另一个租户的字段作为聚类密钥。</p></li>
<li><p>使用分区密钥作为聚类密钥。如果想在 Milvus 实例中的所有 Collections 启用此功能，或者在使用分区密钥的大型 Collections 中仍面临性能问题，可以将<code translate="no">common.usePartitionKeyAsClusteringKey</code> 设置为 true。通过这样做，当你选择 Collections 中的标量字段作为分区键时，你将拥有一个聚类键和一个分区键。</p>
<p>请注意，此设置不会阻止您选择另一个标量字段作为聚类键。明确指定的聚类键始终优先。</p></li>
</ul>
