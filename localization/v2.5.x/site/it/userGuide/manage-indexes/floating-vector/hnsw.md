---
id: hnsw.md
order: 1
summary: Questo articolo introduce l'indice HNSW in Milvus.
title: HNSW
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
    </button></h1><p>L'indice <strong>HNSW</strong> è un algoritmo di indicizzazione <strong>basato su grafi</strong> che può migliorare le prestazioni nella ricerca di vettori flottanti ad alta dimensione. Offre un'<strong>eccellente</strong> precisione di ricerca e una <strong>bassa</strong> latenza, ma richiede <strong>un elevato</strong> overhead di memoria per mantenere la sua struttura a grafo gerarchico.</p>
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
    </button></h2><p>L'algoritmo Hierarchical Navigable Small World (HNSW) costruisce un grafo a più livelli, come una mappa con diversi livelli di zoom. Il <strong>livello inferiore</strong> contiene tutti i punti dati, mentre i <strong>livelli superiori</strong> sono costituiti da un sottoinsieme di punti dati campionati dal livello inferiore.</p>
<p>In questa gerarchia, ogni livello contiene nodi che rappresentano i punti di dati, collegati da bordi che indicano la loro vicinanza. Gli strati superiori forniscono salti a lunga distanza per avvicinarsi rapidamente all'obiettivo, mentre gli strati inferiori consentono una ricerca a grana fine per ottenere i risultati più precisi.</p>
<p>Ecco come funziona:</p>
<ol>
<li><strong>Punto di ingresso</strong>: La ricerca inizia da un punto di ingresso fisso nel livello superiore, che è un nodo predeterminato del grafo.</li>
<li><strong>Ricerca avida</strong>: L'algoritmo si muove avidamente verso il vicino più prossimo del livello corrente, finché non riesce ad avvicinarsi al vettore della domanda. Gli strati superiori hanno una funzione di navigazione, agendo come un filtro grossolano per individuare i potenziali punti di ingresso per la ricerca più fine ai livelli inferiori.</li>
<li><strong>Discesa del livello</strong>: Una volta raggiunto un <strong>minimo locale</strong> nel livello corrente, l'algoritmo salta al livello inferiore, utilizzando un collegamento prestabilito, e ripete la ricerca avida.</li>
<li><strong>Raffinamento</strong><strong>finale</strong>: Questo processo continua fino al raggiungimento del livello inferiore, dove un'ultima fase di raffinamento identifica i vicini più prossimi.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" />
   </span> <span class="img-wrapper"> <span>HNSW</span> </span></p>
<p>Le prestazioni di HNSW dipendono da diversi parametri chiave che controllano sia la struttura del grafo sia il comportamento della ricerca. Questi includono:</p>
<ul>
<li><code translate="no">M</code>: Il numero massimo di spigoli o connessioni che ogni nodo può avere nel grafo a ogni livello della gerarchia. Un numero più elevato di <code translate="no">M</code> determina un grafo più denso e aumenta il richiamo e l'accuratezza, poiché la ricerca ha più percorsi da esplorare, ma consuma anche più memoria e rallenta il tempo di inserimento a causa delle connessioni aggiuntive. Come mostrato nell'immagine precedente, <strong>M = 5</strong> indica che ogni nodo del grafo HNSW è collegato direttamente a un massimo di altri 5 nodi. Questo crea una struttura del grafo moderatamente densa, in cui i nodi hanno più percorsi per raggiungere altri nodi.</li>
<li><code translate="no">efConstruction</code>: Numero di candidati considerati durante la costruzione dell'indice. Un numero più alto di <code translate="no">efConstruction</code> generalmente produce un grafo di qualità migliore, ma richiede più tempo per la costruzione.</li>
<li><code translate="no">ef</code>: Il numero di vicini valutati durante la ricerca. L'aumento di <code translate="no">ef</code> migliora la probabilità di trovare i vicini più vicini, ma rallenta il processo di ricerca.</li>
</ul>
<p>Per i dettagli su come regolare queste impostazioni in base alle proprie esigenze, fare riferimento a <a href="#index-params">Parametri indice</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Creare l'indice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Per costruire un indice <code translate="no">HNSW</code> su un campo vettoriale in Milvus, utilizzare il metodo <code translate="no">add_index()</code>, specificando i parametri <code translate="no">index_type</code>, <code translate="no">metric_type</code> e ulteriori per l'indice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

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
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">index_type</code>: Il tipo di indice da costruire. In questo esempio, impostare il valore su <code translate="no">HNSW</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Il metodo utilizzato per calcolare la distanza tra i vettori. I valori supportati sono <code translate="no">COSINE</code>, <code translate="no">L2</code> e <code translate="no">IP</code>. Per maggiori dettagli, consultare <a href="/docs/it/metric.md">Tipi di metriche</a>.</p></li>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la creazione dell'indice.</p>
<ul>
<li><code translate="no">M</code>: Numero massimo di vicini a cui ogni nodo può connettersi.</li>
<li><code translate="no">efConstruction</code>: Numero di vicini candidati considerati per la connessione durante la costruzione dell'indice.</li>
</ul>
<p>Per conoscere altri parametri di costruzione disponibili per l'indice <code translate="no">HNSW</code>, fare riferimento a <a href="#Index-building-params">Parametri di costruzione dell'indice</a>.</p></li>
</ul>
<p>Una volta configurati i parametri dell'indice, è possibile creare l'indice utilizzando direttamente il metodo <code translate="no">create_index()</code> o passando i parametri dell'indice nel metodo <code translate="no">create_collection</code>. Per i dettagli, fare riferimento a <a href="/docs/it/create-collection.md">Creare una raccolta</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Ricerca nell'indice<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta costruito l'indice e inserite le entità, è possibile eseguire ricerche di similarità sull'indice.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la ricerca sull'indice.</p>
<ul>
<li><code translate="no">ef</code>: Numero di vicini da considerare durante la ricerca.</li>
</ul>
<p>Per conoscere altri parametri di ricerca disponibili per l'indice <code translate="no">HNSW</code>, fare riferimento a <a href="#index-specific-search-params">Parametri di ricerca specifici per l'indice</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Parametri dell'indice<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa sezione fornisce una panoramica dei parametri utilizzati per la creazione di un indice e per l'esecuzione di ricerche sull'indice.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parametri di costruzione dell'indice</h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">params</code> quando si <a href="#Build-index">costruisce un indice</a>.</p>
<table>
<thead>
<tr><th><strong>Parametro</strong></th><th><strong>Descrizione</strong></th><th><strong>Valore Intervallo</strong></th><th><strong>Suggerimento per la messa a punto</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>Numero massimo di connessioni (o bordi) che ogni nodo può avere nel grafo, compresi i bordi in uscita e in entrata.<br>Questo parametro influisce direttamente sulla costruzione dell'indice e sulla ricerca.</td><td><strong>Tipo</strong>: Intero<br><strong>Intervallo</strong>: [2, 2048]<br><strong>Valore predefinito</strong>: <code translate="no">30</code> (fino a 30 bordi uscenti e 30 bordi entranti per nodo)</td><td>Un <code translate="no">M</code> più grande porta generalmente a una <strong>maggiore accuratezza</strong>, ma <strong>aumenta l'overhead di memoria</strong> e <strong>rallenta la costruzione dell'indice e la ricerca</strong>.<br>Considerare l'aumento di <code translate="no">M</code> per i set di dati con elevata dimensionalità o quando è fondamentale un richiamo elevato.<br>Considerare di diminuire <code translate="no">M</code> quando l'uso della memoria e la velocità di ricerca sono le principali preoccupazioni.<br>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [5, 100].</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>Numero di vicini candidati considerati per la connessione durante la costruzione dell'indice.<br>Per ogni nuovo elemento viene valutato un pool più ampio di candidati, ma il numero massimo di connessioni effettivamente stabilite è ancora limitato da <code translate="no">M</code>.</td><td><strong>Tipo</strong>: Intero<br><strong>Intervallo</strong>: [1, <em>int_max</em>]<br><strong>Valore predefinito</strong>: <code translate="no">360</code></td><td>Un valore più alto di <code translate="no">efConstruction</code> produce in genere un <strong>indice più accurato</strong>, poiché vengono esplorate più connessioni potenziali. Tuttavia, ciò comporta anche <strong>tempi di indicizzazione più lunghi e un maggiore utilizzo della memoria</strong> durante la costruzione.<br>Considerare di aumentare <code translate="no">efConstruction</code> per migliorare l'accuratezza, soprattutto in scenari in cui il tempo di indicizzazione è meno critico.<br>Considerare di diminuire <code translate="no">efConstruction</code> per accelerare la costruzione dell'indice quando le risorse sono limitate.<br>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [50, 500].</td></tr>
</tbody>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parametri di ricerca specifici per l'indice</h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">search_params.params</code> durante la <a href="#Search-on-index">ricerca sull'indice</a>.</p>
<table>
<thead>
<tr><th><strong>Parametro</strong></th><th><strong>Descrizione</strong></th><th><strong>Valore Intervallo</strong></th><th><strong>Suggerimento di sintonizzazione</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td><strong>Controlla l'ampiezza della ricerca durante il recupero dei vicini.</strong> Determina il numero di nodi visitati e valutati come potenziali vicini. Questo parametro influisce solo sul processo di ricerca e si applica esclusivamente al livello inferiore del grafo.</td><td><strong>Tipo</strong>: Intero<br><strong>Intervallo</strong>: [1, <em>int_max</em>]<br><strong>Valore predefinito</strong>: <em>limit</em> (TopK nearest neighbors da restituire)</td><td>Un valore maggiore di <code translate="no">ef</code> porta generalmente a una <strong>maggiore accuratezza della ricerca</strong>, poiché vengono considerati più potenziali vicini. Tuttavia, questo <strong>aumenta</strong> anche <strong>il tempo di ricerca</strong>.<br>Considerare di aumentare <code translate="no">ef</code> quando è fondamentale ottenere un richiamo elevato e la velocità di ricerca è meno importante.<br>Considerare di diminuire <code translate="no">ef</code> per dare priorità a ricerche più veloci, soprattutto in scenari in cui una leggera riduzione dell'accuratezza è accettabile.<br>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [K, 10K].</td></tr>
</tbody>
</table>
