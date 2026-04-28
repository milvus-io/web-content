---
id: aisaq.md
title: AISAQCompatible with Milvus 2.6.4+
summary: >-
  AISAQ è un indice vettoriale basato su disco che estende DISKANN per gestire
  insiemi di dati su scala miliardaria senza superare i limiti della RAM. A
  differenza di DISKANN, che mantiene i vettori compressi in memoria, AISAQ
  memorizza tutti i dati su disco, offrendo due modalità per bilanciare le
  prestazioni e i costi di archiviazione.
beta: Milvus 2.6.4+
---
<h1 id="AISAQ" class="common-anchor-header">AISAQ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#AISAQ" class="anchor-icon" translate="no">
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
    </button></h1><p>AISAQ è un indice vettoriale basato su disco che estende <a href="/docs/it/diskann.md">DISKANN</a> per gestire insiemi di dati su scala miliardaria con un ingombro DRAM minimo.</p>
<p>A differenza di DISKANN, che mantiene i vettori compressi in memoria, AISAQ è progettato con una "Architettura DRAM quasi zero", il che significa mantenere tutte le strutture di dati su SSD.</p>
<p>AISAQ consente di eseguire database su scala ultraelevata utilizzando server standard, offrendo al contempo modalità operative per bilanciare prestazioni e costi di archiviazione.</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">Come funziona AISAQ<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Il diagramma qui sopra confronta i layout di archiviazione di <strong>DISKANN</strong>, <strong>AISAQ-Performance</strong> e <strong>AISAQ-Scale</strong>, mostrando come i dati (vettori grezzi, elenchi di bordi e codici PQ) sono distribuiti tra RAM e disco.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
   </span> <span class="img-wrapper"> <span>Aisaq Vs Diskann</span> </span></p>
<h3 id="Foundation-DISKANN-recap" class="common-anchor-header">Fondazione: Riepilogo DISKANN<button data-href="#Foundation-DISKANN-recap" class="anchor-icon" translate="no">
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
    </button></h3><p>In DISKANN, i vettori grezzi e gli elenchi di bordi sono memorizzati su disco, mentre i vettori compressi PQ sono conservati in memoria (DRAM).</p>
<p>Quando DISKANN passa a un nodo (ad esempio, il <em>vettore 0</em>):</p>
<ul>
<li><p>Carica il vettore grezzo<strong>(raw_vector_0</strong>) e il suo elenco di bordi<strong>(edgelist_0</strong>) dal disco.</p></li>
<li><p>L'elenco dei bordi indica i vicini da visitare successivamente (i nodi 2, 3 e 5 in questo esempio).</p></li>
<li><p>Il vettore grezzo viene utilizzato per calcolare la distanza esatta dal vettore di query per la classificazione.</p></li>
<li><p>I dati PQ in memoria vengono utilizzati per il filtraggio approssimativo della distanza per guidare l'attraversamento successivo.</p></li>
</ul>
<p>Poiché i dati PQ sono già memorizzati nella DRAM, ogni visita al nodo richiede solo un I/O su disco, ottenendo un'elevata velocità di interrogazione con un uso moderato della memoria.</p>
<p>Per una spiegazione dettagliata di questi componenti e parametri, consultare <a href="/docs/it/diskann.md">DISKANN</a>.</p>
<h3 id="AISAQ-Operation-Modes" class="common-anchor-header">Modalità di funzionamento di AISAQ<button data-href="#AISAQ-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ offre due modalità di funzionamento per rispondere a due casi d'uso distinti:</p>
<p>Modalità Performance: ottimizzata per applicazioni che richiedono una bassa latenza e un elevato throughput su scala, come la ricerca semantica online.</p>
<p>Modalità Scale: ottimizzata per applicazioni con vincoli di latenza più rilassati, come la ricerca semantica RAG e offline, consentendo al contempo un'espansione economicamente efficiente dei set di dati su scala ultraelevata.</p>
<h4 id="AISAQ-performance-mode" class="common-anchor-header">Modalità AISAQ-performance</h4><p><strong>AISAQ-performance</strong> consente di ottenere un "ingombro DRAM vicino allo zero" spostando i dati PQ dalla memoria al disco e mantenendo un basso IOPS grazie alla colocazione e alla ridondanza dei dati.</p>
<ul>
<li><p>Il vettore grezzo di ogni nodo, l'elenco dei bordi e i dati PQ dei suoi vicini sono memorizzati insieme su disco.</p></li>
<li><p>Questa disposizione garantisce che la visita di un nodo (ad esempio, il vettore 0) richieda un solo I/O su disco.</p></li>
<li><p>Poiché i dati PQ sono memorizzati in modo ridondante vicino a più nodi, la dimensione del file indice aumenta in modo significativo, consumando più spazio su disco.</p></li>
</ul>
<h4 id="AISAQ-scale-mode" class="common-anchor-header">Modalità AISAQ-scale</h4><p><strong>AISAQ-scale</strong> si concentra sulla riduzione dell'utilizzo dello spazio su disco, soddisfacendo al contempo i requisiti di prestazione delle applicazioni di destinazione.</p>
<p>In questa modalità:</p>
<ul>
<li><p>I dati PQ sono memorizzati separatamente su disco, senza ridondanza.</p></li>
<li><p>Questo design riduce al minimo le dimensioni dell'indice, ma comporta un maggior numero di operazioni di I/O durante l'attraversamento del grafo.</p></li>
<li><p>Per ridurre il sovraccarico di IOPS, AISAQ introduce due ottimizzazioni:</p>
<ul>
<li><p>Un algoritmo di riordino che ordina i vettori PQ in base alla priorità per migliorare la localizzazione dei dati.</p></li>
<li><p>Una cache PQ nella DRAM (pq_read_page_cache_size) che memorizza i dati PQ di accesso frequente.</p></li>
</ul></li>
</ul>
<h2 id="Example-configuration" class="common-anchor-header">Esempio di configurazione<button data-href="#Example-configuration" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">AISAQ:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Controls the maximum number of connections (edges) each data point can have in the Vamana graph</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># During index construction, this parameter defines the size of the candidate pool used when searching for the nearest neighbors for each node. For every node being added to the graph, the algorithm maintains a list of the search_list_size best candidates found so far. The search for neighbors stops when this list can no longer be improved. From this final candidate pool, the top max_degree nodes are selected to form the final edges</span>
      <span class="hljs-attr">inline_pq:</span> <span class="hljs-number">-1</span> <span class="hljs-comment"># Number of PQ vectors stored inline per Index node (read when node is accessed, to reduce IO)</span>
      <span class="hljs-attr">rearrange:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Re-arrange the PQ vectors data structure to improve data locality and reduce disk accesses during search (ignored in performance mode)</span>
      <span class="hljs-attr">num_entry_points:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate entry points to optimize search entry-point selection</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Controls the size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
      <span class="hljs-attr">disk_pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.25</span> <span class="hljs-comment"># Controls the size of the PQ codes of the high precision vectors stored in the index (used for re-ranking), compared to the size of the uncompressed data</span>
      <span class="hljs-attr">pq_cache_size:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># PQ vectors cache size in DRAM (bytes). The PQ vectors cache is loaded during Index load and used during search to reduce IOs (ignored in performance mode)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># Controls the amount of DRAM to be used for caching frequently accessed index nodes. This cache is loaded during index load and used during search to reduce IOs</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">search_list:</span> <span class="hljs-number">16</span> <span class="hljs-comment"># During a search operation, this parameter determines the size of the candidate pool that the algorithm maintains as it traverses the graph. A larger value increases the chances of finding the true nearest neighbors (higher recall) but also increases search latency</span>
      <span class="hljs-attr">beamwidth:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read the index nodes</span>
      <span class="hljs-attr">vectors_beamwidth:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read groups of neighboring PQ vectors (ignored in performance mode)</span>
      <span class="hljs-attr">pq_read_page_cache_size:</span> <span class="hljs-number">5242880</span> <span class="hljs-string">(5MiB)</span> <span class="hljs-comment"># PQ read cache size in DRAM per search thread (bytes). It caches frequently accessed data pages containing PQ vectors (ignored in performance mode and applicable only when rearrange is true). The PQ read cache memory is reused across all AISAQ segments</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-parameters" class="common-anchor-header">Parametri di AISAQ<button data-href="#AISAQ-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ eredita alcuni parametri da DISKANN: <code translate="no">max_degree</code>, <code translate="no">search_list_size</code> e <code translate="no">pq_code_budget_gb_ratio</code>.</p>
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
    </button></h3><p>Questi parametri influenzano il modo in cui viene costruito l'indice di AISAQ. La loro regolazione può influenzare le dimensioni dell'indice, il tempo di costruzione e la qualità della ricerca.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore Intervallo</p></th>
     <th><p>Suggerimento per la regolazione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Controlla il numero massimo di connessioni (bordi) che ogni punto di dati può avere nel grafico Vamana.</p></td>
     <td><p><strong>Tipo</strong>: Intero</p><p><strong>Intervallo</strong>: [1, 512]</p><p><strong>Valore predefinito</strong>: <code translate="no">56</code></p></td>
     <td><p>Valori più alti creano grafici più densi, aumentando potenzialmente il richiamo (trovando risultati più rilevanti) ma anche l'utilizzo della memoria e il tempo di costruzione. Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [10, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>Durante la costruzione dell'indice, questo parametro definisce la dimensione del pool di candidati utilizzato per la ricerca dei vicini più prossimi per ogni nodo. Per ogni nodo aggiunto al grafo, l'algoritmo mantiene un elenco dei migliori candidati trovati fino a quel momento. La ricerca dei vicini si ferma quando questo elenco non può più essere migliorato. Da questa lista finale di candidati, vengono selezionati i nodi di massimo grado per formare i bordi finali.</p></td>
     <td><p><strong>Tipo</strong>: Intero</p><p><strong>Intervallo</strong>: [1, 512]</p><p><strong>Valore predefinito</strong>: <code translate="no">100</code></p></td>
     <td><p>Una dimensione maggiore di search_list_size aumenta la probabilità di trovare i veri vicini per ogni nodo, il che può portare a un grafo di qualità superiore e a migliori prestazioni di ricerca (recall). Tuttavia, ciò ha il costo di un tempo di creazione dell'indice significativamente più lungo. Dovrebbe essere sempre impostato su un valore maggiore o uguale a max_degree.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>Numero di vettori PQ memorizzati in linea per ogni nodo dell'indice (letti quando si accede al nodo, per ridurre l'IO)</p></td>
     <td><p><strong>Tipo</strong>: Intero</p><p><strong>Intervallo</strong>: [0, <em>max_degree</em>]</p><p><strong>Valore predefinito</strong>: <code translate="no">-1</code></p></td>
     <td><p>Valori più alti di <code translate="no">inline_pq</code> migliorano le prestazioni ma aumentano lo spazio su disco.</p><p>Impostare <code translate="no">inline_pq</code>=0 per AISAQ in modalità scala.</p><p>Impostare <code translate="no">inline_pq</code>=-1 per riempire automaticamente qualsiasi spazio inutilizzato nell'indice con vettori PQ per un'ulteriore ottimizzazione di AISAQ in modalità scalare.</p><p>Impostare <code translate="no">inline_pq</code><em>=max_degree</em> per AISAQ in modalità performance.</p><p><code translate="no">inline_pq</code> Le impostazioni comprese tra 0 e <em>max_degree</em> consentono un equilibrio regolabile tra prestazioni e consumo di spazio su disco.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>Riorganizzare la struttura dei dati dei vettori PQ per migliorare la localizzazione dei dati e ridurre gli accessi al disco durante la ricerca (ignorato in modalità prestazioni).</p></td>
     <td><p><strong>Tipo</strong>: Booleano</p><p><strong>Intervallo</strong>: [true, false]</p><p><strong>Valore predefinito</strong>: <code translate="no">true</code></p></td>
     <td><p>Se true, riduce gli IO durante la ricerca con un aumento minimo della memoria e del tempo di creazione dell'indice.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">num_entry_points</code></p></td>
     <td><p>Numero di punti di ingresso candidati per ottimizzare la selezione dei punti di ingresso della ricerca.</p></td>
     <td><p><strong>Tipo</strong>: Intero</p><p><strong>Intervallo</strong>: [0, 1000]</p><p><strong>Valore predefinito</strong>: <code translate="no">100</code></p></td>
     <td><p>Valori elevati possono ridurre il tempo di ricerca iniziando la ricerca da un punto di ingresso più vicino.</p><p>Impostare valori più alti per segmenti di grandi dimensioni (ad esempio, per vettori da 10 M e oltre utilizzare il valore 1000).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>Controlla la dimensione dei codici PQ (rappresentazioni compresse dei punti dati) rispetto alla dimensione dei dati non compressi.</p></td>
     <td><p><strong>Tipo</strong>: Variabile</p><p><strong>Intervallo</strong>: (0.0, 0.25]</p><p><strong>Valore predefinito</strong>: <code translate="no">0.125</code></p></td>
     <td><p>Un rapporto più alto porta a risultati di ricerca più accurati, memorizzando effettivamente più informazioni sui vettori originali, ma aumenta la complessità computazionale durante la ricerca.</p><p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: (0,0417, 0,25].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disk_pq_code_budget_gb_ratio</code></p></td>
     <td><p>Controlla la dimensione dei codici PQ dei vettori ad alta precisione memorizzati nell'indice (usati per il riordino), rispetto alla dimensione dei dati non compressi.</p></td>
     <td><p><strong>Tipo</strong>: Variabile</p><p><strong>Intervallo</strong>: [0, 0.25]</p><p><strong>Valore predefinito</strong>: <code translate="no">0.25</code></p></td>
     <td><p>Con il valore predefinito di 0,25, i vettori saranno quantizzati al 25% della loro dimensione originale (compressione 4×), riducendo l'ingombro su disco con un impatto relativamente minimo sulla precisione.</p><p>Impostare il valore 0 per memorizzare i vettori a precisione completa nell'indice del disco per la ri-classificazione. Un valore maggiore offre un tasso di richiamo più elevato, ma aumenta l'utilizzo del disco.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>Dimensione della cache dei vettori PQ in DRAM (byte). La cache dei vettori PQ viene caricata durante il caricamento dell'indice e utilizzata durante la ricerca per ridurre gli IO (ignorata in modalità prestazioni).</p></td>
     <td><p><strong>Tipo</strong>: Intero</p><p><strong>Intervallo</strong>: [0, 1073741824]</p><p><strong>Valore predefinito</strong>: <code translate="no">0</code></p></td>
     <td><p>Una cache più grande migliora le prestazioni delle query, ma aumenta l'uso della DRAM.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>Controlla la quantità di DRAM da usare per la cache dei nodi dell'indice a cui si accede di frequente.</p><p>Questa cache viene caricata durante il caricamento dell'indice e utilizzata durante la ricerca per ridurre gli IO.</p></td>
     <td><p><strong>Tipo</strong>: A virgola mobile</p><p><strong>Intervallo</strong>: [0.0, 0.3)</p><p><strong>Valore predefinito</strong>: <code translate="no">0</code></p></td>
     <td><p>Un valore più alto alloca più memoria per la cache, riducendo gli IO del disco ma consumando più memoria di sistema. Un valore inferiore utilizza meno memoria per la cache, aumentando potenzialmente la necessità di accesso al disco.</p></td>
   </tr>
</table>
<h3 id="Index-search-params" class="common-anchor-header">Parametri di ricerca degli indici<button data-href="#Index-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Questi parametri influenzano il modo in cui AISAQ esegue le ricerche. La loro regolazione può influire sulla velocità di ricerca, sulla latenza e sull'utilizzo delle risorse.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Intervallo di valori</p></th>
     <th><p>Suggerimento per la regolazione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_list</code></p></td>
     <td><p>Durante un'operazione di ricerca, questo parametro determina la dimensione del pool di candidati che l'algoritmo mantiene mentre attraversa il grafo. Un valore maggiore aumenta le possibilità di trovare i veri vicini (richiamo più elevato), ma aumenta anche la latenza della ricerca.</p></td>
     <td><p><strong>Tipo</strong>: Intero</p><p><strong>Intervallo</strong>: [topk, int32_max]</p><p><strong>Valore predefinito</strong>: <code translate="no">16</code></p></td>
     <td><p>Per un buon equilibrio tra prestazioni e precisione, si consiglia di impostare questo valore in modo che sia uguale o leggermente superiore al numero di risultati che si desidera recuperare (top_k).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">beamwidth</code></p></td>
     <td><p>Controlla il grado di parallelismo durante la ricerca, determinando il numero massimo di richieste di I/O su disco in parallelo per leggere i nodi dell'indice.</p></td>
     <td><p><strong>Tipo</strong>: Intero</p><p><strong>Intervallo</strong>: [1, 16]</p><p><strong>Valore predefinito</strong>: <code translate="no">8</code></p></td>
     <td><p>Valori più alti aumentano il parallelismo, accelerando la ricerca su sistemi con CPU e SSD potenti. Tuttavia, un valore troppo alto potrebbe causare un'eccessiva contestazione delle risorse.</p><p>Nella maggior parte dei casi, si consiglia di impostare un valore pari a 2.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectors_beamwidth</code></p></td>
     <td><p>Controlla il grado di parallelismo durante la ricerca determinando il numero massimo di richieste di I/O su disco in parallelo per leggere gruppi di vettori PQ vicini (ignorato in modalità prestazioni).</p></td>
     <td><p><strong>Tipo</strong>: Intero</p><p><strong>Intervallo</strong>: [1, 4] deve essere &lt;= <em>larghezza di fascio</em></p><p><strong>Valore predefinito</strong>: <code translate="no">1</code></p></td>
     <td><p>Valori più alti aumentano il parallelismo, accelerando la ricerca su sistemi con CPU e SSD potenti. Tuttavia, un valore troppo alto potrebbe causare un'eccessiva contesa delle risorse, poiché ogni gruppo di vettori PQ vicini può contenere fino a vettori di max_grado.</p><p>Nella maggior parte dei casi, si consiglia di impostare un valore pari a 1.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_read_page_cache_size</code></p></td>
     <td><p>Dimensione della cache di lettura PQ in DRAM per thread di ricerca (byte). Mette in cache le pagine di dati ad accesso frequente contenenti vettori PQ (ignorata in modalità performance e applicabile solo quando rearrange è true).</p><p>La memoria cache di lettura PQ viene riutilizzata in tutti i segmenti AISAQ.</p></td>
     <td><p><strong>Tipo</strong>: Intero</p><p><strong>Intervallo</strong>: [0, 33554432]</p><p><strong>Valore predefinito</strong>: <code translate="no">5242880 (5MiB)</code></p></td>
     <td><p>Una cache più grande migliora le prestazioni delle query, ma aumenta l'utilizzo della DRAM.</p><p>I valori consigliati vanno da 2 MiB per i segmenti piccoli (1 M di vettori), 5 MiB per i segmenti medi (50 M di vettori) e 10 MiB per i segmenti grandi (250 M di vettori).</p></td>
   </tr>
</table>
