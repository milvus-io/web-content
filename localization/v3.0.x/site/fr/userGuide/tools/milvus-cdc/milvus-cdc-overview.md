---
id: milvus-cdc-overview.md
order: 1
summary: >-
  Milvus-CDC est un outil convivial qui permet de capturer et de synchroniser
  des données incrémentielles dans les instances Milvus.
title: Vue d'ensemble du CDC
---
<h1 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC est un outil convivial qui permet de capturer et de synchroniser des données incrémentielles dans les instances Milvus. Il garantit la fiabilité des données d'entreprise en les transférant de manière transparente entre les instances source et cible, ce qui facilite la sauvegarde incrémentielle et la reprise après sinistre.</p>
<h2 id="Key-capabilities" class="common-anchor-header">Principales fonctionnalités<button data-href="#Key-capabilities" class="anchor-icon" translate="no">
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
<li><p><strong>Synchronisation séquentielle des données</strong>: Assure l'intégrité et la cohérence des données en synchronisant les modifications de données de manière séquentielle entre les instances Milvus.</p></li>
<li><p><strong>Réplication incrémentielle des données</strong>: Réplique les données incrémentielles, y compris les insertions et les suppressions, du Milvus source au Milvus cible, offrant ainsi un stockage persistant.</p></li>
<li><p><strong>Gestion des tâches CDC</strong>: Permet la gestion des tâches CDC par le biais de requêtes OpenAPI, y compris la création, l'interrogation de l'état et la suppression des tâches CDC.</p></li>
</ul>
<p>En outre, nous prévoyons d'étendre nos capacités pour inclure la prise en charge de l'intégration avec les systèmes de traitement des flux à l'avenir.</p>
<h2 id="Architecture" class="common-anchor-header">L'architecture<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-CDC adopte une architecture composée de deux éléments principaux : un serveur HTTP qui gère les tâches et les métadonnées, et une <strong>corelib</strong> qui synchronise l'exécution des tâches avec un lecteur qui obtient les données de l'instance Milvus source et un rédacteur qui envoie les données traitées à l'instance Milvus cible.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-cdc-architecture.png" alt="milvus-cdc-architecture" class="doc-image" id="milvus-cdc-architecture" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-architecture</span> </span></p>
<p>Dans le diagramme précédent,</p>
<ul>
<li><p><strong>Serveur HTTP</strong>: Traite les demandes des utilisateurs, exécute les tâches et maintient les métadonnées. Il sert de plan de contrôle pour l'orchestration des tâches au sein du système Milvus-CDC.</p></li>
<li><p><strong>Corelib</strong>: Responsable de la synchronisation effective des tâches. Elle comprend un composant lecteur qui récupère les informations de la file d'attente de messages (MQ) et de etcd du Milvus source, ainsi qu'un composant rédacteur qui traduit les messages du MQ en paramètres API pour le système Milvus et envoie ces demandes au Milvus cible pour achever le processus de synchronisation.</p></li>
</ul>
<h2 id="Workflow" class="common-anchor-header">Flux de travail<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>Le flux de traitement des données Milvus-CDC comprend les étapes suivantes :</p>
<ol>
<li><p><strong>Création d'une tâche</strong>: Les utilisateurs lancent une tâche CDC via des requêtes HTTP.</p></li>
<li><p><strong>Récupération des métadonnées</strong>: Le système récupère les métadonnées spécifiques à la collection à partir de la source etcd de Milvus, y compris les informations relatives au canal et au point de contrôle de la collection.</p></li>
<li><p><strong>Connexion MQ</strong>: Avec les métadonnées en main, le système se connecte au MQ pour commencer à s'abonner au flux de données.</p></li>
<li><p><strong>Traitement des données</strong>: Les données du MQ sont lues, analysées et transmises à l'aide du SDK Go ou traitées pour reproduire les opérations effectuées dans la source Milvus.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-cdc-workflow.png" alt="milvus-cdc-workflow" class="doc-image" id="milvus-cdc-workflow" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-workflow</span> </span></p>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><strong>Synchronisation incrémentielle des données</strong>: Pour l'instant, Milvus-CDC est conçu pour synchroniser uniquement les données incrémentielles. Si votre entreprise a besoin d'une sauvegarde complète des données, veuillez <a href="https://milvus.io/community">nous contacter</a> pour obtenir de l'aide.</p></li>
<li><p><strong>Portée de la synchronisation</strong>: Actuellement, Milvus-CDC peut synchroniser les données au niveau du cluster. Nous travaillons à l'ajout de la prise en charge de la synchronisation des données au niveau de la collection dans les prochaines versions.</p></li>
<li><p><strong>Requêtes API prises en charge</strong>: Milvus-CDC prend actuellement en charge les demandes d'API suivantes. Nous prévoyons d'étendre la prise en charge à d'autres demandes dans les prochaines versions :</p>
<ul>
<li><p>Créer/Déposer une collection</p></li>
<li><p>Insérer/supprimer/supprimer</p></li>
<li><p>Créer/Déposer une partition</p></li>
<li><p>Créer/Déposer un index</p></li>
<li><p>Charger/libérer/effacer</p></li>
<li><p>Charger/libérer une partition</p></li>
<li><p>Créer/supprimer une base de données</p></li>
</ul></li>
</ul>
