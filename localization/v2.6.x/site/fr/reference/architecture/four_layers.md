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
<h2 id="Coordinator" class="common-anchor-header">Coordinateur<button data-href="#Coordinator" class="anchor-icon" translate="no">
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
    </button></h2><p>Le <strong>coordinateur</strong> est le cerveau de Milvus. À tout moment, un seul coordinateur est actif dans l'ensemble de la grappe, chargé de maintenir la topologie de la grappe, de planifier tous les types de tâches et de garantir la cohérence au niveau de la grappe.</p>
<p>Voici quelques-unes des tâches gérées par le <strong>coordinateur</strong>:</p>
<ul>
<li><strong>Gestion du DDL/DCL/TSO</strong>: Il gère les requêtes du langage de définition des données (DDL) et du langage de contrôle des données (DCL), telles que la création ou la suppression de collections, de partitions ou d'index, ainsi que la gestion de l'Oracle d'horodatage (TSO) et de l'émission de tickers temporels.</li>
<li><strong>Gestion des services de streaming</strong>: Lie le Write-Ahead Log (WAL) aux nœuds de diffusion en continu et assure la découverte du service de diffusion en continu.</li>
<li><strong>Gestion des requêtes</strong>: Gère la topologie et l'équilibrage des charges pour les nœuds de requête, et fournit et gère les vues de requête de service pour guider l'acheminement des requêtes.</li>
<li><strong>Gestion des données historiques</strong>: Distribue les tâches hors ligne telles que le compactage et la construction d'index aux nœuds de données, et gère la topologie des segments et des vues de données.</li>
</ul>
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
    </button></h2><p>Les bras et les jambes. Les nœuds de travail sont des exécutants muets qui suivent les instructions du coordinateur. Les nœuds de travail sont sans état grâce à la séparation du stockage et du calcul, et peuvent faciliter la mise à l'échelle du système et la reprise après sinistre lorsqu'ils sont déployés sur Kubernetes. Il existe trois types de nœuds de travail :</p>
<h3 id="Streaming-node" class="common-anchor-header">Nœud de streaming</h3><p>Le nœud de streaming sert de "mini-cerveau" au niveau du shard, fournissant des garanties de cohérence au niveau du shard et une reprise sur panne basée sur le stockage WAL sous-jacent. Parallèlement, le nœud de streaming est également responsable de l'interrogation des données croissantes et de la génération de plans d'interrogation. En outre, il gère la conversion des données croissantes en données scellées (historiques).</p>
<h3 id="Query-node" class="common-anchor-header">Nœud de requête</h3><p>Le nœud de requête charge les données historiques à partir du stockage d'objets et permet l'interrogation des données historiques.</p>
<h3 id="Data-node" class="common-anchor-header">Nœud de données</h3><p>Le nœud de données est responsable du traitement hors ligne des données historiques, comme le compactage et la construction d'index.</p>
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
    </button></h2><p>Le stockage est l'ossature du système, responsable de la persistance des données. Il comprend le méta stockage, le log broker et le stockage d'objets.</p>
<h3 id="Meta-storage" class="common-anchor-header">Méta stockage</h3><p>Le méta-stockage stocke des instantanés de métadonnées tels que le schéma de collecte et les points de contrôle de la consommation de messages. Le stockage des métadonnées exige une très grande disponibilité, une forte cohérence et la prise en charge des transactions, c'est pourquoi Milvus a choisi etcd pour le méta-stockage. Milvus utilise également etcd pour l'enregistrement et la vérification de l'état des services.</p>
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
