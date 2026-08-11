---
id: install-overview.md
summary: >-
  Milvus est une base de données vectorielle hautement performante et évolutive.
  Elle prend en charge des cas d'utilisation de tailles très variées, allant des
  démos exécutées localement dans Jupyter Notebooks aux clusters Kubernetes à
  très grande échelle traitant des dizaines de milliards de vecteurs. Il existe
  actuellement trois options de déploiement de Milvus : Milvus Lite, Milvus
  Standalone et Milvus Distributed.
title: Présentation des options de déploiement de Milvus
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Présentation des options de déploiement de Milvus<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus est une base de données vectorielle hautement performante et évolutive. Elle prend en charge des cas d'utilisation de tailles très variées, allant des démos exécutées localement dans Jupyter Notebooks aux clusters Kubernetes à très grande échelle traitant des dizaines de milliards de vecteurs. Actuellement, il existe trois options de déploiement de Milvus : Milvus Lite, Milvus Standalone et Milvus Distributed.</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> est une bibliothèque Python pouvant être importée dans vos applications. En tant que version allégée de Milvus, elle est idéale pour le prototypage rapide dans Jupyter Notebooks ou pour une exécution sur des appareils intelligents disposant de ressources limitées. Milvus Lite prend en charge les mêmes API que les autres déploiements Milvus. Le code côté client interagissant avec Milvus Lite peut également fonctionner avec des instances Milvus dans d’autres modes de déploiement.</p>
<p>Pour intégrer Milvus Lite à vos applications, exécutez la commande « <code translate="no">pip install pymilvus</code> » afin de l’installer, puis utilisez l’instruction « <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> » pour instancier une base de données vectorielle à partir d’un fichier local qui conserve toutes vos données. Pour plus de détails, consultez la section « <a href="https://milvus.io/docs/milvus_lite.md">Exécuter Milvus Lite</a> ».</p>
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
    </button></h2><p>Milvus Standalone est un déploiement serveur sur une seule machine. Tous les composants de Milvus Standalone sont regroupés dans une seule <a href="https://milvus.io/docs/install_standalone-docker.md">image Docker</a>, ce qui facilite le déploiement. Si vous avez une charge de travail en production mais que vous préférez ne pas utiliser Kubernetes, l’exécution de Milvus Standalone sur une seule machine disposant d’une mémoire suffisante constitue une bonne option. Par défaut, Milvus Standalone utilise <strong>Woodpecker</strong> (intégré) comme file d’attente de messages ; il n’y a donc pas de service de messagerie distinct à gérer.</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus Distributed<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Distributed peut être déployé sur des clusters <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>. Ce déploiement repose sur une architecture native du cloud, dans laquelle la charge d’ingestion et les requêtes de recherche sont gérées séparément par des nœuds isolés, ce qui permet d’assurer la redondance des composants critiques. Il offre une évolutivité et une disponibilité optimales, ainsi qu’une grande flexibilité pour personnaliser les ressources allouées à chaque composant. Milvus Distributed est le choix idéal pour les entreprises exploitant des systèmes de recherche vectorielle à grande échelle en production. Par défaut, Milvus Distributed utilise <strong>Woodpecker</strong> comme file d’attente de messages, déployé en tant que service dédié aux côtés de Milvus.</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">Choisissez le mode de déploiement adapté à votre cas d’utilisation<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h2><p>Le choix d’un mode de déploiement dépend généralement du stade de développement de votre application :</p>
<ul>
<li><p><strong>Pour un prototypage rapide</strong></p>
<p>Si vous souhaitez créer rapidement un prototype ou à des fins d’apprentissage, par exemple des démos de « Retrieval Augmented Generation » (RAG), des chatbots IA ou la recherche multimodale, Milvus Lite seul ou une combinaison de Milvus Lite et de Milvus Standalone convient parfaitement. Vous pouvez utiliser Milvus Lite dans des notebooks pour un prototypage rapide et explorer diverses approches, telles que différentes stratégies de découpage en segments (chunking) dans le RAG. Vous souhaiterez peut-être déployer l’application créée avec Milvus Lite dans un environnement de production à petite échelle pour servir de vrais utilisateurs, ou valider le concept sur des ensembles de données plus volumineux, par exemple de plus de quelques millions de vecteurs. Milvus Standalone est alors la solution appropriée. La logique d’application de Milvus Lite peut toujours être réutilisée, car tous les déploiements Milvus partagent la même API côté client. Les données stockées dans Milvus Lite peuvent également être transférées vers Milvus Standalone à l’aide d’un outil en ligne de commande.</p></li>
<li><p><strong>Déploiement en production à petite échelle</strong></p>
<p>Pour les premières phases de production, lorsque le projet cherche encore à trouver son positionnement sur le marché et que l’agilité prime sur l’évolutivité, Milvus Standalone est le meilleur choix. Il peut tout de même prendre en charge jusqu’à 100 millions de vecteurs si les ressources matérielles sont suffisantes, tout en nécessitant beaucoup moins d’interventions DevOps que la maintenance d’un cluster K8s.</p></li>
<li><p><strong>Déploiement en production à grande échelle</strong></p>
<p>À mesure que votre entreprise connaît une croissance rapide et que le volume de données dépasse la capacité d’un seul serveur, il est temps d’envisager Milvus Distributed. Vous pouvez continuer à utiliser Milvus Standalone pour les environnements de développement ou de préproduction en raison de sa simplicité d’utilisation, tout en exploitant le cluster K8s sur lequel s’exécute Milvus Distributed. Cette configuration vous permettra de gérer des dizaines de milliards de vecteurs, tout en vous offrant la flexibilité nécessaire pour adapter la taille des nœuds à votre charge de travail spécifique, qu’il s’agisse de cas à forte lecture et écriture peu fréquente ou à forte écriture et faible lecture.</p></li>
<li><p><strong>Recherche locale sur les terminaux périphériques</strong></p>
<p>Pour effectuer des recherches sur des données privées ou sensibles au niveau des terminaux, vous pouvez déployer Milvus Lite directement sur le terminal sans avoir recours à un service cloud pour la recherche de texte ou d’images. Cette solution est adaptée à des cas tels que la recherche dans des documents propriétaires ou la détection d’objets directement sur le terminal.</p></li>
</ul>
<p>Le choix du mode de déploiement de Milvus dépend du stade et de l’ampleur de votre projet. Milvus offre une solution flexible et puissante adaptée à divers besoins, du prototypage rapide au déploiement d’entreprise à grande échelle.</p>
<ul>
<li><strong>Milvus Lite</strong> est recommandé pour les petits ensembles de données, jusqu’à quelques millions de vecteurs.</li>
<li><strong>Milvus Standalone</strong> convient aux ensembles de données de taille moyenne, pouvant aller jusqu’à 100 millions de vecteurs.</li>
<li><strong>Milvus Distributed</strong> est conçu pour les déploiements à grande échelle, capable de gérer des ensembles de données allant de 100 millions à plusieurs dizaines de milliards de vecteurs.</li>
</ul>
<p>Quel que soit le mode de déploiement, chaque instance Milvus s'appuie sur une file d'attente de messages, un stockage d'objets et un magasin de métadonnées — par défaut, <strong>Woodpecker</strong>, <strong>MinIO</strong> et <strong>etcd</strong>. Pour en savoir plus sur ces dépendances, les configurer ou connecter des services externes, consultez <a href="/docs/fr/data-infra-integration-overview.md">la section Infrastructure de données</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>Sélectionnez l’option de déploiement adaptée à votre cas d’utilisation</span>
  
 </span></p>
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
<tr><th>Fonctionnalité</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / Bibliothèque client</td><td>Python<br/>gRPC</td><td><br/>Python Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Types de données</td><td>Vecteur dense<br/>Vecteur creux<br/>Vecteur binaire<br/>Booléen<br/>Entier<br/>Nombre à virgule flottante<br/>VarChar<br/>Tableau<br/>JSON</td><td>Vecteur dense<br/>Vecteur creux<br/>Vecteur binaire<br/>Booléen<br/>Entier<br/>Nombre à virgule flottante<br/>VarChar<br/>Tableau<br/>JSON</td><td>Vecteur dense<br/>Vecteur creux<br/>Vecteur binaire<br/>Booléen<br/>Entier<br/>Nombre à virgule flottante<br/>VarChar<br/>Tableau<br/>JSON</td></tr>
<tr><td>Fonctionnalités de recherche</td><td>Recherche vectorielle (recherche ANN)<br/>Filtrage par métadonnées<br/>Recherche par plage<br/>Requête scalaire<br/>Récupération d’entités par clé primaire<br/>Recherche hybride</td><td>Recherche vectorielle (recherche ANN)<br/>Filtrage par métadonnées<br/>Recherche par plage<br/>Requête scalaire<br/>Récupération d’entités par clé primaire<br/>Recherche hybride</td><td>Recherche vectorielle (recherche ANN)<br/>Filtrage par métadonnées<br/>Recherche par plage<br/>Requête scalaire<br/>Récupération d’entités par clé primaire<br/>Recherche hybride</td></tr>
<tr><td>Opérations CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Gestion avancée des données</td><td>N/A</td><td><br/>de contrôle d'accès Partition<br/>Clé de partition</td><td><br/>de contrôle d'accès Partition<br/>Clé de partition<br/>Regroupement des ressources physiques</td></tr>
<tr><td>Niveaux de cohérence</td><td>Fort</td><td>Fort<br/>Staleness limité<br/>Session<br/>Éventuel</td><td>Fort<br/>Staleness limité<br/>Session<br/>Éventuel</td></tr>
<tr><td>File d’attente de messages</td><td>N/A</td><td>Woodpecker (intégré)</td><td>Woodpecker (service)</td></tr>
</tbody>
</table>
