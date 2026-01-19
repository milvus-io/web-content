---
id: range-search.md
title: 範圍搜尋
summary: 範圍搜尋可將返回實體的距離或分數限制在特定範圍內，從而改善搜尋結果的相關性。本頁可協助您瞭解何謂範圍搜尋，以及執行範圍搜尋的程序。
---
<h1 id="Range-Search" class="common-anchor-header">範圍搜尋<button data-href="#Range-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>範圍搜尋可將返回實體的距離或分數限制在特定範圍內，從而改善搜尋結果的相關性。本頁可協助您瞭解何謂範圍搜尋，以及執行範圍搜尋的程序。</p>
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
    </button></h2><p>當執行範圍搜尋請求時，Milvus 以 ANN 搜尋結果中與查詢向量最相似的向量為中心，以搜尋請求中指定的<strong>半徑</strong>為外圈半徑，以<strong>range_filter</strong>為內圈半徑，畫出兩個同心圓。所有相似度分數落在這兩個同心圓所形成的環狀區域內的向量都會被傳回。在這裡，<strong>range_filter</strong>可以設定為<strong>0</strong>，表示將傳送指定相似度得分（半徑）範圍內的所有實體。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/range-search.png" alt="Range Search" class="doc-image" id="range-search" />
   </span> <span class="img-wrapper"> <span>範圍搜尋</span> </span></p>
<p>上圖顯示範圍搜尋請求包含兩個參數：<strong>半徑</strong>和<strong>range_filter</strong>。收到範圍搜尋請求後，Milvus 會執行下列動作：</p>
<ul>
<li><p>使用指定的度量類型<strong>(COSINE</strong>) 來尋找與查詢向量最相似的所有向量內嵌。</p></li>
<li><p>篩選與查詢向量的<strong>距離</strong>或<strong>得分</strong>在<strong>半徑</strong>和<strong>range_filter</strong>參數指定範圍內的向量內嵌。</p></li>
<li><p>從篩選出的實體中傳<strong>回前 K</strong>個實體。</p></li>
</ul>
<p>設定<strong>radius</strong>和<strong>range_filter</strong>的方式會因搜尋的度量類型而異。下表列出了在不同公制類型下設定這兩個參數的要求。</p>
<table>
   <tr>
     <th><p>公制類型</p></th>
     <th><p>符號</p></th>
     <th><p>設定 radius 和 range_filter 的要求</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>L2 距離越小，表示相似度越高。</p></td>
     <td><p>若要忽略最相似的向量嵌入，請確保</p><p><code translate="no">range_filter</code> &lt;= 距離 &lt;<code translate="no">radius</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>IP 距離越大，表示相似度越高。</p></td>
     <td><p>若要忽略最相似的向量內嵌，請確保</p><p><code translate="no">radius</code> &lt; 距離 &lt;=<code translate="no">range_filter</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>COSINE 距離越大，表示相似度越高。</p></td>
     <td><p>若要忽略最相似的向量內嵌，請確保</p><p><code translate="no">radius</code> &lt; 距離 &lt;=<code translate="no">range_filter</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>較小的 Jaccard 距離表示相似度較高。</p></td>
     <td><p>若要忽略最相似的向量內嵌，請確保</p><p><code translate="no">range_filter</code> &lt;= 距離 &lt;<code translate="no">radius</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>Hamming 距離越小，表示相似度越高。</p></td>
     <td><p>若要忽略最相似的向量內嵌，請確保</p><p><code translate="no">range_filter</code> &lt;= 距離 &lt;<code translate="no">radius</code></p></td>
   </tr>
</table>
<h2 id="Examples" class="common-anchor-header">範例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>本節示範如何進行範圍搜尋。以下程式碼片段中的搜尋請求並不包含度量類型，這表示預設的度量類型<strong>COSINE</strong>適用。在這種情況下，請確<strong>保半徑</strong>值小於<strong>range_filter</strong>值。</p>
<p>在下列程式碼片段中，請將<code translate="no">radius</code> 設定為<code translate="no">0.4</code> ，並將<code translate="no">range_filter</code> 設定為<code translate="no">0.6</code> ，以便 Milvus 會傳回所有與查詢向量的距離或分數在<strong>0.4</strong>至<strong>0.6</strong> 之間的實體。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    search_params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.4</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.6</span></span>
<span class="highlighted-comment-line">        }</span>
    }
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
 io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
Map&lt;String,Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;radius&quot;</span>, <span class="hljs-number">0.4</span>);
extraParams.put(<span class="hljs-string">&quot;range_filter&quot;</span>, <span class="hljs-number">0.6</span>);
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">5</span>)
        .searchParams(extraParams)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.5975797, id=4)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.46704385, id=5)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
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

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

annParam := index.NewCustomAnnParam()
annParam.WithRadius(<span class="hljs-number">0.4</span>)
annParam.WithRangeFilter(<span class="hljs-number">0.6</span>)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithAnnParam(annParam))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">params</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.4</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.6</span></span>
<span class="highlighted-comment-line">    }</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 5,
    &quot;searchParams&quot;: {
        &quot;params&quot;: {
            &quot;radius&quot;: 0.4,
            &quot;range_filter&quot;: 0.6
        }
    }
}&#x27;</span>
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[]}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果查詢向量已經存在於目標集合中，請考慮使用<code translate="no">ids</code> 來取代在搜尋前擷取它們。詳情請參閱<a href="/docs/zh-hant/primary-key-search.md">Primary-Key Search</a>。</p>
</div>
