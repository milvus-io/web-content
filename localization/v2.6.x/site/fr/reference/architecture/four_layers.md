---
id: four_layers.md
summary: Structure de désagrégation stockage/informatique dans Milvus.
title: Désagrégation stockage/informatique
---
<h1 id="StorageComputing-Disaggregation" class="common-anchor-header">Désagrégation stockage/informatique<button data-href="#StorageComputing-Disaggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>Suivant le principe de la désagrégation du plan de données et du plan de contrôle, Milvus comprend quatre couches qui sont mutuellement indépendantes en termes d'évolutivité et de reprise après sinistre.</p>
<h2 id="Access-layer" class="common-anchor-header">Couche d'accès<button data-href="#Access-layer" class="anchor-icon" translate="no">
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
    </button></h2><p>Composée d'un groupe de proxys sans état, la couche d'accès est la couche frontale du système et le point final pour les utilisateurs. Elle valide les demandes des clients et réduit les résultats renvoyés :</p>
<ul>
<li>Le proxy est lui-même sans état. Il fournit une adresse de service unifiée à l'aide de composants d'équilibrage de charge tels que Nginx, Kubernetes Ingress, NodePort et LVS.</li>
<li>Comme Milvus utilise une architecture de traitement massivement parallèle (MPP), le proxy agrège et post-traite les résultats intermédiaires avant de renvoyer les résultats finaux au client.</li>
</ul>
<h2 id="Coordinator-service" class="common-anchor-header">Service de coordination<button data-href="#Coordinator-service" class="anchor-icon" translate="no">
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
    </button></h2><p>Le service de coordination assigne des tâches aux nœuds de travail et fonctionne comme le cerveau du système. Les tâches qu'il prend en charge comprennent la gestion de la topologie de la grappe, l'équilibrage de la charge, la génération de l'horodatage, la déclaration des données et la gestion des données.</p>
<p>Il existe trois types de coordinateurs : le coordinateur racine (root coord), le coordinateur de données (data coord) et le coordinateur de requêtes (query coord).</p>
<h3 id="Root-coordinator-root-coord" class="common-anchor-header">Coordinateur racine (root coord)</h3><p>Le coordinateur racine gère les requêtes du langage de définition des données (DDL) et du langage de contrôle des données (DCL), telles que la création ou la suppression de collections, de partitions ou d'index, ainsi que la gestion de l'émission de TSO (timestamp Oracle) et de time ticker.</p>
<h3 id="Query-coordinator-query-coord" class="common-anchor-header">Coordinateur des requêtes (query coord)</h3><p>Le coordinateur de requêtes gère la topologie et l'équilibrage de la charge pour les nœuds de requêtes, ainsi que le transfert des segments croissants vers les segments scellés.</p>
<h3 id="Data-coordinator-data-coord" class="common-anchor-header">Coordinateur des données (data coord)</h3><p>Le coordinateur de données gère la topologie des nœuds de données et des nœuds d'index, maintient les métadonnées et déclenche les opérations de vidage, de compactage et de construction d'index, ainsi que d'autres opérations sur les données en arrière-plan.</p>
<h2 id="Worker-nodes" class="common-anchor-header">Nœuds de travail<button data-href="#Worker-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>Les bras et les jambes. Les nœuds de travail sont des exécutants muets qui suivent les instructions du service coordinateur et exécutent les commandes DML (Data Manipulation Language) du proxy. Les nœuds de travail sont sans état grâce à la séparation du stockage et du calcul, et peuvent faciliter la mise à l'échelle du système et la reprise après sinistre lorsqu'ils sont déployés sur Kubernetes. Il existe trois types de nœuds de travail :</p>
<h3 id="Query-node" class="common-anchor-header">Nœud de requête</h3><p>Le nœud de requête récupère les données incrémentales du journal et les transforme en segments croissants en s'abonnant au courtier du journal, charge les données historiques à partir du stockage d'objets et exécute une recherche hybride entre les données vectorielles et scalaires.</p>
<h3 id="Data-node" class="common-anchor-header">Nœud de données</h3><p>Le nœud de données récupère les données incrémentielles du journal en s'abonnant au courtier du journal, traite les demandes de mutation et rassemble les données du journal dans des instantanés du journal et les stocke dans le stockage d'objets.</p>
<h3 id="Index-node" class="common-anchor-header">Nœud d'index</h3><p>Le nœud d'index construit des index.  Les nœuds d'index n'ont pas besoin d'être résidents en mémoire et peuvent être mis en œuvre avec le framework sans serveur.</p>
<h2 id="Storage" class="common-anchor-header">Stockage<button data-href="#Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Le stockage est l'os du système, responsable de la persistance des données. Il comprend le méta stockage, le log broker et le stockage d'objets.</p>
<h3 id="Meta-storage" class="common-anchor-header">Méta stockage</h3><p>Le méta stockage stocke des instantanés de métadonnées tels que le schéma de collecte et les points de contrôle de la consommation de messages. Le stockage des métadonnées exige une très grande disponibilité, une forte cohérence et la prise en charge des transactions, c'est pourquoi Milvus a choisi etcd pour le méta-stockage. Milvus utilise également etcd pour l'enregistrement et la vérification de l'état des services.</p>
<h3 id="Object-storage" class="common-anchor-header">Stockage d'objets</h3><p>Le stockage d'objets stocke les fichiers d'instantanés des journaux, les fichiers d'index pour les données scalaires et vectorielles et les résultats de requêtes intermédiaires. Milvus utilise MinIO comme stockage d'objets et peut être facilement déployé sur AWS S3 et Azure Blob, deux des services de stockage les plus populaires et les plus rentables au monde. Toutefois, le stockage d'objets présente une latence d'accès élevée et est facturé en fonction du nombre de requêtes. Pour améliorer ses performances et réduire les coûts, Milvus prévoit de mettre en œuvre la séparation des données froides et chaudes sur un pool de cache à base de mémoire ou de SSD.</p>
<h3 id="WAL-storage" class="common-anchor-header">Stockage WAL</h3><p>Le stockage WAL (Write-Ahead Log) est le fondement de la durabilité et de la cohérence des données dans les systèmes distribués. Avant qu'une modification ne soit validée, elle est d'abord enregistrée dans un journal, ce qui garantit qu'en cas de défaillance, vous pouvez reprendre exactement là où vous vous étiez arrêté.</p>
<p>Les implémentations WAL les plus courantes sont Kafka, Pulsar et Woodpecker. Contrairement aux solutions traditionnelles basées sur des disques, Woodpecker adopte une conception sans disque, native pour le cloud, qui écrit directement dans le stockage objet. Cette approche s'adapte sans effort à vos besoins et simplifie les opérations en supprimant les frais généraux liés à la gestion des disques locaux.</p>
<p>En enregistrant chaque opération d'écriture à l'avance, la couche WAL garantit un mécanisme fiable de récupération et de cohérence à l'échelle du système, quelle que soit la complexité de votre environnement distribué.</p>
<h2 id="Whats-next" class="common-anchor-header">À suivre<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Lisez <a href="/docs/fr/main_components.md">Composants principaux</a> pour plus de détails sur l'architecture Milvus.</li>
</ul>
