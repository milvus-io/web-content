---
id: milvus_backup_cli.md
summary: Scopri come utilizzare Milvus Backup tramite CLI
title: >-
  Backup e ripristino dei dati tramite comandiCompatible with Milvus Backup
  0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">Backup e ripristino dei dati tramite comandi<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>Per i flussi di lavoro attuali, consultare la <a href="/docs/it/milvus_backup_0_6_cli.md">guida alla CLI</a> o <a href="/docs/it/milvus_backup_upgrade.md">eseguire l'aggiornamento dalla versione 0.5.x</a>. Verificare la <a href="/docs/it/milvus_backup_overview.md#Compatibility-matrix">matrice di compatibilità</a> per le versioni supportate del server Milvus.</p>
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
    </button></h2><p>Se si esegue un'istanza locale vuota di Milvus sulla porta predefinita, utilizzare gli script Python di esempio per generare alcuni dati nell'istanza. È possibile apportare le modifiche necessarie agli script in base alle proprie esigenze.</p>
<p>Scarica gli <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">script</a>. Quindi esegui gli script per generare i dati. Assicurati che <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, l'SDK Python ufficiale di Milvus, sia stato installato.</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Questo passaggio è facoltativo. Se lo salti, assicurati di disporre già di alcuni dati nella tua istanza di Milvus.</p>
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
    </button></h2><p>Si noti che l'esecuzione di Milvus Backup su un'istanza Milvus normalmente non influisce sul funzionamento dell'istanza. L'istanza Milvus rimane pienamente funzionante durante il backup o il ripristino.</p>
<div class="tab-wrapper"></div>
<p>Eseguite il seguente comando per creare un backup.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>Una volta eseguito il comando, è possibile verificare i file di backup nel bucket specificato nelle impostazioni di Minio. Nello specifico, è possibile scaricarli utilizzando <strong>la console di Minio</strong> o il client <strong>mc</strong>.</p>
<p>Per scaricarli dalla <a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">console di Minio</a>, accedi alla console di Minio, individua il bucket specificato in <code translate="no">minio.backupBucketName</code>, seleziona i file nel bucket e fai clic su <strong>«Download»</strong> per scaricarli.</p>
<p>Se si preferisce <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">il client mc</a>, procedere come segue:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
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
<p>È possibile eseguire il comando ` <code translate="no">restore</code> ` con il flag ` <code translate="no">-s</code> ` per creare una nuova collezione ripristinando i dati dal backup:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p>Il flag ` <code translate="no">-s</code> ` consente di impostare un suffisso per la nuova collezione da creare. Il comando sopra riportato creerà una nuova collezione denominata ` <strong>hello_milvus_recover</strong> ` nella vostra istanza di Milvus.</p>
<p>Se si preferisce ripristinare la collezione di cui è stato eseguito il backup senza modificarne il nome, eliminare la collezione prima di ripristinarla dal backup. È ora possibile ripulire i dati generati in <a href="#Prepare-data">"Prepare data</a> " (Prepara dati) eseguendo il comando seguente.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Quindi eseguire il comando seguente per ripristinare i dati dal backup.</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Per i dati di esempio temporanei creati in precedenza, lo script a monte indicizza ed esegue query su <code translate="no">hello_milvus_recover</code> e <code translate="no">hello_milvus2_recover</code>, quindi <strong>elimina entrambe le collezioni ripristinate</strong>. Eseguirlo solo dopo aver ripristinato entrambe le collezioni di esempio con <code translate="no">_recover</code>. Per i propri dati, effettuare un confronto con la linea di base al momento del backup senza utilizzare questo script di pulizia.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/verify_data.py -o example/verify_data.py
python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Si noti che lo script sopra riportato presuppone che sia stato eseguito il comando <code translate="no">restore</code> con il flag <code translate="no">-s</code> e che il suffisso sia impostato su <code translate="no">_recover</code>. È possibile apportare le modifiche necessarie allo script in base alle proprie esigenze.</p>
