---
id: manage-partitions.md
title: Verwalten von Partitionen
---
<h1 id="Manage-Partitions" class="common-anchor-header">Verwalten von Partitionen<button data-href="#Manage-Partitions" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Handbuch erfahren Sie, wie Sie Partitionen in einer Sammlung erstellen und verwalten können.</p>
<h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Eine Partition in Milvus stellt eine Unterteilung einer Sammlung dar. Diese Funktionalität ermöglicht es, den physischen Speicher einer Sammlung in mehrere Teile zu unterteilen, was zu einer verbesserten Abfrageleistung beiträgt, indem der Fokus auf eine kleinere Teilmenge von Daten anstatt auf die gesamte Sammlung eingegrenzt wird.</p>
<p>Bei der Erstellung einer Sammlung wird automatisch mindestens eine Standardpartition namens <strong>_default</strong> erstellt. Sie können maximal 1.024 Partitionen innerhalb einer Sammlung erstellen.</p>
<div class="admonition note">
<p><b>Hinweise</b></p>
<p>Milvus führt eine Funktion namens <strong>Partitionsschlüssel</strong> ein, die die zugrunde liegenden Partitionen nutzt, um Entitäten auf der Grundlage der Hash-Werte eines bestimmten Feldes zu speichern. Diese Funktion erleichtert die Implementierung von Multi-Tenancy und verbessert die Suchleistung. Für Details, lesen Sie <a href="https://milvus.io/docs/use-partition-key.md">Partitionsschlüssel verwenden</a>.</p>
<p>Wenn die Funktion <strong>Partitionsschlüssel</strong> in einer Sammlung aktiviert ist, kümmert sich Milvus um die Verwaltung aller Partitionen und entlastet Sie von dieser Verantwortung.</p>
</div>
<h2 id="Preparations" class="common-anchor-header">Vorbereitungen<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>Der nachstehende Codeausschnitt verwendet den vorhandenen Code weiter, um eine Verbindung zu Milvus herzustellen und eine Sammlung im Schnelleinrichtungsmodus zu erstellen, wobei angegeben wird, dass die Sammlung bei der Erstellung geladen wird.</p>
<div class="language-python">
<p>Für die Vorbereitungen verwenden Sie <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> um eine Verbindung zu Milvus herzustellen und <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a> um eine Sammlung im Schnellstartmodus zu erstellen.</p>
</div>
<div class="language-java">
<p>Für Vorbereitungen verwenden Sie <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a> um eine Verbindung zu Milvus herzustellen und <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a> um eine Sammlung im Schnelleinstellungsmodus anzulegen.</p>
</div>
<div class="language-javascript">
<p>Für Vorbereitungen, verwenden Sie <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> um eine Verbindung zu Milvus herzustellen und <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a> um eine Sammlung im Schnelleinrichtungsmodus zu erstellen.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

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
    .build();

client.createCollection(quickSetupReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address});

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,
});  
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>Hinweise</b></p>
<p>Im obigen Codeschnipsel wurde der Index der Sammlung zusammen mit der Sammlung erstellt, was anzeigt, dass die Sammlung bei der Erstellung geladen wird.</p>
</div>
<h2 id="List-Partitions" class="common-anchor-header">Partitionen auflisten<button data-href="#List-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald eine Sammlung fertig ist, können Sie ihre Partitionen auflisten.</p>
<div class="language-python">
<p>Um Partitionen aufzulisten, verwenden Sie <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/list_partitions.md"><code translate="no">list_partitions()</code></a>.</p>
</div>
<div class="language-java">
<p>Um Partitionen aufzulisten, verwenden Sie <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/listPartitions.md"><code translate="no">listPartitions()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Um Partitionen aufzulisten, verwenden Sie <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/listPartitions.md"><code translate="no">listPartitions()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. List partitions</span>
res = client.list_partitions(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [&quot;_default&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">partition</span>.<span class="hljs-property">request</span>.<span class="hljs-property">ListPartitionsReq</span>;

<span class="hljs-comment">// 3. List all partitions in the collection</span>
<span class="hljs-title class_">ListPartitionsReq</span> listPartitionsReq = <span class="hljs-title class_">ListPartitionsReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; partitionNames = client.<span class="hljs-title function_">listPartitions</span>(listPartitionsReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(partitionNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [&quot;_default&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3. List partitions</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">partition_names</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;_default&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Die Ausgabe des obigen Codeschnipsels enthält die Namen der Partitionen innerhalb der angegebenen Sammlung.</p>
<div class="admonition note">
<p><b>Hinweise</b></p>
<p>Wenn Sie ein Feld als Partitionsschlüssel in einer Sammlung festgelegt haben, erstellt Milvus mindestens <strong>64</strong> Partitionen zusammen mit der Sammlung. Bei der Auflistung der Partitionen können die Ergebnisse von der Ausgabe der obigen Codeschnipsel abweichen.</p>
<p>Details finden Sie unter <a href="https://milvus.io/docs/use-partition-key.md">Partitionsschlüssel verwenden</a>.</p>
</div>
<h2 id="Create-Partitions" class="common-anchor-header">Partitionen erstellen<button data-href="#Create-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können der Sammlung weitere Partitionen hinzufügen. Eine Sammlung kann bis zu 1.024 Partitionen haben.</p>
<div class="language-python">
<p>Um Partitionen zu erstellen, verwenden Sie <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/create_partition.md"><code translate="no">create_partition()</code></a>.</p>
</div>
<div class="language-java">
<p>Um Partitionen zu erstellen, verwenden Sie <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/createPartition.md"><code translate="no">createPartition()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Um Partitionen zu erstellen, verwenden Sie <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/createPartition.md"><code translate="no">createPartition()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Create more partitions</span>
client.create_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

client.create_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

res = client.list_partitions(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [&quot;_default&quot;, &quot;partitionA&quot;, &quot;partitionB&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.CreatePartitionReq;

<span class="hljs-comment">// 4. Create more partitions</span>
<span class="hljs-type">CreatePartitionReq</span> <span class="hljs-variable">createPartitionReq</span> <span class="hljs-operator">=</span> CreatePartitionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

client.createPartition(createPartitionReq);

createPartitionReq = CreatePartitionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionB&quot;</span>)
    .build();

client.createPartition(createPartitionReq);

listPartitionsReq = ListPartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

partitionNames = client.listPartitions(listPartitionsReq);

System.out.println(partitionNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;_default&quot;,</span>
<span class="hljs-comment">//     &quot;partitionA&quot;,</span>
<span class="hljs-comment">//     &quot;partitionB&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Create more partitions</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionB&quot;</span>
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">partition_names</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;_default&#x27;, &#x27;partitionA&#x27;, &#x27;partitionB&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Der obige Codeschnipsel erstellt eine Partition in einer Sammlung und listet die Partitionen der Sammlung auf.</p>
<div class="admonition note">
<p><b>Hinweise</b></p>
<p>Wenn Sie ein Feld als Partitionsschlüssel in einer Sammlung festgelegt haben, kümmert sich Milvus um die Verwaltung der Partitionen in der Sammlung. Daher kann es zu Fehlermeldungen kommen, wenn Sie versuchen, Partitionen zu erstellen.</p>
<p>Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/use-partition-key.md">Partitionsschlüssel verwenden</a>.</p>
</div>
<h2 id="Check-for-a-Specific-Partition" class="common-anchor-header">Nach einer bestimmten Partition suchen<button data-href="#Check-for-a-Specific-Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können auch prüfen, ob eine bestimmte Partition vorhanden ist.</p>
<div class="language-python">
<p>Um nach einer bestimmten Partition zu suchen, verwenden Sie <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/has_partition.md"><code translate="no">has_partition()</code></a>.</p>
</div>
<div class="language-java">
<p>Um nach einer bestimmten Partition zu suchen, verwenden Sie <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/hasPartition.md"><code translate="no">hasPartition()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Um nach einer bestimmten Partition zu suchen, verwenden Sie <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/hasPartition.md"><code translate="no">hasPartition()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. Check whether a partition exists</span>
res = client.has_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># True</span>

res = client.has_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionC&quot;</span>
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># False</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.HasPartitionReq;

<span class="hljs-comment">// 5. Check whether a partition exists</span>
<span class="hljs-type">HasPartitionReq</span> <span class="hljs-variable">hasPartitionReq</span> <span class="hljs-operator">=</span> HasPartitionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

<span class="hljs-type">boolean</span> <span class="hljs-variable">exists</span> <span class="hljs-operator">=</span> client.hasPartition(hasPartitionReq);

System.out.println(exists);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

hasPartitionReq = HasPartitionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionC&quot;</span>)
    .build();

exists = client.hasPartition(hasPartitionReq);

System.out.println(exists);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. Check whether a partition exists</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">value</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// true</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionC&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">value</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// false</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Der obige Codeschnipsel prüft, ob die Sammlung eine Partition mit dem Namen <code translate="no">partitionA</code> und <code translate="no">partitionC</code> hat.</p>
<h2 id="Load--Release-Partitions" class="common-anchor-header">Partitionen laden und freigeben<button data-href="#Load--Release-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können bestimmte Partitionen laden und freigeben, um sie für Suchen und Abfragen verfügbar oder nicht verfügbar zu machen.</p>
<h3 id="Get-Load-Status" class="common-anchor-header">Ladestatus abrufen</h3><div class="language-python">
<p>Um den Ladestatus einer Sammlung und ihrer Partitionen zu überprüfen, verwenden Sie <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md"><code translate="no">get_load_state()</code></a>.</p>
</div>
<div class="language-java">
<p>Um den Ladestatus einer Sammlung und ihrer Partitionen zu prüfen, verwenden Sie <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/getLoadState.md"><code translate="no">getLoadState()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Um den Ladestatus einer Sammlung und ihrer Partitionen zu prüfen, verwenden Sie <a href="https://milvus.io/api-reference/node/v2.4.x/Management/getLoadState.md"><code translate="no">getLoadState()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Release the collection</span>
client.release_collection(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)

<span class="hljs-comment"># Check the load status</span>
res = client.get_load_state(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, 
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, 
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.ReleaseCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.LoadPartitionsReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;

<span class="hljs-comment">// 6. Load a partition independantly</span>
<span class="hljs-comment">// 6.1 Release the collection</span>
<span class="hljs-type">ReleaseCollectionReq</span> <span class="hljs-variable">releaseCollectionReq</span> <span class="hljs-operator">=</span> ReleaseCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

client.releaseCollection(releaseCollectionReq);

<span class="hljs-comment">// 6.2 Load partitionA</span>
<span class="hljs-type">LoadPartitionsReq</span> <span class="hljs-variable">loadPartitionsReq</span> <span class="hljs-operator">=</span> LoadPartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;partitionA&quot;</span>))
    .build();

client.loadPartitions(loadPartitionsReq);

Thread.sleep(<span class="hljs-number">3000</span>);

<span class="hljs-comment">// 6.3 Check the load status of the collection and its partitions</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">getLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

<span class="hljs-type">boolean</span> <span class="hljs-variable">state</span> <span class="hljs-operator">=</span> client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionB&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 6. Load a partition indenpendantly</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releaseCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

<span class="hljs-keyword">await</span> <span class="hljs-title function_">sleep</span>(<span class="hljs-number">3000</span>)

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionB&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Der mögliche Ladestatus kann einer der folgenden sein</p>
<ul>
<li><p><strong>Geladen</strong></p>
<p>Eine Sammlung wird als <code translate="no">Loaded</code> markiert, wenn mindestens eine ihrer Partitionen geladen wurde.</p></li>
<li><p><strong>NichtLaden</strong></p>
<p>Eine Sammlung wird als <code translate="no">NotLoad</code> markiert, wenn keine ihrer Partitionen geladen wurde.</p></li>
<li><p><strong>Geladen</strong></p>
<p>Eine Sammlung ist als "Loading" gekennzeichnet, wenn mindestens eine ihrer Partitionen gerade geladen wird.</p></li>
</ul>
<h3 id="Load-Partitions" class="common-anchor-header">Partitionen laden</h3><div class="language-python">
<p>Um alle Partitionen einer Sammlung zu laden, können Sie einfach <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md"><code translate="no">load_collection()</code></a>. Um bestimmte Partitionen einer Sammlung zu laden, verwenden Sie <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/load_partitions.md"><code translate="no">load_partitions()</code></a>.</p>
</div>
<div class="language-java">
<p>Um alle Partitionen einer Sammlung zu laden, können Sie einfach <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/loadCollection.md"><code translate="no">loadCollection()</code></a>. Um bestimmte Partitionen einer Sammlung zu laden, verwenden Sie <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/loadPartitions.md"><code translate="no">loadPartitions()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Um alle Partitionen einer Sammlung zu laden, können Sie einfach <a href="https://milvus.io/api-reference/node/v2.4.x/Management/loadCollection.md"><code translate="no">loadCollection()</code></a>. Um bestimmte Partitionen einer Sammlung zu laden, verwenden Sie <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/loadPartitions.md"><code translate="no">loadPartitions()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.load_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]
)

res = client.get_load_state(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">LoadPartitionsReq</span> <span class="hljs-variable">loadPartitionsReq</span> <span class="hljs-operator">=</span> LoadPartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;partitionA&quot;</span>))
    .build();

client.loadPartitions(loadPartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">//</span>
<button class="copy-code-btn"></button></code></pre>
<p>Um mehrere Partitionen auf einmal zu laden, gehen Sie wie folgt vor:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.load_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">LoadPartitionsReq loadPartitionsReq = LoadPartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>))
    .build();

client.loadPartitions(loadPartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.<span class="hljs-built_in">println</span>(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionB&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.<span class="hljs-built_in">println</span>(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionB&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Um bestimmte Felder in einer oder mehreren Partitionen zu laden, gehen Sie wie folgt vor:</p>
<pre><code translate="no" class="language-python">client.load_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>],
    load_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>],
    skip_load_dynamic_field=<span class="hljs-literal">True</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Beachten Sie, dass nur die in <code translate="no">load_fields</code> aufgeführten Felder als Filterbedingungen und Ausgabefelder in Suchen und Abfragen verwendet werden können. Sie sollten immer den Primärschlüssel in die Liste aufnehmen. Die Feldnamen, die vom Laden ausgeschlossen sind, stehen nicht für die Filterung oder Ausgabe zur Verfügung.</p>
<p>Sie können <code translate="no">skip_load_dynamic_field=True</code> verwenden, um das Laden des dynamischen Feldes zu überspringen. Milvus behandelt das dynamische Feld als ein einziges Feld, so dass alle Schlüssel des dynamischen Feldes gemeinsam ein- oder ausgeschlossen werden.</p>
<h3 id="Release-Partitions" class="common-anchor-header">Partitionen freigeben</h3><div class="language-python">
<p>Um alle Partitionen einer Sammlung freizugeben, können Sie einfach <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md"><code translate="no">release_collection()</code></a>. Um bestimmte Partitionen einer Sammlung freizugeben, verwenden Sie <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/release_partitions.md"><code translate="no">release_partitions()</code></a>.</p>
</div>
<div class="language-java">
<p>Um alle Partitionen einer Sammlung freizugeben, können Sie einfach <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a>. Um bestimmte Partitionen einer Sammlung freizugeben, verwenden Sie <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/releasePartitions.md"><code translate="no">releasePartitions()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Um alle Partitionen einer Sammlung freizugeben, können Sie einfach <a href="https://milvus.io/api-reference/node/v2.4.x/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a>. Um bestimmte Partitionen einer Sammlung freizugeben, verwenden Sie <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/releasePartitions.md"><code translate="no">releasePartitions()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Release a partition</span>
client.release_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, 
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;

<span class="hljs-comment">// 7. Release a partition</span>
<span class="hljs-type">ReleasePartitionsReq</span> <span class="hljs-variable">releasePartitionsReq</span> <span class="hljs-operator">=</span> ReleasePartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;partitionA&quot;</span>))
    .build();

client.releasePartitions(releasePartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Release a partition</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releasePartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Um mehrere Partitionen auf einmal freizugeben, gehen Sie wie folgt vor:</p>
<pre><code translate="no" class="language-python">client.release_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;_default&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-Partitions" class="common-anchor-header">Partitionen löschen<button data-href="#Drop-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Sie eine Partition freigegeben haben, können Sie sie löschen, wenn sie nicht mehr benötigt wird.</p>
<div class="language-python">
<p>Um eine Partition zu löschen, verwenden Sie <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/drop_partition.md"><code translate="no">drop_partition()</code></a>.</p>
</div>
<div class="language-java">
<p>Um eine Partition zu löschen, verwenden Sie <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/dropPartition.md"><code translate="no">dropPartition()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Um eine Partition zu löschen, verwenden Sie <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/dropPartition.md"><code translate="no">dropPartition()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 8. Drop a partition</span>
client.drop_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

res = client.list_partitions(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [&quot;_default&quot;, &quot;partitionA&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;

<span class="hljs-type">ReleasePartitionsReq</span> <span class="hljs-variable">releasePartitionsReq</span> <span class="hljs-operator">=</span> ReleasePartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;_default&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>))
    .build();

client.releasePartitions(releasePartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releasePartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;_default&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   status: {</span>
<span class="hljs-comment">//     error_code: &#x27;Success&#x27;,</span>
<span class="hljs-comment">//     reason: &#x27;&#x27;,</span>
<span class="hljs-comment">//     code: 0,</span>
<span class="hljs-comment">//     retriable: false,</span>
<span class="hljs-comment">//     detail: &#x27;&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   state: &#x27;LoadStateNotLoad&#x27;</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>Hinweise</b></p>
<p>Bevor Sie eine Partition löschen, müssen Sie sie aus dem Speicher freigeben.</p>
</div>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>Wie viele Daten können in einer Partition gespeichert werden?</strong></p>
<p>Es wird empfohlen, weniger als 1B an Daten in einer Partition zu speichern.</p></li>
<li><p><strong>Wie viele Partitionen können maximal erstellt werden?</strong></p>
<p>Standardmäßig erlaubt Milvus die Erstellung von maximal 1.024 Partitionen. Sie können die maximale Anzahl der Partitionen anpassen, indem Sie <code translate="no">rootCoord.maxPartitionNum</code> konfigurieren. Einzelheiten hierzu finden Sie unter <a href="https://milvus.io/docs/configure_rootcoord.md#rootCoordmaxPartitionNum">Systemkonfigurationen</a>.</p></li>
<li><p><strong>Wie kann ich zwischen Partitionen und Partitionsschlüsseln unterscheiden?</strong></p>
<p>Partitionen sind physische Speichereinheiten, während Partitionsschlüssel logische Konzepte sind, die Daten automatisch bestimmten Partitionen auf der Grundlage einer bestimmten Spalte zuweisen.</p>
<p>Wenn Sie beispielsweise in Milvus eine Sammlung mit einem Partitionsschlüssel haben, der als Feld <code translate="no">color</code> definiert ist, ordnet das System die Daten automatisch den Partitionen zu, basierend auf den Hash-Werten des Feldes <code translate="no">color</code> für jede Entität. Dieser automatisierte Prozess entbindet den Benutzer von der Verantwortung, die Partition beim Einfügen oder Suchen von Daten manuell anzugeben.</p>
<p>Bei der manuellen Erstellung von Partitionen hingegen müssen Sie die Daten jeder Partition auf der Grundlage der Kriterien des Partitionsschlüssels zuordnen. Wenn Sie eine Sammlung mit einem <code translate="no">color</code> -Feld haben, würden Sie Entitäten mit einem <code translate="no">color</code> -Wert von <code translate="no">red</code> manuell <code translate="no">partition A</code> und Entitäten mit einem <code translate="no">color</code> -Wert von <code translate="no">blue</code> <code translate="no">partition B</code> zuordnen. Diese manuelle Verwaltung erfordert mehr Aufwand.</p>
<p>Zusammenfassend lässt sich sagen, dass sowohl Partitionen als auch Partitionsschlüssel verwendet werden, um die Datenberechnung zu optimieren und die Abfrageeffizienz zu erhöhen. Es ist wichtig zu erkennen, dass die Aktivierung eines Partitionsschlüssels bedeutet, die Kontrolle über die manuelle Verwaltung des Einfügens und Ladens von Partitionsdaten aufzugeben, da diese Prozesse vollständig automatisiert sind und von Milvus gehandhabt werden.</p></li>
</ul>
