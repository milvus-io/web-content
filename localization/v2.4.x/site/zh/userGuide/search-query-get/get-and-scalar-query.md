---
id: get-and-scalar-query.md
order: 3
summary: 本指南演示如何通过 ID 获取实体并进行标量过滤。
title: 获取和标量查询
---
<h1 id="Get--Scalar-Query" class="common-anchor-header">获取和标量查询<button data-href="#Get--Scalar-Query" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南演示如何通过 ID 获取实体并进行标量过滤。标量过滤可检索符合指定过滤条件的实体。</p>
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
    </button></h2><p>标量查询使用布尔表达式根据定义的条件过滤集合中的实体。查询结果是一组符合定义条件的实体。与向量搜索（在集合中识别与给定向量最接近的向量）不同，查询是根据特定条件过滤实体。</p>
<p>在 Milvus 中，<strong>过滤器总是一个由字段名和运算符组成的字符串</strong>。在本指南中，你将看到各种过滤器示例。要了解更多运算符详情，<a href="https://milvus.io/docs/get-and-scalar-query.md#Reference-on-scalar-filters">请参阅参考资料</a>部分。</p>
<h2 id="Preparations" class="common-anchor-header">准备工作<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>以下步骤将重新利用代码连接到 Milvus，快速建立一个集合，并在集合中插入 1000 多个随机生成的实体。</p>
<h3 id="Step-1-Create-a-collection" class="common-anchor-header">步骤 1：创建集合</h3><div class="language-python">
<p>使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a>连接到 Milvus 服务器，并使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a>来创建集合。</p>
</div>
<div class="language-java">
<p>使用 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a>连接到 Milvus 服务器并 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a>创建收藏集。</p>
</div>
<div class="language-javascript">
<p>使用 <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a>连接到 Milvus 服务器并 <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a>创建集合。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    dimension=<span class="hljs-number">5</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

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
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, sleep } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address}); 

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,
}); 
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-randomly-generated-entities" class="common-anchor-header">第二步：插入随机生成的实体</h3><div class="language-python">
<p>使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a>将实体插入集合。</p>
</div>
<div class="language-java">
<p>使用 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/insert.md"><code translate="no">insert()</code></a>将实体插入集合。</p>
</div>
<div class="language-javascript">
<p>使用 <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/insert.md"><code translate="no">insert()</code></a>将实体插入集合。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Insert randomly generated vectors </span>
colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
data = []

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    current_color = random.choice(colors)
    current_tag = random.randint(<span class="hljs-number">1000</span>, <span class="hljs-number">9999</span>)
    data.append({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;tag&quot;</span>: current_tag,
        <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;<span class="hljs-subst">{current_color}</span>_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(current_tag)}</span>&quot;</span>
    })

<span class="hljs-built_in">print</span>(data[<span class="hljs-number">0</span>])

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;id&quot;: 0,</span>
<span class="hljs-comment">#     &quot;vector&quot;: [</span>
<span class="hljs-comment">#         0.7371107800002366,</span>
<span class="hljs-comment">#         -0.7290389773227746,</span>
<span class="hljs-comment">#         0.38367002049157417,</span>
<span class="hljs-comment">#         0.36996000494220627,</span>
<span class="hljs-comment">#         -0.3641898951462792</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;color&quot;: &quot;yellow&quot;,</span>
<span class="hljs-comment">#     &quot;tag&quot;: 6781,</span>
<span class="hljs-comment">#     &quot;color_tag&quot;: &quot;yellow_6781&quot;</span>
<span class="hljs-comment"># }</span>

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
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 3. Insert randomly generated vectors into the collection</span>
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; colors = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>);
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>&gt; data = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-keyword">for</span> (int i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">1000</span>; i++) {
    <span class="hljs-title class_">Random</span> rand = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
    <span class="hljs-title class_">String</span> current_color = colors.<span class="hljs-title function_">get</span>(rand.<span class="hljs-title function_">nextInt</span>(colors.<span class="hljs-title function_">size</span>()-<span class="hljs-number">1</span>));
    int current_tag = rand.<span class="hljs-title function_">nextInt</span>(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>;
    <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span> row = <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>();
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-title class_">Long</span>.<span class="hljs-title function_">valueOf</span>(i));
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>()));
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;color&quot;</span>, current_color);
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tag&quot;</span>, current_tag);
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;color_tag&quot;</span>, current_color + <span class="hljs-string">&#x27;_&#x27;</span> + <span class="hljs-title class_">String</span>.<span class="hljs-title function_">valueOf</span>(rand.<span class="hljs-title function_">nextInt</span>(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>));
    data.<span class="hljs-title function_">add</span>(row);
}

<span class="hljs-title class_">InsertReq</span> insertReq = <span class="hljs-title class_">InsertReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(data)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">InsertResp</span> insertResp = client.<span class="hljs-title function_">insert</span>(insertReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(insertResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;insertCnt&quot;: 1000}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3. Insert randomly generated vectors</span>
<span class="hljs-keyword">const</span> colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
<span class="hljs-keyword">var</span> data = []

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000</span>; i++) {
    current_color = colors[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * colors.<span class="hljs-property">length</span>)]
    current_tag = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">8999</span> + <span class="hljs-number">1000</span>)
    data.<span class="hljs-title function_">push</span>({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;tag&quot;</span>: current_tag,
        <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">`<span class="hljs-subst">${current_color}</span>_<span class="hljs-subst">${current_tag}</span>`</span>
    })
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(data[<span class="hljs-number">0</span>])

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   id: 0,</span>
<span class="hljs-comment">//   vector: [</span>
<span class="hljs-comment">//     0.16022394821966035,</span>
<span class="hljs-comment">//     0.6514875214491056,</span>
<span class="hljs-comment">//     0.18294484964044666,</span>
<span class="hljs-comment">//     0.30227694168725394,</span>
<span class="hljs-comment">//     0.47553087493572255</span>
<span class="hljs-comment">//   ],</span>
<span class="hljs-comment">//   color: &#x27;blue&#x27;,</span>
<span class="hljs-comment">//   tag: 8907,</span>
<span class="hljs-comment">//   color_tag: &#x27;blue_8907&#x27;</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: data
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">insert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 1000</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Create-partitions-and-insert-more-entities" class="common-anchor-header">第 3 步：创建分区并插入更多实体</h3><div class="language-python">
<p>使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/create_partition.md"><code translate="no">create_partition()</code></a>创建分区，并使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a>向集合中插入更多实体。</p>
</div>
<div class="language-java">
<p>使用 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/createPartition.md"><code translate="no">createPartition()</code></a>创建分区并 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/insert.md"><code translate="no">insert()</code></a>向集合中插入更多实体。</p>
</div>
<div class="language-javascript">
<p>使用 <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/createPartition.md"><code translate="no">createPartition()</code></a>创建分区，并 <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/insert.md"><code translate="no">insert()</code></a>向集合中插入更多实体。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Create partitions and insert more entities</span>
client.create_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

client.create_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

data = []

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>, <span class="hljs-number">1500</span>):
    current_color = random.choice(colors)
    data.append({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;tag&quot;</span>: current_tag,
        <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;<span class="hljs-subst">{current_color}</span>_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(current_tag)}</span>&quot;</span>
    })

res = client.insert(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=data,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;insert_count&quot;: 500,</span>
<span class="hljs-comment">#     &quot;ids&quot;: [</span>
<span class="hljs-comment">#         1000,</span>
<span class="hljs-comment">#         1001,</span>
<span class="hljs-comment">#         1002,</span>
<span class="hljs-comment">#         1003,</span>
<span class="hljs-comment">#         1004,</span>
<span class="hljs-comment">#         1005,</span>
<span class="hljs-comment">#         1006,</span>
<span class="hljs-comment">#         1007,</span>
<span class="hljs-comment">#         1008,</span>
<span class="hljs-comment">#         1009,</span>
<span class="hljs-comment">#         &quot;(490 more items hidden)&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>

data = []

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1500</span>, <span class="hljs-number">2000</span>):
    current_color = random.choice(colors)
    data.append({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;tag&quot;</span>: current_tag,
        <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;<span class="hljs-subst">{current_color}</span>_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(current_tag)}</span>&quot;</span>
    })

res = client.insert(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=data,
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;insert_count&quot;: 500,</span>
<span class="hljs-comment">#     &quot;ids&quot;: [</span>
<span class="hljs-comment">#         1500,</span>
<span class="hljs-comment">#         1501,</span>
<span class="hljs-comment">#         1502,</span>
<span class="hljs-comment">#         1503,</span>
<span class="hljs-comment">#         1504,</span>
<span class="hljs-comment">#         1505,</span>
<span class="hljs-comment">#         1506,</span>
<span class="hljs-comment">#         1507,</span>
<span class="hljs-comment">#         1508,</span>
<span class="hljs-comment">#         1509,</span>
<span class="hljs-comment">#         &quot;(490 more items hidden)&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 4. Create partitions and insert some more data</span>
<span class="hljs-title class_">CreatePartitionReq</span> createPartitionReq = <span class="hljs-title class_">CreatePartitionReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">partitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .<span class="hljs-title function_">build</span>();

client.<span class="hljs-title function_">createPartition</span>(createPartitionReq);

createPartitionReq = <span class="hljs-title class_">CreatePartitionReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">partitionName</span>(<span class="hljs-string">&quot;partitionB&quot;</span>)
    .<span class="hljs-title function_">build</span>();

client.<span class="hljs-title function_">createPartition</span>(createPartitionReq);

data.<span class="hljs-title function_">clear</span>();

<span class="hljs-keyword">for</span> (int i=<span class="hljs-number">1000</span>; i&lt;<span class="hljs-number">1500</span>; i++) {
    <span class="hljs-title class_">Random</span> rand = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
    <span class="hljs-title class_">String</span> current_color = colors.<span class="hljs-title function_">get</span>(rand.<span class="hljs-title function_">nextInt</span>(colors.<span class="hljs-title function_">size</span>()-<span class="hljs-number">1</span>));
    int current_tag = rand.<span class="hljs-title function_">nextInt</span>(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>;
    <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span> row = <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>();
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-title class_">Long</span>.<span class="hljs-title function_">valueOf</span>(i));
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>()));
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;color&quot;</span>, current_color);
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tag&quot;</span>, current_tag);
    data.<span class="hljs-title function_">add</span>(row);
}

insertReq = <span class="hljs-title class_">InsertReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(data)
    .<span class="hljs-title function_">partitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .<span class="hljs-title function_">build</span>();

insertResp = client.<span class="hljs-title function_">insert</span>(insertReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(insertResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;insertCnt&quot;: 500}</span>

data.<span class="hljs-title function_">clear</span>();

<span class="hljs-keyword">for</span> (int i=<span class="hljs-number">1500</span>; i&lt;<span class="hljs-number">2000</span>; i++) {
    <span class="hljs-title class_">Random</span> rand = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
    <span class="hljs-title class_">String</span> current_color = colors.<span class="hljs-title function_">get</span>(rand.<span class="hljs-title function_">nextInt</span>(colors.<span class="hljs-title function_">size</span>()-<span class="hljs-number">1</span>));
    int current_tag = rand.<span class="hljs-title function_">nextInt</span>(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>;
    <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span> row = <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>();
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-title class_">Long</span>.<span class="hljs-title function_">valueOf</span>(i));
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>()));
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;color&quot;</span>, current_color);
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tag&quot;</span>, current_tag);
    data.<span class="hljs-title function_">add</span>(row);
}

insertReq = <span class="hljs-title class_">InsertReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(data)
    .<span class="hljs-title function_">partitionName</span>(<span class="hljs-string">&quot;partitionB&quot;</span>)
    .<span class="hljs-title function_">build</span>();

insertResp = client.<span class="hljs-title function_">insert</span>(insertReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(insertResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;insertCnt&quot;: 500}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Create partitions and insert more entities</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionB&quot;</span>
})

data = []

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1000</span>; i &lt; <span class="hljs-number">1500</span>; i++) {
    current_color = colors[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * colors.<span class="hljs-property">length</span>)]
    current_tag = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">8999</span> + <span class="hljs-number">1000</span>)
    data.<span class="hljs-title function_">push</span>({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;tag&quot;</span>: current_tag,
        <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">`<span class="hljs-subst">${current_color}</span>_<span class="hljs-subst">${current_tag}</span>`</span>
    })
}

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: data,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">insert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 500</span>
<span class="hljs-comment">// </span>

<span class="hljs-keyword">await</span> <span class="hljs-title function_">sleep</span>(<span class="hljs-number">5000</span>)

data = []

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1500</span>; i &lt; <span class="hljs-number">2000</span>; i++) {
    current_color = colors[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * colors.<span class="hljs-property">length</span>)]
    current_tag = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">8999</span> + <span class="hljs-number">1000</span>)
    data.<span class="hljs-title function_">push</span>({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;tag&quot;</span>: current_tag,
        <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">`<span class="hljs-subst">${current_color}</span>_<span class="hljs-subst">${current_tag}</span>`</span>
    })
}

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: data,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionB&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">insert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 500</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Get-Entities-by-ID" class="common-anchor-header">按 ID 获取实体<button data-href="#Get-Entities-by-ID" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>如果您知道感兴趣的实体的 ID，可以使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/get.md"><code translate="no">get()</code></a>方法。</p>
</div>
<div class="language-java">
<p>如果知道感兴趣的实体的 ID，可以使用 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/get.md"><code translate="no">get()</code></a>方法。</p>
</div>
<div class="language-javascript">
<p>如果您知道您感兴趣的实体的 ID，可以使用 <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/get.md"><code translate="no">get()</code></a>方法。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Get entities by ID</span>
res = client.get(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    ids=[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 0,</span>
<span class="hljs-comment">#         &quot;vector&quot;: [</span>
<span class="hljs-comment">#             0.68824464,</span>
<span class="hljs-comment">#             0.6552274,</span>
<span class="hljs-comment">#             0.33593303,</span>
<span class="hljs-comment">#             -0.7099536,</span>
<span class="hljs-comment">#             -0.07070546</span>
<span class="hljs-comment">#         ],</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;green_2006&quot;,</span>
<span class="hljs-comment">#         &quot;color&quot;: &quot;green&quot;</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 1,</span>
<span class="hljs-comment">#         &quot;vector&quot;: [</span>
<span class="hljs-comment">#             -0.98531723,</span>
<span class="hljs-comment">#             0.33456197,</span>
<span class="hljs-comment">#             0.2844234,</span>
<span class="hljs-comment">#             0.42886782,</span>
<span class="hljs-comment">#             0.32753858</span>
<span class="hljs-comment">#         ],</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;white_9298&quot;,</span>
<span class="hljs-comment">#         &quot;color&quot;: &quot;white&quot;</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 2,</span>
<span class="hljs-comment">#         &quot;vector&quot;: [</span>
<span class="hljs-comment">#             -0.9886812,</span>
<span class="hljs-comment">#             -0.44129863,</span>
<span class="hljs-comment">#             -0.29859528,</span>
<span class="hljs-comment">#             0.06059075,</span>
<span class="hljs-comment">#             -0.43817034</span>
<span class="hljs-comment">#         ],</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;grey_5312&quot;,</span>
<span class="hljs-comment">#         &quot;color&quot;: &quot;grey&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 5. Get entities by ID</span>
<span class="hljs-title class_">GetReq</span> getReq = <span class="hljs-title class_">GetReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">ids</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(0L, 1L, 2L))
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">GetResp</span> entities = client.<span class="hljs-title function_">get</span>(getReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(entities));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;getResults&quot;: [</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;white&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;white_4597&quot;,</span>
<span class="hljs-comment">//         &quot;vector&quot;: [</span>
<span class="hljs-comment">//             0.09665024,</span>
<span class="hljs-comment">//             0.1163497,</span>
<span class="hljs-comment">//             0.0701347,</span>
<span class="hljs-comment">//             0.32577968,</span>
<span class="hljs-comment">//             0.40943468</span>
<span class="hljs-comment">//         ],</span>
<span class="hljs-comment">//         &quot;tag&quot;: 8946,</span>
<span class="hljs-comment">//         &quot;id&quot;: 0</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;green&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;green_3039&quot;,</span>
<span class="hljs-comment">//         &quot;vector&quot;: [</span>
<span class="hljs-comment">//             0.90689456,</span>
<span class="hljs-comment">//             0.4377399,</span>
<span class="hljs-comment">//             0.75387514,</span>
<span class="hljs-comment">//             0.36454988,</span>
<span class="hljs-comment">//             0.8702918</span>
<span class="hljs-comment">//         ],</span>
<span class="hljs-comment">//         &quot;tag&quot;: 2341,</span>
<span class="hljs-comment">//         &quot;id&quot;: 1</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;white&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;white_8708&quot;,</span>
<span class="hljs-comment">//         &quot;vector&quot;: [</span>
<span class="hljs-comment">//             0.9757728,</span>
<span class="hljs-comment">//             0.13974023,</span>
<span class="hljs-comment">//             0.8023141,</span>
<span class="hljs-comment">//             0.61947155,</span>
<span class="hljs-comment">//             0.8290197</span>
<span class="hljs-comment">//         ],</span>
<span class="hljs-comment">//         &quot;tag&quot;: 9913,</span>
<span class="hljs-comment">//         &quot;id&quot;: 2</span>
<span class="hljs-comment">//     }}</span>
<span class="hljs-comment">// ]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. Get entities by id</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">get</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">ids</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>],
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>]
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     vector: [</span>
<span class="hljs-comment">//       0.16022394597530365,</span>
<span class="hljs-comment">//       0.6514875292778015,</span>
<span class="hljs-comment">//       0.18294484913349152,</span>
<span class="hljs-comment">//       0.30227693915367126,</span>
<span class="hljs-comment">//       0.47553086280822754</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;blue&#x27;, tag: 8907, color_tag: &#x27;blue_8907&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;0&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     vector: [</span>
<span class="hljs-comment">//       0.2459285855293274,</span>
<span class="hljs-comment">//       0.4974019527435303,</span>
<span class="hljs-comment">//       0.2154673933982849,</span>
<span class="hljs-comment">//       0.03719571232795715,</span>
<span class="hljs-comment">//       0.8348019123077393</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;grey&#x27;, tag: 3710, color_tag: &#x27;grey_3710&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;1&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     vector: [</span>
<span class="hljs-comment">//       0.9404329061508179,</span>
<span class="hljs-comment">//       0.49662265181541443,</span>
<span class="hljs-comment">//       0.8088793158531189,</span>
<span class="hljs-comment">//       0.9337621331214905,</span>
<span class="hljs-comment">//       0.8269071578979492</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;blue&#x27;, tag: 2993, color_tag: &#x27;blue_2993&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;2&#x27;</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Get-entities-from-partitions" class="common-anchor-header">从分区获取实体</h3><p>您还可以从特定分区中获取实体。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. Get entities from partitions</span>
res = client.get(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    ids=[<span class="hljs-number">1000</span>, <span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>],
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color&quot;: &quot;green&quot;,</span>
<span class="hljs-comment">#         &quot;tag&quot;: 1995,</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;green_1995&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 1000,</span>
<span class="hljs-comment">#         &quot;vector&quot;: [</span>
<span class="hljs-comment">#             0.7807706,</span>
<span class="hljs-comment">#             0.8083741,</span>
<span class="hljs-comment">#             0.17276904,</span>
<span class="hljs-comment">#             -0.8580777,</span>
<span class="hljs-comment">#             0.024156934</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">#         &quot;tag&quot;: 1995,</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;red_1995&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 1001,</span>
<span class="hljs-comment">#         &quot;vector&quot;: [</span>
<span class="hljs-comment">#             0.065074645,</span>
<span class="hljs-comment">#             -0.44882354,</span>
<span class="hljs-comment">#             -0.29479212,</span>
<span class="hljs-comment">#             -0.19798489,</span>
<span class="hljs-comment">#             -0.77542555</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color&quot;: &quot;green&quot;,</span>
<span class="hljs-comment">#         &quot;tag&quot;: 1995,</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;green_1995&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 1002,</span>
<span class="hljs-comment">#         &quot;vector&quot;: [</span>
<span class="hljs-comment">#             0.027934508,</span>
<span class="hljs-comment">#             -0.44199976,</span>
<span class="hljs-comment">#             -0.40262738,</span>
<span class="hljs-comment">#             -0.041511405,</span>
<span class="hljs-comment">#             0.024782438</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 5. Get entities by ID in a partition</span>
getReq = <span class="hljs-title class_">GetReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">ids</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(1001L, 1002L, 1003L))
    .<span class="hljs-title function_">partitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .<span class="hljs-title function_">build</span>();

entities = client.<span class="hljs-title function_">get</span>(getReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(entities));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;getResults&quot;: [</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;yellow&quot;,</span>
<span class="hljs-comment">//         &quot;vector&quot;: [</span>
<span class="hljs-comment">//             0.4300114,</span>
<span class="hljs-comment">//             0.599917,</span>
<span class="hljs-comment">//             0.799163,</span>
<span class="hljs-comment">//             0.75395125,</span>
<span class="hljs-comment">//             0.89947814</span>
<span class="hljs-comment">//         ],</span>
<span class="hljs-comment">//         &quot;id&quot;: 1001,</span>
<span class="hljs-comment">//         &quot;tag&quot;: 5803</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;blue&quot;,</span>
<span class="hljs-comment">//         &quot;vector&quot;: [</span>
<span class="hljs-comment">//             0.009218454,</span>
<span class="hljs-comment">//             0.64637834,</span>
<span class="hljs-comment">//             0.19815737,</span>
<span class="hljs-comment">//             0.30519038,</span>
<span class="hljs-comment">//             0.8218663</span>
<span class="hljs-comment">//         ],</span>
<span class="hljs-comment">//         &quot;id&quot;: 1002,</span>
<span class="hljs-comment">//         &quot;tag&quot;: 7212</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;black&quot;,</span>
<span class="hljs-comment">//         &quot;vector&quot;: [</span>
<span class="hljs-comment">//             0.76521933,</span>
<span class="hljs-comment">//             0.7818409,</span>
<span class="hljs-comment">//             0.16976339,</span>
<span class="hljs-comment">//             0.8719652,</span>
<span class="hljs-comment">//             0.1434964</span>
<span class="hljs-comment">//         ],</span>
<span class="hljs-comment">//         &quot;id&quot;: 1003,</span>
<span class="hljs-comment">//         &quot;tag&quot;: 1710</span>
<span class="hljs-comment">//     }}</span>
<span class="hljs-comment">// ]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5.1 Get entities by id in a partition</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">get</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">ids</span>: [<span class="hljs-number">1000</span>, <span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>],
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>],
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>]
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     id: &#x27;1000&#x27;,</span>
<span class="hljs-comment">//     vector: [</span>
<span class="hljs-comment">//       0.014254206791520119,</span>
<span class="hljs-comment">//       0.5817716121673584,</span>
<span class="hljs-comment">//       0.19793470203876495,</span>
<span class="hljs-comment">//       0.8064294457435608,</span>
<span class="hljs-comment">//       0.7745839357376099</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;white&#x27;, tag: 5996, color_tag: &#x27;white_5996&#x27; }</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     id: &#x27;1001&#x27;,</span>
<span class="hljs-comment">//     vector: [</span>
<span class="hljs-comment">//       0.6073881983757019,</span>
<span class="hljs-comment">//       0.05214758217334747,</span>
<span class="hljs-comment">//       0.730999231338501,</span>
<span class="hljs-comment">//       0.20900958776474,</span>
<span class="hljs-comment">//       0.03665429726243019</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;grey&#x27;, tag: 2834, color_tag: &#x27;grey_2834&#x27; }</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     id: &#x27;1002&#x27;,</span>
<span class="hljs-comment">//     vector: [</span>
<span class="hljs-comment">//       0.48877206444740295,</span>
<span class="hljs-comment">//       0.34028753638267517,</span>
<span class="hljs-comment">//       0.6527213454246521,</span>
<span class="hljs-comment">//       0.9763909578323364,</span>
<span class="hljs-comment">//       0.8031482100486755</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;pink&#x27;, tag: 9107, color_tag: &#x27;pink_9107&#x27; }</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Basic-Operators" class="common-anchor-header">使用基本运算符<button data-href="#Use-Basic-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>在本节中，您将找到如何在标量过滤中使用基本运算符的示例。您也可以将这些筛选器应用于<a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">向量搜索</a>和<a href="https://milvus.io/docs/insert-update-delete.md#Delete-entities">数据删除</a>。</p>
<div class="language-python">
<p>有关详细信息，请参阅 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md"><code translate="no">query()</code></a>中的</p>
</div>
<div class="language-java">
<p>更多信息，请参阅 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/query.md"><code translate="no">query()</code></a>以获取更多信息。</p>
</div>
<div class="language-javascript">
<p>更多信息，请参阅 <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/query.md"><code translate="no">query()</code></a>中的</p>
</div>
<ul>
<li><p>过滤标签值在 1,000 至 1,500 之间的实体。</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 6. Use basic operators</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;1000 &lt; tag &lt; 1500&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;color_tag&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 1,</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;pink_1023&quot;</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 41,</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;red_1483&quot;</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 44,</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;grey_1146&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 6. Use basic operators</span>

<span class="hljs-title class_">QueryReq</span> queryReq = <span class="hljs-title class_">QueryReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;1000 &lt; tag &lt; 1500&quot;</span>)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;color_tag&quot;</span>))
    .<span class="hljs-title function_">limit</span>(<span class="hljs-number">3</span>)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">QueryResp</span> queryResp = client.<span class="hljs-title function_">query</span>(queryReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(queryResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;queryResults&quot;: [</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;white_7588&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 34</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;orange_4989&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 64</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;white_3415&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 73</span>
<span class="hljs-comment">//     }}</span>
<span class="hljs-comment">// ]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 6. Use basic operators</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;1000 &lt; tag &lt; 1500&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color_tag&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;pink&#x27;, tag: 1050, color_tag: &#x27;pink_1050&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;6&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;purple&#x27;, tag: 1174, color_tag: &#x27;purple_1174&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;24&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;orange&#x27;, tag: 1023, color_tag: &#x27;orange_1023&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;40&#x27;</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>过滤<strong>颜色</strong>值设置为<strong>棕色</strong>的实体。</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color == &quot;brown&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;color_tag&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;brown_5343&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 15</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;brown_3167&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 27</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;brown_3100&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 30</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">queryReq = <span class="hljs-title class_">QueryReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;color == \&quot;brown\&quot;&quot;</span>)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;color_tag&quot;</span>))
    .<span class="hljs-title function_">limit</span>(<span class="hljs-number">3</span>)
    .<span class="hljs-title function_">build</span>();

queryResp = client.<span class="hljs-title function_">query</span>(queryReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(queryResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;queryResults&quot;: [</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;brown_7792&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 3</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;brown_9695&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 7</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;brown_2551&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 15</span>
<span class="hljs-comment">//     }}</span>
<span class="hljs-comment">// ]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;color == &quot;brown&quot;&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color_tag&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;brown&#x27;, tag: 6839, color_tag: &#x27;brown_6839&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;22&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;brown&#x27;, tag: 7849, color_tag: &#x27;brown_7849&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;32&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;brown&#x27;, tag: 7855, color_tag: &#x27;brown_7855&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;33&#x27;</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>过滤<strong>颜色</strong>值未设置为<strong>绿色</strong>和<strong>紫色的</strong>实体。</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color not in [&quot;green&quot;, &quot;purple&quot;]&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;color_tag&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;yellow_6781&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 0</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;pink_1023&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 1</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;blue_3972&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 2</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">queryReq = <span class="hljs-title class_">QueryReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;color not in [\&quot;green\&quot;, \&quot;purple\&quot;]&quot;</span>)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;color_tag&quot;</span>))
    .<span class="hljs-title function_">limit</span>(<span class="hljs-number">3</span>)
    .<span class="hljs-title function_">build</span>();

queryResp = client.<span class="hljs-title function_">query</span>(queryReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(queryResp));   

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;queryResults&quot;: [</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;white_4597&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 0</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;white_8708&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 2</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;brown_7792&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 3</span>
<span class="hljs-comment">//     }}</span>
<span class="hljs-comment">// ]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;color not in [&quot;green&quot;, &quot;purple&quot;]&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color_tag&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;blue&#x27;, tag: 8907, color_tag: &#x27;blue_8907&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;0&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;grey&#x27;, tag: 3710, color_tag: &#x27;grey_3710&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;1&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;blue&#x27;, tag: 2993, color_tag: &#x27;blue_2993&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;2&#x27;</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>过滤颜色标记以<strong>红色</strong>开头的文章。</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color_tag like &quot;red%&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;color_tag&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;red_6443&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 17</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;red_1483&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 41</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;red_4348&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 47</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">queryReq = <span class="hljs-title class_">QueryReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;color_tag like \&quot;red%\&quot;&quot;</span>)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;color_tag&quot;</span>))
    .<span class="hljs-title function_">limit</span>(<span class="hljs-number">3</span>)
    .<span class="hljs-title function_">build</span>();

queryResp = client.<span class="hljs-title function_">query</span>(queryReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(queryResp));  

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;queryResults&quot;: [</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;red_4929&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 9</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;red_8284&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 13</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;red_3021&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 44</span>
<span class="hljs-comment">//     }}</span>
<span class="hljs-comment">// ]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;color_tag like &quot;red%&quot;&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color_tag&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;red&#x27;, tag: 8773, color_tag: &#x27;red_8773&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;17&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;red&#x27;, tag: 9197, color_tag: &#x27;red_9197&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;34&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;red&#x27;, tag: 7914, color_tag: &#x27;red_7914&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;46&#x27;</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>过滤颜色设置为红色且标签值在 1,000 至 1,500 范围内的实体。</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;(color == &quot;red&quot;) and (1000 &lt; tag &lt; 1500)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;color_tag&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;red_1483&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 41</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;red_1100&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 94</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;red_1343&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 526</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">queryReq = <span class="hljs-title class_">QueryReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;(color == \&quot;red\&quot;) and (1000 &lt; tag &lt; 1500)&quot;</span>)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;color_tag&quot;</span>))
    .<span class="hljs-title function_">limit</span>(<span class="hljs-number">3</span>)
    .<span class="hljs-title function_">build</span>();

queryResp = client.<span class="hljs-title function_">query</span>(queryReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(queryResp));  

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;queryResults&quot;: [</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;red_8124&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 83</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;red_5358&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 501</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;red_3564&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 638</span>
<span class="hljs-comment">//     }}</span>
<span class="hljs-comment">// ]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;(color == &quot;red&quot;) and (1000 &lt; tag &lt; 1500)&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color_tag&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;red&#x27;, tag: 1436, color_tag: &#x27;red_1436&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;67&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;red&#x27;, tag: 1463, color_tag: &#x27;red_1463&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;160&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;red&#x27;, tag: 1073, color_tag: &#x27;red_1073&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;291&#x27;</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Use-Advanced-Operators" class="common-anchor-header">使用高级操作符<button data-href="#Use-Advanced-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>本节将举例说明如何在标量过滤中使用高级运算符。您也可以将这些筛选器应用于<a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">向量搜索</a>和<a href="https://milvus.io/docs/insert-update-delete.md#Delete-entities">数据删除</a>。</p>
<h3 id="Count-entities" class="common-anchor-header">计数实体</h3><ul>
<li><p>计算集合中实体的总数。</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Use advanced operators</span>

<span class="hljs-comment"># Count the total number of entities in a collection</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;count(*)&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;count(*)&quot;: 2000</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 7. Use advanced operators</span>
<span class="hljs-comment">// Count the total number of entities in the collection</span>
queryReq = <span class="hljs-title class_">QueryReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;&quot;</span>)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;count(*)&quot;</span>))
    .<span class="hljs-title function_">build</span>();

queryResp = client.<span class="hljs-title function_">query</span>(queryReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(queryResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;queryResults&quot;: [{&quot;entity&quot;: {&quot;count(*)&quot;: 2000}}]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Use advanced operators</span>
<span class="hljs-comment">// Count the total number of entities in a collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;count(*)&quot;</span>]
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)   

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ { &#x27;count(*)&#x27;: &#x27;2000&#x27; } ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>计算特定分区中实体的总数。</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Count the number of entities in a partition</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;count(*)&quot;</span>],
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;count(*)&quot;: 500</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Count the number of entities in a partition</span>
queryReq = <span class="hljs-title class_">QueryReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">partitionNames</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;partitionA&quot;</span>))
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;&quot;</span>)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;count(*)&quot;</span>))
    .<span class="hljs-title function_">build</span>();

queryResp = client.<span class="hljs-title function_">query</span>(queryReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(queryResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;queryResults&quot;: [{&quot;entity&quot;: {&quot;count(*)&quot;: 500}}]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Count the number of entities in a partition</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;count(*)&quot;</span>],
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)     

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ { &#x27;count(*)&#x27;: &#x27;500&#x27; } ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>统计符合过滤条件的实体数量</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Count the number of entities that match a specific filter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;(color == &quot;red&quot;) and (1000 &lt; tag &lt; 1500)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;count(*)&quot;</span>],
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;count(*)&quot;: 3</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Count the number of entities that match a specific filter</span>
queryReq = <span class="hljs-title class_">QueryReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;(color == \&quot;red\&quot;) and (1000 &lt; tag &lt; 1500)&quot;</span>)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;count(*)&quot;</span>))
    .<span class="hljs-title function_">build</span>();

queryResp = client.<span class="hljs-title function_">query</span>(queryReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(queryResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;queryResults&quot;: [{&quot;entity&quot;: {&quot;count(*)&quot;: 7}}]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Count the number of entities that match a specific filter</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;(color == &quot;red&quot;) and (1000 &lt; tag &lt; 1500)&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;count(*)&quot;</span>]
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)   

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ { &#x27;count(*)&#x27;: &#x27;10&#x27; } ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Reference-on-scalar-filters" class="common-anchor-header">标量过滤器参考<button data-href="#Reference-on-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Basic-Operators" class="common-anchor-header">基本运算符</h3><p><strong>布尔表达式</strong>始终是<strong>由字段名和操作符组成的字符串</strong>。本节将详细介绍基本运算符。</p>
<table>
<thead>
<tr><th><strong>操作符</strong></th><th><strong>说明</strong></th></tr>
</thead>
<tbody>
<tr><td><strong>和 (&amp;&amp;)</strong></td><td>如果两个操作数都为真，则为真</td></tr>
<tr><td><strong>或 (||)</strong></td><td>如果任一操作数为真，则为真</td></tr>
<tr><td><strong>+, -, *, /</strong></td><td>加法、减法、乘法和除法</td></tr>
<tr><td><strong>**</strong></td><td>指数</td></tr>
<tr><td><strong>%</strong></td><td>模数</td></tr>
<tr><td><strong>&lt;, &gt;</strong></td><td>小于、大于</td></tr>
<tr><td><strong>==, !=</strong></td><td>等于，不等于</td></tr>
<tr><td><strong>&lt;=, &gt;=</strong></td><td>小于或等于，大于或等于</td></tr>
<tr><td><strong>不等于</strong></td><td>逆转给定条件的结果。</td></tr>
<tr><td><strong>相似</strong></td><td>使用通配符将一个值与类似值进行比较。<br/> 例如，like &quot;prefix%&quot;匹配以 &quot;prefix &quot;开头的字符串。</td></tr>
<tr><td><strong>in</strong></td><td>测试表达式是否匹配值列表中的任何值。</td></tr>
</tbody>
</table>
<h3 id="Advanced-operators" class="common-anchor-header">高级运算符</h3><ul>
<li><p><code translate="no">count(*)</code></p>
<p>计算集合中实体的确切数量。将其用作输出字段，可获得集合或分区中实体的确切数目。</p>
<p><div class="admonition note"></p>
<p><p><b>注释</b></p></p>
<p><p>这适用于已加载的集合。应将其作为唯一的输出字段。</p></p>
<p></div></p></li>
</ul>
