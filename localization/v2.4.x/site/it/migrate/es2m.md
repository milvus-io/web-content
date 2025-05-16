---
id: es2m.md
summary: >-
  Questa guida fornisce un processo completo, passo dopo passo, per la
  migrazione dei dati da Elasticsearch a Milvus 2.x.
title: Da Elasticsearch
---
<h1 id="From-Elasticsearch" class="common-anchor-header">Da Elasticsearch<button data-href="#From-Elasticsearch" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida fornisce un processo completo, passo dopo passo, per la migrazione dei dati da Elasticsearch a Milvus 2.x. Seguendo questa guida, sarete in grado di trasferire in modo efficiente i vostri dati, sfruttando le funzionalità avanzate di Milvus 2.x e le prestazioni migliorate.</p>
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
<li>Fonte Elasticsearch: 7.x o 8.x</li>
<li>Milvus di destinazione: 2.x</li>
<li>Per i dettagli sull'installazione, fare riferimento a <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html">Installazione di Elasticsearch</a> e <a href="https://milvus.io/docs/install_standalone-docker.md">Installazione di Milvus</a>.</li>
</ul></li>
<li><strong>Strumenti necessari</strong>:<ul>
<li>Strumento di<a href="https://github.com/zilliztech/milvus-migration">migrazione Milvus</a>. Per i dettagli sull'installazione, fare riferimento a <a href="/docs/it/v2.4.x/milvusdm_install.md">Installare lo strumento di migrazione</a>.</li>
</ul></li>
<li><strong>Tipi di dati supportati per la migrazione</strong>: I campi da migrare dall'indice Elasticsearch di origine sono dei seguenti tipi: <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">keyword</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">text</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>. I tipi di dati non elencati non sono attualmente supportati per la migrazione. Per informazioni dettagliate sulle <a href="#field-mapping-reference">mappature</a> dei dati tra le raccolte Milvus e gli indici Elasticsearch, consultare il <a href="#field-mapping-reference">riferimento</a> alla <a href="#field-mapping-reference">mappatura dei campi</a>.</li>
<li><strong>Requisiti dell'indice Elasticsearch</strong>:<ul>
<li>L'indice Elasticsearch di origine deve contenere un campo vettoriale del tipo <code translate="no">dense_vector</code>. La migrazione non può essere avviata senza un campo vettoriale.</li>
</ul></li>
</ul>
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
    </button></h2><p>Salvate il file di configurazione della migrazione di esempio come <code translate="no">migration.yaml</code> e modificate le configurazioni in base alle vostre condizioni reali. Il file di configurazione può essere collocato in qualsiasi directory locale.</p>
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    workMode: <span class="hljs-string">&quot;elasticsearch&quot;</span> <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: <span class="hljs-number">2500</span> <span class="hljs-comment"># buffer size to read from Elasticsearch in each batch. A value ranging from 2000 to 4000 is recommended.</span>
meta: <span class="hljs-comment"># meta configs for the source Elasticsearch index and target Milvus 2.x collection.</span>
  mode: <span class="hljs-string">&quot;config&quot;</span> <span class="hljs-comment"># specifies the source for meta configs. currently, onlly `config` is supported.</span>
  version: <span class="hljs-string">&quot;8.9.1&quot;</span>
  index: <span class="hljs-string">&quot;qatest_index&quot;</span> <span class="hljs-comment"># identifies the Elasticsearch index to migrate data from.</span>
  fields: <span class="hljs-comment"># fields within the Elasticsearch index to be migrated.</span>
  - name: <span class="hljs-string">&quot;my_vector&quot;</span> <span class="hljs-comment"># name of the Elasticsearch field.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;dense_vector&quot;</span> <span class="hljs-comment"># data type of the Elasticsearch field.</span>
    dims: <span class="hljs-number">128</span> <span class="hljs-comment"># dimension of the vector field. required only when `type` is `dense_vector`.</span>
  - name: <span class="hljs-string">&quot;id&quot;</span>
    pk: true <span class="hljs-comment"># specifies if the field serves as a primary key.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;long&quot;</span>
  - name: <span class="hljs-string">&quot;num&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;integer&quot;</span>
  - name: <span class="hljs-string">&quot;double1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;double&quot;</span>
  - name: <span class="hljs-string">&quot;text1&quot;</span>
    maxLen: <span class="hljs-number">1000</span> <span class="hljs-comment"># max. length of data fields. required only for `keyword` and `text` data types.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;text&quot;</span>
  - name: <span class="hljs-string">&quot;bl1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;boolean&quot;</span>
  - name: <span class="hljs-string">&quot;float1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;float&quot;</span>
  milvus: <span class="hljs-comment"># configs specific to creating the collection in Milvus 2.x</span>
    collection: <span class="hljs-string">&quot;Collection_01&quot;</span> <span class="hljs-comment"># name of the Milvus collection. defaults to the Elasticsearch index name if not specified.</span>
    closeDynamicField: false <span class="hljs-comment"># specifies whether to disable the dynamic field in the collection. defaults to `false`.</span>
    shardNum: <span class="hljs-number">2</span> <span class="hljs-comment"># number of shards to be created in the collection.</span>
    consistencyLevel: Strong <span class="hljs-comment"># consistency level for Milvus collection.</span>
source: <span class="hljs-comment"># connection configs for the source Elasticsearch server</span>
  es:
    urls:
    - <span class="hljs-string">&quot;http://10.15.1.***:9200&quot;</span> <span class="hljs-comment"># address of the source Elasticsearch server.</span>
    username: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># username for the Elasticsearch server.</span>
    password: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># password for the Elasticsearch server.</span>
target:
  mode: <span class="hljs-string">&quot;remote&quot;</span> <span class="hljs-comment"># storage location for dumped files. valid values: `remote` and `local`.</span>
  remote: <span class="hljs-comment"># configs for remote storage</span>
    outputDir: <span class="hljs-string">&quot;migration/milvus/test&quot;</span> <span class="hljs-comment"># output directory path in the cloud storage bucket.</span>
    cloud: <span class="hljs-string">&quot;aws&quot;</span> <span class="hljs-comment"># cloud storage service provider. Examples: `aws`, `gcp`, `azure`, etc.</span>
    region: <span class="hljs-string">&quot;us-west-2&quot;</span> <span class="hljs-comment"># region of the cloud storage; can be any value if using local Minio.</span>
    bucket: <span class="hljs-string">&quot;zilliz-aws-us-****-*-********&quot;</span> <span class="hljs-comment"># bucket name for storing data; must align with configs in milvus.yaml for Milvus 2.x.</span>
    useIAM: true <span class="hljs-comment"># whether to use an IAM Role for connection.</span>
    checkBucket: false <span class="hljs-comment"># checks if the specified bucket exists in the storage.</span>
  milvus2x: <span class="hljs-comment"># connection configs for the target Milvus 2.x server</span>
    endpoint: <span class="hljs-string">&quot;http://10.102.*.**:19530&quot;</span> <span class="hljs-comment"># address of the target Milvus server.</span>
    username: <span class="hljs-string">&quot;****&quot;</span> <span class="hljs-comment"># username for the Milvus 2.x server.</span>
    password: <span class="hljs-string">&quot;******&quot;</span> <span class="hljs-comment"># password for the Milvus 2.x server.</span>
<button class="copy-code-btn"></button></code></pre>
<p>La tabella seguente descrive i parametri del file di configurazione di esempio. Per un elenco completo delle configurazioni, consultare <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_ES.md#migrationyaml-reference">Milvus Migration: Elasticsearch a Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Modalità operativa del lavoro di migrazione. Impostare <code translate="no">elasticsearch</code> quando si migra da indici Elasticsearch.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Dimensione del buffer da leggere da Elasticsearch in ogni batch. Unità: KB.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Specifica l'origine delle metaconfigurazioni. Attualmente è supportato solo <code translate="no">config</code>.</td></tr>
<tr><td><code translate="no">meta.index</code></td><td>Identifica l'indice Elasticsearch da cui migrare i dati.</td></tr>
<tr><td><code translate="no">meta.fields</code></td><td>Campi dell'indice Elasticsearch da migrare.</td></tr>
<tr><td><code translate="no">meta.fields.name</code></td><td>Nome del campo Elasticsearch.</td></tr>
<tr><td><code translate="no">meta.fields.maxLen</code></td><td>Lunghezza massima del campo. Questo parametro è richiesto solo quando <code translate="no">meta.fields.type</code> è <code translate="no">keyword</code> o <code translate="no">text</code>.</td></tr>
<tr><td><code translate="no">meta.fields.pk</code></td><td>Specifica se il campo funge da chiave primaria.</td></tr>
<tr><td><code translate="no">meta.fields.type</code></td><td>Tipo di dati del campo Elasticsearch. Attualmente sono supportati i seguenti tipi di dati in Elasticsearch: <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">keyword</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">text</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>.</td></tr>
<tr><td><code translate="no">meta.fields.dims</code></td><td>Dimensione del campo vettoriale. Questo parametro è richiesto solo quando <code translate="no">meta.fields.type</code> è <code translate="no">dense_vector</code>.</td></tr>
<tr><td><code translate="no">meta.milvus</code></td><td>Configurazioni specifiche per la creazione della collezione in Milvus 2.x.</td></tr>
<tr><td><code translate="no">meta.milvus.collection</code></td><td>Nome della collezione Milvus. Se non è specificato, il nome è quello dell'indice Elasticsearch.</td></tr>
<tr><td><code translate="no">meta.milvus.closeDynamicField</code></td><td>Specifica se disabilitare il campo dinamico nella raccolta. L'impostazione predefinita è <code translate="no">false</code>. Per ulteriori informazioni sui campi dinamici, consultare <a href="https://milvus.io/docs/enable-dynamic-field.md#Enable-Dynamic-Field">Abilita campo dinamico</a>.</td></tr>
<tr><td><code translate="no">meta.milvus.shardNum</code></td><td>Numero di shard da creare nella raccolta. Per ulteriori informazioni sui frammenti, consultare <a href="https://milvus.io/docs/glossary.md#Shard">Terminologia</a>.</td></tr>
<tr><td><code translate="no">meta.milvus.consistencyLevel</code></td><td>Livello di consistenza della collezione in Milvus. Per ulteriori informazioni, consultare <a href="https://milvus.io/docs/consistency.md">Consistenza</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.es</code></td><td>Configurazioni di connessione per il server Elasticsearch di origine.</td></tr>
<tr><td><code translate="no">source.es.urls</code></td><td>Indirizzo del server Elasticsearch di origine.</td></tr>
<tr><td><code translate="no">source.es.username</code></td><td>Nome utente del server Elasticsearch.</td></tr>
<tr><td><code translate="no">source.es.password</code></td><td>Password del server Elasticsearch.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>Posizione di archiviazione dei file di dump. Valori validi:<br/>- <code translate="no">local</code>: archiviazione dei file di dump su dischi locali.<br/>- <code translate="no">remote</code>: archiviazione dei file di dump su object storage.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Percorso della directory di output nel bucket del cloud storage.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Fornitore del servizio di cloud storage. Valori di esempio: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Regione di archiviazione cloud. Può essere un valore qualsiasi se si usa MinIO locale.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Nome del bucket per la memorizzazione dei dati. Il valore deve essere lo stesso della configurazione in Milvus 2.x. Per ulteriori informazioni, consultare <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Configurazioni di sistema</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Se utilizzare un ruolo IAM per la connessione.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Controllare se il bucket specificato esiste nell'archivio oggetti.</td></tr>
<tr><td><code translate="no">target.milvus2x</code></td><td>Configurazioni di connessione per il server Milvus 2.x di destinazione.</td></tr>
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
    </button></h2><p>Avviare l'attività di migrazione con il seguente comando. Sostituire <code translate="no">{YourConfigFilePath}</code> con la directory locale in cui risiede il file di configurazione <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Di seguito è riportato un esempio di output del log di migrazione andato a buon fine:</p>
<pre><code translate="no" class="language-bash">[task/load_base_task.go:94] [<span class="hljs-string">&quot;[LoadTasker] Dec Task Processing--------------&gt;&quot;</span>] [Count=0] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[task/load_base_task.go:76] [<span class="hljs-string">&quot;[LoadTasker] Progress Task ---------------&gt;&quot;</span>] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[dbclient/cus_field_milvus2x.go:86] [<span class="hljs-string">&quot;[Milvus2x] begin to ShowCollectionRows&quot;</span>]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static: &quot;</span>] [collection=test_mul_field4_rename1] [beforeCount=50000] [afterCount=100000] [increase=50000]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static Total&quot;</span>] [<span class="hljs-string">&quot;Total Collections&quot;</span>=1] [beforeTotalCount=50000] [afterTotalCount=100000] [totalIncrease=50000]
[migration/es_starter.go:25] [<span class="hljs-string">&quot;[Starter] migration ES to Milvus finish!!!&quot;</span>] [Cost=80.009174459]
[starter/starter.go:106] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=80.00928425]
[cleaner/remote_cleaner.go:27] [<span class="hljs-string">&quot;[Remote Cleaner] Begin to clean files&quot;</span>] [bucket=a-bucket] [rootPath=testfiles/output/zwh/migration]
[cmd/start.go:32] [<span class="hljs-string">&quot;[Cleaner] clean file success!&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
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
<h2 id="Field-mapping-reference" class="common-anchor-header">Riferimento alla mappatura dei campi<button data-href="#Field-mapping-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>La tabella seguente permette di capire come i tipi di campo degli indici Elasticsearch sono mappati con i tipi di campo delle collezioni Milvus.</p>
<p>Per ulteriori informazioni sui tipi di dati supportati in Milvus, consultare <a href="https://milvus.io/docs/schema.md#Supported-data-types">Tipi di dati supportati</a>.</p>
<table>
<thead>
<tr><th>Tipo di campo Elasticsearch</th><th>Tipo di campo Milvus</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td>vettore_denso</td><td>Vettore fluttuante</td><td>Le dimensioni del vettore rimangono invariate durante la migrazione.</td></tr>
<tr><td>parola chiave</td><td>VarChar</td><td>Imposta la lunghezza massima (da 1 a 65.535). Le stringhe che superano questo limite possono causare errori di migrazione.</td></tr>
<tr><td>testo</td><td>VarChar</td><td>Impostare la lunghezza massima (da 1 a 65.535). Le stringhe che superano il limite possono causare errori di migrazione.</td></tr>
<tr><td>lungo</td><td>Int64</td><td>-</td></tr>
<tr><td>intero</td><td>Int32</td><td>-</td></tr>
<tr><td>doppio</td><td>doppio</td><td>-</td></tr>
<tr><td>galleggiante</td><td>Galleggiante</td><td>-</td></tr>
<tr><td>booleano</td><td>booleano</td><td>-</td></tr>
<tr><td>oggetto</td><td>JSON</td><td>-</td></tr>
</tbody>
</table>
