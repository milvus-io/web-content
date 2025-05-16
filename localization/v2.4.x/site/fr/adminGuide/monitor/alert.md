---
id: alert.md
title: Créer une alerte
related_key: monitor and alert.
summary: Découvrez comment créer une alerte pour les services Milvus dans Grafana.
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">Création d'une alerte pour les services Milvus<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique présente le mécanisme d'alerte pour les services Milvus et explique pourquoi, quand et comment créer des alertes dans Milvus.</p>
<p>En créant des alertes, vous pouvez recevoir des notifications lorsque la valeur d'une mesure spécifique dépasse le seuil que vous avez prédéfini.</p>
<p>Par exemple, vous créez une alerte et définissez 80 Mo comme valeur maximale pour l'utilisation de la mémoire par les composants Milvus. Si l'utilisation réelle dépasse le nombre prédéfini, vous recevrez des alertes vous rappelant que l'utilisation de la mémoire par le composant Milvus dépasse 80 Mo. En cas d'alerte, vous pouvez alors ajuster l'allocation des ressources en conséquence et en temps voulu pour garantir la disponibilité du service.</p>
<h2 id="Scenarios-for-creating-alerts" class="common-anchor-header">Scénarios de création d'alertes<button data-href="#Scenarios-for-creating-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>Voici quelques scénarios courants pour lesquels vous devez créer une alerte.</p>
<ul>
<li>L'utilisation de l'UC ou de la mémoire par les composants Milvus est trop élevée.</li>
<li>Les pods de composants Milvus manquent d'espace disque.</li>
<li>Les pods des composants Milvus redémarrent trop fréquemment.</li>
</ul>
<p>Les mesures suivantes sont disponibles pour la configuration des alertes :</p>
<table>
<thead>
<tr><th>Métrique</th><th>Description</th><th>Unité de mesure</th></tr>
</thead>
<tbody>
<tr><td>Utilisation de l'UC</td><td>Utilisation de l'UC par les composants Milvus, indiquée par le temps d'exécution de l'UC.</td><td>Seconde</td></tr>
<tr><td>Mémoire</td><td>Ressources de mémoire consommées par les composants Milvus.</td><td>MO</td></tr>
<tr><td>Goroutines</td><td>Activités exécutées simultanément en langage GO.</td><td>/</td></tr>
<tr><td>Fils du système d'exploitation</td><td>Threads, ou processus légers dans un système d'exploitation.</td><td>/</td></tr>
<tr><td>Fds ouverts par le processus</td><td>Le nombre actuel de descripteurs de fichiers utilisés.</td><td>/</td></tr>
</tbody>
</table>
<h2 id="Set-up-alerts" class="common-anchor-header">Mise en place d'alertes<button data-href="#Set-up-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>Ce guide prend l'exemple de la création d'une alerte sur l'utilisation de la mémoire des composants Milvus. Pour créer d'autres types d'alertes, veuillez adapter vos commandes en conséquence. Si vous rencontrez des problèmes au cours du processus, n'hésitez pas à poser des questions dans les <a href="https://github.com/milvus-io/milvus/discussions">discussions Github</a> ou à démarrer un fil de discussion sur <a href="https://discord.com/invite/8uyFbECzPX">Discord</a>.</p>
<h3 id="Prerequisites" class="common-anchor-header">Conditions préalables</h3><p>Ce tutoriel suppose que vous avez installé et configuré Grafana. Si ce n'est pas le cas, nous vous recommandons de lire le <a href="/docs/fr/v2.4.x/monitor.md">guide de surveillance</a>.</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. Ajouter une nouvelle requête</h3><p>Pour ajouter une alerte sur l'utilisation de la mémoire des composants Milvus, modifiez le panneau Mémoire. Ensuite, ajoutez une nouvelle requête avec la métrique : <code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" />
   </span> <span class="img-wrapper"> <span>Alert_metric</span> </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. Sauvegarder le tableau de bord</h3><p>Sauvegarder le tableau de bord et attendre quelques minutes pour voir apparaître l'alerte.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" />
   </span> <span class="img-wrapper"> <span>Tableau de bord_alerte</span> </span></p>
<p>La requête d'alerte de Grafana ne prend pas en charge les variables de modèle. Par conséquent, vous devez ajouter une deuxième requête sans aucune variable de modèle dans les étiquettes. La deuxième requête est nommée "A" par défaut. Vous pouvez la renommer en cliquant sur le menu déroulant.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" />
   </span> <span class="img-wrapper"> <span>Requête_alerte</span> </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. Ajouter des notifications d'alerte</h3><p>Pour recevoir des notifications d'alerte, ajoutez un &quot;canal de notification&quot;. Ensuite, spécifiez le canal dans le champ &quot;Envoyer à&quot;.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" />
   </span> <span class="img-wrapper"> <span>Alerte_notification</span> </span></p>
<p>Si l'alerte est créée et déclenchée avec succès, vous recevrez une notification comme indiqué dans la capture d'écran ci-dessous.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" />
   </span> <span class="img-wrapper"> <span>Message de notification</span> </span></p>
<p>Pour supprimer une alerte, allez dans le panneau "Alerte" et cliquez sur le bouton "Supprimer".</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" />
   </span> <span class="img-wrapper"> <span>Supprimer l'alerte</span> </span></p>
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
<li>Si vous avez besoin de commencer à surveiller les services pour Milvus :<ul>
<li>Lire le <a href="/docs/fr/v2.4.x/monitor.md">guide de surveillance</a></li>
<li>Apprenez à <a href="/docs/fr/v2.4.x/visualize.md">visualiser les mesures de surveillance</a></li>
</ul></li>
<li>Si vous avez créé des alertes pour l'utilisation de la mémoire par les composants Milvus :<ul>
<li>Apprendre à <a href="/docs/fr/v2.4.x/allocate.md#standalone">allouer des ressources</a></li>
</ul></li>
<li>Si vous recherchez des informations sur la mise à l'échelle d'un cluster Milvus :<ul>
<li>Apprendre à <a href="/docs/fr/v2.4.x/scaleout.md">faire évoluer un cluster Milvus</a></li>
</ul></li>
</ul>
