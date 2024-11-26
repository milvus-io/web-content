---
id: single-vector-search.md
order: 1
summary: >-
  This article describes how to search for vectors in a Milvus collection using
  a single query vector.
title: Ba​sic ANN Search
---
<h1 id="Ba​sic-ANN-Search" class="common-anchor-header">Ba​sic ANN Search<button data-href="#Ba​sic-ANN-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Based on an index file recording the sorted order of vector embeddings, the Approximate Nearest Neighbor (ANN) search locates a subset of vector embeddings based on the query vector carried in a received search request, compares the query vector with those in the subgroup, and returns the most similar results. With ANN search, Milvus provides an efficient search experience. This page helps you to learn how to conduct basic ANN searches.​</p>
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
    </button></h2><p>The ANN and the k-Nearest Neighbors (kNN) search are the usual methods in vector similarity searches. In a kNN search, you must compare all vectors in a vector space with the query vector carried in the search request before figuring out the most similar ones, which is time-consuming and resource-intensive.​</p>
<p>Unlike kNN searches, an ANN search algorithm asks for an <strong>index</strong> file that records the sorted order of vector embeddings. When a search request comes in, you can use the index file as a reference to quickly locate a subgroup probably containing vector embeddings most similar to the query vector. Then, you can use the specified <strong>metric type</strong> to measure the similarity between the query vector and those in the subgroup, sort the group members based on similarity to the query vector, and figure out the <strong>top-K</strong> group members.​</p>
<p>ANN searches depend on pre-built indexes, and the search throughput, memory usage, and search correctness may vary with the index types you choose. You need to balance search performance and correctness. ​</p>
<p>To reduce the learning curve, Milvus provides <strong>AUTOINDEX</strong>. With <strong>AUTOINDEX</strong>, Milvus can analyze the data distribution within your collection while building the index and sets the most optimized index parameters based on the analysis to strike a balance between search performance and correctness. ​</p>
<p>For details on AUTOINDEX and applicable metric types, refer to <a href="https://milvus.io/docs/glossary.md#Auto-Index">​AUTOINDEX</a> and <a href="/docs/metric.md">​Metric Types</a>. In this section, you will find detailed information about the following topics:​</p>
<ul>
<li><p><a href="#Single-Vector-Search">Single-vector search</a>​</p></li>
<li><p><a href="#Bulk-Vector-Search">Bulk-vector search</a>​</p></li>
<li><p><a href="#ANN-Search-in-Partition">ANN search in partition</a>​</p></li>
<li><p><a href="#Use-Output-Fields">Use output fields</a>​</p></li>
<li><p><a href="#Use-Limit-and-Offset">Use limit and offset</a>​</p></li>
<li><p><a href="#Enhance-ANN-Search">Enhancing ANN search</a>​</p></li>
</ul>
<h2 id="Single-Vector-Search​" class="common-anchor-header">Single-Vector Search​<button data-href="#Single-Vector-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>In ANN searches, a single-vector search refers to a search that involves only one query vector. Based on the pre-built index and the metric type carried in the search request, Milvus will find the top-K vectors most similar to the query vector.​</p>
<p>In this section, you will learn how to conduct a single-vector search. The code snippet assumes you have created a collection in a <a href="/docs/create-collection-instantly#Quick-Setup">quick-setup</a> manner. The search request carries a single query vector and asks Milvus to use Inner Product (IP) to calculate the similarity between query vectors and vectors in the collection and returns the three most similar ones.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
<span class="hljs-comment"># 4. Single vector search​</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,​
    data=[query_vector],​
    limit=<span class="hljs-number">3</span>,​
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}​
)​
​
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:​
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:​
        <span class="hljs-built_in">print</span>(hit)​
​
<span class="hljs-comment"># [​</span>
<span class="hljs-comment">#     [​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         }​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># ]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;​
​
<span class="hljs-keyword">import</span> java.util.*;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
    ​
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});​
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
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
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.95944905, id=5)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.8689616, id=1)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.866088, id=7)​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (​
    <span class="hljs-string">&quot;context&quot;</span>​
    <span class="hljs-string">&quot;fmt&quot;</span>​
    <span class="hljs-string">&quot;log&quot;</span>​
​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2&quot;</span>​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>​
)​
​
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">ExampleClient_Search_basic</span><span class="hljs-params">()</span></span> {​
    ctx, cancel := context.WithCancel(context.Background())​
    <span class="hljs-keyword">defer</span> cancel()​
​
    milvusAddr := <span class="hljs-string">&quot;127.0.0.1:19530&quot;</span>​
    token := <span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
    cli, err := client.New(ctx, &amp;client.ClientConfig{​
        Address: milvusAddr,​
        APIKey:  token,​
    })​
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
        log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())​
    }​
​
    <span class="hljs-keyword">defer</span> cli.Close(ctx)​
​
    queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}​
​
    resultSets, err := cli.Search(ctx, client.NewSearchOption(​
        <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName​</span>
        <span class="hljs-number">3</span>,             <span class="hljs-comment">// limit​</span>
        []entity.Vector{entity.FloatVector(queryVector)},​
    ))​
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
        log.Fatal(<span class="hljs-string">&quot;failed to perform basic ANN search collection: &quot;</span>, err.Error())​
    }​
​
    <span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {​
        log.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)​
        log.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)​
    }​
    <span class="hljs-comment">// Output:​</span>
    <span class="hljs-comment">// IDs:​</span>
    <span class="hljs-comment">// Scores:​</span>
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// 4. Single vector search​</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-attr">data</span>: query_vector,​
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return​</span>
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)​
​
<span class="hljs-comment">// [​</span>
<span class="hljs-comment">//   { score: 0.08821295201778412, id: &#x27;551&#x27; },​</span>
<span class="hljs-comment">//   { score: 0.0800950899720192, id: &#x27;296&#x27; },​</span>
<span class="hljs-comment">//   { score: 0.07794742286205292, id: &#x27;43&#x27; }​</span>
<span class="hljs-comment">// ]​</span>

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
    &quot;limit&quot;: 3​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: [​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 551​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 296​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 43​</span>
<span class="hljs-comment">#         }​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Milvus ranks the search results by their similarity scores to the query vector in descending order. The similarity score is also termed the distance to the query vector, and its value ranges vary with the metric types in use.​</p>
<p>The following table lists the applicable metric types and the corresponding distance ranges.​</p>
<table data-block-token="CTYBd8RSbogpjGxSmRCc937Qnud"><thead><tr><th data-block-token="Mk6idXTyjokI5FxIHgzc1FmhnLf" colspan="1" rowspan="1"><p data-block-token="DT2rdNtuYoJZPwxsZMCc9zTDnZf">Metric Type​</p>
</th><th data-block-token="DlbbdGOQ8oy3DJxe57tcR4f9nee" colspan="1" rowspan="1"><p data-block-token="CnVsdS8KboXGUGx9rQFcB0G5nXb">Characteristics​</p>
</th><th data-block-token="QhwVdn1JvoCPd5x8Pxrck2QOnEf" colspan="1" rowspan="1"><p data-block-token="GQ4cdd3n4oNnjOxD9uhc5SCpnyh">Distance Range​</p>
</th></tr></thead><tbody><tr><td data-block-token="SDGPdrT6ioYrZtx0jn6chigDnRe" colspan="1" rowspan="1"><p data-block-token="BF8Wd7b57oSJxHxeMUvchxNtntg"><code translate="no">L2</code>​</p>
</td><td data-block-token="R8zodDVyco81tkxgY3Lc3eNpnDe" colspan="1" rowspan="1"><p data-block-token="WOYAdjefpojiUMxhvFxcFzYun5d">A smaller value indicates a higher similarity.​</p>
</td><td data-block-token="FDRXdODH5oFZzixRMtXcJTBbnLe" colspan="1" rowspan="1"><p data-block-token="HKPedGZntoh3hDxY587ch8F9nzg">[0, ∞)​</p>
</td></tr><tr><td data-block-token="QqHidyCE9ozC6Gxyx28cunhcnvg" colspan="1" rowspan="1"><p data-block-token="FVgcdXpbMolSpdx1ZRSc7sO1nGD"><code translate="no">IP</code>​</p>
</td><td data-block-token="Rfa8dK5VHowbyQxk1iEcZUrUn5f" colspan="1" rowspan="1"><p data-block-token="L7NTdDhmkozbcwx3ek1cWU8WnCh">A greater value indicates a higher similarity.​</p>
</td><td data-block-token="NhQ5d5F7Bo08Ocxeugicxqh2nrb" colspan="1" rowspan="1"><p data-block-token="E3Etd3rT1o2pwMxeZSdcB0Lpnlf">[-1, 1]​</p>
</td></tr><tr><td data-block-token="QasQdmuapouIonxvyNJcBp89nNU" colspan="1" rowspan="1"><p data-block-token="MqFDdgMTgo5weSxNIRJc6XLBn8S"><code translate="no">COSINE</code>​</p>
</td><td data-block-token="O7hJdRazyo2YpYxBP9AcD1h8nqe" colspan="1" rowspan="1"><p data-block-token="CbhXdgXP3o8lAhxxwchcIvp3nze">A greater value indicates a higher similarity.​</p>
</td><td data-block-token="KrMvdljV3o6KoNxghnZcBBLDnNK" colspan="1" rowspan="1"><p data-block-token="KGZVdGhL9oqfSHxOVF7cg3b4nEh">[-1, 1]​</p>
</td></tr><tr><td data-block-token="OSJAd3zrsoPBBMxvmRtc5vpunnh" colspan="1" rowspan="1"><p data-block-token="W8thd8nk3oRpLyxAKrGciKANnJe"><code translate="no">JACCARD</code> ​</p>
</td><td data-block-token="PfMKdBztaoD5e1xKowmc8bUPnOe" colspan="1" rowspan="1"><p data-block-token="ZHAPdWjEsowodbxCnVGc38Qln9f">A smaller value indicates a higher similarity.​</p>
</td><td data-block-token="FtMsd7sd4otaEQxF4d3ctRR9nFb" colspan="1" rowspan="1"><p data-block-token="ThTkdBR5roENdsxTVk4cLlTvniy">[0, 1]​</p>
</td></tr><tr><td data-block-token="BQcBdYGZWolZuTxijxmchefJnme" colspan="1" rowspan="1"><p data-block-token="Kowbdw3mRot9cAxg9yScuHlandh"><code translate="no">HAMMING</code> ​</p>
</td><td data-block-token="BNYxdVEuVoqd4jxves5cQCXdnoe" colspan="1" rowspan="1"><p data-block-token="Tvghdcmo2omlhUx39tucVUPZnEh">A smaller value indicates a higher similarity.​</p>
</td><td data-block-token="YKW8dTla0oe7xdx4Hfjc0i9tned" colspan="1" rowspan="1"><p data-block-token="CzHkdNE2yoWu5ExHtXfcY0G9n2x">[0, dim(vector)]​</p>
</td></tr></tbody></table>
<h2 id="Bulk-Vector-Search​" class="common-anchor-header">Bulk-Vector Search​<button data-href="#Bulk-Vector-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>Similarly, you can include multiple query vectors in a search request. Milvus will conduct ANN searches for the query vectors in parallel and return two sets of results.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Search with multiple vectors​</span>
<span class="hljs-comment"># 7.1. Prepare query vectors​</span>
query_vectors = [​
    [<span class="hljs-number">0.041732933</span>, <span class="hljs-number">0.013779674</span>, -<span class="hljs-number">0.027564144</span>, -<span class="hljs-number">0.013061441</span>, <span class="hljs-number">0.009748648</span>],​
    [<span class="hljs-number">0.0039737443</span>, <span class="hljs-number">0.003020432</span>, -<span class="hljs-number">0.0006188639</span>, <span class="hljs-number">0.03913546</span>, -<span class="hljs-number">0.00089768134</span>]​
]​
​
<span class="hljs-comment"># 7.2. Start search​</span>
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    data=query_vectors,​
    limit=<span class="hljs-number">3</span>,​
)​
​
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:​
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)​
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:​
        <span class="hljs-built_in">print</span>(hit)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># [​</span>
<span class="hljs-comment">#     [​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         }​</span>
<span class="hljs-comment">#     ],​</span>
<span class="hljs-comment">#     [​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 730,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.04431751370429993,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 333,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.04231833666563034,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 232,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.04221535101532936,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         }​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># ]​</span>
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BaseVector;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp​
​
List&lt;BaseVector&gt; queryVectors = Arrays.asList(​
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.041732933f</span>, <span class="hljs-number">0.013779674f</span>, -<span class="hljs-number">0.027564144f</span>, -<span class="hljs-number">0.013061441f</span>, <span class="hljs-number">0.009748648f</span>}),​
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.0039737443f</span>, <span class="hljs-number">0.003020432f</span>, -<span class="hljs-number">0.0006188639f</span>, <span class="hljs-number">0.03913546f</span>, -<span class="hljs-number">0.00089768134f</span>})​
);​
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .data(queryVectors)​
        .topK(<span class="hljs-number">3</span>)​
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
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.49548206, id=1)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.320147, id=3)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.107413776, id=6)​</span>
<span class="hljs-comment">// TopK results:​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.5678123, id=6)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.32368967, id=2)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.24108477, id=3)​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Search with multiple vectors​</span>
<span class="hljs-keyword">const</span> query_vectors = [​
    [<span class="hljs-meta">0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592</span>], ​
    [<span class="hljs-meta">0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104</span>]​
]​
​
res = <span class="hljs-keyword">await</span> client.search({​
    collection_name: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    vectors: query_vectors,​
    limit: <span class="hljs-number">5</span>,​
})​
​
console.log(res.results)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// [​</span>
<span class="hljs-comment">//   [​</span>
<span class="hljs-comment">//     { score: 0.08821295201778412, id: &#x27;551&#x27; },​</span>
<span class="hljs-comment">//     { score: 0.0800950899720192, id: &#x27;296&#x27; },​</span>
<span class="hljs-comment">//     { score: 0.07794742286205292, id: &#x27;43&#x27; }​</span>
<span class="hljs-comment">//   ],​</span>
<span class="hljs-comment">//   [​</span>
<span class="hljs-comment">//     { score: 0.04431751370429993, id: &#x27;730&#x27; },​</span>
<span class="hljs-comment">//     { score: 0.04231833666563034, id: &#x27;333&#x27; },​</span>
<span class="hljs-comment">//     { score: 0.04221535101532936, id: &#x27;232&#x27; },​</span>
<span class="hljs-comment">//   ]​</span>
<span class="hljs-comment">// ]​</span>

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
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],​
        [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]​
    ],​
    &quot;annsField&quot;: &quot;vector&quot;,​
    &quot;limit&quot;: 3​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: [​</span>
<span class="hljs-comment">#         [​</span>
<span class="hljs-comment">#           {​</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.08821295201778412,​</span>
<span class="hljs-comment">#               &quot;id&quot;: 551​</span>
<span class="hljs-comment">#           },​</span>
<span class="hljs-comment">#           {​</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.0800950899720192,​</span>
<span class="hljs-comment">#               &quot;id&quot;: 296​</span>
<span class="hljs-comment">#           },​</span>
<span class="hljs-comment">#           {​</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.07794742286205292,​</span>
<span class="hljs-comment">#               &quot;id&quot;: 43​</span>
<span class="hljs-comment">#           }​</span>
<span class="hljs-comment">#         ],​</span>
<span class="hljs-comment">#         [​</span>
<span class="hljs-comment">#           {​</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.04431751370429993,​</span>
<span class="hljs-comment">#               &quot;id&quot;: 730​</span>
<span class="hljs-comment">#           },​</span>
<span class="hljs-comment">#           {​</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.04231833666563034,​</span>
<span class="hljs-comment">#               &quot;id&quot;: 333​</span>
<span class="hljs-comment">#           },​</span>
<span class="hljs-comment">#           {​</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.04221535101532936,​</span>
<span class="hljs-comment">#               &quot;id&quot;: 232​</span>
<span class="hljs-comment">#           }​</span>
<span class="hljs-comment">#        ]​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="ANN-Search-in-Partition​" class="common-anchor-header">ANN Search in Partition​<button data-href="#ANN-Search-in-Partition​" class="anchor-icon" translate="no">
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
    </button></h2><p>Suppose you have created multiple partitions in a collection, and you can narrow the search scope to a specific number of partitions. In that case, you can include the target partition names in the search request to restrict the search scope within the specified partitions. Reducing the number of partitions involved in the search improves search performance.​</p>
<p>The following code snippet assumes a partition named <strong>PartitionA</strong> in your collection.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search​</span>
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-comment"># highlight-next-line​</span>
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>],​
    data=[query_vector],​
    <span class="hljs-built_in">limit</span>=3,​
)​
​
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:​
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)​
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:​
        <span class="hljs-built_in">print</span>(hit)​
​
<span class="hljs-comment"># [​</span>
<span class="hljs-comment">#     [​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         }​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># ]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp​
​
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});​
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
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
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.6395302, id=13)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.5408028, id=12)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.49696884, id=17)​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Single vector search​</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-comment">// highlight-next-line​</span>
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>],​
    <span class="hljs-attr">data</span>: query_vector,​
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return​</span>
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)​
​
<span class="hljs-comment">// [​</span>
<span class="hljs-comment">//   { score: 0.08821295201778412, id: &#x27;551&#x27; },​</span>
<span class="hljs-comment">//   { score: 0.0800950899720192, id: &#x27;296&#x27; },​</span>
<span class="hljs-comment">//   { score: 0.07794742286205292, id: &#x27;43&#x27; }​</span>
<span class="hljs-comment">// ]​</span>

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
    &quot;partitionNames&quot;: [&quot;partitionA&quot;],​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;annsField&quot;: &quot;vector&quot;,​
    &quot;limit&quot;: 3​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: [​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 551​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 296​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 43​</span>
<span class="hljs-comment">#         }​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Output-Fields​" class="common-anchor-header">Use Output Fields​<button data-href="#Use-Output-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>In a search result, Milvus includes the primary field values and similarity distances/scores of the entities that contain the top-K vector embeddings by default. You can include the target field names in a search request as the output fields to make the search results carry the values from other fields in these entities.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search​</span>
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    data=[query_vector],​
    <span class="hljs-built_in">limit</span>=3, <span class="hljs-comment"># The number of results to return​</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，​
    <span class="hljs-comment"># highlight-next-line​</span>
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># [​</span>
<span class="hljs-comment">#     [​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {​</span>
<span class="hljs-comment">#                 &quot;color&quot;: &quot;orange_6781&quot;​</span>
<span class="hljs-comment">#             }​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {​</span>
<span class="hljs-comment">#                 &quot;color&quot;: &quot;red_4794&quot;​</span>
<span class="hljs-comment">#             }​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {​</span>
<span class="hljs-comment">#                 &quot;color&quot;: &quot;grey_8510&quot;​</span>
<span class="hljs-comment">#             }​</span>
<span class="hljs-comment">#         }​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># ]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp​
​
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});​
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;color&quot;</span>))​
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
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=black_9955}, score=0.95944905, id=5)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=red_7319}, score=0.8689616, id=1)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=white_5015}, score=0.866088, id=7)​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">// <span class="hljs-number">4.</span> Single vector search​
var query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],​
​
res = <span class="hljs-keyword">await</span> client.search({​
    collection_name: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    data: query_vector,​
    limit: <span class="hljs-number">3</span>, // The number of results to <span class="hljs-keyword">return</span>​
    // highlight-<span class="hljs-built_in">next</span>-line​
    output_fields: [<span class="hljs-string">&quot;color&quot;</span>]​
})​
​
console.log(res.results)​
​
// [​
//   { score: <span class="hljs-number">0.08821295201778412</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;551&#x27;</span>, entity: {<span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>}},​
//   { score: <span class="hljs-number">0.0800950899720192</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;296&#x27;</span> entity: {<span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>}},​
//   { score: <span class="hljs-number">0.07794742286205292</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;43&#x27;</span> entity: {<span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;grey_8510&quot;</span>}}​
// ]​

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
    &quot;limit&quot;: 3,​
    &quot;outputFields&quot;: [&quot;color&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: [​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,​</span>
<span class="hljs-comment">#             &quot;color&quot;: &quot;orange_6781&quot;​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,​</span>
<span class="hljs-comment">#             &quot;color&quot;: &quot;red_4794&quot;​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 43​</span>
<span class="hljs-comment">#             &quot;color&quot;: &quot;grey_8510&quot;​</span>
<span class="hljs-comment">#         }​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Limit-and-Offset​" class="common-anchor-header">Use Limit and Offset​<button data-href="#Use-Limit-and-Offset​" class="anchor-icon" translate="no">
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
    </button></h2><p>You may notice that the parameter <code translate="no">limit</code> carried in the search requests determines the number of entities to include in the search results. This parameter specifies the maximum number of entities to return in a single search, and it is usually termed <strong>top-K</strong>.​</p>
<p>If you wish to perform paginated queries, you can use a loop to send multiple Search requests, with the <strong>Limit</strong> and <strong>Offset</strong> parameters carried in each query request. Specifically, you can set the <strong>Limit</strong> parameter to the number of Entities you want to include in the current query results, and set the <strong>Offset</strong> to the total number of Entities that have already been returned.​</p>
<p>The table below outlines how to set the <strong>Limit</strong> and <strong>Offset</strong> parameters for paginated queries when returning 100 Entities at a time.​</p>
<table data-block-token="WHdZdkFtYol0QWxfjYzcMsyrnHd"><thead><tr><th data-block-token="YRpAdF69noO2EwxQJKkcRoB4nGp" colspan="1" rowspan="1"><p data-block-token="EhjLdXqY7op6anxCtOtc8KeKnkh">Queries​</p>
</th><th data-block-token="D6tSdFQQAouKA3xol6RcGFUCn4c" colspan="1" rowspan="1"><p data-block-token="KjGadCmVxoLmmIxjI3McBr18nFg">Entities to return per query​</p>
</th><th data-block-token="IDzvd2OCho3Qp0xMwXWcMZLlnWg" colspan="1" rowspan="1"><p data-block-token="RP69d4efqoAHXkxkY8OcBwPXn9e">Entities already been returned in total​</p>
</th></tr></thead><tbody><tr><td data-block-token="QkqCdnVafo68dGxGRmicOHEQnxe" colspan="1" rowspan="1"><p data-block-token="QyEBdwnZiolkYZxWLYPc59j6nL0">The <strong>**1st**</strong> query​</p>
</td><td data-block-token="E4vsdiNZQowy6rxIy0ecRQC4nEc" colspan="1" rowspan="1"><p data-block-token="QYfudUm7uokKlIxw2n9cxKGKnyg">100​</p>
</td><td data-block-token="KpaFdQx6qow5zcxElk4clK8dnEp" colspan="1" rowspan="1"><p data-block-token="ZwAAd3eu8oYltYxeyCzcvmkLnbh">0​</p>
</td></tr><tr><td data-block-token="D8teddAAZoM2duxDniIc2njyn6C" colspan="1" rowspan="1"><p data-block-token="CdySdMxJ2oZ0uSxNddQcByijnhb">The <strong>**2nd**</strong> query​</p>
</td><td data-block-token="EhRzdF75hoPXIsxmi4Iczj87nIc" colspan="1" rowspan="1"><p data-block-token="VAPzdkDTHogP5axuOI8c101tnAh">100​</p>
</td><td data-block-token="WZQ1dHMMPooABtxi0OfcEOC7nQe" colspan="1" rowspan="1"><p data-block-token="LQ59denn6obaw0xiNGec9uVEn7f">100​</p>
</td></tr><tr><td data-block-token="LqQcdHDM5ozahHxEiKzcOtrxn2g" colspan="1" rowspan="1"><p data-block-token="KfKjdUdK3oAt7Fx2w7icUIapnbd">The <strong>**3rd**</strong> query​</p>
</td><td data-block-token="W1TfddD7poKCKzxX83wcjvoXnXb" colspan="1" rowspan="1"><p data-block-token="ELT7dJe2Ao8L6LxZODccTjAcnKb">100​</p>
</td><td data-block-token="SDYedyTVDoSt9Pxwf2xcQtrInBb" colspan="1" rowspan="1"><p data-block-token="DmAId1cA0oOaUNxg6bzc1iIEn2I">200​</p>
</td></tr><tr><td data-block-token="EV1Sddbj4og1YnxN3pVcI4PenWe" colspan="1" rowspan="1"><p data-block-token="J1zAdtY1MosjA0xrNuycUTLln7b">The <strong>**nth**</strong> query ​</p>
</td><td data-block-token="M9EPdp9haoP5HqxfNvTcP9Non3e" colspan="1" rowspan="1"><p data-block-token="KNJfdZ7bFo9Jooxy2d2ckuf7n3c">100​</p>
</td><td data-block-token="NobhdOnAgo2DFixUrNTcmBOVnje" colspan="1" rowspan="1"><p data-block-token="DxU4dV3WpoqEDbxMIWYcumjenUb">100 x (n-1)​</p>
</td></tr></tbody></table>
<p>Note that, the sum of <code translate="no">limit</code> and <code translate="no">offset</code> in a single ANN search should be less than 16,384.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search​</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    data=[query_vector],​
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># The number of results to return​</span>
    search_params={​
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, ​
        <span class="hljs-comment"># highlight-next-line​</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">10</span> <span class="hljs-comment"># The records to skip​</span>
    }​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp​
​
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});​
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
        .offset(<span class="hljs-number">10</span>)​
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
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.24120237, id=16)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.22559784, id=9)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=-0.09906838, id=2)​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Single vector search​</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">data</span>: query_vector,​
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return,​</span>
    <span class="hljs-comment">// highlight-next-line​</span>
    <span class="hljs-attr">offset</span>: <span class="hljs-number">10</span> <span class="hljs-comment">// The record to skip.​</span>
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
    &quot;limit&quot;: 3,​
    &quot;offset&quot;: 10​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Enhancing-ANN-Search​" class="common-anchor-header">Enhancing ANN Search​<button data-href="#Enhancing-ANN-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>AUTOINDEX considerably flattens the learning curve of ANN searches. However, the search results may not always be correct as the top-K increases. By reducing the search scope, improving search result relevancy, and diversifying the search results, Milvus works out the following search enhancements.​</p>
<ul>
<li><p>Filtered Search​</p>
<p>You can include filtering conditions in a search request so that Milvus conducts metadata filtering before conducting ANN searches, reducing the search scope from the whole collection to only the entities matching the specified filtering conditions.​</p>
<p>For more about metadata filtering and filtering conditions, refer to <a href="/docs/filtered-search.md">​Filtered Search</a> and <a href="/docs/boolean.md">​Metadata Filtering</a>.​</p></li>
<li><p>Range Search​</p>
<p>You can improve search result relevancy by restricting the distance or score of the returned entities within a specific range. In Milvus, a range search involves drawing two concentric circles with the vector embedding most similar to the query vector as the center. The search request specifies the radius of both circles, and Milvus returns all vector embeddings that fall within the outer circle but not the inner circle.​</p>
<p>For more about range search, refer to <a href="/docs/range-search.md">​Range Search</a>.​</p></li>
<li><p>Grouping Search​</p>
<p>If the returned entities hold the same value in a specific field, the search results may not represent the distribution of all vector embeddings in the vector space. To diversify the search results, consider using the grouping search.​</p>
<p>For more about grouping search, refer to <a href="/docs/grouping-search.md">​Grouping Search</a>,​</p></li>
<li><p>Hybrid Search​</p>
<p>A collection can include up to four vector fields to save the vector embeddings generated using different embedding models. By doing so, you can use a hybrid search to rerank the search results from these vector fields, improving the recall rate.​</p>
<p>For more about hybrid search, refer to <a href="/docs/multi-vector-search.md">​Hybrid Search</a>.​</p></li>
<li><p>Search Iterator​</p>
<p>A single ANN search returns a maximum of 16,384 entities. Consider using search iterators if you need more entities to return in a single search.​</p>
<p>For details on search iterators, refer to <a href="/docs/with-iterators.md">​Search Iterator</a>.​</p></li>
<li><p>Full-Text Search​</p>
<p>Full text search is a feature that retrieves documents containing specific terms or phrases in text datasets, then ranking the results based on relevance. This feature overcomes semantic search limitations, which might overlook precise terms, ensuring you receive the most accurate and contextually relevant results. Additionally, it simplifies vector searches by accepting raw text input, automatically converting your text data into sparse embeddings without the need to manually generate vector embeddings.​</p>
<p>For details on full-text search, refer to <a href="/docs/full-text-search.md">​Full Text Search</a>.​</p></li>
<li><p>Keyword Match​</p>
<p>Keyword match in Milvus enables precise document retrieval based on specific terms. This feature is primarily used for filtered search to satisfy specific conditions and can incorporate scalar filtering to refine query results, allowing similarity searches within vectors that meet scalar criteria.​</p>
<p>For details on keyword match, refer to <a href="/docs/keyword-match.md">​Keyword Match</a>.​</p></li>
<li><p>Use Partition Key​</p>
<p>Involving multiple scalar fields in metadata filtering and using a rather complicated filtering condition may affect search efficiency. Once you set a scalar field as the partition key and use a filtering condition involving the partition key in the search request, it can help restrict the search scope within the partitions corresponding to the specified partition key values. ​</p>
<p>For details on the partition key, refer to <a href="/docs/use-partition-key.md">​Use Partition Key</a>.​</p></li>
<li><p>Use mmap​</p>
<p>In Milvus, memory-mapped files allow for direct mapping of file contents into memory. This feature enhances memory efficiency, particularly in situations where available memory is scarce but complete data loading is infeasible. This optimization mechanism can increase data capacity while ensuring performance up to a certain limit; however, when the amount of data exceeds memory by too much, search and query performance may suffer serious degradation, so please choose to turn this feature on or off as appropriate.</p>
<p>For details on mmap-settings, refer to <a href="/docs/mmap.md">​Use mmap</a>.​</p></li>
<li><p>Clustering Compaction​</p>
<p>Clustering compaction is designed to improve search performance and reduce costs in large collections. This guide will help you understand clustering compaction and how this feature can improve search performance.</p>
<p>For details on clustering compactions, refer to <a href="/docs/clustering-compaction.md">​Clustering Compaction</a>.​</p></li>
</ul>
