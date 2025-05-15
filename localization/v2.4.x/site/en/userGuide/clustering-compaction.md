---
id: clustering-compaction.md
title: Clustering Compaction
related_key: 'clustering, compaction'
summary: >-
  Clustering compaction is designed to improve search performance and reduce
  costs in large collections. This guide will help you understand clustering
  compaction and how this feature can improve search performance.
---
<h1 id="Clustering-Compaction" class="common-anchor-header">Clustering Compaction<button data-href="#Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Clustering compaction is designed to improve search performance and reduce costs in large collections. This guide will help you understand clustering compaction and how this feature can improve search performance.</p>
<h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus stores incoming entities in segments within a collection and seals a segment when it is full. If this happens, a new segment is created to accommodate additional entities. As a result, entities are arbitrarily distributed across segments. This distribution requires Milvus to search multiple segments to find the nearest neighbors to a given query vector.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction.png" alt="Without clustering Compaction" class="doc-image" id="without-clustering-compaction" />
    <span>Without clustering Compaction</span>
  </span>
</p>
<p>If Milvus can distribute entities among segments based on the values in a specific field, the search scope can be restricted within one segment, thus improving search performance.</p>
<p><strong>Clustering Compaction</strong> is a feature in Milvus that redistributes entities among segments in a collection based on the values in a scalar field. To enable this feature, you first need to select a scalar field as the <strong>clustering key</strong>. This allows Milvus to redistribute entities into a segment when their clustering key values fall within a specific range. When you trigger a clustering compaction, Milvus generates/updates a global index called <strong>PartitionStats</strong>, which records the mapping relationship between segments and clustering key values.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction-2.png" alt="With Clustering Compaction" class="doc-image" id="with-clustering-compaction" />
    <span>With Clustering Compaction</span>
  </span>
</p>
<p>Using <strong>PartitionStats</strong> as a reference, Milvus can prune irrelevant data upon receiving a search/query request that carries a clustering key value and restricting the search scope within the segments mapping to the value, thus improving search performance. For details on performance improvement, refer to Benchmark tests.</p>
<h2 id="Use-Clustering-Compaction" class="common-anchor-header">Use Clustering Compaction<button data-href="#Use-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>The Clustering Compaction feature in Milvus is highly configurable. You can choose to trigger it manually or set it to be triggered automatically at intervals by Milvus. To enable clustering compaction, do as follows:</p>
<h3 id="Global-Configuration" class="common-anchor-header">Global Configuration</h3><p>You need to modify your Milvus configuration file as shown below.</p>
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
<ul>
<li><p><code translate="no">dataCoord.compaction.clustering</code></p>
<table>
<thead>
<tr><th>Configuration Item</th><th>Description</th><th>Default Value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enable</code></td><td>Specifies whether to enable clustering compaction.<br>Setting this to <code translate="no">true</code> if you need to enable this feature for every collection having a clustering key.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">autoEnable</code></td><td>Specifies whether to enable automatically triggered compaction.<br>Setting this to <code translate="no">true</code> indicates that Milvus compacts the collections having a clustering key at the specified intervals.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">triggerInterval</code></td><td>Specifies the interval in milliseconds at which Milvus starts clustering compaction.<br>This parameter is valid only when <code translate="no">autoEnable</code> is set to <code translate="no">true</code>.</td><td>-</td></tr>
<tr><td><code translate="no">minInterval</code></td><td>Specifies the minimum interval in seconds.<br>This parameter is valid only when <code translate="no">autoEnable</code> is set to <code translate="no">true</code>.<br>Setting this to an integer greater than triggerInterval helps avoid repeated compactions within a short period.</td><td>-</td></tr>
<tr><td><code translate="no">maxInterval</code></td><td>Specifies the maximum interval in seconds.<br>This parameter is valid only when <code translate="no">autoEnable</code> is set to <code translate="no">true</code>.<br>Once Milvus detects that a collection has not been clustering-compacted for a duration longer than this value, it forces a clustering compaction.</td><td>-</td></tr>
<tr><td><code translate="no">newDataSizeThreshold</code></td><td>Specifies the upper threshold to trigger a clustering compaction.<br>This parameter is valid only when <code translate="no">autoEnable</code> is set to <code translate="no">true</code>.<br>Once Milvus detects that the data volume in a collection exceeds this value, it initiates a clustering compaction process.</td><td>-</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Specifies the timeout duration for a clustering compaction.<br>A clustering compaction fails if its execution time exceeds this value.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">queryNode</code></p>
<table>
<thead>
<tr><th>Configuration Item</th><th>Description</th><th>Default Value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enableSegmentPrune</code></td><td>Specifies whether Milvus prunes data by referring to PartitionStats upon receiving search/query requests.<br>Setting this to <code translate="no">true</code> enables Milvus to prune irrelevant data from segments during a search/query request.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">dataNode.clusteringCompaction</code></p>
<table>
<thead>
<tr><th>Configuration Item</th><th>Description</th><th>Default Value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">memoryBufferRatio</code></td><td>Specifies the memory buffer ratio for clustering compaction tasks. <br>Milvus flushes data when the data size exceeds the allocated buffer size calculated using this ratio.</td><td>-</td></tr>
<tr><td><code translate="no">workPoolSize</code></td><td>Specifies the worker pool size for a clustering compaction task.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">common</code></p>
<table>
<thead>
<tr><th>Configuration Item</th><th>Description</th><th>Default Value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">usePartitionKeyAsClusteringKey</code></td><td>Specifies whether to use the partition key in collections as the clustering key.<br>Setting this to <code translate="no">true</code> indicates that the partition key is used as the clustering key.<br>You can always override this setting in a collection by explicitly setting a clustering key.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
</ul>
<p>To apply the above changes to your Milvus cluster, please follow the steps in <a href="/docs/v2.4.x/configure-helm.md">Configure Milvus with Helm</a> and <a href="/docs/v2.4.x/configure_operator.md">Configure Milvus with Milvus Operators</a>.</p>
<h3 id="Collection-Configuration" class="common-anchor-header">Collection Configuration</h3><p>For clustering compacting in a specific collection, you should select a scalar field from the collection as the clustering key.</p>
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
<p>You can use the scalar fields of the following data types as the clustering key: <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, <code translate="no">Double</code>, and <code translate="no">VarChar</code>.</p>
</div>
<h2 id="Trigger-Clustering-Compaction" class="common-anchor-header">Trigger Clustering Compaction<button data-href="#Trigger-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>If you have enabled automatic clustering compaction, Milvus automatically triggers the compaction at the specified interval. Alternatively, you can manually trigger the compaction as follows:</p>
<pre><code translate="no" class="language-python">coll1.compact(is_clustering=<span class="hljs-literal">True</span>)
coll1.get_compaction_state(is_clustering=<span class="hljs-literal">True</span>)
coll1.wait_for_compaction_completed(is_clustering=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Benchmark-Test" class="common-anchor-header">Benchmark Test</h3><p>Data volume and query patterns combined determine the performance improvement clustering compaction can bring. An internal benchmark test demonstrates that clustering compaction yields up to a 25-fold improvement in queries per second (QPS).</p>
<p>The benchmark test is on a collection containing entities from a 20-million, 768-dimensional LAION dataset with the key field designated as the clustering key. After clustering compaction is triggered in the collection, concurrent searches are sent until the CPU usage reaches a high water level.</p>
<table>
  <thead>
    <tr>
      <th rowspan="2">Search Filter</th>
      <th rowspan="2">Prune Ratio</th>
      <th colspan="5">Latency (ms)</th>
      <th rowspan="2">QPS (reqs/s)</th>
    </tr>
    <tr>
      <th>Avg</th>
      <th>Min</th>
      <th>Max</th>
      <th>Median</th>
      <th>TP99</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>None</td>
      <td>0%</td>
      <td>1685</td>
      <td>672</td>
      <td>2294</td>
      <td>1710</td>
      <td>2291</td>
      <td>17.75</td>
    </tr>
    <tr>
      <td>key > 200 and key < 800</td>
      <td>40.2%</td>
      <td>1045</td>
      <td>47</td>
      <td>1828</td>
      <td>1085</td>
      <td>1617</td>
      <td>28.38</td>
    </tr>
    <tr>
      <td>key > 200 and key < 600</td>
      <td>59.8%</td>
      <td>829</td>
      <td>45</td>
      <td>1483</td>
      <td>882</td>
      <td>1303</td>
      <td>35.78</td>
    </tr>
    <tr>
      <td>key > 200 and key < 400</td>
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
<p>As the search range narrows in the search filters, the prune ratio increases. This means that more entities are skipped during the search process. When comparing the statistics in the first and last rows, you can see that searches without clustering compaction require scanning the entire collection. On the other hand, searches with clustering compaction using a specific key can achieve up to a 25-fold improvement.</p>
<h2 id="Best-practices" class="common-anchor-header">Best practices<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>Here are some tips for you to use clustering compaction efficiently:</p>
<ul>
<li><p>Enable this for collections with large data volumes.
Search performance improves with larger data volumes in a collection. It is a good choice to enable this feature for collections with over 1 million entities.</p></li>
<li><p>Choose a proper clustering key.
You can use scalar fields commonly employed as filtering conditions as the clustering key. For a collection that holds data from multiple tenants, you can utilize the field that distinguishes one tenant from another as the clustering key.</p></li>
<li><p>Use the partition key as the clustering key.
You can set <code translate="no">common.usePartitionKeyAsClusteringKey</code> to true if you want to enable this feature for all collections in your Milvus instance or if you still face performance issues in a large collection with a partition key. By doing so, you will have a clustering key and a partition key when you choose a scalar field in a collection as the partition key.</p>
<p>Note that this setting does not prevent you from choosing another scalar field as the clustering key. The explicitly designated clustering key always takes precedence.</p></li>
</ul>
