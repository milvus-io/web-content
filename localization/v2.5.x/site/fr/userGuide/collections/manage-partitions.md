---
id: manage-partitions.md
title: Gérer les partitions
---
<h1 id="Manage-Partitions​" class="common-anchor-header">Gérer les partitions<button data-href="#Manage-Partitions​" class="anchor-icon" translate="no">
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
    </button></h1><p>Une partition est un sous-ensemble d'une collection. Chaque partition partage la même structure de données que sa collection mère, mais ne contient qu'un sous-ensemble des données de la collection. Cette page vous aide à comprendre comment gérer les partitions.</p>
<h2 id="Overview​" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Lors de la création d'une collection, Milvus crée également une partition nommée <strong>_default</strong> dans la collection. Si vous n'avez pas l'intention d'ajouter d'autres partitions, toutes les entités insérées dans la collection vont dans la partition par défaut et toutes les recherches et requêtes sont également effectuées dans la partition par défaut.</p>
<p>Vous pouvez ajouter d'autres partitions et y insérer des entités en fonction de certains critères. Vous pouvez alors restreindre vos recherches et vos requêtes à certaines partitions, ce qui améliore les performances de la recherche.</p>
<p>Une collection peut avoir un maximum de 1 024 partitions.</p>
<div class="alert note">
<p>La fonction <strong>Clé de partition</strong> est une optimisation de la recherche basée sur les partitions et permet à Milvus de distribuer des entités dans différentes partitions en fonction des valeurs d'un champ scalaire spécifique. Cette fonction permet de mettre en œuvre une multi-location orientée partition et d'améliorer les performances de recherche.</p>
<p>Cette fonctionnalité ne sera pas abordée dans cette page. Pour en savoir plus, voir <a href="/docs/fr/use-partition-key.md">Utiliser la clé de partition</a>.</p>
</div>
<h2 id="List-Partitions​" class="common-anchor-header">Répertorier les partitions<button data-href="#List-Partitions​" class="anchor-icon" translate="no">
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
    </button></h2><p>Lors de la création d'une collection, Milvus crée également une partition nommée <strong>_default</strong> dans la collection. Vous pouvez répertorier les partitions d'une collection comme suit.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
res = client.list_partitions(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># [&quot;_default&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ListPartitionsReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-keyword">import</span> java.util.*;​
​
<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
​
<span class="hljs-comment">// 1. Connect to Milvus server​</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()​
        .uri(CLUSTER_ENDPOINT)​
        .token(TOKEN)​
        .build();​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);​
​
<span class="hljs-type">ListPartitionsReq</span> <span class="hljs-variable">listPartitionsReq</span> <span class="hljs-operator">=</span> ListPartitionsReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .build();​
​
List&lt;String&gt; partitionNames = client.listPartitions(listPartitionsReq);​
System.out.println(partitionNames);​
​
<span class="hljs-comment">// Output:​</span>
<span class="hljs-comment">// [_default]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// [&quot;_default&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (​
    <span class="hljs-string">&quot;context&quot;</span>​
    ​
    client <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvucclient&quot;</span>​
)​
​
ctx, cancel := context.WithCancel(context.Background())​
<span class="hljs-keyword">defer</span> cancel()​
​
milvusAddr := <span class="hljs-string">&quot;127.0.0.1:19530&quot;</span>​
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
cli, err := client.New(ctx, &amp;client.ClientConfig{​
    Address: milvusAddr,​
    APIKey:  token,​
})​
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
    <span class="hljs-comment">// handle error​</span>
}​
​
<span class="hljs-keyword">defer</span> cli.Close(ctx)​
​
partitionNames, err := cli.ListPartitions(ctx, client.NewListPartitionOption(<span class="hljs-string">&quot;quick_setup&quot;</span>))​
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
    <span class="hljs-comment">// handle error​</span>
}​
​
fmt.Println(partitionNames)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/list&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: [​</span>
<span class="hljs-comment">#         &quot;_default&quot;​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-Partition​" class="common-anchor-header">Créer une partition<button data-href="#Create-Partition​" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez ajouter d'autres partitions à la collection et insérer des entités dans ces partitions en fonction de certains critères.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_partition(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>​
)​
​
res = client.list_partitions(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># [&quot;_default&quot;, &quot;partitionA&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.CreatePartitionReq;​
​
<span class="hljs-type">CreatePartitionReq</span> <span class="hljs-variable">createPartitionReq</span> <span class="hljs-operator">=</span> CreatePartitionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)​
        .build();​
​
client.createPartition(createPartitionReq);​
​
<span class="hljs-type">ListPartitionsReq</span> <span class="hljs-variable">listPartitionsReq</span> <span class="hljs-operator">=</span> ListPartitionsReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .build();​
​
List&lt;String&gt; partitionNames = client.listPartitions(listPartitionsReq);​
System.out.println(partitionNames);​
​
<span class="hljs-comment">// Output:​</span>
<span class="hljs-comment">// [_default, partitionA]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>​
})​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// [&quot;_default&quot;, &quot;partitionA&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (​
    <span class="hljs-string">&quot;fmt&quot;</span>​
    ​
    client <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>​
)​
​
err = cli.CreatePartition(ctx, client.NewCreatePartitionOption(<span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>))​
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
    <span class="hljs-comment">// handle error​</span>
}​
​
partitionNames, err := cli.ListPartitions(ctx, client.NewListPartitionOption(<span class="hljs-string">&quot;quick_setup&quot;</span>))​
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
    <span class="hljs-comment">// handle error​</span>
}​
​
fmt.Println(partitionNames)​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// [&quot;_default&quot;, &quot;partitionA&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionName&quot;: &quot;partitionA&quot;​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {}​</span>
<span class="hljs-comment"># }​</span>
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/list&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: [​</span>
<span class="hljs-comment">#         &quot;_default&quot;,​</span>
<span class="hljs-comment">#         &quot;partitionA&quot;​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Check-for-a-Specific-Partition​" class="common-anchor-header">Recherche d'une partition spécifique<button data-href="#Check-for-a-Specific-Partition​" class="anchor-icon" translate="no">
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
    </button></h2><p>Les extraits de code suivants montrent comment vérifier si une partition existe dans une collection spécifique.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.has_partition(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># True​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.HasPartitionReq;​
​
<span class="hljs-type">HasPartitionReq</span> <span class="hljs-variable">hasPartitionReq</span> <span class="hljs-operator">=</span> HasPartitionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)​
        .build();​
​
<span class="hljs-type">Boolean</span> <span class="hljs-variable">hasPartitionRes</span> <span class="hljs-operator">=</span> client.hasPartition(hasPartitionReq);​
System.out.println(hasPartitionRes);​
​
<span class="hljs-comment">// Output:​</span>
<span class="hljs-comment">// true​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasPartition</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">value</span>)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// true​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (​
    <span class="hljs-string">&quot;fmt&quot;</span>​
    ​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>​
)​
​
result, err := cli.HasPartition(ctx, milvusclient.NewHasPartitionOption(<span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>))​
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
    <span class="hljs-comment">// handle error​</span>
}​
​
fmt.Println(result)​
​
<span class="hljs-comment">// Output:​</span>
<span class="hljs-comment">// true​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/has&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionName&quot;: &quot;partitionA&quot;​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {​</span>
<span class="hljs-comment">#        &quot;has&quot;: true​</span>
<span class="hljs-comment">#     }​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-and-Release-Partitions​" class="common-anchor-header">Charger et libérer des partitions<button data-href="#Load-and-Release-Partitions​" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez charger ou libérer séparément une ou plusieurs partitions.</p>
<h3 id="Load-Partitions​" class="common-anchor-header">Charger des partitions</h3><p>Vous pouvez charger séparément des partitions spécifiques dans une collection. Il convient de noter que l'état de chargement d'une collection reste inchangé s'il existe une partition non chargée dans la collection.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.load_partitions(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]​
)​
​
res = client.get_load_state(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.LoadPartitionsReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;​
​
​
<span class="hljs-type">LoadPartitionsReq</span> <span class="hljs-variable">loadPartitionsReq</span> <span class="hljs-operator">=</span> LoadPartitionsReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))​
        .build();​
​
client.loadPartitions(loadPartitionsReq);​
​
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">getLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)​
        .build();​
​
<span class="hljs-type">Boolean</span> <span class="hljs-variable">getLoadStateRes</span> <span class="hljs-operator">=</span> client.getLoadState(getLoadStateReq);​
System.out.println(getLoadStateRes);​
​
<span class="hljs-comment">// True​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadPartitions</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]​
})​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// LoadStateLoaded​</span>
<span class="hljs-comment">// ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go 缺失​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/load&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionNames&quot;: [&quot;partitionA&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {}​</span>
<span class="hljs-comment"># }​</span>
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/get_load_state&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionNames&quot;: [&quot;partitionA&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {​</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 100,​</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateLoaded&quot;,​</span>
<span class="hljs-comment">#         &quot;message&quot;: &quot;&quot;​</span>
<span class="hljs-comment">#     }​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Release-Partitions​" class="common-anchor-header">Libération de partitions</h3><p>Vous pouvez également libérer des partitions spécifiques.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.release_partitions(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]​
)​
​
res = client.get_load_state(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoaded&gt;&quot;​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;​
​
<span class="hljs-type">ReleasePartitionsReq</span> <span class="hljs-variable">releasePartitionsReq</span> <span class="hljs-operator">=</span> ReleasePartitionsReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))​
        .build();​
​
client.releasePartitions(releasePartitionsReq);​
​
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">getLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)​
        .build();​
​
<span class="hljs-type">Boolean</span> <span class="hljs-variable">getLoadStateRes</span> <span class="hljs-operator">=</span> client.getLoadState(getLoadStateReq);​
System.out.println(getLoadStateRes);​
​
<span class="hljs-comment">// False​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releasePartitions</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]​
})​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// LoadStateNotLoaded​</span>
<span class="hljs-comment">// ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go 缺失​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/release&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionNames&quot;: [&quot;partitionA&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {}​</span>
<span class="hljs-comment"># }​</span>
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/get_load_state&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionNames&quot;: [&quot;partitionA&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {​</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 0,​</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateNotLoaded&quot;,​</span>
<span class="hljs-comment">#         &quot;message&quot;: &quot;&quot;​</span>
<span class="hljs-comment">#     }​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Data-Operations-Within-Partitions​" class="common-anchor-header">Opérations sur les données au sein des partitions<button data-href="#Data-Operations-Within-Partitions​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Insert-and-Delete-Entities​" class="common-anchor-header">Insérer et supprimer des entités</h3><p>Vous pouvez effectuer des opérations d'insertion, d'upsert et de suppression dans des opérations spécifiques. Pour plus de détails, voir</p>
<ul>
<li><p>Insérer des entités dans une partition</p></li>
<li><p>Insertion d'entités dans une partition</p></li>
<li><p>Supprimer des entités d'une partition</p></li>
</ul>
<h3 id="Search-and-Query​" class="common-anchor-header">Recherche et interrogation</h3><p>Vous pouvez effectuer des recherches et des requêtes dans des partitions spécifiques. Pour plus d'informations, reportez-vous à la section</p>
<ul>
<li><p>Effectuer des recherches ANN dans les partitions</p></li>
<li><p>Filtrage des métadonnées dans les partitions</p></li>
</ul>
<h2 id="Drop-Partition​" class="common-anchor-header">Abandonner une partition<button data-href="#Drop-Partition​" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez supprimer des partitions qui ne sont plus nécessaires. Avant d'abandonner une partition, assurez-vous qu'elle a été libérée.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.release_partitions(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]​
)​
​
client.drop_partition(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>​
)​
​
res = client.list_partitions(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># [&quot;_default&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.DropPartitionReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ListPartitionsReq;​
​
<span class="hljs-type">ReleasePartitionsReq</span> <span class="hljs-variable">releasePartitionsReq</span> <span class="hljs-operator">=</span> ReleasePartitionsReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))​
        .build();​
​
client.releasePartitions(releasePartitionsReq);​
​
<span class="hljs-type">DropPartitionReq</span> <span class="hljs-variable">dropPartitionReq</span> <span class="hljs-operator">=</span> DropPartitionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)​
        .build();​
​
client.dropPartition(dropPartitionReq);​
​
<span class="hljs-type">ListPartitionsReq</span> <span class="hljs-variable">listPartitionsReq</span> <span class="hljs-operator">=</span> ListPartitionsReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .build();​
​
List&lt;String&gt; partitionNames = client.listPartitions(listPartitionsReq);​
System.out.println(partitionNames);​
​
<span class="hljs-comment">// Output:​</span>
<span class="hljs-comment">// [_default]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releasePartitions</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]​
})​
​
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropPartition</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>​
})​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// [&quot;_default&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go 缺失​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/release&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionNames&quot;: [&quot;partitionA&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {}​</span>
<span class="hljs-comment"># }​</span>
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/drop&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionName&quot;: &quot;partitionA&quot;​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {}​</span>
<span class="hljs-comment"># }​</span>
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/list&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: [​</span>
<span class="hljs-comment">#         &quot;_default&quot;​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
