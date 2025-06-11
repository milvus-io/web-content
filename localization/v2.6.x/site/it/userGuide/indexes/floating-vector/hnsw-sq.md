---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQ combina i grafi Hierarchical Navigable Small World (HNSW) con la
  Quantizzazione Scalare (SQ), creando un metodo di indicizzazione vettoriale
  avanzato che offre un compromesso controllabile tra dimensione e precisione.
  Rispetto ai grafi HNSW standard, questo tipo di indice mantiene un'elevata
  velocità di elaborazione delle query, pur introducendo un leggero aumento del
  tempo di costruzione dell'indice.
---
<h1 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_SQ</strong> combina i grafi Hierarchical Navigable Small World (HNSW) con la Quantizzazione Scalare (SQ), creando un metodo di indicizzazione vettoriale avanzato che offre un compromesso controllabile tra dimensione e precisione. Rispetto ai grafi <a href="/docs/it/hnsw.md">HNSW</a> standard, questo tipo di indice mantiene un'elevata velocità di elaborazione delle query, pur introducendo un leggero aumento del tempo di costruzione dell'indice.</p>
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
    </button></h2><p>HNSW_SQ combina due tecniche di indicizzazione: <strong>HNSW</strong> per una navigazione veloce basata sui grafi e <strong>SQ</strong> per un'efficiente compressione vettoriale.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW costruisce un grafo multistrato in cui ogni nodo corrisponde a un vettore del set di dati. In questo grafo, i nodi sono collegati in base alla loro somiglianza, consentendo una rapida navigazione nello spazio dei dati. La struttura gerarchica consente all'algoritmo di ricerca di restringere i vicini candidati, accelerando in modo significativo il processo di ricerca in spazi ad alta dimensionalità.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/hnsw.md">HNSW</a>.</p>
<h3 id="SQ" class="common-anchor-header">SQ</h3><p>SQ è un metodo per comprimere i vettori rappresentandoli con un minor numero di bit. Ad esempio:</p>
<ul>
<li><p><strong>SQ8</strong> utilizza 8 bit, mappando i valori in 256 livelli.  Per ulteriori informazioni, consultare <a href="/docs/it/ivf-sq8.md#SQ8">FIV_SQ8</a>.</p></li>
<li><p><strong>SQ6</strong> utilizza 6 bit per rappresentare ciascun valore in virgola mobile, ottenendo 64 livelli discreti.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" />
   </span> <span class="img-wrapper"> <span>Hnsw Sq</span> </span></p>
<p>Questa riduzione della precisione riduce drasticamente l'ingombro in memoria e velocizza il calcolo, pur mantenendo la struttura essenziale dei dati.</p>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ</h3><p>HNSW_SQ combina i punti di forza di HNSW e SQ per consentire un'efficiente ricerca approssimata dei vicini. Ecco come funziona il processo:</p>
<ol>
<li><p><strong>Compressione dei dati:</strong> SQ comprime i vettori utilizzando <code translate="no">sq_type</code> (ad esempio, SQ6 o SQ8), riducendo così l'utilizzo della memoria. Questa compressione può ridurre la precisione, ma permette al sistema di gestire insiemi di dati più grandi.</p></li>
<li><p><strong>Costruzione del grafico:</strong> I vettori compressi vengono utilizzati per costruire un grafico HNSW. Poiché i dati sono compressi, il grafo risultante è più piccolo e più veloce da cercare.</p></li>
<li><p><strong>Recupero dei candidati:</strong> Quando viene fornito un vettore di interrogazione, l'algoritmo utilizza i dati compressi per identificare rapidamente un gruppo di vicini candidati dal grafo HNSW.</p></li>
<li><p><strong>(Opzionale) Affinamento dei risultati:</strong> I risultati iniziali dei candidati possono essere raffinati per ottenere una maggiore precisione, in base ai seguenti parametri:</p>
<ul>
<li><p><code translate="no">refine</code>: Controlla se questa fase di affinamento è attivata. Se impostato su <code translate="no">true</code>, il sistema ricalcola le distanze utilizzando rappresentazioni di maggiore precisione o non compresse.</p></li>
<li><p><code translate="no">refine_type</code>: Specifica il livello di precisione dei dati utilizzati durante il raffinamento (ad esempio, SQ6, SQ8, BF16). Una scelta di precisione superiore, come <code translate="no">FP32</code>, può dare risultati più accurati, ma richiede più memoria. Il livello di precisione deve essere superiore alla precisione dell'insieme di dati compresso originale di <code translate="no">sq_type</code>.</p></li>
<li><p><code translate="no">refine_k</code>: Agisce come fattore di ingrandimento. Ad esempio, se il top <em>k</em> è 100 e <code translate="no">refine_k</code> è 2, il sistema classifica nuovamente i 200 candidati migliori e restituisce i 100 migliori, migliorando la precisione complessiva.</p></li>
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
    </button></h2><p>Per costruire un indice <code translate="no">HNSW_SQ</code> su un campo vettoriale in Milvus, utilizzare il metodo <code translate="no">add_index()</code>, specificando i parametri <code translate="no">index_type</code>, <code translate="no">metric_type</code> e altri parametri aggiuntivi per l'indice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_SQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;sq_type&quot;</span>: <span class="hljs-string">&quot;SQ6&quot;</span>, <span class="hljs-comment"># Scalar quantizer type</span>
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">index_type</code>: Il tipo di indice da costruire. In questo esempio, impostare il valore su <code translate="no">HNSW_SQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Il metodo utilizzato per calcolare la distanza tra i vettori. I valori supportati sono <code translate="no">COSINE</code>, <code translate="no">L2</code> e <code translate="no">IP</code>. Per maggiori dettagli, consultare <a href="/docs/it/metric.md">Tipi di metriche</a>.</p></li>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la costruzione dell'indice. Per i dettagli, fare riferimento a <a href="/docs/it/hnsw-sq.md#Index-building-params">Parametri di costruzione dell'indice</a>.</p></li>
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
<li><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la ricerca sull'indice. Per i dettagli, fare riferimento a <a href="/docs/it/hnsw-sq.md#Index-specific-search-params">Parametri di ricerca specifici per l'indice</a>.</li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parametri di costruzione dell'indice</h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">params</code> durante la <a href="/docs/it/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">creazione di un indice</a>.</p>
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
<p>Considerare di diminuire <code translate="no">M</code> quando l'uso della memoria e la velocità di ricerca sono le principali preoccupazioni.</p>
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
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>Specifica il metodo di quantizzazione scalare per la compressione dei vettori. Ogni opzione offre un diverso equilibrio tra compressione e precisione:</p>
<ul>
<li><p><code translate="no">SQ6</code>: Codifica i vettori utilizzando numeri interi a 6 bit.</p></li>
<li><p><code translate="no">SQ8</code>: Codifica i vettori utilizzando numeri interi a 8 bit.</p></li>
<li><p><code translate="no">BF16</code>: Utilizza il formato Bfloat16.</p></li>
<li><p><code translate="no">FP16</code>: Utilizza il formato standard a virgola mobile a 16 bit.</p></li>
</ul></td>
     <td><p><strong>Tipo</strong>: Stringa <strong>Intervallo</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code> ]</p>
<p><strong>Valore predefinito</strong>: <code translate="no">SQ8</code></p></td>
     <td><p>La scelta di <code translate="no">sq_type</code> dipende dalle esigenze specifiche dell'applicazione. Se l'efficienza della memoria è una preoccupazione primaria, <code translate="no">SQ6</code> o <code translate="no">SQ8</code> potrebbero essere adatti. D'altra parte, se l'accuratezza è fondamentale, si potrebbe preferire <code translate="no">BF16</code> o <code translate="no">FP16</code>.</p></td>
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
     <td><p>Determina la precisione dei dati utilizzati per il raffinamento, che deve essere superiore a quella dei vettori compressi (impostata da <code translate="no">sq_type</code>), influenzando sia la precisione dei vettori riordinati sia il loro ingombro in memoria.</p></td>
     <td><p><strong>Tipo</strong>: Stringa <strong>Intervallo</strong>:[ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>Valore predefinito</strong>: Nessuno</p></td>
     <td><p>Utilizzare <code translate="no">FP32</code> per ottenere la massima precisione con un costo di memoria più elevato, oppure <code translate="no">SQ6</code>/<code translate="no">SQ8</code> per una migliore compressione. <code translate="no">BF16</code> e <code translate="no">FP16</code> offrono un'alternativa equilibrata.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parametri di ricerca specifici per l'indice</h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">search_params.params</code> per la <a href="/docs/it/hnsw-sq.md#share-DeFldzMQQoc2W4x2YiIcYUbqnne">ricerca sull'indice</a>.</p>
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
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Fattore di ingrandimento che controlla quanti candidati in più vengono esaminati durante la fase di raffinamento, rispetto ai primi K risultati richiesti.</p></td>
     <td><p><strong>Tipo</strong>: Float <strong>Intervallo</strong>: [1, <em>float_max</em>)</p>
<p><strong>Valore predefinito</strong>: 1</p></td>
     <td><p>Valori più alti di <code translate="no">refine_k</code> possono migliorare il richiamo e l'accuratezza, ma aumentano anche il tempo di ricerca e l'utilizzo delle risorse. Un valore di 1 significa che il processo di raffinamento considera solo i primi K risultati iniziali.</p></td>
   </tr>
</table>
