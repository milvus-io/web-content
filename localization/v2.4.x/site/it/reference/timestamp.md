---
id: timestamp.md
title: Timestamp in Milvus
summary: >-
  Imparate a conoscere il concetto di timestamp e i quattro principali parametri
  relativi al timestamp nel database vettoriale Milvus.
---
<h1 id="Timestamp" class="common-anchor-header">Timestamp<button data-href="#Timestamp" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento spiega il concetto di timestamp e introduce i quattro principali parametri relativi al timestamp nel database vettoriale Milvus.</p>
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
    </button></h2><p>Milvus è un database vettoriale che può cercare e interrogare vettori convertiti da dati non strutturati. Quando si esegue un'operazione in linguaggio di manipolazione dei dati (DML), compresi l'<a href="https://milvus.io/docs/v2.1.x/data_processing.md">inserimento e la cancellazione di dati</a>, Milvus assegna dei timestamp alle entità coinvolte nell'operazione. Pertanto, tutte le entità in Milvus hanno un attributo timestamp. E i lotti di entità nella stessa operazione DML condividono lo stesso valore di timestamp.</p>
<h2 id="Timestamp-parameters" class="common-anchor-header">Parametri di timestamp<button data-href="#Timestamp-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando si esegue una ricerca o un'interrogazione di similarità vettoriale in Milvus sono coinvolti diversi parametri relativi al timestamp.</p>
<ul>
<li><p><code translate="no">Guarantee_timestamp</code></p></li>
<li><p><code translate="no">Service_timestamp</code></p></li>
<li><p><code translate="no">Graceful_time</code></p></li>
<li><p><code translate="no">Travel_timestamp</code></p></li>
</ul>
<h3 id="Guaranteetimestamp" class="common-anchor-header"><code translate="no">Guarantee_timestamp</code></h3><p><code translate="no">Guarantee_timestamp</code> è un tipo di timestamp utilizzato per garantire che tutti gli aggiornamenti dei dati effettuati da operazioni DML prima di <code translate="no">Guarantee_timestamp</code> siano visibili quando si esegue una ricerca o una query di similarità vettoriale. Ad esempio, se si inserisce un batch di dati alle 15:00, un altro batch alle 17:00 e il valore di <code translate="no">Guarantee_timestamp</code> è impostato alle 18:00 durante una ricerca di similarità vettoriale. Ciò significa che i due batch di dati inseriti rispettivamente alle 15:00 e alle 17:00 devono essere coinvolti nella ricerca.</p>
<p>Se <code translate="no">Guarantee_timestamp</code> non è configurato, Milvus considera automaticamente il momento in cui viene effettuata la richiesta di ricerca. Pertanto, la ricerca viene condotta su una vista dati con tutti gli aggiornamenti dei dati tramite operazioni DML prima della ricerca.</p>
<p>Per risparmiare la comprensione del <a href="https://github.com/milvus-io/milvus/blob/master/docs/design_docs/20211214-milvus_hybrid_ts.md">TSO</a> all'interno di Milvus, come utente non è necessario configurare direttamente il parametro <code translate="no">Guarantee_timestamp</code>. È sufficiente scegliere il <a href="https://milvus.io/docs/v2.1.x/consistency.md">livello di consistenza</a> e Milvus gestisce automaticamente il parametro <code translate="no">Guarantee_timestamp</code>. Ogni livello di coerenza corrisponde a un determinato valore di <code translate="no">Guarantee_timestamp</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Guarantee_Timestamp.png" alt="Guarantee_Timestamp" class="doc-image" id="guarantee_timestamp" />
   </span> <span class="img-wrapper"> <span>Garanzia_Timestamp</span>. </span></p>
<h4 id="Example" class="common-anchor-header">Esempio</h4><p>Come mostrato nell'illustrazione precedente, il valore di <code translate="no">Guarantee_timestamp</code> è impostato come <code translate="no">2021-08-26T18:15:00</code> (per semplicità, in questo esempio il timestamp è rappresentato dal tempo fisico). Quando si esegue una ricerca o una query, vengono ricercati o interrogati tutti i dati precedenti al 2021-08-26T18:15:00.</p>
<h3 id="Servicetimestamp" class="common-anchor-header"><code translate="no">Service_timestamp</code></h3><p><code translate="no">Service_timestamp</code> è un tipo di timestamp generato automaticamente e gestito dai nodi di query in Milvus. Viene utilizzato per indicare quali operazioni DML vengono eseguite dai nodi di query.</p>
<p>I dati gestiti dai nodi di interrogazione possono essere classificati in due tipi:</p>
<ul>
<li><p>Dati storici (o anche chiamati dati batch)</p></li>
<li><p>Dati incrementali (o anche chiamati dati in streaming).</p></li>
</ul>
<p>In Milvus, è necessario caricare i dati prima di effettuare una ricerca o una query. Pertanto, i dati batch in una raccolta vengono caricati dal nodo di query prima che venga effettuata una ricerca o una richiesta di query. Tuttavia, i dati in streaming vengono inseriti o eliminati da Milvus al volo, il che richiede che il nodo di query mantenga una cronologia delle operazioni DML e delle richieste di ricerca o di query. Di conseguenza, i nodi di interrogazione utilizzano <code translate="no">Service_timestamp</code> per mantenere tale cronologia. <code translate="no">Service_timestamp</code> può essere visto come il momento in cui alcuni dati sono visibili, in quanto i nodi di interrogazione possono garantire che tutte le operazioni DML prima di <code translate="no">Service_timestamp</code> siano state completate.</p>
<p>Quando c'è una richiesta di ricerca o di interrogazione in arrivo, un nodo di interrogazione confronta i valori di <code translate="no">Service_timestamp</code> e <code translate="no">Guarantee_timestamp</code>. Esistono principalmente due scenari.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Service_Timestamp.png" alt="Service_Timestamp" class="doc-image" id="service_timestamp" />
   </span> <span class="img-wrapper"> <span>Service_Timestamp</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">Scenario 1: <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>Come mostrato nella figura 1, il valore di <code translate="no">Guarantee_timestamp</code> è impostato come <code translate="no">2021-08-26T18:15:00</code>. Quando il valore di <code translate="no">Service_timestamp</code> è cresciuto fino a <code translate="no">2021-08-26T18:15:01</code>, significa che tutte le operazioni DML precedenti a questo momento sono state eseguite e completate dal nodo di query, comprese le operazioni DML precedenti al momento indicato da <code translate="no">Guarantee_timestamp</code>. Di conseguenza, la richiesta di ricerca o di interrogazione può essere eseguita immediatamente.</p>
<h4 id="Scenario-2-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">Scenario 2: <code translate="no">Service_timestamp</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>Come mostrato nella figura 2, il valore di <code translate="no">Guarantee_timestamp</code> è impostato come <code translate="no">2021-08-26T18:15:00</code>, e il valore corrente di <code translate="no">Service_timestamp</code> è solo <code translate="no">2021-08-26T18:14:55</code>. Ciò significa che solo le operazioni DML prima di <code translate="no">2021-08-26T18:14:55</code> vengono eseguite e completate, lasciando incompiuta una parte delle operazioni DML dopo questo punto temporale ma prima di <code translate="no">Guarantee_timestamp</code>. Se la ricerca o la query viene eseguita a questo punto, alcuni dei dati richiesti sono ancora invisibili e non disponibili, il che compromette seriamente l'accuratezza dei risultati della ricerca o della query. Pertanto, il nodo di interrogazione deve rimandare la richiesta di ricerca o di interrogazione fino al completamento delle operazioni DML prima di <code translate="no">guarantee_timestamp</code> (cioè quando <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code>).</p>
<h3 id="Gracefultime" class="common-anchor-header"><code translate="no">Graceful_time</code></h3><p>Tecnicamente, <code translate="no">Graceful_time</code> non è un timestamp, ma piuttosto un periodo di tempo (ad esempio 100 ms). Tuttavia, <code translate="no">Graceful_time</code> è degno di nota perché è fortemente correlato a <code translate="no">Guarantee_timestamp</code> e <code translate="no">Service_timestamp</code>. <code translate="no">Graceful_time</code> è un parametro configurabile nel file di configurazione di Milvus. Viene utilizzato per indicare il periodo di tempo che può essere tollerato prima che alcuni dati diventino visibili. In breve, le operazioni DML non completate durante <code translate="no">Graceful_time</code> possono essere tollerate.</p>
<p>Quando c'è una richiesta di ricerca o di interrogazione in arrivo, si possono verificare due scenari.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Graceful_Time.png" alt="Graceful_Time" class="doc-image" id="graceful_time" />
   </span> <span class="img-wrapper"> <span>Graceful_Time</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">Scenario 1: <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>Come mostrato nella figura 1, il valore di <code translate="no">Guarantee_timestamp</code> è impostato come <code translate="no">2021-08-26T18:15:01</code>, e <code translate="no">Graceful_time</code> come <code translate="no">2s</code>. Il valore di <code translate="no">Service_timestamp</code> è cresciuto fino a <code translate="no">2021-08-26T18:15:00</code>. Sebbene il valore di <code translate="no">Service_timestamp</code> sia ancora inferiore a quello di <code translate="no">Guarantee_timestamp</code> e non tutte le operazioni DML prima di <code translate="no">2021-08-26T18:15:01</code> siano state completate, viene tollerato un periodo di 2 secondi di invisibilità dei dati, come indicato dal valore di <code translate="no">Graceful_time</code>. Pertanto, la richiesta di ricerca o di interrogazione in arrivo può essere eseguita immediatamente.</p>
<h4 id="Scenario-2-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">Scenario 2: <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>Come mostrato nella figura 2, il valore di <code translate="no">Guarantee_timestamp</code> è impostato come <code translate="no">2021-08-26T18:15:01</code> e <code translate="no">Graceful_time</code> come <code translate="no">2s</code>. Il valore attuale di <code translate="no">Service_timestamp</code> è solo <code translate="no">2021-08-26T18:14:54</code>. Ciò significa che le operazioni DML previste non sono ancora state completate e che, anche con un tempo di grazia di 2 secondi, l'invisibilità dei dati è ancora intollerabile. Pertanto, il nodo di interrogazione deve rimandare la richiesta di ricerca o di interrogazione fino al completamento di alcune richieste DML (cioè quando <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code>).</p>
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
<li>Scoprite come il <a href="/docs/it/v2.4.x/consistency.md">timestamp di garanzia consente di regolare la coerenza in Milvus</a>.</li>
</ul>
