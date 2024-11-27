---
id: use-partition-key.md
title: Utiliser la clé de partition
---
<h1 id="Use-Partition-Key​" class="common-anchor-header">Utiliser la clé de partition<button data-href="#Use-Partition-Key​" class="anchor-icon" translate="no">
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
    </button></h1><p>La clé de partition est une solution d'optimisation de la recherche basée sur les partitions. En désignant un champ scalaire spécifique comme clé de partition et en spécifiant des conditions de filtrage basées sur la clé de partition pendant la recherche, la portée de la recherche peut être réduite à plusieurs partitions, améliorant ainsi l'efficacité de la recherche. Cet article présente l'utilisation de la clé de partition et les considérations qui s'y rapportent.</p>
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
    </button></h2><p>Dans Milvus, vous pouvez utiliser des partitions pour mettre en œuvre la ségrégation des données et améliorer les performances de recherche en limitant l'étendue de la recherche à des partitions spécifiques. Si vous choisissez de gérer les partitions manuellement, vous pouvez créer un maximum de 1 024 partitions dans une collection et insérer des entités dans ces partitions sur la base d'une règle spécifique afin de réduire l'étendue de la recherche en limitant les recherches à un nombre spécifique de partitions.</p>
<p>Milvus introduit la clé de partition pour vous permettre de réutiliser les partitions dans la séparation des données afin de dépasser la limite du nombre de partitions que vous pouvez créer dans une collection. Lors de la création d'une collection, vous pouvez utiliser un champ scalaire comme clé de partition. Une fois la collection prête, Milvus crée le nombre spécifié de partitions dans la collection, chaque partition correspondant à une plage de valeurs de la clé de partition. Lors de la réception des entités insérées, Milvus les stocke dans différentes partitions en fonction de leurs valeurs de clé de partition.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-vs-partition-key.png" alt="Partition v.s. Partition Key" class="doc-image" id="partition-v.s.-partition-key" />
   </span> <span class="img-wrapper"> <span>Partition v.s. Clé de partition</span> </span></p>
<p>La figure suivante illustre la manière dont Milvus traite les demandes de recherche dans une collection avec ou sans l'activation de la fonction Clé de partition. </p>
<ul>
<li><p>Si la clé de partition est désactivée, Milvus recherche les entités les plus similaires au vecteur de requête dans la collection. Vous pouvez réduire l'étendue de la recherche si vous savez quelle partition contient les résultats les plus pertinents. </p></li>
<li><p>Si la clé de partition est activée, Milvus détermine l'étendue de la recherche en fonction de la valeur de la clé de partition spécifiée dans un filtre de recherche et analyse uniquement les entités des partitions qui correspondent. </p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/with-and-without-partition-key.png" alt="With or Without Partition Key" class="doc-image" id="with-or-without-partition-key" />
   </span> <span class="img-wrapper"> <span>Avec ou sans clé de partition</span> </span></p>
<h2 id="Use-Partition-Key​" class="common-anchor-header">Utiliser la clé de partition<button data-href="#Use-Partition-Key​" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour utiliser la clé de partition, vous devez</p>
<ul>
<li><p>Définir la clé de partition.</p></li>
<li><p>définir le nombre de partitions à créer (facultatif), et</p></li>
<li><p>créer une condition de filtrage basée sur la clé de partition.</p></li>
</ul>
<h3 id="Set-Partition-Key​" class="common-anchor-header">Définir la clé de partition</h3><p>Pour désigner un champ scalaire comme clé de partition, vous devez définir son attribut <code translate="no">is_partition_key</code> à <code translate="no">true</code> lorsque vous ajoutez le champ scalaire.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (​
    MilvusClient, DataType​
)​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
schema = client.create_schema()​
​
<span class="hljs-comment"># Add the partition key​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">512</span>,​
    <span class="hljs-comment"># highlight-next-line​</span>
    is_partition_key=<span class="hljs-literal">True</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
​
<span class="hljs-comment">// Create schema​</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
​
<span class="hljs-comment">// Add the partition key​</span>
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)​
        .dataType(DataType.VarChar)​
        .maxLength(<span class="hljs-number">512</span>)​
        <span class="hljs-comment">// highlight-next-line​</span>
        .isPartitionKey(<span class="hljs-literal">true</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// 3. Create a collection in customized setup mode​</span>
<span class="hljs-comment">// 3.1 Define fields​</span>
<span class="hljs-keyword">const</span> fields = [​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,​
        <span class="hljs-comment">// highlight-next-line​</span>
        <span class="hljs-attr">is_partition_key</span>: <span class="hljs-literal">true</span>​
    }​
]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: true,​
        &quot;enabledDynamicField&quot;: false,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;my_id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_vector&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;5&quot;​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_varchar&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;isPartitionKey&quot;: true,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 512​
                }​
            }​
        ]​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Partition-Numbers​" class="common-anchor-header">Définir les numéros de partition</h3><p>Lorsque vous désignez un champ scalaire dans une collection comme clé de partition, Milvus crée automatiquement 16 partitions dans la collection. Lors de la réception d'une entité, Milvus choisit une partition en fonction de la valeur de la clé de partition de cette entité et stocke l'entité dans la partition, ce qui fait que certaines ou toutes les partitions contiennent des entités ayant des valeurs de clé de partition différentes. </p>
<p>Vous pouvez également déterminer le nombre de partitions à créer avec la collection. Ceci n'est valable que si vous avez un champ scalaire désigné comme clé de partition.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    schema=schema,​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    num_partitions=<span class="hljs-number">1024</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
                .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
                .collectionSchema(schema)​
                .numPartitions(<span class="hljs-number">1024</span>)​
                .build();​
        client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">create_collection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">num_partitions</span>: <span class="hljs-number">1024</span>​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{​
    &quot;partitionsNum&quot;: 1024​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;myCollection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Filtering-Condition​" class="common-anchor-header">Créer une condition de filtrage</h3><p>Lorsque vous effectuez des recherches ANN dans une collection avec la fonctionnalité Clé de partition activée, vous devez inclure une expression de filtrage impliquant la clé de partition dans la demande de recherche. Dans l'expression de filtrage, vous pouvez restreindre la valeur de la clé de partition dans une plage spécifique afin que Milvus limite l'étendue de la recherche aux partitions correspondantes.</p>
<p>Les exemples suivants illustrent le filtrage basé sur la clé de partition en fonction d'une valeur de clé de partition spécifique et d'un ensemble de valeurs de clé de partition.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Filter based on a single partition key value, or​</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>​
​
<span class="hljs-comment"># Filter based on multiple partition key values​</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Filter based on a single partition key value, or​</span>
<span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;partition_key == &#x27;x&#x27; &amp;&amp; &lt;other conditions&gt;&quot;</span>;​
​
<span class="hljs-comment">// Filter based on multiple partition key values​</span>
<span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;partition_key in [&#x27;x&#x27;, &#x27;y&#x27;, &#x27;z&#x27;] &amp;&amp; &lt;other conditions&gt;&quot;</span>;​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Filter based on a single partition key value, or​</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>​
​
<span class="hljs-comment">// Filter based on multiple partition key values​</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># Filter based on a single partition key value, or​</span>
export <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>​
​
<span class="hljs-comment"># Filter based on multiple partition key values​</span>
export <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
