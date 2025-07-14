---
id: tune_consistency.md
title: 一致性等級
summary: >-
  作為一個分散式向量資料庫，Milvus 提供多層次的一致性，以確保每個節點或副本在讀寫作業時能存取相同的資料。目前，支援的一致性層級包括
  Strong、Bounded、Eventually 和 Session，其中 Bounded 是預設使用的一致性層級。
---
<h1 id="Consistency-Level" class="common-anchor-header">一致性等級<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h1><p>作為一個分散式向量資料庫，Milvus 提供多種一致性等級，以確保每個節點或副本在讀寫作業時能存取相同的資料。目前，支援的一致性等級包括<strong>Strong</strong>、<strong>Bounded</strong>、<strong>Eventually</strong> 和<strong>Session</strong>，其中<strong>Bounded</strong>是預設使用的一致性等級。</p>
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
    </button></h2><p>Milvus 是一個將儲存和計算分開的系統。在這個系統中，<strong>資料節點 (DataNodes</strong>) 負責資料的持久化，並最終將資料儲存在分散式物件儲存空間 (例如 MinIO/S3)。<strong>QueryNodes</strong>負責處理搜尋等計算任務。這些任務涉及<strong>批次資料</strong>和<strong>串流資料</strong>的處理。簡單來說，批次資料可以理解為已經儲存於物件儲存空間的資料，而串流資料則是指尚未儲存於物件儲存空間的資料。由於網路延遲的關係，QueryNodes 通常無法保存最新的串流資料。如果沒有額外的保障措施，直接在串流資料上執行搜尋，可能會導致許多未承諾的資料點遺失，影響搜尋結果的準確性。</p>
<p>Milvus 商業版是一個將儲存和計算分離的系統。在這個系統中，DataNodes 負責資料的持久化，並最終將資料儲存於分散式物件儲存空間，例如 MinIO/S3。QueryNodes 負責處理搜尋等計算任務。這些任務涉及批次資料和串流資料的處理。簡單來說，批次資料可理解為已儲存在物件儲存空間的資料，而串流資料則是指尚未儲存在物件儲存空間的資料。由於網路延遲的關係，QueryNodes 通常無法儲存最新的串流資料。如果沒有額外的保護措施，直接在串流資料上執行 Search 可能會導致遺失許多未承諾的資料點，影響搜尋結果的準確性。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/batch-data-and-streaming-data.png" alt="Batch Data And Streaming Data" class="doc-image" id="batch-data-and-streaming-data" />
   </span> <span class="img-wrapper"> <span>批次資料和串流資料</span> </span></p>
<p>如上圖所示，QueryNodes 在收到 Search 請求後，可以同時接收串流資料和批次資料。然而，由於網路延遲，QueryNodes 取得的串流資料可能不完整。</p>
<p>為了解決這個問題，Milvus 會為資料佇列中的每條記錄加上時間戳，並持續在資料佇列中插入同步時間戳。每當收到同步時間戳 (syncTs) 時，QueryNodes 會將其設定為 ServiceTime，意即 QueryNodes 可以看到該 Service Time 之前的所有資料。在 ServiceTime 的基礎上，Milvus 可以提供保證時間戳 (GuaranteeTs) 來滿足使用者對一致性和可用性的不同要求。用戶可以在他們的 Search 請求中指定 GuaranteeTs，通知 QueryNodes 需要在搜索範圍中包含指定時間點之前的資料。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/service-time-and-guarantee-time.png" alt="Service Time And Guarantee Time" class="doc-image" id="service-time-and-guarantee-time" />
   </span> <span class="img-wrapper"> <span>服務時間與保證時間</span> </span></p>
<p>如上圖所示，如果 GuaranteeTs 小於 ServiceTime，表示指定時間點之前的所有資料已完全寫入磁碟，允許 QueryNodes 立即執行 Search 作業。當 GuaranteeTs 大於 ServiceTime 時，QueryNodes 必須等到 ServiceTime 大於 GuaranteeTs 時，才能執行 Search 作業。</p>
<p>使用者需要在查詢精確度與查詢延遲之間作出權衡。如果使用者對一致性要求很高，而且對查詢延遲不敏感，他們可以將 GuaranteeTs 設定為盡可能大的值；如果使用者希望快速收到搜尋結果，而且對查詢精確度的容忍度較高，那麼可以將 GuaranteeTs 設定為較小的值。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/consistency-level-illustrated.png" alt="Consistency Level Illustrated" class="doc-image" id="consistency-level-illustrated" />
   </span> <span class="img-wrapper"> <span>一致性等級說明</span> </span></p>
<p>Milvus 提供四種不同 GuaranteeTs 的一致性等級。</p>
<ul>
<li><p><strong>強</strong></p>
<p>使用最新的時間戳作為 GuaranteeTs，查詢節點必須等到 ServiceTime 符合 GuaranteeTs 才執行 Search 請求。</p></li>
<li><p><strong>最終</strong></p>
<p>GuaranteeTs 設定為極小的值，例如 1，以避免一致性檢查，這樣 QueryNodes 就可以在所有批次資料上立即執行 Search 請求。</p></li>
<li><p><strong>有限制的延遲</strong></p>
<p>GuranteeTs 設定為早於最新時間戳記的時間點，使 QueryNodes 在執行搜尋時可容忍某些資料遺失。</p></li>
<li><p><strong>會話</strong></p>
<p>用戶端插入資料的最新時間點作為 GuaranteeTs，使 QueryNodes 能夠對用戶端插入的所有資料執行搜尋。</p></li>
</ul>
<p>Milvus 使用 Bounded Staleness 作為預設的一致性等級。如果未指定 GuaranteeTs，則使用最新的 ServiceTime 作為 GuaranteeTs。</p>
<h2 id="Set-Consistency-Level" class="common-anchor-header">設定一致性等級<button data-href="#Set-Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以在建立資料集、執行搜尋和查詢時設定不同的一致性層級。</p>
<h3 id="Set-Consistency-Level-upon-Creating-Collection" class="common-anchor-header">建立集合時設定一致性層級</h3><p>當建立一個集合時，您可以為集合內的搜尋和查詢設定一致性層級。以下程式碼範例設定一致性等級為<strong>Strong</strong>。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
<span class="highlighted-wrapper-line">        .consistencyLevel(ConsistencyLevel.STRONG)</span>
        .build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
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
                &quot;isClusteringKey&quot;: true,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 512
                }
            }
        ]
    }&#x27;</span>

<span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;consistencyLevel&quot;: &quot;Strong&quot;
}&#x27;</span>

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
<p><code translate="no">consistency_level</code> 參數的可能值是<code translate="no">Strong</code>,<code translate="no">Bounded</code>,<code translate="no">Eventually</code>, 和<code translate="no">Session</code> 。</p>
<h3 id="Set-Consistency-Level-in-Search" class="common-anchor-header">在搜尋中設定一致性層級</h3><p>您可以隨時變更特定搜尋的一致性等級。以下程式碼範例會將一致性層級設定回<strong>Bounded</strong>。此變更僅適用於目前的搜尋請求。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，
<span class="highlighted-comment-line">    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,</span>
<span class="highlighted-wrapper-line">)</span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .searchParams(params)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClBounded).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;limit&quot;: 3,
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>此參數在混合搜尋和搜尋迭加器中也可用。<code translate="no">consistency_level</code> 參數的可能值是<code translate="no">Strong</code>,<code translate="no">Bounded</code>,<code translate="no">Eventually</code>, 和<code translate="no">Session</code> 。</p>
<h3 id="Set-Consistency-Level-in-Query" class="common-anchor-header">在查詢中設定一致性層級</h3><p>您可以隨時變更特定搜尋的一致性層級。以下程式碼範例設定一致性層級為<strong>Eventually</strong>。此設定僅適用於目前的查詢請求。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    limit=<span class="hljs-number">3</span>，
<span class="highlighted-comment-line">    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,</span>
<span class="highlighted-wrapper-line">)</span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .consistencyLevel(ConsistencyLevel.EVENTUALLY)
        .build();
        
 <span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>).
    WithLimit(<span class="hljs-number">3</span>).
    WithConsistencyLevel(entity.ClEventually))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;filter&quot;: &quot;color like \&quot;red_%\&quot;&quot;,
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;,
    &quot;limit&quot;: 3
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>查詢迭代器中也可使用此參數。<code translate="no">consistency_level</code> 參數的可能值是<code translate="no">Strong</code>,<code translate="no">Bounded</code>,<code translate="no">Eventually</code>, 和<code translate="no">Session</code> 。</p>
