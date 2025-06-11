---
id: index-explained.md
title: Spiegazione dell'indice
summary: >-
  Un indice è una struttura aggiuntiva costruita sopra i dati. La sua struttura
  interna dipende dall'algoritmo di ricerca approssimativa dei vicini in uso. Un
  indice accelera la ricerca, ma comporta tempi di preelaborazione, spazio e RAM
  aggiuntivi durante la ricerca. Inoltre, l'uso di un indice di solito riduce il
  tasso di richiamo (anche se l'effetto è trascurabile, è comunque importante).
  Pertanto, questo articolo spiega come minimizzare i costi dell'uso di un
  indice massimizzandone i benefici.
---
<h1 id="Index-Explained" class="common-anchor-header">Spiegazione dell'indice<button data-href="#Index-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Un indice è una struttura aggiuntiva costruita sopra i dati. La sua struttura interna dipende dall'algoritmo di ricerca approssimativa dei vicini in uso. Un indice accelera la ricerca, ma comporta tempi di preelaborazione, spazio e RAM aggiuntivi durante la ricerca. Inoltre, l'uso di un indice di solito riduce il tasso di richiamo (anche se l'effetto è trascurabile, è comunque importante). Pertanto, questo articolo spiega come minimizzare i costi dell'uso di un indice massimizzandone i benefici.</p>
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
    </button></h2><p>In Milvus, gli indici sono specifici per i campi e i tipi di indice applicabili variano a seconda dei tipi di dati dei campi di destinazione. In quanto database vettoriale professionale, Milvus si concentra sul miglioramento delle prestazioni delle ricerche vettoriali e del filtraggio scalare, per questo offre diversi tipi di indice.</p>
<p>La tabella seguente elenca la relazione di mappatura tra i tipi di dati del campo e i tipi di indice applicabili.</p>
<table>
   <tr>
     <th><p>Tipo di dati del campo</p></th>
     <th><p>Tipi di indice applicabili</p></th>
   </tr>
   <tr>
     <td><ul><li><p>VETTORE_FIAT</p></li><li><p>VETTORE_FLAT16</p></li><li><p>BFLOAT16_VECTOR</p></li></ul></td>
     <td><ul><li><p>PIATTO</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>HNSW</p></li><li><p>DISKANN</p></li></ul></td>
   </tr>
   <tr>
     <td><p>VETTORE BINARIO</p></td>
     <td><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
   </tr>
   <tr>
     <td><p>VETTORE_FLAT SPARSE</p></td>
     <td><p>INDICE SPARSO_INVERTITO</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>INVERTITO (consigliato)</p></li><li><p>BITMAP</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li>BITMAP (consigliato)</li><li>INVERTITO</li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li>INVERTITO</li><li>STL_SORT</li></ul></td>
   </tr>
   <tr>
     <td><ul><li>FIORITO</li><li>DOPPIO</li></ul></td>
     <td><p>INVERTITO</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(elementi dei tipi BOOL, INT8/16/32/64 e VARCHAR)</sup></p></td>
     <td><p>BITMAP (consigliato)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(elementi dei tipi BOOL, INT8/16/32/64, FLOAT, DOUBLE e VARCHAR)</sup></p></td>
     <td><p>INVERTITO</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>INVERTITO</p></td>
   </tr>
</table>
<p>Questo articolo si concentra su come selezionare gli indici vettoriali appropriati. Per i campi scalari, è sempre possibile utilizzare il tipo di indice consigliato.</p>
<p>La scelta di un tipo di indice appropriato per una ricerca vettoriale può avere un impatto significativo sulle prestazioni e sull'utilizzo delle risorse. Quando si sceglie un tipo di indice per un campo vettoriale, è essenziale considerare vari fattori, tra cui la struttura dei dati sottostante, l'uso della memoria e i requisiti di prestazione.</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">Anatomia dell'indice vettoriale<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Come illustrato nel diagramma seguente, un tipo di indice in Milvus è costituito da tre componenti fondamentali: la <strong>struttura dei dati</strong>, la <strong>quantizzazione</strong> e il <strong>raffinatore</strong>. La quantizzazione e il raffinatore sono opzionali, ma sono ampiamente utilizzati grazie a un significativo equilibrio tra guadagni e costi.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" />
   </span> <span class="img-wrapper"> <span>Anatomia dell'indice vettoriale</span> </span></p>
<p>Durante la creazione dell'indice, Milvus combina la struttura dei dati e il metodo di quantizzazione scelti per determinare un <strong>tasso di espansione</strong> ottimale. Al momento dell'interrogazione, il sistema recupera <code translate="no">topK × expansion rate</code> vettori candidati, applica il raffinatore per ricalcolare le distanze con maggiore precisione e infine restituisce i risultati <code translate="no">topK</code> più accurati. Questo approccio ibrido bilancia velocità e precisione limitando il raffinamento, che richiede molte risorse, a un sottoinsieme filtrato di candidati.</p>
<h3 id="Data-structure" class="common-anchor-header">Struttura dei dati</h3><p>La struttura dei dati costituisce il livello fondamentale dell'indice. I tipi più comuni sono:</p>
<ul>
<li><p><strong>File invertito (IVF)</strong></p>
<p>I tipi di indice della serie IVF consentono a Milvus di raggruppare i vettori in bucket attraverso un partizionamento basato sui centroidi. In genere si può presumere che tutti i vettori di un bucket siano vicini al vettore di interrogazione se il centroide del bucket è vicino al vettore di interrogazione. Sulla base di questa premessa, Milvus analizza solo le incorporazioni vettoriali nei bucket in cui i centroidi sono vicini al vettore di interrogazione, invece di esaminare l'intero set di dati. Questa strategia riduce i costi computazionali mantenendo un'accuratezza accettabile.</p>
<p>Questo tipo di struttura dei dati dell'indice è ideale per i dataset di grandi dimensioni che richiedono un throughput veloce.</p></li>
<li><p><strong>Struttura a grafo</strong></p>
<p>Una struttura di dati a grafo per la ricerca vettoriale, come Hierarchical Navigable Small World<a href="https://arxiv.org/abs/1603.09320">(HNSW</a>), costruisce un grafo a strati in cui ogni vettore si collega ai suoi vicini più prossimi. Le query navigano in questa gerarchia, partendo dai livelli superiori più grossolani e passando per quelli inferiori, consentendo un'efficiente complessità di ricerca in tempo logaritmico.</p>
<p>Questo tipo di struttura dei dati dell'indice eccelle negli spazi ad alta dimensionalità e negli scenari che richiedono query a bassa latenza.</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">Quantizzazione</h3><p>La quantizzazione riduce l'ingombro di memoria e i costi di calcolo grazie a una rappresentazione più grossolana:</p>
<ul>
<li><p>La<strong>quantizzazione scalare</strong> (ad esempio <strong>SQ8</strong>) consente a Milvus di comprimere ogni dimensione vettoriale in un singolo byte (8 bit), riducendo l'utilizzo della memoria del 75% rispetto ai float a 32 bit, pur mantenendo una ragionevole precisione.</p></li>
<li><p><strong>La quantizzazione del prodotto</strong><strong>(PQ</strong>) consente a Milvus di dividere i vettori in sottovettori e di codificarli utilizzando un clustering basato su codebook. In questo modo si ottengono rapporti di compressione più elevati (ad esempio, 4-32x) al costo di un richiamo marginalmente ridotto, rendendolo adatto ad ambienti con limitazioni di memoria.</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">Raffinatore</h3><p>La quantizzazione è intrinsecamente soggetta a perdite. Per mantenere il tasso di richiamo, la quantizzazione produce costantemente un numero di candidati top-K superiore al necessario, consentendo ai raffinatori di utilizzare una maggiore precisione per selezionare ulteriormente i risultati top-K da questi candidati, migliorando il tasso di richiamo.</p>
<p>Ad esempio, il raffinatore FP32 opera sui risultati di ricerca restituiti dalla quantizzazione ricalcolando le distanze utilizzando la precisione FP32 anziché i valori quantizzati.</p>
<p>Ciò è fondamentale per le applicazioni che richiedono un compromesso tra efficienza della ricerca e precisione, come la ricerca semantica o i sistemi di raccomandazione, dove piccole variazioni di distanza hanno un impatto significativo sulla qualità dei risultati.</p>
<h3 id="Summary" class="common-anchor-header">Sintesi</h3><p>Questa architettura a livelli - filtraggio grossolano tramite strutture di dati, calcolo efficiente tramite quantizzazione e regolazione della precisione tramite raffinamento - consente a Milvus di ottimizzare il compromesso accuratezza-prestazioni in modo adattivo.</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">Scambi di prestazioni<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando si valutano le prestazioni, è fondamentale bilanciare il <strong>tempo di compilazione</strong>, le <strong>query al secondo (QPS)</strong> e il <strong>tasso di richiamo</strong>. Le regole generali sono le seguenti:</p>
<ul>
<li><p><strong>I tipi di indice basati su grafi</strong> di solito superano le <strong>varianti FIV</strong> in termini di <strong>QPS</strong>.</p></li>
<li><p><strong>Le varianti IVF</strong> sono particolarmente adatte agli scenari con <strong>un topK elevato (ad esempio, oltre 2.000)</strong>.</p></li>
<li><p><strong>PQ</strong> offre in genere un tasso di richiamo migliore a tassi di compressione simili rispetto a <strong>SQ</strong>, anche se quest'ultimo offre prestazioni più veloci.</p></li>
<li><p>L'utilizzo di dischi rigidi per una parte dell'indice (come in <strong>DiskANN</strong>) aiuta a gestire grandi insiemi di dati, ma introduce anche potenziali colli di bottiglia IOPS.</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">Capacità</h3><p>La capacità di solito riguarda il rapporto tra le dimensioni dei dati e la RAM disponibile. Quando si parla di capacità, si consideri quanto segue:</p>
<ul>
<li><p>Se un quarto dei dati grezzi si inserisce nella memoria, considerare DiskANN per la sua latenza stabile.</p></li>
<li><p>Se tutti i dati grezzi entrano in memoria, considerare i tipi di indice basati sulla memoria e mmap.</p></li>
<li><p>È possibile utilizzare i tipi di indice applicati alla quantizzazione e mmap per scambiare la precisione con la massima capacità.</p></li>
</ul>
<div class="alert note">
<p>Mmap non è sempre la soluzione. Quando la maggior parte dei dati è su disco, DiskANN offre una migliore latenza.</p>
</div>
<h3 id="Recall" class="common-anchor-header">Richiamo</h3><p>Il richiamo di solito coinvolge il rapporto di filtraggio, che si riferisce ai dati che vengono filtrati prima delle ricerche. Quando si tratta di richiamo, considerare quanto segue:</p>
<ul>
<li><p>Se il rapporto di filtraggio è inferiore all'85%, i tipi di indice basati su grafi superano le varianti FIV.</p></li>
<li><p>Se il rapporto di filtraggio è compreso tra l'85% e il 95%, utilizzare le varianti FIV.</p></li>
<li><p>Se il rapporto di filtraggio è superiore al 98%, utilizzare Brute-Force (FLAT) per ottenere risultati di ricerca più accurati.</p></li>
</ul>
<div class="alert note">
<p>Le voci di cui sopra non sono sempre corrette. Si consiglia di sintonizzare il richiamo con diversi tipi di indice per determinare quale tipo di indice funziona.</p>
</div>
<h3 id="Performance" class="common-anchor-header">Prestazioni</h3><p>Le prestazioni di una ricerca riguardano solitamente il top-K, che si riferisce al numero di record restituiti dalla ricerca. Quando si parla di prestazioni, si deve considerare quanto segue:</p>
<ul>
<li><p>Per una ricerca con un top-K piccolo (ad esempio, 2.000) che richiede un alto tasso di richiamo, i tipi di indice a grafo superano le varianti FIV.</p></li>
<li><p>Per una ricerca con un top-K elevato (rispetto al numero totale di incorporazioni vettoriali), le varianti IVF sono una scelta migliore rispetto ai tipi di indice basati su grafi.</p></li>
<li><p>Per una ricerca con un top-K medio e un elevato rapporto di filtraggio, le varianti FIV sono la scelta migliore.</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">Matrice decisionale: Scelta del tipo di indice più appropriato</h3><p>La tabella seguente è una matrice decisionale a cui fare riferimento per la scelta del tipo di indice più appropriato.</p>
<table>
   <tr>
     <th><p>Scenario</p></th>
     <th><p>Indice consigliato</p></th>
     <th><p>Note</p></th>
   </tr>
   <tr>
     <td><p>I dati grezzi sono memorizzabili</p></td>
     <td><p>HNSW, IVF + raffinamento</p></td>
     <td><p>Utilizzare HNSW per un basso<code translate="no">k</code>/alto richiamo.</p></td>
   </tr>
   <tr>
     <td><p>Dati grezzi su disco, SSD</p></td>
     <td><p>DiscoANN</p></td>
     <td><p>Ottimale per le query sensibili alla latenza.</p></td>
   </tr>
   <tr>
     <td><p>Dati grezzi su disco, RAM limitata</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>Bilancia l'accesso alla memoria e al disco.</p></td>
   </tr>
   <tr>
     <td><p>Alto rapporto di filtraggio (&gt;95%)</p></td>
     <td><p>Forza bruta (FLAT)</p></td>
     <td><p>Evita l'overhead dell'indice per piccoli insiemi di candidati.</p></td>
   </tr>
   <tr>
     <td><p>Grande <code translate="no">k</code> (≥1% del set di dati)</p></td>
     <td><p>FIV</p></td>
     <td><p>Il pruning dei cluster riduce i calcoli.</p></td>
   </tr>
   <tr>
     <td><p>Tasso di richiamo estremamente elevato (&gt;99%)</p></td>
     <td><p>Forza bruta (FLAT) + GPU</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<h2 id="Memory-usage-estimation" class="common-anchor-header">Stima dell'utilizzo della memoria<button data-href="#Memory-usage-estimation" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>Questa sezione si concentra sul calcolo del consumo di memoria di un tipo specifico di indice e include molti dettagli tecnici. È possibile saltare tranquillamente questa sezione se non corrisponde ai propri interessi.</p>
</div>
<p>Il consumo di memoria di un indice è influenzato dalla sua struttura di dati, dal tasso di compressione tramite quantizzazione e dal raffinatore in uso. In generale, gli indici basati su grafi hanno un ingombro di memoria più elevato a causa della struttura del grafo (ad esempio, <strong>HNSW</strong>), che di solito implica un notevole sovraccarico di spazio per vettore. Al contrario, la FIV e le sue varianti sono più efficienti dal punto di vista della memoria, poiché l'overhead di spazio per vettore è minore. Tuttavia, tecniche avanzate come <strong>DiskANN</strong> consentono a parti dell'indice, come il grafico o il raffinatore, di risiedere su disco, riducendo il carico di memoria e mantenendo le prestazioni.</p>
<p>In particolare, l'utilizzo della memoria di un indice può essere calcolato come segue:</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">Utilizzo della memoria dell'indice IVF</h3><p>Gli indici FIV bilanciano l'efficienza della memoria con le prestazioni di ricerca partizionando i dati in cluster. Di seguito è riportata una ripartizione della memoria utilizzata da 1 milione di vettori a 128 dimensioni indicizzati con le varianti FIV.</p>
<ol>
<li><p><strong>Calcolo della memoria utilizzata dai centroidi.</strong></p>
<p>I tipi di indice della serie IVF consentono a Milvus di raggruppare i vettori in bucket utilizzando un partizionamento basato sui centroidi. Ogni centroide è incluso nell'indice nell'incorporazione vettoriale grezza. Quando si dividono i vettori in 2.000 cluster, l'utilizzo della memoria può essere calcolato come segue:</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcolo della memoria utilizzata dalle assegnazioni ai cluster.</strong></p>
<p>Ogni incorporazione vettoriale viene assegnata a un cluster e memorizzata come ID intero. Per 2.000 cluster è sufficiente un numero intero di 2 byte. L'utilizzo della memoria può essere calcolato come segue:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcolare la compressione causata dalla quantizzazione.</strong></p>
<p>Le varianti della FIV utilizzano tipicamente PQ e SQ8 e l'utilizzo della memoria può essere stimato come segue:</p>
<ul>
<li><p>Utilizzo di PQ con 8 subquantizzatori</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Utilizzo di SQ8</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>La tabella seguente elenca l'utilizzo di memoria stimato con diverse configurazioni:</p>
<p><table>
<tr>
<th><p>Configurazione</p></th>
<th><p>Stima della memoria</p></th>
<th><p>Memoria totale</p></th>
</tr>
<tr>
<td><p>FIV-PQ (senza affinamento)</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB</p></td>
<td><p>11,0 MB</p></td>
</tr>
<tr>
<td><p>FIV-PQ + 10% di raffinazione grezza</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB + 51,2 MB</p></td>
<td><p>62,2 MB</p></td>
</tr>
<tr>
<td><p>FIV-SQ8 (senza raffinazione)</p></td>
<td><p>1,0 MB + 2,0 MB + 128 MB</p></td>
<td><p>131,0 MB</p></td>
</tr>
<tr>
<td><p>FIV-FLAT (vettori grezzi completi)</p></td>
<td><p>1,0 MB + 2,0 MB + 512 MB</p></td>
<td><p>515,0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>Calcolare l'overhead di raffinazione.</strong></p>
<p>Le varianti FIV sono spesso abbinate a un raffinatore per riordinare i candidati. Per una ricerca che recupera i primi 10 risultati con un tasso di espansione di 5, il refinement overhead può essere stimato come segue:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">Utilizzo della memoria degli indici a grafo</h3><p>Gli indici basati su grafi, come HNSW, richiedono una memoria significativa per memorizzare sia la struttura del grafo sia le incorporazioni vettoriali grezze. Di seguito è riportata una ripartizione dettagliata della memoria consumata da 1 milione di vettori a 128 dimensioni indicizzati con il tipo di indice HNSW.</p>
<ol>
<li><p><strong>Calcolo della memoria utilizzata dalla struttura del grafo.</strong></p>
<p>Ogni vettore in HNSW mantiene le connessioni con i suoi vicini. Con un grado del grafo (bordi per nodo) di 32, la memoria consumata può essere calcolata come segue:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcolare la memoria utilizzata dalle incorporazioni vettoriali grezze.</strong></p>
<p>La memoria consumata dalla memorizzazione di vettori FP32 non compressi può essere calcolata come segue:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>Quando si usa HNSW per indicizzare 1 milione di embeddings vettoriali a 128 dimensioni, la memoria totale utilizzata è di <strong>128 MB (grafico) + 512 MB (vettori) = 640 MB</strong>.</p></li>
<li><p><strong>Calcolare la compressione causata dalla quantizzazione.</strong></p>
<p>La quantizzazione riduce le dimensioni dei vettori. Ad esempio, utilizzando PQ con 8 subquantizzatori (8 byte per vettore) si ottiene una drastica compressione. La memoria consumata dalle incorporazioni vettoriali compresse può essere calcolata come segue:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>In questo modo si ottiene un tasso di compressione di 64 volte rispetto alle incorporazioni vettoriali grezze, e la memoria totale utilizzata dal tipo di indice <strong>HNSWPQ</strong> sarebbe di <strong>128 MB (grafico) + 8 MB (vettore compresso) = 136 MB</strong>.</p></li>
<li><p><strong>Calcolare il refinement overhead.</strong></p>
<p>Il raffinamento, come la ri-classificazione con vettori grezzi, carica temporaneamente in memoria dati ad alta precisione. Per una ricerca che recupera i primi 10 risultati con un tasso di espansione di 5, il refinement overhead può essere stimato come segue:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">Altre considerazioni</h3><p>Mentre la FIV e gli indici a grafo ottimizzano l'uso della memoria attraverso la quantizzazione, i file mappati in memoria (mmap) e DiskANN affrontano scenari in cui gli insiemi di dati superano la memoria ad accesso casuale (RAM) disponibile.</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN è un indice basato sul grafo Vamana che collega i punti di dati per una navigazione efficiente durante la ricerca, applicando al contempo PQ per ridurre le dimensioni dei vettori e consentire un rapido calcolo approssimativo della distanza tra i vettori.</p>
<p>Il grafo di Vamana è memorizzato su disco, il che consente a DiskANN di gestire insiemi di dati di grandi dimensioni che altrimenti sarebbero troppo grandi per essere memorizzati. Ciò è particolarmente utile per gli insiemi di dati da un miliardo di punti.</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">File mappati in memoria (mmap)</h4><p>La mappatura della memoria (Mmap) consente l'accesso diretto alla memoria a file di grandi dimensioni su disco, permettendo a Milvus di memorizzare indici e dati sia nella memoria che sul disco rigido. Questo approccio consente di ottimizzare le operazioni di I/O riducendo l'overhead delle chiamate di I/O in base alla frequenza di accesso, ampliando così la capacità di archiviazione delle raccolte senza incidere significativamente sulle prestazioni di ricerca.</p>
<p>In particolare, è possibile configurare Milvus per mappare in memoria i dati grezzi di alcuni campi invece di caricarli completamente in memoria. In questo modo, è possibile ottenere l'accesso diretto alla memoria dei campi senza preoccuparsi dei problemi di memoria ed estendere la capacità della raccolta.</p>
