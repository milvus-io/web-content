---
id: streaming_service.md
title: Servizio di streaming
summary: >-
  Il servizio di streaming è un concetto per il modulo del sistema di streaming
  interno di Milvus, costruito attorno al registro di scrittura (WAL) per
  supportare varie funzioni legate allo streaming.
---
<h1 id="Streaming-Service" class="common-anchor-header">Servizio di streaming<button data-href="#Streaming-Service" class="anchor-icon" translate="no">
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
    </button></h1><p>Il <strong>servizio di streaming</strong> è un concetto per il modulo interno del sistema di streaming di Milvus, costruito attorno al registro di scrittura (WAL) per supportare varie funzioni legate allo streaming. Queste includono l'ingestione/sottoscrizione di dati in streaming, il ripristino dello stato del cluster in caso di errore, la conversione dei dati in streaming in dati storici e le query sui dati in crescita. Dal punto di vista architetturale, il servizio di streaming è composto da tre componenti principali:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_distributed_arch.png" alt="Streaming Distributed Arc" class="doc-image" id="streaming-distributed-arc" />
   </span> <span class="img-wrapper"> <span>Arco distribuito di streaming</span> </span></p>
<ul>
<li><p><strong>Coordinatore di streaming</strong>: Un componente logico nel nodo coordinatore. Utilizza Etcd per la scoperta dei servizi per individuare i nodi di streaming disponibili ed è responsabile del binding del WAL ai nodi di streaming corrispondenti. Registra anche un servizio per esporre la topologia di distribuzione del WAL, consentendo ai client di streaming di conoscere il nodo di streaming appropriato per un determinato WAL.</p></li>
<li><p><strong>Cluster di nodi di streaming</strong>: Un cluster di nodi worker di streaming responsabili di tutte le attività di elaborazione dello streaming, come l'aggiunta di wal, il recupero dello stato e l'interrogazione dei dati in crescita.</p></li>
<li><p><strong>Client di streaming</strong>: Un client Milvus sviluppato internamente che incapsula funzionalità di base come la scoperta dei servizi e la verifica della disponibilità. Viene utilizzato per avviare operazioni come la scrittura di messaggi e la sottoscrizione.</p></li>
</ul>
<h2 id="Message" class="common-anchor-header">Messaggio<button data-href="#Message" class="anchor-icon" translate="no">
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
    </button></h2><p>Lo Streaming Service è un sistema di streaming guidato dai log, quindi tutte le operazioni di scrittura in Milvus (come DML e DDL) sono astratte come <strong>messaggi</strong>.</p>
<ul>
<li><p>A ogni messaggio il servizio di streaming assegna un campo <strong>Timestamp Oracle (TSO)</strong>, che indica l'ordine del messaggio nel WAL. L'ordine dei messaggi determina l'ordine delle operazioni di scrittura in Milvus. In questo modo è possibile ricostruire l'ultimo stato del cluster dai log.</p></li>
<li><p>Ogni messaggio appartiene a uno specifico <strong>VChannel</strong> (Virtual Channel) e mantiene alcune proprietà invarianti all'interno di quel canale per garantire la coerenza delle operazioni. Ad esempio, un'operazione di Insert deve sempre avvenire prima di un'operazione di DropCollection sullo stesso canale.</p></li>
</ul>
<p>L'ordine dei messaggi in Milvus può assomigliare al seguente:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/message_order.png" alt="Message Order" class="doc-image" id="message-order" />
   </span> <span class="img-wrapper"> <span>Ordine dei messaggi</span> </span></p>
<h2 id="WAL-Component" class="common-anchor-header">Componente WAL<button data-href="#WAL-Component" class="anchor-icon" translate="no">
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
    </button></h2><p>Per supportare la scalabilità orizzontale su larga scala, il WAL di Milvus non è un singolo file di log, ma un insieme di più log. Ciascun registro può supportare in modo indipendente la funzionalità di streaming per più canali V. In qualsiasi momento, un componente WAL può operare <strong>esattamente</strong> su <strong>un nodo di streaming</strong>; questo vincolo è garantito sia da un meccanismo di recinzione dello storage wal sottostante sia dal coordinatore dello streaming.</p>
<p>Altre caratteristiche del componente WAL sono:</p>
<ul>
<li><p><strong>Gestione del ciclo di vita del segmento</strong>: In base a criteri quali condizioni di memoria/dimensioni del segmento/tempo di inattività del segmento, il WAL gestisce il ciclo di vita di ogni segmento.</p></li>
<li><p><strong>Supporto alle transazioni di base</strong>: Poiché ogni messaggio ha un limite di dimensione, il componente WAL supporta un semplice livello di transazione per promettere scritture atomiche a livello di VChannel.</p></li>
<li><p><strong>Scrittura di registri remoti ad alta corenza</strong>: Milvus supporta code di messaggi remote di terze parti come memoria WAL. Per attenuare la latenza di andata e ritorno (RTT) tra il nodo di streaming e l'archiviazione WAL remota e migliorare il throughput di scrittura, il servizio di streaming supporta le scritture di log simultanee. Mantiene l'ordine dei messaggi mediante sincronizzazione TSO e TSO, e i messaggi nel WAL vengono letti in ordine TSO.</p></li>
<li><p><strong>Buffer di scrittura anticipata</strong>: Dopo che i messaggi sono stati scritti nel WAL, vengono temporaneamente memorizzati in un buffer Write-Ahead. Ciò consente di leggere i registri senza dover recuperare i messaggi dal WAL remoto.</p></li>
<li><p><strong>Supporta più archivi WAL</strong>: Woodpecker, Pulsar, Kafka. Utilizzando Woodpecker con la modalità zero-disk, è possibile rimuovere la dipendenza dallo storage WAL remoto.</p></li>
</ul>
<h2 id="Recovery-Storage" class="common-anchor-header">Archiviazione di recupero<button data-href="#Recovery-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Il componente <strong>Recovery Storage</strong> viene sempre eseguito sul nodo di streaming in cui si trova il componente WAL corrispondente.</p>
<ul>
<li><p>È responsabile della conversione dei dati di streaming in dati storici persistenti e della loro memorizzazione nell'object storage.</p></li>
<li><p>Gestisce inoltre il recupero dello stato in memoria per il componente WAL sul nodo di streaming.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/recovery_storage.png" alt="Recovery Storage" class="doc-image" id="recovery-storage" />
   </span> <span class="img-wrapper"> <span>Storage di recupero</span> </span></p>
<h2 id="Query-Delegator" class="common-anchor-header">Delegatore di query<button data-href="#Query-Delegator" class="anchor-icon" translate="no">
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
    </button></h2><p>Il <strong>Query Delegator</strong> viene eseguito su ogni nodo di streaming ed è responsabile dell'esecuzione di <strong>query incrementali</strong> su un singolo shard. Genera piani di query, li inoltra ai nodi di query pertinenti e aggrega i risultati.</p>
<p>Inoltre, il Query Delegator è responsabile della trasmissione delle <strong>operazioni di cancellazione</strong> agli altri Query Nodes.</p>
<p>Il Query Delegator coesiste sempre con il componente WAL sullo stesso nodo di streaming. Tuttavia, se la collezione è configurata con multi-replica, allora <strong>N-1</strong> delegatori saranno distribuiti sugli altri nodi di streaming.</p>
<h2 id="WAL-Lifetime-and-Wait-for-Ready" class="common-anchor-header">Durata del WAL e attesa del pronto<button data-href="#WAL-Lifetime-and-Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>Separando i nodi di calcolo dallo storage, Milvus può trasferire facilmente il WAL da un nodo di streaming a un altro, ottenendo un'elevata disponibilità del servizio di streaming.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/wal_lifetime.png" alt="wal lifetime" class="doc-image" id="wal-lifetime" />
   </span> <span class="img-wrapper"> <span>durata del wal</span> </span></p>
<h2 id="Wait-for-Ready" class="common-anchor-header">Attesa per il pronto<button data-href="#Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando il WAL viene trasferito a un nuovo nodo di streaming, il client scoprirà che il vecchio nodo di streaming rifiuta alcune richieste. Nel frattempo, il WAL verrà recuperato nel nuovo nodo di streaming e il client attenderà che il wal sul nuovo nodo di streaming sia pronto per essere servito.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_wait_for_ready.png" alt="wait for ready" class="doc-image" id="wait-for-ready" />
   </span> <span class="img-wrapper"> <span>attendere che sia pronto</span> </span></p>
