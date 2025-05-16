---
id: m2m.md
summary: >-
  Questa guida fornisce un processo completo, passo dopo passo, per la
  migrazione dei dati da Milvus 1.x (incluso 0.9.x e precedenti) a Milvus 2.x.
title: Da Milvus 1.x
---
<h1 id="From-Milvus-1x" class="common-anchor-header">Da Milvus 1.x<button data-href="#From-Milvus-1x" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida fornisce un processo completo, passo dopo passo, per la migrazione dei dati da Milvus 1.x (incluso 0.9.x e precedenti) a Milvus 2.x. Seguendo questa guida, sarete in grado di trasferire in modo efficiente i vostri dati, sfruttando le funzionalità avanzate e le prestazioni migliorate di Milvus 2.x.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>Versioni software</strong>:<ul>
<li>Milvus di origine: da 0.9.x a 1.x</li>
<li>Milvus di destinazione: 2.x</li>
</ul></li>
<li><strong>Strumenti necessari</strong>:<ul>
<li>Strumento di<a href="https://github.com/zilliztech/milvus-migration">migrazione Milvus</a>. Per i dettagli sull'installazione, fate riferimento a <a href="/docs/it/v2.4.x/milvusdm_install.md">Installare lo strumento di migrazione</a>.</li>
</ul></li>
</ul>
<h2 id="Export-metadata-of-the-source-Milvus-installation" class="common-anchor-header">Esportazione dei metadati dell'installazione Milvus di partenza<button data-href="#Export-metadata-of-the-source-Milvus-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Per preparare i dati di migrazione per Milvus 0.9.x fino a 1.x, interrompere il Milvus di origine o almeno interrompere l'esecuzione di operazioni DML in esso.</p>
<ol>
<li><p>Esportare i metadati dell'installazione Milvus di origine in <code translate="no">meta.json</code>.</p>
<ul>
<li>Per le installazioni che utilizzano MySQL come backend, eseguire</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -m <span class="hljs-string">&quot;user:password@tcp(adderss)/milvus?charset=utf8mb4&amp;parseTime=True&amp;loc=Local&quot;</span> -o outputDir
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Per le installazioni che usano SQLite come backend, eseguire</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -s /milvus/db/meta.sqlite -o outputDir
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Copiare la cartella <code translate="no">tables</code> dell'installazione Milvus, quindi spostare sia la cartella <code translate="no">meta.json</code> che la cartella <code translate="no">tables</code> in una cartella vuota.</p>
<p>Una volta eseguito questo passaggio, la struttura della cartella vuota dovrebbe apparire come segue:</p>
<pre><code translate="no">migration_data
├── meta.json
└── tables
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Caricare la cartella preparata nel passaggio precedente su un bucket di archiviazione a blocchi S3 o utilizzare direttamente questa cartella locale nella sezione successiva.</p></li>
</ol>
<h2 id="Configure-the-migration-file" class="common-anchor-header">Configurare il file di migrazione<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Salvare il file di configurazione della migrazione di esempio come <code translate="no">migration.yaml</code> e modificare le configurazioni in base alle condizioni reali. Il file di configurazione può essere collocato in qualsiasi directory locale.</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: milvus1x
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 16
meta:
  mode: <span class="hljs-built_in">local</span>
  localFile: /outputDir/test/meta.json
<span class="hljs-built_in">source</span>:
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    tablesDir: /db/tables/
target:
  mode: remote
  remote:
    outputDir: <span class="hljs-string">&quot;migration/test/xx&quot;</span>
    ak: xxxx
    sk: xxxx
    cloud: aws
    region: us-west-2
    bucket: xxxxx
    useIAM: <span class="hljs-literal">true</span>
    checkBucket: <span class="hljs-literal">false</span>
  milvus2x:
    endpoint: <span class="hljs-string">&quot;{yourMilvus2_xServerAddress}:{port}&quot;</span>
    username: xxxx
    password: xxxx
<button class="copy-code-btn"></button></code></pre>
<p>La tabella seguente descrive i parametri del file di configurazione di esempio. Per un elenco completo delle configurazioni, consultare <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#migrationyaml-reference">Milvus Migration: Milvus1.x a Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>La concurrency dei thread del dumper.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>La modalità operativa del lavoro di migrazione. Impostato su <code translate="no">milvus1x</code> quando si migra da Milvus 1.x.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Dimensione del buffer da leggere da Milvus 1.x in ogni batch. Unità: KB.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>Dimensione del buffer da scrivere su Milvus 2.x in ogni batch. Unità: KB.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">loader</code></p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">loader.worker.limit</code></td><td>La concurrency dei thread del caricatore.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Specifica da dove viene letto il file meta.json. Valori validi: <code translate="no">local</code>, <code translate="no">remote</code>, <code translate="no">mysql</code>, <code translate="no">sqlite</code>.</td></tr>
<tr><td><code translate="no">meta.localFile</code></td><td>Percorso della directory locale in cui risiede il file <code translate="no">meta.json</code>. Questa configurazione è usata solo quando <code translate="no">meta.mode</code> è impostato su <code translate="no">local</code>. Per le altre configurazioni dei meta, fare riferimento a <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#meta">README_1X</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>Specifica da dove vengono letti i file sorgente. Valori validi:<br/>- <code translate="no">local</code>: legge i file da un disco locale.<br/>- <code translate="no">remote</code>: legge i file da un archivio remoto.</td></tr>
<tr><td><code translate="no">source.local.tablesDir</code></td><td>Il percorso della directory in cui si trovano i file di origine. Ad esempio, <code translate="no">/db/tables/</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>Percorso di memorizzazione dei file scaricati. Valori validi:<br/>- <code translate="no">local</code>: memorizzazione dei file di dump su dischi locali.<br/>- <code translate="no">remote</code>: memorizzazione dei file di dump su object storage.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Percorso della directory di output nel bucket del cloud storage.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Chiave di accesso per lo storage Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Chiave segreta per lo storage Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Fornitore del servizio di cloud storage. Valori di esempio: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Regione di archiviazione cloud. Può essere un valore qualsiasi se si usa MinIO locale.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Nome del bucket per la memorizzazione dei dati. Il valore deve essere lo stesso della configurazione in Milvus 2.x. Per ulteriori informazioni, consultare <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Configurazioni di sistema</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Se utilizzare un ruolo IAM per la connessione.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Se verificare se il bucket specificato esiste nell'archivio oggetti.</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Indirizzo del server Milvus di destinazione.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Nome utente per il server Milvus 2.x. Questo parametro è necessario se l'autenticazione utente è abilitata per il server Milvus. Per ulteriori informazioni, consultare <a href="https://milvus.io/docs/authenticate.md">Abilita l'autenticazione</a>.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Password per il server Milvus 2.x. Questo parametro è necessario se l'autenticazione dell'utente è abilitata per il vostro server Milvus. Per ulteriori informazioni, consultare <a href="https://milvus.io/docs/authenticate.md">Abilita autenticazione</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">Avviare l'attività di migrazione<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Avviare l'attività di migrazione con il seguente comando. Sostituire <code translate="no">{YourConfigFilePath}</code> con la directory locale in cui risiede il file di configurazione <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  dump  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Il comando precedente converte i dati di origine di Milvus 1.x in file NumPy, quindi utilizza l'operazione <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a> per scrivere i dati nel bucket di destinazione.</p></li>
<li><p>Una volta generati i file NumPy, importarli in Milvus 2.x con il seguente comando. Sostituire <code translate="no">{YourConfigFilePath}</code> con la directory locale in cui risiede il file di configurazione <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  load  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Verify-the-result" class="common-anchor-header">Verifica del risultato<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta eseguita l'attività di migrazione, è possibile effettuare chiamate API o utilizzare Attu per visualizzare il numero di entità migrate. Per ulteriori informazioni, consultare <a href="https://github.com/zilliztech/attu">Attu</a> e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
