---
id: index-explained.md
title: Explication de l'index
summary: >-
  Un index est une structure supplémentaire construite au-dessus des données. Sa
  structure interne dépend de l'algorithme de recherche approximative du plus
  proche voisin utilisé. Un index accélère la recherche, mais entraîne un
  surcroît de temps de prétraitement, d'espace et de mémoire vive au cours de la
  recherche. En outre, l'utilisation d'un index diminue généralement le taux de
  rappel (bien que l'effet soit négligeable, il a tout de même son importance).
  Cet article explique donc comment minimiser les coûts liés à l'utilisation
  d'un index tout en maximisant les avantages.
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
    </button></h1><p>Un index est une structure supplémentaire construite au-dessus des données. Sa structure interne dépend de l'algorithme de recherche approximative du plus proche voisin utilisé. Un index accélère la recherche, mais entraîne un surcroît de temps de prétraitement, d'espace et de mémoire vive au cours de la recherche. En outre, l'utilisation d'un index diminue généralement le taux de rappel (bien que l'effet soit négligeable, il a tout de même son importance). C'est pourquoi cet article explique comment minimiser les coûts liés à l'utilisation d'un index tout en maximisant les avantages.</p>
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
    </button></h2><p>Dans Milvus, les index sont spécifiques aux champs et les types d'index applicables varient en fonction des types de données des champs cibles. En tant que base de données vectorielle professionnelle, Milvus se concentre sur l'amélioration des performances des recherches vectorielles et du filtrage scalaire, c'est pourquoi il propose différents types d'index.</p>
<p>Le tableau suivant répertorie la relation de correspondance entre les types de données de champ et les types d'index applicables.</p>
<table>
   <tr>
     <th><p>Type de données de champ</p></th>
     <th><p>Types d'index applicables</p></th>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT_VECTOR</p></li><li><p>FLOAT16_VECTOR</p></li><li><p>BFLOAT16_VECTOR</p></li><li><p>INT8_VECTOR</p></li></ul></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_BRUTE_FORCE</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BINARY_VECTOR</p></td>
     <td><ul><li><p>BIN_FLAT</p></li><li><p>BIN_IVF_FLAT</p></li><li><p>MINHASH_LSH</p></li></ul></td>
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
     <td><ul><li><p>BITMAP (Recommandé)</p></li><li><p>INVERTED</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li><p>INVERTE</p></li><li><p>STL_SORT</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT</p></li><li><p>DOUBLE</p></li></ul></td>
     <td><p>INVERTED</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(éléments des types BOOL, INT8/16/32/64 et VARCHAR)</sup></p></td>
     <td><p>BITMAP (recommandé)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(éléments de type BOOL, INT8/16/32/64, FLOAT, DOUBLE et VARCHAR)</sup></p></td>
     <td><p>INVERTE</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>INVERTE</p></td>
   </tr>
</table>
<p>Cet article se concentre sur la manière de sélectionner les index vectoriels appropriés. Pour les champs scalaires, vous pouvez toujours utiliser le type d'index recommandé.</p>
<p>Le choix d'un type d'index approprié pour une recherche vectorielle peut avoir un impact significatif sur les performances et l'utilisation des ressources. Lors du choix d'un type d'index pour un champ vectoriel, il est essentiel de prendre en compte différents facteurs, notamment la structure de données sous-jacente, l'utilisation de la mémoire et les exigences en matière de performances.</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">Anatomie de l'index vectoriel<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Comme le montre le diagramme ci-dessous, un type d'index dans Milvus se compose de trois éléments principaux, à savoir la <strong>structure de données</strong>, la <strong>quantification</strong> et l'<strong>affineur</strong>. La quantification et le raffineur sont facultatifs, mais ils sont largement utilisés en raison de l'équilibre entre les gains et les coûts.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" />
   </span> <span class="img-wrapper"> <span>Anatomie de l'index vectoriel</span> </span></p>
<p>Lors de la création de l'index, Milvus combine la structure de données et la méthode de quantification choisies pour déterminer un <strong>taux d'expansion</strong> optimal. Au moment de l'interrogation, le système récupère <code translate="no">topK × expansion rate</code> vecteurs candidats, applique le raffineur pour recalculer les distances avec une plus grande précision et renvoie finalement les résultats <code translate="no">topK</code> les plus précis. Cette approche hybride permet d'équilibrer la vitesse et la précision en limitant l'affinage à un sous-ensemble de candidats filtrés, ce qui nécessite beaucoup de ressources.</p>
<h3 id="Data-structure" class="common-anchor-header">Structure des données<button data-href="#Data-structure" class="anchor-icon" translate="no">
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
    </button></h3><p>La structure des données constitue la couche fondamentale de l'index. Les types les plus courants sont les suivants</p>
<ul>
<li><p><strong>Fichier inversé (IVF)</strong></p>
<p>Les types d'index de la série IVF permettent à Milvus de regrouper les vecteurs en godets par le biais d'un partitionnement basé sur les centroïdes. On peut généralement supposer que tous les vecteurs d'un godet sont susceptibles d'être proches du vecteur de la requête si le centroïde du godet est proche du vecteur de la requête. Sur la base de cette hypothèse, Milvus analyse uniquement les vecteurs intégrés dans les godets dont les centroïdes sont proches du vecteur de la requête, plutôt que d'examiner l'ensemble des données. Cette stratégie permet de réduire les coûts de calcul tout en maintenant une précision acceptable.</p>
<p>Ce type de structure de données d'index est idéal pour les ensembles de données à grande échelle nécessitant un débit rapide.</p></li>
<li><p><strong>Structure basée sur un graphe</strong></p>
<p>Une structure de données basée sur un graphe pour la recherche vectorielle, telle que Hierarchical Navigable Small World<a href="https://arxiv.org/abs/1603.09320">(HNSW)</a>, construit un graphe en couches où chaque vecteur est relié à ses voisins les plus proches. Les requêtes naviguent dans cette hiérarchie, en commençant par les couches supérieures grossières et en passant par les couches inférieures, ce qui permet d'obtenir une complexité de recherche efficace en temps logarithmique.</p>
<p>Ce type de structure de données d'index excelle dans les espaces à haute dimension et dans les scénarios exigeant des requêtes à faible latence.</p></li>
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
    </button></h3><p>La quantification réduit l'empreinte mémoire et les coûts de calcul grâce à une représentation plus grossière :</p>
<ul>
<li><p>La<strong>quantification scalaire</strong> (par exemple <strong>SQ8</strong>) permet à Milvus de comprimer chaque dimension vectorielle en un seul octet (8 bits), ce qui réduit l'utilisation de la mémoire de 75 % par rapport aux nombres flottants de 32 bits, tout en préservant une précision raisonnable.</p></li>
<li><p>La<strong>quantification par produit</strong><strong>(PQ)</strong> permet à Milvus de diviser les vecteurs en sous-vecteurs et de les coder à l'aide d'un regroupement basé sur un livre de codes. Cela permet d'obtenir des taux de compression plus élevés (par exemple, 4-32x) au prix d'une réduction marginale du rappel, ce qui le rend adapté aux environnements à mémoire limitée.</p></li>
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
    </button></h3><p>La quantification entraîne intrinsèquement des pertes. Pour maintenir le taux de rappel, la quantification produit systématiquement plus de candidats top-K que nécessaire, ce qui permet aux raffineurs d'utiliser une plus grande précision pour sélectionner davantage les résultats top-K parmi ces candidats, améliorant ainsi le taux de rappel.</p>
<p>Par exemple, le raffineur FP32 opère sur les candidats aux résultats de recherche renvoyés par la quantification en recalculant les distances à l'aide de la précision FP32 plutôt qu'à l'aide des valeurs quantifiées.</p>
<p>Ceci est essentiel pour les applications nécessitant un compromis entre l'efficacité de la recherche et la précision, telles que la recherche sémantique ou les systèmes de recommandation, où des variations mineures de distance ont un impact significatif sur la qualité des résultats.</p>
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
    </button></h3><p>Cette architecture à plusieurs niveaux - filtrage grossier via les structures de données, calcul efficace via la quantification et réglage de la précision via le raffinement - permet à Milvus d'optimiser le compromis précision-performance de manière adaptative.</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">Compromis de performance<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>Lors de l'évaluation des performances, il est essentiel de trouver un équilibre entre le <strong>temps de construction</strong>, le nombre <strong>de requêtes par seconde (QPS)</strong> et le <strong>taux de rappel</strong>. Les règles générales sont les suivantes :</p>
<ul>
<li><p>Les<strong>types d'index basés sur les graphes</strong> sont généralement plus performants que les <strong>variantes FVI</strong> en termes de <strong>QPS</strong>.</p></li>
<li><p>Les variantes<strong>FVI</strong> sont particulièrement adaptées aux scénarios avec <strong>un topK important (par exemple, plus de 2 000)</strong>.</p></li>
<li><p>Le<strong>PQ</strong> offre généralement un meilleur taux de rappel à des taux de compression similaires par rapport au <strong>SQ</strong>, bien que ce dernier offre des performances plus rapides.</p></li>
<li><p>L'utilisation de disques durs pour une partie de l'index (comme dans <strong>DiskANN</strong>) aide à gérer les grands ensembles de données, mais elle introduit également des goulets d'étranglement potentiels en termes d'IOPS.</p></li>
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
    </button></h3><p>La capacité implique généralement la relation entre la taille des données et la mémoire vive disponible. Lorsqu'il s'agit de capacité, considérez ce qui suit :</p>
<ul>
<li><p>Si un quart de vos données brutes est stocké en mémoire, optez pour DiskANN en raison de sa latence stable.</p></li>
<li><p>Si toutes vos données brutes tiennent dans la mémoire, pensez aux types d'index basés sur la mémoire et à mmap.</p></li>
<li><p>Vous pouvez utiliser les types d'index appliqués à la quantification et mmap pour échanger la précision contre la capacité maximale.</p></li>
</ul>
<div class="alert note">
<p>Mmap n'est pas toujours la solution. Lorsque la plupart de vos données se trouvent sur disque, DiskANN offre une meilleure latence.</p>
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
    </button></h3><p>Le rappel implique généralement le ratio de filtrage, qui fait référence aux données filtrées avant les recherches. En ce qui concerne le rappel, il convient de tenir compte des éléments suivants :</p>
<ul>
<li><p>Si le taux de filtrage est inférieur à 85 %, les types d'index basés sur les graphes sont plus performants que les variantes IVF.</p></li>
<li><p>Si le taux de filtrage est compris entre 85 % et 95 %, utilisez les variantes du FVI.</p></li>
<li><p>Si le taux de filtrage est supérieur à 98 %, utilisez Brute-Force (FLAT) pour obtenir les résultats de recherche les plus précis.</p></li>
</ul>
<div class="alert note">
<p>Les éléments ci-dessus ne sont pas toujours corrects. Il est conseillé de régler le rappel avec différents types d'index pour déterminer celui qui fonctionne le mieux.</p>
</div>
<h3 id="Performance" class="common-anchor-header">Performance de la recherche<button data-href="#Performance" class="anchor-icon" translate="no">
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
    </button></h3><p>Les performances d'une recherche concernent généralement le top-K, c'est-à-dire le nombre d'enregistrements renvoyés par la recherche. En ce qui concerne les performances, il convient de tenir compte des éléments suivants :</p>
<ul>
<li><p>Pour une recherche avec un petit top-K (par exemple, 2 000) nécessitant un taux de rappel élevé, les types d'index basés sur les graphes sont plus performants que les variantes FIV.</p></li>
<li><p>Pour une recherche avec un top-K important (par rapport au nombre total d'intégrations vectorielles), les variantes IVF sont un meilleur choix que les types d'index basés sur les graphes.</p></li>
<li><p>Pour une recherche avec un top-K de taille moyenne et un ratio de filtrage élevé, les variantes de FVI sont de meilleurs choix.</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">Matrice de décision : Choisir le type d'index le plus approprié<button data-href="#Decision-Matrix-Choosing-the-most-appropriate-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Le tableau suivant est une matrice de décision à laquelle vous pouvez vous référer pour choisir un type d'index approprié.</p>
<table>
   <tr>
     <th><p>Scénario</p></th>
     <th><p>Indice recommandé</p></th>
     <th><p>Remarques</p></th>
   </tr>
   <tr>
     <td><p>Les données brutes tiennent dans la mémoire</p></td>
     <td><p>HNSW, FIV + raffinement</p></td>
     <td><p>Utiliser HNSW pour une faible<code translate="no">k</code>/ une forte mémorisation.</p></td>
   </tr>
   <tr>
     <td><p>Données brutes sur disque, SSD</p></td>
     <td><p>DiskANN</p></td>
     <td><p>Optimal pour les requêtes sensibles à la latence.</p></td>
   </tr>
   <tr>
     <td><p>Données brutes sur disque, RAM limitée</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>Équilibre l'accès à la mémoire et au disque.</p></td>
   </tr>
   <tr>
     <td><p>Taux de filtrage élevé (&gt;95%)</p></td>
     <td><p>Force brute (FLAT)</p></td>
     <td><p>Évite la surcharge de l'index pour les petits ensembles de candidats.</p></td>
   </tr>
   <tr>
     <td><p>Grandes <code translate="no">k</code> (≥1% de l'ensemble de données)</p></td>
     <td><p>IVF</p></td>
     <td><p>L'élagage des clusters réduit les calculs.</p></td>
   </tr>
   <tr>
     <td><p>Taux de rappel extrêmement élevé (&gt;99%)</p></td>
     <td><p>Brute-Force (FLAT) + GPUs</p></td>
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
<p>Cette section se concentre sur le calcul de la consommation de mémoire d'un type d'index spécifique et comprend de nombreux détails techniques. Vous pouvez sauter cette section en toute sécurité si elle ne correspond pas à vos intérêts.</p>
</div>
<p>La consommation de mémoire d'un index est influencée par sa structure de données, le taux de compression par quantification et le raffineur utilisé. D'une manière générale, les index basés sur les graphes ont une empreinte mémoire plus importante en raison de la structure du graphe (par exemple, <strong>HNSW</strong>), ce qui implique généralement un surcoût d'espace notable par vecteur. En revanche, le FVI et ses variantes sont plus efficaces en termes de mémoire, car l'encombrement par vecteur est moindre. Toutefois, des techniques avancées telles que <strong>DiskANN</strong> permettent à certaines parties de l'index, comme le graphe ou le raffineur, de résider sur le disque, ce qui réduit la charge de mémoire tout en maintenant les performances.</p>
<p>Plus précisément, l'utilisation de la mémoire d'un index peut être calculée comme suit :</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">Utilisation de la mémoire de l'index FVI<button data-href="#IVF-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>Les index FVI équilibrent l'efficacité de la mémoire et les performances de recherche en partitionnant les données en grappes. Vous trouverez ci-dessous une ventilation de la mémoire utilisée par 1 million de vecteurs à 128 dimensions indexés à l'aide de variantes IVF.</p>
<ol>
<li><p><strong>Calculez la mémoire utilisée par les centroïdes.</strong></p>
<p>Les types d'index de la série IVF permettent à Milvus de regrouper les vecteurs en buckets à l'aide d'un partitionnement basé sur les centroïdes. Chaque centroïde est inclus dans l'index dans l'intégration vectorielle brute. Lorsque vous divisez les vecteurs en 2 000 clusters, l'utilisation de la mémoire peut être calculée comme suit :</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calculez la mémoire utilisée par les affectations de grappes.</strong></p>
<p>Chaque intégration vectorielle est affectée à une grappe et stockée sous forme d'ID entiers. Pour 2 000 grappes, un nombre entier de 2 octets suffit. L'utilisation de la mémoire peut être calculée comme suit :</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calculer la compression causée par la quantification.</strong></p>
<p>Les variantes de la FIV utilisent généralement PQ et SQ8, et l'utilisation de la mémoire peut être estimée comme suit :</p>
<ul>
<li><p>Utilisation de PQ avec 8 sous-quantifieurs</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Utilisation de SQ8</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Le tableau suivant indique l'utilisation estimée de la mémoire pour différentes configurations :</p>
<p><table>
<tr>
<th><p>Configuration</p></th>
<th><p>Estimation de la mémoire</p></th>
<th><p>Mémoire totale</p></th>
</tr>
<tr>
<td><p>IVF-PQ (pas de raffinement)</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB</p></td>
<td><p>11,0 MO</p></td>
</tr>
<tr>
<td><p>IVF-PQ + 10 % de raffinement brut</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB + 51,2 MB</p></td>
<td><p>62,2 MO</p></td>
</tr>
<tr>
<td><p>FIV-SQ8 (pas de raffinement)</p></td>
<td><p>1,0 MB + 2,0 MB + 128 MB</p></td>
<td><p>131,0 MO</p></td>
</tr>
<tr>
<td><p>IVF-FLAT (vecteurs bruts complets)</p></td>
<td><p>1,0 MB + 2,0 MB + 512 MB</p></td>
<td><p>515,0 MO</p></td>
</tr>
</table></p></li>
<li><p><strong>Calculer la surcharge de raffinement.</strong></p>
<p>Les variantes du FVI sont souvent associées à un affineur pour reclasser les candidats. Pour une recherche extrayant les 10 premiers résultats avec un taux d'expansion de 5, le surcoût lié à l'affinage peut être estimé comme suit :</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">Utilisation de la mémoire des index basés sur les graphes<button data-href="#Graph-based-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>Les types d'index basés sur les graphes tels que HNSW nécessitent une mémoire importante pour stocker à la fois la structure du graphe et les intégrations vectorielles brutes. Vous trouverez ci-dessous une ventilation détaillée de la mémoire consommée par 1 million de vecteurs à 128 dimensions indexés à l'aide du type d'index HNSW.</p>
<ol>
<li><p><strong>Calculez la mémoire utilisée par la structure du graphe.</strong></p>
<p>Chaque vecteur dans HNSW maintient des connexions avec ses voisins. Avec un degré de graphe (arêtes par nœud) de 32, la mémoire consommée peut être calculée comme suit :</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calculer la mémoire utilisée par les encastrements de vecteurs bruts.</strong></p>
<p>La mémoire consommée par le stockage des vecteurs FP32 non compressés peut être calculée comme suit :</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>Lorsque vous utilisez HNSW pour indexer les 1 million d'intégrations vectorielles à 128 dimensions, la mémoire totale utilisée est de <strong>128 Mo (graphique) + 512 Mo (vecteurs) = 640 Mo</strong>.</p></li>
<li><p><strong>Calculez la compression causée par la quantification.</strong></p>
<p>La quantification réduit la taille des vecteurs. Par exemple, l'utilisation de PQ avec 8 sous-quantificateurs (8 octets par vecteur) conduit à une compression drastique. La mémoire consommée par les intégrations vectorielles compressées peut être calculée comme suit :</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>Cela permet d'obtenir un taux de compression 64 fois supérieur à celui des vecteurs bruts, et la mémoire totale utilisée par le type d'index <strong>HNSWPQ</strong> serait de <strong>128 Mo (graphique) + 8 Mo (vecteur compressé) = 136 Mo</strong>.</p></li>
<li><p><strong>Calculer la surcharge de raffinement.</strong></p>
<p>L'affinage, tel que le reclassement avec des vecteurs bruts, charge temporairement des données de haute précision en mémoire. Pour une recherche permettant d'extraire les 10 premiers résultats avec un taux d'expansion de 5, le surcoût lié à l'affinage peut être estimé comme suit :</p>
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
    </button></h3><p>Alors que les index IVF et basés sur les graphes optimisent l'utilisation de la mémoire grâce à la quantification, les fichiers mappés en mémoire (mmap) et DiskANN traitent les scénarios dans lesquels les ensembles de données dépassent la mémoire vive disponible (RAM).</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN est un index basé sur un graphe de Vamana qui relie les points de données pour une navigation efficace pendant la recherche, tout en appliquant le PQ pour réduire la taille des vecteurs et permettre un calcul rapide de la distance approximative entre les vecteurs.</p>
<p>Le graphe de Vamana est stocké sur le disque, ce qui permet à DiskANN de traiter de grands ensembles de données qui seraient autrement trop volumineux pour être stockés en mémoire. Cela est particulièrement utile pour les ensembles de données d'un milliard de points.</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">Fichiers mappés en mémoire (mmap)</h4><p>Le mappage de la mémoire (Mmap) permet un accès direct de la mémoire aux grands fichiers sur disque, ce qui permet à Milvus de stocker les index et les données à la fois dans la mémoire et sur les disques durs. Cette approche permet d'optimiser les opérations d'E/S en réduisant les frais généraux des appels d'E/S en fonction de la fréquence d'accès, augmentant ainsi la capacité de stockage des collections sans affecter de manière significative les performances de recherche.</p>
<p>Plus précisément, vous pouvez configurer Milvus pour mapper en mémoire les données brutes dans certains champs au lieu de les charger entièrement en mémoire. De cette manière, vous pouvez obtenir un accès direct à la mémoire des champs sans vous soucier des problèmes de mémoire et étendre la capacité de la collection.</p>
