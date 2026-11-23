---
id: hnsw-prq.md
title: HNSW_PRQ
summary: >-
  HNSW_PRQ exploite les graphes « Hierarchical Navigable Small World » (HNSW)
  associés à la quantification résiduelle des produits (PRQ), offrant ainsi une
  méthode avancée d’indexation vectorielle qui permet d’ajuster avec précision
  le compromis entre la taille de l’index et la précision. La PRQ va au-delà de
  la quantification de produit (PQ) traditionnelle en introduisant une étape de
  quantification résiduelle (RQ) afin de capturer des informations
  supplémentaires, ce qui se traduit par une précision accrue ou des index plus
  compacts par rapport aux méthodes reposant uniquement sur la PQ. Cependant,
  ces étapes supplémentaires peuvent entraîner une charge de calcul plus
  importante lors de la création et de la recherche dans les index.
---
<h1 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ<button data-href="#HNSWPRQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_PRQ</strong> exploite les graphes HNSW (Hierarchical Navigable Small World) associés à la quantification résiduelle des produits (PRQ), offrant ainsi une méthode avancée d'indexation vectorielle qui vous permet d'ajuster avec précision le compromis entre la taille de l'index et la précision. La PRQ va au-delà de la quantification par produit (PQ) traditionnelle en introduisant une étape de quantification résiduelle (RQ) afin de capturer des informations supplémentaires, ce qui se traduit par une précision accrue ou des index plus compacts par rapport aux méthodes basées uniquement sur la PQ. Cependant, ces étapes supplémentaires peuvent entraîner une charge de calcul plus importante lors de la création et de la recherche dans les index.</p>
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
    </button></h2><p>HNSW_PRQ combine deux techniques d’indexation : <strong>HSNW</strong> pour une navigation rapide basée sur des graphes et <strong>PRQ</strong> pour une compression vectorielle efficace.</p>
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
<h3 id="PRQ" class="common-anchor-header">PRQ<button data-href="#PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PRQ est une approche de compression vectorielle en plusieurs étapes qui combine deux techniques complémentaires : PQ et RQ. En divisant d’abord un vecteur de haute dimension en sous-vecteurs plus petits (via PQ), puis en quantifiant toute différence restante (via RQ), PRQ permet d’obtenir une représentation compacte mais précise des données d’origine.</p>
<p>La figure suivante illustre son fonctionnement.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-prq.png" alt="Hnsw Prq" class="doc-image" id="hnsw-prq" /> 
   <span>Hnsw Prq</span>
  
 </span></p>
<ol>
<li><p><strong>Quantification par produit (PQ)</strong></p>
<p>Au cours de cette phase, le vecteur d’origine est divisé en sous-vecteurs plus petits, et chaque sous-vecteur est mappé sur son centroïde le plus proche dans un livre de codes appris. Ce mappage réduit considérablement la taille des données mais introduit une certaine erreur d’arrondi, car chaque sous-vecteur est approximé par un seul centroïde. Pour plus de détails, consultez <a href="/docs/fr/ivf-pq.md#PQ">IVF_PQ</a>.</p></li>
<li><p><strong>Quantification résiduelle (RQ)</strong></p>
<p>Après l’étape de PQ, la RQ quantifie le résidu — c’est-à-dire la différence entre le vecteur d’origine et son approximation basée sur la PQ — à l’aide de livres de codes supplémentaires. Ce résidu étant généralement beaucoup plus petit, il peut être encodé avec plus de précision sans augmentation significative de l’espace de stockage.</p>
<p>Le paramètre « <code translate="no">nrq</code> » (Nombre d’itérations de quantification) détermine le nombre de fois où ce résidu est quantifié de manière itérative, ce qui vous permet d’ajuster avec précision l’équilibre entre l’efficacité de la compression et la précision.</p></li>
<li><p><strong>Représentation finale de la compression</strong></p>
<p>Une fois que RQ a terminé la quantification du résidu, les codes entiers issus à la fois de PQ et de RQ sont combinés en un seul index compressé. En capturant des détails affinés que PQ seul pourrait manquer, RQ améliore la précision sans entraîner d’augmentation significative de l’espace de stockage. C’est cette synergie entre PQ et RQ qui définit PRQ.</p></li>
</ol>
<h3 id="HNSW-+-PRQ" class="common-anchor-header">HNSW + PRQ<button data-href="#HNSW-+-PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>En combinant HNSW et PRQ, <strong>HNSW_PRQ</strong> conserve la recherche rapide basée sur des graphes de HNSW tout en tirant parti de la compression en plusieurs étapes de PRQ. Le flux de travail se présente comme suit :</p>
<ol>
<li><p><strong>Compression des données :</strong> chaque vecteur est d’abord transformé via PQ en une représentation grossière, puis les résidus sont quantifiés via RQ pour un affinement supplémentaire. Il en résulte un ensemble de codes compacts représentant chaque vecteur.</p></li>
<li><p><strong>Construction du graphe :</strong> les vecteurs compressés (y compris les codes PQ et RQ) constituent la base de la construction du graphe HNSW. Les données étant stockées sous une forme compacte, le graphe nécessite moins de mémoire et la navigation à travers celui-ci est accélérée.</p></li>
<li><p><strong>Récupération des candidats :</strong> lors de la recherche, HNSW utilise les représentations compressées pour parcourir le graphe et récupérer un ensemble de candidats. Cela réduit considérablement le nombre de vecteurs à prendre en compte.</p></li>
<li><p><strong>(Facultatif) Affinement des résultats :</strong> les résultats initiaux peuvent être affinés pour une meilleure précision, en fonction des paramètres suivants :</p>
<ul>
<li><p><code translate="no">refine</code>: Détermine si cette étape d’affinage est activée. Lorsqu’elle est définie sur « <code translate="no">true</code> », le système recalcule les distances à l’aide de représentations de plus haute précision ou non compressées.</p></li>
<li><p><code translate="no">refine_type</code>: Spécifie le niveau de précision des données utilisées lors de l’affinage (par exemple, SQ6, SQ8, BF16). Un choix de précision plus élevée, tel que « <code translate="no">FP32</code> », peut donner des résultats plus précis mais nécessite davantage de mémoire. Ce niveau doit dépasser la précision de l’ensemble de données compressé d’origine de <code translate="no">sq_type</code>.</p></li>
<li><p><code translate="no">refine_k</code>: Agit comme un facteur d’agrandissement. Par exemple, si votre « top <em>k »</em> est égal à 100 et que « <code translate="no">refine_k</code> » est égal à 2, le système reclassifie les 200 meilleurs candidats et renvoie les 100 meilleurs, améliorant ainsi la précision globale.</p></li>
</ul></li>
</ol>
<p>Pour obtenir la liste complète des paramètres et des valeurs valides, consultez la section « <a href="/docs/fr/hnsw-prq.md#Index-params">Paramètres d’index</a> ».</p>
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
    </button></h2><p>Pour créer un index « <code translate="no">HNSW_PRQ</code> » sur un champ vectoriel dans Milvus, utilisez la méthode « <code translate="no">add_index()</code> » en spécifiant « <code translate="no">index_type</code> », « <code translate="no">metric_type</code> » et les paramètres supplémentaires pour l’index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PRQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;nrq&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">index_type</code>: Le type d’index à créer. Dans cet exemple, définissez la valeur sur ` <code translate="no">HNSW_PQ</code>`.</p></li>
<li><p><code translate="no">metric_type</code>: Méthode utilisée pour calculer la distance entre les vecteurs. Les valeurs prises en charge sont notamment <code translate="no">COSINE</code>, <code translate="no">L2</code> et <code translate="no">IP</code>. Pour plus de détails, reportez-vous à <a href="/docs/fr/metric.md">la section Types de métriques</a>.</p></li>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la création de l’index. Pour plus de détails, reportez-vous à la section « <a href="/docs/fr/hnsw-prq.md#Index-building-params">Paramètres de création d’index</a> ».</p></li>
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
<li><code translate="no">params</code>: Options de configuration supplémentaires pour la recherche sur l’index. Pour plus de détails, consultez la section « <a href="/docs/fr/hnsw-prq.md#Index-specific-search-params">Paramètres de recherche spécifiques à l’index</a> ».</li>
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
    </button></h3><p>Le tableau suivant répertorie les paramètres pouvant être configurés dans <code translate="no">params</code> lors de <a href="/docs/fr/hnsw-prq.md#Build-index">la création d’un index</a>.</p>
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
     <td><p>Un <code translate="no">M</code> plus élevé offre généralement <strong>une meilleure précision</strong>, mais <strong>augmente la consommation de mémoire</strong> et <strong>ralentit à la fois la construction de l’index et la recherche</strong>.
 Envisagez d’augmenter <code translate="no">M</code> pour les ensembles de données de grande dimension ou lorsqu’un taux de rappel élevé est crucial.</p>
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
     <td><p>PRQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Nombre de sous-vecteurs (utilisés pour la quantification) en lesquels chaque vecteur de haute dimension doit être divisé au cours du processus de quantification.</p></td>
     <td><p><strong>Type</strong>: Entier
 <strong>Plage</strong>: [1, 65536]</p>
<p><strong>Valeur par défaut</strong>: Aucune</p></td>
     <td><p>Une valeur plus élevée pour l'<code translate="no">m</code> e peut améliorer la précision, mais elle augmente également la complexité de calcul et l'utilisation de la mémoire.
 <code translate="no">m</code> doit être un diviseur de la dimension du vecteur (<em>D</em>) pour garantir une décomposition correcte. Une valeur couramment recommandée est <em>m = D/2</em>.</p>
<p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans l’intervalle suivant : [D/8, D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Nombre de bits utilisés pour représenter l’indice du centroïde de chaque sous-vecteur sous forme compressée. Il détermine directement la taille de chaque livre de codes.
 Chaque livre de codes contiendra<sup>2nbits</sup> de centroïdes. Par exemple, si <code translate="no">nbits</code> est défini sur 8, chaque sous-vecteur sera représenté par un indice de centroïde de 8 bits. Cela permet d’avoir<sup>2⁸</sup> (256) centroïdes possibles dans le livre de codes pour ce sous-vecteur.</p></td>
     <td><p><strong>Type</strong>: Entier
 <strong>Plage</strong>: [1, 24]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">8</code></p></td>
     <td><p>Une valeur plus élevée pour « <code translate="no">nbits</code> » permet d’obtenir des livres de codes plus volumineux, ce qui peut conduire à des représentations plus précises des vecteurs d’origine. Cependant, cela implique également d’utiliser davantage de bits pour stocker chaque index, ce qui réduit le taux de compression.
Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette plage : [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nrq</code></p></td>
     <td><p>Détermine le nombre de sous-quantificateurs résiduels utilisés lors de l’étape RQ. Un nombre plus élevé de sous-quantificateurs permet potentiellement d’obtenir une meilleure compression, mais peut entraîner une perte d’information plus importante.</p></td>
     <td><p><strong>Type</strong>: Entier
 <strong>Plage</strong>: [1, 16]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">2</code></p></td>
     <td><p>Une valeur d’ <code translate="no">nrq</code> e plus élevée permet d’effectuer des étapes de sous-quantification résiduelle supplémentaires, ce qui peut conduire à une reconstruction plus précise des vecteurs d’origine. Cependant, cela implique également de stocker et de calculer davantage de sous-quantificateurs, ce qui se traduit par une taille d’index plus importante et une charge de calcul plus élevée.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Indicateur booléen qui détermine si une étape de raffinement est appliquée pendant la recherche. Le raffinement consiste à reclasser les résultats initiaux en calculant les distances exactes entre le vecteur de requête et les candidats.</p></td>
     <td><p><strong>Type</strong>: Booléen
 <strong>Plage</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">false</code></p></td>
     <td><p>Définissez la valeur sur <code translate="no">true</code> si une grande précision est essentielle et que vous pouvez tolérer des temps de recherche légèrement plus longs. Utilisez <code translate="no">false</code> si la vitesse est une priorité et qu’un léger compromis en matière de précision est acceptable.</p></td>
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
    </button></h3><p>Le tableau suivant répertorie les paramètres pouvant être configurés dans <code translate="no">search_params.params</code> lors <a href="/docs/fr/hnsw-prq.md#Search-on-index">d’une recherche sur l’index</a>.</p>
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
     <td><p>Une valeur d'<code translate="no">ef</code> plus élevée conduit généralement à <strong>une meilleure précision de recherche</strong>, car un plus grand nombre de voisins potentiels est pris en compte. Cependant, cela <strong>augmente</strong> également <strong>la durée de la recherche</strong>.
 Envisagez d'augmenter la valeur d'<code translate="no">ef</code> lorsque l'obtention d'un rappel élevé est essentielle et que la vitesse de recherche est moins importante.</p>
<p>Envisagez de réduire l’ <code translate="no">ef</code> pour privilégier des recherches plus rapides, en particulier dans les cas où une légère perte de précision est acceptable.</p>
<p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette plage : [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Facteur d’amplification qui détermine le nombre de candidats supplémentaires examinés lors de la phase d’affinement (reclassement), par rapport aux K premiers résultats demandés.</p></td>
     <td><p><strong>Type</strong>: nombre à virgule flottante
 <strong>Plage</strong>: [1, <em>float_max</em>)</p>
<p><strong>Valeur par défaut</strong>: 1</p></td>
     <td><p>Des valeurs plus élevées de « <code translate="no">refine_k</code> » peuvent améliorer le rappel et la précision, mais augmentent également la durée de la recherche et la consommation de ressources. Une valeur de 1 signifie que le processus d’affinement ne prend en compte que les K premiers résultats initiaux.</p></td>
   </tr>
</table>
