---
id: install-overview.md
summary: >-
  Milvus è un database vettoriale scalabile e altamente performante. Supporta
  casi d'uso di dimensioni molto diverse, da demo eseguite localmente in Jupyter
  Notebook a cluster Kubernetes su larga scala che gestiscono decine di miliardi
  di vettori. Attualmente esistono tre opzioni di distribuzione di Milvus:
  Milvus Lite, Milvus Standalone e Milvus Distributed.
title: Panoramica delle opzioni di distribuzione di Milvus
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Panoramica delle opzioni di distribuzione di Milvus<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus è un database vettoriale scalabile e altamente performante. Supporta casi d'uso di dimensioni molto diverse, da demo eseguite localmente in Jupyter Notebook a cluster Kubernetes su larga scala che gestiscono decine di miliardi di vettori. Attualmente esistono tre opzioni di distribuzione di Milvus: Milvus Lite, Milvus Standalone e Milvus Distributed.</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> è una libreria Python che può essere importata nelle applicazioni. Essendo una versione leggera di Milvus, è ideale per la prototipazione rapida in Jupyter Notebook o per l'esecuzione su dispositivi intelligenti con risorse limitate. Milvus Lite supporta le stesse API delle altre distribuzioni di Milvus. Il codice lato client che interagisce con Milvus Lite può funzionare anche con le istanze Milvus in altre modalità di distribuzione.</p>
<p>Per integrare Milvus Lite nelle vostre applicazioni, eseguite <code translate="no">pip install pymilvus</code> per installarlo e usate l'istruzione <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> per istanziare un database vettoriale con un file locale che conserva tutti i dati. Per maggiori dettagli, fate riferimento a <a href="https://milvus.io/docs/milvus_lite.md">Eseguire Milvus Lite</a>.</p>
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
    </button></h2><p>Milvus Standalone è un'installazione su server a macchina singola. Tutti i componenti di Milvus Standalone sono racchiusi in un'unica <a href="https://milvus.io/docs/install_standalone-docker.md">immagine Docker</a>, il che rende comoda la distribuzione. Se avete un carico di lavoro di produzione ma preferite non usare Kubernetes, l'esecuzione di Milvus Standalone su una singola macchina con memoria sufficiente è una buona opzione.</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus distribuito<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Distributed può essere distribuito su cluster <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>. Questa distribuzione presenta un'architettura cloud-native, in cui il carico di ingestione e le query di ricerca sono gestite separatamente da nodi isolati, consentendo la ridondanza dei componenti critici. Offre la massima scalabilità e disponibilità, nonché la flessibilità di personalizzare le risorse allocate in ogni componente. Milvus Distributed è la scelta migliore per gli utenti aziendali che gestiscono sistemi di ricerca vettoriale su larga scala in produzione.</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">Scegliere la distribuzione giusta per il proprio caso d'uso<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h2><p>La scelta di una modalità di distribuzione dipende in genere dalla fase di sviluppo dell'applicazione:</p>
<ul>
<li><p><strong>Per una rapida prototipazione</strong></p>
<p>Se desiderate realizzare rapidamente qualcosa come prototipo o a scopo di apprendimento, ad esempio demo di Retrieval Augmented Generation (RAG), chatbot AI, ricerca multimodale, Milvus Lite stesso o una combinazione di Milvus Lite e Milvus Standalone è adatto. È possibile utilizzare Milvus Lite nei notebook per la prototipazione rapida ed esplorare vari approcci, come le diverse strategie di chunking in RAG. Potreste voler distribuire l'applicazione costruita con Milvus Lite in una produzione su piccola scala per servire utenti reali, o per convalidare l'idea su insiemi di dati più grandi, ad esempio più di qualche milione di vettori. Milvus Standalone è appropriato. La logica applicativa di Milvus Lite può ancora essere condivisa, poiché tutte le distribuzioni di Milvus hanno la stessa API lato client. I dati memorizzati in Milvus Lite possono anche essere trasferiti a Milvus Standalone con uno strumento a riga di comando.</p></li>
<li><p><strong>Distribuzione di produzione su piccola scala</strong></p>
<p>Per la produzione in fase iniziale, quando il progetto sta ancora cercando di adattarsi al mercato del prodotto e l'agilità è più importante della scalabilità, Milvus Standalone è la scelta migliore. È in grado di scalare fino a 100 milioni di vettori, se le risorse della macchina sono sufficienti, e richiede molto meno DevOps rispetto al mantenimento di un cluster K8s.</p></li>
<li><p><strong>Distribuzione di produzione su larga scala</strong></p>
<p>Quando la vostra azienda cresce rapidamente e la scala dei dati supera la capacità di un singolo server, è il momento di prendere in considerazione Milvus Distributed. Potete continuare a usare Milvus Standalone per l'ambiente di sviluppo o di staging per la sua convenienza e gestire il cluster K8s che esegue Milvus Distributed. In questo modo si può arrivare a decine di miliardi di vettori, oltre a garantire la flessibilità necessaria per adattare le dimensioni dei nodi ai carichi di lavoro specifici, come ad esempio i casi di alta lettura e scrittura poco frequente o di alta scrittura e bassa lettura.</p></li>
<li><p><strong>Ricerca locale sui dispositivi edge</strong></p>
<p>Per le ricerche private o sensibili sui dispositivi edge, è possibile implementare Milvus Lite sul dispositivo senza affidarsi a un servizio basato su cloud per la ricerca di testo o immagini. Questo è adatto a casi come la ricerca di documenti proprietari o il rilevamento di oggetti sul dispositivo.</p></li>
</ul>
<p>La scelta della modalità di distribuzione di Milvus dipende dalla fase e dalla scala del progetto. Milvus offre una soluzione flessibile e potente per diverse esigenze, dalla prototipazione rapida all'implementazione aziendale su larga scala.</p>
<ul>
<li><strong>Milvus Lite</strong> è consigliato per insiemi di dati più piccoli, fino a pochi milioni di vettori.</li>
<li><strong>Milvus Standalone</strong> è adatto a insiemi di dati di medie dimensioni, fino a 100 milioni di vettori.</li>
<li><strong>Milvus Distributed</strong> è progettato per implementazioni su larga scala, in grado di gestire insiemi di dati da 100 milioni a decine di miliardi di vettori.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" />
   </span> <span class="img-wrapper"> <span>Selezionare l'opzione di distribuzione per il proprio caso d'uso</span> </span></p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">Confronto sulle funzionalità<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
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
<tr><th>Caratteristiche</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus distribuito</th></tr>
</thead>
<tbody>
<tr><td>SDK / Client Lirary</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Tipi di dati</td><td>Vettore denso<br/>Vettore sparso<br/>Vettore binario<br/>Booleano<br/>Intero<br/>Punto mobile<br/>VarChar<br/>Array<br/>JSON</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td><td>Vettore denso<br/>Vettore sparso<br/>Vettore binario<br/>Booleano<br/>Intero<br/>Punto flottante<br/>VarChar<br/>Array<br/>JSON</td></tr>
<tr><td>Capacità di ricerca</td><td>Ricerca vettoriale (ANN Search)<br/>Filtraggio dei metadati<br/>Ricerca per intervallo<br/>Query scalare<br/>Ottenere entità per chiave primaria<br/>Ricerca ibrida</td><td>Ricerca vettoriale (ANN Search)<br/>Filtraggio dei metadati<br/>Ricerca per intervallo<br/>Query scalare<br/>Ottenere entità per chiave primaria<br/>Ricerca ibrida</td><td>Ricerca vettoriale (ricerca ANN)<br/>Filtraggio dei metadati<br/>Ricerca per intervallo<br/>Query scalare<br/>Ottenere entità per chiave primaria<br/>Ricerca ibrida</td></tr>
<tr><td>Operazioni CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Gestione avanzata dei dati</td><td>N/D</td><td>Controllo di accesso<br/>Partizione<br/>Chiave di partizione</td><td>Controllo degli accessi<br/>Partizione<br/>Chiave di partizione<br/>Raggruppamento fisico delle risorse</td></tr>
<tr><td>Livelli di coerenza</td><td>Forte</td><td>Forte<br/>Stallo limitato<br/>Sessione<br/>Eventuale</td><td>Forte<br/>Stallo limitato<br/>Sessione<br/>Eventuale</td></tr>
</tbody>
</table>
