---
id: release_notes.md
summary: Note di rilascio di Milvus
title: Note di rilascio
---
<h1 id="Release-Notes" class="common-anchor-header">Note di rilascio<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Scoprite le novità di Milvus! Questa pagina riassume le nuove funzionalità, i miglioramenti, i problemi noti e le correzioni di bug di ogni versione. In questa sezione è possibile trovare le note di rilascio per ogni versione rilasciata dopo la v2.6.0. Si consiglia di visitare regolarmente questa pagina per conoscere gli aggiornamenti.</p>
<h2 id="v268" class="common-anchor-header">v2.6.8<button data-href="#v268" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 4 gennaio 2026</p>
<table>
<thead>
<tr><th style="text-align:left">Versione di Milvus</th><th style="text-align:left">Versione dell'SDK Python</th><th style="text-align:left">Versione dell'SDK Node.js</th><th style="text-align:left">Versione dell'SDK Java</th><th style="text-align:left">Versione dell'SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.8</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.9</td><td style="text-align:left">2.6.11</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Siamo entusiasti di annunciare il rilascio di Milvus 2.6.8! Questa versione introduce l'evidenziazione dei risultati di ricerca, migliorando in modo significativo l'esperienza di ricerca. Abbiamo ottimizzato l'elaborazione delle query, la pianificazione delle risorse e i meccanismi di caching per offrire prestazioni e stabilità superiori. Inoltre, questa versione risolve i bug critici relativi alla sicurezza dei dati, alla gestione dello storage e alla concorrenza. Consigliamo vivamente a tutti gli utenti di passare a questa versione per ottenere un ambiente di produzione più efficiente e affidabile.</p>
<h3 id="Features" class="common-anchor-header">Caratteristiche<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Ricerca supportata con l'evidenziatore. Per i dettagli, consultare <a href="/docs/it/text-highlighter.md">Evidenziatore di testo</a>. <a href="https://github.com/milvus-io/milvus/pull/46052">(#46052</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Spostata la logica di ottimizzazione delle query nel Proxy per migliorare le prestazioni<a href="https://github.com/milvus-io/milvus/pull/46549">(#46549</a>).</li>
<li>Ottimizzate le prestazioni dell'operatore <code translate="no">LIKE</code> usando l'ordinamento STL<a href="https://github.com/milvus-io/milvus/pull/46535">(#46535</a>)</li>
<li>Abilitata l'esecuzione concorrente di attività di indicizzazione del testo per più campi<a href="https://github.com/milvus-io/milvus/pull/46306">(#46306</a>)</li>
<li>Supportata la pausa del GC a livello di raccolta<a href="https://github.com/milvus-io/milvus/pull/46201">(#46201</a>)</li>
<li>Implementata una politica di penalizzazione per i QueryNode per gestire l'esaurimento delle risorse<a href="https://github.com/milvus-io/milvus/pull/46086">(#46086</a>)</li>
<li>Ottimizzata la cache dei dati mappando più gruppi di righe in una singola cella della cache<a href="https://github.com/milvus-io/milvus/pull/46542">(#46542</a>)</li>
<li>Riduzione dell'uso della CPU in QuotaCenter<a href="https://github.com/milvus-io/milvus/pull/46615">(#46615</a>)</li>
<li>Migliorate le prestazioni di confronto dei dati di <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46655">(#46655</a>)</li>
<li>Supportati campi dinamici annullabili con un oggetto JSON vuoto come valore predefinito<a href="https://github.com/milvus-io/milvus/pull/46445">(#46445</a>)</li>
<li>Impedito di sigillare inutilmente i segmenti quando si modificano solo le proprietà della raccolta<a href="https://github.com/milvus-io/milvus/pull/46489">(#46489</a>)</li>
<li>Supportato l'inoltro DML e DQL in Proxy per RESTful v2<a href="https://github.com/milvus-io/milvus/pull/46021">(#46021</a>, <a href="https://github.com/milvus-io/milvus/pull/46037">#46037</a>)</li>
<li>Aggiunto un meccanismo di retry per la lettura di oggetti in memoria su errori di limite di velocità<a href="https://github.com/milvus-io/milvus/pull/46464">(#46464</a>)</li>
<li>Migliorato il logging per le meta tabelle di Proxy e RootCoord<a href="https://github.com/milvus-io/milvus/pull/46701">(#46701</a>)</li>
<li>Aggiunta la convalida per l'incorporazione di modelli e tipi di campo dello schema<a href="https://github.com/milvus-io/milvus/pull/46422">(#46422</a>)</li>
<li>Introdotta una durata di tolleranza per ritardare le operazioni di drop delle raccolte (<a href="https://github.com/milvus-io/milvus/pull/46252">#46252</a>)</li>
<li>Migliorata la programmazione delle attività di indice stimando gli slot in base alla dimensione e al tipo di campo<a href="https://github.com/milvus-io/milvus/pull/46276">(#46276</a>, <a href="https://github.com/milvus-io/milvus/pull/45851">#45851</a>)</li>
<li>Aggiunto un meccanismo di fallback per i percorsi di scrittura quando si accede allo storage degli oggetti senza il supporto della scrittura per condizione<a href="https://github.com/milvus-io/milvus/pull/46022">(#46022</a>)</li>
<li>Ottimizzata la logica di sincronizzazione dell'oracolo IDF (<a href="https://github.com/milvus-io/milvus/pull/46079">#46079</a>)</li>
<li>Cambiata la porta predefinita di RootCoord in una porta non effimera<a href="https://github.com/milvus-io/milvus/pull/46268">(#46268</a>).</li>
<li>Aggiunte metriche per monitorare la memoria cache di Jemalloc (<a href="https://github.com/milvus-io/milvus/pull/45973">#45973</a>)</li>
<li>Migliorata l'accuratezza delle metriche della quota disco quando la quota del cluster cambia (<a href="https://github.com/milvus-io/milvus/pull/46304">#46304</a>)</li>
<li>Migliorata l'osservabilità delle tracce per le espressioni scalari<a href="https://github.com/milvus-io/milvus/pull/45823">(#45823</a>)</li>
<li>Rifiuto di chiavi primarie duplicate nelle richieste batch di upsert (<a href="https://github.com/milvus-io/milvus/pull/46035">#46035</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Corretta la corrispondenza del prefisso RBAC ETCD per evitare potenziali perdite di dati<a href="https://github.com/milvus-io/milvus/pull/46708">(#46708</a>)</li>
<li>Corretta la gestione del percorso radice non corretto per la modalità di archiviazione locale<a href="https://github.com/milvus-io/milvus/pull/46693">(#46693</a>)</li>
<li>Corretta la gestione dei tipi misti <code translate="no">int64</code>/<code translate="no">float</code> nei campi JSON<a href="https://github.com/milvus-io/milvus/pull/46682">(#46682</a>)</li>
<li>Corretti gli errori di caricamento del registro di testo durante l'aggiornamento del cluster<a href="https://github.com/milvus-io/milvus/pull/46698">(#46698</a>)</li>
<li>Impedita la cancellazione di altri campi durante la pulizia dei dati grezzi<a href="https://github.com/milvus-io/milvus/pull/46689">(#46689</a>)</li>
<li>Corretto il fallimento quando si usa l'evidenziazione con più analizzatori<a href="https://github.com/milvus-io/milvus/pull/46664">(#46664</a>)</li>
<li>Assicurato il flussaggio dei registri all'uscita del sistema operativo<a href="https://github.com/milvus-io/milvus/pull/46609">(#46609</a>)</li>
<li>Corretto l'errore di superamento del limite di dimensione di ETCD RPC quando si eliminano le raccolte<a href="https://github.com/milvus-io/milvus/pull/46645">(#46645</a>)</li>
<li>Corretti i problemi di ritardo della replica quando il server è inattivo<a href="https://github.com/milvus-io/milvus/pull/46612">(#46612</a>)</li>
<li>Corretta la convalida dei valori predefiniti non validi di <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46556">(#46556</a>)</li>
<li>Corretto il ripristino delle attività di compattazione per garantire una pulizia corretta<a href="https://github.com/milvus-io/milvus/pull/46578">(#46578</a>)</li>
<li>Gestione unificata dei nodi di sola lettura per evitare di bloccare i task del canale di bilanciamento (<a href="https://github.com/milvus-io/milvus/pull/46513">#46513</a>)</li>
<li>Impedita la caduta dei dati di campo per i gruppi di colonne a più campi<a href="https://github.com/milvus-io/milvus/pull/46425">(#46425</a>)</li>
<li>Rimossi i client proxy obsoleti durante il re-watching di ETCD<a href="https://github.com/milvus-io/milvus/pull/46490">(#46490</a>)</li>
<li>Corretto l'ordine di fusione degli iteratori di chunk (<a href="https://github.com/milvus-io/milvus/pull/46462">#46462</a>)</li>
<li>Impedita la creazione di gruppi di consumatori Kafka disabilitando l'autocommit (<a href="https://github.com/milvus-io/milvus/pull/46509">#46509</a>)</li>
<li>Vietato il caricamento a caldo dei parametri dello storage a livelli (<a href="https://github.com/milvus-io/milvus/pull/46438">#46438</a>)</li>
<li>Abilitato l'iteratore di ricerca per i vettori binari<a href="https://github.com/milvus-io/milvus/pull/46334">(#46334</a>)</li>
<li>Corretta una condizione di gara nell'inizializzazione dello storage<a href="https://github.com/milvus-io/milvus/pull/46338">(#46338</a>)</li>
<li>Corretta la query di evidenziazione che non funziona per le ricerche non-BM25<a href="https://github.com/milvus-io/milvus/pull/46295">(#46295</a>)</li>
<li>Corretto l'overflow dello stack durante la garbage collection di JSON<a href="https://github.com/milvus-io/milvus/pull/46318">(#46318</a>)</li>
<li>Assicurati i tentativi durante la scrittura dei binlog (<a href="https://github.com/milvus-io/milvus/pull/46310">#46310</a>)</li>
<li>Corretto il controllo dell'uso dell'indice per i campi JSON<a href="https://github.com/milvus-io/milvus/pull/46281">(#46281</a>)</li>
<li>Impedito il blocco dell'aggiornamento del target quando le repliche mancano di nodi durante lo scaling (<a href="https://github.com/milvus-io/milvus/pull/46291">#46291</a>)</li>
<li>Limitato il tokenizer di <code translate="no">char_group</code> per supportare solo delimitatori a un byte<a href="https://github.com/milvus-io/milvus/pull/46196">(#46196</a>)</li>
<li>Saltato l'uso dell'indice del percorso JSON se il percorso della query include numeri<a href="https://github.com/milvus-io/milvus/pull/46247">(#46247</a>)</li>
<li>Corretti gli errori di concatenazione dei percorsi in MinIO quando il percorso principale è "."<a href="https://github.com/milvus-io/milvus/pull/46221">(#46221</a>)</li>
<li>Corretti i controlli di salute falsi positivi correggendo il calcolo del ritardo delle repliche (<a href="https://github.com/milvus-io/milvus/pull/46122">#46122</a>)</li>
<li>Corretto il parsing di RESTful v2 e i default dello schema con <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46239">(#46239</a>)</li>
<li>Corretto il panico durante la ricerca di risultati vuoti con campi geometrici di output (<a href="https://github.com/milvus-io/milvus/pull/46231">#46231</a>)</li>
<li>Aggiunta la convalida dell'allineamento dei dati dei campi per evitare il panico durante gli aggiornamenti parziali<a href="https://github.com/milvus-io/milvus/pull/46180">(#46180</a>)</li>
<li>Corretto il problema della perdita di database in RESTful v2<a href="https://github.com/milvus-io/milvus/pull/46172">(#46172</a>)</li>
<li>Corretto l'uso non corretto del contesto nelle sessioni client gRPC<a href="https://github.com/milvus-io/milvus/pull/46184">(#46184</a>)</li>
<li>Corretto l'inoltro errato delle autorizzazioni in RESTful v2 durante gli aggiornamenti<a href="https://github.com/milvus-io/milvus/pull/46140">(#46140</a>)</li>
<li>Corretta la logica di riduzione delle strutture non corretta<a href="https://github.com/milvus-io/milvus/pull/46151">(#46151</a>)</li>
<li>Corretto l'errore restituito dall'evidenziatore quando i risultati della ricerca sono vuoti<a href="https://github.com/milvus-io/milvus/pull/46111">(#46111</a>)</li>
<li>Corretta la logica per il caricamento dei dati grezzi per i campi<a href="https://github.com/milvus-io/milvus/pull/46155">(#46155</a>)</li>
<li>Corretto il problema del movimento del cursore dopo aver saltato i chunk nell'indice<a href="https://github.com/milvus-io/milvus/pull/46055">(#46055</a>)</li>
<li>Corretta la logica del ciclo per l'output dell'indice scalare <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46110">(#46110</a>)</li>
<li>Corretta l'impostazione dei valori predefiniti per i campi geometrici tramite API RESTful<a href="https://github.com/milvus-io/milvus/pull/46064">(#46064</a>)</li>
<li>Implementato il fast fail se un componente non è pronto all'avvio (<a href="https://github.com/milvus-io/milvus/pull/46070">#46070</a>)</li>
</ul>
<h2 id="v267" class="common-anchor-header">v2.6.7<button data-href="#v267" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 4 dicembre 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versione di Milvus</th><th style="text-align:left">Versione dell'SDK Python</th><th style="text-align:left">Versione dell'SDK Node.js</th><th style="text-align:left">Versione dell'SDK Java</th><th style="text-align:left">Versione dell'SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.7</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.10</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.7 è un aggiornamento critico di stabilizzazione per la serie 2.6.x. Questa release si concentra sull'indurimento del sistema contro i guasti distribuiti e sull'ottimizzazione dell'utilizzo delle risorse in condizioni di carico elevato. Con miglioramenti significativi nella gestione dell'I/O, nella gestione della memoria e nell'integrazione con Kubernetes, consigliamo vivamente a tutti gli utenti di produzione di passare a questa versione per garantire una maggiore affidabilità e un funzionamento più fluido su scala.</p>
<h3 id="Features" class="common-anchor-header">Caratteristiche<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Aggiunto l'endpoint <code translate="no">/livez</code> per supportare le sonde di liveness native di Kubernetes, migliorando la stabilità dell'orchestrazione dei container<a href="https://github.com/milvus-io/milvus/pull/45481">(#45481</a>).</li>
<li>Aggiunto il supporto per le operazioni <strong>GroupBy</strong> sui campi <code translate="no">TIMESTAMPTZ</code>, per migliorare le capacità di analisi delle serie temporali<a href="https://github.com/milvus-io/milvus/pull/45763">(#45763</a>).</li>
<li>Supportato <code translate="no">mmap</code> per gli indici delle chiavi condivise di JSON shredding per ridurre l'ingombro della RAM (<a href="https://github.com/milvus-io/milvus/pull/45861">#45861</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Supportato l'inoltro di richieste DML nel Proxy per migliorare la disponibilità di scrittura e la resilienza del routing (<a href="https://github.com/milvus-io/milvus/pull/45922">#45922</a>).</li>
<li>Aggiornamento di etcd alla versione 3.5.23 per risolvere le regressioni di stabilità e prestazioni del consenso (<a href="https://github.com/milvus-io/milvus/pull/45953">#45953</a>).</li>
<li>Aggiunta una solida gestione degli errori per i crash del server Etcd, per evitare guasti a cascata dei componenti (<a href="https://github.com/milvus-io/milvus/pull/45633">#45633</a>).</li>
<li>Riduzione del carico di Etcd grazie alla rimozione dei costosi watcher per i semplici controlli di vivacità delle sessioni (<a href="https://github.com/milvus-io/milvus/pull/45974">#45974</a>).</li>
<li>Migliorata la strategia di conservazione del WAL per bilanciare meglio l'uso del disco e la sicurezza del recupero dei dati<a href="https://github.com/milvus-io/milvus/pull/45784">(#45784</a>).</li>
<li>Supportata la sincronizzazione di scrittura asincrona per i registri, per evitare che il blocco dell'I/O su disco influisca sul percorso di esecuzione principale<a href="https://github.com/milvus-io/milvus/pull/45806">(#45806</a>).</li>
<li>Utilizzo dell'I/O bufferizzato per i task di carico ad alta priorità per ottimizzare l'utilizzo della cache delle pagine del sistema operativo e il throughput (<a href="https://github.com/milvus-io/milvus/pull/45958">#45958</a>).</li>
<li>Ottimizzata la strategia di <code translate="no">mmap</code> per mappare i chunk di gruppo in una singola chiamata di sistema, riducendo l'overhead del kernel durante il caricamento dei segmenti<a href="https://github.com/milvus-io/milvus/pull/45893">(#45893</a>).</li>
<li>Migliorata l'accuratezza della stima della memoria per la triturazione di JSON, per evitare uccisioni o sottoutilizzo di OOM (<a href="https://github.com/milvus-io/milvus/pull/45876">#45876</a>).</li>
<li>Affinata la stima del carico dei segmenti per tenere conto degli stati di eviction e warmup (<a href="https://github.com/milvus-io/milvus/pull/45891">#45891</a>).</li>
<li>Aggiunti controlli di cancellazione granulari negli operatori di query per consentire una terminazione più rapida delle query interrotte o in ritardo<a href="https://github.com/milvus-io/milvus/pull/45894">(#45894</a>).</li>
<li>Rimossi i controlli ridondanti sul tipo di risorsa nella configurazione delle risorse dei file<a href="https://github.com/milvus-io/milvus/pull/45727">(#45727</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Interlacciati i log di Go e C++ in un flusso unificato per fornire una corretta visione cronologica per il debug<a href="https://github.com/milvus-io/milvus/pull/46005">(#46005</a>).</li>
<li>Risolta una condizione di gara per cui <code translate="no">LastConfirmedMessageID</code> poteva essere errato in caso di scritture ad alta concurrency (<a href="https://github.com/milvus-io/milvus/pull/45874">#45874</a>).</li>
<li>Corretto un errore di calcolo nell'aggregazione di <code translate="no">allsearchcount</code> da più risultati di ricerca<a href="https://github.com/milvus-io/milvus/pull/45904">(#45904</a>).</li>
<li>Corrette le espressioni Term per gestire correttamente la logica di contenimento delle stringhe negli array JSON<a href="https://github.com/milvus-io/milvus/pull/45956">(#45956</a>).</li>
<li>Sostituito <code translate="no">json.doc()</code> con <code translate="no">json.dom_doc()</code> in <code translate="no">JSONContainsExpr</code> per correggere i comportamenti di parsing e migliorare le prestazioni<a href="https://github.com/milvus-io/milvus/pull/45786">(#45786</a>).</li>
<li>Corretto un panico nei componenti MixCoord in standby durante la sequenza di spegnimento<a href="https://github.com/milvus-io/milvus/pull/45898">(#45898</a>).</li>
<li>Corretto il leader checker per assicurare che la distribuzione dei segmenti sia correttamente sincronizzata ai nodi di sola lettura (<a href="https://github.com/milvus-io/milvus/pull/45991">#45991</a>).</li>
<li>Assicurato che <code translate="no">HandleNodeUp</code> venga attivato durante il re-watching dei nodi per mantenere una topologia di bilanciamento del carico corretta (<a href="https://github.com/milvus-io/milvus/pull/45963">#45963</a>).</li>
<li>Implementato il fallback allo storage WAL remoto se lo storage WAL locale diventa indisponibile<a href="https://github.com/milvus-io/milvus/pull/45754">(#45754</a>).</li>
<li>Aggiunto <code translate="no">EmptySessionWatcher</code> per prevenire il panico durante l'esecuzione in modalità IndexNode binding<a href="https://github.com/milvus-io/milvus/pull/45912">(#45912</a>).</li>
<li>Assicurata la coerenza dello stato della memoria durante il recupero dei task broadcast dai buffer di protocollo<a href="https://github.com/milvus-io/milvus/pull/45788">(#45788</a>).</li>
<li>Risolti i problemi di sicurezza dei thread negli aggiornamenti dello schema delle collezioni SegCore<a href="https://github.com/milvus-io/milvus/pull/45618">(#45618</a>).</li>
<li>Applicato il controllo degli accessi (RBAC) per le API <code translate="no">ListImport</code> e <code translate="no">GetImportProgress</code> <a href="https://github.com/milvus-io/milvus/pull/45862">(#45862</a>).</li>
<li>Corretto un bug per cui BulkImport falliva se l'input conteneva un elenco di struct vuoto<a href="https://github.com/milvus-io/milvus/pull/45692">(#45692</a>).</li>
</ul>
<h2 id="v266" class="common-anchor-header">v2.6.6<button data-href="#v266" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 21 novembre 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versione di Milvus</th><th style="text-align:left">Versione dell'SDK Python</th><th style="text-align:left">Versione dell'SDK Node.js</th><th style="text-align:left">Versione dell'SDK Java</th><th style="text-align:left">Versione dell'SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.8</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Siamo lieti di annunciare il rilascio di Milvus 2.6.6, che presenta una serie di nuove potenti funzionalità, miglioramenti delle prestazioni e correzioni di bug essenziali. Questo aggiornamento introduce importanti funzionalità come il tipo di dati Geospatial e Timestampz, il Boost ranker per il rescoring, ecc. Questa versione presenta anche molti miglioramenti cruciali delle prestazioni del filtraggio scalare. Sono stati inoltre risolti diversi bug critici per garantire maggiore stabilità e affidabilità. Con questa release, Milvus continua a fornire un'esperienza più robusta ed efficiente a tutti gli utenti. Di seguito sono riportati i punti salienti di questa release.</p>
<ul>
<li>Tipo di dati geospaziali: Milvus introduce il supporto per il tipo di dati <code translate="no">Geometry</code>, che rappresenta oggetti geometrici conformi a OGC come <code translate="no">POINT</code>, <code translate="no">LINESTRING</code> e <code translate="no">POLYGON</code>. Questo tipo supporta diversi operatori di relazione spaziale (st_contains, st_intersects, st_within, st_dwithin, ...) e fornisce un indice spaziale <code translate="no">RTREE</code> per accelerare il filtraggio spaziale e l'esecuzione delle query. Ciò consente di memorizzare e interrogare in modo efficiente forme geospaziali per LBS, mappatura e altri carichi di lavoro spaziali.</li>
<li>Tipo di dati Timestamptz: Milvus introduce il tipo di dati TIMESTAMPTZ, che fornisce la consapevolezza del fuso orario per tutti i dati temporali. Questa funzione consente una gestione coerente dei dati in tutte le distribuzioni globali, permettendo agli utenti di definire un contesto temporale predefinito utilizzando la proprietà timezone su database e collezioni. Inoltre, il campo supporta pienamente il filtraggio basato su espressioni per le query su intervalli temporali e le operazioni di recupero (query e ricerca) supportano un parametro timezone per la conversione istantanea e al volo dei timestamp nel formato locale richiesto al momento dell'output.</li>
<li>Boost Ranker: Invece di basarsi esclusivamente sulla somiglianza semantica calcolata in base alle distanze vettoriali, Boost Ranker consente a Milvus di utilizzare la condizione di filtraggio opzionale all'interno della funzione per trovare le corrispondenze tra i risultati della ricerca e aumenta i punteggi di tali corrispondenze applicando il peso specificato, contribuendo a promuovere o declassare la classifica delle entità abbinate nel risultato finale.</li>
<li>L'indice STL_SORT ora supporta i tipi di dati VARCHAR e TIMESTAMPTZ.</li>
<li>È ora possibile abilitare il campo dinamico di una collezione esistente modificandola.</li>
<li>Corretto cve-2025-63811.</li>
</ul>
<h3 id="Features" class="common-anchor-header">Caratteristiche<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Aggiunta di una nuova configurazione e abilitazione delle configurazioni di aggiornamento dinamico<a href="https://github.com/milvus-io/milvus/pull/45363">(#45363</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Corretto cve-2025-63811<a href="https://github.com/milvus-io/milvus/pull/45658">(#45658</a>)</li>
<li>Rimossi gli array di id di segmento di grandi dimensioni dai registri dei querynode<a href="https://github.com/milvus-io/milvus/pull/45720">(#45720</a>)</li>
<li>Aggiornati più punti in cui l'expr copiava i valori di input in ogni ciclo<a href="https://github.com/milvus-io/milvus/pull/45712">(#45712</a>)</li>
<li>Ottimizzate le prestazioni dell'expr a termine (<a href="https://github.com/milvus-io/milvus/pull/45671">#45671</a>)</li>
<li>Prefetched chunks vettoriali per segmenti sigillati non indicizzati<a href="https://github.com/milvus-io/milvus/pull/45666">(#45666</a>)</li>
<li>Expr: prefetching dei chunk solo una volta<a href="https://github.com/milvus-io/milvus/pull/45555">(#45555</a>)</li>
<li>Aggiunto il supporto nullable per i tipi geometria e timestamptz<a href="https://github.com/milvus-io/milvus/pull/45522">(#45522</a>)</li>
<li>Aumentato il ttl di sessione da 10s a 30s<a href="https://github.com/milvus-io/milvus/pull/45517">(#45517</a>)</li>
<li>Aggiunte altre metriche per il framework ddl<a href="https://github.com/milvus-io/milvus/pull/45559">(#45559</a>)</li>
<li>Aggiornata la versione della configurazione di maxconnections<a href="https://github.com/milvus-io/milvus/pull/45547">(#45547</a>)</li>
<li>Saltato il controllo dell'id sorgente (<a href="https://github.com/milvus-io/milvus/pull/45519">#45519</a>)</li>
<li>Supportata la configurazione max_connection per lo storage remoto<a href="https://github.com/milvus-io/milvus/pull/45364">(#45364</a>)</li>
<li>Prevenuto il panico aggiungendo il controllo del puntatore nullo quando si cancella il pk2offset di insertrecord<a href="https://github.com/milvus-io/milvus/pull/45442">(#45442</a>)</li>
<li>Eseguita un'ottimizzazione del fetching dei campi scalari in scenari di archiviazione a livelli (<a href="https://github.com/milvus-io/milvus/pull/45361">#45361</a>)</li>
<li>Corretto un errore di battitura dei parametri dell'analizzatore<a href="https://github.com/milvus-io/milvus/pull/45434">(#45434</a>)</li>
<li>Sovrascritto index_type durante la creazione di un indice di segmento (<a href="https://github.com/milvus-io/milvus/pull/45417">#45417</a>)</li>
<li>Aggiunto il supporto rbac per updatereplicateconfiguration<a href="https://github.com/milvus-io/milvus/pull/45236">(#45236</a>)</li>
<li>Portata la versione di go a 1.24.9<a href="https://github.com/milvus-io/milvus/pull/45369">(#45369</a>)</li>
<li>Disabilitato il jsonshredding per la configurazione predefinita<a href="https://github.com/milvus-io/milvus/pull/45349">(#45349</a>)</li>
<li>Unificato il buffer allineato sia per il buffer che per l'i/o diretto<a href="https://github.com/milvus-io/milvus/pull/45325">(#45325</a>)</li>
<li>Rinominati i parametri di configurazione utente relativi a jsonstats (<a href="https://github.com/milvus-io/milvus/pull/45252">#45252</a>)</li>
<li>Resa aggiornabile la configurazione del pool di thread di knowhere<a href="https://github.com/milvus-io/milvus/pull/45191">(#45191</a>)</li>
<li>Patch con ciliegie del nuovo framework ddl e cdc 3<a href="https://github.com/milvus-io/milvus/pull/45280">(#45280</a>)</li>
<li>Impostare la versione dello schema quando si crea una nuova raccolta<a href="https://github.com/milvus-io/milvus/pull/45269">(#45269</a>)</li>
<li>Supportati i file jsonl/ndjson per bulkinsert<a href="https://github.com/milvus-io/milvus/pull/44717">(#44717</a>)</li>
<li>Attendere che il client del flusso di replica finisca<a href="https://github.com/milvus-io/milvus/pull/45260">(#45260</a>)</li>
<li>Ha reso geometrycache una configurazione opzionale<a href="https://github.com/milvus-io/milvus/pull/45196">(#45196</a>)</li>
<li>Patch con ciliegie del nuovo framework ddl e di cdc 2<a href="https://github.com/milvus-io/milvus/pull/45241">(#45241</a>)</li>
<li>Non ha avviato cdc per impostazione predefinita<a href="https://github.com/milvus-io/milvus/pull/45217">(#45217</a>)</li>
<li>Patch con ciliegie del nuovo framework ddl e di cdc<a href="https://github.com/milvus-io/milvus/pull/45025">(#45025</a>)</li>
<li>Rimosso il limite massimo di campi vettoriali (<a href="https://github.com/milvus-io/milvus/pull/45156">#45156</a>)</li>
<li>Mostrato il tempo di creazione per i lavori di importazione<a href="https://github.com/milvus-io/milvus/pull/45059">(#45059</a>)</li>
<li>Ottimizzata l'inizializzazione della bitmap scalarindexsort per le query di intervallo (<a href="https://github.com/milvus-io/milvus/pull/45087">#45087</a>)</li>
<li>Abilitato stl_sort per supportare varchar<a href="https://github.com/milvus-io/milvus/pull/45050">(#45050</a>)</li>
<li>Estratta la logica del client shard in un pacchetto dedicato<a href="https://github.com/milvus-io/milvus/pull/45031">(#45031</a>)</li>
<li>Rifattorizzata la gestione dei privilegi estraendo la cache dei privilegi in un pacchetto separato<a href="https://github.com/milvus-io/milvus/pull/45002">(#45002</a>)</li>
<li>Supportati i valori predefiniti json in fillfielddata<a href="https://github.com/milvus-io/milvus/pull/45470">(#45470</a>)</li>
<li>Aggiornati enabledynamicfield e schemaversion durante la modifica della raccolta (<a href="https://github.com/milvus-io/milvus/pull/45616">#45616</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Corretto il panico da aggiornamento parziale con timestamptz<a href="https://github.com/milvus-io/milvus/pull/45741">(#45741</a>)</li>
<li>Utilizzato 2.6.6 per l'aggiornamento del ddl milvus<a href="https://github.com/milvus-io/milvus/pull/45739">(#45739</a>)</li>
<li>Usato l'ultimo timetick per far scadere la cache<a href="https://github.com/milvus-io/milvus/pull/45699">(#45699</a>)</li>
<li>Uscire dallo streamingnode quando non riesce a inizializzarlo<a href="https://github.com/milvus-io/milvus/pull/45732">(#45732</a>)</li>
<li>Protetto l'emplace di tbb concurrent_map per evitare un deadlock da condizione di gara (<a href="https://github.com/milvus-io/milvus/pull/45682">#45682</a>)</li>
<li>Impedito il panico quando lo streaming coord si spegneva ma la query coord continuava a funzionare<a href="https://github.com/milvus-io/milvus/pull/45696">(#45696</a>)</li>
<li>Impostare l'init del task quando il worker non aveva un task<a href="https://github.com/milvus-io/milvus/pull/45676">(#45676</a>)</li>
<li>Impedito deadlock in runcomponent quando prepare falliva (<a href="https://github.com/milvus-io/milvus/pull/45647">#45647</a>)</li>
<li>Impedito il panico in caso di doppia chiusura del canale di trasmissione ack (<a href="https://github.com/milvus-io/milvus/pull/45662">#45662</a>)</li>
<li>Corretto il backfill del valore predefinito durante l'addfield<a href="https://github.com/milvus-io/milvus/pull/45644">(#45644</a>)</li>
<li>Compattata la storia dell'assegnazione del canale per diminuire la dimensione delle informazioni di recupero dell'assegnazione<a href="https://github.com/milvus-io/milvus/pull/45607">(#45607</a>)</li>
<li>Gestiti correttamente i valori predefiniti durante la compattazione per i campi aggiunti<a href="https://github.com/milvus-io/milvus/pull/45619">(#45619</a>)</li>
<li>Rimosso validatefieldname in dropindex<a href="https://github.com/milvus-io/milvus/pull/45462">(#45462</a>)</li>
<li>Ignorata l'attività di compattazione quando il segmento from non era sano<a href="https://github.com/milvus-io/milvus/pull/45535">(#45535</a>)</li>
<li>Impostare le proprietà dello schema prima di trasmettere alter collection (<a href="https://github.com/milvus-io/milvus/pull/45529">#45529</a>)</li>
<li>Memorizzato l'evento del database se la chiave non era valida<a href="https://github.com/milvus-io/milvus/pull/45530">(#45530</a>)</li>
<li>Corretto il bug di bulkimport per il campo struct<a href="https://github.com/milvus-io/milvus/pull/45536">(#45536</a>)</li>
<li>Impossibile ottenere i dati grezzi per l'indice ibrido<a href="https://github.com/milvus-io/milvus/pull/45408">(#45408</a>)</li>
<li>Trattenuta la collezione in anticipo per evitare che venga rilasciata prima del completamento della query<a href="https://github.com/milvus-io/milvus/pull/45415">(#45415</a>)</li>
<li>Utilizzava il blocco della chiave della risorsa giusta per il ddl e usava il nuovo ddl nella replica di trasferimento<a href="https://github.com/milvus-io/milvus/pull/45509">(#45509</a>)</li>
<li>Corretta la compatibilità degli indici dopo l'aggiornamento<a href="https://github.com/milvus-io/milvus/pull/45374">(#45374</a>)</li>
<li>Corretto l'errore di canale non disponibile e rilasciato il blocco della raccolta<a href="https://github.com/milvus-io/milvus/pull/45429">(#45429</a>)</li>
<li>Rimosso il meta della raccolta quando si abbandona una partizione (<a href="https://github.com/milvus-io/milvus/pull/45497">#45497</a>)</li>
<li>Corretto il segmento target contrassegnato come abbandonato per il risultato del salvataggio delle statistiche due volte<a href="https://github.com/milvus-io/milvus/pull/45479">(#45479</a>)</li>
<li>Aggiornato erroneamente il timetick delle informazioni sulla raccolta<a href="https://github.com/milvus-io/milvus/pull/45471">(#45471</a>)</li>
<li>Aggiunta la dipendenza da tzdata per abilitare il riconoscimento dell'id del fuso orario iana (<a href="https://github.com/milvus-io/milvus/pull/45495">#45495</a>)</li>
<li>Corretto il calcolo dell'offset dei dati di campo nelle funzioni di rerank per la ricerca in blocco<a href="https://github.com/milvus-io/milvus/pull/45482">(#45482</a>)</li>
<li>Corretta la geometria del filtro per la crescita con mmap<a href="https://github.com/milvus-io/milvus/pull/45465">(#45465</a>)</li>
<li>Nextfieldid non considerava la struct<a href="https://github.com/milvus-io/milvus/pull/45438">(#45438</a>)</li>
<li>Il valore del gruppo era nullo<a href="https://github.com/milvus-io/milvus/pull/45419">(#45419</a>)</li>
<li>Fornita una stima accurata delle dimensioni per gli array di frecce affettate nella compattazione<a href="https://github.com/milvus-io/milvus/pull/45352">(#45352</a>)</li>
<li>Corretta la corsa ai dati nel client del flusso di replica (<a href="https://github.com/milvus-io/milvus/pull/45347">#45347</a>)</li>
<li>Saltata la costruzione dell'indice di testo per le colonne appena aggiunte<a href="https://github.com/milvus-io/milvus/pull/45317">(#45317</a>)</li>
<li>Ignorati accidentalmente i segmenti sigillati nella compattazione l0<a href="https://github.com/milvus-io/milvus/pull/45341">(#45341</a>)</li>
<li>Spostato il finishload prima della creazione dell'indice di testo per garantire la disponibilità dei dati grezzi<a href="https://github.com/milvus-io/milvus/pull/45335">(#45335</a>)</li>
<li>Non ha usato json_shredding per il percorso json è nullo<a href="https://github.com/milvus-io/milvus/pull/45311">(#45311</a>)</li>
<li>Correzioni selezionate relative a timestamptz (<a href="https://github.com/milvus-io/milvus/pull/45321">#45321</a>)</li>
<li>Corretto il fallimento del segmento di carico a causa dell'errore di utilizzo del disco (<a href="https://github.com/milvus-io/milvus/pull/45300">#45300</a>)</li>
<li>Supportato il valore predefinito di json nella compattazione<a href="https://github.com/milvus-io/milvus/pull/45331">(#45331</a>)</li>
<li>Calcolata la dimensione corretta del batch per l'indice geometrico del segmento in crescita<a href="https://github.com/milvus-io/milvus/pull/45261">(#45261</a>)</li>
<li>Applicata la patch per il bug del framework ddl<a href="https://github.com/milvus-io/milvus/pull/45292">(#45292</a>)</li>
<li>Corretto il fallimento della raccolta di alter con l'impostazione mmap per la struct<a href="https://github.com/milvus-io/milvus/pull/45240">(#45240</a>)</li>
<li>Inizializzato l'intervallo di timestamp nello scrittore composito di binlog<a href="https://github.com/milvus-io/milvus/pull/45283">(#45283</a>)</li>
<li>Saltata la creazione di tmp dir per la crescita dell'indice r-tree<a href="https://github.com/milvus-io/milvus/pull/45257">(#45257</a>)</li>
<li>Evitate potenziali condizioni di gara durante l'aggiornamento dell'esecutore<a href="https://github.com/milvus-io/milvus/pull/45232">(#45232</a>)</li>
<li>Consentito "[" e "]" nel nome dell'indice<a href="https://github.com/milvus-io/milvus/pull/45194">(#45194</a>)</li>
<li>Corretto il bug per la distruzione di json quando il json è vuoto ma non nullo<a href="https://github.com/milvus-io/milvus/pull/45214">(#45214</a>)</li>
<li>Assicurato che l'operazione di append potesse essere annullata solo dalla wal stessa ma non dall'rpc<a href="https://github.com/milvus-io/milvus/pull/45079">(#45079</a>)</li>
<li>Risolto il problema di accesso al cloud storage di wp gcp con ak/sk<a href="https://github.com/milvus-io/milvus/pull/45144">(#45144</a>)</li>
<li>Corretta l'importazione di dati geometrici nulli<a href="https://github.com/milvus-io/milvus/pull/45162">(#45162</a>)</li>
<li>Aggiunto il controllo di null per packed_writer_ in jsonstatsparquetwriter::close()<a href="https://github.com/milvus-io/milvus/pull/45176">(#45176</a>)</li>
<li>Fallito il mmap di emb_list_meta nell'elenco di incorporazioni<a href="https://github.com/milvus-io/milvus/pull/45126">(#45126</a>)</li>
<li>Aggiornate le metriche delle numentities dei querynode quando la collezione non aveva segmenti<a href="https://github.com/milvus-io/milvus/pull/45160">(#45160</a>)</li>
<li>Impedito il tentativo quando si importano stringhe utf-8 non valide<a href="https://github.com/milvus-io/milvus/pull/45068">(#45068</a>)</li>
<li>Gestiti i fielddata vuoti in reduce/rerank per lo scenario requery<a href="https://github.com/milvus-io/milvus/pull/45137">(#45137</a>)</li>
<li>Corretto il panico quando si arresta con grazia cdc<a href="https://github.com/milvus-io/milvus/pull/45095">(#45095</a>)</li>
<li>Corretta la contaminazione del token auth, il supporto oss/cos, i log di errore di sincronizzazione ridondanti<a href="https://github.com/milvus-io/milvus/pull/45106">(#45106</a>)</li>
<li>Gestiti i dati tutti nulli in stringindexsort per evitare il timeout del caricamento<a href="https://github.com/milvus-io/milvus/pull/45104">(#45104</a>)</li>
<li>Disabilitata la costruzione di jsonstats di vecchia versione dalla richiesta<a href="https://github.com/milvus-io/milvus/pull/45102">(#45102</a>)</li>
<li>Corretto un bug per l'importazione di dati geometrici<a href="https://github.com/milvus-io/milvus/pull/45090">(#45090</a>)</li>
<li>Corretto il bug dell'importazione di parquet in struct<a href="https://github.com/milvus-io/milvus/pull/45071">(#45071</a>)</li>
<li>Aggiunto getmetrics a indexnodeserver per garantire la compatibilità<a href="https://github.com/milvus-io/milvus/pull/45074">(#45074</a>)</li>
<li>Corretto il fallimento della raccolta di alter per i sottocampi delle struct<a href="https://github.com/milvus-io/milvus/pull/45042">(#45042</a>)</li>
<li>Corretta la mmap a livello di raccolta che non ha effetto per le struct<a href="https://github.com/milvus-io/milvus/pull/44997">(#44997</a>)</li>
<li>Impedita la corsa ai dati nell'aggiornamento del notificatore della raccolta querycoord (<a href="https://github.com/milvus-io/milvus/pull/45051">#45051</a>)</li>
<li>Gestiti i valori predefiniti dei campi json nel livello di memorizzazione<a href="https://github.com/milvus-io/milvus/pull/45009">(#45009</a>)</li>
<li>Doppio controllo per evitare che l'iter venga cancellato da un altro thread<a href="https://github.com/milvus-io/milvus/pull/45015">(#45015</a>)</li>
<li>Corretto il bug della funzione gis per filtrare la geometria<a href="https://github.com/milvus-io/milvus/pull/44967">(#44967</a>)</li>
</ul>
<h2 id="v265" class="common-anchor-header">v2.6.5<button data-href="#v265" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 11 novembre 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versione Milvus</th><th style="text-align:left">Versione SDK Python</th><th style="text-align:left">Versione SDK Node.js</th><th style="text-align:left">Versione dell'SDK Java</th><th style="text-align:left">Versione dell'SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.7</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Siamo lieti di annunciare il rilascio di Milvus 2.6.5, che risolve una <strong>vulnerabilità di sicurezza critica</strong> <a href="https://github.com/milvus-io/milvus/security/advisories/GHSA-mhjq-8c7m-3f7p">CVE-2025-64513</a> e viene aggiornato a Go 1.24.9. Incoraggiamo vivamente <strong>tutti gli utenti di Milvus 2.6.x ad aggiornare alla versione 2.6.5</strong> il prima possibile. Questo aggiornamento include anche numerosi altri miglioramenti e correzioni di bug e offre agli utenti un'esperienza più solida ed efficiente.</p>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Aggiornamento del tag immagine del costruttore con go1.24.9<a href="https://github.com/milvus-io/milvus/pull/45398">(#45398</a>)</li>
<li>Saltato il controllo dell'id sorgente<a href="https://github.com/milvus-io/milvus/pull/45379">(#45379</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Il valore del gruppo è nullo<a href="https://github.com/milvus-io/milvus/pull/45421">(#45421</a>)</li>
<li>Inizializzato l'intervallo di timestamp nello scrittore composito di binlog (<a href="https://github.com/milvus-io/milvus/pull/45402">#45402</a>)</li>
<li>Gestiti i dati dei campi vuoti in reduce/rerank per lo scenario requery (<a href="https://github.com/milvus-io/milvus/pull/45389">#45389</a>)</li>
<li>Aggiunto controllo null per packed_writer_ in jsonstatsparquetwrite...<a href="https://github.com/milvus-io/milvus/pull/45376">(#45376</a>)</li>
<li>Saltata la costruzione dell'indice di testo per le colonne appena aggiunte<a href="https://github.com/milvus-io/milvus/pull/45358">(#45358</a>)</li>
<li>Ignorati accidentalmente i segmenti sigillati nella compattazione l0<a href="https://github.com/milvus-io/milvus/pull/45351">(#45351</a>)</li>
<li>Spostato il finishload prima della creazione dell'indice di testo per garantire la disponibilità dei dati grezzi<a href="https://github.com/milvus-io/milvus/pull/45336">(#45336</a>)</li>
<li>Supportato il valore predefinito di json nella compattazione<a href="https://github.com/milvus-io/milvus/pull/45332">(#45332</a>)</li>
<li>Aggiornato milvus-storage per correggere l'inizializzazione duplicata di aws sdk (<a href="https://github.com/milvus-io/milvus/pull/45075">#45075</a>)</li>
</ul>
<h2 id="v264" class="common-anchor-header">v2.6.4<button data-href="#v264" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 21 ottobre 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versione di Milvus</th><th style="text-align:left">Versione dell'SDK Python</th><th style="text-align:left">Versione dell'SDK Node.js</th><th style="text-align:left">Versione dell'SDK Java</th><th style="text-align:left">Versione dell'SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Siamo lieti di annunciare il rilascio di Milvus 2.6.4, che presenta una serie di nuove potenti funzionalità, miglioramenti delle prestazioni e correzioni di bug essenziali. Questo aggiornamento introduce importanti funzionalità come Struct in ARRAY per una modellazione avanzata dei dati. Inoltre, abbiamo abilitato il JSON Shredding per impostazione predefinita, migliorando ulteriormente le prestazioni e l'efficienza delle query. Sono stati risolti anche diversi bug critici per garantire maggiore stabilità e affidabilità. Con questa release, Milvus continua a fornire un'esperienza più solida ed efficiente a tutti gli utenti. Di seguito sono riportati i punti salienti di questa release.</p>
<h3 id="Features" class="common-anchor-header">Caratteristiche<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Struct in ARRAY: Milvus ha introdotto il nuovo tipo di dati Struct, che consente agli utenti di organizzare e gestire più campi correlati all'interno di una singola entità. Attualmente, Struct può essere utilizzato solo come elemento sotto DataType.ARRAY, consentendo funzionalità come Array of Vector, dove ogni riga contiene più vettori, aprendo nuove possibilità per la modellazione e la ricerca di dati complessi.<a href="https://github.com/milvus-io/milvus/pull/42148">(#42148</a>)</li>
<li>Supporto del modello Qwen GTE-rerank-v2 in DashScope<a href="https://github.com/milvus-io/milvus/pull/44660">(#44660</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Aggiornata la versione di Go alla 1.24.6</strong> con image builder<a href="https://github.com/milvus-io/milvus/pull/44763">(#44763</a>)</li>
<li>Abilitata la triturazione JSON predefinita (<a href="https://github.com/milvus-io/milvus/pull/44811">#44811</a>)</li>
<li>Aggiunta quota disco per le dimensioni del binlog caricato per evitare errori di caricamento del nodo di query (<a href="https://github.com/milvus-io/milvus/pull/44932">#44932</a>)</li>
<li>Abilitato il supporto mmap per struct array in MemVectorIndex<a href="https://github.com/milvus-io/milvus/pull/44832">(#44832</a>)</li>
<li>Aggiunta la gestione del livello di cache per TextMatchIndex (<a href="https://github.com/milvus-io/milvus/pull/44768">#44768</a>)</li>
<li>Ottimizzate le prestazioni di ricerca inversa delle bitmap (<a href="https://github.com/milvus-io/milvus/pull/44838">#44838</a>)</li>
<li>Aggiornata la versione di Knowhere<a href="https://github.com/milvus-io/milvus/pull/44707">(#44707</a> <a href="https://github.com/milvus-io/milvus/pull/44765">#44765</a>)</li>
<li>Rimossi i controlli sull'uso logico durante il caricamento dei segmenti<a href="https://github.com/milvus-io/milvus/pull/44770">(#44770</a>)</li>
<li>Aggiunto campo del log degli accessi per le informazioni sulla lunghezza del valore del template (<a href="https://github.com/milvus-io/milvus/pull/44783">#44783</a>)</li>
<li>Consentita la sovrascrittura del tipo di indice corrente durante la creazione dell'indice<a href="https://github.com/milvus-io/milvus/pull/44754">(#44754</a>)</li>
<li>Aggiunti parametri di caricamento per l'indice vettoriale<a href="https://github.com/milvus-io/milvus/pull/44749">(#44749</a>)</li>
<li>Gestione unificata dello stato delle attività dell'esecutore di compattazione (<a href="https://github.com/milvus-io/milvus/pull/44722">#44722</a>)</li>
<li>Aggiunti log raffinati per lo scheduler delle attività in QueryCoord<a href="https://github.com/milvus-io/milvus/pull/44725">(#44725</a>)</li>
<li>Assicurato che accesslog.$consistency_level rappresenti il valore effettivo utilizzato (<a href="https://github.com/milvus-io/milvus/pull/44711">#44711</a>)</li>
<li>Rimosso il channel manager ridondante da datacoord<a href="https://github.com/milvus-io/milvus/pull/44679">(#44679</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Rimosso GCC dal file Docker di compilazione per correggere CVE<a href="https://github.com/milvus-io/milvus/pull/44882">(#44882</a>)</li>
<li>Assicurato l'ordinamento deterministico dei risultati della ricerca quando i punteggi sono uguali<a href="https://github.com/milvus-io/milvus/pull/44884">(#44884</a>)</li>
<li>Riclassificazione prima della richiesta se il reranker non utilizzava i dati del campo<a href="https://github.com/milvus-io/milvus/pull/44943">(#44943</a>)</li>
<li>Assicurato l'adempimento della promessa quando CreateArrowFileSystem lancia un'eccezione<a href="https://github.com/milvus-io/milvus/pull/44976">(#44976</a>)</li>
<li>Corretta la configurazione mancante della crittografia del disco<a href="https://github.com/milvus-io/milvus/pull/44839">(#44839</a>)</li>
<li>Corretto il problema della disattivazione del controllo del saldo che causa l'arresto del saldo<a href="https://github.com/milvus-io/milvus/pull/44836">(#44836</a>)</li>
<li>Corretto il problema per cui "non uguale" non include "nessuno"<a href="https://github.com/milvus-io/milvus/pull/44960">(#44960</a>)</li>
<li>Supportato il valore predefinito JSON in CreateArrowScalarFromDefaultValue<a href="https://github.com/milvus-io/milvus/pull/44952">(#44952</a>)</li>
<li>Usata stringa di debug breve per evitare i newline nei log di debug (<a href="https://github.com/milvus-io/milvus/pull/44929">#44929</a>)</li>
<li>Corretta l'espressione exists per l'indice piatto JSON<a href="https://github.com/milvus-io/milvus/pull/44951">(#44951</a>)</li>
<li>Semantica unificata del percorso JSON exists (<a href="https://github.com/milvus-io/milvus/pull/44926">#44926</a>)</li>
<li>Corretto il panico causato da un messaggio di inserimento interno vuoto (<a href="https://github.com/milvus-io/milvus/pull/44906">#44906</a>)</li>
<li>Aggiornati i parametri AI/SAQ<a href="https://github.com/milvus-io/milvus/pull/44862">(#44862</a>)</li>
<li>Rimosso il limite alla deduplicazione quando l'autoindex è disabilitato<a href="https://github.com/milvus-io/milvus/pull/44824">(#44824</a>)</li>
<li>Evitate operazioni concomitanti di reset/add sulle metriche DataCoord<a href="https://github.com/milvus-io/milvus/pull/44815">(#44815</a>)</li>
<li>Corretto un bug in JSON_contains(path, int)<a href="https://github.com/milvus-io/milvus/pull/44818">(#44818</a>)</li>
<li>Evitata l'eviction nel livello di cache durante la gestione di JSON<a href="https://github.com/milvus-io/milvus/pull/44813">(#44813</a>)</li>
<li>Corretti i risultati errati del filtro exp quando viene saltato<a href="https://github.com/milvus-io/milvus/pull/44779">(#44779</a>)</li>
<li>Controllato se il nodo di query è SQN con etichetta ed elenco di nodi in streaming (<a href="https://github.com/milvus-io/milvus/pull/44793">#44793</a>)</li>
<li>Corretto BM25 con boost che restituisce risultati non ordinati<a href="https://github.com/milvus-io/milvus/pull/44759">(#44759</a>)</li>
<li>Corretta l'importazione in blocco con ID automatico<a href="https://github.com/milvus-io/milvus/pull/44694">(#44694</a>)</li>
<li>Passato il file system tramite FileManagerContext durante il caricamento dell'indice<a href="https://github.com/milvus-io/milvus/pull/44734">(#44734</a>)</li>
<li>Usato "alla fine" e corretto l'ID dell'attività che appare in entrambi gli stati di esecuzione e completamento<a href="https://github.com/milvus-io/milvus/pull/44715">(#44715</a>)</li>
<li>Rimosso il tick dell'ora di inizio non corretto per evitare di filtrare i DML con tempi inferiori<a href="https://github.com/milvus-io/milvus/pull/44692">(#44692</a>)</li>
<li>Il fornitore di credenziali AWS è diventato un singleton<a href="https://github.com/milvus-io/milvus/pull/44705">(#44705</a>).</li>
<li>Disabilitato lo shredding per i percorsi JSON contenenti cifre<a href="https://github.com/milvus-io/milvus/pull/44808">(#44808</a>)</li>
<li>Corretto un test unitario valido per TestUnaryRangeJsonNullable<a href="https://github.com/milvus-io/milvus/pull/44990">(#44990</a>)</li>
<li>Corretti i test unitari e rimossa la logica di fallback del file system (<a href="https://github.com/milvus-io/milvus/pull/44686">#44686</a>)</li>
</ul>
<h2 id="v263" class="common-anchor-header">v2.6.3<button data-href="#v263" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 11 ottobre 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versione di Milvus</th><th style="text-align:left">Versione dell'SDK Python</th><th style="text-align:left">Versione dell'SDK Node.js</th><th style="text-align:left">Versione dell'SDK Java</th><th style="text-align:left">Versione dell'SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Siamo lieti di annunciare il rilascio di Milvus 2.6.3, che introduce una serie di nuove caratteristiche, miglioramenti e correzioni di bug critici. Questa versione migliora le prestazioni del sistema, amplia le funzionalità e corregge i problemi principali, offrendo un'esperienza più stabile a tutti gli utenti. Di seguito sono riportati i punti salienti di questa versione:</p>
<h3 id="New-Features" class="common-anchor-header">Nuove funzioni<button data-href="#New-Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Chiave primaria con AutoID abilitato: Gli utenti possono ora scrivere il campo della chiave primaria quando <code translate="no">autoid</code> è abilitato.<a href="https://github.com/milvus-io/milvus/pull/44424">(#44424</a> <a href="https://github.com/milvus-io/milvus/pull/44530">#44530</a>)</li>
<li>Compattazione manuale per i segmenti L0: Aggiunto il supporto per la compattazione manuale dei segmenti L0.<a href="https://github.com/milvus-io/milvus/pull/44440">(#44440</a>)</li>
<li>Codifica dell'ID del cluster in AutoID: gli ID generati automaticamente ora includono l'ID del cluster.<a href="https://github.com/milvus-io/milvus/pull/44471">(#44471</a>)</li>
<li>Supporto del tokenizer gRPC: Integrazione del tokenizer gRPC per una maggiore flessibilità delle query.<a href="https://github.com/milvus-io/milvus/pull/41994">(#41994</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Raffinato il controllore di bilanciamento implementando una coda di priorità, per migliorare la distribuzione dei compiti.<a href="https://github.com/milvus-io/milvus/pull/43992">(#43992</a>)</li>
<li>Precaricate le statistiche di BM25 per i segmenti sigillati e ottimizzata la serializzazione.<a href="https://github.com/milvus-io/milvus/pull/44279">(#44279</a>)</li>
<li>I campi nulli possono ora essere usati come input per le funzioni di BM25.<a href="https://github.com/milvus-io/milvus/pull/44586">(#44586</a>)</li>
<li>Aggiunto il supporto per Azure Blob Storage in Woodpecker.<a href="https://github.com/milvus-io/milvus/pull/44592">(#44592</a>)</li>
<li>Eliminati i file di piccole dimensioni subito dopo la compattazione dei segmenti di Woodpecker.<a href="https://github.com/milvus-io/milvus/pull/44473">(#44473</a>)</li>
<li>Abilitata la funzionalità di punteggio casuale per le query di boosting.<a href="https://github.com/milvus-io/milvus/pull/44214">(#44214</a>)</li>
<li>Nuove opzioni di configurazione per il tipo di vettore <code translate="no">int8</code> nell'autoindicizzazione.<a href="https://github.com/milvus-io/milvus/pull/44554">(#44554</a>)</li>
<li>Aggiunte voci di parametro per controllare la politica di richiesta di ricerca ibrida.<a href="https://github.com/milvus-io/milvus/pull/44466">(#44466</a>)</li>
<li>Aggiunto il supporto per controllare l'inserimento dei campi di output delle funzioni.<a href="https://github.com/milvus-io/milvus/pull/44162">(#44162</a>)</li>
<li>La funzione di decadimento ora supporta l'unione dei punteggi configurabile per migliorare le prestazioni.<a href="https://github.com/milvus-io/milvus/pull/44066">(#44066</a>)</li>
<li>Migliorate le prestazioni della ricerca binaria sulle stringhe.<a href="https://github.com/milvus-io/milvus/pull/44469">(#44469</a>)</li>
<li>Introdotto il supporto per i filtri sparsi nelle query. <a href="https://github.com/milvus-io/milvus/pull/44347">(#44347</a>)</li>
<li>Vari aggiornamenti per migliorare la funzionalità degli indici a livelli.<a href="https://github.com/milvus-io/milvus/pull/44433">(#44433</a>)</li>
<li>Aggiunto il monitoraggio dell'uso delle risorse di archiviazione per le ricerche scalari e vettoriali.<a href="https://github.com/milvus-io/milvus/pull/44414">(#44414</a> <a href="https://github.com/milvus-io/milvus/pull/44308">#44308</a>)</li>
<li>Aggiunto l'uso dello storage per delete/upsert/restful<a href="https://github.com/milvus-io/milvus/pull/44512">(#44512</a>)</li>
<li>Abilitati gli obiettivi di flush granulare per le operazioni <code translate="no">flushall</code>.<a href="https://github.com/milvus-io/milvus/pull/44234">(#44234</a>)</li>
<li>I datanode ora usano un file system non singleton per una migliore gestione delle risorse.<a href="https://github.com/milvus-io/milvus/pull/44418">(#44418</a>)</li>
<li>Aggiunte opzioni di configurazione per l'elaborazione batch nei metadati. <a href="https://github.com/milvus-io/milvus/pull/44645">(#44645</a>)</li>
<li>I messaggi di errore ora includono il nome del database per una maggiore chiarezza.<a href="https://github.com/milvus-io/milvus/pull/44618">(#44618</a>)</li>
<li>Spostato il test del tracciatore nel repository <code translate="no">milvus-common</code> per una migliore modularizzazione.<a href="https://github.com/milvus-io/milvus/pull/44605">(#44605</a>)</li>
<li>Spostati i file dei test unitari delle API C nella directory <code translate="no">src</code> per una migliore organizzazione.<a href="https://github.com/milvus-io/milvus/pull/44458">(#44458</a>)</li>
<li>L'SDK di Go ora consente agli utenti di inserire dati di chiavi primarie se <code translate="no">autoid</code> è abilitato.<a href="https://github.com/milvus-io/milvus/pull/44561">(#44561</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Risolte le vulnerabilità CVE-2020-25576 e WS-2023-0223.<a href="https://github.com/milvus-io/milvus/pull/44163">(#44163</a>)</li>
<li>Corretto un problema per cui le risorse logiche venivano utilizzate per le metriche nel centro quote sui nodi di streaming.<a href="https://github.com/milvus-io/milvus/pull/44613">(#44613</a>)</li>
<li>Impostare <code translate="no">mixcoord</code> in <code translate="no">activatefunc</code> quando si abilita lo standby.<a href="https://github.com/milvus-io/milvus/pull/44621">(#44621</a>)</li>
<li>Rimossa l'inizializzazione ridondante dei componenti dello storage V2. <a href="https://github.com/milvus-io/milvus/pull/44597">#44597</a>)</li>
<li>Corretto il blocco dell'attività di compattazione a causa dell'uscita dal ciclo dell'esecutore.<a href="https://github.com/milvus-io/milvus/pull/44543">(#44543</a>)</li>
<li>Rimosso l'uso delle risorse caricate nel distruttore di <code translate="no">insert/deleterecord</code>.<a href="https://github.com/milvus-io/milvus/pull/44555">(#44555</a>)</li>
<li>Corretto un problema per cui il replicatore non poteva arrestarsi e migliorato il validatore della configurazione di replica.<a href="https://github.com/milvus-io/milvus/pull/44531">(#44531</a>)</li>
<li>Impostare <code translate="no">mmap_file_raii_</code> su <code translate="no">nullptr</code> quando mmap è disabilitato.<a href="https://github.com/milvus-io/milvus/pull/44516">(#44516</a>)</li>
<li>Fatto in modo che <code translate="no">diskfilemanager</code> utilizzi il file system dal contesto.<a href="https://github.com/milvus-io/milvus/pull/44535">(#44535</a>)</li>
<li>Forzato l'host virtuale per OSS e COS in storage V2.<a href="https://github.com/milvus-io/milvus/pull/44484">(#44484</a>)</li>
<li>Impostato il valore predefinito di <code translate="no">report_value</code> quando <code translate="no">extrainfo</code> non è <code translate="no">nil</code> per compatibilità.<a href="https://github.com/milvus-io/milvus/pull/44529">(#44529</a>)</li>
<li>Pulite le metriche delle collezioni dopo l'eliminazione delle collezioni in rootcoord.<a href="https://github.com/milvus-io/milvus/pull/44511">(#44511</a>)</li>
<li>Corretto il fallimento del caricamento dei segmenti a causa della duplicazione delle proprietà del campo <code translate="no">mmap.enable</code>.<a href="https://github.com/milvus-io/milvus/pull/44465">(#44465</a>)</li>
<li>Corretti gli errori di analisi della configurazione del carico per le repliche dinamiche.<a href="https://github.com/milvus-io/milvus/pull/44430">(#44430</a>)</li>
<li>Gestito l'input da riga a colonna per le colonne dinamiche in Go SDK.<a href="https://github.com/milvus-io/milvus/pull/44626">(#44626</a>)</li>
</ul>
<h2 id="v262" class="common-anchor-header">v2.6.2<button data-href="#v262" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 19 settembre 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versione di Milvus</th><th style="text-align:left">Versione dell'SDK Python</th><th style="text-align:left">Versione dell'SDK Node.js</th><th style="text-align:left">Versione dell'SDK Java</th><th style="text-align:left">Versione dell'SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Siamo entusiasti di annunciare il rilascio di Milvus 2.6.2! Questo aggiornamento introduce nuove potenti funzionalità, significativi miglioramenti delle prestazioni e correzioni critiche che rendono il sistema più stabile e pronto per la produzione. I punti salienti sono gli aggiornamenti parziali dei campi con l'upsert, il JSON Shredding per accelerare il filtraggio dinamico dei campi, l'indicizzazione NGram per query LIKE più veloci e l'evoluzione più flessibile dello schema sulle collezioni esistenti. Basata sul feedback della comunità, questa versione offre una base più solida per le implementazioni del mondo reale e incoraggiamo tutti gli utenti ad aggiornare per trarre vantaggio da questi miglioramenti.</p>
<h3 id="Features" class="common-anchor-header">Caratteristiche<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Aggiunto il supporto per JSON Shredding per accelerare il filtraggio dinamico dei campi. Per maggiori dettagli, consultare <a href="/docs/it/json-shredding.md">JSON Shredding</a>.</li>
<li>Aggiunto il supporto per NGRAM Index per accelerare le operazioni di tipo like. Per i dettagli, consultare <a href="/docs/it/ngram.md">NGRAM</a>.</li>
<li>Aggiunto il supporto per gli aggiornamenti parziali dei campi con l'API Upsert. Per i dettagli, fare riferimento a <a href="/docs/it/upsert-entities.md">Upsert Entities</a>.</li>
<li>Aggiunto il supporto per la funzione Boost. Per i dettagli, fare riferimento a <a href="/docs/it/boost-ranker.md">Boost Ranker</a>.</li>
<li>Aggiunto il supporto per il raggruppamento per campi JSON e campi dinamici<a href="https://github.com/milvus-io/milvus/pull/43203">(#43203</a>).</li>
<li>Aggiunto il supporto per l'abilitazione dello schema dinamico sulle collezioni esistenti<a href="https://github.com/milvus-io/milvus/pull/44151">(#44151</a>).</li>
<li>Aggiunto il supporto per l'eliminazione degli indici senza rilasciare le raccolte<a href="https://github.com/milvus-io/milvus/pull/42941">(#42941</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>[StorageV2] Modificata la dimensione del file di log in dimensione compressa<a href="https://github.com/milvus-io/milvus/pull/44402">(#44402</a>)</li>
<li>[StorageV2] Aggiunti campi figlio nelle informazioni sul carico (<a href="https://github.com/milvus-io/milvus/pull/44384">#44384</a>)</li>
<li>[StorageV2] Aggiunto il supporto per l'inclusione di chiavi di partizione e clustering nel gruppo di sistema<a href="https://github.com/milvus-io/milvus/pull/44372">(#44372</a>)</li>
<li>Rimosso il timeout per le attività di compattazione (<a href="https://github.com/milvus-io/milvus/pull/44277">#44277</a>)</li>
<li>[StorageV2] Abilitata la compilazione con Azure<a href="https://github.com/milvus-io/milvus/pull/44177">(#44177</a>)</li>
<li>[StorageV2] Utilizzate le informazioni sul gruppo per stimare l'uso della logica<a href="https://github.com/milvus-io/milvus/pull/44356">(#44356</a>)</li>
<li>[StorageV2] Utilizzate le informazioni sulla suddivisione dei gruppi per stimare l'utilizzo (<a href="https://github.com/milvus-io/milvus/pull/44338">#44338</a>)</li>
<li>[StorageV2] Salvati i risultati dei gruppi di colonne nella compattazione<a href="https://github.com/milvus-io/milvus/pull/44327">(#44327</a>)</li>
<li>[StorageV2] Aggiunte configurazioni per i criteri di suddivisione basati sulle dimensioni (<a href="https://github.com/milvus-io/milvus/pull/44301">#44301</a>)</li>
<li>[StorageV2] Aggiunto il supporto per i criteri di divisione basati sullo schema e sulle dimensioni (<a href="https://github.com/milvus-io/milvus/pull/44282">#44282</a>)</li>
<li>[StorageV2] Aggiunti criteri di suddivisione configurabili (<a href="https://github.com/milvus-io/milvus/pull/44258">#44258</a>)</li>
<li>[CachingLayer] Aggiunte altre metriche e configurazioni<a href="https://github.com/milvus-io/milvus/pull/44276">(#44276</a>)</li>
<li>Aggiunto il supporto per l'attesa che tutti gli indici siano pronti prima di caricare i segmenti<a href="https://github.com/milvus-io/milvus/pull/44313">(#44313</a>)</li>
<li>Aggiunta la metrica della latenza interna del nucleo per il nodo rescore (<a href="https://github.com/milvus-io/milvus/pull/44010">#44010</a>)</li>
<li>Ottimizzato il formato del log degli accessi quando si stampano i parametri KV<a href="https://github.com/milvus-io/milvus/pull/43742">(#43742</a>)</li>
<li>Aggiunta configurazione per modificare la dimensione del batch di istantanee di dump (<a href="https://github.com/milvus-io/milvus/pull/44215">#44215</a>)</li>
<li>Ridotto l'intervallo di pulizia delle attività di compattazione (<a href="https://github.com/milvus-io/milvus/pull/44207">#44207</a>)</li>
<li>Migliorato l'ordinamento per supportare più campi<a href="https://github.com/milvus-io/milvus/pull/44191">(#44191</a>)<a href="https://github.com/milvus-io/milvus/pull/43994">(#43994</a>)</li>
<li>Aggiunta la stima delle risorse di carico per l'indice a livelli (<a href="https://github.com/milvus-io/milvus/pull/44171">#44171</a>)</li>
<li>Aggiunta la configurazione dell'autoindice per il caso della deduplicazione<a href="https://github.com/milvus-io/milvus/pull/44186">(#44186</a>)</li>
<li>Aggiunta la configurazione per consentire caratteri personalizzati nei nomi (<a href="https://github.com/milvus-io/milvus/pull/44063">#44063</a>)</li>
<li>Aggiunto il supporto per cchannel per il servizio di streaming<a href="https://github.com/milvus-io/milvus/pull/44143">(#44143</a>)</li>
<li>Aggiunto controllo mutex e range per proteggere le cancellazioni simultanee<a href="https://github.com/milvus-io/milvus/pull/44128">(#44128</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Allineato il comportamento delle espressioni exists tra forza bruta e indice<a href="https://github.com/milvus-io/milvus/pull/44030">(#44030</a>)</li>
<li>Corretto l'errore di rinominare una collezione abbandonata<a href="https://github.com/milvus-io/milvus/pull/44436">(#44436</a>)</li>
<li>[StorageV2] Controllata la lunghezza dei campi figlio (<a href="https://github.com/milvus-io/milvus/pull/44405">#44405</a>)</li>
<li>[StorageV2] Attivato Azure per impostazione predefinita<a href="https://github.com/milvus-io/milvus/pull/44377">(#44377</a>)</li>
<li>Corretto il percorso di caricamento delle composizioni L0 sotto i datanode in pool (<a href="https://github.com/milvus-io/milvus/pull/44374">#44374</a>)</li>
<li>Disconosciuta la rinominazione se la crittografia del database è abilitata<a href="https://github.com/milvus-io/milvus/pull/44225">(#44225</a>)</li>
<li>Disconosciuta la cancellazione della proprietà dynamicfield.enable (<a href="https://github.com/milvus-io/milvus/pull/44335">#44335</a>)</li>
<li>Contrassegnati i task come falliti quando l'ID preassegnato non è valido<a href="https://github.com/milvus-io/milvus/pull/44350">(#44350</a>)</li>
<li>Saltati i controlli MVCC sulle espressioni di confronto PK (<a href="https://github.com/milvus-io/milvus/pull/44353">#44353</a>)</li>
<li>Corretto il bug di json_contains per le statistiche<a href="https://github.com/milvus-io/milvus/pull/44325">(#44325</a>)</li>
<li>Aggiunto controllo del filesystem di inizializzazione per il nodo di query e il nodo di streaming<a href="https://github.com/milvus-io/milvus/pull/44360">(#44360</a>)</li>
<li>Corretto il target di compattazione vuoto quando il segmento è stato garbage collected<a href="https://github.com/milvus-io/milvus/pull/44270">(#44270</a>)</li>
<li>Corretta la condizione di gara durante l'inizializzazione dell'indice timestamp<a href="https://github.com/milvus-io/milvus/pull/44317">(#44317</a>)</li>
<li>Controllato se arraydata è nil per evitare il panico<a href="https://github.com/milvus-io/milvus/pull/44332">(#44332</a>)</li>
<li>Corretto il bug delle statistiche JSON per gli oggetti annidati<a href="https://github.com/milvus-io/milvus/pull/44303">(#44303</a>)</li>
<li>Evitata la riscrittura di mmap da più campi JSON<a href="https://github.com/milvus-io/milvus/pull/44299">(#44299</a>)</li>
<li>Unificati i formati di dati validi<a href="https://github.com/milvus-io/milvus/pull/44296">(#44296</a>)</li>
<li>Nascoste le credenziali dei fornitori di embedding/reranking nell'interfaccia web<a href="https://github.com/milvus-io/milvus/pull/44275">(#44275</a>)</li>
<li>Corretto il percorso dello statslog sotto i datanode in pool (<a href="https://github.com/milvus-io/milvus/pull/44288">#44288</a>)</li>
<li>Corretto il percorso dell'oracolo IDF<a href="https://github.com/milvus-io/milvus/pull/44266">(#44266</a>)</li>
<li>Utilizzato il checkpoint dell'istantanea di recupero se nessun vchannel è in fase di recupero<a href="https://github.com/milvus-io/milvus/pull/44246">(#44246</a>)</li>
<li>Limitato il numero di colonne nelle statistiche JSON<a href="https://github.com/milvus-io/milvus/pull/44233">(#44233</a>)</li>
<li>Fatto indice di n-grammi per il conteggio delle risorse di carico (<a href="https://github.com/milvus-io/milvus/pull/44237">#44237</a>)</li>
<li>Dedotto il tipo di metrica dai risultati di ricerca non vuoti<a href="https://github.com/milvus-io/milvus/pull/44222">(#44222</a>)</li>
<li>Corretta la scrittura di più segmenti che scrive solo un segmento<a href="https://github.com/milvus-io/milvus/pull/44256">(#44256</a>)</li>
<li>Corretto l'ordinamento di tipo merge fuori dall'intervallo<a href="https://github.com/milvus-io/milvus/pull/44230">(#44230</a>)</li>
<li>Aggiunto controllo UTF-8 prima di eseguire la funzione BM25<a href="https://github.com/milvus-io/milvus/pull/44220">(#44220</a>)</li>
<li>Riproposta la vecchia sessione se esiste<a href="https://github.com/milvus-io/milvus/pull/44208">(#44208</a>)</li>
<li>Aggiunto limite alla dimensione del buffer di Kafka per prevenire l'OOM del datanode (<a href="https://github.com/milvus-io/milvus/pull/44106">#44106</a>)</li>
<li>Corretto il panico dovuto all'estensione dell'intervallo di protezione del blocco (<a href="https://github.com/milvus-io/milvus/pull/44130">#44130</a>)</li>
<li>Corretto il mancato flussaggio dei segmenti in crescita al cambio di schema<a href="https://github.com/milvus-io/milvus/pull/44412">(#44412</a>)</li>
<li>[StorageV2] Gestiti gli errori IO (<a href="https://github.com/milvus-io/milvus/pull/44255">#44255</a>)</li>
<li>Impedito il panico se il percorso dell'indice Tantivy non esiste<a href="https://github.com/milvus-io/milvus/pull/44135">(#44135</a>)</li>
</ul>
<h2 id="v261" class="common-anchor-header">v2.6.1<button data-href="#v261" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 3 settembre 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versione Milvus</th><th style="text-align:left">Versione dell'SDK Python</th><th style="text-align:left">Versione dell'SDK Node.js</th><th style="text-align:left">Versione dell'SDK Java</th><th style="text-align:left">Versione dell'SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Siamo entusiasti di annunciare il rilascio di Milvus 2.6.1! Questa versione si basa sui principali progressi architetturali delle versioni precedenti, apportando miglioramenti critici incentrati sulla stabilità della produzione, sulle prestazioni e sulla robustezza operativa. Questa versione risponde ai principali feedback della comunità e rafforza il sistema per le distribuzioni su larga scala. Incoraggiamo vivamente tutti gli utenti a eseguire l'aggiornamento per beneficiare di un sistema più stabile, performante e affidabile.</p>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Supporta i file system POSIX-compatibili per l'archiviazione remota<a href="https://github.com/milvus-io/milvus/pull/43944">(#43944</a>).</li>
<li>Introduce i reranker basati su modelli (<a href="https://github.com/milvus-io/milvus/pull/43270">#43270</a>)</li>
<li>Ottimizza le prestazioni delle espressioni di confronto sui campi chiave primaria (<a href="https://github.com/milvus-io/milvus/pull/43154">#43154</a>)</li>
<li>Raccoglie il doc_id dall'elenco dei post direttamente per accelerare le corrispondenze testuali<a href="https://github.com/milvus-io/milvus/pull/43899">(#43899</a>)</li>
<li>Ottimizza le prestazioni delle query convertendo più condizioni != in una singola clausola NOT IN (<a href="https://github.com/milvus-io/milvus/pull/43690">#43690</a>)</li>
<li>Migliora la gestione delle risorse per il livello di cache durante il caricamento dei segmenti<a href="https://github.com/milvus-io/milvus/pull/43846">(#43846</a>)</li>
<li>Migliora la stima della memoria per gli indici intermedi durante il caricamento dei dati<a href="https://github.com/milvus-io/milvus/pull/44104">(#44104</a>)</li>
<li>Rende configurabile il rapporto di costruzione per gli indici intermedi<a href="https://github.com/milvus-io/milvus/pull/43939">(#43939</a>)</li>
<li>Aggiunge un limite di velocità di scrittura configurabile al masterizzatore di dischi<a href="https://github.com/milvus-io/milvus/pull/43912">(#43912</a>)</li>
<li>I parametri di SegCore possono ora essere aggiornati dinamicamente senza riavviare il servizio Milvus<a href="https://github.com/milvus-io/milvus/pull/43231">(#43231</a>)</li>
<li>Aggiunge metriche di latenza gRPC unificate per una migliore osservabilità<a href="https://github.com/milvus-io/milvus/pull/44089">(#44089</a>)</li>
<li>Include i timestamp delle richieste client nelle intestazioni gRPC per semplificare il debug (<a href="https://github.com/milvus-io/milvus/pull/44059">#44059</a>)</li>
<li>Supporta il livello di trace log per segcore<a href="https://github.com/milvus-io/milvus/pull/44003">(#44003</a>)</li>
<li>Aggiunge un interruttore configurabile per regolare le garanzie di coerenza per una maggiore disponibilità (<a href="https://github.com/milvus-io/milvus/pull/43874">#43874</a>)</li>
<li>Implementa un robusto meccanismo di rewatch per gestire i fallimenti delle connessioni etcd<a href="https://github.com/milvus-io/milvus/pull/43829">(#43829</a>)</li>
<li>Migliora la logica interna di controllo dello stato di salute dei nodi<a href="https://github.com/milvus-io/milvus/pull/43768">(#43768</a>)</li>
<li>Ottimizza l'accesso ai metadati quando si elencano le raccolte<a href="https://github.com/milvus-io/milvus/pull/43902">(#43902</a>)</li>
<li>Aggiorna il client Pulsar alla versione ufficiale v0.15.1 e aggiunge più log (<a href="https://github.com/milvus-io/milvus/pull/43913">#43913</a>)</li>
<li>Aggiorna aws-sdk da 1.9.234 a 1.11.352<a href="https://github.com/milvus-io/milvus/pull/43916">(#43916</a>)</li>
<li>Supporta gli aggiornamenti dinamici degli intervalli per i componenti dei ticker (<a href="https://github.com/milvus-io/milvus/pull/43865">#43865</a>)</li>
<li>Migliora il rilevamento automatico dei set di istruzioni ARM SVE per le operazioni bitset (<a href="https://github.com/milvus-io/milvus/pull/43833">#43833</a>)</li>
<li>Migliora il messaggio di errore quando una corrispondenza di testo o di frase fallisce<a href="https://github.com/milvus-io/milvus/pull/43366">(#43366</a>)</li>
<li>Migliora il messaggio di errore in caso di mancata corrispondenza delle dimensioni del vettore (<a href="https://github.com/milvus-io/milvus/pull/43835">#43835</a>)</li>
<li>Migliora la segnalazione degli errori per i timeout di append quando l'archivio oggetti non è disponibile<a href="https://github.com/milvus-io/milvus/pull/43926">(#43926</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Corregge un potenziale problema di Out-Of-Memory (OOM) durante le importazioni di file Parquet (<a href="https://github.com/milvus-io/milvus/pull/43756">#43756</a>)</li>
<li>Corregge un problema per cui i nodi in standby non potevano ripristinarsi se il loro lease scadeva (<a href="https://github.com/milvus-io/milvus/pull/44112">#44112</a>)</li>
<li>Gestisce correttamente lo stato di retry della compattazione (<a href="https://github.com/milvus-io/milvus/pull/44119">#44119</a>)</li>
<li>Corregge un potenziale deadlock tra le richieste di lettura continua e il caricamento degli indici che poteva impedire il caricamento degli indici<a href="https://github.com/milvus-io/milvus/pull/43937">(#43937</a>)</li>
<li>Corregge un bug che poteva far fallire le cancellazioni di dati in scenari ad alta liquidità (<a href="https://github.com/milvus-io/milvus/pull/43831">#43831</a>)</li>
<li>Corregge una potenziale condizione di gara durante il caricamento di indici di testo e JSON<a href="https://github.com/milvus-io/milvus/pull/43811">(#43811</a>)</li>
<li>Corregge un'incoerenza dello stato del nodo che potrebbe verificarsi dopo un riavvio di QueryCoord<a href="https://github.com/milvus-io/milvus/pull/43941">(#43941</a>)</li>
<li>Assicura che un QueryNode "sporco" venga ripulito correttamente dopo un riavvio<a href="https://github.com/milvus-io/milvus/pull/43909">(#43909</a>)</li>
<li>Corregge un problema per cui lo stato di retry non veniva gestito correttamente per le richieste con payload non vuoto<a href="https://github.com/milvus-io/milvus/pull/44068">(#44068</a>)</li>
<li>Corregge un problema per cui il bulk writer v2 non usava il nome corretto del bucket (<a href="https://github.com/milvus-io/milvus/pull/44083">#44083</a>)</li>
<li>Migliora la sicurezza nascondendo gli elementi sensibili dall'endpoint RESTful get_configs (<a href="https://github.com/milvus-io/milvus/pull/44057">#44057</a>)</li>
<li>Assicura che i caricamenti di oggetti per woodpecker siano idempotenti durante i tentativi di timeout (<a href="https://github.com/milvus-io/milvus/pull/43947">#43947</a>)</li>
<li>Disabilita l'importazione di elementi nulli in campi array da file Parquet<a href="https://github.com/milvus-io/milvus/pull/43964">(#43964</a>)</li>
<li>Corregge un bug per cui la cache del proxy non veniva invalidata dopo la creazione di un alias di raccolta (<a href="https://github.com/milvus-io/milvus/pull/43854">#43854</a>)</li>
<li>Migliora il meccanismo interno di scoperta dei servizi per i nodi di streaming<a href="https://github.com/milvus-io/milvus/pull/44033">(#44033</a>)</li>
<li>Corregge la logica dei gruppi di risorse per filtrare correttamente i nodi di streaming<a href="https://github.com/milvus-io/milvus/pull/43984">(#43984</a>)</li>
<li>Aggiunge l'etichetta databaseName alle metriche per evitare conflitti di denominazione in ambienti multi-database<a href="https://github.com/milvus-io/milvus/pull/43808">(#43808</a>)</li>
<li>Corregge un errore logico nella gestione dello stato interno dei task (<a href="https://github.com/milvus-io/milvus/pull/43777">#43777</a>)</li>
<li>Ottimizza i tempi di inizializzazione delle metriche interne per evitare un potenziale panico<a href="https://github.com/milvus-io/milvus/pull/43773">(#43773</a>)</li>
<li>Corregge un raro potenziale crash nel server HTTP interno<a href="https://github.com/milvus-io/milvus/pull/43799">(#43799</a>)</li>
</ul>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 6 agosto 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versione di Milvus</th><th style="text-align:left">Versione dell'SDK Python</th><th style="text-align:left">Versione dell'SDK Node.js</th><th style="text-align:left">Versione dell'SDK Java</th><th style="text-align:left">Versione dell'SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0 è ufficialmente rilasciato! Basandosi sulle fondamenta architettoniche gettate nella versione <a href="#v260-rc1">2.6.0-rc1</a>, questa versione pronta per la produzione risolve numerosi problemi di stabilità e prestazioni, introducendo al contempo nuove potenti funzionalità, tra cui Storage Format V2, elaborazione avanzata di JSON e funzioni di ricerca migliorate. Con ampie correzioni di bug e ottimizzazioni basate sul feedback della comunità durante la fase RC, Milvus 2.6.0 è pronto per essere esplorato e adottato.</p>
<div class="alert warning">
<p>L'aggiornamento diretto dalle versioni precedenti alla 2.6.0 non è supportato a causa delle modifiche architettoniche. Seguite la nostra <a href="/docs/it/upgrade_milvus_cluster-operator.md">guida all'aggiornamento</a>.</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">Novità della versione 2.6.0 (dalla RC)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">Formato di archiviazione ottimizzato v2</h4><p>Per affrontare le sfide dell'archiviazione di dati misti scalari e vettoriali, in particolare le ricerche di punti su dati non strutturati, Milvus 2.6 introduce il formato di archiviazione V2. Questo nuovo formato di archiviazione colonnare adattivo adotta una strategia di layout "unione di colonne strette + indipendenza di colonne larghe", risolvendo fondamentalmente i colli di bottiglia delle prestazioni quando si gestiscono le ricerche di punti e i recuperi di piccoli lotti nei database vettoriali.</p>
<p>Il nuovo formato supporta ora un accesso casuale efficiente senza amplificazione dell'I/O e consente di ottenere un aumento delle prestazioni fino a 100 volte rispetto al formato Parquet vanilla adottato in precedenza, rendendolo ideale per i carichi di lavoro AI che richiedono sia un'elaborazione analitica che un preciso recupero vettoriale. Inoltre, può ridurre il numero di file fino al 98% per i carichi di lavoro tipici. Il consumo di memoria per la compattazione principale è ridotto del 300% e le operazioni di I/O sono ottimizzate fino all'80% in lettura e oltre il 600% in scrittura.</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">Indice piatto JSON (beta)</h4><p>Milvus 2.6 introduce JSON Flat Index per gestire schemi JSON altamente dinamici. A differenza di JSON Path Index, che richiede la pre-dichiarazione di percorsi specifici e dei loro tipi previsti, JSON Flat Index scopre e indicizza automaticamente tutte le strutture annidate sotto un determinato percorso. Quando indicizza un campo JSON, appiattisce ricorsivamente l'intero sottoalbero, creando voci di indice invertite per ogni coppia percorso-valore che incontra, indipendentemente dalla profondità o dal tipo. Questo appiattimento automatico rende JSON Flat Index ideale per schemi in evoluzione in cui nuovi campi appaiono senza preavviso. Ad esempio, se si indicizza un campo "metadata", il sistema gestirà automaticamente nuovi campi annidati come "metadata.version2.features.experimental" man mano che appaiono nei dati in arrivo, senza richiedere una nuova configurazione dell'indice.</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">Richiamo delle caratteristiche del Core 2.6.0<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>Per informazioni dettagliate sulle modifiche all'architettura e sulle funzionalità introdotte nella versione 2.6.0-RC, consultare la <a href="#v260-rc1">nota di rilascio 2.6.0-rc1</a>.</p>
</div>
<h4 id="Architecture-simplification" class="common-anchor-header">Semplificazione dell'architettura</h4><ul>
<li>Streaming Node (GA) - Gestione WAL centralizzata</li>
<li>WAL nativo con Woodpecker - Eliminata la dipendenza da Kafka/Pulsar</li>
<li>Coordinatori unificati (MixCoord); fusione di IndexNode e DataNode - Riduzione della complessità dei componenti</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">Ricerca e analisi</h4><ul>
<li>RaBitQ Quantizzazione a 1 bit con elevato recall</li>
<li>Corrispondenza delle frasi</li>
<li>MinHash LSH per la deduplicazione</li>
<li>Funzioni di classificazione consapevoli del tempo</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">Esperienza degli sviluppatori</h4><ul>
<li>Funzioni di incorporamento per un flusso di lavoro "data-in, data-out".</li>
<li>Evoluzione dello schema online</li>
<li>Supporto del vettore INT8</li>
<li>Tokenizer migliorati per il supporto di lingue globali</li>
<li>Livello di cache con caricamento pigro - Elaborazione di insiemi di dati più grandi della memoria</li>
</ul>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 18 giugno 2025</p>
<table>
<thead>
<tr><th style="text-align:center">Versione di Milvus</th><th style="text-align:center">Versione dell'SDK Python</th><th style="text-align:center">Versione dell'SDK Node.js</th><th style="text-align:center">Versione dell'SDK Java</th><th style="text-align:center">Versione dell'SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1 introduce un'architettura cloud-nativa semplificata, progettata per migliorare l'efficienza operativa, l'utilizzo delle risorse e il costo totale di proprietà riducendo la complessità di implementazione. Questa versione aggiunge nuove funzionalità incentrate su prestazioni, ricerca e sviluppo. Le caratteristiche principali includono la quantizzazione a 1 bit ad alta precisione (RaBitQ) e un livello di cache dinamico per aumentare le prestazioni, il rilevamento di quasi duplicazioni con MinHash e la corrispondenza precisa delle frasi per una ricerca avanzata, nonché funzioni di incorporamento automatizzate con modifica dello schema online per migliorare l'esperienza dello sviluppatore.</p>
<div class="alert note">
<p>Questa è una versione di pre-release di Milvus 2.6.0. Per provare le ultime funzionalità, installate questa versione come nuova distribuzione. L'aggiornamento da Milvus v2.5.x o precedente a 2.6.0-rc1 non è supportato.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">Modifiche all'architettura<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
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
    </button></h3><p>Dalla versione 2.6, Milvus introduce significative modifiche architettoniche volte a migliorare le prestazioni, la scalabilità e la facilità d'uso. Per ulteriori informazioni, consultare la <a href="/docs/it/architecture_overview.md">Panoramica dell'architettura di Milvus</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Nodo di streaming (GA)</h4><p>Nelle versioni precedenti, i dati in streaming venivano scritti nel WAL dal Proxy e letti dal QueryNode e dal DataNode. Questa architettura rendeva difficile ottenere il consenso in scrittura e richiedeva una logica complessa in lettura. Inoltre, il delegatore di query si trovava nel QueryNode, il che ostacolava la scalabilità. Milvus 2.5.0 ha introdotto lo Streaming Node, che nella versione 2.6.0 diventa GA. Questo componente è ora responsabile di tutte le operazioni di lettura/scrittura WAL a livello di shard e funge anche da delegatore di query, risolvendo i problemi sopra citati e consentendo nuove ottimizzazioni.</p>
<p><strong>Avviso importante per l'aggiornamento</strong>: Streaming Node rappresenta un cambiamento architettonico significativo, pertanto non è possibile effettuare un aggiornamento diretto a Milvus 2.6.0-rc1 da versioni precedenti.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">WAL nativo Woodpecker</h4><p>In precedenza Milvus si affidava a sistemi esterni come Kafka o Pulsar per il suo WAL. Pur essendo funzionali, questi sistemi aggiungevano una notevole complessità operativa e un sovraccarico di risorse, in particolare per le distribuzioni di piccole e medie dimensioni. In Milvus 2.6, questi sistemi sono stati sostituiti da Woodpecker, un sistema WAL cloud-native appositamente costruito. Woodpecker è progettato per l'archiviazione a oggetti e supporta sia la modalità zero-disk locale che quella basata sull'archiviazione a oggetti, semplificando le operazioni e migliorando le prestazioni e la scalabilità.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">Fusione di DataNode e IndexNode</h4><p>In Milvus 2.6, attività come la compattazione, l'importazione massiva, la raccolta di statistiche e la creazione di indici sono ora gestite da uno scheduler unificato. La funzione di persistenza dei dati, precedentemente gestita dal DataNode, è stata trasferita allo Streaming Node. Per semplificare la distribuzione e la manutenzione, l'IndexNode e il DataNode sono stati fusi in un unico componente DataNode. Questo nodo consolidato esegue ora tutti questi compiti critici, riducendo la complessità operativa e ottimizzando l'utilizzo delle risorse.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Fusione del coordinatore in MixCoord</h4><p>Il progetto precedente con i moduli RootCoord, QueryCoord e DataCoord separati introduceva complessità nella comunicazione tra i moduli. Per semplificare la progettazione del sistema, questi componenti sono stati fusi in un unico coordinatore unificato, chiamato MixCoord. Questo consolidamento riduce la complessità della programmazione distribuita, sostituendo la comunicazione basata sulla rete con chiamate di funzioni interne, con il risultato di un funzionamento più efficiente del sistema e di una semplificazione dello sviluppo e della manutenzione.</p>
<h3 id="Key-Features" class="common-anchor-header">Caratteristiche principali<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">Quantizzazione a 1 bit RaBitQ</h4><p>Per gestire insiemi di dati di grandi dimensioni, la quantizzazione a 1 bit è una tecnica efficace per migliorare l'utilizzo delle risorse e le prestazioni di ricerca. Tuttavia, i metodi tradizionali possono avere un impatto negativo sul richiamo. In collaborazione con gli autori della ricerca originale, Milvus 2.6 introduce RaBitQ, una soluzione di quantizzazione a 1 bit che mantiene un'elevata accuratezza di richiamo pur offrendo i vantaggi in termini di risorse e prestazioni della compressione a 1 bit.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">Miglioramento della capacità JSON</h4><p>Milvus 2.6 migliora il supporto per il tipo di dati JSON con i seguenti miglioramenti:</p>
<ul>
<li><strong>Prestazioni</strong>: L'indicizzazione dei percorsi JSON è ora ufficialmente supportata, consentendo la creazione di indici invertiti su percorsi specifici all'interno di oggetti JSON (ad esempio, <code translate="no">meta.user.location</code>). Questo evita la scansione completa degli oggetti e migliora la latenza delle query con filtri complessi.</li>
<li><strong>Funzionalità</strong>: Per supportare logiche di filtraggio più complesse, questa release aggiunge il supporto alle funzioni <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code> e <code translate="no">CAST</code>. In prospettiva, il nostro lavoro sul supporto JSON continua. Siamo entusiasti di anticipare che le prossime versioni ufficiali presenteranno funzionalità ancora più potenti, come la <strong>triturazione di JSON</strong> e un <strong>indice JSON FLAT</strong>, progettato per migliorare drasticamente le prestazioni dei dati JSON altamente annidati.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Miglioramento delle funzioni dell'analizzatore/tokenizzatore</h4><p>Questa versione migliora significativamente le capacità di elaborazione del testo con diversi aggiornamenti dell'Analizzatore e del Tokenizzatore:</p>
<ul>
<li>È disponibile una nuova sintassi di <a href="/docs/it/analyzer-overview.md#Example-use">Run Analyzer</a> per convalidare le configurazioni del tokenizer.</li>
<li>Il <a href="/docs/it/lindera-tokenizer.md">tokenizer Lindera</a> è integrato per migliorare il supporto delle lingue asiatiche come il giapponese e il coreano.</li>
<li>È ora supportata la selezione del tokenizer a livello di riga, con il <a href="/docs/it/icu-tokenizer.md">tokenizer</a> generale <a href="/docs/it/icu-tokenizer.md">ICU</a> disponibile come ripiego per gli scenari multilingue.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">Data-in, Data-Out con le funzioni di incorporamento</h4><p>Milvus 2.6 introduce la funzionalità "Data-in, Data-Out" che semplifica lo sviluppo di applicazioni di intelligenza artificiale integrandosi direttamente con modelli di incorporamento di terze parti (ad esempio, OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face). Gli utenti possono ora inserire e interrogare dati di testo grezzi e Milvus chiamerà automaticamente il servizio di modello specificato per convertire il testo in vettori in tempo reale. Questo elimina la necessità di una pipeline di conversione vettoriale separata.</p>
<p>Per ulteriori informazioni, consultare la <a href="/docs/it/embedding-function-overview.md">Panoramica della funzione di incorporamento</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">Corrispondenza di frase</h4><p>Phrase Match è una funzione di ricerca di testo che restituisce risultati solo quando la sequenza esatta di parole in una query appare consecutivamente e nell'ordine corretto all'interno di un documento.</p>
<p><strong>Caratteristiche principali</strong>:</p>
<ul>
<li>Sensibile all'ordine: Le parole devono apparire nello stesso ordine della query.</li>
<li>Corrispondenza consecutiva: Le parole devono apparire una accanto all'altra, a meno che non si utilizzi un valore di slop.</li>
<li>Slop (opzionale): Un parametro regolabile che consente un numero ridotto di parole intermedie, consentendo una corrispondenza fuzzy tra le frasi.</li>
</ul>
<p>Per ulteriori informazioni, fare riferimento a <a href="/docs/it/phrase-match.md">Corrispondenza di frasi</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">Indice LSH MinHash (Beta)</h4><p>Per rispondere all'esigenza di deduplicazione dei dati nell'addestramento dei modelli, Milvus 2.6 aggiunge il supporto per gli indici MINHASH_LSH. Questa funzione fornisce un metodo efficiente dal punto di vista computazionale e scalabile per stimare la somiglianza di Jaccard tra i documenti per identificare i quasi duplicati. Gli utenti possono generare firme MinHash per i loro documenti di testo durante la preelaborazione e utilizzare l'indice MINHASH_LSH in Milvus per trovare in modo efficiente contenuti simili in set di dati su larga scala, migliorando la pulizia dei dati e la qualità del modello.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">Funzioni di decadimento consapevoli del tempo</h4><p>Milvus 2.6 introduce funzioni di decadimento consapevoli del tempo per affrontare scenari in cui il valore delle informazioni cambia nel tempo. Durante il re-ranking dei risultati, gli utenti possono applicare funzioni di decadimento esponenziale, gaussiano o lineare basate su un campo timestamp per regolare il punteggio di rilevanza di un documento. In questo modo si garantisce che i contenuti più recenti abbiano la priorità, il che è fondamentale per applicazioni come i feed di notizie, l'e-commerce e la memoria di un agente AI.</p>
<p>Per ulteriori informazioni, consultare la <a href="/docs/it/decay-ranker-overview.md">panoramica di Decay Ranker</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Aggiunta di un campo per l'evoluzione dello schema online</h4><p>Per garantire una maggiore flessibilità dello schema, Milvus 2.6 supporta ora l'aggiunta online di un nuovo campo scalare allo schema di una collezione esistente. In questo modo si evita di creare una nuova collezione e di eseguire una migrazione di dati dirompente quando cambiano i requisiti dell'applicazione.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/add-fields-to-an-existing-collection.md">Aggiungi campi a una raccolta esistente</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">Supporto del vettore INT8</h4><p>In risposta al crescente utilizzo di modelli quantizzati che producono incorporazioni di interi a 8 bit, Milvus 2.6 aggiunge il supporto nativo per i vettori INT8. Ciò consente agli utenti di ingerire questi vettori direttamente senza de-quantizzazione, risparmiando costi di calcolo, di banda di rete e di archiviazione. Questa funzione è inizialmente supportata per gli indici della famiglia HNSW.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/dense-vector.md">Vettore denso</a>.</p>
