---
id: range-search.md
title: 범위 검색
summary: >-
  범위 검색은 반환되는 개체의 거리나 점수를 특정 범위로 제한함으로써 검색 결과의 관련성을 높여줍니다. 이 페이지에서는 범위 검색이 무엇인지,
  그리고 범위 검색을 수행하는 방법을 이해하는 데 도움을 드립니다.
---
<h1 id="Range-Search" class="common-anchor-header">범위 검색<button data-href="#Range-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>범위 검색은 반환되는 엔티티의 거리나 점수를 특정 범위로 제한하여 검색 결과의 관련성을 높입니다. 이 페이지에서는 범위 검색이 무엇인지, 그리고 범위 검색을 수행하는 절차를 이해하는 데 도움을 드립니다.</p>
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
    </button></h2><p>범위 검색 요청을 실행할 때, Milvus는 ANN 검색 결과에서 쿼리 벡터와 가장 유사한 벡터들을 중심으로 삼고, 검색 요청에 지정된 <strong>반지름을</strong> 바깥쪽 원의 반지름으로, <strong>range_filter를</strong> 안쪽 원의 반지름으로 사용하여 두 개의 동심원을 그립니다. 이 두 개의 동심원으로 형성된 고리 모양 영역 내에 유사도 점수가 포함되는 모든 벡터가 반환됩니다. 여기서 <strong>range_filter를</strong> <strong>0으로</strong> 설정하면, 지정된 유사도 점수(반경) 범위 내의 모든 엔티티가 반환됨을 의미합니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/range-search.png" alt="Range Search" class="doc-image" id="range-search" /> 
   <span>범위 검색</span>
  
 </span></p>
<p>위 다이어그램에서 볼 수 있듯이, 범위 검색 요청에는 <strong>반경(radius</strong> )과 <strong>범위 필터(range_filter</strong>)라는 두 가지 매개변수가 포함됩니다. Milvus는 범위 검색 요청을 수신하면 다음과 같은 작업을 수행합니다:</p>
<ul>
<li><p>지정된 메트릭 유형(<strong>COSINE</strong>)을 사용하여 쿼리 벡터와 가장 유사한 모든 벡터 임베딩을 찾습니다.</p></li>
<li><p>쿼리 벡터와의 <strong>거리</strong> 또는 <strong>점수가</strong> <strong>반경(radius</strong> ) 및 <strong>range_filter</strong> 매개변수로 지정된 범위 내에 속하는 벡터 임베딩을 필터링합니다.</p></li>
<li><p>필터링된 엔티티 중에서 <strong>상위 K개</strong> 엔티티를 반환합니다.</p></li>
</ul>
<p><strong>반경(radius</strong> )과 <strong>범위 필터(range_filter)를</strong> 설정하는 방법은 검색의 메트릭 유형에 따라 다릅니다. 다음 표에는 다양한 메트릭 유형에 따라 이 두 매개변수를 설정하기 위한 요구 사항이 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>메트릭 유형</p></th>
     <th><p>기호</p></th>
     <th><p>radius 및 range_filter 설정 요건</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>L2 거리가 작을수록 유사성이 높음을 나타냅니다.</p></td>
     <td><p>가장 유사한 벡터 임베딩을 제외하려면 다음 조건을 충족해야 합니다.</p><p><code translate="no">range_filter</code> &lt;= 거리 &lt; <code translate="no">radius</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>IP 거리가 클수록 유사성이 더 높음을 나타냅니다.</p></td>
     <td><p>가장 유사한 벡터 임베딩을 무시하려면 다음 조건을 충족해야 합니다.</p><p><code translate="no">radius</code> &lt; 거리 &lt;= <code translate="no">range_filter</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>코사인 거리가 클수록 유사도가 더 높음을 나타냅니다.</p></td>
     <td><p>가장 유사한 벡터 임베딩을 무시하려면 다음 조건을 충족해야 합니다.</p><p><code translate="no">radius</code> &lt; 거리 &lt;= <code translate="no">range_filter</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>자카드 거리가 작을수록 유사성이 더 높음을 나타냅니다.</p></td>
     <td><p>가장 유사한 벡터 임베딩을 무시하려면 다음 조건을 충족해야 합니다.</p><p><code translate="no">range_filter</code> &lt;= 거리 &lt; <code translate="no">radius</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>해밍 거리가 작을수록 유사성이 더 높음을 나타냅니다.</p></td>
     <td><p>가장 유사한 벡터 임베딩을 무시하려면 다음 조건을 충족해야 합니다.</p><p><code translate="no">range_filter</code> &lt;= 거리 &lt; <code translate="no">radius</code></p></td>
   </tr>
</table>
<h2 id="Examples" class="common-anchor-header">예시<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 범위 검색을 수행하는 방법을 보여줍니다. 다음 코드 예제의 검색 요청에는 메트릭 유형이 지정되어 있지 않으므로, 기본 메트릭 유형인 <strong>COSINE이</strong> 적용됨을 의미합니다. 이 경우 <strong>반경</strong> 값이 <strong>range_filter</strong> 값보다 작도록 해야 합니다.</p>
<p>다음 코드 스니펫에서 ` <code translate="no">radius</code> `을 ` <code translate="no">0.4</code> `으로, ` <code translate="no">range_filter</code> `을 ` <code translate="no">0.6</code> `으로 설정하면 Milvus는 쿼리 벡터와의 거리 또는 점수가 <strong>0.4에서</strong> <strong>0.6</strong> 사이인 모든 엔티티를 반환합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
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
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

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

milvusAddr := <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
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
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">radius</span>(<span class="hljs-number">0.4</span>)
            .<span class="hljs-title function_ invoke__">range_filter</span>(<span class="hljs-number">0.6</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>);
<span class="hljs-keyword">for</span> <span class="hljs-variable">result</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>() {
    <span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> result.<span class="hljs-title function_ invoke__">rows</span>()? {
        <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; <span class="hljs-string">&quot;Failed to connect: &quot;</span> &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span>;
}

std::vector&lt;<span class="hljs-type">float</span>&gt; queryVector = {
    <span class="hljs-number">0.35803764F</span>, <span class="hljs-number">-0.60234958F</span>, <span class="hljs-number">0.18414013F</span>, <span class="hljs-number">-0.26286206F</span>, <span class="hljs-number">0.90294385F</span>
};

<span class="hljs-keyword">auto</span> searchRequest = milvus::<span class="hljs-built_in">SearchRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                         .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                         .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
                         .<span class="hljs-built_in">WithRadius</span>(<span class="hljs-number">0.4</span>)
                         .<span class="hljs-built_in">WithRangeFilter</span>(<span class="hljs-number">0.6</span>)
                         .<span class="hljs-built_in">AddFloatVector</span>(queryVector);

milvus::SearchResponse searchResponse;
status = client-&gt;<span class="hljs-built_in">Search</span>(searchRequest, searchResponse);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; <span class="hljs-string">&quot;Search failed: &quot;</span> &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span>;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : searchResponse.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> ids = result.<span class="hljs-built_in">Ids</span>().<span class="hljs-built_in">IntIDArray</span>();
    <span class="hljs-keyword">for</span> (<span class="hljs-type">size_t</span> i = <span class="hljs-number">0</span>; i &lt; result.<span class="hljs-built_in">Scores</span>().<span class="hljs-built_in">size</span>(); ++i) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;id=&quot;</span> &lt;&lt; ids[i] &lt;&lt; <span class="hljs-string">&quot;, score=&quot;</span> &lt;&lt; result.<span class="hljs-built_in">Scores</span>()[i] &lt;&lt; std::endl;
    }
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
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-built_in">float</span>[] queryVector = [<span class="hljs-number">0.3580376395471989f</span>, <span class="hljs-number">-0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, <span class="hljs-number">-0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>];

SearchResp res = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;vector&quot;</span>,
    Vectors = [queryVector],
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
<span class="highlighted-comment-line">        Radius = <span class="hljs-string">&quot;0.4&quot;</span>,</span>
<span class="highlighted-comment-line">        RangeFilter = <span class="hljs-string">&quot;0.6&quot;</span>,</span>
        OutputFields = { <span class="hljs-string">&quot;color&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
<p>쿼리 벡터가 대상 컬렉션에 이미 존재하는 경우, 검색 전에 벡터를 다시 가져오는 대신 <code translate="no">ids</code> 를 사용하는 것을 고려해 보십시오. 자세한 내용은 <a href="/docs/ko/primary-key-search.md">기본 키 검색을</a> 참조하십시오.</p>
</div>
