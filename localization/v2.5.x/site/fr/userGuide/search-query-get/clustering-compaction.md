---
id: clustering-compaction.md
title: Compaction de la mise en grappe
summary: >-
  Le compactage en grappes est conçu pour améliorer les performances de
  recherche et réduire les coûts dans les grandes collections. Ce guide vous
  aidera à comprendre le compactage en grappes et la manière dont cette
  fonctionnalité peut améliorer les performances de recherche.
---
<h1 id="Clustering-Compaction" class="common-anchor-header">Compaction de la mise en grappe<button data-href="#Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Le compactage en grappes est conçu pour améliorer les performances de recherche et réduire les coûts dans les grandes collections. Ce guide vous aidera à comprendre le compactage en grappes et la manière dont cette fonctionnalité peut améliorer les performances de recherche.</p>
<h2 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus stocke les entités entrantes dans des segments au sein d'une collection et scelle un segment lorsqu'il est plein. Dans ce cas, un nouveau segment est créé pour accueillir les entités supplémentaires. Par conséquent, les entités sont réparties arbitrairement entre les segments. Cette répartition oblige Milvus à rechercher plusieurs segments pour trouver les voisins les plus proches d'un vecteur de requête donné.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/without-clustering-compaction.png" alt="Without Clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Sans compactage de regroupement</span> </span></p>
<p>Si Milvus peut répartir les entités entre les segments en fonction des valeurs d'un champ spécifique, l'étendue de la recherche peut être limitée à un segment, ce qui améliore les performances de la recherche.</p>
<p>Le<strong>compactage par regroupement</strong> est une fonctionnalité de Milvus qui redistribue les entités entre les segments d'une collection en fonction des valeurs d'un champ scalaire. Pour activer cette fonctionnalité, vous devez d'abord sélectionner un champ scalaire comme <strong>clé de clustering</strong>. Cela permet à Milvus de redistribuer les entités dans un segment lorsque leurs valeurs de clé de clustering se situent dans une plage spécifique. Lorsque vous déclenchez un compactage de clustering, Milvus génère/met à jour un index global appelé <strong>PartitionStats</strong>, qui enregistre la relation de mappage entre les segments et les valeurs de clé de clustering.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/clustering-compaction.png" alt="Clustering Compaction" class="doc-image" id="clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Compaction de clustering</span> </span></p>
<p>En utilisant <strong>PartitionStats</strong> comme référence, Milvus peut élaguer les données non pertinentes lors de la réception d'une requête de recherche qui comporte une valeur de clé de clustering et limiter la portée de la recherche aux segments correspondant à la valeur, ce qui améliore les performances de la recherche. Pour plus de détails sur l'amélioration des performances, reportez-vous à la section <a href="/docs/fr/v2.5.x/clustering-compaction.md#Benchmark-Test">Tests de référence</a>.</p>
<h2 id="Use-Clustering-Compaction" class="common-anchor-header">Utiliser le compactage de clustering<button data-href="#Use-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>La fonction de compactage en grappes de Milvus est hautement configurable. Vous pouvez choisir de la déclencher manuellement ou de la configurer pour qu'elle soit déclenchée automatiquement à intervalles réguliers par Milvus. Pour activer le compactage de clustering, procédez comme suit :</p>
<h3 id="Global-Configuration" class="common-anchor-header">Configuration globale</h3><p>Vous devez modifier votre fichier de configuration Milvus comme indiqué ci-dessous.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">clustering:</span>
      <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> 
      <span class="hljs-attr">autoEnable:</span> <span class="hljs-literal">false</span> 
      <span class="hljs-attr">triggerInterval:</span> <span class="hljs-number">600</span> 
      <span class="hljs-attr">minInterval:</span> <span class="hljs-number">3600</span> 
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-number">259200</span> 
      <span class="hljs-attr">newDataSizeThreshold:</span> <span class="hljs-string">512m</span> 
      <span class="hljs-attr">timeout:</span> <span class="hljs-number">7200</span>
     
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">enableSegmentPrune:</span> <span class="hljs-literal">true</span> 

<span class="hljs-attr">datanode:</span>
  <span class="hljs-attr">clusteringCompaction:</span>
    <span class="hljs-attr">memoryBufferRatio:</span> <span class="hljs-number">0.1</span> 
    <span class="hljs-attr">workPoolSize:</span> <span class="hljs-number">8</span>  
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">usePartitionKeyAsClusteringKey:</span> <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Configurer Elément</p></th>
     <th><p>Description de l'élément</p></th>
     <th><p>Valeur par défaut</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">dataCoord.compaction.clustering</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">enable</code></p></td>
     <td><p>Spécifie s'il faut activer le compactage de clustering. Définissez cette valeur sur <code translate="no">true</code> si vous devez activer cette fonction pour chaque collection ayant une clé de clustering.</p></td>
     <td><p>faux</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">autoEnable</code></p></td>
     <td><p>Indique s'il faut activer le compactage déclenché automatiquement. La valeur <code translate="no">true</code> indique que Milvus compacte les collections ayant une clé de regroupement aux intervalles spécifiés.</p></td>
     <td><p>false</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">triggerInterval</code></p></td>
     <td><p>Spécifie l'intervalle en millisecondes auquel Milvus démarre le compactage en cluster. Ceci ne s'applique que lorsque vous définissez <code translate="no">autoEnable</code> sur <code translate="no">true</code>.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">minInterval</code></p></td>
     <td><p>Spécifie l'intervalle minimum en millisecondes. Ceci s'applique uniquement lorsque vous définissez <code translate="no">autoEnable</code> à <code translate="no">true</code>.</p><p>La définition d'un nombre entier supérieur à <code translate="no">triggerInterval</code> permet d'éviter des compactages répétés sur une courte période.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">maxInterval</code></p></td>
     <td><p>Spécifie l'intervalle maximal en millisecondes. Ceci s'applique uniquement lorsque vous définissez <code translate="no">autoEnable</code> à <code translate="no">true</code>.</p><p>Lorsque Milvus détecte qu'une collection n'a pas été compactée par clustering pendant une durée supérieure à cette valeur, il force un compactage par clustering.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">newDataSizeThreshold</code></p></td>
     <td><p>Spécifie le seuil supérieur de déclenchement du compactage en grappes. Ceci s'applique uniquement lorsque vous définissez <code translate="no">autoEnable</code> sur <code translate="no">true</code>.</p><p>Lorsque Milvus détecte que le volume de données d'une collection dépasse cette valeur, il lance un processus de compactage en grappes.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">timeout</code></p></td>
     <td><p>Spécifie la durée du délai d'attente pour un compactage en grappe. Un compactage en grappe échoue si sa durée d'exécution dépasse cette valeur.</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">queryNode</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">enableSegmentPrune</code></p></td>
     <td><p>Indique si Milvus élague les données en se référant à PartitionStats lors de la réception de requêtes de recherche. Définissez cette valeur sur <code translate="no">true</code> pour que Milvus puisse élaguer les données lors de la réception de demandes de recherche/requête en se référant à PartitionStats.</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">dataNode.clusteringCompaction</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryBufferRatio</code></p></td>
     <td><p>Spécifie le ratio de mémoire tampon pour les tâches de compactage de clustering.  Milvus vide les données lorsque la taille des données dépasse la taille de la mémoire tampon allouée calculée à l'aide de ce ratio.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">workPoolSize</code></p></td>
     <td><p>Spécifie la taille du pool de travailleurs pour une tâche de compactage en grappes.</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">common</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">usePartitionKeyAsClusteringKey</code></p></td>
     <td><p>Spécifie s'il faut utiliser la clé de partition dans les collections comme clé de regroupement. En définissant ce paramètre sur true, Milvus traite les clés de partition des collections comme la clé de clustering. </p><p>Vous pouvez toujours remplacer ce paramètre dans une collection en définissant explicitement une clé de regroupement.</p></td>
     <td></td>
   </tr>
</table>
<p>Pour appliquer les modifications ci-dessus à votre cluster Milvus, veuillez suivre les étapes des sections <a href="/docs/fr/v2.5.x/configure-helm.md#Configure-Milvus-via-configuration-file">Configurer Milvus avec Helm</a> et <a href="/docs/fr/v2.5.x/configure_operator.md">Configurer Milvus avec Milvus Operators</a>.</p>
<h3 id="Collection-Configuration" class="common-anchor-header">Configuration de la collecte</h3><p>Pour compacter le clustering dans une collection spécifique, vous devez sélectionner un champ scalaire de la collection comme clé de clustering.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN
)

schema = MilvusClient.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;key&quot;</span>, DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;var&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;clustering_test&quot;</span>,
    schema=schema
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
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;key&quot;</span>)
        .dataType(DataType.Int64)
        .isClusteringKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;var&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;clustering_test&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span> = <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TOKEN</span> = <span class="hljs-string">&#x27;root:Milvus&#x27;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-variable constant_">TOKEN</span>,
});
<span class="hljs-keyword">const</span> schema = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;id&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;key&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">is_clustering_key</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;var&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">false</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
      <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,
    },
  ];
  
  <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;clustering_test&#x27;</span>,
    <span class="hljs-attr">schema</span>: schema,
  });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Vous pouvez utiliser les champs scalaires des types de données suivants comme clé de clustering : <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, <code translate="no">Double</code>, et <code translate="no">VarChar</code>.</p>
</div>
<h3 id="Trigger-Clustering-Compaction" class="common-anchor-header">Déclencher le compactage de la mise en grappe</h3><p>Si vous avez activé le compactage automatique du clustering, Milvus déclenche automatiquement le compactage à l'intervalle spécifié. Vous pouvez également déclencher manuellement le compactage comme suit :</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># trigger a manual compaction</span>
job_id = client.compact(
    collection_name=<span class="hljs-string">&quot;clustering_test&quot;</span>, 
    is_clustering=<span class="hljs-literal">True</span>
)

<span class="hljs-comment"># get the compaction state</span>
client.get_compaction_state(
    job_id=job_id,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.CompactReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.GetCompactionStateReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.CompactResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.GetCompactionStateResp;

<span class="hljs-type">CompactResp</span> <span class="hljs-variable">compactResp</span> <span class="hljs-operator">=</span> client.compact(CompactReq.builder()
        .collectionName(<span class="hljs-string">&quot;clustering_test&quot;</span>)
        .isClustering(<span class="hljs-literal">true</span>)
        .build());

<span class="hljs-type">GetCompactionStateResp</span> <span class="hljs-variable">stateResp</span> <span class="hljs-operator">=</span> client.getCompactionState(GetCompactionStateReq.builder()
        .compactionID(compactResp.getCompactionID())
        .build());

System.out.println(stateResp.getState());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// trigger a manual compaction</span>
<span class="hljs-keyword">const</span> {compactionID} = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">compact</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;clustering_test&quot;</span>, 
    <span class="hljs-attr">is_clustering</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-comment">// get the compaction state</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getCompactionState</span>({
    <span class="hljs-attr">compactionID</span>: compactionID,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Benchmark-Test" class="common-anchor-header">Test de référence<button data-href="#Benchmark-Test" class="anchor-icon" translate="no">
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
    </button></h2><p>Le volume de données et les modèles de requêtes combinés déterminent l'amélioration des performances que le compactage en cluster peut apporter. Un test de référence interne démontre que le compactage en grappes permet de multiplier par 25 le nombre de requêtes par seconde (QPS).</p>
<p>Le test de référence porte sur une collection d'entités provenant d'un ensemble de données LAION de 20 millions d'unités et de 768 dimensions, le champ <code translate="no">key</code> étant désigné comme clé de clustering. Après le déclenchement du compactage de la collection, des recherches simultanées sont envoyées jusqu'à ce que l'utilisation de l'unité centrale atteigne un niveau élevé.</p>
<table>
   <tr>
     <th rowspan="2"><p>Filtre de recherche</p></th>
     <th rowspan="2"><p>Taux d'élagage</p></th>
     <th colspan="5"><p>Temps de latence</p></th>
     <th rowspan="2"><p>Demandes/s</p></th>
   </tr>
   <tr>
     <td><p>Moyenne</p></td>
     <td><p>Min</p></td>
     <td><p>Max</p></td>
     <td><p>Médiane</p></td>
     <td><p>TP99</p></td>
   </tr>
   <tr>
     <td><p>SANS OBJET</p></td>
     <td><p>0%</p></td>
     <td><p>1685</p></td>
     <td><p>672</p></td>
     <td><p>2294</p></td>
     <td><p>1710</p></td>
     <td><p>2291</p></td>
     <td><p>17.75</p></td>
   </tr>
   <tr>
     <td><p>touche&gt;200 et touche &lt; 800</p></td>
     <td><p>40.2%</p></td>
     <td><p>1045</p></td>
     <td><p>47</p></td>
     <td><p>1828</p></td>
     <td><p>1085</p></td>
     <td><p>1617</p></td>
     <td><p>28.38</p></td>
   </tr>
   <tr>
     <td><p>touche&gt;200 et touche &lt; 600</p></td>
     <td><p>59.8%</p></td>
     <td><p>829</p></td>
     <td><p>45</p></td>
     <td><p>1483</p></td>
     <td><p>882</p></td>
     <td><p>1303</p></td>
     <td><p>35.78</p></td>
   </tr>
   <tr>
     <td><p>clé&gt;200 et clé &lt; 400</p></td>
     <td><p>79.5%</p></td>
     <td><p>550</p></td>
     <td><p>100</p></td>
     <td><p>985</p></td>
     <td><p>584</p></td>
     <td><p>898</p></td>
     <td><p>54.00</p></td>
   </tr>
   <tr>
     <td><p>clé==1000</p></td>
     <td><p>99%</p></td>
     <td><p>68</p></td>
     <td><p>24</p></td>
     <td><p>1273</p></td>
     <td><p>70</p></td>
     <td><p>246</p></td>
     <td><p>431.41</p></td>
   </tr>
</table>
<p>Au fur et à mesure que la plage de recherche se réduit dans les filtres de recherche, le taux d'élagage augmente. Cela signifie que davantage d'entités sont ignorées au cours du processus de recherche. Si l'on compare les statistiques de la première et de la dernière ligne, on constate que les recherches sans compactage de grappes nécessitent l'analyse de l'ensemble de la collection. En revanche, les recherches avec compactage par grappes utilisant une clé spécifique peuvent être multipliées par 25.</p>
<h2 id="Best-Practices" class="common-anchor-header">Meilleures pratiques<button data-href="#Best-Practices" class="anchor-icon" translate="no">
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
    </button></h2><p>Voici quelques conseils pour vous aider à utiliser efficacement le compactage en grappes :</p>
<ul>
<li><p>Activez cette option pour les collections contenant de gros volumes de données.</p>
<p>Les performances de recherche s'améliorent lorsque les volumes de données d'une collection sont plus importants. Il est conseillé d'activer cette fonctionnalité pour les collections comportant plus d'un million d'entités.</p></li>
<li><p>Choisissez une clé de clustering appropriée.</p>
<p>Vous pouvez utiliser des champs scalaires couramment employés comme conditions de filtrage en tant que clé de regroupement. Pour une collection contenant des données provenant de plusieurs locataires, vous pouvez utiliser le champ qui distingue un locataire d'un autre comme clé de regroupement.</p></li>
<li><p>Utilisez la clé de partition comme clé de regroupement.</p>
<p>Vous pouvez définir <code translate="no">common.usePartitionKeyAsClusteringKey</code> sur <code translate="no">true</code> si vous souhaitez activer cette fonctionnalité pour toutes les collections de votre instance Milvus ou si vous rencontrez toujours des problèmes de performance dans une grande collection avec une clé de partition. Ainsi, vous disposerez d'une clé de regroupement et d'une clé de partition lorsque vous choisirez un champ scalaire dans une collection comme clé de partition.</p>
<p>Notez que ce paramètre ne vous empêche pas de choisir un autre champ scalaire comme clé de clustering. La clé de regroupement explicitement désignée est toujours prioritaire.</p></li>
</ul>
