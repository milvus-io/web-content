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
<tr><th>Versione di Milvus</th><th>Versione SDK Python</th><th>Versione SDK Node.js</th><th>Versione SDK Java</th><th>Versione SDK Go</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 è stato ufficialmente rilasciato! Basandosi sull'architettura lake-native introdotta nella <a href="https://milvus.io/docs/release_notes.md#v30-beta">versione 3.0-beta</a>, questa versione completa ciò che la beta aveva iniziato: External Collection copre un numero maggiore di flussi di lavoro lakehouse; lo schema supporta l'aggiunta, il backfill e l'eliminazione online; l'indice sparse è stato ricostruito attorno a SINDI; StructArray e la ricerca per faccette completano il motore di recupero; il passthrough FAISS e TEXT ampliano le opzioni di indicizzazione e modalità; inoltre, Woodpecker funziona come servizio autonomo.</p>
<p>Guarda il video qui sotto per saperne di più su Milvus 3.0 e partecipa alla sessione AMA con i manutentori del core:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>Se non conosci ancora la linea 3.0, la sezione "Riepilogo delle funzionalità di Core 3.0" qui sotto riassume le funzionalità introdotte nella versione 3.0-beta; le <a href="https://milvus.io/docs/release_notes.md#v30-beta">note di rilascio della versione 3.0-beta</a> contengono le descrizioni complete.</p>
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">Raccolta esterna: flussi di lavoro lakehouse più completi</h4><p>La versione 3.0-beta ha introdotto la funzione "External Collection": è possibile fare riferimento ai file del lakehouse in loco, creare indici ed effettuare ricerche senza copiare i dati in Milvus. Questa versione estende tale funzionalità verso flussi di lavoro completi di recupero dati in ambiente lakehouse. I campi esterni possono ora alimentare i campi di output delle funzioni, come i vettori sparsi BM25, le firme MinHash e gli embedding di testo, in modo che i campi di recupero derivati dal testo e dal modello vengano creati all’interno di Milvus senza copiare la tabella di origine. Refresh supporta inoltre l’evoluzione additiva dello schema: quando la tabella esterna acquisisce nuove colonne, Milvus applica le patch ai segmenti interessati invece di ricostruire la collezione.</p>
<p>Questa versione aggiunge inoltre un formato esterno denominato " <code translate="no">milvus-table</code> " che tratta i metadati degli snapshot di Milvus e i manifesti di Storage V3 come una fonte esterna, in modo che uno snapshot della collezione possa essere a sua volta utilizzato come tabella esterna: i sistemi di elaborazione in batch e di servizio ottengono una vista condivisa, supportata dal manifesto, degli stessi dati.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/create-an-external-collection.md">Creare una raccolta esterna</a> e <a href="/docs/it/snapshots.md">snapshot</a>.</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">Schema flessibile: aggiungere, integrare e rimuovere colonne online</h4><p>Gli schemi non rimangono statici in produzione — i modelli incorporati vengono sostituiti, le feature subiscono iterazioni, i campi vengono deprecati — e in passato ciò comportava la ricostruzione completa della collezione con tempi di inattività o doppie scritture. La versione 3.0.0 chiude il cerchio: le colonne possono essere aggiunte, popolate e rimosse mentre il servizio continua.</p>
<p>Il backfill funziona in entrambe le direzioni. Il backfill esterno gestisce i valori calcolati al di fuori di Milvus: si aggiunge una colonna, si esegue uno snapshot della collezione come punto di partenza coerente, si esegue il processo offline, si riscrivono i valori e Milvus indicizza la nuova colonna in modo incrementale — un aggiornamento del modello di embedding su centinaia di milioni di righe diventa un’operazione a caldo senza tempi di inattività. Il backfill interno copre i valori derivati dal kernel: basta associare una funzione BM25 o MinHash a una collezione esistente e il suo campo di output viene calcolato automaticamente sui dati esistenti.</p>
<p>Per ulteriori informazioni, consultare la sezione <a href="/docs/it/add-fields-to-an-existing-collection.md">“Aggiunta di campi a una collezione esistente</a>”.</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">Riorganizzazione degli indici sparsi: SINDI, Block-Max WAND e Block-Max MaxScore</h4><p>Milvus 3.0 aggiorna l’indice vettoriale sparso su tutta la linea. Introduce nuovi algoritmi di ricerca — <a href="https://arxiv.org/abs/2509.08395">SINDI</a>, Block-Max WAND e Block-Max MaxScore — insieme alla compressione con lista invertita, alla quantizzazione configurabile e alla selezione dell’algoritmo di ricerca per carico di lavoro. Anche il caricamento tramite mmap, la serializzazione e il punteggio BM25 sono stati ottimizzati, riducendo lo spazio di archiviazione dell’indice e l’overhead di caricamento per la ricerca su vettori sparsi e full-text su larga scala. Nei benchmark interni, l’indice BM25 compresso è circa 3 volte più piccolo dell’indice sparso 2.6 a un recall comparabile, mentre SINDI raggiunge fino a circa 10 volte il QPS di MaxScore su embedding sparsi appresi. Una volta abilitata la nuova versione dell’indice (vedere le note sulla compatibilità e sul comportamento), SINDI diventa l’impostazione predefinita per la ricerca IP sparsa, mentre MaxScore è l’impostazione predefinita per BM25.</p>
<h4 id="StructArray-coverage" class="common-anchor-header">Copertura di StructArray</h4><p>StructArray ora supporta i valori nulli, gli indici bitmap, l’aggiunta dinamica di campi su collezioni attive e l’aggiornamento parziale dei campi struct tramite upsert, con copertura REST e importazione in blocco corrispondenti.</p>
<p>La ricerca a livello di elemento aggiunge la ricerca ibrida tra i sottocampi vettoriali con raggruppamento configurabile per entità (varianti max / sum / avg / top-k), oltre alla ricerca per intervallo e al raggruppamento al suo interno. Il filtraggio annidato copre i predicati <code translate="no">element_filter</code>, i quantificatori <code translate="no">MATCH_ANY</code> / <code translate="no">MATCH_ALL</code> / <code translate="no">MATCH_LEAST</code> / <code translate="no">MATCH_MOST</code> / <code translate="no">MATCH_EXACT</code>, l’accesso posizionale ai sottocampi come <code translate="no">tags[0][name]</code> e <code translate="no">array_length()</code> sulla colonna struct.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/array-of-structs.md">StructArray</a> e <a href="/docs/it/struct-array-operators.md">Operatori StructArray</a>.</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">Aggregazione della ricerca e ricerca per faccette</h4><p>L’aggregazione delle query della versione beta calcola statistiche esatte sui dati filtrati; la versione 3.0.0 aggiunge la suddivisione per faccette nel percorso di ricerca. Specificare un campo di faccetta al momento della ricerca e Milvus restituisce i valori di faccetta principali, ciascuno rappresentato dal suo membro con la migliore corrispondenza nella classifica ANN e annotato con aggregati quali COUNT e AVG — la barra laterale della ricerca per faccette (marchio, fascia di prezzo, attributi) in un’unica richiesta, invece di effettuare un recupero eccessivo e un conteggio lato client.</p>
<h4 id="Function-Chain-reranking" class="common-anchor-header">Riconversione della classifica tramite Function Chain</h4><p>Il riclassamento è ora componibile tramite l’API Function Chain, che esegue una pipeline ordinata e tipizzata come parte di un’unica richiesta di ricerca. Una catena può combinare il riscoraggio L0 iniziale su QueryNode con il riclassamento L2 post-riduzione su Proxy, supportando la trasformazione e la combinazione dei punteggi, il riclassamento basato su modelli, l’ordinamento e il taglio dei candidati senza orchestrazione lato client. Questa versione aggiunge inoltre il punteggio XGBoost nativo per il riordino L0 utilizzando modelli UBJ registrati come FileResources, insieme ai provider di inferenza Hugging Face per l’embedding testuale gestito dal server e il riordino basato sulla somiglianza delle frasi.</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">Campi TEXT per testi lunghi</h4><p>I campi TEXT rendono i testi lunghi di prima classe, eliminando i limiti di lunghezza a livello di archiviazione: supportano <code translate="no">text_match</code>, <code translate="no">phrase_match</code> e BM25. I valori inferiori a 64 KB rimangono in linea; quelli più grandi vengono trasferiti in file LOB a livello di partizione in formato Vortex, con la colonna che memorizza solo i riferimenti <code translate="no">(file_id, offset)</code>. I file LOB sono condivisi tra i segmenti, quindi la compattazione sposta i riferimenti invece di riscrivere il testo. Per RAG ciò significa recuperare vettori e testo sorgente dallo stesso archivio in un unico I/O — senza bisogno di gestire un archivio blob esterno.</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">Pass-through dell’indice FAISS</h4><p>Un nuovo tipo di indice « <code translate="no">FAISS</code> » accetta stringhe arbitrarie di «index-factory» di Faiss tramite il parametro « <code translate="no">faiss_index_name</code> » — <code translate="no">IVF64,Flat</code>, <code translate="no">HNSW16,Flat</code>, <code translate="no">OPQ16,IVF64,PQ16x4</code> — con i parametri di ricerca passati direttamente, in modo che le ricette di Faiss vengano riprodotte direttamente su Milvus.</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">Supporto dei formati Vortex e Lance</h4><p>Il livello di archiviazione acquisisce due formati colonnari aperti: Vortex come formato interno di nuova generazione — codifiche adattive (dizionario, RLE, bit-packing, compressione specifica per i valori in virgola mobile), decompressione zero-copy, ottimizzato per carichi di lavoro misti vettoriali e scalari — e Lance, insieme a Parquet, per l’interoperabilità con l’ecosistema aperto. Vortex è destinato a diventare il formato interno predefinito, con il pushdown dei filtri e una variante locale in programma.</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Distribuzione autonoma di Woodpecker</h4><p>Woodpecker, il WAL al centro del percorso di scrittura in streaming, può ora essere implementato come servizio indipendente anziché integrato in altri nodi — scalabilità indipendente, isolamento dei guasti e osservabilità, come qualsiasi altro microservizio. Ciò è particolarmente importante per i cluster di grandi dimensioni e i carichi di lavoro con un elevato numero di scritture.</p>
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
<li><strong>Raccolta esterna</strong> — interrogazione dei dati lakehouse (Parquet, Lance, Iceberg, Vortex) in loco: zero-copy, in sola lettura, sincronizzati tramite aggiornamento incrementale.</li>
<li><strong>Snapshot</strong> — viste di raccolta in sola lettura a un punto nel tempo tramite riferimento al segmento, con spazio di archiviazione marginale quasi nullo.</li>
<li><strong>Storage V3 (Loon)</strong> — archiviazione colonnare basata su manifest su storage a oggetti; la base per Snapshot e Raccolta esterna.</li>
<li><strong>Query / Ricerca ORDER BY</strong> — ordinamento multi-campo lato server con ASC / DESC per campo.</li>
<li><strong>Aggregazione delle query</strong> — COUNT / SUM / AVG / MIN / MAX con raggruppamento, valutata lato server.</li>
<li><strong>EmbList + DiskANN</strong> — indicizzazione multivettoriale su disco per elenchi di incorporamento StructArray, con percorsi di accelerazione quali Muvera e Lemur.</li>
<li><strong>Funzione MinHash (doc-in, doc-out)</strong> — firme MinHash lato server più " <code translate="no">MINHASH_LSH</code> " per il rilevamento di quasi-duplicati.</li>
<li><strong>Vettori nullabili</strong> — NULL su tutti e sei i tipi di vettore; la ricerca salta le righe NULL e AddField si estende ai campi vettoriali.</li>
<li><strong>TTL delle entità</strong> — scadenza per riga determinata da un campo TIMESTAMPTZ.</li>
<li><strong>FileResource</strong> — dizionari, elenchi di sinonimi ed elenchi di parole da escludere gestiti a livello di cluster per analizzatori, BM25 e Text Match.</li>
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
<li><strong>Storage V3 (Loon) è disabilitato per impostazione predefinita.</strong> Le funzionalità che dipendono da esso — come i campi Snapshot e TEXT — richiedono l’abilitazione manuale tramite <code translate="no">common.storage.useLoonFFI</code>. Storage V3 sarà abilitato per impostazione predefinita in una versione successiva.</li>
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
<p>Milvus 3.0-beta amplia il database vettoriale Milvus con una nuova integrazione nell’ecosistema Open Lake: External Collection consente a Milvus di interrogare le tabelle Lake esterne senza copia (zero-copy), mentre Spark può leggere le collezioni Milvus direttamente tramite Snapshot. Questa versione offre inoltre funzionalità di recupero più avanzate, schemi più espressivi, una personalizzazione più approfondita della ricerca testuale, controlli più precisi sul ciclo di vita dei dati e dei modelli, nonché maggiori controlli a livello di operatore. Milvus 3.0 costituisce il kernel centrale di Zilliz Lakebase, ne potenzia le funzionalità unificate di serving, discovery e batch.</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">External Collection</h4><p>Nelle tipiche pipeline di dati per l’IA, terabyte di embedding e metadati risiedono già su sistemi di archiviazione a oggetti sotto forma di tabelle Parquet, Lance o Iceberg. Copiare tali dati in Milvus raddoppia i costi di archiviazione, aggiunge una pipeline ETL che deve essere mantenuta sincronizzata e sottrae al cliente il controllo sulla governance dei dati.</p>
<p>La raccolta esterna elimina la necessità di copia. Una raccolta Milvus può fare riferimento ai file nella loro posizione originale, mentre Milvus gestisce esclusivamente lo schema, gli indici e l’esecuzione delle query. Un aggiornamento incrementale mantiene la raccolta allineata ai file sottostanti. I clienti i cui dati non possono lasciare il data lake, come i team finanziari e sanitari, possono eseguire il recupero vettoriale su quei dati direttamente dove si trovano. Un singolo set di dati residente nel data lake può anche essere servito da più istanze di Milvus contemporaneamente.</p>
<p>Per ulteriori informazioni, consultare la sezione <a href="/docs/it/create-an-external-collection.md">Creare una raccolta esterna</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Snapshot</h4><p>La distribuzione e la scoperta in batch spesso richiedono la stessa Collection contemporaneamente. La valutazione dei modelli A/B, la deduplicazione su larga scala, la convalida del backfill e il rollback delle versioni richiedono tutte una visione stabile della Collection mentre le operazioni di scrittura sono ancora in corso.</p>
<p>Lo snapshot crea una vista "point-in-time" e di sola lettura di una raccolta facendo riferimento ai segmenti esistenti anziché copiare i dati, quindi il costo marginale di archiviazione è prossimo allo zero. I processi batch possono leggere dallo snapshot con isolamento in stile MVCC mentre la raccolta attiva continua ad accettare operazioni di scrittura.</p>
<p>Per ulteriori informazioni, consultare le sezioni <a href="/docs/it/snapshots.md">Snapshot</a>, <a href="/docs/it/manage-snapshots.md">Gestione degli snapshot</a> e <a href="/docs/it/snapshot-use-cases.md">Casi d’uso degli snapshot</a>.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Query / Ricerca con ordinamento</h4><p>La ricerca e le query ora supportano l’ordinamento su più campi, con l’ordinamento delegato al kernel di Milvus e le opzioni “ <code translate="no">ASC</code> ” e “ <code translate="no">DESC</code> ” configurabili per ogni campo. Ciò colma una lacuna comune in produzione: il Top-K basato esclusivamente sulla distanza spesso non soddisfa le esigenze aziendali quando l’elemento più simile non è il più economico, il più recente o il più popolare.</p>
<p>Le applicazioni non devono più recuperare un numero eccessivo di risultati e riordinarli sul client per ottenere una classifica composita.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Ordinamento dei risultati di ricerca in base a campi scalari</a> e <a href="/docs/it/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Ordinamento dei risultati delle query</a>.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Aggregazione delle query</h4><p>In passato, per generare statistiche sulla distribuzione dei tenant, conteggi sulla completezza dei campi o lo stato di avanzamento del rollout delle versioni da una Milvus Collection, era necessario recuperare le entità corrispondenti sul client e aggregarle lì. Milvus 3.0 integra l’aggregazione scalare in stile SQL nel kernel. Una chiamata di query accetta espressioni di aggregazione e di tipo “ <code translate="no">group_by_fields</code> ” in <code translate="no">output_fields</code>, tra cui <code translate="no">count(*)</code>, <code translate="no">count(&lt;field&gt;)</code>, <code translate="no">sum(&lt;field&gt;)</code>, <code translate="no">avg(&lt;field&gt;)</code>, <code translate="no">min(&lt;field&gt;)</code> e <code translate="no">max(&lt;field&gt;)</code>. L’aggregazione viene valutata sul lato server dopo il filtraggio.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">Risultati delle query di aggregazione</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vettore nullo</h4><p>Gli embedding vengono spesso generati in modo asincrono, pertanto un’entità può arrivare prima del proprio vettore. Anche i dati multimodali presentano lacune naturali, come un video senza sottotitoli o un prodotto senza immagine. Le versioni precedenti non offrivano una soluzione adeguata: le applicazioni ritardavano la scrittura fino a quando il vettore non era pronto oppure inserivano un vettore segnaposto, e entrambe le scelte compromettevano la qualità del recupero.</p>
<p>Milvus 3.0 supporta il valore NULL nei campi vettoriali per tutti e sei i tipi di vettori. La ricerca ignora automaticamente i vettori NULL, la qualità del recupero non ne risente e i vettori NULL non occupano praticamente spazio di archiviazione. Con questa modifica, la funzione " <code translate="no">AddField</code> " si estende anche ai campi vettoriali: con l'opzione ` <code translate="no">nullable=True</code>`, una collezione esistente può aggiungere nuovi campi vettoriali online senza necessità di ricostruzione.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/nullable-and-default.md">Campi nullabili</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Dizionario personalizzato e dizionario dei sinonimi</h4><p>I tokenizzatori predefiniti non sempre soddisfano i requisiti di qualità della ricerca in produzione. Il cinese, i settori verticali come medicina, diritto e chimica, nonché i corpora multilingue possono trarre notevoli vantaggi dai dizionari personalizzati e dalle tabelle di sinonimi. Finora, queste risorse erano per lo più implementate come riscritture delle query a livello di applicazione.</p>
<p>Milvus 3.0 introduce un meccanismo FileResource per la registrazione di dizionari personalizzati per i tokenizzatori, elenchi di sinonimi, elenchi di parole da escludere e regole di scomposizione delle parole composte. Una volta registrata, una risorsa può essere richiamata da qualsiasi tokenizer o filtro e ha effetto su BM25, sugli analizzatori e su Text Match. I dizionari e i sinonimi possono ora essere gestiti centralmente e sottoposti a controllo delle versioni, anziché essere sparsi nel codice dell’applicazione.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/manage-file-resources.md">Gestione delle risorse file</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL delle entità</h4><p>Il TTL a livello di raccolta e di partizione è troppo generico per molti scenari relativi al ciclo di vita e alla conformità. Tenant diversi all’interno della stessa raccolta hanno spesso regole di conservazione diverse e le singole entità potrebbero dover scadere secondo una tempistica che non corrisponde al resto della raccolta.</p>
<p>Milvus 3.0 supporta il TTL per singola entità. È sufficiente dichiarare un campo « <code translate="no">TIMESTAMPTZ</code> » nello schema, contrassegnarlo come campo TTL tramite una proprietà della raccolta e Milvus provvederà automaticamente a liberare le entità scadute. Ciò copre le richieste relative al diritto all’oblio, la scadenza dei dati di sessione e la cronologia delle conversazioni limitata, senza necessità di pulizia da parte dell’applicazione.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Impostazione del TTL a livello di entità</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 ha aggiunto l’indice <code translate="no">MINHASH_LSH</code> per il rilevamento di quasi-duplicati basato su insiemi, ma le applicazioni dovevano comunque calcolare le firme MinHash prima di scrivere i dati in Milvus.</p>
<p>Milvus 3.0 aggiunge una funzione MinHash lato server. È sufficiente dichiarare nello schema un campo di input " <code translate="no">VARCHAR</code> " e un campo di output " <code translate="no">BINARY_VECTOR</code> ", associare una funzione " <code translate="no">FunctionType.MINHASH</code> " e Milvus calcolerà le firme durante l’inserimento, l’inserimento in blocco e la ricerca. Insieme a " <code translate="no">MINHASH_LSH</code>", ciò supporta i flussi di lavoro di deduplicazione per grandi set di dati, il fingerprinting e il rilevamento del plagio all’interno di Milvus.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/minhash-function.md">Funzione MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>L’assunto “un’entità = un vettore” non è più adeguato al recupero moderno. I documenti lunghi vengono suddivisi in molti blocchi, i modelli a interazione tardiva come ColBERT generano un vettore per ogni token e le entità multimodali possono presentare diverse rappresentazioni.</p>
<p>EmbList memorizza un elenco di vettori a lunghezza variabile per ogni entità, utilizzando l’ <code translate="no">DISKANN</code> come indice su disco. Il percorso su disco mantiene sotto controllo l’utilizzo della RAM quando il corpus supera i limiti di memoria disponibili. EmbList + <code translate="no">DISKANN</code> è la prima variante della più ampia famiglia StructList presente in questa versione RC. Il resto della famiglia, compreso il filtraggio StructList e l’accelerazione multivettoriale Muvera / Lemur, è previsto per la versione ufficiale 3.0.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/search-with-embedding-lists.md">Ricerca con elenchi di embedding</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Force Merge</h4><p>I carichi di lavoro di produzione accumulano frammentazione dei segmenti nel tempo, il che causa fluttuazioni nella latenza delle query e un aumento dello spazio di archiviazione.</p>
<p>Milvus 3.0 aggiunge la possibilità di attivare esplicitamente la compattazione dei segmenti durante le finestre di traffico ridotto, sia in modalità sincrona che asincrona.</p>
<p>Per ulteriori informazioni, consultare " <a href="/docs/it/force-merge.md">Compattazione</a> con <a href="/docs/it/force-merge.md">unione forzata</a>".</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0 introduce Storage V3, un motore di archiviazione colonnare basato su manifesti in cui dati e metadati risiedono su un sistema di archiviazione a oggetti compatibile con S3. Ogni versione del set di dati viene acquisita come snapshot immutabile del manifesto, un file codificato in Avro che registra quali gruppi di colonne, log delta e statistiche compongono il set di dati.</p>
<p>I manifesti sono file Avro compatti, mentre i log delta registrano le eliminazioni a livello di entità senza riscrivere i file di dati. Ciò mantiene basso il sovraccarico dei metadati man mano che i set di dati crescono. Il manifesto inoltre disaccoppia il tracciamento dei metadati dal percorso di query, consentendo a una Collection di gestire più segmenti senza compromettere le prestazioni delle query.</p>
<p>Poiché gli stati sono archiviati su uno storage a oggetti, il set di dati è autodescrittivo: qualsiasi lettore con accesso al percorso di archiviazione può individuarlo e interpretarlo senza bisogno di un catalogo centrale. Questa proprietà è alla base delle integrazioni con External Collection, Snapshot e dei futuri lake.</p>
