---
id: ivf-sq8.md
title: FIV_SQ8
summary: >-
  L'indice IVF_SQ8 è un algoritmo di indicizzazione basato sulla quantizzazione,
  progettato per affrontare le sfide della ricerca di similarità su larga scala.
  Questo tipo di indice consente di ottenere ricerche più rapide con un ingombro
  di memoria molto più ridotto rispetto ai metodi di ricerca esaustiva.
---
<h1 id="IVFSQ8" class="common-anchor-header">FIV_SQ8<button data-href="#IVFSQ8" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indice <strong>IVF_SQ8</strong> è un algoritmo di indicizzazione <strong>basato sulla quantizzazione</strong>, progettato per affrontare le sfide della ricerca di similarità su larga scala. Questo tipo di indice consente di ottenere ricerche più rapide con un ingombro di memoria molto più ridotto rispetto ai metodi di ricerca esaustiva.</p>
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
    </button></h2><p>L'indice IVF_SQ8 si basa su due componenti chiave:</p>
<ul>
<li><p><strong>File invertito (IVF)</strong>: Organizza i dati in cluster, consentendo all'algoritmo di ricerca di concentrarsi solo sui sottoinsiemi di vettori più rilevanti.</p></li>
<li><p><strong>Quantizzazione scalare (SQ8)</strong>: Comprime i vettori in una forma più compatta, riducendo drasticamente l'uso della memoria e mantenendo una precisione sufficiente per un rapido calcolo della similarità.</p></li>
</ul>
<h3 id="IVF" class="common-anchor-header">FIV</h3><p>L'IVF è come la creazione di un indice in un libro. Invece di esaminare ogni pagina (o, nel nostro caso, ogni vettore), si cercano parole chiave specifiche (cluster) nell'indice per trovare rapidamente le pagine (vettori) pertinenti. Nel nostro scenario, i vettori sono raggruppati in cluster e l'algoritmo cercherà all'interno di alcuni cluster che sono vicini al vettore della query.</p>
<p>Ecco come funziona:</p>
<ol>
<li><p><strong>Raggruppamento:</strong> Il set di dati vettoriali viene suddiviso in un numero specifico di cluster, utilizzando un algoritmo di clustering come k-means. Ogni cluster ha un centroide (un vettore rappresentativo del cluster).</p></li>
<li><p><strong>Assegnazione:</strong> Ogni vettore viene assegnato al cluster il cui centroide gli è più vicino.</p></li>
<li><p><strong>Indice invertito:</strong> Viene creato un indice che mappa ogni centroide del cluster con l'elenco dei vettori assegnati a quel cluster.</p></li>
<li><p><strong>Ricerca:</strong> Quando si cercano i vicini, l'algoritmo di ricerca confronta il vettore della query con i centroidi dei cluster e seleziona i cluster più promettenti. La ricerca viene quindi ristretta ai vettori all'interno dei cluster selezionati.</p></li>
</ol>
<p>Per saperne di più sui dettagli tecnici, consultare <a href="/docs/it/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="SQ8" class="common-anchor-header">SQ8</h3><p>La quantizzazione scalare (SQ) è una tecnica utilizzata per ridurre le dimensioni dei vettori ad alta dimensionalità sostituendo i loro valori con rappresentazioni più piccole e compatte. La variante <strong>SQ8</strong> utilizza numeri interi a 8 bit invece dei tipici numeri in virgola mobile a 32 bit per memorizzare ogni valore di dimensione di un vettore. Questo riduce notevolmente la quantità di memoria necessaria per memorizzare i dati.</p>
<p>Ecco come funziona SQ8:</p>
<ol>
<li><p><strong>Identificazione dell'intervallo:</strong> Innanzitutto, si identificano i valori minimi e massimi all'interno del vettore. Questo intervallo definisce i limiti per la quantizzazione.</p></li>
<li><p><strong>Normalizzazione:</strong> Normalizzare i valori del vettore in un intervallo compreso tra 0 e 1 utilizzando la formula:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>normalized_value</mtext><mo>=</mo><mfrac><mrow><mtext>value</mtext><mo>−</mo><mtext>min</mtext></mrow><mrow><mtext>max</mtext><mo>−</mo><mtext>min</mtext></mrow></mfrac></mrow><annotation encoding="application/x-tex">\text{normalized\_value} = \frac{\text{value} - \text{min}}{\text{max} - \text{min}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord text"><span class="mord">normalized_value</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1408em;vertical-align:-0.7693em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">max</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">value</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.7693em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Questo assicura che tutti i valori siano mappati in modo proporzionale all'interno di un intervallo standardizzato, preparandoli per la compressione.</p></li>
<li><p><strong>Compressione a 8 bit:</strong> Moltiplicare il valore normalizzato per 255 (il valore massimo per un intero a 8 bit) e arrotondare il risultato al numero intero più vicino. In questo modo si comprime ogni valore in una rappresentazione a 8 bit.</p></li>
</ol>
<p>Supponiamo di avere un valore di dimensione pari a 1,2, con un valore minimo di -1,7 e un valore massimo di 2,3. La figura seguente mostra come SQ8 viene applicato per convertire un valore float32 in un intero int8.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ivf-sq8.png" alt="Ivf Sq8" class="doc-image" id="ivf-sq8" />
   </span> <span class="img-wrapper"> <span>FIV + SQ8</span> </span></p>
<h3 id="IVF-+-SQ8" class="common-anchor-header">FIV + SQ8</h3><p>L'indice IVF_SQ8 combina IVF e SQ8 per eseguire in modo efficiente le ricerche di similarità:</p>
<ol>
<li><p><strong>IVF restringe l'ambito di ricerca</strong>: Il set di dati viene suddiviso in cluster e quando viene emessa una query, IVF confronta prima la query con i centroidi dei cluster, selezionando i cluster più rilevanti.</p></li>
<li><p><strong>SQ8 accelera il calcolo delle distanze</strong>: All'interno dei cluster selezionati, SQ8 comprime i vettori in numeri interi a 8 bit, riducendo l'uso della memoria e accelerando il calcolo delle distanze.</p></li>
</ol>
<p>Utilizzando la FIV per focalizzare la ricerca e SQ8 per accelerare i calcoli, FIV_SQ8 consente di ottenere tempi di ricerca rapidi ed efficienza di memoria.</p>
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
    </button></h2><p>Per costruire un indice <code translate="no">IVF_SQ8</code> su un campo vettoriale in Milvus, utilizzare il metodo <code translate="no">add_index()</code>, specificando i parametri <code translate="no">index_type</code>, <code translate="no">metric_type</code> e altri parametri aggiuntivi per l'indice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_SQ8&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters to create using the k-means algorithm during index building</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">index_type</code>: Il tipo di indice da costruire. In questo esempio, impostare il valore su <code translate="no">IVF_SQ8</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Il metodo utilizzato per calcolare la distanza tra i vettori. I valori supportati sono <code translate="no">COSINE</code>, <code translate="no">L2</code> e <code translate="no">IP</code>. Per maggiori dettagli, consultare <a href="/docs/it/metric.md">Tipi di metriche</a>.</p></li>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la creazione dell'indice.</p>
<ul>
<li><code translate="no">nlist</code>: Numero di cluster da creare con l'algoritmo k-means durante la costruzione dell'indice.</li>
</ul>
<p>Per ulteriori informazioni sui parametri di costruzione disponibili per l'indice <code translate="no">IVF_SQ8</code>, fare riferimento a <a href="/docs/it/ivf-sq8.md#share-BwprdWFCjoMBtMxorO0cWrUPnjb">Parametri di costruzione dell'indice</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Number of clusters to search for candidates</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la ricerca sull'indice.</p>
<ul>
<li><code translate="no">nprobe</code>: Numero di cluster in cui cercare i candidati.</li>
</ul>
<p>Per conoscere altri parametri di ricerca disponibili per l'indice <code translate="no">IVF_SQ8</code>, fare riferimento a <a href="/docs/it/ivf-sq8.md#share-PJhqdqNaNodKiexm6F1cD2IInbe">Parametri di ricerca specifici per l'indice</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parametri di costruzione dell'indice</h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">params</code> quando si <a href="/docs/it/ivf-sq8.md#share-X9Y9dTuhDohRRBxSvzBcXmIEnu4">costruisce un indice</a>.</p>
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
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parametri di ricerca specifici per l'indice</h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">search_params.params</code> durante la <a href="/docs/it/ivf-sq8.md#share-TI73dmWBOoEnocxQ8H7clSYUnLg">ricerca sull'indice</a>.</p>
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
     <td><p><strong>Tipo</strong>: Intero <strong>Intervallo</strong>: [1, <em>nlist</em>]</p>
<p><strong>Valore predefinito</strong>: <code translate="no">8</code></p></td>
     <td><p>Valori più alti consentono di cercare più cluster, migliorando il richiamo grazie all'espansione dell'ambito di ricerca, ma al costo di una maggiore latenza della query. Impostare <code translate="no">nprobe</code> in proporzione a <code translate="no">nlist</code> per bilanciare velocità e precisione.</p>
<p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [1, nlist].</p></td>
   </tr>
</table>
