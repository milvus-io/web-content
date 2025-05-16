---
id: migrate_overview.md
summary: >-
  Questo articolo fornisce una panoramica dello strumento Milvus-migration,
  comprese le migrazioni supportate, le caratteristiche e l'architettura.
title: Panoramica della migrazione di Milvus
---
<h1 id="Milvus-Migration-Overview" class="common-anchor-header">Panoramica sulla migrazione di Milvus<button data-href="#Milvus-Migration-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Riconoscendo le diverse esigenze della base di utenti, Milvus ha ampliato i suoi strumenti di migrazione non solo per facilitare gli aggiornamenti dalle versioni precedenti di Milvus 1.x, ma anche per consentire una perfetta integrazione dei dati da altri sistemi come <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html">Elasticsearch</a> e <a href="https://github.com/facebookresearch/faiss">Faiss</a>. Il progetto di <a href="https://github.com/zilliztech/milvus-migration">migrazione di Milvus</a> è stato concepito per colmare il divario tra questi diversi ambienti di dati e gli ultimi progressi della tecnologia Milvus, assicurando che possiate sfruttare le funzionalità e le prestazioni migliorate senza soluzione di continuità.</p>
<h2 id="Supported-migrations" class="common-anchor-header">Migrazioni supportate<button data-href="#Supported-migrations" class="anchor-icon" translate="no">
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
    </button></h2><p>Lo strumento <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> supporta una serie di percorsi di migrazione per soddisfare le diverse esigenze degli utenti:</p>
<ul>
<li><a href="/docs/it/v2.4.x/es2m.md">Elasticsearch a Milvus 2.x</a>: Consente agli utenti di migrare i dati da ambienti Elasticsearch per sfruttare le capacità di ricerca vettoriale ottimizzata di Milvus.</li>
<li><a href="/docs/it/v2.4.x/f2m.md">Da Faiss a Milvus 2.x</a>: Fornisce un supporto sperimentale per il trasferimento di dati da Faiss, una popolare libreria per la ricerca efficiente di similarità.</li>
<li><a href="/docs/it/v2.4.x/m2m.md">Da Milvus 1.x a Milvus 2.x</a>: Garantire la transizione dei dati dalle versioni precedenti all'ultima versione del framework.</li>
<li><a href="/docs/it/v2.4.x/from-m2x.md">Da Milvus 2.3.x a Milvus 2.3.x o superiore</a>: Fornisce un percorso di migrazione una tantum per gli utenti che sono già passati alla versione 2.3.x.</li>
</ul>
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
    </button></h2><p>Milvus-migration è stato progettato con caratteristiche robuste per gestire diversi scenari di migrazione:</p>
<ul>
<li>Metodi di interazione multipli: È possibile eseguire le migrazioni tramite un'interfaccia a riga di comando o tramite un'API Restful, con una certa flessibilità nelle modalità di esecuzione delle migrazioni.</li>
<li>Supporto per vari formati di file e cloud storage: Lo strumento <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> è in grado di gestire i dati memorizzati in file locali e in soluzioni di archiviazione cloud come S3, OSS e GCP, garantendo un'ampia compatibilità.</li>
<li>Gestione dei tipi di dati: <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> è in grado di gestire sia dati vettoriali che campi scalari, il che lo rende una scelta versatile per le diverse esigenze di migrazione dei dati.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">Architettura<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>L'architettura di <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> è stata progettata strategicamente per facilitare lo streaming dei dati, il parsing e i processi di scrittura, consentendo solide capacità di migrazione tra diverse fonti di dati.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-migration-architecture.jpeg" alt="Milvus-migration architecture" class="doc-image" id="milvus-migration-architecture" />
   </span> <span class="img-wrapper"> <span>Architettura di Milvus-migration</span> </span></p>
<p>Nella figura precedente:</p>
<ul>
<li><strong>Sorgente di dati</strong>: <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> supporta diverse fonti di dati, tra cui Elasticsearch tramite l'<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/scroll-api.html">API</a> di <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/scroll-api.html">scorrimento</a>, file di dati locali o di archiviazione nel cloud e database Milvus 1.x. L'accesso e la lettura di queste fonti avvengono in modo semplificato per avviare il processo di migrazione.</li>
<li><strong>Pipeline di flusso</strong>:<ul>
<li><strong>Processo di analisi</strong>: I dati provenienti dalle fonti vengono analizzati in base al loro formato. Ad esempio, per una fonte di dati proveniente da Elasticsearch, viene utilizzato un parser per il formato Elasticsearch, mentre altri formati utilizzano i rispettivi parser. Questa fase è fondamentale per trasformare i dati grezzi in un formato strutturato che possa essere ulteriormente elaborato.</li>
<li><strong>Processo di conversione</strong>: Dopo il parsing, i dati sono sottoposti a una conversione in cui i campi sono filtrati, i tipi di dati sono convertiti e i nomi delle tabelle sono adattati allo schema Milvus 2.x di destinazione. Questo assicura che i dati siano conformi alla struttura e ai tipi previsti in Milvus.</li>
</ul></li>
<li><strong>Scrittura e caricamento dei dati</strong>:<ul>
<li><strong>Scrivere i dati</strong>: I dati elaborati vengono scritti in file JSON o NumPy intermedi, pronti per essere caricati in Milvus 2.x.</li>
<li><strong>Caricamento dei dati</strong>: I dati vengono infine caricati in Milvus 2.x utilizzando l'operazione <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">BulkInsert</a>, che scrive in modo efficiente grandi volumi di dati nei sistemi di archiviazione di Milvus, sia basati su cloud che su filestore.</li>
</ul></li>
</ul>
<h2 id="Future-plans" class="common-anchor-header">Piani futuri<button data-href="#Future-plans" class="anchor-icon" translate="no">
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
    </button></h2><p>Il team di sviluppo è impegnato a migliorare <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> con funzionalità quali:</p>
<ul>
<li><strong>Supporto per un maggior numero di fonti di dati</strong>: Piani per estendere il supporto ad altri database e file system, come Pinecone, Chroma, Qdrant. Se avete bisogno del supporto per una fonte di dati specifica, inviate la vostra richiesta attraverso questo <a href="https://github.com/zilliztech/milvus-migration/issues">link al problema GitHub</a>.</li>
<li><strong>Semplificazione dei comandi</strong>: Sforzi per semplificare il processo dei comandi per facilitarne l'esecuzione.</li>
<li><strong>Parser</strong> / <strong>conversione</strong><strong>SPI</strong>: L'architettura prevede di includere strumenti di Service Provider Interface (SPI) per l'analisi e la conversione. Questi strumenti consentono implementazioni personalizzate che gli utenti possono inserire nel processo di migrazione per gestire formati di dati specifici o regole di conversione.</li>
<li><strong>Ripresa del checkpoint</strong>: Consente di riprendere le migrazioni dall'ultimo checkpoint per migliorare l'affidabilità e l'efficienza in caso di interruzioni. I punti di salvataggio vengono creati per garantire l'integrità dei dati e sono memorizzati in database come SQLite o MySQL per tracciare l'avanzamento del processo di migrazione.</li>
</ul>
