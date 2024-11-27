---
id: range-search.md
summary: >-
  A range search improves search result relevancy by restricting the distance or
  score of the returned entities within a specific range. This page helps you
  understand what range search is and the procedures to conduct a range search.​
title: Range Search
---
<h1 id="Range-Search​" class="common-anchor-header">Range Search​<button data-href="#Range-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>A range search improves search result relevancy by restricting the distance or score of the returned entities within a specific range. This page helps you understand what range search is and the procedures to conduct a range search.​</p>
<h2 id="Overview​" class="common-anchor-header">Overview​<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>When executing a Range Search request, Milvus uses the most similar vectors to the query vector from the ANN Search results as the center, with the radius specified in the Search request as the outer circle’s radius, and the <strong>range_filter</strong> as the inner circle’s radius to draw two concentric circles. All vectors with similarity scores that fall within the annular region formed by these two concentric circles will be returned. Here, the <strong>range_filter</strong> can be set to <strong>0</strong>, indicating that all entities within the specified similarity score (radius) will be returned.​</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/range-search.png" alt="Range search" class="doc-image" id="range-search" />
    <span>Range search</span>
  </span>
</p>
<p>The above diagram shows that a range search request carries two parameters: radius and <strong>range_filter</strong>. Upon receiving a range search request, Milvus does the following:​</p>
<ul>
<li><p>Use the specified metric type (<strong>COSINE</strong>) to find all vector embeddings most similar to the query vector.​</p></li>
<li><p>Filter the vector embeddings whose <strong>distances</strong> or <strong>scores</strong> to the query vector fall within the range specified by the <strong>radius</strong> and <strong>range_filter</strong> parameters.​</p></li>
<li><p>Return the <strong>top-K</strong> entities from the filtered ones.​</p></li>
</ul>
<p>The way to set radius and <strong>range_filter</strong> varies with the metric type of the search. The following table lists the requirements for setting these two parameters with different metric types.​</p>
<table data-block-token="QZ8mdLSnAotxZKxSzvpcQkNNnhe"><thead><tr><th data-block-token="SpBZdGprzoEoaixW6EfcaIFqnDh" colspan="1" rowspan="1"><p data-block-token="FwxDd8logofNV2xVMdycwXUvnMg">Metric Type​</p>
</th><th data-block-token="NwWNdOvpHoOQF0xDvuHcFcHQnte" colspan="1" rowspan="1"><p data-block-token="MiqddcN2voEZUSxe8hCcW3g0nXc">Denotations​</p>
</th><th data-block-token="D1eedZmCjow2Whx7vIicOx4Enrc" colspan="1" rowspan="1"><p data-block-token="K7bldgyVFo2DmDxNamFcNddNnNb">Requirements for Setting radius and range_filter​</p>
</th></tr></thead><tbody><tr><td data-block-token="C3xxdZ0uHon6bWxACXkcOM0bnrf" colspan="1" rowspan="1"><p data-block-token="EoJSd1jo1oqt0pxhKElcLptwnJe"><code translate="no">L2</code>​</p>
</td><td data-block-token="AcRkdW156oOcQixJbXZchC8WnEd" colspan="1" rowspan="1"><p data-block-token="ATGrduoF1ownRSxJngycJ3NYnAe">A smaller L2 distance indicates a higher similarity.​</p>
</td><td data-block-token="Ja1hdVXtholWNfxCGKAcXzQ9nCc" colspan="1" rowspan="1"><p data-block-token="FqvMdDe6DocjQXxKHdvcp0hTnmb">To ignore the most similar vector embeddings, ensure that​</p>
<p data-block-token="Ctzxdq1bjoIqKOx5WOScosN3nUf"><code translate="no">range_filter</code> <= distance < <code translate="no">radius</code>​</p>
</td></tr><tr><td data-block-token="UIkGdxueEo9hNox7TMFcUTTUn6d" colspan="1" rowspan="1"><p data-block-token="IpGVd1lBrojv3uxxcv1c5ZcZnBh"><code translate="no">IP</code>​</p>
</td><td data-block-token="VcGrdY9X5o2I8Zxv1EYcgSiwngc" colspan="1" rowspan="1"><p data-block-token="WQs5dm4BrotLVhxSRpecH6wInUc">A greater IP distance indicates a higher similarity.​</p>
</td><td data-block-token="DETWdE7fWo21TzxH2FxcRoQZnwd" colspan="1" rowspan="1"><p data-block-token="Wy8jdWzhsoZUJhx98jLcNIKjnSb">To ignore the most similar vector embeddings, ensure that​</p>
<p data-block-token="TqYLdOaBzoVv2ZxXlwkc2UHln0d"><code translate="no">radius</code> < distance <= <code translate="no">range_filter</code>​</p>
</td></tr><tr><td data-block-token="NVeUd1byionhILxsXLRcTx32nbc" colspan="1" rowspan="1"><p data-block-token="ZvAcdO3b4oYibFxohwqcEIObnoh"><code translate="no">COSINE</code>​</p>
</td><td data-block-token="IdUKdAUIdoNllqxLiKncqQE0nbc" colspan="1" rowspan="1"><p data-block-token="UBiudQZVbopMjcx9mg6cSLQpnVh">A greater COSINE distance indicates a higher similarity.​</p>
</td><td data-block-token="JHc5dyljBogsOKxsPSfcb9qrnHh" colspan="1" rowspan="1"><p data-block-token="CLWEd89pQoUTeZxYOJFczlu2nwh">To ignore the most similar vector embeddings, ensure that​</p>
<p data-block-token="Zx9TdYxu5ouObNxhZjvcS95wnMd"><code translate="no">radius</code> < distance <= <code translate="no">range_filter</code>​</p>
</td></tr><tr><td data-block-token="WsI8dAHxxobNtBxkYCmcFFtFn4c" colspan="1" rowspan="1"><p data-block-token="XvsMdyuLEoLR2wx0KdXcUmOcnlf"><code translate="no">JACCARD</code> ​</p>
</td><td data-block-token="YC1MdSNIwoYPg2xUXAZcL74AnZd" colspan="1" rowspan="1"><p data-block-token="JaCGdLjCKonfQsxe5pecj5uQn7g">A smaller Jaccard distance indicates a higher similarity.​</p>
<p data-block-token="QAFVdSmNEonNSxxb65Xc4zAYnYc">​</p>
</td><td data-block-token="JOfSdPDQmopx3exh68zctrUCnJc" colspan="1" rowspan="1"><p data-block-token="YoZzdQw3CoUKcfx60roc0DuKnze">To ignore the most similar vector embeddings, ensure that​</p>
<p data-block-token="AURId9AadouFaLxI8esczMpgnrf"><code translate="no">range_filter</code> <= distance < <code translate="no">radius</code>​</p>
</td></tr><tr><td data-block-token="BVuOdQPiKoJBYoxwBgQcqugqnmh" colspan="1" rowspan="1"><p data-block-token="R96ldn7iHoUj2Gxrf65c2TmAnmf"><code translate="no">HAMMING</code> ​</p>
</td><td data-block-token="OnAOdCFC8oyQwrx4XTRcMik1nbg" colspan="1" rowspan="1"><p data-block-token="LDT4dk5ygoAFKtxF12WctkFRnfb">A smaller Hamming distance indicates a higher similarity.​</p>
</td><td data-block-token="VBaIdrQOOokaBvxlegWcTKDvnkc" colspan="1" rowspan="1"><p data-block-token="Z2ridFRhBoS64vxBiTrcfOagnIh">To ignore the most similar vector embeddings, ensure that​</p>
<p data-block-token="UOf2do2U8oGdDNxMzqlcYdMVnie"><code translate="no">range_filter</code> <= distance < <code translate="no">radius</code>​</p>
</td></tr></tbody></table>
<h2 id="Examples​" class="common-anchor-header">Examples​<button data-href="#Examples​" class="anchor-icon" translate="no">
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
    </button></h2><p>This section demonstrates how to conduct a range search. The search requests in the following code snippets do not carry a metric type, indicating the default metric type <strong>COSINE</strong> applies. In this case, ensure that the radius value is smaller than the <strong>range_filter</strong> value.​</p>
<p>In the following code snippets, set <code translate="no">radius</code> to <code translate="no">0.4</code> and <code translate="no">range_filter</code> to <code translate="no">0.6</code> so that Milvus returns all entities whose distances or scores to the query vector fall within <strong>0.4</strong> to <strong>0.6</strong>.​</p>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#curl">cURL</a>
</div>
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
