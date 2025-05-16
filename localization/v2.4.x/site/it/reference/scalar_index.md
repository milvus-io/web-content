---
id: scalar_index.md
related_key: scalar_index
summary: Indice scalare in Milvus.
title: Indice scalare
---
<h1 id="Scalar-Index" class="common-anchor-header">Indice scalare<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus supporta ricerche filtrate che combinano campi scalari e vettoriali. Per migliorare l'efficienza delle ricerche che coinvolgono campi scalari, Milvus ha introdotto l'indicizzazione per campi scalari a partire dalla versione 2.1.0. Questo articolo fornisce una panoramica dell'indicizzazione dei campi scalari in Milvus, aiutandovi a comprenderne il significato e l'implementazione.</p>
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
    </button></h2><p>Quando si effettuano ricerche di similarità vettoriale in Milvus, è possibile utilizzare gli operatori logici per organizzare i campi scalari in espressioni booleane.</p>
<p>Quando Milvus riceve una richiesta di ricerca con una tale espressione booleana, la analizza in un albero di sintassi astratta (AST) per generare un piano fisico per il filtraggio degli attributi. Milvus applica quindi il piano fisico in ogni segmento per generare un <a href="/docs/it/v2.4.x/bitset.md">set di bit</a> come risultato del filtraggio e include il risultato come parametro di ricerca vettoriale per restringere l'ambito di ricerca. In questo caso, la velocità delle ricerche vettoriali dipende fortemente dalla velocità del filtraggio degli attributi.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scalar_index.png" alt="Attribute filtering in a segment" class="doc-image" id="attribute-filtering-in-a-segment" />
   </span> <span class="img-wrapper"> <span>Filtraggio degli attributi in un segmento</span> </span></p>
<p>L'indicizzazione dei campi scalari è un modo per garantire la velocità del filtraggio degli attributi ordinando i valori dei campi scalari in un modo particolare per accelerare il recupero delle informazioni.</p>
<h2 id="Scalar-field-indexing-algorithms" class="common-anchor-header">Algoritmi di indicizzazione dei campi scalari<button data-href="#Scalar-field-indexing-algorithms" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mira a ottenere un basso utilizzo della memoria, un'elevata efficienza di filtraggio e tempi di caricamento ridotti con i suoi algoritmi di indicizzazione dei campi scalari. Questi algoritmi si dividono in due tipi principali: <a href="#auto-indexing">indicizzazione automatica</a> e <a href="#inverted-indexing">indicizzazione inversa</a>.</p>
<h3 id="Auto-indexing" class="common-anchor-header">Indicizzazione automatica</h3><p>Milvus offre l'opzione <code translate="no">AUTOINDEX</code> per evitare di dover scegliere manualmente il tipo di indice. Quando si chiama il metodo <code translate="no">create_index</code>, se l'opzione <code translate="no">index_type</code> non è specificata, Milvus seleziona automaticamente il tipo di indice più adatto in base al tipo di dati.</p>
<p>La tabella seguente elenca i tipi di dati supportati da Milvus e i corrispondenti algoritmi di indicizzazione automatica.</p>
<table>
<thead>
<tr><th>Tipo di dati</th><th>Algoritmo di indicizzazione automatica</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>Indice invertito</td></tr>
<tr><td>INT8</td><td>Indice invertito</td></tr>
<tr><td>INT16</td><td>Indice invertito</td></tr>
<tr><td>INT32</td><td>Indice invertito</td></tr>
<tr><td>INT64</td><td>Indice invertito</td></tr>
<tr><td>FIORITO</td><td>Indice invertito</td></tr>
<tr><td>DOPPIO</td><td>Indice invertito</td></tr>
</tbody>
</table>
<h3 id="Inverted-indexing" class="common-anchor-header">Indicizzazione invertita</h3><p>L'indicizzazione invertita offre un modo flessibile per creare un indice per un campo scalare, specificando manualmente i parametri dell'indice. Questo metodo funziona bene per diversi scenari, tra cui le query a punti, le query a corrispondenza di pattern, le ricerche full-text, le ricerche JSON, le ricerche booleane e persino le query a corrispondenza di prefisso.</p>
<p>Gli indici invertiti implementati in Milvus sono alimentati da <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, una libreria per motori di ricerca full-text. Tantivy garantisce che l'indicizzazione invertita in Milvus sia efficiente e veloce.</p>
<p>Un indice invertito ha due componenti principali: un dizionario dei termini e un elenco invertito. Il dizionario dei termini comprende tutte le parole tokenizzate ordinate alfabeticamente, mentre l'elenco invertito contiene l'elenco dei documenti in cui compare ogni parola. Questa configurazione rende le interrogazioni per punti e per intervalli molto più veloci ed efficienti rispetto alle ricerche brute-force.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scalar_index_inverted.png" alt="Inverted index diagram" class="doc-image" id="inverted-index-diagram" />
   </span> <span class="img-wrapper"> <span>Schema dell'indice invertito</span> </span></p>
<p>I vantaggi dell'uso di un indice invertito sono particolarmente evidenti nelle seguenti operazioni:</p>
<ul>
<li><strong>Interrogazione a punti</strong>: Ad esempio, quando si cercano documenti contenenti la parola <strong>Milvus</strong>, il processo inizia controllando se <strong>Milvus</strong> è presente nel dizionario dei termini. Se non viene trovata, nessun documento contiene la parola. Se invece viene trovata, viene recuperata la lista invertita associata a <strong>Milvus</strong>, che indica i documenti che contengono la parola. Questo metodo è molto più efficiente di una ricerca a forza bruta in un milione di documenti, poiché il dizionario dei termini ordinato riduce significativamente la complessità temporale della ricerca della parola <strong>Milvus</strong>.</li>
<li><strong>Interrogazione di intervallo</strong>: Anche l'efficienza delle query di intervallo, come la ricerca di documenti con parole alfabeticamente maggiori di <strong>molto</strong>, è migliorata dal dizionario dei termini ordinati. Questo approccio è più efficiente rispetto a una ricerca bruta e fornisce risultati più rapidi e accurati.</li>
</ul>
<h3 id="Test-results" class="common-anchor-header">Risultati del test</h3><p>Per dimostrare i miglioramenti delle prestazioni forniti dagli indici scalari in Milvus, è stato condotto un esperimento che ha messo a confronto le prestazioni di diverse espressioni utilizzando l'indicizzazione inversa e la ricerca a forza bruta su dati grezzi.</p>
<p>L'esperimento consisteva nel testare varie espressioni in due condizioni: con un indice invertito e con una ricerca brutale. Per garantire l'equità, è stata mantenuta la stessa distribuzione dei dati nei vari test, utilizzando ogni volta la stessa collezione. Prima di ogni test, la collezione è stata rilasciata e l'indice è stato eliminato e ricostruito. Inoltre, prima di ogni test è stata eseguita una query a caldo per minimizzare l'impatto dei dati freddi e caldi, e ogni query è stata eseguita più volte per garantire la precisione.</p>
<p>Per un set di dati di <strong>1 milione di</strong> record, l'uso di un <strong>indice invertito</strong> può fornire un miglioramento delle prestazioni fino a <strong>30 volte</strong> per le query puntuali. I guadagni di prestazioni possono essere ancora più significativi per i dataset più grandi.</p>
<h2 id="Performance-recommandations" class="common-anchor-header">Raccomandazioni sulle prestazioni<button data-href="#Performance-recommandations" class="anchor-icon" translate="no">
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
    </button></h2><p>Per sfruttare appieno le capacità di Milvus nell'indicizzazione di campi scalari e liberare la sua potenza nelle ricerche di similarità vettoriale, potrebbe essere necessario un modello per stimare la dimensione della memoria necessaria in base ai dati in vostro possesso.</p>
<p>Le tabelle seguenti elencano le funzioni di stima per tutti i tipi di dati supportati da Milvus.</p>
<ul>
<li><p>Campi numerici</p>
<table>
<thead>
<tr><th>Tipo di dati</th><th>Funzione di stima della memoria (MB)</th></tr>
</thead>
<tbody>
<tr><td>INT8</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT16</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT32</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT64</td><td>numOfRows * <strong>24</strong> / 1024 / 1024</td></tr>
<tr><td>FIAT32</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>DOPPIO</td><td>numOfRows * <strong>24</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
<li><p>Campi stringa</p>
<table>
<thead>
<tr><th>Lunghezza della stringa</th><th>Funzione di stima della memoria (MB)</th></tr>
</thead>
<tbody>
<tr><td>(0, 8]</td><td>numOfRows * <strong>128</strong> / 1024 / 1024</td></tr>
<tr><td>(8, 16]</td><td>numOfRows * <strong>144</strong> / 1024 / 1024</td></tr>
<tr><td>(16, 32]</td><td>numOfRows * <strong>160</strong> / 1024 / 1024</td></tr>
<tr><td>(32, 64]</td><td>numOfRows * <strong>192</strong> / 1024 / 1024</td></tr>
<tr><td>(64, 128]</td><td>numOfRows * <strong>256</strong> / 1024 / 1024</td></tr>
<tr><td>(128, 65535]</td><td>numOfRows * <strong>strLen * 1.5</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Cosa succede dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Per indicizzare un campo scalare, leggere <a href="/docs/it/v2.4.x/index-scalar-fields.md">Costruire un indice sugli scalari</a>.</p></li>
<li><p>Per saperne di più sui termini correlati e sulle regole sopra menzionate, leggete</p>
<ul>
<li><a href="/docs/it/v2.4.x/bitset.md">Bitset</a></li>
<li><a href="/docs/it/v2.4.x/multi-vector-search.md">Ricerca ibrida</a></li>
<li><a href="/docs/it/v2.4.x/boolean.md">Regole delle espressioni booleane</a></li>
<li><a href="/docs/it/v2.4.x/schema.md#Supported-data-type">Tipi di dati supportati</a></li>
</ul></li>
</ul>
