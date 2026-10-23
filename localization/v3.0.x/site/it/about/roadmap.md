---
id: roadmap.md
title: Roadmap di Milvus
related_key: Milvus roadmap
summary: >-
  Scopri la roadmap di Milvus relativa a ricerca, analisi, evoluzione degli
  schemi, integrazione con i data lake e prestazioni nelle versioni 3.0 e 3.1.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Roadmap di Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 3.0 riunisce il recupero multivettoriale, le query in stile SQL, schemi flessibili e l'accesso ai dati nell'archivio di tipo "data lake". Le fasi successive si basano su queste fondamenta con query più ricche, modelli di dati più ampi e miglioramenti in termini di prestazioni e scalabilità. Questa roadmap delinea tali priorità per Milvus open source.</p>
<p>Milvus 3.0 è disponibile al pubblico a partire dalla <strong>versione 3.0.1</strong>. Le funzionalità rilasciate riportate di seguito sono state introdotte nella <strong>versione 3.0.0</strong>; le funzionalità in anteprima e quelle attivabili su richiesta sono indicate dove compaiono. La serie <strong>3.0.x</strong> estende queste funzionalità, mentre la versione <strong>3.1 è prevista per dicembre 2026</strong>. Le funzionalità pianificate e le date previste potrebbero subire variazioni man mano che lo sviluppo procede.</p>
<h2 id="Search-and-retrieval" class="common-anchor-header">Ricerca e recupero<button data-href="#Search-and-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>La roadmap relativa al recupero si concentra sulla combinazione di un maggior numero di segnali di rilevanza all’interno di Milvus, dalla corrispondenza testuale e dalle rappresentazioni multivettoriali al riordino dei risultati e ai filtri dei risultati di ricerca.</p>
<p><strong>Disponibile nella versione 3.0</strong></p>
<ul>
<li><strong>Recupero multivettoriale:</strong> la ricerca StructArray supporta Muvera e Lemur, con l’ <code translate="no">element_filter</code> per il filtraggio a livello di elemento. Le politiche di corrispondenza includono <code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> e <code translate="no">MATCH_EXACT</code>.</li>
<li><strong>Corrispondenza e somiglianza del testo:</strong> i dizionari personalizzati e i sinonimi adattano il recupero del testo alle esigenze dell’applicazione. Il filtraggio Regex supporta la corrispondenza dei pattern, mentre MinHash supporta il rilevamento dei quasi-duplicati.</li>
<li><strong>Riorganizzazione dei risultati e inferenza:</strong> Milvus 3.0 introduce una serie iniziale di funzionalità di riorganizzazione dei risultati tramite Function Chain, insieme all’Hugging Face Inference Provider. Le restanti funzionalità di Function Chain sono previste per la versione 3.0.x.</li>
<li><strong>Aggregazione dei risultati di ricerca:</strong> l’aggregazione dei risultati di ricerca fornisce filtri (facets) sui risultati della ricerca.</li>
</ul>
<p><strong>Previsto per la versione 3.0.x</strong></p>
<p>La serie 3.0.x prevede l’aggiunta della corrispondenza approssimativa e delle statistiche globali, oltre al supporto completo della Function Chain.</p>
<p><strong>Previsto per la versione 3.1</strong></p>
<p>I piani includono il recupero basato su Grep, una più stretta integrazione della ricerca del vicino più prossimo approssimativo (ANN) e il filtraggio tramite fusione ANN-filtro, oltre a miglioramenti al recupero sparsa.</p>
<h2 id="Analytics-and-SQL-style-querying" class="common-anchor-header">Analisi e query in stile SQL<button data-href="#Analytics-and-SQL-style-querying" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus sta ampliando il proprio motore di query in modo che le applicazioni possano ordinare e aggregare i dati parallelamente al recupero. La fase successiva prevede l’aggiunta di join, viste materializzate e calcoli personalizzati.</p>
<p><strong>Disponibile nella versione 3.0</strong></p>
<p>Le query e la ricerca supportano l’ordinamento con <code translate="no">ORDER BY</code>. L’aggregazione delle query aggiunge <code translate="no">GROUP BY</code> per il calcolo di statistiche raggruppate.</p>
<p><strong>In programma per la versione 3.1</strong></p>
<ul>
<li><strong>Query più avanzate:</strong> introduzione dei join, a partire dai semi-join, e delle Materialized View Collections.</li>
<li><strong>Aggiornamenti dei dati e integrità:</strong> supporto per gli aggiornamenti in loco e la deduplicazione della chiave primaria durante l’acquisizione.</li>
<li><strong>Iterazione delle query e semantica JSON:</strong> aggiunta di un iteratore di query con stato, JSON <code translate="no">GROUP BY</code> e semantica NULL per SQL e JSON.</li>
<li><strong>Calcoli personalizzati:</strong> supporto delle funzioni definite dall’utente (UDF) in Python.</li>
</ul>
<h2 id="Flexible-schema-and-data-types" class="common-anchor-header">Schema e tipi di dati flessibili<button data-href="#Flexible-schema-and-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Il lavoro sullo schema si concentra sull’evoluzione delle collezioni esistenti e sulla rappresentazione di una gamma più ampia di dati. Copre le modifiche ai campi, le strutture multivettoriali, il testo lungo e la scadenza delle entità.</p>
<p><strong>Disponibile nella versione 3.0</strong></p>
<ul>
<li><strong>Modifiche allo schema online:</strong> le collezioni esistenti supportano l’aggiunta di campi online, inclusi campi vettoriali e di tipo <code translate="no">Array&lt;Struct&gt;</code>. L’eliminazione dei campi è disponibile in <strong>anteprima</strong> e potrebbe presentare alcune limitazioni.</li>
<li><strong>Backfill per i dati esistenti:</strong> il backfill esterno utilizza lo Spark Connector. Il backfill interno associa una funzione BM25 o MinHash a una collezione e ne calcola l’output sui dati esistenti.</li>
<li><strong>Dati di testo e multivettoriali:</strong> il tipo ` <code translate="no">TEXT</code> ` memorizza testo lungo, mentre `StructArray` supporta il recupero in fase di interazione tardiva tramite ` <code translate="no">MAX_SIM</code>`. ` <code translate="no">TEXT</code> ` richiede l’attivazione di Storage V3.</li>
<li><strong>Valori NULL e scadenza:</strong> i campi vettoriali accettano valori NULL e il tempo di vita (TTL) a livello di entità controlla la scadenza.</li>
</ul>
<p><strong>In programma per la versione 3.0.x</strong></p>
<p>I miglioramenti previsti allo schema ampliano il supporto di StructArray per i tipi, i valori NULL e l’aggiunta e la rimozione di campi. Aggiungono inoltre il supporto per le formule molecolari e i filtri " <code translate="no">IS NULL</code> " e " <code translate="no">IS NOT NULL</code> " per i campi vettoriali.</p>
<p><strong>In programma per la versione 3.1</strong></p>
<p>Le prossime estensioni del modello di dati includono JSON e Struct annidati, chiavi primarie composite, collezioni senza campi vettoriali e vettori sparsi in StructList.</p>
<h2 id="Lake-integration-and-data-versioning" class="common-anchor-header">Integrazione con i data lake e controllo delle versioni dei dati<button data-href="#Lake-integration-and-data-versioning" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus sta sviluppando una più stretta integrazione con lo storage Lake e l’elaborazione in batch. Le collezioni esterne consentono di accedere ai dati nel luogo in cui risiedono, mentre gli snapshot costituiscono la base per il versioning dei dati.</p>
<p><strong>Disponibile nella versione 3.0</strong></p>
<ul>
<li><strong>Accesso ai dati esterni:</strong> External Collection supporta dati in formato Lance, Parquet e Iceberg.</li>
<li><strong>Snapshot e integrazione batch:</strong> lo snapshot acquisisce una versione dei dati della collezione e lo Spark Connector supporta i flussi di lavoro batch.</li>
<li><strong>Base di archiviazione:</strong> Storage V3 (Loon) offre il supporto opzionale per Vortex e Lance. È disabilitato per impostazione predefinita e si abilita tramite <code translate="no">common.storage.useLoonFFI</code>. Sia gli snapshot che l’ <code translate="no">TEXT</code> e dipendono da esso.</li>
</ul>
<p><strong>In programma per la versione 3.0.x</strong></p>
<p>I miglioramenti previsti consentiranno a uno snapshot di raccolta Milvus di fungere da raccolta esterna. Il supporto per le tabelle esterne si estenderà inoltre allo shredding JSON, all’aggiunta di campi funzione e alla rimozione di campi.</p>
<p><strong>In programma per la versione 3.1</strong></p>
<p>I piani includono indici sparsi e scalari basati su S3, insieme alla cancellazione tramite importazione.</p>
<h2 id="Performance-indexing-and-scale" class="common-anchor-header">Prestazioni, indicizzazione e scalabilità<button data-href="#Performance-indexing-and-scale" class="anchor-icon" translate="no">
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
    </button></h2><p>La roadmap delle prestazioni riguarda gli indici di recupero, l’esecuzione delle query e la crescita del cluster. Affronta inoltre il ripristino e le query che richiedono la lettura dei dati dall’object storage.</p>
<p><strong>Disponibile nella versione 3.0</strong></p>
<ul>
<li><strong>Indicizzazione sparsa:</strong> la revisione degli indici sparsi introduce SINDI.</li>
<li><strong>Scelta dell’indice:</strong> l’indice passthrough di <code translate="no">FAISS</code> accetta stringhe di index-factory Faiss, con opzioni che includono SVS, Panorama, PQ, IVFPQ e ScaNN. L’indicizzazione DiskANN è disponibile anche per le liste incorporate (EmbList).</li>
<li><strong>Compattazione:</strong> Force Merge offre un controllo esplicito sulla fusione dei segmenti.</li>
</ul>
<p><strong>In programma per la versione 3.1</strong></p>
<ul>
<li><strong>Query sensibili allo storage:</strong> Aggiunta la propagazione dei predicati per Vortex, inclusi il pruning a livello di pagina e gli indici di salto.</li>
<li><strong>Crescita del cluster e multi-tenant:</strong> supporto alla suddivisione degli shard, alle chiavi di sharding personalizzate e alle ottimizzazioni multi-tenant.</li>
<li><strong>Esecuzione delle query e indicizzazione:</strong> sviluppo di QueryView, miglioramento del supporto per le collezioni di grandi dimensioni, riduzione dei risultati in streaming e supporto di più indici.</li>
<li><strong>Affidabilità delle scritture:</strong> supporto delle scritture idempotenti.</li>
<li><strong>Caching su storage a oggetti:</strong> utilizzo di Talon come cache S3 per migliorare il ripristino in caso di guasto e le prestazioni delle query inattive.</li>
</ul>
<h2 id="Beyond-31" class="common-anchor-header">Oltre la versione 3.1<button data-href="#Beyond-31" class="anchor-icon" translate="no">
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
    </button></h2><p>Il lavoro a lungo termine include il "time-travel" e il rollback degli snapshot. La loro portata e i tempi di rilascio devono ancora essere confermati.</p>
<h2 id="Help-shape-the-roadmap" class="common-anchor-header">Contribuisci a definire la roadmap<button data-href="#Help-shape-the-roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>Condividi i carichi di lavoro, i limiti e le richieste di funzionalità rilevanti per le tue applicazioni nelle <a href="https://github.com/milvus-io/milvus/discussions">Discussioni su GitHub</a>. Segnala i bug tramite <a href="https://github.com/milvus-io/milvus/issues">le Issue di GitHub</a>.</p>
<p>Per contribuire con codice o documentazione, inizia dalla <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">Guida per i contributori</a>.</p>
