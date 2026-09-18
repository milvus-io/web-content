---
id: milvus_backup_0_6_cli.md
summary: >-
  Configurare Milvus Backup 0.6.0, creare un backup e verificare i dati
  ripristinati tramite l'interfaccia a riga di comando (CLI).
title: Utilizza Milvus Backup 0.6.0
---
<h1 id="Use-Milvus-Backup-060" class="common-anchor-header">Utilizza Milvus Backup 0.6.0<button data-href="#Use-Milvus-Backup-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilizza Milvus Backup per eseguire il backup delle collezioni e ripristinarle nella stessa istanza di Milvus o in un'altra. Questa guida riguarda <strong>Milvus Backup 0.6.0</strong>. Il backup e il ripristino su Milvus 3.0 sono ufficialmente supportati a partire dalla versione <strong>Milvus 3.0.1</strong>. Backup 0.6.0 supporta anche i flussi di lavoro binlog sulle versioni Milvus 2.x supportate; verificare <a href="/docs/it/milvus_backup_overview.md#Compatibility-matrix">la compatibilità di Milvus Backup</a>.</p>
<p>Se si utilizza ancora la versione 0.5.x di Backup, consultare <a href="/docs/it/milvus_backup_cli.md">la guida alla CLI della versione 0.5.x</a>. Se si sta effettuando un aggiornamento, seguire prima <a href="/docs/it/milvus_backup_upgrade.md">la procedura di aggiornamento di Milvus Backup</a>.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Ottenere Milvus Backup<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>Scarica il file binario per il tuo sistema operativo e la tua architettura dalla <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">versione v0.6.0</a>, quindi estrailo. Mantieni il file binario e gli esempi di configurazione nella stessa versione.</p>
<p>Per compilare invece dal codice sorgente, installa <strong>Go 1.26 o versioni successive</strong>, quindi esegui:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.6.0 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<p>Il file binario precompilato non richiede Go. Eseguire tutti i comandi shell successivi dalla directory contenente ` <code translate="no">milvus-backup</code>`.</p>
<h2 id="Prepare-configuration-file" class="common-anchor-header">Preparare il file di configurazione<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Backup necessita dell’accesso all’endpoint gRPC di Milvus, al suo endpoint di gestione, allo storage dell’istanza e alla destinazione del backup. Per i backup tramite snapshot, il server Milvus necessita inoltre dell’accesso allo storage di backup.</p>
<p>Creare una directory di configurazione:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>Salvare questo esempio MinIO come <code translate="no">configs/backup.yaml</code>. Sostituire gli indirizzi, le credenziali, il bucket e il percorso radice con le impostazioni della propria distribuzione. Le credenziali <code translate="no">minioadmin</code> sono quelle predefinite di prova di MinIO.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">configVersion:</span> <span class="hljs-string">v2</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">management:</span>
    <span class="hljs-attr">endpoint:</span> <span class="hljs-string">http://localhost:9091</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">provider:</span> <span class="hljs-string">minio</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">files</span>
    <span class="hljs-attr">auth:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">static</span>
      <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span>
<span class="hljs-attr">backup:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">backup</span>
<span class="hljs-attr">transfer:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">auto</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">milvus.grpc</code> si connette all’istanza di cui si sta eseguendo il backup o il ripristino. Se l’autenticazione è abilitata, impostare anche <code translate="no">milvus.user</code> e <code translate="no">milvus.password</code>.</li>
<li><code translate="no">milvus.management.endpoint</code> Viene utilizzato per mettere in pausa o riprendere la garbage collection durante il backup.</li>
<li><code translate="no">milvus.storage</code> deve corrispondere all’effettivo archivio oggetti dell’istanza. L’impostazione di un bucket in questa sezione non modifica la configurazione di Milvus.</li>
<li><code translate="no">backup.storage</code> identifica la posizione di backup. I campi non impostati ereditano i valori da <code translate="no">milvus.storage</code>, ad eccezione di <code translate="no">rootPath</code>, il cui valore predefinito è <code translate="no">backup</code>.</li>
<li><code translate="no">transfer.mode: auto</code> seleziona la copia lato storage quando i backend corrispondono e, in caso contrario, lo streaming tramite Milvus Backup. Questa impostazione controlla il trasferimento degli oggetti, non il formato di backup.</li>
</ul>
<p>Di seguito sono riportati i valori predefiniti tipici per lo storage. Verificare i valori nella propria distribuzione in esecuzione prima di utilizzarli.</p>
<table>
<thead>
<tr><th>Impostazione</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>Bucket</td><td><code translate="no">a-bucket</code></td><td><code translate="no">milvus-bucket</code></td></tr>
<tr><td>Percorso radice</td><td><code translate="no">files</code></td><td><code translate="no">file</code></td></tr>
</tbody>
</table>
<p>Se il server Milvus utilizza un indirizzo diverso per raggiungere l'archivio di backup, impostare <code translate="no">backup.storage.milvusAddress</code> e <code translate="no">milvusPort</code> sull'indirizzo raggiungibile dal server. Per l'autenticazione, TLS, altri provider di archiviazione e impostazioni aggiuntive, consultare <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">l'esempio di configurazione della versione 0.6.0</a>.</p>
<p>Verificare i valori effettivi e controllare la connettività:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config show</code> nasconde i valori segreti e indica la provenienza di ciascun valore. Il controllo di connettività dovrebbe riportare <code translate="no">Success!</code>. Risolvere eventuali errori di connessione o di archiviazione prima di creare un backup.</p>
<p>Per le configurazioni v1 esistenti, consultare <a href="/docs/it/milvus_backup_upgrade.md#Migrate-the-configuration">Aggiornamento del backup Milvus</a>. La conversione automatica della configurazione non sostituisce i flag CLI rimossi.</p>
<h2 id="Prepare-data" class="common-anchor-header">Preparare i dati<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare una raccolta esistente denominata <code translate="no">coll</code> e assicurarsi che <code translate="no">coll_bak</code> non esista. Registrare lo schema, il numero di entità, i valori scalari e vettoriali rappresentativi e un risultato di ricerca noto prima del backup. Mantenere invariati i dati di esempio durante il confronto con la copia ripristinata. Per creare invece un piccolo set di dati usa e getta, utilizzare <a href="/docs/it/snapshot-backup-and-restore.md#Prepare-sample-data">Preparare dati di esempio</a>.</p>
<h2 id="Back-up-data" class="common-anchor-header">Eseguire il backup dei dati<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Creare un backup denominato <code translate="no">coll</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup.yaml
./milvus-backup list --config configs/backup.yaml
./milvus-backup get -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Il comando create dovrebbe restituire <code translate="no">create backup success</code>. Il comando <code translate="no">get</code> restituisce i metadati del backup; verificare che la raccolta prevista sia presente. Omettendo <code translate="no">--filter</code>, viene eseguito il backup di tutte le raccolte idonee. Le raccolte esterne vengono ignorate.</p>
<p><code translate="no">--filter</code> Accetta nomi separati da virgole: <code translate="no">coll</code> nel database predefinito, <code translate="no">db1.coll</code> oppure <code translate="no">'db1.*'</code> per tutte le collezioni presenti in un database. Racchiudere tra virgolette i pattern contenenti <code translate="no">*</code> per impedire l’espansione della shell.</p>
<h3 id="Choose-a-backup-format-or-purpose" class="common-anchor-header">Scegliere un formato o uno scopo di backup<button data-href="#Choose-a-backup-format-or-purpose" class="anchor-icon" translate="no">
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
    </button></h3><p>Con l’impostazione predefinita <code translate="no">--format auto</code>, Milvus 3.0 utilizza backup di tipo snapshot; i server Milvus 2.x supportati utilizzano il binlog. Per mantenere esplicitamente il comportamento del binlog, passare <code translate="no">--format binlog</code>. <a href="/docs/it/snapshot-backup-and-restore.md">L’esempio dello snapshot</a> seleziona esplicitamente <code translate="no">--format snapshot</code>.</p>
<p>Utilizza ` <code translate="no">--for</code> ` quando uno scopo corrisponde al tuo flusso di lavoro:</p>
<table>
<thead>
<tr><th>Scopo</th><th>Valori applicati dal preset</th><th>Uso previsto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">clone</code></td><td>Abilita il backup RBAC; mantiene le scelte relative al formato e alla strategia</td><td>Copia i dati su un’altra istanza; " <code translate="no">auto</code> " utilizza uno snapshot su Milvus 3.0</td></tr>
<tr><td><code translate="no">archive</code></td><td>Forza l'<code translate="no">binlog</code> e e abilita il backup RBAC</td><td>Conserva un backup in formato binlog per un ripristino successivo</td></tr>
<tr><td><code translate="no">secondary</code></td><td>Forza l'<code translate="no">binlog</code>, l'<code translate="no">bulk_flush</code>, il backup RBAC e i metadati aggiuntivi dell'indice</td><td>Inizializza un nodo secondario in una topologia di replica configurata</td></tr>
</tbody>
</table>
<p>Ad esempio:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --for clone --filter coll -n clone_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Un preset sovrascrive i valori in conflitto per le opzioni che corregge. Ad esempio, ` <code translate="no">--for archive --format snapshot</code> ` produce un backup in formato binlog. Il backup dei metadati RBAC non ne garantisce automaticamente il ripristino; utilizzare l’opzione ` <code translate="no">--rbac</code> ` del comando di ripristino quando necessario.</p>
<p><code translate="no">secondary</code> non è una scorciatoia per il normale ripristino tra istanze. Richiede inoltre l’accesso all’etcd di origine per i metadati dell’indice, ID e canali corretti del cluster di replica e un nuovo destinatario secondario. Il backup deve conservare i propri metadati completi, compreso <code translate="no">meta/full_meta.json</code>. La configurazione della replica e l’esecuzione del failover esulano dall’ambito di questa guida. Consultare il <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">codice sorgente e la documentazione di riferimento della versione 0.6.0</a> per l’implementazione e i requisiti specifici di tale versione.</p>
<h3 id="Preserve-the-complete-backup" class="common-anchor-header">Conservare il backup completo<button data-href="#Preserve-the-complete-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>Un backup è memorizzato in <code translate="no">&lt;backup.storage.bucketName&gt;/&lt;backup.storage.rootPath&gt;/&lt;backup_name&gt;</code>. Conservare ogni oggetto presente in questa directory. I backup di snapshot includono un bundle esportato oltre ai metadati.</p>
<p>Non copiare solo i file di metadati né dare per scontato che un backup snapshot abbia la stessa struttura di un backup binlog.</p>
<h2 id="Restore-data" class="common-anchor-header">Ripristino dei dati<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Ripristinare <code translate="no">coll</code> come <code translate="no">coll_bak</code> nell'istanza configurata:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Nella CLI, " <code translate="no">--filter</code> " corrisponde ai nomi <strong>dopo</strong> l'applicazione di " <code translate="no">-s</code> " o " <code translate="no">--rename</code> ". Un comando con " <code translate="no">--filter coll -s _bak</code> " non trova alcuna corrispondenza e può terminare correttamente senza ripristinare alcuna raccolta.</p>
<p>Per eseguire il ripristino utilizzando il nome originale, scegliere una destinazione in cui quel nome di raccolta non esista, indirizzare la configurazione a tale destinazione e alla posizione di backup, quindi omettere il suffisso:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll -n my_backup --config configs/backup-target.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Per un esempio completo relativo alla stessa istanza, consultare <a href="/docs/it/snapshot-backup-and-restore.md">Backup e ripristino di snapshot in un'unica istanza</a>. Le pagine esistenti relative ai casi comuni tra istanze utilizzano la configurazione di Backup 0.5.16 e v1; non applicare i relativi comandi senza modifiche alla versione 0.6.0. Per la configurazione del trasferimento nella versione 0.6.0, consultare <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">la guida al trasferimento specifica per quella versione</a>.</p>
<h2 id="Verify-restored-data" class="common-anchor-header">Verifica dei dati ripristinati<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Verificare che <code translate="no">coll_bak</code> esista. Se il ripristino non ha ricreato il relativo indice vettoriale, creare l’indice appropriato allo schema in uso prima di caricare la raccolta. Confrontare lo schema, il numero di entità, i valori scalari e vettoriali e i risultati di ricerca noti con la linea di base acquisita prima del backup.</p>
<p>Per il dataset usa e getta da 256 entità, utilizzare i controlli completi descritti in <a href="/docs/it/snapshot-backup-and-restore.md#Verify-the-result">Verifica del risultato</a>. Il semplice esito positivo di un comando non garantisce che i dati previsti siano stati ripristinati.</p>
