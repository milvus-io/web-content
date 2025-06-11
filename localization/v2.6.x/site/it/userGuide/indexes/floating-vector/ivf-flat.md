---
id: ivf-flat.md
title: IVF_FLAT
summary: >-
  L'indice IVF_FLAT è un algoritmo di indicizzazione che può migliorare le
  prestazioni di ricerca dei vettori in virgola mobile.
---
<h1 id="IVFFLAT" class="common-anchor-header">IVF_FLAT<button data-href="#IVFFLAT" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indice <strong>IVF_FLAT</strong> è un algoritmo di indicizzazione che può migliorare le prestazioni di ricerca per i vettori in virgola mobile.</p>
<p>Questo tipo di indice è ideale per i dataset di grandi dimensioni che richiedono risposte rapide alle query e un'elevata precisione, soprattutto quando il clustering del dataset può ridurre lo spazio di ricerca e la memoria disponibile è sufficiente per memorizzare i dati del cluster.</p>
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
    </button></h2><p>Il termine <strong>IVF_FLAT</strong> è l'acronimo di <strong>Inverted File Flat</strong>, che racchiude l'approccio a doppio livello all'indicizzazione e alla ricerca di vettori in virgola mobile:</p>
<ul>
<li><p><strong>File invertito (IVF):</strong> Si riferisce al raggruppamento dello spazio vettoriale in regioni gestibili utilizzando il <a href="https://en.wikipedia.org/wiki/K-means_clustering">clustering k-means</a>. Ogni cluster è rappresentato da un <strong>centroide</strong>, che serve come punto di riferimento per i vettori al suo interno.</p></li>
<li><p><strong>Flat:</strong> indica che all'interno di ogni cluster i vettori sono memorizzati nella loro forma originale (struttura piatta), senza alcuna compressione o quantizzazione, per un calcolo preciso delle distanze.</p></li>
</ul>
<p>La figura seguente ne illustra il funzionamento:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/IVF-FLAT-workflow.png" alt="IVF FLAT Workflow" class="doc-image" id="ivf-flat-workflow" />
   </span> <span class="img-wrapper"> <span>Flusso di lavoro IVF FLAT</span> </span></p>
<p>Questo metodo di indicizzazione accelera il processo di ricerca, ma presenta un potenziale inconveniente: il candidato trovato come il più vicino all'incorporazione interrogata potrebbe non essere quello esattamente più vicino. Questo può accadere se l'embedding più vicino all'embedding della query risiede in un cluster diverso da quello selezionato in base al centroide più vicino (si veda la visualizzazione qui sotto).</p>
<p>Per risolvere questo problema, <strong>IVF_FLAT</strong> fornisce due iperparametri che possono essere regolati:</p>
<ul>
<li><p><code translate="no">nlist</code>: Specifica il numero di partizioni da creare con l'algoritmo k-means.</p></li>
<li><p><code translate="no">nprobe</code>: Specifica il numero di partizioni da considerare durante la ricerca dei candidati.</p></li>
</ul>
<p>Se impostiamo <code translate="no">nprobe</code> a 3 invece che a 1, otterremo il seguente risultato:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/IVF-FLAT-workflow-2.png" alt="IVF FLAT Workflow 2" class="doc-image" id="ivf-flat-workflow-2" />
   </span> <span class="img-wrapper"> <span>Flusso di lavoro FIV FLAT 2</span> </span></p>
<p>Aumentando il valore di <code translate="no">nprobe</code>, è possibile includere più partizioni nella ricerca, il che può aiutare a garantire che l'incorporamento più vicino alla query non venga perso, anche se risiede in una partizione diversa. Tuttavia, ciò comporta un aumento del tempo di ricerca, poiché è necessario valutare un maggior numero di candidati. Per ulteriori informazioni sulla regolazione dei parametri dell'indice, consultare la sezione <a href="/docs/it/ivf-flat.md#Index-params">Parametri dell'indice</a>.</p>
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
    </button></h2><p>Per costruire un indice <code translate="no">IVF_FLAT</code> su un campo vettoriale in Milvus, utilizzare il metodo <code translate="no">add_index()</code>, specificando i parametri <code translate="no">index_type</code>, <code translate="no">metric_type</code> e i parametri aggiuntivi per l'indice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters for the index</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">index_type</code>: Il tipo di indice da costruire. In questo esempio, impostare il valore su <code translate="no">IVF_FLAT</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Il metodo utilizzato per calcolare la distanza tra i vettori. I valori supportati sono <code translate="no">COSINE</code>, <code translate="no">L2</code> e <code translate="no">IP</code>. Per maggiori dettagli, consultare <a href="/docs/it/metric.md">Tipi di metriche</a>.</p></li>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la creazione dell'indice.</p>
<ul>
<li><code translate="no">nlist</code>: Numero di cluster in cui suddividere l'insieme di dati.</li>
</ul>
<p>Per conoscere i parametri di costruzione disponibili per l'indice <code translate="no">IVF_FLAT</code>, fare riferimento a <a href="/docs/it/ivf-flat.md#Index-building-params">Parametri di costruzione dell'indice</a>.</p></li>
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
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
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
<p>Per conoscere altri parametri di ricerca disponibili per l'indice <code translate="no">IVF_FLAT</code>, fare riferimento a <a href="/docs/it/ivf-flat.md#Index-specific-search-params">Parametri di ricerca specifici dell'indice</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parametri di costruzione dell'indice</h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">params</code> quando si <a href="/docs/it/ivf-flat.md#Build-index">costruisce un indice</a>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore Intervallo</p></th>
     <th><p>Suggerimento per la messa a punto</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Numero di cluster da creare con l'algoritmo k-means durante la costruzione dell'indice. Ogni cluster, rappresentato da un centroide, memorizza un elenco di vettori. Aumentando questo parametro si riduce il numero di vettori in ogni cluster, creando partizioni più piccole e mirate.</p></td>
     <td><p><strong>Tipo</strong>: <strong>Intervallo</strong>: [1, 65536]</p><p><strong>Valore predefinito</strong>: <code translate="no">128</code></p></td>
     <td><p>Valori maggiori di <code translate="no">nlist</code> migliorano il richiamo creando cluster più raffinati, ma aumentano il tempo di costruzione dell'indice. Ottimizzare in base alle dimensioni del set di dati e alle risorse disponibili. Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parametri di ricerca specifici per l'indice</h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">search_params.params</code> durante la <a href="/docs/it/ivf-flat.md#Search-on-index">ricerca sull'indice</a>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore Intervallo</p></th>
     <th><p>Suggerimento per la messa a punto</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Numero di cluster in cui cercare i candidati. Valori più alti consentono di cercare più cluster, migliorando il richiamo grazie all'ampliamento dell'ambito di ricerca, ma al costo di una maggiore latenza della query.</p></td>
     <td><p><strong>Tipo</strong>: Intero <strong>Intervallo</strong>: [1, <em>nlist</em>]</p><p><strong>Valore predefinito</strong>: <code translate="no">8</code></p></td>
     <td><p>L'aumento di questo valore migliora il richiamo, ma può rallentare la ricerca. Impostare <code translate="no">nprobe</code> in modo proporzionale a <code translate="no">nlist</code> per bilanciare velocità e precisione.</p><p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [1, nlist].</p></td>
   </tr>
</table>
