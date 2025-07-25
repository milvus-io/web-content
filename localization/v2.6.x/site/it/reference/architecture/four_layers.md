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
<h2 id="Coordinator" class="common-anchor-header">Coordinatore<button data-href="#Coordinator" class="anchor-icon" translate="no">
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
    </button></h2><p>Il <strong>Coordinatore</strong> è il cervello di Milvus. In qualsiasi momento, nell'intero cluster è attivo un solo coordinatore, responsabile del mantenimento della topologia del cluster, della programmazione di tutti i tipi di task e della coerenza a livello di cluster.</p>
<p>Di seguito sono elencati alcuni dei compiti gestiti dal <strong>Coordinatore</strong>:</p>
<ul>
<li><strong>Gestione DDL/DCL/TSO</strong>: Gestisce le richieste del linguaggio di definizione dei dati (DDL) e del linguaggio di controllo dei dati (DCL), come la creazione o l'eliminazione di collezioni, partizioni o indici, nonché la gestione di timestamp Oracle (TSO) e l'emissione di time ticker.</li>
<li><strong>Gestione del servizio di streaming</strong>: Lega il Write-Ahead Log (WAL) con i nodi di streaming e fornisce il rilevamento dei servizi per il servizio di streaming.</li>
<li><strong>Gestione delle query</strong>: Gestisce la topologia e il bilanciamento del carico per i nodi di query e fornisce e gestisce le viste di query di servizio per guidare l'instradamento delle query.</li>
<li><strong>Gestione dei dati storici</strong>: Distribuisce le attività offline, come la compattazione e la creazione di indici, ai Data Nodes e gestisce la topologia dei segmenti e delle viste dei dati.</li>
</ul>
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
    </button></h2><p>Le braccia e le gambe. I nodi operativi sono esecutori muti che seguono le istruzioni del coordinatore. I nodi worker sono stateless grazie alla separazione di storage e calcolo e possono facilitare lo scale-out del sistema e il disaster recovery quando vengono distribuiti su Kubernetes. Esistono tre tipi di nodi worker:</p>
<h3 id="Streaming-node" class="common-anchor-header">Nodo di streaming</h3><p>Il nodo di streaming funge da "mini-cervello" a livello di shard, fornendo garanzie di coerenza a livello di shard e il recupero degli errori basato sul WAL Storage sottostante. Nel frattempo, lo Streaming Node è anche responsabile dell'interrogazione dei dati in crescita e della generazione dei piani di query. Inoltre, gestisce anche la conversione dei dati in crescita in dati sigillati (storici).</p>
<h3 id="Query-node" class="common-anchor-header">Nodo Query</h3><p>Il nodo Query carica i dati storici dall'object storage e fornisce l'interrogazione dei dati storici.</p>
<h3 id="Data-node" class="common-anchor-header">Nodo dati</h3><p>Il nodo Dati è responsabile dell'elaborazione offline dei dati storici, come la compattazione e la creazione di indici.</p>
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
<h3 id="Meta-storage" class="common-anchor-header">Meta storage</h3><p>Il meta storage memorizza le istantanee dei metadati, come gli schemi di raccolta e i checkpoint di consumo dei messaggi. La memorizzazione dei metadati richiede una disponibilità estremamente elevata, una forte coerenza e il supporto delle transazioni, quindi Milvus ha scelto etcd per il meta storage. Milvus utilizza etcd anche per la registrazione dei servizi e il controllo dello stato di salute.</p>
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
<li>Per maggiori dettagli sull'architettura di Milvus, leggere <a href="/docs/it/v2.6.x/main_components.md">Componenti principali</a>.</li>
</ul>
