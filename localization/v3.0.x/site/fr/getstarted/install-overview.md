---
id: install-overview.md
summary: >-
  Choisissez entre Milvus Lite, Standalone ou Distributed en fonction de votre
  charge de travail, de vos exigences en matière de disponibilité et de votre
  environnement d'exploitation.
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
    </button></h1><p>Milvus prend en charge les prototypes locaux et les services de recherche vectorielle à grande échelle. Choisissez entre Milvus Lite, Milvus Standalone et Milvus Distributed en fonction de vos données, de votre charge de lecture et d'écriture, de vos exigences en matière de disponibilité et de votre environnement d'exploitation.</p>
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
<p>Pour les exemples locaux, utilisez Python 3.10 ou une version ultérieure et installez explicitement la dépendance Lite facultative. Sous Windows, pip ignore le paramètre « <code translate="no">milvus-lite</code> », il est donc nécessaire de spécifier explicitement le nom du paquet :</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Utilisez ` <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> ` pour ouvrir le stockage local. Milvus Lite 3.x crée un répertoire à ce chemin ; un fichier de base de données Milvus Lite 2.x existant nécessite une exportation et une migration. Consultez la section « <a href="/docs/fr/milvus_lite.md">Exécuter Milvus Lite</a> » pour connaître la configuration requise et la section « <a href="/docs/fr/quickstart.md">Démarrage rapide</a> » pour un exemple complet d’insertion et de recherche.</p>
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
    </button></h2><p>Milvus Standalone est un déploiement serveur sur une seule machine. Tous les composants de Milvus Standalone sont regroupés dans une seule <a href="https://milvus.io/docs/install_standalone-docker.md">image Docker</a>, ce qui facilite le déploiement. Si vous avez une charge de travail en production mais que vous préférez ne pas utiliser Kubernetes, l’exécution de Milvus Standalone sur une seule machine disposant d’une mémoire suffisante est une bonne option. Par défaut, Milvus Standalone utilise <strong>Woodpecker</strong> (intégré) comme file d’attente de messages ; il n’y a donc pas de service de messagerie distinct à gérer.</p>
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
<p>Utilisez Milvus Lite dans un notebook pour tester les représentations vectorielles, les stratégies de découpage RAG et le comportement de recherche. Passez à Milvus Standalone lorsque vous avez besoin d’un serveur partagé ou lorsque la mémoire allouée et la charge de requêtes dépassent les capacités de l’environnement local. L’API client est similaire, mais vérifiez les différences de fonctionnalités et migrez les données stockées séparément.</p></li>
<li><p><strong>Déploiement en production à petite échelle</strong></p>
<p>Utilisez Milvus Standalone lorsqu’un seul serveur suffit à répondre à vos exigences en matière de charge de travail et de disponibilité, et que vous préférez fonctionner sans Kubernetes. Estimez les besoins en mémoire à partir des dimensions des vecteurs, des champs scalaires, des paramètres d’indexation et du nombre de répliques, puis évaluez la concurrence attendue des requêtes et le taux d’écriture. Le nombre de vecteurs ne suffit pas à lui seul à déterminer la capacité.</p></li>
<li><p><strong>Déploiement en production à grande échelle</strong></p>
<p>À mesure que votre entreprise connaît une croissance rapide et que le volume de données dépasse la capacité d’un seul serveur, il est temps d’envisager Milvus Distributed. Vous pouvez continuer à utiliser Milvus Standalone pour les environnements de développement ou de préproduction en raison de sa simplicité d’utilisation, tout en gérant le cluster K8s sur lequel s’exécute Milvus Distributed. Cette configuration vous permettra de gérer des dizaines de milliards de vecteurs, tout en vous offrant la flexibilité nécessaire pour adapter la taille des nœuds à votre charge de travail spécifique, qu’il s’agisse de cas à forte lecture et écriture peu fréquente ou à forte écriture et faible lecture.</p></li>
<li><p><strong>Recherche locale sur les terminaux périphériques</strong></p>
<p>Pour effectuer des recherches sur des données privées ou sensibles au niveau des périphériques, vous pouvez déployer Milvus Lite directement sur le périphérique sans avoir recours à un service cloud pour la recherche de texte ou d’images. Cette solution est adaptée à des cas tels que la recherche dans des documents propriétaires ou la détection d’objets directement sur le périphérique.</p></li>
</ul>
<p>Le choix du mode de déploiement de Milvus dépend du stade et de l’ampleur de votre projet. Milvus offre une solution flexible et puissante adaptée à divers besoins, du prototypage rapide au déploiement d’entreprise à grande échelle.</p>
<ul>
<li><strong>Milvus Lite</strong> est adapté à l’évaluation locale et aux charges de travail pouvant être gérées par les ressources d’une seule application.</li>
<li><strong>Milvus Standalone</strong> fournit un service partagé lorsqu’un seul serveur répond à vos exigences en matière de capacité et de disponibilité.</li>
<li><strong>Milvus Distributed</strong> offre une évolutivité et une redondance au niveau des composants lorsque vous devez étendre votre infrastructure au-delà d’un seul serveur ou isoler les ressources de lecture et d’écriture.</li>
</ul>
<p>Milvus Standalone et Distributed utilisent une file d’attente de messages, un stockage d’objets et un magasin de métadonnées. Milvus Lite s’exécute localement sans ces services distincts. Pour connaître les dépendances par défaut des déploiements de serveurs et les options de services externes, consultez <a href="/docs/fr/data-infra-integration-overview.md">la section Infrastructure de données</a>.</p>
<p>Si vous préférez un service géré plutôt que de gérer vous-même l’infrastructure serveur, envisagez <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Pour un déploiement pratique, poursuivez avec <a href="/docs/fr/install_standalone-docker.md">Docker</a> ou <a href="/docs/fr/install_cluster-milvusoperator.md">Kubernetes</a>.</p>
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
    </button></h2><p>La colonne « Lite » décrit Milvus Lite 3.2.2. Vérifiez <a href="/docs/fr/milvus_lite.md#Supported-features-and-limits">les limites de Milvus Lite</a> avant de vous appuyer sur une fonctionnalité du serveur dans une application locale.</p>
<table>
<thead>
<tr><th>Fonctionnalité</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / bibliothèque cliente</td><td>Python (adaptateur PyMilvus local)</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Types de données</td><td>Vecteur dense<br/>Vecteur creux<br/>Booléen<br/>Entier<br/>Nombre à virgule flottante<br/>VarChar<br/>Tableau<br/>JSON</td><td>Vecteur dense<br/>Vecteur creux<br/>Vecteur binaire<br/>Booléen<br/>Entier<br/>Nombre à virgule flottante<br/>VarChar<br/>Tableau<br/>JSON</td><td>Vecteur dense<br/>Vecteur creux<br/>Vecteur binaire<br/>Booléen<br/>Entier<br/>Nombre à virgule flottante<br/>VarChar<br/>Tableau<br/>JSON</td></tr>
<tr><td>Fonctionnalités de recherche</td><td>Recherche vectorielle (recherche ANN)<br/>Filtrage par métadonnées<br/>Recherche par plage<br/>Requête scalaire<br/>Récupération d’entités par clé primaire<br/>Recherche hybride</td><td>Recherche vectorielle (recherche ANN)<br/>Filtrage par métadonnées<br/>Recherche par plage<br/>Requête scalaire<br/>Récupération d’entités par clé primaire<br/>Recherche hybride</td><td>Recherche vectorielle (recherche ANN)<br/>Filtrage par métadonnées<br/>Recherche par plage<br/>Requête scalaire<br/>Récupération d’entités par clé primaire<br/>Recherche hybride</td></tr>
<tr><td>Opérations CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Gestion avancée des données</td><td>Bases de données<br/>Partitions<br/>Alias<br/>Pas de contrôle d'accès</td><td>Contrôle d'accès<br/>Partition<br/>Clé de partition</td><td>Contrôle d'accès<br/>Partition<br/>Clé de partition<br/>Regroupement des ressources physiques</td></tr>
<tr><td>Niveaux de cohérence</td><td>Sans objet : un seul processus local traite toutes les requêtes ; la valeur « <code translate="no">consistency_level</code> » est acceptée mais n’a aucun effet</td><td><br/>forte Staleness limitée<br/>Session<br/>Éventuelle</td><td><br/>forte, obsolescence limitée,<br/>, session,<br/>, éventuel</td></tr>
<tr><td>File d’attente de messages</td><td>N/A</td><td>Woodpecker (intégré)</td><td>Woodpecker (service)</td></tr>
</tbody>
</table>
