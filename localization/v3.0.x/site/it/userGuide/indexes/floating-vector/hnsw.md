---
id: hnsw.md
title: HNSW
summary: >-
  L'indice HNSW è un algoritmo di indicizzazione basato su grafi in grado di
  migliorare le prestazioni nella ricerca di vettori flottanti ad alta
  dimensionalità. Offre un'eccellente precisione di ricerca e una bassa latenza,
  ma richiede un elevato overhead di memoria per mantenere la propria struttura
  gerarchica a grafo.
---
<h1 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indice <strong>HNSW</strong> è un algoritmo di indicizzazione <strong>basato su grafi</strong> in grado di migliorare le prestazioni nella ricerca di vettori flottanti ad alta dimensionalità. Offre <strong>un'eccellente</strong> precisione di ricerca e <strong>una bassa</strong> latenza, ma richiede un <strong>elevato</strong> overhead di memoria per mantenere la propria struttura gerarchica a grafo.</p>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>L'algoritmo Hierarchical Navigable Small World (HNSW) costruisce un grafo a più livelli, simile a una mappa con diversi livelli di zoom. Il <strong>livello inferiore</strong> contiene tutti i punti dati, mentre i <strong>livelli superiori</strong> sono costituiti da un sottoinsieme di punti dati campionati dal livello inferiore.</p>
<p>In questa gerarchia, ogni livello contiene nodi che rappresentano i punti dati, collegati da archi che indicano la loro vicinanza. I livelli superiori consentono salti a lunga distanza per avvicinarsi rapidamente all’obiettivo, mentre i livelli inferiori permettono una ricerca più dettagliata per ottenere i risultati più accurati.</p>
<p>Ecco come funziona:</p>
<ol>
<li><p><strong>Punto di ingresso</strong>: la ricerca inizia da un punto di ingresso fisso nel livello superiore, che è un nodo predeterminato nel grafico.</p></li>
<li><p><strong>Ricerca avida</strong>: l’algoritmo si sposta in modo avido verso il vicino più prossimo nello strato corrente finché non può avvicinarsi ulteriormente al vettore di query. Gli strati superiori hanno una funzione di navigazione, agendo come un filtro grossolano per individuare potenziali punti di ingresso per la ricerca più dettagliata ai livelli inferiori.</p></li>
<li><p><strong>Discesa tra i livelli</strong>: una volta raggiunto un <strong>minimo locale</strong> nel livello corrente, l’algoritmo salta al livello inferiore, utilizzando una connessione prestabilita, e ripete la ricerca avida.</p></li>
<li><p><strong>Raffinamento</strong><strong>finale</strong>: questo processo continua fino al raggiungimento del livello più basso, dove una fase di raffinamento finale identifica i vicini più prossimi.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" /> 
   <span>HNSW</span>
  
 </span></p>
<p>Le prestazioni di HNSW dipendono da diversi parametri chiave che controllano sia la struttura del grafo sia il comportamento di ricerca. Tra questi figurano:</p>
<ul>
<li><p><code translate="no">M</code>: Il numero massimo di archi o connessioni che ogni nodo può avere nel grafo a ciascun livello della gerarchia. Un valore più alto di <code translate="no">M</code> determina un grafo più denso e aumenta il richiamo e l’accuratezza, poiché la ricerca dispone di più percorsi da esplorare; ciò comporta però un maggiore consumo di memoria e un rallentamento dei tempi di inserimento a causa delle connessioni aggiuntive. Come mostrato nell’immagine sopra, <strong>M = 5</strong> indica che ogni nodo nel grafo HNSW è collegato direttamente a un massimo di 5 altri nodi. Ciò crea una struttura del grafo moderatamente densa in cui i nodi dispongono di più percorsi per raggiungere altri nodi.</p></li>
<li><p><code translate="no">efConstruction</code>: Il numero di candidati presi in considerazione durante la costruzione dell’indice. Un valore più alto di “ <code translate="no">efConstruction</code> ” (numero di vicini) comporta generalmente un grafico di qualità migliore, ma richiede più tempo per la costruzione.</p></li>
<li><p><code translate="no">ef</code>: Il numero di vicini valutati durante una ricerca. Aumentando l’ <code translate="no">ef</code> e si migliora la probabilità di trovare i vicini più prossimi, ma si rallenta il processo di ricerca.</p></li>
</ul>
<p>Per i dettagli su come regolare queste impostazioni in base alle proprie esigenze, consultare <a href="/docs/it/hnsw.md#Index-params">Parametri dell’indice</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Creazione dell’indice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Questo esempio utilizza un client connesso denominato <code translate="no">client</code> e una collezione esistente denominata <code translate="no">your_collection_name</code>. La collezione contiene un campo vettoriale a cinque dimensioni denominato <code translate="no">your_vector_field_name</code>.</p>
<p>Definire i parametri dell’indice con <code translate="no">add_index()</code>, quindi creare l’indice con <code translate="no">create_index()</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
    } <span class="hljs-comment"># Index building params</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">index_type</code>: Il tipo di indice da creare. In questo esempio, impostare il valore su <code translate="no">HNSW</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Il metodo utilizzato per calcolare la distanza tra i vettori. I valori supportati includono <code translate="no">COSINE</code>, <code translate="no">L2</code> e <code translate="no">IP</code>. Per ulteriori dettagli, consultare <a href="/docs/it/metric.md">Tipi di metrica</a>.</p></li>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la creazione dell’indice.</p>
<ul>
<li><p><code translate="no">M</code>: Numero massimo di vicini a cui ogni nodo può connettersi.</p></li>
<li><p><code translate="no">efConstruction</code>: Numero di vicini candidati presi in considerazione per la connessione durante la creazione dell’indice.</p></li>
</ul>
<p>L’esempio imposta <code translate="no">M=64</code> e <code translate="no">efConstruction=100</code> come valori di ottimizzazione. Per i valori predefiniti e gli intervalli consentiti, consultare <a href="/docs/it/hnsw.md#Index-building-params">Parametri di creazione dell’indice</a>.</p></li>
</ul>
<p>Per creare contemporaneamente una raccolta e il relativo indice, passare i parametri dell’indice a <code translate="no">create_collection()</code>. Per ulteriori dettagli, consultare <a href="/docs/it/create-collection.md">Creazione di una raccolta</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Ricerca sull’indice<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver creato l'indice e inserito le entità, caricare la collezione ed eseguire la ricerca nel suo campo vettoriale. Per le normali ricerche kNN, impostare ` <code translate="no">ef</code> ` su un valore almeno pari a ` <code translate="no">limit</code>`.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

client.load_collection(collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>)

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la ricerca sull’indice.</p>
<ul>
<li><code translate="no">ef</code>: Numero di vicini da considerare durante una ricerca.</li>
</ul>
<p>Per ulteriori informazioni sui parametri di ricerca disponibili per l'indice <code translate="no">HNSW</code>, consultare <a href="/docs/it/hnsw.md#Index-specific-search-params">Parametri di ricerca specifici dell'indice</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Parametri dell’indice<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Le tabelle seguenti elencano i parametri per la creazione dell’indice e la ricerca. Le impostazioni del server possono sovrascrivere i valori predefiniti per i parametri omessi.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parametri di creazione dell’indice<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>La tabella seguente elenca i parametri che è possibile configurare in <code translate="no">params</code> durante <a href="/docs/it/hnsw.md#Build-index">la creazione di un indice</a>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Intervallo di valori</p></th>
     <th><p>Suggerimento di ottimizzazione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Numero massimo di connessioni (o spigoli) che ogni nodo può avere nel grafo, inclusi sia gli spigoli in uscita che quelli in entrata. Questo parametro influisce direttamente sia sulla creazione dell’indice che sulla ricerca.</p></td>
     <td><p><strong>Tipo</strong>: Intero <strong>Intervallo</strong>: [2, 2048]</p><p><strong>Valore predefinito</strong>: <code translate="no">30</code> (fino a 30 spigoli in uscita e 30 in entrata per nodo)</p></td>
     <td><p>Un valore più elevato di " <code translate="no">M</code> " comporta generalmente <strong>una maggiore precisione</strong>, ma <strong>aumenta il carico di memoria</strong> e <strong>rallenta sia la creazione dell'indice che la ricerca</strong>. Si consiglia di aumentare " <code translate="no">M</code> " per set di dati ad alta dimensionalità o quando è fondamentale un elevato recall.</p><p>Si consiglia di ridurre il valore di ` <code translate="no">M</code> ` quando l’utilizzo della memoria e la velocità di ricerca sono le priorità principali.</p><p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [5, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Numero di vicini candidati presi in considerazione per la connessione durante la creazione dell’indice. Per ogni nuovo elemento viene valutato un insieme più ampio di candidati, ma il numero massimo di connessioni effettivamente stabilite rimane comunque limitato da <code translate="no">M</code>.</p></td>
     <td><p><strong>Tipo</strong>: Intero <strong>Intervallo</strong>: [1, <em>int_max</em>]</p><p><strong>Valore predefinito</strong>: <code translate="no">360</code></p></td>
     <td><p>Un valore più elevato di ` <code translate="no">efConstruction</code> ` comporta in genere un <strong>indice più accurato</strong>, poiché vengono esplorate più connessioni potenziali. Tuttavia, ciò comporta anche <strong>tempi di indicizzazione più lunghi e un maggiore utilizzo di memoria</strong> durante la creazione. Si consiglia di aumentare ` <code translate="no">efConstruction</code> ` per una maggiore accuratezza, specialmente in scenari in cui il tempo di indicizzazione è meno critico.</p><p>Si consiglia di ridurre il valore di ` <code translate="no">efConstruction</code> ` per accelerare la creazione dell’indice quando le risorse disponibili sono limitate.</p><p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [50, 500].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parametri di ricerca specifici dell’indice<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>La tabella seguente elenca i parametri configurabili in <code translate="no">search_params.params</code> durante <a href="/docs/it/hnsw.md#Search-on-index">la ricerca nell’indice</a>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Intervallo di valori</p></th>
     <th><p>Suggerimento di ottimizzazione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Controlla l’ampiezza della ricerca durante il recupero del vicino più prossimo. Determina quanti nodi vengono visitati e valutati come potenziali vicini più prossimi.  Questo parametro influisce solo sul processo di ricerca e si applica esclusivamente allo strato inferiore del grafico.</p></td>
     <td><p><strong>Tipo</strong>: Intero <strong>Intervallo</strong>: [1, <em>int_max</em>]</p><p><strong>Valore predefinito</strong>: <code translate="no">max(limit, 16)</code> per la ricerca kNN ordinaria; <code translate="no">512</code> per la ricerca per intervallo.</p><p>Per la ricerca kNN ordinaria, un valore esplicito di ` <code translate="no">ef</code> ` deve essere maggiore o uguale a ` <code translate="no">limit</code> ` (il numero di vicini più prossimi da restituire).</p></td>
     <td><p>Un valore maggiore di <code translate="no">ef</code> comporta generalmente <strong>una maggiore precisione della ricerca</strong>, poiché vengono presi in considerazione più potenziali vicini. Tuttavia, ciò <strong>aumenta</strong> anche <strong>il tempo di ricerca</strong>. Si consiglia di aumentare <code translate="no">ef</code> quando è fondamentale ottenere un recall elevato e la velocità di ricerca è meno importante.</p><p>Si consiglia di ridurre il valore di ` <code translate="no">ef</code> ` per dare priorità a ricerche più veloci, specialmente in scenari in cui è accettabile una leggera riduzione della precisione.</p><p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [K, 10K].</p></td>
   </tr>
</table>
