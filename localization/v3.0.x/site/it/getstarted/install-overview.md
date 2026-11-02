---
id: install-overview.md
summary: >-
  Scegliete Milvus Lite, Standalone o Distributed in base al vostro carico di
  lavoro, ai requisiti di disponibilità e all'ambiente operativo.
title: Panoramica delle opzioni di implementazione di Milvus
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Panoramica delle opzioni di implementazione di Milvus<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus supporta prototipi locali e servizi di ricerca vettoriale su larga scala. Scegli tra Milvus Lite, Milvus Standalone e Milvus Distributed in base ai tuoi dati, al carico di lettura e scrittura, ai requisiti di disponibilità e all'ambiente operativo.</p>
<h2 id="Milvus-Lite" class="common-anchor-header">Milvus Lite<button data-href="#Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> è una libreria Python che può essere importata nelle vostre applicazioni. Essendo una versione leggera di Milvus, è ideale per la prototipazione rapida in Jupyter Notebook o per l’esecuzione su dispositivi smart con risorse limitate. Milvus Lite supporta le stesse API delle altre implementazioni di Milvus. Il codice lato client che interagisce con Milvus Lite può funzionare anche con istanze di Milvus in altre modalità di implementazione.</p>
<p>Per gli esempi locali, utilizzare Python 3.10 o versioni successive e installare esplicitamente la dipendenza opzionale Lite. Su Windows, pip ignora l’ <code translate="no">milvus-lite</code>, pertanto è necessario specificare esplicitamente il nome del pacchetto:</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Utilizzare ` <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> ` per aprire l’archivio locale. Milvus Lite 3.x crea una directory in questo percorso; un file di database Milvus Lite 2.x esistente richiede l’esportazione e la migrazione. Consultare <a href="/docs/it/milvus_lite.md">Esegui Milvus Lite</a> per i requisiti di piattaforma e <a href="/docs/it/quickstart.md">Guida rapida</a> per un esempio completo di inserimento e ricerca.</p>
<h2 id="Milvus-Standalone" class="common-anchor-header">Milvus Standalone<button data-href="#Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standalone è una distribuzione server su singola macchina. Tutti i componenti di Milvus Standalone sono raggruppati in un'unica <a href="https://milvus.io/docs/install_standalone-docker.md">immagine Docker</a>, rendendo la distribuzione più semplice. Se si dispone di un carico di lavoro di produzione ma si preferisce non utilizzare Kubernetes, l’esecuzione di Milvus Standalone su una singola macchina con memoria sufficiente rappresenta una valida opzione. Per impostazione predefinita, Milvus Standalone esegue <strong>Woodpecker</strong> (integrato) come coda di messaggi, quindi non è necessario gestire un servizio di messaggistica separato.</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus Distributed<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Distributed può essere distribuito su cluster <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>. Questa distribuzione presenta un’architettura cloud-native, in cui il carico di acquisizione e le query di ricerca sono gestiti separatamente da nodi isolati, consentendo la ridondanza per i componenti critici. Offre la massima scalabilità e disponibilità, oltre alla flessibilità nella personalizzazione delle risorse allocate in ciascun componente. Milvus Distributed è la scelta ideale per gli utenti aziendali che gestiscono sistemi di ricerca vettoriale su larga scala in produzione. Per impostazione predefinita, Milvus Distributed utilizza <strong>Woodpecker</strong> come coda di messaggi, distribuito come servizio dedicato insieme a Milvus.</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">Scegliete la modalità di implementazione più adatta al vostro caso d’uso<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h2><p>La scelta della modalità di implementazione dipende in genere dalla fase di sviluppo della tua applicazione:</p>
<ul>
<li><p><strong>Per una prototipazione rapida</strong></p>
<p>Utilizza Milvus Lite in un notebook per testare gli embedding, le strategie di chunking RAG e il comportamento di recupero. Passa a Milvus Standalone quando hai bisogno di un server condiviso o quando la memoria misurata e il carico delle query superano le capacità dell’ambiente locale. L’API client è simile, ma verifica le differenze nelle funzionalità e migra separatamente i dati archiviati.</p></li>
<li><p><strong>Implementazione in produzione su piccola scala</strong></p>
<p>Utilizza Milvus Standalone quando un singolo server è in grado di soddisfare i tuoi requisiti di carico di lavoro e disponibilità e preferisci operare senza Kubernetes. Stima la memoria necessaria in base alle dimensioni dei vettori, ai campi scalari, alle impostazioni dell’indice e alle repliche, quindi esegui un benchmark della concorrenza delle query e della velocità di scrittura previste. Il numero di vettori da solo non determina la capacità.</p></li>
<li><p><strong>Implementazione in produzione su larga scala</strong></p>
<p>Man mano che la vostra attività cresce rapidamente e la mole di dati supera la capacità di un singolo server, è il momento di prendere in considerazione Milvus Distributed. Potete continuare a utilizzare Milvus Standalone per l’ambiente di sviluppo o di staging per la sua praticità, e gestire il cluster K8s su cui gira Milvus Distributed. Ciò vi consentirà di gestire decine di miliardi di vettori, oltre a offrirvi la flessibilità necessaria per adattare le dimensioni dei nodi al vostro carico di lavoro specifico, ad esempio in casi caratterizzati da un elevato numero di letture e poche scritture, oppure da un elevato numero di scritture e poche letture.</p></li>
<li><p><strong>Ricerca locale su dispositivi edge</strong></p>
<p>Per effettuare ricerche su dati privati o sensibili presenti sui dispositivi edge, è possibile distribuire Milvus Lite direttamente sul dispositivo senza dover ricorrere a un servizio basato su cloud per la ricerca di testi o immagini. Questa soluzione è adatta a casi quali la ricerca di documenti proprietari o il rilevamento di oggetti direttamente sul dispositivo.</p></li>
</ul>
<p>La scelta della modalità di implementazione di Milvus dipende dalla fase e dalla portata del progetto. Milvus offre una soluzione flessibile e potente per diverse esigenze, dalla prototipazione rapida all’implementazione aziendale su larga scala.</p>
<ul>
<li><strong>Milvus Lite</strong> è adatto alla valutazione locale e ai carichi di lavoro che rientrano nelle risorse di una singola applicazione.</li>
<li><strong>Milvus Standalone</strong> fornisce un servizio condiviso quando un singolo server soddisfa i requisiti di capacità e disponibilità misurati.</li>
<li><strong>Milvus Distributed</strong> offre scalabilità a livello di componenti e ridondanza quando è necessario espandersi oltre un singolo server o isolare le risorse di lettura e scrittura.</li>
</ul>
<p>Milvus Standalone e Distributed utilizzano una coda di messaggi, un sistema di archiviazione oggetti e un archivio di metadati. Milvus Lite viene eseguito localmente senza questi servizi separati. Per le dipendenze predefinite delle implementazioni server e le opzioni relative ai servizi esterni, consultare <a href="/docs/it/data-infra-integration-overview.md">la sezione Infrastruttura dati</a>.</p>
<p>Se si desidera un servizio gestito anziché gestire l’infrastruttura server, prendere in considerazione <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Per un’implementazione pratica, procedere con <a href="/docs/it/install_standalone-docker.md">Docker</a> o <a href="/docs/it/install_cluster-milvusoperator.md">Kubernetes</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>Scegli l’opzione di implementazione più adatta al tuo caso d’uso</span>
  
 </span></p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">Confronto delle funzionalità<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
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
    </button></h2><p>La colonna "Lite" descrive Milvus Lite 3.2.2. Verifica <a href="/docs/it/milvus_lite.md#Supported-features-and-limits">i limiti di Milvus Lite</a> prima di fare affidamento su una funzionalità del server in un'applicazione locale.</p>
<table>
<thead>
<tr><th>Funzionalità</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / libreria client</td><td>Python (adattatore PyMilvus locale)</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Tipi di dati</td><td>Vettore denso<br/>Vettore sparso<br/>Booleano<br/>Intero<br/>Virgola mobile<br/>VarChar<br/>Array<br/>JSON</td><td>Vettore denso<br/>Vettore sparso<br/>Vettore binario<br/>Booleano<br/>Intero<br/>Virgola mobile<br/>VarChar<br/>Array<br/>JSON</td><td>Vettore denso<br/>Vettore sparso<br/>Vettore binario<br/>Booleano<br/>Intero<br/>Virgola mobile<br/>VarChar<br/>Array<br/>JSON</td></tr>
<tr><td>Funzionalità di ricerca</td><td>Ricerca vettoriale (ricerca ANN)<br/>Filtraggio dei metadati<br/>Ricerca per intervallo<br/>Query scalare<br/>Recupero di entità tramite chiave primaria<br/>Ricerca ibrida</td><td>Ricerca vettoriale (Ricerca ANN)<br/>Filtraggio dei metadati<br/>Ricerca per intervallo<br/>Query scalare<br/>Recupero delle entità tramite chiave primaria<br/>Ricerca ibrida</td><td>Ricerca vettoriale (Ricerca ANN)<br/>Filtraggio dei metadati<br/>Ricerca per intervallo<br/>Query scalare<br/>Recupero delle entità tramite chiave primaria<br/>Ricerca ibrida</td></tr>
<tr><td>Operazioni CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Gestione avanzata dei dati</td><td>Database<br/>Partizioni<br/>Alias<br/>Nessun controllo degli accessi</td><td>Controllo degli accessi<br/>Partizione<br/>Chiave di partizione</td><td>Controllo degli accessi<br/>Partizione<br/>Chiave di partizione<br/>Raggruppamento delle risorse fisiche</td></tr>
<tr><td>Livelli di coerenza</td><td>Non applicabile: un unico processo locale gestisce tutte le richieste; <code translate="no">consistency_level</code> è accettato ma non ha alcun effetto</td><td><br/>forte Staleness limitata<br/>Sessione<br/>Eventuale</td><td><br/>forte, Staleness limitata,<br/>, Sessione,<br/>, Eventuale</td></tr>
<tr><td>Coda dei messaggi</td><td>N/A</td><td>Woodpecker (integrato)</td><td>Woodpecker (servizio)</td></tr>
</tbody>
</table>
