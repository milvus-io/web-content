---
id: overview.md
title: Qu'est-ce que Milvus ?
related_key: Milvus Overview
summary: >-
  Milvus est une base de données vectorielle hautement performante et évolutive
  qui fonctionne efficacement dans un large éventail d'environnements, de
  l'ordinateur portable aux systèmes distribués à grande échelle. Elle est
  disponible sous forme de logiciel libre et de service en nuage.
---
<h1 id="What-is-Milvus" class="common-anchor-header">Qu'est-ce que Milvus ?<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus est une base de données vectorielle hautement performante et évolutive qui s'exécute efficacement dans un large éventail d'environnements, de l'ordinateur portable aux systèmes distribués à grande échelle. Elle est disponible à la fois sous forme de logiciel libre et de service en nuage.</p>
<p>Milvus est un projet open-source de LF AI &amp; Data Foundation distribué sous la licence Apache 2.0. La plupart des contributeurs sont des experts de la communauté du calcul haute performance (HPC), spécialisés dans la construction de systèmes à grande échelle et dans l'optimisation de codes tenant compte du matériel. Les principaux contributeurs sont des professionnels de Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba et Microsoft.</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">Données non structurées, Embeddings et Milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Les données non structurées, telles que le texte, les images et le son, varient en termes de format et comportent une sémantique sous-jacente riche, ce qui rend leur analyse difficile. Pour gérer cette complexité, les embeddings sont utilisés pour convertir les données non structurées en vecteurs numériques qui capturent leurs caractéristiques essentielles. Ces vecteurs sont ensuite stockés dans une base de données vectorielle, ce qui permet des recherches et des analyses rapides et évolutives.</p>
<p>Milvus offre de solides capacités de modélisation des données, ce qui vous permet d'organiser vos données non structurées ou multimodales en collections structurées. Il prend en charge un large éventail de types de données pour différentes modélisations d'attributs, notamment les types numériques et de caractères courants, divers types de vecteurs, des tableaux, des ensembles et JSON, ce qui vous évite d'avoir à gérer plusieurs systèmes de base de données.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" />
   </span> <span class="img-wrapper"> <span>Données non structurées, embeddings et Milvus</span> </span></p>
<p>Milvus propose trois modes de déploiement, couvrant un large éventail d'échelles de données, du prototypage local dans les blocs-notes Jupyter aux clusters Kubernetes massifs gérant des dizaines de milliards de vecteurs :</p>
<ul>
<li>Milvus Lite est une bibliothèque Python qui peut être facilement intégrée dans vos applications. En tant que version allégée de Milvus, elle est idéale pour le prototypage rapide dans les blocs-notes Jupyter ou l'exécution sur des dispositifs périphériques avec des ressources limitées. En <a href="/docs/fr/v2.4.x/milvus_lite.md">savoir plus</a>.</li>
<li>Milvus Standalone est un déploiement de serveur sur une seule machine, avec tous les composants regroupés dans une image Docker unique pour un déploiement pratique. <a href="/docs/fr/v2.4.x/install_standalone-docker.md">En savoir plus</a>.</li>
<li>Milvus Distributed peut être déployé sur des clusters Kubernetes, avec une architecture cloud-native conçue pour des scénarios à l'échelle du milliard, voire plus. Cette architecture garantit la redondance des composants critiques. <a href="/docs/fr/v2.4.x/install_cluster-milvusoperator.md">En savoir plus</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">Ce qui rend Milvus si rapide？<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus a été conçu dès le premier jour pour être un système de base de données vectorielle très efficace. Dans la plupart des cas, Milvus surpasse les autres bases de données vectorielles de 2 à 5 fois (voir les résultats de VectorDBBench). Ces performances élevées sont le résultat de plusieurs décisions clés en matière de conception :</p>
<p><strong>Optimisation en fonction du matériel</strong>: Pour adapter Milvus à divers environnements matériels, nous avons optimisé ses performances spécifiquement pour de nombreuses architectures et plateformes matérielles, notamment AVX512, SIMD, GPU et NVMe SSD.</p>
<p><strong>Algorithmes de recherche avancés</strong>: Milvus prend en charge une large gamme d'algorithmes d'indexation/recherche en mémoire et sur disque, notamment IVF, HNSW, DiskANN, et bien d'autres, qui ont tous été profondément optimisés. Comparé à des implémentations populaires comme FAISS et HNSWLib, Milvus offre des performances supérieures de 30 à 70 %.</p>
<p><strong>Moteur de recherche en C++</strong>: Plus de 80 % des performances d'une base de données vectorielle sont déterminées par son moteur de recherche. Milvus utilise C++ pour ce composant critique en raison des performances élevées du langage, de l'optimisation de bas niveau et de la gestion efficace des ressources. Plus important encore, Milvus intègre de nombreuses optimisations de code tenant compte du matériel, allant de la vectorisation au niveau de l'assemblage à la parallélisation et à l'ordonnancement multithread, afin d'exploiter pleinement les capacités du matériel.</p>
<p><strong>Orienté colonnes</strong>: Milvus est un système de base de données vectorielles orienté colonnes. Les principaux avantages proviennent des schémas d'accès aux données. Lors de l'exécution des requêtes, une base de données orientée colonnes ne lit que les champs spécifiques impliqués dans la requête, plutôt que des lignes entières, ce qui réduit considérablement la quantité de données accédées. En outre, les opérations sur les données en colonnes peuvent être facilement vectorisées, ce qui permet d'appliquer des opérations à l'ensemble des colonnes en une seule fois, ce qui améliore encore les performances.</p>
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
    </button></h2><p>En 2022, Milvus a pris en charge des vecteurs à l'échelle du milliard, et en 2023, il est passé à des dizaines de milliards avec une stabilité constante, alimentant des scénarios à grande échelle pour plus de 300 grandes entreprises, notamment Salesforce, PayPal, Shopee, Airbnb, eBay, NVIDIA, IBM, AT&amp;T, LINE, ROBLOX, Inflection, etc.</p>
<p>L'architecture de système hautement découplée et native pour l'informatique en nuage de Milvus garantit que le système peut s'étendre continuellement au fur et à mesure que les données augmentent :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/highly-decoupled-architecture.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" />
   </span> <span class="img-wrapper"> <span>Architecture système hautement découplée de Milvus</span> </span></p>
<p>Milvus lui-même est entièrement sans état, de sorte qu'il peut être facilement mis à l'échelle à l'aide de Kubernetes ou de clouds publics. En outre, les composants de Milvus sont bien découplés, les trois tâches les plus critiques - recherche, insertion de données et indexation/compactage - étant conçues comme des processus facilement parallélisables, avec une logique complexe séparée. Cela garantit que le nœud de requête, le nœud de données et le nœud d'index correspondants peuvent évoluer de manière indépendante, optimisant ainsi les performances et la rentabilité.</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">Types de recherches prises en charge par Milvus<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus prend en charge différents types de fonctions de recherche pour répondre aux exigences des différents cas d'utilisation :</p>
<ul>
<li><a href="/docs/fr/v2.4.x/single-vector-search.md#Basic-search">Recherche ANN</a>: Trouve les K premiers vecteurs les plus proches de votre vecteur d'interrogation.</li>
<li><a href="/docs/fr/v2.4.x/single-vector-search.md#Filtered-search">Recherche par filtrage</a>: Effectue une recherche ANN dans des conditions de filtrage spécifiées.</li>
<li><a href="/docs/fr/v2.4.x/single-vector-search.md#Range-search">Recherche par plage</a>: Recherche les vecteurs situés dans un rayon spécifié par rapport au vecteur de votre requête.</li>
<li><a href="/docs/fr/v2.4.x/multi-vector-search.md">Recherche hybride</a>: Effectue une recherche ANN basée sur plusieurs champs vectoriels.</li>
<li>Recherche par mot-clé : Recherche par mot-clé basée sur BM25.</li>
<li><a href="/docs/fr/v2.4.x/reranking.md">Reranking (reclassement)</a>: Ajuste l'ordre des résultats de la recherche en fonction de critères supplémentaires ou d'un algorithme secondaire, en affinant les résultats initiaux de la recherche ANN.</li>
<li><a href="/docs/fr/v2.4.x/get-and-scalar-query.md#Get-Entities-by-ID">Récupérer</a>: Récupère les données en fonction de leurs clés primaires.</li>
<li><a href="/docs/fr/v2.4.x/get-and-scalar-query.md#Use-Basic-Operators">Requête</a>: Permet d'extraire des données à l'aide d'expressions spécifiques.</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">Un ensemble complet de fonctionnalités<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>Outre les principales fonctionnalités de recherche mentionnées ci-dessus, Milvus fournit également un ensemble de fonctionnalités mises en œuvre autour des recherches ANN afin que vous puissiez utiliser pleinement ses capacités.</p>
<h3 id="API-and-SDK" class="common-anchor-header">API et SDK</h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.4.x/About.md">API RESTful</a> (officielle)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">PyMilvus</a> (SDK Python) (officiel)</li>
<li><a href="https://milvus.io/api-reference/go/v2.4.x/About.md">Go SDK</a> (officiel)</li>
<li><a href="https://milvus.io/api-reference/java/v2.4.x/About.md">SDK Java</a> (officiel)</li>
<li>SDK<a href="https://milvus.io/api-reference/node/v2.4.x/About.md">Node.j</a> s (JavaScript) (officiel)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (contribué par Microsoft)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">Types de données avancés</h3><p>Outre les types de données primitifs, Milvus prend en charge divers types de données avancés et leurs métriques de distance respectives.</p>
<ul>
<li><a href="/docs/fr/v2.4.x/sparse_vector.md">Vecteurs épars</a></li>
<li><a href="/docs/fr/v2.4.x/index-vector-fields.md">Vecteurs binaires</a></li>
<li><a href="/docs/fr/v2.4.x/use-json-fields.md">Prise en charge JSON</a></li>
<li><a href="/docs/fr/v2.4.x/array_data_type.md">Prise en charge des tableaux</a></li>
<li><a href="/docs/fr/v2.4.x/metric.md">Mesures de distance</a></li>
</ul>
<h3 id="Acceleration" class="common-anchor-header">Accélération</h3><ul>
<li><p>Algorithmes de recherche Milvus prend en charge un ensemble d'algorithmes d'indexation et de recherche paramétrables. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/index.md">Index en mémoire</a>, <a href="/docs/fr/v2.4.x/disk_index.md">Index sur disque</a> et <a href="/docs/fr/v2.4.x/gpu_index.md">Index GPU</a>.</p></li>
<li><p>Partitions et clés de partition Les partitions sont des sous-divisions d'une collection Milvus. Vous pouvez choisir un champ scalaire comme clé de partition pour améliorer les performances de recherche. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/manage-partitions.md">Gérer les partitions</a> et <a href="/docs/fr/v2.4.x/use-partition-key.md">Utiliser la clé de partition</a>.</p></li>
<li><p>Modèle de cohérence réglable La cohérence garantit que chaque nœud ou réplica Milvus a la même vue des données lorsqu'il écrit ou lit des données à un moment donné. Vous pouvez facilement régler le niveau de cohérence lorsque vous effectuez des recherches ANN dans Milvus. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/consistency.md">Cohérence</a>.</p></li>
<li><p>Importation de données à haut débit Pour importer un grand volume de données dans Milvus au lieu de les insérer l'une après l'autre, envisagez d'utiliser nos outils d'importation de données à haut débit. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/prepare-source-data.md">Préparer les données sources</a> et <a href="/docs/fr/v2.4.x/import-data.md">Importer les données</a>.</p></li>
<li><p>Prise en charge de la multi-tenance Milvus a mis en œuvre de nombreuses fonctionnalités orientées vers les scénarios de multi-tenance, y compris la clé de partition, la clé de clustering, etc. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/multi_tenancy.md">Stratégies multi-tenant</a>.</p></li>
</ul>
<h3 id="Security-and-Authorization" class="common-anchor-header">Sécurité et autorisation</h3><ul>
<li><p>Modèle de cohérence réglable La cohérence garantit que chaque nœud ou réplica Milvus a la même vue des données lorsqu'il écrit ou lit des données à un moment donné. Vous pouvez facilement régler le niveau de cohérence lorsque vous effectuez des recherches ANN dans Milvus. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/consistency.md">Cohérence</a>.</p></li>
<li><p>Isolation des données et contrôle des ressources Dans les scénarios de multi-location, l'isolation des données est l'exigence de base en matière de sécurité. Milvus met en œuvre plusieurs fonctionnalités pour résoudre vos problèmes de sécurité. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/resource_group.md">Gestion des groupes de ressources</a> et <a href="/docs/fr/v2.4.x/clustering-compaction.md">Compaction du clustering</a>.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">Intégrations AI</h3><ul>
<li><p>Intégrations de modèles d'intégration Les modèles d'intégration convertissent les données non structurées en leur représentation numérique dans un espace de données à haute dimension afin que vous puissiez les stocker dans Milvus. Actuellement, PyMilvus, le SDK Python, intègre plusieurs modèles d'intégration afin que vous puissiez rapidement préparer vos données en intégrations vectorielles. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/embeddings.md">Vue d'ensemble de l'intégration</a>.</p></li>
<li><p>Intégrations de modèles de reranking Dans le domaine de la recherche d'informations et de l'IA générative, un reranker est un outil essentiel qui optimise l'ordre des résultats des recherches initiales. PyMilvus intègre également plusieurs modèles de reclassement afin d'optimiser l'ordre des résultats renvoyés par les recherches initiales. Pour plus de détails, reportez-vous à la section <a href="/docs/fr/v2.4.x/rerankers-overview.md">Vue d'ensemble des modèles de reclassement</a>.</p></li>
<li><p>LangChain et autres intégrations d'outils d'IA À l'ère de la GenAI, les outils tels que LangChain suscitent beaucoup d'attention de la part des développeurs d'applications. En tant que composant de base, Milvus sert généralement de magasin de vecteurs dans ces outils. Pour savoir comment intégrer Milvus dans vos outils d'IA préférés, reportez-vous à nos <a href="/docs/fr/v2.4.x/integrate_with_openai.md">intégrations</a> et <a href="/docs/fr/v2.4.x/build-rag-with-milvus.md">tutoriels</a>.</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">Outils et écosystème</h3><ul>
<li><p>Attu Attu est une interface graphique intuitive tout-en-un qui vous aide à gérer Milvus et les données qu'il stocke. Pour plus de détails, consultez le référentiel <a href="https://github.com/zilliztech/attu">Attu</a>.</p></li>
<li><p>Birdwatcher Birdwatcher est un outil de débogage pour Milvus. En l'utilisant pour se connecter à etcd, vous pouvez vérifier l'état de votre système Milvus ou le configurer à la volée. Pour plus d'informations, reportez-vous à <a href="/docs/fr/v2.4.x/birdwatcher_overview.md">BirdWatcher</a>.</p></li>
<li><p>Intégrations Promethus &amp; Grafana Prometheus est une boîte à outils open-source de surveillance des systèmes et d'alerte pour Kubernetes. Grafana est une pile de visualisation open-source qui peut se connecter à toutes les sources de données. Vous pouvez utiliser Promethus &amp; Grafana en tant que fournisseur de services de surveillance pour surveiller visuellement les performances de Milvus distribué. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/monitor.md">Déploiement des services de surveillance</a>.</p></li>
<li><p>Milvus Backup Milvus Backup est un outil qui permet aux utilisateurs de sauvegarder et de restaurer les données Milvus. Il fournit à la fois une CLI et une API pour s'adapter à différents scénarios d'application. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>.</p></li>
<li><p>Milvus Capture Data Change (CDC) Milvus-CDC peut capturer et synchroniser des données incrémentielles dans les instances Milvus et garantit la fiabilité des données d'entreprise en les transférant de manière transparente entre les instances source et cible, ce qui facilite la sauvegarde incrémentielle et la reprise après sinistre. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/milvus-cdc-overview.md">Milvus CDC</a>.</p></li>
<li><p>Connecteurs Milvus Milvus a prévu un ensemble de connecteurs pour vous permettre d'intégrer Milvus de manière transparente à des outils tiers, tels qu'Apache Spark. Actuellement, vous pouvez utiliser notre connecteur Spark pour alimenter vos données Milvus vers Apache Spark en vue d'un traitement d'apprentissage automatique. Pour plus d'informations, reportez-vous à <a href="/docs/fr/v2.4.x/integrate_with_spark.md">Spark-Milvus Connector</a>.</p></li>
<li><p>Vector Transmission Services (VTS) Milvus fournit un ensemble d'outils vous permettant de transférer vos données entre une instance Milvus et un ensemble de sources de données, y compris les clusters Zilliz, Elasticsearch, Postgres (PgVector) et une autre instance Milvus. Pour plus de détails, voir <a href="https://github.com/zilliztech/vts">VTS</a>.</p></li>
</ul>
