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
    </button></h1><p>Scoprite le novità di Milvus! Questa pagina riassume le nuove funzionalità, i miglioramenti, i problemi noti e le correzioni di bug di ogni versione. In questa sezione è possibile trovare le note di rilascio per ogni versione successiva alla v2.5.0. Si consiglia di visitare regolarmente questa pagina per conoscere gli aggiornamenti.</p>
<h2 id="v2511" class="common-anchor-header">v2.5.11<button data-href="#v2511" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Versione di Milvus</th><th>Versione dell'SDK Python</th><th>Versione dell'SDK Node.js</th><th>Versione SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.11</td><td>2.5.8</td><td>2.5.8</td><td>2.5.8</td></tr>
</tbody>
</table>
<p>Siamo entusiasti di annunciare il rilascio di Milvus 2.5.11! Questa versione introduce nuove potenti funzionalità, come la capacità di analisi multipla e il supporto ampliato per i tokenizer (Jieba, Lindera, ICU, Language Identifier). Sono stati inoltre apportati diversi miglioramenti, tra cui gli aggiornamenti del pool di thread per il caricamento dinamico dei segmenti e l'ottimizzazione del filtraggio delle cancellazioni durante l'importazione dei binlog. Le principali correzioni di bug riguardano potenziali problemi di caduta dei segmenti, errori di ricerca BM25 ed errori di filtraggio delle statistiche JSON.</p>
<p>Vi invitiamo ad aggiornare alla versione 2.5.11 per usufruire di questi miglioramenti e correzioni!</p>
<h3 id="Features" class="common-anchor-header">Caratteristiche</h3><ul>
<li>Aggiunta la possibilità di configurare più analizzatori (tokenizer) per il supporto di più lingue e di selezionare quello appropriato in base all'istruzione dei dati in ingresso<a href="https://github.com/milvus-io/milvus/pull/41444">(#41444</a>).</li>
<li>Migliorata la funzionalità dell'analizzatore BM25<a href="https://github.com/milvus-io/milvus/pull/41456">(#41456</a>).<ul>
<li>Introdotta un'API <code translate="no">run_analyzer</code> per l'analisi dei risultati della tokenizzazione. Per ulteriori informazioni, fare riferimento a <a href="/docs/it/analyzer-overview.md">Panoramica dell'analizzatore</a>.</li>
<li>Tokenizzatori<ul>
<li>Aggiunto il supporto per la personalizzazione dei parametri del tokenizer Jieba.</li>
<li>Aggiunto il supporto per il tokenizer Lindera. Per ulteriori informazioni, consultare <a href="/docs/it/lindera-tokenizer.md">Lindera</a>.</li>
<li>Aggiunto il supporto per il tokenizer ICU. Per ulteriori informazioni, consultare <a href="/docs/it/icu-tokenizer.md">ICU</a>.</li>
<li>Aggiunto un tokenizer Language Identifier per il rilevamento della lingua.</li>
</ul></li>
<li>Filtri<ul>
<li>È stato ampliato il supporto linguistico per il filtro stop word integrato. Per ulteriori informazioni, consultare <a href="/docs/it/stop-filter.md">Stop</a>.</li>
<li>È stato aggiunto un filtro <code translate="no">remove_punct</code> per rimuovere i segni di punteggiatura. Per ulteriori informazioni, fare riferimento a <a href="/docs/it/removepunct-filter.md">Rimuovi punteggiatura</a>.</li>
<li>Aggiunto un filtro <code translate="no">regex</code> per il filtraggio del testo basato su modelli. Per ulteriori informazioni, consultare <a href="/docs/it/regex-filter.md">Regex</a>.</li>
</ul></li>
</ul></li>
<li>Aggiunto il supporto per la modifica della capacità massima dei campi array<a href="https://github.com/milvus-io/milvus/pull/41406">(#41406</a>).</li>
<li>Aggiunto il supporto per le espressioni binarie di intervallo negli indici di percorso JSON<a href="https://github.com/milvus-io/milvus/pull/41317">(#41317</a>).</li>
<li>Aggiunto il supporto per i tipi di corrispondenza infix e suffix nelle statistiche JSON<a href="https://github.com/milvus-io/milvus/pull/41388">(#41388</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti</h3><ul>
<li>Abilitati gli aggiornamenti dinamici della dimensione del pool di thread di caricamento dei segmenti (<a href="https://github.com/milvus-io/milvus/pull/41549">#41549</a>).</li>
<li>Accelerato il filtraggio delle cancellazioni durante l'importazione di binlog (<a href="https://github.com/milvus-io/milvus/pull/41552">#41552</a>).</li>
<li>Aggiunti parametri di monitoraggio per il rapporto dei filtri di espressione<a href="https://github.com/milvus-io/milvus/pull/41403">(#41403</a>).</li>
<li>Aggiunta un'opzione di configurazione per forzare la ricostruzione degli indici all'ultima versione<a href="https://github.com/milvus-io/milvus/pull/41432">(#41432</a>).</li>
<li>Migliorato il messaggio di log degli errori per la politica degli elenchi<a href="https://github.com/milvus-io/milvus/pull/41368">(#41368</a>).</li>
<li>Adattata la gestione dei trattini nelle intestazioni dei metadati di gRPC<a href="https://github.com/milvus-io/milvus/pull/41372">(#41372</a>).</li>
<li>Aggiornata la versione di Go alla 1.24.1 per risolvere i CVE<a href="https://github.com/milvus-io/milvus/pull/41522">(#41522</a>, <a href="https://github.com/milvus-io/milvus/pull/41319">#41319</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug</h3><ul>
<li>Corretto un problema per cui i segmenti potevano non essere eliminati correttamente quando si eliminava una partizione<a href="https://github.com/milvus-io/milvus/pull/41543">(#41543</a>).</li>
<li>Corretto l'inserimento in blocco per utilizzare l'elenco dei campi di input del function runner invece dell'elenco dei campi dello schema<a href="https://github.com/milvus-io/milvus/pull/41561">(#41561</a>).</li>
<li>Corretti i fallimenti della ricerca BM25 quando <code translate="no">avgdl</code> (lunghezza media del documento) è NaN<a href="https://github.com/milvus-io/milvus/pull/41503">(#41503</a>).</li>
<li>Corrette le etichette imprecise nelle metriche di QueryNode<a href="https://github.com/milvus-io/milvus/pull/41422">(#41422</a>).</li>
<li>Corretto un problema per cui la creazione di indici JSON di statistiche poteva fallire se i dati contenevano una mappa vuota<a href="https://github.com/milvus-io/milvus/pull/41506">(#41506</a>).</li>
<li>Corretta l'API <code translate="no">AlterCollection</code> per salvare correttamente il timestamp di modifica<a href="https://github.com/milvus-io/milvus/pull/41469">(#41469</a>).</li>
<li>Corretto un errore di filtraggio intermittente nelle statistiche JSON sotto <code translate="no">ConjunctExpr</code> e migliorata la logica di calcolo degli slot dei task per accelerare la creazione delle statistiche JSON<a href="https://github.com/milvus-io/milvus/pull/41458">(#41458</a>).</li>
<li>Corretta una perdita dell'oracolo IDF nel calcolo delle statistiche BM25<a href="https://github.com/milvus-io/milvus/pull/41426">(#41426</a>).</li>
<li>Assicurato che gli argomenti precreati siano controllati per primi durante la convalida del numero di shard<a href="https://github.com/milvus-io/milvus/pull/41421">(#41421</a>).</li>
<li>Corretta una segnalazione errata di deadlock nei test unitari<a href="https://github.com/milvus-io/milvus/pull/41377">(#41377</a>).</li>
</ul>
<h2 id="v2510" class="common-anchor-header">v2.5.10<button data-href="#v2510" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 21 aprile 2025</p>
<table>
<thead>
<tr><th>Versione Milvus</th><th>Versione dell'SDK Python</th><th>Versione dell'SDK Node.js</th><th>Versione SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.10</td><td>2.5.6</td><td>2.5.8</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Milvus 2.5.10 migliora le prestazioni di ricerca e caricamento, migliora la reportistica sulle metriche e amplia il supporto SVE per il calcolo accelerato delle metriche. Questa versione include anche numerose correzioni di bug che migliorano la stabilità e la correttezza. Vi invitiamo ad aggiornare o a provare: il vostro feedback è prezioso per aiutarci a rendere Milvus ancora migliore!</p>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti</h3><ul>
<li>Ignorare la segnalazione delle metriche degli indici per indici inesistenti<a href="https://github.com/milvus-io/milvus/pull/41296">(#41296</a>)</li>
<li>Utilizza la modalità di scansione per le LIKE anche quando esiste un indice invertito (<a href="https://github.com/milvus-io/milvus/pull/41309">#41309</a>)</li>
<li>Ottimizzazione delle prestazioni per le espressioni LIKE (<a href="https://github.com/milvus-io/milvus/pull/41222">#41222</a>)</li>
<li>Ottimizzare il formato degli indici per migliorare le prestazioni di caricamento (<a href="https://github.com/milvus-io/milvus/pull/41041">#41041</a>)</li>
<li>RESTful: rendere configurabile il timeout predefinito (<a href="https://github.com/milvus-io/milvus/pull/41225">#41225</a>)</li>
<li>Abilitazione del supporto SVE per il calcolo della metrica L2 nelle funzioni FP16 / NY<a href="https://github.com/zilliztech/knowhere/pull/1134">(knowhere #1134</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug</h3><ul>
<li>Correggere l'indice JSON che non funziona per i filtri stringa<a href="https://github.com/milvus-io/milvus/pull/41383">(#41383</a>)</li>
<li>Salta il controllo delle dimensioni per i campi non vettoriali nel pre-check<a href="https://github.com/milvus-io/milvus/pull/41329">(#41329</a>)</li>
<li>Alter collection ora aggiorna correttamente lo schema (<a href="https://github.com/milvus-io/milvus/pull/41308">#41308</a>)</li>
<li>Aggiornare la versione di knowhere per correggere la build di macOS<a href="https://github.com/milvus-io/milvus/pull/41315">(#41315</a>)</li>
<li>Prevenire il panico quando si elencano gli indici prima che l'inizializzazione dell'indice di segmento sia completata<a href="https://github.com/milvus-io/milvus/pull/41299">(#41299</a>)</li>
<li>Risolvere la regressione delle prestazioni cambiando un livello di log (<a href="https://github.com/milvus-io/milvus/pull/41269">#41269</a>)</li>
<li>Chiudere il client prima di rimuovere il client worker (<a href="https://github.com/milvus-io/milvus/pull/41254">#41254</a>)</li>
</ul>
<h2 id="v259" class="common-anchor-header">v2.5.9<button data-href="#v259" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 11 aprile 2025</p>
<table>
<thead>
<tr><th>Versione Milvus</th><th>Versione dell'SDK Python</th><th>Versione SDK Node.js</th><th>Versione SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.9</td><td>2.5.6</td><td>2.5.7</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Siamo lieti di annunciare Milvus 2.5.9, che offre prestazioni migliori per le statistiche delle chiavi JSON, capacità di indicizzazione migliorate e numerose correzioni di bug critici che rafforzano la stabilità e la gestione dei dati. Vi invitiamo ad aggiornare o a provare questa versione e, come sempre, il vostro feedback è molto apprezzato per continuare a perfezionare Milvus.</p>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti</h3><ul>
<li>Supporto del salto della normalizzazione dei punteggi per il re-ranker ponderato<a href="https://github.com/milvus-io/milvus/pull/40905">(#40905</a>)</li>
<li>Miglioramento delle prestazioni della creazione di statistiche chiave JSON aggiungendo documenti in batch<a href="https://github.com/milvus-io/milvus/pull/40898">(#40898</a>)</li>
<li>Usare <code translate="no">int32</code> quando si creano indici di array per i tipi di elementi <code translate="no">int8</code>/<code translate="no">int16</code> <a href="https://github.com/milvus-io/milvus/pull/41186">(#41186</a>)</li>
<li>Allineare i risultati della ricerca bruta con il comportamento dell'indice JSON per l'espressione <code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/41056">(#41056</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug</h3><ul>
<li>Corretto un problema che causava la confusione del traceID se il client inviava un traceID<a href="https://github.com/milvus-io/milvus/pull/41149">(#41149</a>)</li>
<li>Corretto un potenziale crash dovuto all'uso non corretto di <code translate="no">noexcept</code>, che portava a errori di IO (<a href="https://github.com/milvus-io/milvus/pull/41221">#41221</a>)</li>
<li>Risolto un ciclo di bilanciamento normale infinito innescato dopo la sospensione del bilanciamento<a href="https://github.com/milvus-io/milvus/pull/41196">(#41196</a>)</li>
<li>Mostra collezioni ora supporta gli oggetti concessi a gruppi di privilegi personalizzati<a href="https://github.com/milvus-io/milvus/pull/41204">(#41204</a>)</li>
<li>Risolto un errore nel recupero delle posizioni dei canali di replica (<a href="https://github.com/milvus-io/milvus/pull/41189">#41189</a>)</li>
<li>Corretta una potenziale perdita di thread causata dai timeout di RESTful<a href="https://github.com/milvus-io/milvus/pull/41184">(#41184</a>)</li>
<li>Aggiunta una bitmap di cancellazione per la modalità di salto batch (<a href="https://github.com/milvus-io/milvus/pull/41165">#41165</a>)</li>
<li>Corretto un problema per cui la rimozione di un tipo di indice non riusciva nell'archiviazione remota in modalità locale (<a href="https://github.com/milvus-io/milvus/pull/41163">#41163</a>)</li>
<li>Usato <code translate="no">element_type</code> per gli operatori dell'array <code translate="no">isNull</code> <a href="https://github.com/milvus-io/milvus/pull/41158">(#41158</a>)</li>
<li>Rimosso il reset delle metriche per garantire una reportistica accurata<a href="https://github.com/milvus-io/milvus/pull/41081">(#41081</a>)</li>
<li>Corretto un bug che impediva ai dati di <code translate="no">null</code> di essere filtrati dalle espressioni di <code translate="no">null</code> <a href="https://github.com/milvus-io/milvus/pull/41135">(#41135</a>)</li>
<li>Ignorati i segmenti in crescita senza posizione iniziale per i criteri di tenuta (<a href="https://github.com/milvus-io/milvus/pull/41131">#41131</a>)</li>
<li>Evitato l'aggiornamento delle richieste di ricerca/query originali durante i tentativi<a href="https://github.com/milvus-io/milvus/pull/41127">(#41127</a>)</li>
<li>Corretto un errore di segmentazione se <code translate="no">LoadArrowReaderFromRemote</code> viene eseguito in un percorso di eccezione<a href="https://github.com/milvus-io/milvus/pull/41071">(#41071</a>)</li>
<li>Risolti i problemi relativi al bilanciamento manuale e al controllo del bilanciamento<a href="https://github.com/milvus-io/milvus/pull/41038">(#41038</a>)</li>
<li>Lo schema validato non è <code translate="no">nil</code> per le statistiche JSON con lazy <code translate="no">DescribeCollection</code> <a href="https://github.com/milvus-io/milvus/pull/41068">(#41068</a>)</li>
<li>Risolto un bug relativo al movimento del cursore durante il confronto di due colonne<a href="https://github.com/milvus-io/milvus/pull/41054">(#41054</a>)</li>
<li>Risolto un arresto anomalo quando si inserivano sia <code translate="no">null</code> che array non nulli con mmap aperta in crescita<a href="https://github.com/milvus-io/milvus/pull/41052">(#41052</a>)</li>
<li>Risolto un problema di compilazione di arm64<a href="https://github.com/milvus-io/milvus/pull/41058">(#41058</a>)</li>
<li>Aggiunta una modalità di bypass del pool di thread per evitare di bloccare le operazioni di inserimento/caricamento tramite indici crescenti<a href="https://github.com/milvus-io/milvus/pull/41013">(#41013</a>)</li>
<li>Corretti gli errori di formato JSON<a href="https://github.com/milvus-io/milvus/pull/41031">(#41031</a>)</li>
<li>Corretto un errore 404 nella WebUI quando <code translate="no">http.enablepprof</code> è falso<a href="https://github.com/milvus-io/milvus/pull/41007">(#41007</a>)</li>
</ul>
<h2 id="v258" class="common-anchor-header">v2.5.8<button data-href="#v258" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 1 aprile 2025</p>
<table>
<thead>
<tr><th>Versione Milvus</th><th>Versione dell'SDK Python</th><th>Versione dell'SDK Node.js</th><th>Versione SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.8</td><td>2.5.6</td><td>2.5.7</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>Siamo lieti di annunciare il rilascio di Milvus 2.5.8, che presenta miglioramenti alle espressioni JSON, alla convalida UTF-8, all'utilizzo della memoria e alla logica di bilanciamento. Questa versione include anche numerose correzioni di bug importanti per migliorare la concomitanza e la gestione dei dati. Vi invitiamo a fare l'aggiornamento o a provarlo e, come sempre, il vostro feedback ci aiuta a migliorare continuamente Milvus!</p>
<h3 id="Features" class="common-anchor-header">Caratteristiche</h3><ul>
<li>Supporto delle espressioni JSON <code translate="no">null</code>/<code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/41002">(#41002</a>)</li>
<li>Supporto del parsing di vettori sparsi da strutture Parquet negli inserimenti massivi<a href="https://github.com/milvus-io/milvus/pull/40874">(#40874</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti</h3><ul>
<li>Bilanciamento della collezione con il maggior numero di righe per prima<a href="https://github.com/milvus-io/milvus/pull/40958">(#40958</a>)</li>
<li>Supporto della convalida delle stringhe UTF-8 durante l'importazione<a href="https://github.com/milvus-io/milvus/pull/40746">(#40746</a>)</li>
<li>Aggiunta della convalida UTF-8 per tutti i campi VARCHAR<a href="https://github.com/milvus-io/milvus/pull/40993">(#40993</a>)</li>
<li>Evitare una nuova interrogazione se la ricerca ibrida richiede solo il PK come campo di output (<a href="https://github.com/milvus-io/milvus/pull/40906">#40906</a>)</li>
<li>Affinare le visualizzazioni degli array per ottimizzare l'uso della memoria (<a href="https://github.com/milvus-io/milvus/pull/40206">#40206</a>)</li>
<li>Aggiungere una configurazione dell'intervallo di trigger per il bilanciamento automatico<a href="https://github.com/milvus-io/milvus/pull/39918">(#39918</a>)</li>
<li>Conversione di espressioni OR multiple in espressioni IN<a href="https://github.com/milvus-io/milvus/pull/40751">(#40751</a>)</li>
<li>Supporto di criteri di compattazione manuali dettagliati<a href="https://github.com/milvus-io/milvus/pull/40924">(#40924</a>)</li>
<li>Conservare i token grezzi per la registrazione delle verifiche (<a href="https://github.com/milvus-io/milvus/pull/40867">#40867</a>)</li>
<li>Ottimizzare l'uso dei meta-mutex di DataCoord (<a href="https://github.com/milvus-io/milvus/pull/40753">#40753</a>)</li>
<li>Introdurre le sottoscrizioni batch in <code translate="no">MsgDispatcher</code> (<a href="https://github.com/milvus-io/milvus/pull/40596">#40596</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug</h3><ul>
<li>Corretto un crash che coinvolgeva l'input nullable e i tipi di dati mmap in crescita<a href="https://github.com/milvus-io/milvus/pull/40980">(#40980</a>)</li>
<li>Corretta la potenziale perdita di dati nelle operazioni di cancellazione causata da ID binlog duplicati<a href="https://github.com/milvus-io/milvus/pull/40985">(#40985</a>),<a href="https://github.com/milvus-io/milvus/pull/40976">(#40976</a>)</li>
<li>Aggiunti i blocchi degli indici di campo per <code translate="no">GetSegmentsIndexStates</code> per evitare un potenziale panico durante l'inserimento durante la creazione della raccolta<a href="https://github.com/milvus-io/milvus/pull/40969">(#40969</a>)</li>
<li>Corretti i problemi di concorrenza nella registrazione dei consumatori Rocksmq<a href="https://github.com/milvus-io/milvus/pull/40885">(#40885</a>)</li>
<li>Recuperare tutti i log delta figlio per il caricamento dei segmenti<a href="https://github.com/milvus-io/milvus/pull/40957">(#40957</a>)</li>
<li>Corretti i risultati errati causati dall'uso dell'indice JSON quando è specificato <code translate="no">iterative_filter</code> <a href="https://github.com/milvus-io/milvus/pull/40946">(#40946</a>)</li>
<li>Assicurata una priorità più alta per l'operazione <code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/40865">(#40865</a>)</li>
<li>Corretto <code translate="no">WithGroupSize</code> durante la riduzione<a href="https://github.com/milvus-io/milvus/pull/40920">(#40920</a>)</li>
<li>Aumentato il numero di slot in proporzione all'aumentare della dimensione del segmento (<a href="https://github.com/milvus-io/milvus/pull/40862">#40862</a>)</li>
<li>Impostazione del tempo di coda dei task prima dell'enqueue<a href="https://github.com/milvus-io/milvus/pull/40853">(#40853</a>)</li>
<li>Corretto lo sbilanciamento dei canali sui DataNode<a href="https://github.com/milvus-io/milvus/pull/40854">(#40854</a>)</li>
<li>Impostate le configurazioni predefinite corrette per gli slot dei task (<a href="https://github.com/milvus-io/milvus/pull/40821">#40821</a>)</li>
<li>Go SDK: Impostazione dei flag nullable in base a FieldSchema per l'inserimento basato sulle righe (<a href="https://github.com/milvus-io/milvus/pull/40962">#40962</a>)</li>
</ul>
<h2 id="v257" class="common-anchor-header">v2.5.7<button data-href="#v257" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 21 marzo 2025</p>
<table>
<thead>
<tr><th>Versione Milvus</th><th>Versione dell'SDK Python</th><th>Versione SDK Node.js</th><th>Versione SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.7</td><td>2.5.6</td><td>2.5.6</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>Siamo lieti di annunciare il rilascio di Milvus 2.5.7, caratterizzato dalla nuova funzione JSON Path Index. Questa funzione consente di creare indici invertiti su colonne dinamiche o JSON per migliorare significativamente le prestazioni delle query. Oltre a questa nuova funzionalità, sono stati apportati numerosi miglioramenti e correzioni di bug per migliorare l'affidabilità, la gestione degli errori e l'usabilità. Vi invitiamo a fare l'aggiornamento o a provarlo e, come sempre, il vostro feedback è molto apprezzato per continuare a migliorare Milvus!</p>
<h3 id="Features" class="common-anchor-header">Caratteristiche</h3><ul>
<li><strong>Indice dei percorsi JSON</strong>: Per rispondere alle esigenze degli utenti di schemi dinamici, Milvus 2.5.7 introduce la possibilità di costruire indici su colonne dinamiche e colonne JSON. Con questa funzione, è possibile creare indici invertiti per specifiche colonne dinamiche o percorsi JSON, aggirando di fatto il lento processo di caricamento JSON e migliorando notevolmente le prestazioni delle query. Per ulteriori informazioni, consultare <a href="/docs/it/use-json-fields.md">Campo JSON</a>.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti</h3><ul>
<li>Riordino delle sottoespressioni per le espressioni congiunte<a href="https://github.com/milvus-io/milvus/pull/40186">(#40186</a>)</li>
<li>Aggiunta di altre opzioni di configurazione per <code translate="no">interimindex</code> per supportare modalità raffinate<a href="https://github.com/milvus-io/milvus/pull/40429">(#40429</a>)</li>
<li>Utilizzare le metriche corrette dei contatori per il calcolo della WA complessiva<a href="https://github.com/milvus-io/milvus/pull/40679">(#40679</a>)</li>
<li>Rendere aggiornabile la configurazione del segmento prune (<a href="https://github.com/milvus-io/milvus/pull/40632">#40632</a>)</li>
<li>Aggiungere una politica di tenuta del canale basata sul blocco di L0<a href="https://github.com/milvus-io/milvus/pull/40535">(#40535</a>)</li>
<li>Raffinare i metadati dei task con il blocco a livello di chiave (<a href="https://github.com/milvus-io/milvus/pull/40353">#40353</a>)</li>
<li>Rimuovere le etichette di raccolta e partizione non necessarie dalle metriche<a href="https://github.com/milvus-io/milvus/pull/40593">(#40593</a>)</li>
<li>Migliorare i messaggi di errore di importazione (<a href="https://github.com/milvus-io/milvus/pull/40597">#40597</a>)</li>
<li>Evitare di convertire le fette di byte del corpo in stringhe in <code translate="no">httpserver</code> <a href="https://github.com/milvus-io/milvus/pull/40414">(#40414</a>)</li>
<li>Registrare la posizione iniziale dei messaggi di cancellazione<a href="https://github.com/milvus-io/milvus/pull/40678">(#40678</a>)</li>
<li>Supportare il recupero dei binlog dei segmenti con la nuova interfaccia <code translate="no">GetSegmentsInfo</code> <a href="https://github.com/milvus-io/milvus/pull/40466">(#40466</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug</h3><ul>
<li>Utilizzare <code translate="no">newInsertDataWithFunctionOutputField</code> quando si importano file binlog<a href="https://github.com/milvus-io/milvus/pull/40742">(#40742</a>)</li>
<li>Corretto un problema per cui le proprietà mmap non venivano applicate quando si creava una raccolta<a href="https://github.com/milvus-io/milvus/pull/40515">(#40515</a>)</li>
<li>Non cancellare il file dei centroidi quando il campionamento fallisce; attendere invece il GC<a href="https://github.com/milvus-io/milvus/pull/40702">(#40702</a>)</li>
<li>Corretti i problemi di perdita di messaggi durante la ricerca (<a href="https://github.com/milvus-io/milvus/pull/40736">#40736</a>)</li>
<li>Rimossi gli obiettivi di ritardo dopo il dispatcher principale<a href="https://github.com/milvus-io/milvus/pull/40717">(#40717</a>)</li>
<li>Aggiunto l'input clear bitmap per ogni ciclo batch (<a href="https://github.com/milvus-io/milvus/pull/40722">#40722</a>)</li>
<li>Protetto <code translate="no">GetSegmentIndexes</code> con un RLock (<a href="https://github.com/milvus-io/milvus/pull/40720">#40720</a>)</li>
<li>Evitati errori di segmentazione causati dal recupero di set di dati vettoriali vuoti<a href="https://github.com/milvus-io/milvus/pull/40546">(#40546</a>)</li>
<li>Corretto il filtro "not-equal" degli indici JSON<a href="https://github.com/milvus-io/milvus/pull/40648">(#40648</a>)</li>
<li>Corretto il caricamento di offset nulli nell'indice invertito<a href="https://github.com/milvus-io/milvus/pull/40524">(#40524</a>)</li>
<li>Corretta la logica di garbage cleanup di <code translate="no">jsonKey</code> stats e migliorato il filtro JSON key stats (<a href="https://github.com/milvus-io/milvus/pull/40039">#40039</a>)</li>
<li>Individuati gli errori di puntatori JSON non validi<a href="https://github.com/milvus-io/milvus/pull/40626">(#40626</a>)</li>
<li>Il privilegio RBAC a stella ora restituisce il vuoto quando si elencano le politiche<a href="https://github.com/milvus-io/milvus/pull/40557">(#40557</a>)</li>
<li>Evitato il panico quando un campo non esiste nello schema in QueryNode<a href="https://github.com/milvus-io/milvus/pull/40542">(#40542</a>)</li>
<li>Corretto un problema di raccolta di riferimenti per la ricerca/query<a href="https://github.com/milvus-io/milvus/pull/40550">(#40550</a>)</li>
<li>Gestite le righe vuote per i vettori sparsi<a href="https://github.com/milvus-io/milvus/pull/40586">(#40586</a>)</li>
<li>Aggiunto un controllo dei parametri tipo/indice duplicati durante la creazione di collezioni<a href="https://github.com/milvus-io/milvus/pull/40465">(#40465</a>)</li>
<li>Spostato <code translate="no">metaHeader</code> sul client per evitare le corse ai dati (<a href="https://github.com/milvus-io/milvus/pull/40444">#40444</a>).</li>
</ul>
<h2 id="v256" class="common-anchor-header">v2.5.6<button data-href="#v256" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 10 marzo 2025</p>
<table>
<thead>
<tr><th>Versione di Milvus</th><th>Versione dell'SDK Python</th><th>Versione dell'SDK Node.js</th><th>Versione SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.6</td><td>2.5.5</td><td>2.5.5</td><td>2.5.5</td></tr>
</tbody>
</table>
<p>Siamo lieti di annunciare il rilascio di Milvus 2.5.6, che presenta importanti miglioramenti a toolchain, logging, metriche e gestione degli array, oltre a numerose correzioni di bug per migliorare affidabilità e prestazioni. L'aggiornamento include una gestione più raffinata della concorrenza, attività di compattazione più robuste e altri miglioramenti fondamentali. Vi invitiamo ad aggiornarlo o a provarlo e, come sempre, accogliamo con piacere i vostri commenti per aiutarci a migliorare continuamente Milvus!</p>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti</h3><ul>
<li>Aggiornamento della toolchain di Go a 1.22.7<a href="https://github.com/milvus-io/milvus/pull/40399">(#40399</a>)</li>
<li>Aggiornamento della versione di Rust alla 1.83<a href="https://github.com/milvus-io/milvus/pull/40317">(#40317</a>)</li>
<li>Aggiornare la versione di Etcd a 3.5.18<a href="https://github.com/milvus-io/milvus/pull/40230">(#40230</a>)</li>
<li>Controllare il tipo di elemento solo per gli array non nulli<a href="https://github.com/milvus-io/milvus/pull/40447">(#40447</a>)</li>
<li>Rimuovere i log di debug nel gestore del gruppo di risorse (v2)<a href="https://github.com/milvus-io/milvus/pull/40393">(#40393</a>)</li>
<li>Migliorare i log per il risolutore gRPC<a href="https://github.com/milvus-io/milvus/pull/40338">(#40338</a>)</li>
<li>Aggiungere altre metriche per i componenti CGO asincroni (<a href="https://github.com/milvus-io/milvus/pull/40232">#40232</a>)</li>
<li>Pulire la cache della posizione degli shard dopo il rilascio di una collezione (<a href="https://github.com/milvus-io/milvus/pull/40228">#40228</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug</h3><ul>
<li>Corretto il danneggiamento degli array causato dall'ignorare la validità<a href="https://github.com/milvus-io/milvus/pull/40433">(#40433</a>)</li>
<li>Corretto un problema per cui le espressioni <code translate="no">null</code> non funzionavano per i campi JSON<a href="https://github.com/milvus-io/milvus/pull/40457">(#40457</a>)</li>
<li>Corretto un problema che memorizzava l'offset sbagliato quando si costruiva Tantivy con un campo nullable<a href="https://github.com/milvus-io/milvus/pull/40453">(#40453</a>)</li>
<li>Saltata l'esecuzione di statistiche per segmenti nulli<a href="https://github.com/milvus-io/milvus/pull/40449">(#40449</a>)</li>
<li>Corretta la stima della dimensione della memoria per gli array<a href="https://github.com/milvus-io/milvus/pull/40377">(#40377</a>)</li>
<li>Passato un puntatore a zaino per evitare compattazioni multiple<a href="https://github.com/milvus-io/milvus/pull/40401">(#40401</a>)</li>
<li>Corretto un problema di crash con l'inserimento massivo (<a href="https://github.com/milvus-io/milvus/pull/40304">#40304</a>)</li>
<li>Impedito il leak del flusso di messaggi terminando correttamente il dispatcher principale (<a href="https://github.com/milvus-io/milvus/pull/40351">#40351</a>)</li>
<li>Corretti i problemi di concorrenza per gli offset di <code translate="no">null</code> <a href="https://github.com/milvus-io/milvus/pull/40363">(#40363</a>),<a href="https://github.com/milvus-io/milvus/pull/40365">(#40365</a>)</li>
<li>Corretto il parsing di <code translate="no">import end ts</code> (<a href="https://github.com/milvus-io/milvus/pull/40333">#40333</a>)</li>
<li>Migliorata la gestione degli errori e i test unitari per la funzione <code translate="no">InitMetaCache</code> <a href="https://github.com/milvus-io/milvus/pull/40324">(#40324</a>)</li>
<li>Aggiunto un controllo dei parametri duplicati per <code translate="no">CreateIndex</code> <a href="https://github.com/milvus-io/milvus/pull/40330">(#40330</a>)</li>
<li>Risolto un problema che impediva le attività di compattazione quando la dimensione superava il limite massimo<a href="https://github.com/milvus-io/milvus/pull/40350">(#40350</a>)</li>
<li>Corretto il consumo duplicato dallo stream per i segmenti invisibili<a href="https://github.com/milvus-io/milvus/pull/40318">(#40318</a>)</li>
<li>Modificata la variabile CMake per passare a <code translate="no">knowhere-cuvs</code> <a href="https://github.com/milvus-io/milvus/pull/40289">(#40289</a>)</li>
<li>Corretto un problema per cui il drop delle proprietà del DB via RESTful non riusciva<a href="https://github.com/milvus-io/milvus/pull/40260">(#40260</a>)</li>
<li>Utilizzato un tipo di messaggio diverso per l'API <code translate="no">OperatePrivilegeV2</code> <a href="https://github.com/milvus-io/milvus/pull/40193">(#40193</a>)</li>
<li>Corretta una corsa ai dati nella cache delta delle attività (<a href="https://github.com/milvus-io/milvus/pull/40262">#40262</a>)</li>
<li>Risolta una perdita nella cache delta dei task causata da ID duplicati (<a href="https://github.com/milvus-io/milvus/pull/40184">#40184</a>)</li>
</ul>
<h2 id="v255" class="common-anchor-header">v2.5.5<button data-href="#v255" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 26 febbraio 2025</p>
<table>
<thead>
<tr><th>Versione Milvus</th><th>Versione dell'SDK Python</th><th>Versione dell'SDK Node.js</th><th>Versione SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.5</td><td>2.5.4</td><td>2.5.5</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.5 apporta miglioramenti significativi al numero di collezioni e partizioni che un singolo cluster può supportare. È ora possibile eseguire Milvus con 10K collezioni e 100K partizioni. Questa versione risolve anche diversi bug critici, tra cui la mancanza di statistiche sulle partite e un problema di deadlock nelle query a più stadi. Inoltre, include numerosi miglioramenti in termini di osservabilità e sicurezza. Si consiglia vivamente a tutti gli utenti che utilizzano Milvus 2.5.x di effettuare l'aggiornamento il prima possibile.</p>
<h3 id="Dependency-Upgrade" class="common-anchor-header">Aggiornamento delle dipendenze</h3><p>Aggiornamento a ETCD 3.5.18 per correggere diverse CVE.</p>
<ul>
<li>[2.5] Aggiornato raft a cuvs<a href="https://github.com/milvus-io/milvus/pull/39221">(#39221</a>)</li>
<li>[2.5] Aggiornata la versione di Knowhere<a href="https://github.com/milvus-io/milvus/pull/39673">(#39673</a>, <a href="https://github.com/milvus-io/milvus/pull/39574">#39574</a>)</li>
</ul>
<h3 id="Critical-Bugs" class="common-anchor-header">Bug critici</h3><ul>
<li>[2.5] Utilizzato il prefisso <code translate="no">text_log</code> per il file textmatchindex null offset (<a href="https://github.com/milvus-io/milvus/pull/39936">#39936</a>)</li>
<li>[2.5] Aggiunto un pool di sottoattività per i task multi-stadio per evitare deadlock<a href="https://github.com/milvus-io/milvus/pull/40081">(#40081</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Correzioni di bug</h3><ul>
<li>[2.5] Corretto il deadlock dello scheduler dei task (<a href="https://github.com/milvus-io/milvus/pull/40121">#40121</a>)</li>
<li>[2.5] Corretta una condizione di gara che causava la creazione di più indici identici<a href="https://github.com/milvus-io/milvus/pull/40180">(#40180</a>)</li>
<li>[2.5] Corretto il problema per cui potevano essere create collezioni con nomi duplicati<a href="https://github.com/milvus-io/milvus/pull/40147">(#40147</a>)</li>
<li>Corretto il fallimento della ricerca di espressioni nulle<a href="https://github.com/milvus-io/milvus/pull/40128">(#40128</a>)</li>
<li>[2.5] Corretto il problema per cui la corrispondenza dei prefissi falliva quando nel prefisso erano presenti dei caratteri jolly<a href="https://github.com/milvus-io/milvus/pull/40021">(#40021</a>)</li>
<li>Annullata la cascata di sottocontesti quando la richiesta HTTP è scaduta (<a href="https://github.com/milvus-io/milvus/pull/40060">#40060</a>)</li>
<li>[2.5] Corretta la perdita di cache delta del task su reduce (<a href="https://github.com/milvus-io/milvus/pull/40056">#40056</a>)</li>
<li>[2.5] Corretto il panico da querycoord in un caso limite (<a href="https://github.com/milvus-io/milvus/pull/40058">#40058</a>)</li>
<li>[2.5] Migliorata la funzione isbalanced per contare correttamente le coppie di citazioni (<a href="https://github.com/milvus-io/milvus/pull/40002">#40002</a>)</li>
<li>[2.5] Corretto il -1 negativo nell'esecuzione dei task di compattazione<a href="https://github.com/milvus-io/milvus/pull/39955">(#39955</a>)</li>
<li>[2.5] Corretto il bug per cui un segmento potrebbe non essere mai trasferito dalla sigillatura al lavaggio<a href="https://github.com/milvus-io/milvus/pull/39996">(#39996</a>)</li>
<li>Saltata la creazione dell'indice di chiave primaria quando si carica l'indice pk<a href="https://github.com/milvus-io/milvus/pull/39922">(#39922</a>)</li>
<li>[2.5] Saltata la creazione dell'indice di testo quando il segmento era zero dopo l'ordinamento<a href="https://github.com/milvus-io/milvus/pull/39969">(#39969</a>)</li>
<li>[2.5] Corretto il fallimento della ricerca della prima posizione<a href="https://github.com/milvus-io/milvus/pull/39966">(#39966</a>)</li>
<li>Ignorata l'opzione di crescita persa in hybridsearch<a href="https://github.com/milvus-io/milvus/pull/39900">(#39900</a>)</li>
<li>[2.5] Corretta l'impossibilità di modificare il livello di consistenza di altercollection (<a href="https://github.com/milvus-io/milvus/pull/39902">#39902</a>)</li>
<li>Corretto il fallimento dell'importazione a causa del conteggio di 0 righe<a href="https://github.com/milvus-io/milvus/pull/39904">(#39904</a>)</li>
<li>[2.5] Corretto il risultato errato del modulo per il tipo lungo<a href="https://github.com/milvus-io/milvus/pull/39802">(#39802</a>)</li>
<li>[2.5] Aggiunto e utilizzato il contesto lifetime per il trigger di compattazione<a href="https://github.com/milvus-io/milvus/pull/39880">(#39880</a>)</li>
<li>[2.5] Controllato il rilascio della collezione prima dei controlli del target<a href="https://github.com/milvus-io/milvus/pull/39843">(#39843</a>)</li>
<li>Corretto il fallimento di Rootcoord graceful stop e la risorsa limitata di CI<a href="https://github.com/milvus-io/milvus/pull/39793">(#39793</a>)</li>
<li>[2.5] Rimosso il controllo delle dimensioni dei campi di carico e delle colonne dello schema (<a href="https://github.com/milvus-io/milvus/pull/39834">#39834</a>, <a href="https://github.com/milvus-io/milvus/pull/39835">#39835</a>)</li>
<li>[2.5] Rimosso il parametro mmap.enable nel parametro type durante la creazione dell'indice<a href="https://github.com/milvus-io/milvus/pull/39806">(#39806</a>)</li>
<li>[2.5] Non passa il nome dell'indice quando si eliminano le proprietà<a href="https://github.com/milvus-io/milvus/pull/39679">(#39679</a>)</li>
<li>[2.5] I segmenti restituiscono risultati sia in crescita che sigillati<a href="https://github.com/milvus-io/milvus/pull/39789">(#39789</a>)</li>
<li>[2.5] Corretto il problema della mappa concorrente (<a href="https://github.com/milvus-io/milvus/pull/39776">#39776</a>)</li>
<li>[2.5] Risolto conflitto su test attività QC<a href="https://github.com/milvus-io/milvus/pull/39797">(#39797</a>)</li>
<li>[2.5] Corretto il carico della raccolta bloccato se si è verificata la compattazione o il GC<a href="https://github.com/milvus-io/milvus/pull/39761">(#39761</a>)</li>
<li>[2.5] Corretta la distribuzione non uniforme causata dalla perdita di cache delta dei task in esecuzione (<a href="https://github.com/milvus-io/milvus/pull/39759">#39759</a>)</li>
<li>[2.5] Ritorno anticipato quando si salta l'indice pk del carico (<a href="https://github.com/milvus-io/milvus/pull/39763">#39763</a>)</li>
<li>[2.5] Corretta la possibilità per l'utente root di elencare tutte le collezioni anche quando è stato impostato <code translate="no">common.security.rootShouldBindRole</code> <a href="https://github.com/milvus-io/milvus/pull/39714">(#39714</a>)</li>
<li>[2.5] Corretta la falla nel flowgraph (<a href="https://github.com/milvus-io/milvus/pull/39686">#39686</a>)</li>
<li>[2.5] Usato il formattatore di elementi param per evitare la sovrapposizione di setconfig<a href="https://github.com/milvus-io/milvus/pull/39636">(#39636</a>)</li>
<li>[2.5] Controllato il nome del privilegio del metastore con il nome del privilegio "tutti"<a href="https://github.com/milvus-io/milvus/pull/39492">(#39492</a>)</li>
<li>[2.5] Aggiunto limitatore di velocità per RESTful v1<a href="https://github.com/milvus-io/milvus/pull/39555">(#39555</a>)</li>
<li>[2.5] Rimosso il numero di partizione hardcoded nel gestore RESTful<a href="https://github.com/milvus-io/milvus/pull/40113">(#40113</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti</h3><h4 id="Observability" class="common-anchor-header">Osservabilità</h4><ul>
<li>Aggiunta la metrica monitor per recuperare i dati grezzi<a href="https://github.com/milvus-io/milvus/pull/40155">(#40155</a>)</li>
<li>[2.5] Aggiunta la metrica della latenza del vettore get e perfezionato il messaggio di errore del limite di richiesta<a href="https://github.com/milvus-io/milvus/pull/40085">(#40085</a>)</li>
<li>[2.5] Aggiunte metriche per la coda proxy (<a href="https://github.com/milvus-io/milvus/pull/40071">#40071</a>)</li>
<li>Esposti altri dati di metrica<a href="https://github.com/milvus-io/milvus/pull/39466">(#39466</a>)</li>
<li>[2.5] Aggiunte le metriche per le espressioni di parsing (<a href="https://github.com/milvus-io/milvus/pull/39716">#39716</a>)</li>
<li>[2.5] Aggiunto campo di log DSL per hybridsearch<a href="https://github.com/milvus-io/milvus/pull/39598">(#39598</a>)</li>
<li>[2.5] Saltato l'aggiornamento delle metriche degli indici se l'indice è stato abbandonato<a href="https://github.com/milvus-io/milvus/pull/39572">(#39572</a>)</li>
<li>[2.5] Scaricate le informazioni di pprof se l'avanzamento dell'arresto del componente è scaduto (<a href="https://github.com/milvus-io/milvus/pull/39760">#39760</a>)</li>
<li>[2.5] Aggiunta API di gestione per controllare lo stato di bilanciamento delle querycoord (<a href="https://github.com/milvus-io/milvus/pull/39909">#39909</a>)</li>
</ul>
<h4 id="StatsCompactionIndex-Task-Scheduler-Optimization" class="common-anchor-header">Statistiche/Compattazione/Ottimizzazione dello schedulatore dei task di indice</h4><ul>
<li>Affinata la politica di pianificazione delle attività di indice (<a href="https://github.com/milvus-io/milvus/pull/40104">#40104</a>)</li>
<li>[2.5] Limitata la velocità di generazione dei task di statistiche<a href="https://github.com/milvus-io/milvus/pull/39645">(#39645</a>)</li>
<li>Aggiunte le configurazioni per la pianificazione della compattazione<a href="https://github.com/milvus-io/milvus/pull/39511">(#39511</a>)</li>
<li>[2.5] Controllata la compattazione L0 solo con lo stesso canale quando si dichiara<a href="https://github.com/milvus-io/milvus/pull/39543">(#39543</a>)</li>
<li>[2.5] Aggiustata la stima della memoria del caricatore di segmenti per gli indici intermedi<a href="https://github.com/milvus-io/milvus/pull/39509">(#39509</a>)</li>
<li>[2.5] Usato il pos ts di inizio per il segmento seal in base alla politica di durata<a href="https://github.com/milvus-io/milvus/pull/39994">(#39994</a>)</li>
<li>Rimosso il meta del task quando il task non era più necessario<a href="https://github.com/milvus-io/milvus/pull/40146">(#40146</a>)</li>
<li>[2.5] Accelerato l'elenco degli oggetti durante l'importazione di binlog<a href="https://github.com/milvus-io/milvus/pull/40048">(#40048</a>)</li>
<li>Supportata la creazione di raccolte con descrizione<a href="https://github.com/milvus-io/milvus/pull/40028">(#40028</a>)</li>
<li>[2.5] Esportato l'intervallo di timeout della richiesta di indice nella configurazione<a href="https://github.com/milvus-io/milvus/pull/40118">(#40118</a>)</li>
<li>[2.5] Sincronizzato il valore predefinito di proxy.maxTaskNum a 1024<a href="https://github.com/milvus-io/milvus/pull/40073">(#40073</a>)</li>
<li>Ridotto il limite delle istantanee di dump da 10w a 1w<a href="https://github.com/milvus-io/milvus/pull/40102">(#40102</a>)</li>
<li>[2.5] Evitata la copia dei byte da stringa a slice per i batch pk esistenti (<a href="https://github.com/milvus-io/milvus/pull/40097">#40097</a>)</li>
<li>Supportata la restituzione di proprietà configurabili quando si descrive un indice<a href="https://github.com/milvus-io/milvus/pull/40043">(#40043</a>)</li>
<li>Ottimizzate le prestazioni delle espressioni per alcuni punti<a href="https://github.com/milvus-io/milvus/pull/39938">(#39938</a>)</li>
<li>[2.5] Ottimizzato il formato dei risultati di getQueryNodeDistribution (<a href="https://github.com/milvus-io/milvus/pull/39926">#39926</a>)</li>
<li>[cp25] Abilitata l'osservazione dell'amplificazione della scrittura<a href="https://github.com/milvus-io/milvus/pull/39743">(#39743</a>)</li>
<li>[2.5] Restituiti i risultati top-k durante la ricerca in RESTful v2<a href="https://github.com/milvus-io/milvus/pull/39839">(#39839</a>)</li>
<li>[2.5][GoSDK] Aggiunto lo zucchero sintattico withEnableMatch (<a href="https://github.com/milvus-io/milvus/pull/39853">#39853</a>)</li>
<li>[2.5] L'indice intermedio supporta diversi tipi di indice e più tipi di dati (FP16/BF16)<a href="https://github.com/milvus-io/milvus/pull/39180">(#39180</a>)</li>
<li>[GoSDK][2.5] Sincronizzati i commit di GoSDK dal ramo master (<a href="https://github.com/milvus-io/milvus/pull/39823">#39823</a>)</li>
<li>Mantenuta la coerenza della memoria e dei meta dell'emittente<a href="https://github.com/milvus-io/milvus/pull/39721">(#39721</a>)</li>
<li>Trasmissione con notifica basata su eventi<a href="https://github.com/milvus-io/milvus/pull/39550">(#39550</a>)</li>
<li>[2.5] Raffinato il messaggio di errore per il controllo di schemi e indici<a href="https://github.com/milvus-io/milvus/pull/39565">(#39565</a>)</li>
<li>[2.5] Ripristinato il tipo di indice automatico predefinito per gli scalari<a href="https://github.com/milvus-io/milvus/pull/39820">(#39820</a>)</li>
<li>[2.5] Reinserito il task di compattazione L0 quando il precheck non è riuscito<a href="https://github.com/milvus-io/milvus/pull/39871">(#39871</a>)</li>
</ul>
<h2 id="v254" class="common-anchor-header">v2.5.4<button data-href="#v254" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 23 gennaio 2025</p>
<table>
<thead>
<tr><th>Versione Milvus</th><th>Versione dell'SDK Python</th><th>Versione dell'SDK Node.js</th><th>Versione SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Siamo lieti di annunciare il rilascio di Milvus 2.5.4, che introduce ottimizzazioni chiave delle prestazioni e nuove funzionalità come l'isolamento della PartitionKey, l'indice Sparse con DAAT MaxScore e meccanismi di blocco migliorati. Un punto di forza di questa versione è il supporto per 10.000 collezioni e 1 milione di partizioni, che rappresenta un'importante pietra miliare per i casi di utilizzo multi-tenant. Questa versione risolve anche diversi bug che migliorano la stabilità e l'affidabilità generali; due di questi bug critici possono causare la perdita di dati. Vi invitiamo ad aggiornare o a provare quest'ultima versione e siamo ansiosi di ricevere il vostro feedback per aiutarci a perfezionare continuamente Milvus!</p>
<h3 id="Features" class="common-anchor-header">Caratteristiche</h3><ul>
<li>Supporta l'isolamento delle chiavi di partizione per migliorare le prestazioni con chiavi di partizione multiple<a href="https://github.com/milvus-io/milvus/pull/39245">(#39245</a>). Per ulteriori informazioni, fare riferimento a <a href="/docs/it/use-partition-key.md">Utilizzare la chiave di partizione</a>.</li>
<li>Sparse Index ora supporta DAAT MaxScore <a href="https://github.com/milvus-io/knowhere/pull/1015">knowhere/#1015</a>. Per ulteriori informazioni, fare riferimento a <a href="/docs/it/sparse_vector.md">Vettore sparso</a>.</li>
<li>Aggiunge il supporto per <code translate="no">is_null</code> nelle espressioni<a href="https://github.com/milvus-io/milvus/pull/38931">(#38931</a>).</li>
<li>I privilegi di root possono essere personalizzati (<a href="https://github.com/milvus-io/milvus/pull/39324">#39324</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti</h3><ul>
<li>Supporto di 10K collezioni e 1 milione di partizioni in un cluster<a href="https://github.com/milvus-io/milvus/pull/37630">(#37630</a>)</li>
<li>Informazioni delta dei segmenti in cache per accelerare il Query Coordinator<a href="https://github.com/milvus-io/milvus/pull/39349">(#39349</a>)</li>
<li>Lettura simultanea dei metadati a livello di collezione per accelerare il recupero dei guasti (<a href="https://github.com/milvus-io/milvus/pull/38900">#38900</a>)</li>
<li>Raffinata granularità dei lock in QueryNode<a href="https://github.com/milvus-io/milvus/pull/39282">(#39282</a>),<a href="https://github.com/milvus-io/milvus/pull/38907">(#38907</a>)</li>
<li>Unificato lo stile usando CStatus per gestire le chiamate CGO a NewCollection<a href="https://github.com/milvus-io/milvus/pull/39303">(#39303</a>)</li>
<li>Saltata la generazione del limitatore di partizione se non è impostata alcuna partizione<a href="https://github.com/milvus-io/milvus/pull/38911">(#38911</a>)</li>
<li>Aggiunto un maggiore supporto alle API RESTful<a href="https://github.com/milvus-io/milvus/pull/38875">(#38875</a>)<a href="https://github.com/milvus-io/milvus/pull/39425">(#39425</a>)</li>
<li>Rimossi i filtri Bloom non necessari in QueryNode e DataNode per ridurre l'uso della memoria<a href="https://github.com/milvus-io/milvus/pull/38913">(#38913</a>)</li>
<li>Velocizzato il caricamento dei dati accelerando la generazione, la pianificazione e l'esecuzione dei task in QueryCoord<a href="https://github.com/milvus-io/milvus/pull/38905">(#38905</a>)</li>
<li>Ridotto il blocco in DataCoord per velocizzare le operazioni di caricamento e inserimento<a href="https://github.com/milvus-io/milvus/pull/38904">(#38904</a>)</li>
<li>Aggiunti i nomi dei campi primari in <code translate="no">SearchResult</code> e <code translate="no">QueryResults</code> <a href="https://github.com/milvus-io/milvus/pull/39222">(#39222</a>)</li>
<li>Utilizzato sia la dimensione del binlog che quella dell'indice come standard di limitazione della quota disco (<a href="https://github.com/milvus-io/milvus/pull/38844">#38844</a>)</li>
<li>Ottimizzato l'uso della memoria per la ricerca full-text knowhere/#1011</li>
<li>Aggiunto il controllo di versione per gli indici scalari<a href="https://github.com/milvus-io/milvus/pull/39236">(#39236</a>)</li>
<li>Migliorata la velocità di recupero delle informazioni sulle collezioni da RootCoord evitando copie non necessarie<a href="https://github.com/milvus-io/milvus/pull/38902">(#38902</a>)</li>
</ul>
<h3 id="Critial-Bug-fixs" class="common-anchor-header">Correzioni di bug critici</h3><ul>
<li>Corretti gli errori di ricerca per le chiavi primarie con indici<a href="https://github.com/milvus-io/milvus/pull/39390">(#39390</a>)</li>
<li>Corretto un potenziale problema di perdita di dati causato dal riavvio di MixCoord e dal flushing simultaneo<a href="https://github.com/milvus-io/milvus/pull/39422">(#39422</a>)</li>
<li>Corretto un errore di cancellazione innescato da una concomitanza impropria tra i task di stats e la compattazione L0 dopo il riavvio di MixCoord<a href="https://github.com/milvus-io/milvus/pull/39460">(#39460</a>)</li>
<li>Corretta l'incompatibilità degli indici scalari invertiti durante l'aggiornamento da 2.4 a 2.5<a href="https://github.com/milvus-io/milvus/pull/39272">(#39272</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug</h3><ul>
<li>Corretti i problemi di lentezza delle query causati dalla granularità grossolana dei lock durante il caricamento di più colonne<a href="https://github.com/milvus-io/milvus/pull/39255">(#39255</a>)</li>
<li>Corretto un problema per cui l'uso di alias poteva causare l'attraversamento di un iteratore nel database sbagliato<a href="https://github.com/milvus-io/milvus/pull/39248">(#39248</a>)</li>
<li>Corretto un errore di aggiornamento del gruppo di risorse quando si modificava il database<a href="https://github.com/milvus-io/milvus/pull/39356">(#39356</a>)</li>
<li>Corretto un problema sporadico per cui l'indice tantivy non poteva cancellare i file di indice durante il rilascio<a href="https://github.com/milvus-io/milvus/pull/39434">(#39434</a>)</li>
<li>Corretta l'indicizzazione lenta causata da un numero eccessivo di thread<a href="https://github.com/milvus-io/milvus/pull/39341">(#39341</a>)</li>
<li>Risolto un problema che impediva di saltare i controlli della quota disco durante l'importazione in blocco (<a href="https://github.com/milvus-io/milvus/pull/39319">#39319</a>)</li>
<li>Risolti i problemi di freeze causati da un numero eccessivo di consumatori di code di messaggi limitando la concurrency<a href="https://github.com/milvus-io/milvus/pull/38915">(#38915</a>)</li>
<li>Risolti i timeout delle query causati dai riavvii di MixCoord durante le compattazioni su larga scala<a href="https://github.com/milvus-io/milvus/pull/38926">(#38926</a>)</li>
<li>Risolti i problemi di sbilanciamento dei canali causati dai tempi di inattività dei nodi<a href="https://github.com/milvus-io/milvus/pull/39200">(#39200</a>)</li>
<li>Corretto un problema che poteva causare il blocco del bilanciamento dei canali.<a href="https://github.com/milvus-io/milvus/pull/39160">(#39160</a>)</li>
<li>Corretto un problema per cui i controlli dei livelli di privilegio dei gruppi personalizzati RBAC diventavano inefficaci<a href="https://github.com/milvus-io/milvus/pull/39224">(#39224</a>)</li>
<li>Corretto un errore nel recupero del numero di righe in indici vuoti<a href="https://github.com/milvus-io/milvus/pull/39210">(#39210</a>)</li>
<li>Corretta la stima errata della memoria per i segmenti piccoli<a href="https://github.com/milvus-io/milvus/pull/38909">(#38909</a>)</li>
</ul>
<h2 id="v253" class="common-anchor-header">v2.5.3<button data-href="#v253" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 13 gennaio 2025</p>
<table>
<thead>
<tr><th>Versione Milvus</th><th>Versione SDK Python</th><th>Versione dell'SDK Node.js</th><th>Versione SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.3 fornisce correzioni di bug critici e miglioramenti delle prestazioni per migliorare la stabilità, l'affidabilità e l'usabilità complessive. Questa versione perfeziona la gestione della concorrenza, rafforza l'indicizzazione e il recupero dei dati e aggiorna diversi componenti chiave per un'esperienza utente più solida.</p>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug</h3><ul>
<li>Corretto un problema per cui l'uso di un filtro <code translate="no">IN</code> su una chiave primaria <code translate="no">VARCHAR</code> poteva restituire risultati vuoti.<a href="https://github.com/milvus-io/milvus/pull/39108">(#39108</a>)</li>
<li>Corretto un problema di concorrenza tra le operazioni di query e di cancellazione che poteva portare a risultati errati.<a href="https://github.com/milvus-io/milvus/pull/39054">(#39054</a>)</li>
<li>Corretto un errore causato dal filtraggio iterativo quando un <code translate="no">expr</code> era vuoto in una richiesta di query.<a href="https://github.com/milvus-io/milvus/pull/39034">(#39034</a>)</li>
<li>Corretto un problema per cui un errore del disco durante l'aggiornamento della configurazione portava all'uso delle impostazioni predefinite.<a href="https://github.com/milvus-io/milvus/pull/39072">(#39072</a>)</li>
<li>Corretta una potenziale perdita di dati cancellati a causa della compattazione del cluster.<a href="https://github.com/milvus-io/milvus/pull/39133">(#39133</a>)</li>
<li>Corretta una query di corrispondenza del testo interrotta nei segmenti di dati in crescita.<a href="https://github.com/milvus-io/milvus/pull/39113">(#39113</a>)</li>
<li>Corretti gli errori di recupero causati dal fatto che l'indice non contiene i dati originali per i vettori sparsi.<a href="https://github.com/milvus-io/milvus/pull/39146">(#39146</a>)</li>
<li>Corretta una possibile condizione di gara tra campi di colonne causata dalla concomitanza di query e caricamento dei dati.<a href="https://github.com/milvus-io/milvus/pull/39152">(#39152</a>)</li>
<li>Corretti gli errori di inserimento in blocco quando i campi nullable o default_value non erano inclusi nei dati.<a href="https://github.com/milvus-io/milvus/pull/39111">(#39111</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti</h3><ul>
<li>Aggiunta un'API per i gruppi di risorse per l'interfaccia RESTful.<a href="https://github.com/milvus-io/milvus/pull/39092">(#39092</a>)</li>
<li>Ottimizzate le prestazioni di recupero sfruttando i metodi SIMD del bitset.<a href="https://github.com/milvus-io/milvus/pull/39041">(#39041</a>)</li>
<li>Utilizzato il timestamp MVCC come timestamp di garanzia quando specificato.<a href="https://github.com/milvus-io/milvus/pull/39019">(#39019</a>)</li>
<li>Aggiunte le metriche di cancellazione mancanti.<a href="https://github.com/milvus-io/milvus/pull/38747">(#38747</a>)</li>
<li>Aggiornato Etcd alla versione v3.5.16.<a href="https://github.com/milvus-io/milvus/pull/38969">(#38969</a>)</li>
<li>Creato un nuovo pacchetto Go per gestire i prototipi.<a href="https://github.com/milvus-io/milvus/pull/39128">(#39128</a>)</li>
</ul>
<h2 id="v252" class="common-anchor-header">v2.5.2<button data-href="#v252" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 3 gennaio 2025</p>
<table>
<thead>
<tr><th>Versione Milvus</th><th>Versione dell'SDK Python</th><th>Versione dell'SDK Node.js</th><th>Versione SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.2</td><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td></tr>
</tbody>
</table>
<p>Milvus 2.5.2 supporta la modifica della lunghezza massima delle colonne VARCHAR e risolve diversi problemi critici relativi alla concorrenza, alle cadute delle partizioni e alla gestione delle statistiche BM25 durante l'importazione. Si consiglia vivamente di passare a questa versione per migliorare la stabilità e le prestazioni.</p>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti</h3><ul>
<li>Generazione di registri di utilizzo del disco solo quando il percorso specificato non esiste.<a href="https://github.com/milvus-io/milvus/pull/38822">(#38822</a>)</li>
<li>Aggiunto un parametro per regolare la lunghezza massima di VARCHAR e ripristinato il limite a 65.535.<a href="https://github.com/milvus-io/milvus/pull/38883">(#38883</a>)</li>
<li>Supportata la conversione del tipo di parametro per le espressioni.<a href="https://github.com/milvus-io/milvus/pull/38782">(#38782</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug</h3><ul>
<li>Corretti potenziali deadlock in scenari di concorrenza.<a href="https://github.com/milvus-io/milvus/pull/38863">(#38863</a>)</li>
<li>Generato il file index_null_offset solo per i campi che supportano valori nulli.<a href="https://github.com/milvus-io/milvus/pull/38834">(#38834</a>)</li>
<li>Corretto l'utilizzo del piano di recupero dopo il free nella fase di riduzione.<a href="https://github.com/milvus-io/milvus/pull/38841">(#38841</a>)</li>
<li>Riconosciute le espressioni con AND e OR maiuscoli.<a href="https://github.com/milvus-io/milvus/pull/38928">(#38928</a>)</li>
<li>Consentito l'abbandono della partizione anche se il caricamento non è riuscito.<a href="https://github.com/milvus-io/milvus/pull/38874">(#38874</a>)</li>
<li>Corretti i problemi di registrazione del file BM25 durante l'importazione.<a href="https://github.com/milvus-io/milvus/pull/38881">(#38881</a>)</li>
</ul>
<h2 id="v251" class="common-anchor-header">v2.5.1<button data-href="#v251" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 26 dicembre 2024</p>
<table>
<thead>
<tr><th>Versione Milvus</th><th>Versione dell'SDK Python</th><th>Versione dell'SDK Node.js</th><th>Versione SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.1 si concentra su una serie di correzioni di bug che riguardano il caricamento della memoria, gli elenchi RBAC, il bilanciamento dei nodi di query e l'indicizzazione dei segmenti sigillati, oltre a migliorare l'interfaccia web e gli intercettori. Si consiglia vivamente di aggiornare alla versione 2.5.1 per migliorare la stabilità e l'affidabilità.</p>
<h3 id="Improvement" class="common-anchor-header">Miglioramenti</h3><ul>
<li>Aggiornamento delle pagine di raccolta e di query dell'interfaccia web.<a href="https://github.com/milvus-io/milvus/pull/38701">(#38701</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correzioni di bug</h3><ul>
<li>Risolti i problemi di OOM aggiungendo un fattore di memoria alle stime di caricamento.<a href="https://github.com/milvus-io/milvus/pull/38722">(#38722</a>)</li>
<li>Corretta l'espansione dei gruppi di privilegi quando si elencano le politiche in RootCoord.<a href="https://github.com/milvus-io/milvus/pull/38760">(#38760</a>)</li>
<li>Corretti i problemi con l'elenco dei gruppi di privilegi e delle raccolte.<a href="https://github.com/milvus-io/milvus/pull/38738">(#38738</a>)</li>
<li>Corretto il bilanciatore per evitare di sovraccaricare ripetutamente lo stesso nodo di query.<a href="https://github.com/milvus-io/milvus/pull/38724">(#38724</a>)</li>
<li>Corretti i compiti di bilanciamento inattesi attivati dopo il riavvio di QueryCoord.<a href="https://github.com/milvus-io/milvus/pull/38725">(#38725</a>)</li>
<li>Corretto l'aggiornamento della configurazione del carico che non si applica al caricamento delle raccolte.<a href="https://github.com/milvus-io/milvus/pull/38737">(#38737</a>)</li>
<li>Corretto il conteggio di zero letture durante l'importazione dei dati.<a href="https://github.com/milvus-io/milvus/pull/38695">(#38695</a>)</li>
<li>Corretta la decodifica Unicode per le chiavi JSON nelle espressioni.<a href="https://github.com/milvus-io/milvus/pull/38653">(#38653</a>)</li>
<li>Corretto il nome del DB dell'intercettore per alterCollectionField in 2.5. <a href="https://github.com/milvus-io/milvus/pull/38663">(#38663</a>)</li>
<li>Corretti i parametri dell'indice vuoti per i segmenti sigillati quando si usa la ricerca brute force di BM25.<a href="https://github.com/milvus-io/milvus/pull/38752">(#38752</a>)</li>
</ul>
<h2 id="v250" class="common-anchor-header">v2.5.0<button data-href="#v250" class="anchor-icon" translate="no">
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
    </button></h2><p>Data di rilascio: 23 dicembre 2024</p>
<table>
<thead>
<tr><th>Versione Milvus</th><th>Versione dell'SDK Python</th><th>Versione dell'SDK Node.js</th><th>Versione SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.0</td><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.0 apporta significativi miglioramenti per migliorare l'usabilità, la scalabilità e le prestazioni per gli utenti che si occupano di ricerca vettoriale e di gestione di dati su larga scala. Con questa versione, Milvus integra nuove potenti funzionalità come la ricerca basata sui termini, la compattazione dei cluster per ottimizzare le query e il supporto versatile per i metodi di ricerca vettoriale rada e densa. I miglioramenti nella gestione dei cluster, nell'indicizzazione e nella gestione dei dati introducono nuovi livelli di flessibilità e facilità d'uso, rendendo Milvus un database vettoriale ancora più robusto e facile da usare.</p>
<h3 id="Key-Features" class="common-anchor-header">Caratteristiche principali</h3><h4 id="Full-Text-Search" class="common-anchor-header">Ricerca a testo pieno</h4><p>Milvus 2.5 supporta la ricerca full text implementata con Sparse-BM25! Questa funzione è un importante complemento alle forti capacità di ricerca semantica di Milvus, soprattutto in scenari che coinvolgono parole rare o termini tecnici. Nelle versioni precedenti, Milvus supportava vettori sparsi per aiutare gli scenari di ricerca per parole chiave. Questi vettori sparsi venivano generati al di fuori di Milvus da modelli neurali come SPLADEv2/BGE-M3 o da modelli statistici come l'algoritmo BM25.</p>
<p>Grazie a <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, Milvus 2.5 dispone di analizzatori integrati e di estrazione di vettori sparsi, estendendo l'API dalla ricezione di soli vettori come input all'accettazione diretta di testo. Le informazioni statistiche del BM25 vengono aggiornate in tempo reale durante l'inserimento dei dati, migliorando l'usabilità e l'accuratezza. Inoltre, i vettori sparsi basati su algoritmi di prossimità approssimata (ANN) offrono prestazioni più potenti rispetto ai sistemi di ricerca per parole chiave standard.</p>
<p>Per maggiori dettagli, consultare la <a href="/docs/it/analyzer-overview.md">Panoramica dell'analizzatore</a> e la <a href="/docs/it/full-text-search.md">Ricerca a testo completo</a>.</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">WebUI di gestione dei cluster (Beta)</h4><p>Per supportare al meglio i dati massivi e le funzionalità più ricche, il sofisticato design di Milvus include varie dipendenze, numerosi ruoli dei nodi, strutture di dati complesse e altro ancora. Questi aspetti possono rappresentare una sfida per l'utilizzo e la manutenzione.</p>
<p>Milvus 2.5 introduce una WebUI integrata per la gestione dei cluster, che riduce le difficoltà di manutenzione del sistema visualizzando le complesse informazioni dell'ambiente di runtime di Milvus. Queste includono dettagli su database e collezioni, segmenti, canali, dipendenze, stato di salute dei nodi, informazioni sui task, query lente e altro ancora.</p>
<p>Per maggiori dettagli, consultare <a href="/docs/it/milvus-webui.md">Milvus WebUI</a>.</p>
<h4 id="Text-Match" class="common-anchor-header">Corrispondenza del testo</h4><p>Milvus 2.5 sfrutta gli analizzatori e l'indicizzazione di <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> per la preelaborazione del testo e la creazione di indici, supportando una precisa corrispondenza in linguaggio naturale dei dati di testo in base a termini specifici. Questa funzione è utilizzata principalmente per la ricerca filtrata per soddisfare condizioni specifiche e può incorporare un filtro scalare per affinare i risultati delle query, consentendo la ricerca di similarità all'interno di vettori che soddisfano criteri scalari.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/analyzer-overview.md">Panoramica dell'analizzatore</a> e <a href="/docs/it/keyword-match.md">Corrispondenza testo</a>.</p>
<h4 id="Bitmap-Index" class="common-anchor-header">Indice Bitmap</h4><p>Alla famiglia Milvus è stato aggiunto un nuovo indice di dati scalari. L'indice BitMap utilizza un array di bit, di lunghezza pari al numero di righe, per rappresentare l'esistenza di valori e accelerare le ricerche.</p>
<p>Gli indici Bitmap sono stati tradizionalmente efficaci per i campi a bassa cardinalità, che hanno un numero modesto di valori distinti, ad esempio una colonna contenente informazioni sul sesso con solo due valori possibili: maschio e femmina.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/bitmap.md">Indice bitmap</a>.</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">Nullable e valore predefinito</h4><p>Milvus supporta ora l'impostazione di proprietà nullable e di valori predefiniti per campi scalari diversi da quello della chiave primaria. Per i campi scalari contrassegnati come <code translate="no">nullable=True</code>, gli utenti possono omettere il campo durante l'inserimento dei dati; il sistema lo tratterà come valore nullo o valore predefinito (se impostato) senza lanciare un errore.</p>
<p>I valori predefiniti e le proprietà annullabili offrono a Milvus una maggiore flessibilità. Gli utenti possono utilizzare questa funzione per i campi con valori incerti durante la creazione di collezioni. Inoltre, semplificano la migrazione dei dati da altri sistemi di database a Milvus, consentendo di gestire insiemi di dati contenenti valori nulli conservando le impostazioni originali dei valori predefiniti.</p>
<p>Per maggiori dettagli, consultare <a href="/docs/it/nullable-and-default.md">Nullable &amp; Default Value</a>.</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">HNSW SQ/PQ/PRQ basato su Faiss</h4><p>Grazie alla stretta collaborazione con la comunità di Faiss, l'algoritmo HNSW di Faiss è stato notevolmente migliorato sia in termini di funzionalità che di prestazioni. Per motivi di stabilità e manutenibilità, Milvus 2.5 ha ufficialmente migrato il supporto per HNSW da hnswlib a Faiss.</p>
<p>Basato su Faiss, Milvus 2.5 supporta diversi metodi di quantizzazione su HNSW per soddisfare le esigenze di diversi scenari: SQ (Scalar Quantizers), PQ (Product Quantizer) e PRQ (Product Residual Quantizer). SQ e PQ sono più comuni; SQ offre buone prestazioni di interrogazione e velocità di costruzione, mentre PQ offre un richiamo migliore a parità di rapporto di compressione. Molti database vettoriali utilizzano comunemente la quantizzazione binaria, che è una forma semplice di quantizzazione SQ.</p>
<p>PRQ è una fusione di PQ e AQ (Additive Quantizer). Rispetto a PQ, richiede tempi di costruzione più lunghi per offrire un richiamo migliore, soprattutto a tassi di compressione elevati, come la compressione binaria.</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">Compattazione dei cluster (Beta)</h4><p>Milvus 2.5 introduce la Clustering Compaction per accelerare le ricerche e ridurre i costi di grandi collezioni. Specificando un campo scalare come chiave di clustering, i dati vengono ridistribuiti per intervallo per ottimizzare la memorizzazione e il recupero. Agendo come un indice globale, questa funzione consente a Milvus di sfrondare in modo efficiente i dati durante le query basate sui metadati di clustering, migliorando le prestazioni di ricerca quando vengono applicati filtri scalari.</p>
<p>Per ulteriori informazioni, consultare la sezione <a href="/docs/it/clustering-compaction.md">Compattazione del clustering</a>.</p>
<h3 id="Other-Features" class="common-anchor-header">Altre caratteristiche</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">Nodo di streaming (Beta)</h4><p>Milvus 2.5 introduce un nuovo componente chiamato nodo di streaming, che fornisce servizi di Write-Ahead Logging (WAL). Ciò consente a Milvus di ottenere il consenso prima e dopo la lettura e la scrittura dei canali, sbloccando nuove caratteristiche, funzionalità e ottimizzazioni. Questa funzione è disabilitata per impostazione predefinita in Milvus 2.5 e sarà disponibile ufficialmente nella versione 3.0.</p>
<h4 id="IPv6-Support" class="common-anchor-header">Supporto IPv6</h4><p>Milvus supporta ora IPv6, consentendo una maggiore connettività e compatibilità di rete.</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">Importazione massiva CSV</h4><p>Oltre ai formati JSON e Parquet, Milvus supporta ora l'importazione diretta di dati in massa in formato CSV.</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">Modelli di espressione per l'accelerazione delle query</h4><p>Milvus supporta ora i modelli di espressione, migliorando l'efficienza dell'analisi delle espressioni, in particolare in scenari con espressioni complesse.</p>
<p>Per maggiori dettagli, consultate la sezione <a href="/docs/it/filtering-templating.md">Templatura dei filtri</a>.</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">Miglioramenti di GroupBy</h4><ul>
<li><strong>Dimensione del gruppo personalizzabile</strong>: Aggiunto il supporto per specificare il numero di voci restituite per ogni gruppo.</li>
<li><strong>Ricerca ibrida GroupBy</strong>: Supporta la ricerca ibrida GroupBy basata su più colonne vettoriali.</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">Miglioramenti all'iteratore</h4><ul>
<li><strong>Supporto MVCC</strong>: Gli utenti possono ora usare gli iteratori senza essere influenzati da successive modifiche dei dati, come inserimenti e cancellazioni, grazie al Multi-Version Concurrency Control (MVCC).</li>
<li><strong>Cursore persistente</strong>: Milvus supporta ora un cursore persistente per QueryIterator, consentendo agli utenti di riprendere l'iterazione dall'ultima posizione dopo un riavvio di Milvus senza dover riavviare l'intero processo di iterazione.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Miglioramenti</h3><h4 id="Deletion-Optimization" class="common-anchor-header">Ottimizzazione della cancellazione</h4><p>Migliorata la velocità e ridotto l'uso della memoria per le cancellazioni su larga scala, ottimizzando l'uso dei blocchi e la gestione della memoria.</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">Aggiornamento delle dipendenze</h4><p>Aggiornamento a ETCD 3.5.16 e Pulsar 3.0.7 LTS, con correzione delle CVE esistenti e miglioramento della sicurezza. Nota: l'aggiornamento a Pulsar 3.x non è compatibile con le precedenti versioni 2.x.</p>
<p>Per gli utenti che hanno già una distribuzione Milvus funzionante, è necessario aggiornare i componenti ETCD e Pulsar prima di poter utilizzare le nuove caratteristiche e funzioni. Per ulteriori informazioni, consultare <a href="/docs/it/upgrade-pulsar-v3.md">Aggiornamento di Pulsar da 2.x a 3.x</a>.</p>
<h4 id="Local-Storage-V2" class="common-anchor-header">Archiviazione locale V2</h4><p>Introdotto un nuovo formato di file locale in Milvus 2.5, che migliora l'efficienza del caricamento e delle query per i dati scalari, riduce l'overhead della memoria e getta le basi per le ottimizzazioni future.</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">Ottimizzazione del parsing delle espressioni</h4><p>Migliorato il parsing delle espressioni implementando la cache per le espressioni ripetute, aggiornando ANTLR e ottimizzando le prestazioni delle clausole <code translate="no">NOT IN</code>.</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">Miglioramento delle prestazioni di concomitanza del DDL</h4><p>Ottimizzate le prestazioni di concorrenza delle operazioni del Data Definition Language (DDL).</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">Allineamento delle funzionalità dell'API RESTful</h4><p>Allineate le funzionalità dell'API RESTful con gli altri SDK per coerenza.</p>
<h4 id="Security--Configuration-Updates" class="common-anchor-header">Aggiornamenti di sicurezza e configurazione</h4><p>Supportato TLS per proteggere la comunicazione tra i nodi in ambienti più complessi o aziendali. Per i dettagli, consultare la sezione <a href="/docs/it/tls.md">Configurazione della sicurezza</a>.</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">Miglioramenti delle prestazioni di compattazione</h4><p>Eliminati i limiti massimi dei segmenti nella compattazione mista e ora viene data priorità ai segmenti più piccoli, migliorando l'efficienza e accelerando le query su insiemi di dati grandi o frammentati.</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">Bilanciamento dei canali basato sui punteggi</h4><p>Introdotto un criterio che bilancia dinamicamente i carichi tra i canali, migliorando l'utilizzo delle risorse e la stabilità complessiva nelle distribuzioni su larga scala.</p>
