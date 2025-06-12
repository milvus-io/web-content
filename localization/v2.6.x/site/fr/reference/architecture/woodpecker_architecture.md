---
id: woodpecker_architecture.md
title: Woodpecker
summary: >-
  Woodpecker est un système WAL natif dans Milvus 2.6. Avec une architecture
  sans disque et deux modes de déploiement, il offre un débit élevé, une faible
  charge opérationnelle et une évolutivité transparente sur le stockage
  d'objets.
---
<h1 id="Woodpecker" class="common-anchor-header">Woodpecker<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans Milvus 2.6, Woodpecker remplace Kafka et Pulsar par un système WAL (write-ahead log) spécialement conçu pour le cloud. Conçu pour le stockage d'objets, Woodpecker simplifie les opérations, maximise le débit et évolue sans effort.</p>
<p>Les objectifs de conception de Woodpecker :</p>
<ul>
<li><p>Débit maximal dans les environnements en nuage</p></li>
<li><p>Journalisation durable, uniquement par appendice, pour une récupération fiable</p></li>
<li><p>Frais généraux d'exploitation minimaux sans disques locaux ni courtiers externes</p></li>
</ul>
<h2 id="Zero-disk-architecture" class="common-anchor-header">Architecture sans disque<button data-href="#Zero-disk-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>L'innovation principale de Woodpecker est son architecture à disque zéro :</p>
<ul>
<li>Toutes les données de journalisation sont stockées dans un système de stockage d'objets dans le nuage (comme Amazon S3, Google Cloud Storage ou Alibaba OS).</li>
<li>Les métadonnées sont gérées par des magasins de clés-valeurs distribués comme <strong>etcd</strong>.</li>
<li>Aucune dépendance à l'égard d'un disque local pour les opérations de base</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_layers.png" alt="woodpecker layers" class="doc-image" id="woodpecker-layers" />
   </span> <span class="img-wrapper"> <span>couches de woodpecker</span> </span></p>
<h2 id="Architecture-components" class="common-anchor-header">Composants de l'architecture<button data-href="#Architecture-components" class="anchor-icon" translate="no">
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
    </button></h2><p>Un déploiement standard de Woodpecker comprend les composants suivants :</p>
<ul>
<li><strong>Client</strong>: Couche d'interface pour l'émission de demandes de lecture et d'écriture</li>
<li><strong>LogStore</strong>: gère la mise en mémoire tampon des écritures à grande vitesse, les téléchargements asynchrones vers le stockage et le compactage des journaux</li>
<li><strong>Backend de stockage</strong>: Prend en charge les services de stockage évolutifs et peu coûteux tels que S3, GCS et les systèmes de fichiers tels que EFS.</li>
<li><strong>Etcd</strong>: Stocke les métadonnées et coordonne l'état des journaux sur les nœuds distribués.</li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">Modes de déploiement<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker propose deux modes de déploiement pour répondre à vos besoins spécifiques :</p>
<h3 id="MemoryBuffer---Lightweight-and-maintenance-free" class="common-anchor-header">MemoryBuffer - Léger et sans maintenance</h3><p>Le mode MemoryBuffer offre une option de déploiement simple et légère dans laquelle Woodpecker met temporairement en mémoire tampon les écritures entrantes et les évacue périodiquement vers un service de stockage d'objets dans le nuage. Les métadonnées sont gérées par <strong>etcd</strong> pour assurer la cohérence et la coordination. Ce mode est mieux adapté aux charges de travail lourdes en lots dans les déploiements à petite échelle ou les environnements de production qui donnent la priorité à la simplicité plutôt qu'aux performances, en particulier lorsqu'une faible latence d'écriture n'est pas critique.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>déploiement du mode mémoire woodpecker</span> </span></p>
<h3 id="QuorumBuffer---Optimized-for-low-latency-high-durability" class="common-anchor-header">QuorumBuffer - Optimisé pour une faible latence et une grande durabilité</h3><p>Le mode QuorumBuffer est conçu pour les charges de travail en lecture/écriture sensibles à la latence et à haute fréquence, qui nécessitent à la fois une réactivité en temps réel et une forte tolérance aux pannes. Dans ce mode, Woodpecker fonctionne comme un tampon d'écriture à grande vitesse avec des écritures quorum à trois répliques, garantissant une forte cohérence et une haute disponibilité.</p>
<p>Une écriture est considérée comme réussie lorsqu'elle est répliquée sur au moins deux des trois nœuds, généralement dans un délai de quelques millisecondes, après quoi les données sont évacuées de manière asynchrone vers le stockage d'objets dans le nuage pour une durabilité à long terme. Cette architecture minimise l'état sur le nœud, élimine le besoin de gros volumes de disques locaux et évite les réparations anti-entropie complexes souvent nécessaires dans les systèmes traditionnels basés sur le quorum.</p>
<p>Il en résulte une couche WAL rationalisée et robuste, idéale pour les environnements de production critiques où la cohérence, la disponibilité et la restauration rapide sont essentielles.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>déploiement du mode mémoire de woodpecker</span> </span></p>
<h2 id="Performance-benchmarks" class="common-anchor-header">Tests de performance<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Nous avons effectué des tests complets pour évaluer les performances de Woodpecker dans une configuration à un seul nœud, un seul client et un seul flux de logs. Les résultats sont impressionnants par rapport à Kafka et Pulsar :</p>
<table>
<thead>
<tr><th>Système</th><th>Kafka</th><th>Pulsar</th><th>WP Minio</th><th>WP Local</th><th>WP S3</th></tr>
</thead>
<tbody>
<tr><td>Débit</td><td>129,96 Mo/s</td><td>107MB/s</td><td>71MB/s</td><td>450MB/s</td><td>750MB/s</td></tr>
<tr><td>temps de latence</td><td>58ms</td><td>35ms</td><td>184 ms</td><td>1,8ms</td><td>166 ms</td></tr>
</tbody>
</table>
<p>Pour le contexte, nous avons mesuré les limites de débit théoriques de différents backends de stockage sur notre machine de test :</p>
<ul>
<li>MinIO : ~110 Mo/s</li>
<li>Système de fichiers local : 600-750 Mo/s</li>
<li>Amazon S3 (instance EC2 unique) : jusqu'à 1,1 Go/s</li>
</ul>
<p>Fait remarquable, Woodpecker a constamment atteint 60 à 80 % du débit maximal possible pour chaque backend, ce qui représente un niveau d'efficacité exceptionnel pour un middleware.</p>
<h3 id="Key-performance-insights" class="common-anchor-header">Principales informations sur les performances</h3><ul>
<li>Mode système de fichiers local : Woodpecker a atteint 450 Mo/s, soit 3,5 fois plus vite que Kafka et 4,2 fois plus vite que Pulsar, avec une latence ultra-faible de seulement 1,8 ms, ce qui en fait l'outil idéal pour les déploiements haute performance à un seul nœud.</li>
<li>Mode de stockage dans le nuage (S3) : En écrivant directement sur S3, Woodpecker a atteint 750 Mo/s (environ 68 % de la limite théorique de S3), soit 5,8 fois plus que Kafka et 7 fois plus que Pulsar. Bien que la latence soit plus élevée (166 ms), cette configuration offre un débit exceptionnel pour les charges de travail par lots.</li>
<li>Mode de stockage d'objets (MinIO) : Même avec MinIO, Woodpecker a atteint 71 Mo/s, soit environ 65 % de la capacité de MinIO. Ces performances sont comparables à celles de Kafka et de Pulsar, mais avec des besoins en ressources nettement inférieurs.</li>
</ul>
<p>Woodpecker est particulièrement optimisé pour les écritures simultanées de gros volumes, pour lesquelles le maintien de l'ordre est essentiel. Et ces résultats ne reflètent que les premières étapes du développement - les optimisations en cours dans la fusion des E/S, la mise en mémoire tampon intelligente et la prélecture devraient pousser les performances encore plus près des limites théoriques.</p>
<h2 id="Operational-benefits" class="common-anchor-header">Avantages opérationnels<button data-href="#Operational-benefits" class="anchor-icon" translate="no">
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
    </button></h2><p>L'architecture cloud-native de Woodpecker rationalise le déploiement, réduit la maintenance et améliore la fiabilité.</p>
<h3 id="Simplified-infrastructure-management" class="common-anchor-header">Gestion simplifiée de l'infrastructure</h3><ul>
<li><strong>Pas de gestion du stockage local :</strong> Il n'est plus nécessaire de gérer les volumes de disques, le RAID ou les défaillances de disques.</li>
<li><strong>Dépendance matérielle réduite :</strong> Élimination de la configuration et de la surveillance du matériel ; la durabilité et la disponibilité sont prises en charge par le stockage d'objets dans le nuage.</li>
<li><strong>Planification simplifiée de la capacité :</strong> Le stockage évolue automatiquement avec le stockage d'objets dans le nuage, ce qui supprime le besoin de prévisions manuelles.</li>
</ul>
<h3 id="Simplified-deployment" class="common-anchor-header">Déploiement simplifié</h3><ul>
<li><strong>Mode MemoryBuffer :</strong> Utilise des ressources minimales et s'intègre au stockage en nuage, idéal pour le développement et la production à petite échelle.</li>
<li><strong>Mode QuorumBuffer :</strong> Fournit une fiabilité de niveau entreprise sans la complexité du stockage distribué traditionnel.</li>
</ul>
<h2 id="Cost-efficiency-and-resource-optimization" class="common-anchor-header">Rentabilité et optimisation des ressources<button data-href="#Cost-efficiency-and-resource-optimization" class="anchor-icon" translate="no">
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
<li><strong>Utilisation réduite de la mémoire :</strong> La mise en mémoire tampon efficace réduit les besoins en mémoire par rapport aux courtiers traditionnels.</li>
<li><strong>Évolution élastique :</strong> Le stockage en nuage avec paiement à l'utilisation élimine le surprovisionnement.</li>
<li><strong>Réduction des frais généraux d'infrastructure :</strong> La réduction du nombre de composants se traduit par une diminution des coûts de déploiement et de maintenance.</li>
</ul>
<h3 id="Storage-cost-advantages" class="common-anchor-header">Avantages en termes de coûts de stockage</h3><ul>
<li><strong>Stockage hiérarchisé :</strong> Migration automatique des données vers des niveaux de stockage en nuage économiques pour une conservation à long terme.</li>
<li><strong>Compression et déduplication :</strong> Les fonctions intégrées réduisent les coûts de stockage sans effort opérationnel supplémentaire.</li>
<li><strong>Pas de frais de réplication :</strong> La durabilité est gérée par le stockage en nuage, ce qui élimine la nécessité d'une gestion manuelle des répliques.</li>
</ul>
<h2 id="High-availability-and-disaster-recovery" class="common-anchor-header">Haute disponibilité et reprise après sinistre<button data-href="#High-availability-and-disaster-recovery" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Simplified-fault-tolerance" class="common-anchor-header">Tolérance aux pannes simplifiée</h3><ul>
<li><strong>Durabilité native dans le nuage :</strong> Exploite les garanties de durabilité de 11 neuf (99,999999999%) des fournisseurs de cloud computing.</li>
<li><strong>Reprise rapide :</strong> L'état local minimal permet un remplacement rapide des nœuds et une reprise de la grappe.</li>
<li><strong>Résilience interrégionale :</strong> Prise en charge de la réplication interrégionale à l'aide des fonctions de stockage en nuage.</li>
</ul>
<h3 id="Operational-resilience" class="common-anchor-header">Résilience opérationnelle</h3><ul>
<li><strong>Moins de points de défaillance uniques :</strong> Le nombre réduit de composants diminue le risque de défaillance.</li>
<li><strong>Basculement automatique :</strong> La redondance du stockage en nuage simplifie le basculement.</li>
<li><strong>Sauvegarde simplifiée :</strong> Le stockage en nuage intégré assure une sauvegarde et un contrôle des versions automatiques.</li>
</ul>
<h2 id="Development-and-operational-experience" class="common-anchor-header">Expérience de développement et d'exploitation<button data-href="#Development-and-operational-experience" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Improved-development-workflow" class="common-anchor-header">Amélioration du flux de développement</h3><ul>
<li><strong>Installation plus rapide de l'environnement :</strong> Des dépendances minimales accélèrent le développement et les tests.</li>
<li><strong>Architecture cohérente :</strong> Conception uniforme pour le développement, la mise en scène et la production.</li>
<li><strong>Intégration cloud-native :</strong> Compatibilité transparente avec les services cloud et l'orchestration de conteneurs.</li>
</ul>
<h3 id="Enhanced-production-operations" class="common-anchor-header">Amélioration des opérations de production</h3><ul>
<li><strong>Performances prévisibles :</strong> Résultats cohérents pour toutes les échelles de déploiement et toutes les configurations.</li>
<li><strong>Mises à jour simplifiées :</strong> La conception sans état permet d'effectuer des mises à jour en continu avec un minimum de temps d'arrêt.</li>
<li><strong>Prévisibilité des ressources :</strong> Utilisation plus stable des ressources par rapport aux courtiers de messages traditionnels.</li>
</ul>
<p>Pour les bases de données vectorielles qui prennent en charge les charges de travail critiques de RAG, d'agents d'intelligence artificielle et de recherche à faible latence, ces avantages opérationnels sont révolutionnaires. Le passage de piles complexes de courtiers de messages à l'architecture simplifiée de Woodpecker permet non seulement d'améliorer les performances, mais aussi de réduire considérablement la charge opérationnelle qui pèse sur les équipes de développement et d'infrastructure.</p>
<p>Alors que l'infrastructure en nuage continue d'évoluer avec des innovations telles que S3 Express One Zone, l'architecture de Woodpecker permet aux organisations de bénéficier automatiquement de ces avancées sans nécessiter de changements opérationnels majeurs ou de refonte des systèmes.</p>
