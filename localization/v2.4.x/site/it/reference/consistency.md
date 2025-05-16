---
id: consistency.md
summary: Scoprite i quattro livelli di coerenza di Milvus.
title: Coerenza
---
<h1 id="Consistency" class="common-anchor-header">La coerenza<button data-href="#Consistency" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento introduce i quattro livelli di coerenza in Milvus e i loro scenari più adatti. In questo argomento viene trattato anche il meccanismo che garantisce la coerenza in Milvus.</p>
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
    </button></h2><p>La consistenza in un database distribuito si riferisce specificamente alla proprietà che garantisce che ogni nodo o replica abbia la stessa visione dei dati quando scrive o legge i dati in un determinato momento.</p>
<p>Milvus supporta quattro livelli di consistenza: forte, bounded staleness, di sessione e finale. Il livello di consistenza predefinito in Milvus è bounded staleness.  È possibile regolare facilmente il livello di consistenza quando si effettua una <a href="/docs/it/v2.4.x/single-vector-search.md">ricerca monovettoriale</a>, una <a href="/docs/it/v2.4.x/multi-vector-search.md">ricerca ibrida</a> o una <a href="/docs/it/v2.4.x/get-and-scalar-query.md">query</a> per adattarlo al meglio alla propria applicazione.</p>
<h2 id="Consistency-levels" class="common-anchor-header">Livelli di consistenza<button data-href="#Consistency-levels" class="anchor-icon" translate="no">
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
    </button></h2><p>Come definito dal teorema <a href="https://en.wikipedia.org/wiki/PACELC_theorem">PACELC</a>, un database distribuito deve trovare un compromesso tra coerenza, disponibilità e latenza. Un'alta consistenza implica un'elevata precisione ma anche un'alta latenza di ricerca, mentre una bassa consistenza porta a una velocità di ricerca elevata ma a una certa perdita di visibilità dei dati. Pertanto, livelli diversi di coerenza si adattano a scenari diversi.</p>
<p>Di seguito vengono illustrate le differenze tra i quattro livelli di coerenza supportati da Milvus e gli scenari a cui ciascuno di essi si adatta.</p>
<h3 id="Strong" class="common-anchor-header">Forte</h3><p>Strong è il livello di coerenza più alto e più rigoroso. Garantisce che gli utenti possano leggere la versione più recente dei dati.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Strong.png" alt="Strong consistency" class="doc-image" id="strong-consistency" />
   </span> <span class="img-wrapper"> <span>Consistenza forte</span> </span></p>
<p>Secondo il teorema PACELC, se il livello di coerenza è impostato su forte, la latenza aumenterà. Pertanto, si consiglia di scegliere una consistenza forte durante i test funzionali per garantire l'accuratezza dei risultati dei test. La consistenza forte è anche la più adatta per le applicazioni che richiedono una stretta consistenza dei dati a scapito della velocità di ricerca. Un esempio può essere un sistema finanziario online che si occupa di pagamenti e fatturazione degli ordini.</p>
<h3 id="Bounded-staleness" class="common-anchor-header">Stalliezza limitata</h3><p>La staleness limitata, come suggerisce il nome, consente l'incoerenza dei dati durante un certo periodo di tempo. Tuttavia, in genere, i dati sono sempre globalmente coerenti al di fuori di quel periodo di tempo.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Bounded.png" alt="Bounded staleness consistency" class="doc-image" id="bounded-staleness-consistency" />
   </span> <span class="img-wrapper"> <span>Consistenza della staleness limitata</span> </span></p>
<p>La staleness limitata è adatta a scenari che devono controllare la latenza di ricerca e possono accettare l'invisibilità sporadica dei dati. Ad esempio, nei sistemi di raccomandazione come i motori di raccomandazione video, l'invisibilità dei dati ha talvolta un impatto minimo sul tasso di richiamo complessivo, ma può aumentare significativamente le prestazioni del sistema di raccomandazione.</p>
<h3 id="Session" class="common-anchor-header">Sessione</h3><p>La sessione garantisce che tutti i dati scritti possano essere immediatamente percepiti in lettura durante la stessa sessione. In altre parole, quando si scrivono dati tramite un client, i nuovi dati inseriti diventano istantaneamente ricercabili.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Session.png" alt="Session consistency" class="doc-image" id="session-consistency" />
   </span> <span class="img-wrapper"> <span>Consistenza di sessione</span> </span></p>
<p>Si consiglia di scegliere la sessione come livello di coerenza per gli scenari in cui la richiesta di coerenza dei dati nella stessa sessione è elevata. Un esempio può essere la cancellazione dei dati di una voce di libro dal sistema bibliotecario; dopo la conferma della cancellazione e l'aggiornamento della pagina (una sessione diversa), il libro non dovrebbe più essere visibile nei risultati della ricerca.</p>
<h3 id="Eventually" class="common-anchor-header">Eventualmente</h3><p>Non esiste un ordine garantito di lettura e scrittura, e le repliche alla fine convergono allo stesso stato se non vengono effettuate altre operazioni di scrittura. Con la consistenza &quot;eventually&quot;, le repliche iniziano a lavorare sulle richieste di lettura con gli ultimi valori aggiornati. Eventualmente coerente è il livello più debole tra i quattro.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Eventual.png" alt="Eventual consistency" class="doc-image" id="eventual-consistency" />
   </span> <span class="img-wrapper"> <span>Consistenza eventuale</span> </span></p>
<p>Tuttavia, secondo il teorema PACELC, la latenza di ricerca può essere enormemente ridotta sacrificando la coerenza. Pertanto, il livello eventually consistent è il più adatto per gli scenari che non richiedono un'elevata coerenza dei dati, ma che richiedono prestazioni di ricerca rapidissime. Un esempio può essere il recupero di recensioni e valutazioni di prodotti Amazon con il livello eventually consistent.</p>
<h2 id="Guarantee-timestamp" class="common-anchor-header">Garantire il timestamp<button data-href="#Guarantee-timestamp" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus realizza diversi livelli di coerenza introducendo il <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">timestamp di garanzia (GuaranteeTs</a> ).</p>
<p>Un GuaranteeTs serve a informare i nodi di interrogazione che una ricerca o una richiesta di interrogazione non verrà eseguita fino a quando tutti i dati precedenti al GuaranteeTs non potranno essere visti dai nodi di interrogazione. Quando si specifica il livello di consistenza, questo corrisponde a un valore specifico di GuaranteeTs. A diversi valori di GuaranteeTs corrispondono diversi livelli di consistenza:</p>
<ul>
<li><p><strong>Forte</strong>: GuaranteeTs è impostato come identico al timestamp più recente del sistema e i nodi di interrogazione attendono che tutti i dati precedenti al timestamp più recente del sistema siano visibili prima di elaborare la richiesta di ricerca o di interrogazione.</p></li>
<li><p><strong>Stallo limitato</strong>: GuaranteeTs è impostato relativamente più piccolo del timestamp più recente del sistema e i nodi di interrogazione cercano su una vista di dati tollerabile e meno aggiornata.</p></li>
<li><p><strong>Sessione</strong>: Il client utilizza il timestamp dell'ultima operazione di scrittura come GuaranteeTs, in modo che ogni client possa almeno recuperare i dati inseriti dallo stesso client.</p></li>
<li><p><strong>Alla fine</strong>: GuaranteeTs viene impostato su un valore molto piccolo per saltare il controllo di coerenza. I nodi di query effettuano immediatamente una ricerca sulla vista dei dati esistenti.</p></li>
</ul>
<p>Per ulteriori informazioni sul meccanismo che garantisce diversi livelli di coerenza in Milvus, si veda <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">Come funziona GuaranteeTs</a>.</p>
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
<li>Imparare a regolare il livello di coerenza quando:<ul>
<li><a href="/docs/it/v2.4.x/single-vector-search.md">si effettua una ricerca a vettore singolo</a></li>
<li><a href="/docs/it/v2.4.x/multi-vector-search.md">ricerca ibrida</a></li>
<li><a href="/docs/it/v2.4.x/get-and-scalar-query.md">esecuzione di una query scalare</a></li>
</ul></li>
</ul>
