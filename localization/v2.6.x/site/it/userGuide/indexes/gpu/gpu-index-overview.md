---
id: gpu-index-overview.md
title: Panoramica dell'indice GPU
summary: >-
  La creazione di un indice con il supporto delle GPU in Milvus può migliorare
  significativamente le prestazioni di ricerca in scenari ad alto rendimento e
  ad alto richiamo.
---
<h1 id="GPU-Index-Overview" class="common-anchor-header">Panoramica dell'indice GPU<button data-href="#GPU-Index-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>La creazione di un indice con supporto GPU in Milvus può migliorare significativamente le prestazioni di ricerca in scenari ad alto throughput e ad alto richiamo.</p>
<p>La figura seguente confronta il throughput delle query (query al secondo) di varie configurazioni dell'indice su diverse configurazioni hardware, set di dati vettoriali (Cohere e OpenAI) e dimensioni dei batch di ricerca, dimostrando che <code translate="no">GPU_CAGRA</code> supera costantemente gli altri metodi.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/gpu-index-performance.png" alt="Gpu Index Performance" class="doc-image" id="gpu-index-performance" />
   </span> <span class="img-wrapper"> <span>Prestazioni dell'indice Gpu</span> </span></p>
<h2 id="Limits" class="common-anchor-header">Limiti<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>Per <code translate="no">GPU_IVF_FLAT</code>, il valore massimo per <code translate="no">limit</code> è 1.024.</p></li>
<li><p>Per <code translate="no">GPU_IVF_PQ</code> e <code translate="no">GPU_CAGRA</code>, il valore massimo per <code translate="no">limit</code> è di 1.024.</p></li>
<li><p>Mentre per <code translate="no">GPU_BRUTE_FORCE</code> non c'è un valore impostato per <code translate="no">limit</code>, si raccomanda di non superare i 4.096 per evitare potenziali problemi di prestazioni.</p></li>
<li><p>Attualmente, gli indici della GPU non supportano la distanza <code translate="no">COSINE</code>. Se è necessaria la distanza <code translate="no">COSINE</code>, i dati devono essere prima normalizzati e poi si può usare la distanza del prodotto interno (IP) come sostituto.</p></li>
<li><p>Il caricamento della protezione OOM per gli indici GPU non è pienamente supportato, una quantità eccessiva di dati potrebbe causare l'arresto anomalo del QueryNode.</p></li>
<li><p>Gli indici GPU non supportano funzioni di ricerca come la <a href="/docs/it/range-search.md">ricerca per intervallo</a> e la <a href="/docs/it/grouping-search.md">ricerca per raggruppamento</a>.</p></li>
</ul>
<h2 id="Supported-GPU-index-types" class="common-anchor-header">Tipi di indice GPU supportati<button data-href="#Supported-GPU-index-types" class="anchor-icon" translate="no">
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
    </button></h2><p>La seguente tabella elenca i tipi di indice GPU supportati da Milvus.</p>
<table>
   <tr>
     <th><p>Tipo di indice</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Utilizzo della memoria</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/it/gpu-cagra.md">GPU_CAGRA</a></p></td>
     <td><p>GPU_CAGRA è un indice a grafo ottimizzato per le GPU. L'uso di GPU di livello inferenza per eseguire la versione GPU di Milvus può essere più conveniente rispetto all'uso di costose GPU di livello addestramento.</p></td>
     <td><p>L'utilizzo della memoria è circa 1,8 volte quello dei dati vettoriali originali.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/gpu-ivf-flat.md">GPU_IVF_FLAT</a></p></td>
     <td><p>GPU_IVF_FLAT è l'indice IVF più semplice e i dati codificati memorizzati in ogni unità sono coerenti con i dati originali. Quando si effettuano le ricerche, è possibile impostare il top-k (<code translate="no">limit</code>) fino a 256 per qualsiasi ricerca su una raccolta indicizzata con GPU_IVF_FLAT.</p></td>
     <td><p>Richiede una memoria pari alla dimensione dei dati originali.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/gpu-ivf-pq.md">GPU_IVF_PQ</a></p></td>
     <td><p>GPU_IVF_PQ esegue il raggruppamento degli indici IVF prima di quantizzare il prodotto dei vettori. Quando si effettuano le ricerche, è possibile impostare il top-k (<code translate="no">limit</code>) fino a 8.192 per qualsiasi ricerca su una raccolta indicizzata da GPU_IVF_FLAT.</p></td>
     <td><p>Utilizza un ingombro di memoria minore, che dipende dalle impostazioni dei parametri di compressione.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/gpu-brute-force.md">GPU_BRUTE_FORCE</a></p></td>
     <td><p>GPU_BRUTE_FORCE è stato pensato per i casi in cui è fondamentale un richiamo estremamente elevato, garantendo un richiamo di 1 confrontando ogni query con tutti i vettori del set di dati. Richiede solo il tipo di metrica (<code translate="no">metric_type</code>) e top-k (<code translate="no">limit</code>) come parametri di costruzione e ricerca dell'indice.</p></td>
     <td><p>Richiede una memoria pari alla dimensione dei dati originali.</p></td>
   </tr>
</table>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">Configurare le impostazioni di Milvus per il controllo della memoria della GPU<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus utilizza un pool di memoria grafica globale per allocare la memoria della GPU. Supporta due parametri <code translate="no">initMemSize</code> e <code translate="no">maxMemSize</code> nel <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">file di configurazione di Milvus</a>. La dimensione del pool è inizialmente impostata su <code translate="no">initMemSize</code> e verrà automaticamente espansa a <code translate="no">maxMemSize</code> dopo aver superato questo limite.</p>
<p>Il valore predefinito di <code translate="no">initMemSize</code> è pari a 1/2 della memoria della GPU disponibile all'avvio di Milvus, mentre il valore predefinito di <code translate="no">maxMemSize</code> è pari a tutta la memoria della GPU disponibile.</p>
<p>Fino a Milvus 2.4.1, Milvus utilizza un pool di memoria GPU unificato. Per le versioni precedenti alla 2.4.1, si raccomandava di impostare entrambi i valori a 0.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>A partire da Milvus 2.4.1, il pool di memoria GPU viene utilizzato solo per i dati temporanei della GPU durante le ricerche. Pertanto, si consiglia di impostare i valori 2048 e 4096.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Per sapere come costruire un indice GPU, consultare la guida specifica per ogni tipo di indice.</p>
<h2 id="FAQ" class="common-anchor-header">DOMANDE FREQUENTI<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>Quando è opportuno utilizzare un indice GPU?</strong></p>
<p>Un indice GPU è particolarmente vantaggioso in situazioni che richiedono un'elevata velocità di elaborazione o di richiamo. Ad esempio, quando si tratta di batch di grandi dimensioni, il throughput dell'indicizzazione su GPU può superare di ben 100 volte quello dell'indicizzazione su CPU. In scenari con batch più piccoli, gli indici su GPU superano comunque in modo significativo gli indici su CPU in termini di prestazioni. Inoltre, se è richiesto un inserimento rapido dei dati, l'integrazione di una GPU può accelerare notevolmente il processo di creazione degli indici.</p></li>
<li><p><strong>In quali scenari sono più adatti gli indici su GPU come GPU_CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT e GPU_BRUTE_FORCE?</strong></p>
<p><code translate="no">GPU_CAGRA</code> Gli indici GPU sono ideali per gli scenari che richiedono prestazioni migliori, anche se a costo di consumare più memoria. Per gli ambienti in cui la conservazione della memoria è una priorità, l'indice <code translate="no">GPU_IVF_PQ</code> può aiutare a minimizzare i requisiti di memorizzazione, anche se comporta una maggiore perdita di precisione. L'indice <code translate="no">GPU_IVF_FLAT</code> è un'opzione equilibrata, che offre un compromesso tra prestazioni e utilizzo della memoria. Infine, l'indice <code translate="no">GPU_BRUTE_FORCE</code> è progettato per operazioni di ricerca esaustive, garantendo un tasso di richiamo pari a 1 mediante l'esecuzione di ricerche trasversali.</p></li>
</ul>
