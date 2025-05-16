---
id: single-vector-search.md
order: 1
summary: 이 문서에서는 단일 쿼리 벡터를 사용하여 Milvus 컬렉션에서 벡터를 검색하는 방법에 대해 설명합니다.
title: 단일 벡터 검색
---
<h1 id="Single-Vector-Search" class="common-anchor-header">단일 벡터 검색<button data-href="#Single-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>데이터를 삽입한 다음 단계는 Milvus에서 컬렉션에 대한 유사도 검색을 수행하는 것입니다.</p>
<p>Milvus에서는 컬렉션의 벡터 필드 수에 따라 두 가지 유형의 검색을 수행할 수 있습니다:</p>
<ul>
<li><strong>단일 벡터 검색</strong>: 컬렉션에 벡터 필드가 하나만 있는 경우, 가장 유사한 엔티티를 찾기 위해 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a> 메서드를 사용하여 가장 유사한 엔티티를 찾습니다. 이 방법은 쿼리 벡터를 컬렉션의 기존 벡터와 비교하여 가장 가까운 일치 항목의 ID와 그 사이의 거리를 반환합니다. 선택적으로 결과의 벡터 값과 메타데이터도 반환할 수 있습니다.</li>
<li><strong>하이브리드 검색</strong>: 두 개 이상의 벡터 필드가 있는 컬렉션의 경우에는 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a> 메서드를 사용합니다. 이 방법은 여러 개의 근사 이웃(ANN) 검색 요청을 수행하고 그 결과를 결합하여 순위를 다시 매긴 후 가장 관련성이 높은 일치 항목을 반환합니다.</li>
</ul>
<p>이 가이드는 Milvus에서 단일 벡터 검색을 수행하는 방법에 중점을 두고 있습니다. 하이브리드 검색에 대한 자세한 내용은 <a href="https://milvus.io/docs/multi-vector-search.md">하이브리드 검색을</a> 참조하세요.</p>
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
    </button></h2><p>다양한 요구 사항을 충족하기 위한 다양한 검색 유형이 있습니다:</p>
<ul>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Basic-search">기본 검색</a>: 단일 벡터 검색, 일괄 벡터 검색, 파티션 검색, 지정된 출력 필드를 사용한 검색이 포함됩니다.</p></li>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">필터링된 검색</a>: 스칼라 필드를 기반으로 필터링 기준을 적용하여 검색 결과를 구체화합니다.</p></li>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Range-search">범위 검색</a>: 쿼리 벡터로부터 특정 거리 범위 내의 벡터를 찾습니다.</p></li>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">그룹화 검색</a>: 검색 결과의 다양성을 보장하기 위해 특정 필드를 기준으로 검색 결과를 그룹화합니다.</p></li>
</ul>
<h2 id="Preparations" class="common-anchor-header">준비 사항<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>아래 코드 스니펫은 기존 코드를 재구성하여 Milvus에 연결하고 컬렉션을 빠르게 설정합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> random

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    dimension=<span class="hljs-number">5</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>
)

<span class="hljs-comment"># 3. Insert randomly generated vectors </span>
colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
data = []

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    current_color = random.choice(colors)
    data.append({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;<span class="hljs-subst">{current_color}</span>_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">1000</span>, <span class="hljs-number">9999</span>))}</span>&quot;</span>
    })

res = client.insert(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=data
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;insert_count&quot;: 1000,</span>
<span class="hljs-comment">#     &quot;ids&quot;: [</span>
<span class="hljs-comment">#         0,</span>
<span class="hljs-comment">#         1,</span>
<span class="hljs-comment">#         2,</span>
<span class="hljs-comment">#         3,</span>
<span class="hljs-comment">#         4,</span>
<span class="hljs-comment">#         5,</span>
<span class="hljs-comment">#         6,</span>
<span class="hljs-comment">#         7,</span>
<span class="hljs-comment">#         8,</span>
<span class="hljs-comment">#         9,</span>
<span class="hljs-comment">#         &quot;(990 more items hidden)&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>

<span class="hljs-comment"># 6.1 Create partitions </span>
client.create_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;red&quot;</span>
)

client.create_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;blue&quot;</span>
)

<span class="hljs-comment"># 6.1 Insert data into partitions</span>
red_data = [ {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;red_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">1000</span>, <span class="hljs-number">9999</span>))}</span>&quot;</span> } <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">500</span>) ]
blue_data = [ {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;blue_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">1000</span>, <span class="hljs-number">9999</span>))}</span>&quot;</span> } <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">500</span>) ]

res = client.insert(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=red_data,
    partition_name=<span class="hljs-string">&quot;red&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;insert_count&quot;: 500,</span>
<span class="hljs-comment">#     &quot;ids&quot;: [</span>
<span class="hljs-comment">#         0,</span>
<span class="hljs-comment">#         1,</span>
<span class="hljs-comment">#         2,</span>
<span class="hljs-comment">#         3,</span>
<span class="hljs-comment">#         4,</span>
<span class="hljs-comment">#         5,</span>
<span class="hljs-comment">#         6,</span>
<span class="hljs-comment">#         7,</span>
<span class="hljs-comment">#         8,</span>
<span class="hljs-comment">#         9,</span>
<span class="hljs-comment">#         &quot;(490 more items hidden)&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>

res = client.insert(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=blue_data,
    partition_name=<span class="hljs-string">&quot;blue&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;insert_count&quot;: 500,</span>
<span class="hljs-comment">#     &quot;ids&quot;: [</span>
<span class="hljs-comment">#         0,</span>
<span class="hljs-comment">#         1,</span>
<span class="hljs-comment">#         2,</span>
<span class="hljs-comment">#         3,</span>
<span class="hljs-comment">#         4,</span>
<span class="hljs-comment">#         5,</span>
<span class="hljs-comment">#         6,</span>
<span class="hljs-comment">#         7,</span>
<span class="hljs-comment">#         8,</span>
<span class="hljs-comment">#         9,</span>
<span class="hljs-comment">#         &quot;(490 more items hidden)&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.CreatePartitionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);  

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">quickSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .dimension(<span class="hljs-number">5</span>)
        .metricType(<span class="hljs-string">&quot;IP&quot;</span>)
        .build();

client.createCollection(quickSetupReq);

<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">loadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .build();

<span class="hljs-type">boolean</span> <span class="hljs-variable">state</span> <span class="hljs-operator">=</span> client.getLoadState(loadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

<span class="hljs-comment">// 3. Insert randomly generated vectors into the collection</span>
List&lt;String&gt; colors = Arrays.asList(<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>);
List&lt;JsonObject&gt; data = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">1000</span>; i++) {
    <span class="hljs-type">Random</span> <span class="hljs-variable">rand</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
    <span class="hljs-type">String</span> <span class="hljs-variable">current_color</span> <span class="hljs-operator">=</span> colors.get(rand.nextInt(colors.size()-<span class="hljs-number">1</span>));
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, (<span class="hljs-type">long</span>) i);
    row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat())));
    row.addProperty(<span class="hljs-string">&quot;color_tag&quot;</span>, current_color + <span class="hljs-string">&quot;_&quot;</span> + String.valueOf(rand.nextInt(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>));
    data.add(row);
}

<span class="hljs-type">InsertReq</span> <span class="hljs-variable">insertReq</span> <span class="hljs-operator">=</span> InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(insertReq);

System.out.println(insertResp.getInsertCnt());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 1000</span>

<span class="hljs-comment">// 6.1. Create a partition</span>
<span class="hljs-type">CreatePartitionReq</span> <span class="hljs-variable">partitionReq</span> <span class="hljs-operator">=</span> CreatePartitionReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .partitionName(<span class="hljs-string">&quot;red&quot;</span>)
        .build();

client.createPartition(partitionReq);

partitionReq = CreatePartitionReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .partitionName(<span class="hljs-string">&quot;blue&quot;</span>)
        .build();

client.createPartition(partitionReq);

<span class="hljs-comment">// 6.2 Insert data into the partition</span>
data = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> i=<span class="hljs-number">1000</span>; i&lt;<span class="hljs-number">1500</span>; i++) {
    <span class="hljs-type">Random</span> <span class="hljs-variable">rand</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
    <span class="hljs-type">String</span> <span class="hljs-variable">current_color</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;red&quot;</span>;
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, (<span class="hljs-type">long</span>) i);
    row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat())));
    row.addProperty(<span class="hljs-string">&quot;color&quot;</span>, current_color);
    row.addProperty(<span class="hljs-string">&quot;color_tag&quot;</span>, current_color + <span class="hljs-string">&quot;_&quot;</span> + String.valueOf(rand.nextInt(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>));
    data.add(row);
}

insertReq = InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(data)
        .partitionName(<span class="hljs-string">&quot;red&quot;</span>)
        .build();

insertResp = client.insert(insertReq);

System.out.println(insertResp.getInsertCnt());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 500</span>

data = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> i=<span class="hljs-number">1500</span>; i&lt;<span class="hljs-number">2000</span>; i++) {
    <span class="hljs-type">Random</span> <span class="hljs-variable">rand</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
    <span class="hljs-type">String</span> <span class="hljs-variable">current_color</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;blue&quot;</span>;
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, (<span class="hljs-type">long</span>) i);
    row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat())));
    row.addProperty(<span class="hljs-string">&quot;color&quot;</span>, current_color);
    row.addProperty(<span class="hljs-string">&quot;color_tag&quot;</span>, current_color + <span class="hljs-string">&quot;_&quot;</span> + String.valueOf(rand.nextInt(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>));
    data.add(row);
}

insertReq = InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(data)
        .partitionName(<span class="hljs-string">&quot;blue&quot;</span>)
        .build();

insertResp = client.insert(insertReq);

System.out.println(insertResp.getInsertCnt());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 500</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, sleep } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address});

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>
});  

<span class="hljs-comment">// 3. Insert randomly generated vectors</span>
<span class="hljs-keyword">const</span> colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
data = []

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000</span>; i++) {
    current_color = colors[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * colors.<span class="hljs-property">length</span>)]
    data.<span class="hljs-title function_">push</span>({
        <span class="hljs-attr">id</span>: i,
        <span class="hljs-attr">vector</span>: [<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()],
        <span class="hljs-attr">color</span>: current_color,
        <span class="hljs-attr">color_tag</span>: <span class="hljs-string">`<span class="hljs-subst">${current_color}</span>_<span class="hljs-subst">${<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>}</span>`</span>
    })
}

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: data
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">insert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 1000</span>
<span class="hljs-comment">// </span>

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;red&quot;</span>
})

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;blue&quot;</span>
})

<span class="hljs-comment">// 6.1 Insert data into partitions</span>
<span class="hljs-keyword">var</span> red_data = []
<span class="hljs-keyword">var</span> blue_data = []

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1000</span>; i &lt; <span class="hljs-number">1500</span>; i++) {
    red_data.<span class="hljs-title function_">push</span>({
        <span class="hljs-attr">id</span>: i,
        <span class="hljs-attr">vector</span>: [<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()],
        <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;red&quot;</span>,
        <span class="hljs-attr">color_tag</span>: <span class="hljs-string">`red_<span class="hljs-subst">${<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>}</span>`</span>
    })
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1500</span>; i &lt; <span class="hljs-number">2000</span>; i++) {
    blue_data.<span class="hljs-title function_">push</span>({
        <span class="hljs-attr">id</span>: i,
        <span class="hljs-attr">vector</span>: [<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()],
        <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;blue&quot;</span>,
        <span class="hljs-attr">color_tag</span>: <span class="hljs-string">`blue_<span class="hljs-subst">${<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>}</span>`</span>
    })
}

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: red_data,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;red&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">insert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 500</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: blue_data,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;blue&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">insert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 500</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Basic-search" class="common-anchor-header">기본 검색<button data-href="#Basic-search" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">search</code> 요청을 보낼 때 쿼리 임베딩을 나타내는 하나 이상의 벡터 값과 반환할 결과의 수를 나타내는 <code translate="no">limit</code> 값을 제공할 수 있습니다.</p>
<p>데이터와 쿼리 벡터에 따라 <code translate="no">limit</code> 결과보다 적은 수의 결과를 얻을 수 있습니다. 이는 <code translate="no">limit</code> 이 쿼리에 대해 가능한 일치하는 벡터의 수보다 클 때 발생합니다.</p>
<h3 id="Single-vector-search" class="common-anchor-header">단일 벡터 검색</h3><p>단일 벡터 검색은 주어진 쿼리 벡터와 가장 유사한 벡터를 찾기 위해 고안된 Milvus의 가장 간단한 형태의 <code translate="no">search</code> 연산입니다.</p>
<p>단일 벡터 검색을 수행하려면 대상 컬렉션 이름, 쿼리 벡터 및 원하는 결과 수를 지정합니다(<code translate="no">limit</code>). 이 작업은 쿼리 벡터와 가장 유사한 벡터, 해당 벡터의 ID 및 거리로 구성된 결과 집합을 반환합니다.</p>
<p>다음은 쿼리 벡터와 가장 유사한 상위 5개 엔티티를 검색하는 예제입니다:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Single vector search</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment"># Replace with the actual name of your collection</span>
    <span class="hljs-comment"># Replace with your query vector</span>
    data=[[<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]],
    limit=<span class="hljs-number">5</span>, <span class="hljs-comment"># Max. number of search results to return</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}} <span class="hljs-comment"># Search parameters</span>
)

<span class="hljs-comment"># Convert the output to a formatted JSON string</span>
result = json.dumps(res, indent=<span class="hljs-number">4</span>)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 4. Single vector search</span>
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">Float</span>&gt;&gt; query_vectors = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>3580376395471989f, -<span class="hljs-number">0.</span>6023495712049978f, <span class="hljs-number">0.</span>18414012509913835f, -<span class="hljs-number">0.</span>26286205330961354f, <span class="hljs-number">0.</span>9029438446296592f));

<span class="hljs-title class_">SearchReq</span> searchReq = <span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(query_vectors)
    .<span class="hljs-title function_">topK</span>(<span class="hljs-number">3</span>) <span class="hljs-comment">// The number of results to return</span>
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">SearchResp</span> searchResp = client.<span class="hljs-title function_">search</span>(searchReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(searchResp));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Single vector search</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
  <thead>
    <tr>
      <th>매개변수</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>기존 컬렉션의 이름입니다.</td>
    </tr>
    <tr>
      <td><code translate="no">data</code></td>
      <td>벡터 임베딩의 목록.<br/>Milvus는 지정된 벡터 임베딩과 가장 유사한 벡터 임베딩을 검색합니다.</td>
    </tr>
    <tr>
      <td><code translate="no">limit</code></td>
      <td>반환할 총 엔티티 수.<br/>이 파라미터를 <strong>파라미터의</strong> <strong>오프셋과</strong> 함께 사용하여 페이지 매김을 활성화할 수 있습니다.<br/>이 값과 <strong>파라미터의</strong> <strong>오프셋의</strong> 합은 16,384보다 작아야 합니다.</td>
    </tr>
    <tr>
      <td><code translate="no">search_params</code></td>
      <td>이 작업과 관련된 매개변수 설정<br/><ul><li><code translate="no">metric_type</code>: 이 작업에 적용되는 메트릭 유형입니다. 위에서 지정한 벡터 필드를 인덱싱할 때 사용한 것과 동일해야 합니다. 사용 가능한 값은 <strong>L2</strong>, <strong>IP</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING입니다</strong>.</li><li><code translate="no">params</code>: 추가 매개변수. 자세한 내용은 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md">search()를</a> 참조하세요.</li></ul></td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>파라미터</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collectionName</code></td>
      <td>기존 컬렉션의 이름입니다.</td>
    </tr>
    <tr>
      <td><code translate="no">data</code></td>
      <td>벡터 임베딩의 목록.<br/>Milvus는 지정된 벡터 임베딩과 가장 유사한 벡터 임베딩을 검색합니다.</td>
    </tr>
    <tr>
      <td><code translate="no">topK</code></td>
      <td>검색 결과에서 반환할 레코드 수입니다. 이 매개변수는 <strong>limit</strong> 매개변수와 동일한 구문을 사용하므로 둘 중 하나만 설정해야 합니다.<br/>이 매개변수를 <strong>offset</strong> in <strong>param과</strong> 함께 사용하여 페이지 매김을 활성화할 수 있습니다.<br/>이 값과 <strong>offset</strong> in <strong>param의</strong> 합은 16,384보다 작아야 합니다.</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>파라미터</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>기존 컬렉션의 이름입니다.</td>
    </tr>
    <tr>
      <td><code translate="no">data</code></td>
      <td>벡터 임베딩 목록.<br/>Milvus는 지정된 벡터 임베딩과 가장 유사한 벡터 임베딩을 검색합니다.</td>
    </tr>
    <tr>
      <td><code translate="no">limit</code></td>
      <td>반환할 총 엔티티 수.<br/>이 매개변수를 <strong>파라미터의</strong> <strong>오프셋과</strong> 함께 사용하여 페이지 매김을 활성화할 수 있습니다.<br/>이 값과 <strong>파라미터의</strong> <strong>오프셋의</strong> 합은 16,384보다 작아야 합니다.</td>
    </tr>
  </tbody>
</table>
<p>출력은 다음과 유사합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">[
    [
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">1.4093276262283325</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.9902134537696838</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.8519943356513977</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.7972343564033508</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.5928734540939331</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        }
    ]
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">{<span class="hljs-string">&quot;searchResults&quot;</span>: [[
    {
        <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.263043</span>,
        <span class="hljs-string">&quot;fields&quot;</span>: {
            <span class="hljs-string">&quot;vector&quot;</span>: [
                <span class="hljs-number">0.9533119</span>,
                <span class="hljs-number">0.02538395</span>,
                <span class="hljs-number">0.76714665</span>,
                <span class="hljs-number">0.35481733</span>,
                <span class="hljs-number">0.9845762</span>
            ],
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">740</span>
        }
    },
    {
        <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.2377806</span>,
        <span class="hljs-string">&quot;fields&quot;</span>: {
            <span class="hljs-string">&quot;vector&quot;</span>: [
                <span class="hljs-number">0.7411156</span>,
                <span class="hljs-number">0.08687937</span>,
                <span class="hljs-number">0.8254139</span>,
                <span class="hljs-number">0.08370924</span>,
                <span class="hljs-number">0.99095553</span>
            ],
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">640</span>
        }
    },
    {
        <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1869997</span>,
        <span class="hljs-string">&quot;fields&quot;</span>: {
            <span class="hljs-string">&quot;vector&quot;</span>: [
                <span class="hljs-number">0.87928146</span>,
                <span class="hljs-number">0.05324632</span>,
                <span class="hljs-number">0.6312755</span>,
                <span class="hljs-number">0.28005534</span>,
                <span class="hljs-number">0.9542448</span>
            ],
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">455</span>
        }
    }
]]}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">[
  { score: <span class="hljs-number">1.7463608980178833</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;854&#x27;</span> },
  { score: <span class="hljs-number">1.744946002960205</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;425&#x27;</span> },
  { score: <span class="hljs-number">1.7258622646331787</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;718&#x27;</span> }
]
<button class="copy-code-btn"></button></code></pre>
<p>출력에는 쿼리 벡터에서 가장 가까운 상위 5개 이웃이 고유 ID와 계산된 거리를 포함하여 표시됩니다.</p>
<h3 id="Bulk-vector-search" class="common-anchor-header">대량 벡터 검색</h3><p>대량 벡터 검색은 단일 요청으로 여러 쿼리 벡터를 검색할 수 있도록 하여 <a href="https://milvus.io/docs/single-vector-search.md#Single-Vector-Search">단일 벡터 검색</a> 개념을 확장한 것입니다. 이 유형의 검색은 쿼리 벡터 집합에 대해 유사한 벡터를 찾아야 하는 시나리오에 이상적이며, 필요한 시간과 계산 리소스를 크게 줄여줍니다.</p>
<p>대량 벡터 검색에서는 <code translate="no">data</code> 필드에 여러 개의 쿼리 벡터를 포함할 수 있습니다. 시스템은 이러한 벡터를 병렬로 처리하여 각 쿼리 벡터에 대해 별도의 결과 집합을 반환하며, 각 집합에는 컬렉션 내에서 발견된 가장 가까운 일치 항목이 포함되어 있습니다.</p>
<p>다음은 두 개의 쿼리 벡터에서 가장 유사한 엔티티의 서로 다른 두 집합을 검색하는 예제입니다:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Bulk-vector search</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment"># Replace with the actual name of your collection</span>
    data=[
        [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>],
        [<span class="hljs-number">0.3172005263489739</span>, <span class="hljs-number">0.9719044792798428</span>, -<span class="hljs-number">0.36981146090600725</span>, -<span class="hljs-number">0.4860894583077995</span>, <span class="hljs-number">0.95791889146345</span>]
    ], <span class="hljs-comment"># Replace with your query vectors</span>
    limit=<span class="hljs-number">2</span>, <span class="hljs-comment"># Max. number of search results to return</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}} <span class="hljs-comment"># Search parameters</span>
)

result = json.dumps(res, indent=<span class="hljs-number">4</span>)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 5. Batch vector search</span>
query_vectors = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(
    <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>3580376395471989f, -<span class="hljs-number">0.</span>6023495712049978f, <span class="hljs-number">0.</span>18414012509913835f, -<span class="hljs-number">0.</span>26286205330961354f, <span class="hljs-number">0.</span>9029438446296592f),
    <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>19886812562848388f, <span class="hljs-number">0.</span>06023560599112088f, <span class="hljs-number">0.</span>6976963061752597f, <span class="hljs-number">0.</span>2614474506242501f, <span class="hljs-number">0.</span>838729485096104f)
);

searchReq = <span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(query_vectors)
    .<span class="hljs-title function_">topK</span>(<span class="hljs-number">2</span>)
    .<span class="hljs-title function_">build</span>();

searchResp = client.<span class="hljs-title function_">search</span>(searchReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(searchResp));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. Batch vector search</span>
<span class="hljs-keyword">var</span> query_vectors = [
    [<span class="hljs-meta">0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592</span>],
    [<span class="hljs-meta">0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104</span>]
]

res = <span class="hljs-keyword">await</span> client.search({
    collection_name: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    data: query_vectors,
    limit: <span class="hljs-number">2</span>,
})

console.log(res.results)
<button class="copy-code-btn"></button></code></pre>
<p>출력은 다음과 비슷합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">[
    [
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">1.3017789125442505</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">1.2419954538345337</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        }
    ], <span class="hljs-comment"># Result set 1</span>
    [
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">2.3358664512634277</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.5642921924591064</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        }
    ] <span class="hljs-comment"># Result set 2</span>
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Two sets of vectors are returned as expected</span>

{<span class="hljs-string">&quot;searchResults&quot;</span>: [
    [
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.263043</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.9533119</span>,
                    <span class="hljs-number">0.02538395</span>,
                    <span class="hljs-number">0.76714665</span>,
                    <span class="hljs-number">0.35481733</span>,
                    <span class="hljs-number">0.9845762</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">740</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.2377806</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.7411156</span>,
                    <span class="hljs-number">0.08687937</span>,
                    <span class="hljs-number">0.8254139</span>,
                    <span class="hljs-number">0.08370924</span>,
                    <span class="hljs-number">0.99095553</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">640</span>
            }
        }
    ],
    [
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.8654699</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.4671427</span>,
                    <span class="hljs-number">0.8378432</span>,
                    <span class="hljs-number">0.98844475</span>,
                    <span class="hljs-number">0.82763994</span>,
                    <span class="hljs-number">0.9729997</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">638</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.8581753</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.735541</span>,
                    <span class="hljs-number">0.60140246</span>,
                    <span class="hljs-number">0.86730254</span>,
                    <span class="hljs-number">0.93152493</span>,
                    <span class="hljs-number">0.98603314</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">855</span>
            }
        }
    ]
]}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">[
  [
    { score: <span class="hljs-number">2.3590476512908936</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;854&#x27;</span> },
    { score: <span class="hljs-number">2.2896690368652344</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;59&#x27;</span> }
  [
    { score: <span class="hljs-number">2.664059638977051</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;59&#x27;</span> },
    { score: <span class="hljs-number">2.59483003616333</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;854&#x27;</span> }
  ]
]
<button class="copy-code-btn"></button></code></pre>
<p>결과에는 각 쿼리 벡터에 대해 하나씩 두 개의 가장 가까운 이웃 세트가 포함되어 있어 여러 쿼리 벡터를 한 번에 처리하는 대량 벡터 검색의 효율성을 보여줍니다.</p>
<h3 id="Partition-search" class="common-anchor-header">파티션 검색</h3><p>파티션 검색은 컬렉션의 특정 하위 집합이나 파티션으로 검색 범위를 좁혀줍니다. 이 기능은 데이터가 논리적 또는 범주별 구분으로 세분화된 체계적인 데이터 세트에 특히 유용하며, 검색할 데이터의 양을 줄여 검색 작업을 더 빠르게 수행할 수 있게 해줍니다.</p>
<p>파티션 검색을 수행하려면 검색 요청의 <code translate="no">partition_names</code> 에 대상 파티션의 이름을 포함하기만 하면 됩니다. 이렇게 하면 <code translate="no">search</code> 작업이 지정된 파티션 내의 벡터만 고려하도록 지정됩니다.</p>
<p>다음은 <code translate="no">red</code> 에서 엔티티를 검색하는 예제입니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 6.2 Search within a partition</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">5</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;level&quot;</span>: <span class="hljs-number">1</span>}},
    partition_names=[<span class="hljs-string">&quot;red&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 6.3 Search within partitions</span>
query_vectors = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>3580376395471989f, -<span class="hljs-number">0.</span>6023495712049978f, <span class="hljs-number">0.</span>18414012509913835f, -<span class="hljs-number">0.</span>26286205330961354f, <span class="hljs-number">0.</span>9029438446296592f));

searchReq = <span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(query_vectors)
    .<span class="hljs-title function_">partitionNames</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;red&quot;</span>))
    .<span class="hljs-title function_">topK</span>(<span class="hljs-number">5</span>)
    .<span class="hljs-title function_">build</span>();

searchResp = client.<span class="hljs-title function_">search</span>(searchReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(searchResp));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 6.2 Search within partitions</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;red&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)
<button class="copy-code-btn"></button></code></pre>
<p>출력은 다음과 비슷합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">[
    [
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">16</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.9200337529182434</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">14</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.4505271911621094</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">15</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.19924677908420563</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">17</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.0075093843042850494</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">13</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: -<span class="hljs-number">0.14609718322753906</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        }
    ]
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">{<span class="hljs-string">&quot;searchResults&quot;</span>: [
    [
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1677284</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.9986977</span>,
                    <span class="hljs-number">0.17964739</span>,
                    <span class="hljs-number">0.49086612</span>,
                    <span class="hljs-number">0.23155272</span>,
                    <span class="hljs-number">0.98438674</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1435</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1476475</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.6952647</span>,
                    <span class="hljs-number">0.13417172</span>,
                    <span class="hljs-number">0.91045254</span>,
                    <span class="hljs-number">0.119336545</span>,
                    <span class="hljs-number">0.9338931</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1291</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.0969629</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.3363194</span>,
                    <span class="hljs-number">0.028906643</span>,
                    <span class="hljs-number">0.6675426</span>,
                    <span class="hljs-number">0.030419827</span>,
                    <span class="hljs-number">0.9735209</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1168</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.0741848</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.9980543</span>,
                    <span class="hljs-number">0.36063594</span>,
                    <span class="hljs-number">0.66427994</span>,
                    <span class="hljs-number">0.17359233</span>,
                    <span class="hljs-number">0.94954175</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1164</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.0584627</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.7187005</span>,
                    <span class="hljs-number">0.12674773</span>,
                    <span class="hljs-number">0.987718</span>,
                    <span class="hljs-number">0.3110777</span>,
                    <span class="hljs-number">0.86093885</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1085</span>
            }
        }
    ],
    [
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.8030131</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.59726167</span>,
                    <span class="hljs-number">0.7054632</span>,
                    <span class="hljs-number">0.9573117</span>,
                    <span class="hljs-number">0.94529945</span>,
                    <span class="hljs-number">0.8664103</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1203</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.7728865</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.6672442</span>,
                    <span class="hljs-number">0.60448086</span>,
                    <span class="hljs-number">0.9325822</span>,
                    <span class="hljs-number">0.80272985</span>,
                    <span class="hljs-number">0.8861626</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1448</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.7536311</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.59663296</span>,
                    <span class="hljs-number">0.77831805</span>,
                    <span class="hljs-number">0.8578314</span>,
                    <span class="hljs-number">0.88818026</span>,
                    <span class="hljs-number">0.9030075</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1010</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.7520742</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.854198</span>,
                    <span class="hljs-number">0.72294194</span>,
                    <span class="hljs-number">0.9245805</span>,
                    <span class="hljs-number">0.86126596</span>,
                    <span class="hljs-number">0.7969224</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1219</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.7452049</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.96419</span>,
                    <span class="hljs-number">0.943535</span>,
                    <span class="hljs-number">0.87611496</span>,
                    <span class="hljs-number">0.8268136</span>,
                    <span class="hljs-number">0.79786557</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1149</span>
            }
        }
    ]
]}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">[
  { score: <span class="hljs-number">3.0258803367614746</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1201&#x27;</span> },
  { score: <span class="hljs-number">3.004319190979004</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1458&#x27;</span> },
  { score: <span class="hljs-number">2.880324363708496</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1187&#x27;</span> },
  { score: <span class="hljs-number">2.8246407508850098</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1347&#x27;</span> },
  { score: <span class="hljs-number">2.797295093536377</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1406&#x27;</span> }
]
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 <code translate="no">blue</code> 에서 엔티티를 검색합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=[query_vector],
    <span class="hljs-built_in">limit</span>=5,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;level&quot;</span>: 1}},
    partition_names=[<span class="hljs-string">&quot;blue&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">searchReq = <span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(query_vectors)
    .<span class="hljs-title function_">partitionNames</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;blue&quot;</span>))
    .<span class="hljs-title function_">topK</span>(<span class="hljs-number">5</span>)
    .<span class="hljs-title function_">build</span>();

searchResp = client.<span class="hljs-title function_">search</span>(searchReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(searchResp));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;blue&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)
<button class="copy-code-btn"></button></code></pre>
<p>출력은 다음과 비슷합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">[
    [
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">20</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">2.363696813583374</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">26</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">1.0665391683578491</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">23</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">1.066049575805664</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">29</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.8353596925735474</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">28</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.7484277486801147</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {}
        }
    ]
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">{<span class="hljs-string">&quot;searchResults&quot;</span>: [
    [
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1628494</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.7442872</span>,
                    <span class="hljs-number">0.046407282</span>,
                    <span class="hljs-number">0.71031404</span>,
                    <span class="hljs-number">0.3544345</span>,
                    <span class="hljs-number">0.9819991</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1992</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1470042</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.5505825</span>,
                    <span class="hljs-number">0.04367262</span>,
                    <span class="hljs-number">0.9985836</span>,
                    <span class="hljs-number">0.18922359</span>,
                    <span class="hljs-number">0.93255126</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1977</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1450152</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.89994013</span>,
                    <span class="hljs-number">0.052991092</span>,
                    <span class="hljs-number">0.8645576</span>,
                    <span class="hljs-number">0.6406729</span>,
                    <span class="hljs-number">0.95679337</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1573</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1439825</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.9253267</span>,
                    <span class="hljs-number">0.15890503</span>,
                    <span class="hljs-number">0.7999555</span>,
                    <span class="hljs-number">0.19126713</span>,
                    <span class="hljs-number">0.898583</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1552</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1029172</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.95661926</span>,
                    <span class="hljs-number">0.18777144</span>,
                    <span class="hljs-number">0.38115507</span>,
                    <span class="hljs-number">0.14323527</span>,
                    <span class="hljs-number">0.93137646</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1823</span>
            }
        }
    ],
    [
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.8005109</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.5953582</span>,
                    <span class="hljs-number">0.7794224</span>,
                    <span class="hljs-number">0.9388869</span>,
                    <span class="hljs-number">0.79825854</span>,
                    <span class="hljs-number">0.9197286</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1888</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.7714822</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.56805456</span>,
                    <span class="hljs-number">0.89422905</span>,
                    <span class="hljs-number">0.88187534</span>,
                    <span class="hljs-number">0.914824</span>,
                    <span class="hljs-number">0.8944365</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1648</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.7561421</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.83421993</span>,
                    <span class="hljs-number">0.39865613</span>,
                    <span class="hljs-number">0.92319834</span>,
                    <span class="hljs-number">0.42695504</span>,
                    <span class="hljs-number">0.96633124</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1688</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.7553532</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.89994013</span>,
                    <span class="hljs-number">0.052991092</span>,
                    <span class="hljs-number">0.8645576</span>,
                    <span class="hljs-number">0.6406729</span>,
                    <span class="hljs-number">0.95679337</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1573</span>
            }
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.7543385</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {
                <span class="hljs-string">&quot;vector&quot;</span>: [
                    <span class="hljs-number">0.16542226</span>,
                    <span class="hljs-number">0.38248396</span>,
                    <span class="hljs-number">0.9888778</span>,
                    <span class="hljs-number">0.80913955</span>,
                    <span class="hljs-number">0.9501492</span>
                ],
                <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1544</span>
            }
        }
    ]
]}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">[
  { score: <span class="hljs-number">2.8421106338500977</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1745&#x27;</span> },
  { score: <span class="hljs-number">2.838560104370117</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1782&#x27;</span> },
  { score: <span class="hljs-number">2.8134000301361084</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1511&#x27;</span> },
  { score: <span class="hljs-number">2.718268871307373</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1679&#x27;</span> },
  { score: <span class="hljs-number">2.7014894485473633</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1597&#x27;</span> }
]
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">red</code> 의 데이터는 <code translate="no">blue</code> 의 데이터와 다릅니다. 따라서 검색 결과는 해당 하위 집합의 고유한 특성과 데이터 분포를 반영하여 지정된 파티션으로 제한됩니다.</p>
<h3 id="Search-with-output-fields" class="common-anchor-header">출력 필드로 검색</h3><p>출력 필드로 검색을 사용하면 일치하는 벡터의 어떤 속성 또는 필드를 검색 결과에 포함시킬지 지정할 수 있습니다.</p>
<p>요청에 <code translate="no">output_fields</code> 을 지정하여 특정 필드가 포함된 결과를 반환할 수 있습니다.</p>
<p>다음은 <code translate="no">color</code> 속성 값으로 결과를 반환하는 예제입니다:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search with output fields</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment"># Replace with the actual name of your collection</span>
    data=[[<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]],
    limit=<span class="hljs-number">5</span>, <span class="hljs-comment"># Max. number of search results to return</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}, <span class="hljs-comment"># Search parameters</span>
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>] <span class="hljs-comment"># Output fields to return</span>
)

result = json.dumps(res, indent=<span class="hljs-number">4</span>)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 7. Search with output fields</span>
query_vectors = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>3580376395471989f, -<span class="hljs-number">0.</span>6023495712049978f, <span class="hljs-number">0.</span>18414012509913835f, -<span class="hljs-number">0.</span>26286205330961354f, <span class="hljs-number">0.</span>9029438446296592f));

searchReq = <span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(query_vectors)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;color&quot;</span>))
    .<span class="hljs-title function_">topK</span>(<span class="hljs-number">5</span>)
    .<span class="hljs-title function_">build</span>();

searchResp = client.<span class="hljs-title function_">search</span>(searchReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(searchResp));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Search with output fields</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color&quot;</span>],
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)
<button class="copy-code-btn"></button></code></pre>
<p>출력은 다음과 비슷합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">[
    [
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">1.4093276262283325</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {
                <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>
            }
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">16</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">1.0159327983856201</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {
                <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_1496&quot;</span>
            }
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.9902134537696838</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {
                <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>
            }
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">14</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.9803846478462219</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {
                <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;green_2899&quot;</span>
            }
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.8519943356513977</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {
                <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_7025&quot;</span>
            }
        }
    ]
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">{<span class="hljs-string">&quot;searchResults&quot;</span>: [
    [
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.263043</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.2377806</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1869997</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1748955</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {}
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1720343</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {}
        }
    ]
]}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
[
  { score: <span class="hljs-number">3.036271572113037</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;59&#x27;</span>, color: <span class="hljs-string">&#x27;orange&#x27;</span> },
  { score: <span class="hljs-number">3.0267879962921143</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1745&#x27;</span>, color: <span class="hljs-string">&#x27;blue&#x27;</span> },
  { score: <span class="hljs-number">3.0069446563720703</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;854&#x27;</span>, color: <span class="hljs-string">&#x27;black&#x27;</span> },
  { score: <span class="hljs-number">2.984386682510376</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;718&#x27;</span>, color: <span class="hljs-string">&#x27;black&#x27;</span> },
  { score: <span class="hljs-number">2.916019916534424</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;425&#x27;</span>, color: <span class="hljs-string">&#x27;purple&#x27;</span> }
]
<button class="copy-code-btn"></button></code></pre>
<p>검색 결과에는 가장 가까운 이웃과 함께 지정된 필드 <code translate="no">color</code> 가 포함되어 일치하는 각 벡터에 대해 더 풍부한 정보를 제공합니다.</p>
<h2 id="Filtered-search" class="common-anchor-header">필터 검색<button data-href="#Filtered-search" class="anchor-icon" translate="no">
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
    </button></h2><p>필터링된 검색은 벡터 검색에 스칼라 필터를 적용하여 특정 기준에 따라 검색 결과를 구체화할 수 있도록 해줍니다. 필터 표현식에 대한 자세한 내용은 <a href="https://milvus.io/docs/boolean.md">부울 표현식 규칙에서</a>, 예제는 <a href="https://milvus.io/docs/get-and-scalar-query.md">가져오기 및 스칼라 쿼리에서</a> 확인할 수 있습니다.</p>
<h3 id="Use-the-like-operator" class="common-anchor-header"><code translate="no">like</code> 연산자 사용</h3><p><code translate="no">like</code> 연산자는 접두사, 접두사, 접미사 등의 패턴을 평가하여 문자열 검색을 향상시킵니다:</p>
<ul>
<li>접두사<strong>일치</strong>: 특정 접두사로 시작하는 값을 찾으려면 <code translate="no">'like &quot;prefix%&quot;'</code> 구문을 사용합니다.</li>
<li>접두사<strong>일치</strong>: 문자열 내에서 특정 문자 시퀀스가 포함된 값을 찾으려면 <code translate="no">'like &quot;%infix%&quot;'</code> 구문을 사용합니다.</li>
<li><strong>접미사</strong> 일치: 특정 접미사로 끝나는 값을 찾으려면 <code translate="no">'like &quot;%suffix&quot;'</code> 구문을 사용합니다.</li>
</ul>
<p>단일 문자 일치의 경우 밑줄(<code translate="no">_</code>)은 한 문자에 대한 와일드카드 역할을 합니다(예: <code translate="no">'like &quot;y_llow&quot;'</code>).</p>
<h3 id="Special-characters-in-search-strings" class="common-anchor-header">검색 문자열의 특수 문자</h3><p>일반적으로 검색 패턴에서 와일드카드로 사용되는 밑줄(<code translate="no">_</code>) 또는 퍼센트 기호(<code translate="no">%</code>)와 같은 특수 문자가 포함된 문자열을 검색하려면(단일 문자의 경우<code translate="no">_</code>, 문자 시퀀스의 경우 <code translate="no">%</code> ) 이러한 문자를 이스케이프 처리하여 리터럴 문자로 취급해야 합니다. 특수 문자를 이스케이프하려면 백슬래시(<code translate="no">\</code>)를 사용하고, 백슬래시 자체도 이스케이프해야 한다는 점을 잊지 마세요. 예를 들어</p>
<ul>
<li>리터럴 밑줄을 검색하려면 <code translate="no">\\_</code> 을 사용합니다.</li>
<li>리터럴 퍼센트 기호를 검색하려면 <code translate="no">\\%</code> 을 사용합니다.</li>
</ul>
<p>따라서 <code translate="no">&quot;_version_&quot;</code> 이라는 텍스트를 검색해야 하는 경우 쿼리 형식을 <code translate="no">'like &quot;\\_version\\_&quot;'</code> 으로 지정하여 밑줄이 와일드카드가 아닌 검색어의 일부로 취급되도록 해야 합니다.</p>
<p><strong>색</strong> 앞에 <strong>빨간색이</strong> 붙은 결과를 필터링합니다:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search with filter</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment"># Replace with the actual name of your collection</span>
    data=[[<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]],
    limit=<span class="hljs-number">5</span>, <span class="hljs-comment"># Max. number of search results to return</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}, <span class="hljs-comment"># Search parameters</span>
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>], <span class="hljs-comment"># Output fields to return</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color like &quot;red%&quot;&#x27;</span>
)

result = json.dumps(res, indent=<span class="hljs-number">4</span>)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 8. Filtered search</span>
query_vectors = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>3580376395471989f, -<span class="hljs-number">0.</span>6023495712049978f, <span class="hljs-number">0.</span>18414012509913835f, -<span class="hljs-number">0.</span>26286205330961354f, <span class="hljs-number">0.</span>9029438446296592f));

searchReq = <span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(query_vectors)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;color_tag&quot;</span>))
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;color_tag like \&quot;red%\&quot;&quot;</span>)
    .<span class="hljs-title function_">topK</span>(<span class="hljs-number">5</span>)
    .<span class="hljs-title function_">build</span>();

searchResp = client.<span class="hljs-title function_">search</span>(searchReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(searchResp));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 8. Filtered search</span>
<span class="hljs-comment">// 8.1 Filter with &quot;like&quot; operator and prefix wildcard</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">filters</span>: <span class="hljs-string">&quot;color_tag like \&quot;red%\&quot;&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color_tag&quot;</span>]
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)
<button class="copy-code-btn"></button></code></pre>
<p>출력은 다음과 비슷합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">[
    [
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.9902134537696838</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {
                <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>
            }
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.8519943356513977</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {
                <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_7025&quot;</span>
            }
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: -<span class="hljs-number">0.4113418459892273</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {
                <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_9392&quot;</span>
            }
        }
    ]
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">{<span class="hljs-string">&quot;searchResults&quot;</span>: [
    [
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1869997</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {<span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">&quot;red_3026&quot;</span>}
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1677284</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {<span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">&quot;red_9030&quot;</span>}
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1476475</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {<span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">&quot;red_3744&quot;</span>}
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.0969629</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {<span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">&quot;red_4168&quot;</span>}
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.0741848</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {<span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">&quot;red_9678&quot;</span>}
        }
    ]
]}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">[
  { score: <span class="hljs-number">2.5080761909484863</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1201&#x27;</span>, color_tag: <span class="hljs-string">&#x27;red_8904&#x27;</span> },
  { score: <span class="hljs-number">2.491129159927368</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;425&#x27;</span>, color_tag: <span class="hljs-string">&#x27;purple_8212&#x27;</span> },
  { score: <span class="hljs-number">2.4889798164367676</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1458&#x27;</span>, color_tag: <span class="hljs-string">&#x27;red_6891&#x27;</span> },
  { score: <span class="hljs-number">2.42964243888855</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;724&#x27;</span>, color_tag: <span class="hljs-string">&#x27;black_9885&#x27;</span> },
  { score: <span class="hljs-number">2.4004223346710205</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;854&#x27;</span>, color_tag: <span class="hljs-string">&#x27;black_5990&#x27;</span> }
]
<button class="copy-code-btn"></button></code></pre>
<p>문자열 내 어디에서나 문자 <strong>ll가</strong> 포함된 <strong>색상을</strong> 가진 결과를 필터링합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Infix match on color field</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment"># Replace with the actual name of your collection</span>
    data=[[<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]],
    limit=<span class="hljs-number">5</span>, <span class="hljs-comment"># Max. number of search results to return</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}, <span class="hljs-comment"># Search parameters</span>
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>], <span class="hljs-comment"># Output fields to return</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color like &quot;%ll%&quot;&#x27;</span> <span class="hljs-comment"># Filter on color field, infix match on &quot;ll&quot;</span>
)

result = json.dumps(res, indent=<span class="hljs-number">4</span>)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 8. Filtered search</span>
query_vectors = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>3580376395471989f, -<span class="hljs-number">0.</span>6023495712049978f, <span class="hljs-number">0.</span>18414012509913835f, -<span class="hljs-number">0.</span>26286205330961354f, <span class="hljs-number">0.</span>9029438446296592f));

searchReq = <span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(query_vectors)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;color_tag&quot;</span>))
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;color like \&quot;%ll%\&quot;&quot;</span>)
    .<span class="hljs-title function_">topK</span>(<span class="hljs-number">5</span>)
    .<span class="hljs-title function_">build</span>();

searchResp = client.<span class="hljs-title function_">search</span>(searchReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(searchResp));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 8. Filtered search</span>
<span class="hljs-comment">// 8.1 Filter with &quot;like&quot; operator and prefix wildcard</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">filters</span>: <span class="hljs-string">&quot;color_tag like \&quot;%ll%\&quot;&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color_tag&quot;</span>]
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)
<button class="copy-code-btn"></button></code></pre>
<p>출력은 다음과 비슷합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">[
    [
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.7972343564033508</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {
                <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>
            }
        }
    ]
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">{<span class="hljs-string">&quot;searchResults&quot;</span>: [
    [
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1869997</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {<span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>}
        }
    ]
]}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">[
  { score: <span class="hljs-number">2.5080761909484863</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1201&#x27;</span>, color_tag: <span class="hljs-string">&#x27;yellow_4222&#x27;</span> }
]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-search" class="common-anchor-header">범위 검색<button data-href="#Range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>범위 검색을 사용하면 쿼리 벡터로부터 지정된 거리 범위 내에 있는 벡터를 찾을 수 있습니다.</p>
<p><code translate="no">radius</code> 및 선택적으로 <code translate="no">range_filter</code> 을 설정하면 쿼리 벡터와 다소 유사한 벡터를 포함하도록 검색 범위를 조정하여 잠재적인 일치 항목을 보다 포괄적으로 볼 수 있습니다.</p>
<ul>
<li><p><code translate="no">radius</code>: 검색 공간의 외곽 경계를 정의합니다. 쿼리 벡터로부터 이 거리 내에 있는 벡터만 잠재적 일치 항목으로 간주됩니다.</p></li>
<li><p><code translate="no">range_filter</code>: <code translate="no">radius</code> 은 검색의 외부 한계를 설정하지만, <code translate="no">range_filter</code> 은 선택적으로 내부 경계를 정의하는 데 사용하여 벡터가 일치하는 것으로 간주되는 거리 범위를 만들 수 있습니다.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Conduct a range search</span>
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.8</span>, <span class="hljs-comment"># Radius of the search circle</span>
        <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">1.0</span> <span class="hljs-comment"># Range filter to filter out vectors that are not within the search circle</span>
    }
}

res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment"># Replace with the actual name of your collection</span>
    data=[[<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]],
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># Max. number of search results to return</span>
    search_params=search_params, <span class="hljs-comment"># Search parameters</span>
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>], <span class="hljs-comment"># Output fields to return</span>
)

result = json.dumps(res, indent=<span class="hljs-number">4</span>)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 9. Range search</span>
query_vectors = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>3580376395471989f, -<span class="hljs-number">0.</span>6023495712049978f, <span class="hljs-number">0.</span>18414012509913835f, -<span class="hljs-number">0.</span>26286205330961354f, <span class="hljs-number">0.</span>9029438446296592f));

searchReq = <span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(query_vectors)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;color_tag&quot;</span>))
    .<span class="hljs-title function_">searchParams</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;radius&quot;</span>, <span class="hljs-number">0.1</span>, <span class="hljs-string">&quot;range&quot;</span>, <span class="hljs-number">1.0</span>))
    .<span class="hljs-title function_">topK</span>(<span class="hljs-number">5</span>)
    .<span class="hljs-title function_">build</span>();

searchResp = client.<span class="hljs-title function_">search</span>(searchReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(searchResp));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9. Range search</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">radius</span>: <span class="hljs-number">0.1</span>,
        <span class="hljs-attr">range</span>: <span class="hljs-number">1.0</span>
    },
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color_tag&quot;</span>]
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)
<button class="copy-code-btn"></button></code></pre>
<p>출력은 다음과 비슷합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">[
    [
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.9902134537696838</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {
                <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>
            }
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">14</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.9803846478462219</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {
                <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;green_2899&quot;</span>
            }
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;distance&quot;</span>: <span class="hljs-number">0.8519943356513977</span>,
            <span class="hljs-string">&quot;entity&quot;</span>: {
                <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_7025&quot;</span>
            }
        }
    ]
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">{<span class="hljs-string">&quot;searchResults&quot;</span>: [
    [
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.263043</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {<span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">&quot;green_2052&quot;</span>}
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.2377806</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {<span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">&quot;purple_3709&quot;</span>}
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1869997</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {<span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">&quot;red_3026&quot;</span>}
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1748955</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {<span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">&quot;black_1646&quot;</span>}
        },
        {
            <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">1.1720343</span>,
            <span class="hljs-string">&quot;fields&quot;</span>: {<span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">&quot;green_4853&quot;</span>}
        }
    ]
]}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">[
  { score: <span class="hljs-number">2.3387961387634277</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;718&#x27;</span>, color_tag: <span class="hljs-string">&#x27;black_7154&#x27;</span> },
  { score: <span class="hljs-number">2.3352415561676025</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1745&#x27;</span>, color_tag: <span class="hljs-string">&#x27;blue_8741&#x27;</span> },
  { score: <span class="hljs-number">2.290485382080078</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1408&#x27;</span>, color_tag: <span class="hljs-string">&#x27;red_2324&#x27;</span> },
  { score: <span class="hljs-number">2.285870313644409</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;854&#x27;</span>, color_tag: <span class="hljs-string">&#x27;black_5990&#x27;</span> },
  { score: <span class="hljs-number">2.2593345642089844</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;1309&#x27;</span>, color_tag: <span class="hljs-string">&#x27;red_8458&#x27;</span> }
]
<button class="copy-code-btn"></button></code></pre>
<p>반환된 모든 엔티티의 거리가 쿼리 벡터로부터 0.8~1.0 범위 내에 있는 것을 확인할 수 있습니다.</p>
<p><code translate="no">radius</code> 및 <code translate="no">range_filter</code> 의 매개변수 설정은 사용 중인 메트릭 유형에 따라 다릅니다.</p>
<table>
<thead>
<tr><th><strong>메트릭 유형</strong></th><th><strong>특성</strong></th><th><strong>범위 검색 설정</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>L2 거리가 작을수록 유사성이 높음을 나타냅니다.</td><td>결과에서 가장 가까운 벡터를 제외하려면<br/> <code translate="no">range_filter</code> &lt;= 거리 &lt; <code translate="no">radius</code></td></tr>
<tr><td><code translate="no">IP</code></td><td>IP 거리가 클수록 유사성이 높음을 나타냅니다.</td><td>가장 가까운 벡터를 결과에서 제외하려면<br/> <code translate="no">radius</code> &lt;거리 &lt;=를 확인하세요. <code translate="no">range_filter</code></td></tr>
<tr><td><code translate="no">COSINE</code></td><td>코사인 값이 클수록 유사도가 높음을 나타냅니다.</td><td>가장 가까운 벡터를 결과에서 제외하려면<br/> <code translate="no">radius</code> &lt;거리 &lt;=를 확인하세요. <code translate="no">range_filter</code></td></tr>
<tr><td><code translate="no">JACCARD</code></td><td>자카드 거리가 작을수록 유사도가 높음을 나타냅니다.</td><td>결과에서 가장 가까운 벡터를 제외하려면<br/> <code translate="no">range_filter</code> &lt;= 거리 &lt;= 다음을 확인합니다. <code translate="no">radius</code></td></tr>
<tr><td><code translate="no">HAMMING</code></td><td>해밍 거리가 작을수록 유사도가 높음을 나타냅니다.</td><td>결과에서 가장 가까운 벡터를 제외하려면<br/> <code translate="no">range_filter</code> &lt;= 거리 &lt;를 확인하세요. <code translate="no">radius</code></td></tr>
</tbody>
</table>
<p>거리 메트릭 유형에 대해 자세히 알아보려면 <a href="/docs/ko/v2.4.x/metric.md">유사성 메트릭을</a> 참조하세요.</p>
<h2 id="Grouping-search" class="common-anchor-header">그룹 검색<button data-href="#Grouping-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 그룹화 검색은 검색 결과의 포괄성과 정확성을 향상시키기 위해 고안되었습니다.</p>
<p>많은 문서가 여러 구절로 나뉘어 있고 각 구절이 하나의 벡터 임베딩으로 표현되는 RAG의 시나리오를 생각해 보겠습니다. 사용자는 가장 관련성이 높은 구절을 찾아서 LLM에게 정확하게 안내하기를 원합니다. 일반적인 밀버스 검색 기능은 이러한 요구 사항을 충족할 수 있지만, 대부분의 구절이 소수의 문서에서만 나오며 검색 결과의 포괄성이 매우 떨어지기 때문에 매우 왜곡되고 편향된 결과를 초래할 수 있습니다. 이는 LLM이 제공하는 결과의 정확성 또는 정확성을 심각하게 저해하고 LLM 사용자의 경험에 부정적인 영향을 미칠 수 있습니다.</p>
<p>그룹 검색은 이 문제를 효과적으로 해결할 수 있습니다. <code translate="no">group_by_field</code> 을 전달하면 Milvus 사용자는 검색 결과를 여러 그룹으로 버킷화할 수 있습니다. 이 기능은 검색 결과의 포괄성과 공정성을 크게 향상시켜 LLM 결과의 품질을 눈에 띄게 개선할 수 있습니다.</p>
<p>다음은 필드별로 검색 결과를 그룹화하는 예제 코드입니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Connect to Milvus</span>
client = MilvusClient(uri=<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>) <span class="hljs-comment"># Milvus server address</span>

<span class="hljs-comment"># Load data into collection</span>
client.load_collection(<span class="hljs-string">&quot;group_search&quot;</span>) <span class="hljs-comment"># Collection name</span>

<span class="hljs-comment"># Group search results</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;group_search&quot;</span>, <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.14529211512077012</span>, <span class="hljs-number">0.9147257273453546</span>, <span class="hljs-number">0.7965055218724449</span>, <span class="hljs-number">0.7009258593102812</span>, <span class="hljs-number">0.5605206522382088</span>]], <span class="hljs-comment"># Query vector</span>
    search_params={
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    }, <span class="hljs-comment"># Search parameters</span>
    limit=<span class="hljs-number">5</span>, <span class="hljs-comment"># Max. number of groups to return</span>
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-comment"># Group results by document ID</span>
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;passage_id&quot;</span>]
)

<span class="hljs-comment"># Retrieve the values in the `doc_id` column</span>
doc_ids = [result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;doc_id&#x27;</span>] <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> res[<span class="hljs-number">0</span>]]
passage_ids = [result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;passage_id&#x27;</span>] <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> res[<span class="hljs-number">0</span>]]

<span class="hljs-built_in">print</span>(doc_ids)
<span class="hljs-built_in">print</span>(passage_ids)
<button class="copy-code-btn"></button></code></pre>
<p>출력은 다음과 비슷합니다:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_7&quot;</span>, <span class="hljs-string">&quot;doc_7&quot;</span>, <span class="hljs-string">&quot;doc_3&quot;</span>, <span class="hljs-string">&quot;doc_3&quot;</span>, <span class="hljs-string">&quot;doc_2&quot;</span>, <span class="hljs-string">&quot;doc_2&quot;</span>, <span class="hljs-string">&quot;doc_8&quot;</span>, <span class="hljs-string">&quot;doc_8&quot;</span>]
[<span class="hljs-meta">5, 10, 11, 10, 9, 6, 5, 4, 9, 2</span>]
<button class="copy-code-btn"></button></code></pre>
<p>주어진 출력에서 각 문서에 대해 정확히 두 개의 구절이 검색되고 총 5개의 문서가 결과를 구성하는 것을 볼 수 있습니다.</p>
<p>비교를 위해 그룹 관련 매개변수를 주석 처리하고 일반 검색을 수행해 보겠습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Connect to Milvus</span>
client = MilvusClient(uri=<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>) <span class="hljs-comment"># Milvus server address</span>

<span class="hljs-comment"># Load data into collection</span>
client.load_collection(<span class="hljs-string">&quot;group_search&quot;</span>) <span class="hljs-comment"># Collection name</span>

<span class="hljs-comment"># Search without `group_by_field`</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;group_search&quot;</span>, <span class="hljs-comment"># Collection name</span>
    data=query_passage_vector, <span class="hljs-comment"># Replace with your query vector</span>
    search_params={
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    }, <span class="hljs-comment"># Search parameters</span>
    limit=<span class="hljs-number">5</span>, <span class="hljs-comment"># Max. number of search results to return</span>
    <span class="hljs-comment"># group_by_field=&quot;doc_id&quot;, # Group results by document ID</span>
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;passage_id&quot;</span>]
)

<span class="hljs-comment"># Retrieve the values in the `doc_id` column</span>
doc_ids = [result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;doc_id&#x27;</span>] <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> res[<span class="hljs-number">0</span>]]
passage_ids = [result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;passage_id&#x27;</span>] <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> res[<span class="hljs-number">0</span>]]

<span class="hljs-built_in">print</span>(doc_ids)
<span class="hljs-built_in">print</span>(passage_ids)
<button class="copy-code-btn"></button></code></pre>
<p>출력은 다음과 비슷합니다:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>]
[<span class="hljs-meta">1, 10, 3, 12, 9</span>]
<button class="copy-code-btn"></button></code></pre>
<p>주어진 출력에서 'doc_11'이 검색 결과를 완전히 지배하여 다른 문서의 고품질 단락을 가리는 것을 볼 수 있으며, 이는 LLM에 좋지 않은 프롬프트가 될 수 있습니다.</p>
<p><strong>제한 사항</strong></p>
<ul>
<li><p><strong>색인화</strong>: 이 그룹화 기능은 다음 색인 유형으로 색인된 컬렉션에서만 작동합니다: <strong>FLAT</strong>, <strong>IVF_FLAT</strong>, <strong>IVF_SQ8</strong>, <strong>HNSW</strong>, <strong>DISCANN</strong>, <strong>SPARSE_INVERTED_INDEX</strong>.</p></li>
<li><p><strong>벡터</strong>: 현재 그룹화 검색은 <strong>BINARY_VECTOR</strong> 타입의 벡터 필드를 지원하지 않습니다. 데이터 유형에 대한 자세한 내용은 <a href="https://milvus.io/docs/schema.md#Supported-data-types">지원되는 데이터 유형을</a> 참조하세요.</p></li>
<li><p><strong>필드</strong>: 현재 그룹 검색에서는 단일 열만 허용됩니다. <code translate="no">group_by_field</code> 구성에서는 여러 필드 이름을 지정할 수 없습니다.  또한 그룹화 검색은 JSON, FLOAT, DOUBLE, ARRAY 또는 벡터 필드의 데이터 유형과 호환되지 않습니다.</p></li>
<li><p><strong>성능 영향</strong>: 쿼리 벡터 수가 증가하면 성능이 저하된다는 점에 유의하세요. CPU 코어 2개와 8GB 메모리가 있는 클러스터를 예로 들면, 그룹화 검색의 실행 시간은 입력 쿼리 벡터의 수에 비례하여 증가합니다.</p></li>
<li><p><strong>기능</strong>: 현재 그룹화 검색은 <a href="https://milvus.io/docs/single-vector-search.md#Range-search">범위 검색</a>, <a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">검색 반복자에서</a> 지원되지 않습니다.</p></li>
</ul>
<h2 id="Search-parameters" class="common-anchor-header">검색 매개변수<button data-href="#Search-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>범위 검색을 제외한 위의 검색에서는 기본 검색 매개변수가 적용됩니다. 일반적인 경우에는 검색 매개변수를 수동으로 설정할 필요가 없습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># In normal cases, you do not need to set search parameters manually</span>
<span class="hljs-comment"># Except for range searches.</span>
search_parameters = {
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>: {
        <span class="hljs-string">&#x27;nprobe&#x27;</span>: <span class="hljs-number">10</span>,
        <span class="hljs-string">&#x27;level&#x27;</span>: <span class="hljs-number">1</span>，
        <span class="hljs-string">&#x27;radius&#x27;</span>: <span class="hljs-number">1.0</span>
        <span class="hljs-string">&#x27;range_filter&#x27;</span>: <span class="hljs-number">0.8</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>다음 표에는 검색 매개변수에서 가능한 모든 설정이 나열되어 있습니다.</p>
<table>
<thead>
<tr><th><strong>매개변수 이름</strong></th><th><strong>매개변수 설명</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>벡터 임베딩 간의 유사성을 측정하는 방법입니다.<br/> 사용 가능한 값은 <code translate="no">IP</code>, <code translate="no">L2</code>, <code translate="no">COSINE</code>, <code translate="no">JACCARD</code>, <code translate="no">HAMMING</code> 이며, 기본값은 로드된 인덱스 파일의 값입니다.</td></tr>
<tr><td><code translate="no">params.nprobe</code></td><td>검색 중에 쿼리할 단위 수입니다.<br/> 값은 [1, nlist<sub>[1]</sub>] 범위에 속합니다.</td></tr>
<tr><td><code translate="no">params.level</code></td><td>검색 정밀도 수준.<br/> 가능한 값은 <code translate="no">1</code>, <code translate="no">2</code>, <code translate="no">3</code> 이며 기본값은 <code translate="no">1</code> 입니다. 값이 높을수록 더 정확한 결과를 얻을 수 있지만 성능이 느려집니다.</td></tr>
<tr><td><code translate="no">params.radius</code></td><td>검색 공간의 외부 경계를 정의합니다. 쿼리 벡터로부터 이 거리 내에 있는 벡터만 잠재적 일치로 간주됩니다.<br/>값 범위는 <code translate="no">metric_type</code> 매개변수에 의해 결정됩니다. 예를 들어 <code translate="no">metric_type</code> 가 <code translate="no">L2</code> 으로 설정된 경우 유효한 값 범위는 <code translate="no">[0, ∞]</code> 입니다. <code translate="no">metric_type</code> 가 <code translate="no">COSINE</code> 로 설정된 경우 유효한 값 범위는 <code translate="no">[-1, 1]</code> 입니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/metric.md">유사성 지표를</a> 참조하세요.</td></tr>
<tr><td><code translate="no">params.range_filter</code></td><td><code translate="no">radius</code> 은 검색의 외부 한계를 설정하는 반면, <code translate="no">range_filter</code> 은 선택적으로 내부 경계를 정의하는 데 사용하여 벡터가 일치하는 것으로 간주되는 거리 범위를 만들 수 있습니다.<br/>값 범위는 <code translate="no">metric_type</code> 매개변수에 의해 결정됩니다. 예를 들어 <code translate="no">metric_type</code> 가 <code translate="no">L2</code> 로 설정된 경우 유효한 값 범위는 <code translate="no">[0, ∞]</code> 입니다. <code translate="no">metric_type</code> 가 <code translate="no">COSINE</code> 로 설정된 경우 유효한 값 범위는 <code translate="no">[-1, 1]</code> 입니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/metric.md">유사성 메트릭을</a> 참조하세요.</td></tr>
</tbody>
</table>
<div class="admonition note">
<p><strong>참고</strong></p>
<p>[1] 인덱싱 후 클러스터 단위 수입니다. 컬렉션을 색인할 때 Milvus는 벡터 데이터를 여러 개의 클러스터 단위로 세분화하며, 그 수는 실제 색인 설정에 따라 달라집니다.</p>
<p>[2] 검색에서 반환할 엔티티의 수입니다.</p>
</div>
