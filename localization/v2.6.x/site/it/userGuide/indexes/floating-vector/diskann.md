---
id: diskann.md
title: DISKANN
summary: >-
  In scenari di grandi dimensioni, in cui i set di dati possono includere
  miliardi o addirittura trilioni di vettori, i metodi standard di
  indicizzazione in memoria (ad esempio, HNSW, IVF_FLAT) spesso non riescono a
  tenere il passo a causa dei limiti di memoria. DISKANN offre un approccio
  basato su disco che affronta queste sfide mantenendo un'elevata precisione e
  velocità di ricerca quando le dimensioni del set di dati superano la RAM
  disponibile.
---
<h1 id="DISKANN" class="common-anchor-header">DISKANN<button data-href="#DISKANN" class="anchor-icon" translate="no">
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
    </button></h1><p>In scenari di grandi dimensioni, in cui i set di dati possono includere miliardi o addirittura trilioni di vettori, i metodi standard di indicizzazione in memoria (ad esempio, <a href="/docs/it/hnsw.md">HNSW</a>, <a href="/docs/it/ivf-flat.md">IVF_FLAT</a>) spesso non riescono a tenere il passo a causa dei limiti di memoria. <strong>DISKANN</strong> offre un approccio basato su disco che affronta queste sfide mantenendo un'elevata precisione e velocità di ricerca quando le dimensioni del set di dati superano la RAM disponibile.</p>
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
    </button></h2><p><strong>DISKANN</strong> combina due tecniche chiave per una ricerca vettoriale efficiente:</p>
<ul>
<li><p><strong>Vamana Graph</strong> - Un indice <strong>basato su disco</strong> e <strong>su grafo</strong> che collega i punti di dati (o vettori) per una navigazione efficiente durante la ricerca.</p></li>
<li><p><strong>Quantizzazione del prodotto (PQ)</strong> - Un metodo di compressione <strong>in memoria</strong> che riduce le dimensioni dei vettori, consentendo un rapido calcolo approssimativo della distanza tra i vettori.</p></li>
</ul>
<h3 id="Index-construction" class="common-anchor-header">Costruzione dell'indice<button data-href="#Index-construction" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Vamana-graph" class="common-anchor-header">Grafo di Vamana</h4><p>Il grafo Vamana è il fulcro della strategia basata su disco di DISKANN. Può gestire insiemi di dati molto grandi perché non ha bisogno di risiedere completamente in memoria durante o dopo la costruzione.</p>
<p>La figura seguente mostra come viene costruito un grafo Vamana.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann.png" alt="Diskann" class="doc-image" id="diskann" />
   </span> <span class="img-wrapper"> <span>Diskann</span> </span></p>
<ol>
<li><p><strong>Connessioni iniziali casuali:</strong> Ogni punto di dati (vettore) è rappresentato come un nodo del grafo. Questi nodi sono inizialmente collegati in modo casuale, formando una rete densa. In genere, un nodo inizia con circa 500 bordi (o connessioni) per un'ampia connettività.</p></li>
<li><p><strong>Raffinamento per l'efficienza:</strong> Il grafo casuale iniziale viene sottoposto a un processo di ottimizzazione per renderlo più efficiente per la ricerca. Ciò comporta due fasi fondamentali:</p>
<ul>
<li><p><strong>Potatura degli spigoli ridondanti:</strong> L'algoritmo scarta le connessioni non necessarie in base alle distanze tra i nodi. Questo passaggio dà priorità ai bordi di qualità superiore.</p>
<p>Il parametro <code translate="no">max_degree</code> limita il numero massimo di bordi per nodo. Un valore più alto di <code translate="no">max_degree</code> si traduce in un grafo più denso, che potenzialmente può trovare più vicini rilevanti (maggiore richiamo), ma anche aumentare l'uso della memoria e il tempo di ricerca.</p></li>
<li><p><strong>Aggiunta di scorciatoie strategiche:</strong> Vamana introduce bordi a lungo raggio, che collegano punti di dati molto distanti tra loro nello spazio vettoriale. Queste scorciatoie consentono alle ricerche di saltare rapidamente attraverso il grafo, aggirando i nodi intermedi e accelerando notevolmente la navigazione.</p>
<p>Il parametro <code translate="no">search_list_size</code> determina l'ampiezza del processo di raffinamento del grafo. Un valore più alto di <code translate="no">search_list_size</code> estende la ricerca dei vicini durante la costruzione e può migliorare la precisione finale, ma aumenta il tempo di costruzione dell'indice.</p></li>
</ul></li>
</ol>
<p>Per saperne di più sulla regolazione dei parametri, consultare i <a href="/docs/it/diskann.md#DISKANN-params">parametri di DISKANN</a>.</p>
<h4 id="PQ" class="common-anchor-header">PQ</h4><p>DISKANN utilizza <strong>PQ</strong> per comprimere vettori ad alta dimensione in rappresentazioni più piccole<strong>(codici PQ</strong>), che vengono memorizzate per un rapido calcolo delle distanze approssimate.</p>
<p>Il parametro <code translate="no">pq_code_budget_gb_ratio</code> gestisce l'ingombro della memoria dedicata alla memorizzazione di questi codici PQ. Rappresenta un rapporto tra la dimensione totale dei vettori (in gigabyte) e lo spazio allocato per la memorizzazione dei codici PQ. È possibile calcolare il budget effettivo dei codici PQ (in gigabyte) con questa formula:</p>
<pre><code translate="no" class="language-plaintext">PQ Code Budget (GB) = vec_field_size_gb * pq_code_budget_gb_ratio
<button class="copy-code-btn"></button></code></pre>
<p>dove:</p>
<ul>
<li><p><code translate="no">vec_field_size_gb</code> è la dimensione totale dei vettori (in gigabyte).</p></li>
<li><p><code translate="no">pq_code_budget_gb_ratio</code> è un rapporto definito dall'utente, che rappresenta la frazione della dimensione totale dei dati riservata ai codici PQ. Questo parametro consente di trovare un compromesso tra la precisione della ricerca e le risorse di memoria. Per ulteriori informazioni sulla regolazione dei parametri, consultare le <a href="/docs/it/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">configurazioni DISKANN</a>.</p></li>
</ul>
<p>Per i dettagli tecnici sul metodo PQ sottostante, consultare <a href="/docs/it/ivf-pq.md#share-MA6SdYG0io3EASxoSpyc7JW3nvc">IVF_PQ</a>.</p>
<h3 id="Search-process" class="common-anchor-header">Processo di ricerca<button data-href="#Search-process" class="anchor-icon" translate="no">
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
    </button></h3><p>Una volta costruito l'indice (il grafico Vamana su disco e i codici PQ in memoria), DISKANN esegue le ricerche di RNA come segue:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann-2.png" alt="Diskann 2" class="doc-image" id="diskann-2" />
   </span> <span class="img-wrapper"> <span>Diskann 2</span> </span></p>
<ol>
<li><p><strong>Query e punto di ingresso:</strong> Viene fornito un vettore di query per individuare i suoi vicini più prossimi. DISKANN parte da un punto di ingresso selezionato nel grafo di Vamana, spesso un nodo vicino al centroide globale del dataset. Il centroide globale rappresenta la media di tutti i vettori e aiuta a minimizzare la distanza di attraversamento del grafo per trovare i vicini desiderati.</p></li>
<li><p><strong>Esplorazione dei vicini:</strong> L'algoritmo raccoglie i potenziali vicini candidati (cerchi in rosso nella figura) dai bordi del nodo corrente, sfruttando i codici PQ in memoria per approssimare le distanze tra questi candidati e il vettore di interrogazione. Questi potenziali vicini candidati sono i nodi direttamente connessi al punto di ingresso selezionato attraverso i bordi del grafo di Vamana.</p></li>
<li><p><strong>Selezione dei nodi per il calcolo accurato della distanza:</strong> Dai risultati approssimativi, un sottoinsieme dei vicini più promettenti (cerchi in verde nella figura) viene selezionato per una valutazione precisa della distanza utilizzando i loro vettori originali non compressi. Ciò richiede la lettura dei dati dal disco, che può richiedere molto tempo. DISKANN utilizza due parametri per controllare questo delicato equilibrio tra precisione e velocità:</p>
<ul>
<li><p><code translate="no">beam_width_ratio</code>: Una razione che controlla l'ampiezza della ricerca, determinando quanti candidati vicini vengono selezionati in parallelo per esplorare i loro vicini. Una <code translate="no">beam_width_ratio</code> più grande comporta un'esplorazione più ampia, che potenzialmente porta a una maggiore accuratezza, ma aumenta anche il costo computazionale e l'I/O su disco. L'ampiezza del fascio, o il numero di nodi selezionati, è determinata dalla formula: <code translate="no">Beam width = Number of CPU cores * beam_width_ratio</code>.</p></li>
<li><p><code translate="no">search_cache_budget_gb_ratio</code>: La percentuale di memoria allocata per la cache dei dati del disco a cui si accede di frequente. La cache aiuta a ridurre al minimo l'I/O su disco, rendendo le ricerche ripetute più veloci perché i dati sono già in memoria.</p></li>
</ul>
<p>Per saperne di più sulla regolazione dei parametri, consultare le <a href="/docs/it/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">configurazioni di DISKANN</a>.</p></li>
<li><p><strong>Esplorazione iterativa:</strong> La ricerca affina iterativamente l'insieme dei candidati, eseguendo ripetutamente valutazioni approssimative (usando PQ) seguite da controlli precisi (usando i vettori originali dal disco) finché non viene trovato un numero sufficiente di vicini.</p></li>
</ol>
<h2 id="Enable-DISKANN-in-Milvus" class="common-anchor-header">Abilitare DISKANN in Milvus<button data-href="#Enable-DISKANN-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Per impostazione predefinita, <strong>DISKANN</strong> è disattivato in Milvus per privilegiare la velocità degli indici in memoria per gli insiemi di dati che stanno comodamente nella RAM. Tuttavia, se si lavora con insiemi di dati enormi o si desidera sfruttare la scalabilità di <strong>DISKANN</strong> e l'ottimizzazione dell'SSD, è possibile attivarlo facilmente.</p>
<p>Ecco come abilitare DISKANN in Milvus:</p>
<ol>
<li><p><strong>Aggiornare il file di configurazione di Milvus</strong></p>
<ol>
<li><p>Individuare il file di configurazione di Milvus<strong>.</strong> (Per maggiori dettagli su come trovare questo file, consultare la documentazione di Milvus sulla configurazione).</p></li>
<li><p>Trovare il parametro <code translate="no">queryNode.enableDisk</code> e impostarne il valore su <code translate="no">true</code>:</p>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">queryNode:</span>
     <span class="hljs-attr">enableDisk:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Enables query nodes to load and search using the on-disk index</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol></li>
<li><p><strong>Ottimizzare l'archiviazione per DISKANN</strong></p></li>
</ol>
<p>Per garantire le migliori prestazioni con DISKANN, si consiglia di archiviare i dati Milvus su un'unità SSD NVMe veloce. Ecco come fare sia per Milvus Standalone che per il Cluster:</p>
<ul>
<li><p><strong>Milvus Standalone</strong></p>
<ul>
<li><p>Montate la directory dei dati di Milvus su un'unità SSD NVMe all'interno del contenitore Milvus. È possibile farlo nel file <code translate="no">docker-compose.yml</code> o utilizzando altri strumenti di gestione del contenitore.</p></li>
<li><p>Ad esempio, se l'unità SSD NVMe è montata all'indirizzo <code translate="no">/mnt/nvme</code>, si aggiorna la sezione <code translate="no">volumes</code>del file <code translate="no">docker-compose.yml</code> in questo modo:</p></li>
</ul>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/mnt/nvme/volumes/milvus:/var/lib/milvus</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Cluster Milvus</strong></p>
<ul>
<li><p>Montare la directory dei dati Milvus su un'unità SSD NVMe in entrambi i contenitori QueryNode e IndexNode. È possibile ottenere questo risultato attraverso la configurazione dell'orchestrazione dei container.</p></li>
<li><p>Montando i dati su un'unità SSD NVMe in entrambi i tipi di nodo, si garantisce una velocità di lettura e scrittura elevata per le operazioni di ricerca e indicizzazione.</p></li>
</ul></li>
</ul>
<p>Una volta apportate queste modifiche, riavviare l'istanza Milvus per rendere effettive le impostazioni. Ora Milvus sfrutterà le capacità di DISKANN per gestire grandi insiemi di dati, offrendo una ricerca vettoriale efficiente e scalabile.</p>
<h2 id="Configure-DISKANN" class="common-anchor-header">Configurazione di DISKANN<button data-href="#Configure-DISKANN" class="anchor-icon" translate="no">
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
    </button></h2><p>I parametri relativi a DISKANN possono essere configurati solo tramite il file di configurazione di Milvus (<code translate="no">milvus.yaml</code>):</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">DiskIndex:</span>
    <span class="hljs-attr">MaxDegree:</span> <span class="hljs-number">56</span>  <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
    <span class="hljs-attr">SearchListSize:</span> <span class="hljs-number">100</span>  <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">PQCodeBudgetGBRatio:</span> <span class="hljs-number">0.125</span>  <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
    <span class="hljs-attr">SearchCacheBudgetGBRatio:</span> <span class="hljs-number">0.1</span> <span class="hljs-comment"># Ratio of cached node numbers to raw data</span>
    <span class="hljs-attr">BeamWidthRatio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per maggiori dettagli sulle descrizioni dei parametri, fare riferimento a <a href="/docs/it/diskann.md#DISKANN-params">DISKANN params</a>.</p>
<h2 id="DISKANN-params" class="common-anchor-header">Parametri DISKANN<button data-href="#DISKANN-params" class="anchor-icon" translate="no">
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
    </button></h2><p>La regolazione fine dei parametri di DISKANN consente di adattare il suo comportamento al dataset specifico e al carico di lavoro della ricerca, trovando il giusto equilibrio tra velocità, precisione e utilizzo della memoria.</p>
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
    </button></h3><p>Questi parametri influenzano il modo in cui viene costruito l'indice DISKANN. La loro regolazione può influenzare le dimensioni dell'indice, il tempo di costruzione e la qualità della ricerca.</p>
<div class="alert note">
<p>Tutti i parametri di costruzione dell'indice dell'elenco seguente possono essere configurati solo tramite il file di configurazione di Milvus (<code translate="no">milvus.yaml</code>).</p>
</div>
<table>
   <tr>
     <th></th>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore Intervallo</p></th>
     <th><p>Suggerimento per la messa a punto</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">MaxDegree</code></p></td>
     <td><p>Controlla il numero massimo di connessioni (bordi) che ogni punto di dati può avere nel grafico Vamana.</p></td>
     <td><p><strong>Tipo</strong>: Intero <strong>Intervallo</strong>: [1, 512]</p>
<p><strong>Valore predefinito</strong>: <code translate="no">56</code></p></td>
     <td><p>Valori più alti creano grafici più densi, aumentando potenzialmente il richiamo (trovando risultati più rilevanti) ma anche l'utilizzo della memoria e il tempo di costruzione. 
 Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [10, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">SearchListSize</code></p></td>
     <td><p>Durante la costruzione dell'indice, questo parametro definisce la dimensione del pool di candidati utilizzato per la ricerca dei vicini più prossimi per ogni nodo. Per ogni nodo aggiunto al grafo, l'algoritmo mantiene un elenco dei <code translate="no">search_list_size</code> migliori candidati trovati finora. La ricerca dei vicini si ferma quando questo elenco non può più essere migliorato. Da questa lista finale di candidati, i migliori <code translate="no">max_degree</code> nodi vengono selezionati per formare i bordi finali.</p></td>
     <td><p><strong>Tipo</strong>: Intero <strong>Intervallo</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valore predefinito</strong>: <code translate="no">100</code></p></td>
     <td><p>Un valore maggiore di <code translate="no">search_list_size</code> aumenta la probabilità di trovare i veri vicini per ogni nodo, il che può portare a un grafo di qualità superiore e a migliori prestazioni di ricerca (recall). Tuttavia, ciò ha il costo di un tempo di creazione dell'indice significativamente più lungo. Dovrebbe essere sempre impostato a un valore maggiore o uguale a <code translate="no">max_degree</code>.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">SearchCacheBudgetGBRatio</code></p></td>
     <td><p>Controlla la quantità di memoria allocata per la cache delle parti del grafo a cui si accede di frequente durante la costruzione dell'indice.</p></td>
     <td><p><strong>Tipo</strong>: Variabile <strong>Intervallo</strong>: [0.0, 0.3)</p>
<p><strong>Valore predefinito</strong>: <code translate="no">0.10</code></p></td>
     <td><p>Un valore più alto alloca più memoria per la cache, riducendo significativamente l'I/O su disco ma consumando più memoria di sistema. Un valore inferiore utilizza meno memoria per la cache, aumentando potenzialmente la necessità di accesso al disco. Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [0.0, 0.3).</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">PQCodeBudgetGBRatio</code></p></td>
     <td><p>Controlla la dimensione dei codici PQ (rappresentazioni compresse dei punti di dati) rispetto alla dimensione dei dati non compressi.</p></td>
     <td><p><strong>Tipo</strong>: Variabile <strong>Intervallo</strong>: (0,0, 0,25]</p>
<p><strong>Valore predefinito</strong>: <code translate="no">0.125</code></p></td>
     <td><p>Un rapporto più alto porta a risultati di ricerca più accurati, allocando una percentuale maggiore di memoria per i codici PQ, memorizzando di fatto più informazioni sui vettori originali. Un rapporto più basso riduce l'uso della memoria, ma potenzialmente sacrifica l'accuratezza, poiché i codici PQ più piccoli conservano meno informazioni. Questo approccio è adatto a scenari in cui i vincoli di memoria sono un problema, consentendo potenzialmente l'indicizzazione di insiemi di dati più grandi.</p>
<p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: (0,0625, 0,25].</p></td>
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
    </button></h3><p>Questi parametri influenzano il modo in cui DISKANN esegue le ricerche. La loro regolazione può influire sulla velocità di ricerca, sulla latenza e sull'utilizzo delle risorse.</p>
<div class="alert note">
<p>I parametri <code translate="no">BeamWidthRatio</code> dell'elenco seguente possono essere configurati solo tramite il file di configurazione di Milvus (<code translate="no">milvus.yaml</code>).</p>
<p>I <code translate="no">search_list</code> dell'elenco seguente possono essere configurati solo nei parametri di ricerca dell'SDK.</p>
</div>
<table>
   <tr>
     <th></th>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore Intervallo</p></th>
     <th><p>Suggerimento per la messa a punto</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">BeamWidthRatio</code></p></td>
     <td><p>Controlla il grado di parallelismo durante la ricerca, determinando il numero massimo di richieste di I/O su disco in parallelo rispetto al numero di core CPU disponibili.</p></td>
     <td><p><strong>Tipo</strong>: Variabile <strong>Intervallo</strong>: [1, max(128/numero di CPU, 16)].</p>
<p><strong>Valore predefinito</strong>: <code translate="no">4.0</code></p></td>
     <td><p>Valori più alti aumentano il parallelismo, accelerando la ricerca su sistemi con CPU e SSD potenti. Tuttavia, un valore troppo alto potrebbe causare un'eccessiva contestazione delle risorse. Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [1.0, 4.0].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_list</code></p></td>
     <td><p>Durante un'operazione di ricerca, questo parametro determina la dimensione del pool di candidati che l'algoritmo mantiene durante l'attraversamento del grafo. Un valore maggiore aumenta le possibilità di trovare i veri vicini (richiamo più elevato), ma aumenta anche la latenza della ricerca.</p></td>
     <td><p><strong>Tipo</strong>: Intero <strong>Intervallo</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valore predefinito</strong>: <code translate="no">100</code></p></td>
     <td><p>Per un buon equilibrio tra prestazioni e accuratezza, si consiglia di impostare questo valore come uguale o leggermente superiore al numero di risultati che si desidera recuperare (top_k).</p></td>
   </tr>
</table>
