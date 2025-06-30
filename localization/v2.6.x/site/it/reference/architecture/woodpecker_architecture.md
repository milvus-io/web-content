---
id: woodpecker_architecture.md
title: Woodpecker
summary: >-
  Woodpecker è un sistema WAL cloud-nativo in Milvus 2.6. Con un'architettura a
  zero dischi e due modalità di implementazione, offre un elevato throughput, un
  basso overhead operativo e una scalabilità senza soluzione di continuità sullo
  storage a oggetti.
---
<h1 id="Woodpecker" class="common-anchor-header">Woodpecker<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus 2.6, Woodpecker sostituisce Kafka e Pulsar con un sistema di log write-ahead (WAL) appositamente costruito per il cloud. Progettato per l'archiviazione di oggetti, Woodpecker semplifica le operazioni, massimizza il throughput e scala senza sforzo.</p>
<p>Obiettivi di progettazione di Woodpecker:</p>
<ul>
<li><p>Massimo throughput in ambienti cloud</p></li>
<li><p>Registrazione durevole e di sola appendice per un ripristino affidabile</p></li>
<li><p>Minimo overhead operativo senza dischi locali o broker esterni</p></li>
</ul>
<h2 id="Zero-disk-architecture" class="common-anchor-header">Architettura a zero dischi<button data-href="#Zero-disk-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>L'innovazione principale di Woodpecker è la sua architettura a zero dischi:</p>
<ul>
<li>Tutti i dati di log sono memorizzati in uno storage a oggetti nel cloud (come Amazon S3, Google Cloud Storage o Alibaba OS).</li>
<li>I metadati sono gestiti attraverso archivi distribuiti di valori-chiave come <strong>etcd</strong>.</li>
<li>Nessuna dipendenza dal disco locale per le operazioni principali</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_layers.png" alt="woodpecker layers" class="doc-image" id="woodpecker-layers" />
   </span> <span class="img-wrapper"> <span>strati di woodpecker</span> </span></p>
<h2 id="Architecture-components" class="common-anchor-header">Componenti dell'architettura<button data-href="#Architecture-components" class="anchor-icon" translate="no">
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
    </button></h2><p>Una distribuzione standard di Woodpecker comprende i seguenti componenti:</p>
<ul>
<li><strong>Client</strong>: Livello di interfaccia per l'emissione di richieste di lettura e scrittura</li>
<li><strong>LogStore</strong>: Gestisce il buffering di scrittura ad alta velocità, i caricamenti asincroni sullo storage e la compattazione dei registri</li>
<li><strong>Backend di archiviazione</strong>: Supporta servizi di archiviazione scalabili e a basso costo come S3, GCS e file system come EFS</li>
<li><strong>Etcd</strong>: Memorizza i metadati e coordina lo stato dei log tra i nodi distribuiti.</li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">Modalità di distribuzione<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker offre due modalità di distribuzione per soddisfare le vostre esigenze specifiche:</p>
<h3 id="MemoryBuffer---Lightweight-and-maintenance-free" class="common-anchor-header">MemoryBuffer - Leggero e senza manutenzione</h3><p>La modalità MemoryBuffer offre un'opzione di distribuzione semplice e leggera in cui il client incorporato di Woodpecker bufferizza temporaneamente le scritture in arrivo in memoria e le invia periodicamente a un servizio di archiviazione di oggetti nel cloud. In questa modalità, il buffer di memoria è incorporato direttamente nel client, consentendo un batching efficiente prima del flushing su S3. I metadati sono gestiti tramite <strong>etcd</strong> per garantire coerenza e coordinamento. Questa modalità è più adatta per i carichi di lavoro pesanti in batch in distribuzioni su scala ridotta o in ambienti di produzione che privilegiano la semplicità rispetto alle prestazioni, soprattutto quando la bassa latenza di scrittura non è fondamentale.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>distribuzione della modalità di memoria woodpecker</span> </span></p>
<h3 id="QuorumBuffer---Optimized-for-low-latency-high-durability" class="common-anchor-header">QuorumBuffer - Ottimizzata per bassa latenza e alta durata</h3><p>La modalità QuorumBuffer è progettata per carichi di lavoro di lettura/scrittura sensibili alla latenza e ad alta frequenza, che richiedono una reattività in tempo reale e una forte tolleranza agli errori. In questa modalità, il client di Woodpecker interagisce con un sistema quorum a tre repliche per fornire un buffering di scrittura ad alta velocità, garantendo una forte coerenza e un'alta disponibilità attraverso il consenso distribuito.</p>
<p>Una scrittura è considerata riuscita quando il client replica con successo i dati su almeno due dei tre nodi del quorum, in genere completando il tutto entro una cifra di millisecondi, dopodiché i dati vengono scaricati in modo asincrono sullo storage di oggetti del cloud per una durata a lungo termine. Questa architettura riduce al minimo lo stato sui nodi, elimina la necessità di grandi volumi di dischi locali ed evita le complesse riparazioni anti-entropia spesso necessarie nei sistemi tradizionali basati sul quorum.</p>
<p>Il risultato è un livello WAL snello e robusto, ideale per gli ambienti di produzione mission-critical in cui coerenza, disponibilità e ripristino rapido sono essenziali.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_quorumbuffer_mode_deployment.png" alt="woodpecker quorum mode deployment" class="doc-image" id="woodpecker-quorum-mode-deployment" />
   </span> <span class="img-wrapper"> <span>implementazione della modalità quorum di woodpecker</span> </span></p>
<h2 id="Performance-benchmarks" class="common-anchor-header">Parametri di riferimento delle prestazioni<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Abbiamo eseguito benchmark completi per valutare le prestazioni di Woodpecker in una configurazione a singolo nodo, singolo client e singolo log-stream. I risultati sono stati impressionanti se confrontati con Kafka e Pulsar:</p>
<table>
<thead>
<tr><th>Sistema</th><th>Kafka</th><th>Pulsar</th><th>WP Minio</th><th>WP Locale</th><th>WP S3</th></tr>
</thead>
<tbody>
<tr><td>Velocità di trasmissione</td><td>129,96MB/s</td><td>107MB/s</td><td>71MB/s</td><td>450MB/s</td><td>750MB/s</td></tr>
<tr><td>latenza</td><td>58 ms</td><td>35 ms</td><td>184 ms</td><td>1,8 ms</td><td>166 ms</td></tr>
</tbody>
</table>
<p>Per contestualizzare, abbiamo misurato i limiti teorici di throughput di diversi backend di storage sulla nostra macchina di prova:</p>
<ul>
<li>MinIO: ~110 MB/s</li>
<li>File system locale: 600-750 MB/s</li>
<li>Amazon S3 (singola istanza EC2): fino a 1,1 GB/s</li>
</ul>
<p>Notevolmente, Woodpecker ha raggiunto costantemente il 60-80% del throughput massimo possibile per ogni backend, un livello di efficienza eccezionale per un middleware.</p>
<h3 id="Key-performance-insights" class="common-anchor-header">Principali informazioni sulle prestazioni</h3><ul>
<li>Modalità file system locale: Woodpecker ha raggiunto 450 MB/s - 3,5 volte più veloce di Kafka e 4,2 volte più veloce di Pulsar - con una latenza bassissima di soli 1,8 ms, che lo rende ideale per le implementazioni a singolo nodo ad alte prestazioni.</li>
<li>Modalità di archiviazione cloud (S3): Scrivendo direttamente su S3, Woodpecker ha raggiunto 750 MB/s (circa il 68% del limite teorico di S3), 5,8 volte superiore a Kafka e 7 volte superiore a Pulsar. Sebbene la latenza sia più elevata (166 ms), questa configurazione offre un throughput eccezionale per i carichi di lavoro orientati ai batch.</li>
<li>Modalità di archiviazione degli oggetti (MinIO): Anche con MinIO, Woodpecker ha raggiunto 71 MB/s, circa il 65% della capacità di MinIO. Queste prestazioni sono paragonabili a quelle di Kafka e Pulsar, ma con requisiti di risorse significativamente inferiori.</li>
</ul>
<p>Woodpecker è particolarmente ottimizzato per le scritture concomitanti ad alto volume, dove il mantenimento dell'ordine è fondamentale. Questi risultati riflettono solo le prime fasi di sviluppo: le ottimizzazioni in corso per quanto riguarda l'unione dell'I/O, il buffering intelligente e il prefetching dovrebbero portare le prestazioni ancora più vicino ai limiti teorici.</p>
<h2 id="Operational-benefits" class="common-anchor-header">Vantaggi operativi<button data-href="#Operational-benefits" class="anchor-icon" translate="no">
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
    </button></h2><p>L'architettura cloud-native di Woodpecker offre notevoli vantaggi operativi:</p>
<ul>
<li><strong>Zero gestione dello storage locale</strong>: Elimina la gestione dei volumi dei dischi, la configurazione RAID e i guasti hardware.</li>
<li><strong>Scalabilità automatica</strong>: Lo storage si adatta allo storage a oggetti del cloud senza dover pianificare la capacità.</li>
<li><strong>Efficienza dei costi</strong>: Storage pay-as-you-go con tiering e compressione automatici</li>
<li><strong>Alta disponibilità</strong>: Sfrutta la durata di 11 nove anni dei provider cloud con un ripristino rapido.</li>
<li><strong>Implementazione semplificata</strong>: Due modalità di distribuzione (MemoryBuffer/QuorumBuffer) per soddisfare le diverse esigenze operative</li>
<li><strong>Facilità di sviluppo</strong>: Configurazione dell'ambiente più rapida e architettura coerente in tutti gli ambienti</li>
</ul>
<p>Questi vantaggi rendono Woodpecker particolarmente prezioso per RAG mission-critical, agenti AI e carichi di lavoro di ricerca a bassa latenza, dove la semplicità operativa è importante quanto le prestazioni.</p>
