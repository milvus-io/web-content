---
id: range-search.md
summary: 範圍搜尋可將返回實體的距離或分數限制在特定範圍內，從而改善搜尋結果的相關性。本頁可協助您瞭解何謂範圍搜尋，以及執行範圍搜尋的程序。
title: 範圍搜尋
---
<h1 id="Range-Search​" class="common-anchor-header">範圍搜尋<button data-href="#Range-Search​" class="anchor-icon" translate="no">
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
<h2 id="Overview​" class="common-anchor-header">概述<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>當執行範圍搜尋請求時，Milvus 以 ANN 搜尋結果中與查詢向量最相似的向量為中心，以搜尋請求中指定的半徑為外圈半徑，以<strong>range_filter</strong>為內圈半徑，畫出兩個同心圓。所有相似度分數落在這兩個同心圓所形成的環狀區域內的向量都會被傳回。在這裡，<strong>range_filter</strong>可以設定為<strong>0</strong>，表示將傳送指定相似度得分（半徑）範圍內的所有實體。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/range-search.png" alt="Range search" class="doc-image" id="range-search" />
   </span> <span class="img-wrapper"> <span>範圍搜尋</span> </span></p>
<p>上圖顯示範圍搜尋請求包含兩個參數：半徑和<strong>range_filter</strong>。收到範圍搜尋請求後，Milvus 會執行下列動作。</p>
<ul>
<li><p>使用指定的度量類型<strong>(COSINE</strong>) 來尋找與查詢向量最相似的所有向量內嵌。</p></li>
<li><p>篩選與查詢向量的<strong>距離</strong>或<strong>分數</strong>在<strong>半徑</strong>和<strong>range_filter</strong>參數指定範圍內的向量內嵌。</p></li>
<li><p>從篩選出的實體中傳<strong>回前 K</strong>個實體。</p></li>
</ul>
<p>設定 radius 和<strong>range_filter</strong>的方式會因搜尋的度量類型而異。下表列出了在不同公制類型下設定這兩個參數的要求。</p>
<table data-block-token="QZ8mdLSnAotxZKxSzvpcQkNNnhe"><thead><tr><th data-block-token="SpBZdGprzoEoaixW6EfcaIFqnDh" colspan="1" rowspan="1"><p data-block-token="FwxDd8logofNV2xVMdycwXUvnMg">公制類型</p>
</th><th data-block-token="NwWNdOvpHoOQF0xDvuHcFcHQnte" colspan="1" rowspan="1"><p data-block-token="MiqddcN2voEZUSxe8hCcW3g0nXc">符號</p>
</th><th data-block-token="D1eedZmCjow2Whx7vIicOx4Enrc" colspan="1" rowspan="1"><p data-block-token="K7bldgyVFo2DmDxNamFcNddNnNb">設定 radius 和 range_filter 的要求</p>
</th></tr></thead><tbody><tr><td data-block-token="C3xxdZ0uHon6bWxACXkcOM0bnrf" colspan="1" rowspan="1"><p data-block-token="EoJSd1jo1oqt0pxhKElcLptwnJe"><code translate="no">L2</code></p>
</td><td data-block-token="AcRkdW156oOcQixJbXZchC8WnEd" colspan="1" rowspan="1"><p data-block-token="ATGrduoF1ownRSxJngycJ3NYnAe">L2 距離越小，表示相似度越高。</p>
</td><td data-block-token="Ja1hdVXtholWNfxCGKAcXzQ9nCc" colspan="1" rowspan="1"><p data-block-token="FqvMdDe6DocjQXxKHdvcp0hTnmb">若要忽略最相似的向量嵌入，請確保</p>
<p data-block-token="Ctzxdq1bjoIqKOx5WOScosN3nUf"><code translate="no">range_filter</code> &lt;= 距離 &lt;<code translate="no">radius</code></p>
</td></tr><tr><td data-block-token="UIkGdxueEo9hNox7TMFcUTTUn6d" colspan="1" rowspan="1"><p data-block-token="IpGVd1lBrojv3uxxcv1c5ZcZnBh"><code translate="no">IP</code></p>
</td><td data-block-token="VcGrdY9X5o2I8Zxv1EYcgSiwngc" colspan="1" rowspan="1"><p data-block-token="WQs5dm4BrotLVhxSRpecH6wInUc">IP 距離越大，表示相似度越高。</p>
</td><td data-block-token="DETWdE7fWo21TzxH2FxcRoQZnwd" colspan="1" rowspan="1"><p data-block-token="Wy8jdWzhsoZUJhx98jLcNIKjnSb">若要忽略最相似的向量嵌入，請確保</p>
<p data-block-token="TqYLdOaBzoVv2ZxXlwkc2UHln0d"><code translate="no">radius</code> &lt; 距離 &lt;=<code translate="no">range_filter</code></p>
</td></tr><tr><td data-block-token="NVeUd1byionhILxsXLRcTx32nbc" colspan="1" rowspan="1"><p data-block-token="ZvAcdO3b4oYibFxohwqcEIObnoh"><code translate="no">COSINE</code></p>
</td><td data-block-token="IdUKdAUIdoNllqxLiKncqQE0nbc" colspan="1" rowspan="1"><p data-block-token="UBiudQZVbopMjcx9mg6cSLQpnVh">COSINE 距離越大，表示相似度越高。</p>
</td><td data-block-token="JHc5dyljBogsOKxsPSfcb9qrnHh" colspan="1" rowspan="1"><p data-block-token="CLWEd89pQoUTeZxYOJFczlu2nwh">若要忽略最相似的向量嵌入，請確保</p>
<p data-block-token="Zx9TdYxu5ouObNxhZjvcS95wnMd"><code translate="no">radius</code> &lt; 距離 &lt;=<code translate="no">range_filter</code></p>
</td></tr><tr><td data-block-token="WsI8dAHxxobNtBxkYCmcFFtFn4c" colspan="1" rowspan="1"><p data-block-token="XvsMdyuLEoLR2wx0KdXcUmOcnlf"><code translate="no">JACCARD</code></p>
</td><td data-block-token="YC1MdSNIwoYPg2xUXAZcL74AnZd" colspan="1" rowspan="1"><p data-block-token="JaCGdLjCKonfQsxe5pecj5uQn7g">較小的 Jaccard 距離表示相似度較高。</p>
<p data-block-token="QAFVdSmNEonNSxxb65Xc4zAYnYc"></p>
</td><td data-block-token="JOfSdPDQmopx3exh68zctrUCnJc" colspan="1" rowspan="1"><p data-block-token="YoZzdQw3CoUKcfx60roc0DuKnze">若要忽略最相似的向量內嵌，請確保</p>
<p data-block-token="AURId9AadouFaLxI8esczMpgnrf"><code translate="no">range_filter</code> &lt;= 距離 &lt;<code translate="no">radius</code></p>
</td></tr><tr><td data-block-token="BVuOdQPiKoJBYoxwBgQcqugqnmh" colspan="1" rowspan="1"><p data-block-token="R96ldn7iHoUj2Gxrf65c2TmAnmf"><code translate="no">HAMMING</code></p>
</td><td data-block-token="OnAOdCFC8oyQwrx4XTRcMik1nbg" colspan="1" rowspan="1"><p data-block-token="LDT4dk5ygoAFKtxF12WctkFRnfb">Hamming 距離越小，表示相似度越高。</p>
</td><td data-block-token="VBaIdrQOOokaBvxlegWcTKDvnkc" colspan="1" rowspan="1"><p data-block-token="Z2ridFRhBoS64vxBiTrcfOagnIh">若要忽略最相似的向量內嵌，請確保</p>
<p data-block-token="UOf2do2U8oGdDNxMzqlcYdMVnie"><code translate="no">range_filter</code> &lt;= 距離 &lt;<code translate="no">radius</code></p>
</td></tr></tbody></table>
<h2 id="Examples​" class="common-anchor-header">範例<button data-href="#Examples​" class="anchor-icon" translate="no">
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
    </button></h2><p>本節示範如何進行範圍搜尋。以下程式碼片段中的搜尋請求並不包含度量類型，這表示預設的度量類型<strong>COSINE</strong>適用。在這種情況下，請確保半徑值小於<strong>range_filter</strong>值。</p>
<p>在下列程式碼片段中，請將<code translate="no">radius</code> 設定為<code translate="no">0.4</code> ，並將<code translate="no">range_filter</code> 設定為<code translate="no">0.6</code> ，以便 Milvus 會傳回所有與查詢向量的距離或分數在<strong>0.4</strong>至<strong>0.6</strong> 之間的實體。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    data=[query_vector],​
    limit=<span class="hljs-number">3</span>,​
    search_params={​
        <span class="hljs-comment"># highlight-start​</span>
        <span class="hljs-string">&quot;params&quot;</span>: {​
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.4</span>,​
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.6</span>​
        }​
        <span class="hljs-comment"># highlight-end​</span>
    }​
)​
​
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:​
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)​
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:​
        <span class="hljs-built_in">print</span>(hit)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
 io.milvus.v2.service.vector.request.SearchReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp​
​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
​
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});​
Map&lt;String,Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
extraParams.put(<span class="hljs-string">&quot;radius&quot;</span>, <span class="hljs-number">0.4</span>);​
extraParams.put(<span class="hljs-string">&quot;range_filter&quot;</span>, <span class="hljs-number">0.6</span>);​
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;range_search_collection&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">5</span>)​
        .searchParams(extraParams)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);​
​
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();​
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {​
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);​
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {​
        System.out.println(result);​
    }​
}​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// TopK results:​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.5975797, id=4)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.46704385, id=5)​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// TODO ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;range_search_collection&quot;</span>,​
    <span class="hljs-attr">data</span>: [query_vector],​
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,​
    <span class="hljs-comment">// highlight-start​</span>
    <span class="hljs-attr">params</span>: {​
        <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.4</span>,​
        <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.6</span>​
    }​
    <span class="hljs-comment">// highlight-end​</span>
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;annsField&quot;: &quot;vector&quot;,​
    &quot;filter&quot;: &quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;,​
    &quot;limit&quot;: 3,​
    &quot;searchParams&quot;: {​
        &quot;params&quot;: {​
            &quot;radius&quot;: 0.4,​
            &quot;range_filter&quot;: 0.6​
        }​
    }​
}&#x27;</span>​
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p></TabItem></Tabs></p>
