---
id: shared-bucket-backup-and-restore.md
summary: >-
  In diesem Thema wird der Vorgang beschrieben, wie eine Sammlung aus einer
  Milvus-Instanz gesichert und in einer anderen wiederhergestellt wird, wobei
  ein gemeinsam genutzter Bucket für die Objektspeicherung verwendet wird.
title: >-
  Migration zwischen Instanzen in einem Bucket (unterschiedliche
  Stammpfade)Compatible with Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Migrate-Between-Instances-in-One-Bucket-Different-Root-Paths" class="common-anchor-header">Migration zwischen Instanzen in einem Bucket (unterschiedliche Stammpfade)<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Migrate-Between-Instances-in-One-Bucket-Different-Root-Paths" class="anchor-icon" translate="no">
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
    </button></h1><p>Informationen zu aktuellen Workflows finden Sie im <a href="/docs/de/milvus_backup_0_6_cli.md">CLI-Handbuch</a> oder <a href="/docs/de/milvus_backup_upgrade.md">führen Sie ein Upgrade von 0.5.x durch</a>. Überprüfen Sie die <a href="/docs/de/milvus_backup_overview.md#Compatibility-matrix">Kompatibilitätsmatrix</a> auf unterstützte Milvus-Serverversionen.</p>
<p>In diesem Abschnitt wird der Vorgang beschrieben, wie eine Sammlung von einer
Milvus-Instanz gesichert und auf einer anderen wiederhergestellt wird, wobei ein gemeinsamer Bucket
für die Objektspeicherung verwendet wird, der für jede Instanz unterschiedliche Stammpfade aufweist.</p>
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
    </button></h2><p>Das folgende Diagramm veranschaulicht den Sicherungs- und Wiederherstellungsprozess unter Verwendung eines
gemeinsam genutzten Buckets.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/shared-bucket-backup-and-restore.png" alt="shared-bucket-backup-and-restore.png" class="doc-image" id="shared-bucket-backup-and-restore.png" /> 
   <span>shared-bucket-backup-and-restore.png</span>
  
 </span></p>
<p>Angenommen, wir haben die Milvus-Instanzen <code translate="no">milvus_A</code> und <code translate="no">milvus_B</code>, die beide
die standardmäßige MinIO-Speicher-Engine für die Objektspeicherung verwenden. Diese Instanzen
nutzen denselben Bucket, <code translate="no">bucket_A</code>, speichern ihre Daten jedoch in unterschiedlichen Stammpfaden: <code translate="no">files_A</code> für <code translate="no">milvus_A</code> und files_B für <code translate="no">milvus_B</code>. In diesem Beispiel
ist es unser Ziel, die folgenden Aufgaben auszuführen:</p>
<ol>
<li><p>Erstellen Sie ein Backup (my_backup) für die Sammlung „coll“, das unter dem
Pfad „<code translate="no">files_A</code> “ für „ <code translate="no">milvus_A</code> “ gespeichert wird.</p></li>
<li><p>Stellen Sie die Daten aus der Sicherung wieder her und speichern Sie sie in „files_B“ für <code translate="no">milvus_B</code>.</p></li>
</ol>
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
<li><p>Installieren Sie <strong>Milvus Backup 0.5.16</strong> anhand der <a href="/docs/de/milvus_backup_cli.md#Obtain-Milvus-Backup">CLI-Anleitung für 0.5.x</a>.</p></li>
<li><p>Machen Sie sich mit der Konfiguration der Milvus-Objektspeichereinstellungen vertraut.
Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/deploy_s3.md">„Objektspeicher</a>“.</p></li>
</ul>
<h2 id="Back-up-a-collection-from-milvusA" class="common-anchor-header">Sichern Sie eine Sammlung aus <code translate="no">milvus_A</code><button data-href="#Back-up-a-collection-from-milvusA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">Schritt 1: Konfiguration vorbereiten<button data-href="#Step-1-Prepare-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Wechseln Sie in das Verzeichnis des milvus-backup-Projekts und erstellen Sie ein Verzeichnis
mit dem Namen „ <code translate="no">configs</code> “. Führen Sie die folgenden Befehle aus dem Verzeichnis aus, das „ <code translate="no">milvus-backup</code> “ enthält:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>Laden Sie die Backup-Konfigurationsdatei „backup.yaml“ herunter:</p>
<pre><code translate="no" class="language-shell">wget -O configs/backup.yaml https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Die Dateistruktur sieht wie folgt aus:</p>
<pre><code translate="no">├── configs
│   └── backup.yaml
├── milvus-backup
└── README.md
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Edit-configuration-file" class="common-anchor-header">Schritt 2: Konfigurationsdatei bearbeiten<button data-href="#Step-2-Edit-configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Das folgende YAML zeigt die Felder, die in der heruntergeladenen v1-Datei bearbeitet werden müssen. Behalten Sie die anderen erforderlichen Einstellungen bei. Verweisen Sie „ <code translate="no">milvus.address</code> “ und „ <code translate="no">milvus.port</code> “ auf die Instanz, die gesichert oder wiederhergestellt werden soll. Setzen Sie „ <code translate="no">minio.backupAddress</code> “, „ <code translate="no">minio.backupPort</code> “ und „ <code translate="no">minio.backupStorageType</code> “ auf das Sicherungsziel und „ <code translate="no">backup.gcPause.address</code> “ auf den Milvus-Verwaltungsendpunkt der Quelle (standardmäßig Port 9091). Ersetzen Sie alle Beispieladressen, Bucket-Namen, Pfade und Anmeldedaten durch Ihre Bereitstellungseinstellungen.</p>
<p>Passen Sie die Datei „backup.yaml“ an, um die entsprechenden Konfigurationen für
<code translate="no">milvus_A</code> festzulegen:</p>
<ul>
<li><p>Verbindungskonfigurationen</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_A</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  <span class="hljs-attr">tlsMode:</span> <span class="hljs-number">0</span>
  <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;root&quot;</span>
  <span class="hljs-attr">password:</span> <span class="hljs-string">&quot;Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">milvus.address</code>: IP-Adresse oder Hostname des <code translate="no">milvus_A</code> -Servers.</p></li>
<li><p><code translate="no">milvus.port</code>: TCP-Port, auf dem der Milvus-Server auf Verbindungen wartet (standardmäßig
19530).</p></li>
</ul></li>
<li><p>Speicherkonfigurationen (MinIO/S3-Einstellungen)</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  <span class="hljs-attr">storageType:</span> <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_A</span> <span class="hljs-comment"># Address of MinIO/S3</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">iamEndpoint:</span> <span class="hljs-string">&quot;&quot;</span>
  
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">&quot;files_A&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># Backup storage credentials</span>
  <span class="hljs-attr">backupAccessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">backupSecretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  <span class="hljs-attr">backupBucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  <span class="hljs-attr">backupRootPath:</span> <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">minio.bucketName</code>: Name des Buckets, der für den <code translate="no">milvus_A</code> -Speicher verwendet wird. In diesem
Beispiel auf <code translate="no">bucket_A</code> setzen.</p></li>
<li><p><code translate="no">minio.rootPath</code>: Stammverzeichnis innerhalb des Buckets, in dem die Daten von „ <code translate="no">milvus_A</code> “ gespeichert werden. In diesem Beispiel auf „ <code translate="no">files_A</code> “ setzen.</p></li>
<li><p><code translate="no">minio.backupBucketName</code>: Name des Buckets, der für die Speicherung verwendet wird. In diesem
Beispiel teilen sich „ <code translate="no">milvus_A</code> “ und „ <code translate="no">milvus_B</code> “ denselben Bucket. Setzen Sie daher den Wert auf
<code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.backupRootPath</code>: Stammpfad innerhalb des Buckets, der für die Speicherung von Sicherungsdateien unter <code translate="no">milvus_B</code> vorgesehen ist. Verwenden Sie in diesem Beispiel einen anderen Pfad als unter <code translate="no">milvus_A</code>. Legen Sie daher <code translate="no">backup</code> fest.</p></li>
</ul></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">Schritt 3: Sicherung erstellen<button data-href="#Step-3-Create-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>Sobald „ <code translate="no">backup.yaml</code> “ gespeichert ist, erstellen Sie ein Backup mit dem Namen „my_backup“:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Dieser Befehl erstellt die Sicherung „ <code translate="no">bucket_A/backup/my_backup</code> “ im Objektspeicher
für die Sammlung „ <code translate="no">coll</code> “.</p>
<h2 id="Restore-the-backup-to-milvusB" class="common-anchor-header">Stellen Sie die Sicherung wieder her unter <code translate="no">milvus_B</code><button data-href="#Restore-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Configure-restoration-settings" class="common-anchor-header">Schritt 1: Konfigurieren Sie die Wiederherstellungseinstellungen<button data-href="#Step-1-Configure-restoration-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Wiederholen Sie Schritt
2, um die Konfigurationen für die Wiederherstellung in „ <code translate="no">milvus_B</code> “ anzupassen. Stellen Sie dabei sicher, dass „ <code translate="no">minio.bucketName</code> “ auf „ <code translate="no">bucket_A</code> “ und „ <code translate="no">minio.rootPath</code> “ auf „ <code translate="no">files_B</code> “ gesetzt ist, um die Speicherorte der beiden Instanzen voneinander zu unterscheiden.</p>
<p>Hier ist ein Beispiel für eine Konfiguration:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_B</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  <span class="hljs-attr">tlsMode:</span> <span class="hljs-number">0</span>
  <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;root&quot;</span>
  <span class="hljs-attr">password:</span> <span class="hljs-string">&quot;Milvus&quot;</span>
  
<span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  <span class="hljs-attr">storageType:</span> <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_B</span> <span class="hljs-comment"># Address of MinIO/S3</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">iamEndpoint:</span> <span class="hljs-string">&quot;&quot;</span>
  
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">&quot;files_B&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Restore-backup" class="common-anchor-header">Schritt 2: Sicherung wiederherstellen<button data-href="#Step-2-Restore-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>Stellen Sie das Backup unter <code translate="no">milvus_B</code> wieder her:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Dieser Befehl stellt das Backup in einer neuen Sammlung namens „ <code translate="no">coll_bak</code> “ unter <code translate="no">milvus_B</code> wieder her und verwendet dabei das konfigurierte Speicherverzeichnis der Zielinstanz <code translate="no">bucket_A/files_B</code>.</p>
<p>In Backup 0.5.16 wählt die veraltete Option „ <code translate="no">-c</code> “ den Sammlungsnamen im Backup aus, bevor „ <code translate="no">_bak</code> “ angewendet wird. Der Ersatz „ <code translate="no">--filter</code> “ in Version 0.6.0 verwendet stattdessen den Zielnamen; siehe <a href="/docs/de/milvus_backup_upgrade.md#Update-CLI-commands">„CLI-Befehle aktualisieren</a>“.</p>
<p>Vergewissern Sie sich nach der Wiederherstellung, dass „ <code translate="no">coll_bak</code> “ vorhanden ist, erstellen Sie bei Bedarf einen entsprechenden Vektorindex und vergleichen Sie dessen Entitätsanzahl, repräsentative Werte und Suchergebnisse mit einer vor der Sicherung erfassten Baseline. Ein erfolgreicher Befehl allein reicht nicht aus, um die Daten zu überprüfen.</p>
