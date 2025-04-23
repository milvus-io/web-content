---
id: clustering-compaction.md
title: 聚類壓縮
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/without-clustering-compaction.png" alt="Without Clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>沒有聚類壓縮</span> </span></p>
<p>如果 Milvus 可以根據特定欄位中的值，將實體分佈在區段中，搜尋範圍就可以限制在一個區段內，進而改善搜尋效能。</p>
<p><strong>聚類壓縮 (Clustering Compaction</strong>) 是 Milvus 的一項功能，可根據標量欄位中的值，在集合中的段之間重新分配實體。要啟用此功能，您首先需要選擇標量欄位作為<strong>聚類關鍵</strong>。這可讓 Milvus 在實體的聚類關鍵值在特定範圍內時，將實體重新分配到段中。當您觸發聚類壓縮時，Milvus 會產生/更新稱為<strong>PartitionStats</strong> 的全局索引，它會記錄段和聚類關鍵值之間的映射關係。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/clustering-compaction.png" alt="Clustering Compaction" class="doc-image" id="clustering-compaction" />
   </span> <span class="img-wrapper"> <span>聚類壓縮</span> </span></p>
<p>使用<strong>PartitionStats</strong>作為參考，Milvus 可以在收到帶有聚類關鍵值的搜尋/查詢請求時，修剪不相關的資料，並將搜尋範圍限制在與該值對應的區段內，從而改善搜尋效能。有關效能改善的詳細資訊，請參閱<a href="/docs/zh-hant/clustering-compaction.md#Benchmark-Test">基準測試</a>。</p>
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
     <th><p>設定項目</p></th>
     <th><p>說明</p></th>
     <th><p>預設值</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">dataCoord.compaction.clustering</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">enable</code></p></td>
     <td><p>指定是否啟用叢集壓縮。如果您需要為每個有群集鍵的集合啟用此功能，請將此值設定為<code translate="no">true</code> 。</p></td>
     <td><p>假</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">autoEnable</code></p></td>
     <td><p>指定是否啟用自動觸發壓縮。將此設定為<code translate="no">true</code> 表示 Milvus 會在指定的時間間隔壓縮有聚類關鍵的集合。</p></td>
     <td><p>假</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">triggerInterval</code></p></td>
     <td><p>指定 Milvus 開始叢集壓縮的間隔 (毫秒)。這只適用於設定<code translate="no">autoEnable</code> 為<code translate="no">true</code> 時。</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">minInterval</code></p></td>
     <td><p>以毫秒為單位指定最小間隔。這只在您設定<code translate="no">autoEnable</code> 至<code translate="no">true</code> 時適用。</p><p>將此設定為大於<code translate="no">triggerInterval</code> 的整數，有助於避免在短時間內重複壓縮。</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">maxInterval</code></p></td>
     <td><p>以毫秒為單位指定最大間隔。只有當您將<code translate="no">autoEnable</code> 設定為<code translate="no">true</code> 時才適用。</p><p>一旦 Milvus 偵測到一個集合沒有被叢集壓縮的時間超過這個值，它就會強制叢集壓縮。</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">newDataSizeThreshold</code></p></td>
     <td><p>指定觸發聚類壓縮的上臨界值。只有當您將<code translate="no">autoEnable</code> 設定為<code translate="no">true</code> 時，這才適用。</p><p>一旦 Milvus 檢測到資料集中的資料量超過此值，就會啟動叢集壓縮程序。</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">timeout</code></p></td>
     <td><p>指定叢集壓縮的逾時持續時間。如果集群壓縮的執行時間超過此值，則壓縮失敗。</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">queryNode</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">enableSegmentPrune</code></p></td>
     <td><p>指定 Milvus 是否在收到搜尋/查詢請求時，參考 PartitionStats 來刪除資料。將此設定為<code translate="no">true</code> ，以便 Milvus 可以在收到搜尋/查詢請求時，參考 PartitionStats 來修剪資料。</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">dataNode.clusteringCompaction</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryBufferRatio</code></p></td>
     <td><p>指定集群壓縮任務的記憶體緩衝比率。  當資料大小超過使用此比率計算的分配緩衝區大小時，Milvus 會清除資料。</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">workPoolSize</code></p></td>
     <td><p>指定聚類壓縮任務的工作池大小。</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">common</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">usePartitionKeyAsClusteringKey</code></p></td>
     <td><p>指定是否使用集合中的分割鍵作為群集鍵。將此設定為 true 會使 Milvus 將集合中的分割區金鑰視為叢集金鑰。 </p><p>您可以在集合中透過明確設定叢集金鑰來覆寫此設定。</p></td>
     <td></td>
   </tr>
</table>
<p>要將上述變更套用到您的 Milvus 叢集，請遵循「<a href="/docs/zh-hant/configure-helm.md#Configure-Milvus-via-configuration-file">使用 Helm 設定 Milvus</a>」和<a href="/docs/zh-hant/configure_operator.md">「使用 Milvus Operators 設定 Milvus</a>」中的步驟。</p>
<h3 id="Collection-Configuration" class="common-anchor-header">叢集設定</h3><p>若要在特定的集合中進行聚類壓縮，您應該從集合中選擇一個標量欄位作為聚類關鍵。</p>
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
<p>您可以使用下列資料類型的標量欄位作為聚類關鍵：<code translate="no">Int8</code>,<code translate="no">Int16</code>,<code translate="no">Int32</code>,<code translate="no">Int64</code>,<code translate="no">Float</code>,<code translate="no">Double</code>, 以及<code translate="no">VarChar</code> 。</p>
</div>
<h3 id="Trigger-Clustering-Compaction" class="common-anchor-header">觸發聚類壓縮</h3><p>如果您啟用了自動聚類壓縮，Milvus 會在指定的間隔自動觸發壓縮。或者，您可以按以下方式手動觸發壓縮：</p>
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
<h2 id="Benchmark-Test" class="common-anchor-header">基準測試<button data-href="#Benchmark-Test" class="anchor-icon" translate="no">
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
    </button></h2><p>資料量與查詢模式的結合決定了叢集壓縮所能帶來的效能改善。一項內部基準測試證明，聚類壓縮在每秒查詢次數上 (QPS) 最多可提升 25 倍。</p>
<p>該基準測試是在一個包含來自 2,000 萬個、768 維 LAION 資料集中的實體的集合上進行的，其中<code translate="no">key</code> 欄位被指定為聚類關鍵。在集合中觸發聚類壓縮後，會發送並發搜尋，直到 CPU 使用量達到高水位為止。</p>
<table>
   <tr>
     <th rowspan="2"><p>搜尋篩選</p></th>
     <th rowspan="2"><p>剪除率</p></th>
     <th colspan="5"><p>延遲</p></th>
     <th rowspan="2"><p>要求/秒</p></th>
   </tr>
   <tr>
     <td><p>平均值</p></td>
     <td><p>最小值</p></td>
     <td><p>最大值</p></td>
     <td><p>中位數</p></td>
     <td><p>TP99</p></td>
   </tr>
   <tr>
     <td><p>不適用</p></td>
     <td><p>0%</p></td>
     <td><p>1685</p></td>
     <td><p>672</p></td>
     <td><p>2294</p></td>
     <td><p>1710</p></td>
     <td><p>2291</p></td>
     <td><p>17.75</p></td>
   </tr>
   <tr>
     <td><p>鍵 &gt; 200 且鍵 &lt; 800</p></td>
     <td><p>40.2%</p></td>
     <td><p>1045</p></td>
     <td><p>47</p></td>
     <td><p>1828</p></td>
     <td><p>1085</p></td>
     <td><p>1617</p></td>
     <td><p>28.38</p></td>
   </tr>
   <tr>
     <td><p>鍵 &gt; 200 且鍵 &lt; 600</p></td>
     <td><p>59.8%</p></td>
     <td><p>829</p></td>
     <td><p>45</p></td>
     <td><p>1483</p></td>
     <td><p>882</p></td>
     <td><p>1303</p></td>
     <td><p>35.78</p></td>
   </tr>
   <tr>
     <td><p>鍵 &gt; 200 且鍵 &lt; 400</p></td>
     <td><p>79.5%</p></td>
     <td><p>550</p></td>
     <td><p>100</p></td>
     <td><p>985</p></td>
     <td><p>584</p></td>
     <td><p>898</p></td>
     <td><p>54.00</p></td>
   </tr>
   <tr>
     <td><p>關鍵字==1000</p></td>
     <td><p>99%</p></td>
     <td><p>68</p></td>
     <td><p>24</p></td>
     <td><p>1273</p></td>
     <td><p>70</p></td>
     <td><p>246</p></td>
     <td><p>431.41</p></td>
   </tr>
</table>
<p>隨著搜尋篩選器中的搜尋範圍縮小，剪枝比率也會增加。這表示在搜尋過程中，會跳過更多的實體。比較第一行和最後一行的統計資料時，您可以看到沒有進行聚類壓縮的搜尋需要掃描整個集合。另一方面，使用特定關鍵詞進行聚類壓縮的搜尋可達到 25 倍的改善。</p>
<h2 id="Best-Practices" class="common-anchor-header">最佳實務<button data-href="#Best-Practices" class="anchor-icon" translate="no">
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
<li><p>對於具有大量資料的集合啟用此功能。</p>
<p>資料集中的資料量越大，搜尋效能就越高。對於超過 100 萬個實體的資料集，啟用此功能是個不錯的選擇。</p></li>
<li><p>選擇適當的群集關鍵字。</p>
<p>您可以使用常被用作篩選條件的標量欄位作為叢集關鍵。對於包含來自多個租戶資料的集合，您可以使用區別一個租戶與另一個租戶的欄位作為簇集索引鍵。</p></li>
<li><p>使用分割區金鑰作為群集金鑰。</p>
<p>如果您想為 Milvus 實例中的所有集合啟用此功能，或在使用分割區金鑰的大型集合中仍面臨績效問題，則可將<code translate="no">common.usePartitionKeyAsClusteringKey</code> 設為<code translate="no">true</code> 。這樣做，當您選擇一個集合中的標量欄位作為分割鍵時，您就會有一個群集鍵和一個分割鍵。</p>
<p>請注意，此設定不會阻止您選擇其他標量欄位作為叢集索引鍵。明確指定的簇集索引鍵總是優先。</p></li>
</ul>
