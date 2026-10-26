---
id: bitset.md
summary: Scopri i bit set in Milvus.
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
    </button></h1><p>Questo argomento introduce il meccanismo del bitset che consente di abilitare funzionalità chiave come il filtraggio degli attributi e <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">le operazioni di eliminazione</a> in Milvus.</p>
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
    </button></h2><p>Un bitset è un insieme di bit. I bit sono elementi con solo due valori possibili, in genere <code translate="no">0</code> e <code translate="no">1</code>, oppure valori booleani <code translate="no">true</code> e <code translate="no">false</code>. In Milvus, i bitset sono array di numeri di bit <code translate="no">0</code> e <code translate="no">1</code> che possono essere utilizzati per rappresentare determinati dati in modo compatto ed efficiente, a differenza di int, float o char. Un numero di bit è, per impostazione predefinita, di tipo <code translate="no">0</code>, e viene impostato come <code translate="no">1</code> solo se soddisfa determinati requisiti.</p>
<p>Le operazioni sui bit set vengono eseguite con <a href="/docs/it/boolean.md">la logica booleana</a>, in base alla quale un valore di output è valido o non valido, indicati rispettivamente anche come <code translate="no">1</code> e <code translate="no">0</code>. Ad esempio, <a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">l’operatore logico</a> <code translate="no">AND</code> può essere utilizzato per confrontare due insiemi di bit in base agli elementi presenti nelle stesse posizioni di indice e produce un nuovo insieme di bit con i risultati. Se due elementi in una posizione sono uguali, nel nuovo insieme di bit verrà scritto <code translate="no">1</code> in quella posizione; <code translate="no">0</code> se sono diversi.</p>
<h2 id="Implementation" class="common-anchor-header">Implementazione<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Il bitset è un meccanismo semplice ma potente che aiuta Milvus a eseguire il filtraggio degli attributi, l’eliminazione dei dati e le query con Time Travel.</p>
<h3 id="Attribute-filtering" class="common-anchor-header">Filtraggio degli attributi<button data-href="#Attribute-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>Poiché i bitset contengono solo due valori possibili, sono perfetti per memorizzare i risultati del <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">filtraggio per attributi</a>. I dati che soddisfano i requisiti di un determinato filtro per attributi vengono contrassegnati con <code translate="no">1</code>.</p>
<h3 id="Data-deletion" class="common-anchor-header">Cancellazione dei dati<button data-href="#Data-deletion" class="anchor-icon" translate="no">
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
    </button></h3><p>I bitset rappresentano un modo compatto per memorizzare informazioni relative all’eventuale eliminazione di una riga in un segmento. Le entità eliminate vengono contrassegnate con <code translate="no">1</code> nel bitset corrispondente, che <a href="https://milvus.io/blog/deleting-data-in-milvus.md">non verrà calcolato</a> durante una ricerca o una query.</p>
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
    </button></h2><p>Di seguito presentiamo tre esempi che illustrano come vengono utilizzati i bitset in Milvus, con riferimenti a tutte e tre le principali implementazioni dei bitset discusse in precedenza. In tutti e tre i casi, è presente un segmento con 8 entità e successivamente si verifica una serie di eventi del linguaggio di manipolazione dei dati (DML) nell’ordine indicato di seguito.</p>
<ul>
<li>Quattro delle entità, i cui valori di " <code translate="no">primary_key</code>" sono rispettivamente [1, 2, 3, 4], vengono inserite quando il timestamp <code translate="no">ts</code> è pari a 100.</li>
<li>Le restanti quattro entità, i cui valori di ` <code translate="no">primary_key</code>` sono [5, 6, 7, 8], vengono inserite quando il timestamp <code translate="no">ts</code> è pari a 200.</li>
<li>Le entità i cui <code translate="no">primary_key</code>sono [7, 8] vengono eliminate quando il timestamp <code translate="no">ts</code> è pari a 300.</li>
<li>Solo le entità i cui valori di " <code translate="no">primary_key</code>" sono [1, 3, 5, 7] soddisfano le condizioni del filtro sugli attributi.</li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" /> 
   <span>Ordine degli eventi DML</span>
  
 </span></p>
<h3 id="Case-one" class="common-anchor-header">Caso uno<button data-href="#Case-one" class="anchor-icon" translate="no">
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
    </button></h3><p>In questo caso, un utente imposta l’ <code translate="no">time_travel</code> su 150, il che significa che l’utente esegue una query sui dati che soddisfano <code translate="no">ts = 150</code>. Il processo di generazione del bitset è illustrato nella Figura 1.</p>
<p>Durante la fase di filtraggio iniziale, l’ <code translate="no">filter_bitset</code> dovrebbe essere <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>, dove le entità [1, 3, 5, 7] sono contrassegnate come <code translate="no">1</code> poiché sono risultati di filtraggio validi.</p>
<p>Tuttavia, le entità [5, 6, 7, 8] non sono state inserite nel database vettoriale quando <code translate="no">ts</code> era pari a 150. Pertanto, queste quattro entità dovrebbero essere contrassegnate con 0 indipendentemente dalla condizione di filtraggio. A questo punto il risultato del bitset dovrebbe essere <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code>.</p>
<p>Come discusso nella <a href="#data-deletion">sezione «Cancellazione dei dati»</a>, le entità contrassegnate con <code translate="no">1</code> vengono ignorate durante una ricerca o una query. Il risultato del bitset deve ora essere invertito per poter essere combinato con la bitmap di cancellazione, il che ci dà <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>.</p>
<p>Per quanto riguarda il bitset di cancellazione <code translate="no">del_bitset</code>, il valore iniziale dovrebbe essere <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Tuttavia, le entità 7 e 8 non vengono cancellate finché <code translate="no">ts</code> non è pari a 300. Pertanto, quando <code translate="no">ts</code> è pari a 150, le entità 7 e 8 sono ancora valide. Di conseguenza, il valore di <code translate="no">del_bitset</code> dopo il Time Travel è <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Ora disponiamo di due insiemi di bit dopo l’applicazione di Time Travel e del filtraggio degli attributi: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> e <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> .  Combiniamo questi due insiemi di bit con l’operatore logico binario <code translate="no">OR</code>. Il valore finale di result_bitset è <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>, il che significa che solo le entità 1 e 3 saranno elaborate nella successiva fase di ricerca o interrogazione.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." /> 
   <span>Figura 1. Ricerca con Time Travel = 150.</span>
  
 </span></p>
<h3 id="Case-two" class="common-anchor-header">Caso due<button data-href="#Case-two" class="anchor-icon" translate="no">
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
    </button></h3><p>In questo caso, l’utente imposta <code translate="no">time_travel</code> su 250. Il processo di generazione del bitset è illustrato nella Figura 2.</p>
<p>Come nel caso uno, l’ <code translate="no">filter_bitset</code> iniziale è <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>.</p>
<p>Tutte le entità sono presenti nel database vettoriale quando <code translate="no">ts</code> = 250. Pertanto, <code translate="no">filter_bitset</code> rimane invariato quando si tiene conto del timestamp. Anche in questo caso, è necessario invertire il risultato e ottenere <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Per quanto riguarda il bitset di cancellazione <code translate="no">del_bitset</code>, il valore iniziale è <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Tuttavia, le entità 7 e 8 non sono state cancellate fino a quando <code translate="no">ts</code> non è stato pari a 300. Pertanto, quando <code translate="no">ts</code> è pari a 250, le entità 7 e 8 sono ancora valide. Di conseguenza, il <code translate="no">del_bitset</code> dopo il Time Travel è <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Ora disponiamo di due insiemi di bit dopo l’applicazione di Time Travel e del filtraggio per attributi: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> e <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . Combiniamo questi due insiemi di bit con l’operatore logico binario <code translate="no">OR</code>. Il risultato (result_bitset) è <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>. Ciò significa che solo le entità [1, 3, 5, 7] saranno elaborate nella successiva fase di ricerca o interrogazione.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." /> 
   <span>Figura 2. Ricerca con Time Travel = 250.</span>
  
 </span></p>
<h3 id="Case-three" class="common-anchor-header">Caso tre<button data-href="#Case-three" class="anchor-icon" translate="no">
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
    </button></h3><p>In questo caso, l’utente imposta <code translate="no">time_travel</code> a 350. Il processo di generazione del bitset è illustrato nella Figura 3.</p>
<p>Come nei casi precedenti, l’ <code translate="no">filter_bitset</code> iniziale è <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Tutte le entità si trovano nel database vettoriale quando <code translate="no">ts</code>= 350. Pertanto, il <code translate="no">filter_bitset</code> finale, invertito, è <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>, lo stesso del caso due.</p>
<p>Per quanto riguarda il bitset di eliminazione <code translate="no">del_bitset</code>, poiché le entità 7 e 8 sono già state eliminate quando <code translate="no">ts = 350</code>, il risultato di <code translate="no">del_bitset</code> è <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>.</p>
<p>Ora disponiamo di due insiemi di bit dopo il Time Travel e il filtraggio degli attributi: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> e <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> .  Combiniamo questi due insiemi di bit con l’operatore logico binario “ <code translate="no">OR</code> ”. Il risultato finale di “ <code translate="no">result_bitset</code> ” è <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code>. Ciò significa che solo le entità [1, 3, 5] saranno elaborate nella successiva fase di ricerca o interrogazione.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." /> 
   <span>Figura 3. Ricerca con Time Travel = 350.</span>
  
 </span></p>
<h2 id="Whats-next" class="common-anchor-header">Prossimi passi<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Ora che sapete come funzionano i bit set in Milvus, potreste anche voler:</p>
<ul>
<li>Imparare a <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">utilizzare le stringhe per filtrare</a> i risultati di ricerca, oppure consultare la sezione <a href="https://milvus.io/docs/hybridsearch.md">Ricerca ibrida</a> nella nostra documentazione.</li>
<li>Comprendere <a href="https://milvus.io/docs/v2.1.x/data_processing.md">come vengono elaborati i dati</a> in Milvus.</li>
</ul>
