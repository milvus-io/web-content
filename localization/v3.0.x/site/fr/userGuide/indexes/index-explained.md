---
id: index-explained.md
title: Explication de l'index
summary: >-
  Un index est une structure supplémentaire construite par-dessus les données.
  Sa structure interne dépend de l’algorithme de recherche par plus proche
  voisin utilisé. Un index accélère la recherche, mais entraîne un surcroît de
  temps de prétraitement, d’espace disque et de mémoire vive pendant la
  recherche. De plus, l’utilisation d’un index réduit généralement le taux de
  rappel (même si cet effet est négligeable, il n’en reste pas moins important).
  C'est pourquoi cet article explique comment minimiser les coûts liés à
  l'utilisation d'un index tout en maximisant ses avantages.
---
<h1 id="Index-Explained" class="common-anchor-header">Explication de l'index<button data-href="#Index-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Un index est une structure supplémentaire construite par-dessus les données. Sa structure interne dépend de l’algorithme de recherche du plus proche voisin utilisé. Un index accélère la recherche, mais entraîne un surcroît de temps de prétraitement, d’espace disque et de mémoire vive (RAM) pendant la recherche. De plus, l’utilisation d’un index réduit généralement le taux de rappel (même si cet effet est négligeable, il n’en reste pas moins important). C'est pourquoi cet article explique comment minimiser les coûts liés à l'utilisation d'un index tout en maximisant ses avantages.</p>
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
    </button></h2><p>Dans Milvus, les index sont spécifiques à chaque champ, et les types d’index applicables varient en fonction des types de données des champs cibles. En tant que base de données vectorielle professionnelle, Milvus s’attache à améliorer à la fois les performances des recherches vectorielles et du filtrage scalaire, c’est pourquoi elle propose différents types d’index.</p>
<p>Le tableau suivant répertorie la correspondance entre les types de données des champs et les types d’index applicables.</p>
<table>
   <tr>
     <th><p>Type de données du champ</p></th>
     <th><p>Types d'index applicables</p></th>
   </tr>
   <tr>
     <td><p>FLOAT_VECTOR</p></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>FAISS</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_BRUTE_FORCE</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT16_VECTOR</p></li><li><p>BFLOAT16_VECTOR</p></li><li><p>INT8_VECTOR</p></li></ul></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_FORCE_BRUTE</p></li></ul></td>
   </tr>
   <tr>
     <td><p>VECTEUR_BINAIRE</p></td>
     <td><ul><li><p>BIN_FLAT</p></li><li><p>BIN_IVF_FLAT</p></li><li><p>MINHASH_LSH</p></li><li><p>FAISS</p></li></ul></td>
   </tr>
   <tr>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
     <td><p>SPARSE_INVERTED_INDEX</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>INVERTED (recommandé)</p></li><li><p>BITMAP</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li><p>BITMAP (recommandé)</p></li><li><p>INVERSÉ</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li><p>INVERSÉ</p></li><li><p>STL_SORT</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT</p></li><li><p>DOUBLE</p></li></ul></td>
     <td><p>INVERSÉ</p></td>
   </tr>
   <tr>
     <td><p>TABLEAU <sup>(éléments de types BOOL, INT8/16/32/64 et VARCHAR)</sup></p></td>
     <td><p>BITMAP (recommandé)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(éléments de types BOOL, INT8/16/32/64, FLOAT, DOUBLE et VARCHAR)</sup></p></td>
     <td><p>INVERSÉ</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>INVERTED</p></td>
   </tr>
</table>
<p>Cet article explique comment choisir les index vectoriels adaptés. Pour les champs scalaires, vous pouvez toujours utiliser le type d’index recommandé.</p>
<p>Le choix d’un type d’index adapté à une recherche vectorielle peut avoir un impact significatif sur les performances et l’utilisation des ressources. Lors du choix d’un type d’index pour un champ vectoriel, il est essentiel de prendre en compte divers facteurs, notamment la structure de données sous-jacente, l’utilisation de la mémoire et les exigences en matière de performances.</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">Anatomie d’un index vectoriel<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Comme le montre le schéma ci-dessous, un type d’index dans Milvus se compose de trois éléments essentiels : <strong>la structure de données</strong>, <strong>la quantification</strong> et <strong>le filtre</strong>. La quantification et le filtre sont facultatifs, mais sont largement utilisés en raison d’un rapport gains/coûts très favorable.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" /> 
   <span>Anatomie d’un index vectoriel</span>
  
 </span></p>
<p>Lors de la création de l’index, Milvus combine la structure de données et la méthode de quantification choisies afin de déterminer un <strong>taux d’expansion</strong> optimal. Au moment de la requête, le système récupère un <code translate="no">topK × expansion rate</code> s vecteurs candidats, applique le raffineur pour recalculer les distances avec une plus grande précision, puis renvoie les résultats d’ <code translate="no">topK</code> s les plus précis. Cette approche hybride concilie vitesse et précision en limitant le raffinement, très gourmand en ressources, à un sous-ensemble filtré de candidats.</p>
<h3 id="Data-structure" class="common-anchor-header">Structure de données<button data-href="#Data-structure" class="anchor-icon" translate="no">
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
    </button></h3><p>La structure de données constitue la couche fondamentale de l’index. Parmi les types courants, on trouve :</p>
<ul>
<li><p><strong>Fichier inversé (IVF)</strong></p>
<p>Les types d’index de la série IVF permettent à Milvus de regrouper les vecteurs en compartiments grâce à un partitionnement basé sur les centroïdes. On peut généralement supposer sans risque que tous les vecteurs d’un compartiment sont susceptibles d’être proches du vecteur de requête si le centroïde du compartiment est proche de ce dernier. Partant de ce principe, Milvus analyse uniquement les représentations vectorielles des compartiments dont les centroïdes sont proches du vecteur de requête, plutôt que d’examiner l’ensemble des données. Cette stratégie réduit les coûts de calcul tout en conservant une précision acceptable.</p>
<p>Ce type de structure de données d’index est idéal pour les ensembles de données à grande échelle nécessitant un débit élevé.</p></li>
<li><p><strong>Structure basée sur un graphe</strong></p>
<p>Une structure de données basée sur un graphe pour la recherche vectorielle, telle que Hierarchical Navigable Small World (<a href="https://arxiv.org/abs/1603.09320">HNSW</a>), construit un graphe en couches où chaque vecteur est connecté à ses voisins les plus proches. Les requêtes parcourent cette hiérarchie, en partant des couches supérieures plus grossières pour descendre vers les couches inférieures, ce qui permet une complexité de recherche logarithmique efficace.</p>
<p>Ce type de structure de données indexée excelle dans les espaces à haute dimension et les scénarios exigeant des requêtes à faible latence.</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">Quantification<button data-href="#Quantization" class="anchor-icon" translate="no">
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
    </button></h3><p>La quantification réduit l’empreinte mémoire et les coûts de calcul grâce à une représentation plus grossière :</p>
<ul>
<li><p><strong>La quantification scalaire</strong> (par exemple <strong>SQ8</strong>) permet à Milvus de compresser chaque dimension d’un vecteur en un seul octet (8 bits), réduisant ainsi l’utilisation de mémoire de 75 % par rapport aux nombres à virgule flottante 32 bits tout en conservant une précision raisonnable.</p></li>
<li><p><strong>La quantification par produit</strong> (<strong>PQ</strong>) permet à Milvus de diviser les vecteurs en sous-vecteurs et de les encoder à l’aide d’un regroupement basé sur un livre de codes. Cela permet d’atteindre des taux de compression plus élevés (par exemple, 4 à 32 fois) au prix d’une légère réduction du rappel, ce qui la rend adaptée aux environnements soumis à des contraintes de mémoire.</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">Affineur<button data-href="#Refiner" class="anchor-icon" translate="no">
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
    </button></h3><p>La quantification est intrinsèquement source de pertes. Afin de maintenir le taux de rappel, la quantification génère systématiquement plus de candidats « top-K » que nécessaire, ce qui permet aux raffinateurs d’utiliser une précision plus élevée pour sélectionner les résultats « top-K » parmi ces candidats, améliorant ainsi le taux de rappel.</p>
<p>Par exemple, le « refiner » FP32 agit sur les candidats de résultats de recherche renvoyés par la quantification en recalculant les distances à l’aide de la précision FP32 plutôt qu’à partir des valeurs quantifiées.</p>
<p>Ceci est essentiel pour les applications nécessitant un compromis entre l’efficacité de la recherche et la précision, telles que la recherche sémantique ou les systèmes de recommandation, où de légères variations de distance ont un impact significatif sur la qualité des résultats.</p>
<h3 id="Summary" class="common-anchor-header">Résumé<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h3><p>Cette architecture à plusieurs niveaux – filtrage grossier via des structures de données, calcul efficace grâce à la quantification et ajustement de la précision via le raffinement – permet à Milvus d’optimiser de manière adaptative le compromis entre précision et performances.</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">Compromis en matière de performances<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>Lors de l’évaluation des performances, il est essentiel de trouver un équilibre entre <strong>le temps de construction</strong>, <strong>le nombre de requêtes par seconde (QPS)</strong> et <strong>le taux de rappel</strong>. Les règles générales sont les suivantes :</p>
<ul>
<li><p><strong>Les types d’index basés sur des graphes</strong> surpassent généralement <strong>les variantes IVF</strong> en termes de <strong>QPS</strong>.</p></li>
<li><p><strong>Les variantes IVF</strong> sont particulièrement adaptées aux scénarios présentant <strong>un topK élevé (par exemple, supérieur à 2 000)</strong>.</p></li>
<li><p><strong>Le PQ</strong> offre généralement un meilleur taux de rappel à des taux de compression similaires par rapport au <strong>SQ</strong>, bien que ce dernier offre des performances plus rapides.</p></li>
<li><p>L'utilisation de disques durs pour une partie de l'index (comme dans <strong>DiskANN</strong>) facilite la gestion de grands ensembles de données, mais elle introduit également des goulots d'étranglement potentiels au niveau des IOPS.</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">Capacité<button data-href="#Capacity" class="anchor-icon" translate="no">
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
    </button></h3><p>La capacité implique généralement la relation entre la taille des données et la mémoire vive (RAM) disponible. Lorsque vous traitez la question de la capacité, tenez compte des éléments suivants :</p>
<ul>
<li><p>Si un quart de vos données brutes tient en mémoire, envisagez DiskANN pour sa latence stable.</p></li>
<li><p>Si l’intégralité de vos données brutes tient en mémoire, privilégiez les types d’index basés sur la mémoire et mmap.</p></li>
<li><p>Vous pouvez utiliser les types d’index avec quantification et mmap pour privilégier la capacité maximale au détriment de la précision.</p></li>
</ul>
<div class="alert note">
<p>La fonction mmap n’est pas toujours la solution. Lorsque la majeure partie de vos données se trouve sur le disque, DiskANN offre une meilleure latence.</p>
</div>
<h3 id="Recall" class="common-anchor-header">Rappel<button data-href="#Recall" class="anchor-icon" translate="no">
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
    </button></h3><p>Le rappel dépend généralement du taux de filtrage, qui correspond aux données filtrées avant les recherches. Lorsque vous traitez du rappel, tenez compte des éléments suivants :</p>
<ul>
<li><p>Si le taux de filtrage est inférieur à 85 %, les types d’index basés sur des graphes sont plus performants que les variantes IVF.</p></li>
<li><p>Si le taux de filtrage est compris entre 85 % et 95 %, utilisez les variantes IVF.</p></li>
<li><p>Si le taux de filtrage est supérieur à 98 %, utilisez Brute-Force (FLAT) pour obtenir les résultats de recherche les plus précis.</p></li>
</ul>
<div class="alert note">
<p>Les recommandations ci-dessus ne sont pas toujours valables. Il est conseillé d’ajuster le rappel en testant différents types d’index afin de déterminer celui qui fonctionne le mieux.</p>
</div>
<h3 id="Performance" class="common-anchor-header">Performances<button data-href="#Performance" class="anchor-icon" translate="no">
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
    </button></h3><p>Les performances d’une recherche dépendent généralement du « top-K », qui désigne le nombre d’enregistrements renvoyés par la recherche. En matière de performances, tenez compte des éléments suivants :</p>
<ul>
<li><p>Pour une recherche avec un top-K faible (par exemple, 2 000) nécessitant un taux de rappel élevé, les types d’index basés sur des graphes sont plus performants que les variantes IVF.</p></li>
<li><p>Pour une recherche avec un top-K élevé (par rapport au nombre total d’embeddings vectoriels), les variantes IVF constituent un meilleur choix que les types d’index basés sur des graphes.</p></li>
<li><p>Pour une recherche avec un top-K de taille moyenne et un taux de filtrage élevé, les variantes IVF constituent un meilleur choix.</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">Matrice de décision : choisir le type d’index le plus approprié<button data-href="#Decision-Matrix-Choosing-the-most-appropriate-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Le tableau suivant est une matrice de décision à laquelle vous pouvez vous référer pour choisir un type d’index approprié.</p>
<table>
   <tr>
     <th><p>Scénario</p></th>
     <th><p>Index recommandé</p></th>
     <th><p>Remarques</p></th>
   </tr>
   <tr>
     <td><p>Les données brutes tiennent en mémoire</p></td>
     <td><p>HNSW, IVF + affinage</p></td>
     <td><p>Utilisez HNSW pour un faible taux de « low-<code translate="no">k</code> » et un taux de rappel élevé.</p></td>
   </tr>
   <tr>
     <td><p>Données brutes sur disque, SSD</p></td>
     <td><p>DiskANN</p></td>
     <td><p>Optimal pour les requêtes sensibles à la latence.</p></td>
   </tr>
   <tr>
     <td><p>Données brutes sur disque, mémoire vive limitée</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>Équilibre l'accès à la mémoire et au disque.</p></td>
   </tr>
   <tr>
     <td><p>Taux de filtrage élevé (&gt;95 %)</p></td>
     <td><p>Force brute (FLAT)</p></td>
     <td><p>Évite la surcharge liée à l’index pour les petits ensembles de candidats.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">k</code> s importantes (≥ 1 % de l'ensemble de données)</p></td>
     <td><p>IVF</p></td>
     <td><p>L'élagage par grappes réduit la charge de calcul.</p></td>
   </tr>
   <tr>
     <td><p>Taux de rappel extrêmement élevé (&gt;99 %)</p></td>
     <td><p>Force brute (FLAT) + GPU</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<h2 id="Memory-usage-estimation" class="common-anchor-header">Estimation de l'utilisation de la mémoire<button data-href="#Memory-usage-estimation" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>Cette section est consacrée au calcul de la consommation de mémoire d’un type d’index spécifique et comporte de nombreux détails techniques. Vous pouvez sans crainte passer cette section si elle ne correspond pas à vos centres d’intérêt.</p>
</div>
<p>La consommation de mémoire d’un index dépend de sa structure de données, de son taux de compression par quantification et du « refiner » utilisé. De manière générale, les index basés sur des graphes ont tendance à avoir une empreinte mémoire plus importante en raison de la structure du graphe (par exemple, <strong>HNSW</strong>), ce qui implique généralement une surcharge notable par espace vectoriel. En revanche, l’IVF et ses variantes sont plus économes en mémoire car elles entraînent moins de surcoût par espace vectoriel. Cependant, des techniques avancées telles que <strong>DiskANN</strong> permettent à certaines parties de l’index, comme le graphe ou le raffineur, de résider sur le disque, ce qui réduit la charge mémoire tout en conservant les performances.</p>
<p>Plus précisément, l’utilisation de mémoire d’un index peut être calculée comme suit :</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">Utilisation de la mémoire par les index IVF<button data-href="#IVF-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>Les index IVF concilient efficacité mémoire et performances de recherche en partitionnant les données en clusters. Vous trouverez ci-dessous une ventilation de la mémoire utilisée par 1 million de vecteurs à 128 dimensions indexés à l’aide de variantes de l’IVF.</p>
<ol>
<li><p><strong>Calcul de la mémoire utilisée par les centroïdes.</strong></p>
<p>Les types d’index de la série IVF permettent à Milvus de regrouper les vecteurs en buckets à l’aide d’un partitionnement basé sur les centroïdes. Chaque centroïde est inclus dans l’index sous forme d’embedding vectoriel brut. Lorsque vous divisez les vecteurs en 2 000 clusters, l’utilisation de la mémoire peut être calculée comme suit :</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calculer la mémoire utilisée par les affectations de clusters.</strong></p>
<p>Chaque représentation vectorielle est affectée à un cluster et stockée sous forme d’identifiants entiers. Pour 2 000 clusters, un entier de 2 octets suffit. L’utilisation de la mémoire peut être calculée comme suit :</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calculer la compression résultant de la quantification.</strong></p>
<p>Les variantes d’IVF utilisent généralement PQ et SQ8, et l’utilisation de mémoire peut être estimée comme suit :</p>
<ul>
<li><p>Utilisation de PQ avec 8 sous-quantificateurs</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Utilisation de SQ8</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Le tableau suivant répertorie l’utilisation de mémoire estimée pour différentes configurations :</p>
<p><table>
<tr>
<th><p>Configuration</p></th>
<th><p>Estimation de la mémoire</p></th>
<th><p>Mémoire totale</p></th>
</tr>
<tr>
<td><p>IVF-PQ (sans raffinement)</p></td>
<td><p>1,0 Mo + 2,0 Mo + 8,0 Mo</p></td>
<td><p>11,0 Mo</p></td>
</tr>
<tr>
<td><p>IVF-PQ + affinement brut de 10 %</p></td>
<td><p>1,0 Mo + 2,0 Mo + 8,0 Mo + 51,2 Mo</p></td>
<td><p>62,2 Mo</p></td>
</tr>
<tr>
<td><p>IVF-SQ8 (sans affinement)</p></td>
<td><p>1,0 Mo + 2,0 Mo + 128 Mo</p></td>
<td><p>131,0 Mo</p></td>
</tr>
<tr>
<td><p>IVF-FLAT (vecteurs bruts complets)</p></td>
<td><p>1,0 Mo + 2,0 Mo + 512 Mo</p></td>
<td><p>515,0 Mo</p></td>
</tr>
</table></p></li>
<li><p><strong>Calculer la surcharge liée au raffinement.</strong></p>
<p>Les variantes d’IVF sont souvent associées à un affineur pour reclasser les candidats. Pour une recherche renvoyant les 10 premiers résultats avec un taux d’expansion de 5, la surcharge liée à l’affinement peut être estimée comme suit :</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">Utilisation de la mémoire par les index basés sur des graphes<button data-href="#Graph-based-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>Les types d’index basés sur des graphes, tels que HNSW, nécessitent une quantité importante de mémoire pour stocker à la fois la structure du graphe et les représentations vectorielles brutes. Vous trouverez ci-dessous une ventilation détaillée de la mémoire consommée par 1 million de vecteurs à 128 dimensions indexés à l’aide du type d’index HNSW.</p>
<ol>
<li><p><strong>Calcul de la mémoire utilisée par la structure du graphe.</strong></p>
<p>Chaque vecteur dans HNSW conserve des connexions avec ses voisins. Avec un degré de graphe (nombre d’arêtes par nœud) de 32, la mémoire consommée peut être calculée comme suit :</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calculer la mémoire utilisée par les représentations vectorielles brutes.</strong></p>
<p>La mémoire consommée par le stockage de vecteurs FP32 non compressés peut être calculée comme suit :</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>Lorsque vous utilisez HNSW pour indexer le million de vecteurs d’embeddings à 128 dimensions, la mémoire totale utilisée serait de <strong>128 Mo (graphe) + 512 Mo (vecteurs) = 640 Mo</strong>.</p></li>
<li><p><strong>Calculez la compression résultant de la quantification.</strong></p>
<p>La quantification réduit la taille des vecteurs. Par exemple, l’utilisation de PQ avec 8 sous-quantificateurs (8 octets par vecteur) entraîne une compression drastique. La mémoire consommée par les vecteurs d’embeddement compressés peut être calculée comme suit :</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>On obtient ainsi un taux de compression de 64 par rapport aux représentations vectorielles brutes, et la mémoire totale utilisée par le type d’index <strong>HNSWPQ</strong> serait de <strong>128 Mo (graphe) + 8 Mo (vecteurs compressés) = 136 Mo</strong>.</p></li>
<li><p><strong>Calculer la surcharge liée au raffinement.</strong></p>
<p>Les opérations de raffinement, telles que le reclassement à l’aide de vecteurs bruts, chargent temporairement des données de haute précision en mémoire. Pour une recherche renvoyant les 10 premiers résultats avec un taux d’expansion de 5, la surcharge liée au raffinement peut être estimée comme suit :</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">Autres considérations<button data-href="#Other-considerations" class="anchor-icon" translate="no">
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
    </button></h3><p>Alors que les index IVF et basés sur des graphes optimisent l’utilisation de la mémoire grâce à la quantification, les fichiers mappés en mémoire (mmap) et DiskANN répondent aux scénarios où les ensembles de données dépassent la mémoire vive (RAM) disponible.</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN est un index Vamana basé sur un graphe qui relie les points de données pour une navigation efficace pendant la recherche, tout en appliquant la quantification par probabilité (PQ) afin de réduire la taille des vecteurs et de permettre un calcul rapide et approximatif de la distance entre les vecteurs.</p>
<p>Le graphe Vamana est stocké sur disque, ce qui permet à DiskANN de traiter de grands ensembles de données qui seraient autrement trop volumineux pour tenir en mémoire. Cela s’avère particulièrement utile pour les ensembles de données comportant des milliards de points.</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">Fichiers mappés en mémoire (mmap)</h4><p>Le mappage en mémoire (mmap) permet un accès direct en mémoire à des fichiers volumineux sur disque, ce qui permet à Milvus de stocker les index et les données à la fois en mémoire et sur les disques durs. Cette approche contribue à optimiser les opérations d’E/S en réduisant la surcharge liée aux appels d’E/S en fonction de la fréquence d’accès, augmentant ainsi la capacité de stockage des collections sans impact significatif sur les performances de recherche.</p>
<p>Plus précisément, vous pouvez configurer Milvus pour qu’il effectue un mappage en mémoire des données brutes de certains champs au lieu de les charger intégralement en mémoire. De cette manière, vous bénéficiez d’un accès direct en mémoire à ces champs sans vous soucier des problèmes de mémoire, tout en augmentant la capacité de la collection.</p>
