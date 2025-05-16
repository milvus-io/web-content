---
id: replica.md
summary: Scoprite la replica in-memory in Milvus.
title: Replica in memoria
---
<h1 id="In-Memory-Replica" class="common-anchor-header">Replica in memoria<button data-href="#In-Memory-Replica" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento introduce il meccanismo di replica in memoria (replicazione) di Milvus, che consente di replicare più segmenti nella memoria di lavoro per migliorare le prestazioni e la disponibilità.</p>
<p>Per informazioni su come configurare le repliche in-memory, fare riferimento a <a href="/docs/it/v2.4.x/configure_querynode.md#queryNodereplicas">Configurazioni relative ai nodi di query</a>.</p>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/replica_availability.jpg" alt="Replica_Availiability" class="doc-image" id="replica_availiability" />
   </span> <span class="img-wrapper"> <span>Disponibilità delle repliche</span> </span></p>
<p>Con le repliche in-memory, Milvus può caricare lo stesso segmento su più nodi di query. Se un nodo di query è fallito o è occupato da una richiesta di ricerca corrente quando ne arriva un'altra, il sistema può inviare nuove richieste a un nodo di query inattivo che ha una replica dello stesso segmento.</p>
<h3 id="Performance" class="common-anchor-header">Prestazioni</h3><p>Le repliche in memoria consentono di sfruttare risorse extra di CPU e memoria. È molto utile se si dispone di un set di dati relativamente piccolo ma si vuole aumentare la velocità di lettura con risorse hardware aggiuntive. Il QPS (query al secondo) e il throughput complessivo possono essere migliorati in modo significativo.</p>
<h3 id="Availability" class="common-anchor-header">Disponibilità</h3><p>Le repliche in memoria aiutano Milvus a riprendersi più velocemente se un nodo di query si blocca. Quando un nodo di interrogazione si guasta, il segmento non deve essere ricaricato su un altro nodo di interrogazione. Al contrario, la richiesta di ricerca può essere inviata immediatamente a un nuovo nodo di query senza dover ricaricare i dati. Grazie alla gestione simultanea di più repliche di segmenti, il sistema è più resistente in caso di failover.</p>
<h2 id="Key-Concepts" class="common-anchor-header">Concetti chiave<button data-href="#Key-Concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>Le repliche in memoria sono organizzate come gruppi di repliche. Ogni gruppo di repliche contiene repliche <a href="https://milvus.io/docs/v2.1.x/glossary.md#Sharding">shard</a>. Ogni replica shard ha una replica streaming e una replica storica che corrispondono ai <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">segmenti</a> in crescita e sigillati nello shard (ad esempio, il canale DML).</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/replica_group.png" alt="An illustration of how in-memory replica works" class="doc-image" id="an-illustration-of-how-in-memory-replica-works" />
   </span> <span class="img-wrapper"> <span>Un'illustrazione del funzionamento della replica in-memory</span> </span></p>
<h3 id="Replica-group" class="common-anchor-header">Gruppo di replica</h3><p>Un gruppo di replica è costituito da più <a href="https://milvus.io/docs/v2.1.x/four_layers.md#Query-node">nodi di query</a> responsabili della gestione dei dati storici e delle repliche.</p>
<h3 id="Shard-replica" class="common-anchor-header">Replica shard</h3><p>Una replica shard consiste in una replica streaming e in una replica storica, entrambe appartenenti allo stesso <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Shard">shard</a>. Il numero di repliche shard in un gruppo di repliche è determinato dal numero di shard in una raccolta specifica.</p>
<h3 id="Streaming-replica" class="common-anchor-header">Replica in streaming</h3><p>Una replica in streaming contiene tutti i <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">segmenti in crescita</a> dello stesso canale DML. Tecnicamente, una replica di streaming dovrebbe essere servita da un solo nodo di query in una replica.</p>
<h3 id="Historical-replica" class="common-anchor-header">Replica storica</h3><p>Una replica storica contiene tutti i segmenti sigillati dello stesso canale DML. I segmenti sigillati di una replica storica possono essere distribuiti su diversi nodi di query all'interno dello stesso gruppo di replica.</p>
<h3 id="Shard-leader" class="common-anchor-header">Leader dello shard</h3><p>Uno shard leader è il nodo di query che serve la replica di streaming in una replica shard.</p>
<h2 id="Design-Details" class="common-anchor-header">Dettagli di progettazione<button data-href="#Design-Details" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Balance" class="common-anchor-header">Equilibrio</h3><p>Un nuovo segmento che deve essere caricato viene assegnato a più nodi di ricerca diversi. Una richiesta di ricerca può essere elaborata una volta che almeno una replica è stata caricata con successo.</p>
<h3 id="Search" class="common-anchor-header">Ricerca</h3><h4 id="Cache" class="common-anchor-header">Cache</h4><p>Il proxy mantiene una cache che mappa i segmenti ai nodi di interrogazione e la aggiorna periodicamente. Quando il proxy riceve una richiesta, Milvus prende dalla cache tutti i segmenti sigillati che devono essere cercati e cerca di assegnarli ai nodi di interrogazione in modo uniforme.</p>
<p>Per i segmenti in crescita, il proxy mantiene anche una cache channel-to-query-node e invia le richieste ai nodi di interrogazione corrispondenti.</p>
<h4 id="Failover" class="common-anchor-header">Failover</h4><p>Le cache del proxy non sono sempre aggiornate. Alcuni segmenti o canali potrebbero essere stati spostati su altri nodi di interrogazione quando arriva una richiesta. In questo caso, il proxy riceve una risposta di errore, aggiorna la cache e cerca di assegnare il segmento a un altro nodo di interrogazione.</p>
<p>Un segmento viene ignorato se il proxy non riesce a trovarlo dopo l'aggiornamento della cache. Questo potrebbe accadere se il segmento è stato compattato.</p>
<p>Se la cache non è accurata, il proxy potrebbe perdere alcuni segmenti. I nodi di interrogazione con canali DML (segmenti in crescita) restituiscono risposte di ricerca insieme a un elenco di segmenti affidabili che il proxy può confrontare e aggiornare la cache.</p>
<h3 id="Enhancement" class="common-anchor-header">Miglioramento</h3><p>Il proxy non può assegnare le richieste di ricerca ai nodi di query in modo completamente uguale e i nodi di query possono avere risorse diverse per servire le richieste di ricerca. Per evitare una distribuzione delle risorse a coda lunga, il proxy assegnerà i segmenti attivi su altri nodi di query a un nodo di query inattivo che dispone anch'esso di tali segmenti.</p>
