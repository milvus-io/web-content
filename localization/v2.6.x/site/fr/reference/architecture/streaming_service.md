---
id: streaming_service.md
title: Service de diffusion en continu
summary: >-
  Le service de streaming est un concept pour le module de système de streaming
  interne de Milvus, construit autour du Write-Ahead Log (WAL) pour prendre en
  charge diverses fonctions liées au streaming.
---
<h1 id="Streaming-Service" class="common-anchor-header">Service de diffusion en continu<button data-href="#Streaming-Service" class="anchor-icon" translate="no">
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
    </button></h1><p>Le <strong>service de diffusion en continu</strong> est un concept pour le module de système de diffusion en continu interne de Milvus, construit autour du journal en avance sur l'écriture (WAL) pour prendre en charge diverses fonctions liées à la diffusion en continu. Il s'agit notamment de l'ingestion/souscription de données en continu, de la reprise sur panne de l'état de la grappe, de la conversion des données en continu en données historiques et des requêtes de données croissantes. Sur le plan architectural, le service de diffusion en continu se compose de trois éléments principaux :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_distributed_arch.png" alt="Streaming Distributed Arc" class="doc-image" id="streaming-distributed-arc" />
   </span> <span class="img-wrapper"> <span>Arc distribué de diffusion en continu</span> </span></p>
<ul>
<li><p><strong>Coordinateur de streaming</strong>: Un composant logique dans le nœud coordinateur. Il utilise Etcd pour la découverte de services afin de localiser les nœuds de diffusion en continu disponibles et est chargé de lier le WAL aux nœuds de diffusion en continu correspondants. Il enregistre également le service pour exposer la topologie de distribution des WAL, ce qui permet aux clients de streaming de connaître le nœud de streaming approprié pour un WAL donné.</p></li>
<li><p><strong>Cluster de nœuds de streaming</strong>: Il s'agit d'une grappe de nœuds de diffusion en continu responsables de toutes les tâches de traitement de la diffusion en continu, telles que l'ajout de fichiers WAL, la récupération de l'état, l'interrogation de données croissantes.</p></li>
<li><p><strong>Client de streaming</strong>: Un client Milvus développé en interne qui encapsule des fonctionnalités de base telles que la découverte de services et les contrôles de disponibilité. Il est utilisé pour lancer des opérations telles que l'écriture de messages et l'abonnement.</p></li>
</ul>
<h2 id="Message" class="common-anchor-header">Message<button data-href="#Message" class="anchor-icon" translate="no">
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
    </button></h2><p>Le service de diffusion en continu est un système de diffusion en continu axé sur les journaux, de sorte que toutes les opérations d'écriture dans Milvus (telles que DML et DDL) sont abstraites en tant que <strong>messages</strong>.</p>
<ul>
<li><p>Le service de diffusion en continu attribue à chaque message un champ <strong>Timestamp Oracle (TSO)</strong>, qui indique l'ordre du message dans le WAL. L'ordre des messages détermine l'ordre des opérations d'écriture dans Milvus. Cela permet de reconstruire le dernier état de la grappe à partir des journaux.</p></li>
<li><p>Chaque message appartient à un <strong>VChannel</strong> (Virtual Channel) spécifique et conserve certaines propriétés invariantes au sein de ce canal afin de garantir la cohérence des opérations. Par exemple, une opération Insert doit toujours se produire avant une opération DropCollection sur le même canal.</p></li>
</ul>
<p>L'ordre des messages dans Milvus peut ressembler à ce qui suit :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/message_order.png" alt="Message Order" class="doc-image" id="message-order" />
   </span> <span class="img-wrapper"> <span>Ordre des messages</span> </span></p>
<h2 id="WAL-Component" class="common-anchor-header">Composant WAL<button data-href="#WAL-Component" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour prendre en charge l'évolutivité horizontale à grande échelle, le WAL de Milvus n'est pas un fichier journal unique, mais un composite de plusieurs journaux. Chaque journal peut indépendamment prendre en charge la fonctionnalité de diffusion en continu pour plusieurs canaux virtuels. À tout moment, un composant WAL est autorisé à fonctionner sur <strong>un seul nœud de streaming</strong>, cette contrainte étant garantie à la fois par un mécanisme de clôture du stockage wal sous-jacent et par le coordinateur de streaming.</p>
<p>Les autres caractéristiques du composant WAL sont les suivantes</p>
<ul>
<li><p><strong>Gestion du cycle de vie des segments</strong>: Basé sur la politique telle que les conditions de mémoire/la taille du segment/le temps d'inactivité du segment, le WAL gère le cycle de vie de chaque segment.</p></li>
<li><p><strong>Prise en charge des transactions de base</strong>: Comme chaque message a une taille limite, le composant WAL prend en charge des transactions simples pour promettre des écritures atomiques au niveau du canal V.</p></li>
<li><p><strong>Écriture de journaux à distance à haute concordance</strong>: Milvus prend en charge les files d'attente de messages distants de tiers en tant que stockage WAL. Pour atténuer la latence aller-retour (RTT) entre le nœud de streaming et le stockage WAL distant afin d'améliorer le débit d'écriture, le service de streaming prend en charge les écritures de journaux simultanées. Il maintient l'ordre des messages par TSO et la synchronisation TSO, et les messages dans WAL sont lus dans l'ordre TSO.</p></li>
<li><p><strong>Tampon d'avance sur l'écriture</strong>: Une fois que les messages sont écrits dans le WAL, ils sont temporairement stockés dans une mémoire tampon d'écriture. Cela permet de lire les journaux sans avoir à récupérer les messages dans le stockage WAL distant.</p></li>
<li><p><strong>Prise en charge de plusieurs types de stockage WAL</strong>: Woodpecker, Pulsar, Kafka. En utilisant Woodpecker avec le mode zéro disque, nous pouvons supprimer la dépendance au stockage WAL distant.</p></li>
</ul>
<h2 id="Recovery-Storage" class="common-anchor-header">Stockage de récupération<button data-href="#Recovery-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Le composant <strong>Recovery Storage</strong> s'exécute toujours sur le nœud de streaming où se trouve le composant WAL correspondant.</p>
<ul>
<li><p>Il est chargé de convertir les données de streaming en données historiques persistantes et de les stocker dans le stockage d'objets.</p></li>
<li><p>Il gère également la récupération de l'état en mémoire du composant WAL sur le nœud de streaming.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/recovery_storage.png" alt="Recovery Storage" class="doc-image" id="recovery-storage" />
   </span> <span class="img-wrapper"> <span>Stockage de récupération</span> </span></p>
<h2 id="Query-Delegator" class="common-anchor-header">Délégateur de requêtes<button data-href="#Query-Delegator" class="anchor-icon" translate="no">
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
    </button></h2><p>Le <strong>délégué aux requêtes</strong> s'exécute sur chaque nœud de diffusion en continu et est chargé d'exécuter des <strong>requêtes incrémentielles</strong> sur un seul bloc de données. Il génère des plans d'interrogation, les transmet aux nœuds d'interrogation concernés et agrège les résultats.</p>
<p>En outre, le délégué aux requêtes est chargé de diffuser les <strong>opérations de suppression</strong> aux autres nœuds de requêtes.</p>
<p>Le délégué aux requêtes coexiste toujours avec le composant WAL sur le même nœud de diffusion en continu. Mais si la collection est configurée en multiréplique, <strong>N-1</strong> délégués seront déployés sur les autres nœuds de diffusion en continu.</p>
<h2 id="WAL-Lifetime-and-Wait-for-Ready" class="common-anchor-header">Durée de vie du WAL et attente de disponibilité<button data-href="#WAL-Lifetime-and-Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>En séparant les nœuds de calcul du stockage, Milvus peut facilement transférer le WAL d'un nœud de diffusion en continu à un autre, ce qui permet d'obtenir une haute disponibilité du service de diffusion en continu.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/wal_lifetime.png" alt="wal lifetime" class="doc-image" id="wal-lifetime" />
   </span> <span class="img-wrapper"> <span>Durée de vie du WAL</span> </span></p>
<h2 id="Wait-for-Ready" class="common-anchor-header">Attente de disponibilité<button data-href="#Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>Lorsque le WAL est transféré vers un nouveau nœud de diffusion en continu, le client constate que l'ancien nœud de diffusion en continu rejette certaines demandes. Pendant ce temps, le WAL sera récupéré au nouveau nœud de diffusion en continu, et le client attendra que le WAL du nouveau nœud de diffusion en continu soit prêt à servir.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_wait_for_ready.png" alt="wait for ready" class="doc-image" id="wait-for-ready" />
   </span> <span class="img-wrapper"> <span>attendre que le</span> </span>WAL <span class="img-wrapper"> <span>soit prêt</span> </span></p>
