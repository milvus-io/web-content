---
id: data_processing.md
summary: Découvrez la procédure de traitement des données dans Milvus.
title: Traitement des données
---
<h1 id="Data-Processing" class="common-anchor-header">Traitement des données<button data-href="#Data-Processing" class="anchor-icon" translate="no">
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
    </button></h1><p>Cet article fournit une description détaillée de la mise en œuvre de l'insertion de données, de la construction d'index et de l'interrogation de données dans Milvus.</p>
<h2 id="Data-insertion" class="common-anchor-header">Insertion de données<button data-href="#Data-insertion" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez spécifier un certain nombre de taches pour chaque collection dans Milvus, chaque tache correspondant à un canal virtuel<em>(vchannel)</em>. Comme le montre la figure suivante, Milvus attribue à chaque canal virtuel du courtier en journaux un canal physique<em>(pchannel</em>). Toute demande d'insertion/suppression entrante est acheminée vers les unités de stockage en fonction de la valeur de hachage de la clé primaire.</p>
<p>La validation des demandes DML est transférée au proxy car Milvus n'a pas de transactions compliquées. Le proxy demande un horodatage pour chaque demande d'insertion/suppression à TSO (Timestamp Oracle), qui est le module d'horodatage hébergé par le coordinateur racine. L'ancien horodatage étant remplacé par le nouveau, les horodatages sont utilisés pour déterminer la séquence des demandes de données en cours de traitement. Le proxy récupère les informations par lots à partir de la coordonnée des données, y compris les segments des entités et les clés primaires, afin d'augmenter le débit global et d'éviter de surcharger le nœud central.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/channels_1.jpg" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>Canaux 1</span> </span></p>
<p>Les opérations DML (langage de manipulation de données) et DDL (langage de définition de données) sont toutes deux écrites dans la séquence d'enregistrement, mais les opérations DDL ne se voient attribuer qu'un seul canal en raison de leur faible fréquence d'apparition.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/channels_2.jpg" alt="Channels 2" class="doc-image" id="channels-2" />
   </span> <span class="img-wrapper"> <span>Canaux 2</span> </span></p>
<p>Les<em>canaux</em> sont gérés dans les nœuds sous-jacents du courtier en journaux. Chaque canal est physiquement indivisible et disponible pour n'importe quel nœud, mais un seul. Lorsque le taux d'ingestion des données atteint un goulot d'étranglement, il faut tenir compte de deux éléments : D'une part, le nœud du log broker est surchargé et doit être redimensionné et, d'autre part, il y a suffisamment de shards pour assurer l'équilibre de la charge pour chaque nœud.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/write_log_sequence.jpg" alt="Write log sequence" class="doc-image" id="write-log-sequence" />
   </span> <span class="img-wrapper"> <span>Séquence d'écriture du journal</span> </span></p>
<p>Le diagramme ci-dessus présente les quatre composants impliqués dans le processus d'écriture d'une séquence de journaux : le proxy, le courtier en journaux, le nœud de données et le stockage d'objets. Le processus comprend quatre tâches : la validation des requêtes DML, la publication et l'abonnement de la séquence de journaux, la conversion du journal en continu en instantanés de journaux et la persistance des instantanés de journaux. Les quatre tâches sont découplées les unes des autres afin de s'assurer que chaque tâche est traitée par le type de nœud correspondant. Les nœuds de même type sont mis sur un pied d'égalité et peuvent être dimensionnés de manière élastique et indépendante pour s'adapter à différentes charges de données, en particulier les données en continu massives et très fluctuantes.</p>
<h2 id="Index-building" class="common-anchor-header">Construction de l'index<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>L'élaboration de l'index est effectuée par le nœud d'index. Pour éviter la création fréquente d'index lors des mises à jour de données, une collection dans Milvus est divisée en segments, chacun ayant son propre index.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/index_building.jpg" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>Construction d'index</span> </span></p>
<p>Milvus prend en charge la construction d'index pour chaque champ vectoriel, champ scalaire et champ primaire. L'entrée et la sortie de la construction d'index sont toutes deux liées au stockage d'objets : Le nœud d'indexation charge les instantanés de journal à indexer à partir d'un segment (qui se trouve dans le stockage d'objets) dans la mémoire, désérialise les données et métadonnées correspondantes pour construire l'index, sérialise l'index lorsque la construction de l'index est terminée et le réécrit dans le stockage d'objets.</p>
<p>La construction d'un index implique principalement des opérations sur les vecteurs et les matrices et nécessite donc beaucoup de calculs et de mémoire. Les vecteurs ne peuvent pas être indexés efficacement avec les index arborescents traditionnels en raison de leur nature hautement dimensionnelle, mais peuvent l'être avec des techniques plus abouties dans ce domaine, telles que les index basés sur les grappes ou les graphes. Quel que soit son type, la construction d'un index implique des calculs itératifs massifs pour les vecteurs à grande échelle, tels que Kmeans ou graph traverse.</p>
<p>Contrairement à l'indexation des données scalaires, la construction d'un index vectoriel doit tirer pleinement parti de l'accélération SIMD (instruction unique, données multiples). Milvus prend en charge de manière innée les jeux d'instructions SIMD, par exemple SSE, AVX2 et AVX512. Compte tenu de la nature "hoquetante" et gourmande en ressources de la construction d'index vectoriels, l'élasticité revêt une importance cruciale pour Milvus en termes économiques. Les prochaines versions de Milvus exploreront davantage l'informatique hétérogène et l'informatique sans serveur afin de réduire les coûts connexes.</p>
<p>En outre, Milvus prend également en charge le filtrage scalaire et l'interrogation de champs primaires. Il dispose d'index intégrés pour améliorer l'efficacité des requêtes, par exemple les index du filtre de Bloom, les index de hachage, les index arborescents et les index inversés, et prévoit d'introduire davantage d'index externes, par exemple les index bitmap et les index bruts.</p>
<h2 id="Data-query" class="common-anchor-header">Interrogation de données<button data-href="#Data-query" class="anchor-icon" translate="no">
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
    </button></h2><p>L'interrogation de données est le processus de recherche, dans une collection donnée, du nombre <em>k</em> de vecteurs les plus proches d'un vecteur cible ou de <em>tous les</em> vecteurs situés dans une plage de distance donnée par rapport au vecteur. Les vecteurs sont renvoyés avec leur clé primaire et les champs correspondants.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>Requête de données</span> </span></p>
<p>Dans Milvus, une collection est divisée en plusieurs segments et les nœuds d'interrogation chargent les index par segment. Lorsqu'une demande de recherche arrive, elle est diffusée à tous les nœuds d'interrogation pour une recherche simultanée. Chaque nœud élague alors les segments locaux, recherche les vecteurs répondant aux critères, réduit et renvoie les résultats de la recherche.</p>
<p>Les nœuds d'interrogation sont indépendants les uns des autres dans une requête de données. Chaque nœud n'est responsable que de deux tâches : charger ou libérer des segments en suivant les instructions de la coordonnatrice de la requête ; effectuer une recherche dans les segments locaux. Le proxy est chargé de réduire les résultats de recherche de chaque nœud de requête et de renvoyer les résultats finaux au client.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/handoff.jpg" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>Transfert</span> </span></p>
<p>Il existe deux types de segments : les segments croissants (pour les données incrémentielles) et les segments scellés (pour les données historiques). Les nœuds d'interrogation s'abonnent à vchannel pour recevoir les mises à jour récentes (données incrémentielles) sous forme de segments croissants. Lorsqu'un segment croissant atteint un seuil prédéfini, la coordination des données le scelle et la construction de l'index commence. Ensuite, une opération de <em>transfert</em> initiée par la coordonnatrice des requêtes transforme les données incrémentales en données historiques. La coordination des requêtes répartit les segments scellés de manière égale entre tous les nœuds de requêtes en fonction de l'utilisation de la mémoire, de la charge de travail de l'unité centrale et du nombre de segments.</p>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Découvrez comment <a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">utiliser la base de données vectorielle Milvus pour des requêtes en temps réel</a>.</li>
<li>En savoir plus sur l'<a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">insertion et la persistance des données dans Milvus</a>.</li>
<li>Apprendre comment <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">les données sont traitées dans Milvus</a>.</li>
</ul>
