---
id: gpu-ivf-pq.md
title: GPU_IVF_PQ
summary: >-
  L'indice GPU_IVF_PQ si basa sul concetto di IVF_PQ combinando il clustering
  inverso dei file con la quantizzazione del prodotto (PQ), che scompone i
  vettori ad alta dimensione in sottospazi più piccoli e li quantizza per
  ottenere ricerche di similarità efficienti. Progettato esclusivamente per
  ambienti GPU, GPU_IVF_PQ sfrutta l'elaborazione in parallelo per accelerare i
  calcoli e gestire efficacemente dati vettoriali su larga scala. Per ulteriori
  informazioni sui concetti fondamentali, consultare IVF_PQ.
---
<h1 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indice <strong>GPU_IVF_PQ</strong> si basa sul concetto di <strong>IVF_PQ</strong> combinando il clustering inverso dei file con la quantizzazione del prodotto (PQ), che scompone i vettori ad alta dimensione in sottospazi più piccoli e li quantizza per ottenere ricerche di similarità efficienti. Progettato esclusivamente per ambienti GPU, GPU_IVF_PQ sfrutta l'elaborazione in parallelo per accelerare i calcoli e gestire efficacemente dati vettoriali su larga scala. Per ulteriori informazioni sui concetti fondamentali, consultare <a href="/docs/it/ivf-pq.md">IVF_PQ</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Creare un indice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Per costruire un indice <code translate="no">GPU_IVF_PQ</code> su un campo vettoriale in Milvus, usare il metodo <code translate="no">add_index()</code>, specificando i parametri <code translate="no">index_type</code>, <code translate="no">metric_type</code> e altri parametri aggiuntivi per l'indice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">index_type</code>: Il tipo di indice da costruire. In questo esempio, impostare il valore su <code translate="no">GPU_IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Il metodo utilizzato per calcolare la distanza tra i vettori. I valori supportati sono <code translate="no">COSINE</code>, <code translate="no">L2</code> e <code translate="no">IP</code>. Per maggiori dettagli, consultare <a href="/docs/it/metric.md">Tipi di metriche</a>.</p></li>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la creazione dell'indice.</p>
<ul>
<li><code translate="no">m</code>: Numero di sottovettori in cui dividere il vettore.</li>
</ul>
<p>Per conoscere i parametri di costruzione disponibili per l'indice <code translate="no">GPU_IVF_PQ</code>, fare riferimento a <a href="/docs/it/gpu-ivf-pq.md#Index-building-params">Parametri di costruzione dell'indice</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la ricerca sull'indice.</p>
<ul>
<li><code translate="no">nprobe</code>: Numero di cluster da ricercare.</li>
</ul>
<p>Per conoscere altri parametri di ricerca disponibili per l'indice <code translate="no">GPU_IVF_PQ</code>, fare riferimento a <a href="/docs/it/gpu-ivf-pq.md#Index-specific-search-params">Parametri di ricerca specifici dell'indice</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parametri di costruzione dell'indice</h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">params</code> quando si <a href="/docs/it/gpu-ivf-pq.md#Build-index">costruisce un indice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore Intervallo</p></th>
     <th><p>Suggerimento per la messa a punto</p></th>
   </tr>
   <tr>
     <td><p>FIV</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Numero di cluster da creare con l'algoritmo k-means durante la creazione dell'indice.</p></td>
     <td><p><strong>Tipo</strong>: Intero <strong>Intervallo</strong>: [1, 65536]</p>
<p><strong>Valore predefinito</strong>: <code translate="no">128</code></p></td>
     <td><p>Valori maggiori di <code translate="no">nlist</code> migliorano il richiamo creando cluster più raffinati, ma aumentano il tempo di costruzione dell'indice. Ottimizzare in base alle dimensioni del set di dati e alle risorse disponibili. Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Numero di sottovettori (usati per la quantizzazione) in cui dividere ogni vettore ad alta dimensionalità durante il processo di quantizzazione.</p></td>
     <td><p><strong>Tipo</strong>: Intero <strong>Intervallo</strong>: [1, 65536]</p>
<p><strong>Valore predefinito</strong>: Nessuno</p></td>
     <td><p>Un valore più alto di <code translate="no">m</code> può migliorare l'accuratezza, ma aumenta anche la complessità computazionale e l'utilizzo di memoria. <code translate="no">m</code> deve essere un divisore della dimensione del vettore<em>(D</em>) per garantire una corretta decomposizione. Un valore comunemente consigliato è <em>m = D/2</em>.</p>
<p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [D/8, D].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Il numero di bit utilizzati per rappresentare l'indice del centroide di ciascun sottovettore nella forma compressa. Determina direttamente la dimensione di ciascun codebook, che conterrà $2^{\textit{nbits}}$ centroidi. Ad esempio, se <code translate="no">nbits</code> è impostato su 8, ogni sottovettore sarà rappresentato da un indice del centroide a 8 bit. Ciò consente di avere $2^8$ (256) possibili centroidi nel codebook per quel sottovettore.</p></td>
     <td><p><strong>Tipo</strong>: <strong>Intervallo di</strong> valori: [1, 64]</p>
<p><strong>Valore predefinito</strong>: <code translate="no">8</code></p></td>
     <td><p>Un valore più alto di <code translate="no">nbits</code> consente di avere codebook più ampi, che potenzialmente portano a rappresentazioni più accurate dei vettori originali. Tuttavia, significa anche utilizzare più bit per memorizzare ciascun indice, con conseguente minore compressione. Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>Decide se memorizzare nella cache il set di dati originale nella memoria della GPU. Valori possibili:</p>
<ul>
<li><p><code translate="no">"true"</code>: Mette in cache il set di dati originale per migliorare il richiamo affinando i risultati della ricerca.</p></li>
<li><p><code translate="no">"false"</code>: Non memorizza nella cache il set di dati originale per risparmiare memoria della GPU.</p></li>
</ul></td>
     <td><p><strong>Tipo</strong>: Stringa <strong>Intervallo</strong>: [<code translate="no">"true"</code>, <code translate="no">"false"</code>]</p>
<p><strong>Valore predefinito</strong>: <code translate="no">"false"</code></p></td>
     <td><p>L'impostazione di <code translate="no">"true"</code> migliora il richiamo raffinando i risultati della ricerca, ma utilizza più memoria della GPU. Impostando <code translate="no">"false"</code> si conserva la memoria della GPU.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parametri di ricerca specifici dell'indice</h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">search_params.params</code> durante la <a href="/docs/it/gpu-ivf-pq.md#Search-on-index">ricerca sull'indice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Intervallo di valori</p></th>
     <th><p>Suggerimento per la messa a punto</p></th>
   </tr>
   <tr>
     <td><p>FIV</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Numero di cluster in cui cercare i candidati.</p></td>
     <td><p><strong>Tipo</strong>: Intero <strong>Intervallo</strong>: [1, <em>nlist</em>]</p>
<p><strong>Valore predefinito</strong>: <code translate="no">8</code></p></td>
     <td><p>Valori più alti consentono di cercare più cluster, migliorando il richiamo grazie all'espansione dell'ambito di ricerca, ma al costo di una maggiore latenza della query. Impostare <code translate="no">nprobe</code> in proporzione a <code translate="no">nlist</code> per bilanciare velocità e precisione.</p>
<p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [1, nlist].</p></td>
   </tr>
</table>
