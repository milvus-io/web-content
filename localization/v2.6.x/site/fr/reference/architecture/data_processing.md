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
    </button></h2><p>Vous pouvez choisir le nombre d'unités de stockage qu'une collection utilise dans Milvus - chaque unité de stockage correspond à un canal virtuel<em>(vchannel</em>). Comme illustré ci-dessous, Milvus affecte ensuite chaque <em>vchannel</em> à un canal physique<em>(pchannel</em>), et chaque <em>pchannel</em> est lié à un nœud de streaming spécifique.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/pvchannel_wal.png" alt="VChannel PChannel and StreamingNode" class="doc-image" id="vchannel-pchannel-and-streamingnode" />
   </span> <span class="img-wrapper"> <span>VChannel PChannel et StreamingNode</span> </span></p>
<p>Après la vérification des données, le proxy divise le message écrit en plusieurs paquets de données (shards) conformément aux règles d'acheminement des shards spécifiées.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>Canaux 1</span> </span></p>
<p>Les données écrites d'un groupe<em>(vchannel</em>) sont ensuite envoyées au nœud de diffusion correspondant de <em>pchannel</em>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" />
   </span> <span class="img-wrapper"> <span>flux d'écriture</span> </span></p>
<p>Le nœud de diffusion en continu attribue un Oracle d'horodatage (TSO) à chaque paquet de données afin d'établir un ordre total des opérations. Il effectue des contrôles de cohérence sur la charge utile avant de l'écrire dans le journal d'écriture (WAL) sous-jacent. Même en cas de panne, le nœud de streaming peut rejouer le WAL pour récupérer toutes les opérations en attente.</p>
<p>Pendant ce temps, le nœud de streaming découpe également de manière asynchrone les entrées WAL validées en segments distincts. Il existe deux types de segments :</p>
<ul>
<li><strong>Segment croissant</strong>: toutes les données qui n'ont pas encore été transférées dans le stockage d'objets.</li>
<li><strong>Segment scellé</strong>: toutes les données ont été persistées dans le stockage d'objets, les données du segment scellé sont immuables.</li>
</ul>
<p>La transition d'un segment croissant à un segment scellé est appelée "flush". Le nœud de streaming déclenche un flush dès qu'il a ingéré et écrit toutes les entrées WAL disponibles pour ce segment, c'est-à-dire lorsqu'il n'y a plus d'enregistrements en attente dans le journal d'écriture sous-jacent, ce qui permet de finaliser le segment et d'en optimiser la lecture.</p>
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
    </button></h2><p>La construction de l'index est effectuée par le nœud de données. Pour éviter la création fréquente d'index lors des mises à jour de données, une collection dans Milvus est divisée en segments, chacun ayant son propre index.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>Construction d'index</span> </span></p>
<p>Milvus prend en charge la construction d'index pour chaque champ vectoriel, champ scalaire et champ primaire. L'entrée et la sortie de la construction d'index s'engagent avec le stockage d'objets : Le nœud de données charge les instantanés de journal à indexer à partir d'un segment (qui se trouve dans le stockage d'objets) dans la mémoire, désérialise les données et métadonnées correspondantes pour construire l'index, sérialise l'index lorsque la construction de l'index est terminée et le réécrit dans le stockage d'objets.</p>
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>Requête de données</span> </span></p>
<p>Dans Milvus, une collection est divisée en plusieurs segments ; le nœud de diffusion en continu charge les segments croissants et conserve les données en temps réel, tandis que les nœuds d'interrogation chargent les segments scellés.</p>
<p>Lorsqu'une demande de requête/recherche arrive, le proxy la diffuse à tous les nœuds de diffusion en continu responsables des segments correspondants pour une recherche simultanée.</p>
<p>Lorsqu'une demande de recherche arrive, le proxy demande simultanément aux nœuds de diffusion en continu qui détiennent les fichiers correspondants d'exécuter la recherche.</p>
<p>Chaque nœud de diffusion génère un plan d'interrogation, recherche ses données croissantes locales et contacte simultanément les nœuds d'interrogation distants pour récupérer les résultats historiques, puis les agrège en un seul résultat.</p>
<p>Enfin, le proxy recueille tous les résultats des nuées, les fusionne en un résultat final et le renvoie au client.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>Transfert</span> </span></p>
<p>Lorsque le segment croissant d'un nœud de streaming est transféré dans un segment scellé, ou lorsqu'un nœud de données achève un compactage, le coordinateur lance une opération de transfert pour convertir ces données croissantes en données historiques. Le coordinateur répartit ensuite uniformément les segments scellés entre tous les nœuds de requête, en équilibrant l'utilisation de la mémoire, les frais généraux de l'unité centrale et le nombre de segments, et libère tout segment redondant.</p>
<h2 id="Whats-next" class="common-anchor-header">Et maintenant ?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
