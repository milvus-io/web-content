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
    </button></h1><p>Scoprite le novità di Milvus! Questa pagina riassume le nuove funzionalità, i miglioramenti, i problemi noti e le correzioni di bug di ogni versione. Vi consigliamo di visitare regolarmente questa pagina per conoscere gli aggiornamenti.</p>
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
<tr><th>Versione di Milvus</th><th>Versione dell'SDK Python</th><th>Versione dell'SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus v3.0-beta inizia il passaggio di Milvus da un database vettoriale a un motore di lago semantico-nativo. Il kernel di Milvus è ora in grado di operare direttamente sui dati in formati open lake e le funzionalità fondamentali di Milvus sono state estese a livello di reperimento, schema, ciclo di vita, linguaggio e operazioni.</p>
<p>La raccolta esterna e l'istantanea sono le principali aggiunte sul lato del lago. Lo stesso kernel alimenta anche Zilliz Lakebase, una piattaforma dati semantica-nativa costruita su Milvus 3.0.</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Raccolta esterna</h4><p>Nelle tipiche pipeline di dati AI, terabyte di embeddings e metadati si trovano già in uno storage a oggetti come tabelle Parquet, Lance o Iceberg. Copiare questi dati in Milvus raddoppia i costi di archiviazione, aggiunge una pipeline ETL che deve essere mantenuta sincronizzata e sposta la governance dei dati dal cliente.</p>
<p>Una raccolta esterna elimina la copia. Una raccolta Milvus può fare riferimento a file già esistenti e Milvus gestisce solo lo schema, gli indici e l'esecuzione delle query. Un aggiornamento incrementale mantiene la Collection allineata con i file sottostanti. I clienti i cui dati non possono lasciare il lago, come i team del settore finanziario e sanitario, possono eseguire il vector retrieval su quei dati dove si trovano. Un singolo set di dati residente nel lago può anche essere servito da più istanze Milvus contemporaneamente.</p>
<p>Per ulteriori informazioni, consultare la sezione <a href="/docs/it/create-an-external-collection.md">Creare una raccolta esterna</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Istantanea</h4><p>Il servizio e la scoperta in batch hanno spesso bisogno della stessa collezione nello stesso momento. La valutazione di un modello A/B, la deduplicazione su larga scala, la convalida del backfill e il rollback di una versione hanno bisogno di una visione stabile della raccolta mentre le scritture sono ancora in corso.</p>
<p>Snapshot crea una vista point-in-time, di sola lettura, di una Collection facendo riferimento ai segmenti esistenti invece di copiare i dati, in modo che il costo marginale di archiviazione sia prossimo allo zero. I lavori batch possono leggere dall'istantanea in condizioni di isolamento di tipo MVCC, mentre la raccolta attiva continua ad accettare le scritture.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/snapshots.md">Istantanee</a>, <a href="/docs/it/manage-snapshots.md">Gestione delle istantanee</a> e <a href="/docs/it/snapshot-use-cases.md">Casi d'uso delle istantanee</a>.</p>
<h4 id="External-Backfill" class="common-anchor-header">Backfill esterno</h4><p>L'aggiornamento di un modello di embedding, come il passaggio da embedding v1 a embedding v2 su una Collection esistente, comportava in passato la ricostruzione da zero. Questo costringeva a tempi di inattività del servizio o a logiche di doppia scrittura sul lato dell'applicazione.</p>
<p>Milvus 3.0 supporta l'aggiornamento come flusso di lavoro a caldo. È possibile aggiungere un nuovo campo vettoriale con <code translate="no">AddCollectionField</code>, utilizzare Snapshot per congelare un punto di partenza coerente, eseguire il lavoro di incorporazione offline rispetto allo Snapshot e riscrivere i valori attraverso i normali percorsi di ingestione. Dopo che il nuovo campo è stato indicizzato online, l'applicazione può cambiare senza tempi di inattività.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Query / Ricerca Ordine per</h4><p>La ricerca e la query accettano ora l'ordinamento a più campi, con l'ordinamento spinto verso il basso nel kernel Milvus e <code translate="no">ASC</code> / <code translate="no">DESC</code> impostabile per campo. In questo modo si colma una lacuna produttiva comune: La Top-K per distanza da sola spesso non soddisfa le esigenze aziendali quando l'articolo più simile non è il più economico, il più recente o il più popolare.</p>
<p>Le applicazioni non devono più recuperare eccessivamente i risultati e riordinarli sul client per esprimere una classifica composita.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Ordina i risultati della ricerca per campi scalari</a> e <a href="/docs/it/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Ordina i risultati delle query</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vettore nullo</h4><p>Le incorporazioni sono spesso prodotte in modo asincrono, quindi un'entità può arrivare prima del suo vettore. Anche i dati multimodali presentano lacune naturali, come un video senza didascalie o un prodotto senza immagine. Le versioni precedenti non avevano una buona risposta: le applicazioni ritardavano la scrittura fino a quando il vettore non era pronto o riempivano un vettore segnaposto, ed entrambe le scelte compromettevano la qualità del recupero.</p>
<p>Milvus 3.0 supporta il NULL nei campi vettoriali per tutti e sei i tipi di vettore. La ricerca salta automaticamente i vettori NULL, la qualità del recupero non ne risente e i vettori NULL non occupano spazio. <code translate="no">AddField</code> si estende anche ai campi vettoriali con questa modifica: con <code translate="no">nullable=True</code>, una raccolta esistente può far crescere nuovi campi vettoriali online senza doverli ricostruire.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/nullable-and-default.md">Campi nulli</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Dizionario personalizzato e dizionario dei sinonimi</h4><p>I tokenizer disponibili non sempre soddisfano i requisiti di qualità della ricerca di produzione. Il cinese, i domini verticali come la medicina, la legge e la chimica e i corpora multilingue possono trarre notevoli vantaggi dai dizionari personalizzati e dalle tabelle dei sinonimi. Fino ad oggi, queste risorse erano per lo più utilizzate come riscritture di query sul lato dell'applicazione.</p>
<p>Milvus 3.0 aggiunge un meccanismo di FileResource per la registrazione di dizionari tokenizer personalizzati, liste di sinonimi, liste di stop-word e regole di decompressione. Una volta registrata, una risorsa può essere referenziata da qualsiasi tokenizer o filtro e ha effetto su BM25, analizzatori e Text Match. I dizionari e i sinonimi possono ora essere versionati e gestiti centralmente, invece di essere sparsi nel codice dell'applicazione.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/manage-file-resources.md">Gestione delle risorse dei file</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL delle entità</h4><p>I TTL a livello di collezione e partizione sono troppo grossolani per molti scenari di ciclo di vita e conformità. I diversi tenant all'interno della stessa Collection hanno spesso regole di conservazione diverse e le singole entità possono avere bisogno di scadere secondo un calendario che non corrisponde al resto della Collection.</p>
<p>Milvus 3.0 supporta il TTL per entità. Dichiarando un campo <code translate="no">TIMESTAMPTZ</code> nello schema, contrassegnandolo come campo TTL attraverso una proprietà della Collezione, Milvus recupera automaticamente le entità scadute. In questo modo si coprono le richieste con diritto all'oblio, i dati di sessione in scadenza e la cronologia delle conversazioni delimitata senza pulizia dal lato dell'applicazione.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Imposta TTL a livello di entità</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 ha aggiunto l'indice <code translate="no">MINHASH_LSH</code> per il rilevamento di quasi-duplicazioni basato su set, ma le applicazioni dovevano ancora calcolare le firme MinHash prima di scrivere i dati in Milvus.</p>
<p>Milvus 3.0 aggiunge una funzione MinHash lato server. Dichiarando un campo di input <code translate="no">VARCHAR</code> e un campo di output <code translate="no">BINARY_VECTOR</code> nello schema, allegando una funzione <code translate="no">FunctionType.MINHASH</code>, Milvus calcola le firme durante l'inserimento, l'inserimento in blocco e la ricerca. Insieme a <code translate="no">MINHASH_LSH</code>, questo supporta i flussi di deduplicazione per grandi insiemi di dati, il fingerprinting e il rilevamento del plagio all'interno di Milvus.</p>
<p>Per ulteriori informazioni, consultare la <a href="/docs/it/minhash-function.md">funzione MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>Il presupposto "un'entità = un vettore" non è più adatto al reperimento moderno. I documenti lunghi vengono suddivisi in molti pezzi, i modelli di interazione tardiva come ColBERT emettono un vettore per ogni token e le entità multimodali possono contenere diverse visualizzazioni.</p>
<p>EmbList memorizza un elenco di vettori di lunghezza variabile per entità, con <code translate="no">DISKANN</code> come indice su disco. Il percorso su disco tiene sotto controllo l'uso della RAM quando il corpus supera il budget di memoria. EmbList + <code translate="no">DISKANN</code> è la prima variante della più ampia famiglia StructList in questo RC. Il resto della famiglia, incluso il filtraggio di StructList e l'accelerazione multivettoriale di Muvera / Lemur, è previsto per la versione ufficiale 3.0.</p>
<p>Per ulteriori informazioni, consultare la sezione <a href="/docs/it/search-with-embedding-lists.md">Ricerca con elenchi incorporati</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Forza di fusione</h4><p>I carichi di lavoro di produzione accumulano nel tempo la frammentazione dei segmenti, che causa jitter nella latenza delle query e gonfiano lo storage.</p>
<p>Milvus 3.0 aggiunge la possibilità di attivare la compattazione dei segmenti in modo esplicito durante le finestre non di punta, sia in modalità sincrona che asincrona.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/force-merge.md">Forza la compattazione dei segmenti</a>.</p>
