---
id: overview.md
title: Qu'est-ce que Milvus ?
related_key: Milvus Overview
summary: >-
  Milvus est une base de données vectorielle hautement performante et évolutive
  qui fonctionne efficacement dans un large éventail d'environnements, de
  l'ordinateur portable aux systèmes distribués à grande échelle. Elle est
  disponible à la fois sous forme de logiciel open source et de service cloud.
---
<h1 id="What-is-Milvus" class="common-anchor-header">Qu'est-ce que le Milvus ?<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><span>Milvus <span style="display: inline-block; vertical-align: middle;">
<audio id="milvus-audio" style="display: none;">
<source src="https://en-audio.howtopronounce.com/15783806805e142d8844912.mp3" type="audio/mp3" />
</audio>
<span style="
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('https://milvus.io/docs/v2.6.x/assets/hearing.png') no-repeat center center;
    background-size: contain;
    cursor: pointer;
    margin-left: 4px;
  " onclick="document.getElementById('milvus-audio').play()"></span>
</span></span> est un oiseau de proie appartenant au genre Milvus de la famille des Accipitridés, réputé pour sa vitesse en vol, sa vue perçante et sa remarquable capacité d'adaptation.</p>
<style>
  audio::-webkit-media-controls {
    display: none !important;
  }
</style>
<p>Zilliz a choisi le nom de Milvus pour sa base de données vectorielle open source, hautement performante et évolutive, qui fonctionne efficacement dans un large éventail d’environnements, de l’ordinateur portable aux systèmes distribués à grande échelle. Elle est disponible à la fois sous forme de logiciel open source et de service cloud.</p>
<p>Développé par Zilliz et bientôt cédé à la LF AI &amp; Data Foundation, sous l’égide de la Linux Foundation, Milvus est devenu l’un des principaux projets mondiaux de bases de données vectorielles open source. Il est distribué sous licence Apache 2.0, et la plupart de ses contributeurs sont des experts issus de la communauté du calcul haute performance (HPC), spécialisés dans la construction de systèmes à grande échelle et l’optimisation de code tenant compte des capacités matérielles. Parmi les principaux contributeurs figurent des professionnels de Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba et Microsoft.</p>
<p>Il est intéressant de noter que chaque projet open source de Zilliz porte le nom d’un oiseau, une convention de nommage qui symbolise la liberté, la clairvoyance et l’évolution agile de la technologie.</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">Données non structurées, représentations vectorielles et Milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Les données non structurées, telles que le texte, les images et l’audio, présentent des formats variés et recèlent une sémantique sous-jacente riche, ce qui rend leur analyse difficile. Pour gérer cette complexité, on utilise des représentations vectorielles afin de convertir les données non structurées en vecteurs numériques qui en capturent les caractéristiques essentielles. Ces vecteurs sont ensuite stockés dans une base de données vectorielle, permettant ainsi des recherches et des analyses rapides et évolutives.</p>
<p>Milvus offre de solides capacités de modélisation des données, vous permettant d’organiser vos données non structurées ou multimodales en collections structurées. Il prend en charge un large éventail de types de données pour différentes modélisations d’attributs, y compris les types numériques et de caractères courants, divers types de vecteurs, les tableaux, les ensembles et le format JSON, vous évitant ainsi d’avoir à gérer plusieurs systèmes de bases de données.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" /> 
   <span>Données non structurées, représentations vectorielles et Milvus</span>
  
 </span></p>
<p>Milvus propose trois modes de déploiement, couvrant une large gamme d’échelles de données — du prototypage local dans Jupyter Notebooks aux clusters Kubernetes massifs gérant des dizaines de milliards de vecteurs :</p>
<ul>
<li>Milvus Lite est une bibliothèque Python qui s’intègre facilement à vos applications. En tant que version allégée de Milvus, elle est idéale pour le prototypage rapide dans Jupyter Notebooks ou pour une exécution sur des périphériques en périphérie disposant de ressources limitées. <a href="/docs/fr/milvus_lite.md">En savoir plus</a>.</li>
<li>Milvus Standalone est un déploiement serveur sur une seule machine, tous les composants étant regroupés dans une seule image Docker pour faciliter le déploiement. <a href="/docs/fr/install_standalone-docker.md">En savoir plus</a>.</li>
<li>Milvus Distributed peut être déployé sur des clusters Kubernetes. Il dispose d’une architecture cloud native conçue pour des scénarios à l’échelle du milliard, voire au-delà. Cette architecture garantit la redondance des composants critiques. <a href="/docs/fr/install_cluster-milvusoperator.md">En savoir plus</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">Pourquoi Milvus est-il si rapide ?<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus a été conçu dès le départ pour être un système de base de données vectorielle hautement efficace. Dans la plupart des cas, Milvus surpasse les autres bases de données vectorielles de 2 à 5 fois (voir les résultats de VectorDBBench). Ces hautes performances sont le fruit de plusieurs choix de conception clés :</p>
<p><strong>Optimisation adaptée au matériel</strong>: afin de permettre à Milvus de s’adapter à divers environnements matériels, nous avons optimisé ses performances spécifiquement pour de nombreuses architectures et plateformes matérielles, notamment AVX512, SIMD, les GPU et les SSD NVMe.</p>
<p><strong>Algorithmes de recherche avancés</strong>: Milvus prend en charge un large éventail d’algorithmes d’indexation et de recherche en mémoire et sur disque, notamment IVF, HNSW, DiskANN et bien d’autres, qui ont tous été profondément optimisés. Par rapport à des implémentations courantes telles que FAISS et HNSWLib, Milvus offre des performances supérieures de 30 % à 70 %.</p>
<p><strong>Moteur de recherche en C++</strong>: plus de 80 % des performances d’une base de données vectorielle dépendent de son moteur de recherche. Milvus utilise le C++ pour ce composant essentiel en raison des hautes performances de ce langage, de ses possibilités d’optimisation de bas niveau et de sa gestion efficace des ressources. Plus important encore, Milvus intègre de nombreuses optimisations de code adaptées au matériel, allant de la vectorisation au niveau de l’assembleur à la parallélisation multithread et à la planification, afin d’exploiter pleinement les capacités du matériel.</p>
<p><strong>Orienté colonnes</strong>: Milvus est un système de base de données vectorielle orienté colonnes. Ses principaux avantages découlent des modèles d’accès aux données. Lors de l’exécution de requêtes, une base de données orientée colonnes ne lit que les champs spécifiques concernés par la requête, plutôt que des lignes entières, ce qui réduit considérablement la quantité de données consultées. De plus, les opérations sur des données organisées en colonnes peuvent être facilement vectorisées, ce qui permet de les appliquer à l’ensemble des colonnes en une seule fois, améliorant ainsi encore davantage les performances.</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">Ce qui rend Milvus si évolutif<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>En 2022, Milvus prenait en charge des vecteurs à l’échelle du milliard, et en 2023, il a évolué vers des dizaines de milliards tout en conservant une stabilité constante, prenant en charge des scénarios à grande échelle pour plus de 300 grandes entreprises, notamment Salesforce, PayPal, Shopee, Airbnb, eBay, NVIDIA, IBM, AT&amp;T, LINE, ROBLOX, Inflection, etc.</p>
<p>L’architecture système cloud-native et hautement découplée de Milvus garantit que le système peut s’étendre en continu à mesure que les données augmentent :</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" /> 
   <span>Architecture système hautement découplée de Milvus</span>
  
 </span></p>
<p>Milvus est lui-même entièrement sans état, ce qui permet de le faire évoluer facilement à l’aide de Kubernetes ou de clouds publics. De plus, les composants de Milvus sont bien découplés : les trois tâches les plus critiques — la recherche, l’insertion de données et l’indexation/compactage — sont conçues comme des processus facilement parallélisables, dont la logique complexe est isolée. Cela garantit que les nœuds de requête, de données et d’index correspondants peuvent évoluer à la fois en profondeur et en largeur de manière indépendante, optimisant ainsi les performances et la rentabilité.</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">Types de recherches pris en charge par Milvus<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus prend en charge divers types de fonctions de recherche pour répondre aux exigences de différents cas d’utilisation :</p>
<ul>
<li><a href="/docs/fr/single-vector-search.md#Basic-search">Recherche ANN</a>: trouve les K vecteurs les plus proches de votre vecteur de requête.</li>
<li><a href="/docs/fr/single-vector-search.md#Filtered-search">Recherche avec filtrage</a>: effectue une recherche ANN selon des conditions de filtrage spécifiées.</li>
<li><a href="/docs/fr/single-vector-search.md#Range-search">Recherche par plage</a>: trouve les vecteurs situés dans un rayon spécifié autour de votre vecteur de requête.</li>
<li><a href="/docs/fr/multi-vector-search.md">Recherche hybride</a>: effectue une recherche ANN en fonction de plusieurs champs vectoriels.</li>
<li><a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a>: recherche en texte intégral basée sur l'algorithme BM25.</li>
<li><a href="/docs/fr/weighted-ranker.md">Réclassement</a>: ajuste l'ordre des résultats de recherche en fonction de critères supplémentaires ou d'un algorithme secondaire, affinant ainsi les résultats initiaux de la recherche ANN.</li>
<li><a href="/docs/fr/get-and-scalar-query.md#Get-Entities-by-ID">Récupération</a>: récupère les données à l'aide de leurs clés primaires.</li>
<li><a href="/docs/fr/get-and-scalar-query.md#Use-Basic-Operators">Requête</a>: récupère les données à l'aide d'expressions spécifiques.</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">Ensemble complet de fonctionnalités<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>Outre les fonctionnalités de recherche clés mentionnées ci-dessus, Milvus propose également un ensemble de fonctionnalités développées autour des recherches ANN afin que vous puissiez exploiter pleinement ses capacités.</p>
<h3 id="API-and-SDK" class="common-anchor-header">API et SDK<button data-href="#API-and-SDK" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/api-reference/restful/v2.6.x/About.md">API RESTful</a> (officielle)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.6.x/About.md">PyMilvus</a> (SDK Python) (officiel)</li>
<li><a href="https://milvus.io/api-reference/go/v2.6.x/About.md">SDK Go</a> (officiel)</li>
<li><a href="https://milvus.io/api-reference/java/v2.6.x/About.md">SDK Java</a> (officiel)</li>
<li>SDK<a href="https://milvus.io/api-reference/node/v2.6.x/About.md">Node.js</a> (JavaScript) (officiel)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (fourni par Microsoft)</li>
<li><a href="https://milvus.io/api-reference/cpp/v2.6.x/About.md">SDK C++</a> (officiel)</li>
<li>SDK Rust (en cours de développement)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">Types de données avancés<button data-href="#Advanced-Data-Types" class="anchor-icon" translate="no">
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
    </button></h3><p>Outre les types de données primitifs, Milvus prend en charge divers types de données avancés ainsi que les métriques de distance qui leur sont associées.</p>
<ul>
<li><a href="/docs/fr/sparse_vector.md">Vecteurs creux</a></li>
<li><a href="/docs/fr/index-vector-fields.md">Vecteurs binaires</a></li>
<li><a href="/docs/fr/use-json-fields.md">Prise en charge de JSON</a></li>
<li><a href="/docs/fr/array_data_type.md">Prise en charge des tableaux</a></li>
<li><a href="/docs/fr/geometry-field.md">Géolocalisation</a></li>
<li>Texte (en cours de développement)</li>
</ul>
<h3 id="Why-Milvus" class="common-anchor-header">Pourquoi Milvus ?<button data-href="#Why-Milvus" class="anchor-icon" translate="no">
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
<li><p><strong>Haute performance à grande échelle et haute disponibilité</strong></p>
<p>Milvus dispose d’une <a href="/docs/fr/architecture_overview.md">architecture distribuée</a> qui sépare <a href="/docs/fr/data_processing.md#Data-query">le calcul</a> et <a href="/docs/fr/data_processing.md#Data-insertion">le stockage</a>. Milvus peut évoluer horizontalement et s’adapter à divers modèles de trafic, atteignant ainsi des performances optimales en augmentant indépendamment le nombre de nœuds de requête pour les charges de travail à forte intensité de lecture et le nombre de nœuds de données pour les charges de travail à forte intensité d’écriture. Les microservices sans état sur K8s permettent <a href="/docs/fr/coordinator_ha.md#Coordinator-HA">une reprise rapide</a> en cas de panne, garantissant ainsi une haute disponibilité. La prise en charge des <a href="/docs/fr/replica.md">répliques</a> renforce encore la tolérance aux pannes et le débit en chargeant des segments de données sur plusieurs nœuds de requête. Consultez <a href="https://zilliz.com/vector-database-benchmark-tool">les tests de performance</a> pour comparer les performances.</p></li>
<li><p><strong>Prise en charge de divers types d’index vectoriels et accélération matérielle</strong></p>
<p>Milvus sépare le système du moteur de recherche vectorielle proprement dit, ce qui lui permet de prendre en charge tous les principaux types d’index vectoriels optimisés pour différents scénarios, notamment HNSW, IVF, FLAT (brute-force), SCANN et DiskANN, avec des variantes <a href="/docs/fr/index-explained.md">basées sur la quantification</a> et <a href="/docs/fr/mmap.md">mmap</a>. Milvus optimise la recherche vectorielle pour des fonctionnalités avancées telles que <a href="/docs/fr/boolean.md">le filtrage par métadonnées</a> et <a href="/docs/fr/range-search.md">la recherche par plage</a>. De plus, Milvus met en œuvre une accélération matérielle pour améliorer les performances de la recherche vectorielle et prend en charge l’indexation sur GPU, comme <a href="/docs/fr/gpu-cagra.md">le CAGRA</a> de NVIDIA.</p></li>
<li><p><strong>Multitenance flexible et stockage « chaud »/« froid »</strong></p>
<p>Milvus prend en charge <a href="/docs/fr/multi_tenancy.md#Multi-tenancy-strategies">la multi-location</a> grâce à l’isolation au niveau de la base de données, de la collection, de la partition ou de la clé de partition. Ces stratégies flexibles permettent à un seul cluster de gérer de centaines à des millions de locataires, tout en garantissant des performances de recherche optimisées et un contrôle d’accès flexible. Milvus améliore la rentabilité grâce au stockage « chaud » et « froid ». Les données « chaudes », fréquemment consultées, peuvent être stockées en mémoire ou sur des SSD pour de meilleures performances, tandis que les données « froides », moins consultées, sont conservées sur un stockage plus lent et économique. Ce mécanisme permet de réduire considérablement les coûts tout en maintenant des performances élevées pour les tâches critiques.</p></li>
<li><p><strong>Vecteurs clairsemés pour la recherche en texte intégral et la recherche hybride</strong></p>
<p>Outre la recherche sémantique via des vecteurs denses, Milvus prend également en charge nativement <a href="/docs/fr/full-text-search.md">la recherche en texte intégral</a> avec BM25 ainsi que des représentations clairsemées apprises telles que SPLADE et BGE-M3. Les utilisateurs peuvent stocker des vecteurs clairsemés et des vecteurs denses dans la même collection, et définir des fonctions pour reclasser les résultats issus de plusieurs requêtes de recherche. Voir des exemples de <a href="/docs/fr/full_text_search_with_milvus.md">recherche hybride combinant recherche sémantique et recherche en texte intégral</a>.</p></li>
<li><p><strong>Sécurité des données et contrôle d’accès granulaire</strong></p>
<p>Milvus garantit la sécurité des données grâce à la mise en œuvre <a href="/docs/fr/authenticate.md">d’une authentification obligatoire des utilisateurs</a>, <a href="/docs/fr/tls.md">du chiffrement TLS</a> et <a href="/docs/fr/rbac.md">d’un contrôle d’accès basé sur les rôles (RBAC)</a>. L’authentification des utilisateurs garantit que seuls les utilisateurs autorisés disposant d’identifiants valides peuvent accéder à la base de données, tandis que le chiffrement TLS sécurise toutes les communications au sein du réseau. De plus, le RBAC permet un contrôle d’accès fin en attribuant des autorisations spécifiques aux utilisateurs en fonction de leurs rôles. Ces fonctionnalités font de Milvus un choix robuste et sécurisé pour les applications d’entreprise, protégeant les données sensibles contre tout accès non autorisé et toute violation potentielle.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">Intégrations d’IA<button data-href="#AI-Integrations" class="anchor-icon" translate="no">
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
<li><p>Intégrations de modèles d’embedding
Les modèles d’embedding convertissent les données non structurées en une représentation numérique dans un espace de données à haute dimension, afin que vous puissiez les stocker dans Milvus. Actuellement, PyMilvus, le SDK Python, intègre plusieurs modèles d’embedding afin que vous puissiez rapidement préparer vos données sous forme de vecteurs d’embedding. Pour plus de détails, consultez <a href="/docs/fr/embeddings.md">la présentation de l’embedding</a>.</p></li>
<li><p>Intégrations de modèles de reclassement
Dans le domaine de la recherche d’informations et de l’IA générative, un reclassement est un outil essentiel qui optimise l’ordre des résultats issus des recherches initiales. PyMilvus intègre également plusieurs modèles de reclassement afin d’optimiser l’ordre des résultats renvoyés par les recherches initiales. Pour plus de détails, consultez <a href="/docs/fr/rerankers-overview.md">la présentation des reclassements</a>.</p></li>
<li><p>Intégrations de LangChain et d’autres outils d’IA
À l’ère de l’IA générative (GenAI), des outils tels que LangChain suscitent un vif intérêt chez les développeurs d’applications. En tant que composant central, Milvus sert généralement de magasin de vecteurs dans ces outils. Pour savoir comment intégrer Milvus à vos outils d’IA préférés, consultez nos <a href="/docs/fr/integrate_with_openai.md">sections « Intégrations »</a> et <a href="/docs/fr/build-rag-with-milvus.md">« Tutoriels</a> ».</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">Outils et écosystème<button data-href="#Tools-and-Ecosystem" class="anchor-icon" translate="no">
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
<li><p>Attu
Attu est une interface graphique intuitive tout-en-un qui vous aide à gérer Milvus et les données qu’il stocke. Pour plus de détails, consultez le dépôt <a href="https://github.com/zilliztech/attu">Attu</a>.</p></li>
<li><p>Birdwatcher
Birdwatcher est un outil de débogage pour Milvus. En l’utilisant pour vous connecter à etcd, vous pouvez vérifier l’état de votre système Milvus ou le configurer à la volée. Pour plus de détails, consultez la page <a href="/docs/fr/birdwatcher_overview.md">BirdWatcher</a>.</p></li>
<li><p>Intégrations Prometheus et Grafana
Prometheus est une suite d’outils open source de surveillance et d’alerte pour Kubernetes. Grafana est une suite de visualisation open source capable de se connecter à toutes les sources de données. Vous pouvez utiliser Prometheus et Grafana comme fournisseurs de services de surveillance pour surveiller visuellement les performances de Milvus en mode distribué. Pour plus de détails, consultez <a href="/docs/fr/monitor.md">la section Déploiement des services de surveillance</a>.</p></li>
<li><p>Milvus Backup
Milvus Backup est un outil permettant aux utilisateurs de sauvegarder et de restaurer les données Milvus. Il fournit à la fois une interface en ligne de commande (CLI) et une API afin de s’adapter à différents scénarios d’application. Pour plus de détails, consultez la section <a href="/docs/fr/milvus_backup_overview.md">Milvus Backup</a>.</p></li>
<li><p>Milvus Capture Data Change (CDC)
Milvus CDC permet de répliquer les modifications de données d’un cluster Milvus vers un autre à des fins de reprise après sinistre en mode actif-passif. Pour plus de détails, consultez la section « <a href="/docs/fr/milvus_cdc_overview.md">Milvus CDC</a> ».</p></li>
<li><p>Connecteurs Milvus
Milvus a prévu un ensemble de connecteurs pour vous permettre d’intégrer de manière transparente Milvus à des outils tiers, tels qu’Apache Spark. Actuellement, vous pouvez utiliser notre connecteur Spark pour transmettre vos données Milvus à Apache Spark en vue d’un traitement par apprentissage automatique. Pour plus de détails, consultez la section « <a href="/docs/fr/integrate_with_spark.md">Connecteur Spark-Milvus</a> ».</p></li>
<li><p>Services de transmission vectorielle (VTS)
Milvus fournit un ensemble d’outils vous permettant de transférer vos données entre une instance Milvus et diverses sources de données, notamment les clusters Zilliz, Elasticsearch, Postgres (PgVector) et une autre instance Milvus. Pour plus de détails, consultez la documentation sur <a href="https://github.com/zilliztech/vts">les VTS</a>.</p></li>
</ul>
