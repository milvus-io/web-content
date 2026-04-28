---
id: snapshots.md
title: SchnappschüsseCompatible with Milvus 3.0.x
summary: >-
  Verwenden Sie Snapshots, um den Zustand von Sammlungen zu einem bestimmten
  Zeitpunkt für Rollback, Versionierung und Tests zu erfassen.
beta: Milvus 3.0.x
---
<h1 id="Snapshots" class="common-anchor-header">Schnappschüsse<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>Ein Snapshot ist ein zeitpunktbezogenes Abbild einer Milvus-Sammlung, das sich ideal für schnelle Rollbacks, Versionierung und Tests eignet. Er erfasst den Zustand der Sammlung zu einem bestimmten Zeitpunkt und speichert nur Metadaten und Manifestdateien, wie das Schema, Indizes und Vektordatendateien (binlogs), um eine effiziente Speicherung und Wiederherstellung zu ermöglichen.</p>
<div class="alert note">
<p>Snapshots sind schnelle, zeitpunktgenaue Abbilder von Daten, die sich für schnelle Rollbacks oder Tests<strong>(Tage bis Wochen</strong>) eignen. Gleichzeitig sind Backups unabhängige, vollständige Kopien, die separat gespeichert werden, um eine langfristige Wiederherstellung im Katastrophenfall<strong>(Wochen bis Jahre</strong>) und einen besseren Schutz vor einem totalen Speicherausfall zu gewährleisten.</p>
<p>Wie Sie Backups erstellen, erfahren Sie unter <a href="/docs/de/milvus_backup_overview.md">Milvus Backup</a>.</p>
</div>
<h2 id="Snapshot-anatomy" class="common-anchor-header">Snapshot-Anatomie<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus implementiert eine manifestbasierte Snapshot-Architektur für die effiziente punktuelle Erfassung, Speicherung und Wiederherstellung von Daten ohne Duplizierung der eigentlichen Vektordaten. Die Architektur trennt die Verwaltung von Metadaten von der physischen Datenspeicherung und ermöglicht leichtgewichtige Snapshots, die auf vorhandene Segmentdateien im Objektspeicher verweisen.</p>
<p>Wenn Sie einen Snapshot für eine Sammlung erstellen, sammelt Milvus die folgenden Daten:</p>
<ul>
<li><p><strong>Snapshot-Metadaten</strong></p>
<p>Sie liefern grundlegende Informationen für die Erstellung des Snapshots, einschließlich des Snapshot-Namens und der Snapshot-Beschreibung, der Zielsammlungs-ID und des Zeitpunkts, zu dem der Snapshot erstellt wird.</p></li>
<li><p><strong>Beschreibung der Sammlung</strong></p>
<p>Sie enthält die Beschreibung der Zielsammlung, einschließlich ihrer Schemadefinition, Partitionsinformationen und Eigenschaften.</p></li>
<li><p><strong>Index-Informationen</strong></p>
<p>Hier werden die Index-Metadaten und die Pfade zu den Indexdateien gespeichert.</p></li>
<li><p><strong>Segmentdaten</strong></p>
<p>Erfasst die Vektordatendateien (binlogs), Löschungsprotokolle (deltalogs) und Indexdateien.</p></li>
</ul>
<p>Neben den oben genannten Informationen generiert Milvus eine Apache Avro-Manifestdatei für jedes Segment und speichert die Snapshot-Metadaten, die Sammlungsbeschreibung, die Indexinformationen und die Pfade zu den Manifestdateien in einer JSON-Datei. Das folgende Diagramm veranschaulicht die Snapshot-Ordnerstruktur.</p>
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
<p>Die Erstellung eines Snapshots dauert in der Regel nur wenige Millisekunden, und die Wiederherstellung dauert je nach Datenvolumen Sekunden bis Minuten.</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">Auswirkungen auf die Speicherung und Überlegungen<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Milvus auf ein Segment oder eine Indexdatei in einem Snapshot verweist, sammelt es diese Dateien nicht mehr ein, es sei denn, Sie löschen den Snapshot. Snapshots verbrauchen Speicherplatz proportional zur Größe der Zielsammlungen, und die Objektspeicherkosten gelten für die Aufbewahrung von Snapshots. In extremen Fällen kann ein einziger Snapshot Ihre Objektspeicherkosten sogar verdoppeln. Es wird empfohlen, dass Sie</p>
<ul>
<li>Entfernen Sie alte Snapshots regelmäßig, um Speicherplatz zu sparen.</li>
<li>Verwenden Sie aussagekräftige Namen und Beschreibungen für zukünftige Referenzen.</li>
<li>Überprüfen Sie stets die Ergebnisse der Snapshot-Erstellung und -Wiederherstellung.</li>
<li>Verfolgen Sie die Zeitstempel der Snapshot-Erstellung, die Speichernutzung und die IDs der Wiederherstellungsaufträge zur Überwachung und Fehlerbehebung.</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">Limits und Einschränkungen<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
<li>Snapshots werden nach der Erstellung unveränderbar.</li>
<li>Sie können einen Snapshot nur in einer neuen Sammlung innerhalb desselben Clusters wie das Original wiederherstellen.</li>
<li>Wiederhergestellte Sammlungen behalten dasselbe Schema, dieselbe Anzahl von Shards und dieselbe Partitionsanzahl bei.</li>
<li>Wiederhergestellte historische Daten können mit TTL-Richtlinien in Konflikt geraten. Wir empfehlen Ihnen, TTL zu deaktivieren oder die TTL-Einstellungen anzupassen, bevor Sie Snapshots erstellen.</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">Weitere Lektüre<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
<li><a href="/docs/de/manage-snapshots.md">Verwalten von Snapshots</a> - Snapshots erstellen, auflisten, wiederherstellen und löschen.</li>
<li><a href="/docs/de/snapshot-use-cases.md">Snapshot Use Cases</a> - allgemeine Muster und Arbeitsabläufe.</li>
<li><a href="/docs/de/milvus_backup_overview.md">Milvus Backup</a> - Langfristige Sicherung und Wiederherstellung in Clustern.</li>
</ul>
