---
id: grouping-search.md
title: グループ化検索
summary: >-
  グループ化検索は、Milvusが指定したフィールドの値によって検索結果をグループ化し、より高いレベルでデータを集約することを可能にします。例えば、基本的なANN検索を使用して、手元にある書籍と類似した書籍を検索することができますが、グルーピング検索を使用して、その書籍で説明されているトピックに関連する可能性のある書籍カテゴリを検索することができます。このトピックでは、キーとなる考慮事項とともに、グルーピング検索の使用方法について説明します。
---
<h1 id="Grouping-Search" class="common-anchor-header">グループ化検索<button data-href="#Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>グループ化検索は、Milvusが指定したフィールドの値によって検索結果をグループ化し、より高いレベルでデータを集約することを可能にします。例えば、基本的なANN検索を使用すると、その書籍に類似した書籍を検索することができますが、グルーピング検索を使用すると、その書籍で説明されているトピックに関連する可能性のある書籍カテゴリを検索することができます。このトピックでは、グルーピング検索の使用方法と主な注意点について説明します。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>検索結果のエンティティがスカラー・フィールドで同じ値を共有する場合、これは特定の属性で類似していることを示し、検索結果に悪影響を及ぼす可能性があります。</p>
<p>コレクションに複数のドキュメント（<strong>docIdで</strong>示される）が格納されているとします。ドキュメントをベクトルに変換するときに、できるだけ多くの意味情報を保持するために、各ドキュメントは、小さくて管理しやすい段落（または<strong>チャンク</strong>）に分割され、別々のエンティティとして格納されます。ドキュメントがより小さなセクションに分割されても、ユーザーはどのドキュメントが自分のニーズに最も関連するかを特定することに興味を持つことが多い。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ann-search.png" alt="Ann Search" class="doc-image" id="ann-search" />
   </span> <span class="img-wrapper"> <span>アン検索</span> </span></p>
<p>このようなコレクションに対して近似最近傍（ANN）検索を実行すると、検索結果に同じ文書の複数の段落が含まれ、他の文書が見落とされる可能性があり、意図したユースケースと一致しない場合があります。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/grouping-search.png" alt="Grouping Search" class="doc-image" id="grouping-search" />
   </span> <span class="img-wrapper"> <span>グループ化検索</span> </span></p>
<p>検索結果の多様性を高めるために、検索リクエストに<code translate="no">group_by_field</code> パラメータを追加して、グループ化検索を有効にすることができます。図に示すように、<code translate="no">group_by_field</code> を<code translate="no">docId</code> に設定します。このリクエストを受信すると、Milvus は以下のことを行います：</p>
<ul>
<li><p>指定されたクエリベクトルに基づいてANN検索を実行し、クエリに最も類似したエンティティをすべて検索します。</p></li>
<li><p>指定された<code translate="no">group_by_field</code>(<code translate="no">docId</code> など) によって検索結果をグループ化します。</p></li>
<li><p><code translate="no">limit</code> パラメータで定義された各グループの上位結果を、各グループから最も類似したエンティ ティとともに返す。</p></li>
</ul>
<div class="alert note">
<p>デフォルトでは、Grouping Search はグループごとに 1 つのエンティティのみを返します。グループごとに返す結果の数を増やしたい場合は、<code translate="no">group_size</code> と<code translate="no">strict_group_size</code> パラメータで制御できます。</p>
</div>
<h2 id="Perform-Grouping-Search" class="common-anchor-header">グループ化検索の実行<button data-href="#Perform-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、Grouping Search の使用法を示すサンプル・コードを提供します。以下の例では、コレクションに<code translate="no">id</code> 、<code translate="no">vector</code> 、<code translate="no">chunk</code> 、<code translate="no">docId</code> のフィールドが含まれていると仮定します。</p>
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
<p>検索要求で、<code translate="no">group_by_field</code> と<code translate="no">output_fields</code> の両方を<code translate="no">docId</code> に設定します。Milvusは、指定されたフィールドによって結果をグループ化し、各グループから最も類似したエンティティを返します。返された各エンティティの<code translate="no">docId</code> の値も含みます。</p>
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
<p>上記のリクエストでは、<code translate="no">limit=3</code> は、システムが3つのグループから検索結果を返すことを示しており、各グループにはクエリベクトルに最も類似したエンティティが1つずつ含まれています。</p>
<h2 id="Configure-group-size" class="common-anchor-header">グループ・サイズの設定<button data-href="#Configure-group-size" class="anchor-icon" translate="no">
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
    </button></h2><p>デフォルトでは、グループ化検索はグループごとに1つのエンティティのみを返します。グループごとに複数の結果を返したい場合は、<code translate="no">group_size</code> と<code translate="no">strict_group_size</code> パラメータを調整してください。</p>
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
<p>上の例では</p>
<ul>
<li><p><code translate="no">group_size</code>:グループごとに返したいエンティティの数を指定します。たとえば、<code translate="no">group_size=2</code> を設定すると、各グループ（または各<code translate="no">docId</code> ）が最も類似した段落（または<strong>チャンク</strong>）を2つ返すのが理想的です。<code translate="no">group_size</code> が設定されていない場合、システムはデフォルトでグループごとに 1 つの結果を返します。</p></li>
<li><p><code translate="no">strict_group_size</code>:このブーリアン・パラメータは、システムが<code translate="no">group_size</code> で設定されたカウントを厳密に実行するかどうかを制御します。<code translate="no">strict_group_size=True</code> の場合、そのグループに十分なデータがない場合を除き、<code translate="no">group_size</code> で指定されたエンティティ数を各グループに含めようとします（たとえば、2つの段落）。デフォルト（<code translate="no">strict_group_size=False</code> ）では、システムは、各グループに<code translate="no">group_size</code> エンティティが含まれるようにするよりも、<code translate="no">limit</code> パラメータで指定されたグループ数を満たすことを優先する。このアプローチは、データ分布が不均一な場合に一般的により効率的である。</p></li>
</ul>
<p>その他のパラメータの詳細については、<a href="https://docs.zilliz.com/reference/python/python/Vector-search">searchを</a>参照のこと。</p>
<h2 id="Considerations" class="common-anchor-header">考慮事項<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p><strong>インデックス作成</strong>：このグループ化機能は、これらのインデックス・タイプでインデックス付けされたコレクションに対してのみ機能します：<strong>flat</strong>、<strong>ivf_flat</strong>、<strong>ivf_sq8</strong>、<strong>hnsw</strong>、<strong>hnsw_pq</strong>、<strong>hnsw_prq</strong>、<strong>hnsw_sq</strong>、<strong>diskann</strong>、<strong>sparse_inverted_index</strong>。</p></li>
<li><p><strong>グループ数</strong>：<code translate="no">limit</code> パラメータは、各グループ内の特定のエンティティの数ではなく、検索結果が返されるグループの数を制御する。適切な<code translate="no">limit</code> を設定することで、検索の多様性とクエリ・パフォーマンスを制御することができます。データが高密度に分散している場合やパフォーマンスが懸念される場合は、<code translate="no">limit</code> を減らすことで計算コストを削減できます。</p></li>
<li><p><strong>グループあたりのエンティティ</strong>数：<code translate="no">group_size</code> パラメータは、グループごとに返されるエンティティの数を制御します。ユースケースに基づいて<code translate="no">group_size</code> を調整すると、検索結果の豊かさが向上します。ただし、データが不均一に分散している場合、特にデータが限られたシナリオでは、<code translate="no">group_size</code> で指定した数よりも少ないエンティティしか返されないグループもあります。</p></li>
<li><p><strong>厳格なグループサイズ</strong>：<code translate="no">strict_group_size=True</code> を指定すると、そのグループに十分なデータがない場合を除き、各グループで指定されたエンティティ数 (<code translate="no">group_size</code>) を返そうとします。この設定により、グループごとに一貫したエンティティ数が保証されますが、データ分散が不均一な場合やリソースが限られている場合、パフォーマンスが低下する可能性があります。厳密なエンティティ数が必要でない場合は、<code translate="no">strict_group_size=False</code> を設定するとクエリの速度が向上します。</p></li>
</ul>
