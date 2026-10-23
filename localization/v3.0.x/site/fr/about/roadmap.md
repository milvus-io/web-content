---
id: roadmap.md
title: Feuille de route de Milvus
related_key: Milvus roadmap
summary: >-
  Découvrez la feuille de route de Milvus concernant la recherche, l'analyse,
  l'évolution des schémas, l'intégration des lacs de données et les performances
  dans les versions 3.0 et 3.1.
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
    </button></h1><p>Milvus 3.0 combine la recherche multivectorielle, les requêtes de type SQL, des schémas flexibles et l'accès aux données stockées dans un lac de données. Les prochaines étapes s'appuieront sur ces fondements pour proposer des requêtes plus riches, des modèles de données plus étendus, ainsi que des améliorations en termes de performances et d'évolutivité. Cette feuille de route présente les priorités pour Milvus open source.</p>
<p>Milvus 3.0 est disponible au grand public à partir de <strong>la version 3.0.1</strong>. Les fonctionnalités publiées ci-dessous ont été introduites dans <strong>la version 3.0.0</strong>; les fonctionnalités en avant-première et celles disponibles sur inscription sont indiquées lorsqu’elles apparaissent. La série <strong>3.0.x</strong> étend ces fonctionnalités, tandis que la version <strong>3.1 est prévue pour décembre 2026</strong>. Les fonctionnalités prévues et les dates cibles sont susceptibles d’évoluer au fur et à mesure de l’avancement du développement.</p>
<h2 id="Search-and-retrieval" class="common-anchor-header">Recherche et extraction<button data-href="#Search-and-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>La feuille de route relative à l’extraction se concentre sur la combinaison d’un plus grand nombre de signaux de pertinence au sein de Milvus, allant de la correspondance de texte et des représentations multivectorielles au reclassement et aux facettes des résultats de recherche.</p>
<p><strong>Disponible dans la version 3.0</strong></p>
<ul>
<li><strong>Récupération multivectorielle :</strong> la recherche StructArray prend en charge Muvera et Lemur, avec l’ <code translate="no">element_filter</code> pour le filtrage au niveau des éléments. Les politiques de correspondance incluent <code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> et <code translate="no">MATCH_EXACT</code>.</li>
<li><strong>Correspondance et similarité de texte :</strong> des dictionnaires personnalisés et des synonymes permettent d’adapter la recherche de texte aux besoins de l’application. Le filtrage par expressions régulières prend en charge la correspondance de motifs, et MinHash permet la détection des quasi-duplicatas.</li>
<li><strong>Réclassement et inférence :</strong> Milvus 3.0 introduit un premier ensemble de fonctionnalités de réclassement par « chaîne de fonctions », ainsi que le fournisseur d’inférence Hugging Face. Les autres fonctionnalités de la « chaîne de fonctions » sont prévues pour la version 3.0.x.</li>
<li><strong>Agrégation des résultats de recherche :</strong> l’agrégation des résultats de recherche permet d’appliquer des facettes aux résultats de recherche.</li>
</ul>
<p><strong>Prévu pour la version 3.0.x</strong></p>
<p>La série 3.0.x devrait inclure la correspondance approximative et les statistiques globales, ainsi que la prise en charge complète de Function Chain.</p>
<p><strong>Prévu pour la version 3.1</strong></p>
<p>Les projets incluent la recherche basée sur Grep, une intégration plus étroite de la recherche par voisin le plus proche approximatif (ANN) et du filtrage via la fusion ANN-filtre, ainsi que des améliorations de la recherche sur des données clairsemées.</p>
<h2 id="Analytics-and-SQL-style-querying" class="common-anchor-header">Analyses et requêtes de type SQL<button data-href="#Analytics-and-SQL-style-querying" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus étend son moteur de requêtes afin que les applications puissent trier et agréger les données parallèlement à la recherche. La prochaine étape ajoutera les jointures, les vues matérialisées et les calculs personnalisés.</p>
<p><strong>Disponible dans la version 3.0</strong></p>
<p>Les requêtes et la recherche prennent en charge le tri avec l’option « <code translate="no">ORDER BY</code> ». L’agrégation de requêtes ajoute l’option « <code translate="no">GROUP BY</code> » pour le calcul de statistiques groupées.</p>
<p><strong>Prévu pour la version 3.1</strong></p>
<ul>
<li><strong>Requêtes plus riches :</strong> introduction des jointures, à commencer par les semi-jointures, et des collections de vues matérialisées.</li>
<li><strong>Mises à jour et intégrité des données :</strong> prise en charge des mises à jour sur place et de la déduplication des clés primaires lors de l’ingestion.</li>
<li><strong>Itération des requêtes et sémantique JSON :</strong> ajout d’un itérateur de requêtes avec état, de l’ <code translate="no">GROUP BY</code> JSON et de la sémantique SQL/JSON NULL.</li>
<li><strong>Calculs personnalisés :</strong> prise en charge des fonctions définies par l’utilisateur (UDF) en Python.</li>
</ul>
<h2 id="Flexible-schema-and-data-types" class="common-anchor-header">Schéma et types de données flexibles<button data-href="#Flexible-schema-and-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Les travaux sur le schéma se concentrent sur l’évolution des collections existantes et la représentation d’un éventail plus large de données. Ils couvrent les modifications de champs, les structures multi-vecteurs, les textes longs et l’expiration des entités.</p>
<p><strong>Disponible dans la version 3.0</strong></p>
<ul>
<li><strong>Modifications de schéma en ligne :</strong> les collections existantes prennent en charge l’ajout de champs en ligne, y compris les champs vectoriels et d’ <code translate="no">Array&lt;Struct&gt;</code>. La suppression de champs est disponible en <strong>préversion</strong> et peut présenter des limitations.</li>
<li><strong>Rétro-remplissage des données existantes :</strong> le rétro-remplissage externe utilise le connecteur Spark. Le rétro-remplissage interne associe une fonction BM25 ou MinHash à une collection et calcule son résultat sur les données existantes.</li>
<li><strong>Données de type texte et multi-vecteur :</strong> le type « <code translate="no">TEXT</code> » stocke du texte long, tandis que StructArray prend en charge la récupération en interaction différée via <code translate="no">MAX_SIM</code>. L’utilisation de « <code translate="no">TEXT</code> » nécessite l’activation de Storage V3.</li>
<li><strong>Valeurs NULL et expiration :</strong> les champs vectoriels acceptent les valeurs NULL, et la durée de vie (TTL) au niveau de l’entité contrôle l’expiration.</li>
</ul>
<p><strong>Prévu pour la version 3.0.x</strong></p>
<p>Les améliorations de schéma prévues étendent la prise en charge de StructArray aux types, aux valeurs NULL, ainsi qu’à l’ajout et à la suppression de champs. Elles ajoutent également la prise en charge des formules moléculaires et des filtres « <code translate="no">IS NULL</code> » / « <code translate="no">IS NOT NULL</code> » pour les champs vectoriels.</p>
<p><strong>Prévu pour la version 3.1</strong></p>
<p>Les prochaines extensions du modèle de données incluront le JSON et Struct imbriqués, les clés primaires composites, les collections sans champs vectoriels et les vecteurs clairsemés dans StructList.</p>
<h2 id="Lake-integration-and-data-versioning" class="common-anchor-header">Intégration aux lacs de données et gestion des versions des données<button data-href="#Lake-integration-and-data-versioning" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus développe une intégration plus étroite avec le stockage de type « lake » et le traitement par lots. Les collections externes permettent d’accéder aux données là où elles se trouvent, tandis que les instantanés constituent la base de la gestion des versions des données.</p>
<p><strong>Disponible dans la version 3.0</strong></p>
<ul>
<li><strong>Accès aux données externes :</strong> External Collection prend en charge les données au format Lance, Parquet et Iceberg.</li>
<li><strong>Instantanés et intégration par lots :</strong> les instantanés capturent une version des données de la collection, et le connecteur Spark prend en charge les workflows par lots.</li>
<li><strong>Base de stockage :</strong> Storage V3 (Loon) offre une prise en charge optionnelle de Vortex et Lance. Elle est désactivée par défaut et s'active via <code translate="no">common.storage.useLoonFFI</code>. Les instantanés et l'<code translate="no">TEXT</code> t tous deux tributaires de cette fonctionnalité.</li>
</ul>
<p><strong>Prévu pour la version 3.0.x</strong></p>
<p>Les améliorations prévues permettront à un instantané de collecte Milvus de servir de collection externe. La prise en charge des tables externes s’étendra également au découpage JSON, à l’ajout de champs de fonction et à la suppression de champs.</p>
<p><strong>Prévu pour la version 3.1</strong></p>
<p>Les projets prévoient des index clairsemés et scalaires basés sur S3, ainsi que la suppression via l’importation.</p>
<h2 id="Performance-indexing-and-scale" class="common-anchor-header">Performances, indexation et évolutivité<button data-href="#Performance-indexing-and-scale" class="anchor-icon" translate="no">
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
    </button></h2><p>La feuille de route relative aux performances couvre les index de récupération, l’exécution des requêtes et la croissance du cluster. Elle aborde également la récupération et les requêtes nécessitant la lecture de données à partir d’un stockage d’objets.</p>
<p><strong>Disponible dans la version 3.0</strong></p>
<ul>
<li><strong>Indexation clairsemée :</strong> la refonte de l’indexation clairsemée introduit SINDI.</li>
<li><strong>Choix d’index :</strong> l’index de transit « <code translate="no">FAISS</code> » accepte les chaînes de l’index-factory Faiss, avec des options telles que SVS, Panorama, PQ, IVFPQ et ScaNN. L’indexation DiskANN est également disponible pour l’intégration de listes (EmbList).</li>
<li><strong>Compactage :</strong> la fonction « Force Merge » offre un contrôle explicite sur la fusion des segments.</li>
</ul>
<p><strong>Prévu pour la version 3.1</strong></p>
<ul>
<li><strong>Requêtes tenant compte du stockage :</strong> ajout du pushdown de prédicats pour Vortex, y compris l’élagage au niveau des pages et les index de saut.</li>
<li><strong>Croissance des clusters et multi-locataires :</strong> prise en charge du fractionnement des shards, des clés de partitionnement personnalisées et des optimisations pour le multi-locataires.</li>
<li><strong>Exécution des requêtes et indexation :</strong> développement de QueryView, amélioration de la prise en charge des collections étendues, réduction des résultats en flux et prise en charge de plusieurs index.</li>
<li><strong>Fiabilité des écritures :</strong> prise en charge des écritures idempotentes.</li>
<li><strong>Mise en cache du stockage d’objets :</strong> utilisation de Talon comme cache S3 pour améliorer la reprise après défaillance et les performances des requêtes « froides ».</li>
</ul>
<h2 id="Beyond-31" class="common-anchor-header">Au-delà de la version 3.1<button data-href="#Beyond-31" class="anchor-icon" translate="no">
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
    </button></h2><p>Les travaux à plus long terme incluent le « time-travel » et la restauration à partir d’un instantané. Leur portée et leur calendrier de sortie restent à confirmer.</p>
<h2 id="Help-shape-the-roadmap" class="common-anchor-header">Contribuez à définir la feuille de route<button data-href="#Help-shape-the-roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>Partagez les charges de travail, les contraintes et les demandes de fonctionnalités qui comptent pour vos applications dans <a href="https://github.com/milvus-io/milvus/discussions">les discussions GitHub</a>. Signalez les bogues via <a href="https://github.com/milvus-io/milvus/issues">les tickets GitHub</a>.</p>
<p>Pour contribuer au code ou à la documentation, commencez par consulter le <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">Guide du contributeur</a>.</p>
