---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQ combina i grafi Hierarchical Navigable Small World (HNSW) con la
  quantizzazione scalare (SQ), creando un metodo avanzato di indicizzazione
  vettoriale che offre un compromesso controllabile tra dimensioni e precisione.
  Rispetto all’HNSW standard, questo tipo di indice mantiene un’elevata velocità
  di elaborazione delle query, pur comportando un leggero aumento dei tempi di
  costruzione dell’indice.
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
    </button></h1><p><strong>HNSW_SQ</strong> combina i grafi Hierarchical Navigable Small World (HNSW) con la quantizzazione scalare (SQ), creando un metodo avanzato di indicizzazione vettoriale che offre un compromesso controllabile tra dimensioni e precisione. Rispetto <a href="/docs/it/hnsw.md">all’HNSW</a> standard, questo tipo di indice mantiene un’elevata velocità di elaborazione delle query, pur comportando un leggero aumento dei tempi di costruzione dell’indice.</p>
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
    </button></h2><p>HNSW_SQ combina due tecniche di indicizzazione: <strong>HNSW</strong> per una navigazione veloce basata su grafi e <strong>SQ</strong> per una compressione vettoriale efficiente.</p>
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
    </button></h3><p>HNSW costruisce un grafo multistrato in cui ogni nodo corrisponde a un vettore nel set di dati. In questo grafo, i nodi sono collegati in base alla loro somiglianza, consentendo una rapida traversata dello spazio dei dati. La struttura gerarchica permette all’algoritmo di ricerca di restringere il campo dei vicini candidati, accelerando significativamente il processo di ricerca in spazi ad alta dimensionalità.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/hnsw.md">HNSW</a>.</p>
<h3 id="SQ" class="common-anchor-header">SQ<button data-href="#SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>SQ è un metodo per comprimere i vettori rappresentandoli con un numero inferiore di bit. Ad esempio:</p>
<ul>
<li><p><strong>SQ8</strong> utilizza 8 bit, mappando i valori su 256 livelli. Per ulteriori informazioni, consultare <a href="/docs/it/ivf-sq8.md#SQ8">IVF_SQ8</a>.</p></li>
<li><p><strong>SQ6</strong> utilizza 6 bit per rappresentare ciascun valore in virgola mobile, ottenendo 64 livelli discreti.</p></li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" /> 
   <span>Hnsw Sq</span>
  
 </span></p>
<p>Questa riduzione della precisione diminuisce drasticamente l’impronta di memoria e accelera il calcolo, pur conservando la struttura essenziale dei dati.</p>
<h3 id="SQ4U" class="common-anchor-header">SQ4U<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#SQ4U" class="anchor-icon" translate="no">
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
    </button></h3><p>Per scenari che richiedono una velocità di query estrema e un utilizzo minimo di memoria, Milvus introduce l’ <code translate="no">SQ4U</code>, una quantizzazione scalare uniforme a 4 bit. Si tratta di una forma aggressiva di quantizzazione scalare che comprime il valore in virgola mobile di ciascuna dimensione in un intero senza segno <strong>a 4 bit</strong>.</p>
<p>La “U” in SQ4U sta per “Uniforme”. A differenza della quantizzazione scalare non uniforme, che in genere calcola i valori minimi e massimi in modo indipendente per ciascuna dimensione (quantizzazione per dimensione), SQ4U applica una strategia <strong>di quantizzazione uniforme globale</strong>:</p>
<ol>
<li><p><strong>Statistiche globali</strong>: il sistema calcola un <strong>unico</strong> valore minimo <code translate="no">vmin</code> e un <strong>unico</strong> intervallo di valori <code translate="no">vdiff</code> che si applica a <strong>tutte le dimensioni</strong> del vettore (o all’intero segmento vettoriale).</p></li>
<li><p><strong>Mappatura uniforme</strong>: l’intervallo di valori globale viene suddiviso in 16 intervalli uguali. Ogni valore in virgola mobile presente nel vettore, indipendentemente dalla dimensione a cui appartiene, viene mappato su un numero intero a 4 bit (0–15) utilizzando questi parametri condivisi.</p></li>
</ol>
<p><strong>Vantaggi in termini di prestazioni:</strong></p>
<ul>
<li><p><strong>Rapporto di compressione 8x:</strong> riduce le dimensioni di 8 volte rispetto a <code translate="no">FP32</code> e di 2 volte rispetto a <code translate="no">SQ8</code>, riducendo significativamente la pressione sulla larghezza di banda della memoria — spesso il collo di bottiglia nella ricerca vettoriale.</p></li>
<li><p><strong>Ottimizzazione SIMD:</strong> la struttura compatta consente alle moderne CPU (AVX2/AVX-512) di elaborare più dimensioni per ciclo. Fondamentalmente, l’uso di parametri globali elimina la necessità di caricare valori variabili di scala/offset durante il calcolo della distanza, mantenendo la pipeline di istruzioni completamente saturata.</p></li>
<li><p><strong>Efficienza della cache:</strong> dimensioni dei vettori più ridotte consentono di inserire una maggiore quantità di dati nella cache della CPU, riducendo la latenza causata dall’accesso alla memoria.</p></li>
</ul>
<div class="alert note">
<p>Grazie alla condivisione dei parametri globali, SQ4U offre prestazioni ottimali su dati normalizzati o set di dati con distribuzioni dei valori coerenti tra le diverse dimensioni.</p>
</div>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ<button data-href="#HNSW-+-SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_SQ combina i punti di forza di HNSW e SQ per consentire un'efficiente ricerca approssimativa del vicino più prossimo. Ecco come funziona il processo:</p>
<ol>
<li><p><strong>Compressione dei dati:</strong> SQ comprime i vettori utilizzando l’algoritmo di compressione vettoriale ( <code translate="no">sq_type</code>, ad esempio SQ6 o SQ8), riducendo così l’utilizzo di memoria. Questa compressione può ridurre la precisione, ma consente al sistema di gestire set di dati più grandi.</p></li>
<li><p><strong>Costruzione del grafo:</strong> i vettori compressi vengono utilizzati per costruire un grafo HNSW. Poiché i dati sono compressi, il grafo risultante è più piccolo e più veloce da interrogare.</p></li>
<li><p><strong>Recupero dei candidati:</strong> quando viene fornito un vettore di query, l’algoritmo utilizza i dati compressi per identificare rapidamente un insieme di vicini candidati dal grafo HNSW.</p></li>
<li><p><strong>(Opzionale) Affinamento dei risultati:</strong> i risultati iniziali dei candidati possono essere affinati per una maggiore accuratezza, in base ai seguenti parametri:</p>
<ul>
<li><p><code translate="no">refine</code>: Controlla se questa fase di affinamento è attivata. Se impostato su <code translate="no">true</code>, il sistema ricalcola le distanze utilizzando rappresentazioni a maggiore precisione o non compresse.</p></li>
<li><p><code translate="no">refine_type</code>: Specifica il livello di precisione dei dati utilizzati durante il perfezionamento (ad es. SQ6, SQ8, BF16). Una scelta di precisione più elevata, come <code translate="no">FP32</code>, può fornire risultati più accurati ma richiede maggiore memoria. Questa deve superare la precisione del set di dati compressi originale di <code translate="no">sq_type</code>.</p></li>
<li><p><code translate="no">refine_k</code>: Funge da fattore di ingrandimento. Ad esempio, se il valore di top <em>k</em> è 100 e quello di <code translate="no">refine_k</code> è 2, il sistema riclassifica i primi 200 candidati e restituisce i 100 migliori, migliorando l’accuratezza complessiva.</p></li>
</ul></li>
</ol>
<p>Per un elenco completo dei parametri e dei valori validi, consultare <a href="/docs/it/hnsw-sq.md#Index-params">Parametri dell’indice</a>.</p>
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
    </button></h2><p>Per creare un indice di " <code translate="no">HNSW_SQ</code> " su un campo vettoriale in Milvus, utilizzare il metodo " <code translate="no">add_index()</code> ", specificando " <code translate="no">index_type</code>", " <code translate="no">metric_type</code>" e i parametri aggiuntivi per l'indice.</p>
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
<li><p><code translate="no">index_type</code>: Il tipo di indice da creare. In questo esempio, impostare il valore su ` <code translate="no">HNSW_SQ</code>`.</p></li>
<li><p><code translate="no">metric_type</code>: Il metodo utilizzato per calcolare la distanza tra i vettori. I valori supportati includono <code translate="no">COSINE</code>, <code translate="no">L2</code> e <code translate="no">IP</code>. Per ulteriori dettagli, consultare <a href="/docs/it/metric.md">Tipi di metrica</a>.</p></li>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la creazione dell’indice. Per ulteriori dettagli, consultare <a href="/docs/it/hnsw-sq.md#Index-building-params">Parametri di creazione dell’indice</a>.</p></li>
</ul>
<p>Una volta configurati i parametri dell’indice, è possibile creare l’indice utilizzando direttamente il metodo ` <code translate="no">create_index()</code> ` oppure passando i parametri dell’indice nel metodo ` <code translate="no">create_collection</code> `. Per ulteriori dettagli, consultare la sezione <a href="/docs/it/create-collection.md">Creazione di una raccolta</a>.</p>
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
    </button></h2><p>Una volta creato l’indice e inserite le entità, è possibile eseguire ricerche di similarità sull’indice.</p>
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
<li><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la ricerca sull’indice. Per ulteriori dettagli, consultare <a href="/docs/it/hnsw-sq.md#Index-specific-search-params">i parametri di ricerca specifici dell’indice</a>.</li>
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
    </button></h2><p>Questa sezione fornisce una panoramica dei parametri utilizzati per la creazione di un indice e per l'esecuzione di ricerche sull'indice.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parametri di creazione dell'indice<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>La tabella seguente elenca i parametri che è possibile configurare in <code translate="no">params</code> durante <a href="/docs/it/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">la creazione di un indice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Intervallo di valori</p></th>
     <th><p>Suggerimento di ottimizzazione</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Numero massimo di connessioni (o archi) che ogni nodo può avere nel grafo, inclusi sia gli archi in uscita che quelli in entrata.</p><p>Questo parametro influisce direttamente sia sulla costruzione dell'indice che sulla ricerca.</p></td>
     <td><p><strong>Tipo</strong>: Intero</p><p><strong>Intervallo</strong>: [2, 2048]</p><p><strong>Valore predefinito</strong>: <code translate="no">30</code> (fino a 30 spigoli in uscita e 30 in entrata per nodo)</p></td>
     <td><p>Un valore di <code translate="no">M</code> più elevato comporta generalmente <strong>una maggiore precisione</strong>, ma <strong>aumenta il carico di memoria</strong> e <strong>rallenta sia la creazione dell’indice che la ricerca</strong>.</p><p>Si consiglia di aumentare il valore di <code translate="no">M</code> per i set di dati ad alta dimensionalità o quando è fondamentale ottenere un recall elevato.</p><p>Si consiglia di ridurre l’ <code translate="no">M</code> quando l’utilizzo della memoria e la velocità di ricerca sono le priorità principali.</p><p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Numero di vicini candidati presi in considerazione per la connessione durante la creazione dell’indice.</p><p>Per ogni nuovo elemento viene valutato un pool più ampio di candidati, ma il numero massimo di connessioni effettivamente stabilite rimane comunque limitato da ` <code translate="no">M</code>`.</p></td>
     <td><p><strong>Tipo</strong>: Intero</p><p><strong>Intervallo</strong>: [1, <em>int_max</em>]</p><p><strong>Valore predefinito</strong>: <code translate="no">360</code></p></td>
     <td><p>Un valore più elevato di ` <code translate="no">efConstruction</code> ` comporta in genere un <strong>indice più accurato</strong>, poiché vengono esplorati più collegamenti potenziali. Tuttavia, ciò comporta anche <strong>tempi di indicizzazione più lunghi e un maggiore utilizzo di memoria</strong> durante la costruzione.</p><p>Si consiglia di aumentare il valore di ` <code translate="no">efConstruction</code> ` per migliorare la precisione, specialmente in scenari in cui il tempo di indicizzazione è meno critico.</p><p>Si consiglia di ridurre il valore di ` <code translate="no">efConstruction</code> ` per accelerare la creazione dell'indice quando le risorse disponibili sono limitate.</p><p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>Specifica il metodo di quantizzazione scalare per la compressione dei vettori. Ciascuna opzione offre un diverso equilibrio tra compressione e precisione:</p><ul><li><p><code translate="no">SQ4U</code>: Codifica i vettori utilizzando la quantizzazione uniforme a 4 bit. Questa modalità offre la massima velocità e compressione.</p></li><li><p><code translate="no">SQ6</code>: Codifica i vettori utilizzando interi a 6 bit.</p></li><li><p><code translate="no">SQ8</code>: Codifica i vettori utilizzando interi a 8 bit.</p></li><li><p><code translate="no">BF16</code>: Utilizza il formato Bfloat16.</p></li><li><p><code translate="no">FP16</code>: Utilizza il formato standard in virgola mobile a 16 bit.</p></li></ul></td>
     <td><p><strong>Tipo</strong>: Stringa</p><p><strong>Intervallo</strong>: [ <code translate="no">SQ4U</code>, <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code> ]</p><p><strong>Valore predefinito</strong>: <code translate="no">SQ8</code></p></td>
     <td><p>La scelta di <code translate="no">sq_type</code> dipende dalle esigenze specifiche dell'applicazione. <code translate="no">SQ4U</code> viene scelto per ottenere la massima velocità ed efficienza di memoria. <code translate="no">SQ6</code> o <code translate="no">SQ8</code> potrebbero essere adatti per prestazioni equilibrate. D'altra parte, se la precisione è fondamentale, si potrebbero preferire <code translate="no">BF16</code> o <code translate="no">FP16</code>.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Un flag booleano che controlla se applicare una fase di affinamento durante la ricerca. L’affinamento comporta una nuova classificazione dei risultati iniziali calcolando le distanze esatte tra il vettore di query e i candidati.</p></td>
     <td><p><strong>Tipo</strong>: Booleano</p><p><strong>Intervallo</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p><p><strong>Valore predefinito</strong>: <code translate="no">false</code></p></td>
     <td><p>Impostare su <code translate="no">true</code> se è essenziale un'elevata precisione e si può tollerare un tempo di ricerca leggermente più lento. Utilizzare <code translate="no">false</code> se la velocità è una priorità ed è accettabile un leggero compromesso in termini di precisione.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Determina la precisione dei dati utilizzati per il perfezionamento.</p><p>Questa precisione deve essere superiore a quella dei vettori compressi (come impostata da ` <code translate="no">sq_type</code>`), influenzando sia l'accuratezza dei vettori riclassificati sia il loro ingombro di memoria.</p></td>
     <td><p><strong>Tipo</strong>: Stringa</p><p><strong>Intervallo</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p><p><strong>Valore predefinito</strong>: Nessuno</p></td>
     <td><p>Utilizzare <code translate="no">FP32</code> per la massima precisione a un costo di memoria più elevato, oppure <code translate="no">SQ6</code>/<code translate="no">SQ8</code> per una migliore compressione. <code translate="no">BF16</code> e <code translate="no">FP16</code> offrono un'alternativa equilibrata.</p></td>
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
    </button></h3><p>La tabella seguente elenca i parametri configurabili in <code translate="no">search_params.params</code> durante <a href="/docs/it/hnsw-sq.md#Search-on-index">la ricerca nell’indice</a>. Le impostazioni del server possono sovrascrivere i valori predefiniti per i parametri omessi.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Intervallo di valori</p></th>
     <th><p>Suggerimento di ottimizzazione</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Controlla l'ampiezza della ricerca durante il recupero del vicino più prossimo. Determina quanti nodi vengono visitati e valutati come potenziali vicini più prossimi. </p><p>Questo parametro influisce solo sul processo di ricerca e si applica esclusivamente allo strato inferiore del grafico.</p></td>
     <td><p><strong>Tipo</strong>: Intero</p><p><strong>Intervallo</strong>: [1, <em>int_max</em>]</p><p><strong>Valore predefinito</strong>: <code translate="no">max(limit, 16)</code> per la ricerca kNN ordinaria; <code translate="no">512</code> per la ricerca per intervallo.</p><p>Per la ricerca kNN ordinaria, un valore esplicito di <code translate="no">ef</code> deve essere maggiore o uguale a <code translate="no">limit</code> (il numero di vicini più prossimi da restituire).</p></td>
     <td><p>Un valore maggiore di <code translate="no">ef</code> comporta generalmente <strong>una maggiore precisione di ricerca</strong>, poiché vengono presi in considerazione più potenziali vicini. Tuttavia, ciò <strong>aumenta</strong> anche <strong>il tempo di ricerca</strong>.</p><p>Si consiglia di aumentare il valore di ` <code translate="no">ef</code> ` quando è fondamentale ottenere un recall elevato e la velocità di ricerca è meno importante.</p><p>Si consiglia di ridurre il valore di ` <code translate="no">ef</code> ` per dare priorità a ricerche più veloci, specialmente in scenari in cui è accettabile una leggera riduzione della precisione.</p><p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Il fattore di ingrandimento che controlla il numero di candidati aggiuntivi esaminati durante la fase di affinamento, rispetto ai primi K risultati richiesti.</p></td>
     <td><p><strong>Tipo</strong>: Float</p><p><strong>Intervallo</strong>: [1, <em>float_max</em>)</p><p><strong>Valore predefinito</strong>: 1</p></td>
     <td><p>Valori più elevati di ` <code translate="no">refine_k</code> ` possono migliorare il richiamo e l’accuratezza, ma aumentano anche il tempo di ricerca e l’utilizzo delle risorse. Un valore pari a 1 indica che il processo di affinamento considera solo i primi K risultati iniziali.</p></td>
   </tr>
</table>
