---
id: snapshots.md
title: IstantaneeCompatible with Milvus 3.0.x
summary: >-
  Usate le istantanee per catturare gli stati della raccolta point-in-time per
  il rollback, il versioning e i test.
beta: Milvus 3.0.x
---
<h1 id="Snapshots" class="common-anchor-header">Istantanee<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>Un'istantanea è un'immagine point-in-time di una collezione Milvus, ideale per rollback rapidi, versioning e test. Cattura lo stato della collezione in un momento specifico e memorizza solo i metadati e i file manifesto, come lo schema, gli indici e i file di dati vettoriali (binlog), per una conservazione e un ripristino efficienti.</p>
<div class="alert note">
<p>Le istantanee sono immagini rapide e puntuali dei dati, adatte per rollback o test rapidi<strong>(da giorni a settimane</strong>). Allo stesso tempo, i backup sono copie complete e indipendenti, conservate separatamente per il ripristino di emergenza a lungo termine<strong>(da settimane a anni</strong>) e per una migliore protezione contro i guasti totali dello storage.</p>
<p>Per creare i backup, consultare <a href="/docs/it/milvus_backup_overview.md">Milvus Backup</a>.</p>
</div>
<h2 id="Snapshot-anatomy" class="common-anchor-header">Anatomia delle istantanee<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus implementa un'architettura di snapshot basata su manifest per un'efficiente acquisizione, archiviazione e ripristino dei dati point-in-time senza duplicare i dati vettoriali effettivi. L'architettura separa la gestione dei metadati dall'archiviazione fisica dei dati, consentendo snapshot leggeri che fanno riferimento a file di segmento esistenti nell'archiviazione degli oggetti.</p>
<p>Quando si crea un'istantanea per una raccolta, Milvus raccoglie quanto segue:</p>
<ul>
<li><p><strong>Metadati dell'istantanea</strong></p>
<p>Fornisce le informazioni di base per la creazione dell'istantanea, tra cui il nome e la descrizione dell'istantanea, l'ID della raccolta di destinazione e il momento in cui viene creata l'istantanea.</p></li>
<li><p><strong>Descrizione della raccolta</strong></p>
<p>Contiene la descrizione della raccolta di destinazione, compresa la definizione dello schema, le informazioni sulla partizione e le proprietà.</p></li>
<li><p><strong>Informazioni sull'indice</strong></p>
<p>Contiene i metadati dell'indice e i percorsi dei file dell'indice.</p></li>
<li><p><strong>Dati del segmento</strong></p>
<p>Cattura i file di dati vettoriali (binlog), i log di cancellazione (deltalog) e i file di indice.</p></li>
</ul>
<p>Tra le informazioni di cui sopra, Milvus genera un file manifest Apache Avro per ogni segmento e memorizza i metadati dell'istantanea, la descrizione della raccolta, le informazioni sull'indice e i percorsi dei file manifest in un file JSON. Il diagramma seguente illustra la struttura delle cartelle delle istantanee.</p>
<pre><code translate="no" class="language-text">snapshots/{collection_id}/
├── metadata/
│   └── {snapshot_id}.json         # Snapshot metadata (JSON format)
│
└── manifests/
    └── {snapshot_id}/             # Directory for each snapshot
        ├── {segment_id_1}.avro    # Individual segment manifest (Avro format)
        ├── {segment_id_2}.avro
        └── ...
<button class="copy-code-btn"></button></code></pre>
<p>La creazione di un'istantanea richiede in genere millisecondi, mentre il suo ripristino richiede da pochi secondi a pochi minuti, a seconda del volume dei dati.</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">Considerazioni e impatti sullo storage<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta che Milvus fa riferimento a un segmento o a un file di indice in un'istantanea, non raccoglie i file a meno che non si abbandoni l'istantanea. Le istantanee consumano uno spazio di archiviazione proporzionale alle dimensioni delle raccolte di destinazione e i costi di archiviazione degli oggetti si applicano alla conservazione delle istantanee. In casi estremi, una singola istantanea può addirittura raddoppiare i costi di archiviazione degli oggetti. Si consiglia di</p>
<ul>
<li>Rimuovere regolarmente le vecchie istantanee per risparmiare spazio di archiviazione.</li>
<li>Utilizzare nomi e descrizioni descrittivi per riferimenti futuri.</li>
<li>Verificare sempre i risultati della creazione e del ripristino delle snapshot.</li>
<li>Tenere traccia dei timestamp di creazione delle snapshot, dell'utilizzo dello storage e degli ID dei processi di ripristino per il monitoraggio e la risoluzione dei problemi.</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">Limiti e restrizioni<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
<li>Le istantanee diventano immutabili dopo la creazione.</li>
<li>È possibile ripristinare un'istantanea solo in una nuova raccolta all'interno dello stesso cluster dell'originale.</li>
<li>Le collezioni ripristinate mantengono lo stesso schema, numero di shard e numero di partizioni.</li>
<li>I dati storici ripristinati possono entrare in conflitto con i criteri TTL. Si consiglia di disabilitare il TTL o di regolare le impostazioni del TTL prima di creare le istantanee.</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">Ulteriori letture<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
<li><a href="/docs/it/manage-snapshots.md">Gestire le istantanee</a>: creare, elencare, ripristinare ed eliminare le istantanee.</li>
<li><a href="/docs/it/snapshot-use-cases.md">Casi d'uso delle istantanee</a> - modelli e flussi di lavoro comuni.</li>
<li><a href="/docs/it/milvus_backup_overview.md">Milvus Backup</a> - backup e ripristino a lungo termine tra i cluster.</li>
</ul>
