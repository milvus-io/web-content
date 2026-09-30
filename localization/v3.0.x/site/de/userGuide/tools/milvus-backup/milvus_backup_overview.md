---
id: milvus_backup_overview.md
summary: >-
  Milvus-Backup ist ein Tool, mit dem Benutzer Milvus-Daten sichern und
  wiederherstellen können.
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
    </button></h1><p>Milvus Backup ist ein Tool, mit dem Benutzer Milvus-Daten sichern und wiederherstellen können. Es bietet sowohl eine Befehlszeilenschnittstelle (CLI) als auch eine API, um sich an verschiedene Anwendungsszenarien anzupassen.</p>
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
    </button></h2><p>Bevor Sie Milvus Backup verwenden, stellen Sie bitte sicher, dass</p>
<ul>
<li>das Betriebssystem CentOS 7.5+ oder Ubuntu LTS 18.04+ ist,</li>
<li>die Go-Version 1.20.2 oder höher ist.</li>
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
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_backup_architecture.png" alt="Milvus Backup architecture" class="doc-image" id="milvus-backup-architecture" /> 
   <span>Architektur von Milvus Backup</span>
  
 </span></p>
<p>Milvus Backup ermöglicht die Sicherung und Wiederherstellung von Metadaten, Segmenten und Daten über verschiedene Milvus-Instanzen hinweg. Es bietet Northbound-Schnittstellen wie CLI, API und ein gRPC-basiertes Go-Modul für die flexible Steuerung der Sicherungs- und Wiederherstellungsprozesse.</p>
<p>Milvus Backup liest die Metadaten und Segmente der Sammlung aus der Quell-Milvus-Instanz aus, um ein Backup zu erstellen. Anschließend kopiert es die Sammlungsdaten aus dem Stammverzeichnis der Quell-Milvus-Instanz und speichert die kopierten Daten im Stammverzeichnis des Backups.</p>
<p>Um Daten aus einem Backup wiederherzustellen, erstellt Milvus Backup in der Ziel-Milvus-Instanz eine neue Sammlung auf der Grundlage der Sammlungsmetadaten und Segmentinformationen im Backup. Anschließend kopiert es die Backup-Daten vom Backup-Stammverzeichnis in das Stammverzeichnis der Zielinstanz.</p>
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
    </button></h2><p>Die folgende Tabelle listet die Kompatibilitäten bei Sicherung und Wiederherstellung zwischen verschiedenen Milvus-Versionen seit Milvus Backup v0.5.7 auf.</p>
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
<h2 id="Latest-release" class="common-anchor-header">Aktuelle Version<button data-href="#Latest-release" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16">v0.5.16</a></li>
</ul>
