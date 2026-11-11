---
id: milvus_backup_overview.md
summary: >-
  Milvus Backup bietet CLI- und HTTP-API-Workflows zum Sichern und
  Wiederherstellen von Milvus-Daten.
title: Milvus Backup
---
<h1 id="Milvus-Backup" class="common-anchor-header">Milvus Backup<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup sichert Milvus-Sammlungen und stellt sie in derselben oder einer anderen Instanz wieder her. Es bietet eine Befehlszeilenschnittstelle (CLI) und eine HTTP-API.</p>
<p>Milvus Backup <strong>0.6.0</strong> bietet nun Snapshot-Backups für Milvus 3.0, ein versioniertes v2-Konfigurationsschema sowie zweckgebundene Voreinstellungen für die Erstellung von Backups. Die offizielle Unterstützung für Backups und Wiederherstellungen unter Milvus 3.0 beginnt mit <strong>Milvus 3.0.1</strong>.</p>
<h2 id="Choose-your-guide" class="common-anchor-header">Wählen Sie Ihre Anleitung<button data-href="#Choose-your-guide" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Backup verfügt über eine eigene Release-Version, die unabhängig von der Milvus-Serverversion ist. Die aktuellen Anleitungen beziehen sich auf die 0.6.x-Serie; im Abschnitt „Backup 0.5.x“ werden die früheren Arbeitsabläufe behandelt. Die Bezeichnungen in den Seitentiteln geben die jeweilige Backup-Serie an. Installationsanleitungen und Beispiele basieren auf einer bestimmten, validierten Version. Überprüfen Sie die Kompatibilität von Quell- und Ziel-Milvus-Server separat.</p>
<table>
<thead>
<tr><th>Ihre Aufgabe</th><th>Anleitung</th></tr>
</thead>
<tbody>
<tr><td>Weiterverwendung von Backup 0.5.x</td><td><a href="/docs/de/milvus_backup_cli.md">Befehle</a> und <a href="/docs/de/milvus_backup_api.md">HTTP-API</a><a href="/docs/de/milvus_backup_cli.md">der Version 0.5.x</a>, mit Beispielen, die auf 0.5.16 bezogen sind</td></tr>
<tr><td>Eine bestehende Backup-Installation aktualisieren</td><td><a href="/docs/de/milvus_backup_upgrade.md">Upgrade von 0.5.x auf 0.6.x</a></td></tr>
<tr><td>Installation und Verwendung von Backup 0.6.x</td><td><a href="/docs/de/milvus_backup_0_6_cli.md">Befehle und Konfiguration</a> oder <a href="/docs/de/milvus_backup_0_6_api.md">HTTP-API</a></td></tr>
<tr><td>Sichern und Wiederherstellen eines Snapshots unter Milvus 3.0.1 oder höher</td><td><a href="/docs/de/snapshot-backup-and-restore.md">Snapshot-Sicherung und -Wiederherstellung in einer Instanz</a></td></tr>
</tbody>
</table>
<p>Die bestehenden Anleitungen <a href="/docs/de/single-instance-backup-and-restore.md">zu „In derselben Instanz“</a>, <a href="/docs/de/shared-bucket-backup-and-restore.md">„Gemeinsamer Bucket“</a>, <a href="/docs/de/cross-bucket-backup-and-restore.md">„Bucket-übergreifend“</a> und <a href="/docs/de/multi-storage-backup-and-restore.md">„Speicherort-übergreifend“</a> behalten die Konfiguration und Befehle der Version 0.5.16 bei. Die darin enthaltenen Beispiele werden nicht an neue Versionen angepasst, wenn eine neue Backup-Version veröffentlicht wird.</p>
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
<li>Verwenden Sie eine Backup-Binärdatei und Konfigurationsbeispiele aus derselben Version. Das <a href="/docs/de/milvus_backup_cli.md#Obtain-Milvus-Backup">0.5.x-Handbuch</a> bezieht sich auf Version 0.5.16; das <a href="/docs/de/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">aktuelle Handbuch</a> bezieht sich auf Version 0.6.0.</li>
<li>Stellen Sie Netzwerkzugriff auf Milvus, dessen Speicher und das Backup-Ziel bereit. Für Snapshot-Vorgänge muss der Milvus-Server zudem den Backup-Speicher erreichen können.</li>
<li>Überprüfen Sie die Serverkompatibilität unten. Go ist nur erforderlich, wenn Sie aus dem Quellcode kompilieren: Version 1.25 oder höher für Backup 0.5.16 und 1.26 oder höher für 0.6.0.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">Architektur<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_backup_architecture.png" alt="Milvus Backup components" class="doc-image" id="milvus-backup-components" /> 
   <span>Milvus-Backup-Komponenten</span>
  
 </span></p>
<p>Milvus Backup koordiniert die Metadaten der Sammlung sowie die Datensicherungen zwischen der Milvus-Instanz und dem Backup-Speicher. In Backup 0.6.0 bestimmt das ausgewählte Format, wie die Sammlungsdaten exportiert und wiederhergestellt werden:</p>
<table>
<thead>
<tr><th>Format</th><th>Verhalten bei Sicherung und Wiederherstellung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">snapshot</code></td><td>Milvus exportiert ein Sammlung-Snapshot-Bundle. Milvus Backup erfasst die Informationen des Bundles, und bei der Wiederherstellung wird das Bundle über Milvus importiert. Der Server verwaltet das daraus resultierende Datenlayout.</td></tr>
<tr><td><code translate="no">binlog</code></td><td>Milvus Backup kopiert die Datendateien und Metadaten der Sammlung, erstellt die Sammlungen anschließend neu und importiert die gesicherten Daten während der Wiederherstellung.</td></tr>
<tr><td><code translate="no">auto</code></td><td>Wählen Sie das Format entsprechend den vom Server unterstützten Funktionen aus. Unter Milvus 3.0 wird „Snapshot“ ausgewählt.</td></tr>
</tbody>
</table>
<p>Ein Sicherungsverzeichnis enthält Metadaten und die für das jeweilige Format erforderlichen Dateien. Behalten Sie das gesamte Verzeichnis bei, wenn Sie es archivieren oder verschieben. Gehen Sie nicht davon aus, dass eine Snapshot-Sicherung die Verzeichnisstruktur des Binlogs verwendet.</p>
<p>In Version 0.6.0 konfigurieren die Voreinstellungen unter „ <code translate="no">create --for</code> “ zweckgebundene Optionen: „ <code translate="no">clone</code> “ behält das gewählte Format bei, während „ <code translate="no">archive</code> “ und „ <code translate="no">secondary</code> “ das „binlog“-Verzeichnis erfordern. Ein Sekundärserver erfordert zudem eine konfigurierte Replikationstopologie; eine gewöhnliche Migration zwischen Instanzen erfordert keinen Sekundärserver. Siehe <a href="/docs/de/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">„Wählen Sie ein Sicherungsformat oder einen Zweck</a>“.</p>
<p>Backup 0.6.0 überspringt externe Sammlungen während der Sicherung. Eine erfolgreich abgeschlossene Aufgabe bedeutet nicht, dass Daten aus externen Sammlungen einbezogen wurden.</p>
<h2 id="Compatibility-matrix" class="common-anchor-header">Kompatibilitätsmatrix<button data-href="#Compatibility-matrix" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Backup 0.6.0 erfordert kein Upgrade jeder Milvus-Installation auf 3.0.</strong> Es unterstützt Binlog-Workflows auf unterstützten Milvus 2.x-Versionen. Die offizielle Unterstützung für Backup und Wiederherstellung der Milvus 3.0-Reihe beginnt mit <strong>Milvus 3.0.1</strong>; das Snapshot-Beispiel verwendet diese Reihe.</p>
<p>Die <a href="/docs/de/milvus_backup_upgrade.md">Upgrade-Anleitung</a> wurde mit Backup 0.5.16 und 0.6.0 auf Milvus 2.6.11 validiert, einschließlich der Wiederherstellung eines Backups aus Version 0.5.16 mit Version 0.6.0. Diese getestete Kombination erweitert die untenstehende Matrix nicht.</p>
<p>Die Quell- und Zielversionen von Milvus müssen ein unterstütztes Paar bilden. Eine neuere Zielversion allein gewährleistet noch keine Kompatibilität. Die folgende Kompatibilitätsmatrix für ältere Versionen deckt Milvus 2.x ab, wie seit Milvus Backup 0.5.7 dokumentiert; sie gewährleistet keine Kompatibilität bei der Migration von 2.x auf 3.0.</p>
<table>
<thead>
<tr><th>Sicherung von ↓ / Wiederherstellung auf →</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th><th>Milvus v2.6.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus v2.2.x</td><td>Nein</td><td>Nein</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Milvus v2.3.x</td><td>Nein</td><td>Nein</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Milvus v2.4.x</td><td>Nein</td><td>Nein</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Milvus v2.5.x</td><td>Nein</td><td>Nein</td><td>Nein</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Milvus v2.6.x</td><td>Nein</td><td>Nein</td><td>Nein</td><td>Nein</td><td>Ja</td></tr>
</tbody>
</table>
<p>Überprüfen Sie vor einer versionsübergreifenden Migration die Quellversion, die Zielversion und das Sicherungsformat anhand der <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">Dokumentation zur Sicherungsversion</a>. Diese Anleitungen erweitern die Kompatibilitätsmatrix nicht auf nicht aufgeführte Kombinationen.</p>
<h2 id="Release-notes" class="common-anchor-header">Versionshinweise<button data-href="#Release-notes" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0</a></li>
</ul>
