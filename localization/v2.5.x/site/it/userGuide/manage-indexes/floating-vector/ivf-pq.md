---
id: ivf-pq.md
title: IVF_PQ
summary: >-
  L'indice IVF_PQ è un algoritmo di indicizzazione basato sulla quantizzazione
  per la ricerca approssimata dei vicini in spazi ad alta dimensione. Sebbene
  non sia veloce come alcuni metodi basati sui grafi, IVF_PQ richiede spesso una
  quantità di memoria significativamente inferiore, il che lo rende una scelta
  pratica per i grandi insiemi di dati.
---
<h1 id="IVFPQ" class="common-anchor-header">IVF_PQ<button data-href="#IVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indice <strong>IVF_PQ</strong> è un algoritmo di indicizzazione <strong>basato sulla quantizzazione</strong> per la ricerca approssimata dei vicini in spazi ad alta dimensione. Sebbene non sia veloce come alcuni metodi basati sui grafi, <strong>IVF_PQ</strong> richiede spesso una quantità di memoria significativamente inferiore, il che lo rende una scelta pratica per i grandi insiemi di dati.</p>
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
    </button></h2><p><strong>IVF_PQ</strong> è l'acronimo di <strong>Inverted File with Product Quantization (File invertito con quantizzazione del prodotto</strong>), un approccio ibrido che combina indicizzazione e compressione per una ricerca e un recupero vettoriale efficienti. Sfrutta due componenti fondamentali: <strong>Inverted File (IVF)</strong> e <strong>Product Quantization (PQ)</strong>.</p>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>L'IVF è come la creazione di un indice in un libro. Invece di esaminare ogni pagina (o, nel nostro caso, ogni vettore), si cercano parole chiave specifiche (cluster) nell'indice per trovare rapidamente le pagine (vettori) pertinenti. Nel nostro scenario, i vettori sono raggruppati in cluster e l'algoritmo cercherà all'interno di alcuni cluster che sono vicini al vettore della query.</p>
<p>Ecco come funziona:</p>
<ol>
<li><p><strong>Raggruppamento:</strong> Il set di dati vettoriali viene suddiviso in un numero specifico di cluster, utilizzando un algoritmo di clustering come k-means. Ogni cluster ha un centroide (un vettore rappresentativo del cluster).</p></li>
<li><p><strong>Assegnazione:</strong> Ogni vettore viene assegnato al cluster il cui centroide gli è più vicino.</p></li>
<li><p><strong>Indice invertito:</strong> Viene creato un indice che mappa ogni centroide del cluster con l'elenco dei vettori assegnati a quel cluster.</p></li>
<li><p><strong>Ricerca:</strong> Quando si cercano i vicini, l'algoritmo di ricerca confronta il vettore della query con i centroidi dei cluster e seleziona i cluster più promettenti. La ricerca viene quindi ristretta ai vettori all'interno dei cluster selezionati.</p></li>
</ol>
<p>Per saperne di più sui dettagli tecnici, consultare <a href="/docs/it/ivf-flat.md">FIV_FLAT</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p>La<strong>quantizzazione del prodotto (PQ)</strong> è un metodo di compressione per vettori ad alta dimensione che riduce in modo significativo i requisiti di memorizzazione, consentendo al contempo operazioni di ricerca di somiglianza veloci.</p>
<p>Il processo di PQ prevede queste fasi chiave:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-1.png" alt="Ivf Pq 1" class="doc-image" id="ivf-pq-1" />
   </span> <span class="img-wrapper"> <span>Ivf Pq 1</span> </span></p>
<ol>
<li><p><strong>Decomposizione della dimensione</strong>: L'algoritmo inizia con la decomposizione di ogni vettore ad alta dimensione in <code translate="no">m</code> sottovettori di dimensioni uguali. Questa decomposizione trasforma lo spazio D-dimensionale originale in <code translate="no">m</code> sottospazi disgiunti, dove ogni sottospazio contiene <em>D/m</em> dimensioni. Il parametro <code translate="no">m</code> controlla la granularità della decomposizione e influenza direttamente il rapporto di compressione.</p></li>
<li><p><strong>Generazione del codebook del sottospazio</strong>: All'interno di ogni sottospazio, l'algoritmo applica il <a href="https://en.wikipedia.org/wiki/K-means_clustering">clustering k-means</a> per apprendere un insieme di vettori rappresentativi (centroidi). Questi centroidi formano collettivamente un codebook per quel sottospazio. Il numero di centroidi in ogni codebook è determinato dal parametro <code translate="no">nbits</code>, dove ogni codebook contiene <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits centroidi. Ad esempio, se</span></span></span></span></span></span></span></span></span> <code translate="no">nbits = 8</code>, ogni codebook conterrà 256 centroidi. A ogni centroide viene assegnato un indice unico con <code translate="no">nbits</code> bit.</p></li>
<li><p><strong>Quantizzazione</strong><strong>del vettore</strong>: Per ogni sottovettore del vettore originale, PQ identifica il centroide più vicino all'interno del sottospazio corrispondente utilizzando un tipo di metrica specifico. Questo processo mappa efficacemente ogni sottovettore al suo vettore rappresentativo più vicino nel codebook. Invece di memorizzare le coordinate complete del sottovettore, viene conservato solo l'indice del centroide corrispondente.</p></li>
<li><p><strong>Rappresentazione compressa</strong>: La rappresentazione compressa finale consiste in <code translate="no">m</code> indici, uno per ogni sottospazio, denominati collettivamente <strong>codici PQ</strong>. Questa codifica riduce il requisito di memorizzazione da <em>D × 32</em> bit (assumendo numeri in virgola mobile a 32 bit) a <em>m</em> × <em>n bit</em>, ottenendo una compressione sostanziale e preservando la capacità di approssimare le distanze vettoriali.</p></li>
</ol>
<p>Per maggiori dettagli sulla regolazione e l'ottimizzazione dei parametri, consultare la sezione <a href="/docs/it/ivf-pq.md#Index-params">Parametri dell'indice</a>.</p>
<div class="alert note">
<p>Si consideri un vettore con <em>D = 128</em> dimensioni che utilizza numeri in virgola mobile a 32 bit. Con i parametri PQ <em>m = 64</em> (sottovettori) e <em>nbit = 8</em> (quindi <em>k =</em> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">282^8</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> 8</span></span></span></span></span></span></span></span></span> <em>= 256</em> centroidi per sottospazio), possiamo confrontare i requisiti di memorizzazione:</p>
<ul>
<li><p>Vettore originale: 128 dimensioni × 32 bit = 4.096 bit</p></li>
<li><p>Vettore compresso PQ: 64 sottovettori × 8 bit = 512 bit</p></li>
</ul>
<p>Ciò rappresenta una riduzione di 8 volte dei requisiti di memorizzazione.</p>
</div>
<p><strong>Calcolo della distanza con PQ</strong></p>
<p>Quando si esegue una ricerca di similarità con un vettore di query, PQ consente di calcolare in modo efficiente la distanza attraverso i seguenti passaggi:</p>
<ol>
<li><p><strong>Preelaborazione della query</strong></p>
<ul>
<li><p>Il vettore di query viene scomposto in <code translate="no">m</code> sottovettori, che corrispondono alla struttura di decomposizione originale di PQ.</p></li>
<li><p>Per ogni sottovettore di query e il suo codebook corrispondente (contenente <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits centroidi), si calcolano e si memorizzano le distanze da tutti i centroidi.</span></span></span></span></span></span></span></span></span> </p></li>
<li><p>Questo genera <code translate="no">m</code> tabelle di ricerca, dove ogni tabella contiene <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits di distanze.</span></span></span></span></span></span></span></span></span> </p></li>
</ul></li>
<li><p><strong>Approssimazione della distanza</strong></p>
<p>Per ogni vettore di database rappresentato da codici PQ, la sua distanza approssimativa dal vettore di interrogazione viene calcolata come segue:</p>
<ul>
<li><p>Per ciascuno dei <code translate="no">m</code> sottovettori, recuperare la distanza precalcolata dalla tabella di ricerca corrispondente utilizzando l'indice del centroide memorizzato.</p></li>
<li><p>Sommare queste distanze <code translate="no">m</code> per ottenere la distanza approssimativa basata su un tipo di metrica specifica (ad esempio, la distanza euclidea).</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-2.png" alt="Ivf Pq 2" class="doc-image" id="ivf-pq-2" />
   </span> <span class="img-wrapper"> <span>Ivf Pq 2</span> </span></p>
<h3 id="IVF-+-PQ" class="common-anchor-header">FIV + PQ</h3><p>L'indice <strong>IVF_PQ</strong> combina i punti di forza di <strong>IVF</strong> e <strong>PQ</strong> per accelerare le ricerche. Il processo funziona in due fasi:</p>
<ol>
<li><p><strong>Filtraggio grossolano con IVF</strong>: IVF suddivide lo spazio vettoriale in cluster, riducendo l'ambito di ricerca. Invece di valutare l'intero set di dati, l'algoritmo si concentra solo sui cluster più vicini al vettore di interrogazione.</p></li>
<li><p><strong>Confronto a grana fine con PQ</strong>: all'interno dei cluster selezionati, PQ utilizza rappresentazioni vettoriali compresse e quantizzate per calcolare rapidamente distanze approssimate.</p></li>
</ol>
<p>Le prestazioni dell'indice <strong>IVF_PQ</strong> sono influenzate in modo significativo dai parametri che controllano gli algoritmi IVF e PQ. La regolazione di questi parametri è fondamentale per ottenere i risultati ottimali per un determinato set di dati e una determinata applicazione. Informazioni più dettagliate su questi parametri e sulla loro messa a punto sono disponibili in <a href="/docs/it/ivf-pq.md#Index-params">Parametri dell'indice</a>.</p>
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
    </button></h2><p>Per costruire un indice <code translate="no">IVF_PQ</code> su un campo vettoriale in Milvus, utilizzare il metodo <code translate="no">add_index()</code>, specificando i parametri <code translate="no">index_type</code>, <code translate="no">metric_type</code> e i parametri aggiuntivi per l'indice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">index_type</code>: Il tipo di indice da costruire. In questo esempio, impostare il valore su <code translate="no">IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Il metodo utilizzato per calcolare la distanza tra i vettori. I valori supportati sono <code translate="no">COSINE</code>, <code translate="no">L2</code> e <code translate="no">IP</code>. Per maggiori dettagli, consultare <a href="/docs/it/metric.md">Tipi di metriche</a>.</p></li>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la creazione dell'indice.</p>
<ul>
<li><code translate="no">m</code>: Numero di sottovettori in cui dividere il vettore.</li>
</ul>
<p>Per conoscere i parametri di costruzione disponibili per l'indice <code translate="no">IVF_PQ</code>, fare riferimento a <a href="/docs/it/ivf-pq.md#Index-building-params">Parametri di costruzione dell'indice</a>.</p></li>
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
<p>Per conoscere altri parametri di ricerca disponibili per l'indice <code translate="no">IVF_PQ</code>, fare riferimento a <a href="/docs/it/ivf-pq.md#Index-specific-search-params">Parametri di ricerca specifici dell'indice</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parametri di costruzione dell'indice</h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">params</code> quando si <a href="/docs/it/ivf-pq.md#Build-index">costruisce un indice</a>.</p>
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
     <td><p><strong>Tipo</strong>: Intero <strong>Intervallo</strong>: [1, 65536]</p><p><strong>Valore predefinito</strong>: <code translate="no">128</code></p></td>
     <td><p>Valori maggiori di <code translate="no">nlist</code> migliorano il richiamo creando cluster più raffinati, ma aumentano il tempo di costruzione dell'indice. Ottimizzare in base alle dimensioni del set di dati e alle risorse disponibili. Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Numero di sottovettori (usati per la quantizzazione) in cui dividere ogni vettore ad alta dimensionalità durante il processo di quantizzazione.</p></td>
     <td><p><strong>Tipo</strong>: Intero <strong>Intervallo</strong>: [1, 65536]</p><p><strong>Valore predefinito</strong>: Nessuno</p></td>
     <td><p>Un valore più alto di <code translate="no">m</code> può migliorare l'accuratezza, ma aumenta anche la complessità computazionale e l'utilizzo di memoria. <code translate="no">m</code> deve essere un divisore della dimensione del vettore<em>(D</em>) per garantire una corretta decomposizione. Un valore comunemente consigliato è <em>m = D/2</em>.</p><p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [D/8, D].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Il numero di bit utilizzati per rappresentare l'indice del centroide di ciascun sottovettore nella forma compressa. Determina direttamente la dimensione di ciascun codebook. Ogni codebook conterrà $2^{\textit{nbits}}$ centroidi. Ad esempio, se <code translate="no">nbits</code> è impostato su 8, ogni sottovettore sarà rappresentato da un indice del centroide a 8 bit. Ciò consente di avere $2^8$ (256) possibili centroidi nel codebook per quel sottovettore.</p></td>
     <td><p><strong>Tipo</strong>: <strong>Intervallo di</strong> valori: [1, 64]</p><p><strong>Valore predefinito</strong>: <code translate="no">8</code></p></td>
     <td><p>Un valore più alto di <code translate="no">nbits</code> consente di avere codebook più ampi, che potenzialmente portano a rappresentazioni più accurate dei vettori originali. Tuttavia, significa anche utilizzare più bit per memorizzare ciascun indice, con conseguente minore compressione. Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [1, 16].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parametri di ricerca specifici per gli indici</h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">search_params.params</code> durante la <a href="/docs/it/ivf-pq.md#Search-on-index">ricerca sull'indice</a>.</p>
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
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Numero di cluster in cui cercare i candidati.</p></td>
     <td><p><strong>Tipo</strong>: Intero <strong>Intervallo</strong>: [1, <em>nlist</em>]</p><p><strong>Valore predefinito</strong>: <code translate="no">8</code></p></td>
     <td><p>Valori più alti consentono di cercare più cluster, migliorando il richiamo grazie all'espansione dell'ambito di ricerca, ma al costo di una maggiore latenza della query. Impostare <code translate="no">nprobe</code> in modo proporzionale a <code translate="no">nlist</code> per bilanciare velocità e precisione.</p><p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [1, nlist].</p></td>
   </tr>
</table>
