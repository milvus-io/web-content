---
id: milvus_backup_0_6_api.md
summary: >-
  Erstellen und überwachen Sie Sicherungs- und Wiederherstellungsaufgaben von
  Milvus Backup 0.6.0 über die HTTP-API.
title: Verwendung der Milvus Backup 0.6.0 HTTP-API
---
<h1 id="Use-the-Milvus-Backup-060-HTTP-API" class="common-anchor-header">Verwendung der Milvus Backup 0.6.0 HTTP-API<button data-href="#Use-the-Milvus-Backup-060-HTTP-API" class="anchor-icon" translate="no">
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
    </button></h1><p>Verwenden Sie die Milvus Backup HTTP-API, um Backups zu erstellen, Sammlungen wiederherzustellen und asynchrone Aufgaben zu überwachen. Das folgende Beispiel basiert auf <strong>Milvus Backup 0.6.0</strong> in Verbindung mit <strong>Milvus 3.0.1 oder höher</strong>. Für Backup 0.5.x verwenden Sie bitte das <a href="/docs/de/milvus_backup_api.md">API-Handbuch für 0.5.x</a>. Informationen zu einer bestehenden Installation finden Sie unter <a href="/docs/de/milvus_backup_upgrade.md">„Milvus Backup aktualisieren</a>“.</p>
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
    </button></h2><p>Laden Sie die entsprechende Binärdatei aus der <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">Version v0.6.0</a> herunter und entpacken Sie sie. Um stattdessen aus dem Quellcode zu kompilieren, befolgen Sie <a href="/docs/de/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">die Anweisungen unter „Milvus Backup beziehen“</a>; für die Kompilierung ist Go 1.26 oder höher erforderlich.</p>
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
    </button></h2><p>Erstellen Sie <a href="/docs/de/milvus_backup_0_6_cli.md#Prepare-configuration-file">die Datei</a> „ <code translate="no">configs/backup.yaml</code> “ anhand des v2-Beispiels unter <a href="/docs/de/milvus_backup_0_6_cli.md#Prepare-configuration-file">„Konfigurationsdatei vorbereiten</a>“. Konfigurieren Sie den Zugriff auf Milvus, den Speicher der Instanz und das Backup-Ziel. Der Milvus-Server muss zudem für Snapshot-Vorgänge auf den Backup-Speicher zugreifen können.</p>
<p>Wenn Sie eine v1-Datei haben, kann diese weiterhin geladen werden. Siehe <a href="/docs/de/milvus_backup_upgrade.md#Migrate-the-configuration">„Konfiguration migrieren“</a>, bevor Sie das Schema oder die Umgebungsvariablen ändern.</p>
<p>Überprüfen Sie im Verzeichnis, das die Binärdatei enthält, die Konfiguration und die Konnektivität:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Fahren Sie fort, wenn die Verbindungsprüfung den Status „ <code translate="no">Success!</code> “ anzeigt.</p>
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
    </button></h2><p>Starten Sie den Dienst mit der von Ihnen überprüften Konfiguration:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Der Standardport ist 8080. Um einen anderen Port auszuwählen, verwenden Sie <code translate="no">-p</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 18080 --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Führen Sie für einen bestimmten Dienst nur einen dieser Befehle aus. In den folgenden Beispielen wird Port 8080 verwendet; ändern Sie die URLs entsprechend, wenn Sie einen anderen Port ausgewählt haben. Die Swagger-Benutzeroberfläche ist unter <code translate="no">http://localhost:8080/api/v1/docs/index.html</code> verfügbar.</p>
<p>Lassen Sie den Dienst während der Abfrage von Aufgaben laufen. Aufgaben-IDs und der aktuelle Fortschritt gehören zum Dienstprozess; die persistente Sicherung verbleibt nach Beendigung des Prozesses im Objektspeicher.</p>
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
    </button></h2><p>Verwenden Sie eine vorhandene Sammlung mit dem Namen „ <code translate="no">coll</code> “ oder erstellen Sie die Testsammlung mit 256 Entitäten aus dem Abschnitt <a href="/docs/de/snapshot-backup-and-restore.md#Prepare-sample-data">„Beispieldaten vorbereiten</a>“. Ändern Sie die Sammlungsnamen in den Anfragen, wenn Sie eigene Daten verwenden. Behalten Sie die Testdaten unverändert bei, während Sie das Ergebnis überprüfen.</p>
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
    </button></h2><p>Senden Sie eine asynchrone Sicherungsanfrage:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;]
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Die Antwort enthält eine „ <code translate="no">requestId</code> “. Das Absenden bedeutet nicht, dass die Sicherung abgeschlossen ist. Kopieren Sie diesen Wert in „ <code translate="no">backup_id</code> “ und führen Sie eine Abfrage durch:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_backup?backup_id=BACKUP_REQUEST_ID&amp;backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Warten Sie, bis aus „ <code translate="no">data.state_code</code> “ „ <code translate="no">2</code> “ wird. Die API verwendet folgende Aufgabenstatus:</p>
<table>
<thead>
<tr><th><code translate="no">state_code</code></th><th>Bedeutung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">0</code></td><td>Anfänglich</td></tr>
<tr><td><code translate="no">1</code></td><td>Wird ausgeführt</td></tr>
<tr><td><code translate="no">2</code></td><td>Erfolg</td></tr>
<tr><td><code translate="no">3</code></td><td>Fehlgeschlagen</td></tr>
<tr><td><code translate="no">4</code></td><td>Zeitüberschreitung</td></tr>
</tbody>
</table>
<p>Überprüfen Sie sowohl die Antwort als auch den Aufgabenstatus. Ein HTTP-Status 200 allein reicht nicht aus: Ein Antwort <code translate="no">code</code> -Wert ungleich Null weist auf einen Fehler hin. Bei einer erfolgreichen Antwort kann „ <code translate="no">code</code> “ weggelassen werden, da sein Wert Null ist. Wenn eine Aufgabe fehlschlägt oder eine Zeitüberschreitung auftritt, überprüfen Sie die Antwortdetails und das Serverprotokoll, bevor Sie die Wiederherstellung aus diesem Backup durchführen.</p>
<p>Listen Sie die gespeicherten Backups auf und überprüfen Sie das abgeschlossene Backup anhand des Namens:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/list&#x27;
curl &#x27;http://localhost:8080/api/v1/get_backup?backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">get_backup</code> gibt JSON-Metadaten zurück, einschließlich <code translate="no">collection_backups</code>; es werden <strong>keine</strong> Sicherungsdateien heruntergeladen. Bei einer von einem anderen Prozess erstellten Sicherung kann eine reine Namensabfrage Metadaten ohne den aktuellen Aufgabenfortschritt zurückgeben. Verwenden Sie die Aufgaben-ID aus der Erstellungsantwort des aktuellen Dienstes, wenn Sie eine aktive Sicherung überwachen.</p>
<p>Das Standardformat ist „ <code translate="no">auto</code> “, wodurch unter Milvus 3.0 ein Snapshot ausgewählt wird. Um explizit ein Binlog anzufordern, fügen Sie „ <code translate="no">&quot;format&quot;: &quot;binlog&quot;</code> “ zum „create“-Body hinzu. Die Voreinstellungen der CLI unter „ <code translate="no">--for</code> “ sind kein Feld der HTTP-Anfrage.</p>
<p>Um das Backup zu erhalten oder zu verschieben, kopieren Sie das gesamte Verzeichnis in den Objektspeicher. Siehe die <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">Übertragungsanleitung für Version 0.6.0</a>.</p>
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
    </button></h2><p>Stellen Sie sicher, dass „ <code translate="no">coll_bak</code> “ noch nicht existiert. Senden Sie eine Wiederherstellungsanfrage mit einem Suffix:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;_bak&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Das HTTP-Feld „ <code translate="no">collection_names</code> “ wählt Namen <strong>im Backup</strong> aus, bevor das Suffix angehängt wird. Diese Anfrage wählt „ <code translate="no">coll</code> “ aus und erstellt „ <code translate="no">coll_bak</code> “. Die CLI-Option „ <code translate="no">--filter</code> “ gleicht hingegen Zielnamen nach der Umbenennung ab; ersetzen Sie in diesem HTTP-Feld nicht „ <code translate="no">coll_bak</code> “.</p>
<p>Kopieren Sie <code translate="no">data.id</code> aus der Wiederherstellungsantwort und fragen Sie den Auftrag ab:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_restore?id=RESTORE_TASK_ID&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Warten Sie auf „ <code translate="no">data.state_code: 2</code> “ und überprüfen Sie unter „ <code translate="no">collection_restore_tasks</code> “, ob die erwartete Zielsammlung vorhanden ist. Eine übermittelte Aufgabe ist noch keine verifizierte Wiederherstellung.</p>
<h3 id="Restore-with-the-original-name" class="common-anchor-header">Wiederherstellung unter dem ursprünglichen Namen<button data-href="#Restore-with-the-original-name" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie eine Zielinstanz, in der <code translate="no">coll</code> nicht existiert. Starten Sie einen separaten Backup-API-Dienst, der für dieses Ziel und den Speicherort der abgeschlossenen Sicherung konfiguriert ist, und senden Sie dann diese Anfrage an den Zieldienst:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Fragen Sie „ <code translate="no">get_restore</code> “ auf demselben Dienst mithilfe der zurückgegebenen Aufgaben-ID ab. Konfigurieren Sie „ <code translate="no">milvus.*</code> “ für das Wiederherstellungsziel und „ <code translate="no">backup.storage</code> “ für das vorhandene Backup. Siehe <a href="/docs/de/milvus_backup_0_6_cli.md#Prepare-configuration-file">„Konfigurationsdatei vorbereiten</a>“.</p>
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
    </button></h2><p>Nachdem die Wiederherstellungsaufgabe erfolgreich abgeschlossen wurde, stellen Sie eine Verbindung zur Milvus-Zielinstanz her und überprüfen Sie, ob die erwartete Sammlung und die Daten vorhanden sind. Verwenden Sie für die Testsammlung mit 256 Entitäten die vollständigen Skalar-, Vektor- und Suchprüfungen unter <a href="/docs/de/snapshot-backup-and-restore.md#Verify-the-result">„Ergebnis überprüfen</a>“.</p>
<p>Ändern Sie „ <code translate="no">coll_bak</code> “ in „ <code translate="no">coll</code> “, wenn Sie unter dem ursprünglichen Namen wiederherstellen. Der Verifizierungscode liest die wiederhergestellten Daten, ohne sie zu löschen. Bei Produktionsdaten vergleichen Sie diese mit einer zum Zeitpunkt der Sicherung erfassten Baseline.</p>
