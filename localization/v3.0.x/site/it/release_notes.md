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
    </button></h1><p>Scopri le novità di Milvus! Questa pagina riassume le nuove funzionalità, i miglioramenti, i problemi noti e le correzioni di bug presenti in ogni versione. Ti consigliamo di visitare regolarmente questa pagina per rimanere aggiornato.</p>
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
<tr><th>Versione Milvus</th><th>Versione SDK Python</th><th>Versione SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta estende il database vettoriale Milvus con una nuova integrazione nell'ecosistema Open Lake: External Collection consente a Milvus di interrogare le tabelle Lake esterne senza copia (zero-copy), mentre Spark può leggere le collezioni Milvus direttamente tramite Snapshot. La versione offre inoltre un recupero più ricco, uno schema più espressivo, una personalizzazione più approfondita della ricerca testuale, controlli più precisi sul ciclo di vita dei dati e dei modelli e maggiori controlli a livello di operatore. Milvus 3.0 è il kernel centrale di Zilliz Lakebase, che ne alimenta il servizio unificato, la scoperta e il batch.</p>
<p>Guarda il video qui sotto per saperne di più su Milvus 3.0 e sull'AMA con i principali manutentori:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Collezione esterna</h4><p>Nelle tipiche pipeline di dati AI, terabyte di embedding e metadati risiedono già su object storage come tabelle Parquet, Lance o Iceberg. Copiare quei dati in Milvus raddoppia i costi di archiviazione, aggiunge una pipeline ETL che deve essere mantenuta sincronizzata e allontana la governance dei dati dal cliente.</p>
<p>La raccolta esterna elimina la copia. Una raccolta Milvus può fare riferimento ai file dove si trovano già, e Milvus gestisce solo lo schema, gli indici e l'esecuzione delle query. Un aggiornamento incrementale mantiene la raccolta allineata con i file sottostanti. I clienti i cui dati non possono lasciare il lake, come i team finanziari e sanitari, possono eseguire il recupero vettoriale su quei dati dove si trovano. Un singolo set di dati residente nel lake può anche essere servito da più istanze Milvus contemporaneamente.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/create-an-external-collection.md">Creare una raccolta esterna</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Snapshot</h4><p>Il servizio e la scoperta in batch spesso richiedono la stessa Collection contemporaneamente. La valutazione del modello A/B, la deduplicazione su larga scala, la convalida del backfill e il rollback della versione richiedono tutti una visione stabile della Collection mentre le scritture sono ancora in corso.</p>
<p>Lo snapshot crea una vista in un determinato momento e di sola lettura di una raccolta facendo riferimento a segmenti esistenti invece di copiare i dati, quindi il costo marginale di archiviazione è vicino allo zero. I processi batch possono leggere dallo snapshot in isolamento in stile MVCC mentre la raccolta attiva continua ad accettare scritture.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/snapshots.md">Snapshot</a>, <a href="/docs/it/manage-snapshots.md">Gestione degli snapshot</a> e <a href="/docs/it/snapshot-use-cases.md">Casi d'uso degli snapshot</a>.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Query / Ricerca Ordina per</h4><p>La ricerca e la query ora accettano l'ordinamento su più campi, con l'ordinamento trasferito al kernel di Milvus e le opzioni " <code translate="no">ASC</code> " e " <code translate="no">DESC</code> " impostabili per ogni campo. Questo colma una lacuna comune in produzione: il Top-K basato solo sulla distanza spesso non soddisfa le esigenze aziendali quando l'elemento più simile non è il più economico, il più recente o il più popolare.</p>
<p>Le applicazioni non devono più recuperare un numero eccessivo di risultati e riordinarli sul client per esprimere una classifica composita.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Ordinare i risultati della ricerca in base a campi scalari</a> e <a href="/docs/it/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Ordinare i risultati della query</a>.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Aggregazione delle query</h4><p>La produzione di statistiche sulla distribuzione dei tenant, conteggi sulla completezza dei campi o progressi nel rollout delle versioni da una Milvus Collection richiedeva in passato il recupero delle entità corrispondenti sul client e la loro aggregazione in loco. Milvus 3.0 integra l'aggregazione scalare in stile SQL nel kernel. Una chiamata di query accetta espressioni di aggregazione e di tipo " <code translate="no">group_by_fields</code> " in <code translate="no">output_fields</code>, tra cui <code translate="no">count(*)</code>, <code translate="no">count(&lt;field&gt;)</code>, <code translate="no">sum(&lt;field&gt;)</code>, <code translate="no">avg(&lt;field&gt;)</code>, <code translate="no">min(&lt;field&gt;)</code> e <code translate="no">max(&lt;field&gt;)</code>. L'aggregazione viene valutata sul lato server dopo il filtraggio.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">Risultati delle query di aggregazione</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vettore nullo</h4><p>Gli embedding vengono spesso prodotti in modo asincrono, quindi un'entità può arrivare prima del proprio vettore. Anche i dati multimodali presentano lacune naturali, come un video senza didascalie o un prodotto senza immagine. Le versioni precedenti non avevano una risposta adeguata: le applicazioni ritardavano la scrittura fino a quando il vettore non era pronto oppure inserivano un vettore segnaposto, e entrambe le scelte compromettevano la qualità del recupero.</p>
<p>Milvus 3.0 supporta il valore NULL nei campi vettoriali per tutti e sei i tipi di vettori. La ricerca salta automaticamente i vettori NULL, la qualità del recupero non ne risente e i vettori NULL non occupano praticamente spazio di archiviazione. L'<code translate="no">AddField</code> e si estende anche ai campi vettoriali in seguito a questa modifica: con l'<code translate="no">nullable=True</code>, una Collection esistente può aggiungere nuovi campi vettoriali online senza bisogno di una ricostruzione.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/nullable-and-default.md">Campi nullabili</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Dizionario personalizzato e dizionario dei sinonimi</h4><p>I tokenizzatori predefiniti non sempre soddisfano i requisiti di qualità della ricerca in produzione. Il cinese, i domini verticali come medicina, diritto e chimica e i corpora multilingue possono trarre notevoli vantaggi dai dizionari personalizzati e dalle tabelle di sinonimi. Fino ad ora, queste risorse erano per lo più presenti come riscritture di query lato applicazione.</p>
<p>Milvus 3.0 aggiunge un meccanismo FileResource per la registrazione di dizionari personalizzati per tokenizzatori, elenchi di sinonimi, elenchi di stop-word e regole di decomposizione. Una volta registrata, una risorsa può essere richiamata da qualsiasi tokenizer o filtro e ha effetto su BM25, analizzatori e Text Match. I dizionari e i sinonimi possono ora essere versionati e gestiti centralmente invece di essere sparsi nel codice dell'applicazione.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/manage-file-resources.md">Gestione delle risorse file</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL dell'entità</h4><p>Il TTL a livello di raccolta e di partizione è troppo approssimativo per molti scenari di ciclo di vita e conformità. Tenanti diversi all'interno della stessa raccolta hanno spesso regole di conservazione diverse e le singole entità potrebbero dover scadere secondo una pianificazione che non corrisponde al resto della raccolta.</p>
<p>Milvus 3.0 supporta il TTL per entità. È sufficiente dichiarare un campo " <code translate="no">TIMESTAMPTZ</code> " nello schema, contrassegnarlo come campo TTL tramite una proprietà della raccolta e Milvus recupererà automaticamente le entità scadute. Ciò copre le richieste relative al diritto all'oblio, i dati di sessione in scadenza e la cronologia delle conversazioni limitata senza necessità di pulizia da parte dell'applicazione.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Impostare il TTL a livello di entità</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 ha aggiunto l'indice <code translate="no">MINHASH_LSH</code> per il rilevamento di quasi-duplicati basato su insiemi, ma le applicazioni dovevano comunque calcolare le firme MinHash prima di scrivere i dati in Milvus.</p>
<p>Milvus 3.0 aggiunge una funzione MinHash lato server. Dichiarare un campo di input " <code translate="no">VARCHAR</code> " e un campo di output " <code translate="no">BINARY_VECTOR</code> " nello schema, allegare una funzione " <code translate="no">FunctionType.MINHASH</code> " e Milvus calcolerà le firme durante l'inserimento, l'inserimento in blocco e la ricerca. Insieme a " <code translate="no">MINHASH_LSH</code>", questo supporta i flussi di lavoro di deduplicazione per grandi set di dati, il fingerprinting e il rilevamento di plagio all'interno di Milvus.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/minhash-function.md">Funzione MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>L'assunto "una entità = un vettore" non si adatta più al recupero moderno. I documenti lunghi vengono suddivisi in molti blocchi, i modelli a interazione tardiva come ColBERT emettono un vettore per token e le entità multimodali possono avere diverse viste.</p>
<p>EmbList memorizza un elenco di vettori a lunghezza variabile per entità, con un <code translate="no">DISKANN</code> e come indice su disco. Il percorso su disco mantiene sotto controllo l'utilizzo della RAM quando il corpus supera i limiti di memoria. EmbList + <code translate="no">DISKANN</code> è la prima variante della più ampia famiglia StructList in questa RC. Il resto della famiglia, compreso il filtraggio StructList e l'accelerazione multivettoriale Muvera / Lemur, è previsto per la versione ufficiale 3.0.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/search-with-embedding-lists.md">Ricerca con elenchi di embedding</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Force Merge</h4><p>I carichi di lavoro di produzione accumulano frammentazione dei segmenti nel tempo, causando jitter nella latenza delle query e un aumento dello spazio di archiviazione.</p>
<p>Milvus 3.0 aggiunge la possibilità di attivare esplicitamente la compattazione dei segmenti durante le finestre di minor traffico, sia in modalità sincrona che asincrona.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/force-merge.md">Compattazione</a> con <a href="/docs/it/force-merge.md">unione forzata</a>.</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0 introduce Storage V3, un motore di archiviazione colonnare basato su manifesti in cui dati e metadati risiedono su un'archiviazione a oggetti compatibile con S3. Ogni versione del set di dati viene acquisita come snapshot immutabile del manifesto, un file codificato in Avro che registra quali gruppi di colonne, log delta e statistiche compongono il set di dati.</p>
<p>I manifesti sono file Avro compatti e i log delta registrano le eliminazioni a livello di entità senza riscrivere i file di dati. Ciò mantiene basso il sovraccarico dei metadati man mano che i set di dati crescono. Il manifesto inoltre disaccoppia il tracciamento dei metadati dal percorso di query, consentendo a una Collection di gestire più segmenti senza compromettere le prestazioni delle query.</p>
<p>Poiché gli stati sono memorizzati su un sistema di archiviazione a oggetti, il set di dati è autodescrittivo: qualsiasi lettore con accesso al percorso di archiviazione può individuarlo e interpretarlo senza un catalogo centrale. Questa proprietà è alla base delle integrazioni con External Collection, Snapshot e dei futuri data lake.</p>
