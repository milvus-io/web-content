---
id: hnsw-prq.md
title: HNSW_PRQ
summary: >-
  HNSW_PRQ exploite les graphes Hierarchical Navigable Small World (HNSW) avec
  la quantification résiduelle de produit (PRQ), offrant une méthode
  d'indexation vectorielle avancée qui vous permet d'ajuster finement le
  compromis entre la taille de l'index et la précision. La PRQ va au-delà de la
  quantification par produit (PQ) traditionnelle en introduisant une étape de
  quantification résiduelle (RQ) pour capturer des informations supplémentaires,
  ce qui permet d'obtenir une plus grande précision ou des index plus compacts
  par rapport aux méthodes purement basées sur la PQ. Cependant, les étapes
  supplémentaires peuvent entraîner une surcharge de calcul pendant la
  construction de l'index et la recherche.
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
    </button></h1><p><strong>HNSW_PRQ</strong> exploite les graphes Hierarchical Navigable Small World (HNSW) avec la quantification résiduelle de produit (PRQ), offrant une méthode d'indexation vectorielle avancée qui vous permet d'ajuster finement le compromis entre la taille de l'index et la précision. La PRQ va au-delà de la quantification par produit (PQ) traditionnelle en introduisant une étape de quantification résiduelle (RQ) pour capturer des informations supplémentaires, ce qui permet d'obtenir une plus grande précision ou des index plus compacts par rapport aux méthodes purement basées sur la PQ. Toutefois, les étapes supplémentaires peuvent entraîner une surcharge de calcul lors de la construction de l'index et de la recherche.</p>
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
    </button></h2><p>HNSW_PRQ combine deux techniques d'indexation : <strong>HSNW</strong> pour une navigation rapide basée sur les graphes et <strong>PRQ</strong> pour une compression vectorielle efficace.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW construit un graphe multicouche où chaque nœud correspond à un vecteur de l'ensemble de données. Dans ce graphe, les nœuds sont connectés en fonction de leur similarité, ce qui permet de parcourir rapidement l'espace de données. La structure hiérarchique permet à l'algorithme de recherche de réduire le nombre de voisins candidats, ce qui accélère considérablement le processus de recherche dans les espaces à haute dimension.</p>
<p>Pour plus d'informations, voir <a href="/docs/fr/hnsw.md">HNSW</a>.</p>
<h3 id="PRQ" class="common-anchor-header">PRQ</h3><p>PRQ est une approche de compression vectorielle en plusieurs étapes qui combine deux techniques complémentaires : PQ et RQ. En divisant d'abord un vecteur de haute dimension en sous-vecteurs plus petits (via PQ) et en quantifiant ensuite toute différence restante (via RQ), PRQ permet d'obtenir une représentation compacte mais précise des données d'origine.</p>
<p>La figure suivante illustre son fonctionnement.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw-prq.png" alt="Hnsw Prq" class="doc-image" id="hnsw-prq" />
   </span> <span class="img-wrapper"> <span>Hnsw Prq</span> </span></p>
<ol>
<li><p><strong>Quantification du produit (PQ)</strong></p>
<p>Dans cette phase, le vecteur original est divisé en sous-vecteurs plus petits, et chaque sous-vecteur est mis en correspondance avec son centroïde le plus proche dans un livre de codes appris. Ce mappage réduit considérablement la taille des données, mais introduit une erreur d'arrondi puisque chaque sous-vecteur est approximé par un seul centroïde. Pour plus de détails, voir <a href="/docs/fr/ivf-pq.md#PQ">IVF_PQ</a>.</p></li>
<li><p><strong>Quantification résiduelle (RQ)</strong></p>
<p>Après l'étape PQ, RQ quantifie le résidu - la différence entre le vecteur original et son approximation basée sur PQ - en utilisant des livres de codes supplémentaires. Comme ce résidu est généralement beaucoup plus petit, il peut être codé plus précisément sans que cela n'entraîne une augmentation importante de l'espace de stockage.</p>
<p>Le paramètre <code translate="no">nrq</code> détermine le nombre de fois que ce résidu est quantifié de manière itérative, ce qui vous permet d'affiner l'équilibre entre l'efficacité et la précision de la compression.</p></li>
<li><p><strong>Représentation finale de la compression</strong></p>
<p>Une fois que RQ a fini de quantifier le résidu, les codes entiers de PQ et de RQ sont combinés en un seul index compressé. En capturant des détails raffinés que PQ seul pourrait manquer, RQ améliore la précision sans entraîner une augmentation significative de l'espace de stockage. C'est cette synergie entre PQ et RQ qui définit le PRQ.</p></li>
</ol>
<h3 id="HNSW-+-PRQ" class="common-anchor-header">HNSW + PRQ</h3><p>En combinant HNSW et PRQ, <strong>HNSW_PRQ</strong> conserve la recherche rapide basée sur les graphes de HNSW tout en tirant parti de la compression en plusieurs étapes de PRQ. Le flux de travail se présente comme suit :</p>
<ol>
<li><p><strong>Compression des données :</strong> Chaque vecteur est d'abord transformé par PQ en une représentation grossière, puis les résidus sont quantifiés par RQ pour être affinés. Le résultat est un ensemble de codes compacts représentant chaque vecteur.</p></li>
<li><p><strong>Construction du graphique :</strong> Les vecteurs compressés (y compris les codes PQ et RQ) constituent la base de la construction du graphe HNSW. Les données étant stockées sous une forme compacte, le graphe nécessite moins de mémoire et la navigation est accélérée.</p></li>
<li><p><strong>Recherche de candidats :</strong> Pendant la recherche, HNSW utilise les représentations comprimées pour parcourir le graphe et récupérer un ensemble de candidats. Cela permet de réduire considérablement le nombre de vecteurs à examiner.</p></li>
<li><p><strong>Affinage des résultats (facultatif) :</strong> Les résultats initiaux des candidats peuvent être affinés pour une meilleure précision, en fonction des paramètres suivants :</p>
<ul>
<li><p><code translate="no">refine</code>: Contrôle si cette étape d'affinage est activée. Lorsqu'il est défini sur <code translate="no">true</code>, le système recalcule les distances à l'aide de représentations plus précises ou non compressées.</p></li>
<li><p><code translate="no">refine_type</code>: Spécifie le niveau de précision des données utilisées pendant l'affinage (par exemple, SQ6, SQ8, BF16). Un choix de précision plus élevé, tel que <code translate="no">FP32</code>, peut donner des résultats plus précis, mais nécessite plus de mémoire. La précision doit être supérieure à celle de l'ensemble de données compressées d'origine de <code translate="no">sq_type</code>.</p></li>
<li><p><code translate="no">refine_k</code>: Agit comme un facteur d'agrandissement. Par exemple, si votre top <em>k</em> est 100 et que <code translate="no">refine_k</code> est 2, le système reclasse les 200 premiers candidats et renvoie les 100 meilleurs, ce qui améliore la précision globale.</p></li>
</ul></li>
</ol>
<p>Pour obtenir la liste complète des paramètres et des valeurs valides, reportez-vous à la section <a href="/docs/fr/hnsw-prq.md#Index-params">Paramètres de l'index</a>.</p>
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
    </button></h2><p>Pour construire un index <code translate="no">HNSW_PRQ</code> sur un champ de vecteurs dans Milvus, utilisez la méthode <code translate="no">add_index()</code>, en spécifiant les paramètres <code translate="no">index_type</code>, <code translate="no">metric_type</code> et d'autres paramètres pour l'index.</p>
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
<li><p><code translate="no">index_type</code>: Le type d'index à construire. Dans cet exemple, la valeur est <code translate="no">HNSW_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: La méthode utilisée pour calculer la distance entre les vecteurs. Les valeurs prises en charge sont <code translate="no">COSINE</code>, <code translate="no">L2</code> et <code translate="no">IP</code>. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/metric.md">Types de métriques</a>.</p></li>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la construction de l'index. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/hnsw-prq.md#Index-building-params">Paramètres de construction de l'index</a>.</p></li>
</ul>
<p>Une fois les paramètres de l'index configurés, vous pouvez créer l'index en utilisant directement la méthode <code translate="no">create_index()</code> ou en transmettant les paramètres de l'index dans la méthode <code translate="no">create_collection</code>. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/create-collection.md">Créer une collection</a>.</p>
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
<li><code translate="no">params</code>: Options de configuration supplémentaires pour la recherche sur l'index. Pour plus de détails, voir <a href="/docs/fr/hnsw-prq.md#Index-specific-search-params">Paramètres de recherche spécifiques à l'index</a>.</li>
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
    </button></h2><p>Cette section présente une vue d'ensemble des paramètres utilisés pour construire un index et effectuer des recherches dans l'index.</p>
<h3 id="Index-building-params" class="common-anchor-header">Paramètres de construction d'index</h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés sur <code translate="no">params</code> lors de la <a href="/docs/fr/hnsw-prq.md#Build-index">création d'un index</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Paramètre</p></th>
     <th><p>Description de l'index</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Nombre maximal de connexions （ou d'arêtes) que chaque nœud peut avoir dans le graphe, y compris les arêtes sortantes et entrantes. Ce paramètre affecte directement la construction de l'index et la recherche.</p></td>
     <td><p><strong>Type</strong>: Integer (nombre entier) <strong>Plage</strong>: [2, 2048]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">30</code> (jusqu'à 30 arêtes sortantes et 30 arêtes entrantes par nœud)</p></td>
     <td><p>Une valeur plus élevée de <code translate="no">M</code> entraîne généralement une <strong>plus grande précision</strong>, mais <strong>augmente la charge de mémoire</strong> et <strong>ralentit à la fois la construction de l'index et la recherche</strong>. Envisagez d'augmenter <code translate="no">M</code> pour les ensembles de données de grande dimensionnalité ou lorsqu'un rappel élevé est crucial.</p>
<p>Pensez à diminuer <code translate="no">M</code> lorsque l'utilisation de la mémoire et la vitesse de recherche sont des préoccupations majeures.</p>
<p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette fourchette : [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Un plus grand nombre de candidats est évalué pour chaque nouvel élément, mais le nombre maximum de connexions réellement établies est toujours limité par <code translate="no">M</code>.</p></td>
     <td><p><strong>Type</strong>: Integer (nombre entier) <strong>Plage</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">360</code></p></td>
     <td><p>Une valeur plus élevée de <code translate="no">efConstruction</code> se traduit généralement par un <strong>index plus précis</strong>, étant donné que davantage de connexions potentielles sont explorées. Cependant, cela entraîne également un <strong>allongement du temps d'indexation et une utilisation accrue de la mémoire</strong> lors de la construction. Envisagez d'augmenter <code translate="no">efConstruction</code> pour améliorer la précision, en particulier dans les scénarios où le temps d'indexation est moins critique.</p>
<p>Pensez à diminuer <code translate="no">efConstruction</code> pour accélérer la construction de l'index lorsque les ressources sont limitées.</p>
<p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette fourchette : [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Nombre de sous-vecteurs (utilisés pour la quantification) à diviser en chaque vecteur de haute dimension au cours du processus de quantification.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, 65536]</p>
<p><strong>Valeur par défaut</strong>: Aucune</p></td>
     <td><p>Une valeur plus élevée de <code translate="no">m</code> peut améliorer la précision, mais elle augmente également la complexité du calcul et l'utilisation de la mémoire. <code translate="no">m</code> doit être un diviseur de la dimension du vecteur<em>(D)</em> pour garantir une décomposition correcte. Une valeur couramment recommandée est <em>m = D/2</em>.</p>
<p>Dans la plupart des cas, nous vous recommandons de choisir une valeur comprise dans cet intervalle : [D/8, D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Le nombre de bits utilisés pour représenter l'indice du centroïde de chaque sous-vecteur sous forme comprimée. Il détermine directement la taille de chaque livre de codes, qui contiendra $2^{\textit{nbits}}$ centroïdes. Par exemple, si <code translate="no">nbits</code> est fixé à 8, chaque sous-vecteur sera représenté par un indice de centroïde de 8 bits. Cela permet d'avoir $2^8$ (256) centroïdes possibles dans le livre de codes pour ce sous-vecteur.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, 64]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">8</code></p></td>
     <td><p>Une valeur plus élevée de <code translate="no">nbits</code> permet d'obtenir des livres de codes plus importants, ce qui peut conduire à des représentations plus précises des vecteurs d'origine. Dans la plupart des cas, nous vous recommandons de choisir une valeur comprise dans cette fourchette : [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nrq</code></p></td>
     <td><p>Contrôle le nombre de sous-quantifieurs résiduels utilisés dans l'étape RQ. Un plus grand nombre de sous-quantificateurs permet d'obtenir une plus grande compression, mais peut entraîner une perte d'informations plus importante.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, 16]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">2</code></p></td>
     <td><p>Une valeur plus élevée de <code translate="no">nrq</code> permet des étapes supplémentaires de sous-quantification résiduelle, ce qui peut conduire à une reconstruction plus précise des vecteurs originaux. Toutefois, cela implique également de stocker et de calculer davantage de sous-quantificateurs, ce qui se traduit par une taille d'index plus importante et un surcoût de calcul plus élevé.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Un indicateur booléen qui contrôle si une étape de raffinement est appliquée pendant la recherche. L'affinage consiste à reclasser les résultats initiaux en calculant les distances exactes entre le vecteur de la requête et les candidats.</p></td>
     <td><p><strong>Type</strong>: booléen : <strong>Plage</strong> booléenne : [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">false</code></p></td>
     <td><p>Définissez <code translate="no">true</code> si une grande précision est essentielle et que vous pouvez tolérer des temps de recherche légèrement plus lents. Utilisez <code translate="no">false</code> si la rapidité est une priorité et qu'un compromis mineur sur la précision est acceptable.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Cette précision doit être supérieure à celle des vecteurs compressés (définie par les paramètres <code translate="no">m</code> et <code translate="no">nbits</code> ).</p></td>
     <td><p><strong>Type</strong>: <strong>Plage</strong>:[ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>Valeur par défaut</strong>: Aucune</p></td>
     <td><p>Utilisez <code translate="no">FP32</code> pour une précision maximale avec un coût de mémoire plus élevé, ou <code translate="no">SQ6</code>/<code translate="no">SQ8</code> pour une meilleure compression. <code translate="no">BF16</code> et <code translate="no">FP16</code> offrent une alternative équilibrée.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Paramètres de recherche spécifiques à l'index</h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés dans <code translate="no">search_params.params</code> lors d'une <a href="/docs/fr/hnsw-prq.md#Search-on-index">recherche dans l'index</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Paramètre</p></th>
     <th><p>Paramètre Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Contrôle l'étendue de la recherche lors de l'extraction des plus proches voisins. Il détermine le nombre de nœuds visités et évalués en tant que plus proches voisins potentiels. 
 Ce paramètre n'affecte que le processus de recherche et s'applique exclusivement à la couche inférieure du graphe.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Portée</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valeur par défaut</strong>: <em>limit</em> (TopK plus proches voisins à retourner)</p></td>
     <td><p>Une valeur plus élevée de <code translate="no">ef</code> permet généralement d'<strong>améliorer la précision de la recherche</strong>, car davantage de voisins potentiels sont pris en compte. Envisagez d'augmenter <code translate="no">ef</code> lorsqu'il est essentiel d'obtenir un rappel élevé et que la vitesse de recherche n'est pas une préoccupation majeure.</p>
<p>Pensez à diminuer <code translate="no">ef</code> pour privilégier les recherches plus rapides, en particulier dans les scénarios où une légère réduction de la précision est acceptable.</p>
<p>Dans la plupart des cas, nous vous recommandons de fixer une valeur comprise dans cette fourchette : [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Facteur d'agrandissement qui contrôle le nombre de candidats supplémentaires examinés au cours de l'étape d'affinement (reranking), par rapport aux K premiers résultats demandés.</p></td>
     <td><p><strong>Type</strong>: Flottant <strong>Plage</strong>: [1, <em>float_max</em>)</p>
<p><strong>Valeur par défaut</strong>: 1</p></td>
     <td><p>Des valeurs élevées de <code translate="no">refine_k</code> peuvent améliorer le rappel et la précision, mais augmentent également le temps de recherche et l'utilisation des ressources. Une valeur de 1 signifie que le processus d'affinement ne prend en compte que les K premiers résultats.</p></td>
   </tr>
</table>
