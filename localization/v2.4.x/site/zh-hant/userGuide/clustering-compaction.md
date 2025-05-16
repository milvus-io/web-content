---
id: clustering-compaction.md
title: 聚類壓縮
related_key: 'clustering, compaction'
summary: 聚類壓縮的目的是在大型資料集中提高搜尋效能並降低成本。本指南將協助您瞭解聚類壓縮以及此功能如何改善搜尋效能。
---
<h1 id="Clustering-Compaction" class="common-anchor-header">聚類壓縮<button data-href="#Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>聚類壓縮的目的是在大型資料集中改善搜尋效能並降低成本。本指南將協助您瞭解聚類壓縮以及此功能如何改善搜尋效能。</p>
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
    </button></h2><p>Milvus 將傳入的實體儲存於集合中的區段，並在區段已滿時封閉該區段。如果發生這種情況，就會創建一個新的區段來容納額外的實體。因此，實體會任意地分佈在區段中。這種分佈方式需要 Milvus 搜尋多個區段，以找出與指定查詢向量最近的鄰居。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction.png" alt="Without clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>無聚類壓縮</span> </span></p>
<p>如果 Milvus 可以根據特定欄位中的值，將實體分佈在區段中，搜尋範圍就可以限制在一個區段內，進而改善搜尋效能。</p>
<p><strong>聚類壓縮 (Clustering Compaction</strong>) 是 Milvus 的一項功能，可根據標量欄位中的值，在集合中的段之間重新分配實體。要啟用此功能，您首先需要選擇標量欄位作為<strong>聚類關鍵</strong>。這可讓 Milvus 在實體的聚類關鍵值在特定範圍內時，將實體重新分配到段中。當您觸發聚類壓縮時，Milvus 會產生/更新稱為<strong>PartitionStats</strong> 的全局索引，它會記錄段與聚類關鍵值之間的映射關係。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction-2.png" alt="With Clustering Compaction" class="doc-image" id="with-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>使用聚類壓縮</span> </span></p>
<p>使用<strong>PartitionStats</strong>作為參考，Milvus 可以在接收到帶有聚類關鍵值的搜尋/查詢請求時，修剪不相關的資料，並將搜尋範圍限制在與關鍵值對應的區段內，從而改善搜尋效能。有關效能改善的詳細資訊，請參閱基準測試。</p>
<h2 id="Use-Clustering-Compaction" class="common-anchor-header">使用聚類壓縮<button data-href="#Use-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 的聚類壓縮功能是高度可配置的。您可以選擇手動觸發，或設定為由 Milvus 每隔一段時間自動觸發。要啟用叢集壓縮，請執行下列步驟：</p>
<h3 id="Global-Configuration" class="common-anchor-header">全局設定</h3><p>您需要修改您的 Milvus 配置文件，如下所示。</p>
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
<tr><th>設定項目</th><th>說明</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enable</code></td><td>指定是否啟用叢集壓縮。<br>如果您需要為每個具有叢集鍵的集合啟用此功能，請將此設定為<code translate="no">true</code> 。</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">autoEnable</code></td><td>指定是否啟用自動觸發壓縮。<br>將此設定為<code translate="no">true</code> 表示 Milvus 會在指定的間隔壓縮具有叢集鍵的集合。</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">triggerInterval</code></td><td>指定 Milvus 開始聚類壓縮的時間間隔，以毫秒為單位。<br>此參數僅在<code translate="no">autoEnable</code> 設為<code translate="no">true</code> 時有效。</td><td>-</td></tr>
<tr><td><code translate="no">minInterval</code></td><td>以秒為單位指定最小間隔。<br>此參數僅在<code translate="no">autoEnable</code> 設為<code translate="no">true</code> 時有效。<br>將此設定為大於 triggerInterval 的整數，有助於避免在短時間內重複壓縮。</td><td>-</td></tr>
<tr><td><code translate="no">maxInterval</code></td><td>指定最大間隔 (以秒為單位)。<br>此參數僅在<code translate="no">autoEnable</code> 設為<code translate="no">true</code> 時有效。<br>一旦 Milvus 偵測到一個集合沒有被叢集壓縮的時間超過這個值，它就會強制叢集壓縮。</td><td>-</td></tr>
<tr><td><code translate="no">newDataSizeThreshold</code></td><td>指定觸發聚類壓縮的上限臨界值。<br>此參數僅在<code translate="no">autoEnable</code> 設為<code translate="no">true</code> 時有效。<br>一旦 Milvus 偵測到資料集中的資料量超過此值，就會啟動聚類壓縮程序。</td><td>-</td></tr>
<tr><td><code translate="no">timeout</code></td><td>指定叢集壓縮的逾時長度。<br>如果集群壓縮的執行時間超過此值，則壓縮失敗。</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">queryNode</code></p>
<table>
<thead>
<tr><th>設定項目</th><th>設定項目</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enableSegmentPrune</code></td><td>指定 Milvus 是否在收到搜尋/查詢請求時，參考 PartitionStats 來修剪資料。<br>將此設定為<code translate="no">true</code> 可讓 Milvus 在搜尋/查詢請求期間修剪區段中的不相關資料。</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">dataNode.clusteringCompaction</code></p>
<table>
<thead>
<tr><th>設定項目</th><th>說明</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">memoryBufferRatio</code></td><td>指定群集壓縮任務的記憶體緩衝比率。 <br>當資料大小超過使用此比率計算的已分配緩衝區大小時，Milvus 會清除資料。</td><td>-</td></tr>
<tr><td><code translate="no">workPoolSize</code></td><td>指定叢集壓縮任務的工作人員池大小。</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">common</code></p>
<table>
<thead>
<tr><th>設定項目</th><th>設定項目</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">usePartitionKeyAsClusteringKey</code></td><td>指定是否使用集合中的分割區金鑰作為群集金鑰。<br>將此設定為<code translate="no">true</code> 表示將分割區金鑰用作叢集金鑰。<br>您可以在集合中透過明確設定叢集索引鍵來覆寫此設定。</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
</ul>
<p>要將上述變更套用到您的 Milvus 叢集，請遵循「<a href="/docs/zh-hant/v2.4.x/configure-helm.md">使用 Helm 設定 Milvus</a>」和<a href="/docs/zh-hant/v2.4.x/configure_operator.md">「使用 Milvus Operators 設定 Milvus</a>」中的步驟。</p>
<h3 id="Collection-Configuration" class="common-anchor-header">叢集設定</h3><p>若要在特定的集合中進行群集壓縮，您應該從集合中選擇一個標量欄位作為群集鍵。</p>
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
<p>您可以使用下列資料類型的標量欄位作為聚類關鍵：<code translate="no">Int8</code>,<code translate="no">Int16</code>,<code translate="no">Int32</code>,<code translate="no">Int64</code>,<code translate="no">Float</code>,<code translate="no">Double</code>, 以及<code translate="no">VarChar</code> 。</p>
</div>
<h2 id="Trigger-Clustering-Compaction" class="common-anchor-header">觸發聚類壓縮<button data-href="#Trigger-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>如果您啟用了自動聚類壓縮，Milvus 會在指定的間隔自動觸發壓縮。另外，您也可以手動觸發壓縮，如下所示：</p>
<pre><code translate="no" class="language-python">coll1.compact(is_clustering=<span class="hljs-literal">True</span>)
coll1.get_compaction_state(is_clustering=<span class="hljs-literal">True</span>)
coll1.wait_for_compaction_completed(is_clustering=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Benchmark-Test" class="common-anchor-header">基準測試</h3><p>資料量與查詢模式的結合，決定了叢集壓縮所能帶來的效能改善。一項內部基準測試證明，叢集壓縮可將每秒查詢次數 (QPS) 提升 25 倍。</p>
<p>該基準測試是在一個集合上進行的，該集合包含來自 2,000 萬個 768 維 LAION 資料集中的實體，其中的關鍵字段被指定為聚類關鍵。在集合中觸發聚類壓縮之後，會發送並發搜尋，直到 CPU 使用量達到高水位為止。</p>
<table>
  <thead>
    <tr>
      <th rowspan="2">搜尋篩選</th>
      <th rowspan="2">剪除比率</th>
      <th colspan="5">延遲 (ms)</th>
      <th rowspan="2">QPS (要求/秒)</th>
    </tr>
    <tr>
      <th>平均值</th>
      <th>最小值</th>
      <th>最大值</th>
      <th>中位數</th>
      <th>TP99</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>無</td>
      <td>0%</td>
      <td>1685</td>
      <td>672</td>
      <td>2294</td>
      <td>1710</td>
      <td>2291</td>
      <td>17.75</td>
    </tr>
    <tr>
      <td>按鍵 &gt; 200 且按鍵 &lt; 800</td>
      <td>40.2%</td>
      <td>1045</td>
      <td>47</td>
      <td>1828</td>
      <td>1085</td>
      <td>1617</td>
      <td>28.38</td>
    </tr>
    <tr>
      <td>鍵 &gt; 200 且鍵 &lt; 600</td>
      <td>59.8%</td>
      <td>829</td>
      <td>45</td>
      <td>1483</td>
      <td>882</td>
      <td>1303</td>
      <td>35.78</td>
    </tr>
    <tr>
      <td>關鍵 &gt; 200 且關鍵 &lt; 400</td>
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
<p>隨著搜尋篩選器中的搜尋範圍縮小，剪枝比率也會增加。這表示在搜尋過程中，會跳過更多的實體。比較第一行和最後一行的統計資料時，您可以看到沒有進行聚類壓縮的搜尋需要掃描整個集合。另一方面，使用特定關鍵進行聚類壓縮的搜尋，可以達到 25 倍的改善。</p>
<h2 id="Best-practices" class="common-anchor-header">最佳實務<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>以下是一些有效使用聚類壓縮的提示：</p>
<ul>
<li><p>在資料量較大的資料集中啟用此功能。 搜尋效能會隨著資料集中的資料量增加而提升。對於超過 100 萬個實體的資料集，啟用此功能是個不錯的選擇。</p></li>
<li><p>選擇適當的聚類關鍵：您可以使用常被用來作為篩選條件的標量欄位作為聚類關鍵。對於包含來自多個租戶資料的集合，您可以使用區別一個租戶與另一個租戶的欄位作為簇集索引鍵。</p></li>
<li><p>使用分割區金鑰作為叢集金鑰。如果您想對 Milvus 實例中的所有集合啟用此功能，或者在使用分割區金鑰的大型集合中仍然面臨性能問題，則可以將<code translate="no">common.usePartitionKeyAsClusteringKey</code> 設為 true。這樣做之後，當您選擇一個集合中的標量欄位作為分割鍵時，就會有一個群集鍵和一個分割鍵。</p>
<p>請注意，此設定不會阻止您選擇其他標量欄位作為叢集索引鍵。明確指定的簇集索引鍵總是優先。</p></li>
</ul>
