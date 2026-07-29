---
id: get-and-scalar-query.md
title: 查詢
summary: 使用 Query、Get 和 QueryIterator 在 Milvus 中檢索實體、篩選元資料、對查詢結果進行排序，以及彙總標量值。
---
<h1 id="Query" class="common-anchor-header">查詢<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h1><p>除了人工神經網路 (ANN) 搜尋外，Milvus 亦支援透過查詢進行元資料篩選。本頁將介紹如何使用 Query、Get 及 QueryIterators 來擷取實體、篩選元資料、排序查詢結果，以及彙總標量值。</p>
<div class="alert note">
<p>若在建立集合後新增欄位，包含這些欄位的查詢會針對未明確設定值的實體，回傳已定義的預設值或 `<code translate="no">NULL</code> `。詳細資訊請參閱「<a href="/docs/zh-hant/add-fields-to-an-existing-collection.md">變更集合架構</a>」。</p>
</div>
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
    </button></h2><p>集合可儲存各種類型的標量欄位。您可以讓 Milvus 根據一個或多個標量欄位來篩選實體。Milvus 提供三種查詢類型：Query、Get 和 QueryIterator。下表比較了這三種查詢類型。</p>
<table>
   <tr>
     <th></th>
     <th><p>Get</p></th>
     <th><p>查詢</p></th>
     <th><p>QueryIterator</p></th>
   </tr>
   <tr>
     <td><p>適用情境</p></td>
     <td><p>用於查找具有指定主鍵的實體。</p></td>
     <td><p>用以查找符合自訂篩選條件的所有實體或指定數量的實體</p></td>
     <td><p>在分頁查詢中，找出所有符合自訂篩選條件的實體。</p></td>
   </tr>
   <tr>
     <td><p>篩選方法</p></td>
     <td><p>依主鍵</p></td>
     <td><p>透過篩選表達式。</p></td>
     <td><p>透過篩選表達式。</p></td>
   </tr>
   <tr>
     <td><p>必填參數</p></td>
     <td><ul><li><p>集合名稱</p></li><li><p>主鍵</p></li></ul></td>
     <td><ul><li><p>集合名稱</p></li><li><p>篩選表達式</p></li></ul></td>
     <td><ul><li><p>集合名稱</p></li><li><p>篩選表達式</p></li><li><p>每次查詢要回傳的實體數量</p></li></ul></td>
   </tr>
   <tr>
     <td><p>可選參數</p></td>
     <td><ul><li><p>分區名稱</p></li><li><p>輸出欄位</p></li></ul></td>
     <td><ul><li><p>分區名稱</p></li><li><p>要回傳的實體數量</p></li><li><p>輸出欄位</p></li></ul></td>
     <td><ul><li><p>分區名稱</p></li><li><p>總共要回傳的實體數量</p></li><li><p>輸出欄位</p></li></ul></td>
   </tr>
   <tr>
     <td><p>回傳</p></td>
     <td><p>回傳指定集合或分區中，持有指定主鍵的實體。</p></td>
     <td><p>回傳在指定集合或分區中，符合自訂篩選條件的所有實體或指定數量的實體。</p></td>
     <td><p>透過分頁查詢，回傳指定集合或區段中符合自訂篩選條件的所有實體。</p></td>
   </tr>
</table>
<p>有關元資料篩選的更多資訊，請參閱「<a href="/docs/zh-hant/basic-operators.md">布林運算式規則</a>」。</p>
<h2 id="Use-Get" class="common-anchor-header">使用 Get<button data-href="#Use-Get" class="anchor-icon" translate="no">
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
    </button></h2><p>當您需要根據主鍵查找實體時，可以使用<strong>Get</strong>方法。以下程式碼範例假設您的集合中有三個名為<code translate="no">id</code> 、<code translate="no">vector</code> 和<code translate="no">color</code> 的欄位。</p>
<pre><code translate="no" class="language-python">[
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_7025&quot;</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3172005263489739</span>, <span class="hljs-number">0.9719044792798428</span>, -<span class="hljs-number">0.36981146090600725</span>, -<span class="hljs-number">0.4860894583077995</span>, <span class="hljs-number">0.95791889146345</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_9298&quot;</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4452349528804562</span>, -<span class="hljs-number">0.8757026943054742</span>, <span class="hljs-number">0.8220779437047674</span>, <span class="hljs-number">0.46406290649483184</span>, <span class="hljs-number">0.30337481143159106</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.985825131989184</span>, -<span class="hljs-number">0.8144651566660419</span>, <span class="hljs-number">0.6299267002202009</span>, <span class="hljs-number">0.1206906911183383</span>, -<span class="hljs-number">0.1446277761879955</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.8371977790571115</span>, -<span class="hljs-number">0.015764369584852833</span>, -<span class="hljs-number">0.31062937026679327</span>, -<span class="hljs-number">0.562666951622192</span>, -<span class="hljs-number">0.8984947637863987</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_9392&quot;</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.33445148015177995</span>, -<span class="hljs-number">0.2567135004164067</span>, <span class="hljs-number">0.8987539745369246</span>, <span class="hljs-number">0.9402995886420709</span>, <span class="hljs-number">0.5378064918413052</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;grey_8510&quot;</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.39524717779832685</span>, <span class="hljs-number">0.4000257286739164</span>, -<span class="hljs-number">0.5890507376891594</span>, -<span class="hljs-number">0.8650502298996872</span>, -<span class="hljs-number">0.6140360785406336</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span>},
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.5718280481994695</span>, <span class="hljs-number">0.24070317428066512</span>, -<span class="hljs-number">0.3737913482606834</span>, -<span class="hljs-number">0.06726932177492717</span>, -<span class="hljs-number">0.6980531615588608</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_4976&quot;</span>},
]
<button class="copy-code-btn"></button></code></pre>
<p>您可以透過以下方式根據 ID 取得實體。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

res = client.get(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    ids=[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>],
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.GetReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.GetResp
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());
        
<span class="hljs-type">GetReq</span> <span class="hljs-variable">getReq</span> <span class="hljs-operator">=</span> GetReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .ids(Arrays.asList(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>))
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
        .build();

<span class="hljs-type">GetResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.get(getReq);

List&lt;QueryResp.QueryResult&gt; results = getResp.getGetResults();
<span class="hljs-keyword">for</span> (QueryResp.QueryResult result : results) {
    System.out.println(result.getEntity());
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// {color=pink_8682, vector=[0.35803765, -0.6023496, 0.18414013, -0.26286206, 0.90294385], id=0}</span>
<span class="hljs-comment">// {color=red_7025, vector=[0.19886813, 0.060235605, 0.6976963, 0.26144746, 0.8387295], id=1}</span>
<span class="hljs-comment">// {color=orange_6781, vector=[0.43742132, -0.55975026, 0.6457888, 0.7894059, 0.20785794], id=2}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
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

resultSet, err := client.Get(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithConsistencyLevel(entity.ClStrong).
    WithIDs(column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>})).
    WithOutputFields(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(<span class="hljs-string">&quot;id: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;id&quot;</span>).FieldData().GetScalars())
fmt.Println(<span class="hljs-string">&quot;vector: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;vector&quot;</span>).FieldData().GetVectors())
fmt.Println(<span class="hljs-string">&quot;color: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;color&quot;</span>).FieldData().GetScalars())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">const</span> res = client.<span class="hljs-title function_">get</span>({
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    ids=[<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>],
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>]
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/get&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;id&quot;: [0, 1, 2],
    &quot;outputFields&quot;: [&quot;vector&quot;, &quot;color&quot;]
}&#x27;</span>

<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;color&quot;:&quot;pink_8682&quot;,&quot;id&quot;:0,&quot;vector&quot;:[0.35803765,-0.6023496,0.18414013,-0.26286206,0.90294385]},{&quot;color&quot;:&quot;red_7025&quot;,&quot;id&quot;:1,&quot;vector&quot;:[0.19886813,0.060235605,0.6976963,0.26144746,0.8387295]},{&quot;color&quot;:&quot;orange_6781&quot;,&quot;id&quot;:2,&quot;vector&quot;:[0.43742132,-0.55975026,0.6457888,0.7894059,0.20785794]}]}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Query" class="common-anchor-header">使用 Query<button data-href="#Use-Query" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Basic-Query" class="common-anchor-header">基本查詢<button data-href="#Basic-Query" class="anchor-icon" translate="no">
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
    </button></h3><p>當您需要根據自訂篩選條件查找實體時，請使用<strong>Query</strong>方法。以下程式碼範例假設集合中存在三個名為<code translate="no">id</code> 、<code translate="no">vector</code> 和<code translate="no">color</code> 的欄位，並會回傳指定數量、且<code translate="no">color</code> 值以<code translate="no">red</code> 開頭的實體。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    limit=<span class="hljs-number">3</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp

<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .build();

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(queryReq);

List&lt;QueryResp.QueryResult&gt; results = queryResp.getQueryResults();
<span class="hljs-keyword">for</span> (QueryResp.QueryResult result : results) {
    System.out.println(result.getEntity());
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// {color=red_7025, vector=[0.19886813, 0.060235605, 0.6976963, 0.26144746, 0.8387295], id=1}</span>
<span class="hljs-comment">// {color=red_4794, vector=[0.44523495, -0.8757027, 0.82207793, 0.4640629, 0.3033748], id=4}</span>
<span class="hljs-comment">// {color=red_9392, vector=[0.8371978, -0.015764369, -0.31062937, -0.56266695, -0.8984948], id=6}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(<span class="hljs-string">&quot;id: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;id&quot;</span>).FieldData().GetScalars())
fmt.Println(<span class="hljs-string">&quot;vector: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;vector&quot;</span>).FieldData().GetVectors())
fmt.Println(<span class="hljs-string">&quot;color: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;color&quot;</span>).FieldData().GetScalars())

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">const</span> res = client.<span class="hljs-title function_">query</span>({
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    filter=<span class="hljs-string">&#x27;color like &quot;red%&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    <span class="hljs-title function_">limit</span>(<span class="hljs-number">3</span>)
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;filter&quot;: &quot;color like \&quot;red%\&quot;&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;vector&quot;, &quot;color&quot;]
}&#x27;</span>
<span class="hljs-comment">#{&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;color&quot;:&quot;red_7025&quot;,&quot;id&quot;:1,&quot;vector&quot;:[0.19886813,0.060235605,0.6976963,0.26144746,0.8387295]},{&quot;color&quot;:&quot;red_4794&quot;,&quot;id&quot;:4,&quot;vector&quot;:[0.44523495,-0.8757027,0.82207793,0.4640629,0.3033748]},{&quot;color&quot;:&quot;red_9392&quot;,&quot;id&quot;:6,&quot;vector&quot;:[0.8371978,-0.015764369,-0.31062937,-0.56266695,-0.8984948]}]}</span>
<button class="copy-code-btn"></button></code></pre>
<p><a id="Sort-Query-Results"></a></p>
<h3 id="Sort-Query-Results--Milvus-30x" class="common-anchor-header">排序查詢結果<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Sort-Query-Results--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>預設情況下，Query 會以未指定順序返回結果。請使用<code translate="no">order_by</code> 參數，依據一個或多個標量欄位對結果進行排序。使用<code translate="no">order_by</code> 時，請注意：</p>
<ul>
<li><p><code translate="no">order_by</code> 必須與 `<code translate="no">limit</code>` 參數一併使用。</p></li>
<li><p>支援的欄位類型：<code translate="no">INT8</code> 、<code translate="no">INT16</code> 、<code translate="no">INT32</code> 、<code translate="no">INT64</code> 、<code translate="no">FLOAT</code> 、<code translate="no">DOUBLE</code> 以及<code translate="no">VARCHAR</code> 。不支援依向量、<code translate="no">JSON</code> 或<code translate="no">ARRAY</code> 欄位進行排序。</p></li>
<li><p>當依可為空欄位排序時，在升序排序下，NULL 值會置於末尾（NULLS LAST）；在降序排序下，則置於開頭（NULLS FIRST）。</p></li>
</ul>
<h4 id="Basic-Sort" class="common-anchor-header">基本排序</h4><p>將一組<code translate="no">&quot;field_name:direction&quot;</code> 字串傳遞給<code translate="no">order_by</code> 參數，其中<code translate="no">direction</code> 的值可為<code translate="no">asc</code> （升序）或<code translate="no">desc</code> （降序）。請注意，<code translate="no">asc</code> 和<code translate="no">desc</code> 會區分大小寫。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Sort results by id in ascending order</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    limit=<span class="hljs-number">3</span>,
<span class="highlighted-wrapper-line">    order_by=[<span class="hljs-string">&quot;id:asc&quot;</span>],</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Multi-field-Sort" class="common-anchor-header">多欄位排序</h4><p>您可以同時根據多個欄位進行排序。結果會先依據清單中的第一個欄位進行排序。當兩行在該欄位中的值相同時，則由第二個欄位決定其順序，依此類推。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sort by rating descending, then by price ascending for ties</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>],
    limit=<span class="hljs-number">10</span>,
<span class="highlighted-wrapper-line">    order_by=[<span class="hljs-string">&quot;rating:desc&quot;</span>, <span class="hljs-string">&quot;price:asc&quot;</span>],</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Pagination-with-Sort" class="common-anchor-header">帶排序的分頁</h4><p>請將 `<code translate="no">order_by</code> ` 與 `<code translate="no">limit</code> ` 及 `<code translate="no">offset</code> ` 搭配使用，以對已排序的結果進行分頁。例如，若要顯示按價格排序且跨多頁的商品清單，每頁將依正確的價格順序顯示下一批商品，且不會出現重複或缺漏的情況。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Page 1</span>
page1 = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>],
    limit=<span class="hljs-number">5</span>,
    offset=<span class="hljs-number">0</span>,
<span class="highlighted-wrapper-line">    order_by=[<span class="hljs-string">&quot;price:asc&quot;</span>],</span>
)

<span class="hljs-comment"># Page 2</span>
page2 = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>],
    limit=<span class="hljs-number">5</span>,
    offset=<span class="hljs-number">5</span>,
<span class="highlighted-wrapper-line">    order_by=[<span class="hljs-string">&quot;price:asc&quot;</span>],</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Aggregate-Query-Results--Milvus-30x" class="common-anchor-header">彙總查詢結果<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Aggregate-Query-Results--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>您可以根據一個或多個標量欄位對查詢結果進行分組，並針對各組計算彙總結果。支援的彙總運算子包括<code translate="no">count</code> 、<code translate="no">min</code> 、<code translate="no">max</code> 、<code translate="no">sum</code> 以及<code translate="no">avg</code> 。</p>
<p>使用 `<code translate="no">group_by_fields</code>` 時，請注意：</p>
<ul>
<li><p><code translate="no">group_by_fields</code> 支援的欄位類型包括：<code translate="no">INT8</code> 、<code translate="no">INT16</code> 、<code translate="no">INT32</code> 、<code translate="no">INT64</code> 、<code translate="no">VARCHAR</code> 以及<code translate="no">TIMESTAMPTZ</code> 。若依<code translate="no">FLOAT</code> 、<code translate="no">DOUBLE</code> 、vector、<code translate="no">JSON</code> 或<code translate="no">ARRAY</code> 欄位進行分組，將會產生錯誤。</p></li>
<li><p><code translate="no">sum</code> 以及<code translate="no">avg</code> 僅限數值型別。您可以將其套用至數值型別欄位，包括<code translate="no">FLOAT</code> 和<code translate="no">DOUBLE</code> ，但若將其套用至<code translate="no">VARCHAR</code> 欄位，則會產生錯誤。</p></li>
</ul>
<p>若要啟用彙總功能，請將 `<code translate="no">group_by_fields</code> ` 傳遞給 `<code translate="no">query()</code> `，並將彙總表達式（`<code translate="no">count(*)</code>`、`<code translate="no">count(&lt;field&gt;)</code>`、`<code translate="no">min(&lt;field&gt;)</code>`、`<code translate="no">max(&lt;field&gt;)</code>`、`<code translate="no">sum(&lt;field&gt;)</code>`、`<code translate="no">avg(&lt;field&gt;)</code>`）新增至 `<code translate="no">output_fields</code>`。</p>
<p>以下範例會根據「<code translate="no">color</code> 」欄位將實體分組，並回傳各顏色組別中的實體數量：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>,
<span class="highlighted-comment-line">    group_by_fields=[<span class="hljs-string">&quot;color&quot;</span>],</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;count(*)&quot;</span>],</span>
)

<span class="hljs-comment"># [{&#x27;color&#x27;: &#x27;red&#x27;,    &#x27;count(*)&#x27;: 10},</span>
<span class="hljs-comment">#  {&#x27;color&#x27;: &#x27;orange&#x27;, &#x27;count(*)&#x27;: 10},</span>
<span class="hljs-comment">#  {&#x27;color&#x27;: &#x27;yellow&#x27;, &#x27;count(*)&#x27;: 10},</span>
<span class="hljs-comment">#  {&#x27;color&#x27;: &#x27;green&#x27;,  &#x27;count(*)&#x27;: 10},</span>
<span class="hljs-comment">#  {&#x27;color&#x27;: &#x27;blue&#x27;,   &#x27;count(*)&#x27;: 10}]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>您可以在單次呼叫中請求多個彙總表達式。以下範例依<code translate="no">color</code> 進行分組，並回傳各組的實體數量、平均價格及最高評分：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>,
<span class="highlighted-comment-line">    group_by_fields=[<span class="hljs-string">&quot;color&quot;</span>],</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;count(*)&quot;</span>, <span class="hljs-string">&quot;avg(price)&quot;</span>, <span class="hljs-string">&quot;max(rating)&quot;</span>],</span>
)

<span class="hljs-comment"># [{&#x27;color&#x27;: &#x27;red&#x27;,    &#x27;count(*)&#x27;: 10, &#x27;avg(price)&#x27;: 65.22, &#x27;max(rating)&#x27;: 5},</span>
<span class="hljs-comment">#  {&#x27;color&#x27;: &#x27;orange&#x27;, &#x27;count(*)&#x27;: 10, &#x27;avg(price)&#x27;: 48.67, &#x27;max(rating)&#x27;: 5},</span>
<span class="hljs-comment">#  {&#x27;color&#x27;: &#x27;yellow&#x27;, &#x27;count(*)&#x27;: 10, &#x27;avg(price)&#x27;: 64.15, &#x27;max(rating)&#x27;: 3},</span>
<span class="hljs-comment">#  {&#x27;color&#x27;: &#x27;green&#x27;,  &#x27;count(*)&#x27;: 10, &#x27;avg(price)&#x27;: 58.28, &#x27;max(rating)&#x27;: 5},</span>
<span class="hljs-comment">#  {&#x27;color&#x27;: &#x27;blue&#x27;,   &#x27;count(*)&#x27;: 10, &#x27;avg(price)&#x27;: 50.20, &#x27;max(rating)&#x27;: 5}]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>將多個欄位傳遞給 `<code translate="no">group_by_fields</code> ` 以計算複合群組。以下範例依 `<code translate="no">(color, rating)</code> ` 進行分組，並計算每個群組的價格範圍：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>,
<span class="highlighted-comment-line">    group_by_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>],</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>, <span class="hljs-string">&quot;min(price)&quot;</span>, <span class="hljs-string">&quot;max(price)&quot;</span>],</span>
)

<span class="hljs-comment"># [{&#x27;color&#x27;: &#x27;red&#x27;,    &#x27;rating&#x27;: 5, &#x27;min(price)&#x27;: 34.51, &#x27;max(price)&#x27;: 70.90},</span>
<span class="hljs-comment">#  {&#x27;color&#x27;: &#x27;orange&#x27;, &#x27;rating&#x27;: 2, &#x27;min(price)&#x27;: 12.39, &#x27;max(price)&#x27;: 81.99},</span>
<span class="hljs-comment">#  {&#x27;color&#x27;: &#x27;yellow&#x27;, &#x27;rating&#x27;: 2, &#x27;min(price)&#x27;: 22.62, &#x27;max(price)&#x27;: 88.24},</span>
<span class="hljs-comment">#  {&#x27;color&#x27;: &#x27;green&#x27;,  &#x27;rating&#x27;: 1, &#x27;min(price)&#x27;: 18.35, &#x27;max(price)&#x27;: 59.53},</span>
<span class="hljs-comment">#  {&#x27;color&#x27;: &#x27;blue&#x27;,   &#x27;rating&#x27;: 4, &#x27;min(price)&#x27;: 21.23, &#x27;max(price)&#x27;: 82.45},</span>
<span class="hljs-comment">#  ...]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>您也可以將 `<code translate="no">group_by_fields</code> ` 與 `<code translate="no">limit</code> ` 結合使用，以限制返回的分組數量。當某個欄位具有高基數，而您僅需部分分組樣本時，此方法特別有用：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>,
    group_by_fields=[<span class="hljs-string">&quot;color&quot;</span>],
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;avg(price)&quot;</span>, <span class="hljs-string">&quot;count(*)&quot;</span>],
<span class="highlighted-wrapper-line">    limit=<span class="hljs-number">5</span>,</span>
)

<span class="hljs-comment"># [{&#x27;color&#x27;: &#x27;red&#x27;,    &#x27;avg(price)&#x27;: 65.22, &#x27;count(*)&#x27;: 10},</span>
<span class="hljs-comment">#  {&#x27;color&#x27;: &#x27;orange&#x27;, &#x27;avg(price)&#x27;: 48.67, &#x27;count(*)&#x27;: 10},</span>
<span class="hljs-comment">#  {&#x27;color&#x27;: &#x27;yellow&#x27;, &#x27;avg(price)&#x27;: 64.15, &#x27;count(*)&#x27;: 10},</span>
<span class="hljs-comment">#  {&#x27;color&#x27;: &#x27;green&#x27;,  &#x27;avg(price)&#x27;: 58.28, &#x27;count(*)&#x27;: 10},</span>
<span class="hljs-comment">#  {&#x27;color&#x27;: &#x27;blue&#x27;,   &#x27;avg(price)&#x27;: 50.20, &#x27;count(*)&#x27;: 10}]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-QueryIterator" class="common-anchor-header">使用 QueryIterator<button data-href="#Use-QueryIterator" class="anchor-icon" translate="no">
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
    </button></h2><p>當您需要透過分頁查詢，依據自訂篩選條件查找實體時，請建立<strong>一個 QueryIterator</strong>，並使用其<strong>next()</strong>方法遍歷所有實體，以找出符合篩選條件的實體。以下程式碼範例假設有三個名為<code translate="no">id</code> 、<code translate="no">vector</code> 及<code translate="no">color</code> 的欄位，並會回傳所有<code translate="no">color</code> 值以<code translate="no">red</code> 開頭的實體。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">iterator = client.query_iterator(
    <span class="hljs-string">&quot;my_collection&quot;</span>,
    batch_size=<span class="hljs-number">10</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>]
)

results = []

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    result = iterator.<span class="hljs-built_in">next</span>()
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> result:
        iterator.close()
        <span class="hljs-keyword">break</span>

    <span class="hljs-built_in">print</span>(result)
    results += result
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.orm.iterator.QueryIterator;
<span class="hljs-keyword">import</span> io.milvus.response.QueryResultsWrapper;
<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryIteratorReq;

<span class="hljs-type">QueryIteratorReq</span> <span class="hljs-variable">req</span> <span class="hljs-operator">=</span> QueryIteratorReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .expr(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)
        .batchSize(<span class="hljs-number">10L</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;color&quot;</span>))
        .build();
<span class="hljs-type">QueryIterator</span> <span class="hljs-variable">queryIterator</span> <span class="hljs-operator">=</span> client.queryIterator(req);

<span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    List&lt;QueryResultsWrapper.RowRecord&gt; res = queryIterator.next();
    <span class="hljs-keyword">if</span> (res.isEmpty()) {
        queryIterator.close();
        <span class="hljs-keyword">break</span>;
    }

    <span class="hljs-keyword">for</span> (QueryResultsWrapper.RowRecord record : res) {
        System.out.println(record);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// [color:red_7025, id:1]</span>
<span class="hljs-comment">// [color:red_4794, id:4]</span>
<span class="hljs-comment">// [color:red_9392, id:6]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> iterator = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">queryIterator</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
  <span class="hljs-attr">batchSize</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">expr</span>: <span class="hljs-string">&#x27;color like &quot;red%&quot;&#x27;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;color&#x27;</span>],
});

<span class="hljs-keyword">const</span> results = [];
<span class="hljs-keyword">for</span> <span class="hljs-title function_">await</span> (<span class="hljs-keyword">const</span> value <span class="hljs-keyword">of</span> iterator) {
  results.<span class="hljs-title function_">push</span>(...value);
  page += <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Not available</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Queries-in-Partitions" class="common-anchor-header">分區內的查詢<button data-href="#Queries-in-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>您也可以透過在 Get、Query 或 QueryIterator 請求中包含分區名稱，來對一個或多個分區執行查詢。以下程式碼範例假設集合中存在一個名為<strong>PartitionA</strong>的分區。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.get(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-wrapper-line">    partitionNames=[<span class="hljs-string">&quot;partitionA&quot;</span>],</span>
    ids=[<span class="hljs-number">10</span>, <span class="hljs-number">11</span>, <span class="hljs-number">12</span>],
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>]
)

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-wrapper-line">    partitionNames=[<span class="hljs-string">&quot;partitionA&quot;</span>],</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-comment"># Use QueryIterator</span>
iterator = client.query_iterator(
    <span class="hljs-string">&quot;my_collection&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>],
    batch_size=<span class="hljs-number">10</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>]
)

results = []
<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    result = iterator.<span class="hljs-built_in">next</span>()
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> result:
        iterator.close()
        <span class="hljs-keyword">break</span>

    <span class="hljs-built_in">print</span>(result)
    results += result

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">GetReq</span> <span class="hljs-variable">getReq</span> <span class="hljs-operator">=</span> GetReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
        .ids(Arrays.asList(<span class="hljs-number">10</span>, <span class="hljs-number">11</span>, <span class="hljs-number">12</span>))
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;color&quot;</span>))
        .build();

<span class="hljs-type">GetResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.get(getReq);

<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;color&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .build();

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);

<span class="hljs-type">QueryIteratorReq</span> <span class="hljs-variable">req</span> <span class="hljs-operator">=</span> QueryIteratorReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))
        .expr(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)
        .batchSize(<span class="hljs-number">50L</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;color&quot;</span>))
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
<span class="hljs-type">QueryIterator</span> <span class="hljs-variable">queryIterator</span> <span class="hljs-operator">=</span> client.queryIterator(req);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSet, err := client.Get(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithPartitions(<span class="hljs-string">&quot;partitionA&quot;</span>).
    WithIDs(column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">10</span>, <span class="hljs-number">11</span>, <span class="hljs-number">12</span>})).
    WithOutputFields(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(<span class="hljs-string">&quot;id: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;id&quot;</span>).FieldData().GetScalars())
fmt.Println(<span class="hljs-string">&quot;vector: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;vector&quot;</span>).FieldData().GetVectors())
fmt.Println(<span class="hljs-string">&quot;color: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;color&quot;</span>).FieldData().GetScalars())

resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithPartitions(<span class="hljs-string">&quot;partitionA&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(<span class="hljs-string">&quot;id: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;id&quot;</span>).FieldData().GetScalars())
fmt.Println(<span class="hljs-string">&quot;vector: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;vector&quot;</span>).FieldData().GetVectors())
fmt.Println(<span class="hljs-string">&quot;color: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;color&quot;</span>).FieldData().GetScalars())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Use get</span>
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">get</span>({
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-wrapper-line">    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>],</span>
    ids=[<span class="hljs-number">10</span>,<span class="hljs-number">11</span>,<span class="hljs-number">12</span>],
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>]
})

<span class="hljs-comment">// Use query</span>
res = client.<span class="hljs-title function_">query</span>({
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-wrapper-line">    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>],</span>
    filter=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    <span class="hljs-title function_">limit</span>(<span class="hljs-number">3</span>)
})

<span class="hljs-comment">// Use queryiterator</span>
<span class="hljs-keyword">const</span> iterator = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">queryIterator</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
  <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&#x27;partitionA&#x27;</span>],
  <span class="hljs-attr">batchSize</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">expr</span>: <span class="hljs-string">&#x27;color like &quot;red%&quot;&#x27;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;color&#x27;</span>],
});

<span class="hljs-keyword">const</span> results = [];
<span class="hljs-keyword">for</span> <span class="hljs-title function_">await</span> (<span class="hljs-keyword">const</span> value <span class="hljs-keyword">of</span> iterator) {
  results.<span class="hljs-title function_">push</span>(...value);
  page += <span class="hljs-number">1</span>;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-comment"># Use get</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/get&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;partitionNames&quot;: [&quot;partitionA&quot;],
    &quot;id&quot;: [10, 11, 12],
    &quot;outputFields&quot;: [&quot;vector&quot;, &quot;color&quot;]
}&#x27;</span>

<span class="hljs-comment"># Use query</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/get&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;partitionNames&quot;: [&quot;partitionA&quot;],
    &quot;filter&quot;: &quot;color like \&quot;red%\&quot;&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;vector&quot;, &quot;color&quot;],
    &quot;id&quot;: [0, 1, 2]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Random-Sampling-with-Query" class="common-anchor-header">使用 Query 進行隨機抽樣<button data-href="#Random-Sampling-with-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>若要從您的集合中擷取具代表性的資料子集，以進行資料探索或開發測試，請使用<code translate="no">RANDOM_SAMPLE(sampling_factor)</code> 表達式，其中<code translate="no">sampling_factor</code> 是一個介於 0 到 1 之間的浮點數，代表要抽樣的資料百分比。</p>
<div class="alert note">
<p>有關詳細用法、進階範例及最佳實務，請參閱《<a href="/docs/zh-hant/random-sampling.md">隨機抽樣</a>》。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample 1% of the entire collection</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;RANDOM_SAMPLE(0.01)&quot;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>]
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sampled <span class="hljs-subst">{<span class="hljs-built_in">len</span>(res)}</span> entities from collection&quot;</span>)

<span class="hljs-comment"># Combine with other filters - first filter, then sample</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, 
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot; AND RANDOM_SAMPLE(0.005)&quot;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Found <span class="hljs-subst">{<span class="hljs-built_in">len</span>(res)}</span> red items in sample&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.GetReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.GetResp
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;RANDOM_SAMPLE(0.01)&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
        .build();

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);
<span class="hljs-keyword">for</span> (QueryResp.QueryResult result : getResp.getQueryResults()) {
    System.out.println(result.getEntity());
}

queryReq = QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot; AND RANDOM_SAMPLE(0.005)&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
        .limit(<span class="hljs-number">10</span>)
        .build();

getResp = client.query(queryReq);
<span class="hljs-keyword">for</span> (QueryResp.QueryResult result : getResp.getQueryResults()) {
    System.out.println(result.getEntity());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;RANDOM_SAMPLE(0.01)&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}

resultSet, err = client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;color like \&quot;red%\&quot; AND RANDOM_SAMPLE(0.005)&quot;</span>).
    WithLimit(<span class="hljs-number">10</span>).
    WithOutputFields(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Temporarily-Set-a-Timezone-for-a-Query" class="common-anchor-header">為查詢暫時設定時區<button data-href="#Temporarily-Set-a-Timezone-for-a-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>若您的集合具有<code translate="no">TIMESTAMPTZ</code> 欄位，您可透過在查詢呼叫中設定<code translate="no">timezone</code> 參數，針對單一操作暫時覆寫資料庫或集合的預設時區。此設定將控制操作過程中<code translate="no">TIMESTAMPTZ</code> 值的顯示與比對方式。</p>
<p><code translate="no">timezone</code> 的值必須為有效的<a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">IANA 時區識別碼</a>（例如<strong>Asia/Shanghai</strong>、<strong>America/Chicago</strong> 或<strong>UTC</strong>）。有關如何使用<code translate="no">TIMESTAMPTZ</code> 欄位的詳細資訊，請參閱「<a href="/docs/zh-hant/timestamptz-field.md">TIMESTAMPTZ 欄位</a>」。</p>
<p>以下範例展示如何為查詢操作暫時設定時區：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query data and display the tsz field converted to &quot;America/Havana&quot;</span>
results = client.query(
    <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id &lt;= 10&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>, <span class="hljs-string">&quot;vec&quot;</span>],
    limit=<span class="hljs-number">2</span>,
<span class="highlighted-wrapper-line">    timezone=<span class="hljs-string">&quot;America/Havana&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
