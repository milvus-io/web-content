---
id: hnsw.md
title: HNSW
summary: >-
  L'index HNSW est un algorithme d'indexation basé sur des graphes qui permet
  d'améliorer les performances lors de la recherche de vecteurs flottants à
  haute dimension. Il offre une excellente précision de recherche et une faible
  latence, mais nécessite une importante consommation de mémoire pour maintenir
  sa structure hiérarchique en graphe.
---
<h1 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h1><p>L'index <strong>HNSW</strong> est un algorithme d'indexation <strong>basé sur des graphes</strong> qui permet d'améliorer les performances lors de la recherche de vecteurs flottants à haute dimension. Il offre une <strong>excellente</strong> précision de recherche et une <strong>faible</strong> latence, mais nécessite une <strong>importante</strong> surcharge mémoire pour maintenir sa structure hiérarchique en graphe.</p>
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
    </button></h2><p>L’algorithme HNSW (Hierarchical Navigable Small World) construit un graphe multicouche, un peu comme une carte comportant différents niveaux de zoom. La <strong>couche inférieure</strong> contient tous les points de données, tandis que les <strong>couches supérieures</strong> sont constituées d’un sous-ensemble de points de données échantillonnés à partir de la couche inférieure.</p>
<p>Dans cette hiérarchie, chaque couche contient des nœuds représentant des points de données, reliés par des arêtes qui indiquent leur proximité. Les couches supérieures permettent des sauts sur de longues distances pour se rapprocher rapidement de la cible, tandis que les couches inférieures permettent une recherche plus fine pour obtenir les résultats les plus précis.</p>
<p>Voici comment cela fonctionne :</p>
<ol>
<li><p><strong>Point d’entrée</strong>: la recherche commence à un point d’entrée fixe situé dans la couche supérieure, qui correspond à un nœud prédéterminé du graphe.</p></li>
<li><p><strong>Recherche gloutonne</strong>: l’algorithme se déplace de manière gloutonne vers le voisin le plus proche au sein de la couche actuelle jusqu’à ce qu’il ne puisse plus se rapprocher davantage du vecteur de requête. Les couches supérieures ont une fonction de navigation, agissant comme un filtre grossier pour localiser des points d’entrée potentiels en vue d’une recherche plus fine aux niveaux inférieurs.</p></li>
<li><p><strong>Descente entre les couches</strong>: une fois qu’un <strong>minimum local</strong> est atteint au niveau de la couche actuelle, l’algorithme passe à la couche inférieure, en utilisant une connexion préétablie, et répète la recherche gloutonne.</p></li>
<li><p><strong>Affinement</strong><strong>final</strong>: ce processus se poursuit jusqu’à ce que la couche inférieure soit atteinte, où une étape d’affinement final identifie les voisins les plus proches.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" /> 
   <span>HNSW</span>
  
 </span></p>
<p>Les performances de l’algorithme HNSW dépendent de plusieurs paramètres clés qui contrôlent à la fois la structure du graphe et le comportement de recherche. Parmi ceux-ci figurent :</p>
<ul>
<li><p><code translate="no">M</code>: Le nombre maximal d’arêtes ou de connexions que chaque nœud peut posséder dans le graphe à chaque niveau de la hiérarchie. Une valeur d’ <code translate="no">M</code> e plus élevée entraîne un graphe plus dense et augmente le rappel et la précision, car la recherche dispose de plus de chemins à explorer ; cela consomme également plus de mémoire et ralentit le temps d’insertion en raison des connexions supplémentaires. Comme le montre l’image ci-dessus, <strong>M = 5</strong> indique que chaque nœud du graphe HNSW est directement connecté à un maximum de 5 autres nœuds. Cela crée une structure de graphe modérément dense où les nœuds disposent de plusieurs chemins pour atteindre d’autres nœuds.</p></li>
<li><p><code translate="no">efConstruction</code>: Nombre de candidats pris en compte lors de la construction de l’index. Un « <code translate="no">efConstruction</code> » plus élevé se traduit généralement par un graphe de meilleure qualité, mais nécessite plus de temps pour la construction.</p></li>
<li><p><code translate="no">ef</code>: Nombre de voisins évalués lors d’une recherche. L’augmentation de l’ <code translate="no">ef</code> améliore les chances de trouver les voisins les plus proches, mais ralentit le processus de recherche.</p></li>
</ul>
<p>Pour plus de détails sur la manière d’ajuster ces paramètres en fonction de vos besoins, consultez la section « <a href="/docs/fr/hnsw.md#Index-params">Paramètres d’index</a> ».</p>
<h2 id="Build-index" class="common-anchor-header">Créer un index<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Cet exemple utilise un client connecté nommé « <code translate="no">client</code> » et une collection existante nommée « <code translate="no">your_collection_name</code> ». La collection contient un champ vectoriel à cinq dimensions nommé « <code translate="no">your_vector_field_name</code> ».</p>
<p>Définissez les paramètres d’index avec <code translate="no">add_index()</code>, puis créez l’index avec <code translate="no">create_index()</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
    } <span class="hljs-comment"># Index building params</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">index_type</code>: Le type d’index à créer. Dans cet exemple, définissez la valeur sur <code translate="no">HNSW</code>.</p></li>
<li><p><code translate="no">metric_type</code>: La méthode utilisée pour calculer la distance entre les vecteurs. Les valeurs prises en charge sont notamment <code translate="no">COSINE</code>, <code translate="no">L2</code> et <code translate="no">IP</code>. Pour plus de détails, reportez-vous à <a href="/docs/fr/metric.md">la section Types de métriques</a>.</p></li>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la création de l’index.</p>
<ul>
<li><p><code translate="no">M</code>: Nombre maximal de voisins auxquels chaque nœud peut se connecter.</p></li>
<li><p><code translate="no">efConstruction</code>: Nombre de voisins candidats pris en compte pour la connexion lors de la construction de l’index.</p></li>
</ul>
<p>L’exemple définit <code translate="no">M=64</code> et <code translate="no">efConstruction=100</code> comme paramètres de réglage prioritaires. Pour connaître les valeurs par défaut et les plages acceptées, consultez la section « <a href="/docs/fr/hnsw.md#Index-building-params">Paramètres de création d’index</a> ».</p></li>
</ul>
<p>Pour créer simultanément une collection et son index, transmettez les paramètres d’index à <code translate="no">create_collection()</code>. Pour plus de détails, consultez la section <a href="/docs/fr/create-collection.md">Créer une collection</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Recherche dans l’index<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir construit l’index et inséré les entités, chargez la collection et effectuez une recherche dans son champ vectoriel. Pour les recherches kNN classiques, définissez ` <code translate="no">ef</code> ` sur une valeur au moins égale à ` <code translate="no">limit</code>`.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

client.load_collection(collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>)

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la recherche sur l’index.</p>
<ul>
<li><code translate="no">ef</code>: Nombre de voisins à prendre en compte lors d’une recherche.</li>
</ul>
<p>Pour en savoir plus sur les paramètres de recherche disponibles pour l’index <code translate="no">HNSW</code>, consultez la section <a href="/docs/fr/hnsw.md#Index-specific-search-params">Paramètres de recherche spécifiques à l’index</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Paramètres d’index<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Les tableaux ci-dessous répertorient les paramètres de création d’index et de recherche. Les paramètres du serveur peuvent remplacer les valeurs par défaut des paramètres que vous omettez.</p>
<h3 id="Index-building-params" class="common-anchor-header">Paramètres de création d’index<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Le tableau suivant répertorie les paramètres pouvant être configurés dans <code translate="no">params</code> lors de <a href="/docs/fr/hnsw.md#Build-index">la création d’un index</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Recommandation de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Nombre maximal de connexions (ou arêtes) que chaque nœud peut avoir dans le graphe, y compris les arêtes sortantes et entrantes. Ce paramètre affecte directement la construction de l'index et la recherche.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [2, 2048]</p><p><strong>Valeur par défaut</strong>: <code translate="no">30</code> (jusqu’à 30 arêtes sortantes et 30 arêtes entrantes par nœud)</p></td>
     <td><p>Un <code translate="no">M</code> plus élevé offre généralement <strong>une meilleure précision</strong>, mais <strong>augmente la consommation de mémoire</strong> et <strong>ralentit à la fois la construction de l'index et la recherche</strong>. Envisagez d'augmenter l'<code translate="no">M</code> pour les ensembles de données à haute dimensionnalité ou lorsqu'un taux de rappel élevé est crucial.</p><p>Envisagez de réduire l’ <code translate="no">M</code> lorsque l’utilisation de la mémoire et la vitesse de recherche sont des priorités.</p><p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette plage : [5, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Nombre de voisins candidats pris en compte pour une connexion lors de la construction de l’index. Un plus grand nombre de candidats est évalué pour chaque nouvel élément, mais le nombre maximal de connexions effectivement établies reste limité par <code translate="no">M</code>.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, <em>int_max</em>]</p><p><strong>Valeur par défaut</strong>: <code translate="no">360</code></p></td>
     <td><p>Une valeur plus élevée de ` <code translate="no">efConstruction</code> ` se traduit généralement par un <strong>index plus précis</strong>, car davantage de connexions potentielles sont explorées. Cependant, cela entraîne également <strong>un temps d’indexation plus long et une utilisation accrue de la mémoire</strong> pendant la construction. Envisagez d’augmenter ` <code translate="no">efConstruction</code> ` pour améliorer la précision, en particulier dans les scénarios où le temps d’indexation est moins critique.</p><p>Envisagez de réduire la valeur d’ <code translate="no">efConstruction</code> pour accélérer la construction de l’index lorsque les contraintes de ressources sont un facteur important.</p><p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette plage : [50, 500].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Paramètres de recherche spécifiques à l’index<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Le tableau suivant répertorie les paramètres pouvant être configurés dans <code translate="no">search_params.params</code> lors <a href="/docs/fr/hnsw.md#Search-on-index">d’une recherche sur l’index</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Contrôle l'étendue de la recherche lors de la recherche du plus proche voisin. Il détermine le nombre de nœuds visités et évalués comme voisins les plus proches potentiels. Ce paramètre n'affecte que le processus de recherche et s'applique exclusivement à la couche inférieure du graphe.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, <em>int_max</em>]</p><p><strong>Valeur par défaut</strong>: <code translate="no">max(limit, 16)</code> pour une recherche kNN classique ; <code translate="no">512</code> pour une recherche par plage.</p><p>Pour une recherche kNN classique, la valeur explicite de ` <code translate="no">ef</code> ` doit être supérieure ou égale à ` <code translate="no">limit</code> ` (le nombre de voisins les plus proches à renvoyer).</p></td>
     <td><p>Une valeur <code translate="no">ef</code> plus élevée conduit généralement à <strong>une meilleure précision de recherche</strong>, car un plus grand nombre de voisins potentiels est pris en compte. Cependant, cela <strong>augmente</strong> également <strong>la durée de la recherche</strong>. Envisagez d’augmenter la valeur <code translate="no">ef</code> lorsque l’obtention d’un rappel élevé est essentielle et que la vitesse de recherche est moins importante.</p><p>Envisagez de réduire l’ <code translate="no">ef</code> pour privilégier des recherches plus rapides, en particulier dans les cas où une légère perte de précision est acceptable.</p><p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette plage : [K, 10K].</p></td>
   </tr>
</table>
