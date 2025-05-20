---
id: bitset.md
summary: Imparare a conoscere i bitset in Milvus.
title: Bitset
---
<h1 id="Bitset" class="common-anchor-header">Bitset<button data-href="#Bitset" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento introduce il meccanismo dei bitset che consente di abilitare funzionalità chiave come il filtraggio degli attributi e le <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">operazioni di cancellazione</a> in Milvus.</p>
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
    </button></h2><p>Un bitset è un insieme di bit. I bit sono elementi con due soli valori possibili, tipicamente <code translate="no">0</code> e <code translate="no">1</code>, o valori booleani <code translate="no">true</code> e <code translate="no">false</code>. In Milvus, i bitset sono array di numeri di bit <code translate="no">0</code> e <code translate="no">1</code> che possono essere utilizzati per rappresentare determinati dati in modo compatto ed efficiente rispetto a ints, float o caratteri. Un numero di bit è <code translate="no">0</code> per impostazione predefinita e viene impostato a <code translate="no">1</code> solo se soddisfa determinati requisiti.</p>
<p>Le operazioni sugli insiemi di bit sono condotte con la <a href="/docs/it/v2.4.x/boolean.md">logica booleana</a>, in base alla quale un valore in uscita è valido o non valido, indicato rispettivamente con <code translate="no">1</code> e <code translate="no">0</code>. Ad esempio, l'<a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">operatore logico</a> <code translate="no">AND</code> può essere utilizzato per confrontare due bitset basati su elementi nelle stesse posizioni di indice e produce un nuovo bitset con i risultati. Se due elementi in una posizione sono uguali, nel nuovo bitset verrà scritto <code translate="no">1</code> in quella posizione; <code translate="no">0</code> se sono diversi.</p>
<h2 id="Implementation" class="common-anchor-header">L'implementazione<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Bitset è un meccanismo semplice ma potente che aiuta Milvus a eseguire il filtraggio degli attributi, la cancellazione dei dati e le interrogazioni con Time Travel.</p>
<h3 id="Attribute-filtering" class="common-anchor-header">Filtraggio degli attributi</h3><p>Poiché i bitet contengono solo due valori possibili, sono perfetti per memorizzare i risultati del <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">filtraggio degli attributi</a>. I dati che soddisfano i requisiti di un determinato filtro di attributo sono contrassegnati da <code translate="no">1</code>.</p>
<h3 id="Data-deletion" class="common-anchor-header">Eliminazione dei dati</h3><p>I bitet sono un modo compatto per memorizzare le informazioni sulla cancellazione di una riga in un segmento. Le entità cancellate sono contrassegnate con <code translate="no">1</code> nel bitset corrispondente, che <a href="https://milvus.io/blog/deleting-data-in-milvus.md">non verrà calcolato</a> durante una ricerca o un'interrogazione.</p>
<h2 id="Examples" class="common-anchor-header">Esempi<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Qui presentiamo tre esempi che illustrano l'uso dei bitset in Milvus, con riferimenti a tutte e tre le principali implementazioni di bitset discusse in precedenza. In tutti e tre i casi, c'è un segmento con 8 entità e poi una serie di eventi del linguaggio di manipolazione dei dati (DML) nell'ordine mostrato di seguito.</p>
<ul>
<li>Quattro delle entità, i cui <code translate="no">primary_key</code>s sono rispettivamente [1, 2, 3, 4], vengono inserite quando il timestamp <code translate="no">ts</code> è uguale a 100. Le altre quattro entità, i cui s sono rispettivamente [1, 2, 3, 4], vengono inserite quando il timestamp è uguale a 100.</li>
<li>Le altre quattro entità, i cui <code translate="no">primary_key</code>s sono [5, 6, 7, 8], vengono inserite quando il timestamp <code translate="no">ts</code> è uguale a 200.</li>
<li>Le entità i cui <code translate="no">primary_key</code>s sono [7, 8] vengono cancellate quando il timestamp <code translate="no">ts</code> è uguale a 300.</li>
<li>Solo le entità i cui <code translate="no">primary_key</code>s sono [1, 3, 5, 7] soddisfano le condizioni di filtraggio degli attributi.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" />
   </span> <span class="img-wrapper"> <span>Ordine degli eventi DML</span> </span></p>
<h3 id="Case-one" class="common-anchor-header">Caso uno</h3><p>In questo caso, un utente imposta <code translate="no">time_travel</code> come 150, il che significa che l'utente esegue una query sui dati che soddisfano <code translate="no">ts = 150</code>. Il processo di generazione del set di bit è illustrato dalla Figura 1.</p>
<p>Durante la fase iniziale di filtraggio, <code translate="no">filter_bitset</code> dovrebbe essere <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>, dove le entità [1, 3, 5, 7] sono contrassegnate come <code translate="no">1</code> perché sono risultati validi del filtraggio.</p>
<p>Tuttavia, le entità [4, 5, 6, 7] non sono state inserite nel database vettoriale quando <code translate="no">ts</code> è uguale a 150. Pertanto, queste quattro entità devono essere contrassegnate come . Pertanto, queste quattro entità devono essere contrassegnate come 0, indipendentemente dalla condizione di filtraggio. Ora il risultato del set di bit dovrebbe essere <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code>.</p>
<p>Come discusso in <a href="#data-deletion">Eliminazione dei dati</a>, le entità contrassegnate con <code translate="no">1</code> vengono ignorate durante una ricerca o un'interrogazione. Il risultato del bitset deve ora essere capovolto per essere combinato con la bitmap di cancellazione, il che ci dà <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>.</p>
<p>Per quanto riguarda il bitset di cancellazione <code translate="no">del_bitset</code>, il valore iniziale dovrebbe essere <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Tuttavia, le entità 7 e 8 non vengono cancellate finché <code translate="no">ts</code> non è 300. Pertanto, quando è 150, le entità 7 e 8 vengono cancellate. Pertanto, quando <code translate="no">ts</code> è 150, le entità 7 e 8 sono ancora valide. Di conseguenza, il valore di <code translate="no">del_bitset</code> dopo il Viaggio nel tempo è <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Ora abbiamo due set di bit dopo il Viaggio nel tempo e il filtraggio degli attributi: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> e <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> .  Combinare questi due insiemi di bit con l'operatore logico binario <code translate="no">OR</code>. Il valore finale di result_bitset è <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>, il che significa che solo le entità 1 e 3 saranno calcolate nella successiva fase di ricerca o interrogazione.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." />
   <span>Figura 1. Ricerca con tempo di percorrenza = 150</span>. </span></p>
<h3 id="Case-two" class="common-anchor-header">Caso due</h3><p>In questo caso, l'utente imposta <code translate="no">time_travel</code> a 250. La Figura 2 illustra il processo di generazione del set di bit.</p>
<p>Come nel primo caso, <code translate="no">filter_bitset</code> iniziale è <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>.</p>
<p>Tutte le entità sono presenti nel database vettoriale quando <code translate="no">ts</code> = 250. Pertanto, rimane lo stesso. Pertanto, <code translate="no">filter_bitset</code> rimane invariato quando si aggiunge il timestamp. Anche in questo caso, dobbiamo invertire il risultato e ottenere <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Per quanto riguarda il set di bit di cancellazione <code translate="no">del_bitset</code>, il valore iniziale è <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Tuttavia, le entità 7 e 8 non sono state cancellate fino a quando <code translate="no">ts</code> non è 300. Pertanto, quando è 250, il valore rimane invariato. Pertanto, quando <code translate="no">ts</code> è 250, le entità 7 e 8 sono ancora valide. Di conseguenza, <code translate="no">del_bitset</code> dopo il Viaggio nel tempo è <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Ora abbiamo due bitet dopo il Viaggio nel tempo e il filtraggio degli attributi: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> e <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . Combinare questi due insiemi di bit con l'operatore logico binario <code translate="no">OR</code>. L'insieme di bit risultante è <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>. Ciò significa che solo le entità [1, 3, 5, 7] saranno calcolate nella successiva fase di ricerca o interrogazione.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." />
   <span>Figura 2. Ricerca con tempo di percorrenza = 250</span>. </span></p>
<h3 id="Case-three" class="common-anchor-header">Caso tre</h3><p>In questo caso, l'utente imposta <code translate="no">time_travel</code> a 350. La Figura 3 illustra il processo di generazione del set di bit.</p>
<p>Come nei casi precedenti, <code translate="no">filter_bitset</code> iniziale è <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Tutte le entità sono presenti nel database vettoriale quando <code translate="no">ts</code>= 350. Pertanto, il bitset finale, capovolto, è . Pertanto, l'<code translate="no">filter_bitset</code> finale, ribaltato, è <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>, come nel caso due.</p>
<p>Per quanto riguarda il bitet di cancellazione <code translate="no">del_bitset</code>, poiché le entità 7 e 8 sono già state cancellate quando <code translate="no">ts = 350</code>, quindi il risultato di <code translate="no">del_bitset</code> è <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>.</p>
<p>Ora abbiamo due bitset dopo il viaggio nel tempo e il filtraggio degli attributi: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> e <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> .  Combiniamo questi due insiemi di bit con l'operatore logico binario <code translate="no">OR</code>. L'ultimo <code translate="no">result_bitset</code> è <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code>. Ciò significa che solo le entità [1, 3, 5] saranno calcolate nella successiva fase di ricerca o interrogazione.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." />
   <span>Figura 3. Ricerca con tempo di percorrenza = 350</span>. </span></p>
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
    </button></h2><p>Ora che sapete come funzionano i bitset in Milvus, potreste anche voler:</p>
<ul>
<li>Imparare a <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">usare le stringhe per filtrare i</a> risultati della ricerca, oppure consultare la <a href="https://milvus.io/docs/hybridsearch.md">Ricerca ibrida</a> nei nostri documenti.</li>
<li>Capire <a href="https://milvus.io/docs/v2.1.x/data_processing.md">come vengono elaborati i dati</a> in Milvus.</li>
</ul>
