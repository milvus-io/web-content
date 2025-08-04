---
id: architecture_overview.md
summary: >-
  Milvus fournit une base de données vectorielles rapide, fiable et stable,
  spécialement conçue pour la recherche de similarités et l'intelligence
  artificielle.
title: Aperçu de l'architecture de Milvus
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Aperçu de l'architecture de Milvus<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus est une base de données vectorielles <strong>open-source</strong> et <strong>cloud-native</strong> conçue pour la recherche de similarités haute performance sur des ensembles de données vectorielles massifs. Construite au-dessus des bibliothèques de recherche vectorielle populaires, notamment Faiss, HNSW, DiskANN et SCANN, elle renforce les applications d'IA et les scénarios de recherche de données non structurées. Avant de poursuivre, familiarisez-vous avec les <a href="/docs/fr/glossary.md">principes de base</a> de la recherche par incorporation.</p>
<h2 id="Architecture-Diagram" class="common-anchor-header">Diagramme de l'architecture<button data-href="#Architecture-Diagram" class="anchor-icon" translate="no">
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
    </button></h2><p>Le diagramme suivant illustre l'architecture de haut niveau de Milvus, mettant en évidence sa conception modulaire, évolutive et cloud-native avec des couches de stockage et de calcul entièrement désagrégées.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>Schéma de l'architecture</span> </span></p>
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
    </button></h2><p>Milvus suit le principe de la désagrégation du plan de données et du plan de contrôle, comprenant quatre couches principales qui sont mutuellement indépendantes en termes d'évolutivité et de reprise après sinistre. Cette architecture de stockage partagé avec des couches de stockage et de calcul entièrement désagrégées permet une mise à l'échelle horizontale des nœuds de calcul tout en mettant en œuvre Woodpecker en tant que couche WAL sans disque pour une élasticité accrue et une réduction des frais généraux d'exploitation.</p>
<p>En séparant le traitement en flux dans le nœud de flux et le traitement par lots dans le nœud de requête et le nœud de données, Milvus atteint des performances élevées tout en répondant simultanément aux exigences de traitement en temps réel.</p>
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">Couche 1 : Couche d'accès</h3><p>Composée d'un groupe de proxys sans état, la couche d'accès est la couche frontale du système et le point d'accès aux utilisateurs. Elle valide les demandes des clients et réduit les résultats renvoyés :</p>
<ul>
<li>Le proxy est lui-même sans état. Il fournit une adresse de service unifiée à l'aide de composants d'équilibrage de charge tels que Nginx, Kubernetes Ingress, NodePort et LVS.</li>
<li>Comme Milvus utilise une architecture de traitement massivement parallèle (MPP), le proxy agrège et post-traite les résultats intermédiaires avant de renvoyer les résultats finaux au client.</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">Couche 2 : Coordinateur</h3><p>Le coordinateur est le cerveau de Milvus. À tout moment, un seul coordinateur est actif dans l'ensemble de la grappe, chargé de maintenir la topologie de la grappe, de planifier tous les types de tâches et de garantir la cohérence au niveau de la grappe.</p>
<p>Voici quelques-unes des tâches gérées par le <strong>coordinateur</strong>:</p>
<ul>
<li><strong>Gestion du DDL/DCL/TSO</strong>: Il gère les requêtes du langage de définition des données (DDL) et du langage de contrôle des données (DCL), telles que la création ou la suppression de collections, de partitions ou d'index, ainsi que la gestion de l'Oracle d'horodatage (TSO) et de l'émission de tickers temporels.</li>
<li><strong>Gestion des services de streaming</strong>: Lie le Write-Ahead Log (WAL) aux nœuds de diffusion en continu et assure la découverte du service de diffusion en continu.</li>
<li><strong>Gestion des requêtes</strong>: Gère la topologie et l'équilibrage des charges pour les nœuds de requête, et fournit et gère les vues de requête de service pour guider l'acheminement des requêtes.</li>
<li><strong>Gestion des données historiques</strong>: Distribue les tâches hors ligne telles que le compactage et la création d'index aux nœuds de données, et gère la topologie des segments et des vues de données.</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">Couche 3 : Nœuds de travail</h3><p>Les bras et les jambes. Les nœuds de travail sont des exécutants muets qui suivent les instructions du coordinateur. Les nœuds de travail sont sans état grâce à la séparation du stockage et du calcul, et peuvent faciliter la mise à l'échelle du système et la reprise après sinistre lorsqu'ils sont déployés sur Kubernetes. Il existe trois types de nœuds de travail :</p>
<h3 id="Streaming-node" class="common-anchor-header">Nœud de streaming</h3><p>Le nœud de streaming sert de "mini-cerveau" au niveau du shard, fournissant des garanties de cohérence au niveau du shard et une reprise sur panne basée sur le stockage WAL sous-jacent. Parallèlement, le nœud de streaming est également responsable de l'interrogation des données croissantes et de la génération de plans d'interrogation. En outre, il gère la conversion des données croissantes en données scellées (historiques).</p>
<h3 id="Query-node" class="common-anchor-header">Nœud de requête</h3><p>Le nœud de requête charge les données historiques à partir du stockage d'objets et permet d'interroger les données historiques.</p>
<h3 id="Data-node" class="common-anchor-header">Nœud de données</h3><p>Le nœud de données est responsable du traitement hors ligne des données historiques, comme le compactage et la construction d'index.</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">Couche 4 : Stockage</h3><p>Le stockage est l'ossature du système, responsable de la persistance des données. Il comprend le méta stockage, le log broker et le stockage d'objets.</p>
<h3 id="Meta-storage" class="common-anchor-header">Méta stockage</h3><p>Le méta-stockage stocke des instantanés de métadonnées telles que le schéma de collecte et les points de contrôle de la consommation de messages. Le stockage des métadonnées exige une très grande disponibilité, une forte cohérence et la prise en charge des transactions, c'est pourquoi Milvus a choisi etcd pour le méta-stockage. Milvus utilise également etcd pour l'enregistrement et la vérification de l'état des services.</p>
<h3 id="Object-storage" class="common-anchor-header">Stockage d'objets</h3><p>Le stockage d'objets stocke les fichiers d'instantanés des journaux, les fichiers d'index pour les données scalaires et vectorielles et les résultats de requêtes intermédiaires. Milvus utilise MinIO comme stockage d'objets et peut être facilement déployé sur AWS S3 et Azure Blob, deux des services de stockage les plus populaires et les plus rentables au monde. Toutefois, le stockage d'objets présente une latence d'accès élevée et est facturé en fonction du nombre de requêtes. Pour améliorer ses performances et réduire les coûts, Milvus prévoit de mettre en œuvre la séparation des données froides et chaudes sur un pool de cache à base de mémoire ou de SSD.</p>
<h3 id="WAL-storage" class="common-anchor-header">Stockage WAL</h3><p>Le stockage WAL (Write-Ahead Log) est le fondement de la durabilité et de la cohérence des données dans les systèmes distribués. Avant qu'une modification ne soit validée, elle est d'abord enregistrée dans un journal, ce qui garantit qu'en cas de défaillance, vous pouvez reprendre exactement là où vous vous étiez arrêté.</p>
<p>Les implémentations WAL les plus courantes sont Kafka, Pulsar et Woodpecker. Contrairement aux solutions traditionnelles basées sur des disques, Woodpecker adopte une conception sans disque, native pour le cloud, qui écrit directement dans le stockage objet. Cette approche s'adapte sans effort à vos besoins et simplifie les opérations en supprimant les frais généraux liés à la gestion des disques locaux.</p>
<p>En enregistrant chaque opération d'écriture à l'avance, la couche WAL garantit un mécanisme fiable de récupération et de cohérence à l'échelle du système, quelle que soit la complexité de votre environnement distribué.</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">Flux de données et catégories d'API<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>Les API Milvus sont classées par fonction et suivent des chemins spécifiques dans l'architecture :</p>
<table>
<thead>
<tr><th>Catégorie d'API</th><th>Opérations</th><th>Exemples d'API</th><th>Flux d'architecture</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>Schéma et contrôle d'accès</td><td><code translate="no">createCollection</code> <code translate="no">dropCollection</code>, , <code translate="no">hasCollection</code> <code translate="no">createPartition</code></td><td>Couche d'accès → Coordinateur</td></tr>
<tr><td><strong>DML</strong></td><td>Manipulation de données</td><td><code translate="no">insert</code>, <code translate="no">delete</code>, <code translate="no">upsert</code></td><td>Couche d'accès → Nœud de travail en continu</td></tr>
<tr><td><strong>DQL</strong></td><td>Requête de données</td><td><code translate="no">search</code>, <code translate="no">query</code></td><td>Couche d'accès → Nœud de travail par lots (nœuds de requête)</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">Exemple de flux de données : opération de recherche</h3><ol>
<li>Le client envoie une demande de recherche via le SDK/l'API RESTful.</li>
<li>L'équilibreur de charge achemine la demande vers le mandataire disponible dans la couche d'accès.</li>
<li>Le mandataire utilise le cache de routage pour déterminer les nœuds cibles ; il ne contacte le coordinateur que si le cache n'est pas disponible.</li>
<li>Le proxy transmet la demande aux nœuds de streaming appropriés, qui coordonnent ensuite avec les nœuds de requête pour la recherche de données scellées tout en exécutant localement la recherche de données croissantes.</li>
<li>Les nœuds d'interrogation chargent les segments scellés à partir du stockage d'objets, selon les besoins, et effectuent une recherche au niveau des segments.</li>
<li>Les résultats de la recherche font l'objet d'une réduction à plusieurs niveaux : Les nœuds de requête réduisent les résultats sur plusieurs segments, les nœuds de diffusion en continu réduisent les résultats des nœuds de requête et le mandataire réduit les résultats de tous les nœuds de diffusion en continu avant de les renvoyer au client.</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">Exemple de flux de données : insertion de données</h3><ol>
<li>Le client envoie une demande d'insertion avec des données vectorielles.</li>
<li>La couche d'accès valide et transmet la demande au nœud de diffusion en continu.</li>
<li>Le nœud de streaming enregistre l'opération dans le stockage WAL à des fins de durabilité.</li>
<li>Les données sont traitées en temps réel et mises à disposition pour les requêtes.</li>
<li>Lorsque les segments atteignent leur capacité, le nœud de diffusion en continu déclenche la conversion en segments scellés.</li>
<li>Le nœud de données gère le compactage et construit des index sur les segments scellés, en stockant les résultats dans le stockage d'objets.</li>
<li>Les nœuds de requête chargent les index nouvellement construits et remplacent les données croissantes correspondantes.</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">À suivre<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>Explorez les <a href="/docs/fr/main_components.md">composants principaux</a> pour obtenir des informations détaillées sur la mise en œuvre.</li>
<li>Découvrez les flux de <a href="/docs/fr/data_processing.md">traitement des données</a> et les stratégies d'optimisation</li>
<li>Comprendre le <a href="/docs/fr/consistency.md">modèle de cohérence</a> et les garanties de transaction dans Milvus</li>
</ul>
