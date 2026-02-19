---
id: hnsw-pq.md
title: HNSW_PQ
summary: >-
  HNSW_PQ sfrutta i grafi Hierarchical Navigable Small World (HNSW) con la
  Quantizzazione del Prodotto (PQ), creando un metodo di indicizzazione
  vettoriale avanzato che offre un compromesso controllabile tra dimensione e
  accuratezza. Rispetto a HNSW_SQ, questo tipo di indice offre un tasso di
  richiamo più elevato allo stesso livello di compressione, anche se con una
  velocità di elaborazione delle query inferiore e un tempo di costruzione
  dell'indice più lungo.
---
<h1 id="HNSWPQ" class="common-anchor-header">HNSW_PQ<button data-href="#HNSWPQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_PQ</strong> sfrutta i grafi Hierarchical Navigable Small World (HNSW) con la Quantizzazione del Prodotto (PQ), creando un metodo di indicizzazione vettoriale avanzato che offre un compromesso controllabile tra dimensione e accuratezza. Rispetto a <a href="/docs/it/hnsw-sq.md">HNSW_SQ</a>, questo tipo di indice offre un tasso di richiamo più elevato allo stesso livello di compressione, anche se con una velocità di elaborazione delle query inferiore e un tempo di costruzione dell'indice più lungo.</p>
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
    </button></h2><p>HNSW_PQ combina due tecniche di indicizzazione: <strong>HNSW</strong> per una navigazione veloce basata sui grafi e <strong>PQ</strong> per un'efficiente compressione vettoriale.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW costruisce un grafo multistrato in cui ogni nodo corrisponde a un vettore del set di dati. In questo grafo, i nodi sono collegati in base alla loro somiglianza, consentendo una rapida navigazione nello spazio dei dati. La struttura gerarchica consente all'algoritmo di ricerca di restringere i vicini candidati, accelerando in modo significativo il processo di ricerca in spazi ad alta dimensionalità.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/hnsw.md">HNSW</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ<button data-href="#PQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PQ è una tecnica di compressione vettoriale che scompone i vettori ad alta dimensione in sottovettori più piccoli, che vengono poi quantizzati e compressi. La compressione riduce drasticamente i requisiti di memoria e accelera i calcoli della distanza.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/ivf-pq.md#PQ">FIV_PQ</a>.</p>
<h3 id="HNSW-+-PQ" class="common-anchor-header">HNSW + PQ<button data-href="#HNSW-+-PQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_PQ combina i punti di forza di HNSW e PQ per consentire un'efficiente ricerca approssimata dei vicini. Utilizza PQ per comprimere i dati (riducendo così l'uso della memoria) e quindi costruisce un grafo HNSW su questi vettori compressi per consentire un rapido recupero dei candidati. Durante la ricerca, l'algoritmo può opzionalmente raffinare i risultati dei candidati utilizzando dati di maggiore precisione per migliorare la precisione. Ecco come funziona il processo:</p>
<ol>
<li><p><strong>Compressione dei dati</strong>: PQ divide ogni vettore in più sottovettori e li quantizza utilizzando un codebook di centroidi, controllato da parametri come <code translate="no">m</code> (numero di sottovettori) e <code translate="no">nbits</code> (bit per sottovettore).</p></li>
<li><p><strong>Costruzione del grafico</strong>: I vettori compressi vengono quindi utilizzati per costruire un grafo HNSW. Poiché i vettori sono memorizzati in forma compressa, il grafo risultante è in genere più piccolo, richiede meno memoria e può essere percorso più rapidamente, accelerando notevolmente la fase di recupero dei candidati.</p></li>
<li><p><strong>Recupero dei candidati</strong>: Quando viene eseguita una query, l'algoritmo utilizza i dati compressi nel grafo HNSW per identificare in modo efficiente un pool di vicini candidati. Questa ricerca basata sul grafo riduce drasticamente il numero di vettori da considerare, migliorando la latenza della query rispetto alle ricerche brute-force.</p></li>
<li><p><strong>(Opzionale) Affinamento dei risultati</strong>: I risultati candidati iniziali possono essere raffinati per ottenere una maggiore precisione, in base ai seguenti parametri:</p>
<ul>
<li><p><code translate="no">refine</code>: Controlla se questa fase di raffinamento è attivata. Se impostato su <code translate="no">true</code>, il sistema ricalcola le distanze utilizzando rappresentazioni di precisione superiore o non compresse.</p></li>
<li><p><code translate="no">refine_type</code>: Specifica il livello di precisione dei dati utilizzati durante il raffinamento (ad esempio, SQ6, SQ8, BF16). Una scelta di precisione superiore, come <code translate="no">FP32</code>, può dare risultati più accurati, ma richiede più memoria. Il livello di precisione deve essere superiore alla precisione dell'insieme di dati compresso originale di <code translate="no">sq_type</code>.</p></li>
<li><p><code translate="no">refine_k</code>: Agisce come fattore di ingrandimento. Ad esempio, se il top <em>k</em> è 100 e <code translate="no">refine_k</code> è 2, il sistema classifica nuovamente i 200 candidati migliori e restituisce i 100 migliori, migliorando l'accuratezza complessiva.</p></li>
</ul></li>
</ol>
<p>Per un elenco completo dei parametri e dei valori validi, consultare la sezione <a href="/docs/it/hnsw-sq.md#Index-params">Parametri dell'indice</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Creazione dell'indice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Per costruire un indice <code translate="no">HNSW_PQ</code> su un campo vettoriale in Milvus, utilizzare il metodo <code translate="no">add_index()</code>, specificando i parametri <code translate="no">index_type</code>, <code translate="no">metric_type</code> e altri parametri aggiuntivi per l'indice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">index_type</code>: Il tipo di indice da costruire. In questo esempio, impostare il valore su <code translate="no">HNSW_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Il metodo utilizzato per calcolare la distanza tra i vettori. I valori supportati sono <code translate="no">COSINE</code>, <code translate="no">L2</code> e <code translate="no">IP</code>. Per maggiori dettagli, consultare <a href="/docs/it/metric.md">Tipi di metriche</a>.</p></li>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la costruzione dell'indice. Per i dettagli, fare riferimento a <a href="/docs/it/hnsw-pq.md#Index-building-params">Parametri di costruzione dell'indice</a>.</p></li>
</ul>
<p>Una volta configurati i parametri dell'indice, si può creare l'indice usando direttamente il metodo <code translate="no">create_index()</code> o passando i parametri dell'indice nel metodo <code translate="no">create_collection</code>. Per i dettagli, fare riferimento a <a href="/docs/it/create-collection.md">Creare una raccolta</a>.</p>
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
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Parameter controlling query time/accuracy trade-off</span>
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># The magnification factor</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la ricerca sull'indice. Per i dettagli, fare riferimento a <a href="/docs/it/hnsw-pq.md#Index-specific-search-params">Parametri di ricerca specifici per l'indice</a>.</li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parametri di costruzione dell'indice<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">params</code> durante la <a href="/docs/it/hnsw-pq.md#Build-index">creazione di un indice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore Intervallo</p></th>
     <th><p>Suggerimento per la messa a punto</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Numero massimo di connessioni (o bordi) che ogni nodo può avere nel grafo, compresi i bordi in uscita e in entrata. Questo parametro influisce direttamente sulla costruzione dell'indice e sulla ricerca.</p></td>
     <td><p><strong>Tipo</strong>: <strong>Intervallo</strong>: [2, 2048]</p>
<p><strong>Valore predefinito</strong>: <code translate="no">30</code> (fino a 30 bordi uscenti e 30 bordi entranti per nodo)</p></td>
     <td><p>Un valore maggiore di <code translate="no">M</code> porta generalmente a una <strong>maggiore accuratezza</strong>, ma <strong>aumenta l'overhead di memoria</strong> e <strong>rallenta sia la costruzione dell'indice che la ricerca</strong>. Considerare di aumentare <code translate="no">M</code> per i set di dati con elevata dimensionalità o quando è fondamentale un richiamo elevato.</p>
<p>Si consiglia di diminuire <code translate="no">M</code> quando l'uso della memoria e la velocità di ricerca sono le principali preoccupazioni.</p>
<p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Numero di vicini candidati considerati per la connessione durante la costruzione dell'indice. Per ogni nuovo elemento viene valutato un pool più ampio di candidati, ma il numero massimo di connessioni effettivamente stabilite è ancora limitato da <code translate="no">M</code>.</p></td>
     <td><p><strong>Tipo</strong>: <strong>Intervallo</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valore predefinito</strong>: <code translate="no">360</code></p></td>
     <td><p>Un valore più alto di <code translate="no">efConstruction</code> si traduce tipicamente in un <strong>indice più accurato</strong>, poiché vengono esplorate più connessioni potenziali. Tuttavia, questo comporta anche <strong>tempi di indicizzazione più lunghi e un maggiore utilizzo della memoria</strong> durante la costruzione. Considerare l'aumento di <code translate="no">efConstruction</code> per migliorare l'accuratezza, soprattutto in scenari in cui il tempo di indicizzazione è meno critico.</p>
<p>Considerare di diminuire <code translate="no">efConstruction</code> per accelerare la costruzione dell'indice quando le risorse sono limitate.</p>
<p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Numero di sottovettori (usati per la quantizzazione) in cui dividere ogni vettore ad alta dimensionalità durante il processo di quantizzazione.</p></td>
     <td><p><strong>Tipo</strong>: Intero <strong>Intervallo</strong>: [1, 65536]</p>
<p><strong>Valore predefinito</strong>: Nessuno</p></td>
     <td><p>Un valore più alto di <code translate="no">m</code> può migliorare l'accuratezza, ma aumenta anche la complessità computazionale e l'utilizzo di memoria. <code translate="no">m</code> deve essere un divisore della dimensione del vettore<em>(D</em>) per garantire una corretta decomposizione. Un valore comunemente consigliato è <em>m = D/2</em>.</p>
<p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [D/8, D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Il numero di bit utilizzati per rappresentare l'indice del centroide di ciascun sottovettore nella forma compressa. Determina direttamente la dimensione di ciascun codebook. Ogni codebook conterrà centroidi a 2 <sup>bit</sup>. Ad esempio, se <code translate="no">nbits</code> è impostato su 8, ogni sottovettore sarà rappresentato da un indice del centroide a 8 bit. Ciò consente di avere<sup>28</sup> (256) possibili centroidi nel codebook per quel sottovettore.</p></td>
     <td><p><strong>Tipo</strong>: <strong>Intervallo di</strong> valori: [1, 24]</p>
<p><strong>Valore predefinito</strong>: <code translate="no">8</code></p></td>
     <td><p>Un valore più alto di <code translate="no">nbits</code> consente di avere codebook più ampi, che potenzialmente portano a rappresentazioni più accurate dei vettori originali. Tuttavia, significa anche utilizzare più bit per memorizzare ciascun indice, con conseguente minore compressione. Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Un flag booleano che controlla se viene applicata una fase di raffinamento durante la ricerca. Il raffinamento consiste nel riordinare i risultati iniziali calcolando le distanze esatte tra il vettore della query e i candidati.</p></td>
     <td><p><strong>Tipo</strong>: Booleano <strong>Intervallo</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>Valore predefinito</strong>: <code translate="no">false</code></p></td>
     <td><p>Impostare <code translate="no">true</code> se è essenziale un'elevata precisione e si possono tollerare tempi di ricerca leggermente più lenti. Utilizzare <code translate="no">false</code> se la velocità è una priorità e un piccolo compromesso nella precisione è accettabile.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Determina la precisione dei dati utilizzati durante il processo di raffinamento. Questa precisione deve essere superiore a quella dei vettori compressi (come impostato dai parametri <code translate="no">m</code> e <code translate="no">nbits</code> ).</p></td>
     <td><p><strong>Tipo</strong>: String <strong>Range</strong>:[ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>Valore predefinito</strong>: Nessuno</p></td>
     <td><p>Utilizzare <code translate="no">FP32</code> per ottenere la massima precisione con un costo di memoria più elevato, oppure <code translate="no">SQ6</code>/<code translate="no">SQ8</code> per una migliore compressione. <code translate="no">BF16</code> e <code translate="no">FP16</code> offrono un'alternativa equilibrata.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parametri di ricerca specifici per l'indice<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">search_params.params</code> per la <a href="/docs/it/hnsw-pq.md#Search-on-index">ricerca sull'indice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore Intervallo</p></th>
     <th><p>Suggerimento per la messa a punto</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Controlla l'ampiezza della ricerca durante il recupero dei vicini. Determina il numero di nodi visitati e valutati come potenziali vicini. 
 Questo parametro influisce solo sul processo di ricerca e si applica esclusivamente al livello inferiore del grafo.</p></td>
     <td><p><strong>Tipo</strong>: Intero <strong>Intervallo</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valore predefinito</strong>: <em>limit</em> (TopK vicini da restituire)</p></td>
     <td><p>Un valore maggiore di <code translate="no">ef</code> porta generalmente a una <strong>maggiore accuratezza della ricerca</strong>, poiché vengono considerati più potenziali vicini. Considerare di aumentare <code translate="no">ef</code> quando è fondamentale ottenere un richiamo elevato e la velocità di ricerca è meno importante.</p>
<p>Considerare di diminuire <code translate="no">ef</code> per dare priorità a ricerche più veloci, soprattutto in scenari in cui una leggera riduzione dell'accuratezza è accettabile.</p>
<p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Fattore di ingrandimento che controlla quanti candidati in più vengono esaminati durante la fase di raffinamento (reranking), rispetto ai primi K risultati richiesti.</p></td>
     <td><p><strong>Tipo</strong>: Variabile <strong>Intervallo</strong>: [1, <em>float_max</em>)</p>
<p><strong>Valore predefinito</strong>: 1</p></td>
     <td><p>Valori più alti di <code translate="no">refine_k</code> possono migliorare il richiamo e l'accuratezza, ma aumentano anche il tempo di ricerca e l'utilizzo delle risorse. Un valore di 1 significa che il processo di raffinamento considera solo i primi K risultati iniziali.</p></td>
   </tr>
</table>
