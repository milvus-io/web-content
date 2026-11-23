---
id: alert.md
title: Créer une alerte
related_key: monitor and alert.
summary: Découvrez comment créer une alerte pour les services Milvus dans Grafana.
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">Créer une alerte pour les services Milvus<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique présente le mécanisme d'alerte des services Milvus et explique pourquoi, quand et comment créer des alertes dans Milvus.</p>
<p>En créant des alertes, vous pouvez recevoir des notifications lorsque la valeur d’une métrique spécifique dépasse le seuil que vous avez prédéfini.</p>
<p>Par exemple, vous créez une alerte et définissez 80 Mo comme valeur maximale pour l’utilisation de la mémoire par les composants Milvus. Si l’utilisation réelle dépasse la valeur prédéfinie, vous recevrez des alertes vous signalant que l’utilisation de la mémoire par les composants Milvus dépasse 80 Mo. Dès réception de l’alerte, vous pouvez alors ajuster l’allocation des ressources en conséquence et en temps opportun afin de garantir la disponibilité du service.</p>
<h2 id="Scenarios-for-creating-alerts" class="common-anchor-header">Scénarios de création d’alertes<button data-href="#Scenarios-for-creating-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous trouverez ci-dessous quelques scénarios courants dans lesquels vous devrez créer une alerte.</p>
<ul>
<li>L'utilisation du processeur ou de la mémoire par les composants Milvus est trop élevée.</li>
<li>Les pods des composants Milvus manquent d’espace disque.</li>
<li>Les pods des composants Milvus redémarrent trop fréquemment.</li>
</ul>
<p>Les métriques suivantes sont disponibles pour la configuration des alertes :</p>
<table>
<thead>
<tr><th>Métrique</th><th>Description</th><th>Unité de mesure</th></tr>
</thead>
<tbody>
<tr><td>Utilisation du processeur</td><td>Utilisation du processeur par les composants Milvus, indiquée par le temps d'exécution du processeur.</td><td>Seconde</td></tr>
<tr><td>Mémoire</td><td>Ressources mémoire consommées par les composants Milvus.</td><td>Mo</td></tr>
<tr><td>Goroutines</td><td>Activités s'exécutant simultanément en langage GO.</td><td>/</td></tr>
<tr><td>Threads du système d'exploitation</td><td>Les threads, ou processus légers, dans un système d'exploitation.</td><td>/</td></tr>
<tr><td>Descripteurs de fichiers ouverts par le processus</td><td>Nombre actuel de descripteurs de fichiers utilisés.</td><td>/</td></tr>
</tbody>
</table>
<h2 id="Set-up-alerts" class="common-anchor-header">Configurer des alertes<button data-href="#Set-up-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>Ce guide prend pour exemple la création d’une alerte concernant l’utilisation de la mémoire par les composants de Milvus. Pour créer d’autres types d’alertes, veuillez adapter vos commandes en conséquence. Si vous rencontrez des problèmes au cours de la procédure, n’hésitez pas à poser vos questions sur le <a href="https://discuss.milvus.io/">forum Milvus</a> ou à lancer une discussion sur <a href="https://discord.com/invite/8uyFbECzPX">Discord</a>.</p>
<h3 id="Prerequisites" class="common-anchor-header">Prérequis<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><p>Ce tutoriel part du principe que Grafana est installé et configuré. Si ce n'est pas le cas, nous vous recommandons de consulter le <a href="/docs/fr/monitor.md">guide de surveillance</a>.</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. Ajouter une nouvelle requête<button data-href="#1-Add-a-new-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour ajouter une alerte concernant l’utilisation de la mémoire par les composants Milvus, modifiez le panneau « Memory ». Ajoutez ensuite une nouvelle requête avec la métrique suivante : <code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" /> 
   <span>Alert_metric</span>
  
 </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. Enregistrez le tableau de bord<button data-href="#2-Save-the-dashboard" class="anchor-icon" translate="no">
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
    </button></h3><p>Enregistrez le tableau de bord et patientez quelques minutes pour voir l'alerte s'afficher.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" /> 
   <span>Alert_dashboard</span>
  
 </span></p>
<p>La requête d’alerte Grafana ne prend pas en charge les variables de modèle. Vous devez donc ajouter une deuxième requête sans aucune variable de modèle dans les étiquettes. La deuxième requête est nommée « A » par défaut. Vous pouvez la renommer en cliquant sur le menu déroulant.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" /> 
   <span>Alert_query</span>
  
 </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. Ajouter des notifications d’alerte<button data-href="#3-Add-alert-notifications" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour recevoir des notifications d’alerte, créez un point de contact. Dans Grafana, accédez à <strong>Alertes &amp; IRM</strong> &gt; <strong>Alertes</strong> &gt; <strong>Configuration des notifications</strong>, sélectionnez l’onglet <strong>Points de contact</strong>, puis cliquez sur <strong>+ Nouveau point de contact</strong>. Ensuite, dans la section <strong>Configurer les notifications</strong> de la règle d’alerte, sélectionnez le point de contact ou acheminez les notifications via des politiques de notification.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" /> 
   <span>Alert_notification</span>
  
 </span></p>
<p>Si l’alerte est créée et déclenchée avec succès, vous recevrez la notification comme indiqué sur la capture d’écran ci-dessous.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" /> 
   <span>Notification_message</span>
  
 </span></p>
<p>Pour supprimer une alerte, accédez au panneau « Alerte » et cliquez sur le bouton Supprimer.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" /> 
   <span>Supprimer_alerte</span>
  
 </span></p>
<h2 id="Whats-next" class="common-anchor-header">Et ensuite<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Si vous souhaitez commencer à surveiller les services Milvus :
<ul>
<li>Consultez le <a href="/docs/fr/monitor.md">guide de surveillance</a></li>
<li>Découvrez comment <a href="/docs/fr/visualize.md">visualiser les métriques de surveillance</a></li>
</ul></li>
<li>Si vous avez créé des alertes concernant l'utilisation de la mémoire par les composants de Milvus :
<ul>
<li>Découvrez comment <a href="/docs/fr/allocate.md#standalone">allouer des ressources</a></li>
</ul></li>
<li>Si vous recherchez des informations sur la manière de faire évoluer un cluster Milvus :
<ul>
<li>Découvrez <a href="/docs/fr/scaleout.md">comment faire évoluer un cluster Milvus</a></li>
</ul></li>
</ul>
