---
id: single-vector-search.md
order: 1
summary: 本文描述如何使用單一查詢向量在 Milvus 套件中搜尋向量。
title: 單向量搜尋
---
<h1 id="Single-Vector-Search" class="common-anchor-header">單向量搜尋<button data-href="#Single-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>插入資料後，下一步就是在 Milvus 中對您的資料集執行相似性搜尋。</p>
<p>Milvus 允許您進行兩種類型的搜尋，取決於您的資料集中向量欄位的數量：</p>
<ul>
<li><strong>單向量搜尋</strong>：如果您的資料集中只有一個向量欄位，請使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a>方法找出最相似的實體。此方法會比較您的查詢向量與集合中現有的向量，並傳回最接近匹配的 ID 以及它們之間的距離。也可以選擇返回向量值和結果的元資料。</li>
<li><strong>混合搜尋</strong>：對於有兩個或更多向量欄位的資料集，使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a>方法。此方法會執行多個近似最近鄰 (Approximate Nearest Neighbor, ANN) 搜尋請求，並在重新排序後結合結果，以傳回最相關的匹配結果。</li>
</ul>
<p>本指南著重於如何在 Milvus 執行單向量搜尋。有關混合搜尋的詳細資訊，請參閱<a href="https://milvus.io/docs/multi-vector-search.md">混合搜尋</a>。</p>
<h2 id="Overview" class="common-anchor-header">總覽<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>有多種搜尋類型可滿足不同的需求：</p>
<ul>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Basic-search">基本搜尋</a>：包括單向量搜尋、大量向量搜尋、分割搜尋和指定輸出欄位的搜尋。</p></li>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">篩選搜尋</a>：基於標量欄位套用篩選條件以精細搜尋結果。</p></li>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Range-search">範圍搜尋</a>：尋找與查詢向量在特定距離範圍內的向量。</p></li>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">群組搜尋</a>：根據特定欄位將搜尋結果分組，以確保結果的多樣性。</p></li>
</ul>
<h2 id="Preparations" class="common-anchor-header">準備工作<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>以下的程式碼片段將現有的程式碼重新利用，以建立與 Milvus 的連線，並快速建立一個集合。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<h2 id="Basic-search" class="common-anchor-header">基本搜尋<button data-href="#Basic-search" class="anchor-icon" translate="no">
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
    </button></h2><p>在傳送<code translate="no">search</code> 請求時，您可以提供一個或多個向量值，代表您的查詢嵌入，以及表示要返回結果數量的<code translate="no">limit</code> 值。</p>
<p>根據您的資料和您的查詢向量，您可能會得到少於<code translate="no">limit</code> 的結果。當<code translate="no">limit</code> 大於您的查詢可能匹配向量的數量時，就會發生這種情況。</p>
<h3 id="Single-vector-search" class="common-anchor-header">單向量搜尋</h3><p>在 Milvus 中，單向量搜尋是<code translate="no">search</code> 運算的最簡單形式，目的是找出與指定查詢向量最相似的向量。</p>
<p>要執行單一向量搜尋，請指定目標集合名稱、查詢向量，以及所需的結果數量 (<code translate="no">limit</code>)。此操作會返回一個結果集，其中包含最相似的向量、其 ID 以及與查詢向量的距離。</p>
<p>以下是搜尋與查詢向量最相似的前 5 個實體的範例：</p>
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
      <th>參數</th>
      <th>說明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>現有集合的名稱。</td>
    </tr>
    <tr>
      <td><code translate="no">data</code></td>
      <td>向量嵌入的清單。<br/>Milvus 會搜尋與指定向量嵌入最相似的向量嵌入。</td>
    </tr>
    <tr>
      <td><code translate="no">limit</code></td>
      <td>要返回的實體總數。<br/>您可以將此參數與<strong>param</strong>中的<strong>偏移量</strong>結合使用，以啟用分頁。<br/>此值與<strong>param</strong>中的<strong>偏移量</strong>之和應小於 16,384。</td>
    </tr>
    <tr>
      <td><code translate="no">search_params</code></td>
      <td>此操作特有的參數設定。<br/><ul><li><code translate="no">metric_type</code>:應用於此操作的度量類型。這應該與您索引上述指定的向量欄位時所使用的類型相同。可能的值有<strong>L2</strong>、<strong>IP</strong>、<strong>COSINE</strong>、<strong>JACCARD</strong>、<strong>HAMMING</strong>。</li><li><code translate="no">params</code>:附加參數。詳情請參閱<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md">search()</a>。</li></ul></td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>參數</th>
      <th>說明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collectionName</code></td>
      <td>現有集合的名稱。</td>
    </tr>
    <tr>
      <td><code translate="no">data</code></td>
      <td>向量內嵌的清單。<br/>Milvus 會搜尋與指定向量內嵌最相似的向量內嵌。</td>
    </tr>
    <tr>
      <td><code translate="no">topK</code></td>
      <td>搜尋結果中要返回的記錄數量。此參數與<strong>limit</strong>參數使用相同的語法，因此您只需設定其中一個。<br/>您可以將此參數與<strong>參數</strong>中的<strong>偏移量</strong>結合使用，以啟用分頁。<br/>此值與<strong>參數</strong>中的<strong>偏移量</strong>之和應小於 16,384。</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>參數</th>
      <th>說明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>現有集合的名稱。</td>
    </tr>
    <tr>
      <td><code translate="no">data</code></td>
      <td>向量嵌入的清單。<br/>Milvus 會搜尋與指定向量嵌入最相似的向量嵌入。</td>
    </tr>
    <tr>
      <td><code translate="no">limit</code></td>
      <td>要返回的實體總數。<br/>您可以將此參數與<strong>param</strong>中的<strong>偏移量</strong>結合使用，以啟用分頁。<br/>此值與<strong>param</strong>中的<strong>偏移量</strong>之和應小於 16,384。</td>
    </tr>
  </tbody>
</table>
<p>輸出與以下相似：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<p>輸出會顯示與您的查詢向量最接近的前 5 個鄰居，包括它們的唯一 ID 和計算出的距離。</p>
<h3 id="Bulk-vector-search" class="common-anchor-header">大量向量搜尋</h3><p>大量向量搜尋延伸了<a href="https://milvus.io/docs/single-vector-search.md#Single-Vector-Search">單一</a>向量搜尋的概念，允許在單一要求中搜尋多個查詢向量。這種類型的搜尋非常適合需要為一組查詢向量找出相似向量的情況，可大幅減少所需的時間和計算資源。</p>
<p>在大量向量搜尋中，您可以在<code translate="no">data</code> 欄位中包含數個查詢向量。系統會並行處理這些向量，為每個查詢向量傳回單獨的結果集，每個結果集包含在集合中找到的最接近的匹配結果。</p>
<p>以下是從兩個查詢向量中搜尋兩個最相似實體的不同集合的範例：</p>
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
<p>輸出與下列內容類似：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<p>結果包括兩組最近鄰，每個查詢向量都有一組最近鄰，展示了大量向量搜尋同時處理多個查詢向量的效率。</p>
<h3 id="Partition-search" class="common-anchor-header">分區搜尋</h3><p>分區搜尋將您的搜尋範圍縮小為特定的子集或集合分區。這對於將資料分割成邏輯或分類的有組織資料集特別有用，可減少需要掃描的資料量，從而加快搜尋作業。</p>
<p>若要進行分割搜尋，只需在<code translate="no">partition_names</code> 的搜尋請求中包含目標分割區的名稱。這會指定<code translate="no">search</code> 作業只考慮指定分割區內的向量。</p>
<p>以下是在<code translate="no">red</code> 中搜尋實體的範例：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<p>輸出與下列內容類似：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<p>然後，在<code translate="no">blue</code> 中搜尋實體：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<p>輸出與下列內容類似：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<p><code translate="no">red</code> 中的資料與<code translate="no">blue</code> 中的資料不同。因此，搜尋結果會限制在指定的分割區內，反映出該子集的獨特特性和資料分佈。</p>
<h3 id="Search-with-output-fields" class="common-anchor-header">使用輸出欄位搜尋</h3><p>使用輸出欄位搜尋可讓您指定搜尋結果應包含匹配向量的哪些屬性或欄位。</p>
<p>您可以在請求中指定<code translate="no">output_fields</code> ，以傳回包含特定欄位的結果。</p>
<p>以下是一個使用<code translate="no">color</code> 屬性值傳回結果的範例：</p>
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
<p>輸出與下列內容類似：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<p>除了最近鄰之外，搜尋結果還會包含指定的欄位<code translate="no">color</code> ，為每個匹配向量提供更豐富的資訊。</p>
<h2 id="Filtered-search" class="common-anchor-header">篩選搜尋<button data-href="#Filtered-search" class="anchor-icon" translate="no">
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
    </button></h2><p>篩選搜尋將標量篩選器套用至向量搜尋，讓您可以根據特定條件精細搜尋結果。您可以在<a href="https://milvus.io/docs/boolean.md">Boolean Expression Rules</a>中找到更多關於篩選表達式的資訊，並在<a href="https://milvus.io/docs/get-and-scalar-query.md">Get &amp; Scalar Query</a> 中找到範例。</p>
<h3 id="Use-the-like-operator" class="common-anchor-header">使用<code translate="no">like</code> 運算符號</h3><p><code translate="no">like</code> 運算符號透過評估包括前綴、後綴和後綴的模式來增強字串搜尋：</p>
<ul>
<li><strong>前綴匹配</strong>：若要尋找以特定前綴開頭的值，請使用語法<code translate="no">'like &quot;prefix%&quot;'</code> 。</li>
<li><strong>後綴</strong>（<strong>Infix</strong>）<strong>匹配</strong>：若要尋找在字串中任何位置包含特定字元序列的值，請使用語法<code translate="no">'like &quot;%infix%&quot;'</code> 。</li>
<li><strong>後綴匹配</strong>：若要尋找以特定後綴結尾的值，請使用語法<code translate="no">'like &quot;%suffix&quot;'</code> 。</li>
</ul>
<p>對於單字元匹配，下劃線 (<code translate="no">_</code>) 可作為單字元的通配符，例如<code translate="no">'like &quot;y_llow&quot;'</code> 。</p>
<h3 id="Special-characters-in-search-strings" class="common-anchor-header">搜尋字串中的特殊字符</h3><p>如果要搜尋包含下劃線 (<code translate="no">_</code>) 或百分號 (<code translate="no">%</code>) 等特殊字符的字串，這些特殊字符通常在搜尋模式中作為通配符使用 (<code translate="no">_</code> 適用於任何單一字元，而<code translate="no">%</code> 適用於任何字元序列)，則必須轉換這些字元，將其視為字面意義上的字元。使用反斜線 (<code translate="no">\</code>) 來轉義特殊字符，並記得轉義反斜線本身。舉例來說：</p>
<ul>
<li>若要搜尋字面上的下劃線，請使用<code translate="no">\\_</code> 。</li>
<li>若要搜尋字面上的百分號，請使用<code translate="no">\\%</code> 。</li>
</ul>
<p>因此，如果您需要搜尋<code translate="no">&quot;_version_&quot;</code> 這段文字，您的查詢應該格式化為<code translate="no">'like &quot;\\_version\\_&quot;'</code> ，以確保下劃線會被視為搜尋詞彙的一部分，而不是通配符。</p>
<p>篩選<strong>顏色</strong> <strong>以紅色</strong>為前綴的結果：</p>
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
<p>輸出與下列內容類似：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<p>篩選<strong>顏色</strong>包含字串中任何位置的字母<strong>ll</strong>的結果：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<p>輸出與下列內容類似：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<h2 id="Range-search" class="common-anchor-header">範圍搜尋<button data-href="#Range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>範圍搜尋可以讓您找到與查詢向量在指定距離範圍內的向量。</p>
<p>透過設定<code translate="no">radius</code> 和可選的<code translate="no">range_filter</code> ，您可以調整搜尋的寬度，以包含與查詢向量有點相似的向量，提供更全面的潛在匹配檢視。</p>
<ul>
<li><p><code translate="no">radius</code>:定義搜尋空間的外部邊界。只有與查詢向量的距離在這個範圍內的向量，才會被視為潛在的匹配向量。</p></li>
<li><p><code translate="no">range_filter</code>:<code translate="no">radius</code> 設定搜尋的外部界限，而<code translate="no">range_filter</code> 則可選擇用來定義內部界限，建立一個向量必須在其範圍內才會被視為匹配的距離範圍。</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<p>輸出與下列內容類似：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<p>您會發現所有傳回的實體與查詢向量的距離都在 0.8 到 1.0 的範圍內。</p>
<p><code translate="no">radius</code> 和<code translate="no">range_filter</code> 的參數設定會因使用的度量類型而異。</p>
<table>
<thead>
<tr><th><strong>度量類型</strong></th><th><strong>特性</strong></th><th><strong>範圍搜尋設定</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>L2 距離越小，表示相似度越高。</td><td>若要從結果中排除最接近的向量，請確保：<br/> <code translate="no">range_filter</code> &lt;= distance &lt;<code translate="no">radius</code></td></tr>
<tr><td><code translate="no">IP</code></td><td>較大的 IP 距離表示相似度較高。</td><td>若要從結果中排除最接近的向量，請確保：<br/> <code translate="no">radius</code> &lt; distance &lt;=<code translate="no">range_filter</code></td></tr>
<tr><td><code translate="no">COSINE</code></td><td>較大的余弦值表示相似度較高。</td><td>若要從結果中排除最接近的向量，請確保：<br/> <code translate="no">radius</code> &lt; distance &lt;=<code translate="no">range_filter</code></td></tr>
<tr><td><code translate="no">JACCARD</code></td><td>較小的 Jaccard 距離表示相似度較高。</td><td>若要從結果中排除最接近的向量，請確保：<br/> <code translate="no">range_filter</code> &lt;= 距離 &lt;=<code translate="no">radius</code></td></tr>
<tr><td><code translate="no">HAMMING</code></td><td>較小的 Hamming 距離表示較高的相似性。</td><td>若要從結果中排除最接近的向量，請確保：<br/> <code translate="no">range_filter</code> &lt;= distance &lt;<code translate="no">radius</code></td></tr>
</tbody>
</table>
<p>若要瞭解關於距離公制類型的更多資訊，請參閱<a href="/docs/zh-hant/v2.4.x/metric.md">相似性公制</a>。</p>
<h2 id="Grouping-search" class="common-anchor-header">分組搜尋<button data-href="#Grouping-search" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中，分組搜尋的設計是為了改善搜尋結果的全面性和準確性。</p>
<p>考慮 RAG 中的一種情況，大量的文件被分割成不同的段落，每個段落由一個向量嵌入來表示。使用者希望找到最相關的段落，以準確地提示 LLM。普通的 Milvus 搜尋功能可以滿足這個需求，但它可能會導致搜尋結果高度傾斜和有偏見：大部分的段落只來自幾個文件，搜尋結果的全面性非常差。這會嚴重損害 LLM 所提供結果的準確性甚至正確性，並對 LLM 使用者的使用經驗造成負面影響。</p>
<p>群組搜尋可以有效解決這個問題。透過<code translate="no">group_by_field</code> ，Milvus 使用者可以將搜尋結果分為幾個群組。此功能可大幅提升搜尋結果的全面性與公平性，顯著改善 LLM 的輸出品質。</p>
<p>以下是依欄位對搜尋結果進行分組的範例程式碼：</p>
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
<p>輸出與下列內容相似：</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_7&quot;</span>, <span class="hljs-string">&quot;doc_7&quot;</span>, <span class="hljs-string">&quot;doc_3&quot;</span>, <span class="hljs-string">&quot;doc_3&quot;</span>, <span class="hljs-string">&quot;doc_2&quot;</span>, <span class="hljs-string">&quot;doc_2&quot;</span>, <span class="hljs-string">&quot;doc_8&quot;</span>, <span class="hljs-string">&quot;doc_8&quot;</span>]
[<span class="hljs-meta">5, 10, 11, 10, 9, 6, 5, 4, 9, 2</span>]
<button class="copy-code-btn"></button></code></pre>
<p>在給定的輸出中，可以觀察到每個文件都擷取了兩個段落，總共 5 個文件組成了結果。</p>
<p>為了比較，讓我們注釋掉群組相關的參數，並進行一般的搜尋：</p>
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
<p>輸出與下列內容相似：</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>]
[<span class="hljs-meta">1, 10, 3, 12, 9</span>]
<button class="copy-code-btn"></button></code></pre>
<p>在給定的輸出中，可以觀察到「doc_11」完全支配了搜尋結果，蓋過了其他文件的高品質段落，這對 LLM 來說是一個很差的提示。</p>
<p><strong>限制</strong></p>
<ul>
<li><p><strong>索引</strong>：此分組功能僅適用於使用這些索引類型建立索引的資料庫：<strong>flat</strong>、<strong>ivf_flat</strong>、<strong>ivf_sq8</strong>、<strong>hnsw</strong>、<strong>diskann</strong>、<strong>sparse_inverted_index</strong>。</p></li>
<li><p><strong>向量</strong>：目前，分組搜尋不支援<strong>BINARY_VECTOR</strong>類型的向量欄位。有關資料類型的詳細資訊，請參閱<a href="https://milvus.io/docs/schema.md#Supported-data-types">支援的資料類型</a>。</p></li>
<li><p><strong>欄位</strong>：目前，群組搜尋只允許單列。您無法在<code translate="no">group_by_field</code> config 中指定多個欄位名稱。  此外，群組搜尋與 JSON、FLOAT、DOUBLE、ARRAY 或向量欄位的資料類型不相容。</p></li>
<li><p><strong>效能影響</strong>：請注意，效能會隨著查詢向量數目的增加而降低。以具有 2 個 CPU 核心和 8 GB 記憶體的群集為例，群組搜尋的執行時間會隨著輸入查詢向量的數量成比例增加。</p></li>
<li><p><strong>功能性</strong>：目前，<a href="https://milvus.io/docs/single-vector-search.md#Range-search">範圍搜尋</a>、<a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">搜尋迭代器</a>不支援群組搜尋</p></li>
</ul>
<h2 id="Search-parameters" class="common-anchor-header">搜尋參數<button data-href="#Search-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>在上述搜尋中，除了範圍搜尋外，預設的搜尋參數都適用。在一般情況下，您不需要手動設定搜尋參數。</p>
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
<p>下表列出搜尋參數中所有可能的設定。</p>
<table>
<thead>
<tr><th><strong>參數名稱</strong></th><th><strong>參數說明</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>如何測量向量嵌入之間的相似性。<br/> 可能的值是<code translate="no">IP</code>,<code translate="no">L2</code>,<code translate="no">COSINE</code>,<code translate="no">JACCARD</code>, 和<code translate="no">HAMMING</code>, 並預設為載入索引檔案的值。</td></tr>
<tr><td><code translate="no">params.nprobe</code></td><td>搜尋時要查詢的單位數量。<br/> 數值範圍為 [1，nlist<sub>[1]</sub>]。</td></tr>
<tr><td><code translate="no">params.level</code></td><td>搜尋精確度等級。<br/> 可能的值為<code translate="no">1</code> 、<code translate="no">2</code> 及<code translate="no">3</code> ，預設為<code translate="no">1</code> 。較高的值會產生更精確的結果，但效能較慢。</td></tr>
<tr><td><code translate="no">params.radius</code></td><td>定義搜尋空間的外部邊界。只有與查詢向量的距離在此範圍內的向量，才會被視為潛在的匹配。<br/>值範圍由<code translate="no">metric_type</code> 參數決定。例如，如果<code translate="no">metric_type</code> 設定為<code translate="no">L2</code> ，則有效值範圍為<code translate="no">[0, ∞]</code> 。如果<code translate="no">metric_type</code> 設定為<code translate="no">COSINE</code> ，則有效值範圍為<code translate="no">[-1, 1]</code> 。如需詳細資訊，請參閱<a href="/docs/zh-hant/v2.4.x/metric.md">相似度指標</a>。</td></tr>
<tr><td><code translate="no">params.range_filter</code></td><td><code translate="no">radius</code> 設定搜尋的外部極限，而<code translate="no">range_filter</code> 則可選擇用來定義內部邊界，建立一個距離範圍，向量必須在此範圍內才會被視為匹配。<br/>值範圍由<code translate="no">metric_type</code> 參數決定。例如，如果<code translate="no">metric_type</code> 設定為<code translate="no">L2</code> ，則有效值範圍為<code translate="no">[0, ∞]</code> 。如果<code translate="no">metric_type</code> 設定為<code translate="no">COSINE</code> ，則有效值範圍為<code translate="no">[-1, 1]</code> 。如需詳細資訊，請參閱<a href="/docs/zh-hant/v2.4.x/metric.md">相似度量測</a>。</td></tr>
</tbody>
</table>
<div class="admonition note">
<p><strong>備註</strong></p>
<p>[1] 索引後的叢集單位數量。索引一個集合時，Milvus 會將向量資料再分為多個叢集單位，叢集單位的數量會隨著實際的索引設定而改變。</p>
<p>[2] 搜尋時要返回的實體數量。</p>
</div>
