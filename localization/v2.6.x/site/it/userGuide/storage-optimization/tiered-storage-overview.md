---
id: tiered-storage-overview.md
title: Panoramica sull'archiviazione a livelliCompatible with Milvus 2.6.4+
summary: >-
  In Milvus, la modalità tradizionale full-load richiede che ogni QueryNode
  carichi tutti i campi dati e gli indici di un segmento al momento
  dell'inizializzazione, anche quelli a cui non si accede mai. Questo garantisce
  la disponibilità immediata dei dati, ma spesso comporta uno spreco di risorse,
  tra cui un elevato utilizzo della memoria, un'intensa attività su disco e un
  significativo overhead di I/O, soprattutto quando si gestiscono insiemi di
  dati di grandi dimensioni.
beta: Milvus 2.6.4+
---
<h1 id="Tiered-Storage-Overview" class="common-anchor-header">Panoramica sull'archiviazione a livelli<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Tiered-Storage-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus, la modalità tradizionale <em>full-load</em> richiede che ogni QueryNode carichi tutti i campi dati e gli indici di un <a href="/docs/it/glossary.md#Segment">segmento</a> al momento dell'inizializzazione, anche quelli a cui non si accede mai. Questo garantisce la disponibilità immediata dei dati, ma spesso comporta uno spreco di risorse, tra cui un elevato utilizzo della memoria, un'intensa attività su disco e un significativo overhead di I/O, soprattutto quando si gestiscono insiemi di dati di grandi dimensioni.</p>
<p>Lo<em>storage a livelli</em> affronta questa sfida disaccoppiando la cache dei dati dal caricamento dei segmenti. Invece di caricare tutti i dati in una sola volta, Milvus introduce un livello di caching che distingue tra dati caldi (memorizzati nella cache locale) e dati freddi (memorizzati in remoto). Il QueryNode carica inizialmente solo <em>metadati</em> leggeri e preleva o evade dinamicamente i dati del campo su richiesta. Questo riduce significativamente il tempo di caricamento, ottimizza l'utilizzo delle risorse locali e consente ai QueryNode di elaborare set di dati che superano di gran lunga la loro memoria fisica o la capacità del disco.</p>
<p>Considerate la possibilità di attivare l'archiviazione a livelli in scenari quali:</p>
<ul>
<li><p>Collezioni che superano la memoria disponibile o la capacità NVMe di un singolo QueryNode</p></li>
<li><p>Carichi di lavoro analitici o batch in cui la velocità di caricamento è più importante della latenza della prima interrogazione.</p></li>
<li><p>Carichi di lavoro misti che possono tollerare occasionali mancanze della cache per i dati a cui si accede meno frequentemente.</p></li>
</ul>
<div class="alert note">
<ul>
<li><p>I<em>metadati</em> comprendono lo schema, le definizioni degli indici, le mappe dei chunk, il conteggio delle righe e i riferimenti agli oggetti remoti. Questo tipo di dati è piccolo, sempre in cache e mai evaso.</p></li>
<li><p>Per maggiori dettagli su segmenti e chunk, consultare <a href="/docs/it/glossary.md#Segment">Segmento</a>.</p></li>
</ul>
</div>
<h2 id="How-it-works" class="common-anchor-header">Come funziona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Tiered Storage cambia il modo in cui QueryNode gestisce i dati dei segmenti. Invece di memorizzare nella cache tutti i campi e gli indici al momento del caricamento, QueryNode ora carica solo i metadati e utilizza un livello di cache per recuperare ed eliminare i dati dinamicamente.</p>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">Modalità full-load vs. modalità di archiviazione a livelli<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Le modalità full-load e Tiered Storage gestiscono gli stessi dati, ma si differenziano per il <em>momento</em> e il <em>modo in cui</em> QueryNode memorizza nella cache questi componenti.</p>
<ul>
<li><p><strong>Modalità full-load</strong>: Al momento del caricamento, QueryNode memorizza nella cache i dati completi della raccolta, compresi i metadati, i dati dei campi e gli indici, dalla memoria degli oggetti.</p></li>
<li><p><strong>Modalità di archiviazione a livelli</strong>: Al momento del caricamento, QueryNode memorizza nella cache solo i metadati. I dati dei campi vengono estratti su richiesta a granularità di chunk. I file degli indici rimangono remoti finché la prima query non ne ha bisogno; a quel punto l'intero indice per segmento viene recuperato e messo in cache.</p></li>
</ul>
<p>Il diagramma seguente mostra queste differenze.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/full-load-mode-vs-tiered-storage-mode.png" alt="Full Load Mode Vs Tiered Storage Mode" class="doc-image" id="full-load-mode-vs-tiered-storage-mode" />
   </span> <span class="img-wrapper"> <span>Modalità Full Load vs modalità di archiviazione a livelli</span> </span></p>
<h3 id="QueryNode-loading-workflow" class="common-anchor-header">Flusso di lavoro per il caricamento dei QueryNode<button data-href="#QueryNode-loading-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>In modalità Tiered Storage, il flusso di lavoro prevede queste fasi:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/querynode-load-workflow.png" alt="Querynode Load Workflow" class="doc-image" id="querynode-load-workflow" />
   </span> <span class="img-wrapper"> <span>Flusso di lavoro per il caricamento del querynode</span> </span></p>
<h4 id="Phase-1-Lazy-load" class="common-anchor-header">Fase 1: Carico pigro</h4><p>All'inizializzazione, Milvus esegue un caricamento pigro, mettendo in cache solo i metadati a livello di segmento, come le definizioni di schema, le informazioni sugli indici e le mappature dei chunk.</p>
<p>In questa fase non vengono memorizzati nella cache i dati dei campi o i file degli indici. Questo permette alle collezioni di diventare interrogabili quasi immediatamente dopo l'avvio, mantenendo il consumo di memoria e di disco al minimo.</p>
<p>Poiché i dati di campo e i file di indice rimangono nello storage remoto fino al primo accesso, la <em>prima query</em> può presentare una latenza aggiuntiva, poiché i dati necessari devono essere recuperati su richiesta. Per mitigare questo effetto per i campi o gli indici critici, è possibile utilizzare la strategia <a href="/docs/it/tiered-storage-overview.md#Phase-2-Warm-up">Warm Up</a> per precaricarli in modo proattivo prima che il segmento diventi interrogabile.</p>
<p><strong>Configurazione</strong></p>
<p>Si applica automaticamente quando si abilita l'archiviazione a livelli. Non è necessaria alcuna impostazione manuale.</p>
<h4 id="Phase-2-Warm-up" class="common-anchor-header">Fase 2: riscaldamento</h4><p>Per ridurre la latenza di primo impatto introdotta dal <a href="/docs/it/tiered-storage-overview.md#Phase-1-Lazy-load">caricamento pigro</a>, Milvus offre un meccanismo di <em>riscaldamento</em>.</p>
<p>Prima che un segmento diventi interrogabile, Milvus è in grado di recuperare e memorizzare nella cache campi o indici specifici dallo storage degli oggetti, assicurando che la prima query colpisca direttamente i dati memorizzati nella cache invece di attivare il caricamento su richiesta.</p>
<p>Durante il warmup, i campi vengono precaricati a livello di chunk, mentre gli indici vengono precaricati a livello di segmento.</p>
<p><strong>Configurazione</strong></p>
<p>Le impostazioni di Warm Up sono definite nella sezione Tiered Storage di <code translate="no">milvus.yaml</code>. È possibile abilitare o disabilitare il precaricamento per ogni tipo di campo o indice e specificare la strategia preferita. Per le configurazioni dettagliate, vedere <a href="/docs/it/warm-up.md">Warm Up</a>.</p>
<h4 id="Phase-3-Partial-load" class="common-anchor-header">Fase 3: caricamento parziale</h4><p>Una volta iniziate le query o le ricerche, il QueryNode esegue un <em>caricamento parziale</em>, recuperando solo i chunk di dati o i file di indice necessari dallo storage degli oggetti.</p>
<ul>
<li><p><strong>Campi</strong>: Caricati su richiesta a <strong>livello di chunk</strong>. Vengono recuperati solo i chunk di dati che corrispondono alle condizioni della query corrente, riducendo al minimo l'I/O e l'uso della memoria.</p></li>
<li><p><strong>Indici</strong>: Caricati su richiesta a livello di <strong>segmento</strong>. I file degli indici devono essere recuperati come unità complete e non possono essere suddivisi in chunk.</p></li>
</ul>
<p><strong>Configurazione</strong></p>
<p>Il carico parziale viene applicato automaticamente quando si attiva l'archiviazione a livelli. Non è necessaria alcuna impostazione manuale. Per ridurre al minimo la latenza di primo impatto per i dati critici, combinarlo con <a href="/docs/it/warm-up.md">Warm Up</a>.</p>
<h4 id="Phase-4-Eviction" class="common-anchor-header">Fase 4: Evacuazione</h4><p>Per mantenere un uso sano delle risorse, Milvus rilascia automaticamente i dati inutilizzati nella cache quando vengono raggiunte soglie specifiche.</p>
<p>L'eviction segue una politica <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">LRU (Least Recently Used)</a>, assicurando che i dati a cui si accede di rado vengano rimossi per primi, mentre i dati attivi rimangono nella cache.</p>
<p>Lo svuotamento è regolato dai seguenti elementi configurabili:</p>
<ul>
<li><p><strong>Filigrane</strong>: Definizione di soglie di memoria o di disco che attivano e interrompono lo svuotamento.</p></li>
<li><p><strong>TTL della cache</strong>: rimuove i dati stantii presenti nella cache dopo una durata definita di inattività.</p></li>
</ul>
<p><strong>Configurazione</strong></p>
<p>Abilitare e sintonizzare i parametri di eviction in <strong>milvus.yaml</strong>. Per una configurazione dettagliata, vedere <a href="/docs/it/eviction.md">Eviction</a>.</p>
<h2 id="Getting-started" class="common-anchor-header">Come iniziare<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>Milvus 2.6.4+</p></li>
<li><p>QueryNodes con risorse di memoria e disco dedicate</p></li>
<li><p>Backend di archiviazione degli oggetti (S3, MinIO, ecc.)</p></li>
</ul>
<div class="alert warning">
<p>Le risorse dei QueryNode non devono essere condivise con altri carichi di lavoro. Le risorse condivise possono indurre Tiered Storage a valutare erroneamente la capacità disponibile, causando arresti anomali.</p>
</div>
<h3 id="Basic-configuration-template" class="common-anchor-header">Modello di configurazione di base<button data-href="#Basic-configuration-template" class="anchor-icon" translate="no">
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
    </button></h3><p>Modificare il file di configurazione di Milvus (<code translate="no">milvus.yaml</code>) per configurare le impostazioni di Tiered Storage:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Warm Up Configuration</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar field data</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar indexes</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>   <span class="hljs-comment"># Don&#x27;t preload vector field data (large)</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload vector indexes</span>
      
      <span class="hljs-comment"># Eviction Configuration</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      
      <span class="hljs-comment"># Memory Watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>   <span class="hljs-comment"># Stop evicting at 75%</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>  <span class="hljs-comment"># Start evicting at 80%</span>
      
      <span class="hljs-comment"># Disk Watermarks  </span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>
      
      <span class="hljs-comment"># Cache TTL (7 days)</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Next-steps" class="common-anchor-header">Passi successivi<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>Configurare il Warm Up</strong> - Ottimizzare il precaricamento per i modelli di accesso. Vedere <a href="/docs/it/warm-up.md">Warm Up</a>.</p></li>
<li><p><strong>Messa a punto dell'Eviction</strong> - Impostare i watermark e il TTL appropriati per i vincoli delle risorse. Vedere <a href="/docs/it/eviction.md">Eviction</a>.</p></li>
<li><p><strong>Monitorare le prestazioni</strong> - Tracciare le percentuali di accesso alla cache, la frequenza di evasione e i modelli di latenza delle query.</p></li>
<li><p><strong>Iterare la configurazione</strong> - Regolare le impostazioni in base alle caratteristiche del carico di lavoro osservato.</p></li>
</ol>
<h2 id="FAQ" class="common-anchor-header">DOMANDE FREQUENTI<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-I-change-Tiered-Storage-parameters-at-runtime" class="common-anchor-header">È possibile modificare i parametri di Tiered Storage in fase di esecuzione?<button data-href="#Can-I-change-Tiered-Storage-parameters-at-runtime" class="anchor-icon" translate="no">
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
    </button></h3><p>Tutti i parametri devono essere impostati in <code translate="no">milvus.yaml</code> prima di avviare Milvus. Le modifiche richiedono un riavvio per avere effetto.</p>
<h3 id="Does-Tiered-Storage-affect-data-durability" class="common-anchor-header">Il Tiered Storage influisce sulla persistenza dei dati?<button data-href="#Does-Tiered-Storage-affect-data-durability" class="anchor-icon" translate="no">
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
    </button></h3><p>No. La persistenza dei dati è ancora gestita dalla memorizzazione remota degli oggetti. Tiered Storage gestisce solo la cache sui QueryNode.</p>
<h3 id="Will-queries-always-be-faster-with-Tiered-Storage" class="common-anchor-header">Le query saranno sempre più veloci con Tiered Storage?<button data-href="#Will-queries-always-be-faster-with-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Non necessariamente. Il Tiered Storage riduce i tempi di caricamento e l'utilizzo delle risorse, ma le query che toccano dati non memorizzati nella cache (freddi) possono avere una latenza maggiore. Per i carichi di lavoro sensibili alla latenza, si consiglia la modalità full-load.</p>
<h3 id="Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="common-anchor-header">Perché un QueryNode continua a esaurire le risorse anche con il Tiered Storage attivato?<button data-href="#Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="anchor-icon" translate="no">
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
    </button></h3><p>Due cause comuni:</p>
<ul>
<li><p>Il QueryNode è stato configurato con un numero di risorse troppo basso. I watermark sono relativi alle risorse disponibili, quindi un approvvigionamento insufficiente amplifica le valutazioni errate.</p></li>
<li><p>Le risorse del QueryNode sono condivise con altri carichi di lavoro, quindi Tiered Storage non è in grado di valutare correttamente la capacità effettiva disponibile.</p></li>
</ul>
<p>Per risolvere questo problema, si consiglia di allocare risorse dedicate ai QueryNode.</p>
<h3 id="Why-do-some-queries-fail-under-high-concurrency" class="common-anchor-header">Perché alcune query falliscono in caso di elevata concurrency?<button data-href="#Why-do-some-queries-fail-under-high-concurrency" class="anchor-icon" translate="no">
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
    </button></h3><p>Se un numero eccessivo di query colpisce contemporaneamente i dati caldi, i limiti delle risorse dei QueryNode possono essere superati. Alcuni thread possono fallire a causa del timeout della prenotazione delle risorse. Il problema può essere risolto riprovando dopo che il carico è diminuito o allocando più risorse.</p>
<h3 id="Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="common-anchor-header">Perché la latenza di ricerca/query aumenta dopo aver attivato l'archiviazione a livelli?<button data-href="#Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Le possibili cause sono:</p>
<ul>
<li><p>Frequenti interrogazioni di dati freddi, che devono essere recuperati dallo storage.</p></li>
<li><p>Filigrane impostate troppo vicine, che causano frequenti evacuazioni sincrone.</p></li>
</ul>
