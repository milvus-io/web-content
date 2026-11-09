---
id: manage-collections.md
title: Guida alle collezioni
summary: >-
  Su Milvus è possibile creare più raccolte per gestire i propri dati e inserire
  tali dati come entità all’interno delle raccolte. Le raccolte e le entità sono
  simili alle tabelle e ai record presenti nei database relazionali. Questa
  pagina ti aiuta a comprendere meglio il concetto di raccolta e i concetti
  correlati.
---
<h1 id="Collection-Explained" class="common-anchor-header">Guida alle collezioni<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Su Milvus è possibile creare più raccolte per gestire i propri dati e inserire tali dati come entità all’interno delle raccolte. Le raccolte e le entità sono simili alle tabelle e ai record presenti nei database relazionali. Questa pagina aiuta a comprendere meglio il concetto di raccolta e i concetti correlati.</p>
<h2 id="Collection" class="common-anchor-header">Collezione<button data-href="#Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Una raccolta è una tabella bidimensionale con colonne fisse e righe variabili. Ogni colonna rappresenta un campo, mentre ogni riga rappresenta un'entità.</p>
<p>Il grafico seguente mostra una collezione con otto colonne e sei entità.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" /> 
   <span>Spiegazione delle collezioni</span>
  
 </span></p>
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
    </button></h2><p>Quando si descrive un oggetto, solitamente se ne menzionano gli attributi, quali dimensioni, peso e posizione. È possibile utilizzare questi attributi come campi in una collezione. Ogni campo presenta diverse proprietà vincolanti, quali il tipo di dati e la dimensionalità di un campo vettoriale. È possibile creare uno schema di collezione creando i campi e definendone l’ordine. Per i possibili tipi di dati applicabili, consultare la sezione <a href="/docs/it/schema.md">Spiegazione dello schema</a>.</p>
<p>È necessario includere tutti i campi definiti dallo schema nelle entità da inserire. Per rendere alcuni di essi facoltativi, si consiglia di abilitare il campo dinamico. Per i dettagli, consultare la sezione "Spieg <a href="/docs/it/enable-dynamic-field.md">azione dei campi dinamici</a>".</p>
<ul>
<li><p><strong>Renderli nullabili o impostare valori predefiniti</strong></p>
<p>Per i dettagli su come rendere un campo nullabile o impostare il valore predefinito, consultare la sezione " <a href="/docs/it/nullable-and-default.md">Nullabile e predefinito</a>".</p></li>
<li><p><strong>Abilitazione del campo dinamico</strong></p>
<p>Per i dettagli su come abilitare e utilizzare il campo dinamico, consultare la sezione " <a href="/docs/it/enable-dynamic-field.md">Campo dinamico"</a>.</p></li>
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
    </button></h2><p>Analogamente al campo primario in un database relazionale, una collezione dispone di un campo primario per distinguere un'entità dalle altre. Ogni valore nel campo primario è univoco a livello globale e corrisponde a una specifica entità.</p>
<p>Come mostrato nel grafico sopra, il campo denominato <strong>id</strong> funge da campo primario e il primo ID <strong>0</strong> corrisponde a un'entità intitolata <em>"Il tasso di mortalità del coronavirus non è importante</em>". Non ci sarà nessun'altra entità con il campo primario pari a 0.</p>
<p>Un campo primario accetta solo numeri interi o stringhe. Quando si inseriscono entità, è necessario includere i valori del campo primario per impostazione predefinita. Tuttavia, se è stato abilitato <strong>AutoId</strong> al momento della creazione della collezione, Milvus genererà tali valori al momento dell’inserimento dei dati. In tal caso, escludere i valori del campo primario dalle entità da inserire.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/primary-field.md">Campo primario e AutoId</a>.</p>
<h2 id="Index" class="common-anchor-header">Indici<button data-href="#Index" class="anchor-icon" translate="no">
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
    </button></h2><p>La creazione di indici su campi specifici migliora l’efficienza della ricerca. Si consiglia di creare indici per tutti i campi su cui si basa il servizio; tra questi, gli indici sui campi vettoriali sono obbligatori.</p>
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
    </button></h2><p>Le entità sono record di dati che condividono lo stesso insieme di campi in una collezione. I valori in tutti i campi della stessa riga costituiscono un'entità.</p>
<p>È possibile inserire in una collezione tutte le entità necessarie. Tuttavia, all’aumentare del numero di entità, aumenta anche lo spazio di memoria occupato, con un impatto sulle prestazioni di ricerca.</p>
<p>Per ulteriori informazioni, consultare la sezione " <a href="/docs/it/schema.md">Spiegazione dello schema</a>".</p>
<h2 id="Load-and-Release" class="common-anchor-header">Caricamento e rilascio<button data-href="#Load-and-Release" class="anchor-icon" translate="no">
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
    </button></h2><p>Il caricamento di una raccolta è il prerequisito per eseguire ricerche di similarità e query all’interno delle raccolte. Quando si carica una raccolta, Milvus carica in memoria tutti i file di indice e i dati grezzi di ciascun campo per garantire una risposta rapida alle ricerche e alle query.</p>
<p>Le ricerche e le query sono operazioni che richiedono un uso intensivo della memoria. Per ridurre i costi, si consiglia di liberare le collezioni che non sono attualmente in uso.</p>
<p>Per ulteriori dettagli, consultare <a href="/docs/it/load-and-release.md">Caricamento e rilascio</a>.</p>
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
    </button></h2><p>Una volta creati gli indici e caricata la collezione, è possibile avviare una ricerca di similarità immettendo uno o più vettori di query. Ad esempio, quando riceve la rappresentazione vettoriale della query contenuta in una richiesta di ricerca, Milvus utilizza il tipo di metrica specificato per misurare la similarità tra il vettore di query e quelli presenti nella collezione di destinazione, prima di restituire quelli semanticamente simili alla query.</p>
<p>È inoltre possibile includere il filtraggio dei metadati nelle ricerche e nelle query per migliorare la pertinenza dei risultati. Si noti che le condizioni di filtraggio dei metadati sono obbligatorie nelle query ma facoltative nelle ricerche.</p>
<p>Per i dettagli sui tipi di metrica applicabili, consultare <a href="/docs/it/metric.md">Tipi</a> di <a href="/docs/it/metric.md">metrica</a>.</p>
<p>Per ulteriori informazioni su ricerche e query, consultare gli articoli nel capitolo "Ricerca e riclassificazione", tra cui le funzionalità di base sono:</p>
<ul>
<li><p><a href="/docs/it/single-vector-search.md">Ricerca ANN di base</a></p></li>
<li><p><a href="/docs/it/filtered-search.md">Ricerca filtrata</a></p></li>
<li><p><a href="/docs/it/range-search.md">Ricerca per intervallo</a></p></li>
<li><p><a href="/docs/it/grouping-search.md">Ricerca per raggruppamento</a></p></li>
<li><p><a href="/docs/it/multi-vector-search.md">Ricerca ibrida</a></p></li>
<li><p><a href="/docs/it/with-iterators.md">Iteratore di ricerca</a></p></li>
<li><p><a href="/docs/it/get-and-scalar-query.md">Query</a></p></li>
<li><p><a href="/docs/it/full-text-search.md">Ricerca full-text</a></p></li>
<li><p><a href="/docs/it/keyword-match.md">Corrispondenza testuale</a></p></li>
</ul>
<p>Inoltre, Milvus offre anche funzionalità avanzate per migliorare le prestazioni e l’efficienza della ricerca. Sono disabilitate per impostazione predefinita, ma è possibile abilitarle e utilizzarle in base alle esigenze del proprio servizio. Esse sono</p>
<ul>
<li><p><a href="/docs/it/use-partition-key.md">Utilizzo della chiave di partizione</a></p></li>
<li><p><a href="/docs/it/mmap.md">Utilizza mmap</a></p></li>
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
    </button></h2><p>Le partizioni sono sottoinsiemi di una collezione, che condividono lo stesso insieme di campi con la collezione padre, ciascuna contenente un sottoinsieme di entità.</p>
<p>Assegnando le entità a partizioni diverse, è possibile creare gruppi di entità. È possibile eseguire ricerche e query in partizioni specifiche in modo che Milvus ignori le entità presenti in altre partizioni, migliorando così l'efficienza della ricerca.</p>
<p>Per ulteriori dettagli, consultare <a href="/docs/it/manage-partitions.md">Gestione delle partizioni</a>.</p>
<h2 id="Shard" class="common-anchor-header">Shard<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>Gli shard sono sezioni orizzontali di una collezione. Ogni shard corrisponde a un canale di input dei dati. Per impostazione predefinita, ogni collezione ha uno shard. È possibile impostare il numero appropriato di shard durante la creazione di una collezione in base al throughput previsto e al volume dei dati da inserire nella collezione.</p>
<p>Per i dettagli su come impostare il numero di shard, consultare la sezione " <a href="/docs/it/create-collection.md">Creazione di una raccolta</a>".</p>
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
    </button></h2><p>È possibile creare alias per le proprie collezioni. Una collezione può avere diversi alias, ma le collezioni non possono condividere lo stesso alias. Quando riceve una richiesta relativa a una collezione, Milvus individua la collezione in base al nome fornito. Se la collezione con il nome fornito non esiste, Milvus continua a cercare il nome fornito come alias. È possibile utilizzare gli alias delle collezioni per adattare il codice a diversi scenari.</p>
<p>Per ulteriori dettagli, consultare <a href="/docs/it/manage-aliases.md">Gestire gli alias</a>.</p>
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
    </button></h2><p>È possibile impostare funzioni affinché Milvus derivi i campi al momento della creazione della collezione. Ad esempio, la funzione di ricerca full-text utilizza la funzione definita dall’utente per derivare un campo vettoriale sparso da uno specifico campo varchar. Per ulteriori informazioni sulla ricerca full-text, consultare <a href="/docs/it/full-text-search.md">Ricerca full-text</a>.</p>
<h2 id="Consistency-Level" class="common-anchor-header">Livello di coerenza<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>I sistemi di database distribuiti utilizzano solitamente il livello di coerenza per definire l’uniformità dei dati tra i nodi di dati e le repliche. È possibile impostare livelli di coerenza distinti quando si crea una collezione o si effettuano ricerche di similarità all’interno della collezione. I livelli di coerenza applicabili sono <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong> ed <strong>Eventually</strong>.</p>
<p>Per ulteriori dettagli su questi livelli di coerenza, consultare <a href="/docs/it/tune_consistency.md">Livello</a> di <a href="/docs/it/tune_consistency.md">coerenza</a>.</p>
