---
id: monitor_overview.md
title: Panoramica del monitor
related_key: 'monitor, alert'
summary: >-
  Scoprite come Prometheus e Grafana vengono utilizzati in Milvus per i servizi
  di monitoraggio e allerta.
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Panoramica del quadro di monitoraggio di Milvus<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento spiega come Milvus utilizza Prometheus per monitorare le metriche e Grafana per visualizzare le metriche e creare avvisi.</p>
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a> è un toolkit open-source per il monitoraggio e gli avvisi per le implementazioni Kubernetes. Raccoglie e memorizza le metriche come dati di serie temporali. Ciò significa che le metriche sono memorizzate con timestamp quando vengono registrate, insieme a coppie chiave-valore opzionali chiamate etichette.</p>
<p>Attualmente Milvus utilizza i seguenti componenti di Prometheus:</p>
<ul>
<li>Prometheus endpoint per estrarre i dati dagli endpoint impostati dagli esportatori.</li>
<li>Operatore Prometheus per gestire efficacemente le istanze di monitoraggio di Prometheus.</li>
<li>Kube-prometheus per fornire un monitoraggio end-to-end del cluster Kubernetes facile da gestire.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">Nomi delle metriche</h3><p>Un nome di metrica valido in Prometheus contiene tre elementi: spazio dei nomi, sottosistema e nome. Questi tre elementi sono collegati con &quot;_&quot;.</p>
<p>Lo spazio dei nomi delle metriche Milvus monitorate da Prometheus è &quot;milvus&quot;. A seconda del ruolo a cui appartiene una metrica, il suo sottosistema deve essere uno dei seguenti otto ruoli: &quot;rootcoord&quot;, &quot;proxy&quot;, &quot;querycoord&quot;, &quot;querynode&quot;, &quot;indexcoord&quot;, &quot;indexnode&quot;, &quot;datacoord&quot;, &quot;datanode&quot;.</p>
<p>Ad esempio, la metrica di Milvus che calcola il numero totale di vettori interrogati si chiama <code translate="no">milvus_proxy_search_vectors_count</code>.</p>
<h3 id="Metric-types" class="common-anchor-header">Tipi di metriche</h3><p>Prometheus supporta quattro tipi di metriche:</p>
<ul>
<li>Counter: un tipo di metrica cumulativa il cui valore può aumentare o essere azzerato solo al riavvio.</li>
<li>Gauge: un tipo di metrica il cui valore può salire o scendere.</li>
<li>Istogramma: un tipo di metrica che viene contata in base a bucket configurabili. Un esempio comune è la durata delle richieste.</li>
<li>Riepilogo: un tipo di metrica simile all'istogramma che calcola i quantili configurabili su una finestra temporale scorrevole.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">Etichette delle metriche</h3><p>Prometheus differenzia i campioni con lo stesso nome di metrica etichettandoli. Un'etichetta è un determinato attributo di una metrica. Le metriche con lo stesso nome devono avere lo stesso valore per il campo <code translate="no">variable_labels</code>. La tabella seguente elenca i nomi e i significati delle etichette comuni delle metriche Milvus.</p>
<table>
<thead>
<tr><th>Nome dell'etichetta</th><th>Definizione</th><th>Valori</th></tr>
</thead>
<tbody>
<tr><td>"node_id"</td><td>L'identità unica di un ruolo.</td><td>Un ID unico a livello globale generato da milvus.</td></tr>
<tr><td>"status"</td><td>Lo stato di un'operazione o di una richiesta elaborata.</td><td>&quot;abbandono&quot;, &quot;successo&quot; o &quot;fallimento&quot;.</td></tr>
<tr><td>"Tipo_di_query"</td><td>Il tipo di richiesta di lettura.</td><td>&quot;search&quot; o &quot;query&quot;.</td></tr>
<tr><td>"msg_type"</td><td>Il tipo di messaggi.</td><td>&quot;insert&quot;, &quot;delete&quot;, &quot;search&quot; o &quot;query&quot;.</td></tr>
<tr><td>"stato_segmento"</td><td>Lo stato di un segmento.</td><td>&quot;Sigillato&quot;, &quot;In crescita&quot;, &quot;Spurgato&quot;, &quot;Eliminato&quot; o &quot;Importazione&quot;.</td></tr>
<tr><td>"Stato_cache</td><td>Lo stato di un oggetto memorizzato nella cache.</td><td>&quot;hit&quot; o &quot;miss&quot;.</td></tr>
<tr><td>"cache_name"</td><td>Il nome di un oggetto memorizzato nella cache. Questa etichetta viene utilizzata insieme all'etichetta &quot;cache_state&quot;.</td><td>Ad esempio, &quot;CollectionID&quot;, &quot;Schema&quot;, ecc.</td></tr>
<tr><td>&quot;nome_canale&quot;</td><td>Argomenti fisici nell'archiviazione dei messaggi (Pulsar o Kafka).</td><td>Ad esempio, &quot;by-dev-rootcoord-dml_0&quot;, &quot;by-dev-rootcoord-dml_255&quot;, ecc.</td></tr>
<tr><td>"nome_funzione"</td><td>Il nome di una funzione che gestisce determinate richieste.</td><td>Ad esempio, &quot;CreateCollection&quot;, &quot;CreatePartition&quot;, &quot;CreateIndex&quot;, ecc.</td></tr>
<tr><td>"nome_utente"</td><td>Il nome dell'utente utilizzato per l'autenticazione.</td><td>Un nome utente di vostra preferenza.</td></tr>
<tr><td>"stato_attività_indice"</td><td>Lo stato di un'attività di indice nel meta-deposito.</td><td>&quot;non emesso&quot;, &quot;in corso&quot;, &quot;fallito&quot;, &quot;finito&quot; o &quot;riciclato&quot;.</td></tr>
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a> è uno stack di visualizzazione open-source in grado di connettersi con tutte le fonti di dati. Grazie all'estrazione di metriche, aiuta gli utenti a comprendere, analizzare e monitorare dati enormi.</p>
<p>Milvus utilizza i cruscotti personalizzabili di Grafana per la visualizzazione delle metriche.</p>
<h2 id="Whats-next" class="common-anchor-header">Il prossimo passo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver appreso il flusso di lavoro di base del monitoraggio e degli avvisi, imparate:</p>
<ul>
<li><a href="/docs/it/v2.4.x/monitor.md">Distribuire i servizi di monitoraggio</a></li>
<li><a href="/docs/it/v2.4.x/visualize.md">Visualizzare le metriche di Milvus</a></li>
<li><a href="/docs/it/v2.4.x/alert.md">Creare un avviso</a></li>
</ul>
