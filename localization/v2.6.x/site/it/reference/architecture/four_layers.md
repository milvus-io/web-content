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
    </button></h2><p>Composto da un gruppo di proxy stateless, il livello di accesso è il livello frontale del sistema e l'endpoint per gli utenti. Convalida le richieste dei client e riduce i risultati restituiti:</p>
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
    </button></h2><p>Il servizio di coordinamento assegna i compiti ai nodi worker e funziona come cervello del sistema. I compiti che si assume sono la gestione della topologia del cluster, il bilanciamento del carico, la generazione dei timestamp, la dichiarazione dei dati e la gestione dei dati.</p>
<p>Esistono tre tipi di coordinatori: il coordinatore radice (root coord), il coordinatore dati (data coord) e il coordinatore delle query (query coord).</p>
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
    </button></h2><p>Le braccia e le gambe. I nodi worker sono esecutori muti che seguono le istruzioni del servizio coordinatore ed eseguono i comandi del linguaggio di manipolazione dei dati (DML) dal proxy. I nodi worker sono stateless grazie alla separazione di storage e calcolo e possono facilitare lo scale-out del sistema e il disaster recovery quando vengono distribuiti su Kubernetes. Esistono tre tipi di nodi worker:</p>
<h3 id="Query-node" class="common-anchor-header">Nodo di interrogazione</h3><p>Il nodo Query recupera i dati di log incrementali e li trasforma in segmenti crescenti abbonandosi al broker di log, carica i dati storici dallo storage a oggetti ed esegue ricerche ibride tra dati vettoriali e scalari.</p>
<h3 id="Data-node" class="common-anchor-header">Nodo dati</h3><p>Il nodo dati recupera i dati di log incrementali iscrivendosi al log broker, elabora le richieste di mutazione e impacchetta i dati di log in snapshot di log e li memorizza nell'object storage.</p>
<h3 id="Index-node" class="common-anchor-header">Nodo indice</h3><p>Il nodo indice costruisce gli indici.  I nodi indice non devono essere residenti in memoria e possono essere implementati con il framework serverless.</p>
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
<h3 id="Meta-storage" class="common-anchor-header">Meta-archiviazione</h3><p>Il meta storage memorizza le istantanee dei metadati, come gli schemi di raccolta e i checkpoint di consumo dei messaggi. La memorizzazione dei metadati richiede una disponibilità estremamente elevata, una forte coerenza e il supporto delle transazioni, per cui Milvus ha scelto etcd per il meta storage. Milvus utilizza etcd anche per la registrazione dei servizi e il controllo dello stato di salute.</p>
<h3 id="Object-storage" class="common-anchor-header">Archiviazione a oggetti</h3><p>Lo storage a oggetti memorizza i file snapshot dei log, i file indice per i dati scalari e vettoriali e i risultati intermedi delle query. Milvus utilizza MinIO come storage a oggetti e può essere facilmente distribuito su AWS S3 e Azure Blob, due dei servizi di storage più popolari ed economici al mondo. Tuttavia, lo storage a oggetti ha un'elevata latenza di accesso e si fa pagare in base al numero di query. Per migliorare le prestazioni e ridurre i costi, Milvus intende implementare la separazione dei dati cold-hot su un pool di cache basato su memoria o SSD.</p>
<h3 id="WAL-storage" class="common-anchor-header">Archiviazione WAL</h3><p>Lo storage WAL (Write-Ahead Log) è il fondamento della durabilità e della coerenza dei dati nei sistemi distribuiti. Prima che qualsiasi modifica venga impegnata, viene registrata in un registro, assicurando che, in caso di guasto, sia possibile recuperare esattamente il punto in cui si è lasciato.</p>
<p>Le implementazioni WAL più comuni includono Kafka, Pulsar e Woodpecker. A differenza delle soluzioni tradizionali basate su disco, Woodpecker adotta un design cloud-native a zero dischi che scrive direttamente sullo storage a oggetti. Questo approccio è in grado di scalare senza problemi con le vostre esigenze e semplifica le operazioni eliminando l'overhead della gestione dei dischi locali.</p>
<p>Registrando in anticipo ogni operazione di scrittura, il livello WAL garantisce un meccanismo affidabile a livello di sistema per il ripristino e la coerenza, indipendentemente dalla complessità dell'ambiente distribuito.</p>
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
<li>Per maggiori dettagli sull'architettura di Milvus, leggere <a href="/docs/it/main_components.md">Componenti principali</a>.</li>
</ul>
