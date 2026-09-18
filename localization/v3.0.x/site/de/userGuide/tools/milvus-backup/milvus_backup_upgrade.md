---
id: milvus_backup_upgrade.md
summary: >-
  Milvus Backup von 0.5.x auf 0.6.0 aktualisieren, Konfiguration und Befehle
  anpassen sowie Sicherung und Wiederherstellung überprüfen.
title: Milvus Backup auf Version 0.6.0 aktualisieren
---
<h1 id="Upgrade-Milvus-Backup-to-060" class="common-anchor-header">Milvus Backup auf Version 0.6.0 aktualisieren<button data-href="#Upgrade-Milvus-Backup-to-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Verwenden Sie diese Anleitung, wenn Sie das <strong>Milvus-Backup-Tool</strong> von 0.5.x auf 0.6.0 aktualisieren. Ihr Milvus-Server wird dabei nicht aktualisiert. Wenn Sie bei 0.5.x bleiben, verwenden Sie weiterhin die Anleitung für <a href="/docs/de/milvus_backup_cli.md">die 0.5.x-CLI</a> oder <a href="/docs/de/milvus_backup_api.md">-API</a>. Für eine Neuinstallation verwenden Sie die <a href="/docs/de/milvus_backup_0_6_cli.md">Anleitung für 0.6.0</a>.</p>
<p>V1-YAML-Konfigurationen werden weiterhin über die automatische Übersetzung geladen. Veraltete CLI-Flags werden in Version 0.6.0 jedoch abgelehnt, und das Standard-Backup-Format ändert sich in Milvus 3.0. Überprüfen Sie sowohl die Konfiguration als auch die Befehle, bevor Sie geplante Jobs oder Dienste umstellen.</p>
<h2 id="Check-the-starting-point" class="common-anchor-header">Überprüfen Sie den Ausgangspunkt<button data-href="#Check-the-starting-point" class="anchor-icon" translate="no">
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
    </button></h2><p>Notieren Sie sich Ihre Backup-Version, die Milvus-Quell- und Zielversionen, die Konfigurationsdateien, die Überschreibungen von Umgebungsvariablen, den Speicherort der Backups sowie die von Skripten oder API-Diensten verwendeten Befehle. Überprüfen Sie die <a href="/docs/de/milvus_backup_overview.md#Compatibility-matrix">Kompatibilitätsinformationen</a> für diese Serverversionen.</p>
<p>Behalten Sie die ursprünglichen Binärdateien, Konfigurationen und vorhandenen Sicherungsverzeichnisse bei, während Sie die neue Installation überprüfen. Laden Sie 0.6.0 über <a href="/docs/de/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">„Milvus Backup herunterladen“</a> in ein separates Verzeichnis herunter. Alle folgenden Befehle werden aus diesem Verzeichnis ausgeführt und rufen die Binärdatei 0.6.0 auf. Legen Sie eine Kopie Ihrer v1-Konfiguration unter „ <code translate="no">configs/backup-v1.yaml</code> “ ab.</p>
<h2 id="Migrate-the-configuration" class="common-anchor-header">Konfiguration migrieren<button data-href="#Migrate-the-configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Eine v1-Konfiguration wird in 0.6.0 weiterhin geladen. Milvus Backup konvertiert sie beim Start in v2 und gibt eine Warnung aus. So speichern Sie die konvertierte Konfiguration in einer separaten Datei:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config migrate --config configs/backup-v1.yaml --output configs/backup-v2.yaml --strict
./milvus-backup config show --config configs/backup-v2.yaml
./milvus-backup check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">--strict</code> Eine ungültige migrierte Konfiguration wird abgelehnt. Ohne „ <code translate="no">--output</code> “ schreibt der Befehl die v2-YAML-Datei in die Standardausgabe. Überprüfen Sie die neuen Einstellungen und verwenden Sie die neue Datei erst, nachdem Sie sichergestellt haben, dass alle Einstellungen korrekt sind.</p>
<table>
<thead>
<tr><th>v1-Einstellung</th><th>v2-Einstellung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.address</code>, <code translate="no">milvus.port</code></td><td><code translate="no">milvus.grpc.address</code>, <code translate="no">milvus.grpc.port</code></td></tr>
<tr><td>Quellspeicher unter <code translate="no">minio.*</code></td><td><code translate="no">milvus.storage.*</code></td></tr>
<tr><td>Backup-Speicher unter <code translate="no">minio.backup*</code></td><td><code translate="no">backup.storage.*</code></td></tr>
<tr><td>Speicher-Anmeldedaten</td><td><code translate="no">milvus.storage.auth.*</code> / <code translate="no">backup.storage.auth.*</code>, mit einer expliziten <code translate="no">auth.type</code></td></tr>
<tr><td><code translate="no">minio.crossStorage</code></td><td><code translate="no">transfer.mode</code></td></tr>
<tr><td><code translate="no">backup.gcPause.address</code></td><td><code translate="no">milvus.management.endpoint</code></td></tr>
</tbody>
</table>
<p>Überprüfen Sie die Umgebungsvariablen im Rahmen derselben Änderung wie die Konfigurationsdatei. V2 akzeptiert nur die unterstützten, anmeldebezogenen Umgebungsvariablen, wie z. B. <code translate="no">MILVUS_STORAGE_AUTH_SECRET_ACCESS_KEY</code>. Alte v1-Namen werden in einer v2-Datei nicht berücksichtigt. Für Einstellungen, die keine Anmeldedaten betreffen, wie z. B. Bucket-Namen und Endpunkte, verwenden Sie YAML oder eine Überschreibung über Konfigurationsschlüssel:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup-v2.yaml --set milvus.storage.bucketName=my-bucket
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config migrate</code> meldet betroffene Umgebungsvariablen, ohne deren geheime Werte in die Ausgabedatei zu kopieren. Siehe <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/env_variables.md">unterstützte v2-Umgebungsvariablen</a>. ` <code translate="no">config show</code> ` ersetzt den veralteten Befehl ` <code translate="no">check config</code> `.</p>
<h2 id="Update-CLI-commands" class="common-anchor-header">CLI-Befehle aktualisieren<button data-href="#Update-CLI-commands" class="anchor-icon" translate="no">
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
    </button></h2><p>In Version 0.5 veraltete Flags werden in Version 0.6.0 abgelehnt. Aktualisieren Sie Skripte, bevor Sie die Binärdatei aktualisieren.</p>
<table>
<thead>
<tr><th>Befehl</th><th>Entfernte Option</th><th>Ersatz</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">create</code></td><td><code translate="no">--colls</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--force</code> / <code translate="no">-f</code></td><td><code translate="no">--strategy skip_flush</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--meta_only</code></td><td><code translate="no">--strategy meta_only</code></td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--collections</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code>, unter Verwendung von Zielnamen</td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--restore_index</code></td><td><code translate="no">--rebuild_index</code></td></tr>
<tr><td><code translate="no">get</code></td><td><code translate="no">--detail</code> / <code translate="no">-d</code></td><td>Entfernen Sie das Flag; <code translate="no">get</code> gibt die Sicherungsinformationen zurück</td></tr>
<tr><td><code translate="no">list</code></td><td><code translate="no">--collection</code> / <code translate="no">-c</code></td><td>Kein entsprechender Sammelfilter</td></tr>
</tbody>
</table>
<p>Beispielsweise wählen diese Befehle der Version 0.5.16 den Quellnamen „ <code translate="no">coll</code> “ aus:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>Ihre Entsprechungen in Version 0.6.0 verwenden den Zielnamen für die Wiederherstellung:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Ein Wiederherstellungsfilter, der keine Übereinstimmungen findet, kann erfolgreich beendet werden, ohne eine Sammlung zu erstellen. Überprüfen Sie immer die Zielsammlung und deren Daten. Die HTTP-API „ <code translate="no">collection_names</code> “ wählt weiterhin Quellnamen in der Sicherung aus; siehe das <a href="/docs/de/milvus_backup_0_6_api.md#Restore-data">API-Handbuch für Version 0.6.0</a>.</p>
<h2 id="Choose-the-backup-behavior" class="common-anchor-header">Wählen Sie das Sicherungsverhalten<button data-href="#Choose-the-backup-behavior" class="anchor-icon" translate="no">
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
<li>Auf unterstützten Milvus 2.x-Servern verwendet das Format „ <code translate="no">auto</code> “ „binlog“. Für ein Upgrade der Sicherung ist kein Wechsel zu Milvus 3.0 erforderlich.</li>
<li>Unter Milvus 3.0 wählt „ <code translate="no">auto</code> “ „snapshot“ aus. Die offizielle Unterstützung für Sicherung und Wiederherstellung beginnt ab Milvus 3.0.1. Übergeben Sie „ <code translate="no">--format binlog</code> “, um das „binlog“-Verhalten beim Erstellen einer Sicherung beizubehalten.</li>
<li>Die Kompatibilität mit der V1-Konfiguration bewahrt keine entfernten Befehlsflags und überschreibt auch nicht die Standardwerte des neuen Formats.</li>
<li>Voreinstellungen für den Verwendungszweck können das Format und andere Optionen festlegen. Beispielsweise erzwingt „ <code translate="no">--for archive</code> “ die Verwendung des Binlogs, selbst wenn „ <code translate="no">--format snapshot</code> “ ebenfalls angegeben ist. Überprüfen Sie <a href="/docs/de/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">die Auswahl des Formats und des Verwendungszwecks</a>.</li>
<li>Externe Sammlungen werden während der Sicherung übersprungen. Überprüfen Sie die Metadaten der Sicherung, anstatt den Erfolg der Aufgabe als Beweis dafür zu betrachten, dass jede Sammlung einbezogen wurde.</li>
</ul>
<h2 id="Validate-before-switching-jobs" class="common-anchor-header">Vor dem Wechseln des Jobs validieren<button data-href="#Validate-before-switching-jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>Das folgende Beispiel behält das Binlog-Format bei und stellt die Daten in einer neuen Sammlung wieder her. Ersetzen Sie „ <code translate="no">coll</code> “ durch eine Sammlung, deren Schema, Anzahl, Skalar- und Vektorwerte sowie Suchergebnisse Sie aufgezeichnet haben. Verwenden Sie einen neuen Sicherungsnamen und stellen Sie sicher, dass der Zielname „ <code translate="no">coll_upgrade_check</code> “ nicht existiert.</p>
<pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-v2.yaml
./milvus-backup create --filter coll --format binlog -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup get -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_upgrade_check -n upgrade_check -s _upgrade_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Vergewissern Sie sich, dass die Sicherung „ <code translate="no">coll</code> “ enthält und dass „ <code translate="no">coll_upgrade_check</code> “ nach der Wiederherstellung existiert. Erstellen Sie bei Bedarf den Vektorindex, laden Sie ihn und vergleichen Sie die wiederhergestellten Daten sowie die Suchergebnisse mit der aufgezeichneten Basislinie. Lassen Sie die Quelldaten während dieses Tests unverändert.</p>
<p>Testen Sie außerdem ein repräsentatives vorhandenes Backup, bevor Sie es mit dem neuen Tool nutzen. Verwenden Sie für ein Backup 0.5.16 mit dem Namen „ <code translate="no">legacy_backup</code> “, das „ <code translate="no">coll</code> “ enthält, einen separaten Zielnamen:</p>
<pre><code translate="no" class="language-shell">./milvus-backup get -n legacy_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_legacy_check -n legacy_backup -s _legacy_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Diese Upgrade-Pfade wurden mit <strong>Milvus 2.6.11</strong>, Backup <strong>0.5.16 → 0.6.0</strong> und Binlog-Backups in MinIO validiert. Sowohl neu erstellte als auch vorhandene Backups wurden mit übereinstimmenden Entitätswerten und Vektorsuchergebnissen wiederhergestellt. Dies bedeutet jedoch nicht, dass die Kompatibilität für jedes historische Backup oder für die Wiederherstellung von Milvus 2.x auf 3.0 gewährleistet ist. Es bedeutet auch nicht, dass 0.5.x Backups lesen kann, die mit 0.6.0 erstellt wurden.</p>
<p>Sobald die Validierung erfolgreich verläuft, aktualisieren Sie die Jobs so, dass sie die neue Binärdatei, die geprüfte Konfiguration, die Umgebungseinstellungen und die Ersatzflags gemeinsam verwenden. Bei API-Bereitstellungen starten Sie den neuen Dienst mit der geprüften Konfiguration und überprüfen Sie den Abschluss der Aufgaben über die <a href="/docs/de/milvus_backup_0_6_api.md">0.6.0-HTTP-API</a>. Um Snapshots unter Milvus 3.0.1 oder höher zu übernehmen, befolgen Sie die Anleitung <a href="/docs/de/snapshot-backup-and-restore.md">„Snapshot-Sicherung und -Wiederherstellung in einer Instanz</a>“.</p>
