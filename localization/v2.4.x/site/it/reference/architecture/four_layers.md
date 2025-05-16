---
id: four_layers.md
summary: Struttura di disaggregazione tra archiviazione e calcolo in Milvus.
title: Disaggregazione storage/computing
---
<h1 id="StorageComputing-Disaggregation" class="common-anchor-header">Disaggregazione storage/computing<button data-href="#StorageComputing-Disaggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>Seguendo il principio della disaggregazione del piano dati e del piano di controllo, Milvus comprende quattro livelli che sono reciprocamente indipendenti in termini di scalabilità e disaster recovery.</p>
<h2 id="Access-layer" class="common-anchor-header">Livello di accesso<button data-href="#Access-layer" class="anchor-icon" translate="no">
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
    </button></h2><p>Composto da un gruppo di proxy stateless, il livello di accesso è il livello frontale del sistema e l'endpoint per gli utenti. Convalida le richieste dei clienti e riduce i risultati restituiti:</p>
<ul>
<li>Il proxy è di per sé stateless. Fornisce un indirizzo di servizio unificato utilizzando componenti di bilanciamento del carico come Nginx, Kubernetes Ingress, NodePort e LVS.</li>
<li>Poiché Milvus impiega un'architettura di elaborazione massicciamente parallela (MPP), il proxy aggrega e post-elabora i risultati intermedi prima di restituire i risultati finali al cliente.</li>
</ul>
<h2 id="Coordinator-service" class="common-anchor-header">Servizio coordinatore<button data-href="#Coordinator-service" class="anchor-icon" translate="no">
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
    </button></h2><p>Il servizio di coordinamento assegna i compiti ai nodi worker e funziona come cervello del sistema. Tra i compiti che si assume ci sono la gestione della topologia del cluster, il bilanciamento del carico, la generazione dei timestamp, la dichiarazione dei dati e la gestione dei dati.</p>
<p>Esistono tre tipi di coordinatori: il coordinatore radice (root coord), il coordinatore dati (data coord) e il coordinatore di query (query coord).</p>
<h3 id="Root-coordinator-root-coord" class="common-anchor-header">Coordinatore radice (root coord)</h3><p>Il root coord gestisce le richieste del linguaggio di definizione dei dati (DDL) e del linguaggio di controllo dei dati (DCL), come la creazione o l'eliminazione di collezioni, partizioni o indici, nonché la gestione di TSO (timestamp Oracle) e l'emissione di ticker temporali.</p>
<h3 id="Query-coordinator-query-coord" class="common-anchor-header">Coordinatore di query (query coord)</h3><p>Query coord gestisce la topologia e il bilanciamento del carico per i nodi di interrogazione e il passaggio da segmenti in crescita a segmenti chiusi.</p>
<h3 id="Data-coordinator-data-coord" class="common-anchor-header">Coordinatore dei dati (data coord)</h3><p>Il coordinatore dei dati gestisce la topologia dei nodi dati e dei nodi indice, mantiene i metadati e attiva le operazioni di flush, compattazione e creazione di indici e altre operazioni in background sui dati.</p>
<h2 id="Worker-nodes" class="common-anchor-header">Nodi lavoratori<button data-href="#Worker-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>I nodi worker sono esecutori "muti" che seguono le istruzioni del servizio coordinatore ed eseguono i comandi del linguaggio di manipolazione dei dati (DML) dal proxy. I nodi worker sono stateless grazie alla separazione tra storage e calcolo e possono facilitare lo scale-out del sistema e il disaster recovery quando vengono distribuiti su Kubernetes. Esistono tre tipi di nodi worker:</p>
<h3 id="Query-node" class="common-anchor-header">Nodo di interrogazione</h3><p>I nodi di interrogazione recuperano i dati di log incrementali e li trasformano in segmenti crescenti abbonandosi al broker di log, caricano i dati storici dallo storage a oggetti ed eseguono ricerche ibride tra dati vettoriali e scalari.</p>
<h3 id="Data-node" class="common-anchor-header">Nodo dati</h3><p>I nodi dati recuperano i dati di log incrementali iscrivendosi al log broker, elaborano le richieste di mutazione e impacchettano i dati di log in snapshot di log e li archiviano nell'object storage.</p>
<h3 id="Index-node" class="common-anchor-header">Nodo indice</h3><p>I nodi indice costruiscono gli indici. Non è necessario che siano residenti in memoria e possono essere implementati con il framework serverless.</p>
<h2 id="Storage" class="common-anchor-header">Archiviazione<button data-href="#Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Lo storage è l'ossatura del sistema, responsabile della persistenza dei dati. Comprende il meta storage, il log broker e l'object storage.</p>
<h3 id="Meta-storage" class="common-anchor-header">Meta-archiviazione</h3><p>Il meta storage memorizza le istantanee dei metadati, come lo schema di raccolta e i checkpoint di consumo dei messaggi. L'archiviazione dei metadati richiede una disponibilità estremamente elevata, una forte coerenza e il supporto delle transazioni, quindi Milvus ha scelto etcd per questo scopo. Milvus utilizza etcd anche per la registrazione dei servizi e i controlli sullo stato di salute.</p>
<h3 id="Object-storage" class="common-anchor-header">Archiviazione a oggetti</h3><p>L'archiviazione a oggetti memorizza i file snapshot dei log, i file indice per i dati scalari e vettoriali e i risultati intermedi delle query. Milvus utilizza MinIO come storage a oggetti e può essere facilmente distribuito su AWS S3 e Azure Blob, due dei servizi di storage più popolari ed economici al mondo. Tuttavia, lo storage a oggetti ha un'elevata latenza di accesso e si fa pagare in base al numero di query. Per migliorare le prestazioni e ridurre i costi, Milvus intende implementare la separazione dei dati cold-hot su un pool di cache basato su memoria o SSD.</p>
<h3 id="Log-broker" class="common-anchor-header">Broker di log</h3><p>Il log broker è un sistema pub-sub che supporta la riproduzione. È responsabile della persistenza dei dati in streaming e della notifica degli eventi. Inoltre, garantisce l'integrità dei dati incrementali quando i nodi worker si riprendono da un guasto del sistema. Milvus Distributed utilizza Pulsar come log broker, mentre Milvus Standalone utilizza RocksDB. Il log broker può essere facilmente sostituito con piattaforme di archiviazione di dati in streaming come Kafka.</p>
<p>Milvus segue il principio "log as data", quindi Milvus non mantiene una tabella fisica ma garantisce l'affidabilità dei dati attraverso la persistenza dei log e gli snapshot dei log.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/log_mechanism.png" alt="Log_mechanism" class="doc-image" id="log_mechanism" />
   </span> <span class="img-wrapper"> <span>Meccanismo di log</span> </span></p>
<p>Il log broker è la spina dorsale di Milvus. È responsabile della persistenza dei dati e della disaggregazione in lettura e scrittura, grazie al suo meccanismo innato pub-sub. L'illustrazione precedente mostra una rappresentazione semplificata del meccanismo, in cui il sistema è diviso in due ruoli, il log broker (per mantenere la sequenza dei log) e il log subscriber. Il primo registra tutte le operazioni che modificano gli stati della collezione; il secondo sottoscrive la sequenza di log per aggiornare i dati locali e fornisce servizi sotto forma di copie in sola lettura. Il meccanismo pub-sub lascia spazio anche all'estendibilità del sistema in termini di acquisizione dei dati di modifica (CDC) e di distribuzione distribuita a livello globale.</p>
<h2 id="Whats-next" class="common-anchor-header">Cosa c'è dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Per maggiori dettagli sull'architettura di Milvus, leggere <a href="/docs/it/v2.4.x/main_components.md">Componenti principali</a>.</li>
</ul>
