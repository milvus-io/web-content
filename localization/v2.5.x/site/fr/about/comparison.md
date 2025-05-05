---
id: comparison.md
title: Comparaison
summary: Cet article compare Milvus à d'autres solutions de recherche vectorielle.
---
<h1 id="Comparing-Milvus-with-Alternatives" class="common-anchor-header">Comparaison de Milvus avec des alternatives<button data-href="#Comparing-Milvus-with-Alternatives" class="anchor-icon" translate="no">
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
    </button></h1><p>Lorsque vous étudiez les différentes options de bases de données vectorielles, ce guide complet vous aidera à comprendre les caractéristiques uniques de Milvus et vous permettra de choisir la base de données qui répond le mieux à vos besoins spécifiques. Notamment, Milvus est une base de données vectorielles open-source de premier plan et <a href="https://zilliz.com/cloud">Zilliz Cloud</a> propose un service Milvus entièrement géré. Pour évaluer objectivement Milvus par rapport à ses concurrents, envisagez d'utiliser des <a href="https://github.com/zilliztech/VectorDBBench#quick-start">outils de benchmark</a> pour analyser les mesures de performance.</p>
<h2 id="Milvus-highlights" class="common-anchor-header">Points forts de Milvus<button data-href="#Milvus-highlights" class="anchor-icon" translate="no">
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
<li><p><strong>Fonctionnalité</strong>: Milvus va au-delà de la recherche de similarités vectorielles de base en prenant en charge des fonctionnalités avancées telles que les <a href="https://milvus.io/docs/sparse_vector.md">vecteurs épars</a>, les <a href="https://milvus.io/docs/sparse_vector.md">vecteurs</a> <a href="https://milvus.io/docs/single-vector-search.md#Bulk-vector-search">en vrac</a>, la <a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">recherche filtrée</a> et les capacités de <a href="https://milvus.io/docs/multi-vector-search.md">recherche hybrides</a>.</p></li>
<li><p><strong>Flexibilité</strong>: Milvus s'adapte à différents modes de déploiement et à de multiples SDK, le tout dans un écosystème robuste et intégré.</p></li>
<li><p><strong>Performance</strong>: Milvus garantit un traitement en temps réel avec un débit élevé et une faible latence, grâce à des algorithmes d'indexation optimisés tels que <a href="https://milvus.io/docs/index.md#HNSW">HNSW</a> et <a href="https://milvus.io/docs/disk_index.md">DiskANN</a>, et à une <a href="https://milvus.io/docs/gpu_index.md">accélération GPU</a> avancée.</p></li>
<li><p><strong>Évolutivité</strong>: Son architecture distribuée sur mesure évolue sans effort, s'adaptant aussi bien à de petits ensembles de données qu'à des collections de plus de 10 milliards de vecteurs.</p></li>
</ul>
<h2 id="Overall-comparison" class="common-anchor-header">Comparaison générale<button data-href="#Overall-comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour comparer Milvus et Pinecone, deux solutions de bases de données vectorielles, le tableau suivant est structuré de manière à mettre en évidence les différences entre les diverses fonctionnalités.</p>
<table>
<thead>
<tr><th>Fonctionnalité</th><th>Pinecone</th><th>Milvus</th><th>Remarques</th></tr>
</thead>
<tbody>
<tr><td>Modes de déploiement</td><td>SaaS uniquement</td><td>Milvus Lite, On-prem Standalone &amp; Cluster, Zilliz Cloud Saas &amp; BYOC</td><td>Milvus offre une plus grande flexibilité dans les modes de déploiement.</td></tr>
<tr><td>SDK pris en charge</td><td>Python, JavaScript/TypeScript</td><td>Python, Java, NodeJS, Go, Restful API, C#, Rust</td><td>Milvus prend en charge un plus grand nombre de langages de programmation.</td></tr>
<tr><td>Statut Open-source</td><td>Fermé</td><td>Open-source</td><td>Milvus est une base de données vectorielle open-source populaire.</td></tr>
<tr><td>Évolutivité</td><td>Augmentation/diminution d'échelle uniquement</td><td>Évolution vers l'extérieur et vers l'intérieur et évolution vers l'intérieur et l'extérieur</td><td>Milvus présente une architecture distribuée pour une meilleure évolutivité.</td></tr>
<tr><td>Disponibilité</td><td>Architecture basée sur des pods dans les zones disponibles</td><td>Basculement des zones disponibles et HA interrégionale</td><td>Milvus CDC (Change Data Capture) permet des modes primaire/standby pour une plus grande disponibilité.</td></tr>
<tr><td>Coût de performance (en dollars par million de requêtes)</td><td>À partir de 0,178 $ pour un ensemble de données moyen, 1,222 $ pour un ensemble de données important.</td><td>Zilliz Cloud démarre à 0,148 $ pour un ensemble de données moyen, 0,635 $ pour un ensemble de données important ; une version gratuite est disponible.</td><td>Voir le <a href="https://zilliz.com/vector-database-benchmark-tool?database=ZillizCloud,Milvus,ElasticCloud,PgVector,Pinecone,QdrantCloud,WeaviateCloud&amp;dataset=medium&amp;filter=none,low,high&amp;tab=2">rapport sur le classement des coûts</a>.</td></tr>
<tr><td>Accélération GPU</td><td>Non pris en charge</td><td>Prise en charge du GPU NVIDIA</td><td>L'accélération GPU améliore considérablement les performances, souvent par des ordres de grandeur.</td></tr>
</tbody>
</table>
<h2 id="Terminology-comparison" class="common-anchor-header">Comparaison terminologique<button data-href="#Terminology-comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>Bien que les deux systèmes remplissent des fonctions similaires en tant que bases de données vectorielles, la terminologie spécifique au domaine entre Milvus et Pinecone présente de légères variations. Une comparaison détaillée de la terminologie est présentée ci-dessous.</p>
<table>
<thead>
<tr><th>Pinecone</th><th>Milvus</th><th>Remarques</th></tr>
</thead>
<tbody>
<tr><td>Index</td><td><a href="https://zilliz.com/comparison">Collection</a></td><td>Dans Pinecone, un index sert d'unité d'organisation pour le stockage et la gestion des vecteurs de taille identique, et cet index est étroitement intégré au matériel, connu sous le nom de pods. En revanche, les collections Milvus ont un objectif similaire mais permettent de gérer plusieurs collections au sein d'une même instance.</td></tr>
<tr><td>Collection</td><td><a href="https://milvus.io/docs/milvus_backup_overview.md#Milvus-Backup">Sauvegarde</a></td><td>Dans Pinecone, une collection est essentiellement un instantané statique d'un index, utilisé principalement à des fins de sauvegarde et qui ne peut pas être interrogé. Dans Milvus, la fonction équivalente de création de sauvegardes est plus transparente et porte un nom simple.</td></tr>
<tr><td>Espace de noms</td><td><a href="https://milvus.io/docs/use-partition-key.md#Use-Partition-Key">Clé de partition</a></td><td>Les espaces de noms permettent de partitionner les vecteurs d'un index en sous-ensembles. Milvus propose plusieurs méthodes telles que la partition ou la clé de partition pour garantir une isolation efficace des données au sein d'une collection.</td></tr>
<tr><td>Métadonnées</td><td><a href="https://milvus.io/docs/boolean.md">Champ scalaire</a></td><td>La gestion des métadonnées de Pinecone repose sur des paires clé-valeur, alors que Milvus permet des champs scalaires complexes, y compris des types de données standard et des champs JSON dynamiques.</td></tr>
<tr><td>Requête</td><td><a href="https://milvus.io/docs/single-vector-search.md">Recherche</a></td><td>Nom de la méthode utilisée pour trouver les plus proches voisins d'un vecteur donné, éventuellement avec des filtres supplémentaires.</td></tr>
<tr><td>Non disponible</td><td><a href="https://milvus.io/docs/with-iterators.md">Itérateur</a></td><td>Pinecone ne dispose pas d'une fonction permettant de parcourir tous les vecteurs d'un index. Milvus introduit les méthodes Search Iterator et Query Iterator, améliorant ainsi les capacités de recherche de données à travers les ensembles de données.</td></tr>
</tbody>
</table>
<h2 id="Capability-comparison" class="common-anchor-header">Comparaison des capacités<button data-href="#Capability-comparison" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Capacité</th><th>Pinecone</th><th>Milvus</th></tr>
</thead>
<tbody>
<tr><td>Modes de déploiement</td><td>SaaS uniquement</td><td>Milvus Lite, On-prem Standalone &amp; Cluster, Zilliz Cloud Saas &amp; BYOC</td></tr>
<tr><td>Fonctions d'intégration</td><td>Non disponible</td><td>Prise en charge avec <a href="https://github.com/milvus-io/milvus-model">pymilvus[model]</a></td></tr>
<tr><td>Types de données</td><td>Chaîne, Nombre, Bool, Liste de chaînes</td><td>String, VarChar, Number (Int, Float, Double), Bool, Array, JSON, Float Vector, Binary Vector, BFloat16, Float16, Sparse Vector</td></tr>
<tr><td>Types de métriques et d'indices</td><td>Cos, Dot, Euclidean<br/>Famille P, famille S</td><td>Cosinus, IP (point), L2 (euclidienne), Hamming, Jaccard<br/>FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, HNSW, SCANN, GPU Indexes</td></tr>
<tr><td>Conception des schémas</td><td>Mode flexible</td><td>Mode flexible, mode strict</td></tr>
<tr><td>Champs vectoriels multiples</td><td>N/A</td><td>Recherche multi-vectorielle et hybride</td></tr>
<tr><td>Outils</td><td>Ensembles de données, utilitaires de texte, connecteur Spark</td><td>Attu, Birdwatcher, Backup, CLI, CDC, connecteurs Spark et Kafka</td></tr>
</tbody>
</table>
<h3 id="Key-insights" class="common-anchor-header">Informations clés</h3><ul>
<li><p><strong>Modes de déploiement</strong>: Milvus offre une variété d'options de déploiement, notamment le déploiement local, Docker, Kubernetes sur site, Cloud SaaS et Bring Your Own Cloud (BYOC) pour les entreprises, alors que Pinecone se limite au déploiement SaaS.</p></li>
<li><p><strong>Fonctions d'intégration</strong>: Milvus prend en charge des bibliothèques d'intégration supplémentaires, permettant l'utilisation directe de modèles d'intégration pour transformer les données sources en vecteurs.</p></li>
<li><p><strong>Types de données</strong>: Milvus prend en charge un plus large éventail de types de données que Pinecone, y compris les tableaux et JSON. Pinecone ne prend en charge qu'une structure de métadonnées plate avec des chaînes, des nombres, des booléens ou des listes de chaînes comme valeurs, alors que Milvus peut gérer n'importe quel objet JSON, y compris des structures imbriquées, dans un champ JSON. Pinecone limite la taille des métadonnées à 40 Ko par vecteur.</p></li>
<li><p><strong>Types de métriques et d'index</strong>: Milvus prend en charge un large éventail de types de métriques et d'index pour répondre à divers cas d'utilisation, tandis que Pinecone dispose d'un choix plus limité. Alors qu'un index pour les vecteurs est obligatoire dans Milvus, une option AUTO_INDEX est disponible pour rationaliser le processus de configuration.</p></li>
<li><p><strong>Conception des schémas</strong>: Milvus offre des modes flexibles <code translate="no">create_collection</code> pour la conception des schémas, y compris une configuration rapide avec un schéma dynamique pour une expérience sans schéma similaire à Pinecone et une configuration personnalisée avec des champs de schéma et des index prédéfinis qui s'apparentent à un système de gestion de base de données relationnelle (SGBDR).</p></li>
<li><p><strong>Champs vectoriels multiples</strong>: Milvus permet le stockage de plusieurs champs vectoriels dans une seule collection, qui peut être clairsemée ou dense et dont la dimensionnalité peut varier. Pinecone n'offre pas de fonction comparable.</p></li>
<li><p><strong>Outils</strong>: Milvus offre une sélection plus étendue d'outils pour la gestion et l'utilisation des bases de données, tels que Attu, Birdwatcher, Backup, CLI, CDC et Spark et Kafka connector.</p></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p><strong>Essai</strong>: Faites l'expérience directe de Milvus en commençant par le <a href="https://milvus.io/docs/quickstart.md">quickstart</a> Milvus ou en <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">vous inscrivant à Zilliz Cloud</a>.</p></li>
<li><p><strong>En savoir plus</strong>: Plongez dans les fonctionnalités de Milvus grâce à nos <a href="https://milvus.io/docs/manage-collections.md">guides</a> <a href="/docs/fr/glossary.md">terminologiques</a> et <a href="https://milvus.io/docs/manage-collections.md">utilisateurs</a> complets.</p></li>
<li><p><strong>Explorer les alternatives</strong>: Pour une comparaison plus large des options de bases de données vectorielles, explorez les ressources supplémentaires sur <a href="https://zilliz.com/comparison">cette page.</a></p></li>
</ul>
