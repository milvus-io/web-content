---
id: single-vector-search.md
order: 1
summary: >-
  Artikel ini menjelaskan cara mencari vektor dalam koleksi Milvus menggunakan
  vektor kueri tunggal.
title: Pencarian Vektor Tunggal
---
<h1 id="Single-Vector-Search" class="common-anchor-header">Pencarian Vektor Tunggal<button data-href="#Single-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Setelah Anda memasukkan data Anda, langkah selanjutnya adalah melakukan pencarian kemiripan pada koleksi Anda di Milvus.</p>
<p>Milvus memungkinkan Anda untuk melakukan dua jenis pencarian, tergantung pada jumlah bidang vektor dalam koleksi Anda:</p>
<ul>
<li><strong>Pencarian vektor tunggal</strong>: Jika koleksi Anda hanya memiliki satu bidang vektor, gunakan metode <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a> untuk menemukan entitas yang paling mirip. Metode ini membandingkan vektor kueri Anda dengan vektor yang ada dalam koleksi Anda dan mengembalikan ID dari kecocokan terdekat beserta jarak di antara keduanya. Secara opsional, metode ini juga dapat mengembalikan nilai vektor dan metadata dari hasil pencarian.</li>
<li><strong>Pencarian hibrida</strong>: Untuk koleksi dengan dua atau lebih bidang vektor, gunakan metode <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a> metode. Metode ini melakukan beberapa permintaan pencarian Approximate Nearest Neighbor (ANN) dan menggabungkan hasilnya untuk mengembalikan kecocokan yang paling relevan setelah pemeringkatan ulang.</li>
</ul>
<p>Panduan ini berfokus pada cara melakukan pencarian vektor tunggal di Milvus. Untuk detail tentang pencarian hibrida, lihat <a href="https://milvus.io/docs/multi-vector-search.md">Pencarian hibrida</a>.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Ada berbagai jenis pencarian untuk memenuhi kebutuhan yang berbeda:</p>
<ul>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Basic-search">Pencarian dasar</a>: Termasuk pencarian vektor tunggal, pencarian vektor massal, pencarian partisi, dan pencarian dengan bidang keluaran tertentu.</p></li>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">Pencarian yang difilter</a>: Menerapkan kriteria pemfilteran berdasarkan bidang skalar untuk mempersempit hasil pencarian.</p></li>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Range-search">Pencarian rentang</a>: Menemukan vektor dalam rentang jarak tertentu dari vektor kueri.</p></li>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">Pencarian pengelompokan</a>: Mengelompokkan hasil pencarian berdasarkan bidang tertentu untuk memastikan keragaman hasil.</p></li>
</ul>
<h2 id="Preparations" class="common-anchor-header">Persiapan<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>Cuplikan kode di bawah ini menggunakan kembali kode yang sudah ada untuk membuat koneksi ke Milvus dan dengan cepat menyiapkan koleksi.</p>
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
<h2 id="Basic-search" class="common-anchor-header">Pencarian dasar<button data-href="#Basic-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Saat mengirimkan permintaan <code translate="no">search</code>, Anda dapat memberikan satu atau beberapa nilai vektor yang mewakili sematan kueri Anda dan nilai <code translate="no">limit</code> yang menunjukkan jumlah hasil yang akan dikembalikan.</p>
<p>Bergantung pada data dan vektor kueri Anda, Anda mungkin mendapatkan hasil yang lebih sedikit dari <code translate="no">limit</code>. Hal ini terjadi jika <code translate="no">limit</code> lebih besar daripada jumlah vektor yang mungkin cocok untuk kueri Anda.</p>
<h3 id="Single-vector-search" class="common-anchor-header">Pencarian vektor tunggal</h3><p>Pencarian vektor tunggal adalah bentuk paling sederhana dari operasi <code translate="no">search</code> di Milvus, yang dirancang untuk menemukan vektor yang paling mirip dengan vektor kueri yang diberikan.</p>
<p>Untuk melakukan pencarian vektor tunggal, tentukan nama koleksi target, vektor kueri, dan jumlah hasil yang diinginkan (<code translate="no">limit</code>). Operasi ini mengembalikan kumpulan hasil yang terdiri dari vektor-vektor yang paling mirip, ID, dan jaraknya dari vektor kueri.</p>
<p>Berikut ini adalah contoh pencarian 5 entitas teratas yang paling mirip dengan vektor kueri:</p>
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
      <th>Parameter</th>
      <th>Deskripsi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>Nama koleksi yang sudah ada.</td>
    </tr>
    <tr>
      <td><code translate="no">data</code></td>
      <td>Daftar sematan vektor.<br/>Milvus mencari sematan vektor yang paling mirip dengan yang ditentukan.</td>
    </tr>
    <tr>
      <td><code translate="no">limit</code></td>
      <td>Jumlah total entitas yang akan dikembalikan.<br/>Anda dapat menggunakan parameter ini bersama dengan <strong>offset</strong> in <strong>param</strong> untuk mengaktifkan pagination.<br/>Jumlah nilai ini dan <strong>offset</strong> in <strong>param</strong> harus kurang dari 16.384.</td>
    </tr>
    <tr>
      <td><code translate="no">search_params</code></td>
      <td>Pengaturan parameter khusus untuk operasi ini.<br/><ul><li><code translate="no">metric_type</code>: Jenis metrik yang diterapkan pada operasi ini. Ini harus sama dengan yang digunakan saat Anda mengindeks bidang vektor yang ditentukan di atas. Nilai yang mungkin adalah <strong>L2</strong>, <strong>IP</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>.</li><li><code translate="no">params</code>: Parameter tambahan. Untuk detailnya, lihat <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md">search()</a>.</li></ul></td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Deskripsi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collectionName</code></td>
      <td>Nama koleksi yang sudah ada.</td>
    </tr>
    <tr>
      <td><code translate="no">data</code></td>
      <td>Daftar sematan vektor.<br/>Milvus mencari sematan vektor yang paling mirip dengan yang ditentukan.</td>
    </tr>
    <tr>
      <td><code translate="no">topK</code></td>
      <td>Jumlah rekaman yang akan dikembalikan dalam hasil pencarian. Parameter ini menggunakan sintaks yang sama dengan parameter <strong>limit</strong>, jadi Anda hanya perlu menetapkan salah satunya.<br/>Anda dapat menggunakan parameter ini bersama dengan <strong>offset</strong> in <strong>param</strong> untuk mengaktifkan pagination.<br/>Jumlah dari nilai ini dan <strong>offset</strong> in <strong>param</strong> harus kurang dari 16.384.</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Deskripsi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>Nama koleksi yang sudah ada.</td>
    </tr>
    <tr>
      <td><code translate="no">data</code></td>
      <td>Daftar sematan vektor.<br/>Milvus mencari sematan vektor yang paling mirip dengan yang ditentukan.</td>
    </tr>
    <tr>
      <td><code translate="no">limit</code></td>
      <td>Jumlah total entitas yang akan dikembalikan.<br/>Anda dapat menggunakan parameter ini dalam kombinasi dengan <strong>offset</strong> dalam <strong>param</strong> untuk mengaktifkan pagination.<br/>Jumlah nilai ini dan <strong>offset</strong> dalam <strong>param</strong> harus kurang dari 16.384.</td>
    </tr>
  </tbody>
</table>
<p>Keluarannya mirip dengan yang berikut ini:</p>
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
<p>Keluaran menampilkan 5 tetangga teratas yang terdekat dengan vektor kueri Anda, termasuk ID unik dan jarak yang dihitung.</p>
<h3 id="Bulk-vector-search" class="common-anchor-header">Pencarian vektor massal</h3><p>Pencarian vektor massal memperluas konsep <a href="https://milvus.io/docs/single-vector-search.md#Single-Vector-Search">pencarian vektor tunggal</a> dengan mengizinkan beberapa vektor kueri untuk dicari dalam satu permintaan. Jenis pencarian ini ideal untuk skenario di mana Anda perlu menemukan vektor yang serupa untuk sekumpulan vektor kueri, yang secara signifikan mengurangi waktu dan sumber daya komputasi yang diperlukan.</p>
<p>Dalam pencarian vektor massal, Anda dapat menyertakan beberapa vektor kueri di bidang <code translate="no">data</code>. Sistem memproses vektor-vektor ini secara paralel, mengembalikan kumpulan hasil yang terpisah untuk setiap vektor kueri, setiap kumpulan berisi kecocokan terdekat yang ditemukan dalam koleksi.</p>
<p>Berikut ini adalah contoh pencarian dua set yang berbeda dari entitas yang paling mirip dari dua vektor kueri:</p>
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
<p>Keluarannya mirip dengan yang berikut ini:</p>
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
<p>Hasilnya mencakup dua set tetangga terdekat, satu untuk setiap vektor kueri, yang menunjukkan efisiensi pencarian vektor massal dalam menangani beberapa vektor kueri sekaligus.</p>
<h3 id="Partition-search" class="common-anchor-header">Pencarian partisi</h3><p>Pencarian partisi mempersempit cakupan pencarian Anda ke subset atau partisi tertentu dari koleksi Anda. Hal ini sangat berguna untuk kumpulan data yang terorganisir di mana data tersegmentasi ke dalam divisi logis atau kategoris, sehingga memungkinkan operasi pencarian yang lebih cepat dengan mengurangi volume data yang harus dipindai.</p>
<p>Untuk melakukan pencarian partisi, cukup sertakan nama partisi target di <code translate="no">partition_names</code> pada permintaan pencarian Anda. Hal ini menetapkan bahwa operasi <code translate="no">search</code> hanya mempertimbangkan vektor dalam partisi yang ditentukan.</p>
<p>Berikut ini adalah contoh pencarian entitas di <code translate="no">red</code>:</p>
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
<p>Keluarannya mirip dengan yang berikut ini:</p>
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
<p>Kemudian, cari entitas di <code translate="no">blue</code>:</p>
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
<p>Keluarannya mirip dengan yang berikut ini:</p>
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
<p>Data di <code translate="no">red</code> berbeda dengan data di <code translate="no">blue</code>. Oleh karena itu, hasil pencarian akan dibatasi pada partisi yang ditentukan, yang mencerminkan karakteristik unik dan distribusi data dari subset tersebut.</p>
<h3 id="Search-with-output-fields" class="common-anchor-header">Pencarian dengan bidang keluaran</h3><p>Pencarian dengan bidang keluaran memungkinkan Anda menentukan atribut atau bidang mana dari vektor yang cocok yang harus disertakan dalam hasil pencarian.</p>
<p>Anda dapat menentukan <code translate="no">output_fields</code> dalam permintaan untuk mengembalikan hasil dengan bidang tertentu.</p>
<p>Berikut adalah contoh pengembalian hasil dengan nilai atribut <code translate="no">color</code>:</p>
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
<p>Keluarannya mirip dengan yang berikut ini:</p>
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
<p>Di samping tetangga terdekat, hasil pencarian akan menyertakan bidang yang ditentukan <code translate="no">color</code>, memberikan informasi yang lebih kaya untuk setiap vektor yang cocok.</p>
<h2 id="Filtered-search" class="common-anchor-header">Pencarian yang difilter<button data-href="#Filtered-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Pencarian yang difilter menerapkan filter skalar pada pencarian vektor, sehingga Anda dapat mempersempit hasil pencarian berdasarkan kriteria tertentu. Anda dapat menemukan lebih banyak tentang ekspresi filter di <a href="https://milvus.io/docs/boolean.md">Aturan Ekspresi Boolean</a> dan contohnya di <a href="https://milvus.io/docs/get-and-scalar-query.md">Dapatkan &amp; Kueri Skalar</a>.</p>
<h3 id="Use-the-like-operator" class="common-anchor-header">Gunakan operator <code translate="no">like</code> </h3><p>Operator <code translate="no">like</code> meningkatkan pencarian string dengan mengevaluasi pola yang mencakup awalan, imbuhan, dan akhiran:</p>
<ul>
<li><strong>Pencocokan</strong> awalan: Untuk menemukan nilai yang dimulai dengan awalan tertentu, gunakan sintaks <code translate="no">'like &quot;prefix%&quot;'</code>.</li>
<li><strong>Pencocokan infiks</strong>: Untuk menemukan nilai yang berisi urutan karakter tertentu di mana saja dalam string, gunakan sintaks <code translate="no">'like &quot;%infix%&quot;'</code>.</li>
<li><strong>Pencocokan</strong> akhiran: Untuk menemukan nilai yang diakhiri dengan akhiran tertentu, gunakan sintaks <code translate="no">'like &quot;%suffix&quot;'</code>.</li>
</ul>
<p>Untuk pencocokan karakter tunggal, garis bawah (<code translate="no">_</code>) bertindak sebagai karakter pengganti untuk satu karakter, misalnya, <code translate="no">'like &quot;y_llow&quot;'</code>.</p>
<h3 id="Special-characters-in-search-strings" class="common-anchor-header">Karakter khusus dalam string pencarian</h3><p>Jika Anda ingin mencari string yang berisi karakter khusus seperti garis bawah (<code translate="no">_</code>) atau tanda persen (<code translate="no">%</code>), yang biasanya digunakan sebagai karakter pengganti dalam pola pencarian (<code translate="no">_</code> untuk satu karakter dan <code translate="no">%</code> untuk urutan karakter apa pun), Anda harus melewatkan karakter ini untuk memperlakukannya sebagai karakter literal. Gunakan tanda garis miring (<code translate="no">\</code>) untuk melewatkan karakter khusus, dan ingatlah untuk melewatkan tanda garis miring itu sendiri. Sebagai contoh:</p>
<ul>
<li>Untuk mencari garis bawah literal, gunakan <code translate="no">\\_</code>.</li>
<li>Untuk mencari tanda persen literal, gunakan <code translate="no">\\%</code>.</li>
</ul>
<p>Jadi, jika Anda perlu mencari teks <code translate="no">&quot;_version_&quot;</code>, kueri Anda harus diformat sebagai <code translate="no">'like &quot;\\_version\\_&quot;'</code> untuk memastikan garis bawah diperlakukan sebagai bagian dari istilah pencarian dan bukan sebagai karakter pengganti.</p>
<p>Hasil penyaringan yang <strong>warnanya</strong> diawali dengan <strong>warna</strong> <strong>merah</strong>:</p>
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
<p>Keluarannya mirip dengan yang berikut ini:</p>
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
<p>Hasil penyaringan yang <strong>warnanya</strong> mengandung huruf <strong>ll</strong> di mana saja dalam string:</p>
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
<p>Keluarannya mirip dengan yang berikut ini:</p>
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
<h2 id="Range-search" class="common-anchor-header">Pencarian rentang<button data-href="#Range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Pencarian rentang memungkinkan Anda menemukan vektor yang berada dalam rentang jarak tertentu dari vektor kueri Anda.</p>
<p>Dengan mengatur <code translate="no">radius</code> dan secara opsional <code translate="no">range_filter</code>, Anda dapat menyesuaikan luasnya pencarian Anda untuk menyertakan vektor yang agak mirip dengan vektor kueri, sehingga memberikan pandangan yang lebih komprehensif tentang kecocokan potensial.</p>
<ul>
<li><p><code translate="no">radius</code>: Menentukan batas luar ruang pencarian Anda. Hanya vektor yang berada dalam jarak ini dari vektor kueri yang dianggap sebagai kecocokan potensial.</p></li>
<li><p><code translate="no">range_filter</code>: Sementara <code translate="no">radius</code> menetapkan batas luar pencarian, <code translate="no">range_filter</code> dapat digunakan secara opsional untuk menentukan batas dalam, menciptakan rentang jarak di mana vektor harus berada untuk dipertimbangkan sebagai kecocokan.</p></li>
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
<p>Keluarannya mirip dengan yang berikut ini:</p>
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
<p>Anda akan melihat bahwa semua entitas yang dikembalikan memiliki jarak yang berada dalam kisaran 0,8 hingga 1,0 dari vektor kueri.</p>
<p>Pengaturan parameter untuk <code translate="no">radius</code> dan <code translate="no">range_filter</code> bervariasi dengan jenis metrik yang digunakan.</p>
<table>
<thead>
<tr><th><strong>Jenis Metrik</strong></th><th><strong>Karakteristik</strong></th><th><strong>Pengaturan Pencarian Jarak</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>Jarak L2 yang lebih kecil menunjukkan kemiripan yang lebih tinggi.</td><td>Untuk mengecualikan vektor terdekat dari hasil, pastikan bahwa:<br/> <code translate="no">range_filter</code> &lt;= jarak &lt; <code translate="no">radius</code></td></tr>
<tr><td><code translate="no">IP</code></td><td>Jarak IP yang lebih besar menunjukkan kemiripan yang lebih tinggi.</td><td>Untuk mengecualikan vektor terdekat dari hasil, pastikan bahwa:<br/> <code translate="no">radius</code> &lt; jarak &lt;= <code translate="no">range_filter</code></td></tr>
<tr><td><code translate="no">COSINE</code></td><td>Nilai kosinus yang lebih besar menunjukkan kemiripan yang lebih tinggi.</td><td>Untuk mengecualikan vektor terdekat dari hasil, pastikan bahwa:<br/> <code translate="no">radius</code> &lt; jarak &lt;= <code translate="no">range_filter</code></td></tr>
<tr><td><code translate="no">JACCARD</code></td><td>Jarak Jaccard yang lebih kecil menunjukkan kemiripan yang lebih tinggi.</td><td>Untuk mengecualikan vektor terdekat dari hasil, pastikan bahwa:<br/> <code translate="no">range_filter</code> &lt;= jarak &lt; <code translate="no">radius</code></td></tr>
<tr><td><code translate="no">HAMMING</code></td><td>Jarak Hamming yang lebih kecil menunjukkan kemiripan yang lebih tinggi.</td><td>Untuk mengecualikan vektor terdekat dari hasil, pastikan bahwa:<br/> <code translate="no">range_filter</code> &lt;= jarak &lt; <code translate="no">radius</code></td></tr>
</tbody>
</table>
<p>Untuk mempelajari lebih lanjut tentang jenis metrik jarak, lihat <a href="/docs/id/v2.4.x/metric.md">Metrik Kemiripan</a>.</p>
<h2 id="Grouping-search" class="common-anchor-header">Mengelompokkan pencarian<button data-href="#Grouping-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Di Milvus, pencarian pengelompokan dirancang untuk meningkatkan kelengkapan dan akurasi hasil pencarian.</p>
<p>Pertimbangkan sebuah skenario di RAG, di mana banyak dokumen dibagi menjadi beberapa bagian, dan setiap bagian diwakili oleh satu penyematan vektor. Pengguna ingin menemukan bagian yang paling relevan untuk meminta LLM secara akurat. Fungsi pencarian Milvus biasa dapat memenuhi persyaratan ini, tetapi dapat menghasilkan hasil yang sangat miring dan bias: sebagian besar bagian hanya berasal dari beberapa dokumen, dan kelengkapan hasil pencarian sangat buruk. Hal ini dapat mengganggu keakuratan atau bahkan ketepatan hasil yang diberikan oleh LLM dan mempengaruhi pengalaman pengguna LLM secara negatif.</p>
<p>Pencarian pengelompokan dapat secara efektif menyelesaikan masalah ini. Dengan melewati <code translate="no">group_by_field</code>, pengguna Milvus dapat mengelompokkan hasil pencarian ke dalam beberapa kelompok. Fitur ini secara signifikan dapat meningkatkan kelengkapan dan keadilan hasil pencarian, yang secara nyata meningkatkan kualitas output LLM.</p>
<p>Berikut adalah contoh kode untuk mengelompokkan hasil pencarian berdasarkan bidang:</p>
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
<p>Keluarannya serupa dengan yang berikut ini:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_7&quot;</span>, <span class="hljs-string">&quot;doc_7&quot;</span>, <span class="hljs-string">&quot;doc_3&quot;</span>, <span class="hljs-string">&quot;doc_3&quot;</span>, <span class="hljs-string">&quot;doc_2&quot;</span>, <span class="hljs-string">&quot;doc_2&quot;</span>, <span class="hljs-string">&quot;doc_8&quot;</span>, <span class="hljs-string">&quot;doc_8&quot;</span>]
[<span class="hljs-meta">5, 10, 11, 10, 9, 6, 5, 4, 9, 2</span>]
<button class="copy-code-btn"></button></code></pre>
<p>Pada keluaran yang diberikan, dapat diamati bahwa untuk setiap dokumen, tepat dua bagian diambil dan total 5 dokumen secara kolektif membentuk hasilnya.</p>
<p>Sebagai perbandingan, mari kita beri komentar pada parameter yang berhubungan dengan grup dan melakukan pencarian biasa:</p>
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
<p>Keluarannya serupa dengan yang berikut ini:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>]
[<span class="hljs-meta">1, 10, 3, 12, 9</span>]
<button class="copy-code-btn"></button></code></pre>
<p>Dalam output yang diberikan, dapat diamati bahwa "doc_11" benar-benar mendominasi hasil pencarian, membayangi paragraf berkualitas tinggi dari dokumen lain, yang dapat menjadi petunjuk yang buruk bagi LLM.</p>
<p><strong>Keterbatasan</strong></p>
<ul>
<li><p><strong>Pengindeksan</strong>: Fitur pengelompokan ini hanya berfungsi untuk koleksi yang diindeks dengan jenis indeks berikut ini: <strong>FLAT</strong>, <strong>IVF_FLAT</strong>, <strong>IVF_SQ8</strong>, <strong>HNSW</strong>, <strong>DISKANN</strong>, <strong>SPARSE_INVERTED_INDEX</strong>.</p></li>
<li><p><strong>Vektor</strong>: Saat ini, pencarian pengelompokan tidak mendukung bidang vektor dengan tipe <strong>BINARY_VECTOR</strong>. Untuk informasi lebih lanjut tentang tipe data, lihat <a href="https://milvus.io/docs/schema.md#Supported-data-types">Tipe data yang didukung</a>.</p></li>
<li><p><strong>Bidang</strong>: Saat ini, pencarian pengelompokan hanya memungkinkan untuk satu kolom. Anda tidak dapat menentukan beberapa nama bidang dalam konfigurasi <code translate="no">group_by_field</code>.  Selain itu, pencarian pengelompokan tidak kompatibel dengan tipe data JSON, FLOAT, DOUBLE, ARRAY, atau bidang vektor.</p></li>
<li><p><strong>Dampak Kinerja</strong>: Perlu diingat bahwa kinerja menurun dengan meningkatnya jumlah vektor kueri. Menggunakan cluster dengan 2 inti CPU dan memori 8 GB sebagai contoh, waktu eksekusi untuk pencarian pengelompokan meningkat secara proporsional dengan jumlah vektor kueri masukan.</p></li>
<li><p><strong>Fungsionalitas</strong>: Saat ini, pencarian pengelompokan tidak didukung oleh <a href="https://milvus.io/docs/single-vector-search.md#Range-search">pencarian rentang</a>, <a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">iterator pencarian</a></p></li>
</ul>
<h2 id="Search-parameters" class="common-anchor-header">Parameter pencarian<button data-href="#Search-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada pencarian di atas kecuali pencarian rentang, parameter pencarian default berlaku. Dalam kasus normal, Anda tidak perlu mengatur parameter pencarian secara manual.</p>
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
<p>Tabel berikut ini mencantumkan semua pengaturan yang memungkinkan dalam parameter pencarian.</p>
<table>
<thead>
<tr><th><strong>Nama Parameter</strong></th><th><strong>Deskripsi Parameter</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>Cara mengukur kemiripan antara penyematan vektor.<br/> Nilai yang memungkinkan adalah <code translate="no">IP</code>, <code translate="no">L2</code>, <code translate="no">COSINE</code>, <code translate="no">JACCARD</code>, dan <code translate="no">HAMMING</code>, dan nilai default dari file indeks yang dimuat.</td></tr>
<tr><td><code translate="no">params.nprobe</code></td><td>Jumlah unit yang akan ditanyakan selama pencarian.<br/> Nilainya berada dalam kisaran [1, nlist<sub>[1]</sub>].</td></tr>
<tr><td><code translate="no">params.level</code></td><td>Tingkat presisi pencarian.<br/> Nilai yang memungkinkan adalah <code translate="no">1</code>, <code translate="no">2</code>, dan <code translate="no">3</code>, dan default ke <code translate="no">1</code>. Nilai yang lebih tinggi menghasilkan hasil yang lebih akurat tetapi kinerja lebih lambat.</td></tr>
<tr><td><code translate="no">params.radius</code></td><td>Menentukan batas luar ruang pencarian Anda. Hanya vektor yang berada dalam jarak ini dari vektor kueri yang dianggap sebagai kecocokan potensial.<br/>Kisaran nilai ditentukan oleh parameter <code translate="no">metric_type</code>. Misalnya, jika <code translate="no">metric_type</code> diatur ke <code translate="no">L2</code>, rentang nilai yang valid adalah <code translate="no">[0, ∞]</code>. Jika <code translate="no">metric_type</code> diatur ke <code translate="no">COSINE</code>, rentang nilai yang valid adalah <code translate="no">[-1, 1]</code>. Untuk informasi lebih lanjut, lihat <a href="/docs/id/v2.4.x/metric.md">Metrik Kemiripan</a>.</td></tr>
<tr><td><code translate="no">params.range_filter</code></td><td>Sementara <code translate="no">radius</code> menetapkan batas luar pencarian, <code translate="no">range_filter</code> dapat digunakan secara opsional untuk menentukan batas dalam, membuat rentang jarak di mana vektor harus berada untuk dianggap cocok.<br/>Rentang nilai ditentukan oleh parameter <code translate="no">metric_type</code>. Sebagai contoh, jika <code translate="no">metric_type</code> diatur ke <code translate="no">L2</code>, rentang nilai yang valid adalah <code translate="no">[0, ∞]</code>. Jika <code translate="no">metric_type</code> diatur ke <code translate="no">COSINE</code>, rentang nilai yang valid adalah <code translate="no">[-1, 1]</code>. Untuk informasi lebih lanjut, lihat <a href="/docs/id/v2.4.x/metric.md">Metrik Kemiripan</a>.</td></tr>
</tbody>
</table>
<div class="admonition note">
<p><strong>Catatan</strong></p>
<p>[1] Jumlah unit kluster setelah pengindeksan. Ketika mengindeks koleksi, Milvus membagi data vektor menjadi beberapa unit klaster, yang jumlahnya bervariasi sesuai dengan pengaturan indeks yang sebenarnya.</p>
<p>[2] Jumlah entitas yang dikembalikan dalam pencarian.</p>
</div>
