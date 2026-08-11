---
id: index-explained.md
title: Spiegazione dell'indice
summary: >-
  Un indice è una struttura aggiuntiva costruita sui dati. La sua struttura
  interna dipende dall’algoritmo di ricerca del vicino più prossimo
  approssimativo utilizzato. Un indice accelera la ricerca, ma comporta un
  aumento dei tempi di pre-elaborazione, dello spazio e della RAM utilizzati
  durante la ricerca. Inoltre, l’uso di un indice in genere riduce il tasso di
  richiamo (sebbene l’effetto sia trascurabile, è comunque rilevante). Pertanto,
  questo articolo spiega come ridurre al minimo i costi legati all’uso di un
  indice, massimizzandone al contempo i benefici.
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
    </button></h1><p>Un indice è una struttura aggiuntiva costruita sui dati. La sua struttura interna dipende dall'algoritmo di ricerca del vicino più prossimo approssimativo utilizzato. Un indice accelera la ricerca, ma comporta un aumento del tempo di pre-elaborazione, dello spazio e della RAM utilizzati durante la ricerca. Inoltre, l'uso di un indice in genere riduce il tasso di richiamo (sebbene l'effetto sia trascurabile, è comunque rilevante). Pertanto, questo articolo spiega come ridurre al minimo i costi legati all’uso di un indice massimizzandone al contempo i benefici.</p>
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
    </button></h2><p>In Milvus, gli indici sono specifici per i campi e i tipi di indice applicabili variano a seconda dei tipi di dati dei campi di destinazione. In quanto database vettoriale professionale, Milvus si concentra sul miglioramento sia delle prestazioni delle ricerche vettoriali che del filtraggio scalare, motivo per cui offre vari tipi di indice.</p>
<p>La tabella seguente elenca la relazione di mappatura tra i tipi di dati dei campi e i tipi di indice applicabili.</p>
<table>
   <tr>
     <th><p>Tipo di dati del campo</p></th>
     <th><p>Tipi di indice applicabili</p></th>
   </tr>
   <tr>
     <td><p>FLOAT_VECTOR</p></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>FAISS</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_BRUTE_FORCE</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT16_VECTOR</p></li><li><p>BFLOAT16_VETTORE</p></li><li><p>INT8_VETTORE</p></li></ul></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_BRUTE_FORCE</p></li></ul></td>
   </tr>
   <tr>
     <td><p>VETTORE_BINARIO</p></td>
     <td><ul><li><p>BIN_FLAT</p></li><li><p>BIN_IVF_FLAT</p></li><li><p>MINHASH_LSH</p></li><li><p>FAISS</p></li></ul></td>
   </tr>
   <tr>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
     <td><p>SPARSE_INDICE_INVERTITO</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>INVERTITO (consigliato)</p></li><li><p>BITMAP</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li><p>BITMAP (consigliato)</p></li><li><p>INVERTITO</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li><p>INVERTITO</p></li><li><p>STL_SORT</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT</p></li><li><p>DOPPIO</p></li></ul></td>
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
<p>La scelta di un tipo di indice appropriato per una ricerca vettoriale può influire in modo significativo sulle prestazioni e sull'utilizzo delle risorse. Quando si sceglie un tipo di indice per un campo vettoriale, è essenziale considerare vari fattori, tra cui la struttura dei dati sottostante, l'utilizzo della memoria e i requisiti di prestazione.</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">Anatomia dell’indice vettoriale<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Come illustrato nel diagramma sottostante, un tipo di indice in Milvus è costituito da tre componenti principali: <strong>struttura dei dati</strong>, <strong>quantizzazione</strong> e <strong>rifinitore</strong>. La quantizzazione e il rifinitore sono opzionali, ma sono ampiamente utilizzati grazie a un equilibrio significativo tra vantaggi e costi.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" /> 
   <span>Anatomia dell’indice vettoriale</span>
  
 </span></p>
<p>Durante la creazione dell’indice, Milvus combina la struttura dati e il metodo di quantizzazione scelti per determinare un <strong>tasso di espansione</strong> ottimale. Al momento della query, il sistema recupera un <code translate="no">topK × expansion rate</code> i vettori candidati, applica il rifinitore per ricalcolare le distanze con maggiore precisione e, infine, restituisce i risultati più accurati <code translate="no">topK</code>. Questo approccio ibrido bilancia velocità e accuratezza limitando il raffinamento, che richiede un elevato impiego di risorse, a un sottoinsieme filtrato di candidati.</p>
<h3 id="Data-structure" class="common-anchor-header">Struttura dei dati<button data-href="#Data-structure" class="anchor-icon" translate="no">
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
    </button></h3><p>La struttura dei dati costituisce il livello fondamentale dell’indice. Tra i tipi più comuni figurano:</p>
<ul>
<li><p><strong>File invertito (IVF)</strong></p>
<p>I tipi di indice della serie IVF consentono a Milvus di raggruppare i vettori in bucket tramite una partizione basata sui centroidi. In genere è lecito supporre che tutti i vettori presenti in un bucket siano probabilmente vicini al vettore di query se il centroide del bucket è vicino al vettore di query. Partendo da questa premessa, Milvus esamina solo le rappresentazioni vettoriali presenti nei bucket in cui i centri di massa sono vicini al vettore di query, anziché analizzare l’intero set di dati. Questa strategia riduce i costi computazionali mantenendo al contempo un livello di precisione accettabile.</p>
<p>Questo tipo di struttura dati dell’indice è ideale per set di dati su larga scala che richiedono un throughput elevato.</p></li>
<li><p><strong>Struttura basata su grafi</strong></p>
<p>Una struttura di dati basata su grafi per la ricerca vettoriale, come Hierarchical Navigable Small World (<a href="https://arxiv.org/abs/1603.09320">HNSW</a>), costruisce un grafo a livelli in cui ogni vettore si collega ai propri vicini più prossimi. Le query navigano in questa gerarchia, partendo dai livelli superiori più generici e passando ai livelli inferiori, consentendo una complessità di ricerca efficiente in tempo logaritmico.</p>
<p>Questo tipo di struttura dati a indice eccelle negli spazi ad alta dimensionalità e negli scenari che richiedono query a bassa latenza.</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">Quantizzazione<button data-href="#Quantization" class="anchor-icon" translate="no">
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
    </button></h3><p>La quantizzazione riduce l’impronta di memoria e i costi computazionali attraverso una rappresentazione più approssimativa:</p>
<ul>
<li><p><strong>La quantizzazione scalare</strong> (ad es. <strong>SQ8</strong>) consente a Milvus di comprimere ogni dimensione vettoriale in un singolo byte (8 bit), riducendo l’utilizzo di memoria del 75% rispetto ai valori in virgola mobile a 32 bit, pur mantenendo una precisione ragionevole.</p></li>
<li><p><strong>La quantizzazione del prodotto</strong> (<strong>PQ</strong>) consente a Milvus di suddividere i vettori in sottovettori e codificarli utilizzando il clustering basato su codebook. Ciò consente di ottenere rapporti di compressione più elevati (ad es. da 4 a 32 volte) a costo di una riduzione marginale del recall, rendendola adatta ad ambienti con limitazioni di memoria.</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">Raffinatore<button data-href="#Refiner" class="anchor-icon" translate="no">
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
    </button></h3><p>La quantizzazione comporta intrinsecamente una perdita di informazioni. Per mantenere il tasso di richiamo, la quantizzazione produce costantemente un numero di candidati top-K superiore al necessario, consentendo ai raffinatori di utilizzare una precisione maggiore per selezionare ulteriormente i risultati top-K tra questi candidati, migliorando così il tasso di richiamo.</p>
<p>Ad esempio, il raffinatore FP32 opera sui candidati dei risultati di ricerca restituiti dalla quantizzazione ricalcolando le distanze utilizzando la precisione FP32 anziché i valori quantizzati.</p>
<p>Ciò è fondamentale per le applicazioni che richiedono un compromesso tra efficienza di ricerca e precisione, come la ricerca semantica o i sistemi di raccomandazione, in cui variazioni minime di distanza incidono significativamente sulla qualità dei risultati.</p>
<h3 id="Summary" class="common-anchor-header">Sintesi<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h3><p>Questa architettura a più livelli – filtraggio grossolano tramite strutture dati, calcolo efficiente tramite quantizzazione e messa a punto della precisione tramite affinamento – consente a Milvus di ottimizzare in modo adattivo il compromesso tra accuratezza e prestazioni.</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">Compromessi in termini di prestazioni<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>Nel valutare le prestazioni, è fondamentale bilanciare <strong>il tempo di compilazione</strong>, <strong>le query al secondo (QPS)</strong> e <strong>il tasso di richiamo</strong>. Le regole generali sono le seguenti:</p>
<ul>
<li><p><strong>I tipi di indice basati su grafi</strong> di solito superano <strong>le varianti IVF</strong> in termini di <strong>QPS</strong>.</p></li>
<li><p><strong>Le varianti IVF</strong> sono particolarmente adatte a scenari con <strong>un topK elevato (ad esempio, superiore a 2.000)</strong>.</p></li>
<li><p><strong>PQ</strong> offre in genere un tasso di richiamo migliore a tassi di compressione simili rispetto a <strong>SQ</strong>, sebbene quest’ultimo garantisca prestazioni più veloci.</p></li>
<li><p>L'utilizzo di dischi rigidi per una parte dell'indice (come in <strong>DiskANN</strong>) aiuta a gestire set di dati di grandi dimensioni, ma introduce anche potenziali colli di bottiglia a livello di IOPS.</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">Capacità<button data-href="#Capacity" class="anchor-icon" translate="no">
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
    </button></h3><p>La capacità di solito riguarda il rapporto tra la dimensione dei dati e la RAM disponibile. Quando si ha a che fare con la capacità, considerare quanto segue:</p>
<ul>
<li><p>Se un quarto dei dati grezzi rientra nella memoria, prendere in considerazione DiskANN per la sua latenza stabile.</p></li>
<li><p>Se tutti i dati grezzi rientrano nella memoria, prendete in considerazione i tipi di indice basati sulla memoria e mmap.</p></li>
<li><p>È possibile utilizzare i tipi di indice con quantizzazione applicata e mmap per sacrificare la precisione a favore della massima capacità.</p></li>
</ul>
<div class="alert note">
<p>Mmap non è sempre la soluzione ideale. Quando la maggior parte dei dati si trova su disco, DiskANN garantisce una latenza migliore.</p>
</div>
<h3 id="Recall" class="common-anchor-header">Recall<button data-href="#Recall" class="anchor-icon" translate="no">
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
    </button></h3><p>Il richiamo di solito dipende dal rapporto di filtraggio, che si riferisce ai dati che vengono filtrati prima delle ricerche. Quando si parla di richiamo, tieni presente quanto segue:</p>
<ul>
<li><p>Se il rapporto di filtraggio è inferiore all’85%, i tipi di indice basati su grafi offrono prestazioni migliori rispetto alle varianti IVF.</p></li>
<li><p>Se il rapporto di filtraggio è compreso tra l’85% e il 95%, utilizzare le varianti IVF.</p></li>
<li><p>Se il rapporto di filtraggio è superiore al 98%, utilizzare Brute-Force (FLAT) per ottenere risultati di ricerca più accurati.</p></li>
</ul>
<div class="alert note">
<p>Le indicazioni di cui sopra non sono sempre valide. Si consiglia di ottimizzare il richiamo con diversi tipi di indice per determinare quale sia il più efficace.</p>
</div>
<h3 id="Performance" class="common-anchor-header">Prestazioni<button data-href="#Performance" class="anchor-icon" translate="no">
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
    </button></h3><p>Le prestazioni di una ricerca dipendono solitamente dal top-K, ovvero dal numero di record restituiti dalla ricerca. Quando si valutano le prestazioni, tenere presente quanto segue:</p>
<ul>
<li><p>Per una ricerca con un top-K ridotto (ad es. 2.000) che richiede un alto tasso di richiamo, i tipi di indice basati su grafi offrono prestazioni migliori rispetto alle varianti IVF.</p></li>
<li><p>Per una ricerca con un top-K elevato (rispetto al numero totale di embedding vettoriali), le varianti IVF rappresentano una scelta migliore rispetto ai tipi di indice basati su grafi.</p></li>
<li><p>Per una ricerca con un top-K di medie dimensioni e un rapporto di filtraggio elevato, le varianti IVF rappresentano la scelta migliore.</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">Matrice decisionale: scelta del tipo di indice più appropriato<button data-href="#Decision-Matrix-Choosing-the-most-appropriate-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>La tabella seguente è una matrice decisionale a cui fare riferimento nella scelta di un tipo di indice appropriato.</p>
<table>
   <tr>
     <th><p>Scenario</p></th>
     <th><p>Indice consigliato</p></th>
     <th><p>Note</p></th>
   </tr>
   <tr>
     <td><p>I dati grezzi rientrano nella memoria</p></td>
     <td><p>HNSW, IVF + Refinement</p></td>
     <td><p>Utilizzare HNSW per un basso<code translate="no">k</code> o e un alto recall.</p></td>
   </tr>
   <tr>
     <td><p>Dati grezzi su disco, SSD</p></td>
     <td><p>DiskANN</p></td>
     <td><p>Ottimale per query sensibili alla latenza.</p></td>
   </tr>
   <tr>
     <td><p>Dati grezzi su disco, RAM limitata</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>Bilancia l'accesso alla memoria e al disco.</p></td>
   </tr>
   <tr>
     <td><p>Elevato rapporto di filtraggio (&gt;95%)</p></td>
     <td><p>Brute-Force (FLAT)</p></td>
     <td><p>Evita il sovraccarico dell'indice per insiemi di candidati molto piccoli.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">k</code> e ampio (≥1% del set di dati)</p></td>
     <td><p>IVF</p></td>
     <td><p>Il pruning dei cluster riduce il carico di calcolo.</p></td>
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
<p>Questa sezione si concentra sul calcolo del consumo di memoria di un tipo specifico di indice e include molti dettagli tecnici. È possibile saltare tranquillamente questa sezione se non è di proprio interesse.</p>
</div>
<p>Il consumo di memoria di un indice è influenzato dalla sua struttura dei dati, dal tasso di compressione ottenuto tramite quantizzazione e dal refiner in uso. In generale, gli indici basati su grafi hanno solitamente un ingombro di memoria maggiore a causa della struttura del grafo (ad esempio, <strong>HNSW</strong>), che di solito comporta un notevole overhead per spazio vettoriale. Al contrario, l’IVF e le sue varianti sono più efficienti in termini di memoria poiché comportano un minore overhead per spazio vettoriale. Tuttavia, tecniche avanzate come <strong>DiskANN</strong> consentono a parti dell’indice, come il grafo o il refiner, di risiedere su disco, riducendo il carico di memoria pur mantenendo le prestazioni.</p>
<p>Nello specifico, l’utilizzo di memoria di un indice può essere calcolato come segue:</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">Utilizzo di memoria degli indici IVF<button data-href="#IVF-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>Gli indici IVF bilanciano l’efficienza della memoria con le prestazioni di ricerca suddividendo i dati in cluster. Di seguito è riportata una ripartizione della memoria utilizzata da 1 milione di vettori a 128 dimensioni indicizzati utilizzando varianti dell’IVF.</p>
<ol>
<li><p><strong>Calcolo della memoria utilizzata dai centroidi.</strong></p>
<p>I tipi di indice della serie IVF consentono a Milvus di raggruppare i vettori in bucket utilizzando una partizionamento basato sui centroidi. Ogni centroide è incluso nell’indice sotto forma di embedding vettoriale grezzo. Quando si dividono i vettori in 2.000 cluster, l’utilizzo di memoria può essere calcolato come segue:</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcolare la memoria utilizzata dalle assegnazioni ai cluster.</strong></p>
<p>Ogni embedding vettoriale viene assegnato a un cluster e memorizzato come ID intero. Per 2.000 cluster, è sufficiente un intero a 2 byte. L’utilizzo di memoria può essere calcolato come segue:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcolare la compressione causata dalla quantizzazione.</strong></p>
<p>Le varianti IVF utilizzano in genere PQ e SQ8, e l’utilizzo di memoria può essere stimato come segue:</p>
<ul>
<li><p>Utilizzo di PQ con 8 sottocuantizzatori</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Utilizzo di SQ8</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>La tabella seguente elenca l’utilizzo stimato di memoria con diverse configurazioni:</p>
<p><table>
<tr>
<th><p>Configurazione</p></th>
<th><p>Stima della memoria</p></th>
<th><p>Memoria totale</p></th>
</tr>
<tr>
<td><p>IVF-PQ (senza raffinamento)</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB</p></td>
<td><p>11,0 MB</p></td>
</tr>
<tr>
<td><p>IVF-PQ + 10% di raffinamento grezzo</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB + 51,2 MB</p></td>
<td><p>62,2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8 (senza affinamento)</p></td>
<td><p>1,0 MB + 2,0 MB + 128 MB</p></td>
<td><p>131,0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT (vettori grezzi completi)</p></td>
<td><p>1,0 MB + 2,0 MB + 512 MB</p></td>
<td><p>515,0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>Calcolare il sovraccarico di raffinamento.</strong></p>
<p>Le varianti IVF sono spesso abbinate a un raffinatore per riclassificare i candidati. Per una ricerca che recupera i primi 10 risultati con un tasso di espansione pari a 5, il sovraccarico di raffinamento può essere stimato come segue:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">Utilizzo della memoria degli indici basati su grafi<button data-href="#Graph-based-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>I tipi di indice basati su grafo come HNSW richiedono una notevole quantità di memoria per memorizzare sia la struttura del grafo che gli embedding vettoriali grezzi. Di seguito è riportata una ripartizione dettagliata della memoria consumata da 1 milione di vettori a 128 dimensioni indicizzati utilizzando il tipo di indice HNSW.</p>
<ol>
<li><p><strong>Calcolo della memoria utilizzata dalla struttura del grafo.</strong></p>
<p>Ogni vettore in HNSW mantiene connessioni con i propri vicini. Con un grado del grafo (spigoli per nodo) pari a 32, la memoria consumata può essere calcolata come segue:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcolare la memoria utilizzata dagli embedding vettoriali grezzi.</strong></p>
<p>La memoria consumata dalla memorizzazione di vettori FP32 non compressi può essere calcolata come segue:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>Quando si utilizza HNSW per indicizzare 1 milione di vettori di embedding a 128 dimensioni, la memoria totale utilizzata sarebbe pari a <strong>128 MB (grafo) + 512 MB (vettori) = 640 MB</strong>.</p></li>
<li><p><strong>Calcolare la compressione ottenuta grazie alla quantizzazione.</strong></p>
<p>La quantizzazione riduce le dimensioni dei vettori. Ad esempio, l’utilizzo di PQ con 8 sottocuantizzatori (8 byte per vettore) comporta una compressione drastica. La memoria consumata dagli embedding vettoriali compressi può essere calcolata come segue:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>Si ottiene così un rapporto di compressione di 64 volte rispetto alle rappresentazioni vettoriali non compresse, e la memoria totale utilizzata dal tipo di indice <strong>HNSWPQ</strong> sarebbe pari a <strong>128 MB (grafo) + 8 MB (vettori compressi) = 136 MB</strong>.</p></li>
<li><p><strong>Calcolare il sovraccarico di affinamento.</strong></p>
<p>Le operazioni di affinamento, come il riordino dei risultati con vettori non compressi, comportano il caricamento temporaneo in memoria di dati ad alta precisione. Per una ricerca che restituisce i primi 10 risultati con un tasso di espansione pari a 5, il sovraccarico di affinamento può essere stimato come segue:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">Altre considerazioni<button data-href="#Other-considerations" class="anchor-icon" translate="no">
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
    </button></h3><p>Mentre gli indici IVF e basati su grafi ottimizzano l’utilizzo della memoria tramite la quantizzazione, i file mappati in memoria (mmap) e DiskANN affrontano scenari in cui i set di dati superano la memoria ad accesso casuale (RAM) disponibile.</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN è un indice basato sul grafo Vamana che collega i punti dati per una navigazione efficiente durante la ricerca, applicando al contempo il PQ per ridurre le dimensioni dei vettori e consentire un rapido calcolo approssimativo della distanza tra i vettori.</p>
<p>Il grafo Vamana è memorizzato su disco, il che consente a DiskANN di gestire grandi set di dati che altrimenti sarebbero troppo grandi per essere contenuti in memoria. Ciò è particolarmente utile per set di dati da miliardi di punti.</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">File mappati in memoria (mmap)</h4><p>La mappatura in memoria (mmap) consente l’accesso diretto alla memoria per file di grandi dimensioni su disco, permettendo a Milvus di memorizzare indici e dati sia in memoria che su disco rigido. Questo approccio aiuta a ottimizzare le operazioni di I/O riducendo il sovraccarico delle chiamate I/O in base alla frequenza di accesso, ampliando così la capacità di archiviazione delle collezioni senza influire in modo significativo sulle prestazioni di ricerca.</p>
<p>Nello specifico, è possibile configurare Milvus per mappare in memoria i dati grezzi in determinati campi invece di caricarli interamente in memoria. In questo modo, è possibile ottenere l’accesso diretto in memoria ai campi senza preoccuparsi di problemi di memoria ed estendere la capacità della collezione.</p>
