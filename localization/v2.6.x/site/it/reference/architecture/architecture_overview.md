---
id: architecture_overview.md
summary: >-
  Milvus offre un database vettoriale veloce, affidabile e stabile, costruito
  appositamente per la ricerca di similarità e l'intelligenza artificiale.
title: Panoramica dell'architettura di Milvus
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Panoramica dell'architettura di Milvus<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus è un database vettoriale <strong>open-source</strong> e <strong>cloud-native</strong> progettato per la ricerca di similarità ad alte prestazioni su enormi insiemi di dati vettoriali. Costruito sulla base delle più diffuse librerie di ricerca vettoriale, tra cui Faiss, HNSW, DiskANN e SCANN, consente applicazioni di intelligenza artificiale e scenari di recupero di dati non strutturati. Prima di procedere, è necessario familiarizzare con i <a href="/docs/it/v2.6.x/glossary.md">principi di base</a> dell'embedding retrieval.</p>
<h2 id="Architecture-Diagram" class="common-anchor-header">Diagramma dell'architettura<button data-href="#Architecture-Diagram" class="anchor-icon" translate="no">
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
    </button></h2><p>Il diagramma seguente illustra l'architettura di alto livello di Milvus, mostrando il suo design modulare, scalabile e cloud-native con livelli di archiviazione e calcolo completamente disaggregati.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>Diagramma_di_architettura</span> </span></p>
<h2 id="Architectural-Principles" class="common-anchor-header">Principi architettonici<button data-href="#Architectural-Principles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus segue il principio della disaggregazione del piano dati e del piano di controllo, comprendendo quattro livelli principali che sono reciprocamente indipendenti in termini di scalabilità e disaster recovery. Questa architettura di storage condiviso con livelli di storage e di calcolo completamente disaggregati consente di scalare orizzontalmente i nodi di calcolo e di implementare Woodpecker come livello WAL a zero dischi per una maggiore elasticità e una riduzione dei costi operativi.</p>
<p>Separando l'elaborazione dei flussi in Streaming Node e l'elaborazione batch in Query Node e Data Node, Milvus raggiunge prestazioni elevate e soddisfa contemporaneamente i requisiti di elaborazione in tempo reale.</p>
<h2 id="Detailed-Layer-Architecture" class="common-anchor-header">Architettura dettagliata dei livelli<button data-href="#Detailed-Layer-Architecture" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">Livello 1: Livello di accesso</h3><p>Composto da un gruppo di proxy stateless, il livello di accesso è il livello frontale del sistema e l'endpoint per gli utenti. Convalida le richieste dei client e riduce i risultati restituiti:</p>
<ul>
<li>Il proxy è di per sé stateless. Fornisce un indirizzo di servizio unificato utilizzando componenti di bilanciamento del carico come Nginx, Kubernetes Ingress, NodePort e LVS.</li>
<li>Poiché Milvus impiega un'architettura di elaborazione massicciamente parallela (MPP), il proxy aggrega e post-elabora i risultati intermedi prima di restituire i risultati finali al cliente.</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">Livello 2: Coordinatore</h3><p>Il Coordinator è il cervello di Milvus. In qualsiasi momento, nell'intero cluster è attivo esattamente un Coordinatore, responsabile di mantenere la topologia del cluster, di programmare tutti i tipi di attività e di garantire la coerenza a livello di cluster.</p>
<p>Di seguito sono elencati alcuni dei compiti gestiti dal <strong>Coordinatore</strong>:</p>
<ul>
<li><strong>Gestione DDL/DCL/TSO</strong>: Gestisce le richieste del linguaggio di definizione dei dati (DDL) e del linguaggio di controllo dei dati (DCL), come la creazione o l'eliminazione di collezioni, partizioni o indici, nonché la gestione di timestamp Oracle (TSO) e l'emissione di time ticker.</li>
<li><strong>Gestione del servizio di streaming</strong>: Lega il Write-Ahead Log (WAL) con i nodi di streaming e fornisce il rilevamento dei servizi per il servizio di streaming.</li>
<li><strong>Gestione delle query</strong>: Gestisce la topologia e il bilanciamento del carico per i nodi di query e fornisce e gestisce le viste di query di servizio per guidare l'instradamento delle query.</li>
<li><strong>Gestione dei dati storici</strong>: Distribuisce le attività offline, come la compattazione e la creazione di indici, ai Data Nodes e gestisce la topologia dei segmenti e delle viste dei dati.</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">Livello 3: Nodi lavoratori</h3><p>Le braccia e le gambe. I nodi worker sono esecutori muti che seguono le istruzioni del coordinatore. I nodi worker sono stateless grazie alla separazione di storage e calcolo e possono facilitare lo scale-out del sistema e il disaster recovery quando sono distribuiti su Kubernetes. Esistono tre tipi di nodi worker:</p>
<h3 id="Streaming-node" class="common-anchor-header">Nodo di streaming</h3><p>Il nodo di streaming funge da "mini-cervello" a livello di shard, fornendo garanzie di coerenza a livello di shard e il recupero degli errori basato sul WAL Storage sottostante. Nel frattempo, lo Streaming Node è anche responsabile dell'interrogazione dei dati in crescita e della generazione dei piani di query. Inoltre, gestisce anche la conversione dei dati in crescita in dati sigillati (storici).</p>
<h3 id="Query-node" class="common-anchor-header">Nodo Query</h3><p>Il nodo Query carica i dati storici dall'object storage e fornisce l'interrogazione dei dati storici.</p>
<h3 id="Data-node" class="common-anchor-header">Nodo dati</h3><p>Il nodo Dati è responsabile dell'elaborazione offline dei dati storici, come la compattazione e la creazione di indici.</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">Livello 4: archiviazione</h3><p>Lo storage è l'ossatura del sistema, responsabile della persistenza dei dati. Comprende il meta storage, il log broker e l'object storage.</p>
<h3 id="Meta-storage" class="common-anchor-header">Meta storage</h3><p>Il meta storage memorizza le istantanee dei metadati, come gli schemi di raccolta e i checkpoint di consumo dei messaggi. La memorizzazione dei metadati richiede una disponibilità estremamente elevata, una forte coerenza e il supporto delle transazioni, quindi Milvus ha scelto etcd per il meta storage. Milvus utilizza etcd anche per la registrazione dei servizi e il controllo dello stato di salute.</p>
<h3 id="Object-storage" class="common-anchor-header">Archiviazione a oggetti</h3><p>Lo storage a oggetti memorizza i file snapshot dei log, i file indice per i dati scalari e vettoriali e i risultati intermedi delle query. Milvus utilizza MinIO come storage a oggetti e può essere facilmente distribuito su AWS S3 e Azure Blob, due dei servizi di storage più popolari ed economici al mondo. Tuttavia, lo storage a oggetti ha un'elevata latenza di accesso e si fa pagare in base al numero di query. Per migliorare le prestazioni e ridurre i costi, Milvus intende implementare la separazione dei dati cold-hot su un pool di cache basato su memoria o SSD.</p>
<h3 id="WAL-storage" class="common-anchor-header">Archiviazione WAL</h3><p>Lo storage WAL (Write-Ahead Log) è il fondamento della durabilità e della coerenza dei dati nei sistemi distribuiti. Prima che qualsiasi modifica venga impegnata, viene registrata in un registro, assicurando che, in caso di guasto, sia possibile recuperare esattamente il punto in cui si è lasciato.</p>
<p>Le implementazioni WAL più comuni includono Kafka, Pulsar e Woodpecker. A differenza delle soluzioni tradizionali basate su disco, Woodpecker adotta un design cloud-native a zero dischi che scrive direttamente sullo storage a oggetti. Questo approccio è in grado di scalare senza problemi con le vostre esigenze e semplifica le operazioni eliminando l'overhead della gestione dei dischi locali.</p>
<p>Registrando in anticipo ogni operazione di scrittura, il livello WAL garantisce un meccanismo affidabile a livello di sistema per il ripristino e la coerenza, indipendentemente dalla complessità dell'ambiente distribuito.</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">Flusso di dati e categorie di API<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>Le API di Milvus sono classificate in base alla loro funzione e seguono percorsi specifici attraverso l'architettura:</p>
<table>
<thead>
<tr><th>Categoria API</th><th>Operazioni</th><th>Esempi di API</th><th>Flusso dell'architettura</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>Schema e controllo dell'accesso</td><td><code translate="no">createCollection</code>, <code translate="no">dropCollection</code>, <code translate="no">hasCollection</code>, <code translate="no">createPartition</code></td><td>Livello di accesso → Coordinatore</td></tr>
<tr><td><strong>DML</strong></td><td>Manipolazione dei dati</td><td><code translate="no">insert</code>, <code translate="no">delete</code>, <code translate="no">upsert</code></td><td>Livello di accesso → Nodo operaio di streaming</td></tr>
<tr><td><strong>DQL</strong></td><td>Interrogazione dati</td><td><code translate="no">search</code>, <code translate="no">query</code></td><td>Livello di accesso → Nodo di lavoro batch (nodi di interrogazione)</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">Esempio di flusso di dati: operazione di ricerca</h3><ol>
<li>Il client invia una richiesta di ricerca tramite SDK/API RESTful</li>
<li>Il Load Balancer instrada la richiesta verso il Proxy disponibile nel livello di accesso.</li>
<li>Il proxy utilizza la cache di routing per determinare i nodi di destinazione; contatta il coordinatore solo se la cache non è disponibile.</li>
<li>Il proxy inoltra la richiesta ai nodi di streaming appropriati, che si coordinano con i nodi di interrogazione per la ricerca di dati sigillati mentre eseguono localmente la ricerca di dati in crescita.</li>
<li>I Query Nodes caricano i segmenti sigillati dall'Object Storage secondo necessità ed eseguono la ricerca a livello di segmento.</li>
<li>I risultati della ricerca vengono ridotti a più livelli: I nodi di interrogazione riducono i risultati su più segmenti, i nodi di streaming riducono i risultati dei nodi di interrogazione e il proxy riduce i risultati di tutti i nodi di streaming prima di restituirli al client.</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">Esempio di flusso di dati: inserimento di dati</h3><ol>
<li>Il client invia una richiesta di inserimento con dati vettoriali</li>
<li>Il livello di accesso convalida e inoltra la richiesta al nodo di streaming.</li>
<li>Il nodo di streaming registra l'operazione nello storage WAL per garantire la durata.</li>
<li>I dati vengono elaborati in tempo reale e resi disponibili per le interrogazioni.</li>
<li>Quando i segmenti raggiungono la capacità, lo Streaming Node attiva la conversione in segmenti sigillati</li>
<li>Il Data Node gestisce la compattazione e costruisce indici in cima ai segmenti sigillati, memorizzando i risultati nell'Object Storage.</li>
<li>I nodi di interrogazione caricano gli indici appena costruiti e sostituiscono i dati in crescita corrispondenti.</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">Cosa c'è dopo<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>Esplorare i <a href="/docs/it/v2.6.x/main_components.md">componenti principali</a> per conoscere le specifiche dell'implementazione</li>
<li>Imparare a conoscere i flussi di lavoro <a href="/docs/it/v2.6.x/data_processing.md">dell'elaborazione dei dati</a> e le strategie di ottimizzazione</li>
<li>Comprendere il <a href="/docs/it/v2.6.x/consistency.md">modello di consistenza</a> e le garanzie di transazione in Milvus</li>
</ul>
