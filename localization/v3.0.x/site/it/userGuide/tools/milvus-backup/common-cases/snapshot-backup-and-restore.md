---
id: snapshot-backup-and-restore.md
summary: >-
  Eseguire il backup di una raccolta e ripristinarla con un nuovo nome nella
  stessa istanza di Milvus.
title: Backup e ripristino di uno snapshot in un'unica istanza
---
<h1 id="Snapshot-Backup-and-Restore-in-One-Instance" class="common-anchor-header">Backup e ripristino di uno snapshot in un'unica istanza<button data-href="#Snapshot-Backup-and-Restore-in-One-Instance" class="anchor-icon" translate="no">
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
    </button></h1><p>Eseguire il backup di una raccolta e ripristinarla con un nuovo nome nella stessa istanza di Milvus. Questo esempio utilizza <strong>Milvus Backup 0.6.0</strong> per creare uno snapshot di <code translate="no">coll</code> e ripristinarlo come <code translate="no">coll_bak</code> su <strong>Milvus 3.0.1 o versioni successive</strong>. Per Backup 0.5.x, utilizzare <a href="/docs/it/single-instance-backup-and-restore.md">Backup e ripristino in un'unica istanza</a>.</p>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Posizione</th><th>Istanza Milvus</th><th>Archivio oggetti</th><th>Bucket</th><th>Percorso radice</th></tr>
</thead>
<tbody>
<tr><td>Dati di origine</td><td><code translate="no">milvus-a</code></td><td><code translate="no">minio-a</code></td><td><code translate="no">bucket-a</code></td><td><code translate="no">files</code></td></tr>
<tr><td>Backup creato dalla fonte</td><td>—</td><td><code translate="no">minio-a</code></td><td><code translate="no">bucket-a</code></td><td><code translate="no">backup/my_backup</code></td></tr>
<tr><td>Dati ripristinati</td><td><code translate="no">milvus-a</code></td><td><code translate="no">minio-a</code></td><td><code translate="no">bucket-a</code></td><td><code translate="no">files</code></td></tr>
</tbody>
</table>
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
<li>Utilizzare Milvus Backup 0.6.0 e Milvus 3.0.1 o versioni successive. Installare lo strumento come descritto in <a href="/docs/it/milvus_backup_0_6_cli.md">"Backup e ripristino dei dati tramite comandi</a>".</li>
<li>Utilizzare una raccolta esistente denominata " <code translate="no">coll</code>" oppure creare la raccolta di esempio opzionale riportata di seguito. Mantenere invariati i dati della raccolta durante il confronto tra i risultati della sorgente e quelli ripristinati.</li>
<li>Rendere accessibili a Milvus Backup la porta gRPC di Milvus (19530), la porta di gestione (9091) e l’object storage. Il server Milvus deve inoltre poter accedere allo storage di backup per l’esportazione e l’importazione degli snapshot.</li>
<li>Sostituire i nomi host, i nomi dei bucket, i percorsi radice e le credenziali di esempio con le proprie impostazioni di distribuzione. Le impostazioni di archiviazione di Milvus devono corrispondere all’istanza in esecuzione; la modifica della configurazione di backup non riconfigura Milvus.</li>
<li>Assicurarsi che <code translate="no">coll_bak</code> non esista nell’istanza di destinazione.</li>
</ul>
<p>Per le impostazioni di archiviazione di Milvus, vedere <a href="/docs/it/deploy_s3.md">Archiviazione a oggetti</a>. Per le configurazioni di backup v1 esistenti, vedere <a href="/docs/it/milvus_backup_upgrade.md#Migrate-the-configuration">Aggiornamento di Milvus Backup</a>.</p>
<h2 id="Prepare-sample-data" class="common-anchor-header">Preparare i dati di esempio<button data-href="#Prepare-sample-data" class="anchor-icon" translate="no">
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
    </button></h2><p>I comandi riportati di seguito utilizzano una raccolta esistente denominata <code translate="no">coll</code>. È possibile utilizzare una propria raccolta modificando i nomi in modo coerente.</p>
<p>Per una piccola raccolta di prova, installare PyMilvus ed eseguire il seguente comando su una raccolta vuota. Sostituire l’URI se Milvus non è locale:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus==3.0.0
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
<span class="hljs-keyword">assert</span> <span class="hljs-keyword">not</span> client.has_collection(<span class="hljs-string">&quot;coll&quot;</span>), <span class="hljs-string">&quot;Use an empty sample collection name&quot;</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;label&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">64</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">8</span>)
indexes = client.prepare_index_params()
indexes.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)
client.create_collection(<span class="hljs-string">&quot;coll&quot;</span>, schema=schema, index_params=indexes)

rng = random.Random(<span class="hljs-number">601</span>)
rows = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;label&quot;</span>: <span class="hljs-string">f&quot;backup-docs-<span class="hljs-subst">{i}</span>&quot;</span>,
     <span class="hljs-string">&quot;vector&quot;</span>: [rng.randrange(<span class="hljs-number">256</span>) / <span class="hljs-number">256</span> <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">8</span>)]}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)
]
client.insert(<span class="hljs-string">&quot;coll&quot;</span>, rows)
client.flush(<span class="hljs-string">&quot;coll&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>In questo modo si creano 256 entità. Mantenere invariati questi dati di prova mentre si seguono i passaggi rimanenti.</p>
<h2 id="Back-up-the-collection" class="common-anchor-header">Eseguire il backup della raccolta<button data-href="#Back-up-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">Passaggio 1: Preparazione della configurazione<button data-href="#Step-1-Prepare-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Eseguire quanto segue dalla directory contenente il binario <code translate="no">milvus-backup</code>. Mantenere questa directory di lavoro per i comandi rimanenti:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>Salvare il seguente contenuto come <code translate="no">configs/backup-source.yaml</code>. L’esempio utilizza le credenziali di prova predefinite di MinIO; sostituirle con le credenziali del proprio archivio di oggetti.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">configVersion:</span> <span class="hljs-string">v2</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">milvus-a</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">management:</span>
    <span class="hljs-attr">endpoint:</span> <span class="hljs-string">http://milvus-a:9091</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">provider:</span> <span class="hljs-string">minio</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">minio-a</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">bucket-a</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">files</span>
    <span class="hljs-attr">auth:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">static</span>
      <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span>
<span class="hljs-attr">backup:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">bucket-a</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">backup</span>
<span class="hljs-attr">transfer:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">auto</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">milvus.storage</code> descrive i dati dell’istanza di origine. <code translate="no">backup.storage</code> descrive la destinazione del backup. I campi relativi allo spazio di archiviazione di backup non impostati ereditano i valori da <code translate="no">milvus.storage</code>, ad eccezione di <code translate="no">rootPath</code>, il cui valore predefinito è <code translate="no">backup</code>.</p>
<p>Se Milvus e Milvus Backup utilizzano indirizzi diversi per raggiungere lo stesso archivio a oggetti, configurare <code translate="no">backup.storage.milvusAddress</code> e <code translate="no">milvusPort</code> con l’indirizzo raggiungibile dal server Milvus. Vedere <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">l’esempio di configurazione della versione 0.6.0</a>.</p>
<h3 id="Step-2-Check-connectivity-and-create-a-backup" class="common-anchor-header">Passaggio 2: Verificare la connettività e creare un backup<button data-href="#Step-2-Check-connectivity-and-create-a-backup" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-source.yaml
./milvus-backup create --format snapshot --filter coll -n my_backup --config configs/backup-source.yaml
./milvus-backup get -n my_backup --config configs/backup-source.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Il controllo della connettività dovrebbe restituire <code translate="no">Success!</code>. Il comando create dovrebbe restituire <code translate="no">create backup success</code>, mentre le informazioni sul backup dovrebbero elencare <code translate="no">coll</code>.</p>
<p>L’indicazione esplicita <code translate="no">--format snapshot</code> seleziona il flusso di lavoro dello snapshot. Anche l’impostazione predefinita <code translate="no">auto</code> seleziona lo snapshot su Milvus 3.0. Il backup include i metadati e un bundle di snapshot esportato in <code translate="no">bucket-a/backup/my_backup</code>. Conservare l’intera directory.</p>
<h2 id="Restore-within-the-same-instance" class="common-anchor-header">Ripristino all’interno della stessa istanza<button data-href="#Restore-within-the-same-instance" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare la stessa configurazione per ripristinare il backup con un suffisso:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-source.yaml
<button class="copy-code-btn"></button></code></pre>
<p>La CLI <code translate="no">--filter</code> corrisponde al nome di destinazione <strong>dopo</strong> aver applicato <code translate="no">-s</code> o <code translate="no">--rename</code>. Utilizzare <code translate="no">coll_bak</code>, non <code translate="no">coll</code>, in questo comando di ripristino. Un filtro che non trova corrispondenze può terminare correttamente senza creare una raccolta.</p>
<p>La raccolta ripristinata utilizza lo spazio di archiviazione configurato dell’istanza di destinazione. Milvus gestisce l’importazione dello snapshot e la struttura dei dati risultante.</p>
<h2 id="Verify-the-result" class="common-anchor-header">Verifica il risultato<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>Per i dati di esempio opzionali con 256 entità riportati sopra, eseguire questo comando sulla destinazione di ripristino. Sostituire <code translate="no">localhost:19530</code> con lo stesso endpoint Milvus utilizzato per preparare i dati. Il comando verifica il conteggio, ogni valore scalare e vettoriale e un risultato di ricerca vettoriale senza eliminare i dati:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
<span class="hljs-keyword">assert</span> client.has_collection(<span class="hljs-string">&quot;coll_bak&quot;</span>)
<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> client.list_indexes(<span class="hljs-string">&quot;coll_bak&quot;</span>):
    indexes = client.prepare_index_params()
    indexes.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)
    client.create_index(<span class="hljs-string">&quot;coll_bak&quot;</span>, indexes)
client.load_collection(<span class="hljs-string">&quot;coll_bak&quot;</span>)

rng = random.Random(<span class="hljs-number">601</span>)
expected = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;label&quot;</span>: <span class="hljs-string">f&quot;backup-docs-<span class="hljs-subst">{i}</span>&quot;</span>,
     <span class="hljs-string">&quot;vector&quot;</span>: [rng.randrange(<span class="hljs-number">256</span>) / <span class="hljs-number">256</span> <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">8</span>)]}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)
]
count = client.query(<span class="hljs-string">&quot;coll_bak&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>, output_fields=[<span class="hljs-string">&quot;count(*)&quot;</span>],
                     consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)[<span class="hljs-number">0</span>][<span class="hljs-string">&quot;count(*)&quot;</span>]
actual = client.query(<span class="hljs-string">&quot;coll_bak&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id &gt;= 0&quot;</span>,
                      output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;label&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>], limit=<span class="hljs-number">512</span>,
                      consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)
<span class="hljs-keyword">assert</span> count == <span class="hljs-number">256</span>
<span class="hljs-keyword">assert</span> <span class="hljs-built_in">sorted</span>(actual, key=<span class="hljs-keyword">lambda</span> row: row[<span class="hljs-string">&quot;id&quot;</span>]) == expected
hits = client.search(<span class="hljs-string">&quot;coll_bak&quot;</span>, data=[expected[<span class="hljs-number">7</span>][<span class="hljs-string">&quot;vector&quot;</span>]], limit=<span class="hljs-number">1</span>,
                     consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)
<span class="hljs-keyword">assert</span> hits[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&quot;id&quot;</span>] == <span class="hljs-number">7</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Backup and restore verified&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Per altri dati, confrontare con la propria linea di base relativa al momento del backup. Creare un indice vettoriale appropriato prima del caricamento se la collezione ripristinata ne è sprovvista. Il semplice esito positivo del comando non garantisce che i dati previsti siano stati ripristinati.</p>
