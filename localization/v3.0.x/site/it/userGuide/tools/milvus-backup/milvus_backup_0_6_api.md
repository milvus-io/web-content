---
id: milvus_backup_0_6_api.md
summary: >-
  Creare e monitorare le attività di backup e ripristino tramite l'API HTTP di
  Milvus Backup.
title: Backup e ripristino dei dati tramite APICompatible with Milvus Backup 0.6.x
beta: Milvus Backup 0.6.x
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">Backup e ripristino dei dati tramite API<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.6.x</span><button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilizza l'API HTTP di Milvus Backup per creare backup, ripristinare raccolte e monitorare le attività asincrone. L'esempio di snapshot riportato di seguito richiede <strong>Milvus 3.0.1 o versioni successive</strong>. Per Milvus Backup 0.5.x, consulta <a href="/docs/it/milvus_backup_api.md">la guida all'API 0.5.x</a>. Per un'installazione esistente, consulta <a href="/docs/it/milvus_backup_upgrade.md">Aggiornamento di Milvus Backup</a>.</p>
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
    </button></h2><p>Gli esempi riportati di seguito sono stati verificati con <strong>Milvus Backup 0.6.0</strong>. Scaricare ed estrarre il file binario appropriato dalla <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">versione v0.6.0</a>. Per la compilazione dal codice sorgente, seguire <a href="/docs/it/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">la guida Ottenere Milvus Backup</a>; la compilazione richiede Go 1.26 o versioni successive.</p>
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
    </button></h2><p>Creare <a href="/docs/it/milvus_backup_0_6_cli.md#Prepare-configuration-file">un file</a>` <code translate="no">configs/backup.yaml</code> ` utilizzando l’esempio v2 riportato in <a href="/docs/it/milvus_backup_0_6_cli.md#Prepare-configuration-file">Preparare il file di configurazione</a>. Configurare l’accesso a Milvus, allo storage dell’istanza e alla destinazione del backup. Il server Milvus deve inoltre poter accedere allo storage di backup per le operazioni di snapshot.</p>
<p>Se si dispone di un file v1, questo rimane caricabile. Consultare la sezione " <a href="/docs/it/milvus_backup_upgrade.md#Migrate-the-configuration">Migrazione della configurazione</a> " prima di modificarne lo schema o le variabili d’ambiente.</p>
<p>Dalla directory contenente il file binario, esaminare la configurazione e verificare la connettività:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Proseguire quando il controllo di connettività riporta il messaggio " <code translate="no">Success!</code>".</p>
<h2 id="Start-up-the-API-server" class="common-anchor-header">Avvia il server API<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>Avvia il servizio con la configurazione che hai verificato:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>La porta predefinita è 8080. Per scegliere un'altra porta, utilizzare <code translate="no">-p</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 18080 --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Eseguire solo uno di questi comandi per un determinato servizio. Gli esempi riportati di seguito utilizzano la porta 8080; modificare gli URL se è stata selezionata un'altra porta. Swagger UI è disponibile all'indirizzo <code translate="no">http://localhost:8080/api/v1/docs/index.html</code>.</p>
<p>Mantenere il servizio in esecuzione durante il polling delle attività. Gli ID delle attività e lo stato di avanzamento in tempo reale appartengono al processo del servizio; il backup persistente rimane nell’object storage anche dopo l’arresto del processo.</p>
<h2 id="Prepare-data" class="common-anchor-header">Preparazione dei dati<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizza una raccolta esistente denominata <code translate="no">coll</code> oppure crea la raccolta di test con 256 entità descritta in <a href="/docs/it/snapshot-backup-and-restore.md#Prepare-sample-data">Preparazione dei dati di esempio</a>. Modifica i nomi delle raccolte nelle richieste se utilizzi i tuoi dati. Mantieni invariati i dati di test durante la verifica del risultato.</p>
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
    </button></h2><p>Inviare una richiesta di backup asincrona:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;]
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>La risposta include un <code translate="no">requestId</code>. L'invio non implica che il backup sia completato. Copiare tale valore in <code translate="no">backup_id</code> ed eseguire il polling:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_backup?backup_id=BACKUP_REQUEST_ID&amp;backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Attendere che <code translate="no">data.state_code</code> diventi <code translate="no">2</code>. L'API utilizza i seguenti stati delle attività:</p>
<table>
<thead>
<tr><th><code translate="no">state_code</code></th><th>Significato</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">0</code></td><td>Iniziale</td></tr>
<tr><td><code translate="no">1</code></td><td>In esecuzione</td></tr>
<tr><td><code translate="no">2</code></td><td>Successo</td></tr>
<tr><td><code translate="no">3</code></td><td>Fallito</td></tr>
<tr><td><code translate="no">4</code></td><td>Timeout</td></tr>
</tbody>
</table>
<p>Verificare sia la risposta che lo stato dell'attività. Il solo codice HTTP 200 non è sufficiente: un valore diverso da zero per il campo " <code translate="no">code</code> " indica un errore. Una risposta riuscita può omettere il campo " <code translate="no">code</code> " poiché il suo valore è zero. Se un'attività fallisce o va in timeout, controllare i dettagli della risposta e il log del server prima di ripristinare da quel backup.</p>
<p>Elenca i backup archiviati ed esamina il backup completato in base al nome:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/list&#x27;
curl &#x27;http://localhost:8080/api/v1/get_backup?backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">get_backup</code> restituisce metadati JSON, incluso <code translate="no">collection_backups</code>; <strong>non</strong> scarica i file di backup. Per un backup creato da un altro processo, una query basata solo sul nome può restituire metadati senza lo stato di avanzamento dell’attività in corso. Utilizzare l’ID attività dalla risposta di creazione del servizio corrente quando si monitora un backup attivo.</p>
<p>Il formato predefinito è <code translate="no">auto</code>, che seleziona lo snapshot su Milvus 3.0. Per richiedere esplicitamente il binlog, aggiungere <code translate="no">&quot;format&quot;: &quot;binlog&quot;</code> al corpo della richiesta create. Le impostazioni predefinite della CLI <code translate="no">--for</code> non costituiscono un campo della richiesta HTTP.</p>
<p>Per conservare o spostare il backup, copiare l’intera directory nell’object storage. Consultare la <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">guida al trasferimento della versione 0.6.0</a>.</p>
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
    </button></h2><p>Assicurarsi che <code translate="no">coll_bak</code> non esista già. Inviare una richiesta di ripristino con un suffisso:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;_bak&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Il campo HTTP ` <code translate="no">collection_names</code> ` seleziona i nomi <strong>presenti nel backup</strong>, prima che venga applicato il suffisso. Questa richiesta seleziona ` <code translate="no">coll</code> ` e crea ` <code translate="no">coll_bak</code>`. L’opzione ` <code translate="no">--filter</code> ` della CLI, invece, trova i nomi di destinazione dopo la ridenominazione; non sostituire ` <code translate="no">coll_bak</code> ` in questo campo HTTP.</p>
<p>Copiare <code translate="no">data.id</code> dalla risposta di ripristino e interrogare l’attività:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_restore?id=RESTORE_TASK_ID&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Attendere che <code translate="no">data.state_code: 2</code> sia disponibile e controllare <code translate="no">collection_restore_tasks</code> per verificare la presenza della raccolta di destinazione prevista. Un’attività inviata non costituisce ancora un ripristino verificato.</p>
<h3 id="Restore-with-the-original-name" class="common-anchor-header">Ripristino con il nome originale<button data-href="#Restore-with-the-original-name" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizza un'istanza di destinazione in cui <code translate="no">coll</code> non esista. Avvia un servizio API di backup separato configurato per quella destinazione e la posizione di backup completata, quindi invia questa richiesta al servizio di destinazione:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Interroga <code translate="no">get_restore</code> sullo stesso servizio utilizzando l’ID dell’attività restituito. Configura <code translate="no">milvus.*</code> per la destinazione del ripristino e <code translate="no">backup.storage</code> per il backup esistente. Vedi <a href="/docs/it/milvus_backup_0_6_cli.md#Prepare-configuration-file">Preparare il file di configurazione</a>.</p>
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
    </button></h2><p>Una volta completata con successo l’attività di ripristino, connettersi all’istanza Milvus di destinazione e verificare che la raccolta e i dati previsti siano presenti. Per la raccolta di test con 256 entità, utilizzare i controlli completi su scalari, vettori e ricerche descritti in <a href="/docs/it/snapshot-backup-and-restore.md#Verify-the-result">Verifica del risultato</a>.</p>
<p>Sostituisci <code translate="no">coll_bak</code> con <code translate="no">coll</code> quando esegui il ripristino con il nome originale. Il codice di verifica legge i dati ripristinati senza eliminarli. Per i dati di produzione, esegui un confronto con una baseline acquisita al momento del backup.</p>
