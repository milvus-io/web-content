---
id: architecture_overview.md
summary: >-
  Milvus offre un database vettoriale veloce, affidabile e stabile, progettato
  specificamente per la ricerca di similarità e l'intelligenza artificiale.
title: Panoramica sull'architettura di Milvus
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Panoramica sull'architettura di Milvus<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus è un database vettoriale <strong>open source</strong> e <strong>cloud-native</strong> progettato per la ricerca di similarità ad alte prestazioni su enormi set di dati vettoriali. Basato su librerie di ricerca vettoriale diffuse quali Faiss, HNSW, DiskANN e SCANN, potenzia le applicazioni di intelligenza artificiale e gli scenari di recupero di dati non strutturati. Prima di procedere, è opportuno acquisire familiarità con i <a href="/docs/it/glossary.md">principi di base</a> del recupero tramite embedding.</p>
<h2 id="Architecture-Diagram" class="common-anchor-header">Diagramma dell’architettura<button data-href="#Architecture-Diagram" class="anchor-icon" translate="no">
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
    </button></h2><p>Il diagramma seguente illustra l’architettura di alto livello di Milvus, mettendo in evidenza il suo design modulare, scalabile e cloud-native con livelli di archiviazione e di elaborazione completamente disaggregati.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" /> 
   <span>Schema_dell’architettura</span>
  
 </span></p>
<h2 id="Architectural-Principles" class="common-anchor-header">Principi architetturali<button data-href="#Architectural-Principles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus segue il principio della disaggregazione del piano dati e del piano di controllo, comprendendo quattro livelli principali che sono reciprocamente indipendenti in termini di scalabilità e ripristino di emergenza. Questa architettura a storage condiviso, con livelli di storage e di elaborazione completamente disaggregati, consente la scalabilità orizzontale dei nodi di elaborazione, implementando al contempo Woodpecker come livello WAL zero-disk per una maggiore elasticità e una riduzione dei costi operativi.</p>
<p>Separando l’elaborazione dei flussi nel Nodo di streaming e l’elaborazione in batch nel Nodo di query e nel Nodo dati, Milvus raggiunge prestazioni elevate soddisfacendo al contempo i requisiti di elaborazione in tempo reale.</p>
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">Livello 1: Livello di accesso<button data-href="#Layer-1-Access-Layer" class="anchor-icon" translate="no">
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
    </button></h3><p>Composto da un gruppo di proxy stateless, il livello di accesso è il livello frontale del sistema e l’endpoint per gli utenti. Convalida le richieste dei client e filtra i risultati restituiti:</p>
<ul>
<li>Il proxy è di per sé stateless. Fornisce un indirizzo di servizio unificato utilizzando componenti di bilanciamento del carico quali Nginx, Kubernetes Ingress, NodePort e LVS.</li>
<li>Poiché Milvus impiega un’architettura di elaborazione massivamente parallela (MPP), il proxy aggrega ed elabora i risultati intermedi prima di restituire i risultati finali al client.</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">Livello 2: Coordinatore<button data-href="#Layer-2-Coordinator" class="anchor-icon" translate="no">
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
    </button></h3><p>Il Coordinatore funge da cervello di Milvus. In ogni momento, è attivo esattamente un solo Coordinatore nell’intero cluster, responsabile del mantenimento della topologia del cluster, della pianificazione di tutti i tipi di attività e della garanzia della coerenza a livello di cluster.</p>
<p>Di seguito sono riportate alcune delle attività gestite dal <strong>Coordinatore</strong>:</p>
<ul>
<li><strong>Gestione DDL/DCL/TSO</strong>: gestisce le richieste relative al linguaggio di definizione dei dati (DDL) e al linguaggio di controllo dei dati (DCL), quali la creazione o l’eliminazione di collezioni, partizioni o indici, oltre a gestire il timestamp Oracle (TSO) e l’emissione dei time ticker.</li>
<li><strong>Gestione del servizio di streaming</strong>: collega il Write-Ahead Log (WAL) ai nodi di streaming e fornisce il servizio di discovery per il servizio di streaming.</li>
<li><strong>Gestione delle query</strong>: gestisce la topologia e il bilanciamento del carico per i nodi di query, oltre a fornire e gestire le viste delle query in esecuzione per guidare l’instradamento delle query.</li>
<li><strong>Gestione dei dati storici</strong>: distribuisce attività offline, quali la compattazione e la creazione di indici, ai nodi dati e gestisce la topologia dei segmenti e delle viste dei dati.</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">Livello 3: Nodi di lavoro<button data-href="#Layer-3-Worker-Nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>Le braccia e le gambe. I nodi di lavoro sono semplici esecutori che seguono le istruzioni del coordinatore. I nodi di lavoro sono senza stato grazie alla separazione tra archiviazione ed elaborazione e possono facilitare la scalabilità orizzontale del sistema e il ripristino di emergenza quando vengono distribuiti su Kubernetes. Esistono tre tipi di nodi di lavoro:</p>
<h3 id="Streaming-node" class="common-anchor-header">Nodo di streaming<button data-href="#Streaming-node" class="anchor-icon" translate="no">
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
    </button></h3><p>Il nodo di streaming funge da “mini-cervello” a livello di shard, fornendo garanzie di coerenza a livello di shard e il ripristino in caso di guasto sulla base dello storage WAL sottostante. Allo stesso tempo, il nodo di streaming è anche responsabile dell’elaborazione delle query sui dati in crescita e della generazione dei piani di query. Inoltre, gestisce la conversione dei dati in crescita in dati sigillati (storici).</p>
<h3 id="Query-node" class="common-anchor-header">Nodo di query<button data-href="#Query-node" class="anchor-icon" translate="no">
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
    </button></h3><p>Il nodo di query carica i dati storici dall’object storage e fornisce le funzionalità di interrogazione dei dati storici.</p>
<h3 id="Data-node" class="common-anchor-header">Nodo dati<button data-href="#Data-node" class="anchor-icon" translate="no">
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
    </button></h3><p>Il nodo dati è responsabile dell’elaborazione offline dei dati storici, come la compattazione e la creazione di indici.</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">Livello 4: Archiviazione<button data-href="#Layer-4-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>L'archiviazione è la spina dorsale del sistema, responsabile della persistenza dei dati. Comprende il meta-storage, il log broker e l'object storage.</p>
<h3 id="Meta-storage" class="common-anchor-header">Meta-storage<button data-href="#Meta-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Il meta-storage memorizza istantanee di metadati quali lo schema delle collezioni e i checkpoint di consumo dei messaggi. La memorizzazione dei metadati richiede un’elevatissima disponibilità, una forte coerenza e il supporto delle transazioni; pertanto, Milvus ha scelto etcd come meta-store. Milvus utilizza etcd anche per la registrazione dei servizi e il controllo dello stato di salute.</p>
<h3 id="Object-storage" class="common-anchor-header">Archiviazione a oggetti<button data-href="#Object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>L'archiviazione a oggetti garantisce la persistenza dei dati e dei file di indice. Milvus supporta backend di archiviazione a oggetti quali MinIO, AWS S3 e Azure Blob Storage. I QueryNode memorizzano nella cache i dati e gli indici necessari per elaborare le query.</p>
<p>Con <a href="/docs/it/tiered-storage-overview.md">lo storage a più livelli</a>, disponibile in Milvus 2.6.4 e versioni successive, i QueryNodes possono caricare prima i metadati dei segmenti e recuperare i dati dei campi o gli indici su richiesta, anziché caricare tutto al momento dell’inizializzazione. Lo storage a oggetti remoto rimane la fonte persistente; l’eliminazione di una voce dalla cache locale non comporta la cancellazione dei dati memorizzati. L’accesso ai dati non memorizzati nella cache aumenta l’I/O di archiviazione e può incrementare la latenza delle query. Utilizza <a href="/docs/it/warm-up.md">la funzione “Warm Up”</a> per campi o indici sensibili alla latenza e valuta la latenza delle query “fredde” e della cache “calda” prima di scegliere una strategia di caricamento.</p>
<h3 id="WAL-storage" class="common-anchor-header">Archiviazione WAL<button data-href="#WAL-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>L’archiviazione del Write-Ahead Log (WAL) è alla base della durabilità e della coerenza dei dati nei sistemi distribuiti. Prima che qualsiasi modifica venga confermata, viene prima registrata in un log, garantendo che, in caso di guasto, sia possibile ripristinare esattamente il punto in cui si era interrotto.</p>
<p>Tra le implementazioni WAL più comuni figurano Kafka, Pulsar e Woodpecker. A differenza delle soluzioni tradizionali basate su disco, Woodpecker adotta un design cloud-native e zero-disk che scrive direttamente nell’object storage. Questo approccio si adatta facilmente alle vostre esigenze e semplifica le operazioni eliminando il sovraccarico legato alla gestione dei dischi locali.</p>
<p>Registrando in anticipo ogni operazione di scrittura, il livello WAL garantisce un meccanismo affidabile a livello di sistema per il ripristino e la coerenza, indipendentemente da quanto diventi complesso il vostro ambiente distribuito.</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">Flusso dei dati e categorie di API<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>Le API di Milvus sono classificate in base alla loro funzione e seguono percorsi specifici all’interno dell’architettura:</p>
<table>
<thead>
<tr><th>Categoria API</th><th>Operazioni</th><th>API di esempio</th><th>Flusso dell'architettura</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>Schema e controllo degli accessi</td><td><code translate="no">createCollection</code>, <code translate="no">dropCollection</code>, <code translate="no">hasCollection</code>, <code translate="no">createPartition</code></td><td>Livello di accesso → Coordinatore</td></tr>
<tr><td><strong>DML</strong></td><td>Manipolazione dei dati</td><td><code translate="no">insert</code>, <code translate="no">delete</code>, <code translate="no">upsert</code></td><td>Livello di accesso → Nodo di elaborazione dello streaming</td></tr>
<tr><td><strong>DQL</strong></td><td>Interrogazione dei dati</td><td><code translate="no">search</code>, <code translate="no">query</code></td><td>Livello di accesso → Nodo di elaborazione batch (nodi di interrogazione)</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">Esempio di flusso di dati: operazione di ricerca<button data-href="#Example-Data-Flow-Search-Operation" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Il client invia una richiesta di ricerca tramite SDK/API RESTful</li>
<li>Il bilanciatore di carico instrada la richiesta verso un proxy disponibile nel livello di accesso</li>
<li>Il proxy utilizza la cache di instradamento per determinare i nodi di destinazione; contatta il coordinatore solo se la cache non è disponibile</li>
<li>Il proxy inoltra la richiesta ai nodi di streaming appropriati, i quali poi si coordinano con i nodi di query per la ricerca dei dati sigillati, eseguendo al contempo la ricerca dei dati in crescita a livello locale</li>
<li>I nodi di query caricano i segmenti sigillati dall’Object Storage secondo necessità ed eseguono la ricerca a livello di segmento</li>
<li>I risultati della ricerca subiscono una riduzione a più livelli: i nodi di query riducono i risultati su più segmenti, i nodi di streaming riducono i risultati provenienti dai nodi di query e il proxy riduce i risultati provenienti da tutti i nodi di streaming prima di restituirli al cliente</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">Esempio di flusso di dati: inserimento dei dati<button data-href="#Example-Data-Flow-Data-Insertion" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Il client invia una richiesta di inserimento con dati vettoriali</li>
<li>Il livello di accesso convalida e inoltra la richiesta al nodo di streaming</li>
<li>Il nodo di streaming registra l’operazione nel WAL Storage per garantire la durabilità</li>
<li>I dati vengono elaborati in tempo reale e resi disponibili per le query</li>
<li>Quando i segmenti raggiungono la capacità massima, il nodo di streaming avvia la conversione in segmenti sigillati</li>
<li>Il nodo dati gestisce la compattazione e crea indici sui segmenti sigillati, memorizzando i risultati nell’Object Storage</li>
<li>I nodi di query caricano gli indici appena creati e sostituiscono i dati corrispondenti in crescita</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">Prossimi passi<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>Esplora i <a href="/docs/it/main_components.md">componenti principali</a> per conoscere i dettagli specifici dell’implementazione</li>
<li>Scopri i flussi di lavoro <a href="/docs/it/data_processing.md">di elaborazione dei dati</a> e le strategie di ottimizzazione</li>
<li>Comprendi il <a href="/docs/it/tune_consistency.md">modello di coerenza</a> e le garanzie sulle transazioni in Milvus</li>
</ul>
