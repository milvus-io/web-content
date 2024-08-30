---
id: install-overview.md
summary: >-
  Milvus est une base de données vectorielle hautement performante et évolutive.
  Elle prend en charge des cas d'utilisation de tailles très diverses, depuis
  les démonstrations s'exécutant localement dans des blocs-notes Jupyter
  jusqu'aux clusters Kubernetes à grande échelle gérant des dizaines de
  milliards de vecteurs. Il existe actuellement trois options de déploiement de
  Milvus : Milvus Lite, Milvus Standalone et Milvus Distributed.
title: Aperçu des options de déploiement de Milvus
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Aperçu des options de déploiement de Milvus<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus est une base de données vectorielle hautement performante et évolutive. Elle prend en charge des cas d'utilisation de tailles très diverses, depuis les démonstrations s'exécutant localement dans des blocs-notes Jupyter jusqu'aux clusters Kubernetes à grande échelle gérant des dizaines de milliards de vecteurs. Il existe actuellement trois options de déploiement de Milvus : Milvus Lite, Milvus Standalone et Milvus Distributed.</p>
<h2 id="Milvus-Lite" class="common-anchor-header">Milvus Lite<button data-href="#Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> est une bibliothèque Python qui peut être importée dans vos applications. En tant que version légère de Milvus, elle est idéale pour le prototypage rapide dans les blocs-notes Jupyter ou l'exécution sur des appareils intelligents avec des ressources limitées. Milvus Lite prend en charge les mêmes API que les autres déploiements Milvus. Le code côté client interagissant avec Milvus Lite peut également fonctionner avec les instances Milvus dans d'autres modes de déploiement.</p>
<p>Pour intégrer Milvus Lite dans vos applications, exécutez <code translate="no">pip install pymilvus</code> pour l'installer et utilisez l'instruction <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> pour instancier une base de données vectorielle avec un fichier local qui conserve toutes vos données. Pour plus de détails, voir <a href="https://milvus.io/docs/milvus_lite.md">Exécuter Milvus Lite</a>.</p>
<h2 id="Milvus-Standalone" class="common-anchor-header">Milvus Standalone<button data-href="#Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standalone est un déploiement de serveur sur une seule machine. Tous les composants de Milvus Standalone sont regroupés dans une seule <a href="https://milvus.io/docs/install_standalone-docker.md">image Docker</a>, ce qui facilite le déploiement. Si vous avez une charge de travail de production mais préférez ne pas utiliser Kubernetes, l'exécution de Milvus Standalone sur une seule machine avec suffisamment de mémoire est une bonne option. En outre, Milvus Standalone prend en charge la haute disponibilité via la réplication maître-esclave.</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus Distribué<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Distributed peut être déployé sur des clusters <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>. Ce déploiement présente une architecture cloud-native, où la charge d'ingestion et les requêtes de recherche sont traitées séparément par des nœuds isolés, ce qui permet la redondance des composants critiques. Il offre l'évolutivité et la disponibilité les plus élevées, ainsi que la flexibilité nécessaire pour personnaliser les ressources allouées dans chaque composant. Milvus Distributed est le meilleur choix pour les utilisateurs professionnels qui exécutent des systèmes de recherche vectorielle à grande échelle en production.</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">Choisissez le bon déploiement pour votre cas d'utilisation<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h2><p>Le choix d'un mode de déploiement dépend généralement du stade de développement de votre application :</p>
<ul>
<li><p><strong>Pour un prototypage rapide</strong></p>
<p>Si vous souhaitez construire rapidement quelque chose en tant que prototype ou à des fins d'apprentissage, comme des démonstrations de Retrieval Augmented Generation (RAG), des chatbots d'IA, des recherches multimodalités, Milvus Lite lui-même ou une combinaison de Milvus Lite et Milvus Standalone est approprié. Vous pouvez utiliser Milvus Lite dans des carnets de notes pour un prototypage rapide et explorer diverses approches telles que différentes stratégies de regroupement dans RAG. Il se peut que vous souhaitiez déployer l'application construite avec Milvus Lite dans une production à petite échelle pour servir des utilisateurs réels, ou valider l'idée sur des ensembles de données plus importants, par exemple plus de quelques millions de vecteurs. Milvus Standalone est approprié. La logique d'application de Milvus Lite peut toujours être partagée car tous les déploiements de Milvus ont la même API côté client. Les données stockées dans Milvus Lite peuvent également être portées vers Milvus Standalone à l'aide d'un outil de ligne de commande.</p></li>
<li><p><strong>Déploiement de la production à petite échelle</strong></p>
<p>Pour une production à un stade précoce, lorsque le projet cherche encore à s'adapter au marché des produits et que l'agilité est plus importante que l'évolutivité, Milvus Standalone est le meilleur choix. Il peut encore évoluer jusqu'à 100 millions de vecteurs s'il dispose de suffisamment de ressources machine, tout en nécessitant beaucoup moins de DevOps que la maintenance d'un cluster K8s.</p></li>
<li><p><strong>Déploiement de production à grande échelle</strong></p>
<p>Lorsque votre entreprise se développe rapidement et que l'échelle des données dépasse la capacité d'un seul serveur, il est temps d'envisager Milvus Distributed. Vous pouvez continuer à utiliser Milvus Standalone pour l'environnement de développement ou de mise en scène pour sa commodité, et exploiter le cluster K8s qui exécute Milvus Distributed. Cela peut vous permettre d'atteindre des dizaines de milliards de vecteurs, tout en vous offrant la flexibilité nécessaire pour adapter la taille des nœuds à votre charge de travail particulière, telle que les cas de lecture élevée, d'écriture peu fréquente ou d'écriture élevée, de lecture faible.</p></li>
<li><p><strong>Recherche locale sur les périphériques</strong></p>
<p>Pour la recherche dans des dispositifs périphériques privés ou sensibles, vous pouvez déployer Milvus Lite sur le dispositif sans dépendre d'un service basé dans le nuage pour effectuer une recherche de texte ou d'image. Cela convient à des cas tels que la recherche de documents propriétaires ou la détection d'objets sur l'appareil.</p></li>
</ul>
<p>Le choix du mode de déploiement de Milvus dépend de l'étape et de l'échelle de votre projet. Milvus fournit une solution flexible et puissante pour divers besoins, du prototypage rapide au déploiement d'entreprise à grande échelle.</p>
<ul>
<li><strong>Milvus Lite</strong> est recommandé pour les petits ensembles de données, jusqu'à quelques millions de vecteurs.</li>
<li><strong>Milvus Standalone</strong> convient aux ensembles de données de taille moyenne, jusqu'à 100 millions de vecteurs.</li>
<li><strong>Milvus Distributed</strong> est conçu pour les déploiements à grande échelle, capable de traiter des ensembles de données de 100 millions à des dizaines de milliards de vecteurs.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" />
   </span> <span class="img-wrapper"> <span>Sélectionnez l'option de déploiement correspondant à votre cas d'utilisation</span> </span></p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">Comparaison des fonctionnalités<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
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
<tr><th>Fonctionnalité</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus distribué</th></tr>
</thead>
<tbody>
<tr><td>SDK / Liraire client</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Types de données</td><td>Vecteur dense<br/>Vecteur espacé<br/>Vecteur binaire<br/>Booléen<br/>Entier<br/>Virgule flottante<br/>VarChar<br/>Tableau<br/>JSON</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td><td>Vecteur dense<br/>Vecteur espacé<br/>Vecteur binaire<br/>Booléen<br/>Entier<br/>Point flottant<br/>VarChar<br/>Tableau<br/>JSON</td></tr>
<tr><td>Capacités de recherche</td><td>Recherche vectorielle (ANN Search)<br/>Filtrage des métadonnées<br/>Recherche par plage<br/>Requête scalaire<br/>Obtention d'entités par clé primaire<br/>Recherche hybride</td><td>Vector Search (ANN Search)<br/>Filtrage des métadonnées<br/>Range Search<br/>Scalar Query<br/>Get Entities by Primary Key<br/>Hybrid Search</td><td>Recherche vectorielle (ANN Search)<br/>Filtrage des métadonnées<br/>Recherche par plage<br/>Requête scalaire<br/>Obtention d'entités par clé primaire<br/>Recherche hybride</td></tr>
<tr><td>Opérations CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Gestion avancée des données</td><td>N/A</td><td>Contrôle d'accès<br/>Partition<br/>Clé de partition</td><td>Contrôle d'accès<br/>Partition<br/>Clé de partition<br/>Groupement de ressources physiques</td></tr>
<tr><td>Niveaux de cohérence</td><td>Fort</td><td>Forte<br/>Stabilité limitée<br/>Session<br/>Éventuelle</td><td>Forte<br/>Anomalie limitée<br/>Session<br/>Eventuelle</td></tr>
</tbody>
</table>
