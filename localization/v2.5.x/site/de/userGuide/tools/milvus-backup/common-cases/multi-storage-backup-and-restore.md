---
id: multi-storage-backup-and-restore.md
summary: >-
  Dieses Thema beschreibt den Prozess der Sicherung einer Sammlung von einer
  Milvus-Instanz und deren Wiederherstellung in einer anderen
title: Migrieren zwischen Instanzen über S3-Umgebungen hinweg
---
<h1 id="Migrate-Between-Instances-Across-S3-Environments" class="common-anchor-header">Migrieren zwischen Instanzen über S3-Umgebungen hinweg<button data-href="#Migrate-Between-Instances-Across-S3-Environments" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Thema beschreibt den Prozess der Sicherung einer Sammlung von einer Milvus-Instanz und deren Wiederherstellung in einer anderen, wobei jede Instanz einen anderen Objektspeicher verwendet.</p>
<h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Das folgende Diagramm veranschaulicht den Sicherungs- und Wiederherstellungsprozess unter Verwendung verschiedener Objektspeicher.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-storage-backup-and-restore.png" alt="multi-storage-backup-and-restore.png" class="doc-image" id="multi-storage-backup-and-restore.png" />
   </span> <span class="img-wrapper"> <span>multi-storage-backup-and-restore.png</span> </span></p>
<p>Angenommen, wir haben zwei Milvus-Instanzen, <code translate="no">milvus_A</code> und <code translate="no">milvus_B</code>, die unterschiedliche Objektspeicher verwenden. In diesem Beispiel ist es unser Ziel, die folgenden Aufgaben zu erfüllen:</p>
<ol>
<li><p>Erstellen eines Backups (my_backup) für die Sammlung <code translate="no">coll</code> in <code translate="no">bucket_A</code> des Objektspeichers von<code translate="no">milvus_A</code>.</p></li>
<li><p>Übertragen Sie die Sicherung my_backup in <code translate="no">bucket_B</code> des Objektspeichers von <code translate="no">milvus_B</code>.</p></li>
</ol>
<p>Stellen Sie in <code translate="no">bucket_B</code> aus der Sicherung wieder her und benennen Sie die wiederhergestellte Sammlung coll_bak.</p>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>Stellen Sie sicher, dass das Werkzeug <strong>milvus-backup</strong> installiert ist.</p></li>
<li><p>Machen Sie sich mit der Konfiguration der Milvus-Objektspeicher-Einstellungen vertraut. Details finden Sie unter <a href="https://milvus.io/docs/deploy_s3.md">Objektspeicher</a>.</p></li>
</ul>
<h2 id="Back-up-a-collection-from-milvusA" class="common-anchor-header">Sichern einer Sammlung von milvus_A<button data-href="#Back-up-a-collection-from-milvusA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">Schritt 1: Vorbereiten der Konfiguration</h3><p>Wechseln Sie in das Verzeichnis des milvus-backup-Projekts und erstellen Sie ein Verzeichnis namens configs:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">mkdir</span> configs
<span class="hljs-built_in">cd</span> configs
<button class="copy-code-btn"></button></code></pre>
<p>Laden Sie die Backup-Konfigurationsdatei <code translate="no">backup.yaml</code> herunter:</p>
<pre><code translate="no" class="language-shell">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-backup/main/configs/backup.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Die Dateistruktur sieht wie folgt aus:</p>
<pre><code translate="no">├── configs
│   └── backup.yaml
├── milvus-backup
└── README.md
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Edit-configuration-file" class="common-anchor-header">Schritt 2: Konfigurationsdatei bearbeiten</h3><p>Ändern Sie die Datei <code translate="no">backup.yaml</code>, um die entsprechenden Konfigurationen für milvus_A einzustellen:</p>
<ul>
<li><p>Verbindung configs</p>
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
<li><p><code translate="no">milvus.address</code>: IP-Adresse oder Hostname des milvus_A-Servers.</p></li>
<li><p><code translate="no">milvus.port</code>: TCP-Port, auf dem der Milvus-Server lauscht (Standard 19530).</p></li>
</ul></li>
<li><p>Speicher-Konfigurationen (MinIO/S3-Einstellungen)</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
minio:
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  storageType: <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  address: minio_A <span class="hljs-comment"># Address of MinIO/S3</span>
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
  
  backupBucketName: <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  backupRootPath: <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">minio.bucketName</code>: Name des Buckets, der für die Datenspeicherung in milvus_A verwendet wird. In diesem Beispiel ist er auf <code translate="no">bucket_A</code> gesetzt.</p></li>
<li><p><code translate="no">minio.rootPath</code>: Root-Pfad innerhalb des Buckets, in dem die Daten von milvus_A gespeichert werden. In diesem Beispiel auf <code translate="no">files</code> gesetzt.</p></li>
<li><p><code translate="no">minio.backupBucketName</code>: Name des Buckets, der für die Backup-Speicherung verwendet wird. In diesem Beispiel auf <code translate="no">bucket_A</code> gesetzt.</p></li>
<li><p><code translate="no">minio.backupRootPath</code>: Root-Pfad innerhalb des Buckets, der für die Speicherung von Sicherungsdateien in <code translate="no">milvus_B</code> vorgesehen ist. In diesem Beispiel setzen Sie ihn auf <code translate="no">backup</code>.</p></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">Schritt 3: Backup erstellen</h3><p>Sobald backup.yaml gespeichert ist, erstellen Sie ein Backup mit dem Namen <code translate="no">my_backup</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>Mit diesem Befehl wird die Sicherung <code translate="no">bucket_A/backup/my_backup</code> im Objektspeicher von <code translate="no">milvus_A</code> erstellt.</p>
<h2 id="Manually-transfer-the-backup-to-milvusB" class="common-anchor-header">Übertragen Sie das Backup manuell nach milvus_B<button data-href="#Manually-transfer-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><p>Da <code translate="no">milvus_A</code> und <code translate="no">milvus_B</code> unterschiedliche Objektspeicher verwenden, müssen Sie die Sicherung manuell aus dem Speicher von milvus_A herunterladen und in den Speicher von<code translate="no">milvus_B</code> hochladen.</p>
<p><strong>Verwendung der MinIO-Konsole</strong></p>
<ol>
<li><p>Melden Sie sich bei der MinIO-Konsole an.</p></li>
<li><p>Suchen Sie den in minio.address angegebenen Bucket für milvus_A.</p></li>
<li><p>Wählen Sie die Sicherungsdateien im Bucket aus.</p></li>
<li><p>Klicken Sie auf <strong>Download</strong>, um die Dateien auf Ihren Rechner herunterzuladen.</p></li>
</ol>
<p><strong>Verwendung des mc-Clients</strong></p>
<p>Alternativ können Sie auch den <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">mc-Client</a> verwenden, um die Sicherungsdateien herunterzuladen:</p>
<ol>
<li>Konfigurieren Sie einen MinIO-Host:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta"># configure a Minio host</span>
mc <span class="hljs-keyword">alias</span> <span class="hljs-keyword">set</span> my_minio https:<span class="hljs-comment">//&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Auflisten der verfügbaren Buckets:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># List the available buckets</span>
mc ls my_minio
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Einen Bucket rekursiv herunterladen:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Sobald die Sicherungsdateien heruntergeladen sind, können Sie sie für eine spätere Wiederherstellung in den von <code translate="no">milvus_B</code> verwendeten Objektspeicher hochladen. Alternativ können Sie das Backup in die <a href="https://cloud.zilliz.com/">Zilliz Cloud</a> hochladen, um eine verwaltete Vektordatenbank mit Ihren Daten zu erstellen. Weitere Informationen finden Sie unter <a href="https://zilliz.com/doc/migrate_from_milvus-2x">Migrieren von Milvus zu Zilliz Cloud</a>.</p>
<h2 id="Restore-from-the-backup-to-milvusB" class="common-anchor-header">Wiederherstellung aus dem Backup in milvus_B<button data-href="#Restore-from-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Configure-restoration-settings" class="common-anchor-header">Schritt 1: Konfigurieren Sie die Wiederherstellungseinstellungen</h3><p>Wiederholen Sie Schritt 2, um die Konfigurationen für die Wiederherstellung auf <code translate="no">milvus_B</code> zu ändern, und stellen Sie sicher, dass <code translate="no">minio.bucketName</code> auf <code translate="no">bucket_B</code> eingestellt ist.</p>
<p>Hier finden Sie eine Beispielkonfiguration:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
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
  
  address: minio_B <span class="hljs-comment"># Address of MinIO/S3</span>
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
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Restore-from-the-backup" class="common-anchor-header">Schritt 2: Wiederherstellung aus dem Backup</h3><p>Stellen Sie die Sicherung auf <code translate="no">milvus_B</code> wieder her:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>Mit diesem Befehl wird die Sicherung in einer neuen Sammlung namens coll_bak in<code translate="no">milvus_B</code> wiederhergestellt, wobei die Daten in <code translate="no">bucket_B/files/insert_log/[ID of new collection]</code> im Objektspeicher von <code translate="no">milvus_B</code> gespeichert werden.</p>
