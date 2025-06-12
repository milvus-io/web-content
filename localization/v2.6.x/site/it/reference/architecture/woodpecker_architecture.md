---
id: woodpecker_architecture.md
title: Woodpecker
summary: >-
  Woodpecker è un sistema WAL cloud-native in Milvus 2.6. Con un'architettura a
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
<li><strong>Backend di archiviazione</strong>: Supporta servizi di storage scalabili e a basso costo, come S3, GCS e file system come EFS</li>
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
<h3 id="MemoryBuffer---Lightweight-and-maintenance-free" class="common-anchor-header">MemoryBuffer - Leggero e senza manutenzione</h3><p>La modalità MemoryBuffer offre un'opzione di distribuzione semplice e leggera in cui Woodpecker bufferizza temporaneamente le scritture in arrivo in memoria e le invia periodicamente a un servizio di storage di oggetti nel cloud. I metadati sono gestiti tramite <strong>etcd</strong> per garantire coerenza e coordinamento. Questa modalità è più adatta per carichi di lavoro batch-heavy in distribuzioni su scala ridotta o in ambienti di produzione che privilegiano la semplicità rispetto alle prestazioni, soprattutto quando la bassa latenza di scrittura non è fondamentale.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>distribuzione della modalità di memoria woodpecker</span> </span></p>
<h3 id="QuorumBuffer---Optimized-for-low-latency-high-durability" class="common-anchor-header">QuorumBuffer - Ottimizzata per bassa latenza e alta durata</h3><p>La modalità QuorumBuffer è progettata per carichi di lavoro di lettura/scrittura sensibili alla latenza e ad alta frequenza, che richiedono una reattività in tempo reale e una forte tolleranza agli errori. In questa modalità, Woodpecker funziona come un buffer di scrittura ad alta velocità con scritture quorum a tre repliche, garantendo una forte coerenza e un'elevata disponibilità.</p>
<p>Una scrittura è considerata riuscita una volta replicata su almeno due dei tre nodi, e in genere viene completata entro una cifra di millisecondi, dopodiché i dati vengono scaricati in modo asincrono sull'archivio oggetti del cloud per una durata a lungo termine. Questa architettura riduce al minimo lo stato sui nodi, elimina la necessità di grandi volumi di dischi locali ed evita le complesse riparazioni anti-entropia spesso necessarie nei sistemi tradizionali basati sul quorum.</p>
<p>Il risultato è un livello WAL snello e robusto, ideale per gli ambienti di produzione mission-critical in cui coerenza, disponibilità e ripristino rapido sono essenziali.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>implementazione della modalità di memoria woodpecker</span> </span></p>
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
    </button></h2><p>L'architettura cloud-native di Woodpecker semplifica la distribuzione, riduce la manutenzione e migliora l'affidabilità.</p>
<h3 id="Simplified-infrastructure-management" class="common-anchor-header">Gestione semplificata dell'infrastruttura</h3><ul>
<li><strong>Nessuna gestione dello storage locale:</strong> Elimina la necessità di gestire volumi di dischi, RAID o guasti ai dischi.</li>
<li><strong>Ridotta dipendenza dall'hardware:</strong> Elimina la configurazione e il monitoraggio dell'hardware; la durata e la disponibilità sono gestite dallo storage a oggetti nel cloud.</li>
<li><strong>Pianificazione semplificata della capacità:</strong> Lo storage si scala automaticamente con il cloud object storage, eliminando la necessità di previsioni manuali.</li>
</ul>
<h3 id="Simplified-deployment" class="common-anchor-header">Distribuzione semplificata</h3><ul>
<li><strong>Modalità MemoryBuffer:</strong> Utilizza risorse minime e si integra con il cloud storage, ideale per lo sviluppo e la produzione su piccola scala.</li>
<li><strong>Modalità QuorumBuffer:</strong> Offre un'affidabilità di livello aziendale senza la complessità dello storage distribuito tradizionale.</li>
</ul>
<h2 id="Cost-efficiency-and-resource-optimization" class="common-anchor-header">Efficienza dei costi e ottimizzazione delle risorse<button data-href="#Cost-efficiency-and-resource-optimization" class="anchor-icon" translate="no">
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
<li><strong>Utilizzo ridotto della memoria:</strong> Il buffering efficiente riduce i requisiti di memoria rispetto ai broker tradizionali.</li>
<li><strong>Scalabilità elastica:</strong> Lo storage cloud pay-as-you-go elimina l'over-provisioning.</li>
<li><strong>Riduzione dell'overhead dell'infrastruttura:</strong> Un minor numero di componenti significa minori costi di implementazione e manutenzione.</li>
</ul>
<h3 id="Storage-cost-advantages" class="common-anchor-header">Vantaggi in termini di costi di storage</h3><ul>
<li><strong>Archiviazione a livelli:</strong> Migrazione automatica dei dati a livelli di archiviazione cloud convenienti per la conservazione a lungo termine.</li>
<li><strong>Compressione e deduplicazione:</strong> Le funzionalità integrate riducono i costi di archiviazione senza ulteriori sforzi operativi.</li>
<li><strong>Nessun overhead di replica:</strong> La durata è gestita dal cloud storage, eliminando la necessità di gestire manualmente le repliche.</li>
</ul>
<h2 id="High-availability-and-disaster-recovery" class="common-anchor-header">Alta disponibilità e disaster recovery<button data-href="#High-availability-and-disaster-recovery" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Simplified-fault-tolerance" class="common-anchor-header">Tolleranza ai guasti semplificata</h3><ul>
<li><strong>Durabilità cloud-native:</strong> Sfrutta le garanzie di durabilità a 11 nove (99,999999999%) dei provider cloud.</li>
<li><strong>Recupero rapido:</strong> Lo stato locale minimo consente la sostituzione rapida dei nodi e il ripristino del cluster.</li>
<li><strong>Resilienza interregionale:</strong> Supporta la replica interregionale utilizzando le funzionalità di storage del cloud.</li>
</ul>
<h3 id="Operational-resilience" class="common-anchor-header">Resilienza operativa</h3><ul>
<li><strong>Meno punti di guasto:</strong> Il numero ridotto di componenti riduce il rischio di guasti.</li>
<li><strong>Failover automatico:</strong> La ridondanza dello storage nel cloud semplifica il failover.</li>
<li><strong>Backup semplificato:</strong> Lo storage cloud integrato fornisce backup e versioning automatici.</li>
</ul>
<h2 id="Development-and-operational-experience" class="common-anchor-header">Esperienza di sviluppo e operativa<button data-href="#Development-and-operational-experience" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Improved-development-workflow" class="common-anchor-header">Flusso di lavoro di sviluppo migliorato</h3><ul>
<li><strong>Configurazione dell'ambiente più rapida:</strong> Le dipendenze minime accelerano lo sviluppo e i test.</li>
<li><strong>Architettura coerente:</strong> Design uniforme tra sviluppo, staging e produzione.</li>
<li><strong>Integrazione cloud-nativa:</strong> Compatibilità perfetta con i servizi cloud e l'orchestrazione dei container.</li>
</ul>
<h3 id="Enhanced-production-operations" class="common-anchor-header">Operazioni di produzione migliorate</h3><ul>
<li><strong>Prestazioni prevedibili:</strong> Risultati coerenti su tutte le scale e le configurazioni di distribuzione.</li>
<li><strong>Aggiornamenti semplificati:</strong> Il design stateless consente aggiornamenti continui con tempi di inattività minimi.</li>
<li><strong>Prevedibilità delle risorse:</strong> Utilizzo più stabile delle risorse rispetto ai message broker tradizionali.</li>
</ul>
<p>Per i database vettoriali che supportano carichi di lavoro mission-critical RAG, agenti AI e ricerca a bassa latenza, questi vantaggi operativi sono rivoluzionari. La transizione da complessi stack di message broker all'architettura semplificata di Woodpecker non solo aumenta le prestazioni, ma riduce anche in modo significativo l'onere operativo per i team di sviluppo e di infrastruttura.</p>
<p>Mentre l'infrastruttura cloud continua a evolversi con innovazioni come S3 Express One Zone, l'architettura di Woodpecker consente alle aziende di beneficiare automaticamente di questi progressi senza richiedere grandi cambiamenti operativi o riprogettazioni del sistema.</p>
