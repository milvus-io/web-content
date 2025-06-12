---
id: milvus-cdc-overview.md
order: 1
summary: >-
  Milvus-CDC è uno strumento di facile utilizzo in grado di acquisire e
  sincronizzare i dati incrementali delle istanze Milvus.
title: Panoramica del CDC
---
<h1 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC è uno strumento di facile utilizzo in grado di acquisire e sincronizzare i dati incrementali nelle istanze Milvus. Garantisce l'affidabilità dei dati aziendali trasferendoli senza soluzione di continuità tra le istanze di origine e di destinazione, consentendo di semplificare il backup incrementale e il disaster recovery.</p>
<h2 id="Key-capabilities" class="common-anchor-header">Funzionalità principali<button data-href="#Key-capabilities" class="anchor-icon" translate="no">
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
<li><p><strong>Sincronizzazione sequenziale dei dati</strong>: Assicura l'integrità e la coerenza dei dati sincronizzando le modifiche dei dati in modo sequenziale tra le istanze Milvus.</p></li>
<li><p><strong>Replica incrementale dei dati</strong>: Replica i dati incrementali, compresi gli inserimenti e le eliminazioni, da Milvus di origine a Milvus di destinazione, offrendo un'archiviazione persistente.</p></li>
<li><p><strong>Gestione delle attività CDC</strong>: Consente la gestione delle attività CDC tramite richieste OpenAPI, tra cui la creazione, l'interrogazione dello stato e l'eliminazione delle attività CDC.</p></li>
</ul>
<p>Inoltre, stiamo pianificando di espandere le nostre capacità per includere il supporto per l'integrazione con i sistemi di elaborazione dei flussi in futuro.</p>
<h2 id="Architecture" class="common-anchor-header">Architettura<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-CDC adotta un'architettura con due componenti principali: un server HTTP che gestisce i task e i metadati e <strong>corelib</strong> che sincronizza l'esecuzione dei task con un lettore che ottiene i dati dall'istanza Milvus di origine e uno scrittore che invia i dati elaborati all'istanza Milvus di destinazione.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-cdc-architecture.png" alt="milvus-cdc-architecture" class="doc-image" id="milvus-cdc-architecture" />
   </span> <span class="img-wrapper"> <span>architettura milvus-cdc</span> </span></p>
<p>Nel diagramma precedente,</p>
<ul>
<li><p><strong>Server HTTP</strong>: Gestisce le richieste degli utenti, esegue le attività e mantiene i metadati. Serve come piano di controllo per l'orchestrazione dei task all'interno del sistema Milvus-CDC.</p></li>
<li><p><strong>Corelib</strong>: Responsabile dell'effettiva sincronizzazione dei task. Include un componente di lettura che recupera le informazioni dall'etcd e dalla coda di messaggi (MQ) del Milvus di origine e un componente di scrittura che traduce i messaggi dall'MQ in parametri API per il sistema Milvus e invia queste richieste al Milvus di destinazione per completare il processo di sincronizzazione.</p></li>
</ul>
<h2 id="Workflow" class="common-anchor-header">Flusso di lavoro<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>Il flusso di elaborazione dei dati Milvus-CDC prevede le seguenti fasi:</p>
<ol>
<li><p><strong>Creazione di un'attività</strong>: Gli utenti avviano un'attività CDC tramite richieste HTTP.</p></li>
<li><p><strong>Recupero dei metadati</strong>: Il sistema recupera i metadati specifici della raccolta dall'etcd di Milvus, comprese le informazioni sul canale e sul checkpoint della raccolta.</p></li>
<li><p><strong>Connessione MQ</strong>: Con i metadati a disposizione, il sistema si connette all'MQ per iniziare a sottoscrivere il flusso di dati.</p></li>
<li><p><strong>Elaborazione dei dati</strong>: I dati provenienti da MQ vengono letti, analizzati e trasmessi utilizzando l'SDK Go o elaborati per replicare le operazioni eseguite nel Milvus di origine.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-cdc-workflow.png" alt="milvus-cdc-workflow" class="doc-image" id="milvus-cdc-workflow" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-flusso di lavoro</span> </span></p>
<h2 id="Limits" class="common-anchor-header">Limiti<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><strong>Sincronizzazione incrementale dei dati</strong>: Attualmente Milvus-CDC è progettato per sincronizzare solo dati incrementali. Se la vostra azienda necessita di un backup completo dei dati, <a href="https://milvus.io/community">contattateci</a> per assistenza.</p></li>
<li><p><strong>Ambito di sincronizzazione</strong>: Attualmente, Milvus-CDC può sincronizzare i dati a livello di cluster. Stiamo lavorando per aggiungere il supporto per la sincronizzazione dei dati a livello di collezione nelle prossime versioni.</p></li>
<li><p><strong>Richieste API supportate</strong>: Milvus-CDC supporta attualmente le seguenti richieste API. Nelle prossime versioni si prevede di estendere il supporto ad altre richieste:</p>
<ul>
<li><p>Creare/Abbandonare una raccolta</p></li>
<li><p>Inserimento/Cancellazione/Upsert</p></li>
<li><p>Creare/togliere partizione</p></li>
<li><p>Creare/togliere indice</p></li>
<li><p>Carica/Rilascia/Flush</p></li>
<li><p>Carica/Rilascia partizione</p></li>
<li><p>Creare/togliere database</p></li>
</ul></li>
</ul>
