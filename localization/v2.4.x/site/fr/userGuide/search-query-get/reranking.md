---
id: reranking.md
summary: >-
  Cette rubrique couvre le processus de reclassement, en expliquant son
  importance et la mise en œuvre de deux méthodes de reclassement.
title: Reclassement
---
<h1 id="Reranking" class="common-anchor-header">Reclassement<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus offre des capacités de recherche hybride à l'aide de l'API <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md">hybrid_search()</a>, intégrant des stratégies de reclassement sophistiquées pour affiner les résultats de la recherche à partir de plusieurs instances <code translate="no">AnnSearchRequest</code>. Cette rubrique couvre le processus de reclassement, en expliquant son importance et la mise en œuvre de différentes stratégies de reclassement dans Milvus.</p>
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
    </button></h2><p>La figure suivante illustre l'exécution d'une recherche hybride dans Milvus et met en évidence le rôle du reclassement dans le processus.</p>
<p><img translate="no" src="/docs/v2.4.x/assets/multi-vector-rerank.png" alt="reranking_process" width="300"/></p>
<p>Le reclassement dans la recherche hybride est une étape cruciale qui consolide les résultats provenant de plusieurs champs vectoriels, garantissant que le résultat final est pertinent et correctement hiérarchisé. Actuellement, Milvus propose les stratégies de reclassement suivantes :</p>
<ul>
<li><p><code translate="no">WeightedRanker</code>: Cette approche fusionne les résultats en calculant une moyenne pondérée des scores (ou distances vectorielles) de différentes recherches vectorielles. Elle attribue des poids en fonction de l'importance de chaque champ vectoriel.</p></li>
<li><p><code translate="no">RRFRanker</code>: Cette stratégie combine les résultats en fonction de leur classement dans différentes colonnes vectorielles.</p></li>
</ul>
<h2 id="Weighted-Scoring-WeightedRanker" class="common-anchor-header">Notation pondérée (WeightedRanker)<button data-href="#Weighted-Scoring-WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>La stratégie <code translate="no">WeightedRanker</code> attribue des poids différents aux résultats de chaque itinéraire de recherche vectorielle en fonction de l'importance de chaque champ vectoriel. Cette stratégie de reclassement est appliquée lorsque l'importance de chaque champ vectoriel varie, ce qui permet de mettre l'accent sur certains champs vectoriels plutôt que sur d'autres en leur attribuant des poids plus élevés. Par exemple, dans une recherche multimodale, la description du texte peut être considérée comme plus importante que la distribution des couleurs dans les images.</p>
<p>Le processus de base de WeightedRanker est le suivant :</p>
<ul>
<li><p><strong>Collecte des scores au cours de la recherche</strong>: Rassembler les résultats et leurs scores à partir de différents itinéraires de recherche vectorielle.</p></li>
<li><p><strong>Normalisation des scores</strong>: Normaliser les scores de chaque itinéraire dans une fourchette [0,1], où les valeurs proches de 1 indiquent une plus grande pertinence. Cette normalisation est cruciale car la distribution des scores varie en fonction des différents types de métriques. Par exemple, la distance pour IP est comprise entre [-∞,+∞], tandis que la distance pour L2 est comprise entre [0,+∞]. Milvus utilise la fonction <code translate="no">arctan</code>, transformant les valeurs dans l'intervalle [0,1] afin de fournir une base normalisée pour les différents types de métriques.</p>
<p><img translate="no" src="/docs/v2.4.x/assets/arctan.png" alt="arctan-function" width="300"/></p></li>
<li><p><strong>Attribution de poids</strong>: Attribuer un poids <code translate="no">w𝑖</code> à chaque itinéraire de recherche vectorielle. Les utilisateurs spécifient les poids, qui reflètent la fiabilité, la précision ou d'autres mesures pertinentes de la source de données. Chaque poids est compris entre [0,1].</p></li>
<li><p><strong>Fusion des scores</strong>: Calculer une moyenne pondérée des scores normalisés pour obtenir le score final. Les résultats sont ensuite classés en fonction de ces notes, de la plus élevée à la plus basse, afin de générer les résultats finaux triés.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x//assets/weighted-reranker.png" alt="weighted-reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>reanker pondéré</span> </span></p>
<p>Pour utiliser cette stratégie, appliquez une instance <code translate="no">WeightedRanker</code> et définissez des valeurs de pondération en passant un nombre variable d'arguments numériques.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.7</span>) 
<button class="copy-code-btn"></button></code></pre>
<p>Notez que :</p>
<ul>
<li><p>Chaque valeur de poids va de 0 (le moins important) à 1 (le plus important), ce qui influence le score agrégé final.</p></li>
<li><p>Le nombre total de valeurs de pondération fournies dans <code translate="no">WeightedRanker</code> doit être égal au nombre d'instances <code translate="no">AnnSearchRequest</code> que vous avez créées précédemment.</p></li>
<li><p>Il convient de noter qu'en raison des différentes mesures des différents types de métriques, nous normalisons les distances des résultats du rappel de manière à ce qu'elles se situent dans l'intervalle [0,1], où 0 signifie différent et 1 signifie similaire. Le score final sera la somme des valeurs de pondération et des distances.</p></li>
</ul>
<h2 id="Reciprocal-Rank-Fusion-RRFRanker" class="common-anchor-header">Fusion de rangs réciproques (RRFRanker)<button data-href="#Reciprocal-Rank-Fusion-RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>Le RRF est une méthode de fusion de données qui combine des listes de classement basées sur la réciproque de leurs rangs. C'est un moyen efficace d'équilibrer l'influence de chaque champ vectoriel, en particulier lorsqu'il n'y a pas d'ordre de priorité clair. Cette stratégie est généralement utilisée lorsque l'on souhaite accorder la même importance à tous les champs vectoriels ou lorsqu'il existe une incertitude quant à l'importance relative de chaque champ.</p>
<p>Le processus de base de RRF est le suivant :</p>
<ul>
<li><p><strong>Recueillir les classements pendant la recherche</strong>: Les chercheurs de plusieurs champs vectoriels récupèrent et trient les résultats.</p></li>
<li><p><strong>Fusion des classements</strong>: L'algorithme RRF pondère et combine les classements de chaque récupérateur. La formule est la suivante :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x//assets/rrf-ranker.png" alt="rrf-ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>rrf-ranker</span> </span></p>
<p>Ici, 𝑁 représente le nombre d'itinéraires de recherche différents, rank𝑖(𝑑) est le rang du document récupéré 𝑑 par le 𝑖ème extracteur, et 𝑘 est un paramètre de lissage, généralement fixé à 60.</p></li>
<li><p><strong>Classement complet</strong>: Reclasser les résultats récupérés sur la base des scores combinés pour produire les résultats finaux.</p></li>
</ul>
<p>Pour utiliser cette stratégie, appliquez une instance <code translate="no">RRFRanker</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

<span class="hljs-comment"># Default k value is 60</span>
ranker = RRFRanker()

<span class="hljs-comment"># Or specify k value</span>
ranker = RRFRanker(k=<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<p>RRF permet d'équilibrer l'influence entre les domaines sans spécifier de pondérations explicites. Les meilleures correspondances approuvées par plusieurs domaines seront prioritaires dans le classement final.</p>
