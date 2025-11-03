---
id: roadmap.md
title: Tabella di marcia di Milvus
related_key: Milvus roadmap
summary: >-
  Milvus è un database vettoriale open-source costruito per alimentare le
  applicazioni di intelligenza artificiale. Ecco la nostra roadmap per guidare
  il nostro sviluppo.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Tabella di marcia di Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 Verso il database multimodale e il lago di dati di nuova generazione<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Tabella di marcia del prodotto Milvus</strong></p>
<p>Benvenuti nella roadmap di Milvus!</p>
<p>Stiamo introducendo Milvus in una nuova era - il database multimodale di nuova generazione - che va dai <strong>dati strutturati a quelli non strutturati</strong>, dal <strong>recupero in tempo reale all'analisi offline</strong>, dalle <strong>prestazioni di un singolo cluster a un'architettura di data lake globale</strong>.</p>
<p>Questa roadmap delinea gli obiettivi principali di <strong>Milvus v2.6 (in corso)</strong>, <strong>Milvus v3.0 (previsto per la fine del 2026)</strong> e <strong>Milvus v3.1 (sviluppo a lungo termine)</strong>, insieme al piano di evoluzione di <strong>Vector Lake (data lake / Loon)</strong>.</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6 (in corso)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Tempistica: Metà del 2025 - Fine del 2025</strong></p>
<p>Focus: <strong>Aggiornamento del modello di dati</strong>, <strong>rifattorizzazione dell'architettura di streaming</strong>, <strong>creazione di funzionalità di hot/cold tiering</strong> e lancio del <strong>prototipo di Vector Lake (v0.1)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">Punti salienti<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header"><strong>Aggiornamento del modello dei dati</strong></h4><ul>
<li><p>Introduzione di un tipo di dati unificato <strong>Tensor / StructList</strong> per supportare strutture di incorporamento multivettoriali, consentendo la compatibilità con <em>ColBERT</em>, <em>CoLQwen</em>, <em>video</em> e <em>vettori multimodali</em>.</p></li>
<li><p>Aggiunta del supporto per <strong>i dati geografici</strong>, compresi i punti, le regioni e l'indicizzazione spaziale (basata su <em>libspatial</em>), per espandere i casi d'uso in LBS e GIS.</p></li>
<li><p>Supporto per <strong>Timestamp con</strong> tipo di dati <strong>Timezone</strong>.</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header"><strong>Rifacimento dell'architettura StreamNode</strong></h4><ul>
<li><p>Riscrittura della pipeline di ingestione dello streaming per ottimizzare le scritture incrementali e il calcolo in tempo reale.</p></li>
<li><p>Migliora significativamente le prestazioni e la stabilità della concorrenza, gettando le basi per un'elaborazione unificata in tempo reale e offline.</p></li>
<li><p>Introdurre un nuovo motore per le code di messaggi: <strong>Woodpecker</strong>.</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header"><strong>Architettura di storage e tiering caldo/freddo (StorageV2)</strong></h4><ul>
<li><p>Supporto di due formati di storage: <strong>Parquet</strong> e <strong>Vortex</strong>, che migliorano la concorrenza e l'efficienza della memoria.</p></li>
<li><p>Implementazione dello storage a livelli con separazione automatica dei dati caldi/freddi e pianificazione intelligente.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹 <strong>Prototipo Vector Lake (v0.1)</strong></h4><ul>
<li><p>Integrazione con <strong>Spark</strong> / <strong>DuckDB</strong> / <strong>DataFusion</strong> tramite FFI, che consente l'evoluzione offline dello schema e le query KNN.</p></li>
<li><p>Fornisce una visualizzazione multimodale dei dati e una demo di Spark ETL, stabilendo l'architettura di base del lago di dati.</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Late-2026" class="common-anchor-header">🌠 Milvus v3.0 (previsto per la fine del 2026)<button data-href="#🌠-Milvus-v30-Targeted-for-Late-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Tempistica: Fine 2025 - inizio 2026</strong></p>
<p>Focus: Miglioramenti completi all'<strong>esperienza di ricerca</strong>, alla <strong>flessibilità dello schema</strong> e al <strong>supporto dei dati non strutturati</strong>, oltre al rilascio di <strong>Vector Lake (v0.2)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">Punti salienti<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header"><strong>Revisione dell'esperienza di ricerca</strong></h4><ul>
<li><p>Introduzione della ricerca per similarità <strong>More Like This (MLT)</strong> con supporto per ricerche con esempi di posizione o negativi.</p></li>
<li><p>Aggiunta di funzionalità di ricerca semantica come l'<strong>evidenziazione</strong> e il <strong>boosting</strong>.</p></li>
<li><p>Supporto di <strong>dizionari</strong> e <strong>tabelle di sinonimi</strong> <strong>personalizzati</strong>, per consentire la definizione di regole lessicali e semantiche a livello di analizzatore.</p></li>
<li><p>Introdurre funzionalità <strong>di aggregazione</strong> per le query.</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹 <strong>Gestione delle risorse e dei multi-tenant</strong></h4><ul>
<li><p>Abilitazione della cancellazione, delle statistiche e del tiering caldo/freddo di più tenant.</p></li>
<li><p>Migliorare l'isolamento delle risorse e le strategie di pianificazione per supportare milioni di tabelle in un singolo cluster.</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header"><strong>Miglioramenti a schemi e chiavi primarie</strong></h4><ul>
<li><p>Implementazione della <strong>deduplicazione globale delle chiavi primarie (Global PK Dedup)</strong> per garantire la coerenza e l'unicità dei dati.</p></li>
<li><p>Supporto di <strong>una gestione flessibile dello schema</strong> (aggiunta/eliminazione di colonne, riempimento di backup).</p></li>
<li><p>Consentire i <strong>valori NULL</strong> nei campi vettoriali.</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header">🔹 <strong>Espansione dei tipi di dati non strutturati (BLOB / Testo)</strong></h4><ul>
<li><p>Introduzione del <strong>tipo BLOB</strong>, che consente di memorizzare e referenziare in modo nativo dati binari come file, immagini e video.</p></li>
<li><p>Introdurre il <strong>tipo TEXT</strong>, che fornisce funzionalità di ricerca full-text e basate sui contenuti.</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header"><strong>Funzionalità di livello enterprise</strong></h4><ul>
<li><p>Supporto di <strong>backup e ripristino basati su snapshot</strong>.</p></li>
<li><p>Fornisce il <strong>tracciamento end-to-end</strong> e la <strong>registrazione degli audit</strong>.</p></li>
<li><p>Implementazione dell'<strong>High Availability (HA) in modalità Active-Standby</strong> in implementazioni multi-cluster.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹 <strong>Vector Lake (v0.2)</strong></h4><ul>
<li><p>Supporto dell'<strong>archiviazione TEXT / BLOB</strong> e della <strong>gestione di snapshot multiversione</strong>.</p></li>
<li><p>Integrazione di Spark per l'indicizzazione offline, il clustering, la deduplicazione e la riduzione della dimensionalità.</p></li>
<li><p>Fornisce <strong>demo di ChatPDF cold-query e benchmark offline</strong>.</p></li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">Milvus v3.1 (visione a lungo termine)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Tempistica: Metà del 2026</strong></p>
<p>Focus: <strong>Funzioni definite dall'utente (UDF)</strong>, <strong>integrazione del calcolo distribuito</strong>, <strong>ottimizzazione delle query scalari</strong>, <strong>sharding dinamico</strong> e rilascio ufficiale di <strong>Vector Lake (v1.0)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">Punti salienti<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹 <strong>Ecosistema UDF e calcolo distribuito</strong></h4><ul>
<li><p>Supporto delle <strong>funzioni definite dall'utente (UDF)</strong>, che consentono agli sviluppatori di iniettare logica personalizzata nei flussi di lavoro di recupero e calcolo.</p></li>
<li><p>Profonda integrazione con <strong>Ray Dataset / Daft</strong> per l'esecuzione distribuita di UDF e l'elaborazione multimodale dei dati.</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header"><strong>Query scalare ed evoluzione del formato locale</strong></h4><ul>
<li><p>Ottimizzazione delle prestazioni di filtraggio e aggregazione per i campi scalari.</p></li>
<li><p>Miglioramento della valutazione delle espressioni e dell'esecuzione accelerata dagli indici.</p></li>
<li><p>Supporto degli <strong>aggiornamenti in-place</strong> per i formati di file locali.</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹 F <strong>unzionalità di ricerca avanzata</strong></h4><ul>
<li><p>Aggiunte le seguenti funzioni: Query <strong>RankBy</strong>, <strong>OrderBy</strong>, <strong>Facet</strong> e <strong>Fuzzy match</strong>.</p></li>
<li><p>Miglioramento del reperimento del testo con il supporto di:</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹 S <strong>harding dinamico e scalabilità</strong></h4><ul>
<li><p>Abilita la <strong>suddivisione automatica degli shard</strong> e il <strong>bilanciamento del carico</strong> per una scalabilità senza soluzione di continuità.</p></li>
<li><p>Migliora la <strong>costruzione dell'indice globale</strong> e garantisce <strong>le prestazioni della ricerca distribuita</strong>.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹 <strong>Vector Lake V1.0</strong></h4><ul>
<li><p>Profonda integrazione con <strong>Ray / Daft / PyTorch</strong> per supportare UDF distribuite e casi d'uso di Context Engineering.</p></li>
<li><p>Fornisce <strong>dimostrazioni di RAG (Retrieval-Augmented Generation)</strong> <strong>e importazione da tabelle Iceberg</strong>.</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Co-costruire il futuro di Milvus<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus è un progetto open-source guidato da una comunità globale di sviluppatori.</p>
<p>Invitiamo caldamente tutti i membri della comunità a contribuire alla creazione del database multimodale di prossima generazione:</p>
<ul>
<li><p>💬 <strong>Condividere il feedback</strong>: Proporre nuove funzionalità o idee di ottimizzazione</p></li>
<li><p>🐛 S <strong>egnalare problemi</strong>: Segnalare i bug tramite GitHub Issues</p></li>
<li><p>🔧 <strong>Contribuire al codice</strong>: Invia PR e contribuisci alla creazione di funzionalità di base</p>
<ul>
<li><p><strong>Richieste di prelievo</strong>: Contribuire direttamente alla nostra <a href="https://github.com/milvus-io/milvus/pulls">base di codice</a>. Che si tratti di correggere bug, aggiungere funzionalità o migliorare la documentazione, i vostri contributi sono benvenuti.</p></li>
<li><p><strong>Guida allo sviluppo</strong>: Consultate la nostra <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Guida per i collaboratori</a> per le linee guida sui contributi al codice.</p></li>
</ul></li>
<li><p><strong>⭐ Diffondete la parola</strong>: condividete le migliori pratiche e le storie di successo.</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
