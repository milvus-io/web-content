---
id: install-overview.md
summary: >-
  Milvus è un database vettoriale altamente performante e scalabile. Supporta
  casi d'uso di dimensioni molto diverse tra loro, dalle demo eseguite
  localmente in Jupyter Notebook ai cluster Kubernetes su vasta scala che
  gestiscono decine di miliardi di vettori. Attualmente, sono disponibili tre
  opzioni di implementazione di Milvus: Milvus Lite, Milvus Standalone e Milvus
  Distributed.
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
    </button></h1><p>Milvus è un database vettoriale altamente performante e scalabile. Supporta casi d’uso di dimensioni molto diverse, dalle demo eseguite localmente in Jupyter Notebook ai cluster Kubernetes su larga scala che gestiscono decine di miliardi di vettori. Attualmente, sono disponibili tre opzioni di distribuzione di Milvus: Milvus Lite, Milvus Standalone e Milvus Distributed.</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> è una libreria Python che può essere importata nelle vostre applicazioni. Essendo una versione leggera di Milvus, è ideale per la prototipazione rapida in Jupyter Notebook o per l’esecuzione su dispositivi smart con risorse limitate. Milvus Lite supporta le stesse API delle altre distribuzioni di Milvus. Il codice lato client che interagisce con Milvus Lite può funzionare anche con istanze di Milvus in altre modalità di distribuzione.</p>
<p>Per integrare Milvus Lite nelle vostre applicazioni, eseguite il comando ` <code translate="no">pip install pymilvus</code> ` per installarlo e utilizzate l’istruzione ` <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> ` per istanziare un database vettoriale con un file locale in cui vengono salvati tutti i vostri dati. Per ulteriori dettagli, consultate la sezione <a href="https://milvus.io/docs/milvus_lite.md">Eseguire Milvus Lite</a>.</p>
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
    </button></h2><p>Milvus Standalone è una distribuzione server su singola macchina. Tutti i componenti di Milvus Standalone sono raggruppati in un’unica <a href="https://milvus.io/docs/install_standalone-docker.md">immagine Docker</a>, rendendo la distribuzione più semplice. Se si dispone di un carico di lavoro di produzione ma si preferisce non utilizzare Kubernetes, l’esecuzione di Milvus Standalone su una singola macchina con memoria sufficiente rappresenta una valida opzione. Per impostazione predefinita, Milvus Standalone esegue <strong>Woodpecker</strong> (integrato) come coda di messaggi, quindi non è necessario gestire un servizio di messaggistica separato.</p>
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
    </button></h2><p>Milvus Distributed può essere implementato su cluster <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>. Questa implementazione presenta un’architettura cloud-native, in cui il carico di acquisizione e le query di ricerca vengono gestiti separatamente da nodi isolati, consentendo la ridondanza dei componenti critici. Offre la massima scalabilità e disponibilità, oltre alla flessibilità nella personalizzazione delle risorse allocate a ciascun componente. Milvus Distributed è la scelta ideale per gli utenti aziendali che gestiscono sistemi di ricerca vettoriale su larga scala in produzione. Per impostazione predefinita, Milvus Distributed utilizza <strong>Woodpecker</strong> come coda di messaggi, distribuito come servizio dedicato insieme a Milvus.</p>
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
<li><p><strong>Per la prototipazione rapida</strong></p>
<p>Se desideri realizzare rapidamente un prototipo o per scopi didattici, come demo di Retrieval Augmented Generation (RAG), chatbot basati sull’IA, ricerca multimodale, è indicato l’uso di Milvus Lite da solo o in combinazione con Milvus Standalone. È possibile utilizzare Milvus Lite nei notebook per la prototipazione rapida ed esplorare vari approcci, come diverse strategie di chunking nella RAG. Potreste voler distribuire l’applicazione realizzata con Milvus Lite in un ambiente di produzione su piccola scala per servire utenti reali, oppure convalidare l’idea su set di dati più grandi, ad esempio più di qualche milione di vettori. In questo caso, Milvus Standalone è la scelta appropriata. La logica applicativa di Milvus Lite può comunque essere condivisa, poiché tutte le implementazioni di Milvus dispongono della stessa API lato client. I dati memorizzati in Milvus Lite possono inoltre essere trasferiti a Milvus Standalone tramite uno strumento da riga di comando.</p></li>
<li><p><strong>Implementazione in produzione su piccola scala</strong></p>
<p>Per la fase iniziale di produzione, quando il progetto è ancora alla ricerca dell’adeguamento del prodotto al mercato e l’agilità è più importante della scalabilità, Milvus Standalone rappresenta la scelta migliore. È comunque in grado di scalare fino a 100 milioni di vettori, a condizione che siano disponibili risorse hardware sufficienti, richiedendo al contempo un impegno DevOps molto inferiore rispetto alla gestione di un cluster K8s.</p></li>
<li><p><strong>Implementazione in produzione su larga scala</strong></p>
<p>Man mano che la vostra attività cresce rapidamente e la mole di dati supera la capacità di un singolo server, è il momento di prendere in considerazione Milvus Distributed. Potete continuare a utilizzare Milvus Standalone per l’ambiente di sviluppo o di staging per la sua praticità, e gestire il cluster K8s su cui gira Milvus Distributed. Ciò vi consentirà di gestire decine di miliardi di vettori, oltre a offrirvi la flessibilità necessaria per adattare le dimensioni dei nodi al vostro carico di lavoro specifico, ad esempio in casi caratterizzati da un elevato numero di letture e poche scritture o da un elevato numero di scritture e poche letture.</p></li>
<li><p><strong>Ricerca locale su dispositivi edge</strong></p>
<p>Per effettuare ricerche su dati privati o sensibili presenti sui dispositivi edge, è possibile distribuire Milvus Lite direttamente sul dispositivo senza ricorrere a un servizio basato su cloud per la ricerca di testo o immagini. Questa soluzione è adatta a casi quali la ricerca di documenti proprietari o il rilevamento di oggetti direttamente sul dispositivo.</p></li>
</ul>
<p>La scelta della modalità di implementazione di Milvus dipende dalla fase e dalla portata del progetto. Milvus offre una soluzione flessibile e potente per diverse esigenze, dalla prototipazione rapida all’implementazione aziendale su larga scala.</p>
<ul>
<li><strong>Milvus Lite</strong> è consigliato per set di dati più piccoli, fino a pochi milioni di vettori.</li>
<li><strong>Milvus Standalone</strong> è adatto a set di dati di medie dimensioni, scalabili fino a 100 milioni di vettori.</li>
<li><strong>Milvus Distributed</strong> è progettato per implementazioni su larga scala ed è in grado di gestire set di dati da 100 milioni fino a decine di miliardi di vettori.</li>
</ul>
<p>Indipendentemente dalla modalità di implementazione, ogni istanza di Milvus si basa su una coda di messaggi, un sistema di archiviazione oggetti e un archivio di metadati — per impostazione predefinita <strong>Woodpecker</strong>, <strong>MinIO</strong> ed <strong>etcd</strong>. Per saperne di più su queste dipendenze, ottimizzarle o collegare servizi esterni, consulta <a href="/docs/it/data-infra-integration-overview.md">la sezione Infrastruttura dati</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>Seleziona l’opzione di implementazione più adatta al tuo caso d’uso</span>
  
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
    </button></h2><table>
<thead>
<tr><th>Funzionalità</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / Libreria client</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Tipi di dati</td><td>Vettore denso<br/>Vettore spars<br/>Vettore binario<br/>Booleano<br/>Intero<br/>Virgola mobile<br/>VarChar<br/>Array<br/>JSON</td><td>Vettore denso<br/>Vettore spars<br/>Vettore binario<br/>Booleano<br/>Intero<br/>Virgola mobile<br/>VarChar<br/>Array<br/>JSON</td><td>Vettore denso<br/>Vettore sparso<br/>Vettore binario<br/>Booleano<br/>Intero<br/>Virgola mobile<br/>VarChar<br/>Array<br/>JSON</td></tr>
<tr><td>Funzionalità di ricerca</td><td>Ricerca vettoriale (ricerca ANN)<br/>Filtraggio dei metadati<br/>Ricerca per intervallo<br/>Query scalare<br/>Recupero delle entità tramite chiave primaria<br/>Ricerca ibrida</td><td>Ricerca vettoriale (Ricerca ANN)<br/>Filtraggio dei metadati<br/>Ricerca per intervallo<br/>Query scalare<br/>Recupero delle entità tramite chiave primaria<br/>Ricerca ibrida</td><td>Ricerca vettoriale (Ricerca ANN)<br/>Filtraggio dei metadati<br/>Ricerca per intervallo<br/>Query scalare<br/>Recupero delle entità tramite chiave primaria<br/>Ricerca ibrida</td></tr>
<tr><td>Operazioni CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Gestione avanzata dei dati</td><td>N/A</td><td>Controllo degli accessi<br/>Partizione<br/>Chiave di partizione</td><td><br/>e del controllo degli accessi Partizione<br/>Chiave di partizione<br/>Raggruppamento delle risorse fisiche</td></tr>
<tr><td>Livelli di coerenza</td><td>Forte</td><td>Forte<br/>Staleness limitata<br/>Sessione<br/>Eventuale</td><td>Forte<br/>Staleness limitata<br/>Sessione<br/>Eventuale</td></tr>
<tr><td>Coda dei messaggi</td><td>N/A</td><td>Woodpecker (integrato)</td><td>Woodpecker (servizio)</td></tr>
</tbody>
</table>
