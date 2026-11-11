---
id: milvus_backup_api.md
summary: 'Erfahren Sie, wie Sie Milvus Backup über die API nutzen können'
title: >-
  Sichern und Wiederherstellen von Daten mithilfe von APIsCompatible with Milvus
  Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">Sichern und Wiederherstellen von Daten mithilfe von APIs<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>Informationen zu aktuellen Workflows finden Sie im <a href="/docs/de/milvus_backup_0_6_api.md">HTTP-API-Handbuch</a> oder <a href="/docs/de/milvus_backup_upgrade.md">führen Sie ein Upgrade von 0.5.x durch</a>. Überprüfen Sie die <a href="/docs/de/milvus_backup_overview.md#Compatibility-matrix">Kompatibilitätsmatrix</a> auf unterstützte Milvus-Serverversionen.</p>
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
<p>Laden Sie die Binärdatei für Ihr Betriebssystem und Ihre Architektur aus der <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16">Version 0.5.16</a> herunter. Verwenden Sie die passende 0.5.16-Konfiguration und die Beispiele auf dieser Seite.</p>
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
<h2 id="Start-up-the-API-server" class="common-anchor-header">Starten Sie den API-Server<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>Anschließend können Sie den API-Server wie folgt starten:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server
<button class="copy-code-btn"></button></code></pre>
<p>Der API-Server lauscht standardmäßig auf Port 8080. Sie können dies ändern, indem Sie ihn mit dem Flag „ <code translate="no">-p</code> “ ausführen. Um den API-Server so zu starten, dass er auf Port 443 lauscht, gehen Sie wie folgt vor:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>Sie können über http://localhost auf die Swagger-Benutzeroberfläche zugreifen:<port>/api/v1/docs/index.html.</p>
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
    </button></h2><p>Wenn Sie eine leere lokale Milvus-Instanz ausführen, die auf dem Standardport 19530 lauscht, verwenden Sie die Beispiel-Python-Skripte, um einige Daten in Ihrer Instanz zu generieren. Sie können die Skripte gerne an Ihre Bedürfnisse anpassen.</p>
<p>Laden Sie die <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">Skripte</a> herunter. Führen Sie die Skripte anschließend aus, um die Daten zu generieren. Stellen Sie sicher, dass <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, das offizielle Milvus-Python-SDK, installiert ist.</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Dieser Schritt ist optional. Wenn Sie ihn überspringen, stellen Sie sicher, dass sich bereits einige Daten in Ihrer Milvus-Instanz befinden.</p>
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
    </button></h2><div class="tab-wrapper"></div>
<p>Beachten Sie, dass die Ausführung von „Milvus Backup“ auf einer Milvus-Instanz den Betrieb der Instanz normalerweise nicht beeinträchtigt. Ihre Milvus-Instanz ist während der Sicherung oder Wiederherstellung voll funktionsfähig.</p>
<p>Führen Sie den folgenden Befehl aus, um ein Backup zu erstellen. Ändern Sie gegebenenfalls „ <code translate="no">collection_names</code> “ und „ <code translate="no">backup_name</code> “.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
  &quot;async&quot;: true,
  &quot;backup_name&quot;: &quot;my_backup&quot;,
  &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ]
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Der Erstellungsvorgang erfolgt asynchron. Fragen Sie <code translate="no">get_backup</code> mit dem zurückgegebenen <code translate="no">requestId</code> als <code translate="no">backup_id</code> ab und warten Sie, bis <code translate="no">data.state_code</code> den Status „ <code translate="no">2</code> “ annimmt, bevor Sie die Wiederherstellung durchführen.</p>
<p>Sie können die Backups in dem in den Minio-Einstellungen angegebenen Bucket wie folgt auflisten:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/list&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Rufen Sie die Metadaten der Sicherung wie folgt ab:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Ersetzen Sie <code translate="no">backup_id</code> und <code translate="no">backup_name</code> durch die Werte für Ihre Sicherung. Dieser Endpunkt gibt JSON-Metadaten zurück, keine Sicherungsdateien. Kopieren Sie bei der Archivierung das gesamte Sicherungsverzeichnis aus dem Objektspeicher.</p>
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
<p>Sie können den API-Befehl zur Wiederherstellung mit der Option „ <code translate="no">collection_suffix</code> “ aufrufen, um durch die Wiederherstellung der Daten aus dem Backup eine neue Sammlung zu erstellen. Ändern Sie bei Bedarf „ <code translate="no">collection_names</code> “ und „ <code translate="no">backup_name</code> “.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;_recover&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Mit der Option „ <code translate="no">collection_suffix</code> “ können Sie ein Suffix für die neu zu erstellende Sammlung festlegen. Der obige Befehl erstellt in Ihrer Milvus-Instanz eine neue Sammlung mit dem Namen <strong>„hello_milvus_recover</strong> “.</p>
<p>Wenn Sie die gesicherte Sammlung lieber ohne Namensänderung wiederherstellen möchten, löschen Sie die Sammlung, bevor Sie sie aus dem Backup wiederherstellen. Sie können nun die unter <a href="#Prepare-data">„Daten vorbereiten“</a> generierten Daten bereinigen, indem Sie den folgenden Befehl ausführen.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Führen Sie anschließend den folgenden Befehl aus, um die Daten aus der Sicherung wiederherzustellen.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Der Wiederherstellungsprozess kann je nach Größe der wiederherzustellenden Daten zeitaufwendig sein. Daher wird in den obigen Beispielen mit ` <code translate="no">&quot;async&quot;: true</code>` eine asynchrone Ausführung angefordert. Sie können den Status einer Wiederherstellungsaufgabe überprüfen, indem Sie Folgendes ausführen:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Denken Sie daran, „ <code translate="no">test_restore_id</code> “ durch den von der Wiederherstellungs-API zurückgegebenen „ <code translate="no">data.id</code> “ zu ersetzen. Warten Sie, bis „ <code translate="no">data.state_code</code> “ den Status „ <code translate="no">2</code> “ annimmt, bevor Sie die Daten überprüfen; „ <code translate="no">3</code> “ weist auf einen Fehler hin und „ <code translate="no">4</code> “ auf ein Timeout.</p>
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
    </button></h2><p>Nachdem die Aufgabe erfolgreich abgeschlossen wurde, überprüfen Sie, ob <code translate="no">hello_milvus_recover</code> vorhanden ist. Erstellen Sie einen geeigneten Index, laden Sie die Sammlung und vergleichen Sie die Entitätsanzahl, die Skalar- und Vektorwerte sowie die Suchergebnisse mit den vor der Sicherung erfassten Quelldaten. Für eine Wiederherstellung unter dem ursprünglichen Namen verwenden Sie stattdessen <code translate="no">hello_milvus</code>.</p>
<p>Das im CLI-Handbuch verlinkte Beispiel „ <code translate="no">verify_data.py</code> “ erwartet zwei wiederhergestellte Sammlungen und löscht diese am Ende. Es ist für dieses API-Beispiel nicht geeignet, da hier nur „ <code translate="no">hello_milvus</code> “ ausgewählt wird.</p>
