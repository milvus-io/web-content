---
id: milvus-webui.md
summary: >-
  Milvus Web UI est un outil de gestion graphique pour Milvus. Il améliore
  l'observabilité du système grâce à une interface simple et intuitive. Vous
  pouvez
title: Milvus WebUI
---
<h1 id="Milvus-WebUI" class="common-anchor-header">Milvus WebUI<button data-href="#Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus WebUI est un outil de gestion graphique pour Milvus. Il améliore l'observabilité du système grâce à une interface simple et intuitive. Vous pouvez utiliser l'interface Web de Milvus pour observer les statistiques et les métriques des composants et des dépendances de Milvus, vérifier les détails de la base de données et de la collection, et répertorier les configurations détaillées de Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>L'interface Web de Milvus diffère de Birdwatcher et d'Attu en ce sens qu'il s'agit d'un outil intégré permettant d'observer l'ensemble du système à l'aide d'une interface simple et intuitive.</p>
<p>Le tableau suivant compare les fonctionnalités de l'interface Web de Milvus et de Birdwatcher/Attu :</p>
<table>
<thead>
<tr><th>Fonctionnalité</th><th>Milvus Web UI</th><th>Birdwatcher</th><th>Attu</th></tr>
</thead>
<tbody>
<tr><td>Forme opérationnelle</td><td>GUI</td><td>CLI</td><td>GUI</td></tr>
<tr><td>Utilisateurs cibles</td><td>Mainteneurs, développeurs</td><td>Mainteneurs</td><td>Développeurs</td></tr>
<tr><td>Installation</td><td>Intégré</td><td>Outil autonome</td><td>Outil autonome</td></tr>
<tr><td>Dépendances</td><td>Milvus</td><td>Milvus / etcd</td><td>Milvus</td></tr>
<tr><td>Fonctionnalités principales</td><td>Environnement d'exécution, détails de la base de données/collection, segments, canaux, tâches et demandes de requêtes lentes</td><td>Inspection des métadonnées et exécution de l'API Milvus</td><td>Gestion de la base de données et tâches opérationnelles</td></tr>
<tr><td>Disponible depuis</td><td>v2.5.0</td><td>v2.0.0</td><td>v0.1.8</td></tr>
</tbody>
</table>
<p>Depuis la version 2.5.0, vous pouvez accéder à l'interface Web de Milvus à l'aide de l'URL suivante sur une instance Milvus en cours d'exécution :</p>
<pre><code translate="no">http://<span class="hljs-variable">${MILVUS_PROXY_IP}</span>:9091/webui
<button class="copy-code-btn"></button></code></pre>
<h2 id="Features" class="common-anchor-header">Fonctionnalités<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>L'interface Web Milvus offre les fonctionnalités suivantes :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-webui-overview.png" alt="Milvus Web UI overview" class="doc-image" id="milvus-web-ui-overview" />
   </span> <span class="img-wrapper"> <span>Présentation de l'interface Web Milvus</span> </span></p>
<ul>
<li><p><a href="#Home">Accueil</a></p>
<p>Vous pouvez trouver des informations sur l'instance Milvus en cours d'exécution, ses composants, les clients connectés et les dépendances.</p></li>
<li><p><a href="#Collections">Collections</a></p>
<p>Vous pouvez afficher la liste des bases de données et des collections actuellement dans Milvus et vérifier leurs détails.</p></li>
<li><p><a href="#Query">Requête</a></p>
<p>Vous pouvez consulter les statistiques collectées des nœuds de requête et des coordinateurs de requête en termes de segments, de canaux, de répliques et de groupes de ressources.</p></li>
<li><p><a href="#Data">Données</a></p>
<p>Vous pouvez consulter les statistiques collectées des nœuds de données en termes de segments et de canaux.</p></li>
<li><p><a href="#Tasks">Tâches</a></p>
<p>Vous pouvez afficher la liste des tâches en cours d'exécution dans Milvus, y compris les tâches du planificateur Querycoord, les tâches de compactage, les tâches de construction d'index, les tâches d'importation et les tâches de synchronisation des données.</p></li>
<li><p><a href="#Slow-requests">Demandes lentes</a></p>
<p>Vous pouvez afficher la liste des demandes lentes dans Milvus, y compris le type de demande, la durée de la demande et les paramètres de la demande.</p></li>
<li><p><a href="#Configurations">Configurations</a></p>
<p>Vous pouvez afficher la liste des configurations de Milvus et leurs valeurs.</p></li>
<li><p><a href="#Tools">Outils</a></p>
<p>Vous pouvez accéder aux deux outils intégrés, pprof et l'outil de visualisation des données Milvus, à partir de l'interface Web.</p></li>
</ul>
<h2 id="Home" class="common-anchor-header">Accueil<button data-href="#Home" class="anchor-icon" translate="no">
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
    </button></h2><p>La page d'accueil contient les informations suivantes :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-home.png" alt="Milvus Web UI Home" class="doc-image" id="milvus-web-ui-home" />
   </span> <span class="img-wrapper"> <span>Accueil de l'interface Web Milvus</span> </span></p>
<ul>
<li><p><strong>Informations sur le système</strong>: Afficher les informations sur le système, y compris les informations sur le mode de déploiement, l'image utilisée dans le déploiement et les informations connexes.</p></li>
<li><p><strong>Informations sur les composants</strong>: Afficher l'état et les métriques des composants de Milvus, y compris l'état et les métriques des nœuds de requête, des nœuds de données, des nœuds d'index, des coordinateurs et des proxys.</p></li>
<li><p><strong>Clients connectés</strong>: Affichez les clients connectés et leurs informations, notamment le type et la version du SDK, le nom d'utilisateur et l'historique de leurs accès.</p></li>
<li><p><strong>Dépendances du système</strong>: Affichez l'état et les mesures des dépendances de Milvus, y compris l'état et les mesures du méta-magasin, de la file d'attente de messages et du stockage d'objets.</p></li>
</ul>
<h2 id="Collections" class="common-anchor-header">Collections<button data-href="#Collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Sur la page Collections, vous pouvez afficher la liste des bases de données et des collections actuellement dans Milvus et vérifier leurs détails.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-collections.png" alt="Milvus Web UI Collections" class="doc-image" id="milvus-web-ui-collections" />
   </span> <span class="img-wrapper"> <span>Collections de l'interface Web de Milvus</span> </span></p>
<ul>
<li><p><strong>Base de données</strong>: Afficher la liste des bases de données actuellement dans Milvus et leurs détails.</p></li>
<li><p><strong>Collection</strong>: Affiche la liste des collections de chaque base de données et leurs détails.</p>
<p>Vous pouvez cliquer sur une collection pour afficher ses détails, y compris le nombre de champs, les partitions, les index et d'autres informations en détail.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-collection-details.png" alt="Milvus Web UI Collection Details" class="doc-image" id="milvus-web-ui-collection-details" />
   </span> <span class="img-wrapper"> <span>Détails de la collection de l'interface Web Milvus</span> </span></p></li>
</ul>
<h2 id="Query" class="common-anchor-header">Requête<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-query.png" alt="Milvus Web UI Query Page" class="doc-image" id="milvus-web-ui-query-page" />
   </span> <span class="img-wrapper"> <span>Page de requête de l'interface Web Milvus</span> </span></p>
<ul>
<li><p><strong>Segments</strong>: Affiche la liste des segments et leurs détails, y compris l'ID du segment, la collection correspondante, l'état, la taille, etc.</p></li>
<li><p><strong>Canaux</strong>: Affiche la liste des canaux et leurs détails, y compris le nom du canal, les collections correspondantes, etc.</p></li>
<li><p><strong>Répliques</strong>: Affichez la liste des répliques et leurs détails, y compris l'ID de la réplique, la collection correspondante, etc.</p></li>
<li><p><strong>Groupes de ressources</strong>: Affichez la liste des groupes de ressources et leurs détails, y compris le nom du groupe de ressources, le nombre de nœuds de requête dans le groupe, et ses configurations, etc.</p></li>
</ul>
<h2 id="Data" class="common-anchor-header">Données<button data-href="#Data" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-data.png" alt="Milvus Web UI Data Page" class="doc-image" id="milvus-web-ui-data-page" />
   </span> <span class="img-wrapper"> <span>Page de données de l'interface Web Milvus</span> </span></p>
<ul>
<li><p><strong>Segments</strong>: Affiche la liste des segments des nœuds de données/coordinateurs et leurs détails, y compris l'ID du segment, la collection correspondante, l'état, la taille, etc.</p></li>
<li><p><strong>Canaux</strong>: Affichez la liste des canaux des nœuds de données/coordinateurs et leurs détails, y compris le nom du canal, les collections correspondantes, etc.</p></li>
</ul>
<h2 id="Tasks" class="common-anchor-header">Tâches<button data-href="#Tasks" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-tasks.png" alt="Milvus Web UI Tasks Page" class="doc-image" id="milvus-web-ui-tasks-page" />
   </span> <span class="img-wrapper"> <span>Page des tâches de l'interface Web Milvus</span> </span></p>
<ul>
<li><p><strong>Tâches</strong>: Affiche la liste des tâches en cours d'exécution dans Milvus, y compris le type de tâche, l'état et les actions.</p>
<ul>
<li><p><strong>Tâches QueryCoord</strong>: Affiche toutes les tâches du planificateur QueryCoord, y compris les vérificateurs d'équilibre, d'index/segment/canal/chef de file au cours des 15 dernières minutes.</p></li>
<li><p><strong>Tâches de compactage</strong>: Voir toutes les tâches de compactage des coordinateurs de données au cours des 15 dernières minutes.</p></li>
<li><p><strong>Tâches de construction d'index</strong>: Voir toutes les tâches de construction d'index des coordinateurs de données au cours des 30 dernières minutes.</p></li>
<li><p><strong>Tâches d'importation</strong>: Voir toutes les tâches d'importation effectuées par les coordinateurs de données au cours des 30 dernières minutes.</p></li>
<li><p><strong>Tâches de synchronisation des données</strong>: Afficher toutes les tâches de synchronisation des données effectuées par les nœuds de données au cours des 15 dernières minutes.</p></li>
</ul></li>
</ul>
<h2 id="Slow-requests" class="common-anchor-header">Requêtes lentes<button data-href="#Slow-requests" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-slow-requests.png" alt="Milvus Web UI Slow Requests Page" class="doc-image" id="milvus-web-ui-slow-requests-page" />
   </span> <span class="img-wrapper"> <span>Page des demandes lentes de l'interface Web Milvus</span> </span></p>
<ul>
<li><strong>Requêtes lentes</strong>: Une demande lente est une recherche ou une requête dont le temps de latence est supérieur à la valeur de <code translate="no">proxy.slowQuerySpanInSeconds</code> spécifiée dans la configuration. La liste des requêtes lentes affiche toutes les requêtes lentes des 15 dernières minutes.</li>
</ul>
<h2 id="Configurations" class="common-anchor-header">Configurations<button data-href="#Configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-configurations.png" alt="Milvus Web UI Configurations Page" class="doc-image" id="milvus-web-ui-configurations-page" />
   </span> <span class="img-wrapper"> <span>Page des configurations de l'interface Web Milvus</span> </span></p>
<ul>
<li><strong>Configurations</strong>: Affiche la liste des configurations d'exécution Milvus et leurs valeurs.</li>
</ul>
<h2 id="Tools" class="common-anchor-header">Outils<button data-href="#Tools" class="anchor-icon" translate="no">
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
<li><p><strong>pprof</strong>: Accéder à l'outil pprof pour le profilage et le débogage de Milvus.</p></li>
<li><p><strong>Outil de visualisation des données Milvus</strong>: Accédez à l'outil de visualisation des données Milvus pour visualiser les données dans Milvus.</p></li>
</ul>
