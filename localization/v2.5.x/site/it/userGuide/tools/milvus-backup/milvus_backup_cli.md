---
id: milvus_backup_cli.md
summary: Imparare a usare Milvus Backup tramite CLI
title: Backup e ripristino dei dati con i comandi
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">Backup e ripristino dei dati con i comandi<button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup offre funzioni di backup e ripristino dei dati per garantire la sicurezza dei vostri dati Milvus.</p>
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
    </button></h2><p>È possibile scaricare il binario compilato o creare dal sorgente.</p>
<p>Per scaricare il binario compilato, andare alla pagina dei <a href="https://github.com/zilliztech/milvus-backup/releases">rilasci</a>, dove si trovano tutti i rilasci ufficiali. Ricordate di utilizzare sempre i binari della release contrassegnata come <strong>Ultima</strong>.</p>
<p>Per compilare dal sorgente, procedere come segue:</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> git@github.com:zilliztech/milvus-backup.git
go get
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
    </button></h2><p>Scaricare il <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/master/configs/backup.yaml">file di configurazione di esempio</a> e adattarlo alle proprie esigenze.</p>
<p>Creare quindi una cartella accanto al binario di Milvus Backup scaricato o compilato, denominarla <code translate="no">configs</code> e collocare il file di configurazione all'interno della cartella <code translate="no">configs</code>.</p>
<p>La struttura della cartella dovrebbe essere simile alla seguente:</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>Poiché Milvus Backup non può eseguire il backup dei dati in un percorso locale, assicuratevi che le impostazioni di Minio siano corrette quando modificate il file di configurazione.</p>
<div class="alert note">
<p>Il nome del bucket predefinito di Minio varia a seconda del modo in cui si installa Milvus. Quando si apportano modifiche alle impostazioni di Minio, fare riferimento alla seguente tabella.</p>
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
    </button></h2><p>Se si esegue un'istanza locale di Milvus vuota sulla porta predefinita, utilizzare gli script Python di esempio per generare alcuni dati nella propria istanza. Siate liberi di apportare le modifiche necessarie agli script per adattarli alle vostre esigenze.</p>
<p>Ottenere gli <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/main/example/prepare_data.py">script</a>. Eseguire gli script per generare i dati. Assicurarsi che <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, l'SDK Python ufficiale di Milvus, sia stato installato.</p>
<pre><code translate="no" class="language-shell">python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Questo passo è facoltativo. Se si salta questo passaggio, assicurarsi di avere già dei dati nella propria istanza Milvus.</p>
<h2 id="Back-up-data" class="common-anchor-header">Backup dei dati<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Si noti che l'esecuzione di Milvus Backup su un'istanza Milvus non influisce normalmente sul funzionamento dell'istanza. L'istanza Milvus è completamente funzionante durante il backup o il ripristino.</p>
<div class="tab-wrapper"></div>
<p>Eseguire il seguente comando per creare un backup.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n &lt;backup_name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Una volta eseguito il comando, è possibile controllare i file di backup nel bucket specificato nelle impostazioni di Minio. In particolare, è possibile scaricarli utilizzando <strong>Minio Console</strong> o il client <strong>mc</strong>.</p>
<p>Per scaricare da <a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">Minio Console</a>, accedere a Minio Console, individuare il bucket specificato in <code translate="no">minio.address</code>, selezionare i file nel bucket e fare clic su <strong>Download</strong> per <strong>scaricarli</strong>.</p>
<p>Se si preferisce <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">il client mc</a>, procedere come segue:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># configure a Minio host</span>
mc alias <span class="hljs-built_in">set</span> my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;

<span class="hljs-comment"># List the available buckets</span>
mc ls my_minio

<span class="hljs-comment"># Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>A questo punto, è possibile salvare i file di backup in un luogo sicuro per ripristinarli in futuro, oppure caricarli su <a href="https://cloud.zilliz.com">Zilliz Cloud</a> per creare un database vettoriale gestito con i propri dati. Per maggiori dettagli, consultare <a href="https://zilliz.com/doc/migrate_from_milvus-2x">Migrazione da Milvus a Zilliz Cloud</a>.</p>
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
<p>È possibile eseguire il comando <code translate="no">restore</code> con il flag <code translate="no">-s</code> per creare una nuova collezione ripristinando i dati dal backup:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p>Il flag <code translate="no">-s</code> consente di impostare un suffisso per la nuova raccolta da creare. Il comando precedente creerà una nuova raccolta chiamata <strong>hello_milvus_recover</strong> nella vostra istanza Milvus.</p>
<p>Se si preferisce ripristinare la raccolta di cui si è fatto il backup senza cambiarne il nome, si può eliminare la raccolta prima di ripristinarla dal backup. Ora è possibile pulire i dati generati in <a href="#Prepare-data">Prepare data</a> eseguendo il comando seguente.</p>
<pre><code translate="no" class="language-shell">python example/clean_data.py
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
    </button></h2><p>Una volta completato il ripristino, è possibile verificare i dati ripristinati indicizzando la raccolta ripristinata come segue:</p>
<pre><code translate="no" class="language-shell">python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Si noti che lo script precedente presuppone che sia stato eseguito il comando <code translate="no">restore</code> con il flag <code translate="no">-s</code> e che il suffisso sia impostato su <code translate="no">-recover</code>. È possibile apportare le modifiche necessarie allo script per adattarlo alle proprie esigenze.</p>
