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
    </button></h1><p>AISAQ è un indice vettoriale basato su disco che estende <a href="/docs/it/diskann.md">DISKANN</a> per gestire insiemi di dati su scala miliardaria senza superare i limiti della RAM. A differenza di DISKANN, che mantiene i vettori compressi in memoria, AISAQ memorizza tutti i dati su disco, offrendo due modalità per bilanciare le prestazioni e i costi di archiviazione.</p>
<p>Utilizzate AISAQ quando il vostro set di dati vettoriali è troppo grande per stare comodamente nella RAM, oppure quando dovete ottimizzare i costi dell'infrastruttura scambiando alcune prestazioni delle query con una riduzione dei requisiti di memoria.</p>
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
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
<h3 id="AISAQ-modes" class="common-anchor-header">Modalità AISAQ<button data-href="#AISAQ-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ offre due strategie di archiviazione su disco. La differenza principale è la modalità di memorizzazione dei dati compressi PQ.</p>
<h4 id="AISAQ-performance" class="common-anchor-header">AISAQ-performance</h4><p><strong>AISAQ-performance</strong> consente di ottenere un'archiviazione completamente basata su disco, spostando i dati PQ dalla memoria al disco e mantenendo bassi IOPS grazie alla colocazione e alla ridondanza dei dati.</p>
<p>In questa modalità:</p>
<ul>
<li><p>Il vettore grezzo di ogni nodo, l'elenco dei bordi e i dati PQ dei suoi vicini sono memorizzati insieme su disco.</p></li>
<li><p>Questa disposizione garantisce che la visita di un nodo (ad esempio, il <em>vettore 0</em>) richieda un solo I/O su disco.</p></li>
<li><p>Tuttavia, poiché i dati PQ sono memorizzati in modo ridondante vicino a più nodi, la dimensione del file indice aumenta in modo significativo, consumando più spazio su disco.</p></li>
</ul>
<h4 id="AISAQ-scale" class="common-anchor-header">AISAQ-scale</h4><p><strong>AISAQ-scale</strong> si concentra sulla <em>riduzione dello spazio su disco</em>, mantenendo tutti i dati su disco.</p>
<p>In questa modalità:</p>
<ul>
<li><p>I dati PQ vengono memorizzati separatamente su disco, senza ridondanza.</p></li>
<li><p>Questo design riduce al minimo le dimensioni dell'indice, ma comporta un maggior numero di operazioni di I/O durante l'attraversamento del grafo.</p></li>
<li><p>Per ridurre il sovraccarico di IOPS, AISAQ introduce due ottimizzazioni:</p>
<ul>
<li><p>Una strategia di riordino che ordina i vettori PQ in base alla priorità per migliorare la localizzazione dei dati.</p></li>
<li><p>Una cache PQ nella DRAM (pq_cache_size) che memorizza i dati PQ di accesso frequente.</p></li>
</ul></li>
</ul>
<p>Di conseguenza, AISAQ-scale raggiunge una migliore efficienza di memorizzazione ma prestazioni inferiori rispetto a DISKANN o AISAQ-Performance.</p>
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
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-specific-parameters" class="common-anchor-header">Parametri specifici di AISAQ<button data-href="#AISAQ-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ eredita molti parametri da DISKANN. Per evitare ridondanze, di seguito vengono descritti solo i parametri specifici di AISAQ. Per le descrizioni dei parametri condivisi, come <code translate="no">max_degree</code>, <code translate="no">pq_code_budget_gb_ratio</code>, <code translate="no">search_list_size</code> e <code translate="no">beam_width_ratio</code>, fare riferimento a <a href="/docs/it/diskann.md#DISKANN-params">DISKANN</a>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Intervallo di valori</p></th>
     <th><p>Suggerimento per la regolazione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>Numero di vettori PQ memorizzati in linea per nodo. Determina il layout di memorizzazione (modalità Performance o Scala).</p></td>
     <td><p><strong>Tipo</strong>: Intero</p><p><strong>Intervallo</strong>: [0, <em>max_degree</em>]</p><p><strong>Valore predefinito</strong>: <code translate="no">-1</code></p></td>
     <td><p>Più <code translate="no">inline_pq</code> si avvicina a <em>max_degree</em>, più le prestazioni tendono a migliorare, ma la dimensione del file indice aumenta in modo significativo.</p><p>Quando <code translate="no">inline_pq</code> si avvicina a 0, le prestazioni diminuiscono e la dimensione dell'indice diventa simile a quella di DISKANN.</p><p><strong>Nota</strong>: dipende molto dalle prestazioni del disco. Se le prestazioni del disco sono scarse, si sconsiglia di attivare questa opzione, poiché la limitata larghezza di banda del disco potrebbe diventare un collo di bottiglia e degradare le prestazioni complessive.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>Abilita l'ordinamento dei vettori PQ in base alla priorità per migliorare la localizzazione I/O.</p></td>
     <td><p><strong>Tipo</strong>: Booleano</p><p><strong>Intervallo</strong>: [true, false]</p><p><strong>Valore predefinito</strong>: <code translate="no">false</code></p></td>
     <td><p>Riduce l'I/O delle query ma aumenta il tempo di creazione dell'indice.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>Dimensione della cache PQ in DRAM (byte).</p></td>
     <td><p><strong>Tipo</strong>: Intero</p><p><strong>Intervallo</strong>: [0, 1&lt;&lt;30]</p><p><strong>Valore predefinito</strong>: <code translate="no">0</code></p></td>
     <td><p>Una cache più grande migliora le prestazioni delle query, ma aumenta l'utilizzo della DRAM.</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">Considerazioni<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>Le prestazioni del disco sono importanti. AISAQ dipende in larga misura dalle IOPS dell'SSD; uno storage scadente può ridurre i QPS.</p></li>
<li><p>La modalità AISAQ-performance ≈ latenza DISKANN, ma può richiedere uno spazio su disco diverse volte superiore.</p></li>
<li><p>La modalità AISAQ-scale è adatta alla ricerca offline o ai carichi di lavoro di archiviazione dei dati, dove il QPS è meno critico.</p></li>
</ul>
