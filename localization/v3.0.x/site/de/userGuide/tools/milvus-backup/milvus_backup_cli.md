---
id: milvus_backup_cli.md
summary: 'Erfahren Sie, wie Sie Milvus Backup über die Befehlszeile nutzen können'
title: >-
  Daten mit Befehlen sichern und wiederherstellenCompatible with Milvus Backup
  0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">Daten mit Befehlen sichern und wiederherstellen<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>Informationen zu aktuellen Arbeitsabläufen finden Sie im <a href="/docs/de/milvus_backup_0_6_cli.md">CLI-Handbuch</a> oder <a href="/docs/de/milvus_backup_upgrade.md">führen Sie ein Upgrade von 0.5.x durch</a>. Überprüfen Sie die <a href="/docs/de/milvus_backup_overview.md#Compatibility-matrix">Kompatibilitätsmatrix</a> auf unterstützte Milvus-Serverversionen.</p>
<p>Milvus Backup bietet Funktionen zur Datensicherung und -wiederherstellung, um die Sicherheit Ihrer Milvus-Daten zu gewährleisten.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Milvus Backup beziehen<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können entweder die kompilierte Binärdatei herunterladen oder das Programm aus dem Quellcode kompilieren.</p>
<p>Laden Sie die Binärdatei für Ihr Betriebssystem und Ihre Architektur aus der <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16">Version 0.5.16</a> herunter. Verwenden Sie die entsprechenden Konfigurationen und Beispiele für 0.5.16 auf dieser Seite.</p>
<p>Um Version 0.5.16 aus dem Quellcode zu kompilieren, installieren Sie Go 1.25 oder höher und führen Sie folgenden Befehl aus:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.5.16 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-configuration-file" class="common-anchor-header">Konfigurationsdatei vorbereiten<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Laden Sie die <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml">Beispielkonfigurationsdatei</a> herunter und passen Sie sie an Ihre Anforderungen an.</p>
<p>Erstellen Sie anschließend einen Ordner neben der heruntergeladenen oder kompilierten Milvus-Backup-Binärdatei, benennen Sie den Ordner „ <code translate="no">configs</code> “ und legen Sie die Konfigurationsdatei im Ordner „ <code translate="no">configs</code> “ ab.</p>
<p>Ihre Ordnerstruktur sollte in etwa wie folgt aussehen:</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>In diesem Beispiel wird MinIO als Backup-Speicher verwendet. Passen Sie den Ordner „ <code translate="no">minio.*</code> “ an Ihren Milvus-Speicher und Ihr Backup-Ziel an, einschließlich der Adressen, Anmeldedaten, Bucket-Namen und Stammpfade.</p>
<div class="alert note">
<p>Der Name des Standard-MinIO-Buckets hängt von der Art und Weise ab, wie Sie Milvus installieren. Beachten Sie bei Änderungen an den MinIO-Einstellungen bitte die folgende Tabelle.</p>
<table>
<thead>
<tr><th>Feld</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>Dateien</td><td>Datei</td></tr>
</tbody>
</table>
</div>
<h2 id="Prepare-data" class="common-anchor-header">Daten vorbereiten<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie eine leere lokale Milvus-Instanz am Standardport ausführen, verwenden Sie die Beispiel-Python-Skripte, um einige Daten in Ihrer Instanz zu generieren. Sie können die Skripte gerne an Ihre Bedürfnisse anpassen.</p>
<p>Laden Sie die <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">Skripte</a> herunter. Führen Sie die Skripte anschließend aus, um die Daten zu generieren. Stellen Sie sicher, dass <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, das offizielle Milvus-Python-SDK, installiert ist.</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Dieser Schritt ist optional. Wenn Sie ihn überspringen, stellen Sie sicher, dass sich bereits Daten in Ihrer Milvus-Instanz befinden.</p>
<h2 id="Back-up-data" class="common-anchor-header">Daten sichern<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Beachten Sie, dass die Ausführung von „Milvus Backup“ auf einer Milvus-Instanz den Betrieb der Instanz normalerweise nicht beeinträchtigt. Ihre Milvus-Instanz ist während der Sicherung oder Wiederherstellung voll funktionsfähig.</p>
<div class="tab-wrapper"></div>
<p>Führen Sie den folgenden Befehl aus, um ein Backup zu erstellen.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>Sobald der Befehl ausgeführt wurde, kannst du die Sicherungsdateien in dem in den Minio-Einstellungen angegebenen Bucket überprüfen. Konkret kannst du sie über <strong>die Minio-Konsole</strong> oder den <strong>mc-Client</strong> herunterladen.</p>
<p>Um die Dateien über <a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">die Minio-Konsole</a> herunterzuladen, melden Sie sich bei der Minio-Konsole an, suchen Sie den unter <code translate="no">minio.backupBucketName</code> angegebenen Bucket, wählen Sie die Dateien im Bucket aus und klicken Sie auf <strong>„Download“</strong>, um sie herunterzuladen.</p>
<p>Wenn Sie <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">den mc-Client</a> bevorzugen, gehen Sie wie folgt vor:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Nun können Sie die Sicherungsdateien an einem sicheren Ort für eine spätere Wiederherstellung speichern oder sie in <a href="https://cloud.zilliz.com">die Zilliz Cloud</a> hochladen, um eine verwaltete Vektordatenbank mit Ihren Daten zu erstellen. Weitere Informationen finden Sie unter <a href="https://zilliz.com/doc/migrate_from_milvus-2x">„Migration von Milvus zur Zilliz Cloud</a>“.</p>
<h2 id="Restore-data" class="common-anchor-header">Daten wiederherstellen<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
<p>Sie können den Befehl „ <code translate="no">restore</code> “ mit dem Flag „ <code translate="no">-s</code> “ ausführen, um eine neue Sammlung zu erstellen, indem Sie die Daten aus der Sicherung wiederherstellen:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p>Mit dem Flag „ <code translate="no">-s</code> “ können Sie ein Suffix für die neu zu erstellende Sammlung festlegen. Der obige Befehl erstellt in Ihrer Milvus-Instanz eine neue Sammlung namens <strong>„hello_milvus_recover</strong> “.</p>
<p>Wenn Sie die gesicherte Sammlung lieber ohne Namensänderung wiederherstellen möchten, löschen Sie die Sammlung, bevor Sie sie aus dem Backup wiederherstellen. Sie können nun die unter <a href="#Prepare-data">„Daten vorbereiten“</a> generierten Daten bereinigen, indem Sie den folgenden Befehl ausführen.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Führen Sie anschließend den folgenden Befehl aus, um die Daten aus dem Backup wiederherzustellen.</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-restored-data" class="common-anchor-header">Überprüfen Sie die wiederhergestellten Daten<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Für die oben erstellten temporären Beispieldaten indiziert und abfragt das Upstream-Skript „ <code translate="no">hello_milvus_recover</code> “ und „ <code translate="no">hello_milvus2_recover</code> “ und <strong>löscht</strong> anschließend <strong>beide wiederhergestellten Sammlungen</strong>. Führen Sie es erst aus, nachdem Sie beide Beispielsammlungen mit „ <code translate="no">_recover</code> “ wiederhergestellt haben. Vergleichen Sie Ihre eigenen Daten mit Ihrer Baseline zum Zeitpunkt der Sicherung, ohne dieses Bereinigungsskript zu verwenden.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/verify_data.py -o example/verify_data.py
python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Beachten Sie, dass das obige Skript davon ausgeht, dass Sie den Befehl „ <code translate="no">restore</code> “ mit dem Flag „ <code translate="no">-s</code> “ ausgeführt haben und das Suffix auf „ <code translate="no">_recover</code> “ gesetzt ist. Sie können das Skript gerne an Ihre Bedürfnisse anpassen.</p>
