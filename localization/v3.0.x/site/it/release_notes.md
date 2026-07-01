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
<p>Milvus v3.0-beta segna l’inizio della transizione di Milvus da database vettoriale a motore lake semantico nativo. Il kernel di Milvus è ora in grado di operare direttamente sui dati in formati lake aperti, mentre le funzionalità principali di Milvus sono state estese a recupero, schema, ciclo di vita, linguaggio e operazioni.</p>
<p>External Collection e Snapshot sono le novità principali sul fronte del data lake. Lo stesso kernel è alla base anche di Zilliz Lakebase, una piattaforma dati nativa semantica costruita su Milvus 3.0.</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Raccolta esterna</h4><p>Nelle tipiche pipeline di dati per l’IA, terabyte di embedding e metadati risiedono già su sistemi di archiviazione a oggetti sotto forma di tabelle Parquet, Lance o Iceberg. Copiare tali dati in Milvus raddoppia i costi di archiviazione, aggiunge una pipeline ETL che deve essere mantenuta sincronizzata e sottrae al cliente il controllo sulla governance dei dati.</p>
<p>La raccolta esterna elimina la necessità di copia. Una raccolta Milvus può fare riferimento ai file nella loro posizione originale, mentre Milvus gestisce esclusivamente lo schema, gli indici e l’esecuzione delle query. Un aggiornamento incrementale mantiene la raccolta allineata ai file sottostanti. I clienti i cui dati non possono lasciare il data lake, come i team dei settori finanziario e sanitario, possono eseguire il recupero vettoriale su quei dati direttamente dove si trovano. Un singolo set di dati residente nel data lake può anche essere servito da più istanze di Milvus contemporaneamente.</p>
<p>Per ulteriori informazioni, consultare la sezione <a href="/docs/it/create-an-external-collection.md">Creare una raccolta esterna</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Snapshot</h4><p>La distribuzione e la scoperta in batch spesso richiedono la stessa Collection contemporaneamente. La valutazione dei modelli A/B, la deduplicazione su larga scala, la convalida del backfill e il rollback delle versioni richiedono tutte una visione stabile della Collection mentre le operazioni di scrittura sono ancora in corso.</p>
<p>Lo snapshot crea una vista "point-in-time" e di sola lettura di una raccolta facendo riferimento ai segmenti esistenti anziché copiare i dati, quindi il costo marginale di archiviazione è prossimo allo zero. I processi batch possono leggere dallo snapshot con isolamento in stile MVCC mentre la raccolta attiva continua ad accettare operazioni di scrittura.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/snapshots.md">Snapshot</a>, <a href="/docs/it/manage-snapshots.md">Gestione degli snapshot</a> e <a href="/docs/it/snapshot-use-cases.md">Casi d’uso degli snapshot</a>.</p>
<h4 id="External-Backfill" class="common-anchor-header">Backfill esterno</h4><p>L’aggiornamento di un modello di embedding, come il passaggio dagli embedding v1 a quelli v2 su una Collection esistente, in passato comportava la ricostruzione da zero. Ciò costringeva a un periodo di inattività del servizio o all’implementazione di una logica di doppia scrittura sul lato dell’applicazione.</p>
<p>Milvus 3.0 supporta l’aggiornamento come flusso di lavoro a caldo. È possibile aggiungere un nuovo campo vettoriale con ` <code translate="no">AddCollectionField</code>`, utilizzare uno snapshot per congelare un punto di partenza coerente, eseguire il processo di embedding offline sullo snapshot e riscrivere i valori tramite i normali percorsi di acquisizione. Dopo che il nuovo campo è stato indicizzato online, l’applicazione può passare al nuovo campo senza tempi di inattività.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Query / Ricerca con ordinamento</h4><p>La ricerca e le query ora accettano l’ordinamento su più campi, con l’ordinamento trasferito al kernel di Milvus e le opzioni “ <code translate="no">ASC</code> ” e “ <code translate="no">DESC</code> ” configurabili per ogni singolo campo. Ciò colma una lacuna comune in produzione: il Top-K basato esclusivamente sulla distanza spesso non soddisfa le esigenze aziendali quando l’elemento più simile non è il più economico, il più recente o il più popolare.</p>
<p>Le applicazioni non devono più recuperare un numero eccessivo di risultati e riordinarli sul client per ottenere una classifica composita.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Ordinare i risultati di ricerca in base a campi scalari</a> e <a href="/docs/it/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Ordinare i risultati delle query</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vettore nullo</h4><p>Gli embedding vengono spesso generati in modo asincrono, quindi un'entità può arrivare prima del proprio vettore. Anche i dati multimodali presentano lacune naturali, come un video senza sottotitoli o un prodotto senza immagine. Le versioni precedenti non offrivano una soluzione adeguata: le applicazioni ritardavano la scrittura fino a quando il vettore non era pronto oppure inserivano un vettore segnaposto, e entrambe le scelte compromettevano la qualità del recupero.</p>
<p>Milvus 3.0 supporta il valore NULL nei campi vettoriali per tutti e sei i tipi di vettore. La ricerca ignora automaticamente i vettori NULL, la qualità del recupero non ne risente e i vettori NULL non occupano praticamente spazio di archiviazione. Con questa modifica, la funzione " <code translate="no">AddField</code> " si estende anche ai campi vettoriali: con l'opzione ` <code translate="no">nullable=True</code>`, una collezione esistente può aggiungere nuovi campi vettoriali online senza necessità di ricostruzione.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/nullable-and-default.md">Campi nullabili</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Dizionario personalizzato e dizionario dei sinonimi</h4><p>I tokenizzatori predefiniti non sempre soddisfano i requisiti di qualità della ricerca in produzione. Il cinese, i domini verticali come medicina, diritto e chimica, nonché i corpora multilingue possono trarre notevoli vantaggi dai dizionari personalizzati e dalle tabelle di sinonimi. Finora, queste risorse erano per lo più implementate come riscritture delle query a livello di applicazione.</p>
<p>Milvus 3.0 introduce un meccanismo FileResource per la registrazione di dizionari personalizzati per i tokenizzatori, elenchi di sinonimi, elenchi di parole da escludere (stop-word) e regole di scomposizione delle parole composte. Una volta registrata, una risorsa può essere richiamata da qualsiasi tokenizer o filtro e ha effetto su BM25, sugli analizzatori e su Text Match. I dizionari e i sinonimi possono ora essere gestiti centralmente e sottoposti a controllo delle versioni, anziché essere sparsi nel codice dell’applicazione.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/manage-file-resources.md">Gestione delle risorse di file</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL delle entità</h4><p>Il TTL a livello di raccolta e di partizione è troppo generico per molti scenari relativi al ciclo di vita e alla conformità. Tenant diversi all’interno della stessa raccolta hanno spesso regole di conservazione diverse e le singole entità potrebbero dover scadere secondo una tempistica che non corrisponde al resto della raccolta.</p>
<p>Milvus 3.0 supporta il TTL per singola entità. È sufficiente dichiarare un campo " <code translate="no">TIMESTAMPTZ</code> " nello schema, contrassegnarlo come campo TTL tramite una proprietà della raccolta e Milvus provvederà automaticamente a liberare le entità scadute. Ciò copre le richieste relative al diritto all’oblio, la scadenza dei dati di sessione e la cronologia delle conversazioni limitata nel tempo, senza necessità di pulizia da parte dell’applicazione.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Impostazione del TTL a livello di entità</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 ha aggiunto l’indice <code translate="no">MINHASH_LSH</code> per il rilevamento di quasi-duplicati basato su insiemi, ma le applicazioni dovevano comunque calcolare le firme MinHash prima di scrivere i dati in Milvus.</p>
<p>Milvus 3.0 aggiunge una funzione MinHash lato server. È sufficiente dichiarare nello schema un campo di input " <code translate="no">VARCHAR</code> " e un campo di output " <code translate="no">BINARY_VECTOR</code> ", associare una funzione " <code translate="no">FunctionType.MINHASH</code> " e Milvus calcolerà le firme durante l’inserimento, l’inserimento in blocco e la ricerca. Insieme a " <code translate="no">MINHASH_LSH</code>", ciò supporta i flussi di lavoro di deduplicazione per grandi set di dati, il fingerprinting e il rilevamento del plagio all’interno di Milvus.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/minhash-function.md">Funzione MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>L’assunto “un’entità = un vettore” non è più adeguato al recupero moderno. I documenti lunghi vengono suddivisi in molti segmenti, i modelli a interazione tardiva come ColBERT generano un vettore per ogni token e le entità multimodali possono presentare diverse rappresentazioni.</p>
<p>EmbList memorizza un elenco di vettori a lunghezza variabile per ogni entità, utilizzando l’ <code translate="no">DISKANN</code> come indice su disco. Il percorso su disco mantiene sotto controllo l’utilizzo della RAM quando il corpus supera i limiti di memoria disponibili. EmbList + <code translate="no">DISKANN</code> è la prima variante della più ampia famiglia StructList in questa versione RC. Il resto della famiglia, compreso il filtraggio StructList e l’accelerazione multivettoriale Muvera / Lemur, è previsto per la versione ufficiale 3.0.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/search-with-embedding-lists.md">Ricerca con elenchi di embedding</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Force Merge</h4><p>I carichi di lavoro di produzione accumulano nel tempo frammentazione dei segmenti, il che causa fluttuazioni nella latenza delle query e un aumento dello spazio di archiviazione.</p>
<p>Milvus 3.0 aggiunge la possibilità di attivare esplicitamente la compattazione dei segmenti durante le finestre di minor traffico, sia in modalità sincrona che asincrona.</p>
<p>Per ulteriori informazioni, consultare " <a href="/docs/it/force-merge.md">Compattazione</a> con <a href="/docs/it/force-merge.md">unione forzata</a>".</p>
