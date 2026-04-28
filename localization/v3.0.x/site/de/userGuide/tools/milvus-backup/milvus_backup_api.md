---
id: milvus_backup_api.md
summary: 'Erfahren Sie, wie Sie Milvus Backup über API verwenden können'
title: Sichern und Wiederherstellen von Daten über APIs
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">Sichern und Wiederherstellen von Daten über APIs<button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup bietet Funktionen zur Datensicherung und -wiederherstellung, um die Sicherheit Ihrer Milvus-Daten zu gewährleisten.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Beziehen Sie Milvus Backup<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können entweder die kompilierte Binärdatei herunterladen oder aus dem Quellcode bauen.</p>
<p>Um die kompilierte Binärdatei herunterzuladen, gehen Sie auf die <a href="https://github.com/zilliztech/milvus-backup/releases">Release-Seite</a>, wo Sie alle offiziellen Releases finden. Denken Sie daran, dass Sie immer die Binärdateien in der als <strong>"Latest"</strong> gekennzeichneten Version verwenden sollten.</p>
<p>Um aus dem Quellcode zu kompilieren, gehen Sie wie folgt vor:</p>
<pre><code translate="no" class="language-shell">git clone git@github.com:zilliztech/milvus-backup.git
go get
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
    </button></h2><p>Laden Sie die <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/master/configs/backup.yaml">Beispielkonfigurationsdatei</a> herunter und passen Sie sie an Ihre Bedürfnisse an.</p>
<p>Erstellen Sie dann einen Ordner neben der heruntergeladenen oder erstellten Milvus Backup-Binärdatei, benennen Sie den Ordner <code translate="no">configs</code> und legen Sie die Konfigurationsdatei in den Ordner <code translate="no">configs</code>.</p>
<p>Ihre Ordnerstruktur sollte in etwa so aussehen wie die folgende:</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>Da Milvus Backup Ihre Daten nicht in einem lokalen Pfad sichern kann, stellen Sie sicher, dass die Minio-Einstellungen korrekt sind, wenn Sie die Konfigurationsdatei anpassen.</p>
<div class="alert note">
<p>Der Name des Standard-Minio-Buckets variiert je nach der Art der Milvus-Installation. Wenn Sie Änderungen an den Minio-Einstellungen vornehmen, sollten Sie sich an der folgenden Tabelle orientieren.</p>
<table>
<thead>
<tr><th>Feld</th><th>Docker Compose</th><th>Helm/Milvus-Bediener</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-Bucket</td><td>milvus-Bucket</td></tr>
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
<p>Der API-Server lauscht standardmäßig auf Port 8080. Sie können dies ändern, indem Sie ihn mit dem Flag <code translate="no">-p</code> ausführen. Um den API-Server zu starten, der an Port 443 lauscht, gehen Sie wie folgt vor:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>Sie können auf die Swagger-Benutzeroberfläche über http://localhost zugreifen:<port>/api/v1/docs/index.html.</p>
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
    </button></h2><p>Wenn Sie eine leere lokale Milvus-Instanz betreiben, die auf dem Standard-Port 19530 lauscht, verwenden Sie die Python-Beispielskripte, um einige Daten in Ihrer Instanz zu erzeugen. Sie können die Skripte nach Belieben an Ihre Bedürfnisse anpassen.</p>
<p>Besorgen Sie sich die <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/main/example/prepare_data.py">Skripte</a>. Führen Sie dann die Skripte aus, um die Daten zu erzeugen. Stellen Sie sicher, dass <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, das offizielle Milvus Python SDK, installiert ist.</p>
<pre><code translate="no" class="language-shell">python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Dieser Schritt ist optional. Wenn Sie diesen Schritt überspringen, stellen Sie sicher, dass Sie bereits einige Daten in Ihrer Milvus-Instanz haben.</p>
<h2 id="Back-up-data" class="common-anchor-header">Sichern von Daten<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
<p>Beachten Sie, dass die Ausführung von Milvus Backup gegen eine Milvus-Instanz normalerweise keinen Einfluss auf den Betrieb der Instanz hat. Ihre Milvus-Instanz ist während der Sicherung oder Wiederherstellung voll funktionsfähig.</p>
<p>Führen Sie den folgenden Befehl aus, um ein Backup zu erstellen. Ändern Sie <code translate="no">collection_names</code> und <code translate="no">backup_name</code> falls nötig.</p>
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
<p>Sobald der Befehl ausgeführt wurde, können Sie die Backups in dem in den Minio-Einstellungen angegebenen Bucket wie folgt auflisten:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/list&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Und laden Sie die Sicherungsdateien wie folgt herunter:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Ändern Sie bei der Ausführung des obigen Befehls <code translate="no">backup_id</code> und <code translate="no">backup_name</code> in die von der Listen-API zurückgegebenen Werte.</p>
<p>Jetzt können Sie die Sicherungsdateien an einem sicheren Ort speichern, um sie später wiederherzustellen, oder sie in die <a href="https://cloud.zilliz.com">Zilliz Cloud</a> hochladen, um eine verwaltete Vektordatenbank mit Ihren Daten zu erstellen. Weitere Informationen finden Sie unter <a href="https://zilliz.com/doc/migrate_from_milvus-2x">Migrieren von Milvus zu Zilliz Cloud</a>.</p>
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
<p>Sie können den API-Befehl restore mit der Option <code translate="no">collection_suffix</code> aufrufen, um eine neue Sammlung zu erstellen, indem Sie die Daten aus dem Backup wiederherstellen. Ändern Sie <code translate="no">collection_names</code> und <code translate="no">backup_name</code>, falls erforderlich.</p>
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
<p>Mit der Option <code translate="no">collection_suffix</code> können Sie ein Suffix für die neu zu erstellende Sammlung festlegen. Mit dem obigen Befehl wird eine neue Sammlung mit dem Namen <strong>hello_milvus_recover</strong> in Ihrer Milvus-Instanz erstellt.</p>
<p>Wenn Sie die gesicherte Sammlung wiederherstellen möchten, ohne ihren Namen zu ändern, löschen Sie die Sammlung, bevor Sie sie aus der Sicherung wiederherstellen. Sie können nun die in <a href="#Prepare-data">Prepare data</a> erzeugten Daten bereinigen, indem Sie den folgenden Befehl ausführen.</p>
<pre><code translate="no" class="language-shell">python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Führen Sie dann den folgenden Befehl aus, um die Daten aus der Sicherung wiederherzustellen.</p>
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
<p>Der Wiederherstellungsprozess kann je nach Größe der wiederherzustellenden Daten sehr zeitaufwändig sein. Daher werden alle Wiederherstellungsaufgaben asynchron ausgeführt. Sie können den Status eines Wiederherstellungsauftrags überprüfen, indem Sie ihn ausführen:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Denken Sie daran, <code translate="no">test_restore_id</code> in die von der Wiederherstellungs-API wiederhergestellte Datei zu ändern.</p>
<h2 id="Verify-restored-data" class="common-anchor-header">Überprüfen der wiederhergestellten Daten<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald die Wiederherstellung abgeschlossen ist, können Sie die wiederhergestellten Daten überprüfen, indem Sie die wiederhergestellte Sammlung wie folgt indizieren:</p>
<pre><code translate="no" class="language-shell">python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Beachten Sie, dass das obige Skript davon ausgeht, dass Sie den Befehl <code translate="no">restore</code> mit dem Flag <code translate="no">-s</code> ausgeführt haben und das Suffix auf <code translate="no">-recover</code> gesetzt ist. Sie können das Skript nach Belieben an Ihre Bedürfnisse anpassen.</p>
