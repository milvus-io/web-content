---
id: get-and-scalar-query.md
title: 쿼리
summary: >-
  쿼리, 가져오기, 쿼리이터레이터를 사용하여 Milvus에서 엔티티 검색, 메타데이터 필터링, 쿼리 결과 정렬, 스칼라 값 집계 등을 수행할
  수 있습니다.
---
<h1 id="Query" class="common-anchor-header">쿼리<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 ANN 검색 외에도 쿼리를 통한 메타데이터 필터링도 지원합니다. 이 페이지에서는 쿼리, 가져오기 및 쿼리이터레이터를 사용하여 엔티티를 검색하고, 메타데이터를 필터링하고, 쿼리 결과를 정렬하고, 스칼라 값을 집계하는 방법을 소개합니다.</p>
<div class="alert note">
<p>컬렉션을 만든 후 새 필드를 동적으로 추가하는 경우 이러한 필드를 포함하는 쿼리는 정의된 기본값을 반환하거나 명시적으로 값을 설정하지 않은 엔티티의 경우 NULL을 반환합니다. 자세한 내용은 <a href="/docs/ko/add-fields-to-an-existing-collection.md">기존 컬렉션에 필드 추가하기를</a> 참조하세요.</p>
</div>
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
    </button></h2><p>컬렉션에는 다양한 유형의 스칼라 필드를 저장할 수 있습니다. 하나 이상의 스칼라 필드를 기반으로 Milvus가 엔티티를 필터링하도록 할 수 있습니다. Milvus는 세 가지 유형의 쿼리를 제공합니다: 쿼리, 가져오기, 쿼리이터레이터. 아래 표는 이 세 가지 쿼리 유형을 비교한 것입니다.</p>
<table>
   <tr>
     <th></th>
     <th><p>Get</p></th>
     <th><p>Query</p></th>
     <th><p>쿼리이터레이터</p></th>
   </tr>
   <tr>
     <td><p>적용 가능한 시나리오</p></td>
     <td><p>지정된 기본 키를 보유한 엔티티를 찾으려는 경우.</p></td>
     <td><p>사용자 지정 필터링 조건을 충족하는 모든 또는 지정된 수의 엔터티를 찾으려면 다음과 같이 하세요.</p></td>
     <td><p>페이지 매김 쿼리에서 사용자 지정 필터링 조건을 충족하는 모든 엔터티를 찾으려면.</p></td>
   </tr>
   <tr>
     <td><p>필터링 방법</p></td>
     <td><p>기본 키 기준</p></td>
     <td><p>표현식을 필터링합니다.</p></td>
     <td><p>표현식을 필터링합니다.</p></td>
   </tr>
   <tr>
     <td><p>필수 매개 변수</p></td>
     <td><ul><li><p>컬렉션 이름</p></li><li><p>기본 키</p></li></ul></td>
     <td><ul><li><p>컬렉션 이름</p></li><li><p>필터링 표현식</p></li></ul></td>
     <td><ul><li><p>컬렉션 이름</p></li><li><p>필터링 표현식</p></li><li><p>쿼리당 반환할 엔티티 수</p></li></ul></td>
   </tr>
   <tr>
     <td><p>선택적 매개 변수</p></td>
     <td><ul><li><p>파티션 이름</p></li><li><p>출력 필드</p></li></ul></td>
     <td><ul><li><p>파티션 이름</p></li><li><p>반환할 엔티티 수</p></li><li><p>출력 필드</p></li></ul></td>
     <td><ul><li><p>파티션 이름</p></li><li><p>반환할 총 엔티티 수</p></li><li><p>출력 필드</p></li></ul></td>
   </tr>
   <tr>
     <td><p>반환 항목</p></td>
     <td><p>지정한 컬렉션 또는 파티션에서 지정한 기본 키를 보유한 엔터티를 반환합니다.</p></td>
     <td><p>지정한 컬렉션 또는 파티션에서 사용자 지정 필터링 조건을 충족하는 모든 또는 지정한 수의 엔터티를 반환합니다.</p></td>
     <td><p>페이지 매김 쿼리를 통해 지정된 컬렉션 또는 파티션에서 사용자 지정 필터링 조건을 충족하는 모든 엔터티를 반환합니다.</p></td>
   </tr>
</table>
<p>메타데이터 필터링에 대한 자세한 내용은 <a href="/docs/ko/basic-operators.md">부울 표현식 규칙을</a> 참조하세요.</p>
<h2 id="Use-Get" class="common-anchor-header">Get 사용<button data-href="#Use-Get" class="anchor-icon" translate="no">
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
    </button></h2><p>기본 키로 엔티티를 찾아야 하는 경우 <strong>Get</strong> 메서드를 사용할 수 있습니다. 다음 코드 예제에서는 컬렉션에 <code translate="no">id</code>, <code translate="no">vector</code>, <code translate="no">color</code> 이라는 이름의 필드 3개가 있다고 가정합니다.</p>
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
<p>다음과 같이 ID로 엔티티를 가져올 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;id&quot;: [0, 1, 2],
    &quot;outputFields&quot;: [&quot;vector&quot;, &quot;color&quot;]
}&#x27;</span>

<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;color&quot;:&quot;pink_8682&quot;,&quot;id&quot;:0,&quot;vector&quot;:[0.35803765,-0.6023496,0.18414013,-0.26286206,0.90294385]},{&quot;color&quot;:&quot;red_7025&quot;,&quot;id&quot;:1,&quot;vector&quot;:[0.19886813,0.060235605,0.6976963,0.26144746,0.8387295]},{&quot;color&quot;:&quot;orange_6781&quot;,&quot;id&quot;:2,&quot;vector&quot;:[0.43742132,-0.55975026,0.6457888,0.7894059,0.20785794]}]}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Query" class="common-anchor-header">쿼리 사용<button data-href="#Use-Query" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Basic-Query" class="common-anchor-header">기본 쿼리<button data-href="#Basic-Query" class="anchor-icon" translate="no">
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
    </button></h3><p>사용자 지정 필터링 조건으로 엔티티를 찾아야 하는 경우 <strong>쿼리</strong> 메서드를 사용합니다. 다음 코드 예제에서는 <code translate="no">id</code>, <code translate="no">vector</code>, <code translate="no">color</code> 라는 세 개의 필드가 있다고 가정하고 <code translate="no">red</code> 로 시작하는 <code translate="no">color</code> 값을 가진 지정된 수의 엔티티를 반환합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;filter&quot;: &quot;color like \&quot;red%\&quot;&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;vector&quot;, &quot;color&quot;]
}&#x27;</span>
<span class="hljs-comment">#{&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;color&quot;:&quot;red_7025&quot;,&quot;id&quot;:1,&quot;vector&quot;:[0.19886813,0.060235605,0.6976963,0.26144746,0.8387295]},{&quot;color&quot;:&quot;red_4794&quot;,&quot;id&quot;:4,&quot;vector&quot;:[0.44523495,-0.8757027,0.82207793,0.4640629,0.3033748]},{&quot;color&quot;:&quot;red_9392&quot;,&quot;id&quot;:6,&quot;vector&quot;:[0.8371978,-0.015764369,-0.31062937,-0.56266695,-0.8984948]}]}</span>
<button class="copy-code-btn"></button></code></pre>
<p><a id="Sort-Query-Results"></a></p>
<h3 id="Sort-Query-Results--Milvus-30x" class="common-anchor-header">쿼리 결과 정렬<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Sort-Query-Results--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>기본적으로 쿼리는 지정되지 않은 순서로 결과를 반환합니다. 하나 이상의 스칼라 필드를 기준으로 결과를 정렬하려면 <code translate="no">order_by</code> 매개변수를 사용합니다. <code translate="no">order_by</code> 를 사용하는 경우 주의하세요:</p>
<ul>
<li><p><code translate="no">order_by</code> 는 <code translate="no">limit</code> 와 함께 사용해야 합니다.</p></li>
<li><p>지원되는 필드 유형 <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code>. 벡터, <code translate="no">JSON</code>, 또는 <code translate="no">ARRAY</code> 필드를 기준으로 정렬하는 것은 지원되지 않습니다.</p></li>
<li><p>Null 가능 필드를 기준으로 정렬하는 경우 오름차순(NULLS LAST)의 경우 NULL 값이 끝에, 내림차순(NULLS FIRST)의 경우 처음에 배치됩니다.</p></li>
</ul>
<h4 id="Basic-Sort" class="common-anchor-header">기본 정렬</h4><p><code translate="no">&quot;field_name:direction&quot;</code> <code translate="no">order_by</code> 매개변수에 문자열 목록을 전달합니다. 여기서 은 (오름차순) 또는 (내림차순) 중 하나입니다.  및 은 대소문자를 구분합니다. <code translate="no">direction</code> <code translate="no">asc</code> <code translate="no">desc</code> <code translate="no">asc</code> <code translate="no">desc</code> </p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
<h4 id="Multi-field-Sort" class="common-anchor-header">다중 필드 정렬</h4><p>한 번에 여러 필드를 기준으로 정렬할 수 있습니다. 결과는 먼저 목록의 첫 번째 필드 순으로 정렬됩니다. 해당 필드에서 두 행의 값이 같으면 두 번째 필드에 따라 순서가 결정되는 식으로 정렬됩니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
<h4 id="Pagination-with-Sort" class="common-anchor-header">정렬을 사용한 페이지 매기기</h4><p><code translate="no">order_by</code> 와 <code translate="no">limit</code> 및 <code translate="no">offset</code> 를 함께 사용하여 정렬된 결과를 페이지 매김합니다. 예를 들어 여러 페이지에 걸쳐 가격별로 정렬된 제품 목록을 표시하려면 각 페이지에 중복이나 공백 없이 올바른 가격 순서로 다음 항목 배치를 표시합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
<h3 id="Aggregate-Query-Results--Milvus-30x" class="common-anchor-header">쿼리 결과 집계<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Aggregate-Query-Results--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>하나 이상의 스칼라 필드를 기준으로 쿼리 결과를 그룹화하고 그룹별로 집계를 계산할 수 있습니다. 지원되는 집계 연산자는 <code translate="no">count</code>, <code translate="no">min</code>, <code translate="no">max</code>, <code translate="no">sum</code>, <code translate="no">avg</code> 입니다.</p>
<p><code translate="no">group_by_fields</code> 을 사용하는 경우 주의하세요:</p>
<ul>
<li><p>지원되는 필드 유형 <code translate="no">group_by_fields</code>: <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code>, 및 <code translate="no">TIMESTAMPTZ</code> 입니다. <code translate="no">FLOAT</code> , <code translate="no">DOUBLE</code>, 벡터, <code translate="no">JSON</code>, 또는 <code translate="no">ARRAY</code> 필드로 그룹화하면 오류가 반환됩니다.</p></li>
<li><p><code translate="no">sum</code> 및 <code translate="no">avg</code> 은 숫자 필드만 지원합니다. <code translate="no">FLOAT</code> 및 <code translate="no">DOUBLE</code> 을 포함한 숫자 필드에 적용할 수 있지만 <code translate="no">VARCHAR</code> 필드에 적용하면 오류가 반환됩니다.</p></li>
</ul>
<p>집계를 사용하려면 <code translate="no">group_by_fields</code> 을 <code translate="no">query()</code> 으로 전달하고 집계 표현식 (<code translate="no">count(*)</code>, <code translate="no">count(&lt;field&gt;)</code>, <code translate="no">min(&lt;field&gt;)</code>, <code translate="no">max(&lt;field&gt;)</code>, <code translate="no">sum(&lt;field&gt;)</code>, <code translate="no">avg(&lt;field&gt;)</code>)을 <code translate="no">output_fields</code> 에 추가합니다.</p>
<p>다음 예제는 <code translate="no">color</code> 필드를 기준으로 엔티티를 그룹화하고 각 색상 그룹에 있는 엔티티의 수를 반환합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
<p>한 번의 호출로 여러 집계 표현식을 요청할 수 있습니다. 다음 예제는 <code translate="no">color</code> 으로 그룹화하고 각 그룹에 대한 엔티티 수, 평균 가격 및 최대 등급을 반환합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
<p>복합 그룹을 계산하려면 <code translate="no">group_by_fields</code> 에 둘 이상의 필드를 전달합니다. 다음 예제는 <code translate="no">(color, rating)</code> 으로 그룹화하고 각 그룹의 가격 범위를 계산합니다:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
<p><code translate="no">group_by_fields</code> 와 <code translate="no">limit</code> 을 결합하여 돌아오는 그룹 수를 제한할 수도 있습니다. 이 방법은 필드의 카디널리티가 높고 그룹 샘플만 필요한 경우에 유용합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
<h2 id="Use-QueryIterator" class="common-anchor-header">쿼리 이터레이터 사용<button data-href="#Use-QueryIterator" class="anchor-icon" translate="no">
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
    </button></h2><p>페이지 매김 쿼리를 통해 사용자 지정 필터링 조건으로 엔티티를 찾아야 하는 경우 <strong>QueryIterator를</strong> 만들고 그 <strong>다음()</strong> 메서드를 사용하여 모든 엔티티를 반복하여 필터링 조건을 충족하는 엔티티를 찾습니다. 다음 코드 예제에서는 <code translate="no">id</code>, <code translate="no">vector</code>, <code translate="no">color</code> 라는 세 개의 필드가 있고 <code translate="no">red</code> 로 시작하는 <code translate="no">color</code> 값을 가진 모든 엔티티를 반환한다고 가정합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
<h2 id="Queries-in-Partitions" class="common-anchor-header">파티션 내 쿼리<button data-href="#Queries-in-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>Get, Query 또는 QueryIterator 요청에 파티션 이름을 포함하여 하나 또는 여러 파티션 내에서 쿼리를 수행할 수도 있습니다. 다음 코드 예제에서는 컬렉션에 <strong>PartitionA라는</strong> 이름의 파티션이 있다고 가정합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;partitionNames&quot;: [&quot;partitionA&quot;],
    &quot;filter&quot;: &quot;color like \&quot;red%\&quot;&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;vector&quot;, &quot;color&quot;],
    &quot;id&quot;: [0, 1, 2]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Random-Sampling-with-Query" class="common-anchor-header">쿼리를 사용한 무작위 샘플링<button data-href="#Random-Sampling-with-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>데이터 탐색 또는 개발 테스트를 위해 컬렉션에서 데이터의 대표 하위 집합을 추출하려면 <code translate="no">RANDOM_SAMPLE(sampling_factor)</code> 표현식을 사용하세요. 여기서 <code translate="no">sampling_factor</code> 은 샘플할 데이터의 백분율을 나타내는 0에서 1 사이의 실수입니다.</p>
<div class="alert note">
<p>자세한 사용법, 고급 예제 및 모범 사례는 <a href="/docs/ko/random-sampling.md">무작위 샘플링을</a> 참조하세요.</p>
</div>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
<h2 id="Temporarily-Set-a-Timezone-for-a-Query" class="common-anchor-header">쿼리의 임시 시간대 설정하기<button data-href="#Temporarily-Set-a-Timezone-for-a-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션에 <code translate="no">TIMESTAMPTZ</code> 필드가 있는 경우 쿼리 호출에서 <code translate="no">timezone</code> 매개변수를 설정하여 단일 작업에 대해 데이터베이스 또는 컬렉션 기본 시간대를 일시적으로 재정의할 수 있습니다. 이렇게 하면 작업 중에 <code translate="no">TIMESTAMPTZ</code> 값이 표시되고 비교되는 방식이 제어됩니다.</p>
<p><code translate="no">timezone</code> 값은 유효한 <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">IANA 표준 시간대 식별자</a> (예: <strong>아시아/상하이</strong>, <strong>미국/시카고</strong> 또는 <strong>UTC</strong>)여야 합니다. <code translate="no">TIMESTAMPTZ</code> 필드 사용 방법에 대한 자세한 내용은 <a href="/docs/ko/timestamptz-field.md">TIMESTAMPTZ 필드를</a> 참조하세요.</p>
<p>아래 예는 쿼리 작업을 위해 임시로 시간대를 설정하는 방법을 보여줍니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
