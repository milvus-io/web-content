---
id: architecture_overview.md
summary: >-
  Milvus offre un database vettoriale veloce, affidabile e stabile, costruito
  appositamente per la ricerca di similarità e l'intelligenza artificiale.
title: Panoramica dell'architettura di Milvus
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Panoramica dell'architettura di Milvus<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Costruito sulla base delle più diffuse librerie di ricerca vettoriale, tra cui Faiss, HNSW, DiskANN, SCANN e altre, Milvus è stato progettato per la ricerca di similarità su insiemi di dati vettoriali densi, contenenti milioni, miliardi o addirittura trilioni di vettori. Prima di procedere, è bene familiarizzare con i <a href="/docs/it/v2.4.x/glossary.md">principi di base</a> dell'embedding retrieval.</p>
<p>Milvus supporta anche lo sharding dei dati, l'ingestione di dati in streaming, lo schema dinamico, la ricerca di dati vettoriali e scalari, la ricerca multivettoriale e ibrida, il vettore sparse e molte altre funzioni avanzate. La piattaforma offre prestazioni on demand e può essere ottimizzata per adattarsi a qualsiasi scenario di embedding retrieval. Si consiglia di distribuire Milvus utilizzando Kubernetes per ottenere disponibilità ed elasticità ottimali.</p>
<p>Milvus adotta un'architettura di storage condiviso che prevede la disaggregazione dello storage e dell'elaborazione e la scalabilità orizzontale dei nodi di elaborazione. Seguendo il principio della disaggregazione del piano dati e del piano di controllo, Milvus comprende <a href="/docs/it/v2.4.x/four_layers.md">quattro livelli</a>: livello di accesso, servizio di coordinamento, nodo lavoratore e storage. Questi livelli sono indipendenti l'uno dall'altro per quanto riguarda la scalabilità o il disaster recovery.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus_architecture.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>Diagramma_di_architettura</span> </span></p>
<p>Secondo la figura, le interfacce possono essere classificate nelle seguenti categorie:</p>
<ul>
<li><strong>DDL / DCL:</strong> createCollection / createPartition / dropCollection / dropPartition / hasCollection / hasPartition</li>
<li><strong>DML / Produce:</strong> insert / delete / upsert</li>
<li><strong>DQL:</strong> ricerca / interrogazione</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Cosa c'è dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Per saperne di più sulla <a href="/docs/it/v2.4.x/four_layers.md">disaggregazione di calcolo e di stoccaggio</a> in Milvus</li>
<li>Conoscere i <a href="/docs/it/v2.4.x/main_components.md">componenti principali</a> di Milvus.</li>
</ul>
