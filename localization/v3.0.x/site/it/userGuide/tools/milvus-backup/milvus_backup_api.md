---
id: milvus_backup_api.md
summary: Scopri come utilizzare Milvus Backup tramite API
title: Backup e ripristino dei dati tramite APICompatible with Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">Backup e ripristino dei dati tramite API<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>Per i flussi di lavoro attuali, consultare la <a href="/docs/it/milvus_backup_0_6_api.md">guida alle API HTTP</a> oppure <a href="/docs/it/milvus_backup_upgrade.md">eseguire l'aggiornamento dalla versione 0.5.x</a>. Verificare la <a href="/docs/it/milvus_backup_overview.md#Compatibility-matrix">matrice di compatibilità</a> per le versioni supportate del server Milvus.</p>
<p>Milvus Backup offre funzionalità di backup e ripristino dei dati per garantire la sicurezza dei dati Milvus.</p>
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
    </button></h2><p>È possibile scaricare il file binario compilato oppure compilarlo partendo dal codice sorgente.</p>
<p>Scaricare il file binario per il proprio sistema operativo e la propria architettura dalla <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16">versione 0.5.16</a>. Utilizzare la configurazione 0.5.16 corrispondente e gli esempi riportati in questa pagina.</p>
<p>Per compilare la versione 0.5.16 dal codice sorgente, installa Go 1.25 o versioni successive ed esegui:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.5.16 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Scarica il <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml">file di configurazione di esempio</a> e adattalo alle tue esigenze.</p>
<p>Quindi creare una cartella accanto al file binario di Milvus Backup scaricato o compilato, denominare la cartella " <code translate="no">configs</code>" e inserire il file di configurazione all'interno della cartella " <code translate="no">configs</code> ".</p>
<p>La struttura delle cartelle dovrebbe essere simile alla seguente:</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>In questo esempio si utilizza MinIO come archivio di backup. Impostare ` <code translate="no">minio.*</code> ` in modo che corrisponda all’archivio Milvus e alla destinazione di backup, inclusi indirizzi, credenziali, nomi dei bucket e percorsi radice.</p>
<div class="alert note">
<p>Il nome del bucket MinIO predefinito varia a seconda del metodo di installazione di Milvus. Quando si apportano modifiche alle impostazioni di MinIO, fare riferimento alla tabella seguente.</p>
<table>
<thead>
<tr><th>campo</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>file</td><td>file</td></tr>
</tbody>
</table>
</div>
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
    </button></h2><p>È quindi possibile avviare il server API come segue:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server
<button class="copy-code-btn"></button></code></pre>
<p>Il server API ascolta sulla porta 8080 per impostazione predefinita. È possibile modificarla eseguendolo con il flag <code translate="no">-p</code>. Per avviare il server API in ascolto sulla porta 443, procedere come segue:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>È possibile accedere all'interfaccia utente di Swagger all'indirizzo http://localhost:<port>/api/v1/docs/index.html.</p>
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
    </button></h2><p>Se si esegue un'istanza locale vuota di Milvus in ascolto sulla porta predefinita 19530, utilizzare gli script Python di esempio per generare alcuni dati nell'istanza. È possibile apportare le modifiche necessarie agli script in base alle proprie esigenze.</p>
<p>Scarica gli <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">script</a>. Quindi esegui gli script per generare i dati. Assicurati che <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, l’SDK Python ufficiale di Milvus, sia stato installato.</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Questo passaggio è facoltativo. Se lo salti, assicurati di avere già dei dati nella tua istanza di Milvus.</p>
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
    </button></h2><div class="tab-wrapper"></div>
<p>Si noti che l’esecuzione di Milvus Backup su un’istanza Milvus normalmente non influisce sul funzionamento dell’istanza. L’istanza Milvus rimane pienamente funzionante durante il backup o il ripristino.</p>
<p>Esegui il seguente comando per creare un backup. Modifica <code translate="no">collection_names</code> e <code translate="no">backup_name</code> se necessario.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
  &quot;async&quot;: true,
  &quot;backup_name&quot;: &quot;my_backup&quot;,
  &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ]
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>La richiesta di creazione è asincrona. Interroga <code translate="no">get_backup</code> utilizzando l’ <code translate="no">requestId</code> restituito come <code translate="no">backup_id</code> e attendi che <code translate="no">data.state_code</code> diventi <code translate="no">2</code> prima di procedere al ripristino.</p>
<p>È possibile elencare i backup nel bucket specificato nelle impostazioni di Minio come segue:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/list&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Recuperare i metadati del backup come segue:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Sostituire <code translate="no">backup_id</code> e <code translate="no">backup_name</code> con i valori relativi al proprio backup. Questo endpoint restituisce metadati in formato JSON, non i file di backup. Copiare l’intera directory di backup dall’object storage al momento dell’archiviazione.</p>
<p>Ora è possibile salvare i file di backup in un luogo sicuro per un eventuale ripristino futuro, oppure caricarli su <a href="https://cloud.zilliz.com">Zilliz Cloud</a> per creare un database vettoriale gestito con i propri dati. Per ulteriori dettagli, consultare la guida <a href="https://zilliz.com/doc/migrate_from_milvus-2x">"Migrazione da Milvus a Zilliz Cloud</a>".</p>
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
    </button></h2><div class="tab-wrapper"></div>
<p>È possibile richiamare il comando API di ripristino con l’opzione ` <code translate="no">collection_suffix</code> ` per creare una nuova collezione ripristinando i dati dal backup. Modificare ` <code translate="no">collection_names</code> ` e ` <code translate="no">backup_name</code> ` se necessario.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;_recover&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>L'opzione <code translate="no">collection_suffix</code> consente di impostare un suffisso per la nuova raccolta da creare. Il comando sopra riportato creerà una nuova raccolta denominata <strong>hello_milvus_recover</strong> nella propria istanza di Milvus.</p>
<p>Se si preferisce ripristinare la raccolta di cui è stato eseguito il backup senza modificarne il nome, eliminare la raccolta prima di ripristinarla dal backup. È ora possibile ripulire i dati generati in <a href="#Prepare-data">"Prepare data</a> " (Prepara <a href="#Prepare-data">dati</a> ) eseguendo il comando seguente.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Quindi eseguire il comando seguente per ripristinare i dati dal backup.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Il processo di ripristino può richiedere molto tempo a seconda delle dimensioni dei dati da ripristinare. Pertanto, gli esempi sopra riportati richiedono l’esecuzione asincrona con ` <code translate="no">&quot;async&quot;: true</code>`. È possibile verificare lo stato di un’attività di ripristino eseguendo:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Ricordarsi di sostituire <code translate="no">test_restore_id</code> con l’ <code translate="no">data.id</code> restituito dall’API di ripristino. Attendere che <code translate="no">data.state_code</code> assuma lo stato <code translate="no">2</code> prima di verificare i dati; <code translate="no">3</code> indica un errore e <code translate="no">4</code> un timeout.</p>
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
    </button></h2><p>Una volta completata con successo l'operazione, verificare che <code translate="no">hello_milvus_recover</code> esista. Creare un indice adeguato, caricare la raccolta e confrontare il numero di entità, i valori scalari e vettoriali e i risultati della ricerca con i dati di origine acquisiti prima del backup. Per un ripristino con nome originale, utilizzare invece <code translate="no">hello_milvus</code>.</p>
<p>L'esempio <code translate="no">verify_data.py</code> collegato dalla guida CLI prevede due collezioni ripristinate e le elimina al termine. Non è appropriato per questo esempio di API, che seleziona solo <code translate="no">hello_milvus</code>.</p>
