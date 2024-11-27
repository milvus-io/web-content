---
id: grouping-search.md
summary: >-
  그룹화 검색을 사용하면 Milvus는 지정된 필드의 값에 따라 검색 결과를 그룹화하여 더 높은 수준에서 데이터를 집계할 수 있습니다. 예를
  들어, 기본 ANN 검색을 사용하여 현재 책과 유사한 책을 찾을 수 있지만 그룹화 검색을 사용하여 해당 책에서 논의되는 주제와 관련된 책
  카테고리를 찾을 수 있습니다. 이 주제에서는 그룹화 검색을 사용하는 방법과 주요 고려 사항에 대해 설명합니다.
title: 그룹 검색
---
<h1 id="Grouping-Search​" class="common-anchor-header">그룹 검색<button data-href="#Grouping-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>그룹화 검색을 사용하면 Milvus는 지정된 필드의 값에 따라 검색 결과를 그룹화하여 더 높은 수준에서 데이터를 집계할 수 있습니다. 예를 들어, 기본 ANN 검색을 사용하여 현재 책과 유사한 책을 찾을 수 있지만 그룹화 검색을 사용하여 해당 책에서 논의되는 주제와 관련된 책 카테고리를 찾을 수 있습니다. 이 주제에서는 그룹화 검색을 사용하는 방법과 주요 고려 사항에 대해 설명합니다.</p>
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
    </button></h2><p>검색 결과의 엔티티가 스칼라 필드에서 동일한 값을 공유하면 특정 속성이 유사하다는 것을 나타내며, 이는 검색 결과에 부정적인 영향을 미칠 수 있습니다.</p>
<p>컬렉션에 여러 문서( <strong>docId로</strong> 표시됨)가 저장되어 있다고 가정해 보겠습니다. 문서를 벡터로 변환할 때 가능한 한 많은 의미론적 정보를 유지하기 위해 각 문서는 관리하기 쉬운 작은 단락(또는 <strong>청크</strong>)으로 분할되어 별도의 엔티티로 저장됩니다. 문서가 더 작은 섹션으로 나뉘어져 있더라도 사용자는 여전히 자신의 요구와 가장 관련성이 높은 문서를 식별하는 데 관심이 있는 경우가 많습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ann-search.png" alt="ANN Search" class="doc-image" id="ann-search" />
   </span> <span class="img-wrapper"> <span>ANN 검색</span> </span></p>
<p>이러한 컬렉션에서 근사 이웃(ANN) 검색을 수행할 때, 검색 결과에 동일한 문서의 여러 단락이 포함될 수 있으며, 이로 인해 의도한 사용 사례와 맞지 않는 다른 문서가 간과될 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/grouping-search.png" alt="Grouping Search" class="doc-image" id="grouping-search" />
   </span> <span class="img-wrapper"> <span>그룹 검색</span> </span></p>
<p>검색 결과의 다양성을 높이기 위해 검색 요청에 <code translate="no">group_by_field</code> 매개변수를 추가하여 그룹화 검색을 활성화할 수 있습니다. 다이어그램에 표시된 것처럼 <code translate="no">group_by_field</code> 을 <code translate="no">docId</code> 으로 설정할 수 있습니다. 이 요청을 받으면 Milvus는 다음과 같이 합니다.</p>
<ul>
<li><p>제공된 쿼리 벡터를 기반으로 ANN 검색을 수행하여 쿼리와 가장 유사한 모든 엔티티를 찾습니다.</p></li>
<li><p>검색 결과를 지정된 <code translate="no">group_by_field</code> 에 따라 그룹화합니다(예: <code translate="no">docId</code>).</p></li>
<li><p><code translate="no">limit</code> 매개변수에 정의된 대로 각 그룹에 대해 각 그룹에서 가장 유사한 엔티티가 있는 상위 결과를 반환합니다.</p></li>
</ul>
<div class="alert note">
<p>기본적으로 그룹 검색은 그룹당 하나의 엔터티만 반환합니다. 그룹당 반환할 결과 수를 늘리려면 <code translate="no">group_size</code> 및 <code translate="no">strict_group_size</code> 매개변수를 사용하여 이를 제어할 수 있습니다.</p>
</div>
<h2 id="Perform-Grouping-Search​" class="common-anchor-header">그룹 검색 수행<button data-href="#Perform-Grouping-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 그룹화 검색의 사용법을 보여 주는 예제 코드를 제공합니다. 다음 예제에서는 컬렉션에 <code translate="no">id</code>, <code translate="no">vector</code>, <code translate="no">chunk</code>, <code translate="no">docId</code> 에 대한 필드가 포함되어 있다고 가정합니다.</p>
<pre><code translate="no" class="language-json">[​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">1</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;red_7025&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">5</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">2</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3172005263489739</span>, <span class="hljs-number">0.9719044792798428</span>, -<span class="hljs-number">0.36981146090600725</span>, -<span class="hljs-number">0.4860894583077995</span>, <span class="hljs-number">0.95791889146345</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;pink_9298&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">3</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4452349528804562</span>, -<span class="hljs-number">0.8757026943054742</span>, <span class="hljs-number">0.8220779437047674</span>, <span class="hljs-number">0.46406290649483184</span>, <span class="hljs-number">0.30337481143159106</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">3</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.985825131989184</span>, -<span class="hljs-number">0.8144651566660419</span>, <span class="hljs-number">0.6299267002202009</span>, <span class="hljs-number">0.1206906911183383</span>, -<span class="hljs-number">0.1446277761879955</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">4</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.8371977790571115</span>, -<span class="hljs-number">0.015764369584852833</span>, -<span class="hljs-number">0.31062937026679327</span>, -<span class="hljs-number">0.562666951622192</span>, -<span class="hljs-number">0.8984947637863987</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;red_9392&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">1</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.33445148015177995</span>, -<span class="hljs-number">0.2567135004164067</span>, <span class="hljs-number">0.8987539745369246</span>, <span class="hljs-number">0.9402995886420709</span>, <span class="hljs-number">0.5378064918413052</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;grey_8510&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">2</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.39524717779832685</span>, <span class="hljs-number">0.4000257286739164</span>, -<span class="hljs-number">0.5890507376891594</span>, -<span class="hljs-number">0.8650502298996872</span>, -<span class="hljs-number">0.6140360785406336</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">5</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.5718280481994695</span>, <span class="hljs-number">0.24070317428066512</span>, -<span class="hljs-number">0.3737913482606834</span>, -<span class="hljs-number">0.06726932177492717</span>, -<span class="hljs-number">0.6980531615588608</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;purple_4976&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">3</span>},​
]​
​

<button class="copy-code-btn"></button></code></pre>
<p>검색 요청에서 <code translate="no">group_by_field</code> 와 <code translate="no">output_fields</code> 을 모두 <code translate="no">docId</code> 로 설정합니다. Milvus는 지정된 필드별로 결과를 그룹화하고 반환된 각 엔티티에 대해 <code translate="no">docId</code> 값을 포함하여 각 그룹에서 가장 유사한 엔티티를 반환합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
query_vectors = [​
    [<span class="hljs-number">0.14529211512077012</span>, <span class="hljs-number">0.9147257273453546</span>, <span class="hljs-number">0.7965055218724449</span>, <span class="hljs-number">0.7009258593102812</span>, <span class="hljs-number">0.5605206522382088</span>]]​
​
<span class="hljs-comment"># Group search results​</span>
res = client.search(​
    collection_name=<span class="hljs-string">&quot;group_search_collection&quot;</span>,​
    data=query_vectors,​
    limit=<span class="hljs-number">3</span>,​
    group_by_field=<span class="hljs-string">&quot;docId&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;docId&quot;</span>]​
)​
​
<span class="hljs-comment"># Retrieve the values in the `docId` column​</span>
doc_ids = [result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;docId&#x27;</span>] <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> res[<span class="hljs-number">0</span>]]​

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
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.14529211512077012f</span>, <span class="hljs-number">0.9147257273453546f</span>, <span class="hljs-number">0.7965055218724449f</span>, <span class="hljs-number">0.7009258593102812f</span>, <span class="hljs-number">0.5605206522382088f</span>});​
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;group_search_collection&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
        .groupByFieldName(<span class="hljs-string">&quot;docId&quot;</span>)​
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;docId&quot;</span>))​
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
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=5}, score=0.74767184, id=1)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=2}, score=0.6254269, id=7)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=3}, score=0.3611898, id=3)​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// nolint​</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">ExampleClient_Search_grouping</span><span class="hljs-params">()</span></span> {​
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
        <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit​</span>
        []entity.Vector{entity.FloatVector(queryVector)},​
    ).WithGroupByField(<span class="hljs-string">&quot;docId&quot;</span>))​
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
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-attr">data</span>: [query_vector],​
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,​
    <span class="hljs-comment">// highlight-start​</span>
    <span class="hljs-attr">group_by_field</span>: <span class="hljs-string">&quot;docId&quot;</span>​
    <span class="hljs-comment">// highlight-end​</span>
})​
​
<span class="hljs-comment">// Retrieve the values in the `docId` column​</span>
<span class="hljs-keyword">var</span> docIds = res.<span class="hljs-property">results</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> result.<span class="hljs-property">entity</span>.<span class="hljs-property">docId</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;group_search_collection&quot;,​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;annsField&quot;: &quot;vector&quot;,​
    &quot;limit&quot;: 3,​
    &quot;groupingField&quot;: &quot;docId&quot;,​
    &quot;outputFields&quot;: [&quot;docId&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>위의 요청에서 <code translate="no">limit=3</code> 은 시스템이 세 그룹의 검색 결과를 반환하며, 각 그룹에는 쿼리 벡터와 가장 유사한 단일 엔티티가 포함되어 있음을 나타냅니다.</p>
<h2 id="Configure-group-size​" class="common-anchor-header">그룹 크기 구성<button data-href="#Configure-group-size​" class="anchor-icon" translate="no">
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
    </button></h2><p>기본적으로 그룹 검색은 그룹당 하나의 엔티티만 반환합니다. 그룹당 여러 개의 결과를 표시하려면 <code translate="no">group_size</code> 및 <code translate="no">strict_group_size</code> 매개변수를 조정하세요.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Group search results​</span>
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;group_search_collection&quot;</span>, ​
    data=query_vectors, <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">5</span>, <span class="hljs-comment"># Top K results​ to return​</span>
    group_by_field=<span class="hljs-string">&quot;docId&quot;</span>, <span class="hljs-comment"># Group by docId​</span>
    group_size=<span class="hljs-number">2</span>, <span class="hljs-comment"># Return 2 entities per group​</span>
    strict_group_size=<span class="hljs-literal">True</span>, <span class="hljs-comment"># Ensure each group has 2 entities​</span>
    output_fields=[<span class="hljs-string">&quot;docId&quot;</span>]​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.14529211512077012f</span>, <span class="hljs-number">0.9147257273453546f</span>, <span class="hljs-number">0.7965055218724449f</span>, <span class="hljs-number">0.7009258593102812f</span>, <span class="hljs-number">0.5605206522382088f</span>});​
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;group_search_collection&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">5</span>)​
        .groupByFieldName(<span class="hljs-string">&quot;docId&quot;</span>)​
        .groupSize(<span class="hljs-number">2</span>)​
        .strictGroupSize(<span class="hljs-literal">true</span>)​
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;docId&quot;</span>))​
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
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=5}, score=0.74767184, id=1)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=5}, score=-0.49148706, id=8)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=2}, score=0.6254269, id=7)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=2}, score=0.38515577, id=2)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=3}, score=0.3611898, id=3)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=3}, score=0.19556211, id=4)​</span>

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
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-attr">data</span>: [query_vector],​
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,​
    <span class="hljs-attr">group_by_field</span>: <span class="hljs-string">&quot;docId&quot;</span>,​
    <span class="hljs-comment">// highlight-start​</span>
    <span class="hljs-attr">group_size</span>: <span class="hljs-number">2</span>,​
    <span class="hljs-attr">strict_group_size</span>: <span class="hljs-literal">true</span>​
    <span class="hljs-comment">// highlight-end​</span>
})​
​
<span class="hljs-comment">// Retrieve the values in the `docId` column​</span>
<span class="hljs-keyword">var</span> docIds = res.<span class="hljs-property">results</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> result.<span class="hljs-property">entity</span>.<span class="hljs-property">docId</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;group_search_collection&quot;,​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;annsField&quot;: &quot;vector&quot;,​
    &quot;limit&quot;: 5,​
    &quot;groupingField&quot;: &quot;docId&quot;,​
    &quot;groupSize&quot;:2,​
    &quot;strictGroupSize&quot;:true,​
    &quot;outputFields&quot;: [&quot;docId&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>위 예제에서는</p>
<ul>
<li><p><code translate="no">group_size</code>: 그룹당 반환할 엔티티 수를 지정합니다. 예를 들어 <code translate="no">group_size=2</code> 을 설정하면 각 그룹(또는 각 <code translate="no">docId</code>)은 가장 유사한 단락(또는 <strong>청크</strong>) 두 개를 반환하는 것이 이상적입니다. <code translate="no">group_size</code> 을 설정하지 않으면 기본적으로 그룹당 하나의 결과를 반환합니다.</p></li>
<li><p><code translate="no">strict_group_size</code>: 이 부울 매개변수는 시스템이 <code translate="no">group_size</code> 에 설정된 개수를 엄격하게 적용할지 여부를 제어합니다. <code translate="no">strict_group_size=True</code> 이면 시스템은 해당 그룹에 데이터가 충분하지 않는 한 <code translate="no">group_size</code> 에 지정된 정확한 수의 엔티티(예: 두 단락)를 각 그룹에 포함하려고 시도합니다. 기본적으로(<code translate="no">strict_group_size=False</code>), 시스템은 각 그룹에 <code translate="no">group_size</code> 엔티티가 포함되도록 하기보다는 <code translate="no">limit</code> 매개변수에 지정된 그룹 수를 충족하는 것을 우선시합니다. 이 접근 방식은 일반적으로 데이터 분포가 고르지 않은 경우에 더 효율적입니다.</p></li>
</ul>
<p>추가 매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md">search()를</a> 참조하세요.</p>
<h2 id="Considerations​" class="common-anchor-header">고려 사항<button data-href="#Considerations​" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>그룹 수</strong>: <code translate="no">limit</code> 매개변수는 각 그룹 내의 특정 엔티티 수가 아니라 검색 결과가 반환되는 그룹의 수를 제어합니다. 적절한 <code translate="no">limit</code> 을 설정하면 검색 다양성 및 쿼리 성능을 제어하는 데 도움이 됩니다. 데이터가 고밀도로 분산되어 있거나 성능이 우려되는 경우 <code translate="no">limit</code> 을 줄이면 계산 비용을 줄일 수 있습니다.</p></li>
<li><p><strong>그룹별 엔티티</strong>: <code translate="no">group_size</code> 매개변수는 그룹당 반환되는 엔티티 수를 제어합니다. 사용 사례에 따라 <code translate="no">group_size</code> 을 조정하면 검색 결과의 풍부함을 높일 수 있습니다. 그러나 데이터가 고르지 않게 분산된 경우 일부 그룹은 특히 제한된 데이터 시나리오에서 <code translate="no">group_size</code> 에서 지정한 것보다 적은 수의 엔티티를 반환할 수 있습니다.</p></li>
<li><p><strong>엄격한 그룹 크기</strong>: <code translate="no">strict_group_size=True</code> 을 선택하면 해당 그룹에 데이터가 충분하지 않는 한 시스템에서 각 그룹에 대해 지정된 수의 엔티티(<code translate="no">group_size</code>)를 반환하려고 시도합니다. 이 설정은 그룹당 일관된 엔티티 수를 보장하지만 데이터 분포가 고르지 않거나 리소스가 제한되어 있는 경우 성능이 저하될 수 있습니다. 엄격한 엔티티 수가 필요하지 않은 경우 <code translate="no">strict_group_size=False</code> 을 설정하면 쿼리 속도가 향상될 수 있습니다.</p></li>
</ul>
