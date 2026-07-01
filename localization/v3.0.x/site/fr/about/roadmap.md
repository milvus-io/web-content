---
id: roadmap.md
title: Feuille de route de Milvus
related_key: Milvus roadmap
summary: >-
  Milvus est une base de données vectorielle open source conçue pour alimenter
  des applications d'IA. Voici notre feuille de route, qui guide notre
  développement.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Feuille de route de Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 Vers une base de données multimodale et un lac de données de nouvelle génération<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Feuille de route du produit Milvus</strong></p>
<p>Bienvenue sur la feuille de route de Milvus !</p>
<p>Nous faisons entrer Milvus dans une nouvelle ère : celle de la base de données multimodale de nouvelle génération, couvrant <strong>aussi bien les données structurées que non structurées</strong>, <strong>la recherche en temps réel que l’analyse hors ligne</strong>, et <strong>les performances d’un cluster unique que l’architecture d’un lac de données mondial</strong>.</p>
<p>Cette feuille de route présente les objectifs principaux de <strong>Milvus v2.6 (en cours de développement)</strong>, <strong>Milvus v3.0 (prévu pour fin 2026)</strong> et <strong>Milvus v3.1 (développement à long terme)</strong>, ainsi que le plan d’évolution de <strong>Vector Lake (lac de données / Loon)</strong>.</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6 (en cours de développement)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Calendrier : mi-2025 – fin 2025</strong></p>
<p>Priorités : <strong>mise à niveau du modèle de données</strong>, <strong>refonte de l’architecture de streaming</strong>, <strong>mise en place de capacités de hiérarchisation des données « chaudes » et « froides »</strong>, et lancement du <strong>prototype de Vector Lake (v0.1)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Points clés<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header">🔹 <strong>Mise à niveau du modèle de données</strong></h4><ul>
<li><p>Introduction d’un type de données unifié <strong>Tensor / StructList</strong> pour prendre en charge les structures d’embedding multi-vecteurs, permettant ainsi la compatibilité avec <em>ColBERT</em>, <em>CoLQwen</em>, <em>les vidéos</em> et <em>les vecteurs multimodaux</em>.</p></li>
<li><p>Ajout de la prise en charge <strong>des données géographiques</strong>, notamment les points, les régions et l’indexation spatiale (basée sur <em>libspatial</em>), afin d’étendre les cas d’utilisation dans les services de localisation (LBS) et les systèmes d’information géographique (SIG).</p></li>
<li><p>Prise en charge du type de données « <strong>Timestamp with Timezone</strong> ».</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header">🔹 <strong>Refactorisation de l’architecture StreamNode</strong></h4><ul>
<li><p>Réécriture du pipeline d’ingestion en continu afin d’optimiser les écritures incrémentielles et les calculs en temps réel.</p></li>
<li><p>Amélioration significative des performances et de la stabilité en matière de concurrence, jetant ainsi les bases d’un traitement unifié en temps réel et hors ligne.</p></li>
<li><p>Introduction d’un nouveau moteur de file d’attente de messages : <strong>Woodpecker</strong>.</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header">🔹 <strong>Hiérarchisation des données « chaudes » et « froides » et architecture de stockage (StorageV2)</strong></h4><ul>
<li><p>Prise en charge de deux formats de stockage : <strong>Parquet</strong> et <strong>Vortex</strong>, améliorant la concurrence et l’efficacité mémoire.</p></li>
<li><p>Mettre en œuvre un stockage à plusieurs niveaux avec séparation automatique des données « chaudes » et « froides » et planification intelligente.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹 <strong>Prototype de Vector Lake (v0.1)</strong></h4><ul>
<li><p>Intégration avec <strong>Spark</strong> / <strong>DuckDB</strong> / <strong>DataFusion</strong> via FFI, permettant l’évolution hors ligne des schémas et les requêtes KNN.</p></li>
<li><p>Fournit une visualisation multimodale des données et une démo ETL Spark, établissant ainsi l’architecture de base du lac de données.</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Early-2026" class="common-anchor-header">🌠 Milvus v3.0 (prévu pour début 2026)<button data-href="#🌠-Milvus-v30-Targeted-for-Early-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Calendrier : fin 2025 – début 2026</strong></p>
<p>Objectif : améliorations complètes de <strong>l’expérience de recherche</strong>, de <strong>la flexibilité des schémas</strong> et de <strong>la prise en charge des données non structurées</strong>, ainsi que la sortie de <strong>Vector Lake (v0.2)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Points forts<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header">🔹 <strong>Refonte de l’expérience de recherche</strong></h4><ul>
<li><p>Introduction de la recherche par similarité <strong>« More Like This » (MLT)</strong> avec prise en charge des recherches par position ou par exemples négatifs.</p></li>
<li><p>Ajout de fonctionnalités de recherche sémantique telles que <strong>la mise en évidence</strong> et <strong>la mise en avant</strong>.</p></li>
<li><p>Prise en charge <strong>des dictionnaires personnalisés</strong> et <strong>des tables de synonymes</strong>, permettant la définition de règles lexicales et sémantiques au niveau de la couche d’analyse.</p></li>
<li><p>Introduction de fonctionnalités <strong>d’agrégation</strong> pour les requêtes.</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹 <strong>Multitenance et gestion des ressources</strong></h4><ul>
<li><p>Activer la suppression multi-locataires, les statistiques et la hiérarchisation des niveaux « chauds » et « froids ».</p></li>
<li><p>Améliorer l’isolation des ressources et les stratégies de planification pour prendre en charge des millions de tables dans un seul cluster.</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header">🔹 <strong>Améliorations du schéma et de la clé primaire</strong></h4><ul>
<li><p>Mettre en œuvre <strong>la déduplication globale des clés primaires (Global PK Dedup)</strong> pour garantir la cohérence et l’unicité des données.</p></li>
<li><p>Prise en charge <strong>d’une gestion flexible des schémas</strong> (ajout/suppression de colonnes, remplissage des sauvegardes).</p></li>
<li><p>Autoriser <strong>les valeurs NULL</strong> dans les champs vectoriels.</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header">🔹 <strong>Extension des types de données non structurées (BLOB / Texte)</strong></h4><ul>
<li><p>Introduire le <strong>type BLOB</strong>, qui offre un stockage et un référencement natifs pour les données binaires telles que les fichiers, les images et les vidéos.</p></li>
<li><p>Introduire <strong>le type TEXT</strong>, qui offre des capacités améliorées de recherche en texte intégral et basée sur le contenu.</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header">🔹 <strong>Fonctionnalités de niveau entreprise</strong></h4><ul>
<li><p>Prise en charge de <strong>la sauvegarde et de la restauration basées sur des instantanés</strong>.</p></li>
<li><p>Fournit <strong>un traçage de bout en bout</strong> et <strong>la journalisation d’audit</strong>.</p></li>
<li><p>Mise en œuvre <strong>d’une haute disponibilité (HA) en mode actif-passif</strong> sur les déploiements multi-clusters.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹 <strong>Vector Lake (v0.2)</strong></h4><ul>
<li><p>Prise en charge <strong>du stockage TEXT / BLOB</strong> et <strong>de la gestion des instantanés multiversions</strong>.</p></li>
<li><p>Intégration de Spark pour les tâches d’indexation hors ligne, de regroupement, de déduplication et de réduction de dimensionnalité.</p></li>
<li><p>Proposer <strong>des démonstrations de requêtes « à froid » et de benchmarks hors ligne avec ChatPDF</strong>.</p></li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">🪐 Milvus v3.1 (vision à long terme)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Calendrier : mi-2026</strong></p>
<p>Priorités : <strong>fonctions définies par l’utilisateur (UDF)</strong>, <strong>intégration du calcul distribué</strong>, <strong>optimisation des requêtes scalaires</strong>, <strong>partitionnement dynamique</strong> et lancement officiel de <strong>Vector Lake (v1.0)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Points forts<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹 <strong>Écosystème des fonctions définies par l’utilisateur (UDF) et du calcul distribué</strong></h4><ul>
<li><p>Prise en charge <strong>des fonctions définies par l’utilisateur (UDF)</strong>, permettant aux développeurs d’intégrer une logique personnalisée dans les workflows de récupération et de calcul.</p></li>
<li><p>Intégration poussée avec <strong>Ray Dataset / Daft</strong> pour l’exécution distribuée des UDF et le traitement des données multimodales.</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header">🔹 <strong>Évolution des requêtes scalaires et du format local</strong></h4><ul>
<li><p>Optimisation des performances de filtrage et d’agrégation pour les champs scalaires.</p></li>
<li><p>Amélioration de l’évaluation des expressions et de l’exécution accélérée par index.</p></li>
<li><p>Prise en charge <strong>des mises à jour sur place</strong> pour les formats de fichiers locaux.</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹 <strong>Fonctionnalités de recherche avancées</strong></h4><ul>
<li><p>Ajout des fonctionnalités suivantes : requêtes <strong>RankBy</strong>, <strong>OrderBy</strong>, <strong>Facet</strong> et <strong>de correspondance approximative</strong>.</p></li>
<li><p>Améliorer la recherche de texte grâce à la prise en charge de :</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹 <strong>Le partitionnement dynamique et l'évolutivité</strong></h4><ul>
<li><p>Activer <strong>le fractionnement automatique des shards</strong> et <strong>l'équilibrage de charge</strong> pour une évolutivité transparente.</p></li>
<li><p>Améliorer <strong>la création d’index globaux</strong> et garantir <strong>les performances de recherche distribuée</strong>.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹 <strong>Vector Lake V1.0</strong></h4><ul>
<li><p>Intégration poussée avec <strong>Ray / Daft / PyTorch</strong> pour prendre en charge les fonctions définies par l'utilisateur (UDF) distribuées et les cas d'utilisation de l'ingénierie contextuelle.</p></li>
<li><p>Proposez <strong>des démos RAG (Retrieval-Augmented Generation)</strong> <strong>et l’importation depuis des tables Iceberg</strong>.</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Construire ensemble l’avenir de Milvus<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus est un projet open source porté par une communauté mondiale de développeurs.</p>
<p>Nous invitons chaleureusement tous les membres de la communauté à contribuer à façonner la base de données multimodale de nouvelle génération :</p>
<ul>
<li><p>💬 <strong>Partagez vos commentaires</strong>: proposez de nouvelles fonctionnalités ou des idées d’optimisation</p></li>
<li><p>🐛 <strong>Signaler des problèmes</strong>: signaler des bugs via GitHub Issues</p></li>
<li><p>🔧 <strong>Contribuez au code</strong>: soumettez des pull requests et aidez à développer les fonctionnalités principales</p>
<ul>
<li><p><strong>Pull requests</strong>: contribuez directement à notre <a href="https://github.com/milvus-io/milvus/pulls">base de code</a>. Qu'il s'agisse de corriger des bugs, d'ajouter des fonctionnalités ou d'améliorer la documentation, vos contributions sont les bienvenues.</p></li>
<li><p><strong>Guide de développement</strong>: consultez notre <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Guide du contributeur</a> pour connaître les consignes relatives aux contributions au code.</p></li>
</ul></li>
<li><p>⭐ <strong>Faites passer le mot</strong>: partagez les bonnes pratiques et les exemples de réussite</p></li>
</ul>
<p>👉 <strong>GitHub :</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
