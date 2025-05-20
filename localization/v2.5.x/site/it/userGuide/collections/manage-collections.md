---
id: manage-collections.md
title: Spiegazione delle raccolte
summary: >-
  In Milvus è possibile creare più raccolte per gestire i dati e inserire i dati
  come entità nelle raccolte. Le collezioni e le entità sono simili alle tabelle
  e ai record dei database relazionali. Questa pagina aiuta a conoscere le
  raccolte e i concetti correlati.
---
<h1 id="Collection-Explained" class="common-anchor-header">Spiegazione delle raccolte<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus è possibile creare più raccolte per gestire i dati e inserirli come entità nelle raccolte. Le collezioni e le entità sono simili alle tabelle e ai record dei database relazionali. Questa pagina aiuta a conoscere le raccolte e i concetti correlati.</p>
<h2 id="Collection" class="common-anchor-header">Raccolta<button data-href="#Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Una collezione è una tabella bidimensionale con colonne fisse e righe variabili. Ogni colonna rappresenta un campo e ogni riga rappresenta un'entità.</p>
<p>La tabella seguente mostra una collezione con otto colonne e sei entità.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" />
   </span> <span class="img-wrapper"> <span>Spiegazione delle raccolte</span> </span></p>
<h2 id="Schema-and-Fields" class="common-anchor-header">Schema e campi<button data-href="#Schema-and-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando si descrive un oggetto, di solito si citano i suoi attributi, come la dimensione, il peso e la posizione. È possibile utilizzare questi attributi come campi di una collezione. Ogni campo ha diverse proprietà vincolanti, come il tipo di dati e la dimensionalità di un campo vettoriale. È possibile creare uno schema di raccolta creando i campi e definendone l'ordine. Per i possibili tipi di dati applicabili, consultare <a href="/docs/it/schema.md">Schema spiegato</a>.</p>
<p>È necessario includere tutti i campi definiti dallo schema nelle entità da inserire. Per rendere alcuni di essi facoltativi, si può pensare di attivare il campo dinamico. Per maggiori dettagli, consultare <a href="/docs/it/enable-dynamic-field.md">Campo dinamico</a>.</p>
<ul>
<li><p><strong>Rendere i campi annullabili o impostare valori predefiniti</strong></p>
<p>Per i dettagli su come rendere un campo annullabile o impostare il valore predefinito, consultare <a href="/docs/it/nullable-and-default.md">Nullable &amp; Default</a>.</p></li>
<li><p><strong>Abilitazione del campo dinamico</strong></p>
<p>Per i dettagli su come abilitare e utilizzare il campo dinamico, consultare <a href="/docs/it/enable-dynamic-field.md">Campo dinamico</a>.</p></li>
</ul>
<h2 id="Primary-key-and-AutoId" class="common-anchor-header">Chiave primaria e AutoId<button data-href="#Primary-key-and-AutoId" class="anchor-icon" translate="no">
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
    </button></h2><p>Analogamente al campo primario in un database relazionale, una collezione ha un campo primario per distinguere un'entità dalle altre. Ogni valore del campo primario è globalmente unico e corrisponde a un'entità specifica.</p>
<p>Come mostrato nel grafico precedente, il campo <strong>id</strong> funge da campo primario e il primo ID <strong>0</strong> corrisponde a un'entità intitolata <em>Il tasso di mortalità del Coronavirus non è importante</em>. Non ci sarà nessun'altra entità che abbia il campo primario 0.</p>
<p>Un campo primario accetta solo numeri interi o stringhe. Quando si inseriscono le entità, i valori del campo primario devono essere inclusi per impostazione predefinita. Tuttavia, se si è abilitato l'<strong>AutoId</strong> alla creazione della collezione, Milvus genererà questi valori al momento dell'inserimento dei dati. In tal caso, escludere i valori del campo primario dalle entità da inserire.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/primary-field.md">Campo primario e AutoId</a>.</p>
<h2 id="Index" class="common-anchor-header">Indice<button data-href="#Index" class="anchor-icon" translate="no">
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
    </button></h2><p>La creazione di indici su campi specifici migliora l'efficienza della ricerca. Si consiglia di creare indici per tutti i campi su cui si basa il servizio, tra cui gli indici sui campi vettoriali sono obbligatori.</p>
<h2 id="Entity" class="common-anchor-header">Entità<button data-href="#Entity" class="anchor-icon" translate="no">
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
    </button></h2><p>Le entità sono record di dati che condividono lo stesso insieme di campi in una raccolta. I valori di tutti i campi di una stessa riga costituiscono un'entità.</p>
<p>È possibile inserire tutte le entità necessarie in una collezione. Tuttavia, con l'aumentare del numero di entità, aumenta anche la dimensione della memoria necessaria, con ripercussioni sulle prestazioni della ricerca.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/schema.md">Schema spiegato</a>.</p>
<h2 id="Load-and-Release" class="common-anchor-header">Caricare e rilasciare<button data-href="#Load-and-Release" class="anchor-icon" translate="no">
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
    </button></h2><p>Il caricamento di una collezione è il prerequisito per effettuare ricerche di similarità e query nelle collezioni. Quando si carica una collezione, Milvus carica in memoria tutti i file di indice e i dati grezzi di ogni campo per rispondere rapidamente alle ricerche e alle query.</p>
<p>Le ricerche e le query sono operazioni che richiedono molta memoria. Per risparmiare sui costi, si consiglia di rilasciare le raccolte che non sono attualmente in uso.</p>
<p>Per maggiori dettagli, consultare <a href="/docs/it/load-and-release.md">Carica e rilascia</a>.</p>
<h2 id="Search-and-Query" class="common-anchor-header">Ricerca e query<button data-href="#Search-and-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta creati gli indici e caricata la collezione, è possibile avviare una ricerca di similarità alimentando uno o più vettori di query. Ad esempio, quando si riceve la rappresentazione vettoriale della query in una richiesta di ricerca, Milvus utilizza il tipo di metrica specificato per misurare la somiglianza tra il vettore della query e quelli della collezione di destinazione prima di restituire quelli che sono semanticamente simili alla query.</p>
<p>È anche possibile includere il filtraggio dei metadati nelle ricerche e nelle query per migliorare la pertinenza dei risultati. Le condizioni di filtraggio dei metadati sono obbligatorie nelle query, ma facoltative nelle ricerche.</p>
<p>Per informazioni dettagliate sui tipi di metrica applicabili, consultare <a href="/docs/it/metric.md">Tipi di metrica</a>.</p>
<p>Per ulteriori informazioni su ricerche e query, consultare gli articoli del capitolo Ricerca e Rerank, tra cui le caratteristiche di base:</p>
<ul>
<li><p><a href="/docs/it/single-vector-search.md">Ricerca RNA di base</a></p></li>
<li><p><a href="/docs/it/filtered-search.md">Ricerca filtrata</a></p></li>
<li><p><a href="/docs/it/range-search.md">Ricerca per intervallo</a></p></li>
<li><p><a href="/docs/it/grouping-search.md">Ricerca per raggruppamento</a></p></li>
<li><p><a href="/docs/it/multi-vector-search.md">Ricerca ibrida</a></p></li>
<li><p><a href="/docs/it/with-iterators.md">Iteratore di ricerca</a></p></li>
<li><p><a href="/docs/it/get-and-scalar-query.md">Query</a></p></li>
<li><p><a href="/docs/it/full-text-search.md">Ricerca a testo completo</a></p></li>
<li><p><a href="/docs/it/keyword-match.md">Corrispondenza del testo</a></p></li>
</ul>
<p>Inoltre, Milvus offre anche miglioramenti per migliorare le prestazioni e l'efficienza della ricerca. Questi miglioramenti sono disattivati per impostazione predefinita e possono essere attivati e utilizzati in base alle esigenze del servizio. Essi sono</p>
<ul>
<li><p><a href="/docs/it/use-partition-key.md">Usa chiave di partizione</a></p></li>
<li><p><a href="/docs/it/mmap.md">Usa mmap</a></p></li>
<li><p><a href="/docs/it/clustering-compaction.md">Compattazione del clustering</a></p></li>
</ul>
<h2 id="Partition" class="common-anchor-header">Partizione<button data-href="#Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Le partizioni sono sottoinsiemi di una collezione, che condividono lo stesso insieme di campi con la collezione madre, e che contengono ciascuna un sottoinsieme di entità.</p>
<p>Allocando le entità in partizioni diverse, è possibile creare gruppi di entità. È possibile effettuare ricerche e interrogazioni in partizioni specifiche per far sì che Milvus ignori le entità in altre partizioni e migliorare l'efficienza della ricerca.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/manage-partitions.md">Gestione delle partizioni</a>.</p>
<h2 id="Shard" class="common-anchor-header">Frammenti<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>I frammenti sono fette orizzontali di una raccolta. Ogni frammento corrisponde a un canale di ingresso dei dati. Ogni raccolta ha un frammento per impostazione predefinita. Al momento della creazione di una raccolta, è possibile impostare il numero appropriato di shard in base al throughput previsto e al volume dei dati da inserire nella raccolta.</p>
<p>Per informazioni dettagliate su come impostare il numero di shard, consultare la sezione <a href="/docs/it/create-collection.md">Crea raccolta</a>.</p>
<h2 id="Alias" class="common-anchor-header">Alias<button data-href="#Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile creare alias per le raccolte. Una raccolta può avere diversi alias, ma le raccolte non possono condividere un alias. Quando si riceve una richiesta per una raccolta, Milvus individua la raccolta in base al nome fornito. Se la collezione con il nome fornito non esiste, Milvus continua a localizzare il nome fornito come alias. È possibile utilizzare gli alias delle collezioni per adattare il codice a diversi scenari.</p>
<p>Per maggiori dettagli, consultare <a href="/docs/it/manage-aliases.md">Gestione degli alias</a>.</p>
<h2 id="Function" class="common-anchor-header">Funzione<button data-href="#Function" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile impostare funzioni che Milvus ricava dai campi al momento della creazione della raccolta. Ad esempio, la funzione di ricerca full-text utilizza la funzione definita dall'utente per derivare un campo vettoriale sparse da un campo varchar specifico. Per ulteriori informazioni sulla ricerca full-text, consultare la sezione <a href="/docs/it/full-text-search.md">Ricerca full-text</a>.</p>
<h2 id="Consistency-Level" class="common-anchor-header">Livello di consistenza<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>I sistemi di database distribuiti di solito usano il livello di coerenza per definire l'uniformità dei dati tra i nodi di dati e le repliche. È possibile impostare livelli di consistenza separati quando si crea una raccolta o si effettuano ricerche di somiglianza all'interno della raccolta. I livelli di coerenza applicabili sono <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong> e <strong>Eventually</strong>.</p>
<p>Per informazioni dettagliate su questi livelli di consistenza, consultare <a href="/docs/it/tune_consistency.md">Livello di consistenza</a>.</p>
