---
id: single-vector-search.md
order: 1
summary: >-
  Questo articolo descrive come cercare vettori in una collezione Milvus
  utilizzando un singolo vettore di interrogazione.
title: Ricerca per singolo vettore
---
<h1 id="Single-Vector-Search" class="common-anchor-header">Ricerca per singolo vettore<button data-href="#Single-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Una volta inseriti i dati, il passo successivo consiste nell'eseguire ricerche di similarità sulla collezione in Milvus.</p>
<p>Milvus consente di effettuare due tipi di ricerca, a seconda del numero di campi vettoriali presenti nella collezione:</p>
<ul>
<li><strong>Ricerca a vettore singolo</strong>: Se la vostra collezione ha un solo campo vettoriale, utilizzate il metodo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a> per trovare le entità più simili. Questo metodo confronta il vettore interrogato con i vettori esistenti nella collezione e restituisce gli ID delle corrispondenze più vicine insieme alle distanze tra loro. Opzionalmente, può anche restituire i valori del vettore e i metadati dei risultati.</li>
<li><strong>Ricerca ibrida</strong>: Per le raccolte con due o più campi vettoriali, utilizzare il metodo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a> . Questo metodo esegue più richieste di ricerca Approximate Nearest Neighbor (ANN) e combina i risultati per restituire le corrispondenze più rilevanti dopo una nuova classificazione.</li>
</ul>
<p>Questa guida si concentra su come eseguire una ricerca monovettoriale in Milvus. Per maggiori dettagli sulla ricerca ibrida, consultare la sezione <a href="https://milvus.io/docs/multi-vector-search.md">Ricerca ibrida</a>.</p>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Esistono vari tipi di ricerca per soddisfare esigenze diverse:</p>
<ul>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Basic-search">Ricerca di base</a>: Include la ricerca a vettore singolo, la ricerca a vettore multiplo, la ricerca per partizione e la ricerca con campi di output specificati.</p></li>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">Ricerca filtrata</a>: Applica criteri di filtraggio basati su campi scalari per affinare i risultati della ricerca.</p></li>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Range-search">Ricerca per intervallo</a>: Trova i vettori entro un intervallo di distanza specifico dal vettore di interrogazione.</p></li>
<li><p><a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">Ricerca per raggruppamento</a>: Raggruppa i risultati della ricerca in base a un campo specifico per garantire la diversità dei risultati.</p></li>
</ul>
<h2 id="Preparations" class="common-anchor-header">Preparazioni<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>Il frammento di codice seguente ripropone il codice esistente per stabilire una connessione a Milvus e impostare rapidamente una raccolta.</p>
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
<h2 id="Basic-search" class="common-anchor-header">Ricerca di base<button data-href="#Basic-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando si invia una richiesta <code translate="no">search</code>, è possibile fornire uno o più valori vettoriali che rappresentano gli embedding della query e un valore <code translate="no">limit</code> che indica il numero di risultati da restituire.</p>
<p>A seconda dei dati e del vettore della query, è possibile che si ottengano meno di <code translate="no">limit</code> risultati. Questo accade quando <code translate="no">limit</code> è più grande del numero di vettori possibili per la query.</p>
<h3 id="Single-vector-search" class="common-anchor-header">Ricerca a vettore singolo</h3><p>La ricerca a vettore singolo è la forma più semplice delle operazioni di <code translate="no">search</code> in Milvus, che ha lo scopo di trovare i vettori più simili a un determinato vettore di interrogazione.</p>
<p>Per eseguire una ricerca a vettore singolo, specificare il nome della collezione di destinazione, il vettore di interrogazione e il numero di risultati desiderato (<code translate="no">limit</code>). Questa operazione restituisce un insieme di risultati che comprende i vettori più simili, i loro ID e le distanze dal vettore di interrogazione.</p>
<p>Ecco un esempio di ricerca delle 5 entità più simili al vettore di interrogazione:</p>
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
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>Il nome di una collezione esistente.</td>
    </tr>
    <tr>
      <td><code translate="no">data</code></td>
      <td>Un elenco di incorporazioni vettoriali.<br/>Milvus cerca le incorporazioni vettoriali più simili a quelle specificate.</td>
    </tr>
    <tr>
      <td><code translate="no">limit</code></td>
      <td>Il numero totale di entità da restituire.<br/>È possibile usare questo parametro in combinazione con l'<strong>offset</strong> in <strong>param</strong> per abilitare la paginazione.<br/>La somma di questo valore e dell'<strong>offset</strong> in <strong>param</strong> deve essere minore di 16.384.</td>
    </tr>
    <tr>
      <td><code translate="no">search_params</code></td>
      <td>Le impostazioni dei parametri specifiche per questa operazione.<br/><ul><li><code translate="no">metric_type</code>: Il tipo di metrica applicata a questa operazione. Deve essere lo stesso utilizzato quando si indicizza il campo vettoriale specificato sopra. I valori possibili sono <strong>L2</strong>, <strong>IP</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>.</li><li><code translate="no">params</code>: Parametri aggiuntivi. Per i dettagli, fare riferimento a <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md">search()</a>.</li></ul></td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collectionName</code></td>
      <td>Il nome di una collezione esistente.</td>
    </tr>
    <tr>
      <td><code translate="no">data</code></td>
      <td>Un elenco di incorporazioni vettoriali.<br/>Milvus cerca le incorporazioni vettoriali più simili a quelle specificate.</td>
    </tr>
    <tr>
      <td><code translate="no">topK</code></td>
      <td>Il numero di record da restituire nel risultato della ricerca. Questo parametro usa la stessa sintassi del parametro <strong>limit</strong>, quindi è necessario impostarne solo uno.<br/>È possibile usare questo parametro in combinazione con <strong>offset</strong> in <strong>param</strong> per abilitare la paginazione.<br/>La somma di questo valore e <strong>offset</strong> in <strong>param</strong> deve essere inferiore a 16.384.</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>Il nome di una collezione esistente.</td>
    </tr>
    <tr>
      <td><code translate="no">data</code></td>
      <td>Un elenco di incorporazioni vettoriali.<br/>Milvus cerca le incorporazioni vettoriali più simili a quelle specificate.</td>
    </tr>
    <tr>
      <td><code translate="no">limit</code></td>
      <td>Il numero totale di entità da restituire.<br/>È possibile usare questo parametro in combinazione con l'<strong>offset</strong> in <strong>param</strong> per abilitare la paginazione.<br/>La somma di questo valore e dell'<strong>offset</strong> in <strong>param</strong> deve essere minore di 16.384.</td>
    </tr>
  </tbody>
</table>
<p>L'output è simile al seguente:</p>
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
<p>L'output mostra i 5 vicini più vicini al vettore richiesto, compresi i loro ID univoci e le distanze calcolate.</p>
<h3 id="Bulk-vector-search" class="common-anchor-header">Ricerca per vettori multipli</h3><p>La ricerca per vettore multiplo estende il concetto di <a href="https://milvus.io/docs/single-vector-search.md#Single-Vector-Search">ricerca per vettore singolo</a>, consentendo la ricerca di più vettori di query in un'unica richiesta. Questo tipo di ricerca è ideale per gli scenari in cui è necessario trovare vettori simili per un insieme di vettori di query, riducendo significativamente il tempo e le risorse computazionali necessarie.</p>
<p>In una ricerca di tipo bulk-vector, è possibile includere diversi vettori di query nel campo <code translate="no">data</code>. Il sistema elabora questi vettori in parallelo, restituendo un set di risultati separato per ogni vettore di query, ognuno dei quali contiene le corrispondenze più vicine trovate all'interno della raccolta.</p>
<p>Ecco un esempio di ricerca di due serie distinte di entità più simili da due vettori di query:</p>
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
<p>L'output è simile al seguente:</p>
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
<p>I risultati includono due serie di vicini, una per ogni vettore di query, mostrando l'efficienza delle ricerche bulk-vector nel gestire più vettori di query contemporaneamente.</p>
<h3 id="Partition-search" class="common-anchor-header">Ricerca per partizione</h3><p>La ricerca per partizione restringe l'ambito della ricerca a un sottoinsieme o a una partizione specifica della raccolta. È particolarmente utile per gli insiemi di dati organizzati in cui i dati sono segmentati in divisioni logiche o categoriali, consentendo operazioni di ricerca più rapide grazie alla riduzione del volume di dati da analizzare.</p>
<p>Per effettuare una ricerca per partizione, è sufficiente includere il nome della partizione di destinazione in <code translate="no">partition_names</code> della richiesta di ricerca. Questo specifica che l'operazione <code translate="no">search</code> considera solo i vettori all'interno della partizione specificata.</p>
<p>Ecco un esempio di ricerca di entità in <code translate="no">red</code>:</p>
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
<p>L'output è simile al seguente:</p>
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
<p>Quindi, cercare le entità in <code translate="no">blue</code>:</p>
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
<p>L'output è simile al seguente:</p>
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
<p>I dati contenuti in <code translate="no">red</code> differiscono da quelli contenuti in <code translate="no">blue</code>. Pertanto, i risultati della ricerca saranno limitati alla partizione specificata, riflettendo le caratteristiche uniche e la distribuzione dei dati di quel sottoinsieme.</p>
<h3 id="Search-with-output-fields" class="common-anchor-header">Ricerca con campi di output</h3><p>La ricerca con campi di output consente di specificare quali attributi o campi dei vettori abbinati devono essere inclusi nei risultati della ricerca.</p>
<p>È possibile specificare <code translate="no">output_fields</code> in una richiesta per restituire risultati con campi specifici.</p>
<p>Ecco un esempio di restituzione dei risultati con i valori dell'attributo <code translate="no">color</code>:</p>
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
<p>L'output è simile al seguente:</p>
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
<p>Oltre ai vicini più prossimi, i risultati della ricerca includeranno il campo specificato <code translate="no">color</code>, fornendo un insieme più ricco di informazioni per ogni vettore corrispondente.</p>
<h2 id="Filtered-search" class="common-anchor-header">Ricerca filtrata<button data-href="#Filtered-search" class="anchor-icon" translate="no">
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
    </button></h2><p>La ricerca filtrata applica filtri scalari alle ricerche vettoriali, consentendo di affinare i risultati della ricerca in base a criteri specifici. Maggiori informazioni sulle espressioni di filtro sono disponibili in <a href="https://milvus.io/docs/boolean.md">Regole di espressione booleana</a> ed esempi in <a href="https://milvus.io/docs/get-and-scalar-query.md">Ottieni e Query scalari</a>.</p>
<h3 id="Use-the-like-operator" class="common-anchor-header">Utilizzare l'operatore <code translate="no">like</code> </h3><p>L'operatore <code translate="no">like</code> migliora la ricerca di stringhe valutando modelli che includono prefissi, infissi e suffissi:</p>
<ul>
<li><strong>Corrispondenza dei prefissi</strong>: per trovare valori che iniziano con un prefisso specifico, utilizzare la sintassi <code translate="no">'like &quot;prefix%&quot;'</code>.</li>
<li><strong>Corrispondenza per prefisso</strong>: per trovare valori contenenti una specifica sequenza di caratteri in qualsiasi punto della stringa, usare la sintassi <code translate="no">'like &quot;%infix%&quot;'</code>.</li>
<li><strong>Corrispondenza per suffisso</strong>: per trovare i valori che terminano con un suffisso specifico, usare la sintassi <code translate="no">'like &quot;%suffix&quot;'</code>.</li>
</ul>
<p>Per la ricerca di un singolo carattere, il trattino basso (<code translate="no">_</code>) funge da carattere jolly per un carattere, ad esempio <code translate="no">'like &quot;y_llow&quot;'</code>.</p>
<h3 id="Special-characters-in-search-strings" class="common-anchor-header">Caratteri speciali nelle stringhe di ricerca</h3><p>Se si desidera cercare una stringa che contiene caratteri speciali come i trattini bassi (<code translate="no">_</code>) o i segni di percentuale (<code translate="no">%</code>), che sono normalmente usati come caratteri jolly negli schemi di ricerca (<code translate="no">_</code> per qualsiasi singolo carattere e <code translate="no">%</code> per qualsiasi sequenza di caratteri), è necessario eseguire l'escape di questi caratteri per trattarli come caratteri letterali. Utilizzare una barra rovesciata (<code translate="no">\</code>) per sfuggire ai caratteri speciali e ricordarsi di sfuggire alla barra rovesciata stessa. Ad esempio:</p>
<ul>
<li>Per cercare un trattino basso letterale, usare <code translate="no">\\_</code>.</li>
<li>Per cercare un segno percentuale letterale, usare <code translate="no">\\%</code>.</li>
</ul>
<p>Quindi, se si deve cercare il testo <code translate="no">&quot;_version_&quot;</code>, la query deve essere formattata come <code translate="no">'like &quot;\\_version\\_&quot;'</code> per garantire che i trattini bassi siano trattati come parte del termine di ricerca e non come caratteri jolly.</p>
<p>Filtrare i risultati il cui <strong>colore</strong> ha un prefisso <strong>rosso</strong>:</p>
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
<p>L'output è simile al seguente:</p>
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
<p>Filtra i risultati il cui <strong>colore</strong> contiene le lettere <strong>ll</strong> in qualsiasi punto della stringa:</p>
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
<p>L'output è simile al seguente:</p>
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
<h2 id="Range-search" class="common-anchor-header">Ricerca per intervallo<button data-href="#Range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>La ricerca per intervallo consente di trovare i vettori che si trovano entro un intervallo di distanza specifico dal vettore di interrogazione.</p>
<p>Impostando <code translate="no">radius</code> e, facoltativamente, <code translate="no">range_filter</code>, è possibile regolare l'ampiezza della ricerca in modo da includere vettori in qualche modo simili al vettore di interrogazione, fornendo una visione più completa delle potenziali corrispondenze.</p>
<ul>
<li><p><code translate="no">radius</code>: Definisce il confine esterno dello spazio di ricerca. Solo i vettori che si trovano entro questa distanza dal vettore di interrogazione sono considerati potenziali corrispondenze.</p></li>
<li><p><code translate="no">range_filter</code>: Mentre <code translate="no">radius</code> stabilisce il limite esterno della ricerca, <code translate="no">range_filter</code> può essere usato facoltativamente per definire un limite interno, creando un intervallo di distanza entro il quale i vettori devono rientrare per essere considerati corrispondenti.</p></li>
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
<p>L'output è simile al seguente:</p>
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
<p>Si noterà che tutte le entità restituite hanno una distanza compresa tra 0,8 e 1,0 dal vettore della query.</p>
<p>Le impostazioni dei parametri <code translate="no">radius</code> e <code translate="no">range_filter</code> variano a seconda del tipo di metrica in uso.</p>
<table>
<thead>
<tr><th><strong>Tipo di metrica</strong></th><th><strong>Caratteristiche</strong></th><th><strong>Intervallo Impostazioni di ricerca</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>Le distanze L2 più piccole indicano una maggiore somiglianza.</td><td>Per escludere i vettori più vicini dai risultati, assicurarsi che:<br/> <code translate="no">range_filter</code> &lt;= distanza &lt; <code translate="no">radius</code></td></tr>
<tr><td><code translate="no">IP</code></td><td>Distanze IP più grandi indicano una maggiore somiglianza.</td><td>Per escludere i vettori più vicini dai risultati, assicurarsi che:<br/> <code translate="no">radius</code> &lt; distanza &lt;= <code translate="no">range_filter</code></td></tr>
<tr><td><code translate="no">COSINE</code></td><td>Un valore di coseno maggiore indica una maggiore somiglianza.</td><td>Per escludere i vettori più vicini dai risultati, assicurarsi che:<br/> <code translate="no">radius</code> &lt; distanza &lt;= <code translate="no">range_filter</code></td></tr>
<tr><td><code translate="no">JACCARD</code></td><td>Le distanze di Jaccard più piccole indicano una maggiore somiglianza.</td><td>Per escludere i vettori più vicini dai risultati, assicurarsi che:<br/> <code translate="no">range_filter</code> &lt;= distanza &lt; <code translate="no">radius</code></td></tr>
<tr><td><code translate="no">HAMMING</code></td><td>Distanze di Hamming più piccole indicano una maggiore somiglianza.</td><td>Per escludere i vettori più vicini dai risultati, assicurarsi che:<br/> <code translate="no">range_filter</code> &lt;= distanza &lt; <code translate="no">radius</code></td></tr>
</tbody>
</table>
<p>Per saperne di più sui tipi di metriche di distanza, consultare <a href="/docs/it/v2.4.x/metric.md">Metriche di somiglianza</a>.</p>
<h2 id="Grouping-search" class="common-anchor-header">Ricerca per raggruppamento<button data-href="#Grouping-search" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus, la ricerca per gruppi è progettata per migliorare la completezza e l'accuratezza dei risultati di ricerca.</p>
<p>Si consideri uno scenario in RAG, in cui i documenti sono suddivisi in vari passaggi e ogni passaggio è rappresentato da un'incorporazione vettoriale. Gli utenti desiderano trovare i passaggi più rilevanti per richiedere con precisione i LLM. La normale funzione di ricerca di Milvus è in grado di soddisfare questo requisito, ma può dare luogo a risultati molto distorti e parziali: la maggior parte dei passaggi proviene solo da alcuni documenti e la completezza dei risultati della ricerca è molto scarsa. Ciò può compromettere seriamente l'accuratezza o addirittura la correttezza dei risultati forniti dal LLM e influenzare negativamente l'esperienza degli utenti del LLM.</p>
<p>La ricerca per gruppi può risolvere efficacemente questo problema. Passando un <code translate="no">group_by_field</code>, gli utenti di Milvus possono suddividere i risultati della ricerca in diversi gruppi. Questa funzione può aumentare in modo significativo la completezza e l'equità dei risultati della ricerca, migliorando sensibilmente la qualità dei risultati di LLM.</p>
<p>Ecco un esempio di codice per raggruppare i risultati della ricerca per campo:</p>
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
<p>Il risultato è simile al seguente:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_7&quot;</span>, <span class="hljs-string">&quot;doc_7&quot;</span>, <span class="hljs-string">&quot;doc_3&quot;</span>, <span class="hljs-string">&quot;doc_3&quot;</span>, <span class="hljs-string">&quot;doc_2&quot;</span>, <span class="hljs-string">&quot;doc_2&quot;</span>, <span class="hljs-string">&quot;doc_8&quot;</span>, <span class="hljs-string">&quot;doc_8&quot;</span>]
[<span class="hljs-meta">5, 10, 11, 10, 9, 6, 5, 4, 9, 2</span>]
<button class="copy-code-btn"></button></code></pre>
<p>Nell'output dato, si può osservare che per ogni documento vengono recuperati esattamente due passaggi e un totale di 5 documenti che compongono i risultati.</p>
<p>Per fare un confronto, eliminiamo i parametri relativi al gruppo ed eseguiamo una ricerca regolare:</p>
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
<p>Il risultato è simile al seguente:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>, <span class="hljs-string">&quot;doc_11&quot;</span>]
[<span class="hljs-meta">1, 10, 3, 12, 9</span>]
<button class="copy-code-btn"></button></code></pre>
<p>Nell'output dato, si può osservare che "doc_11" ha dominato completamente i risultati della ricerca, mettendo in ombra i paragrafi di alta qualità degli altri documenti, il che può essere una cattiva indicazione per LLM.</p>
<p><strong>Limitazioni</strong></p>
<ul>
<li><p><strong>Indicizzazione</strong>: Questa funzione di raggruppamento funziona solo per le raccolte indicizzate con questi tipi di indice: <strong>FLAT</strong>, <strong>IVF_FLAT</strong>, <strong>IVF_SQ8</strong>, <strong>HNSW</strong>, <strong>DISKANN</strong>, <strong>SPARSE_INVERTED_INDEX</strong>.</p></li>
<li><p><strong>Vettore</strong>: Attualmente, la ricerca per raggruppamento non supporta un campo vettoriale del tipo <strong>BINARY_VECTOR</strong>. Per ulteriori informazioni sui tipi di dati, consultare la sezione <a href="https://milvus.io/docs/schema.md#Supported-data-types">Tipi di dati supportati</a>.</p></li>
<li><p><strong>Campo</strong>: Attualmente, la ricerca per raggruppamento consente solo una singola colonna. Non è possibile specificare più nomi di campo nella configurazione <code translate="no">group_by_field</code>.  Inoltre, la ricerca per gruppi è incompatibile con i tipi di dati JSON, FLOAT, DOUBLE, ARRAY o campi vettoriali.</p></li>
<li><p><strong>Impatto sulle prestazioni</strong>: Tenere presente che le prestazioni diminuiscono con l'aumentare del numero di vettori di query. Prendendo come esempio un cluster con 2 core CPU e 8 GB di memoria, il tempo di esecuzione della ricerca per raggruppamento aumenta proporzionalmente al numero di vettori di query in ingresso.</p></li>
<li><p><strong>Funzionalità</strong>: Attualmente, la ricerca per raggruppamento non è supportata dalla <a href="https://milvus.io/docs/single-vector-search.md#Range-search">ricerca per intervallo</a>, dagli <a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">iteratori di ricerca</a> e dai <a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">parametri di ricerca</a>.</p></li>
</ul>
<h2 id="Search-parameters" class="common-anchor-header">Parametri di ricerca<button data-href="#Search-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Nelle ricerche di cui sopra, ad eccezione della ricerca per intervallo, si applicano i parametri di ricerca predefiniti. In casi normali, non è necessario impostare manualmente i parametri di ricerca.</p>
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
<p>La tabella seguente elenca tutte le possibili impostazioni dei parametri di ricerca.</p>
<table>
<thead>
<tr><th><strong>Nome del parametro</strong></th><th><strong>Descrizione del parametro</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>Come misurare la somiglianza tra le incorporazioni vettoriali.<br/> I valori possibili sono <code translate="no">IP</code>, <code translate="no">L2</code>, <code translate="no">COSINE</code>, <code translate="no">JACCARD</code>, e <code translate="no">HAMMING</code>, e il valore predefinito è quello del file di indice caricato.</td></tr>
<tr><td><code translate="no">params.nprobe</code></td><td>Numero di unità da interrogare durante la ricerca.<br/> Il valore rientra nell'intervallo [1, nlist<sub>[1]</sub>].</td></tr>
<tr><td><code translate="no">params.level</code></td><td>Livello di precisione della ricerca.<br/> I valori possibili sono <code translate="no">1</code>, <code translate="no">2</code>, e <code translate="no">3</code>, per impostazione predefinita <code translate="no">1</code>. Valori più alti danno risultati più precisi ma prestazioni più lente.</td></tr>
<tr><td><code translate="no">params.radius</code></td><td>Definisce il confine esterno dello spazio di ricerca. Solo i vettori che si trovano all'interno di questa distanza dal vettore di interrogazione sono considerati potenziali corrispondenze.<br/>L'intervallo di valori è determinato dal parametro <code translate="no">metric_type</code>. Ad esempio, se <code translate="no">metric_type</code> è impostato su <code translate="no">L2</code>, l'intervallo di valori valido è <code translate="no">[0, ∞]</code>. Se <code translate="no">metric_type</code> è impostato su <code translate="no">COSINE</code>, l'intervallo di valori valido è <code translate="no">[-1, 1]</code>. Per ulteriori informazioni, consultare <a href="/docs/it/v2.4.x/metric.md">Metriche di somiglianza</a>.</td></tr>
<tr><td><code translate="no">params.range_filter</code></td><td>Mentre <code translate="no">radius</code> stabilisce il limite esterno della ricerca, <code translate="no">range_filter</code> può essere usato opzionalmente per definire un confine interno, creando un intervallo di distanza entro il quale i vettori devono rientrare per essere considerati corrispondenti.<br/>L'intervallo di valori è determinato dal parametro <code translate="no">metric_type</code>. Ad esempio, se <code translate="no">metric_type</code> è impostato su <code translate="no">L2</code>, l'intervallo di valori valido è <code translate="no">[0, ∞]</code>. Se <code translate="no">metric_type</code> è impostato su <code translate="no">COSINE</code>, l'intervallo di valori valido è <code translate="no">[-1, 1]</code>. Per ulteriori informazioni, consultare <a href="/docs/it/v2.4.x/metric.md">Metriche di somiglianza</a>.</td></tr>
</tbody>
</table>
<div class="admonition note">
<p><strong>note</strong></p>
<p>[1] Numero di unità di cluster dopo l'indicizzazione. Quando si indicizza una collezione, Milvus suddivide i dati vettoriali in più unità di cluster, il cui numero varia in base alle impostazioni dell'indice.</p>
<p>[2] Numero di entità da restituire in una ricerca.</p>
</div>
