---
id: milvus-webui.md
summary: >-
  Milvus Web UI è uno strumento di gestione grafica per Milvus. Migliora
  l'osservabilità del sistema con un'interfaccia semplice e intuitiva. È
  possibile
title: Milvus WebUI
---
<h1 id="Milvus-WebUI" class="common-anchor-header">Milvus WebUI<button data-href="#Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Web UI è uno strumento di gestione grafica per Milvus. Migliora l'osservabilità del sistema con un'interfaccia semplice e intuitiva. Con Milvus Web UI è possibile osservare le statistiche e le metriche dei componenti e delle dipendenze di Milvus, controllare i dettagli del database e della raccolta ed elencare le configurazioni dettagliate di Milvus.</p>
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
    </button></h2><p>Milvus Web UI si differenzia da Birdwatcher e Attu per essere uno strumento integrato che offre un'osservazione globale del sistema con un'interfaccia semplice e intuitiva.</p>
<p>La tabella seguente confronta le caratteristiche di Milvus Web UI e Birdwatcher/Attu:</p>
<table>
<thead>
<tr><th>Caratteristiche</th><th>Milvus Web UI</th><th>Birdwatcher</th><th>Attu</th></tr>
</thead>
<tbody>
<tr><td>Forma operativa</td><td>GUI</td><td>CLI</td><td>GUI</td></tr>
<tr><td>Utenti target</td><td>Manutentori, sviluppatori</td><td>Manutentori</td><td>Sviluppatori</td></tr>
<tr><td>Installazione</td><td>Integrato</td><td>Strumento autonomo</td><td>Strumento autonomo</td></tr>
<tr><td>Dipendenze</td><td>Milvus</td><td>Milvus / etcd</td><td>Milvus</td></tr>
<tr><td>Funzionalità principali</td><td>Ambiente di runtime, dettagli di database/collezione, segmenti, canali, attività e richieste di query lente</td><td>Ispezione dei metadati ed esecuzione dell'API Milvus</td><td>Gestione del database e attività operative</td></tr>
<tr><td>Disponibile da</td><td>v2.5.0</td><td>v2.0.0</td><td>v0.1.8</td></tr>
</tbody>
</table>
<p>A partire dalla v2.5.0, è possibile accedere a Milvus Web UI utilizzando il seguente URL su un'istanza Milvus in esecuzione:</p>
<pre><code translate="no">http://<span class="hljs-variable">${MILVUS_PROXY_IP}</span>:9091/webui
<button class="copy-code-btn"></button></code></pre>
<h2 id="Features" class="common-anchor-header">Caratteristiche<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UI offre le seguenti funzioni:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-webui-overview.png" alt="Milvus Web UI overview" class="doc-image" id="milvus-web-ui-overview" />
   </span> <span class="img-wrapper"> <span>Panoramica dell'interfaccia web Milvus</span> </span></p>
<ul>
<li><p><a href="#Home">Casa</a></p>
<p>Si possono trovare informazioni sull'istanza Milvus in esecuzione, sui suoi componenti, sui client collegati e sulle dipendenze.</p></li>
<li><p><a href="#Collections">Collezioni</a></p>
<p>È possibile visualizzare l'elenco dei database e delle collezioni attualmente presenti in Milvus e controllarne i dettagli.</p></li>
<li><p><a href="#Query">Query</a></p>
<p>Si possono visualizzare le statistiche raccolte dei nodi di query e dei coordinatori di query in termini di segmenti, canali, repliche e gruppi di risorse.</p></li>
<li><p><a href="#Data">Dati</a></p>
<p>È possibile visualizzare le statistiche raccolte dai nodi di dati in termini di segmenti e canali.</p></li>
<li><p><a href="#Tasks">Attività</a></p>
<p>È possibile visualizzare l'elenco delle attività in esecuzione in Milvus, comprese le attività dello scheduler Querycoord, le attività di compattazione, le attività di creazione di indici, le attività di importazione e le attività di sincronizzazione dei dati.</p></li>
<li><p><a href="#Slow-requests">Richieste lente</a></p>
<p>È possibile visualizzare l'elenco delle richieste lente in Milvus, compresi il tipo di richiesta, la durata della richiesta e i parametri della richiesta.</p></li>
<li><p><a href="#Configurations">Configurazioni</a></p>
<p>È possibile visualizzare l'elenco delle configurazioni di Milvus e i loro valori.</p></li>
<li><p><a href="#Tools">Strumenti</a></p>
<p>È possibile accedere ai due strumenti integrati, pprof e Milvus data visualzation tool, dall'interfaccia web.</p></li>
</ul>
<h2 id="Home" class="common-anchor-header">Home<button data-href="#Home" class="anchor-icon" translate="no">
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
    </button></h2><p>Nella pagina Home si trovano le seguenti informazioni:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-home.png" alt="Milvus Web UI Home" class="doc-image" id="milvus-web-ui-home" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI Home</span> </span></p>
<ul>
<li><p><strong>Informazioni sul sistema</strong>: Visualizza le informazioni sul sistema, comprese quelle relative alla modalità di distribuzione, all'immagine utilizzata nella distribuzione e alle informazioni correlate.</p></li>
<li><p><strong>Informazioni sui componenti</strong>: Visualizza lo stato e le metriche dei componenti di Milvus, compresi lo stato e le metriche dei nodi di interrogazione, dei nodi di dati, dei nodi indice, dei coordinatori e dei proxy.</p></li>
<li><p><strong>Client collegati</strong>: Visualizza i client connessi e le loro informazioni, tra cui il tipo e la versione dell'SDK, il nome utente e la cronologia degli accessi.</p></li>
<li><p><strong>Dipendenze del sistema</strong>: Visualizza lo stato e le metriche delle dipendenze di Milvus, compreso lo stato e le metriche del meta store, della coda di messaggi e dell'archiviazione degli oggetti.</p></li>
</ul>
<h2 id="Collections" class="common-anchor-header">Collezioni<button data-href="#Collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Nella pagina Collezioni è possibile visualizzare l'elenco dei database e delle collezioni attualmente presenti in Milvus e controllarne i dettagli.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-collections.png" alt="Milvus Web UI Collections" class="doc-image" id="milvus-web-ui-collections" />
   </span> <span class="img-wrapper"> <span>Collezioni dell'interfaccia web di Milvus</span> </span></p>
<ul>
<li><p><strong>Database</strong>: Visualizza l'elenco dei database attualmente presenti in Milvus e i loro dettagli.</p></li>
<li><p><strong>Raccolta</strong>: Visualizza l'elenco delle collezioni di ciascun database e i relativi dettagli.</p>
<p>È possibile fare clic su una raccolta per visualizzarne i dettagli, compreso il numero di campi, partizioni, indici e altre informazioni.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-collection-details.png" alt="Milvus Web UI Collection Details" class="doc-image" id="milvus-web-ui-collection-details" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI Dettagli della collezione</span> </span></p></li>
</ul>
<h2 id="Query" class="common-anchor-header">Interrogazione<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-query.png" alt="Milvus Web UI Query Page" class="doc-image" id="milvus-web-ui-query-page" />
   </span> <span class="img-wrapper"> <span>Pagina di interrogazione dell'interfaccia web Milvus</span> </span></p>
<ul>
<li><p><strong>Segmenti</strong>: Visualizza l'elenco dei segmenti e i loro dettagli, tra cui l'ID del segmento, la raccolta corrispondente, lo stato, la dimensione, ecc.</p></li>
<li><p><strong>Canali</strong>: Visualizza l'elenco dei canali e i loro dettagli, tra cui il nome del canale, le raccolte corrispondenti, ecc.</p></li>
<li><p><strong>Repliche</strong>: Visualizza l'elenco delle repliche e i loro dettagli, tra cui l'ID della replica, la raccolta corrispondente, ecc.</p></li>
<li><p><strong>Gruppi di risorse</strong>: Visualizza l'elenco dei gruppi di risorse e i loro dettagli, tra cui il nome del gruppo di risorse, il numero di nodi di query nel gruppo e le sue configurazioni, ecc.</p></li>
</ul>
<h2 id="Data" class="common-anchor-header">Dati<button data-href="#Data" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-data.png" alt="Milvus Web UI Data Page" class="doc-image" id="milvus-web-ui-data-page" />
   </span> <span class="img-wrapper"> <span>Pagina dati dell'interfaccia web Milvus</span> </span></p>
<ul>
<li><p><strong>Segmenti</strong>: Visualizza l'elenco dei segmenti dei nodi/coordinatori di dati e i loro dettagli, tra cui l'ID del segmento, la raccolta corrispondente, lo stato, la dimensione, ecc.</p></li>
<li><p><strong>Canali</strong>: Visualizza l'elenco dei canali dei nodi/coordinatori di dati e i loro dettagli, compreso il nome del canale, le raccolte corrispondenti, ecc.</p></li>
</ul>
<h2 id="Tasks" class="common-anchor-header">Attività<button data-href="#Tasks" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-tasks.png" alt="Milvus Web UI Tasks Page" class="doc-image" id="milvus-web-ui-tasks-page" />
   </span> <span class="img-wrapper"> <span>Pagina Attività dell'interfaccia web Milvus</span> </span></p>
<ul>
<li><p><strong>Attività</strong>: Visualizza l'elenco delle attività in esecuzione in Milvus, compreso il tipo di attività, lo stato e le azioni.</p>
<ul>
<li><p><strong>Attività QueryCoord</strong>: Visualizza tutte le attività dello scheduler QueryCoord, compresi i bilanciatori, i controllori di indici/segmenti/canali/leader negli ultimi 15 minuti.</p></li>
<li><p><strong>Attività di compattazione</strong>: Visualizza tutte le attività di compattazione dei coordinatori dei dati negli ultimi 15 minuti.</p></li>
<li><p><strong>Attività di costruzione dell'indice</strong>: Visualizza tutte le attività di costruzione dell'indice dei coordinatori dei dati negli ultimi 30 minuti.</p></li>
<li><p><strong>Attività di importazione</strong>: Visualizza tutte le attività di importazione dei coordinatori dei dati negli ultimi 30 minuti.</p></li>
<li><p><strong>Attività di sincronizzazione dei dati</strong>: Visualizza tutte le attività di sincronizzazione dei dati dei nodi dati negli ultimi 15 minuti.</p></li>
</ul></li>
</ul>
<h2 id="Slow-requests" class="common-anchor-header">Richieste lente<button data-href="#Slow-requests" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-slow-requests.png" alt="Milvus Web UI Slow Requests Page" class="doc-image" id="milvus-web-ui-slow-requests-page" />
   </span> <span class="img-wrapper"> <span>Pagina Richieste lente dell'interfaccia web Milvus</span> </span></p>
<ul>
<li><strong>Richieste lente</strong>: Una richiesta lenta è una ricerca o una query che ha una latenza superiore al valore di <code translate="no">proxy.slowQuerySpanInSeconds</code> specificato nella configurazione. L'elenco delle richieste lente visualizza tutte le richieste lente degli ultimi 15 minuti.</li>
</ul>
<h2 id="Configurations" class="common-anchor-header">Configurazioni<button data-href="#Configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-configurations.png" alt="Milvus Web UI Configurations Page" class="doc-image" id="milvus-web-ui-configurations-page" />
   </span> <span class="img-wrapper"> <span>Pagina Configurazioni dell'interfaccia web di Milvus</span> </span></p>
<ul>
<li><strong>Configurazioni</strong>: Visualizza l'elenco delle configurazioni del runtime Milvus e i loro valori.</li>
</ul>
<h2 id="Tools" class="common-anchor-header">Strumenti<button data-href="#Tools" class="anchor-icon" translate="no">
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
<li><p><strong>pprof</strong>: accesso allo strumento pprof per il profiling e il debug di Milvus.</p></li>
<li><p><strong>Strumento di visualizzazione dei dati Milvus</strong>: Accede allo strumento di visualizzazione dei dati di Milvus per visualizzare i dati in Milvus.</p></li>
</ul>
