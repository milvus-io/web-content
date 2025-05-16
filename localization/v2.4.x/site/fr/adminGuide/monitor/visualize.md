---
id: visualize.md
title: Visualiser les mesures
related_key: 'monitor, alert'
summary: Découvrez comment visualiser les métriques Milvus dans Grafana.
---
<h1 id="Visualize-Milvus-Metrics-in-Grafana" class="common-anchor-header">Visualiser les métriques Milvus dans Grafana<button data-href="#Visualize-Milvus-Metrics-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique décrit comment visualiser les métriques Milvus à l'aide de Grafana.</p>
<p>Comme décrit dans le <a href="/docs/fr/v2.4.x/monitor.md">guide de suivi</a>, les métriques contiennent des informations utiles telles que la quantité de mémoire utilisée par un composant Milvus spécifique. Le suivi des métriques vous aide à mieux comprendre les performances de Milvus et son état d'exécution afin que vous puissiez ajuster l'allocation des ressources en temps voulu.</p>
<p>La visualisation est un graphique montrant l'évolution de l'utilisation des ressources dans le temps, ce qui vous permet de voir et de remarquer rapidement les modifications de l'utilisation des ressources, en particulier lorsqu'un événement se produit.</p>
<p>Ce tutoriel utilise Grafana, une plateforme open-source pour l'analyse de séries temporelles, pour visualiser diverses mesures de performance d'un cluster Milvus déployé sur Kubernetes (K8s).</p>
<h2 id="Prerequisites" class="common-anchor-header">Conditions préalables<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Vous avez <a href="/docs/fr/v2.4.x/install_cluster-helm.md">installé un cluster Milvus sur K8s)</a>.</li>
<li>Vous devez <a href="/docs/fr/v2.4.x/monitor.md">configurer Prometheus</a> pour surveiller et collecter des métriques avant d'utiliser Grafana pour visualiser les métriques. Si la configuration est réussie, vous pouvez accéder à Grafana à l'adresse <code translate="no">http://localhost:3000</code>. Vous pouvez également accéder à Grafana en utilisant l'adresse par défaut de Grafana <code translate="no">user:password</code>, à savoir <code translate="no">admin:admin</code>.</li>
</ul>
<h2 id="Visualize-metrics-using-Grafana" class="common-anchor-header">Visualisation des mesures à l'aide de Grafana<button data-href="#Visualize-metrics-using-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Download-and-import-dashboard" class="common-anchor-header">1. Télécharger et importer le tableau de bord</h3><p>Téléchargez et importez le tableau de bord Milvus à partir du fichier JSON.</p>
<pre><code translate="no">wget https://raw.githubusercontent.com/milvus-io/milvus/2.2.0/deployments/monitor/grafana/milvus-dashboard.json
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/import_dashboard.png" alt="Download_and_import" class="doc-image" id="download_and_import" />
   </span> <span class="img-wrapper"> <span>Télécharger et importer</span> </span></p>
<h3 id="2-View-metrics" class="common-anchor-header">2. Visualiser les métriques</h3><p>Sélectionnez l'instance Milvus que vous souhaitez surveiller. Le panneau des composants Milvus s'affiche alors.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grafana_select.png" alt="Select_instance" class="doc-image" id="select_instance" />
   </span> <span class="img-wrapper"> <span>Sélectionner l'instance</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grafana_panel.png" alt="Grafana_panel" class="doc-image" id="grafana_panel" />
   </span> <span class="img-wrapper"> <span>Panneau Grafana</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">Et ensuite ?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Si vous avez configuré Grafana pour visualiser les métriques Milvus, vous pouvez également.. :<ul>
<li>Apprendre à <a href="/docs/fr/v2.4.x/alert.md">créer une alerte pour les services Milvus</a></li>
<li>Ajuster l'<a href="/docs/fr/v2.4.x/allocate.md">allocation des ressources</a></li>
<li><a href="/docs/fr/v2.4.x/scaleout.md">Réduire ou augmenter la taille d'un cluster Milvus</a></li>
</ul></li>
<li>Si vous souhaitez mettre à niveau la version de Milvus,<ul>
<li>Lisez le <a href="/docs/fr/v2.4.x/upgrade_milvus_cluster-operator.md">guide de mise à niveau de Milvus cluster</a> et <a href="/docs/fr/v2.4.x/upgrade_milvus_standalone-operator.md">celui de mise à niveau de Milvus standalone</a>.</li>
</ul></li>
</ul>
