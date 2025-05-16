---
id: f2m.md
title: Da Faiss
related_key: 'Faiss, migrate, import'
summary: Scoprite come migrare i dati Faiss a Milvus.
---
<h1 id="From-Faiss" class="common-anchor-header">Da Faiss<button data-href="#From-Faiss" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida fornisce un processo completo, passo dopo passo, per la migrazione dei dati da Faiss a Milvus 2.x. Seguendo questa guida, sarete in grado di trasferire in modo efficiente i vostri dati, sfruttando le funzionalità avanzate di Milvus 2.x e le prestazioni migliorate.</p>
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
<li><strong>Versioni del software</strong>:<ul>
<li>Fonte Faiss</li>
<li>Milvus di destinazione: 2.x</li>
<li>Per i dettagli sull'installazione, vedere <a href="https://github.com/facebookresearch/faiss/blob/main/INSTALL.md">Installazione di Faiss</a> e <a href="https://milvus.io/docs/install_standalone-docker.md">Installazione di Milvus</a>.</li>
</ul></li>
<li><strong>Strumenti necessari</strong>:<ul>
<li>Strumento di<a href="https://github.com/zilliztech/milvus-migration">migrazione Milvus</a>. Per i dettagli sull'installazione, vedere <a href="/docs/it/v2.4.x/milvusdm_install.md">Installazione dello strumento di migrazione</a>.</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration" class="common-anchor-header">Configurare la migrazione<button data-href="#Configure-the-migration" class="anchor-icon" translate="no">
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
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: faiss    <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 2
<span class="hljs-built_in">source</span>: <span class="hljs-comment"># configs for the source Faiss index.</span>
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    faissFile: ./testfiles/faiss/faiss_ivf_flat.index

target: <span class="hljs-comment"># configs for the target Milvus collection.</span>
  create:
    collection:
      name: test1w
      shardsNums: 2
      dim: 256
      metricType: L2

  mode: remote
  remote:
    outputDir: testfiles/output/
    cloud: aws
    endpoint: 0.0.0.0:9000
    region: ap-southeast-1
    bucket: a-bucket
    ak: minioadmin
    sk: minioadmin
    useIAM: <span class="hljs-literal">false</span>
    useSSL: <span class="hljs-literal">false</span>
    checkBucket: <span class="hljs-literal">true</span>
  milvus2x:
    endpoint: localhost:19530
    username: xxxxx
    password: xxxxx

<button class="copy-code-btn"></button></code></pre>
<p>La tabella seguente descrive i parametri del file di configurazione di esempio. Per un elenco completo delle configurazioni, consultare <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_FAISS.md#migrationyaml-reference">Milvus Migration: Faiss a Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>La concurrency dei thread di dumper.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>La modalità operativa del lavoro di migrazione. Impostare su faiss quando si migra da indici Faiss.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Dimensione del buffer da leggere da Faiss in ogni batch. Unità: KB.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>Dimensione del buffer da scrivere su Milvus in ogni batch. Unità: KB.</td></tr>
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
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>Specifica da dove vengono letti i file sorgente. Valori validi:<br/>- <code translate="no">local</code>: legge i file da un disco locale.<br/>- <code translate="no">remote</code>: legge i file da un archivio remoto.</td></tr>
<tr><td><code translate="no">source.local.faissFile</code></td><td>Il percorso della directory in cui si trovano i file di origine. Ad esempio, <code translate="no">/db/faiss.index</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.create.collection.name</code></td><td>Nome della collezione Milvus.</td></tr>
<tr><td><code translate="no">target.create.collection.shardsNums</code></td><td>Numero di frammenti da creare nella raccolta. Per ulteriori informazioni sui frammenti, consultare la sezione <a href="https://milvus.io/docs/glossary.md#Shard">Terminologia</a>.</td></tr>
<tr><td><code translate="no">target.create.collection.dim</code></td><td>Dimensione del campo vettoriale.</td></tr>
<tr><td><code translate="no">target.create.collection.metricType</code></td><td>Tipo di metrica utilizzata per misurare le somiglianze tra i vettori. Per ulteriori informazioni, consultare <a href="https://milvus.io/docs/glossary.md#Metric-type">Terminologia</a>.</td></tr>
<tr><td><code translate="no">target.mode</code></td><td>Posizione di memorizzazione dei file scaricati. Valori validi:<br/>- <code translate="no">local</code>: archiviazione dei file di dump su dischi locali.<br/>- <code translate="no">remote</code>: archiviazione dei file di dump su object storage.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Percorso della directory di output nel bucket di cloud storage.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Fornitore del servizio di cloud storage. Valori di esempio: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.endpoint</code></td><td>Punto finale dello storage Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Regione di archiviazione nel cloud. Può essere un valore qualsiasi se si usa MinIO locale.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Nome del bucket per la memorizzazione dei dati. Il valore deve essere lo stesso della configurazione di Milvus 2.x. Per ulteriori informazioni, consultare la sezione <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Configurazioni di sistema</a>.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Chiave di accesso per l'archiviazione di Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Chiave segreta per il deposito Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Se utilizzare un ruolo IAM per la connessione.</td></tr>
<tr><td><code translate="no">target.remote.useSSL</code></td><td>Abilitare o meno l'SSL quando ci si connette a Milvus 2.x. Per ulteriori informazioni, consultare <a href="https://milvus.io/docs/tls.md#Encryption-in-Transit">Crittografia in transito</a>.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Se verificare se il bucket specificato esiste nell'archivio oggetti.</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Indirizzo del server Milvus di destinazione.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Nome utente del server Milvus 2.x. Questo parametro è necessario se l'autenticazione utente è abilitata per il server Milvus. Per ulteriori informazioni, consultare <a href="https://milvus.io/docs/authenticate.md">Abilita l'autenticazione</a>.</td></tr>
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
<li><p>Avviare l'attività di migrazione con il seguente comando. Sostituire <code translate="no">{YourConfigFilePath}</code> con la directory locale dove risiede il file di configurazione <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  dump  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Il comando precedente converte i dati dell'indice Faiss in file NumPy e quindi utilizza l'operazione <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a> per scrivere i dati nel bucket di destinazione.</p></li>
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
