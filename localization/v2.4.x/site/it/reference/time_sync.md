---
id: time_sync.md
title: Sincronizzazione temporale
summary: Imparare a conoscere il sistema di sincronizzazione dell'ora in Milvus.
---
<h1 id="Time-Synchronization" class="common-anchor-header">Sincronizzazione temporale<button data-href="#Time-Synchronization" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento introduce il meccanismo di sincronizzazione temporale di Milvus.</p>
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
    </button></h2><p>Gli eventi in Milvus possono essere generalmente classificati in due tipi:</p>
<ul>
<li><p>Eventi del linguaggio di definizione dei dati (DDL): creare/togliere una collezione, creare/togliere una partizione, ecc.</p></li>
<li><p>Eventi del linguaggio di manipolazione dei dati (DML): inserimento, ricerca, ecc.</p></li>
</ul>
<p>Ogni evento, indipendentemente dal fatto che sia DDL o DML, è contrassegnato da un timestamp che può indicare quando si verifica l'evento.</p>
<p>Supponiamo che due utenti inizino una serie di eventi DML e DDL in Milvus nell'ordine temporale indicato nella tabella seguente.</p>
<table>
<thead>
<tr><th style="text-align:center">Timestamp</th><th style="text-align:center">Utente 1</th><th style="text-align:center">Utente 2</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">t0</td><td style="text-align:center">Creazione di una raccolta denominata <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t2</td><td style="text-align:center">/</td><td style="text-align:center">Effettuare una ricerca sulla raccolta <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t5</td><td style="text-align:center">Inseriti i dati <code translate="no">A1</code> nella raccolta <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t7</td><td style="text-align:center">/</td><td style="text-align:center">Effettuata una ricerca sulla raccolta <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t10</td><td style="text-align:center">Inseriti i dati <code translate="no">A2</code> nella raccolta <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t12</td><td style="text-align:center">/</td><td style="text-align:center">Effettuata una ricerca sulla collezione <code translate="no">C0</code></td></tr>
<tr><td style="text-align:center">t15</td><td style="text-align:center">Cancellati i dati <code translate="no">A1</code> dalla raccolta <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t17</td><td style="text-align:center">/</td><td style="text-align:center">Effettuata una ricerca sulla raccolta <code translate="no">C0</code></td></tr>
</tbody>
</table>
<p>Idealmente, l'utente 2 dovrebbe essere in grado di vedere:</p>
<ul>
<li><p>Una raccolta vuota <code translate="no">C0</code> a <code translate="no">t2</code>.</p></li>
<li><p>I dati <code translate="no">A1</code> su <code translate="no">t7</code>.</p></li>
<li><p>Entrambi i dati <code translate="no">A1</code> e <code translate="no">A2</code> su <code translate="no">t12</code>.</p></li>
<li><p>Solo i dati <code translate="no">A2</code> in <code translate="no">t17</code> (poiché i dati <code translate="no">A1</code> sono stati cancellati dalla raccolta prima di questo punto).</p></li>
</ul>
<p>Questo scenario ideale può essere facilmente realizzato quando c'è un solo nodo. Tuttavia, Milvus è un database vettoriale distribuito e per garantire che tutte le operazioni DML e DDL nei diversi nodi siano mantenute in ordine, Milvus deve affrontare i due problemi seguenti:</p>
<ol>
<li><p>L'orologio è diverso per i due utenti dell'esempio precedente se si trovano su nodi diversi. Ad esempio, se l'utente 2 è 24 ore indietro rispetto all'utente 1, tutte le operazioni dell'utente 1 non sono visibili all'utente 2 fino al giorno successivo.</p></li>
<li><p>Può esserci una latenza di rete. Se l'utente 2 effettua una ricerca sulla collezione <code translate="no">C0</code> all'indirizzo <code translate="no">t17</code>, Milvus dovrebbe essere in grado di garantire che tutte le operazioni prima di <code translate="no">t17</code> vengano elaborate e completate con successo. Se l'operazione di cancellazione in <code translate="no">t15</code> è ritardata a causa della latenza di rete, è molto probabile che l'utente 2 possa ancora vedere i dati presumibilmente cancellati <code translate="no">A1</code> quando effettua una ricerca in <code translate="no">t17</code>.</p></li>
</ol>
<p>Pertanto, Milvus adotta un sistema di sincronizzazione temporale (timetick) per risolvere il problema.</p>
<h2 id="Timestamp-oracle-TSO" class="common-anchor-header">Timestamp oracle (TSO)<button data-href="#Timestamp-oracle-TSO" class="anchor-icon" translate="no">
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
    </button></h2><p>Per risolvere il primo problema menzionato nella sezione precedente, Milvus, come altri sistemi distribuiti, fornisce un servizio di timestamp oracle (TSO). Ciò significa che tutti gli eventi in Milvus devono essere assegnati con un timestamp dal TSO piuttosto che dall'orologio locale.</p>
<p>Il servizio TSO è fornito dal coordinatore principale di Milvus. I client possono allocare uno o più timestamp in una singola richiesta di allocazione di timestamp.</p>
<p>Un timestamp TSO è un tipo di valore <code translate="no">uint64</code> composto da una parte fisica e una logica. La figura seguente illustra il formato di un timestamp.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/TSO_Timestamp.png" alt="TSO_Timestamp" class="doc-image" id="tso_timestamp" />
   </span> <span class="img-wrapper"> <span>TSO_Timestamp</span>. </span></p>
<p>Come illustrato, i 46 bit all'inizio rappresentano la parte fisica, ovvero l'ora UTC in millisecondi. Gli ultimi 18 bit sono la parte logica.</p>
<h2 id="Time-synchronization-system-timetick" class="common-anchor-header">Sistema di sincronizzazione temporale (timetick)<button data-href="#Time-synchronization-system-timetick" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa sezione utilizza l'esempio di un'operazione di inserimento dati per spiegare il meccanismo di sincronizzazione temporale di Milvus.</p>
<p>Quando il proxy riceve una richiesta di inserimento dati dall'SDK, divide i messaggi di inserimento in diversi flussi di messaggi (<code translate="no">MsgStream</code>) in base al valore hash delle chiavi primarie.</p>
<p>A ogni messaggio di inserimento (<code translate="no">InsertMsg</code>) viene assegnato un timestamp prima di essere inviato a <code translate="no">MsgStream</code>.</p>
<div class="alert note">
  <code translate="no">MsgStream</code> è un wrapper della coda di messaggi, che in Milvus 2.0 è Pulsar di default.</div>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/timesync_proxy_insert_msg.png" alt="timesync_proxy_insert_msg" class="doc-image" id="timesync_proxy_insert_msg" />
   </span> <span class="img-wrapper"> <span>timesync_proxy_insert_msg</span> </span></p>
<p>Un principio generale è che in <code translate="no">MsgStream</code>, i timestamp di<code translate="no">InsertMsgs</code> provenienti dallo stesso proxy devono essere incrementali. Tuttavia, non esiste una regola simile per i timestamp di <code translate="no">InsertMsgs</code> provenienti da proxy diversi.</p>
<p>La figura seguente è un esempio di <code translate="no">InsertMsgs</code> in un <code translate="no">MsgStream</code>. Il frammento contiene cinque <code translate="no">InsertMsgs</code>, tre dei quali provengono da <code translate="no">Proxy1</code> e il resto da <code translate="no">Proxy2</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/msgstream.png" alt="msgstream" class="doc-image" id="msgstream" />
   </span> <span class="img-wrapper"> <span>msgstream</span> </span></p>
<p>I timestamp dei tre <code translate="no">InsertMsgs</code> di <code translate="no">Proxy1</code> sono incrementali, così come i due <code translate="no">InsertMsgs</code> di <code translate="no">Proxy2</code>. Tuttavia, non c'è un ordine particolare tra <code translate="no">Proxy1</code> e <code translate="no">Proxy2</code> <code translate="no">InsertMsgs</code> .</p>
<p>Un possibile scenario è che quando si legge un messaggio con timestamp <code translate="no">110</code> da <code translate="no">Proxy2</code>, Milvus scopra che il messaggio con timestamp <code translate="no">80</code> da <code translate="no">Proxy1</code> è ancora in <code translate="no">MsgStream</code>. Pertanto, Milvus introduce un sistema di sincronizzazione temporale, timetick, per garantire che quando si legge un messaggio da <code translate="no">MsgStream</code>, tutti i messaggi con timestamp più piccoli devono essere consumati.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/time_synchronization.png" alt="time_synchronization" class="doc-image" id="time_synchronization" />
   </span> <span class="img-wrapper"> <span>sincronizzazione temporale</span> </span></p>
<p>Come mostrato nella figura precedente,</p>
<ul>
<li><p>Ogni proxy riporta periodicamente (ogni 200 ms per impostazione predefinita) il valore di timestamp più grande dell'ultimo <code translate="no">InsertMsg</code> nel <code translate="no">MsgStream</code>a root coord.</p></li>
<li><p>Il root coord identifica il valore minimo del timestamp di questo <code translate="no">Msgstream</code>, indipendentemente dal proxy a cui appartiene il <code translate="no">InsertMsgs</code>. Quindi root coord inserisce questo timestamp minimo in <code translate="no">Msgstream</code>. Questo timestamp è chiamato anche timetick.</p></li>
<li><p>Quando i componenti consumer leggono il timetick inserito da root coord, capiscono che tutti i messaggi di inserimento con valori di timestamp inferiori sono stati consumati. Pertanto, le richieste pertinenti possono essere eseguite in modo sicuro senza interrompere l'ordine.</p></li>
</ul>
<p>La figura seguente è un esempio di <code translate="no">Msgstream</code> con un timetick inserito.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/timetick.png" alt="timetick" class="doc-image" id="timetick" />
   </span> <span class="img-wrapper"> <span>timetick</span> </span></p>
<p><code translate="no">MsgStream</code> elabora i messaggi in batch in base al timetick per garantire che i messaggi in uscita soddisfino i requisiti del timestamp.</p>
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
<li>Conoscere il concetto di <a href="/docs/it/v2.4.x/timestamp.md">timestamp</a>.</li>
<li>Conoscere il <a href="/docs/it/v2.4.x/data_processing.md">flusso di lavoro dell'elaborazione dei dati</a> in Milvus.</li>
</ul>
