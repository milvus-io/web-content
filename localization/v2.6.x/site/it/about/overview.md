---
id: overview.md
title: Che cos'è Milvus
related_key: Milvus Overview
summary: >-
  Milvus è un database vettoriale ad alte prestazioni e altamente scalabile che
  funziona in modo efficiente in un'ampia gamma di ambienti, dal computer
  portatile ai sistemi distribuiti su larga scala. È disponibile sia come
  software open-source che come servizio cloud.
---
<h1 id="What-is-Milvus" class="common-anchor-header">Che cos'è il Milvus?<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
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
</span></span> è un rapace del genere Milvus della famiglia dei falchi Accipaitridae, famoso per la velocità di volo, la vista acuta e la notevole adattabilità.</p>
<style>
  audio::-webkit-media-controls { display: none !important; }</style>
<p>Zilliz adotta il nome Milvus per il suo database vettoriale open-source ad alte prestazioni e altamente scalabile, che funziona in modo efficiente in un'ampia gamma di ambienti, dal laptop ai sistemi distribuiti su larga scala. È disponibile sia come software open-source che come servizio cloud.</p>
<p>Sviluppato da Zilliz e presto donato alla LF AI &amp; Data Foundation nell'ambito della Linux Foundation, Milvus è diventato uno dei principali progetti di database vettoriali open-source al mondo. È distribuito con licenza Apache 2.0 e la maggior parte dei collaboratori è costituita da esperti della comunità del calcolo ad alte prestazioni (HPC), specializzati nella costruzione di sistemi su larga scala e nell'ottimizzazione del codice consapevole dell'hardware. I collaboratori principali includono professionisti di Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba e Microsoft.</p>
<p>È interessante notare che ogni progetto open-source di Zilliz prende il nome da un uccello, una convenzione di denominazione che simboleggia la libertà, la lungimiranza e l'agile evoluzione della tecnologia.</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">Dati non strutturati, embeddings e Milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>I dati non strutturati, come il testo, le immagini e l'audio, hanno formati diversi e una ricca semantica di fondo, che li rende difficili da analizzare. Per gestire questa complessità, si utilizzano gli embeddings per convertire i dati non strutturati in vettori numerici che ne catturano le caratteristiche essenziali. Questi vettori vengono poi memorizzati in un database vettoriale, consentendo ricerche e analisi veloci e scalabili.</p>
<p>Milvus offre solide capacità di modellazione dei dati, consentendo di organizzare i dati non strutturati o multimodali in raccolte strutturate. Supporta un'ampia gamma di tipi di dati per la modellazione di diversi attributi, tra cui i comuni tipi numerici e di caratteri, vari tipi di vettori, array, set e JSON, risparmiandovi lo sforzo di mantenere più sistemi di database.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" />
   </span> <span class="img-wrapper"> <span>Dati non strutturati, embeddings e Milvus</span> </span></p>
<p>Milvus offre tre modalità di distribuzione, che coprono un'ampia gamma di scale di dati: dalla prototipazione locale in Jupyter Notebook ai cluster Kubernetes massicci che gestiscono decine di miliardi di vettori:</p>
<ul>
<li>Milvus Lite è una libreria Python che può essere facilmente integrata nelle applicazioni. Essendo una versione leggera di Milvus, è ideale per la prototipazione rapida in Jupyter Notebook o per l'esecuzione su dispositivi edge con risorse limitate. <a href="/docs/it/milvus_lite.md">Per saperne di più</a>.</li>
<li>Milvus Standalone è una versione server per una sola macchina, con tutti i componenti riuniti in un'unica immagine Docker per una comoda distribuzione. <a href="/docs/it/install_standalone-docker.md">Per saperne di più</a>.</li>
<li>Milvus Distributed può essere distribuito su cluster Kubernetes, con un'architettura cloud-native progettata per scenari di dimensioni miliardarie o addirittura superiori. Questa architettura garantisce la ridondanza dei componenti critici. <a href="/docs/it/install_cluster-milvusoperator.md">Per saperne di più</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">Che cosa rende Milvus così veloce?<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus è stato progettato fin dal primo giorno per essere un sistema di database vettoriale altamente efficiente. Nella maggior parte dei casi, Milvus supera gli altri database vettoriali di 2-5 volte (si vedano i risultati di VectorDBBench). Queste prestazioni elevate sono il risultato di diverse scelte progettuali fondamentali:</p>
<p><strong>Ottimizzazione consapevole dell'hardware</strong>: Per adattarsi a Milvus in vari ambienti hardware, abbiamo ottimizzato le sue prestazioni in modo specifico per molte architetture e piattaforme hardware, tra cui AVX512, SIMD, GPU e SSD NVMe.</p>
<p><strong>Algoritmi di ricerca avanzati</strong>: Milvus supporta un'ampia gamma di algoritmi di indicizzazione/ricerca in-memory e su disco, tra cui IVF, HNSW, DiskANN e altri, tutti profondamente ottimizzati. Rispetto a implementazioni popolari come FAISS e HNSWLib, Milvus offre prestazioni migliori del 30%-70%.</p>
<p><strong>Motore di ricerca in C++</strong>: Oltre l'80% delle prestazioni di un database vettoriale è determinato dal suo motore di ricerca. Milvus utilizza il C++ per questo componente critico, grazie alle elevate prestazioni, all'ottimizzazione a basso livello e alla gestione efficiente delle risorse di questo linguaggio. Soprattutto, Milvus integra numerose ottimizzazioni del codice consapevoli dell'hardware, che vanno dalla vettorizzazione a livello di assembly alla parallelizzazione e allo scheduling multi-thread, per sfruttare appieno le capacità dell'hardware.</p>
<p><strong>Orientato alle colonne</strong>: Milvus è un sistema di database vettoriale orientato alle colonne. I vantaggi principali derivano dai modelli di accesso ai dati. Quando si eseguono le query, un database orientato alle colonne legge solo i campi specifici coinvolti nella query, anziché intere righe, riducendo così notevolmente la quantità di dati a cui si accede. Inoltre, le operazioni sui dati basati sulle colonne possono essere facilmente vettorializzate, consentendo di applicare le operazioni alle intere colonne in una sola volta, migliorando ulteriormente le prestazioni.</p>
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
    </button></h2><p>Nel 2022 Milvus ha supportato vettori su scala miliardaria e nel 2023 è arrivato a decine di miliardi con una stabilità costante, alimentando scenari su larga scala per oltre 300 grandi aziende, tra cui Salesforce, PayPal, Shopee, Airbnb, eBay, NVIDIA, IBM, AT&amp;T, LINE, ROBLOX, Inflection, ecc.</p>
<p>L'architettura di sistema cloud-native e altamente disaccoppiata di Milvus garantisce che il sistema possa espandersi continuamente con la crescita dei dati:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_architecture_2_6.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" />
   </span> <span class="img-wrapper"> <span>Architettura di sistema altamente disaccoppiata di Milvus</span> </span></p>
<p>Milvus è completamente stateless, quindi può essere facilmente scalato con l'aiuto di Kubernetes o di cloud pubblici. Inoltre, i componenti di Milvus sono ben disaccoppiati, con i tre compiti più critici - ricerca, inserimento dei dati e indicizzazione/compattazione - progettati come processi facilmente parallelizzabili, con logica complessa separata. Ciò garantisce che il nodo di query, il nodo di dati e il nodo di indicizzazione corrispondenti possano scalare in modo indipendente, ottimizzando le prestazioni e l'efficienza dei costi.</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">Tipi di ricerca supportati da Milvus<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supporta vari tipi di funzioni di ricerca per soddisfare le esigenze dei diversi casi d'uso:</p>
<ul>
<li><a href="/docs/it/single-vector-search.md#Basic-search">Ricerca RNA</a>: Trova i primi K vettori più vicini al vettore interrogato.</li>
<li><a href="/docs/it/single-vector-search.md#Filtered-search">Ricerca per filtro</a>: Esegue la ricerca RNA in base a condizioni di filtraggio specificate.</li>
<li><a href="/docs/it/single-vector-search.md#Range-search">Ricerca per intervallo</a>: Trova i vettori entro un raggio specifico dal vettore di interrogazione.</li>
<li><a href="/docs/it/multi-vector-search.md">Ricerca ibrida</a>: Esegue una ricerca ANN basata su più campi vettoriali.</li>
<li><a href="/docs/it/full-text-search.md">Ricerca a testo completo</a>: Ricerca full text basata su BM25.</li>
<li><a href="/docs/it/weighted-ranker.md">Reranking</a>: Regola l'ordine dei risultati della ricerca in base a criteri aggiuntivi o a un algoritmo secondario, affinando i risultati iniziali della ricerca ANN.</li>
<li><a href="/docs/it/get-and-scalar-query.md#Get-Entities-by-ID">Recupera</a>: Recupera i dati in base alle loro chiavi primarie.</li>
<li><a href="/docs/it/get-and-scalar-query.md#Use-Basic-Operators">Interrogazione</a>: Recupera i dati utilizzando espressioni specifiche.</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">Set di funzioni completo<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>Oltre alle funzioni di ricerca chiave menzionate in precedenza, Milvus offre anche una serie di funzioni implementate intorno alle ricerche ANN, in modo da poterne utilizzare appieno le capacità.</p>
<h3 id="API-and-SDK" class="common-anchor-header">API e SDK</h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.4.x/About.md">API RESTful</a> (ufficiale)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">PyMilvus</a> (SDK Python) (ufficiale)</li>
<li><a href="https://milvus.io/api-reference/go/v2.4.x/About.md">SDK Go</a> (ufficiale)</li>
<li><a href="https://milvus.io/api-reference/java/v2.4.x/About.md">SDK Java</a> (ufficiale)</li>
<li><a href="https://milvus.io/api-reference/node/v2.4.x/About.md">Node.js</a> (JavaScript) SDK (ufficiale)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (contribuito da Microsoft)</li>
<li>SDK C++ (in fase di sviluppo)</li>
<li>SDK Rust (in fase di sviluppo)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">Tipi di dati avanzati</h3><p>Oltre ai tipi di dati primitivi, Milvus supporta diversi tipi di dati avanzati e le rispettive metriche di distanza applicabili.</p>
<ul>
<li><a href="/docs/it/sparse_vector.md">Vettori sparsi</a></li>
<li><a href="/docs/it/index-vector-fields.md">Vettori binari</a></li>
<li><a href="/docs/it/use-json-fields.md">Supporto JSON</a></li>
<li><a href="/docs/it/array_data_type.md">Supporto per le matrici</a></li>
<li>Testo (in fase di sviluppo)</li>
<li>Geolocalizzazione (in fase di sviluppo)</li>
</ul>
<h3 id="Why-Milvus" class="common-anchor-header">Perché Milvus?</h3><ul>
<li><p><strong>Prestazioni elevate su scala e alta disponibilità</strong></p>
<p>Milvus è dotato di un'<a href="/docs/it/architecture_overview.md">architettura distribuita</a> che separa <a href="/docs/it/data_processing.md#Data-query">calcolo</a> e <a href="/docs/it/data_processing.md#Data-insertion">archiviazione</a>. Milvus è in grado di scalare orizzontalmente e di adattarsi a diversi modelli di traffico, ottenendo prestazioni ottimali aumentando in modo indipendente i nodi di interrogazione per i carichi di lavoro pesanti in lettura e i nodi di dati per i carichi di lavoro pesanti in scrittura. I microservizi stateless su K8s consentono un <a href="/docs/it/coordinator_ha.md#Coordinator-HA">rapido recupero</a> dai guasti, garantendo un'elevata disponibilità. Il supporto per le <a href="/docs/it/replica.md">repliche</a> migliora ulteriormente la tolleranza ai guasti e il throughput caricando i segmenti di dati su più nodi di interrogazione. Vedere il <a href="https://zilliz.com/vector-database-benchmark-tool">benchmark</a> per il confronto delle prestazioni.</p></li>
<li><p><strong>Supporto per vari tipi di indici vettoriali e accelerazione hardware</strong></p>
<p>Milvus separa il sistema e il motore di ricerca vettoriale di base, consentendo di supportare tutti i principali tipi di indici vettoriali ottimizzati per diversi scenari, tra cui HNSW, IVF, FLAT (forza bruta), SCANN e DiskANN, con variazioni <a href="/docs/it/index-explained.md">basate sulla quantizzazione</a> e <a href="/docs/it/mmap.md">mmap</a>. Milvus ottimizza la ricerca vettoriale per funzioni avanzate come il <a href="/docs/it/boolean.md">filtraggio dei metadati</a> e la <a href="/docs/it/range-search.md">ricerca per intervallo</a>. Inoltre, Milvus implementa l'accelerazione hardware per migliorare le prestazioni della ricerca vettoriale e supporta l'indicizzazione su GPU, come <a href="/docs/it/gpu-cagra.md">CAGRA</a> di NVIDIA.</p></li>
<li><p><strong>Multi-tenancy flessibile e archiviazione calda/fredda</strong></p>
<p>Milvus supporta la <a href="/docs/it/multi_tenancy.md#Multi-tenancy-strategies">multi-tenancy</a> attraverso l'isolamento a livello di database, collezione, partizione o chiave di partizione. Le strategie flessibili consentono a un singolo cluster di gestire da centinaia a milioni di tenant, garantendo inoltre prestazioni di ricerca ottimizzate e un controllo flessibile degli accessi. Milvus migliora l'efficienza dei costi grazie allo storage caldo/freddo. I dati caldi a cui si accede di frequente possono essere archiviati in memoria o su SSD per ottenere migliori prestazioni, mentre i dati freddi a cui si accede di meno vengono conservati su uno storage più lento ed economico. Questo meccanismo può ridurre significativamente i costi mantenendo alte le prestazioni per le attività critiche.</p></li>
<li><p><strong>Vettori sparsi per la ricerca full text e la ricerca ibrida</strong></p>
<p>Oltre alla ricerca semantica tramite vettori densi, Milvus supporta in modo nativo anche la <a href="/docs/it/full-text-search.md">ricerca full text</a> con BM25 e l'embedding sparse apprese come SPLADE e BGE-M3. Gli utenti possono memorizzare vettori sparsi e vettori densi nella stessa collezione e definire funzioni per classificare i risultati di più richieste di ricerca. Vedere esempi di <a href="/docs/it/full_text_search_with_milvus.md">ricerca ibrida con ricerca semantica + ricerca full text</a>.</p></li>
<li><p><strong>Sicurezza dei dati e controllo degli accessi a grana fine</strong></p>
<p>Milvus garantisce la sicurezza dei dati implementando l'<a href="/docs/it/authenticate.md">autenticazione obbligatoria degli utenti</a>, la <a href="/docs/it/tls.md">crittografia TLS</a> e il <a href="/docs/it/rbac.md">controllo degli accessi basato sui ruoli (RBAC)</a>. L'autenticazione degli utenti garantisce che solo gli utenti autorizzati con credenziali valide possano accedere al database, mentre la crittografia TLS protegge tutte le comunicazioni all'interno della rete. Inoltre, il RBAC consente un controllo degli accessi a grana fine, assegnando agli utenti autorizzazioni specifiche in base ai loro ruoli. Queste caratteristiche rendono Milvus una scelta robusta e sicura per le applicazioni aziendali, proteggendo i dati sensibili da accessi non autorizzati e potenziali violazioni.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">Integrazioni AI</h3><ul>
<li><p>Integrazioni di modelli di embedding I modelli di embedding convertono i dati non strutturati nella loro rappresentazione numerica in uno spazio dati ad alta dimensionalità, in modo da poterli memorizzare in Milvus. Attualmente, PyMilvus, l'SDK di Python, integra diversi modelli di embedding in modo da poter preparare rapidamente i dati in embedding vettoriali. Per maggiori dettagli, vedere <a href="/docs/it/embeddings.md">Panoramica sull'embedding</a>.</p></li>
<li><p>Integrazioni di modelli di reranking Nel campo del reperimento delle informazioni e dell'IA generativa, un reranker è uno strumento essenziale che ottimizza l'ordine dei risultati delle ricerche iniziali. PyMilvus integra anche diversi modelli di reranking per ottimizzare l'ordine dei risultati restituiti dalle ricerche iniziali. Per maggiori dettagli, consultare la sezione <a href="/docs/it/rerankers-overview.md">Panoramica sui reranker</a>.</p></li>
<li><p>LangChain e altre integrazioni di strumenti di intelligenza artificiale Nell'era della GenAI, gli strumenti come LangChain sono oggetto di grande attenzione da parte degli sviluppatori di applicazioni. Come componente principale, Milvus funge solitamente da archivio di vettori in questi strumenti. Per sapere come integrare Milvus nei vostri strumenti di IA preferiti, consultate le nostre <a href="/docs/it/integrate_with_openai.md">integrazioni</a> e i nostri <a href="/docs/it/build-rag-with-milvus.md">tutorial</a>.</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">Strumenti ed ecosistema</h3><ul>
<li><p>Attu Attu è un'interfaccia grafica intuitiva che aiuta a gestire Milvus e i dati che memorizza. Per maggiori dettagli, consultare il repository di <a href="https://github.com/zilliztech/attu">Attu</a>.</p></li>
<li><p>Birdwatcher Birdwatcher è uno strumento di debug per Milvus. Utilizzandolo per connettersi a etcd, è possibile controllare lo stato del sistema Milvus o configurarlo al volo. Per maggiori dettagli, consultare <a href="/docs/it/birdwatcher_overview.md">BirdWatcher</a>.</p></li>
<li><p>Integrazioni con Promethus e Grafana Prometheus è un toolkit open-source per il monitoraggio dei sistemi e gli avvisi per Kubernetes. Grafana è uno stack di visualizzazione open-source in grado di connettersi con tutte le fonti di dati. È possibile utilizzare Promethus e Grafana come fornitori di servizi di monitoraggio per controllare visivamente le prestazioni di Milvus distribuito. Per i dettagli, vedere <a href="/docs/it/monitor.md">Distribuzione dei servizi di monitoraggio</a>.</p></li>
<li><p>Milvus Backup Milvus Backup è uno strumento che consente agli utenti di eseguire il backup e il ripristino dei dati di Milvus. Fornisce sia CLI che API per adattarsi a diversi scenari applicativi. Per i dettagli, consultare <a href="/docs/it/milvus_backup_overview.md">Milvus Backup</a>.</p></li>
<li><p>Milvus Capture Data Change (CDC) Milvus-CDC è in grado di catturare e sincronizzare i dati incrementali nelle istanze Milvus e garantisce l'affidabilità dei dati aziendali trasferendoli senza soluzione di continuità tra le istanze di origine e di destinazione, consentendo un facile backup incrementale e il disaster recovery. Per maggiori dettagli, consultare <a href="/docs/it/milvus-cdc-overview.md">Milvus CDC</a>.</p></li>
<li><p>Connettori Milvus Milvus ha previsto una serie di connettori per integrare Milvus con strumenti di terze parti, come Apache Spark. Attualmente è possibile utilizzare il nostro connettore Spark per inviare i dati di Milvus ad Apache Spark per l'elaborazione dell'apprendimento automatico. Per maggiori dettagli, consultare <a href="/docs/it/integrate_with_spark.md">Spark-Milvus Connector</a>.</p></li>
<li><p>Vector Transmission Services (VTS) Milvus fornisce una serie di strumenti per trasferire i dati tra un'istanza Milvus e una serie di fonti di dati, tra cui cluster Zilliz, Elasticsearch, Postgres (PgVector) e un'altra istanza Milvus. Per i dettagli, consultare <a href="https://github.com/zilliztech/vts">VTS</a>.</p></li>
</ul>
