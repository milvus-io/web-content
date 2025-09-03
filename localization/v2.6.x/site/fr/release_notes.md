---
id: release_notes.md
summary: Notes de mise à jour de Milvus
title: Notes de mise à jour
---
<h1 id="Release-Notes" class="common-anchor-header">Notes de mise à jour<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Découvrez les nouveautés de Milvus ! Cette page résume les nouvelles fonctionnalités, les améliorations, les problèmes connus et les corrections de bogues de chaque version. Vous trouverez dans cette section les notes de version pour chaque version publiée après la v2.6.0. Nous vous conseillons de consulter régulièrement cette page pour prendre connaissance des mises à jour.</p>
<h2 id="v261" class="common-anchor-header">v2.6.1<button data-href="#v261" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 3 septembre 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Version Milvus</th><th style="text-align:left">Version SDK Python</th><th style="text-align:left">Version SDK Node.js</th><th style="text-align:left">Version SDK Java</th><th style="text-align:left">Version du SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Nous sommes ravis d'annoncer la sortie de Milvus 2.6.1 ! Cette version s'appuie sur les avancées architecturales majeures des versions précédentes et apporte des améliorations critiques axées sur la stabilité de la production, les performances et la robustesse opérationnelle. Cette version tient compte des principaux commentaires de la communauté et renforce le système pour les déploiements à grande échelle. Nous encourageons vivement tous les utilisateurs à mettre à jour pour bénéficier d'un système plus stable, plus performant et plus fiable.</p>
<h3 id="Improvements" class="common-anchor-header">Améliorations<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Prise en charge des systèmes de fichiers compatibles POSIX pour le stockage à distance<a href="https://github.com/milvus-io/milvus/pull/43944">(#43944</a>)</li>
<li>Introduction de rerankers basés sur des modèles<a href="https://github.com/milvus-io/milvus/pull/43270">(#43270</a>)</li>
<li>Optimisation des performances des expressions de comparaison sur les champs de clé primaire<a href="https://github.com/milvus-io/milvus/pull/43154">(#43154</a>)</li>
<li>Collecte le doc_id de la liste d'affichage directement pour accélérer la correspondance de texte<a href="https://github.com/milvus-io/milvus/pull/43899">(#43899</a>)</li>
<li>Optimise les performances des requêtes en convertissant plusieurs conditions != en une seule clause NOT IN<a href="https://github.com/milvus-io/milvus/pull/43690">(#43690</a>)</li>
<li>Amélioration de la gestion des ressources pour la couche de mise en cache pendant le chargement des segments<a href="https://github.com/milvus-io/milvus/pull/43846">(#43846</a>)</li>
<li>Améliore l'estimation de la mémoire pour les index intermédiaires pendant le chargement des données<a href="https://github.com/milvus-io/milvus/pull/44104">(#44104</a>)</li>
<li>Configure le ratio de construction pour les index intermédiaires<a href="https://github.com/milvus-io/milvus/pull/43939">(#43939</a>)</li>
<li>Ajoute une limite de vitesse d'écriture configurable au graveur de disque<a href="https://github.com/milvus-io/milvus/pull/43912">(#43912</a>)</li>
<li>Les paramètres SegCore peuvent maintenant être mis à jour dynamiquement sans redémarrer le service Milvus<a href="https://github.com/milvus-io/milvus/pull/43231">(#43231</a>)</li>
<li>Ajout de mesures unifiées de latence gRPC pour une meilleure observabilité<a href="https://github.com/milvus-io/milvus/pull/44089">(#44089</a>)</li>
<li>Inclut les horodatages des requêtes du client dans les en-têtes gRPC pour simplifier le débogage<a href="https://github.com/milvus-io/milvus/pull/44059">(#44059</a>)</li>
<li>Supporte le niveau de journal de trace pour segcore<a href="https://github.com/milvus-io/milvus/pull/44003">(#44003</a>)</li>
<li>Ajout d'un commutateur configurable pour ajuster les garanties de cohérence pour une plus grande disponibilité<a href="https://github.com/milvus-io/milvus/pull/43874">(#43874</a>)</li>
<li>Implémentation d'un mécanisme robuste de rewatch pour gérer les échecs de connexion etcd<a href="https://github.com/milvus-io/milvus/pull/43829">(#43829</a>)</li>
<li>Amélioration de la logique interne de vérification de la santé des noeuds<a href="https://github.com/milvus-io/milvus/pull/43768">(#43768</a>)</li>
<li>Optimise l'accès aux métadonnées lors de l'énumération des collections<a href="https://github.com/milvus-io/milvus/pull/43902">(#43902</a>)</li>
<li>Mise à jour du client Pulsar vers la version officielle v0.15.1 et ajout de plus de logs<a href="https://github.com/milvus-io/milvus/pull/43913">(#43913</a>)</li>
<li>Mise à jour de aws-sdk de 1.9.234 à 1.11.352<a href="https://github.com/milvus-io/milvus/pull/43916">(#43916</a>)</li>
<li>Prise en charge des mises à jour dynamiques des intervalles pour les composants de téléscripteur<a href="https://github.com/milvus-io/milvus/pull/43865">(#43865</a>)</li>
<li>Amélioration de l'auto-détection des jeux d'instructions ARM SVE pour les opérations de bitset<a href="https://github.com/milvus-io/milvus/pull/43833">(#43833</a>)</li>
<li>Amélioration du message d'erreur lorsqu'une correspondance de texte ou de phrase échoue<a href="https://github.com/milvus-io/milvus/pull/43366">(#43366</a>)</li>
<li>Amélioration du message d'erreur en cas de non concordance des dimensions d'un vecteur<a href="https://github.com/milvus-io/milvus/pull/43835">(#43835</a>)</li>
<li>Amélioration du rapport d'erreur pour les dépassements de délai d'ajout lorsque le magasin d'objets n'est pas disponible<a href="https://github.com/milvus-io/milvus/pull/43926">(#43926</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrections de bogues<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Correction d'un problème potentiel de sortie de mémoire (OOM) lors de l'importation de fichiers Parquet<a href="https://github.com/milvus-io/milvus/pull/43756">(#43756</a>)</li>
<li>Correction d'un problème où les noeuds en attente ne pouvaient pas récupérer si leur bail avait expiré<a href="https://github.com/milvus-io/milvus/pull/44112">(#44112</a>)</li>
<li>Gestion correcte de l'état de répétition du compactage<a href="https://github.com/milvus-io/milvus/pull/44119">(#44119</a>)</li>
<li>Correction d'un blocage potentiel entre les requêtes de lecture continue et le chargement d'index qui pouvait empêcher le chargement d'index<a href="https://github.com/milvus-io/milvus/pull/43937">(#43937</a>)</li>
<li>Correction d'un bogue pouvant entraîner l'échec des suppressions de données dans des scénarios à forte concomitance<a href="https://github.com/milvus-io/milvus/pull/43831">(#43831</a>)</li>
<li>Correction d'une condition de course potentielle lors du chargement des index texte et JSON<a href="https://github.com/milvus-io/milvus/pull/43811">(#43811</a>)</li>
<li>Correction d'une incohérence d'état de noeud qui pouvait se produire après un redémarrage de QueryCoord<a href="https://github.com/milvus-io/milvus/pull/43941">(#43941</a>)</li>
<li>Assure qu'un QueryNode "sale" est correctement nettoyé après un redémarrage<a href="https://github.com/milvus-io/milvus/pull/43909">(#43909</a>)</li>
<li>Correction d'un problème où l'état de réessai n'était pas géré correctement pour les requêtes avec des charges utiles non vides<a href="https://github.com/milvus-io/milvus/pull/44068">(#44068</a>)</li>
<li>Correction d'un problème où le bulk writer v2 n'utilisait pas le nom de bucket correct<a href="https://github.com/milvus-io/milvus/pull/44083">(#44083</a>)</li>
<li>Améliore la sécurité en cachant les éléments sensibles du point de terminaison RESTful get_configs<a href="https://github.com/milvus-io/milvus/pull/44057">(#44057</a>)</li>
<li>Assure que les téléchargements d'objets pour woodpecker sont idempotents pendant les tentatives de dépassement de délai<a href="https://github.com/milvus-io/milvus/pull/43947">(#43947</a>)</li>
<li>Désapprouve l'importation d'éléments nuls dans les champs de tableaux à partir de fichiers Parquet<a href="https://github.com/milvus-io/milvus/pull/43964">(#43964</a>)</li>
<li>Correction d'un bogue où le cache du proxy n'était pas invalidé après la création d'un alias de collection<a href="https://github.com/milvus-io/milvus/pull/43854">(#43854</a>)</li>
<li>Amélioration du mécanisme de découverte des services internes pour les noeuds de streaming<a href="https://github.com/milvus-io/milvus/pull/44033">(#44033</a>)</li>
<li>Correction de la logique des groupes de ressources pour filtrer correctement les noeuds de streaming<a href="https://github.com/milvus-io/milvus/pull/43984">(#43984</a>)</li>
<li>Ajout de l'étiquette databaseName aux métriques pour éviter les conflits de noms dans les environnements multi-bases de données<a href="https://github.com/milvus-io/milvus/pull/43808">(#43808</a>)</li>
<li>Correction d'une erreur de logique dans la gestion de l'état des tâches internes<a href="https://github.com/milvus-io/milvus/pull/43777">(#43777</a>)</li>
<li>Optimisation du timing d'initialisation des métriques internes pour éviter une panique potentielle<a href="https://github.com/milvus-io/milvus/pull/43773">(#43773</a>)</li>
<li>Correction d'un rare crash potentiel dans le serveur HTTP interne<a href="https://github.com/milvus-io/milvus/pull/43799">(#43799</a>)</li>
</ul>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 6 août 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Version Milvus</th><th style="text-align:left">Version SDK Python</th><th style="text-align:left">Version SDK Node.js</th><th style="text-align:left">Version SDK Java</th><th style="text-align:left">Version du SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0 est officiellement publié ! S'appuyant sur les fondations architecturales posées dans la version <a href="#v260-rc1">2.6.0-rc1</a>, cette version prête pour la production résout de nombreux problèmes de stabilité et de performance tout en introduisant de nouvelles fonctionnalités puissantes, notamment le format de stockage V2, le traitement JSON avancé et des fonctions de recherche améliorées. Avec de nombreuses corrections de bogues et optimisations basées sur les commentaires de la communauté au cours de la phase RC, Milvus 2.6.0 est prêt pour que vous l'exploriez et l'adoptiez.</p>
<div class="alert warning">
<p>La mise à niveau directe à partir des versions antérieures à la version 2.6.0 n'est pas prise en charge en raison des modifications architecturales. Veuillez suivre notre <a href="/docs/fr/upgrade_milvus_cluster-operator.md">guide de mise à jour</a>.</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">Nouveautés de la version 2.6.0 (depuis la RC)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">Format de stockage optimisé v2</h4><p>Pour relever les défis du stockage mixte de données scalaires et vectorielles, en particulier les recherches de points sur des données non structurées, Milvus 2.6 introduit le format de stockage V2. Ce nouveau format de stockage adaptatif en colonnes adopte une stratégie de disposition "fusion de colonnes étroites + indépendance des colonnes larges", ce qui résout fondamentalement les goulets d'étranglement en matière de performances lors de la gestion des recherches de points et des récupérations par petits lots dans les bases de données vectorielles.</p>
<p>Le nouveau format prend désormais en charge l'accès aléatoire efficace sans amplification des E/S et permet de multiplier par 100 les performances par rapport au format Parquet vanille adopté précédemment, ce qui le rend idéal pour les charges de travail d'IA nécessitant à la fois un traitement analytique et une récupération vectorielle précise. En outre, il peut réduire le nombre de fichiers jusqu'à 98 % pour les charges de travail typiques. La consommation de mémoire pour le compactage majeur est réduite de 300 %, et les opérations d'E/S sont optimisées jusqu'à 80 % pour les lectures et plus de 600 % pour les écritures.</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">Index plat JSON (bêta)</h4><p>Milvus 2.6 introduit l'index plat JSON pour gérer les schémas JSON hautement dynamiques. Contrairement à JSON Path Index qui nécessite la prédéclaration de chemins spécifiques et de leurs types attendus, JSON Flat Index découvre et indexe automatiquement toutes les structures imbriquées sous un chemin donné. Lors de l'indexation d'un champ JSON, il aplatit récursivement l'ensemble du sous-arbre, créant des entrées d'index inversées pour chaque paire chemin-valeur qu'il rencontre, indépendamment de la profondeur ou du type. Cet aplatissement automatique rend JSON Flat Index idéal pour les schémas évolutifs dans lesquels de nouveaux champs apparaissent sans avertissement. Par exemple, si vous indexez un champ "metadata", le système traitera automatiquement les nouveaux champs imbriqués tels que "metadata.version2.features.experimental" au fur et à mesure qu'ils apparaissent dans les données entrantes, sans nécessiter de nouvelle configuration de l'index.</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">Rappel des fonctionnalités du Core 2.6.0<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>Pour des informations détaillées sur les changements d'architecture et les fonctionnalités introduites dans la version 2.6.0-RC, voir la <a href="#v260-rc1">note de mise à jour 2.6.0-rc1</a>.</p>
</div>
<h4 id="Architecture-simplification" class="common-anchor-header">Simplification de l'architecture</h4><ul>
<li>Streaming Node (GA) - Gestion centralisée du WAL</li>
<li>WAL natif avec Woodpecker - Suppression de la dépendance Kafka/Pulsar</li>
<li>Coordonnateurs unifiés (MixCoord) ; fusion de l'IndexNode et du DataNode - Réduction de la complexité des composants</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">Recherche et analyse</h4><ul>
<li>RaBitQ Quantification sur 1 bit avec rappel élevé</li>
<li>Correspondance de phrases</li>
<li>MinHash LSH pour la déduplication</li>
<li>Fonctions de classement tenant compte du temps</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">Expérience du développeur</h4><ul>
<li>Fonctions d'intégration pour le flux de travail "données entrantes, données sortantes".</li>
<li>Évolution du schéma en ligne</li>
<li>Prise en charge du vecteur INT8</li>
<li>Tronçonneurs améliorés pour une prise en charge globale des langues</li>
<li>Couche de cache avec chargement paresseux - Traitement des ensembles de données plus grands que la mémoire</li>
</ul>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 18 juin 2025</p>
<table>
<thead>
<tr><th style="text-align:center">Version Milvus</th><th style="text-align:center">Version du SDK Python</th><th style="text-align:center">Version SDK Node.js</th><th style="text-align:center">Version SDK Java</th><th style="text-align:center">Version du SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1 présente une architecture simplifiée, native dans le nuage, conçue pour améliorer l'efficacité opérationnelle, l'utilisation des ressources et le coût total de possession en réduisant la complexité du déploiement. Cette version ajoute de nouvelles fonctionnalités axées sur les performances, la recherche et le développement. Les principales fonctionnalités comprennent la quantification 1 bit haute précision (RaBitQ) et une couche de cache dynamique pour des gains de performance, la détection de quasi-doublons avec MinHash et la correspondance précise des phrases pour une recherche avancée, et des fonctions d'intégration automatisées avec modification du schéma en ligne pour améliorer l'expérience du développeur.</p>
<div class="alert note">
<p>Il s'agit d'une version préliminaire de Milvus 2.6.0. Pour essayer les dernières fonctionnalités, installez cette version dans le cadre d'un nouveau déploiement. La mise à niveau de Milvus v2.5.x ou antérieure vers 2.6.0-rc1 n'est pas prise en charge.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">Modifications de l'architecture<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
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
    </button></h3><p>Depuis la version 2.6, Milvus introduit d'importantes modifications architecturales visant à améliorer les performances, l'évolutivité et la facilité d'utilisation. Pour plus d'informations, voir la <a href="/docs/fr/architecture_overview.md">présentation de l'architecture Milvus</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Nœud de diffusion en continu (GA)</h4><p>Dans les versions précédentes, les données en continu étaient écrites dans le WAL par le proxy et lues par le QueryNode et le DataNode. Cette architecture rendait difficile l'obtention d'un consensus du côté de l'écriture et nécessitait une logique complexe du côté de la lecture. En outre, le délégateur de requêtes était situé dans le QueryNode, ce qui entravait l'évolutivité. Milvus 2.5.0 a introduit le nœud de streaming, qui devient GA dans la version 2.6.0. Ce composant est désormais responsable de toutes les opérations de lecture/écriture WAL au niveau du shard et sert également de délégateur de requête, ce qui résout les problèmes susmentionnés et permet de nouvelles optimisations.</p>
<p><strong>Avis de mise à jour important</strong>: Streaming Node est un changement architectural significatif, donc une mise à niveau directe vers Milvus 2.6.0-rc1 à partir des versions précédentes n'est pas prise en charge.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">WAL natif Woodpecker</h4><p>Milvus s'appuyait auparavant sur des systèmes externes tels que Kafka ou Pulsar pour son WAL. Bien que fonctionnels, ces systèmes ajoutaient une complexité opérationnelle significative et une surcharge de ressources, en particulier pour les déploiements de petite et moyenne taille. Dans Milvus 2.6, ces systèmes sont remplacés par Woodpecker, un système WAL conçu à cet effet et natif pour l'informatique en nuage. Woodpecker est conçu pour le stockage d'objets et prend en charge les modes zéro disque basés sur le stockage local et le stockage d'objets, ce qui simplifie les opérations tout en améliorant les performances et l'évolutivité.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">Fusion du DataNode et de l'IndexNode</h4><p>Dans Milvus 2.6, les tâches telles que le compactage, l'importation en masse, la collecte de statistiques et la construction d'index sont désormais gérées par un planificateur unifié. La fonction de persistance des données précédemment gérée par le DataNode a été déplacée vers le Streaming Node. Pour simplifier le déploiement et la maintenance, l'IndexNode et le DataNode ont été fusionnés en un seul composant DataNode. Ce nœud consolidé exécute désormais toutes ces tâches critiques, réduisant ainsi la complexité opérationnelle et optimisant l'utilisation des ressources.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Fusion des coordinateurs en MixCoord</h4><p>La conception précédente, avec des modules RootCoord, QueryCoord et DataCoord séparés, introduisait une complexité dans la communication entre les modules. Pour simplifier la conception du système, ces composants ont été fusionnés en un seul coordinateur unifié appelé MixCoord. Cette consolidation réduit la complexité de la programmation distribuée en remplaçant la communication basée sur le réseau par des appels de fonctions internes, ce qui permet un fonctionnement plus efficace du système et simplifie le développement et la maintenance.</p>
<h3 id="Key-Features" class="common-anchor-header">Caractéristiques principales<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">Quantification à 1 bit RaBitQ</h4><p>Pour traiter des ensembles de données à grande échelle, la quantification sur 1 bit est une technique efficace pour améliorer l'utilisation des ressources et les performances de recherche. Cependant, les méthodes traditionnelles peuvent avoir un impact négatif sur le rappel. En collaboration avec les auteurs de la recherche originale, Milvus 2.6 introduit RaBitQ, une solution de quantification 1 bit qui maintient une précision de rappel élevée tout en offrant les avantages de la compression 1 bit en termes de ressources et de performances.</p>
<p>Pour plus d'informations, voir <a href="/docs/fr/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">Amélioration de la capacité JSON</h4><p>Milvus 2.6 améliore sa prise en charge du type de données JSON avec les améliorations suivantes :</p>
<ul>
<li><strong>Performance</strong>: L'indexation des chemins JSON est désormais officiellement prise en charge, ce qui permet de créer des index inversés sur des chemins spécifiques au sein des objets JSON (par exemple, <code translate="no">meta.user.location</code>). Cela permet d'éviter les balayages complets des objets et d'améliorer la latence des requêtes avec des filtres complexes.</li>
<li><strong>Fonctionnalité</strong>: Pour prendre en charge une logique de filtrage plus complexe, cette version ajoute la prise en charge des fonctions <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code> et <code translate="no">CAST</code>. Pour l'avenir, notre travail sur la prise en charge de JSON se poursuit. Nous sommes heureux de vous annoncer que les prochaines versions officielles proposeront des fonctionnalités encore plus puissantes, telles que le <strong>déchiquetage JSON</strong> et un <strong>index JSON FLAT</strong>, conçu pour améliorer considérablement les performances sur les données JSON fortement imbriquées.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Amélioration de la fonction Analyseur/Tokéniseur</h4><p>Cette version améliore considérablement les capacités de traitement de texte grâce à plusieurs mises à jour de l'analyseur et du tokenizer :</p>
<ul>
<li>Une nouvelle syntaxe <a href="/docs/fr/analyzer-overview.md#Example-use">Run Analyzer</a> est disponible pour valider les configurations du tokenizer.</li>
<li>Le <a href="/docs/fr/lindera-tokenizer.md">tokenizer Lindera</a> est intégré pour une meilleure prise en charge des langues asiatiques telles que le japonais et le coréen.</li>
<li>La sélection du tokenizer au niveau de la ligne est désormais prise en charge, le <a href="/docs/fr/icu-tokenizer.md">tokenizer</a> polyvalent <a href="/docs/fr/icu-tokenizer.md">ICU</a> étant disponible comme solution de repli pour les scénarios multilingues.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">Entrée et sortie des données avec les fonctions d'intégration</h4><p>Milvus 2.6 introduit une fonction "Entrée et sortie de données" qui simplifie le développement d'applications d'IA en s'intégrant directement aux modèles d'intégration tiers (par exemple, OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face). Les utilisateurs peuvent désormais insérer et interroger des données textuelles brutes, et Milvus appellera automatiquement le service de modèle spécifié pour convertir le texte en vecteurs en temps réel. Il n'est donc plus nécessaire de disposer d'un pipeline de conversion vectorielle distinct.</p>
<p>Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/embedding-function-overview.md">Vue d'ensemble de la fonction d'intégration</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">Correspondance de phrases</h4><p>La correspondance de phrases est une fonction de recherche de texte qui renvoie des résultats uniquement lorsque la séquence exacte de mots d'une requête apparaît consécutivement et dans le bon ordre dans un document.</p>
<p><strong>Caractéristiques principales</strong>:</p>
<ul>
<li>Sensible à l'ordre : Les mots doivent apparaître dans le même ordre que dans la requête.</li>
<li>Correspondance consécutive : Les mots doivent apparaître l'un à côté de l'autre, à moins qu'une valeur d'inclinaison ne soit utilisée.</li>
<li>Slop (facultatif) : Paramètre ajustable qui autorise un petit nombre de mots intermédiaires, ce qui permet une correspondance floue entre les phrases.</li>
</ul>
<p>Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/phrase-match.md">Correspondance de phrases</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">Index MinHash LSH (Beta)</h4><p>Pour répondre au besoin de déduplication des données dans la formation des modèles, Milvus 2.6 ajoute la prise en charge des index MINHASH_LSH. Cette fonctionnalité fournit une méthode efficace en termes de calcul et évolutive pour estimer la similarité de Jaccard entre les documents afin d'identifier les quasi-doublons. Les utilisateurs peuvent générer des signatures MinHash pour leurs documents texte lors du prétraitement et utiliser l'index MINHASH_LSH dans Milvus pour trouver efficacement des contenus similaires dans des ensembles de données à grande échelle, améliorant ainsi le nettoyage des données et la qualité des modèles.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">Fonctions de désintégration tenant compte du temps</h4><p>Milvus 2.6 introduit des fonctions de décroissance tenant compte du temps pour traiter les scénarios dans lesquels la valeur des informations change au fil du temps. Lors du reclassement des résultats, les utilisateurs peuvent appliquer des fonctions de décroissance exponentielle, gaussienne ou linéaire basées sur un champ d'horodatage pour ajuster le score de pertinence d'un document. Cela permet de donner la priorité aux contenus les plus récents, ce qui est essentiel pour des applications telles que les fils d'actualité, le commerce électronique et la mémoire d'un agent d'intelligence artificielle.</p>
<p>Pour plus d'informations, reportez-vous à la page <a href="/docs/fr/decay-ranker-overview.md">Decay Ranker Overview</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Ajout d'un champ pour l'évolution du schéma en ligne</h4><p>Pour offrir une plus grande souplesse de schéma, Milvus 2.6 prend désormais en charge l'ajout d'un nouveau champ scalaire au schéma d'une collection existante en ligne. Cela évite de devoir créer une nouvelle collection et d'effectuer une migration de données perturbatrice lorsque les exigences de l'application changent.</p>
<p>Pour plus d'informations, voir <a href="/docs/fr/add-fields-to-an-existing-collection.md">Ajouter des champs à une collection existante</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">Prise en charge des vecteurs INT8</h4><p>En réponse à l'utilisation croissante de modèles quantifiés qui produisent des incorporations d'entiers de 8 bits, Milvus 2.6 ajoute la prise en charge native des types de données pour les vecteurs INT8. Cela permet aux utilisateurs d'ingérer ces vecteurs directement sans déquantification, ce qui permet d'économiser des coûts de calcul, de bande passante de réseau et de stockage. Cette fonctionnalité est initialement prise en charge pour les index de la famille HNSW.</p>
<p>Pour plus d'informations, voir <a href="/docs/fr/dense-vector.md">Vecteur dense</a>.</p>
