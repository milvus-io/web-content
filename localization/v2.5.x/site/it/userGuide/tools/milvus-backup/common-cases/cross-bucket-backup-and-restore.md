---
id: cross-bucket-backup-and-restore.md
summary: >-
  Questo argomento illustra il processo di backup di una collezione da
  un'istanza Milvus e il suo ripristino in un'altra istanza.
title: Migrazione tra istanze e tra bucket
---
<h1 id="Migrate-Between-Instances-Across-Buckets" class="common-anchor-header">Migrazione tra istanze e tra bucket<button data-href="#Migrate-Between-Instances-Across-Buckets" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento illustra il processo di backup di una collezione da un'istanza Milvus e il suo ripristino in un'altra, con ciascuna istanza che utilizza bucket diversi all'interno dello stesso archivio oggetti.</p>
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
    </button></h2><p>Il diagramma seguente illustra il processo di backup e ripristino utilizzando bucket diversi all'interno dello stesso object storage.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cross-bucket-backup-and-restore.png" alt="cross-bucket-backup-and-restore.png" class="doc-image" id="cross-bucket-backup-and-restore.png" />
   </span> <span class="img-wrapper"> <span>cross-bucket-backup-and-restore.png</span> </span></p>
<p>Si supponga di avere due istanze Milvus, <code translate="no">milvus_A</code> e <code translate="no">milvus_B</code>, che utilizzano entrambe il motore di archiviazione MinIO predefinito per l'archiviazione degli oggetti. Queste istanze utilizzano bucket diversi, bucket_A e <code translate="no">bucket_B</code>, all'interno dello stesso archivio oggetti. In questo esempio, l'obiettivo è completare le seguenti operazioni:</p>
<ol>
<li><p>Creare un backup (<code translate="no">my_backup</code>) per la raccolta <code translate="no">coll</code> in <code translate="no">bucket_A</code> e archiviare il backup in <code translate="no">bucket_B</code>.</p></li>
<li><p>In <code translate="no">bucket_B</code>, ripristinare dal backup e nominare la raccolta ripristinata <code translate="no">coll_bak</code>.</p></li>
</ol>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti**<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>Assicurarsi che lo strumento <strong>milvus-backup</strong> sia installato.</p></li>
<li><p>Familiarizzare con la configurazione delle impostazioni di archiviazione degli oggetti di Milvus. Per i dettagli, consultare <a href="https://milvus.io/docs/deploy_s3.md">Archiviazione degli oggetti</a>.</p></li>
</ul>
<h2 id="Back-up-a-collection-from-milvusA" class="common-anchor-header">Backup di una raccolta da milvus_A<button data-href="#Back-up-a-collection-from-milvusA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">Passo 1: Preparare la configurazione</h3><p>Andare nella directory del progetto milvus-backup e creare una directory denominata configs:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">mkdir</span> configs
<span class="hljs-built_in">cd</span> configs
<button class="copy-code-btn"></button></code></pre>
<p>Scaricare il file di configurazione di backup <code translate="no">backup.yaml</code>:</p>
<pre><code translate="no" class="language-shell">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-backup/main/configs/backup.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>La struttura del file è la seguente:</p>
<pre><code translate="no">├── configs
│   └── backup.yaml
├── milvus-backup
└── README.md
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Edit-configuration-file" class="common-anchor-header">Passo 2: modificare il file di configurazione</h3><p>Modificare il file backup.yaml per impostare le configurazioni appropriate per<code translate="no">milvus_A</code>:</p>
<ul>
<li><p>Connessione configs</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
milvus:
  address: milvus_A
  port: <span class="hljs-number">19530</span>
  authorizationEnabled: false
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  tlsMode: <span class="hljs-number">0</span>
  user: <span class="hljs-string">&quot;root&quot;</span>
  password: <span class="hljs-string">&quot;Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">milvus.address</code>: Indirizzo IP o nome host del server <code translate="no">milvus_A</code>.</p></li>
<li><p><code translate="no">milvus.port</code>: Porta TCP su cui il server Milvus è in ascolto (default 19530).</p></li>
</ul></li>
<li><p>Configurazioni di archiviazione (impostazioni MinIO/S3)</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
minio:
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  storageType: <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  address: localhost <span class="hljs-comment"># Address of MinIO/S3</span>
  port: <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  accessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  secretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  useSSL: false <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  useIAM: false
  iamEndpoint: <span class="hljs-string">&quot;&quot;</span>
  
  bucketName: <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  rootPath: <span class="hljs-string">&quot;files&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># only for azure</span>
  backupAccessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  backupSecretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  backupBucketName: <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  backupRootPath: <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">minio.bucketName</code>: Nome del bucket utilizzato per l'archiviazione dei dati in <code translate="no">milvus_A</code>. In questo esempio, impostato su <code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.rootPath</code>: Percorso radice all'interno del bucket in cui sono memorizzati i dati di <code translate="no">milvus_A</code>. In questo esempio, impostato su <code translate="no">files</code>.</p></li>
<li><p><code translate="no">minio.backupBucketName</code>: Nome del bucket utilizzato per l'archiviazione dei backup in<code translate="no">milvus_B</code>. In questo esempio, <code translate="no">milvus_A</code> e <code translate="no">milvus_B</code> utilizzano bucket diversi. Pertanto, impostare su <code translate="no">bucket_B</code>.</p></li>
<li><p><code translate="no">minio.backupRootPath</code>: Percorso radice all'interno del bucket designato per l'archiviazione dei file di backup in <code translate="no">milvus_B</code>. In questo esempio, impostare su <code translate="no">backup</code>.</p></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">Passo 3: Creare il backup</h3><p>Una volta salvato backup.yaml, creare un backup denominato <code translate="no">my_backup</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>Questo comando crea il backup <code translate="no">bucket_B/backup/my_backup</code> nell'archivio oggetti per la raccolta coll.</p>
<h2 id="Restore-the-backup-to-milvusB" class="common-anchor-header">Ripristino del backup su milvus_B<button data-href="#Restore-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Configure-restoration-settings" class="common-anchor-header">Passo 1: Configurare le impostazioni di ripristino</h3><p>Ripetere il passo 2 per modificare le configurazioni per il ripristino di <code translate="no">milvus_B</code>, assicurandosi che <code translate="no">minio.bucketName</code> sia impostato su <code translate="no">bucket_B</code>.</p>
<p>Ecco una configurazione di esempio:</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
milvus:
  address: milvus_B
  port: <span class="hljs-number">19530</span>
  authorizationEnabled: false
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  tlsMode: <span class="hljs-number">0</span>
  user: <span class="hljs-string">&quot;root&quot;</span>
  password: <span class="hljs-string">&quot;Milvus&quot;</span>
  
<span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
minio:
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  storageType: <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  address: localhost <span class="hljs-comment"># Address of MinIO/S3</span>
  port: <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  accessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  secretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  useSSL: false <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  useIAM: false
  iamEndpoint: <span class="hljs-string">&quot;&quot;</span>
  
  bucketName: <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  rootPath: <span class="hljs-string">&quot;files&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># only for azure</span>
  backupAccessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  backupSecretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  backupBucketName: <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  backupRootPath: <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
...
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Restore-backup" class="common-anchor-header">Passo 2: Ripristino del backup</h3><p>Ripristinare il backup in <code translate="no">milvus_B</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>Questo comando ripristina il backup in una nuova raccolta denominata <code translate="no">coll_bak</code> in <code translate="no">milvus_B</code>, con i dati archiviati in <code translate="no">bucket_B/files/insert_log/[ID of new collection]</code>.</p>