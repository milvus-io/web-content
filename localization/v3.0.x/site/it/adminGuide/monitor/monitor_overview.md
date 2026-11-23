---
id: monitor_overview.md
title: Panoramica sul monitor
related_key: 'monitor, alert'
summary: >-
  Scopri come Prometheus e Grafana vengono utilizzati in Milvus per i servizi di
  monitoraggio e di allerta.
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Panoramica sul framework di monitoraggio Milvus<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>In questa sezione viene spiegato come Milvus utilizzi Prometheus per monitorare le metriche e Grafana per visualizzarle e creare avvisi.</p>
<h2 id="Prometheus-in-Milvus" class="common-anchor-header">Prometheus in Milvus<button data-href="#Prometheus-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a> è un toolkit open source di monitoraggio e allerta per le implementazioni di Kubernetes. Raccoglie e archivia le metriche come dati di serie temporali. Ciò significa che le metriche vengono archiviate con i timestamp al momento della registrazione, insieme a coppie chiave-valore opzionali chiamate etichette.</p>
<p>Attualmente Milvus utilizza i seguenti componenti di Prometheus:</p>
<ul>
<li>Endpoint Prometheus per estrarre i dati dagli endpoint impostati dagli esportatori.</li>
<li>L’operatore Prometheus per gestire in modo efficace le istanze di monitoraggio di Prometheus.</li>
<li>Kube-prometheus per fornire un monitoraggio end-to-end del cluster Kubernetes di facile utilizzo.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">Nomi delle metriche<button data-href="#Metric-names" class="anchor-icon" translate="no">
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
    </button></h3><p>Un nome di metrica valido in Prometheus contiene tre elementi: namespace, sottosistema e nome. Questi tre elementi sono collegati da "_".</p>
<p>Lo spazio dei nomi delle metriche Milvus monitorate da Prometheus è "milvus". Il sottosistema di una metrica è uno dei seguenti: "cdc", "cgo", "datacoord", "datanode", "indexnode", "logging", "meta", "msg_queue", "msgstream", "proxy", "querycoord", "querynode", "rootcoord", "storage", "streaming", "streamingcoord", "streamingnode" e "wal". Alcune metriche, come <code translate="no">milvus_build_info</code> e <code translate="no">milvus_num_node</code>, non hanno alcun sottosistema.</p>
<p>Ad esempio, la metrica di Milvus che calcola il numero totale di vettori interrogati si chiama <code translate="no">milvus_proxy_search_vectors_count</code>.</p>
<h3 id="Metric-types" class="common-anchor-header">Tipi di metriche<button data-href="#Metric-types" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus supporta quattro tipi di metriche:</p>
<ul>
<li>Contatore: un tipo di metrica cumulativa il cui valore può solo aumentare o essere azzerato al riavvio.</li>
<li>Gauge: un tipo di metrica il cui valore può aumentare o diminuire.</li>
<li>Istogramma: un tipo di metrica che viene conteggiata in base a intervalli configurabili. Un esempio comune è la durata delle richieste.</li>
<li>Riepilogo: un tipo di metrica simile all’istogramma che calcola quantili configurabili su una finestra temporale scorrevole.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">Etichette delle metriche<button data-href="#Metric-labels" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus distingue i campioni con lo stesso nome di metrica assegnando loro delle etichette. Un'etichetta è un determinato attributo di una metrica. Le metriche con lo stesso nome devono avere lo stesso valore per il campo <code translate="no">variable_labels</code>. La tabella seguente elenca i nomi e i significati delle etichette comuni delle metriche di Milvus.</p>
<table>
<thead>
<tr><th>Nome dell’etichetta</th><th>Definizione</th><th>Valori</th></tr>
</thead>
<tbody>
<tr><td>“node_id”</td><td>L’identità univoca di un ruolo.</td><td>Un ID univoco a livello globale generato da Milvus.</td></tr>
<tr><td>“status”</td><td>Lo stato di un’operazione o di una richiesta elaborata.</td><td>"abandon", "success" o "fail".</td></tr>
<tr><td>“query_type”</td><td>Il tipo di una richiesta di lettura.</td><td>“search” o "query".</td></tr>
<tr><td>“msg_type”</td><td>Il tipo di messaggi.</td><td>"insert", "delete", "search" o "query".</td></tr>
<tr><td>“segment_state”</td><td>Lo stato di un segmento.</td><td>"Sealed", "Growing", "Flushed", "Flushing", "Dropped" o "Importing".</td></tr>
<tr><td>“cache_state”</td><td>Lo stato di un oggetto memorizzato nella cache.</td><td>“hit” o "miss".</td></tr>
<tr><td>“cache_name”</td><td>Il nome di un oggetto memorizzato nella cache. Questa etichetta viene utilizzata insieme all’etichetta "cache_state".</td><td>Es. “CollectionID”, “Schema”, ecc.</td></tr>
<tr><td>“channel_name”</td><td>Topic fisici nell’archivio dei messaggi (Pulsar o Kafka).</td><td>Es.: "by-dev-rootcoord-dml_0", "by-dev-rootcoord-dml_255", ecc.</td></tr>
<tr><td>“function_name”</td><td>Il nome di una funzione che gestisce determinate richieste.</td><td>Es. "CreateCollection", "CreatePartition", "CreateIndex", ecc.</td></tr>
<tr><td>“user_name”</td><td>Il nome utente utilizzato per l’autenticazione.</td><td>Un nome utente a propria scelta.</td></tr>
<tr><td>“index_task_status”</td><td>Lo stato di un'attività di indicizzazione nel meta-storage.</td><td>"unissued", "in-progress", "failed", "finished" o "recycled".</td></tr>
</tbody>
</table>
<h2 id="Grafana-in-Milvus" class="common-anchor-header">Grafana in Milvus<button data-href="#Grafana-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a> è una piattaforma di visualizzazione open source in grado di connettersi a tutte le fonti di dati. Estrapolando le metriche, aiuta gli utenti a comprendere, analizzare e monitorare grandi quantità di dati.</p>
<p>Milvus utilizza le dashboard personalizzabili di Grafana per la visualizzazione delle metriche.</p>
<h2 id="Whats-next" class="common-anchor-header">Prossimi passi<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver appreso il flusso di lavoro di base relativo al monitoraggio e agli avvisi, scopri:</p>
<ul>
<li><a href="/docs/it/monitor.md">Implementare i servizi di monitoraggio</a></li>
<li><a href="/docs/it/visualize.md">Visualizzare le metriche di Milvus</a></li>
<li><a href="/docs/it/alert.md">Creare un avviso</a></li>
</ul>
