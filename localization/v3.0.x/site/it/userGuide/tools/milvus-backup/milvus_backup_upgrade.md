---
id: milvus_backup_upgrade.md
summary: >-
  Eseguire l'aggiornamento di Milvus Backup dalla versione 0.5.x alla 0.6.0,
  aggiornare la configurazione e i comandi e verificare il corretto
  funzionamento del backup e del ripristino.
title: Aggiornamento di Milvus Backup alla versione 0.6.0
---
<h1 id="Upgrade-Milvus-Backup-to-060" class="common-anchor-header">Aggiornamento di Milvus Backup alla versione 0.6.0<button data-href="#Upgrade-Milvus-Backup-to-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilizzare questa guida per aggiornare lo <strong>strumento Milvus Backup</strong> dalla versione 0.5.x alla 0.6.0. Questa procedura non aggiorna il server Milvus. Se si intende rimanere alla versione 0.5.x, continuare a utilizzare la guida <a href="/docs/it/milvus_backup_cli.md">CLI</a> o <a href="/docs/it/milvus_backup_api.md">API</a> <a href="/docs/it/milvus_backup_cli.md">relativa alla versione 0.5.x</a>. Per una nuova installazione, utilizzare la <a href="/docs/it/milvus_backup_0_6_cli.md">guida relativa alla versione 0.6.0</a>.</p>
<p>Le configurazioni YAML della versione 1 vengono ancora caricate tramite traduzione automatica. Tuttavia, nella versione 0.6.0 i flag CLI deprecati vengono rifiutati e il formato di backup predefinito cambia in Milvus 3.0. Verifica sia la configurazione che i comandi prima di modificare i processi pianificati o i servizi.</p>
<h2 id="Check-the-starting-point" class="common-anchor-header">Verifica il punto di partenza<button data-href="#Check-the-starting-point" class="anchor-icon" translate="no">
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
    </button></h2><p>Annotate la versione di Backup, le versioni sorgente e di destinazione di Milvus, i file di configurazione, le sostituzioni delle variabili d’ambiente, la posizione di backup e i comandi utilizzati dagli script o dai servizi API. Verificate le <a href="/docs/it/milvus_backup_overview.md#Compatibility-matrix">informazioni sulla compatibilità</a> relative a tali versioni del server.</p>
<p>Conservare il binario originale, la configurazione e le directory di backup esistenti mentre si verifica la nuova installazione. Scaricare la versione 0.6.0 in una directory separata utilizzando <a href="/docs/it/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">"Ottieni Milvus Backup</a>". Tutti i comandi riportati di seguito vengono eseguiti da quella directory e richiamano il binario 0.6.0. Posizionare una copia della configurazione v1 in <code translate="no">configs/backup-v1.yaml</code>.</p>
<h2 id="Migrate-the-configuration" class="common-anchor-header">Migrazione della configurazione<button data-href="#Migrate-the-configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Una configurazione v1 viene ancora caricata nella versione 0.6.0. Milvus Backup la converte in v2 all’avvio e visualizza un avviso. Per salvare la configurazione convertita in un file separato:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config migrate --config configs/backup-v1.yaml --output configs/backup-v2.yaml --strict
./milvus-backup config show --config configs/backup-v2.yaml
./milvus-backup check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">--strict</code> rifiuta una configurazione migrata non valida. Senza <code translate="no">--output</code>, il comando scrive il YAML v2 sull’output standard. Esaminare e utilizzare il nuovo file solo dopo aver verificato che le impostazioni siano state risolte correttamente.</p>
<table>
<thead>
<tr><th>Impostazione v1</th><th>Impostazione v2</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.address</code>, <code translate="no">milvus.port</code></td><td><code translate="no">milvus.grpc.address</code>, <code translate="no">milvus.grpc.port</code></td></tr>
<tr><td>Archiviazione di origine in <code translate="no">minio.*</code></td><td><code translate="no">milvus.storage.*</code></td></tr>
<tr><td>Archiviazione di backup in <code translate="no">minio.backup*</code></td><td><code translate="no">backup.storage.*</code></td></tr>
<tr><td>Credenziali di archiviazione</td><td><code translate="no">milvus.storage.auth.*</code> / <code translate="no">backup.storage.auth.*</code>, con un'esplicita <code translate="no">auth.type</code></td></tr>
<tr><td><code translate="no">minio.crossStorage</code></td><td><code translate="no">transfer.mode</code></td></tr>
<tr><td><code translate="no">backup.gcPause.address</code></td><td><code translate="no">milvus.management.endpoint</code></td></tr>
</tbody>
</table>
<p>Rivedere le variabili d’ambiente nella stessa modifica del file di configurazione. La v2 accetta solo le variabili d’ambiente supportate relative alle credenziali, come <code translate="no">MILVUS_STORAGE_AUTH_SECRET_ACCESS_KEY</code>. I vecchi nomi della v1 non vengono applicati a un file v2. Per le impostazioni non relative alle credenziali, come i nomi dei bucket e gli endpoint, utilizzare YAML o una sovrascrittura della chiave di configurazione:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup-v2.yaml --set milvus.storage.bucketName=my-bucket
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config migrate</code> segnala le variabili d’ambiente interessate senza copiare i relativi valori segreti nel file di output. Consulta <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/env_variables.md">le variabili d’ambiente v2 supportate</a>. <code translate="no">config show</code> sostituisce il comando deprecato <code translate="no">check config</code>.</p>
<h2 id="Update-CLI-commands" class="common-anchor-header">Aggiornamento dei comandi CLI<button data-href="#Update-CLI-commands" class="anchor-icon" translate="no">
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
    </button></h2><p>I flag deprecati nella versione 0.5 vengono rifiutati nella versione 0.6.0. Aggiornare gli script prima di aggiornare il binario.</p>
<table>
<thead>
<tr><th>Comando</th><th>Opzione rimossa</th><th>Sostituzione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">create</code></td><td><code translate="no">--colls</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--force</code> / <code translate="no">-f</code></td><td><code translate="no">--strategy skip_flush</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--meta_only</code></td><td><code translate="no">--strategy meta_only</code></td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--collections</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code>, utilizzando i nomi delle destinazioni</td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--restore_index</code></td><td><code translate="no">--rebuild_index</code></td></tr>
<tr><td><code translate="no">get</code></td><td><code translate="no">--detail</code> / <code translate="no">-d</code></td><td>Rimuovere il flag; <code translate="no">get</code> restituisce le informazioni sul backup</td></tr>
<tr><td><code translate="no">list</code></td><td><code translate="no">--collection</code> / <code translate="no">-c</code></td><td>Nessun filtro di raccolta equivalente</td></tr>
</tbody>
</table>
<p>Ad esempio, questi comandi della versione 0.5.16 selezionano il nome della sorgente <code translate="no">coll</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>I loro sostituti nella versione 0.6.0 utilizzano il nome di destinazione per il ripristino:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Un filtro di ripristino che non trova corrispondenze può terminare correttamente senza creare una raccolta. Controllare sempre la raccolta di destinazione e i relativi dati. L’API HTTP <code translate="no">collection_names</code> seleziona ancora i nomi di origine nel backup; consultare <a href="/docs/it/milvus_backup_0_6_api.md#Restore-data">la guida all’API 0.6.0</a>.</p>
<h2 id="Choose-the-backup-behavior" class="common-anchor-header">Scegliere il comportamento del backup<button data-href="#Choose-the-backup-behavior" class="anchor-icon" translate="no">
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
<li>Sui server Milvus 2.x supportati, il formato ` <code translate="no">auto</code> ` utilizza il binlog. L'aggiornamento del backup non richiede il passaggio a Milvus 3.0.</li>
<li>Su Milvus 3.0, <code translate="no">auto</code> seleziona lo snapshot. Il supporto ufficiale per il backup e il ripristino inizia a partire dalla versione Milvus 3.0.1. Passare <code translate="no">--format binlog</code> per mantenere il comportamento binlog durante la creazione di un backup.</li>
<li>La compatibilità della configurazione V1 non conserva i flag di comando rimossi né sovrascrive le impostazioni predefinite del nuovo formato.</li>
<li>Le impostazioni predefinite per lo scopo possono determinare il formato e altre opzioni. Ad esempio, <code translate="no">--for archive</code> forza l’uso del binlog anche se viene specificato anche <code translate="no">--format snapshot</code>. Verificare <a href="/docs/it/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">le scelte relative al formato e allo scopo</a>.</li>
<li>Le raccolte esterne vengono ignorate durante il backup. Controllare i metadati del backup anziché considerare il completamento con successo dell’attività come prova che tutte le raccolte siano state incluse.</li>
</ul>
<h2 id="Validate-before-switching-jobs" class="common-anchor-header">Verificare prima di cambiare lavoro<button data-href="#Validate-before-switching-jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>L'esempio seguente mantiene il formato binlog ed esegue il ripristino in una nuova raccolta. Sostituire <code translate="no">coll</code> con una raccolta di cui si sono registrati lo schema, il conteggio, i valori scalari e vettoriali e i risultati della ricerca. Utilizzare un nuovo nome per il backup e assicurarsi che il nome di destinazione <code translate="no">coll_upgrade_check</code> non esista.</p>
<pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-v2.yaml
./milvus-backup create --filter coll --format binlog -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup get -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_upgrade_check -n upgrade_check -s _upgrade_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Verificare che il backup elenchi <code translate="no">coll</code> e che <code translate="no">coll_upgrade_check</code> esista dopo il ripristino. Se necessario, creare il relativo indice vettoriale, caricarlo e confrontare i dati ripristinati e i risultati della ricerca con la linea di base registrata. Mantenere inalterati i dati di origine durante questo test.</p>
<p>Testare inoltre un backup esistente rappresentativo prima di fare affidamento su di esso con il nuovo strumento. Per un backup 0.5.16 denominato <code translate="no">legacy_backup</code> contenente <code translate="no">coll</code>, utilizzare un nome di destinazione separato:</p>
<pre><code translate="no" class="language-shell">./milvus-backup get -n legacy_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_legacy_check -n legacy_backup -s _legacy_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Questi percorsi di aggiornamento sono stati convalidati con <strong>Milvus 2.6.11</strong>, backup <strong>da 0.5.16 a 0.6.0</strong> e backup binlog in MinIO. Sia i backup appena creati che quelli esistenti sono stati ripristinati con valori delle entità e risultati della ricerca vettoriale corrispondenti. Ciò non garantisce la compatibilità per tutti i backup storici né per il ripristino da Milvus 2.x a 3.0. Inoltre, non garantisce che la versione 0.5.x sia in grado di leggere i backup creati dalla versione 0.6.0.</p>
<p>Una volta superata la verifica, aggiornare i processi in modo che utilizzino insieme il nuovo binario, la configurazione verificata, le impostazioni ambientali e i flag di sostituzione. Per le distribuzioni API, avviare il nuovo servizio con la configurazione verificata e verificare il completamento delle attività tramite <a href="/docs/it/milvus_backup_0_6_api.md">l’API HTTP 0.6.0</a>. Per adottare gli snapshot su Milvus 3.0.1 o versioni successive, seguire la procedura <a href="/docs/it/snapshot-backup-and-restore.md">“Backup e ripristino di snapshot in un’unica istanza</a>”.</p>
