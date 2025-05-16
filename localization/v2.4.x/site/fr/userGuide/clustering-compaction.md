---
id: clustering-compaction.md
title: Compaction de la mise en grappe
related_key: 'clustering, compaction'
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction.png" alt="Without clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Sans regroupement Compaction</span> </span></p>
<p>Si Milvus peut répartir les entités entre les segments en fonction des valeurs d'un champ spécifique, l'étendue de la recherche peut être limitée à un segment, ce qui améliore les performances de la recherche.</p>
<p>Le<strong>compactage par regroupement</strong> est une fonctionnalité de Milvus qui redistribue les entités entre les segments d'une collection en fonction des valeurs d'un champ scalaire. Pour activer cette fonctionnalité, vous devez d'abord sélectionner un champ scalaire comme <strong>clé de clustering</strong>. Cela permet à Milvus de redistribuer les entités dans un segment lorsque leurs valeurs de clé de clustering se situent dans une plage spécifique. Lorsque vous déclenchez un compactage de clustering, Milvus génère/met à jour un index global appelé <strong>PartitionStats</strong>, qui enregistre la relation de mappage entre les segments et les valeurs de clé de clustering.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction-2.png" alt="With Clustering Compaction" class="doc-image" id="with-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Avec le compactage de clustering</span> </span></p>
<p>En utilisant <strong>PartitionStats</strong> comme référence, Milvus peut élaguer les données non pertinentes lors de la réception d'une requête de recherche qui comporte une valeur de clé de clustering et limiter l'étendue de la recherche aux segments correspondant à la valeur, ce qui améliore les performances de la recherche. Pour plus de détails sur l'amélioration des performances, reportez-vous à la section Tests de référence.</p>
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
<pre><code translate="no" class="language-yaml">dataCoord:
  compaction:
    clustering:
      <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span> 
      autoEnable: <span class="hljs-literal">false</span> 
      triggerInterval: 600 
      minInterval: 3600 
      maxInterval: 259200 
      newDataSizeThreshold: 512m 
      <span class="hljs-built_in">timeout</span>: 7200
     
queryNode:
  enableSegmentPrune: <span class="hljs-literal">true</span> 

datanode:
  clusteringCompaction:
    memoryBufferRatio: 0.1 
    workPoolSize: 8  
common:
  usePartitionKeyAsClusteringKey: <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">dataCoord.compaction.clustering</code></p>
<table>
<thead>
<tr><th>Configuration Elément</th><th>Description de l'élément</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enable</code></td><td>Spécifie s'il faut activer le compactage de clustering.<br>Définissez cette valeur sur <code translate="no">true</code> si vous devez activer cette fonction pour chaque collection ayant une clé de clustering.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">autoEnable</code></td><td>Spécifie s'il faut activer le compactage déclenché automatiquement.<br>La valeur <code translate="no">true</code> indique que Milvus compacte les collections ayant une clé de clustering aux intervalles spécifiés.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">triggerInterval</code></td><td>Spécifie l'intervalle en millisecondes auquel Milvus démarre le compactage en grappe.<br>Ce paramètre n'est valide que lorsque <code translate="no">autoEnable</code> est défini sur <code translate="no">true</code>.</td><td>-</td></tr>
<tr><td><code translate="no">minInterval</code></td><td>Spécifie l'intervalle minimum en secondes.<br>Ce paramètre n'est valide que lorsque <code translate="no">autoEnable</code> est défini sur <code translate="no">true</code>.<br>La définition d'un nombre entier supérieur à triggerInterval permet d'éviter des compactages répétés sur une courte période.</td><td>-</td></tr>
<tr><td><code translate="no">maxInterval</code></td><td>Spécifie l'intervalle maximal en secondes.<br>Ce paramètre n'est valide que lorsque <code translate="no">autoEnable</code> est défini sur <code translate="no">true</code>.<br>Lorsque Milvus détecte qu'une collection n'a pas été compactée par clustering pendant une durée supérieure à cette valeur, il force un compactage par clustering.</td><td>-</td></tr>
<tr><td><code translate="no">newDataSizeThreshold</code></td><td>Spécifie le seuil supérieur de déclenchement du compactage en grappes.<br>Ce paramètre n'est valide que si <code translate="no">autoEnable</code> est défini sur <code translate="no">true</code>.<br>Lorsque Milvus détecte que le volume de données d'une collection dépasse cette valeur, il lance un processus de compactage en grappes.</td><td>-</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Spécifie le délai d'attente pour un compactage en grappe.<br>Un compactage en grappe échoue si sa durée d'exécution dépasse cette valeur.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">queryNode</code></p>
<table>
<thead>
<tr><th>Élément de configuration</th><th>Description de l'élément de configuration</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enableSegmentPrune</code></td><td>Indique si Milvus élague les données en se référant à PartitionStats lors de la réception de requêtes de recherche.<br>La valeur <code translate="no">true</code> permet à Milvus d'élaguer les données non pertinentes des segments lors d'une demande de recherche/interrogation.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">dataNode.clusteringCompaction</code></p>
<table>
<thead>
<tr><th>Configuration Élément</th><th>Description de l'élément</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">memoryBufferRatio</code></td><td>Spécifie le ratio de mémoire tampon pour les tâches de compactage de clustering. <br>Milvus vide les données lorsque la taille des données dépasse la taille de la mémoire tampon allouée calculée à l'aide de ce ratio.</td><td>-</td></tr>
<tr><td><code translate="no">workPoolSize</code></td><td>Spécifie la taille du pool de travailleurs pour une tâche de compactage en grappe.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">common</code></p>
<table>
<thead>
<tr><th>Configuration Elément</th><th>Description de l'élément de configuration</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">usePartitionKeyAsClusteringKey</code></td><td>Spécifie s'il faut utiliser la clé de partition dans les collections comme clé de regroupement.<br>La valeur <code translate="no">true</code> indique que la clé de partition est utilisée comme clé de regroupement.<br>Vous pouvez toujours remplacer ce paramètre dans une collection en définissant explicitement une clé de regroupement.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
</ul>
<p>Pour appliquer les modifications ci-dessus à votre cluster Milvus, veuillez suivre les étapes des sections <a href="/docs/fr/v2.4.x/configure-helm.md">Configurer Milvus avec Helm</a> et <a href="/docs/fr/v2.4.x/configure_operator.md">Configurer Milvus avec Milvus Operators</a>.</p>
<h3 id="Collection-Configuration" class="common-anchor-header">Configuration de la collecte</h3><p>Pour compacter le clustering dans une collection spécifique, vous devez sélectionner un champ scalaire de la collection comme clé de clustering.</p>
<pre><code translate="no" class="language-python">default_fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;key&quot;</span>, dtype=DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;var&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, is_primary=<span class="hljs-literal">False</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embeddings&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=dim)
]

default_schema = CollectionSchema(
    fields=default_fields, 
    description=<span class="hljs-string">&quot;test clustering-key collection&quot;</span>
)

coll1 = Collection(name=<span class="hljs-string">&quot;clustering_test&quot;</span>, schema=default_schema)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Vous pouvez utiliser les champs scalaires des types de données suivants comme clé de clustering : <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, <code translate="no">Double</code>, et <code translate="no">VarChar</code>.</p>
</div>
<h2 id="Trigger-Clustering-Compaction" class="common-anchor-header">Déclencher le compactage de la mise en grappe<button data-href="#Trigger-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>Si vous avez activé le compactage automatique du clustering, Milvus déclenche automatiquement le compactage à l'intervalle spécifié. Vous pouvez également déclencher manuellement le compactage comme suit :</p>
<pre><code translate="no" class="language-python">coll1.compact(is_clustering=<span class="hljs-literal">True</span>)
coll1.get_compaction_state(is_clustering=<span class="hljs-literal">True</span>)
coll1.wait_for_compaction_completed(is_clustering=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Benchmark-Test" class="common-anchor-header">Test de référence</h3><p>Le volume de données et les modèles de requêtes combinés déterminent l'amélioration des performances que le compactage de clustering peut apporter. Un test de référence interne démontre que le compactage en grappe permet de multiplier par 25 le nombre de requêtes par seconde (QPS).</p>
<p>Le test de référence porte sur une collection d'entités provenant d'un ensemble de données LAION de 20 millions d'unités et de 768 dimensions, le champ clé étant désigné comme clé de clustering. Après le déclenchement du compactage de la collection, des recherches simultanées sont envoyées jusqu'à ce que l'utilisation de l'unité centrale atteigne un niveau élevé.</p>
<table>
  <thead>
    <tr>
      <th rowspan="2">Filtre de recherche</th>
      <th rowspan="2">Ratio d'élagage</th>
      <th colspan="5">Latence (ms)</th>
      <th rowspan="2">QPS (reqs/s)</th>
    </tr>
    <tr>
      <th>Moyenne</th>
      <th>Min</th>
      <th>Max</th>
      <th>Médiane</th>
      <th>TP99</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Aucun</td>
      <td>0%</td>
      <td>1685</td>
      <td>672</td>
      <td>2294</td>
      <td>1710</td>
      <td>2291</td>
      <td>17.75</td>
    </tr>
    <tr>
      <td>clé &gt; 200 et clé &lt; 800</td>
      <td>40.2%</td>
      <td>1045</td>
      <td>47</td>
      <td>1828</td>
      <td>1085</td>
      <td>1617</td>
      <td>28.38</td>
    </tr>
    <tr>
      <td>clé &gt; 200 et clé &lt; 600</td>
      <td>59.8%</td>
      <td>829</td>
      <td>45</td>
      <td>1483</td>
      <td>882</td>
      <td>1303</td>
      <td>35.78</td>
    </tr>
    <tr>
      <td>clé &gt; 200 et clé &lt; 400</td>
      <td>79.5%</td>
      <td>550</td>
      <td>100</td>
      <td>985</td>
      <td>584</td>
      <td>898</td>
      <td>54.00</td>
    </tr>
    <tr>
      <td>clé == 1000</td>
      <td>99%</td>
      <td>68</td>
      <td>24</td>
      <td>1273</td>
      <td>70</td>
      <td>246</td>
      <td>431.41</td>
    </tr>
  </tbody>
</table>
<p>Au fur et à mesure que la plage de recherche se réduit dans les filtres de recherche, le taux d'élagage augmente. Cela signifie que davantage d'entités sont ignorées au cours du processus de recherche. Si l'on compare les statistiques de la première et de la dernière ligne, on constate que les recherches sans compactage de grappes nécessitent l'analyse de l'ensemble de la collection. En revanche, les recherches avec compactage de grappes à l'aide d'une clé spécifique peuvent être multipliées par 25.</p>
<h2 id="Best-practices" class="common-anchor-header">Meilleures pratiques<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p>Activez cette option pour les collections contenant de gros volumes de données : les performances de recherche s'améliorent lorsque les volumes de données d'une collection sont plus importants. Il est conseillé d'activer cette fonctionnalité pour les collections comportant plus d'un million d'entités.</p></li>
<li><p>Choisissez une clé de clustering appropriée : vous pouvez utiliser des champs scalaires couramment employés comme conditions de filtrage en tant que clé de clustering. Pour une collection contenant des données provenant de plusieurs locataires, vous pouvez utiliser le champ qui distingue un locataire d'un autre comme clé de regroupement.</p></li>
<li><p>Utiliser la clé de partition comme clé de regroupement Vous pouvez définir <code translate="no">common.usePartitionKeyAsClusteringKey</code> sur true si vous souhaitez activer cette fonctionnalité pour toutes les collections de votre instance Milvus ou si vous rencontrez toujours des problèmes de performances dans une grande collection avec une clé de partition. Ainsi, vous disposerez d'une clé de regroupement et d'une clé de partition lorsque vous choisirez un champ scalaire dans une collection comme clé de partition.</p>
<p>Notez que ce paramètre ne vous empêche pas de choisir un autre champ scalaire comme clé de clustering. La clé de regroupement explicitement désignée est toujours prioritaire.</p></li>
</ul>
