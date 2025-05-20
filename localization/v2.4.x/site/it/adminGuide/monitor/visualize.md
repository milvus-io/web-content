---
id: visualize.md
title: Visualizzare le metriche
related_key: 'monitor, alert'
summary: Imparate a visualizzare le metriche di Milvus in Grafana.
---
<h1 id="Visualize-Milvus-Metrics-in-Grafana" class="common-anchor-header">Visualizzare le metriche di Milvus in Grafana<button data-href="#Visualize-Milvus-Metrics-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento descrive come visualizzare le metriche di Milvus utilizzando Grafana.</p>
<p>Come descritto nella <a href="/docs/it/v2.4.x/monitor.md">guida al monitoraggio</a>, le metriche contengono informazioni utili come la quantità di memoria utilizzata da uno specifico componente di Milvus. Il monitoraggio delle metriche aiuta a comprendere meglio le prestazioni di Milvus e il suo stato di funzionamento, in modo da poter regolare tempestivamente l'allocazione delle risorse.</p>
<p>La visualizzazione è un grafico che mostra la variazione dell'utilizzo delle risorse nel tempo, il che rende più facile vedere e notare rapidamente i cambiamenti nell'utilizzo delle risorse, soprattutto quando si verifica un evento.</p>
<p>Questa esercitazione utilizza Grafana, una piattaforma open-source per l'analisi delle serie temporali, per visualizzare varie metriche delle prestazioni di un cluster Milvus distribuito su Kubernetes (K8s).</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>È stato <a href="/docs/it/v2.4.x/install_cluster-helm.md">installato un cluster Milvus su K8s)</a>.</li>
<li>È necessario <a href="/docs/it/v2.4.x/monitor.md">configurare Prometheus</a> per monitorare e raccogliere le metriche prima di utilizzare Grafana per visualizzarle. Se la configurazione è riuscita, si può accedere a Grafana all'indirizzo <code translate="no">http://localhost:3000</code>. Oppure si può accedere a Grafana utilizzando il sito predefinito <code translate="no">user:password</code> di <code translate="no">admin:admin</code>.</li>
</ul>
<h2 id="Visualize-metrics-using-Grafana" class="common-anchor-header">Visualizzare le metriche con Grafana<button data-href="#Visualize-metrics-using-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Download-and-import-dashboard" class="common-anchor-header">1. Scaricare e importare la dashboard</h3><p>Scaricare e importare la dashboard di Milvus dal file JSON.</p>
<pre><code translate="no">wget https://raw.githubusercontent.com/milvus-io/milvus/2.2.0/deployments/monitor/grafana/milvus-dashboard.json
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/import_dashboard.png" alt="Download_and_import" class="doc-image" id="download_and_import" />
   </span> <span class="img-wrapper"> <span>Scaricare_e_importare</span> </span></p>
<h3 id="2-View-metrics" class="common-anchor-header">2. Visualizzare le metriche</h3><p>Selezionare l'istanza Milvus che si desidera monitorare. Quindi è possibile visualizzare il pannello dei componenti di Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grafana_select.png" alt="Select_instance" class="doc-image" id="select_instance" />
   </span> <span class="img-wrapper"> <span>Selezionare l'istanza</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grafana_panel.png" alt="Grafana_panel" class="doc-image" id="grafana_panel" />
   </span> <span class="img-wrapper"> <span>Pannello Grafana</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">Cosa succede dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Se avete impostato Grafana per visualizzare le metriche di Milvus, potreste anche:<ul>
<li>Imparare a <a href="/docs/it/v2.4.x/alert.md">creare un'allerta per i servizi Milvus</a></li>
<li>Regolare l'<a href="/docs/it/v2.4.x/allocate.md">allocazione delle risorse</a></li>
<li><a href="/docs/it/v2.4.x/scaleout.md">Ridimensionare o scalare un cluster Milvus</a></li>
</ul></li>
<li>Se siete interessati ad aggiornare la versione di Milvus,<ul>
<li>Leggete la <a href="/docs/it/v2.4.x/upgrade_milvus_cluster-operator.md">guida per l'aggiornamento di Milvus cluster</a> e <a href="/docs/it/v2.4.x/upgrade_milvus_standalone-operator.md">quella per l'aggiornamento di Milvus standalone</a>.</li>
</ul></li>
</ul>
