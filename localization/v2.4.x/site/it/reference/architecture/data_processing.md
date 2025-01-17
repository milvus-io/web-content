---
id: data_processing.md
summary: Scoprite la procedura di trattamento dei dati in Milvus.
title: Elaborazione dati
---
<h1 id="Data-processing" class="common-anchor-header">Elaborazione dei dati<button data-href="#Data-processing" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo articolo fornisce una descrizione dettagliata dell'implementazione dell'inserimento dei dati, della creazione di indici e dell'interrogazione dei dati in Milvus.</p>
<h2 id="Data-insertion" class="common-anchor-header">Inserimento dei dati<button data-href="#Data-insertion" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus è possibile specificare un numero di shard per ogni raccolta, ogni shard corrisponde a un canale virtuale<em>(vchannel</em>). Come mostra la figura seguente, Milvus assegna a ogni vchannel del log broker un canale fisico<em>(pchannel</em>). Qualsiasi richiesta di inserimento/cancellazione in arrivo viene indirizzata agli shard in base al valore hash della chiave primaria.</p>
<p>La convalida delle richieste DML viene spostata al proxy, perché Milvus non ha transazioni complicate. Il proxy richiede un timestamp per ogni richiesta di inserimento/cancellazione al TSO (Timestamp Oracle), che è il modulo di temporizzazione che si collega al coordinatore principale. Poiché il timestamp più vecchio viene sovrascritto da quello più recente, i timestamp vengono utilizzati per determinare la sequenza delle richieste di dati in corso di elaborazione. Il proxy recupera le informazioni in batch dai coordinamenti dei dati, compresi i segmenti delle entità e le chiavi primarie, per aumentare il throughput complessivo ed evitare di sovraccaricare il nodo centrale.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/channels_1.jpg" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>Canali 1</span> </span></p>
<p>Sia le operazioni DML (data manipulation language) che le operazioni DDL (data definition language) vengono scritte nella sequenza di log, ma alle operazioni DDL viene assegnato un solo canale a causa della loro bassa frequenza.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/channels_2.jpg" alt="Channels 2" class="doc-image" id="channels-2" />
   </span> <span class="img-wrapper"> <span>Canali 2</span> </span></p>
<p>I<em>canali</em> sono mantenuti nei nodi di log broker sottostanti. Ogni canale è fisicamente indivisibile e disponibile per un solo nodo. Quando la velocità di ingestione dei dati raggiunge un collo di bottiglia, bisogna considerare due cose: se il nodo log broker è sovraccarico e deve essere scalato; e se ci sono shard sufficienti per garantire il bilanciamento del carico per ogni nodo.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/write_log_sequence.jpg" alt="Write log sequence" class="doc-image" id="write-log-sequence" />
   </span> <span class="img-wrapper"> <span>Sequenza di scrittura dei log</span> </span></p>
<p>Il diagramma precedente racchiude i quattro componenti coinvolti nel processo di scrittura della sequenza di log: il proxy, il log broker, il nodo dati e lo storage degli oggetti. Il processo prevede quattro attività: la convalida delle richieste DML, la pubblicazione-sottoscrizione della sequenza di log, la conversione da un log in streaming a snapshot di log e la persistenza degli snapshot di log. I quattro compiti sono disaccoppiati l'uno dall'altro per assicurarsi che ogni compito sia gestito dal tipo di nodo corrispondente. I nodi dello stesso tipo sono resi uguali e possono essere scalati in modo elastico e indipendente per adattarsi a vari carichi di dati, in particolare a dati in streaming massicci e altamente fluttuanti.</p>
<h2 id="Index-building" class="common-anchor-header">Costruzione dell'indice<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>La costruzione dell'indice viene eseguita dai nodi indice. Per evitare la creazione frequente di indici per gli aggiornamenti dei dati, una raccolta in Milvus è ulteriormente suddivisa in segmenti, ciascuno con il proprio indice.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/index_building.jpg" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>Costruzione dell'indice</span> </span></p>
<p>Milvus supporta la costruzione di indici per ogni campo vettoriale, scalare e primario. Sia l'input che l'output della costruzione dell'indice sono collegati alla memorizzazione degli oggetti: Il nodo indice carica le istantanee del registro da indicizzare da un segmento (che si trova nella memoria degli oggetti) alla memoria, deserializza i dati e i metadati corrispondenti per costruire l'indice, serializza l'indice al termine della costruzione e lo scrive nuovamente nella memoria degli oggetti.</p>
<p>La costruzione dell'indice coinvolge principalmente operazioni vettoriali e matriciali e quindi richiede molto calcolo e memoria. I vettori non possono essere indicizzati in modo efficiente con i tradizionali indici ad albero, a causa della loro natura altamente dimensionale, ma possono essere indicizzati con tecniche appositamente studiate per questo compito, come gli indici a cluster o a grafo. Indipendentemente dal tipo, la costruzione di un indice comporta calcoli iterativi massicci per vettori di grandi dimensioni, come K-means o l'attraversamento di grafi.</p>
<p>A differenza dell'indicizzazione per i dati scalari, la creazione di un indice vettoriale trae grande vantaggio dall'accelerazione SIMD (istruzione singola, dati multipli). Milvus ha un supporto innato per i set di istruzioni SIMD, ad esempio SSE, AVX2 e AVX512. Data la natura "a singhiozzo" e ad alta intensità di risorse della creazione di indici vettoriali, l'elasticità diventa fondamentale per Milvus in termini economici. Le future versioni di Milvus esploreranno ulteriormente l'elaborazione eterogenea e il calcolo senza server per ridurre i relativi costi.</p>
<p>Milvus supporta anche il filtraggio scalare e l'interrogazione di campi primari. Dispone di indici integrati per migliorare l'efficienza delle query, come gli indici del filtro Bloom, gli indici hash, gli indici ad albero e gli indici invertiti, e prevede di introdurre altri indici esterni, come gli indici bitmap e gli indici grezzi.</p>
<h2 id="Data-query" class="common-anchor-header">Interrogazione dei dati<button data-href="#Data-query" class="anchor-icon" translate="no">
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
    </button></h2><p>Il termine "interrogazione dei dati" si riferisce al processo di ricerca in una collezione specifica del numero <em>k</em> di vettori più vicini a un vettore di destinazione o di <em>tutti i</em> vettori entro un intervallo di distanza specificato dal vettore. I vettori vengono restituiti insieme alla loro chiave primaria e ai campi corrispondenti.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>Interrogazione dei dati</span> </span></p>
<p>Una collezione in Milvus è suddivisa in più segmenti e i nodi di interrogazione caricano gli indici per segmento. Quando arriva una richiesta di ricerca, questa viene trasmessa a tutti i nodi di interrogazione per una ricerca simultanea. Ciascun nodo esegue una selezione dei segmenti locali, cerca i vettori che soddisfano i criteri e riduce e restituisce i risultati della ricerca.</p>
<p>I nodi di interrogazione sono indipendenti l'uno dall'altro in una ricerca di dati. Ogni nodo è responsabile solo di due compiti: caricare o rilasciare i segmenti seguendo le istruzioni della query coord; effettuare una ricerca all'interno dei segmenti locali. Il proxy è responsabile della riduzione dei risultati della ricerca da ciascun nodo di query e della restituzione dei risultati finali al client.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/handoff.jpg" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>Trasferimento</span> </span></p>
<p>Esistono due tipi di segmenti: i segmenti in crescita (per i dati incrementali) e i segmenti chiusi (per i dati storici). I nodi di interrogazione si iscrivono a vchannel per ricevere gli aggiornamenti recenti (dati incrementali) come segmenti in crescita. Quando un segmento in crescita raggiunge una soglia predefinita, il data coord lo sigilla e inizia la costruzione dell'indice. Successivamente, un'operazione <em>di handoff</em> avviata dal coord. della query trasforma i dati incrementali in dati storici. Query coord distribuisce i segmenti sigillati in modo uniforme tra tutti i nodi di query in base all'utilizzo della memoria, al sovraccarico della CPU e al numero di segmenti.</p>
<h2 id="Whats-next" class="common-anchor-header">Il prossimo passo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Imparare a <a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">usare il database vettoriale Milvus per le interrogazioni in tempo reale</a>.</li>
<li>Conoscere l'<a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">inserimento e la persistenza dei dati in Milvus</a>.</li>
<li>Imparare come <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">vengono elaborati i dati in Milvus</a>.</li>
</ul>
