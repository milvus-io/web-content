---
id: snapshots.md
title: SnapshotCompatible with Milvus 3.0.x
summary: >-
  Utilizza le istantanee per acquisire lo stato delle raccolte in un determinato
  momento ai fini del rollback, della gestione delle versioni e dei test.
beta: Milvus 3.0.x
---
<h1 id="Snapshots" class="common-anchor-header">Snapshot<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>Uno snapshot è un'immagine di una collezione Milvus relativa a un determinato momento, ideale per rollback rapidi, gestione delle versioni e test. Cattura lo stato della collezione in un momento specifico e memorizza solo metadati e file di manifesto, come lo schema, gli indici e i file di dati vettoriali (binlog), per garantire efficienza nell'archiviazione e nel ripristino.</p>
<p>Le istantanee sono immagini rapide dei dati relative a un determinato momento, adatte a ripristini rapidi o a test (<strong>da giorni a settimane</strong>). Allo stesso tempo, i backup sono copie indipendenti e complete archiviate separatamente per il ripristino di emergenza a lungo termine (<strong>da settimane ad anni</strong>) e per una migliore protezione contro il guasto totale dello storage.</p>
<p>Per creare backup, consultare <a href="/docs/it/milvus_backup_overview.md">Milvus Backup</a>.</p>
<h2 id="Snapshot-anatomy" class="common-anchor-header">Anatomia dello snapshot<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus implementa un'architettura di snapshot basata su manifesti per l'acquisizione, l'archiviazione e il ripristino efficienti dei dati in un determinato momento, senza duplicare i dati vettoriali effettivi. L'architettura separa la gestione dei metadati dall'archiviazione fisica dei dati, consentendo la creazione di snapshot leggeri che fanno riferimento a file di segmenti esistenti nell'object storage.</p>
<p>Quando si crea uno snapshot per una raccolta, Milvus raccoglie quanto segue:</p>
<ul>
<li><p><strong>Metadati dello snapshot</strong></p>
<p>Forniscono le informazioni di base per la creazione dello snapshot, tra cui il nome e la descrizione dello snapshot, l’ID della collezione di destinazione e il momento in cui lo snapshot viene creato.</p></li>
<li><p><strong>Descrizione della raccolta</strong></p>
<p>Contiene la descrizione della raccolta di destinazione, tra cui la definizione dello schema, le informazioni sulle partizioni e le proprietà.</p></li>
<li><p><strong>Informazioni sull'indice</strong></p>
<p>Memorizza i metadati dell’indice e i percorsi dei file di indice.</p></li>
<li><p><strong>Dati dei segmenti</strong></p>
<p>Acquisisce i file di dati vettoriali (binlog), i log di eliminazione (deltalog) e i file di indice.</p></li>
</ul>
<p>Tra le informazioni di cui sopra, Milvus genera un file manifest Apache Avro per ciascun segmento e memorizza i metadati dello snapshot, la descrizione della raccolta, le informazioni sull'indice e i percorsi dei file manifest in un file JSON. Il diagramma seguente illustra la struttura delle cartelle dello snapshot.</p>
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
<p>La creazione di uno snapshot richiede solitamente pochi millisecondi, mentre il ripristino richiede da pochi secondi a qualche minuto, a seconda del volume dei dati.</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">Impatti e considerazioni sull’archiviazione<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta che Milvus fa riferimento a un segmento o a un file di indice in uno snapshot, non esegue la garbage collection di tali file a meno che non si elimini lo snapshot. Gli snapshot consumano spazio di archiviazione in proporzione alle dimensioni delle collezioni di destinazione e alla conservazione degli snapshot si applicano i costi di archiviazione a oggetti. In casi estremi, un singolo snapshot può persino raddoppiare i costi di archiviazione a oggetti. Si consiglia di</p>
<ul>
<li>Rimuovere regolarmente gli snapshot obsoleti per risparmiare spazio di archiviazione.</li>
<li>Utilizzare nomi e descrizioni descrittivi per riferimento futuro.</li>
<li>Verificare sempre i risultati della creazione e del ripristino degli snapshot.</li>
<li>Tenere traccia dei timestamp di creazione degli snapshot e dell’utilizzo dello spazio di archiviazione per il monitoraggio e la risoluzione dei problemi.</li>
<li>Archiviare gli ID dei processi di ripristino per il monitoraggio e la risoluzione dei problemi.</li>
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
<li>Gli snapshot diventano immutabili dopo la creazione.</li>
<li>È possibile ripristinare uno snapshot solo in una nuova raccolta all'interno dello stesso cluster dell'originale.</li>
<li>Le raccolte ripristinate mantengono lo stesso schema, lo stesso numero di shard e lo stesso numero di partizioni.</li>
<li>I dati storici ripristinati potrebbero entrare in conflitto con le politiche TTL. Si consiglia di disabilitare il TTL o di regolare le impostazioni TTL prima di creare le istantanee.</li>
<li>Per utilizzare uno snapshot come fonte esterna di " <code translate="no">milvus-table</code> ", lo snapshot di origine deve provenire da una normale collezione StorageV3 di Milvus. Gli snapshot di collezioni esterne non sono supportati come fonti di " <code translate="no">milvus-table</code> ".</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">Approfondimenti<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
<li><a href="/docs/it/manage-snapshots.md">Gestione degli snapshot</a>: creazione, elenco, descrizione, aggiunta ai preferiti, ripristino ed eliminazione degli snapshot.</li>
<li><a href="/docs/it/snapshot-use-cases.md">Casi d'uso degli snapshot</a> — modelli e flussi di lavoro comuni.</li>
<li><a href="/docs/it/milvus_backup_overview.md">Backup di Milvus</a> — backup a lungo termine e ripristino tra cluster.</li>
</ul>
