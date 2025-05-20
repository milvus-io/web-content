---
id: replica.md
summary: En savoir plus sur la réplique en mémoire dans Milvus.
title: Réplique en mémoire
---
<h1 id="In-Memory-Replica" class="common-anchor-header">Réplique en mémoire<button data-href="#In-Memory-Replica" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique présente le mécanisme de réplique en mémoire (réplication) de Milvus qui permet de répliquer plusieurs segments dans la mémoire de travail afin d'améliorer les performances et la disponibilité.</p>
<p>Pour plus d'informations sur la configuration des répliques en mémoire, voir <a href="/docs/fr/v2.4.x/configure_querynode.md#queryNodereplicas">Configurations relatives aux nœuds de requête</a>.</p>
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/replica_availability.jpg" alt="Replica_Availiability" class="doc-image" id="replica_availiability" />
   </span> <span class="img-wrapper"> <span>Disponibilité des répliques</span> </span></p>
<p>Avec les répliques en mémoire, Milvus peut charger le même segment sur plusieurs nœuds de requête. Si un nœud d'interrogation a échoué ou est occupé par une demande de recherche en cours lorsqu'un autre arrive, le système peut envoyer de nouvelles demandes à un nœud d'interrogation inactif qui dispose d'une réplication du même segment.</p>
<h3 id="Performance" class="common-anchor-header">Performances</h3><p>Les répliques en mémoire vous permettent d'exploiter les ressources supplémentaires de l'unité centrale et de la mémoire. C'est très utile si vous avez un ensemble de données relativement petit mais que vous souhaitez augmenter le débit de lecture avec des ressources matérielles supplémentaires. Le QPS (query per second) et le débit peuvent être considérablement améliorés.</p>
<h3 id="Availability" class="common-anchor-header">Disponibilité</h3><p>Les répliques en mémoire permettent à Milvus de récupérer plus rapidement si un nœud de requête tombe en panne. Lorsqu'un nœud d'interrogation tombe en panne, le segment ne doit pas être rechargé sur un autre nœud d'interrogation. Au lieu de cela, la demande de recherche peut être renvoyée immédiatement à un nouveau nœud d'interrogation sans avoir à recharger les données. Grâce à la gestion simultanée de plusieurs répliques de segments, le système est plus résistant en cas de basculement.</p>
<h2 id="Key-Concepts" class="common-anchor-header">Concepts clés<button data-href="#Key-Concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>Les répliques en mémoire sont organisées en groupes de répliques. Chaque groupe de répliques contient des répliques <a href="https://milvus.io/docs/v2.1.x/glossary.md#Sharding">en nuage</a>. Chaque réplique de l'ensemble a une réplique de flux et une réplique historique qui correspondent aux <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">segments</a> croissants et scellés de l'ensemble (c.-à-d. le canal DML).</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/replica_group.png" alt="An illustration of how in-memory replica works" class="doc-image" id="an-illustration-of-how-in-memory-replica-works" />
   </span> <span class="img-wrapper"> <span>Illustration du fonctionnement des répliques en mémoire</span> </span></p>
<h3 id="Replica-group" class="common-anchor-header">Groupe de répliques</h3><p>Un groupe de répliques est constitué de plusieurs <a href="https://milvus.io/docs/v2.1.x/four_layers.md#Query-node">nœuds de requête</a> chargés de gérer les données historiques et les répliques.</p>
<h3 id="Shard-replica" class="common-anchor-header">Réplique en nuage</h3><p>Un réplica shard se compose d'un réplica en continu et d'un réplica historique, tous deux appartenant au même <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Shard">shard</a>. Le nombre de répliques d'un groupe de répliques est déterminé par le nombre de schémas d'une collection donnée.</p>
<h3 id="Streaming-replica" class="common-anchor-header">Réplique en continu</h3><p>Une réplique en continu contient tous les <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">segments croissants</a> du même canal DML. D'un point de vue technique, une réplique en continu ne doit être servie que par un seul nœud de requête dans une réplique.</p>
<h3 id="Historical-replica" class="common-anchor-header">Réplique historique</h3><p>Une réplique historique contient tous les segments scellés du même canal DML. Les segments scellés d'une réplique historique peuvent être distribués sur plusieurs nœuds de requête au sein du même groupe de répliques.</p>
<h3 id="Shard-leader" class="common-anchor-header">Chef de tesson</h3><p>Un chef de groupe est le nœud de requête qui sert la réplique de flux dans un groupe de répliques.</p>
<h2 id="Design-Details" class="common-anchor-header">Détails de la conception<button data-href="#Design-Details" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Balance" class="common-anchor-header">Équilibre</h3><p>Un nouveau segment qui doit être chargé sera attribué à plusieurs nœuds d'interrogation différents. Une demande de recherche peut être traitée une fois qu'au moins une réplique a été chargée avec succès.</p>
<h3 id="Search" class="common-anchor-header">Recherche</h3><h4 id="Cache" class="common-anchor-header">Cache</h4><p>Le proxy maintient un cache qui associe les segments aux nœuds d'interrogation et le met à jour périodiquement. Lorsque le proxy reçoit une demande, Milvus récupère tous les segments scellés qui doivent faire l'objet d'une recherche dans le cache et tente de les affecter aux nœuds d'interrogation de manière équilibrée.</p>
<p>Pour les segments en croissance, le proxy maintient également un cache canal-nœud d'interrogation et envoie des demandes aux nœuds d'interrogation correspondants.</p>
<h4 id="Failover" class="common-anchor-header">Basculement</h4><p>Les caches du proxy ne sont pas toujours à jour. Certains segments ou canaux peuvent avoir été déplacés vers d'autres nœuds de requête lorsqu'une requête arrive. Dans ce cas, le proxy recevra une réponse d'erreur, mettra à jour le cache et essaiera de l'attribuer à un autre nœud de recherche.</p>
<p>Un segment sera ignoré si le mandataire ne le trouve toujours pas après avoir mis à jour le cache. Cela peut se produire si le segment a été compacté.</p>
<p>Si le cache n'est pas précis, le proxy peut manquer certains segments. Les nœuds de requête avec des canaux DML (segments croissants) renvoient des réponses de recherche avec une liste de segments fiables que le proxy peut comparer et avec lesquels il peut mettre à jour le cache.</p>
<h3 id="Enhancement" class="common-anchor-header">Amélioration</h3><p>Le mandataire ne peut pas attribuer les demandes de recherche aux nœuds de requête de manière totalement égale et les nœuds de requête peuvent disposer de ressources différentes pour répondre aux demandes de recherche. Pour éviter une distribution de ressources à longue queue, le mandataire attribue des segments actifs sur d'autres nœuds de requête à un nœud de requête inactif qui dispose également de ces segments.</p>
