---
id: grouping-search.md
title: 分组搜索
summary: >-
  分组搜索允许 Milvus 按指定字段中的值对搜索结果进行分组，以便在更高层次上汇总数据。例如，你可以使用基本的 ANN
  搜索来查找与手头这本书类似的书籍，但你也可以使用分组搜索来查找可能涉及该书所讨论主题的书籍类别。本主题将介绍如何使用分组搜索以及主要注意事项。
---
<h1 id="Grouping-Search" class="common-anchor-header">分组搜索<button data-href="#Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>分组搜索允许 Milvus 根据指定字段的值对搜索结果进行分组，以便在更高层次上汇总数据。例如，您可以使用基本的 ANN 搜索来查找与手头的图书相似的图书，但也可以使用分组搜索来查找可能涉及该图书所讨论主题的图书类别。本主题将介绍如何使用分组搜索以及主要注意事项。</p>
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
    </button></h2><p>当搜索结果中的实体在标量字段中共享相同值时，这表明它们在特定属性上相似，这可能会对搜索结果产生负面影响。</p>
<p>假设一个 Collections 存储了多个文档（用<strong>docId</strong> 表示）。在将文档转换成向量时，为了尽可能多地保留语义信息，每份文档都会被分割成更小的、易于管理的段落（或<strong>块</strong>），并作为单独的实体存储。即使文档被分割成较小的段落，用户通常仍希望识别哪些文档与他们的需求最相关。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ann-search.png" alt="Ann Search" class="doc-image" id="ann-search" />
    近似 </span> <span class="img-wrapper"> <span>搜索</span> </span></p>
<p>在对此类 Collections 执行近似近邻 (ANN) 搜索时，搜索结果可能包括同一文档中的多个段落，有可能导致其他文档被忽略，这可能与预期用例不符。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/grouping-search.png" alt="Grouping Search" class="doc-image" id="grouping-search" />
   </span> <span class="img-wrapper"> <span>分组搜索</span> </span></p>
<p>为了提高搜索结果的多样性，可以在搜索请求中添加<code translate="no">group_by_field</code> 参数来启用分组搜索。如图所示，您可以将<code translate="no">group_by_field</code> 设置为<code translate="no">docId</code> 。收到此请求后，Milvus 将</p>
<ul>
<li><p>根据提供的查询向量执行 ANN 搜索，找到与查询最相似的所有实体。</p></li>
<li><p>按指定的<code translate="no">group_by_field</code> 对搜索结果进行分组，如<code translate="no">docId</code> 。</p></li>
<li><p>根据<code translate="no">limit</code> 参数的定义，返回每个组的顶部结果，并从每个组中选出最相似的实体。</p></li>
</ul>
<div class="alert note">
<p>默认情况下，分组搜索每个组只返回一个实体。如果要增加每个组返回结果的数量，可以使用<code translate="no">group_size</code> 和<code translate="no">strict_group_size</code> 参数进行控制。</p>
</div>
<h2 id="Perform-Grouping-Search" class="common-anchor-header">执行分组搜索<button data-href="#Perform-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>本节提供示例代码，演示如何使用分组搜索。以下示例假定 Collections 包括<code translate="no">id</code>,<code translate="no">vector</code>,<code translate="no">chunk</code> 和<code translate="no">docId</code> 字段。</p>
<pre><code translate="no" class="language-python">[
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">1</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;red_7025&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">5</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">2</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3172005263489739</span>, <span class="hljs-number">0.9719044792798428</span>, -<span class="hljs-number">0.36981146090600725</span>, -<span class="hljs-number">0.4860894583077995</span>, <span class="hljs-number">0.95791889146345</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;pink_9298&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">3</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4452349528804562</span>, -<span class="hljs-number">0.8757026943054742</span>, <span class="hljs-number">0.8220779437047674</span>, <span class="hljs-number">0.46406290649483184</span>, <span class="hljs-number">0.30337481143159106</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">3</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.985825131989184</span>, -<span class="hljs-number">0.8144651566660419</span>, <span class="hljs-number">0.6299267002202009</span>, <span class="hljs-number">0.1206906911183383</span>, -<span class="hljs-number">0.1446277761879955</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">4</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.8371977790571115</span>, -<span class="hljs-number">0.015764369584852833</span>, -<span class="hljs-number">0.31062937026679327</span>, -<span class="hljs-number">0.562666951622192</span>, -<span class="hljs-number">0.8984947637863987</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;red_9392&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">1</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.33445148015177995</span>, -<span class="hljs-number">0.2567135004164067</span>, <span class="hljs-number">0.8987539745369246</span>, <span class="hljs-number">0.9402995886420709</span>, <span class="hljs-number">0.5378064918413052</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;grey_8510&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">2</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.39524717779832685</span>, <span class="hljs-number">0.4000257286739164</span>, -<span class="hljs-number">0.5890507376891594</span>, -<span class="hljs-number">0.8650502298996872</span>, -<span class="hljs-number">0.6140360785406336</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">5</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.5718280481994695</span>, <span class="hljs-number">0.24070317428066512</span>, -<span class="hljs-number">0.3737913482606834</span>, -<span class="hljs-number">0.06726932177492717</span>, -<span class="hljs-number">0.6980531615588608</span>], <span class="hljs-string">&quot;chunk&quot;</span>: <span class="hljs-string">&quot;purple_4976&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>: <span class="hljs-number">3</span>},
]

<button class="copy-code-btn"></button></code></pre>
<p>在搜索请求中，将<code translate="no">group_by_field</code> 和<code translate="no">output_fields</code> 都设置为<code translate="no">docId</code> 。Milvus 将根据指定字段对结果进行分组，并从每个分组中返回最相似的实体，包括每个返回实体的<code translate="no">docId</code> 值。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

query_vectors = [
    [<span class="hljs-number">0.14529211512077012</span>, <span class="hljs-number">0.9147257273453546</span>, <span class="hljs-number">0.7965055218724449</span>, <span class="hljs-number">0.7009258593102812</span>, <span class="hljs-number">0.5605206522382088</span>]]

<span class="hljs-comment"># Group search results</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=query_vectors,
    limit=<span class="hljs-number">3</span>,
    group_by_field=<span class="hljs-string">&quot;docId&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;docId&quot;</span>]
)

<span class="hljs-comment"># Retrieve the values in the `docId` column</span>
doc_ids = [result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;docId&#x27;</span>] <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> res[<span class="hljs-number">0</span>]]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.14529211512077012f</span>, <span class="hljs-number">0.9147257273453546f</span>, <span class="hljs-number">0.7965055218724449f</span>, <span class="hljs-number">0.7009258593102812f</span>, <span class="hljs-number">0.5605206522382088f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .groupByFieldName(<span class="hljs-string">&quot;docId&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;docId&quot;</span>))
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
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=5}, score=0.74767184, id=1)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=2}, score=0.6254269, id=7)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=3}, score=0.3611898, id=3)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

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

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithGroupByField(<span class="hljs-string">&quot;docId&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;docId&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;docId: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;docId&quot;</span>).FieldData().GetScalars())
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
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">group_by_field</span>: <span class="hljs-string">&quot;docId&quot;</span></span>
})

<span class="hljs-comment">// Retrieve the values in the `docId` column</span>
<span class="hljs-keyword">var</span> docIds = res.<span class="hljs-property">results</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> result.<span class="hljs-property">entity</span>.<span class="hljs-property">docId</span>)
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
    &quot;limit&quot;: 3,
    &quot;groupingField&quot;: &quot;docId&quot;,
    &quot;outputFields&quot;: [&quot;docId&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在上面的请求中，<code translate="no">limit=3</code> 表示系统将从三个组中返回搜索结果，每个组都包含与查询向量最相似的单个实体。</p>
<h2 id="Configure-group-size" class="common-anchor-header">配置组大小<button data-href="#Configure-group-size" class="anchor-icon" translate="no">
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
    </button></h2><p>默认情况下，分组搜索每个组只返回一个实体。如果希望每组有多个结果，请调整<code translate="no">group_size</code> 和<code translate="no">strict_group_size</code> 参数。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Group search results</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, 
    data=query_vectors, <span class="hljs-comment"># query vector</span>
    limit=<span class="hljs-number">5</span>, <span class="hljs-comment"># number of groups to return</span>
    group_by_field=<span class="hljs-string">&quot;docId&quot;</span>, <span class="hljs-comment"># grouping field</span>
    group_size=<span class="hljs-number">2</span>, <span class="hljs-comment"># p to 2 entities to return from each group</span>
    strict_group_size=<span class="hljs-literal">True</span>, <span class="hljs-comment"># return exact 2 entities from each group</span>
    output_fields=[<span class="hljs-string">&quot;docId&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.14529211512077012f</span>, <span class="hljs-number">0.9147257273453546f</span>, <span class="hljs-number">0.7965055218724449f</span>, <span class="hljs-number">0.7009258593102812f</span>, <span class="hljs-number">0.5605206522382088f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">5</span>)
        .groupByFieldName(<span class="hljs-string">&quot;docId&quot;</span>)
        .groupSize(<span class="hljs-number">2</span>)
        .strictGroupSize(<span class="hljs-literal">true</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;docId&quot;</span>))
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
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=5}, score=0.74767184, id=1)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=5}, score=-0.49148706, id=8)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=2}, score=0.6254269, id=7)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=2}, score=0.38515577, id=2)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=3}, score=0.3611898, id=3)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={docId=3}, score=0.19556211, id=4)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

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

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithGroupByField(<span class="hljs-string">&quot;docId&quot;</span>).
    WithStrictGroupSize(<span class="hljs-literal">true</span>).
    WithGroupSize(<span class="hljs-number">2</span>).
    WithOutputFields(<span class="hljs-string">&quot;docId&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;docId: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;docId&quot;</span>).FieldData().GetScalars())
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
    <span class="hljs-attr">group_by_field</span>: <span class="hljs-string">&quot;docId&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">group_size</span>: <span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">strict_group_size</span>: <span class="hljs-literal">true</span></span>
})

<span class="hljs-comment">// Retrieve the values in the `docId` column</span>
<span class="hljs-keyword">var</span> docIds = res.<span class="hljs-property">results</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> result.<span class="hljs-property">entity</span>.<span class="hljs-property">docId</span>)
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
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 5,
    &quot;groupingField&quot;: &quot;docId&quot;,
    &quot;groupSize&quot;:2,
    &quot;strictGroupSize&quot;:true,
    &quot;outputFields&quot;: [&quot;docId&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在上面的示例中</p>
<ul>
<li><p><code translate="no">group_size</code>:指定每个组要返回的实体数量。例如，设置<code translate="no">group_size=2</code> 意味着每个组（或每个<code translate="no">docId</code> ）最好返回两个最相似的段落（或<strong>块</strong>）。如果未设置<code translate="no">group_size</code> ，系统将默认为每组返回一个结果。</p></li>
<li><p><code translate="no">strict_group_size</code>:这个布尔参数控制着系统是否应严格执行<code translate="no">group_size</code> 设置的计数。当<code translate="no">strict_group_size=True</code> 时，系统将尝试在每个组中包含<code translate="no">group_size</code> 所指定的实体的确切数量（例如两个段落），除非该组中没有足够的数据。默认情况下（<code translate="no">strict_group_size=False</code> ），系统会优先满足<code translate="no">limit</code> 参数指定的组数，而不是确保每个组都包含<code translate="no">group_size</code> 实体。在数据分布不均衡的情况下，这种方法通常更有效。</p></li>
</ul>
<p>有关其他参数的详细信息，请参阅<a href="https://docs.zilliz.com/reference/python/python/Vector-search">搜索</a>。</p>
<h2 id="Considerations" class="common-anchor-header">注意事项<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p><strong>索引</strong>：此分组功能仅适用于使用这些索引类型编制索引的 Collections：<strong>flat</strong>、<strong>ivf_flat</strong>、<strong>ivf_sq8</strong>、<strong>hnsw</strong>、<strong>hnsw_pq</strong>、<strong>hnsw_prq</strong>、<strong>hnsw_sq</strong>、<strong>diskann</strong>、<strong>sparse_inverted_index</strong>。</p></li>
<li><p><strong>组数</strong>：<code translate="no">limit</code> 参数控制返回搜索结果的组的数量，而不是每个组内实体的具体数量。设置适当的<code translate="no">limit</code> 有助于控制搜索多样性和查询性能。如果数据分布密集或考虑性能问题，减少<code translate="no">limit</code> 可以降低计算成本。</p></li>
<li><p><strong>每组实体</strong>：<code translate="no">group_size</code> 参数控制每个组返回的实体数量。根据使用情况调整<code translate="no">group_size</code> 可以增加搜索结果的丰富性。但是，如果数据分布不均，某些组返回的实体数量可能少于<code translate="no">group_size</code> 的指定数量，尤其是在数据有限的情况下。</p></li>
<li><p><strong>严格的组大小</strong>：当<code translate="no">strict_group_size=True</code> 时，系统将尝试为每个组返回指定数量的实体 (<code translate="no">group_size</code>)，除非该组中没有足够的数据。此设置可确保每个组的实体数一致，但在数据分布不均或资源有限的情况下，可能会导致性能下降。如果不需要严格的实体数，设置<code translate="no">strict_group_size=False</code> 可以提高查询速度。</p></li>
</ul>
