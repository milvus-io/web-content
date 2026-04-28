---
id: roadmap.md
title: Feuille de route Milvus
related_key: Milvus roadmap
summary: >-
  Milvus est une base de données vectorielles open-source conçue pour alimenter
  les applications d'IA. Voici notre feuille de route pour guider notre
  développement.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Feuille de route Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 Vers la base de données multimodale et le lac de données de la prochaine génération<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
<p>Bienvenue dans la feuille de route de Milvus !</p>
<p>Nous faisons entrer Milvus dans une nouvelle ère, celle de la base de données multimodale de nouvelle génération, qui couvre les <strong>données structurées et non structurées</strong>, l'<strong>extraction en temps réel et l'analyse hors ligne</strong>, et les <strong>performances d'un cluster unique et d'une architecture de lac de données globale</strong>.</p>
<p>Cette feuille de route présente les objectifs fondamentaux de <strong>Milvus v2.6 (en cours)</strong>, <strong>Milvus v3.0 (prévu pour fin 2026)</strong> et <strong>Milvus v3.1 (développement à long terme)</strong>, ainsi que le plan d'évolution de <strong>Vector Lake (lac de données / Loon)</strong>.</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6 (en cours)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Calendrier : Mi-2025 - Fin 2025</strong></p>
<p>Focus : <strong>Mise à niveau du modèle de données</strong>, <strong>refactorisation de l'architecture de streaming</strong>, <strong>construction de capacités de tiering chaud/froid</strong>, et lancement du <strong>prototype Vector Lake (v0.1)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Faits marquants<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
<li><p>Introduction d'un type de données unifié <strong>Tensor / StructList</strong> pour prendre en charge les structures d'intégration multi-vecteurs, permettant la compatibilité avec <em>ColBERT</em>, <em>CoLQwen</em>, la <em>vidéo</em> et les <em>vecteurs multimodaux</em>.</p></li>
<li><p>Ajout de la prise en charge des <strong>données géographiques</strong>, y compris les points, les régions et l'indexation spatiale (basée sur <em>libspatial</em>), afin d'étendre les cas d'utilisation dans LBS et GIS.</p></li>
<li><p>Prise en charge de l'<strong>horodatage avec le</strong> type de données <strong>Timezone</strong>.</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header"><strong>🔹 Refonte de l'architecture StreamNode</strong></h4><ul>
<li><p>Réécriture du pipeline d'ingestion de flux pour optimiser les écritures incrémentales et le calcul en temps réel.</p></li>
<li><p>Amélioration significative des performances et de la stabilité en matière de concurrence, jetant les bases d'un traitement unifié en temps réel et hors ligne.</p></li>
<li><p>Introduction d'un nouveau moteur de file d'attente de messages : <strong>Woodpecker</strong>.</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header"><strong>Architecture de stockage et de hiérarchisation à chaud et à froid (StorageV2)</strong></h4><ul>
<li><p>Prise en charge de deux formats de stockage : <strong>Parquet</strong> et <strong>Vortex</strong>, améliorant la concurrence et l'efficacité de la mémoire.</p></li>
<li><p>Mise en œuvre d'un stockage hiérarchisé avec séparation automatique des données chaudes/froides et planification intelligente.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header"><strong>Prototype de lac vectoriel (v0.1)</strong></h4><ul>
<li><p>Intégrer avec <strong>Spark</strong> / <strong>DuckDB</strong> / <strong>DataFusion</strong> via FFI, permettant l'évolution du schéma hors ligne et les requêtes KNN.</p></li>
<li><p>Fournir une visualisation multimodale des données et une démo ETL Spark, établissant l'architecture fondamentale du lac de données.</p></li>
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
    </button></h2><p><strong>Calendrier : Fin 2025 - début 2026</strong></p>
<p>Focus : Améliorations complètes de l'<strong>expérience de recherche</strong>, de la <strong>flexibilité des schémas</strong> et de la <strong>prise en charge des données non structurées</strong>, ainsi que la publication de <strong>Vector Lake (v0.2)</strong>.</p>
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header"><strong>🔹 Refonte de l'expérience de recherche</strong></h4><ul>
<li><p>Introduction de la recherche de similarité <strong>More Like This (MLT)</strong> avec prise en charge des recherches avec position ou exemples négatifs.</p></li>
<li><p>Ajout de fonctionnalités de recherche sémantique telles que la <strong>mise en évidence</strong> et le <strong>renforcement</strong>.</p></li>
<li><p>Prise en charge des <strong>dictionnaires personnalisés</strong> et des <strong>tables de synonymes</strong>, permettant la définition de règles lexicales et sémantiques au niveau de l'analyseur.</p></li>
<li><p>Introduire des capacités d'<strong>agrégation</strong> pour les requêtes.</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹 <strong>Multi-locataires et gestion des ressources</strong></h4><ul>
<li><p>Permettre la suppression, les statistiques et la hiérarchisation à chaud et à froid pour les utilisateurs multiples.</p></li>
<li><p>Améliorer l'isolation des ressources et les stratégies de planification pour prendre en charge des millions de tables dans un seul cluster.</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header"><strong>🔹 Amélioration des schémas et des clés primaires</strong></h4><ul>
<li><p>Mise en œuvre de la <strong>déduplication globale des clés primaires (Global PK Dedup)</strong> pour garantir la cohérence et l'unicité des données.</p></li>
<li><p>Prise en charge d'une <strong>gestion flexible des schémas</strong> (ajout/suppression de colonnes, remplissage des sauvegardes).</p></li>
<li><p>Autoriser les <strong>valeurs NULL</strong> dans les champs vectoriels.</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header"><strong>Types de données non structurées étendus (BLOB / Texte)</strong></h4><ul>
<li><p>Introduction du <strong>type BLOB</strong>, qui fournit un stockage et un référencement natifs pour les données binaires telles que les fichiers, les images et les vidéos.</p></li>
<li><p>Introduire le <strong>type TEXT</strong>, qui offre des capacités améliorées de recherche en texte intégral et de recherche basée sur le contenu.</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header">🔹 <strong>Capacités d'entreprise</strong></h4><ul>
<li><p>Prise en charge de la <strong>sauvegarde et de la restauration basées sur des instantanés</strong>.</p></li>
<li><p>Fournir un <strong>traçage de bout en bout</strong> et une <strong>journalisation d'audit</strong>.</p></li>
<li><p>Mise en œuvre de la <strong>haute disponibilité (HA)</strong> en <strong>mode actif-standby</strong> dans les déploiements multi-clusters.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹 <strong>Vector Lake (v0.2)</strong></h4><ul>
<li><p>Prise en charge du <strong>stockage TEXT / BLOB</strong> et de la <strong>gestion des instantanés multi-version</strong>.</p></li>
<li><p>Intégration de Spark pour l'indexation hors ligne, le clustering, la déduplication et les tâches de réduction de la dimensionnalité.</p></li>
<li><p>Fournir des <strong>démonstrations de ChatPDF pour les requêtes à froid et les benchmarks hors ligne</strong>.</p></li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">Milvus v3.1 (vision à long terme)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Calendrier : Mi-2026</strong></p>
<p>Focus : <strong>Fonctions définies par l'utilisateur (UDF)</strong>, <strong>intégration de l'informatique distribuée</strong>, <strong>optimisation des requêtes scalaires</strong>, <strong>sharding dynamique</strong> et sortie officielle de <strong>Vector Lake (v1.0)</strong>.</p>
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹 <strong>Écosystème UDF et informatique distribuée</strong></h4><ul>
<li><p>Prise en charge des <strong>fonctions définies par l'utilisateur (UDF</strong>), permettant aux développeurs d'injecter une logique personnalisée dans les flux de travail d'extraction et de calcul.</p></li>
<li><p>Intégration approfondie avec <strong>Ray Dataset / Daft</strong> pour l'exécution distribuée des UDF et le traitement multimodal des données.</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header"><strong>🔹 Requête scalaire et évolution du format local</strong></h4><ul>
<li><p>Optimisation des performances de filtrage et d'agrégation pour les champs scalaires.</p></li>
<li><p>Amélioration de l'évaluation des expressions et de l'exécution accélérée par l'index.</p></li>
<li><p>Prise en charge des <strong>mises à jour sur place</strong> pour les formats de fichiers locaux.</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹 <strong>Capacités de recherche avancée</strong></h4><ul>
<li><p>Ajout des fonctionnalités suivantes : Requêtes <strong>RankBy</strong>, <strong>OrderBy</strong>, <strong>Facet</strong> et <strong>Fuzzy match</strong>.</p></li>
<li><p>Améliorez la recherche de texte en prenant en charge :</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹 <strong>Dynamic Sharding &amp; Scalability (partage dynamique et évolutivité</strong>)</h4><ul>
<li><p>Permet le <strong>fractionnement automatique des fichiers</strong> et l'<strong>équilibrage de la charge</strong> pour une mise à l'échelle transparente.</p></li>
<li><p>Améliorez la <strong>création d'index globaux</strong> et garantissez les <strong>performances de la recherche distribuée</strong>.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹 <strong>Vector Lake V1.0</strong></h4><ul>
<li><p>Intégration approfondie avec <strong>Ray / Daft / PyTorch</strong> pour prendre en charge les UDF distribués et les cas d'utilisation de l'ingénierie contextuelle.</p></li>
<li><p>Fournit des <strong>démonstrations RAG (Retrieval-Augmented Generation)</strong> <strong>et l'importation de tables Iceberg</strong>.</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Co-construire l'avenir de Milvus<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus est un projet open-source mené par une communauté mondiale de développeurs.</p>
<p>Nous invitons chaleureusement tous les membres de la communauté à contribuer à façonner la base de données multimodale de nouvelle génération :</p>
<ul>
<li><p><strong>💬 Partagez vos commentaires</strong>: Proposer de nouvelles fonctionnalités ou des idées d'optimisation</p></li>
<li><p>🐛 S <strong>ignaler des problèmes</strong>: Déposer des bogues via GitHub Issues</p></li>
<li><p>🔧 <strong>Contribuer au code</strong>: Soumettre des PRs et aider à construire des fonctionnalités de base</p>
<ul>
<li><p><strong>Pull requests</strong>: Contribuez directement à notre <a href="https://github.com/milvus-io/milvus/pulls">base de code</a>. Qu'il s'agisse de corriger des bogues, d'ajouter des fonctionnalités ou d'améliorer la documentation, vos contributions sont les bienvenues.</p></li>
<li><p><strong>Guide de développement</strong>: Consultez notre <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Guide du contributeur</a> pour connaître les directives relatives aux contributions au code.</p></li>
</ul></li>
<li><p><strong>⭐ Faites passer le message</strong>: partagez les meilleures pratiques et les réussites.</p></li>
</ul>
<p>👉 <strong>GitHub :</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
