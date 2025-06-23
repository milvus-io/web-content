---
id: data_processing.md
summary: Scoprite la procedura di trattamento dei dati in Milvus.
title: Elaborazione dei dati
---
<h1 id="Data-Processing" class="common-anchor-header">Elaborazione dei dati<button data-href="#Data-Processing" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo articolo fornisce una descrizione dettagliata dell'implementazione dell'inserimento dei dati, della costruzione degli indici e dell'interrogazione dei dati in Milvus.</p>
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
    </button></h2><p>È possibile scegliere il numero di shard utilizzati da una collezione in Milvus: ogni shard corrisponde a un canale virtuale<em>(vchannel</em>). Come illustrato di seguito, Milvus assegna ogni <em>vchannel</em> a un canale fisico<em>(pchannel</em>) e ogni <em>pchannel</em> è legato a uno specifico Streaming Node.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/pvchannel_wal.png" alt="VChannel PChannel and StreamingNode" class="doc-image" id="vchannel-pchannel-and-streamingnode" />
   </span> <span class="img-wrapper"> <span>Canale v Canale p e nodo di streaming</span> </span></p>
<p>Dopo la verifica dei dati, il proxy divide il messaggio scritto in vari pacchetti di dati di shard secondo le regole di instradamento degli shard specificate.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>Canali 1</span> </span></p>
<p>Quindi i dati scritti di uno shard<em>(vchannel</em>) vengono inviati al corrispondente Streaming Node di <em>pchannel</em>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" />
   </span> <span class="img-wrapper"> <span>flusso di scrittura</span> </span></p>
<p>Il nodo di streaming assegna un Timestamp Oracle (TSO) a ogni pacchetto di dati per stabilire un ordine totale delle operazioni. Esegue controlli di coerenza sul payload prima di scriverlo nel log di scrittura (WAL) sottostante. Una volta che i dati sono impegnati in modo duraturo nel WAL, è garantito che non vadano persi: anche in caso di crash, lo Streaming Node può riprodurre il WAL per recuperare completamente tutte le operazioni in sospeso.</p>
<p>Nel frattempo, lo StreamingNode taglia in modo asincrono le voci del WAL impegnate in segmenti discreti. Esistono due tipi di segmento:</p>
<ul>
<li><strong>Segmento in crescita</strong>: tutti i dati che non sono stati inseriti nell'object storage.</li>
<li><strong>Segmento sigillato</strong>: tutti i dati sono stati inseriti nella memoria degli oggetti; i dati del segmento sigillato sono immutabili.</li>
</ul>
<p>La transizione di un segmento in crescita in un segmento sigillato è chiamata flush. Il nodo di streaming attiva un flush non appena ha ingerito e scritto tutte le voci WAL disponibili per quel segmento, ossia quando non ci sono più record in sospeso nel log di scrittura sottostante; a questo punto il segmento viene finalizzato e reso ottimizzato per la lettura.</p>
<h2 id="Index-building" class="common-anchor-header">Creazione dell'indice<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>La costruzione dell'indice viene eseguita dal nodo dati. Per evitare la creazione frequente di indici per gli aggiornamenti dei dati, una raccolta in Milvus è ulteriormente suddivisa in segmenti, ciascuno con il proprio indice.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>Costruzione dell'indice</span> </span></p>
<p>Milvus supporta la costruzione di indici per ogni campo vettoriale, scalare e primario. Sia l'input che l'output della costruzione dell'indice sono collegati alla memorizzazione degli oggetti: Il nodo dati carica le istantanee del registro da indicizzare da un segmento (che si trova nella memoria degli oggetti) alla memoria, deserializza i dati e i metadati corrispondenti per costruire l'indice, serializza l'indice al termine della costruzione e lo scrive nuovamente nella memoria degli oggetti.</p>
<p>La costruzione dell'indice coinvolge principalmente operazioni vettoriali e matriciali e quindi richiede molto calcolo e memoria. I vettori non possono essere indicizzati in modo efficiente con i tradizionali indici ad albero, a causa della loro natura altamente dimensionale, ma possono essere indicizzati con tecniche più mature in questo campo, come gli indici a grafo o a cluster. Indipendentemente dal tipo, la costruzione di un indice comporta calcoli iterativi massicci per vettori di grandi dimensioni, come Kmeans o graph traverse.</p>
<p>A differenza dell'indicizzazione per i dati scalari, la costruzione di indici vettoriali deve sfruttare appieno l'accelerazione SIMD (istruzione singola, dati multipli). Milvus ha un supporto innato per i set di istruzioni SIMD, ad esempio SSE, AVX2 e AVX512. Data la natura "a singhiozzo" e ad alta intensità di risorse della creazione di indici vettoriali, l'elasticità diventa fondamentale per Milvus in termini economici. Le future versioni di Milvus esploreranno ulteriormente l'elaborazione eterogenea e il calcolo senza server per ridurre i relativi costi.</p>
<p>Inoltre, Milvus supporta anche il filtraggio scalare e l'interrogazione di campi primari. Ha indici incorporati per migliorare l'efficienza delle query, come gli indici del filtro Bloom, gli indici hash, gli indici ad albero e gli indici invertiti, e prevede di introdurre altri indici esterni, come gli indici bitmap e gli indici grezzi.</p>
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
    </button></h2><p>L'interrogazione dei dati si riferisce al processo di ricerca in una collezione specifica del numero <em>k</em> di vettori più vicini a un vettore di destinazione o di <em>tutti i</em> vettori entro un intervallo di distanza specificato dal vettore. I vettori vengono restituiti insieme alla loro chiave primaria e ai campi corrispondenti.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>Interrogazione dei dati</span> </span></p>
<p>Una collezione in Milvus è suddivisa in più segmenti; lo Streaming Node carica segmenti crescenti e mantiene i dati in tempo reale, mentre i Query Nodes caricano segmenti sigillati.</p>
<p>Quando arriva una richiesta di interrogazione/ricerca, il proxy la trasmette a tutti gli Streaming Node responsabili dei relativi shard per una ricerca simultanea.</p>
<p>Quando arriva una richiesta di interrogazione, il proxy richiede simultaneamente ai nodi di streaming che detengono gli shard corrispondenti di eseguire la ricerca.</p>
<p>Ciascun nodo di streaming genera un piano di interrogazione, ricerca i propri dati locali in crescita e contatta simultaneamente i nodi di interrogazione remoti per recuperare i risultati storici, quindi li aggrega in un unico risultato dello shard.</p>
<p>Infine, il proxy raccoglie tutti i risultati degli shard, li unisce nel risultato finale e lo restituisce al cliente.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>Handoff</span> </span></p>
<p>Quando il segmento in crescita su un nodo di streaming viene scaricato in un segmento sigillato o quando un nodo dati completa una compattazione, il coordinatore avvia un'operazione di handoff per convertire i dati in crescita in dati storici. Il coordinatore distribuisce quindi in modo uniforme i segmenti sigillati su tutti i nodi di query, bilanciando l'uso della memoria, il sovraccarico della CPU e il numero di segmenti, e rilascia qualsiasi segmento ridondante.</p>
<h2 id="Whats-next" class="common-anchor-header">Cosa succede dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Scoprire come <a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">utilizzare il database vettoriale Milvus per le interrogazioni in tempo reale</a>.</li>
<li>Conoscere l'<a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">inserimento e la persistenza dei dati in Milvus</a>.</li>
<li>Imparare come <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">vengono elaborati i dati in Milvus</a>.</li>
</ul>
