---
id: hnsw.md
title: HNSW
summary: >-
  L'index HNSW est un algorithme d'indexation basé sur un graphe qui peut
  améliorer les performances lors de la recherche de vecteurs flottants à haute
  dimension. Il offre une excellente précision de recherche et une faible
  latence, tout en nécessitant une surcharge de mémoire importante pour
  maintenir sa structure de graphe hiérarchique.
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
    </button></h1><p>L'index <strong>HNSW</strong> est un algorithme d'indexation <strong>basé sur un graphe</strong> qui peut améliorer les performances lors de la recherche de vecteurs flottants à haute dimension. Il offre une <strong>excellente</strong> précision de recherche et une <strong>faible</strong> latence, mais il nécessite une surcharge de mémoire <strong>importante</strong> pour maintenir sa structure de graphe hiérarchique.</p>
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
    </button></h2><p>L'algorithme Hierarchical Navigable Small World (HNSW) construit un graphe multicouche, un peu comme une carte avec différents niveaux de zoom. La <strong>couche inférieure</strong> contient tous les points de données, tandis que les <strong>couches supérieures</strong> sont constituées d'un sous-ensemble de points de données échantillonnés dans la couche inférieure.</p>
<p>Dans cette hiérarchie, chaque couche contient des nœuds représentant des points de données, reliés par des arêtes qui indiquent leur proximité. Les couches supérieures permettent des sauts à longue distance pour se rapprocher rapidement de la cible, tandis que les couches inférieures permettent une recherche fine pour obtenir les résultats les plus précis.</p>
<p>Voici comment cela fonctionne :</p>
<ol>
<li><p><strong>Point d'entrée</strong>: La recherche commence à un point d'entrée fixe dans la couche supérieure, qui est un nœud prédéterminé dans le graphe.</p></li>
<li><p><strong>Recherche avide</strong>: L'algorithme se déplace avec avidité vers le voisin le plus proche de la couche actuelle jusqu'à ce qu'il ne puisse plus se rapprocher du vecteur de la requête. Les couches supérieures ont une fonction de navigation, agissant comme un filtre grossier pour localiser les points d'entrée potentiels pour la recherche plus fine aux niveaux inférieurs.</p></li>
<li><p><strong>Descente de couche</strong>: Une fois qu'un <strong>minimum local</strong> est atteint dans la couche actuelle, l'algorithme descend dans la couche inférieure, en utilisant une connexion préétablie, et répète la recherche avide.</p></li>
<li><p><strong>Raffinement</strong><strong>final</strong>: Ce processus se poursuit jusqu'à ce que la couche inférieure soit atteinte, où une dernière étape d'affinage identifie les voisins les plus proches.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" />
   </span> <span class="img-wrapper"> <span>HNSW</span> </span></p>
<p>Les performances de HNSW dépendent de plusieurs paramètres clés qui contrôlent à la fois la structure du graphe et le comportement de recherche. Ces paramètres sont les suivants :</p>
<ul>
<li><p><code translate="no">M</code>: Le nombre maximum d'arêtes ou de connexions que chaque nœud peut avoir dans le graphe à chaque niveau de la hiérarchie. Une valeur plus élevée de <code translate="no">M</code> permet d'obtenir un graphe plus dense et d'augmenter le rappel et la précision car la recherche a plus de voies à explorer, ce qui consomme également plus de mémoire et ralentit le temps d'insertion en raison des connexions supplémentaires. Comme le montre l'image ci-dessus, <strong>M = 5</strong> indique que chaque nœud du graphe HNSW est directement connecté à un maximum de 5 autres nœuds. Cela crée une structure de graphe modérément dense où les nœuds disposent de plusieurs chemins pour atteindre d'autres nœuds.</p></li>
<li><p><code translate="no">efConstruction</code>: Le nombre de candidats pris en compte lors de la construction de l'index. Une valeur plus élevée ( <code translate="no">efConstruction</code> ) permet généralement d'obtenir un graphe de meilleure qualité, mais sa construction prend plus de temps.</p></li>
<li><p><code translate="no">ef</code>: Le nombre de voisins évalués lors d'une recherche. L'augmentation de <code translate="no">ef</code> améliore la probabilité de trouver les voisins les plus proches, mais ralentit le processus de recherche.</p></li>
</ul>
<p>Pour plus d'informations sur la manière d'adapter ces paramètres à vos besoins, reportez-vous à la section <a href="/docs/fr/hnsw.md#Index-params">Paramètres de l'index</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Création d'un index<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour construire un index <code translate="no">HNSW</code> sur un champ de vecteurs dans Milvus, utilisez la méthode <code translate="no">add_index()</code>, en spécifiant les paramètres <code translate="no">index_type</code>, <code translate="no">metric_type</code> et des paramètres supplémentaires pour l'index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

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
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">index_type</code>: Le type d'index à construire. Dans cet exemple, la valeur est <code translate="no">HNSW</code>.</p></li>
<li><p><code translate="no">metric_type</code>: La méthode utilisée pour calculer la distance entre les vecteurs. Les valeurs prises en charge sont <code translate="no">COSINE</code>, <code translate="no">L2</code> et <code translate="no">IP</code>. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/metric.md">Types de métriques</a>.</p></li>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la construction de l'index.</p>
<ul>
<li><p><code translate="no">M</code>: Nombre maximal de voisins auxquels chaque nœud peut se connecter.</p></li>
<li><p><code translate="no">efConstruction</code>: Nombre de voisins candidats pris en compte pour la connexion lors de la construction de l'index.</p></li>
</ul>
<p>Pour en savoir plus sur les paramètres de construction disponibles pour l'index <code translate="no">HNSW</code>, reportez-vous à <a href="/docs/fr/hnsw.md#Index-building-params">Paramètres de construction de l'index</a>.</p></li>
</ul>
<p>Une fois les paramètres de l'index configurés, vous pouvez créer l'index en utilisant directement la méthode <code translate="no">create_index()</code> ou en passant les paramètres de l'index dans la méthode <code translate="no">create_collection</code>. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/create-collection.md">Créer une collection</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Recherche sur l'index<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois l'index construit et les entités insérées, vous pouvez effectuer des recherches de similarité sur l'index.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la recherche sur l'index.</p>
<ul>
<li><code translate="no">ef</code>: Nombre de voisins à prendre en compte lors d'une recherche.</li>
</ul>
<p>Pour en savoir plus sur les paramètres de recherche disponibles pour l'index <code translate="no">HNSW</code>, reportez-vous à <a href="/docs/fr/hnsw.md#Index-specific-search-params">Paramètres de recherche spécifiques à l'index</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Paramètres de l'index<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Cette section donne un aperçu des paramètres utilisés pour construire un index et effectuer des recherches sur l'index.</p>
<h3 id="Index-building-params" class="common-anchor-header">Paramètres de construction d'index</h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés sur <code translate="no">params</code> lors de la <a href="/docs/fr/hnsw.md#Build-index">création d'un index</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description de l'index</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Nombre maximal de connexions （ou d'arêtes) que chaque nœud peut avoir dans le graphe, y compris les arêtes sortantes et entrantes. Ce paramètre affecte directement la construction de l'index et la recherche.</p></td>
     <td><p><strong>Type</strong>: Integer (nombre entier) <strong>Plage</strong>: [2, 2048]</p><p><strong>Valeur par défaut</strong>: <code translate="no">30</code> (jusqu'à 30 arêtes sortantes et 30 arêtes entrantes par nœud)</p></td>
     <td><p>Une valeur plus élevée de <code translate="no">M</code> conduit généralement à une <strong>plus grande précision</strong>, mais <strong>augmente la charge de mémoire</strong> et <strong>ralentit à la fois la construction de l'index et la recherche</strong>. Envisagez d'augmenter <code translate="no">M</code> pour les ensembles de données à haute dimensionnalité ou lorsqu'un rappel élevé est crucial.</p><p>Pensez à diminuer <code translate="no">M</code> lorsque l'utilisation de la mémoire et la vitesse de recherche sont des préoccupations majeures.</p><p>Dans la plupart des cas, nous vous recommandons de fixer une valeur comprise dans cette fourchette : [5, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Nombre de voisins candidats pris en compte pour la connexion lors de la construction de l'index. Un plus grand nombre de candidats est évalué pour chaque nouvel élément, mais le nombre maximum de connexions réellement établies est toujours limité par <code translate="no">M</code>.</p></td>
     <td><p><strong>Type</strong>: Integer (nombre entier) <strong>Plage</strong>: [1, <em>int_max</em>]</p><p><strong>Valeur par défaut</strong>: <code translate="no">360</code></p></td>
     <td><p>Une valeur plus élevée de <code translate="no">efConstruction</code> se traduit généralement par un <strong>index plus précis</strong>, étant donné que davantage de connexions potentielles sont explorées. Cependant, cela entraîne également un <strong>allongement du temps d'indexation et une augmentation de l'utilisation de la mémoire</strong> pendant la construction. Envisagez d'augmenter <code translate="no">efConstruction</code> pour améliorer la précision, en particulier dans les scénarios où le temps d'indexation est moins critique.</p><p>Pensez à diminuer <code translate="no">efConstruction</code> pour accélérer la construction de l'index lorsque les ressources sont limitées.</p><p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette fourchette : [50, 500].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Paramètres de recherche spécifiques à l'index</h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés dans <code translate="no">search_params.params</code> lors d'une <a href="/docs/fr/hnsw.md#Search-on-index">recherche dans l'index</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Contrôle l'étendue de la recherche lors de l'extraction des plus proches voisins. Il détermine le nombre de nœuds visités et évalués en tant que voisins les plus proches potentiels.  Ce paramètre n'affecte que le processus de recherche et s'applique exclusivement à la couche inférieure du graphe.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Portée</strong>: [1, <em>int_max</em>]</p><p><strong>Valeur par défaut</strong>: <em>limit</em> (TopK plus proches voisins à retourner)</p></td>
     <td><p>Une valeur plus élevée de <code translate="no">ef</code> permet généralement d'<strong>améliorer la précision de la recherche</strong>, car davantage de voisins potentiels sont pris en compte. Toutefois, cela <strong>augmente</strong> également <strong>le temps de recherche</strong>. Envisagez d'augmenter <code translate="no">ef</code> lorsqu'il est essentiel d'obtenir un rappel élevé et que la vitesse de recherche est moins importante.</p><p>Pensez à diminuer <code translate="no">ef</code> pour privilégier les recherches plus rapides, en particulier dans les scénarios où une légère réduction de la précision est acceptable.</p><p>Dans la plupart des cas, nous vous recommandons de fixer une valeur comprise dans cette fourchette : [K, 10K].</p></td>
   </tr>
</table>
