---
id: single-vector-search.md
order: 1
summary: 이 문서에서는 단일 쿼리 벡터를 사용하여 Milvus 컬렉션에서 벡터를 검색하는 방법에 대해 설명합니다.
title: 기본 ANN 검색
---
<h1 id="Ba​sic-ANN-Search" class="common-anchor-header">기본 ANN 검색<button data-href="#Ba​sic-ANN-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>벡터 임베딩의 정렬된 순서를 기록한 인덱스 파일을 기반으로 하는 ANN(근사 최인접 이웃) 검색은 수신된 검색 요청에 포함된 쿼리 벡터를 기반으로 벡터 임베딩의 하위 집합을 찾고, 쿼리 벡터와 하위 그룹에 있는 벡터를 비교하여 가장 유사한 결과를 반환합니다. 밀버스는 ANN 검색을 통해 효율적인 검색 환경을 제공합니다. 이 페이지에서는 기본적인 ANN 검색을 수행하는 방법을 알아볼 수 있습니다.</p>
<h2 id="Overview​" class="common-anchor-header">개요<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>ANN과 kNN(k-Nearest Neighbors) 검색은 벡터 유사도 검색의 일반적인 방법입니다. kNN 검색에서는 벡터 공간의 모든 벡터를 검색 요청에 포함된 쿼리 벡터와 비교하여 가장 유사한 벡터를 찾아내야 하므로 시간과 리소스가 많이 소요됩니다.</p>
<p>kNN 검색과 달리 ANN 검색 알고리즘은 벡터 임베딩의 정렬된 순서를 기록하는 <strong>인덱스</strong> 파일을 요청합니다. 검색 요청이 들어오면 인덱스 파일을 참조로 사용해 쿼리 벡터와 가장 유사한 벡터 임베딩이 포함된 하위 그룹을 빠르게 찾을 수 있습니다. 그런 다음 지정된 <strong>메트릭 유형을</strong> 사용하여 쿼리 벡터와 하위 그룹의 벡터 간의 유사성을 측정하고, 쿼리 벡터와의 유사성을 기준으로 그룹 구성원을 정렬하고, <strong>상위 K</strong> 개의 그룹 구성원을 파악할 수 있습니다.</p>
<p>ANN 검색은 미리 구축된 인덱스에 따라 달라지며, 검색 처리량, 메모리 사용량 및 검색 정확도는 선택한 인덱스 유형에 따라 달라질 수 있습니다. 검색 성능과 정확성 간의 균형을 맞춰야 합니다. </p>
<p>학습 곡선을 줄이기 위해 Milvus는 <strong>AUTOINDEX를</strong> 제공합니다. <strong>자동 인덱</strong>스는 인덱스를 구축하는 동안 컬렉션 내의 데이터 분포를 분석하고 분석 결과에 따라 가장 최적화된 인덱스 매개변수를 설정하여 검색 성능과 정확성 간의 균형을 맞출 수 있습니다. </p>
<p>자동 인덱스 및 적용 가능한 메트릭 유형에 대한 자세한 내용은 <a href="https://milvus.io/docs/glossary.md#Auto-Index">자동 인덱스</a> 및 <a href="/docs/ko/metric.md">메트릭 유형을</a> 참조하세요. 이 섹션에서는 다음 주제에 대한 자세한 정보를 확인할 수 있습니다.</p>
<ul>
<li><p><a href="#Single-Vector-Search">단일 벡터 검색</a></p></li>
<li><p><a href="#Bulk-Vector-Search">대량 벡터 검색</a></p></li>
<li><p><a href="#ANN-Search-in-Partition">파티션에서 ANN 검색</a></p></li>
<li><p><a href="#Use-Output-Fields">출력 필드 사용</a></p></li>
<li><p><a href="#Use-Limit-and-Offset">제한 및 오프셋 사용</a></p></li>
<li><p><a href="#Enhance-ANN-Search">ANN 검색 향상</a></p></li>
</ul>
<h2 id="Single-Vector-Search​" class="common-anchor-header">단일 벡터 검색<button data-href="#Single-Vector-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>ANN 검색에서 단일 벡터 검색은 하나의 쿼리 벡터만 포함하는 검색을 말합니다. 미리 구축된 인덱스와 검색 요청에 포함된 메트릭 유형에 따라 Milvus는 쿼리 벡터와 가장 유사한 상위 K개의 벡터를 찾습니다.</p>
<p>이 섹션에서는 단일 벡터 검색을 수행하는 방법을 배웁니다. 코드 조각은 <a href="/docs/ko/create-collection-instantly#Quick-Setup">빠른 설정</a> 방식으로 컬렉션을 생성했다고 가정합니다. 검색 요청은 단일 쿼리 벡터를 전달하고 Milvus에 내적 곱(IP)을 사용하여 쿼리 벡터와 컬렉션의 벡터 간의 유사도를 계산하고 가장 유사한 세 개의 벡터를 반환하도록 요청합니다.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
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
<p>Milvus는 쿼리 벡터와의 유사도 점수에 따라 검색 결과의 순위를 내림차순으로 매깁니다. 유사도 점수는 쿼리 벡터와의 거리라고도 하며, 그 값 범위는 사용 중인 메트릭 유형에 따라 달라집니다.</p>
<p>다음 표에는 적용 가능한 메트릭 유형과 해당 거리 범위가 나와 있습니다.</p>
<table data-block-token="CTYBd8RSbogpjGxSmRCc937Qnud"><thead><tr><th data-block-token="Mk6idXTyjokI5FxIHgzc1FmhnLf" colspan="1" rowspan="1"><p data-block-token="DT2rdNtuYoJZPwxsZMCc9zTDnZf">메트릭 유형</p>
</th><th data-block-token="DlbbdGOQ8oy3DJxe57tcR4f9nee" colspan="1" rowspan="1"><p data-block-token="CnVsdS8KboXGUGx9rQFcB0G5nXb">특성</p>
</th><th data-block-token="QhwVdn1JvoCPd5x8Pxrck2QOnEf" colspan="1" rowspan="1"><p data-block-token="GQ4cdd3n4oNnjOxD9uhc5SCpnyh">거리 범위</p>
</th></tr></thead><tbody><tr><td data-block-token="SDGPdrT6ioYrZtx0jn6chigDnRe" colspan="1" rowspan="1"><p data-block-token="BF8Wd7b57oSJxHxeMUvchxNtntg"><code translate="no">L2</code></p>
</td><td data-block-token="R8zodDVyco81tkxgY3Lc3eNpnDe" colspan="1" rowspan="1"><p data-block-token="WOYAdjefpojiUMxhvFxcFzYun5d">값이 작을수록 유사성이 높음을 나타냅니다.</p>
</td><td data-block-token="FDRXdODH5oFZzixRMtXcJTBbnLe" colspan="1" rowspan="1"><p data-block-token="HKPedGZntoh3hDxY587ch8F9nzg">[0, ∞)</p>
</td></tr><tr><td data-block-token="QqHidyCE9ozC6Gxyx28cunhcnvg" colspan="1" rowspan="1"><p data-block-token="FVgcdXpbMolSpdx1ZRSc7sO1nGD"><code translate="no">IP</code></p>
</td><td data-block-token="Rfa8dK5VHowbyQxk1iEcZUrUn5f" colspan="1" rowspan="1"><p data-block-token="L7NTdDhmkozbcwx3ek1cWU8WnCh">값이 클수록 유사도가 높음을 나타냅니다.</p>
</td><td data-block-token="NhQ5d5F7Bo08Ocxeugicxqh2nrb" colspan="1" rowspan="1"><p data-block-token="E3Etd3rT1o2pwMxeZSdcB0Lpnlf">[-1, 1]</p>
</td></tr><tr><td data-block-token="QasQdmuapouIonxvyNJcBp89nNU" colspan="1" rowspan="1"><p data-block-token="MqFDdgMTgo5weSxNIRJc6XLBn8S"><code translate="no">COSINE</code></p>
</td><td data-block-token="O7hJdRazyo2YpYxBP9AcD1h8nqe" colspan="1" rowspan="1"><p data-block-token="CbhXdgXP3o8lAhxxwchcIvp3nze">값이 클수록 유사도가 높음을 나타냅니다.</p>
</td><td data-block-token="KrMvdljV3o6KoNxghnZcBBLDnNK" colspan="1" rowspan="1"><p data-block-token="KGZVdGhL9oqfSHxOVF7cg3b4nEh">[-1, 1]</p>
</td></tr><tr><td data-block-token="OSJAd3zrsoPBBMxvmRtc5vpunnh" colspan="1" rowspan="1"><p data-block-token="W8thd8nk3oRpLyxAKrGciKANnJe"><code translate="no">JACCARD</code></p>
</td><td data-block-token="PfMKdBztaoD5e1xKowmc8bUPnOe" colspan="1" rowspan="1"><p data-block-token="ZHAPdWjEsowodbxCnVGc38Qln9f">값이 작을수록 유사도가 높음을 나타냅니다.</p>
</td><td data-block-token="FtMsd7sd4otaEQxF4d3ctRR9nFb" colspan="1" rowspan="1"><p data-block-token="ThTkdBR5roENdsxTVk4cLlTvniy">[0, 1]</p>
</td></tr><tr><td data-block-token="BQcBdYGZWolZuTxijxmchefJnme" colspan="1" rowspan="1"><p data-block-token="Kowbdw3mRot9cAxg9yScuHlandh"><code translate="no">HAMMING</code></p>
</td><td data-block-token="BNYxdVEuVoqd4jxves5cQCXdnoe" colspan="1" rowspan="1"><p data-block-token="Tvghdcmo2omlhUx39tucVUPZnEh">값이 작을수록 유사도가 높음을 나타냅니다.</p>
</td><td data-block-token="YKW8dTla0oe7xdx4Hfjc0i9tned" colspan="1" rowspan="1"><p data-block-token="CzHkdNE2yoWu5ExHtXfcY0G9n2x">[0, dim(벡터)]</p>
</td></tr></tbody></table>
<h2 id="Bulk-Vector-Search​" class="common-anchor-header">대량 벡터 검색<button data-href="#Bulk-Vector-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>마찬가지로 검색 요청에 여러 개의 쿼리 벡터를 포함할 수 있습니다. Milvus는 쿼리 벡터에 대한 ANN 검색을 병렬로 수행하여 두 세트의 결과를 반환합니다.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
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
<h2 id="ANN-Search-in-Partition​" class="common-anchor-header">파티션에서 ANN 검색<button data-href="#ANN-Search-in-Partition​" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션에 여러 개의 파티션을 만들었고 검색 범위를 특정 수의 파티션으로 좁힐 수 있다고 가정해 보겠습니다. 이 경우 검색 요청에 대상 파티션 이름을 포함하여 지정된 파티션 내에서 검색 범위를 제한할 수 있습니다. 검색에 관련된 파티션 수를 줄이면 검색 성능이 향상됩니다.</p>
<p>다음 코드 스니펫은 컬렉션에 <strong>PartitionA라는</strong> 이름의 파티션이 있다고 가정합니다.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
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
<h2 id="Use-Output-Fields​" class="common-anchor-header">출력 필드 사용<button data-href="#Use-Output-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>검색 결과에서 Milvus는 기본적으로 상위 K 벡터 임베딩을 포함하는 엔티티의 기본 필드 값과 유사도 거리/점수를 포함합니다. 검색 요청에 대상 필드 이름을 출력 필드로 포함하면 검색 결과에 이러한 엔티티의 다른 필드 값이 포함되도록 할 수 있습니다.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
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
<h2 id="Use-Limit-and-Offset​" class="common-anchor-header">제한 및 오프셋 사용<button data-href="#Use-Limit-and-Offset​" class="anchor-icon" translate="no">
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
    </button></h2><p>검색 요청에 포함된 <code translate="no">limit</code> 매개변수는 검색 결과에 포함할 엔티티의 수를 결정합니다. 이 매개변수는 단일 검색에서 반환할 최대 엔티티 수를 지정하며, 일반적으로 <strong>top-K라고</strong> 합니다.</p>
<p>페이지 매김 쿼리를 수행하려는 경우 루프를 사용하여 여러 개의 검색 요청을 보내고 각 쿼리 요청에 <strong>제한</strong> 및 <strong>오프셋</strong> 매개변수를 전달할 수 있습니다. 구체적으로, 현재 쿼리 결과에 포함하려는 엔티티의 수로 <strong>Limit</strong> 매개변수를 설정하고, 이미 반환된 엔티티의 총 수로 <strong>Offset을</strong> 설정할 수 있습니다.</p>
<p>아래 표에는 한 번에 100개의 엔티티를 반환할 때 페이지 매김 쿼리에 대한 <strong>제한</strong> 및 <strong>오프셋</strong> 매개변수를 설정하는 방법이 간략하게 설명되어 있습니다.</p>
<table data-block-token="WHdZdkFtYol0QWxfjYzcMsyrnHd"><thead><tr><th data-block-token="YRpAdF69noO2EwxQJKkcRoB4nGp" colspan="1" rowspan="1"><p data-block-token="EhjLdXqY7op6anxCtOtc8KeKnkh">쿼리</p>
</th><th data-block-token="D6tSdFQQAouKA3xol6RcGFUCn4c" colspan="1" rowspan="1"><p data-block-token="KjGadCmVxoLmmIxjI3McBr18nFg">쿼리당 반환할 엔티티 수</p>
</th><th data-block-token="IDzvd2OCho3Qp0xMwXWcMZLlnWg" colspan="1" rowspan="1"><p data-block-token="RP69d4efqoAHXkxkY8OcBwPXn9e">이미 반환된 총 엔티티 수</p>
</th></tr></thead><tbody><tr><td data-block-token="QkqCdnVafo68dGxGRmicOHEQnxe" colspan="1" rowspan="1"><p data-block-token="QyEBdwnZiolkYZxWLYPc59j6nL0"><strong>첫 번째**</strong> 쿼리</p>
</td><td data-block-token="E4vsdiNZQowy6rxIy0ecRQC4nEc" colspan="1" rowspan="1"><p data-block-token="QYfudUm7uokKlIxw2n9cxKGKnyg">100</p>
</td><td data-block-token="KpaFdQx6qow5zcxElk4clK8dnEp" colspan="1" rowspan="1"><p data-block-token="ZwAAd3eu8oYltYxeyCzcvmkLnbh">0</p>
</td></tr><tr><td data-block-token="D8teddAAZoM2duxDniIc2njyn6C" colspan="1" rowspan="1"><p data-block-token="CdySdMxJ2oZ0uSxNddQcByijnhb"><strong>두 번째**</strong> 쿼리</p>
</td><td data-block-token="EhRzdF75hoPXIsxmi4Iczj87nIc" colspan="1" rowspan="1"><p data-block-token="VAPzdkDTHogP5axuOI8c101tnAh">100</p>
</td><td data-block-token="WZQ1dHMMPooABtxi0OfcEOC7nQe" colspan="1" rowspan="1"><p data-block-token="LQ59denn6obaw0xiNGec9uVEn7f">100</p>
</td></tr><tr><td data-block-token="LqQcdHDM5ozahHxEiKzcOtrxn2g" colspan="1" rowspan="1"><p data-block-token="KfKjdUdK3oAt7Fx2w7icUIapnbd"><strong>세 번째**</strong> 쿼리</p>
</td><td data-block-token="W1TfddD7poKCKzxX83wcjvoXnXb" colspan="1" rowspan="1"><p data-block-token="ELT7dJe2Ao8L6LxZODccTjAcnKb">100</p>
</td><td data-block-token="SDYedyTVDoSt9Pxwf2xcQtrInBb" colspan="1" rowspan="1"><p data-block-token="DmAId1cA0oOaUNxg6bzc1iIEn2I">200</p>
</td></tr><tr><td data-block-token="EV1Sddbj4og1YnxN3pVcI4PenWe" colspan="1" rowspan="1"><p data-block-token="J1zAdtY1MosjA0xrNuycUTLln7b"><strong>n번째**</strong> 쿼리</p>
</td><td data-block-token="M9EPdp9haoP5HqxfNvTcP9Non3e" colspan="1" rowspan="1"><p data-block-token="KNJfdZ7bFo9Jooxy2d2ckuf7n3c">100</p>
</td><td data-block-token="NobhdOnAgo2DFixUrNTcmBOVnje" colspan="1" rowspan="1"><p data-block-token="DxU4dV3WpoqEDbxMIWYcumjenUb">100 x (n-1)</p>
</td></tr></tbody></table>
<p>단일 ANN 검색에서 <code translate="no">limit</code> 와 <code translate="no">offset</code> 의 합은 16,384 미만이어야 합니다.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
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
<h2 id="Enhancing-ANN-Search​" class="common-anchor-header">ANN 검색 향상<button data-href="#Enhancing-ANN-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>자동 인덱스는 ANN 검색의 학습 곡선을 상당히 평탄화합니다. 그러나 상위-K가 증가함에 따라 검색 결과가 항상 정확하지 않을 수 있습니다. 검색 범위를 줄이고, 검색 결과 관련성을 개선하고, 검색 결과를 다양화함으로써 Milvus는 다음과 같은 검색 개선 작업을 수행합니다.</p>
<ul>
<li><p>필터링 검색</p>
<p>검색 요청에 필터링 조건을 포함하면 Milvus가 ANN 검색을 수행하기 전에 메타데이터 필터링을 수행하여 검색 범위를 전체 컬렉션에서 지정된 필터링 조건과 일치하는 엔티티로만 축소할 수 있습니다.</p>
<p>메타데이터 필터링 및 필터링 조건에 대한 자세한 내용은 <a href="/docs/ko/filtered-search.md">필터링된 검색</a> 및 <a href="/docs/ko/boolean.md">메타데이터 필터링을</a> 참조하세요.</p></li>
<li><p>범위 검색</p>
<p>특정 범위 내에서 반환되는 엔티티의 거리 또는 점수를 제한하여 검색 결과 관련성을 향상시킬 수 있습니다. Milvus에서 범위 검색은 쿼리 벡터와 가장 유사한 벡터가 포함된 동심원을 중심으로 두 개의 동심원을 그리는 방식으로 이루어집니다. 검색 요청은 두 원의 반지름을 지정하며, Milvus는 바깥쪽 원에 속하지만 안쪽 원에 속하지 않는 모든 벡터 임베딩을 반환합니다.</p>
<p>범위 검색에 대한 자세한 내용은 <a href="/docs/ko/range-search.md">범위 검색을</a> 참조하세요.</p></li>
<li><p>그룹 검색</p>
<p>반환된 엔티티가 특정 필드에서 동일한 값을 갖는 경우 검색 결과가 벡터 공간에 있는 모든 벡터 임베딩의 분포를 나타내지 않을 수 있습니다. 검색 결과를 다양화하려면 그룹화 검색을 사용해 보세요.</p>
<p>그룹화 검색에 대한 자세한 내용은 <a href="/docs/ko/grouping-search.md">그룹화 검색을</a> 참조하세요.</p></li>
<li><p>하이브리드 검색</p>
<p>컬렉션에는 서로 다른 임베딩 모델을 사용하여 생성된 벡터 임베딩을 저장하기 위해 최대 4개의 벡터 필드를 포함할 수 있습니다. 이렇게 하면 하이브리드 검색을 사용하여 이러한 벡터 필드에서 검색 결과의 순위를 재조정하여 재검색률을 높일 수 있습니다.</p>
<p>하이브리드 검색에 대한 자세한 내용은 <a href="/docs/ko/multi-vector-search.md">하이브리드 검색을</a> 참조하세요.</p></li>
<li><p>검색 이터레이터</p>
<p>단일 ANN 검색은 최대 16,384개의 엔티티를 반환합니다. 한 번의 검색으로 더 많은 엔티티를 반환해야 하는 경우 검색 반복기를 사용하는 것을 고려하세요.</p>
<p>검색 반복기에 대한 자세한 내용은 <a href="/docs/ko/with-iterators.md">검색 반복기를</a> 참조하세요.</p></li>
<li><p>전체 텍스트 검색</p>
<p>전체 텍스트 검색은 텍스트 데이터 세트에서 특정 용어나 구문이 포함된 문서를 검색한 다음 관련성에 따라 결과의 순위를 매기는 기능입니다. 이 기능은 정확한 용어를 놓칠 수 있는 시맨틱 검색의 한계를 극복하여 가장 정확하고 문맥과 연관성이 높은 결과를 얻을 수 있도록 해줍니다. 또한, 원시 텍스트 입력을 받아 벡터 임베딩을 수동으로 생성할 필요 없이 텍스트 데이터를 스파스 임베딩으로 자동 변환하여 벡터 검색을 간소화합니다.</p>
<p>전체 텍스트 검색에 대한 자세한 내용은 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색을</a> 참조하세요.</p></li>
<li><p>텍스트 일치</p>
<p>Milvus의 텍스트 일치를 사용하면 특정 용어를 기반으로 정확한 문서 검색이 가능합니다. 이 기능은 주로 특정 조건을 충족하는 필터링 검색에 사용되며, 스칼라 필터링을 통합하여 쿼리 결과를 구체화함으로써 스칼라 기준을 충족하는 벡터 내에서 유사성 검색을 할 수 있습니다.</p>
<p>텍스트 일치에 대한 자세한 내용은 <a href="/docs/ko/keyword-match.md">텍스트 일치를</a> 참조하세요.</p></li>
<li><p>파티션 키 사용</p>
<p>메타데이터 필터링에 여러 개의 스칼라 필드를 포함시키고 다소 복잡한 필터링 조건을 사용하면 검색 효율성에 영향을 미칠 수 있습니다. 스칼라 필드를 파티션 키로 설정하고 검색 요청에 파티션 키와 관련된 필터링 조건을 사용하면 지정된 파티션 키 값에 해당하는 파티션 내에서 검색 범위를 제한하는 데 도움이 될 수 있습니다. </p>
<p>파티션 키에 대한 자세한 내용은 <a href="/docs/ko/use-partition-key.md">파티션 키 사용을</a> 참조하세요.</p></li>
<li><p>mmap 사용</p>
<p>Milvus에서 메모리 매핑 파일을 사용하면 파일 내용을 메모리에 직접 매핑할 수 있습니다. 이 기능은 특히 사용 가능한 메모리가 부족하지만 완전한 데이터 로딩이 불가능한 상황에서 메모리 효율성을 향상시킵니다. 이 최적화 메커니즘은 일정 한도까지 성능을 보장하면서 데이터 용량을 늘릴 수 있지만 데이터 양이 메모리를 너무 많이 초과하면 검색 및 쿼리 성능이 심각하게 저하될 수 있으므로 이 기능을 적절하게 켜거나 끄도록 선택하세요.</p>
<p>mmap 설정에 대한 자세한 내용은 <a href="/docs/ko/mmap.md">mmap 사용을</a> 참조하세요.</p></li>
<li><p>클러스터링 압축</p>
<p>클러스터링 압축은 대규모 컬렉션에서 검색 성능을 개선하고 비용을 절감하기 위해 고안된 기능입니다. 이 가이드는 클러스터링 압축을 이해하고 이 기능으로 검색 성능을 개선하는 방법을 이해하는 데 도움이 됩니다.</p>
<p>클러스터링 압축에 대한 자세한 내용은 <a href="/docs/ko/clustering-compaction.md">클러스터링 압축</a>을 참조하세요.</p></li>
</ul>