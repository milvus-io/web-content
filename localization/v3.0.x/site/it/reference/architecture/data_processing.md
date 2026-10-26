---
id: data_processing.md
summary: Scopri come funziona il trattamento dei dati in Milvus.
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
    </button></h1><p>Questo articolo fornisce una descrizione dettagliata dell'implementazione dell'inserimento dei dati, della creazione degli indici e dell'interrogazione dei dati in Milvus.</p>
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
    </button></h2><p>In Milvus è possibile scegliere il numero di shard utilizzati da una collezione: ogni shard viene mappato su un canale virtuale (<em>vchannel</em>). Come illustrato di seguito, Milvus assegna quindi ogni <em>vchannel</em> a un canale fisico (<em>pchannel</em>) e ogni <em>pchannel</em> è associato a uno specifico nodo di streaming.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/pvchannel_wal.png" alt="VChannel, PChannel, and Streaming Node" class="doc-image" id="vchannel,-pchannel,-and-streaming-node" /> 
   <span>VChannel, PChannel e nodo di streaming</span>
  
 </span></p>
<p>Dopo la verifica dei dati, il proxy suddividerà il messaggio scritto in vari pacchetti di dati relativi agli shard in base alle regole di instradamento degli shard specificate.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" /> 
   <span>Canali 1</span>
  
 </span></p>
<p>Successivamente, i dati scritti di uno shard (<em>vchannel</em>) vengono inviati al nodo di streaming corrispondente del <em>pchannel</em>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" /> 
   <span>Flusso di scrittura</span>
  
 </span></p>
<p>Lo Streaming Node assegna un Timestamp Oracle (TSO) a ciascun pacchetto di dati per stabilire un ordinamento totale delle operazioni. Esegue controlli di coerenza sul payload prima di scriverlo nel log di scrittura anticipata (WAL) sottostante. Una volta che i dati sono stati confermati in modo duraturo nel WAL, è garantito che non vadano persi: anche in caso di crash, il nodo di streaming può riprodurre il WAL per recuperare completamente tutte le operazioni in sospeso.</p>
<p>Nel frattempo, il nodo di streaming suddivide in modo asincrono le voci del WAL confermate in segmenti distinti. Esistono due tipi di segmenti:</p>
<ul>
<li><strong>Segmento in crescita</strong>: tutti i dati che non sono stati ancora salvati nell’object storage.</li>
<li><strong>Segmento sigillato</strong>: tutti i dati sono stati salvati nell’object storage; i dati del segmento sigillato sono immutabili.</li>
</ul>
<p>Il passaggio da un segmento in crescita a un segmento sigillato è chiamato "flush". Lo Streaming Node avvia un flush non appena ha acquisito e scritto tutte le voci WAL disponibili per quel segmento — ovvero quando non ci sono più record in sospeso nel log di scrittura anticipata sottostante — a quel punto il segmento viene finalizzato e ottimizzato per la lettura.</p>
<h2 id="Index-building" class="common-anchor-header">Creazione dell’indice<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>La creazione degli indici viene eseguita dal nodo dati. Per evitare frequenti operazioni di creazione degli indici a seguito di aggiornamenti dei dati, una raccolta in Milvus viene suddivisa ulteriormente in segmenti, ciascuno con il proprio indice.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" /> 
   <span>Creazione degli indici</span>
  
 </span></p>
<p>Milvus supporta la creazione di indici per ogni campo vettoriale, campo scalare e campo primario. Sia l’input che l’output della creazione dell’indice coinvolgono l’object storage: il nodo dati carica in memoria le istantanee del log da indicizzare provenienti da un segmento (che si trova nell’object storage), deserializza i dati e i metadati corrispondenti per creare l’indice, serializza l’indice al termine della creazione e lo riscrive nell’object storage.</p>
<p>La creazione dell’indice comporta principalmente operazioni su vettori e matrici ed è quindi ad alta intensità di calcolo e memoria. I vettori non possono essere indicizzati in modo efficiente con gli indici tradizionali basati su alberi a causa della loro natura ad alta dimensionalità, ma possono essere indicizzati con tecniche più consolidate in questo ambito, come gli indici basati su cluster o grafi. Indipendentemente dal tipo, la creazione di un indice comporta enormi calcoli iterativi per vettori su larga scala, come K-means o la traversata di grafi.</p>
<p>A differenza dell’indicizzazione dei dati scalari, la creazione di indici vettoriali deve sfruttare appieno l’accelerazione SIMD (single instruction, multiple data). Milvus offre supporto nativo per i set di istruzioni SIMD, ad esempio SSE, AVX2 e AVX512. Data la natura “instabile” e ad alto consumo di risorse della creazione di indici vettoriali, l’elasticità assume un’importanza cruciale per Milvus in termini economici. Le future versioni di Milvus approfondiranno ulteriormente l’esplorazione del calcolo eterogeneo e del calcolo serverless per ridurre i costi associati.</p>
<p>Inoltre, Milvus supporta anche il filtraggio scalare e le query sui campi primari. Dispone di indici integrati per migliorare l’efficienza delle query, ad esempio indici con filtro di Bloom, indici hash, indici basati su alberi e indici invertiti, e prevede di introdurre ulteriori indici esterni, come indici bitmap e indici approssimativi.</p>
<h2 id="Data-query" class="common-anchor-header">Query sui dati<button data-href="#Data-query" class="anchor-icon" translate="no">
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
    </button></h2><p>Per interrogazione dei dati si intende il processo di ricerca, all’interno di una collezione specificata, di <em>k</em> vettori più vicini a un vettore di riferimento o di <em>tutti</em> i vettori che si trovano entro un intervallo di distanza specificato rispetto a tale vettore. I vettori vengono restituiti insieme alla chiave primaria e ai campi corrispondenti.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" /> 
   <span>Interrogazione dei dati</span>
  
 </span></p>
<p>Una collezione in Milvus è suddivisa in più segmenti; il nodo di streaming (Streaming Node) carica i segmenti in crescita e gestisce i dati in tempo reale, mentre i nodi di query (Query Nodes) caricano i segmenti sigillati.</p>
<p>Quando arriva una richiesta di query/ricerca, il proxy la trasmette a tutti i nodi di streaming responsabili dei frammenti correlati per consentire la ricerca simultanea.</p>
<p>Quando arriva una richiesta di query, il proxy richiede contemporaneamente ai nodi di streaming che contengono gli shard corrispondenti di eseguire la ricerca.</p>
<p>Ogni nodo di streaming genera un piano di query, effettua la ricerca nei propri dati in crescita locali e, contemporaneamente, contatta i nodi di query remoti per recuperare i risultati storici, quindi li aggrega in un unico risultato di shard.</p>
<p>Infine, il proxy raccoglie tutti i risultati dei frammenti, li unisce nel risultato finale e lo restituisce al client.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" /> 
   <span>Passaggio di consegne</span>
  
 </span></p>
<p>Quando il segmento in crescita su un nodo di streaming viene scaricato in un segmento sigillato — o quando un nodo dati completa una compattazione — il coordinatore avvia un’operazione di handoff per convertire quei dati in crescita in dati storici. Il coordinatore distribuisce quindi in modo uniforme i segmenti sigillati tra tutti i nodi di query, bilanciando l’utilizzo della memoria, il carico della CPU e il numero di segmenti, e rilascia eventuali segmenti ridondanti.</p>
<h2 id="Whats-next" class="common-anchor-header">Prossimi passi<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Scopri come <a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">utilizzare il database vettoriale Milvus per le query in tempo reale</a>.</li>
<li>Scopri <a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">l’inserimento e la persistenza dei dati in Milvus</a>.</li>
<li>Scopri come <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">vengono elaborati i dati in Milvus</a>.</li>
</ul>
