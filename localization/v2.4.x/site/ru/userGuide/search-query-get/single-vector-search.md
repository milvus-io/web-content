---
id: single-vector-search.md
order: 1
summary: >-
  В этой статье описывается, как искать векторы в коллекции Milvus с помощью
  одного вектора запроса.
title: Одновекторный поиск
---
<h1 id="Single-Vector-Search" class="common-anchor-header">Одновекторный поиск<button data-href="#Single-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>После того как вы вставили свои данные, следующим шагом будет выполнение поиска сходства в вашей коллекции в Milvus.</p>
<p>Milvus позволяет проводить два типа поиска, в зависимости от количества векторных полей в вашей коллекции:</p>
<ul>
<li><strong>Одновекторный поиск</strong>: Если в вашей коллекции только одно векторное поле, используйте метод <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a> для поиска наиболее похожих сущностей. Этот метод сравнивает вектор запроса с существующими векторами в вашей коллекции и возвращает идентификаторы ближайших совпадений вместе с расстояниями между ними. В качестве опции он также может возвращать значения векторов и метаданные результатов.</li>
<li><strong>Гибридный поиск</strong>: Для коллекций с двумя или более векторными полями используйте метод <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a> метод. Этот метод выполняет несколько поисковых запросов по методу приближенных ближайших соседей (ANN) и объединяет результаты, чтобы вернуть наиболее релевантные совпадения после повторного ранжирования.</li>
</ul>
<p>Это руководство посвящено тому, как выполнять одновекторный поиск в Milvus. Подробные сведения о гибридном поиске см. в разделе <a href="https://milvus.io/docs/multi-vector-search.md">Гибридный поиск</a>.</p>
<h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Существует множество типов поиска, отвечающих различным требованиям:</p>
<ul>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Basic-search">Базовый поиск</a>: Включает поиск по одному вектору, поиск по большому вектору, поиск по разделам и поиск с заданными полями вывода.</p></li>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">Фильтрованный поиск</a>: Применяет критерии фильтрации на основе скалярных полей для уточнения результатов поиска.</p></li>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Range-search">Поиск в диапазоне</a>: Находит векторы в определенном диапазоне расстояний от вектора запроса.</p></li>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">Группировка поиска</a>: Группирует результаты поиска на основе определенного поля, чтобы обеспечить разнообразие результатов.</p></li>
</ul>
<h2 id="Preparations" class="common-anchor-header">Подготовка<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>В приведенном ниже фрагменте кода используется существующий код для установления соединения с Milvus и быстрой настройки коллекции.</p>
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
<h2 id="Basic-search" class="common-anchor-header">Базовый поиск<button data-href="#Basic-search" class="anchor-icon" translate="no">
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
    </button></h2><p>При отправке запроса <code translate="no">search</code> вы можете предоставить одно или несколько векторных значений, представляющих вкрапления запроса, и значение <code translate="no">limit</code>, указывающее количество возвращаемых результатов.</p>
<p>В зависимости от ваших данных и вектора запроса, вы можете получить меньше, чем <code translate="no">limit</code> результатов. Это происходит, когда <code translate="no">limit</code> больше, чем количество возможных векторов, соответствующих вашему запросу.</p>
<h3 id="Single-vector-search" class="common-anchor-header">Одновекторный поиск</h3><p>Одновекторный поиск - это простейшая форма операций <code translate="no">search</code> в Milvus, предназначенная для поиска наиболее похожих векторов на заданный вектор запроса.</p>
<p>Чтобы выполнить одновекторный поиск, укажите имя целевой коллекции, вектор запроса и желаемое количество результатов (<code translate="no">limit</code>). Эта операция возвращает набор результатов, состоящий из наиболее похожих векторов, их идентификаторов и расстояний до вектора запроса.</p>
<p>Приведем пример поиска 5 сущностей, наиболее похожих на вектор запроса:</p>
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
      <th>Параметр</th>
      <th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>Имя существующей коллекции.</td>
    </tr>
    <tr>
      <td><code translate="no">data</code></td>
      <td>Список векторных вкраплений.<br/>Milvus ищет векторные вкрапления, наиболее похожие на указанные.</td>
    </tr>
    <tr>
      <td><code translate="no">limit</code></td>
      <td>Общее количество возвращаемых сущностей.<br/>Вы можете использовать этот параметр в сочетании со <strong>смещением</strong> в <strong>param</strong>, чтобы включить пагинацию.<br/>Сумма этого значения и <strong>смещения</strong> в <strong>param</strong> должна быть меньше 16 384.</td>
    </tr>
    <tr>
      <td><code translate="no">search_params</code></td>
      <td>Настройки параметров, специфичные для данной операции.<br/><ul><li><code translate="no">metric_type</code>: Тип метрики, применяемый к данной операции. Он должен совпадать с тем, который используется при индексации векторного поля, указанного выше. Возможные значения: <strong>L2</strong>, <strong>IP</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>.</li><li><code translate="no">params</code>: Дополнительные параметры. Подробнее см. в разделе <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md">Поиск()</a>.</li></ul></td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>Параметр</th>
      <th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collectionName</code></td>
      <td>Имя существующей коллекции.</td>
    </tr>
    <tr>
      <td><code translate="no">data</code></td>
      <td>Список векторных вкраплений.<br/>Milvus ищет векторные вкрапления, наиболее похожие на указанные.</td>
    </tr>
    <tr>
      <td><code translate="no">topK</code></td>
      <td>Количество записей, возвращаемых в результате поиска. Этот параметр использует тот же синтаксис, что и параметр <strong>limit</strong>, поэтому следует задавать только один из них.<br/>Вы можете использовать этот параметр в сочетании с параметром <strong>offset</strong> в <strong>param</strong>, чтобы включить пагинацию.<br/>Сумма этого значения и параметра <strong>offset</strong> в <strong>param</strong> должна быть меньше 16 384.</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>Параметр</th>
      <th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>Имя существующей коллекции.</td>
    </tr>
    <tr>
      <td><code translate="no">data</code></td>
      <td>Список векторных вкраплений.<br/>Milvus ищет наиболее похожие на указанные векторные вкрапления.</td>
    </tr>
    <tr>
      <td><code translate="no">limit</code></td>
      <td>Общее количество возвращаемых сущностей.<br/>Вы можете использовать этот параметр в сочетании со <strong>смещением</strong> в <strong>param</strong>, чтобы включить пагинацию.<br/>Сумма этого значения и <strong>смещения</strong> в <strong>param</strong> должна быть меньше 16 384.</td>
    </tr>
  </tbody>
</table>
<p>Выходные данные похожи на следующие:</p>
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
<p>На выходе вы увидите 5 ближайших соседей к вектору вашего запроса, включая их уникальные идентификаторы и рассчитанные расстояния.</p>
<h3 id="Bulk-vector-search" class="common-anchor-header">Поиск по объемному вектору</h3><p>Поиск по большому вектору расширяет концепцию <a href="https://milvus.io/docs/single-vector-search.md#Single-Vector-Search">поиска по одному вектору</a>, позволяя искать несколько векторов запроса в одном запросе. Этот тип поиска идеально подходит для сценариев, в которых необходимо найти похожие векторы для набора векторов запроса, что значительно сокращает время и необходимые вычислительные ресурсы.</p>
<p>При массовом векторном поиске в поле <code translate="no">data</code> можно указать несколько векторов запроса. Система обрабатывает эти векторы параллельно, возвращая для каждого вектора запроса отдельный набор результатов, каждый из которых содержит наиболее близкие совпадения, найденные в коллекции.</p>
<p>Вот пример поиска двух разных наборов наиболее похожих сущностей из двух векторов запросов:</p>
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
<p>Результат похож на следующий:</p>
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
<p>Результаты включают в себя два набора ближайших соседей, по одному для каждого вектора запроса, что демонстрирует эффективность поиска по массовым векторам при работе с несколькими векторами запроса одновременно.</p>
<h3 id="Partition-search" class="common-anchor-header">Поиск по разделам</h3><p>Поиск по разделам сужает область поиска до определенного подмножества или раздела коллекции. Это особенно полезно для организованных наборов данных, где данные разделены на логические или категориальные разделы, что позволяет ускорить поисковые операции за счет уменьшения объема данных для сканирования.</p>
<p>Чтобы выполнить поиск по разделам, просто укажите имя целевого раздела в запросе <code translate="no">partition_names</code>. Это указывает на то, что операция <code translate="no">search</code> рассматривает только векторы в пределах указанного раздела.</p>
<p>Вот пример поиска сущностей в <code translate="no">red</code>:</p>
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
<p>Результат похож на следующий:</p>
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
<p>Затем выполните поиск сущностей на сайте <code translate="no">blue</code>:</p>
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
<p>Результат похож на следующий:</p>
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
<p>Данные в <code translate="no">red</code> отличаются от данных в <code translate="no">blue</code>. Поэтому результаты поиска будут ограничены указанным разделом, отражающим уникальные характеристики и распределение данных в этом подмножестве.</p>
<h3 id="Search-with-output-fields" class="common-anchor-header">Поиск с полями вывода</h3><p>Поиск с полями вывода позволяет указать, какие атрибуты или поля сопоставленных векторов должны быть включены в результаты поиска.</p>
<p>Вы можете указать <code translate="no">output_fields</code> в запросе, чтобы вернуть результаты с определенными полями.</p>
<p>Вот пример возврата результатов со значениями атрибутов <code translate="no">color</code>:</p>
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
<p>Результат похож на следующий:</p>
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
<p>Наряду с ближайшими соседями результаты поиска будут включать указанное поле <code translate="no">color</code>, обеспечивая более богатый набор информации для каждого совпадающего вектора.</p>
<h2 id="Filtered-search" class="common-anchor-header">Фильтрованный поиск<button data-href="#Filtered-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Фильтрованный поиск применяет скалярные фильтры к векторному поиску, позволяя уточнять результаты поиска по определенным критериям. Дополнительные сведения о выражениях фильтрации можно найти в разделе <a href="https://milvus.io/docs/boolean.md">Правила булевых выражений</a>, а примеры - в разделе <a href="https://milvus.io/docs/get-and-scalar-query.md">Получить и скалярный запрос</a>.</p>
<h3 id="Use-the-like-operator" class="common-anchor-header">Использование оператора <code translate="no">like</code> </h3><p>Оператор <code translate="no">like</code> улучшает поиск строк, оценивая шаблоны, включающие префиксы, инфиксы и суффиксы:</p>
<ul>
<li><strong>Поиск по префиксу</strong>: чтобы найти значения, начинающиеся с определенного префикса, используйте синтаксис <code translate="no">'like &quot;prefix%&quot;'</code>.</li>
<li><strong>Инфиксное сопоставление</strong>: чтобы найти значения, содержащие определенную последовательность символов в любом месте строки, используйте синтаксис <code translate="no">'like &quot;%infix%&quot;'</code>.</li>
<li><strong>Поиск по суффиксу</strong>: чтобы найти значения, заканчивающиеся определенным суффиксом, используйте синтаксис <code translate="no">'like &quot;%suffix&quot;'</code>.</li>
</ul>
<p>Для поиска по одному символу подчеркивание (<code translate="no">_</code>) действует как подстановочный знак для одного символа, например, <code translate="no">'like &quot;y_llow&quot;'</code>.</p>
<h3 id="Special-characters-in-search-strings" class="common-anchor-header">Специальные символы в строках поиска</h3><p>Если вы хотите найти строку, содержащую специальные символы, такие как подчеркивание (<code translate="no">_</code>) или знаки процента (<code translate="no">%</code>), которые обычно используются в качестве подстановочных знаков в шаблонах поиска (<code translate="no">_</code> для любого одиночного символа и <code translate="no">%</code> для любой последовательности символов), вы должны экранировать эти символы, чтобы рассматривать их как литеральные символы. Для экранирования специальных символов используйте обратную косую черту (<code translate="no">\</code>) и не забывайте экранировать саму обратную косую черту. Например:</p>
<ul>
<li>Чтобы найти буквальное подчеркивание, используйте <code translate="no">\\_</code>.</li>
<li>Для поиска буквального знака процента используйте <code translate="no">\\%</code>.</li>
</ul>
<p>Таким образом, если вам нужно найти текст <code translate="no">&quot;_version_&quot;</code>, ваш запрос должен быть оформлен как <code translate="no">'like &quot;\\_version\\_&quot;'</code>, чтобы подчеркивания рассматривались как часть поискового запроса, а не как подстановочные знаки.</p>
<p>Фильтруйте результаты, чей <strong>цвет</strong> имеет <strong>красный</strong> префикс:</p>
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
<p>Результат похож на следующий:</p>
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
<p>Фильтруйте результаты, <strong>цвет</strong> которых содержит буквы <strong>ll</strong> в любом месте строки:</p>
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
<p>Результат похож на следующий:</p>
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
<h2 id="Range-search" class="common-anchor-header">Поиск по диапазону<button data-href="#Range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Поиск по диапазону позволяет найти векторы, находящиеся в определенном диапазоне расстояний от вектора запроса.</p>
<p>Задав <code translate="no">radius</code> и дополнительно <code translate="no">range_filter</code>, вы можете настроить широту поиска, чтобы включить в него векторы, которые в некоторой степени похожи на вектор запроса, обеспечивая более полное представление о потенциальных совпадениях.</p>
<ul>
<li><p><code translate="no">radius</code>: Определяет внешнюю границу пространства поиска. Только векторы, находящиеся на этом расстоянии от вектора запроса, считаются потенциальными совпадениями.</p></li>
<li><p><code translate="no">range_filter</code>: В то время как <code translate="no">radius</code> задает внешнюю границу поиска, <code translate="no">range_filter</code> может быть дополнительно использован для определения внутренней границы, создавая диапазон расстояний, в который должны попасть векторы, чтобы считаться совпадениями.</p></li>
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
<p>Результат похож на следующий:</p>
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
<p>Вы увидите, что все возвращенные сущности имеют расстояние от вектора запроса в диапазоне от 0,8 до 1,0.</p>
<p>Параметры <code translate="no">radius</code> и <code translate="no">range_filter</code> зависят от типа используемой метрики.</p>
<table>
<thead>
<tr><th><strong>Тип метрики</strong></th><th><strong>Характеристики</strong></th><th><strong>Диапазон Параметры поиска</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>Меньшие расстояния L2 указывают на большую схожесть.</td><td>Чтобы исключить из результатов наиболее близкие векторы, убедитесь, что:<br/> <code translate="no">range_filter</code> &lt;= distance &lt; <code translate="no">radius</code></td></tr>
<tr><td><code translate="no">IP</code></td><td>Большие расстояния IP указывают на большее сходство.</td><td>Чтобы исключить из результатов наиболее близкие векторы, убедитесь, что:<br/> <code translate="no">radius</code> &lt; расстояние &lt;= <code translate="no">range_filter</code></td></tr>
<tr><td><code translate="no">COSINE</code></td><td>Большее значение косинуса указывает на большее сходство.</td><td>Чтобы исключить наиболее близкие векторы из результатов, убедитесь, что:<br/> <code translate="no">radius</code> &lt; расстояние &lt;= <code translate="no">range_filter</code></td></tr>
<tr><td><code translate="no">JACCARD</code></td><td>Меньшее значение расстояния Жаккара указывает на большее сходство.</td><td>Чтобы исключить из результатов наиболее близкие векторы, убедитесь, что:<br/> <code translate="no">range_filter</code> &lt;= расстояние &lt; <code translate="no">radius</code></td></tr>
<tr><td><code translate="no">HAMMING</code></td><td>Меньшие расстояния Хэмминга указывают на большее сходство.</td><td>Чтобы исключить из результатов наиболее близкие векторы, убедитесь, что:<br/> <code translate="no">range_filter</code> &lt;= расстояние &lt; <code translate="no">radius</code></td></tr>
</tbody>
</table>
<p>Чтобы узнать больше о типах метрик расстояния, обратитесь к разделу <a href="/docs/ru/v2.4.x/metric.md">Метрики сходства</a>.</p>
<h2 id="Grouping-search" class="common-anchor-header">Группировочный поиск<button data-href="#Grouping-search" class="anchor-icon" translate="no">
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
    </button></h2><p>В Milvus поиск по группам предназначен для повышения полноты и точности результатов поиска.</p>
<p>Рассмотрим сценарий в RAG, где множество документов разделено на различные отрывки, и каждый отрывок представлен одним векторным вложением. Пользователи хотят найти наиболее релевантные отрывки для точной подсказки LLM. Обычная функция поиска Milvus может удовлетворить это требование, но это может привести к сильно перекошенным и необъективным результатам: большинство отрывков происходит только из нескольких документов, и полнота результатов поиска очень низкая. Это может серьезно ухудшить точность или даже корректность результатов, выдаваемых LLM, и негативно повлиять на опыт пользователей LLM.</p>
<p>Группировочный поиск может эффективно решить эту проблему. Передав запрос <code translate="no">group_by_field</code>, пользователи Milvus могут разбить результаты поиска на несколько групп. Эта функция может значительно повысить полноту и справедливость результатов поиска, заметно улучшив качество выдачи LLM.</p>
<p>Ниже приведен пример кода для группировки результатов поиска по полю:</p>
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
<p>Результат будет выглядеть следующим образом:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_7&quot;</span>, <span class="hljs-string">&quot;doc_7&quot;</span>, <span class="hljs-string">&quot;doc_3&quot;</span>, <span class="hljs-string">&quot;doc_3&quot;</span>, <span class="hljs-string">&quot;doc_2&quot;</span>, <span class="hljs-string">&quot;doc_2&quot;</span>, <span class="hljs-string">&quot;doc_8&quot;</span>, <span class="hljs-string">&quot;doc_8&quot;</span>]
[<span class="hljs-meta">5, 10, 11, 10, 9, 6, 5, 4, 9, 2</span>]
<button class="copy-code-btn"></button></code></pre>
<p>В приведенной выдаче видно, что для каждого документа найдено ровно по два отрывка, а всего в результате получено 5 документов.</p>
<p>Для сравнения давайте закомментируем параметры, связанные с группой, и проведем обычный поиск:</p>
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
<p>Результат будет выглядеть следующим образом:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>]
[<span class="hljs-meta">1, 10, 3, 12, 9</span>]
<button class="copy-code-btn"></button></code></pre>
<p>В приведенной выдаче можно заметить, что "doc_11" полностью доминирует в результатах поиска, заслоняя собой качественные абзацы из других документов, что может быть плохой подсказкой для LLM.</p>
<p><strong>Ограничения</strong></p>
<ul>
<li><p><strong>Индексирование</strong>: Эта функция группировки работает только для коллекций, проиндексированных этими типами индексов: <strong>FLAT</strong>, <strong>IVF_FLAT</strong>, <strong>IVF_SQ8</strong>, <strong>HNSW</strong>, <strong>DISKANN</strong>, <strong>SPARSE_INVERTED_INDEX</strong>.</p></li>
<li><p><strong>Вектор</strong>: В настоящее время группировочный поиск не поддерживает векторное поле типа <strong>BINARY_VECTOR</strong>. Дополнительные сведения о типах данных см. в разделе <a href="https://milvus.io/docs/schema.md#Supported-data-types">Поддерживаемые типы данных</a>.</p></li>
<li><p><strong>Поле</strong>: В настоящее время группировочный поиск позволяет использовать только один столбец. Вы не можете указать несколько имен полей в конфигурации <code translate="no">group_by_field</code>.  Кроме того, группировочный поиск несовместим с типами данных JSON, FLOAT, DOUBLE, ARRAY или векторными полями.</p></li>
<li><p><strong>Влияние на производительность</strong>: Помните, что производительность снижается с увеличением количества векторов запросов. На примере кластера с 2 ядрами ЦП и 8 ГБ памяти время выполнения группировочного поиска увеличивается пропорционально количеству входных векторов запросов.</p></li>
<li><p><strong>Функциональность</strong>: В настоящее время группирующий поиск не поддерживается <a href="https://milvus.io/docs/single-vector-search.md#Range-search">поиском по диапазону</a>, <a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">итераторами поиска</a></p></li>
</ul>
<h2 id="Search-parameters" class="common-anchor-header">Параметры поиска<button data-href="#Search-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>В вышеперечисленных видах поиска, за исключением поиска по диапазону, применяются параметры поиска по умолчанию. В обычных случаях задавать параметры поиска вручную не требуется.</p>
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
<p>В следующей таблице перечислены все возможные настройки параметров поиска.</p>
<table>
<thead>
<tr><th><strong>Имя параметра</strong></th><th><strong>Описание параметра</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>Способ измерения сходства между векторными вкраплениями.<br/> Возможные значения: <code translate="no">IP</code>, <code translate="no">L2</code>, <code translate="no">COSINE</code>, <code translate="no">JACCARD</code>, <code translate="no">HAMMING</code>, по умолчанию - значение загруженного индексного файла.</td></tr>
<tr><td><code translate="no">params.nprobe</code></td><td>Количество единиц для запроса во время поиска.<br/> Значение находится в диапазоне [1, nlist<sub>[1]</sub>].</td></tr>
<tr><td><code translate="no">params.level</code></td><td>Уровень точности поиска.<br/> Возможные значения: <code translate="no">1</code>, <code translate="no">2</code> и <code translate="no">3</code>, по умолчанию - <code translate="no">1</code>. Более высокие значения дают более точные результаты, но снижают производительность.</td></tr>
<tr><td><code translate="no">params.radius</code></td><td>Определяет внешнюю границу пространства поиска. Только векторы, находящиеся на этом расстоянии от вектора запроса, считаются потенциальными совпадениями.<br/>Диапазон значений определяется параметром <code translate="no">metric_type</code>. Например, если для параметра <code translate="no">metric_type</code> задано значение <code translate="no">L2</code>, допустимым диапазоном значений будет <code translate="no">[0, ∞]</code>. Если для параметра <code translate="no">metric_type</code> задано значение <code translate="no">COSINE</code>, допустимым диапазоном значений будет <code translate="no">[-1, 1]</code>. Дополнительные сведения см. в разделе <a href="/docs/ru/v2.4.x/metric.md">Метрики сходства</a>.</td></tr>
<tr><td><code translate="no">params.range_filter</code></td><td>В то время как параметр <code translate="no">radius</code> задает внешнюю границу поиска, параметр <code translate="no">range_filter</code> можно использовать для определения внутренней границы, создавая диапазон расстояний, в который должны попадать векторы, чтобы считаться совпадающими.<br/>Диапазон значений определяется параметром <code translate="no">metric_type</code>. Например, если для параметра <code translate="no">metric_type</code> задано значение <code translate="no">L2</code>, то допустимым диапазоном значений является <code translate="no">[0, ∞]</code>. Если для параметра <code translate="no">metric_type</code> задано значение <code translate="no">COSINE</code>, то допустимым диапазоном значений является <code translate="no">[-1, 1]</code>. Дополнительные сведения см. в разделе <a href="/docs/ru/v2.4.x/metric.md">Метрики сходства</a>.</td></tr>
</tbody>
</table>
<div class="admonition note">
<p><strong>примечания</strong></p>
<p>[1] Количество единиц кластера после индексирования. При индексировании коллекции Milvus разбивает векторные данные на несколько кластеров, количество которых зависит от фактических настроек индекса.</p>
<p>[2] Количество сущностей, возвращаемых при поиске.</p>
</div>
