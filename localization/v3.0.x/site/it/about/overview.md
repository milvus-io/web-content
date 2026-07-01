---
id: overview.md
title: Cos'è Milvus
related_key: Milvus Overview
summary: >-
  Milvus è un database vettoriale ad alte prestazioni e altamente scalabile che
  funziona in modo efficiente in una vasta gamma di ambienti, dai computer
  portatili ai sistemi distribuiti su larga scala. È disponibile sia come
  software open source che come servizio cloud.
---
<h1 id="What-is-Milvus" class="common-anchor-header">Che cos’è il Milvus?<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><span>Il Milvus <span style="display: inline-block; vertical-align: middle;">
<audio id="milvus-audio" style="display: none;">
<source src="https://en-audio.howtopronounce.com/15783806805e142d8844912.mp3" type="audio/mp3" />
</audio>
<span style="
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('https://milvus.io/docs/v2.6.x/assets/hearing.png') no-repeat center center;
    background-size: contain;
    cursor: pointer;
    margin-left: 4px;
  " onclick="document.getElementById('milvus-audio').play()"></span>
</span></span> è un rapace appartenente al genere Milvus della famiglia degli Accipitridi, noto per la sua velocità in volo, la vista acuta e la notevole capacità di adattamento.</p>
<style>
  audio::-webkit-media-controls {
    display: none !important;
  }
</style>
<p>Zilliz ha scelto il nome Milvus per il suo database vettoriale open source ad alte prestazioni e altamente scalabile, in grado di funzionare in modo efficiente in un'ampia gamma di ambienti, dai laptop ai sistemi distribuiti su larga scala. È disponibile sia come software open source che come servizio cloud.</p>
<p>Sviluppato da Zilliz e presto donato alla LF AI &amp; Data Foundation, parte della Linux Foundation, Milvus è diventato uno dei principali progetti al mondo nel campo dei database vettoriali open source. È distribuito sotto licenza Apache 2.0 e la maggior parte dei collaboratori è costituita da esperti della comunità dell’High-Performance Computing (HPC), specializzati nella realizzazione di sistemi su larga scala e nell’ottimizzazione di codice sensibile all’hardware. Tra i principali collaboratori figurano professionisti provenienti da Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba e Microsoft.</p>
<p>È interessante notare che ogni progetto open source di Zilliz prende il nome da un uccello, una convenzione di denominazione che simboleggia la libertà, la lungimiranza e l’evoluzione agile della tecnologia.</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">Dati non strutturati, embedding e Milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>I dati non strutturati, come testo, immagini e audio, presentano formati variabili e racchiudono una ricca semantica sottostante, il che ne rende complessa l’analisi. Per gestire questa complessità, si utilizzano gli embedding per convertire i dati non strutturati in vettori numerici che ne catturano le caratteristiche essenziali. Questi vettori vengono poi memorizzati in un database vettoriale, consentendo ricerche e analisi veloci e scalabili.</p>
<p>Milvus offre solide funzionalità di modellazione dei dati, consentendovi di organizzare i vostri dati non strutturati o multimodali in raccolte strutturate. Supporta un’ampia gamma di tipi di dati per la modellazione di diversi attributi, inclusi i comuni tipi numerici e di caratteri, vari tipi di vettori, array, insiemi e JSON, risparmiandovi lo sforzo di gestire più sistemi di database.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" /> 
   <span>Dati non strutturati, embedding e Milvus</span>
  
 </span></p>
<p>Milvus offre tre modalità di implementazione, che coprono un’ampia gamma di scale di dati: dalla prototipazione locale in Jupyter Notebook ai grandi cluster Kubernetes che gestiscono decine di miliardi di vettori:</p>
<ul>
<li>Milvus Lite è una libreria Python che può essere facilmente integrata nelle vostre applicazioni. Essendo una versione leggera di Milvus, è ideale per la prototipazione rapida in Jupyter Notebook o per l’esecuzione su dispositivi edge con risorse limitate. <a href="/docs/it/milvus_lite.md">Per saperne di più</a>.</li>
<li>Milvus Standalone è una distribuzione server su singola macchina, con tutti i componenti raggruppati in un’unica immagine Docker per una distribuzione agevole. <a href="/docs/it/install_standalone-docker.md">Scopri di più</a>.</li>
<li>Milvus Distributed può essere implementato su cluster Kubernetes e presenta un’architettura cloud-native progettata per scenari su scala di miliardi o anche più grandi. Questa architettura garantisce la ridondanza dei componenti critici. <a href="/docs/it/install_cluster-milvusoperator.md">Scopri di più</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">Cosa rende Milvus così veloce?<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus è stato progettato fin dall’inizio per essere un sistema di database vettoriale altamente efficiente. Nella maggior parte dei casi, Milvus supera le prestazioni di altri database vettoriali di 2-5 volte (vedi i risultati di VectorDBBench). Queste elevate prestazioni sono il risultato di diverse decisioni chiave di progettazione:</p>
<p><strong>Ottimizzazione in base all’hardware</strong>: per adattare Milvus a vari ambienti hardware, ne abbiamo ottimizzato le prestazioni specificamente per numerose architetture e piattaforme hardware, tra cui AVX512, SIMD, GPU e SSD NVMe.</p>
<p><strong>Algoritmi di ricerca avanzati</strong>: Milvus supporta un’ampia gamma di algoritmi di indicizzazione e ricerca sia in memoria che su disco, tra cui IVF, HNSW, DiskANN e altri, tutti profondamente ottimizzati. Rispetto a implementazioni diffuse come FAISS e HNSWLib, Milvus offre prestazioni superiori del 30%-70%.</p>
<p><strong>Motore di ricerca in C++</strong>: oltre l’80% delle prestazioni di un database vettoriale è determinato dal suo motore di ricerca. Milvus utilizza il C++ per questo componente critico grazie alle elevate prestazioni del linguaggio, all’ottimizzazione di basso livello e alla gestione efficiente delle risorse. Ma soprattutto, Milvus integra numerose ottimizzazioni del codice sensibili all’hardware, che vanno dalla vettorizzazione a livello di assembly alla parallelizzazione multithread e alla pianificazione, per sfruttare appieno le capacità dell’hardware.</p>
<p><strong>Orientato alle colonne</strong>: Milvus è un sistema di database vettoriale orientato alle colonne. I vantaggi principali derivano dai modelli di accesso ai dati. Quando si eseguono query, un database orientato alle colonne legge solo i campi specifici coinvolti nella query, anziché intere righe, il che riduce notevolmente la quantità di dati a cui si accede. Inoltre, le operazioni sui dati basati su colonne possono essere facilmente vettorializzate, consentendo di applicare le operazioni all’intera colonna in una sola volta, migliorando ulteriormente le prestazioni.</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">Cosa rende Milvus così scalabile<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>Nel 2022, Milvus supportava vettori su scala di miliardi e, nel 2023, è passato a decine di miliardi con stabilità costante, alimentando scenari su larga scala per oltre 300 grandi aziende, tra cui Salesforce, PayPal, Shopee, Airbnb, eBay, NVIDIA, IBM, AT&amp;T, LINE, ROBLOX, Inflection, ecc.</p>
<p>L’architettura di sistema cloud-native e altamente disaccoppiata di Milvus garantisce che il sistema possa espandersi continuamente man mano che i dati crescono:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" /> 
   <span>Architettura di sistema altamente disaccoppiata di Milvus</span>
  
 </span></p>
<p>Milvus è di per sé completamente stateless, quindi può essere facilmente scalato con l’aiuto di Kubernetes o dei cloud pubblici. Inoltre, i componenti di Milvus sono ben disaccoppiati: le tre attività più critiche — ricerca, inserimento dei dati e indicizzazione/compattazione — sono progettate come processi facilmente parallelizzabili, con la logica complessa separata. Ciò garantisce che il nodo di query, il nodo dati e il nodo indice corrispondenti possano scalare sia in verticale che in orizzontale in modo indipendente, ottimizzando le prestazioni e l’efficienza in termini di costi.</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">Tipi di ricerche supportate da Milvus<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supporta vari tipi di funzioni di ricerca per soddisfare le esigenze di diversi casi d’uso:</p>
<ul>
<li><a href="/docs/it/single-vector-search.md#Basic-search">Ricerca ANN</a>: individua i primi K vettori più vicini al vettore di query.</li>
<li><a href="/docs/it/single-vector-search.md#Filtered-search">Ricerca con filtro</a>: esegue una ricerca ANN in base a condizioni di filtro specificate.</li>
<li><a href="/docs/it/single-vector-search.md#Range-search">Ricerca per intervallo</a>: individua i vettori entro un raggio specificato dal vettore di query.</li>
<li><a href="/docs/it/multi-vector-search.md">Ricerca ibrida</a>: esegue una ricerca ANN basata su più campi vettoriali.</li>
<li><a href="/docs/it/full-text-search.md">Ricerca full-text</a>: ricerca full-text basata sull’algoritmo BM25.</li>
<li><a href="/docs/it/weighted-ranker.md">Riorganizzazione dei risultati</a>: regola l’ordine dei risultati di ricerca in base a criteri aggiuntivi o a un algoritmo secondario, perfezionando i risultati iniziali della ricerca ANN.</li>
<li><a href="/docs/it/get-and-scalar-query.md#Get-Entities-by-ID">Fetch</a>: recupera i dati in base alle loro chiavi primarie.</li>
<li><a href="/docs/it/get-and-scalar-query.md#Use-Basic-Operators">Query</a>: recupera i dati utilizzando espressioni specifiche.</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">Set completo di funzionalità<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>Oltre alle principali funzionalità di ricerca menzionate sopra, Milvus offre anche una serie di funzionalità implementate attorno alle ricerche ANN, in modo da poter sfruttare appieno le sue capacità.</p>
<h3 id="API-and-SDK" class="common-anchor-header">API e SDK<button data-href="#API-and-SDK" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/api-reference/restful/v2.6.x/About.md">API RESTful</a> (ufficiale)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.6.x/About.md">PyMilvus</a> (SDK Python) (ufficiale)</li>
<li><a href="https://milvus.io/api-reference/go/v2.6.x/About.md">SDK Go</a> (ufficiale)</li>
<li><a href="https://milvus.io/api-reference/java/v2.6.x/About.md">SDK Java</a> (ufficiale)</li>
<li>SDK per<a href="https://milvus.io/api-reference/node/v2.6.x/About.md">Node.js</a> (JavaScript) (ufficiale)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (fornito da Microsoft)</li>
<li><a href="https://milvus.io/api-reference/cpp/v2.6.x/About.md">SDK C++</a> (ufficiale)</li>
<li>SDK Rust (in fase di sviluppo)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">Tipi di dati avanzati<button data-href="#Advanced-Data-Types" class="anchor-icon" translate="no">
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
    </button></h3><p>Oltre ai tipi di dati primitivi, Milvus supporta vari tipi di dati avanzati e le rispettive metriche di distanza applicabili.</p>
<ul>
<li><a href="/docs/it/sparse_vector.md">Vettori sparsi</a></li>
<li><a href="/docs/it/index-vector-fields.md">Vettori binari</a></li>
<li><a href="/docs/it/use-json-fields.md">Supporto JSON</a></li>
<li><a href="/docs/it/array_data_type.md">Supporto per gli array</a></li>
<li>Testo (in fase di sviluppo)</li>
<li>Geolocalizzazione (in fase di sviluppo)</li>
</ul>
<h3 id="Why-Milvus" class="common-anchor-header">Perché Milvus?<button data-href="#Why-Milvus" class="anchor-icon" translate="no">
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
<li><p><strong>Prestazioni elevate su larga scala e alta disponibilità</strong></p>
<p>Milvus presenta <a href="/docs/it/architecture_overview.md">un'architettura distribuita</a> che separa <a href="/docs/it/data_processing.md#Data-query">l'elaborazione</a> <a href="/docs/it/data_processing.md#Data-insertion">dall'archiviazione</a>. Milvus è in grado di scalare orizzontalmente e adattarsi a diversi modelli di traffico, raggiungendo prestazioni ottimali aumentando in modo indipendente i nodi di query per carichi di lavoro con un'elevata attività di lettura e i nodi di dati per carichi di lavoro con un'elevata attività di scrittura. I microservizi stateless su K8s consentono <a href="/docs/it/coordinator_ha.md#Coordinator-HA">un rapido ripristino</a> in caso di guasto, garantendo un'elevata disponibilità. Il supporto delle <a href="/docs/it/replica.md">repliche</a> migliora ulteriormente la tolleranza ai guasti e il throughput caricando segmenti di dati su più nodi di query. Consulta <a href="https://zilliz.com/vector-database-benchmark-tool">il benchmark</a> per un confronto delle prestazioni.</p></li>
<li><p><strong>Supporto per vari tipi di indici vettoriali e accelerazione hardware</strong></p>
<p>Milvus separa il sistema dal motore di ricerca vettoriale principale, consentendogli di supportare tutti i principali tipi di indici vettoriali ottimizzati per diversi scenari, tra cui HNSW, IVF, FLAT (brute-force), SCANN e DiskANN, con varianti <a href="/docs/it/index-explained.md">basate sulla quantizzazione</a> e <a href="/docs/it/mmap.md">mmap</a>. Milvus ottimizza la ricerca vettoriale per funzionalità avanzate quali <a href="/docs/it/boolean.md">il filtraggio dei metadati</a> e <a href="/docs/it/range-search.md">la ricerca per intervallo</a>. Inoltre, Milvus implementa l’accelerazione hardware per migliorare le prestazioni della ricerca vettoriale e supporta l’indicizzazione tramite GPU, come <a href="/docs/it/gpu-cagra.md">CAGRA</a> di NVIDIA.</p></li>
<li><p><strong>Multi-tenancy flessibile e archiviazione "hot/cold"</strong></p>
<p>Milvus supporta <a href="/docs/it/multi_tenancy.md#Multi-tenancy-strategies">il multi-tenancy</a> tramite isolamento a livello di database, collezione, partizione o chiave di partizione. Le strategie flessibili consentono a un singolo cluster di gestire da centinaia a milioni di tenant, garantendo al contempo prestazioni di ricerca ottimizzate e un controllo degli accessi flessibile. Milvus migliora l’efficienza in termini di costi grazie all’archiviazione hot/cold. I dati “hot”, a cui si accede frequentemente, possono essere memorizzati in memoria o su SSD per ottenere prestazioni migliori, mentre i dati “cold”, a cui si accede meno spesso, vengono conservati su supporti di archiviazione più lenti ma economici. Questo meccanismo può ridurre significativamente i costi, mantenendo al contempo prestazioni elevate per le attività critiche.</p></li>
<li><p><strong>Vettori sparsi per la ricerca full-text e la ricerca ibrida</strong></p>
<p>Oltre alla ricerca semantica tramite vettori densi, Milvus supporta nativamente anche <a href="/docs/it/full-text-search.md">la ricerca full-text</a> con BM25, nonché l’embedding sparso appreso come SPLADE e BGE-M3. Gli utenti possono memorizzare vettori sparsi e vettori densi nella stessa collezione e definire funzioni per riorganizzare i risultati provenienti da più richieste di ricerca. Vedi esempi di <a href="/docs/it/full_text_search_with_milvus.md">ricerca ibrida con ricerca semantica + ricerca full-text</a>.</p></li>
<li><p><strong>Sicurezza dei dati e controllo degli accessi granulare</strong></p>
<p>Milvus garantisce la sicurezza dei dati implementando <a href="/docs/it/authenticate.md">l’autenticazione obbligatoria degli utenti</a>, <a href="/docs/it/tls.md">la crittografia TLS</a> e <a href="/docs/it/rbac.md">il controllo degli accessi basato sui ruoli (RBAC)</a>. L’autenticazione degli utenti assicura che solo gli utenti autorizzati con credenziali valide possano accedere al database, mentre la crittografia TLS protegge tutte le comunicazioni all’interno della rete. Inoltre, l’RBAC consente un controllo degli accessi granulare, assegnando permessi specifici agli utenti in base ai loro ruoli. Queste caratteristiche rendono Milvus una scelta solida e sicura per le applicazioni aziendali, proteggendo i dati sensibili da accessi non autorizzati e potenziali violazioni.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">Integrazioni con l’IA<button data-href="#AI-Integrations" class="anchor-icon" translate="no">
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
<li><p>Integrazioni dei modelli di embedding
I modelli di embedding convertono i dati non strutturati nella loro rappresentazione numerica in uno spazio di dati ad alta dimensionalità, in modo da poterli archiviare in Milvus. Attualmente, PyMilvus, l’SDK Python, integra diversi modelli di embedding che consentono di preparare rapidamente i dati sotto forma di embedding vettoriali. Per ulteriori dettagli, consultare <a href="/docs/it/embeddings.md">la Panoramica sull’embedding</a>.</p></li>
<li><p>Integrazioni dei modelli di reranking
Nel campo del recupero delle informazioni e dell’IA generativa, un reranker è uno strumento essenziale che ottimizza l’ordine dei risultati delle ricerche iniziali. PyMilvus integra anche diversi modelli di reranking per ottimizzare l’ordine dei risultati restituiti dalle ricerche iniziali. Per ulteriori dettagli, consultare <a href="/docs/it/rerankers-overview.md">la Panoramica sui reranker</a>.</p></li>
<li><p>Integrazioni con LangChain e altri strumenti di IA
Nell’era della GenAI, strumenti come LangChain stanno riscuotendo grande attenzione da parte degli sviluppatori di applicazioni. In qualità di componente fondamentale, Milvus funge solitamente da archivio vettoriale in tali strumenti. Per scoprire come integrare Milvus nei tuoi strumenti di IA preferiti, consulta le nostre <a href="/docs/it/integrate_with_openai.md">sezioni Integrazioni</a> e <a href="/docs/it/build-rag-with-milvus.md">Tutorial</a>.</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">Strumenti ed ecosistema<button data-href="#Tools-and-Ecosystem" class="anchor-icon" translate="no">
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
<li><p>Attu
Attu è un’interfaccia grafica intuitiva e completa che ti aiuta a gestire Milvus e i dati in esso memorizzati. Per ulteriori dettagli, consulta il repository <a href="https://github.com/zilliztech/attu">di Attu</a>.</p></li>
<li><p>Birdwatcher
Birdwatcher è uno strumento di debug per Milvus. Utilizzandolo per connettersi a etcd, è possibile verificare lo stato del proprio sistema Milvus o configurarlo al volo. Per ulteriori dettagli, consulta <a href="/docs/it/birdwatcher_overview.md">BirdWatcher</a>.</p></li>
<li><p>Integrazioni con Prometheus e Grafana
Prometheus è un toolkit open source per il monitoraggio e gli avvisi di sistema per Kubernetes. Grafana è uno stack di visualizzazione open source in grado di connettersi a tutte le fonti di dati. È possibile utilizzare Prometheus e Grafana come fornitori di servizi di monitoraggio per monitorare visivamente le prestazioni di Milvus distribuito. Per ulteriori dettagli, consultare la sezione <a href="/docs/it/monitor.md">"Implementazione dei servizi di monitoraggio"</a>.</p></li>
<li><p>Milvus Backup
Milvus Backup è uno strumento che consente agli utenti di eseguire il backup e il ripristino dei dati di Milvus. Fornisce sia un’interfaccia CLI che un’API per adattarsi a diversi scenari applicativi. Per ulteriori dettagli, consultare <a href="/docs/it/milvus_backup_overview.md">Milvus Backup</a>.</p></li>
<li><p>Milvus Capture Data Change (CDC)
Milvus-CDC è in grado di acquisire e sincronizzare i dati incrementali nelle istanze di Milvus e garantisce l’affidabilità dei dati aziendali trasferendoli senza soluzione di continuità tra le istanze di origine e di destinazione, consentendo un facile backup incrementale e il ripristino di emergenza. Per ulteriori dettagli, consultare la sezione " <a href="/docs/it/milvus-cdc-overview.md">Milvus CDC"</a>.</p></li>
<li><p>Connettori Milvus
Milvus ha previsto una serie di connettori per consentire l’integrazione senza soluzione di continuità di Milvus con strumenti di terze parti, come Apache Spark. Attualmente, è possibile utilizzare il nostro connettore Spark per trasferire i dati di Milvus ad Apache Spark per l’elaborazione tramite machine learning. Per ulteriori dettagli, consultare la documentazione relativa <a href="/docs/it/integrate_with_spark.md">al connettore Spark-Milvus</a>.</p></li>
<li><p>Servizi di trasmissione vettoriale (VTS)
Milvus fornisce una serie di strumenti che consentono di trasferire i dati tra un’istanza Milvus e una serie di fonti di dati, tra cui cluster Zilliz, Elasticsearch, Postgres (PgVector) e un’altra istanza Milvus. Per ulteriori dettagli, consultare <a href="https://github.com/zilliztech/vts">VTS</a>.</p></li>
</ul>
