---
id: roadmap.md
title: Roadmap di Milvus
related_key: Milvus roadmap
summary: >-
  Milvus è un database vettoriale open source progettato per supportare le
  applicazioni di intelligenza artificiale. Ecco la nostra roadmap, che guida il
  nostro percorso di sviluppo.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Roadmap di Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 Verso il database multimodale e il data lake di nuova generazione<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Roadmap del prodotto Milvus</strong></p>
<p>Benvenuti nella roadmap di Milvus!</p>
<p>Stiamo accompagnando Milvus verso una nuova era: quella del database multimodale di nuova generazione, che spazia <strong>dai dati strutturati a quelli non strutturati</strong>, <strong>dal recupero in tempo reale all’analisi offline</strong>, <strong>dalle prestazioni su un singolo cluster a un’architettura di data lake globale</strong>.</p>
<p>Questa roadmap delinea gli obiettivi principali per <strong>Milvus v2.6 (in fase di sviluppo)</strong>, <strong>Milvus v3.0 (prevista per la fine del 2026)</strong> e <strong>Milvus v3.1 (sviluppo a lungo termine)</strong>, insieme al piano di evoluzione per <strong>Vector Lake (data lake / Loon)</strong>.</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6 (in fase di sviluppo)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Tempistica: metà 2025 – fine 2025</strong></p>
<p>Obiettivi: <strong>aggiornamento del modello di dati</strong>, <strong>rifattorizzazione dell’architettura di streaming</strong>, <strong>sviluppo di funzionalità di tiering hot/cold</strong> e lancio del <strong>prototipo di Vector Lake (v0.1)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Punti salienti<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header">🔹 <strong>Aggiornamento del modello di dati</strong></h4><ul>
<li><p>Introduzione di un tipo di dati unificato <strong>Tensor / StructList</strong> per supportare strutture di embedding multivettoriali, garantendo la compatibilità con <em>ColBERT</em>, <em>CoLQwen</em>, <em>video</em> e <em>vettori multimodali</em>.</p></li>
<li><p>Aggiunta del supporto <strong>per i dati geografici</strong>, inclusi punti, regioni e indicizzazione spaziale (basata su <em>libspatial</em>), per ampliare i casi d’uso nei servizi LBS e GIS.</p></li>
<li><p>Supporto per il tipo di dati " <strong>Timestamp with Timezone</strong> ".</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header">🔹 <strong>Rifattorizzazione dell’architettura StreamNode</strong></h4><ul>
<li><p>Riscrittura della pipeline di acquisizione in streaming per ottimizzare le scritture incrementali e il calcolo in tempo reale.</p></li>
<li><p>Miglioramento significativo delle prestazioni e della stabilità in termini di concorrenza, gettando le basi per un'elaborazione unificata in tempo reale e offline.</p></li>
<li><p>Introduzione di un nuovo motore di coda dei messaggi: <strong>Woodpecker</strong>.</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header">🔹 <strong>Tiering caldo/freddo e architettura di archiviazione (StorageV2)</strong></h4><ul>
<li><p>Supportare due formati di archiviazione: <strong>Parquet</strong> e <strong>Vortex</strong>, migliorando la concorrenza e l’efficienza della memoria.</p></li>
<li><p>Implementare l’archiviazione a livelli con separazione automatica dei dati "hot" e "cold" e pianificazione intelligente.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹 <strong>Prototipo di Vector Lake (v0.1)</strong></h4><ul>
<li><p>Integrazione con <strong>Spark</strong> / <strong>DuckDB</strong> / <strong>DataFusion</strong> tramite FFI, che consente l'evoluzione dello schema offline e le query KNN.</p></li>
<li><p>Fornisce la visualizzazione multimodale dei dati e una demo ETL di Spark, definendo l’architettura di base del data lake.</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Early-2026" class="common-anchor-header">🌠 Milvus v3.0 (previsto per l’inizio del 2026)<button data-href="#🌠-Milvus-v30-Targeted-for-Early-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Tempistica: fine 2025 – inizio 2026</strong></p>
<p>Obiettivo: miglioramenti completi <strong>all’esperienza di ricerca</strong>, <strong>alla flessibilità dello schema</strong> e <strong>al supporto dei dati non strutturati</strong>, insieme al rilascio di <strong>Vector Lake (v0.2)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Punti salienti<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header">🔹 <strong>Rinnovamento dell’esperienza di ricerca</strong></h4><ul>
<li><p>Introduzione della ricerca per somiglianza <strong>“More Like This” (MLT)</strong> con supporto per ricerche basate su posizione o esempi negativi.</p></li>
<li><p>Aggiunta di funzionalità di ricerca semantica quali <strong>l’evidenziazione</strong> e <strong>il potenziamento</strong>.</p></li>
<li><p>Supporto per <strong>dizionari personalizzati</strong> e <strong>tabelle di sinonimi</strong>, che consentono la definizione di regole lessicali e semantiche a livello di Analyzer.</p></li>
<li><p>Introduzione di funzionalità <strong>di aggregazione</strong> per le query.</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹 <strong>Multi-tenancy e gestione delle risorse</strong></h4><ul>
<li><p>Abilitare la cancellazione multi-tenant, le statistiche e il tiering "hot/cold".</p></li>
<li><p>Migliorare l'isolamento delle risorse e le strategie di pianificazione per supportare milioni di tabelle in un singolo cluster.</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header">🔹 <strong>Miglioramenti allo schema e alla chiave primaria</strong></h4><ul>
<li><p>Implementare <strong>la deduplicazione globale delle chiavi primarie (Global PK Dedup)</strong> per garantire la coerenza e l’unicità dei dati.</p></li>
<li><p>Supportare <strong>una gestione flessibile dello schema</strong> (aggiunta/eliminazione di colonne, riempimento del backup).</p></li>
<li><p>Consentire <strong>valori NULL</strong> nei campi vettoriali.</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header">🔹 <strong>Tipi di dati non strutturati ampliati (BLOB / Testo)</strong></h4><ul>
<li><p>Introdurre il <strong>tipo BLOB</strong>, che fornisce archiviazione e riferimento nativi per dati binari quali file, immagini e video.</p></li>
<li><p>Introdurre <strong>il tipo TEXT</strong>, che offre funzionalità avanzate di ricerca full-text e basata sui contenuti.</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header">🔹 <strong>Funzionalità di livello aziendale</strong></h4><ul>
<li><p>Supporta <strong>il backup e il ripristino basati su snapshot</strong>.</p></li>
<li><p>Fornisce <strong>tracciamento end-to-end</strong> e <strong>registrazione di audit</strong>.</p></li>
<li><p>Implementazione <strong>dell’alta disponibilità (HA) in</strong> modalità <strong>Active-Standby</strong> nelle distribuzioni multi-cluster.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹 <strong>Vector Lake (v0.2)</strong></h4><ul>
<li><p>Supporta <strong>l'archiviazione TEXT / BLOB</strong> e <strong>la gestione degli snapshot multiversione</strong>.</p></li>
<li><p>Integra Spark per attività di indicizzazione offline, clustering, deduplicazione e riduzione della dimensionalità.</p></li>
<li><p>Fornire <strong>demo di benchmark offline e di query a freddo di ChatPDF</strong>.</p></li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">🪐 Milvus v3.1 (Visione a lungo termine)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Tempistica: metà 2026</strong></p>
<p>Obiettivi: <strong>Funzioni definite dall’utente (UDF)</strong>, <strong>integrazione del calcolo distribuito</strong>, <strong>ottimizzazione delle query scalari</strong>, <strong>sharding dinamico</strong> e rilascio ufficiale di <strong>Vector Lake (v1.0)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Punti salienti<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹 <strong>UDF ed ecosistema di calcolo distribuito</strong></h4><ul>
<li><p>Supporto <strong>delle funzioni definite dall’utente (UDF)</strong>, che consentono agli sviluppatori di integrare logiche personalizzate nei flussi di lavoro di recupero e calcolo.</p></li>
<li><p>Profonda integrazione con <strong>Ray Dataset / Daft</strong> per l’esecuzione distribuita delle UDF e l’elaborazione di dati multimodali.</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header">🔹 <strong>Query scalari ed evoluzione del formato locale</strong></h4><ul>
<li><p>Ottimizzazione delle prestazioni di filtraggio e aggregazione per i campi scalari.</p></li>
<li><p>Migliora la valutazione delle espressioni e l'esecuzione accelerata dagli indici.</p></li>
<li><p>Supporto <strong>degli aggiornamenti in loco</strong> per i formati di file locali.</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹 <strong>Funzionalità di ricerca avanzate</strong></h4><ul>
<li><p>Aggiungere le seguenti funzionalità: query <strong>RankBy</strong>, <strong>OrderBy</strong>, <strong>Facet</strong> e <strong>di corrispondenza approssimativa</strong>.</p></li>
<li><p>Miglioramento del recupero del testo con supporto per:</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹 <strong>Sharding dinamico e scalabilità</strong></h4><ul>
<li><p>Abilitare <strong>la suddivisione automatica dei shard</strong> e <strong>il bilanciamento del carico</strong> per una scalabilità senza soluzione di continuità.</p></li>
<li><p>Migliora <strong>la creazione dell’indice globale</strong> e garantisci <strong>prestazioni di ricerca distribuite</strong>.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹 <strong>Vector Lake V1.0</strong></h4><ul>
<li><p>Integrazione profonda con <strong>Ray / Daft / PyTorch</strong> per supportare le UDF distribuite e i casi d'uso di Context Engineering.</p></li>
<li><p>Fornisci <strong>demo RAG (Retrieval-Augmented Generation)</strong> <strong>e importazione da tabelle Iceberg</strong>.</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Costruire insieme il futuro di Milvus<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus è un progetto open source guidato da una comunità globale di sviluppatori.</p>
<p>Invitiamo calorosamente tutti i membri della comunità a contribuire a plasmare il database multimodale di nuova generazione:</p>
<ul>
<li><p>💬 <strong>Condividi il tuo feedback</strong>: proponi nuove funzionalità o idee di ottimizzazione</p></li>
<li><p>🐛 <strong>Segnalate i problemi</strong>: segnalate i bug tramite GitHub Issues</p></li>
<li><p>🔧 <strong>Contribuite con il codice</strong>: inviate pull request e aiutateci a sviluppare le funzionalità principali</p>
<ul>
<li><p><strong>Pull request</strong>: contribuisci direttamente al nostro <a href="https://github.com/milvus-io/milvus/pulls">codice</a>. Che si tratti di correggere bug, aggiungere funzionalità o migliorare la documentazione, i tuoi contributi sono benvenuti.</p></li>
<li><p><strong>Guida allo sviluppo</strong>: consultate <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">la</a> nostra <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Guida per i collaboratori</a> per le linee guida sui contributi al codice.</p></li>
</ul></li>
<li><p>⭐ <strong>Diffondi la notizia</strong>: condividi le migliori pratiche e le storie di successo</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
