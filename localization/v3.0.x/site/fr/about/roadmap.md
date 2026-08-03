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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="common-anchor-header">🌌 Vers la base de données multimodale de nouvelle génération et Vector Lakebase<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Feuille de route des produits Milvus</strong></p>
<p>Bienvenue sur la feuille de route de Milvus !</p>
<p>Nous faisons entrer Milvus dans une nouvelle ère : celle de la base de données multimodale de nouvelle génération, <strong>couvrant aussi bien les données structurées que non structurées, la recherche en temps réel que l’analyse hors ligne, et les performances d’un cluster unique que</strong> <strong>l’architecture</strong> <strong>globale</strong> <strong>de Vector Lakebase.</strong></p>
<p>Cette feuille de route présente les objectifs principaux de <strong>Milvus v3.0 (bêta publique)</strong> et de <strong>Milvus v3.1 (développement à long terme)</strong>, ainsi que le plan d’évolution de <strong>Zilliz Vector Lakebase</strong>.</p>
<h2 id="🌠-Milvus-v30-Public-Beta" class="common-anchor-header">🌠 Milvus v3.0 (bêta publique)<button data-href="#🌠-Milvus-v30-Public-Beta" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Bêta publique : mai 2026</strong></p>
<p>Objectif : développer un <strong>moteur de requête sémantique natif</strong> avec tri, agrégation et recherche multivectorielle intégrés, ainsi que la <strong>base « lake-native » de Zilliz Vector Lakebase</strong> afin que le calcul puisse accéder aux données sans migration.</p>
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
    </button></h3><h4 id="🔹-Schema--Data-Type-Evolution" class="common-anchor-header">🔹 <strong>Évolution du schéma et des types de données</strong></h4><ul>
<li>Prise en charge des commandes ALTER COLLECTION ADD COLUMN et DROP COLUMN à l’exécution, sans reconstruction des index ni interruption du service.</li>
<li>Fournit <strong>deux méthodes de remplissage</strong> pour les nouvelles colonnes : externe via Spark Connector, et interne avec des vecteurs clairsemés BM25 générés automatiquement au moment de l’écriture.</li>
<li>Introduction <strong>de TEXT</strong> en tant que type de données à part entière, permettant de stocker le texte d’origine aux côtés des vecteurs, avec prise en charge de BM25 et de la correspondance de texte.</li>
</ul>
<h4 id="🔹-Query-Execution-Overhaul" class="common-anchor-header">🔹 <strong>Refonte de l’exécution</strong> <strong>des requêtes</strong> </h4><ul>
<li>Intégration de la fonction « <strong>Order By</strong> » dans le moteur avec tri par segment et tri par fusion entre les nœuds de requête.</li>
<li>Ajout <strong>d’agrégations</strong> <strong>de requêtes</strong> de type SQL (GROUP BY avec COUNT, SUM, AVG, MIN, MAX) calculées dans le noyau.</li>
<li>Introduction <strong>de facettes de recherche</strong> sur les résultats ANN avec des statistiques par compartiment et des sous-facettes imbriquées côté serveur.</li>
<li>Prise en charge <strong>des dictionnaires personnalisés</strong> et des tables de synonymes enregistrés au niveau du cluster pour améliorer le rappel des caractères CJK et spécifique à un domaine.</li>
</ul>
<h4 id="🔹-Multi-Vector--Late-Interaction-Support" class="common-anchor-header">🔹 <strong>Prise en charge des vecteurs multiples et des interactions tardives</strong></h4><ul>
<li>Introduction <strong>de StructList</strong> pour représenter une entité sous la forme d’une seule ligne comportant plusieurs vecteurs, avec prise en charge native des interactions tardives (ColBERT, ColPali) via MAX_SIM.</li>
<li>Prise en charge de <strong>la recherche au niveau des éléments et des entités</strong> sur les champs StructList, avec des politiques de correspondance configurables pour les résultats au niveau des entités.</li>
<li>Ajout de trois <strong>stratégies de recherche multi-vecteurs</strong>: TokenANN (exhaustive), Muvera (basée sur la projection, sans apprentissage) et Lemur (compression apprise).</li>
</ul>
<h4 id="🔹-Retrieval--Index-Overhaul" class="common-anchor-header">🔹 <strong>Refonte de la recherche et de l’index</strong></h4><ul>
<li>Refonte de <strong>l’index inversé creux</strong> avec compression par blocs, quantification des poids et format persistant ; introduction <strong>de SINDI</strong> comme algorithme IP creux par défaut.</li>
<li>Extension de la couverture de l’index avec l’ensemble <strong>de la famille Faiss</strong> (SVS, Panorama, PQ, IVFPQ, ScaNN) et <strong>MinHash DIDO</strong> pour la détection des quasi-duplicatas.</li>
<li>Prise en charge <strong>des champs vectoriels pouvant être nuls</strong> pour les plongements asynchrones et les modalités manquantes, avec filtrage automatique au moment de la recherche.</li>
</ul>
<h4 id="🔹-Vector-Lakebase-Storage--Compute-Architecture" class="common-anchor-header">🔹 <strong>Architecture de stockage et de calcul vectoriel de Lakebase</strong></h4><ul>
<li>Introduction <strong>d’External Collection</strong> pour indexer et interroger les données sur place dans S3 / GCS / Azure, avec prise en charge des formats de table Lance, Parquet, Iceberg et Vortex.</li>
<li>Ajout de <strong>Vortex</strong>, un format en colonnes ouvert, et <strong>de Loon (Storage V3)</strong>, une couche de stockage au format mixte permettant des lectures ponctuelles efficaces à partir d’un stockage objet.</li>
<li>Prise en charge <strong>des instantanés à un moment donné</strong> avec isolation de type MVCC pour le traitement par lots, tandis que le service continue d’écrire.</li>
<li>Intégration en tant que <strong>Spark DataSource v2</strong> pour lire et écrire directement dans Milvus au sein des pipelines Spark / Databricks / EMR.</li>
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
    </button></h2><p><strong>Calendrier : fin 2026 et au-delà</strong></p>
<p>Priorités : <strong>intelligence de stockage</strong>, <strong>intégrité du chemin d’écriture</strong>, <strong>extensibilité de calcul</strong> et <strong>interopérabilité</strong> <strong>étendue</strong> <strong>avec Vector Lakebase</strong>.</p>
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
    </button></h3><h4 id="🔹-Storage--Write-Path" class="common-anchor-header">🔹 <strong>Stockage et chemin d’écriture</strong></h4><ul>
<li>Ajout <strong>de la descente de prédicats</strong> avec élagage par index de page et filtre de Bloom au niveau de la couche de stockage.</li>
<li>Mise en œuvre de <strong>la déduplication par clé primaire</strong> lors de l’ingestion pour éviter les doublons au moment de l’écriture.</li>
</ul>
<h4 id="🔹-Compute--Elasticity" class="common-anchor-header">🔹 <strong>Calcul et élasticité</strong></h4><ul>
<li>Prise en charge <strong>des fonctions définies par l’utilisateur (UDF)</strong> pour l’exécution de logiques personnalisées dans le moteur, au niveau du plan de données.</li>
<li>Activer <strong>le fractionnement des shards</strong> pour les rediviser à mesure que les données augmentent, avec prise en charge des clés de partitionnement personnalisées.</li>
</ul>
<h4 id="🔹-Spark--Vector-Lakebase-Expansion" class="common-anchor-header">🔹 <strong>Spark et</strong> <strong>extension</strong> de <strong>Vector Lakebase</strong> </h4><ul>
<li>Étendre le connecteur Spark avec une bibliothèque plus riche <strong>d’opérateurs batch natifs</strong>.</li>
<li>Ajout de fonctionnalités <strong>liées au format des tables</strong>, notamment le « time-travel », l’évolution du schéma et la restauration d’instantanés.</li>
<li>Étendre l’interopérabilité de Vector Lakebase avec <strong>des index externes mis à jour en temps réel (CDC)</strong>, la prise en charge d’Apache Paimon et des formats de données supplémentaires.</li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Construisons ensemble l’avenir de Milvus<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus est un projet open source porté par une communauté mondiale de développeurs. Nous invitons tous les membres de la communauté à contribuer à façonner la base de données multimodale de nouvelle génération :</p>
<ul>
<li><p>💬 <strong>Partagez vos commentaires</strong>: proposez de nouvelles fonctionnalités ou des idées d’optimisation sur <a href="https://github.com/milvus-io/milvus/discussions">GitHub Discussions</a>.</p></li>
<li><p>🐛 <strong>Signaler des problèmes</strong>: signalez les bugs via <a href="https://github.com/milvus-io/milvus/issues">GitHub Issues</a>.</p></li>
<li><p>🔧 <strong>Contribuez au code</strong>: soumettez des pull requests et participez au développement des fonctionnalités principales.</p>
<ul>
<li><strong>Pull requests</strong>: contribuez directement à notre <a href="https://github.com/milvus-io/milvus/pulls">base de code</a>. Que ce soit pour corriger des bugs, ajouter des fonctionnalités ou améliorer la documentation, vos contributions sont les bienvenues.</li>
<li><strong>Guide de développement</strong>: consultez notre <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">Guide du contributeur</a> pour connaître les consignes relatives aux contributions au code.</li>
</ul></li>
<li><p>🗣️ <strong>Participez à la conversation</strong>: posez des questions et rencontrez les responsables du projet sur <a href="https://milvus.io/discord">Discord</a>, lors <a href="https://meetings.hubspot.com/chloe-williams1/milvus-meeting">des « Milvus Office Hours</a> » ou sur <a href="https://milvus.io/community">l’ensemble des canaux communautaires</a>.</p></li>
<li><p>⭐ <strong>Faites passer le mot</strong>: partagez les bonnes pratiques et les exemples de réussite, et suivez Milvus sur <a href="https://twitter.com/milvusio">X</a>, <a href="https://www.linkedin.com/company/the-milvus-project/">LinkedIn</a> et <a href="https://www.youtube.com/c/MilvusVectorDatabase">YouTube</a>.</p></li>
</ul>
<p>👉 <strong>GitHub :</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
