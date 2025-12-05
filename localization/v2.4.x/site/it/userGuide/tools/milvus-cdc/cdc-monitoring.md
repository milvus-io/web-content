---
id: cdc-monitoring.md
order: 4
summary: >-
  Milvus-CDC offre funzionalità di monitoraggio complete attraverso i cruscotti
  Grafana.
title: Monitoraggio
---
<h1 id="Monitoring" class="common-anchor-header">Monitoraggio<button data-href="#Monitoring" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC offre funzionalità di monitoraggio complete tramite dashboard Grafana, che consentono di visualizzare le metriche chiave e di garantire il buon funzionamento delle attività di Change Data Capture (CDC) e la salute del server.</p>
<h3 id="Metrics-for-CDC-tasks" class="common-anchor-header">Metriche per le attività CDC</h3><p>Per iniziare, importate il file <a href="https://github.com/zilliztech/milvus-cdc/blob/main/server/configs/cdc-grafana.json">cdc-grafana.json</a> in Grafana. Questo aggiungerà una dashboard specificamente progettata per monitorare lo stato delle attività CDC.</p>
<p><strong>Panoramica del cruscotto CDC Grafana</strong>:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-cdc-dashboard.png" alt="milvus-cdc-dashboard" class="doc-image" id="milvus-cdc-dashboard" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-dashboard</span> </span></p>
<p><strong>Metriche chiave spiegate:</strong></p>
<ul>
<li><p><strong>Attività</strong>: Numero di attività CDC in diversi stati, tra cui <strong>Iniziale</strong>, <strong>In esecuzione</strong> e <strong>In pausa</strong>.</p></li>
<li><p><strong>Totale richieste</strong>: numero totale di richieste ricevute da Milvus-CDC.</p></li>
<li><p><strong>Successo della richiesta</strong>: Numero di richieste ricevute con successo da Milvus-CDC.</p></li>
<li><p><strong>Numero di attività</strong>: Numero di attività negli stati <strong>Iniziale</strong>, <strong>Pausa</strong> ed <strong>Esecuzione</strong> nel tempo.</p></li>
<li><p><strong>Stato dell'attività</strong>: Stato dei singoli task.</p></li>
<li><p><strong>conteggio richieste</strong>: Numero di richieste totali e riuscite</p></li>
<li><p><strong>latenza delle richieste</strong>: Latenza delle richieste attraverso p99, media e altre statistiche.</p></li>
<li><p><strong>velocità dei dati di replica</strong>: Velocità dei dati di replica per le operazioni di lettura/scrittura.</p></li>
<li><p><strong>replicate tt lag</strong>: Tempo di ritardo della replica per le operazioni di lettura/scrittura.</p></li>
<li><p><strong>conteggio esecuzioni api</strong>: Numero di volte in cui sono state eseguite diverse API di Milvus-CDC.</p></li>
<li><p><strong>centro ts</strong>: Timestamp per le operazioni di lettura/scrittura.</p></li>
</ul>
