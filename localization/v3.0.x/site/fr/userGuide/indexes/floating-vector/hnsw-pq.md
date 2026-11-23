---
id: hnsw-pq.md
title: HNSW_PQ
summary: >-
  HNSW_PQ exploite les graphes « Hierarchical Navigable Small World » (HNSW)
  associés à la quantification des produits (PQ), créant ainsi une méthode
  avancée d’indexation vectorielle qui offre un compromis contrôlable entre
  taille et précision. Par rapport à HNSW_SQ, ce type d'index offre un taux de
  rappel plus élevé pour un même niveau de compression, mais avec une vitesse de
  traitement des requêtes plus faible et un temps de construction de l'index
  plus long.
---
<h1 id="HNSWPQ" class="common-anchor-header">HNSW_PQ<button data-href="#HNSWPQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_PQ</strong> exploite les graphes HNSW (Hierarchical Navigable Small World) associés à la quantification des produits (PQ), créant ainsi une méthode avancée d'indexation vectorielle qui offre un compromis contrôlable entre taille et précision. Par rapport à <a href="/docs/fr/hnsw-sq.md">HNSW_SQ</a>, ce type d’index offre un taux de rappel plus élevé pour un même niveau de compression, mais avec une vitesse de traitement des requêtes inférieure et un temps de construction de l’index plus long.</p>
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
    </button></h2><p>HNSW_PQ combine deux techniques d’indexation : <strong>HNSW</strong> pour une navigation rapide basée sur des graphes et <strong>PQ</strong> pour une compression vectorielle efficace.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW construit un graphe multicouche où chaque nœud correspond à un vecteur du jeu de données. Dans ce graphe, les nœuds sont reliés en fonction de leur similarité, ce qui permet un parcours rapide de l’espace de données. La structure hiérarchique permet à l’algorithme de recherche de restreindre le nombre de voisins candidats, accélérant ainsi considérablement le processus de recherche dans les espaces de haute dimension.</p>
<p>Pour plus d’informations, consultez la section <a href="/docs/fr/hnsw.md">HNSW</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ<button data-href="#PQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PQ est une technique de compression vectorielle qui décompose les vecteurs de haute dimension en sous-vecteurs plus petits, qui sont ensuite quantifiés et compressés. La compression réduit considérablement les besoins en mémoire et accélère les calculs de distance.</p>
<p>Pour plus d’informations, consultez <a href="/docs/fr/ivf-pq.md#PQ">IVF_PQ</a>.</p>
<h3 id="HNSW-+-PQ" class="common-anchor-header">HNSW + PQ<button data-href="#HNSW-+-PQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_PQ combine les atouts de HNSW et de PQ pour permettre une recherche approximative efficace du plus proche voisin. Il utilise PQ pour compresser les données (réduisant ainsi l'utilisation de mémoire), puis construit un graphe HNSW à partir de ces vecteurs compressés afin de permettre une récupération rapide des candidats. Au cours de la recherche, l’algorithme peut, s’il le souhaite, affiner les résultats candidats à l’aide de données de plus haute précision pour une meilleure exactitude. Voici comment le processus fonctionne :</p>
<ol>
<li><p><strong>Compression des données</strong>: PQ divise chaque vecteur en plusieurs sous-vecteurs et les quantifie à l’aide d’un livre de codes de centroïdes, contrôlé par des paramètres tels que « <code translate="no">m</code> » (nombre de sous-vecteurs) et « <code translate="no">nbits</code> » (nombre de bits par sous-vecteur).</p></li>
<li><p><strong>Construction du graphe</strong>: les vecteurs compressés sont ensuite utilisés pour construire un graphe HNSW. Les vecteurs étant stockés sous forme compressée, le graphe obtenu est généralement plus petit, nécessite moins de mémoire et peut être parcouru plus rapidement, ce qui accélère considérablement l’étape de recherche des candidats.</p></li>
<li><p><strong>Récupération des candidats</strong>: Lorsqu’une requête est exécutée, l’algorithme utilise les données compressées du graphe HNSW pour identifier efficacement un ensemble de voisins candidats. Cette recherche basée sur le graphe réduit considérablement le nombre de vecteurs à prendre en compte, améliorant ainsi la latence des requêtes par rapport aux recherches par force brute.</p></li>
<li><p><strong>(Facultatif) Affinage des résultats</strong>: les résultats candidats initiaux peuvent être affinés pour une meilleure précision, en fonction des paramètres suivants :</p>
<ul>
<li><p><code translate="no">refine</code>: Détermine si cette étape de raffinement est activée. Lorsqu’elle est définie sur « <code translate="no">true</code> », le système recalcule les distances à l’aide de représentations à plus haute précision ou non compressées.</p></li>
<li><p><code translate="no">refine_type</code>: Spécifie le niveau de précision des données utilisées lors du raffinement (par exemple, SQ6, SQ8, BF16). Un choix de précision plus élevée, tel que « <code translate="no">FP32</code> », peut fournir des résultats plus précis mais nécessite davantage de mémoire. Ce niveau doit dépasser la précision de l’ensemble de données compressé d’origine de <code translate="no">sq_type</code>.</p></li>
<li><p><code translate="no">refine_k</code>: Agit comme un facteur d’agrandissement. Par exemple, si votre « top <em>k »</em> est égal à 100 et que « <code translate="no">refine_k</code> » est égal à 2, le système reclassifie les 200 meilleurs candidats et renvoie les 100 meilleurs, améliorant ainsi la précision globale.</p></li>
</ul></li>
</ol>
<p>Pour obtenir la liste complète des paramètres et des valeurs valides, consultez la section « <a href="/docs/fr/hnsw-sq.md#Index-params">Paramètres d’index</a> ».</p>
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
    </button></h2><p>Pour créer un index « <code translate="no">HNSW_PQ</code> » sur un champ vectoriel dans Milvus, utilisez la méthode « <code translate="no">add_index()</code> » en spécifiant « <code translate="no">index_type</code> », « <code translate="no">metric_type</code> » et les paramètres supplémentaires pour l’index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">index_type</code>: Le type d’index à créer. Dans cet exemple, définissez la valeur sur ` <code translate="no">HNSW_PQ</code>`.</p></li>
<li><p><code translate="no">metric_type</code>: Méthode utilisée pour calculer la distance entre les vecteurs. Les valeurs prises en charge sont notamment <code translate="no">COSINE</code>, <code translate="no">L2</code> et <code translate="no">IP</code>. Pour plus de détails, reportez-vous à <a href="/docs/fr/metric.md">la section Types de métriques</a>.</p></li>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la création de l’index. Pour plus de détails, reportez-vous à la section « <a href="/docs/fr/hnsw-pq.md#Index-building-params">Paramètres de création d’index</a> ».</p></li>
</ul>
<p>Une fois les paramètres d’index configurés, vous pouvez créer l’index en utilisant directement la méthode ` <code translate="no">create_index()</code> ` ou en transmettant les paramètres d’index à la méthode ` <code translate="no">create_collection</code> `. Pour plus de détails, consultez la section <a href="/docs/fr/create-collection.md">Créer une collection</a>.</p>
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
    </button></h2><p>Une fois l’index créé et les entités insérées, vous pouvez effectuer des recherches de similarité sur l’index.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Parameter controlling query time/accuracy trade-off</span>
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># The magnification factor</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><code translate="no">params</code>: Options de configuration supplémentaires pour la recherche sur l’index. Pour plus de détails, consultez la section « <a href="/docs/fr/hnsw-pq.md#Index-specific-search-params">Paramètres de recherche spécifiques à l’index</a> ».</li>
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
    </button></h2><p>Cette section présente une vue d'ensemble des paramètres utilisés pour créer un index et effectuer des recherches sur celui-ci.</p>
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
    </button></h3><p>Le tableau suivant répertorie les paramètres pouvant être configurés dans <code translate="no">params</code> lors de <a href="/docs/fr/hnsw-pq.md#Build-index">la création d’un index</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion d'optimisation</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Nombre maximal de connexions (ou arêtes) que chaque nœud peut avoir dans le graphe, y compris les arêtes sortantes et entrantes.
 Ce paramètre affecte directement la construction de l'index et la recherche.</p></td>
     <td><p><strong>Type</strong>: Entier
 <strong>Plage</strong>: [2, 2048]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">30</code> (jusqu’à 30 arêtes sortantes et 30 arêtes entrantes par nœud)</p></td>
     <td><p>Un <code translate="no">M</code> plus élevé offre généralement <strong>une meilleure précision</strong>, mais <strong>augmente la consommation de mémoire</strong> et <strong>ralentit à la fois la construction de l'index et la recherche</strong>.
 Envisagez d'augmenter <code translate="no">M</code> pour les ensembles de données de grande dimension ou lorsqu'un taux de rappel élevé est crucial.</p>
<p>Envisagez de réduire l’ <code translate="no">M</code> lorsque l’utilisation de la mémoire et la vitesse de recherche sont des priorités.</p>
<p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette plage : [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Nombre de voisins candidats pris en compte pour une connexion lors de la construction de l’index.
Un ensemble plus large de candidats est évalué pour chaque nouvel élément, mais le nombre maximal de connexions effectivement établies reste limité par <code translate="no">M</code>.</p></td>
     <td><p><strong>Type</strong>: Entier
 <strong>Plage</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">360</code></p></td>
     <td><p>Une valeur plus élevée pour « <code translate="no">efConstruction</code> » se traduit généralement par un <strong>index plus précis</strong>, car davantage de connexions potentielles sont explorées. Cependant, cela entraîne également <strong>un temps d’indexation plus long et une utilisation accrue de la mémoire</strong> pendant la construction.
Envisagez d’augmenter la valeur de « <code translate="no">efConstruction</code> » pour améliorer la précision, en particulier dans les cas où le temps d’indexation est moins critique.</p>
<p>Envisagez de réduire la valeur d’ <code translate="no">efConstruction</code> pour accélérer la construction de l’index lorsque les contraintes de ressources sont un facteur important.</p>
<p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette plage : [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Nombre de sous-vecteurs (utilisés pour la quantification) en lesquels chaque vecteur de haute dimension doit être divisé au cours du processus de quantification.</p></td>
     <td><p><strong>Type</strong>: Entier
 <strong>Plage</strong>: [1, 65536]</p>
<p><strong>Valeur par défaut</strong>: Aucune</p></td>
     <td><p>Une valeur plus élevée pour « <code translate="no">m</code> » peut améliorer la précision, mais elle augmente également la complexité de calcul et l'utilisation de la mémoire.
 <code translate="no">m</code> doit être un diviseur de la dimension du vecteur (<em>D</em>) pour garantir une décomposition correcte. Une valeur couramment recommandée est <em>m = D/2</em>.</p>
<p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette plage : [D/8, D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Nombre de bits utilisés pour représenter l’indice du centroïde de chaque sous-vecteur sous forme compressée. Il détermine directement la taille de chaque livre de codes.
 Chaque livre de codes contiendra<sup>2nbits</sup> de centroïdes. Par exemple, si <code translate="no">nbits</code> est défini sur 8, chaque sous-vecteur sera représenté par un index de centroïde de 8 bits. Cela permet d’avoir<sup>2⁸</sup> (256) centroïdes possibles dans le livre de codes pour ce sous-vecteur.</p></td>
     <td><p><strong>Type</strong>: Entier
 <strong>Plage</strong>: [1, 24]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">8</code></p></td>
     <td><p>Une valeur plus élevée de « <code translate="no">nbits</code> » permet d’obtenir des livres de codes plus volumineux, ce qui peut conduire à des représentations plus précises des vecteurs d’origine. Cependant, cela implique également d’utiliser davantage de bits pour stocker chaque index, ce qui réduit le taux de compression.
Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette plage : [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Indicateur booléen qui détermine si une étape d’affinement est appliquée pendant la recherche. L’affinement consiste à reclasser les résultats initiaux en calculant les distances exactes entre le vecteur de requête et les candidats.</p></td>
     <td><p><strong>Type</strong>: Booléen
 <strong>Plage</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">false</code></p></td>
     <td><p>Définissez la valeur sur <code translate="no">true</code> si une grande précision est essentielle et que vous pouvez tolérer des temps de recherche légèrement plus longs. Utilisez <code translate="no">false</code> si la vitesse est une priorité et qu’un léger compromis en termes de précision est acceptable.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Détermine la précision des données utilisées pendant le processus de raffinement.
 Cette précision doit être supérieure à celle des vecteurs compressés (telle que définie par les paramètres <code translate="no">m</code> et <code translate="no">nbits</code> ).</p></td>
     <td><p><strong>Type</strong>: Chaîne de caractères
 <strong>Plage</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>Valeur par défaut</strong>: Aucune</p></td>
     <td><p>Utilisez <code translate="no">FP32</code> pour une précision maximale au prix d’une consommation de mémoire plus importante, ou <code translate="no">SQ6</code>/<code translate="no">SQ8</code> pour une meilleure compression. <code translate="no">BF16</code> et <code translate="no">FP16</code> offrent une alternative équilibrée.</p></td>
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
    </button></h3><p>Le tableau suivant répertorie les paramètres pouvant être configurés dans <code translate="no">search_params.params</code> lors <a href="/docs/fr/hnsw-pq.md#Search-on-index">d’une recherche sur l’index</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Contrôle l'étendue de la recherche lors de la récupération du plus proche voisin. Il détermine le nombre de nœuds visités et évalués en tant que plus proches voisins potentiels. 
 Ce paramètre n'affecte que le processus de recherche et s'applique exclusivement à la couche inférieure du graphe.</p></td>
     <td><p><strong>Type</strong>: Entier
 <strong>Plage</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valeur par défaut</strong>: <em>limit</em> (nombre de voisins les plus proches à renvoyer)</p></td>
     <td><p>Une valeur d’ <code translate="no">ef</code> plus élevée conduit généralement à <strong>une meilleure précision de recherche</strong>, car un plus grand nombre de voisins potentiels est pris en compte. Cependant, cela <strong>augmente</strong> également <strong>la durée de la recherche</strong>.
 Envisagez d’augmenter l’ <code translate="no">ef</code> lorsque l’obtention d’un rappel élevé est essentielle et que la vitesse de recherche est moins importante.</p>
<p>Envisagez de réduire l’ <code translate="no">ef</code> pour privilégier des recherches plus rapides, en particulier dans les cas où une légère perte de précision est acceptable.</p>
<p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette plage : [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Facteur d’amplification qui détermine le nombre de candidats supplémentaires examinés lors de la phase d’affinement (reclassement), par rapport aux K premiers résultats demandés.</p></td>
     <td><p><strong>Type</strong>: nombre à virgule flottante
 <strong>Plage</strong>: [1, <em>float_max</em>)</p>
<p><strong>Valeur par défaut</strong>: 1</p></td>
     <td><p>Des valeurs plus élevées de « <code translate="no">refine_k</code> » peuvent améliorer le rappel et la précision, mais augmentent également la durée de la recherche et la consommation de ressources. Une valeur de 1 signifie que le processus d’affinement ne prend en compte que les K premiers résultats initiaux.</p></td>
   </tr>
</table>
