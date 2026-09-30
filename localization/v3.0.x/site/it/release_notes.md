---
id: release_notes.md
summary: Note di rilascio di Milvus
title: Note di rilascio
---
<h1 id="Release-Notes" class="common-anchor-header">Note di rilascio<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Scopri le novità di Milvus! Questa pagina riassume le nuove funzionalità, i miglioramenti, i problemi noti e le correzioni di bug presenti in ogni versione. Ti consigliamo di visitare regolarmente questa pagina per rimanere aggiornato sulle novità.</p>
<h2 id="v302" class="common-anchor-header">v3.0.2<button data-href="#v302" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 20 settembre 2026</p>
<table>
<thead>
<tr><th>Versione di Milvus</th><th>Versione SDK Python</th><th>Versione SDK Node.js</th><th>Versione SDK Java</th><th>Versione SDK Go</th></tr>
</thead>
<tbody>
<tr><td>3.0.2</td><td>3.0.2</td><td>3.0.6</td><td>3.0.10</td><td>3.0.2</td></tr>
</tbody>
</table>
<p>Siamo lieti di annunciare il rilascio di Milvus v3.0.2! Questa versione si concentra sulle prestazioni di ricerca e query — eliminando la contesa degli hot-path nella ricerca filtrata, nel raggruppamento e nella creazione degli indici — insieme a un supporto più solido per le collezioni esterne e Storage V2, e a un'ampia serie di correzioni di stabilità relative allo streaming, alla compattazione e alla gestione degli indici.</p>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Ottimizzazione del filtraggio ARRAY tramite la fusione dei predicati “contains” concatenati in un’unica espressione “ <code translate="no">ContainsAny</code> ” / “<code translate="no">ContainsAll</code> ” nel pianificatore di query (<a href="https://github.com/milvus-io/milvus/pull/52365">#52365</a>)</li>
<li>Aggiunto il supporto per endpoint personalizzati compatibili con S3 nelle collezioni esterne tramite l’opzione <code translate="no">extfs.endpoint_url</code>, con convalida delle impostazioni degli endpoint non sicure o in conflitto (<a href="https://github.com/milvus-io/milvus/pull/52814">#52814</a>)</li>
<li>Unificazione dei filtri di appartenenza Bloom e Roaring in un'unica espressione <code translate="no">membership_match</code>, con supporto corrispondente del client Go per la creazione e l'interrogazione di entrambi i tipi di filtro (<a href="https://github.com/milvus-io/milvus/pull/53019">#53019</a>)</li>
<li>Ridotta l’amplificazione di scrittura durante la creazione di indici basati su Tantivy, riducendo l’I/O del disco per gli indici di corrispondenza testuale, NGRAM e statistiche delle chiavi JSON (<a href="https://github.com/milvus-io/milvus/pull/53057">#53057</a>)</li>
<li>Aggiunto controllo di ammissione sugli endpoint DQL RESTful v2 che restituisce un codice di stato HTTP 429 con <code translate="no">Retry-After</code> prima della decodifica della richiesta quando la coda delle query del proxy è piena (<a href="https://github.com/milvus-io/milvus/pull/53111">#53111</a>)</li>
<li>Ridotto un punto critico di conteggio delle referenze atomico nel percorso di valutazione dei filtri scalari che rappresentava circa il 48% del tempo di CPU delle foglie nella ricerca, migliorando la produttività della ricerca filtrata (<a href="https://github.com/milvus-io/milvus/pull/53167">#53167</a>)</li>
<li>Migliorata la scalabilità del pool di thread di archiviazione sostituendo l’implementazione personalizzata con <code translate="no">folly::CPUThreadPoolExecutor</code> e ripristinando il ridimensionamento elastico dei worker (<a href="https://github.com/milvus-io/milvus/pull/53184">#53184</a>)</li>
<li>Migliorata la corrispondenza dei log di accesso REST in modo che i formattatori vengano abbinati al percorso URL analizzato, e i metodi configurati ora si applicano alle richieste che trasportano parametri di query (<a href="https://github.com/milvus-io/milvus/pull/53147">#53147</a>)</li>
<li>Aggiunto il supporto per la trasmissione idempotente, in modo che le richieste riprovate non creino più attività duplicate; l’ <code translate="no">BulkImport</code> è stato il primo a adottarla (<a href="https://github.com/milvus-io/milvus/pull/53228">#53228</a>)</li>
<li>Aggiunti caratteri di separazione delle frasi configurabili per il tokenizzatore Lindera, consentendo alle voci del dizionario utente contenenti segni di punteggiatura di essere abbinate come un unico token (<a href="https://github.com/milvus-io/milvus/pull/53287">#53287</a>)</li>
<li>Aggiunto un filtro di versione del cluster che abilita automaticamente la materializzazione delle funzioni "write-before" solo dopo che tutti i nodi hanno completato l'aggiornamento, evitando incongruenze dovute a versioni miste durante gli aggiornamenti graduali (<a href="https://github.com/milvus-io/milvus/pull/53261">#53261</a>)</li>
<li>Aggiornato Woodpecker alla versione v0.1.42, risolvendo gli errori di ripristino WAL su segmenti vuoti finalizzati e migliorando la stabilità e le metriche del percorso di aggiunta (<a href="https://github.com/milvus-io/milvus/pull/53295">#53295</a>)</li>
<li>Ridotto l’overhead atomico e del conteggio dei riferimenti per chunk nel percorso caldo di ricerca e query, fissando uno snapshot del segmento sigillato una volta per ogni richiesta (<a href="https://github.com/milvus-io/milvus/pull/53301">#53301</a>)</li>
<li>Migliorata la latenza degli aggiornamenti parziali sostituendo le attese TimeTick con un blocco ottimistico basato su snapshot e perfezionata la gestione di AutoID in modo che le chiavi primarie esistenti vengano preservate e gli ID restituiti mantengano l’ordine di input (<a href="https://github.com/milvus-io/milvus/pull/53337">#53337</a>)</li>
<li>Ridotta la costruzione ridondante delle viste delle righe durante il raggruppamento dei risultati di ricerca per campi VARCHAR o JSON su segmenti sigillati, riducendo il sovraccarico della ricerca con raggruppamento (<a href="https://github.com/milvus-io/milvus/pull/53500">#53500</a>)</li>
<li>Aggiunta un’API di conformità che riporta la convergenza della configurazione di carico a livello globale e per gruppo di risorse, coprendo la funzionalità delle repliche, la visibilità delle query, le risorse residue e il posizionamento del WAL (<a href="https://github.com/milvus-io/milvus/pull/53517">#53517</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Risolto un problema per cui le query potevano restituire risultati errati dopo che un campo di array di tipo struct era stato rimosso e aggiunto nuovamente (<a href="https://github.com/milvus-io/milvus/pull/52921">#52921</a>)</li>
<li>Risolti gli errori di autenticazione SASL/SCRAM-SHA-256 durante la connessione ai broker Apache Kafka 4.x aggiornando librdkafka alla versione 2.6.1 (<a href="https://github.com/milvus-io/milvus/pull/53086">#53086</a>)</li>
<li>Risolto un problema per cui tutti i canali di una replica venivano assegnati a un singolo nodo di query, causando ripetute interruzioni per esaurimento della memoria e rendendo la replica non operativa (<a href="https://github.com/milvus-io/milvus/pull/53094">#53094</a>)</li>
<li>Risolto il problema del fencing WAL ripetuto che bloccava le scritture su un PChannel per 45-60 secondi ogni pochi minuti in caso di ingestione prolungata (<a href="https://github.com/milvus-io/milvus/pull/53118">#53118</a>)</li>
<li>Risolto il problema per cui la compattazione di Storage V2 eliminava percorsi di gruppo fisici validi, il che poteva causare un disallineamento degli indici delle colonne compresse nei segmenti compattati (<a href="https://github.com/milvus-io/milvus/pull/53202">#53202</a>)</li>
<li>Risolto il problema per cui i log di compattazione riportavano le chiavi di crittografia delle raccolte e le credenziali di object storage (<a href="https://github.com/milvus-io/milvus/pull/53226">#53226</a>)</li>
<li>Risolto il problema degli alias di offset di array di strutture obsoleti che potevano far emergere dati errati dopo la riapertura di un segmento sigillato (<a href="https://github.com/milvus-io/milvus/pull/53154">#53154</a>)</li>
<li>Risolto il problema per cui la sincronizzazione delle risorse file veniva eseguita prima dell’aggiunta di qualsiasi risorsa, il che poteva cancellare i file locali del nodo all’avvio o alla registrazione del nodo (<a href="https://github.com/milvus-io/milvus/pull/53170">#53170</a>)</li>
<li>Risolto un problema per cui un blocco di binlog incompleto poteva essere trattato silenziosamente come completamente letto, con il rischio di perdere dati nei risultati delle query e della compattazione (<a href="https://github.com/milvus-io/milvus/pull/53263">#53263</a>)</li>
<li>Risolto un problema per cui lo spazio di archiviazione dei segmenti eliminati non veniva mai recuperato per le collezioni prive di indici attivi (<a href="https://github.com/milvus-io/milvus/pull/53252">#53252</a>)</li>
<li>Risolto il problema della stima imprecisa delle risorse durante il caricamento di indici vettoriali sparsi, che poteva portare a una gestione errata dei dati grezzi e a avvisi ripetuti su QueryNode (<a href="https://github.com/milvus-io/milvus/pull/53249">#53249</a>)</li>
<li>Risolto un problema per cui un nodo di streaming congelato al di fuori del gruppo di risorse primario poteva essere sbloccato in modo imprevisto durante il ribilanciamento (<a href="https://github.com/milvus-io/milvus/pull/53229">#53229</a>)</li>
<li>Risolto un errore di connessione a Google Cloud Storage in cui le credenziali GCP (IAM e HMAC) non erano state registrate prima del controllo preliminare del chunk manager (<a href="https://github.com/milvus-io/milvus/pull/53288">#53288</a>)</li>
<li>Risolto un problema per cui i log C++ venivano scritti in modo imprevisto nella directory <code translate="no">/tmp</code> invece di essere inoltrati all’output unificato dei log (<a href="https://github.com/milvus-io/milvus/pull/53293">#53293</a>)</li>
<li>Risolto il problema per cui i commit di backfill fallivano con un errore HTTP 500 quando un risultato Spark si estendeva su più partizioni (<a href="https://github.com/milvus-io/milvus/pull/53346">#53346</a>)</li>
<li>Risolto un leak di memoria in DataNode in cui un'attività di creazione di indice o di analisi annullata non liberava mai la memoria nativa dell'oggetto che aveva già creato (<a href="https://github.com/milvus-io/milvus/pull/53348">#53348</a>)</li>
<li>Risolto un problema per cui l’importazione del binlog falliva quando un campo vettoriale nullabile non aveva file di binlog (<a href="https://github.com/milvus-io/milvus/pull/53363">#53363</a>)</li>
<li>Risolti i campi di output incompleti o errati quando le richieste di ricerca e di query leggevano i dati delle tabelle esterne (<a href="https://github.com/milvus-io/milvus/pull/53372">#53372</a>, <a href="https://github.com/milvus-io/milvus/pull/53385">#53385</a>)</li>
<li>Risolti i duplicati delle righe di vettori sparsi e degli ID di partizione nelle richieste REST, oltre a problemi di proprietà e pulizia della memoria che potevano causare arresti anomali o perdite quando le query terminavano prematuramente (<a href="https://github.com/milvus-io/milvus/pull/53402">#53402</a>)</li>
<li>Risolto un problema per cui una compattazione che segnalava il completamento senza un payload di risultato poteva causare il crash di DataCoord o lasciare l’attività di compattazione bloccata invece di essere riprovata correttamente (<a href="https://github.com/milvus-io/milvus/pull/53443">#53443</a>)</li>
<li>Risolto un problema per cui le proprietà dei file di dati esterni venivano perse durante la creazione dei manifesti dei segmenti, causando la perdita dei metadati dei file sorgente nelle raccolte esterne (<a href="https://github.com/milvus-io/milvus/pull/53444">#53444</a>)</li>
<li>Risolto un arresto anomalo di QueryNode che poteva verificarsi durante la gestione delle richieste <code translate="no">count(*)</code> a livello di log di debug, in particolare durante gli aggiornamenti graduali (<a href="https://github.com/milvus-io/milvus/pull/53474">#53474</a>)</li>
<li>Risolto un problema per cui le attività di creazione di indici e statistiche continuavano a consumare risorse dei worker dopo che il relativo segmento, indice o raccolta era stato eliminato, e migliorata la pulizia dei file di indice orfani (<a href="https://github.com/milvus-io/milvus/pull/53515">#53515</a>)</li>
<li>È stata corretta la gestione dei percorsi di archiviazione locale in modo che i dati scritti da diversi componenti finiscano sempre dove i lettori e la garbage collection se li aspettano, con aggiornamento automatico per le distribuzioni locali esistenti (<a href="https://github.com/milvus-io/milvus/pull/53530">#53530</a>)</li>
<li>Risolto il problema per cui le attività di creazione degli indici continuavano a riprovare all’infinito quando un segmento conteneva documenti JSON non validi; tali creazioni ora falliscono rapidamente invece di consumare indefinitamente le risorse dei worker (<a href="https://github.com/milvus-io/milvus/pull/53531">#53531</a>)</li>
<li>Risolto il problema dei ripristini simultanei di snapshot diretti alla stessa collezione: i ripristini sono ora serializzati e un ripristino su una destinazione esistente viene rifiutato con un chiaro errore “già presente nel database” invece di causare conflitti o perdite di risorse (<a href="https://github.com/milvus-io/milvus/pull/53586">#53586</a>)</li>
<li>Risolto il problema della corruzione delle chiavi di crittografia binaria tra le interfacce di archiviazione e del disallineamento dei cursori nei lettori compressi di Storage V2 proiettati, aggiornando milvus-storage (<a href="https://github.com/milvus-io/milvus/pull/53569">#53569</a>)</li>
</ul>
<h2 id="v301" class="common-anchor-header">v3.0.1<button data-href="#v301" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 9 settembre 2026</p>
<table>
<thead>
<tr><th>Versione di Milvus</th><th>Versione SDK Python</th><th>Versione SDK Node.js</th><th>Versione SDK Java</th><th>Versione SDK Go</th></tr>
</thead>
<tbody>
<tr><td>3.0.1</td><td>3.0.1</td><td>3.0.5</td><td>3.0.9</td><td>3.0.1</td></tr>
</tbody>
</table>
<p>Siamo lieti di annunciare il rilascio di Milvus v3.0.1! Questa versione introduce la gestione degli snapshot REST v2, funzionalità di riclassificazione ampliate e il supporto per i campi TEXT nel client Go e nell'API RESTful, oltre a miglioramenti delle prestazioni e correzioni relative a Storage V3, alla coerenza dei dati e alla sicurezza.</p>
<h3 id="Features-improvements" class="common-anchor-header">Miglioramenti alle funzionalità<button data-href="#Features-improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Aggiunte API REST v2 per la gestione nativa degli snapshot a livello di collezione e il ripristino asincrono (<a href="https://github.com/milvus-io/milvus/pull/52118">#52118</a>, <a href="https://github.com/milvus-io/milvus/pull/52172">#52172</a>)</li>
<li>Aggiunta una soglia configurabile per il numero di risultati per controllare la selezione del percorso di output Take per le operazioni di ricerca e query (<a href="https://github.com/milvus-io/milvus/pull/52437">#52437</a>)</li>
<li>Aggiunto il supporto per i campi TEXT nel client Go e nell’API RESTful (<a href="https://github.com/milvus-io/milvus/pull/52450">#52450</a>)</li>
<li>Aggiunte velocità IOPS di lettura iniziali e massime configurabili per le tabelle esterne (<a href="https://github.com/milvus-io/milvus/pull/52503">#52503</a>)</li>
<li>Aggiunta un'impostazione opzionale per i processi di aggiornamento delle collezioni esterne che consente di attendere l'indicizzazione di tutti i segmenti prima di segnalare il completamento, senza ritardare la pubblicazione dei dati (<a href="https://github.com/milvus-io/milvus/pull/52712">#52712</a>)</li>
<li>Aggiunto il supporto al re-ranking L1 alle catene di funzioni di ricerca (<a href="https://github.com/milvus-io/milvus/pull/52745">#52745</a>)</li>
<li>Aggiunta la riorganizzazione ponderata RRF con pesi opzionali per ogni richiesta ANN in FunctionScore, REST, ricerca ibrida legacy e client Go (<a href="https://github.com/milvus-io/milvus/pull/52891">#52891</a>, <a href="https://github.com/milvus-io/milvus/pull/52926">#52926</a>)</li>
</ul>
<h3 id="Stability-improvements" class="common-anchor-header">Miglioramenti alla stabilità<button data-href="#Stability-improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Migliorata la sicurezza della memoria negli indici e nelle cache RTree della geometria, nonché la gestione delle query WKB non analizzabili e delle geometrie vuote (<a href="https://github.com/milvus-io/milvus/pull/51312">#51312</a>)</li>
<li>Gestione della memoria migliorata grazie al ripristino della gestione della memoria transitoria a livello di processo e alla correzione delle stime di memoria per il caricamento simultaneo dei campi Storage V2/V3 e degli indici scalari V3 (<a href="https://github.com/milvus-io/milvus/pull/51405">#51405</a>)</li>
<li>Riduzione dei colli di bottiglia nel download e dell’utilizzo della memoria durante la creazione di indici di collezioni esterne, grazie alla parallelizzazione delle letture e allo streaming dei dati vettoriali grezzi su disco (<a href="https://github.com/milvus-io/milvus/pull/51651">#51651</a>)</li>
<li>Miglioramento del throughput di Woodpecker per carichi di lavoro con piccoli batch e alta concorrenza, grazie al raggruppamento in batch delle aggiunte dei client e all’esposizione delle impostazioni di sincronizzazione (<a href="https://github.com/milvus-io/milvus/pull/51810">#51810</a>)</li>
<li>Migliorata la proprietà del lettore di record e la coerenza del ciclo di vita, la gestione dei blob vuoti e la segnalazione degli errori di lettura lungo i percorsi di archiviazione e compattazione (<a href="https://github.com/milvus-io/milvus/pull/51891">#51891</a>)</li>
<li>Migliorata l’efficienza della ricerca hash di raggruppamento con una pipeline intercalata a quattro vie e misure di protezione per collisioni e limiti di rehash (<a href="https://github.com/milvus-io/milvus/pull/51977">#51977</a>)</li>
<li>Riduzione del sovraccarico di elaborazione degli inserimenti saltando l’analisi del corpo dell’inserimento WAL per le collezioni prive di campi di output BM25 o MinHash (<a href="https://github.com/milvus-io/milvus/pull/51986">#51986</a>)</li>
<li>Migliorata la segnalazione degli errori di archiviazione e la gestione dei tentativi di riprova, preservando le classificazioni degli errori transitori e permanenti attraverso i livelli di esecuzione (<a href="https://github.com/milvus-io/milvus/pull/51990">#51990</a>)</li>
<li>Migliorate le prestazioni delle query spaziali abilitando di default la suddivisione GIS in approssimativo/raffinato e la fusione dei predicati nella stessa colonna (<a href="https://github.com/milvus-io/milvus/pull/52008">#52008</a>)</li>
<li>Migliorata la pianificazione delle attività di indicizzazione del testo e di suddivisione JSON grazie al controllo di ammissione basato su backlog condiviso e alla priorità di invio alternata (<a href="https://github.com/milvus-io/milvus/pull/52010">#52010</a>)</li>
<li>Aggiunto il supporto mmap per le mappature di offset dei segmenti sigillati, con opzioni di caricamento dedicate e contabilità delle risorse su disco (<a href="https://github.com/milvus-io/milvus/pull/52035">#52035</a>)</li>
<li>Ottimizzato il caricamento dei dati di Storage V2 eseguendo su richiesta la stima della memoria dei blocchi per colonna (<a href="https://github.com/milvus-io/milvus/pull/52037">#52037</a>)</li>
<li>Aggiunto supporto AutoIndex lato server per gli indici associati ai nuovi campi di output delle funzioni, consentendo alle richieste add_function_field di omettere i parametri dell’indice o di specificare AUTOINDEX (<a href="https://github.com/milvus-io/milvus/pull/52109">#52109</a>)</li>
<li>Ridotti i payload dei report di distribuzione di QueryNode tramite report incrementali con fallback al report completo e ridotte le allocazioni di memoria durante la raccolta delle metriche (<a href="https://github.com/milvus-io/milvus/pull/52111">#52111</a>, <a href="https://github.com/milvus-io/milvus/pull/52119">#52119</a>)</li>
<li>Migliorata la sicurezza dell’hash delle password aumentando il costo bcrypt da 4 a 10; per aggiornare gli hash esistenti è richiesta la rotazione delle credenziali (<a href="https://github.com/milvus-io/milvus/pull/52145">#52145</a>)</li>
<li>Ridotta la decodifica ridondante durante le importazioni Parquet leggendo solo le colonne foglia richieste per i sottocampi degli array di strutture (<a href="https://github.com/milvus-io/milvus/pull/52224">#52224</a>)</li>
<li>Miglioramento del raggruppamento con fusione forzata tramite una pianificazione a più fasi basata sulle dimensioni e deprecazione dell’impostazione della soglia di pianificazione legacy (<a href="https://github.com/milvus-io/milvus/pull/52242">#52242</a>)</li>
<li>Aggiornato cgosymbolizer per impedire che i processi Milvus in esecuzione come PID 1 si blocchino a seguito di errori nativi (<a href="https://github.com/milvus-io/milvus/pull/52299">#52299</a>)</li>
<li>Migliorata la convalida del conteggio delle righe per gli input di evidenziazione semantica (<a href="https://github.com/milvus-io/milvus/pull/52409">#52409</a>)</li>
<li>Miglioramento del controllo dei tentativi di importazione con backoff configurabile per i tentativi di scrittura (<a href="https://github.com/milvus-io/milvus/pull/52414">#52414</a>, <a href="https://github.com/milvus-io/milvus/pull/52415">#52415</a>, <a href="https://github.com/milvus-io/milvus/pull/52427">#52427</a>)</li>
<li>Migliorata la gestione del ciclo di vita delle attività di analisi recuperando le versioni obsolete delle statistiche e persistendo gli stati terminali (<a href="https://github.com/milvus-io/milvus/pull/52416">#52416</a>, <a href="https://github.com/milvus-io/milvus/pull/52417">#52417</a>)</li>
<li>Miglioramento del coordinamento del ciclo di vita dei segmenti tramite l'attesa del rilascio del segmento dopo i timeout di blocco (<a href="https://github.com/milvus-io/milvus/pull/52422">#52422</a>)</li>
<li>Miglioramento dell’ordinamento dello storage per la compattazione dei dati con un merge a k vie (<a href="https://github.com/milvus-io/milvus/pull/52429">#52429</a>)</li>
<li>Riduzione dell’espansione del buffer di validità dei campi nullabili, preservando le maschere compresse durante l’accesso ai chunk, la valutazione delle espressioni e le statistiche JSON (<a href="https://github.com/milvus-io/milvus/pull/52451">#52451</a>)</li>
<li>Migliorata la protezione di credenziali sensibili, chiavi API, hash delle password RBAC e dettagli delle fonti di raccolta esterne, impedendone l’esposizione nei log o nei messaggi di errore (<a href="https://github.com/milvus-io/milvus/pull/52487">#52487</a>, <a href="https://github.com/milvus-io/milvus/pull/52664">#52664</a>, <a href="https://github.com/milvus-io/milvus/pull/52710">#52710</a>)</li>
<li>Miglioramento del controllo della concorrenza degli aggiornamenti parziali con convalida CAS ottimistica e tentativi di ripetizione sicuri per i conflitti ammissibili (<a href="https://github.com/milvus-io/milvus/pull/52495">#52495</a>)</li>
<li>Migliorata la stabilità degli snapshot di lettura dei segmenti in crescita e la gestione della durata degli snapshot dello schema (<a href="https://github.com/milvus-io/milvus/pull/52572">#52572</a>)</li>
<li>Riduzione delle scansioni ridondanti dei metadati di autorizzazione durante i backup (<a href="https://github.com/milvus-io/milvus/pull/52612">#52612</a>)</li>
<li>Migliorata la mappatura degli ID vettoriali nullabili spostandola nel livello dell’indice, unificando la gestione degli ID logici e supportando mappature basate su mmap per gli indici sigillati (<a href="https://github.com/milvus-io/milvus/pull/52657">#52657</a>)</li>
<li>Migliorata la sincronizzazione tra la compilazione JIT di Sonic e il caricamento dei plugin Go nelle build CPU e GPU (<a href="https://github.com/milvus-io/milvus/pull/52738">#52738</a>)</li>
<li>Migliorata la risoluzione del canale del percorso di scrittura del proxy tramite la cache dei metadati, eliminando le RPC ridondanti del coordinatore e migliorando la classificazione degli errori (<a href="https://github.com/milvus-io/milvus/pull/52739">#52739</a>)</li>
<li>Ridotto il tempo di calcolo del recall da circa 3,08 secondi a 18,5 millisecondi con topk=100000 nel benchmark riportato (<a href="https://github.com/milvus-io/milvus/pull/52763">#52763</a>)</li>
<li>Ottimizzazione del filtraggio dei campi nullabili riutilizzando le bitmap di validità, riducendo l’archiviazione ridondante degli offset nulli e accelerando le copie dei bit set (<a href="https://github.com/milvus-io/milvus/pull/52801">#52801</a>, <a href="https://github.com/milvus-io/milvus/pull/52823">#52823</a>, <a href="https://github.com/milvus-io/milvus/pull/52825">#52825</a>)</li>
<li>Miglioramento degli indici scalari ibridi sui sottocampi di strutture annidate utilizzando STL_SORT quando il numero di elementi distinti raggiunge il limite di cardinalità della bitmap (<a href="https://github.com/milvus-io/milvus/pull/52849">#52849</a>)</li>
<li>Migliorata l’efficienza del filtraggio degli ID dei segmenti nella cache dei metadati (<a href="https://github.com/milvus-io/milvus/pull/52855">#52855</a>)</li>
<li>Riduzione delle allocazioni di memoria nelle funzioni di supporto per l’hash (<a href="https://github.com/milvus-io/milvus/pull/52857">#52857</a>)</li>
<li>Ottimizzazione dell’ordinamento dei risultati di rerank unificati eliminando le ricerche nella mappa per ogni confronto (<a href="https://github.com/milvus-io/milvus/pull/52885">#52885</a>)</li>
<li>Migliorata la sicurezza della memoria durante la gestione dei valori predefiniti JSON e delle viste stringa non terminate con NUL (<a href="https://github.com/milvus-io/milvus/pull/52906">#52906</a>)</li>
<li>Migliorati i tempi di compilazione in C++ grazie alla compilazione unitaria con ambito, alla cache del compilatore ottimizzata e alla riduzione del lavoro di compilazione ridondante (<a href="https://github.com/milvus-io/milvus/pull/52995">#52995</a>)</li>
<li>Migliorata la copertura e l’aggiornamento delle metriche del filesystem raccogliendo le metriche dai filesystem memorizzati nella cache al momento dello scraping, preservando al contempo i nomi e le etichette delle metriche esistenti (<a href="https://github.com/milvus-io/milvus/pull/53026">#53026</a>)</li>
<li>Aggiunta l’impostazione aggiornabile growingBuildThreadRate per configurare il numero di thread per la creazione dell’indice provvisorio dei segmenti in crescita, pur mantenendo l’impostazione predefinita a thread singolo (<a href="https://github.com/milvus-io/milvus/pull/53033">#53033</a>)</li>
<li>Aggiunto il supporto per il writeback dei dati dei campi mmap alla versione 3.0 tramite un backport, con l’opzione queryNode.mmap.writeback disabilitata per impostazione predefinita (<a href="https://github.com/milvus-io/milvus/pull/53079">#53079</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Risolti risultati errati e convalida incoerente dei predicati nelle query JSON, ARRAY e TIMESTAMPTZ, inclusi predicati di tipo misto, confronti di numeri grandi e filtraggio su più batch (<a href="https://github.com/milvus-io/milvus/pull/51775">#51775</a>)</li>
<li>Risolto il problema dell’incoerenza dei dati aggiornati durante gli aggiornamenti paralleli delle raccolte esterne quando i file di origine di un segmento si estendevano su più attività (<a href="https://github.com/milvus-io/milvus/pull/51893">#51893</a>)</li>
<li>Corrette le espressioni MATCH che accettavano predicati che non operavano a livello di elemento (<a href="https://github.com/milvus-io/milvus/pull/51940">#51940</a>)</li>
<li>Risolto il problema per cui le ricerche senza corrispondenze fallivano con un errore relativo a un tipo di ID non supportato (<a href="https://github.com/milvus-io/milvus/pull/51999">#51999</a>)</li>
<li>Risolto il blocco di Milvus standalone durante lo spegnimento aggiungendo un timeout di migrazione configurabile con un valore predefinito di 10 secondi (<a href="https://github.com/milvus-io/milvus/pull/52027">#52027</a>)</li>
<li>Risolto il problema delle richieste di embedding di tabelle esterne che utilizzavano un'identità di cluster errata quando i worker DataNode erano condivisi tra i cluster di servizio (<a href="https://github.com/milvus-io/milvus/pull/52042">#52042</a>)</li>
<li>Risolto un problema che impediva l'aggiornamento di integration_id e model_deployment_id per le funzioni TextEmbedding (<a href="https://github.com/milvus-io/milvus/pull/52081">#52081</a>)</li>
<li>Risolto il problema per cui le risposte HTTP JSON omettevano lo stato esplicito ok=false per i segmenti di backfill non riusciti (<a href="https://github.com/milvus-io/milvus/pull/52082">#52082</a>)</li>
<li>Risolto il problema per cui i caricamenti di oggetti MinIO fallivano con errore HTTP 400 XAmzContentChecksumMismatch in caso di riprova dopo timeout di trasporto o di bassa velocità (<a href="https://github.com/milvus-io/milvus/pull/52128">#52128</a>, <a href="https://github.com/milvus-io/milvus/pull/52194">#52194</a>)</li>
<li>Risolto il blocco del bilanciamento dei segmenti tra i QueryNode quando il servizio di streaming era abilitato (<a href="https://github.com/milvus-io/milvus/pull/52147">#52147</a>, <a href="https://github.com/milvus-io/milvus/pull/52169">#52169</a>)</li>
<li>Risolto il problema della perdita silenziosa di dati durante la compattazione mista quando non era possibile ricostruire i record conservati (<a href="https://github.com/milvus-io/milvus/pull/52200">#52200</a>)</li>
<li>Risolto il problema per cui i ripristini degli snapshot perdevano le impostazioni delle raccolte e passavano inaspettatamente alla "Strong consistency" (<a href="https://github.com/milvus-io/milvus/pull/52206">#52206</a>)</li>
<li>Risolto il problema per cui le eliminazioni in streaming tralasciavano i segmenti sigillati appena caricati, consentendo ai dati eliminati di rimanere interrogabili (<a href="https://github.com/milvus-io/milvus/pull/52218">#52218</a>)</li>
<li>Risolto il problema per cui gli indici annidati non venivano creati correttamente per i dati vuoti (<a href="https://github.com/milvus-io/milvus/pull/52247">#52247</a>)</li>
<li>Risolti i deadlock durante il passaggio al servizio di streaming che lasciavano le operazioni in attesa a tempo indeterminato (<a href="https://github.com/milvus-io/milvus/pull/52292">#52292</a>)</li>
<li>Risolto il problema dei valori predefiniti errati della geometria durante la compattazione e la ricostruzione dei record, nonché dei contrassegni "null" errati per i valori della geometria precompilati nelle importazioni Parquet (<a href="https://github.com/milvus-io/milvus/pull/52350">#52350</a>)</li>
<li>Risolto il problema per cui segmenti V3 validi venivano rifiutati durante la compattazione e il ripristino dopo un riavvio di DataCoord (<a href="https://github.com/milvus-io/milvus/pull/52383">#52383</a>, <a href="https://github.com/milvus-io/milvus/pull/52389">#52389</a>, <a href="https://github.com/milvus-io/milvus/pull/52390">#52390</a>, <a href="https://github.com/milvus-io/milvus/pull/52391">#52391</a>, <a href="https://github.com/milvus-io/milvus/pull/52392">#52392</a>, <a href="https://github.com/milvus-io/milvus/pull/52393">#52393</a>)</li>
<li>Risolti gli errori di caricamento dei segmenti con un errore di metadati di versione mancanti durante l'utilizzo di indici scalari ibridi su sottocampi di array VARCHAR nelle strutture (<a href="https://github.com/milvus-io/milvus/pull/52385">#52385</a>)</li>
<li>Risolto il problema per cui le colonne esterne non venivano aggiornate quando veniva riaperto un manifesto aggiornato (<a href="https://github.com/milvus-io/milvus/pull/52397">#52397</a>)</li>
<li>Risolta la gestione errata del fuso orario nelle ricerche con condizioni dipendenti dal tempo (<a href="https://github.com/milvus-io/milvus/pull/52407">#52407</a>)</li>
<li>Risolta la gestione errata degli input ArrayOfVector nelle richieste di ricerca (<a href="https://github.com/milvus-io/milvus/pull/52408">#52408</a>)</li>
<li>Risolto il problema per cui gli inserimenti non rifiutavano le righe che superavano il limite di dimensione supportato (<a href="https://github.com/milvus-io/milvus/pull/52426">#52426</a>)</li>
<li>Risolto il problema per cui gli indici provvisori ignoravano la versione dell’indice di destinazione configurata (<a href="https://github.com/milvus-io/milvus/pull/52449">#52449</a>)</li>
<li>Risolto il problema per cui le query che utilizzavano order_by non restituivano campi di output vettoriali densi (<a href="https://github.com/milvus-io/milvus/pull/52504">#52504</a>, <a href="https://github.com/milvus-io/milvus/pull/52606">#52606</a>)</li>
<li>Risolto il problema per cui i privilegi revocati rimanevano attivi dopo essere stati rimossi da un gruppo di privilegi (<a href="https://github.com/milvus-io/milvus/pull/52554">#52554</a>)</li>
<li>Risolto il conteggio errato dei file binlog e delle etichette del formato di archiviazione per i segmenti Storage V3 dopo il riavvio di DataCoord (<a href="https://github.com/milvus-io/milvus/pull/52571">#52571</a>, <a href="https://github.com/milvus-io/milvus/pull/52578">#52578</a>)</li>
<li>Risolto il blocco dei ripristini di snapshot esterni dovuto a controlli inaffidabili della versione dei worker o a ripetuti tentativi con worker non supportati fino al timeout (<a href="https://github.com/milvus-io/milvus/pull/52639">#52639</a>)</li>
<li>Risolti gli errori di caricamento dei segmenti per gli indici HYBRID sui sottocampi struct-array con file STLSORT legacy della versione 3.0.0, senza necessità di reindicizzazione (<a href="https://github.com/milvus-io/milvus/pull/52643">#52643</a>)</li>
<li>Risolti i crash durante l’elaborazione di buffer di dati Arrow C di lunghezza zero (<a href="https://github.com/milvus-io/milvus/pull/52652">#52652</a>)</li>
<li>Risolta la gestione errata degli errori durante il caricamento o la riapertura dei segmenti Storage V3 a seguito di errori nel manifesto, preservando lo stato esistente dei segmenti per tentativi di esecuzione sicuri (<a href="https://github.com/milvus-io/milvus/pull/52678">#52678</a>)</li>
<li>Risolti gli errori di query quando i filtri degli elementi ARRAY incontravano batch completi di NULL o array vuoti prima degli elementi successivi (<a href="https://github.com/milvus-io/milvus/pull/52720">#52720</a>)</li>
<li>Risolti i lavori di backfill che confermavano incorporamenti non aggiornati dopo la modifica dello schema della raccolta (<a href="https://github.com/milvus-io/milvus/pull/52789">#52789</a>)</li>
<li>Risolto il problema per cui i campi mancanti nei record di Storage V3 venivano restituiti come NULL anziché con i valori predefiniti dichiarati (<a href="https://github.com/milvus-io/milvus/pull/52790">#52790</a>, <a href="https://github.com/milvus-io/milvus/pull/52807">#52807</a>, <a href="https://github.com/milvus-io/milvus/pull/52888">#52888</a>)</li>
<li>Risolti gli errori di copia lato server che impedivano il ripristino degli snapshot di Storage V3 su GCS con credenziali IAM/OAuth, incluse le copie di oggetti di dimensioni superiori a 5 GiB (<a href="https://github.com/milvus-io/milvus/pull/52792">#52792</a>)</li>
<li>Risolto l'accesso non autenticato tramite chiamate gRPC in streaming sulla porta del proxy esterno (<a href="https://github.com/milvus-io/milvus/pull/52854">#52854</a>)</li>
<li>Risolta la perdita dei timestamp di commit originali dei dati dopo la compattazione del cluster (<a href="https://github.com/milvus-io/milvus/pull/52859">#52859</a>)</li>
<li>Risolti i crash dei nodi di streaming causati da ripetuti errori di flush dopo l’aggiunta di un campo TEXT a collezioni con segmenti Storage V2 esistenti (<a href="https://github.com/milvus-io/milvus/pull/52897">#52897</a>)</li>
<li>Risolto il problema per cui le righe scadute nei segmenti di Storage V3 non attivavano la compattazione basata sul campo TTL e rimanevano memorizzate fino al verificarsi di un'altra condizione di compattazione (<a href="https://github.com/milvus-io/milvus/pull/52931">#52931</a>)</li>
<li>Risolto il problema delle chiavi primarie generate automaticamente incoerenti tra le collezioni di origine e di destinazione durante le importazioni replicate tramite CDC (<a href="https://github.com/milvus-io/milvus/pull/52941">#52941</a>)</li>
<li>Risolto il problema della perdita di scritture simultanee durante la migrazione del backend WAL (<a href="https://github.com/milvus-io/milvus/pull/52947">#52947</a>, <a href="https://github.com/milvus-io/milvus/pull/52951">#52951</a>, <a href="https://github.com/milvus-io/milvus/pull/52955">#52955</a>)</li>
<li>Risolto il problema per cui gli indici HYBRID annidati, ricostruiti o compattati con dati ad alta cardinalità, diventavano illeggibili dopo il rollback a una versione precedente (<a href="https://github.com/milvus-io/milvus/pull/52959">#52959</a>)</li>
<li>Risolta la gestione degli elementi nulli nelle righe vettoriali dense esterne, accettando righe nullabili interamente nulle e aggiungendo una gestione configurabile delle righe parzialmente nulle (<a href="https://github.com/milvus-io/milvus/pull/52968">#52968</a>)</li>
<li>Risolto il conteggio errato delle righe dei segmenti V3 e i ripetuti errori di compattazione con ordinamento a seguito del failover del nodo di streaming (<a href="https://github.com/milvus-io/milvus/pull/52970">#52970</a>)</li>
<li>Risolto il problema delle query che combinavano condizioni di intervallo con OR, omettendo i record al limite inferiore incluso (<a href="https://github.com/milvus-io/milvus/pull/52998">#52998</a>)</li>
<li>Risolto il problema per cui le ricerche per chiave primaria non mantenevano l’ordine degli ID richiesto (<a href="https://github.com/milvus-io/milvus/pull/52999">#52999</a>)</li>
<li>Risolto un problema per cui l’aggiunta di un campo TEXT dopo l’abilitazione di Storage V3 impediva il caricamento dei segmenti di Storage V2 esistenti in fase di espansione, interrompendo le operazioni di flush, ordinamento e indicizzazione (<a href="https://github.com/milvus-io/milvus/pull/53002">#53002</a>)</li>
<li>Risolti i problemi relativi agli snapshot che includevano segmenti Storage V3 non confermati, causando la segnalazione di successo dei ripristini mentre i segmenti ripristinati non potevano essere caricati (<a href="https://github.com/milvus-io/milvus/pull/53022">#53022</a>, <a href="https://github.com/milvus-io/milvus/pull/53039">#53039</a>)</li>
<li>Risolto il problema per cui gli indici di testo di Storage V3 non venivano caricati quando i relativi file erano memorizzati in directory di attività o versioni annidate (<a href="https://github.com/milvus-io/milvus/pull/53062">#53062</a>)</li>
</ul>
<h2 id="v300" class="common-anchor-header">v3.0.0<button data-href="#v300" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 29 luglio 2026</p>
<table>
<thead>
<tr><th>Versione Milvus</th><th>Versione SDK Python</th><th>Versione SDK Node.js</th><th>Versione SDK Java</th><th>Versione SDK Go</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 è stato ufficialmente rilasciato! Basandosi sull'architettura lake-native introdotta nella <a href="https://milvus.io/docs/release_notes.md#v30-beta">versione 3.0-beta</a>, questa versione completa ciò che la beta aveva iniziato: External Collection copre un numero maggiore di flussi di lavoro lakehouse; lo schema supporta l'aggiunta, il backfill e l'eliminazione online; l'indice sparse è stato ricostruito attorno a SINDI; StructArray e la ricerca per faccette completano il motore di recupero; il passthrough FAISS e TEXT ampliano le opzioni di indicizzazione e modalità; e Woodpecker funziona come servizio autonomo.</p>
<p>Guarda il video qui sotto per saperne di più su Milvus 3.0 e partecipa alla sessione AMA con i manutentori principali:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>Se non conosci ancora la linea 3.0, la sezione “Riepilogo delle funzionalità principali di 3.0” qui sotto riassume le funzionalità introdotte nella versione 3.0-beta; le <a href="https://milvus.io/docs/release_notes.md#v30-beta">note di rilascio della versione 3.0-beta</a> contengono le descrizioni complete.</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">Novità della versione 3.0.0 (rispetto alla 3.0-beta)<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">Raccolta esterna: flussi di lavoro lakehouse più completi</h4><p>La versione 3.0-beta ha introdotto la "Collezione esterna": è possibile fare riferimento ai file del lakehouse in loco, creare indici ed effettuare ricerche senza copiare i dati in Milvus. Questa versione estende tale funzionalità verso flussi di lavoro completi di recupero dati in ambiente "lakehouse". I campi esterni possono ora alimentare i campi di output delle funzioni, come i vettori sparsi BM25, le firme MinHash e gli embedding di testo, in modo che i campi di recupero derivati dal testo e dai modelli vengano creati all’interno di Milvus senza copiare la tabella di origine. Refresh supporta inoltre l’evoluzione additiva dello schema: quando la tabella esterna acquisisce nuove colonne, Milvus aggiorna i segmenti interessati invece di ricostruire la collezione.</p>
<p>Questa versione aggiunge inoltre un formato esterno denominato " <code translate="no">milvus-table</code> " che tratta i metadati degli snapshot di Milvus e i manifesti di Storage V3 come una fonte esterna, in modo che uno snapshot della collezione possa essere a sua volta utilizzato come tabella esterna: i sistemi di elaborazione in batch e di servizio ottengono una visione condivisa degli stessi dati, supportata dai manifesti.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/create-an-external-collection.md">Creare una raccolta esterna</a> e <a href="/docs/it/snapshots.md">snapshot</a>.</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">Schema flessibile: aggiungere, integrare e rimuovere colonne online</h4><p>Gli schemi non rimangono statici in produzione — i modelli incorporati vengono sostituiti, le feature subiscono iterazioni, i campi vengono deprecati — e in passato ciò comportava la ricostruzione completa della collezione con tempi di inattività o doppie scritture. La versione 3.0.0 chiude il cerchio: le colonne possono essere aggiunte, riempite ed eliminate mentre il servizio continua.</p>
<p>Il backfill funziona in entrambe le direzioni. Il backfill esterno gestisce i valori calcolati al di fuori di Milvus: si aggiunge una colonna, si crea uno snapshot della collezione come punto di partenza coerente, si esegue il processo offline, si riscrivono i valori e Milvus indicizza la nuova colonna in modo incrementale — un aggiornamento del modello di embedding su centinaia di milioni di righe diventa un’operazione a caldo senza tempi di inattività. Il backfill interno copre i valori derivati dal kernel: basta associare una funzione BM25 o MinHash a una collezione esistente e il campo di output viene calcolato automaticamente sui dati esistenti.</p>
<p>Per ulteriori informazioni, consultare la sezione <a href="/docs/it/add-fields-to-an-existing-collection.md">Aggiungere campi a una collezione esistente</a>.</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">Riorganizzazione degli indici sparsi: SINDI, Block-Max WAND e Block-Max MaxScore</h4><p>Milvus 3.0 aggiorna l’indice vettoriale sparso su tutta la linea. Introduce nuovi algoritmi di ricerca — <a href="https://arxiv.org/abs/2509.08395">SINDI</a>, Block-Max WAND e Block-Max MaxScore — insieme alla compressione con lista invertita, alla quantizzazione configurabile e alla selezione dell’algoritmo di ricerca per carico di lavoro. Anche il caricamento tramite mmap, la serializzazione e il punteggio BM25 sono stati ottimizzati, riducendo lo spazio di archiviazione dell’indice e il sovraccarico di caricamento per la ricerca su vettori sparsi su larga scala e la ricerca full-text. Nei benchmark interni, l’indice BM25 compresso è circa 3 volte più piccolo dell’indice sparso 2.6 a un recall comparabile, mentre SINDI raggiunge fino a circa 10 volte il QPS di MaxScore su embedding sparsi appresi. Una volta abilitata la nuova versione dell’indice (vedere le note su compatibilità e comportamento), SINDI diventa l’impostazione predefinita per la ricerca IP sparsa, mentre MaxScore è l’impostazione predefinita per BM25.</p>
<h4 id="StructArray-coverage" class="common-anchor-header">Copertura di StructArray</h4><p>StructArray ora supporta i valori nulli, gli indici bitmap, l’aggiunta dinamica di campi su collezioni attive e l’aggiornamento parziale dei campi delle strutture tramite upsert, con copertura REST e importazione in blocco corrispondenti.</p>
<p>La ricerca a livello di elemento aggiunge la ricerca ibrida tra i sottocampi vettoriali con raggruppamento configurabile per entità (varianti max / sum / avg / top-k), oltre alla ricerca per intervallo e al raggruppamento al suo interno. Il filtraggio annidato copre i predicati <code translate="no">element_filter</code>, i quantificatori <code translate="no">MATCH_ANY</code> / <code translate="no">MATCH_ALL</code> / <code translate="no">MATCH_LEAST</code> / <code translate="no">MATCH_MOST</code> / <code translate="no">MATCH_EXACT</code>, l’accesso posizionale ai sottocampi come <code translate="no">tags[0][name]</code> e <code translate="no">array_length()</code> sulla colonna struct.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/array-of-structs.md">StructArray</a> e <a href="/docs/it/struct-array-operators.md">Operatori StructArray</a>.</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">Aggregazione della ricerca e ricerca per faccette</h4><p>L’aggregazione delle query della versione beta calcola statistiche esatte sui dati filtrati; la versione 3.0.0 aggiunge la suddivisione per sfaccettature nel percorso di ricerca. Specificare un campo di sfaccettatura al momento della ricerca e Milvus restituirà i valori di sfaccettatura principali, ciascuno rappresentato dal membro che presenta la migliore corrispondenza nella classifica ANN e annotato con aggregati quali COUNT e AVG — la barra laterale della ricerca per sfaccettature (marchio, fascia di prezzo, attributi) in un’unica richiesta, invece di effettuare un recupero eccessivo e un conteggio lato client.</p>
<h4 id="Function-Chain-reranking" class="common-anchor-header">Riorganizzazione della classifica tramite Function Chain</h4><p>Il riclassamento è ora componibile tramite l’API Function Chain, che esegue una pipeline ordinata e tipizzata come parte di un’unica richiesta di ricerca. Una catena può combinare il riscoraggio L0 iniziale su QueryNode con il riclassamento L2 post-riduzione su Proxy, supportando la trasformazione e la combinazione dei punteggi, il riclassamento basato su modelli, l’ordinamento e il taglio dei candidati senza orchestrazione lato client. Questa versione aggiunge inoltre il punteggio XGBoost nativo per il riordino a livello L0 utilizzando modelli UBJ registrati come FileResources, insieme ai provider di inferenza Hugging Face per l’embedding testuale gestito dal server e il riordino basato sulla somiglianza delle frasi.</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">Campi TEXT per testi lunghi</h4><p>I campi TEXT rendono i testi lunghi di prima classe, eliminando i limiti di lunghezza a livello di archiviazione: supportano <code translate="no">text_match</code>, <code translate="no">phrase_match</code> e BM25. I valori inferiori a 64 KB rimangono in linea; quelli più grandi vengono trasferiti in file LOB a livello di partizione in formato Vortex, con la colonna che memorizza solo i riferimenti <code translate="no">(file_id, offset)</code>. I file LOB sono condivisi tra i segmenti, quindi la compattazione sposta i riferimenti invece di riscrivere il testo. Per RAG ciò significa recuperare vettori e testo sorgente dallo stesso archivio in un unico I/O — senza bisogno di gestire un archivio blob esterno.</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">Pass-through dell’indice FAISS</h4><p>Un nuovo tipo di indice « <code translate="no">FAISS</code> » accetta stringhe arbitrarie di «index-factory» di Faiss tramite il parametro « <code translate="no">faiss_index_name</code> » — <code translate="no">IVF64,Flat</code>, <code translate="no">HNSW16,Flat</code>, <code translate="no">OPQ16,IVF64,PQ16x4</code> — con i parametri di ricerca passati direttamente, in modo che le ricette di Faiss vengano riprodotte direttamente su Milvus.</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">Supporto dei formati Vortex e Lance</h4><p>Il livello di archiviazione acquisisce due formati colonnari aperti: Vortex come formato interno di nuova generazione — codifiche adattive (dizionario, RLE, bit-packing, compressione specifica per i numeri in virgola mobile), decompressione zero-copy, ottimizzato per carichi di lavoro misti vettoriali e scalari — e Lance, insieme a Parquet, per l’interoperabilità con l’ecosistema aperto. Vortex è destinato a diventare il formato interno predefinito, con il pushdown dei filtri e una variante locale in programma.</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Distribuzione autonoma di Woodpecker</h4><p>Woodpecker, il WAL al centro del percorso di scrittura in streaming, può ora essere implementato come servizio indipendente anziché integrato in altri nodi: scalabilità indipendente, isolamento dei guasti e osservabilità, come qualsiasi altro microservizio. Ciò è particolarmente importante per i cluster di grandi dimensioni e i carichi di lavoro con un elevato numero di scritture.</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">Riepilogo delle funzionalità principali della versione 3.0<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>Le funzionalità riportate di seguito sono state introdotte nella <a href="https://milvus.io/docs/release_notes.md#v30-beta">versione 3.0-beta</a> e fanno parte della versione 3.0.0; consultare le note sulla versione beta per le descrizioni complete.</p>
<ul>
<li><strong>Raccolta esterna</strong> — interrogazione dei dati del lakehouse (Parquet, Lance, Iceberg, Vortex) in loco: zero-copy, in sola lettura, sincronizzati tramite aggiornamento incrementale.</li>
<li><strong>Snapshot</strong> — viste di raccolta in sola lettura a un punto nel tempo tramite riferimento al segmento, con spazio di archiviazione marginale quasi nullo.</li>
<li><strong>Storage V3 (Loon)</strong> — archiviazione colonnare basata su manifest su storage a oggetti; la base per Snapshot e Raccolta esterna.</li>
<li><strong>Query / Ricerca ORDER BY</strong> — ordinamento multi-campo lato server con ASC / DESC per campo.</li>
<li><strong>Aggregazione delle query</strong> — COUNT / SUM / AVG / MIN / MAX con raggruppamento, valutata lato server.</li>
<li><strong>EmbList + DiskANN</strong> — indicizzazione multiveettoriale su disco per elenchi di incorporamento StructArray, con percorsi di accelerazione quali Muvera e Lemur.</li>
<li><strong>Funzione MinHash (doc-in, doc-out)</strong> — firme MinHash lato server più " <code translate="no">MINHASH_LSH</code> " per il rilevamento di quasi-duplicati.</li>
<li><strong>Vettori nullabili</strong> — NULL su tutti e sei i tipi di vettore; la ricerca salta le righe NULL e AddField si estende ai campi vettoriali.</li>
<li><strong>TTL delle entità</strong> — scadenza per riga determinata da un campo TIMESTAMPTZ.</li>
<li><strong>FileResource</strong> — dizionari, elenchi di sinonimi ed elenchi di stop-word gestiti a livello di cluster per analizzatori, BM25 e Text Match.</li>
<li><strong>Force Merge</strong> — compattazione dei segmenti attivata dall’operatore, in modalità sincrona o asincrona.</li>
</ul>
<h3 id="Compatibility-and-behavior-notes" class="common-anchor-header">Note sulla compatibilità e sul comportamento<button data-href="#Compatibility-and-behavior-notes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Storage V3 (Loon) è disabilitato per impostazione predefinita.</strong> Le funzionalità che dipendono da esso — come Snapshot e i campi TEXT — richiedono l’abilitazione manuale tramite <code translate="no">common.storage.useLoonFFI</code>. Storage V3 sarà abilitato per impostazione predefinita in una versione successiva.</li>
<li><strong>La compatibilità e il rollback dalla versione 2.6 alla 3.0 sono garantiti</strong>: una distribuzione della versione 3.0 può essere riportata alla versione 2.6. Tuttavia, una volta abilitate o utilizzate funzionalità che modificano il formato dei dati serializzati (ad esempio Storage V3), il rollback non è più possibile.</li>
<li><strong>Le nuove versioni dell’indice sono per ora opzionali.</strong> Gli algoritmi di indicizzazione di nuova introduzione richiedono l’aumento manuale della versione dell’indice di destinazione (da<code translate="no">dataCoord.targetVecIndexVersion</code> a 10, da <code translate="no">dataCoord.targetScalarIndexVersion</code> a 4) prima che entrino in vigore; una versione successiva li abiliterà per impostazione predefinita.</li>
<li><strong>Le immagini GPU passano a CUDA 12.9</strong> e non mantengono più la compatibilità GPU con Ubuntu 20.04.</li>
</ul>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 9 maggio 2026</p>
<table>
<thead>
<tr><th>Versione di Milvus</th><th>Versione SDK Python</th><th>Versione SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta amplia il database vettoriale Milvus con una nuova integrazione nell’ecosistema Open Lake: External Collection consente a Milvus di eseguire query sulle tabelle Lake esterne senza copia (zero-copy), mentre Spark può leggere le collezioni Milvus direttamente tramite Snapshot. Questa versione introduce inoltre funzionalità di recupero più avanzate, schemi più espressivi, una personalizzazione più approfondita della ricerca testuale, controlli più precisi sul ciclo di vita dei dati e dei modelli, nonché maggiori controlli a livello di operatore. Milvus 3.0 costituisce il kernel centrale di Zilliz Lakebase, ne alimenta le funzionalità unificate di serving, discovery e batch.</p>
<h3 id="Key-Features" class="common-anchor-header">Caratteristiche principali<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">External Collection</h4><p>Nelle tipiche pipeline di dati per l’IA, terabyte di embedding e metadati risiedono già su sistemi di object storage sotto forma di tabelle Parquet, Lance o Iceberg. Copiare tali dati in Milvus raddoppia i costi di archiviazione, aggiunge una pipeline ETL che deve essere mantenuta sincronizzata e sottrae al cliente il controllo sulla governance dei dati.</p>
<p>La raccolta esterna elimina la necessità di copia. Una raccolta Milvus può fare riferimento ai file nella loro posizione originale, mentre Milvus gestisce solo lo schema, gli indici e l’esecuzione delle query. Un aggiornamento incrementale mantiene la raccolta allineata ai file sottostanti. I clienti i cui dati non possono lasciare il data lake, come i team finanziari e sanitari, possono eseguire il recupero vettoriale su quei dati direttamente dove si trovano. Un singolo set di dati residente nel data lake può anche essere servito da più istanze di Milvus contemporaneamente.</p>
<p>Per ulteriori informazioni, consultare la sezione <a href="/docs/it/create-an-external-collection.md">Creare una raccolta esterna</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Istantanea</h4><p>La distribuzione e la scoperta in batch spesso richiedono la stessa Collection contemporaneamente. La valutazione di modelli A/B, la deduplicazione su larga scala, la convalida del backfill e il rollback delle versioni richiedono tutte una visione stabile della Collection mentre le operazioni di scrittura sono ancora in corso.</p>
<p>Lo snapshot crea una vista "point-in-time" e di sola lettura di una raccolta facendo riferimento ai segmenti esistenti anziché copiare i dati, quindi il costo marginale di archiviazione è prossimo allo zero. I processi batch possono leggere dallo snapshot con isolamento in stile MVCC mentre la raccolta attiva continua ad accettare operazioni di scrittura.</p>
<p>Per ulteriori informazioni, consultare le sezioni " <a href="/docs/it/snapshots.md">Snapshot</a>", <a href="/docs/it/manage-snapshots.md">"Gestione degli snapshot</a>" e <a href="/docs/it/snapshot-use-cases.md">"Casi d’uso degli snapshot</a>".</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Query / Ricerca con ordinamento</h4><p>La ricerca e le query ora supportano l’ordinamento su più campi, con l’ordinamento esternalizzato nel kernel di Milvus e le opzioni “ <code translate="no">ASC</code> ” e “ <code translate="no">DESC</code> ” configurabili per ogni campo. Ciò colma una lacuna comune in produzione: il Top-K basato esclusivamente sulla distanza spesso non soddisfa le esigenze aziendali quando l’elemento più simile non è il più economico, il più recente o il più popolare.</p>
<p>Le applicazioni non devono più recuperare un numero eccessivo di risultati e riordinarli sul client per ottenere una classifica composita.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Ordinare i risultati di ricerca in base a campi scalari</a> e <a href="/docs/it/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Ordinare i risultati delle query</a>.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Aggregazione delle query</h4><p>In passato, per generare statistiche sulla distribuzione dei tenant, conteggi sulla completezza dei campi o lo stato di avanzamento del rollout delle versioni da una Milvus Collection, era necessario recuperare le entità corrispondenti sul client e aggregarle lì. Milvus 3.0 integra l’aggregazione scalare in stile SQL direttamente nel kernel. Una chiamata di query accetta espressioni di aggregazione e di " <code translate="no">group_by_fields</code> " in <code translate="no">output_fields</code>, tra cui <code translate="no">count(*)</code>, <code translate="no">count(&lt;field&gt;)</code>, <code translate="no">sum(&lt;field&gt;)</code>, <code translate="no">avg(&lt;field&gt;)</code>, <code translate="no">min(&lt;field&gt;)</code> e <code translate="no">max(&lt;field&gt;)</code>. L’aggregazione viene valutata sul lato server dopo il filtraggio.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">Risultati delle query aggregate</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vettore nullo</h4><p>Gli embedding vengono spesso generati in modo asincrono, pertanto un’entità può arrivare prima del relativo vettore. Anche i dati multimodali presentano lacune naturali, come un video senza sottotitoli o un prodotto senza immagine. Le versioni precedenti non offrivano una soluzione adeguata: le applicazioni ritardavano la scrittura fino a quando il vettore non era pronto oppure inserivano un vettore segnaposto, e entrambe le scelte compromettevano la qualità del recupero.</p>
<p>Milvus 3.0 supporta il valore NULL nei campi vettoriali per tutti e sei i tipi di vettori. La ricerca ignora automaticamente i vettori NULL, la qualità del recupero non ne risente e i vettori NULL non occupano praticamente spazio di archiviazione. Con questa modifica, la funzione " <code translate="no">AddField</code> " si estende anche ai campi vettoriali: con l'opzione ` <code translate="no">nullable=True</code>`, una collezione esistente può aggiungere nuovi campi vettoriali online senza necessità di ricostruzione.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/nullable-and-default.md">Campi nullabili</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Dizionario personalizzato e dizionario dei sinonimi</h4><p>I tokenizzatori predefiniti non sempre soddisfano i requisiti di qualità della ricerca in produzione. Il cinese, i domini verticali come medicina, diritto e chimica, nonché i corpora multilingue, possono trarre notevoli vantaggi dai dizionari personalizzati e dalle tabelle di sinonimi. Finora, queste risorse erano per lo più implementate come riscritture delle query a livello di applicazione.</p>
<p>Milvus 3.0 introduce un meccanismo FileResource per la registrazione di dizionari personalizzati per i tokenizzatori, elenchi di sinonimi, elenchi di parole da escludere e regole di scomposizione delle parole composte. Una volta registrata, una risorsa può essere richiamata da qualsiasi tokenizer o filtro e ha effetto su BM25, sugli analizzatori e su Text Match. I dizionari e i sinonimi possono ora essere gestiti centralmente con controllo delle versioni, anziché essere sparsi nel codice dell’applicazione.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/manage-file-resources.md">Gestione delle risorse file</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL delle entità</h4><p>Il TTL a livello di collezione e a livello di partizione è troppo generico per molti scenari relativi al ciclo di vita e alla conformità. Tenant diversi all’interno della stessa collezione hanno spesso regole di conservazione diverse e le singole entità potrebbero dover scadere secondo una tempistica che non corrisponde al resto della collezione.</p>
<p>Milvus 3.0 supporta il TTL per singola entità. È sufficiente dichiarare un campo « <code translate="no">TIMESTAMPTZ</code> » nello schema, contrassegnarlo come campo TTL tramite una proprietà della raccolta e Milvus provvederà automaticamente a liberare le entità scadute. Ciò copre le richieste relative al «diritto all’oblio», la scadenza dei dati di sessione e la cronologia delle conversazioni limitata, senza necessità di pulizia da parte dell’applicazione.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Impostazione del TTL a livello di entità</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 ha introdotto l’indice <code translate="no">MINHASH_LSH</code> per il rilevamento di quasi-duplicati basato su insiemi, ma le applicazioni dovevano comunque calcolare le firme MinHash prima di scrivere i dati in Milvus.</p>
<p>Milvus 3.0 aggiunge una funzione MinHash lato server. È sufficiente dichiarare nello schema un campo di input " <code translate="no">VARCHAR</code> " e un campo di output " <code translate="no">BINARY_VECTOR</code> ", associare una funzione " <code translate="no">FunctionType.MINHASH</code> " e Milvus calcolerà le firme durante l’inserimento, l’inserimento in blocco e la ricerca. Insieme a " <code translate="no">MINHASH_LSH</code>", ciò supporta i flussi di lavoro di deduplicazione per grandi set di dati, il fingerprinting e il rilevamento del plagio all’interno di Milvus.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/minhash-function.md">Funzione MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>L’assunto “una entità = un vettore” non è più adeguato al recupero moderno. I documenti lunghi vengono suddivisi in molti blocchi, i modelli a interazione tardiva come ColBERT generano un vettore per ogni token e le entità multimodali possono presentare diverse rappresentazioni.</p>
<p>EmbList memorizza un elenco di vettori a lunghezza variabile per ogni entità, utilizzando l’ <code translate="no">DISKANN</code> come indice su disco. Il percorso su disco mantiene sotto controllo l’utilizzo della RAM quando il corpus supera i limiti di memoria. EmbList + <code translate="no">DISKANN</code> è la prima variante della più ampia famiglia StructList in questa versione RC. Il resto della famiglia, compresi il filtraggio StructList e l’accelerazione multivettoriale Muvera / Lemur, è previsto per la versione ufficiale 3.0.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/search-with-embedding-lists.md">Ricerca con liste di embedding</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Force Merge</h4><p>I carichi di lavoro di produzione accumulano nel tempo frammentazione dei segmenti, il che causa fluttuazioni nella latenza delle query e un aumento dello spazio di archiviazione.</p>
<p>Milvus 3.0 aggiunge la possibilità di attivare esplicitamente la compattazione dei segmenti durante le finestre di minor traffico, sia in modalità sincrona che asincrona.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/force-merge.md">“Compattazione</a> con <a href="/docs/it/force-merge.md">fusione forzata</a>”.</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0 introduce Storage V3, un motore di archiviazione colonnare basato su manifesti in cui dati e metadati risiedono su un sistema di archiviazione a oggetti compatibile con S3. Ogni versione del set di dati viene acquisita come snapshot immutabile del manifesto, un file codificato in formato Avro che registra quali gruppi di colonne, log delta e statistiche compongono il set di dati.</p>
<p>I manifesti sono file Avro compatti, mentre i log delta registrano le eliminazioni a livello di entità senza riscrivere i file di dati. Ciò mantiene ridotto il sovraccarico dei metadati man mano che i set di dati crescono. Il manifesto inoltre disaccoppia il tracciamento dei metadati dal percorso di query, consentendo a una Collection di gestire un numero maggiore di segmenti senza compromettere le prestazioni delle query.</p>
<p>Poiché gli stati sono archiviati su un sistema di archiviazione a oggetti, il set di dati è autodescrittivo: qualsiasi lettore con accesso al percorso di archiviazione può individuarlo e interpretarlo senza bisogno di un catalogo centrale. Questa proprietà è alla base delle integrazioni con le Collezioni esterne, gli Snapshot e i futuri data lake.</p>
