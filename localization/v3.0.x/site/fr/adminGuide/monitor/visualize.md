---
id: visualize.md
title: Visualiser les indicateurs
related_key: 'monitor, alert'
summary: Découvrez comment visualiser les métriques Milvus dans Grafana.
---
<h1 id="Visualize-Milvus-Metrics-in-Grafana" class="common-anchor-header">Visualisation des métriques Milvus dans Grafana<button data-href="#Visualize-Milvus-Metrics-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique explique comment visualiser les métriques Milvus à l'aide de Grafana.</p>
<p>Comme indiqué dans le <a href="/docs/fr/monitor.md">guide de surveillance</a>, les métriques contiennent des informations utiles, telles que la quantité de mémoire utilisée par un composant Milvus spécifique. La surveillance des métriques vous aide à mieux comprendre les performances de Milvus et son état de fonctionnement, ce qui vous permet d'ajuster l'allocation des ressources en temps opportun.</p>
<p>La visualisation consiste en un graphique illustrant l’évolution de l’utilisation des ressources au fil du temps, ce qui vous permet de repérer plus facilement et rapidement les changements dans l’utilisation des ressources, en particulier lorsqu’un événement se produit.</p>
<p>Ce tutoriel utilise Grafana, une plateforme open source dédiée à l’analyse de séries chronologiques, pour visualiser diverses métriques de performances d’un cluster Milvus déployé sur Kubernetes (K8s).</p>
<h2 id="Prerequisites" class="common-anchor-header">Prérequis<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Vous avez <a href="/docs/fr/install_cluster-helm.md">installé un cluster Milvus sur K8s.</a></li>
<li>Vous devez <a href="/docs/fr/monitor.md">configurer Prometheus</a> pour surveiller et collecter les métriques avant d’utiliser Grafana pour les visualiser. Si la configuration est réussie, vous pouvez accéder à Grafana à l’adresse <code translate="no">http://localhost:3000</code>. Vous pouvez également accéder à Grafana via l’ <code translate="no">user:password</code> par défaut de Grafana : <code translate="no">admin:admin</code>.</li>
</ul>
<h2 id="Visualize-metrics-using-Grafana" class="common-anchor-header">Visualiser les métriques à l’aide de Grafana<button data-href="#Visualize-metrics-using-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Download-and-import-dashboard" class="common-anchor-header">1. Télécharger et importer le tableau de bord<button data-href="#1-Download-and-import-dashboard" class="anchor-icon" translate="no">
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
    </button></h3><p>Téléchargez et importez le tableau de bord Milvus à partir du fichier JSON.</p>
<pre><code translate="no" class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/v3.0.5/deployments/monitor/grafana/milvus-dashboard.json
<button class="copy-code-btn"></button></code></pre>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/import_dashboard.png" alt="Download_and_import" class="doc-image" id="download_and_import" /> 
   <span>Télécharger_et_importer</span>
  
 </span></p>
<h3 id="2-View-metrics" class="common-anchor-header">2. Afficher les métriques<button data-href="#2-View-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>Sélectionnez l'instance Milvus que vous souhaitez surveiller. Vous verrez alors s'afficher le panneau des composants Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/grafana_select.png" alt="Select_instance" class="doc-image" id="select_instance" /> 
   <span>Sélectionner_l'instance</span>
  
 </span></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/grafana_panel.png" alt="Grafana_panel" class="doc-image" id="grafana_panel" /> 
   <span>Panneau_Grafana</span>
  
 </span></p>
<h2 id="Whats-next" class="common-anchor-header">Étapes suivantes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Si vous avez configuré Grafana pour visualiser les métriques Milvus, vous souhaiterez peut-être également :
<ul>
<li>Découvrir comment <a href="/docs/fr/alert.md">créer une alerte pour les services Milvus</a></li>
<li>Ajuster <a href="/docs/fr/allocate.md">l’allocation</a> de vos <a href="/docs/fr/allocate.md">ressources</a></li>
<li><a href="/docs/fr/scaleout.md">Faire évoluer un cluster Milvus vers le haut ou vers le bas</a></li>
</ul></li>
<li>Si vous souhaitez mettre à jour la version de Milvus,
<ul>
<li>consultez le <a href="/docs/fr/upgrade_milvus_cluster-operator.md">guide de mise à niveau d'un cluster Milvus</a> et <a href="/docs/fr/upgrade_milvus_standalone-operator.md">celui consacré à la mise à niveau de Milvus en mode autonome</a>.</li>
</ul></li>
</ul>
