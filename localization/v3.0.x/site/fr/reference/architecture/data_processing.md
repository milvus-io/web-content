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
    </button></h1><p>Cet article fournit une description détaillée de la mise en œuvre de l'insertion de données, de la création d'index et de l'interrogation des données dans Milvus.</p>
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
    </button></h2><p>Vous pouvez choisir le nombre de shards utilisés par une collection dans Milvus : chaque shard correspond à un canal virtuel (<em>vchannel</em>). Comme illustré ci-dessous, Milvus attribue ensuite chaque <em>vchannel</em> à un canal physique (<em>pchannel</em>), et chaque <em>pchannel</em> est lié à un nœud de streaming spécifique.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/pvchannel_wal.png" alt="VChannel, PChannel, and Streaming Node" class="doc-image" id="vchannel,-pchannel,-and-streaming-node" /> 
   <span>VChannel, PChannel et nœud de streaming</span>
  
 </span></p>
<p>Après vérification des données, le proxy divise le message écrit en plusieurs paquets de données correspondant aux shards, conformément aux règles de routage des shards spécifiées.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" /> 
   <span>Canaux 1</span>
  
 </span></p>
<p>Les données écrites d’un fragment (<em>vchannel</em>) sont ensuite envoyées au nœud de streaming correspondant du <em>pchannel</em>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" /> 
   <span>Flux d’écriture</span>
  
 </span></p>
<p>Le nœud de streaming attribue un horodatage Oracle (TSO) à chaque paquet de données afin d’établir un ordre total des opérations. Il effectue des contrôles de cohérence sur la charge utile avant de l’écrire dans le journal d’écriture anticipée (WAL) sous-jacent. Une fois les données validées de manière durable dans le WAL, leur conservation est garantie : même en cas de panne, le nœud de streaming peut rejouer le WAL pour récupérer intégralement toutes les opérations en attente.</p>
<p>Parallèlement, le nœud de streaming découpe également de manière asynchrone les entrées validées du WAL en segments distincts. Il existe deux types de segments :</p>
<ul>
<li><strong>Segment croissant</strong>: toutes les données qui n’ont pas encore été persistées dans le stockage d’objets.</li>
<li><strong>Segment scellé</strong>: toutes les données ont été persistées dans le stockage objet ; les données d’un segment scellé sont immuables.</li>
</ul>
<p>Le passage d’un segment en croissance à un segment scellé s’appelle un « flush ». Le nœud de streaming déclenche un flush dès qu’il a ingéré et écrit toutes les entrées WAL disponibles pour ce segment — c’est-à-dire lorsqu’il n’y a plus d’enregistrements en attente dans le journal d’écriture anticipée sous-jacent —, moment auquel le segment est finalisé et optimisé pour la lecture.</p>
<h2 id="Index-building" class="common-anchor-header">Création d’index<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>La création d’index est effectuée par le nœud de données. Afin d’éviter une création fréquente d’index lors des mises à jour des données, une collection dans Milvus est divisée en segments, chacun disposant de son propre index.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" /> 
   <span>Création d’index</span>
  
 </span></p>
<p>Milvus prend en charge la création d’index pour chaque champ vectoriel, champ scalaire et champ principal. Tant l’entrée que la sortie de la création d’index font appel au stockage objet : le nœud de données charge en mémoire les instantanés de journal à indexer provenant d’un segment (qui se trouve dans le stockage objet), désérialise les données et métadonnées correspondantes pour créer l’index, sérialise l’index une fois la création terminée, puis le réécrit dans le stockage objet.</p>
<p>La construction d’index implique principalement des opérations sur des vecteurs et des matrices et est donc très gourmande en ressources de calcul et en mémoire. Les vecteurs ne peuvent pas être indexés efficacement avec des index traditionnels basés sur des arborescences en raison de leur nature hautement dimensionnelle, mais peuvent l’être à l’aide de techniques plus abouties dans ce domaine, telles que les index basés sur des clusters ou des graphes. Quel que soit son type, la construction d’un index implique des calculs itératifs massifs pour les vecteurs à grande échelle, tels que l’algorithme des K-moyennes ou la traversée de graphes.</p>
<p>Contrairement à l’indexation des données scalaires, la création d’un index vectoriel doit tirer pleinement parti de l’accélération SIMD (single instruction, multiple data). Milvus prend en charge nativement les jeux d’instructions SIMD, par exemple SSE, AVX2 et AVX512. Compte tenu des « ratés » et de la nature gourmande en ressources de la création d’index vectoriels, l’élasticité revêt une importance cruciale pour Milvus d’un point de vue économique. Les futures versions de Milvus approfondiront les explorations dans le domaine du calcul hétérogène et du calcul sans serveur afin de réduire les coûts associés.</p>
<p>Par ailleurs, Milvus prend également en charge le filtrage scalaire et les requêtes sur le champ principal. Il dispose d’index intégrés pour améliorer l’efficacité des requêtes, tels que les index de type filtre de Bloom, les index de hachage, les index arborescents et les index inversés, et prévoit d’introduire davantage d’index externes, notamment des index bitmap et des index approximatifs.</p>
<h2 id="Data-query" class="common-anchor-header">Requête sur les données<button data-href="#Data-query" class="anchor-icon" translate="no">
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
    </button></h2><p>La requête de données désigne le processus consistant à rechercher, dans une collection spécifiée, <em>les k</em> vecteurs les plus proches d’un vecteur cible ou <em>tous</em> les vecteurs situés dans un rayon spécifié par rapport à ce vecteur. Les vecteurs sont renvoyés avec leur clé primaire et leurs champs correspondants.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" /> 
   <span>Requête de données</span>
  
 </span></p>
<p>Dans Milvus, une collection est divisée en plusieurs segments ; le nœud de streaming charge les segments en cours de croissance et gère les données en temps réel, tandis que les nœuds de requête chargent les segments scellés.</p>
<p>Lorsqu’une requête de recherche arrive, le proxy la diffuse à tous les nœuds de streaming responsables des shards concernés afin de permettre une recherche simultanée.</p>
<p>Lorsqu’une requête de recherche arrive, le proxy demande simultanément aux nœuds de streaming qui détiennent les fragments correspondants d’exécuter la recherche.</p>
<p>Chaque nœud de streaming génère un plan de requête, effectue une recherche dans ses données locales en cours de croissance et contacte simultanément les nœuds de requête distants pour récupérer les résultats historiques, puis agrège le tout en un seul résultat de fragment.</p>
<p>Enfin, le proxy rassemble tous les résultats des fragments, les fusionne en un résultat final et le renvoie au client.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" /> 
   <span>Transfert</span>
  
 </span></p>
<p>Lorsqu’un segment en croissance sur un nœud de streaming est vidé dans un segment scellé — ou lorsqu’un nœud de données achève une compaction —, le coordinateur lance une opération de transfert pour convertir ces données en croissance en données historiques. Le coordinateur répartit ensuite les segments scellés de manière uniforme entre tous les nœuds de requête, en équilibrant l’utilisation de la mémoire, la charge du processeur et le nombre de segments, puis libère tout segment redondant.</p>
<h2 id="Whats-next" class="common-anchor-header">Et ensuite ?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Découvrez comment <a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">utiliser la base de données vectorielle Milvus pour les requêtes en temps réel</a>.</li>
<li>Découvrez <a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">l’insertion et la persistance des données dans Milvus</a>.</li>
<li>Découvrez comment <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">les données sont traitées dans Milvus</a>.</li>
</ul>
