---
id: use-partition-key.md
title: Utilisation de la clé de partition
summary: >-
  La « Partition Key » est une solution d'optimisation de la recherche basée sur
  les partitions. En désignant un champ scalaire spécifique comme « Partition
  Key » et en définissant des conditions de filtrage basées sur celle-ci lors de
  la recherche, il est possible de restreindre le champ de recherche à quelques
  partitions, ce qui améliore l'efficacité de la recherche. Cet article présente
  l'utilisation de la « Partition Key » ainsi que les points à prendre en
  compte.
---
<h1 id="Use-Partition-Key" class="common-anchor-header">Utilisation de la clé de partition<button data-href="#Use-Partition-Key" class="anchor-icon" translate="no">
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
    </button></h1><p>La clé de partition est une solution d'optimisation de la recherche basée sur les partitions. En désignant un champ scalaire spécifique comme clé de partition et en spécifiant des conditions de filtrage basées sur cette clé lors de la recherche, il est possible de restreindre le champ de recherche à quelques partitions, améliorant ainsi l'efficacité de la recherche. Cet article présente l'utilisation de la clé de partition et les considérations associées.</p>
<h2 id="Overview" class="common-anchor-header">Présentation<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans Milvus, vous pouvez utiliser des partitions pour mettre en œuvre la ségrégation des données et améliorer les performances de recherche en limitant le champ de recherche à des partitions spécifiques. Si vous choisissez de gérer les partitions manuellement, vous pouvez créer jusqu’à 1 024 partitions dans une collection et y insérer des entités selon une règle spécifique, ce qui vous permet de restreindre le champ de recherche en limitant les requêtes à un nombre donné de partitions.</p>
<p>Milvus propose la clé de partition afin de vous permettre de réutiliser des partitions dans le cadre de la ségrégation des données et de contourner ainsi la limite du nombre de partitions pouvant être créées dans une collection. Lors de la création d’une collection, vous pouvez utiliser un champ scalaire comme clé de partition. Une fois la collection prête, Milvus crée le nombre spécifié de partitions à l’intérieur de celle-ci. À la réception d’une entité insérée, Milvus calcule une valeur de hachage à partir de la valeur de la clé de partition de l’entité, effectue une opération modulo en fonction de cette valeur de hachage et de la propriété « <code translate="no">partitions_num</code> » de la collection pour obtenir l’ID de la partition cible, puis stocke l’entité dans cette partition.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/partition-vs-partition-key.png" alt="Partition Vs Partition Key" class="doc-image" id="partition-vs-partition-key" /> 
   <span>Partition vs clé de partition</span>
  
 </span></p>
<p>La figure suivante illustre la manière dont Milvus traite les requêtes de recherche dans une collection, que la fonctionnalité de clé de partition soit activée ou non.</p>
<ul>
<li><p>Si la clé de partition est désactivée, Milvus recherche les entités les plus similaires au vecteur de requête au sein de la collection. Vous pouvez restreindre le champ de recherche si vous savez quelle partition contient les résultats les plus pertinents.</p></li>
<li><p>Si la clé de partition est activée, Milvus détermine le champ de recherche en fonction de la valeur de la clé de partition spécifiée dans un filtre de recherche et analyse uniquement les entités présentes dans les partitions correspondantes.</p></li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/with-and-without-partition-key.png" alt="With And Without Partition Key" class="doc-image" id="with-and-without-partition-key" /> 
   <span>Avec et sans clé de partition</span>
  
 </span></p>
<h2 id="Use-Partition-Key" class="common-anchor-header">Utilisation de la clé de partition<button data-href="#Use-Partition-Key" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/fr/v2.6.x/use-partition-key.md#Set-Partition-Key">définir la clé de partition</a>,</p></li>
<li><p><a href="/docs/fr/v2.6.x/use-partition-key.md#Set-Partition-Numbers">définir le nombre de partitions à créer</a> (facultatif),</p></li>
<li><p><a href="/docs/fr/v2.6.x/use-partition-key.md#Create-Filtering-Condition">Créer une condition de filtrage basée sur la clé de partition</a>, et</p></li>
<li><p><a href="/docs/fr/v2.6.x/use-partition-key.md#Index-Partition-Key">indexer la clé de partition</a> (recommandé).</p></li>
</ul>
<h3 id="Set-Partition-Key" class="common-anchor-header">Définir la clé de partition<button data-href="#Set-Partition-Key" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour désigner un champ scalaire comme clé de partition, vous devez définir son attribut « <code translate="no">is_partition_key</code> » (Type de partition) sur « <code translate="no">true</code> » (Clé de partition) lorsque vous ajoutez le champ scalaire.</p>
<div class="alert note">
<p>Lorsque vous définissez un champ scalaire comme clé de partition, les valeurs de ce champ ne peuvent être ni vides ni nulles.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient, DataType
)

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

schema = client.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>)
    
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>)

<span class="hljs-comment"># Add the partition key</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>, 
    datatype=DataType.VARCHAR, 
    max_length=<span class="hljs-number">512</span>,
<span class="highlighted-wrapper-line">    is_partition_key=<span class="hljs-literal">True</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-comment">// Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());
        
<span class="hljs-comment">// Add the partition key</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
<span class="highlighted-wrapper-line">        .isPartitionKey(<span class="hljs-literal">true</span>)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
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

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">false</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;my_varchar&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithIsPartitionKey(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">512</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// 3. Create a collection in customized setup mode</span>
<span class="hljs-comment">// 3.1 Define fields</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-attr">is_partition_key</span>: <span class="hljs-literal">true</span></span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            },
            {
                &quot;fieldName&quot;: &quot;my_varchar&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;isPartitionKey&quot;: true,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 512
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Partition-Numbers" class="common-anchor-header">Définir le nombre de partitions<button data-href="#Set-Partition-Numbers" class="anchor-icon" translate="no">
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
    </button></h3><p>Lorsque vous désignez un champ scalaire d’une collection comme clé de partition, Milvus crée automatiquement 16 partitions dans la collection. À la réception d’une entité, Milvus choisit une partition en fonction de la valeur de la clé de partition de cette entité et stocke l’entité dans cette partition, ce qui fait que certaines ou toutes les partitions contiennent des entités avec des valeurs de clé de partition différentes.</p>
<p>Vous pouvez également définir le nombre de partitions à créer lors de la création de la collection. Cette option n’est valable que si vous avez désigné un champ scalaire comme clé de partition.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    num_partitions=<span class="hljs-number">128</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
                .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
                .collectionSchema(schema)
                .numPartitions(<span class="hljs-number">128</span>)
                .build();
        client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithNumPartitions(<span class="hljs-number">128</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">create_collection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">num_partitions</span>: <span class="hljs-number">128</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;partitionsNum&quot;: 128
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Filtering-Condition" class="common-anchor-header">Créer une condition de filtrage<button data-href="#Create-Filtering-Condition" class="anchor-icon" translate="no">
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
    </button></h3><p>Lorsque vous effectuez des recherches ANN dans une collection où la fonctionnalité de clé de partition est activée, vous devez inclure dans la requête de recherche une expression de filtrage impliquant la clé de partition. Dans cette expression, vous pouvez restreindre la valeur de la clé de partition à une plage spécifique afin que Milvus limite le champ de recherche aux partitions correspondantes.</p>
<p>Lors de l’exécution d’opérations de suppression, il est conseillé d’inclure une expression de filtrage spécifiant une seule clé de partition afin d’optimiser l’efficacité de la suppression. Cette approche limite l’opération de suppression à une partition particulière, ce qui réduit l’amplification d’écriture lors de la compaction et permet d’économiser des ressources pour la compaction et l’indexation.</p>
<p>Les exemples suivants illustrent le filtrage basé sur la clé de partition, en fonction d’une valeur spécifique de clé de partition et d’un ensemble de valeurs de clé de partition.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Filter based on a single partition key value, or</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>

<span class="hljs-comment"># Filter based on multiple partition key values</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Filter based on a single partition key value, or</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;partition_key == &#x27;x&#x27; &amp;&amp; &lt;other conditions&gt;&quot;</span>;

<span class="hljs-comment">// Filter based on multiple partition key values</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;partition_key in [&#x27;x&#x27;, &#x27;y&#x27;, &#x27;z&#x27;] &amp;&amp; &lt;other conditions&gt;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Filter based on a single partition key value, or</span>
filter = <span class="hljs-string">&quot;partition_key == &#x27;x&#x27; &amp;&amp; &lt;other conditions&gt;&quot;</span>

<span class="hljs-comment">// Filter based on multiple partition key values</span>
filter = <span class="hljs-string">&quot;partition_key in [&#x27;x&#x27;, &#x27;y&#x27;, &#x27;z&#x27;] &amp;&amp; &lt;other conditions&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Filter based on a single partition key value, or</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>

<span class="hljs-comment">// Filter based on multiple partition key values</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Filter based on a single partition key value, or</span>
<span class="hljs-built_in">export</span> filter=<span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>

<span class="hljs-comment"># Filter based on multiple partition key values</span>
<span class="hljs-built_in">export</span> filter=<span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Vous devez remplacer « <code translate="no">partition_key</code> » par le nom du champ désigné comme clé de partition.</p>
</div>
<h3 id="Index-Partition-Key" class="common-anchor-header">Index de la clé de partition<button data-href="#Index-Partition-Key" class="anchor-icon" translate="no">
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
    </button></h3><p>Nous vous recommandons de créer un index scalaire sur le champ de clé de partition.</p>
<p>La clé de partition restreint la recherche aux partitions susceptibles de contenir les valeurs de clé de partition correspondantes. Cependant, chaque partition contient généralement des entités présentant de nombreuses valeurs de clé de partition différentes ; Milvus évalue donc toujours le filtre basé sur la clé de partition par rapport à chaque entité des partitions qu’il explore. En l’absence d’index scalaire sur ce champ, cette évaluation consiste en un balayage complet des valeurs du champ, ce qui peut représenter une part importante de la latence de recherche sur les grandes collections. Avec un index scalaire, Milvus recherche plutôt les entités correspondantes dans l’index.</p>
<p>Cette évaluation a lieu quel que soit le type d’index vectoriel. Milvus peut intégrer les valeurs de clé de partition dans des index vectoriels de la famille HNSW afin qu’une recherche filtrée par clé de partition ne parcoure que les sous-index pertinents, mais cette optimisation restreint le parcours vectoriel — elle ne supprime pas l’évaluation du filtre. Les recherches qui filtrent uniquement sur des champs scalaires ne bénéficient d’aucun raccourci équivalent. Dans les deux cas, c’est la présence d’un index scalaire sur le champ de clé de partition qui garantit la rapidité de l’évaluation.</p>
<p>Choisissez le type d’index en fonction du champ de clé de partition :</p>
<ul>
<li><p><a href="/docs/fr/v2.6.x/inverted.md">INVERTED</a> convient à la plupart des champs de clé de partition, car les filtres basés sur la clé de partition utilisent des conditions de type « <code translate="no">==</code> » et « <code translate="no">in</code> ».</p></li>
<li><p><a href="/docs/fr/v2.6.x/bitmap.md">BITMAP</a> convient aux champs comportant peu de valeurs distinctes. En règle générale, n’utilisez-le que lorsque le champ contient moins de 500 valeurs distinctes.</p></li>
<li><p><a href="/docs/fr/v2.6.x/stl-sort.md">STL_SORT</a> est une alternative pour les champs numériques et de type « <code translate="no">VARCHAR</code> ».</p></li>
</ul>
<p>Les exemples suivants ajoutent un index « <code translate="no">INVERTED</code> » sur le champ « Partition Key » aux paramètres d’index de la collection, en plus de l’index sur le champ « vector ».</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

<span class="hljs-comment"># Index the partition key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span></span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());

<span class="hljs-comment">// Index the partition key</span>
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)
<span class="highlighted-wrapper-line">        .indexType(IndexParam.IndexType.INVERTED)</span>
        .build());

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOptions := []milvusclient.CreateIndexOption{
    milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>,
        index.NewAutoIndex(entity.COSINE)),
    <span class="hljs-comment">// Index the partition key</span>
    milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;my_varchar&quot;</span>,
        index.NewInvertedIndex()),
}

<span class="hljs-keyword">for</span> _, opt := <span class="hljs-keyword">range</span> indexOptions {
    indexTask, err := client.CreateIndex(ctx, opt)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        fmt.Println(err.Error())
        <span class="hljs-comment">// handle error</span>
    }
    err = indexTask.Await(ctx)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>
},{
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-comment">// Index the partition key</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span></span>
}]

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>(index_params)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;vector&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexName&quot;: &quot;vector&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        },
        {
            &quot;fieldName&quot;: &quot;my_varchar&quot;,
            &quot;indexName&quot;: &quot;my_varchar&quot;,
            &quot;indexType&quot;: &quot;INVERTED&quot;
        }
    ]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Transmettez ces paramètres d’index lors de la création de la collection, ou créez l’index sur une collection existante. Pour plus de détails, consultez la section <a href="/docs/fr/v2.6.x/create-collection.md">Créer une collection</a>.</p>
<h2 id="Use-Partition-Key-Isolation" class="common-anchor-header">Utilisation de l’isolation de la clé de partition<button data-href="#Use-Partition-Key-Isolation" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans un scénario de multi-locataires, vous pouvez désigner le champ scalaire lié aux identités des locataires comme clé de partition et créer un filtre basé sur une valeur spécifique de ce champ scalaire. Afin d’améliorer encore les performances de recherche dans des scénarios similaires, Milvus introduit la fonctionnalité d’isolation de la clé de partition.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/partition-key-isolation.png" alt="Partition Key Isolation" class="doc-image" id="partition-key-isolation" /> 
   <span>Isolement de la clé de partition</span>
  
 </span></p>
<p>Comme le montre la figure ci-dessus, Milvus regroupe les entités en fonction de la valeur de la clé de partition et crée un index distinct pour chacun de ces groupes. Lorsqu’il reçoit une requête de recherche, Milvus localise l’index en fonction de la valeur de la clé de partition spécifiée dans la condition de filtrage et limite le champ de recherche aux entités incluses dans cet index, évitant ainsi de parcourir des entités non pertinentes pendant la recherche et améliorant considérablement les performances de recherche.</p>
<p>Une fois l’isolation par clé de partition activée, vous devez inclure une seule valeur spécifique dans le filtre basé sur la clé de partition afin que Milvus puisse limiter le champ de recherche aux entités incluses dans l’index qui correspondent à cette valeur.</p>
<div class="alert note">
<p>Actuellement, la fonctionnalité d’isolation de la clé de partition s’applique uniquement aux recherches dont le type d’index est défini sur HNSW.</p>
</div>
<p>L’isolation de la clé de partition ne remplace pas l’index scalaire sur le champ « Partition Key ». La valeur de la clé de partition dans le filtre permet de localiser le sous-index correspondant, mais Milvus évalue toujours le filtre lui-même pour identifier les entités correspondantes ; nous vous recommandons donc <a href="/docs/fr/v2.6.x/use-partition-key.md#Index-Partition-Key">d’indexer</a> également <a href="/docs/fr/v2.6.x/use-partition-key.md#Index-Partition-Key">la clé de partition</a>.</p>
<h3 id="Enable-Partition-Key-Isolation" class="common-anchor-header">Activer l’isolation par clé de partition<button data-href="#Enable-Partition-Key-Isolation" class="anchor-icon" translate="no">
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
    </button></h3><p>Les exemples de code suivants montrent comment activer l’isolation par clé de partition.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    properties={<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>: <span class="hljs-literal">True</span>}</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
properties.put(<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .properties(properties)
        .build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithProperty(<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>, <span class="hljs-literal">true</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;partitionkey.isolation&quot;</span>: <span class="hljs-literal">true</span>
    }
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;partitionKeyIsolation&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Une fois l’isolation de la clé de partition activée, vous pouvez toujours définir la clé de partition et le nombre de partitions comme décrit dans <a href="/docs/fr/v2.6.x/use-partition-key.md#Set-Partition-Numbers">la section</a> « <a href="/docs/fr/v2.6.x/use-partition-key.md#Set-Partition-Numbers">Définir le nombre de partitions</a> ». Notez que le filtre basé sur la clé de partition ne doit inclure qu’une seule valeur spécifique de clé de partition.</p>
