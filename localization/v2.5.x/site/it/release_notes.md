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
<tr><th>Versione di Milvus</th><th>Versione dell'SDK Python</th><th>Versione dell'SDK Node.js</th><th>Versione SDK Java</th></tr>
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
<li>Corretto l'uso del piano di recupero dopo il free nella fase di riduzione.<a href="https://github.com/milvus-io/milvus/pull/38841">(#38841</a>)</li>
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
<li>Corretti i problemi relativi all'elenco dei gruppi di privilegi e delle raccolte.<a href="https://github.com/milvus-io/milvus/pull/38738">(#38738</a>)</li>
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
