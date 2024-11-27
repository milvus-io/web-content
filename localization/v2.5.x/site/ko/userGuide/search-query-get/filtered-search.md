---
id: filtered-search.md
title: 필터링된 검색
related_key: 'ann search, filtered search'
summary: >-
  ANN 검색은 지정된 벡터 임베딩과 가장 유사한 벡터 임베딩을 찾습니다. 그러나 검색 결과가 항상 정확하지는 않을 수 있습니다. 검색 요청에
  필터링 조건을 포함하면 Milvus가 ANN 검색을 수행하기 전에 메타데이터 필터링을 수행하여 검색 범위를 전체 컬렉션에서 지정된 필터링
  조건과 일치하는 엔티티로만 축소할 수 있습니다.
---
<h1 id="Filtered-Search​" class="common-anchor-header">필터링된 검색<button data-href="#Filtered-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>ANN 검색은 지정된 벡터 임베딩과 가장 유사한 벡터 임베딩을 찾습니다. 그러나 검색 결과가 항상 정확하지는 않을 수 있습니다. 검색 요청에 필터링 조건을 포함하면 Milvus가 ANN 검색을 수행하기 전에 메타데이터 필터링을 수행하여 검색 범위를 전체 컬렉션에서 지정된 필터링 조건과 일치하는 엔티티로만 좁힐 수 있습니다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션에 벡터 임베딩과 해당 메타데이터가 모두 포함된 경우, ANN 검색 전에 메타데이터를 필터링하여 검색 결과의 관련성을 향상시킬 수 있습니다. Milvus는 필터링 조건이 포함된 검색 요청을 받으면 지정된 필터링 조건과 일치하는 엔티티 내에서 검색 범위를 제한합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/filtered-search.png" alt="Filtered search" class="doc-image" id="filtered-search" />
   </span> <span class="img-wrapper"> <span>필터링된 검색</span> </span></p>
<p>위 다이어그램에서 볼 수 있듯이 검색 요청에는 <code translate="no">chunk like % red %</code> 이 필터링 조건으로 포함되어 있으며, 이는 Milvus가 <code translate="no">chunk</code> 필드에 <code translate="no">red</code> 이라는 단어가 포함된 모든 엔티티 내에서 ANN 검색을 수행해야 함을 나타냅니다. 구체적으로 Milvus는 다음을 수행합니다.</p>
<ul>
<li><p>검색 요청에 포함된 필터링 조건과 일치하는 엔티티를 필터링합니다.</p></li>
<li><p>필터링된 엔티티 내에서 ANN 검색을 수행합니다.</p></li>
<li><p>상위 K 개체를 반환합니다.</p></li>
</ul>
<h2 id="Examples" class="common-anchor-header">예제<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 필터링된 검색을 수행하는 방법을 설명합니다. 이 섹션의 코드 조각은 컬렉션에 이미 다음과 같은 엔티티가 있다고 가정합니다. 각 엔티티에는 <strong>id</strong>, <strong>벡터</strong>, <strong>색상</strong> 및 <strong>좋아요의</strong> 네 가지 필드가 있습니다.</p>
<pre><code translate="no" class="language-JSON">[​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>: <span class="hljs-number">165</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_7025&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>: <span class="hljs-number">25</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>: <span class="hljs-number">764</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3172005263489739</span>, <span class="hljs-number">0.9719044792798428</span>, -<span class="hljs-number">0.36981146090600725</span>, -<span class="hljs-number">0.4860894583077995</span>, <span class="hljs-number">0.95791889146345</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_9298&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>: <span class="hljs-number">234</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4452349528804562</span>, -<span class="hljs-number">0.8757026943054742</span>, <span class="hljs-number">0.8220779437047674</span>, <span class="hljs-number">0.46406290649483184</span>, <span class="hljs-number">0.30337481143159106</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>: <span class="hljs-number">122</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.985825131989184</span>, -<span class="hljs-number">0.8144651566660419</span>, <span class="hljs-number">0.6299267002202009</span>, <span class="hljs-number">0.1206906911183383</span>, -<span class="hljs-number">0.1446277761879955</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>: <span class="hljs-number">12</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.8371977790571115</span>, -<span class="hljs-number">0.015764369584852833</span>, -<span class="hljs-number">0.31062937026679327</span>, -<span class="hljs-number">0.562666951622192</span>, -<span class="hljs-number">0.8984947637863987</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_9392&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>: <span class="hljs-number">58</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.33445148015177995</span>, -<span class="hljs-number">0.2567135004164067</span>, <span class="hljs-number">0.8987539745369246</span>, <span class="hljs-number">0.9402995886420709</span>, <span class="hljs-number">0.5378064918413052</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;grey_8510&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>: <span class="hljs-number">775</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.39524717779832685</span>, <span class="hljs-number">0.4000257286739164</span>, -<span class="hljs-number">0.5890507376891594</span>, -<span class="hljs-number">0.8650502298996872</span>, -<span class="hljs-number">0.6140360785406336</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>: <span class="hljs-number">876</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.5718280481994695</span>, <span class="hljs-number">0.24070317428066512</span>, -<span class="hljs-number">0.3737913482606834</span>, -<span class="hljs-number">0.06726932177492717</span>, -<span class="hljs-number">0.6980531615588608</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_4976&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>: <span class="hljs-number">765</span>}​
]​

<button class="copy-code-btn"></button></code></pre>
<p>다음 코드 스니펫의 검색 요청에는 필터링 조건과 여러 출력 필드가 포함되어 있습니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
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
    limit=<span class="hljs-number">5</span>,​
    <span class="hljs-comment"># highlight-start​</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>]​
    <span class="hljs-comment"># highlight-end​</span>
)​
​
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:​
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)​
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:​
        <span class="hljs-built_in">print</span>(hit)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
​
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});​
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;filtered_search_collection&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">5</span>)​
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>))​
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
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=red_4794, likes=122}, score=0.5975797, id=4)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=red_9392, likes=58}, score=-0.24996188, id=6)​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (​
    <span class="hljs-string">&quot;context&quot;</span>​
    <span class="hljs-string">&quot;log&quot;</span>​
​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2&quot;</span>​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>​
)​
​
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">ExampleClient_Search_filter</span><span class="hljs-params">()</span></span> {​
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
                <span class="hljs-string">&quot;filtered_search_collection&quot;</span>, <span class="hljs-comment">// collectionName​</span>
                <span class="hljs-number">3</span>,             <span class="hljs-comment">// limit​</span>
                []entity.Vector{entity.FloatVector(queryVector)},​
        ).WithFilter(<span class="hljs-string">`color like &quot;red%&quot; and likes &gt; 50`</span>).WithOutputFields(<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>))​
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
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]​
​
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;filtered_search_collection&quot;</span>,​
    <span class="hljs-attr">data</span>: [query_vector],​
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,​
    <span class="hljs-comment">// highlight-start​</span>
    <span class="hljs-attr">filters</span>: <span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,​
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>]​
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
    &quot;outputFields&quot;: [&quot;color&quot;, &quot;likes&quot;]​
}&#x27;</span>​
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>검색 요청에 포함된 필터링 조건은 <code translate="no">color like &quot;red%&quot; and likes &gt; 50</code> 입니다. 첫 번째 조건은 <code translate="no">color</code> 필드에 <code translate="no">red</code> 로 시작하는 값을 가진 엔티티를 요청하고, 다른 조건은 <code translate="no">likes</code> 필드에 <code translate="no">50</code> 보다 큰 값을 가진 엔티티를 요청하는 두 가지 조건을 포함하기 위해 및 연산자를 사용합니다. 이러한 요구 사항을 충족하는 엔티티는 두 개뿐입니다. 상위-K를 <code translate="no">3</code> 로 설정하면 Milvus는 이 두 엔티티와 쿼리 벡터 사이의 거리를 계산하여 검색 결과로 반환합니다.</p>
<pre><code translate="no" class="language-JSON">[​
    {​
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, ​
        <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.3345786594834839</span>,​
        <span class="hljs-string">&quot;entity&quot;</span>: {​
            <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4452349528804562</span>, -<span class="hljs-number">0.8757026943054742</span>, <span class="hljs-number">0.8220779437047674</span>, <span class="hljs-number">0.46406290649483184</span>, <span class="hljs-number">0.30337481143159106</span>], ​
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>, ​
            <span class="hljs-string">&quot;likes&quot;</span>: <span class="hljs-number">122</span>​
        }​
    },​
    {​
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>, ​
        <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.6638239834383389</span>，​
        <span class="hljs-string">&quot;entity&quot;</span>: {​
            <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.8371977790571115</span>, -<span class="hljs-number">0.015764369584852833</span>, -<span class="hljs-number">0.31062937026679327</span>, -<span class="hljs-number">0.562666951622192</span>, -<span class="hljs-number">0.8984947637863987</span>], ​
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_9392&quot;</span>, ​
            <span class="hljs-string">&quot;likes&quot;</span>: <span class="hljs-number">58</span>​
        }​
    },​
]​

<button class="copy-code-btn"></button></code></pre>
<p>메타데이터 필터링에 사용할 수 있는 연산자에 대한 자세한 내용은 <a href="/docs/ko/boolean.md">메타데이터 필터링을</a> 참조하세요.</p>
