---
id: snapshots.md
title: SnapshotsCompatible with Milvus 3.0.x
summary: >-
  Verwenden Sie Snapshots, um den Zustand der Sammlung zu einem bestimmten
  Zeitpunkt für Rollbacks, die Versionsverwaltung und Tests zu erfassen.
beta: Milvus 3.0.x
---
<h1 id="Snapshots" class="common-anchor-header">Snapshots<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>Ein Snapshot ist eine Momentaufnahme einer Milvus-Sammlung, die sich ideal für schnelle Rollbacks, die Versionsverwaltung und Tests eignet. Er erfasst den Zustand der Sammlung zu einem bestimmten Zeitpunkt und speichert ausschließlich Metadaten und Manifestdateien wie das Schema, Indizes und Vektordatendateien (Binlogs), um eine effiziente Speicherung und Wiederherstellung zu gewährleisten.</p>
<p>Snapshots sind schnelle Momentaufnahmen von Daten, die sich für schnelle Rollbacks oder Tests eignen (<strong>Tage bis Wochen</strong>). Im Gegensatz dazu sind Backups eigenständige, vollständige Kopien, die separat für die langfristige Notfallwiederherstellung (<strong>Wochen bis Jahre</strong>) und zum besseren Schutz vor einem vollständigen Speicherausfall gespeichert werden.</p>
<p>Informationen zum Erstellen von Backups finden Sie unter <a href="/docs/de/milvus_backup_overview.md">„Milvus Backup</a>“.</p>
<h2 id="Snapshot-anatomy" class="common-anchor-header">Aufbau eines Snapshots<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus implementiert eine manifestbasierte Snapshot-Architektur für die effiziente Erfassung, Speicherung und Wiederherstellung von Daten zu einem bestimmten Zeitpunkt, ohne die eigentlichen Vektordaten zu duplizieren. Die Architektur trennt die Metadatenverwaltung von der physischen Datenspeicherung und ermöglicht so ressourcenschonende Snapshots, die auf vorhandene Segmentdateien im Objektspeicher verweisen.</p>
<p>Wenn Sie einen Snapshot für eine Sammlung erstellen, erfasst Milvus Folgendes:</p>
<ul>
<li><p><strong>Snapshot-Metadaten</strong></p>
<p>Sie enthalten grundlegende Informationen zur Erstellung des Snapshots, darunter den Namen und die Beschreibung des Snapshots, die ID der Zielsammlung sowie den Zeitpunkt, zu dem der Snapshot erstellt wurde.</p></li>
<li><p><strong>Sammlungsbeschreibung</strong></p>
<p>Sie enthält die Beschreibung der Zielsammlung, einschließlich ihrer Schemadefinition, Partitionsinformationen und Eigenschaften.</p></li>
<li><p><strong>Indexinformationen</strong></p>
<p>Hier werden die Index-Metadaten und die Pfade zu den Indexdateien gespeichert.</p></li>
<li><p><strong>Segmentdaten</strong></p>
<p>Hier werden die Vektordatendateien (Binlogs), Löschprotokolle (Deltalogs) und Indexdateien erfasst.</p></li>
</ul>
<p>Aus den oben genannten Informationen generiert Milvus für jedes Segment eine Apache-Avro-Manifestdatei und speichert die Snapshot-Metadaten, die Kollektionsbeschreibung, die Indexinformationen sowie die Pfade zu den Manifestdateien in einer JSON-Datei. Das folgende Diagramm veranschaulicht die Ordnerstruktur des Snapshots.</p>
<pre><code translate="no" class="language-text">snapshots/{collection_id}/
├── metadata/
│   └── {snapshot_id}.json         # Snapshot metadata (JSON format)
│
└── manifests/
    └── {snapshot_id}/             # Directory for each snapshot
        ├── {segment_id_1}.avro    # Individual segment manifest (Avro format)
        ├── {segment_id_2}.avro
        └── ...
<button class="copy-code-btn"></button></code></pre>
<p>Das Erstellen eines Snapshots dauert in der Regel Millisekunden, die Wiederherstellung je nach Datenvolumen Sekunden bis Minuten.</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">Auswirkungen auf den Speicherplatz und zu beachtende Aspekte<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Milvus auf ein Segment oder eine Indexdatei in einem Snapshot verweist, werden diese Dateien nicht mehr durch die Garbage Collection entfernt, es sei denn, Sie löschen den Snapshot. Snapshots beanspruchen Speicherplatz proportional zur Größe der Zielsammlungen, und für die Aufbewahrungsdauer der Snapshots fallen Objektspeicherkosten an. In extremen Fällen kann ein einzelner Snapshot Ihre Objektspeicherkosten sogar verdoppeln. Es wird empfohlen,</p>
<ul>
<li>Entfernen Sie regelmäßig alte Snapshots, um Speicherplatz zu sparen.</li>
<li>beschreibende Namen und Beschreibungen für spätere Referenzzwecke zu verwenden.</li>
<li>die Ergebnisse der Snapshot-Erstellung und -Wiederherstellung stets zu überprüfen.</li>
<li>die Zeitstempel der Snapshot-Erstellung und die Speichernutzung zur Überwachung und Fehlerbehebung zu verfolgen.</li>
<li>speichern Sie die IDs der Wiederherstellungsaufträge zur Überwachung und Fehlerbehebung.</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">Beschränkungen und Einschränkungen<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
<li>Snapshots sind nach ihrer Erstellung unveränderbar.</li>
<li>Sie können einen Snapshot nur in einer neuen Sammlung innerhalb desselben Clusters wie das Original wiederherstellen.</li>
<li>Wiederhergestellte Sammlungen behalten dasselbe Schema, dieselbe Anzahl an Shards und dieselbe Partitionsanzahl bei.</li>
<li>Wiederhergestellte historische Daten können mit TTL-Richtlinien in Konflikt geraten. Es wird empfohlen, TTL zu deaktivieren oder die TTL-Einstellungen anzupassen, bevor Sie Snapshots erstellen.</li>
<li>Um einen Snapshot als externe Quelle für „ <code translate="no">milvus-table</code> “ zu verwenden, muss der Quell-Snapshot aus einer normalen StorageV3-Milvus-Sammlung stammen. Snapshots externer Sammlungen werden nicht als „ <code translate="no">milvus-table</code> “-Quellen unterstützt.</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">Weiterführende Informationen<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
<li><a href="/docs/de/manage-snapshots.md">Snapshots verwalten</a> – Snapshots erstellen, auflisten, beschreiben, anheften, wiederherstellen und löschen.</li>
<li><a href="/docs/de/snapshot-use-cases.md">Anwendungsfälle für Snapshots</a> – gängige Muster und Arbeitsabläufe.</li>
<li><a href="/docs/de/milvus_backup_overview.md">Milvus-Backup</a> – Langzeit-Backup und -Wiederherstellung clusterübergreifend.</li>
</ul>
