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
<h3 id="Architecture-Changes" class="common-anchor-header">Modifiche all'architettura</h3><p>Dalla versione 2.6, Milvus introduce significative modifiche architettoniche volte a migliorare le prestazioni, la scalabilità e la facilità d'uso. Per ulteriori informazioni, consultare la <a href="/docs/it/v2.6.x/architecture_overview.md">Panoramica dell'architettura di Milvus</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Nodo di streaming (GA)</h4><p>Nelle versioni precedenti, i dati in streaming venivano scritti nel WAL dal Proxy e letti dal QueryNode e dal DataNode. Questa architettura rendeva difficile ottenere il consenso in scrittura e richiedeva una logica complessa in lettura. Inoltre, il delegatore di query si trovava nel QueryNode, il che ostacolava la scalabilità. Milvus 2.5.0 ha introdotto lo Streaming Node, che nella versione 2.6.0 diventa GA. Questo componente è ora responsabile di tutte le operazioni di lettura/scrittura WAL a livello di shard e funge anche da delegatore di query, risolvendo i problemi sopra citati e consentendo nuove ottimizzazioni.</p>
<p><strong>Avviso importante per l'aggiornamento</strong>: Streaming Node rappresenta un cambiamento architettonico significativo, pertanto non è possibile effettuare un aggiornamento diretto a Milvus 2.6.0-rc1 da versioni precedenti.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">WAL nativo Woodpecker</h4><p>In precedenza Milvus si affidava a sistemi esterni come Kafka o Pulsar per il suo WAL. Pur essendo funzionali, questi sistemi aggiungevano una notevole complessità operativa e un sovraccarico di risorse, in particolare per le distribuzioni di piccole e medie dimensioni. In Milvus 2.6, questi sistemi sono stati sostituiti da Woodpecker, un sistema WAL cloud-native appositamente costruito. Woodpecker è progettato per l'archiviazione a oggetti e supporta sia la modalità zero-disk locale che quella basata sull'archiviazione a oggetti, semplificando le operazioni e migliorando le prestazioni e la scalabilità.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">Fusione di DataNode e IndexNode</h4><p>In Milvus 2.6, attività come la compattazione, l'importazione massiva, la raccolta di statistiche e la creazione di indici sono ora gestite da uno scheduler unificato. La funzione di persistenza dei dati, precedentemente gestita dal DataNode, è stata spostata allo Streaming Node. Per semplificare la distribuzione e la manutenzione, l'IndexNode e il DataNode sono stati fusi in un unico componente DataNode. Questo nodo consolidato esegue ora tutti questi compiti critici, riducendo la complessità operativa e ottimizzando l'utilizzo delle risorse.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Fusione del coordinatore in MixCoord</h4><p>Il progetto precedente con i moduli RootCoord, QueryCoord e DataCoord separati introduceva complessità nella comunicazione tra i moduli. Per semplificare la progettazione del sistema, questi componenti sono stati fusi in un unico coordinatore unificato, chiamato MixCoord. Questo consolidamento riduce la complessità della programmazione distribuita, sostituendo la comunicazione basata sulla rete con chiamate a funzioni interne, con il risultato di un funzionamento più efficiente del sistema e di una semplificazione dello sviluppo e della manutenzione.</p>
<h3 id="Key-Features" class="common-anchor-header">Caratteristiche principali</h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">Quantizzazione a 1 bit RaBitQ</h4><p>Per gestire insiemi di dati di grandi dimensioni, la quantizzazione a 1 bit è una tecnica efficace per migliorare l'utilizzo delle risorse e le prestazioni di ricerca. Tuttavia, i metodi tradizionali possono avere un impatto negativo sul richiamo. In collaborazione con gli autori della ricerca originale, Milvus 2.6 introduce RaBitQ, una soluzione di quantizzazione a 1 bit che mantiene un'elevata accuratezza di richiamo pur offrendo i vantaggi in termini di risorse e prestazioni della compressione a 1 bit.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/v2.6.x/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">Miglioramento della capacità JSON</h4><p>Milvus 2.6 migliora il supporto per il tipo di dati JSON con i seguenti miglioramenti:</p>
<ul>
<li><strong>Prestazioni</strong>: L'indicizzazione dei percorsi JSON è ora ufficialmente supportata, consentendo la creazione di indici invertiti su percorsi specifici all'interno di oggetti JSON (ad esempio, <code translate="no">meta.user.location</code>). Questo evita la scansione completa degli oggetti e migliora la latenza delle query con filtri complessi.</li>
<li><strong>Funzionalità</strong>: Per supportare logiche di filtraggio più complesse, questa release aggiunge il supporto alle funzioni <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code> e <code translate="no">CAST</code>. In prospettiva, il nostro lavoro sul supporto JSON continua. Siamo entusiasti di anticipare che le prossime versioni ufficiali presenteranno funzionalità ancora più potenti, come la <strong>triturazione di JSON</strong> e un <strong>indice JSON FLAT</strong>, progettato per migliorare drasticamente le prestazioni dei dati JSON altamente annidati.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Miglioramento delle funzioni dell'analizzatore/tokenizzatore</h4><p>Questa versione migliora significativamente le capacità di elaborazione del testo con diversi aggiornamenti dell'Analizzatore e del Tokenizzatore:</p>
<ul>
<li>È disponibile una nuova sintassi di <a href="/docs/it/v2.6.x/analyzer-overview.md#Example-use">Run Analyzer</a> per convalidare le configurazioni del tokenizer.</li>
<li>Il <a href="/docs/it/v2.6.x/lindera-tokenizer.md">tokenizer Lindera</a> è integrato per migliorare il supporto delle lingue asiatiche come il giapponese e il coreano.</li>
<li>È ora supportata la selezione del tokenizer a livello di riga, con il <a href="/docs/it/v2.6.x/icu-tokenizer.md">tokenizer</a> generale <a href="/docs/it/v2.6.x/icu-tokenizer.md">ICU</a> disponibile come ripiego per gli scenari multilingue.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">Data-in, Data-Out con le funzioni di incorporamento</h4><p>Milvus 2.6 introduce la funzionalità "Data-in, Data-Out" che semplifica lo sviluppo di applicazioni di intelligenza artificiale integrandosi direttamente con modelli di incorporamento di terze parti (ad esempio, OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face). Gli utenti possono ora inserire e interrogare dati di testo grezzi e Milvus chiamerà automaticamente il servizio di modello specificato per convertire il testo in vettori in tempo reale. Questo elimina la necessità di una pipeline di conversione vettoriale separata.</p>
<p>Per ulteriori informazioni, consultare la <a href="/docs/it/v2.6.x/embedding-function-overview.md">Panoramica della funzione di incorporamento</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">Corrispondenza di frase</h4><p>Phrase Match è una funzione di ricerca di testo che restituisce risultati solo quando la sequenza esatta di parole di una query appare consecutivamente e nell'ordine corretto all'interno di un documento.</p>
<p><strong>Caratteristiche principali</strong>:</p>
<ul>
<li>Sensibile all'ordine: Le parole devono apparire nello stesso ordine della query.</li>
<li>Corrispondenza consecutiva: Le parole devono apparire una accanto all'altra, a meno che non si utilizzi un valore di slop.</li>
<li>Slop (opzionale): Un parametro regolabile che consente un numero ridotto di parole intermedie, consentendo una corrispondenza fuzzy tra le frasi.</li>
</ul>
<p>Per ulteriori informazioni, fare riferimento a <a href="/docs/it/v2.6.x/phrase-match.md">Corrispondenza di frasi</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">Indice LSH MinHash (Beta)</h4><p>Per rispondere all'esigenza di deduplicazione dei dati nell'addestramento dei modelli, Milvus 2.6 aggiunge il supporto per gli indici MINHASH_LSH. Questa funzione fornisce un metodo efficiente dal punto di vista computazionale e scalabile per stimare la somiglianza di Jaccard tra i documenti per identificare i quasi duplicati. Gli utenti possono generare firme MinHash per i loro documenti di testo durante la preelaborazione e utilizzare l'indice MINHASH_LSH in Milvus per trovare in modo efficiente contenuti simili in set di dati su larga scala, migliorando la pulizia dei dati e la qualità del modello.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">Funzioni di decadimento consapevoli del tempo</h4><p>Milvus 2.6 introduce funzioni di decadimento consapevoli del tempo per affrontare scenari in cui il valore delle informazioni cambia nel tempo. Durante il re-ranking dei risultati, gli utenti possono applicare funzioni di decadimento esponenziale, gaussiano o lineare basate su un campo timestamp per regolare il punteggio di rilevanza di un documento. In questo modo si garantisce che i contenuti più recenti abbiano la priorità, il che è fondamentale per applicazioni come i feed di notizie, l'e-commerce e la memoria di un agente AI.</p>
<p>Per ulteriori informazioni, consultare la <a href="/docs/it/v2.6.x/decay-ranker-overview.md">panoramica di Decay Ranker</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Aggiunta di un campo per l'evoluzione dello schema online</h4><p>Per garantire una maggiore flessibilità dello schema, Milvus 2.6 supporta ora l'aggiunta online di un nuovo campo scalare o vettoriale allo schema di una collezione esistente. In questo modo si evita di creare una nuova collezione e di eseguire una migrazione dei dati che potrebbe essere dannosa in caso di modifica dei requisiti dell'applicazione.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/v2.6.x/add-fields-to-an-existing-collection.md">Aggiungi campi a una raccolta esistente</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">Supporto del vettore INT8</h4><p>In risposta al crescente utilizzo di modelli quantizzati che producono incorporazioni di interi a 8 bit, Milvus 2.6 aggiunge il supporto nativo per i vettori INT8. Ciò consente agli utenti di ingerire questi vettori direttamente senza de-quantizzazione, risparmiando costi di calcolo, di banda di rete e di archiviazione. Questa funzione è inizialmente supportata per gli indici della famiglia HNSW.</p>
<p>Per ulteriori informazioni, consultare <a href="/docs/it/v2.6.x/dense-vector.md">Vettore denso</a>.</p>
