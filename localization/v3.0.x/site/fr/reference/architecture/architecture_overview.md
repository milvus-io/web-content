---
id: architecture_overview.md
summary: >-
  Milvus propose une base de données vectorielle rapide, fiable et stable,
  spécialement conçue pour la recherche de similitudes et l'intelligence
  artificielle.
title: Présentation de l'architecture de Milvus
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Présentation de l'architecture de Milvus<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus est une base de données vectorielle <strong>open source</strong> et <strong>native du cloud</strong>, conçue pour effectuer des recherches de similarité hautement performantes sur des ensembles de données vectorielles volumineux. S'appuyant sur des bibliothèques de recherche vectorielle courantes telles que Faiss, HNSW, DiskANN et SCANN, elle facilite le développement d'applications d'IA et la recherche de données non structurées. Avant de poursuivre, familiarisez-vous avec les <a href="/docs/fr/glossary.md">principes de base</a> de la recherche par embeddings.</p>
<h2 id="Architecture-Diagram" class="common-anchor-header">Schéma d'architecture<button data-href="#Architecture-Diagram" class="anchor-icon" translate="no">
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
    </button></h2><p>Le schéma suivant illustre l’architecture générale de Milvus, mettant en avant sa conception modulaire, évolutive et native du cloud, avec des couches de stockage et de calcul entièrement dissociées.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" /> 
   <span>Schéma_d’architecture</span>
  
 </span></p>
<h2 id="Architectural-Principles" class="common-anchor-header">Principes architecturaux<button data-href="#Architectural-Principles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus suit le principe de dissociation entre le plan de données et le plan de contrôle, et se compose de quatre couches principales qui sont indépendantes les unes des autres en termes d’évolutivité et de reprise après sinistre. Cette architecture à stockage partagé, avec des couches de stockage et de calcul entièrement dissociées, permet une évolutivité horizontale des nœuds de calcul tout en implémentant Woodpecker comme couche WAL sans disque, pour une élasticité accrue et une réduction des coûts d’exploitation.</p>
<p>En séparant le traitement des flux dans le nœud de streaming et le traitement par lots dans les nœuds de requête et de données, Milvus atteint des performances élevées tout en répondant simultanément aux exigences de traitement en temps réel.</p>
<h2 id="Detailed-Layer-Architecture" class="common-anchor-header">Architecture détaillée des couches<button data-href="#Detailed-Layer-Architecture" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">Couche 1 : Couche d’accès<button data-href="#Layer-1-Access-Layer" class="anchor-icon" translate="no">
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
    </button></h3><p>Composée d’un groupe de proxys sans état, la couche d’accès constitue la couche frontale du système et le point de terminaison pour les utilisateurs. Elle valide les requêtes des clients et filtre les résultats renvoyés :</p>
<ul>
<li>Le proxy est en soi sans état. Il fournit une adresse de service unifiée à l’aide de composants d’équilibrage de charge tels que Nginx, Kubernetes Ingress, NodePort et LVS.</li>
<li>Milvus utilisant une architecture de traitement massivement parallèle (MPP), le proxy agrège et traite les résultats intermédiaires avant de renvoyer les résultats finaux au client.</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">Couche 2 : Coordinateur<button data-href="#Layer-2-Coordinator" class="anchor-icon" translate="no">
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
    </button></h3><p>Le coordinateur fait office de « cerveau » de Milvus. À tout moment, un seul et unique coordinateur est actif sur l’ensemble du cluster ; il est chargé de maintenir la topologie du cluster, de planifier tous les types de tâches et de garantir la cohérence au niveau du cluster.</p>
<p>Voici quelques-unes des tâches gérées par le <strong>coordinateur</strong>:</p>
<ul>
<li><strong>Gestion DDL/DCL/TSO</strong>: traite les requêtes en langage de définition des données (DDL) et en langage de contrôle des données (DCL), telles que la création ou la suppression de collections, de partitions ou d’index, ainsi que la gestion des horodatages Oracle (TSO) et l’émission de marqueurs temporels.</li>
<li><strong>Gestion du service de streaming</strong>: relie le journal d’écriture anticipée (WAL) aux nœuds de streaming et assure la découverte des services pour le service de streaming.</li>
<li><strong>Gestion des requêtes</strong>: gère la topologie et l’équilibrage de charge des nœuds de requêtes, et fournit et gère les vues de requêtes servies pour guider le routage des requêtes.</li>
<li><strong>Gestion des données historiques</strong>: distribue les tâches hors ligne, telles que la compaction et la création d’index, aux nœuds de données, et gère la topologie des segments et des vues de données.</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">Couche 3 : Nœuds de travail<button data-href="#Layer-3-Worker-Nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>Les bras et les jambes. Les nœuds de travail sont des exécuteurs « passifs » qui suivent les instructions du coordinateur. Grâce à la séparation entre le stockage et le calcul, les nœuds de travail sont sans état et peuvent faciliter l’évolutivité horizontale du système ainsi que la reprise après sinistre lorsqu’ils sont déployés sur Kubernetes. Il existe trois types de nœuds de travail :</p>
<h3 id="Streaming-node" class="common-anchor-header">Nœud de streaming<button data-href="#Streaming-node" class="anchor-icon" translate="no">
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
    </button></h3><p>Le nœud de streaming fait office de « mini-cerveau » au niveau des shards, assurant la cohérence au niveau des shards et la récupération en cas de panne grâce au stockage WAL sous-jacent. Parallèlement, le nœud de streaming est également chargé d’interroger les données en croissance et de générer des plans de requête. De plus, il gère la conversion des données en croissance en données scellées (historiques).</p>
<h3 id="Query-node" class="common-anchor-header">Nœud de requête<button data-href="#Query-node" class="anchor-icon" translate="no">
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
    </button></h3><p>Le nœud de requête charge les données historiques à partir du stockage d’objets et permet d’interroger ces données historiques.</p>
<h3 id="Data-node" class="common-anchor-header">Nœud de données<button data-href="#Data-node" class="anchor-icon" translate="no">
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
    </button></h3><p>Le nœud de données est chargé du traitement hors ligne des données historiques, notamment la compaction et la création d’index.</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">Couche 4 : Stockage<button data-href="#Layer-4-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Le stockage est la colonne vertébrale du système, chargé d’assurer la persistance des données. Il comprend le méta-stockage, le courtier de journaux et le stockage objet.</p>
<h3 id="Meta-storage" class="common-anchor-header">Méta-stockage<button data-href="#Meta-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Le méta-stockage stocke des instantanés de métadonnées, tels que le schéma de collection et les points de contrôle de consommation des messages. Le stockage des métadonnées exige une disponibilité extrêmement élevée, une forte cohérence et la prise en charge des transactions ; c’est pourquoi Milvus a choisi etcd comme méta-stockage. Milvus utilise également etcd pour l’enregistrement des services et les contrôles d’intégrité.</p>
<h3 id="Object-storage" class="common-anchor-header">Stockage d’objets<button data-href="#Object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Le stockage d’objets assure la persistance des données et des fichiers d’index. Milvus prend en charge des backends de stockage d’objets tels que MinIO, AWS S3 et Azure Blob Storage. Les QueryNodes mettent en cache les données et les index nécessaires au traitement des requêtes.</p>
<p>Grâce <a href="/docs/fr/tiered-storage-overview.md">au stockage hiérarchisé</a>, disponible dans Milvus 2.6.4 et versions ultérieures, les QueryNodes peuvent charger en premier lieu les métadonnées des segments, puis récupérer les données des champs ou les index à la demande, plutôt que de tout charger lors de l’initialisation. Le stockage d’objets distant reste la source persistante ; l’éviction d’une entrée du cache local ne supprime pas les données stockées. L’accès aux données non mises en cache augmente les E/S de stockage et peut accroître la latence des requêtes. Utilisez <a href="/docs/fr/warm-up.md">la fonction « Warm Up »</a> pour les champs ou index sensibles à la latence, et évaluez la latence des requêtes « froides » ainsi que celle du cache « tiède » avant de choisir une stratégie de chargement.</p>
<h3 id="WAL-storage" class="common-anchor-header">Stockage WAL<button data-href="#WAL-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Le stockage du journal d’écriture anticipée (WAL) est le fondement de la durabilité et de la cohérence des données dans les systèmes distribués. Avant qu’une modification ne soit validée, elle est d’abord enregistrée dans un journal, ce qui garantit qu’en cas de panne, vous pouvez reprendre exactement là où vous vous étiez arrêté.</p>
<p>Parmi les implémentations courantes du WAL, on trouve Kafka, Pulsar et Woodpecker. Contrairement aux solutions traditionnelles basées sur disque, Woodpecker adopte une architecture cloud native « zéro disque » qui écrit directement dans un stockage objet. Cette approche s’adapte sans effort à vos besoins et simplifie les opérations en supprimant la charge liée à la gestion des disques locaux.</p>
<p>En consignant chaque opération d’écriture à l’avance, la couche WAL garantit un mécanisme fiable à l’échelle du système pour la récupération et la cohérence, quelle que soit la complexité de votre environnement distribué.</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">Flux de données et catégories d’API<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>Les API Milvus sont classées par fonction et suivent des chemins spécifiques au sein de l’architecture :</p>
<table>
<thead>
<tr><th>Catégorie d’API</th><th>Opérations</th><th>Exemples d’API</th><th>Flux architectural</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>Schéma et contrôle d'accès</td><td><code translate="no">createCollection</code>, <code translate="no">dropCollection</code>, <code translate="no">hasCollection</code>, <code translate="no">createPartition</code></td><td>Couche d'accès → Coordinateur</td></tr>
<tr><td><strong>DML</strong></td><td>Manipulation des données</td><td><code translate="no">insert</code>, <code translate="no">delete</code>, <code translate="no">upsert</code></td><td>Couche d’accès → Nœud de traitement en continu</td></tr>
<tr><td><strong>DQL</strong></td><td>Requête de données</td><td><code translate="no">search</code>, <code translate="no">query</code></td><td>Couche d'accès → Nœud de traitement par lots (nœuds de requête)</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">Exemple de flux de données : opération de recherche<button data-href="#Example-Data-Flow-Search-Operation" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Le client envoie une requête de recherche via le SDK/l’API RESTful</li>
<li>L'équilibreur de charge achemine la requête vers un proxy disponible dans la couche d'accès</li>
<li>Le proxy utilise le cache de routage pour déterminer les nœuds cibles ; il ne contacte le coordinateur que si le cache n’est pas disponible</li>
<li>Le proxy transmet la requête aux nœuds de streaming appropriés, qui se coordonnent ensuite avec les nœuds de requête pour la recherche de données scellées tout en exécutant localement la recherche dans les données en croissance</li>
<li>Les nœuds de requête chargent les segments scellés depuis le stockage d’objets selon les besoins et effectuent une recherche au niveau des segments</li>
<li>Les résultats de la recherche font l’objet d’une réduction à plusieurs niveaux : les nœuds de requête réduisent les résultats sur plusieurs segments, les nœuds de streaming réduisent les résultats provenant des nœuds de requête, et le proxy réduit les résultats provenant de tous les nœuds de streaming avant de les renvoyer au client</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">Exemple de flux de données : insertion de données<button data-href="#Example-Data-Flow-Data-Insertion" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Le client envoie une requête d’insertion contenant des données vectorielles</li>
<li>La couche d’accès valide et transmet la requête au nœud de streaming</li>
<li>Le nœud de streaming consigne l’opération dans le journal WAL à des fins de durabilité</li>
<li>Les données sont traitées en temps réel et mises à disposition pour les requêtes</li>
<li>Lorsque les segments atteignent leur capacité maximale, le nœud de streaming déclenche leur conversion en segments scellés</li>
<li>Le nœud de données gère la compaction et crée des index sur les segments scellés, en stockant les résultats dans le stockage d’objets</li>
<li>Les nœuds de requête chargent les index nouvellement créés et remplacent les données correspondantes qui ne cessent de croître</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>Découvrez les <a href="/docs/fr/main_components.md">principaux composants</a> pour connaître les détails de la mise en œuvre</li>
<li>Découvrez les workflows <a href="/docs/fr/data_processing.md">de traitement des données</a> et les stratégies d’optimisation</li>
<li>Comprenez le <a href="/docs/fr/tune_consistency.md">modèle de cohérence</a> et les garanties de transaction dans Milvus</li>
</ul>
